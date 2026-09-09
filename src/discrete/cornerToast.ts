/**
 * CornerToast — Mensagens discretas no canto inferior direito da tela.
 * Texto técnico disfar­çado, auto-desaparece, até 2 simultâneos.
 */

interface ToastItem {
  el: HTMLDivElement
  timerId: number
}

export class CornerToast {
  private container: HTMLDivElement | null = null
  private toasts: ToastItem[] = []
  private readonly MAX_STACK = 2

  constructor() {
    this.createContainer()
  }

  private createContainer(): void {
    this.container = document.createElement('div')
    this.container.id = '__eqdiscrete_toasts__'
    Object.assign(this.container.style, {
      position: 'fixed',
      bottom: '12px',
      right: '12px',
      zIndex: '2147483645',
      display: 'flex',
      flexDirection: 'column-reverse',
      gap: '4px',
      pointerEvents: 'none',
      fontFamily: "'SF Mono','Fira Code','Consolas',monospace",
    })
    this.injectStyle()
    document.documentElement.appendChild(this.container)
  }

  private injectStyle(): void {
    if (document.getElementById('__eqdiscrete_toast_style__')) return
    const style = document.createElement('style')
    style.id = '__eqdiscrete_toast_style__'
    style.textContent = `
      @keyframes __eqdt_in__ {
        from { opacity:0; transform:translateY(6px); }
        to   { opacity:1; transform:translateY(0); }
      }
      @keyframes __eqdt_out__ {
        from { opacity:1; transform:translateY(0); }
        to   { opacity:0; transform:translateY(-4px); }
      }
      .__eqdt_toast__ {
        animation: __eqdt_in__ 0.2s ease forwards;
      }
      .__eqdt_toast_out__ {
        animation: __eqdt_out__ 0.35s ease forwards;
      }
    `
    document.documentElement.appendChild(style)
  }

  private makeToastEl(text: string, persistent: boolean): HTMLDivElement {
    const isDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches ||
      document.documentElement.classList.contains('dark') ||
      document.body.classList.contains('dark') ||
      document.body.classList.contains('dark-mode') ||
      (document.documentElement.getAttribute('data-theme') === 'dark')

    const el = document.createElement('div')
    el.className = '__eqdt_toast__'
    Object.assign(el.style, {
      background: isDark ? 'rgba(20,20,20,0.88)' : 'rgba(255,255,255,0.92)',
      color: isDark ? '#c8c8c8' : '#333',
      border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
      borderRadius: '4px',
      padding: '3px 8px',
      fontSize: '11px',
      fontWeight: '500',
      letterSpacing: '0.01em',
      lineHeight: '1.5',
      maxWidth: '200px',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      backdropFilter: 'blur(4px)',
      boxShadow: isDark ? '0 1px 4px rgba(0,0,0,0.5)' : '0 1px 4px rgba(0,0,0,0.15)',
      userSelect: 'none',
      cursor: persistent ? 'default' : 'default',
    })
    el.textContent = text
    return el
  }

  /** Exibe um toast. Se persistent=true, não desaparece até dismiss() ser chamado. */
  show(text: string, lifetimeMs = 3000, persistent = false): string {
    if (!this.container) return ''

    // Limita stack a MAX_STACK
    while (this.toasts.length >= this.MAX_STACK) {
      const oldest = this.toasts.shift()
      if (oldest) {
        clearTimeout(oldest.timerId)
        oldest.el.remove()
      }
    }

    const el = this.makeToastEl(text, persistent)
    this.container.appendChild(el)

    const id = `toast_${Date.now()}_${Math.random()}`
    let timerId: number

    if (persistent) {
      timerId = 0
      el.setAttribute('data-toast-id', id)
    } else {
      timerId = window.setTimeout(() => {
        this.removeEl(el)
      }, lifetimeMs)
    }

    this.toasts.push({ el, timerId })
    return id
  }

  /** Remove um toast persistente pelo ID retornado em show() */
  dismiss(id: string): void {
    const idx = this.toasts.findIndex(t => t.el.getAttribute('data-toast-id') === id)
    if (idx === -1) return
    const item = this.toasts[idx]
    clearTimeout(item.timerId)
    this.removeEl(item.el)
    this.toasts.splice(idx, 1)
  }

  /** Remove o toast persistente mais antigo (útil para substituir mensagem de status) */
  dismissAll(): void {
    this.toasts.forEach(t => {
      clearTimeout(t.timerId)
      t.el.remove()
    })
    this.toasts = []
  }

  private removeEl(el: HTMLDivElement): void {
    el.classList.remove('__eqdt_toast__')
    el.classList.add('__eqdt_toast_out__')
    setTimeout(() => el.remove(), 380)
    const idx = this.toasts.findIndex(t => t.el === el)
    if (idx !== -1) this.toasts.splice(idx, 1)
  }

  /** Exibe toast rápido (3s) */
  flash(text: string): void {
    this.show(text, 3000)
  }

  /** Exibe toast que persiste e retorna o ID para dismiss() */
  persist(text: string): string {
    return this.show(text, 0, true)
  }

  /** Substitui um toast persistente por outro texto */
  replace(id: string, newText: string): string {
    this.dismiss(id)
    return this.persist(newText)
  }

  destroy(): void {
    this.dismissAll()
    this.container?.remove()
    this.container = null
  }
}
