/**
 * EasyQuiz — Biblioteca de Mini-Skills da Página e Memória de Anti-Patterns
 * 
 * Permite que a IA defina o fluxo e acumule uma memória viva por página/domínio:
 * 1. Biblioteca de Mini-Skills: Padrões de interação, seletores comprovados e regras de plataforma
 *    aprendidas e reutilizadas em todas as questões da sessão.
 * 2. Memória de Anti-Patterns (Não Persistir no Erro): Registro rigoroso de ações que falharam
 *    para NUNCA mais repetir erros no mesmo formulário/domínio.
 * 3. Feedback Visual e Afirmativo: Emite notificações reativas para atualização do HUD, painel e terminal.
 */

import type { DeclarativeAction } from './types'

export interface PageSkill {
  id: string
  name: string
  description: string
  rule?: string
  selectorPattern?: string
  successCount: number
  lastUsedAt: number
  source: 'heuristic' | 'ai_synthesized' | 'auto_repaired'
}

export interface FailedActionPattern {
  id: string
  actionType: string
  target: string
  attemptedValue?: string
  reason: string
  timestamp: number
  retryAvoidanceHint: string
}

export interface PageDomainProfile {
  domain: string
  platformName?: string
  skills: PageSkill[]
  failedPatterns: FailedActionPattern[]
  flowNotes: string[]
  lastUpdated: number
}

type SkillListener = (profile: PageDomainProfile) => void
const listeners: Set<SkillListener> = new Set()

export function onPageSkillsChanged(listener: SkillListener): () => void {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

function notifyListeners(profile: PageDomainProfile): void {
  for (const listener of listeners) {
    try {
      listener(profile)
    } catch (e) {
      console.warn('[EasyQuiz Skills] Erro em listener:', e)
    }
  }
}

function getDomainKey(url?: string): string {
  try {
    const raw = url || (typeof window !== 'undefined' ? window.location.href : '')
    if (!raw) return 'global'
    const u = new URL(raw)
    return u.hostname.replace(/^www\./, '').toLowerCase() || 'global'
  } catch {
    return 'global'
  }
}

const STORAGE_PREFIX = 'eq_skills_profile_'
const MAX_SKILLS = 20
const MAX_FAILED_PATTERNS = 15

// Cache em memória para acesso síncrono e ultra-rápido
const memoryCache = new Map<string, PageDomainProfile>()

// Pre-seeded heuristic skills para plataformas conhecidas
function getInitialPlatformSkills(domain: string): PageSkill[] {
  const now = Date.now()
  if (domain.includes('khanacademy.org')) {
    return [
      {
        id: 'khan_mathquill_val',
        name: 'Khan Perseus MathQuill',
        description: 'Inputs matemáticos com data-testid="perseus-expression-input" requerem foco seguido de insertText ou disparo de input/change.',
        rule: 'Use val no controle eq-ctrl-X ou JS com document.execCommand("insertText", false, valor).',
        selectorPattern: '[data-testid*="expression-input"], .mq-editable-field',
        successCount: 1,
        lastUsedAt: now,
        source: 'heuristic',
      },
      {
        id: 'khan_radio_choice',
        name: 'Khan Perseus Escolha Única',
        description: 'Alternativas de rádio no Khan Academy usam containers choice-radio-btn ou data-testid="choice-N".',
        rule: 'Use chk com o ID do controle. Em caso de overlay, acione o label pai.',
        selectorPattern: '[data-testid*="choice-"], .choice-radio-btn',
        successCount: 1,
        lastUsedAt: now,
        source: 'heuristic',
      },
      {
        id: 'khan_advance_btn',
        name: 'Khan Avanço Perseus',
        description: 'Botão de verificação/próxima questão Perseus fica no rodapé da tarefa.',
        rule: 'Use {t:"adv"}. O sistema localiza o botão de verificação automaticamente.',
        selectorPattern: '[data-testid*="exercise-check-answer"], [data-testid*="exercise-next-question"]',
        successCount: 1,
        lastUsedAt: now,
        source: 'heuristic',
      },
    ]
  }

  if (domain.includes('google.com') || domain.includes('forms.gle')) {
    return [
      {
        id: 'gforms_container_clk',
        name: 'Google Forms Container Click',
        description: 'Em formulários Google, radios e checkboxes são encapsulados em divs com classe .Qr7Oae.',
        rule: 'Clique no container de opção ou dispare eventos no radio nativo e seu wrapper.',
        selectorPattern: '.Qr7Oae, [data-item-id], [role="radio"]',
        successCount: 1,
        lastUsedAt: now,
        source: 'heuristic',
      },
    ]
  }

  if (domain.includes('wayground') || domain.includes('quizizz')) {
    return [
      {
        id: 'wayground_tile_clk',
        name: 'Wayground Cards Clicáveis',
        description: 'As alternativas são botões/cards clicáveis com id hexadecimal ou atributos data-functional-selector.',
        rule: 'Use clk direto no ID do card ou no texto exato da alternativa.',
        selectorPattern: '[class*="cursor-pointer"][id], [data-functional-selector*="option"]',
        successCount: 1,
        lastUsedAt: now,
        source: 'heuristic',
      },
    ]
  }

  return []
}

export function loadPageProfile(url?: string): PageDomainProfile {
  const domain = getDomainKey(url)
  if (memoryCache.has(domain)) {
    return memoryCache.get(domain)!
  }

  try {
    const raw = typeof localStorage !== 'undefined' ? localStorage.getItem(STORAGE_PREFIX + domain) : null
    if (raw) {
      const parsed = JSON.parse(raw) as PageDomainProfile
      if (parsed && Array.isArray(parsed.skills)) {
        memoryCache.set(domain, parsed)
        return parsed
      }
    }
  } catch (e) {
    console.warn('[EasyQuiz Skills] Erro ao carregar perfil de skills:', e)
  }

  const initialProfile: PageDomainProfile = {
    domain,
    skills: getInitialPlatformSkills(domain),
    failedPatterns: [],
    flowNotes: [],
    lastUpdated: Date.now(),
  }

  memoryCache.set(domain, initialProfile)
  return initialProfile
}

export function savePageProfile(profile: PageDomainProfile): void {
  const domain = profile.domain || 'global'
  profile.lastUpdated = Date.now()
  memoryCache.set(domain, profile)

  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_PREFIX + domain, JSON.stringify(profile))
    }
  } catch (e) {
    console.warn('[EasyQuiz Skills] Falha ao persistir perfil de skills:', e)
  }

  notifyListeners(profile)
}

