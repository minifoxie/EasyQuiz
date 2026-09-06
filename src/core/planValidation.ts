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
  'pageType', 'mode', 'confidence', 'rationale', 'needsMoreContext', 'warnings', 'actions',
  'memoryToStore', 'interactionProfile', 'requiresVision', 'expectedState', 'confidenceByAction',
  'navigationExpectation',
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

function normalizeAction(raw: unknown, index: number): DeclarativeAction {
  if (!raw || typeof raw !== 'object') throw new Error(`Plano inválido: ação ${index + 1} não é um objeto.`)
  const action = raw as Record<string, unknown>
  const type = action.t
  if (typeof type !== 'string' || !ACTION_TYPES.has(type as DeclarativeAction['t'])) {
    throw new Error(`Plano inválido: tipo de ação desconhecido na posição ${index + 1}.`)
  }
  for (const key of Object.keys(action)) {
    if (!ACTION_FIELDS[type as DeclarativeAction['t']].has(key)) {
      throw new Error(`Plano inválido: campo '${key}' não permitido na ação ${index + 1}.`)
    }
  }

  if (type === 'adv') {
    return { t: 'adv', ...(text(action.id) ? { id: text(action.id, '').slice(0, 500) } : {}) }
  }

  if (type === 'drag') {
    return {
      t: 'drag',
      from: requireText(action.from, `ações[${index}].from`).slice(0, 500),
      to: requireText(action.to, `ações[${index}].to`).slice(0, 500),
    }
  }

  if (type === 'js') {
    const code = requireText(action.v, `ações[${index}].v`)
    if (code.length > 8_000) throw new Error(`Plano inválido: JavaScript da ação ${index + 1} excede o limite.`)
    return { t: 'js', v: code }
  }

  const id = requireText(action.id, `ações[${index}].id`).slice(0, 500)
  if (type === 'val') {
    return { t: 'val', id, v: requireText(action.v, `ações[${index}].v`).slice(0, MAX_TEXT) }
  }
  if (type === 'sel') {
    const values = Array.isArray(action.v) ? action.v : [action.v]
    const normalized = values.map((value) => requireText(value, `ações[${index}].v`).slice(0, 500))
    return { t: 'sel', id, v: normalized }
  }
  if (type === 'chk') {
    if (typeof action.c !== 'boolean') throw new Error(`Plano inválido: ações[${index}].c deve ser booleano.`)
    return { t: 'chk', id, c: action.c }
  }

  const result: DeclarativeAction = { t: 'clk', id }
  if (action.co !== undefined && (!Array.isArray(action.co) || action.co.length !== 2 || !action.co.every((value) => typeof value === 'number' && Number.isFinite(value) && value >= 0 && value <= 10000))) {
    throw new Error(`Plano inválido: coordenadas fora do limite na ação ${index + 1}.`)
  }
  if (Array.isArray(action.co) && action.co.length === 2 && action.co.every((value) => typeof value === 'number' && Number.isFinite(value))) {
    result.co = [action.co[0], action.co[1]]
  }
  return result
}

