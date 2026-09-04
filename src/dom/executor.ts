import type { AnalysisPlan, DeclarativeAction } from '../core/types'
import { saveDomainCache } from '../core/storage'
import { NAVIGATION_PATTERN } from './controls'

// ---- MOTOR DE BUSCA ROBUSTA ----
export function findElementExt(idOrLabel: string): HTMLElement | null {
  if (!idOrLabel) return null
  const trimmed = idOrLabel.trim()

  // 1. Tenta por ID estrito gerado pelo EasyQuiz
  const escaped = CSS.escape(trimmed)
  let el = document.querySelector(`[data-easyquiz-id="${escaped}"]`) as HTMLElement
  if (el) return el

  // 2. Tenta como seletor CSS direto (ex: ".classe", "#id", "[data-testid='...']")
  try {
    el = document.querySelector(trimmed) as HTMLElement
    if (el) return el
  } catch {}

  // 3. Tenta por ID real ou name
  el = document.querySelector(`#${escaped}, [name="${escaped}"]`) as HTMLElement
  if (el) return el

  // 4. Tenta encontrar via XPath por texto exato, aria-label ou data-category
  try {
    const cleanXpathText = trimmed.replace(/"/g, '')
    const xpath = `//*[text()="${cleanXpathText}"] | //*[contains(text(),"${cleanXpathText}")] | //*[@aria-label="${cleanXpathText}"] | //*[@data-category="${cleanXpathText}"] | //*[@data-testid="${cleanXpathText}"]`
    const result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
    if (result.singleNodeValue) return result.singleNodeValue as HTMLElement
  } catch {}

  // 5. Busca flexível (case-insensitive e contenção de substring) nos elementos visíveis
  const targetClean = cleanText(trimmed).toLowerCase().replace(/['"“”«»]/g, '')
  const candidates = Array.from(
    document.querySelectorAll(
      'button, a, div, span, li, p, label, input, [draggable="true"], [data-testid], [class*="option"], [class*="card"]',
    ),
  ) as HTMLElement[]

  for (const item of candidates) {
    const txt = cleanText(item.textContent).toLowerCase().replace(/['"“”«»]/g, '')
    const aria = cleanText(item.getAttribute('aria-label')).toLowerCase().replace(/['"“”«»]/g, '')
    const cat = cleanText(item.getAttribute('data-category')).toLowerCase().replace(/['"“”«»]/g, '')
    const testid = cleanText(item.getAttribute('data-testid')).toLowerCase()
    if (txt === targetClean || aria === targetClean || cat === targetClean || testid === targetClean) {
      return item
    }
  }

  // Prioridade 2: elemento que contém o texto alvo (ótimo para cards com drag handle :: ou pontuação)
  if (targetClean.length > 6) {
    for (const item of candidates) {
      if (item.children.length > 6) continue // Evita pegar grandes containers
      const txt = cleanText(item.textContent).toLowerCase().replace(/['"“”«»]/g, '')
      if (txt.includes(targetClean) || (txt.length > 10 && targetClean.includes(txt))) {
        return item
      }
    }
  }

  return null
}

// ---- EVENTOS SIMULADOS ----
function dispatchEventSequence(element: HTMLElement, events: string[]): void {
  for (const eventName of events) {
    element.dispatchEvent(new Event(eventName, { bubbles: true, composed: true }))
  }
}

export function simulatePointerClick(element: HTMLElement, coords?: [number, number]): void {
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

function createMockDataTransfer(): DataTransfer {
  const store: Record<string, string> = {}
  return {
    dropEffect: 'move',
    effectAllowed: 'all',
    files: [] as any,
    items: [] as any,
    types: ['text/plain'],
    clearData: (format?: string) => {
      if (format) delete store[format]
      else Object.keys(store).forEach((k) => delete store[k])
    },
    getData: (format: string) => store[format] || '',
    setData: (format: string, data: string) => {
      store[format] = data
    },
    setDragImage: () => {},
  } as unknown as DataTransfer
}

export function simulateDragDrop(origin: HTMLElement, dest: HTMLElement): void {
  const dataTransfer = createMockDataTransfer()
  const originRect = origin.getBoundingClientRect()
  const destRect = dest.getBoundingClientRect()
  const pStart = {
    clientX: originRect.left + originRect.width / 2,
    clientY: originRect.top + originRect.height / 2,
    bubbles: true,
    cancelable: true,
  }
  const pEnd = {
    clientX: destRect.left + destRect.width / 2,
    clientY: destRect.top + destRect.height / 2,
    bubbles: true,
    cancelable: true,
  }

  // Sequência de eventos de início de drag
  origin.dispatchEvent(new PointerEvent('pointerdown', pStart))
  origin.dispatchEvent(new MouseEvent('mousedown', pStart))
  origin.dispatchEvent(new DragEvent('dragstart', { ...pStart, dataTransfer }))

  // Sequência sobre o destino
  dest.dispatchEvent(new DragEvent('dragenter', { ...pEnd, dataTransfer }))
  dest.dispatchEvent(new DragEvent('dragover', { ...pEnd, dataTransfer }))

  // Drop no destino
  dest.dispatchEvent(new DragEvent('drop', { ...pEnd, dataTransfer }))

  // Finalização do arrasto
  origin.dispatchEvent(new DragEvent('dragend', { ...pStart, dataTransfer }))
  dest.dispatchEvent(new PointerEvent('pointerup', pEnd))
  dest.dispatchEvent(new MouseEvent('mouseup', pEnd))
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
    const origin = findElementExt(idOrigem)
    const dest = findElementExt(idDest)
    if (origin && dest) {
      simulateDragDrop(origin, dest)
    } else {
      console.warn(`$eq.drag: Origem ou destino não encontrado (${idOrigem} -> ${idDest})`)
    }
  },
  categorize: (itemQuery: string, categoryQuery: string) => {
    const item = findElementExt(itemQuery)
    const cat = findElementExt(categoryQuery)
    if (!item || !cat) {
      console.warn(`$eq.categorize: Item ou categoria não encontrados (${itemQuery} -> ${categoryQuery})`)
      return
    }
    // 1. Simula arrastar e soltar
    simulateDragDrop(item, cat)

    // 2. Dispara padrão de acessibilidade (clicar no item e depois na categoria)
    simulatePointerClick(item)
    setTimeout(() => {
      simulatePointerClick(cat)
    }, 150)
  },
}
// Instancia no window do hospedeiro
;(window as any).$eq = EqAPI

// ---- EXECUTOR DECLARATIVO ----
async function executeDeclarativeAction(action: DeclarativeAction): Promise<void> {
  if (action.t === 'js') {
    const code = String(action.v || '')
    try {
      const fn = new Function('$eq', 'document', 'window', code)
      fn(EqAPI, document, window)
    } catch (err) {
      console.warn('[EasyQuiz JS Execution]', err)
    }
    return
  }

  if (action.t === 'drag') {
    const fromEl = findElementExt(action.from)
    const toEl = findElementExt(action.to)
    if (fromEl && toEl) {
      simulateDragDrop(fromEl, toEl)
      simulatePointerClick(fromEl)
      await new Promise((r) => setTimeout(r, 150))
      simulatePointerClick(toEl)
      const dropChild = toEl.querySelector('[data-role="dropzone"], [class*="bucket" i], [class*="drop" i]') as HTMLElement | null
      if (dropChild && dropChild !== toEl) {
        simulatePointerClick(dropChild)
      }
    } else {
      console.warn(`[EasyQuiz] Drag: alvo não encontrado (${action.from} -> ${action.to})`)
    }
    return
  }

  const elId = action.id || ''
  const element = findElementExt(elId)
  if (!element && action.t !== 'adv') {
    console.warn(`[EasyQuiz] Alvo '${elId}' não encontrado para ação '${action.t}'. Prosseguindo...`)
    return
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
      let targetEl = element
      if (!targetEl) {
        const navs = Array.from(document.querySelectorAll('button, a, input[type="submit"]')).filter((e) =>
          NAVIGATION_PATTERN.test(e.textContent || (e as HTMLInputElement).value || ''),
        )
        if (navs.length) targetEl = navs[0] as HTMLElement
      }

      if (targetEl) {
        const heuristic = action.id || targetEl.textContent?.trim() || (targetEl as HTMLInputElement).value?.trim() || ''
        if (heuristic) {
          saveDomainCache(window.location.hostname, { advanceSelector: heuristic })
        }
        simulatePointerClick(targetEl)
      } else {
        console.warn('[EasyQuiz] Botão de avanço não localizado.')
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
    await executeDeclarativeAction(action)
    if (action.t === 'drag') {
      await new Promise((resolve) => setTimeout(resolve, 350))
    }
  }

  let advanced = false
  if (allowAdvance) {
    // 1. Verifica se há um botão intermediário de "Verificar" / "Check"
    const checkBtn = Array.from(document.querySelectorAll('button, [role="button"], input[type="submit"]')).find((b) =>
      /(verificar|checar|check|conferir)/i.test(b.textContent || (b as HTMLInputElement).value || ''),
    ) as HTMLElement | undefined

    if (checkBtn && isVisible(checkBtn)) {
      simulatePointerClick(checkBtn)
      await new Promise((resolve) => setTimeout(resolve, 800))
    }

    if (advanceActions.length > 0) {
      await new Promise((resolve) => setTimeout(resolve, 600))
      executeDeclarativeAction(advanceActions[0])
      advanced = true
    } else if (checkBtn) {
      // Se clicou em verificar, busca o botão de próxima pergunta que surgiu
      await new Promise((resolve) => setTimeout(resolve, 600))
      const nextBtn = Array.from(document.querySelectorAll('button, [role="button"], a, input[type="submit"]')).find(
        (b) => /(próxim[oa]|next|continuar|avançar|mostrar resumo)/i.test(b.textContent || (b as HTMLInputElement).value || ''),
      ) as HTMLElement | undefined
      if (nextBtn && isVisible(nextBtn)) {
        simulatePointerClick(nextBtn)
        advanced = true
      }
    }
  }

  return {
    applied: regularActions.length,
    advanced,
  }
}
