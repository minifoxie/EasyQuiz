import type { AnalysisPlan, CapturedContext, CapturedImage, EasyQuizSettings, ModelOption } from './types'
import { buildUserPrompt, SYSTEM_PROMPT } from './prompt'
import { validateAnalysisPlan } from './planValidation'

export const AVAILABLE_MODELS: ModelOption[] = [
  {
    id: 'gemini-2.0-flash',
    name: 'Gemini 2.0 Flash (Mais Rápido e Estável)',
    description: 'Modelo oficial de ultra-baixa latência do Google com suporte multimodal completo.',
    stable: true,
  },
  {
    id: 'gemini-1.5-flash',
    name: 'Gemini 1.5 Flash (Equilibrado e Confiável)',
    description: 'Modelo comprovado de altíssima disponibilidade e estabilidade.',
    stable: true,
  },
  {
    id: 'gemini-2.5-flash',
    name: 'Gemini 2.5 Flash (Raciocínio Rápido)',
    description: 'Modelo multimodal de raciocínio avançado.',
    stable: true,
  },
  {
    id: 'gemini-2.0-flash-lite-preview-02-05',
    name: 'Gemini 2.0 Flash-Lite (Econômico)',
    description: 'Modelo leve e ágil para respostas rápidas.',
    stable: true,
  },
  {
    id: 'gemini-1.5-pro',
    name: 'Gemini 1.5 Pro (Alta Precisão)',
    description: 'Modelo de máxima precisão para problemas complexos.',
    stable: true,
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
  required: ['pageType', 'mode', 'confidence', 'rationale', 'actions'],
}

function normalizeModel(model: string): string {
  const clean = model.trim().replace(/^google\//, '').replace(/^models\//, '')
  return clean || 'gemini-2.0-flash'
}

function parseGeminiError(errorText: string, status: number): string {
  let googleMsg = ''
  try {
    const json = JSON.parse(errorText)
    googleMsg = json.error?.message || json.message || ''
  } catch {
    googleMsg = errorText.slice(0, 160)
  }

  if (/API_KEY_INVALID|API key not valid|key.*invalid|unregistered/i.test(googleMsg)) {
    return 'Chave de API do Gemini inválida ou não autorizada no Google AI Studio.'
  }
  if (/RESOURCE_EXHAUSTED|Quota exceeded/i.test(googleMsg) || status === 429) {
    return 'Limite temporário de cota do Gemini (HTTP 429) atingido. Aguardando recuperação...'
  }
  if (status === 404) {
    return `HTTP 404: ${googleMsg || 'Modelo ou endpoint não encontrado no Google AI Studio'}`
  }
  if (status === 503 || /overloaded/i.test(googleMsg)) {
    return `Servidores Google sobrecarregados (HTTP 503): ${googleMsg || 'Aguardando'}`
  }
  return googleMsg ? `Erro Gemini (HTTP ${status}): ${googleMsg}` : `Falha na requisição ao Gemini (HTTP ${status}).`
}

function robustParsePlan(rawText: string): AnalysisPlan {
  const text = rawText.trim()
  // 1. Tenta extrair de bloco de código ```json ... ```
  const codeBlockMatch = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/i)
  if (codeBlockMatch) {
    try {
      return JSON.parse(codeBlockMatch[1].trim()) as AnalysisPlan
    } catch {}
  }
  // 2. Tenta parse direto
  try {
    return JSON.parse(text) as AnalysisPlan
  } catch {}
  // 3. Tenta encontrar o bloco JSON {...} mais abrangente
  const jsonMatch = text.match(/\{[\s\S]*\}/)
  if (jsonMatch) {
    try {
      return JSON.parse(jsonMatch[0].trim()) as AnalysisPlan
    } catch {}
  }
  throw new Error('Falha ao decodificar JSON da IA.')
}

export let discoveredModelsCache: ModelOption[] | null = (() => {
  try {
    const raw = typeof localStorage !== 'undefined' ? localStorage.getItem('easyquiz_cached_models') : null
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
})()
const blacklistedModels = new Set<string>()

export async function fetchAvailableModels(apiKey: string): Promise<ModelOption[]> {
  const key = apiKey.trim().replace(/^["']|["']$/g, '')
  if (!key) return AVAILABLE_MODELS

  const endpoints = [
    `https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(key)}`,
    `https://generativelanguage.googleapis.com/v1/models?key=${encodeURIComponent(key)}`,
  ]

  for (const url of endpoints) {
    try {
      const res = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': key,
        },
      })

      if (!res.ok) {
        const errText = await res.text()
        const parsed = parseGeminiError(errText, res.status)
        if (parsed.includes('inválida') || parsed.includes('não autorizada')) {
          throw new Error(parsed)
        }
        continue
      }

      const data = await res.json()
      if (Array.isArray(data.models) && data.models.length > 0) {
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
            const methods = m.supportedGenerationMethods || []
            const id = m.name.replace(/^models\//, '')
            const displayName = m.displayName || id
            return {
              id,
              name: displayName.includes(id) ? displayName : `${displayName} (${id})`,
              description: m.description || '',
              stable: !/-preview|-experimental|-latest/i.test(id),
              supportsVision: !/embedding|tts|transcribe|live|image/i.test(id),
              supportsStructuredOutput: methods.includes('generateContent'),
              supportedGenerationMethods: methods,
              discoveredAt: Date.now(),
            }
          })

        if (validModels.length > 0) {
          validModels.sort((a, b) => {
            const getPriority = (id: string) => {
              if (id === 'gemini-3.8-flash') return 120
              if (id === 'gemini-3.5-flash-lite') return 115
              if (id === 'gemini-2.5-flash') return 100
              if (id === 'gemini-3.1-pro-preview') return 90
              if (id.includes('flash')) return 50
              return 10
            }
            return getPriority(b.id) - getPriority(a.id)
          })
          discoveredModelsCache = validModels
          try {
            if (typeof localStorage !== 'undefined') {
              localStorage.setItem('easyquiz_cached_models', JSON.stringify(validModels))
            }
          } catch {}
          return validModels
        }
      }
    } catch (err) {
      if ((err as Error).message?.includes('Chave de API')) throw err
    }
  }

  return AVAILABLE_MODELS
}

