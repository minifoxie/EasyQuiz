import type { AnalysisPlan, CapturedContext, CapturedImage, EasyQuizSettings, ModelOption } from './types'
import { buildUserPrompt, SYSTEM_PROMPT } from './prompt'

export const AVAILABLE_MODELS: ModelOption[] = [
  { id: 'gemini-3.8-flash', name: 'Gemini 3.8 Flash (Recomendado)', description: 'Ultrapoderoso, hiper-rápido modelo 2026 para agents.' },
  { id: 'gemini-3.7-flash', name: 'Gemini 3.7 Flash', description: 'Alta velocidade para tarefas simples e fallback.' },
  { id: 'gemini-3.6-flash', name: 'Gemini 3.6 Flash', description: 'Velocidade e estabilidade.' },
  { id: 'gemini-3.1-pro', name: 'Gemini 3.1 Pro', description: 'Raciocínio longo de elite.' }
]

const GEMINI_JSON_SCHEMA = {
  type: 'OBJECT',
  properties: {
    pageType: { type: 'STRING', enum: ['question', 'info', 'start', 'conclusion'] },
    mode: {
      type: 'STRING',
      enum: ['texto_livre', 'escolha_unica', 'escolha_multipla', 'verdadeiro_falso', 'preenchimento', 'acao_sem_resposta'],
    },
    confidence: { type: 'NUMBER' },
    summary: { type: 'STRING' },
    rationale: { type: 'STRING' },
    needsMoreContext: { type: 'BOOLEAN' },
    warnings: { type: 'ARRAY', items: { type: 'STRING' } },
    actions: {
      type: 'ARRAY',
      items: {
        type: 'OBJECT',
        properties: {
          t: { type: 'STRING', enum: ['val', 'chk', 'sel', 'clk', 'adv', 'js'] },
          id: { type: 'STRING' },
          v: {}, // Pode ser string ou array ou omitido
          c: { type: 'BOOLEAN' },
          co: { type: 'ARRAY', items: { type: 'NUMBER' } } // coordinates
        },
        required: ['t'],
      },
    },
  },
  required: ['pageType', 'mode', 'confidence', 'summary', 'rationale', 'needsMoreContext', 'actions'],
}

function normalizeModel(model: string): string {
  const clean = model.trim().replace(/^google\//, '').replace(/^models\//, '')
  return clean || 'gemini-3.8-flash'
}

function parseGeminiError(errorText: string, status: number): string {
  try {
    const json = JSON.parse(errorText)
    const message = json.error?.message || json.message || ''
    if (/API_KEY_INVALID|API key not valid/i.test(message)) {
      return 'Chave de API do Gemini inválida ou não autorizada. Verifique no Google AI Studio.'
    }
    if (/RESOURCE_EXHAUSTED|Quota exceeded/i.test(message)) {
      return 'Limite de cota do Gemini atingido temporariamente. Aguarde alguns segundos.'
    }
    if (message) return `Erro Gemini (${status}): ${message}`
  } catch {
    // fallback
  }
  return `Falha na requisição ao Gemini (HTTP ${status}). Verifique sua conexão e chave.`
}

export async function testApiKey(apiKey: string): Promise<{ ok: boolean; message: string }> {
  const key = apiKey.trim()
  if (!key) return { ok: false, message: 'Insira sua chave de API.' }

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${encodeURIComponent(key)}`
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: 'PING' }] }],
        generationConfig: { maxOutputTokens: 5 },
      }),
    })

    if (!res.ok) {
      const errText = await res.text()
      return { ok: false, message: parseGeminiError(errText, res.status) }
    }
    return { ok: true, message: 'Chave de API validada com sucesso no Gemini 3.8 Flash!' }
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? `Erro de conexão: ${error.message}` : 'Erro desconhecido ao testar chave.',
    }
  }
}

export async function analyzeWithGemini(
  context: CapturedContext,
  images: CapturedImage[],
  settings: EasyQuizSettings,
): Promise<{ plan: AnalysisPlan; rawUsage?: unknown; usedModel?: string }> {
  const key = settings.apiKey.trim()
  if (!key) throw new Error('Chave de API não configurada.')

  const model = normalizeModel(settings.model)

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
      temperature: 0.05, // Extremamente baixo para manter previsibilidade
      response_mime_type: 'application/json',
      response_schema: GEMINI_JSON_SCHEMA,
    },
  }

  const modelsToTry = settings.uiMode === 'easy' ? AVAILABLE_MODELS.map(m => m.id) : [model]
  if (settings.uiMode === 'easy' && !modelsToTry.includes(model)) {
    modelsToTry.unshift(model) // Prioridade para o modelo escolhido
  }

  let lastError = new Error('Nenhum modelo tentado.')
  
  for (const currentModel of new Set(modelsToTry)) {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${currentModel}:generateContent?key=${encodeURIComponent(key)}`
    
    try {
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

      let parsedPlan: AnalysisPlan
      try {
        parsedPlan = JSON.parse(candidate.content.parts[0].text) as AnalysisPlan
      } catch {
        throw new Error('Falha ao decodificar o plano JSON da IA.')
      }

      if (!Array.isArray(parsedPlan.actions)) parsedPlan.actions = []
      if (!Array.isArray(parsedPlan.warnings)) parsedPlan.warnings = []
      if (typeof parsedPlan.confidence !== 'number') parsedPlan.confidence = 0.8

      return { plan: parsedPlan, rawUsage: data.usageMetadata, usedModel: currentModel }
    } catch (err) {
      lastError = err as Error
      // Se não for modo fácil ou for erro de chave inválida, aborta cascata
      if (settings.uiMode !== 'easy' || lastError.message.includes('inválida')) {
        throw lastError
      }
      console.warn(`[EasyQuiz] Fallback: Falha no modelo ${currentModel}. Tentando próximo...`, err)
    }
  }

  throw lastError
}

