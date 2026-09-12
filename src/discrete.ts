/**
 * EasyQuiz Modo Discreto — Entry Point v3
 * Auto-retry em falhas, detecção robusta de mudança de página.
 */

import { analyzeWithGemini, fetchAvailableModels } from './core/gemini'
import { loadSettings, addSessionMemory, resetActivityMetrics } from './core/storage'
import { captureCurrentContext, captureFullPageText } from './dom/detector'
import { captureImages } from './media/capture'
import { setupSmartOptionInterceptors, buildDragFallbackJs } from './dom/executor'
import { SYSTEM_PROMPT } from './core/prompt'

import { CoinCursor } from './discrete/coinCursor'
import { CornerToast } from './discrete/cornerToast'
import { ModelMenu } from './discrete/modelMenu'
import { KeyMenu } from './discrete/keyMenu'
import { StealthHighlight } from './discrete/stealthHighlight'
import { PageWatcher } from './discrete/pageWatcher'
import { DemandApplicator } from './discrete/demandApplicator'
import { CommandMenu } from './discrete/commandMenu'
import { DebugOutput } from './discrete/debugOutput'
import { DISCRETE_SYSTEM_SUFFIX, normalizeFlow } from './discrete/promptDiscrete'
import type { AnalysisPlan } from './core/types'

declare global {
  interface Window {
    __eqdiscrete?: { destroy: () => void; analyze: () => Promise<void> }
  }
}

