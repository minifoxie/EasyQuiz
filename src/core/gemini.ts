import type { AnalysisPlan, CapturedContext, CapturedImage, EasyQuizSettings, ModelOption } from './types'
import { buildUserPrompt, SYSTEM_PROMPT } from './prompt'
import { validateAnalysisPlan } from './planValidation'
import { isValidQuizModel } from './modelValidation'
import { keyManager, KeyManager } from './keyManager'

export { isValidQuizModel } from './modelValidation'
export { keyManager, KeyManager } from './keyManager'

// ===== MODELOS GEMINI ATUALIZADOS PARA SETEMBRO 2026 =====
// Modelos descontinuados removidos: gemini-1.5-*, gemini-2.0-*, gemini-2.0-flash-lite-*
export const AVAILABLE_MODELS: ModelOption[] = [
  {
    id: 'gemini-3.8-flash',
    name: 'Gemini 3.8 Flash (Mais Inteligente 2026)',
    description: 'Modelo flagship Flash lançado em Set/2026. Ultra-rápido e altamente capaz.',
    stable: true,
  },
  {
    id: 'gemini-3.7-flash',
    name: 'Gemini 3.7 Flash (Agentic)',
    description: 'Alta capacidade para raciocínio multimodal e workflows agênticos.',
    stable: true,
  },
  {
    id: 'gemini-3.6-flash',
    name: 'Gemini 3.6 Flash (Estável)',
    description: 'Modelo estável e confiável com excelente velocidade.',
    stable: true,
  },
  {
    id: 'gemini-3.5-flash',
    name: 'Gemini 3.5 Flash (Rápido)',
    description: 'Modelo de alta performance para tarefas rápidas.',
    stable: true,
  },
  {
    id: 'gemini-3.5-flash-lite',
    name: 'Gemini 3.5 Flash-Lite (Econômico)',
    description: 'Modelo econômico de alta velocidade para volume elevado.',
    stable: true,
  },
  {
    id: 'gemini-2.5-flash',
    name: 'Gemini 2.5 Flash (Legacy Rápido)',
    description: 'Modelo legacy com zero-thinking suportado. Ultra-baixa latência.',
    stable: true,
  },
  {
    id: 'gemini-2.5-pro',
    name: 'Gemini 2.5 Pro (Legacy Avançado)',
    description: 'Modelo legacy avançado para questões de alta complexidade.',
    stable: true,
  },
]

// Modelos top em ordem de prioridade para o Turbo Blitz Race
// gemini-2.5-flash removido: HTTP 404 para novos usuários (Set/2026)
const TURBO_MODELS = [
  'gemini-3.8-flash',
  'gemini-3.6-flash',
  'gemini-3.5-flash',
]

// Modelos descontinuados — mapeados automaticamente para substitutos
// Evita 404s silenciosos quando o usuário tem um modelo antigo salvo nas configurações
const DEPRECATED_MODEL_MAP: Record<string, string> = {
  'gemini-2.5-flash': 'gemini-3.6-flash',
  'gemini-2.0-flash': 'gemini-3.5-flash',
  'gemini-2.0-flash-lite': 'gemini-3.5-flash-lite',
  'gemini-1.5-flash': 'gemini-3.5-flash',
  'gemini-1.5-pro': 'gemini-3.6-flash',
}

/** Migra modelo deprecado para substituto estável automaticamente */
function migrateDeprecated(model: string): string {
  return DEPRECATED_MODEL_MAP[model] ?? model
}

export let preferredFastModel: string | null = null

export function buildGenerationConfig(model: string): Record<string, unknown> {
  const config: Record<string, unknown> = {
    temperature: 0.0,
    maxOutputTokens: 1200,
    response_mime_type: 'application/json',
    response_schema: GEMINI_JSON_SCHEMA,
  }

  // Gemini 3.5/3.6/3.7-flash: thinkingLevel 'none' → máxima velocidade
  if (/gemini-3\.[567]-flash/i.test(model)) {
    config.thinkingConfig = { thinkingLevel: 'none' }
  }
  // Gemini 3.8-flash: 'low' mínimo — necessário pelo modelo
  else if (/gemini-3\.[89]|gemini-3\.[1-9][0-9]/i.test(model)) {
    config.thinkingConfig = { thinkingLevel: 'low' }
  }
  // Gemini 2.5 Flash: thinkingBudget: 0 desativa o thinking — latência sub-segundo
  else if (/gemini-2\.5-flash/i.test(model)) {
    config.thinkingConfig = { thinkingBudget: 0 }
  }
  // Gemini 2.5 Pro: exige mínimo de thinking — sem thinkingConfig

  return config
}

