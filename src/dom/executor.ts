import type { AnalysisPlan, DeclarativeAction } from '../core/types'
import { saveDomainCache } from '../core/storage'
import { cleanText, isVisible, NAVIGATION_PATTERN } from './controls'

// ---- MOTOR DE BUSCA ROBUSTA DE ELEMENTOS ----
export function findElementExt(idOrLabel: string): HTMLElement | null {
  if (!idOrLabel) return null
  const trimmed = idOrLabel.trim().replace(/^["'“”«»]+|["'“”«»]+$/g, '')
  if (!trimmed) return null

  // 1. Tenta por ID estrito gerado pelo EasyQuiz
  const escaped = CSS.escape(trimmed)
  let el = document.querySelector(`[data-easyquiz-id="${escaped}"]`) as HTMLElement | null
  if (el) return el

  // 2. Tenta como seletor CSS direto
  try {
    el = document.querySelector(trimmed) as HTMLElement | null
    if (el) return el
  } catch {}

  // 3. Tenta por ID real, name ou value
  try {
    el = document.querySelector(`#${escaped}, [name="${escaped}"], [value="${escaped}"]`) as HTMLElement | null
    if (el) return el
  } catch {}

  // 4. Tenta via XPath para texto exato, aria-label, data-category ou data-testid
  try {
    const cleanXpath = trimmed.replace(/"/g, '')
    const xpath = `//*[normalize-space(text())="${cleanXpath}"] | //*[@aria-label="${cleanXpath}"] | //*[@data-category="${cleanXpath}"] | //*[@data-testid="${cleanXpath}"]`
    const result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
    if (result.singleNodeValue) {
      const node = result.singleNodeValue as HTMLElement
      // Se achou um heading/label dentro de um container de categoria, retorna o container ou o elemento
      const categoryContainer = node.closest('[data-role="dropzone"], [class*="category" i], [class*="bucket" i], [class*="column" i], [class*="drop" i]') as HTMLElement | null
      return categoryContainer || node
    }
  } catch {}

  // 5. Busca flexível por candidatos visíveis
  const targetClean = cleanText(trimmed).toLowerCase().replace(/['"“”«»]/g, '')
  const candidates = Array.from(
    document.querySelectorAll(
      'button, a, div, span, li, p, label, input, [draggable="true"], [data-testid], [class*="option" i], [class*="card" i], [class*="item" i], [class*="choice" i], [class*="category" i], [class*="bucket" i]',
    ),
  ) as HTMLElement[]

  // Prioridade A: Correspondência exata em texto ou atributos
  for (const item of candidates) {
    if (!isVisible(item)) continue
    const txt = cleanText(item.textContent).toLowerCase().replace(/['"“”«»]/g, '')
    const aria = cleanText(item.getAttribute('aria-label')).toLowerCase().replace(/['"“”«»]/g, '')
    const cat = cleanText(item.getAttribute('data-category')).toLowerCase().replace(/['"“”«»]/g, '')
    const rawVal = item instanceof HTMLInputElement || item instanceof HTMLButtonElement ? item.value : ''
    const val = cleanText(rawVal).toLowerCase()

    if (txt === targetClean || aria === targetClean || (cat && cat === targetClean) || (val && val === targetClean)) {
      // Retorna o item clicável mais próximo se for um texto interno
      const clickableParent = item.closest('button, [role="button"], [draggable="true"], [class*="card" i], [class*="option" i], [class*="item" i], li') as HTMLElement | null
      return clickableParent || item
    }
  }

  // Prioridade B: Contenção de substring para cards com badges ou numerações
  if (targetClean.length >= 3) {
    for (const item of candidates) {
      if (!isVisible(item)) continue
      if (item.children.length > 5) continue // Evita containers gigantes da página inteira
      const txt = cleanText(item.textContent).toLowerCase().replace(/['"“”«»]/g, '')
      const aria = cleanText(item.getAttribute('aria-label')).toLowerCase().replace(/['"“”«»]/g, '')
      if (txt.includes(targetClean) || aria.includes(targetClean)) {
        const clickableParent = item.closest('button, [role="button"], [draggable="true"], [class*="card" i], [class*="option" i], [class*="item" i], li') as HTMLElement | null
        return clickableParent || item
      }
    }
  }

  return null
}

// ---- EVENTOS SIMULADOS NATIVOS ----
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

  try {
    element.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'instant' as any })
  } catch {}

  try {
    element.focus?.()
  } catch {}

  const commonProps = {
    bubbles: true,
    cancelable: true,
    composed: true,
    view: window,
    clientX: cx,
    clientY: cy,
    screenX: cx,
    screenY: cy,
  }

  element.dispatchEvent(new PointerEvent('pointerdown', { ...commonProps, isPrimary: true, button: 0, buttons: 1 }))
  element.dispatchEvent(new MouseEvent('mousedown', { ...commonProps, button: 0, buttons: 1 }))
  element.dispatchEvent(new PointerEvent('pointerup', { ...commonProps, isPrimary: true, button: 0, buttons: 0 }))
  element.dispatchEvent(new MouseEvent('mouseup', { ...commonProps, button: 0, buttons: 0 }))
  element.dispatchEvent(new MouseEvent('click', { ...commonProps, button: 0, buttons: 0 }))

  try {
    element.click()
  } catch {}

  // Se o elemento tiver um radio ou checkbox interno, clica nele diretamente
  const innerInput = element.querySelector('input[type="radio"], input[type="checkbox"]') as HTMLInputElement | null
  if (innerInput && innerInput !== element) {
    try {
      innerInput.click()
    } catch {}
  }
}

function setNativeValue(element: HTMLElement, value: string): void {
  if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
    try {
      const tracker = (element as any)._valueTracker
      if (tracker) tracker.setValue('')
    } catch {}

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
  const inputEl = element instanceof HTMLInputElement ? element : (element.querySelector('input[type="checkbox"], input[type="radio"]') as HTMLInputElement | null)

  if (inputEl && ['checkbox', 'radio'].includes(inputEl.type)) {
    if (inputEl.checked !== checked) inputEl.click()
    if (inputEl.checked !== checked) {
      try {
        const tracker = (inputEl as any)._valueTracker
        if (tracker) tracker.setValue('')
      } catch {}

      const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'checked')?.set
      setter?.call(inputEl, checked)
      dispatchEventSequence(inputEl, ['input', 'change'])
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

// ---- SIMULAÇÃO HÍBRIDA MULTI-ESTÁGIO DE ARRASTO E CATEGORIZAÇÃO ----
export async function simulateDragAndCategorize(origin: HTMLElement, dest: HTMLElement): Promise<void> {
  const originRect = origin.getBoundingClientRect()
  const destRect = dest.getBoundingClientRect()

  const startX = originRect.left + originRect.width / 2
  const startY = originRect.top + originRect.height / 2
  const endX = destRect.left + destRect.width / 2
  const endY = destRect.top + destRect.height / 2

  // ---- ESTÁGIO 1: PADRÃO CLICK-TO-SELECT E CLICK-TO-PLACE ----
  // A esmagadora maioria dos sites web modernos de quiz (Quizizz, Educaplay, Wordwall)
  // aceita clicar na opção e depois clicar na categoria de destino!
  simulatePointerClick(origin, [startX, startY])
  await new Promise((r) => setTimeout(r, 120))

  simulatePointerClick(dest, [endX, endY])

  // Se o destino tiver um container dropzone interno específico, clica nele também
  const dropInner = dest.querySelector(
    '[data-role="dropzone"], [class*="bucket" i], [class*="slot" i], [class*="drop" i], [class*="target" i], ul',
  ) as HTMLElement | null
  if (dropInner && dropInner !== dest) {
    simulatePointerClick(dropInner)
  }

  await new Promise((r) => setTimeout(r, 100))

  // ---- ESTÁGIO 2: ARRASTO COM MOUSE & POINTER EVENTS INTERMEDIÁRIOS ----
  // Simula o movimento físico do cursor com mousedown + mousemove + mouseup
  const pStart = {
    bubbles: true,
    cancelable: true,
    composed: true,
    view: window,
    clientX: startX,
    clientY: startY,
    button: 0,
    buttons: 1,
  }

  origin.dispatchEvent(new PointerEvent('pointerdown', { ...pStart, isPrimary: true }))
  origin.dispatchEvent(new MouseEvent('mousedown', pStart))

  // Dispara 3 coordenadas de movimento intermediárias (necessário para bibliotecas JS como SortableJS)
  for (let step = 1; step <= 3; step++) {
    const curX = startX + (endX - startX) * (step / 3)
    const curY = startY + (endY - startY) * (step / 3)
    const moveProps = { ...pStart, clientX: curX, clientY: curY }
    origin.dispatchEvent(new PointerEvent('pointermove', { ...moveProps, isPrimary: true }))
    document.dispatchEvent(new MouseEvent('mousemove', moveProps))
  }

  const pEnd = {
    bubbles: true,
    cancelable: true,
    composed: true,
    view: window,
    clientX: endX,
    clientY: endY,
    button: 0,
    buttons: 0,
  }

  dest.dispatchEvent(new PointerEvent('pointerup', { ...pEnd, isPrimary: true }))
  dest.dispatchEvent(new MouseEvent('mouseup', pEnd))

  // ---- ESTÁGIO 3: HTML5 DRAG & DROP EVENTS COM DATA-TRANSFER ----
  const dataTransfer = createMockDataTransfer()
  dataTransfer.setData('text/plain', origin.textContent || '')
  dataTransfer.setData('text/html', origin.outerHTML)

  origin.dispatchEvent(new DragEvent('dragstart', { ...pStart, dataTransfer }))
  dest.dispatchEvent(new DragEvent('dragenter', { ...pEnd, dataTransfer }))
  dest.dispatchEvent(new DragEvent('dragover', { ...pEnd, dataTransfer }))
  dest.dispatchEvent(new DragEvent('drop', { ...pEnd, dataTransfer }))
  origin.dispatchEvent(new DragEvent('dragend', { ...pStart, dataTransfer }))

  // ---- ESTÁGIO 4: TOUCH EVENTS (Para frameworks com detecção touch/mobile) ----
  try {
    const touchStart = new Touch({ identifier: 1, target: origin, clientX: startX, clientY: startY })
    const touchEnd = new Touch({ identifier: 1, target: dest, clientX: endX, clientY: endY })

    origin.dispatchEvent(new TouchEvent('touchstart', { bubbles: true, cancelable: true, touches: [touchStart] }))
    dest.dispatchEvent(new TouchEvent('touchmove', { bubbles: true, cancelable: true, touches: [touchEnd] }))
    dest.dispatchEvent(new TouchEvent('touchend', { bubbles: true, cancelable: true, touches: [] }))
  } catch {}
}

// ---- API GLOBAL $eq ----
export const EqAPI = {
  fill: (idOrLabel: string, value: string) => {
    const el = findElementExt(idOrLabel)
    if (el) setNativeValue(el, value)
    else console.warn(`$eq.fill: Elemento '${idOrLabel}' não encontrado`)
  },
  click: (idOrLabel: string) => {
    const el = findElementExt(idOrLabel)
    if (el) simulatePointerClick(el)
    else console.warn(`$eq.click: Elemento '${idOrLabel}' não encontrado`)
  },
  check: (idOrLabel: string, checked: boolean) => {
    const el = findElementExt(idOrLabel)
    if (el) setCheckedState(el, checked)
    else console.warn(`$eq.check: Elemento '${idOrLabel}' não encontrado`)
  },
  drag: (idOrigem: string, idDest: string) => {
    const origin = findElementExt(idOrigem)
    const dest = findElementExt(idDest)
    if (origin && dest) {
      simulateDragAndCategorize(origin, dest)
    } else {
      console.warn(`$eq.drag: Origem ou destino não encontrado ('${idOrigem}' -> '${idDest}')`)
    }
  },
  categorize: async (itemQuery: string, categoryQuery: string) => {
    const item = findElementExt(itemQuery)
    const cat = findElementExt(categoryQuery)
    if (!item || !cat) {
      console.warn(`$eq.categorize: Item ou categoria não encontrados ('${itemQuery}' -> '${categoryQuery}')`)
      return
    }
    await simulateDragAndCategorize(item, cat)
  },
}
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
      await simulateDragAndCategorize(fromEl, toEl)
    } else {
      console.warn(`[EasyQuiz] Drag: alvo não encontrado ('${action.from}' -> '${action.to}')`)
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
        const navs = Array.from(document.querySelectorAll('button, a, input[type="submit"]')).filter((e) => {
          const val = e instanceof HTMLInputElement || e instanceof HTMLButtonElement ? e.value : ''
          return NAVIGATION_PATTERN.test(e.textContent || val || '')
        })
        if (navs.length) targetEl = navs[0] as HTMLElement
      }

      if (targetEl) {
        const val = targetEl instanceof HTMLInputElement || targetEl instanceof HTMLButtonElement ? targetEl.value.trim() : ''
        const heuristic = action.id || targetEl.textContent?.trim() || val || ''
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
      await new Promise((resolve) => setTimeout(resolve, 380))
    }
  }

  let advanced = false
  if (allowAdvance) {
    // 1. Em questões regulares, verifica se há um botão intermediário de "Verificar" / "Check"
    const checkBtn =
      plan.pageType === 'info'
        ? undefined
        : (Array.from(document.querySelectorAll('button, [role="button"], input[type="submit"], a')).find((b) => {
            const val = b instanceof HTMLInputElement || b instanceof HTMLButtonElement ? b.value : ''
            return /(verificar|checar|check|conferir|validar|enviar|responder)/i.test(
              b.textContent || val || b.getAttribute('aria-label') || '',
            )
          }) as HTMLElement | undefined)

    if (checkBtn && isVisible(checkBtn)) {
      simulatePointerClick(checkBtn)
      await new Promise((resolve) => setTimeout(resolve, 800))
    }

    if (advanceActions.length > 0) {
      await new Promise((resolve) => setTimeout(resolve, 400))
      await executeDeclarativeAction(advanceActions[0])
      advanced = true
    } else if (checkBtn || plan.pageType === 'info' || plan.pageType === 'start') {
      await new Promise((resolve) => setTimeout(resolve, 500))
      const nextBtn = Array.from(document.querySelectorAll('button, [role="button"], a, input[type="submit"]')).find(
        (b) => {
          const val = b instanceof HTMLInputElement || b instanceof HTMLButtonElement ? b.value : ''
          return NAVIGATION_PATTERN.test(b.textContent || val || b.getAttribute('aria-label') || '')
        },
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
