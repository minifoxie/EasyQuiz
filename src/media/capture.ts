import type { CapturedImage } from '../core/types'
import { cleanText, isNavigationControl, isUtilityOrGamificationControl, isVisible } from '../dom/controls'

const MAX_IMAGES = 10
const MAX_DIMENSION = 1_400
const MAX_BASE64_LENGTH = 1_500_000

// ============================================================
// UTILITÁRIOS BASE
// ============================================================

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = () => reject(new Error('Falha ao converter blob para base64.'))
    reader.onload = () => {
      const res = String(reader.result || '')
      resolve(res.split(',')[1] || '')
    }
    reader.readAsDataURL(blob)
  })
}

async function compressImage(source: HTMLImageElement | HTMLCanvasElement | ImageBitmap): Promise<Blob> {
  let width = 0
  let height = 0

  if (source instanceof HTMLImageElement) {
    width = source.naturalWidth || source.width
    height = source.naturalHeight || source.height
  } else {
    width = source.width
    height = source.height
  }

  if (width <= 0 || height <= 0) throw new Error('Dimensões inválidas.')

  const scale = Math.min(1, MAX_DIMENSION / Math.max(width, height))
  const targetWidth = Math.max(1, Math.round(width * scale))
  const targetHeight = Math.max(1, Math.round(height * scale))

  const canvas = document.createElement('canvas')
  canvas.width = targetWidth
  canvas.height = targetHeight
  const ctx = canvas.getContext('2d', { alpha: false })
  if (!ctx) throw new Error('Sem suporte a Canvas 2D.')

  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, targetWidth, targetHeight)
  ctx.drawImage(source as CanvasImageSource, 0, 0, targetWidth, targetHeight)

  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error('Falha na compressão.'))),
      'image/jpeg',
      0.88,
    )
  })
}

