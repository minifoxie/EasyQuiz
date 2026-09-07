import type { AnalysisPlan } from '../core/types'
import { loadDomainCache } from '../core/storage'
import { captureCurrentContext, captureFullPageText, createContextSignature } from './detector'
import { findElementExt, simulatePointerClick } from './executor'

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
  private timer: number | null = null
  private callbacks: AutopilotCallbacks
  private lastRunTime = 0
  private lastActionTime = 0
  private isProcessing = false
  private observer: MutationObserver | null = null
  private mutationTimer: number | null = null
  private abortController: AbortController | null = null

  constructor(callbacks: AutopilotCallbacks) {
    this.callbacks = callbacks
  }

  public isActive(): boolean {
    return this.active
  }

  public start() {
    if (this.active) return
    this.active = true
    this.lastActionTime = Date.now()
    this.callbacks.onStatusChange('waiting', '> [SYS] Autopilot ENGAGED. Monitorando...')
    if (typeof MutationObserver !== 'undefined') {
      this.observer = new MutationObserver(() => {
        if (!this.active || this.isProcessing) return
        if (this.mutationTimer) clearTimeout(this.mutationTimer)
        // 400ms de debounce — evita re-trigger durante execução de ações DOM
        this.mutationTimer = window.setTimeout(() => {
          this.mutationTimer = null
          if (!this.isProcessing) void this.loop()
        }, 400)
      })
      this.observer.observe(document.body, { subtree: true, childList: true, attributes: true, characterData: true })
    }
    this.loop()
  }

  public stop() {
    this.active = false
    if (this.abortController) {
      try {
        this.abortController.abort()
      } catch {}
      this.abortController = null
    }
    if (this.timer) clearTimeout(this.timer)
    if (this.mutationTimer) clearTimeout(this.mutationTimer)
    this.mutationTimer = null
    this.observer?.disconnect()
    this.observer = null
    this.isProcessing = false
    this.callbacks.onStatusChange('idle', '> [SYS] Autopilot DESATIVADO pelo usuário.', 'text-yellow')
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => {
      if (!this.active) return resolve()
      let timeoutId: number | null = null
      const onAbort = () => {
        if (timeoutId) clearTimeout(timeoutId)
        resolve()
      }
      timeoutId = window.setTimeout(() => {
        resolve()
      }, ms)
      this.abortController?.signal.addEventListener('abort', onAbort, { once: true })
    })
  }

  private errorCount = 0
  private lastPageSig = ''
  private samePageCount = 0

  private async loop() {
    if (!this.active) return
    
    const now = Date.now()
    
    // Throttle básico — reduzido para máxima velocidade de resposta
    if (now - this.lastRunTime < 1500 || this.isProcessing) {
      this.timer = window.setTimeout(() => this.loop(), 300)
      return
    }

    this.lastRunTime = now

    try {
      this.isProcessing = true
      if (!this.active) return
      
      let context = captureCurrentContext(false)
      if (!context) {
        context = captureFullPageText()
      }

      if (!this.active) return

      if (context) {
        // Auto-Finalização Inteligente: se a atividade já foi concluída, desliga o Autopilot com certeza absoluta
        if (detectActivityCompletion(context.scope, context.questionText)) {
          this.callbacks.onStatusChange(
            'idle',
            '> [SYS] 🏆 Atividade concluída detectada na página! Desligando Autopilot com sucesso.',
            'text-green',
          )
          this.stop()
          return
        }

        const currentSig = createContextSignature(context)
        if (currentSig === this.lastPageSig) {
          this.samePageCount++
        } else {
          const hadRepetition = this.samePageCount > 1
          this.lastPageSig = currentSig
          this.samePageCount = 1
          if (hadRepetition) {
            this.callbacks.onStatusChange(
              'waiting',
              '> [SYS] Avanço de página detectado! Retomando monitoramento automático...',
              'text-green',
            )
            this.callbacks.onPageAdvance?.()
          }
        }

        // Se o gabarito manual estiver aberto na tela (resolução manual pelo usuário),
        // aguarda o usuário posicionar e avançar a tela, sem gastar tokens da IA nem forçar skip!
        if (this.callbacks.isManualModeActive?.()) {
          this.callbacks.onStatusChange(
            'waiting',
            '> [SYS] Gabarito manual ativo na tela. Aguardando você posicionar as respostas e avançar a página...',
            'text-yellow',
          )
          this.lastRunTime = Date.now()
          return
        }

        if (this.samePageCount > 1) {
          this.callbacks.onStatusChange(
            'waiting',
            `> [AUTOPILOT] Resolução pendente (${this.samePageCount}ª verificação). Conclua e avance para prosseguir...`,
            'text-yellow',
          )
          await this.sleep(4000)
          if (!this.active) return
        }

        const answerControls = context.controls.filter((c) => c.role === 'answer')
        const cache = loadDomainCache(window.location.hostname)

        if (answerControls.length > 0) {
          // TEM QUESTÃO / EXERCÍCIO NA TELA (Múltipla escolha, texto, categorização, arrastar-soltar)
          this.callbacks.onStatusChange('analyzing', '> [IA] Questão/Exercício detectado. Consultando IA...', 'text-blue')
          if (!this.active) return

          this.abortController = new AbortController()
          const plan = await this.callbacks.onRequestAnalysis(this.samePageCount, this.abortController.signal)
          this.abortController = null
          if (!this.active) return

          if (plan) {
            this.callbacks.onStatusChange(
              'analyzing',
              `> [IA] (${plan.usedModel || 'gemini'}) Confiança: ${(plan.confidence * 100).toFixed(1)}% | Modo: ${plan.mode}`,
              'text-blue',
            )
            this.callbacks.onStatusChange('analyzing', `> [IA] Raciocínio: ${plan.rationale}`, 'text-blue')
            this.callbacks.onStatusChange('analyzing', `> [IA] Ações geradas: ${plan.actions.length}`, 'text-blue')
            this.errorCount = 0

            if (plan.memoryToStore) {
              this.callbacks.onStatusChange('analyzing', `> [IA] 🧠 Memória RAG salva: "${plan.memoryToStore}"`, 'text-yellow')
            }

            if (plan.pageType === 'conclusion') {
              this.callbacks.onStatusChange('idle', '> [SYS] Atividade concluída! Desligando Autopilot.', 'text-green')
              this.stop()
              return
            }

            // Fix re-análise: após análise bem-sucedida, bloquear re-análise imediata da mesma página.
            // O próximo loop só analisa novamente se o conteúdo DOM mudar (nova sig).
            this.lastPageSig = currentSig + '_resolved'
            this.samePageCount = 0
          } else {
            this.errorCount++
            const cooldown = this.errorCount === 1 ? 5000 : 8000
            this.callbacks.onStatusChange(
              'waiting',
              `> [AVISO] Falha na análise (${this.errorCount}/3). Aguardando ${cooldown / 1000}s...`,
              'text-yellow',
            )
            await this.sleep(cooldown)
          }
          this.lastActionTime = Date.now()
        } else if (cache.advanceSelector && findElementExt(cache.advanceSelector) && context.questionText.length < 50) {
          // TELA INFORMATIVA SIMPLES E JÁ SABEMOS O BOTÃO DE AVANÇO
          const btn = findElementExt(cache.advanceSelector)
          if (btn) {
            this.callbacks.onStatusChange('advancing', `> [BRUTE] Avançando via cache "${cache.advanceSelector}"...`)
            await this.sleep(1000)
            if (!this.active) return
            simulatePointerClick(btn)
            this.lastActionTime = Date.now()
            this.errorCount = 0
          }
        } else {
          // PÁGINA DE CONTEXTO, ARTIGO TEÓRICO, TELA DE INÍCIO OU FALLBACK
          this.callbacks.onStatusChange(
            'analyzing',
            '> [IA] Página informativa/contexto detectada. Lendo e consultando IA...',
            'text-blue',
          )
          if (!this.active) return

          this.abortController = new AbortController()
          const plan = await this.callbacks.onRequestAnalysis(this.samePageCount, this.abortController.signal)
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
              this.callbacks.onStatusChange('analyzing', `> [IA] 🧠 Conteúdo absorvido na memória: "${plan.memoryToStore}"`, 'text-yellow')
            }

            if (plan.pageType === 'info') {
              this.callbacks.onStatusChange('advancing', '> [IA] 📖 Leitura concluída. Avançando automaticamente...', 'text-green')
              await this.sleep(1800)
            } else if (plan.pageType === 'start') {
              this.callbacks.onStatusChange('advancing', '> [SYS] Início de módulo detectado. Iniciando...', 'text-blue')
              await this.sleep(1800)
            } else if (plan.pageType === 'conclusion') {
              this.callbacks.onStatusChange('idle', '> [SYS] Atividade concluída! Desligando Autopilot.', 'text-green')
              this.stop()
              return
            }
            this.errorCount = 0

            // Fix re-análise: marcar página como resolvida para evitar loop em página info/start
            this.lastPageSig = currentSig + '_resolved'
            this.samePageCount = 0
          } else {
            this.errorCount++
            const cooldown = this.errorCount === 1 ? 5000 : 8000
            this.callbacks.onStatusChange(
              'waiting',
              `> [AVISO] Falha ao processar página (${this.errorCount}/3). Aguardando ${cooldown / 1000}s...`,
              'text-yellow',
            )
            await this.sleep(cooldown)
          }
          this.lastActionTime = Date.now()
        }

        if (this.errorCount >= 3) {
          this.callbacks.onStatusChange(
            'error',
            '> [ERRO] 3 falhas consecutivas. Abortando Autopilot para poupar sua cota e tokens.',
            'text-red',
          )
          this.callbacks.onStatusChange(
            'waiting',
            '> [DICA] Verifique a mensagem vermelha de [ERRO DETALHADO] no console acima para saber o motivo exato.',
            'text-yellow',
          )
          this.stop()
          return
        }
      } else {
        this.callbacks.onStatusChange(
          'waiting',
          '> [SYS] Monitorando página... Aguardando carregamento dos elementos.',
        )
      }
    } catch (err) {
      if (!this.active) return
      const errText = err instanceof Error ? err.message : String(err)
      if (errText.includes('cancelada') || errText.includes('aborted')) return
      console.warn('[EasyQuiz Autopilot]', err)
      this.callbacks.onStatusChange('error', `> [ERRO NO AUTOPILOT] ${errText}`, 'text-red')
    } finally {
      this.abortController = null
      this.isProcessing = false
    }
    
    if (this.active) {
      this.timer = window.setTimeout(() => this.loop(), 1000)
    }
  }
}
