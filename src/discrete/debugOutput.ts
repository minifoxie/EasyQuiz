/**
 * DebugOutput — Janela de Debug do Modo Discreto (Shift+H)
 * 
 * Características:
 * - Janela arrastável e minimizável com visual Chrome / Chromium DevTools.
 * - Discreta, sólida, sem poluição visual, alta fidelidade.
 * - 4 Abas principais:
 *   1. Console (Logs ao vivo com filtros de Erro, IA, DOM, Fluxo)
 *   2. Fluxo (Inspetor de InteractionSteps com estado por passo e injeção forçada)
 *   3. Plano IA (Raciocínio, confiança, JSON bruto do plano)
 *   4. Auditoria (Métricas de tokens, modelo, latência, escopo capturado)
 */

import type { InteractionStep } from './promptDiscrete'

export type LogCategory = 'SYS' | 'AI' | 'FLOW' | 'DOM' | 'ACTION' | 'KEY' | 'CLICK' | 'WARN' | 'ERROR' | 'REPLAN'

export interface LogEntry {
  id: number
  time: string
  category: LogCategory
  msg: string
  detail?: string
}

export interface DebugOutputOptions {
  onForceStep?: (stepIdx: number) => Promise<boolean> | boolean
  onForceAllSteps?: () => Promise<void> | void
}

export class DebugOutput {
  private el: HTMLDivElement | null = null
  private pillEl: HTMLDivElement | null = null
  private activeTab: 'console' | 'flow' | 'plan' | 'audit' = 'console'
  private activeFilter: 'all' | 'error' | 'flow' | 'dom' | 'ai' = 'all'
  private autoScroll = true

  private logs: LogEntry[] = []
  private logSeq = 0

  private currentPlan: any = null
  private currentFlow: InteractionStep[] = []
  private currentStepIdx = 0
  private stepStatuses = new Map<number, 'pending' | 'active' | 'done' | 'failed'>()
  private stepErrors = new Map<number, string>()

  private modelName = '--'
  private latencyMs = 0
  private questionSummary = ''
  private promptTokens = 0
  private responseTokens = 0

  private isDragging = false
  private dragStartX = 0
  private dragStartY = 0
  private initialLeft = 0
  private initialTop = 0

  private isMinimized = false
  private isVisible = false

  private boundMouseMove: (e: MouseEvent) => void
  private boundMouseUp: () => void

  private options: DebugOutputOptions

  constructor(options: DebugOutputOptions = {}) {
    this.options = options
    this.boundMouseMove = this.onMouseMove.bind(this)
    this.boundMouseUp = this.onMouseUp.bind(this)

    this.injectStyle()
    this.createDom()

    window.addEventListener('mousemove', this.boundMouseMove)
    window.addEventListener('mouseup', this.boundMouseUp)

    this.log('SYS', 'Debug Output Discreto pronto (Shift+H para alternar)')
  }

  // ── API Pública ───────────────────────────────────────────────────────────

  open(): void {
    this.isVisible = true
    if (this.isMinimized) {
      this.isMinimized = false
    }
    if (this.el) {
      this.el.style.display = 'flex'
      this.clampPosition()
    }
    if (this.pillEl) this.pillEl.style.display = 'none'
    this.render()
  }

  close(): void {
    this.isVisible = false
    this.isMinimized = false
    if (this.el) this.el.style.display = 'none'
    if (this.pillEl) this.pillEl.style.display = 'none'
  }

  toggle(): void {
    if (!this.isVisible || this.isMinimized) {
      this.open()
    } else {
      this.close()
    }
  }

  minimize(): void {
    if (!this.isVisible) return
    this.isMinimized = true
    if (this.el) this.el.style.display = 'none'
    if (this.pillEl) {
      this.pillEl.style.display = 'flex'
      this.updatePill()
    }
  }

  restore(): void {
    this.isMinimized = false
    if (this.pillEl) this.pillEl.style.display = 'none'
    if (this.el) {
      this.el.style.display = 'flex'
      this.clampPosition()
    }
    this.render()
  }

  isOpen(): boolean {
    return this.isVisible && !this.isMinimized
  }

  // ── Métodos de Logging ───────────────────────────────────────────────────

  log(category: LogCategory, msg: string, detail?: string): void {
    const d = new Date()
    const time = `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}:${d.getSeconds().toString().padStart(2, '0')}.${d.getMilliseconds().toString().padStart(3, '0').slice(0, 2)}`
    const entry: LogEntry = {
      id: ++this.logSeq,
      time,
      category,
      msg,
      detail,
    }
    this.logs.push(entry)
    if (this.logs.length > 300) this.logs.shift()

    this.updatePill()
    if (this.isOpen()) {
      if (this.activeTab === 'console') {
        this.renderConsoleLogs()
      }
      this.updateTabCounters()
    }
  }

  setPlan(plan: any, questionText = '', latency = 0, model = '--'): void {
    this.currentPlan = plan
    this.questionSummary = (questionText || '').slice(0, 300)
    this.latencyMs = latency
    this.modelName = model
    this.stepStatuses.clear()
    this.stepErrors.clear()

    const acts = Array.isArray(plan?.actions) ? plan.actions.length : 0
    this.log('AI', `Plano recebido: ${acts} ações planejadas`, JSON.stringify(plan?.actions || [], null, 2))
    if (plan?.thinking || plan?.rationale) {
      this.log('AI', `Raciocínio: ${(plan.thinking || plan.rationale).slice(0, 150)}...`)
    }

    if (this.isOpen()) this.render()
  }

