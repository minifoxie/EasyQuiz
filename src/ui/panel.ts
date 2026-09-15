import type { AnalysisPlan, CapturedContext, CapturedImage, ImageDescriptionEntry, EasyQuizSettings, ResponseMode, ExecutionEngine, ModelOption, ActivityMetrics, QuestionTimingRecord } from '../core/types'
import type { ExecutionResult } from '../dom/executor'
import { AVAILABLE_MODELS, fetchAvailableModels, testApiKey, validateModelFast, isValidQuizModel, keyManager, KeyManager, resetSessionBlacklist } from '../core/gemini'
import { clearSessionMemories, getSessionMemories, resetAllData, loadActivityMetrics, resetActivityMetrics } from '../core/storage'
import { Autopilot } from '../dom/autopilot'
import { FloatingAnswersHud } from './floatingHud'
import { ICONS } from './icons'
import { PANEL_STYLES } from './styles'
import { BUILD_VERSION } from '../core/version'

// ====================================================================
// TRUSTED TYPES SAFE INNERHTML
// Sites com CSP strict (Google Forms, GitHub, etc.) bloqueiam innerHTML
// com strings puras quando require-trusted-types-for 'script' está ativo.
// Esta função cria uma política TrustedHTML para o EasyQuiz quando necessário.
// Em sites sem Trusted Types, usa innerHTML direto (comportamento padrão).
// ====================================================================
const _eqTT = (() => {
  try {
    if (typeof (window as any).trustedTypes?.createPolicy === 'function') {
      return (window as any).trustedTypes.createPolicy('easyquiz-ui#html', {
        createHTML: (s: string) => s,
      })
    }
  } catch {}
  return null
})()

export function setHTMLSafe(el: Element | ShadowRoot, html: string): void {
  try {
    if (_eqTT) {
      // Trusted Types ativo: cria TrustedHTML e usa para atribuir
      el.innerHTML = _eqTT.createHTML(html)
      return
    }
  } catch {}
  // Fallback 1: setHTMLUnsafe (Chrome 124+ nativo, bypassa Trusted Types check para shadow root)
  try {
    if (typeof (el as any).setHTMLUnsafe === 'function') {
      ;(el as any).setHTMLUnsafe(html)
      return
    }
  } catch {}
  // Fallback 2: innerHTML direto (sites sem Trusted Types)
  el.innerHTML = html
}


