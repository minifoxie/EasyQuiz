import type { AnalysisPlan, DeclarativeAction } from '../core/types'
import { loadDomainCache, saveDomainCache } from '../core/storage'
import { cleanText, isNavigationControl, isVisible, NAVIGATION_PATTERN } from './controls'

export function isInsideEasyQuiz(el: HTMLElement | null): boolean {
  if (!el) return false
  return Boolean(
    el.closest(
      '#easyquiz-shadow-root, .eq-sidebar, .eq-launcher, [data-easyquiz-ignore="true"], .btn-inject-eq, #btn-inject-script',
    ) || el.getAttribute?.('data-easyquiz-ignore') === 'true',
  )
}

export function cleanSearchTerm(term: string): string {
  if (!term) return ''
  return term
    // Remove prefixos estritos de numeração de questão/alternativa como "1. ", "2) ", "1 - ", "A) ", "(A) ", "A: "
    .replace(/^(\([0-9a-zA-Z]{1,2}\)|[0-9]{1,3}|[a-zA-Z])[\.\)\-\:]\s+/, '')
    .replace(/[\.\u2026]{2,}/g, ' ') // Remove reticências como "..." ou "…"
    .replace(/['"“”«»]/g, '') // Remove aspas
    .replace(/\s+/g, ' ')
    .trim()
}

// ---- RESOLUÇÃO ROBUSTA DE CONTROLE OU CARD VERDADEIRO ----
export function resolveTargetControlOrCard(element: HTMLElement): HTMLElement {
  if (!element) return element

  // 1. Se já for um controle de entrada direto ou item arrastável/dropzone
  if (
    element instanceof HTMLInputElement ||
    element instanceof HTMLSelectElement ||
    element instanceof HTMLTextAreaElement ||
    element.getAttribute('draggable') === 'true' ||
    element.classList.contains('dnd-card') ||
    element.hasAttribute('data-category') ||
    element.hasAttribute('data-dropzone')
  ) {
    return element
  }

  // 2. Se o próprio elemento tiver atributo 'for', busca o input correspondente
  if (element.hasAttribute('for')) {
    const forId = element.getAttribute('for')
    if (forId) {
      const forEl = element.ownerDocument.getElementById(forId)
      if (forEl) return forEl
    }
  }

  // 3. Procura container de alternativa/questão verdadeiro (evita match prematuro em .option-text, .option-badge e NUNCA sobe para article/section/main)
  const trueCard = element.closest(
    'label, .option-card, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, tr, li, .dnd-card, [class*="option-card" i], [class*="choice-card" i]',
  ) as HTMLElement | null

  if (trueCard && !['article', 'section', 'main', 'form', 'body'].includes(trueCard.tagName.toLowerCase())) {
    const forId = trueCard.getAttribute('for')
    const forInput = forId ? (trueCard.ownerDocument.getElementById(forId) as HTMLInputElement | null) : null
    const innerInput = (forInput || trueCard.querySelector('input:not([type="hidden"]), select, textarea')) as HTMLElement | null
    if (innerInput) return innerInput
    return trueCard
  }

  const clickable = element.closest('button, a, [role="button"], [draggable="true"]') as HTMLElement | null
  if (clickable) return clickable

  // NUNCA retorna containers globais como body/html/main quando há controles internos
  if (['body', 'html', 'main', 'section', 'article', 'form'].includes(element.tagName.toLowerCase())) {
    const inner = element.querySelector('button, [role="button"], a, input:not([type="hidden"]), select, textarea, [role="radio"], [role="checkbox"], .option-card, label') as HTMLElement | null
    if (inner) return resolveTargetControlOrCard(inner)
  }

  return element
}

// ---- MOTOR DE BUSCA ROBUSTA DE ELEMENTOS ----
export function findElementExt(idOrLabel: string): HTMLElement | null {
  if (!idOrLabel) return null
  const trimmed = idOrLabel.trim().replace(/^["'“”«»]+|["'“”«»]+$/g, '')
  if (!trimmed) return null

  // 1. Tenta por ID estrito gerado pelo EasyQuiz (garantindo visibilidade)
  const escaped = CSS.escape(trimmed)
  let el = document.querySelector(`[data-easyquiz-id="${escaped}"]`) as HTMLElement | null
  if (el && !isInsideEasyQuiz(el) && isVisible(el)) return resolveTargetControlOrCard(el)

  // 2. Tenta por ID real nativo no DOM se estiver visível (O(1) instantâneo)
  try {
    const elById = document.getElementById(trimmed)
    if (elById && !isInsideEasyQuiz(elById) && isVisible(elById)) {
      const isDrop = elById.hasAttribute('data-category') || elById.hasAttribute('data-dropzone') || elById.classList.contains('dnd-zone')
      return isDrop ? elById : resolveTargetControlOrCard(elById)
    }
  } catch {}

  // 3. Resolução Ordinal / Numérica Direta (ex: "1", "3", "Item 1", "Opção 3", "Afirmação 1", "Alternativa 2")
  // Mapeia diretamente para o N-ésimo input visível no formulário ativo
  const ordinalNumMatch = trimmed.match(/^(?:item|opção|opcao|afirmação|afirmacao|alternativa|linha|afirmativa|questão|questao)?\s*#?([0-9]+)$/i)
  if (ordinalNumMatch) {
    const targetIdx = parseInt(ordinalNumMatch[1], 10) - 1
    if (targetIdx >= 0) {
      const visibleChoices = Array.from(
        document.querySelectorAll(
          'input[type="checkbox"], input[type="radio"], [role="checkbox"], [role="radio"]',
        ),
      ).filter((e) => isVisible(e as HTMLElement) && !isInsideEasyQuiz(e as HTMLElement)) as HTMLElement[]

      if (targetIdx < visibleChoices.length) {
        return resolveTargetControlOrCard(visibleChoices[targetIdx])
      }
    }
  }

  // 4. Resolução Ordinal Alfabética Direta (ex: "A", "B", "C", "D", "Alternativa B")
  const ordinalLetterMatch = trimmed.match(/^(?:item|opção|opcao|afirmação|afirmacao|alternativa|linha|afirmativa|questão|questao)?\s*#?([a-eA-E])$/i)
  if (ordinalLetterMatch) {
    const letterIdx = ordinalLetterMatch[1].toUpperCase().charCodeAt(0) - 65
    if (letterIdx >= 0) {
      const visibleChoices = Array.from(
        document.querySelectorAll(
          'input[type="checkbox"], input[type="radio"], [role="checkbox"], [role="radio"]',
        ),
      ).filter((e) => isVisible(e as HTMLElement) && !isInsideEasyQuiz(e as HTMLElement)) as HTMLElement[]

      if (letterIdx < visibleChoices.length) {
        return resolveTargetControlOrCard(visibleChoices[letterIdx])
      }
    }
  }

  // 5. Se for uma letra, código, categoria ou valor curto (ex: "PA", "PG", "chk1")
  // Busca em elementos ESTREITAMENTE VISÍVEIS para não colidir com etapas ocultas
  if (/^[a-zA-Z0-9_-]{1,10}$/.test(trimmed)) {
    const dropzoneCandidates = Array.from(
      document.querySelectorAll(
        `[data-category="${escaped}" i], [data-dropzone="${escaped}" i], [data-role="dropzone"][data-category="${escaped}" i]`,
      ),
    ) as HTMLElement[]
    const dropzoneMatch = dropzoneCandidates.find((d) => isVisible(d) && !isInsideEasyQuiz(d))
    if (dropzoneMatch) return dropzoneMatch

    const inputCandidates = Array.from(
      document.querySelectorAll(
        `input[value="${escaped}" i], [data-value="${escaped}" i], input[id="${escaped}" i]`,
      ),
    ) as HTMLElement[]
    const inputMatch = inputCandidates.find((i) => isVisible(i) && !isInsideEasyQuiz(i))
    if (inputMatch) return resolveTargetControlOrCard(inputMatch)

    const badgeMatch = Array.from(
      document.querySelectorAll('.option-badge, [class*="badge" i], [class*="letter" i], .option-card span, label span'),
    ).find((b) => {
      if (!isVisible(b as HTMLElement) || isInsideEasyQuiz(b as HTMLElement)) return false
      const t = cleanSearchTerm(b.textContent).toLowerCase()
      return t === trimmed.toLowerCase() || t === trimmed.toLowerCase() + ')'
    }) as HTMLElement | undefined
    if (badgeMatch) return resolveTargetControlOrCard(badgeMatch)
  }

  // 6. Tenta por name, value, data-category, data-dropzone, data-testid, aria-label em elementos visíveis
  try {
    const attrCandidates = Array.from(
      document.querySelectorAll(
        `[name="${escaped}"], [value="${escaped}"], [data-category="${escaped}" i], [data-dropzone="${escaped}" i], [data-testid="${escaped}" i], [data-test-id="${escaped}" i], [aria-label="${escaped}" i]`,
      ),
    ) as HTMLElement[]
    const attrMatch = attrCandidates.find((item) => isVisible(item) && !isInsideEasyQuiz(item))
    if (attrMatch) {
      const isDrop = attrMatch.hasAttribute('data-category') || attrMatch.hasAttribute('data-dropzone') || attrMatch.classList.contains('dnd-zone')
      return isDrop ? attrMatch : resolveTargetControlOrCard(attrMatch)
    }
  } catch {}

  // 7. Tenta como seletor CSS composto (NUNCA tags simples como "b", "a", "p" para não colidir com alternativas)
  const isLikelyCssSelector = /^[.#\[]|\s|[>+~:]/.test(trimmed)
  if (isLikelyCssSelector) {
    try {
      const cssCandidates = Array.from(document.querySelectorAll(trimmed)) as HTMLElement[]
      const cssMatch = cssCandidates.find((item) => isVisible(item) && !isInsideEasyQuiz(item))
      if (cssMatch) return resolveTargetControlOrCard(cssMatch)
    } catch {}
  }

  // 8. Tenta via XPath para texto exato no nó folha ou controle direto visível
  try {
    const cleanXpath = trimmed.replace(/"/g, '')
    const xpath = `//button[normalize-space(.)="${cleanXpath}"] | //a[normalize-space(.)="${cleanXpath}"] | //*[not(*) and normalize-space(.)="${cleanXpath}"] | //*[@aria-label="${cleanXpath}"] | //*[@data-category="${cleanXpath}"] | //*[@data-testid="${cleanXpath}"]`
    const result = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null)
    for (let i = 0; i < result.snapshotLength; i++) {
      const node = result.snapshotItem(i) as HTMLElement
      if (node && isVisible(node) && !isInsideEasyQuiz(node)) {
        if (['body', 'html'].includes(node.tagName.toLowerCase())) {
          const inner = node.querySelector('button, [role="button"], a, input, [role="radio"], [role="checkbox"], label') as HTMLElement | null
          if (inner && isVisible(inner)) return resolveTargetControlOrCard(inner)
        }
        const categoryContainer = node.closest(
          '[data-role="dropzone"], [class*="category" i], [class*="bucket" i], [class*="column" i], [class*="drop" i]',
        ) as HTMLElement | null
        return categoryContainer || resolveTargetControlOrCard(node)
      }
    }
  } catch {}

  // 6. Busca flexível por candidatos visíveis com correspondência textual e por tokens
  const targetClean = cleanSearchTerm(trimmed).toLowerCase()
  const candidates = Array.from(
    document.querySelectorAll(
      'button, a, div, span, li, p, label, input, [draggable="true"], [data-testid], [class*="option" i], [class*="card" i], [class*="item" i], [class*="choice" i], [class*="category" i], [class*="bucket" i]',
    ),
  ) as HTMLElement[]

  // Prioridade A: Correspondência exata em texto, atributos ou prefixo de alternativa (ex: "A)", "B.", "1)")
  for (const item of candidates) {
    if (!isVisible(item) || isInsideEasyQuiz(item) || item.closest('header, nav, .stepper, .step-item, .progress-bar-container')) continue

    const isContainerOfOptions = Boolean(
      item.matches('article, section, form, main, [class*="container" i], [class*="grid" i], .dnd-pool, .dnd-zones') ||
      item.querySelector('label, [role="radio"], [role="checkbox"], .dnd-card, [draggable="true"], .option-card, tr')
    )
    if (isContainerOfOptions && !item.matches('.dnd-zone, [data-category], [data-dropzone]')) continue

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
      return categoryContainer || resolveTargetControlOrCard(item)
    }
  }

  // Prioridade B: Contenção de substring ou palavras-chave
  if (targetClean.length >= 3) {
    for (const item of candidates) {
      if (!isVisible(item) || isInsideEasyQuiz(item) || item.closest('header, nav, .stepper, .step-item, .progress-bar-container')) continue

      const isContainerOfOptions = Boolean(
        item.matches('article, section, form, main, [class*="container" i], [class*="grid" i], .dnd-pool, .dnd-zones') ||
        item.querySelector('label, [role="radio"], [role="checkbox"], .dnd-card, [draggable="true"], .option-card, tr')
      )
      if (isContainerOfOptions && !item.matches('.dnd-zone, [data-category], [data-dropzone]')) continue

      const txt = cleanSearchTerm(item.textContent).toLowerCase()
      const aria = cleanSearchTerm(item.getAttribute('aria-label') || '').toLowerCase()

      // Substring direta onde o texto do elemento contém o termo de busca
      if (txt.includes(targetClean) || aria.includes(targetClean)) {
        // Se algum elemento filho também contém o termo de busca, pula o container pai para pegar o nó folha mais específico
        const hasChildMatching = Array.from(item.children).some((child) => {
          const cTxt = cleanSearchTerm(child.textContent).toLowerCase()
          return cTxt && cTxt.includes(targetClean)
        })
        if (hasChildMatching) continue

        const categoryContainer = item.closest(
          '[data-role="dropzone"], [class*="category" i], [class*="bucket" i], [class*="column" i], [class*="drop" i]',
        ) as HTMLElement | null
        return categoryContainer || resolveTargetControlOrCard(item)
      }

      // Correspondência pelas primeiras 3 a 5 palavras da frase (para frases longas ou fórmulas)
      const words = targetClean.split(/\s+/).filter(Boolean)
      if (words.length >= 3) {
        const leadingTokens = words.slice(0, Math.min(5, words.length)).join(' ')
        if (txt.includes(leadingTokens) || aria.includes(leadingTokens)) {
          return resolveTargetControlOrCard(item)
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

  // Se o elemento for um container de opção (card/label) com checkbox ou rádio interno:
  // Redireciona com precisão máxima para o input nativo (o quadradinho ou bolinha) para não colidir com listeners do quiz
  const innerInput =
    element instanceof HTMLInputElement && ['checkbox', 'radio'].includes(element.type)
      ? element
      : (element.querySelector('input[type="checkbox"], input[type="radio"]') as HTMLInputElement | null) ||
        (element.hasAttribute('for') ? (element.ownerDocument.getElementById(element.getAttribute('for')!) as HTMLInputElement | null) : null)

  if (innerInput && element !== innerInput) {
    if (innerInput.type === 'checkbox') {
      setCheckedState(innerInput, !innerInput.checked)
      return
    }
    if (innerInput.type === 'radio') {
      setCheckedState(innerInput, true)
      return
    }
  }

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

  try {
    const MouseEventCtor = element.ownerDocument?.defaultView?.MouseEvent || window.MouseEvent
    if (MouseEventCtor) {
      element.dispatchEvent(new MouseEventCtor('mousedown', { ...commonProps, button: 0, buttons: 1 }))
    }
  } catch {}

  try {
    const PointerEventCtor = element.ownerDocument?.defaultView?.PointerEvent || window.PointerEvent
    if (PointerEventCtor) {
      element.dispatchEvent(
        new PointerEventCtor('pointerup', {
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
    }
  } catch {}

  try {
    const MouseEventCtor = element.ownerDocument?.defaultView?.MouseEvent || window.MouseEvent
    if (MouseEventCtor) {
      element.dispatchEvent(new MouseEventCtor('mouseup', { ...commonProps, button: 0, buttons: 0 }))
      element.dispatchEvent(new MouseEventCtor('click', { ...commonProps, button: 0, buttons: 0 }))
    }
  } catch {}

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

  // 6. Chamada direta do método .click() nativo (apenas se não for checkbox que inverte estado com clique duplicado)
  if (!(element instanceof HTMLInputElement && element.type === 'checkbox')) {
    try {
      element.click()
    } catch {}
  }

  // 7. Se o elemento for filho de um botão ou link clicável (e não for um label que já ativa o input), clica também no pai
  const isLabelOrInput = element instanceof HTMLInputElement || element instanceof HTMLLabelElement
  if (!isLabelOrInput) {
    const clickableParent = element.closest('button, a, [role="button"], [role="radio"], [role="checkbox"]') as HTMLElement | null
    if (clickableParent && clickableParent !== element) {
      try {
        clickableParent.click()
      } catch {}
    }
  }
}

function setNativeValue(element: HTMLElement, value: string): void {
  let target: HTMLElement = element
  if (!(target instanceof HTMLInputElement) && !(target instanceof HTMLTextAreaElement) && !(target instanceof HTMLSelectElement) && !target.isContentEditable) {
    const inner = element.querySelector('input:not([type="hidden"]), textarea, select, [contenteditable="true"]') as HTMLElement | null
    if (inner) {
      target = inner
    }
  }

  // Se o elemento for um botão, link ou controle de navegação, auto-corrige para clique
  const isBtnTarget =
    target instanceof HTMLButtonElement ||
    target.tagName.toLowerCase() === 'a' ||
    target.getAttribute('role') === 'button' ||
    target.getAttribute('role') === 'link' ||
    (target instanceof HTMLInputElement && ['button', 'submit'].includes(target.type)) ||
    isNavigationControl(target)

  if (isBtnTarget) {
    console.log(`[EasyQuiz] Auto-correção em setNativeValue: elemento é botão/navegação. Clicando...`)
    simulatePointerClick(target)
    return
  }

  // Se o elemento for um <select>, redireciona para selectValues
  if (target instanceof HTMLSelectElement) {
    selectValues(target, [value])
    return
  }

  // Se o elemento for um radio ou checkbox
  if (target instanceof HTMLInputElement && ['checkbox', 'radio'].includes(target.type)) {
    const shouldCheck = ['true', '1', 'checked', 'yes', 'sim'].includes(value.toLowerCase()) || value === target.value
    setCheckedState(target, shouldCheck)
    return
  }

  // 1. Foco no elemento
  try {
    target.focus?.()
  } catch {}

  // 2. Evento BeforeInput (para frameworks modernos como React 18, Vue 3, Draft.js, ProseMirror)
  try {
    target.dispatchEvent(new InputEvent('beforeinput', { bubbles: true, cancelable: true, composed: true, data: value }))
  } catch {}

  // 3. Inputs ou Textareas padrão
  if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) {
    try {
      const tracker = (target as any)._valueTracker
      if (tracker) tracker.setValue('')
    } catch {}

    const prototype = target instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype
    const setter = Object.getOwnPropertyDescriptor(prototype, 'value')?.set
    if (setter) {
      setter.call(target, value)
    } else {
      target.value = value
    }

    try {
      const tracker = (target as any)._valueTracker
      if (tracker) tracker.setValue(value)
    } catch {}

    dispatchEventSequence(target, ['input', 'change', 'blur'])
    return
  }

  // 4. ContentEditable ou editores baseados em nós de texto
  if (target.isContentEditable) {
    try {
      document.execCommand?.('selectAll', false, undefined)
      document.execCommand?.('insertText', false, value)
    } catch {}
    if (target.textContent?.trim() !== value.trim()) {
      target.textContent = value
      try { (target as any).innerText = value } catch {}
    }
    dispatchEventSequence(target, ['input', 'change', 'blur'])
    return
  }

  // 5. Fallback genérico para elementos customizados com atributo value ou textContent
  try {
    (target as any).value = value
    target.textContent = value
    dispatchEventSequence(target, ['input', 'change', 'blur'])
  } catch {}
}

export function getHumanReadableLabel(idOrQuery: string, fallback = ''): string {
  if (!idOrQuery) return fallback
  const clean = cleanSearchTerm(idOrQuery)
  const el = findElementExt(idOrQuery) || findElementExt(clean)
  if (!el) return clean || fallback

  // 1. Se houver label associado ou container de opção
  const labelParent = el.closest('label, .option-card, [class*="choice" i], [class*="option" i], .quiz-option, tr')
  if (labelParent) {
    const txt = cleanSearchTerm(labelParent.textContent)
    if (txt && txt.length > 0 && txt.length < 150) return txt
  }

  if (el.id) {
    const labelFor = document.querySelector(`label[for="${CSS.escape(el.id)}"]`)
    if (labelFor) {
      const txt = cleanSearchTerm(labelFor.textContent)
      if (txt && txt.length > 0 && txt.length < 150) return txt
    }
  }

  // 2. Placeholder ou aria-label
  const aria = el.getAttribute('aria-label')
  if (aria) return cleanSearchTerm(aria)

  const ph = el.getAttribute('placeholder')
  if (ph) return cleanSearchTerm(ph)

  // 3. TextContent do próprio elemento se conciso
  const text = cleanSearchTerm(el.textContent)
  if (text && text.length > 0 && text.length < 120) return text

  return clean || fallback
}

function setCheckedState(element: HTMLElement, checked: boolean): void {
  const cardParent = (element.closest(
    '.option-card, label, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, [class*="option" i], [class*="choice" i], li',
  ) || element) as HTMLElement

  let inputEl =
    element instanceof HTMLInputElement && ['checkbox', 'radio'].includes(element.type)
      ? element
      : (cardParent.querySelector('input[type="checkbox"], input[type="radio"]') as HTMLInputElement | null)

  if (!inputEl && cardParent.hasAttribute('for')) {
    const forId = cardParent.getAttribute('for')
    if (forId) {
      inputEl = cardParent.ownerDocument.getElementById(forId) as HTMLInputElement | null
    }
  }

  // 1. Atualizar atributos de acessibilidade e classes visuais
  if (cardParent) {
    cardParent.setAttribute('aria-checked', checked ? 'true' : 'false')
    cardParent.setAttribute('aria-selected', checked ? 'true' : 'false')
    cardParent.setAttribute('aria-pressed', checked ? 'true' : 'false')
    cardParent.setAttribute('data-selected', checked ? 'true' : 'false')
    cardParent.setAttribute('data-checked', checked ? 'true' : 'false')
    cardParent.setAttribute('data-state', checked ? 'checked' : 'unchecked')
    cardParent.classList.toggle('selected', checked)
    cardParent.classList.toggle('active', checked)
    cardParent.classList.toggle('checked', checked)
  }

  // 2. Se for CHECKBOX:
  if (inputEl && inputEl.type === 'checkbox') {
    // 1ª VIA: Atribuição direta da propriedade checked
    inputEl.checked = checked

    // 2ª VIA: Invocação do prototype setter nativo (para furar wrappers de frameworks)
    try {
      const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'checked')?.set
      setter?.call(inputEl, checked)
    } catch {}

    // 3ª VIA: React internal valueTracker
    try {
      const tracker = (inputEl as any)._valueTracker
      if (tracker) tracker.setValue(!checked)
    } catch {}

    // 4ª VIA: Disparo de eventos nativos de formulário
    dispatchEventSequence(inputEl, ['input', 'change'])

    // 5ª VIA: Sincronização visual no card pai
    if (cardParent && cardParent !== inputEl) {
      cardParent.classList.toggle('selected', checked)
      cardParent.classList.toggle('active', checked)
      cardParent.classList.toggle('checked', checked)
    }

    // 6ª VIA: Se o estado ainda divergir, dispara sequência física cirúrgica nas coordenadas exatas do quadradinho do input
    if (inputEl.checked !== checked) {
      try {
        const rect = inputEl.getBoundingClientRect()
        const cx = Math.round(rect.left + Math.max(1, rect.width / 2))
        const cy = Math.round(rect.top + Math.max(1, rect.height / 2))
        const common = { bubbles: true, cancelable: true, composed: true, view: window, clientX: cx, clientY: cy }
        inputEl.dispatchEvent(new PointerEvent('pointerdown', { ...common, isPrimary: true, pointerId: 1, pointerType: 'mouse', button: 0, buttons: 1 }))
        inputEl.dispatchEvent(new MouseEvent('mousedown', { ...common, button: 0, buttons: 1 }))
        inputEl.dispatchEvent(new PointerEvent('pointerup', { ...common, isPrimary: true, pointerId: 1, pointerType: 'mouse', button: 0, buttons: 0 }))
        inputEl.dispatchEvent(new MouseEvent('mouseup', { ...common, button: 0, buttons: 0 }))
        inputEl.dispatchEvent(new MouseEvent('click', { ...common, button: 0, buttons: 0 }))
        inputEl.click()
      } catch {}
    }

    return
  }

  // 3. Se for RADIO:
  if (inputEl && inputEl.type === 'radio') {
    if (inputEl.checked === true && checked === true) {
      return
    }

    inputEl.checked = checked
    try {
      const tracker = (inputEl as any)._valueTracker
      if (tracker) tracker.setValue(!checked)
    } catch {}
    try {
      const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'checked')?.set
      setter?.call(inputEl, checked)
    } catch {}
    inputEl.checked = checked
    dispatchEventSequence(inputEl, ['input', 'change'])

    // Dispara clique no card ou rádio
    const clickTarget = cardParent !== inputEl ? cardParent : inputEl
    try { clickTarget.focus?.() } catch {}
    clickTarget.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, composed: true, view: window }))
    try { (clickTarget as any).onclick?.() } catch {}
    return
  }

  // 4. Se NÃO houver input nativo (ex: card personalizado, li, button estilizado):
  const clickTarget = cardParent
  try { clickTarget.focus?.() } catch {}
  const rect = clickTarget.getBoundingClientRect()
  const cx = Math.round(rect.left + Math.max(1, rect.width / 2))
  const cy = Math.round(rect.top + Math.max(1, rect.height / 2))
  const commonProps = {
    bubbles: true,
    cancelable: true,
    composed: true,
    view: window,
    clientX: cx,
    clientY: cy,
  }

  try {
    clickTarget.dispatchEvent(new PointerEvent('pointerdown', { ...commonProps, isPrimary: true, pointerId: 1, pointerType: 'mouse', button: 0, buttons: 1 }))
  } catch {}
  clickTarget.dispatchEvent(new MouseEvent('mousedown', { ...commonProps, button: 0, buttons: 1 }))
  try {
    clickTarget.dispatchEvent(new PointerEvent('pointerup', { ...commonProps, isPrimary: true, pointerId: 1, pointerType: 'mouse', button: 0, buttons: 0 }))
  } catch {}
  clickTarget.dispatchEvent(new MouseEvent('mouseup', { ...commonProps, button: 0, buttons: 0 }))
  clickTarget.dispatchEvent(new MouseEvent('click', { ...commonProps, button: 0, buttons: 0 }))
  try { (clickTarget as any).onclick?.() } catch {}
}

function selectValues(element: HTMLElement, values: string[]): void {
  const selectEl =
    element instanceof HTMLSelectElement
      ? element
      : (element.querySelector('select') as HTMLSelectElement | null)

  if (selectEl) {
    const normValues = values.map((v) => cleanSearchTerm(v).toLowerCase())
    let matched = false

    // Passagem 1: Correspondência exata em value ou textContent
    for (let i = 0; i < selectEl.options.length; i++) {
      const option = selectEl.options[i]
      const optVal = option.value.toLowerCase()
      const optTxt = cleanSearchTerm(option.textContent).toLowerCase()

      const isExact = normValues.some((v) => v === optVal || v === optTxt)
      if (isExact) {
        option.selected = true
        selectEl.selectedIndex = i
        matched = true
        if (!selectEl.multiple) break
      } else if (!selectEl.multiple) {
        option.selected = false
      }
    }

    // Passagem 2: Correspondência parcial por contenção (apenas se a exata não encontrou nada)
    if (!matched) {
      for (let i = 0; i < selectEl.options.length; i++) {
        const option = selectEl.options[i]
        const optVal = option.value.toLowerCase()
        const optTxt = cleanSearchTerm(option.textContent).toLowerCase()

        const isPartial = normValues.some(
          (v) => optVal.includes(v) || optTxt.includes(v) || (v.length > 3 && (v.includes(optVal) || v.includes(optTxt))),
        )
        if (isPartial) {
          option.selected = true
          selectEl.selectedIndex = i
          matched = true
          if (!selectEl.multiple) break
        }
      }
    }

    if (matched) {
      dispatchEventSequence(selectEl, ['input', 'change', 'blur'])
      return
    }
  }

  // Fallback para menu suspenso / combobox customizado
  const combobox = element.closest('[role="combobox"], [class*="select" i], [class*="dropdown" i]') as HTMLElement | null
  if (combobox) {
    simulatePointerClick(combobox)
    for (const v of values) {
      const optItem = findElementExt(v)
      if (optItem) {
        simulatePointerClick(optItem)
        return
      }
    }
  }
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
    if (el) {
      const isOption = Boolean(
        el.closest('.option-card, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, [class*="option" i], [class*="choice" i]') ||
        el.querySelector('input[type="radio"], input[type="checkbox"]') ||
        (el instanceof HTMLInputElement && ['checkbox', 'radio'].includes(el.type))
      )
      if (isOption) {
        setCheckedState(el, true)
      } else {
        simulatePointerClick(el)
      }
    } else {
      console.warn(`$eq.click: Elemento '${idOrLabel}' não encontrado`)
    }
  },
  check: (idOrLabel: string, checked: boolean) => {
    const el = findElementExt(idOrLabel)
    if (el) setCheckedState(el, checked)
    else console.warn(`$eq.check: Elemento '${idOrLabel}' não encontrado`)
  },
  find: (idOrLabel: string) => findElementExt(idOrLabel),
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
  execute: (plan: AnalysisPlan, allowAdvance = false, attempt = 1) => executePlan(plan, allowAdvance, attempt),
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

  // Resolução inteligente de rádio por valor/opção (ex: tabela VF, grupo de opções com name compartilhado)
  const valHint = (action as any).v !== undefined ? String((action as any).v).trim() : ''
  if (element && valHint) {
    if (element instanceof HTMLInputElement && element.type === 'radio' && element.name) {
      if (cleanSearchTerm(element.value).toLowerCase() !== cleanSearchTerm(valHint).toLowerCase()) {
        const groupRadio = document.querySelector(
          `input[type="radio"][name="${CSS.escape(element.name)}"][value="${CSS.escape(valHint)}" i]`,
        ) as HTMLInputElement | null
        if (groupRadio) {
          element = groupRadio
        } else {
          const allInGroup = Array.from(
            document.querySelectorAll(`input[type="radio"][name="${CSS.escape(element.name)}"]`),
          ) as HTMLInputElement[]
          const matched = allInGroup.find((r) => {
            const card = r.closest('label, .vf-label, .option-card, tr, td, div')
            return card && cleanSearchTerm(card.textContent).toLowerCase().includes(cleanSearchTerm(valHint).toLowerCase())
          })
          if (matched) element = matched
        }
      }
    } else if (!(element instanceof HTMLInputElement) && !(element instanceof HTMLSelectElement) && !(element instanceof HTMLTextAreaElement)) {
      const directMatch = element.querySelector(
        `input[value="${CSS.escape(valHint)}" i], [data-value="${CSS.escape(valHint)}" i]`,
      ) as HTMLElement | null
      if (directMatch) {
        element = directMatch
      } else {
        const innerInputs = Array.from(element.querySelectorAll('input[type="radio"], input[type="checkbox"]')) as HTMLInputElement[]
        const matched = innerInputs.find((r) => {
          const card = r.closest('label, .vf-label, .option-card, td, div')
          return card && cleanSearchTerm(card.textContent).toLowerCase().includes(cleanSearchTerm(valHint).toLowerCase())
        })
        if (matched) element = matched
      }
    }
  }

  if (!element && action.t !== 'adv') {
    console.warn(`[EasyQuiz] Alvo '${elId}' não encontrado para ação '${action.t}'. Prosseguindo...`)
    return
  }

  switch (action.t) {
    case 'val':
      if (element) {
        const isBtn =
          element instanceof HTMLButtonElement ||
          element.tagName.toLowerCase() === 'a' ||
          element.getAttribute('role') === 'button' ||
          element.getAttribute('role') === 'link' ||
          (element instanceof HTMLInputElement && ['button', 'submit'].includes(element.type)) ||
          isNavigationControl(element)

        if (isBtn) {
          console.log(`[EasyQuiz] Auto-correção: Ação 'val' direcionada a botão/link '${action.id}'. Clicando...`)
          simulatePointerClick(element)
        } else {
          setNativeValue(element, String(action.v))
        }
      }
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
        const isOptionCard = Boolean(
          element.closest('.option-card, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice') ||
          element.querySelector('input[type="radio"], input[type="checkbox"]') ||
          (element instanceof HTMLInputElement && ['checkbox', 'radio'].includes(element.type))
        )

        if (isOptionCard) {
          setCheckedState(element, true)
        } else {
          simulatePointerClick(element, action.co)
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
      if (!isVisible(b) || isInsideEasyQuiz(b) || b.closest('header, nav, aside')) return false
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
  const candidates = all.filter((el) => isVisible(el) && !isInsideEasyQuiz(el) && !el.closest('header, nav, aside'))

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

export interface ExecutionResult {
  applied: number
  verified: number
  success: boolean
  advanced: boolean
}

// ---- ROTA ALTERNATIVA DE APLICAÇÃO (AUTO-CURA RESILIENTE MULTI-CAMINHO) ----
async function executeAlternativeActionPath(action: DeclarativeAction): Promise<void> {
  if (action.t === 'js' || action.t === 'adv') return

  if (action.t === 'drag') {
    const fromEl = findElementExt(action.from) || findElementExt(cleanSearchTerm(action.from))
    const toEl = findElementExt(action.to) || findElementExt(cleanSearchTerm(action.to))
    if (fromEl && toEl) {
      await simulateDragAndCategorize(fromEl, toEl, 2)
    }
    return
  }

  const elId = action.id || ''
  let el = findElementExt(elId) || findElementExt(cleanSearchTerm(elId))

  if (action.t === 'clk' || action.t === 'chk') {
    // 1. Tentar localizar o elemento por prefixos alternativos de alternativas se o seletor padrão falhou
    if (!el && elId) {
      const candidates = Array.from(
        document.querySelectorAll('input, label, button, [role="radio"], [role="checkbox"], .option-card, [class*="option" i], [class*="choice" i]'),
      ) as HTMLElement[]
      const clean = cleanSearchTerm(elId).toLowerCase()
      el = candidates.find((c) => {
        const txt = cleanSearchTerm(c.textContent).toLowerCase()
        const val = cleanSearchTerm((c as any).value || '').toLowerCase()
        return txt.includes(clean) || val === clean || txt.startsWith(clean + ')') || txt.startsWith('(' + clean + ')')
      }) || null
    }

    // Resolução inteligente de rádio por valor/opção (ex: tabela VF, grupo com name compartilhado)
    const valHint = (action as any).v !== undefined ? String((action as any).v).trim() : ''
    if (el && valHint) {
      if (el instanceof HTMLInputElement && el.type === 'radio' && el.name) {
        if (cleanSearchTerm(el.value).toLowerCase() !== cleanSearchTerm(valHint).toLowerCase()) {
          const groupRadio = document.querySelector(
            `input[type="radio"][name="${CSS.escape(el.name)}"][value="${CSS.escape(valHint)}" i]`,
          ) as HTMLInputElement | null
          if (groupRadio) {
            el = groupRadio
          } else {
            const allInGroup = Array.from(
              document.querySelectorAll(`input[type="radio"][name="${CSS.escape(el.name)}"]`),
            ) as HTMLInputElement[]
            const matched = allInGroup.find((r) => {
              const card = r.closest('label, .vf-label, .option-card, tr, td, div')
              return card && cleanSearchTerm(card.textContent).toLowerCase().includes(cleanSearchTerm(valHint).toLowerCase())
            })
            if (matched) el = matched
          }
        }
      } else if (!(el instanceof HTMLInputElement) && !(el instanceof HTMLSelectElement) && !(el instanceof HTMLTextAreaElement)) {
        const directMatch = el.querySelector(
          `input[value="${CSS.escape(valHint)}" i], [data-value="${CSS.escape(valHint)}" i]`,
        ) as HTMLElement | null
        if (directMatch) {
          el = directMatch
        } else {
          const innerInputs = Array.from(el.querySelectorAll('input[type="radio"], input[type="checkbox"]')) as HTMLInputElement[]
          const matched = innerInputs.find((r) => {
            const card = r.closest('label, .vf-label, .option-card, td, div')
            return card && cleanSearchTerm(card.textContent).toLowerCase().includes(cleanSearchTerm(valHint).toLowerCase())
          })
          if (matched) el = matched
        }
      }
    }

    if (el) {
      const card = (el.closest('.option-card, label, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, li') || el) as HTMLElement
      const input = el instanceof HTMLInputElement && ['radio', 'checkbox'].includes(el.type)
        ? el
        : (card.querySelector('input[type="radio"], input[type="checkbox"]') as HTMLInputElement | null) ||
          (card.getAttribute('for') ? (card.ownerDocument.getElementById(card.getAttribute('for')!) as HTMLInputElement | null) : null)
      const shouldCheck = action.t === 'chk' ? Boolean(action.c) : true

      // Executa o motor central de 6 vias de persistência
      setCheckedState(input || card, shouldCheck)

      // Rota de contingência extra 1: atribuição no input e disparos nativos diretos
      if (input) {
        try {
          input.checked = shouldCheck
          try {
            const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'checked')?.set
            setter?.call(input, shouldCheck)
          } catch {}
          if (input.type !== 'checkbox' || input.checked !== shouldCheck) {
            input.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, composed: true, view: window }))
          }
          input.dispatchEvent(new Event('change', { bubbles: true, composed: true }))
          input.dispatchEvent(new Event('input', { bubbles: true, composed: true }))
        } catch {}
      }

      // Rota de contingência extra 2: clique de ponteiro forçado no card/label (se não houver input ou estado ainda divergente)
      try {
        card.focus?.()
        card.setAttribute('aria-checked', shouldCheck ? 'true' : 'false')
        card.classList.toggle('selected', shouldCheck)
        card.classList.toggle('active', shouldCheck)
        card.classList.toggle('checked', shouldCheck)
        if (!input) {
          card.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, composed: true, view: window }))
        }
      } catch {}

      // Rota de contingência extra 3: tecla Space / Enter no elemento focado (apenas se divergente)
      if (!input || input.checked !== shouldCheck) {
        try {
          card.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', code: 'Space', bubbles: true }))
          card.dispatchEvent(new KeyboardEvent('keyup', { key: ' ', code: 'Space', bubbles: true }))
        } catch {}
      }

      // Rota de contingência extra 4: invocar handlers diretos
      try { (card as any).onclick?.() } catch {}
      try { (input as any)?.onclick?.() } catch {}
      try { (input as any)?.onchange?.() } catch {}
    }
    return
  }

  if (action.t === 'val') {
    if (!el && elId) {
      const inputs = Array.from(
        document.querySelectorAll('input:not([type="hidden"]), textarea, [contenteditable="true"]'),
      ) as HTMLElement[]
      const clean = cleanSearchTerm(elId).toLowerCase()
      el = inputs.find((i) => {
        const ph = (i.getAttribute('placeholder') || '').toLowerCase()
        const name = ((i as any).name || '').toLowerCase()
        const id = (i.id || '').toLowerCase()
        const aria = (i.getAttribute('aria-label') || '').toLowerCase()
        return ph.includes(clean) || name.includes(clean) || id.includes(clean) || aria.includes(clean)
      }) || null
    }

    if (el) {
      const input =
        el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement
          ? el
          : (el.querySelector('input:not([type="hidden"]), textarea, [contenteditable="true"]') as HTMLElement | null)
      const target = input || el
      const val = String(action.v ?? '')

      try {
        target.focus?.()
        document.execCommand?.('selectAll', false, undefined)
        document.execCommand?.('insertText', false, val)
      } catch {}

      setNativeValue(target, val)
    }
    return
  }

  if (action.t === 'sel') {
    if (!el && elId) {
      const selects = Array.from(document.querySelectorAll('select')) as HTMLSelectElement[]
      const clean = cleanSearchTerm(elId).toLowerCase()
      el = selects.find((s) => {
        const name = (s.name || '').toLowerCase()
        const id = (s.id || '').toLowerCase()
        const aria = (s.getAttribute('aria-label') || '').toLowerCase()
        return name.includes(clean) || id.includes(clean) || aria.includes(clean)
      }) || null
    }

    if (el) {
      const arr = Array.isArray(action.v) ? action.v : [String(action.v)]
      selectValues(el, arr as string[])
    }
    return
  }
}

export function verifyActionApplied(action: DeclarativeAction): boolean {
  try {
    if (action.t === 'val') {
      const el = (findElementExt(action.id) || findElementExt(cleanSearchTerm(action.id))) as HTMLElement | null
      if (!el) return false

      // Se for botão, link ou navegação, a ação foi auto-corrigida para clique
      const isBtn =
        el instanceof HTMLButtonElement ||
        el.tagName.toLowerCase() === 'a' ||
        el.getAttribute('role') === 'button' ||
        el.getAttribute('role') === 'link' ||
        (el instanceof HTMLInputElement && ['button', 'submit'].includes(el.type)) ||
        isNavigationControl(el)
      if (isBtn) return true

      const expected = String(action.v ?? '').trim()

      // Se for rádio ou grupo de rádios
      const radioInput =
        el instanceof HTMLInputElement && el.type === 'radio'
          ? el
          : (el.querySelector('input[type="radio"]') as HTMLInputElement | null)

      if (radioInput && radioInput.name) {
        const checkedRadio = document.querySelector(
          `input[type="radio"][name="${CSS.escape(radioInput.name)}"]:checked`,
        ) as HTMLInputElement | null
        if (!checkedRadio) return false
        const valCur = cleanSearchTerm(checkedRadio.value).toLowerCase()
        const valExp = cleanSearchTerm(expected).toLowerCase()
        const labelCur = cleanSearchTerm(checkedRadio.closest('label, .vf-label, .option-card, tr, td, div')?.textContent || '').toLowerCase()
        return valCur === valExp || labelCur === valExp || labelCur.includes(valExp)
      }

      const targetInput =
        el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement
          ? el
          : (el.querySelector('input:not([type="hidden"]), textarea, [contenteditable="true"]') as HTMLInputElement | HTMLTextAreaElement | null)

      const cur = (targetInput ? (targetInput.value ?? targetInput.textContent ?? '') : (el.textContent ?? '')).trim()
      if (!cur && !expected) return true
      if (!cur && expected) return false
      const normCur = cur.replace(',', '.').toLowerCase()
      const normExp = expected.replace(',', '.').toLowerCase()
      return normCur === normExp || normCur.includes(normExp) || cur.toLowerCase() === expected.toLowerCase()
    }

    if (action.t === 'sel') {
      const el = (findElementExt(action.id) || findElementExt(cleanSearchTerm(action.id))) as HTMLElement | null
      if (!el) return false
      const selectEl = el instanceof HTMLSelectElement ? el : (el.querySelector('select') as HTMLSelectElement | null)
      if (!selectEl) return false
      const values = Array.isArray(action.v) ? action.v : [String(action.v)]
      const normValues = values.map((v) => cleanSearchTerm(v).toLowerCase())
      return Array.from(selectEl.options).some((o) => {
        if (!o.selected) return false
        const optVal = o.value.toLowerCase()
        const optTxt = cleanSearchTerm(o.textContent).toLowerCase()
        return normValues.some((v) => v === optVal || v === optTxt || optVal.includes(v) || optTxt.includes(v))
      })
    }

    if (action.t === 'chk' || action.t === 'clk') {
      const el = findElementExt(action.id) || findElementExt(cleanSearchTerm(action.id))
      if (!el) return false
      const card = (el.closest(
        '.option-card, label, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, li',
      ) || el) as HTMLElement

      const inputEl =
        el instanceof HTMLInputElement && ['checkbox', 'radio'].includes(el.type)
          ? el
          : (card.querySelector('input[type="checkbox"], input[type="radio"]') as HTMLInputElement | null) ||
            (card.getAttribute('for') ? (card.ownerDocument.getElementById(card.getAttribute('for')!) as HTMLInputElement | null) : null)

      const expected = action.t === 'chk' ? Boolean(action.c) : true

      // Se houver valor esperado em grupo de rádio
      if (inputEl && inputEl.type === 'radio' && (action as any).v) {
        const expectedVal = cleanSearchTerm(String((action as any).v)).toLowerCase()
        if (inputEl.name) {
          const checkedRadio = document.querySelector(
            `input[type="radio"][name="${CSS.escape(inputEl.name)}"]:checked`,
          ) as HTMLInputElement | null
          if (!checkedRadio) return false
          const valCur = cleanSearchTerm(checkedRadio.value).toLowerCase()
          return valCur === expectedVal
        }
      }

      if (inputEl && ['checkbox', 'radio'].includes(inputEl.type)) {
        return inputEl.checked === expected
      }

      const isAria =
        card.getAttribute('aria-checked') === String(expected) ||
        card.getAttribute('aria-selected') === String(expected) ||
        card.getAttribute('aria-pressed') === String(expected)

      const hasDataAttr = expected
        ? card.getAttribute('data-selected') === 'true' ||
          card.getAttribute('data-checked') === 'true' ||
          card.getAttribute('data-active') === 'true' ||
          card.getAttribute('data-state') === 'checked' ||
          card.getAttribute('data-state') === 'on'
        : card.getAttribute('data-selected') === 'false' ||
          card.getAttribute('data-checked') === 'false' ||
          card.getAttribute('data-state') === 'unchecked'

      const hasClass = expected
        ? /active|selected|checked|picked|correct|is-selected|choice-selected|selected-option|is-checked|chosen|current|highlight|ring|border-primary/i.test(
            card.className || '',
          )
        : !/active|selected|checked|picked|correct|is-selected|choice-selected|selected-option|is-checked|chosen|current|highlight|ring|border-primary/i.test(
            card.className || '',
          )

      if (isAria || hasDataAttr || hasClass) return true

      // Se for botão de ação ou seletor de clique genérico
      const isActionButton = card instanceof HTMLButtonElement || card.getAttribute('role') === 'button'
      if (isActionButton && action.t === 'clk') {
        return true
      }

      // Se for clique e o elemento foi clicado com sucesso sem ter input nativo interno de checagem
      if (action.t === 'clk' && !inputEl) {
        return true
      }

      return false
    }

    if (action.t === 'drag') {
      const fromEl = findElementExt(action.from) || findElementExt(cleanSearchTerm(action.from))
      const toEl = findElementExt(action.to) || findElementExt(cleanSearchTerm(action.to))
      if (!fromEl || !toEl) return false
      if (toEl.contains(fromEl)) return true
      const placed =
        /placed|dropped|assigned|matched|done|selected/i.test(fromEl.className || '') ||
        fromEl.getAttribute('data-placed') === 'true'
      return placed
    }
  } catch {}
  return false
}

export async function executePlan(
  plan: AnalysisPlan,
  allowAdvance: boolean,
  attempt = 1,
): Promise<ExecutionResult> {
  const regularActions = plan.actions.filter((a) => a.t !== 'adv')
  const advanceActions = plan.actions.filter((a) => a.t === 'adv')

  let appliedCount = 0

  // 1. PRIMEIRA PASSAGEM: Execução declarativa principal
  for (const action of regularActions) {
    try {
      await executeDeclarativeAction(action, attempt)
      appliedCount++
    } catch (err) {
      console.warn('[EasyQuiz] Ação declarativa primária falhou com segurança:', action, err)
    }
    if (action.t === 'drag') {
      await new Promise((resolve) => setTimeout(resolve, 250))
    }
  }

  // 2. SEGUNDA PASSAGEM: Verificação e Auto-Cura Multi-Caminho (Self-Healing Contingency Retries)
  await new Promise((resolve) => setTimeout(resolve, regularActions.length > 0 ? 300 : 50))
  let verifiedCount = 0

  for (const action of regularActions) {
    if (verifyActionApplied(action)) {
      verifiedCount++
      continue
    }

    // Se não verificou no DOM, tenta IMEDIATAMENTE a rota alternativa/contingência
    console.warn(
      `[EasyQuiz Auto-Cura] Ação '${action.t}' no alvo '${(action as any).id || (action as any).from || ''}' não verificada no DOM. Disparando Passagem 2 de contingência...`,
    )
    try {
      await executeAlternativeActionPath(action)
    } catch (err) {
      console.warn('[EasyQuiz Auto-Cura] Rota alternativa falhou:', err)
    }

    await new Promise((r) => setTimeout(r, 180))
    if (verifyActionApplied(action)) {
      console.log(`[EasyQuiz Auto-Cura] ✓ Ação recuperada com sucesso pela rota de contingência!`)
      verifiedCount++
    }
  }

  // 3. TERCEIRA PASSAGEM ULTRA-RESILIENTE (se ainda houver ações pendentes)
  if (verifiedCount < regularActions.length && regularActions.length > 0) {
    console.warn(
      `[EasyQuiz Auto-Cura] ${regularActions.length - verifiedCount} de ${regularActions.length} ação(ões) ainda não verificadas. Disparando Passagem 3 final...`,
    )
    await new Promise((r) => setTimeout(r, 200))
    for (const action of regularActions) {
      if (!verifyActionApplied(action)) {
        try {
          await executeAlternativeActionPath(action)
        } catch {}
      }
    }
    await new Promise((r) => setTimeout(r, 200))

    // Recalcula contagem real verificada após passagem 3
    verifiedCount = 0
    for (const action of regularActions) {
      if (verifyActionApplied(action)) {
        verifiedCount++
      }
    }
  }

  // Validação estrita: 100% das ações devem estar validadas no DOM para quizzes comuns (até 4 ações)
  // Para questões com 5+ ações simultâneas (ex: matriz 3x3 com 9 células), toleramos >= 85%
  const isQuestion = plan.pageType === 'question'
  const requiredRatio = regularActions.length <= 4 ? 1.0 : 0.85
  const success =
    !isQuestion || regularActions.length === 0
      ? true
      : appliedCount > 0 && verifiedCount >= Math.ceil(regularActions.length * requiredRatio)

  let advanced = false
  // SÓ AVANÇA SE AS RESPOSTAS FORAM DE FATO APLICADAS E VALIDADAS NO DOM!
  if ((allowAdvance || attempt >= 2) && (success || !isQuestion)) {
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
    verified: verifiedCount,
    success,
    advanced,
  }
}

// ---- INTERCEPTADOR INTELIGENTE DE CLIQUES EM OPÇÕES (PREVENÇÃO DE INVERSÃO/DOUBLE-TOGGLE) ----
let interceptorInstalled = false
let justHandledOptionInput: HTMLElement | null = null

export function setupSmartOptionInterceptors(): void {
  const doc = typeof window !== 'undefined' && window.document ? window.document : (typeof document !== 'undefined' ? document : null)
  if (!doc || interceptorInstalled) return
  interceptorInstalled = true

  doc.addEventListener(
    'click',
    (e) => {
      const target = e.target as HTMLElement | null
      if (!target || isInsideEasyQuiz(target)) return

      // Suprime cliques sintéticos duplicados gerados pela ativação nativa de <label> após o card já ter sido tratado
      if (justHandledOptionInput && (target === justHandledOptionInput || target.contains(justHandledOptionInput))) {
        e.preventDefault()
        e.stopPropagation()
        e.stopImmediatePropagation?.()
        return
      }

      // Se o clique foi diretamente no input do checkbox/rádio por ação direta do usuário, permite ação nativa
      if (target instanceof HTMLInputElement && ['checkbox', 'radio'].includes(target.type)) {
        return
      }

      // Procura container de opção ou label
      const card = target.closest(
        'label, .option-card, [role="radio"], [role="checkbox"], .quiz-option, .answer, .choice, [class*="option" i], [class*="choice" i]',
      ) as HTMLElement | null
      if (!card || isInsideEasyQuiz(card)) return

      // Procura input interno ou associado por 'for'
      let input = card.querySelector('input[type="checkbox"], input[type="radio"]') as HTMLInputElement | null
      if (!input && card.hasAttribute('for')) {
        const forId = card.getAttribute('for')
        if (forId) input = card.ownerDocument.getElementById(forId) as HTMLInputElement | null
      }
      if (!input) return

      // Intercepta e previne double-toggles / cancelamentos causados por handlers customizados da página hospedeira
      if (input.type === 'checkbox') {
        e.preventDefault()
        e.stopPropagation()
        e.stopImmediatePropagation?.()
        justHandledOptionInput = input
        setTimeout(() => {
          if (justHandledOptionInput === input) justHandledOptionInput = null
        }, 70)
        setCheckedState(input, !input.checked)
      } else if (input.type === 'radio') {
        e.preventDefault()
        e.stopPropagation()
        e.stopImmediatePropagation?.()
        justHandledOptionInput = input
        setTimeout(() => {
          if (justHandledOptionInput === input) justHandledOptionInput = null
        }, 70)
        setCheckedState(input, true)
      }
    },
    true, // FASE DE CAPTURA (intercepta antes de qualquer listener do quiz)
  )
}

