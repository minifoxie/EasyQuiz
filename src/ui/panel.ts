import type { AnalysisPlan, CapturedContext, EasyQuizSettings, ResponseMode, ExecutionEngine, ModelOption, ActivityMetrics, QuestionTimingRecord } from '../core/types'
import type { ExecutionResult } from '../dom/executor'
import { AVAILABLE_MODELS, fetchAvailableModels, testApiKey, isValidQuizModel, keyManager, KeyManager } from '../core/gemini'
import { clearSessionMemories, getSessionMemories, resetAllData, loadActivityMetrics, resetActivityMetrics } from '../core/storage'
import { Autopilot } from '../dom/autopilot'
import { FloatingAnswersHud } from './floatingHud'
import { ICONS } from './icons'
import { PANEL_STYLES } from './styles'

export interface PanelCallbacks {
  onAnalyze: (attempt?: number, signal?: AbortSignal) => Promise<AnalysisPlan | void>
  onApply: (attempt?: number) => void
  onDestroy: () => void
  onSettingsChange: (settings: Partial<EasyQuizSettings>) => void
  onCancel?: () => void
}

const RESPONSE_MODE_LABELS: Array<{ value: '' | ResponseMode; label: string }> = [
  { value: '', label: 'Detecção Automática' },
  { value: 'escolha_unica', label: 'Múltipla Escolha (Única)' },
  { value: 'escolha_multipla', label: 'Múltipla Escolha (Várias)' },
  { value: 'categorizacao', label: 'Categorização / Grupos' },
  { value: 'arrastar_soltar', label: 'Arrastar e Soltar (Drag & Drop)' },
  { value: 'ordenacao', label: 'Ordenação / Sequência' },
  { value: 'verdadeiro_falso', label: 'Verdadeiro / Falso' },
  { value: 'texto_livre', label: 'Texto Livre / Dissertativa' },
  { value: 'preenchimento', label: 'Preenchimento de Lacunas' },
]

const ENGINE_LABELS: Array<{ value: ExecutionEngine; label: string }> = [
  { value: 'smart', label: 'Inteligente (Auto-Híbrido)' },
  { value: 'command', label: 'Apenas Comando (Seguro)' },
  { value: 'javascript', label: 'Apenas JS Nativo (Avançado)' },
]

export class EasyQuizPanel {
  private host: HTMLElement
  private shadow: ShadowRoot
  private callbacks: PanelCallbacks
  private autopilot: Autopilot
  private floatingAnswers: FloatingAnswersHud
  private initialSettings: EasyQuizSettings
  private isCollapsed: boolean = false
  private activeTab: 'resolver' | 'brain' | 'metrics' | 'debug' | 'settings' = 'resolver'
  private isBusy: boolean = false
  private stopwatchInterval: any = null
  private stopwatchStartTime: number = 0
  private latestPlan: AnalysisPlan | null = null
  private latestContext: CapturedContext | null = null
  private latestPromptText: string = ''

  // Métricas & Cronômetro
  private metricsLiveTime!: HTMLElement
  private metricsLiveStatus!: HTMLElement
  private metricsTotalBadge!: HTMLElement
  private metricTotalTime!: HTMLElement
  private metricAvgTime!: HTMLElement
  private metricTotalCount!: HTMLElement
  private metricsHistoryList!: HTMLElement
  private metricsHistoryCount!: HTMLElement
  private metricsCopyBtn!: HTMLButtonElement
  private metricsResetBtn!: HTMLButtonElement
  private currentQuestionStartTime: number = 0
  private questionLiveTimerInterval: any = null

  // Debug & Terminal Elements
  private liveDebugTerminal: HTMLElement
  private dbgModel: HTMLElement
  private dbgLatency: HTMLElement
  private dbgSplitTokens: HTMLElement
  private dbgTotalTokens: HTMLElement
  private dbgErrorCard: HTMLElement
  private dbgErrorText: HTMLElement
  private dbgPromptLen: HTMLElement
  private dbgPromptView: HTMLElement
  private dbgContextView: HTMLElement
  private dbgRawRespView: HTMLElement
  private dbgCountAll: HTMLElement
  private dbgCountError: HTMLElement
  private dbgCountAi: HTMLElement
  private dbgCountDom: HTMLElement
  private logEntries: Array<{
    id: number
    timestamp: string
    message: string
    colorClass?: string
    category: 'all' | 'error' | 'ai' | 'dom'
  }> = []
  private activeLogFilter: 'all' | 'error' | 'ai' | 'dom' = 'all'
  private autoScrollLogs: boolean = true
  private lastErrorMsg: string | null = null

  // Barra de Progresso
  private progressContainer: HTMLElement
  private progressBar: HTMLElement
  private progressLabel: HTMLElement
  private progressVal: HTMLElement

  // Árvore de Contexto
  private contextTreeContainer: HTMLElement

  // Elementos do Layout
  private launcherBtn: HTMLButtonElement
  private launcherDot: HTMLElement
  private dockToggleBtn: HTMLButtonElement
  private sidebarEl: HTMLElement
  private apToggleBtn: HTMLButtonElement
  private apConsole: HTMLElement
  private executionConsole: HTMLElement

  // Status & Stopwatch
  private dotPulseAp: HTMLElement
  private statusTextAp: HTMLElement
  private stopwatchAp: HTMLElement
  private dotPulseAdv: HTMLElement
  private statusTextAdv: HTMLElement
  private stopwatchAdv: HTMLElement

  // Inspector Elements
  private inspModel: HTMLElement
  private inspLatency: HTMLElement
  private inspTokens: HTMLElement
  private inspPrompt: HTMLElement
  private inspRationale: HTMLElement
  private inspActions: HTMLElement
  private copyPromptBtn: HTMLButtonElement

  // Form Controls
  private apiKeyInput: HTMLInputElement
  private keyContextMenu: HTMLElement
  private keyMoreBtn: HTMLButtonElement
  private keysListEl: HTMLElement
  private keysBadgeEl: HTMLElement
  private modelSelect: HTMLSelectElement
  private modeSelect: HTMLSelectElement
  private engineSelect: HTMLSelectElement
  private dryRunCheckbox: HTMLInputElement
  private autoApplyCheckbox: HTMLInputElement
  private autoAdvanceCheckbox: HTMLInputElement
  private hostDarkModeCheckbox: HTMLInputElement
  private useVisionCheckbox: HTMLInputElement
  private analyzeBtn: HTMLButtonElement
  private applyBtn: HTMLButtonElement
  private resultContainer: HTMLElement

