/**
 * CoinCursor — Ícone flutuante 18px ao lado do cursor.
 * Spinner idêntico ao do Windows 10/11 (segmentos com fade).
 */

export type CoinState = 'idle' | 'loading' | 'ok' | 'error'

export class CoinCursor {
  private el: HTMLDivElement | null = null
  private state: CoinState = 'idle'
  private mouseX = -200
  private mouseY = -200
  private rafId: number | null = null
  private boundMove: (e: MouseEvent) => void

  constructor() {
    this.boundMove = (e: MouseEvent) => { this.mouseX = e.clientX; this.mouseY = e.clientY }
    window.addEventListener('mousemove', this.boundMove, { passive: true })
    this.injectStyle()
    this.createEl()
    this.startRaf()
  }

  private injectStyle(): void {
    if (document.getElementById('__eqdc_style__')) return
    const s = document.createElement('style')
    s.id = '__eqdc_style__'
    // Spinner Windows 10/11: 8 segmentos com opacidade escalonada que rodam
    s.textContent = `
      @keyframes __eqdc_win_spin__ {
        0%   { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      @keyframes __eqdc_pop__ {
        0%   { transform: scale(0.3) rotate(-15deg); opacity:0; }
        70%  { transform: scale(1.15) rotate(3deg); opacity:1; }
        100% { transform: scale(1) rotate(0deg); opacity:1; }
      }
      @keyframes __eqdc_shake__ {
        0%,100% { transform: translateX(0) rotate(0deg); }
        20%     { transform: translateX(-2px) rotate(-4deg); }
        50%     { transform: translateX(2px) rotate(4deg); }
        80%     { transform: translateX(-1px) rotate(-2deg); }
      }
      @keyframes __eqdc_fadein__ {
        from { opacity:0; transform: scale(0.5); }
        to   { opacity:1; transform: scale(1); }
      }
    `
    document.documentElement.appendChild(s)
  }

  private createEl(): void {
    this.el = document.createElement('div')
    this.el.id = '__eqdiscrete_coin__'
    Object.assign(this.el.style, {
      position: 'fixed',
      width: '20px',
      height: '20px',
      zIndex: '2147483646',
      pointerEvents: 'none',
      display: 'none',
      alignItems: 'center',
      justifyContent: 'center',
      userSelect: 'none',
      boxSizing: 'border-box',
    })
    document.documentElement.appendChild(this.el)
  }

  private startRaf(): void {
    const tick = () => {
      if (this.el && this.state !== 'idle') {
        const x = this.mouseX + 20
        const y = this.mouseY - 10
        this.el.style.left = `${Math.min(x, window.innerWidth - 26)}px`
        this.el.style.top  = `${Math.max(y, 4)}px`
      }
      this.rafId = requestAnimationFrame(tick)
    }
    this.rafId = requestAnimationFrame(tick)
  }

  /** Spinner SVG estilo Windows 10/11 — 8 segmentos com opacidade escalonada */
  private winSpinnerSVG(): string {
    const isDark = this.isDark()
    const color = isDark ? '#e0e0e0' : '#333333'
    const opacities = [1, 0.875, 0.75, 0.625, 0.5, 0.375, 0.25, 0.125]
    const segments = opacities.map((op, i) => {
      const angle = (i * 45) * Math.PI / 180
      const x1 = 10 + Math.sin(angle) * 5
      const y1 = 10 - Math.cos(angle) * 5
      const x2 = 10 + Math.sin(angle) * 8.5
      const y2 = 10 - Math.cos(angle) * 8.5
      return `<line x1="${x1.toFixed(2)}" y1="${y1.toFixed(2)}" x2="${x2.toFixed(2)}" y2="${y2.toFixed(2)}" stroke="${color}" stroke-width="2" stroke-linecap="round" opacity="${op}"/>`
    }).join('')
    return `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" style="animation:__eqdc_win_spin__ 0.8s steps(8,end) infinite">${segments}</svg>`
  }

  private isDark(): boolean {
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ||
      document.documentElement.classList.contains('dark') ||
      document.body.classList.contains('dark') ||
      document.documentElement.getAttribute('data-theme') === 'dark'
  }

  setState(state: CoinState): void {
    if (this.state === state) return
    this.state = state
    const el = this.el
    if (!el) return

    if (state === 'idle') {
      el.style.display = 'none'
      el.innerHTML = ''
      return
    }

    el.style.display = 'flex'
    el.style.background = 'none'
    el.style.border = 'none'
    el.style.borderRadius = '0'
    el.style.fontSize = '14px'

    if (state === 'loading') {
      el.innerHTML = this.winSpinnerSVG()
    } else if (state === 'ok') {
      // Checkmark verde estilo Windows — círculo preenchido com ✓
      el.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" style="animation:__eqdc_pop__ 0.22s cubic-bezier(0.34,1.56,0.64,1) forwards">
        <circle cx="9" cy="9" r="8.5" fill="#0f9d58"/>
        <polyline points="5,9.5 7.5,12 13,6.5" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`
    } else if (state === 'error') {
      // X vermelho estilo Windows
      el.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" style="animation:__eqdc_shake__ 0.32s ease">
        <circle cx="9" cy="9" r="8.5" fill="#d93025"/>
        <line x1="5.5" y1="5.5" x2="12.5" y2="12.5" stroke="white" stroke-width="2" stroke-linecap="round"/>
        <line x1="12.5" y1="5.5" x2="5.5" y2="12.5" stroke="white" stroke-width="2" stroke-linecap="round"/>
      </svg>`
    }
  }

  getState(): CoinState { return this.state }

  flashOk(durationMs = 2000): void {
    this.setState('ok')
    setTimeout(() => { if (this.state === 'ok') this.setState('idle') }, durationMs)
  }

  flashError(durationMs = 2500): void {
    this.setState('error')
    setTimeout(() => { if (this.state === 'error') this.setState('idle') }, durationMs)
  }

  destroy(): void {
    window.removeEventListener('mousemove', this.boundMove)
    if (this.rafId !== null) cancelAnimationFrame(this.rafId)
    this.el?.remove()
    this.el = null
    document.getElementById('__eqdc_style__')?.remove()
  }
}
