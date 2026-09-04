import type { AnalysisPlan, EasyQuizSettings, ResponseMode, ExecutionEngine } from '../core/types'
import { AVAILABLE_MODELS, testApiKey } from '../core/gemini'
import { clearSessionMemories } from '../core/storage'
import { Autopilot, type AutopilotStatus } from '../dom/autopilot'
import { ICONS } from './icons'
import { PANEL_STYLES } from './styles'

export interface PanelCallbacks {
  onAnalyze: () => Promise<AnalysisPlan | void>
  onApply: () => void
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
  private initialSettings: EasyQuizSettings

  private launcherBtn: HTMLButtonElement
  private panelEl: HTMLElement
  private statusBox: HTMLElement
  private resultContainer: HTMLElement
  private apiKeyInput: HTMLInputElement
  private testKeyBtn: HTMLButtonElement
  private modelSelect: HTMLSelectElement
  private modeSelect: HTMLSelectElement
  private engineSelect: HTMLSelectElement
  private dryRunCheckbox: HTMLInputElement
  private autoApplyCheckbox: HTMLInputElement
  private autoAdvanceCheckbox: HTMLInputElement
  private hostDarkModeCheckbox: HTMLInputElement
  private analyzeBtn: HTMLButtonElement
  private applyBtn: HTMLButtonElement

  // novos binds
  private tabEasyBtn: HTMLButtonElement
  private tabAdvBtn: HTMLButtonElement
  private contentEasy: HTMLElement
  private contentAdv: HTMLElement
  private apToggleBtn: HTMLButtonElement
  private apConsole: HTMLElement

