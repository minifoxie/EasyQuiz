import type { AnalysisPlan, EasyQuizSettings, ResponseMode, ExecutionEngine, ModelOption } from '../core/types'
import { AVAILABLE_MODELS, fetchAvailableModels, testApiKey } from '../core/gemini'
import { clearSessionMemories, resetAllData } from '../core/storage'
import { Autopilot } from '../dom/autopilot'
import { FloatingAnswersHud } from './floatingHud'
import { ICONS } from './icons'
import { PANEL_STYLES } from './styles'

export interface PanelCallbacks {
  onAnalyze: (attempt?: number) => Promise<AnalysisPlan | void>
  onApply: (attempt?: number) => void
  onDestroy: () => void
  onSettingsChange: (settings: Partial<EasyQuizSettings>) => void
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
  private activeTab: 'autopilot' | 'advanced' | 'inspector' | 'settings' = 'autopilot'
  private stopwatchInterval: any = null
  private stopwatchStartTime: number = 0
  private latestPlan: AnalysisPlan | null = null

  // Elementos do Layout
  private launcherBtn: HTMLButtonElement
  private launcherDot: HTMLElement
  private dockToggleBtn: HTMLButtonElement
  private sidebarEl: HTMLElement
  private apToggleBtn: HTMLButtonElement
  private apConsole: HTMLElement

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
        }
      },
      onRequestAnalysis: async (attempt?: number) => {
        try {
          const plan = await this.callbacks.onAnalyze(attempt)
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
            <button class="eq-activity-btn active" id="eq-tab-autopilot" role="tab" title="Autopilot (Automação Contínua)">
              <span class="eq-activity-indicator"></span>
              <span class="eq-activity-icon">${ICONS.rocket}</span>
            </button>

            <button class="eq-activity-btn" id="eq-tab-advanced" role="tab" title="Avançado (Modo Manual)">
              <span class="eq-activity-indicator"></span>
              <span class="eq-activity-icon">${ICONS.code}</span>
            </button>

            <button class="eq-activity-btn" id="eq-tab-inspector" role="tab" title="Inspetor de Prompt e IA">
              <span class="eq-activity-indicator"></span>
              <span class="eq-activity-icon">${ICONS.inspector}</span>
            </button>
          </div>

          <div class="eq-activity-bottom">
            <button class="eq-activity-btn" id="eq-tab-settings" role="tab" title="Configurações & Chaves">
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
              <span class="eq-brand-badge">2.0 SUPREME</span>
            </div>
            <div class="eq-header-tools">
              <button class="eq-icon-btn" id="eq-min-btn" type="button" title="Minimizar (Alt+Q)">${ICONS.chevronRight}</button>
              <button class="eq-icon-btn" id="eq-close-btn" type="button" title="Fechar">${ICONS.close}</button>
            </div>
          </header>

          <div class="eq-views-wrapper">
            <!-- TAB 1: AUTOPILOT -->
            <div class="eq-view-pane" id="eq-view-autopilot">
              <div style="display: flex; gap: 8px; width: 100%; align-items: center;">
                <button class="eq-btn-primary" id="eq-ap-toggle-btn" type="button" style="flex: 1;">
                  ${ICONS.play} INICIAR AUTOPILOT
                </button>
                <button class="eq-icon-btn" id="eq-ap-clear-memory" type="button" title="Limpar Memória Contextual (RAG)" style="width: 42px; height: 42px; background: #141414; border: 1px solid #282828; border-radius: 6px; color: #aaaaaa;">
                  ${ICONS.eraser}
                </button>
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

              <!-- Console Terminal -->
              <div class="eq-section-title">
                <span>Terminal de Operações</span>
                <div style="display: flex; align-items: center; gap: 6px;">
                  <button class="eq-icon-btn" id="eq-copy-console-btn" type="button" title="Copiar Todos os Logs do Terminal">
                    ${ICONS.copy}
                  </button>
                  <span style="font-size: 10px; color: #666;">Live Event Stream</span>
                </div>
              </div>
              <div class="eq-terminal" id="eq-ap-console">
                <div class="text-blue">> [SYS] EasyQuiz 2.0 Supreme inicializado.</div>
                <div class="text-muted">> [SYS] Conexão com a API do Google Gemini pronta.</div>
              </div>

              <div class="eq-footer-note">Híbrido 4.0 • RAG + AST + Vision (Opt-in)</div>
            </div>

            <!-- TAB 2: AVANÇADO -->
            <div class="eq-view-pane" id="eq-view-advanced" style="display: none;">
              <button class="eq-btn-primary" id="eq-analyze-btn" type="button">
                ${ICONS.analyze} Analisar & Resolver Questão
              </button>

              <!-- Status & Stopwatch Adv -->
              <div class="eq-status-card">
                <div class="eq-status-card-header">
                  <div class="eq-ai-indicator">
                    <span class="eq-dot-pulse" id="eq-dot-adv"></span>
                    <span>Processamento Manual</span>
                  </div>
                  <div class="eq-stopwatch" id="eq-stopwatch-adv">
                    ${ICONS.clock} <span>0.00s</span>
                  </div>
                </div>
                <div class="eq-status-text" id="eq-status-text-adv">
                  Clique em Analisar para inspecionar a questão atual na tela.
                </div>
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

              <div class="eq-grid-2">
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

              <!-- Painel de Resultados Manuais -->
              <div id="eq-result" style="display: none; flex-direction: column; gap: 10px;">
                <div class="eq-section-title">Plano Gerado</div>
                <div style="display: flex; gap: 6px; flex-wrap: wrap;" id="eq-badges"></div>

                <div class="eq-rationale-card" id="eq-rationale-text"></div>

                <div class="eq-action-list" id="eq-actions-list"></div>

                <button class="eq-btn-secondary" id="eq-apply-btn" type="button">
                  ${ICONS.apply} Injetar Resposta na Página
                </button>
                <button class="eq-btn-secondary" id="eq-open-hud-btn" type="button" style="background: rgba(0, 255, 204, 0.08); border-color: rgba(0, 255, 204, 0.3); color: #00ffcc;">
                  ${ICONS.list} Ver Gabarito Flutuante (Arrastável)
                </button>
              </div>

              <div class="eq-footer-note">Modo Manual • Controle Total dos Elementos</div>
            </div>

            <!-- TAB 3: INSPETOR IA -->
            <div class="eq-view-pane" id="eq-view-inspector" style="display: none;">
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
                  <span>Prompt Enviado para a IA</span>
                  <button class="eq-btn-secondary" id="eq-copy-prompt-btn" type="button" style="height: 26px; padding: 0 8px; font-size: 11px;">
                    ${ICONS.copy} Copiar
                  </button>
                </div>
                <div class="eq-code-block" id="eq-insp-prompt">Nenhuma consulta realizada ainda. Execute uma análise no Autopilot ou Avançado para inspecionar os dados enviados.</div>
              </div>

              <div class="eq-field-group">
                <div class="eq-section-title">Raciocínio Detalhado</div>
                <div class="eq-rationale-card" id="eq-insp-rationale">Aguardando resposta da IA...</div>
              </div>

              <div class="eq-field-group">
                <div class="eq-section-title">Comandos Gerados</div>
                <div class="eq-action-list" id="eq-insp-actions">
                  <div class="text-muted" style="padding: 6px;">Nenhuma ação no momento.</div>
                </div>
              </div>

              <div class="eq-footer-note">Inspetor em Tempo Real • 100% Transparente</div>
            </div>

            <!-- TAB 4: CONFIGURAÇÕES -->
            <div class="eq-view-pane" id="eq-view-settings" style="display: none;">
              <!-- Seção da Chave de API com Menu de 3 Pontinhos (⋮) -->
              <div class="eq-field-group">
                <div class="eq-section-title">
                  <span>Chave Gemini (Google AI Studio)</span>
                  <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" style="color: #00ffcc; text-decoration: none; font-size: 11px; font-weight: 700;">
                    Obter Grátis ↗
                  </a>
                </div>

                <div class="eq-key-input-container">
                  <div class="eq-input-wrap">
                    <span class="eq-input-prefix-icon">${ICONS.key}</span>
                    <input id="eq-api-key" class="eq-input" type="password" placeholder="Cole sua chave AIzaSy..." autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" />
                    <button class="eq-icon-btn" id="eq-key-save" type="button" title="Salvar Chave">${ICONS.save}</button>
                    <button class="eq-icon-btn" id="eq-key-more-btn" type="button" title="Mais Opções da Chave">${ICONS.moreVertical}</button>
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
                      <span class="eq-item-text" id="eq-menu-vis-text">Mostrar Chave</span>
                    </button>
                    <button class="eq-context-item" id="eq-menu-clear" type="button">
                      <span class="eq-item-icon">${ICONS.eraser}</span>
                      <span class="eq-item-text">Limpar Campo</span>
                    </button>
                    <div class="eq-context-divider"></div>
                    <button class="eq-context-item" id="eq-menu-test" type="button">
                      <span class="eq-item-icon">${ICONS.key}</span>
                      <span class="eq-item-text">Testar Conexão no Google</span>
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

              <!-- Preferências do Sistema -->
              <div class="eq-field-group" style="gap: 8px; margin-top: 4px;">
                <label class="eq-checkbox-label">
                  <input id="eq-use-vision" type="checkbox" />
                  <span>Visão Computacional (Imagens)</span>
                </label>
                <div style="font-size: 11px; color: #888888; margin-left: 24px; line-height: 1.3;">
                  Desativado por padrão: O EasyQuiz analisa o DOM estruturado diretamente, respondendo ultrarrápido sem gastar cota com capturas de tela.
                </div>

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

              <div class="eq-footer-note">Configurações salvas localmente no navegador</div>
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

    // Status & Stopwatch
    this.dotPulseAp = this.shadow.querySelector('#eq-dot-ap') as HTMLElement
    this.statusTextAp = this.shadow.querySelector('#eq-status-text-ap') as HTMLElement
    this.stopwatchAp = this.shadow.querySelector('#eq-stopwatch-ap span') as HTMLElement
    this.dotPulseAdv = this.shadow.querySelector('#eq-dot-adv') as HTMLElement
    this.statusTextAdv = this.shadow.querySelector('#eq-status-text-adv') as HTMLElement
    this.stopwatchAdv = this.shadow.querySelector('#eq-stopwatch-adv span') as HTMLElement

    // Inspetor
    this.inspModel = this.shadow.querySelector('#eq-insp-model') as HTMLElement
    this.inspLatency = this.shadow.querySelector('#eq-insp-latency') as HTMLElement
    this.inspTokens = this.shadow.querySelector('#eq-insp-tokens') as HTMLElement
    this.inspPrompt = this.shadow.querySelector('#eq-insp-prompt') as HTMLElement
    this.inspRationale = this.shadow.querySelector('#eq-insp-rationale') as HTMLElement
    this.inspActions = this.shadow.querySelector('#eq-insp-actions') as HTMLElement
    this.copyPromptBtn = this.shadow.querySelector('#eq-copy-prompt-btn') as HTMLButtonElement

    // Controles de Formulário e Chave
    this.apiKeyInput = this.shadow.querySelector('#eq-api-key') as HTMLInputElement
    this.keyContextMenu = this.shadow.querySelector('#eq-key-context-menu') as HTMLElement
    this.keyMoreBtn = this.shadow.querySelector('#eq-key-more-btn') as HTMLButtonElement
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
    AVAILABLE_MODELS.forEach((m) => this.modelSelect.add(new Option(m.name, m.id, false, m.id === initialSettings.model)))
    RESPONSE_MODE_LABELS.forEach((m) => this.modeSelect.add(new Option(m.label, m.value, false, m.value === initialSettings.modeHint)))
    ENGINE_LABELS.forEach((m) => this.engineSelect.add(new Option(m.label, m.value, false, m.value === initialSettings.engine)))

    // Inicializar Valores
    this.apiKeyInput.value = initialSettings.apiKey
    this.dryRunCheckbox.checked = initialSettings.dryRun
    this.autoApplyCheckbox.checked = initialSettings.autoApply
    this.autoAdvanceCheckbox.checked = initialSettings.autoAdvance
    this.hostDarkModeCheckbox.checked = initialSettings.hostDarkMode
    this.useVisionCheckbox.checked = initialSettings.useVision

    this.setupEventListeners()
    document.body.appendChild(this.host)
    this.applyHostDarkMode(initialSettings.hostDarkMode)

    // Se chave existir, listar modelos da conta do usuário
    if (initialSettings.apiKey) {
      fetchAvailableModels(initialSettings.apiKey)
        .then((models) => {
          if (models && models.length > 0) {
            this.updateModelSelect(models, initialSettings.model)
          }
        })
        .catch(() => {})
    }
  }

  private switchTab(tab: 'autopilot' | 'advanced' | 'inspector' | 'settings') {
    this.activeTab = tab
    const tabs: Array<'autopilot' | 'advanced' | 'inspector' | 'settings'> = [
      'autopilot',
      'advanced',
      'inspector',
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

    if (tab === 'autopilot') {
      this.callbacks.onSettingsChange({ autoApply: true, autoAdvance: true })
    }
  }

  private setupEventListeners(): void {
    // Abas do Activity Bar Vertical
    this.shadow.querySelector('#eq-tab-autopilot')?.addEventListener('click', () => this.switchTab('autopilot'))
    this.shadow.querySelector('#eq-tab-advanced')?.addEventListener('click', () => this.switchTab('advanced'))
    this.shadow.querySelector('#eq-tab-inspector')?.addEventListener('click', () => this.switchTab('inspector'))
    this.shadow.querySelector('#eq-tab-settings')?.addEventListener('click', () => this.switchTab('settings'))

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

    // Botão Salvar Direto da Chave
    const saveKeyBtn = this.shadow.querySelector('#eq-key-save') as HTMLButtonElement
    saveKeyBtn.addEventListener('click', () => {
      const cleanVal = this.apiKeyInput.value.trim().replace(/^["']|["']$/g, '')
      this.apiKeyInput.value = cleanVal
      this.callbacks.onSettingsChange({ apiKey: cleanVal })
      this.setStatus('Chave Gemini salva com sucesso!', 'success')
      this.keyContextMenu.hidden = true
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
      const current = this.apiKeyInput.value.trim()
      const entered = window.prompt('Cole sua Chave API do Google Gemini (AI Studio):', current)
      if (entered !== null) {
        const clean = entered.trim().replace(/^["']|["']$/g, '')
        this.apiKeyInput.value = clean
        this.callbacks.onSettingsChange({ apiKey: clean })
        this.setStatus('Chave Gemini inserida e salva com sucesso!', 'success')
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
          this.callbacks.onSettingsChange({ apiKey: clean })
          this.setStatus('Chave colada e salva com sucesso!', 'success')
        }
      } catch {
        const current = this.apiKeyInput.value.trim()
        const entered = window.prompt('Cole sua Chave API do Google Gemini (AI Studio):', current)
        if (entered !== null) {
          const clean = entered.trim().replace(/^["']|["']$/g, '')
          this.apiKeyInput.value = clean
          this.callbacks.onSettingsChange({ apiKey: clean })
          this.setStatus('Chave Gemini inserida e salva com sucesso!', 'success')
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
      if (textEl) textEl.textContent = isPass ? 'Ocultar Chave' : 'Mostrar Chave'
    })

    // 4. Limpar Campo
    this.shadow.querySelector('#eq-menu-clear')?.addEventListener('click', () => {
      this.keyContextMenu.hidden = true
      this.apiKeyInput.value = ''
      this.callbacks.onSettingsChange({ apiKey: '' })
      this.setStatus('Campo limpo. Cole a nova chave e clique em Salvar.', 'info')
      this.apiKeyInput.focus()
    })

    // 5. Testar Conexão Google
    this.shadow.querySelector('#eq-menu-test')?.addEventListener('click', async () => {
      this.keyContextMenu.hidden = true
      const key = this.apiKeyInput.value.trim().replace(/^["']|["']$/g, '')
      if (!key) return this.setStatus('Insira ou cole a chave de API.', 'error')

      this.setStatus('Testando chave e descobrindo modelos autorizados...', 'info')
      try {
        const res = await testApiKey(key)
        this.setStatus(res.message, res.ok ? 'success' : 'error')
        if (res.ok && res.models && res.models.length > 0) {
          this.updateModelSelect(res.models)
        }
      } catch (e) {
        this.setStatus('Erro ao validar chave: ' + (e as Error).message, 'error')
      }
    })

    // 6. Resetar Todos os Dados
    const handleResetAll = () => {
      this.keyContextMenu.hidden = true
      const confirmed = window.confirm('Deseja realmente resetar todos os dados, chaves e memória de sessão do EasyQuiz?')
      if (confirmed) {
        resetAllData()
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
        this.apToggleBtn.innerHTML = `${ICONS.play} INICIAR AUTOPILOT`
        this.apToggleBtn.classList.remove('danger')
        this.stopStopwatch()
        this.setStatus('Autopilot pausado pelo usuário.', 'info')
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
        this.apToggleBtn.innerHTML = `${ICONS.stop} PARAR AUTOPILOT`
        this.apToggleBtn.classList.add('danger')
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

    // Copiar Logs do Terminal
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

    this.analyzeBtn.addEventListener('click', () => this.callbacks.onAnalyze())
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

  private logToConsole(message: string, colorClass?: string) {
    if (!this.apConsole) return
    const entry = document.createElement('div')
    entry.textContent = message
    if (colorClass) entry.className = colorClass
    this.apConsole.appendChild(entry)
    this.apConsole.scrollTop = this.apConsole.scrollHeight
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

  public setBusy(busy: boolean, message?: string): void {
    this.analyzeBtn.disabled = busy
    ;[this.modelSelect, this.modeSelect, this.engineSelect, this.dryRunCheckbox, this.autoApplyCheckbox, this.autoAdvanceCheckbox, this.useVisionCheckbox].forEach(
      (e) => ((e as any).disabled = busy),
    )

    if (busy) {
      this.startStopwatch()
      this.dotPulseAp.className = 'eq-dot-pulse busy'
      this.dotPulseAdv.className = 'eq-dot-pulse busy'
      this.launcherDot.className = 'eq-launcher-dot busy'
      if (message) this.setStatus(message, 'info')
    } else {
      this.stopStopwatch()
      this.dotPulseAp.className = 'eq-dot-pulse'
      this.dotPulseAdv.className = 'eq-dot-pulse'
      this.launcherDot.className = 'eq-launcher-dot'
    }
  }

  public setStatus(message: string, type: 'info' | 'success' | 'error' = 'info'): void {
    this.statusTextAp.textContent = message
    this.statusTextAdv.textContent = message

    if (type === 'error') {
      this.dotPulseAp.className = 'eq-dot-pulse error'
      this.dotPulseAdv.className = 'eq-dot-pulse error'
      this.launcherDot.className = 'eq-launcher-dot error'
    } else if (type === 'success') {
      this.dotPulseAp.className = 'eq-dot-pulse'
      this.dotPulseAdv.className = 'eq-dot-pulse'
      this.launcherDot.className = 'eq-launcher-dot'
    }

    const isFallback = message.includes('Alternando') || message.includes('indisponível') || message.includes('fallback') || message.includes('alternativo')
    const prefix = type === 'error' ? '> [ERRO] ' : type === 'success' ? '> [SUCESSO] ' : isFallback ? '> [FALLBACK] ' : '> [SYS] '
    const color = type === 'error' ? 'text-red' : type === 'success' ? 'text-green' : isFallback ? 'text-yellow' : 'text-blue'
    this.logToConsole(`${prefix}${message}`, color)
  }

  public setPlan(plan: AnalysisPlan, canApply: boolean): void {
    this.latestPlan = plan
    this.resultContainer.style.display = 'flex'

    if (plan.durationMs) {
      this.stopStopwatch(plan.durationMs)
    }

    // Atualiza Badges do Avançado
    const badgesEl = this.shadow.querySelector('#eq-badges') as HTMLElement
    badgesEl.innerHTML = `
      <span class="eq-brand-badge">${plan.mode.replace('_', ' ')}</span>
      <span class="eq-brand-badge" style="color: #00ff55; border-color: rgba(0, 255, 85, 0.4);">${Math.round(plan.confidence * 100)}% Confiança</span>
      <span class="eq-brand-badge">${plan.actions.length} Cmds</span>
      ${plan.usedModel ? `<span class="eq-brand-badge" style="border-color: rgba(91, 192, 235, 0.5); color: #5bc0eb;">${plan.usedModel}</span>` : ''}
    `

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

      item.innerHTML = `<span class="eq-action-badge">${act.t.toUpperCase()}</span> <span>${desc}</span>`
      actionsListEl.appendChild(item)
    }

    this.applyBtn.disabled = !canApply || !plan.actions.length

    // Atualiza Inspetor de IA
    this.inspModel.textContent = plan.usedModel || this.initialSettings.model
    this.inspLatency.textContent = plan.durationMs ? `${plan.durationMs}ms` : '--'
    this.inspTokens.textContent = plan.tokensUsed ? `${plan.tokensUsed}` : '--'
    this.inspPrompt.textContent = plan.promptSent || 'Prompt não registrado para esta requisição.'
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

  public isFloatingAnswersOpen(): boolean {
    return this.floatingAnswers.isOpen()
  }

  public updateModelSelect(models: ModelOption[], selectedId?: string): void {
    const targetId = selectedId || this.initialSettings.model || this.modelSelect.value
    this.modelSelect.innerHTML = ''
    let matched = false
    models.forEach((m) => {
      const isSelected = m.id === targetId
      if (isSelected) matched = true
      this.modelSelect.add(new Option(m.name, m.id, false, isSelected))
    })
    if (!matched && targetId) {
      this.modelSelect.add(new Option(`Gemini (${targetId})`, targetId, false, true))
    }
    this.modelSelect.value = targetId
  }

  public updateSelectedModel(modelId: string): void {
    const exists = Array.from(this.modelSelect.options).some((opt) => opt.value === modelId)
    if (!exists) {
      this.modelSelect.add(new Option(`Gemini (${modelId})`, modelId, false, true))
    }
    this.modelSelect.value = modelId
  }

  private applyHostDarkMode(enable: boolean) {
    const STYLE_ID = 'eq-host-dark-mode-style'
    let styleEl = document.getElementById(STYLE_ID)

    if (enable) {
      let bg = window.getComputedStyle(document.body).backgroundColor
      if (bg.includes('rgba(0, 0, 0, 0)') || bg === 'transparent') {
        bg = window.getComputedStyle(document.documentElement).backgroundColor
      }

      const rgba = bg.match(/\d+(\.\d+)?/g)
      if (rgba && rgba.length >= 3) {
        const a = rgba[3] !== undefined ? parseFloat(rgba[3]) : 1
        if (a > 0.1) {
          const r = parseInt(rgba[0]),
            g = parseInt(rgba[1]),
            b = parseInt(rgba[2])
          const brightness = (r * 299 + g * 587 + b * 114) / 1000
          if (brightness < 100) {
            return
          }
        }
      }

      if (!styleEl) {
        styleEl = document.createElement('style')
        styleEl.id = STYLE_ID
        styleEl.innerHTML = `
          html { filter: invert(1) hue-rotate(180deg) !important; background: #fff !important; }
          img, video, canvas, [style*="background-image"] { filter: invert(1) hue-rotate(180deg) !important; }
        `
        document.head.appendChild(styleEl)
      }
      this.host.classList.add('eq-dark-mode-active')
    } else {
      this.host.classList.remove('eq-dark-mode-active')
      if (styleEl) styleEl.remove()
    }
  }

  public destroy(): void {
    this.stopStopwatch()
    this.autopilot.stop()
    this.applyHostDarkMode(false)
    this.callbacks.onDestroy()
    this.host.remove()
  }
}