const GEMINI_JSON_SCHEMA = {
  type: 'OBJECT',
  properties: {
    pageType: { type: 'STRING', enum: ['question', 'info', 'start', 'conclusion'] },
    mode: {
      type: 'STRING',
      enum: [
        'texto_livre',
        'escolha_unica',
        'escolha_multipla',
        'verdadeiro_falso',
        'preenchimento',
        'acao_sem_resposta',
        'categorizacao',
        'ordenacao',
        'arrastar_soltar',
      ],
    },
    confidence: { type: 'NUMBER' },
    rationale: { type: 'STRING' },
    memoryToStore: { type: 'STRING' },
    actions: {
      type: 'ARRAY',
      items: {
        type: 'OBJECT',
        properties: {
          t: { type: 'STRING', enum: ['val', 'chk', 'sel', 'clk', 'adv', 'js', 'drag'] },
          id: { type: 'STRING' },
          v: {}, // Pode ser string (valor ou código JS) ou array ou omitido
          c: { type: 'BOOLEAN' },
          co: { type: 'ARRAY', items: { type: 'NUMBER' } }, // coordinates
          from: { type: 'STRING' }, // Seletor ou texto de origem (drag)
          to: { type: 'STRING' }, // Seletor ou texto de destino (drag)
        },
        required: ['t'],
      },
    },
  },
  required: ['pageType', 'mode', 'confidence', 'rationale', 'actions'],
}

function normalizeModel(model: string): string {
  const clean = model.trim().replace(/^google\//, '').replace(/^models\//, '')
  if (!clean || !isValidQuizModel(clean)) {
    return 'gemini-3.8-flash'
  }
  return clean
}

function parseGeminiError(errorText: string, status: number): string {
  let googleMsg = ''
  try {
    const json = JSON.parse(errorText)
    googleMsg = json.error?.message || json.message || ''
  } catch {
    googleMsg = errorText.slice(0, 160)
  }

  if (/API_KEY_INVALID|API key not valid|key.*invalid|unregistered/i.test(googleMsg)) {
    return 'Chave de API do Gemini inválida ou não autorizada no Google AI Studio.'
  }
  if (/RESOURCE_EXHAUSTED|Quota exceeded/i.test(googleMsg) || status === 429) {
    return 'Limite temporário de cota do Gemini (HTTP 429) atingido. Aguardando recuperação...'
  }
  if (status === 404) {
    return `HTTP 404: ${googleMsg || 'Modelo ou endpoint não encontrado no Google AI Studio'}`
  }
  if (status === 503 || /overloaded/i.test(googleMsg)) {
    return `Servidores Google sobrecarregados (HTTP 503): ${googleMsg || 'Aguardando'}`
  }
  return googleMsg ? `Erro Gemini (HTTP ${status}): ${googleMsg}` : `Falha na requisição ao Gemini (HTTP ${status}).`
}

function robustParsePlan(rawText: string): AnalysisPlan {
  const text = rawText.trim()
  // 1. Tenta extrair de bloco de código ```json ... ```
  const codeBlockMatch = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/i)
  if (codeBlockMatch) {
    try {
      return JSON.parse(codeBlockMatch[1].trim()) as AnalysisPlan
    } catch {}
  }
  // 2. Tenta parse direto
  try {
    return JSON.parse(text) as AnalysisPlan
  } catch {}
  // 3. Tenta encontrar o bloco JSON {...} mais abrangente
  const jsonMatch = text.match(/\{[\s\S]*\}/)
  if (jsonMatch) {
    try {
      return JSON.parse(jsonMatch[0].trim()) as AnalysisPlan
    } catch {}
  }
  throw new Error('Falha ao decodificar JSON da IA.')
}