  constructor(initialSettings: EasyQuizSettings, callbacks: PanelCallbacks) {
    this.initialSettings = initialSettings
    this.callbacks = callbacks

    this.autopilot = new Autopilot({
      onStatusChange: (status, msg, colorClass) => {
        this.logToConsole(msg, colorClass)
        if (status === 'analyzing') {
          this.setBusy(true, 'Autopilot: IA analisando...')
        } else if (status === 'advancing' || status === 'waiting') {
          this.setBusy(false)
          this.updateAutopilotUi(true)
        } else if (status === 'idle') {
          this.setBusy(false)
          this.updateAutopilotUi(false)
          if (msg.includes('conclusão') || msg.includes('finalizada') || msg.includes('Parabéns')) {
            this.setStatus('Atividade concluída com sucesso! Autopilot finalizado.', 'success')
          } else {
            this.setStatus('Autopilot desativado.', 'info')
          }
        } else if (status === 'error') {
          this.setBusy(false)
          this.updateAutopilotUi(false)
          this.setStatus('Autopilot interrompido por erro.', 'error')
        }
      },
      onRequestAnalysis: async (attempt?: number, signal?: AbortSignal) => {
        try {
          const plan = await this.callbacks.onAnalyze(attempt, signal)
          return plan || null
        } catch {
          return null
        }
      },
      isManualModeActive: () => {
        return this.floatingAnswers?.isOpen() ?? false
      },
      onPageAdvance: () => {
        this.floatingAnswers?.hide()
      },
    })

    this.host = document.createElement('div')
    this.host.id = 'easyquiz-shadow-root'
    this.host.style.position = 'fixed'
    this.host.style.top = '0'
    this.host.style.left = '0'
    this.host.style.width = '100vw'
    this.host.style.height = '100vh'
    this.host.style.zIndex = '2147483647'
    this.host.style.pointerEvents = 'none'

    this.shadow = this.host.attachShadow({ mode: 'open' })

    this.shadow.innerHTML = `
      <style>${PANEL_STYLES}</style>

      <!-- Botão Flutuante Inferior Renovado (Cápsula com Status ao Vivo) -->
      <button class="eq-launcher" type="button" title="Abrir / Recolher EasyQuiz (Alt+Q)">
        <span class="eq-launcher-icon">${ICONS.logo}</span>
        <span>EasyQuiz</span>
        <span class="eq-launcher-dot" id="eq-launcher-dot"></span>
      </button>

      <!-- Sidebar Fixa Lateral Direita Estilo VS Code -->
      <aside class="eq-sidebar" aria-label="EasyQuiz Sidebar">
        <!-- Aba Retrátil na Borda Esquerda -->
        <button class="eq-dock-toggle" id="eq-dock-toggle" type="button" title="Recolher / Expandir Painel (Alt+Q)">
          <span class="eq-dock-toggle-icon">${ICONS.chevronRight}</span>
          <span class="eq-dock-toggle-label">EQ</span>
        </button>
           <!-- Activity Bar Vertical na Esquerda (Estilo VS Code - Apenas Ícones) -->
          <nav class="eq-activity-bar" role="tablist" aria-label="Atalhos">
            <div class="eq-activity-top">
              <button class="eq-activity-btn active" id="eq-tab-resolver" role="tab" title="Resolver (Operações Atuais)">
                <span class="eq-activity-indicator"></span>
                <span class="eq-activity-icon">${ICONS.rocket}</span>
              </button>

              <button class="eq-activity-btn" id="eq-tab-brain" role="tab" title="Cérebro da IA (Contexto e Inspeção)">
                <span class="eq-activity-indicator"></span>
                <span class="eq-activity-icon">${ICONS.chip}</span>
              </button>

              <button class="eq-activity-btn" id="eq-tab-metrics" role="tab" title="Métricas & Cronômetro (Tempo por Questão e Histórico)">
                <span class="eq-activity-indicator"></span>
                <span class="eq-activity-icon">${ICONS.stopwatch}</span>
              </button>

              <button class="eq-activity-btn" id="eq-tab-debug" role="tab" title="Terminal & Debug Output (Logs, Tokens, Prompts, Erros)">
                <span class="eq-activity-indicator"></span>
                <span class="eq-activity-icon">${ICONS.terminal}</span>
              </button>
            </div>

            <div class="eq-activity-bottom">
              <button class="eq-activity-btn" id="eq-tab-settings" role="tab" title="Configurações e Ajustes Avançados">
                <span class="eq-activity-indicator"></span>
                <span class="eq-activity-icon">${ICONS.settings}</span>
              </button>
            </div>
          </nav>

          <!-- Corpo Principal da Sidebar -->
          <main class="eq-sidebar-body">
            <!-- Cabeçalho VS Code -->
            <header class="eq-header">
              <div class="eq-brand">
                <span class="eq-brand-icon">${ICONS.logo}</span>
                <span class="eq-brand-name">EasyQuiz</span>
                <span class="eq-brand-badge">SUPREME</span>
                <span id="eq-active-model-badge" style="display:none; font-size:9px; font-weight:700; padding:1px 5px; border-radius:3px; background:rgba(88,101,242,0.2); border:1px solid rgba(88,101,242,0.4); color:#7983f5; letter-spacing:0.04em; white-space:nowrap;"></span>
              </div>
              <div class="eq-header-tools">
                <button class="eq-icon-btn" id="eq-min-btn" type="button" title="Minimizar (Alt+Q)">${ICONS.chevronRight}</button>
                <button class="eq-icon-btn" id="eq-close-btn" type="button" title="Fechar">${ICONS.close}</button>
              </div>
            </header>

            <!-- Barra de Carregamento / Progresso Dinâmica -->
            <div class="eq-progress-container" id="eq-progress-container" style="display: none;">
              <div class="eq-progress-info">
                <span class="eq-progress-label" id="eq-progress-label">Processando...</span>
                <span class="eq-progress-val" id="eq-progress-val">0%</span>
              </div>
              <div class="eq-progress-track">
                <div class="eq-progress-bar" id="eq-progress-bar" style="width: 0%;"></div>
              </div>
            </div>

            <div class="eq-views-wrapper">
              
              <!-- TAB 1: RESOLVER -->
              <div class="eq-view-pane" id="eq-view-resolver">
                <div class="eq-operation-header">
                  <div>
                    <div class="eq-eyebrow">OPERAÇÃO ATUAL</div>
                    <h1 class="eq-operation-title">Resolver questão</h1>
                    <p class="eq-operation-subtitle">Analise o contexto e aplique a resposta sugerida.</p>
                  </div>
                  <span class="eq-operation-state" id="eq-operation-state">Pronto</span>
                </div>

                <div class="eq-operation-actions">
                  <button class="eq-btn-primary" id="eq-analyze-btn" type="button">${ICONS.analyze} Analisar questão</button>
                  <button class="eq-btn-secondary" id="eq-apply-btn" type="button">${ICONS.apply} Aplicar respostas</button>
                </div>

                <div style="display: flex; gap: 8px; width: 100%; align-items: center;">
                  <button class="eq-btn-primary" id="eq-ap-toggle-btn" type="button" style="flex: 1;">
                    ${ICONS.play} INICIAR AUTOPILOT
                  </button>
                </div>

                <div id="eq-result" class="eq-operation-result" style="display: none; flex-direction: column; gap: 10px;">
                  <div class="eq-section-title">Plano e respostas</div>
                  <div class="eq-badges" id="eq-badges"></div>
                  <div class="eq-rationale-card" id="eq-rationale-text"></div>
                  <div class="eq-action-list" id="eq-actions-list"></div>
                  
                  <div class="eq-execution-card" id="eq-execution-card" hidden>
                    <div class="eq-section-title">Execução e evidências</div>
                    <div class="eq-execution-placeholder" id="eq-execution-placeholder" style="display: none;"></div>
                    <div class="eq-execution-summary" id="eq-execution-summary"></div>
                    <div class="eq-execution-list" id="eq-execution-list"></div>
                  </div>
                  <button class="eq-btn-secondary" id="eq-open-hud-btn" type="button">${ICONS.list} Abrir respostas disponíveis</button>
                </div>

                <!-- Status & Stopwatch Card -->
                <div class="eq-status-card">
                  <div class="eq-status-card-header">
                    <div class="eq-ai-indicator">
                      <span class="eq-dot-pulse" id="eq-dot-ap"></span>
                      <span>Status da IA</span>
                    </div>
                    <div class="eq-stopwatch" id="eq-stopwatch-ap">
                      ${ICONS.clock} <span>0.00s</span>
                    </div>
                  </div>
                  <div class="eq-status-text" id="eq-status-text-ap">
                    Pronto para iniciar. O Autopilot responderá e avançará as questões de forma automática.
                  </div>
                </div>

                <!-- Console Terminal Oculto (Apenas para Autopilot Interno) -->
                <div class="eq-terminal" id="eq-ap-console" style="display: none;"></div>
                <div class="eq-terminal eq-terminal-execution" id="eq-execution-console" style="display: none;"></div>
                
                <div class="eq-footer-note" style="margin-top: auto;">Híbrido 4.0 • RAG + AST + Vision (Opt-in)</div>
              </div>

              <!-- TAB 2: CÉREBRO DA IA -->
              <div class="eq-view-pane" id="eq-view-brain" style="display: none;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <div class="eq-section-title" style="margin: 0;">
                    <span>Explorador de Contexto & RAG</span>
                  </div>
                  <div style="display: flex; gap: 4px;">
                    <button class="eq-icon-btn" id="eq-refresh-context-btn" type="button" title="Atualizar Varredura em Tempo Real" style="width: 28px; height: 28px;">
                      ${ICONS.refresh}
                    </button>
                    <button class="eq-icon-btn" id="eq-ap-clear-memory" type="button" title="Limpar Memória Contextual (RAG)" style="width: 28px; height: 28px; color: #ff5555;">
                      ${ICONS.eraser}
                    </button>
                  </div>
                </div>

                <div class="eq-tree-container" id="eq-tree-container">
                  <div class="text-muted" style="padding: 8px 0;">Aguardando análise da questão...</div>
                </div>

                <div class="eq-inspector-meta">
                  <div class="eq-meta-box">
                    <div class="eq-meta-title">Modelo IA</div>
                    <div class="eq-meta-val" id="eq-insp-model">--</div>
                  </div>
                  <div class="eq-meta-box">
                    <div class="eq-meta-title">Latência</div>
                    <div class="eq-meta-val" id="eq-insp-latency">--</div>
                  </div>
                  <div class="eq-meta-box">
                    <div class="eq-meta-title">Tokens</div>
                    <div class="eq-meta-val" id="eq-insp-tokens">--</div>
                  </div>
                </div>

                <div class="eq-field-group">
                  <div class="eq-section-title">
                    <span>Prompt Enviado (Sistema)</span>
                    <button class="eq-btn-secondary" id="eq-copy-prompt-btn" type="button" style="height: 26px; padding: 0 8px; font-size: 11px;">
                      ${ICONS.copy} Copiar
                    </button>
                  </div>
                  <div class="eq-code-block" id="eq-insp-prompt">Nenhuma consulta realizada.</div>
                </div>

                <div class="eq-field-group">
                  <div class="eq-section-title">Raciocínio Bruto (Resposta)</div>
                  <div class="eq-rationale-card" id="eq-insp-rationale">Aguardando resposta da IA...</div>
                </div>
                
                <div class="eq-field-group" style="display: none;">
                  <div class="eq-action-list" id="eq-insp-actions"></div>
                </div>

                <div class="eq-footer-note" style="margin-top: auto;">Inspetor em Tempo Real • 100% Transparente</div>
              </div>

              <!-- TAB 3: MÉTRICAS & CRONÔMETRO -->
              <div class="eq-view-pane" id="eq-view-metrics" style="display: none;">
                <div class="eq-operation-header">
                  <div>
                    <div class="eq-eyebrow">ESTATÍSTICAS & CRONÔMETRO</div>
                    <h1 class="eq-operation-title" style="font-size: 15px;">Tempo e Rendimento</h1>
                    <p class="eq-operation-subtitle">Monitore o tempo de resposta por questão e o rendimento total.</p>
                  </div>
                  <span class="eq-brand-badge" id="eq-metrics-total-badge" style="background: rgba(0, 122, 204, 0.2); color: #0098ff;">0 Questões</span>
                </div>

                <!-- Cronômetro em Tempo Real da Questão Atual -->
                <div class="eq-live-stopwatch-box">
                  <div class="eq-live-stopwatch-header">
                    <span class="eq-live-stopwatch-label">CRONÔMETRO AO VIVO</span>
                    <span class="eq-live-stopwatch-status" id="eq-metrics-live-status">Em espera</span>
                  </div>
                  <div class="eq-live-stopwatch-time" id="eq-metrics-live-time">00:00.00</div>
                  <div class="eq-live-stopwatch-hint">Tempo decorrido na questão ativa (0 tokens extras consumidos)</div>
                </div>

                <!-- Grade de Cartões de Resumo (3 Colunas) -->
                <div class="eq-metrics-grid">
                  <div class="eq-metric-card">
                    <div class="eq-metric-card-title">Tempo Total</div>
                    <div class="eq-metric-card-val" id="eq-metric-total-time">00:00</div>
                    <div class="eq-metric-card-sub">Duração da sessão</div>
                  </div>
                  <div class="eq-metric-card">
                    <div class="eq-metric-card-title">Média / Questão</div>
                    <div class="eq-metric-card-val" id="eq-metric-avg-time">0.0s</div>
                    <div class="eq-metric-card-sub">Ritmo médio</div>
                  </div>
                  <div class="eq-metric-card">
                    <div class="eq-metric-card-title">Respondidas</div>
                    <div class="eq-metric-card-val" id="eq-metric-total-count">0</div>
                    <div class="eq-metric-card-sub">Questões concluídas</div>
                  </div>
                </div>

                <!-- Barra de Ações Rápidas -->
                <div class="eq-metrics-actions">
                  <button class="eq-btn-secondary" id="eq-metrics-copy-btn" type="button">
                    ${ICONS.copy} Copiar Relatório
                  </button>
                  <button class="eq-btn-secondary danger" id="eq-metrics-reset-btn" type="button">
                    ${ICONS.trash} Zerar Métricas
                  </button>
                </div>

                <!-- Histórico Detalhado de Respostas -->
                <div class="eq-field-group" style="flex: 1; display: flex; flex-direction: column; min-height: 180px;">
                  <div class="eq-section-title">
                    <span>Histórico Detalhado por Questão</span>
                    <span class="eq-item-badge" id="eq-metrics-history-count">0 registros</span>
                  </div>
                  <div class="eq-metrics-history-list" id="eq-metrics-history-list">
                    <div class="eq-metrics-empty">Nenhuma questão respondida nesta sessão ainda.</div>
                  </div>
                </div>

                <div class="eq-footer-note" style="margin-top: auto;">Métricas calculadas nativamente no navegador • 100% livre de consumo de tokens</div>
              </div>

              <!-- TAB 4: DEBUG OUTPUT & TERMINAL -->
              <div class="eq-view-pane" id="eq-view-debug" style="display: none;">
                <!-- Cabeçalho da Aba -->
                <div class="eq-operation-header" style="margin-bottom: 8px;">
                  <div>
                    <div class="eq-eyebrow">TERMINAL & AUDITORIA</div>
                    <h1 class="eq-operation-title" style="font-size: 15px;">Debug Output</h1>
                    <p class="eq-operation-subtitle">Logs em tempo real, métricas de tokens e payloads brutos.</p>
                  </div>
                  <span class="eq-brand-badge" id="eq-debug-badge" style="background: rgba(0, 122, 204, 0.2); color: #0098ff;">ATIVO</span>
                </div>

                <!-- Grid 4 Métricas de Tokens / Desempenho -->
                <div class="eq-token-grid">
                  <div class="eq-token-box">
                    <div class="eq-token-title">Modelo</div>
                    <div class="eq-token-val" id="eq-dbg-model">--</div>
                  </div>
                  <div class="eq-token-box">
                    <div class="eq-token-title">Latência</div>
                    <div class="eq-token-val" id="eq-dbg-latency">--</div>
                  </div>
                  <div class="eq-token-box">
                    <div class="eq-token-title">Prompt / Resp</div>
                    <div class="eq-token-val" id="eq-dbg-split-tokens">-- / --</div>
                  </div>
                  <div class="eq-token-box">
                    <div class="eq-token-title">Total Tokens</div>
                    <div class="eq-token-val" id="eq-dbg-total-tokens" style="color: #4ec9b0;">--</div>
                  </div>
                </div>

                <!-- Alerta de Erro Recente (Se houver) -->
                <div class="eq-debug-error-card" id="eq-dbg-error-card" style="display: none;">
                  <div class="eq-debug-error-header">
                    <span>⚠️ Último Erro / Falha Registrada</span>
                    <button class="eq-icon-btn" id="eq-dbg-copy-error-btn" type="button" title="Copiar Erro" style="width: 20px; height: 20px;">
                      ${ICONS.copy}
                    </button>
                  </div>
                  <div class="eq-debug-error-msg" id="eq-dbg-error-text"></div>
                </div>

                <!-- Terminal Interativo ao Vivo -->
                <div class="eq-field-group" style="gap: 6px;">
                  <div class="eq-debug-toolbar">
                    <div class="eq-filter-chips">
                      <button class="eq-filter-chip active" id="eq-dbg-filter-all" type="button">Todos (<span id="eq-dbg-count-all">0</span>)</button>
                      <button class="eq-filter-chip" id="eq-dbg-filter-error" type="button">Erros (<span id="eq-dbg-count-error">0</span>)</button>
                      <button class="eq-filter-chip" id="eq-dbg-filter-ai" type="button">IA (<span id="eq-dbg-count-ai">0</span>)</button>
                      <button class="eq-filter-chip" id="eq-dbg-filter-dom" type="button">DOM / Exec (<span id="eq-dbg-count-dom">0</span>)</button>
                    </div>
                    <div class="eq-debug-toolbar-actions">
                      <button class="eq-icon-btn" id="eq-dbg-scroll-toggle" type="button" title="Auto-Scroll Ligado (Clique para alternar)" style="width: 26px; height: 26px; color: #00ffcc;">
                        ↓
                      </button>
                      <button class="eq-icon-btn" id="eq-dbg-copy-logs" type="button" title="Copiar Logs Atuais" style="width: 26px; height: 26px;">
                        ${ICONS.copy}
                      </button>
                      <button class="eq-icon-btn" id="eq-dbg-clear-logs" type="button" title="Limpar Console" style="width: 26px; height: 26px; color: #ff5555;">
                        ${ICONS.eraser}
                      </button>
                    </div>
                  </div>

                  <div class="eq-terminal" id="eq-live-debug-terminal" style="height: 180px;">
                    <div class="text-blue">> [SYS] Terminal de auditoria EasyQuiz pronto.</div>
                  </div>
                </div>

                <!-- Prompt Bruto Enviado (Raw) -->
                <div class="eq-field-group">
                  <div class="eq-section-title">
                    <span>Prompt Enviado à IA (Raw)</span>
                    <div style="display: flex; gap: 6px; align-items: center;">
                      <span class="text-muted" id="eq-dbg-prompt-len" style="font-size: 10px;">0 chars</span>
                      <button class="eq-btn-secondary" id="eq-dbg-copy-prompt" type="button" style="height: 24px; padding: 0 6px; font-size: 10px;">
                        ${ICONS.copy} Copiar
                      </button>
                    </div>
                  </div>
                  <div class="eq-code-block" id="eq-dbg-prompt-view" style="max-height: 120px;">Nenhum prompt registrado ainda.</div>
                </div>

                <!-- Contexto & Escopo Injetado -->
                <div class="eq-field-group">
                  <div class="eq-section-title">
                    <span>Contexto & Escopo Injetado</span>
                    <button class="eq-btn-secondary" id="eq-dbg-copy-context" type="button" style="height: 24px; padding: 0 6px; font-size: 10px;">
                      ${ICONS.copy} Copiar JSON
                    </button>
                  </div>
                  <div class="eq-code-block" id="eq-dbg-context-view" style="max-height: 110px;">Aguardando captura de contexto...</div>
                </div>

                <!-- Resposta Bruta da IA -->
                <div class="eq-field-group">
                  <div class="eq-section-title">
                    <span>Resposta Bruta da IA (Raw Output)</span>
                    <button class="eq-btn-secondary" id="eq-dbg-copy-raw-resp" type="button" style="height: 24px; padding: 0 6px; font-size: 10px;">
                      ${ICONS.copy} Copiar Resposta
                    </button>
                  </div>
                  <div class="eq-code-block" id="eq-dbg-raw-resp-view" style="max-height: 110px;">Aguardando retorno da API...</div>
                </div>

                <div class="eq-footer-note" style="margin-top: auto;">Debug Live Output • Auditoria Completa de Tokens e Payloads</div>
              </div>

              <!-- TAB 4: CONFIGURAÇÕES -->
              <div class="eq-view-pane" id="eq-view-settings" style="display: none;">
                <!-- Seção Multi-API Keys Gemini com Gerenciamento Completo -->
                <div class="eq-field-group">
                  <div class="eq-section-title" id="eq-keys-section-header">
                    <span style="display:flex;align-items:center;gap:6px;">
                      <span id="eq-keys-chevron" style="display:inline-flex;transition:transform 0.2s;">${ICONS.chevronRight}</span>
                      <span>Chaves Gemini</span>
                    </span>
                    <div style="display: flex; gap: 8px; align-items: center;">
                      <span id="eq-keys-badge" class="eq-key-badge ready">1 ativa</span>
                      <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" style="color: var(--eq-accent); text-decoration: none; font-size: 10px; font-weight: 800; letter-spacing: 0.05em; text-transform: uppercase;">
                        + Obter ↗
                      </a>
                    </div>
                  </div>

                  <!-- Lista Dinâmica de Chaves Cadastradas (colapsável) -->
                  <div id="eq-keys-collapsible" style="overflow: hidden; transition: max-height 0.25s ease;">
                  <div id="eq-keys-list" class="eq-keys-list"></div>
                  </div>

                  <!-- Formulário de Adição de Nova Chave -->
                  <div class="eq-key-input-container">
                    <div class="eq-input-wrap">
                      <span class="eq-input-prefix-icon">${ICONS.key}</span>
                      <input id="eq-api-key" class="eq-input" type="password" placeholder="Adicionar nova chave AIzaSy..." autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" />
                      <button class="eq-icon-btn" id="eq-key-save" type="button" title="Adicionar Chave">${ICONS.plus}</button>
                      <button class="eq-icon-btn" id="eq-key-more-btn" type="button" title="Mais Opções das Chaves">${ICONS.moreVertical}</button>
                    </div>

                    <!-- Context Menu Suspenso Dinâmico -->
                    <div class="eq-context-menu" id="eq-key-context-menu" hidden>
                      <button class="eq-context-item" id="eq-menu-prompt" type="button">
                        <span class="eq-item-icon">${ICONS.edit}</span>
                        <span class="eq-item-text">Inserir via Janela Nativa</span>
                        <span class="eq-item-badge">Bypass</span>
                      </button>
                      <button class="eq-context-item" id="eq-menu-paste" type="button">
                        <span class="eq-item-icon">${ICONS.paste}</span>
                        <span class="eq-item-text">Colar da Área de Transferência</span>
                      </button>
                      <button class="eq-context-item" id="eq-menu-toggle-vis" type="button">
                        <span class="eq-item-icon" id="eq-menu-vis-icon">${ICONS.eye}</span>
                        <span class="eq-item-text" id="eq-menu-vis-text">Mostrar/Ocultar Campo</span>
                      </button>
                      <button class="eq-context-item" id="eq-menu-clear" type="button">
                        <span class="eq-item-icon">${ICONS.eraser}</span>
                        <span class="eq-item-text">Limpar Campo</span>
                      </button>
                      <div class="eq-context-divider"></div>
                      <button class="eq-context-item" id="eq-menu-test" type="button">
                        <span class="eq-item-icon">${ICONS.sparkles}</span>
                        <span class="eq-item-text">Testar Todas as Chaves</span>
                      </button>
                      <button class="eq-context-item danger" id="eq-menu-reset" type="button">
                        <span class="eq-item-icon">${ICONS.trash}</span>
                        <span class="eq-item-text">Resetar Dados e Cache</span>
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Seleção de Modelos -->
                <div class="eq-field-group">
                  <div class="eq-section-title">Modelo Padrão</div>
                  <select id="eq-model-select" class="eq-select"></select>
                </div>
                
                <div class="eq-grid-2">
                  <div class="eq-field-group">
                    <div class="eq-section-title">Modo da Questão</div>
                    <select id="eq-mode-select" class="eq-select"></select>
                  </div>
                  <div class="eq-field-group">
                    <div class="eq-section-title">Motor de Execução</div>
                    <select id="eq-engine-select" class="eq-select"></select>
                  </div>
                </div>

                <!-- Preferências do Sistema -->
                <div class="eq-grid-2" style="margin-top: 8px;">
                  <label class="eq-checkbox-label">
                    <input id="eq-dry-run" type="checkbox" />
                    <span>Simular (Dry-Run)</span>
                  </label>
                  <label class="eq-checkbox-label">
                    <input id="eq-auto-apply" type="checkbox" />
                    <span>Auto Aplicar</span>
                  </label>
                </div>
                
                <label class="eq-checkbox-label">
                  <input id="eq-auto-advance" type="checkbox" />
                  <span>Auto Avançar Após Injetar</span>
                </label>

                <div class="eq-field-group" style="gap: 8px; margin-top: 8px;">
                  <label class="eq-checkbox-label">
                    <input id="eq-use-vision" type="checkbox" />
                    <span>Visão Computacional (Imagens)</span>
                  </label>

                  <label class="eq-checkbox-label" style="margin-top: 6px;">
                    <input id="eq-host-dark" type="checkbox" />
                    <span style="color: #00ffcc;">Habilitar Smart Dark Mode no Site</span>
                  </label>
                </div>

                <!-- Zona de Redefinição -->
                <div class="eq-field-group" style="margin-top: 14px; padding-top: 12px; border-top: 1px solid #282828;">
                  <div class="eq-section-title" style="color: #ff5555;">Zona de Redefinição</div>
                  <button class="eq-btn-secondary" id="eq-reset-all-btn" type="button" style="border-color: #662222; color: #ff8888;">
                    ${ICONS.trash} Resetar Todos os Dados e Memória
                  </button>
                </div>

                <div class="eq-footer-note" style="margin-top: auto;">Configurações salvas localmente no navegador</div>
              </div>
            </div>
          </main>
        </aside>
    `

    // Bindings de Layout
    this.launcherBtn = this.shadow.querySelector('.eq-launcher') as HTMLButtonElement
    this.launcherDot = this.shadow.querySelector('#eq-launcher-dot') as HTMLElement
    this.dockToggleBtn = this.shadow.querySelector('#eq-dock-toggle') as HTMLButtonElement
    this.sidebarEl = this.shadow.querySelector('.eq-sidebar') as HTMLElement
    this.apToggleBtn = this.shadow.querySelector('#eq-ap-toggle-btn') as HTMLButtonElement
    this.apConsole = this.shadow.querySelector('#eq-ap-console') as HTMLElement
    this.executionConsole = this.shadow.querySelector('#eq-execution-console') as HTMLElement

    // Barra de Progresso
    this.progressContainer = this.shadow.querySelector('#eq-progress-container') as HTMLElement
    this.progressBar = this.shadow.querySelector('#eq-progress-bar') as HTMLElement
    this.progressLabel = this.shadow.querySelector('#eq-progress-label') as HTMLElement
    this.progressVal = this.shadow.querySelector('#eq-progress-val') as HTMLElement

    // Árvore de Contexto
    this.contextTreeContainer = this.shadow.querySelector('#eq-tree-container') as HTMLElement

    // Status & Stopwatch
    this.dotPulseAp = this.shadow.querySelector('#eq-dot-ap') as HTMLElement
    this.statusTextAp = this.shadow.querySelector('#eq-status-text-ap') as HTMLElement
    this.stopwatchAp = this.shadow.querySelector('#eq-stopwatch-ap span') as HTMLElement
    // Note: Adv elements have been removed/merged, we assign them to AP elements to avoid breaking code logic
    this.dotPulseAdv = this.dotPulseAp
    this.statusTextAdv = this.statusTextAp
    this.stopwatchAdv = this.stopwatchAp

    // Inspetor
    this.inspModel = this.shadow.querySelector('#eq-insp-model') as HTMLElement
    this.inspLatency = this.shadow.querySelector('#eq-insp-latency') as HTMLElement
    this.inspTokens = this.shadow.querySelector('#eq-insp-tokens') as HTMLElement
    this.inspPrompt = this.shadow.querySelector('#eq-insp-prompt') as HTMLElement
    this.inspRationale = this.shadow.querySelector('#eq-insp-rationale') as HTMLElement
    this.inspActions = this.shadow.querySelector('#eq-insp-actions') as HTMLElement
    this.copyPromptBtn = this.shadow.querySelector('#eq-copy-prompt-btn') as HTMLButtonElement

    // Elementos da Aba Debug & Terminal
    this.liveDebugTerminal = this.shadow.querySelector('#eq-live-debug-terminal') as HTMLElement
    this.dbgModel = this.shadow.querySelector('#eq-dbg-model') as HTMLElement
    this.dbgLatency = this.shadow.querySelector('#eq-dbg-latency') as HTMLElement
    this.dbgSplitTokens = this.shadow.querySelector('#eq-dbg-split-tokens') as HTMLElement
    this.dbgTotalTokens = this.shadow.querySelector('#eq-dbg-total-tokens') as HTMLElement
    this.dbgErrorCard = this.shadow.querySelector('#eq-dbg-error-card') as HTMLElement
    this.dbgErrorText = this.shadow.querySelector('#eq-dbg-error-text') as HTMLElement
    this.dbgPromptLen = this.shadow.querySelector('#eq-dbg-prompt-len') as HTMLElement
    this.dbgPromptView = this.shadow.querySelector('#eq-dbg-prompt-view') as HTMLElement
    this.dbgContextView = this.shadow.querySelector('#eq-dbg-context-view') as HTMLElement
    this.dbgRawRespView = this.shadow.querySelector('#eq-dbg-raw-resp-view') as HTMLElement
    this.dbgCountAll = this.shadow.querySelector('#eq-dbg-count-all') as HTMLElement
    this.dbgCountError = this.shadow.querySelector('#eq-dbg-count-error') as HTMLElement
    this.dbgCountAi = this.shadow.querySelector('#eq-dbg-count-ai') as HTMLElement
    this.dbgCountDom = this.shadow.querySelector('#eq-dbg-count-dom') as HTMLElement

    // Controles de Formulário e Chave
    this.apiKeyInput = this.shadow.querySelector('#eq-api-key') as HTMLInputElement
    this.keyContextMenu = this.shadow.querySelector('#eq-key-context-menu') as HTMLElement
    this.keyMoreBtn = this.shadow.querySelector('#eq-key-more-btn') as HTMLButtonElement
    this.keysListEl = this.shadow.querySelector('#eq-keys-list') as HTMLElement
    this.keysBadgeEl = this.shadow.querySelector('#eq-keys-badge') as HTMLElement
    this.modelSelect = this.shadow.querySelector('#eq-model-select') as HTMLSelectElement
    this.modeSelect = this.shadow.querySelector('#eq-mode-select') as HTMLSelectElement
    this.engineSelect = this.shadow.querySelector('#eq-engine-select') as HTMLSelectElement
    this.dryRunCheckbox = this.shadow.querySelector('#eq-dry-run') as HTMLInputElement
    this.autoApplyCheckbox = this.shadow.querySelector('#eq-auto-apply') as HTMLInputElement
    this.autoAdvanceCheckbox = this.shadow.querySelector('#eq-auto-advance') as HTMLInputElement
    this.hostDarkModeCheckbox = this.shadow.querySelector('#eq-host-dark') as HTMLInputElement
    this.useVisionCheckbox = this.shadow.querySelector('#eq-use-vision') as HTMLInputElement
    this.analyzeBtn = this.shadow.querySelector('#eq-analyze-btn') as HTMLButtonElement
    this.applyBtn = this.shadow.querySelector('#eq-apply-btn') as HTMLButtonElement
    this.applyBtn.disabled = true
    this.resultContainer = this.shadow.querySelector('#eq-result') as HTMLElement

    // Instanciação do Gabarito Flutuante Arrastável e Minimizável
    this.floatingAnswers = new FloatingAnswersHud(this.shadow, () => {
      void this.callbacks.onAnalyze(1)
    })

    const openHudBtn = this.shadow.querySelector('#eq-open-hud-btn') as HTMLButtonElement | null
    if (openHudBtn) {
      openHudBtn.addEventListener('click', () => {
        if (this.latestPlan) {
          this.floatingAnswers.show(this.latestPlan)
        }
      })
    }

    // Preencher Selects
    AVAILABLE_MODELS.filter((m) => isValidQuizModel(m.id)).forEach((m) => this.modelSelect.add(new Option(m.name, m.id, false, m.id === initialSettings.model)))
    RESPONSE_MODE_LABELS.forEach((m) => this.modeSelect.add(new Option(m.label, m.value, false, m.value === initialSettings.modeHint)))
    ENGINE_LABELS.forEach((m) => this.engineSelect.add(new Option(m.label, m.value, false, m.value === initialSettings.engine)))

    // Inicializar Valores
    this.apiKeyInput.value = initialSettings.apiKey
    this.dryRunCheckbox.checked = initialSettings.dryRun
    this.autoApplyCheckbox.checked = initialSettings.autoApply
    this.autoAdvanceCheckbox.checked = initialSettings.autoAdvance
    this.hostDarkModeCheckbox.checked = initialSettings.hostDarkMode
    this.useVisionCheckbox.checked = initialSettings.useVision

    // Elementos da Aba de Métricas & Cronômetro
    this.metricsLiveTime = this.shadow.querySelector('#eq-metrics-live-time') as HTMLElement
    this.metricsLiveStatus = this.shadow.querySelector('#eq-metrics-live-status') as HTMLElement
    this.metricsTotalBadge = this.shadow.querySelector('#eq-metrics-total-badge') as HTMLElement
    this.metricTotalTime = this.shadow.querySelector('#eq-metric-total-time') as HTMLElement
    this.metricAvgTime = this.shadow.querySelector('#eq-metric-avg-time') as HTMLElement
    this.metricTotalCount = this.shadow.querySelector('#eq-metric-total-count') as HTMLElement
    this.metricsHistoryList = this.shadow.querySelector('#eq-metrics-history-list') as HTMLElement
    this.metricsHistoryCount = this.shadow.querySelector('#eq-metrics-history-count') as HTMLElement
    this.metricsCopyBtn = this.shadow.querySelector('#eq-metrics-copy-btn') as HTMLButtonElement
    this.metricsResetBtn = this.shadow.querySelector('#eq-metrics-reset-btn') as HTMLButtonElement

    this.setupEventListeners()
    this.updateTimingMetrics()
    document.body.appendChild(this.host)
    this.applyHostDarkMode(initialSettings.hostDarkMode)

    // Inicializar Pool Multi-API Key
    const initialRawKeys = Array.isArray(initialSettings.apiKeys) && initialSettings.apiKeys.length > 0
      ? initialSettings.apiKeys
      : (initialSettings.apiKey ? [initialSettings.apiKey] : [])
    keyManager.init(initialRawKeys)
    this.renderKeysList()

    // Atualização em tempo real do badge e status de cooldown a cada 1s quando nas configurações
    const cooldownInterval = window.setInterval(() => {
      if (this.activeTab === 'settings') {
        this.renderKeysList()
      }
    }, 1000)
    if (typeof (cooldownInterval as any)?.unref === 'function') {
      ;(cooldownInterval as any).unref()
    }

    // Se chave existir, listar modelos da conta do usuário
    const bestKey = keyManager.getBestKey() || initialSettings.apiKey
    if (bestKey) {
      fetchAvailableModels(bestKey)
        .then((models) => {
          if (models && models.length > 0) {
            this.updateModelSelect(models, initialSettings.model)
          }
        })
        .catch(() => {})
    }
  }

