import type { AnalysisPlan, DeclarativeAction } from '../core/types'
import { NAVIGATION_PATTERN } from './controls'

// ---- MOTOR DE BUSCA ROBUSTA ----
function findElementExt(idOrLabel: string): HTMLElement | null {
  const escaped = CSS.escape(idOrLabel)
  // 1. Tenta por ID estrito gerado
  let el = document.querySelector(`[data-easyquiz-id="${escaped}"]`) as HTMLElement
  if (el) return el

  // 2. Tenta por ID real ou name
  el = document.querySelector(`#${escaped}, [name="${escaped}"]`) as HTMLElement
  if (el) return el

  // 3. Tenta encontrar via XPath por texto exato (label)
  const xpath = `//*[text()="${idOrLabel}"] | //*[contains(text(),"${idOrLabel}")]`
  const result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
  if (result.singleNodeValue) return result.singleNodeValue as HTMLElement

  return null
}

// ---- EVENTOS SIMULADOS ----
function dispatchEventSequence(element: HTMLElement, events: string[]): void {
  for (const eventName of events) {
    element.dispatchEvent(new Event(eventName, { bubbles: true, composed: true }))
  }
}

function simulatePointerClick(element: HTMLElement, coords?: [number, number]): void {
  let cx = 0
  let cy = 0
  if (coords && coords.length === 2) {
    cx = coords[0]
    cy = coords[1]
  } else {
    const rect = element.getBoundingClientRect()
    cx = rect.left + rect.width / 2
    cy = rect.top + rect.height / 2
  }

  const props = { bubbles: true, cancelable: true, composed: true, clientX: cx, clientY: cy }
  element.dispatchEvent(new PointerEvent('pointerdown', props))
  element.dispatchEvent(new MouseEvent('mousedown', props))
  element.dispatchEvent(new PointerEvent('pointerup', props))
  element.dispatchEvent(new MouseEvent('mouseup', props))
  element.click()
}

// ---- ACÕES NATIVAS DO MOTOR ----
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
  if (element.isContentEditable) {
    element.textContent = value
    dispatchEventSequence(element, ['input', 'change', 'blur'])
    return
  }
  throw new Error(`Não é possível injetar texto em <${element.tagName.toLowerCase()}>`)
}

function setCheckedState(element: HTMLElement, checked: boolean): void {
  if (element instanceof HTMLInputElement && ['checkbox', 'radio'].includes(element.type)) {
    if (element.checked !== checked) element.click()
    if (element.checked !== checked) {
      const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'checked')?.set
      setter?.call(element, checked)
      dispatchEventSequence(element, ['input', 'change'])
    }
    return
  }
  const role = element.getAttribute('role')
  if (role === 'radio' || role === 'checkbox') {
    const isChecked = element.getAttribute('aria-checked') === 'true'
    if (isChecked !== checked) {
      simulatePointerClick(element)
      element.setAttribute('aria-checked', checked ? 'true' : 'false')
      dispatchEventSequence(element, ['input', 'change'])
    }
    return
  }
  simulatePointerClick(element)
}

function selectValues(element: HTMLElement, values: string[]): void {
  if (element instanceof HTMLSelectElement) {
    for (const option of Array.from(element.options)) {
      option.selected = values.includes(option.value)
    }
    dispatchEventSequence(element, ['input', 'change'])
    return
  }
  throw new Error('Elemento não é select.')
}

// ---- API GLOBAL $eq ----
export const EqAPI = {
  fill: (idOrLabel: string, value: string) => {
    const el = findElementExt(idOrLabel)
    if (el) setNativeValue(el, value)
    else console.warn(`$eq.fill: Elemento ${idOrLabel} não encontrado`)
  },
  click: (idOrLabel: string) => {
    const el = findElementExt(idOrLabel)
    if (el) simulatePointerClick(el)
    else console.warn(`$eq.click: Elemento ${idOrLabel} não encontrado`)
  },
  check: (idOrLabel: string, checked: boolean) => {
    const el = findElementExt(idOrLabel)
    if (el) setCheckedState(el, checked)
    else console.warn(`$eq.check: Elemento ${idOrLabel} não encontrado`)
  },
  drag: (idOrigem: string, idDest: string) => {
    // Simulação básica de drag drop
    const origin = findElementExt(idOrigem)
    const dest = findElementExt(idDest)
    if (origin && dest) {
      origin.dispatchEvent(new DragEvent('dragstart', { bubbles: true }))
      dest.dispatchEvent(new DragEvent('drop', { bubbles: true }))
      origin.dispatchEvent(new DragEvent('dragend', { bubbles: true }))
    }
  }
}
// Instancia no window do hospedeiro
;(window as any).$eq = EqAPI

// ---- EXECUTOR DECLARATIVO ----
function executeDeclarativeAction(action: DeclarativeAction): void {
  if (action.t === 'js') {
    const code = String(action.v || '')
    try {
      const fn = new Function('$eq', code)
      fn(EqAPI)
    } catch (err) {
      console.error('[EasyQuiz JS Error]', err)
      throw new Error('Falha na execução JS gerada pela IA.')
    }
    return
  }

  const elId = action.id || ''
  const element = findElementExt(elId)
  if (!element && action.t !== 'adv') {
    throw new Error(`Alvo '${elId}' não encontrado para ação '${action.t}'`)
  }

  switch (action.t) {
    case 'val':
      if (element) setNativeValue(element, String(action.v))
      break
    case 'chk':
      if (element) setCheckedState(element, Boolean(action.c))
      break
    case 'sel':
      if (element) {
        const arr = Array.isArray(action.v) ? action.v : [String(action.v)]
        selectValues(element, arr as string[])
      }
      break
    case 'clk':
      if (element) simulatePointerClick(element, action.co)
      break
    case 'adv':
      if (element) {
        simulatePointerClick(element)
      } else {
        // Tenta achar qualquer botão de navegação
        const navs = Array.from(document.querySelectorAll('button, a, input[type="submit"]'))
          .filter(e => NAVIGATION_PATTERN.test(e.textContent || (e as HTMLInputElement).value || ''))
        if (navs.length) simulatePointerClick(navs[0] as HTMLElement)
        else throw new Error('Botão de avanço não encontrado.')
      }
      break
  }
}

export async function executePlan(
  plan: AnalysisPlan,
  allowAdvance: boolean,
): Promise<{ applied: number; advanced: boolean }> {
  const regularActions = plan.actions.filter((a) => a.t !== 'adv')
  const advanceActions = plan.actions.filter((a) => a.t === 'adv')

  for (const action of regularActions) {
    executeDeclarativeAction(action)
  }

  let advanced = false
  if (allowAdvance && advanceActions.length > 0) {
    await new Promise((resolve) => setTimeout(resolve, 600))
    executeDeclarativeAction(advanceActions[0])
    advanced = true
  }

  return {
    applied: regularActions.length,
    advanced,
  }
}