export let discoveredModelsCache: ModelOption[] | null = (() => {
  try {
    const raw = typeof localStorage !== 'undefined' ? localStorage.getItem('easyquiz_cached_models') : null
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed)) {
      const filtered = parsed.filter((m: any) => m && typeof m.id === 'string' && isValidQuizModel(m.id))
      return filtered.length > 0 ? filtered : null
    }
    return null
  } catch {
    return null
  }
})()
const blacklistedModels = new Set<string>()

export async function fetchAvailableModels(apiKey: string): Promise<ModelOption[]> {
  const key = apiKey.trim().replace(/^["']|["']$/g, '')
  if (!key) return AVAILABLE_MODELS

  const endpoints = [
    `https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(key)}`,
    `https://generativelanguage.googleapis.com/v1/models?key=${encodeURIComponent(key)}`,
  ]

  for (const url of endpoints) {
    try {
      const res = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': key,
        },
      })

      if (!res.ok) {
        const errText = await res.text()
        const parsed = parseGeminiError(errText, res.status)
        if (parsed.includes('inválida') || parsed.includes('não autorizada')) {
          throw new Error(parsed)
        }
        continue
      }

      const data = await res.json()
      if (Array.isArray(data.models) && data.models.length > 0) {
        const validModels: ModelOption[] = data.models
          .filter((m: any) => {
            const methods = m.supportedGenerationMethods || []
            const id = (m.name || '').replace(/^models\//, '')
            const supportsGen = methods.includes('generateContent')
            return isValidQuizModel(id) && supportsGen
          })
          .map((m: any) => {
            const methods = m.supportedGenerationMethods || []
            const id = m.name.replace(/^models\//, '')
            const displayName = m.displayName || id
            return {
              id,
              name: displayName.includes(id) ? displayName : `${displayName} (${id})`,
              description: m.description || '',
              stable: !/-preview|-experimental|-latest/i.test(id),
              supportsVision: !/embedding|tts|transcribe|live|image|sound|voice/i.test(id),
              supportsStructuredOutput: methods.includes('generateContent'),
              supportedGenerationMethods: methods,
              discoveredAt: Date.now(),
            }
          })

        if (validModels.length > 0) {
          validModels.sort((a, b) => {
            const getPriority = (id: string) => {
              if (id === 'gemini-3.8-flash') return 200
              if (id === 'gemini-3.7-flash') return 190
              if (id === 'gemini-3.6-flash') return 180
              if (id === 'gemini-3.5-flash') return 170
              if (id === 'gemini-3.5-flash-lite') return 160
              if (id === 'gemini-2.5-flash') return 130
              if (id.includes('flash')) return 80
              if (id === 'gemini-2.5-pro') return 60
              if (id.includes('pro')) return 50
              return 10
            }
            return getPriority(b.id) - getPriority(a.id)
          })
          discoveredModelsCache = validModels
          try {
            if (typeof localStorage !== 'undefined') {
              localStorage.setItem('easyquiz_cached_models', JSON.stringify(validModels))
            }
          } catch {}
          return validModels
        }
      }
    } catch (err) {
      if ((err as Error).message?.includes('Chave de API')) throw err
    }
  }

  return AVAILABLE_MODELS
}

export async function testApiKey(apiKey: string): Promise<{ ok: boolean; message: string; models?: ModelOption[] }> {
  const key = apiKey.trim().replace(/^["']|["']$/g, '')
  if (!key) return { ok: false, message: 'Insira sua chave de API.' }

  // 1. Tenta listar modelos da conta do usuário diretamente
  try {
    const models = await fetchAvailableModels(key)
    if (models.length > 0 && models !== AVAILABLE_MODELS) {
      const topModel = models[0]
      return {
        ok: true,
        message: `Chave válida! ${models.length} modelos Gemini disponíveis em sua conta. Recomendado: ${topModel.name}`,
        models,
      }
    }
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    return { ok: false, message: msg }
  }

  // 2. Teste direto nos modelos mais rápidos (2.5-flash removido: 404 para novos usuários)
  const testCandidates = ['gemini-3.8-flash', 'gemini-3.6-flash', 'gemini-3.5-flash']
  for (const modelId of testCandidates) {
    for (const apiVer of ['v1beta', 'v1']) {
      const endpoint = `https://generativelanguage.googleapis.com/${apiVer}/models/${modelId}:generateContent?key=${encodeURIComponent(key)}`
      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': key,
          },
          body: JSON.stringify({
            contents: [{ role: 'user', parts: [{ text: 'PING' }] }],
            generationConfig: { maxOutputTokens: 5 },
          }),
        })

        if (res.ok) {
          return {
            ok: true,
            message: `Chave validada com sucesso no ${modelId} (${apiVer})!`,
            models: AVAILABLE_MODELS,
          }
        }
      } catch {}
    }
  }

  return { ok: false, message: 'Chave de API inválida, sem cota ou sem permissão para modelos Gemini.' }
}

