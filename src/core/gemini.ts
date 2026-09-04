import type { AnalysisPlan, CapturedContext, CapturedImage, EasyQuizSettings, ModelOption } from './types'
import { buildUserPrompt, SYSTEM_PROMPT } from './prompt'

export const AVAILABLE_MODELS: ModelOption[] = [
  {
    id: 'gemini-2.5-flash',
    name: 'Gemini 2.5 Flash (Oficial 2026 - Padrão)',
    description: 'Mais rápido, econômico e disponível universalmente em todas as contas do Google AI Studio.',
  },
  {
    id: 'gemini-2.5-pro',
    name: 'Gemini 2.5 Pro (Raciocínio Avançado)',
    description: 'Alta capacidade de raciocínio lógico, resolução de problemas complexos e código.',
  },
  {
    id: 'gemini-2.0-flash',
    name: 'Gemini 2.0 Flash (Alta Velocidade)',
    description: 'Geração multimodal ultrarrápida de baixa latência.',
  },
  {
    id: 'gemini-2.0-flash-lite',
    name: 'Gemini 2.0 Flash Lite (Ultra Leve)',
    description: 'Consumo mínimo de cota com resposta instantânea.',
  },
  {
    id: 'gemini-1.5-flash',
    name: 'Gemini 1.5 Flash (Compatibilidade Ampla)',
    description: 'Suporte universal de alta compatibilidade em contas legadas.',
  },
  {
    id: 'gemini-1.5-pro',
    name: 'Gemini 1.5 Pro (Legado)',
    description: 'Modelo de raciocínio para contas legadas.',
  },
]

const GEMINI_JSON_SCHEMA = {
  type: 'OBJECT',
  properties: {
    pageType: { type: 'STRING', enum: ['question', 'info', 'start', 'conclusion'] },
    mode: {
      type: 'STRING',
      enum: [
        'texto_livre',
        'escolha_unica',
        'escolha_multipla',
        'verdadeiro_falso',
        'preenchimento',
        'acao_sem_resposta',
        'categorizacao',
        'ordenacao',
        'arrastar_soltar',
      ],
    },
    confidence: { type: 'NUMBER' },
    rationale: { type: 'STRING' },
    needsMoreContext: { type: 'BOOLEAN' },
    warnings: { type: 'ARRAY', items: { type: 'STRING' } },
    memoryToStore: { type: 'STRING' },
    actions: {
      type: 'ARRAY',
      items: {
        type: 'OBJECT',
        properties: {
          t: { type: 'STRING', enum: ['val', 'chk', 'sel', 'clk', 'adv', 'js', 'drag'] },
          id: { type: 'STRING' },
          v: {}, // Pode ser string (valor ou código JS) ou array ou omitido
          c: { type: 'BOOLEAN' },
          co: { type: 'ARRAY', items: { type: 'NUMBER' } }, // coordinates
          from: { type: 'STRING' }, // Seletor ou texto de origem (drag)
          to: { type: 'STRING' }, // Seletor ou texto de destino (drag)
        },
        required: ['t'],
      },
    },
  },
  required: ['pageType', 'mode', 'confidence', 'rationale', 'needsMoreContext', 'actions'],
}

