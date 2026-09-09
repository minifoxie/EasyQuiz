/**
 * DemandApplicator — Motor de aplicação gradual por input do usuário.
 * Executa etapas do interactionFlow uma a uma, disparadas por teclado ou clique.
 */

import type { InteractionStep } from './promptDiscrete'
import type { CoinCursor } from './coinCursor'
import type { CornerToast } from './cornerToast'
import type { StealthHighlight } from './stealthHighlight'
import { findElementExt, simulatePointerClick } from '../dom/executor'
import type { DeclarativeAction } from '../core/types'

export type ApplicatorState = 'idle' | 'waiting_key' | 'waiting_click' | 'done' | 'aborted'

/** Teclas ignoradas pelo listener de fluxo — sistema, atalhos EQ, etc. */
const IGNORE_KEYS = new Set([
  'Control', 'Alt', 'Meta', 'Shift', 'CapsLock', 'Tab', 'Escape',
  'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12',
  'PrintScreen', 'ScrollLock', 'Pause', 'Insert', 'Home', 'End', 'PageUp', 'PageDown',
  'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown',
  'ContextMenu', 'NumLock',
])

/** Padrão de teclas de sistema EasyQuiz para não conflitar */
const EQ_HOTKEYS = [
  (e: KeyboardEvent) => e.shiftKey && e.key === 'Q',
  (e: KeyboardEvent) => e.shiftKey && e.key === 'A',
  (e: KeyboardEvent) => e.shiftKey && e.key === 'M',
  (e: KeyboardEvent) => e.shiftKey && e.key === 'Z',
  (e: KeyboardEvent) => e.shiftKey && e.key === 'R',
  (e: KeyboardEvent) => e.shiftKey && e.key === 'H',
  (e: KeyboardEvent) => e.altKey && e.key === 'Q',
  (e: KeyboardEvent) => e.altKey && e.key === 'q',
]

function isEqHotkey(e: KeyboardEvent): boolean {
  return EQ_HOTKEYS.some(fn => fn(e))
}

export class DemandApplicator {
  private flow: InteractionStep[] = []
  private currentStep = 0
  private state: ApplicatorState = 'idle'

  private coin: CoinCursor
  private toast: CornerToast
  private highlight: StealthHighlight

  private statusToastId: string | null = null

  private boundKey: (e: KeyboardEvent) => void
  private boundClick: (e: MouseEvent) => void

  // Rastreia texto já inserido por campo (id → chars inseridos)
  private textProgress: Map<string, number> = new Map()

  constructor(coin: CoinCursor, toast: CornerToast, highlight: StealthHighlight) {
    this.coin = coin
    this.toast = toast
    this.highlight = highlight

    this.boundKey = this.onKey.bind(this)
    this.boundClick = this.onClick.bind(this)
  }

  /** Inicia o fluxo com as etapas planejadas pela IA */
  start(flow: InteractionStep[]): void {
    this.abort()
    if (!flow || flow.length === 0) return

    this.flow = flow
    this.currentStep = 0
    this.textProgress.clear()
    this.state = 'idle'

    this.attachListeners()
    this.advanceToStep(0)
  }

  /** Aborta o fluxo ativo */
  abort(): void {
    if (this.state === 'idle' || this.state === 'done' || this.state === 'aborted') return
    this.detachListeners()
    this.state = 'aborted'
    this.highlight.clearAll()
    this.dismissStatus()
    this.coin.flashError(1500)
    this.toast.flash('Process Aborted')
  }

  isActive(): boolean {
    return this.state === 'waiting_key' || this.state === 'waiting_click'
  }

  getState(): ApplicatorState { return this.state }

  getCurrentStep(): number { return this.currentStep }
  getTotalSteps(): number { return this.flow.length }

  private attachListeners(): void {
    window.addEventListener('keydown', this.boundKey, { capture: true })
    window.addEventListener('click', this.boundClick, { capture: true })
  }

  private detachListeners(): void {
    window.removeEventListener('keydown', this.boundKey, { capture: true })
    window.removeEventListener('click', this.boundClick, { capture: true })
  }

  private advanceToStep(idx: number): void {
    if (idx >= this.flow.length) {
      this.complete()
      return
    }

    this.currentStep = idx
    const step = this.flow[idx]
    this.state = step.trigger === 'key' ? 'waiting_key' : 'waiting_click'

    // Resolve elemento-alvo desta etapa e aplica highlight
    const action = step.action as Record<string, unknown>
    if (action.id) {
      const el = findElementExt(action.id as string)
      if (el) {
        this.highlight.highlightTarget([el])
      }
    }

    // Exibe hint ou customMsg no canto
    this.dismissStatus()
    const msg = step.hint || (step.trigger === 'key' ? 'Keyboard Interact' : 'Mouse Interact')
    this.statusToastId = this.toast.persist(msg)

    // Se há customMsg, exibe como toast temporário adicional após 400ms
    if (step.customMsg) {
      setTimeout(() => {
        if (this.currentStep === idx) {
          this.toast.flash(step.customMsg!)
        }
      }, 400)
    }
  }

