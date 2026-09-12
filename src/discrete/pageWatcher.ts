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

import { captureCurrentContext, captureFullPageText, createContentSignature } from '../dom/detector'

interface PageWatcherOpts {
  onPageAdvance: () => boolean | void
}

export class PageWatcher {
  private opts: PageWatcherOpts
  private lastSignature = ''
  private pollTimer: number | null = null
  private debounceTimer: number | null = null
  private cooldownUntil = 0
  private readonly POLL_MS     = 180
  private readonly DEBOUNCE_MS = 60
  private readonly COOLDOWN_MS = 150

  private origPush    = typeof history !== 'undefined' ? history.pushState.bind(history) : null
  private origReplace = typeof history !== 'undefined' ? history.replaceState.bind(history) : null

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
    if (typeof history === 'undefined') return
    const self = this
    history.pushState    = function (...a) { self.origPush?.(...a);    self.onUrlChange() }
    history.replaceState = function (...a) { self.origReplace?.(...a); self.onUrlChange() }
  }

  private unpatchHistory(): void {
    if (typeof history === 'undefined' || !this.origPush || !this.origReplace) return
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
      const ctx = captureCurrentContext(false) || captureFullPageText()
      if (ctx && ctx.questionText) {
        return createContentSignature(ctx)
      }
      return `${location.href}|${document.title}|${(document.body?.innerText || '').slice(0, 300)}`
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
        const ok = this.opts.onPageAdvance()
        if (ok !== false) {
          this.lastSignature = curSig
          this.cooldownUntil = Date.now() + this.COOLDOWN_MS
        }
      }
    }, waitMs)
  }
}
