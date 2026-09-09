/**
 * DemandApplicator — Motor de Aplicação Discreta Sob Demanda
 *
 * REGRA FUNDAMENTAL do modo discreto:
 * - Input do usuário (tecla/clique) = SINAL/GATILHO apenas.
 * - O sistema aplica a ação no elemento ALVO programaticamente.
 * - O clique do usuário pode ser em qualquer lugar da página.
 *
 * Integração robusta com o motor original do EasyQuiz:
 * - setCheckedState: marcação confiável de checkboxes e rádios em SPAs modernos (React, Vue, Angular),
 *   evitando desmarcações acidentais e falsos positivos em multi-seleção.
 * - simulateDragAndCategorize + findDragTarget: arrasto multi-estratégia para categorização
 *   sem falhas de pointerevent.
 * - Prevenção de concorrência com flag isExecuting para evitar pulos de steps em cliques rápidos.
 */

import type { InteractionStep } from './promptDiscrete'
import type { CoinCursor } from './coinCursor'
import type { CornerToast } from './cornerToast'
import type { StealthHighlight } from './stealthHighlight'
import {
  findElementExt,
  simulatePointerClick,
  setCheckedState,
  findDragTarget,
  simulateDragAndCategorize,
} from '../dom/executor'

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
  private isExecuting = false

  private coin: CoinCursor
  private toast: CornerToast
  private highlight: StealthHighlight

  private stepTimer: number | null = null
  // Progresso por STEP INDEX — garante ordem correta em multi-input
  private charsInserted = new Map<number, number>()

  private boundKey:   (e: KeyboardEvent) => void
  private boundClick: (e: MouseEvent)    => void

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
    this.charsInserted.clear()
    this.state = 'idle'
    this.isExecuting = false
    this.attach()
    this.gotoStep(0)
  }

  abort(): void {
    const wasActive = this.isActive()
    this.state = 'aborted'
    this.isExecuting = false
    this.detach()
    this.clearTimer()
    this.highlight.clearAll()
    if (wasActive) {
      this.coin.flashError(800)
      this.toast.flash('Abortado')
    }
  }

  isActive(): boolean         { return this.state === 'waiting_key' || this.state === 'waiting_click' }
  getState(): ApplicatorState { return this.state }
  getCurrentStep(): number    { return this.stepIdx }
  getTotalSteps(): number     { return this.flow.length }

  // ── Listeners ─────────────────────────────────────────────────────────────

  private attach(): void {
    window.addEventListener('keydown', this.boundKey,   { capture: true })
    window.addEventListener('click',   this.boundClick, { capture: true })
  }

  private detach(): void {
    window.removeEventListener('keydown', this.boundKey,   { capture: true })
    window.removeEventListener('click',   this.boundClick, { capture: true })
  }

  // ── Navegação de Passos ───────────────────────────────────────────────────

  private gotoStep(idx: number): void {
    this.isExecuting = false
    this.clearTimer()
    this.highlight.clearAll()

    if (idx >= this.flow.length) {
      this.complete()
      return
    }

    this.stepIdx = idx
    const step   = this.flow[idx]
    this.state   = step.trigger === 'key' ? 'waiting_key' : 'waiting_click'

    // Highlight e foco no campo alvo
    const action = step.action as Record<string, unknown>
    if (action.id || action.label || action.from) {
      const el = this.resolveEl(action)
      if (el) {
        this.highlight.highlightTarget([el])
        // Foca o campo para feedback visual natural
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
    if (this.stepTimer !== null) {
      clearTimeout(this.stepTimer)
      this.stepTimer = null
    }
  }

  // ── Teclado — GATILHO para injeção de texto ───────────────────────────────

  private onKey(e: KeyboardEvent): void {
    if (IGNORE_KEYS.has(e.key) || isEqHotkey(e)) return

    if (this.state === 'waiting_click') {
      this.toast.flash('Mouse Interact')
      return
    }
    if (this.state !== 'waiting_key' || this.isExecuting) return

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

    // Injeta chars no campo ALVO
    const done = this.insertChars(this.stepIdx, action, fullText, chars)

    if (done) {
      this.clearTimer()
      this.highlight.clearAll()
      this.coin.flashOk(1000)
      setTimeout(() => this.gotoStep(this.stepIdx + 1), 150)
    } else {
      const inserted = this.charsInserted.get(this.stepIdx) ?? 0
      const pct = Math.round((inserted / fullText.length) * 100)
      this.toast.flash(`${pct}%`)
    }
  }

  // ── Clique — GATILHO para ação no elemento alvo ───────────────────────────

  private onClick(e: MouseEvent): void {
    // Bloqueia eventos sintéticos internos
    if (!e.isTrusted) return

    const t = e.target as HTMLElement | null
    if (!t) return
    if (t.closest('#__eqdm_menu__,#__eqkm_overlay__,#__eqcm_menu__,#__eqdiscrete_coin__,#__eqdiscrete_toasts__')) return

    if (this.state === 'waiting_key') {
      this.toast.flash('Keyboard Interact')
      return
    }
    if (this.state !== 'waiting_click') return
    if (this.isExecuting) return

    const step   = this.flow[this.stepIdx]
    const action = step.action as Record<string, unknown>
    const aType  = String(action.t ?? '')

    // Para "adv": o clique natural do usuário navega a página. Apenas avançamos o step.
    if (aType === 'adv') {
      this.clearTimer()
      this.highlight.clearAll()
      setTimeout(() => this.gotoStep(this.stepIdx + 1), 200)
      return
    }

    // Para chk/clk/sel/drag: PREVINE o clique natural do usuário de interferir no DOM
    // e causar toggles indesejados ou duplo clique.
    e.preventDefault()
    this.isExecuting = true

    void this.execClickAction(action, step).then(ok => {
      this.clearTimer()
      this.highlight.clearAll()
      if (ok) this.coin.flashOk(1000)
      setTimeout(() => {
        this.gotoStep(this.stepIdx + 1)
      }, ok ? 180 : 80)
    }).catch(() => {
      this.isExecuting = false
      this.gotoStep(this.stepIdx + 1)
    })
  }

  // ── Executor de clique — aplica ação no elemento ALVO ────────────────────

  private async execClickAction(
    action: Record<string, unknown>,
    _step: InteractionStep,
  ): Promise<boolean> {
    const t = String(action.t ?? '')

    try {
      if (t === 'chk') {
        const el = this.resolveEl(action)
        if (!el) {
          this.toast.flash('Alvo não achado')
          return false
        }

        const card = (el.closest(
          '.option-card, label, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, [class*="option" i], [class*="choice" i], li, tr'
        ) || el) as HTMLElement

        const input = el instanceof HTMLInputElement && ['radio', 'checkbox'].includes(el.type)
          ? el
          : (card.querySelector('input[type="radio"], input[type="checkbox"]') as HTMLInputElement | null) ||
            (card.getAttribute('for') ? (card.ownerDocument.getElementById(card.getAttribute('for')!) as HTMLInputElement | null) : null)

        const shouldCheck = action.c !== undefined ? Boolean(action.c) : true

        // Motor central de estado e clique de checkbox/radio
        setCheckedState(input || card, shouldCheck)

        // Se após o setCheckedState ainda divergir (ex: React controlado), força via descriptor e tracker
        if (input && input.checked !== shouldCheck) {
          try {
            const tracker = (input as any)._valueTracker
            if (tracker) tracker.setValue(!shouldCheck)
          } catch {}
          try {
            const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'checked')?.set
            setter?.call(input, shouldCheck)
          } catch {}
          input.checked = shouldCheck
          input.dispatchEvent(new Event('input', { bubbles: true, composed: true }))
          input.dispatchEvent(new Event('change', { bubbles: true, composed: true }))
        }
        return true
      }

      if (t === 'clk') {
        const el = this.resolveEl(action)
        if (!el) {
          this.toast.flash('Alvo não achado')
          return false
        }

        const isOption = Boolean(
          el.closest('.option-card, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, [class*="option" i], [class*="choice" i]') ||
          el.querySelector('input[type="radio"], input[type="checkbox"]') ||
          (el instanceof HTMLInputElement && ['checkbox', 'radio'].includes(el.type))
        )
        if (isOption) {
          setCheckedState(el, true)
        } else {
          simulatePointerClick(el)
        }
        return true
      }

      if (t === 'sel') {
        const el = this.resolveEl(action)
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
        const fromStr = String(action.from ?? action.id ?? '')
        const toStr   = String(action.to ?? action.label ?? '')
        const fromEl = findDragTarget(fromStr, 'source') || findElementExt(fromStr)
        const toEl   = findDragTarget(toStr, 'destination') || findElementExt(toStr)
        if (fromEl && toEl) {
          await simulateDragAndCategorize(fromEl, toEl)
          return true
        }
        this.toast.flash('Alvo não achado')
        return false
      }

      if (t === 'adv') {
        return true
      }

    } catch {
      this.toast.flash('Erro exec')
      return false
    }

    return true
  }

  // ── Inserção de Texto no campo ALVO ──────────────────────────────────────

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

  // ── Resolução Resiliente de Elementos ─────────────────────────────────────

  private resolveEl(action: Record<string, unknown>): HTMLElement | null {
    const id    = String(action.id    ?? '')
    const val   = String(action.v     ?? '')
    const label = String(action.label ?? '')
    const from  = String(action.from  ?? '')

    if (id)    { const e = findElementExt(id, val, action.t === 'val');  if (e) return e }
    if (label) { const e = findElementExt(label);                        if (e) return e }
    if (from)  { const e = findElementExt(from);                         if (e) return e }

    // Fallback inteligente para alternativas com prefixos (A), B), 1., etc.)
    const query = (id || label || val).trim().toLowerCase()
    if (query) {
      const candidates = Array.from(
        document.querySelectorAll('input, label, button, [role="radio"], [role="checkbox"], .option-card, [class*="option" i], [class*="choice" i]')
      ) as HTMLElement[]
      const matched = candidates.find(c => {
        const txt = (c.textContent || '').trim().toLowerCase()
        const v = (c as any).value ? String((c as any).value).trim().toLowerCase() : ''
        return v === query || txt === query || txt.startsWith(query + ')') || txt.startsWith('(' + query + ')') || (query.length >= 3 && txt.includes(query))
      })
      if (matched) return matched
    }

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
    this.isExecuting = false
    this.detach()
    this.clearTimer()
    this.highlight.clearAll()
    this.coin.flashOk(1800)
    this.toast.flash('Concluído')
  }

  destroy(): void {
    if (this.isActive()) this.abort()
    else { this.detach(); this.clearTimer() }
  }
}
