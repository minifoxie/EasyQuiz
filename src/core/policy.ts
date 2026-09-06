import type { DeclarativeAction, EasyQuizSettings, ExecutionEngine } from './types'

export type ExecutionCapability = 'dom' | 'framework' | 'keyboard' | 'drag' | 'vision' | 'javascript' | 'navigation'

export interface ExecutionPolicy {
  engine: ExecutionEngine
  capabilities: ReadonlySet<ExecutionCapability>
  maxAttemptsPerAction: number
  maxActionMs: number
  allowJavaScript: boolean
  allowNavigation: boolean
}

const BLOCKED_JS_PATTERNS = [
  /\bfetch\b/i,
  /\bXMLHttpRequest\b/i,
  /\bWebSocket\b/i,
  /\b(?:localStorage|sessionStorage|indexedDB)\b/i,
  /\b(?:eval|Function|AsyncFunction|GeneratorFunction)\b/i,
  /\bimport(?:Scripts)?\b/i,
  /\bnavigator\s*\.\s*credentials\b/i,
  /\b(?:cookie|location\s*=|history\s*\.)/i,
  /\bwindow\s*\[\s*['"](?:fetch|eval|Function|localStorage|sessionStorage)/i,
]

export function createExecutionPolicy(settings?: Pick<EasyQuizSettings, 'engine' | 'autoAdvance'>): ExecutionPolicy {
  const engine = settings?.engine || 'smart'
  const capabilities = new Set<ExecutionCapability>(['dom', 'framework', 'keyboard', 'drag'])
  if (settings?.autoAdvance) capabilities.add('navigation')
  if (engine === 'javascript') capabilities.add('javascript')
  return {
    engine,
    capabilities,
    maxAttemptsPerAction: engine === 'command' ? 1 : 2,
    maxActionMs: engine === 'command' ? 1_500 : 3_000,
    allowJavaScript: engine === 'javascript',
    allowNavigation: Boolean(settings?.autoAdvance),
  }
}

export function assertActionAllowed(action: DeclarativeAction, policy: ExecutionPolicy): void {
  if (action.t === 'js' && !policy.allowJavaScript) {
    throw new Error('Ação JavaScript bloqueada pela engine atual. Use o motor JavaScript explicitamente.')
  }
  if (action.t === 'adv' && !policy.allowNavigation) {
    throw new Error('Avanço automático bloqueado pela política atual.')
  }
}

export function validateJavaScriptSource(code: string): void {
  if (!code.trim()) throw new Error('JavaScript recusado: código vazio.')
  if (code.length > 8_000) throw new Error('JavaScript recusado: código acima do limite operacional.')
  const blocked = BLOCKED_JS_PATTERNS.find((pattern) => pattern.test(code))
  if (blocked) throw new Error('JavaScript recusado: acesso externo, persistência ou avaliação dinâmica não permitidos.')
  if (!/^\s*(?:\/\/[^\n]*\n|\/\*[\s\S]*?\*\/|[\s\S])*\$eq\./.test(code) && !code.includes('$eq.')) {
    throw new Error('JavaScript recusado: use somente a API declarativa $eq.')
  }
}
