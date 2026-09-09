/**
 * CornerToast — Estilo tooltip nativo do navegador.
 * Pequeno, sem borda arredondada excessiva, com margem do canto, 20% menor.
 */

interface ToastItem {
  el: HTMLDivElement
  timerId: number
  persistent: boolean
  id: string
}

export class CornerToast {
  private container: HTMLDivElement | null = null
  private toasts: ToastItem[] = []
  private readonly MAX_STACK = 2

  constructor() {
    this.injectStyle()
    this.createContainer()
  }

  private injectStyle(): void {
    if (document.getElementById('__eqdt_style__')) return
    const s = document.createElement('style')
    s.id = '__eqdt_style__'
    s.textContent = `
      @keyframes __eqdt_in__ {
        from { opacity:0; transform:translateY(4px) scale(0.97); }
        to   { opacity:1; transform:translateY(0) scale(1); }
      }
      @keyframes __eqdt_out__ {
        from { opacity:1; transform:translateY(0) scale(1); }
        to   { opacity:0; transform:translateY(-3px) scale(0.97); }
      }
      .__eqdt_t__ {
        animation: __eqdt_in__ 0.14s ease forwards;
      }
      .__eqdt_t_out__ {
        animation: __eqdt_out__ 0.22s ease forwards;
        pointer-events: none;
      }
    `
    document.documentElement.appendChild(s)
  }

  private createContainer(): void {
    this.container = document.createElement('div')
    this.container.id = '__eqdiscrete_toasts__'
    Object.assign(this.container.style, {
      position: 'fixed',
      bottom: '20px',      // margem do canto
      right: '20px',       // margem do canto
      zIndex: '2147483645',
      display: 'flex',
      flexDirection: 'column-reverse',
      gap: '3px',
      pointerEvents: 'none',
      alignItems: 'flex-end',
    })
    document.documentElement.appendChild(this.container)
  }

  private makeEl(text: string): HTMLDivElement {
    // Detecta tema
    const isDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches ||
      document.documentElement.classList.contains('dark') ||
      document.body.classList.contains('dark') ||
      document.documentElement.getAttribute('data-theme') === 'dark'

    const el = document.createElement('div')
    el.className = '__eqdt_t__'

    // Estilo idêntico ao tooltip nativo do Chrome/Edge:
    // fundo escuro quase preto, texto branco, bordas mínimas, fonte pequena system-ui
    Object.assign(el.style, {
      background: isDark ? 'rgba(40,40,40,0.97)' : 'rgba(33,33,33,0.95)',
      color: '#ffffff',
      borderRadius: '2px',
      padding: '3px 7px',          // ~20% menor que antes
      fontSize: '10.5px',           // ~20% menor
      fontFamily: 'system-ui,-apple-system,"Segoe UI",sans-serif',
      fontWeight: '400',
      lineHeight: '1.4',
      letterSpacing: '0.01em',
      whiteSpace: 'nowrap',
      maxWidth: '180px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      userSelect: 'none',
      boxShadow: '0 1px 3px rgba(0,0,0,0.35)',
      // SEM backdropFilter — tooltip nativo não tem
    })
    el.textContent = text
    return el
  }

  show(text: string, lifetimeMs = 3000, persistent = false): string {
    if (!this.container) return ''

    // Limita stack
    while (this.toasts.length >= this.MAX_STACK) {
      const oldest = this.toasts.shift()
      if (oldest) {
        clearTimeout(oldest.timerId)
        this.removeEl(oldest.el, true)
      }
    }

    const id = `t_${Date.now()}_${Math.random().toString(36).slice(2,6)}`
    const el = this.makeEl(text)
    el.setAttribute('data-tid', id)
    this.container.appendChild(el)

    const item: ToastItem = { el, timerId: 0, persistent, id }

    if (!persistent) {
      item.timerId = window.setTimeout(() => this.removeByEl(el), lifetimeMs)
    }

    this.toasts.push(item)
    return id
  }

  dismiss(id: string): void {
    const idx = this.toasts.findIndex(t => t.id === id)
    if (idx === -1) return
    const item = this.toasts[idx]
    clearTimeout(item.timerId)
    this.removeEl(item.el, false)
    this.toasts.splice(idx, 1)
  }

  dismissAll(): void {
    for (const t of [...this.toasts]) {
      clearTimeout(t.timerId)
      t.el.remove()
    }
    this.toasts = []
  }

  replace(id: string, newText: string): string {
    this.dismiss(id)
    return this.persist(newText)
  }

  flash(text: string, ms = 3000): void { this.show(text, ms) }

  persist(text: string): string { return this.show(text, 0, true) }

  private removeByEl(el: HTMLDivElement): void {
    const idx = this.toasts.findIndex(t => t.el === el)
    if (idx !== -1) this.toasts.splice(idx, 1)
    this.removeEl(el, false)
  }

  private removeEl(el: HTMLDivElement, immediate: boolean): void {
    if (immediate) { el.remove(); return }
    el.classList.remove('__eqdt_t__')
    el.classList.add('__eqdt_t_out__')
    setTimeout(() => el.remove(), 240)
  }

  destroy(): void {
    this.dismissAll()
    this.container?.remove()
    this.container = null
    document.getElementById('__eqdt_style__')?.remove()
  }
}
