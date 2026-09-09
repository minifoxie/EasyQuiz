/**
 * KeyMenu — Mini-modal discreto de configuração de API keys.
 * Ativado por Shift+A. Estilo "prompt do sistema" — completamente discreto.
 */

import { loadSettings, saveSettings } from '../core/storage'
import { validateModelFast } from '../core/gemini'
import type { CoinCursor } from './coinCursor'
import type { CornerToast } from './cornerToast'

export class KeyMenu {
  private el: HTMLDivElement | null = null
  private coin: CoinCursor
  private toast: CornerToast
  private boundKey: (e: KeyboardEvent) => void

  constructor(coin: CoinCursor, toast: CornerToast) {
    this.coin = coin
    this.toast = toast
    this.boundKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && this.isOpen()) {
        e.stopPropagation()
        e.preventDefault()
        this.close()
      }
    }
    this.injectStyle()
  }

  private injectStyle(): void {
    if (document.getElementById('__eqkm_style__')) return
    const s = document.createElement('style')
    s.id = '__eqkm_style__'
    s.textContent = `
      #__eqkm_overlay__ {
        position: fixed; inset: 0;
        background: rgba(0,0,0,0.35);
        z-index: 2147483644;
        display: flex; align-items: center; justify-content: center;
        animation: __eqkm_fadein__ 0.15s ease;
      }
      @keyframes __eqkm_fadein__ {
        from { opacity:0; } to { opacity:1; }
      }
      #__eqkm_modal__ {
        background: #fff;
        border: 1px solid #dadce0;
        border-radius: 8px;
        box-shadow: 0 4px 24px rgba(0,0,0,0.18);
        padding: 20px 22px;
        width: 340px;
        font-family: system-ui,-apple-system,sans-serif;
        font-size: 13px;
        color: #202124;
        animation: __eqkm_slide__ 0.15s ease;
      }
      @keyframes __eqkm_slide__ {
        from { transform:translateY(-8px); opacity:0; }
        to   { transform:translateY(0); opacity:1; }
      }
      #__eqkm_modal__ h3 {
        margin: 0 0 4px;
        font-size: 15px;
        font-weight: 600;
        color: #202124;
      }
      #__eqkm_modal__ .__eqkm_sub__ {
        font-size: 11px;
        color: #80868b;
        margin-bottom: 14px;
      }
      #__eqkm_modal__ .__eqkm_label__ {
        font-size: 11px;
        font-weight: 500;
        color: #5f6368;
        margin-bottom: 4px;
      }
      #__eqkm_modal__ textarea {
        width: 100%;
        height: 90px;
        resize: vertical;
        border: 1px solid #dadce0;
        border-radius: 4px;
        padding: 6px 8px;
        font-family: 'SF Mono','Fira Code','Consolas',monospace;
        font-size: 11px;
        color: #202124;
        outline: none;
        box-sizing: border-box;
        background: #f8f9fa;
        transition: border 0.15s;
      }
      #__eqkm_modal__ textarea:focus {
        border-color: #1a73e8;
        background: #fff;
      }
      #__eqkm_modal__ .__eqkm_count__ {
        font-size: 11px;
        color: #80868b;
        margin-top: 4px;
        margin-bottom: 14px;
        min-height: 16px;
      }
      #__eqkm_modal__ .__eqkm_actions__ {
        display: flex;
        gap: 8px;
        justify-content: flex-end;
      }
      #__eqkm_modal__ button {
        padding: 6px 14px;
        border-radius: 4px;
        border: 1px solid transparent;
        font-size: 13px;
        font-weight: 500;
        cursor: pointer;
        transition: background 0.12s;
      }
      #__eqkm_modal__ .__eqkm_btn_cancel__ {
        background: transparent;
        border-color: #dadce0;
        color: #5f6368;
      }
      #__eqkm_modal__ .__eqkm_btn_cancel__:hover { background: #f1f3f4; }
      #__eqkm_modal__ .__eqkm_btn_verify__ {
        background: transparent;
        border-color: #1a73e8;
        color: #1a73e8;
      }
      #__eqkm_modal__ .__eqkm_btn_verify__:hover { background: #e8f0fe; }
      #__eqkm_modal__ .__eqkm_btn_save__ {
        background: #1a73e8;
        color: #fff;
      }
      #__eqkm_modal__ .__eqkm_btn_save__:hover { background: #1557b0; }
      #__eqkm_modal__ .__eqkm_status__ {
        font-size: 11px;
        margin-top: 8px;
        min-height: 15px;
        padding: 0 2px;
      }
    `
    document.documentElement.appendChild(s)
  }

  open(): void {
    if (this.isOpen()) { this.close(); return }

    const settings = loadSettings()
    const existingKeys = settings.apiKeys.join('\n')

    // Overlay
    const overlay = document.createElement('div')
    overlay.id = '__eqkm_overlay__'

    const modal = document.createElement('div')
    modal.id = '__eqkm_modal__'

    modal.innerHTML = `
      <h3>Configuração de Página</h3>
      <div class="__eqkm_sub__">Gerenciamento de chaves de acesso à API</div>
      <div class="__eqkm_label__">Chaves de acesso (uma por linha):</div>
      <textarea id="__eqkm_ta__" placeholder="Cole aqui as chaves de acesso..." spellcheck="false"></textarea>
      <div class="__eqkm_count__" id="__eqkm_count__"></div>
      <div class="__eqkm_actions__">
        <button class="__eqkm_btn_cancel__" id="__eqkm_cancel__">Cancelar</button>
        <button class="__eqkm_btn_verify__" id="__eqkm_verify__">Verificar</button>
        <button class="__eqkm_btn_save__" id="__eqkm_save__">Salvar</button>
      </div>
      <div class="__eqkm_status__" id="__eqkm_status__"></div>
    `

    overlay.appendChild(modal)
    document.documentElement.appendChild(overlay)
    this.el = overlay

    const ta = modal.querySelector('#__eqkm_ta__') as HTMLTextAreaElement
    const countEl = modal.querySelector('#__eqkm_count__') as HTMLElement
    const statusEl = modal.querySelector('#__eqkm_status__') as HTMLElement

    ta.value = existingKeys
    this.updateCount(ta, countEl, settings.apiKeys.length)

    ta.addEventListener('input', () => {
      const keys = this.parseKeys(ta.value)
      this.updateCount(ta, countEl, keys.length)
    })

    // Buttons
    modal.querySelector('#__eqkm_cancel__')!.addEventListener('click', () => this.close())
    modal.querySelector('#__eqkm_save__')!.addEventListener('click', () => {
      const keys = this.parseKeys(ta.value)
      const primary = keys[0] || ''
      saveSettings({ apiKey: primary, apiKeys: keys })
      this.toast.flash('Configuração Salva')
      this.coin.flashOk(1500)
      this.close()
    })

    modal.querySelector('#__eqkm_verify__')!.addEventListener('click', async () => {
      const keys = this.parseKeys(ta.value)
      if (keys.length === 0) {
        statusEl.style.color = '#d32f2f'
        statusEl.textContent = 'Insira ao menos uma chave.'
        return
      }
      statusEl.style.color = '#80868b'
      statusEl.textContent = 'Verificando...'
      this.coin.setState('loading')
      try {
        const currentModel = loadSettings().model
        const result = await validateModelFast(currentModel, keys)
        if (result.ok) {
          statusEl.style.color = '#2e7d32'
          statusEl.textContent = `✓ Acesso validado (${result.model})`
          this.coin.flashOk()
          this.toast.flash('Acesso Verificado')
        } else {
          statusEl.style.color = '#d32f2f'
          statusEl.textContent = `✗ ${result.message.slice(0, 60)}`
          this.coin.flashError()
          this.toast.flash('Acesso Negado')
        }
      } catch (e) {
        statusEl.style.color = '#d32f2f'
        statusEl.textContent = `✗ Erro ao verificar.`
        this.coin.flashError()
      }
    })

    // Fechar ao clicar no overlay (fora do modal)
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) this.close()
    })

    // Fechar com Escape
    window.addEventListener('keydown', this.boundKey, { capture: true })

    // Foco no textarea
    requestAnimationFrame(() => ta.focus())
  }

  private parseKeys(raw: string): string[] {
    return raw
      .split(/[\n\r,]+/)
      .map(k => k.trim().replace(/^["']|["']$/g, ''))
      .filter(k => k.length > 5)
  }

  private updateCount(ta: HTMLTextAreaElement, el: HTMLElement, count: number): void {
    const keys = this.parseKeys(ta.value)
    const n = keys.length
    if (n === 0) {
      el.textContent = ''
    } else {
      el.textContent = `${n} chave${n !== 1 ? 's' : ''} cadastrada${n !== 1 ? 's' : ''}`
    }
  }

  close(): void {
    window.removeEventListener('keydown', this.boundKey, { capture: true })
    this.el?.remove()
    this.el = null
  }

  isOpen(): boolean { return this.el !== null }

  destroy(): void { this.close() }
}
