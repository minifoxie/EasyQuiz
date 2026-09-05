import { analyzeWithGemini } from './core/gemini'
import { buildUserPrompt } from './core/prompt'
import { addSessionMemory, loadSettings, saveSettings } from './core/storage'
import type { AnalysisPlan, EasyQuizSettings } from './core/types'
import { captureCurrentContext, captureFullPageText } from './dom/detector'
import { executePlan } from './dom/executor'
import { clearHighlights, highlightScope, highlightTargetActions } from './dom/highlighter'
import { captureImages } from './media/capture'
import { EasyQuizPanel } from './ui/panel'

type EasyQuizWindow = Window & {
  __easyquiz?: {
    toggle: () => void
    destroy: () => void
    analyze: () => Promise<void>
  }
}

async function initEasyQuiz(): Promise<void> {
  const eqWindow = window as EasyQuizWindow

  // Se já existir uma instância rodando, apenas alterna a visualização
  if (eqWindow.__easyquiz) {
    eqWindow.__easyquiz.toggle()
    return
  }

  let settings: EasyQuizSettings = loadSettings()
  let latestPlan: AnalysisPlan | null = null

  const panel = new EasyQuizPanel(settings, {
    onAnalyze: (attempt = 1) => runAnalysis(attempt),
    onApply: (attempt = 1) => void runApply(attempt),
    onDestroy: () => {
      clearHighlights()
      delete eqWindow.__easyquiz
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

  async function runAnalysis(attemptCount = 1): Promise<AnalysisPlan | void> {
    if (!settings.apiKey) {
      panel.setStatus('Configure sua chave de API Gemini acima para começar.', 'error')
      panel.toggle(true)
      return
    }

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

      panel.setStatus(
        images.length > 0
          ? `Consultando Gemini (${settings.model}) com ${images.length} imagem(ns) anexada(s)...`
          : `Consultando Gemini (${settings.model}) via DOM nativo (modo rápido)...`,
        'info',
      )

      // Atualiza o Inspetor de Prompt em tempo real antes da resposta da API
      const promptPreview = buildUserPrompt(context, images, settings)
      panel.setInspectorPrompt(promptPreview, settings.model)

      let { plan, usedModel } = await analyzeWithGemini(context, images, settings, (msg, type) => {
        panel.setStatus(msg, type === 'warning' ? 'info' : type)
      })

      // Se a IA pediu mais contexto ou detectou que o escopo estava isolado
      if (plan.needsMoreContext) {
        panel.setProgress(55, 'Ampliando escopo da questão...')
        panel.setStatus('Enunciado ou contexto isolado detectado pela IA. Acionando Seleção Geral Expandida...', 'info')
        context = captureCurrentContext(true)
        if (!context) {
          context = captureFullPageText()
        }
        highlightScope(context.scope)
        panel.updateContext(context)
        images = await captureImages(context.scope, settings.useVision)
        panel.setStatus(`Reconsultando IA com escopo ampliado (${context.controls.length} controles)...`, 'info')

        const expandedPromptPreview = buildUserPrompt(context, images, settings)
        panel.setInspectorPrompt(expandedPromptPreview, settings.model)

        const recheck = await analyzeWithGemini(context, images, settings, (msg, type) => {
          panel.setStatus(msg, type === 'warning' ? 'info' : type)
        })
        plan = recheck.plan
      }

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
      highlightTargetActions(plan.actions)
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

      // Auto aplicação opcional
      if (settings.autoApply && !settings.dryRun) {
        await runApply(attemptCount)
      }
      return plan
    } catch (error) {
      clearHighlights()
      panel.setProgress(0)
      const message = error instanceof Error ? error.message : 'Falha desconhecida na análise.'
      panel.setStatus(message, 'error')
      return undefined
    } finally {
      panel.setBusy(false)
    }
  }

  async function runApply(attemptCount = 1): Promise<void> {
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
      (settings.autoAdvance || isInfoOrStart || attemptCount >= 2) &&
      latestPlan.confidence >= settings.confidenceThreshold &&
      !latestPlan.needsMoreContext

    panel.setBusy(true, 'Aplicando respostas no formulário...')
    panel.setProgress(85, `Aplicando ${latestPlan.actions.length} ação(ões) no formulário...`)
    panel.logToConsole(`> [EXEC] Iniciando aplicação com 6 vias de persistência para ${latestPlan.actions.length} ação(ões)...`, 'text-blue')

    try {
      const result = await executePlan(latestPlan, canAdvance, attemptCount)
      if (result.success || result.advanced) {
        panel.setProgress(100, 'Sucesso! Respostas preenchidas e validadas!')
        panel.logToConsole(
          `> [VERIF] ✓ Sucesso no DOM: ${result.verified}/${result.applied} ações validadas com sucesso!`,
          'text-green',
        )
        if (result.advanced) {
          panel.logToConsole(`> [NAV] ✓ Botão de confirmação/avanço acionado com sucesso!`, 'text-green')
        }
        panel.setStatus(
          `Sucesso: ${result.applied} resposta(s) preenchida(s)${result.advanced ? ' e próxima questão acionada' : ''}.`,
          'success',
        )
        panel.hideFloatingAnswers()
      } else {
        // Se aplicou e verificou alternativas no DOM, NÃO abre o gabarito desnecessariamente
        if (result.verified > 0) {
          panel.setProgress(90, 'Respostas preenchidas!')
          panel.logToConsole(
            `> [VERIF] ✓ Alternativa(s) marcada(s) no DOM (${result.verified}/${result.applied} validadas). Pronto para prosseguir!`,
            'text-green',
          )
          panel.setStatus(
            `Respostas preenchidas (${result.verified}/${result.applied} validadas no DOM).`,
            'success',
          )
          panel.hideFloatingAnswers()
        } else {
          // O gabarito só abre se a IA tiver certeza de que NADA pôde ser marcado (verified === 0) ou após 3 tentativas
          const shouldShowGabarito = latestPlan.pageType === 'question' && (result.verified === 0 || attemptCount >= 3)
          if (shouldShowGabarito) {
            panel.setProgress(0)
            panel.logToConsole(
              `> [VERIF] ⚠️ Nenhuma ação pôde ser validada no DOM (${result.verified}/${result.applied}). Abrindo Gabarito Flutuante para auxílio manual.`,
              'text-yellow',
            )
            panel.setStatus(
              `Aviso: O formulário requer interação manual direta. Gabarito Flutuante exibido na tela.`,
              'info',
            )
            panel.showFloatingAnswers(latestPlan)
          } else {
            panel.hideFloatingAnswers()
          }
        }
      }
    } catch (error) {
      panel.setProgress(0)
      const msg = error instanceof Error ? error.message : 'Falha ao aplicar plano.'
      panel.setStatus(msg, 'error')
      if (latestPlan.pageType === 'question' && attemptCount >= 3) {
        panel.showFloatingAnswers(latestPlan)
      } else {
        panel.hideFloatingAnswers()
      }
    } finally {
      panel.setBusy(false)
    }
  }

  // Abrir o painel logo ao injetar sempre (feedback visual imediato)
  panel.toggle(true)
}

// Iniciar
void initEasyQuiz().catch((err) => {
  console.error('[EasyQuiz] Erro fatal na inicialização:', err)
  window.alert(`EasyQuiz: falha ao iniciar: ${err instanceof Error ? err.message : String(err)}`)
})
