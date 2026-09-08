import type { ActionExecutionReport, AnalysisPlan, DeclarativeAction } from '../core/types'
import { assertActionAllowed, createExecutionPolicy, validateJavaScriptSource, type ExecutionPolicy } from '../core/policy'
import { loadDomainCache, saveDomainCache } from '../core/storage'
import { cleanText, isNavigationControl, isUtilityOrGamificationControl, isVisible, labelForControl, NAVIGATION_PATTERN, ANTI_NAVIGATION_PATTERN, safeCssEscape } from './controls'
import { findActiveScope } from './detector'

export function isInsideEasyQuiz(el: HTMLElement | null): boolean {
  if (!el) return false
  return Boolean(
    el.closest(
      '#easyquiz-shadow-root, .eq-sidebar, .eq-launcher, [data-easyquiz-ignore="true"], .btn-inject-eq, #btn-inject-script',
    ) || el.getAttribute?.('data-easyquiz-ignore') === 'true',
  )
}

export function cleanSearchTerm(term: unknown): string {
  if (term === null || term === undefined) return ''
  const str = typeof term === 'string' ? term : String(term)
  return str
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
    'label, .option-card, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, tr, li, .dnd-card, [class*="option-card" i], [class*="choice-card" i], .dropdown-row, [class*="dropdown" i], [class*="select-row" i]',
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

// ---- COLETA DETERMINÍSTICA DE OPÇÕES VISÍVEIS DISTINTAS NO ESCOPO ----
export function getDistinctVisibleChoices(scopeRoot?: HTMLElement): HTMLElement[] {
  let root = scopeRoot
  if (!root || !document.contains(root)) {
    try {
      root = findActiveScope()
    } catch {}
  }
  root = root || document.body

  const collect = (container: HTMLElement): HTMLElement[] => {
    // 1. Linhas de tabela com controles (essencial para matrizes V/F ou questões em tabela)
    const rows = Array.from(container.querySelectorAll('tr')).filter((tr) => {
      return isVisible(tr) && tr.querySelector('input[type="radio"], input[type="checkbox"]')
    }) as HTMLElement[]
    if (rows.length > 1) {
      return rows
    }

    // 2. Coleta inputs nativos únicos visíveis (evita duplicar com label ou option-card pai)
    const inputs = Array.from(
      container.querySelectorAll('input[type="checkbox"], input[type="radio"], [role="checkbox"], [role="radio"]'),
    ).filter((e) => isVisible(e as HTMLElement) && !isInsideEasyQuiz(e as HTMLElement)) as HTMLElement[]

    if (inputs.length > 0) {
      return inputs
    }

    // 3. Fallback para option cards sem input nativo (evita nós filhos duplicados)
    const cards = Array.from(
      container.querySelectorAll('.option-card, [role="option"], [class*="choice-card" i], [class*="option-card" i], li[class*="choice" i], li[class*="option" i]'),
    ).filter((e) => isVisible(e as HTMLElement) && !isInsideEasyQuiz(e as HTMLElement)) as HTMLElement[]

    const filteredCards = cards.filter((card) => !card.parentElement?.closest('.option-card, [role="option"], [class*="choice-card" i], [class*="option-card" i]'))
    if (filteredCards.length > 0) return filteredCards

    // 4. Fallback para widgets de classificação (Wayground classification, tiles custom)
    const classCards = Array.from(
      container.querySelectorAll('[class*="classification" i] [class], [class*="draggable-item" i], [class*="drag-item" i], [class*="sortable-card" i]')
    ).filter((e) => {
      const el = e as HTMLElement
      return isVisible(el) && !isInsideEasyQuiz(el) &&
        (el.textContent || '').trim().length > 2 &&
        !isNavigationControl(el) && !isUtilityOrGamificationControl(el) &&
        !el.querySelector('[class]') // nó folha com texto
    }) as HTMLElement[]

    return classCards
  }

  const result = collect(root)
  if (result.length > 0) return result
  if (root !== document.body) return collect(document.body)
  return []
}

// ---- MOTOR DE BUSCA ROBUSTA DE ELEMENTOS ----
export function findElementExt(idOrLabel: unknown, valueHint?: string, preferInput = false): HTMLElement | null {
  if (idOrLabel === null || idOrLabel === undefined) return null
  const rawStr = typeof idOrLabel === 'string' ? idOrLabel : String(idOrLabel)
  const trimmed = rawStr.trim().replace(/^["'“”«»]+|["'“”«»]+$/g, '')
  if (!trimmed) return null

  // 1. Tenta por ID estrito gerado pelo EasyQuiz (garantia direta de match)
  const escaped = safeCssEscape(trimmed)
  let el = document.querySelector(`[data-easyquiz-id="${escaped}"]`) as HTMLElement | null
  if (el && !isInsideEasyQuiz(el)) return resolveTargetControlOrCard(el)

  // 2. Tenta por ID real nativo no DOM se estiver visível (O(1) instantâneo)
  try {
    const elById = document.getElementById(trimmed)
    if (elById && isVisible(elById) && !isInsideEasyQuiz(elById)) {
      const isDrop = elById.hasAttribute('data-category') || elById.hasAttribute('data-dropzone') || elById.classList.contains('dnd-zone')
      return isDrop ? elById : resolveTargetControlOrCard(elById)
    }
  } catch {}

  // 2.5 Tenta por data-item-id (Google Forms) e data-easyquiz-id
  try {
    const gformEl = document.querySelector(`[data-item-id="${escaped}"]`) as HTMLElement | null
    if (gformEl && isVisible(gformEl) && !isInsideEasyQuiz(gformEl)) {
      return resolveTargetControlOrCard(gformEl)
    }
  } catch {}

  // 3. Resolução Ordinal / Numérica Direta (ex: "1", "3", "Item 1", "Campo 2", "Opção 3", "Afirmação 1", "Alternativa 2")
  // Mapeia diretamente para o N-ésimo controle visível no formulário ativo
  const ordinalNumMatch = trimmed.match(
    /^(?:item|opção|opcao|afirmação|afirmacao|alternativa|linha|afirmativa|questão|questao|campo|blank|lacuna|input|resposta)?\s*#?_?([0-9]+)$/i,
  )
  if (ordinalNumMatch) {
    const rawNum = parseInt(ordinalNumMatch[1], 10)
    if (preferInput) {
      let scopeRoot: HTMLElement = document.body
      try { scopeRoot = findActiveScope() || document.body } catch {}
      const visibleInputs = Array.from(
        scopeRoot.querySelectorAll(
          'input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, select, [contenteditable="true"]',
        ),
      ).filter((e) => isVisible(e as HTMLElement) && !isInsideEasyQuiz(e as HTMLElement)) as HTMLElement[]

      if (rawNum >= 1 && rawNum - 1 < visibleInputs.length) {
        return visibleInputs[rawNum - 1]
      }
      if (rawNum === 0 && visibleInputs.length > 0) {
        return visibleInputs[0]
      }
    }

    const targetIdx = rawNum - 1
    if (targetIdx >= 0) {
      // Prioridade A: Checkboxes, Rádios ou Linhas de Tabela no escopo ativo
      const visibleChoices = getDistinctVisibleChoices()
      if (targetIdx < visibleChoices.length) {
        const choice = visibleChoices[targetIdx]
        if (choice.tagName.toLowerCase() === 'tr') {
          if (valueHint) {
            const match = choice.querySelector(`input[value="${safeCssEscape(valueHint)}" i], [data-value="${safeCssEscape(valueHint)}" i]`) as HTMLElement | null
            if (match) return match
          }
          const firstInput = choice.querySelector('input') as HTMLElement | null
          if (firstInput) return firstInput
        }
        return resolveTargetControlOrCard(choice)
      }

      // Prioridade B: Inputs de texto, número, textarea, select (essencial para questões de preenchimento)
      let scopeRoot: HTMLElement = document.body
      try { scopeRoot = findActiveScope() || document.body } catch {}
      const visibleInputs = Array.from(
        scopeRoot.querySelectorAll(
          'input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, select, [contenteditable="true"]',
        ),
      ).filter((e) => isVisible(e as HTMLElement) && !isInsideEasyQuiz(e as HTMLElement)) as HTMLElement[]

      if (targetIdx < visibleInputs.length) {
        return visibleInputs[targetIdx]
      }
    }
  }

  // 4. Resolução Ordinal Alfabética Direta (ex: "A", "B", "C", "D", "Alternativa B")
  const ordinalLetterMatch = trimmed.match(/^(?:item|opção|opcao|afirmação|afirmacao|alternativa|linha|afirmativa|questão|questao)?\s*#?([a-eA-E])$/i)
  if (ordinalLetterMatch) {
    const letterIdx = ordinalLetterMatch[1].toUpperCase().charCodeAt(0) - 65
    if (letterIdx >= 0) {
      const visibleChoices = getDistinctVisibleChoices()
      if (letterIdx < visibleChoices.length) {
        const choice = visibleChoices[letterIdx]
        if (choice.tagName.toLowerCase() === 'tr') {
          if (valueHint) {
            const match = choice.querySelector(`input[value="${safeCssEscape(valueHint)}" i], [data-value="${safeCssEscape(valueHint)}" i]`) as HTMLElement | null
            if (match) return match
          }
          const firstInput = choice.querySelector('input') as HTMLElement | null
          if (firstInput) return firstInput
        }
        return resolveTargetControlOrCard(choice)
      }
    }
  }

  // 5. Se for uma letra, código, categoria ou valor curto (ex: "PA", "PG", "chk1", "a11")
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
        `input[value="${escaped}" i], [data-value="${escaped}" i], input[id="${escaped}" i], input[placeholder="${escaped}" i], textarea[placeholder="${escaped}" i], [title="${escaped}" i]`,
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

  // 6. Tenta por name, value, placeholder, title, data-category, data-dropzone, data-testid, aria-label em elementos visíveis
  try {
    const attrCandidates = Array.from(
      document.querySelectorAll(
        `[name="${escaped}"], [value="${escaped}"], [placeholder="${escaped}" i], [title="${escaped}" i], [data-category="${escaped}" i], [data-dropzone="${escaped}" i], [data-testid="${escaped}" i], [data-test-id="${escaped}" i], [aria-label="${escaped}" i]`,
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
      'button, a, div, span, li, p, label, input, textarea, select, [draggable="true"], [data-testid], [class*="option" i], [class*="card" i], [class*="item" i], [class*="choice" i], [class*="category" i], [class*="bucket" i]',
    ),
  ) as HTMLElement[]

  // Prioridade A: Correspondência exata em texto, atributos ou prefixo de alternativa (ex: "A)", "B.", "1)")
  for (const item of candidates) {
    if (!isVisible(item) || isInsideEasyQuiz(item) || item.closest('header, nav, .stepper, .step-item, .progress-bar-container') || isUtilityOrGamificationControl(item)) continue

    const isContainerOfOptions = Boolean(
      item.matches('article, section, form, main, [class*="container" i], [class*="grid" i], .dnd-pool, .dnd-zones') ||
      item.querySelector('label, [role="radio"], [role="checkbox"], .dnd-card, [draggable="true"], .option-card, tr')
    )
    if (isContainerOfOptions && !item.matches('.dnd-zone, [data-category], [data-dropzone]')) continue

    const txt = cleanSearchTerm(item.textContent).toLowerCase()
    const aria = cleanSearchTerm(item.getAttribute('aria-label') || '').toLowerCase()
    const ph = cleanSearchTerm(item.getAttribute('placeholder') || '').toLowerCase()
    const title = cleanSearchTerm(item.getAttribute('title') || '').toLowerCase()
    const name = cleanSearchTerm(item.getAttribute('name') || '').toLowerCase()
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
      ph === targetClean ||
      title === targetClean ||
      name === targetClean ||
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
      if (!isVisible(item) || isInsideEasyQuiz(item) || item.closest('header, nav, .stepper, .step-item, .progress-bar-container') || isUtilityOrGamificationControl(item)) continue

      const isContainerOfOptions = Boolean(
        item.matches('article, section, form, main, [class*="container" i], [class*="grid" i], .dnd-pool, .dnd-zones') ||
        item.querySelector('label, [role="radio"], [role="checkbox"], .dnd-card, [draggable="true"], .option-card, tr')
      )
      if (isContainerOfOptions && !item.matches('.dnd-zone, [data-category], [data-dropzone]')) continue

      const txt = cleanSearchTerm(item.textContent).toLowerCase()
      const aria = cleanSearchTerm(item.getAttribute('aria-label') || '').toLowerCase()
      const ph = cleanSearchTerm(item.getAttribute('placeholder') || '').toLowerCase()
      const title = cleanSearchTerm(item.getAttribute('title') || '').toLowerCase()
      const name = cleanSearchTerm(item.getAttribute('name') || '').toLowerCase()

      // Substring direta onde o texto do elemento ou placeholder contém o termo de busca
      if (
        txt.includes(targetClean) ||
        aria.includes(targetClean) ||
        ph.includes(targetClean) ||
        title.includes(targetClean) ||
        name.includes(targetClean)
      ) {
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
        if (txt.includes(leadingTokens) || aria.includes(leadingTokens) || ph.includes(leadingTokens)) {
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

  try { element.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'instant' as any }) } catch {}
  try { element.focus?.() } catch {}

  const rect = element.getBoundingClientRect()
  const cx = coords ? coords[0] : Math.round(rect.left + Math.max(1, rect.width / 2))
  const cy = coords ? coords[1] : Math.round(rect.top + Math.max(1, rect.height / 2))
  const commonProps = { bubbles: true, cancelable: true, composed: true, view: window, clientX: cx, clientY: cy }

  try { element.dispatchEvent(new PointerEvent('pointerover', { ...commonProps })) } catch {}
  try { element.dispatchEvent(new MouseEvent('mouseover', { ...commonProps })) } catch {}
  try { element.dispatchEvent(new PointerEvent('pointerdown', { ...commonProps, button: 0, buttons: 1 })) } catch {}
  try { element.dispatchEvent(new MouseEvent('mousedown', { ...commonProps, button: 0, buttons: 1 })) } catch {}
  try { element.dispatchEvent(new PointerEvent('pointerup', { ...commonProps, button: 0, buttons: 0 })) } catch {}
  try { element.dispatchEvent(new MouseEvent('mouseup', { ...commonProps, button: 0, buttons: 0 })) } catch {}
  try { element.dispatchEvent(new MouseEvent('click', { ...commonProps, button: 0, buttons: 0 })) } catch {}
  try { element.click() } catch {}

  // ---- FRAMEWORKS JS: React, Vue, Angular, Svelte, LitElement ----

  // React: tentar acionar o onClick via internal fiber/props
  try {
    const fiberKey = Object.keys(element).find(k => k.startsWith('__reactFiber') || k.startsWith('__reactInternalInstance'))
    if (fiberKey) {
      let fiber = (element as any)[fiberKey]
      while (fiber) {
        const props = fiber.memoizedProps || fiber.pendingProps
        if (props?.onClick) { props.onClick({ type: 'click', target: element, currentTarget: element, bubbles: true, cancelable: true, preventDefault: () => {}, stopPropagation: () => {} }); break }
        fiber = fiber.return
      }
    }
  } catch {}

  // React (versão alternativa via __reactProps)
  try {
    const propsKey = Object.keys(element).find(k => k.startsWith('__reactProps'))
    if (propsKey) {
      const props = (element as any)[propsKey]
      if (props?.onClick) props.onClick({ type: 'click', target: element, currentTarget: element, bubbles: true, cancelable: true, preventDefault: () => {}, stopPropagation: () => {} })
    }
  } catch {}

  // Vue 3: _vei (vue event internals)
  try {
    const vei = (element as any)._vei
    if (vei?.onClick) {
      const handlers = Array.isArray(vei.onClick.value) ? vei.onClick.value : [vei.onClick.value]
      handlers.forEach((h: Function) => { try { h({ type: 'click', target: element }) } catch {} })
    }
  } catch {}

  // Svelte: $onclick / __svelte_meta
  try {
    if ((element as any).$onclick) {
      (element as any).$onclick({ type: 'click', target: element, preventDefault: () => {}, stopPropagation: () => {} })
    }
  } catch {}

  // Google Forms (Closure): event delegation via document — dispara novamente no document
  // O Forms registra listeners em document/body com event delegation, então precisa re-propagar
  try {
    const isGForm = Boolean(
      document.querySelector('meta[content*="google.com/forms"], form[action*="formResponse"]') ||
      element.closest('[data-item-id], [jsmodel], [jsaction], .freebirdFormviewerComponentsQuestionBaseRoot')
    )
    if (isGForm) {
      // Para radio/checkbox do Google Forms: clica no input nativo se disponível
      const innerInput = element.querySelector('input[type="radio"], input[type="checkbox"]') as HTMLInputElement | null
      if (innerInput) {
        innerInput.focus?.()
        innerInput.click()
        // Atualiza o checked via descriptor nativo
        const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'checked')?.set
        setter?.call(innerInput, true)
        innerInput.dispatchEvent(new Event('change', { bubbles: true }))
      }
      // Re-dispara o click no elemento pai com jsaction (Closure event dispatcher)
      const jsactionEl = element.closest('[jsaction]') as HTMLElement | null
      if (jsactionEl && jsactionEl !== element) {
        try { jsactionEl.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window, clientX: cx, clientY: cy })) } catch {}
      }
    }
  } catch {}

  // Angular: __zone_symbol__ ou ng_* atributos (disparo de evento já cobre)
  // Último recurso: tecla Enter/Space se o elemento tem role=button ou é focável
  if (element.getAttribute('role') === 'button' || element.getAttribute('tabindex') !== null) {
    try {
      element.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', keyCode: 13, bubbles: true, cancelable: true }))
      element.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter', code: 'Enter', keyCode: 13, bubbles: true, cancelable: true }))
    } catch {}
  }
}



function setNativeValue(element: HTMLElement, value: string): void {
  let target: HTMLElement = element

  // Se o elemento for um label com atributo 'for', busca o input alvo
  if (target.hasAttribute('for')) {
    const forId = target.getAttribute('for')!
    const forInput = target.ownerDocument.getElementById(forId)
    if (forInput) target = forInput
  }

  // Se o elemento ou alvo for um <select> ou combobox/listbox customizado, redireciona diretamente
  const isSelectTarget =
    (typeof HTMLSelectElement !== 'undefined' && target instanceof HTMLSelectElement) ||
    target.tagName?.toLowerCase() === 'select' ||
    target.getAttribute('role') === 'combobox' ||
    target.getAttribute('role') === 'listbox' ||
    target.matches?.('[role="combobox"], [role="listbox"], [class*="select" i], [class*="dropdown" i]')

  if (isSelectTarget) {
    selectValues(target, [value])
    return
  }

  const innerSelect = target.querySelector('select, [role="combobox"], [role="listbox"]') as HTMLElement | null
  if (innerSelect) {
    selectValues(innerSelect, [value])
    return
  }

  if (
    !(target instanceof HTMLInputElement) &&
    !(target instanceof HTMLTextAreaElement) &&
    !(target instanceof HTMLSelectElement) &&
    !target.isContentEditable
  ) {
    const inner = target.querySelector('input:not([type="hidden"]), textarea, select, [contenteditable="true"]') as HTMLElement | null
    if (inner) {
      target = inner
    } else {
      // 1. Procura no container ou pai próximo (ex: <span>Label</span> <input>)
      const container = target.closest('.form-group, .field, [class*="input" i], [class*="control" i], label, tr, td, li, p, div')
      const nearby = container?.querySelector(
        'input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, select, [contenteditable="true"]',
      ) as HTMLElement | null
      if (nearby) {
        target = nearby
      } else {
        // 2. Procura nos irmãos subsequentes
        let sibling = target.nextElementSibling
        while (sibling) {
          if (
            (sibling instanceof HTMLInputElement && !['hidden', 'button', 'submit', 'checkbox', 'radio'].includes(sibling.type)) ||
            sibling instanceof HTMLTextAreaElement ||
            (sibling instanceof HTMLElement && sibling.isContentEditable)
          ) {
            target = sibling as HTMLElement
            break
          }
          const sub = sibling.querySelector(
            'input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]',
          ) as HTMLElement | null
          if (sub) {
            target = sub
            break
          }
          sibling = sibling.nextElementSibling
        }
      }
    }
  }

  // Apenas botões e links reais: se receberem chamada de valor, procura o campo de entrada associado
  const isBtnTarget =
    target instanceof HTMLButtonElement ||
    target.tagName.toLowerCase() === 'a' ||
    target.getAttribute('role') === 'button' ||
    (target instanceof HTMLInputElement && ['button', 'submit', 'reset', 'image'].includes(target.type))

  if (isBtnTarget) {
    const nearby = target.parentElement?.querySelector(
      'input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]',
    ) as HTMLElement | null
    if (nearby) {
      target = nearby
    } else {
      let scopeRoot: HTMLElement = document.body
      try { scopeRoot = findActiveScope() || document.body } catch {}
      const fallback = scopeRoot.querySelector(
        'input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]',
      ) as HTMLElement | null
      if (fallback) {
        target = fallback
      } else {
        console.warn('[EasyQuiz] setNativeValue: Nenhum campo de texto encontrado para receber o valor.')
        return
      }
    }
  }

  if (
    !(target instanceof HTMLInputElement) &&
    !(target instanceof HTMLTextAreaElement) &&
    !(target instanceof HTMLSelectElement) &&
    !target.isContentEditable
  ) {
    let scopeRoot: HTMLElement = document.body
    try { scopeRoot = findActiveScope() || document.body } catch {}
    const fallback = scopeRoot.querySelector(
      'input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]',
    ) as HTMLElement | null
    if (fallback) {
      target = fallback
    } else {
      console.warn('[EasyQuiz] setNativeValue: Nenhum campo de texto encontrado para receber o valor.')
      return
    }
  }



  // Se o elemento for um radio ou checkbox
  if (target instanceof HTMLInputElement && ['checkbox', 'radio'].includes(target.type)) {
    const shouldCheck = ['true', '1', 'checked', 'yes', 'sim'].includes(value.toLowerCase()) || value === target.value
    setCheckedState(target, shouldCheck)
    return
  }

  const strValue = String(value ?? '')
  let valToSet = strValue
  if (target instanceof HTMLInputElement && target.type === 'number') {
    // Normaliza vírgula decimal para ponto e remove caracteres espúrios para evitar rejeição no HTML5
    const normalized = strValue.replace(',', '.').replace(/[^0-9.-]/g, '')
    if (normalized && !isNaN(Number(normalized))) {
      valToSet = normalized
    }
  }

  // 1. Foco e posicionamento no campo
  try {
    target.scrollIntoView?.({ block: 'center', inline: 'center', behavior: 'instant' as any })
    target.focus?.()
  } catch {}

  // 2. Tenta digitação nativa via execCommand (simula evento de teclado físico direto no browser)
  let execSuccess = false
  try {
    if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) {
      if (target.type !== 'number') {
        try { target.select?.() } catch {}
        execSuccess = document.execCommand?.('insertText', false, valToSet) || false
      }
    } else if (target.isContentEditable) {
      try { document.execCommand?.('selectAll', false, undefined) } catch {}
      execSuccess = document.execCommand?.('insertText', false, valToSet) || false
    }
  } catch {}

  // 3. Inputs ou Textareas padrão (suporte completo a React 15-19, Vue, Angular, Svelte)
  if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) {
    // SEMPRE redefine o _valueTracker do React para um valor diferente do desejado
    // para garantir 100% que o React detecte a mudança e dispare o onChange!
    try {
      const tracker = (target as any)._valueTracker
      if (tracker) tracker.setValue(valToSet === '' ? ' ' : '')
    } catch {}

    const prototype = target instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype
    const setter = Object.getOwnPropertyDescriptor(prototype, 'value')?.set
    if (setter) {
      setter.call(target, valToSet)
    } else {
      target.value = valToSet
    }

    // Sequência completa de eventos de entrada
    try {
      target.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, cancelable: true, key: valToSet.slice(-1) || 'a' }))
    } catch {}
    try {
      target.dispatchEvent(new InputEvent('beforeinput', { bubbles: true, cancelable: true, composed: true, data: valToSet, inputType: 'insertText' }))
    } catch {}
    try {
      target.dispatchEvent(new InputEvent('input', { bubbles: true, cancelable: true, composed: true, data: valToSet, inputType: 'insertText' }))
    } catch {
      target.dispatchEvent(new Event('input', { bubbles: true, cancelable: true, composed: true }))
    }
    try {
      target.dispatchEvent(new KeyboardEvent('keyup', { bubbles: true, cancelable: true, key: valToSet.slice(-1) || 'a' }))
    } catch {}
    try {
      target.dispatchEvent(new Event('change', { bubbles: true, cancelable: true, composed: true }))
    } catch {}
    try {
      target.dispatchEvent(new FocusEvent('blur', { bubbles: true, cancelable: true, composed: true }))
    } catch {}

    // Garante que o valor não foi revertido por um listener de blur ou validação assíncrona
    if (target.value !== valToSet && !(target instanceof HTMLInputElement && target.type === 'number' && Number(target.value) === Number(valToSet))) {
      target.value = valToSet
      try { setter?.call(target, valToSet) } catch {}
    }
    return
  }

  // 4. ContentEditable ou editores baseados em nós de texto (Draft.js, Slate, Quill, ProseMirror)
  if (target.isContentEditable) {
    if (target.textContent?.trim() !== valToSet.trim()) {
      target.textContent = valToSet
      try { (target as any).innerText = valToSet } catch {}
    }
    try {
      target.dispatchEvent(new InputEvent('input', { bubbles: true, cancelable: true, composed: true, data: valToSet, inputType: 'insertText' }))
    } catch {
      target.dispatchEvent(new Event('input', { bubbles: true, cancelable: true, composed: true }))
    }
    try {
      target.dispatchEvent(new Event('change', { bubbles: true, cancelable: true, composed: true }))
    } catch {}
    try {
      target.dispatchEvent(new FocusEvent('blur', { bubbles: true, cancelable: true, composed: true }))
    } catch {}
    return
  }

  // 5. Fallback genérico para elementos customizados (apenas se tiver propriedade value)
  try {
    if ('value' in target) {
      (target as any).value = valToSet
    }
    target.dispatchEvent(new Event('input', { bubbles: true, cancelable: true, composed: true }))
    target.dispatchEvent(new Event('change', { bubbles: true, cancelable: true, composed: true }))
  } catch {}
}