function normalizeModel(model: string): string {
  const clean = model.trim().replace(/^google\//, '').replace(/^models\//, '')
  return clean || 'gemini-2.5-flash'
}

function parseGeminiError(errorText: string, status: number): string {
  try {
    const json = JSON.parse(errorText)
    const message = json.error?.message || json.message || ''
    if (/API_KEY_INVALID|API key not valid/i.test(message)) {
      return 'Chave de API do Gemini inválida ou expirada. Verifique no Google AI Studio.'
    }
    if (/RESOURCE_EXHAUSTED|Quota exceeded/i.test(message)) {
      return 'Limite de cota do Gemini (HTTP 429) atingido. Aguarde alguns segundos.'
    }
    if (status === 404 || /not found/i.test(message)) {
      return `Modelo inexistente ou sem permissão na sua conta (HTTP 404)`
    }
    if (status === 503 || /overloaded/i.test(message)) {
      return 'Servidores do Google Gemini sobrecarregados (HTTP 503)'
    }
    if (message) return `Erro Gemini (HTTP ${status}): ${message}`
  } catch {
    // fallback
  }
  return `Falha na requisição ao Gemini (HTTP ${status}).`
}

function robustParsePlan(rawText: string): AnalysisPlan {
  try {
    return JSON.parse(rawText) as AnalysisPlan
  } catch (initialErr) {
    const cleaned = rawText.trim()
    const attempts = [
      cleaned + '}',
      cleaned + ']}',
      cleaned + '"}]}',
      cleaned + '"]}',
      cleaned + '}]}',
      cleaned + '}]}}',
    ]
    for (const attempt of attempts) {
      try {
        const parsed = JSON.parse(attempt) as AnalysisPlan
        if (parsed && typeof parsed === 'object') return parsed
      } catch {}
    }
    throw new Error(`Falha ao decodificar JSON da IA (${initialErr instanceof Error ? initialErr.message : 'incompleto'})`)
  }
}

export async function fetchAvailableModels(apiKey: string): Promise<ModelOption[]> {
  const key = apiKey.trim()
  if (!key) return AVAILABLE_MODELS

  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(key)}`)
    if (!res.ok) return AVAILABLE_MODELS

    const data = await res.json()
    if (!Array.isArray(data.models)) return AVAILABLE_MODELS

    const validModels: ModelOption[] = data.models
      .filter((m: any) => {
        const methods = m.supportedGenerationMethods || []
        const isGemini = (m.name || '').includes('gemini')
        const supportsGen = methods.includes('generateContent')
        const isExcluded =
          (m.name || '').includes('embedding') ||
          (m.name || '').includes('tts') ||
          (m.name || '').includes('imagen') ||
          (m.name || '').includes('aqa') ||
          (m.name || '').includes('computer-use')
        return isGemini && supportsGen && !isExcluded
      })
      .map((m: any) => {
        const id = m.name.replace(/^models\//, '')
        const displayName = m.displayName || id
        return {
          id,
          name: displayName.includes(id) ? displayName : `${displayName} (${id})`,
          description: m.description || '',
        }
      })

    if (validModels.length > 0) {
      // Prioridade das versões válidas e estáveis de 2026
      validModels.sort((a, b) => {
        const getPriority = (id: string) => {
          if (id === 'gemini-2.5-flash') return 100
          if (id === 'gemini-2.5-pro') return 90
          if (id === 'gemini-2.0-flash') return 80
          if (id === 'gemini-2.0-flash-lite') return 75
          if (id === 'gemini-1.5-flash') return 70
          if (id === 'gemini-1.5-pro') return 60
          if (id.includes('flash')) return 50
          return 10
        }
        return getPriority(b.id) - getPriority(a.id)
      })
      return validModels
    }
  } catch (err) {
    console.warn('[EasyQuiz] Não foi possível consultar modelos dinâmicos:', err)
  }

  return AVAILABLE_MODELS
}

export async function testApiKey(apiKey: string): Promise<{ ok: boolean; message: string; models?: ModelOption[] }> {
  const key = apiKey.trim()
  if (!key) return { ok: false, message: 'Insira sua chave de API.' }

  // 1. Tenta listar modelos da conta do usuário diretamente
  try {
    const models = await fetchAvailableModels(key)
    if (models.length > 0 && models !== AVAILABLE_MODELS) {
      const topModel = models[0]
      return {
        ok: true,
        message: `Chave válida! ${models.length} modelos Gemini disponíveis em sua conta. Recomendado: ${topModel.name}`,
        models,
      }
    }
  } catch {}

  // 2. Teste direto nos modelos mais compatíveis e universais
  const testCandidates = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-1.5-flash']
  for (const modelId of testCandidates) {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${modelId}:generateContent?key=${encodeURIComponent(key)}`
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: 'PING' }] }],
          generationConfig: { maxOutputTokens: 5 },
        }),
      })

      if (res.ok) {
        return {
          ok: true,
          message: `Chave de API validada com sucesso no ${modelId}!`,
          models: AVAILABLE_MODELS,
        }
      }
    } catch {}
  }

  return { ok: false, message: 'Chave de API inválida, sem cota ou sem permissão para modelos Gemini.' }
}

