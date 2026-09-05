import type { DeclarativeAction } from '../core/types'
import { findElementExt } from './executor'

let highlightedScope: HTMLElement | null = null
let highlightedElements: HTMLElement[] = []

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
    el.removeAttribute('data-easyquiz-highlight')
  }
  highlightedElements = []
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
    const element = findElementExt(action.id)
    if (!element) continue

    // Elemento alvo ou seu wrapper de card/opção visível
    const target = (element.closest(
      'label, .option-card, [role="radio"], [role="checkbox"], [role="listitem"], .answer, .quiz-option, .form-check, [class*="option" i], [class*="choice" i], tr, li',
    ) || element) as HTMLElement

    target.style.outline = '2px solid #00ff88'
    target.style.outlineOffset = '2px'
    target.style.backgroundColor = 'rgba(0, 255, 136, 0.12)'
    target.setAttribute('data-easyquiz-highlight', 'true')
    highlightedElements.push(target)
  }
}

