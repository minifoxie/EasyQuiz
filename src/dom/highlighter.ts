import type { DeclarativeAction } from '../core/types'
import { cleanSearchTerm, findElementExt } from './executor'
import { findActiveScope } from './detector'
import { isInsideEasyQuiz, isVisible, safeCssEscape } from './controls'

let highlightedScope: HTMLElement | null = null
let highlightedElements: HTMLElement[] = []
let highlightedImages: HTMLElement[] = []
let imageFrames: HTMLElement[] = []
let captureBadges: HTMLElement[] = []
let scanOverlay: HTMLElement | null = null
let repositionListener: (() => void) | null = null

const IMAGE_PULSE_KEYFRAMES = `
@keyframes eq-image-pulse-yellow-white {
  0%, 100% {
    border-color: #ffd600;
    outline-color: #ffd600;
    box-shadow: 0 0 16px rgba(255, 214, 0, 0.95), 0 0 32px rgba(255, 214, 0, 0.5), inset 0 0 12px rgba(255, 214, 0, 0.25);
  }
  50% {
    border-color: #ffffff;
    outline-color: #ffffff;
    box-shadow: 0 0 22px rgba(255, 255, 255, 0.95), 0 0 40px rgba(255, 214, 0, 0.8), inset 0 0 16px rgba(255, 255, 255, 0.35);
  }
}
@keyframes eq-scope-scan-loop {
  0% { top: 0%; opacity: 0.95; }
  50% { top: 96%; opacity: 0.75; }
  100% { top: 0%; opacity: 0.95; }
}
@keyframes eq-badge-fade-in {
  0% { opacity: 0; transform: scale(0.8) translateY(-4px); }
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
    imgEl.style.removeProperty('filter')
    imgEl.removeAttribute('data-easyquiz-image-highlight')
  }
  highlightedImages = []

  // Remove molduras flutuantes de imagem
  for (const frame of imageFrames) {
    try { frame.remove() } catch {}
  }
  imageFrames = []

  if (repositionListener && typeof window !== 'undefined') {
    window.removeEventListener('scroll', repositionListener)
    window.removeEventListener('resize', repositionListener)
    repositionListener = null
  }

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
  const trackedPairs: Array<{ element: Element; frame: HTMLElement }> = []

  for (const el of elements) {
    if (!el || typeof (el as any).setAttribute !== 'function') continue
    const node = el as HTMLElement

    // 1. Aplica destaque direto no elemento
    try {
      if ((node as any).style) {
        node.style.outline = '3px solid #ffd600'
        node.style.outlineOffset = '4px'
        node.style.animation = 'eq-image-pulse-yellow-white 1.2s ease-in-out infinite'
        node.style.boxShadow = '0 0 16px rgba(255, 214, 0, 0.7)'
        node.style.filter = 'drop-shadow(0 0 8px rgba(255, 214, 0, 0.8))'
      }
      node.setAttribute('data-easyquiz-image-highlight', 'true')
      highlightedImages.push(node)
    } catch {}

    // 2. Cria Moldura Flutuante Bounding-Box no document.body
    // Essa moldura é imune a cortes de overflow: hidden, especificações de SVG ou estilos do container
    try {
      const rect = el.getBoundingClientRect()
      const effectiveW = rect.width || (el as HTMLElement).offsetWidth || 280
      const effectiveH = rect.height || (el as HTMLElement).offsetHeight || 200

      if (effectiveW > 10 && effectiveH > 10) {
        const frame = document.createElement('div')
        frame.setAttribute('data-easyquiz-image-frame', 'true')
        frame.style.cssText = `
          position: absolute;
          top: ${rect.top + window.scrollY - 3}px;
          left: ${rect.left + window.scrollX - 3}px;
          width: ${rect.width + 6}px;
          height: ${rect.height + 6}px;
          border: 3px solid #ffd600;
          border-radius: 8px;
          pointer-events: none;
          z-index: 2147483640;
          box-sizing: border-box;
          animation: eq-image-pulse-yellow-white 1.2s ease-in-out infinite;
          box-shadow: 0 0 16px rgba(255, 214, 0, 0.95), 0 0 32px rgba(255, 214, 0, 0.5), inset 0 0 12px rgba(255, 214, 0, 0.25);
        `

        // Badge informativo acoplado à moldura
        const badge = document.createElement('div')
        badge.setAttribute('data-easyquiz-capture-badge', 'true')
        badge.textContent = '📷 Imagem / Gráfico Analisado pela IA'
        badge.style.cssText = `
          position: absolute;
          top: -14px;
          left: 8px;
          background: rgba(12, 14, 20, 0.95);
          color: #ffd600;
          font-size: 11px;
          font-weight: 800;
          padding: 2px 8px;
          border-radius: 6px;
          border: 1px solid rgba(255, 214, 0, 0.85);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.8);
          letter-spacing: 0.3px;
          white-space: nowrap;
          pointer-events: none;
          font-family: system-ui, -apple-system, sans-serif;
          animation: eq-badge-fade-in 0.3s ease-out;
        `
        frame.appendChild(badge)
        document.body.appendChild(frame)
        imageFrames.push(frame)
        captureBadges.push(badge)
        trackedPairs.push({ element: el, frame })
      }
    } catch {}
  }

  // Sincroniza posição das molduras com scroll e redimensionamento
  if (trackedPairs.length > 0 && !repositionListener && typeof window !== 'undefined') {
    repositionListener = () => {
      for (const pair of trackedPairs) {
        try {
          const r = pair.element.getBoundingClientRect()
          if (r.width > 0 && r.height > 0) {
            pair.frame.style.top = `${r.top + window.scrollY - 3}px`
            pair.frame.style.left = `${r.left + window.scrollX - 3}px`
            pair.frame.style.width = `${r.width + 6}px`
            pair.frame.style.height = `${r.height + 6}px`
          }
        } catch {}
      }
    }
    window.addEventListener('scroll', repositionListener, { passive: true })
    window.addEventListener('resize', repositionListener, { passive: true })
  }
}

export function highlightScope(scope: HTMLElement): void {
  // Limpa realces anteriores de escopo sem destruir molduras de imagens já vinculadas
  if (highlightedScope && highlightedScope !== scope) {
    highlightedScope.style.removeProperty('outline')
    highlightedScope.style.removeProperty('outline-offset')
  }
  ensureImageHighlightKeyframes()
  highlightedScope = scope
  scope.style.outline = '2px solid #00e5ff'
  scope.style.outlineOffset = '4px'

  // Animação de scan cibernético CONTÍNUO enquanto a IA analisa
  try {
    if (scanOverlay) {
      try { scanOverlay.remove() } catch {}
      scanOverlay = null
    }
    const prevPos = window.getComputedStyle(scope).position
    if (prevPos === 'static') {
      scope.style.position = 'relative'
    }
    const scan = document.createElement('div')
    scan.style.cssText = `
      position: absolute; left: 0; right: 0; top: 0; height: 3px;
      background: linear-gradient(90deg, transparent, #00e5ff, #00ff88, #00e5ff, transparent);
      z-index: 99998; pointer-events: none; border-radius: 2px;
      animation: eq-scope-scan-loop 1.4s ease-in-out infinite;
      box-shadow: 0 0 14px rgba(0, 229, 255, 0.85), 0 0 6px #00ff88;
    `
    scope.appendChild(scan)
    scanOverlay = scan
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
  // Análise concluída — remove a animação de scan
  if (scanOverlay) {
    try { scanOverlay.remove() } catch {}
    scanOverlay = null
  }
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

    const valHint = (action as any).v !== undefined ? (Array.isArray((action as any).v) ? (action as any).v[0] : String((action as any).v)) : ''
    const nameHint = String((action as any).name ?? (action as any).n ?? '').trim()

    let element: HTMLElement | null = null

    // 1. Busca por nameHint (V/F e matrizes de rádio)
    if (nameHint) {
      const groupRadios = Array.from(
        document.querySelectorAll(`input[name="${safeCssEscape(nameHint)}"]`)
      ) as HTMLInputElement[]
      if (valHint) {
        element = groupRadios.find(r => r.value?.toLowerCase() === valHint.toLowerCase()) ?? null
        if (!element) {
          const isVkw = /^(v|verdadeiro|true|1|t|sim|correto)$/i.test(valHint)
          const isFkw = /^(f|falso|false|0|nao|não|incorreto|errado)$/i.test(valHint)
          if (isVkw || isFkw) {
            const kws = isVkw ? ['v', 'verdadeiro', 'true', '1', 't', 'sim', 'correto'] : ['f', 'falso', 'false', '0', 'nao', 'não', 'incorreto', 'errado']
            element = groupRadios.find(r => {
              const val = r.value?.toLowerCase() ?? ''
              if (kws.includes(val)) return true
              const lbl = r.closest('label, .vf-label, td, [class*="option" i]')
              const txt = (lbl?.textContent ?? '').trim().toLowerCase()
              return kws.some(kw => txt === kw || txt.startsWith(kw + ' ') || txt.startsWith('(' + kw + ')'))
            }) ?? null
          }
        }
      }
      if (!element && groupRadios.length > 0) element = groupRadios[0]
    }

    // 2. Busca por action.id
    if (!element && action.id) {
      element = findElementExt(action.id, valHint, action.t === 'val' || action.t === 'sel') ||
        findElementExt(cleanSearchTerm(action.id), valHint, action.t === 'val' || action.t === 'sel')
    }

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

    const optionParent = element.closest(
      'label, .vf-label, .option-card, [role="radio"], [role="checkbox"], [role="option"], [role="listitem"], .answer, .quiz-option, .form-check, [class*="option" i], [class*="choice" i]',
    ) as HTMLElement | null

    const rowWrapper = isSelect
      ? (element.parentElement?.closest('.dropdown-row, [class*="dropdown" i], [class*="select-row" i], .form-group, tr, li') as HTMLElement | null)
      : null

    const target = (optionParent || rowWrapper || element) as HTMLElement

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
