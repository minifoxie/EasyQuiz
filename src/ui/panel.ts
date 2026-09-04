import type { AnalysisPlan, EasyQuizSettings, ResponseMode } from '../core/types'
import { AVAILABLE_MODELS, testApiKey } from '../core/gemini'
import { ICONS } from './icons'
import { PANEL_STYLES } from './styles'

export interface PanelCallbacks {
  onAnalyze: () => void
  onApply: () => void
  onDestroy: () => void
  onSettingsChange: (settings: Partial<EasyQuizSettings>) => void
}

const RESPONSE_MODE_LABELS: Array<{ value: '' | ResponseMode; label: string }> = [
  { value: '', label: 'Detecção Automática' },
  { value: 'escolha_unica', label: 'Múltipla Escolha (Única)' },
  { value: 'escolha_multipla', label: 'Múltipla Escolha (Várias)' },
  { value: 'verdadeiro_falso', label: 'Verdadeiro / Falso' },
  { value: 'texto_livre', label: 'Texto Livre / Dissertativa' },
  { value: 'preenchimento', label: 'Preenchimento de Lacunas' },
]

export class EasyQuizPanel {
  private host: HTMLElement
  private shadow: ShadowRoot
  private callbacks: PanelCallbacks

  // Elementos do DOM interno
  private launcherBtn: HTMLButtonElement
  private panelEl: HTMLElement
  private statusBox: HTMLElement
  private resultContainer: HTMLElement
  private apiKeyInput: HTMLInputElement
  private apiKeyToggleBtn: HTMLButtonElement
  private testKeyBtn: HTMLButtonElement
  private modelSelect: HTMLSelectElement
  private modeSelect: HTMLSelectElement
  private dryRunCheckbox: HTMLInputElement
  private autoApplyCheckbox: HTMLInputElement
  private autoAdvanceCheckbox: HTMLInputElement
  private analyzeBtn: HTMLButtonElement
  private applyBtn: HTMLButtonElement