// ============================================================
// CAPTURA SVG E RASTERIZAÇÃO VETORIAL PROFUNDA
// ============================================================
async function rasterizeSvgElement(svgEl: SVGElement): Promise<Blob> {
  const rect = typeof svgEl.getBoundingClientRect === 'function' ? svgEl.getBoundingClientRect() : { width: 0, height: 0 }
  const rawWidth = rect.width || parseFloat(svgEl.getAttribute('width') || '0') || parseFloat(svgEl.style.width || '0') || 400
  const rawHeight = rect.height || parseFloat(svgEl.getAttribute('height') || '0') || parseFloat(svgEl.style.height || '0') || 300

  const scale = 2
  const targetWidth = Math.min(1800, Math.max(120, Math.round(rawWidth * scale)))
  const targetHeight = Math.min(1800, Math.max(100, Math.round(rawHeight * scale)))

  const clone = svgEl.cloneNode(true) as SVGElement
  if (!clone.getAttribute('xmlns')) clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
  if (!clone.getAttribute('xmlns:xlink')) clone.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink')
  clone.setAttribute('width', String(targetWidth))
  clone.setAttribute('height', String(targetHeight))
  if (!clone.getAttribute('viewBox') && rawWidth > 0 && rawHeight > 0) {
    clone.setAttribute('viewBox', `0 0 ${rawWidth} ${rawHeight}`)
  }

  // Injetar estilos computados essenciais em todos os elementos filhos do SVG
  // para que cores, fontes e traços sejam idênticos mesmo sem CSS externo
  try {
    const origElements = Array.from(svgEl.querySelectorAll('*'))
    const cloneElements = Array.from(clone.querySelectorAll('*'))
    for (let i = 0; i < Math.min(origElements.length, cloneElements.length); i++) {
      const orig = origElements[i] as SVGElement
      const dest = cloneElements[i] as SVGElement
      if (!orig || !dest || !dest.style) continue
      const cs = window.getComputedStyle ? window.getComputedStyle(orig) : null
      if (cs) {
        if (cs.fill && cs.fill !== 'none') dest.style.fill = cs.fill
        if (cs.stroke && cs.stroke !== 'none') dest.style.stroke = cs.stroke
        if (cs.strokeWidth) dest.style.strokeWidth = cs.strokeWidth
        if (cs.fontFamily) dest.style.fontFamily = cs.fontFamily
        if (cs.fontSize) dest.style.fontSize = cs.fontSize
        if (cs.fontWeight) dest.style.fontWeight = cs.fontWeight
        if (cs.color) dest.style.color = cs.color
      }
    }
  } catch {}

  // Detecta cor de fundo real do elemento ou da página para preservar contraste em temas escuros (ex: KhanMath)
  let bgColor = '#ffffff'
  try {
    let cur: HTMLElement | null = (svgEl.parentElement as HTMLElement) || (svgEl as any)
    while (cur && cur !== document.documentElement) {
      const cs = window.getComputedStyle ? window.getComputedStyle(cur) : null
      const bg = cs?.backgroundColor
      if (bg && bg !== 'transparent' && bg !== 'rgba(0, 0, 0, 0)') {
        bgColor = bg
        break
      }
      cur = cur.parentElement
    }
  } catch {}

  const serializer = new XMLSerializer()
  const svgString = serializer.serializeToString(clone)

  const loadImgFromUrl = (imgSrc: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      const timer = setTimeout(() => reject(new Error('Timeout render SVG')), 2500)
      img.onload = () => { clearTimeout(timer); resolve(img) }
      img.onerror = () => { clearTimeout(timer); reject(new Error('Falha ao renderizar SVG em Image.')) }
      img.src = imgSrc
    })
  }

  let img: HTMLImageElement | null = null
  const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' })
  const blobUrl = URL.createObjectURL(svgBlob)

  try {
    try {
      img = await loadImgFromUrl(blobUrl)
    } catch {
      // Fallback para data URI caso blobUrl falhe em sandbox estrito
      const dataUri = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`
      img = await loadImgFromUrl(dataUri)
    }

    const canvas = document.createElement('canvas')
    canvas.width = targetWidth
    canvas.height = targetHeight
    const ctx = canvas.getContext('2d', { alpha: false })
    if (!ctx) throw new Error('Sem suporte a Canvas 2D.')

    ctx.fillStyle = bgColor
    ctx.fillRect(0, 0, targetWidth, targetHeight)
    ctx.drawImage(img, 0, 0, targetWidth, targetHeight)

    return new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (blob) => (blob ? resolve(blob) : reject(new Error('Falha na compressão do SVG.'))),
        'image/jpeg',
        0.92,
      )
    })
  } finally {
    URL.revokeObjectURL(blobUrl)
  }
}

// ============================================================
// MOTOR UNIVERSAL DE CAPTURA VISUAL "PRINT-LIKE" DE ÁREA
// ============================================================
/**
 * Captura um "print" do exato bounding-box de qualquer elemento visual
 * (diagrama HTML, canvas, SVG aninhado, container com CSS), copiando
 * recursivamente os estilos computados da renderização ativa.
 */
async function captureElementVisualSnapshot(node: HTMLElement): Promise<CapturedImage | null> {
  try {
    const rect = node.getBoundingClientRect()
    const width = Math.round(rect.width) || node.offsetWidth || 400
    const height = Math.round(rect.height) || node.offsetHeight || 300
    if (width < 30 || height < 30) return null

    // Se o elemento contiver SVG ou for SVG, rasteriza via motor vetorial direto
    const innerSvg = node.tagName.toLowerCase() === 'svg' ? (node as unknown as SVGElement) : node.querySelector('svg')
    if (innerSvg && node.querySelectorAll('input, select, textarea').length === 0) {
      try {
        const blob = await rasterizeSvgElement(innerSvg)
        const base64 = await blobToBase64(blob)
        if (base64 && base64.length <= MAX_BASE64_LENGTH) {
          return {
            mediaType: 'image/jpeg',
            base64,
            alt: node.getAttribute('aria-label') || innerSvg.getAttribute('aria-label') || 'Captura de diagrama/gráfico',
            source: 'visual_snapshot',
            captureStatus: 'captured',
            textContext: extractTextContextForImage(innerSvg),
          }
        }
      } catch {}
    }

    // Se o nó for um canvas
    if (node instanceof HTMLCanvasElement) {
      try {
        const blob = await compressImage(node)
        const base64 = await blobToBase64(blob)
        if (base64) {
          return {
            mediaType: 'image/jpeg',
            base64,
            alt: node.getAttribute('aria-label') || 'Captura de canvas visual',
            source: 'canvas_snapshot',
            captureStatus: 'captured',
          }
        }
      } catch {}
    }

    // Detectar cor de fundo
    let bgColor = '#ffffff'
    try {
      let cur: HTMLElement | null = node
      while (cur && cur !== document.documentElement) {
        const cs = window.getComputedStyle ? window.getComputedStyle(cur) : null
        const bg = cs?.backgroundColor
        if (bg && bg !== 'transparent' && bg !== 'rgba(0, 0, 0, 0)') {
          bgColor = bg
          break
        }
        cur = cur.parentElement
      }
    } catch {}

    const clone = node.cloneNode(true) as HTMLElement
    const origElements = Array.from(node.querySelectorAll('*'))
    const cloneElements = Array.from(clone.querySelectorAll('*'))

    for (let i = 0; i < Math.min(origElements.length, cloneElements.length); i++) {
      const orig = origElements[i] as HTMLElement
      const dest = cloneElements[i] as HTMLElement
      if (!orig || !dest || !dest.style) continue
      try {
        const cs = window.getComputedStyle(orig)
        dest.style.color = cs.color
        dest.style.backgroundColor = cs.backgroundColor
        dest.style.borderColor = cs.borderColor
        dest.style.borderWidth = cs.borderWidth
        dest.style.borderStyle = cs.borderStyle
        dest.style.fontSize = cs.fontSize
        dest.style.fontFamily = cs.fontFamily
        dest.style.fontWeight = cs.fontWeight
        dest.style.lineHeight = cs.lineHeight
        dest.style.letterSpacing = cs.letterSpacing
        dest.style.textAlign = cs.textAlign
      } catch {}
    }

    const scale = Math.min(2, Math.max(1, 1200 / Math.max(width, height)))
    const targetW = Math.round(width * scale)
    const targetH = Math.round(height * scale)

    const foreignHtml = `
      <svg xmlns="http://www.w3.org/2000/svg" width="${targetW}" height="${targetH}" viewBox="0 0 ${width} ${height}">
        <foreignObject width="${width}" height="${height}">
          <div xmlns="http://www.w3.org/1999/xhtml" style="background:${bgColor};width:100%;height:100%;overflow:hidden;box-sizing:border-box;">
            ${clone.outerHTML}
          </div>
        </foreignObject>
      </svg>
    `

    const svgBlob = new Blob([foreignHtml], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(svgBlob)

    try {
      const img = new Image()
      await new Promise<void>((resolve, reject) => {
        const timer = setTimeout(() => reject(new Error('Timeout render ForeignObject')), 2500)
        img.onload = () => { clearTimeout(timer); resolve() }
        img.onerror = () => { clearTimeout(timer); reject(new Error('Falha ao carregar ForeignObject')) }
        img.src = url
      })

      const canvas = document.createElement('canvas')
      canvas.width = targetW
      canvas.height = targetH
      const ctx = canvas.getContext('2d', { alpha: false })
      if (ctx) {
        ctx.fillStyle = bgColor
        ctx.fillRect(0, 0, targetW, targetH)
        ctx.drawImage(img, 0, 0, targetW, targetH)

        const blob = await new Promise<Blob | null>((res) => canvas.toBlob(res, 'image/jpeg', 0.90))
        if (blob) {
          const base64 = await blobToBase64(blob)
          if (base64 && base64.length <= MAX_BASE64_LENGTH) {
            return {
              mediaType: 'image/jpeg',
              base64,
              alt: node.getAttribute('aria-label') || 'Captura visual da área (print-like)',
              source: 'element_snapshot',
              captureStatus: 'captured',
              textContext: extractTextContextForImage(node),
            }
          }
        }
      }
    } finally {
      URL.revokeObjectURL(url)
    }
  } catch (err) {
    console.warn('[EasyQuiz] Snapshot visual do nó:', err)
  }
  return null
}

// ============================================================
// VALIDAÇÃO DE RELEVÂNCIA DE IMAGEM
// ============================================================
/**
 * Determina se uma imagem é visualmente relevante para o contexto da questão
 * (não é ícone, logo, ornamento, avatar, etc.)
 */
export function validateImageRelevance(el: Element, alt: string, width: number, height: number): boolean {
  // 1. Se dimensoes são 0 (imagem não carregada) tenta via getBoundingClientRect
  if (width <= 0 || height <= 0) {
    const rect = typeof el.getBoundingClientRect === 'function' ? el.getBoundingClientRect() : { width: 0, height: 0 }
    width = rect.width || width
    height = rect.height || height
    // Se ainda for 0 após rect, verifica se tem src (potencialmente relevante) ou é claramente um ícone
    if (width <= 0 || height <= 0) {
      // Sem dimensoes: aceita se tiver alt/src relevante, rejeita orn/icon
      const decorativeOnly = /\b(icon|logo|avatar|badge|emoji|spinner|loading)\b/i
      if (alt && decorativeOnly.test(alt)) return false
      const srcStr = el instanceof HTMLImageElement ? (el.src || '') : ''
      if (srcStr && /\/icons?\/|\/logos?\/|\/avatars?\/|\/badges?\//i.test(srcStr)) return false
      // Sem informações suficientes — inclui se tiver src ou alt não vazio
      return !!(srcStr || alt)
    }
  }

  // 2. Dimensão mínima: imagens menores que 48x48 são certamente ícones
  if (width < 48 || height < 48) return false

  // 3. Proporção extrema sugere separador/banner decorativo (ex: 1000x8)
  const ratio = Math.max(width, height) / Math.max(1, Math.min(width, height))
  if (ratio > 15) return false

  // 4. Atributos ou classes indicativas de ornamento/ícone/avatar/logo
  const classStr = el.getAttribute('class') || ''
  const ariaHidden = el.getAttribute('aria-hidden')
  const role = el.getAttribute('role')
  const srcStr = el instanceof HTMLImageElement ? (el.src || '') : ''

  if (ariaHidden === 'true') return false
  if (role === 'presentation' || role === 'none') return false

  const decorativePatterns = /\b(icon|logo|avatar|badge|emoji|decoration|ornament|spinner|loading|thumbnail|profile|photo)\b/i
  if (decorativePatterns.test(classStr)) return false
  if (alt && decorativePatterns.test(alt)) return false
  if (srcStr && /\/icons?\/|\/logos?\/|\/avatars?\/|\/badges?\/|\/emojis?\//i.test(srcStr)) return false

  // 5. Alt text vazio ou apresentacional geralmente = decoração
  if (alt === '' || alt === ' ' || alt === '-') return false

  // 6. Imagens que claramente são de conteúdo (gráficos, tabelas, mapas, diagramas)
  const contentPatterns = /\b(graph|chart|diagram|table|map|formula|equation|figure|plot|curve|histogram|scatter|matrix|image|foto|imagem|gráfico|tabela|mapa|fórmula|questão|enunciado|stimulus)\b/i
  if (contentPatterns.test(alt) || contentPatterns.test(classStr)) return true

  // 7. Se a imagem está dentro de um container de questão/enunciado = relevante
  const questionContainer = el.closest(
    '[data-question], [class*="question" i], [class*="prompt" i], [class*="stimulus" i], [class*="enunciado" i], [class*="statement" i], article, .problem, .exercise'
  )
  if (questionContainer) return true

  // 8. Por padrão: aceita se dimensão razoável (≥80x80)
  return width >= 80 && height >= 80
}

// ============================================================
// EXTRAÇÃO DE CONTEXTO TEXTUAL (fallback quando captura falha)
// ============================================================
/**
 * Extrai contexto textual de uma imagem quando não foi possível capturá-la visualmente.
 * Usa alt, figcaption, aria-label, title e texto vizinho.
 */
export function extractTextContextForImage(el: Element): string {
  const parts: string[] = []

  // 1. Alt text
  const alt = el.getAttribute('alt') || el.getAttribute('aria-label') || el.getAttribute('title') || ''
  if (alt && alt.length > 2) parts.push(`Alt: "${alt}"`)

  // 2. Figcaption próxima
  const figure = el.closest('figure')
  const figcaption = figure?.querySelector('figcaption')
  const captionText = figcaption?.textContent?.trim()
  if (captionText && captionText.length > 2) parts.push(`Legenda: "${captionText}"`)

  // 3. Aria-describedby
  const describedById = el.getAttribute('aria-describedby')
  if (describedById) {
    const descEl = document.getElementById(describedById)
    const descText = descEl?.textContent?.trim()
    if (descText) parts.push(`Descrição: "${descText.slice(0, 200)}"`)
  }

  // 4. Texto do container pai mais próximo com conteúdo substancial
  const parent = el.parentElement
  if (parent) {
    const parentText = cleanText(parent.textContent || '', 300)
    // Só usa o texto do pai se for diferente do alt e tiver conteúdo
    if (parentText && parentText.length > 5 && parentText !== alt) {
      parts.push(`Contexto: "${parentText.slice(0, 200)}"`)
    }
  }

  // 5. Rótulos e textos internos de elementos SVG
  if (el.tagName.toLowerCase() === 'svg') {
    const textNodes = Array.from(el.querySelectorAll('text, tspan'))
      .map((t) => t.textContent?.trim())
      .filter(Boolean)
    if (textNodes.length > 0) {
      parts.push(`Rótulos/Textos do Gráfico: "${textNodes.join(' | ')}"`)
    }
  }

  // 6. Data attributes descritivos
  const dataAlt = el.getAttribute('data-alt') || el.getAttribute('data-description') || ''
  if (dataAlt) parts.push(`Data: "${dataAlt}"`)

  if (parts.length === 0) return ''
  return parts.join(' | ')
}

// ============================================================
// CAPTURA DE IMAGEM — 6 ESTRATÉGIAS + FALLBACK TEXTUAL
// ============================================================

async function captureImageElement(img: HTMLImageElement): Promise<CapturedImage | null> {
  const src = img.currentSrc || img.src
  if (!src) return null
  const alt = (img.alt || img.getAttribute('aria-label') || 'Imagem da questão').slice(0, 500)

  // Estratégia 1: Canvas direto (funciona para mesma origem, data: e blob:)
  if (img.complete && img.naturalWidth > 0) {
    try {
      const blob = await compressImage(img)
      const base64 = await blobToBase64(blob)
      if (base64 && base64.length <= MAX_BASE64_LENGTH) {
        return {
          mediaType: 'image/jpeg',
          base64,
          alt,
          source: src.slice(0, 2000),
          captureStatus: 'captured',
          textContext: extractTextContextForImage(img),
        }
      }
    } catch {
      // Tainted canvas ou dimensão inválida — passa para próxima estratégia
    }
  }

  // Estratégia 2: fetch CORS normal
  try {
    const res = await fetch(src, { mode: 'cors' })
    if (res.ok) {
      const blob = await res.blob()
      if (blob.type.startsWith('image/')) {
        const bitmap = await createImageBitmap(blob)
        const compressed = await compressImage(bitmap)
        bitmap.close()
        const base64 = await blobToBase64(compressed)
        if (base64 && base64.length <= MAX_BASE64_LENGTH) {
          return {
            mediaType: 'image/jpeg',
            base64,
            alt,
            source: src.slice(0, 2000),
            captureStatus: 'captured',
            textContext: extractTextContextForImage(img),
          }
        }
      }
    }
  } catch {
    // CORS bloqueado
  }

  // Estratégia 3: Bypass via Proxies CORS Transparentes (para sites que bloqueiam cross-origin)
  if (src.startsWith('http')) {
    const proxies = [
      `https://corsproxy.io/?${encodeURIComponent(src)}`,
      `https://api.allorigins.win/raw?url=${encodeURIComponent(src)}`,
    ]
    for (const proxyUrl of proxies) {
      try {
        const controller = new AbortController()
        const tid = setTimeout(() => controller.abort(), 3000)
        const pRes = await fetch(proxyUrl, { signal: controller.signal })
        clearTimeout(tid)
        if (pRes.ok) {
          const pBlob = await pRes.blob()
          if (pBlob.type.startsWith('image/') || pBlob.size > 200) {
            const bitmap = await createImageBitmap(pBlob)
            const compressed = await compressImage(bitmap)
            bitmap.close()
            const base64 = await blobToBase64(compressed)
            if (base64 && base64.length <= MAX_BASE64_LENGTH) {
              return {
                mediaType: 'image/jpeg',
                base64,
                alt,
                source: src.slice(0, 2000),
                captureStatus: 'captured',
                textContext: extractTextContextForImage(img),
              }
            }
          }
        }
      } catch {}
    }
  }

  // Estratégia 4: Snapshot visual "Print-like" do elemento renderizado no DOM
  const parentNode = (img.parentElement || img) as HTMLElement
  const snapshot = await captureElementVisualSnapshot(parentNode)
  if (snapshot) return snapshot

  // Estratégia 5: Fallback textual detalhado (metadados, alt, figcaption, vizinhança)
  const textCtx = extractTextContextForImage(img)
  if (textCtx || alt) {
    return {
      mediaType: 'image/jpeg',
      base64: '',
      alt,
      source: src.slice(0, 2000),
      captureStatus: 'text_only',
      textContext: textCtx || `Imagem da questão (src: ${src.slice(0, 100)})`,
    }
  }

  return null
}

