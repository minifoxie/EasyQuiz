import type { AnalysisPlan } from '../core/types'
import { loadDomainCache } from '../core/storage'
import { captureCurrentContext, captureFullPageText, createContextSignature, createContentSignature } from './detector'
import { findElementExt, simulatePointerClick, findBestNavigationButton } from './executor'

export type AutopilotStatus = 'idle' | 'waiting' | 'analyzing' | 'advancing' | 'error'

export interface AutopilotCallbacks {
  onStatusChange: (status: AutopilotStatus, message: string, colorClass?: string) => void
  onRequestAnalysis: (attempt?: number, signal?: AbortSignal) => Promise<AnalysisPlan | null>
  isManualModeActive?: () => boolean
  onPageAdvance?: () => void
}

export function detectActivityCompletion(scope?: HTMLElement | null, text = ''): boolean {
  if (typeof document === 'undefined') return false
  const targetScope = scope || document.body
  const combinedText = (text + ' ' + (targetScope.textContent || '')).toLowerCase()

  // 1. Elementos característicos de celebração / tela final
  const hasCelebrationEl = Boolean(
    targetScope.querySelector(
      '.celebration-icon, [class*="celebrat" i], [class*="conclu" i], [class*="finish" i], [class*="result" i], [class*="score-screen" i], [data-testid*="completion" i], [data-functional-selector*="game-over" i], .perseus-message-renderer, [data-congratulations]',
    ),
  )
  if (
    hasCelebrationEl &&
    (combinedText.includes('parabéns') ||
      combinedText.includes('conclu') ||
      combinedText.includes('finaliz') ||
      combinedText.includes('resultado') ||
      combinedText.includes('pontua') ||
      combinedText.includes('sucesso') ||
      combinedText.includes('🏆') ||
      combinedText.includes('game over') ||
      combinedText.includes('great job'))
  ) {
    return true
  }

  // 2. Frases inequívocas de encerramento da atividade
  const completionKeywords = [
    'parabéns! lista de exercícios concluída',
    'exercícios concluída',
    'lista de exercícios concluída',
    'atividade concluída',
    'atividade finalizada',
    'finalizado com sucesso',
    'finalizada com sucesso',
    'simulado concluído',
    'simulado finalizado',
    'questionário concluído',
    'questionário finalizado',
    'você concluiu a atividade',
    'você concluiu o questionário',
    'sua resposta foi registrada',
    'todas as perguntas foram respondidas',
    'quiz completed',
    'exercise completed',
    'activity completed',
    'all questions answered',
    'view results',
    // Wayground/Quizizz
    'game over',
    'leaderboard',
    'scoreboard',
    // Khan Academy
    'awesome',
    'great job',
    'you got it right',
    'mission complete',
    // Google Forms
    'your response has been recorded',
    'sua resposta foi registrada',
  ]

  return completionKeywords.some((phrase) => combinedText.includes(phrase))
}

export class Autopilot {
  private active = false
  private callbacks: AutopilotCallbacks
  private isProcessing = false
  private observer: MutationObserver | null = null
  private mutationTimer: number | null = null
  private heartbeatTimer: number | null = null
  private abortController: AbortController | null = null

  // Estado inteligente — baseado em conteúdo, não em valores
  private errorCount = 0
  private resolvedSigs = new Set<string>()  // sigs de conteúdo já analisadas com SUCESSO
  private lastContentSig = ''               // última sig de conteúdo vista
  private lastAttemptSig = ''               // última sig tentada (independente de sucesso)
  private lastAttemptTime = 0              // timestamp da última tentativa

  constructor(callbacks: AutopilotCallbacks) {
    this.callbacks = callbacks
  }

  public isActive(): boolean {
    return this.active
  }

  public start() {
    if (this.active) return
    this.active = true
    this.callbacks.onStatusChange('waiting', '> [SYS] Autopilot ENGAGED. Monitorando...')

    if (typeof MutationObserver !== 'undefined') {
      this.observer = new MutationObserver(() => {
        if (!this.active || this.isProcessing) return
        if (this.mutationTimer) clearTimeout(this.mutationTimer)
        // 120ms de debounce — rápido o suficiente para detectar nova página,
        // mas sem disparar para cada pequena mutação de atributo
        this.mutationTimer = window.setTimeout(() => {
          this.mutationTimer = null
          if (!this.isProcessing) void this.checkAndAnalyze()
        }, 120)
      })
      // Observar tudo: childList + characterData + attributes
      // attributes=true é essencial para SPAs React/Vue que trocam conteúdo via props/estado
      this.observer.observe(document.body, { subtree: true, childList: true, characterData: true, attributes: true })
    }

    // Heartbeat de 5s como fallback para SPAs que não geram mutações
    this.scheduleHeartbeat()
    void this.checkAndAnalyze()
  }

