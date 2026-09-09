/**
 * CoinCursor — Cursor Discreto Modo Discreto
 *
 * 1. Spinner Windows 10 fiel:
 *    - Trilha branca sólida (#FFFFFF) com furo no meio (fill="none").
 *    - Arco giratório azul Windows 10 (#0078D7).
 *    - Tamanho: 14×14px (25% menor que 18px).
 *    - Traçado: 3.5px (15%+ mais grosso que 2.6px na escala do elemento menor).
 *
 * 2. Smooth follow com pequeno delay:
 *    - O ícone segue o mouse com lerp LERP=0.22 (~55ms de delay suave @ 60fps).
 *    - No primeiro movimento, a posição é snapada instantaneamente.
 *    - Colado à direita do cursor (displayX+11, displayY-2).
 *
 * 3. Ícones Check/X:
 *    - Traçado vetorial limpo, sem caixa/fundo.
 *    - Drop-shadow sutil para contraste em qualquer fundo.
 */

export type CoinState = 'idle' | 'loading' | 'ok' | 'error'

export class CoinCursor {
  private el: HTMLDivElement | null = null
  private state: CoinState = 'idle'
  private mouseX = -300
  private mouseY = -300
  private displayX = -300  // posição suavizada via lerp
  private displayY = -300  // posição suavizada via lerp
  private rafId: number | null = null
  private flashTimer: number | null = null
  private boundMove: (e: MouseEvent) => void

  constructor() {
    this.boundMove = (e: MouseEvent) => {
      this.mouseX = e.clientX
      this.mouseY = e.clientY
      // Snap imediato na primeira detecção de mouse — sem atraso inicial
      if (this.displayX === -300) {
        this.displayX = e.clientX
        this.displayY = e.clientY
      }
    }
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
        width: 14px;
        height: 14px;
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
        width: 14px;
        height: 14px;
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
    // LERP = 0.22 → ~3-4 frames de lag @ 60fps = ~55ms de delay suave
    // Sensação: "flutua" levemente atrás do cursor, mas extremamente responsivo
    const LERP = 0.22
    const tick = () => {
      if (this.el && this.state !== 'idle') {
        this.displayX += (this.mouseX - this.displayX) * LERP
        this.displayY += (this.mouseY - this.displayY) * LERP
        const x = Math.min(this.displayX + 11, window.innerWidth - 18)
        const y = Math.min(Math.max(this.displayY - 2, 2), window.innerHeight - 18)
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
      // Anel giratório Windows 10: 14px, stroke 3.5, furo no meio (fill=none)
      el.innerHTML = `
        <div class="__eqdc_ring__">
          <svg class="__eqdc_svg_icon__" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 20 20">
            <!-- Trilha branca sólida — define o furo no centro -->
            <circle cx="10" cy="10" r="7" fill="none" stroke="#FFFFFF" stroke-width="3.5"/>
            <!-- Arco azul Windows 10 (#0078D7) giratório -->
            <circle cx="10" cy="10" r="7" fill="none" stroke="#0078D7" stroke-width="3.5"
              stroke-dasharray="22 22" stroke-linecap="round"/>
          </svg>
        </div>`
    } else if (state === 'ok') {
      el.innerHTML = `
        <svg class="__eqdc_svg_icon__" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 20 20">
          <polyline points="3,10 8,15.5 17,4.5"
            fill="none" stroke="#107C10" stroke-width="2.8"
            stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`
    } else if (state === 'error') {
      el.innerHTML = `
        <svg class="__eqdc_svg_icon__" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 20 20">
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
