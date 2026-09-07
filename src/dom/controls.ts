import type { ControlDescriptor } from '../core/types'

export const CONTROL_SELECTOR = [
  'input:not([type="hidden"])',
  'textarea',
  'select',
  'button',
  'a',
  'label',
  '[role="button"]',
  '[role="link"]',
  '[role="radio"]',
  '[role="checkbox"]',
  '[role="option"]',
  '[role="treeitem"]',
  '[role="menuitemcheckbox"]',
  '[role="menuitemradio"]',
  '[contenteditable="true"]',
  '[draggable="true"]',
  '[aria-grabbed]',
  '[aria-dropeffect]',
  '[data-widget-type]',
  '.perseus-drag-item',
  '.sortable-item',
  '[data-testid*="drag" i]',
  '[data-testid*="card" i]',
  '[data-testid*="option" i]',
  '[data-testid*="choice" i]',
  '[data-testid*="category" i]',
  '[data-choice]',
  '[data-option]',
  '[data-answer]',
  '[data-value]',
  '.quiz-option',
  '.option-card',
  '.choice-card',
  '[class*="option-card" i]',
  '[class*="choice-card" i]',
  '[class*="option-item" i]',
  '[class*="choice-item" i]',
  '[class*="answer-item" i]',
  '[class*="alternative" i]',
  'li[class*="choice" i]',
  'li[class*="option" i]',
  'li[class*="answer" i]',
  '[data-role="dropzone"]',
  '[data-category]',
].join(',')

export const NAVIGATION_PATTERN =
  /(verificar|checar|check|conferir|validar|próxim[oa]|next|continuar|continue|avançar|prosseguir|enviar|submit|concluir|finalizar|terminar|começar|iniciar|start|vamos lá|próxima tarefa|next task|próxima pergunta|next question|marcar como concluíd[oa]|mostrar resumo|entendi|compreendi|ok|leitura concluída|seguir|ir para o exercício|fazer o teste|próximo artigo|ir para a aula)/i

let idSequence = 0

function isVisibleBasic(node: HTMLElement): boolean {
  try {
    const hiddenAncestor = node.closest('[hidden], [style*="display: none"], [style*="display:none"], [aria-hidden="true"]')
    if (hiddenAncestor && !isInsideEasyQuiz(hiddenAncestor as HTMLElement)) {
      return false
    }
  } catch {}

  try {
    const style = window.getComputedStyle ? window.getComputedStyle(node) : (node.style as any)
    if (style) {
      if (style.display === 'none' || style.visibility === 'hidden') {
        return false
      }
    }
  } catch {}

  try {
    if (typeof node.getBoundingClientRect === 'function') {
      const rect = node.getBoundingClientRect()
      if (rect.width > 0 || rect.height > 0) {
        return true
      }
    }
  } catch {}

  return (node.textContent || '').trim().length > 0
}

