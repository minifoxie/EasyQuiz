/**
 * DemandApplicator — Motor robusto de aplicação gradual por input do usuário.
 * Executa interactionFlow[] passo a passo: cada tecla ou clique do usuário
 * dispara exatamente 1 etapa do plano da IA.
 *
 * Melhorias de robustez:
 * - Tentativas de fallback quando elemento não encontrado (ordinal, label, texto)
 * - insertChars lida com React controlled inputs, contenteditable, select, etc.
 * - Timeout de 45s por etapa (não trava para sempre)
 * - Toast de erro específico por tipo de falha
 * - Retoma automaticamente após erro parcial
 */

import type { InteractionStep } from './promptDiscrete'
import type { CoinCursor } from './coinCursor'
import type { CornerToast } from './cornerToast'
import type { StealthHighlight } from './stealthHighlight'
import { findElementExt, simulatePointerClick } from '../dom/executor'

export type ApplicatorState = 'idle' | 'waiting_key' | 'waiting_click' | 'done' | 'aborted'

const IGNORE_KEYS = new Set([
  'Control','Alt','Meta','Shift','CapsLock','Tab','Escape',
  'F1','F2','F3','F4','F5','F6','F7','F8','F9','F10','F11','F12',
  'PrintScreen','ScrollLock','Pause','Insert','Home','End','PageUp','PageDown',
  'ArrowLeft','ArrowRight','ArrowUp','ArrowDown','ContextMenu','NumLock',
])

const EQ_HOTKEYS = [
  (e: KeyboardEvent) => e.shiftKey && e.key === 'Q',
  (e: KeyboardEvent) => e.shiftKey && e.key === 'A',
  (e: KeyboardEvent) => e.shiftKey && e.key === 'M',
  (e: KeyboardEvent) => e.shiftKey && e.key === 'Z',
  (e: KeyboardEvent) => e.shiftKey && e.key === 'R',
  (e: KeyboardEvent) => e.shiftKey && e.key === 'H',
  (e: KeyboardEvent) => e.altKey,
]
const isEqHotkey = (e: KeyboardEvent) => EQ_HOTKEYS.some(f => f(e))

// Setter nativo — bypassa React/Vue controlled inputs
const nativeInputSetter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set
const nativeTextareaSetter = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value')?.set

export class DemandApplicator {
  private flow: InteractionStep[] = []
  private stepIdx = 0
  private state: ApplicatorState = 'idle'

  private coin: CoinCursor
  private toast: CornerToast
  private highlight: StealthHighlight

  private statusId: string | null = null
  private stepTimer: number | null = null

  // Progresso de texto por campo: id → chars já inseridos
  private textProgress = new Map<string, number>()
  // Execuções de select com 2 cliques: rastreamos fase (abrir=0 / selecionar=1)
  private selPhase = new Map<string, number>()

  private boundKey: (e: KeyboardEvent) => void
  private boundClick: (e: MouseEvent) => void

  constructor(coin: CoinCursor, toast: CornerToast, highlight: StealthHighlight) {
    this.coin = coin
    this.toast = toast
    this.highlight = highlight
    this.boundKey   = this.onKey.bind(this)
    this.boundClick = this.onClick.bind(this)
  }

  start(flow: InteractionStep[]): void {
    this.abort()
    if (!flow?.length) return
    this.flow = flow
    this.stepIdx = 0
    this.textProgress.clear()
    this.selPhase.clear()
    this.state = 'idle'
    this.attach()
    this.gotoStep(0)
  }

  abort(): void {
    if (this.state === 'idle' || this.state === 'done' || this.state === 'aborted') return
    this.detach()
    this.clearStepTimer()
    this.state = 'aborted'
    this.highlight.clearAll()
    this.dismissStatus()
    this.coin.flashError(1200)
    this.toast.flash('Process Aborted')
  }

