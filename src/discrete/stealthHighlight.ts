/**
 * StealthHighlight — Highlights ultra-discretos nos elementos-alvo.
 * Outline pulsante semi-transparente, nunca cor sólida.
 */

interface HighlightEntry {
  el: HTMLElement
  originalOutline: string
  originalOutlineOffset: string
  originalBoxShadow: string
  timerId: number
}

export class StealthHighlight {
  private entries: HighlightEntry[] = []

  constructor() {
    this.injectStyle()
  }

  private injectStyle(): void {
    if (document.getElementById('__eqsh_style__')) return
    const s = document.createElement('style')
    s.id = '__eqsh_style__'
    s.textContent = `
      @keyframes __eqsh_pulse__ {
        0%,100% { outline-color: rgba(100,130,255,0.25); }
        50%      { outline-color: rgba(100,130,255,0.55); }
      }
      .__eqsh_active__ {
        outline: 2px dashed rgba(100,130,255,0.35) !important;
        outline-offset: 2px !important;
        animation: __eqsh_pulse__ 2s ease-in-out infinite !important;
      }
    `
    document.documentElement.appendChild(s)
  }

  /** Aplica highlight em um elemento, auto-remove após autoRemoveMs */
  highlight(el: HTMLElement, autoRemoveMs = 4000): void {
    if (!el || this.entries.some(e => e.el === el)) return

    const entry: HighlightEntry = {
      el,
      originalOutline: el.style.outline,
      originalOutlineOffset: el.style.outlineOffset,
      originalBoxShadow: el.style.boxShadow,
      timerId: 0,
    }

    el.classList.add('__eqsh_active__')

    entry.timerId = window.setTimeout(() => this.remove(el), autoRemoveMs)
    this.entries.push(entry)
  }

  /** Aplica highlight em uma lista de elementos (apenas o atual ativo) */
  highlightTarget(els: HTMLElement[]): void {
    this.clearAll()
    for (const el of els) {
      this.highlight(el, 60000) // mantém até clearAll() ou clearTarget()
    }
  }

  /** Remove highlight de um elemento específico */
  remove(el: HTMLElement): void {
    const idx = this.entries.findIndex(e => e.el === el)
    if (idx === -1) return
    const entry = this.entries[idx]
    clearTimeout(entry.timerId)
    el.classList.remove('__eqsh_active__')
    this.entries.splice(idx, 1)
  }

  /** Remove todos os highlights */
  clearAll(): void {
    for (const entry of this.entries) {
      clearTimeout(entry.timerId)
      entry.el.classList.remove('__eqsh_active__')
    }
    this.entries = []
  }
}