/**
 * Adiciona ou incrementa uma mini-skill aprendida para este domínio
 */
export function recordSkill(
  skill: {
    id?: string
    name: string
    description: string
    rule?: string
    selectorPattern?: string
    source?: 'heuristic' | 'ai_synthesized' | 'auto_repaired'
  },
  url?: string,
): PageSkill {
  const profile = loadPageProfile(url)
  const id = skill.id || `skill_${skill.name.toLowerCase().replace(/[^a-z0-9]/g, '_').slice(0, 30)}`
  const now = Date.now()

  const existingIdx = profile.skills.findIndex((s) => s.id === id || s.name === skill.name)
  let updatedSkill: PageSkill

  if (existingIdx !== -1) {
    const existing = profile.skills[existingIdx]
    updatedSkill = {
      ...existing,
      description: skill.description || existing.description,
      rule: skill.rule || existing.rule,
      selectorPattern: skill.selectorPattern || existing.selectorPattern,
      successCount: existing.successCount + 1,
      lastUsedAt: now,
      source: skill.source || existing.source,
    }
    profile.skills[existingIdx] = updatedSkill
  } else {
    updatedSkill = {
      id,
      name: skill.name,
      description: skill.description,
      rule: skill.rule,
      selectorPattern: skill.selectorPattern,
      successCount: 1,
      lastUsedAt: now,
      source: skill.source || 'ai_synthesized',
    }
    profile.skills.push(updatedSkill)
    if (profile.skills.length > MAX_SKILLS) {
      // Ordena por sucesso e frescor, mantendo os melhores
      profile.skills.sort((a, b) => b.successCount * 2 + (b.lastUsedAt > a.lastUsedAt ? 1 : -1) - (a.successCount * 2))
      profile.skills = profile.skills.slice(0, MAX_SKILLS)
    }
  }

  savePageProfile(profile)
  return updatedSkill
}

/**
 * Registra ação que falhou para NUNCA mais persistir no erro (Memória Anti-Patterns)
 */
