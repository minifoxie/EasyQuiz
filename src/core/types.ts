export type ResponseMode =
  | 'texto_livre'
  | 'escolha_unica'
  | 'escolha_multipla'
  | 'verdadeiro_falso'
  | 'preenchimento'
  | 'acao_sem_resposta'

export interface ControlOption {
  value: string
  label: string
}

export interface ControlDescriptor {
  id: string
  tag: 'input' | 'textarea' | 'select' | 'button' | 'option' | 'other'
  type: string
  label: string
  name: string
  value: string
  options: ControlOption[]
  required: boolean
  disabled: boolean
  role: 'answer' | 'navigation'
}

export interface CapturedContext {
  sourceUrl: string
  pageTitle: string
  questionText: string
  htmlSnippet: string
  controls: ControlDescriptor[]
  scope: HTMLElement
}

export interface CapturedImage {
  mediaType: 'image/jpeg' | 'image/png' | 'image/webp' | 'image/gif'
  base64: string
  alt: string
  source: string
}

export type DeclarativeAction =
  | { type: 'set_value'; targetId: string; value: string }
  | { type: 'set_checked'; targetId: string; checked: boolean }
  | { type: 'select_values'; targetId: string; values: string[] }
  | { type: 'advance'; targetId: string }

export interface AnalysisPlan {
  mode: ResponseMode
  confidence: number
  summary: string
  rationale: string
  needsMoreContext: boolean
  warnings: string[]
  actions: DeclarativeAction[]
}

export interface ModelOption {
  id: string
  name: string
  description?: string
}

export interface EasyQuizSettings {
  apiKey: string
  model: string
  modeHint: ResponseMode | ''
  dryRun: boolean
  autoApply: boolean
  autoAdvance: boolean
  confidenceThreshold: number
}
