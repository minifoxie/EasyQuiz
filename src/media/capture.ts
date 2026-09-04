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
      const base64 = res.split(',')[1] || ''
      resolve(base64)
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
  } else if (source instanceof HTMLCanvasElement) {
    width = source.width
    height = source.height
  } else {
    width = source.width
    height = source.height
  }

  if (width <= 0 || height <= 0) {
    throw new Error('Dimensões de imagem inválidas.')
  }

  const scale = Math.min(1, MAX_DIMENSION / Math.max(width, height))
  const targetWidth = Math.max(1, Math.round(width * scale))
  const targetHeight = Math.max(1, Math.round(height * scale))

  const canvas = document.createElement('canvas')
  canvas.width = targetWidth
  canvas.height = targetHeight
  const ctx = canvas.getContext('2d', { alpha: false })
  if (!ctx) throw new Error('Contexto Canvas 2D indisponível.')

  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, targetWidth, targetHeight)
  ctx.drawImage(source as CanvasImageSource, 0, 0, targetWidth, targetHeight)

  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob)
        else reject(new Error('Falha ao gerar blob comprimido.'))
      },
      'image/jpeg',
      0.8,
    )
  })
}

async function captureImageElement(img: HTMLImageElement): Promise<CapturedImage | null> {
  const src = img.currentSrc || img.src
  if (!src) return null
  const alt = (img.alt || img.getAttribute('aria-label') || 'Imagem da questão').slice(0, 500)

  // 1. Se já está carregada no DOM e com dimensões válidas
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

  // 2. Tentar fetch direto CORS
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
    // Falha silenciosa: a imagem remota é protegida, continuaremos com o contexto textual
  }

  return null
}

async function captureCanvasElement(canvas: HTMLCanvasElement): Promise<CapturedImage | null> {
  try {
    const blob = await compressImage(canvas)
    const base64 = await blobToBase64(blob)
    if (base64 && base64.length <= MAX_BASE64_LENGTH) {
      return {
        mediaType: 'image/jpeg',
        base64,
        alt: 'Canvas da questão',
        source: 'canvas-inline',
      }
    }
  } catch {
    // Canvas protegido
  }
  return null
}

export async function captureImages(scope: HTMLElement): Promise<CapturedImage[]> {
  const captures: CapturedImage[] = []
  let totalLength = 0

  // 1. Imagens comuns
  const images = Array.from(scope.querySelectorAll('img')).filter(isVisible).slice(0, MAX_IMAGES)
  for (const img of images) {
    try {
      const cap = await captureImageElement(img)
      if (cap && totalLength + cap.base64.length <= 2_500_000) {
        captures.push(cap)
        totalLength += cap.base64.length
        if (captures.length >= MAX_IMAGES) break
      }
    } catch {
      // continua
    }
  }

  // 2. Elementos Canvas (gráficos, esquemas, desenhos)
  if (captures.length < MAX_IMAGES) {
    const canvases = Array.from(scope.querySelectorAll('canvas')).filter(isVisible).slice(0, MAX_IMAGES)
    for (const cnv of canvases) {
      try {
        const cap = await captureCanvasElement(cnv)
        if (cap && totalLength + cap.base64.length <= 2_500_000) {
          captures.push(cap)
          totalLength += cap.base64.length
          if (captures.length >= MAX_IMAGES) break
        }
      } catch {
        // continua
      }
    }
  }

  return captures
}