  constructor(initialSettings: EasyQuizSettings, callbacks: PanelCallbacks) {
    this.initialSettings = initialSettings
    this.callbacks = callbacks
    this.autopilot = new Autopilot({
      onStatusChange: (status, msg, colorClass) => {
        if (this.apConsole) {
          const entry = document.createElement('div')
          entry.textContent = msg
          if (colorClass) entry.classList.add(colorClass)
          this.apConsole.appendChild(entry)
          this.apConsole.scrollTop = this.apConsole.scrollHeight
        }
        if (status === 'analyzing') {
          this.setBusy(true, 'Autopilot: IA analisando...')
        } else if (status === 'advancing' || status === 'waiting') {
          this.setBusy(false)
        }
      },
      onRequestAnalysis: async () => {
        try {
          const plan = await this.callbacks.onAnalyze() // O index.ts deve retornar o plan
          return plan || null
        } catch (e) {
          return null
        }
      }
    })

    this.host = document.createElement('div')
    this.host.id = 'easyquiz-shadow-root'
    
    // Blindagem extrema do host para evitar que CSS de sites como Khan Academy destrua a visibilidade
    this.host.style.position = 'fixed'
    this.host.style.top = '0'
    this.host.style.left = '0'
    this.host.style.width = '100vw'
    this.host.style.height = '100vh'
    this.host.style.zIndex = '2147483647'
    this.host.style.pointerEvents = 'none' // Deixa os cliques passarem pro site

    this.shadow = this.host.attachShadow({ mode: 'open' })

    this.shadow.innerHTML = `
      <style>${PANEL_STYLES}</style>
      <button class="eq-launcher" type="button" title="Abrir EasyQuiz (Alt+Q)">
        ${ICONS.logo}
        <span>EQ</span>
      </button>

      <section class="eq-panel" hidden aria-label="EasyQuiz">
        <header class="eq-header">
          <div class="eq-brand">
            ${ICONS.logo}
            <span>EasyQuiz</span>
            <span class="eq-brand-badge">2.0 SUPREME</span>
          </div>
          <div class="eq-header-tools">
            <button class="eq-icon-btn" id="eq-min-btn" type="button" title="Minimizar">${ICONS.minimize}</button>
            <button class="eq-icon-btn" id="eq-close-btn" type="button" title="Fechar">${ICONS.close}</button>
          </div>
        </header>
        
        <div class="eq-tabs">
          <button class="eq-tab-btn" id="eq-tab-easy">Modo Fácil (Autopilot)</button>
          <button class="eq-tab-btn" id="eq-tab-advanced">Avançado</button>
        </div>

        <!-- MODO FÁCIL -->
        <div class="eq-content" id="eq-content-easy" style="display: none;">
          <div class="eq-autopilot-container">
            <div style="display: flex; gap: 8px;">
              <button class="eq-btn-primary eq-pulse" id="eq-ap-toggle-btn" type="button" style="flex: 1;">
                INICIAR AUTOPILOT
              </button>
              <button class="eq-btn-secondary" id="eq-ap-clear-memory" type="button" title="Limpar Memória de Sessão">
                🧠 Limpar
              </button>
            </div>
            <div class="eq-ap-console" id="eq-ap-console">
              > [SYS] Pronto para ligar...
            </div>
          </div>
          <div class="eq-footer-note">Híbrido 4.0 • RAG + Brute Force + AI</div>
        </div>

        <!-- MODO AVANÇADO -->
        <div class="eq-content" id="eq-content-advanced" style="display: none;">
          <div class="eq-field-group">
            <div class="eq-section-title">
              <span>Chave Gemini (API Key)</span>
              <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" class="eq-link">
                Obter Grátis
              </a>
            </div>
            <div class="eq-input-wrap">
              <input id="eq-api-key" class="eq-input" type="password" placeholder="Cole sua chave AIzaSy..." autocomplete="off" spellcheck="false" />
              <button class="eq-input-action-btn" id="eq-test-key-btn" type="button">${ICONS.key} Testar</button>
            </div>
          </div>

          <div class="eq-row-2">
            <div class="eq-field-group">
              <div class="eq-section-title">Motor de Inteligência</div>
              <select id="eq-model-select" class="eq-select"></select>
            </div>
            <div class="eq-field-group">
              <div class="eq-section-title">Motor de Execução</div>
              <select id="eq-engine-select" class="eq-select"></select>
            </div>
          </div>

          <div class="eq-field-group">
            <div class="eq-section-title">Modo da Questão (Forçar)</div>
            <select id="eq-mode-select" class="eq-select"></select>
          </div>

          <div class="eq-row-2">
            <label class="eq-checkbox-label">
              <input id="eq-dry-run" type="checkbox" />
              <span>Apenas Simular</span>
            </label>
            <label class="eq-checkbox-label">
              <input id="eq-auto-apply" type="checkbox" />
              <span>Auto Aplicar</span>
            </label>
            <label class="eq-checkbox-label" style="grid-column: span 2;">
              <input id="eq-auto-advance" type="checkbox" />
              <span>Auto Avançar para Próxima Questão</span>
            </label>
            <label class="eq-checkbox-label" style="grid-column: span 2;">
              <input id="eq-host-dark" type="checkbox" />
              <span style="color:#00ffcc;">Habilitar Smart Dark Mode no Site</span>
            </label>
          </div>

          <button class="eq-btn-primary" id="eq-analyze-btn" type="button">
            ${ICONS.analyze} Analisar & Resolver Questão
          </button>

          <div class="eq-status-box" id="eq-status">
            Sistema Operante. Aponte para a questão ou inicie a análise.
          </div>

          <div class="eq-result-container" id="eq-result" style="display: none;">
            <div class="eq-result-header">
              <div class="eq-badges" id="eq-badges"></div>
            </div>
            <div class="eq-rationale-box">
              <div class="eq-rationale-title">Justificativa</div>
              <div id="eq-rationale-text"></div>
            </div>
            <div class="eq-actions-summary">
              <div class="eq-rationale-title">Ações do Motor Híbrido</div>
              <div id="eq-actions-list"></div>
            </div>
            <button class="eq-btn-secondary" id="eq-apply-btn" type="button">
              ${ICONS.apply} Injetar Respostas na Página
            </button>
          </div>
          <div class="eq-footer-note">EQ Engine v2.0 • 100% Client-Side</div>
        </div>
      </section>
    `

    this.tabEasyBtn = this.shadow.querySelector('#eq-tab-easy') as HTMLButtonElement
    this.tabAdvBtn = this.shadow.querySelector('#eq-tab-advanced') as HTMLButtonElement
    this.contentEasy = this.shadow.querySelector('#eq-content-easy') as HTMLElement
    this.contentAdv = this.shadow.querySelector('#eq-content-advanced') as HTMLElement
    this.apToggleBtn = this.shadow.querySelector('#eq-ap-toggle-btn') as HTMLButtonElement
    this.apConsole = this.shadow.querySelector('#eq-ap-console') as HTMLElement

    this.launcherBtn = this.shadow.querySelector('.eq-launcher') as HTMLButtonElement
    this.panelEl = this.shadow.querySelector('.eq-panel') as HTMLElement
    this.statusBox = this.shadow.querySelector('#eq-status') as HTMLElement
    this.resultContainer = this.shadow.querySelector('#eq-result') as HTMLElement
    this.apiKeyInput = this.shadow.querySelector('#eq-api-key') as HTMLInputElement
    this.testKeyBtn = this.shadow.querySelector('#eq-test-key-btn') as HTMLButtonElement
    this.modelSelect = this.shadow.querySelector('#eq-model-select') as HTMLSelectElement
    this.modeSelect = this.shadow.querySelector('#eq-mode-select') as HTMLSelectElement
    this.engineSelect = this.shadow.querySelector('#eq-engine-select') as HTMLSelectElement
    this.dryRunCheckbox = this.shadow.querySelector('#eq-dry-run') as HTMLInputElement
    this.autoApplyCheckbox = this.shadow.querySelector('#eq-auto-apply') as HTMLInputElement
    this.autoAdvanceCheckbox = this.shadow.querySelector('#eq-auto-advance') as HTMLInputElement
    this.hostDarkModeCheckbox = this.shadow.querySelector('#eq-host-dark') as HTMLInputElement
    this.analyzeBtn = this.shadow.querySelector('#eq-analyze-btn') as HTMLButtonElement
    this.applyBtn = this.shadow.querySelector('#eq-apply-btn') as HTMLButtonElement

    AVAILABLE_MODELS.forEach(m => this.modelSelect.add(new Option(m.name, m.id, false, m.id === initialSettings.model)))
    RESPONSE_MODE_LABELS.forEach(m => this.modeSelect.add(new Option(m.label, m.value, false, m.value === initialSettings.modeHint)))
    ENGINE_LABELS.forEach(m => this.engineSelect.add(new Option(m.label, m.value, false, m.value === initialSettings.engine)))

    this.apiKeyInput.value = initialSettings.apiKey
    this.dryRunCheckbox.checked = initialSettings.dryRun
    this.autoApplyCheckbox.checked = initialSettings.autoApply
    this.autoAdvanceCheckbox.checked = initialSettings.autoAdvance
    this.hostDarkModeCheckbox.checked = initialSettings.hostDarkMode

    this.setupEventListeners()
    document.body.appendChild(this.host)
    this.applyHostDarkMode(initialSettings.hostDarkMode)
    this.switchMode(initialSettings.uiMode)

    // Tornar painel e launcher arrastáveis
    this.makeDraggable(this.panelEl, this.shadow.querySelector('.eq-header') as HTMLElement)
    this.makeDraggable(this.launcherBtn, this.launcherBtn)
  }

