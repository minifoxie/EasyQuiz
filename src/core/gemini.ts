import type { AnalysisPlan, CapturedContext, CapturedImage, EasyQuizSettings, ModelOption } from './types'
import { buildUserPrompt, SYSTEM_PROMPT } from './prompt'

export const AVAILABLE_MODELS: ModelOption[] = [
  { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash', description: 'Recomendado: ultrarrápido, multimodal e de alta precisão' },
  { id: 'gemini-2.0-flash', name: 'Gemini 2.0 Flash', description: 'Modelo rápido de última geração para tarefas gerais' },
  { id: 'gemini-1.5-flash', name: 'Gemini 1.5 Flash', description: 'Modelo leve de baixo consumo e boa resposta' },
  { id: 'gemini-1.5-pro', name: 'Gemini 1.5 Pro', description: 'Raciocínio complexo e contextos gigantescos' },
  { id: 'gemini-2.5-pro', name: 'Gemini 2.5 Pro', description: 'Modelo avançado para questões de alta complexidade' },
]

const GEMINI_JSON_SCHEMA = {
  type: 'OBJECT',
  properties: {
    mode: {
      type: 'STRING',
      enum: ['texto_livre', 'escolha_unica', 'escolha_multipla', 'verdadeiro_falso', 'preenchimento', 'acao_sem_resposta'],
    },
    confidence: { type: 'NUMBER' },
    summary: { type: 'STRING' },
    rationale: { type: 'STRING' },
    needsMoreContext: { type: 'BOOLEAN' },
    warnings: {
      type: 'ARRAY',
      items: { type: 'STRING' },
    },
    actions: {
      type: 'ARRAY',
      items: {
        type: 'OBJECT',
        properties: {
          type: { type: 'STRING', enum: ['set_value', 'set_checked', 'select_values', 'advance'] },
          targetId: { type: 'STRING' },
          value: { type: 'STRING' },
          checked: { type: 'BOOLEAN' },
          values: {
            type: 'ARRAY',
            items: { type: 'STRING' },
          },
        },
        required: ['type', 'targetId'],
      },
    },
  },
  required: ['mode', 'confidence', 'summary', 'rationale', 'needsMoreContext', 'warnings', 'actions'],
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
      return 'Chave de API do Gemini inválida ou não autorizada. Verifique sua chave no Google AI Studio.'
    }
    if (/RESOURCE_EXHAUSTED|Quota exceeded/i.test(message)) {
      return 'Limite de cota do Gemini atingido temporariamente. Aguarde alguns segundos.'
    }
    if (message) return `Erro Gemini (${status}): ${message}`
  } catch {
    // fallback
  }
  return `Falha na requisição ao Gemini (HTTP ${status}). Verifique sua conexão e chave de API.`
}

export async function testApiKey(apiKey: string): Promise<{ ok: boolean; message: string }> {
  const key = apiKey.trim()
  if (!key) {
    return { ok: false, message: 'Insira sua chave de API do Gemini.' }
  }

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(key)}`
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
    return { ok: true, message: 'Chave de API validada com sucesso! Gemini pronto para uso.' }
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? `Erro de conexão: ${error.message}` : 'Erro desconhecido ao validar chave.',
    }
  }
}

export async function analyzeWithGemini(
  context: CapturedContext,
  images: CapturedImage[],
  settings: EasyQuizSettings,
): Promise<{ plan: AnalysisPlan; rawUsage?: unknown }> {
  const key = settings.apiKey.trim()
  if (!key) {
    throw new Error('Chave de API do Gemini não configurada. Insira sua chave no painel EasyQuiz.')
  }

  const model = normalizeModel(settings.model)
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(key)}`

  const userText = buildUserPrompt(context, images, settings)

  const parts: Array<Record<string, unknown>> = [{ text: userText }]

  for (const img of images) {
    parts.push({
      inline_data: {
        mime_type: img.mediaType,
        data: img.base64,
      },
    })
  }

  const payload = {
    system_instruction: {
      parts: [{ text: SYSTEM_PROMPT }],
    },
    contents: [
      {
        role: 'user',
        parts,
      },
    ],
    generationConfig: {
      temperature: 0.1,
      response_mime_type: 'application/json',
      response_schema: GEMINI_JSON_SCHEMA,
    },
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(parseGeminiError(errorText, response.status))
  }

  const data = await response.json()
  const candidate = data.candidates?.[0]
  if (!candidate || !candidate.content?.parts?.[0]?.text) {
    throw new Error('O modelo Gemini não retornou resposta estruturada.')
  }

  const textOutput = candidate.content.parts[0].text
  let parsedPlan: AnalysisPlan
  try {
    parsedPlan = JSON.parse(textOutput) as AnalysisPlan
  } catch {
    throw new Error('Falha ao decodificar o plano JSON do Gemini.')
  }

  // Sanitizar e validar formato mínimo
  if (!Array.isArray(parsedPlan.actions)) {
    parsedPlan.actions = []
  }
  if (!Array.isArray(parsedPlan.warnings)) {
    parsedPlan.warnings = []
  }
  if (typeof parsedPlan.confidence !== 'number') {
    parsedPlan.confidence = 0.8
  }

  return { plan: parsedPlan, rawUsage: data.usageMetadata }
}
