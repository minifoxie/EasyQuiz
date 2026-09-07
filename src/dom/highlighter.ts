import type { DeclarativeAction } from '../core/types'
import { cleanSearchTerm, findElementExt } from './executor'
import { findActiveScope } from './detector'
import { isInsideEasyQuiz, isVisible } from './controls'

let highlightedScope: HTMLElement | null = null
let highlightedElements: HTMLElement[] = []
let highlightedImages: HTMLElement[] = []

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
  }
}

export function highlightScope(scope: HTMLElement): void {
  clearHighlights()
  highlightedScope = scope
  scope.style.outline = '2px solid #00e5ff'
  scope.style.outlineOffset = '4px'
}

export function highlightTargetActions(actions: DeclarativeAction[]): void {
  for (const action of actions) {
    if (action.t === 'adv' || action.t === 'js') continue
    if (action.t === 'drag') {
      try {
        const fromEl = findElementExt(action.from)
        const toEl = findElementExt(action.to)
        if (fromEl) {
          fromEl.style.outline = '2px solid #00ff88'
          highlightedElements.push(fromEl)
        }
        if (toEl) {
          toEl.style.outline = '2px dashed #00e5ff'
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

    target.style.outline = '2px solid #00ff88'
    target.style.outlineOffset = '2px'
    target.style.backgroundColor = 'rgba(0, 255, 136, 0.12)'
    target.setAttribute('data-easyquiz-highlight', 'true')
    highlightedElements.push(target)

    // Realça o próprio select ou controle com brilho neon
    const selectInTarget = isSelect ? element : (target.querySelector('select, [role="combobox"], [role="listbox"]') as HTMLElement | null)
    if (selectInTarget) {
      selectInTarget.style.outline = '2px solid #00ff88'
      selectInTarget.style.outlineOffset = '2px'
      selectInTarget.style.boxShadow = '0 0 10px rgba(0, 255, 136, 0.8)'
      selectInTarget.setAttribute('data-easyquiz-highlight', 'true')
      highlightedElements.push(selectInTarget)
    }

    // Realça também o exato quadradinho do checkbox ou bolinha de rádio com brilho neon
    const innerBox = (element instanceof HTMLInputElement && ['checkbox', 'radio'].includes(element.type)
      ? element
      : target.querySelector('input[type="checkbox"], input[type="radio"]')) as HTMLElement | null
    if (innerBox && innerBox !== target) {
      innerBox.style.outline = '2px solid #00ff88'
      innerBox.style.outlineOffset = '2px'
      innerBox.style.boxShadow = '0 0 10px rgba(0, 255, 136, 0.8)'
      innerBox.setAttribute('data-easyquiz-highlight', 'true')
      highlightedElements.push(innerBox)
    }
  }
}

