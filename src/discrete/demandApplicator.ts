/**
 * DemandApplicator — Motor correto.
 *
 * REGRA FUNDAMENTAL do modo discreto:
 * - Input do usuário (tecla/clique) = SINAL/GATILHO apenas
 * - O sistema aplica a ação no elemento ALVO programaticamente
 * - O clique do usuário pode ser em qualquer lugar da página
 *
 * Fix crítico restaurado: simulatePointerClick(targetEl) para chk/clk.
 * Fix: insertChars com fullText vazio não retorna true imediatamente.
 * Fix: progresso por stepIdx (não por ID) para multi-input correto.
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

const isEqHotkey = (e: KeyboardEvent) =>
  e.altKey || (e.shiftKey && 'QAMZRHIC'.includes(e.key.toUpperCase()))

const nativeInputSetter    = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,   'value')?.set
const nativeTextareaSetter = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype,'value')?.set

export class DemandApplicator {
  private flow: InteractionStep[] = []
  private stepIdx = 0
  private state: ApplicatorState = 'idle'

  private coin: CoinCursor
  private toast: CornerToast
  private highlight: StealthHighlight

  private stepTimer: number | null = null
  // Progresso por STEP INDEX — garante ordem correta em multi-input
  private charsInserted = new Map<number, number>()

  private boundKey:   (e: KeyboardEvent) => void
  private boundClick: (e: MouseEvent)    => void

  constructor(coin: CoinCursor, toast: CornerToast, highlight: StealthHighlight) {
    this.coin = coin; this.toast = toast; this.highlight = highlight
    this.boundKey   = this.onKey.bind(this)
    this.boundClick = this.onClick.bind(this)
  }

  start(flow: InteractionStep[]): void {
    this.abort()
    if (!flow?.length) return
    this.flow = flow
    this.stepIdx = 0
    this.charsInserted.clear()
    this.state = 'idle'
    this.attach()
    this.gotoStep(0)
  }

  abort(): void {
    const wasActive = this.isActive()
    this.state = 'aborted'
    this.detach()
    this.clearTimer()
    this.highlight.clearAll()
    if (wasActive) {
      this.coin.flashError(800)
      this.toast.flash('Abortado')
    }
  }

  isActive    (): boolean        { return this.state === 'waiting_key' || this.state === 'waiting_click' }
  getState    (): ApplicatorState{ return this.state }
  getCurrentStep(): number       { return this.stepIdx }
  getTotalSteps (): number       { return this.flow.length }

  // ── Listeners ─────────────────────────────────────────────────────────────

  private attach(): void {
    window.addEventListener('keydown', this.boundKey,   { capture: true })
    window.addEventListener('click',   this.boundClick, { capture: true })
  }

  private detach(): void {
    window.removeEventListener('keydown', this.boundKey,   { capture: true })
    window.removeEventListener('click',   this.boundClick, { capture: true })
  }

  // ── Navegação ─────────────────────────────────────────────────────────────

  private gotoStep(idx: number): void {
    this.clearTimer()
    this.highlight.clearAll()

    if (idx >= this.flow.length) { this.complete(); return }

    this.stepIdx = idx
    const step   = this.flow[idx]
    this.state   = step.trigger === 'key' ? 'waiting_key' : 'waiting_click'

    // Highlight e foco no campo alvo
    const action = step.action as Record<string, unknown>
    if (action.id || action.label) {
      const el = this.resolveEl(action)
      if (el) {
        this.highlight.highlightTarget([el])
        // Foca o campo para keystrokes chegarem no lugar certo (visualmente)
        if (step.trigger === 'key') {
          const input = this.resolveInput(el)
          try { (input as HTMLInputElement)?.focus?.() } catch {}
        }
      }
    }

    // Toast de hint
    const hint = step.hint || (step.trigger === 'key' ? 'Keyboard Interact' : 'Mouse Interact')
    this.toast.flash(hint)

    if (step.customMsg) {
      setTimeout(() => {
        if (this.stepIdx === idx && this.isActive()) this.toast.flash(step.customMsg!)
      }, 700)
    }

    // Timeout 90s — reexibe hint se usuário não agir
    this.stepTimer = window.setTimeout(() => {
      if (this.stepIdx === idx && this.isActive()) this.toast.flash(hint)
    }, 90_000)
  }

  private clearTimer(): void {
    if (this.stepTimer !== null) { clearTimeout(this.stepTimer); this.stepTimer = null }
  }

  // ── Teclado — GATILHO para injeção de texto ───────────────────────────────

  private onKey(e: KeyboardEvent): void {
    if (IGNORE_KEYS.has(e.key) || isEqHotkey(e)) return

    if (this.state === 'waiting_click') {
      this.toast.flash('Mouse Interact')
      return
    }
    if (this.state !== 'waiting_key') return

    const step   = this.flow[this.stepIdx]
    const action = step.action as Record<string, unknown>

    if (action.t !== 'val') return

    const fullText = String(action.v ?? '')
    const chars    = step.chars ?? 3

    // Texto vazio: qualquer tecla avança para o próximo step
    if (fullText.length === 0) {
      this.clearTimer()
      this.highlight.clearAll()
      setTimeout(() => this.gotoStep(this.stepIdx + 1), 80)
      return
    }

    // Injeta chars no campo ALVO (independente de onde o usuário digitou)
    const done = this.insertChars(this.stepIdx, action, fullText, chars)

    if (done) {
      this.clearTimer()
      this.highlight.clearAll()
      this.coin.flashOk(1200)
      setTimeout(() => this.gotoStep(this.stepIdx + 1), 150)
    } else {
      const inserted = this.charsInserted.get(this.stepIdx) ?? 0
      const pct = Math.round((inserted / fullText.length) * 100)
      this.toast.flash(`${pct}%`)
    }
  }

  // ── Clique — GATILHO para ação no elemento alvo ───────────────────────────

  private onClick(e: MouseEvent): void {
    const t = e.target as HTMLElement | null
    if (!t) return
    if (t.closest('#__eqdm_menu__,#__eqkm_overlay__,#__eqcm_menu__,#__eqdiscrete_coin__,#__eqdiscrete_toasts__')) return

    if (this.state === 'waiting_key') {
      this.toast.flash('Keyboard Interact')
      return
    }
    if (this.state !== 'waiting_click') return

    const step   = this.flow[this.stepIdx]
    const action = step.action as Record<string, unknown>

    void this.execClickAction(action, step).then(ok => {
      this.clearTimer()
      this.highlight.clearAll()
      if (ok) this.coin.flashOk(1200)
      setTimeout(() => this.gotoStep(this.stepIdx + 1), ok ? 200 : 100)
    })
  }

  // ── Executor de clique — aplica ação no elemento ALVO ────────────────────

  private async execClickAction(
    action: Record<string, unknown>,
    _step: InteractionStep,
  ): Promise<boolean> {
    const t = String(action.t ?? '')

    try {
      if (t === 'chk' || t === 'clk') {
        // O clique do usuário foi apenas o SINAL.
        // Aqui clicamos no elemento ALVO identificado pela IA.
        const el = this.resolveEl(action)
        if (!el) { this.toast.flash('Alvo não achado'); return false }
        simulatePointerClick(el)
        return true
      }

      if (t === 'sel') {
        const el  = this.resolveEl(action)
        if (!el) { this.toast.flash('Alvo não achado'); return false }
        const sel = el instanceof HTMLSelectElement ? el
          : el.querySelector('select') as HTMLSelectElement | null
        if (sel) {
          const want = String(Array.isArray(action.v) ? action.v[0] : (action.v ?? ''))
          for (let i = 0; i < sel.options.length; i++) {
            if (sel.options[i].value === want || sel.options[i].text.trim() === want) {
              sel.selectedIndex = i
              sel.dispatchEvent(new Event('change', { bubbles: true }))
              return true
            }
          }
          const ni = parseInt(want, 10)
          if (!isNaN(ni) && ni >= 0 && ni < sel.options.length) {
            sel.selectedIndex = ni
            sel.dispatchEvent(new Event('change', { bubbles: true }))
            return true
          }
        }
        if (el) simulatePointerClick(el)
        return !!el
      }

      if (t === 'drag') {
        const from = findElementExt(String(action.from ?? ''))
        const to   = findElementExt(String(action.to   ?? ''))
        if (from && to) {
          from.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, cancelable: true }))
          await new Promise(r => setTimeout(r, 80))
          to.dispatchEvent(new PointerEvent('pointerup',   { bubbles: true, cancelable: true }))
          to.dispatchEvent(new MouseEvent('drop',          { bubbles: true, cancelable: true }))
          return true
        }
        return false
      }

      if (t === 'adv') {
        // Avanço de página — o clique do usuário já navegou. Apenas avança o step.
        return true
      }

    } catch { this.toast.flash('Erro exec'); return false }

    return true
  }

  // ── Inserção de Texto no campo ALVO ──────────────────────────────────────

  /**
   * Injeta até `chars` caracteres de `fullText` no elemento identificado pela ação.
   * Rastreado por STEP INDEX para garantir ordem correta em grids 3x3, etc.
   * Retorna true quando fullText completo foi inserido.
   */
  private insertChars(
    stepIdx: number,
    action: Record<string, unknown>,
    fullText: string,
    chars: number,
  ): boolean {
    const already = this.charsInserted.get(stepIdx) ?? 0
    if (already >= fullText.length) return true

    const el = this.resolveEl(action)
    if (!el) {
      // Campo não encontrado — avança sem travar
      this.toast.flash('Campo não achado')
      this.charsInserted.set(stepIdx, fullText.length)
      return true
    }

    const input = this.resolveInput(el)
    if (!input) {
      this.charsInserted.set(stepIdx, fullText.length)
      return true
    }

    const slice  = fullText.slice(already, already + chars)
    const newPos = already + slice.length

    this.applyValueSlice(input, slice)
    this.charsInserted.set(stepIdx, newPos)

    if (newPos >= fullText.length) {
      // Blur para salvar — foca o campo brevemente
      try { (input as HTMLInputElement).blur?.() } catch {}
      return true
    }
    return false
  }

  private applyValueSlice(input: HTMLElement, slice: string): void {
    if (input instanceof HTMLInputElement || input instanceof HTMLTextAreaElement) {
      const newVal = input.value + slice
      const setter = input instanceof HTMLInputElement ? nativeInputSetter : nativeTextareaSetter
      if (setter) setter.call(input, newVal)
      else        input.value = newVal
      input.dispatchEvent(new Event('input',  { bubbles: true, cancelable: true }))
      input.dispatchEvent(new Event('change', { bubbles: true, cancelable: true }))
      try { input.setSelectionRange(newVal.length, newVal.length) } catch {}
    } else if ((input as HTMLElement).isContentEditable) {
      const ce = input as HTMLElement
      ce.textContent = (ce.textContent ?? '') + slice
      ce.dispatchEvent(new Event('input', { bubbles: true }))
      try {
        const r = document.createRange(); r.selectNodeContents(ce); r.collapse(false)
        const s = window.getSelection(); s?.removeAllRanges(); s?.addRange(r)
      } catch {}
    }
  }

  // ── Resolução de Elementos ────────────────────────────────────────────────

  private resolveEl(action: Record<string, unknown>): HTMLElement | null {
    const id    = String(action.id    ?? '')
    const val   = String(action.v     ?? '')
    const label = String(action.label ?? '')
    const from  = String(action.from  ?? '')

    if (id)    { const e = findElementExt(id, val, action.t === 'val');  if (e) return e }
    if (label) { const e = findElementExt(label);                        if (e) return e }
    if (from)  { const e = findElementExt(from);                         if (e) return e }
    return null
  }

  private resolveInput(el: HTMLElement): HTMLElement | null {
    if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement || el.isContentEditable) return el
    return el.querySelector(
      'input:not([type=hidden]):not([type=submit]):not([type=button]):not([type=radio]):not([type=checkbox]),textarea,[contenteditable=true]'
    ) as HTMLElement | null ?? el
  }

  // ── Conclusão ─────────────────────────────────────────────────────────────

  private complete(): void {
    this.state = 'done'
    this.detach()
    this.clearTimer()
    this.highlight.clearAll()
    this.coin.flashOk(2500)
    this.toast.flash('Concluído')
  }

  destroy(): void {
    if (this.isActive()) this.abort()
    else { this.detach(); this.clearTimer() }
  }
}
