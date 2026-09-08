import type { CapturedContext, ControlDescriptor } from '../core/types'
import {
  cleanText,
  ANTI_NAVIGATION_PATTERN,
  CONTROL_SELECTOR,
  describeControl,
  isNavigationControl,
  isUtilityOrGamificationControl,
  isVisible,
} from './controls'


const CANDIDATE_SELECTORS = [
  // Khan Academy & Perseus
  '[data-test-id*="exercise" i]',
  '[data-testid*="exercise" i]',
  '.perseus-renderer',
  '.framework-perseus',
  // Google Forms
  '.Qr7Oae',
  '[data-item-id]',
  '.freebirdFormviewerViewItemsItemItem',
  // Moodle & AVA
  '.que',
  '.question-holder',
  // Canvas & Blackboard
  '.quiz-question',
  '.question_holder',
  '.display_question',
  // Kahoot & Quizizz
  '[data-functional-selector*="question"]',
  '.question-container',
  // Wayground/Quizizz classification
  '[class*="classification-layout" i]',
  '[class*="quiz-container" i]',
  '[data-cy="quiz-container"]',
  // Genéricos e semânticos de bloco completo
  '[data-question-id]',
  '[data-testid*="question" i]',
  '[class*="question-container" i]',
  '[class*="question" i]',
  '[class*="pergunta" i]',
  '[class*="categoriz" i]',
  'article',
  'form',
  'section',
  'main',
].join(',')

function scoreCandidate(element: HTMLElement): number {
  if (!isVisible(element)) return -Infinity

  const rect = element.getBoundingClientRect()
  const controls = Array.from(element.querySelectorAll(CONTROL_SELECTOR)).filter(isVisible)
  const textLength = cleanText(element.innerText || element.textContent || '', 4000).length

  // Não pontua se texto for vazio ou se não tiver controles nem texto explicativo
  if (textLength < 10) return -Infinity
  if (!controls.length && textLength < 60) return -Infinity

  const viewportArea = Math.max(1, window.innerWidth * window.innerHeight)
  const elementArea = Math.max(1, rect.width * rect.height)
  const areaRatio = Math.min(1, elementArea / viewportArea)

  const centerY = rect.top + rect.height / 2
  const centerDistance = Math.abs(centerY - window.innerHeight / 2) / Math.max(1, window.innerHeight)

  // Bônus para elementos que agregam tanto o enunciado (texto > 40 chars) quanto controles
  const hasSubstantialText = textLength > 40 ? 35 : 0

  // Se o elemento estiver visível no viewport atual, ganha bônus
  const inViewportBonus = rect.top >= 0 && rect.bottom <= window.innerHeight ? 25 : 0

  return (
    controls.length * 15 +
    Math.min(60, textLength / 20) +
    hasSubstantialText +
    inViewportBonus -
    areaRatio * 20 -
    centerDistance * 10
  )
}

export function findTrueQuestionContainer(element: HTMLElement): HTMLElement {
  let curr = element

  // Se o próprio elemento já é um container de questão válido (article, card, etc. que não seja main ou body)
  if (
    curr.matches?.(
      'article, [data-test-id*="exercise" i], [data-testid*="exercise" i], .perseus-renderer, .framework-perseus, [class*="question-container" i], .que'
    ) &&
    curr.tagName.toLowerCase() !== 'main' &&
    curr.tagName.toLowerCase() !== 'body'
  ) {
    return curr
  }

  while (curr.parentElement && curr.parentElement !== document.body && curr.parentElement !== document.documentElement) {
    const parent = curr.parentElement
    const parentTag = parent.tagName.toLowerCase()
    if (['header', 'footer', 'nav', 'aside'].includes(parentTag)) break

    // Se o pai é um seletor conhecido de container de questão específico
    if (
      parent.matches?.(
        'article, [data-test-id*="exercise" i], [data-testid*="exercise" i], .perseus-renderer, .framework-perseus, [class*="question-container" i], .que'
      ) &&
      parentTag !== 'main' &&
      parentTag !== 'body'
    ) {
      curr = parent
      break
    }

    const currText = cleanText(curr.innerText || curr.textContent || '', 10000)
    const parentText = cleanText(parent.innerText || parent.textContent || '', 10000)
    const currControlsCount = curr.querySelectorAll(CONTROL_SELECTOR).length
    const parentControlsCount = parent.querySelectorAll(CONTROL_SELECTOR).length

    // Se o elemento atual tem texto curto (< 150 chars) e o pai agrega o enunciado sem trazer outros blocos desconexos
    if (currText.length < 150 && parentText.length > currText.length && parentControlsCount <= currControlsCount + 4 && parentTag !== 'main' && parentTag !== 'body') {
      curr = parent
      continue
    }

    break
  }

  return curr
}

