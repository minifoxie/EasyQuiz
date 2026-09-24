import type { CapturedContext, ControlDescriptor } from '../core/types'
import {
  cleanText,
  ANTI_NAVIGATION_PATTERN,
  CONTROL_SELECTOR,
  describeControl,
  isInsideEasyQuiz,
  isKhanAcademyPage,
  isKhanSidebarElement,
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
  '[role="group"]',
  'article',
  'form',
  'section',
  'main',
].join(',')

function scoreCandidate(element: HTMLElement): number {
  if (!isVisible(element)) return -Infinity

  // Khan Academy: penalizar severamente elementos na sidebar/lista de tarefas
  if (isKhanSidebarElement(element)) return -Infinity

  const rect = element.getBoundingClientRect()
  const controls = Array.from(element.querySelectorAll(CONTROL_SELECTOR)).filter(
    (el) => isVisible(el) && !isKhanSidebarElement(el)
  )
  const textLength = cleanText(element.innerText || element.textContent || '', 4000).length

  // Não pontua se texto for vazio ou se não tiver controles nem texto explicativo
  if (textLength < 10) return -Infinity
  if (!controls.length && textLength < 60) return -Infinity

  const viewportArea = Math.max(1, window.innerWidth * window.innerHeight)
  const elementArea = Math.max(1, rect.width * rect.height)
  const areaRatio = Math.min(1, elementArea / viewportArea)

  const centerY = rect.top + rect.height / 2
  const centerX = rect.left + rect.width / 2
  const centerDistanceY = Math.abs(centerY - window.innerHeight / 2) / Math.max(1, window.innerHeight)
  const centerDistanceX = Math.abs(centerX - window.innerWidth / 2) / Math.max(1, window.innerWidth)

  // Bônus para elementos que agregam tanto o enunciado (texto > 40 chars) quanto controles
  const hasSubstantialText = textLength > 40 ? 35 : 0

  // Se o elemento estiver visível no viewport atual, ganha bônus
  const inViewportBonus = rect.top >= 0 && rect.bottom <= window.innerHeight ? 25 : 0

  // Penalidade severa para elementos que estão muito na lateral (prováveis sidebars)
  const sidebarPenalty = centerDistanceX > 0.35 ? 150 : 0

  // Penalidade para elementos que são praticamente a página toda
  const massivePenalty = areaRatio > 0.85 ? 100 : 0

  // Bônus para Perseus renderer (container canônico de questão no Khan Academy)
  const perseusBonus = element.matches?.('.perseus-renderer, .framework-perseus, [data-test-id*="exercise" i]') ? 50 : 0

  return (
    // Limita pontuação de controles para não favorecer o <body> só porque ele engloba todos os controles da página
    Math.min(10, controls.length) * 15 +
    Math.min(60, textLength / 20) +
    hasSubstantialText +
    inViewportBonus +
    perseusBonus -
    areaRatio * 30 -
    centerDistanceY * 20 -
    sidebarPenalty -
    massivePenalty
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

/**
 * Extrai texto com consciência matemática: converte KaTeX/MathML para LaTeX legível.
 * Usado em vez de `innerText` puro para preservar a formatação de fórmulas.
 */
export function extractMathAwareText(element: HTMLElement, maxLen = 16_000): string {
  const clone = element.cloneNode(true) as HTMLElement

  // Isolamento Cirúrgico: Remover barras laterais, navegação e drawers do Khan Academy e similares
  clone.querySelectorAll('nav, aside, [class*="sidebar" i], [class*="lesson" i], [class*="_ka-drawer_" i], [class*="navigation" i], [role="navigation"]').forEach(el => el.remove())

  // 1. KaTeX: substituir <span class="katex"> pelo LaTeX source da <annotation>
  const katexEls = Array.from(clone.querySelectorAll('.katex'))
  for (const katex of katexEls) {
    const annotation = katex.querySelector('annotation[encoding="application/x-tex"]')
    if (annotation && annotation.textContent) {
      const latexText = ` $${annotation.textContent.trim()}$ `
      const replacement = document.createTextNode(latexText)
      katex.replaceWith(replacement)
    }
  }

  // 2. MathML <math>: linearizar frações, raízes, potências
  const mathEls = Array.from(clone.querySelectorAll('math'))
  for (const math of mathEls) {
    try {
      const linearized = linearizeMathML(math)
      if (linearized) {
        const replacement = document.createTextNode(` ${linearized} `)
        math.replaceWith(replacement)
      }
    } catch {}
  }

  // 3. MathQuill: extrair texto linearizado
  const mqEls = Array.from(clone.querySelectorAll('.mq-root-block, .mq-editable-field'))
  for (const mq of mqEls) {
    const textContent = mq.textContent?.trim()
    if (textContent) {
      mq.textContent = ` [math: ${textContent}] `
    }
  }

  // 4. <sup> e <sub> → notação de potência/índice
  const sups = Array.from(clone.querySelectorAll('sup'))
  for (const sup of sups) {
    sup.textContent = `^{${sup.textContent?.trim() || ''}}`
  }
  const subs = Array.from(clone.querySelectorAll('sub'))
  for (const sub of subs) {
    sub.textContent = `_{${sub.textContent?.trim() || ''}}`
  }

  // 5. Extração de Dados de Acessibilidade (Screen Reader) para Gráficos
  let srHiddenData = ''
  clone.querySelectorAll('.sr-only, .visuallyhidden, .visually-hidden, [aria-label], [aria-describedby]').forEach(el => {
    // Tenta capturar rótulos ocultos
    const label = el.getAttribute('aria-label') || el.getAttribute('aria-describedby') || ''
    const txt = el.textContent?.trim() || ''
    
    // Se não for um elemento de interface inútil
    if (!el.closest('button, input, a')) {
      if (label && !srHiddenData.includes(label)) {
        srHiddenData += `\n[Dado do Gráfico/Imagem: ${label}]`
      }
      if (txt && !label && txt.length > 5 && !srHiddenData.includes(txt)) {
        srHiddenData += `\n[Tabela Oculta do Gráfico: ${txt}]`
      }
    }
  })

  const rawText = clone.innerText && clone.innerText.trim().length > 0 ? clone.innerText : clone.textContent || ''
  
  // Mescla o texto visível normal com os dados cruciais de acessibilidade que os leitores de tela leem
  const finalText = rawText + (srHiddenData ? `\n\n--- DADOS OCULTOS DA QUESTÃO ---\n${srHiddenData}` : '')
  
  return cleanText(finalText, maxLen)
}

/** Lineariza um elemento MathML para texto legível */
function linearizeMathML(math: Element): string {
  const parts: string[] = []
  function walk(el: Element): void {
    const tag = el.tagName?.toLowerCase()
    if (tag === 'mfrac') {
      const children = Array.from(el.children)
      const num = children[0]?.textContent?.trim() || '?'
      const den = children[1]?.textContent?.trim() || '?'
      parts.push(`(${num}/${den})`)
      return
    }
    if (tag === 'msqrt') {
      parts.push(`sqrt(${el.textContent?.trim() || '?'})`)
      return
    }
    if (tag === 'msup') {
      const children = Array.from(el.children)
      const base = children[0]?.textContent?.trim() || '?'
      const exp = children[1]?.textContent?.trim() || '?'
      parts.push(`${base}^{${exp}}`)
      return
    }
    if (tag === 'msub') {
      const children = Array.from(el.children)
      const base = children[0]?.textContent?.trim() || '?'
      const sub = children[1]?.textContent?.trim() || '?'
      parts.push(`${base}_{${sub}}`)
      return
    }
    if (tag === 'mn' || tag === 'mi' || tag === 'mo' || tag === 'mtext') {
      parts.push(el.textContent?.trim() || '')
      return
    }
    // Recursivo para containers como <mrow>, <mstyle>, etc.
    for (const child of Array.from(el.children)) {
      walk(child)
    }
  }
  walk(math)
  return parts.join(' ')
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

// ---- CACHE DE LAYOUT INTELIGENTE ----
// Memoriza o seletor do escopo que funcionou no último scan para evitar re-scan redundante.
// Invalida automaticamente se o seletor cached não pontua mais (troca de página/layout).
const _scopeCache = new Map<string, { selector: string; timestamp: number }>()
const SCOPE_CACHE_TTL = 30_000 // 30s — depois disso, refaz o scan completo
const MIN_SCOPE_SCORE = 8 // Escopos fracos (ex: main, body vazio) não são cacheados

function getCachedScopeSelector(): string | null {
  const key = window.location.href // Cache atrelado à URL exata (invalida ao mudar de questão em SPAs se a URL mudar)
  const cached = _scopeCache.get(key)
  if (!cached) return null
  if (Date.now() - cached.timestamp > SCOPE_CACHE_TTL) {
    _scopeCache.delete(key)
    return null
  }
  return cached.selector
}

function setCachedScopeSelector(element: HTMLElement): void {
  try {
    if (scoreCandidate(element) < MIN_SCOPE_SCORE) return

    // Constrói um seletor único para o elemento: tag + id + classes + easyquizId
    const tag = element.tagName.toLowerCase()
    const id = element.id ? `#${element.id}` : ''
    const eqId = element.dataset.easyquizId ? `[data-easyquiz-id="${element.dataset.easyquizId}"]` : ''
    const cls = Array.from(element.classList).slice(0, 3).map(c => `.${c}`).join('')
    const selector = `${tag}${id}${eqId}${cls}`
    
    // Nunca cacheia body ou html sem um identificador muito forte
    if (selector && selector !== 'body' && selector !== 'html') {
      _scopeCache.set(window.location.href, { selector, timestamp: Date.now() })
    }
  } catch {}
}

export function findActiveScope(): HTMLElement {
  // -1. CACHE: tenta o seletor memorizado do layout anterior (evita re-scan redundante)
  const cachedSelector = getCachedScopeSelector()
  if (cachedSelector) {
    try {
      const cached = document.querySelector(cachedSelector) as HTMLElement | null
      if (cached && isVisible(cached) && !isKhanSidebarElement(cached) && scoreCandidate(cached) >= MIN_SCOPE_SCORE) {
        return findTrueQuestionContainer(cached)
      }
    } catch {}
    // Cache inválido — limpa e segue para scan completo
    _scopeCache.delete(window.location.href)
  }

  // 0. PRIORIDADE MÁXIMA: widget de classificação (Wayground/Quizizz) — escopo é o container completo
  const classificationWidget = document.querySelector(
    '[class*="classification-layout" i], [class*="quiz-container" i][class*="classification" i]'
  ) as HTMLElement | null
  if (classificationWidget && isVisible(classificationWidget)) {
    setCachedScopeSelector(classificationWidget)
    return classificationWidget
  }

  // 0.5 PRIORIDADE KHAN ACADEMY: buscar o Perseus renderer VISÍVEL e no VIEWPORT
  // O Khan Academy renderiza múltiplos exercícios no mesmo DOM (sidebar de cards),
  // mas apenas UM está ativo e visível. Este bloco garante que capturamos o correto.
  if (isKhanAcademyPage()) {
    const perseusRenderers = Array.from(
      document.querySelectorAll('.perseus-renderer, .framework-perseus')
    ) as HTMLElement[]
    // Filtrar: visível no viewport, com dimensões reais, e NÃO na sidebar
    const activeRenderers = perseusRenderers.filter((el) => {
      if (!isVisible(el) || isKhanSidebarElement(el)) return false
      const rect = el.getBoundingClientRect()
      // Deve estar pelo menos parcialmente no viewport e ter tamanho razoável
      return rect.width > 100 && rect.height > 50 && rect.bottom > 0 && rect.top < window.innerHeight
    })
    if (activeRenderers.length > 0) {
      // Prefere o maior renderer visível (o que contém a questão ativa)
      activeRenderers.sort((a, b) => {
        const rA = a.getBoundingClientRect()
        const rB = b.getBoundingClientRect()
        return (rB.width * rB.height) - (rA.width * rA.height)
      })
      const result = findTrueQuestionContainer(activeRenderers[0])
      setCachedScopeSelector(result)
      return result
    }
  }

  // 1. Verificar se o elemento com foco do usuário está dentro de uma questão candidata
  const active = document.activeElement as HTMLElement | null
  if (active && active !== document.body) {
    const focusedScope = active.closest(CANDIDATE_SELECTORS) as HTMLElement | null
    if (focusedScope && !isKhanSidebarElement(focusedScope) && scoreCandidate(focusedScope) > 0) {
      const result = findTrueQuestionContainer(focusedScope)
      setCachedScopeSelector(result)
      return result
    }
  }

  // 2. Pontuar todos os candidatos na página
  const candidates = Array.from(document.querySelectorAll(CANDIDATE_SELECTORS)) as HTMLElement[]
  const ranked = candidates
    .filter((el) => !isKhanSidebarElement(el)) // Excluir sidebar do Khan Academy
    .map((element) => ({ element, score: scoreCandidate(element) }))
    .filter((item) => Number.isFinite(item.score))
    .sort((a, b) => b.score - a.score)

  // Dá preferência a containers de questão específicos (cards, articles, sections, que) sobre wrappers globais (main/body)
  const specific = ranked.find((item) => {
    const tag = item.element.tagName.toLowerCase()
    return tag !== 'main' && tag !== 'body' && item.score > 0
  })

  if (specific) {
    const result = findTrueQuestionContainer(specific.element)
    setCachedScopeSelector(result)
    return result
  }

  if (ranked.length > 0 && ranked[0].score > 0) {
    const result = findTrueQuestionContainer(ranked[0].element)
    setCachedScopeSelector(result)
    return result
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
  const isKhan = isKhanAcademyPage()

  // 1ª passada: inputs nativos e selects
  for (const el of allElements) {
    if (!isVisible(el) || isNavigationControl(el) || isUtilityOrGamificationControl(el)) continue
    // Khan Academy: excluir controles que estão na sidebar/lista de tarefas
    if (isKhan && isKhanSidebarElement(el)) continue
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
    // Khan Academy: excluir controles da sidebar (2ª passada)
    if (isKhan && isKhanSidebarElement(el)) continue
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

  // 4ª passada: Wayground/Quizizz cursor-pointer option cards
  // Ativa quando nenhum controle real foi encontrado OU quando só elementos 'other' (enunciado/labels) foram coletados
  // Os cards de escolha do Wayground são <div class="cursor-pointer ... bg-ds-light-..."> com ID hexadecimal
  // e NÃO têm role="button", input interno, nem class "option/choice" — por isso escapam das passadas anteriores
  const hasRealInputs = selectedElements.some((el) =>
    ['input', 'select', 'textarea'].includes(el.tagName.toLowerCase()),
  )

  const onlyOtherType =
    !hasRealInputs &&
    selectedElements.length > 0 &&
    selectedElements.every((el) => {
      const tag = el.tagName.toLowerCase()
      if (['input', 'select', 'textarea', 'button'].includes(tag)) return false
      const txt = (el.textContent || '').trim()
      // 'other' sem ID real ou com texto muito curto = label/enunciado, não é opção de resposta
      return !el.id || txt.length < 10 || /^\d+\s*\/\s*\d+$/.test(txt) || /^question text/i.test(txt)
    })

  if (selectedElements.length === 0 || onlyOtherType) {
    if (onlyOtherType) selectedElements.length = 0 // descarta labels/enunciado
    // Wayground choice: [class*=cursor-pointer][id] com texto de opção (10-500 chars)
    const cursorPointerCards = Array.from(
      document.body.querySelectorAll('[class*="cursor-pointer"][id]')
    ) as HTMLElement[]
    if (cursorPointerCards.length > 0) {
      for (const card of cursorPointerCards) {
        if (!isVisible(card) || isInsideEasyQuiz(card)) continue
        if (isNavigationControl(card) || isUtilityOrGamificationControl(card)) continue
        if (ANTI_NAVIGATION_PATTERN.test((card.textContent || '').trim())) continue
        const txt = (card.textContent || '').trim()
        if (txt.length < 10 || txt.length > 500) continue // muito curto = progress/label; muito longo = container
        if (/^\d+\s*\/\s*\d+$/.test(txt)) continue // "4/10" é progresso, não opção
        selectedElements.push(card)
        if (selectedElements.length >= 20) break
      }
    }
  }

  // 5ª passada: Perseus / Khan Academy widgets especializados
  // Ativa quando nenhum controle real foi encontrado OU quando os controles encontrados são
  // apenas labels/textos sem inputs nativos — Perseus renderiza tudo como <div>s com React handlers
  if (selectedElements.length === 0 || (selectedElements.length > 0 && !hasRealInputs && !selectedElements.some(el =>
    el.getAttribute('role') === 'radio' || el.getAttribute('role') === 'checkbox' ||
    el.classList.contains('mq-editable-field') || el.closest('.perseus-widget-container')
  ))) {
    const perseusRoot = document.querySelector('.perseus-renderer, .framework-perseus') as HTMLElement | null
    const perseusScope = perseusRoot || scope

    // 5.1 MathQuill fields (expression input)
    const mqFields = Array.from(perseusScope.querySelectorAll('.mq-editable-field, .mq-root-block, [class*="expression-editor" i], [class*="math-input" i]')) as HTMLElement[]
    for (const mq of mqFields) {
      if (!isVisible(mq) || isInsideEasyQuiz(mq)) continue
      if (!selectedElements.includes(mq)) selectedElements.push(mq)
    }

    // 5.2 Perseus dropdowns (custom select with React portal)
    const perseusDropdowns = Array.from(perseusScope.querySelectorAll('[class*="perseus-dropdown" i], .perseus-widget-container select, .perseus-widget-container [role="combobox"], .perseus-widget-container [role="listbox"]')) as HTMLElement[]
    for (const dd of perseusDropdowns) {
      if (!isVisible(dd) || isInsideEasyQuiz(dd)) continue
      if (!selectedElements.includes(dd)) selectedElements.push(dd)
    }

    // 5.3 Perseus radios (div[role="radio"] without native input)
    const perseusRadios = Array.from(perseusScope.querySelectorAll('[class*="perseus-radio" i] [role="radio"], .perseus-widget-container [role="radio"], .perseus-widget-container [role="checkbox"]')) as HTMLElement[]
    for (const pr of perseusRadios) {
      if (!isVisible(pr) || isInsideEasyQuiz(pr)) continue
      // Evita duplicatas com inputs nativos já coletados
      if (pr.querySelector('input[type="radio"], input[type="checkbox"]')) continue
      if (!selectedElements.includes(pr)) selectedElements.push(pr)
    }

    // 5.4 Perseus interactive widgets (sortable, number-line, interactive-graph)
    const perseusInteractive = Array.from(perseusScope.querySelectorAll('.perseus-widget-container [role="button"], .number-line [role="slider"], [class*="interactive-graph" i] [role="button"]')) as HTMLElement[]
    for (const pi of perseusInteractive) {
      if (!isVisible(pi) || isInsideEasyQuiz(pi) || isNavigationControl(pi)) continue
      if (!selectedElements.includes(pi)) selectedElements.push(pi)
    }

    // 5.5 Perseus native inputs/selects inside widget containers
    const perseusInputs = Array.from(perseusScope.querySelectorAll('.perseus-widget-container input:not([type="hidden"]), .perseus-widget-container textarea, .perseus-widget-container select')) as HTMLElement[]
    for (const pi of perseusInputs) {
      if (!isVisible(pi) || isInsideEasyQuiz(pi)) continue
      if (handledInputs.has(pi)) continue
      if (!selectedElements.includes(pi)) selectedElements.push(pi)
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

  // Captura de texto com consciência matemática (KaTeX/MathML) para Khan Academy
  const hasMathContent = scope.querySelector('.katex, math, .mq-root-block, .mq-editable-field')
  let questionText: string
  if (hasMathContent) {
    questionText = extractMathAwareText(scope, 16_000)
  } else {
    const rawText = scope.innerText && scope.innerText.trim().length > 0 ? scope.innerText : scope.textContent || ''
    questionText = rawText.length > 40_000
      ? cleanText(rawText.slice(0, 8000), 8000) + '\n[...conteúdo extenso truncado...]\n' + cleanText(rawText.slice(-2000), 2000)
      : cleanText(rawText, 16_000)
  }
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
    .map((c) => {
      const opts = c.options ? c.options.length : 0
      return `${c.role}:${c.id}:${c.type}:${opts}`
    })
    .join('|')
  return [
    window.location.href,
    context.pageTitle,
    context.questionText.slice(0, 400),
    controlStructure,
  ].join('::')
}

/**
 * Detecta se o texto de um escopo representa de fato uma pergunta/questão acadêmica.
 * Usado para impedir que questões em transição de SPA sejam incorretamente puladas como 'info'.
 */
export function isQuestionContent(text: string): boolean {
  if (!text) return false
  const t = text.toLowerCase()
  const questionKeywords = [
    '?', 'questão', 'questao', 'pergunta', 'exercício', 'exercicio',
    'assinale', 'calcule', 'determine', 'qual é', 'qual o', 'quais',
    'indique', 'selecione', 'escolha', 'responda', 'julgue',
    'verdadeiro ou falso', 'complete', 'resolva', 'encontre',
    'alternativa', 'correta', 'incorreta', 'm³', 'cm²', 'volume',
    'probabilidade', 'matriz', 'valor de', 'resultado de', 'considere',
    'dada a', 'sabendo que', 'quanto vale', 'obtenha'
  ]
  return questionKeywords.some((kw) => t.includes(kw))
}

