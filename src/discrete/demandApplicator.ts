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
 * - Resolução inteligente de Verdadeiro / Falso (V/F): mapeamento preciso da afirmativa
 *   para a respectiva bolinha (radio) da coluna V ou F, sem falsos cliques no <tr>.
 * - simulateDragAndCategorize + findDragTarget: arrasto multi-estratégia para categorização
 *   sem falhas de pointerevent.
 * - Prevenção de concorrência com flag isExecuting para evitar pulos de steps em cliques rápidos.
 */

import type { InteractionStep } from './promptDiscrete'
import type { CoinCursor } from './coinCursor'
import type { CornerToast } from './cornerToast'
import type { StealthHighlight } from './stealthHighlight'
import type { DebugOutput } from './debugOutput'
import {
  findElementExt,
  simulatePointerClick,
  setCheckedState,
  findDragTarget,
  simulateDragAndCategorize,
  safeCssEscape,
  cleanSearchTerm,
  verifyActionApplied,
  injectClickViaScript,
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

const nativeInputSetter    = typeof HTMLInputElement !== 'undefined' ? Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,   'value')?.set : undefined
const nativeTextareaSetter = typeof HTMLTextAreaElement !== 'undefined' ? Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype,'value')?.set : undefined

export class DemandApplicator {
  private flow: InteractionStep[] = []
  private stepIdx = 0
  private state: ApplicatorState = 'idle'
  private isExecuting = false

  // ── Proteção contra input rápido ──────────────────────────────────────────
  /** Impede double-advance quando o usuário digita mais rápido que o gotoStep delay */
  private stepping = false
  /** Fila de clique pendente: usuário clicou enquanto isExecuting=true */
  private pendingClick = false
  /** Timestamp do último click real aceito (anti-bounce) */
  private lastClickTs = 0

  private coin: CoinCursor
  private toast: CornerToast
  private highlight: StealthHighlight
  private debugOutput?: DebugOutput

  private stepTimer: number | null = null
  // Progresso por STEP INDEX — garante ordem correta em multi-input
  private charsInserted = new Map<number, number>()
  private failedSteps = new Set<number>()

  private boundKey:         (e: KeyboardEvent) => void
  private boundKeypress:    (e: KeyboardEvent) => void
  private boundBeforeInput: (e: InputEvent)    => void
  private boundKeyup:       (e: KeyboardEvent) => void
  private boundClick:       (e: MouseEvent)    => void

  constructor(
    coin: CoinCursor,
    toast: CornerToast,
    highlight: StealthHighlight,
    debugOutput?: DebugOutput,
  ) {
    this.coin = coin
    this.toast = toast
    this.highlight = highlight
    this.debugOutput = debugOutput
    this.boundKey         = this.onKey.bind(this)
    this.boundKeypress    = this.onKeypress.bind(this)
    this.boundBeforeInput = this.onBeforeInput.bind(this)
    this.boundKeyup       = this.onKeyup.bind(this)
    this.boundClick       = this.onClick.bind(this)
  }

  setDebugOutput(debugOutput: DebugOutput): void {
    this.debugOutput = debugOutput
  }

  start(flow: InteractionStep[]): void {
    this.abort()
    if (!flow?.length) return
    this.flow = flow
    this.stepIdx = 0
    this.charsInserted.clear()
    this.failedSteps.clear()
    this.state = 'idle'
    this.isExecuting = false
    this.stepping = false
    this.pendingClick = false
    this.debugOutput?.setFlow(flow)
    this.attach()
    this.gotoStep(0)
  }

  abort(): void {
    this.unlockAllInputs()
    const wasActive = this.isActive()
    this.state = 'aborted'
    this.isExecuting = false
    this.stepping = false
    this.pendingClick = false
    this.detach()
    this.clearTimer()
    this.highlight.clearAll()
    if (wasActive) {
      this.coin.flashError(800)
      this.toast.flash('Abortado')
      this.debugOutput?.log('FLOW', 'Fluxo abortado pelo usuário')
    }
  }

  isActive(): boolean         { return this.state === 'waiting_key' || this.state === 'waiting_click' }
  getState(): ApplicatorState { return this.state }
  getCurrentStep(): number    { return this.stepIdx }
  getTotalSteps(): number     { return this.flow.length }

  // ── Escudo Físico de Teclado (Bloqueio Total contra Poluição) ───────────────

  private lockedInputs = new Set<{ el: HTMLInputElement | HTMLTextAreaElement, sanitizer: (e: Event) => void }>()

  private lockInput(input: HTMLInputElement | HTMLTextAreaElement, fullText: string): void {
    try { input.readOnly = true } catch {}

    // Sanitizador ativo contra IME, autocomplete ou extensões
    const sanitizer = () => {
      if (input.value !== '' && input.value !== fullText) {
        const proto = input instanceof HTMLInputElement ? HTMLInputElement.prototype : HTMLTextAreaElement.prototype
        const setter = (input instanceof HTMLInputElement ? nativeInputSetter : nativeTextareaSetter) || Object.getOwnPropertyDescriptor(proto, 'value')?.set
        if (setter) setter.call(input, fullText)
        else input.value = fullText
      }
    }
    input.addEventListener('input', sanitizer, { capture: true })
    this.lockedInputs.add({ el: input, sanitizer })
  }