export function expandToGeneralSelection(scope: HTMLElement): HTMLElement {
  let curr = scope
  // Sobe procurando o container maior do exercício, artigo, formulário ou main
  const candidate = curr.closest(
    'main, [role="main"], article, form, [data-test-id*="exercise" i], [data-testid*="exercise" i], .framework-perseus, section'
  ) as HTMLElement | null

  if (candidate && candidate !== document.body && isVisible(candidate)) {
    return candidate
  }

  // Se não achar por seletor semântico, sobe até 3 níveis na árvore DOM
  let count = 0
  while (curr.parentElement && curr.parentElement !== document.body && count < 3) {
    curr = curr.parentElement
    count++
  }

  return curr || document.body
}

export function findActiveScope(): HTMLElement {
  // 0. PRIORIDADE MÁXIMA: widget de classificação (Wayground/Quizizz) — escopo é o container completo
  const classificationWidget = document.querySelector(
    '[class*="classification-layout" i], [class*="quiz-container" i][class*="classification" i]'
  ) as HTMLElement | null
  if (classificationWidget && isVisible(classificationWidget)) {
    return classificationWidget
  }

  // 1. Verificar se o elemento com foco do usuário está dentro de uma questão candidata
  const active = document.activeElement as HTMLElement | null
  if (active && active !== document.body) {
    const focusedScope = active.closest(CANDIDATE_SELECTORS) as HTMLElement | null
    if (focusedScope && scoreCandidate(focusedScope) > 0) {
      return findTrueQuestionContainer(focusedScope)
    }
  }

  // 2. Pontuar todos os candidatos na página
  const candidates = Array.from(document.querySelectorAll(CANDIDATE_SELECTORS)) as HTMLElement[]
  const ranked = candidates
    .map((element) => ({ element, score: scoreCandidate(element) }))
    .filter((item) => Number.isFinite(item.score))
    .sort((a, b) => b.score - a.score)

  // Dá preferência a containers de questão específicos (cards, articles, sections, que) sobre wrappers globais (main/body)
  const specific = ranked.find((item) => {
    const tag = item.element.tagName.toLowerCase()
    return tag !== 'main' && tag !== 'body' && item.score > 0
  })

  if (specific) {
    return findTrueQuestionContainer(specific.element)
  }

  if (ranked.length > 0 && ranked[0].score > 0) {
    return findTrueQuestionContainer(ranked[0].element)
  }

  // 3. Fallback: procurar o formulário principal ou main
  const mainForm = document.querySelector('form, main, [role="main"]') as HTMLElement | null
  if (mainForm && isVisible(mainForm)) {
    return mainForm
  }

  return document.body
}

export function sanitizeHtml(scope: HTMLElement): string {
  const clone = scope.cloneNode(true) as HTMLElement

  // Remover scripts, estilos, mídias brutas e SVGs gigantes
  clone
    .querySelectorAll('script, style, iframe, object, embed, svg, canvas, noscript, audio, video')
    .forEach((el) => el.remove())

  // Manter atributos relevantes para acessibilidade, identificação e manipulação por JS
  const keep = [
    'type',
    'name',
    'value',
    'role',
    'aria-label',
    'aria-labelledby',
    'aria-checked',
    'aria-required',
    'required',
    'disabled',
    'data-easyquiz-id',
    'draggable',
    'class',
    'id',
    'data-widget-type',
    'data-role',
    'data-category',
    'data-testid',
  ]

  clone.querySelectorAll('*').forEach((element) => {
    for (const attr of Array.from(element.attributes)) {
      if (!keep.includes(attr.name)) {
        element.removeAttribute(attr.name)
      }
    }
  })

  return clone.outerHTML.replace(/\s+/g, ' ').slice(0, 20_000)
}

