import type { AnalysisPlan } from '../core/types'
import { loadDomainCache } from '../core/storage'
import { captureCurrentContext } from './detector'
import { findElementExt, simulatePointerClick } from './executor'

export type AutopilotStatus = 'idle' | 'waiting' | 'analyzing' | 'advancing' | 'error'

export interface AutopilotCallbacks {
  onStatusChange: (status: AutopilotStatus, message: string, colorClass?: string) => void
  onRequestAnalysis: () => Promise<AnalysisPlan | null>
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
          this.callbacks.onStatusChange('analyzing', '> [IA] Questão detectada. Consultando Gemini...', 'text-blue')
          await new Promise(r => setTimeout(r, 800))
          const plan = await this.callbacks.onRequestAnalysis()
          if (plan) {
            this.callbacks.onStatusChange('analyzing', `> [IA] Confiança: ${(plan.confidence * 100).toFixed(1)}% | Modo: ${plan.mode}`, 'text-blue')
            this.callbacks.onStatusChange('analyzing', `> [IA] Raciocínio: ${plan.rationale}`, 'text-blue')
            this.callbacks.onStatusChange('analyzing', `> [IA] Ações geradas: ${plan.actions.length}`, 'text-blue')
          }
          this.lastActionTime = Date.now()
        } else if (cache.advanceSelector && findElementExt(cache.advanceSelector)) {
          // TELA INFORMATIVA E JÁ SABEMOS O BOTÃO, E ELE ESTÁ NA TELA
          const btn = findElementExt(cache.advanceSelector)
          if (btn) {
            this.callbacks.onStatusChange('advancing', `> [BRUTE] Avançando via cache "${cache.advanceSelector}"...`)
            await new Promise(r => setTimeout(r, 1200))
            simulatePointerClick(btn)
            this.lastActionTime = Date.now()
          }
        } else {
          // NÃO TEM QUESTÃO E (NÃO SABEMOS O BOTÃO OU ELE NÃO ESTÁ NA TELA)
          // Aciona a IA para ela descobrir qual é a ação correta
          this.callbacks.onStatusChange('analyzing', '> [IA] Rota desconhecida ou botão ausente. Mapeando...', 'text-blue')
          await new Promise(r => setTimeout(r, 800))
          const plan = await this.callbacks.onRequestAnalysis()
          if (plan) {
            this.callbacks.onStatusChange('analyzing', `> [IA] Confiança: ${(plan.confidence * 100).toFixed(1)}% | Modo: ${plan.mode}`, 'text-blue')
            this.callbacks.onStatusChange('analyzing', `> [IA] Raciocínio: ${plan.rationale}`, 'text-blue')
            this.callbacks.onStatusChange('analyzing', `> [IA] Ações geradas: ${plan.actions.length}`, 'text-blue')
          }
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
