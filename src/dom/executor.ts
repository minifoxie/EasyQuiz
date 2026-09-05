import type { AnalysisPlan, DeclarativeAction } from '../core/types'
import { loadDomainCache, saveDomainCache } from '../core/storage'
import { cleanText, isNavigationControl, isVisible, NAVIGATION_PATTERN } from './controls'

export function isInsideEasyQuiz(el: HTMLElement): boolean {
  return Boolean(el.closest('#easyquiz-shadow-root, .eq-sidebar, .eq-launcher'))
}

export function cleanSearchTerm(term: string): string {
  if (!term) return ''
  return term
    .replace(/^[\d\.\-\)\s]+/, '') // Remove prefixos como "1. ", "2) ", "1 - ", "A) "
    .replace(/[\.\u2026]{2,}/g, ' ') // Remove reticências como "..." ou "…"
    .replace(/['"“”«»]/g, '') // Remove aspas
    .replace(/\s+/g, ' ')
    .trim()
}

// ---- MOTOR DE BUSCA ROBUSTA DE ELEMENTOS ----
export function findElementExt(idOrLabel: string): HTMLElement | null {
  if (!idOrLabel) return null
  const trimmed = idOrLabel.trim().replace(/^["'“”«»]+|["'“”«»]+$/g, '')
  if (!trimmed) return null

  // 1. Tenta por ID estrito gerado pelo EasyQuiz
  const escaped = CSS.escape(trimmed)
  let el = document.querySelector(`[data-easyquiz-id="${escaped}"]`) as HTMLElement | null
  if (el && !isInsideEasyQuiz(el)) return el

  // 2. Tenta como seletor CSS direto
  try {
    el = document.querySelector(trimmed) as HTMLElement | null
    if (el && !isInsideEasyQuiz(el)) return el
  } catch {}

  // 3. Tenta por ID real, name ou value
  try {
    el = document.querySelector(`#${escaped}, [name="${escaped}"], [value="${escaped}"]`) as HTMLElement | null
    if (el && !isInsideEasyQuiz(el)) return el
  } catch {}

  // 4. Tenta via XPath para texto exato no nó ou descendentes
  try {
    const cleanXpath = trimmed.replace(/"/g, '')
    const xpath = `//*[normalize-space(.)="${cleanXpath}"] | //*[@aria-label="${cleanXpath}"] | //*[@data-category="${cleanXpath}"] | //*[@data-testid="${cleanXpath}"]`
    const result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
    if (result.singleNodeValue) {
      const node = result.singleNodeValue as HTMLElement
      if (!isInsideEasyQuiz(node)) {
        const categoryContainer = node.closest(
          '[data-role="dropzone"], [class*="category" i], [class*="bucket" i], [class*="column" i], [class*="drop" i]',
        ) as HTMLElement | null
        return categoryContainer || node
      }
    }
  } catch {}

  // 5. Busca flexível por candidatos visíveis com correspondência textual e por tokens
  const targetClean = cleanSearchTerm(trimmed).toLowerCase()
  const candidates = Array.from(
    document.querySelectorAll(
      'button, a, div, span, li, p, label, input, [draggable="true"], [data-testid], [class*="option" i], [class*="card" i], [class*="item" i], [class*="choice" i], [class*="category" i], [class*="bucket" i]',
    ),
  ) as HTMLElement[]

  // Prioridade A: Correspondência exata em texto, atributos ou prefixo de alternativa (ex: "A)", "B.", "1)")
  for (const item of candidates) {
    if (!isVisible(item) || isInsideEasyQuiz(item)) continue
    const txt = cleanSearchTerm(item.textContent).toLowerCase()
    const aria = cleanSearchTerm(item.getAttribute('aria-label') || '').toLowerCase()
    const cat = cleanSearchTerm(item.getAttribute('data-category') || '').toLowerCase()
    const rawVal = item instanceof HTMLInputElement || item instanceof HTMLButtonElement ? item.value : ''
    const val = cleanSearchTerm(rawVal).toLowerCase()

    const prefixMatch =
      txt.startsWith(targetClean + ')') ||
      txt.startsWith(targetClean + '.') ||
      txt.startsWith(targetClean + ' -') ||
      txt.startsWith(targetClean + ':')

    if (
      txt === targetClean ||
      aria === targetClean ||
      (cat && cat === targetClean) ||
      (val && val === targetClean) ||
      prefixMatch
    ) {
      // Se for uma categoria, procura o container/dropzone pai
      const categoryContainer = item.closest(
        '[data-role="dropzone"], [class*="category" i], [class*="bucket" i], [class*="column" i], [class*="drop" i]',
      ) as HTMLElement | null
      const clickableParent = item.closest(
        'button, a, [role="button"], [role="radio"], [role="checkbox"], [draggable="true"], [class*="card" i], [class*="option" i], [class*="item" i], label, li',
      ) as HTMLElement | null
      return categoryContainer || clickableParent || item
    }
  }

  // Prioridade B: Contenção de substring ou palavras-chave
  if (targetClean.length >= 3) {
    for (const item of candidates) {
      if (!isVisible(item) || isInsideEasyQuiz(item)) continue
      const txt = cleanSearchTerm(item.textContent).toLowerCase()
      const aria = cleanSearchTerm(item.getAttribute('aria-label') || '').toLowerCase()

      // Substring direta
      if (txt.includes(targetClean) || aria.includes(targetClean) || (targetClean.length > 8 && txt && targetClean.includes(txt))) {
        const categoryContainer = item.closest(
          '[data-role="dropzone"], [class*="category" i], [class*="bucket" i], [class*="column" i], [class*="drop" i]',
        ) as HTMLElement | null
        const clickableParent = item.closest(
          'button, a, [role="button"], [role="radio"], [role="checkbox"], [draggable="true"], [class*="card" i], [class*="option" i], [class*="item" i], label, li',
        ) as HTMLElement | null
        return categoryContainer || clickableParent || item
      }

      // Correspondência pelas primeiras 3 a 5 palavras significativas (para frases longas que a IA resumiu)
      const words = targetClean.split(' ').filter((w) => w.length > 2)
      if (words.length >= 3) {
        const leadingTokens = words.slice(0, Math.min(4, words.length)).join(' ')
        if (txt.includes(leadingTokens) || aria.includes(leadingTokens)) {
          const clickableParent = item.closest(
            'button, a, [role="button"], [role="radio"], [role="checkbox"], [draggable="true"], [class*="card" i], [class*="option" i], [class*="item" i], label, li',
          ) as HTMLElement | null
          return clickableParent || item
        }
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
  if (!element) return

  // 1. Scroll suave e centralizado para garantir visibilidade
  try {
    element.scrollIntoView({ block: 'center', inline: 'center', behavior: 'instant' as any })
  } catch {}

  // 2. Coordenadas exatas no viewport após o scroll
  let cx = 0
  let cy = 0
  if (coords && coords.length === 2) {
    cx = coords[0]
    cy = coords[1]
  } else {
    const rect = element.getBoundingClientRect()
    cx = Math.round(rect.left + Math.max(1, rect.width / 2))
    cy = Math.round(rect.top + Math.max(1, rect.height / 2))
  }

  // 3. Foco no elemento
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

  // 4. Pointer Events (Padrão W3C com mouse pointerType e pointerId)
  try {
    element.dispatchEvent(
      new PointerEvent('pointerdown', {
        ...commonProps,
        isPrimary: true,
        pointerId: 1,
        pointerType: 'mouse',
        width: 1,
        height: 1,
        pressure: 0.5,
        button: 0,
        buttons: 1,
      }),
    )
  } catch {}

  element.dispatchEvent(new MouseEvent('mousedown', { ...commonProps, button: 0, buttons: 1 }))

  try {
    element.dispatchEvent(
      new PointerEvent('pointerup', {
        ...commonProps,
        isPrimary: true,
        pointerId: 1,
        pointerType: 'mouse',
        width: 1,
        height: 1,
        pressure: 0.5,
        button: 0,
        buttons: 0,
      }),
    )
  } catch {}

  element.dispatchEvent(new MouseEvent('mouseup', { ...commonProps, button: 0, buttons: 0 }))
  element.dispatchEvent(new MouseEvent('click', { ...commonProps, button: 0, buttons: 0 }))

  // 5. Touch Events (para frameworks com event listeners de toque/mobile)
  try {
    const touch = new Touch({
      identifier: Date.now(),
      target: element,
      clientX: cx,
      clientY: cy,
      screenX: cx,
      screenY: cy,
      pageX: cx + (window.scrollX || 0),
      pageY: cy + (window.scrollY || 0),
    })
    element.dispatchEvent(
      new TouchEvent('touchstart', {
        bubbles: true,
        cancelable: true,
        composed: true,
        touches: [touch],
        targetTouches: [touch],
      }),
    )
    element.dispatchEvent(
      new TouchEvent('touchend', {
        bubbles: true,
        cancelable: true,
        composed: true,
        touches: [],
        targetTouches: [],
      }),
    )
  } catch {}

  // 6. Chamada direta do método .click() nativo
  try {
    element.click()
  } catch {}

  // 7. Se o elemento for filho de um botão ou link clicável, clica também no pai
  const clickableParent = element.closest('button, a, [role="button"], [role="radio"], [role="checkbox"], label') as HTMLElement | null
  if (clickableParent && clickableParent !== element) {
    try {
      clickableParent.click()
    } catch {}
  }

  // 8. Se o elemento tiver um radio ou checkbox interno, clica nele diretamente
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

function getSafeDataTransfer(text: string, html: string): DataTransfer | null {
  try {
    const dt = new DataTransfer()
    try {
      dt.setData('text/plain', text)
    } catch {}
    try {
      dt.setData('text/html', html)
    } catch {}
    return dt
  } catch {
    return null
  }
}

// ---- SIMULAÇÃO HÍBRIDA MULTI-ESTÁGIO E ADAPTATIVA DE ARRASTO E CATEGORIZAÇÃO ----
export async function simulateDragAndCategorize(
  origin: HTMLElement,
  dest: HTMLElement,
  attempt = 1,
): Promise<void> {
  // 1. Garante que os elementos estejam centralizados e visíveis
  try {
    origin.scrollIntoView({ block: 'center', inline: 'center', behavior: 'instant' as any })
  } catch {}

  const originRect = origin.getBoundingClientRect()
  const destRect = dest.getBoundingClientRect()

  const startX = Math.round(originRect.left + Math.max(1, originRect.width / 2))
  const startY = Math.round(originRect.top + Math.max(1, originRect.height / 2))
  const endX = Math.round(destRect.left + Math.max(1, destRect.width / 2))
  const endY = Math.round(destRect.top + Math.max(1, destRect.height / 2))

  // ---- ESTRATÉGIA A: BOTÃO, RÁDIO OU SELECT DA CATEGORIA EMBUTIDO NO CARD DE ORIGEM ----
  const destClean = cleanSearchTerm(dest.textContent).toLowerCase()
  if (destClean) {
    const directControls = Array.from(
      origin.querySelectorAll('button, [role="button"], input[type="radio"], input[type="checkbox"], option, .btn, [class*="tag" i]'),
    ) as HTMLElement[]

    const matchedCtrl = directControls.find((ctrl) => {
      const txt = cleanSearchTerm(ctrl.textContent).toLowerCase()
      const val = ctrl instanceof HTMLInputElement || ctrl instanceof HTMLOptionElement ? cleanSearchTerm(ctrl.value).toLowerCase() : ''
      return (txt && (destClean.includes(txt) || txt.includes(destClean))) || (val && (destClean.includes(val) || val.includes(destClean)))
    })

    if (matchedCtrl) {
      simulatePointerClick(matchedCtrl)
      await new Promise((r) => setTimeout(r, 120))
    }
  }

  // ---- ESTRATÉGIA B: PADRÃO CLICK-TO-SELECT E CLICK-TO-PLACE (DOMINANTE EM QUIZZES MODERNOS) ----
  simulatePointerClick(origin, [startX, startY])
  await new Promise((r) => setTimeout(r, 140))

  simulatePointerClick(dest, [endX, endY])

  // Se o destino tiver um container dropzone interno específico, clica nele também
  const dropInner = dest.querySelector(
    '[data-role="dropzone"], [class*="bucket" i], [class*="slot" i], [class*="drop" i], [class*="target" i], [class*="items" i], ul, ol',
  ) as HTMLElement | null
  if (dropInner && dropInner !== dest) {
    simulatePointerClick(dropInner)
  }

  await new Promise((r) => setTimeout(r, 100))

  // ---- ESTRATÉGIA C: ARRASTO FÍSICO COM POINTER EVENTS & MOUSE EVENTS ----
  const pStart = {
    bubbles: true,
    cancelable: true,
    composed: true,
    view: window,
    clientX: startX,
    clientY: startY,
    screenX: startX,
    screenY: startY,
    button: 0,
    buttons: 1,
  }

  try {
    origin.dispatchEvent(new PointerEvent('pointerdown', { ...pStart, isPrimary: true, pointerId: 1, pointerType: 'mouse', pressure: 0.5 }))
  } catch {}
  origin.dispatchEvent(new MouseEvent('mousedown', pStart))

  // Dispara coordenadas de movimento intermediárias
  const steps = 4
  for (let step = 1; step <= steps; step++) {
    const curX = Math.round(startX + (endX - startX) * (step / steps))
    const curY = Math.round(startY + (endY - startY) * (step / steps))
    const moveProps = { ...pStart, clientX: curX, clientY: curY, screenX: curX, screenY: curY }
    try {
      origin.dispatchEvent(new PointerEvent('pointermove', { ...moveProps, isPrimary: true, pointerId: 1, pointerType: 'mouse', pressure: 0.5 }))
    } catch {}
    document.dispatchEvent(new MouseEvent('mousemove', moveProps))
  }

  const pEnd = {
    bubbles: true,
    cancelable: true,
    composed: true,
    view: window,
    clientX: endX,
    clientY: endY,
    screenX: endX,
    screenY: endY,
    button: 0,
    buttons: 0,
  }

  try {
    dest.dispatchEvent(new PointerEvent('pointerup', { ...pEnd, isPrimary: true, pointerId: 1, pointerType: 'mouse', pressure: 0 }))
  } catch {}
  dest.dispatchEvent(new MouseEvent('mouseup', pEnd))
  dest.dispatchEvent(new MouseEvent('click', pEnd))

  // ---- ESTRATÉGIA D: HTML5 DRAG & DROP NATIVO SEGURO ----
  try {
    const dt = getSafeDataTransfer(cleanText(origin.textContent), origin.outerHTML)
    const dragStartInit: DragEventInit = { ...pStart }
    const dragEndInit: DragEventInit = { ...pEnd }
    if (dt) {
      dragStartInit.dataTransfer = dt
      dragEndInit.dataTransfer = dt
    }

    origin.dispatchEvent(new DragEvent('dragstart', dragStartInit))
    dest.dispatchEvent(new DragEvent('dragenter', dragEndInit))
    dest.dispatchEvent(new DragEvent('dragover', dragEndInit))
    dest.dispatchEvent(new DragEvent('drop', dragEndInit))
    origin.dispatchEvent(new DragEvent('dragend', dragStartInit))
  } catch (dragErr) {
    console.warn('[EasyQuiz] DragEvent ignorado com segurança:', dragErr)
  }

  // ---- ESTRATÉGIA E: TOUCH EVENTS (Para frameworks com detecção touch/mobile) ----
  try {
    const touchStart = new Touch({ identifier: 1, target: origin, clientX: startX, clientY: startY })
    const touchEnd = new Touch({ identifier: 1, target: dest, clientX: endX, clientY: endY })

    origin.dispatchEvent(new TouchEvent('touchstart', { bubbles: true, cancelable: true, touches: [touchStart] }))
    dest.dispatchEvent(new TouchEvent('touchmove', { bubbles: true, cancelable: true, touches: [touchEnd] }))
    dest.dispatchEvent(new TouchEvent('touchend', { bubbles: true, cancelable: true, touches: [] }))
  } catch {}

  // ---- ESTRATÉGIA F: RETENTATIVAS ADAPTATIVAS (TECLADO SPACE/ENTER) ----
  if (attempt >= 2 && !dest.contains(origin)) {
    try {
      origin.focus?.()
      origin.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', code: 'Space', bubbles: true }))
      origin.dispatchEvent(new KeyboardEvent('keyup', { key: ' ', code: 'Space', bubbles: true }))
      await new Promise((r) => setTimeout(r, 80))
      dest.focus?.()
      dest.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', bubbles: true }))
      dest.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter', code: 'Enter', bubbles: true }))
    } catch {}
  }
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
async function executeDeclarativeAction(action: DeclarativeAction, attempt = 1): Promise<void> {
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
    let fromEl = findElementExt(action.from)
    let toEl = findElementExt(action.to)

    if (!fromEl && action.from) {
      fromEl = findElementExt(cleanSearchTerm(action.from))
    }
    if (!toEl && action.to) {
      toEl = findElementExt(cleanSearchTerm(action.to))
    }

    if (fromEl && toEl) {
      await simulateDragAndCategorize(fromEl, toEl, attempt)
    } else {
      console.warn(`[EasyQuiz] Drag: alvo não encontrado ('${action.from}' -> '${action.to}')`)
    }
    return
  }

  const elId = action.id || ''
  let element = findElementExt(elId)
  if (!element && elId) {
    element = findElementExt(cleanSearchTerm(elId))
  }

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
      if (element) {
        simulatePointerClick(element, action.co)
        const innerRadio = element.querySelector('input[type="radio"], input[type="checkbox"]') as HTMLInputElement | null
        if (innerRadio && !innerRadio.checked) {
          setCheckedState(innerRadio, true)
        }
      }
      break
    case 'adv':
      const targetNav = findBestNavigationButton(action.id)
      if (targetNav) {
        await waitForEnabled(targetNav, 1200)
        const heuristic = action.id || targetNav.textContent?.trim() || ''
        if (heuristic) {
          saveDomainCache(window.location.hostname, { advanceSelector: heuristic })
        }
        simulatePointerClick(targetNav)
      } else {
        console.warn('[EasyQuiz] Botão de avanço não localizado.')
      }
      break
  }
}

// ---- LOCALIZAÇÃO INTELIGENTE DE BOTÕES DE CHECAGEM E AVANÇO ----
export function findCheckButton(): HTMLElement | null {
  const query = [
    'button',
    'a',
    '[role="button"]',
    'input[type="submit"]',
    'input[type="button"]',
    '[data-testid*="check" i]',
    '[data-test-id*="check" i]',
  ].join(',')

  const candidates = Array.from(document.querySelectorAll(query)) as HTMLElement[]
  return (
    candidates.find((b) => {
      if (!isVisible(b) || isInsideEasyQuiz(b)) return false
      const val = b instanceof HTMLInputElement || b instanceof HTMLButtonElement ? b.value : ''
      const text = (b.textContent || val || b.getAttribute('aria-label') || '').trim()
      return /(verificar|checar|check|conferir|validar|enviar|responder)/i.test(text)
    }) || null
  )
}

export function findBestNavigationButton(preferredId?: string): HTMLElement | null {
  // 1. Seletor ou ID preferencial informado pela IA
  if (preferredId) {
    const el = findElementExt(preferredId)
    if (el && isVisible(el) && !isInsideEasyQuiz(el)) return el
  }

  // 2. Cache de domínio salvo de execuções anteriores bem-sucedidas
  try {
    const cache = loadDomainCache(window.location.hostname)
    if (cache.advanceSelector) {
      const cached = findElementExt(cache.advanceSelector)
      if (cached && isVisible(cached) && !isInsideEasyQuiz(cached)) return cached
    }
  } catch {}

  // 3. Consulta de elementos interativos e links em toda a página
  const query = [
    'button',
    'a',
    '[role="button"]',
    '[role="link"]',
    'input[type="button"]',
    'input[type="submit"]',
    '[data-testid*="next" i]',
    '[data-testid*="continue" i]',
    '[data-testid*="check" i]',
    '[data-test-id*="next" i]',
    '[data-test-id*="continue" i]',
    '[data-test-id*="check" i]',
    '[class*="next" i]',
    '[class*="continue" i]',
    '[class*="proximo" i]',
    '[class*="avancar" i]',
  ].join(',')

  const all = Array.from(document.querySelectorAll(query)) as HTMLElement[]
  const candidates = all.filter((el) => isVisible(el) && !isInsideEasyQuiz(el))

  // Prioridade A: Satisfaz isNavigationControl
  for (const el of candidates) {
    if (isNavigationControl(el)) return el
  }

  // Prioridade B: Match com NAVIGATION_PATTERN em texto, valor ou aria-label
  for (const el of candidates) {
    const val = el instanceof HTMLInputElement || el instanceof HTMLButtonElement ? el.value : ''
    const text = (el.textContent || val || el.getAttribute('aria-label') || '').trim()
    if (NAVIGATION_PATTERN.test(text)) return el
  }

  // Prioridade C: Seletor genérico por atributo de acessibilidade ou teste
  const genericNext = document.querySelector(
    '[data-test-id*="next" i], [data-testid*="next" i], [aria-label*="next" i], [aria-label*="próxim" i], [aria-label*="avançar" i], [aria-label*="continuar" i]',
  ) as HTMLElement | null
  if (genericNext && isVisible(genericNext) && !isInsideEasyQuiz(genericNext)) {
    return genericNext
  }

  return null
}

export async function waitForEnabled(el: HTMLElement, maxMs = 1500): Promise<void> {
  const start = Date.now()
  while (Date.now() - start < maxMs) {
    const isDisabled =
      (el as any).disabled === true ||
      el.getAttribute('aria-disabled') === 'true' ||
      el.classList.contains('disabled') ||
      el.getAttribute('disabled') !== null
    if (!isDisabled) return
    await new Promise((r) => setTimeout(r, 100))
  }
  // Se ainda estiver marcado como disabled após o timeout, tenta remover os atributos para permitir o clique
  try {
    el.removeAttribute('disabled')
    el.removeAttribute('aria-disabled')
    el.classList.remove('disabled')
    ;(el as any).disabled = false
  } catch {}
}

export async function executePlan(
  plan: AnalysisPlan,
  allowAdvance: boolean,
  attempt = 1,
): Promise<{ applied: number; advanced: boolean }> {
  const regularActions = plan.actions.filter((a) => a.t !== 'adv')
  const advanceActions = plan.actions.filter((a) => a.t === 'adv')

  let appliedCount = 0

  for (const action of regularActions) {
    try {
      await executeDeclarativeAction(action, attempt)
      appliedCount++
    } catch (err) {
      console.warn('[EasyQuiz] Ação declarativa falhou com segurança:', action, err)
    }
    if (action.t === 'drag') {
      await new Promise((resolve) => setTimeout(resolve, 250))
    }
  }

  let advanced = false
  if (allowAdvance || attempt >= 2) {
    // Aguarda o framework hospedeiro (React, Vue, etc.) registrar o input/seleção
    await new Promise((resolve) => setTimeout(resolve, regularActions.length > 0 ? 500 : 200))

    // 1. Em questões com etapa intermediária de checagem ("Verificar", "Check", "Conferir")
    if (plan.pageType !== 'info') {
      const checkBtn = findCheckButton()
      if (checkBtn && isVisible(checkBtn)) {
        await waitForEnabled(checkBtn, 1200)
        simulatePointerClick(checkBtn)
        // Aguarda animação e feedback do quiz
        await new Promise((resolve) => setTimeout(resolve, 800))
      }
    }

    // 2. Acionamento do botão de avanço final ("Continuar", "Próxima tarefa", "Avançar", "Próxima pergunta")
    const preferredId = advanceActions.length > 0 ? advanceActions[0].id : undefined
    const navBtn = findBestNavigationButton(preferredId)

    if (navBtn) {
      await waitForEnabled(navBtn, 1200)
      const heuristic = preferredId || navBtn.textContent?.trim() || ''
      if (heuristic) {
        saveDomainCache(window.location.hostname, { advanceSelector: heuristic })
      }
      simulatePointerClick(navBtn)
      advanced = true
    } else {
      console.warn('[EasyQuiz] Nenhum botão de avanço encontrado na página.')
    }
  }

  return {
    applied: appliedCount,
    advanced,
  }
}
