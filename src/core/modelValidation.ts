/**
 * Validação rigorosa de modelos para o EasyQuiz (Atualizado Setembro 2026).
 * Garante que apenas modelos de processamento de texto/visão para Questões & Provas (Flash e Pro)
 * sejam utilizados ou listados, eliminando:
 * - Modelos de geração de imagens (imagen, etc.)
 * - Modelos de geração de vídeo (veo, etc.)
 * - Modelos de áudio/voz/fala (tts, audio, etc.)
 * - Modelos de embeddings e utilitários não-QA (aqa, learnlm, etc.)
 * - Aliases instáveis com sobrecarga/503 crônico (latest, experimental, aliases não versionados)
 * - Modelos restritos (cyber, fairwind, etc.)
 */

export function isValidQuizModel(modelId: string): boolean {
  if (!modelId || typeof modelId !== 'string') return false
  const id = modelId.toLowerCase().trim().replace(/^models\//, '')

  // 1. Deve ser da família Gemini
  if (!id.includes('gemini')) return false

  // 2. Bloqueio absoluto de modelos de geração de mídia, embeddings, utilitários e restritos
  const invalidSubstrings = [
    'imagen',
    'image',
    'veo',
    'omni',
    'video',
    'embedding',
    'embed',
    'tts',
    'audio',
    'speech',
    'voice',
    'sound',
    'live',
    'transcribe',
    'bidi',
    'aqa',
    'learnlm',
    'deep-research',
    'computer-use',
    'robotics',
    'rt-1',
    'rt-2',
    'mediapipe',
    // Modelos restritos (acesso Fairwind / programas especiais)
    'cyber',
    // Aliases genéricos instáveis que sofrem de 503 "No capacity available" crônico:
    'latest',
    '-ultra',
    'experimental',
  ]

  for (const pattern of invalidSubstrings) {
    if (id.includes(pattern)) return false
  }

  // 3. Deve ser da linha Flash ou Pro (capazes de processar a questão e retornar ações estruturadas em JSON)
  if (!id.includes('flash') && !id.includes('pro')) {
    return false
  }

  return true
}