export interface PanelCallbacks {
  onAnalyze: (attempt?: number, signal?: AbortSignal, isAutopilot?: boolean) => Promise<AnalysisPlan | void>
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
  private latestImages: CapturedImage[] = []
  private latestImageDescriptions: ImageDescriptionEntry[] = []
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
  private terminalCmdHistory: string[] = []
  private terminalCmdHistoryIdx: number = -1
  private terminalMode: 'terminal' | 'output' = 'terminal'
  private _terminalInited: boolean = false
  private liveTerminalOutput: HTMLElement | null = null
  private terminalInputEl: HTMLInputElement | null = null
  private outputSearchQuery: string = ''
  private _reconnectContextbarBtns: () => void = () => {}
  private _autopilotAnalyzingShown: boolean = false  // evita spam de "IA analisando..." por ciclo

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
  private copyPromptBtn: HTMLButtonElement | null = null

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
  private toastStackingCheckbox: HTMLInputElement
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
          // Evitar spam de 'IA analisando...' para cada mensagem de log — só mostrar uma vez
          if (!this._autopilotAnalyzingShown) {
            this._autopilotAnalyzingShown = true
            this.setBusy(true, 'Autopilot: IA analisando...')
          }
        } else if (status === 'advancing' || status === 'waiting') {
          this._autopilotAnalyzingShown = false  // reset para pr\u00f3ximo ciclo
          this.setBusy(false)
          this.updateAutopilotUi(true)
        } else if (status === 'idle') {
          this._autopilotAnalyzingShown = false
          this.setBusy(false)
          this.updateAutopilotUi(false)
          if (msg.includes('conclusão') || msg.includes('finalizada') || msg.includes('Parabéns')) {
            this.setStatus('Atividade concluída. Resolver Autopilot finalizado com sucesso.', 'success')
          } else {
            this.setStatus('Resolver Autopilot pausado e aguardando nova ação.', 'info')
          }
        } else if (status === 'error') {
          this._autopilotAnalyzingShown = false
          this.setBusy(false)
          this.updateAutopilotUi(false)
          this.setStatus('Resolver Autopilot interrompido por erro.', 'error')
        }
      },
      onRequestAnalysis: async (attempt?: number, signal?: AbortSignal) => {
        try {
          // isAutopilot=true: garante que o aplicador sempre tente avançar (forceAdvance)
          const plan = await this.callbacks.onAnalyze(attempt, signal, true)
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

    setHTMLSafe(this.shadow, `
      <svg width="0" height="0" style="position:absolute;">
        <defs>
          <linearGradient id="geminiGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#4285F4"/>
            <stop offset="50%" stop-color="#9B72CB"/>
            <stop offset="100%" stop-color="#D96570"/>
          </linearGradient>
        </defs>
      </svg>
      <style>${PANEL_STYLES}</style>

      <!-- Launcher mínimo: apenas o controle para abrir/recolher o painel. -->
      <button class="eq-launcher" type="button" title="Abrir / Recolher painel EasyQuiz (Alt+Q)" aria-label="Abrir ou esconder painel EasyQuiz">
        <span class="eq-launcher-icon">${ICONS.chevronRight}</span>
        <span class="eq-launcher-dot" id="eq-launcher-dot" aria-hidden="true"></span>
      </button>

      <!-- Sidebar Fixa Lateral Direita Estilo VS Code -->
      <aside class="eq-sidebar" aria-label="EasyQuiz Sidebar">
        <!-- Aba Retrátil na Borda Esquerda -->
        <button class="eq-dock-toggle" id="eq-dock-toggle" type="button" title="Recolher / Expandir Painel (Alt+Q)">
          <span class="eq-dock-toggle-icon">${ICONS.chevronRight}</span>
        </button>
           <!-- Activity Bar Vertical na Esquerda (Estilo VS Code - Apenas Ícones) -->
          <nav class="eq-activity-bar" role="tablist" aria-label="Atalhos">
            <div class="eq-activity-top">
              <button class="eq-activity-btn active" id="eq-tab-resolver" role="tab" title="Resolver (Operações Atuais)">
                <span class="eq-activity-indicator"></span>
                <span class="eq-activity-icon">${ICONS.sparkles}</span>
              </button>

              <button class="eq-activity-btn" id="eq-tab-brain" role="tab" title="Cérebro da IA (Contexto e Inspeção)">
                <span class="eq-activity-indicator"></span>
                <span class="eq-activity-icon">${ICONS.inspector}</span>
              </button>

              <button class="eq-activity-btn" id="eq-tab-metrics" role="tab" title="Métricas & Cronômetro (Tempo por Questão e Histórico)">
                <span class="eq-activity-indicator"></span>
                <span class="eq-activity-icon">${ICONS.clock}</span>
              </button>

              <button class="eq-activity-btn" id="eq-tab-debug" role="tab" title="Terminal & Debug Output (Logs, Tokens, Prompts, Erros)">
                <span class="eq-activity-indicator"></span>
                <span class="eq-activity-icon">${ICONS.code}</span>
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
            <!-- Cabeçalho do painel Legacy -->
            <header class="eq-header">
              <div class="eq-brand">
                <span class="eq-brand-icon"><img src="${ICONS.canvasLogo}" alt="EasyQuiz" /></span>
                <span class="eq-brand-name">EasyQuiz</span>
                <span class="eq-brand-badge">BETA</span>
                <span class="eq-brand-version">${BUILD_VERSION}</span>
                <span id="eq-active-model-badge" style="display:none; font-size:9px; font-weight:700; padding:1px 5px; border-radius:3px; background:rgba(251,191,36,0.14); border:1px solid rgba(251,191,36,0.4); color:#fbbf24; letter-spacing:0.04em; white-space:nowrap;"></span>
              </div>
              <div class="eq-header-tools">
                <button class="eq-icon-btn" id="eq-min-btn" type="button" title="Minimizar (Alt+Q)">${ICONS.chevronRight}</button>
                <button class="eq-icon-btn" id="eq-close-btn" type="button" title="Fechar">${ICONS.close}</button>
              </div>
            </header>

            <!-- Context Topbar: padronizado em todas as abas -->
            <div id="eq-tab-contextbar" style="display:flex;align-items:center;justify-content:space-between;padding:7px 12px;background:rgba(255,255,255,0.025);border-bottom:1px solid rgba(255,255,255,0.06);flex-shrink:0;min-height:30px;">
              <div style="display:flex;align-items:center;gap:8px;">
                <span id="eq-ctxbar-icon" style="display:inline-flex;color:#aaa;opacity:0.7;"></span>
                <span id="eq-ctxbar-name" style="font-size:11px;font-weight:700;color:#ccc;letter-spacing:0.02em;"></span>
                <span id="eq-ctxbar-sub" style="font-size:9px;color:#444;font-weight:500;"></span>
              </div>
              <div id="eq-ctxbar-actions" style="display:flex;align-items:center;gap:4px;"></div>
            </div>

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

                <div class="eq-resolver-hero">
                  <div class="eq-resolver-brand">
                    <span class="eq-brand-mark"><img src="${ICONS.canvasLogo}" alt="EQ Legacy" /></span>
                    <div class="eq-brand-copy">
                      <div class="eq-brand-title">EQ Legacy</div>
                      <div class="eq-brand-subline">BETA • ${BUILD_VERSION}</div>
                    </div>
                  </div>
                </div>

                <!-- CTA: Autopilot + 3-dot as SEPARATE standalone buttons -->
                <div class="eq-cta-wrapper">
                  <button class="eq-resolve-primary" id="eq-analyze-btn" type="button">
                    <span class="eq-btn-icon">${ICONS.sparkles}</span>
                    <span class="eq-btn-label">Resolver Autopilot</span>
                    <span class="eq-btn-shimmer" aria-hidden="true"></span>
                  </button>
                  <!-- 3-dot shell: button + floating menu as siblings -->
                  <div class="eq-menu-shell">
                    <button class="eq-resolve-menu" id="eq-auto-menu-btn" type="button" aria-label="Mais opções" title="Mais opções">
                      <span class="eq-btn-icon">${ICONS.moreVertical}</span>
                    </button>
                    <div class="eq-resolver-context-menu" id="eq-auto-menu" hidden>
                      <button type="button" class="eq-menu-item" data-auto-action="toggle">
                        <span class="eq-menu-icon">${ICONS.sparkles}</span>
                        <span>Resolver Autopilot</span>
                      </button>
                      <button type="button" class="eq-menu-item" data-auto-action="memory">
                        <span class="eq-menu-icon">${ICONS.eraser}</span>
                        <span>Limpar memória</span>
                      </button>
                      <button type="button" class="eq-menu-item" data-auto-action="status">
                        <span class="eq-menu-icon">${ICONS.info}</span>
                        <span>Mostrar status</span>
                      </button>
                    </div>
                  </div>
                  <!-- Animated ping-pong line (visible only when running) -->
                  <div class="eq-cta-progress-line" id="eq-cta-progress-line" aria-hidden="true"></div>
                </div>

                <!-- STATUS BAR: always minimal single line -->
                <div class="eq-status-bar" id="eq-status-card">
                  <span class="eq-dot-pulse" id="eq-dot-ap"></span>
                  <span class="eq-status-bar-text" id="eq-status-summary">Sistema aguardando.</span>
                  <span class="eq-operation-state" id="eq-operation-state">Pronto</span>
                  <em class="eq-status-bar-timer" id="eq-stopwatch-ap"><span>--</span></em>
                </div>

                <!-- RESULTS: collapsible -->
                <div id="eq-result" class="eq-operation-result" style="display: none; flex-direction: column; gap: 0;">
                  <button class="eq-result-toggle" id="eq-result-toggle" type="button">
                    <span class="eq-result-toggle-icon">${ICONS.chevronRight}</span>
                    <span>Plano e respostas</span>
                    <div class="eq-badges" id="eq-badges" style="margin-left:auto;"></div>
                  </button>
                  <div class="eq-result-body" id="eq-result-body">
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
                </div>

                <!-- Console Terminal Oculto (Apenas para Autopilot Interno) -->
                <div class="eq-terminal" id="eq-ap-console" style="display: none;"></div>
                <div class="eq-terminal eq-terminal-execution" id="eq-execution-console" style="display: none;"></div>
                
                <div class="eq-footer-note" style="margin-top: auto;">${BUILD_VERSION} • Híbrido 4.0 (RAG + AST + Vision)</div>
              </div>

              <!-- TAB 2: CÉREBRO DA IA — VS Code Explorer -->
              <div class="eq-view-pane eq-brain-pane" id="eq-view-brain" style="display: none;">
                <!-- Toolbar -->
                <!-- Toolbar buttons hidden -->
                <div style="display:none"><button id="eq-brain-canvas-toggle"></button><button id="eq-copy-prompt-btn"></button></div>
                <!-- Main layout: canvas top, explorer bottom -->
                <div class="eq-brain-layout">
                  <!-- TOP: Tab Canvas -->
                  <div class="eq-brain-canvas">
                    <div class="eq-brain-tabbar" id="eq-brain-tabbar"></div>
                    <div class="eq-brain-content" id="eq-brain-content">
                      <div class="eq-brain-empty-canvas">
                        <div class="eq-brain-empty-icon"></div>
                        <div>Nada selecionado</div>
                        <div class="eq-brain-empty-sub">Clique em um item no explorador abaixo</div>
                      </div>
                    </div>
                  </div>
                  <!-- Resize handle -->
                  <div class="eq-brain-resize-handle" id="eq-brain-resize-handle" title="Arrastar para redimensionar"></div>
                  <!-- BOTTOM: File Tree -->
                  <div class="eq-brain-explorer" id="eq-brain-explorer">
                    <div class="eq-brain-empty-tree">Aguardando análise...</div>
                  </div>
                </div>
                <!-- Hidden compat holders -->
                <span id="eq-insp-model" style="display:none;"></span>
                <span id="eq-insp-latency" style="display:none;"></span>
                <span id="eq-insp-tokens" style="display:none;"></span>
                <span id="eq-insp-prompt" style="display:none;"></span>
                <span id="eq-insp-rationale" style="display:none;"></span>
                <div id="eq-insp-actions" style="display:none;"></div>
              </div><!-- FIX: FECHAMENTO eq-view-brain -->


              <!-- TAB 3: MÉTRICAS & CRONÔMETRO -->
              <div class="eq-view-pane" id="eq-view-metrics" style="display: none; gap:0; padding: 0;">

                <span id="eq-metrics-total-badge" style="display:none">0 QUESTÕES</span>
                <!-- Cronômetro ao vivo -->
                <div style="padding:14px 14px 10px;border-bottom:1px solid rgba(255,255,255,0.05);flex-shrink:0;background:rgba(0,152,255,0.03);">
                  <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;">
                    <span style="font-size:9px;font-weight:700;letter-spacing:0.12em;color:#555;">QUESTÃO ATUAL</span>
                    <span id="eq-metrics-live-status" style="font-size:9px;padding:2px 8px;border-radius:8px;background:rgba(255,255,255,0.06);color:#666;font-weight:600;">Em espera</span>
                  </div>
                  <div id="eq-metrics-live-time" style="font-size:36px;font-weight:800;letter-spacing:-0.02em;color:#fff;font-variant-numeric:tabular-nums;line-height:1;font-family:monospace;">00:00.00</div>
                  <div style="font-size:9px;color:#444;margin-top:5px;">Cronômetro em tempo real · zero tokens consumidos</div>
                </div>

                <!-- Cards de resumo (3 col) -->
                <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:rgba(255,255,255,0.05);flex-shrink:0;">
                  <div style="background:#0c0c14;padding:10px 12px;display:flex;flex-direction:column;gap:3px;">
                    <div style="font-size:9px;color:#555;font-weight:600;letter-spacing:0.06em;">TEMPO TOTAL</div>
                    <div id="eq-metric-total-time" style="font-size:20px;font-weight:800;color:#e0e0e0;font-variant-numeric:tabular-nums;font-family:monospace;">00:00</div>
                    <div style="font-size:9px;color:#444;">Sessão atual</div>
                  </div>
                  <div style="background:#0c0c14;padding:10px 12px;display:flex;flex-direction:column;gap:3px;">
                    <div style="font-size:9px;color:#555;font-weight:600;letter-spacing:0.06em;">MÉDIA / Q.</div>
                    <div id="eq-metric-avg-time" style="font-size:20px;font-weight:800;color:#4ade80;font-variant-numeric:tabular-nums;font-family:monospace;">0.0s</div>
                    <div style="font-size:9px;color:#444;">Ritmo médio</div>
                  </div>
                  <div style="background:#0c0c14;padding:10px 12px;display:flex;flex-direction:column;gap:3px;">
                    <div style="font-size:9px;color:#555;font-weight:600;letter-spacing:0.06em;">RESPONDIDAS</div>
                    <div id="eq-metric-total-count" style="font-size:20px;font-weight:800;color:#fbbf24;font-variant-numeric:tabular-nums;font-family:monospace;">0</div>
                    <div style="font-size:9px;color:#444;">Questões OK</div>
                  </div>
                </div>

                <div style="display:none"><button id="eq-metrics-copy-btn" type="button"></button><button id="eq-metrics-reset-btn" type="button"></button></div>

                <!-- Histórico -->
                <div style="display:flex;align-items:center;justify-content:space-between;padding:7px 12px 5px;flex-shrink:0;">
                  <span style="font-size:9px;font-weight:700;letter-spacing:0.08em;color:#555;">HISTÓRICO POR QUESTÃO</span>
                  <span id="eq-metrics-history-count" style="font-size:9px;color:#444;">0 registros</span>
                </div>
                <div id="eq-metrics-history-list" style="flex:1;overflow-y:auto;padding:0 10px 10px;">
                  <div class="eq-metrics-empty">Nenhuma questão respondida nesta sessão ainda.</div>
                </div>

              </div>

              <!-- TAB 4: DEBUG OUTPUT & TERMINAL -->
              <div class="eq-view-pane" id="eq-view-debug" style="display:none;flex-direction:column;">
                <span id="eq-debug-badge" style="display:none">ATIVO</span>

                <!-- Output mode toolbar (only visible in output mode) -->
                <div id="eq-output-toolbar" style="display:none;align-items:center;gap:6px;padding:5px 10px;background:#0a0a0a;border-bottom:1px solid #1a1a1a;flex-shrink:0;">
                  <!-- Filter dropdown trigger -->
                  <div style="position:relative;display:inline-flex;">
                    <button id="eq-output-filter-btn" type="button" style="display:inline-flex;align-items:center;gap:4px;font-size:10px;font-weight:600;padding:3px 9px;border-radius:4px;background:#111;border:1px solid #222;color:#888;cursor:pointer;font-family:'Cascadia Code','Fira Code',monospace;transition:border-color 0.12s;">
                      <span id="eq-output-filter-label">Filtro: Todos</span>
                      ${ICONS.chevronRight}
                    </button>
                    <div id="eq-output-filter-menu" hidden style="position:absolute;top:calc(100% + 4px);left:0;z-index:9999;background:#111;border:1px solid #222;border-radius:6px;padding:4px;min-width:150px;box-shadow:0 8px 24px rgba(0,0,0,0.6);">
                      <div style="padding:4px 8px 2px;font-size:8px;font-weight:700;letter-spacing:0.1em;color:#333;font-family:monospace;">CATEGORIAS</div>
                      <label id="eq-filter-opt-all"   style="display:flex;align-items:center;gap:8px;padding:5px 10px;cursor:pointer;border-radius:4px;font-size:10px;color:#aaa;font-family:monospace;transition:background 0.08s;"><input type="checkbox" id="eq-fchk-all"   checked style="accent-color:#555;"> Todos <span id="eq-dbg-count-all"   style="margin-left:auto;color:#333;font-size:9px;">0</span></label>
                      <label id="eq-filter-opt-error" style="display:flex;align-items:center;gap:8px;padding:5px 10px;cursor:pointer;border-radius:4px;font-size:10px;color:#aaa;font-family:monospace;transition:background 0.08s;"><input type="checkbox" id="eq-fchk-error"         style="accent-color:#ff5555;"> Erros <span id="eq-dbg-count-error" style="margin-left:auto;color:#333;font-size:9px;">0</span></label>
                      <label id="eq-filter-opt-ai"    style="display:flex;align-items:center;gap:8px;padding:5px 10px;cursor:pointer;border-radius:4px;font-size:10px;color:#aaa;font-family:monospace;transition:background 0.08s;"><input type="checkbox" id="eq-fchk-ai"           style="accent-color:#60a5fa;"> IA <span id="eq-dbg-count-ai"    style="margin-left:auto;color:#333;font-size:9px;">0</span></label>
                      <label id="eq-filter-opt-dom"   style="display:flex;align-items:center;gap:8px;padding:5px 10px;cursor:pointer;border-radius:4px;font-size:10px;color:#aaa;font-family:monospace;transition:background 0.08s;"><input type="checkbox" id="eq-fchk-dom"          style="accent-color:#4ade80;"> DOM/Exec <span id="eq-dbg-count-dom" style="margin-left:auto;color:#333;font-size:9px;">0</span></label>
                      <div style="height:1px;background:#1a1a1a;margin:4px 0;"></div>
                      <div style="padding:2px 8px;display:flex;gap:4px;">
                        <button id="eq-fchk-apply" type="button" style="flex:1;font-size:9px;padding:3px 6px;background:#1a1a1a;border:1px solid #2a2a2a;border-radius:3px;color:#888;cursor:pointer;font-family:monospace;">Aplicar</button>
                      </div>
                    </div>
                  </div>
                  <!-- Search -->
                  <div style="flex:1;display:flex;align-items:center;gap:5px;background:#0d0d0d;border:1px solid #1e1e1e;border-radius:4px;padding:3px 8px;">
                    <span style="color:#333;display:inline-flex;flex-shrink:0;">${ICONS.search || '⌕'}</span>
                    <input id="eq-output-search" type="text" placeholder="buscar logs..." autocomplete="off" style="flex:1;background:transparent;border:none;outline:none;color:#888;font-size:9.5px;font-family:'Cascadia Code','Fira Code',monospace;caret-color:#555;" />
                    <button id="eq-output-search-clear" type="button" style="display:none;background:transparent;border:none;color:#444;cursor:pointer;font-size:10px;padding:0;line-height:1;">✕</button>
                  </div>
                  <!-- Auto-scroll -->
                  <button id="eq-dbg-scroll-toggle" type="button" title="Auto-scroll" style="display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;background:#111;border:1px solid #222;border-radius:4px;color:#444;cursor:pointer;font-size:11px;flex-shrink:0;transition:color 0.12s;">↓</button>
                </div>

                <!-- TERMINAL MODE -->
                <div id="eq-term-panel-terminal" style="flex:1;display:flex;flex-direction:column;overflow:hidden;min-height:0;">
                  <div id="eq-term-output" style="flex:1;overflow-y:auto;padding:10px 14px 4px;font-family:'Cascadia Code','Fira Code','Courier New',monospace;font-size:11.5px;line-height:1.6;background:#0d0d0d;color:#e0e0e0;word-break:break-all;user-select:text;-webkit-user-select:text;cursor:text;">
                    <div style="color:#333;">┌─────────────────────────────────────────────────┐</div>
                    <div style="color:#333;">│  <span style="color:#888;">EasyQuiz Terminal</span>  <span style="color:#444;">v${BUILD_VERSION}</span>               │</div>
                    <div style="color:#333;">│  Digite <span style="color:#ccc;font-weight:600;">help</span> para ver os comandos disponíveis  │</div>
                    <div style="color:#333;">└─────────────────────────────────────────────────┘</div>
                  </div>
                  <div id="eq-term-input-line" style="display:flex;align-items:center;padding:6px 14px;background:#080808;border-top:1px solid #1a1a1a;flex-shrink:0;font-family:'Cascadia Code','Fira Code','Courier New',monospace;font-size:11.5px;cursor:text;">
                    <span style="color:#fff;font-weight:700;white-space:nowrap;user-select:none;">EasyQuiz_Legacy:</span>
                    <input id="eq-term-input" type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" style="flex:1;background:transparent;border:none;outline:none;color:#e0e0e0;font-family:inherit;font-size:inherit;margin-left:8px;caret-color:#fff;" placeholder="" />
                  </div>
                </div>

                <!-- OUTPUT MODE -->
                <div id="eq-term-panel-output" style="flex:1;display:none;flex-direction:column;overflow:hidden;min-height:0;">
                  <div class="eq-terminal" id="eq-live-debug-terminal" style="flex:1;font-family:'Cascadia Code','Fira Code','Courier New',monospace;font-size:10.5px;background:#0d0d0d;overflow-y:auto;padding:8px 14px;line-height:1.55;user-select:text;-webkit-user-select:text;color:#ccc;">
                    <div style="color:#444;">&gt; [SYS] Output de auditoria pronto.</div>
                  </div>
                </div>

                <!-- Error card -->
                <div class="eq-debug-error-card" id="eq-dbg-error-card" style="display:none;flex-shrink:0;">
                  <div class="eq-debug-error-header">
                    <span>Último Erro</span>
                    <button class="eq-icon-btn" id="eq-dbg-copy-error-btn" type="button" title="Copiar" style="width:20px;height:20px;">${ICONS.copy}</button>
                  </div>
                  <div class="eq-debug-error-msg" id="eq-dbg-error-text"></div>
                </div>

                <!-- Hidden API info elements (filled by refreshDebugView) -->
                <div style="display:none;">
                  <span id="eq-dbg-model">--</span>
                  <span id="eq-dbg-latency">--</span>
                  <span id="eq-dbg-total-tokens">--</span>
                  <span id="eq-dbg-split-tokens">--/--</span>
                  <span id="eq-dbg-prompt-len">--</span>
                </div>

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
                      <button class="eq-context-item" id="eq-menu-bulk" type="button">
                        <span class="eq-item-icon">${ICONS.listPlus}</span>
                        <span class="eq-item-text">Importar Chaves em Lote</span>
                        <span class="eq-item-badge">Novo</span>
                      </button>
                      <button class="eq-context-item" id="eq-menu-edit-text" type="button">
                        <span class="eq-item-icon">${ICONS.edit}</span>
                        <span class="eq-item-text">Ver / Editar Chaves como Texto</span>
                      </button>
                      <div class="eq-context-divider"></div>
                      <button class="eq-context-item" id="eq-menu-test" type="button">
                        <span class="eq-item-icon">${ICONS.sparkles}</span>
                        <span class="eq-item-text">Testar Todas as Chaves</span>
                      </button>
                      <button class="eq-context-item danger" id="eq-menu-delete-all" type="button">
                        <span class="eq-item-icon">${ICONS.trash}</span>
                        <span class="eq-item-text">Apagar Todas as Chaves</span>
                      </button>
                      <button class="eq-context-item danger" id="eq-menu-reset" type="button">
                        <span class="eq-item-icon">${ICONS.trash}</span>
                        <span class="eq-item-text">Resetar Dados e Cache</span>
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Model select hidden (controlled elsewhere) -->
                <select id="eq-model-select" style="display:none;"></select>
                
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
                  <label class="eq-checkbox-label" style="margin-top: 6px;">
                    <input id="eq-toast-stacking" type="checkbox" />
                    <span style="color: #fbbf24;">Acumular Toasts (Histórico de Notificações)</span>
                  </label>
                </div>

                <!-- Zona de Redefinição -->
                <div class="eq-field-group" style="margin-top: 14px; padding-top: 12px; border-top: 1px solid #282828;">
                  <div class="eq-section-title" style="color: #ff5555;">Zona de Redefinição</div>
                  <button class="eq-btn-secondary" id="eq-reset-all-btn" type="button" style="border-color: #662222; color: #ff8888;">
                    ${ICONS.trash} Resetar Todos os Dados e Memória
                  </button>
                </div>

                <div class="eq-footer-note" style="margin-top: auto;">Configurações salvas localmente no navegador • ${BUILD_VERSION}</div>
              </div>
            </div>
          </main>
        </aside>
    `)

    // Bindings de Layout
    this.launcherBtn = this.shadow.querySelector('.eq-launcher') as HTMLButtonElement
    this.launcherDot = this.shadow.querySelector('#eq-launcher-dot') as HTMLElement
    this.dockToggleBtn = this.shadow.querySelector('#eq-dock-toggle') as HTMLButtonElement
    this.sidebarEl = this.shadow.querySelector('.eq-sidebar') as HTMLElement
    this.apToggleBtn = this.shadow.querySelector('#eq-ap-toggle-btn') as HTMLButtonElement | null
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
    this.statusTextAp = (this.shadow.querySelector('#eq-status-text-ap') as HTMLElement | null) || (this.shadow.querySelector('#eq-status-summary') as HTMLElement | null) || this.dotPulseAp
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
    this.copyPromptBtn = this.shadow.querySelector('#eq-copy-prompt-btn') as HTMLButtonElement | null

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
    this.toastStackingCheckbox = this.shadow.querySelector('#eq-toast-stacking') as HTMLInputElement
    this.toastStackingCheckbox = this.shadow.querySelector('#eq-toast-stacking') as HTMLInputElement
    this.analyzeBtn = this.shadow.querySelector('#eq-analyze-btn') as HTMLButtonElement
    this.applyBtn = this.shadow.querySelector('#eq-apply-btn') as HTMLButtonElement | null
    if (this.applyBtn) this.applyBtn.disabled = true
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
    this.toastStackingCheckbox.checked = initialSettings.toastStacking ?? true
    this.toastStackingCheckbox.checked = initialSettings.toastStacking ?? true

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
    this.mountHost()
    this.applyHostDarkMode(initialSettings.hostDarkMode)

    // Inicializar Pool Multi-API Key
    const initialRawKeys = Array.isArray(initialSettings.apiKeys) && initialSettings.apiKeys.length > 0
      ? initialSettings.apiKeys
      : (initialSettings.apiKey ? [initialSettings.apiKey] : [])
    keyManager.init(initialRawKeys)
    this.apiKeyInput.value = keyManager.getBestKey() || initialSettings.apiKey || ''
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

  private switchTab(tab: 'resolver' | 'brain' | 'media' | 'metrics' | 'debug' | 'settings') {
    this.activeTab = tab
    const ALL_TABS = ['resolver', 'brain', 'metrics', 'debug', 'settings'] as const
    const wrapper = this.shadow.querySelector('.eq-views-wrapper') as HTMLElement | null

    // Toggle brain layout class on wrapper (zero-padding for brain, normal for others)
    wrapper?.classList.toggle('is-brain-active', tab === 'brain')

    // Show active pane, hide all others
    for (const t of ALL_TABS) {
      const btn  = this.shadow.querySelector(`#eq-tab-${t}`)  as HTMLElement | null
      const view = this.shadow.querySelector(`#eq-view-${t}`) as HTMLElement | null
      const active = t === tab
      btn?.classList.toggle('active', active)
      if (view) view.style.display = active ? 'flex' : 'none'
    }

    // Update unified context topbar
    this.updateContextBar(tab)

    // Per-tab initialization
    switch (tab) {
      case 'brain':
        this.initBrainControls()
        this.renderContextTree()
        this.refreshInspectorView()
        break
      case 'metrics':
        try { this.updateTimingMetrics() } catch {}
        break
      case 'debug':
        try { this.refreshDebugView(); this.renderTerminalEntries(); this.initTerminalREPL() } catch {}
        break
      case 'settings':
        // Settings is static HTML — no special init needed
        break
    }
  }

  private updateContextBar(tab: string): void {
    const icon = this.shadow.querySelector('#eq-ctxbar-icon') as HTMLElement | null
    const name = this.shadow.querySelector('#eq-ctxbar-name') as HTMLElement | null
    const sub  = this.shadow.querySelector('#eq-ctxbar-sub')  as HTMLElement | null
    const acts = this.shadow.querySelector('#eq-ctxbar-actions') as HTMLElement | null
    if (!icon || !name || !sub || !acts) return

    acts.innerHTML = ''

    const TAB_META: Record<string, { icon: string; label: string; sub: string; color: string; actions?: () => HTMLElement[] }> = {
      resolver: {
        icon: ICONS.sparkles, label: 'Resolver', sub: 'Autopilot & operações', color: '#a78bfa',
        actions: () => {
          const badge = document.createElement('span')
          badge.id = 'eq-ctxbar-status'
          badge.style.cssText = 'font-size:9px;font-weight:700;padding:2px 7px;border-radius:10px;background:rgba(167,139,250,0.13);border:1px solid rgba(167,139,250,0.25);color:#a78bfa;letter-spacing:0.04em;'
          badge.textContent = 'PRONTO'
          return [badge]
        }
      },
      brain: {
        icon: ICONS.inspector, label: 'Cérebro da IA', sub: 'Contexto & inspeção', color: '#60a5fa',
        actions: () => {
          const toggleBtn = this.shadow.querySelector('#eq-brain-canvas-toggle') as HTMLElement | null
          // Mirror toggle button state in contextbar
          const eyeBtn = document.createElement('button')
          eyeBtn.style.cssText = 'display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);border-radius:4px;cursor:pointer;color:#888;'
          eyeBtn.innerHTML = this.brainCanvasHidden ? ICONS.eyeOff : ICONS.eye
          eyeBtn.title = 'Mostrar/Ocultar canvas'
          eyeBtn.addEventListener('click', () => { toggleBtn?.click(); eyeBtn.innerHTML = this.brainCanvasHidden ? ICONS.eyeOff : ICONS.eye })
          const copyBtn2 = document.createElement('button')
          copyBtn2.style.cssText = 'display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);border-radius:4px;cursor:pointer;color:#888;'
          copyBtn2.innerHTML = ICONS.copy
          copyBtn2.title = 'Copiar conteúdo selecionado'
          copyBtn2.addEventListener('click', () => this.smartCopy())
          return [eyeBtn, copyBtn2]
        }
      },
      metrics: {
        icon: ICONS.clock, label: 'Métricas', sub: 'Cronômetro & histórico', color: '#4ade80',
        actions: () => {
          const copyBtn3 = document.createElement('button')
          copyBtn3.style.cssText = 'display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);border-radius:4px;cursor:pointer;color:#888;'
          copyBtn3.innerHTML = ICONS.copy
          copyBtn3.title = 'Copiar relatório'
          copyBtn3.addEventListener('click', () => this.copyMetricsReport())
          const resetBtn = document.createElement('button')
          resetBtn.style.cssText = 'display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;background:rgba(255,85,85,0.08);border:1px solid rgba(255,85,85,0.15);border-radius:4px;cursor:pointer;color:#ff8888;'
          resetBtn.innerHTML = ICONS.trash
          resetBtn.title = 'Zerar métricas'
          resetBtn.addEventListener('click', () => {
            const rb = this.shadow.querySelector('#eq-metrics-reset-btn') as HTMLButtonElement | null
            rb?.click()
          })
          return [copyBtn3, resetBtn]
        }
      },
      debug: {
        icon: ICONS.code, label: 'Terminal', sub: 'Comandos & logs', color: '#0098ff',
        actions: () => {
          // Mode switcher pill
          const pill = document.createElement('div')
          pill.style.cssText = 'display:inline-flex;align-items:center;gap:1px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:4px;padding:2px;'
          const mkMode = (id: string, label: string, active: boolean) => {
            const b = document.createElement('button')
            b.id = id; b.type = 'button'; b.textContent = label
            b.style.cssText = 'font-size:9px;font-weight:600;padding:2px 8px;border-radius:3px;cursor:pointer;transition:all 0.1s;background:' + (active ? '#1a1a1a' : 'transparent') + ';border:1px solid ' + (active ? '#333' : 'transparent') + ';color:' + (active ? '#ddd' : '#555') + ';'
            return b
          }
          pill.appendChild(mkMode('eq-term-mode-terminal', 'Terminal', true))
          pill.appendChild(mkMode('eq-term-mode-output', 'Output', false))
          // Copy button
          const cpBtn = document.createElement('button')
          cpBtn.id = 'eq-term-copy-btn'; cpBtn.type = 'button'; cpBtn.title = 'Copiar'
          cpBtn.style.cssText = 'display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:4px;cursor:pointer;color:#888;'
          cpBtn.innerHTML = ICONS.copy
          // Clear button
          const clBtn = document.createElement('button')
          clBtn.id = 'eq-term-clear-btn'; clBtn.type = 'button'; clBtn.title = 'Limpar'
          clBtn.style.cssText = 'display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;background:rgba(255,85,85,0.06);border:1px solid rgba(255,85,85,0.12);border-radius:4px;cursor:pointer;color:#ff5555;'
          clBtn.innerHTML = ICONS.eraser
          return [pill, cpBtn, clBtn]
        }
      },
      settings: {
        icon: ICONS.settings, label: 'Configurações', sub: 'Ajustes & preferências', color: '#fbbf24'
      },
    }

    const meta = TAB_META[tab]
    if (!meta) return

    icon.innerHTML = meta.icon
    icon.style.color = meta.color
    name.textContent = meta.label
    name.style.color = meta.color === '#a78bfa' ? '#ccc' : '#ddd'
    sub.textContent = meta.sub

    if (meta.actions) {
      for (const el of meta.actions()) acts.appendChild(el)
    }
  }

  private setupEventListeners(): void {
    // Abas do Activity Bar Vertical
    this.shadow.querySelector('#eq-tab-resolver')?.addEventListener('click', () => this.switchTab('resolver'))
    // Init contextbar for the default active tab
    setTimeout(() => this.updateContextBar(this.activeTab || 'resolver'), 0)
    this.shadow.querySelector('#eq-tab-brain')?.addEventListener('click', () => this.switchTab('brain'))
    this.shadow.querySelector('#eq-tab-metrics')?.addEventListener('click', () => this.switchTab('metrics'))
    this.shadow.querySelector('#eq-tab-debug')?.addEventListener('click', () => this.switchTab('debug'))
    this.shadow.querySelector('#eq-tab-settings')?.addEventListener('click', () => this.switchTab('settings'))

    const statusCard = this.shadow.querySelector('#eq-status-card') as HTMLElement | null
    statusCard?.addEventListener('click', () => {
      const collapsed = statusCard.classList.toggle('is-collapsed')
      statusCard.setAttribute('aria-expanded', String(!collapsed))
    })

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
    // Atalho de Teclado Alt+Q ou Alt+A para recolher/expandir
    window.addEventListener(
      'keydown',
      (e) => {
        if (e.altKey && (e.key === 'q' || e.key === 'Q' || e.key === 'a' || e.key === 'A')) {
          e.preventDefault()
          this.toggle()
        }
      },
      true,
    )

    // ==== BLINDAGEM COMPLETA DE TECLADO CONTRA SITES DE EXAMES ====
    // Permite eventos que se originam dentro do nosso Shadow DOM (inclui overlays de importação)
    const keyboardCaptureShield = (e: KeyboardEvent) => {
      const path = e.composedPath()
      // Se o evento veio de dentro do shadow root, deixar fluir normalmente
      if (path.includes(this.shadow as any)) return
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
        keysCollapsible.style.display = 'none'
        if (keysChevron) keysChevron.style.transform = 'rotate(0deg)'
      } else {
        keysCollapsible.style.display = 'block'
        keysCollapsible.style.maxHeight = 'none'
        keysCollapsible.style.overflow = 'visible'
        if (keysChevron) keysChevron.style.transform = 'rotate(90deg)'
      }
    }

    // Restaurar estado salvo (com guard para Node.js / ambientes sem localStorage)
    let savedCollapsed = false
    try { savedCollapsed = localStorage.getItem('easyquiz_keys_collapsed') === 'true' } catch {}
    applyCollapseState(savedCollapsed)

    keysSectionHeader?.addEventListener('click', (e) => {
      // Se clicou em link externo (+ Obter), não colapsa/expande
      if ((e.target as HTMLElement)?.closest('a')) return
      const isNowCollapsed = keysCollapsible?.style.display === 'none'
      applyCollapseState(!isNowCollapsed)
      try { localStorage.setItem('easyquiz_keys_collapsed', (!isNowCollapsed) ? 'true' : 'false') } catch {}
    })

    const autoMenuBtn = this.shadow.querySelector('#eq-auto-menu-btn') as HTMLButtonElement | null
    // autoMenu is now a SIBLING of autoMenuBtn inside .eq-menu-shell
    const autoMenu = this.shadow.querySelector('#eq-auto-menu') as HTMLElement | null
    if (autoMenu) autoMenu.hidden = true
    autoMenuBtn?.classList.remove('is-open')

    autoMenuBtn?.addEventListener('click', (e) => {
      e.stopPropagation()
      if (!autoMenu) return
      const wasHidden = autoMenu.hidden
      autoMenu.hidden = !wasHidden
      autoMenuBtn.classList.toggle('is-open', !autoMenu.hidden)
    })

    autoMenu?.querySelectorAll('[data-auto-action]').forEach((item) => {
      item.addEventListener('click', (e) => {
        e.stopPropagation()
        const action = (item as HTMLElement).dataset.autoAction
        if (action === 'toggle') {
          this.analyzeBtn?.click()
        } else if (action === 'memory') {
          clearSessionMemories()
          this.logToConsole('> [SYS] Memória contextual limpa com sucesso.', 'text-green')
          this.setStatus('Memória contextual da sessão limpa.', 'success')
        } else if (action === 'status') {
          const statusBar = this.shadow.querySelector('#eq-status-card') as HTMLElement | null
          statusBar?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
        }
        if (autoMenu) autoMenu.hidden = true
        autoMenuBtn?.classList.remove('is-open')
      })
    })

    this.shadow.addEventListener('click', (e) => {
      const target = e.target as HTMLElement
      // close if click is outside the entire .eq-menu-shell
      if (!target.closest('.eq-menu-shell')) {
        if (autoMenu) autoMenu.hidden = true
        autoMenuBtn?.classList.remove('is-open')
      }
    })

    // Results toggle (collapsible)
    const resultToggle = this.shadow.querySelector('#eq-result-toggle') as HTMLButtonElement | null
    const resultBody = this.shadow.querySelector('#eq-result-body') as HTMLElement | null
    if (resultToggle && resultBody) {
      // Start collapsed — CSS transition handles the animation
      resultBody.classList.add('is-collapsed')
      resultToggle.classList.remove('is-open')
      resultToggle.addEventListener('click', () => {
        const isOpen = resultToggle.classList.toggle('is-open')
        resultBody.classList.toggle('is-collapsed', !isOpen)
      })
    }

    // Botão Adicionar Nova Chave
    const saveKeyBtn = this.shadow.querySelector('#eq-key-save') as HTMLButtonElement | null
    saveKeyBtn?.addEventListener('click', () => {
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
        this.setStatus(` Nova chave adicionada com sucesso! (${rawKeys.length} chaves ativas no pool)`, 'success')
        applyCollapseState(false) // Auto-expande para garantir que o usuário veja a chave imediatamente
        try { localStorage.setItem('easyquiz_keys_collapsed', 'false') } catch {}
        this.renderKeysList()
        this.keyContextMenu.hidden = true

        // Valida em segundo plano
        testApiKey(cleanVal).then((testRes) => {
          if (testRes.ok) {
            keyManager.markSuccess(cleanVal, 100)
            this.setStatus(' Nova chave validada com sucesso no Google AI Studio!', 'success')
          } else {
            keyManager.markInvalid(cleanVal, testRes.message)
            this.setStatus(`️ Chave cadastrada, mas aviso retornado: ${testRes.message}`, 'warning')
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

    // 5. Importar Chaves em Lote
    this.shadow.querySelector('#eq-menu-bulk')?.addEventListener('click', () => {
      this.keyContextMenu.hidden = true

      // Remove overlay anterior se existir
      this.shadow.querySelector('#eq-bulk-overlay')?.remove()

      // ── Overlay dentro do Shadow DOM com isolamento e pointer-events: auto ──
      const overlay = document.createElement('div')
      overlay.id = 'eq-bulk-overlay'
      overlay.style.cssText = [
        'position:fixed',
        'inset:0',
        'z-index:2147483647',
        'pointer-events:auto',
        'background:rgba(0,0,0,0.78)',
        'backdrop-filter:blur(4px)',
        '-webkit-backdrop-filter:blur(4px)',
        'display:flex',
        'align-items:center',
        'justify-content:center',
        'font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif',
        'user-select:text',
        '-webkit-user-select:text',
      ].join(';')

      const card = document.createElement('div')
      card.style.cssText = [
        'background:#11151c',
        'color:#e2e8f0',
        'border:1px solid #283548',
        'border-radius:12px',
        'padding:20px',
        'width:440px',
        'max-width:92vw',
        'font-size:13px',
        'box-shadow:0 12px 40px rgba(0,0,0,0.85), 0 0 0 1px rgba(0,229,255,0.15)',
        'display:flex',
        'flex-direction:column',
        'gap:10px',
        'pointer-events:auto',
      ].join(';')

      card.innerHTML = `
        <div style="display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #1f2937;padding-bottom:10px;">
          <div style="display:flex;align-items:center;gap:8px;">
            <span style="font-size:16px;"></span>
            <h3 style="margin:0;font-size:14px;color:#00e5ff;font-weight:700;letter-spacing:0.02em;">Importar Chaves em Lote</h3>
          </div>
          <button id="eq-bulk-x" style="background:none;border:none;color:#94a3b8;font-size:20px;cursor:pointer;padding:0 4px;line-height:1;border-radius:4px;pointer-events:auto;" title="Fechar (Esc)"></button>
        </div>
        <p style="margin:0;font-size:11px;color:#94a3b8;line-height:1.4;">
          Cole suas chaves Gemini abaixo (uma por linha ou qualquer texto contendo chaves). O EasyQuiz extrai, adiciona e valida tudo automaticamente.
        </p>
        <div style="display:flex;gap:8px;">
          <button id="eq-bulk-paste-btn" type="button" style="background:#1e293b;color:#38bdf8;border:1px solid #0284c7;border-radius:6px;padding:5px 12px;font-size:11px;font-weight:600;cursor:pointer;display:inline-flex;align-items:center;gap:5px;pointer-events:auto;">
             Colar do Clipboard
          </button>
          <button id="eq-bulk-clear-btn" type="button" style="background:#1e293b;color:#94a3b8;border:1px solid #334155;border-radius:6px;padding:5px 10px;font-size:11px;cursor:pointer;pointer-events:auto;">
            Limpar
          </button>
        </div>
        <textarea id="eq-bulk-ta"
          style="width:100%;height:150px;background:#0b0f17;color:#f8fafc;border:1px solid #334155;border-radius:8px;padding:10px;font-family:'JetBrains Mono',Consolas,monospace;font-size:11px;box-sizing:border-box;resize:vertical;outline:none;line-height:1.5;pointer-events:auto;user-select:text;-webkit-user-select:text;"
          placeholder="AIzaSyA123...&#10;AIzaSyB456...&#10;AIzaSyC789..."></textarea>
        <div id="eq-bulk-status" style="min-height:18px;font-size:11px;color:#94a3b8;line-height:1.4;"></div>
        <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:2px;">
          <button id="eq-bulk-cancel" type="button" style="background:#1e293b;color:#cbd5e1;border:1px solid #334155;border-radius:6px;padding:7px 16px;cursor:pointer;font-size:12px;font-weight:600;pointer-events:auto;">Cancelar</button>
          <button id="eq-bulk-import" type="button" style="background:#00e5ff;color:#031326;border:none;border-radius:6px;padding:7px 18px;cursor:pointer;font-size:12px;font-weight:700;box-shadow:0 0 12px rgba(0,229,255,0.25);pointer-events:auto;"> Importar e Validar</button>
        </div>
      `

      overlay.appendChild(card)
      this.shadow.appendChild(overlay)

      const ta = card.querySelector('#eq-bulk-ta') as HTMLTextAreaElement
      const statusEl = card.querySelector('#eq-bulk-status') as HTMLElement
      const importBtn = card.querySelector('#eq-bulk-import') as HTMLButtonElement
      const pasteBtn = card.querySelector('#eq-bulk-paste-btn') as HTMLButtonElement
      const clearBtn = card.querySelector('#eq-bulk-clear-btn') as HTMLButtonElement

      requestAnimationFrame(() => ta?.focus())

      const close = () => {
        overlay.remove()
      }

      // Event shielding em fase CAPTURE: bloqueia sites que usam capture:true antes do nosso modal
      ;['keydown', 'keyup', 'keypress', 'paste', 'copy', 'cut'].forEach((evt) => {
        overlay.addEventListener(evt, (e) => {
          e.stopPropagation()
          e.stopImmediatePropagation()
        }, true) // capture:true — garante que interceptamos antes de qualquer listener do site
      })

      // Fechar com Escape
      overlay.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.key === 'Escape') close()
      })

      // Fechar ao clicar no backdrop (fora do card)
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) close()
      })

      card.querySelector('#eq-bulk-x')?.addEventListener('click', close)
      card.querySelector('#eq-bulk-cancel')?.addEventListener('click', close)

      clearBtn.addEventListener('click', () => {
        ta.value = ''
        statusEl.textContent = ''
        ta.focus()
      })

      pasteBtn.addEventListener('click', async () => {
        try {
          const text = await navigator.clipboard?.readText()
          if (text) {
            ta.value = text
            ta.focus()
            statusEl.style.color = '#38bdf8'
            statusEl.textContent = 'Conteúdo colado da área de transferência com sucesso!'
          } else {
            statusEl.style.color = '#fbbf24'
            statusEl.textContent = 'Área de transferência vazia ou sem permissão de leitura.'
          }
        } catch {
          statusEl.style.color = '#fbbf24'
          statusEl.textContent = 'Permissão de clipboard negada pelo navegador. Use Ctrl+V diretamente na caixa.'
          ta.focus()
        }
      })

      card.querySelector('#eq-bulk-import')?.addEventListener('click', async () => {
        const raw = ta.value.trim()
        if (!raw) {
          statusEl.style.color = '#f87171'
          statusEl.textContent = 'Insira pelo menos uma chave de API antes de importar.'
          return
        }

        // Extração inteligente de chaves (AIza... ou fallback por quebra de linha/vírgula)
        const regexMatches = raw.match(/AIza[0-9A-Za-z\-_]{35}/g)
        let keysToImport: string[] = []
        if (regexMatches && regexMatches.length > 0) {
          keysToImport = Array.from(new Set(regexMatches))
        } else {
          keysToImport = Array.from(new Set(
            raw.split(/[\n,;\s]+/)
              .map(s => s.trim().replace(/^["'`]|["'`]$/g, ''))
              .filter(s => s.length >= 20)
          ))
        }

        if (keysToImport.length === 0) {
          statusEl.style.color = '#f87171'
          statusEl.textContent = 'Nenhuma chave válida encontrada (mínimo 20 caracteres).'
          return
        }

        statusEl.style.color = '#00e5ff'
        statusEl.textContent = `Processando ${keysToImport.length} chave(s)...`
        importBtn.disabled = true
        importBtn.style.opacity = '0.6'

        let added = 0, duplicates = 0
        for (const k of keysToImport) {
          const res = keyManager.addKey(k)
          if (res.ok) added++
          else if (res.message.includes('já está cadastrada')) duplicates++
        }

        if (added > 0) {
          const rawKeys = keyManager.exportRawKeys()
          this.callbacks.onSettingsChange({ apiKey: rawKeys[0], apiKeys: rawKeys })
          applyCollapseState(false) // Auto-expande para o usuário ver
          try { localStorage.setItem('easyquiz_keys_collapsed', 'false') } catch {}
        }

        statusEl.textContent = `${added} adicionada(s), ${duplicates} duplicada(s). Validando modelo em paralelo...`
        const allKeys = keyManager.exportRawKeys()
        const currentModel = (this.modelSelect as HTMLSelectElement)?.value || 'gemini-3.5-flash-lite'
        const result = await validateModelFast(currentModel, allKeys)

        if (result.ok) {
          keyManager.markSuccess(result.key, 200)
          statusEl.style.color = '#4ade80'
          statusEl.textContent = ` ${added} adicionada(s), ${duplicates} duplicada(s). Modelo '${result.model}' pronto!`
        } else {
          statusEl.style.color = '#fbbf24'
          statusEl.textContent = `${added} adicionada(s), ${duplicates} duplicada(s). Aviso: ${result.message}`
        }

        this.renderKeysList()
        importBtn.disabled = false
        importBtn.style.opacity = '1'

        if (added > 0) {
          this.setStatus(` Lote importado: ${added} chave(s) adicionada(s) ao pool!`, 'success')
          setTimeout(close, 2200)
        }
      })
    })


    // 6. Ver / Editar Chaves como Texto
    this.shadow.querySelector('#eq-menu-edit-text')?.addEventListener('click', () => {
      this.keyContextMenu.hidden = true

      // Remove overlay anterior se existir
      this.shadow.querySelector('#eq-text-editor-overlay')?.remove()

      const currentKeys = keyManager.exportRawKeys()
      const overlay = document.createElement('div')
      overlay.id = 'eq-text-editor-overlay'
      overlay.style.cssText = [
        'position:fixed', 'inset:0', 'z-index:2147483647', 'pointer-events:auto',
        'background:rgba(0,0,0,0.82)', 'backdrop-filter:blur(4px)', '-webkit-backdrop-filter:blur(4px)',
        'display:flex', 'align-items:center', 'justify-content:center',
        'font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif',
      ].join(';')

      const card = document.createElement('div')
      card.style.cssText = [
        'background:#11151c', 'color:#e2e8f0', 'border:1px solid #283548',
        'border-radius:12px', 'padding:20px', 'width:460px', 'max-width:94vw',
        'font-size:13px', 'box-shadow:0 12px 40px rgba(0,0,0,0.85),0 0 0 1px rgba(0,229,255,0.15)',
        'display:flex', 'flex-direction:column', 'gap:10px', 'pointer-events:auto',
      ].join(';')

      card.innerHTML = `
        <div style="display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #1f2937;padding-bottom:10px;">
          <div style="display:flex;align-items:center;gap:8px;">
            <span style="font-size:16px;">️</span>
            <h3 style="margin:0;font-size:14px;color:#00e5ff;font-weight:700;">Ver / Editar Chaves como Texto</h3>
          </div>
          <button id="eq-edittext-x" style="background:none;border:none;color:#94a3b8;font-size:20px;cursor:pointer;padding:0 4px;line-height:1;border-radius:4px;" title="Fechar (Esc)"></button>
        </div>
        <p style="margin:0;font-size:11px;color:#94a3b8;line-height:1.5;">
          Cada linha = uma chave. Edite, apague linhas ou cole novas. Clique <b style="color:#e2e8f0;">Salvar</b> para substituir todas as chaves atuais pelas do texto.
        </p>
        <textarea id="eq-edittext-ta"
          style="width:100%;height:180px;background:#0b0f17;color:#4ade80;border:1px solid #334155;border-radius:8px;padding:10px;font-family:'JetBrains Mono',Consolas,monospace;font-size:11.5px;box-sizing:border-box;resize:vertical;outline:none;line-height:1.6;pointer-events:auto;user-select:text;-webkit-user-select:text;letter-spacing:0.02em;"
          placeholder="Cole ou edite suas chaves aqui (uma por linha)"></textarea>
        <div id="eq-edittext-status" style="min-height:16px;font-size:11px;color:#94a3b8;"></div>
        <div style="display:flex;gap:8px;justify-content:space-between;margin-top:2px;align-items:center;">
          <button id="eq-edittext-clear" type="button" style="background:#1e293b;color:#f87171;border:1px solid #7f1d1d;border-radius:6px;padding:6px 14px;cursor:pointer;font-size:11px;font-weight:600;"> Apagar Tudo</button>
          <div style="display:flex;gap:8px;">
            <button id="eq-edittext-cancel" type="button" style="background:#1e293b;color:#cbd5e1;border:1px solid #334155;border-radius:6px;padding:7px 16px;cursor:pointer;font-size:12px;font-weight:600;">Cancelar</button>
            <button id="eq-edittext-save" type="button" style="background:#00e5ff;color:#031326;border:none;border-radius:6px;padding:7px 18px;cursor:pointer;font-size:12px;font-weight:700;box-shadow:0 0 12px rgba(0,229,255,0.25);"> Salvar</button>
          </div>
        </div>
      `

      overlay.appendChild(card)
      this.shadow.appendChild(overlay)

      const ta = card.querySelector('#eq-edittext-ta') as HTMLTextAreaElement
      const statusEl = card.querySelector('#eq-edittext-status') as HTMLElement

      // Popular textarea com as chaves atuais
      ta.value = currentKeys.join('\n')

      requestAnimationFrame(() => { ta.focus(); ta.select() })

      const close = () => overlay.remove()

      // Event shielding
      ;['keydown', 'keyup', 'keypress', 'paste', 'copy', 'cut'].forEach((evt) => {
        overlay.addEventListener(evt, (e) => { e.stopPropagation(); e.stopImmediatePropagation() }, true)
      })
      overlay.addEventListener('keydown', (e: KeyboardEvent) => { if (e.key === 'Escape') close() })
      overlay.addEventListener('click', (e) => { if (e.target === overlay) close() })

      card.querySelector('#eq-edittext-x')?.addEventListener('click', close)
      card.querySelector('#eq-edittext-cancel')?.addEventListener('click', close)

      card.querySelector('#eq-edittext-clear')?.addEventListener('click', () => {
        if (confirm('Apagar todas as chaves? Esta ação é irreversível.')) {
          ta.value = ''
          statusEl.style.color = '#fbbf24'
          statusEl.textContent = 'Campo limpo. Clique em Salvar para confirmar a remoção de todas as chaves.'
        }
      })

      card.querySelector('#eq-edittext-save')?.addEventListener('click', () => {
        const lines = ta.value
          .split(/[\n\r]+/)
          .map(l => l.trim().replace(/^["']|["']$/g, ''))
          .filter(l => l.length > 5)

        // Remove duplicatas
        const unique = Array.from(new Set(lines))

        // Reinicia o keyManager com as novas chaves
        keyManager.init(unique)
        const rawKeys = keyManager.exportRawKeys()
        this.callbacks.onSettingsChange({ apiKey: rawKeys[0] || '', apiKeys: rawKeys })
        this.renderKeysList()

        statusEl.style.color = '#4ade80'
        if (unique.length === 0) {
          statusEl.textContent = ' Todas as chaves removidas.'
        } else {
          statusEl.textContent = ` ${unique.length} chave(s) salva(s) com sucesso!`
        }
        this.setStatus(unique.length > 0 ? ` ${unique.length} chave(s) salva(s)!` : 'Todas as chaves foram removidas.', unique.length > 0 ? 'success' : 'info')
        setTimeout(close, 1400)
      })
    })

    // 7. Apagar Todas as Chaves
    this.shadow.querySelector('#eq-menu-delete-all')?.addEventListener('click', () => {
      this.keyContextMenu.hidden = true
      const keys = keyManager.getAllKeys()
      if (keys.length === 0) return this.setStatus('Nenhuma chave para apagar.', 'info')
      if (confirm(`Apagar todas as ${keys.length} chave(s) permanentemente?`)) {
        keyManager.init([])
        this.callbacks.onSettingsChange({ apiKey: '', apiKeys: [] })
        this.renderKeysList()
        this.setStatus('Todas as chaves foram removidas.', 'info')
      }
    })

    // 8. Testar Todas as Chaves — paralelo com validateModelFast

    this.shadow.querySelector('#eq-menu-test')?.addEventListener('click', async () => {
      this.keyContextMenu.hidden = true
      const keys = keyManager.getAllKeys()
      if (keys.length === 0) return this.setStatus('Nenhuma chave cadastrada para testar.', 'error')

      this.setStatus(` Testando ${keys.length} chave(s) em paralelo...`, 'info')
      const currentModel = (this.modelSelect as HTMLSelectElement)?.value || 'gemini-3.5-flash-lite'
      const allRaw = keys.map(k => k.key)

      // Valida modelo com todas as chaves em paralelo (até 6 simultâneas)
      const result = await validateModelFast(currentModel, allRaw)
      if (result.ok) {
        keyManager.markSuccess(result.key, 150)
        this.setStatus(` Validado! Modelo '${result.model}' respondeu com sucesso!`, 'success')
      } else {
        // Valida individualmente para marcar quais falharam
        const results = await Promise.allSettled(allRaw.map(k => testApiKey(k)))
        let okCount = 0
        results.forEach((r, i) => {
          if (r.status === 'fulfilled' && r.value.ok) {
            okCount++; keyManager.markSuccess(allRaw[i], 200)
          } else {
            const msg = r.status === 'fulfilled' ? r.value.message : String((r as any).reason)
            keyManager.markInvalid(allRaw[i], msg)
          }
        })
        this.setStatus(`Teste: ${okCount}/${keys.length} chave(s) válidas. ${result.message}`, okCount > 0 ? 'info' : 'error')
      }
      this.renderKeysList()
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
    this.apToggleBtn?.addEventListener('click', () => {
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
        resetSessionBlacklist()  // limpar blacklist de 429 da sessão anterior
        this.autopilot.start()
        this.updateAutopilotUi(true)
        this.startStopwatch()
        this.setStatus('Autopilot ativo. Monitorando exercícios...', 'info')
      }
    })

    // Limpar Memória da Sessão
    const clearMemoryBtn = this.shadow.querySelector('#eq-ap-clear-memory') as HTMLButtonElement | null
    clearMemoryBtn?.addEventListener('click', () => {
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
    this.copyPromptBtn?.addEventListener('click', () => {
      const text = this.inspPrompt.textContent || ''
      navigator.clipboard.writeText(text).then(() => {
        if (!this.copyPromptBtn) return
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

    this.analyzeBtn?.addEventListener('click', async () => {
      // If button is visually in 'stop' state, stop unconditionally regardless of internal flags
      if (this.analyzeBtn.classList.contains('danger')) {
        this.autopilot.stop()
        this.callbacks.onCancel?.()
        this.setProgress(0)
        this.updateAutopilotUi(false)
        this.setBusy(false)
        this.setInterrupted('Resolver Autopilot interrompido pelo usuário.')
        return
      }

      const key = this.apiKeyInput.value.trim().replace(/^['"]|['"]$/g, '')
      if (!key) {
        this.setStatus('Configure sua chave de API Gemini antes de ativar o Resolver Autopilot.', 'error')
        this.switchTab('settings')
        this.apiKeyInput.focus()
        return
      }

      this.callbacks.onSettingsChange({ autoApply: true, autoAdvance: true })
      this.autoApplyCheckbox.checked = true
      this.autoAdvanceCheckbox.checked = true
      resetSessionBlacklist()
      this.autopilot.start()
      this.updateAutopilotUi(true)
      this.startStopwatch()
      this.setStatus('Resolver Autopilot ativo. Monitorando e respondendo...', 'info')
    })
    if (this.applyBtn) {
      this.applyBtn.addEventListener('click', () => this.callbacks.onApply())
    }
  }

  private startStopwatch() {
    this.stopStopwatch()
    this.stopwatchStartTime = Date.now()
    const update = () => {
      const elapsed = ((Date.now() - this.stopwatchStartTime) / 1000).toFixed(2) + 's'
      if (this.stopwatchAp) this.stopwatchAp.textContent = elapsed
      if (this.stopwatchAdv) this.stopwatchAdv.textContent = elapsed
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
      if (this.stopwatchAp) this.stopwatchAp.textContent = val
      if (this.stopwatchAdv) this.stopwatchAdv.textContent = val
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

    let entries = this.activeLogFilter === 'all'
      ? this.logEntries
      : this.logEntries.filter((e) => e.category === this.activeLogFilter)

    if (this.outputSearchQuery) {
      const q = this.outputSearchQuery.toLowerCase()
      entries = entries.filter(e => e.message.toLowerCase().includes(q))
    }

    if (entries.length === 0) {
      const empty = document.createElement('div')
      empty.style.cssText = 'color:#333;font-style:italic;'
      empty.textContent = this.outputSearchQuery
        ? `Nenhum resultado para "${this.outputSearchQuery}".`
        : `Nenhum log para o filtro "${this.activeLogFilter.toUpperCase()}".`
      this.liveDebugTerminal.appendChild(empty)
      return
    }

    for (const item of entries) {
      const line = document.createElement('div')
      line.style.cssText = 'padding:1px 0;'
      line.textContent = item.message
      if (item.colorClass) line.className = item.colorClass
      this.liveDebugTerminal.appendChild(line)
    }

    if (this.autoScrollLogs) {
      this.liveDebugTerminal.scrollTop = this.liveDebugTerminal.scrollHeight
    }
  }


  // ── Terminal REPL ──────────────────────────────────────────────────────────
  public appendTerminalLine(text: string, colorClass?: string): void {
    if (!this.liveTerminalOutput) return
    const line = document.createElement('div')
    line.style.cssText = 'padding:1px 0;'
    line.textContent = text
    const c = colorClass === 'text-red' ? '#ff4444'
             : colorClass === 'text-blue' ? '#aaaaaa'
             : colorClass === 'text-green' ? '#cccccc'
             : colorClass === 'text-yellow' ? '#999999'
             : '#e0e0e0'
    line.style.color = c
    this.liveTerminalOutput.appendChild(line)
    while (this.liveTerminalOutput.children.length > 500) {
      this.liveTerminalOutput.removeChild(this.liveTerminalOutput.firstChild!)
    }
    this.liveTerminalOutput.scrollTop = this.liveTerminalOutput.scrollHeight
  }

  private executeTerminalCommand(raw: string): void {
    const args = raw.trim().split(/\s+/)
    const cmd  = args[0].toLowerCase()
    const out  = (t: string, c = '#cccccc') => {
      const line = document.createElement('div')
      line.style.cssText = 'padding:0;white-space:pre;color:' + c + ';'
      line.textContent = t
      this.liveTerminalOutput?.appendChild(line)
    }
    const row = (cols: string[], widths: number[]) =>
      out('  ' + cols.map((c, i) => c.padEnd(widths[i] || 0)).join('  '), '#aaaaaa')
    const blank = () => out('', '#000')
    const sep   = (w = 50) => out('  ' + '─'.repeat(w), '#2a2a2a')

    switch (cmd) {
      case 'help':
        blank()
        out('  ┌─ COMANDOS ────────────────────────────────────────┐', '#444')
        out('  │                                                   │', '#444')
        out('  │  help        lista todos os comandos             │', '#666')
        out('  │  status      estado atual do sistema             │', '#666')
        out('  │  version     versão e build info                 │', '#666')
        out('  │  info-api    info da última req. à API           │', '#666')
        out('  │  tokens      tokens consumidos (detalhado)       │', '#666')
        out('  │  context     contexto da questão atual           │', '#666')
        out('  │  controls    controles detectados (tabela)       │', '#666')
        out('  │  errors      erros registrados                   │', '#666')
        out('  │  logs [n]    últimas N entradas do output        │', '#666')
        out('  │  history     histórico de questões               │', '#666')
        out('  │  reset       limpa logs e métricas               │', '#666')
        out('  │  clear       limpa o terminal                    │', '#666')
        out('  │  copy        copia terminal para clipboard       │', '#666')
        out('  │                                                   │', '#444')
        out('  └───────────────────────────────────────────────────┘', '#444')
        blank()
        break

      case 'clear':
        if (this.liveTerminalOutput) this.liveTerminalOutput.replaceChildren()
        return

      case 'info-api': {
        const plan = this.latestPlan
        blank()
        out('  ┌─ API INFO ─────────────────────────────────────────┐', '#444')
        const f = (label: string, val: string) =>
          out('  │  ' + label.padEnd(14) + (val || '--').toString().slice(0,36).padEnd(36) + '│', '#888')
        f('Modelo',        plan?.usedModel || (this.initialSettings as any)?.model || '--')
        f('Latência',      plan?.durationMs ? plan.durationMs + 'ms' : '--')
        f('P.Tokens',      String(plan?.promptTokens ?? '--'))
        f('R.Tokens',      String(plan?.candidatesTokens ?? '--'))
        f('Total',         String(plan?.tokensUsed ?? '--'))
        f('Prompt',        this.latestPromptText?.length ? this.latestPromptText.length + ' chars' : '--')
        out('  └─────────────────────────────────────────────────────┘', '#444')
        blank()
        break
      }

      case 'version':
        blank()
        out('  EasyQuiz ' + (typeof BUILD_VERSION !== 'undefined' ? BUILD_VERSION : '?'), '#ffffff')
        out('  Motor: Híbrido 4.0  (RAG + AST + Vision + Multimodal)', '#888888')
        out('  Build: ' + new Date().toLocaleDateString('pt-BR'), '#555555')
        blank()
        break

      case 'status': {
        const plan = this.latestPlan; const ctx = this.latestContext
        blank(); sep()
        out('  STATUS DO SISTEMA', '#ffffff'); sep()
        out('  Modelo     ' + (plan?.usedModel || (this.initialSettings as any)?.model || '--'), '#aaaaaa')
        out('  Modo       ' + (plan?.mode || 'aguardando'), '#aaaaaa')
        out('  Latência   ' + (plan?.durationMs ? plan.durationMs + 'ms' : '--'), '#aaaaaa')
        out('  Tokens     ' + (plan?.tokensUsed ?? '--'), '#aaaaaa')
        out('  Confiança  ' + (plan ? Math.round(plan.confidence * 100) + '%' : '--'), '#aaaaaa')
        out('  Contexto   ' + (ctx ? '"' + ctx.questionText.slice(0, 45) + (ctx.questionText.length > 45 ? '...' : '') + '"' : 'não capturado'), '#888888')
        out('  Controles  ' + (ctx ? ctx.controls.length : '--'), '#aaaaaa')
        sep(); blank()
        break
      }

      case 'tokens': {
        const plan = this.latestPlan; blank()
        if (!plan) { out('  Nenhuma requisição ainda.', '#555555'); blank(); break }
        sep(); out('  TOKENS DA ÚLTIMA REQUISIÇÃO', '#ffffff'); sep()
        out('  Prompt tokens    ' + String(plan.promptTokens ?? '--').padStart(8), '#888888')
        out('  Response tokens  ' + String(plan.candidatesTokens ?? '--').padStart(8), '#888888')
        out('  ' + '─'.repeat(28), '#2a2a2a')
        out('  Total            ' + String(plan.tokensUsed ?? '--').padStart(8), '#cccccc')
        out('  Latência         ' + String(plan.durationMs ? plan.durationMs + 'ms' : '--').padStart(8), '#cccccc')
        sep(); blank(); break
      }

      case 'context': {
        const ctx = this.latestContext; blank()
        if (!ctx) { out('  Contexto não disponível.', '#555555'); blank(); break }
        sep(); out('  CONTEXTO ATUAL', '#ffffff'); sep()
        out('  Escopo    ' + ctx.scope.tagName.toLowerCase() + (ctx.scope.id ? '#' + ctx.scope.id : ''), '#aaaaaa')
        out('  Controles ' + ctx.controls.length, '#aaaaaa')
        out('  Texto     ' + ctx.questionText.slice(0, 55) + (ctx.questionText.length > 55 ? '...' : ''), '#888888')
        sep(); blank(); break
      }

      case 'controls': {
        const ctx = this.latestContext; blank()
        if (!ctx?.controls.length) { out('  Nenhum controle detectado.', '#555555'); blank(); break }
        sep(); out('  CONTROLES  (' + ctx.controls.length + ')', '#ffffff')
        out('  ' + '─'.repeat(55), '#2a2a2a')
        row(['#', 'Tipo', 'Label / ID', 'Valor'], [3, 10, 26, 10])
        out('  ' + '─'.repeat(55), '#2a2a2a')
        ctx.controls.forEach((c: any, i: number) =>
          row([String(i+1), ((c.type||c.tag||'?').toUpperCase()).slice(0,9), (c.label||c.id||c.name||'—').slice(0,25), (c.value||'—').slice(0,9)], [3,10,26,10]))
        sep(); blank(); break
      }

      case 'errors': {
        const errs = this.logEntries.filter(e => e.category === 'error'); blank()
        if (!errs.length) { out('  ✓ Nenhum erro nesta sessão.', '#888888'); blank(); break }
        sep(); out('  ERROS  (' + errs.length + ')', '#ffffff'); sep()
        errs.slice(-15).forEach(e => out('  ' + e.message, '#999999'))
        sep(); blank(); break
      }

      case 'logs': {
        const n = Math.min(parseInt(args[1] || '10', 10) || 10, 50)
        const last = this.logEntries.slice(-n); blank()
        if (!last.length) { out('  Nenhum log.', '#555555'); blank(); break }
        sep(); out('  ÚLTIMAS ' + n + ' ENTRADAS', '#ffffff'); sep()
        last.forEach(e => out('  ' + e.message, '#888888'))
        sep(); blank(); break
      }

      case 'history': {
        const hist = (this as any).metricsHistory as any[]; blank()
        if (!hist?.length) { out('  Nenhuma questão respondida.', '#555555'); blank(); break }
        sep(); out('  HISTÓRICO  (' + hist.length + ' questões)', '#ffffff')
        out('  ' + '─'.repeat(58), '#2a2a2a')
        row(['#', 'Questão', 'Tempo', 'Modelo'], [3, 37, 7, 10])
        out('  ' + '─'.repeat(58), '#2a2a2a')
        hist.slice(-15).forEach((r: any, i: number) =>
          row([String(i+1), (r.questionTitle||'Questão').slice(0,36), (r.durationMs ? (r.durationMs/1000).toFixed(1)+'s' : '--'), (r.model||'--').slice(0,9)], [3,37,7,10]))
        sep(); blank(); break
      }

      case 'reset':
        this.clearLogs(); blank()
        out('  ✓ Logs e métricas resetados.', '#888888'); blank(); break

      case 'copy': {
        const lines2 = Array.from(this.liveTerminalOutput?.children || []).map(el => (el as HTMLElement).textContent || '')
        navigator.clipboard.writeText(lines2.join('\n')).then(() => { out('  ✓ Copiado.', '#888888'); this.showToast('Terminal copiado', 'success', 2000) })
        break
      }

      case '': break

      default:
        blank()
        out('  Comando não reconhecido: "' + cmd + '"', '#666666')
        out('  Digite help para ver os comandos.', '#444444')
        blank()
    }

    if (this.liveTerminalOutput) this.liveTerminalOutput.scrollTop = this.liveTerminalOutput.scrollHeight
  }

  public initTerminalREPL(): void {
    this.liveTerminalOutput = this.shadow.querySelector('#eq-term-output') as HTMLElement | null
    this.terminalInputEl    = this.shadow.querySelector('#eq-term-input') as HTMLInputElement | null
    if (this._terminalInited) {
      this._reconnectContextbarBtns()
      return
    }
    this._terminalInited = true

    const termPanel   = this.shadow.querySelector('#eq-term-panel-terminal') as HTMLElement | null
    const outputPanel = this.shadow.querySelector('#eq-term-panel-output')   as HTMLElement | null
    const outputBar   = this.shadow.querySelector('#eq-output-toolbar')      as HTMLElement | null
    const inputLine   = this.shadow.querySelector('#eq-term-input-line')     as HTMLElement | null
    const searchEl    = this.shadow.querySelector('#eq-output-search')       as HTMLInputElement | null
    const searchClear = this.shadow.querySelector('#eq-output-search-clear') as HTMLElement | null
    const filterBtn   = this.shadow.querySelector('#eq-output-filter-btn')   as HTMLElement | null
    const filterMenu  = this.shadow.querySelector('#eq-output-filter-menu')  as HTMLElement | null
    const applyBtn    = this.shadow.querySelector('#eq-fchk-apply')          as HTMLElement | null

    const switchMode = (mode: 'terminal' | 'output') => {
      this.terminalMode = mode
      const isT = mode === 'terminal'
      if (termPanel)   termPanel.style.display   = isT ? 'flex' : 'none'
      if (outputPanel) outputPanel.style.display  = isT ? 'none' : 'flex'
      if (outputBar)   outputBar.style.display    = isT ? 'none' : 'flex'
      const tb = this.shadow.querySelector('#eq-term-mode-terminal') as HTMLElement | null
      const ob = this.shadow.querySelector('#eq-term-mode-output')   as HTMLElement | null
      if (tb) { tb.style.background = isT ? '#1a1a1a' : 'transparent'; tb.style.borderColor = isT ? '#333' : 'transparent'; tb.style.color = isT ? '#ddd' : '#555' }
      if (ob) { ob.style.background = !isT ? '#1a1a1a' : 'transparent'; ob.style.borderColor = !isT ? '#333' : 'transparent'; ob.style.color = !isT ? '#ddd' : '#555' }
      if (!isT) this.renderTerminalEntries()
    }

    this._reconnectContextbarBtns = () => {
      const modeT = this.shadow.querySelector('#eq-term-mode-terminal') as HTMLElement | null
      const modeO = this.shadow.querySelector('#eq-term-mode-output')   as HTMLElement | null
      const cpB   = this.shadow.querySelector('#eq-term-copy-btn')      as HTMLElement | null
      const clB   = this.shadow.querySelector('#eq-term-clear-btn')     as HTMLElement | null
      modeT?.addEventListener('click', () => switchMode('terminal'))
      modeO?.addEventListener('click', () => switchMode('output'))
      cpB?.addEventListener('click', () => {
        if (this.terminalMode === 'terminal') {
          const tlines = Array.from(this.liveTerminalOutput?.children || []).map(el => (el as HTMLElement).textContent || '')
          navigator.clipboard.writeText(tlines.join('\n')).then(() => this.showToast('Terminal copiado', 'success', 2000))
        } else {
          navigator.clipboard.writeText(this.getFormattedLogs()).then(() => this.showToast('Output copiado', 'success', 2000))
        }
      })
      clB?.addEventListener('click', () => {
        if (this.terminalMode === 'terminal') {
          if (this.liveTerminalOutput) this.liveTerminalOutput.replaceChildren()
          this.appendTerminalLine('> [SYS] Terminal limpo.', 'text-blue')
        } else {
          this.clearLogs()
        }
      })
    }
    this._reconnectContextbarBtns()

    // Filter context menu
    filterBtn?.addEventListener('click', (e) => { e.stopPropagation(); if (filterMenu) filterMenu.hidden = !filterMenu.hidden })
    applyBtn?.addEventListener('click', () => {
      const allChk   = (this.shadow.querySelector('#eq-fchk-all')   as HTMLInputElement)?.checked
      const errChk   = (this.shadow.querySelector('#eq-fchk-error') as HTMLInputElement)?.checked
      const aiChk    = (this.shadow.querySelector('#eq-fchk-ai')    as HTMLInputElement)?.checked
      const domChk   = (this.shadow.querySelector('#eq-fchk-dom')   as HTMLInputElement)?.checked
      if (allChk || (!errChk && !aiChk && !domChk)) this.activeLogFilter = 'all'
      else if (errChk && !aiChk && !domChk) this.activeLogFilter = 'error'
      else if (aiChk && !errChk && !domChk) this.activeLogFilter = 'ai'
      else if (domChk && !errChk && !aiChk) this.activeLogFilter = 'dom'
      else this.activeLogFilter = 'all'
      const lbl = this.shadow.querySelector('#eq-output-filter-label') as HTMLElement | null
      if (lbl) lbl.textContent = 'Filtro: ' + this.activeLogFilter.toUpperCase()
      if (filterMenu) filterMenu.hidden = true
      this.renderTerminalEntries()
    })
    document.addEventListener('click', () => { if (filterMenu) filterMenu.hidden = true })

    // Search
    searchEl?.addEventListener('input', () => {
      this.outputSearchQuery = searchEl.value
      if (searchClear) searchClear.style.display = searchEl.value ? 'inline' : 'none'
      this.renderTerminalEntries()
    })
    searchClear?.addEventListener('click', () => {
      if (searchEl) searchEl.value = ''
      this.outputSearchQuery = ''
      if (searchClear) searchClear.style.display = 'none'
      this.renderTerminalEntries()
    })

    // Auto-scroll
    this.shadow.querySelector('#eq-dbg-scroll-toggle')?.addEventListener('click', (e) => {
      this.autoScrollLogs = !this.autoScrollLogs
      ;(e.currentTarget as HTMLElement).style.color = this.autoScrollLogs ? '#cccccc' : '#333'
    })

    // Input
    inputLine?.addEventListener('click', () => this.terminalInputEl?.focus())
    this.terminalInputEl?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const val = this.terminalInputEl!.value.trim()
        this.terminalInputEl!.value = ''
        this.terminalCmdHistoryIdx = -1
        if (val) {
          this.terminalCmdHistory.unshift(val)
          if (this.terminalCmdHistory.length > 50) this.terminalCmdHistory.pop()
          const echo = document.createElement('div')
          echo.style.cssText = 'padding:1px 0;color:#fff;font-weight:600;'
          echo.textContent = 'EasyQuiz_Legacy: ' + val
          this.liveTerminalOutput?.appendChild(echo)
          this.executeTerminalCommand(val)
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        this.terminalCmdHistoryIdx = Math.min(this.terminalCmdHistoryIdx + 1, this.terminalCmdHistory.length - 1)
        if (this.terminalCmdHistoryIdx >= 0) this.terminalInputEl!.value = this.terminalCmdHistory[this.terminalCmdHistoryIdx]
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        this.terminalCmdHistoryIdx = Math.max(this.terminalCmdHistoryIdx - 1, -1)
        this.terminalInputEl!.value = this.terminalCmdHistoryIdx >= 0 ? this.terminalCmdHistory[this.terminalCmdHistoryIdx] : ''
      }
    })

    switchMode('terminal')
    setTimeout(() => this.terminalInputEl?.focus(), 80)
  }

  public clearLogs(): void {
    this.logEntries = []
    this.updateLogCounters()
    if (this.liveDebugTerminal) {
      this.liveDebugTerminal.replaceChildren()
      const init = document.createElement('div')
      init.className = 'text-blue'
      init.textContent = '> [SYS] Output limpo.'
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
      this.dbgPromptLen.textContent = `${len}c (~${est}tok)`
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

    // Write to Output (log list)
    if (this.liveDebugTerminal && (this.activeLogFilter === 'all' || this.activeLogFilter === category)) {
      const line = document.createElement('div')
      line.style.cssText = 'padding:1px 0;'
      line.textContent = formatted
      if (colorClass) line.className = colorClass
      this.liveDebugTerminal.appendChild(line)
    }
    // Also write to Terminal REPL (dom/all/error categories)
    if (this.liveTerminalOutput && (category === 'dom' || category === 'all' || category === 'error')) {
      this.appendTerminalLine(formatted, colorClass)

      while (this.liveDebugTerminal.children.length > 300) {
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
    if (plan) {
      this.latestPlan = plan
      // Atualiza descrições de imagem do plano
      if (plan.imageDescriptions) {
        this.latestImageDescriptions = plan.imageDescriptions
        // Sincroniza a aba de Mídias com as interpretações da IA
      }
    }
    if (this.activeTab === 'brain') {
      this.renderContextTree()
      this.refreshBrainCanvas()
      if (plan) this.refreshInspectorView()
    } else if (this.activeTab === 'debug') {
      this.refreshDebugView()
    }
  }

  /** Atualiza a lista de imagens capturadas para exibição na aba Contexto */
  public updateImages(images: CapturedImage[]): void {
    this.latestImages = images
    if (this.activeTab === 'brain') {
      this.renderContextTree()
      this.refreshBrainCanvas()
    }
    // Images updated — refresh brain canvas if viewing media
    if (this.activeTab === 'brain' && (this.brainSelectedFolder === 'media-images' || (this.brainActiveTab || '').startsWith('img-'))) {
      this.refreshBrainCanvas()
    }
  }

  public renderContextTree(): void {
    if (!this.contextTreeContainer) return
    const ctx = this.latestContext
    const memories = getSessionMemories()
    const plan = this.latestPlan
    // IA Artifacts folder — always rendered, updated by refreshDebugView
    const hasPrompt = !!(this.latestPromptText || plan?.promptSent)
    const hasCtx = !!ctx
    const hasResp = !!plan

    this.contextTreeContainer.innerHTML = ''

    // Pasta 1: Escopo e Metadados da Página
    const pageNode = this.createTreeFolder(' PÁGINA & ESCOPO ATUAL', true, [
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

    const controlsNode = this.createTreeFolder(`️ CONTROLES DETECTADOS (${controls.length})`, controls.length > 0, controlsChildren)
    this.contextTreeContainer.appendChild(controlsNode)

    // Pasta 3: Memória RAG de Sessão
    const memoriesChildren = memories.map((m, idx) => ({
      label: `Memória #${idx + 1}`,
      value: m,
      badge: 'RAG',
    }))
    const memoriesNode = this.createTreeFolder(` MEMÓRIA RAG ACUMULADA (${memories.length})`, memories.length > 0, memoriesChildren)
    this.contextTreeContainer.appendChild(memoriesNode)

    // Pasta 4: Último Plano da IA
    if (plan) {
      const planNode = this.createTreeFolder(` ÚLTIMO PLANO IA (${plan.actions.length} ações)`, true, [
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

    // Pasta 5: IA Artifacts — Prompt, Context, Raw Response
    {
      const aiFolder = document.createElement('div')
      aiFolder.style.cssText = 'border-bottom:1px solid rgba(255,255,255,0.04);'
      const aiHeader = document.createElement('div')
      aiHeader.style.cssText = 'display:flex;align-items:center;gap:6px;padding:5px 10px;cursor:pointer;font-size:10px;font-weight:600;color:#fbbf24;letter-spacing:0.04em;user-select:none;'
      aiHeader.innerHTML = '<span style="display:inline-flex;width:12px;height:12px;color:#fbbf24;">' + ICONS.inspector + '</span> IA ARTIFACTS'
      const aiChildren = document.createElement('div')
      aiChildren.style.cssText = 'padding-left:16px;overflow:hidden;'

      const makeAiFile = (id: string, label: string, subtitle: string, ready: boolean) => {
        const row = document.createElement('div')
        row.style.cssText = 'display:flex;align-items:center;gap:6px;padding:4px 10px 4px 4px;cursor:pointer;border-radius:4px;transition:background 0.1s;' + (this.brainActiveTab === id ? 'background:rgba(251,191,36,0.1);' : '')
        row.innerHTML = '<span style="font-size:9px;color:' + (ready ? '#fbbf24' : '#444') + ';">' + ICONS.code + '</span><span style="font-size:10px;color:' + (ready ? '#ddd' : '#444') + ';flex:1;">' + label + '</span><span style="font-size:8px;color:#333;">' + subtitle + '</span>'
        row.addEventListener('click', () => {
          this.brainSelectedFolder = null
          this.brainActiveTab = id
          const text = this.getBrainFileText(id)
          const contentEl = this.shadow.querySelector('#eq-brain-content') as HTMLElement | null
          if (contentEl) {
            contentEl.innerHTML = ''
            const pre = document.createElement('pre')
            pre.className = 'eq-brain-code'
            pre.style.cssText = 'padding:12px;font-size:10.5px;line-height:1.55;white-space:pre-wrap;word-break:break-word;color:#d0d8e8;font-family:"Cascadia Code","Fira Code","Courier New",monospace;'
            pre.textContent = text
            contentEl.appendChild(pre)
          }
          this.renderBrainExplorer()
          this.renderBrainTabs()
        })
        return row
      }

      aiChildren.appendChild(makeAiFile('ai-prompt', 'prompt.txt', hasPrompt ? 'pronto' : 'aguardando', hasPrompt))
      aiChildren.appendChild(makeAiFile('ai-context', 'context.json', hasCtx ? 'pronto' : 'aguardando', hasCtx))
      aiChildren.appendChild(makeAiFile('ai-response', 'response.txt', hasResp ? 'pronto' : 'aguardando', !!plan))

      let aiOpen = false
      aiHeader.addEventListener('click', () => {
        aiOpen = !aiOpen
        aiChildren.style.display = aiOpen ? 'block' : 'none'
      })
      aiChildren.style.display = 'none'

      aiFolder.appendChild(aiHeader)
      aiFolder.appendChild(aiChildren)
      this.contextTreeContainer.appendChild(aiFolder)
    }

    // Pasta 6: Imagens Detectadas (Sempre exibida para dar feedback)
    const imgs = this.latestImages
    const descs = this.latestImageDescriptions
    const imgItems = imgs.map((img, idx) => {
      const desc = descs.find(d => d.index === idx)
      const statusIcon = img.captureStatus === 'captured' ? '' : img.captureStatus === 'text_only' ? '' : ''
      const statusLabel = img.captureStatus === 'captured' ? 'Visual' : img.captureStatus === 'text_only' ? 'Texto' : 'Falhou'
      const relevance = desc ? (desc.relevant ? ' Relevante' : '️ Ignorada') : '—'
      const aiSummary = desc ? desc.description : (img.textContext ? img.textContext : 'Aguardando análise IA...')
      return {
        label: `${statusIcon} Img ${idx + 1} [${statusLabel}]`,
        value: `${aiSummary}`,
        badge: relevance,
        imgSrc: img.base64 ? `data:${img.mediaType || 'image/jpeg'};base64,${img.base64}` : undefined,
      }
    })
    
    const imgNode = this.createTreeFolder(
      `️ IMAGENS DETECTADAS (${imgs.length})`,
      true, // Sempre começa expandida se tiver imagens
      imgItems,
    )
    this.contextTreeContainer.appendChild(imgNode)
  }

  private createTreeFolder(title: string, startExpanded: boolean, items: Array<{ label: string; value: string; badge?: string; imgSrc?: string }>): HTMLElement {
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
        
        let imgHtml = ''
        if (it.imgSrc && it.imgSrc.startsWith('data:image')) {
          imgHtml = `<div style="margin-top: 8px; margin-bottom: 4px;"><img src="${it.imgSrc}" style="max-width: 100%; max-height: 120px; border-radius: 4px; border: 1px solid #3c4043; background: #1e1f22;" alt="Captura"></div>`
        }

        leaf.innerHTML = `
          <div style="display: flex; align-items: flex-start; gap: 8px; width: 100%;">
            <strong style="color:#ffffff; min-width: 80px;">${it.label}:</strong>
            <div style="flex:1; display: flex; flex-direction: column;">
              <span style="word-break: break-word; color:#aaaaaa;">${it.value}</span>
              ${imgHtml}
            </div>
            ${it.badge ? `<span class="eq-tree-badge" style="white-space: nowrap;">${it.badge}</span>` : ''}
          </div>
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
      if (keyManager.getAllKeys().length === 0) {
        this.switchTab('settings')
        this.apiKeyInput.focus()
      }
    }
  }

  public updateAutopilotUi(active: boolean): void {
    const primary = this.analyzeBtn
    if (primary) {
      const ctaRow = primary.closest('.eq-cta-wrapper')
      const label = active ? 'Parar Autopilot' : 'Resolver Autopilot'
      const icon = active ? ICONS.stop : ICONS.sparkles
      if (ctaRow) {
        ctaRow.classList.toggle('is-running', active)
        ctaRow.classList.toggle('is-idle', !active)
      }
      primary.classList.toggle('is-running', active)
      primary.classList.toggle('is-idle', !active)
      primary.classList.toggle('danger', active)
      primary.innerHTML = `<span class="eq-btn-icon">${icon}</span><span class="eq-btn-label">${label}</span>`
      primary.title = active ? 'Interromper o Resolver Autopilot' : 'Ligar o Resolver Autopilot'
    }
    if (this.apToggleBtn) {
      this.apToggleBtn.innerHTML = `${active ? ICONS.stop : ICONS.sparkles} ${active ? 'Parar Autopilot' : 'Resolver Autopilot'}`
      this.apToggleBtn.classList.toggle('danger', active)
      this.apToggleBtn.title = active ? 'Interromper o Resolver Autopilot' : 'Ligar o Resolver Autopilot'
    }
  }

  public setOperationState(label: string, type: 'idle' | 'busy' | 'success' | 'error' | 'warning' | 'info'): void {
    const operationState = this.shadow.querySelector('#eq-operation-state') as HTMLElement | null
    const statusCard = this.shadow.querySelector('#eq-status-card') as HTMLElement | null
    if (operationState) {
      operationState.innerHTML = `${ICONS.info} <span>${label}</span>`
      operationState.className = `eq-operation-state is-${type}`
    }
    if (statusCard) {
      statusCard.classList.remove('is-busy', 'is-success', 'is-error', 'is-warning', 'is-info')
      statusCard.classList.add(`is-${type}`)
    }
    const primary = this.analyzeBtn
    if (primary) {
      const ctaRow = primary.closest('.eq-cta-wrapper')
      if (ctaRow) {
        ctaRow.classList.remove('status-busy', 'status-success', 'status-error', 'status-warning', 'status-info')
        ctaRow.classList.add(`status-${type}`)
      }
      primary.classList.remove('status-busy', 'status-success', 'status-error', 'status-warning', 'status-info')
      primary.classList.add(`status-${type}`)
    }
  }

  public setInterrupted(message = 'Análise interrompida pelo usuário.'): void {
    this.isBusy = false
    ;[this.modelSelect, this.modeSelect, this.engineSelect, this.dryRunCheckbox, this.autoApplyCheckbox, this.autoAdvanceCheckbox, this.useVisionCheckbox, this.toastStackingCheckbox].forEach(
      (e) => ((e as any).disabled = false),
    )

    const ctaRow = this.analyzeBtn.closest('.eq-cta-wrapper')
    if (ctaRow) ctaRow.classList.remove('is-running')
    this.analyzeBtn.disabled = false
    this.analyzeBtn.classList.remove('danger')
    this.analyzeBtn.innerHTML = `<span class="eq-btn-icon">${ICONS.sparkles}</span><span class="eq-btn-label">Resolver Autopilot</span>`
    this.analyzeBtn.title = 'Ligar o Resolver Autopilot'
    if (this.applyBtn) this.applyBtn.disabled = !this.latestPlan || !this.latestPlan.actions.length

    this.stopStopwatch()
    this.stopQuestionTimer()

    if (this.dotPulseAp) this.dotPulseAp.className = 'eq-dot-pulse stopped'
    if (this.dotPulseAdv) this.dotPulseAdv.className = 'eq-dot-pulse stopped'
    if (this.launcherDot) this.launcherDot.className = 'eq-launcher-dot stopped'

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
    ;[this.modelSelect, this.modeSelect, this.engineSelect, this.dryRunCheckbox, this.autoApplyCheckbox, this.autoAdvanceCheckbox, this.useVisionCheckbox, this.toastStackingCheckbox].forEach(
      (e) => ((e as any).disabled = busy),
    )

    const ctaRow = this.analyzeBtn?.closest('.eq-cta-wrapper')
    if (busy) {
      if (ctaRow) ctaRow.classList.add('is-running')
      if (this.analyzeBtn) {
        this.analyzeBtn.disabled = false
        this.analyzeBtn.classList.add('danger')
        this.analyzeBtn.innerHTML = `<span class="eq-btn-icon">${ICONS.stop}</span><span class="eq-btn-label">Parar Autopilot</span>`
        this.analyzeBtn.title = 'Interromper o Resolver Autopilot'
      }
      if (this.applyBtn) this.applyBtn.disabled = true
      this.startStopwatch()
      this.startQuestionTimer()
      if (this.dotPulseAp) this.dotPulseAp.className = 'eq-dot-pulse busy'
      if (this.dotPulseAdv) this.dotPulseAdv.className = 'eq-dot-pulse busy'
      if (this.launcherDot) this.launcherDot.className = 'eq-launcher-dot busy'
      this.setOperationState('Analisando...', 'busy')
      if (this.metricsLiveStatus) {
        this.metricsLiveStatus.textContent = 'Calculando...'
        this.metricsLiveStatus.className = 'eq-live-stopwatch-status is-busy'
      }
      if (message) this.setStatus(message, 'info')
    } else {
      if (this.analyzeBtn) {
        this.analyzeBtn.disabled = false
        this.analyzeBtn.classList.remove('danger')
        this.analyzeBtn.innerHTML = `<span class="eq-btn-icon">${ICONS.sparkles}</span><span class="eq-btn-label">Resolver Autopilot</span>`
        this.analyzeBtn.title = 'Ligar o Resolver Autopilot'
      }
      if (this.applyBtn) this.applyBtn.disabled = !this.latestPlan || !this.latestPlan.actions.length
      this.stopStopwatch()
      this.stopQuestionTimer()
      if (this.dotPulseAp) this.dotPulseAp.className = 'eq-dot-pulse'
      if (this.dotPulseAdv) this.dotPulseAdv.className = 'eq-dot-pulse'
      if (this.launcherDot) this.launcherDot.className = 'eq-launcher-dot'
      this.setOperationState(this.autopilot.isActive() ? 'Monitorando' : 'Pronto', 'idle')
      if (this.metricsLiveStatus && this.metricsLiveStatus.textContent === 'Calculando...') {
        this.metricsLiveStatus.textContent = 'Em espera'
        this.metricsLiveStatus.className = 'eq-live-stopwatch-status'
      }
    }
  }

  private _lastToastMsg = ''
  private _lastToastTime = 0
  private _toastQueue: Array<{message: string; type: string; col: string; iconHtml: string; expiresAt: number}> = []
  private _toastVisible: HTMLElement[] = []
  private _toastOverflowBtn: HTMLElement | null = null

  public showToast(message: string, type: 'info' | 'success' | 'error' | 'warning' = 'info', duration = 3500, _force = false): void {
    const now = Date.now()
    const sig = type + ':' + message
    if (!_force && sig === this._lastToastMsg && now - this._lastToastTime < 1500) return
    this._lastToastMsg = sig
    this._lastToastTime = now

    const icons: Record<string, string> = {
      success: '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>',
      error:   '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>',
      warning: '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>',
      info:    '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>',
    }
    const colors: Record<string, string> = { success:'#22c55e', error:'#ef4444', warning:'#f59e0b', info:'#60a5fa' }
    const col = colors[type] || colors.info
    const iconHtml = icons[type] || icons.info

    // Push to queue
    const useStacking = this.initialSettings.toastStacking ?? true
    const entry = { message, type, col, iconHtml, expiresAt: Date.now() + duration }
    if (useStacking) {
      this._toastQueue.push(entry)
    }

    // Ensure container exists
    let container = this.shadow.querySelector('#eq-toast-container') as HTMLElement | null
    if (!container) {
      container = document.createElement('div')
      container.id = 'eq-toast-container'
      container.style.cssText = 'position:fixed;bottom:8px;left:12px;z-index:2147483647;display:flex;flex-direction:column-reverse;gap:5px;pointer-events:none;max-width:300px;'
      this.shadow.appendChild(container)
    }

    const MAX_VISIBLE = 5
    const makeToastEl = (msg: string, c: string, ico: string, dur: number): HTMLElement => {
      const toast = document.createElement('div')
      toast.style.cssText = 'display:flex;align-items:center;gap:8px;background:rgba(10,10,18,0.98);border:1px solid rgba(255,255,255,0.09);border-left:3px solid ' + c + ';padding:7px 12px 7px 10px;border-radius:7px;font-size:11px;color:rgba(235,240,248,0.92);font-family:inherit;box-shadow:0 4px 20px rgba(0,0,0,0.65),0 1px 4px rgba(0,0,0,0.4);pointer-events:all;max-width:296px;word-break:break-word;transform:translateX(-10px);opacity:0;transition:transform 0.22s cubic-bezier(0.34,1.5,0.64,1),opacity 0.16s ease;cursor:pointer;'
      const icoEl = document.createElement('span')
      icoEl.style.cssText = 'color:' + c + ';display:inline-flex;flex-shrink:0;width:14px;height:14px;'
      icoEl.innerHTML = ico
      const txtEl = document.createElement('span')
      txtEl.textContent = msg
      txtEl.style.flex = '1'
      toast.appendChild(icoEl)
      toast.appendChild(txtEl)
      return toast
    }

    // Check if we're over the limit
    // Clean expired entries from _toastVisible
    this._toastVisible = this._toastVisible.filter(el => el.isConnected)

    const overflow = useStacking ? Math.max(0, this._toastQueue.filter(e => e.expiresAt > Date.now()).length - MAX_VISIBLE) : 0

    if (useStacking && this._toastVisible.length >= MAX_VISIBLE) {
      // Don't render visually — just update overflow badge
      this._updateToastOverflow(container, overflow)
      return
    }

    const toast = makeToastEl(message, col, iconHtml, duration)
    container.appendChild(toast)
    if (useStacking) this._toastVisible.push(toast)
    requestAnimationFrame(() => requestAnimationFrame(() => { toast.style.transform = 'translateX(0)'; toast.style.opacity = '1' }))
    const dismiss = () => {
      toast.style.transform = 'translateX(-10px)'; toast.style.opacity = '0'
      setTimeout(() => {
        toast.remove()
        if (useStacking) {
          this._toastVisible = this._toastVisible.filter(el => el !== toast)
          this._toastQueue = this._toastQueue.filter(e => e.expiresAt > Date.now())
          this._updateToastOverflow(container!, Math.max(0, this._toastQueue.length - this._toastVisible.filter(e=>e.isConnected).length))
        }
      }, 200)
    }
    const timer = setTimeout(dismiss, duration)
    toast.addEventListener('click', () => { clearTimeout(timer); dismiss() }, { once: true })

    if (useStacking) this._updateToastOverflow(container, overflow)
  }

  private _updateToastOverflow(container: HTMLElement, overflow: number): void {
    if (this._toastOverflowBtn) { this._toastOverflowBtn.remove(); this._toastOverflowBtn = null }
    if (overflow <= 0) return
    const btn = document.createElement('button')
    btn.style.cssText = 'display:flex;align-items:center;gap:5px;background:rgba(14,14,20,0.92);border:1px solid rgba(255,255,255,0.1);border-radius:5px;font-size:10px;color:rgba(200,210,225,0.8);padding:4px 8px;cursor:pointer;pointer-events:all;font-family:inherit;'
    btn.innerHTML = `<svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/></svg><span>+${overflow} notif.</span>`
    btn.addEventListener('click', () => this._showToastHistory())
    this._toastOverflowBtn = btn
    container.appendChild(btn)
  }

  private _showToastHistory(): void {
    const now = Date.now()
    const history = this._toastQueue.filter(e => e.expiresAt > now)
    if (history.length === 0) return
    let container = this.shadow.querySelector('#eq-toast-container') as HTMLElement | null
    if (!container) return
    // Remove existing overflow btn
    if (this._toastOverflowBtn) { this._toastOverflowBtn.remove(); this._toastOverflowBtn = null }
    // Show all queued toasts
    const colors: Record<string, string> = { success:'#22c55e', error:'#ef4444', warning:'#f59e0b', info:'#60a5fa' }
    for (const entry of history) {
      if (container.querySelectorAll('.eq-toast-hist').length > 20) break
      const el = document.createElement('div')
      el.className = 'eq-toast-hist'
      el.style.cssText = `display:flex;align-items:center;gap:7px;background:rgba(14,14,20,0.95);border:1px solid rgba(255,255,255,0.07);border-left:3px solid ${entry.col};padding:5px 9px 5px 8px;border-radius:5px;font-size:10.5px;color:rgba(200,210,225,0.82);font-family:inherit;box-shadow:0 2px 10px rgba(0,0,0,0.4);pointer-events:all;max-width:288px;word-break:break-word;`
      const icoEl = document.createElement('span')
      icoEl.style.cssText = `color:${entry.col};display:inline-flex;flex-shrink:0;`
      icoEl.innerHTML = entry.iconHtml
      const txtEl = document.createElement('span')
      txtEl.textContent = entry.message
      txtEl.style.flex = '1'
      const timeEl = document.createElement('span')
      const secsLeft = Math.ceil((entry.expiresAt - now) / 1000)
      timeEl.textContent = `${secsLeft}s`
      timeEl.style.cssText = 'color:rgba(150,160,180,0.5);font-size:9px;flex-shrink:0;'
      el.appendChild(icoEl); el.appendChild(txtEl); el.appendChild(timeEl)
      el.addEventListener('click', () => el.remove(), { once: true })
      container.appendChild(el)
      setTimeout(() => el.remove(), Math.max(500, entry.expiresAt - now))
    }
  }

  public setStatus(message: string, type: 'info' | 'success' | 'error' | 'warning' = 'info'): void {
    // Fire toast only for user-actionable events (not transient status updates)
    if (message && message.length > 4 && (type === 'success' || type === 'error')) {
      this.showToast(message, type, 3500)
    } else if (type === 'warning' && message.length > 8) {
      this.showToast(message, type, 4000)
    } else if (type === 'info' && message.length > 10) {
      this.showToast(message, type, 2400)
    }
    const summaryEl = this.shadow.querySelector('#eq-status-summary') as HTMLElement | null
    if (summaryEl) summaryEl.textContent = message
    if (this.statusTextAp) if (this.statusTextAp) this.statusTextAp.textContent = message
    if (this.statusTextAdv) if (this.statusTextAdv) this.statusTextAdv.textContent = message

    if (type === 'error') {
      this.setOperationState('Bloqueado', 'error')
      if (this.dotPulseAp) this.dotPulseAp.className = 'eq-dot-pulse error'
      if (this.dotPulseAdv) this.dotPulseAdv.className = 'eq-dot-pulse error'
      if (this.launcherDot) this.launcherDot.className = 'eq-launcher-dot error'
    } else if (type === 'warning') {
      this.setOperationState('Interrompido', 'warning')
      if (this.dotPulseAp) this.dotPulseAp.className = 'eq-dot-pulse stopped'
      if (this.dotPulseAdv) this.dotPulseAdv.className = 'eq-dot-pulse stopped'
      if (this.launcherDot) this.launcherDot.className = 'eq-launcher-dot stopped'
    } else if (type === 'success') {
      this.setOperationState('Confirmado', 'success')
      if (this.dotPulseAp) this.dotPulseAp.className = 'eq-dot-pulse'
      if (this.dotPulseAdv) this.dotPulseAdv.className = 'eq-dot-pulse'
      if (this.launcherDot) this.launcherDot.className = 'eq-launcher-dot'
    } else {
      if (this.isBusy) {
        this.setOperationState('Analisando...', 'busy')
        if (this.dotPulseAp) this.dotPulseAp.className = 'eq-dot-pulse busy'
        if (this.dotPulseAdv) this.dotPulseAdv.className = 'eq-dot-pulse busy'
        if (this.launcherDot) this.launcherDot.className = 'eq-launcher-dot busy'
      } else {
        this.setOperationState(this.autopilot.isActive() ? 'Monitorando' : 'Pronto', 'info')
        if (this.dotPulseAp) this.dotPulseAp.className = 'eq-dot-pulse'
        if (this.dotPulseAdv) this.dotPulseAdv.className = 'eq-dot-pulse'
        if (this.launcherDot) this.launcherDot.className = 'eq-launcher-dot'
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

    // Atualiza badge de contagem no toggle header
    const badgesEl = this.shadow.querySelector('#eq-badges') as HTMLElement
    if (badgesEl) {
      badgesEl.replaceChildren()
      const countBadge = document.createElement('span')
      countBadge.className = 'eq-count-badge'
      countBadge.textContent = String(plan.actions.length)
      countBadge.title = `${plan.actions.length} ações · ${Math.round(plan.confidence * 100)}% confiança`
      badgesEl.appendChild(countBadge)
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
      badge.className = `eq-action-badge t-${act.t}`
      badge.textContent = act.t.toUpperCase()
      const text = document.createElement('span')
      text.textContent = desc
      item.append(badge, text)
      actionsListEl.appendChild(item)
    }

    if (this.applyBtn) this.applyBtn.disabled = !canApply || !plan.actions.length
    const executionCard = this.shadow.querySelector('#eq-execution-card') as HTMLElement | null
    if (executionCard) executionCard.hidden = true

    if (plan.imageDescriptions && plan.imageDescriptions.length > 0) {
      this.latestImageDescriptions = plan.imageDescriptions
    }

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
    // Update hidden compat holders (for backward compat)
    if (this.inspModel) this.inspModel.textContent = plan?.usedModel || this.initialSettings.model
    if (this.inspLatency) this.inspLatency.textContent = plan?.durationMs ? `${plan.durationMs}ms` : '--'
    if (this.inspTokens) this.inspTokens.textContent = plan?.tokensUsed ? `${plan.tokensUsed}` : '--'
    if (this.inspPrompt) this.inspPrompt.textContent = plan?.promptSent || this.latestPromptText || ''
    if (this.inspRationale) this.inspRationale.textContent = plan?.rationale || ''
    // Re-render VS Code-style explorer tree (real-time)
    this.renderBrainExplorer()
    // Also re-render active canvas tab so content is always up-to-date
    if (this.brainActiveTab) {
      this.renderBrainFileContent(this.brainActiveTab)
    }
  }

  // ── Brain Explorer State ────────────────────────────────────────
  private brainOpenTabs: { id: string; label: string }[] = []
  private brainActiveTab:      string | null = null
  private brainSelectedFolder: string | null = null
  private brainOpenFolders: Set<string> = new Set(['folder-ia', 'folder-ctx', 'folder-meta'])
  private brainCanvasHidden = false
  private brainCanvasHeight = 280

  private readonly GLOBAL_ID    = '__global__'
  private readonly GLOBAL_LABEL = 'Contexto Global'

  private getBrainFileColor(icon: string): string {
    const m: Record<string, string> = {
      file:     '#7eb8f7', code: '#f4c96a', list: '#a5d6a7',
      chip:     '#80cbc4', sparkles: '#ce93d8', clock: '#ffcc80', info: '#81deea',
    }
    return m[icon] || '#9e9e9e'
  }

  private renderMarkdown(raw: string): string {
    const esc = (s: string) => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    let html = ''
    const lines = raw.split('\n')
    let inCode = false, codeLang = '', codeLines: string[] = []

    const flushCode = () => {
      if (!inCode) return ''
      inCode = false
      const c = codeLines.join('\n'); codeLines = []
      return `<div class="eq-md-codeblock"><div class="eq-md-codelang">${esc(codeLang)}</div><pre><code>${esc(c)}</code></pre></div>`
    }

    const inl = (line: string) => line
      .replace(/`([^`]+)`/g, (_: string, c: string) => `<code class="eq-md-inline">${esc(c)}</code>`)
      .replace(/***([^*]+)***/g, (_: string, t: string) => `<strong><em>${esc(t)}</em></strong>`)
      .replace(/**([^*]+)**/g, (_: string, t: string) => `<strong>${esc(t)}</strong>`)
      .replace(/*([^*]+)*/g, (_: string, t: string) => `<em>${esc(t)}</em>`)
      .replace(/~~([^~]+)~~/g, (_: string, t: string) => `<del>${esc(t)}</del>`)

    for (const line of lines) {
      if (/^```/.test(line)) {
        if (inCode) { html += flushCode() } else { inCode = true; codeLang = line.slice(3).trim() || 'text'; codeLines = [] }
        continue
      }
      if (inCode) { codeLines.push(line); continue }
      const h1 = line.match(/^#s+(.+)/), h2 = line.match(/^##s+(.+)/), h3 = line.match(/^###s+(.+)/)
      if (h3) { html += `<h3 class="eq-md-h3">${inl(h3[1])}</h3>`; continue }
      if (h2) { html += `<h2 class="eq-md-h2">${inl(h2[1])}</h2>`; continue }
      if (h1) { html += `<h1 class="eq-md-h1">${inl(h1[1])}</h1>`; continue }
      const bq = line.match(/^>s*(.*)/)
      if (bq) { html += `<blockquote class="eq-md-bq">${inl(bq[1])}</blockquote>`; continue }
      if (/^---+$/.test(line)) { html += '<hr class="eq-md-hr">'; continue }
      const li = line.match(/^[-*+]s+(.+)/)
      if (li) { html += `<div class="eq-md-li"><span class="eq-md-bullet">·</span><span>${inl(li[1])}</span></div>`; continue }
      if (line.trim() === '') { html += '<div class="eq-md-gap"></div>'; continue }
      html += `<div class="eq-md-p">${inl(esc(line))}</div>`
    }
    html += flushCode()
    return html
  }

  private getBrainFolders() {
    const plan = this.latestPlan
    type BrainFile   = { id: string; label: string; icon: string }
    type BrainSubfolder = { id: string; label: string; icon: string; files: BrainFile[] }
    type BrainFolder = { id: string; label: string; files: BrainFile[]; subfolders?: BrainSubfolder[] }
    const imgFiles: BrainFile[] = this.latestImages.map((img, i) => ({
      id: 'img-' + i,
      label: 'img-' + (i + 1) + '.' + (img.mediaType?.split('/')?.[1] || 'jpg'),
      icon: 'image',
    }))
    const F: BrainFolder[] = [
      { id: 'folder-ia',  label: 'Resposta da IA',    files: [
          { id: 'rationale',  label: 'rationale.md',   icon: 'file'     },
          { id: 'actions',    label: 'actions.json',   icon: 'code'     },
          { id: 'summary',    label: 'resumo.txt',     icon: 'list'     },
        ] },
      { id: 'folder-ctx', label: 'Contexto & Prompt', files: [
          { id: 'prompt', label: 'prompt-enviado.txt', icon: 'file'     },
          { id: 'rag',    label: 'rag-context.txt',    icon: 'chip'     },
        ] },
      { id: 'folder-meta', label: 'Metadados',        files: [
          { id: 'meta-model',   label: 'modelo.info',   icon: 'sparkles' },
          { id: 'meta-latency', label: 'latencia.info', icon: 'clock'    },
          { id: 'meta-tokens',  label: 'tokens.info',   icon: 'info'     },
        ] },
    ]
    if ((plan as any)?.executionResult) {
      F.push({ id: 'folder-exec', label: 'Execução', files: [
        { id: 'exec-steps',  label: 'steps.log',     icon: 'list' },
        { id: 'exec-result', label: 'resultado.log', icon: 'file' },
      ] })
    }
    F.push({
      id: 'folder-media',
      label: 'Mídia',
      files: [],
      subfolders: [{
        id: 'media-images',
        label: 'Imagens',
        icon: 'image',
        files: imgFiles,
      }],
    })
    return F
  }

  private getActiveFolder(): string | null {
    if (!this.brainActiveTab) return null
    for (const f of this.getBrainFolders()) {
      if (f.files.some(fl => fl.id === this.brainActiveTab)) return f.id
      for (const sf of (f.subfolders || [])) {
        if (sf.files.some(fl => fl.id === this.brainActiveTab)) return sf.id
      }
    }
    return null
  }

  private smartCopy(): void {
    // Determine what's currently visible in the brain canvas and copy it
    const contentEl = this.shadow.querySelector('#eq-brain-content') as HTMLElement | null

    // Case 1: Image file selected
    if (this.brainActiveTab && this.brainActiveTab.startsWith('img-')) {
      const idx = parseInt(this.brainActiveTab.slice(4), 10)
      const img = this.latestImages[idx]
      if (img?.base64) {
        // Copy as data URI to clipboard (text form — browsers can't copy raw image blobs easily)
        const uri = 'data:' + (img.mediaType || 'image/jpeg') + ';base64,' + img.base64
        const desc = this.latestImageDescriptions.find(d => d.index === idx)
        const lines = [
          '[EasyQuiz] Imagem ' + (idx + 1) + ' de ' + this.latestImages.length,
          'Status: ' + (img.captureStatus || 'desconhecido'),
          'Tipo: ' + (img.mediaType || '--'),
          img.alt ? ('Alt: ' + img.alt) : '',
          img.source ? ('Fonte: ' + img.source) : '',
          desc?.description ? ('Analise IA: ' + desc.description) : '',
          img.textContext ? ('Contexto: ' + img.textContext) : '',
          'Data URI: ' + uri.slice(0, 80) + '...',
        ].filter(Boolean).join('\n')
        navigator.clipboard.writeText(lines).then(() => this.showToast('Imagem copiada (URI + metadados)', 'success', 2500))
        return
      }
    }

    // Case 2: Subfolder "Imagens" selected — copy list of images info
    if (this.brainSelectedFolder === 'media-images') {
      const lines = ['[EasyQuiz] Imagens capturadas: ' + this.latestImages.length]
      this.latestImages.forEach((img, i) => {
        const d = this.latestImageDescriptions.find(x => x.index === i)
        lines.push((i + 1) + '. ' + (img.captureStatus || '?') + (d?.description ? ' — ' + d.description.slice(0, 80) : ''))
      })
      navigator.clipboard.writeText(lines.join('\n')).then(() => this.showToast('Lista de imagens copiada', 'success', 2500))
      return
    }

    // Case 3: Any other brain file — get text from getBrainFileText
    if (this.brainActiveTab) {
      const text = this.getBrainFileText(this.brainActiveTab)
      if (text) {
        navigator.clipboard.writeText(text).then(() => this.showToast('Conteúdo copiado', 'success', 2200))
        return
      }
    }

    // Case 4: Folder selected — copy visible canvas text
    if (this.brainSelectedFolder) {
      const text = contentEl?.innerText?.trim() || ''
      if (text) {
        navigator.clipboard.writeText(text).then(() => this.showToast('Estrutura copiada', 'success', 2200))
        return
      }
    }

    // Fallback
    const fallback = contentEl?.innerText?.trim() || ''
    if (fallback) {
      navigator.clipboard.writeText(fallback).then(() => this.showToast('Conteúdo copiado', 'success', 2200))
    } else {
      this.showToast('Nada selecionado para copiar', 'warning', 2000)
    }
  }

    public initBrainControls(): void {
    const handle    = this.shadow.querySelector('#eq-brain-resize-handle') as HTMLElement | null
    const canvas    = this.shadow.querySelector('.eq-brain-canvas')        as HTMLElement | null
    const toggleBtn = this.shadow.querySelector('#eq-brain-canvas-toggle') as HTMLElement | null
    const copyBtn   = this.shadow.querySelector('#eq-copy-prompt-btn')     as HTMLElement | null

    // Always sync icon — safe to do on every tab switch
    if (toggleBtn) {
      toggleBtn.innerHTML = this.brainCanvasHidden ? ICONS.eyeOff : ICONS.eye
      toggleBtn.title = this.brainCanvasHidden ? 'Mostrar visualizador' : 'Ocultar visualizador'
    }

    // Guard: don't register resize+toggle listeners more than once
    if ((this as any)._brainControlsInited) return
    ;(this as any)._brainControlsInited = true

    if (handle && canvas) {
      let startY = 0, startH = 0
      handle.addEventListener('mousedown', (e) => {
        e.preventDefault(); startY = e.clientY; startH = canvas.getBoundingClientRect().height
        const onMove = (mv: MouseEvent) => {
          const newH = Math.max(100, Math.min(520, startH + mv.clientY - startY))
          canvas.style.height = newH + 'px'
          this.brainCanvasHeight = newH
        }
        const onUp = () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp) }
        window.addEventListener('mousemove', onMove); window.addEventListener('mouseup', onUp)
      })
    }

    if (toggleBtn && canvas) {
      toggleBtn.addEventListener('click', () => {
        this.brainCanvasHidden = !this.brainCanvasHidden
        const resizeHandle = this.shadow.querySelector('#eq-brain-resize-handle') as HTMLElement | null
        if (this.brainCanvasHidden) {
          canvas.classList.add('is-hidden')
          toggleBtn.innerHTML = ICONS.eyeOff
          toggleBtn.title = 'Mostrar visualizador'
          if (resizeHandle) resizeHandle.style.display = 'none'
        } else {
          canvas.classList.remove('is-hidden')
          toggleBtn.innerHTML = ICONS.eye
          toggleBtn.title = 'Ocultar visualizador'
          if (resizeHandle) resizeHandle.style.display = ''
        }
      })
    }

    if (copyBtn) {
      copyBtn.addEventListener('click', () => this.smartCopy())
    }
  }

  private copyCurrentContent(): void { this.smartCopy() }

  private getBrainFileText(fileId: string): string {
    if (fileId === this.GLOBAL_ID) return this.buildGlobalContext()
    // AI Artifacts
    if (fileId === 'ai-prompt') {
      const txt = this.latestPromptText || this.latestPlan?.promptSent || ''
      return txt || '// Nenhum prompt enviado ainda. Execute o Autopilot para gerar.'
    }
    if (fileId === 'ai-context') {
      const ctx = this.latestContext
      if (!ctx) return '// Aguardando captura de contexto pelo EasyQuiz...'
      const summary = {
        scope: ctx.scope.tagName.toLowerCase() + (ctx.scope.id ? '#'+ctx.scope.id : '') + (ctx.scope.className ? '.'+ctx.scope.className.split(' ').join('.') : ''),
        questionLength: ctx.questionText.length,
        questionSnippet: ctx.questionText.slice(0, 200) + (ctx.questionText.length > 200 ? '...' : ''),
        controlsCount: ctx.controls.length,
        controls: ctx.controls.map((c, i) => ({ index: i+1, tag: c.tag, type: c.type, name: c.name||undefined, id: c.id||undefined, value: c.value||undefined, label: c.label||undefined, role: c.role })),
      }
      return JSON.stringify(summary, null, 2)
    }
    if (fileId === 'ai-response') {
      const plan = this.latestPlan
      if (!plan) return '// Aguardando retorno da API...'
      return plan.rawResponse || JSON.stringify({ pageType: plan.pageType, mode: plan.mode, confidence: plan.confidence, rationale: plan.rationale, actions: plan.actions }, null, 2)
    }
    if (fileId.startsWith('img-')) {
      const idx = parseInt(fileId.slice(4), 10)
      const img = this.latestImages[idx]
      if (!img) return 'Imagem não encontrada.'
      const desc = this.latestImageDescriptions.find(d => d.index === idx)
      return [
        `Imagem ${idx + 1} de ${this.latestImages.length}`,
        `Status: ${img.captureStatus || 'desconhecido'}`,
        `Relevância: ${desc?.relevant ?? true ? 'Relevante' : 'Ignorada'}`,
        `Tipo: ${img.mediaType || '--'}`,
        img.alt ? `Alt: ${img.alt}` : '',
        img.source ? `Fonte: ${img.source}` : '',
        img.associatedLabel ? `Rótulo: ${img.associatedLabel}` : '',
        desc?.description ? `\nAnálise IA: ${desc.description}` : '',
        img.textContext ? `\nContexto textual: ${img.textContext}` : '',
      ].filter(Boolean).join('\n')
    }
    const plan = this.latestPlan
    const DATA: Record<string, string> = {
      rationale:      plan?.rationale || 'Aguardando raciocínio da IA (ou extração em andamento)...',
      actions:        plan?.actions?.length ? JSON.stringify(plan.actions, null, 2) : '// Nenhuma ação planejada no momento.',
      summary:        plan ? `Modo: ${plan.mode || 'auto'}\nConfiança: ${Math.round((plan.confidence||0)*100)}%\nAções: ${plan.actions?.length||0}\nModelo: ${plan.usedModel||'--'}` : 'Aguardando primeira análise completa...',
      prompt:         plan?.promptSent || this.latestPromptText || 'Nenhum prompt em memória. A IA ainda não foi acionada.',
      rag:            (plan as any)?.ragContext || 'Nenhuma memória estendida usada ou capturada.',
      'meta-model':   `Modelo Ativo: ${plan?.usedModel || this.initialSettings.model || '--'}`,
      'meta-latency': plan?.durationMs ? `Latência: ${plan.durationMs}ms` : 'Latência: --',
      'meta-tokens':  plan?.tokensUsed ? `Tokens: ${plan.tokensUsed}` : 'Tokens: --',
      'exec-steps':   (plan as any)?.executionResult?.steps?.map((s: unknown) => JSON.stringify(s)).join('\n') || 'Passos de execução ainda não iniciados.',
      'exec-result':  (plan as any)?.executionResult ? JSON.stringify((plan as any).executionResult, null, 2) : 'Aguardando resultado de execução...',
    }
    return DATA[fileId] ?? 'Conteúdo não disponível para este arquivo.'
  }

  private buildGlobalContext(): string {
    const plan = this.latestPlan
    const ctx = this.latestContext
    const imgs = this.latestImages
    const esc = (s: string) => String(s ?? '-- sem dados --')
    
    const parts: string[] = [
      '# Visão Global — EasyQuiz',
      '',
      `**URL:** ${window.location.href}`,
      `**Título:** ${document.title}`,
      `**Mídias Capturadas:** ${imgs.length} imagem(ns)`,
      '',
      '---',
      '',
      '## Status da Extração Local',
      '',
      '### Texto do Enunciado Detectado',
      ctx ? ctx.questionText : 'Aguardando captura do DOM...',
      '',
      '### Controles (Alternativas/Botões)',
      ctx && ctx.controls.length > 0 ? ctx.controls.map(c => `- [${c.type}] ${c.label || c.id || c.name || c.value || 'Sem rótulo'}`).join('\n') : 'Nenhum controle capturado ainda.',
      '',
      '---',
      '',
      '## Resposta da IA',
      '',
      '### Raciocínio (Rationale)',
      esc(plan?.rationale || 'Aguardando análise da IA...'),
      '',
      '### Ações a Executar',
      plan?.actions?.length ? JSON.stringify(plan.actions, null, 2) : '// Nenhuma ação planejada no momento.',
      '',
      '### Resumo',
      plan ? `- Modo: ${plan.mode || 'auto'}\n- Confiança: ${Math.round((plan.confidence||0)*100)}%\n- Total de ações: ${plan.actions?.length||0}\n- Modelo: ${plan.usedModel||'--'}` : 'Aguardando primeira análise...',
      '',
      '---',
      '',
      '## Injeção & Metadados',
      '',
      '### Prompt Enviado (Raw)',
      esc(plan?.promptSent || this.latestPromptText || 'Nenhum prompt em memória.'),
      '',
      '### Contexto RAG Acumulado',
      esc((plan as any)?.ragContext || 'Nenhuma memória estendida usada.'),
      '',
      `- **Modelo Configurado:** ${plan?.usedModel || this.initialSettings.model || '--'}`,
      `- **Latência Último Call:** ${plan?.durationMs ? plan.durationMs + 'ms' : '--'}`,
      `- **Tokens Consumidos:** ${plan?.tokensUsed ?? '--'}`,
      '',
    ]
    if ((plan as any)?.executionResult) {
      parts.push('---', '', '## Execução Automática (Autopilot)', '')
      parts.push('### Steps (Passo a Passo)')
      parts.push((plan as any).executionResult?.steps?.map((s: unknown) => JSON.stringify(s)).join('\n') || 'Sem passos.')
      parts.push('', '### Resultado Final')
      parts.push(JSON.stringify((plan as any).executionResult, null, 2))
    }
    return parts.join('\n')
  }

  private renderBrainExplorer(): void {
    const explorerEl = this.shadow.querySelector('#eq-brain-explorer') as HTMLElement | null
    if (!explorerEl) return
    explorerEl.innerHTML = ''
    const activeFolder = this.getActiveFolder()

    const globalRow = document.createElement('div')
    globalRow.className = 'eq-tree-file eq-tree-global' + (this.brainActiveTab === this.GLOBAL_ID ? ' is-selected' : '')
    globalRow.innerHTML = `<span class="eq-tree-ficon" style="color:#60a5fa">${ICONS.folderTree}</span><span class="eq-tree-label">${this.GLOBAL_LABEL}</span>`
    globalRow.addEventListener('click', () => { this.brainSelectedFolder = null; this.openBrainFile(this.GLOBAL_ID, this.GLOBAL_LABEL) })
    explorerEl.appendChild(globalRow)

    const sep = document.createElement('div'); sep.className = 'eq-tree-sep'
    explorerEl.appendChild(sep)

    for (const folder of this.getBrainFolders()) {
      const isOpen = this.brainOpenFolders.has(folder.id)
      const isSel  = this.brainSelectedFolder === folder.id || activeFolder === folder.id

      const folderRow = document.createElement('div')
      folderRow.className = 'eq-tree-folder' + (isSel ? ' is-folder-sel' : '')

      const arrow = document.createElement('span')
      arrow.className = 'eq-tree-arrow'
      arrow.innerHTML = isOpen ? ICONS.chevronDown : ICONS.chevronRight
      arrow.addEventListener('click', (e) => {
        e.stopPropagation()
        if (this.brainOpenFolders.has(folder.id)) this.brainOpenFolders.delete(folder.id)
        else this.brainOpenFolders.add(folder.id)
        this.renderBrainExplorer()
      })
      folderRow.appendChild(arrow)

      const ficon = document.createElement('span'); ficon.className = 'eq-tree-ficon'; ficon.style.color = '#fbbf24'; ficon.innerHTML = ICONS.folder
      const label = document.createElement('span'); label.className = 'eq-tree-label'; label.textContent = folder.label
      folderRow.appendChild(ficon); folderRow.appendChild(label)

      folderRow.addEventListener('click', () => {
        this.brainSelectedFolder = folder.id; this.brainActiveTab = null
        this.showFolderContent(folder); this.renderBrainExplorer(); this.renderBrainTabs()
      })
      explorerEl.appendChild(folderRow)

      const childWrap = document.createElement('div')
      const totalChildren = folder.files.length + (folder.subfolders?.reduce((s, sf) => s + sf.files.length + 1, 0) ?? 0)
      childWrap.className = 'eq-tree-children' + (isOpen ? ' is-open' : '')
      childWrap.style.setProperty('--child-count', String(totalChildren))

      for (const file of folder.files) {
        const color = this.getBrainFileColor(file.icon)
        const fileRow = document.createElement('div')
        fileRow.className = 'eq-tree-file' + (this.brainActiveTab === file.id ? ' is-selected' : '')
        fileRow.innerHTML = `<span class="eq-tree-ficon" style="color:${color}">${(ICONS as any)[file.icon] || ICONS.file}</span><span class="eq-tree-label">${file.label}</span>`
        fileRow.addEventListener('click', (e) => { e.stopPropagation(); this.brainSelectedFolder = null; this.openBrainFile(file.id, file.label) })
        childWrap.appendChild(fileRow)
      }

      // Render subfolders (one level deep)
      for (const sf of (folder.subfolders || [])) {
        const sfIsOpen = this.brainOpenFolders.has(sf.id)
        const sfIsSel  = this.brainSelectedFolder === sf.id

        const sfRow = document.createElement('div')
        sfRow.className = 'eq-tree-folder eq-tree-subfolder' + (sfIsSel ? ' is-folder-sel' : '')
        sfRow.style.paddingLeft = '18px'

        const sfArrow = document.createElement('span')
        sfArrow.className = 'eq-tree-arrow'
        sfArrow.innerHTML = sfIsOpen ? ICONS.chevronDown : ICONS.chevronRight
        sfArrow.addEventListener('click', (e) => {
          e.stopPropagation()
          if (this.brainOpenFolders.has(sf.id)) this.brainOpenFolders.delete(sf.id)
          else this.brainOpenFolders.add(sf.id)
          this.renderBrainExplorer()
        })
        sfRow.appendChild(sfArrow)

        const sfIco = document.createElement('span'); sfIco.className = 'eq-tree-ficon'; sfIco.style.color = '#60a5fa'; sfIco.innerHTML = (ICONS as any)[sf.icon] || ICONS.folder
        const sfLbl = document.createElement('span'); sfLbl.className = 'eq-tree-label'; sfLbl.textContent = sf.label
        const sfBadge = document.createElement('span')
        sfBadge.style.cssText = 'font-size:9px;color:#666;margin-left:4px;flex-shrink:0;'
        sfBadge.textContent = String(sf.files.length)
        sfRow.appendChild(sfIco); sfRow.appendChild(sfLbl); sfRow.appendChild(sfBadge)

        sfRow.addEventListener('click', () => {
          this.brainSelectedFolder = sf.id
          this.brainActiveTab = null
          this.brainOpenFolders.add(sf.id)
          this.showSubfolderContent(sf)
          this.renderBrainExplorer()
          this.renderBrainTabs()
        })
        childWrap.appendChild(sfRow)

        // Subfolder children
        const sfChildWrap = document.createElement('div')
        sfChildWrap.className = 'eq-tree-children' + (sfIsOpen ? ' is-open' : '')
        sfChildWrap.style.setProperty('--child-count', String(sf.files.length))

        for (const file of sf.files) {
          const color = this.getBrainFileColor(file.icon)
          const fileRow = document.createElement('div')
          fileRow.className = 'eq-tree-file' + (this.brainActiveTab === file.id ? ' is-selected' : '')
          fileRow.style.paddingLeft = '32px'
          fileRow.innerHTML = `<span class="eq-tree-ficon" style="color:${color}">${(ICONS as any)[file.icon] || ICONS.file}</span><span class="eq-tree-label">${file.label}</span>`
          fileRow.addEventListener('click', (e) => {
            e.stopPropagation()
            this.brainSelectedFolder = null
            this.openBrainFile(file.id, file.label)
          })
          sfChildWrap.appendChild(fileRow)
        }
        childWrap.appendChild(sfChildWrap)
      }

      explorerEl.appendChild(childWrap)
    }
  }

  private showFolderContent(folder: { id: string; label: string; files: { id: string; label: string; icon: string }[]; subfolders?: { id: string; label: string; icon: string; files: { id: string; label: string; icon: string }[] }[] }): void {
    const contentEl = this.shadow.querySelector('#eq-brain-content') as HTMLElement | null
    if (!contentEl) return
    contentEl.innerHTML = ''

    const esc = (s: string) => String(s ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    const wrap = document.createElement('div')
    wrap.className = 'eq-folder-view'

    const header = document.createElement('div')
    header.className = 'eq-folder-view-header'
    header.innerHTML = `<span class="eq-tree-ficon" style="color:#fbbf24">${ICONS.folder}</span><span>${esc(folder.label)}</span>`
    wrap.appendChild(header)

    const filesDiv = document.createElement('div')
    filesDiv.className = 'eq-folder-view-files'

    // Direct files
    for (const file of folder.files) {
      const c = this.getBrainFileColor(file.icon)
      const row = document.createElement('div')
      row.className = 'eq-folder-view-row'
      row.innerHTML = `<span class="eq-tree-ficon" style="color:${c}">${(ICONS as any)[file.icon] || ICONS.file}</span><span>${esc(file.label)}</span>`
      row.addEventListener('click', () => this.openBrainFile(file.id, file.label))
      filesDiv.appendChild(row)
    }

    // Subfolders
    for (const sf of (folder.subfolders || [])) {
      const sfRow = document.createElement('div')
      sfRow.className = 'eq-folder-view-row'
      sfRow.style.cssText = 'display:flex;align-items:center;gap:6px;padding:7px 10px;cursor:pointer;border-radius:5px;'
      const imgCount = sf.id === 'media-images' ? this.latestImages.length : sf.files.length
      sfRow.innerHTML = `<span class="eq-tree-ficon" style="color:#60a5fa">${(ICONS as any)[sf.icon] || ICONS.folder}</span><span style="flex:1">${esc(sf.label)}</span><span style="font-size:9px;color:#555;">${imgCount} item${imgCount !== 1 ? 's' : ''}</span>`
      sfRow.addEventListener('mouseenter', () => { sfRow.style.background = 'rgba(255,255,255,0.04)' })
      sfRow.addEventListener('mouseleave', () => { sfRow.style.background = '' })
      sfRow.addEventListener('click', () => {
        this.brainSelectedFolder = sf.id
        this.brainActiveTab = null
        this.brainOpenFolders.add(sf.id)
        this.showSubfolderContent(sf)
        this.renderBrainExplorer()
        this.renderBrainTabs()
      })
      filesDiv.appendChild(sfRow)
    }

    wrap.appendChild(filesDiv)
    contentEl.appendChild(wrap)
  }

  private openBrainFile(fileId: string, label: string): void {
    if (!this.brainOpenTabs.find(t => t.id === fileId)) this.brainOpenTabs.push({ id: fileId, label })
    this.brainActiveTab = fileId
    if (this.brainCanvasHidden) {
      const canvas    = this.shadow.querySelector('.eq-brain-canvas')        as HTMLElement | null
      const toggleBtn = this.shadow.querySelector('#eq-brain-canvas-toggle') as HTMLElement | null
      canvas?.classList.remove('is-hidden')
      if (toggleBtn) { toggleBtn.innerHTML = ICONS.eye; toggleBtn.title = 'Ocultar visualizador' }
      this.brainCanvasHidden = false
    }
    this.renderBrainExplorer(); this.renderBrainTabs(); this.renderBrainFileContent(fileId)
  }

  private showSubfolderContent(sf: { id: string; label: string; icon: string; files: { id: string; label: string; icon: string }[] }): void {
    if (sf.id === 'media-images') {
      this.showMediaGrid()
    } else {
      // generic subfolder view (same as folder view)
      this.showFolderContent(sf as any)
    }
  }

  private showMediaGrid(): void {
    const contentEl = this.shadow.querySelector('#eq-brain-content') as HTMLElement | null
    if (!contentEl) return
    contentEl.innerHTML = ''

    const imgs = this.latestImages
    const descs = this.latestImageDescriptions

    const wrapper = document.createElement('div')
    wrapper.style.cssText = 'display:flex;flex-direction:column;height:100%;overflow:hidden;'

    const header = document.createElement('div')
    header.style.cssText = 'padding:8px 12px;font-size:10px;color:#666;border-bottom:1px solid rgba(255,255,255,0.06);display:flex;justify-content:space-between;flex-shrink:0;'
    header.innerHTML = `<span style="color:#60a5fa;font-weight:600;">Imagens</span><span>${imgs.length} captura${imgs.length !== 1 ? 's' : ''}</span>`
    wrapper.appendChild(header)

    const scroll = document.createElement('div')
    scroll.style.cssText = 'flex:1;overflow-y:auto;padding:10px;'

    if (imgs.length === 0) {
      scroll.innerHTML = '<div style="text-align:center;padding:32px 0;color:#555;font-size:11px;">Nenhuma imagem capturada.<br><span style="opacity:0.6;font-size:10px;">Ative "Visão Computacional" nas configurações e execute uma análise.</span></div>'
    } else {
      const grid = document.createElement('div')
      grid.style.cssText = 'display:grid;grid-template-columns:repeat(3,1fr);gap:6px;'

      imgs.forEach((img, i) => {
        const desc = descs.find(d => d.index === i)
        const isRelevant = desc?.relevant ?? true
        const dataUri = img.base64 ? `data:${img.mediaType || 'image/jpeg'};base64,${img.base64}` : ''

        const cell = document.createElement('div')
        cell.style.cssText = `position:relative;aspect-ratio:1;border-radius:5px;overflow:hidden;cursor:pointer;background:#111;border:2px solid ${isRelevant ? 'rgba(96,165,250,0.3)' : 'rgba(255,255,255,0.06)'};transition:border-color 0.15s,transform 0.12s;`

        if (dataUri) {
          const imgEl = document.createElement('img')
          imgEl.src = dataUri
          imgEl.style.cssText = 'width:100%;height:100%;object-fit:cover;display:block;'
          cell.appendChild(imgEl)
        } else {
          const placeholder = document.createElement('div')
          placeholder.style.cssText = 'width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:#555;font-size:10px;'
          placeholder.textContent = 'Texto'
          cell.appendChild(placeholder)
        }

        const badge = document.createElement('div')
        badge.style.cssText = 'position:absolute;bottom:3px;right:3px;background:rgba(0,0,0,0.75);border-radius:3px;padding:1px 4px;font-size:9px;color:#aaa;'
        badge.textContent = String(i + 1)
        cell.appendChild(badge)

        cell.addEventListener('mouseenter', () => { cell.style.transform = 'scale(1.03)'; cell.style.borderColor = '#60a5fa' })
        cell.addEventListener('mouseleave', () => { cell.style.transform = ''; cell.style.borderColor = isRelevant ? 'rgba(96,165,250,0.3)' : 'rgba(255,255,255,0.06)' })
        cell.addEventListener('click', () => {
          this.brainSelectedFolder = null
          this.openBrainFile('img-' + i, 'img-' + (i + 1) + '.' + (img.mediaType?.split('/')?.[1] || 'jpg'))
        })

        grid.appendChild(cell)
      })
      scroll.appendChild(grid)
    }

    wrapper.appendChild(scroll)
    contentEl.appendChild(wrapper)
  }

  private showImageFile(index: number): void {
    const contentEl = this.shadow.querySelector('#eq-brain-content') as HTMLElement | null
    if (!contentEl) return
    contentEl.innerHTML = ''

    const img = this.latestImages[index]
    if (!img) {
      contentEl.innerHTML = '<div style="padding:16px;color:#666;font-size:11px;">Imagem não encontrada.</div>'
      return
    }

    const desc = this.latestImageDescriptions.find(d => d.index === index)
    const dataUri = img.base64 ? `data:${img.mediaType || 'image/jpeg'};base64,${img.base64}` : ''
    const isRelevant = desc?.relevant ?? true
    const statusLabel = img.captureStatus === 'captured' ? 'Visual' : img.captureStatus === 'text_only' ? 'Texto' : 'Falhou'
    const statusColor = img.captureStatus === 'captured' ? '#4ade80' : img.captureStatus === 'text_only' ? '#fbbf24' : '#ef4444'

    const wrapper = document.createElement('div')
    wrapper.style.cssText = 'display:flex;flex-direction:column;height:100%;overflow:hidden;'

    // Image area with wheel zoom
    const imgArea = document.createElement('div')
    imgArea.style.cssText = 'flex:0 0 auto;background:#0a0a0f;display:flex;align-items:center;justify-content:center;padding:10px;min-height:140px;max-height:55%;cursor:zoom-in;border-bottom:1px solid rgba(255,255,255,0.06);position:relative;overflow:hidden;'

    if (dataUri) {
      const imgEl = document.createElement('img')
      imgEl.src = dataUri
      imgEl.alt = img.alt || `Imagem ${index + 1}`
      imgEl.style.cssText = 'max-width:100%;max-height:100%;object-fit:contain;border-radius:4px;transform-origin:center center;transition:transform 0.12s ease;user-select:none;'
      imgArea.appendChild(imgEl)

      // Wheel zoom on canvas image
      let scale = 1
      const MIN_SCALE = 0.5, MAX_SCALE = 4
      imgArea.addEventListener('wheel', (e: WheelEvent) => {
        e.preventDefault()
        e.stopPropagation()
        const delta = e.deltaY > 0 ? -0.15 : 0.15
        scale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, scale + delta))
        imgEl.style.transform = scale === 1 ? '' : `scale(${scale.toFixed(2)})`
        imgArea.style.cursor = scale > 1 ? 'grab' : 'zoom-in'
        // update hint
        const hint = imgArea.querySelector('.eq-zoom-hint') as HTMLElement | null
        if (hint) hint.textContent = scale !== 1 ? `${Math.round(scale * 100)}% · scroll para zoom · clique para ampliar` : 'scroll para zoom · clique para ampliar'
      }, { passive: false })

      imgArea.addEventListener('click', () => this.openImageLightbox(index))

      const zoomHint = document.createElement('div')
      zoomHint.className = 'eq-zoom-hint'
      zoomHint.style.cssText = 'position:absolute;bottom:6px;right:8px;font-size:9px;color:rgba(255,255,255,0.3);pointer-events:none;'
      zoomHint.textContent = 'scroll para zoom · clique para ampliar'
      imgArea.appendChild(zoomHint)

      // Prev/Next arrows (only when multiple images)
      const total = this.latestImages.length
      if (total > 1) {
        const makeArrow = (dir: 'prev' | 'next') => {
          const btn = document.createElement('button')
          btn.style.cssText = `position:absolute;${dir === 'prev' ? 'left:6px' : 'right:6px'};top:50%;transform:translateY(-50%);background:rgba(0,0,0,0.55);border:1px solid rgba(255,255,255,0.12);color:#ccc;width:24px;height:24px;border-radius:50%;cursor:pointer;font-size:13px;z-index:5;display:flex;align-items:center;justify-content:center;transition:background 0.12s;`
          btn.innerHTML = dir === 'prev' ? '‹' : '›'
          btn.title = dir === 'prev' ? 'Imagem anterior' : 'Próxima imagem'
          btn.style.display = (dir === 'prev' && index === 0) || (dir === 'next' && index === total - 1) ? 'none' : 'flex'
          btn.addEventListener('mouseenter', () => { btn.style.background = 'rgba(96,165,250,0.3)' })
          btn.addEventListener('mouseleave', () => { btn.style.background = 'rgba(0,0,0,0.55)' })
          btn.addEventListener('click', (e) => {
            e.stopPropagation()
            const nextIdx = dir === 'prev' ? index - 1 : index + 1
            if (nextIdx >= 0 && nextIdx < total) {
              this.brainActiveTab = 'img-' + nextIdx
              const img2 = this.latestImages[nextIdx]
              const label2 = 'img-' + (nextIdx + 1) + '.' + (img2?.mediaType?.split('/')?.[1] || 'jpg')
              if (!this.brainOpenTabs.find(t => t.id === 'img-' + nextIdx)) this.brainOpenTabs.push({ id: 'img-' + nextIdx, label: label2 })
              this.renderBrainExplorer(); this.renderBrainTabs()
              this.showImageFile(nextIdx)
            }
          })
          return btn
        }
        imgArea.appendChild(makeArrow('prev'))
        imgArea.appendChild(makeArrow('next'))
      }
    } else {
      imgArea.style.cssText += 'color:#555;font-size:11px;'
      imgArea.textContent = 'Sem dados visuais — captura em modo texto'
    }

    wrapper.appendChild(imgArea)

    // Metadata scrollable area
    const metaScroll = document.createElement('div')
    metaScroll.style.cssText = 'flex:1;overflow-y:auto;padding:10px 12px;display:flex;flex-direction:column;gap:7px;'

    const row = (label: string, value: string, color = '#aaa') => {
      const d = document.createElement('div')
      d.style.cssText = 'display:flex;gap:8px;font-size:10.5px;'
      d.innerHTML = `<span style="color:#555;min-width:72px;flex-shrink:0;">${label}</span><span style="color:${color};word-break:break-word;">${value}</span>`
      return d
    }

    metaScroll.appendChild(row('Índice', `Imagem ${index + 1} de ${this.latestImages.length}`))
    metaScroll.appendChild(row('Status', statusLabel, statusColor))
    metaScroll.appendChild(row('Relevância', isRelevant ? 'Relevante' : 'Ignorada', isRelevant ? '#60a5fa' : '#666'))
    metaScroll.appendChild(row('Tipo', img.mediaType || '--'))
    if (img.alt) metaScroll.appendChild(row('Alt text', img.alt))
    if (img.source) metaScroll.appendChild(row('Fonte', img.source))
    if (img.associatedLabel) metaScroll.appendChild(row('Rótulo', img.associatedLabel))
    if (desc?.description) {
      const aiD = document.createElement('div')
      aiD.style.cssText = 'background:rgba(96,165,250,0.06);border:1px solid rgba(96,165,250,0.15);border-radius:5px;padding:8px;'
      aiD.innerHTML = `<div style="font-size:9px;color:#60a5fa;font-weight:600;margin-bottom:4px;">ANÁLISE DA IA</div><div style="font-size:10.5px;color:#ccc;line-height:1.55;">${desc.description}</div>`
      metaScroll.appendChild(aiD)
    }
    if (img.textContext) {
      const txtD = document.createElement('div')
      txtD.style.cssText = 'background:rgba(251,191,36,0.05);border:1px solid rgba(251,191,36,0.12);border-radius:5px;padding:8px;'
      txtD.innerHTML = `<div style="font-size:9px;color:#fbbf24;font-weight:600;margin-bottom:4px;">CONTEXTO TEXTUAL</div><div style="font-size:10.5px;color:#ccc;line-height:1.55;">${img.textContext}</div>`
      metaScroll.appendChild(txtD)
    }

    wrapper.appendChild(metaScroll)
    contentEl.appendChild(wrapper)
  }

  private openImageLightbox(index: number): void {
    const img = this.latestImages[index]
    if (!img) return
    const desc = this.latestImageDescriptions.find(d => d.index === index)
    const dataUri = img.base64 ? `data:${img.mediaType || 'image/jpeg'};base64,${img.base64}` : ''

    // Remove existing lightbox
    this.shadow.querySelector('#eq-img-lightbox')?.remove()

    // Overlay — click on backdrop to close
    const overlay = document.createElement('div')
    overlay.id = 'eq-img-lightbox'
    overlay.style.cssText = 'position:fixed;inset:0;z-index:2147483647;background:rgba(0,0,0,0.92);display:flex;align-items:center;justify-content:center;padding:20px;box-sizing:border-box;'

    // Modal wrapper
    const modal = document.createElement('div')
    modal.style.cssText = 'display:flex;width:min(90vw,1100px);max-height:90vh;border-radius:10px;background:#0f0f17;border:1px solid rgba(255,255,255,0.1);box-shadow:0 24px 64px rgba(0,0,0,0.8);position:relative;overflow:hidden;'

    // Close button INSIDE overlay but OUTSIDE modal — safe from overflow:hidden
    const closeBtn = document.createElement('button')
    closeBtn.style.cssText = 'position:absolute;top:10px;right:10px;background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.15);color:#ddd;width:30px;height:30px;border-radius:50%;cursor:pointer;font-size:18px;z-index:10;display:flex;align-items:center;justify-content:center;line-height:1;'
    closeBtn.textContent = '×'
    closeBtn.title = 'Fechar (ESC)'

    // Image side with wheel zoom
    const imgSide = document.createElement('div')
    imgSide.style.cssText = 'flex:0 0 65%;display:flex;align-items:center;justify-content:center;background:#050508;padding:16px;min-width:0;overflow:hidden;position:relative;'

    if (dataUri) {
      const imgEl = document.createElement('img')
      imgEl.src = dataUri
      imgEl.style.cssText = 'max-width:100%;max-height:82vh;object-fit:contain;border-radius:4px;transform-origin:center center;transition:transform 0.1s ease;user-select:none;display:block;'

      // Wheel zoom
      let scale = 1
      const MIN_SCALE = 0.3, MAX_SCALE = 6
      imgSide.addEventListener('wheel', (e: WheelEvent) => {
        e.preventDefault()
        e.stopPropagation()
        const delta = e.deltaY < 0 ? 0.18 : -0.18
        scale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, scale + delta))
        imgEl.style.transform = `scale(${scale.toFixed(3)})`
        imgEl.style.cursor = scale > 1 ? 'grab' : 'default'
        zoomBadge.textContent = `${Math.round(scale * 100)}%`
        zoomBadge.style.opacity = '1'
        clearTimeout((imgSide as any)._zt)
        ;(imgSide as any)._zt = setTimeout(() => { zoomBadge.style.opacity = '0' }, 1200)
      }, { passive: false })

      // Reset zoom on double-click
      imgEl.addEventListener('dblclick', () => {
        scale = 1
        imgEl.style.transform = ''
        imgEl.style.cursor = 'default'
        zoomBadge.textContent = '100%'
        zoomBadge.style.opacity = '1'
        setTimeout(() => { zoomBadge.style.opacity = '0' }, 800)
      })

      const zoomBadge = document.createElement('div')
      zoomBadge.style.cssText = 'position:absolute;bottom:10px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,0.7);color:#aaa;font-size:10px;padding:2px 8px;border-radius:10px;pointer-events:none;opacity:0;transition:opacity 0.3s;'
      zoomBadge.textContent = '100%'

      imgSide.appendChild(imgEl)
      imgSide.appendChild(zoomBadge)
    } else {
      imgSide.innerHTML = '<div style="color:#555;font-size:12px;text-align:center;width:100%;">Sem dados visuais</div>'
    }
    modal.appendChild(imgSide)

    // Metadata side
    const metaSide = document.createElement('div')
    metaSide.style.cssText = 'flex:0 0 35%;overflow-y:auto;padding:20px 16px 20px;border-left:1px solid rgba(255,255,255,0.06);display:flex;flex-direction:column;gap:8px;min-width:0;'

    const title = document.createElement('div')
    title.style.cssText = 'font-size:13px;font-weight:700;color:#e0e0e0;margin-bottom:6px;'
    title.textContent = `Imagem ${index + 1} de ${this.latestImages.length}`
    metaSide.appendChild(title)

    const statusColor = img.captureStatus === 'captured' ? '#4ade80' : img.captureStatus === 'text_only' ? '#fbbf24' : '#ef4444'
    const statusLabel = img.captureStatus === 'captured' ? 'Visual' : img.captureStatus === 'text_only' ? 'Texto' : 'Falhou'

    const infoRow = (label: string, value: string, col = '#aaa') => {
      const d = document.createElement('div')
      d.style.cssText = 'display:flex;gap:6px;font-size:10px;'
      d.innerHTML = `<span style="color:#555;min-width:64px;flex-shrink:0;">${label}</span><span style="color:${col};word-break:break-word;">${value}</span>`
      return d
    }

    metaSide.appendChild(infoRow('Status', statusLabel, statusColor))
    metaSide.appendChild(infoRow('Relevância', (desc?.relevant ?? true) ? 'Relevante' : 'Ignorada', (desc?.relevant ?? true) ? '#60a5fa' : '#666'))
    metaSide.appendChild(infoRow('Tipo', img.mediaType || '--'))
    if (img.alt) metaSide.appendChild(infoRow('Alt', img.alt))
    if (img.source) metaSide.appendChild(infoRow('Fonte', img.source))
    if (img.associatedLabel) metaSide.appendChild(infoRow('Rótulo', img.associatedLabel))

    const hint = document.createElement('div')
    hint.style.cssText = 'font-size:9px;color:#444;margin-top:4px;'
    hint.textContent = 'Scroll na imagem para zoom · Duplo-clique para resetar'
    metaSide.appendChild(hint)

    if (desc?.description) {
      const aiBlock = document.createElement('div')
      aiBlock.style.cssText = 'background:rgba(96,165,250,0.07);border:1px solid rgba(96,165,250,0.18);border-radius:5px;padding:8px;margin-top:4px;'
      aiBlock.innerHTML = `<div style="font-size:9px;color:#60a5fa;font-weight:700;margin-bottom:5px;">ANÁLISE DA IA</div><div style="font-size:10px;color:#ccc;line-height:1.6;">${desc.description}</div>`
      metaSide.appendChild(aiBlock)
    }
    if (img.textContext) {
      const txtBlock = document.createElement('div')
      txtBlock.style.cssText = 'background:rgba(251,191,36,0.05);border:1px solid rgba(251,191,36,0.12);border-radius:5px;padding:8px;'
      txtBlock.innerHTML = `<div style="font-size:9px;color:#fbbf24;font-weight:700;margin-bottom:5px;">CONTEXTO TEXTUAL</div><div style="font-size:10px;color:#ccc;line-height:1.6;">${img.textContext}</div>`
      metaSide.appendChild(txtBlock)
    }

    modal.appendChild(metaSide)
    overlay.appendChild(closeBtn)  // closeBtn is inside overlay, outside modal
    overlay.appendChild(modal)
    this.shadow.appendChild(overlay)

    const close = () => overlay.remove()
    closeBtn.addEventListener('click', (e) => { e.stopPropagation(); close() })
    modal.addEventListener('click', (e) => e.stopPropagation())  // prevent modal clicks from bubbling to overlay
    overlay.addEventListener('click', () => close())  // click anywhere on backdrop closes

    // Prev/Next in lightbox
    const totalImgs = this.latestImages.length
    if (totalImgs > 1) {
      const makeNav = (dir: 'prev' | 'next') => {
        const btn = document.createElement('button')
        btn.style.cssText = `position:absolute;${dir === 'prev' ? 'left:12px' : 'right:12px'};top:50%;transform:translateY(-50%);background:rgba(0,0,0,0.6);border:1px solid rgba(255,255,255,0.15);color:#ddd;width:36px;height:36px;border-radius:50%;cursor:pointer;font-size:22px;z-index:10;display:${(dir === 'prev' && index === 0) || (dir === 'next' && index === totalImgs - 1) ? 'none' : 'flex'};align-items:center;justify-content:center;`
        btn.innerHTML = dir === 'prev' ? '‹' : '›'
        btn.title = dir === 'prev' ? 'Anterior' : 'Próxima'
        btn.addEventListener('mouseenter', () => { btn.style.background = 'rgba(96,165,250,0.35)' })
        btn.addEventListener('mouseleave', () => { btn.style.background = 'rgba(0,0,0,0.6)' })
        btn.addEventListener('click', (e) => {
          e.stopPropagation()
          const ni = dir === 'prev' ? index - 1 : index + 1
          if (ni >= 0 && ni < totalImgs) { overlay.remove(); this.openImageLightbox(ni) }
        })
        return btn
      }
      overlay.appendChild(makeNav('prev'))
      overlay.appendChild(makeNav('next'))
    }
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { close(); window.removeEventListener('keydown', onKey) } }
    window.addEventListener('keydown', onKey)
  }

    private closeBrainTab(fileId: string): void {
    const idx = this.brainOpenTabs.findIndex(t => t.id === fileId)
    if (idx === -1) return
    this.brainOpenTabs.splice(idx, 1)
    if (this.brainActiveTab === fileId) this.brainActiveTab = this.brainOpenTabs[idx-1]?.id || this.brainOpenTabs[0]?.id || null
    this.renderBrainExplorer(); this.renderBrainTabs()
    this.refreshBrainCanvas()
  }

  private refreshBrainCanvas(): void {
    if (this.brainActiveTab) {
      this.renderBrainFileContent(this.brainActiveTab)
    } else if (this.brainSelectedFolder) {
      if (this.brainSelectedFolder === 'media-images') {
        this.showMediaGrid()
        return
      }
      // Check subfolders
      for (const folder of this.getBrainFolders()) {
        const sf = (folder.subfolders || []).find(s => s.id === this.brainSelectedFolder)
        if (sf) { this.showSubfolderContent(sf); return }
      }
      const folder = this.getBrainFolders().find(f => f.id === this.brainSelectedFolder)
      if (folder) {
        this.showFolderContent(folder as any)
      } else {
        const c = this.shadow.querySelector('#eq-brain-content') as HTMLElement | null
        if (c) c.innerHTML = '<div class="eq-brain-empty-canvas"><div style="margin-bottom:4px;opacity:0.5">Nada selecionado</div><div class="eq-brain-empty-sub">Selecione um arquivo no explorador abaixo para visualizá-lo</div></div>'
      }
    } else {
      const c = this.shadow.querySelector('#eq-brain-content') as HTMLElement | null
      if (c) c.innerHTML = '<div class="eq-brain-empty-canvas"><div style="margin-bottom:4px;opacity:0.5">Nada selecionado</div><div class="eq-brain-empty-sub">Selecione um arquivo no explorador abaixo para visualizá-lo</div></div>'
    }
  }

  private renderBrainTabs(): void {
    const tabbar = this.shadow.querySelector('#eq-brain-tabbar') as HTMLElement | null
    if (!tabbar) return
    tabbar.innerHTML = ''
    for (const tab of this.brainOpenTabs) {
      const tabEl = document.createElement('div')
      tabEl.className = 'eq-brain-tab' + (this.brainActiveTab === tab.id ? ' is-active' : '')
      tabEl.innerHTML = `<span class="eq-brain-tab-icon">${tab.id === this.GLOBAL_ID ? ICONS.folderTree : ICONS.file}</span><span class="eq-brain-tab-label">${tab.label}</span><button class="eq-brain-tab-close" data-tab-id="${tab.id}" type="button">${ICONS.close}</button>`
      tabEl.addEventListener('click', (e) => {
        const cl = (e.target as HTMLElement).closest<HTMLElement>('.eq-brain-tab-close')
        if (cl) { this.closeBrainTab(cl.dataset.tabId!) }
        else { this.brainActiveTab = tab.id; this.brainSelectedFolder = null; this.renderBrainExplorer(); this.renderBrainTabs(); this.renderBrainFileContent(tab.id) }
      })
      tabbar.appendChild(tabEl)
    }
  }

  private renderBrainFileContent(fileId: string): void {
    const contentEl = this.shadow.querySelector('#eq-brain-content') as HTMLElement | null
    if (!contentEl) return

    if (fileId.startsWith('img-')) {
      this.showImageFile(parseInt(fileId.slice(4), 10))
      return
    }

    const raw = this.getBrainFileText(fileId)
    const safeEsc = (s: string) => String(s ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    
    const isGlobal   = fileId === this.GLOBAL_ID
    const isMarkdown = fileId === 'rationale' || isGlobal
    const isJson     = fileId === 'actions' || fileId === 'exec-result'
    const lang       = isGlobal ? 'markdown' : isMarkdown ? 'markdown' : isJson ? 'json' : 'text'

    // Always wipe content first to avoid bleed from previous selection
    contentEl.innerHTML = ''

    const wrapper = document.createElement('div')
    wrapper.className = 'eq-brain-file-view'

    const header = document.createElement('div')
    header.className = 'eq-brain-file-header'
    header.innerHTML = `<span class="eq-brain-file-lang">${safeEsc(lang)}</span>`
    wrapper.appendChild(header)

    if (isMarkdown) {
      const md = document.createElement('div')
      md.className = 'eq-brain-markdown'
      try {
        md.innerHTML = this.renderMarkdown(raw || '(sem conteúdo)')
      } catch {
        md.textContent = raw || '(sem conteúdo)'
      }
      wrapper.appendChild(md)
    } else {
      const pre = document.createElement('pre')
      pre.className = 'eq-brain-code'
      const code = document.createElement('code')
      code.textContent = raw || '(sem conteúdo)'
      pre.appendChild(code)
      wrapper.appendChild(pre)
    }

    contentEl.appendChild(wrapper)
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
      const turboInfo = readyCount >= 3 ? `  TURBO` : ''
      this.keysBadgeEl.textContent = `${keys.length} chave${keys.length > 1 ? 's' : ''} (${readyCount} pronta${readyCount !== 1 ? 's' : ''})${turboInfo}`
      this.keysBadgeEl.className = `eq-key-badge ${readyCount >= 3 ? 'racing' : readyCount > 0 ? 'ready' : 'cooldown'}`
    }

    this.keysListEl.replaceChildren()

    // Garante que se o collapsible estiver visível, não haja restrição de altura
    const collapsible = this.shadow?.querySelector('#eq-keys-collapsible') as HTMLElement | null
    if (collapsible && collapsible.style.display !== 'none') {
      collapsible.style.maxHeight = 'none'
      collapsible.style.overflow = 'visible'
    }

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
        winBadge.textContent = ` ${wins} vitória${wins > 1 ? 's' : ''}`
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
          this.setStatus(` ${k.label || `Chave ${idx + 1}`}: Conexão com Google Gemini aprovada!`, 'success')
        } else {
          keyManager.markInvalid(k.key, res.message)
          this.setStatus(`️ ${k.label || `Chave ${idx + 1}`}: ${res.message}`, 'error')
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

      // Botão Excluir — sem restrição de mínimo de chaves
      const deleteBtn = document.createElement('button')
      deleteBtn.className = 'eq-icon-btn'
      deleteBtn.type = 'button'
      deleteBtn.title = 'Remover chave'
      deleteBtn.innerHTML = ICONS.trash
      deleteBtn.addEventListener('click', () => {
        if (confirm(`Remover permanentemente a ${k.label || `Chave ${idx + 1}`}?`)) {
          const res = keyManager.removeKey(k.id)
          if (res.ok) {
            const rawKeys = keyManager.exportRawKeys()
            this.callbacks.onSettingsChange({ apiKey: rawKeys[0] || '', apiKeys: rawKeys })
            this.setStatus(`Chave removida com sucesso.`, 'info')
            this.renderKeysList()
          } else {
            this.setStatus(res.message, 'warning')
          }
        }
      })

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

  private mountHost(): void {
    const attachTo = document.body || document.documentElement
    if (!attachTo) {
      const onReady = () => {
        const fallbackRoot = document.body || document.documentElement
        if (fallbackRoot && !this.host.isConnected) {
          fallbackRoot.appendChild(this.host)
        }
      }

      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', onReady, { once: true })
      } else {
        setTimeout(onReady, 0)
      }
      return
    }

    if (!this.host.isConnected) {
      attachTo.appendChild(this.host)
    }
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
      this.metricsHistoryList.innerHTML = '<div style="text-align:center;padding:24px 0;color:#444;font-size:11px;">Nenhuma questão respondida ainda.</div>'
      return
    }
    this.metricsHistoryList.innerHTML = ''
    const reversed = [...records].reverse()
    const maxDur = Math.max(...records.map(r => r.durationMs), 1)
    for (const rec of reversed) {
      const durSec = rec.durationMs / 1000
      const barPct = Math.round((rec.durationMs / maxDur) * 100)
      const isOk = rec.status === 'verified' || rec.status === 'answered'
      const isManual = rec.status === 'manual'
      const statusColor = isOk ? '#4ade80' : isManual ? '#fbbf24' : '#666'
      const statusLabel = isOk ? 'Injetado' : isManual ? 'Gabarito' : 'Pendente'
      const timeStr = new Date(rec.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      const modeStr = rec.mode ? rec.mode.replace(/_/g, ' ') : 'auto'
      const speedColor = durSec < 5 ? '#4ade80' : durSec < 15 ? '#fbbf24' : '#ef4444'

      const item = document.createElement('div')
      item.style.cssText = 'background:rgba(255,255,255,0.025);border:1px solid rgba(255,255,255,0.055);border-radius:7px;padding:9px 10px;margin-bottom:5px;cursor:default;transition:background 0.1s;'
      item.addEventListener('mouseenter', () => { item.style.background = 'rgba(255,255,255,0.045)' })
      item.addEventListener('mouseleave', () => { item.style.background = 'rgba(255,255,255,0.025)' })

      // Top row
      const topRow = document.createElement('div')
      topRow.style.cssText = 'display:flex;align-items:flex-start;gap:8px;margin-bottom:6px;'
      const indexBadge = document.createElement('div')
      indexBadge.style.cssText = 'flex-shrink:0;width:22px;height:22px;border-radius:5px;background:rgba(0,152,255,0.15);border:1px solid rgba(0,152,255,0.25);display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:800;color:#0098ff;'
      indexBadge.textContent = String(rec.questionIndex)
      const titleEl = document.createElement('div')
      titleEl.style.cssText = 'flex:1;font-size:10.5px;color:#ccc;font-weight:600;line-height:1.4;word-break:break-word;'
      titleEl.textContent = rec.questionTitle || ('Questão ' + rec.questionIndex)
      const durEl = document.createElement('div')
      durEl.style.cssText = 'flex-shrink:0;font-size:13px;font-weight:800;color:' + speedColor + ';font-family:monospace;font-variant-numeric:tabular-nums;'
      durEl.textContent = durSec < 60 ? (durSec.toFixed(1) + 's') : (Math.floor(durSec/60) + 'm' + String(Math.round(durSec%60)).padStart(2,'0') + 's')
      topRow.appendChild(indexBadge); topRow.appendChild(titleEl); topRow.appendChild(durEl)

      // Bar
      const barWrap = document.createElement('div')
      barWrap.style.cssText = 'height:2px;background:rgba(255,255,255,0.05);border-radius:1px;margin-bottom:6px;overflow:hidden;'
      const bar = document.createElement('div')
      bar.style.cssText = 'height:100%;width:' + barPct + '%;background:' + speedColor + ';border-radius:1px;transition:width 0.4s ease;'
      barWrap.appendChild(bar)

      // Meta row
      const metaRow = document.createElement('div')
      metaRow.style.cssText = 'display:flex;align-items:center;gap:6px;flex-wrap:wrap;'
      const mkChip = (text: string, col: string, alpha: string) => {
        const c = document.createElement('span')
        c.style.cssText = 'font-size:8.5px;font-weight:700;letter-spacing:0.04em;padding:1px 6px;border-radius:8px;background:rgba(' + alpha + ',0.12);color:' + col + ';'
        c.textContent = text; return c
      }
      metaRow.appendChild(mkChip(statusLabel, statusColor, isOk ? '74,222,128' : isManual ? '251,191,36' : '102,102,102'))
      metaRow.appendChild(mkChip(modeStr, '#888', '255,255,255'))
      if (rec.actionsCount) metaRow.appendChild(mkChip(rec.actionsCount + ' ação' + (rec.actionsCount > 1 ? 'ões' : ''), '#888', '255,255,255'))
      const timeChip = document.createElement('span')
      timeChip.style.cssText = 'font-size:8.5px;color:#444;margin-left:auto;'
      timeChip.textContent = timeStr
      metaRow.appendChild(timeChip)

      // Accordion collapse button icon
      const chevronIco = document.createElement('span')
      chevronIco.style.cssText = 'flex-shrink:0;display:inline-flex;color:#444;transition:transform 0.2s ease;margin-left:4px;'
      chevronIco.innerHTML = '<svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5z"/></svg>'
      topRow.appendChild(chevronIco)

      // Collapsible body
      const body = document.createElement('div')
      body.style.cssText = 'overflow:hidden;max-height:0;transition:max-height 0.22s ease;'
      body.appendChild(barWrap)
      body.appendChild(metaRow)

      // Click to expand (only one open at a time)
      let expanded = false
      const toggle = () => {
        expanded = !expanded
        if (expanded) {
          // Collapse all other open items
          this.metricsHistoryList?.querySelectorAll<HTMLElement>('.eq-mhist-body').forEach(b => {
            if (b !== body) {
              b.style.maxHeight = '0'
              const ic = b.parentElement?.querySelector<HTMLElement>('.eq-mhist-chevron')
              if (ic) ic.style.transform = ''
            }
          })
          body.style.maxHeight = body.scrollHeight + 40 + 'px'
          chevronIco.style.transform = 'rotate(180deg)'
        } else {
          body.style.maxHeight = '0'
          chevronIco.style.transform = ''
        }
      }
      body.className = 'eq-mhist-body'
      chevronIco.className = 'eq-mhist-chevron'
      topRow.style.cursor = 'pointer'
      topRow.addEventListener('click', toggle)

      item.appendChild(topRow)
      item.appendChild(body)
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
      this.showToast('Relatório copiado!', 'success', 2500)
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