async function callSingleModel(
  model: string,
  key: string,
  payloadBase: { system_instruction: { parts: Array<{ text: string }> }; contents: Array<{ role: string; parts: Array<Record<string, unknown>> }> },
  keepalive: boolean,
  signal: AbortSignal,
): Promise<{ rawText: string; data: any; usedModel: string; usedKey: string }> {
  const versionsToTry = ['v1beta', 'v1']
  let lastErr = new Error(`Falha ao consultar modelo ${model}`)

  const genConfig = buildGenerationConfig(model)
  let currentGenConfig = { ...genConfig }

  for (const apiVer of versionsToTry) {
    if (signal.aborted) throw new Error('Operação cancelada pelo usuário.')

    const endpoint = `https://generativelanguage.googleapis.com/${apiVer}/models/${model}:generateContent?key=${encodeURIComponent(key)}`
    const reqStart = Date.now()

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': key,
        },
        body: JSON.stringify({
          ...payloadBase,
          generationConfig: currentGenConfig,
        }),
        signal,
        keepalive,
      })

      if (!response.ok) {
        const errorText = await response.text()

        // Se o modelo rejeitar thinkingConfig com HTTP 400, retenta sem thinkingConfig imediatamente
        if (response.status === 400 && currentGenConfig.thinkingConfig && /thinking/i.test(errorText)) {
          delete currentGenConfig.thinkingConfig
          const retryRes = await fetch(endpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-goog-api-key': key,
            },
            body: JSON.stringify({
              ...payloadBase,
              generationConfig: currentGenConfig,
            }),
            signal,
            keepalive,
          })
          if (retryRes.ok) {
            const data = await retryRes.json()
            const candidate = data.candidates?.[0]
            if (candidate?.content?.parts?.[0]?.text) {
              keyManager.markSuccess(key, Date.now() - reqStart)
              return { rawText: candidate.content.parts[0].text, data, usedModel: model, usedKey: key }
            }
          }
        }

        const parsedErrorMsg = parseGeminiError(errorText, response.status)
        if (response.status === 404 && apiVer === 'v1beta') {
          continue
        }

        // Rastreamento Multi-Key: Quota (429), Sobrecarga (503) e Autorização (403)
        if (response.status === 429) {
          keyManager.markQuotaHit(key, 5000)
        } else if (response.status === 503 || /no capacity|overloaded|unavailable/i.test(errorText)) {
          keyManager.markOverloaded(key, 5000)
          blacklistedModels.add(model)
        } else if (response.status === 403 || /API_KEY_INVALID/i.test(errorText)) {
          keyManager.markInvalid(key, parsedErrorMsg)
        } else if (response.status === 404) {
          blacklistedModels.add(model)
        }

        throw new Error(`[${model}|${KeyManager.maskKey(key)}] ${parsedErrorMsg}`)
      }

      const data = await response.json()
      const candidate = data.candidates?.[0]
      if (!candidate || !candidate.content?.parts?.[0]?.text) {
        throw new Error(`[${model}|${KeyManager.maskKey(key)}] A IA não retornou uma resposta estruturada válida.`)
      }

      // Registra sucesso e latência comprovada desta chave
      keyManager.markSuccess(key, Date.now() - reqStart)

      return {
        rawText: candidate.content.parts[0].text,
        data,
        usedModel: model,
        usedKey: key,
      }
    } catch (err) {
      if (signal.aborted) throw err
      lastErr = err as Error
      const errMsg = lastErr.message || ''
      // 503 overloaded: modelo sobrecarregado mas pode funcionar na versão de API alternativa — NÃO fazer break
      // 404: modelo não existe para este usuário — blacklist e break imediatamente
      if (errMsg.includes('404') || /no longer available/i.test(errMsg)) {
        blacklistedModels.add(model)
        break  // sem sentido tentar v1 se o modelo não existe
      }
      // Para outros erros (429, 503, timeout), tentar próxima versão de API
    }
  }

  throw lastErr
}