export function validateAnalysisPlan(raw: unknown): AnalysisPlan {
  if (!raw || typeof raw !== 'object') throw new Error('A IA não retornou um plano de objeto válido.')
  const source = raw as Record<string, unknown>
  for (const key of Object.keys(source)) {
    if (!PLAN_FIELDS.has(key)) throw new Error(`Plano inválido: campo '${key}' não permitido.`)
  }
  const pageType = source.pageType
  const mode = source.mode
  if (typeof pageType !== 'string' || !PAGE_TYPES.has(pageType as AnalysisPlan['pageType'])) {
    throw new Error('Plano inválido: pageType desconhecido.')
  }
  if (typeof mode !== 'string' || !RESPONSE_MODES.has(mode as ResponseMode)) {
    throw new Error('Plano inválido: mode desconhecido.')
  }
  if (!Array.isArray(source.actions) || source.actions.length > MAX_ACTIONS) {
    throw new Error(`Plano inválido: actions deve conter entre 0 e ${MAX_ACTIONS} ações.`)
  }

  const actions = source.actions.map(normalizeAction)
  const regularActions = actions.filter((action) => action.t !== 'adv')
  const hasAdvance = actions.some((action) => action.t === 'adv')
  if (pageType === 'question' && regularActions.length === 0) {
    throw new Error('Plano inválido: uma questão precisa conter ao menos uma ação de resposta.')
  }
  if (pageType === 'conclusion' && actions.length > 0) {
    throw new Error('Plano inválido: tela de conclusão não pode conter ações.')
  }
  if ((pageType === 'info' || pageType === 'start') && regularActions.length > 0) {
    throw new Error('Plano inválido: páginas informativas só podem avançar.')
  }
  if ((pageType === 'info' || pageType === 'start') && !hasAdvance) {
    throw new Error('Plano inválido: página informativa ou inicial precisa indicar avanço.')
  }
  if (pageType === 'question' && !hasAdvance) {
    actions.push({ t: 'adv' })
  }

  const confidence = typeof source.confidence === 'number' && Number.isFinite(source.confidence)
    ? Math.min(1, Math.max(0, source.confidence))
    : 0
  const confidenceByAction = Array.isArray(source.confidenceByAction)
    ? source.confidenceByAction
        .filter((value): value is number => typeof value === 'number' && Number.isFinite(value))
        .map((value) => Math.min(1, Math.max(0, value)))
        .slice(0, regularActions.length)
    : undefined
  if (pageType === 'question' && (!confidenceByAction || confidenceByAction.length !== regularActions.length)) {
    throw new Error('Plano inválido: confidenceByAction deve corresponder a cada ação de resposta.')
  }
  const interactionProfile = ['dom', 'framework', 'drag', 'keyboard', 'javascript', 'vision'].includes(String(source.interactionProfile))
    ? source.interactionProfile as AnalysisPlan['interactionProfile']
    : undefined
  const navigationExpectation = ['none', 'feedback', 'question_change', 'url_change'].includes(String(source.navigationExpectation))
    ? source.navigationExpectation as AnalysisPlan['navigationExpectation']
    : undefined
  if (pageType === 'question' && !navigationExpectation) {
    throw new Error('Plano inválido: navigationExpectation é obrigatório em questões.')
  }
  if ((mode === 'categorizacao' || mode === 'ordenacao' || mode === 'arrastar_soltar') && regularActions.some((action) => action.t !== 'drag')) {
    throw new Error('Plano inválido: modo de arrastar/ordenar exige somente ações drag.')
  }
  if (mode === 'escolha_multipla' && regularActions.some((action) => action.t !== 'chk' && action.t !== 'clk')) {
    throw new Error('Plano inválido: escolha múltipla exige ações chk ou clk.')
  }

  return {
    pageType: pageType as AnalysisPlan['pageType'],
    mode: mode as ResponseMode,
    confidence,
    rationale: text(source.rationale, 'Plano validado sem justificativa fornecida.'),
    needsMoreContext: source.needsMoreContext === true,
    warnings: Array.isArray(source.warnings) ? source.warnings.filter((value): value is string => typeof value === 'string').map((value) => value.slice(0, 500)).slice(0, 20) : [],
    actions,
    ...(text(source.memoryToStore) ? { memoryToStore: text(source.memoryToStore) } : {}),
    ...(interactionProfile ? { interactionProfile } : {}),
    ...(typeof source.requiresVision === 'boolean' ? { requiresVision: source.requiresVision } : {}),
    ...(text(source.expectedState) ? { expectedState: text(source.expectedState) } : {}),
    ...(confidenceByAction ? { confidenceByAction } : {}),
    ...(navigationExpectation ? { navigationExpectation } : {}),
  }
}
