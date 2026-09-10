import { analyzeWithGemini } from './core/gemini'
import { buildUserPrompt } from './core/prompt'
import { addSessionMemory, loadSettings, saveSettings, recordQuestionTiming, loadActivityMetrics, resetActivityMetrics } from './core/storage'
import { createExecutionPolicy } from './core/policy'
import type { AnalysisPlan, EasyQuizSettings, FailedActionDetail } from './core/types'
import { captureCurrentContext, captureFullPageText } from './dom/detector'
import { executePlan, setupSmartOptionInterceptors, buildDragFallbackJs, injectClickViaScript, findElementExt, verifyActionApplied, executeAlternativeActionPath } from './dom/executor'
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

  // Se já existir uma instância rodando (reexecução do bookmarklet para atualizar), limpa a antiga
  if (eqWindow.__easyquiz) {
    try {
      eqWindow.__easyquiz.destroy()
    } catch {}
    try {
      document.getElementById('easyquiz-shadow-root')?.remove()
    } catch {}
  }

  let settings: EasyQuizSettings = loadSettings()
  let latestPlan: AnalysisPlan | null = null
  let activeAnalysisController: AbortController | null = null
  let currentQuestionStartTime: number = 0

  const panel = new EasyQuizPanel(settings, {
    onAnalyze: (attempt = 1, signal?: AbortSignal, isAutopilot = false) => runAnalysis(attempt, signal, isAutopilot),
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

  async function runAnalysis(attemptCount = 1, externalSignal?: AbortSignal, isAutopilot = false): Promise<AnalysisPlan | void> {
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
        // Atualiza a aba Contexto com as imagens capturadas
        panel.updateImages(images)
      }

      if (currentController.signal.aborted) return undefined

      // O modelo escolhido pelo usuário nas configurações tem prioridade máxima sempre
      const activeModel = settings.model
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
          panel.updateImages(images)
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

      // Log de imageDescriptions — o que a IA entendeu de cada imagem
      if (plan.imageDescriptions && plan.imageDescriptions.length > 0) {
        panel.logToConsole(`> [VISION] 🖼️ Análise de ${plan.imageDescriptions.length} imagem(ns) pela IA:`, 'text-blue')
        for (const imgDesc of plan.imageDescriptions) {
          const icon = imgDesc.relevant ? '✅' : '⚠️'
          panel.logToConsole(
            `>   ${icon} Imagem ${imgDesc.index + 1} [${imgDesc.relevant ? 'RELEVANTE' : 'IGNORADA'}]: ${imgDesc.description}`,
            imgDesc.relevant ? 'text-blue' : 'text-yellow',
          )
        }
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

      // Auto aplicação: sempre no Autopilot; opt-in no modo manual (autoApply setting)
      if ((isAutopilot || settings.autoApply) && !settings.dryRun) {
        await runApply(attemptCount, currentController.signal, isAutopilot)
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

  async function runApply(attemptCount = 1, signal?: AbortSignal, forceAdvance = false): Promise<void> {
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
    // forceAdvance=true quando chamado pelo Autopilot — ignora autoAdvance (que é opt-in para modo manual)
    // No Autopilot, o avanço é SEMPRE desejado quando a confiança atinge o limiar
    const canAdvance =
      (forceAdvance || settings.autoAdvance || isInfoOrStart) &&
      latestPlan.confidence >= settings.confidenceThreshold &&
      !latestPlan.needsMoreContext

    panel.setBusy(true, 'Aplicando respostas no formulário...')
    panel.setProgress(85, `Aplicando ${latestPlan.actions.length} ação(ões) no formulário...`)
    panel.logToConsole(`> [EXEC] Iniciando aplicação com 6 vias de persistência para ${latestPlan.actions.length} ação(ões)...`, 'text-blue')

    try {
      const result = await executePlan(latestPlan, canAdvance, attemptCount, createExecutionPolicy(settings))
      if (signal?.aborted) return
      panel.setExecutionReport(result)

      // Log e replanejamento para QUALQUER tipo de ação que falhou
      if (result.failedActions && result.failedActions.length > 0) {
        panel.logToConsole(
          `> [REPLAN] ⚠️ ${result.failedActions.length} ação(ões) não verificadas no DOM. Iniciando replanejamento...`,
          'text-yellow',
        )
        for (const fail of result.failedActions) {
          const a = fail.action as any
          const label = a.t === 'drag' ? `drag: "${a.from}" → "${a.to}"` :
            a.t === 'clk' || a.t === 'chk' ? `${a.t}: "${a.id}"` :
            a.t === 'val' ? `val: "${a.id}" = "${a.v}"` :
            JSON.stringify(a).slice(0, 80)
          panel.logToConsole(`>   ✗ [${a.t.toUpperCase()}] ${label} | ${fail.evidence.slice(0, 80)}`, 'text-yellow')
        }
        await runActionFallback(result.failedActions, signal)
      }
      // Aplica\u00e7\u00e3o bem-sucedida:
      // - success=true significa que TODAS as a\u00e7\u00f5es foram verificadas no DOM
      // - Tamb\u00e9m aceita resultado parcial se pelo menos 1 foi verificada (n\u00e3o apenas aplicada)
      const elapsedMs = currentQuestionStartTime > 0 ? Date.now() - currentQuestionStartTime : 1200
      const hasVerified = result.verified > 0
      const hasApplied = result.applied > 0
      const isStrictSuccess = result.success || (hasVerified && hasApplied)

      if (isStrictSuccess) {
        panel.setProgress(100, 'Sucesso! Resposta preenchida.')
        panel.logToConsole(
          `> [DOM] ✓ ${result.applied} ação(ões) aplicada(s) — ${result.verified} verificada(s) no DOM.`,
          'text-green',
        )
        if (result.advanced) {
          panel.logToConsole(`> [NAV] ✓ Botão de confirmação/avanço acionado com sucesso!`, 'text-green')
        } else if (canAdvance) {
          panel.logToConsole(`> [NAV] ${result.navigationEvidence}`, 'text-blue')
        }
        panel.setStatus(
          result.advanced
            ? `Sucesso: ${result.applied} resposta(s) preenchida(s) e avançando.`
            : `Resposta aplicada na página (${result.applied} ação(ões)).`,
          'success',
        )
        // O gabarito flutuante fica SEMPRE fechado após preencher a questão
        panel.hideFloatingAnswers()

        // Registra métricas de tempo da questão
        const metrics = recordQuestionTiming({
          id: `q-${Date.now()}`,
          questionIndex: (loadActivityMetrics().records.length || 0) + 1,
          questionTitle: latestPlan.rationale ? latestPlan.rationale.slice(0, 45) + '...' : `Questão ${latestPlan.mode || 'Auto'}`,
          durationMs: elapsedMs,
          status: 'answered',
          mode: latestPlan.mode,
          actionsCount: result.applied,
        })
        panel.updateTimingMetrics(metrics)
      } else if (hasApplied) {
        // Aplicou mas não verificou — possivelmente aplicação correta mas sem evidência DOM clara
        panel.setProgress(75, 'Resposta aplicada (verificação incerta).')
        panel.logToConsole(
          `> [DOM] ⚠️ ${result.applied} ação(ões) disparadas mas sem confirmação DOM clara. Pendentes: ${result.failed.join(', ') || 'nenhuma'}`,
          'text-yellow',
        )
        panel.setStatus(`Resposta preenchida (${result.applied} ação(ões) aplicadas, verificação incerta).`, 'warning')
      } else {
        // Nenhuma ação aplicada (alvo de resposta não localizado no DOM)
        panel.setProgress(0, 'Alvo de resposta não localizado.')
        panel.logToConsole(
          `> [DOM] Alerta: nenhum controle de resposta foi modificado no DOM. Pendências: ${result.failed.join(', ') || 'nenhuma ação'}.`,
          'text-yellow',
        )
        panel.setStatus('Controle de resposta não encontrado na página. Use o botão Gabarito no painel se desejar.', 'warning')
        // NUNCA força a abertura automática do gabarito em modo normal/Autopilot
        if (settings.dryRun) {
          panel.showFloatingAnswers(latestPlan)
        }
      }
    } catch (error) {
      panel.setProgress(0)
      const msg = error instanceof Error ? error.message : 'Falha ao aplicar plano.'
      panel.setStatus(`Erro ao aplicar: ${msg}`, 'error')
      panel.logToConsole(`> [ERRO] ${msg}`, 'text-red')
      // NUNCA exibe gabarito intrusivo de surpresa
    } finally {
      panel.setBusy(false)
    }
  }

  /**
   * Re-planejamento automático para QUALQUER ação que falhou.
   * Pipeline de 5 estratégias progressivas — cada uma verifica o DOM após tentar.
   * Para assim que uma estratégia tiver sucesso.
   */
  async function runActionFallback(fails: FailedActionDetail[], signal?: AbortSignal): Promise<void> {
    if (!latestPlan) return

    // --- 0. Drag failures → JS procedural imediato (rota especial) ---
    const dragFails = fails.filter(f => f.action.t === 'drag')
    for (const fail of dragFails) {
      if (signal?.aborted) return
      const a = fail.action as any
      const fromStr = String(a.from || '')
      const toStr = String(a.to || '')
      const js = buildDragFallbackJs(fromStr, toStr, fromStr, toStr)
      panel.logToConsole(`> [REPLAN] 🔧 Drag JS fallback: "${fromStr}" → "${toStr}"`, 'text-blue')
      const fp: AnalysisPlan = { ...latestPlan, actions: [{ t: 'js', v: js }], pageType: 'question' }
      const fr = await executePlan(fp, false, 1, createExecutionPolicy(settings))
      panel.logToConsole(fr.applied > 0 ? '> [REPLAN] ✅ Drag fallback aplicado!' : '> [REPLAN] ✗ Drag fallback sem efeito.', fr.applied > 0 ? 'text-green' : 'text-yellow')
    }

    // --- Demais falhas (não-drag) — Pipeline de 5 estratégias ---
    const nonDragFails = fails.filter(f => f.action.t !== 'drag')
    if (nonDragFails.length === 0) return
    if (signal?.aborted) return

    panel.logToConsole(`> [REPLAN] 🔄 ${nonDragFails.length} ação(ões) pendente(s) — iniciando pipeline de recuperação multi-estratégia...`, 'text-blue')

    for (const fail of nonDragFails) {
      if (signal?.aborted) return
      const a = fail.action as any
      const label = a.t === 'clk' || a.t === 'chk' ? `${a.t}: "${a.id}"` :
        a.t === 'val' ? `val: "${a.id}" = "${a.v}"` :
        a.t === 'sel' ? `sel: "${a.id}" = "${Array.isArray(a.v) ? a.v[0] : a.v}"` :
        JSON.stringify(a).slice(0, 60)

      panel.logToConsole(`> [REPLAN] ⚡ Recuperando: ${label}`, 'text-blue')

      const elId = String(a.id || a.name || a.selector || '')
      const valHint = a.v !== undefined ? String(a.v) : ''

      // ESTRATÉGIA 1: executeAlternativeActionPath (rota alternativa padrão)
      panel.logToConsole(`> [REPLAN] Estratégia 1: rota alternativa padrão...`, 'text-blue')
      try {
        await executeAlternativeActionPath(fail.action)
        await new Promise(r => setTimeout(r, 250))
        if (verifyActionApplied(fail.action)) {
          panel.logToConsole(`> [REPLAN] ✅ Estratégia 1 OK: ${label}`, 'text-green')
          continue
        }
      } catch {}

      // ESTRATÉGIA 2: injectClickViaScript (bypass isTrusted via <script> injection)
      if (a.t === 'clk' || a.t === 'chk') {
        panel.logToConsole(`> [REPLAN] Estratégia 2: script injection (bypass isTrusted)...`, 'text-blue')
        try {
          const el = findElementExt(elId, valHint) || findElementExt(elId.replace(/[^\w\s]/g, ' ').trim(), valHint)
          if (el) {
            injectClickViaScript(el)
            await new Promise(r => setTimeout(r, 300))
            if (verifyActionApplied(fail.action)) {
              panel.logToConsole(`> [REPLAN] ✅ Estratégia 2 OK: ${label}`, 'text-green')
              continue
            }
          }
        } catch {}
      }

      // ESTRATÉGIA 3: Keyboard simulation (Tab focus + Space/Enter)
      // Frameworks como react-aria preferem eventos de teclado em vez de mouse
      if (a.t === 'clk' || a.t === 'chk') {
        panel.logToConsole(`> [REPLAN] Estratégia 3: simulação de teclado (Tab+Space)...`, 'text-blue')
        try {
          const el = findElementExt(elId, valHint) || findElementExt(elId.replace(/[^\w\s]/g, ' ').trim(), valHint)
          if (el) {
            el.focus?.()
            await new Promise(r => setTimeout(r, 50))
            el.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', code: 'Space', keyCode: 32, bubbles: true, cancelable: true }))
            el.dispatchEvent(new KeyboardEvent('keyup', { key: ' ', code: 'Space', keyCode: 32, bubbles: true, cancelable: true }))
            await new Promise(r => setTimeout(r, 80))
            el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', keyCode: 13, bubbles: true, cancelable: true }))
            el.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter', code: 'Enter', keyCode: 13, bubbles: true, cancelable: true }))
            await new Promise(r => setTimeout(r, 200))
            if (verifyActionApplied(fail.action)) {
              panel.logToConsole(`> [REPLAN] ✅ Estratégia 3 OK: ${label}`, 'text-green')
              continue
            }
          }
        } catch {}
      }

      // ESTRATÉGIA 4: Vue/React internals via <script> injection com acesso a instâncias
      if (a.t === 'clk' || a.t === 'chk' || a.t === 'val') {
        panel.logToConsole(`> [REPLAN] Estratégia 4: internals Vue/React via script injection...`, 'text-blue')
        try {
          const el = findElementExt(elId, valHint) || findElementExt(elId.replace(/[^\w\s]/g, ' ').trim(), valHint)
          if (el) {
            let scriptTid = el.id
            const hadId = !!scriptTid
            if (!scriptTid) {
              scriptTid = `__eq_s4_${Math.random().toString(36).slice(2, 8)}`
              el.id = scriptTid
            }
            const valStr = String(a.v ?? '')
            const isVal = a.t === 'val'
            const script = document.createElement('script')
            script.textContent = `(function(){
              var el=document.getElementById(${JSON.stringify(scriptTid)});
              if(!el)return;
              // Tenta Vue 3 update trigger
              try{if(el.__vueParentComponent){var ins=el.__vueParentComponent;var pr=ins.props||{};if(pr.modelValue!==undefined&&typeof ins.emit==='function'){ins.emit('update:modelValue',${isVal ? JSON.stringify(valStr) : 'true'});}}}catch(e){}
              // Tenta React setState via fiber
              try{var fk=Object.keys(el).find(function(k){return k.startsWith('__reactFiber');});
              if(fk){var fb=el[fk];while(fb){var p=fb.memoizedProps||{};
              if(typeof p.onChange==='function')try{p.onChange({target:el,currentTarget:el,type:'change',bubbles:true,preventDefault:function(){},stopPropagation:function(){}});}catch(e){}
              if(typeof p.onInput==='function')try{p.onInput({target:el,currentTarget:el,type:'input',bubbles:true,preventDefault:function(){},stopPropagation:function(){}});}catch(e){}
              fb=fb.return;}}}catch(e){}
            })()`.replace(/\n\s+/g, '')
            document.head.appendChild(script)
            script.remove()
            if (!hadId) setTimeout(() => { try { if (el.id === scriptTid) el.removeAttribute('id') } catch {} }, 0)
            await new Promise(r => setTimeout(r, 300))
            if (verifyActionApplied(fail.action)) {
              panel.logToConsole(`> [REPLAN] ✅ Estratégia 4 OK: ${label}`, 'text-green')
              continue
            }
          }
        } catch {}
      }

      // ESTRATÉGIA 5: Re-consulta IA com contexto de diagnóstico rico + pedido de JS customizado
      if (signal?.aborted) return
      panel.logToConsole(`> [REPLAN] Estratégia 5: re-consulta IA com diagnóstico focado...`, 'text-blue')

      try {
        let domSnap = ''
        try {
          const el = document.querySelector(`[data-easyquiz-id="${a.id}"]`) ||
            document.getElementById(a.id || '') ||
            Array.from(document.querySelectorAll('input, button, [role="radio"], [role="checkbox"], [role="option"]'))
              .find(e => (e.textContent || '').toLowerCase().includes(String(a.id || '').toLowerCase().slice(0, 20)))
          if (el) domSnap = (el as HTMLElement).outerHTML.slice(0, 400)
        } catch {}

        const ctx = captureCurrentContext(false) || captureFullPageText()
        const failDescription = `Ação (${a.t}) alvo="${elId}" valor="${a.v || a.c || ''}" — Falha: "${fail.evidence.slice(0, 80)}"${domSnap ? `\nHTML do alvo: ${domSnap}` : ''}`
        const strategiesAttempted = (fail as any).strategiesAttempted ? [(fail as any).strategiesAttempted].flat().concat(['alternative-path', 'injectScript', 'keyboard', 'vue-react-internals']) : ['alternative-path', 'injectScript', 'keyboard', 'vue-react-internals']

        const replanPrompt = `[REPLANEJAMENTO URGENTE — TENTATIVA FINAL]
A seguinte ação falhou após ${strategiesAttempted.length} estratégias automáticas: ${strategiesAttempted.join(', ')}.

${failDescription}

Contexto atual da questão:
${ctx?.questionText.slice(0, 400) || 'N/A'}

Controles disponíveis:
${JSON.stringify((ctx?.controls || []).slice(0, 6).map(c => ({ id: c.id, type: c.type, label: c.label, options: c.options?.slice(0, 3) })), null, 2)}

TAREFA: Gere APENAS ações {t:"js"} com JavaScript criativo e robusto que consiga marcar/preencher/clicar o controle correto. 
Tente usar: document.querySelector, getComputedStyle, querySelectorAll com seletores diferentes, ou manipulação DOM direta.
Você pode tentar múltiplas abordagens em um único bloco JS. Seja criativo.
NÃO repita as estratégias já tentadas acima.`

        const replanCtx = { ...ctx!, questionText: replanPrompt }
        const replanResult = await analyzeWithGemini(
          replanCtx, [], { ...settings },
          (msg) => panel.logToConsole(`> [REPLAN-AI] ${msg}`, 'text-blue'),
          signal,
        )

        if (signal?.aborted || !replanResult?.plan) {
          panel.logToConsole('> [REPLAN] ✗ Re-consulta não retornou plano.', 'text-yellow')
          continue
        }

        const jsActions = replanResult.plan.actions.filter(a => a.t === 'js')
        if (jsActions.length === 0) {
          panel.logToConsole('> [REPLAN] ℹ️ IA não gerou ações JS de fallback.', 'text-yellow')
          continue
        }

        panel.logToConsole(`> [REPLAN] 🤖 IA gerou ${jsActions.length} ação(ões) JS custom. Executando...`, 'text-blue')
        const fallbackPlan: AnalysisPlan = { ...latestPlan, actions: jsActions, pageType: 'question' }
        const fallbackResult = await executePlan(fallbackPlan, false, 1, createExecutionPolicy(settings))
        if (fallbackResult.applied > 0) {
          panel.logToConsole(`> [REPLAN] ✅ Estratégia 5 OK: ${fallbackResult.applied} ação(ões) JS executada(s)!`, 'text-green')
        } else {
          panel.logToConsole('> [REPLAN] ✗ Todas as estratégias esgotadas para esta ação.', 'text-yellow')
        }
      } catch (e) {
        panel.logToConsole(`> [REPLAN] Erro na re-consulta: ${e instanceof Error ? e.message : String(e)}`, 'text-yellow')
      }
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
