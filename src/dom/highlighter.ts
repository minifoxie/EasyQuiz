import type { DeclarativeAction } from '../core/types'

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
  }
  highlightedElements = []
}

export function highlightScope(scope: HTMLElement): void {
  clearHighlights()
  highlightedScope = scope
  // Estilo estritamente sólido, quadrado e nítido
  scope.style.outline = '2px solid #00e5ff'
  scope.style.outlineOffset = '4px'
}

export function highlightTargetActions(actions: DeclarativeAction[]): void {
  for (const action of actions) {
    if (action.type === 'advance') continue
    const escaped = CSS.escape(action.targetId)
    const element = document.querySelector(`[data-easyquiz-id="${escaped}"]`) as HTMLElement | null
    if (!element) continue

    // Elemento alvo ou seu wrapper mais visível
    const target = (element.closest('label, [role="listitem"], .answer, .form-check') || element) as HTMLElement
    target.style.outline = '2px solid #00ff88'
    target.style.outlineOffset = '2px'
    target.style.backgroundColor = 'rgba(0, 255, 136, 0.08)'
    highlightedElements.push(target)
  }
}