export async function analyzeWithGemini(
  context: CapturedContext,
  images: CapturedImage[],
  settings: EasyQuizSettings,
  onProgress?: (message: string, type?: 'info' | 'warning' | 'error') => void,
): Promise<{ plan: AnalysisPlan; rawUsage?: unknown; usedModel?: string }> {
  const key = settings.apiKey.trim()
  if (!key) throw new Error('Chave de API não configurada.')

  const chosenModel = normalizeModel(settings.model)

  const userText = buildUserPrompt(context, images, settings)

  const parts: Array<Record<string, unknown>> = [{ text: userText }]
  for (const img of images) {
    parts.push({
      inline_data: { mime_type: img.mediaType, data: img.base64 },
    })
  }

  const payload = {
    system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
    contents: [{ role: 'user', parts }],
    generationConfig: {
      temperature: 0.05, // Baixíssimo para previsibilidade
      maxOutputTokens: 2500, // Amplo espaço para categorizações sem truncamento
      response_mime_type: 'application/json',
      response_schema: GEMINI_JSON_SCHEMA,
    },
  }

  // Cascata de modelos sólidos e verificados de 2026
  // Começa pelo modelo escolhido pelo usuário. Se falhar (404/429/503), pula para os modelos disponíveis.
  const fallbackChain = [
    chosenModel,
    'gemini-2.5-flash',
    'gemini-2.0-flash',
    'gemini-2.5-pro',
    'gemini-2.0-flash-lite',
    'gemini-1.5-flash',
    'gemini-1.5-pro',
  ]
  const modelsToTry = Array.from(new Set(fallbackChain))

  let lastError = new Error('Nenhum modelo tentado.')

  for (let i = 0; i < modelsToTry.length; i++) {
    const currentModel = modelsToTry[i]
    const nextModel = modelsToTry[i + 1]
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${currentModel}:generateContent?key=${encodeURIComponent(key)}`

    try {
      if (i > 0) {
        onProgress?.(`Tentando modelo alternativo: ${currentModel}...`, 'info')
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const errorText = await response.text()
        const parsedErrorMsg = parseGeminiError(errorText, response.status)
        throw new Error(parsedErrorMsg)
      }

      const data = await response.json()
      const candidate = data.candidates?.[0]
      if (!candidate || !candidate.content?.parts?.[0]?.text) {
        throw new Error('A IA não retornou uma resposta estruturada válida.')
      }

      const rawText = candidate.content.parts[0].text
      const parsedPlan = robustParsePlan(rawText)

      if (!Array.isArray(parsedPlan.actions)) parsedPlan.actions = []
      if (!Array.isArray(parsedPlan.warnings)) parsedPlan.warnings = []
      if (typeof parsedPlan.confidence !== 'number') parsedPlan.confidence = 0.8
      parsedPlan.usedModel = currentModel

      if (currentModel !== chosenModel) {
        onProgress?.(`Modelo '${chosenModel}' falhou. Resolvido com sucesso pelo fallback '${currentModel}'!`, 'info')
      }

      return { plan: parsedPlan, rawUsage: data.usageMetadata, usedModel: currentModel }
    } catch (err) {
      lastError = err as Error
      // Se for chave inválida ou expirada, falha imediatamente
      if (lastError.message.includes('inválida') || lastError.message.includes('expirada')) {
        throw lastError
      }

      if (nextModel) {
        const warnMsg = `Modelo '${currentModel}' indisponível (${lastError.message}). Alternando automaticamente para '${nextModel}'...`
        console.warn(`[EasyQuiz Fallback] ${warnMsg}`)
        onProgress?.(warnMsg, 'warning')
      } else {
        console.warn(`[EasyQuiz Fallback] Modelo '${currentModel}' falhou: ${lastError.message}. Todos os modelos esgotados.`)
      }
    }
  }

  throw lastError
}

