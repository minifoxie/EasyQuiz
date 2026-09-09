/**
 * CornerToast — Colado no canto, substituição (não acumulação), 9.5px.
 */

export class CornerToast {
  private container: HTMLDivElement | null = null
  private currentEl: HTMLDivElement | null = null
  private currentTimer: number | null = null
  private currentPersistId: string | null = null
  private lastText = ''

  constructor() {
    this.injectStyle()
    this.createContainer()
  }

  private injectStyle(): void {
    if (document.getElementById('__eqdt_style__')) return
    const s = document.createElement('style')
    s.id = '__eqdt_style__'
    s.textContent = `
      @keyframes __eqdt_in__  { from{opacity:0} to{opacity:1} }
      @keyframes __eqdt_out__ { from{opacity:1} to{opacity:0} }
      .__eqdt_in__  { animation: __eqdt_in__  0.1s ease forwards; }
      .__eqdt_out__ { animation: __eqdt_out__ 0.18s ease forwards; }
    `
    document.documentElement.appendChild(s)
  }

  private createContainer(): void {
    this.container = document.createElement('div')
    this.container.id = '__eqdiscrete_toasts__'
    Object.assign(this.container.style, {
      position: 'fixed',
      bottom: '0',      // colado no canto
      right: '0',       // colado no canto
      zIndex: '2147483645',
      pointerEvents: 'none',
    })
    document.documentElement.appendChild(this.container)
  }

  private makeEl(text: string): HTMLDivElement {
    const el = document.createElement('div')
    el.className = '__eqdt_in__'
    Object.assign(el.style, {
      background: 'rgba(30,30,30,0.96)',
      color: '#ffffff',
      borderRadius: '0',          // colado — sem bordas arredondadas no canto
      borderTopLeftRadius: '3px', // só leve no canto oposto
      padding: '2px 6px',         // 10% menor
      fontSize: '9.5px',          // 10% menor
      fontFamily: 'system-ui,-apple-system,"Segoe UI",sans-serif',
      fontWeight: '400',
      lineHeight: '1.4',
      whiteSpace: 'nowrap',
      maxWidth: '170px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      userSelect: 'none',
      display: 'block',
      boxShadow: 'none',
    })
    el.textContent = text
    return el
  }

  /** Exibe texto (substitui o atual). Retorna ID para dismiss() */
  show(text: string, ms = 3000, persistent = false): string {
    this.lastText = text
    this.clearCurrent(true) // remove imediatamente sem animação

    if (!this.container) return ''
    const el = this.makeEl(text)
    this.container.appendChild(el)
    this.currentEl = el

    const id = `t_${Date.now()}`
    el.setAttribute('data-tid', id)

    if (!persistent) {
      this.currentTimer = window.setTimeout(() => this.clearCurrent(false), ms)
      this.currentPersistId = null
    } else {
      this.currentPersistId = id
    }
    return id
  }

  flash(text: string, ms = 3000): void { this.show(text, ms) }

  persist(text: string): string { return this.show(text, 0, true) }

  dismiss(id: string): void {
    if (this.currentPersistId !== id) return
    this.clearCurrent(false)
    this.currentPersistId = null
  }

  dismissAll(): void { this.clearCurrent(true) }

  replace(id: string, newText: string): string {
    this.dismiss(id)
    return this.persist(newText)
  }

  /** Re-exibe o último toast por 2s (Shift+I) */
  reshow(): void {
    if (this.lastText) this.show(this.lastText, 2000)
  }

  private clearCurrent(immediate: boolean): void {
    if (this.currentTimer !== null) { clearTimeout(this.currentTimer); this.currentTimer = null }
    const el = this.currentEl
    if (!el) return
    this.currentEl = null
    this.currentPersistId = null

    if (immediate) {
      el.remove()
    } else {
      el.className = '__eqdt_out__'
      setTimeout(() => el.remove(), 200)
    }
  }

  destroy(): void {
    this.clearCurrent(true)
    this.container?.remove()
    this.container = null
    document.getElementById('__eqdt_style__')?.remove()
  }
}
