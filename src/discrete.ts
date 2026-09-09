/**
 * EasyQuiz Modo Discreto — Entry Point
 * Sistema de resolução stealth sem interface visível.
 * UI: coin cursor 18px + corner toasts no canto inferior direito.
 *
 * Reutiliza 100% do engine do modo normal:
 *  - analyzeWithGemini (multi-key wave, hedging paralelo, rate-limit, fallback de modelos)
 *  - buildUserPrompt, captureCurrentContext, captureImages
 *  - findElementExt, simulatePointerClick (executor completo)
 *  - keyManager, loadSettings, saveSettings, addSessionMemory
 *  - fetchAvailableModels, discoveredModelsCache
 *
 * Adiciona ao modo normal:
 *  - System prompt estendido com instrução de interactionFlow
 *  - Motor de aplicação por input (DemandApplicator)
 *  - UI ultra-discreta (CoinCursor + CornerToast + StealthHighlight)
 *  - Atalhos Shift+Q, Shift+M, Shift+A, Shift+Z, Shift+R, Shift+H
 *  - Context menu Chrome-like para seleção de modelo (Shift+M)
 */

import { analyzeWithGemini, fetchAvailableModels, discoveredModelsCache, AVAILABLE_MODELS } from './core/gemini'
import { buildUserPrompt } from './core/prompt'
import { loadSettings, saveSettings, addSessionMemory, resetActivityMetrics } from './core/storage'
import { captureCurrentContext, captureFullPageText } from './dom/detector'
import { captureImages } from './media/capture'
import { setupSmartOptionInterceptors } from './dom/executor'

import { CoinCursor } from './discrete/coinCursor'
import { CornerToast } from './discrete/cornerToast'
import { ModelMenu } from './discrete/modelMenu'
import { KeyMenu } from './discrete/keyMenu'
import { StealthHighlight } from './discrete/stealthHighlight'
import { PageWatcher } from './discrete/pageWatcher'
import { DemandApplicator } from './discrete/demandApplicator'
import {
  DISCRETE_SYSTEM_SUFFIX,
  normalizeFlow,
  type DiscretePlan,
} from './discrete/promptDiscrete'
import { SYSTEM_PROMPT } from './core/prompt'
import type { AnalysisPlan } from './core/types'

// ── Namespace global para evitar dupla injeção ──────────────────────────────
declare global {
  interface Window {
    __eqdiscrete?: { destroy: () => void; analyze: () => Promise<void> }
  }
}

if (window.__eqdiscrete) {
  // Segunda execução do bookmarklet: re-analisa imediatamente
  window.__eqdiscrete.analyze()
} else {
  void initDiscrete()
}

// ── Preconnect para warm-up do DNS/TLS ──────────────────────────────────────
function injectPreconnect(): void {
  try {
    if (document.querySelector('link[data-eqdiscrete-preconnect]')) return
    const link = document.createElement('link')
    link.rel = 'preconnect'
    link.href = 'https://generativelanguage.googleapis.com'
    link.crossOrigin = 'anonymous'
    link.setAttribute('data-eqdiscrete-preconnect', 'true')
    document.head?.appendChild(link)
  } catch {}
}

// ── System prompt do Modo Discreto (base + instrução de interactionFlow) ────
const DISCRETE_FULL_SYSTEM_PROMPT = SYSTEM_PROMPT + DISCRETE_SYSTEM_SUFFIX

