import type { AnalysisPlan, DeclarativeAction, ResponseMode } from './types'

const PAGE_TYPES = new Set<AnalysisPlan['pageType']>(['question', 'info', 'start', 'conclusion'])
const RESPONSE_MODES = new Set<ResponseMode>([
  'texto_livre',
  'escolha_unica',
  'escolha_multipla',
  'verdadeiro_falso',
  'preenchimento',
  'acao_sem_resposta',
  'categorizacao',
  'ordenacao',
  'arrastar_soltar',
])
const ACTION_TYPES = new Set<DeclarativeAction['t']>(['val', 'chk', 'sel', 'clk', 'adv', 'js', 'drag'])
const MAX_ACTIONS = 150
const MAX_TEXT = 2_000
const PLAN_FIELDS = new Set([
  'pageType', 'mode', 'confidence', 'rationale', 'actions', 'memoryToStore',
])
const ACTION_FIELDS: Record<DeclarativeAction['t'], Set<string>> = {
  val: new Set(['t', 'id', 'v']),
  chk: new Set(['t', 'id', 'c']),
  sel: new Set(['t', 'id', 'v']),
  clk: new Set(['t', 'id', 'co']),
  adv: new Set(['t', 'id']),
  js: new Set(['t', 'v']),
  drag: new Set(['t', 'from', 'to']),
}

function text(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value.trim().slice(0, MAX_TEXT) : fallback
}

function requireText(value: unknown, field: string): string {
  const result = text(value)
  if (!result) throw new Error(`Plano inválido: ${field} é obrigatório.`)
  return result
}

function normalizeAction(raw: unknown, index: number): DeclarativeAction | null {
  if (!raw || typeof raw !== 'object') return null
  const action = raw as Record<string, unknown>
  const type = action.t
  if (typeof type !== 'string' || !ACTION_TYPES.has(type as DeclarativeAction['t'])) {
    return null
  }

  if (type === 'adv') {
    return { t: 'adv', ...(text(action.id) ? { id: text(action.id, '').slice(0, 500) } : {}) }
  }

  if (type === 'drag') {
    const from = text(action.from)
    const to = text(action.to)
    if (!from || !to) return null
    return { t: 'drag', from: from.slice(0, 500), to: to.slice(0, 500) }
  }

  if (type === 'js') {
    const code = text(action.v)
    if (!code || code.length > 8_000) return null
    return { t: 'js', v: code }
  }

  const id = text(action.id).slice(0, 500)
  if (!id) return null

  if (type === 'val') {
    return { t: 'val', id, v: text(action.v).slice(0, MAX_TEXT) }
  }
  if (type === 'sel') {
    const values = Array.isArray(action.v) ? action.v : [action.v]
    const normalized = values.map((value) => text(value).slice(0, 500)).filter(Boolean)
    return { t: 'sel', id, v: normalized }
  }
  if (type === 'chk') {
    return { t: 'chk', id, c: Boolean(action.c !== false) }
  }

  const result: DeclarativeAction = { t: 'clk', id }
  if (Array.isArray(action.co) && action.co.length === 2 && action.co.every((value) => typeof value === 'number' && Number.isFinite(value))) {
    result.co = [action.co[0], action.co[1]]
  }
  return result
}

export function validateAnalysisPlan(raw: unknown): AnalysisPlan {
  if (!raw || typeof raw !== 'object') {
    return {
      pageType: 'info',
      mode: 'acao_sem_resposta',
      confidence: 0.5,
      rationale: 'Resposta estruturada não identificada; avançando como informativo.',
      actions: [{ t: 'adv' }],
    }
  }

  const source = raw as Record<string, unknown>

  let pageType = source.pageType as AnalysisPlan['pageType']
  let mode = source.mode as ResponseMode

  if (typeof pageType !== 'string' || !PAGE_TYPES.has(pageType)) {
    pageType = 'question'
  }
  if (typeof mode !== 'string' || !RESPONSE_MODES.has(mode)) {
    mode = 'escolha_unica'
  }

  const rawActions = Array.isArray(source.actions) ? source.actions : []
  const actions: DeclarativeAction[] = []

  for (let i = 0; i < Math.min(rawActions.length, MAX_ACTIONS); i++) {
    const normalized = normalizeAction(rawActions[i], i)
    if (normalized) {
      actions.push(normalized)
    }
  }

  const regularActions = actions.filter((action) => action.t !== 'adv')
  const hasAdvance = actions.some((action) => action.t === 'adv')

  if (pageType === 'conclusion') {
    // Tela de conclusão não deve conter ações
    actions.length = 0
  } else if (pageType === 'info' || pageType === 'start') {
    // Páginas informativas ou iniciais: se houver cliques (ex: botão Continuar/Iniciar), eles são válidos!
    // Garante que o sinal de avanço sempre esteja presente para o Autopilot avançar
    if (!hasAdvance) {
      actions.push({ t: 'adv' })
    }
  } else if (pageType === 'question' && !hasAdvance) {
    actions.push({ t: 'adv' })
  }

  const confidence = typeof source.confidence === 'number' && Number.isFinite(source.confidence)
    ? Math.min(1, Math.max(0, source.confidence))
    : 0.85

  return {
    pageType,
    mode,
    confidence,
    rationale: text(source.rationale, 'Plano validado e auto-recuperado.'),
    actions,
    ...(text(source.memoryToStore) ? { memoryToStore: text(source.memoryToStore) } : {}),
    ...(source.needsMoreContext ? { needsMoreContext: Boolean(source.needsMoreContext) } : {}),
  }
}
