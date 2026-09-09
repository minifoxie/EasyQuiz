/**
 * CoinCursor — Cursor Discreto e Fiel ao Windows 10
 * 
 * 1. Spinner Windows 10 fiel:
 *    - Fundo do círculo/trilha em branco sólido (#FFFFFF) sem transparência.
 *    - Arco giratório em azul Windows 10 (#0078D7).
 *    - Rotação perfeita em torno do centro (transform-origin: 50% 50%) — sem loop de subir/descer.
 * 2. Posicionamento colado ao mouse:
 *    - Exatamente à direita da ponta do cursor (mouseX + 14, mouseY - 2), sem deslocamento para baixo.
 * 3. Ícones limpos (Check e X):
 *    - Sem caixa/fundo, apenas o traçado vetorial nas cores verde (#107C10) e vermelho (#C42B1C)
 *    - Filtro drop-shadow sutil para nitidez em fundos claros e escuros.
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
        0%   { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      #__eqdiscrete_coin__ {
        position: fixed;
        width: 18px;
        height: 18px;
        z-index: 2147483646;
        pointer-events: none;
        display: none;
        user-select: none;
        line-height: 0;
        background: transparent !important;
        background-color: transparent !important;
        box-shadow: none !important;
        border: none !important;
      }
      .__eqdc_ring__ {
        width: 18px;
        height: 18px;
        display: flex;
        align-items: center;
        justify-content: center;
        transform-origin: center center !important;
        animation: __eqdc_spin__ 0.85s linear infinite !important;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      .__eqdc_svg_icon__ {
        display: block;
        filter: drop-shadow(0 1px 2px rgba(0,0,0,0.35));
      }
    `
    document.documentElement.appendChild(s)
  }

  private createEl(): void {
    this.el = document.createElement('div')
    this.el.id = '__eqdiscrete_coin__'
    document.documentElement.appendChild(this.el)
  }

  private startRaf(): void {
    const tick = () => {
      if (this.el && this.state !== 'idle') {
        // Exatamente do lado direito do ponteiro do mouse, quase colado e nivelado com o cursor
        const x = Math.min(this.mouseX + 14, window.innerWidth - 22)
        const y = Math.min(Math.max(this.mouseY - 2, 2), window.innerHeight - 22)
        this.el.style.left = `${x}px`
        this.el.style.top  = `${y}px`
      }
      this.rafId = requestAnimationFrame(tick)
    }
    this.rafId = requestAnimationFrame(tick)
  }

  setState(state: CoinState): void {
    this.state = state
    const el = this.el
    if (!el) return

    if (state === 'idle') {
      el.style.display = 'none'
      el.innerHTML = ''
      return
    }
    el.style.display = 'block'

    if (state === 'loading') {
      // Anel giratório Windows 10 com furo no meio (contorno branco e azul)
      el.innerHTML = `
        <div class="__eqdc_ring__">
          <svg class="__eqdc_svg_icon__" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 20 20">
            <!-- Contorno branco sólido com furo no meio (fill="none") -->
            <circle cx="10" cy="10" r="7.5" fill="none" stroke="#FFFFFF" stroke-width="2.6"/>
            <!-- Arco rotativo azul Windows 10 (#0078D7) -->
            <circle cx="10" cy="10" r="7.5" fill="none" stroke="#0078D7" stroke-width="2.6"
              stroke-dasharray="26 22" stroke-linecap="round"/>
          </svg>
        </div>`
    } else if (state === 'ok') {
      // Ícone verificado limpo, sem fundo, traço verde sólido
      el.innerHTML = `
        <svg class="__eqdc_svg_icon__" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 20 20">
          <polyline points="3,10 8,15.5 17,4.5"
            fill="none" stroke="#107C10" stroke-width="2.8"
            stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`
    } else if (state === 'error') {
      // Ícone X limpo, sem fundo, traço vermelho sólido
      el.innerHTML = `
        <svg class="__eqdc_svg_icon__" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 20 20">
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
    this.el?.remove()
    this.el = null
    document.getElementById('__eqdc_style__')?.remove()
  }
}
