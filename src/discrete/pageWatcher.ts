/**
 * PageWatcher — Detecção robusta de avanço de página.
 * Usa: URL hash/pathname change, MutationObserver no body,
 * e fallback por polling de conteúdo relevante.
 */

interface PageWatcherOpts {
  onPageAdvance: () => void
}

export class PageWatcher {
  private opts: PageWatcherOpts
  private lastUrl = ''
  private lastContentHash = ''
  private mutationObserver: MutationObserver | null = null
  private pollTimer: number | null = null
  private debounceTimer: number | null = null
  private readonly DEBOUNCE_MS = 600
  private readonly POLL_MS = 1800

  constructor(opts: PageWatcherOpts) {
    this.opts = opts
  }

  start(): void {
    this.lastUrl         = location.href
    this.lastContentHash = this.hashContent()

    // 1. Popstate (back/forward, SPA router)
    window.addEventListener('popstate', this.onUrlChange, { capture: true })

    // 2. Intercepta pushState / replaceState
    this.patchHistory()

    // 3. MutationObserver no body — detecta troca de questão via DOM
    this.mutationObserver = new MutationObserver(this.onMutation)
    this.mutationObserver.observe(document.body ?? document.documentElement, {
      childList: true,
      subtree: true,
      attributes: false,
      characterData: false,
    })

    // 4. Polling de fallback — captura casos que o observer perde
    this.pollTimer = window.setInterval(this.onPoll, this.POLL_MS)
  }

  stop(): void {
    window.removeEventListener('popstate', this.onUrlChange, { capture: true })
    this.mutationObserver?.disconnect()
    this.mutationObserver = null
    if (this.pollTimer)    { clearInterval(this.pollTimer);   this.pollTimer    = null }
    if (this.debounceTimer){ clearTimeout(this.debounceTimer); this.debounceTimer = null }
    this.unpatchHistory()
  }

  // ─── URL change ──────────────────────────────────────────────────────────

  private onUrlChange = (): void => {
    const cur = location.href
    if (cur !== this.lastUrl) {
      this.lastUrl = cur
      this.debounce()
    }
  }

  // ─── pushState/replaceState patch ────────────────────────────────────────

  private origPush    = history.pushState.bind(history)
  private origReplace = history.replaceState.bind(history)

  private patchHistory(): void {
    const self = this
    history.pushState = function (...args) {
      self.origPush(...args)
      self.onUrlChange()
    }
    history.replaceState = function (...args) {
      self.origReplace(...args)
      self.onUrlChange()
    }
  }

  private unpatchHistory(): void {
    history.pushState    = this.origPush
    history.replaceState = this.origReplace
  }

  // ─── MutationObserver ────────────────────────────────────────────────────

  private mutationCount = 0
  private onMutation = (records: MutationRecord[]): void => {
    // Filtra mutações triviais (tooltips, animações, etc.)
    let significant = 0
    for (const r of records) {
      if (r.addedNodes.length === 0 && r.removedNodes.length === 0) continue
      for (const n of [...r.addedNodes, ...r.removedNodes]) {
        if (n instanceof HTMLElement) {
          // Ignora containers EQ e elementos muito pequenos
          if (n.id?.startsWith('__eq') || n.className?.includes?.('__eq')) continue
          significant++
          if (significant >= 3) break
        }
      }
      if (significant >= 3) break
    }

    if (significant < 3) return

    this.mutationCount++
    // Só dispara se acumular mudanças suficientes no debounce
    this.debounce()
  }

  // ─── Polling ─────────────────────────────────────────────────────────────

  private onPoll = (): void => {
    const cur = location.href
    if (cur !== this.lastUrl) {
      this.lastUrl = cur
      this.debounce()
      return
    }

    // Detecta mudança de conteúdo relevante (texto da questão)
    const hash = this.hashContent()
    if (hash && hash !== this.lastContentHash && hash.length > 20) {
      this.lastContentHash = hash
      this.debounce()
    }
  }

  // ─── Hash de conteúdo ────────────────────────────────────────────────────

  private hashContent(): string {
    try {
      // Pega os primeiros 500 chars de texto visível relevante
      const scope = document.querySelector(
        'main, [role="main"], form, article, .question, .quiz, #content, body'
      )
      const text = (scope ?? document.body)?.innerText?.slice(0, 500) ?? ''
      // Hash simples: soma dos char codes
      let h = 0
      for (let i = 0; i < text.length; i++) h = (h * 31 + text.charCodeAt(i)) | 0
      return `${h}_${text.length}`
    } catch { return '' }
  }

  // ─── Debounce ────────────────────────────────────────────────────────────

  private debounce(): void {
    if (this.debounceTimer) { clearTimeout(this.debounceTimer) }
    this.debounceTimer = window.setTimeout(() => {
      this.lastContentHash = this.hashContent()
      this.opts.onPageAdvance()
    }, this.DEBOUNCE_MS)
  }
}