  setFlow(flow: InteractionStep[]): void {
    this.currentFlow = flow || []
    this.currentStepIdx = 0
    this.stepStatuses.clear()
    this.stepErrors.clear()

    flow.forEach((_, idx) => {
      this.stepStatuses.set(idx, idx === 0 ? 'active' : 'pending')
    })

    this.log('FLOW', `Fluxo carregado com ${flow.length} passos de interação`)
    this.updatePill()
    if (this.isOpen()) this.render()
  }

  setStepIndex(idx: number): void {
    this.currentStepIdx = idx
    this.currentFlow.forEach((_, i) => {
      if (i < idx) {
        if (this.stepStatuses.get(i) !== 'failed') this.stepStatuses.set(i, 'done')
      } else if (i === idx) {
        this.stepStatuses.set(i, 'active')
      } else {
        if (this.stepStatuses.get(i) !== 'failed') this.stepStatuses.set(i, 'pending')
      }
    })
    const cur = this.currentFlow[idx]
    if (cur) {
      const act = cur.action as Record<string, unknown>
      const target = act.id || act.name || act.label || act.from || 'alvo'
      this.log('FLOW', `Passo ${idx + 1}/${this.currentFlow.length} (${cur.trigger}): ${act.t ?? 'ação'} em "${target}"`)
    }
    this.updatePill()
    if (this.isOpen()) {
      if (this.activeTab === 'flow') this.renderFlow()
      this.updateTabCounters()
    }
  }

  markStepSuccess(idx: number, detail?: string): void {
    this.stepStatuses.set(idx, 'done')
    this.log('ACTION', `✓ Passo ${idx + 1} executado com sucesso`, detail)
    this.updatePill()
    if (this.isOpen() && this.activeTab === 'flow') this.renderFlow()
  }

  markStepFailed(idx: number, reason: string): void {
    this.stepStatuses.set(idx, 'failed')
    this.stepErrors.set(idx, reason)
    this.log('ERROR', `✕ Falha no Passo ${idx + 1}: ${reason}`)
    this.updatePill()
    if (this.isOpen() && this.activeTab === 'flow') this.renderFlow()
  }

  // ── Drag & Drop da Janela ─────────────────────────────────────────────────

  private onHeaderMouseDown(e: MouseEvent): void {
    if ((e.target as HTMLElement).closest('.__eq_dbg_btn__, .__eq_dbg_tab__')) return
    e.preventDefault()
    this.isDragging = true
    this.dragStartX = e.clientX
    this.dragStartY = e.clientY

    if (this.el) {
      const rect = this.el.getBoundingClientRect()
      this.initialLeft = rect.left
      this.initialTop = rect.top
    }
  }

  private onMouseMove(e: MouseEvent): void {
    if (!this.isDragging || !this.el) return
    const dx = e.clientX - this.dragStartX
    const dy = e.clientY - this.dragStartY

    const maxLeft = Math.max(10, window.innerWidth - this.el.offsetWidth - 10)
    const maxTop = Math.max(10, window.innerHeight - this.el.offsetHeight - 10)

    const newLeft = Math.min(Math.max(10, this.initialLeft + dx), maxLeft)
    const newTop = Math.min(Math.max(10, this.initialTop + dy), maxTop)

    this.el.style.left = `${newLeft}px`
    this.el.style.top = `${newTop}px`
    this.el.style.right = 'auto'
    this.el.style.bottom = 'auto'
  }

  private onMouseUp(): void {
    this.isDragging = false
  }

  private clampPosition(): void {
    if (!this.el) return
    const rect = this.el.getBoundingClientRect()
    const maxLeft = Math.max(10, window.innerWidth - rect.width - 10)
    const maxTop = Math.max(10, window.innerHeight - rect.height - 10)
    const curLeft = rect.left
    const curTop = rect.top

    if (curLeft > maxLeft || curTop > maxTop || curLeft < 10 || curTop < 10) {
      this.el.style.left = `${Math.min(Math.max(10, curLeft), maxLeft)}px`
      this.el.style.top = `${Math.min(Math.max(10, curTop), maxTop)}px`
      this.el.style.right = 'auto'
      this.el.style.bottom = 'auto'
    }
  }

  // ── Renderização do DOM ───────────────────────────────────────────────────

