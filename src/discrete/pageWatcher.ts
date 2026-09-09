/**
 * PageWatcher — Monitoramento Resiliente de Mudança de Questão/Página
 *
 * Garante que a transição entre questões seja SEMPRE detectada automaticamente:
 * 1. Assinatura estrutural composta (URL + Título + Texto da questão + Controles interativos).
 * 2. Se a mudança ocorrer durante o cooldown pós-resolução, o evento NÃO é descartado:
 *    ele é reprogramado para disparar imediatamente ao fim do cooldown.
 * 3. A assinatura anterior só é comitada quando o avanço for efetivamente notificado,
 *    eliminando qualquer risco de engolir a transição de questão.
 */

interface PageWatcherOpts {
  onPageAdvance: () => void
}

export class PageWatcher {
  private opts: PageWatcherOpts
  private lastSignature = ''
  private pollTimer: number | null = null
  private debounceTimer: number | null = null
  private cooldownUntil = 0
  private readonly POLL_MS     = 700
  private readonly DEBOUNCE_MS = 500
  private readonly COOLDOWN_MS = 2500 // Cooldown balanceado para transições rápidas

  private origPush    = history.pushState.bind(history)
  private origReplace = history.replaceState.bind(history)

  constructor(opts: PageWatcherOpts) {
    this.opts = opts
  }

  start(): void {
    this.lastSignature = this.getSignature()
    this.patchHistory()
    window.addEventListener('popstate', this.onUrlChange, { capture: true, passive: true })
    this.pollTimer = window.setInterval(this.poll, this.POLL_MS)
  }

  stop(): void {
    this.unpatchHistory()
    window.removeEventListener('popstate', this.onUrlChange, { capture: true })
    if (this.pollTimer)     { clearInterval(this.pollTimer);     this.pollTimer    = null }
    if (this.debounceTimer) { clearTimeout(this.debounceTimer);   this.debounceTimer = null }
  }

  /** Reseta a assinatura após o início de uma análise para travar na questão corrente */
  resetHash(): void {
    this.lastSignature = this.getSignature()
    this.cooldownUntil = Date.now() + this.COOLDOWN_MS
  }

  // ── pushState / replaceState patch ────────────────────────────────────────

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
    const sig = this.getSignature()
    if (sig && sig !== this.lastSignature) {
      this.debounce()
    }
  }

  // ── Polling Estrutural ───────────────────────────────────────────────────

  private poll = (): void => {
    const sig = this.getSignature()
    if (!sig) return

    if (sig !== this.lastSignature) {
      this.debounce()
    }
  }

  // ── Assinatura Estrutural da Página e Questão ─────────────────────────────

  private getSignature(): string {
    try {
      const url = location.href
      const title = document.title || ''

      // Identifica o texto principal da questão atual
      const qEl = document.querySelector(
        '.question-text, .qtext, [data-question], [class*="question" i] h2, [class*="question" i] h3, [class*="prompt" i], [role="main"], main, article'
      )
      const qText = (qEl as HTMLElement)?.innerText?.trim()?.slice(0, 300) || ''

      // Quantidade de opções e controles interativos
      const ctrlCount = document.querySelectorAll(
        'input:not([type="hidden"]), textarea, select, [role="radio"], [role="checkbox"], [role="option"], .option-card, [class*="choice" i], [class*="option" i]'
      ).length

      // Tamanho aproximado do corpo para detectar substituição completa de conteúdo
      const bodyLen = Math.round(((document.body?.innerText || '').length) / 50) * 50

      return `${url}|${title}|${qText}|${ctrlCount}|${bodyLen}`
    } catch {
      return ''
    }
  }

  // ── Debounce Resiliente (Não descarta eventos durante cooldown) ───────────

  private debounce(): void {
    if (this.debounceTimer) clearTimeout(this.debounceTimer)

    const now = Date.now()
    const waitMs = now < this.cooldownUntil
      ? Math.max(this.cooldownUntil - now + 80, this.DEBOUNCE_MS)
      : this.DEBOUNCE_MS

    this.debounceTimer = window.setTimeout(() => {
      const curSig = this.getSignature()
      if (curSig && curSig !== this.lastSignature) {
        this.lastSignature = curSig
        this.cooldownUntil = Date.now() + this.COOLDOWN_MS
        this.opts.onPageAdvance()
      }
    }, waitMs)
  }
}
