/**
 * CommandMenu — Lista de atalhos clicáveis (Shift+C).
 * Visual idêntico ao ModelMenu (Chrome context menu).
 */

export interface Command {
  keys: string     // ex: "Shift+Q"
  label: string    // max 4 palavras
  action: () => void
}

export class CommandMenu {
  private el: HTMLDivElement | null = null
  private lastMouseX = 0
  private lastMouseY = 0
  private boundOutside: (e: MouseEvent | KeyboardEvent) => void
  private boundMouseMove: (e: MouseEvent) => void
  private commands: Command[] = []

  constructor() {
    this.boundMouseMove = (e) => { this.lastMouseX = e.clientX; this.lastMouseY = e.clientY }
    this.boundOutside   = (e) => {
      if (e instanceof KeyboardEvent && e.key !== 'Escape') return
      if (e instanceof MouseEvent && this.el?.contains(e.target as Node)) return
      this.close()
    }
    window.addEventListener('mousemove', this.boundMouseMove, { passive: true })
    this.injectStyle()
  }

  setCommands(commands: Command[]): void { this.commands = commands }

  private injectStyle(): void {
    if (document.getElementById('__eqcm_style__')) return
    const s = document.createElement('style')
    s.id = '__eqcm_style__'
    s.textContent = `
      #__eqcm_menu__ {
        position: fixed;
        min-width: 230px;
        max-width: 300px;
        background: #fff;
        border: 1px solid rgba(0,0,0,0.12);
        border-radius: 4px;
        box-shadow: 0 4px 16px rgba(0,0,0,0.18), 0 1px 4px rgba(0,0,0,0.10);
        z-index: 2147483647;
        padding: 4px 0;
        font-family: system-ui,-apple-system,"Segoe UI",sans-serif;
        font-size: 13px;
        color: #202124;
        user-select: none;
        outline: none;
        animation: __eqcm_in__ 0.08s ease;
        overflow: hidden;
      }
      @keyframes __eqcm_in__ {
        from { opacity:0; transform:scale(0.97) translateY(-3px); }
        to   { opacity:1; transform:scale(1) translateY(0); }
      }
      .__eqcm_section__ {
        padding: 6px 12px 3px;
        font-size: 11px; color: #70757a;
        pointer-events: none; line-height: 1.4;
      }
      .__eqcm_sep__ {
        height: 0; border: none;
        border-top: 1px solid #e8eaed;
        margin: 4px 0;
      }
      .__eqcm_item__ {
        display: grid;
        grid-template-columns: 80px 1fr;
        align-items: center;
        padding: 0 12px 0 8px;
        height: 28px;
        gap: 8px;
        cursor: default;
        color: #202124;
        outline: none;
        transition: background 0.05s;
      }
      .__eqcm_item__:hover, .__eqcm_item__:focus {
        background: #1a73e8;
        color: #fff;
      }
      .__eqcm_item__:hover .__eqcm_kbd__, .__eqcm_item__:focus .__eqcm_kbd__ {
        background: rgba(255,255,255,0.18);
        color: rgba(255,255,255,0.9);
        border-color: rgba(255,255,255,0.25);
      }
      .__eqcm_kbd__ {
        font-family: "SF Mono","Consolas","Fira Code",monospace;
        font-size: 10.5px;
        background: #f1f3f4;
        color: #3c4043;
        border: 1px solid #dadce0;
        border-radius: 3px;
        padding: 1px 5px;
        white-space: nowrap;
        text-align: center;
        transition: background 0.05s, color 0.05s, border-color 0.05s;
      }
      .__eqcm_lbl__ {
        font-size: 13px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        line-height: 28px;
      }
    `
    document.documentElement.appendChild(s)
  }

  open(): void {
    this.close()

    const menu = document.createElement('div')
    menu.id = '__eqcm_menu__'
    menu.setAttribute('role', 'menu')
    menu.tabIndex = -1

    const hdr = document.createElement('div')
    hdr.className = '__eqcm_section__'
    hdr.textContent = 'Comandos disponíveis'
    menu.appendChild(hdr)

    const sep = document.createElement('div')
    sep.className = '__eqcm_sep__'
    menu.appendChild(sep)

    for (const cmd of this.commands) {
      const row = document.createElement('div')
      row.className = '__eqcm_item__'
      row.setAttribute('role', 'menuitem')
      row.tabIndex = 0

      const kbd = document.createElement('span')
      kbd.className = '__eqcm_kbd__'
      kbd.textContent = cmd.keys

      const lbl = document.createElement('span')
      lbl.className = '__eqcm_lbl__'
      lbl.textContent = cmd.label

      row.appendChild(kbd)
      row.appendChild(lbl)

      const execute = () => { this.close(); setTimeout(() => cmd.action(), 60) }
      row.addEventListener('click', execute)
      row.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); execute() }
      })

      menu.appendChild(row)
    }

    document.documentElement.appendChild(menu)
    this.el = menu

    // Posiciona no cursor, ajusta para não sair da viewport
    const mw = 240, mh = this.commands.length * 28 + 50
    let x = this.lastMouseX
    let y = this.lastMouseY
    const vw = window.innerWidth, vh = window.innerHeight
    if (x + mw + 8 > vw) x = vw - mw - 8
    if (y + mh + 8 > vh) y = vh - mh - 8
    if (x < 4) x = 4
    if (y < 4) y = 4
    menu.style.left = `${x}px`
    menu.style.top  = `${y}px`
    menu.focus()

    setTimeout(() => {
      window.addEventListener('click',   this.boundOutside as EventListener, { capture: true })
      window.addEventListener('keydown', this.boundOutside as EventListener, { capture: true })
    }, 50)
  }

  close(): void {
    window.removeEventListener('click',   this.boundOutside as EventListener, { capture: true })
    window.removeEventListener('keydown', this.boundOutside as EventListener, { capture: true })
    this.el?.remove()
    this.el = null
  }

  isOpen(): boolean { return this.el !== null }

  destroy(): void {
    this.close()
    window.removeEventListener('mousemove', this.boundMouseMove)
    document.getElementById('__eqcm_style__')?.remove()
  }
}