export async function testApiKey(apiKey: string): Promise<{ ok: boolean; message: string; models?: ModelOption[] }> {
  const key = apiKey.trim().replace(/^["']|["']$/g, '')
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
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    return { ok: false, message: msg }
  }

  // 2. Teste direto nos modelos mais compatíveis em v1beta e v1
  const testCandidates = ['gemini-3.8-flash', 'gemini-3.5-flash-lite', 'gemini-2.5-flash']
  for (const modelId of testCandidates) {
    for (const apiVer of ['v1beta', 'v1']) {
      const endpoint = `https://generativelanguage.googleapis.com/${apiVer}/models/${modelId}:generateContent?key=${encodeURIComponent(key)}`
      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': key,
          },
          body: JSON.stringify({
            contents: [{ role: 'user', parts: [{ text: 'PING' }] }],
            generationConfig: { maxOutputTokens: 5 },
          }),
        })

        if (res.ok) {
          return {
            ok: true,
            message: `Chave validada com sucesso no ${modelId} (${apiVer})!`,
            models: AVAILABLE_MODELS,
          }
        }
      } catch {}
    }
  }

  return { ok: false, message: 'Chave de API inválida, sem cota ou sem permissão para modelos Gemini.' }
}

export async function analyzeWithGemini(
  context: CapturedContext,
  images: CapturedImage[],
  settings: EasyQuizSettings,
  onProgress?: (message: string, type?: 'info' | 'warning' | 'error') => void,
): Promise<{ plan: AnalysisPlan; rawUsage?: unknown; usedModel?: string }> {
  const key = settings.apiKey.trim().replace(/^["']|["']$/g, '')
  if (!key) throw new Error('Chave de API não configurada.')

  const chosenModel = normalizeModel(settings.model)

  // 1. Descoberta dinâmica de modelos na primeira execução se ainda não feita
  if (!discoveredModelsCache || discoveredModelsCache.length === 0) {
    try {
      onProgress?.('Verificando modelos autorizados na sua chave de API...', 'info')
      await fetchAvailableModels(key)
    } catch (discoveryErr) {
      const msg = discoveryErr instanceof Error ? discoveryErr.message : String(discoveryErr)
      if (msg.includes('inválida') || msg.includes('não autorizada')) {
        throw new Error(msg)
      }
    }
  }

  const startTime = Date.now()
  const userText = buildUserPrompt(context, images, settings)

  const parts: Array<Record<string, unknown>> = [{ text: userText }]
  for (const img of images) {
    parts.push({
      inline_data: { mime_type: img.mediaType, data: img.base64 },
    })
  }

  const genConfig: Record<string, unknown> = {
    temperature: 0.05, // Baixíssimo para previsibilidade
    maxOutputTokens: 2500, // Amplo espaço para categorizações sem truncamento
    response_mime_type: 'application/json',
    response_schema: GEMINI_JSON_SCHEMA,
  }

  // Lista ordenada de modelos a tentar, priorizando o escolhido e os modelos de alta disponibilidade
  const rawFallback = [
    chosenModel,
    ...(discoveredModelsCache?.map((m) => m.id) || []),
    'gemini-2.0-flash',
    'gemini-1.5-flash',
    'gemini-2.5-flash',
    'gemini-2.0-flash-lite-preview-02-05',
    'gemini-1.5-pro',
  ]
  const modelsToTry = Array.from(new Set(rawFallback)).filter((m) => !blacklistedModels.has(m))

  if (modelsToTry.length === 0) {
    blacklistedModels.clear()
    modelsToTry.push(...AVAILABLE_MODELS.map((m) => m.id))
  }

  let lastError = new Error('Nenhum modelo tentado.')

  for (let i = 0; i < modelsToTry.length; i++) {
    const currentModel = modelsToTry[i]
    const nextModel = modelsToTry[i + 1]

    const payload = {
      system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents: [{ role: 'user', parts }],
      generationConfig: genConfig,
    }

    onProgress?.(`Consultando Gemini (${currentModel})...`, 'info')

    // Tenta primeiro em v1beta, se der 404 tenta em v1
    const versionsToTry = ['v1beta', 'v1']

    for (const apiVer of versionsToTry) {
      const endpoint = `https://generativelanguage.googleapis.com/${apiVer}/models/${currentModel}:generateContent?key=${encodeURIComponent(key)}`

      const controller = new AbortController()
      const timeoutId = setTimeout(() => {
        try {
          controller.abort(new Error(`Timeout de 18s excedido na API Gemini (${currentModel}). Servidor demorou a responder.`))
        } catch {
          controller.abort()
        }
      }, 18000)

      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': key,
          },
          body: JSON.stringify(payload),
          signal: controller.signal,
        })

        clearTimeout(timeoutId)

        if (!response.ok) {
          const errorText = await response.text()

          // Se o modelo rejeitou thinkingConfig com 400 (ex: modelos legados), remove e tenta novamente de imediato
          if (response.status === 400 && genConfig.thinkingConfig && /thinking/i.test(errorText)) {
            delete genConfig.thinkingConfig
            payload.generationConfig = genConfig
            continue
          }

          const parsedErrorMsg = parseGeminiError(errorText, response.status)

          // Se for 404 e ainda temos a versão v1 para tentar, continua
          if (response.status === 404 && apiVer === 'v1beta') {
            continue
          }

          // Se for 503 (servidor sobrecarregado) ou 429, não gasta tempo tentando v1 do mesmo modelo sobrecarregado
          throw new Error(parsedErrorMsg)
        }

        const data = await response.json()
        const candidate = data.candidates?.[0]
        if (!candidate || !candidate.content?.parts?.[0]?.text) {
          throw new Error('A IA não retornou uma resposta estruturada válida.')
        }

        const rawText = candidate.content.parts[0].text
        const parsedPlan = validateAnalysisPlan(robustParsePlan(rawText))
        parsedPlan.usedModel = currentModel
        parsedPlan.durationMs = Date.now() - startTime
        parsedPlan.promptSent = userText
        parsedPlan.tokensUsed = data.usageMetadata?.totalTokenCount
        parsedPlan.promptTokens = data.usageMetadata?.promptTokenCount
        parsedPlan.candidatesTokens = data.usageMetadata?.candidatesTokenCount
        parsedPlan.rawResponse = rawText

        if (currentModel !== chosenModel) {
          onProgress?.(`Resolvido com sucesso pelo fallback '${currentModel}' (${apiVer})!`, 'info')
          try {
            settings.model = currentModel
          } catch {}
        }

        return { plan: parsedPlan, rawUsage: data.usageMetadata, usedModel: currentModel }
      } catch (err) {
        clearTimeout(timeoutId)
        if (err instanceof Error && (err.name === 'AbortError' || err.message.includes('aborted') || err.message.includes('Timeout'))) {
          lastError = new Error(`Timeout de 9s excedido na API Gemini (${currentModel}). Sem resposta imediata.`)
        } else {
          lastError = err as Error
        }

        // Se for erro de chave inválida, encerra imediatamente
        if (lastError.message.includes('inválida') || lastError.message.includes('não autorizada')) {
          throw lastError
        }

        // Se deu timeout ou 503/429 na primeira tentativa, pula imediatamente para o próximo modelo
        if (lastError.message.includes('Timeout') || lastError.message.includes('503') || lastError.message.includes('429')) {
          break
        }
      }
    }

    // Se falhou em ambas as versões de API para este modelo
    const isRateLimit = lastError.message.includes('429') || lastError.message.includes('cota')
    const is404 = lastError.message.includes('404')

    if (is404) {
      blacklistedModels.add(currentModel)
    }

    if (nextModel) {
      const pauseMs = isRateLimit ? 500 : 150
      const warnMsg = `Modelo '${currentModel}' indisponível (${lastError.message}). Alternando imediatamente para '${nextModel}'...`
      console.warn(`[EasyQuiz Fallback] ${warnMsg}`)
      onProgress?.(warnMsg, 'warning')
      if (pauseMs > 0) {
        await new Promise((r) => setTimeout(r, pauseMs))
      }
    } else {
      console.warn(`[EasyQuiz Fallback] Modelo '${currentModel}' falhou: ${lastError.message}. Todos os modelos esgotados.`)
    }
  }

  throw lastError
}

