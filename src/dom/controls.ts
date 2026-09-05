import type { ControlDescriptor } from '../core/types'

export const CONTROL_SELECTOR = [
  'input:not([type="hidden"])',
  'textarea',
  'select',
  'button',
  'a',
  '[role="button"]',
  '[role="link"]',
  '[role="radio"]',
  '[role="checkbox"]',
  '[role="option"]',
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
  '[data-testid*="category" i]',
  '[data-role="dropzone"]',
  '[data-category]',
].join(',')

export const NAVIGATION_PATTERN =
  /(verificar|checar|check|conferir|validar|próxim[oa]|next|continuar|continue|avançar|prosseguir|enviar|submit|concluir|finalizar|terminar|começar|iniciar|start|vamos lá|próxima tarefa|next task|próxima pergunta|next question|marcar como concluíd[oa]|mostrar resumo|entendi|compreendi|ok|leitura concluída|seguir|ir para o exercício|fazer o teste|próximo artigo|ir para a aula)/i

let idSequence = 0

export function isVisible(element: Element): boolean {
  const node = element as HTMLElement
  if (!node) return false
  if (typeof node.isConnected === 'boolean' && !node.isConnected) return false

  // 1. Padrão Moderno W3C (Chrome, Firefox, Safari, Edge)
  if (typeof (node as any).checkVisibility === 'function') {
    try {
      const vis = (node as any).checkVisibility({ checkOpacity: true, checkVisibilityCSS: true })
      if (!vis) return false
    } catch {}
  }

  // 2. Verificação de estilos computados
  try {
    const style = window.getComputedStyle ? window.getComputedStyle(node) : (node.style as any)
    if (style) {
      if (style.display === 'none' || style.visibility === 'hidden' || Number(style.opacity || '1') <= 0) {
        return false
      }
    }
  } catch {}

  // 3. Verificação de ancestrais ocultos por display: none ou atributo hidden
  try {
    const hiddenAncestor = node.closest('[hidden], [style*="display: none"], [style*="display:none"]')
    if (hiddenAncestor && !isInsideEasyQuiz(hiddenAncestor as HTMLElement)) {
      return false
    }
  } catch {}

  // 4. Bounding Client Rect quando disponível
  try {
    if (typeof node.getBoundingClientRect === 'function') {
      const rect = node.getBoundingClientRect()
      if (rect.width > 0 || rect.height > 0) {
        return true
      }
    }
  } catch {}

  // 5. Se getClientRects() tiver dimensões
  try {
    if (typeof node.getClientRects === 'function' && node.getClientRects().length > 0) {
      return true
    }
  } catch {}

  // 6. Suporte para inputs acessíveis (escondidos com width:0 / opacity:0 dentro de labels/cards visíveis)
  const tag = node.tagName?.toLowerCase()
  if (['input', 'select', 'textarea', 'button'].includes(tag)) {
    const parentLabel = node.closest('label, .option-card, .quiz-option, [class*="option" i], [class*="choice" i], tr, div')
    if (parentLabel && parentLabel !== node) {
      return isVisible(parentLabel)
    }
  }

  // 7. Fallback para JSDOM ou elementos com conteúdo textual
  if (node.ownerDocument && node.ownerDocument.defaultView) {
    const isJsdom = /jsdom/i.test(node.ownerDocument.defaultView.navigator?.userAgent || '')
    if (isJsdom) {
      return !node.closest('[style*="display: none"], [style*="display:none"], [hidden]')
    }
  }

  return (node.textContent || '').trim().length > 0
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

export function isInsideEasyQuiz(el: HTMLElement | null): boolean {
  if (!el) return false
  return Boolean(
    el.closest(
      '#easyquiz-shadow-root, .eq-sidebar, .eq-launcher, [data-easyquiz-ignore="true"], .btn-inject-eq, #btn-inject-script',
    ) || el.getAttribute?.('data-easyquiz-ignore') === 'true',
  )
}

export function isNavigationControl(element: HTMLElement): boolean {
  if (!element || !(element instanceof Element)) return false
  if (isInsideEasyQuiz(element)) return false
  // Botões de navegação da prova nunca ficam no cabeçalho ou barra de topo do site
  if (element.closest('header, nav, aside')) return false

  const rawValue = element instanceof HTMLInputElement || element instanceof HTMLButtonElement ? element.value : ''
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
  const select = element instanceof HTMLSelectElement ? element : null
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
  } else {
    const rawVal =
      element instanceof HTMLInputElement ||
      element instanceof HTMLTextAreaElement ||
      element instanceof HTMLSelectElement
        ? element.value
        : ''
    currentValue = cleanText(rawVal || element.getAttribute('data-category') || element.textContent || '', 2000)
  }

  const options: Array<{ value: string; label: string }> = []
  if (select) {
    for (const option of Array.from(select.options).slice(0, 80)) {
      options.push({
        value: cleanText(option.value),
        label: cleanText(option.textContent),
      })
    }
  }

  const required = Boolean(input.required || element.getAttribute('aria-required') === 'true')
  const disabled = Boolean(input.disabled || element.getAttribute('aria-disabled') === 'true')

  return {
    id: easyQuizId(element),
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