// ── Inicialização Principal ──────────────────────────────────────────────────
async function initDiscrete(): Promise<void> {
  setupSmartOptionInterceptors()
  injectPreconnect()
  resetActivityMetrics()

  // Instancia os componentes de UI
  const coin = new CoinCursor()
  const toast = new CornerToast()
  const highlight = new StealthHighlight()
  const applicator = new DemandApplicator(coin, toast, highlight)
  const modelMenu = new ModelMenu({
    onModelChange: (_id) => {
      toast.flash('Model Updated')
      coin.flashOk(1000)
    },
  })
  const keyMenu = new KeyMenu(coin, toast)

  // Watcher de página para pré-análise proativa
  const pageWatcher = new PageWatcher({
    onPageAdvance: () => {
      if (!applicator.isActive()) {
        void doAnalyze(true)
      }
    },
  })
  pageWatcher.start()

  // Estado de análise
  let currentAbort: AbortController | null = null

  // Descobre modelos da conta em background
  const settings = loadSettings()
  if (settings.apiKey) {
    fetchAvailableModels(settings.apiKey).catch(() => {})
  }

  // Toast de inicialização
  toast.flash('Página Carregada EQ')

  // ── Análise Principal ────────────────────────────────────────────────────
  async function doAnalyze(proactive = false): Promise<void> {
    // Aborta análise anterior
    if (currentAbort) {
      try { currentAbort.abort() } catch {}
      currentAbort = null
    }
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
    const statusId = toast.persist('Carregando Página')

    try {
      // Captura contexto da página
      let context = captureCurrentContext(false)
      if (!context) context = captureFullPageText()
      if (!context) {
        toast.dismiss(statusId)
        coin.setState('idle')
        toast.flash('Erro de Conexão')
        return
      }

      const images = await captureImages(context.scope, settings.useVision)

      // ====================================================================
      // USA O ENGINE COMPLETO DO MODO NORMAL:
      // analyzeWithGemini = multi-key wave, hedging paralelo, rate-limit
      // blacklist 429, timeout adaptativo, fallback de modelos automático.
      // Injeta o system prompt estendido com instruções de interactionFlow.
      // ====================================================================
      const result = await analyzeWithGemini(
        context,
        images,
        settings,
        undefined,  // onProgress silencioso
        signal,
        { systemPromptOverride: DISCRETE_FULL_SYSTEM_PROMPT }
      )

      if (signal.aborted) return

      toast.dismiss(statusId)
      coin.setState('idle')

      const plan = result.plan as AnalysisPlan & { interactionFlow?: unknown }

      // Salva memória de sessão (igual ao modo normal)
      if (plan.memoryToStore) addSessionMemory(plan.memoryToStore)

      if (plan.pageType === 'conclusion') {
        toast.flash('Sessão Encerrada')
        return
      }

      // Normaliza / gera fallback do interactionFlow
      const flow = normalizeFlow(
        plan.interactionFlow,
        (plan.actions || []) as Record<string, unknown>[]
      )

      if (plan.pageType === 'info' || plan.pageType === 'start') {
        coin.flashOk(1500)
        toast.flash('Página Disponível')
        if (flow.length > 0) applicator.start(flow)
        return
      }

      // Questão normal: exibe primeiro hint do fluxo
      const firstStep = flow[0]
      toast.flash(firstStep?.hint || 'Página Disponível')
      if (firstStep?.customMsg) {
        setTimeout(() => toast.flash(firstStep.customMsg!), 1800)
      }

      if (flow.length > 0) applicator.start(flow)

    } catch (e) {
      if (signal.aborted) return
      toast.dismiss(statusId)
      coin.setState('idle')
      const msg = e instanceof Error ? e.message : ''
      if (msg.includes('inválida') || msg.includes('API key') || msg.includes('403')) {
        toast.flash('Acesso Negado')
      } else if (msg.includes('429') || msg.includes('cota') || msg.includes('Quota')) {
        toast.flash('Timeout Atingido')
      } else {
        toast.flash('Erro de Conexão')
      }
      coin.flashError()
    } finally {
      if (currentAbort?.signal === signal) currentAbort = null
    }
  }

  // ── Listener Global de Teclado ───────────────────────────────────────────
  function onGlobalKey(e: KeyboardEvent): void {
    const key = e.key

    // Alt+Q ou Shift+Q → analisar
    if ((e.altKey && (key === 'q' || key === 'Q')) || (e.shiftKey && key === 'Q')) {
      e.preventDefault(); e.stopPropagation()
      void doAnalyze()
      return
    }

    // Shift+M → seletor de modelo
    if (e.shiftKey && key === 'M') {
      e.preventDefault(); e.stopPropagation()
      modelMenu.isOpen() ? modelMenu.close() : modelMenu.open()
      return
    }

    // Shift+A → configurar chaves
    if (e.shiftKey && key === 'A') {
      e.preventDefault(); e.stopPropagation()
      keyMenu.isOpen() ? keyMenu.close() : keyMenu.open()
      return
    }

    // Shift+Z → abortar fluxo
    if (e.shiftKey && key === 'Z') {
      e.preventDefault(); e.stopPropagation()
      applicator.isActive() ? applicator.abort() : toast.flash('Process Clear')
      return
    }

    // Shift+R → re-analisar
    if (e.shiftKey && key === 'R') {
      e.preventDefault(); e.stopPropagation()
      toast.flash('Re-scanning Page')
      void doAnalyze()
      return
    }

    // Shift+H → status rápido
    if (e.shiftKey && key === 'H') {
      e.preventDefault(); e.stopPropagation()
      if (applicator.isActive()) {
        const cur = applicator.getCurrentStep() + 1
        const tot = applicator.getTotalSteps()
        const mode = applicator.getState() === 'waiting_key' ? 'Key' : 'Mouse'
        toast.flash(`Step ${cur}/${tot} — ${mode}`)
      } else {
        const s = loadSettings()
        const short = s.model.replace('gemini-', '').replace('-flash', 'F').replace('-lite', 'L')
        toast.flash(`Ready — ${short}`)
      }
      return
    }

    // Escape → fechar menus
    if (key === 'Escape') {
      if (modelMenu.isOpen()) { modelMenu.close(); e.stopPropagation(); e.preventDefault() }
      if (keyMenu.isOpen()) { keyMenu.close(); e.stopPropagation(); e.preventDefault() }
    }
  }

  window.addEventListener('keydown', onGlobalKey, { capture: true })

  // ── Exposição global ─────────────────────────────────────────────────────
  window.__eqdiscrete = {
    analyze: () => doAnalyze(),
    destroy: () => {
      window.removeEventListener('keydown', onGlobalKey, { capture: true })
      applicator.destroy()
      modelMenu.destroy()
      keyMenu.destroy()
      pageWatcher.stop()
      coin.destroy()
      toast.destroy()
      highlight.clearAll()
      delete window.__eqdiscrete
    },
  }
}
