/**
 * DemandApplicator — Motor corrigido.
 * Fix crítico: insertChars com fullText vazio retornava true imediatamente → "Concluído" falso.
 * Fix: chk/clk não re-simulam (clique natural já aplicou).
 * Fix: flashOk duração adequada.
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

  // Progresso de texto por STEP INDEX (não por ID)
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
    this.detach()
    this.clearTimer()
    const wasActive = this.isActive()
    this.state = 'aborted'
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

  // ── Listeners ────────────────────────────────────────────────────────────

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
    const trigger = step.trigger === 'key' ? 'waiting_key' : 'waiting_click'
    this.state   = trigger as ApplicatorState

    // Highlight e foco no campo alvo
    const action = step.action as Record<string, unknown>
    if (action.id || action.label) {
      const el = this.resolveEl(action)
      if (el) {
        this.highlight.highlightTarget([el])
        if (step.trigger === 'key') {
          const input = this.resolveInput(el)
          try { (input as HTMLInputElement)?.focus?.() } catch {}
        }
      }
    }

    // Toast principal — hint da etapa
    const hint = step.hint || (step.trigger === 'key' ? 'Keyboard Interact' : 'Mouse Interact')
    this.toast.flash(hint)

    // customMsg secundário após 700ms
    if (step.customMsg) {
      setTimeout(() => {
        if (this.stepIdx === idx && this.isActive()) this.toast.flash(step.customMsg!)
      }, 700)
    }

    // Timeout de segurança: 90s sem input → reexibe hint
    this.stepTimer = window.setTimeout(() => {
      if (this.stepIdx === idx && this.isActive()) this.toast.flash(hint)
    }, 90_000)
  }

  private clearTimer(): void {
    if (this.stepTimer !== null) { clearTimeout(this.stepTimer); this.stepTimer = null }
  }

  // ── Teclado ──────────────────────────────────────────────────────────────

  private onKey(e: KeyboardEvent): void {
    if (IGNORE_KEYS.has(e.key) || isEqHotkey(e)) return

    if (this.state === 'waiting_click') {
      this.toast.flash('Mouse Interact')
      return
    }
    if (this.state !== 'waiting_key') return

    const step   = this.flow[this.stepIdx]
    const action = step.action as Record<string, unknown>

    if (action.t === 'val') {
      const fullText = String(action.v ?? '')
      const chars    = step.chars ?? 3

      // FIX CRÍTICO: texto vazio não avança automaticamente —
      // pede ao usuário que pressione qualquer tecla para confirmar
      if (fullText.length === 0) {
        this.clearTimer()
        this.highlight.clearAll()
        setTimeout(() => this.gotoStep(this.stepIdx + 1), 100)
        return
      }

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
  }

  // ── Clique ───────────────────────────────────────────────────────────────

  private onClick(e: MouseEvent): void {
    const t = e.target as HTMLElement | null
    if (!t) return
    // Ignora cliques nos elementos EQ
    if (t.closest('#__eqdm_menu__,#__eqkm_overlay__,#__eqcm_menu__,#__eqdiscrete_coin__,#__eqdiscrete_toasts__')) return

    if (this.state === 'waiting_key') {
      this.toast.flash('Keyboard Interact')
      return
    }
    if (this.state !== 'waiting_click') return

    const step   = this.flow[this.stepIdx]
    const action = step.action as Record<string, unknown>
    const aType  = String(action.t ?? '')

    // Para chk/clk: o clique do usuário JÁ aplicou a ação.
    // Apenas avançamos — NÃO re-simulamos (evita double-click em checkbox).
    if (aType === 'chk' || aType === 'clk' || aType === 'adv') {
      this.clearTimer()
      this.highlight.clearAll()
      this.coin.flashOk(1000)
      setTimeout(() => this.gotoStep(this.stepIdx + 1), 150)
      return
    }

    // Para sel/drag: precisamos de ação programática
    void this.execProgrammatic(action, step).then(ok => {
      this.clearTimer()
      this.highlight.clearAll()
      if (ok) this.coin.flashOk(1000)
      setTimeout(() => this.gotoStep(this.stepIdx + 1), 180)
    })
  }

  // ── Ações programáticas (sel, drag) ──────────────────────────────────────

  private async execProgrammatic(action: Record<string, unknown>, _step: InteractionStep): Promise<boolean> {
    const t = String(action.t ?? '')
    try {
      if (t === 'sel') {
        const el  = this.resolveEl(action)
        if (!el) return false
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
        // fallback: simula clique
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

    } catch { return false }
    return true
  }

  // ── Inserção de Texto ─────────────────────────────────────────────────────

  private insertChars(
    stepIdx: number,
    action: Record<string, unknown>,
    fullText: string,
    chars: number,
  ): boolean {
    // FIX: nunca divide por zero / nunca retorna true para texto vazio aqui
    if (fullText.length === 0) return false

    const already = this.charsInserted.get(stepIdx) ?? 0
    if (already >= fullText.length) return true

    const el = this.resolveEl(action)
    if (!el) {
      this.toast.flash('Campo não achado')
      // Avança step (não trava)
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

    this.applyValue(input, slice)
    this.charsInserted.set(stepIdx, newPos)

    if (newPos >= fullText.length) {
      try { (input as HTMLInputElement).blur?.() } catch {}
      return true
    }
    return false
  }

  private applyValue(input: HTMLElement, slice: string): void {
    if (input instanceof HTMLInputElement || input instanceof HTMLTextAreaElement) {
      const newVal  = input.value + slice
      const setter  = input instanceof HTMLInputElement ? nativeInputSetter : nativeTextareaSetter
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
        const range = document.createRange()
        range.selectNodeContents(ce); range.collapse(false)
        const sel = window.getSelection()
        sel?.removeAllRanges(); sel?.addRange(range)
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

  destroy(): void { this.abort(); this.detach(); this.clearTimer() }
}