  public stop() {
    this.active = false
    if (this.abortController) {
      try { this.abortController.abort() } catch {}
      this.abortController = null
    }
    if (this.mutationTimer) { clearTimeout(this.mutationTimer); this.mutationTimer = null }
    if (this.heartbeatTimer) { clearTimeout(this.heartbeatTimer); this.heartbeatTimer = null }
    this.observer?.disconnect()
    this.observer = null
    this.isProcessing = false
    this.resolvedSigs.clear()
    this.callbacks.onStatusChange('idle', '> [SYS] Autopilot DESATIVADO pelo usuário.', 'text-yellow')
  }

  private scheduleHeartbeat() {
    if (this.heartbeatTimer) clearTimeout(this.heartbeatTimer)
    this.heartbeatTimer = window.setTimeout(() => {
      this.heartbeatTimer = null
      if (this.active && !this.isProcessing) void this.checkAndAnalyze()
      if (this.active) this.scheduleHeartbeat()
    }, 3000)  // 3s fallback — reduz spam em páginas lentas
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => {
      if (!this.active) return resolve()
      let tid: number | null = null
      const onAbort = () => { if (tid) clearTimeout(tid); resolve() }
      tid = window.setTimeout(resolve, ms)
      this.abortController?.signal.addEventListener('abort', onAbort, { once: true })
    })
  }

  /**
   * Verificação principal — orientada a eventos, sem cooldown.
   * Só analisa se o CONTEÚDO mudou (nova questão), não valores preenchidos.
   */
  private async checkAndAnalyze() {
    if (!this.active || this.isProcessing) return

    try {
      this.isProcessing = true

      let context = captureCurrentContext(false)
      if (!context) context = captureFullPageText()
      if (!this.active) return

      if (!context) {
        this.callbacks.onStatusChange('waiting', '> [SYS] Monitorando página... Aguardando elementos.')
        return
      }

      // Detecção de fim de atividade
      if (detectActivityCompletion(context.scope, context.questionText)) {
        this.callbacks.onStatusChange('idle', '> [SYS] 🏆 Atividade concluída! Autopilot finalizado.', 'text-green')
        this.stop()
        return
      }

      // Gabarito manual ativo — aguardar intervenção do usuário
      if (this.callbacks.isManualModeActive?.()) {
        this.callbacks.onStatusChange('waiting', '> [SYS] Gabarito manual ativo. Aguardando você avançar...', 'text-yellow')
        return
      }

      // Assinatura de CONTEÚDO (sem valores preenchidos)
      const contentSig = createContentSignature(context)

      // REGRA PRINCIPAL: só pular se já foi resolvido com SUCESSO
      // NÃO bloquear retries após falha — a condição anterior era incorreta
      if (this.resolvedSigs.has(contentSig)) {
        return
      }

      // Throttle leve: evitar re-análise em ráfaga da mesma página não-resolvida
      // (ex: múltiplas mutações do observer em sequência)
      const now = Date.now()
      if (contentSig === this.lastAttemptSig && now - this.lastAttemptTime < 1500) {
        // Silenciosamente aguarda — não loga para não poluir a UI
        return
      }

      // NOVA QUESTÃO DETECTADA ou primeira execução
      const isNewPage = contentSig !== this.lastContentSig
      if (isNewPage && this.lastContentSig !== '') {
        this.callbacks.onStatusChange('waiting', '> [SYS] Nova questão detectada! Analisando...', 'text-green')
        this.callbacks.onPageAdvance?.()
        this.errorCount = 0  // reset contador de erros em nova página
      }
      this.lastContentSig = contentSig
      this.lastAttemptSig = contentSig
      this.lastAttemptTime = now

      const answerControls = context.controls.filter((c) => c.role === 'answer')
      const cache = loadDomainCache(window.location.hostname)

      if (answerControls.length > 0) {
        // QUESTÃO COM CONTROLES DE RESPOSTA
        this.callbacks.onStatusChange('analyzing', '> [IA] Questão detectada. Consultando IA...', 'text-blue')
        if (!this.active) return

        this.abortController = new AbortController()
        const plan = await this.callbacks.onRequestAnalysis(1, this.abortController.signal)
        this.abortController = null
        if (!this.active) return

        if (plan) {
          this.callbacks.onStatusChange(
            'analyzing',
            `> [IA] (${plan.usedModel || 'gemini'}) Confiança: ${(plan.confidence * 100).toFixed(1)}% | Modo: ${plan.mode}`,
            'text-blue',
          )
          this.callbacks.onStatusChange('analyzing', `> [IA] Raciocínio: ${plan.rationale}`, 'text-blue')
          this.callbacks.onStatusChange('analyzing', `> [IA] Ações: ${plan.actions.length}`, 'text-blue')
          this.errorCount = 0

          if (plan.memoryToStore) {
            this.callbacks.onStatusChange('analyzing', `> [IA] 🧠 Memória RAG: "${plan.memoryToStore}"`, 'text-yellow')
          }

          if (plan.pageType === 'conclusion') {
            this.callbacks.onStatusChange('idle', '> [SYS] Atividade concluída! Desligando Autopilot.', 'text-green')
            this.stop()
            return
          }

          // Marcar conteúdo como resolvido — MutationObserver vai ignorar próximas mutações
          // de valores (checkmarks, campos preenchidos) desta mesma questão
          this.resolvedSigs.add(contentSig)

        } else {
          this.errorCount++
          const cooldown = this.errorCount === 1 ? 5000 : 8000
          this.callbacks.onStatusChange('waiting', `> [AVISO] Falha na análise (${this.errorCount}). Aguardando ${cooldown / 1000}s...`, 'text-yellow')
          await this.sleep(cooldown)
          // Reset do throttle para permitir retry imediato após o cooldown
          this.lastAttemptTime = 0
        }

      } else {
        // SEM CONTROLES DE RESPOSTA — envia para a IA de qualquer forma
        // (pode ser página info, start, conclusion, ou questão com DOM não carregado)
        this.callbacks.onStatusChange('analyzing', '> [IA] Página sem controles detectados. Consultando IA...', 'text-blue')
        if (!this.active) return

        this.abortController = new AbortController()
        const plan = await this.callbacks.onRequestAnalysis(1, this.abortController.signal)
        this.abortController = null
        if (!this.active) return

        if (plan) {
          this.callbacks.onStatusChange(
            'analyzing',
            `> [IA] (${plan.usedModel || 'gemini'}) Tipo: ${plan.pageType} | Modo: ${plan.mode}`,
            'text-blue',
          )
          this.callbacks.onStatusChange('analyzing', `> [IA] Raciocínio: ${plan.rationale}`, 'text-blue')

          if (plan.memoryToStore) {
            this.callbacks.onStatusChange('analyzing', `> [IA] 🧠 Absorvido: "${plan.memoryToStore}"`, 'text-yellow')
          }

          if (plan.pageType === 'conclusion') {
            this.callbacks.onStatusChange('idle', '> [SYS] Atividade concluída! Desligando Autopilot.', 'text-green')
            this.stop()
            return
          }

          if (plan.pageType === 'info') {
            this.callbacks.onStatusChange('advancing', '> [IA] 📖 Leitura concluída. Avançando...', 'text-green')
            await this.sleep(100)
          } else if (plan.pageType === 'start') {
            this.callbacks.onStatusChange('advancing', '> [SYS] Início detectado. Iniciando...', 'text-blue')
            await this.sleep(100)
          }

          this.errorCount = 0
          // Só marca como resolvido se a IA confirmou o tipo de página e emitiu actions
          if (plan.actions.length > 0) this.resolvedSigs.add(contentSig)

        } else {
          this.errorCount++
          const cooldown = this.errorCount === 1 ? 5000 : 8000
          this.callbacks.onStatusChange('waiting', `> [AVISO] Falha ao processar página (${this.errorCount}). Aguardando ${cooldown / 1000}s...`, 'text-yellow')
          await this.sleep(cooldown)
          this.lastAttemptTime = 0
        }
      }

      // Após muitas falhas consecutivas: não para — apenas emite aviso e reinicia o contador
      // Parar permanentemente causava o bug de "desistir" que o usuário relatou
      if (this.errorCount >= 5) {
        this.callbacks.onStatusChange('waiting', '> [AVISO] Muitas falhas. Reiniciando contadores e aguardando 15s...', 'text-yellow')
        this.errorCount = 0
        this.lastAttemptTime = 0
        await this.sleep(15000)
      }

    } catch (err) {
      if (!this.active) return
      const errText = err instanceof Error ? err.message : String(err)
      if (errText.includes('cancelada') || errText.includes('aborted')) return
      // Erros de infraestrutura (rede/timeout) não contam como falha de conteúdo
      const isInfraError = /timeout|aborted|network|failed to fetch|cancelad/i.test(errText)
      if (!isInfraError) this.errorCount++
      console.warn('[EasyQuiz Autopilot]', err)
      this.callbacks.onStatusChange('error', `> [ERRO NO AUTOPILOT] ${errText}`, 'text-red')
    } finally {
      this.abortController = null
      this.isProcessing = false
      // Re-verificar imediatamente após análise concluir:
      // captura mudanças de página que ocorreram DURANTE o fetch da IA (isProcessing bloqueava o observer)
      if (this.active) {
        window.setTimeout(() => void this.checkAndAnalyze(), 150)
      }
    }
  }
}

