import type { AnalysisPlan, DeclarativeAction } from '../core/types'
import { NAVIGATION_PATTERN } from './controls'

function targetFor(id: string): HTMLElement {
  const escaped = CSS.escape(id)
  const element = document.querySelector(`[data-easyquiz-id="${escaped}"]`) as HTMLElement | null
  if (!element || (element as HTMLInputElement).disabled || element.getAttribute('aria-disabled') === 'true') {
    throw new Error(`O controle '${id}' não está mais acessível ou está desabilitado na página.`)
  }
  return element
}

function dispatchEventSequence(element: HTMLElement, events: string[]): void {
  for (const eventName of events) {
    element.dispatchEvent(new Event(eventName, { bubbles: true, composed: true }))
  }
}

function setNativeValue(element: HTMLElement, value: string): void {
  if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
    const prototype = element instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype
    const setter = Object.getOwnPropertyDescriptor(prototype, 'value')?.set
    if (setter) {
      setter.call(element, value)
    } else {
      element.value = value
    }
    dispatchEventSequence(element, ['input', 'change', 'blur'])
    return
  }

  // Se for contenteditable
  if (element.isContentEditable) {
    element.textContent = value
    dispatchEventSequence(element, ['input', 'change', 'blur'])
    return
  }

  throw new Error('O controle selecionado não aceita inserção de texto.')
}

function setChecked(element: HTMLElement, checked: boolean): void {
  // 1. Radio / Checkbox nativo
  if (element instanceof HTMLInputElement && ['checkbox', 'radio'].includes(element.type)) {
    if (element.checked !== checked) {
      element.click()
    }
    if (element.checked !== checked) {
      const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'checked')?.set
      setter?.call(element, checked)
      dispatchEventSequence(element, ['input', 'change'])
    }
    return
  }

  // 2. Elementos com role="radio" ou role="checkbox" (Google Forms, Material UI, etc.)
  const role = element.getAttribute('role')
  if (role === 'radio' || role === 'checkbox') {
    const isChecked = element.getAttribute('aria-checked') === 'true'
    if (isChecked !== checked) {
      element.click()
      element.setAttribute('aria-checked', checked ? 'true' : 'false')
      dispatchEventSequence(element, ['input', 'change'])
    }
    return
  }

  // 3. Clique no label envolvente caso o input interno não responda
  const labelParent = element.closest('label')
  if (labelParent) {
    labelParent.click()
    return
  }

  element.click()
}

function selectValues(element: HTMLElement, values: string[]): void {
  if (!(element instanceof HTMLSelectElement)) {
    throw new Error('O controle não é um elemento <select>.')
  }
  const allowed = new Set(Array.from(element.options).map((opt) => opt.value))
  for (const val of values) {
    if (!allowed.has(val)) {
      console.warn(`[EasyQuiz] Opção '${val}' não encontrada no seletor.`)
    }
  }

  for (const option of Array.from(element.options)) {
    option.selected = values.includes(option.value)
  }
  dispatchEventSequence(element, ['input', 'change'])
}

function executeAction(action: DeclarativeAction): void {
  const element = targetFor(action.targetId)

  switch (action.type) {
    case 'set_value':
      setNativeValue(element, action.value)
      break

    case 'set_checked':
      setChecked(element, action.checked)
      break

    case 'select_values':
      selectValues(element, action.values)
      break

    case 'advance': {
      const text = (element.textContent || (element as HTMLInputElement).value || '').trim()
      const isNav = element.dataset.easyquizRole === 'navigation' || NAVIGATION_PATTERN.test(text)
      if (!isNav) {
        throw new Error('Ação de avanço impedida: o botão alvo não é de navegação validada.')
      }
      element.click()
      break
    }
  }
}

export async function executePlan(
  plan: AnalysisPlan,
  allowAdvance: boolean,
): Promise<{ applied: number; advanced: boolean }> {
  const regularActions = plan.actions.filter((a) => a.type !== 'advance')
  const advanceActions = plan.actions.filter((a) => a.type === 'advance')

  for (const action of regularActions) {
    executeAction(action)
  }

  let advanced = false
  if (allowAdvance && advanceActions.length > 0) {
    await new Promise((resolve) => setTimeout(resolve, 400))
    executeAction(advanceActions[0])
    advanced = true
  }

  return {
    applied: regularActions.length,
    advanced,
  }
}
