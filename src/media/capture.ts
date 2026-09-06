import type { CapturedImage } from '../core/types'
import { cleanText, isNavigationControl, isUtilityOrGamificationControl, isVisible } from '../dom/controls'

const MAX_IMAGES = 10
const MAX_DIMENSION = 1_400
const MAX_BASE64_LENGTH = 1_500_000

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

// CAPTURA DE GRÁFICOS SVG: Rasterização a 2x de resolução para preservar eixos numéricos e curvas
async function rasterizeSvgElement(svgEl: SVGElement): Promise<Blob> {
  const rect = typeof svgEl.getBoundingClientRect === 'function' ? svgEl.getBoundingClientRect() : { width: 0, height: 0 }
  const rawWidth =
    rect.width ||
    parseFloat(svgEl.getAttribute('width') || '0') ||
    parseFloat(svgEl.style.width || '0') ||
    400
  const rawHeight =
    rect.height ||
    parseFloat(svgEl.getAttribute('height') || '0') ||
    parseFloat(svgEl.style.height || '0') ||
    300

  // 2x scale para gráficos, geometria e eixos cartesianos nítidos
  const scale = 2
  const targetWidth = Math.min(1800, Math.max(120, Math.round(rawWidth * scale)))
  const targetHeight = Math.min(1800, Math.max(100, Math.round(rawHeight * scale)))

  const clone = svgEl.cloneNode(true) as SVGElement
  if (!clone.getAttribute('xmlns')) {
    clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
  }
  clone.setAttribute('width', String(targetWidth))
  clone.setAttribute('height', String(targetHeight))

  if (!clone.getAttribute('viewBox') && rawWidth > 0 && rawHeight > 0) {
    clone.setAttribute('viewBox', `0 0 ${rawWidth} ${rawHeight}`)
  }

  const serializer = new XMLSerializer()
  const svgString = serializer.serializeToString(clone)
  const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' })
  const url = URL.createObjectURL(svgBlob)

  try {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve()
      img.onerror = () => reject(new Error('Falha ao renderizar SVG em Image.'))
      img.src = url
    })

    const canvas = document.createElement('canvas')
    canvas.width = targetWidth
    canvas.height = targetHeight
    const ctx = canvas.getContext('2d', { alpha: false })
    if (!ctx) throw new Error('Sem suporte a Canvas 2D.')

    ctx.fillStyle = '#ffffff'
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
    URL.revokeObjectURL(url)
  }
}

