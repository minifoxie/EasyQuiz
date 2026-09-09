/**
 * CoinCursor — Ícone flutuante 18x18px que segue o cursor do mouse.
 * Indica o estado do sistema sem chamar atenção.
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
    this.boundMove = (e: MouseEvent) => {
      this.mouseX = e.clientX
      this.mouseY = e.clientY
    }
    window.addEventListener('mousemove', this.boundMove, { passive: true })
    this.createEl()
    this.startRaf()
  }

  private createEl(): void {
    this.el = document.createElement('div')
    this.el.id = '__eqdiscrete_coin__'
    Object.assign(this.el.style, {
      position: 'fixed',
      width: '18px',
      height: '18px',
      borderRadius: '50%',
      zIndex: '2147483646',
      pointerEvents: 'none',
      display: 'none',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '10px',
      fontFamily: 'system-ui,sans-serif',
      fontWeight: '700',
      lineHeight: '1',
      transition: 'opacity 0.15s ease',
      userSelect: 'none',
      boxSizing: 'border-box',
    })
    this.injectStyle()
    document.documentElement.appendChild(this.el)
  }

  private injectStyle(): void {
    if (document.getElementById('__eqdiscrete_coin_style__')) return
    const style = document.createElement('style')
    style.id = '__eqdiscrete_coin_style__'
    style.textContent = `
      @keyframes __eqdc_spin__ {
        from { transform: rotate(0deg); }
        to   { transform: rotate(360deg); }
      }
      @keyframes __eqdc_pop__ {
        0%   { transform: scale(0.4); opacity:0; }
        60%  { transform: scale(1.2); }
        100% { transform: scale(1); opacity:1; }
      }
      @keyframes __eqdc_shake__ {
        0%,100% { transform: translateX(0); }
        25%     { transform: translateX(-2px); }
        75%     { transform: translateX(2px); }
      }
    `
    document.documentElement.appendChild(style)
  }

  private startRaf(): void {
    const tick = () => {
      if (this.el && this.state !== 'idle') {
        const x = this.mouseX + 22
        const y = this.mouseY - 9
        this.el.style.left = `${Math.min(x, window.innerWidth - 24)}px`
        this.el.style.top = `${Math.max(y, 4)}px`
      }
      this.rafId = requestAnimationFrame(tick)
    }
    this.rafId = requestAnimationFrame(tick)
  }

  setState(state: CoinState): void {
    if (this.state === state) return
    this.state = state
    const el = this.el
    if (!el) return

    el.style.animation = ''

    if (state === 'idle') {
      el.style.display = 'none'
      return
    }

    el.style.display = 'flex'

    // Detecta tema da página (light vs dark)
    const isDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches ||
      (document.documentElement.style.colorScheme === 'dark') ||
      document.body.classList.contains('dark') ||
      document.body.classList.contains('dark-mode')

    if (state === 'loading') {
      Object.assign(el.style, {
        background: isDark ? '#1a1a2e' : '#ffffff',
        border: `2px solid ${isDark ? '#555' : '#bbb'}`,
        color: isDark ? '#aaa' : '#666',
        animation: '__eqdc_spin__ 1.1s linear infinite',
      })
      el.innerHTML = `<svg width="8" height="8" viewBox="0 0 8 8" fill="none">
        <path d="M4 1.5a2.5 2.5 0 0 1 2.5 2.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      </svg>`
    } else if (state === 'ok') {
      Object.assign(el.style, {
        background: isDark ? '#0d1f0d' : '#e8f5e9',
        border: '2px solid #4caf50',
        color: '#4caf50',
        animation: '__eqdc_pop__ 0.25s ease forwards',
      })
      el.textContent = '✓'
    } else if (state === 'error') {
      Object.assign(el.style, {
        background: isDark ? '#1f0d0d' : '#fdecea',
        border: '2px solid #ef5350',
        color: '#ef5350',
        animation: '__eqdc_shake__ 0.35s ease',
      })
      el.textContent = '✗'
    }
  }

  getState(): CoinState { return this.state }

  /** Mostra ok por 2s, depois retorna para idle */
  flashOk(durationMs = 2000): void {
    this.setState('ok')
    setTimeout(() => {
      if (this.state === 'ok') this.setState('idle')
    }, durationMs)
  }

  /** Mostra error por 2.5s, depois retorna para idle */
  flashError(durationMs = 2500): void {
    this.setState('error')
    setTimeout(() => {
      if (this.state === 'error') this.setState('idle')
    }, durationMs)
  }

  destroy(): void {
    window.removeEventListener('mousemove', this.boundMove)
    if (this.rafId !== null) cancelAnimationFrame(this.rafId)
    this.el?.remove()
    this.el = null
  }
}
