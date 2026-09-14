/**
 * CornerToast — Colado no canto, substituição (não acumulação), 9.5px.
 */

export class CornerToast {
  private container: HTMLDivElement | null = null
  private items: Array<{ el: HTMLDivElement; timer: number | null; id: string; text: string }> = []
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
      @keyframes __eqdt_in__  { from{opacity:0; transform:translateY(8px) scale(.98)} to{opacity:1; transform:translateY(0) scale(1)} }
      @keyframes __eqdt_out__ { from{opacity:1; transform:translateY(0) scale(1)} to{opacity:0; transform:translateY(8px) scale(.98)} }
      .__eqdt_in__  { animation: __eqdt_in__  0.18s ease forwards; }
      .__eqdt_out__ { animation: __eqdt_out__ 0.18s ease forwards; }
    `
    document.documentElement.appendChild(s)
  }

  private createContainer(): void {
    this.container = document.createElement('div')
    this.container.id = '__eqdiscrete_toasts__'
    Object.assign(this.container.style, {
      position: 'fixed',
      left: '16px',
      bottom: '16px',
      zIndex: '2147483645',
      pointerEvents: 'none',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      alignItems: 'flex-start',
    })
    document.documentElement.appendChild(this.container)
  }

  private makeEl(text: string): HTMLDivElement {
    const el = document.createElement('div')
    el.className = '__eqdt_in__'
    Object.assign(el.style, {
      background: 'rgba(21,21,21,0.78)',
      color: '#ffffff',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: '0',
      padding: '8px 10px',
      fontSize: '11px',
      fontFamily: 'system-ui,-apple-system,"Segoe UI",sans-serif',
      fontWeight: '600',
      lineHeight: '1.35',
      whiteSpace: 'normal',
      maxWidth: '260px',
      overflow: 'hidden',
      userSelect: 'none',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      boxShadow: '0 12px 28px rgba(0,0,0,0.25)',
      backdropFilter: 'blur(18px) saturate(160%)',
      WebkitBackdropFilter: 'blur(18px) saturate(160%)',
    })
    el.textContent = text
    return el
  }

  show(text: string, ms = 3000, persistent = false): string {
    this.lastText = text
    if (!this.container) return ''

    const id = `t_${Date.now()}_${Math.random().toString(16).slice(2)}`
    const el = this.makeEl(text)
    el.setAttribute('data-tid', id)

    const item = { el, timer: null as number | null, id, text }

    if (!persistent) {
      item.timer = window.setTimeout(() => this.clearItem(id), ms)
    } else {
      this.currentPersistId = id
    }

    this.items.push(item)
    this.container.appendChild(el)
    this.reflowStack()
    return id
  }

  flash(text: string, ms = 3000): void { this.show(text, ms) }
  persist(text: string): string { return this.show(text, 0, true) }

  dismiss(id: string): void {
    if (this.currentPersistId === id) this.currentPersistId = null
    this.clearItem(id)
  }

  dismissAll(): void { while (this.items.length) this.clearItem(this.items[0].id, true) }

  replace(id: string, newText: string): string {
    this.dismiss(id)
    return this.persist(newText)
  }

  reshow(): void {
    if (this.lastText) this.show(this.lastText, 2000)
  }

  private reflowStack(): void {
    if (!this.container) return
    const childNodes = Array.from(this.container.children) as HTMLDivElement[]
    childNodes.forEach((node, index) => {
      node.style.transform = `translateY(${index * 0}px)`
      node.style.opacity = '1'
    })
  }

  private clearItem(id: string, immediate = false): void {
    const idx = this.items.findIndex((item) => item.id === id)
    if (idx === -1) return
    const item = this.items[idx]
    if (item.timer !== null) { clearTimeout(item.timer); item.timer = null }
    this.items.splice(idx, 1)

    if (immediate) {
      item.el.remove()
      return
    }

    item.el.className = '__eqdt_out__'
    setTimeout(() => item.el.remove(), 180)
  }

  destroy(): void {
    this.dismissAll()
    this.container?.remove()
    this.container = null
    document.getElementById('__eqdt_style__')?.remove()
  }
}
