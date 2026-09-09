/**
 * KeyMenu — 1:1 cópia do diálogo de informação do Chrome (centro da tela).
 * Ativado por Shift+A.
 */

import { loadSettings, saveSettings } from '../core/storage'
import { validateModelFast } from '../core/gemini'
import type { CoinCursor } from './coinCursor'
import type { CornerToast } from './cornerToast'

export class KeyMenu {
  private el: HTMLDivElement | null = null
  private coin: CoinCursor
  private toast: CornerToast
  private boundEsc: (e: KeyboardEvent) => void

  constructor(coin: CoinCursor, toast: CornerToast) {
    this.coin = coin
    this.toast = toast
    this.boundEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && this.isOpen()) { e.stopPropagation(); e.preventDefault(); this.close() }
    }
    this.injectStyle()
  }

  private injectStyle(): void {
    if (document.getElementById('__eqkm_style__')) return
    const s = document.createElement('style')
    s.id = '__eqkm_style__'
    // Chrome's info/edit dialog — pixel perfect
    s.textContent = `
      #__eqkm_overlay__ {
        position: fixed; inset: 0;
        background: rgba(0,0,0,0.22);
        z-index: 2147483643;
        display: flex; align-items: flex-start; justify-content: center;
        padding-top: 24px;
        animation: __eqkm_ov__ 0.1s ease;
      }
      @keyframes __eqkm_ov__ { from{opacity:0} to{opacity:1} }
      #__eqkm_dialog__ {
        background: #fff;
        border-radius: 8px;
        box-shadow: 0 8px 32px rgba(0,0,0,0.28), 0 2px 8px rgba(0,0,0,0.12);
        width: 400px;
        max-width: calc(100vw - 32px);
        font-family: system-ui,-apple-system,"Segoe UI",sans-serif;
        font-size: 14px;
        color: #202124;
        overflow: hidden;
        animation: __eqkm_dlg__ 0.14s cubic-bezier(0,0,0.2,1);
      }
      @keyframes __eqkm_dlg__ { from{transform:scale(0.95);opacity:0} to{transform:scale(1);opacity:1} }
      #__eqkm_dialog__ .__eqkm_title__ {
        display: flex; align-items: center; justify-content: space-between;
        padding: 20px 20px 0;
      }
      #__eqkm_dialog__ .__eqkm_title__ h2 {
        font-size: 16px; font-weight: 500; color: #202124; margin: 0;
      }
      #__eqkm_dialog__ .__eqkm_title__ .__eqkm_x__ {
        width: 32px; height: 32px; border-radius: 50%; border: none;
        background: transparent; cursor: pointer; display: flex;
        align-items: center; justify-content: center; color: #5f6368;
        font-size: 18px; line-height: 1; transition: background 0.1s;
      }
      #__eqkm_dialog__ .__eqkm_title__ .__eqkm_x__:hover { background: #f1f3f4; }
      #__eqkm_dialog__ .__eqkm_body__ { padding: 16px 20px; }
      #__eqkm_dialog__ .__eqkm_desc__ {
        font-size: 13px; color: #5f6368; margin: 0 0 16px; line-height: 1.5;
      }
      #__eqkm_dialog__ .__eqkm_field__ {
        position: relative; margin-bottom: 12px;
      }
      #__eqkm_dialog__ .__eqkm_field__ label {
        display: block; font-size: 11px; font-weight: 500;
        color: #5f6368; margin-bottom: 4px; letter-spacing: 0.01em;
      }
      #__eqkm_dialog__ .__eqkm_field__ textarea {
        width: 100%; height: 88px; resize: none;
        border: 1px solid #dadce0; border-radius: 4px;
        padding: 8px 10px; font-size: 12px;
        font-family: "SF Mono","Consolas","Fira Code",monospace;
        color: #202124; background: #fff; outline: none;
        box-sizing: border-box; transition: border 0.15s, box-shadow 0.15s;
        line-height: 1.5;
      }
      #__eqkm_dialog__ .__eqkm_field__ textarea:focus {
        border-color: #1a73e8;
        box-shadow: 0 0 0 2px rgba(26,115,232,0.2);
      }
      #__eqkm_dialog__ .__eqkm_count__ {
        font-size: 11px; color: #70757a; margin-top: 4px;
      }
      #__eqkm_dialog__ .__eqkm_status__ {
        font-size: 12px; min-height: 18px; margin-top: 2px;
        padding: 0; color: #5f6368;
      }
      #__eqkm_dialog__ .__eqkm_actions__ {
        display: flex; gap: 8px; justify-content: flex-end;
        padding: 12px 20px 16px;
        border-top: 1px solid #e8eaed;
        margin-top: 4px;
      }
      #__eqkm_dialog__ button {
        padding: 8px 20px; border-radius: 4px; font-size: 13px;
        font-weight: 500; cursor: pointer; border: none;
        font-family: system-ui,-apple-system,sans-serif;
        transition: background 0.1s, box-shadow 0.1s;
      }
      #__eqkm_dialog__ .__eqkm_ghost__ {
        background: transparent; color: #1a73e8; border: none;
      }
      #__eqkm_dialog__ .__eqkm_ghost__:hover { background: #e8f0fe; }
      #__eqkm_dialog__ .__eqkm_verify__ {
        background: transparent; color: #1a73e8; border: 1px solid #dadce0;
      }
      #__eqkm_dialog__ .__eqkm_verify__:hover { background: #e8f0fe; border-color: #1a73e8; }
      #__eqkm_dialog__ .__eqkm_primary__ {
        background: #1a73e8; color: #fff;
      }
      #__eqkm_dialog__ .__eqkm_primary__:hover { background: #1557b0; box-shadow: 0 1px 4px rgba(0,0,0,0.2); }
    `
    document.documentElement.appendChild(s)
  }

  open(): void {
    if (this.isOpen()) { this.close(); return }

    const settings = loadSettings()
    const existingKeys = settings.apiKeys.join('\n')

    const overlay = document.createElement('div')
    overlay.id = '__eqkm_overlay__'

    const dialog = document.createElement('div')
    dialog.id = '__eqkm_dialog__'
    dialog.setAttribute('role', 'dialog')
    dialog.setAttribute('aria-modal', 'true')

    dialog.innerHTML = `
      <div class="__eqkm_title__">
        <h2>Chaves de acesso à API</h2>
        <button class="__eqkm_x__" id="__eqkm_close__" aria-label="Fechar">✕</button>
      </div>
      <div class="__eqkm_body__">
        <p class="__eqkm_desc__">Cole abaixo as chaves de acesso (uma por linha). Elas são armazenadas localmente no navegador.</p>
        <div class="__eqkm_field__">
          <label for="__eqkm_ta__">Chaves de acesso</label>
          <textarea id="__eqkm_ta__" placeholder="AIza..." spellcheck="false" autocomplete="off"></textarea>
          <div class="__eqkm_count__" id="__eqkm_count__"></div>
        </div>
        <div class="__eqkm_status__" id="__eqkm_status__"></div>
      </div>
      <div class="__eqkm_actions__">
        <button class="__eqkm_ghost__" id="__eqkm_cancel__">Cancelar</button>
        <button class="__eqkm_verify__" id="__eqkm_verify__">Verificar</button>
        <button class="__eqkm_primary__" id="__eqkm_save__">Salvar</button>
      </div>
    `

    overlay.appendChild(dialog)
    document.documentElement.appendChild(overlay)
    this.el = overlay

    const ta     = dialog.querySelector('#__eqkm_ta__')     as HTMLTextAreaElement
    const countEl= dialog.querySelector('#__eqkm_count__')  as HTMLElement
    const statusEl=dialog.querySelector('#__eqkm_status__') as HTMLElement

    ta.value = existingKeys
    this.updateCount(ta.value, countEl)

    ta.addEventListener('input', () => this.updateCount(ta.value, countEl))

    dialog.querySelector('#__eqkm_close__')!.addEventListener('click', () => this.close())
    dialog.querySelector('#__eqkm_cancel__')!.addEventListener('click', () => this.close())

    dialog.querySelector('#__eqkm_save__')!.addEventListener('click', () => {
      const keys = this.parseKeys(ta.value)
      saveSettings({ apiKey: keys[0] || '', apiKeys: keys })
      this.toast.flash('Config Saved')
      this.coin.flashOk(1200)
      this.close()
    })

    dialog.querySelector('#__eqkm_verify__')!.addEventListener('click', async () => {
      const keys = this.parseKeys(ta.value)
      if (!keys.length) { statusEl.style.color = '#c5221f'; statusEl.textContent = 'Insira ao menos uma chave.'; return }
      statusEl.style.color = '#70757a'
      statusEl.textContent = 'Verificando…'
      this.coin.setState('loading')
      try {
        const model = loadSettings().model
        const r = await validateModelFast(model, keys)
        if (r.ok) {
          statusEl.style.color = '#137333'
          statusEl.textContent = `✓ Acesso válido — ${r.model}`
          this.coin.flashOk(); this.toast.flash('Access OK')
        } else {
          statusEl.style.color = '#c5221f'
          statusEl.textContent = `✗ ${r.message.slice(0, 55)}`
          this.coin.flashError(); this.toast.flash('Access Denied')
        }
      } catch { statusEl.style.color = '#c5221f'; statusEl.textContent = '✗ Erro ao verificar.'; this.coin.flashError() }
    })

    // Fechar ao clicar no overlay
    overlay.addEventListener('click', (e) => { if (e.target === overlay) this.close() })
    window.addEventListener('keydown', this.boundEsc, { capture: true })
    requestAnimationFrame(() => ta.focus())
  }

  private parseKeys(raw: string): string[] {
    return raw.split(/[\n\r,]+/).map(k => k.trim().replace(/^["']|["']$/g, '')).filter(k => k.length > 5)
  }

  private updateCount(raw: string, el: HTMLElement): void {
    const n = this.parseKeys(raw).length
    el.textContent = n === 0 ? '' : `${n} chave${n !== 1 ? 's' : ''} cadastrada${n !== 1 ? 's' : ''}`
  }

  close(): void {
    window.removeEventListener('keydown', this.boundEsc, { capture: true })
    this.el?.remove(); this.el = null
  }

  isOpen(): boolean { return this.el !== null }
  destroy(): void { this.close() }
}