// ===== SMART WAVE RACE: CORRIDA POR ONDAS COM BLACKLIST DE SESSÃO =====
//
// Arquitetura:
//   Onda 1: 2 slots mais rápidos (menor latência) — modelo campeão + próximo
//   Onda 2: 2 slots com chaves DIFERENTES das usadas na Onda 1
//   Fallback: 1 slot com chave não usada em nenhuma onda anterior
//
// Benefícios vs Blitz 8x:
//   - Máx 2 conexões simultâneas por onda → sem "Failed to fetch"
//   - Blacklist de sessão para chaves 429 → nunca reutiliza chave que falhou
//   - Onda 2 usa chaves frescas → distribui a cota entre mais contas
//   - Total de chaves usadas: até 5 por questão (2+2+1), escalável

// Blacklist de SESSÃO: chaves que bateram 429 não são reutilizadas nesta sessão
const sessionQuotaBlacklist = new Set<string>()

/** Limpar blacklist de sessão — chamar quando Autopilot for reiniciado */
export function resetSessionBlacklist(): void {
  sessionQuotaBlacklist.clear()
}

export async function analyzeWithGemini(
  context: CapturedContext,
  images: CapturedImage[],
  settings: EasyQuizSettings,
  onProgress?: (message: string, type?: 'info' | 'warning' | 'error') => void,
  signal?: AbortSignal,
): Promise<{ plan: AnalysisPlan; rawUsage?: unknown; usedModel?: string; usedKey?: string }> {
  if (signal?.aborted) throw new Error('Operação cancelada pelo usuário.')

  // Sincroniza chaves de API com o KeyManager inteligente
  const rawKeyList = Array.isArray(settings.apiKeys) && settings.apiKeys.length > 0
    ? settings.apiKeys
    : (settings.apiKey ? [settings.apiKey] : [])
  keyManager.init(rawKeyList)

  const primaryKey = settings.apiKey.trim().replace(/^[\"']|[\"']$/g, '')
  const activeKey = keyManager.getBestKey() || primaryKey
  if (!activeKey) throw new Error('Nenhuma chave de API do Gemini configurada ou disponível.')

  const chosenModel = normalizeModel(settings.model)

  // Dispara descoberta assíncrona em segundo plano se ainda não feita, SEM bloquear a primeira questão
  if (!discoveredModelsCache && activeKey) {
    fetchAvailableModels(activeKey).catch(() => {})
  }

  if (signal?.aborted) throw new Error('Operação cancelada pelo usuário.')

  const startTime = Date.now()
  const userText = buildUserPrompt(context, images, settings)

  // Intercala rótulos semânticos e dados base64
  const parts: Array<Record<string, unknown>> = [{ text: userText }]
  for (let idx = 0; idx < images.length; idx++) {
    const img = images[idx]
    const label = img.associatedLabel || (img.alt ? `Imagem: ${img.alt}` : `Imagem ${idx + 1}`)
    parts.push({ text: `[ANEXO VISUAL ${idx + 1} - VÍNCULO: ${label}]:` })
    parts.push({ inline_data: { mime_type: img.mediaType, data: img.base64 } })
  }

  const payloadBase = {
    system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
    contents: [{ role: 'user', parts }],
  }
  const keepalive = true

  // ===== POOL DE MODELOS =====
  blacklistedModels.clear()

  const effectiveChosenModel = migrateDeprecated(chosenModel)
  const effectivePreferred = preferredFastModel ? migrateDeprecated(preferredFastModel) : null

  const candidateModels: string[] = []
  if (effectivePreferred && isValidQuizModel(effectivePreferred)) candidateModels.push(effectivePreferred)
  if (isValidQuizModel(effectiveChosenModel) && effectiveChosenModel !== effectivePreferred) candidateModels.push(effectiveChosenModel)
  for (const m of TURBO_MODELS) {
    if (!candidateModels.includes(m)) candidateModels.push(m)
  }
  const modelPool = candidateModels
    .map(m => migrateDeprecated(m))
    .filter(m => isValidQuizModel(m))
    .filter((m, i, arr) => arr.indexOf(m) === i)
    .slice(0, 3)
  if (modelPool.length < 2) modelPool.push(...TURBO_MODELS.filter(m => !modelPool.includes(m)))

  // ===== POOL DE CHAVES =====
  // Excluir chaves que bateram 429 nesta sessão
  const allHealthy = keyManager.getHealthyKeys()
    .filter(k => !sessionQuotaBlacklist.has(k.key))
    .sort((a, b) => (a.lastLatencyMs ?? 99999) - (b.lastLatencyMs ?? 99999))

  const allKeys = keyManager.getAllKeys()
    .filter(k => !sessionQuotaBlacklist.has(k.key))

  // Se todas as saudáveis estão na blacklist, usar qualquer disponível
  const keysPool = allHealthy.length > 0
    ? allHealthy
    : allKeys.map(k => ({ key: k.key, lastLatencyMs: k.lastLatencyMs, label: k.label }))

  // ===== FUNÇÃO AUXILIAR: disparar N slots e retornar o primeiro vencedor =====
  const runWave = async (
    waveName: string,
    waveKeys: Array<{ key: string; label?: string }>,
    waveModels: string[],
    usedKeysSet: Set<string>,
  ): Promise<{ plan: AnalysisPlan; rawUsage?: unknown; usedModel: string; usedKey: string; slotLabel: string } | null> => {
    if (waveKeys.length === 0 || signal?.aborted) return null

    const waveSlots = waveKeys.slice(0, 2).map((kObj, i) => ({
      model: waveModels[i % waveModels.length],
      key: kObj.key,
      label: (kObj as any).label || `Chave ${i + 1}`,
    }))

    const waveControllers = waveSlots.map(() => new AbortController())
    const onParentAbort = () => waveControllers.forEach(c => { try { c.abort() } catch {} })
    signal?.addEventListener('abort', onParentAbort, { once: true })

    onProgress?.(`⚡ ${waveName}: ${waveSlots.length} slot(s) [${waveSlots.map(s => s.model.replace('gemini-', '')).join(', ')}]...`, 'info')

    try {
      const promises = waveSlots.map(async (slot, idx) => {
        const ctrl = waveControllers[idx]
        // Timeout: 14s por slot (generoso para servidores sob carga)
        const timeoutMs = 14000
        const timeoutId = setTimeout(() => {
          try { ctrl.abort(new Error(`Timeout ${timeoutMs / 1000}s (${slot.model}|${slot.label})`)) } catch { ctrl.abort() }
        }, timeoutMs)

        try {
          const res = await callSingleModel(slot.model, slot.key, payloadBase, keepalive, ctrl.signal)
          clearTimeout(timeoutId)
          const parsedPlan = validateAnalysisPlan(robustParsePlan(res.rawText))
          parsedPlan.usedModel = res.usedModel
          parsedPlan.durationMs = Date.now() - startTime
          parsedPlan.promptSent = userText
          parsedPlan.tokensUsed = res.data.usageMetadata?.totalTokenCount
          parsedPlan.promptTokens = res.data.usageMetadata?.promptTokenCount
          parsedPlan.candidatesTokens = res.data.usageMetadata?.candidatesTokenCount
          parsedPlan.rawResponse = res.rawText

          // Vencedor: cancelar outros slots desta onda
          waveControllers.forEach((c, j) => {
            if (j !== idx) { try { c.abort(new Error('Cancelado: vencedor respondeu.')) } catch { c.abort() } }
          })

          return { plan: parsedPlan, rawUsage: res.data.usageMetadata, usedModel: res.usedModel, usedKey: res.usedKey, slotLabel: slot.label }
        } catch (err) {
          clearTimeout(timeoutId)
          // Se 429: adicionar à blacklist de sessão para não reusar nesta sessão
          const errMsg = err instanceof Error ? err.message : String(err)
          if (errMsg.includes('429') || errMsg.includes('Quota') || errMsg.includes('RESOURCE_EXHAUSTED')) {
            sessionQuotaBlacklist.add(slot.key)
          }
          throw err
        }
      })

      const winner = await Promise.any(promises)
      signal?.removeEventListener('abort', onParentAbort)

      // Marcar chaves usadas para próxima onda não reutilizar
      waveSlots.forEach(s => usedKeysSet.add(s.key))
      keyManager.markWinner(winner.usedKey)
      preferredFastModel = winner.usedModel

      return winner
    } catch {
      signal?.removeEventListener('abort', onParentAbort)
      // Marcar todas as chaves da onda como usadas (falharam)
      waveSlots.forEach(s => usedKeysSet.add(s.key))
      return null
    }
  }

  // ===== EXECUÇÃO EM ONDAS =====
  const usedKeys = new Set<string>()
  let lastErrors = ''

  // Onda 1: 2 chaves mais rápidas
  const wave1Keys = keysPool.filter(k => !usedKeys.has(k.key)).slice(0, 2)
  const wave1Result = await runWave('Onda 1', wave1Keys, modelPool, usedKeys)
  if (wave1Result) {
    const durationMs = wave1Result.plan.durationMs || (Date.now() - startTime)
    const keyMask = KeyManager.maskKey(wave1Result.usedKey)
    onProgress?.(`⚡ ${durationMs}ms via '${wave1Result.usedModel}' (${wave1Result.slotLabel}: ${keyMask})`, 'info')
    return wave1Result
  }

  if (signal?.aborted) throw new Error('Operação cancelada pelo usuário.')

  // Onda 2: próximas 2 chaves não usadas (se existirem)
  const wave2Keys = keysPool.filter(k => !usedKeys.has(k.key)).slice(0, 2)
  if (wave2Keys.length > 0) {
    // Modelo alternativo na onda 2 para diversificar
    const wave2Models = [...modelPool].reverse()
    const wave2Result = await runWave('Onda 2', wave2Keys, wave2Models, usedKeys)
    if (wave2Result) {
      const durationMs = wave2Result.plan.durationMs || (Date.now() - startTime)
      const keyMask = KeyManager.maskKey(wave2Result.usedKey)
      onProgress?.(`⚡ ${durationMs}ms via '${wave2Result.usedModel}' (${wave2Result.slotLabel}: ${keyMask})`, 'info')
      return wave2Result
    }
  }

  if (signal?.aborted) throw new Error('Operação cancelada pelo usuário.')

  // Fallback final: 1 chave não usada (incluindo as em cooldown curto)
  const allFallbackKeys = keyManager.getAllKeys()
    .filter(k => !usedKeys.has(k.key) && !sessionQuotaBlacklist.has(k.key))
    .sort((a, b) => (a.lastLatencyMs ?? 99999) - (b.lastLatencyMs ?? 99999))

  if (allFallbackKeys.length > 0) {
    const fbKey = allFallbackKeys[0]
    const fbModel = modelPool[0] || 'gemini-3.6-flash'
    onProgress?.(`Fallback: ${fbModel} com ${(fbKey as any).label || 'chave reserva'}...`, 'info')
    try {
      const fbCtrl = new AbortController()
      const fbTimeout = setTimeout(() => { try { fbCtrl.abort() } catch {} }, 16000)
      const res = await callSingleModel(fbModel, fbKey.key, payloadBase, keepalive, fbCtrl.signal)
      clearTimeout(fbTimeout)
      const parsedPlan = validateAnalysisPlan(robustParsePlan(res.rawText))
      parsedPlan.usedModel = res.usedModel
      parsedPlan.durationMs = Date.now() - startTime
      parsedPlan.promptSent = userText
      parsedPlan.rawResponse = res.rawText
      keyManager.markSuccess(fbKey.key, parsedPlan.durationMs)
      preferredFastModel = fbModel
      const fbMask = KeyManager.maskKey(fbKey.key)
      onProgress?.(`⚡ Fallback OK: ${parsedPlan.durationMs}ms via '${fbModel}' (${fbMask})`, 'info')
      return { plan: parsedPlan, rawUsage: undefined, usedModel: fbModel, usedKey: fbKey.key }
    } catch (fbErr) {
      lastErrors = fbErr instanceof Error ? fbErr.message : String(fbErr)
    }
  }

  // Todos os métodos falharam
  throw new Error(lastErrors || 'Todas as ondas e fallback falharam. Verifique sua cota e conexão.')
}