export function recordFailedAction(
  action: DeclarativeAction,
  reason: string,
  url?: string,
): FailedActionPattern {
  const profile = loadPageProfile(url)
  const target = (action as any).id || (action as any).from || (action as any).name || 'action'
  const val = (action as any).v !== undefined ? String((action as any).v) : undefined
  const patternId = `${action.t}:${target}:${val || ''}`.slice(0, 80)
  const now = Date.now()

  let hint = `Evite a ação (${action.t}) com alvo "${target}".`
  if (reason.includes('não encontrado') || reason.includes('desabilitado')) {
    hint = `O elemento "${target}" não está acessível ou está oculto. Use seletor alternativo ou código JS via $eq.`
  } else if (reason.includes('não marcou') || reason.includes('inalterado')) {
    hint = `Disparo padrão DOM em "${target}" não alterou o estado. Necessário evento sintético no label pai ou bypass via script.`
  }

  const existingIdx = profile.failedPatterns.findIndex((f) => f.id === patternId)
  const item: FailedActionPattern = {
    id: patternId,
    actionType: action.t,
    target: String(target),
    attemptedValue: val,
    reason: reason.slice(0, 150),
    timestamp: now,
    retryAvoidanceHint: hint,
  }

  if (existingIdx !== -1) {
    profile.failedPatterns[existingIdx] = item
  } else {
    profile.failedPatterns.unshift(item)
    if (profile.failedPatterns.length > MAX_FAILED_PATTERNS) {
      profile.failedPatterns = profile.failedPatterns.slice(0, MAX_FAILED_PATTERNS)
    }
  }

  savePageProfile(profile)
  return item
}

/**
 * Registra sucesso em uma ação para reforçar a biblioteca de skills
 */
export function recordActionSuccess(
  action: DeclarativeAction,
  strategy: string,
  url?: string,
): void {
  const target = (action as any).id || (action as any).name || ''
  if (!target) return

  // Se a ação sucedeu através de fallback de recuperação, aprendemos essa skill!
  if (strategy.includes('Estratégia') || strategy.includes('script') || strategy.includes('keyboard')) {
    recordSkill(
      {
        id: `auto_repaired_${action.t}_${strategy.slice(0, 20)}`,
        name: `Recuperação: ${strategy}`,
        description: `Na plataforma ativa, ações (${action.t}) em "${target}" foram bem-sucedidas via ${strategy}.`,
        rule: `Utilize preferencialmente injeção ou estratégia equivalente quando interagir com controles similares nesta página.`,
        source: 'auto_repaired',
      },
      url,
    )
  }
}

/**
 * Adiciona uma nota sobre o fluxo da página (etapa, transição, quiz sequencial)
 */
export function recordFlowNote(note: string, url?: string): void {
  const profile = loadPageProfile(url)
  const clean = note.trim().slice(0, 200)
  if (clean && !profile.flowNotes.includes(clean)) {
    profile.flowNotes.push(clean)
    if (profile.flowNotes.length > 8) {
      profile.flowNotes = profile.flowNotes.slice(-8)
    }
    savePageProfile(profile)
  }
}

/**
 * Monta os blocos de Mini-Skills e Anti-Patterns formatados para o Prompt da IA
 */
export function formatSkillsContextForPrompt(url?: string): string {
  const profile = loadPageProfile(url)
  let output = ''

  // 1. Biblioteca de Mini-Skills da Página
  if (profile.skills.length > 0) {
    output += '\n[BIBLIOTECA DE MINI-SKILLS DA PÁGINA (APRENDIZADOS REUTILIZÁVEIS)]:\n'
    output += 'A IA acumulou as seguintes regras e habilidades verificadas para esta página/domínio:\n'
    for (const skill of profile.skills.slice(0, 8)) {
      output += `• [SKILL: ${skill.name}] ${skill.description} Regra: ${skill.rule || 'Aplicar sempre que aplicável.'}\n`
    }
  }

  // 2. Memória de Anti-Patterns / Erros que Falharam (NÃO REPETIR)
  if (profile.failedPatterns.length > 0) {
    output += '\n[MEMÓRIA DE ANTI-PATTERNS & ERROS DA PÁGINA — NÃO REPETIR!]:\n'
    output += '⚠️ As seguintes ações JÁ FALHARAM anteriormente nesta página. NÃO insista no mesmo erro:\n'
    for (const fail of profile.failedPatterns.slice(0, 6)) {
      output += `• FALHA ANTERIOR (${fail.actionType} em "${fail.target}"): "${fail.reason}" → DICA ANTI-ERRO: ${fail.retryAvoidanceHint}\n`
    }
    output += 'Raciocine no campo "thinking" como sua decisão atual desvia dessas falhas conhecidas.\n'
  }

  // 3. Notas de Fluxo da Página
  if (profile.flowNotes.length > 0) {
    output += '\n[FLUXO DA PÁGINA]:\n'
    output += profile.flowNotes.map((n) => `• ${n}`).join('\n') + '\n'
  }

  return output
}

/**
 * Limpa todo o perfil de skills do domínio ativo
 */
export function clearDomainSkills(url?: string): void {
  const domain = getDomainKey(url)
  memoryCache.delete(domain)
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(STORAGE_PREFIX + domain)
    }
  } catch {}
  notifyListeners({
    domain,
    skills: [],
    failedPatterns: [],
    flowNotes: [],
    lastUpdated: Date.now(),
  })
}
