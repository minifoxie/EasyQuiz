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
    return {
      apiKey: typeof parsed.apiKey === 'string' ? parsed.apiKey.trim() : DEFAULT_SETTINGS.apiKey,
      model: typeof parsed.model === 'string' && parsed.model ? parsed.model : DEFAULT_SETTINGS.model,
      modeHint: (parsed.modeHint ?? '') as ResponseMode | '',
      engine: (parsed.engine ?? 'smart') as ExecutionEngine,
      dryRun: Boolean(parsed.dryRun),
      autoApply: Boolean(parsed.autoApply),
      autoAdvance: Boolean(parsed.autoAdvance),
      hostDarkMode: parsed.hostDarkMode !== undefined ? Boolean(parsed.hostDarkMode) : true,
      confidenceThreshold:
        typeof parsed.confidenceThreshold === 'number'
          ? parsed.confidenceThreshold
          : DEFAULT_SETTINGS.confidenceThreshold,
    }
  } catch {
    return { ...DEFAULT_SETTINGS }
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