  private onKey(e: KeyboardEvent): void {
    if (this.state !== 'waiting_key') {
      // Usuário usou teclado mas o sistema espera clique — dica
      if (this.state === 'waiting_click' && !IGNORE_KEYS.has(e.key) && !isEqHotkey(e)) {
        this.toast.flash('Mouse Interact')
      }
      return
    }

    if (IGNORE_KEYS.has(e.key) || isEqHotkey(e)) return

    // Não bloqueia a tecla — o site processa normalmente
    const step = this.flow[this.currentStep]
    const action = step.action as Record<string, unknown>

    if (action.t === 'val') {
      // Insere chars do texto da resposta no campo
      const done = this.insertChars(
        action.id as string,
        action.v as string,
        step.chars ?? 3,
      )
      if (done) {
        // Texto completo inserido — avança para próxima etapa
        this.dismissStatus()
        this.toast.flash('Field Complete')
        this.highlight.clearAll()
        this.coin.flashOk(1000)
        setTimeout(() => this.advanceToStep(this.currentStep + 1), 300)
      } else {
        // Atualiza progresso no hint
        const id = action.id as string
        const inserted = this.textProgress.get(id) || 0
        const total = (action.v as string).length
        const pct = Math.round((inserted / total) * 100)
        if (this.statusToastId) {
          this.statusToastId = this.toast.replace(this.statusToastId, `Buffer ${pct}%`)
        }
      }
    }
  }

  private onClick(e: MouseEvent): void {
    // Ignora cliques dentro de overlays EQ
    const target = e.target as HTMLElement | null
    if (!target) return
    if (
      target.closest(
        '#__eqdm_menu__, #__eqkm_overlay__, #__eqdiscrete_coin__, #__eqdiscrete_toasts__',
      )
    ) return

    if (this.state !== 'waiting_click') {
      if (this.state === 'waiting_key') {
        this.toast.flash('Keyboard Interact')
      }
      return
    }

    const step = this.flow[this.currentStep]
    const action = step.action as Record<string, unknown>

    // Executa a ação discretamente
    void this.executeAction(action).then(success => {
      this.highlight.clearAll()
      this.dismissStatus()
      if (success) {
        this.coin.flashOk(800)
        this.toast.flash(step.hint || 'Click Registered')
        setTimeout(() => this.advanceToStep(this.currentStep + 1), 250)
      } else {
        // Falhou mas continua (melhor esforço)
        this.toast.flash('Pointer Event')
        setTimeout(() => this.advanceToStep(this.currentStep + 1), 200)
      }
    })
  }

  private async executeAction(action: Record<string, unknown>): Promise<boolean> {
    const t = action.t as string
    try {
      if (t === 'chk') {
        const el = findElementExt(action.id as string)
        if (!el) return false
        const input = el.querySelector('input[type="checkbox"], input[type="radio"]') as HTMLInputElement | null
          || (el instanceof HTMLInputElement ? el : null)
        if (input && !input.checked) {
          simulatePointerClick(input)
          return true
        }
        simulatePointerClick(el)
        return true
      }

      if (t === 'clk') {
        const el = findElementExt(action.id as string)
        if (!el) return false
        simulatePointerClick(el)
        return true
      }

      if (t === 'sel') {
        const el = findElementExt(action.id as string)
        if (!el) return false
        const sel = el instanceof HTMLSelectElement ? el : el.querySelector('select') as HTMLSelectElement | null
        if (sel) {
          const values = Array.isArray(action.v) ? action.v : [String(action.v ?? '')]
          const target = values[0]
          for (let i = 0; i < sel.options.length; i++) {
            const opt = sel.options[i]
            if (opt.value === target || opt.textContent?.trim() === target) {
              sel.selectedIndex = i
              sel.dispatchEvent(new Event('change', { bubbles: true }))
              return true
            }
          }
        }
        return false
      }

      if (t === 'drag') {
        // drag: delega para executePlan via import dinâmico para não inflar o bundle
        const from = findElementExt(action.from as string)
        const to = findElementExt(action.to as string)
        if (from && to) {
          simulatePointerClick(from) // fallback: clique no item
          return true
        }
        return false
      }

      if (t === 'adv') {
        // adv: o usuário clicou manualmente — apenas registra
        return true
      }

    } catch {
      return false
    }
    return false
  }

  /** Insere chars do texto da resposta no campo-alvo via eventos sintéticos */
  private insertChars(id: string, fullText: string, chars: number): boolean {
    const el = findElementExt(id)
    if (!el) return true // se não achar, avança

    const input = el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement
      ? el
      : el.querySelector('input:not([type="hidden"]), textarea') as HTMLInputElement | null

    if (!input) return true

    const already = this.textProgress.get(id) || 0
    if (already >= fullText.length) return true // já completo

    const slice = fullText.slice(already, already + chars)
    const newInserted = already + slice.length

    // Injeta via eventos nativos para compatibilidade máxima
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype, 'value'
    )?.set || Object.getOwnPropertyDescriptor(
      window.HTMLTextAreaElement.prototype, 'value'
    )?.set

    const currentVal = input.value
    const newVal = currentVal + slice

    if (nativeInputValueSetter) {
      nativeInputValueSetter.call(input, newVal)
    } else {
      input.value = newVal
    }

    input.dispatchEvent(new Event('input', { bubbles: true }))
    input.dispatchEvent(new Event('change', { bubbles: true }))

    this.textProgress.set(id, newInserted)

    if (newInserted >= fullText.length) {
      input.dispatchEvent(new Event('blur', { bubbles: true }))
      return true
    }
    return false
  }

  private complete(): void {
    this.state = 'done'
    this.detachListeners()
    this.highlight.clearAll()
    this.dismissStatus()
    this.coin.flashOk(2000)
    this.toast.flash('Cache Atualizado')
  }

  private dismissStatus(): void {
    if (this.statusToastId) {
      this.toast.dismiss(this.statusToastId)
      this.statusToastId = null
    }
  }

  destroy(): void {
    this.abort()
    this.detachListeners()
  }
}