  isActive   (): boolean { return this.state === 'waiting_key' || this.state === 'waiting_click' }
  getState   (): ApplicatorState { return this.state }
  getCurrentStep(): number { return this.stepIdx }
  getTotalSteps (): number { return this.flow.length }

  // ─── Listeners ───────────────────────────────────────────────────────────

  private attach(): void {
    window.addEventListener('keydown', this.boundKey,   { capture: true })
    window.addEventListener('click',   this.boundClick, { capture: true })
  }

  private detach(): void {
    window.removeEventListener('keydown', this.boundKey,   { capture: true })
    window.removeEventListener('click',   this.boundClick, { capture: true })
  }

  // ─── Navegação de etapas ─────────────────────────────────────────────────

  private gotoStep(idx: number): void {
    this.clearStepTimer()

    if (idx >= this.flow.length) { this.complete(); return }

    this.stepIdx = idx
    const step = this.flow[idx]
    this.state = step.trigger === 'key' ? 'waiting_key' : 'waiting_click'

    // Highlight no elemento desta etapa
    this.highlight.clearAll()
    const action = step.action as Record<string, unknown>
    if (action.id) {
      const el = this.resolveEl(action)
      if (el) this.highlight.highlightTarget([el])
    }

    // Toast de hint
    this.dismissStatus()
    const msg = step.hint || (step.trigger === 'key' ? 'Keyboard Interact' : 'Mouse Interact')
    this.statusId = this.toast.persist(msg)

    // customMsg secundária
    if (step.customMsg) {
      setTimeout(() => {
        if (this.stepIdx === idx) this.toast.flash(step.customMsg!)
      }, 500)
    }

    // Timeout de segurança: se ficar 45s sem input, avisa e aguarda
    this.stepTimer = window.setTimeout(() => {
      if (this.stepIdx === idx && this.isActive()) {
        const trigger = step.trigger === 'key' ? 'Keyboard Interact' : 'Mouse Interact'
        if (this.statusId) this.statusId = this.toast.replace(this.statusId, trigger)
      }
    }, 45_000)
  }

  private clearStepTimer(): void {
    if (this.stepTimer !== null) { clearTimeout(this.stepTimer); this.stepTimer = null }
  }

  // ─── Handler de Teclado ──────────────────────────────────────────────────

  private onKey(e: KeyboardEvent): void {
    if (IGNORE_KEYS.has(e.key) || isEqHotkey(e)) return

    if (this.state === 'waiting_click') {
      // Usuário errou o tipo de input — sugere sem consumir
      this.toast.flash('Mouse Interact')
      return
    }
    if (this.state !== 'waiting_key') return

    const step = this.flow[this.stepIdx]
    const action = step.action as Record<string, unknown>

    if (action.t === 'val') {
      const id   = String(action.id ?? '')
      const full = String(action.v  ?? '')
      const chars = step.chars ?? 3
      const done  = this.insertChars(id, full, chars)

      if (done) {
        this.dismissStatus()
        this.highlight.clearAll()
        this.coin.flashOk(700)
        // Pequeno delay antes de avançar para parecer natural
        setTimeout(() => this.gotoStep(this.stepIdx + 1), 180)
      } else {
        // Atualiza progresso
        const inserted = this.textProgress.get(id) ?? 0
        const pct = full.length > 0 ? Math.round((inserted / full.length) * 100) : 0
        if (this.statusId) this.statusId = this.toast.replace(this.statusId, `Buffer ${pct}%`)
      }
    }
  }

  // ─── Handler de Clique ───────────────────────────────────────────────────

