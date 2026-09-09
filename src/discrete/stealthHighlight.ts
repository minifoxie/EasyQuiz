/**
 * StealthHighlight — Discreto mas VISÍVEL (0.28 base, 0.42 pulse).
 * Transparente o suficiente para não chamar atenção, mas funcional.
 */

export class StealthHighlight {
  private active: Array<{ el: HTMLElement; orig: string; origOffset: string }> = []

  constructor() { this.injectStyle() }

  private injectStyle(): void {
    if (document.getElementById('__eqsh_style__')) return
    const s = document.createElement('style')
    s.id = '__eqsh_style__'
    s.textContent = `
      @keyframes __eqsh_p__ {
        0%,100% { outline-color: rgba(0,120,212,0.15); }
        50%     { outline-color: rgba(0,120,212,0.26); }
      }
      .__eqsh__ {
        outline: 1px solid rgba(0,120,212,0.17) !important;
        outline-offset: 2px !important;
        animation: __eqsh_p__ 2.5s ease-in-out infinite !important;
      }
    `
    document.documentElement.appendChild(s)
  }

  highlightTarget(els: HTMLElement[]): void {
    this.clearAll()
    for (const el of els) {
      if (!el || this.active.some(a => a.el === el)) continue
      this.active.push({ el, orig: el.style.outline, origOffset: el.style.outlineOffset })
      el.classList.add('__eqsh__')
    }
  }

  clearAll(): void {
    for (const { el, orig, origOffset } of this.active) {
      el.classList.remove('__eqsh__')
      el.style.outline       = orig
      el.style.outlineOffset = origOffset
    }
    this.active = []
  }

  destroy(): void {
    this.clearAll()
    document.getElementById('__eqsh_style__')?.remove()
  }
}
