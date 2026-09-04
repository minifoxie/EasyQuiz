import type { CapturedContext, ControlDescriptor } from '../core/types'
import {
  cleanText,
  CONTROL_SELECTOR,
  describeControl,
  isNavigationControl,
  isVisible,
} from './controls'

const CANDIDATE_SELECTORS = [
  // Google Forms
  '.Qr7Oae',
  '.geSAlb',
  '[role="listitem"]',
  // Moodle & AVA
  '.que',
  '.form-group',
  '.question-holder',
  // Canvas & Blackboard
  '.quiz-question',
  '.question_holder',
  '.display_question',
  // Kahoot & Quizizz
  '[data-functional-selector*="question"]',
  '.question-container',
  // Genéricos e semânticos
  '[data-question-id]',
  '[data-testid*="question" i]',
  '[class*="question" i]',
  '[class*="pergunta" i]',
  '[id*="question" i]',
  '[id*="pergunta" i]',
  'fieldset',
  'form',
  'article',
  'section',
  '[role="group"]',
  '[role="region"]',
  '[role="dialog"]',
  'main',
].join(',')

function scoreCandidate(element: HTMLElement): number {
  if (!isVisible(element)) return -Infinity

  const rect = element.getBoundingClientRect()
  const controls = Array.from(element.querySelectorAll(CONTROL_SELECTOR)).filter(isVisible)
  const textLength = cleanText(element.innerText, 4000).length

  // Não é questão se não tiver controles ou não tiver texto
  if (!controls.length || textLength < 10) return -Infinity

  const viewportArea = Math.max(1, window.innerWidth * window.innerHeight)
  const elementArea = Math.max(1, rect.width * rect.height)
  const areaRatio = Math.min(1, elementArea / viewportArea)

  // Dá preferência a blocos que ocupam proporção razoável da tela, não o body inteiro
  const centerY = rect.top + rect.height / 2
  const centerDistance = Math.abs(centerY - window.innerHeight / 2) / Math.max(1, window.innerHeight)

  // Densidade de controles por área
  const density = Math.min(60, (controls.length * 15_000) / elementArea)

  // Se o elemento estiver visível no viewport atual, ganha bônus
  const inViewportBonus = rect.top >= 0 && rect.bottom <= window.innerHeight ? 30 : 0

  return (
    controls.length * 20 +
    Math.min(50, textLength / 25) +
    density +
    inViewportBonus -
    areaRatio * 60 -
    centerDistance * 15
  )
}

export function findActiveScope(): HTMLElement {
  // 1. Verificar se o elemento com foco do usuário está dentro de uma questão candidata
  const active = document.activeElement as HTMLElement | null
  if (active && active !== document.body) {
    const focusedScope = active.closest(CANDIDATE_SELECTORS) as HTMLElement | null
    if (focusedScope && scoreCandidate(focusedScope) > 0) {
      return focusedScope
    }
  }

  // 2. Pontuar todos os candidatos na página
  const candidates = Array.from(document.querySelectorAll(CANDIDATE_SELECTORS)) as HTMLElement[]
  const ranked = candidates
    .map((element) => ({ element, score: scoreCandidate(element) }))
    .filter((item) => Number.isFinite(item.score))
    .sort((a, b) => b.score - a.score)

  if (ranked.length > 0 && ranked[0].score > 0) {
    return ranked[0].element
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

  // Manter apenas atributos relevantes para acessibilidade e identificação
  clone.querySelectorAll('*').forEach((element) => {
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
    ]
    for (const attr of Array.from(element.attributes)) {
      if (!keep.includes(attr.name)) {
        element.removeAttribute(attr.name)
      }
    }
  })

  return clone.outerHTML.replace(/\s+/g, ' ').slice(0, 20_000)
}

export function extractAnswerControls(scope: HTMLElement): ControlDescriptor[] {
  return Array.from(scope.querySelectorAll(CONTROL_SELECTOR))
    .filter((el) => isVisible(el) && !isNavigationControl(el as HTMLElement))
    .slice(0, 100)
    .map((el) => describeControl(el as HTMLElement, 'answer'))
}

export function extractNavigationControls(scope: HTMLElement): ControlDescriptor[] {
  const roots = [scope, scope.parentElement, scope.parentElement?.parentElement, document.body].filter(
    Boolean,
  ) as HTMLElement[]

  const seen = new Set<HTMLElement>()
  const controls: ControlDescriptor[] = []

  for (const root of roots) {
    for (const el of Array.from(root.querySelectorAll(CONTROL_SELECTOR)) as HTMLElement[]) {
      if (seen.has(el) || !isVisible(el) || !isNavigationControl(el)) continue
      seen.add(el)
      controls.push(describeControl(el, 'navigation'))
      if (controls.length >= 10) return controls
    }
  }

  return controls
}

export function captureCurrentContext(expanded = false): CapturedContext {
  let scope = findActiveScope()
  if (expanded && scope.parentElement && scope.parentElement !== document.body) {
    scope = scope.parentElement
  }

  const questionText = cleanText(scope.innerText, 16_000)
  const answers = extractAnswerControls(scope)
  const navs = extractNavigationControls(scope)
  const controls = [...answers, ...navs].slice(0, 120)

  if (!questionText || !controls.length) {
    throw new Error(
      'Nenhum bloco de questão com controles visíveis foi detectado. Clique ou foque na questão e tente novamente.',
    )
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