  private unlockAllInputs(): void {
    for (const item of this.lockedInputs) {
      try { item.el.readOnly = false } catch {}
      item.el.removeEventListener('input', item.sanitizer, { capture: true })
    }
    this.lockedInputs.clear()
  }

  // ── Listeners — Captura Inequívoca em Window e Document ─────────────────────

  private attach(): void {
    for (const target of [window, document]) {
      target.addEventListener('keydown',     this.boundKey,         { capture: true })
      target.addEventListener('keypress',    this.boundKeypress,    { capture: true })
      target.addEventListener('beforeinput', this.boundBeforeInput, { capture: true })
      target.addEventListener('keyup',       this.boundKeyup,       { capture: true })
      target.addEventListener('click',       this.boundClick,       { capture: true })
    }
  }

  private detach(): void {
    for (const target of [window, document]) {
      target.removeEventListener('keydown',     this.boundKey,         { capture: true })
      target.removeEventListener('keypress',    this.boundKeypress,    { capture: true })
      target.removeEventListener('beforeinput', this.boundBeforeInput, { capture: true })
      target.removeEventListener('keyup',       this.boundKeyup,       { capture: true })
      target.removeEventListener('click',       this.boundClick,       { capture: true })
    }
  }

  // ── Navegação de Passos ───────────────────────────────────────────────────

