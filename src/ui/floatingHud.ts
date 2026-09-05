import type { AnalysisPlan } from '../core/types'
import { ICONS } from './icons'
import { cleanSearchTerm } from '../dom/executor'

export class FloatingAnswersHud {
  private element: HTMLElement | null = null
  private shadow: ShadowRoot
  private isMinimized = false
  private currentPlan: AnalysisPlan | null = null
  private isDragging = false
  private dragStartX = 0
  private dragStartY = 0
  private initialLeft = 25
  private initialTop = 25
  private onAdvanceCallback?: () => void

  constructor(shadow: ShadowRoot, onAdvance?: () => void) {
    this.shadow = shadow
    this.onAdvanceCallback = onAdvance
    this.initGlobalListeners()
  }

  private initGlobalListeners(): void {
    // Detecta navegação nativa do usuário (SPA ou clique de avanço)
    window.addEventListener('popstate', () => this.handlePageNavigated())
    window.addEventListener('hashchange', () => this.handlePageNavigated())
  }

  private handlePageNavigated(): void {
    if (this.isOpen()) {
      this.hide()
      this.onAdvanceCallback?.()
    }
  }

  public isOpen(): boolean {
    return this.element !== null && this.element.style.display !== 'none'
  }

  public show(plan: AnalysisPlan): void {
    this.currentPlan = plan
    if (!this.element) {
      this.createElement()
    }
    this.renderContent()
    if (this.element) {
      this.element.style.display = 'flex'
    }
  }

  public hide(): void {
    if (this.element) {
      this.element.style.display = 'none'
    }
  }

  public minimize(): void {
    this.isMinimized = true
    if (this.element) {
      this.element.classList.add('minimized')
    }
  }

  public restore(): void {
    this.isMinimized = false
    if (this.element) {
      this.element.classList.remove('minimized')
    }
  }

  private createElement(): void {
    this.element = document.createElement('div')
    this.element.className = 'eq-floating-hud'
    this.element.style.left = `${this.initialLeft}px`
    this.element.style.top = `${this.initialTop}px`

    this.element.innerHTML = `
      <!-- Pílula compacta quando minimizado -->
      <div class="eq-fah-pill" id="eq-fah-pill" title="Clique para expandir gabarito interativo">
        <span class="eq-fah-pill-icon">${ICONS.list}</span>
        <span id="eq-fah-pill-text">Gabarito Manual</span>
        <span class="eq-fah-pill-badge" id="eq-fah-pill-badge">0</span>
      </div>

      <!-- Cabeçalho com barra de arraste -->
      <div class="eq-fah-header" id="eq-fah-header">
        <div class="eq-fah-title">
          <span style="display:flex; align-items:center;">${ICONS.dragHandle}</span>
          <span>Gabarito Manual Interativo</span>
        </div>
        <div class="eq-fah-actions">
          <button class="eq-fah-btn" id="eq-fah-copy-md-btn" title="Copiar tudo formatado em Markdown">${ICONS.copy}</button>
          <button class="eq-fah-btn" id="eq-fah-min-btn" title="Minimizar para pílula flutuante">${ICONS.minimize}</button>
          <button class="eq-fah-btn" id="eq-fah-close-btn" title="Fechar gabarito">${ICONS.close}</button>
        </div>
      </div>

      <!-- Corpo com as respostas organizadas -->
      <div class="eq-fah-body" id="eq-fah-body"></div>

      <!-- Rodapé com dica de avanço automático e botão de cópia -->
      <div class="eq-fah-footer">
        <div class="eq-fah-footer-hint">
          <span style="color:#00ffcc; font-size:12px;">●</span>
          <span>Fechamento automático ao avançar</span>
        </div>
        <button class="eq-fah-copy-all" id="eq-fah-copy-all-btn">Copiar Markdown</button>
      </div>
    `

    this.shadow.appendChild(this.element)

    // Eventos de Minimizar / Restaurar / Fechar
    const pill = this.element.querySelector('#eq-fah-pill') as HTMLElement
    pill.addEventListener('click', () => this.restore())

    const minBtn = this.element.querySelector('#eq-fah-min-btn') as HTMLElement
    minBtn.addEventListener('click', () => this.minimize())

    const closeBtn = this.element.querySelector('#eq-fah-close-btn') as HTMLElement
    closeBtn.addEventListener('click', () => this.hide())

    const copyMdBtn = this.element.querySelector('#eq-fah-copy-md-btn') as HTMLElement
    copyMdBtn.addEventListener('click', () => this.copyMarkdownToClipboard(copyMdBtn))

    const copyAllBtn = this.element.querySelector('#eq-fah-copy-all-btn') as HTMLElement
    copyAllBtn.addEventListener('click', () => this.copyMarkdownToClipboard(copyAllBtn))

    // Drag & Drop no Header
    const header = this.element.querySelector('#eq-fah-header') as HTMLElement
    this.setupDraggable(header)
  }