// ============================================================
// CONTEXTO ASSOCIADO À MÍDIA
// ============================================================
function hasMeaningfulSvgGraphics(svg: SVGElement): boolean {
  const shapeCount = svg.querySelectorAll('path, line, polyline, polygon, circle, rect, text, image').length
  return shapeCount > 0
}

function getBackgroundImageUrl(el: HTMLElement): string | null {
  try {
    const style = el.style.backgroundImage || (window.getComputedStyle ? window.getComputedStyle(el).backgroundImage : '')
    if (style && style.includes('url(')) {
      const match = style.match(/url\(["']?([^"')]+)["']?\)/)
      if (match && match[1] && !match[1].startsWith('data:image/svg+xml')) {
        return match[1]
      }
    }
  } catch {}
  return null
}

export function findAssociatedContextForMedia(
  el: Element,
  scope: HTMLElement,
): { associatedLabel: string; targetControlId?: string } {
  // 1. Verifica se está contido em um container de alternativa (card, botão, label, li, tr)
  const optionContainer = el.closest(
    '[data-easyquiz-id], button, [role="button"], [role="radio"], [role="checkbox"], [role="option"], label, .option-card, .quiz-option, .choice, .answer, [class*="option" i], [class*="choice" i], [class*="answer" i], li, tr',
  ) as HTMLElement | null

  if (optionContainer && optionContainer !== scope && isVisible(optionContainer)) {
    if (!isNavigationControl(optionContainer) && !isUtilityOrGamificationControl(optionContainer)) {
      const controlId = optionContainer.dataset.easyquizId || optionContainer.id || undefined
      const textLabel = cleanText(optionContainer.innerText || optionContainer.textContent || '', 120)
      const ariaLabel = optionContainer.getAttribute('aria-label') || optionContainer.getAttribute('title') || ''

      const bestLabel = textLabel || ariaLabel
      const idHint = controlId ? ` [id: ${controlId}]` : ''

      if (bestLabel) {
        return {
          associatedLabel: `Alternativa/Opção: "${bestLabel}"${idHint}`,
          targetControlId: controlId,
        }
      }
      if (controlId) {
        return {
          associatedLabel: `Alternativa/Opção ${idHint}`,
          targetControlId: controlId,
        }
      }
    }
  }

  // 2. Verifica se está em uma legenda ou figura explicativa
  const figureCaption = el.closest('figure')?.querySelector('figcaption')?.textContent?.trim()
  if (figureCaption) {
    return { associatedLabel: `Figura do Enunciado: "${cleanText(figureCaption, 100)}"` }
  }

  // 3. Verifica se está próximo a um cabeçalho ou texto de pergunta
  const promptHeading = el.closest(
    '[class*="prompt" i], [class*="stimulus" i], [class*="question-text" i], [class*="statement" i], header, h1, h2, h3, h4, p',
  )
  if (promptHeading) {
    const text = cleanText(promptHeading.textContent || '', 80)
    if (text) {
      return { associatedLabel: `Gráfico do Enunciado: "${text}"` }
    }
  }

  return { associatedLabel: 'Gráfico/Imagem do Enunciado Principal' }
}

