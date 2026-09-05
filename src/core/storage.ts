import { DEFAULT_SETTINGS, type EasyQuizSettings, type ResponseMode, type ExecutionEngine } from './types'

const STORAGE_KEY = 'easyquiz_settings_v2'

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
    let model = typeof parsed.model === 'string' && parsed.model ? parsed.model : DEFAULT_SETTINGS.model
    if (model === 'gemini-2.5-flash') {
      model = 'gemini-3.5-flash'
    }
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

export function addSessionMemory(text: string): void {
  const clean = text.trim()
  if (clean && !sessionContextMemory.includes(clean)) {
    sessionContextMemory.push(clean)
  }
}

export function getSessionMemories(): string[] {
  return sessionContextMemory
}

export function clearSessionMemories(): void {
  sessionContextMemory = []
}
