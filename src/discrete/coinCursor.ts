/**
 * CoinCursor — Spinner Windows 11 moderno (anel azul giratório).
 */

export type CoinState = 'idle' | 'loading' | 'ok' | 'error'

const WIN_BLUE = '#0078D4'

export class CoinCursor {
  private el: HTMLDivElement | null = null
  private state: CoinState = 'idle'
  private mouseX = -300
  private mouseY = -300
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
    s.textContent = `
      @keyframes __eqdc_spin__ {
        to { transform: rotate(360deg); }
      }
      @keyframes __eqdc_pop__ {
        0%  { transform:scale(0.2); opacity:0; }
        65% { transform:scale(1.18); opacity:1; }
        100%{ transform:scale(1); opacity:1; }
      }
      @keyframes __eqdc_shake__ {
        0%,100%{ transform:translateX(0); }
        25%    { transform:translateX(-2.5px); }
        75%    { transform:translateX(2.5px); }
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
    })
    document.documentElement.appendChild(this.el)
  }

  private startRaf(): void {
    const tick = () => {
      if (this.el && this.state !== 'idle') {
        this.el.style.left = `${Math.min(this.mouseX + 20, window.innerWidth - 26)}px`
        this.el.style.top  = `${Math.max(this.mouseY - 10, 4)}px`
      }
      this.rafId = requestAnimationFrame(tick)
    }
    this.rafId = requestAnimationFrame(tick)
  }

  /**
   * Spinner Windows 11: anel fino com arco rotativo.
   * Circunferência ≈ 44px. dasharray=33 (3/4 visível), restante transparente.
   */
  private spinnerSVG(): string {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"
      style="animation:__eqdc_spin__ 1s linear infinite;display:block">
      <circle cx="10" cy="10" r="7" fill="none" stroke="rgba(0,120,212,0.18)" stroke-width="2.2"/>
      <circle cx="10" cy="10" r="7" fill="none" stroke="${WIN_BLUE}" stroke-width="2.2"
        stroke-dasharray="33 11" stroke-linecap="round"
        transform="rotate(-90 10 10)"/>
    </svg>`
  }

  setState(state: CoinState): void {
    if (this.state === state) return
    this.state = state
    const el = this.el; if (!el) return

    if (state === 'idle') {
      el.style.display = 'none'; el.innerHTML = ''; return
    }

    el.style.display = 'flex'

    if (state === 'loading') {
      el.innerHTML = this.spinnerSVG()
    } else if (state === 'ok') {
      el.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"
        style="animation:__eqdc_pop__ 0.2s cubic-bezier(.34,1.56,.64,1) forwards">
        <circle cx="9" cy="9" r="8.5" fill="#107C10"/>
        <polyline points="5,9.5 7.5,12 13,6.5" fill="none" stroke="#fff"
          stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`
    } else if (state === 'error') {
      el.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"
        style="animation:__eqdc_shake__ 0.3s ease">
        <circle cx="9" cy="9" r="8.5" fill="#C42B1C"/>
        <line x1="5.5" y1="5.5" x2="12.5" y2="12.5" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/>
        <line x1="12.5" y1="5.5" x2="5.5" y2="12.5" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/>
      </svg>`
    }
  }

  getState(): CoinState { return this.state }

  flashOk(ms = 2000): void {
    this.setState('ok')
    setTimeout(() => { if (this.state === 'ok') this.setState('idle') }, ms)
  }

  flashError(ms = 2500): void {
    this.setState('error')
    setTimeout(() => { if (this.state === 'error') this.setState('idle') }, ms)
  }

  destroy(): void {
    window.removeEventListener('mousemove', this.boundMove)
    if (this.rafId !== null) cancelAnimationFrame(this.rafId)
    this.el?.remove(); this.el = null
    document.getElementById('__eqdc_style__')?.remove()
  }
}
