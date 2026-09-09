/**
 * PageWatcher — Detecta avanço de página (SPA ou multi-page) e dispara callback.
 * Usa MutationObserver + hashchange + popstate + botões de navegação.
 */

export interface PageWatcherCallbacks {
  onPageAdvance: () => void
}

const ADVANCE_BTN_PATTERN = /pr[oó]xim|avan[cç]|continu|verific|enviar|submit|confirm|checar|validar|next|check|ir para/i

export class PageWatcher {
  private observer: MutationObserver | null = null
  private mutationTimer: number | null = null
  private callbacks: PageWatcherCallbacks
  private lastUrl = location.href
  private lastContentHash = ''
  private active = false

  constructor(callbacks: PageWatcherCallbacks) {
    this.callbacks = callbacks
  }

  start(): void {
    if (this.active) return
    this.active = true
    this.lastUrl = location.href
    this.lastContentHash = this.contentHash()

    // Detecta botões de navegação clicados pelo usuário
    document.addEventListener('click', this.onDocClick, { capture: true, passive: true })

    // Detecta navegação SPA por URL
    window.addEventListener('popstate', this.onUrlChange)
    window.addEventListener('hashchange', this.onUrlChange)

    // MutationObserver para detectar troca de conteúdo significativa
    this.observer = new MutationObserver(() => {
      if (!this.active) return
      if (this.mutationTimer) clearTimeout(this.mutationTimer)
      this.mutationTimer = window.setTimeout(() => {
        this.mutationTimer = null
        this.checkContentChange()
      }, 300)
    })

    this.observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: false,
      attributes: false,
    })
  }

  stop(): void {
    this.active = false
    document.removeEventListener('click', this.onDocClick, { capture: true })
    window.removeEventListener('popstate', this.onUrlChange)
    window.removeEventListener('hashchange', this.onUrlChange)
    if (this.mutationTimer) clearTimeout(this.mutationTimer)
    this.observer?.disconnect()
    this.observer = null
  }

  private onDocClick = (e: MouseEvent) => {
    if (!this.active) return
    const target = e.target as HTMLElement | null
    if (!target) return

    const btn = target.closest('button, [role="button"], a, input[type="submit"], input[type="button"]') as HTMLElement | null
    if (!btn) return

    const text = (btn.textContent || (btn as HTMLInputElement).value || btn.getAttribute('aria-label') || '').trim()
    if (ADVANCE_BTN_PATTERN.test(text)) {
      // Pequeno delay para a página começar a mudar antes do callback
      setTimeout(() => {
        if (this.active) this.callbacks.onPageAdvance()
      }, 150)
    }
  }

  private onUrlChange = () => {
    if (!this.active) return
    if (location.href !== this.lastUrl) {
      this.lastUrl = location.href
      setTimeout(() => {
        if (this.active) this.callbacks.onPageAdvance()
      }, 200)
    }
  }

  private checkContentChange(): void {
    if (!this.active) return

    // Só dispara se a URL mudou ou se houve mudança substancial no DOM de questão
    const newHash = this.contentHash()
    if (newHash !== this.lastContentHash) {
      this.lastContentHash = newHash
      // Verifica se a mudança sugere nova questão (controls ou texto diferentes)
      const hasControls = document.querySelectorAll(
        'input[type="radio"], input[type="checkbox"], select, [role="radio"], [role="checkbox"]'
      ).length
      if (hasControls > 0) {
        // Pode ser nova questão carregada via SPA sem mudança de URL
        // Não dispara aqui — o DemandApplicator lida com isso via polling
      }
    }
  }

  private contentHash(): string {
    // Hash simplificado: número de controles + comprimento do texto visível principal
    try {
      const controls = document.querySelectorAll(
        'input[type="radio"],input[type="checkbox"],[role="radio"],[role="checkbox"],select'
      ).length
      const text = (document.body.textContent || '').trim().slice(0, 300)
      return `${controls}:${text.length}:${text.slice(0, 60)}`
    } catch {
      return ''
    }
  }
}
