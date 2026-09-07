import { DEFAULT_SETTINGS, type EasyQuizSettings, type ResponseMode, type ExecutionEngine, type ActivityMetrics, type QuestionTimingRecord } from './types'
import { isValidQuizModel } from './modelValidation'

const STORAGE_KEY = 'easyquiz_settings_v2'
const METRICS_STORAGE_KEY = 'easyquiz_activity_metrics'

export function loadSettings(): EasyQuizSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      // Tenta migrar do v1 se existir
      const oldRaw = localStorage.getItem('easyquiz_settings_v1')
      if (oldRaw) {
        const oldParsed = JSON.parse(oldRaw)
        return { ...DEFAULT_SETTINGS, apiKey: oldParsed.apiKey || '' }
      }
      return { ...DEFAULT_SETTINGS }
    }
    const parsed = JSON.parse(raw) as Partial<EasyQuizSettings>
    let model = typeof parsed.model === 'string' && isValidQuizModel(parsed.model) ? parsed.model : DEFAULT_SETTINGS.model
    return {
      apiKey: typeof parsed.apiKey === 'string' ? parsed.apiKey.trim() : DEFAULT_SETTINGS.apiKey,
      model,
      uiMode: (parsed.uiMode === 'easy' || parsed.uiMode === 'advanced') ? parsed.uiMode : DEFAULT_SETTINGS.uiMode,
      modeHint: (parsed.modeHint ?? '') as ResponseMode | '',
      engine: (parsed.engine ?? 'smart') as ExecutionEngine,
      dryRun: Boolean(parsed.dryRun),
      autoApply: parsed.autoApply !== undefined ? Boolean(parsed.autoApply) : true,
      autoAdvance: Boolean(parsed.autoAdvance),
      hostDarkMode: parsed.hostDarkMode !== undefined ? Boolean(parsed.hostDarkMode) : true,
      useVision: Boolean(parsed.useVision),
      confidenceThreshold:
        typeof parsed.confidenceThreshold === 'number'
          ? parsed.confidenceThreshold
          : DEFAULT_SETTINGS.confidenceThreshold,
    }
  } catch {
    return { ...DEFAULT_SETTINGS }
  }
}

export function resetAllData(): void {
  try {
    localStorage.removeItem(STORAGE_KEY)
    localStorage.removeItem('easyquiz_settings_v1')
    localStorage.removeItem(METRICS_STORAGE_KEY)
    sessionStorage.removeItem(METRICS_STORAGE_KEY)
    const keysToRemove: string[] = []
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i)
      if (k && (k.startsWith('eq_') || k.startsWith('easyquiz_'))) {
        keysToRemove.push(k)
      }
    }
    keysToRemove.forEach((k) => localStorage.removeItem(k))
    clearSessionMemories()
  } catch (e) {
    console.warn('[EasyQuiz] Erro ao resetar dados:', e)
  }
}

export interface DomainCache {
  advanceSelector?: string
}

export function loadDomainCache(hostname: string): DomainCache {
  try {
    const raw = localStorage.getItem('eq_domain_cache_' + hostname)
    if (!raw) return {}
    const parsed = JSON.parse(raw) as DomainCache
    if (parsed.advanceSelector && /inject|injetar/i.test(parsed.advanceSelector)) {
      parsed.advanceSelector = undefined
      try {
        localStorage.removeItem('eq_domain_cache_' + hostname)
      } catch {}
    }
    return parsed
  } catch {
    return {}
  }
}

export function saveDomainCache(hostname: string, data: Partial<DomainCache>): void {
  if (data.advanceSelector && /inject|injetar/i.test(data.advanceSelector)) {
    return
  }
  const current = loadDomainCache(hostname)
  const updated = { ...current, ...data }
  try {
    localStorage.setItem('eq_domain_cache_' + hostname, JSON.stringify(updated))
  } catch (error) {
    console.warn('[EasyQuiz] Erro cache de dominio:', error)
  }
}


export function saveSettings(settings: Partial<EasyQuizSettings>): EasyQuizSettings {
  const current = loadSettings()
  const updated: EasyQuizSettings = { ...current, ...settings }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  } catch (error) {
    console.warn('[EasyQuiz] Falha ao persistir configurações no localStorage:', error)
  }
  return updated
}

// ==== MEMÓRIA DE SESSÃO DA IA (RAG AUTÔNOMO) ====
let sessionContextMemory: string[] = []
const MAX_SESSION_MEMORIES = 12
const MAX_MEMORY_LENGTH = 1_200

export function addSessionMemory(text: string): void {
  const clean = text.trim().replace(/\s+/g, ' ').slice(0, MAX_MEMORY_LENGTH)
  if (clean && !sessionContextMemory.includes(clean)) {
    sessionContextMemory.push(clean)
    if (sessionContextMemory.length > MAX_SESSION_MEMORIES) {
      sessionContextMemory = sessionContextMemory.slice(-MAX_SESSION_MEMORIES)
    }
  }
}

export function getSessionMemories(): string[] {
  return sessionContextMemory
}

export function clearSessionMemories(): void {
  sessionContextMemory = []
}

function createEmptyMetrics(): ActivityMetrics {
  return {
    startTime: Date.now(),
    totalElapsedMs: 0,
    completedQuestionsCount: 0,
    averageDurationMs: 0,
    records: [],
  }
}

let activeSessionMetrics: ActivityMetrics = createEmptyMetrics()

// ==== MÉTRICAS DINÂMICAS DE TEMPO DA ATIVIDADE (CRONÔMETRO) ====
export function loadActivityMetrics(): ActivityMetrics {
  try {
    localStorage.removeItem(METRICS_STORAGE_KEY)
  } catch {}
  return activeSessionMetrics
}

export function saveActivityMetrics(metrics: ActivityMetrics): void {
  activeSessionMetrics = metrics
  try {
    const serialized = JSON.stringify(metrics)
    sessionStorage.setItem(METRICS_STORAGE_KEY, serialized)
    localStorage.removeItem(METRICS_STORAGE_KEY)
  } catch {}
}

export function recordQuestionTiming(
  item: Omit<QuestionTimingRecord, 'timestamp'>,
): ActivityMetrics {
  const current = activeSessionMetrics
  const now = Date.now()

  // Evita duplicar a mesma questão se já gravada recentemente (< 3s)
  const lastRecord = current.records[current.records.length - 1]
  if (lastRecord && lastRecord.id === item.id && now - lastRecord.timestamp < 3000) {
    return current
  }

  const record: QuestionTimingRecord = {
    ...item,
    timestamp: now,
  }

  const updatedRecords = [...current.records, record]
  const completedCount = updatedRecords.filter((r) => r.status === 'answered' || r.status === 'verified').length
  const totalDuration = updatedRecords.reduce((acc, r) => acc + r.durationMs, 0)
  const avgDuration = completedCount > 0 ? Math.round(totalDuration / completedCount) : 0

  const updated: ActivityMetrics = {
    startTime: current.startTime || now,
    totalElapsedMs: Math.max(now - (current.startTime || now), totalDuration),
    completedQuestionsCount: completedCount,
    averageDurationMs: avgDuration,
    records: updatedRecords,
  }

  saveActivityMetrics(updated)
  return updated
}

export function resetActivityMetrics(): ActivityMetrics {
  activeSessionMetrics = createEmptyMetrics()
  try {
    sessionStorage.removeItem(METRICS_STORAGE_KEY)
    localStorage.removeItem(METRICS_STORAGE_KEY)
  } catch {}
  return activeSessionMetrics
}

