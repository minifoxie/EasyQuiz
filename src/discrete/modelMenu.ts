/**
 * ModelMenu — Context menu Chrome-like para seleção de modelo Gemini.
 * Ativado por Shift+M. Aparece onde o cursor está. Visual idêntico ao Chrome.
 */

import { AVAILABLE_MODELS, discoveredModelsCache } from '../core/gemini'
import { loadSettings, saveSettings } from '../core/storage'

export class ModelMenu {
  private el: HTMLDivElement | null = null
  private lastMouseX = 0
  private lastMouseY = 0
  private boundMouseMove: (e: MouseEvent) => void
  private boundClose: (e: MouseEvent | KeyboardEvent) => void
  private onModelChange?: (modelId: string) => void
  private autoCloseTimer: number | null = null

  constructor(opts: { onModelChange?: (modelId: string) => void }) {
    this.onModelChange = opts.onModelChange
    this.boundMouseMove = (e: MouseEvent) => {
      this.lastMouseX = e.clientX
      this.lastMouseY = e.clientY
    }
    this.boundClose = (e: MouseEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent && e.key !== 'Escape') return
      if (e instanceof MouseEvent && this.el && this.el.contains(e.target as Node)) return
      this.close()
    }
    window.addEventListener('mousemove', this.boundMouseMove, { passive: true })
    this.injectStyle()
  }

  private injectStyle(): void {
    if (document.getElementById('__eqdm_style__')) return
    const s = document.createElement('style')
    s.id = '__eqdm_style__'
    s.textContent = `
      #__eqdm_menu__ {
        position: fixed;
        width: 228px;
        background: #fff;
        border: 1px solid rgba(0,0,0,0.12);
        border-radius: 4px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.22), 0 0 0 1px rgba(0,0,0,0.04);
        z-index: 2147483647;
        padding: 4px 0;
        font-family: system-ui,-apple-system,'Segoe UI',sans-serif;
        font-size: 13px;
        color: #202124;
        user-select: none;
        animation: __eqdm_in__ 0.12s ease;
        overflow: hidden;
      }
      @keyframes __eqdm_in__ {
        from { opacity:0; transform:scale(0.96); }
        to   { opacity:1; transform:scale(1); }
      }
      #__eqdm_menu__ .__eqdm_header__ {
        padding: 6px 12px 4px;
        font-size: 11px;
        color: #80868b;
        font-weight: 500;
        letter-spacing: 0.02em;
      }
      #__eqdm_menu__ .__eqdm_sep__ {
        height: 1px;
        background: #e8eaed;
        margin: 4px 0;
      }
      #__eqdm_menu__ .__eqdm_item__ {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 5px 12px;
        cursor: default;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        transition: background 0.08s;
      }
      #__eqdm_menu__ .__eqdm_item__:hover {
        background: #f1f3f4;
      }
      #__eqdm_menu__ .__eqdm_item__.__eqdm_active__ {
        font-weight: 600;
        color: #1a73e8;
      }
      #__eqdm_menu__ .__eqdm_arrow__ {
        font-size: 10px;
        width: 12px;
        flex-shrink: 0;
        color: #1a73e8;
      }
      #__eqdm_menu__ .__eqdm_name__ {
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      #__eqdm_menu__ .__eqdm_badge__ {
        font-size: 10px;
        color: #80868b;
        background: #f1f3f4;
        border-radius: 8px;
        padding: 1px 5px;
        flex-shrink: 0;
      }
    `
    document.documentElement.appendChild(s)
  }

  open(): void {
    this.close() // fecha se já aberto

    const settings = loadSettings()
    const currentModel = settings.model

    // Monta lista de modelos: built-in + descobertos da conta (sem duplicar)
    const builtIn = [...AVAILABLE_MODELS]
    const discovered = discoveredModelsCache || []
    const extra = discovered.filter(m => !builtIn.some(b => b.id === m.id))

    const menu = document.createElement('div')
    menu.id = '__eqdm_menu__'

    // Header
    const header = document.createElement('div')
    header.className = '__eqdm_header__'
    header.textContent = 'Selecionar modelo'
    menu.appendChild(header)

    const sep0 = document.createElement('div')
    sep0.className = '__eqdm_sep__'
    menu.appendChild(sep0)

    const addItem = (id: string, displayName: string, badge?: string) => {
      const isActive = id === currentModel
      const row = document.createElement('div')
      row.className = `__eqdm_item__${isActive ? ' __eqdm_active__' : ''}`

      const arrow = document.createElement('span')
      arrow.className = '__eqdm_arrow__'
      arrow.textContent = isActive ? '▶' : ''
      row.appendChild(arrow)

      const name = document.createElement('span')
      name.className = '__eqdm_name__'
      name.textContent = displayName
      row.appendChild(name)

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

      menu.appendChild(row)
    }

    // Modelos built-in
    for (const m of builtIn) {
      // Badge amigável
      let badge: string | undefined
      if (m.id.includes('flash-lite')) badge = 'Eco'
      else if (m.id.includes('3.8')) badge = 'Novo'
      addItem(m.id, m.name.replace(/ \(.*\)/, '').trim(), badge)
    }

    // Modelos extras descobertos da conta
    if (extra.length > 0) {
      const sep = document.createElement('div')
      sep.className = '__eqdm_sep__'
      menu.appendChild(sep)

      const h2 = document.createElement('div')
      h2.className = '__eqdm_header__'
      h2.textContent = 'Modelos da conta'
      menu.appendChild(h2)

      for (const m of extra) {
        addItem(m.id, m.name.replace(/ \(.*\)/, '').trim())
      }
    }

    // Posiciona onde o cursor está, ajustando para não sair da viewport
    document.documentElement.appendChild(menu)
    this.el = menu

    const menuW = 228
    const menuH = menu.offsetHeight || 300
    let x = this.lastMouseX
    let y = this.lastMouseY

    if (x + menuW > window.innerWidth - 8) x = window.innerWidth - menuW - 8
    if (y + menuH > window.innerHeight - 8) y = window.innerHeight - menuH - 8
    if (y < 8) y = 8
    if (x < 8) x = 8

    menu.style.left = `${x}px`
    menu.style.top = `${y}px`

    // Fechar ao clicar fora ou Escape
    setTimeout(() => {
      window.addEventListener('click', this.boundClose as EventListener, { capture: true, once: false })
      window.addEventListener('keydown', this.boundClose as EventListener, { capture: true, once: false })
    }, 50)

    // Auto-fechar em 8s
    this.autoCloseTimer = window.setTimeout(() => this.close(), 8000)
  }

  close(): void {
    if (this.autoCloseTimer) { clearTimeout(this.autoCloseTimer); this.autoCloseTimer = null }
    window.removeEventListener('click', this.boundClose as EventListener, { capture: true })
    window.removeEventListener('keydown', this.boundClose as EventListener, { capture: true })
    if (this.el) {
      this.el.remove()
      this.el = null
    }
  }

  isOpen(): boolean { return this.el !== null }

  destroy(): void {
    this.close()
    window.removeEventListener('mousemove', this.boundMouseMove)
  }
}
