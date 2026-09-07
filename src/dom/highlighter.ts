import type { DeclarativeAction } from '../core/types'
import { cleanSearchTerm, findElementExt } from './executor'
import { findActiveScope } from './detector'
import { isInsideEasyQuiz, isVisible } from './controls'

let highlightedScope: HTMLElement | null = null
let highlightedElements: HTMLElement[] = []
let highlightedImages: HTMLElement[] = []
let captureBadges: HTMLElement[] = []
let scanOverlay: HTMLElement | null = null

const IMAGE_PULSE_KEYFRAMES = `
@keyframes eq-image-pulse-yellow-white {
  0%, 100% {
    outline-color: #ffd600;
    box-shadow: 0 0 14px rgba(255, 214, 0, 0.95), 0 0 6px rgba(255, 214, 0, 0.6);
  }
  50% {
    outline-color: #ffffff;
    box-shadow: 0 0 18px rgba(255, 255, 255, 0.95), 0 0 8px rgba(255, 255, 255, 0.8);
  }
}
@keyframes eq-scope-scan {
  0% { top: 0%; opacity: 1; }
  80% { top: 90%; opacity: 0.6; }
  100% { top: 100%; opacity: 0; }
}
@keyframes eq-badge-fade-in {
  0% { opacity: 0; transform: scale(0.7) translateY(4px); }
  100% { opacity: 1; transform: scale(1) translateY(0); }
}
`

function ensureImageHighlightKeyframes(): void {
  try {
    if (typeof document === 'undefined' || !document.head) return
    if (!document.getElementById('eq-image-pulse-style')) {
      const style = document.createElement('style')
      style.id = 'eq-image-pulse-style'
      style.textContent = IMAGE_PULSE_KEYFRAMES
      document.head.appendChild(style)
    }
  } catch {}
}

export function clearHighlights(): void {
  if (highlightedScope) {
    highlightedScope.style.removeProperty('outline')
    highlightedScope.style.removeProperty('outline-offset')
    highlightedScope.style.removeProperty('position')
    highlightedScope = null
  }

  for (const el of highlightedElements) {
    el.style.removeProperty('outline')
    el.style.removeProperty('outline-offset')
    el.style.removeProperty('background-color')
    el.style.removeProperty('box-shadow')
    el.removeAttribute('data-easyquiz-highlight')
  }
  highlightedElements = []

  for (const imgEl of highlightedImages) {
    imgEl.style.removeProperty('animation')
    imgEl.style.removeProperty('outline')
    imgEl.style.removeProperty('outline-offset')
    imgEl.style.removeProperty('box-shadow')
    imgEl.removeAttribute('data-easyquiz-image-highlight')
  }
  highlightedImages = []

  // Remove badges de captura
  for (const badge of captureBadges) {
    try { badge.remove() } catch {}
  }
  captureBadges = []

  // Remove scan overlay
  if (scanOverlay) {
    try { scanOverlay.remove() } catch {}
    scanOverlay = null
  }
}

export function highlightAttachedImages(elements: Element[]): void {
  ensureImageHighlightKeyframes()
  for (const el of elements) {
    if (!el || !(el instanceof (typeof HTMLElement !== 'undefined' ? HTMLElement : (el as any).constructor))) continue
    const node = el as HTMLElement

    node.style.outline = '3px solid #ffd600'
    node.style.outlineOffset = '3px'
    node.style.animation = 'eq-image-pulse-yellow-white 1.2s ease-in-out infinite'
    node.setAttribute('data-easyquiz-image-highlight', 'true')
    highlightedImages.push(node)

    // Adicionar badge "📷 Capturado pela IA" no canto do elemento
    try {
      const parent = node.parentElement
      if (parent && !parent.querySelector('[data-easyquiz-capture-badge]')) {
        const prevPosition = window.getComputedStyle(parent).position
        if (prevPosition === 'static') {
          parent.style.position = 'relative'
        }
        const badge = document.createElement('div')
        badge.setAttribute('data-easyquiz-capture-badge', 'true')
        badge.textContent = '📷 Capturado pela IA'
        badge.style.cssText = `
          position: absolute; top: 4px; left: 4px; z-index: 99999;
          background: rgba(0,0,0,0.75); color: #ffd600; font-size: 10px;
          font-weight: 700; padding: 2px 7px; border-radius: 4px;
          pointer-events: none; font-family: system-ui, sans-serif;
          animation: eq-badge-fade-in 0.3s ease-out;
          box-shadow: 0 1px 4px rgba(0,0,0,0.4);
          letter-spacing: 0.3px;
        `
        parent.appendChild(badge)
        captureBadges.push(badge)
      }
    } catch {}
  }
}

