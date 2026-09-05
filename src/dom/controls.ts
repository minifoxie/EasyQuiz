import type { ControlDescriptor } from '../core/types'

export const CONTROL_SELECTOR = [
  'input:not([type="hidden"])',
  'textarea',
  'select',
  'button',
  '[role="button"]',
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
  /(verificar|checar|check|conferir|validar|próxim[oa]|next|continuar|continue|avançar|prosseguir|enviar|submit|concluir|finalizar|terminar|começar|iniciar|start|vamos lá|próxima tarefa|next task|próxima pergunta|next question|marcar como concluíd[oa]|mostrar resumo|entendi|compreendi|ok|leitura concluída|seguir)/i

let idSequence = 0

export function isVisible(element: Element): boolean {
  const node = element as HTMLElement
  if (!node || typeof node.getBoundingClientRect !== 'function') return false
  const rect = node.getBoundingClientRect()
  const style = window.getComputedStyle(node)
  return (
    rect.width > 0 &&
    rect.height > 0 &&
    style.display !== 'none' &&
    style.visibility !== 'hidden' &&
    Number(style.opacity || '1') > 0
  )
}

export function cleanText(value: string | null | undefined, max = 500): string {
  return (value ?? '').replace(/\s+/g, ' ').trim().slice(0, max)
}

export function easyQuizId(element: HTMLElement): string {
  const existing = element.dataset.easyquizId
  if (existing) return existing
  const id = `eq-${Date.now().toString(36)}-${(idSequence += 1).toString(36)}`
  element.dataset.easyquizId = id
  return id
}

export function isNavigationControl(element: HTMLElement): boolean {
  const text = cleanText(
    element.getAttribute('aria-label') ||
      element.textContent ||
      element.getAttribute('value') ||
      (element as HTMLInputElement).value,
  )
  const type = (element as HTMLButtonElement).type
  const testableText = text.replace(/[\d\(\)\[\]→\>\•\-\/\\]+/g, ' ').trim()
  return (
    NAVIGATION_PATTERN.test(testableText) ||
    NAVIGATION_PATTERN.test(text) ||
    type === 'submit' ||
    element.getAttribute('data-testid')?.toLowerCase().includes('next') ||
    element.getAttribute('data-testid')?.toLowerCase().includes('check') ||
    false
  )
}

export function labelForControl(element: HTMLElement): string {
  // 1. aria-label direto
  const aria = element.getAttribute('aria-label')
  if (aria) return cleanText(aria)

  // 2. aria-labelledby
  const labelledBy = element.getAttribute('aria-labelledby')
  if (labelledBy) {
    const text = labelledBy
      .split(/\s+/)
      .map((id) => document.getElementById(id)?.textContent)
      .filter(Boolean)
      .join(' ')
    if (text.trim()) return cleanText(text)
  }

  // 3. Labels associados nativamente
  if ('labels' in element && (element as HTMLInputElement).labels) {
    const labels = Array.from((element as HTMLInputElement).labels ?? [])
      .map((label) => label.textContent)
      .join(' ')
    if (labels.trim()) return cleanText(labels)
  }

  // 4. Se for radio/checkbox em container personalizado (Google Forms, Moodle, etc.)
  const parentContainer = element.closest(
    '.docssharedWizToggleLabeledContainer, [role="listitem"], .answer, label, .quiz-option, .form-check',
  )
  if (parentContainer && parentContainer !== element) {
    const parentText = cleanText(parentContainer.textContent)
    if (parentText) return parentText
  }

  // 5. Placeholder ou título
  const fallback =
    element.getAttribute('placeholder') ||
    element.getAttribute('title') ||
    element.textContent ||
    (element as HTMLInputElement).value ||
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
  const isDraggable = element.getAttribute('draggable') === 'true' || element.classList.contains('perseus-drag-item')
  const isDropzone =
    element.getAttribute('data-role') === 'dropzone' ||
    element.classList.contains('category-container') ||
    element.hasAttribute('data-category')
  const widgetHint = isDraggable ? 'draggable' : isDropzone ? 'dropzone' : ''
  const inputType = cleanText(widgetHint || input.type || customRole || tag, 40)

  let currentValue = ''
  if (input.type === 'checkbox' || input.type === 'radio' || customRole === 'radio' || customRole === 'checkbox') {
    const isChecked = input.checked || element.getAttribute('aria-checked') === 'true'
    currentValue = isChecked ? 'checked' : 'unchecked'
  } else {
    currentValue = cleanText(input.value || element.getAttribute('data-category') || element.textContent || '', 2000)
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