  constructor(initialSettings: EasyQuizSettings, callbacks: PanelCallbacks) {
    this.callbacks = callbacks
    this.host = document.createElement('div')
    this.host.id = 'easyquiz-shadow-root'
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
            <span class="eq-brand-badge">PRO</span>
          </div>
          <div class="eq-header-tools">
            <button class="eq-icon-btn" id="eq-min-btn" type="button" title="Minimizar">${ICONS.minimize}</button>
            <button class="eq-icon-btn" id="eq-close-btn" type="button" title="Fechar">${ICONS.close}</button>
          </div>
        </header>

        <div class="eq-content">
          <!-- Chave de API Gemini -->
          <div class="eq-field-group">
            <div class="eq-section-title">
              <span>Chave Gemini (Google AI)</span>
              <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" class="eq-link">
                Obter Grátis
              </a>
            </div>
            <div class="eq-input-wrap">
              <input 
                id="eq-api-key" 
                class="eq-input" 
                type="password" 
                placeholder="Cole sua chave AIzaSy..." 
                autocomplete="off"
                spellcheck="false"
              />
              <button class="eq-icon-btn" id="eq-key-toggle-btn" type="button" title="Mostrar/Ocultar Chave" style="height:36px;width:34px;border-left:none;">
                ${ICONS.eye}
              </button>
              <button class="eq-input-action-btn" id="eq-test-key-btn" type="button">
                ${ICONS.key} Testar
              </button>
            </div>
          </div>

          <!-- Modelo e Modo -->
          <div class="eq-row-2">
            <div class="eq-field-group">
              <div class="eq-section-title">Modelo IA</div>
              <select id="eq-model-select" class="eq-select"></select>
            </div>
            <div class="eq-field-group">
              <div class="eq-section-title">Modo Questão</div>
              <select id="eq-mode-select" class="eq-select"></select>
            </div>
          </div>

          <!-- Opções de Execução -->
          <div class="eq-row-2">
            <label class="eq-checkbox-label">
              <input id="eq-dry-run" type="checkbox" />
              <span>Apenas simular</span>
            </label>
            <label class="eq-checkbox-label">
              <input id="eq-auto-apply" type="checkbox" />
              <span>Auto aplicar</span>
            </label>
          </div>
          <div>
            <label class="eq-checkbox-label">
              <input id="eq-auto-advance" type="checkbox" />
              <span>Avançar para próxima questão após responder</span>
            </label>
          </div>

          <!-- Botão Principal de Análise -->
          <button class="eq-btn-primary" id="eq-analyze-btn" type="button">
            ${ICONS.analyze} Analisar Bloco da Questão
          </button>

          <!-- Caixa de Status -->
          <div class="eq-status-box" id="eq-status">
            Pronto. Aponte para a questão desejada ou clique em 'Analisar Bloco'.
          </div>

          <!-- Área de Resultados -->
          <div class="eq-result-container" id="eq-result" style="display: none;">
            <div class="eq-result-header">
              <div class="eq-badges" id="eq-badges"></div>
            </div>

            <div class="eq-rationale-box">
              <div class="eq-rationale-title">Justificativa da Resposta</div>
              <div id="eq-rationale-text"></div>
            </div>

            <div class="eq-actions-summary">
              <div class="eq-rationale-title">Ações Declarativas</div>
              <div id="eq-actions-list"></div>
            </div>

            <button class="eq-btn-secondary" id="eq-apply-btn" type="button">
              ${ICONS.apply} Aplicar Respostas na Página
            </button>
          </div>

          <div class="eq-footer-note">
            EasyQuiz Engine • 100% Client-Side • Zero Servidor
          </div>
        </div>
      </section>
    `

    // Mapear elementos
    this.launcherBtn = this.shadow.querySelector('.eq-launcher') as HTMLButtonElement
    this.panelEl = this.shadow.querySelector('.eq-panel') as HTMLElement
    this.statusBox = this.shadow.querySelector('#eq-status') as HTMLElement
    this.resultContainer = this.shadow.querySelector('#eq-result') as HTMLElement
    this.apiKeyInput = this.shadow.querySelector('#eq-api-key') as HTMLInputElement
    this.apiKeyToggleBtn = this.shadow.querySelector('#eq-key-toggle-btn') as HTMLButtonElement
    this.testKeyBtn = this.shadow.querySelector('#eq-test-key-btn') as HTMLButtonElement
    this.modelSelect = this.shadow.querySelector('#eq-model-select') as HTMLSelectElement
    this.modeSelect = this.shadow.querySelector('#eq-mode-select') as HTMLSelectElement
    this.dryRunCheckbox = this.shadow.querySelector('#eq-dry-run') as HTMLInputElement
    this.autoApplyCheckbox = this.shadow.querySelector('#eq-auto-apply') as HTMLInputElement
    this.autoAdvanceCheckbox = this.shadow.querySelector('#eq-auto-advance') as HTMLInputElement
    this.analyzeBtn = this.shadow.querySelector('#eq-analyze-btn') as HTMLButtonElement
    this.applyBtn = this.shadow.querySelector('#eq-apply-btn') as HTMLButtonElement

    // Preencher modelos
    for (const m of AVAILABLE_MODELS) {
      this.modelSelect.add(new Option(m.name, m.id, false, m.id === initialSettings.model))
    }

    // Preencher modos
    for (const mode of RESPONSE_MODE_LABELS) {
      this.modeSelect.add(new Option(mode.label, mode.value, false, mode.value === initialSettings.modeHint))
    }

    // Carregar configurações iniciais
    this.apiKeyInput.value = initialSettings.apiKey
    this.dryRunCheckbox.checked = initialSettings.dryRun
    this.autoApplyCheckbox.checked = initialSettings.autoApply
    this.autoAdvanceCheckbox.checked = initialSettings.autoAdvance

    // Anexar listeners
    this.setupEventListeners()

    // Adicionar à página
    document.documentElement.appendChild(this.host)
  }

  private setupEventListeners(): void {
    // Abrir/fechar
    this.launcherBtn.addEventListener('click', () => this.toggle())
    this.shadow.querySelector('#eq-min-btn')?.addEventListener('click', () => this.toggle(false))
    this.shadow.querySelector('#eq-close-btn')?.addEventListener('click', () => this.toggle(false))

    // Toggle visibilidade da chave
    this.apiKeyToggleBtn.addEventListener('click', () => {
      const isPass = this.apiKeyInput.type === 'password'
      this.apiKeyInput.type = isPass ? 'text' : 'password'
      this.apiKeyToggleBtn.innerHTML = isPass ? ICONS.eyeOff : ICONS.eye
    })

    // Salvar chave de API ao digitar
    this.apiKeyInput.addEventListener('input', () => {
      this.callbacks.onSettingsChange({ apiKey: this.apiKeyInput.value.trim() })
    })

    // Testar chave de API
    this.testKeyBtn.addEventListener('click', async () => {
      const key = this.apiKeyInput.value.trim()
      if (!key) {
        this.setStatus('Por favor, informe a chave de API antes de testar.', 'error')
        return
      }
      this.setStatus('Testando conexão com o Google Gemini...', 'info')
      this.testKeyBtn.disabled = true
      try {
        const result = await testApiKey(key)
        if (result.ok) {
          this.setStatus(result.message, 'success')
        } else {
          this.setStatus(result.message, 'error')
        }
      } catch (err) {
        this.setStatus(err instanceof Error ? err.message : 'Falha ao testar chave.', 'error')
      } finally {
        this.testKeyBtn.disabled = false
      }
    })

    // Mudança de modelo
    this.modelSelect.addEventListener('change', () => {
      this.callbacks.onSettingsChange({ model: this.modelSelect.value })
    })

    // Mudança de modo
    this.modeSelect.addEventListener('change', () => {
      this.callbacks.onSettingsChange({ modeHint: (this.modeSelect.value || '') as ResponseMode | '' })
    })

    // Checkboxes
    this.dryRunCheckbox.addEventListener('change', () => {
      this.callbacks.onSettingsChange({ dryRun: this.dryRunCheckbox.checked })
    })
    this.autoApplyCheckbox.addEventListener('change', () => {
      this.callbacks.onSettingsChange({ autoApply: this.autoApplyCheckbox.checked })
    })
    this.autoAdvanceCheckbox.addEventListener('change', () => {
      this.callbacks.onSettingsChange({ autoAdvance: this.autoAdvanceCheckbox.checked })
    })

    // Ações principais
    this.analyzeBtn.addEventListener('click', () => this.callbacks.onAnalyze())
    this.applyBtn.addEventListener('click', () => this.callbacks.onApply())
  }

  public toggle(force?: boolean): void {
    const isHidden = force !== undefined ? !force : !this.panelEl.hidden
    this.panelEl.hidden = isHidden
    if (!isHidden) {
      if (!this.apiKeyInput.value) {
        this.apiKeyInput.focus()
      }
    }
  }

  public setBusy(busy: boolean, message?: string): void {
    this.analyzeBtn.disabled = busy
    this.modelSelect.disabled = busy
    this.modeSelect.disabled = busy
    this.dryRunCheckbox.disabled = busy
    this.autoApplyCheckbox.disabled = busy
    this.autoAdvanceCheckbox.disabled = busy
    if (message) {
      this.setStatus(message, 'info')
    }
  }

  public setStatus(message: string, type: 'info' | 'success' | 'error' = 'info'): void {
    this.statusBox.textContent = message
    this.statusBox.className = `eq-status-box ${type}`
  }

  public setPlan(plan: AnalysisPlan, canApply: boolean): void {
    this.resultContainer.style.display = 'flex'

    // Badges
    const badgesEl = this.shadow.querySelector('#eq-badges') as HTMLElement
    badgesEl.innerHTML = `
      <span class="eq-badge highlight">${plan.mode.replace('_', ' ')}</span>
      <span class="eq-badge ${plan.confidence >= 0.8 ? 'success' : ''}">
        ${Math.round(plan.confidence * 100)}% Confiança
      </span>
      <span class="eq-badge">${plan.actions.length} Ação(ões)</span>
    `

    // Justificativa
    const rationaleEl = this.shadow.querySelector('#eq-rationale-text') as HTMLElement
    rationaleEl.textContent = plan.rationale || plan.summary

    // Ações
    const actionsListEl = this.shadow.querySelector('#eq-actions-list') as HTMLElement
    actionsListEl.innerHTML = ''
    for (const act of plan.actions) {
      const item = document.createElement('div')
      item.className = 'eq-action-item'
      let desc = ''
      if (act.type === 'set_checked') {
        desc = `Marcar alternativa [${act.targetId}]`
      } else if (act.type === 'set_value') {
        desc = `Inserir "${act.value}" em [${act.targetId}]`
      } else if (act.type === 'select_values') {
        desc = `Selecionar "${act.values.join(', ')}"`
      } else if (act.type === 'advance') {
        desc = `Avançar para próxima questão [${act.targetId}]`
      }
      item.innerHTML = `<span class="eq-action-bullet">■</span> <span>${desc}</span>`
      actionsListEl.appendChild(item)
    }

    this.applyBtn.disabled = !canApply || !plan.actions.length
  }

  public destroy(): void {
    this.callbacks.onDestroy()
    this.host.remove()
  }
}