  private setupDraggable(handle: HTMLElement): void {
    const onMouseDown = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('.eq-fah-btn')) return
      e.preventDefault()
      this.isDragging = true
      this.dragStartX = e.clientX
      this.dragStartY = e.clientY

      const rect = this.element!.getBoundingClientRect()
      this.initialLeft = rect.left
      this.initialTop = rect.top

      const onMouseMove = (moveEvent: MouseEvent) => {
        if (!this.isDragging || !this.element) return
        const deltaX = moveEvent.clientX - this.dragStartX
        const deltaY = moveEvent.clientY - this.dragStartY

        const maxLeft = Math.max(10, window.innerWidth - this.element.offsetWidth - 10)
        const maxTop = Math.max(10, window.innerHeight - this.element.offsetHeight - 10)

        const newLeft = Math.min(Math.max(10, this.initialLeft + deltaX), maxLeft)
        const newTop = Math.min(Math.max(10, this.initialTop + deltaY), maxTop)

        this.element.style.left = `${newLeft}px`
        this.element.style.top = `${newTop}px`
      }

      const onMouseUp = () => {
        this.isDragging = false
        window.removeEventListener('mousemove', onMouseMove)
        window.removeEventListener('mouseup', onMouseUp)
      }

      window.addEventListener('mousemove', onMouseMove)
      window.addEventListener('mouseup', onMouseUp)
    }

    handle.addEventListener('mousedown', onMouseDown)
  }

  private renderContent(): void {
    if (!this.element || !this.currentPlan) return

    const body = this.element.querySelector('#eq-fah-body') as HTMLElement
    const pillText = this.element.querySelector('#eq-fah-pill-text') as HTMLElement
    const pillBadge = this.element.querySelector('#eq-fah-pill-badge') as HTMLElement
    body.innerHTML = ''

    const plan = this.currentPlan
    const dragActions = plan.actions.filter((a) => a.t === 'drag')
    const valActions = plan.actions.filter((a) => a.t === 'val')
    const choiceActions = plan.actions.filter((a) => a.t === 'clk' || a.t === 'chk')

    let totalAnswersCount = dragActions.length || valActions.length || choiceActions.length

    // Meta cabeçalho
    const meta = document.createElement('div')
    meta.className = 'eq-fah-meta'
    meta.innerHTML = `
      <span>Modo: <strong style="color:#ffffff;">${plan.mode.replace('_', ' ')}</strong></span>
      <span class="eq-fah-meta-badge">${Math.round(plan.confidence * 100)}% Confiança</span>
    `
    body.appendChild(meta)

    // 1. MODO: CATEGORIZAÇÃO / ARRASTAR E SOLTAR
    if (dragActions.length > 0 || plan.mode === 'categorizacao' || plan.mode === 'arrastar_soltar') {
      pillText.textContent = `Categorização (${dragActions.length} itens)`
      pillBadge.textContent = String(dragActions.length)

      // Agrupa por categoria de destino
      const groups: Record<string, string[]> = {}
      for (const act of dragActions) {
        const cat = cleanSearchTerm(act.to) || 'Geral'
        if (!groups[cat]) groups[cat] = []
        groups[cat].push(cleanSearchTerm(act.from))
      }

      for (const [catName, items] of Object.entries(groups)) {
        const groupEl = document.createElement('div')
        const isFato = /fato|true|verdadeiro|sim/i.test(catName)
        const isOpiniao = /opini[aã]o|false|falso|n[aã]o/i.test(catName)
        groupEl.className = `eq-fah-group ${isFato ? 'group-fato' : isOpiniao ? 'group-opiniao' : ''}`

        const groupTitle = document.createElement('div')
        groupTitle.className = 'eq-fah-group-title'
        groupTitle.innerHTML = `<span>📁</span> <span>${catName} (${items.length})</span>`
        groupEl.appendChild(groupTitle)

        const itemsContainer = document.createElement('div')
        itemsContainer.className = 'eq-fah-group-items'

        for (const itemText of items) {
          const itemEl = document.createElement('div')
          itemEl.className = 'eq-fah-item'

          const textSpan = document.createElement('span')
          textSpan.className = 'eq-fah-item-text'
          textSpan.textContent = itemText
          itemEl.appendChild(textSpan)

          const copyBtn = document.createElement('button')
          copyBtn.className = 'eq-fah-copy-inline'
          copyBtn.textContent = 'Copiar'
          copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(itemText)
            copyBtn.textContent = '✓ Copiado'
            setTimeout(() => (copyBtn.textContent = 'Copiar'), 1200)
          })
          itemEl.appendChild(copyBtn)

          itemsContainer.appendChild(itemEl)
        }

        groupEl.appendChild(itemsContainer)
        body.appendChild(groupEl)
      }
    }
    // 2. MODO: PREENCHIMENTO DE LACUNAS / TEXTO
    else if (valActions.length > 0) {
      pillText.textContent = `Preenchimento (${valActions.length} campos)`
      pillBadge.textContent = String(valActions.length)

      const groupEl = document.createElement('div')
      groupEl.className = 'eq-fah-group'

      const groupTitle = document.createElement('div')
      groupTitle.className = 'eq-fah-group-title'
      groupTitle.textContent = 'Respostas para Inserir:'
      groupEl.appendChild(groupTitle)

      const itemsContainer = document.createElement('div')
      itemsContainer.className = 'eq-fah-group-items'

      for (const act of valActions) {
        const itemEl = document.createElement('div')
        itemEl.className = 'eq-fah-item'

        const textSpan = document.createElement('span')
        textSpan.className = 'eq-fah-item-text'
        const label = cleanSearchTerm(act.id)
        textSpan.innerHTML = `${label ? `<strong>${label}:</strong> ` : ''}<code style="color:#00ffcc; background:rgba(0,255,204,0.1); padding:1px 4px; border-radius:3px;">${act.v}</code>`
        itemEl.appendChild(textSpan)

        const copyBtn = document.createElement('button')
        copyBtn.className = 'eq-fah-copy-inline'
        copyBtn.textContent = 'Copiar'
        copyBtn.addEventListener('click', () => {
          navigator.clipboard.writeText(String(act.v))
          copyBtn.textContent = '✓ Copiado'
          setTimeout(() => (copyBtn.textContent = 'Copiar'), 1200)
        })
        itemEl.appendChild(copyBtn)

        itemsContainer.appendChild(itemEl)
      }

      groupEl.appendChild(itemsContainer)
      body.appendChild(groupEl)
    }
    // 3. MODO: MÚLTIPLA ESCOLHA / CHECKBOX
    else if (choiceActions.length > 0) {
      pillText.textContent = `Opções (${choiceActions.length} marcadas)`
      pillBadge.textContent = String(choiceActions.length)

      const groupEl = document.createElement('div')
      groupEl.className = 'eq-fah-group'

      const groupTitle = document.createElement('div')
      groupTitle.className = 'eq-fah-group-title'
      groupTitle.textContent = 'Alternativa(s) Correta(s):'
      groupEl.appendChild(groupTitle)

      const itemsContainer = document.createElement('div')
      itemsContainer.className = 'eq-fah-group-items'

      for (const act of choiceActions) {
        const itemEl = document.createElement('div')
        itemEl.className = 'eq-fah-item'

        const textSpan = document.createElement('span')
        textSpan.className = 'eq-fah-item-text'
        const choiceText = cleanSearchTerm(act.id)
        textSpan.innerHTML = `<span style="color:#00ffcc; font-weight:bold; margin-right:4px;">☑</span> ${choiceText}`
        itemEl.appendChild(textSpan)

        const copyBtn = document.createElement('button')
        copyBtn.className = 'eq-fah-copy-inline'
        copyBtn.textContent = 'Copiar'
        copyBtn.addEventListener('click', () => {
          navigator.clipboard.writeText(choiceText)
          copyBtn.textContent = '✓ Copiado'
          setTimeout(() => (copyBtn.textContent = 'Copiar'), 1200)
        })
        itemEl.appendChild(copyBtn)

        itemsContainer.appendChild(itemEl)
      }

      groupEl.appendChild(itemsContainer)
      body.appendChild(groupEl)
    } else {
      pillText.textContent = 'Gabarito'
      pillBadge.textContent = '0'
      body.innerHTML += '<div style="padding:10px; color:#888;">Nenhuma resposta direta para exibir.</div>'
    }

    // Explicação / Raciocínio da IA
    if (plan.rationale) {
      const ratEl = document.createElement('div')
      ratEl.className = 'eq-fah-rationale'
      ratEl.innerHTML = `<strong>💡 Raciocínio da IA:</strong> ${plan.rationale}`
      body.appendChild(ratEl)
    }
  }

  public generateMarkdown(): string {
    if (!this.currentPlan) return ''
    const plan = this.currentPlan
    const lines: string[] = []

    lines.push(`# Gabarito da Questão — EasyQuiz Pro`)
    lines.push(`- **Modo:** ${plan.mode}`)
    lines.push(`- **Confiança:** ${(plan.confidence * 100).toFixed(0)}%`)
    lines.push('')

    const dragActions = plan.actions.filter((a) => a.t === 'drag')
    const valActions = plan.actions.filter((a) => a.t === 'val')
    const choiceActions = plan.actions.filter((a) => a.t === 'clk' || a.t === 'chk')

    if (dragActions.length > 0) {
      lines.push(`## 📂 Categorização:`)
      const groups: Record<string, string[]> = {}
      for (const act of dragActions) {
        const cat = cleanSearchTerm(act.to) || 'Geral'
        if (!groups[cat]) groups[cat] = []
        groups[cat].push(cleanSearchTerm(act.from))
      }
      for (const [cat, items] of Object.entries(groups)) {
        lines.push(`### Categoria: ${cat}`)
        for (const it of items) {
          lines.push(`- ${it}`)
        }
        lines.push('')
      }
    } else if (valActions.length > 0) {
      lines.push(`## ✏️ Respostas para Preenchimento:`)
      for (const act of valActions) {
        const label = cleanSearchTerm(act.id)
        lines.push(`- **${label || 'Campo'}:** \`${act.v}\``)
      }
      lines.push('')
    } else if (choiceActions.length > 0) {
      lines.push(`## ✅ Alternativas Corretas:`)
      for (const act of choiceActions) {
        lines.push(`- [x] ${cleanSearchTerm(act.id)}`)
      }
      lines.push('')
    }

    if (plan.rationale) {
      lines.push(`---`)
      lines.push(`**💡 Raciocínio:** ${plan.rationale}`)
    }

    return lines.join('\n')
  }

  private copyMarkdownToClipboard(btn: HTMLElement): void {
    const md = this.generateMarkdown()
    if (!md) return
    navigator.clipboard.writeText(md).then(() => {
      const originalText = btn.textContent
      btn.textContent = '✓ Copiado!'
      setTimeout(() => {
        btn.textContent = originalText
      }, 1500)
    })
  }
}
