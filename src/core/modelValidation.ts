/**
 * Validação rigorosa de modelos para o EasyQuiz.
 * Garante que apenas modelos de processamento de texto/visão para Questões & Provas (Flash e Pro)
 * sejam utilizados ou listados, eliminando modelos de imagem, vídeo, áudio, fala e embeddings.
 */

export function isValidQuizModel(modelId: string): boolean {
  if (!modelId || typeof modelId !== 'string') return false
  const id = modelId.toLowerCase().trim().replace(/^models\//, '')

  // 1. Deve ser da família Gemini
  if (!id.includes('gemini')) return false

  // 2. Bloqueio absoluto de modelos de geração de mídia (imagem, vídeo, áudio), embeddings ou utilitários não-QA
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
