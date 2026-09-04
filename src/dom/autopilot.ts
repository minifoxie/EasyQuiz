import { loadDomainCache } from '../core/storage'
import { captureCurrentContext } from './detector'
import { findElementExt, simulatePointerClick } from './executor'

export type AutopilotStatus = 'idle' | 'waiting' | 'analyzing' | 'advancing' | 'error'

export interface AutopilotCallbacks {
  onStatusChange: (status: AutopilotStatus, message: string) => void
  onRequestAnalysis: () => Promise<void>
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
      
      let context
      try {
        context = captureCurrentContext(false)
      } catch (err) {
        // Se falhar em capturar (não achou main), ignora e espera
      }

      if (context) {
        // Filtra para achar campos que requerem preenchimento
        // inputs, selects, textareas que não são botões
        const inputControls = context.controls.filter(c => c.tag !== 'button' && c.type !== 'submit')
        const cache = loadDomainCache(window.location.hostname)
        
        if (inputControls.length > 0) {
          // TEM QUESTÃO NA TELA!
          this.callbacks.onStatusChange('analyzing', '> [IA] Questão detectada. Consultando Gemini...')
          await new Promise(r => setTimeout(r, 800))
          await this.callbacks.onRequestAnalysis()
          this.lastActionTime = Date.now()
        } else if (cache.advanceSelector) {
          // TELA INFORMATIVA E JÁ SABEMOS O BOTÃO
          const btn = findElementExt(cache.advanceSelector)
          if (btn) {
            this.callbacks.onStatusChange('advancing', `> [BRUTE] Avançando via cache "${cache.advanceSelector}"...`)
            await new Promise(r => setTimeout(r, 1200))
            simulatePointerClick(btn)
            this.lastActionTime = Date.now()
          } else {
            // Sabemos o seletor mas não achamos na tela. Pode ser um delay de renderização.
            this.callbacks.onStatusChange('waiting', '> [SYS] Aguardando tela renderizar...')
          }
        } else {
          // NÃO TEM QUESTÃO E NÃO SABEMOS O BOTÃO (EX: TELA DE INÍCIO INÉDITA)
          // Aciona a IA para ela descobrir qual é o botão de avançar/iniciar e salvar no cache!
          this.callbacks.onStatusChange('analyzing', '> [IA] Mapeando rota desconhecida...')
          await new Promise(r => setTimeout(r, 800))
          await this.callbacks.onRequestAnalysis()
          this.lastActionTime = Date.now()
        }
      }
    } catch (err) {
      console.warn('[EasyQuiz Autopilot]', err)
    } finally {
      this.isProcessing = false
    }
    
    if (this.active) {
      this.timer = window.setTimeout(() => this.loop(), 1000)
    }
  }
}
