/**
 * CoinCursor — Windows 10 loading ring idêntico.
 * Anel azul #0078D4, arco 270° rotativo suave.
 * Offset: 8px do cursor (quase colado).
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
      @keyframes __eqdc_spin__ { to { transform: rotate(360deg); } }
      @keyframes __eqdc_pop__  {
        0%   { transform:scale(0); opacity:0; }
        60%  { transform:scale(1.2); opacity:1; }
        100% { transform:scale(1); }
      }
      @keyframes __eqdc_shake__ {
        0%,100%{ transform:translateX(0); }
        30%    { transform:translateX(-2px); }
        70%    { transform:translateX(2px); }
      }
    `
    document.documentElement.appendChild(s)
  }

  private createEl(): void {
    this.el = document.createElement('div')
    this.el.id = '__eqdiscrete_coin__'
    Object.assign(this.el.style, {
      position: 'fixed',
      width: '18px',
      height: '18px',
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
        // 8px de offset — quase colado no cursor
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

    if (state === 'idle') {
      el.style.display = 'none'; el.innerHTML = ''; return
    }
    el.style.display = 'block'

    if (state === 'loading') {
      // Windows 10 ring: anel completo transparente + arco 270° azul girando
      // r=7, circunf≈44px. Arco 270° ≈ 33px visible, 11px gap.
      el.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
          <circle cx="9" cy="9" r="7"
            fill="none" stroke="rgba(0,120,212,0.15)" stroke-width="2.2"/>
          <circle cx="9" cy="9" r="7"
            fill="none" stroke="#0078D4" stroke-width="2.2"
            stroke-dasharray="33 11" stroke-linecap="round"
            transform="rotate(-90 9 9)"
            style="animation:__eqdc_spin__ 1s linear infinite;transform-origin:9px 9px"/>
        </svg>`

    } else if (state === 'ok') {
      // Check simples — círculo verde sólido com checkmark
      el.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"
          style="animation:__eqdc_pop__ 0.18s ease forwards">
          <circle cx="8" cy="8" r="7.5" fill="#107C10"/>
          <polyline points="4.5,8.5 7,11 11.5,5.5"
            fill="none" stroke="#fff" stroke-width="1.8"
            stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`

    } else if (state === 'error') {
      // X vermelho simples
      el.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"
          style="animation:__eqdc_shake__ 0.28s ease">
          <circle cx="8" cy="8" r="7.5" fill="#C42B1C"/>
          <line x1="5" y1="5" x2="11" y2="11" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/>
          <line x1="11" y1="5" x2="5" y2="11" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/>
        </svg>`
    }
  }

  getState(): CoinState { return this.state }

  flashOk(ms = 1800): void {
    this.setState('ok')
    setTimeout(() => { if (this.state === 'ok') this.setState('idle') }, ms)
  }

  flashError(ms = 2200): void {
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
