import type { AnalysisPlan } from '../core/types'
import { loadDomainCache } from '../core/storage'
import { captureCurrentContext, captureFullPageText } from './detector'
import { findElementExt, findBestNavigationButton, simulatePointerClick } from './executor'

export type AutopilotStatus = 'idle' | 'waiting' | 'analyzing' | 'advancing' | 'error'

export interface AutopilotCallbacks {
  onStatusChange: (status: AutopilotStatus, message: string, colorClass?: string) => void
  onRequestAnalysis: (attempt?: number) => Promise<AnalysisPlan | null>
  isManualModeActive?: () => boolean
  onPageAdvance?: () => void
}

export class Autopilot {
  private active = false
  private timer: number | null = null
  private callbacks: AutopilotCallbacks
  private lastRunTime = 0
  private lastActionTime = 0
  private isProcessing = false

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
    this.loop()
  }

  public stop() {
    this.active = false
    if (this.timer) clearTimeout(this.timer)
    this.callbacks.onStatusChange('idle', '> [SYS] Autopilot DESATIVADO.')
  }

  private errorCount = 0
  private lastPageSig = ''
  private samePageCount = 0

  private async loop() {
    if (!this.active) return
    
    const now = Date.now()
    
    // Throttle básico
    if (now - this.lastRunTime < 2500 || this.isProcessing) {
      this.timer = window.setTimeout(() => this.loop(), 500)
      return
    }

    this.lastRunTime = now

    try {
      this.isProcessing = true
      
      let context = captureCurrentContext(false)
      if (!context) {
        context = captureFullPageText()
      }

      if (context) {
        const currentSig = `${context.pageTitle}_${context.questionText.slice(0, 80)}_${context.controls.length}`
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
          await new Promise((r) => setTimeout(r, 4000))
        }

        if (this.samePageCount >= 4) {
          const fallbackNav = findBestNavigationButton()
          if (fallbackNav) {
            this.callbacks.onStatusChange(
              'advancing',
              '> [SYS] Forçando acionamento de botão de avanço para desbloquear questão...',
              'text-yellow',
            )
            simulatePointerClick(fallbackNav)
            this.samePageCount = 0
            await new Promise((r) => setTimeout(r, 2000))
            return
          }
        }

        const answerControls = context.controls.filter((c) => c.role === 'answer')
        const cache = loadDomainCache(window.location.hostname)

        if (answerControls.length > 0) {
          // TEM QUESTÃO / EXERCÍCIO NA TELA (Múltipla escolha, texto, categorização, arrastar-soltar)
          this.callbacks.onStatusChange('analyzing', '> [IA] Questão/Exercício detectado. Consultando IA...', 'text-blue')
          await new Promise((r) => setTimeout(r, 600))
          const plan = await this.callbacks.onRequestAnalysis(this.samePageCount)
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
          } else {
            this.errorCount++
            const cooldown = this.errorCount === 1 ? 5000 : 8000
            this.callbacks.onStatusChange(
              'waiting',
              `> [AVISO] Falha na análise (${this.errorCount}/3). Aguardando ${cooldown / 1000}s para estabilização antes de tentar novamente...`,
              'text-yellow',
            )
            await new Promise((r) => setTimeout(r, cooldown))
          }
          this.lastActionTime = Date.now()
        } else if (cache.advanceSelector && findElementExt(cache.advanceSelector) && context.questionText.length < 50) {
          // TELA INFORMATIVA SIMPLES E JÁ SABEMOS O BOTÃO DE AVANÇO
          const btn = findElementExt(cache.advanceSelector)
          if (btn) {
            this.callbacks.onStatusChange('advancing', `> [BRUTE] Avançando via cache "${cache.advanceSelector}"...`)
            await new Promise((r) => setTimeout(r, 1000))
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
          await new Promise((r) => setTimeout(r, 600))
          const plan = await this.callbacks.onRequestAnalysis(this.samePageCount)
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
              await new Promise((r) => setTimeout(r, 1800))
            } else if (plan.pageType === 'start') {
              this.callbacks.onStatusChange('advancing', '> [SYS] Início de módulo detectado. Iniciando...', 'text-blue')
              await new Promise((r) => setTimeout(r, 1800))
            } else if (plan.pageType === 'conclusion') {
              this.callbacks.onStatusChange('idle', '> [SYS] Atividade concluída! Desligando Autopilot.', 'text-green')
              this.stop()
              return
            }
            this.errorCount = 0
          } else {
            this.errorCount++
            const cooldown = this.errorCount === 1 ? 5000 : 8000
            this.callbacks.onStatusChange(
              'waiting',
              `> [AVISO] Falha ao processar página (${this.errorCount}/3). Aguardando ${cooldown / 1000}s para estabilização antes de tentar novamente...`,
              'text-yellow',
            )
            await new Promise((r) => setTimeout(r, cooldown))
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
      const errText = err instanceof Error ? err.message : String(err)
      console.warn('[EasyQuiz Autopilot]', err)
      this.callbacks.onStatusChange('error', `> [ERRO NO AUTOPILOT] ${errText}`, 'text-red')
    } finally {
      this.isProcessing = false
    }
    
    if (this.active) {
      this.timer = window.setTimeout(() => this.loop(), 1000)
    }
  }
}