export function highlightScope(scope: HTMLElement): void {
  clearHighlights()
  ensureImageHighlightKeyframes()
  highlightedScope = scope
  scope.style.outline = '2px solid #00e5ff'
  scope.style.outlineOffset = '4px'

  // Animação de scan — linha horizontal de cima para baixo indicando varredura da IA
  try {
    const prevPos = window.getComputedStyle(scope).position
    if (prevPos === 'static') {
      scope.style.position = 'relative'
    }
    const scan = document.createElement('div')
    scan.style.cssText = `
      position: absolute; left: 0; right: 0; top: 0; height: 3px;
      background: linear-gradient(90deg, transparent, #00e5ff, #00ff88, #00e5ff, transparent);
      z-index: 99998; pointer-events: none; border-radius: 2px;
      animation: eq-scope-scan 0.8s ease-in-out forwards;
      box-shadow: 0 0 8px rgba(0, 229, 255, 0.6);
    `
    scope.appendChild(scan)
    scanOverlay = scan
    // Auto-remove depois da animação
    setTimeout(() => {
      try { scan.remove() } catch {}
      if (scanOverlay === scan) scanOverlay = null
    }, 900)
  } catch {}
}

// Cor do highlight varia conforme a confiança da IA
function getConfidenceColor(confidence?: number): { outline: string; bg: string; glow: string } {
  if (!confidence || confidence >= 0.9) {
    return { outline: '#00ff88', bg: 'rgba(0, 255, 136, 0.12)', glow: 'rgba(0, 255, 136, 0.8)' }
  }
  if (confidence >= 0.7) {
    return { outline: '#00bfff', bg: 'rgba(0, 191, 255, 0.10)', glow: 'rgba(0, 191, 255, 0.7)' }
  }
  return { outline: '#ffaa00', bg: 'rgba(255, 170, 0, 0.10)', glow: 'rgba(255, 170, 0, 0.7)' }
}

export function highlightTargetActions(actions: DeclarativeAction[], confidence?: number): void {
  const colors = getConfidenceColor(confidence)

  for (const action of actions) {
    if (action.t === 'adv' || action.t === 'js') continue
    if (action.t === 'drag') {
      try {
        const fromEl = findElementExt(action.from)
        const toEl = findElementExt(action.to)
        if (fromEl) {
          fromEl.style.outline = `2px solid ${colors.outline}`
          highlightedElements.push(fromEl)
        }
        if (toEl) {
          toEl.style.outline = `2px dashed #00e5ff`
          highlightedElements.push(toEl)
        }
      } catch {}
      continue
    }

    if (!action.id) continue
    const valHint = (action as any).v !== undefined ? (Array.isArray((action as any).v) ? (action as any).v[0] : String((action as any).v)) : ''
    let element = findElementExt(action.id, valHint, action.t === 'val' || action.t === 'sel') ||
      findElementExt(cleanSearchTerm(action.id), valHint, action.t === 'val' || action.t === 'sel')

    if (!element && action.t === 'sel') {
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
      element = match || (visibleSelects.length === 1 ? visibleSelects[0] : null)
    }

    if (!element) continue

    const isSelect =
      (typeof HTMLSelectElement !== 'undefined' && element instanceof HTMLSelectElement) ||
      element.tagName?.toLowerCase() === 'select' ||
      element.getAttribute('role') === 'combobox' ||
      element.getAttribute('role') === 'listbox'

    // Elemento alvo ou seu wrapper de card/opção/linha visível
    const rowWrapper = element.parentElement?.closest(
      '.dropdown-row, [class*="dropdown" i], [class*="select-row" i], .form-group, tr, li',
    ) as HTMLElement | null

    const target = (rowWrapper || element.closest(
      'label, .option-card, [role="radio"], [role="checkbox"], [role="listitem"], .answer, .quiz-option, .form-check, [class*="option" i], [class*="choice" i]',
    ) || element) as HTMLElement

    target.style.outline = `2px solid ${colors.outline}`
    target.style.outlineOffset = '2px'
    target.style.backgroundColor = colors.bg
    target.setAttribute('data-easyquiz-highlight', 'true')
    highlightedElements.push(target)

    // Realça o próprio select ou controle com brilho neon
    const selectInTarget = isSelect ? element : (target.querySelector('select, [role="combobox"], [role="listbox"]') as HTMLElement | null)
    if (selectInTarget) {
      selectInTarget.style.outline = `2px solid ${colors.outline}`
      selectInTarget.style.outlineOffset = '2px'
      selectInTarget.style.boxShadow = `0 0 10px ${colors.glow}`
      selectInTarget.setAttribute('data-easyquiz-highlight', 'true')
      highlightedElements.push(selectInTarget)
    }

    // Realça também o exato quadradinho do checkbox ou bolinha de rádio com brilho neon
    const innerBox = (element instanceof HTMLInputElement && ['checkbox', 'radio'].includes(element.type)
      ? element
      : target.querySelector('input[type="checkbox"], input[type="radio"]')) as HTMLElement | null
    if (innerBox && innerBox !== target) {
      innerBox.style.outline = `2px solid ${colors.outline}`
      innerBox.style.outlineOffset = '2px'
      innerBox.style.boxShadow = `0 0 10px ${colors.glow}`
      innerBox.setAttribute('data-easyquiz-highlight', 'true')
      highlightedElements.push(innerBox)
    }
  }
}
