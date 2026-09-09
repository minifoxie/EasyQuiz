/**
 * ModelMenu — Context menu pixel-perfect idêntico ao Chrome/Edge nativo.
 * Ativado por Shift+M. Aparece onde o cursor está.
 */

import { AVAILABLE_MODELS, discoveredModelsCache } from '../core/gemini'
import { loadSettings, saveSettings } from '../core/storage'

export class ModelMenu {
  private el: HTMLDivElement | null = null
  private lastMouseX = 0
  private lastMouseY = 0
  private onModelChange?: (modelId: string) => void
  private boundMouseMove: (e: MouseEvent) => void
  private boundOutside: (e: MouseEvent | KeyboardEvent) => void
  private autoTimer: number | null = null

  constructor(opts: { onModelChange?: (modelId: string) => void }) {
    this.onModelChange = opts.onModelChange
    this.boundMouseMove = (e) => { this.lastMouseX = e.clientX; this.lastMouseY = e.clientY }
    this.boundOutside = (e) => {
      if (e instanceof KeyboardEvent && e.key !== 'Escape') return
      if (e instanceof MouseEvent && this.el?.contains(e.target as Node)) return
      this.close()
    }
    window.addEventListener('mousemove', this.boundMouseMove, { passive: true })
    this.injectStyle()
  }

  private injectStyle(): void {
    if (document.getElementById('__eqdm_style__')) return
    const s = document.createElement('style')
    s.id = '__eqdm_style__'
    // Pixel-perfect Chrome 120+ context menu
    s.textContent = `
      #__eqdm_menu__ {
        position: fixed;
        min-width: 200px;
        max-width: 280px;
        background: #fff;
        border: 1px solid rgba(0,0,0,0.12);
        border-radius: 4px;
        box-shadow: 0 4px 16px rgba(0,0,0,0.18), 0 1px 4px rgba(0,0,0,0.10);
        z-index: 2147483647;
        padding: 4px 0;
        font-family: system-ui,-apple-system,"Segoe UI","Helvetica Neue",Arial,sans-serif;
        font-size: 13px;
        color: #202124;
        user-select: none;
        outline: none;
        animation: __eqdm_in__ 0.08s ease;
        overflow: hidden;
      }
      @keyframes __eqdm_in__ {
        from { opacity:0; transform:scale(0.97) translateY(-3px); }
        to   { opacity:1; transform:scale(1) translateY(0); }
      }
      .__eqdm_section__ {
        padding: 6px 12px 3px;
        font-size: 11px;
        color: #70757a;
        font-weight: 400;
        letter-spacing: 0;
        pointer-events: none;
        line-height: 1.4;
      }
      .__eqdm_sep__ {
        height: 0;
        border: none;
        border-top: 1px solid #e8eaed;
        margin: 4px 0;
      }
      .__eqdm_item__ {
        display: grid;
        grid-template-columns: 20px 1fr auto;
        align-items: center;
        padding: 0 12px 0 8px;
        height: 28px;
        gap: 6px;
        cursor: default;
        white-space: nowrap;
        overflow: hidden;
        color: #202124;
        position: relative;
        outline: none;
      }
      .__eqdm_item__:hover,
      .__eqdm_item__:focus {
        background: #1a73e8;
        color: #fff;
      }
      .__eqdm_item__:hover .__eqdm_badge__,
      .__eqdm_item__:focus .__eqdm_badge__ {
        background: rgba(255,255,255,0.25);
        color: rgba(255,255,255,0.9);
      }
      .__eqdm_check__ {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 13px;
        width: 16px;
        flex-shrink: 0;
        color: #1a73e8;
      }
      .__eqdm_item__:hover .__eqdm_check__,
      .__eqdm_item__:focus .__eqdm_check__ {
        color: #fff;
      }
      .__eqdm_name__ {
        overflow: hidden;
        text-overflow: ellipsis;
        line-height: 28px;
        font-size: 13px;
      }
      .__eqdm_badge__ {
        font-size: 10px;
        color: #70757a;
        background: #f1f3f4;
        border-radius: 10px;
        padding: 1px 6px;
        flex-shrink: 0;
        transition: background 0.08s, color 0.08s;
        letter-spacing: 0;
      }
    `
    document.documentElement.appendChild(s)
  }