  private switchMode(mode: 'easy' | 'advanced') {
    this.callbacks.onSettingsChange({ uiMode: mode })
    if (mode === 'easy') {
      this.tabEasyBtn.classList.add('active')
      this.tabAdvBtn.classList.remove('active')
      this.contentEasy.style.display = 'block'
      this.contentAdv.style.display = 'none'
      // No modo fácil, forçar auto apply e advance
      this.initialSettings.autoApply = true
      this.initialSettings.autoAdvance = true
      this.callbacks.onSettingsChange({ autoApply: true, autoAdvance: true })
    } else {
      this.autopilot.stop()
      this.apToggleBtn.textContent = 'INICIAR AUTOPILOT'
      this.apToggleBtn.classList.remove('active')
      
      this.tabEasyBtn.classList.remove('active')
      this.tabAdvBtn.classList.add('active')
      this.contentEasy.style.display = 'none'
      this.contentAdv.style.display = 'block'
    }
  }

  private setupEventListeners(): void {
    this.tabEasyBtn.addEventListener('click', () => this.switchMode('easy'))
    this.tabAdvBtn.addEventListener('click', () => this.switchMode('advanced'))

    this.apToggleBtn.addEventListener('click', () => {
      if (this.autopilot.isActive()) {
        this.autopilot.stop()
        this.apToggleBtn.textContent = 'INICIAR AUTOPILOT'
        this.apToggleBtn.classList.remove('active')
      } else {
        if (!this.apiKeyInput.value.trim()) {
           this.apConsole.innerHTML = '<span style="color:#ff6b6b">> [ERRO] Chave API requerida no Modo Avançado!</span>'
           return
        }
        this.autopilot.start()
        this.apToggleBtn.textContent = 'PARAR AUTOPILOT'
        this.apToggleBtn.classList.add('active')
      }
    })

    const clearMemoryBtn = this.shadow.querySelector('#eq-ap-clear-memory') as HTMLButtonElement
    clearMemoryBtn.addEventListener('click', () => {
      clearSessionMemories()
      this.apConsole.innerHTML = '<span style="color:#00ff55">> [SYS] Memória de sessão limpa com sucesso.</span>'
    })

    this.launcherBtn.addEventListener('click', () => this.toggle())
    this.shadow.querySelector('#eq-min-btn')?.addEventListener('click', () => this.toggle(false))
    this.shadow.querySelector('#eq-close-btn')?.addEventListener('click', () => this.toggle(false))

    this.apiKeyInput.addEventListener('input', () => this.callbacks.onSettingsChange({ apiKey: this.apiKeyInput.value.trim() }))
    this.modelSelect.addEventListener('change', () => this.callbacks.onSettingsChange({ model: this.modelSelect.value }))
    this.modeSelect.addEventListener('change', () => this.callbacks.onSettingsChange({ modeHint: this.modeSelect.value as any }))
    this.engineSelect.addEventListener('change', () => this.callbacks.onSettingsChange({ engine: this.engineSelect.value as any }))
    
    this.dryRunCheckbox.addEventListener('change', () => this.callbacks.onSettingsChange({ dryRun: this.dryRunCheckbox.checked }))
    this.autoApplyCheckbox.addEventListener('change', () => this.callbacks.onSettingsChange({ autoApply: this.autoApplyCheckbox.checked }))
    this.autoAdvanceCheckbox.addEventListener('change', () => this.callbacks.onSettingsChange({ autoAdvance: this.autoAdvanceCheckbox.checked }))
    
    this.hostDarkModeCheckbox.addEventListener('change', () => {
      const v = this.hostDarkModeCheckbox.checked
      this.callbacks.onSettingsChange({ hostDarkMode: v })
      this.applyHostDarkMode(v)
    })

    this.testKeyBtn.addEventListener('click', async () => {
      const key = this.apiKeyInput.value.trim()
      if (!key) return this.setStatus('Informe a chave de API.', 'error')
      this.setStatus('Testando 3.8 Flash...', 'info')
      this.testKeyBtn.disabled = true
      try {
        const res = await testApiKey(key)
        this.setStatus(res.message, res.ok ? 'success' : 'error')
      } finally {
        this.testKeyBtn.disabled = false
      }
    })

    this.analyzeBtn.addEventListener('click', () => this.callbacks.onAnalyze())
    this.applyBtn.addEventListener('click', () => this.callbacks.onApply())
  }