  private render(): void {
    if (!this.el) return
    this.updateTabCounters()

    const body = this.el.querySelector('.__eq_dbg_body__') as HTMLElement
    if (!body) return

    if (this.activeTab === 'console') {
      body.innerHTML = `
        <div class="__eq_dbg_toolbar__">
          <div class="__eq_dbg_chips__">
            <button class="__eq_dbg_chip__ ${this.activeFilter === 'all' ? 'active' : ''}" data-filter="all">Todos (<span id="__eq_cnt_all">0</span>)</button>
            <button class="__eq_dbg_chip__ ${this.activeFilter === 'error' ? 'active' : ''}" data-filter="error">Erros (<span id="__eq_cnt_err" style="color:#f28b82;">0</span>)</button>
            <button class="__eq_dbg_chip__ ${this.activeFilter === 'flow' ? 'active' : ''}" data-filter="flow">Fluxo (<span id="__eq_cnt_flow">0</span>)</button>
            <button class="__eq_dbg_chip__ ${this.activeFilter === 'dom' ? 'active' : ''}" data-filter="dom">DOM (<span id="__eq_cnt_dom">0</span>)</button>
            <button class="__eq_dbg_chip__ ${this.activeFilter === 'ai' ? 'active' : ''}" data-filter="ai">IA (<span id="__eq_cnt_ai">0</span>)</button>
          </div>
          <div class="__eq_dbg_actions__">
            <button class="__eq_dbg_iconbtn__ ${this.autoScroll ? 'active' : ''}" id="__eq_dbg_btn_scroll__" title="Auto-scroll">↓</button>
            <button class="__eq_dbg_iconbtn__" id="__eq_dbg_btn_copy__" title="Copiar logs">📋</button>
            <button class="__eq_dbg_iconbtn__" id="__eq_dbg_btn_clear__" title="Limpar logs" style="color:#f28b82;">🗑️</button>
          </div>
        </div>
        <div class="__eq_dbg_terminal__" id="__eq_dbg_terminal__"></div>
      `
      this.renderConsoleLogs()
      this.wireConsoleEvents()
    } else if (this.activeTab === 'flow') {
      this.renderFlow()
    } else if (this.activeTab === 'plan') {
      this.renderPlan()
    } else if (this.activeTab === 'audit') {
      this.renderAudit()
    }
  }

  private renderConsoleLogs(): void {
    const term = this.el?.querySelector('#__eq_dbg_terminal__') as HTMLElement
    if (!term) return

    term.innerHTML = ''
    const filtered = this.logs.filter((l) => {
      if (this.activeFilter === 'all') return true
      if (this.activeFilter === 'error') return l.category === 'ERROR' || l.category === 'WARN'
      if (this.activeFilter === 'flow') return l.category === 'FLOW' || l.category === 'KEY' || l.category === 'CLICK'
      if (this.activeFilter === 'dom') return l.category === 'DOM' || l.category === 'ACTION'
      if (this.activeFilter === 'ai') return l.category === 'AI'
      return true
    })

    if (filtered.length === 0) {
      term.innerHTML = `<div class="__eq_dbg_empty__">Nenhum log correspondente ao filtro.</div>`
      return
    }

    filtered.forEach((l) => {
      const line = document.createElement('div')
      line.className = `__eq_dbg_line__ __eq_cat_${l.category.toLowerCase()}__`

      const catBadge = document.createElement('span')
      catBadge.className = `__eq_dbg_badge__ __eq_bg_${l.category.toLowerCase()}__`
      catBadge.textContent = l.category

      const timeSpan = document.createElement('span')
      timeSpan.className = '__eq_dbg_time__'
      timeSpan.textContent = l.time

      const msgSpan = document.createElement('span')
      msgSpan.className = '__eq_dbg_msg__'
      msgSpan.textContent = l.msg

      line.appendChild(timeSpan)
      line.appendChild(catBadge)
      line.appendChild(msgSpan)

      if (l.detail) {
        const detBtn = document.createElement('span')
        detBtn.className = '__eq_dbg_detail_btn__'
        detBtn.textContent = ' [detalhes]'
        detBtn.onclick = () => {
          const pre = line.querySelector('pre')
          if (pre) {
            pre.remove()
          } else {
            const p = document.createElement('pre')
            p.className = '__eq_dbg_detail_pre__'
            p.textContent = l.detail!
            line.appendChild(p)
          }
        }
        line.appendChild(detBtn)
      }

      term.appendChild(line)
    })

    if (this.autoScroll) {
      term.scrollTop = term.scrollHeight
    }
  }

