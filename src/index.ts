import { analyzeWithGemini, preferredFastModel } from './core/gemini'
import { buildUserPrompt } from './core/prompt'
import { addSessionMemory, loadSettings, saveSettings, recordQuestionTiming, loadActivityMetrics, resetActivityMetrics } from './core/storage'
import { createExecutionPolicy } from './core/policy'
import type { AnalysisPlan, EasyQuizSettings } from './core/types'
import { captureCurrentContext, captureFullPageText } from './dom/detector'
import { executePlan, setupSmartOptionInterceptors } from './dom/executor'
import { clearHighlights, highlightAttachedImages, highlightScope, highlightTargetActions } from './dom/highlighter'
import { captureImages } from './media/capture'
import { EasyQuizPanel } from './ui/panel'

type EasyQuizWindow = Window & {
  __easyquiz?: {
    toggle: () => void
    destroy: () => void
    analyze: () => Promise<void>
  }
}

function injectPreconnect(): void {
  try {
    if (typeof document === 'undefined' || !document.head) return
    if (document.querySelector('link[data-easyquiz-preconnect]')) return

    const preconnect = document.createElement('link')
    preconnect.rel = 'preconnect'
    preconnect.href = 'https://generativelanguage.googleapis.com'
    preconnect.crossOrigin = 'anonymous'
    preconnect.setAttribute('data-easyquiz-preconnect', 'true')
    document.head.appendChild(preconnect)

    const dnsPrefetch = document.createElement('link')
    dnsPrefetch.rel = 'dns-prefetch'
    dnsPrefetch.href = 'https://generativelanguage.googleapis.com'
    dnsPrefetch.setAttribute('data-easyquiz-preconnect', 'true')
    document.head.appendChild(dnsPrefetch)
  } catch {}
}

