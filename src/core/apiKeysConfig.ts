/**
 * EasyQuiz — Configuração Centralizada de API Keys
 *
 * Este arquivo define a arquitetura unificada de chaves para ambos os modos:
 * - Modo Discreto (Stealth)
 * - Modo Legacy (Painel HUD)
 *
 * Ambas as modalidades compartilham o mesmo repositório persistente no localStorage
 * sob a chave principal: 'easyquiz_settings_v2' (e o espelho 'easyquiz_api_keys').
 *
 * Chaves cadastradas no Modo Discreto (Shift+A) ficam imediatamente disponíveis
 * no Modo Legacy (Alt+Q ou Alt+A), e vice-versa.
 */

import { loadSettings, saveSettings } from './storage'
import { keyManager } from './keyManager'

export interface CentralApiKeyStore {
  primaryKey: string
  allKeys: string[]
}

/**
 * Obtém todas as chaves API cadastradas no sistema.
 */
export function getCentralApiKeys(): CentralApiKeyStore {
  const settings = loadSettings()
  return {
    primaryKey: settings.apiKey,
    allKeys: settings.apiKeys || (settings.apiKey ? [settings.apiKey] : []),
  }
}

/**
 * Salva e sincroniza chaves centralizadamente para ambos os modos.
 */
export function setCentralApiKeys(keys: string[]): void {
  const cleanKeys = keys
    .map((k) => (typeof k === 'string' ? k.trim().replace(/^["']|["']$/g, '') : ''))
    .filter((k) => k.length > 5)

  const primaryKey = cleanKeys[0] || ''
  saveSettings({ apiKey: primaryKey, apiKeys: cleanKeys })
  keyManager.init(cleanKeys)
}