export function getHumanReadableLabel(idOrQuery: unknown, fallback = ''): string {
  if (idOrQuery === null || idOrQuery === undefined) return fallback
  const rawStr = typeof idOrQuery === 'string' ? idOrQuery : String(idOrQuery)
  if (!rawStr) return fallback
  const isTechId = /^(eq-|#|\$|\.|input_|mat-|choice_|radio_|chk_)/i.test(rawStr)
  const clean = cleanSearchTerm(rawStr)
  const el = findElementExt(rawStr) || findElementExt(clean)
  if (!el) return isTechId ? fallback : clean || fallback

  // 1. Se houver label associado ou container de opção
  const labelParent = el.closest('label, .option-card, [class*="choice" i], [class*="option" i], .quiz-option, tr, td, li')
  if (labelParent) {
    const txt = cleanSearchTerm(labelParent.textContent)
    if (txt && txt.length > 0 && txt.length < 150) return txt
  }

  if (el.id) {
    const labelFor = document.querySelector(`label[for="${safeCssEscape(el.id)}"]`)
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

  const rawVal = el instanceof HTMLInputElement || el instanceof HTMLButtonElement ? el.value : ''
  if (rawVal) return cleanSearchTerm(rawVal)

  return isTechId ? fallback : clean || fallback
}

function setCheckedState(element: HTMLElement, checked: boolean): void {
  if (!element) return

  const cardParent = (element.closest(
    '.option-card, label, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, [class*="option" i], [class*="choice" i], li, tr',
  ) || element) as HTMLElement

  let inputEl =
    element instanceof HTMLInputElement && ['checkbox', 'radio'].includes(element.type)
      ? element
      : (cardParent.querySelector('input[type="checkbox"], input[type="radio"]') as HTMLInputElement | null)

  if (!inputEl && cardParent.hasAttribute('for')) {
    inputEl = cardParent.ownerDocument.getElementById(cardParent.getAttribute('for')!) as HTMLInputElement | null
  }

  // Identifica o alvo interativo que deve receber os eventos de ponteiro/clique (o elemento visível na tela)
  const interactiveTarget = (cardParent && isVisible(cardParent)) ? cardParent : element

  if (inputEl) {
    const isRadio = inputEl.type === 'radio'
    const isCheckbox = inputEl.type === 'checkbox'
    const isReactControlled = Boolean((inputEl as any)._valueTracker)
    const stateAlreadyCorrect = inputEl.checked === checked

    if (stateAlreadyCorrect) {
      if (isRadio && checked) {
        // Radio já no estado correto: garante sincronização de atributos e trackers
        cardParent.setAttribute('aria-checked', 'true')
        cardParent.setAttribute('aria-selected', 'true')
        cardParent.classList.add('selected', 'active', 'checked')
        return
      }
      if (isCheckbox) {
        // Checkbox já no estado desejado: não clica novamente para não inverter!
        cardParent.setAttribute('aria-checked', checked ? 'true' : 'false')
        cardParent.setAttribute('aria-selected', checked ? 'true' : 'false')
        cardParent.classList.toggle('selected', checked)
        cardParent.classList.toggle('active', checked)
        cardParent.classList.toggle('checked', checked)
        return
      }
    }

    // Estado divergente: precisamos marcar/alternar com clique real!
    // 1. Simula clique completo de ponteiro no elemento interativo visível (card ou label)
    if (interactiveTarget && interactiveTarget !== inputEl) {
      simulatePointerClick(interactiveTarget)
    }

    // 2. Aciona o clique no input nativo
    try {
      inputEl.focus?.()
      inputEl.click()
    } catch {}

    // 3. Se após o clique o estado ainda divergir (ex: framework SPA controlado ou preventDefault), força via descriptor
    if (inputEl.checked !== checked) {
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
    }

    // 4. Atualiza atributos visuais e semânticos no card APÓS o clique
    cardParent.setAttribute('aria-checked', checked ? 'true' : 'false')
    cardParent.setAttribute('aria-selected', checked ? 'true' : 'false')
    cardParent.classList.toggle('selected', checked)
    cardParent.classList.toggle('active', checked)
    cardParent.classList.toggle('checked', checked)
  } else {
    // Opção customizada sem input nativo (card div, span, button, tile)
    // Avalia o estado ANTES de alterar qualquer classe ou atributo no DOM
    const currentState =
      cardParent.getAttribute('aria-checked') === 'true' ||
      cardParent.getAttribute('aria-selected') === 'true' ||
      cardParent.getAttribute('data-selected') === 'true' ||
      cardParent.getAttribute('data-checked') === 'true' ||
      cardParent.classList.contains('selected') ||
      cardParent.classList.contains('active') ||
      cardParent.classList.contains('checked')

    if (currentState === checked && checked) {
      // Já está selecionado como ativo — não clica novamente para não causar toggle inverso
      return
    }

    // Dispara clique real de ponteiro no card/elemento customizado
    simulatePointerClick(interactiveTarget)

    // Atualiza atributos semânticos APÓS o clique
    cardParent.setAttribute('aria-checked', checked ? 'true' : 'false')
    cardParent.setAttribute('aria-selected', checked ? 'true' : 'false')
    cardParent.classList.toggle('selected', checked)
    cardParent.classList.toggle('active', checked)
    cardParent.classList.toggle('checked', checked)
  }
}

function selectValues(element: HTMLElement, values: string[]): void {
  const selectEl =
    (typeof HTMLSelectElement !== 'undefined' && element instanceof HTMLSelectElement) || element.tagName?.toLowerCase() === 'select'
      ? (element as HTMLSelectElement)
      : (element.querySelector('select') as HTMLSelectElement | null)

  if (selectEl) {
    const normValues = values.map((v) => cleanSearchTerm(v).toLowerCase())
    let matched = false

    const applyOptionSelected = (option: HTMLOptionElement, idx: number) => {
      option.selected = true
      selectEl.selectedIndex = idx
      try {
        selectEl.value = option.value
      } catch {}
      try {
        const descriptor = Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, 'value')
        descriptor?.set?.call(selectEl, option.value)
      } catch {}
      try {
        const tracker = (selectEl as any)._valueTracker
        if (tracker) {
          tracker.setValue(option.value)
        }
      } catch {}
      matched = true
    }

    // Passagem 1: Correspondência exata em value ou textContent
    for (let i = 0; i < selectEl.options.length; i++) {
      const option = selectEl.options[i]
      const optVal = option.value.toLowerCase()
      const optTxt = cleanSearchTerm(option.textContent).toLowerCase()

      const isExact = normValues.some((v) => v === optVal || v === optTxt)
      if (isExact) {
        applyOptionSelected(option, i)
        if (!selectEl.multiple) break
      } else if (!selectEl.multiple) {
        option.selected = false
      }
    }

    // Passagem 2: Correspondência numérica ou ordinal (ex: "1", "2", "Opção 1", "Item 2")
    if (!matched) {
      for (const v of normValues) {
        const numMatch = v.match(/^(?:item|opção|opcao|alternativa|linha|escolha|campo)?\s*#?_?([0-9]+)$/i)
        if (numMatch) {
          const rawNum = parseInt(numMatch[1], 10)
          const hasPlaceholder = selectEl.options[0]?.value === '' || selectEl.options[0]?.disabled
          const targetIdx = hasPlaceholder ? rawNum : (rawNum >= 1 ? rawNum - 1 : 0)
          if (targetIdx >= 0 && targetIdx < selectEl.options.length) {
            applyOptionSelected(selectEl.options[targetIdx], targetIdx)
            if (!selectEl.multiple) break
          }
        }
      }
    }

    // Passagem 3: Correspondência por letra de alternativa (ex: "A", "B", "C", "D")
    if (!matched) {
      for (const v of normValues) {
        if (/^[a-z]$/i.test(v)) {
          const letterIdx = v.toUpperCase().charCodeAt(0) - 65
          const hasPlaceholder = selectEl.options[0]?.value === '' || selectEl.options[0]?.disabled
          const targetIdx = hasPlaceholder ? letterIdx + 1 : letterIdx
          if (targetIdx >= 0 && targetIdx < selectEl.options.length) {
            applyOptionSelected(selectEl.options[targetIdx], targetIdx)
            if (!selectEl.multiple) break
          }
        }
      }
    }

    // Passagem 4: Correspondência parcial por contenção e texto normalizado sem acentos
    if (!matched) {
      const stripAccents = (s: string) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      for (let i = 0; i < selectEl.options.length; i++) {
        const option = selectEl.options[i]
        const optVal = stripAccents(option.value.toLowerCase())
        const optTxt = stripAccents(cleanSearchTerm(option.textContent).toLowerCase())

        const isPartial = normValues.some((rawV) => {
          const v = stripAccents(rawV)
          return optVal.includes(v) || optTxt.includes(v) || (v.length > 2 && (v.includes(optVal) || v.includes(optTxt)))
        })
        if (isPartial) {
          applyOptionSelected(option, i)
          if (!selectEl.multiple) break
        }
      }
    }

    if (matched) {
      dispatchEventSequence(selectEl, ['focus', 'input', 'change', 'blur'])
      return
    }
  }

  // Fallback para menu suspenso / combobox customizado (Material UI, Ant Design, Bootstrap, custom spans/divs)
  const combobox = (element.matches?.('[role="combobox"], [role="listbox"], [class*="select" i], [class*="dropdown" i]')
    ? element
    : element.closest('[role="combobox"], [role="listbox"], [class*="select" i], [class*="dropdown" i]')) as HTMLElement | null

  if (combobox) {
    simulatePointerClick(combobox)
  }

  // Procura opções tanto dentro do combobox quanto em popups/menus anexados ao document.body
  const normValues = values.map((v) => cleanSearchTerm(v).toLowerCase())
  const popupOptions = Array.from(
    document.querySelectorAll(
      '[role="listbox"] [role="option"], [role="menu"] [role="menuitem"], .select-dropdown li, .dropdown-menu .dropdown-item, .ant-select-item-option, .MuiMenuItem-root, [class*="option-item"], li[data-value]',
    ),
  ).filter((e) => isVisible(e as HTMLElement) && !isInsideEasyQuiz(e as HTMLElement)) as HTMLElement[]

  for (const v of normValues) {
    // 1. Procura no conjunto de opções de popups
    const matchedOpt = popupOptions.find((opt) => {
      const txt = cleanSearchTerm(opt.textContent).toLowerCase()
      const val = cleanSearchTerm(opt.getAttribute('data-value') || opt.getAttribute('value') || '').toLowerCase()
      return txt === v || val === v || txt.includes(v) || (v.length > 2 && v.includes(txt))
    })

    if (matchedOpt) {
      simulatePointerClick(matchedOpt)
      const innerInput = matchedOpt.querySelector('input[type="radio"], input[type="checkbox"]') as HTMLInputElement | null
      if (innerInput) setCheckedState(innerInput, true)
      return
    }

    // 2. Procura com o motor estendido geral
    const optItem = findElementExt(v)
    if (optItem) {
      simulatePointerClick(optItem)
      return
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

function dispatchSingleClick(element: HTMLElement): void {
  try {
    element.click()
  } catch {
    const view = element.ownerDocument.defaultView || window
    element.dispatchEvent(new view.MouseEvent('click', { bubbles: true, cancelable: true, composed: true, view }))
  }
}

function findDragTarget(query: string, kind: 'source' | 'destination'): HTMLElement | null {
  const cleanQuery = cleanSearchTerm(query).toLowerCase()
  if (!cleanQuery) return null

  if (kind === 'source') {
    // 1. ID nativo exato (Wayground usa IDs hexadecimais nos cards)
    if (/^[0-9a-f]{10,}$/.test(query.trim())) {
      const byId = document.getElementById(query.trim())
      if (byId && isVisible(byId) && !isInsideEasyQuiz(byId)) return byId
    }
    // 2. Seletores de origem drag: cursor-grab (Wayground), dnd-card, draggable=true
    const sourceSelectors = [
      '[class*="cursor-grab"][id]',
      '.dnd-card',
      '[draggable="true"]',
    ]
    for (const sel of sourceSelectors) {
      const candidates = Array.from(document.querySelectorAll(sel)) as HTMLElement[]
      const found = candidates.find((candidate) => {
        if (!isVisible(candidate) || isInsideEasyQuiz(candidate)) return false
        const haystack = cleanSearchTerm(
          `${candidate.id} ${candidate.textContent || ''} ${candidate.getAttribute('data-id') || ''}`,
        ).toLowerCase()
        return haystack === cleanQuery || haystack.includes(cleanQuery) || candidate.id === query.trim()
      })
      if (found) return found
    }
    return null
  }

  // kind === 'destination'
  // 1. Atributo data-category / data-dropzone exato
  const destSelectors = [
    '[data-dropzone]',
    '[data-category]',
    '[data-role="dropzone"]',
    '[class*="dropzone" i]',
    '[class*="list-group" i]',           // Wayground: colunas de categorias são list-group
    '[class*="classification-group" i]', // alternativa Quizizz
  ].join(',')
  const candidates = Array.from(document.querySelectorAll(destSelectors)) as HTMLElement[]

  const exactAttribute = candidates.find((candidate) =>
    [candidate.getAttribute('data-category'), candidate.getAttribute('data-dropzone')]
      .some((value) => value?.trim().toLowerCase() === cleanQuery)
  )
  if (exactAttribute && isVisible(exactAttribute) && !isInsideEasyQuiz(exactAttribute)) return exactAttribute

  // 2. Busca por texto na zona (FATO, OPINIÃO, etc.)
  //    Exclui: zona unclassified E zona cujo header é 'Opções' (pool de items não classificados)
  return candidates.find((candidate) => {
    if (!isVisible(candidate) || isInsideEasyQuiz(candidate)) return false
    if (/unclassified/i.test(candidate.className)) return false
    // Pega só o header da zona (primeiro child bold) para validar — evita falso positivo pelo conteúdo dos items
    const headerEl = candidate.querySelector('.font-bold, h1, h2, h3, h4, [class*="header" i], [class*="title" i], [class*="label" i]')
    const headerText = cleanSearchTerm(headerEl?.textContent || candidate.textContent || '').toLowerCase()
    if (headerText.includes('op') && (headerText.includes('es') || headerText.includes('ões'))) return false // exclui 'Opções'
    return headerText === cleanQuery || headerText.startsWith(cleanQuery) || headerText.includes(cleanQuery)
  }) || null
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
  // Widgets click-to-place alternam o estado a cada clique; não duplicar o evento.
  dispatchSingleClick(origin)
  await new Promise((r) => setTimeout(r, 140))

  dispatchSingleClick(dest)

  // Se o destino tiver um container dropzone interno específico, clica nele também
  const dropInner = dest.querySelector(
    '[data-role="dropzone"], [class*="bucket" i], [class*="slot" i], [class*="drop" i], [class*="target" i], [class*="items" i], ul, ol',
  ) as HTMLElement | null
  if (dropInner && dropInner !== dest) {
    dispatchSingleClick(dropInner)
  }

  await new Promise((r) => setTimeout(r, 100))

  // Alguns widgets expõem apenas um modelo visual de click-to-place e não
  // atualizam o DOM quando o clique sintético não passa pelo dispatcher deles.
  // Para cartões/dropzones explícitos, mover o nó é a última via determinística.
  if (
    !dest.contains(origin) &&
    origin.matches('.dnd-card, [draggable="true"]') &&
    dest.matches('.dnd-zone, [data-dropzone], [data-role="dropzone"]')
  ) {
    dest.appendChild(origin)
  }

  if (dest.contains(origin) && origin.matches('.dnd-card, [draggable="true"]')) return

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

    const DragEventCtor = origin.ownerDocument.defaultView?.DragEvent
    if (!DragEventCtor) throw new Error('DragEvent não disponível neste documento')
    origin.dispatchEvent(new DragEventCtor('dragstart', dragStartInit))
    dest.dispatchEvent(new DragEventCtor('dragenter', dragEndInit))
    dest.dispatchEvent(new DragEventCtor('dragover', dragEndInit))
    dest.dispatchEvent(new DragEventCtor('drop', dragEndInit))
    origin.dispatchEvent(new DragEventCtor('dragend', dragStartInit))
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
  find: (idOrLabel: string, valueHint?: string) => findElementExt(idOrLabel, valueHint),
  drag: (idOrigem: string, idDest: string) => {
    const origin = findDragTarget(idOrigem, 'source') || findElementExt(idOrigem)
    const dest = findDragTarget(idDest, 'destination') || findElementExt(idDest)
    if (origin && dest) {
      simulateDragAndCategorize(origin, dest)
    } else {
      console.warn(`$eq.drag: Origem ou destino não encontrado ('${idOrigem}' -> '${idDest}')`)
    }
  },
  categorize: async (itemQuery: string, categoryQuery: string) => {
    const item = findDragTarget(itemQuery, 'source') || findElementExt(itemQuery)
    const cat = findDragTarget(categoryQuery, 'destination') || findElementExt(categoryQuery)
    if (!item || !cat) {
      console.warn(`$eq.categorize: Item ou categoria não encontrados ('${itemQuery}' -> '${categoryQuery}')`)
      return
    }
    await simulateDragAndCategorize(item, cat)
  },
  execute: (plan: AnalysisPlan, allowAdvance = false, attempt = 1) => executePlan(plan, allowAdvance, attempt),
}
if (typeof window !== 'undefined') {
  ;(window as any).$eq = EqAPI
}

// ---- EXECUTOR DECLARATIVO ----
async function executeDeclarativeAction(action: DeclarativeAction, attempt = 1, policy = createExecutionPolicy()): Promise<void> {
  assertActionAllowed(action, policy)
  if (action.t === 'js') {
    const code = String(action.v || '')
    validateJavaScriptSource(code)
    try {
      const fn = new Function('$eq', 'document', 'window', code)
      fn(EqAPI, document, window)
    } catch (err) {
      console.warn('[EasyQuiz JS Execution]', err)
      throw err
    }
    return
  }

  if (action.t === 'drag') {
    let fromEl = findDragTarget(action.from, 'source') || findElementExt(action.from)
    let toEl = findDragTarget(action.to, 'destination') || findElementExt(action.to)

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

  let elId = action.id !== undefined && action.id !== null ? String(action.id) : ''
  if (!elId && action.t === 'val') {
    elId = (action as any).target ?? (action as any).name ?? (action as any).selector ?? '1'
  }
  const rawVal =
    (action as any).v !== undefined
      ? (action as any).v
      : (action as any).value !== undefined
        ? (action as any).value
        : (action as any).val !== undefined
          ? (action as any).val
          : (action as any).text
  const valHint = rawVal !== undefined && rawVal !== null ? String(rawVal).trim() : ''
  let element = findElementExt(elId, valHint, action.t === 'val' || action.t === 'sel')
  if (!element && elId) {
    element = findElementExt(cleanSearchTerm(elId), valHint, action.t === 'val' || action.t === 'sel')
  }
  if (element && valHint) {
    if (element instanceof HTMLInputElement && element.type === 'radio' && element.name) {
      if (cleanSearchTerm(element.value).toLowerCase() !== cleanSearchTerm(valHint).toLowerCase()) {
        const groupRadio = document.querySelector(
          `input[type="radio"][name="${safeCssEscape(element.name)}"][value="${safeCssEscape(valHint)}" i]`,
        ) as HTMLInputElement | null
        if (groupRadio) {
          element = groupRadio
        } else {
          const allInGroup = Array.from(
            document.querySelectorAll(`input[type="radio"][name="${safeCssEscape(element.name)}"]`),
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
        `input[value="${safeCssEscape(valHint)}" i], [data-value="${safeCssEscape(valHint)}" i]`,
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

  if (!element && (action.t === 'val' || action.t === 'sel')) {
    let scopeRoot: HTMLElement = document.body
    try { scopeRoot = findActiveScope() || document.body } catch {}
    const activeInputs = Array.from(
      scopeRoot.querySelectorAll(
        action.t === 'sel'
          ? 'select, [role="combobox"], [role="listbox"]'
          : 'input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, select, [contenteditable="true"]',
      ),
    ).filter((i) => isVisible(i as HTMLElement) && !isInsideEasyQuiz(i as HTMLElement)) as HTMLElement[]

    if (activeInputs.length === 1) {
      element = activeInputs[0]
    } else if (activeInputs.length > 1) {
      const clean = cleanSearchTerm(elId).toLowerCase()
      const numMatch = clean.match(/^#?_?([0-9]+)$/)
      if (numMatch) {
        const parsed = parseInt(numMatch[1], 10)
        if (parsed >= 1 && parsed <= activeInputs.length) {
          element = activeInputs[parsed - 1]
        } else if (parsed >= 0 && parsed < activeInputs.length) {
          element = activeInputs[parsed]
        }
      }

      if (!element) {
        const match = activeInputs.find((i) => {
          const ph = (i.getAttribute('placeholder') || '').toLowerCase()
          const name = ((i as any).name || '').toLowerCase()
          const aria = (i.getAttribute('aria-label') || '').toLowerCase()
          const id = (i.id || '').toLowerCase()
          const label = cleanSearchTerm(labelForControl(i)).toLowerCase()
          const containerText = cleanSearchTerm(
            i.closest('label, tr, td, .form-group, .field, [class*="row" i], div')?.textContent || '',
          ).toLowerCase()
          return (
            ph.includes(clean) ||
            name.includes(clean) ||
            aria.includes(clean) ||
            id.includes(clean) ||
            (label && label.includes(clean)) ||
            (clean.length >= 2 && containerText.includes(clean))
          )
        })
        element = match || (activeInputs.length === 1 ? activeInputs[0] : null)
      }
    }
  }

  if (!element && action.t !== 'adv') {
    throw new Error(`Alvo '${elId}' não encontrado no DOM para ação '${action.t}'.`)
  }

  switch (action.t) {
    case 'val':
      if (element) {
        let targetInput: HTMLElement | null =
          (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement || element instanceof HTMLSelectElement || element.isContentEditable)
            ? element
            : (element.querySelector('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]') as HTMLElement | null)

        if (!targetInput) {
          const container = element.closest('.form-group, .field, [class*="input" i], [class*="control" i], label, tr, td, li, p, div')
          const nearbyInput = container?.querySelector(
            'input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]',
          ) as HTMLElement | null
          if (nearbyInput) {
            targetInput = nearbyInput
          }
        }

        if (!targetInput) {
          let sibling = element.nextElementSibling
          while (sibling) {
            if (
              (sibling instanceof HTMLInputElement && !['hidden', 'button', 'submit', 'checkbox', 'radio'].includes(sibling.type)) ||
              sibling instanceof HTMLTextAreaElement ||
              (sibling instanceof HTMLElement && sibling.isContentEditable)
            ) {
              targetInput = sibling as HTMLElement
              break
            }
            const sub = sibling.querySelector(
              'input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]',
            ) as HTMLElement | null
            if (sub) {
              targetInput = sub
              break
            }
            sibling = sibling.nextElementSibling
          }
        }

        if (!targetInput) {
          let scopeRoot: HTMLElement = document.body
          try { scopeRoot = findActiveScope() || document.body } catch {}
          const visibleInputs = Array.from(
            scopeRoot.querySelectorAll(
              'input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]',
            ),
          ).filter((i) => isVisible(i as HTMLElement) && !isInsideEasyQuiz(i as HTMLElement)) as HTMLElement[]

          if (visibleInputs.length > 0) {
            targetInput = visibleInputs[0]
          }
        }

        const actRawVal =
          action.v !== undefined
            ? action.v
            : (action as any).value !== undefined
              ? (action as any).value
              : (action as any).val !== undefined
                ? (action as any).val
                : (action as any).text
        const valString = actRawVal !== undefined && actRawVal !== null ? String(actRawVal) : ''

        if (targetInput) {
          setNativeValue(targetInput, valString)
        } else {
          setNativeValue(element, valString)
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
          element.closest('.option-card, label, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, [class*="option" i], [class*="choice" i], [class*="answer" i], li, tr') ||
          element.querySelector('input[type="radio"], input[type="checkbox"]') ||
          (element instanceof HTMLInputElement && ['checkbox', 'radio'].includes(element.type))
        )

        if (isOptionCard) {
          const targetState = (action as any).c !== undefined ? Boolean((action as any).c) : true
          setCheckedState(element, targetState)
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
  // Filtro de anti-retrocesso: garante que botões de "Voltar", "Anterior", "Back" NUNCA sejam selecionados como avanço
  const isAntiAdvance = (el: HTMLElement): boolean => {
    const text = (
      el.getAttribute('aria-label') ||
      el.textContent ||
      (el instanceof HTMLInputElement || el instanceof HTMLButtonElement ? el.value : '') ||
      ''
    ).trim()
    return ANTI_NAVIGATION_PATTERN.test(text)
  }

  // 1. Seletor ou ID preferencial informado pela IA
  if (preferredId) {
    const el = findElementExt(preferredId)
    if (el && isVisible(el) && !isInsideEasyQuiz(el) && !isUtilityOrGamificationControl(el) && !isAntiAdvance(el)) return el
  }

  // 2. Cache de domínio salvo de execuções anteriores bem-sucedidas
  try {
    const cache = loadDomainCache(window.location.hostname)
    if (cache.advanceSelector) {
      const cached = findElementExt(cache.advanceSelector)
      if (cached && isVisible(cached) && !isInsideEasyQuiz(cached) && !isUtilityOrGamificationControl(cached) && !isAntiAdvance(cached)) return cached
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

  // Helper: texto legível do elemento
  const elText = (el: HTMLElement): string => {
    const val = el instanceof HTMLInputElement || el instanceof HTMLButtonElement ? el.value : ''
    return (el.getAttribute('aria-label') || el.textContent || val || '').trim()
  }

  // Helper: é número puro de paginação (ex: "1","2","3" num paginador)?
  const isPurePageNumber = (el: HTMLElement): boolean => {
    const txt = elText(el).trim()
    if (!/^\d{1,3}$/.test(txt)) return false
    return Boolean(el.closest(
      '[class*="pagination" i], [class*="pager" i], [class*="page-nav" i], ' +
      '[class*="step-indicator" i], [class*="breadcrumb" i], [class*="steps" i], ' +
      '[aria-label*="página" i], [aria-label*="page" i], [role="navigation"], nav'
    ))
  }

  const candidates = all.filter((el) =>
    isVisible(el) &&
    !isInsideEasyQuiz(el) &&
    !el.closest('header, aside') &&
    !isUtilityOrGamificationControl(el) &&
    !isAntiAdvance(el)
  )

  // Prioridade A1 (MÁXIMA): Texto explícito de avanço via NAVIGATION_PATTERN
  for (const el of candidates) {
    const text = elText(el)
    const testable = text.replace(/[\d\(\)\[\]\u2192>\u2022\-\/\\]+/g, ' ').trim()
    if (
      (NAVIGATION_PATTERN.test(text) || NAVIGATION_PATTERN.test(testable)) &&
      !isPurePageNumber(el) &&
      !isUtilityOrGamificationControl(el)
    ) return el
  }

  // Prioridade A2: isNavigationControl genérico (inclui números com contexto paginação)
  for (const el of candidates) {
    if (isNavigationControl(el) && !isUtilityOrGamificationControl(el) && !isPurePageNumber(el)) return el
  }

  // Prioridade B: data-testid/aria-label explícito de navegação
  const genericNext = document.querySelector(
    '[data-test-id*="next" i], [data-testid*="next" i], [aria-label*="next" i], [aria-label*="próxim" i], [aria-label*="avançar" i], [aria-label*="continuar" i]',
  ) as HTMLElement | null
  if (genericNext && isVisible(genericNext) && !isInsideEasyQuiz(genericNext) && !isUtilityOrGamificationControl(genericNext) && !isAntiAdvance(genericNext)) {
    return genericNext
  }

  // Prioridade C: input[type="submit"] / button[type="submit"] visível sem texto de retrocesso
  const submitInputs = Array.from(
    document.querySelectorAll('input[type="submit"], button[type="submit"]')
  ) as HTMLElement[]
  for (const el of submitInputs) {
    if (isVisible(el) && !isInsideEasyQuiz(el) && !isAntiAdvance(el) && !isUtilityOrGamificationControl(el) && !isPurePageNumber(el)) {
      return el
    }
  }

  // Prioridade D (último recurso): qualquer botão visível na metade inferior da viewport
  const allButtons = Array.from(document.querySelectorAll('button, [role="button"]')) as HTMLElement[]
  const viewH = window.innerHeight
  const bottomButtons = allButtons.filter(el => {
    if (!isVisible(el) || isInsideEasyQuiz(el) || isAntiAdvance(el) || isUtilityOrGamificationControl(el)) return false
    if (el.closest('header, nav, aside, .eq-sidebar')) return false
    if (isPurePageNumber(el)) return false
    const rect = el.getBoundingClientRect()
    return rect.top > viewH * 0.45 && rect.height >= 24 && rect.width >= 24
  })
  if (bottomButtons.length > 0) {
    bottomButtons.sort((a, b) => {
      const ra = a.getBoundingClientRect()
      const rb = b.getBoundingClientRect()
      const scoreA = ra.left + ra.top
      const scoreB = rb.left + rb.top
      return scoreB - scoreA
    })
    return bottomButtons[0]
  }

  // Último recurso absoluto: número de paginação se for o único "nav" restante
  for (const el of candidates) {
    if (isNavigationControl(el) && !isUtilityOrGamificationControl(el)) return el
  }

  return null
}

export async function waitForEnabled(el: HTMLElement, maxMs = 2500): Promise<void> {
  const start = Date.now()
  while (Date.now() - start < maxMs) {
    const isDisabled =
      (el as any).disabled === true ||
      el.getAttribute('aria-disabled') === 'true' ||
      el.classList.contains('disabled') ||
      el.getAttribute('disabled') !== null
    if (!isDisabled) return
    await new Promise((r) => setTimeout(r, 80))
  }
  // Timeout: botão ainda desativado, mas prosseguimos — pode funcionar mesmo assim
}

export interface ExecutionResult {
  applied: number
  verified: number
  success: boolean
  advanced: boolean
  failed: string[]
  reports: ActionExecutionReport[]
  navigationVerified: boolean
  navigationEvidence: string
}

function getNavigationSignature(): string {
  // Usa apenas indicadores ESTRUTURAIS da página — não o texto completo do body.
  // Isso evita falso-positivos quando feedbacks visuais ("Correto! ✓", "Errado") aparecem
  // na tela sem efetivamente mudar de questão.
  const url = window.location.href
  const title = document.title
  const controlCount = document.querySelectorAll('input, textarea, select, button, [role="button"], [role="option"], [role="radio"], [role="checkbox"]').length
  // Número de caracteres do texto visível: muda substancialmente quando troca de questão
  const textLen = (document.body?.innerText || document.body?.textContent || '').length
  return `${url}|${title}|${controlCount}|${textLen}`
}

async function waitForNavigationChange(before: string, maxMs = 3500): Promise<{ changed: boolean; evidence: string }> {
  const [beforeUrl, beforeTitle, beforeControls, beforeTextLen] = before.split('|')
  const beforeTextLenNum = parseInt(beforeTextLen || '0', 10)
  const start = Date.now()

  while (Date.now() - start < maxMs) {
    const url = window.location.href
    const title = document.title
    const controlCount = String(document.querySelectorAll('input, textarea, select, button, [role="button"], [role="option"], [role="radio"], [role="checkbox"]').length)
    const textLen = (document.body?.innerText || document.body?.textContent || '').length

    // 1. Mudança de URL = navegação real inequívoca
    if (url !== beforeUrl) {
      return { changed: true, evidence: `URL mudou: ${beforeUrl} → ${url}` }
    }
    // 2. Título da página mudou = SPA trocou de rota/estado
    if (title !== beforeTitle) {
      return { changed: true, evidence: `Título da página mudou: "${beforeTitle}" → "${title}"` }
    }
    // 3. Número de controles mudou substancialmente (nova questão apareceu ou desapareceu)
    if (Math.abs(parseInt(controlCount) - parseInt(beforeControls || '0')) >= 2) {
      return { changed: true, evidence: `Controles interativos: ${beforeControls} → ${controlCount}` }
    }
    // 4. Texto da página mudou SUBSTANCIALMENTE (>50 chars)
    // Diferença pequena pode ser só feedback ("Correto!", "Errado") sem trocar de questão
    if (Math.abs(textLen - beforeTextLenNum) > 50) {
      return { changed: true, evidence: `Conteúdo da página mudou substancialmente (${Math.abs(textLen - beforeTextLenNum)} chars)` }
    }

    await new Promise((resolve) => setTimeout(resolve, 100))
  }
  return { changed: false, evidence: 'Nenhuma mudança estrutural detectada dentro do tempo limite.' }
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
  const valHint = (action as any).v !== undefined ? String((action as any).v).trim() : ''
  let el = findElementExt(elId, valHint) || findElementExt(cleanSearchTerm(elId), valHint)

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
        if (val === clean) return true
        if (txt === clean) return true
        if (txt.startsWith(clean + ')') || txt.startsWith('(' + clean + ')') || txt.startsWith(clean + '.') || txt.startsWith(clean + ' - ') || txt.startsWith(clean + ':')) {
          return true
        }
        if (clean.length >= 3 && txt.includes(clean)) {
          return true
        }
        return false
      }) || null
    }

    // Resolução inteligente de rádio por valor/opção (ex: tabela VF, grupo com name compartilhado)
    const valHint = (action as any).v !== undefined ? String((action as any).v).trim() : ''
    if (el && valHint) {
      if (el instanceof HTMLInputElement && el.type === 'radio' && el.name) {
        if (cleanSearchTerm(el.value).toLowerCase() !== cleanSearchTerm(valHint).toLowerCase()) {
          const groupRadio = document.querySelector(
            `input[type="radio"][name="${safeCssEscape(el.name)}"][value="${safeCssEscape(valHint)}" i]`,
          ) as HTMLInputElement | null
          if (groupRadio) {
            el = groupRadio
          } else {
            const allInGroup = Array.from(
              document.querySelectorAll(`input[type="radio"][name="${safeCssEscape(el.name)}"]`),
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
          `input[value="${safeCssEscape(valHint)}" i], [data-value="${safeCssEscape(valHint)}" i]`,
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
      const shouldCheck = action.t === 'chk' ? Boolean(action.c) : (action as any).c !== undefined ? Boolean((action as any).c) : true

      // Executa o motor central de persistência
      setCheckedState(input || card, shouldCheck)

      // Se ainda divergente, aplica via descriptor e trackers
      if (input && input.checked !== shouldCheck) {
        try {
          const tracker = (input as any)._valueTracker
          if (tracker) tracker.setValue(!shouldCheck)
        } catch {}
        try {
          const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'checked')?.set
          setter?.call(input, shouldCheck)
        } catch {}
        input.checked = shouldCheck
        input.dispatchEvent(new Event('input', { bubbles: true, composed: true }))
        input.dispatchEvent(new Event('change', { bubbles: true, composed: true }))
      }
    }
    return
  }

  if (action.t === 'val') {
    let targetInput: HTMLElement | null = null
    if (el) {
      targetInput =
        el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement || el.isContentEditable
          ? el
          : (el.querySelector('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]') as HTMLElement | null)
    }

    if (!targetInput) {
      let scopeRoot: HTMLElement = document.body
      try { scopeRoot = findActiveScope() || document.body } catch {}
      const inputs = Array.from(
        scopeRoot.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]'),
      ) as HTMLElement[]
      const clean = cleanSearchTerm(elId).toLowerCase()
      targetInput = inputs.find((i) => {
        const ph = (i.getAttribute('placeholder') || '').toLowerCase()
        const name = ((i as any).name || '').toLowerCase()
        const id = (i.id || '').toLowerCase()
        const aria = (i.getAttribute('aria-label') || '').toLowerCase()
        return ph.includes(clean) || name.includes(clean) || id.includes(clean) || aria.includes(clean)
      }) || (inputs.length > 0 ? inputs[0] : null)
    }

    if (targetInput) {
      const val = String(action.v ?? '')
      try {
        targetInput.focus?.()
        if ((targetInput as HTMLInputElement).type !== 'number') {
          try { (targetInput as any).select?.() } catch {}
          document.execCommand?.('insertText', false, val)
        }
      } catch {}

      setNativeValue(targetInput, val)
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
      const rawExpected =
        action.v !== undefined
          ? action.v
          : (action as any).value !== undefined
            ? (action as any).value
            : (action as any).val !== undefined
              ? (action as any).val
              : (action as any).text
      const expected = String(rawExpected ?? '').trim()
      const valHint = expected
      let rawActId = action.id !== undefined && action.id !== null ? String(action.id) : ''
      if (!rawActId) {
        rawActId = (action as any).target ?? (action as any).name ?? (action as any).selector ?? '1'
      }
      let el = (findElementExt(rawActId, valHint, true) || findElementExt(cleanSearchTerm(rawActId), valHint, true)) as HTMLElement | null
      if (!el) {
        let scopeRoot: HTMLElement = document.body
        try { scopeRoot = findActiveScope() || document.body } catch {}
        const visibleInputs = Array.from(
          scopeRoot.querySelectorAll(
            'input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]',
          ),
        ).filter((i) => isVisible(i as HTMLElement) && !isInsideEasyQuiz(i as HTMLElement)) as HTMLElement[]
        if (visibleInputs.length > 0) el = visibleInputs[0]
      }
      if (!el) return false

      // Se for rádio ou grupo de rádios
      const radioInput =
        el instanceof HTMLInputElement && el.type === 'radio'
          ? el
          : (el.querySelector('input[type="radio"]') as HTMLInputElement | null)

      if (radioInput && radioInput.name) {
        const checkedRadio = document.querySelector(
          `input[type="radio"][name="${safeCssEscape(radioInput.name)}"]:checked`,
        ) as HTMLInputElement | null
        if (!checkedRadio) return false
        const valCur = cleanSearchTerm(checkedRadio.value).toLowerCase()
        const valExp = cleanSearchTerm(expected).toLowerCase()
        const labelCur = cleanSearchTerm(checkedRadio.closest('label, .vf-label, .option-card, tr, td, div')?.textContent || '').toLowerCase()
        return valCur === valExp || labelCur === valExp || labelCur.includes(valExp)
      }

      let targetInput: HTMLElement | null =
        el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement || el.isContentEditable
          ? el
          : (el.querySelector('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]') as HTMLElement | null)

      if (!targetInput) {
        const container = el.closest('.form-group, .field, [class*="input" i], [class*="control" i], label, tr, td, li, p, div')
        const nearbyInput = container?.querySelector(
          'input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]',
        ) as HTMLElement | null
        if (nearbyInput) targetInput = nearbyInput
      }

      if (!targetInput) {
        let sibling = el.nextElementSibling
        while (sibling) {
          if (
            (sibling instanceof HTMLInputElement && !['hidden', 'button', 'submit', 'checkbox', 'radio'].includes(sibling.type)) ||
            sibling instanceof HTMLTextAreaElement ||
            (sibling instanceof HTMLElement && sibling.isContentEditable)
          ) {
            targetInput = sibling as HTMLElement
            break
          }
          const sub = sibling.querySelector(
            'input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]',
          ) as HTMLElement | null
          if (sub) {
            targetInput = sub
            break
          }
          sibling = sibling.nextElementSibling
        }
      }

      if (targetInput instanceof HTMLSelectElement) {
        const normExp = cleanSearchTerm(expected).toLowerCase()
        return Array.from(targetInput.options).some((o) => {
          if (!o.selected) return false
          const optVal = o.value.toLowerCase()
          const optTxt = cleanSearchTerm(o.textContent).toLowerCase()
          return normExp === optVal || normExp === optTxt || optVal.includes(normExp) || optTxt.includes(normExp)
        })
      }

      const cur = (targetInput instanceof HTMLInputElement || targetInput instanceof HTMLTextAreaElement ? targetInput.value : targetInput?.textContent ?? el.textContent ?? '').trim()
      if (!cur && !expected) return true
      if (!cur && expected) return false
      const normCur = cur.replace(',', '.').replace(/\s+/g, '').toLowerCase()
      const normExp = expected.replace(',', '.').replace(/\s+/g, '').toLowerCase()
      return normCur === normExp || normCur.includes(normExp) || normExp.includes(normCur) || cur.toLowerCase() === expected.toLowerCase()
    }

    if (action.t === 'sel') {
      let el = (findElementExt(action.id, undefined, true) || findElementExt(cleanSearchTerm(action.id), undefined, true)) as HTMLElement | null
      if (!el) {
        let scopeRoot: HTMLElement = document.body
        try { scopeRoot = findActiveScope() || document.body } catch {}
        const visibleSelects = Array.from(
          scopeRoot.querySelectorAll('select, [role="combobox"], [role="listbox"]')
        ).filter((i) => isVisible(i as HTMLElement) && !isInsideEasyQuiz(i as HTMLElement)) as HTMLElement[]

        const clean = cleanSearchTerm(action.id).toLowerCase()
        const match = visibleSelects.find((s) => {
          const id = (s.id || '').toLowerCase()
          const name = (s.getAttribute('name') || '').toLowerCase()
          const aria = (s.getAttribute('aria-label') || '').toLowerCase()
          const containerText = cleanSearchTerm(s.closest('.dropdown-row, [class*="dropdown" i], [class*="select" i], tr, label, div')?.textContent || '').toLowerCase()
          return id.includes(clean) || name.includes(clean) || aria.includes(clean) || (clean.length >= 2 && containerText.includes(clean))
        })
        el = match || (visibleSelects.length === 1 ? visibleSelects[0] : null)
      }
      if (!el) return false
      const selectEl = el instanceof HTMLSelectElement ? el : (el.querySelector('select') as HTMLSelectElement | null)
      if (!selectEl) {
        const combobox = (el.matches?.('[role="combobox"], [role="listbox"], [class*="select" i], [class*="dropdown" i]')
          ? el
          : el.closest('[role="combobox"], [role="listbox"], [class*="select" i], [class*="dropdown" i]')) as HTMLElement | null
        if (combobox) {
          const values = Array.isArray(action.v) ? action.v : [String(action.v)]
          const normValues = values.map((v) => cleanSearchTerm(v).toLowerCase())
          const text = cleanSearchTerm(combobox.textContent).toLowerCase()
          return normValues.some((v) => text.includes(v) || v.includes(text))
        }
        return false
      }
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
      const valHint = (action as any).v !== undefined ? String((action as any).v).trim() : ''
      const el = findElementExt(action.id, valHint) || findElementExt(cleanSearchTerm(action.id), valHint)
      if (!el) return false
      const card = (el.closest(
        '.option-card, label, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, li',
      ) || el) as HTMLElement

      const inputEl =
        el instanceof HTMLInputElement && ['checkbox', 'radio'].includes(el.type)
          ? el
          : (card.querySelector('input[type="checkbox"], input[type="radio"]') as HTMLInputElement | null) ||
            (card.getAttribute('for') ? (card.ownerDocument.getElementById(card.getAttribute('for')!) as HTMLInputElement | null) : null)

      const expected = action.t === 'chk' ? Boolean(action.c) : (action as any).c !== undefined ? Boolean((action as any).c) : true

      // Se for rádio ou grupo de rádios
      if (inputEl && inputEl.type === 'radio') {
        if (inputEl.checked === expected) return true
        if ((action as any).v && inputEl.name) {
          const expectedVal = cleanSearchTerm(String((action as any).v)).toLowerCase()
          const checkedRadio = document.querySelector(
            `input[type="radio"][name="${safeCssEscape(inputEl.name)}"]:checked`,
          ) as HTMLInputElement | null
          if (!checkedRadio) return false
          if (checkedRadio === inputEl) return true
          const valCur = cleanSearchTerm(checkedRadio.value).toLowerCase()
          const curLabel = cleanSearchTerm(checkedRadio.closest('label, .vf-label, .option-card, tr, td, div')?.textContent || '').toLowerCase()
          return valCur === expectedVal || curLabel.includes(expectedVal) || expectedVal.includes(valCur)
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
  policy: ExecutionPolicy = createExecutionPolicy({ engine: 'smart', autoAdvance: allowAdvance }),
): Promise<ExecutionResult> {
  const regularActions = plan.actions.filter((a) => a.t !== 'adv')
  const advanceActions = plan.actions.filter((a) => a.t === 'adv')

  let appliedCount = 0
  const failed: string[] = []
  const actionErrors = new Map<DeclarativeAction, string>()

  const isQuestion = plan.pageType === 'question'

  const chkActions = regularActions.filter((a) => a.t === 'chk' || (a.t === 'clk' && (a as any).c !== undefined))

  // 1. PRIMEIRA PASSAGEM: Execução declarativa principal
  for (const action of regularActions) {
    try {
      await executeDeclarativeAction(action, attempt, policy)
      appliedCount++
    } catch (err) {
      actionErrors.set(action, err instanceof Error ? err.message : String(err))
      console.warn('[EasyQuiz] Ação declarativa primária falhou com segurança:', action, err)
    }
    // Pausa inteligente entre ações — 35ms é o ideal para dispatch síncrono e microtasks dos frameworks (React/Vue)
    await new Promise((resolve) => setTimeout(resolve, action.t === 'drag' ? 180 : 35))
  }

  // RECONCILIAÇÃO DETERMINÍSTICA DE MULTI-SELEÇÃO:
  // Executa estritamente quando o modo for 'escolha_multipla'.
  // Em 'escolha_unica', rádios nativos já cuidam da alternância automática e reconciliação causaria desmarcação indevida!
  if (isQuestion && plan.mode === 'escolha_multipla' && chkActions.length > 0) {
    let scopeRoot: HTMLElement = document.body
    try { scopeRoot = findActiveScope() || document.body } catch {}

    const allScopeCheckboxes = Array.from(
      scopeRoot.querySelectorAll('input[type="checkbox"], [role="checkbox"]'),
    ).filter((e) => isVisible(e as HTMLElement) && !isInsideEasyQuiz(e as HTMLElement)) as HTMLElement[]

    if (allScopeCheckboxes.length > 1) {
      // Constrói o set de checkboxes que DEVEM estar marcados (c: true)
      const targetedCheckboxes = new Set<HTMLElement>()
      for (const act of chkActions) {
        const isTrue = act.t === 'chk' ? Boolean(act.c) : Boolean((act as any).c ?? true)
        const actId = 'id' in act && typeof (act as any).id === 'string' ? (act as any).id : ''
        if (isTrue && actId) {
          const el = findElementExt(actId, (act as any).v)
          if (el) {
            targetedCheckboxes.add(el)
            const inner = el.querySelector('input[type="checkbox"]') as HTMLElement | null
            if (inner) targetedCheckboxes.add(inner)
            const parentCard = el.closest('.option-card, label, [role="checkbox"], tr, li, [class*="option" i]') as HTMLElement | null
            if (parentCard) {
              targetedCheckboxes.add(parentCard)
              parentCard.querySelectorAll('input[type="checkbox"]').forEach((inp) => targetedCheckboxes.add(inp as HTMLElement))
            }
          }
        }
      }

      function isAssociated(a: HTMLElement, b: HTMLElement): boolean {
        if (a === b) return true
        if (a.contains(b) || b.contains(a)) return true
        const cardA = a.closest('.option-card, label, [role="checkbox"], [role="option"], tr, li, [class*="option" i]')
        const cardB = b.closest('.option-card, label, [role="checkbox"], [role="option"], tr, li, [class*="option" i]')
        if (cardA && cardB && cardA === cardB) return true
        const forA = a.getAttribute('for') || (a as HTMLInputElement).id
        const forB = b.getAttribute('for') || (b as HTMLInputElement).id
        if (forA && forB && forA === forB) return true
        return false
      }

      // Desmarca somente se TODOS os alvos prescritos foram devidamente localizados
      // e o checkbox comprovadamente NÃO tem nenhum vínculo com as opções corretas da IA
      if (targetedCheckboxes.size >= chkActions.length && targetedCheckboxes.size > 0) {
        const targetList = Array.from(targetedCheckboxes)
        for (const chk of allScopeCheckboxes) {
          const isTargeted = targetList.some((t) => isAssociated(t, chk))
          if (!isTargeted) {
            const isCurrentlyChecked =
              (chk instanceof HTMLInputElement && chk.checked) ||
              chk.getAttribute('aria-checked') === 'true' ||
              chk.closest('.option-card, label')?.classList.contains('selected')
            if (isCurrentlyChecked) {
              setCheckedState(chk, false)
            }
          }
        }
      }
    }
  }

  // Aguarda o framework processar todas as ações antes da verificação
  // 100ms: suficiente para React setState + re-render + commit no DOM (1-2 frames = 16-32ms)
  await new Promise((resolve) => setTimeout(resolve, regularActions.length > 0 ? 100 : 25))
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
      assertActionAllowed(action, policy)
      await executeAlternativeActionPath(action)
    } catch (err) {
      actionErrors.set(action, err instanceof Error ? err.message : String(err))
      console.warn('[EasyQuiz Auto-Cura] Rota alternativa falhou:', err)
    }

    await new Promise((r) => setTimeout(r, 250))
    if (verifyActionApplied(action)) {
      console.log(`[EasyQuiz Auto-Cura] ✓ Ação recuperada com sucesso pela rota de contingência!`)
      verifiedCount++
      if (actionErrors.has(action)) {
        actionErrors.delete(action)
        appliedCount++
      }
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
        } catch (err) {
          actionErrors.set(action, err instanceof Error ? err.message : String(err))
        }
      }
    }
    await new Promise((r) => setTimeout(r, 200))

    // Recalcula contagem real verificada após passagem 3
    verifiedCount = 0
    for (const action of regularActions) {
      if (verifyActionApplied(action)) {
        verifiedCount++
        if (actionErrors.has(action)) {
          actionErrors.delete(action)
          appliedCount++
        }
      }
    }
  }

  // Em questões, cada ação precisa ter evidência no DOM antes de qualquer avanço.
  for (const action of regularActions) {
    if (!verifyActionApplied(action)) {
      failed.push(action.t === 'drag' ? `${action.from} -> ${action.to}` : 'id' in action ? action.id : action.t)
    }
  }

  // Se a questão requer respostas mas a IA não prescreveu nenhuma ação regular
  if (isQuestion && regularActions.length === 0) {
    failed.push('nenhuma ação de resposta prescrita')
  }

  const reports: ActionExecutionReport[] = regularActions.map((action, index) => {
    const target = action.t === 'drag' ? `${action.from} -> ${action.to}` : action.t === 'js' ? '$eq' : action.id || action.t
    const located = action.t === 'js'
      ? true
      : action.t === 'drag'
        ? Boolean(findDragTarget(action.from, 'source') && findDragTarget(action.to, 'destination'))
        : Boolean(findElementExt(action.id || '') || findElementExt(cleanSearchTerm(action.id || '')))
    const verified = verifyActionApplied(action)
    return {
      index,
      action,
      target,
      located,
      applied: !actionErrors.has(action),
      verified,
      strategy: action.t === 'drag' ? 'drag-adaptive' : action.t === 'js' ? 'javascript' : 'declarative-dom',
      evidence: verified ? 'estado do controle confirmado no DOM' : 'nenhuma evidência suficiente após as tentativas',
      ...(actionErrors.has(action) ? { error: actionErrors.get(action) } : {}),
    }
  })
  const success =
    !isQuestion
      ? true
      : regularActions.length > 0 && failed.length === 0 && (verifiedCount === regularActions.length || (appliedCount === regularActions.length && verifiedCount > 0))

  let advanced = false
  let navigationVerified = false
  let navigationEvidence = 'Nenhuma ação de navegação solicitada.'

  // Decide se deve tentar avançar:
  // - Sucesso total: todas as ações verificadas
  // - Sucesso parcial: a maioria foi aplicada (pelo menos 1 ação regular bem-sucedida)
  //   Não faz sentido dizer "avançando" e não avançar — o usuário espera progredir
  const partialSuccess = appliedCount > 0 && appliedCount >= regularActions.length / 2

  if (allowAdvance && (success || !isQuestion || partialSuccess)) {
    // Aguarda o framework registrar o input/seleção antes de tentar avançar
    await new Promise((resolve) => setTimeout(resolve, regularActions.length > 0 ? 120 : 40))

    let checkWasClicked = false
    // 1. Em questões com etapa intermediária de checagem ("Verificar", "Check", "Conferir", "Responder")
    if (plan.pageType !== 'info') {
      const checkBtn = findCheckButton()
      if (checkBtn && isVisible(checkBtn)) {
        await waitForEnabled(checkBtn, 1200)
        simulatePointerClick(checkBtn)
        checkWasClicked = true
        // Aguarda transição imediata do quiz
        await new Promise((resolve) => setTimeout(resolve, 350))
      }
    }

    // 2. Acionamento do botão de avanço final ("Continuar", "Próxima tarefa", "Avançar", "Próxima pergunta", "Next")
    const navigationBefore = getNavigationSignature()
    const preferredId = advanceActions.length > 0 ? advanceActions[0].id : undefined
    let navBtn = findBestNavigationButton(preferredId)

    // Se ainda não encontrou e houve clique intermediário, aguarda a transição de texto do botão
    if (!navBtn && checkWasClicked) {
      await new Promise((resolve) => setTimeout(resolve, 250))
      navBtn = findBestNavigationButton(preferredId)
    }

    if (navBtn) {
      await waitForEnabled(navBtn, 1500)
      const heuristic = preferredId || navBtn.textContent?.trim() || ''
      if (heuristic) {
        saveDomainCache(window.location.hostname, { advanceSelector: heuristic })
      }
      simulatePointerClick(navBtn)
      const navigation = await waitForNavigationChange(navigationBefore, 1800)
      navigationVerified = navigation.changed
      navigationEvidence = navigation.evidence
      advanced = navigation.changed || checkWasClicked
      if (!navigation.changed && !checkWasClicked) {
        console.warn('[EasyQuiz] O botão de avanço foi acionado, mas a navegação ainda não concluiu.')
      }
    } else if (checkWasClicked) {
      // Se clicou no botão de checagem e não há outro botão, o envio já foi consumado
      advanced = true
      navigationVerified = true
      navigationEvidence = 'Resposta confirmada via botão de verificação/envio.'
    } else {
      console.warn('[EasyQuiz] Nenhum botão de avanço encontrado na página.')
    }
  }

  return {
    applied: appliedCount,
    verified: verifiedCount,
    success,
    advanced,
    failed,
    reports,
    navigationVerified,
    navigationEvidence,
  }
}

// ---- INTERCEPTADOR INTELIGENTE DE CLIQUES EM OPÇÕES ----
export function setupSmartOptionInterceptors(): void {
  // Mantido como no-op para preservar a propagação natural de eventos nos frameworks modernos
  // (React, Vue, Angular, Svelte) e permitir a marcação e multi-seleção livre de checkboxes.
}