  open(): void {
    this.close()

    const settings = loadSettings()
    const current = settings.model
    const builtIn = [...AVAILABLE_MODELS]
    const extra = (discoveredModelsCache || []).filter(m => !builtIn.some(b => b.id === m.id))

    const menu = document.createElement('div')
    menu.id = '__eqdm_menu__'
    menu.setAttribute('role', 'menu')
    menu.tabIndex = -1

    // Cabeçalho — igual ao Chrome: texto cinza sem separador imediato
    const header = document.createElement('div')
    header.className = '__eqdm_section__'
    header.textContent = 'Modelo Gemini'
    menu.appendChild(header)

    const sep0 = document.createElement('div')
    sep0.className = '__eqdm_sep__'
    menu.appendChild(sep0)

    const addItem = (id: string, label: string, badge?: string) => {
      const isActive = id === current
      const row = document.createElement('div')
      row.className = '__eqdm_item__'
      row.setAttribute('role', 'menuitemradio')
      row.setAttribute('aria-checked', isActive ? 'true' : 'false')
      row.tabIndex = 0

      // Coluna 1: checkmark (só se selecionado)
      const check = document.createElement('span')
      check.className = '__eqdm_check__'
      if (isActive) {
        // SVG checkmark idêntico ao Chrome — não emoji
        check.innerHTML = `<svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
          <path d="M1.5 6.5L4.5 9.5L10.5 2.5" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`
      }
      row.appendChild(check)

      // Coluna 2: nome
      const name = document.createElement('span')
      name.className = '__eqdm_name__'
      name.textContent = label
      if (isActive) name.style.fontWeight = '500'
      row.appendChild(name)

      // Coluna 3: badge opcional
      if (badge) {
        const b = document.createElement('span')
        b.className = '__eqdm_badge__'
        b.textContent = badge
        row.appendChild(b)
      }

      row.addEventListener('click', () => {
        saveSettings({ model: id })
        this.onModelChange?.(id)
        this.close()
      })

      row.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          saveSettings({ model: id })
          this.onModelChange?.(id)
          this.close()
        }
      })

      menu.appendChild(row)
    }

    // Modelos built-in com badges
    for (const m of builtIn) {
      let badge: string | undefined
      if (m.id.includes('3.8') || m.id.includes('3.7')) badge = 'Novo'
      else if (m.id.includes('flash-lite')) badge = 'Eco'
      else if (m.id.includes('pro')) badge = 'Pro'
      // Nome limpo sem parênteses
      const label = m.name.replace(/\s*\(.*?\)\s*/g, '').trim()
      addItem(m.id, label, badge)
    }

    // Extras da conta
    if (extra.length > 0) {
      const sep = document.createElement('div')
      sep.className = '__eqdm_sep__'
      menu.appendChild(sep)

      const h2 = document.createElement('div')
      h2.className = '__eqdm_section__'
      h2.textContent = 'Modelos da conta'
      menu.appendChild(h2)

      for (const m of extra) {
        addItem(m.id, m.name.replace(/\s*\(.*?\)\s*/g, '').trim())
      }
    }

    document.documentElement.appendChild(menu)
    this.el = menu

    // Posiciona na posição do cursor, ajustando viewport
    const { offsetWidth: w, offsetHeight: h } = menu
    let x = this.lastMouseX
    let y = this.lastMouseY
    const vw = window.innerWidth, vh = window.innerHeight
    if (x + w + 8 > vw) x = vw - w - 8
    if (y + h + 8 > vh) y = vh - h - 8
    if (x < 4) x = 4
    if (y < 4) y = 4
    menu.style.left = `${x}px`
    menu.style.top  = `${y}px`
    menu.focus()

    // Fechar ao clicar fora ou Escape
    setTimeout(() => {
      window.addEventListener('click', this.boundOutside as EventListener, { capture: true })
      window.addEventListener('keydown', this.boundOutside as EventListener, { capture: true })
    }, 50)

    // Auto-fechar em 8s sem interação
    this.autoTimer = window.setTimeout(() => this.close(), 8000)
  }

  close(): void {
    if (this.autoTimer) { clearTimeout(this.autoTimer); this.autoTimer = null }
    window.removeEventListener('click', this.boundOutside as EventListener, { capture: true })
    window.removeEventListener('keydown', this.boundOutside as EventListener, { capture: true })
    this.el?.remove()
    this.el = null
  }

  isOpen(): boolean { return this.el !== null }

  destroy(): void {
    this.close()
    window.removeEventListener('mousemove', this.boundMouseMove)
    document.getElementById('__eqdm_style__')?.remove()
  }
}
