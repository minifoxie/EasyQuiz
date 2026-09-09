/**
 * CoinCursor — Fixes:
 * 1. Spinner em wrapper div (sem conflito SVG transform + CSS animation)
 * 2. Posição: direita do mouse, verticalmente centrado (mouseX+18, mouseY-10)
 * 3. Sem animações de posição — ícones estáticos
 */

export type CoinState = 'idle' | 'loading' | 'ok' | 'error'

export class CoinCursor {
  private el: HTMLDivElement | null = null
  private state: CoinState = 'idle'
  private mouseX = -300
  private mouseY = -300
  private rafId: number | null = null
  private flashTimer: number | null = null
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
        from { transform: rotate(-90deg); }
        to   { transform: rotate(270deg); }
      }
      .__eqdc_ring__ {
        width: 20px; height: 20px;
        animation: __eqdc_spin__ 0.9s linear infinite;
        display: block;
        line-height: 0;
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
      userSelect: 'none',
      lineHeight: '0',
    })
    document.documentElement.appendChild(this.el)
  }

  private startRaf(): void {
    const tick = () => {
      if (this.el && this.state !== 'idle') {
        // Direita do mouse, verticalmente centrado na ponta do cursor
        const x = Math.min(this.mouseX + 18, window.innerWidth - 24)
        const y = Math.max(this.mouseY - 10, 2)
        this.el.style.left = `${x}px`
        this.el.style.top  = `${y}px`
      }
      this.rafId = requestAnimationFrame(tick)
    }
    this.rafId = requestAnimationFrame(tick)
  }

  setState(state: CoinState): void {
    this.state = state
    const el = this.el; if (!el) return

    if (state === 'idle') {
      el.style.display = 'none'; el.innerHTML = ''; return
    }
    el.style.display = 'block'

    if (state === 'loading') {
      // Spinner: div wrapper com CSS animation — sem conflito com SVG transform attr
      el.innerHTML = `<div class="__eqdc_ring__">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
          <circle cx="10" cy="10" r="7.5" fill="none"
            stroke="rgba(0,120,212,0.14)" stroke-width="2.5"/>
          <circle cx="10" cy="10" r="7.5" fill="none"
            stroke="rgba(0,120,212,0.60)" stroke-width="2.5"
            stroke-dasharray="35 12" stroke-linecap="round"/>
        </svg>
      </div>`

    } else if (state === 'ok') {
      el.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
        <polyline points="3,10 8,15.5 17,4.5"
          fill="none" stroke="#107C10" stroke-width="2.8"
          stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`

    } else if (state === 'error') {
      el.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
        <line x1="4" y1="4" x2="16" y2="16" stroke="#C42B1C" stroke-width="2.8" stroke-linecap="round"/>
        <line x1="16" y1="4" x2="4" y2="16" stroke="#C42B1C" stroke-width="2.8" stroke-linecap="round"/>
      </svg>`
    }
  }

  getState(): CoinState { return this.state }

  flashOk(ms = 2000): void {
    if (this.flashTimer) clearTimeout(this.flashTimer)
    this.setState('ok')
    this.flashTimer = window.setTimeout(() => {
      if (this.state === 'ok') this.setState('idle')
    }, ms)
  }

  flashError(ms = 2500): void {
    if (this.flashTimer) clearTimeout(this.flashTimer)
    this.setState('error')
    this.flashTimer = window.setTimeout(() => {
      if (this.state === 'error') this.setState('idle')
    }, ms)
  }

  destroy(): void {
    window.removeEventListener('mousemove', this.boundMove)
    if (this.rafId !== null) cancelAnimationFrame(this.rafId)
    if (this.flashTimer) clearTimeout(this.flashTimer)
    this.el?.remove(); this.el = null
    document.getElementById('__eqdc_style__')?.remove()
  }
}