  private gotoStep(idx: number): void {
    this.isExecuting = false
    this.stepping = false
    this.pendingClick = false
    this.clearTimer()
    this.highlight.clearAll()

    // Desfoca qualquer input que ainda retenha foco no DOM
    try {
      if (document.activeElement instanceof HTMLInputElement || document.activeElement instanceof HTMLTextAreaElement) {
        document.activeElement.blur()
      }
    } catch {}

    if (idx >= this.flow.length) {
      this.complete()
      return
    }

    this.stepIdx = idx
    const step   = this.flow[idx]
    this.state   = step.trigger === 'key' ? 'waiting_key' : 'waiting_click'
    this.debugOutput?.setStepIndex(idx)

    // Highlight e foco no campo alvo
    const action = step.action as Record<string, unknown>
    if (action.id || action.label || action.from || action.v || (action as any).name || (action as any).n) {
      const el = this.resolveEl(action)
      if (el) {
        this.highlight.highlightTarget([el])
        // Foca o campo para feedback visual natural e trava contra poluição de digitação
        if (step.trigger === 'key') {
          const input = this.resolveInput(el)
          if (input instanceof HTMLInputElement || input instanceof HTMLTextAreaElement) {
            this.lockInput(input, String(action.v ?? ''))
          }
          try { (input as HTMLInputElement)?.focus?.() } catch {}
        }
      }
    }

    if (step.trigger === 'key' && this.lockedInputs.size === 0) {
      const active = document.activeElement
      if (active instanceof HTMLInputElement || active instanceof HTMLTextAreaElement) {
        this.lockInput(active, String(action.v ?? ''))
      } else {
        const anyInput = document.querySelector('input:not([type=hidden]):not([type=submit]):not([type=button]):not([type=radio]):not([type=checkbox]),textarea,[contenteditable=true]') as HTMLInputElement | null
        if (anyInput) this.lockInput(anyInput, String(action.v ?? ''))
      }
    }

    // Toast de hint
    const hint = step.hint || (step.trigger === 'key' ? 'Keyboard Interact' : 'Mouse Interact')
    this.toast.flash(hint)

    if (step.customMsg) {
      setTimeout(() => {
        if (this.stepIdx === idx && this.isActive()) this.toast.flash(step.customMsg!)
      }, 500)
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

  private onKeypress(e: KeyboardEvent): void {
    if (this.isActive() || this.stepping) {
      if (!isEqHotkey(e) && e.key !== 'Escape') {
        e.preventDefault()
        e.stopPropagation()
        e.stopImmediatePropagation()
      }
    }
  }

  private onBeforeInput(e: InputEvent): void {
    if ((this.isActive() || this.stepping) && e.isTrusted) {
      e.preventDefault()
      e.stopPropagation()
      e.stopImmediatePropagation()
    }
  }

  private onKeyup(e: KeyboardEvent): void {
    if (this.isActive() || this.stepping) {
      if (!isEqHotkey(e) && e.key !== 'Escape' && !IGNORE_KEYS.has(e.key)) {
        e.preventDefault()
        e.stopPropagation()
        e.stopImmediatePropagation()
      }
    }
  }

  // ── Teclado — GATILHO para injeção de texto válido ───────────────────────
  // A tecla do usuário serve EXCLUSIVAMENTE como sinal/gatilho de avanço.
  // A tecla física é 100% suprimida para nunca poluir o campo alvo.
  // O sistema injeta o valor válido completo do fluxo sem misturas.

  private onKey(e: KeyboardEvent): void {
    if (isEqHotkey(e)) return
    if (e.key === 'Escape') return

    // Se estiver aguardando clique: suprime a tecla para nunca poluir campos focados
    if (this.state === 'waiting_click') {
      if (!IGNORE_KEYS.has(e.key)) {
        e.preventDefault()
        e.stopPropagation()
        e.stopImmediatePropagation()
      }
      this.toast.flash('Mouse Interact')
      return
    }

    if (this.state !== 'waiting_key') return

    // stepping=true: já agendamos o gotoStep, aguardando transição. Suprime teclas extras.
    if (this.stepping) {
      e.preventDefault()
      e.stopPropagation()
      e.stopImmediatePropagation()
      return
    }

    if (IGNORE_KEYS.has(e.key)) return

    // SUPRESSÃO TOTAL DO EVENTO DE TECLADO DO USUÁRIO NO CAMPO DE TEXTO
    e.preventDefault()
    e.stopPropagation()
    e.stopImmediatePropagation()

    this.debugOutput?.log('KEY', `Gatilho de teclado: "${e.key}" (Passo ${this.stepIdx + 1})`)

    const step   = this.flow[this.stepIdx]
    const action = step.action as Record<string, unknown>

    if (action.t !== 'val') return

    const fullText = String(action.v ?? '')

    // Texto vazio: avança imediatamente
    if (fullText.length === 0) {
      this.stepping = true
      this.clearTimer()
      this.highlight.clearAll()
      this.debugOutput?.markStepSuccess(this.stepIdx, 'Texto vazio — avanço automático')
      setTimeout(() => this.gotoStep(this.stepIdx + 1), 40)
      return
    }

    // Injeta o valor válido completo com todos os caracteres no campo ALVO
    const done = this.insertChars(this.stepIdx, action, fullText)

    if (done) {
      // Marca stepping imediatamente para bloquear teclas rápidas extras
      this.stepping = true
      this.clearTimer()
      this.highlight.clearAll()
      this.coin.flashOk(800)
      this.debugOutput?.markStepSuccess(this.stepIdx, `"${fullText}" inserido com sucesso`)
      // Delay curto: 60ms para transição fluida sem race conditions
      setTimeout(() => this.gotoStep(this.stepIdx + 1), 60)
    }
  }

  // ── Clique — GATILHO para ação no elemento alvo ───────────────────────────
  // Robusto a cliques rápidos:
  //   - Se isExecuting, registra pendingClick para avançar assim que a ação atual terminar.
  //   - isExecuting é liberado IMEDIATAMENTE após execClickAction resolver (antes do timeout).
  //   - Timeouts drasticamente reduzidos (60ms sucesso, 30ms erro).

  private onClick(e: MouseEvent): void {
    // Bloqueia eventos sintéticos internos
    if (!e.isTrusted) return

    const t = e.target as HTMLElement | null
    if (!t) return
    if (t.closest('#__eqdm_menu__,#__eqkm_overlay__,#__eqcm_menu__,#__eqdiscrete_coin__,#__eqdiscrete_toasts__,#__eq_dbg_window__,#__eq_dbg_pill__')) return

    if (this.state === 'waiting_key') {
      this.toast.flash('Keyboard Interact')
      return
    }
    if (this.state !== 'waiting_click') return

    const now = Date.now()

    // Usuário clicou enquanto ação ainda está em execução — registra como pendente
    if (this.isExecuting) {
      if (now - this.lastClickTs > 80) {
        this.pendingClick = true
        this.debugOutput?.log('CLICK', `Clique rápido enfileirado (Passo ${this.stepIdx + 1})`)
      }
      return
    }

    this.lastClickTs = now
    this.debugOutput?.log('CLICK', `Gatilho de mouse em <${t.tagName.toLowerCase()}> (Passo ${this.stepIdx + 1})`)

    const step   = this.flow[this.stepIdx]
    const action = step.action as Record<string, unknown>
    const aType  = String(action.t ?? '')

    // "adv": clique natural navega a página — apenas avança o step
    if (aType === 'adv') {
      this.clearTimer()
      this.highlight.clearAll()
      this.debugOutput?.markStepSuccess(this.stepIdx, 'Avanço natural do usuário')
      setTimeout(() => this.gotoStep(this.stepIdx + 1), 80)
      return
    }

    // Para chk/clk/sel/drag: previne o clique natural de interferir no DOM
    e.preventDefault()
    e.stopImmediatePropagation()
    this.isExecuting = true
    this.pendingClick = false

    void this.execClickAction(action, step).then(ok => {
      this.clearTimer()
      this.highlight.clearAll()
      // Libera isExecuting IMEDIATAMENTE — antes do timeout de avanço
      // Assim, cliques rápidos no próximo step já são aceitos
      this.isExecuting = false
      const wasPending = this.pendingClick
      this.pendingClick = false

      if (ok) {
        this.coin.flashOk(700)
      } else {
        this.failedSteps.add(this.stepIdx)
        this.coin.flashError(600)
      }

      // Delay mínimo: 60ms sucesso, 30ms erro
      // Se havia clique pendente, avança ainda mais rápido (20ms)
      const delay = wasPending ? 20 : (ok ? 60 : 30)
      setTimeout(() => this.gotoStep(this.stepIdx + 1), delay)

    }).catch((err) => {
      this.isExecuting = false
      this.pendingClick = false
      this.failedSteps.add(this.stepIdx)
      this.debugOutput?.markStepFailed(this.stepIdx, `Exceção: ${err instanceof Error ? err.message : String(err)}`)
      setTimeout(() => this.gotoStep(this.stepIdx + 1), 30)
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
        const el = this.resolveEl(action)
        if (!el) {
          this.toast.flash('Alvo não achado')
          this.debugOutput?.markStepFailed(this.stepIdx, `Alvo não encontrado: ${JSON.stringify(action)}`)
          return false
        }

        const isInput = el instanceof HTMLInputElement && ['radio', 'checkbox'].includes(el.type)
        const isOption =
          isInput ||
          el.getAttribute('role') === 'radio' ||
          el.getAttribute('role') === 'checkbox' ||
          el.closest('.option-card, [role="radio"], [role="checkbox"], [role="option"], .vf-radio-group, .vf-label') !== null ||
          t === 'chk'

        if (isOption) {
          const input = isInput
            ? (el as HTMLInputElement)
            : (el.querySelector('input[type="radio"], input[type="checkbox"]') as HTMLInputElement | null) ||
              (el.getAttribute('for') ? (el.ownerDocument.getElementById(el.getAttribute('for')!) as HTMLInputElement | null) : null)

          const targetToClick = input || el
          const parentLabel = targetToClick.closest('label') as HTMLElement | null
          const linkedLabel = (targetToClick.id
            ? document.querySelector(`label[for="${safeCssEscape(targetToClick.id)}"]`)
            : null) as HTMLElement | null
          const labelOrInteractive = parentLabel || linkedLabel || (targetToClick.closest('td') as HTMLElement | null) || targetToClick

          const shouldCheck = action.c !== undefined ? Boolean(action.c) : true

          // ── ESTRATÉGIA 1: setCheckedState (motor robusto — funciona com React/Vue/Angular) ──
          setCheckedState(targetToClick, shouldCheck)

          // ── ESTRATÉGIA 2: React valueTracker hack ──
          if (input && input.checked !== shouldCheck) {
            try {
              const tracker = (input as any)._valueTracker
              if (tracker) tracker.setValue(!shouldCheck)
            } catch {}
            // Força via setter nativo + disparo de eventos
            try {
              const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'checked')?.set
              setter?.call(input, shouldCheck)
            } catch {}
            input.dispatchEvent(new Event('input',  { bubbles: true, composed: true }))
            input.dispatchEvent(new Event('change', { bubbles: true, composed: true }))
          }

          // ── ESTRATÉGIA 3: clique no label (framework-agnostic, o mais natural) ──
          if (input && input.checked !== shouldCheck && labelOrInteractive && labelOrInteractive !== input) {
            simulatePointerClick(labelOrInteractive as HTMLElement)
            await new Promise(r => setTimeout(r, 16))
          }

          // ── ESTRATÉGIA 4: disparo de PointerEvent sintético completo ──
          if (input && input.checked !== shouldCheck) {
            try {
              const rect = targetToClick.getBoundingClientRect()
              const cx = rect.left + rect.width / 2
              const cy = rect.top + rect.height / 2
              for (const type of ['pointerdown', 'mousedown', 'pointerup', 'mouseup', 'click']) {
                targetToClick.dispatchEvent(new PointerEvent(type, {
                  bubbles: true, cancelable: true, composed: true,
                  clientX: cx, clientY: cy, pointerId: 1, isPrimary: true,
                }))
              }
              await new Promise(r => setTimeout(r, 16))
            } catch {}
          }

          // ── ESTRATÉGIA 5: forçar valor direto e click no input ──
          if (input && input.checked !== shouldCheck) {
            try { input.checked = shouldCheck } catch {}
            try { input.click() } catch {}
            await new Promise(r => setTimeout(r, 8))
            input.dispatchEvent(new Event('change', { bubbles: true }))
          }

          if (input) {
            const finalOk = input.checked === shouldCheck
            if (finalOk) {
              this.debugOutput?.markStepSuccess(this.stepIdx, `[name="${input.name}"] marcado checked=${shouldCheck}`)
            } else {
              // Aceita como sucesso se o radio fez parte de um grupo exclusivo
              // (ex: rádio V/F onde marcar V desmarca F, mas o grupo como um todo está consistente)
              const isRadioGroup = input.type === 'radio' && input.name
              if (isRadioGroup) {
                const groupSelected = document.querySelector(`input[name="${safeCssEscape(input.name)}"]:checked`)
                if (groupSelected) {
                  this.debugOutput?.markStepSuccess(this.stepIdx, `Grupo de rádio [name="${input.name}"] tem seleção`)
                  return true
                }
              }
              this.debugOutput?.markStepFailed(this.stepIdx, `[name="${input.name}"] resistiu após 5 estratégias`)
              return false
            }
            return true
          }

          // Elemento interativo sem input nativo (custom card, SPA)
          if (labelOrInteractive) simulatePointerClick(labelOrInteractive as HTMLElement)
          await new Promise(r => setTimeout(r, 80))

          // Verificação DOM: tenta confirmar que o card foi realmente selecionado
          const isVerified = verifyActionApplied({
            t: action.t as 'chk' | 'clk',
            id: String(action.id ?? action.label ?? ''),
            c: action.c as boolean,
            v: action.v as string,
          } as any)

          if (!isVerified) {
            // Estratégia extra: injectClickViaScript (bypass isTrusted para frameworks com CSP lax)
            if (labelOrInteractive) {
              injectClickViaScript(labelOrInteractive as HTMLElement)
              await new Promise(r => setTimeout(r, 120))
            }
            this.debugOutput?.log('WARN', `Card custom: DOM não confirmou seleção — tentativa via script injection`)
          } else {
            this.debugOutput?.markStepSuccess(this.stepIdx, `Opção customizada ativada e verificada no DOM`)
          }
          return true
        }

        // Elemento interativo genérico (botão, link, qualquer clicável)
        simulatePointerClick(el)
        this.debugOutput?.markStepSuccess(this.stepIdx, `<${el.tagName.toLowerCase()}> ativado`)
        return true
      }


      if (t === 'sel') {
        const el = this.resolveEl(action)
        if (!el) {
          this.toast.flash('Alvo não achado')
          this.debugOutput?.markStepFailed(this.stepIdx, `Select não encontrado: ${JSON.stringify(action)}`)
          return false
        }
        const sel = el instanceof HTMLSelectElement ? el
          : el.querySelector('select') as HTMLSelectElement | null
        if (sel) {
          const want = String(Array.isArray(action.v) ? action.v[0] : (action.v ?? ''))
          for (let i = 0; i < sel.options.length; i++) {
            if (sel.options[i].value === want || sel.options[i].text.trim() === want) {
              sel.selectedIndex = i
              sel.dispatchEvent(new Event('change', { bubbles: true }))
              this.debugOutput?.markStepSuccess(this.stepIdx, `Select atualizado para "${want}"`)
              return true
            }
          }
          const ni = parseInt(want, 10)
          if (!isNaN(ni) && ni >= 0 && ni < sel.options.length) {
            sel.selectedIndex = ni
            sel.dispatchEvent(new Event('change', { bubbles: true }))
            this.debugOutput?.markStepSuccess(this.stepIdx, `Select atualizado por índice ${ni}`)
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
          this.debugOutput?.markStepSuccess(this.stepIdx, `Arrasto concluído de "${fromStr}" para "${toStr}"`)
          return true
        }
        this.toast.flash('Alvo não achado')
        this.debugOutput?.markStepFailed(this.stepIdx, `Alvo de arrasto não achado: from="${fromStr}", to="${toStr}"`)
        return false
      }

      if (t === 'adv') {
        this.debugOutput?.markStepSuccess(this.stepIdx, 'Avanço de etapa')
        return true
      }

    } catch (err) {
      this.toast.flash('Erro exec')
      this.debugOutput?.markStepFailed(this.stepIdx, `Erro de execução: ${err instanceof Error ? err.message : String(err)}`)
      return false
    }

    return true
  }

  // ── Inserção de Texto no campo ALVO ──────────────────────────────────────

  private insertChars(
    stepIdx: number,
    action: Record<string, unknown>,
    fullText: string,
  ): boolean {
    const el = this.resolveEl(action)
    if (!el) {
      this.toast.flash('Campo não achado')
      this.debugOutput?.markStepFailed(stepIdx, `Campo de texto não encontrado: ${JSON.stringify(action)}`)
      this.charsInserted.set(stepIdx, fullText.length)
      return true
    }

    const input = this.resolveInput(el)
    if (!input) {
      this.charsInserted.set(stepIdx, fullText.length)
      return true
    }

    // Normalização para inputs de número HTML5
    let valToSet = fullText
    const isNumberInput = input instanceof HTMLInputElement &&
      (input.type === 'number' || input.type === 'range')
    if (isNumberInput) {
      const normalized = fullText.replace(',', '.').replace(/[^0-9.-]/g, '')
      if (normalized && !isNaN(Number(normalized))) {
        valToSet = normalized
      }
    }

    // Injeta o valor válido completo com todos os caracteres
    this.applyValueSlice(input, valToSet)
    this.charsInserted.set(stepIdx, fullText.length)
    try { (input as HTMLInputElement).blur?.() } catch {}
    return true
  }

  private applyValueSlice(input: HTMLElement, fullValue: string): void {
    if (input instanceof HTMLInputElement || input instanceof HTMLTextAreaElement) {
      // 1. Redefine o _valueTracker do React para garantir que onChange/onInput dispare
      try {
        const tracker = (input as any)._valueTracker
        if (tracker) tracker.setValue('')
      } catch {}

      // 2. Aplica o valor authoritative via setter nativo do protótipo — limpando resíduos antes
      const proto = input instanceof HTMLInputElement ? HTMLInputElement.prototype : HTMLTextAreaElement.prototype
      const setter = (input instanceof HTMLInputElement ? nativeInputSetter : nativeTextareaSetter) || Object.getOwnPropertyDescriptor(proto, 'value')?.set
      if (setter) {
        setter.call(input, '')
        setter.call(input, fullValue)
      } else {
        input.value = ''
        input.value = fullValue
      }

      // 3. Dispara sequência de eventos sintéticos para React, Vue, Angular, Svelte
      try {
        input.dispatchEvent(new Event('input', { bubbles: true, cancelable: true, composed: true }))
      } catch {}
      try {
        input.dispatchEvent(new Event('change', { bubbles: true, cancelable: true, composed: true }))
      } catch {}
      try {
        input.setSelectionRange(fullValue.length, fullValue.length)
      } catch {}

      // 4. Verificação de segurança: garante que o valor não foi sobrescrito
      if (input.value !== fullValue && !(input instanceof HTMLInputElement && input.type === 'number' && Number(input.value) === Number(fullValue))) {
        input.value = fullValue
        try { setter?.call(input, fullValue) } catch {}
      }
    } else if ((input as HTMLElement).isContentEditable) {
      const ce = input as HTMLElement
      ce.textContent = fullValue
      try {
        ce.dispatchEvent(new InputEvent('input', { bubbles: true, cancelable: true, composed: true, data: fullValue, inputType: 'insertText' }))
      } catch {
        ce.dispatchEvent(new Event('input', { bubbles: true, cancelable: true, composed: true }))
      }
      try {
        ce.dispatchEvent(new Event('change', { bubbles: true, cancelable: true, composed: true }))
      } catch {}
      try {
        const r = document.createRange(); r.selectNodeContents(ce); r.collapse(false)
        const s = window.getSelection(); s?.removeAllRanges(); s?.addRange(r)
      } catch {}
    }
  }

  // ── Resolução Resiliente de Elementos (incluindo Verdadeiro / Falso) ─────────

  private resolveEl(action: Record<string, unknown>): HTMLElement | null {
    const idStr    = String(action.id    ?? '').trim()
    const valStr   = String(action.v     ?? '').trim()
    const labelStr = String(action.label ?? '').trim()
    const fromStr  = String(action.from  ?? '').trim()
    const nameStr  = String(action.name  ?? (action as any).n ?? '').trim()

    // 0. Resolução Direta de Alternativa Alfabética Única (ex: "A", "B", "C", "D")
    const rawTarget = (idStr || labelStr || valStr).trim()
    const letterMatch = rawTarget.match(/^(?:item|opção|opcao|afirmação|afirmacao|alternativa|linha|afirmativa|questão|questao)?\s*#?([a-eA-E])$/i)
    if (letterMatch && (action.t === 'chk' || action.t === 'clk')) {
      const letter = letterMatch[1].toUpperCase()
      const radioByVal = Array.from(
        document.querySelectorAll(`input[type="radio"][value="${letter}" i], input[type="checkbox"][value="${letter}" i]`)
      ).find(r => !r.closest('#__eqdm_menu__,#__eqkm_overlay__,#__eqcm_menu__,#__eqdiscrete_coin__,#__eqdiscrete_toasts__,#__eq_dbg_window__,#__eq_dbg_pill__')) as HTMLElement | null
      if (radioByVal) return radioByVal
    }

    // 1. Identifica se a ação é uma marcação de Verdadeiro / Falso (V/F)
    const vfHint = valStr || (labelStr.match(/:\s*(verdadeiro|falso|v|f)\b/i)?.[1] ?? '') || (idStr.match(/_(v|f|verdadeiro|falso)$/i)?.[1] ?? '')
    const normVf = vfHint.toLowerCase().trim()
    const isTrueQuery  = /^(v|verdadeiro|true|t|1|sim|yes|correto)$/i.test(normVf) || normVf.includes('verdadeir')
    const isFalseQuery = /^(f|falso|false|0|nao|não|no|incorreto|errado)$/i.test(normVf) || normVf.includes('fals')
    const isVf = isTrueQuery || isFalseQuery

    const vfKeywords = isTrueQuery
      ? ['v', 'verdadeiro', 'true', '1', 't', 'sim', 'correto']
      : ['f', 'falso', 'false', '0', 'não', 'nao', 'incorreto', 'errado']

    // 2. Se nameStr foi fornecido (ex: "vf_row_1"), busca diretamente o rádio desse grupo por value JS (evita CSS i-flag não suportado)
    if (nameStr) {
      const groupRadios = Array.from(
        document.querySelectorAll(`input[name="${safeCssEscape(nameStr)}"]`)
      ) as HTMLInputElement[]

      if (valStr) {
        // Busca por value exato (case-insensitive via JS)
        const byVal = groupRadios.find(r => r.value?.toLowerCase() === valStr.toLowerCase())
        if (byVal) return byVal
      }

      if (isVf) {
        const matched = groupRadios.find(r => this.isVfMatch(r as HTMLElement, vfKeywords))
        if (matched) return matched
      }

      // Fallback: retorna o primeiro rádio do grupo se apenas nameStr foi fornecido
      if (groupRadios.length > 0) return groupRadios[0] as HTMLElement
    }

    // 3. Busca elemento por ID estrito ou label através do findElementExt
    let el: HTMLElement | null = null
    if (idStr)    el = findElementExt(idStr, valStr, action.t === 'val')
    if (!el && labelStr) el = findElementExt(labelStr, valStr, action.t === 'val')
    if (!el && fromStr)  el = findElementExt(fromStr, valStr, action.t === 'val')

    // 4. Resolução especializada para Verdadeiro / Falso (V/F)
    if (isVf) {
      // Se el foi encontrado, verifica se é o rádio correto ou o container da linha
      if (el) {
        // Se el é um input radio em um grupo (tem name):
        if (el instanceof HTMLInputElement && el.type === 'radio' && el.name) {
          if (this.isVfMatch(el, vfKeywords)) return el
          const siblings = Array.from(
            document.querySelectorAll(`input[type="radio"][name="${safeCssEscape(el.name)}"]`)
          ) as HTMLInputElement[]
          const matched = siblings.find(r => this.isVfMatch(r, vfKeywords))
          if (matched) return matched
        }

        // Se el é um container de linha/tabela (tr, td, div, fieldset, li, radiogroup):
        const container = (el.closest('tr, [role="row"], [role="radiogroup"], .vf-row, [class*="row" i], fieldset, td, div') || el) as HTMLElement
        const innerRadios = Array.from(
          container.querySelectorAll('input[type="radio"], input[type="checkbox"], [role="radio"], label, td, [class*="choice" i], [class*="option" i]')
        ) as HTMLElement[]
        const matched = innerRadios.find(r => this.isVfMatch(r, vfKeywords))
        if (matched) {
          const innerInput = matched instanceof HTMLInputElement ? matched : (matched.querySelector('input[type="radio"]') as HTMLElement | null)
          return innerInput || matched
        }
      }

      // Se el ainda não foi encontrado ou não bateu, busca na linha correspondente da tabela/grid
      const queryRow = (labelStr || idStr).replace(/:\s*(verdadeiro|falso|v|f)\b/i, '').toLowerCase()
      if (queryRow) {
        const rows = Array.from(
          document.querySelectorAll('tr, [role="row"], [role="radiogroup"], .vf-row, [class*="row" i], li')
        ) as HTMLElement[]
        const cleanQ = cleanSearchTerm(queryRow).toLowerCase()
        const matchingRow = rows.find(r => {
          const rowTxt = cleanSearchTerm(r.textContent || '').toLowerCase()
          return (cleanQ.length >= 3 && rowTxt.includes(cleanQ)) || (idStr && r.id === idStr)
        })
        if (matchingRow) {
          const radios = Array.from(
            matchingRow.querySelectorAll('input[type="radio"], [role="radio"], label, td')
          ) as HTMLElement[]
          const matched = radios.find(r => this.isVfMatch(r, vfKeywords))
          if (matched) {
            const innerInput = matched instanceof HTMLInputElement ? matched : (matched.querySelector('input[type="radio"]') as HTMLElement | null)
            return innerInput || matched
          }
        }
      }
    }

    // 5. Fallback inteligente para alternativas com prefixos (A), B), 1., etc.)
    const query = (idStr || labelStr || valStr).trim().toLowerCase()
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

    return el
  }

  private isVfMatch(element: HTMLElement, keywords: string[]): boolean {
    if (!element) return false
    const val = (element as any).value ? String((element as any).value).trim().toLowerCase() : ''
    const aria = (element.getAttribute('aria-label') || '').trim().toLowerCase()
    const dataVal = (element.getAttribute('data-value') || '').trim().toLowerCase()

    // Correspondência exata de value via JS (case-insensitive) — mais confiável que CSS `i` flag
    if (val && keywords.includes(val)) return true
    if (dataVal && keywords.includes(dataVal)) return true
    if (aria && keywords.includes(aria)) return true

    // Verifica classes específicas de V/F (.vf-true, .vf-false)
    const labelOrCell = element.closest('label, td, [class*="option" i], [class*="choice" i]')
    const combinedClass = ((element.className || '') + ' ' + (labelOrCell?.className || '')).toLowerCase()
    if (keywords.includes('v') && (combinedClass.includes('vf-true') || combinedClass.includes('true') || combinedClass.includes('verdadeiro'))) return true
    if (keywords.includes('f') && (combinedClass.includes('vf-false') || combinedClass.includes('false') || combinedClass.includes('falso'))) return true

    // Verifica o label associado ou célula imediata (td, label) — texto contendo a palavra
    if (labelOrCell) {
      const txt = cleanSearchTerm(labelOrCell.textContent || '').trim().toLowerCase()
      for (const kw of keywords) {
        if (txt === kw || txt.startsWith(kw + ' ') || txt.endsWith(' ' + kw) || txt.startsWith('(' + kw + ')') || txt.startsWith(kw + ')')) {
          return true
        }
        if (kw.length >= 4 && txt.includes(kw)) {
          return true
        }
      }
    }

    // Checa label for="id"
    if (element.id) {
      const forLabel = document.querySelector(`label[for="${safeCssEscape(element.id)}"]`)
      if (forLabel) {
        const txt = cleanSearchTerm(forLabel.textContent || '').trim().toLowerCase()
        for (const kw of keywords) {
          if (txt === kw || txt.startsWith(kw + ' ') || txt.endsWith(' ' + kw) || txt.startsWith('(' + kw + ')') || txt.startsWith(kw + ')')) {
            return true
          }
          if (kw.length >= 4 && txt.includes(kw)) {
            return true
          }
        }
      }
    }

    return false
  }

  private resolveInput(el: HTMLElement): HTMLElement | null {
    if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement || el.isContentEditable) return el
    return el.querySelector(
      'input:not([type=hidden]):not([type=submit]):not([type=button]):not([type=radio]):not([type=checkbox]),textarea,[contenteditable=true]'
    ) as HTMLElement | null ?? el
  }

  // ── Métodos Públicos de Execução Forçada (Via Debug Output) ───────────────

  async forceStep(idx: number): Promise<boolean> {
    if (idx < 0 || idx >= this.flow.length) return false
    const step = this.flow[idx]
    const action = step.action as Record<string, unknown>
    const t = String(action.t ?? '')

    let ok = false
    if (t === 'val') {
      const fullText = String(action.v ?? '')
      const el = this.resolveEl(action)
      if (!el) return false
      const input = this.resolveInput(el)
      if (!input) return false
      this.applyValueSlice(input, fullText)
      this.charsInserted.set(idx, fullText.length)
      this.debugOutput?.markStepSuccess(idx, `Texto "${fullText}" injetado`)
      ok = true
    } else {
      ok = await this.execClickAction(action, step)
    }

    if (ok && idx === this.stepIdx) {
      this.clearTimer()
      this.highlight.clearAll()
      this.gotoStep(idx + 1)
    }

    return ok
  }

  async forceAll(): Promise<void> {
    this.toast.flash('Injetando respostas...')
    let successCount = 0
    let failCount = 0

    for (let i = 0; i < this.flow.length; i++) {
      const step = this.flow[i]
      const action = step.action as Record<string, unknown>
      if (action.t === 'adv') continue

      const ok = await this.forceStep(i)
      await new Promise((r) => setTimeout(r, 80))

      // Verificação DOM real após cada step
      const actionForVerify = {
        t: action.t as string,
        id: String(action.id ?? action.label ?? ''),
        c: action.c,
        v: action.v,
        name: action.name,
        from: action.from,
        to: action.to,
      } as any

      let domVerified = false
      if (action.t !== 'drag' && action.t !== 'val' && action.t !== 'adv') {
        try { domVerified = verifyActionApplied(actionForVerify) } catch {}
      } else {
        domVerified = ok // Para drag e val, confia no retorno de forceStep
      }

      if (!domVerified && ok && (action.t === 'chk' || action.t === 'clk')) {
        // Tenta injectClickViaScript como backup
        const el = this.resolveEl(action)
        if (el) {
          injectClickViaScript(el)
          await new Promise((r) => setTimeout(r, 150))
          try { domVerified = verifyActionApplied(actionForVerify) } catch {}
        }
        if (domVerified) {
          this.debugOutput?.log('FLOW', `Step ${i + 1}: recuperado via script injection`)
        } else {
          this.debugOutput?.markStepFailed(i, `DOM não confirmou após script injection`)
          failCount++
          continue
        }
      }

      if (domVerified || ok) {
        successCount++
      } else {
        failCount++
      }
    }

    this.debugOutput?.log('FLOW', `forceAll: ${successCount} sucesso(s), ${failCount} falha(s)`)
    this.complete()
  }

  // ── Conclusão ─────────────────────────────────────────────────────────────

  private complete(): void {
    this.unlockAllInputs()
    this.state = 'done'
    this.isExecuting = false
    this.detach()
    this.clearTimer()
    this.highlight.clearAll()

    if (this.failedSteps.size > 0) {
      this.coin.flashError(2200)
      this.toast.flash('Concluído c/ erros')
      this.debugOutput?.log('WARN', `Fluxo finalizado com ${this.failedSteps.size} passos que falharam!`)
    } else {
      this.coin.flashOk(1800)
      this.toast.flash('Concluído')
      this.debugOutput?.log('FLOW', 'Fluxo finalizado com 100% de sucesso!')
    }
  }

  destroy(): void {
    if (this.isActive()) this.abort()
    else { this.detach(); this.clearTimer() }
  }
}