  private onClick(e: MouseEvent): void {
    const target = e.target as HTMLElement | null
    if (!target) return
    // Ignora cliques dentro de elementos EQ
    if (target.closest('#__eqdm_menu__,#__eqkm_overlay__,#__eqdiscrete_coin__,#__eqdiscrete_toasts__')) return

    if (this.state === 'waiting_key') {
      this.toast.flash('Keyboard Interact')
      return
    }
    if (this.state !== 'waiting_click') return

    const step = this.flow[this.stepIdx]
    const action = step.action as Record<string, unknown>

    void this.executeClickAction(action, step).then(ok => {
      this.highlight.clearAll()
      this.dismissStatus()
      if (ok) this.coin.flashOk(600)
      // Avança sempre (melhor esforço)
      setTimeout(() => this.gotoStep(this.stepIdx + 1), ok ? 200 : 100)
    })
  }

  // ─── Executor de Ações ───────────────────────────────────────────────────

  private async executeClickAction(
    action: Record<string, unknown>,
    step: InteractionStep,
  ): Promise<boolean> {
    const t = String(action.t ?? '')

    try {
      if (t === 'chk') {
        const el = this.resolveEl(action)
        if (!el) { this.toast.flash('Element Miss'); return false }
        const inp = (el instanceof HTMLInputElement && (el.type === 'checkbox' || el.type === 'radio'))
          ? el
          : el.querySelector('input[type="checkbox"],input[type="radio"]') as HTMLInputElement | null
        if (inp) {
          if (!inp.checked) simulatePointerClick(inp)
          else inp.checked = true
        } else {
          simulatePointerClick(el)
        }
        return true
      }

      if (t === 'clk') {
        const el = this.resolveEl(action)
        if (!el) { this.toast.flash('Element Miss'); return false }
        simulatePointerClick(el)
        return true
      }

      if (t === 'sel') {
        const el = this.resolveEl(action)
        if (!el) { this.toast.flash('Element Miss'); return false }
        const sel = el instanceof HTMLSelectElement
          ? el
          : el.querySelector('select') as HTMLSelectElement | null

        if (sel) {
          const raw  = action.v
          const vals = Array.isArray(raw) ? raw.map(String) : [String(raw ?? '')]
          const target = vals[0]
          for (let i = 0; i < sel.options.length; i++) {
            const o = sel.options[i]
            if (o.value === target || o.text.trim() === target) {
              sel.selectedIndex = i
              sel.dispatchEvent(new Event('change', { bubbles: true }))
              return true
            }
          }
          // fallback: selecionar pelo índice numérico se target for número
          const idx = parseInt(target, 10)
          if (!isNaN(idx) && idx >= 0 && idx < sel.options.length) {
            sel.selectedIndex = idx
            sel.dispatchEvent(new Event('change', { bubbles: true }))
            return true
          }
        }
        // Fallback: clique no elemento
        simulatePointerClick(el)
        return true
      }

      if (t === 'drag') {
        const from = findElementExt(action.from as string)
        const to   = findElementExt(action.to   as string)
        if (from) simulatePointerClick(from)
        if (from && to) {
          // Simula drag via pointerdown/pointerup
          from.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, cancelable: true }))
          await new Promise(r => setTimeout(r, 80))
          to.dispatchEvent(new PointerEvent('pointerup',   { bubbles: true, cancelable: true }))
          to.dispatchEvent(new MouseEvent('drop',          { bubbles: true, cancelable: true }))
        }
        return !!from
      }

      if (t === 'adv') {
        // Usuário clicou num botão de avanço — registra e avança fluxo
        return true
      }

      if (t === 'js') {
        // Segurança: não executa js arbitrário em modo discreto
        return false
      }

    } catch {
      this.toast.flash('Exec Error')
      return false
    }

    return false
  }

  // ─── Inserção de Texto (robusta) ─────────────────────────────────────────

  /**
   * Insere `chars` caracteres do `fullText` no campo identificado por `id`.
   * Retorna true quando o texto inteiro foi inserido.
   * Lida com: input, textarea, React controlled, contenteditable.
   */
  private insertChars(id: string, fullText: string, chars: number): boolean {
    const el = this.resolveElById(id)
    if (!el) {
      // Não achou o campo — avança para não travar
      this.toast.flash('Field Not Found')
      return true
    }

    const already = this.textProgress.get(id) ?? 0
    if (already >= fullText.length) return true

    const slice  = fullText.slice(already, already + chars)
    const newPos = already + slice.length

    // Resolve o input real (pode ser input filho dentro de um container)
    const input = this.resolveInput(el)
    if (!input) return true

    if (input instanceof HTMLInputElement || input instanceof HTMLTextAreaElement) {
      const current = input.value
      const newVal  = current + slice

      // Usa setter nativo para passar pelos controlled inputs do React/Vue
      const setter = input instanceof HTMLInputElement ? nativeInputSetter : nativeTextareaSetter
      if (setter) {
        setter.call(input, newVal)
      } else {
        input.value = newVal
      }

      // Dispara eventos na ordem correta para React/Vue/Angular detectar
      input.dispatchEvent(new Event('input',  { bubbles: true, cancelable: true }))
      input.dispatchEvent(new Event('change', { bubbles: true, cancelable: true }))

      // Posiciona o cursor no final
      try {
        const len = newVal.length
        input.setSelectionRange(len, len)
      } catch {}

    } else if ((input as HTMLElement).contentEditable === 'true') {
      // contenteditable
      const ce = input as HTMLElement
      const current = ce.textContent ?? ''
      ce.textContent = current + slice
      // Move cursor ao final
      try {
        const range = document.createRange()
        const sel   = window.getSelection()
        range.selectNodeContents(ce)
        range.collapse(false)
        sel?.removeAllRanges()
        sel?.addRange(range)
      } catch {}
      ce.dispatchEvent(new Event('input',  { bubbles: true }))
      ce.dispatchEvent(new Event('change', { bubbles: true }))
    }

    this.textProgress.set(id, newPos)

    if (newPos >= fullText.length) {
      // Sinaliza fim do campo com blur suave
      try { (input as HTMLInputElement).blur?.() } catch {}
      setTimeout(() => { try { (input as HTMLInputElement).focus?.() } catch {} }, 50)
      return true
    }

    return false
  }

  // ─── Resolução de Elementos ──────────────────────────────────────────────

  /** Resolve elemento para ações click/chk/sel/drag */
  private resolveEl(action: Record<string, unknown>): HTMLElement | null {
    const id = String(action.id ?? '')
    if (id) {
      const el = findElementExt(id, String(action.v ?? ''))
      if (el) return el
    }
    // Fallback: busca por texto/label
    const label = String(action.label ?? action.v ?? '')
    if (label) {
      const el = findElementExt(label)
      if (el) return el
    }
    return null
  }

  /** Resolve elemento para inserção de texto — prefere inputs */
  private resolveElById(id: string): HTMLElement | null {
    if (!id) return null
    // findElementExt com preferInput=true
    return findElementExt(id, '', true) ?? findElementExt(id)
  }

  /** Resolve o input real dentro de um container */
  private resolveInput(el: HTMLElement): HTMLElement | null {
    if (
      el instanceof HTMLInputElement ||
      el instanceof HTMLTextAreaElement ||
      el.contentEditable === 'true'
    ) return el

    const child = el.querySelector(
      'input:not([type="hidden"]):not([type="submit"]):not([type="button"]):not([type="radio"]):not([type="checkbox"]), textarea, [contenteditable="true"]'
    ) as HTMLElement | null

    return child ?? el
  }

  // ─── Conclusão ───────────────────────────────────────────────────────────

  private complete(): void {
    this.state = 'done'
    this.detach()
    this.clearStepTimer()
    this.highlight.clearAll()
    this.dismissStatus()
    this.coin.flashOk(2000)
    this.toast.flash('Cache Atualizado')
  }

  private dismissStatus(): void {
    if (this.statusId) { this.toast.dismiss(this.statusId); this.statusId = null }
  }

  destroy(): void {
    this.abort()
    this.detach()
    this.clearStepTimer()
  }
}