async function initEasyQuiz(): Promise<void> {
  const eqWindow = window as EasyQuizWindow

  // Limpa o histórico de métricas de tempo para que toda nova execução inicie 100% vazia
  resetActivityMetrics()

  // Instala proteção inteligente de cliques em opções para evitar inversão ou cancelamento por listeners do host
  setupSmartOptionInterceptors()
  // Pré-aquece a conexão com a API Google Gemini (DNS prefetch + Preconnect)
  injectPreconnect()

  // Se já existir uma instância rodando, apenas alterna a visualização
  if (eqWindow.__easyquiz) {
    eqWindow.__easyquiz.toggle()
    return
  }

  let settings: EasyQuizSettings = loadSettings()
  let latestPlan: AnalysisPlan | null = null
  let activeAnalysisController: AbortController | null = null
  let currentQuestionStartTime: number = 0

  const panel = new EasyQuizPanel(settings, {
    onAnalyze: (attempt = 1, signal?: AbortSignal) => runAnalysis(attempt, signal),
    onApply: (attempt = 1) => void runApply(attempt),
    onDestroy: () => {
      if (activeAnalysisController) {
        try {
          activeAnalysisController.abort()
        } catch {}
        activeAnalysisController = null
      }
      clearHighlights()
      delete eqWindow.__easyquiz
    },
    onCancel: () => {
      if (activeAnalysisController) {
        try {
          activeAnalysisController.abort()
        } catch {}
        activeAnalysisController = null
      }
      clearHighlights()
      panel.setProgress(0)
      panel.setInterrupted('Operação cancelada imediatamente pelo usuário.')
    },
    onSettingsChange: (newPartial) => {
      settings = saveSettings(newPartial)
    },
  })

  // Expor controle global
  eqWindow.__easyquiz = {
    toggle: () => panel.toggle(),
    destroy: () => panel.destroy(),
    analyze: async () => {
      await runAnalysis()
    },
  }

  // Atalho global de teclado: Alt + Q para analisar a questão imediatamente
  window.addEventListener('keydown', (event: KeyboardEvent) => {
    if (event.altKey && (event.key === 'q' || event.key === 'Q')) {
      event.preventDefault()
      if (!panel) return
      panel.toggle(true)
      void runAnalysis()
    }
  })

  async function runAnalysis(attemptCount = 1, externalSignal?: AbortSignal): Promise<AnalysisPlan | void> {
    if (!settings.apiKey) {
      panel.setStatus('Configure sua chave de API Gemini acima para começar.', 'error')
      panel.toggle(true)
      return
    }

    if (activeAnalysisController) {
      try {
        activeAnalysisController.abort()
      } catch {}
    }
    activeAnalysisController = new AbortController()
    const currentController = activeAnalysisController

    const onExternalAbort = () => {
      try {
        currentController.abort()
      } catch {}
    }
    if (externalSignal) {
      if (externalSignal.aborted) {
        currentController.abort()
      } else {
        externalSignal.addEventListener('abort', onExternalAbort, { once: true })
      }
    }

    if (currentController.signal.aborted) {
      panel.setBusy(false)
      panel.setProgress(0)
      return
    }

    currentQuestionStartTime = Date.now()
    panel.setBusy(true, 'Identificando o bloco da questão ativa na página...')
    panel.setProgress(20, 'Varrendo escopo do DOM e controles...')
    clearHighlights()
    panel.hideFloatingAnswers()

    try {
      let context = captureCurrentContext(false)
      
      if (!context) {
        panel.setStatus('Nenhum controle detectado. Tentando captura de tela inteira...', 'info')
        context = captureFullPageText()
      }

      highlightScope(context.scope)
      panel.updateContext(context)

      panel.logToConsole(
        `> [DOM] Escopo: <${context.scope.tagName.toLowerCase()}> com ${context.controls.length} controle(s) e ${context.questionText.length} caracteres.`,
        'text-blue',
      )

      panel.setStatus(`Questão localizada (${context.controls.length} controles). Preparando análise...`, 'info')
      panel.setProgress(40, `Consultando Gemini (${settings.model})...`)
      let images = await captureImages(context.scope, settings.useVision)
      if (images.length > 0) {
        const attachedElements = images.map((img) => img.element).filter(Boolean) as Element[]
        highlightAttachedImages(attachedElements)
      }

      if (currentController.signal.aborted) return undefined

      // Mostrar o modelo real que será usado: winner anterior (mais rápido) ou o escolhido pelo usuário
      const activeModel = preferredFastModel || settings.model
      panel.setStatus(
        images.length > 0
          ? `Consultando Gemini (${activeModel}) com ${images.length} imagem(ns) anexada(s)...`
          : `Consultando Gemini (${activeModel}) via DOM nativo (modo rápido)...`,
        'info',
      )

      // Atualiza o Inspetor de Prompt em tempo real antes da resposta da API
      const promptPreview = buildUserPrompt(context, images, settings)
      panel.setInspectorPrompt(promptPreview, settings.model)

      const onProgressCallback = (msg: string, type?: 'info' | 'warning' | 'error') => {
        panel.setStatus(msg, type === 'warning' ? 'info' : type)
        // Atualizar card fixo superior com o modelo em processo em tempo real
        // ex: "⚡ Onda 2: 2 slot(s) [3.6-flash, 3.6-flash]..." → "Gemini 3.6-flash respondendo..."
        const waveMatch = msg.match(/Onda\s+\d+.*?\[([^\]]+)\]/)
        if (waveMatch) {
          const modelShort = waveMatch[1].split(',')[0].trim()
          panel.setProgress(50, `Gemini ${modelShort} respondendo...`)
        }
      }

      let { plan, usedModel } = await analyzeWithGemini(context, images, settings, onProgressCallback, currentController.signal)

      if (currentController.signal.aborted) return undefined

      // Se a IA pediu mais contexto ou detectou que o escopo estava isolado
      if (plan.needsMoreContext) {
        panel.setProgress(55, 'Ampliando escopo da questão...')
        panel.setStatus('Enunciado ou contexto isolado detectado pela IA. Acionando Seleção Geral Expandida...', 'info')
        panel.logToConsole('> [DOM] Enunciado isolado. Ampliando escopo para seleção expandida...', 'text-blue')
        context = captureCurrentContext(true)
        if (!context) {
          context = captureFullPageText()
        }
        highlightScope(context.scope)
        panel.updateContext(context)
        images = await captureImages(context.scope, settings.useVision)
        if (images.length > 0) {
          const attachedElements = images.map((img) => img.element).filter(Boolean) as Element[]
          highlightAttachedImages(attachedElements)
        }
        panel.setStatus(`Reconsultando IA com escopo ampliado (${context.controls.length} controles)...`, 'info')

        const expandedPromptPreview = buildUserPrompt(context, images, settings)
        panel.setInspectorPrompt(expandedPromptPreview, settings.model)

        const recheck = await analyzeWithGemini(context, images, settings, onProgressCallback, currentController.signal)
        plan = recheck.plan
      }

      if (currentController.signal.aborted) return undefined

      panel.setProgress(70, 'Resposta recebida da IA! Processando plano...')
      panel.logToConsole(
        `> [IA] Modelo: ${usedModel || settings.model} | Modo: ${plan.mode} | Confiança: ${(plan.confidence * 100).toFixed(0)}%`,
        'text-green',
      )
      if (plan.rationale) {
        panel.logToConsole(`> [IA] Raciocínio: "${plan.rationale}"`, 'text-blue')
      }
      panel.logToConsole(`> [IA] ${plan.actions.length} ação(ões) prescritas no plano.`, 'text-blue')

      if (plan.memoryToStore) {
        addSessionMemory(plan.memoryToStore)
        panel.logToConsole(`> [RAG] 🧠 Nova memória teórica salva na sessão: "${plan.memoryToStore}"`, 'text-yellow')
      }

      latestPlan = plan
      panel.updateContext(context, plan)
      highlightTargetActions(plan.actions, plan.confidence)
      panel.setPlan(plan, !settings.dryRun)

      if (plan.pageType === 'conclusion') {
        panel.setProgress(100, 'Atividade concluída!')
        panel.setStatus('Atividade concluída ou tela final detectada pela IA.', 'success')
      } else if (plan.pageType === 'info') {
        panel.setProgress(100, 'Contexto absorvido na memória!')
        panel.setStatus('📘 Conteúdo de contexto absorvido na memória RAG. Avançando...', 'success')
      } else if (plan.pageType === 'start') {
        panel.setProgress(100, 'Início detectado!')
        panel.setStatus('Início de atividade detectado. Iniciando...', 'info')
      } else {
        panel.setProgress(80, 'Plano de resolução pronto!')
        panel.setStatus(
          settings.dryRun
            ? 'Simulação concluída. As respostas foram realçadas na página sem alteração.'
            : 'Resolução pronta! Verifique o realce na tela e aplique quando desejar.',
          'success',
        )
      }

      if (settings.dryRun && plan.pageType === 'question') {
        panel.showFloatingAnswers(plan)
      }

      if (currentController.signal.aborted) return undefined

      // Auto aplicação opcional
      if (settings.autoApply && !settings.dryRun) {
        await runApply(attemptCount, currentController.signal)
      }
      return plan
    } catch (error) {
      if (
        currentController.signal.aborted ||
        (error instanceof Error && (error.name === 'AbortError' || error.message.includes('cancelada')))
      ) {
        clearHighlights()
        panel.setProgress(0)
        panel.setInterrupted('Operação cancelada pelo usuário.')
        return undefined
      }

      clearHighlights()
      panel.setProgress(0)
      const message = error instanceof Error ? error.message : 'Falha desconhecida na análise.'
      panel.setStatus(message, 'error')
      panel.setErrorDiagnostic(message, 'Análise da IA')
      return undefined
    } finally {
      externalSignal?.removeEventListener('abort', onExternalAbort)
      if (activeAnalysisController === currentController) {
        activeAnalysisController = null
      }
      if (!currentController.signal.aborted) {
        panel.setBusy(false)
      }
    }
  }

  async function runApply(attemptCount = 1, signal?: AbortSignal): Promise<void> {
    if (signal?.aborted) return
    if (!latestPlan) {
      panel.setStatus('Nenhum plano disponível para aplicar. Execute a análise primeiro.', 'error')
      return
    }

    if (settings.dryRun) {
      panel.setStatus('O modo de simulação está ativo. Desmarque para poder aplicar.', 'error')
      return
    }

    const isInfoOrStart = latestPlan.pageType === 'info' || latestPlan.pageType === 'start'
    const canAdvance =
      (settings.autoAdvance || isInfoOrStart) &&
      latestPlan.confidence >= settings.confidenceThreshold &&
      !latestPlan.needsMoreContext

    panel.setBusy(true, 'Aplicando respostas no formulário...')
    panel.setProgress(85, `Aplicando ${latestPlan.actions.length} ação(ões) no formulário...`)
    panel.logToConsole(`> [EXEC] Iniciando aplicação com 6 vias de persistência para ${latestPlan.actions.length} ação(ões)...`, 'text-blue')

    try {
      const result = await executePlan(latestPlan, canAdvance, attemptCount, createExecutionPolicy(settings))
      if (signal?.aborted) return
      panel.setExecutionReport(result)
      const elapsedMs = currentQuestionStartTime > 0 ? Date.now() - currentQuestionStartTime : 1200
      const regularActionsCount = latestPlan.actions.filter((a) => a.t !== 'adv' && a.t !== 'js').length
      const isQuestion = latestPlan.pageType === 'question' || regularActionsCount > 0
      const isStrictSuccess = isQuestion
        ? (result.success || (result.applied > 0 && result.failed.length === 0))
        : (result.success || result.advanced)

      if (isStrictSuccess) {
        panel.setProgress(100, 'Sucesso! Respostas preenchidas e validadas!')
        panel.logToConsole(
          `> [VERIF] ✓ Sucesso no DOM: ${result.verified}/${result.applied} ações validadas com sucesso!`,
          'text-green',
        )
        if (result.advanced) {
          panel.logToConsole(`> [NAV] ✓ Botão de confirmação/avanço acionado com sucesso!`, 'text-green')
        } else if (canAdvance) {
          panel.logToConsole(`> [NAV] ⚠️ ${result.navigationEvidence}`, 'text-yellow')
        }
        panel.setStatus(
          result.advanced
            ? `Sucesso: ${result.applied} resposta(s) preenchida(s) e próxima questão confirmada.`
            : `Respostas preenchidas e validadas. Avanço não confirmado: ${result.navigationEvidence}`,
          result.advanced || !canAdvance ? 'success' : 'info',
        )
        // O gabarito SÓ é escondido se a resposta foi aplicada e validada com sucesso
        panel.hideFloatingAnswers()

        // Registra métricas de tempo da questão
        const metrics = recordQuestionTiming({
          id: `q-${Date.now()}`,
          questionIndex: (loadActivityMetrics().records.length || 0) + 1,
          questionTitle: latestPlan.rationale ? latestPlan.rationale.slice(0, 45) + '...' : `Questão ${latestPlan.mode || 'Auto'}`,
          durationMs: elapsedMs,
          status: 'verified',
          mode: latestPlan.mode,
          actionsCount: result.applied,
        })
        panel.updateTimingMetrics(metrics)
      } else {
        // Injeção parcial ou totalmente falhou
        const totallyFailed = result.verified === 0 && result.applied > 0
        const failedTargets = result.failed.length > 0 ? result.failed.join(', ') : 'alvos pendentes'

        panel.logToConsole(
          `> [VERIF] ${totallyFailed ? 'Alerta' : 'Info'}: ${result.verified}/${result.applied} ações verificadas no DOM. Pendências: ${failedTargets}.`,
          totallyFailed ? 'text-yellow' : 'text-blue',
        )

        if (totallyFailed) {
          // Injeção TOTALMENTE bloqueada — exibir gabarito para intervenção manual
          panel.setProgress(0, 'Injeção restrita. Gabarito exibido.')
          panel.logToConsole(
            `> [GABARITO] Injeção totalmente bloqueada pela página. Gabarito exibido para você marcar e avançar.`,
            'text-yellow',
          )
          panel.setStatus('Injeção restrita pela página. Gabarito exibido na tela para você avançar.', 'info')
          panel.showFloatingAnswers(latestPlan)
        } else {
          // Injeção parcial — a maioria das ações foi aplicada, prosseguir normalmente
          panel.setProgress(90, 'Aplicação parcial — avançando.')
          panel.setStatus('Aplicado parcialmente. Avançando para a próxima questão.', 'success')
        }


        const metrics = recordQuestionTiming({
          id: `q-${Date.now()}`,
          questionIndex: (loadActivityMetrics().records.length || 0) + 1,
          questionTitle: latestPlan.rationale ? latestPlan.rationale.slice(0, 45) + '...' : `Questão ${latestPlan.mode || 'Auto'}`,
          durationMs: elapsedMs,
          status: 'manual',
          mode: latestPlan.mode,
          actionsCount: 0,
        })
        panel.updateTimingMetrics(metrics)
      }
    } catch (error) {
      panel.setProgress(0)
      const msg = error instanceof Error ? error.message : 'Falha ao aplicar plano.'
      panel.setStatus('Injeção restrita pela página. Gabarito direto exibido na tela para você avançar.', 'info')
      panel.logToConsole(`> [ERRO] ${msg}`, 'text-red')
      if (latestPlan) {
        panel.showFloatingAnswers(latestPlan)
      }
    } finally {
      panel.setBusy(false)
    }
  }

  // Abrir o painel logo ao injetar sempre (feedback visual imediato)
  panel.toggle(true)
}

// Instala proteção inteligente de opções sincronamente na inicialização do bundle
setupSmartOptionInterceptors()

// Iniciar
void initEasyQuiz().catch((err) => {
  console.error('[EasyQuiz] Erro fatal na inicialização:', err)
  window.alert(`EasyQuiz: falha ao iniciar: ${err instanceof Error ? err.message : String(err)}`)
})
