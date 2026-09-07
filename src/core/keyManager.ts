import type { ManagedApiKey } from './types'

/**
 * Gerenciador Inteligente Multi-API Key para o Google Gemini.
 * Responsável por:
 * 1. Armazenar e sincronizar múltiplas chaves cadastradas pelo usuário.
 * 2. Rastrear latência, taxas de sucesso e status de cada chave.
 * 3. Proteger cotas com Cooldown Automático de 5 segundos ao detectar HTTP 429 (Rate Limit / Quota).
 * 4. Chaveamento instantâneo para a chave mais rápida e saudável disponível.
 * 5. Distribuição de chaves em requisições paralelas (Hedging Multi-Key) para dividir o consumo de RPM/TPM.
 */
export class KeyManager {
  private keys: Map<string, ManagedApiKey> = new Map()

  constructor(initialKeys: string[] = []) {
    this.init(initialKeys)
  }

  /**
   * Inicializa o pool de chaves a partir de uma lista bruta de strings.
   */
  public init(rawKeys: string[]): void {
    const existing = new Map(this.keys)
    this.keys.clear()

    const sanitized = Array.from(
      new Set(
        rawKeys
          .map((k) => k.trim().replace(/^["']|["']$/g, ''))
          .filter((k) => k.length > 5)
      )
    )

    sanitized.forEach((key, index) => {
      const id = this.generateId(key)
      const prev = existing.get(id) || existing.get(key)
      this.keys.set(id, {
        id,
        key,
        label: prev?.label || `Chave ${index + 1}`,
        addedAt: prev?.addedAt || Date.now(),
        lastUsedAt: prev?.lastUsedAt,
        lastLatencyMs: prev?.lastLatencyMs,
        cooldownUntil: prev?.cooldownUntil,
        errorCount: prev?.errorCount || 0,
        lastError: prev?.lastError,
      })
    })
  }

  private generateId(key: string): string {
    let hash = 0
    for (let i = 0; i < key.length; i++) {
      hash = (hash << 5) - hash + key.charCodeAt(i)
      hash |= 0
    }
    return `key_${Math.abs(hash).toString(36).slice(0, 8)}`
  }

  /**
   * Retorna a representação mascarada para privacidade e segurança (ex: AIzaSy...4xQ9).
   */
  public static maskKey(key: string): string {
    const clean = key.trim().replace(/^["']|["']$/g, '')
    if (clean.length <= 10) return '••••••••'
    return `${clean.slice(0, 6)}...${clean.slice(-4)}`
  }

  /**
   * Retorna todas as chaves cadastradas com informações atualizadas de cooldown.
   */
  public getAllKeys(): Array<ManagedApiKey & { isCooldown: boolean; remainingCooldownMs: number }> {
    const now = Date.now()
    return Array.from(this.keys.values()).map((k) => {
      const remaining = Math.max(0, (k.cooldownUntil || 0) - now)
      return {
        ...k,
        isCooldown: remaining > 0,
        remainingCooldownMs: remaining,
      }
    })
  }

  /**
   * Retorna apenas as chaves saudáveis que não estão em cooldown nem com falha crítica.
   */
  public getHealthyKeys(): ManagedApiKey[] {
    const now = Date.now()
    return Array.from(this.keys.values()).filter((k) => {
      return (k.cooldownUntil || 0) <= now && (k.errorCount || 0) < 5
    })
  }

  /**
   * Seleciona a melhor chave para o disparo:
   * Prioriza chaves saudáveis com menor latência comprovada.
   * Se todas estiverem em cooldown, escolhe a que sairá do cooldown mais rápido.
   */
  public getBestKey(): string {
    const healthy = this.getHealthyKeys()
    if (healthy.length > 0) {
      // Ordena: primeiro as que têm histórico de latência menor, seguidas pelas nunca testadas
      healthy.sort((a, b) => {
        const latA = a.lastLatencyMs ?? 99999
        const latB = b.lastLatencyMs ?? 99999
        return latA - latB
      })
      return healthy[0].key
    }

    // Se todas as chaves estiverem em cooldown, usa a que expira primeiro
    const all = Array.from(this.keys.values())
    if (all.length > 0) {
      all.sort((a, b) => (a.cooldownUntil || 0) - (b.cooldownUntil || 0))
      return all[0].key
    }

    return ''
  }

  /**
   * Retorna até N chaves saudáveis distintas para distribuir nas corridas concorrentes (Hedging).
   * Isso divide a cota de RPM entre contas/chaves diferentes!
   */
  public getDiverseKeys(count: number): string[] {
    const healthy = this.getHealthyKeys()
    if (healthy.length === 0) {
      const best = this.getBestKey()
      return best ? [best] : []
    }

    // Ordena por menor latência
    healthy.sort((a, b) => {
      const latA = a.lastLatencyMs ?? 99999
      const latB = b.lastLatencyMs ?? 99999
      return latA - latB
    })

    const result: string[] = []
    for (let i = 0; i < count; i++) {
      // Se houver mais slots do que chaves saudáveis, faz round-robin
      const keyObj = healthy[i % healthy.length]
      result.push(keyObj.key)
    }

    return result
  }

  /**
   * Registra estouro de cota (HTTP 429 / Resource Exhausted).
   * Coloca a chave em cooldown de segurança (padrão 5 segundos) e incrementa contador.
   */
  public markQuotaHit(key: string, cooldownMs = 5000): void {
    const target = this.findKeyObj(key)
    if (target) {
      target.cooldownUntil = Date.now() + cooldownMs
      target.errorCount = (target.errorCount || 0) + 1
      target.lastError = `Cota temporária atingida (HTTP 429). Cooldown de ${cooldownMs / 1000}s ativado.`
    }
  }

  /**
   * Registra sobrecarga do servidor (HTTP 503 / Unavailable / No Capacity).
   * Aplica cooldown de 5s para evitar martelar o cluster saturado.
   */
  public markOverloaded(key: string, cooldownMs = 5000): void {
    const target = this.findKeyObj(key)
    if (target) {
      target.cooldownUntil = Date.now() + cooldownMs
      target.errorCount = (target.errorCount || 0) + 1
      target.lastError = `Servidores sobrecarregados (HTTP 503). Cooldown de ${cooldownMs / 1000}s ativado.`
    }
  }

  /**
   * Registra sucesso na requisição, armazenando a latência para priorizar nas próximas questões.
   */
  public markSuccess(key: string, latencyMs: number): void {
    const target = this.findKeyObj(key)
    if (target) {
      target.lastLatencyMs = latencyMs
      target.lastUsedAt = Date.now()
      target.errorCount = 0
      target.lastError = undefined
      // Reduz ou zera cooldown se estava ativo
      target.cooldownUntil = undefined
    }
  }

  /**
   * Registra erro de autorização ou chave inválida (HTTP 403 / API_KEY_INVALID).
   */
  public markInvalid(key: string, reason: string): void {
    const target = this.findKeyObj(key)
    if (target) {
      target.errorCount = 99
      target.lastError = reason
    }
  }

  /**
   * Adiciona uma nova chave ao pool.
   */
  public addKey(rawKey: string, label?: string): { ok: boolean; message: string; keyItem?: ManagedApiKey } {
    const clean = rawKey.trim().replace(/^["']|["']$/g, '')
    if (!clean) return { ok: false, message: 'Chave não pode ser vazia.' }
    if (clean.length < 15) return { ok: false, message: 'Chave de API inválida ou muito curta.' }

    const id = this.generateId(clean)
    if (this.keys.has(id)) {
      return { ok: false, message: 'Esta chave de API já está cadastrada.' }
    }

    const newItem: ManagedApiKey = {
      id,
      key: clean,
      label: label?.trim() || `Chave ${this.keys.size + 1}`,
      addedAt: Date.now(),
      errorCount: 0,
    }

    this.keys.set(id, newItem)
    return { ok: true, message: 'Chave adicionada com sucesso!', keyItem: newItem }
  }

  /**
   * Atualiza uma chave existente.
   */
  public updateKey(keyId: string, newRawKey: string, newLabel?: string): { ok: boolean; message: string } {
    const target = this.keys.get(keyId)
    if (!target) return { ok: false, message: 'Chave não encontrada.' }

    const clean = newRawKey.trim().replace(/^["']|["']$/g, '')
    if (!clean || clean.length < 15) return { ok: false, message: 'Chave de API inválida.' }

    target.key = clean
    if (newLabel !== undefined) target.label = newLabel.trim()
    target.errorCount = 0
    target.cooldownUntil = undefined
    target.lastError = undefined

    return { ok: true, message: 'Chave atualizada com sucesso!' }
  }

  /**
   * Remove uma chave do pool. Exige que permaneça pelo menos 1 chave.
   */
  public removeKey(keyIdOrKey: string): { ok: boolean; message: string } {
    if (this.keys.size <= 1) {
      return { ok: false, message: 'Você precisa manter pelo menos 1 chave de API cadastrada.' }
    }

    const target = this.findKeyObj(keyIdOrKey)
    if (!target) return { ok: false, message: 'Chave não encontrada.' }

    this.keys.delete(target.id)
    return { ok: true, message: 'Chave removida com sucesso.' }
  }

  /**
   * Exporta a lista de chaves limpas para persistência nas configurações do EasyQuiz.
   */
  public exportRawKeys(): string[] {
    return Array.from(this.keys.values()).map((k) => k.key)
  }

  public size(): number {
    return this.keys.size
  }

  private findKeyObj(keyOrId: string): ManagedApiKey | undefined {
    if (this.keys.has(keyOrId)) return this.keys.get(keyOrId)
    for (const item of this.keys.values()) {
      if (item.key === keyOrId) return item
    }
    return undefined
  }
}

// Instância singleton global do KeyManager
export const keyManager = new KeyManager()