if (window.__eqdiscrete) {
  try {
    window.__eqdiscrete.destroy()
  } catch {}
}
void initDiscrete()

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

  const coin        = new CoinCursor()
  const toast       = new CornerToast()
  const highlight   = new StealthHighlight()
  const applicator  = new DemandApplicator(coin, toast, highlight)
  const debugOutput = new DebugOutput({
    onForceStep: (idx: number): Promise<boolean> => applicator.forceStep(idx),
    onForceAllSteps: (): Promise<void> => applicator.forceAll(),
  })
  applicator.setDebugOutput(debugOutput)
  const modelMenu   = new ModelMenu({ onModelChange: () => toast.flash('Modelo OK') })
  const keyMenu     = new KeyMenu(coin, toast)
  const cmdMenu     = new CommandMenu()

  // Estado de análise
  let currentAbort: AbortController | null = null
  let analyzing = false
  let retryTimer: number | null = null
  let lastPreClickTs = 0

  window.addEventListener('click', (e) => {
    if (analyzing && e.isTrusted) {
      const t = e.target as HTMLElement | null
      if (t && !t.closest('#__eqdm_menu__,#__eqkm_overlay__,#__eqcm_menu__,#__eqdiscrete_coin__,#__eqdiscrete_toasts__,#__eq_dbg_window__,#__eq_dbg_pill__')) {
        lastPreClickTs = Date.now()
        debugOutput.log('CLICK', 'Clique antecipado registrado durante análise')
      }
    }
  }, { capture: true })

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

    // Se já estiver analisando e for uma chamada proativa redundante, não interrompe a análise em voo!
    if (analyzing && proactive) {
      debugOutput.log('SYS', 'Análise já em andamento — preservando requisição ativa')
      return
    }

    // Não interrompe o aplicador se a análise for proativa e o usuário estiver interagindo
    if (proactive && applicator.isActive()) {
      return
    }

    // Cancela análise anterior em chamadas manuais explícitas ou retries
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
    debugOutput.log('SYS', `Iniciando análise (proativo: ${proactive}, retry: ${retry})`)

    function scheduleRetry(): void {
      const delay = RETRY_DELAYS[Math.min(retry, RETRY_DELAYS.length - 1)]
      debugOutput.log('WARN', `Agendando retry em ${delay}ms`)
      retryTimer = window.setTimeout(() => {
        if (!applicator.isActive()) void doAnalyze(false, retry + 1)
      }, delay)
    }

    try {
      // Breve acomodação do DOM em scans proativos (60ms)
      if (proactive) await new Promise(r => setTimeout(r, 60))
      if (signal.aborted) return

      let ctx = captureCurrentContext(false)
      if (!ctx) ctx = captureFullPageText()

      if (!ctx || !ctx.questionText?.trim()) {
        coin.setState('idle')
        if (retry === 0 && !proactive) toast.flash('Sem conteúdo')
        debugOutput.log('WARN', 'Nenhum conteúdo ou questão detectada na página')
        // Sempre retenta — talvez a página ainda esteja carregando
        scheduleRetry()
        return
      }

      debugOutput.log('DOM', `Contexto detectado: ${ctx.controls.length} controles, ${ctx.questionText.length} chars`, ctx.questionText)

      const images = await captureImages(ctx.scope, settings.useVision)
      if (signal.aborted) return
      debugOutput.setImages(images)

      const tStart = performance.now()
      const result = await analyzeWithGemini(
        ctx, images, settings,
        (msg, type) => debugOutput.log(type === 'error' ? 'ERROR' : type === 'warning' ? 'WARN' : 'SYS', `[IA] ${msg}`),
        signal,
        { systemPromptOverride: DISCRETE_FULL_SYSTEM }
      )
      const latency = Math.round(performance.now() - tStart)

      if (signal.aborted) return

      coin.setState('idle')
      const plan = result.plan as AnalysisPlan & { interactionFlow?: unknown }

      debugOutput.log('SYS', `Análise concluída em ${latency}ms via ${result.usedModel ?? settings.model} — pageType: ${plan.pageType} | mode: ${plan.mode} | ${plan.actions?.length ?? 0} ação(ões)`)
      debugOutput.setPlan(plan, ctx.questionText, latency, settings.model, images)

      if (plan.memoryToStore) addSessionMemory(plan.memoryToStore)

      // Log imageDescriptions — o que a IA entendeu de cada imagem
      if (plan.imageDescriptions && plan.imageDescriptions.length > 0) {
        debugOutput.log('AI', `🖼️ ${plan.imageDescriptions.length} imagem(ns) analisadas:`)
        for (const imgDesc of plan.imageDescriptions) {
          const icon = imgDesc.relevant ? '✅' : '⚠️'
          debugOutput.log(
            imgDesc.relevant ? 'AI' : 'WARN',
            `  ${icon} Imagem ${imgDesc.index + 1} [${imgDesc.relevant ? 'RELEVANTE' : 'IGNORADA'}]: ${imgDesc.description}`,
          )
        }
      }

      if (plan.pageType === 'conclusion') {
        toast.flash('Sessão encerrada')
        debugOutput.log('SYS', 'Página de conclusão detectada')
        return
      }

      const flow = normalizeFlow(
        plan.interactionFlow,
        (plan.actions || []) as Record<string, unknown>[]
      )

      debugOutput.log('SYS', `Fluxo gerado: ${flow.length} step(s) — ${flow.map(s => `${s.trigger}[${(s.action as any)?.t}]`).join(', ')}`)

      if (plan.pageType === 'info' || plan.pageType === 'start') {
        coin.flashOk(1000)
        toast.flash('Avançar →')
        debugOutput.log('SYS', `Página informativa (${plan.pageType}) — aguardando clique do usuário para avançar`)

        if (flow.length > 0) {
          applicator.start(flow)
        } else {
          // Sem fluxo: constrói 1 step adv automático para que o usuário clique e avance
          const advFlow = [{
            step: 1,
            trigger: 'click' as const,
            action: { t: 'adv', label: 'continuar' },
            hint: 'Clique para avançar',
            customMsg: null,
          }]
          debugOutput.log('SYS', 'Fluxo adv gerado automaticamente para página informativa')
          applicator.start(advFlow)
        }
        return
      }

      if (!flow.length) {
        // IA retornou mas sem fluxo — retenta
        debugOutput.log('WARN', 'Plano da IA retornou sem ações ou fluxo de interação')
        scheduleRetry()
        return
      }

      // Sucesso
      retryCount = 0
      coin.flashOk(500)
      const first = flow[0]
      toast.flash(first.hint || 'Pronto')
      if (first.customMsg) setTimeout(() => toast.flash(first.customMsg!), 1400)

      // Log de ações de drag no debug output para visibilidade
      const dragSteps = flow.filter(s => (s.action as any)?.t === 'drag')
      if (dragSteps.length > 0) {
        debugOutput.log('FLOW', `🔄 ${dragSteps.length} step(s) de drag/categorização no fluxo. Estratégias A-G serão tentadas.`)
        for (const ds of dragSteps) {
          const a = ds.action as any
          debugOutput.log('FLOW', `  Drag: "${a.from}" → "${a.to}"`, JSON.stringify(a))
        }
      }

      applicator.start(flow)
      if (flow.length > 0 && flow[0].trigger === 'click' && (Date.now() - lastPreClickTs < 4000)) {
        lastPreClickTs = 0
        debugOutput.log('FLOW', 'Aplicando clique antecipado no primeiro step')
        setTimeout(() => void applicator.forceStep(0), 40)
      }

    } catch (e) {
      if (signal.aborted) return
      coin.setState('idle')
      const m = e instanceof Error ? e.message : String(e)
      debugOutput.log('ERROR', `Erro na análise: ${m}`)

      if (m.includes('403') || m.includes('API key') || m.includes('inválida')) {
        toast.flash('Acesso negado')
        coin.flashError()
        // Não retenta em erro de auth
        return
      }
      if (m.includes('429') || m.includes('Quota') || m.includes('RESOURCE_EXHAUSTED') || m.includes('Todas as tentativas')) {
        // 429 = só ESTA chave atingiu cota. Outras chaves podem estar livres.
        // Tenta IMEDIATAMENTE com retry+1 (analise usara outras chaves via round-robin).
        // Backoff só quando todas as chaves já falharam (erro de esgotamento total).
        const isExhausted = m.includes('Todas as tentativas') || retry >= 4
        if (isExhausted) {
          toast.flash('Limite — aguarde')
          coin.flashError()
          scheduleRetry()
        } else {
          // Tenta agora com outra chave
          toast.flash('Chave rotacionando')
          coin.flashError(300)
          void doAnalyze(false, retry + 1)
        }
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
    if (modelMenu.isOpen())   modelMenu.close()
    if (keyMenu.isOpen())     keyMenu.close()
    if (cmdMenu.isOpen())     cmdMenu.close()
    if (debugOutput.isOpen()) debugOutput.close()
  }

  const COMMANDS = [
    { keys: 'Shift+Q', label: 'Analisar página',   action: () => void doAnalyze() },
    { keys: 'Shift+V', label: 'Mídias IA (Vision)',action: () => { debugOutput.openTab('media'); toast.flash('Mídias IA') } },
    { keys: 'Shift+M', label: 'Trocar modelo',     action: () => modelMenu.isOpen() ? modelMenu.close() : modelMenu.open() },
    { keys: 'Shift+A', label: 'Config API keys',   action: () => keyMenu.isOpen() ? keyMenu.close() : keyMenu.open() },
    { keys: 'Shift+Z', label: 'Abortar fluxo',     action: () => applicator.isActive() ? applicator.abort() : toast.flash('Nada ativo') },
    { keys: 'Shift+R', label: 'Re-analisar',       action: () => void doAnalyze() },
    { keys: 'Shift+H', label: 'Debug Output',      action: () => debugOutput.toggle() },
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
      // CANCEL BRUTAL: aborta tudo imediatamente
      // 1. Cancela fetch da IA em andamento
      if (currentAbort) { try { currentAbort.abort() } catch {} currentAbort = null }
      // 2. Para o timer de retry
      if (retryTimer) { clearTimeout(retryTimer); retryTimer = null }
      // 3. Para o fluxo de interação ativo
      if (applicator.isActive()) applicator.abort()
      else toast.flash('Abortado')
      analyzing = false
      coin.setState('idle')
      return
    }
    if (e.shiftKey && k === 'R') {
      e.preventDefault(); e.stopPropagation(); void doAnalyze(); return
    }
    if (e.shiftKey && k === 'H') {
      e.preventDefault(); e.stopPropagation(); debugOutput.toggle(); return
    }
    if (e.shiftKey && (k === 'V' || k === 'v')) {
      e.preventDefault(); e.stopPropagation(); debugOutput.openTab('media'); toast.flash('Mídias IA'); return
    }
    if (e.shiftKey && k === 'I') {
      e.preventDefault(); e.stopPropagation(); toast.reshow(); return
    }
    if (e.shiftKey && k === 'C') {
      e.preventDefault(); e.stopPropagation()
      cmdMenu.isOpen() ? cmdMenu.close() : cmdMenu.open(); return
    }
    if (k === 'Escape' && (modelMenu.isOpen() || keyMenu.isOpen() || cmdMenu.isOpen() || debugOutput.isOpen())) {
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
      debugOutput.destroy()
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

  // Análise imediata na inicialização do bookmarklet para armar o aplicador na 1ª questão
  void doAnalyze(true)
}

