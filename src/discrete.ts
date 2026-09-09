/**
 * EasyQuiz Modo Discreto — Entry Point v2
 *
 * Atalhos:
 *  Alt+Q / Shift+Q → Analisar
 *  Shift+M          → Seletor de modelo
 *  Shift+A          → Configurar chaves API
 *  Shift+Z          → Abortar fluxo
 *  Shift+R          → Re-analisar
 *  Shift+H          → Status rápido
 *  Shift+I          → Re-exibir último toast
 *  Shift+C          → Paleta de comandos
 *  Escape           → Fechar menus
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
    l.rel = 'preconnect'
    l.href = 'https://generativelanguage.googleapis.com'
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

  const coin      = new CoinCursor()
  const toast     = new CornerToast()
  const highlight = new StealthHighlight()
  const applicator = new DemandApplicator(coin, toast, highlight)
  const modelMenu  = new ModelMenu({ onModelChange: () => { toast.flash('Modelo OK') } })
  const keyMenu    = new KeyMenu(coin, toast)
  const cmdMenu    = new CommandMenu()

  const pageWatcher = new PageWatcher({
    onPageAdvance: () => {
      if (!applicator.isActive()) void doAnalyze(true)
    },
  })
  pageWatcher.start()

  let currentAbort: AbortController | null = null

  // Descobre modelos em background
  const s0 = loadSettings()
  if (s0.apiKey) fetchAvailableModels(s0.apiKey).catch(() => {})

  toast.flash('EQ Ativo')

  // ── Análise ────────────────────────────────────────────────────────────

  async function doAnalyze(proactive = false): Promise<void> {
    if (currentAbort) { try { currentAbort.abort() } catch {} currentAbort = null }
    if (applicator.isActive()) applicator.abort()

    const settings = loadSettings()
    if (!settings.apiKey) {
      toast.flash('Config: Shift+A')
      coin.flashError(2000)
      return
    }

    currentAbort = new AbortController()
    const signal = currentAbort.signal

    coin.setState('loading')
    toast.flash(proactive ? 'Pré-análise' : 'Analisando')

    try {
      let ctx = captureCurrentContext(false)
      if (!ctx) ctx = captureFullPageText()
      if (!ctx) {
        coin.setState('idle'); toast.flash('Sem conteúdo')
        return
      }

      const images = await captureImages(ctx.scope, settings.useVision)

      const result = await analyzeWithGemini(
        ctx, images, settings,
        undefined, signal,
        { systemPromptOverride: DISCRETE_FULL_SYSTEM }
      )

      if (signal.aborted) return

      coin.setState('idle')
      const plan = result.plan as AnalysisPlan & { interactionFlow?: unknown }

      if (plan.memoryToStore) addSessionMemory(plan.memoryToStore)

      if (plan.pageType === 'conclusion') { toast.flash('Sessão encerrada'); return }

      const flow = normalizeFlow(
        plan.interactionFlow,
        (plan.actions || []) as Record<string, unknown>[]
      )

      if (plan.pageType === 'info' || plan.pageType === 'start') {
        coin.flashOk(1500)
        toast.flash('Avançar')
        if (flow.length > 0) applicator.start(flow)
        return
      }

      if (!flow.length) {
        toast.flash('Sem fluxo')
        coin.flashError(1500)
        return
      }

      const first = flow[0]
      toast.flash(first.hint || 'Pronto')
      if (first.customMsg) setTimeout(() => toast.flash(first.customMsg!), 1500)
      applicator.start(flow)

    } catch (e) {
      if (signal.aborted) return
      coin.setState('idle')
      const m = e instanceof Error ? e.message : ''
      if (m.includes('403') || m.includes('API key') || m.includes('inválida')) toast.flash('Acesso negado')
      else if (m.includes('429') || m.includes('Quota')) toast.flash('Limite atingido')
      else toast.flash('Erro conexão')
      coin.flashError()
    } finally {
      if (currentAbort?.signal === signal) currentAbort = null
    }
  }

  // ── Paleta de Comandos ──────────────────────────────────────────────────

  const COMMANDS = [
    { keys: 'Alt+Q',   label: 'Analisar página',    action: () => void doAnalyze()         },
    { keys: 'Shift+Q', label: 'Analisar página',    action: () => void doAnalyze()         },
    { keys: 'Shift+M', label: 'Trocar modelo',      action: () => modelMenu.isOpen() ? modelMenu.close() : modelMenu.open() },
    { keys: 'Shift+A', label: 'Config API keys',    action: () => keyMenu.isOpen()   ? keyMenu.close()   : keyMenu.open()   },
    { keys: 'Shift+Z', label: 'Abortar fluxo',      action: () => applicator.isActive() ? applicator.abort() : toast.flash('Nada ativo') },
    { keys: 'Shift+R', label: 'Re-analisar',        action: () => void doAnalyze()         },
    { keys: 'Shift+H', label: 'Ver status',         action: showStatus                     },
    { keys: 'Shift+I', label: 'Último aviso',       action: () => toast.reshow()           },
    { keys: 'Shift+C', label: 'Comandos',           action: () => cmdMenu.isOpen() ? cmdMenu.close() : cmdMenu.open() },
    { keys: 'Escape',  label: 'Fechar menus',       action: closeAllMenus                  },
  ]

  cmdMenu.setCommands(COMMANDS)

  function showStatus(): void {
    if (applicator.isActive()) {
      const cur  = applicator.getCurrentStep() + 1
      const tot  = applicator.getTotalSteps()
      const mode = applicator.getState() === 'waiting_key' ? 'Tecla' : 'Mouse'
      toast.flash(`${cur}/${tot} — ${mode}`)
    } else {
      const s = loadSettings()
      const short = s.model.replace('gemini-','').replace('-flash','F').replace('-lite','L').replace('-preview','P')
      toast.flash(`Pronto — ${short}`)
    }
  }

  function closeAllMenus(): void {
    if (modelMenu.isOpen()) modelMenu.close()
    if (keyMenu.isOpen())   keyMenu.close()
    if (cmdMenu.isOpen())   cmdMenu.close()
  }

  // ── Listener Global ─────────────────────────────────────────────────────

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
      e.preventDefault(); e.stopPropagation()
      void doAnalyze(); return
    }
    if (e.shiftKey && k === 'H') {
      e.preventDefault(); e.stopPropagation()
      showStatus(); return
    }
    if (e.shiftKey && k === 'I') {
      e.preventDefault(); e.stopPropagation()
      toast.reshow(); return
    }
    if (e.shiftKey && k === 'C') {
      e.preventDefault(); e.stopPropagation()
      cmdMenu.isOpen() ? cmdMenu.close() : cmdMenu.open(); return
    }
    if (k === 'Escape') {
      if (modelMenu.isOpen() || keyMenu.isOpen() || cmdMenu.isOpen()) {
        e.stopPropagation(); e.preventDefault()
        closeAllMenus()
      }
    }
  }

  window.addEventListener('keydown', onKey, { capture: true })

  window.__eqdiscrete = {
    analyze: () => doAnalyze(),
    destroy: () => {
      window.removeEventListener('keydown', onKey, { capture: true })
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
