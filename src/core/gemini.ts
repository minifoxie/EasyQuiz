import type { AnalysisPlan, CapturedContext, CapturedImage, EasyQuizSettings, ModelOption } from './types'
import { buildUserPrompt, SYSTEM_PROMPT } from './prompt'
import { validateAnalysisPlan } from './planValidation'
import { isValidQuizModel } from './modelValidation'

export { isValidQuizModel } from './modelValidation'

export const AVAILABLE_MODELS: ModelOption[] = [
  {
    id: 'gemini-2.5-flash',
    name: 'Gemini 2.5 Flash (Ultra Rápido - 0 Thinking)',
    description: 'Modelo de ultrabaixa latência com zero thinking overhead para respostas imediatas.',
    stable: true,
  },
  {
    id: 'gemini-2.0-flash',
    name: 'Gemini 2.0 Flash (Máxima Disponibilidade)',
    description: 'Ultra-baixa latência comprovada com suporte multimodal nativo.',
    stable: true,
  },
  {
    id: 'gemini-1.5-flash',
    name: 'Gemini 1.5 Flash (Reserva Global)',
    description: 'Modelo de altíssima estabilidade e ampla cota gratuita.',
    stable: true,
  },
  {
    id: 'gemini-2.0-flash-lite-preview-02-05',
    name: 'Gemini 2.0 Flash-Lite (Econômico)',
    description: 'Modelo leve para respostas ultrarrápidas.',
    stable: true,
  },
  {
    id: 'gemini-1.5-flash-8b',
    name: 'Gemini 1.5 Flash-8B (Super Leve)',
    description: 'Modelo ultraleve e veloz com alta cota de requisições.',
    stable: true,
  },
  {
    id: 'gemini-2.5-pro',
    name: 'Gemini 2.5 Pro (Raciocínio Profundo)',
    description: 'Modelo avançado para questões de alta complexidade.',
    stable: true,
  },
  {
    id: 'gemini-1.5-pro',
    name: 'Gemini 1.5 Pro (Alta Precisão)',
    description: 'Modelo confiável para problemas difíceis.',
    stable: true,
  },
]

export let preferredFastModel: string | null = null

export function buildGenerationConfig(model: string): Record<string, unknown> {
  const config: Record<string, unknown> = {
    temperature: 0.0,
    maxOutputTokens: 1200,
    response_mime_type: 'application/json',
    response_schema: GEMINI_JSON_SCHEMA,
  }

  // DESATIVAÇÃO DO THINKING OVERHEAD:
  // Modelos Gemini 2.5 possuem raciocínio interno (thinking) que gera de 1000 a 4000 tokens invisíveis,
  // causando 3s a 8s de espera desnecessária. thinkingBudget: 0 desativa o thinking, trazendo a resposta a sub-segundo!
  // Modelos Gemini 3.x usam thinkingLevel: 'LOW'.
  if (/gemini-2\.5/i.test(model)) {
    config.thinkingConfig = { thinkingBudget: 0 }
  }

  return config
}

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
  if (!clean || !isValidQuizModel(clean)) {
    return 'gemini-2.5-flash'
  }
  return clean
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
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed)) {
      const filtered = parsed.filter((m: any) => m && typeof m.id === 'string' && isValidQuizModel(m.id))
      return filtered.length > 0 ? filtered : null
    }
    return null
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
            const id = (m.name || '').replace(/^models\//, '')
            const supportsGen = methods.includes('generateContent')
            return isValidQuizModel(id) && supportsGen
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
              supportsVision: !/embedding|tts|transcribe|live|image|sound|voice/i.test(id),
              supportsStructuredOutput: methods.includes('generateContent'),
              supportedGenerationMethods: methods,
              discoveredAt: Date.now(),
            }
          })

        if (validModels.length > 0) {
          validModels.sort((a, b) => {
            const getPriority = (id: string) => {
              if (id === 'gemini-2.5-flash') return 130
              if (id === 'gemini-2.0-flash') return 125
              if (id === 'gemini-1.5-flash') return 110
              if (id === 'gemini-2.0-flash-lite-preview-02-05') return 105
              if (id === 'gemini-1.5-flash-8b') return 100
              if (id.includes('flash')) return 80
              if (id === 'gemini-2.5-pro') return 60
              if (id === 'gemini-1.5-pro') return 50
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

  // 2. Teste direto nos modelos mais rápidos e compatíveis em v1beta e v1
  const testCandidates = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-3.8-flash', 'gemini-1.5-flash']
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

async function callSingleModel(
  model: string,
  key: string,
  payloadBase: { system_instruction: { parts: Array<{ text: string }> }; contents: Array<{ role: string; parts: Array<Record<string, unknown>> }> },
  keepalive: boolean,
  signal: AbortSignal,
): Promise<{ rawText: string; data: any; usedModel: string }> {
  const versionsToTry = ['v1beta', 'v1']
  let lastErr = new Error(`Falha ao consultar modelo ${model}`)

  const genConfig = buildGenerationConfig(model)
  let currentGenConfig = { ...genConfig }

  for (const apiVer of versionsToTry) {
    if (signal.aborted) throw new Error('Operação cancelada pelo usuário.')

    const endpoint = `https://generativelanguage.googleapis.com/${apiVer}/models/${model}:generateContent?key=${encodeURIComponent(key)}`

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': key,
        },
        body: JSON.stringify({
          ...payloadBase,
          generationConfig: currentGenConfig,
        }),
        signal,
        keepalive,
      })

      if (!response.ok) {
        const errorText = await response.text()

        // Se o modelo rejeitar thinkingConfig com HTTP 400, retenta sem thinkingConfig imediatamente
        if (response.status === 400 && currentGenConfig.thinkingConfig && /thinking/i.test(errorText)) {
          delete currentGenConfig.thinkingConfig
          const retryRes = await fetch(endpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-goog-api-key': key,
            },
            body: JSON.stringify({
              ...payloadBase,
              generationConfig: currentGenConfig,
            }),
            signal,
            keepalive,
          })
          if (retryRes.ok) {
            const data = await retryRes.json()
            const candidate = data.candidates?.[0]
            if (candidate?.content?.parts?.[0]?.text) {
              return { rawText: candidate.content.parts[0].text, data, usedModel: model }
            }
          }
        }

        const parsedErrorMsg = parseGeminiError(errorText, response.status)
        if (response.status === 404 && apiVer === 'v1beta') {
          continue
        }

        if (
          response.status === 404 ||
          response.status === 403 ||
          response.status === 503 ||
          /no capacity|overloaded|unavailable/i.test(errorText)
        ) {
          blacklistedModels.add(model)
        }

        throw new Error(`[${model}] ${parsedErrorMsg}`)
      }

      const data = await response.json()
      const candidate = data.candidates?.[0]
      if (!candidate || !candidate.content?.parts?.[0]?.text) {
        throw new Error(`[${model}] A IA não retornou uma resposta estruturada válida.`)
      }

      return {
        rawText: candidate.content.parts[0].text,
        data,
        usedModel: model,
      }
    } catch (err) {
      if (signal.aborted) throw err
      lastErr = err as Error
      const errMsg = lastErr.message || ''
      if (errMsg.includes('404') || errMsg.includes('503') || errMsg.includes('No capacity') || errMsg.includes('overloaded')) {
        blacklistedModels.add(model)
      }
      if (!errMsg.includes('404')) {
        break
      }
    }
  }

  throw lastErr
}

