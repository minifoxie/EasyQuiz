import { analyzeWithGemini } from './core/gemini'
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
    clearHighlights()

    try {
      let context = captureCurrentContext(false)
      
      if (!context) {
        panel.setStatus('Nenhum controle detectado. Tentando captura de tela inteira...', 'info')
        context = captureFullPageText()
      }

      highlightScope(context.scope)

      panel.setStatus(`Questão localizada (${context.controls.length} controles). Preparando análise...`, 'info')
      let images = await captureImages(context.scope, settings.useVision)

      panel.setStatus(
        images.length > 0
          ? `Consultando Gemini (${settings.model}) com ${images.length} imagem(ns) anexada(s)...`
          : `Consultando Gemini (${settings.model}) via DOM nativo (modo rápido)...`,
        'info',
      )

      let { plan, usedModel } = await analyzeWithGemini(context, images, settings, (msg, type) => {
        panel.setStatus(msg, type === 'warning' ? 'info' : type)
      })

      // Se a IA pediu mais contexto ou detectou que o escopo estava isolado
      if (plan.needsMoreContext) {
        panel.setStatus('Enunciado ou contexto isolado detectado pela IA. Acionando Seleção Geral Expandida...', 'info')
        context = captureCurrentContext(true)
        if (!context) {
          context = captureFullPageText()
        }
        highlightScope(context.scope)
        images = await captureImages(context.scope, settings.useVision)
        panel.setStatus(`Reconsultando IA com escopo ampliado (${context.controls.length} controles)...`, 'info')
        const recheck = await analyzeWithGemini(context, images, settings, (msg, type) => {
          panel.setStatus(msg, type === 'warning' ? 'info' : type)
        })
        plan = recheck.plan
      }

      if (plan.memoryToStore) {
        addSessionMemory(plan.memoryToStore)
        console.log('[EasyQuiz] Memória de sessão armazenada:', plan.memoryToStore)
      }

      latestPlan = plan
      highlightTargetActions(plan.actions)
      panel.setPlan(plan, !settings.dryRun)

      if (plan.pageType === 'conclusion') {
        panel.setStatus('Atividade concluída ou tela final detectada pela IA.', 'success')
      } else if (plan.pageType === 'info') {
        panel.setStatus('📘 Conteúdo de contexto absorvido na memória RAG. Avançando...', 'success')
      } else if (plan.pageType === 'start') {
        panel.setStatus('Início de atividade detectado. Iniciando...', 'info')
      } else {
        panel.setStatus(
          settings.dryRun
            ? 'Simulação concluída. As respostas foram realçadas na página sem alteração.'
            : 'Resolução pronta! Verifique o realce na tela e aplique quando desejar.',
          'success',
        )
      }

      // Auto aplicação opcional
      if (settings.autoApply && !settings.dryRun) {
        await runApply(attemptCount)
      }
      return plan
    } catch (error) {
      clearHighlights()
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

    try {
      const result = await executePlan(latestPlan, canAdvance, attemptCount)
      panel.setStatus(
        `Sucesso: ${result.applied} resposta(s) preenchida(s)${result.advanced ? ' e próxima questão acionada' : ''}.`,
        'success',
      )
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Falha ao aplicar plano.'
      panel.setStatus(msg, 'error')
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
