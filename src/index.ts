import { analyzeWithGemini } from './core/gemini'
import { loadSettings, saveSettings } from './core/storage'
import type { AnalysisPlan, EasyQuizSettings } from './core/types'
import { captureCurrentContext } from './dom/detector'
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
    onAnalyze: () => runAnalysis(),
    onApply: () => void runApply(),
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
    analyze: () => void runAnalysis(),
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

  async function runAnalysis(): Promise<AnalysisPlan | void> {
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
        panel.setStatus('Nenhum bloco de controles encontrado. Capturando tela inteira como fallback...', 'info')
        const { captureFullPageText } = require('./dom/detector')
        context = captureFullPageText()
      } else {
        panel.setStatus(`Questão localizada (${context.controls.length} controles). Otimizando imagens...`, 'info')
      }
      
      highlightScope(context.scope)
      let images = await captureImages(context.scope)

      panel.setStatus(
        `Consultando Gemini (${settings.model}) com ${images.length} imagem(ns) anexada(s)...`,
        'info',
      )

      let { plan, usedModel } = await analyzeWithGemini(context, images, settings)
      if (usedModel) plan.usedModel = usedModel

      // Se a IA pediu mais contexto ao redor da questão
      if (plan.needsMoreContext) {
        panel.setStatus('Expandindo contexto ao redor da questão para maior assertividade...', 'info')
        const expandedCtx = captureCurrentContext(true)
        if (expandedCtx) {
          context = expandedCtx
          highlightScope(context.scope)
          images = await captureImages(context.scope)
          const recheck = await analyzeWithGemini(context, images, settings)
          plan = recheck.plan
          if (recheck.usedModel) plan.usedModel = recheck.usedModel
        }
      }

      latestPlan = plan
      highlightTargetActions(plan.actions)
      panel.setPlan(plan, !settings.dryRun)

      panel.setStatus(
        settings.dryRun
          ? 'Simulação concluída. As respostas foram realçadas na página sem alteração.'
          : 'Resolução pronta! Verifique o realce na tela e aplique quando desejar.',
        'success',
      )

      // Auto aplicação opcional
      if (settings.autoApply && !settings.dryRun) {
        await runApply()
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

  async function runApply(): Promise<void> {
    if (!latestPlan) {
      panel.setStatus('Nenhum plano disponível para aplicar. Execute a análise primeiro.', 'error')
      return
    }

    if (settings.dryRun) {
      panel.setStatus('O modo de simulação está ativo. Desmarque para poder aplicar.', 'error')
      return
    }

    const canAdvance =
      settings.autoAdvance &&
      latestPlan.confidence >= settings.confidenceThreshold &&
      !latestPlan.needsMoreContext

    panel.setBusy(true, 'Aplicando respostas no formulário...')

    try {
      const result = await executePlan(latestPlan, canAdvance)
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