export function extractAnswerControls(scope: HTMLElement): ControlDescriptor[] {
  const allElements = Array.from(scope.querySelectorAll(CONTROL_SELECTOR)) as HTMLElement[]
  const handledInputs = new Set<HTMLElement>()
  const selectedElements: HTMLElement[] = []

  // 1ª passada: inputs nativos e selects
  for (const el of allElements) {
    if (!isVisible(el) || isNavigationControl(el) || isUtilityOrGamificationControl(el)) continue
    // Descarta botões de retrocesso ("Anterior", "Voltar", etc.) que não são barrados por isNavigationControl
    const elText = ((el as HTMLInputElement).value || el.textContent || '').trim()
    if (ANTI_NAVIGATION_PATTERN.test(elText)) continue
    const tag = el.tagName.toLowerCase()

    if (['input', 'textarea', 'select'].includes(tag)) {
      handledInputs.add(el)
      selectedElements.push(el)
    }
  }

  // 2ª passada: cards, labels e botões que representam opções customizadas (sem input interno já coletado)
  for (const el of allElements) {
    if (!isVisible(el) || isNavigationControl(el) || isUtilityOrGamificationControl(el)) continue
    // Descarta botões de retrocesso que escapam do isNavigationControl
    const elText2 = ((el as HTMLInputElement).value || el.textContent || '').trim()
    if (ANTI_NAVIGATION_PATTERN.test(elText2)) continue
    const tag = el.tagName.toLowerCase()

    if (['input', 'textarea', 'select'].includes(tag)) continue

    const innerInput = el.querySelector('input, textarea, select') as HTMLElement | null
    if (innerInput && handledInputs.has(innerInput)) continue

    if (el.hasAttribute('for')) {
      const forId = el.getAttribute('for')
      const targetInput = forId ? (el.ownerDocument.getElementById(forId) as HTMLElement | null) : null
      if (targetInput && handledInputs.has(targetInput)) continue
    }

    if (tag === 'a') {
      const role = el.getAttribute('role')
      const classStr = el.getAttribute('class') || ''
      const testId = el.getAttribute('data-testid') || ''
      const isDraggable =
        el.getAttribute('draggable') === 'true' ||
        el.classList.contains('perseus-drag-item') ||
        el.classList.contains('sortable-item') ||
        classStr.includes('cursor-grab') ||
        Boolean(el.getAttribute('aria-grabbed')) ||
        /drag|card|option|item/i.test(testId) ||
        /drag|card-item|sortable/i.test(classStr)
      const isOption =
        role === 'button' ||
        role === 'radio' ||
        role === 'checkbox' ||
        role === 'option' ||
        isDraggable ||
        el.closest('[class*="choice" i], [class*="option" i], [class*="answer" i], [data-testid*="option" i]')
      if (!isOption) continue
    }

    selectedElements.push(el)
  }

  // 3ª passada (Fallback): widgets de classificação custom (Wayground, Quizizz classification)
  // Ativa quando: (a) nenhum controle encontrado, OU (b) só utilitários como read-aloud foram coletados
  // Usa document.body para não perder cards fora do escopo estreito
  const onlyUtilityButtons = selectedElements.length > 0 && selectedElements.every(el =>
    isUtilityOrGamificationControl(el) ||
    /read-?aloud|audio/i.test(el.getAttribute('data-testid') || el.getAttribute('aria-label') || '')
  )
  const classRoot = (
    document.body.querySelector('[class*="classification-layout" i]') ||
    document.body.querySelector('[class*="classification" i]') ||
    scope
  ) as HTMLElement

  const hasClassificationDOM =
    document.body.querySelector('[class*="classification" i]') !== null ||
    scope.querySelector('[class*="classification" i]') !== null ||
    scope.querySelector('[data-cy*="quiz" i]') !== null ||
    scope.querySelector('[class*="draggable-item" i]') !== null ||
    scope.querySelector('[class*="drag-item" i]') !== null ||
    scope.querySelector('[class*="sortable-card" i]') !== null ||
    scope.matches?.('[class*="classification" i]')

  if ((selectedElements.length === 0 || onlyUtilityButtons) && hasClassificationDOM) {
    if (onlyUtilityButtons) selectedElements.length = 0 // descarta falsos positivos

    // PRIORIDADE 1: cards dragáveis com ID nativo (Wayground: cursor-grab + id hex)
    const cursorGrabCards = Array.from(
      classRoot.querySelectorAll('[class*="cursor-grab"][id], [draggable="true"][id], .dnd-card[id]')
    ) as HTMLElement[]
    if (cursorGrabCards.length > 0) {
      for (const card of cursorGrabCards) {
        if (!isVisible(card) || isUtilityOrGamificationControl(card)) continue
        selectedElements.push(card)
        if (selectedElements.length >= 50) break
      }
    } else {
      // PRIORIDADE 2 (fallback): nós folha com texto (classificação por clique)
      const leafCandidates = Array.from(
        classRoot.querySelectorAll('button, div[class], span[class], p, li')
      ) as HTMLElement[]
      for (const el of leafCandidates) {
        if (!isVisible(el) || isNavigationControl(el) || isUtilityOrGamificationControl(el)) continue
        if (ANTI_NAVIGATION_PATTERN.test((el.textContent || '').trim())) continue
        const txt = (el.textContent || '').trim()
        if (txt.length < 2 || txt.length > 300) continue
        const hasComplexChildren = Array.from(el.children).some(
          (c) => (c as HTMLElement).className && (c as HTMLElement).textContent?.trim()
        )
        if (!hasComplexChildren) selectedElements.push(el)
        if (selectedElements.length >= 50) break
      }
    }
  }

  return selectedElements
    .slice(0, 100)
    .map((el) => describeControl(el, 'answer'))
}

