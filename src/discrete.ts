/**
 * EasyQuiz Modo Discreto — Entry Point v3
 * Auto-retry em falhas, detecção robusta de mudança de página.
 */

import { analyzeWithGemini, fetchAvailableModels } from './core/gemini'
import { loadSettings, addSessionMemory, resetActivityMetrics } from './core/storage'
import { captureCurrentContext, captureFullPageText } from './dom/detector'
import { captureImages } from './media/capture'
import { setupSmartOptionInterceptors } from './dom/executor'
import { SYSTEM_PROMPT } from './core/prompt'

import { CoinCursor } from './discrete/coinCursor'
import { CornerToast } from './discrete/cornerToast'
import { ModelMenu } from './discrete/modelMenu'
import { KeyMenu } from './discrete/keyMenu'
import { StealthHighlight } from './discrete/stealthHighlight'
import { PageWatcher } from './discrete/pageWatcher'
import { DemandApplicator } from './discrete/demandApplicator'
import { CommandMenu } from './discrete/commandMenu'
import { DISCRETE_SYSTEM_SUFFIX, normalizeFlow } from './discrete/promptDiscrete'
import type { AnalysisPlan } from './core/types'

declare global {
  interface Window {
    __eqdiscrete?: { destroy: () => void; analyze: () => Promise<void> }
  }
}

if (window.__eqdiscrete) {
  window.__eqdiscrete.analyze()
} else {
  void initDiscrete()
}

function injectPreconnect(): void {
  try {
    if (document.querySelector('link[data-eqdiscrete-preconnect]')) return
    const l = document.createElement('link')
    l.rel = 'preconnect'; l.href = 'https://generativelanguage.googleapis.com'
    l.crossOrigin = 'anonymous'
    l.setAttribute('data-eqdiscrete-preconnect', 'true')
    document.head?.appendChild(l)
  } catch {}
}

const DISCRETE_FULL_SYSTEM = SYSTEM_PROMPT + DISCRETE_SYSTEM_SUFFIX

