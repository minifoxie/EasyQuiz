/**
 * DemandApplicator — Motor de aplicação sequencial robusto.
 * Correção crítica: progresso de texto rastreado por STEP INDEX (não por ID),
 * garantindo que 9 inputs em grade sejam preenchidos na sequência correta.
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

// Setters nativos para React/Vue controlled inputs
const nativeInputSetter    = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,   'value')?.set
const nativeTextareaSetter = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype,'value')?.set

export class DemandApplicator {
  private flow: InteractionStep[] = []
  private stepIdx = 0
  private state: ApplicatorState = 'idle'

  private coin: CoinCursor
  private toast: CornerToast
  private highlight: StealthHighlight

  private statusPersisted = false
  private stepTimer: number | null = null

  // ── CHAVE: progresso por STEP INDEX (não por field ID) ──────────────────
  // Isso garante que step 0 (field 0) e step 3 (field 3) são independentes
  // mesmo que os IDs sejam parecidos ou idênticos
  private charsInserted = new Map<number, number>()  // stepIdx → chars já inseridos

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
    if (!this.isActive() && this.state !== 'idle') return
    this.detach()
    this.clearTimer()
    this.state = 'aborted'
    this.highlight.clearAll()
    this.clearStatus()
    this.coin.flashError(1000)
    this.toast.flash('Abortado')
  }

  isActive    (): boolean        { return this.state === 'waiting_key' || this.state === 'waiting_click' }
  getState    (): ApplicatorState{ return this.state }
  getCurrentStep(): number       { return this.stepIdx }
  getTotalSteps (): number       { return this.flow.length }

  // ─── Listeners ───────────────────────────────────────────────────────────

  private attach(): void {
    window.addEventListener('keydown', this.boundKey,   { capture: true })
    window.addEventListener('click',   this.boundClick, { capture: true })
  }

  private detach(): void {
    window.removeEventListener('keydown', this.boundKey,   { capture: true })
    window.removeEventListener('click',   this.boundClick, { capture: true })
  }

  // ─── Navegação ───────────────────────────────────────────────────────────

  private gotoStep(idx: number): void {
    this.clearTimer()
    this.highlight.clearAll()

    if (idx >= this.flow.length) { this.complete(); return }

    this.stepIdx = idx
    const step   = this.flow[idx]
    this.state   = step.trigger === 'key' ? 'waiting_key' : 'waiting_click'

    // Focus no campo desta etapa
    const action = step.action as Record<string, unknown>
    if (action.id) {
      const el = this.resolveEl(action)
      if (el) {
        this.highlight.highlightTarget([el])
        // Foca o campo para o usuário digitar
        if (step.trigger === 'key') {
          const input = this.resolveInput(el)
          try { (input as HTMLElement)?.focus() } catch {}
        }
      }
    }

    // Toast com hint (substituição)
    const hint = step.hint || (step.trigger === 'key' ? 'Keyboard Interact' : 'Mouse Interact')
    this.toast.flash(hint)
    this.statusPersisted = false

    if (step.customMsg) {
      setTimeout(() => { if (this.stepIdx === idx) this.toast.flash(step.customMsg!) }, 600)
    }

    // Segurança: 60s sem input → reexibe hint
    this.stepTimer = window.setTimeout(() => {
      if (this.stepIdx === idx && this.isActive()) {
        this.toast.flash(hint)
      }
    }, 60_000)
  }

  private clearTimer(): void {
    if (this.stepTimer !== null) { clearTimeout(this.stepTimer); this.stepTimer = null }
  }

  // ─── Teclado ─────────────────────────────────────────────────────────────

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
      const done     = this.insertChars(this.stepIdx, action, fullText, chars)

      if (done) {
        this.clearTimer()
        this.highlight.clearAll()
        this.coin.flashOk(500)
        // Pequeno delay natural antes do próximo step
        setTimeout(() => this.gotoStep(this.stepIdx + 1), 120)
      } else {
        // Progresso
        const inserted = this.charsInserted.get(this.stepIdx) ?? 0
        const pct = fullText.length > 0 ? Math.round((inserted / fullText.length) * 100) : 0
        this.toast.flash(`${pct}%`)
      }
    }
  }

  // ─── Clique ──────────────────────────────────────────────────────────────

  private onClick(e: MouseEvent): void {
    const t = e.target as HTMLElement | null
    if (!t) return
    if (t.closest('#__eqdm_menu__,#__eqkm_overlay__,#__eqdiscrete_coin__,#__eqdiscrete_toasts__')) return

    if (this.state === 'waiting_key') {
      this.toast.flash('Keyboard Interact')
      return
    }
    if (this.state !== 'waiting_click') return

    const step   = this.flow[this.stepIdx]
    const action = step.action as Record<string, unknown>

    void this.execClick(action, step).then(ok => {
      this.highlight.clearAll()
      this.clearTimer()
      if (ok) this.coin.flashOk(500)
      setTimeout(() => this.gotoStep(this.stepIdx + 1), ok ? 160 : 80)
    })
  }

  // ─── Execução de Ações ───────────────────────────────────────────────────

  private async execClick(action: Record<string, unknown>, _step: InteractionStep): Promise<boolean> {
    const t = String(action.t ?? '')
    try {
      if (t === 'chk' || t === 'clk') {
        // O clique do usuário JÁ aconteceu (não usamos preventDefault).
        // Não re-simulamos — isso causaria double-click (ex: desmarcaria checkbox).
        // Apenas registramos a ação e avançamos.
        return true
      }

      if (t === 'sel') {
        const el  = this.resolveEl(action)
        if (!el) { this.toast.flash('Miss'); return false }
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
          // fallback índice numérico
          const ni = parseInt(want, 10)
          if (!isNaN(ni) && ni >= 0 && ni < sel.options.length) {
            sel.selectedIndex = ni
            sel.dispatchEvent(new Event('change', { bubbles: true }))
            return true
          }
        }
        simulatePointerClick(el)
        return true
      }

      if (t === 'drag') {
        const from = findElementExt(String(action.from ?? ''))
        const to   = findElementExt(String(action.to   ?? ''))
        if (from && to) {
          from.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, cancelable: true }))
          await new Promise(r => setTimeout(r, 80))
          to.dispatchEvent(new PointerEvent('pointerup',   { bubbles: true, cancelable: true }))
          to.dispatchEvent(new MouseEvent('drop',          { bubbles: true, cancelable: true }))
        } else if (from) simulatePointerClick(from)
        return !!from
      }

      if (t === 'adv') return true

    } catch { this.toast.flash('Erro'); return false }
    return false
  }

  // ─── Inserção de Texto ───────────────────────────────────────────────────

  /**
   * Insere até `chars` caracteres do `fullText` no campo da ação.
   * Rastreia progresso pelo stepIdx (não pelo ID do campo).
   * Retorna true quando o texto completo foi inserido.
   */
  private insertChars(
    stepIdx: number,
    action: Record<string, unknown>,
    fullText: string,
    chars: number,
  ): boolean {
    const already  = this.charsInserted.get(stepIdx) ?? 0
    if (already >= fullText.length) return true

    const el = this.resolveEl(action)
    if (!el) {
      // Campo não encontrado — avança para não travar
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

    this.applyValue(input, slice, fullText, newPos)
    this.charsInserted.set(stepIdx, newPos)

    if (newPos >= fullText.length) {
      // Blur para salvar e focar próximo campo
      try { (input as HTMLInputElement).blur?.() } catch {}
      return true
    }
    return false
  }

  /**
   * Aplica valor ao input usando a técnica correta por tipo de campo.
   */
  private applyValue(input: HTMLElement, slice: string, _full: string, _newPos: number): void {
    if (input instanceof HTMLInputElement || input instanceof HTMLTextAreaElement) {
      const current = input.value
      const newVal  = current + slice
      const setter  = input instanceof HTMLInputElement ? nativeInputSetter : nativeTextareaSetter
      if (setter) setter.call(input, newVal)
      else        input.value = newVal

      // Eventos na ordem exata que React/Angular esperam
      input.dispatchEvent(new Event('input',  { bubbles: true, cancelable: true }))
      input.dispatchEvent(new Event('change', { bubbles: true, cancelable: true }))

      // Cursor ao final
      try { input.setSelectionRange(newVal.length, newVal.length) } catch {}

    } else if ((input as HTMLElement).isContentEditable) {
      // contenteditable (Google Docs, Notion, etc.)
      const ce = input as HTMLElement
      ce.textContent = (ce.textContent ?? '') + slice
      ce.dispatchEvent(new Event('input', { bubbles: true }))
      try {
        const range = document.createRange()
        range.selectNodeContents(ce)
        range.collapse(false)
        const sel = window.getSelection()
        sel?.removeAllRanges()
        sel?.addRange(range)
      } catch {}
    }
  }

  // ─── Resolução ───────────────────────────────────────────────────────────

  private resolveEl(action: Record<string, unknown>): HTMLElement | null {
    const id   = String(action.id    ?? '')
    const val  = String(action.v     ?? '')
    const from = String(action.from  ?? '')
    const label = String(action.label ?? '')

    if (id)    { const e = findElementExt(id, val, action.t === 'val');    if (e) return e }
    if (label) { const e = findElementExt(label);                          if (e) return e }
    if (from)  { const e = findElementExt(from);                           if (e) return e }
    // Último recurso: busca por texto da resposta
    if (val && val.length < 40) { const e = findElementExt(val);           if (e) return e }
    return null
  }

  private resolveInput(el: HTMLElement): HTMLElement | null {
    if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement || el.isContentEditable) return el
    return el.querySelector(
      'input:not([type=hidden]):not([type=submit]):not([type=button]):not([type=radio]):not([type=checkbox]),textarea,[contenteditable=true]'
    ) as HTMLElement | null ?? el
  }

  // ─── Fim ─────────────────────────────────────────────────────────────────

  private complete(): void {
    this.state = 'done'
    this.detach()
    this.clearTimer()
    this.highlight.clearAll()
    this.clearStatus()
    this.coin.flashOk(2000)
    this.toast.flash('Concluído')
  }

  private clearStatus(): void { /* toast é auto-gerenciado pelo CornerToast */ }

  destroy(): void { this.abort(); this.detach(); this.clearTimer() }
}