  private switchTab(tab: 'resolver' | 'brain' | 'metrics' | 'debug' | 'settings') {
    this.activeTab = tab
    const tabs: Array<'resolver' | 'brain' | 'metrics' | 'debug' | 'settings'> = [
      'resolver',
      'brain',
      'metrics',
      'debug',
      'settings',
    ]

    for (const t of tabs) {
      const btn = this.shadow.querySelector(`#eq-tab-${t}`) as HTMLElement
      const view = this.shadow.querySelector(`#eq-view-${t}`) as HTMLElement
      if (t === tab) {
        btn?.classList.add('active')
        if (view) view.style.display = 'flex'
      } else {
        btn?.classList.remove('active')
        if (view) view.style.display = 'none'
      }
    }

    if (tab === 'brain') {
      this.renderContextTree()
      this.refreshInspectorView()
    } else if (tab === 'metrics') {
      this.updateTimingMetrics()
    } else if (tab === 'debug') {
      this.refreshDebugView()
      this.renderTerminalEntries()
    }
  }

  private setupEventListeners(): void {
    // Abas do Activity Bar Vertical
    this.shadow.querySelector('#eq-tab-resolver')?.addEventListener('click', () => this.switchTab('resolver'))
    this.shadow.querySelector('#eq-tab-brain')?.addEventListener('click', () => this.switchTab('brain'))
    this.shadow.querySelector('#eq-tab-metrics')?.addEventListener('click', () => this.switchTab('metrics'))
    this.shadow.querySelector('#eq-tab-debug')?.addEventListener('click', () => this.switchTab('debug'))
    this.shadow.querySelector('#eq-tab-settings')?.addEventListener('click', () => this.switchTab('settings'))

    // Ações de Métricas & Cronômetro
    this.metricsResetBtn?.addEventListener('click', () => {
      resetActivityMetrics()
      this.stopQuestionTimer(0)
      this.currentQuestionStartTime = 0
      if (this.metricsLiveTime) this.metricsLiveTime.textContent = '00:00.00'
      if (this.metricsLiveStatus) {
        this.metricsLiveStatus.textContent = 'Em espera'
        this.metricsLiveStatus.classList.remove('active')
      }
      this.updateTimingMetrics()
      this.logToConsole('> [SYS] Métricas e histórico de tempo zerados com sucesso.', 'text-yellow')
    })
    this.metricsCopyBtn?.addEventListener('click', () => {
      this.copyMetricsReport()
    })

    // Filtros do Terminal de Debug
    this.shadow.querySelector('#eq-dbg-filter-all')?.addEventListener('click', () => this.setLogFilter('all'))
    this.shadow.querySelector('#eq-dbg-filter-error')?.addEventListener('click', () => this.setLogFilter('error'))
    this.shadow.querySelector('#eq-dbg-filter-ai')?.addEventListener('click', () => this.setLogFilter('ai'))
    this.shadow.querySelector('#eq-dbg-filter-dom')?.addEventListener('click', () => this.setLogFilter('dom'))

    // Ações do Terminal de Debug
    const scrollToggleBtn = this.shadow.querySelector('#eq-dbg-scroll-toggle') as HTMLButtonElement | null
    scrollToggleBtn?.addEventListener('click', () => {
      this.autoScrollLogs = !this.autoScrollLogs
      if (scrollToggleBtn) {
        scrollToggleBtn.style.color = this.autoScrollLogs ? '#00ffcc' : '#858585'
        scrollToggleBtn.title = this.autoScrollLogs ? 'Auto-Scroll Ligado (Clique para desligar)' : 'Auto-Scroll Desligado (Clique para ligar)'
      }
      if (this.autoScrollLogs && this.liveDebugTerminal) {
        this.liveDebugTerminal.scrollTop = this.liveDebugTerminal.scrollHeight
      }
    })

    const copyDbgLogsBtn = this.shadow.querySelector('#eq-dbg-copy-logs') as HTMLButtonElement | null
    copyDbgLogsBtn?.addEventListener('click', () => {
      const text = this.getFormattedLogs()
      navigator.clipboard.writeText(text).then(() => {
        const prev = copyDbgLogsBtn.innerHTML
        copyDbgLogsBtn.innerHTML = ICONS.check
        setTimeout(() => (copyDbgLogsBtn.innerHTML = prev), 1800)
      })
    })

    this.shadow.querySelector('#eq-dbg-clear-logs')?.addEventListener('click', () => {
      this.clearLogs()
    })

    const copyDbgPromptBtn = this.shadow.querySelector('#eq-dbg-copy-prompt') as HTMLButtonElement | null
    copyDbgPromptBtn?.addEventListener('click', () => {
      const text = this.latestPromptText || this.latestPlan?.promptSent || ''
      navigator.clipboard.writeText(text).then(() => {
        const prev = copyDbgPromptBtn.innerHTML
        copyDbgPromptBtn.innerHTML = `${ICONS.check} Copiado!`
        setTimeout(() => (copyDbgPromptBtn.innerHTML = prev), 1800)
      })
    })

    const copyDbgContextBtn = this.shadow.querySelector('#eq-dbg-copy-context') as HTMLButtonElement | null
    copyDbgContextBtn?.addEventListener('click', () => {
      const text = this.dbgContextView?.textContent || ''
      navigator.clipboard.writeText(text).then(() => {
        const prev = copyDbgContextBtn.innerHTML
        copyDbgContextBtn.innerHTML = `${ICONS.check} Copiado!`
        setTimeout(() => (copyDbgContextBtn.innerHTML = prev), 1800)
      })
    })

    const copyDbgRawRespBtn = this.shadow.querySelector('#eq-dbg-copy-raw-resp') as HTMLButtonElement | null
    copyDbgRawRespBtn?.addEventListener('click', () => {
      const text = this.latestPlan?.rawResponse || this.dbgRawRespView?.textContent || ''
      navigator.clipboard.writeText(text).then(() => {
        const prev = copyDbgRawRespBtn.innerHTML
        copyDbgRawRespBtn.innerHTML = `${ICONS.check} Copiado!`
        setTimeout(() => (copyDbgRawRespBtn.innerHTML = prev), 1800)
      })
    })

    const copyDbgErrorBtn = this.shadow.querySelector('#eq-dbg-copy-error-btn') as HTMLButtonElement | null
    copyDbgErrorBtn?.addEventListener('click', () => {
      const text = this.lastErrorMsg || ''
      navigator.clipboard.writeText(text).then(() => {
        const prev = copyDbgErrorBtn.innerHTML
        copyDbgErrorBtn.innerHTML = ICONS.check
        setTimeout(() => (copyDbgErrorBtn.innerHTML = prev), 1800)
      })
    })

    this.shadow.querySelector('#eq-refresh-context-btn')?.addEventListener('click', () => {
      this.renderContextTree()
    })

    // Toggle da Sidebar (Aba lateral e Launcher Flutuante)
    this.launcherBtn.addEventListener('click', () => this.toggle())
    this.dockToggleBtn.addEventListener('click', () => this.toggle())
    this.shadow.querySelector('#eq-min-btn')?.addEventListener('click', () => this.toggle(false))
    this.shadow.querySelector('#eq-close-btn')?.addEventListener('click', () => this.toggle(false))

    // Atalho de Teclado Alt+Q para recolher/expandir
    window.addEventListener(
      'keydown',
      (e) => {
        if (e.altKey && (e.key === 'q' || e.key === 'Q')) {
          e.preventDefault()
          this.toggle()
        }
      },
      true,
    )

    // ==== BLINDAGEM COMPLETA DE TECLADO CONTRA SITES DE EXAMES ====
    const keyboardCaptureShield = (e: KeyboardEvent) => {
      const path = e.composedPath()
      if (path.includes(this.sidebarEl) || path.includes(this.host)) {
        e.stopImmediatePropagation()
      }
    }
    window.addEventListener('keydown', keyboardCaptureShield, true)
    window.addEventListener('keyup', keyboardCaptureShield, true)
    window.addEventListener('keypress', keyboardCaptureShield, true)

    // Sincronização e digitação livre do campo de chave
    this.apiKeyInput.addEventListener('input', () => {
      const cleanVal = this.apiKeyInput.value.trim().replace(/^["']|["']$/g, '')
      this.callbacks.onSettingsChange({ apiKey: cleanVal })
    })

    // ===== COLLAPSE DA LISTA DE CHAVES =====
    const keysCollapsible = this.shadow.querySelector('#eq-keys-collapsible') as HTMLElement
    const keysChevron = this.shadow.querySelector('#eq-keys-chevron') as HTMLElement
    const keysSectionHeader = this.shadow.querySelector('#eq-keys-section-header') as HTMLElement

    const applyCollapseState = (collapsed: boolean) => {
      if (!keysCollapsible) return
      if (collapsed) {
        keysCollapsible.style.maxHeight = '0px'
        if (keysChevron) keysChevron.style.transform = 'rotate(0deg)'
      } else {
        keysCollapsible.style.maxHeight = keysCollapsible.scrollHeight + 50 + 'px'
        if (keysChevron) keysChevron.style.transform = 'rotate(90deg)'
      }
    }

    // Restaurar estado salvo (com guard para Node.js / ambientes sem localStorage)
    let savedCollapsed = false
    try { savedCollapsed = localStorage.getItem('easyquiz_keys_collapsed') === 'true' } catch {}
    // Inicializar sem transição para evitar flash
    if (keysCollapsible) keysCollapsible.style.transition = 'none'
    applyCollapseState(savedCollapsed)
    try {
      requestAnimationFrame(() => {
        if (keysCollapsible) keysCollapsible.style.transition = 'max-height 0.25s ease'
      })
    } catch {}

    keysSectionHeader?.addEventListener('click', () => {
      const isNowCollapsed = keysCollapsible?.style.maxHeight === '0px'
      applyCollapseState(isNowCollapsed)
      try { localStorage.setItem('easyquiz_keys_collapsed', isNowCollapsed ? 'false' : 'true') } catch {}
    })

    // Botão Adicionar Nova Chave
    const saveKeyBtn = this.shadow.querySelector('#eq-key-save') as HTMLButtonElement
    saveKeyBtn.addEventListener('click', () => {
      const cleanVal = this.apiKeyInput.value.trim().replace(/^["']|["']$/g, '')
      if (!cleanVal) {
        this.setStatus('Insira o valor da chave antes de adicionar.', 'warning')
        return
      }

      const res = keyManager.addKey(cleanVal)
      if (res.ok) {
        const rawKeys = keyManager.exportRawKeys()
        this.callbacks.onSettingsChange({ apiKey: rawKeys[0], apiKeys: rawKeys })
        this.apiKeyInput.value = ''
        this.setStatus(`✓ Nova chave adicionada com sucesso! (${rawKeys.length} chaves ativas no pool)`, 'success')
        this.renderKeysList()
        this.keyContextMenu.hidden = true

        // Valida em segundo plano
        testApiKey(cleanVal).then((testRes) => {
          if (testRes.ok) {
            keyManager.markSuccess(cleanVal, 100)
            this.setStatus('✓ Nova chave validada com sucesso no Google AI Studio!', 'success')
          } else {
            keyManager.markInvalid(cleanVal, testRes.message)
            this.setStatus(`⚠️ Chave cadastrada, mas aviso retornado: ${testRes.message}`, 'warning')
          }
          this.renderKeysList()
        }).catch(() => {})
      } else {
        this.setStatus(res.message, 'warning')
      }
    })

    // Toggle do Menu de 3 Pontinhos (⋮)
    this.keyMoreBtn.addEventListener('click', (e) => {
      e.stopPropagation()
      this.keyContextMenu.hidden = !this.keyContextMenu.hidden
    })

    // Fechar menu de 3 pontinhos se clicar fora
    this.shadow.addEventListener('click', (e) => {
      const target = e.target as HTMLElement
      if (!target.closest('#eq-key-context-menu') && !target.closest('#eq-key-more-btn')) {
        this.keyContextMenu.hidden = true
      }
    })

    // Itens do Menu de 3 Pontinhos
    // 1. Inserir via Janela Nativa (Bypass total contra scripts de bloqueio)
    this.shadow.querySelector('#eq-menu-prompt')?.addEventListener('click', () => {
      this.keyContextMenu.hidden = true
      const entered = window.prompt('Adicionar Nova Chave API do Google Gemini (AI Studio):')
      if (entered !== null && entered.trim()) {
        const clean = entered.trim().replace(/^["']|["']$/g, '')
        const res = keyManager.addKey(clean)
        if (res.ok) {
          const rawKeys = keyManager.exportRawKeys()
          this.callbacks.onSettingsChange({ apiKey: rawKeys[0], apiKeys: rawKeys })
          this.setStatus('Chave Gemini adicionada com sucesso!', 'success')
          this.renderKeysList()
        } else {
          this.setStatus(res.message, 'warning')
        }
      }
    })

    // 2. Colar do Clipboard Nativo
    this.shadow.querySelector('#eq-menu-paste')?.addEventListener('click', async () => {
      this.keyContextMenu.hidden = true
      try {
        const text = await navigator.clipboard.readText()
        if (text) {
          const clean = text.trim().replace(/^["']|["']$/g, '')
          this.apiKeyInput.value = clean
          this.setStatus('Chave colada no campo. Clique no botão "+" para adicionar ao pool.', 'info')
        }
      } catch {
        const entered = window.prompt('Adicionar Nova Chave API do Google Gemini:')
        if (entered !== null && entered.trim()) {
          const clean = entered.trim().replace(/^["']|["']$/g, '')
          const res = keyManager.addKey(clean)
          if (res.ok) {
            const rawKeys = keyManager.exportRawKeys()
            this.callbacks.onSettingsChange({ apiKey: rawKeys[0], apiKeys: rawKeys })
            this.setStatus('Chave Gemini adicionada com sucesso!', 'success')
            this.renderKeysList()
          }
        }
      }
    })

    // 3. Mostrar / Ocultar Chave
    this.shadow.querySelector('#eq-menu-toggle-vis')?.addEventListener('click', () => {
      this.keyContextMenu.hidden = true
      const isPass = this.apiKeyInput.type === 'password'
      this.apiKeyInput.type = isPass ? 'text' : 'password'
      const iconEl = this.shadow.querySelector('#eq-menu-vis-icon') as HTMLElement
      const textEl = this.shadow.querySelector('#eq-menu-vis-text') as HTMLElement
      if (iconEl) iconEl.innerHTML = isPass ? ICONS.eyeOff : ICONS.eye
      if (textEl) textEl.textContent = isPass ? 'Ocultar Campo' : 'Mostrar Campo'
    })

    // 4. Limpar Campo
    this.shadow.querySelector('#eq-menu-clear')?.addEventListener('click', () => {
      this.keyContextMenu.hidden = true
      this.apiKeyInput.value = ''
      this.setStatus('Campo de inserção limpo.', 'info')
      this.apiKeyInput.focus()
    })

    // 5. Testar Conexão Google de Todas as Chaves
    this.shadow.querySelector('#eq-menu-test')?.addEventListener('click', async () => {
      this.keyContextMenu.hidden = true
      const keys = keyManager.getAllKeys()
      if (keys.length === 0) return this.setStatus('Nenhuma chave cadastrada para testar.', 'error')

      this.setStatus(`Testando ${keys.length} chave(s) no Google AI Studio...`, 'info')
      let successCount = 0
      for (const k of keys) {
        const res = await testApiKey(k.key)
        if (res.ok) {
          successCount++
          keyManager.markSuccess(k.key, 100)
        } else {
          keyManager.markInvalid(k.key, res.message)
        }
      }
      this.renderKeysList()
      this.setStatus(`Teste concluído: ${successCount}/${keys.length} chave(s) operando com sucesso!`, successCount > 0 ? 'success' : 'error')
    })

    // 6. Resetar Todos os Dados
    const handleResetAll = () => {
      this.keyContextMenu.hidden = true
      const confirmed = window.confirm('Deseja realmente resetar todos os dados, chaves e memória de sessão do EasyQuiz?')
      if (confirmed) {
        if (this.autopilot.isActive()) {
          this.autopilot.stop()
        }
        this.updateAutopilotUi(false)
        this.setBusy(false)
        resetAllData()
        resetActivityMetrics()
        this.stopQuestionTimer(0)
        this.currentQuestionStartTime = 0
        if (this.metricsLiveTime) this.metricsLiveTime.textContent = '00:00.00'
        if (this.metricsLiveStatus) {
          this.metricsLiveStatus.textContent = 'Em espera'
          this.metricsLiveStatus.className = 'eq-live-stopwatch-status'
        }
        this.updateTimingMetrics()
        this.apiKeyInput.value = ''
        this.callbacks.onSettingsChange({ apiKey: '' })
        this.setStatus('Todos os dados do EasyQuiz foram limpos.', 'info')
        this.logToConsole('> [SYS] Armazenamento local resetado.', 'text-yellow')
      }
    }
    this.shadow.querySelector('#eq-menu-reset')?.addEventListener('click', handleResetAll)
    this.shadow.querySelector('#eq-reset-all-btn')?.addEventListener('click', handleResetAll)

    // Botão Iniciar/Parar Autopilot
    this.apToggleBtn.addEventListener('click', () => {
      if (this.autopilot.isActive()) {
        this.autopilot.stop()
        this.callbacks.onCancel?.()
        this.setProgress(0)
        this.updateAutopilotUi(false)
        this.setInterrupted('Autopilot interrompido imediatamente pelo usuário.')
      } else {
        const key = this.apiKeyInput.value.trim().replace(/^["']|["']$/g, '')
        if (!key) {
          this.setStatus('Configure sua chave de API Gemini na aba Configurações antes de ligar o Autopilot.', 'error')
          this.switchTab('settings')
          this.apiKeyInput.focus()
          return
        }
        this.callbacks.onSettingsChange({ autoApply: true, autoAdvance: true })
        this.autoApplyCheckbox.checked = true
        this.autoAdvanceCheckbox.checked = true
        this.autopilot.start()
        this.updateAutopilotUi(true)
        this.startStopwatch()
        this.setStatus('Autopilot ativo. Monitorando exercícios...', 'info')
      }
    })

    // Limpar Memória da Sessão
    const clearMemoryBtn = this.shadow.querySelector('#eq-ap-clear-memory') as HTMLButtonElement
    clearMemoryBtn.addEventListener('click', () => {
      clearSessionMemories()
      this.logToConsole('> [SYS] Memória contextual limpa com sucesso.', 'text-green')
      this.setStatus('Memória contextual da sessão limpa.', 'success')
    })

    // Copiar Logs do Terminal (Desativado/Oculto)
    const copyConsoleBtn = this.shadow.querySelector('#eq-copy-console-btn') as HTMLButtonElement
    copyConsoleBtn?.addEventListener('click', () => {
      const logs = this.apConsole?.innerText || ''
      navigator.clipboard.writeText(logs).then(() => {
        const prev = copyConsoleBtn.innerHTML
        copyConsoleBtn.innerHTML = ICONS.check
        setTimeout(() => (copyConsoleBtn.innerHTML = prev), 1800)
      })
    })

    // Copiar Prompt no Inspetor
    this.copyPromptBtn.addEventListener('click', () => {
      const text = this.inspPrompt.textContent || ''
      navigator.clipboard.writeText(text).then(() => {
        const prev = this.copyPromptBtn.innerHTML
        this.copyPromptBtn.innerHTML = `${ICONS.check} Copiado!`
        setTimeout(() => (this.copyPromptBtn.innerHTML = prev), 2000)
      })
    })

    // Controles Avançados
    this.modelSelect.addEventListener('change', () => this.callbacks.onSettingsChange({ model: this.modelSelect.value }))
    this.modeSelect.addEventListener('change', () => this.callbacks.onSettingsChange({ modeHint: this.modeSelect.value as any }))
    this.engineSelect.addEventListener('change', () => this.callbacks.onSettingsChange({ engine: this.engineSelect.value as any }))
    this.dryRunCheckbox.addEventListener('change', () => this.callbacks.onSettingsChange({ dryRun: this.dryRunCheckbox.checked }))
    this.autoApplyCheckbox.addEventListener('change', () => this.callbacks.onSettingsChange({ autoApply: this.autoApplyCheckbox.checked }))
    this.autoAdvanceCheckbox.addEventListener('change', () => this.callbacks.onSettingsChange({ autoAdvance: this.autoAdvanceCheckbox.checked }))

    this.useVisionCheckbox.addEventListener('change', () => {
      const v = this.useVisionCheckbox.checked
      this.callbacks.onSettingsChange({ useVision: v })
      this.setStatus(v ? 'Visão Computacional ativada (capturas habilitadas).' : 'Modo DOM Rápido ativado (capturas desabilitadas).', 'info')
    })

    this.hostDarkModeCheckbox.addEventListener('change', () => {
      const v = this.hostDarkModeCheckbox.checked
      this.callbacks.onSettingsChange({ hostDarkMode: v })
      this.applyHostDarkMode(v)
    })

    this.analyzeBtn.addEventListener('click', async () => {
      if (this.isBusy) {
        this.callbacks.onCancel?.()
        this.setInterrupted('Análise cancelada pelo usuário. Pronto para nova tentativa.')
        return
      }
      const plan = await this.callbacks.onAnalyze()
      if (plan && !this.dryRunCheckbox.checked && !this.autoApplyCheckbox.checked) {
        this.callbacks.onApply()
      }
    })
    this.applyBtn.addEventListener('click', () => this.callbacks.onApply())
  }

  private startStopwatch() {
    this.stopStopwatch()
    this.stopwatchStartTime = Date.now()
    const update = () => {
      const elapsed = ((Date.now() - this.stopwatchStartTime) / 1000).toFixed(2) + 's'
      this.stopwatchAp.textContent = elapsed
      this.stopwatchAdv.textContent = elapsed
    }
    update()
    this.stopwatchInterval = setInterval(update, 100)
  }

  private stopStopwatch(finalMs?: number) {
    if (this.stopwatchInterval) {
      clearInterval(this.stopwatchInterval)
      this.stopwatchInterval = null
    }
    if (finalMs !== undefined) {
      const val = (finalMs / 1000).toFixed(2) + 's'
      this.stopwatchAp.textContent = val
      this.stopwatchAdv.textContent = val
    }
  }

  public setLogFilter(filter: 'all' | 'error' | 'ai' | 'dom'): void {
    this.activeLogFilter = filter
    const chips: Array<'all' | 'error' | 'ai' | 'dom'> = ['all', 'error', 'ai', 'dom']
    for (const f of chips) {
      const btn = this.shadow.querySelector(`#eq-dbg-filter-${f}`)
      if (f === filter) btn?.classList.add('active')
      else btn?.classList.remove('active')
    }
    this.renderTerminalEntries()
  }

  private updateLogCounters(): void {
    let errorCount = 0
    let aiCount = 0
    let domCount = 0

    for (const e of this.logEntries) {
      if (e.category === 'error') errorCount++
      else if (e.category === 'ai') aiCount++
      else if (e.category === 'dom') domCount++
    }

    if (this.dbgCountAll) this.dbgCountAll.textContent = String(this.logEntries.length)
    if (this.dbgCountError) this.dbgCountError.textContent = String(errorCount)
    if (this.dbgCountAi) this.dbgCountAi.textContent = String(aiCount)
    if (this.dbgCountDom) this.dbgCountDom.textContent = String(domCount)
  }

  public renderTerminalEntries(): void {
    if (!this.liveDebugTerminal) return
    this.liveDebugTerminal.replaceChildren()

    const filtered = this.activeLogFilter === 'all'
      ? this.logEntries
      : this.logEntries.filter((e) => e.category === this.activeLogFilter)

    if (filtered.length === 0) {
      const empty = document.createElement('div')
      empty.className = 'text-muted'
      empty.textContent = `Nenhum log encontrado para o filtro "${this.activeLogFilter.toUpperCase()}".`
      this.liveDebugTerminal.appendChild(empty)
      return
    }

    for (const item of filtered) {
      const line = document.createElement('div')
      line.textContent = item.message
      if (item.colorClass) line.className = item.colorClass
      this.liveDebugTerminal.appendChild(line)
    }

    if (this.autoScrollLogs) {
      this.liveDebugTerminal.scrollTop = this.liveDebugTerminal.scrollHeight
    }
  }

  public clearLogs(): void {
    this.logEntries = []
    this.updateLogCounters()
    if (this.liveDebugTerminal) {
      this.liveDebugTerminal.replaceChildren()
      const init = document.createElement('div')
      init.className = 'text-blue'
      init.textContent = '> [SYS] Console de logs limpo pelo usuário.'
      this.liveDebugTerminal.appendChild(init)
    }
    if (this.apConsole) this.apConsole.replaceChildren()
    if (this.executionConsole) this.executionConsole.replaceChildren()
  }

  public getFormattedLogs(): string {
    const filtered = this.activeLogFilter === 'all'
      ? this.logEntries
      : this.logEntries.filter((e) => e.category === this.activeLogFilter)
    return filtered.map((e) => e.message).join('\n')
  }

  public setLastError(errorMsg: string): void {
    this.lastErrorMsg = errorMsg
    if (this.dbgErrorCard && this.dbgErrorText) {
      this.dbgErrorText.textContent = errorMsg
      this.dbgErrorCard.style.display = 'flex'
    }
  }

  public setErrorDiagnostic(errorMsg: string, source?: string): void {
    const formatted = source ? `[${source}] ${errorMsg}` : errorMsg
    this.setLastError(formatted)
  }

  public refreshDebugView(): void {
    const plan = this.latestPlan
    const ctx = this.latestContext
    const prompt = this.latestPromptText || plan?.promptSent || ''

    if (this.dbgModel) {
      this.dbgModel.textContent = plan?.usedModel || this.initialSettings.model || '--'
    }

    if (this.dbgLatency) {
      this.dbgLatency.textContent = plan?.durationMs ? `${plan.durationMs}ms` : '--'
    }

    if (this.dbgSplitTokens) {
      const pTokens = plan?.promptTokens !== undefined ? String(plan.promptTokens) : '--'
      const cTokens = plan?.candidatesTokens !== undefined ? String(plan.candidatesTokens) : '--'
      this.dbgSplitTokens.textContent = `${pTokens} / ${cTokens}`
      this.dbgSplitTokens.title = `Prompt: ${pTokens} tokens | Resposta: ${cTokens} tokens`
    }

    if (this.dbgTotalTokens) {
      const total = plan?.tokensUsed ?? (plan?.promptTokens && plan?.candidatesTokens ? plan.promptTokens + plan.candidatesTokens : undefined)
      this.dbgTotalTokens.textContent = total !== undefined ? `${total}` : '--'
    }

    if (this.dbgPromptLen) {
      const len = prompt.length
      const est = Math.round(len / 4)
      this.dbgPromptLen.textContent = `${len} chars (~${est} tokens est.)`
    }

    if (this.dbgPromptView) {
      this.dbgPromptView.textContent = prompt || 'Nenhum prompt enviado até o momento.'
    }

    if (this.dbgContextView) {
      if (ctx) {
        const summary = {
          scope: `${ctx.scope.tagName.toLowerCase()}${ctx.scope.id ? '#' + ctx.scope.id : ''}${ctx.scope.className ? '.' + ctx.scope.className.split(' ').join('.') : ''}`,
          questionLength: ctx.questionText.length,
          questionSnippet: ctx.questionText.slice(0, 150) + (ctx.questionText.length > 150 ? '...' : ''),
          controlsCount: ctx.controls.length,
          controls: ctx.controls.map((c, i) => ({
            index: i + 1,
            tag: c.tag,
            type: c.type,
            name: c.name || undefined,
            id: c.id || undefined,
            value: c.value || undefined,
            label: c.label || undefined,
            role: c.role,
          })),
        }
        this.dbgContextView.textContent = JSON.stringify(summary, null, 2)
      } else {
        this.dbgContextView.textContent = 'Aguardando captura de contexto pelo EasyQuiz...'
      }
    }

    if (this.dbgRawRespView) {
      if (plan) {
        if (plan.rawResponse) {
          this.dbgRawRespView.textContent = plan.rawResponse
        } else {
          this.dbgRawRespView.textContent = JSON.stringify(
            {
              pageType: plan.pageType,
              mode: plan.mode,
              confidence: plan.confidence,
              rationale: plan.rationale,
              actions: plan.actions,
            },
            null,
            2,
          )
        }
      } else {
        this.dbgRawRespView.textContent = 'Aguardando retorno da API Gemini...'
      }
    }

    if (this.lastErrorMsg && this.dbgErrorCard && this.dbgErrorText) {
      this.dbgErrorText.textContent = this.lastErrorMsg
      this.dbgErrorCard.style.display = 'flex'
    }
  }

  public logToConsole(message: string, colorClass?: string) {
    const now = new Date()
    const ts = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}.${String(Math.floor(now.getMilliseconds() / 100))}`

    let formatted = message
    if (message.startsWith('>')) {
      formatted = `> [${ts}] ${message.slice(1).trim()}`
    } else {
      formatted = `[${ts}] ${message}`
    }

    let category: 'all' | 'error' | 'ai' | 'dom' = 'all'
    if (colorClass === 'text-red' || formatted.includes('[ERRO]') || formatted.includes('Falha') || formatted.includes('Error')) {
      category = 'error'
    } else if (formatted.includes('[IA]') || formatted.includes('[RAG]') || formatted.includes('Tokens') || formatted.includes('Gemini') || formatted.includes('Modelo:')) {
      category = 'ai'
    } else if (formatted.includes('[DOM]') || formatted.includes('[EXEC]') || formatted.includes('[VERIF]') || formatted.includes('[NAV]')) {
      category = 'dom'
    }

    const entry = {
      id: Date.now() + Math.random(),
      timestamp: ts,
      message: formatted,
      colorClass,
      category,
    }

    this.logEntries.push(entry)
    while (this.logEntries.length > 250) {
      this.logEntries.shift()
    }

    this.updateLogCounters()

    if (category === 'error') {
      this.setLastError(formatted)
    }

    if (this.liveDebugTerminal && (this.activeLogFilter === 'all' || this.activeLogFilter === category)) {
      const line = document.createElement('div')
      line.textContent = formatted
      if (colorClass) line.className = colorClass
      this.liveDebugTerminal.appendChild(line)

      while (this.liveDebugTerminal.children.length > 250) {
        this.liveDebugTerminal.removeChild(this.liveDebugTerminal.firstChild!)
      }

      if (this.autoScrollLogs) {
        this.liveDebugTerminal.scrollTop = this.liveDebugTerminal.scrollHeight
      }
    }

    if (this.apConsole) {
      const el = document.createElement('div')
      el.textContent = formatted
      if (colorClass) el.className = colorClass
      this.apConsole.appendChild(el)
      this.apConsole.scrollTop = this.apConsole.scrollHeight
      while (this.apConsole.children.length > 150) {
        this.apConsole.removeChild(this.apConsole.firstChild!)
      }
    }

    if (this.executionConsole) {
      const executionEntry = document.createElement('div')
      executionEntry.textContent = formatted
      if (colorClass) executionEntry.className = colorClass
      this.executionConsole.appendChild(executionEntry)
      this.executionConsole.scrollTop = this.executionConsole.scrollHeight
      while (this.executionConsole.children.length > 150) {
        this.executionConsole.removeChild(this.executionConsole.firstChild!)
      }
    }
  }

  public setProgress(percent: number, label?: string): void {
    if (!this.progressContainer || !this.progressBar) return
    if (percent <= 0) {
      this.progressContainer.style.display = 'none'
      this.progressBar.style.width = '0%'
      return
    }

    this.progressContainer.style.display = 'flex'
    const clamped = Math.min(100, Math.max(0, Math.round(percent)))
    this.progressBar.style.width = `${clamped}%`
    if (this.progressVal) this.progressVal.textContent = `${clamped}%`
    if (label && this.progressLabel) this.progressLabel.textContent = label

    if (clamped >= 100) {
      setTimeout(() => {
        if (this.progressContainer && this.progressBar && this.progressBar.style.width === '100%') {
          this.progressContainer.style.display = 'none'
        }
      }, 1500)
    }
  }

  public updateContext(context: CapturedContext, plan?: AnalysisPlan): void {
    this.latestContext = context
    if (plan) this.latestPlan = plan
    if (this.activeTab === 'brain') {
      this.renderContextTree()
      if (plan) this.refreshInspectorView()
    } else if (this.activeTab === 'debug') {
      this.refreshDebugView()
    }
  }

  public renderContextTree(): void {
    if (!this.contextTreeContainer) return
    const ctx = this.latestContext
    const memories = getSessionMemories()
    const plan = this.latestPlan

    this.contextTreeContainer.innerHTML = ''

    // Pasta 1: Escopo e Metadados da Página
    const pageNode = this.createTreeFolder('📄 PÁGINA & ESCOPO ATUAL', true, [
      { label: 'Título', value: document.title || 'Sem título' },
      { label: 'URL', value: window.location.pathname || '/' },
      { label: 'Escopo DOM', value: ctx ? `${ctx.scope.tagName.toLowerCase()}${ctx.scope.className ? '.' + ctx.scope.className.split(' ').join('.') : ''}` : 'Document' },
      { label: 'Tamanho Texto', value: ctx ? `${ctx.questionText.length} caracteres` : 'Não analisado' },
      { label: 'Trecho Enunciado', value: ctx ? `"${ctx.questionText.slice(0, 120)}..."` : 'Nenhum' },
    ])
    this.contextTreeContainer.appendChild(pageNode)

    // Pasta 2: Controles Detectados no Formulário
    const controls = ctx ? ctx.controls : []
    const controlsChildren = controls.map((c, idx) => {
      const isNav = c.role === 'navigation' || c.type === 'button'
      const valStr = !isNav && c.value ? ` [val: "${c.value}"]` : ''
      return {
        label: `[#${idx + 1}] ${c.type.toUpperCase()}`,
        value: `${c.label || c.id || c.name || '(Sem rótulo)'}${valStr}`.trim(),
        badge: isNav ? 'Navegação' : c.role || c.type,
      }
    })

    const controlsNode = this.createTreeFolder(`🎛️ CONTROLES DETECTADOS (${controls.length})`, controls.length > 0, controlsChildren)
    this.contextTreeContainer.appendChild(controlsNode)

    // Pasta 3: Memória RAG de Sessão
    const memoriesChildren = memories.map((m, idx) => ({
      label: `Memória #${idx + 1}`,
      value: m,
      badge: 'RAG',
    }))
    const memoriesNode = this.createTreeFolder(`🧠 MEMÓRIA RAG ACUMULADA (${memories.length})`, memories.length > 0, memoriesChildren)
    this.contextTreeContainer.appendChild(memoriesNode)

    // Pasta 4: Último Plano da IA
    if (plan) {
      const planNode = this.createTreeFolder(`🤖 ÚLTIMO PLANO IA (${plan.actions.length} ações)`, true, [
        { label: 'Tipo Página', value: plan.pageType, badge: `${(plan.confidence * 100).toFixed(0)}%` },
        { label: 'Modo', value: plan.mode },
        { label: 'Raciocínio', value: plan.rationale || 'N/A' },
        ...plan.actions.map((a, i) => ({
          label: `Ação #${i + 1} (${a.t})`,
          value: JSON.stringify(a),
        })),
      ])
      this.contextTreeContainer.appendChild(planNode)
    }
  }

  private createTreeFolder(title: string, startExpanded: boolean, items: Array<{ label: string; value: string; badge?: string }>): HTMLElement {
    const node = document.createElement('div')
    node.className = 'eq-tree-node'

    const header = document.createElement('div')
    header.className = 'eq-tree-header'
    header.innerHTML = `<span class="eq-tree-arrow">${startExpanded ? '▼' : '▶'}</span> <span>${title}</span>`

    const content = document.createElement('div')
    content.className = 'eq-tree-content'
    content.style.display = startExpanded ? 'flex' : 'none'

    if (items.length === 0) {
      content.innerHTML = '<div class="text-muted" style="padding: 2px 0;">Nenhum item registrado.</div>'
    } else {
      for (const it of items) {
        const leaf = document.createElement('div')
        leaf.className = 'eq-tree-leaf'
        leaf.innerHTML = `
          <strong style="color:#ffffff; min-width: 80px;">${it.label}:</strong>
          <span style="flex:1; word-break: break-word; color:#aaaaaa;">${it.value}</span>
          ${it.badge ? `<span class="eq-tree-badge">${it.badge}</span>` : ''}
        `
        content.appendChild(leaf)
      }
    }

    header.addEventListener('click', () => {
      const isHidden = content.style.display === 'none'
      content.style.display = isHidden ? 'flex' : 'none'
      const arrow = header.querySelector('.eq-tree-arrow')
      if (arrow) arrow.textContent = isHidden ? '▼' : '▶'
    })

    node.appendChild(header)
    node.appendChild(content)
    return node
  }

  public toggle(force?: boolean): void {
    if (force !== undefined) {
      this.isCollapsed = !force
    } else {
      this.isCollapsed = !this.isCollapsed
    }

    if (this.isCollapsed) {
      this.sidebarEl.classList.add('eq-collapsed')
    } else {
      this.sidebarEl.classList.remove('eq-collapsed')
      if (!this.apiKeyInput.value) {
        this.switchTab('settings')
        this.apiKeyInput.focus()
      }
    }
  }

  public updateAutopilotUi(active: boolean): void {
    if (active) {
      this.apToggleBtn.innerHTML = `${ICONS.stop} PARAR AUTOPILOT`
      this.apToggleBtn.classList.add('danger')
      this.apToggleBtn.title = 'Interromper execução contínua do Autopilot'
    } else {
      this.apToggleBtn.innerHTML = `${ICONS.play} INICIAR AUTOPILOT`
      this.apToggleBtn.classList.remove('danger')
      this.apToggleBtn.title = 'Iniciar resolução automática contínua de questões'
    }
  }

  public setOperationState(label: string, type: 'idle' | 'busy' | 'success' | 'error' | 'warning' | 'info'): void {
    const operationState = this.shadow.querySelector('#eq-operation-state') as HTMLElement | null
    if (operationState) {
      operationState.textContent = label
      operationState.className = `eq-operation-state is-${type}`
    }
  }

  public setInterrupted(message = 'Análise interrompida pelo usuário.'): void {
    this.isBusy = false
    ;[this.modelSelect, this.modeSelect, this.engineSelect, this.dryRunCheckbox, this.autoApplyCheckbox, this.autoAdvanceCheckbox, this.useVisionCheckbox].forEach(
      (e) => ((e as any).disabled = false),
    )

    this.analyzeBtn.disabled = false
    this.analyzeBtn.classList.remove('danger')
    this.analyzeBtn.innerHTML = `${ICONS.sparkles} Resolver com IA (Alt+R)`
    this.analyzeBtn.title = 'Analisar e responder questão ativa'
    this.applyBtn.disabled = !this.latestPlan || !this.latestPlan.actions.length

    this.stopStopwatch()
    this.stopQuestionTimer()

    this.dotPulseAp.className = 'eq-dot-pulse stopped'
    this.dotPulseAdv.className = 'eq-dot-pulse stopped'
    this.launcherDot.className = 'eq-launcher-dot stopped'

    if (this.metricsLiveStatus) {
      this.metricsLiveStatus.textContent = 'Interrompido'
      this.metricsLiveStatus.className = 'eq-live-stopwatch-status is-warning'
    }

    if (!this.autopilot.isActive()) {
      this.updateAutopilotUi(false)
    }

    this.setStatus(message, 'warning')
  }

  public setBusy(busy: boolean, message?: string): void {
    this.isBusy = busy
    ;[this.modelSelect, this.modeSelect, this.engineSelect, this.dryRunCheckbox, this.autoApplyCheckbox, this.autoAdvanceCheckbox, this.useVisionCheckbox].forEach(
      (e) => ((e as any).disabled = busy),
    )

    if (busy) {
      this.analyzeBtn.disabled = false
      this.analyzeBtn.classList.add('danger')
      this.analyzeBtn.innerHTML = `${ICONS.stop} Parar Análise`
      this.analyzeBtn.title = 'Interromper e cancelar análise em andamento'
      this.applyBtn.disabled = true
      this.startStopwatch()
      this.startQuestionTimer()
      this.dotPulseAp.className = 'eq-dot-pulse busy'
      this.dotPulseAdv.className = 'eq-dot-pulse busy'
      this.launcherDot.className = 'eq-launcher-dot busy'
      this.setOperationState('Analisando...', 'busy')
      if (this.metricsLiveStatus) {
        this.metricsLiveStatus.textContent = 'Calculando...'
        this.metricsLiveStatus.className = 'eq-live-stopwatch-status is-busy'
      }
      if (message) this.setStatus(message, 'info')
    } else {
      this.analyzeBtn.disabled = false
      this.analyzeBtn.classList.remove('danger')
      this.analyzeBtn.innerHTML = `${ICONS.sparkles} Resolver com IA (Alt+R)`
      this.analyzeBtn.title = 'Analisar e responder questão ativa'
      this.applyBtn.disabled = !this.latestPlan || !this.latestPlan.actions.length
      this.stopStopwatch()
      this.stopQuestionTimer()
      this.dotPulseAp.className = 'eq-dot-pulse'
      this.dotPulseAdv.className = 'eq-dot-pulse'
      this.launcherDot.className = 'eq-launcher-dot'
      this.setOperationState(this.autopilot.isActive() ? 'Monitorando' : 'Pronto', 'idle')
      if (this.metricsLiveStatus && this.metricsLiveStatus.textContent === 'Calculando...') {
        this.metricsLiveStatus.textContent = 'Em espera'
        this.metricsLiveStatus.className = 'eq-live-stopwatch-status'
      }
    }
  }

  public setStatus(message: string, type: 'info' | 'success' | 'error' | 'warning' = 'info'): void {
    this.statusTextAp.textContent = message
    this.statusTextAdv.textContent = message

    if (type === 'error') {
      this.setOperationState('Bloqueado', 'error')
      this.dotPulseAp.className = 'eq-dot-pulse error'
      this.dotPulseAdv.className = 'eq-dot-pulse error'
      this.launcherDot.className = 'eq-launcher-dot error'
    } else if (type === 'warning') {
      this.setOperationState('Interrompido', 'warning')
      this.dotPulseAp.className = 'eq-dot-pulse stopped'
      this.dotPulseAdv.className = 'eq-dot-pulse stopped'
      this.launcherDot.className = 'eq-launcher-dot stopped'
    } else if (type === 'success') {
      this.setOperationState('Confirmado', 'success')
      this.dotPulseAp.className = 'eq-dot-pulse'
      this.dotPulseAdv.className = 'eq-dot-pulse'
      this.launcherDot.className = 'eq-launcher-dot'
    } else {
      if (this.isBusy) {
        this.setOperationState('Analisando...', 'busy')
        this.dotPulseAp.className = 'eq-dot-pulse busy'
        this.dotPulseAdv.className = 'eq-dot-pulse busy'
        this.launcherDot.className = 'eq-launcher-dot busy'
      } else {
        this.setOperationState(this.autopilot.isActive() ? 'Monitorando' : 'Pronto', 'info')
        this.dotPulseAp.className = 'eq-dot-pulse'
        this.dotPulseAdv.className = 'eq-dot-pulse'
        this.launcherDot.className = 'eq-launcher-dot'
      }
    }

    const isFallback = message.includes('Alternando') || message.includes('indisponível') || message.includes('fallback') || message.includes('alternativo')
    const prefix = type === 'error' ? '> [ERRO] ' : type === 'success' ? '> [SUCESSO] ' : type === 'warning' ? '> [PARADO] ' : isFallback ? '> [FALLBACK] ' : '> [SYS] '
    const color = type === 'error' ? 'text-red' : type === 'success' ? 'text-green' : type === 'warning' ? 'text-yellow' : isFallback ? 'text-yellow' : 'text-blue'
    this.logToConsole(`${prefix}${message}`, color)
  }

  public setPlan(plan: AnalysisPlan, canApply: boolean): void {
    this.latestPlan = plan
    this.resultContainer.style.display = 'flex'

    if (plan.durationMs) {
      this.stopStopwatch(plan.durationMs)
    }

    // Atualiza badge do modelo ativo no header
    if (plan.usedModel) {
      const modelBadge = this.shadow.querySelector('#eq-active-model-badge') as HTMLElement | null
      if (modelBadge) {
        // Mostrar apenas a parte relevante do nome (ex: "3.8-flash" de "gemini-3.8-flash")
        const shortName = plan.usedModel.replace('gemini-', '').replace('-latest', '')
        modelBadge.textContent = `● ${shortName}`
        modelBadge.style.display = 'inline-block'
      }
    }

    // Atualiza Badges do Avançado
    const badgesEl = this.shadow.querySelector('#eq-badges') as HTMLElement
    badgesEl.replaceChildren()
    const badgeValues = [
      plan.mode.replace('_', ' '),
      `${Math.round(plan.confidence * 100)}% Confiança`,
      `${plan.actions.length} ações`,
      ...(plan.usedModel ? [plan.usedModel] : []),
    ]
    for (const value of badgeValues) {
      const badge = document.createElement('span')
      badge.className = 'eq-brand-badge'
      badge.textContent = value
      badgesEl.appendChild(badge)
    }

    const rationaleEl = this.shadow.querySelector('#eq-rationale-text') as HTMLElement
    rationaleEl.textContent = plan.rationale

    const actionsListEl = this.shadow.querySelector('#eq-actions-list') as HTMLElement
    actionsListEl.innerHTML = ''
    for (const act of plan.actions) {
      const item = document.createElement('div')
      item.className = 'eq-action-item'
      let desc = ''
      if (act.t === 'chk') desc = `chk ${act.id} (${(act as any).c})`
      else if (act.t === 'val') desc = `val "${act.v}" -> ${act.id}`
      else if (act.t === 'sel') desc = `sel "${Array.isArray(act.v) ? act.v.join(',') : act.v}" -> ${act.id}`
      else if (act.t === 'clk') desc = `clk ${act.id}`
      else if (act.t === 'adv') desc = `adv`
      else if (act.t === 'js') desc = `js: ${String(act.v).slice(0, 40)}...`
      else if (act.t === 'drag') desc = `drag "${act.from}" -> "${act.to}"`

      const badge = document.createElement('span')
      badge.className = 'eq-action-badge'
      badge.textContent = act.t.toUpperCase()
      const text = document.createElement('span')
      text.textContent = desc
      item.append(badge, text)
      actionsListEl.appendChild(item)
    }

    this.applyBtn.disabled = !canApply || !plan.actions.length
    const executionCard = this.shadow.querySelector('#eq-execution-card') as HTMLElement | null
    if (executionCard) executionCard.hidden = true

    // Atualiza Inspetor de IA e Debug em Tempo Real
    this.refreshInspectorView()
    this.refreshDebugView()
  }

  public setExecutionReport(result: ExecutionResult): void {
    const card = this.shadow.querySelector('#eq-execution-card') as HTMLElement | null
    const summary = this.shadow.querySelector('#eq-execution-summary') as HTMLElement | null
    const list = this.shadow.querySelector('#eq-execution-list') as HTMLElement | null
    if (!card || !summary || !list) return

    card.hidden = false
    summary.textContent = result.navigationVerified
      ? `${result.verified}/${result.applied} ações verificadas. Navegação confirmada.`
      : `${result.verified}/${result.applied} ações verificadas. ${result.navigationEvidence}`
    summary.className = `eq-execution-summary ${result.success ? 'is-success' : 'is-warning'}`
    list.replaceChildren()
    const executionPlaceholder = this.shadow.querySelector('#eq-execution-placeholder') as HTMLElement | null
    if (executionPlaceholder) {
      executionPlaceholder.textContent = result.navigationVerified
        ? 'Fluxo concluído: aplicação e navegação confirmadas.'
        : `Fluxo interrompido: ${result.navigationEvidence}`
      executionPlaceholder.className = `eq-execution-placeholder ${result.success ? 'is-success' : 'is-warning'}`
    }

    for (const report of result.reports) {
      const row = document.createElement('div')
      row.className = `eq-execution-row ${report.verified ? 'is-success' : 'is-failed'}`

      const state = document.createElement('span')
      state.className = 'eq-execution-state'
      state.textContent = report.verified ? 'OK' : 'FALHOU'

      const details = document.createElement('div')
      details.className = 'eq-execution-details'
      const target = document.createElement('strong')
      target.textContent = report.target
      const evidence = document.createElement('span')
      evidence.textContent = `${report.strategy} | ${report.evidence}`
      details.append(target, evidence)

      row.append(state, details)
      if (report.error) {
        const error = document.createElement('small')
        error.textContent = report.error
        row.appendChild(error)
      }
      list.appendChild(row)
    }
  }

  public setInspectorPrompt(promptText: string, model?: string): void {
    this.latestPromptText = promptText
    if (this.inspPrompt) {
      this.inspPrompt.textContent = promptText
    }
    if (model && this.inspModel) {
      this.inspModel.textContent = model
    }
    if (this.inspLatency) {
      this.inspLatency.textContent = 'Aguardando IA...'
    }
    if (this.activeTab === 'debug') {
      this.refreshDebugView()
    }
  }

  public refreshInspectorView(): void {
    const plan = this.latestPlan
    if (plan) {
      this.inspModel.textContent = plan.usedModel || this.initialSettings.model
      this.inspLatency.textContent = plan.durationMs ? `${plan.durationMs}ms` : '--'
      this.inspTokens.textContent = plan.tokensUsed ? `${plan.tokensUsed}` : '--'
      this.inspPrompt.textContent = plan.promptSent || this.latestPromptText || 'Prompt não registrado para esta requisição.'
      this.inspRationale.textContent = plan.rationale

      this.inspActions.innerHTML = ''
      if (plan.actions.length > 0) {
        for (const act of plan.actions) {
          const item = document.createElement('div')
          item.className = 'eq-action-item'
          item.textContent = JSON.stringify(act)
          this.inspActions.appendChild(item)
        }
      } else {
        this.inspActions.innerHTML = '<div class="text-muted" style="padding: 4px;">Nenhuma ação prescrita pela IA.</div>'
      }
    } else if (this.latestPromptText) {
      this.inspPrompt.textContent = this.latestPromptText
    }
  }

  public showFloatingAnswers(plan?: AnalysisPlan | null): void {
    const target = plan || this.latestPlan
    if (target) {
      this.floatingAnswers.show(target)
    }
  }

  public hideFloatingAnswers(): void {
    this.floatingAnswers.hide()
  }

  public renderKeysList(): void {
    if (!this.keysListEl) return
    const keys = keyManager.getAllKeys()

    if (this.keysBadgeEl) {
      const readyCount = keys.filter((k) => !k.isCooldown).length
      const totalWins = keys.reduce((acc, k) => acc + (k.winCount || 0), 0)
      const turboInfo = readyCount >= 3 ? ` ⚡ TURBO` : ''
      this.keysBadgeEl.textContent = `${keys.length} chave${keys.length > 1 ? 's' : ''} (${readyCount} pronta${readyCount !== 1 ? 's' : ''})${turboInfo}`
      this.keysBadgeEl.className = `eq-key-badge ${readyCount >= 3 ? 'racing' : readyCount > 0 ? 'ready' : 'cooldown'}`
    }

    this.keysListEl.replaceChildren()

    // Recalcular maxHeight do collapsible após render (novos cards podem ter mudado a altura)
    try {
      requestAnimationFrame(() => {
        const collapsible = this.shadow?.querySelector('#eq-keys-collapsible') as HTMLElement | null
        if (collapsible && collapsible.style.maxHeight !== '0px') {
          collapsible.style.maxHeight = collapsible.scrollHeight + 50 + 'px'
        }
      })
    } catch {}

    // Ordenar: mais vitórias primeiro, depois menor latência, depois prontas
    const sorted = [...keys].sort((a, b) => {
      // Primeiro por vitórias (mais vitórias = topo)
      const winsA = a.winCount || 0
      const winsB = b.winCount || 0
      if (winsA !== winsB) return winsB - winsA
      // Depois por latência (menor = topo)
      const latA = a.lastLatencyMs || 99999
      const latB = b.lastLatencyMs || 99999
      if (latA !== latB) return latA - latB
      // Depois prontas antes de cooldown
      const coolA = a.isCooldown ? 1 : 0
      const coolB = b.isCooldown ? 1 : 0
      return coolA - coolB
    })

    sorted.forEach((k, sortIdx) => {
      // Encontrar o índice original para labels de "Chave N"
      const originalIdx = keys.findIndex((orig) => orig.id === k.id)
      const idx = originalIdx >= 0 ? originalIdx : sortIdx

      const row = document.createElement('div')
      row.className = 'eq-key-item'

      const info = document.createElement('div')
      info.className = 'eq-key-info'

      const label = document.createElement('span')
      label.className = 'eq-key-label'
      label.textContent = k.label || `Chave ${idx + 1}`

      const masked = document.createElement('span')
      masked.className = 'eq-key-masked'
      masked.textContent = KeyManager.maskKey(k.key)
      masked.title = 'Clique para copiar a chave'
      masked.style.cursor = 'pointer'
      masked.addEventListener('click', () => {
        void navigator.clipboard?.writeText(k.key)
        this.setStatus(`Chave ${idx + 1} copiada para a área de transferência!`, 'info')
      })

      // Badge de status
      const status = document.createElement('span')
      if (k.isCooldown) {
        status.className = 'eq-key-badge cooldown'
        const secs = Math.ceil(k.remainingCooldownMs / 1000)
        status.textContent = `⏱ Cooldown (${secs}s)`
      } else if (k.lastError && k.errorCount && k.errorCount > 3) {
        status.className = 'eq-key-badge invalid'
        status.textContent = 'Erro'
        status.title = k.lastError
      } else if (k.lastLatencyMs) {
        status.className = 'eq-key-badge ready'
        status.textContent = `Pronta (${k.lastLatencyMs}ms)`
      } else {
        status.className = 'eq-key-badge ready'
        status.textContent = 'Pronta'
      }

      info.appendChild(label)
      info.appendChild(masked)
      info.appendChild(status)

      // Badge de vitórias (se a chave já venceu alguma corrida)
      const wins = k.winCount || 0
      if (wins > 0) {
        const winBadge = document.createElement('span')
        winBadge.className = 'eq-key-badge winner'
        winBadge.textContent = `🏆 ${wins} vitória${wins > 1 ? 's' : ''}`
        winBadge.title = `Esta chave foi a mais rápida ${wins} vez${wins > 1 ? 'es' : ''} nas corridas paralelas`
        info.appendChild(winBadge)
      }

      const actions = document.createElement('div')
      actions.className = 'eq-key-actions'

      // Botão Testar
      const testBtn = document.createElement('button')
      testBtn.className = 'eq-icon-btn'
      testBtn.type = 'button'
      testBtn.title = 'Testar esta chave'
      testBtn.innerHTML = ICONS.sparkles
      testBtn.addEventListener('click', async () => {
        this.setStatus(`Testando chave ${k.label || idx + 1}...`, 'info')
        const res = await testApiKey(k.key)
        if (res.ok) {
          keyManager.markSuccess(k.key, 120)
          this.setStatus(`✓ ${k.label || `Chave ${idx + 1}`}: Conexão com Google Gemini aprovada!`, 'success')
        } else {
          keyManager.markInvalid(k.key, res.message)
          this.setStatus(`⚠️ ${k.label || `Chave ${idx + 1}`}: ${res.message}`, 'error')
        }
        this.renderKeysList()
      })

      // Botão Editar
      const editBtn = document.createElement('button')
      editBtn.className = 'eq-icon-btn'
      editBtn.type = 'button'
      editBtn.title = 'Editar chave'
      editBtn.innerHTML = ICONS.edit
      editBtn.addEventListener('click', () => {
        const newKey = window.prompt(`Editar ${k.label || `Chave ${idx + 1}`}:`, k.key)
        if (newKey !== null && newKey.trim()) {
          const res = keyManager.updateKey(k.id, newKey.trim())
          if (res.ok) {
            const rawKeys = keyManager.exportRawKeys()
            this.callbacks.onSettingsChange({ apiKey: rawKeys[0], apiKeys: rawKeys })
            this.setStatus(`Chave ${idx + 1} atualizada com sucesso!`, 'success')
            this.renderKeysList()
          } else {
            this.setStatus(res.message, 'warning')
          }
        }
      })

      // Botão Excluir
      const deleteBtn = document.createElement('button')
      deleteBtn.className = 'eq-icon-btn'
      deleteBtn.type = 'button'
      deleteBtn.title = 'Remover chave'
      deleteBtn.innerHTML = ICONS.trash
      if (keys.length <= 1) {
        deleteBtn.disabled = true
        deleteBtn.style.opacity = '0.3'
        deleteBtn.title = 'Você precisa manter pelo menos 1 chave cadastrada.'
      } else {
        deleteBtn.addEventListener('click', () => {
          if (confirm(`Remover permanentemente a ${k.label || `Chave ${idx + 1}`}?`)) {
            const res = keyManager.removeKey(k.id)
            if (res.ok) {
              const rawKeys = keyManager.exportRawKeys()
              this.callbacks.onSettingsChange({ apiKey: rawKeys[0], apiKeys: rawKeys })
              this.setStatus(`Chave removida com sucesso.`, 'info')
              this.renderKeysList()
            } else {
              this.setStatus(res.message, 'warning')
            }
          }
        })
      }

      actions.appendChild(testBtn)
      actions.appendChild(editBtn)
      actions.appendChild(deleteBtn)

      row.appendChild(info)
      row.appendChild(actions)
      this.keysListEl.appendChild(row)
    })
  }

  public updateModelSelect(models: ModelOption[], selectedId?: string): void {
    const validModels = models.filter((m) => isValidQuizModel(m.id))
    const targetId = selectedId && isValidQuizModel(selectedId)
      ? selectedId
      : (isValidQuizModel(this.initialSettings.model) ? this.initialSettings.model : 'gemini-2.5-flash')
    this.modelSelect.innerHTML = ''
    let matched = false
    validModels.forEach((m) => {
      const isSelected = m.id === targetId
      if (isSelected) matched = true
      this.modelSelect.add(new Option(m.name, m.id, false, isSelected))
    })
    if (!matched && targetId && isValidQuizModel(targetId)) {
      this.modelSelect.add(new Option(`Gemini (${targetId})`, targetId, false, true))
    }
    this.modelSelect.value = targetId
  }

  public updateSelectedModel(modelId: string): void {
    if (!isValidQuizModel(modelId)) return
    const exists = Array.from(this.modelSelect.options).some((opt) => opt.value === modelId)
    if (!exists) {
      this.modelSelect.add(new Option(`Gemini (${modelId})`, modelId, false, true))
    }
    this.modelSelect.value = modelId
  }

  private applyHostDarkMode(enable: boolean) {
    const STYLE_ID = 'eq-host-dark-mode-style'
    const styleEl = document.getElementById(STYLE_ID)
    styleEl?.remove()
    this.host.classList.toggle('eq-dark-mode-active', enable)
  }

  public startQuestionTimer(): void {
    this.currentQuestionStartTime = Date.now()
    if (this.questionLiveTimerInterval) {
      clearInterval(this.questionLiveTimerInterval)
    }
    if (this.metricsLiveStatus) {
      this.metricsLiveStatus.textContent = 'Calculando...'
      this.metricsLiveStatus.classList.add('active')
    }
    const update = () => {
      if (!this.metricsLiveTime) return
      const elapsed = Date.now() - this.currentQuestionStartTime
      const mins = Math.floor(elapsed / 60000)
      const secs = Math.floor((elapsed % 60000) / 1000)
      const ms = Math.floor((elapsed % 1000) / 10)
      this.metricsLiveTime.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}.${String(ms).padStart(2, '0')}`
    }
    update()
    this.questionLiveTimerInterval = setInterval(update, 50)
  }

  public stopQuestionTimer(finalElapsedMs?: number): void {
    if (this.questionLiveTimerInterval) {
      clearInterval(this.questionLiveTimerInterval)
      this.questionLiveTimerInterval = null
    }
    if (this.metricsLiveStatus) {
      this.metricsLiveStatus.textContent = 'Parado'
      this.metricsLiveStatus.classList.remove('active')
    }
    if (this.metricsLiveTime && this.currentQuestionStartTime > 0) {
      const elapsed = finalElapsedMs !== undefined ? finalElapsedMs : Math.max(0, Date.now() - this.currentQuestionStartTime)
      const mins = Math.floor(elapsed / 60000)
      const secs = Math.floor((elapsed % 60000) / 1000)
      const ms = Math.floor((elapsed % 1000) / 10)
      this.metricsLiveTime.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}.${String(ms).padStart(2, '0')}`
    }
  }

  public updateTimingMetrics(metrics?: ActivityMetrics): void {
    const data = metrics || loadActivityMetrics()
    if (!this.metricTotalTime) return

    // Total Time
    const totalSec = Math.floor(data.totalElapsedMs / 1000)
    const mins = Math.floor(totalSec / 60)
    const secs = totalSec % 60
    this.metricTotalTime.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`

    // Average Time
    const avgSec = (data.averageDurationMs / 1000).toFixed(1)
    this.metricAvgTime.textContent = `${avgSec}s`

    // Completed count
    this.metricTotalCount.textContent = String(data.completedQuestionsCount)
    if (this.metricsTotalBadge) {
      this.metricsTotalBadge.textContent = `${data.completedQuestionsCount} Questão(ões)`
    }
    if (this.metricsHistoryCount) {
      this.metricsHistoryCount.textContent = `${data.records.length} registros`
    }

    this.renderMetricsHistory(data.records)
  }

  private renderMetricsHistory(records: QuestionTimingRecord[]): void {
    if (!this.metricsHistoryList) return
    if (records.length === 0) {
      this.metricsHistoryList.innerHTML = '<div class="eq-metrics-empty">Nenhuma questão respondida nesta sessão ainda.</div>'
      return
    }

    this.metricsHistoryList.innerHTML = ''
    const reversed = [...records].reverse()
    for (const rec of reversed) {
      const item = document.createElement('div')
      item.className = 'eq-metrics-item'

      const left = document.createElement('div')
      left.className = 'eq-metrics-item-left'

      const badge = document.createElement('span')
      badge.className = 'eq-metrics-badge'
      badge.textContent = `Q${rec.questionIndex}`

      const info = document.createElement('div')
      info.className = 'eq-metrics-item-info'

      const title = document.createElement('div')
      title.className = 'eq-metrics-item-title'
      title.textContent = rec.questionTitle || `Questão ${rec.questionIndex}`

      const meta = document.createElement('div')
      meta.className = 'eq-metrics-item-meta'
      const timeStr = new Date(rec.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      const modeStr = rec.mode ? rec.mode.replace('_', ' ') : 'auto'
      meta.textContent = `${timeStr} • Modo: ${modeStr}${rec.actionsCount ? ` • ${rec.actionsCount} ação(ões)` : ''}`

      info.appendChild(title)
      info.appendChild(meta)
      left.appendChild(badge)
      left.appendChild(info)

      const right = document.createElement('div')
      right.className = 'eq-metrics-item-right'

      const dur = document.createElement('span')
      dur.className = 'eq-metrics-item-dur'
      dur.textContent = `${(rec.durationMs / 1000).toFixed(2)}s`

      const status = document.createElement('span')
      status.className = `eq-metrics-item-status is-${rec.status}`
      status.textContent = rec.status === 'verified' || rec.status === 'answered' ? '✓ Injetado' : rec.status === 'manual' ? 'Gabarito' : 'Pendente'

      right.appendChild(dur)
      right.appendChild(status)

      item.appendChild(left)
      item.appendChild(right)
      this.metricsHistoryList.appendChild(item)
    }
  }

  private copyMetricsReport(): void {
    const data = loadActivityMetrics()
    const lines: string[] = []
    lines.push('# Relatório de Desempenho e Tempo — EasyQuiz')
    lines.push(`- **Questões Respondidas:** ${data.completedQuestionsCount}`)
    lines.push(`- **Tempo Total:** ${(data.totalElapsedMs / 1000).toFixed(1)}s`)
    lines.push(`- **Tempo Médio por Questão:** ${(data.averageDurationMs / 1000).toFixed(2)}s`)
    lines.push('')
    lines.push('### Histórico:')
    if (data.records.length === 0) {
      lines.push('_Nenhum registro ainda._')
    } else {
      data.records.forEach((r, idx) => {
        lines.push(`${idx + 1}. **${r.questionTitle || `Q${r.questionIndex}`}**: ${(r.durationMs / 1000).toFixed(2)}s (${r.status})`)
      })
    }
    navigator.clipboard.writeText(lines.join('\n')).then(() => {
      if (this.metricsCopyBtn) {
        const orig = this.metricsCopyBtn.innerHTML
        this.metricsCopyBtn.innerHTML = '✓ Copiado!'
        setTimeout(() => {
          this.metricsCopyBtn.innerHTML = orig
        }, 1500)
      }
    })
  }

  public destroy(): void {
    this.stopStopwatch()
    this.stopQuestionTimer()
    this.autopilot.stop()
    this.applyHostDarkMode(false)
    this.callbacks.onDestroy()
    this.host.remove()
  }
}