  private applyHostDarkMode(enable: boolean) {
    const STYLE_ID = 'eq-host-dark-mode-style'
    let styleEl = document.getElementById(STYLE_ID)
    
    if (enable) {
      // Prevenção: verifica se a página já é escura nativamente
      let bg = window.getComputedStyle(document.body).backgroundColor
      if (bg.includes('rgba(0, 0, 0, 0)') || bg === 'transparent') {
        bg = window.getComputedStyle(document.documentElement).backgroundColor
      }
      
      const rgba = bg.match(/\d+(\.\d+)?/g)
      if (rgba && rgba.length >= 3) {
        const a = rgba[3] !== undefined ? parseFloat(rgba[3]) : 1
        // Se a opacidade for muito baixa (transparente), o fundo real visível é branco (padrão navegador)
        if (a > 0.1) {
          const r = parseInt(rgba[0]), g = parseInt(rgba[1]), b = parseInt(rgba[2])
          const brightness = (r * 299 + g * 587 + b * 114) / 1000
          if (brightness < 100) {
            console.log('[EasyQuiz] Fundo escuro detectado (Brightness: '+brightness+'). Smart Dark Mode preventivamente suspenso.')
            return // Não inverte se já for escuro
          }
        }
      }

      if (!styleEl) {
        styleEl = document.createElement('style')
        styleEl.id = STYLE_ID
        // Inverte html, desinverte imagens
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

  private makeDraggable(element: HTMLElement, handle: HTMLElement) {
    let isDragging = false
    let startX = 0, startY = 0, initialX = 0, initialY = 0

    handle.style.cursor = 'grab'
    
    handle.addEventListener('mousedown', (e) => {
      // Não inicia se clicou em um botão
      if ((e.target as HTMLElement).closest('button')) return
      isDragging = true
      handle.style.cursor = 'grabbing'
      startX = e.clientX
      startY = e.clientY
      
      const rect = element.getBoundingClientRect()
      // Pegar as posições baseadas no que está renderizado
      initialX = rect.left
      initialY = rect.top
      
      // Remove right/bottom para usar apenas left/top
      element.style.right = 'auto'
      element.style.bottom = 'auto'
      element.style.left = initialX + 'px'
      element.style.top = initialY + 'px'
      e.preventDefault()
    })

    document.addEventListener('mousemove', (e) => {
      if (!isDragging) return
      const dx = e.clientX - startX
      const dy = e.clientY - startY
      element.style.left = (initialX + dx) + 'px'
      element.style.top = (initialY + dy) + 'px'
    })

    document.addEventListener('mouseup', () => {
      if (isDragging) {
        isDragging = false
        handle.style.cursor = 'grab'
      }
    })
  }

  public toggle(force?: boolean): void {
    const isHidden = force !== undefined ? !force : !this.panelEl.hidden
    this.panelEl.hidden = isHidden
    if (!isHidden && !this.apiKeyInput.value) this.apiKeyInput.focus()
  }

  public setBusy(busy: boolean, message?: string): void {
    this.analyzeBtn.disabled = busy
    ;[this.modelSelect, this.modeSelect, this.engineSelect, this.dryRunCheckbox, this.autoApplyCheckbox, this.autoAdvanceCheckbox].forEach(e => (e as any).disabled = busy)
    if (message) this.setStatus(message, 'info')
  }

  public setStatus(message: string, type: 'info' | 'success' | 'error' = 'info'): void {
    this.statusBox.textContent = message
    this.statusBox.className = `eq-status-box ${type}`
  }

  public setPlan(plan: AnalysisPlan, canApply: boolean): void {
    this.resultContainer.style.display = 'flex'
    
    const badgesEl = this.shadow.querySelector('#eq-badges') as HTMLElement
    badgesEl.innerHTML = `
      <span class="eq-badge highlight">${plan.mode.replace('_', ' ')}</span>
      <span class="eq-badge ${plan.confidence >= 0.8 ? 'success' : ''}">${Math.round(plan.confidence * 100)}% Confiança</span>
      <span class="eq-badge">${plan.actions.length} Cmds</span>
      ${plan.usedModel ? `<span class="eq-badge" style="border-color: #5bc0eb; color: #5bc0eb;">${plan.usedModel}</span>` : ''}
    `

    const rationaleEl = this.shadow.querySelector('#eq-rationale-text') as HTMLElement
    rationaleEl.textContent = plan.rationale

    const actionsListEl = this.shadow.querySelector('#eq-actions-list') as HTMLElement
    actionsListEl.innerHTML = ''
    for (const act of plan.actions) {
      const item = document.createElement('div')
      item.className = 'eq-action-item'
      let desc = ''
      if (act.t === 'chk') desc = `[CHK] ${act.id}`
      else if (act.t === 'val') desc = `[INJ] "${act.v}" em ${act.id}`
      else if (act.t === 'sel') desc = `[SEL] ${Array.isArray(act.v) ? act.v.join(',') : act.v} em ${act.id}`
      else if (act.t === 'clk') desc = `[CLK] ${act.id}`
      else if (act.t === 'adv') desc = `[AVANÇAR]`
      else if (act.t === 'js') desc = `[JS] ${String(act.v)}`

      item.innerHTML = `<span class="eq-action-bullet">■</span> <span>${desc}</span>`
      actionsListEl.appendChild(item)
    }

    this.applyBtn.disabled = !canApply || !plan.actions.length
  }

  public destroy(): void {
    this.autopilot.stop()
    this.applyHostDarkMode(false)
    this.callbacks.onDestroy()
    this.host.remove()
  }
}
