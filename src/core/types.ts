export type ResponseMode =
  | 'texto_livre'
  | 'escolha_unica'
  | 'escolha_multipla'
  | 'verdadeiro_falso'
  | 'preenchimento'
  | 'acao_sem_resposta'

export type ExecutionEngine = 'command' | 'javascript' | 'smart'

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

// Comandos declarativos minificados para economizar tokens:
// t: tipo (val, chk, sel, clk, adv, js)
// id: targetId ou targetLabel
// v: string ou array de strings (value)
// c: booleano (checked)
// co: array de coordenadas [x, y]
export type DeclarativeAction =
  | { t: 'val'; id: string; v: string } // set_value
  | { t: 'chk'; id: string; c: boolean } // set_checked
  | { t: 'sel'; id: string; v: string[] } // select_values
  | { t: 'clk'; id: string; co?: [number, number] } // click / click_by_label / simulate_click
  | { t: 'adv'; id?: string } // advance
  | { t: 'js'; v: string } // custom_js execution (using $eq)

export interface AnalysisPlan {
  pageType: 'question' | 'info' | 'start' | 'conclusion'
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
  uiMode: 'easy' | 'advanced'
  modeHint: ResponseMode | ''
  engine: ExecutionEngine
  dryRun: boolean
  autoApply: boolean
  autoAdvance: boolean
  hostDarkMode: boolean
  confidenceThreshold: number
}

export const DEFAULT_SETTINGS: EasyQuizSettings = {
  apiKey: '',
  model: 'gemini-3.8-flash',
  uiMode: 'advanced',
  modeHint: '',
  engine: 'smart',
  dryRun: false,
  autoApply: false,
  autoAdvance: false,
  hostDarkMode: true,
  confidenceThreshold: 0.8,
}

