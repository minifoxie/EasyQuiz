import type { CapturedImage } from '../core/types'
import { isVisible } from '../dom/controls'

const MAX_IMAGES = 4
const MAX_DIMENSION = 1_200
const MAX_BASE64_LENGTH = 1_200_000

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
      (blob) => blob ? resolve(blob) : reject(new Error('Falha compressão.')),
      'image/jpeg',
      0.8,
    )
  })
}

// CAPTURA SUPREMA: SVG ForeignObject Rasterization
// Tenta clonar um nodo HTML que falhou e desenhá-lo diretamente no canvas via SVG.
async function rasterizeHtmlNode(node: HTMLElement): Promise<CapturedImage | null> {
  try {
    const clone = node.cloneNode(true) as HTMLElement
    // Limpa links quebrados e styles complexos para evitar taint no SVG
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
    await new Promise((resolve, reject) => {
      img.onload = resolve
      img.onerror = reject
      img.src = url
    })
    
    const blob = await compressImage(img)
    const base64 = await blobToBase64(blob)
    URL.revokeObjectURL(url)
    
    if (base64 && base64.length <= MAX_BASE64_LENGTH) {
      return { mediaType: 'image/jpeg', base64, alt: 'Captura Suprema via rasterização DOM', source: 'rasterized' }
    }
  } catch (err) {
    console.warn('Falha na rasterização suprema:', err)
  }
  return null
}

async function captureImageElement(img: HTMLImageElement): Promise<CapturedImage | null> {
  const src = img.currentSrc || img.src
  if (!src) return null
  const alt = (img.alt || img.getAttribute('aria-label') || 'Imagem da questão').slice(0, 500)

  // 1. Imagem carregada sem CORS restrito (ou Base64 inline)
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

  // 2. Tentar fetch direto
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
    // 3. Fallback Supremo: Clona o próprio container da imagem para tentar capturar SVG 
    return rasterizeHtmlNode(img.parentElement || img)
  }

  return null
}

export async function captureImages(scope: HTMLElement): Promise<CapturedImage[]> {
  const captures: CapturedImage[] = []
  let totalLength = 0

  const images = Array.from(scope.querySelectorAll('img')).filter(isVisible).slice(0, MAX_IMAGES)
  for (const img of images) {
    try {
      const cap = await captureImageElement(img)
      if (cap && totalLength + cap.base64.length <= 2_500_000) {
        captures.push(cap)
        totalLength += cap.base64.length
        if (captures.length >= MAX_IMAGES) break
      }
    } catch { }
  }

  if (captures.length < MAX_IMAGES) {
    const canvases = Array.from(scope.querySelectorAll('canvas')).filter(isVisible).slice(0, MAX_IMAGES)
    for (const cnv of canvases) {
      try {
        const blob = await compressImage(cnv)
        const base64 = await blobToBase64(blob)
        if (base64 && totalLength + base64.length <= 2_500_000) {
          captures.push({ mediaType: 'image/jpeg', base64, alt: 'Canvas inline', source: 'canvas' })
          totalLength += base64.length
          if (captures.length >= MAX_IMAGES) break
        }
      } catch {
        // Fallback supremo se canvas for tainted
        const raster = await rasterizeHtmlNode(cnv.parentElement || cnv)
        if (raster) {
          captures.push(raster)
          totalLength += raster.base64.length
        }
      }
    }
  }

  return captures
}
