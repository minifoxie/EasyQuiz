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
  if (value === null || value === undefined) return fallback
  if (typeof value === 'string') return value.trim().slice(0, MAX_TEXT)
  if (typeof value === 'number' || typeof value === 'boolean') return String(value).trim().slice(0, MAX_TEXT)
  return fallback
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
    const rawAdvId = action.id ?? action.target ?? action.name ?? action.selector
    return { t: 'adv', ...(text(rawAdvId) ? { id: text(rawAdvId, '').slice(0, 500) } : {}) }
  }

  if (type === 'drag') {
    const from = text(action.from ?? action.source)
    const to = text(action.to ?? action.target ?? action.destination)
    if (!from || !to) return null
    return { t: 'drag', from: from.slice(0, 500), to: to.slice(0, 500) }
  }

  if (type === 'js') {
    const code = text(action.v ?? action.code ?? action.script)
    if (!code || code.length > 8_000) return null
    return { t: 'js', v: code }
  }

  let rawId = action.id ?? action.target ?? action.name ?? action.selector ?? action.element
  if ((rawId === undefined || rawId === null || rawId === '') && type === 'val') {
    rawId = '1'
  }
  const id = text(rawId).slice(0, 500)
  if (!id) return null

  if (type === 'val') {
    const rawVal =
      action.v !== undefined
        ? action.v
        : action.value !== undefined
          ? action.value
          : action.val !== undefined
            ? action.val
            : action.text !== undefined
              ? action.text
              : action.answer
    return { t: 'val', id, v: text(rawVal).slice(0, MAX_TEXT) }
  }
  if (type === 'sel') {
    const rawVal =
      action.v !== undefined
        ? action.v
        : action.value !== undefined
          ? action.value
          : action.val !== undefined
            ? action.val
            : action.values
    const values = Array.isArray(rawVal) ? rawVal : [rawVal]
    const normalized = values.map((value) => text(value).slice(0, 500)).filter(Boolean)
    return { t: 'sel', id, v: normalized }
  }
  if (type === 'chk') {
    const isExplicitlyFalse =
      action.c === false ||
      action.c === 'false' ||
      action.c === 0 ||
      action.c === '0' ||
      action.c === 'off' ||
      action.c === 'unchecked' ||
      action.c === 'desmarcar'
    const res: DeclarativeAction = { t: 'chk', id, c: !isExplicitlyFalse }
    if (action.v !== undefined) {
      ;(res as any).v = text(action.v).slice(0, MAX_TEXT)
    }
    return res
  }

  const result: DeclarativeAction = { t: 'clk', id }
  if (action.c !== undefined) {
    const isExplicitlyFalse =
      action.c === false ||
      action.c === 'false' ||
      action.c === 0 ||
      action.c === '0' ||
      action.c === 'off' ||
      action.c === 'unchecked' ||
      action.c === 'desmarcar'
    ;(result as any).c = !isExplicitlyFalse
  }
  if (action.v !== undefined) {
    ;(result as any).v = text(action.v).slice(0, MAX_TEXT)
  }
  if (Array.isArray(action.co) && action.co.length === 2 && action.co.every((value) => typeof value === 'number' && Number.isFinite(value))) {
    result.co = [action.co[0], action.co[1]]
  }
  return result
}

function sanitizeActionsForMode(
  actions: DeclarativeAction[],
  mode: ResponseMode,
  pageType: AnalysisPlan['pageType'],
): DeclarativeAction[] {
  if (pageType !== 'question') return actions

  const advanceActions = actions.filter((a) => a.t === 'adv')
  let regularActions: DeclarativeAction[] = actions.filter((a) => a.t !== 'adv')

  if (mode === 'escolha_unica') {
    // 1. Em escolha_unica, descarta qualquer ação negativa (c: false / desmarcar).
    // Desmarcar em rádio é desnecessário e causa o bug de desmarcar a resposta ou inverter estado.
    regularActions = regularActions.filter((a) => {
      if (a.t === 'chk' && a.c === false) return false
      if (a.t === 'clk' && (a as any).c === false) return false
      return true
    })

    // 2. Em escolha_unica, deve haver no máximo 1 ação de seleção/resposta.
    // Se a IA prescreveu múltiplos cliques/checks em opções, mantém apenas a última opção positiva indicada.
    const selectionActions = regularActions.filter((a) => a.t === 'chk' || a.t === 'clk')
    if (selectionActions.length > 1) {
      const nonSelection = regularActions.filter((a) => a.t !== 'chk' && a.t !== 'clk')
      const chosenAction = selectionActions[selectionActions.length - 1]
      regularActions = [...nonSelection, chosenAction]
    }
  } else if (mode === 'escolha_multipla') {
    // Em escolha_multipla, remove ações negativas com c: false.
    // A IA deve indicar apenas as opções que DEVEM ser marcadas.
    regularActions = regularActions.filter((a) => {
      if (a.t === 'chk' && a.c === false) return false
      if (a.t === 'clk' && (a as any).c === false) return false
      return true
    })

    // Remove duplicatas de ações sobre o mesmo ID
    const seenIds = new Set<string>()
    regularActions = regularActions.filter((a) => {
      const id = 'id' in a && typeof (a as any).id === 'string' ? (a as any).id : ''
      if (!id) return true
      if (seenIds.has(id)) return false
      seenIds.add(id)
      return true
    })
  } else if (mode === 'verdadeiro_falso') {
    // Em verdadeiro_falso, para cada linha/ID deve haver no máximo 1 ação
    const seenIds = new Set<string>()
    const reversed = [...regularActions].reverse()
    const deduplicated: DeclarativeAction[] = []
    for (const act of reversed) {
      const id = 'id' in act && typeof (act as any).id === 'string' ? (act as any).id : ''
      if (id) {
        if (!seenIds.has(id)) {
          seenIds.add(id)
          deduplicated.push(act)
        }
      } else {
        deduplicated.push(act)
      }
    }
    regularActions = deduplicated.reverse()
  }

  return [...regularActions, ...advanceActions]
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
  let actions: DeclarativeAction[] = []

  for (let i = 0; i < Math.min(rawActions.length, MAX_ACTIONS); i++) {
    const normalized = normalizeAction(rawActions[i], i)
    if (normalized) {
      actions.push(normalized)
    }
  }

  // Se as ações contêm ações 'val' e o modo veio como escolha_unica ou indefinido,
  // ajusta o modo automaticamente para 'preenchimento' para evitar descarte indevido
  if (actions.some((a) => a.t === 'val') && (mode === 'escolha_unica' || !source.mode)) {
    mode = 'preenchimento'
  }

  // Se há ações drag e o modo não é adequado para drag/categorização, corrigir automaticamente
  if (actions.some((a) => a.t === 'drag') && !['categorizacao', 'arrastar_soltar', 'ordenacao'].includes(mode)) {
    mode = 'arrastar_soltar'
  }

  // Sanitização estrutural rigorosa por modo para evitar conflitos de clique/desmarcar
  actions = sanitizeActionsForMode(actions, mode, pageType)

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