async function initDiscrete(): Promise<void> {
  setupSmartOptionInterceptors()
  injectPreconnect()
  resetActivityMetrics()

  const coin       = new CoinCursor()
  const toast      = new CornerToast()
  const highlight  = new StealthHighlight()
  const applicator = new DemandApplicator(coin, toast, highlight)
  const modelMenu  = new ModelMenu({ onModelChange: () => toast.flash('Modelo OK') })
  const keyMenu    = new KeyMenu(coin, toast)
  const cmdMenu    = new CommandMenu()

  // Estado de análise
  let currentAbort: AbortController | null = null
  let analyzing = false
  let retryTimer: number | null = null

  const pageWatcher = new PageWatcher({
    onPageAdvance: () => {
      // Não interrompe fluxo ativo já em andamento
      if (applicator.isActive()) return
      // Não dispara se já está analisando
      if (analyzing) return
      void doAnalyze(true)
    },
  })
  pageWatcher.start()

  const s0 = loadSettings()
  if (s0.apiKey) fetchAvailableModels(s0.apiKey).catch(() => {})

  toast.flash('EQ Ativo')

  // ── Análise com retry persistente ────────────────────────────────────────

  let retryCount = 0
  const RETRY_DELAYS = [1500, 3000, 5000, 8000]  // backoff até 8s

  async function doAnalyze(proactive = false, retry = 0): Promise<void> {
    if (retryTimer) { clearTimeout(retryTimer); retryTimer = null }

    // Cancela análise anterior
    if (currentAbort) { try { currentAbort.abort() } catch {} currentAbort = null }
    if (applicator.isActive()) applicator.abort()

    const settings = loadSettings()
    if (!settings.apiKey) {
      toast.flash('Config: Shift+A')
      coin.flashError(2000)
      return
    }

    analyzing = true
    retryCount = retry
    currentAbort = new AbortController()
    const signal = currentAbort.signal

    // Reset hash para não re-disparar na mesma página
    pageWatcher.resetHash()

    coin.setState('loading')
    if (!proactive || retry > 0) toast.flash(retry > 0 ? `Tentativa ${retry + 1}` : 'Analisando')

    function scheduleRetry(): void {
      const delay = RETRY_DELAYS[Math.min(retry, RETRY_DELAYS.length - 1)]
      retryTimer = window.setTimeout(() => {
        if (!applicator.isActive()) void doAnalyze(false, retry + 1)
      }, delay)
    }

    try {
      // Aguarda DOM estabilizar em scans proativos
      if (proactive) await new Promise(r => setTimeout(r, 700))
      if (signal.aborted) return

      let ctx = captureCurrentContext(false)
      if (!ctx) ctx = captureFullPageText()

      if (!ctx || !ctx.questionText?.trim()) {
        coin.setState('idle')
        if (retry === 0 && !proactive) toast.flash('Sem conteúdo')
        // Sempre retenta — talvez a página ainda esteja carregando
        scheduleRetry()
        return
      }

      const images = await captureImages(ctx.scope, settings.useVision)
      if (signal.aborted) return

      const result = await analyzeWithGemini(
        ctx, images, settings,
        undefined, signal,
        { systemPromptOverride: DISCRETE_FULL_SYSTEM }
      )

      if (signal.aborted) return

      coin.setState('idle')
      const plan = result.plan as AnalysisPlan & { interactionFlow?: unknown }

      if (plan.memoryToStore) addSessionMemory(plan.memoryToStore)

      if (plan.pageType === 'conclusion') {
        toast.flash('Sessão encerrada')
        return
      }

      const flow = normalizeFlow(
        plan.interactionFlow,
        (plan.actions || []) as Record<string, unknown>[]
      )

      if (plan.pageType === 'info' || plan.pageType === 'start') {
        coin.flashOk(1000)
        toast.flash('Avançar')
        if (flow.length > 0) applicator.start(flow)
        return
      }

      if (!flow.length) {
        // IA retornou mas sem fluxo — retenta
        scheduleRetry()
        return
      }

      // Sucesso
      retryCount = 0
      coin.flashOk(500)
      const first = flow[0]
      toast.flash(first.hint || 'Pronto')
      if (first.customMsg) setTimeout(() => toast.flash(first.customMsg!), 1400)
      applicator.start(flow)

    } catch (e) {
      if (signal.aborted) return
      coin.setState('idle')
      const m = e instanceof Error ? e.message : ''

      if (m.includes('403') || m.includes('API key') || m.includes('inválida')) {
        toast.flash('Acesso negado')
        coin.flashError()
        // Não retenta em erro de auth
        return
      }
      if (m.includes('429') || m.includes('Quota') || m.includes('RESOURCE_EXHAUSTED')) {
        toast.flash('Limite — aguarde')
        coin.flashError()
        scheduleRetry()
        return
      }
      // Qualquer outro erro: retenta silenciosamente
      coin.flashError(800)
      scheduleRetry()
    } finally {
      if (currentAbort?.signal === signal) currentAbort = null
      analyzing = false
    }
  }

  // ── Status & paleta ─────────────────────────────────────────────────────

  function showStatus(): void {
    if (analyzing) {
      toast.flash('Analisando...')
      return
    }
    if (applicator.isActive()) {
      const cur  = applicator.getCurrentStep() + 1
      const tot  = applicator.getTotalSteps()
      const mode = applicator.getState() === 'waiting_key' ? 'Tecla' : 'Mouse'
      toast.flash(`${cur}/${tot} ${mode}`)
    } else {
      const s = loadSettings()
      const short = s.model
        .replace('gemini-', '').replace('-flash', 'F')
        .replace('-lite', 'L').replace('-preview', 'P')
      toast.flash(`OK — ${short}`)
    }
  }

  function closeAll(): void {
    if (modelMenu.isOpen()) modelMenu.close()
    if (keyMenu.isOpen())   keyMenu.close()
    if (cmdMenu.isOpen())   cmdMenu.close()
  }

  const COMMANDS = [
    { keys: 'Shift+Q', label: 'Analisar página',   action: () => void doAnalyze() },
    { keys: 'Shift+M', label: 'Trocar modelo',     action: () => modelMenu.isOpen() ? modelMenu.close() : modelMenu.open() },
    { keys: 'Shift+A', label: 'Config API keys',   action: () => keyMenu.isOpen() ? keyMenu.close() : keyMenu.open() },
    { keys: 'Shift+Z', label: 'Abortar fluxo',     action: () => applicator.isActive() ? applicator.abort() : toast.flash('Nada ativo') },
    { keys: 'Shift+R', label: 'Re-analisar',       action: () => void doAnalyze() },
    { keys: 'Shift+H', label: 'Ver status',        action: showStatus },
    { keys: 'Shift+I', label: 'Último aviso',      action: () => toast.reshow() },
    { keys: 'Shift+C', label: 'Comandos',          action: () => cmdMenu.isOpen() ? cmdMenu.close() : cmdMenu.open() },
    { keys: 'Escape',  label: 'Fechar menus',      action: closeAll },
  ]
  cmdMenu.setCommands(COMMANDS)

  // ── Listener global ─────────────────────────────────────────────────────

  function onKey(e: KeyboardEvent): void {
    const k = e.key

    if ((e.altKey && (k === 'q' || k === 'Q')) || (e.shiftKey && k === 'Q')) {
      e.preventDefault(); e.stopPropagation(); void doAnalyze(); return
    }
    if (e.shiftKey && k === 'M') {
      e.preventDefault(); e.stopPropagation()
      modelMenu.isOpen() ? modelMenu.close() : modelMenu.open(); return
    }
    if (e.shiftKey && k === 'A') {
      e.preventDefault(); e.stopPropagation()
      keyMenu.isOpen() ? keyMenu.close() : keyMenu.open(); return
    }
    if (e.shiftKey && k === 'Z') {
      e.preventDefault(); e.stopPropagation()
      applicator.isActive() ? applicator.abort() : toast.flash('Nada ativo'); return
    }
    if (e.shiftKey && k === 'R') {
      e.preventDefault(); e.stopPropagation(); void doAnalyze(); return
    }
    if (e.shiftKey && k === 'H') {
      e.preventDefault(); e.stopPropagation(); showStatus(); return
    }
    if (e.shiftKey && k === 'I') {
      e.preventDefault(); e.stopPropagation(); toast.reshow(); return
    }
    if (e.shiftKey && k === 'C') {
      e.preventDefault(); e.stopPropagation()
      cmdMenu.isOpen() ? cmdMenu.close() : cmdMenu.open(); return
    }
    if (k === 'Escape' && (modelMenu.isOpen() || keyMenu.isOpen() || cmdMenu.isOpen())) {
      e.stopPropagation(); e.preventDefault(); closeAll()
    }
  }

  window.addEventListener('keydown', onKey, { capture: true })

  window.__eqdiscrete = {
    analyze: () => doAnalyze(),
    destroy: () => {
      window.removeEventListener('keydown', onKey, { capture: true })
      if (retryTimer) clearTimeout(retryTimer)
      applicator.destroy()
      modelMenu.destroy()
      keyMenu.destroy()
      cmdMenu.destroy()
      pageWatcher.stop()
      coin.destroy()
      toast.destroy()
      highlight.clearAll()
      delete window.__eqdiscrete
    },
  }
}
