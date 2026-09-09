/**
 * PageWatcher — Hash polling simples com cooldown após disparo.
 * Evita re-disparar imediatamente após conclusão de fluxo.
 */

interface PageWatcherOpts {
  onPageAdvance: () => void
}

export class PageWatcher {
  private opts: PageWatcherOpts
  private lastUrl = ''
  private lastHash = ''
  private pollTimer: number | null = null
  private debounceTimer: number | null = null
  private cooldownUntil = 0          // timestamp — não dispara antes deste momento
  private readonly POLL_MS      = 900
  private readonly DEBOUNCE_MS  = 600
  private readonly COOLDOWN_MS  = 4000  // 4s após disparar, não reavalia

  constructor(opts: PageWatcherOpts) { this.opts = opts }

  start(): void {
    this.lastUrl  = location.href
    this.lastHash = this.contentHash()
    this.patchHistory()
    window.addEventListener('popstate', this.onUrlChange, { capture: true, passive: true })
    this.pollTimer = window.setInterval(this.poll, this.POLL_MS)
  }

  stop(): void {
    this.unpatchHistory()
    window.removeEventListener('popstate', this.onUrlChange, { capture: true })
    if (this.pollTimer)    { clearInterval(this.pollTimer);   this.pollTimer    = null }
    if (this.debounceTimer){ clearTimeout(this.debounceTimer); this.debounceTimer = null }
  }

  /** Reseta hash após a análise iniciar — evita re-disparar na mesma página */
  resetHash(): void {
    this.lastHash = this.contentHash()
    this.lastUrl  = location.href
    this.cooldownUntil = Date.now() + this.COOLDOWN_MS
  }

  // ── pushState / replaceState patch ──────────────────────────────────────

  private origPush    = history.pushState.bind(history)
  private origReplace = history.replaceState.bind(history)

  private patchHistory(): void {
    const self = this
    history.pushState    = function (...a) { self.origPush(...a);    self.onUrlChange() }
    history.replaceState = function (...a) { self.origReplace(...a); self.onUrlChange() }
  }

  private unpatchHistory(): void {
    history.pushState    = this.origPush
    history.replaceState = this.origReplace
  }

  private onUrlChange = (): void => {
    const cur = location.href
    if (cur !== this.lastUrl) {
      this.lastUrl = cur
      this.debounce()
    }
  }

  // ── Polling ──────────────────────────────────────────────────────────────

  private poll = (): void => {
    const url  = location.href
    const hash = this.contentHash()

    const urlChanged  = url !== this.lastUrl
    const hashChanged = hash !== '' && hash !== this.lastHash

    if (urlChanged || hashChanged) {
      this.lastUrl  = url
      this.lastHash = hash
      this.debounce()
    }
  }

  // ── Hash do conteúdo visível ─────────────────────────────────────────────

  private contentHash(): string {
    try {
      const scope = document.querySelector(
        '[role="main"],main,form,article,.question,#content,body'
      ) ?? document.body
      const text = (scope as HTMLElement).innerText?.slice(0, 600) ?? ''
      if (text.length < 30) return ''
      let h = 0
      for (let i = 0; i < text.length; i++) h = (h * 31 + text.charCodeAt(i)) | 0
      return `${h}_${text.length}`
    } catch { return '' }
  }

  // ── Debounce com cooldown ────────────────────────────────────────────────

  private debounce(): void {
    if (this.debounceTimer) clearTimeout(this.debounceTimer)
    this.debounceTimer = window.setTimeout(() => {
      if (Date.now() < this.cooldownUntil) return  // ainda em cooldown
      this.lastHash = this.contentHash()
      this.cooldownUntil = Date.now() + this.COOLDOWN_MS
      this.opts.onPageAdvance()
    }, this.DEBOUNCE_MS)
  }
}