  private wireConsoleEvents(): void {
    if (!this.el) return

    this.el.querySelectorAll('.__eq_dbg_chip__').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const filter = (e.currentTarget as HTMLElement).getAttribute('data-filter') as any
        this.activeFilter = filter || 'all'
        this.el?.querySelectorAll('.__eq_dbg_chip__').forEach((b) => b.classList.remove('active'))
        ;(e.currentTarget as HTMLElement).classList.add('active')
        this.renderConsoleLogs()
      })
    })

    const scrollBtn = this.el.querySelector('#__eq_dbg_btn_scroll__')
    scrollBtn?.addEventListener('click', () => {
      this.autoScroll = !this.autoScroll
      scrollBtn.classList.toggle('active', this.autoScroll)
    })

    const copyBtn = this.el.querySelector('#__eq_dbg_btn_copy__')
    copyBtn?.addEventListener('click', () => {
      const text = this.logs.map((l) => `[${l.time}] [${l.category}] ${l.msg}${l.detail ? `\n${l.detail}` : ''}`).join('\n')
      navigator.clipboard.writeText(text).then(() => {
        copyBtn.textContent = '✓'
        setTimeout(() => (copyBtn.textContent = '📋'), 1000)
      })
    })

    const clearBtn = this.el.querySelector('#__eq_dbg_btn_clear__')
    clearBtn?.addEventListener('click', () => {
      this.logs = []
      this.renderConsoleLogs()
      this.updateTabCounters()
    })
  }

  private renderFlow(): void {
    const body = this.el?.querySelector('.__eq_dbg_body__') as HTMLElement
    if (!body) return

    if (!this.currentFlow || this.currentFlow.length === 0) {
      body.innerHTML = `
        <div class="__eq_dbg_empty__" style="padding:40px 20px;text-align:center;">
          <div style="font-size:24px;margin-bottom:8px;">⏸️</div>
          <div>Nenhum fluxo de interação ativo no momento.</div>
          <div style="font-size:11px;color:#9aa0a6;margin-top:6px;">Pressione Shift+Q para analisar a página ou aguarde o avanço automático.</div>
        </div>
      `
      return
    }

    const flowHtml = this.currentFlow
      .map((st, idx) => {
        const act = st.action as Record<string, unknown>
        const status = this.stepStatuses.get(idx) || (idx === this.currentStepIdx ? 'active' : idx < this.currentStepIdx ? 'done' : 'pending')
        const statusLabel =
          status === 'done'
            ? '<span class="__eq_status_done__">✓ Concluído</span>'
            : status === 'active'
              ? '<span class="__eq_status_active__">▶ Em Andamento</span>'
              : status === 'failed'
                ? '<span class="__eq_status_failed__">✕ Falhou</span>'
                : '<span class="__eq_status_pending__">Pendente</span>'

        const triggerIcon = st.trigger === 'key' ? '⌨️ Tecla' : '🖱️ Clique'
        const actType = String(act.t || 'act').toUpperCase()
        const targetDesc = act.id ? `#${act.id}` : act.name ? `[name="${act.name}"]` : act.label || act.from || 'alvo'
        const valDesc = act.v !== undefined ? ` = "${act.v}"` : act.c !== undefined ? ` (check: ${act.c})` : ''

        return `
        <div class="__eq_flow_card__ ${status === 'active' ? '__eq_flow_active__' : ''}">
          <div class="__eq_flow_header__">
            <span class="__eq_flow_num__">Passo ${idx + 1}</span>
            <span class="__eq_flow_trigger__">${triggerIcon}</span>
            <span class="__eq_flow_type__">${actType}</span>
            <span class="__eq_flow_status__">${statusLabel}</span>
          </div>
          <div class="__eq_flow_content__">
            <div class="__eq_flow_target__">${escapeHtml(String(targetDesc))}<span style="color:#8ab4f8;">${escapeHtml(String(valDesc))}</span></div>
            <div class="__eq_flow_hint__">${escapeHtml(st.hint || '')}${st.customMsg ? ` • <i style="color:#81c995;">${escapeHtml(st.customMsg)}</i>` : ''}</div>
            ${this.stepErrors.has(idx) ? `<div class="__eq_flow_err__">Erro: ${escapeHtml(this.stepErrors.get(idx)!)}</div>` : ''}
          </div>
          <div class="__eq_flow_actions__">
            <button class="__eq_dbg_btn__ __eq_btn_exec_step__" data-step="${idx}">Forçar Passo</button>
          </div>
        </div>
      `
      })
      .join('')

    body.innerHTML = `
      <div class="__eq_dbg_flow_header__">
        <div>
          <span style="font-weight:700;color:#e8eaed;">Progresso do Fluxo:</span>
          <span style="color:#8ab4f8;margin-left:6px;">${Math.min(this.currentStepIdx + 1, this.currentFlow.length)} / ${this.currentFlow.length}</span>
        </div>
        <div style="display:flex;gap:8px;">
          ${this.options.onForceAllSteps ? `<button class="__eq_dbg_btn__ __eq_btn_primary__" id="__eq_btn_force_all__">⚡ Injetar Todas as Respostas</button>` : ''}
        </div>
      </div>
      <div class="__eq_dbg_flow_list__">${flowHtml}</div>
    `

    // Wire clicks nos botões de forçar
    body.querySelectorAll('.__eq_btn_exec_step__').forEach((btn) => {
      btn.addEventListener('click', async (e) => {
        const stepIdx = parseInt((e.currentTarget as HTMLElement).getAttribute('data-step') || '0', 10)
        if (this.options.onForceStep) {
          btn.textContent = 'Executando...'
          const ok = await this.options.onForceStep(stepIdx)
          btn.textContent = ok ? '✓ Sucesso' : '✕ Falhou'
          setTimeout(() => (btn.textContent = 'Forçar Passo'), 1500)
        }
      })
    })

    const forceAllBtn = body.querySelector('#__eq_btn_force_all__')
    forceAllBtn?.addEventListener('click', async () => {
      if (this.options.onForceAllSteps) {
        forceAllBtn.textContent = 'Injetando...'
        await this.options.onForceAllSteps()
        forceAllBtn.textContent = '✓ Concluído'
        setTimeout(() => (forceAllBtn.textContent = '⚡ Injetar Todas as Respostas'), 1500)
      }
    })
  }

  private renderPlan(): void {
    const body = this.el?.querySelector('.__eq_dbg_body__') as HTMLElement
    if (!body) return

    if (!this.currentPlan) {
      body.innerHTML = `<div class="__eq_dbg_empty__">Nenhum plano de IA capturado ainda. Pressione Shift+Q.</div>`
      return
    }

    const confPct = Math.round((this.currentPlan.confidence || 1) * 100)
    const rationale = this.currentPlan.thinking || this.currentPlan.rationale || 'Nenhum raciocínio textual retornado.'
    const jsonStr = JSON.stringify(this.currentPlan, null, 2)

    body.innerHTML = `
      <div style="padding:12px;overflow-y:auto;height:100%;box-sizing:border-box;display:flex;flex-direction:column;gap:12px;">
        <div style="display:flex;justify-content:space-between;align-items:center;background:#292a2d;padding:10px 14px;border-radius:6px;border:1px solid #3c4043;">
          <div>
            <div style="font-size:11px;color:#9aa0a6;text-transform:uppercase;font-weight:700;">Modo & Tipo</div>
            <div style="font-size:13px;font-weight:600;color:#8ab4f8;margin-top:2px;">${escapeHtml(this.currentPlan.mode || 'auto')} • ${escapeHtml(this.currentPlan.pageType || 'question')}</div>
          </div>
          <div style="text-align:right;">
            <div style="font-size:11px;color:#9aa0a6;text-transform:uppercase;font-weight:700;">Confiança</div>
            <div style="font-size:14px;font-weight:700;color:${confPct > 80 ? '#81c995' : '#fdd663'};margin-top:2px;">${confPct}%</div>
          </div>
        </div>

        <div>
          <div style="font-size:11px;font-weight:700;color:#9aa0a6;margin-bottom:4px;text-transform:uppercase;">Raciocínio da IA:</div>
          <div style="background:#1e1f22;border:1px solid #3c4043;border-radius:6px;padding:10px 12px;font-size:12.5px;line-height:1.5;color:#e8eaed;max-height:120px;overflow-y:auto;white-space:pre-wrap;">${escapeHtml(rationale)}</div>
        </div>

        <div style="flex:1;display:flex;flex-direction:column;min-height:140px;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
            <span style="font-size:11px;font-weight:700;color:#9aa0a6;text-transform:uppercase;">JSON do Plano Bruto:</span>
            <button class="__eq_dbg_btn__" id="__eq_btn_copy_json__" style="font-size:10px;padding:3px 8px;">Copiar JSON</button>
          </div>
          <pre style="flex:1;background:#1e1f22;border:1px solid #3c4043;border-radius:6px;padding:10px;font-family:'JetBrains Mono','Consolas',monospace;font-size:11px;color:#8ab4f8;overflow:auto;margin:0;">${escapeHtml(jsonStr)}</pre>
        </div>
      </div>
    `

    body.querySelector('#__eq_btn_copy_json__')?.addEventListener('click', (e) => {
      navigator.clipboard.writeText(jsonStr).then(() => {
        const btn = e.currentTarget as HTMLElement
        btn.textContent = '✓ Copiado'
        setTimeout(() => (btn.textContent = 'Copiar JSON'), 1200)
      })
    })
  }

  private renderAudit(): void {
    const body = this.el?.querySelector('.__eq_dbg_body__') as HTMLElement
    if (!body) return

    body.innerHTML = `
      <div style="padding:14px;overflow-y:auto;height:100%;box-sizing:border-box;display:flex;flex-direction:column;gap:14px;">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
          <div style="background:#292a2d;border:1px solid #3c4043;border-radius:6px;padding:10px 12px;">
            <div style="font-size:10.5px;color:#9aa0a6;text-transform:uppercase;font-weight:700;">Modelo Ativo</div>
            <div style="font-size:13px;font-weight:700;color:#8ab4f8;margin-top:3px;overflow:hidden;text-overflow:ellipsis;">${escapeHtml(this.modelName)}</div>
          </div>
          <div style="background:#292a2d;border:1px solid #3c4043;border-radius:6px;padding:10px 12px;">
            <div style="font-size:10.5px;color:#9aa0a6;text-transform:uppercase;font-weight:700;">Latência da API</div>
            <div style="font-size:13px;font-weight:700;color:#81c995;margin-top:3px;">${this.latencyMs ? `${this.latencyMs} ms` : '--'}</div>
          </div>
        </div>

        <div>
          <div style="font-size:11px;font-weight:700;color:#9aa0a6;margin-bottom:6px;text-transform:uppercase;">Enunciado Capturado:</div>
          <div style="background:#1e1f22;border:1px solid #3c4043;border-radius:6px;padding:10px;font-size:12px;color:#bdc1c6;line-height:1.45;max-height:140px;overflow-y:auto;white-space:pre-wrap;">${escapeHtml(this.questionSummary || 'Nenhum texto capturado.')}</div>
        </div>

        <div>
          <div style="font-size:11px;font-weight:700;color:#9aa0a6;margin-bottom:6px;text-transform:uppercase;">Diagnóstico do Modo Discreto:</div>
          <div style="background:#1e1f22;border:1px solid #3c4043;border-radius:6px;padding:10px;font-size:11.5px;color:#bdc1c6;line-height:1.5;">
            • Interceptores de Opções: <span style="color:#81c995;font-weight:600;">Ativos</span><br>
            • Concorrência Guard: <span style="color:#81c995;font-weight:600;">Protegido</span><br>
            • Mapeamento V/F em Tabela: <span style="color:#8ab4f8;font-weight:600;">Direcionado (name, value, label)</span><br>
            • Fallback de Injeção: <span style="color:#8ab4f8;font-weight:600;">Native setter + Synthetic dispatch</span>
          </div>
        </div>
      </div>
    `
  }

  private updateTabCounters(): void {
    if (!this.el) return

    const cntAll = this.el.querySelector('#__eq_cnt_all')
    const cntErr = this.el.querySelector('#__eq_cnt_err')
    const cntFlow = this.el.querySelector('#__eq_cnt_flow')
    const cntDom = this.el.querySelector('#__eq_cnt_dom')
    const cntAi = this.el.querySelector('#__eq_cnt_ai')

    if (cntAll) cntAll.textContent = String(this.logs.length)
    if (cntErr) cntErr.textContent = String(this.logs.filter((l) => l.category === 'ERROR' || l.category === 'WARN' || l.category === 'REPLAN').length)
    if (cntFlow) cntFlow.textContent = String(this.logs.filter((l) => l.category === 'FLOW' || l.category === 'KEY' || l.category === 'CLICK').length)
    if (cntDom) cntDom.textContent = String(this.logs.filter((l) => l.category === 'DOM' || l.category === 'ACTION').length)
    if (cntAi) cntAi.textContent = String(this.logs.filter((l) => l.category === 'AI').length)

    // Atualiza badge da aba Flow
    const flowTabBadge = this.el.querySelector('#__eq_tab_badge_flow__')
    if (flowTabBadge) {
      flowTabBadge.textContent = this.currentFlow.length > 0 ? `${this.currentStepIdx + 1}/${this.currentFlow.length}` : '0'
    }
  }

  private updatePill(): void {
    if (!this.pillEl) return
    const errors = this.logs.filter((l) => l.category === 'ERROR').length
    const steps = this.currentFlow.length
    const cur = steps > 0 ? `${this.currentStepIdx + 1}/${steps}` : 'Idle'

    const pillText = this.pillEl.querySelector('.__eq_pill_text__')
    if (pillText) {
      pillText.textContent = `EQ Debug: ${cur} ${errors > 0 ? `(${errors} err)` : '• OK'}`
    }
  }

  // ── Inicialização do DOM e CSS ───────────────────────────────────────────

  private createDom(): void {
    // Janela Principal
    this.el = document.createElement('div')
    this.el.id = '__eq_dbg_window__'
    this.el.style.display = 'none'

    this.el.innerHTML = `
      <div class="__eq_dbg_header__">
        <div class="__eq_dbg_tabs__">
          <button class="__eq_dbg_tab__ ${this.activeTab === 'console' ? 'active' : ''}" data-tab="console">Console</button>
          <button class="__eq_dbg_tab__ ${this.activeTab === 'flow' ? 'active' : ''}" data-tab="flow">Fluxo <span class="__eq_tab_badge__" id="__eq_tab_badge_flow__">0</span></button>
          <button class="__eq_dbg_tab__ ${this.activeTab === 'plan' ? 'active' : ''}" data-tab="plan">Plano IA</button>
          <button class="__eq_dbg_tab__ ${this.activeTab === 'audit' ? 'active' : ''}" data-tab="audit">Auditoria</button>
        </div>
        <div class="__eq_dbg_controls__">
          <button class="__eq_dbg_btn_win__" id="__eq_win_min__" title="Minimizar">_</button>
          <button class="__eq_dbg_btn_win__" id="__eq_win_close__" title="Fechar (Shift+H)">✕</button>
        </div>
      </div>
      <div class="__eq_dbg_body__"></div>
    `

    const header = this.el.querySelector('.__eq_dbg_header__') as HTMLElement
    header.addEventListener('mousedown', this.onHeaderMouseDown.bind(this))

    this.el.querySelectorAll('.__eq_dbg_tab__').forEach((tab) => {
      tab.addEventListener('click', (e) => {
        const targetTab = (e.currentTarget as HTMLElement).getAttribute('data-tab') as any
        this.activeTab = targetTab || 'console'
        this.el?.querySelectorAll('.__eq_dbg_tab__').forEach((t) => t.classList.remove('active'))
        ;(e.currentTarget as HTMLElement).classList.add('active')
        this.render()
      })
    })

    this.el.querySelector('#__eq_win_min__')?.addEventListener('click', () => this.minimize())
    this.el.querySelector('#__eq_win_close__')?.addEventListener('click', () => this.close())

    document.documentElement.appendChild(this.el)

    // Pill minimizado
    this.pillEl = document.createElement('div')
    this.pillEl.id = '__eq_dbg_pill__'
    this.pillEl.style.display = 'none'
    this.pillEl.innerHTML = `
      <span class="__eq_pill_dot__"></span>
      <span class="__eq_pill_text__">EQ Debug: Pronto</span>
      <span style="font-size:11px;opacity:0.7;margin-left:4px;">[Shift+H]</span>
    `
    this.pillEl.addEventListener('click', () => this.restore())
    document.documentElement.appendChild(this.pillEl)
  }

  private injectStyle(): void {
    if (document.getElementById('__eq_dbg_style__')) return
    const s = document.createElement('style')
    s.id = '__eq_dbg_style__'
    s.textContent = `
      #__eq_dbg_window__ {
        position: fixed;
        right: 24px;
        bottom: 24px;
        width: 530px;
        height: 400px;
        min-width: 360px;
        min-height: 240px;
        max-width: calc(100vw - 24px);
        max-height: calc(100vh - 24px);
        background: #202124;
        border: 1px solid #3c4043;
        border-radius: 8px;
        box-shadow: 0 12px 32px rgba(0,0,0,0.45), 0 2px 8px rgba(0,0,0,0.3);
        z-index: 2147483645;
        display: flex;
        flex-direction: column;
        font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
        color: #e8eaed;
        overflow: hidden;
        user-select: none;
        resize: both;
        box-sizing: border-box;
      }

      .__eq_dbg_header__ {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: #292a2d;
        border-bottom: 1px solid #3c4043;
        padding: 0 8px 0 12px;
        height: 38px;
        cursor: grab;
      }
      .__eq_dbg_header__:active { cursor: grabbing; }

      .__eq_dbg_tabs__ {
        display: flex;
        align-items: center;
        gap: 4px;
        height: 100%;
      }

      .__eq_dbg_tab__ {
        background: transparent;
        border: none;
        color: #9aa0a6;
        font-size: 12.5px;
        font-weight: 500;
        padding: 6px 12px;
        cursor: pointer;
        border-radius: 4px 4px 0 0;
        position: relative;
        display: flex;
        align-items: center;
        gap: 6px;
        height: 32px;
        margin-top: 6px;
        transition: color 0.1s, background 0.1s;
      }
      .__eq_dbg_tab__:hover {
        color: #e8eaed;
        background: rgba(255,255,255,0.04);
      }
      .__eq_dbg_tab__.active {
        color: #8ab4f8;
        background: #202124;
        font-weight: 600;
      }
      .__eq_dbg_tab__.active::after {
        content: '';
        position: absolute;
        bottom: -1px;
        left: 0;
        right: 0;
        height: 2px;
        background: #8ab4f8;
      }

      .__eq_tab_badge__ {
        font-size: 10px;
        background: #3c4043;
        color: #e8eaed;
        padding: 1px 5px;
        border-radius: 10px;
      }

      .__eq_dbg_controls__ {
        display: flex;
        align-items: center;
        gap: 4px;
      }

      .__eq_dbg_btn_win__ {
        background: transparent;
        border: none;
        color: #9aa0a6;
        width: 26px;
        height: 26px;
        border-radius: 4px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        font-weight: 700;
      }
      .__eq_dbg_btn_win__:hover {
        background: rgba(255,255,255,0.08);
        color: #e8eaed;
      }
      #__eq_win_close__:hover {
        background: #c5221f;
        color: #fff;
      }

      .__eq_dbg_body__ {
        flex: 1;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        background: #202124;
        position: relative;
        user-select: text;
      }

      /* Console Toolbar */
      .__eq_dbg_toolbar__ {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 6px 10px;
        border-bottom: 1px solid #3c4043;
        background: #25262a;
        gap: 8px;
      }
      .__eq_dbg_chips__ {
        display: flex;
        align-items: center;
        gap: 4px;
        overflow-x: auto;
      }
      .__eq_dbg_chip__ {
        background: #2f3034;
        border: 1px solid #3c4043;
        color: #bdc1c6;
        font-size: 11px;
        padding: 2px 8px;
        border-radius: 12px;
        cursor: pointer;
        white-space: nowrap;
      }
      .__eq_dbg_chip__.active {
        background: #394457;
        border-color: #8ab4f8;
        color: #8ab4f8;
        font-weight: 600;
      }

      .__eq_dbg_actions__ {
        display: flex;
        align-items: center;
        gap: 4px;
      }

      .__eq_dbg_iconbtn__ {
        background: transparent;
        border: none;
        color: #9aa0a6;
        width: 24px;
        height: 24px;
        border-radius: 4px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 13px;
      }
      .__eq_dbg_iconbtn__:hover {
        background: rgba(255,255,255,0.08);
        color: #e8eaed;
      }
      .__eq_dbg_iconbtn__.active {
        color: #8ab4f8;
      }

      /* Terminal */
      .__eq_dbg_terminal__ {
        flex: 1;
        overflow-y: auto;
        padding: 8px 10px;
        font-family: 'JetBrains Mono', 'Consolas', 'Courier New', monospace;
        font-size: 11.5px;
        line-height: 1.5;
        background: #191a1c;
      }
      .__eq_dbg_line__ {
        display: flex;
        align-items: flex-start;
        gap: 8px;
        padding: 2px 0;
        border-bottom: 1px solid rgba(255,255,255,0.03);
        word-break: break-all;
      }
      .__eq_dbg_time__ {
        color: #5f6368;
        font-size: 10px;
        white-space: nowrap;
        padding-top: 1px;
      }
      .__eq_dbg_badge__ {
        font-size: 9.5px;
        font-weight: 700;
        padding: 1px 5px;
        border-radius: 3px;
        white-space: nowrap;
        line-height: 1.3;
      }
      .__eq_dbg_msg__ {
        flex: 1;
        color: #e8eaed;
      }
      .__eq_dbg_detail_btn__ {
        color: #8ab4f8;
        cursor: pointer;
        font-size: 10px;
      }
      .__eq_dbg_detail_pre__ {
        margin: 4px 0 2px 20px;
        background: #111;
        border: 1px solid #333;
        padding: 6px;
        border-radius: 4px;
        color: #bdc1c6;
        font-size: 10.5px;
        white-space: pre-wrap;
      }

      /* Categorias Colors */
      .__eq_bg_sys__   { background: #3c4043; color: #bdc1c6; }
      .__eq_bg_ai__    { background: #1a3e68; color: #8ab4f8; }
      .__eq_bg_flow__  { background: #0d4a36; color: #81c995; }
      .__eq_bg_dom__   { background: #4a2800; color: #fdd663; }
      .__eq_bg_action__{ background: #372458; color: #c58af9; }
      .__eq_bg_key__   { background: #2b3a4a; color: #78d9ec; }
      .__eq_bg_click__ { background: #2b3a4a; color: #78d9ec; }
      .__eq_bg_warn__  { background: #5c3b00; color: #fdd663; }
      .__eq_bg_error__ { background: #5c1d1d; color: #f28b82; }
      .__eq_bg_replan__{ background: #4a2800; color: #ffb86c; }

      .__eq_cat_error__ { background: rgba(234,67,53,0.1); }
      .__eq_cat_warn__  { background: rgba(251,188,4,0.06); }
      .__eq_cat_replan__{ background: rgba(255,184,108,0.08); }

      /* Flow List */
      .__eq_dbg_flow_header__ {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 8px 12px;
        background: #25262a;
        border-bottom: 1px solid #3c4043;
        font-size: 12px;
      }
      .__eq_dbg_flow_list__ {
        flex: 1;
        overflow-y: auto;
        padding: 10px;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .__eq_flow_card__ {
        background: #25262a;
        border: 1px solid #3c4043;
        border-radius: 6px;
        padding: 9px 12px;
        display: flex;
        flex-direction: column;
        gap: 6px;
      }
      .__eq_flow_active__ {
        border-color: #8ab4f8;
        background: rgba(138,180,248,0.06);
        box-shadow: 0 0 8px rgba(138,180,248,0.15);
      }
      .__eq_flow_header__ {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 11px;
      }
      .__eq_flow_num__ { font-weight: 700; color: #e8eaed; }
      .__eq_flow_trigger__ { background: #3c4043; color: #bdc1c6; padding: 1px 6px; border-radius: 4px; font-size: 10px; }
      .__eq_flow_type__ { background: #1a3e68; color: #8ab4f8; padding: 1px 6px; border-radius: 4px; font-size: 10px; font-weight: 700; }
      .__eq_flow_status__ { margin-left: auto; }
      .__eq_status_done__ { color: #81c995; font-weight: 600; }
      .__eq_status_active__ { color: #8ab4f8; font-weight: 700; }
      .__eq_status_failed__ { color: #f28b82; font-weight: 700; }
      .__eq_status_pending__ { color: #70757a; }
      .__eq_flow_content__ { font-size: 11.5px; }
      .__eq_flow_target__ { font-family: monospace; font-weight: 600; color: #bdc1c6; }
      .__eq_flow_hint__ { color: #9aa0a6; font-size: 10.5px; margin-top: 2px; }
      .__eq_flow_err__ { color: #f28b82; font-size: 10.5px; margin-top: 3px; font-weight: 600; }
      .__eq_flow_actions__ { display: flex; justify-content: flex-end; }

      .__eq_dbg_btn__ {
        background: #2f3034;
        border: 1px solid #3c4043;
        color: #e8eaed;
        font-size: 11px;
        padding: 4px 10px;
        border-radius: 4px;
        cursor: pointer;
        transition: background 0.1s;
      }
      .__eq_dbg_btn__:hover { background: #3c4043; }
      .__eq_btn_primary__ {
        background: #1a73e8;
        border-color: #1a73e8;
        color: #fff;
        font-weight: 600;
      }
      .__eq_btn_primary__:hover { background: #1b66ca; }

      /* Pill Minimizada */
      #__eq_dbg_pill__ {
        position: fixed;
        right: 20px;
        bottom: 20px;
        height: 28px;
        background: rgba(32,33,36,0.92);
        backdrop-filter: blur(8px);
        border: 1px solid #3c4043;
        border-radius: 14px;
        padding: 0 12px;
        display: flex;
        align-items: center;
        gap: 6px;
        color: #e8eaed;
        font-family: system-ui, -apple-system, sans-serif;
        font-size: 11.5px;
        font-weight: 600;
        cursor: pointer;
        z-index: 2147483645;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        transition: transform 0.15s, border-color 0.15s;
        user-select: none;
      }
      #__eq_dbg_pill__:hover {
        transform: translateY(-2px);
        border-color: #8ab4f8;
      }
      .__eq_pill_dot__ {
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: #81c995;
        box-shadow: 0 0 6px #81c995;
      }

      .__eq_dbg_empty__ {
        padding: 24px;
        text-align: center;
        color: #70757a;
        font-size: 12px;
      }
    `
    document.documentElement.appendChild(s)
  }

  destroy(): void {
    window.removeEventListener('mousemove', this.boundMouseMove)
    window.removeEventListener('mouseup', this.boundMouseUp)
    this.el?.remove()
    this.pillEl?.remove()
    document.getElementById('__eq_dbg_style__')?.remove()
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