export async function analyzeWithGemini(
  context: CapturedContext,
  images: CapturedImage[],
  settings: EasyQuizSettings,
  onProgress?: (message: string, type?: 'info' | 'warning' | 'error') => void,
  signal?: AbortSignal,
): Promise<{ plan: AnalysisPlan; rawUsage?: unknown; usedModel?: string }> {
  if (signal?.aborted) throw new Error('Operação cancelada pelo usuário.')

  const key = settings.apiKey.trim().replace(/^["']|["']$/g, '')
  if (!key) throw new Error('Chave de API não configurada.')

  const chosenModel = normalizeModel(settings.model)

  // Dispara descoberta assíncrona em segundo plano se ainda não feita, SEM bloquear a primeira questão
  if (!discoveredModelsCache && key) {
    fetchAvailableModels(key).catch(() => {})
  }

  if (signal?.aborted) throw new Error('Operação cancelada pelo usuário.')

  const startTime = Date.now()
  const userText = buildUserPrompt(context, images, settings)

  // Intercala rótulos semânticos e dados base64 para que o Gemini saiba exatamente qual imagem pertence a qual opção/gráfico
  const parts: Array<Record<string, unknown>> = [{ text: userText }]
  for (let idx = 0; idx < images.length; idx++) {
    const img = images[idx]
    const label = img.associatedLabel || (img.alt ? `Imagem: ${img.alt}` : `Imagem ${idx + 1}`)
    parts.push({
      text: `[ANEXO VISUAL ${idx + 1} - VÍNCULO: ${label}]:`,
    })
    parts.push({
      inline_data: { mime_type: img.mediaType, data: img.base64 },
    })
  }

  const payloadBase = {
    system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
    contents: [{ role: 'user', parts }],
  }
  const keepalive = true

  // Lista ordenada de modelos estritamente válidos para resolução de testes (QA)
  // 1. Modelo rápido comprovado da sessão atual (preferredFastModel) se for válido
  // 2. Modelo escolhido pelo usuário (chosenModel) se for válido
  // 3. Modelos oficiais Flash e Pro de ponta com ultrabaixa latência
  const prioritizedFastQA = [
    'gemini-2.5-flash',
    'gemini-2.0-flash',
    'gemini-1.5-flash',
    'gemini-2.0-flash-lite-preview-02-05',
    'gemini-1.5-flash-8b',
    'gemini-2.5-pro',
    'gemini-1.5-pro',
  ]

  const rawFallback = [
    ...(preferredFastModel && isValidQuizModel(preferredFastModel) ? [preferredFastModel] : []),
    ...(isValidQuizModel(chosenModel) ? [chosenModel] : []),
    ...prioritizedFastQA,
    ...(discoveredModelsCache?.filter((m) => isValidQuizModel(m.id)).map((m) => m.id) || []),
    'gemini-2.5-pro',
    'gemini-1.5-pro',
  ]

  const validCandidates = Array.from(new Set(rawFallback)).filter((m) => isValidQuizModel(m))

  let modelsToTry = validCandidates.filter((m) => !blacklistedModels.has(m))
  if (modelsToTry.length === 0) {
    blacklistedModels.clear()
    modelsToTry = validCandidates
  }

  // Limita o pool de corrida aos top 6 modelos mais velozes para evitar contenção de rede
  modelsToTry = modelsToTry.slice(0, 6)

  // Divide os modelos em ondas de até 3 para corrida paralela ultrarrápida (Hedging / Concurrent Race)
  const chunkSize = 3
  const waves: string[][] = []
  for (let i = 0; i < modelsToTry.length; i += chunkSize) {
    waves.push(modelsToTry.slice(i, i + chunkSize))
  }

  let lastError = new Error('Nenhum modelo disponível para análise.')

  for (let waveIndex = 0; waveIndex < waves.length; waveIndex++) {
    if (signal?.aborted) throw new Error('Operação cancelada pelo usuário.')

    const currentWave = waves[waveIndex].filter((m) => !blacklistedModels.has(m))
    if (currentWave.length === 0) continue

    if (waveIndex === 0) {
      onProgress?.(`⚡ Velocidade Máxima: consultando APIs em paralelo (${currentWave.join(', ')})...`, 'info')
    } else {
      onProgress?.(`⚡ Alternando onda de fallback em paralelo (${currentWave.join(', ')})...`, 'warning')
    }

    const waveControllers = currentWave.map(() => new AbortController())

    const cancelOthers = (winnerIdx: number) => {
      waveControllers.forEach((ctrl, idx) => {
        if (idx !== winnerIdx) {
          try {
            ctrl.abort(new Error('Cancelado: outro modelo respondeu mais rápido.'))
          } catch {
            ctrl.abort()
          }
        }
      })
    }

    const onWaveParentAbort = () => {
      waveControllers.forEach((ctrl) => {
        try {
          ctrl.abort(new Error('Operação cancelada pelo usuário.'))
        } catch {
          ctrl.abort()
        }
      })
    }

    if (signal) {
      if (signal.aborted) throw new Error('Operação cancelada pelo usuário.')
      signal.addEventListener('abort', onWaveParentAbort, { once: true })
    }

    try {
      const racePromises = currentWave.map(async (model, idx) => {
        const ctrl = waveControllers[idx]
        const timeoutMs = currentWave.length > 1 ? 8000 : 12000
        const timeoutId = setTimeout(() => {
          try {
            ctrl.abort(new Error(`Timeout de ${timeoutMs / 1000}s excedido na API Gemini (${model}).`))
          } catch {
            ctrl.abort()
          }
        }, timeoutMs)

        try {
          const res = await callSingleModel(model, key, payloadBase, keepalive, ctrl.signal)
          clearTimeout(timeoutId)
          const parsedPlan = validateAnalysisPlan(robustParsePlan(res.rawText))
          parsedPlan.usedModel = res.usedModel
          parsedPlan.durationMs = Date.now() - startTime
          parsedPlan.promptSent = userText
          parsedPlan.tokensUsed = res.data.usageMetadata?.totalTokenCount
          parsedPlan.promptTokens = res.data.usageMetadata?.promptTokenCount
          parsedPlan.candidatesTokens = res.data.usageMetadata?.candidatesTokenCount
          parsedPlan.rawResponse = res.rawText

          cancelOthers(idx)
          return { plan: parsedPlan, rawUsage: res.data.usageMetadata, usedModel: res.usedModel }
        } catch (err) {
          clearTimeout(timeoutId)
          throw err
        }
      })

      const winner = await Promise.any(racePromises)
      signal?.removeEventListener('abort', onWaveParentAbort)

      preferredFastModel = winner.usedModel
      try {
        settings.model = winner.usedModel
      } catch {}

      onProgress?.(`⚡ Resposta mais rápida recebida em ${winner.plan.durationMs}ms via '${winner.usedModel}'!`, 'info')
      return winner
    } catch (waveErr) {
      signal?.removeEventListener('abort', onWaveParentAbort)
      if (signal?.aborted) throw new Error('Operação cancelada pelo usuário.')

      let failureDetails = ''
      if (Array.isArray((waveErr as any)?.errors) && (waveErr as any).errors.length > 0) {
        failureDetails = (waveErr as any).errors
          .map((e: any) => e?.message || String(e))
          .filter(Boolean)
          .join(' | ')
      } else if (waveErr instanceof Error) {
        failureDetails = waveErr.message
      } else {
        failureDetails = String(waveErr)
      }

      lastError = new Error(failureDetails || 'Nenhum modelo respondeu com sucesso.')
      console.warn(`[EasyQuiz Wave Race] Onda ${waveIndex + 1} (${currentWave.join(', ')}) falhou: ${failureDetails}`)
    }
  }

  throw lastError
}

