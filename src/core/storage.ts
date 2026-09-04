import type { EasyQuizSettings, ResponseMode } from './types'

const STORAGE_KEY = 'easyquiz_settings_v1'

const DEFAULT_SETTINGS: EasyQuizSettings = {
  apiKey: '',
  model: 'gemini-2.5-flash',
  modeHint: '',
  dryRun: false,
  autoApply: false,
  autoAdvance: false,
  confidenceThreshold: 0.75,
}

export function loadSettings(): EasyQuizSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { ...DEFAULT_SETTINGS }
    const parsed = JSON.parse(raw) as Partial<EasyQuizSettings>
    return {
      apiKey: typeof parsed.apiKey === 'string' ? parsed.apiKey.trim() : DEFAULT_SETTINGS.apiKey,
      model: typeof parsed.model === 'string' && parsed.model ? parsed.model : DEFAULT_SETTINGS.model,
      modeHint: (parsed.modeHint ?? '') as ResponseMode | '',
      dryRun: Boolean(parsed.dryRun),
      autoApply: Boolean(parsed.autoApply),
      autoAdvance: Boolean(parsed.autoAdvance),
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
