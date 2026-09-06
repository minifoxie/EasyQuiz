import type { AnalysisPlan } from '../core/types'
import { ICONS } from './icons'
import { cleanSearchTerm, getHumanReadableLabel } from '../dom/executor'

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

    // Detecta clique do usuário em botões de avanço da plataforma hospedeira
    document.addEventListener(
      'click',
      (e) => {
        if (!this.isOpen()) return
        const target = e.target as HTMLElement | null
        if (!target) return
        if (this.shadow.contains(target) || target.closest('#easyquiz-shadow-root')) return

        const navBtn = target.closest('button, [role="button"], a, input[type="submit"]')
        if (navBtn) {
          const text = (navBtn.textContent || (navBtn as HTMLInputElement).value || '').toLowerCase()
          const isAdvance = /pr[oó]xim|avan[cç]|continu|verific|enviar|submit|confirm|checar|validar|next/i.test(text)
          if (isAdvance) {
            setTimeout(() => {
              if (this.isOpen()) {
                this.handlePageNavigated()
              }
            }, 800)
          }
        }
      },
      true,
    )
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
    const valActions = plan.actions.filter((a): a is { t: 'val'; id: string; v: any } => {
      if (a.t !== 'val') return false
      const label = cleanSearchTerm((a as any).id || '').toLowerCase()
      return !/continu|avan[cç]|pr[oó]xim|submet|enviar|check|verific/i.test(label)
    })
    const choiceActions = plan.actions.filter((a) => a.t === 'clk' || a.t === 'chk')

    let totalAnswersCount = dragActions.length || valActions.length || choiceActions.length

    // Meta cabeçalho
    const meta = document.createElement('div')
    meta.className = 'eq-fah-meta'
    const mode = document.createElement('span')
    mode.textContent = `Modo: ${plan.mode.replace('_', ' ')}`
    const confidence = document.createElement('span')
    confidence.className = 'eq-fah-meta-badge'
    confidence.textContent = `${Math.round(plan.confidence * 100)}% Confiança`
    meta.append(mode, confidence)
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
        groupTitle.textContent = `📁 ${catName} (${items.length})`
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
      groupTitle.textContent = '📝 Respostas para os Campos de Texto:'
      groupEl.appendChild(groupTitle)

      const itemsContainer = document.createElement('div')
      itemsContainer.className = 'eq-fah-group-items'

      for (let i = 0; i < valActions.length; i++) {
        const act = valActions[i]
        const itemEl = document.createElement('div')
        itemEl.className = 'eq-fah-item'

        let rawLabel = getHumanReadableLabel(act.id)
        if (!rawLabel || /^[#\.\$]|input|mat-|cell|field|q[0-9]|eq-/i.test(rawLabel)) {
          rawLabel = `Campo ${i + 1}`
        }
        const fieldVal = String(act.v ?? '')

        const box = document.createElement('div')
        box.className = 'eq-fah-field-box'

        const labelEl = document.createElement('div')
        labelEl.className = 'eq-fah-field-label'
        labelEl.textContent = rawLabel
        box.appendChild(labelEl)

        const valEl = document.createElement('div')
        valEl.className = 'eq-fah-field-val'
        valEl.textContent = fieldVal
        box.appendChild(valEl)

        itemEl.appendChild(box)

        const copyBtn = document.createElement('button')
        copyBtn.className = 'eq-fah-copy-inline'
        copyBtn.textContent = 'Copiar'
        copyBtn.addEventListener('click', () => {
          navigator.clipboard.writeText(fieldVal)
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
      groupTitle.textContent = '🎯 Alternativa(s) Correta(s):'
      groupEl.appendChild(groupTitle)

      const itemsContainer = document.createElement('div')
      itemsContainer.className = 'eq-fah-group-items'

      for (let i = 0; i < choiceActions.length; i++) {
        const act = choiceActions[i]
        const itemEl = document.createElement('div')
        itemEl.className = 'eq-fah-item'

        let choiceText = getHumanReadableLabel(act.id)
        if ((!choiceText || /^(eq-|#|\$|\.|input_|mat-|choice_|radio_|chk_)/i.test(choiceText)) && (act as any).v) {
          choiceText = String((act as any).v)
        }
        choiceText = cleanSearchTerm(choiceText)
        if (/^(eq-|#|\$|\.|input_|mat-|choice_|radio_|chk_)/i.test(choiceText)) {
          choiceText = ''
        }

        // Extrai letra de alternativa caso exista (ex: "A", "B", "(C)", "1.")
        let letter = ''
        const match = choiceText.match(/^(\([A-Za-z0-9]\)|[A-Za-z0-9][\)\.\:\-])\s*(.*)$/)
        if (match) {
          letter = match[1].replace(/[\(\)\.\:\-\s]/g, '').toUpperCase()
          choiceText = match[2].trim() || choiceText
        } else if (choiceActions.length > 1) {
          letter = String.fromCharCode(65 + i)
        }

        const contentWrap = document.createElement('div')
        contentWrap.style.display = 'flex'
        contentWrap.style.alignItems = 'center'
        contentWrap.style.gap = '8px'
        contentWrap.style.flex = '1'

        if (letter) {
          const badge = document.createElement('span')
          badge.className = 'eq-fah-letter-badge'
          badge.textContent = letter
          contentWrap.appendChild(badge)
        }

        const textSpan = document.createElement('span')
        textSpan.className = 'eq-fah-item-text'
        textSpan.textContent = choiceText || (letter ? `Alternativa ${letter}` : `Alternativa Selecionada`)
        contentWrap.appendChild(textSpan)

        itemEl.appendChild(contentWrap)

        const copyBtn = document.createElement('button')
        copyBtn.className = 'eq-fah-copy-inline'
        copyBtn.textContent = 'Copiar'
        copyBtn.addEventListener('click', () => {
          navigator.clipboard.writeText(choiceText || letter)
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
      const empty = document.createElement('div')
      empty.style.padding = '10px'
      empty.style.color = '#888'
      empty.textContent = 'Nenhuma resposta direta para exibir.'
      body.appendChild(empty)
    }

    // Explicação / Raciocínio da IA
    if (plan.rationale) {
      const ratEl = document.createElement('div')
      ratEl.className = 'eq-fah-rationale'
      ratEl.textContent = `💡 Raciocínio da IA: ${plan.rationale}`
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
      const originalHtml = btn.innerHTML
      if (btn.id === 'eq-fah-copy-md-btn') {
        btn.innerHTML = '<span style="font-size:10px; color:#00ffcc; font-weight:bold;">✓</span>'
      } else {
        btn.innerHTML = '✓ Copiado!'
      }
      setTimeout(() => {
        btn.innerHTML = originalHtml
      }, 1500)
    })
  }
}