export function extractNavigationControls(scope: HTMLElement): ControlDescriptor[] {
  const roots = [scope, scope.parentElement, scope.parentElement?.parentElement, document.body].filter(
    Boolean,
  ) as HTMLElement[]

  const seen = new Set<HTMLElement>()
  const controls: ControlDescriptor[] = []

  for (const root of roots) {
    for (const el of Array.from(root.querySelectorAll(CONTROL_SELECTOR)) as HTMLElement[]) {
      if (seen.has(el) || !isVisible(el) || !isNavigationControl(el) || isUtilityOrGamificationControl(el)) continue
      seen.add(el)
      controls.push(describeControl(el, 'navigation'))
      if (controls.length >= 10) return controls
    }
  }

  return controls
}

export function captureCurrentContext(expanded = false): CapturedContext | null {
  let scope = findActiveScope()
  scope = findTrueQuestionContainer(scope)

  if (expanded) {
    scope = expandToGeneralSelection(scope)
  }

  let answers = extractAnswerControls(scope)
  let navs = extractNavigationControls(scope)

  // SE O ESCOPO LOCAL NÃO ENCONTROU CONTROLES DE RESPOSTA, MAS ELES EXISTEM NO DOCUMENTO:
  if (answers.length === 0) {
    const globalAnswers = extractAnswerControls(document.body)
    if (globalAnswers.length > 0) {
      scope = expandToGeneralSelection(scope)
      answers = extractAnswerControls(scope)
      if (answers.length === 0) {
        answers = globalAnswers
        scope = (document.querySelector('main, article, form, [role="main"]') || document.body) as HTMLElement
      }
    }
  }

  // Se não achou navegação no escopo, procura globalmente na página
  if (navs.length === 0) {
    navs = extractNavigationControls(document.body)
  }

  // Captura de texto com limite inteligente para páginas extensas
  const rawText = scope.innerText && scope.innerText.trim().length > 0 ? scope.innerText : scope.textContent || ''
  const questionText = rawText.length > 40_000
    ? cleanText(rawText.slice(0, 8000), 8000) + '\n[...conteúdo extenso truncado...]\n' + cleanText(rawText.slice(-2000), 2000)
    : cleanText(rawText, 16_000)
  const controls = [...answers, ...navs].slice(0, 120)

  // Se tem texto explicativo relevante (> 30 chars), mesmo sem controles de resposta direta,
  // é uma página de leitura/contexto/artigo válida!
  if (!questionText || (controls.length === 0 && questionText.length < 30)) {
    const fullBodyText = cleanText(document.body.innerText || document.body.textContent || '', 16_000)
    if (fullBodyText.length >= 30) {
      return captureFullPageText()
    }
    return null
  }

  return {
    sourceUrl: window.location.href.slice(0, 2_000),
    pageTitle: document.title.slice(0, 500) || 'Página de Questão',
    questionText,
    htmlSnippet: sanitizeHtml(scope),
    controls,
    scope,
  }
}

export function captureFullPageText(): CapturedContext {
  const rawText = document.body.innerText || document.body.textContent || document.documentElement.textContent || ''
  const questionText = cleanText(rawText, 16_000)
  const answers = extractAnswerControls(document.body)
  const navs = extractNavigationControls(document.body)
  const controls = [...answers, ...navs].slice(0, 120)
  const mainEl = (document.querySelector('main, article, form, [role="main"], [data-test-id*="content" i], [class*="content" i]') ||
    document.body) as HTMLElement

  return {
    sourceUrl: window.location.href.slice(0, 2_000),
    pageTitle: document.title.slice(0, 500) || 'Página de Questão',
    questionText,
    htmlSnippet: sanitizeHtml(mainEl).slice(0, 15_000),
    controls,
    scope: mainEl,
  }
}

export function createContextSignature(context: CapturedContext): string {
  const controls = context.controls
    .map((control) => `${control.role}:${control.id}:${control.type}:${control.value}:${control.disabled}`)
    .join('|')
  return [
    window.location.href,
    context.pageTitle,
    context.questionText.slice(0, 500),
    controls,
  ].join('::')
}

/**
 * Assinatura baseada apenas no CONTEÚDO da questão (texto + estrutura de controles).
 * NÃO inclui valores preenchidos ou estado disabled.
 * Usada para detectar mudanças reais de página vs mutações DOM de execução de ações.
 */
export function createContentSignature(context: CapturedContext): string {
  const controlStructure = context.controls
    .map((c) => `${c.role}:${c.id}:${c.type}`)
    .join('|')
  return [
    window.location.href,
    context.pageTitle,
    context.questionText.slice(0, 400),
    controlStructure,
  ].join('::')
}