export function safeCssEscape(val: string): string {
  try {
    if (typeof CSS !== 'undefined' && typeof CSS.escape === 'function') {
      return CSS.escape(val)
    }
  } catch {}
  return String(val).replace(/["\\]/g, '\\$&')
}

export function isVisible(element: Element): boolean {
  const node = element as HTMLElement
  if (!node) return false
  if (typeof node.isConnected === 'boolean' && !node.isConnected) return false
  if (isInsideEasyQuiz(node)) return false

  const tag = node.tagName?.toLowerCase()

  // 1. SUPORTE ESSENCIAL PARA INPUTS ACESSÍVEIS (Checkboxes e Radios estilizados com opacity:0 / width:0)
  if (['input', 'select', 'textarea', 'button'].includes(tag)) {
    const inputType = (node as HTMLInputElement).type?.toLowerCase()
    if (inputType === 'checkbox' || inputType === 'radio') {
      if (node.id) {
        try {
          const linkedLabel = node.ownerDocument?.querySelector(`label[for="${safeCssEscape(node.id)}"]`) as HTMLElement | null
          if (linkedLabel && isVisibleBasic(linkedLabel)) return true
        } catch {}
      }
      const parentOption = node.closest(
        'label, .option-card, .quiz-option, .choice, .answer, [role="radio"], [role="checkbox"], [class*="option" i], [class*="choice" i], [class*="item" i], li, tr',
      ) as HTMLElement | null
      if (parentOption && parentOption !== node) {
        if (isVisibleBasic(parentOption)) return true
      }
    }

    // Controles de formulário (text inputs, textareas, selects, buttons) não contêm nós de texto internos.
    // Em JSDOM ou renderizadores sem reflow (onde getBoundingClientRect retorna 0x0), eles são visíveis
    // desde que não estejam ocultos por display:none, visibility:hidden, hidden ou aria-hidden.
    try {
      const hiddenAncestor = node.closest('[hidden], [style*="display: none"], [style*="display:none"], [aria-hidden="true"]')
      if (!hiddenAncestor) {
        const style = window.getComputedStyle ? window.getComputedStyle(node) : (node.style as any)
        if (!style || (style.display !== 'none' && style.visibility !== 'hidden')) {
          if (typeof node.getBoundingClientRect === 'function') {
            const rect = node.getBoundingClientRect()
            if (rect.width > 0 || rect.height > 0) return true
          }
          return true
        }
      }
    } catch {}
  }

  return isVisibleBasic(node)
}

export function safeString(value: any): string {
  if (value === null || value === undefined) return ''
  if (typeof value === 'string') return value
  if (typeof value === 'number' || typeof value === 'boolean') return String(value)
  if (value instanceof Node) return value.textContent || ''
  try {
    if (typeof value?.toString === 'function') {
      const res = value.toString()
      if (typeof res === 'string') return res
    }
  } catch {}
  return ''
}

export function cleanText(value: any, max = 500): string {
  const str = safeString(value)
  return str.replace(/\s+/g, ' ').trim().slice(0, max)
}

export function easyQuizId(element: HTMLElement): string {
  const existing = element.dataset.easyquizId
  if (existing) return existing
  const id = `eq-${Date.now().toString(36)}-${(idSequence += 1).toString(36)}`
  element.dataset.easyquizId = id
  return id
}

export function isInsideEasyQuiz(el: Element | null): boolean {
  if (!el) return false
  return Boolean(
    el.closest(
      '#easyquiz-shadow-root, .eq-sidebar, .eq-launcher, [data-easyquiz-ignore="true"], .btn-inject-eq, #btn-inject-script',
    ) || el.getAttribute?.('data-easyquiz-ignore') === 'true',
  )
}

export const UTILITY_CONTROL_PATTERN =
  /(leaderboard|scoreboard|placar|ranking|trophy|pause|pausar|mute|volume|audio|sound|som|música|music|configuraç|settings|theme|ajuda|help|report|denunciar|feedback|power-?up|streak|coins|fullscreen|full-screen)/i

export function isUtilityOrGamificationControl(element: Element | null): boolean {
  if (!element || typeof (element as any).getAttribute !== 'function') return false
  if (typeof Element !== 'undefined' && !(element instanceof Element)) return false
  if (isInsideEasyQuiz(element)) return true

  const target = element.closest?.(
    'button, a, [role="button"], [class*="leaderboard" i], [data-testid*="leaderboard" i], [class*="scoreboard" i], [class*="trophy" i]',
  )
  const el = target || element

  const testId = String(
    el.getAttribute?.('data-testid') ||
      el.getAttribute?.('data-test-id') ||
      el.getAttribute?.('id') ||
      '',
  )
  const aria = String(el.getAttribute?.('aria-label') || '')
  const title = String(el.getAttribute?.('title') || '')
  const className = typeof el.className === 'string' ? el.className : (typeof (el as any).className?.baseVal === 'string' ? (el as any).className.baseVal : '')
  const text = cleanText(el.textContent, 60)

  if (
    UTILITY_CONTROL_PATTERN.test(testId) ||
    UTILITY_CONTROL_PATTERN.test(aria) ||
    UTILITY_CONTROL_PATTERN.test(title) ||
    UTILITY_CONTROL_PATTERN.test(className)
  ) {
    return true
  }

  if (text.length > 0 && text.length <= 25 && UTILITY_CONTROL_PATTERN.test(text)) {
    return true
  }

  return false
}

export function isNavigationControl(element: Element | null): boolean {
  if (!element || typeof (element as any).getAttribute !== 'function') return false
  if (typeof Element !== 'undefined' && !(element instanceof Element)) return false
  if (isInsideEasyQuiz(element)) return false
  if (isUtilityOrGamificationControl(element)) return false

  // Se o elemento é uma opção/alternativa de resposta (card, choice, option), NUNCA é controle de navegação
  if (
    element.closest?.(
      '.option-card, .choice-card, .quiz-option, [class*="option-card" i], [class*="choice-card" i], [class*="option-item" i], [class*="choice-item" i], [class*="answer-item" i], [data-testid*="option" i], [data-testid*="choice" i], [data-choice], [data-option], [data-answer], [role="radio"], [role="checkbox"], [role="option"]',
    )
  ) {
    return false
  }

  // Botões de navegação da prova nunca ficam no cabeçalho ou barra de topo do site
  if (element.closest?.('header, nav, aside')) return false

  const rawValue =
    (typeof HTMLInputElement !== 'undefined' && element instanceof HTMLInputElement) ||
    (typeof HTMLButtonElement !== 'undefined' && element instanceof HTMLButtonElement)
      ? (element as any).value
      : ''
  const text = cleanText(
    element.getAttribute?.('aria-label') ||
      element.textContent ||
      element.getAttribute?.('value') ||
      rawValue,
  )
  const type = (element as any).type
  const testableText = text.replace(/[\d\(\)\[\]→\>\•\-\/\\]+/g, ' ').trim()
  const testId = String(
    element.getAttribute?.('data-testid') ||
      element.getAttribute?.('data-test-id') ||
      element.getAttribute?.('id') ||
      element.getAttribute?.('href') ||
      '',
  ).toLowerCase()

  return (
    NAVIGATION_PATTERN.test(testableText) ||
    NAVIGATION_PATTERN.test(text) ||
    type === 'submit' ||
    testId.includes('next') ||
    testId.includes('check') ||
    testId.includes('continue') ||
    testId.includes('proximo') ||
    testId.includes('forward') ||
    false
  )
}

export function labelForControl(element: HTMLElement): string {
  // 1. Contexto específico para tabelas (ex: Verdadeiro/Falso, matriz de julgamento)
  const tr = element.closest('tr')
  if (tr) {
    const rowHeader = tr.querySelector('th, td:first-child')
    const rowTitle = rowHeader && rowHeader !== element.closest('td') ? cleanText(rowHeader.textContent, 100) : ''
    const localText = cleanText(element.closest('label, td')?.textContent || '', 50)
    if (rowTitle && localText) {
      return `${rowTitle}: ${localText}`
    }
  }

  // 2. aria-label direto
  const aria = element.getAttribute('aria-label')
  if (aria) return cleanText(aria)

  // 3. aria-labelledby
  const labelledBy = element.getAttribute('aria-labelledby')
  if (labelledBy) {
    const text = labelledBy
      .split(/\s+/)
      .map((id) => document.getElementById(id)?.textContent)
      .filter(Boolean)
      .join(' ')
    if (text.trim()) return cleanText(text)
  }

  // 4. Labels associados nativamente
  if ('labels' in element && (element as HTMLInputElement).labels) {
    const labels = Array.from((element as HTMLInputElement).labels ?? [])
      .map((label) => label.textContent)
      .join(' ')
    if (labels.trim()) return cleanText(labels)
  }

  // 5. Se for radio/checkbox em container personalizado (Google Forms, Moodle, Khan, etc.)
  const parentContainer = element.closest(
    '.docssharedWizToggleLabeledContainer, [role="listitem"], .answer, label, .quiz-option, .form-check, .option-card',
  )
  if (parentContainer && parentContainer !== element) {
    const parentText = cleanText(parentContainer.textContent)
    if (parentText) return parentText
  }

  // 6. Placeholder ou título
  const rawVal = element instanceof HTMLInputElement || element instanceof HTMLButtonElement ? element.value : ''
  const fallback =
    element.getAttribute('placeholder') ||
    element.getAttribute('title') ||
    element.textContent ||
    rawVal ||
    ''

  return cleanText(fallback)
}

export function describeControl(element: HTMLElement, role: 'answer' | 'navigation'): ControlDescriptor {
  const isSelect = (typeof HTMLSelectElement !== 'undefined' && element instanceof HTMLSelectElement) || element.tagName.toLowerCase() === 'select'
  const select = isSelect ? (element as any) : null
  const input = element as HTMLInputElement
  element.dataset.easyquizRole = role

  const tagName = element.tagName.toLowerCase()
  const tag: ControlDescriptor['tag'] = ['input', 'textarea', 'select', 'button'].includes(tagName)
    ? (tagName as ControlDescriptor['tag'])
    : 'other'

  const customRole = element.getAttribute('role') || ''
  const testId = (element.getAttribute('data-testid') || element.getAttribute('data-test-id') || '').toLowerCase()
  const classStr = (element.className && typeof element.className === 'string' ? element.className : '').toLowerCase()

  const isDraggable =
    element.getAttribute('draggable') === 'true' ||
    element.classList.contains('perseus-drag-item') ||
    element.classList.contains('sortable-item') ||
    Boolean(element.getAttribute('aria-grabbed')) ||
    /drag|card|option|item/i.test(testId) ||
    /drag|card-item|sortable/i.test(classStr)

  const isDropzone =
    element.getAttribute('data-role') === 'dropzone' ||
    element.classList.contains('category-container') ||
    element.hasAttribute('data-category') ||
    Boolean(element.getAttribute('aria-dropeffect')) ||
    /drop|category|bucket/i.test(testId) ||
    /dropzone|category-box|bucket|target-zone/i.test(classStr)

  const widgetHint = isDraggable ? 'draggable' : isDropzone ? 'dropzone' : ''
  const inputType = cleanText(widgetHint || input.type || customRole || tag, 40)

  let currentValue = ''
  if (input.type === 'checkbox' || input.type === 'radio' || customRole === 'radio' || customRole === 'checkbox') {
    const isChecked = input.checked || element.getAttribute('aria-checked') === 'true'
    currentValue = isChecked ? 'checked' : 'unchecked'
  } else if (tag === 'button' || tagName === 'a' || role === 'navigation' || isNavigationControl(element)) {
    // Botões e links de navegação NÃO possuem valor de preenchimento de formulário!
    currentValue = ''
  } else {
    const rawVal = typeof (element as any).value === 'string' || typeof (element as any).value === 'number'
      ? (element as any).value
      : ''
    currentValue = cleanText(rawVal || element.getAttribute('data-category') || '', 2000)
  }

  const options: Array<{ value: string; label: string }> = []
  if (select && select.options) {
    for (const option of Array.from(select.options as HTMLCollectionOf<HTMLOptionElement>).slice(0, 80)) {
      options.push({
        value: cleanText(option.value),
        label: cleanText(option.textContent),
      })
    }
  } else if (customRole === 'combobox' || customRole === 'listbox' || classStr.includes('select') || classStr.includes('dropdown')) {
    const listboxId = element.getAttribute('aria-controls') || element.getAttribute('aria-owns')
    const listbox = listboxId ? document.getElementById(listboxId) : element
    if (listbox) {
      const childOptions = listbox.querySelectorAll('[role="option"], li, .dropdown-item, .option')
      for (const opt of Array.from(childOptions).slice(0, 80)) {
        const text = cleanText(opt.textContent)
        if (text) {
          options.push({
            value: (opt as HTMLElement).getAttribute('data-value') || (opt as HTMLElement).getAttribute('value') || text,
            label: text,
          })
        }
      }
    }
  }

  const required = Boolean(input.required || element.getAttribute('aria-required') === 'true')
  const disabled = Boolean(input.disabled || element.getAttribute('aria-disabled') === 'true')

  const eqId = easyQuizId(element)
  const effectiveId = element.id || eqId

  return {
    id: effectiveId,
    tag,
    type: inputType,
    label: labelForControl(element),
    name: cleanText(input.name || element.getAttribute('name') || '', 180),
    value: currentValue,
    options,
    required,
    disabled,
    role,
  }
}