// ============================================================
// CAPTURA PRINCIPAL — ORQUESTRAÇÃO MULTI-TIPO
// ============================================================

export async function captureImages(scope: HTMLElement, enabled = true): Promise<CapturedImage[]> {
  if (!enabled) return []
  const captures: CapturedImage[] = []
  let totalLength = 0
  const maxTotalPayload = 3_500_000

  const pushCapture = (cap: CapturedImage | null, el: Element): boolean => {
    if (!cap) return false

    // Imagens text_only não consomem payload mas são incluídas para contexto
    const payloadSize = cap.base64 ? cap.base64.length : 0
    if (payloadSize > 0 && totalLength + payloadSize > maxTotalPayload) return false

    const meta = findAssociatedContextForMedia(el, scope)
    cap.associatedLabel = meta.associatedLabel
    cap.targetControlId = meta.targetControlId
    cap.element = el

    captures.push(cap)
    totalLength += payloadSize

    // Limite máximo de imagens visuais capturadas
    const visualCaptures = captures.filter(c => c.captureStatus === 'captured').length
    return visualCaptures >= MAX_IMAGES
  }

  // 1. Imagens nativas (<img>)
  const images = Array.from(scope.querySelectorAll('img')).filter(
    (el) => isVisible(el) && !isUtilityOrGamificationControl(el),
  )
  for (const img of images) {
    try {
      // Usa naturalWidth/naturalHeight e fallback para getBoundingClientRect
      const rect = img.getBoundingClientRect()
      const w = img.naturalWidth || rect.width || img.width || 0
      const h = img.naturalHeight || rect.height || img.height || 0
      const alt = img.alt || ''

      // Valida relevância antes de tentar capturar
      if (!validateImageRelevance(img, alt, w, h)) continue

      const cap = await captureImageElement(img)
      if (pushCapture(cap, img)) return captures
    } catch {}
  }

  // 2. Gráficos Vetoriais (<svg>)
  const svgs = Array.from(scope.querySelectorAll('svg')).filter((svg) => {
    if (!isVisible(svg) || isUtilityOrGamificationControl(svg)) return false
    const rect = typeof svg.getBoundingClientRect === 'function' ? svg.getBoundingClientRect() : { width: 0, height: 0 }
    const width = rect.width || parseFloat(svg.getAttribute('width') || '0')
    const height = rect.height || parseFloat(svg.getAttribute('height') || '0')
    if (width < 30 || height < 30) return false
    return hasMeaningfulSvgGraphics(svg)
  })

  for (const svg of svgs) {
    try {
      const blob = await rasterizeSvgElement(svg)
      const base64 = await blobToBase64(blob)
      if (base64) {
        const textCtx = extractTextContextForImage(svg)
        const cap: CapturedImage = {
          mediaType: 'image/jpeg',
          base64,
          alt: svg.getAttribute('aria-label') || 'Gráfico/Diagrama vetorial da questão',
          source: 'svg',
          captureStatus: 'captured',
          textContext: textCtx,
        }
        if (pushCapture(cap, svg)) return captures
      }
    } catch {
      const container = (svg.closest('.trig-diagram-container, [class*="diagram" i], [class*="graph" i], figure') || svg.parentElement || svg) as HTMLElement
      const fallbackCap = await captureElementVisualSnapshot(container)
      if (fallbackCap) {
        if (pushCapture(fallbackCap, svg)) return captures
      } else {
        // Extrai contexto textual do SVG
        const textCtx = extractTextContextForImage(svg)
        if (textCtx) {
          const textCap: CapturedImage = {
            mediaType: 'image/jpeg',
            base64: '',
            alt: svg.getAttribute('aria-label') || 'Gráfico vetorial',
            source: 'svg',
            captureStatus: 'text_only',
            textContext: textCtx,
          }
          pushCapture(textCap, svg)
        }
      }
    }
  }

  // 3. Canvas
  if (captures.filter(c => c.captureStatus === 'captured').length < MAX_IMAGES) {
    const canvases = Array.from(scope.querySelectorAll('canvas')).filter(
      (c) => isVisible(c) && !isUtilityOrGamificationControl(c),
    )
    for (const cnv of canvases) {
      try {
        const blob = await compressImage(cnv)
        const base64 = await blobToBase64(blob)
        if (base64) {
          const cap: CapturedImage = {
            mediaType: 'image/jpeg',
            base64,
            alt: cnv.getAttribute('aria-label') || 'Gráfico Canvas inline',
            source: 'canvas',
            captureStatus: 'captured',
          }
          if (pushCapture(cap, cnv)) return captures
        }
      } catch {
        const raster = await captureElementVisualSnapshot((cnv.parentElement || cnv) as HTMLElement)
        if (pushCapture(raster, cnv)) return captures
      }
    }
  }

  // 4. CSS background-image
  if (captures.filter(c => c.captureStatus === 'captured').length < MAX_IMAGES) {
    const bgElements = Array.from(scope.querySelectorAll<HTMLElement>('[style*="background-image"], .option-image, .question-media')).filter(
      (el) => isVisible(el) && !isUtilityOrGamificationControl(el),
    )
    for (const bgEl of bgElements) {
      const url = getBackgroundImageUrl(bgEl)
      if (!url) continue

      const rect = bgEl.getBoundingClientRect()
      if (!validateImageRelevance(bgEl, bgEl.getAttribute('aria-label') || '', rect.width, rect.height)) continue

      try {
        const res = await fetch(url, { mode: 'cors' })
        if (res.ok) {
          const blob = await res.blob()
          if (blob.type.startsWith('image/')) {
            const bitmap = await createImageBitmap(blob)
            const compressed = await compressImage(bitmap)
            bitmap.close()
            const base64 = await blobToBase64(compressed)
            if (base64) {
              const cap: CapturedImage = {
                mediaType: 'image/jpeg',
                base64,
                alt: 'Imagem de fundo da alternativa',
                source: url.slice(0, 2000),
                captureStatus: 'captured',
              }
              if (pushCapture(cap, bgEl)) return captures
            }
          }
        }
      } catch {
        // Tenta no-cors
        try {
          const res2 = await fetch(url, { mode: 'no-cors' })
          const blob2 = await res2.blob()
          if (blob2.size > 100) {
            const bitmap2 = await createImageBitmap(blob2)
            const compressed2 = await compressImage(bitmap2)
            bitmap2.close()
            const base64b = await blobToBase64(compressed2)
            if (base64b && base64b.length > 100) {
              const cap: CapturedImage = { mediaType: 'image/jpeg', base64: base64b, alt: 'Imagem CSS background', source: url.slice(0, 2000), captureStatus: 'captured' }
              if (pushCapture(cap, bgEl)) return captures
            }
          }
        } catch {}
      }
    }
  }

  return captures
}
