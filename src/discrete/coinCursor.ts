/**
 * CoinCursor — Ícones sem fundo. Apenas símbolo colorido.
 * Windows 10 ring spinner. 8px offset (quase colado).
 */

export type CoinState = 'idle' | 'loading' | 'ok' | 'error'

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
      @keyframes __eqdc_spin__  { to { transform: rotate(360deg); } }
      @keyframes __eqdc_pop__   { 0%{opacity:0;transform:scale(0.4)} 70%{transform:scale(1.15)} 100%{opacity:1;transform:scale(1)} }
      @keyframes __eqdc_shake__ { 0%,100%{transform:translateX(0)} 33%{transform:translateX(-2px)} 66%{transform:translateX(2px)} }
    `
    document.documentElement.appendChild(s)
  }

  private createEl(): void {
    this.el = document.createElement('div')
    this.el.id = '__eqdiscrete_coin__'
    Object.assign(this.el.style, {
      position: 'fixed',
      width: '18px', height: '18px',
      zIndex: '2147483646',
      pointerEvents: 'none',
      display: 'none',
      userSelect: 'none',
    })
    document.documentElement.appendChild(this.el)
  }

  private startRaf(): void {
    const tick = () => {
      if (this.el && this.state !== 'idle') {
        this.el.style.left = `${Math.min(this.mouseX + 8, window.innerWidth - 22)}px`
        this.el.style.top  = `${Math.max(this.mouseY + 8, 2)}px`
      }
      this.rafId = requestAnimationFrame(tick)
    }
    this.rafId = requestAnimationFrame(tick)
  }

  setState(state: CoinState): void {
    if (this.state === state) return
    this.state = state
    const el = this.el; if (!el) return

    if (state === 'idle') { el.style.display = 'none'; el.innerHTML = ''; return }
    el.style.display = 'block'

    if (state === 'loading') {
      // Windows 10: anel azul 270°, fundo translúcido
      el.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
        <circle cx="9" cy="9" r="7" fill="none" stroke="rgba(0,120,212,0.15)" stroke-width="2"/>
        <circle cx="9" cy="9" r="7" fill="none" stroke="#0078D4" stroke-width="2"
          stroke-dasharray="33 11" stroke-linecap="round" transform="rotate(-90 9 9)"
          style="animation:__eqdc_spin__ 0.9s linear infinite;transform-origin:9px 9px"/>
      </svg>`
    } else if (state === 'ok') {
      // Só o checkmark verde — sem círculo de fundo
      el.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"
        style="animation:__eqdc_pop__ 0.18s ease forwards">
        <polyline points="2.5,9.5 7,14 15.5,4"
          fill="none" stroke="#107C10" stroke-width="2.5"
          stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`
    } else if (state === 'error') {
      // Só o X vermelho — sem círculo de fundo
      el.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"
        style="animation:__eqdc_shake__ 0.26s ease">
        <line x1="3.5" y1="3.5" x2="14.5" y2="14.5" stroke="#C42B1C" stroke-width="2.5" stroke-linecap="round"/>
        <line x1="14.5" y1="3.5" x2="3.5" y2="14.5" stroke="#C42B1C" stroke-width="2.5" stroke-linecap="round"/>
      </svg>`
    }
  }

  getState(): CoinState { return this.state }
  flashOk(ms = 1600):    void { this.setState('ok');    setTimeout(() => { if (this.state === 'ok')    this.setState('idle') }, ms) }
  flashError(ms = 2000): void { this.setState('error'); setTimeout(() => { if (this.state === 'error') this.setState('idle') }, ms) }

  destroy(): void {
    window.removeEventListener('mousemove', this.boundMove)
    if (this.rafId !== null) cancelAnimationFrame(this.rafId)
    this.el?.remove(); this.el = null
    document.getElementById('__eqdc_style__')?.remove()
  }
}