// CAPTURA SUPREMA: ForeignObject Rasterization para nós HTML complexos
async function rasterizeHtmlNode(node: HTMLElement): Promise<CapturedImage | null> {
  try {
    const clone = node.cloneNode(true) as HTMLElement
    const width = node.offsetWidth || 500
    const height = node.offsetHeight || 500

    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
        <foreignObject width="100%" height="100%">
          <div xmlns="http://www.w3.org/1999/xhtml" style="background:#fff;font-family:sans-serif;">
            ${clone.innerHTML}
          </div>
        </foreignObject>
      </svg>
    `
    const svgBlob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(svgBlob)

    const img = new Image()
    img.crossOrigin = 'anonymous'
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve()
      img.onerror = () => reject(new Error('Falha ao renderizar ForeignObject.'))
      img.src = url
    })

    const blob = await compressImage(img)
    const base64 = await blobToBase64(blob)
    URL.revokeObjectURL(url)

    if (base64 && base64.length <= MAX_BASE64_LENGTH) {
      return { mediaType: 'image/jpeg', base64, alt: 'Captura via rasterização DOM', source: 'rasterized' }
    }
  } catch (err) {
    console.warn('Falha na rasterização do nó:', err)
  }
  return null
}

// Determina qual alternativa ou parte da questão esta imagem pertence
export function findAssociatedContextForMedia(
  el: Element,
  scope: HTMLElement,
): { associatedLabel: string; targetControlId?: string } {
  // 1. Verifica se está contido em um container de alternativa (card, botão, label, li, tr)
  const optionContainer = el.closest(
    '[data-easyquiz-id], button, [role="button"], [role="radio"], [role="checkbox"], [role="option"], label, .option-card, .quiz-option, .choice, .answer, [class*="option" i], [class*="choice" i], [class*="answer" i], li, tr',
  ) as HTMLElement | null

  if (optionContainer && optionContainer !== scope && isVisible(optionContainer)) {
    // Ignora botões utilitários ou de navegação do site
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

async function captureImageElement(img: HTMLImageElement): Promise<CapturedImage | null> {
  const src = img.currentSrc || img.src
  if (!src) return null
  const alt = (img.alt || img.getAttribute('aria-label') || 'Imagem da questão').slice(0, 500)

  // 1. Imagem carregada no DOM (ou base64)
  if (img.complete && img.naturalWidth > 0) {
    try {
      const blob = await compressImage(img)
      const base64 = await blobToBase64(blob)
      if (base64 && base64.length <= MAX_BASE64_LENGTH) {
        return { mediaType: 'image/jpeg', base64, alt, source: src.slice(0, 2000) }
      }
    } catch {
      // Ignora erro de tainted canvas e tenta via fetch
    }
  }

  // 2. Fetch direto
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
          return { mediaType: 'image/jpeg', base64, alt, source: src.slice(0, 2000) }
        }
      }
    }
  } catch {
    // 3. Fallback: rasterização do container
    return rasterizeHtmlNode(img.parentElement || img)
  }

  return null
}

function hasMeaningfulSvgGraphics(svg: SVGElement): boolean {
  // Gráficos e funções matemáticas usam caminhos, linhas, polígonos, círculos ou texto
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

export async function captureImages(scope: HTMLElement, enabled = true): Promise<CapturedImage[]> {
  if (!enabled) return []
  const captures: CapturedImage[] = []
  let totalLength = 0
  const maxTotalPayload = 3_500_000

  const pushCapture = (cap: CapturedImage | null, el: Element): boolean => {
    if (!cap || !cap.base64) return false
    if (totalLength + cap.base64.length > maxTotalPayload) return false

    const meta = findAssociatedContextForMedia(el, scope)
    cap.associatedLabel = meta.associatedLabel
    cap.targetControlId = meta.targetControlId

    captures.push(cap)
    totalLength += cap.base64.length
    return captures.length >= MAX_IMAGES
  }

  // 1. Imagens nativas (<img>)
  const images = Array.from(scope.querySelectorAll('img')).filter(
    (el) => isVisible(el) && !isUtilityOrGamificationControl(el),
  )
  for (const img of images) {
    try {
      const cap = await captureImageElement(img)
      if (pushCapture(cap, img)) return captures
    } catch {}
  }

  // 2. Gráficos Vetoriais (<svg>) diretos na página (Khan Academy, Quizizz, Desmos, etc.)
  const svgs = Array.from(scope.querySelectorAll('svg')).filter((svg) => {
    if (!isVisible(svg) || isUtilityOrGamificationControl(svg)) return false
    const rect = typeof svg.getBoundingClientRect === 'function' ? svg.getBoundingClientRect() : { width: 0, height: 0 }
    const width = rect.width || parseFloat(svg.getAttribute('width') || '0')
    const height = rect.height || parseFloat(svg.getAttribute('height') || '0')
    // Rejeita ícones minúsculos (< 30px) e exige elementos gráficos internos
    if (width < 30 || height < 30) return false
    return hasMeaningfulSvgGraphics(svg)
  })

  for (const svg of svgs) {
    try {
      const blob = await rasterizeSvgElement(svg)
      const base64 = await blobToBase64(blob)
      if (base64) {
        const cap: CapturedImage = {
          mediaType: 'image/jpeg',
          base64,
          alt: svg.getAttribute('aria-label') || 'Gráfico/Diagrama vetorial da questão',
          source: 'svg',
        }
        if (pushCapture(cap, svg)) return captures
      }
    } catch {
      // Fallback: se rasterizeSvgElement falhar, tenta via rasterizeHtmlNode
      const fallbackCap = await rasterizeHtmlNode(svg.parentElement || (svg as unknown as HTMLElement))
      if (pushCapture(fallbackCap, svg)) return captures
    }
  }

  // 3. Gráficos renderizados em <canvas>
  if (captures.length < MAX_IMAGES) {
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
          }
          if (pushCapture(cap, cnv)) return captures
        }
      } catch {
        const raster = await rasterizeHtmlNode(cnv.parentElement || cnv)
        if (pushCapture(raster, cnv)) return captures
      }
    }
  }

  // 4. Elementos com imagens em CSS background-image (comum em cards de Quizizz)
  if (captures.length < MAX_IMAGES) {
    const bgElements = Array.from(scope.querySelectorAll<HTMLElement>('[style*="background-image"], .option-image, .question-media')).filter(
      (el) => isVisible(el) && !isUtilityOrGamificationControl(el),
    )
    for (const bgEl of bgElements) {
      const url = getBackgroundImageUrl(bgEl)
      if (!url) continue
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
              }
              if (pushCapture(cap, bgEl)) return captures
            }
          }
        }
      } catch {}
    }
  }

  return captures
}

