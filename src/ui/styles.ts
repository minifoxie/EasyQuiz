export const PANEL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap');

  :host {
    all: initial;
    color-scheme: dark;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    font-size: 13px;
    line-height: 1.5;

    /* Variáveis do Tema Humanizado (Estilo VS Code Professional) */
    --eq-bg: #1e1e1e;
    --eq-surface: #252526;
    --eq-surface-raised: #2d2d2d;
    --eq-surface-hover: #37373d;
    --eq-border: #3c3c3c;
    --eq-text: #cccccc;
    --eq-text-bright: #ffffff;
    --eq-muted: #858585;
    --eq-accent: #007acc;       /* Azul profissional padrão */
    --eq-accent-hover: #0098ff;
    --eq-success: #4ec9b0;      /* Verde menta suave */
    --eq-warning: #d7ba7d;      /* Amarelo dourado suave */
    --eq-danger: #f14c4c;       /* Vermelho suave */
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  /* ===== ABA RETRÁTIL LATERAL ESQUERDA (DOCK TOGGLE) ===== */
  .eq-dock-toggle {
    pointer-events: auto;
    position: absolute;
    left: -38px;
    top: 50%;
    transform: translateY(-50%);
    width: 38px;
    height: 84px;
    background: var(--eq-surface);
    border: 1px solid var(--eq-border);
    border-right: none;
    border-radius: 8px 0 0 8px;
    color: var(--eq-accent);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    cursor: pointer;
    box-shadow: -4px 0 16px rgba(0, 0, 0, 0.4);
    transition: background 0.15s, color 0.15s, width 0.2s, left 0.2s;
    user-select: none;
    z-index: 10;
  }

  .eq-dock-toggle:hover {
    background: var(--eq-surface-hover);
    color: var(--eq-text-bright);
    width: 44px;
    left: -44px;
  }

  .eq-dock-toggle-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .eq-dock-toggle-label {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  /* ===== BOTÃO FLUTUANTE INFERIOR RENOVADO (FLOATING CAPSULE LAUNCHER) ===== */
  .eq-launcher {
    pointer-events: auto;
    position: fixed;
    right: 20px;
    bottom: 20px;
    z-index: 2147483646;
    height: 42px;
    padding: 0 16px;
    background: var(--eq-surface);
    border: 1px solid var(--eq-border);
    border-radius: 21px;
    color: var(--eq-text-bright);
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
    transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    user-select: none;
    font-family: inherit;
    font-weight: 600;
    font-size: 13px;
  }

  .eq-launcher:hover {
    border-color: var(--eq-accent);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
    transform: translateY(-2px);
    background: var(--eq-surface-raised);
  }

  .eq-launcher:active {
    transform: translateY(1px) scale(0.98);
  }

  .eq-launcher-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--eq-accent);
  }

  .eq-launcher-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--eq-success);
    transition: background 0.2s;
  }

  .eq-launcher-dot.busy {
    background: var(--eq-accent);
    animation: eq-pulse-gentle 1.5s infinite alternate;
  }

  .eq-launcher-dot.error {
    background: var(--eq-danger);
    animation: none;
  }

  .eq-launcher-dot.stopped {
    background: var(--eq-warning);
    box-shadow: 0 0 6px rgba(215, 186, 125, 0.6);
    animation: none;
  }

  @keyframes eq-pulse-gentle {
    0% { opacity: 0.6; }
    100% { opacity: 1; }
  }

  /* ===== SIDEBAR FIXA LATERAL DIREITA ESTILO VS CODE ===== */
  .eq-sidebar {
    pointer-events: auto;
    position: fixed;
    right: 0;
    top: 0;
    width: 440px;
    max-width: 95vw;
    height: 100vh;
    z-index: 2147483647;
    background: var(--eq-bg);
    border-left: 1px solid var(--eq-border);
    color: var(--eq-text);
    display: flex;
    flex-direction: row;
    box-shadow: -8px 0 32px rgba(0, 0, 0, 0.5);
    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    transform: translateX(0);
    overflow: visible;
  }

  .eq-sidebar.eq-collapsed {
    transform: translateX(100%);
  }

  .eq-sidebar.eq-collapsed .eq-dock-toggle-icon {
    transform: rotate(180deg);
  }

  /* ===== ACTIVITY BAR VERTICAL (COLUNA EM PÉ ESTILO VS CODE) ===== */
  .eq-activity-bar {
    width: 48px;
    min-width: 48px;
    background: var(--eq-bg);
    border-right: 1px solid var(--eq-border);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    user-select: none;
    z-index: 5;
  }

  .eq-activity-top,
  .eq-activity-bottom {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
    align-items: center;
  }

  .eq-activity-bottom {
    margin-top: auto;
  }

  .eq-activity-btn {
    position: relative;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    border-radius: 6px;
    color: var(--eq-muted);
    cursor: pointer;
    transition: all 0.15s;
  }

  .eq-activity-btn:hover {
    color: var(--eq-text-bright);
  }

  .eq-activity-btn.active {
    color: var(--eq-text-bright);
  }

  .eq-activity-indicator {
    position: absolute;
    left: -2px;
    top: 6px;
    bottom: 6px;
    width: 3px;
    background: var(--eq-accent);
    border-radius: 0 3px 3px 0;
    opacity: 0;
    transform: scaleY(0.4);
    transition: opacity 0.15s, transform 0.15s;
  }

  .eq-activity-btn.active .eq-activity-indicator {
    opacity: 1;
    transform: scaleY(1);
  }

  .eq-activity-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
  }

  /* ===== CORPO DA SIDEBAR (PAINEL DIREITO) ===== */
  .eq-sidebar-body {
    flex: 1;
    display: flex;
    flex-direction: column;
    background: var(--eq-surface);
    overflow: hidden;
    min-width: 0;
  }

  /* Cabeçalho */
  .eq-header {
    background: var(--eq-surface);
    border-bottom: 1px solid var(--eq-border);
    height: 40px;
    min-height: 40px;
    padding: 0 14px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    user-select: none;
  }

  .eq-brand {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .eq-brand-icon {
    color: var(--eq-accent);
    display: flex;
    align-items: center;
  }

  .eq-brand-name {
    font-size: 13px;
    font-weight: 600;
    color: var(--eq-text-bright);
    letter-spacing: 0.02em;
  }

  .eq-brand-badge {
    background: rgba(0, 122, 204, 0.15);
    border: 1px solid rgba(0, 122, 204, 0.4);
    color: var(--eq-accent);
    font-size: 10px;
    font-weight: 600;
    padding: 2px 6px;
    border-radius: 4px;
    text-transform: uppercase;
  }

  .eq-header-tools {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .eq-icon-btn {
    width: 28px;
    height: 28px;
    background: transparent;
    border: 1px solid transparent;
    border-radius: 4px;
    color: var(--eq-muted);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background 0.15s, color 0.15s, border-color 0.15s;
  }

  .eq-icon-btn:hover {
    background: var(--eq-surface-hover);
    color: var(--eq-text-bright);
    border-color: var(--eq-border);
  }

  /* Área Scrollável das Visualizações */
  .eq-views-wrapper {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    background: var(--eq-bg);
  }

  .eq-views-wrapper::-webkit-scrollbar {
    width: 8px;
  }
  .eq-views-wrapper::-webkit-scrollbar-track {
    background: var(--eq-bg);
  }
  .eq-views-wrapper::-webkit-scrollbar-thumb {
    background: var(--eq-surface-raised);
    border-radius: 4px;
  }
  .eq-views-wrapper::-webkit-scrollbar-thumb:hover {
    background: var(--eq-muted);
  }

  .eq-view-pane {
    display: flex;
    flex-direction: column;
    gap: 16px;
    animation: eq-view-fade 0.2s ease-out;
  }

  @keyframes eq-view-fade {
    0% { opacity: 0; transform: translateY(4px); }
    100% { opacity: 1; transform: translateY(0); }
  }

  /* ===== SEÇÕES E COMPONENTES ===== */
  .eq-section-title {
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: var(--eq-text-bright);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .eq-field-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  /* ===== WRAPPER DO INPUT DA CHAVE ===== */
  .eq-key-input-container {
    position: relative;
    width: 100%;
  }

  .eq-input-wrap {
    display: flex;
    align-items: center;
    background: var(--eq-surface);
    border: 1px solid var(--eq-border);
    border-radius: 6px;
    overflow: visible;
    transition: border-color 0.15s;
  }

  .eq-input-wrap:focus-within {
    border-color: var(--eq-accent);
  }

  .eq-input-prefix-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 10px;
    color: var(--eq-muted);
  }

  .eq-input {
    flex: 1;
    height: 34px;
    background: transparent;
    border: none;
    color: var(--eq-text-bright);
    padding: 0 10px;
    font-family: inherit;
    font-size: 13px;
    outline: none;
  }

  .eq-input-wrap .eq-icon-btn {
    border-radius: 0;
    height: 32px;
    width: 32px;
    margin: 1px 1px 1px 0;
  }

  /* ===== CONTEXT MENU SUSPENSO DINÂMICO ===== */
  .eq-context-menu {
    position: absolute;
    right: 0;
    top: calc(100% + 6px);
    width: 240px;
    background: var(--eq-surface-raised);
    border: 1px solid var(--eq-border);
    border-radius: 6px;
    padding: 6px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
    z-index: 100;
    display: flex;
    flex-direction: column;
    gap: 2px;
    animation: eq-menu-pop 0.15s ease-out;
  }

  .eq-context-menu[hidden] {
    display: none !important;
  }

  .eq-context-item {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
    height: 32px;
    padding: 0 10px;
    background: transparent;
    border: none;
    border-radius: 4px;
    color: var(--eq-text);
    font-family: inherit;
    font-size: 12px;
    text-align: left;
    cursor: pointer;
    transition: background 0.1s, color 0.1s;
  }

  .eq-context-item:hover {
    background: var(--eq-accent);
    color: var(--eq-text-bright);
  }

  .eq-context-item.danger {
    color: var(--eq-danger);
  }

  .eq-context-item.danger:hover {
    background: var(--eq-danger);
    color: var(--eq-text-bright);
  }

  .eq-item-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 16px;
  }

  .eq-item-text {
    flex: 1;
  }

  .eq-context-divider {
    height: 1px;
    background: var(--eq-border);
    margin: 4px 0;
  }

  /* Selects & Inputs */
  .eq-select {
    width: 100%;
    height: 34px;
    background: var(--eq-surface);
    border: 1px solid var(--eq-border);
    border-radius: 6px;
    color: var(--eq-text-bright);
    padding: 0 10px;
    font-family: inherit;
    font-size: 13px;
    outline: none;
    cursor: pointer;
    transition: border-color 0.15s;
  }

  .eq-select:focus {
    border-color: var(--eq-accent);
  }

  .eq-grid-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }

  .eq-checkbox-label {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    color: var(--eq-text);
    cursor: pointer;
    user-select: none;
    transition: color 0.15s;
  }

  .eq-checkbox-label:hover {
    color: var(--eq-text-bright);
  }

  .eq-checkbox-label input[type="checkbox"] {
    appearance: none;
    width: 16px;
    height: 16px;
    background: var(--eq-surface);
    border: 1px solid var(--eq-border);
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    transition: all 0.15s;
  }

  .eq-checkbox-label input[type="checkbox"]:checked {
    background: var(--eq-accent);
    border-color: var(--eq-accent);
  }

  .eq-checkbox-label input[type="checkbox"]:checked::after {
    content: '';
    width: 4px;
    height: 8px;
    border: solid var(--eq-text-bright);
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
    margin-bottom: 2px;
  }

  /* ===== CARD DE STATUS ===== */
  .eq-status-card {
    background: var(--eq-surface);
    border: 1px solid var(--eq-border);
    border-radius: 8px;
    padding: 12px 14px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .eq-status-card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .eq-ai-indicator {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    font-weight: 600;
    color: var(--eq-text-bright);
  }

  .eq-dot-pulse {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: var(--eq-muted);
    transition: background 0.2s;
  }

  .eq-dot-pulse.busy {
    background: var(--eq-accent);
    animation: eq-pulse-gentle 1.5s infinite alternate;
  }

  .eq-dot-pulse.error {
    background: var(--eq-danger);
  }

  .eq-dot-pulse.stopped {
    background: var(--eq-warning);
    box-shadow: 0 0 8px rgba(215, 186, 125, 0.5);
    animation: none;
  }

  .eq-stopwatch {
    font-family: 'JetBrains Mono', Consolas, monospace;
    font-size: 11px;
    color: var(--eq-muted);
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .eq-status-text {
    font-size: 13px;
    color: var(--eq-text);
    line-height: 1.5;
  }

  /* ===== BOTÕES DE AÇÃO ===== */
  .eq-btn-primary {
    height: 38px;
    background: var(--eq-accent);
    border: 1px solid var(--eq-accent);
    border-radius: 6px;
    color: var(--eq-text-bright);
    font-family: inherit;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: background 0.15s, transform 0.1s;
    user-select: none;
  }

  .eq-btn-primary:hover {
    background: var(--eq-accent-hover);
    transform: translateY(-1px);
  }

  .eq-btn-primary:active {
    transform: translateY(0);
  }

  .eq-btn-primary.danger {
    background: var(--eq-danger);
    border-color: var(--eq-danger);
  }

  .eq-btn-primary.danger:hover {
    background: #d13b3b;
  }

  .eq-btn-primary:disabled {
    background: var(--eq-surface-raised);
    border-color: var(--eq-border);
    color: var(--eq-muted);
    cursor: not-allowed;
    transform: none;
  }

  .eq-btn-secondary {
    height: 34px;
    background: transparent;
    border: 1px solid var(--eq-border);
    border-radius: 6px;
    color: var(--eq-text-bright);
    font-family: inherit;
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: all 0.15s;
  }

  .eq-btn-secondary:hover {
    background: var(--eq-surface-hover);
    border-color: var(--eq-muted);
  }

  .eq-btn-secondary:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* ===== TERMINAL CONSOLE ESTILO VS CODE ===== */
  .eq-terminal {
    width: 100%;
    background: var(--eq-bg);
    border: 1px solid var(--eq-border);
    border-radius: 6px;
    padding: 12px;
    font-family: 'JetBrains Mono', Consolas, monospace;
    font-size: 12px;
    color: var(--eq-text);
    height: 180px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 6px;
    user-select: text !important;
  }

  .text-blue { color: var(--eq-accent); }
  .text-yellow { color: var(--eq-warning); }
  .text-red { color: var(--eq-danger); }
  .text-green { color: var(--eq-success); }
  .text-muted { color: var(--eq-muted); }

  /* ===== INSPETOR DE PROMPT & IA ===== */
  .eq-inspector-meta {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
  }

  .eq-meta-box {
    background: var(--eq-surface);
    border: 1px solid var(--eq-border);
    border-radius: 6px;
    padding: 10px;
    text-align: center;
  }

  .eq-meta-title {
    font-size: 10px;
    color: var(--eq-muted);
    text-transform: uppercase;
    font-weight: 600;
  }

  .eq-meta-val {
    font-family: inherit;
    font-size: 13px;
    font-weight: 600;
    color: var(--eq-text-bright);
    margin-top: 4px;
  }

  .eq-code-block {
    background: var(--eq-bg);
    border: 1px solid var(--eq-border);
    border-radius: 6px;
    padding: 12px;
    font-family: 'JetBrains Mono', Consolas, monospace;
    font-size: 11.5px;
    color: var(--eq-text);
    max-height: 200px;
    overflow-y: auto;
    white-space: pre-wrap;
    word-break: break-word;
    user-select: text;
  }

  .eq-rationale-card {
    background: var(--eq-surface);
    border-left: 3px solid var(--eq-accent);
    border-radius: 0 6px 6px 0;
    padding: 12px;
    font-size: 13px;
    color: var(--eq-text);
  }

  .eq-action-list {
    display: flex;
    flex-direction: column;
    gap: 6px;
    background: var(--eq-bg);
    border: 1px solid var(--eq-border);
    border-radius: 6px;
    padding: 10px;
    max-height: 150px;
    overflow-y: auto;
  }

  .eq-action-item {
    font-family: 'JetBrains Mono', Consolas, monospace;
    font-size: 12px;
    color: var(--eq-text);
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .eq-action-badge {
    background: var(--eq-surface-raised);
    border: 1px solid var(--eq-border);
    color: var(--eq-text-bright);
    font-size: 10px;
    font-weight: 600;
    padding: 2px 6px;
    border-radius: 4px;
  }

  /* ===== BARRA DE FERRAMENTAS DO TERMINAL & DEBUG ===== */
  .eq-debug-toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    margin-bottom: 6px;
  }

  .eq-filter-chips {
    display: flex;
    align-items: center;
    gap: 4px;
    overflow-x: auto;
  }

  .eq-filter-chip {
    background: var(--eq-surface);
    border: 1px solid var(--eq-border);
    border-radius: 12px;
    color: var(--eq-muted);
    font-family: inherit;
    font-size: 11px;
    font-weight: 500;
    padding: 2px 8px;
    cursor: pointer;
    transition: all 0.15s;
    user-select: none;
    white-space: nowrap;
  }

  .eq-filter-chip:hover {
    color: var(--eq-text-bright);
    background: var(--eq-surface-hover);
  }

  .eq-filter-chip.active {
    background: var(--eq-accent);
    border-color: var(--eq-accent);
    color: var(--eq-text-bright);
    font-weight: 600;
  }

  .eq-debug-toolbar-actions {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  /* Grid de 4 Métricas de Tokens / Diagnóstico */
  .eq-token-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
  }

  .eq-token-box {
    background: var(--eq-surface);
    border: 1px solid var(--eq-border);
    border-radius: 6px;
    padding: 8px 6px;
    text-align: center;
  }

  .eq-token-title {
    font-size: 9.5px;
    color: var(--eq-muted);
    text-transform: uppercase;
    font-weight: 600;
    letter-spacing: 0.03em;
  }

  .eq-token-val {
    font-family: 'JetBrains Mono', Consolas, monospace;
    font-size: 11.5px;
    font-weight: 600;
    color: var(--eq-text-bright);
    margin-top: 3px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .eq-debug-error-card {
    background: rgba(241, 76, 76, 0.1);
    border: 1px solid rgba(241, 76, 76, 0.3);
    border-left: 3px solid var(--eq-danger);
    border-radius: 6px;
    padding: 10px 12px;
    display: flex;
    flex-direction: column;
    gap: 6px;
    font-size: 12px;
    color: var(--eq-text);
  }

  .eq-debug-error-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: 600;
    color: var(--eq-danger);
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .eq-debug-error-msg {
    font-family: 'JetBrains Mono', Consolas, monospace;
    font-size: 11px;
    word-break: break-word;
    color: #ffaaaa;
  }

  .eq-footer-note {
    font-size: 11px;
    color: var(--eq-muted);
    text-align: center;
    padding-top: 8px;
  }

  /* ===== GABARITO MANUAL FLUTUANTE ARRASTÁVEL E MINIMIZÁVEL ===== */
  .eq-floating-hud {
    pointer-events: auto;
    position: fixed;
    z-index: 2147483647;
    top: 25px;
    left: 25px;
    width: 390px;
    max-width: calc(100vw - 40px);
    background: rgba(30, 30, 30, 0.95);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid var(--eq-border);
    border-radius: 12px;
    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.5);
    color: var(--eq-text);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    font-family: inherit;
    font-size: 13px;
    transition: width 0.2s, height 0.2s, border-radius 0.2s, box-shadow 0.2s;
  }

  .eq-floating-hud.minimized {
    width: auto;
    border-radius: 20px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
  }

  .eq-floating-hud.minimized .eq-fah-header,
  .eq-floating-hud.minimized .eq-fah-body,
  .eq-floating-hud.minimized .eq-fah-footer {
    display: none !important;
  }

  .eq-fah-pill {
    display: none;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    cursor: pointer;
    font-weight: 600;
    font-size: 13px;
    color: var(--eq-text-bright);
    user-select: none;
    background: transparent;
  }

  .eq-floating-hud.minimized .eq-fah-pill {
    display: flex;
  }

  .eq-fah-pill-icon {
    color: var(--eq-accent);
    display: flex;
    align-items: center;
  }

  .eq-fah-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 14px;
    background: var(--eq-surface);
    border-bottom: 1px solid var(--eq-border);
    cursor: grab;
    user-select: none;
  }

  .eq-fah-header:active {
    cursor: grabbing;
  }

  .eq-fah-title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 600;
    font-size: 13px;
    color: var(--eq-text-bright);
  }

  .eq-fah-actions {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .eq-fah-btn {
    background: transparent;
    border: 1px solid transparent;
    color: var(--eq-muted);
    border-radius: 4px;
    padding: 4px 6px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.15s;
  }

  .eq-fah-btn:hover {
    background: var(--eq-surface-hover);
    color: var(--eq-text-bright);
  }

  .eq-fah-body {
    padding: 14px;
    max-height: 420px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .eq-fah-body::-webkit-scrollbar {
    width: 6px;
  }

  .eq-fah-body::-webkit-scrollbar-thumb {
    background: var(--eq-surface-raised);
    border-radius: 4px;
  }

  .eq-fah-meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 11px;
    padding-bottom: 8px;
    border-bottom: 1px solid var(--eq-border);
    color: var(--eq-muted);
  }

  .eq-fah-meta-badge {
    background: var(--eq-surface-raised);
    color: var(--eq-text-bright);
    font-weight: 600;
    padding: 2px 6px;
    border-radius: 4px;
  }

  .eq-fah-group {
    background: var(--eq-surface);
    border: 1px solid var(--eq-border);
    border-radius: 8px;
    padding: 10px 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .eq-fah-group-title {
    font-weight: 600;
    font-size: 12px;
    display: flex;
    align-items: center;
    gap: 6px;
    color: var(--eq-text-bright);
  }

  .eq-fah-group-items {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .eq-fah-item {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 8px;
    font-size: 13px;
    color: var(--eq-text);
    background: var(--eq-bg);
    border: 1px solid var(--eq-border);
    border-radius: 6px;
    padding: 8px 10px;
  }

  .eq-fah-item-text {
    flex: 1;
    word-break: break-word;
  }

  .eq-fah-copy-inline {
    background: var(--eq-surface-raised);
    border: 1px solid var(--eq-border);
    color: var(--eq-text-bright);
    border-radius: 4px;
    font-size: 11px;
    font-weight: 600;
    padding: 3px 8px;
    cursor: pointer;
    flex-shrink: 0;
    transition: all 0.15s;
    user-select: none;
  }

  .eq-fah-copy-inline:hover {
    background: var(--eq-surface-hover);
    color: #fff;
  }

  .eq-fah-letter-badge {
    background: var(--eq-accent);
    color: #fff;
    font-weight: 700;
    font-size: 11px;
    padding: 2px 7px;
    border-radius: 4px;
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .eq-fah-field-box {
    display: flex;
    flex-direction: column;
    gap: 4px;
    flex: 1;
  }

  .eq-fah-field-label {
    font-size: 11px;
    font-weight: 600;
    color: var(--eq-muted);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .eq-fah-field-val {
    font-size: 13px;
    font-weight: 600;
    color: var(--eq-text-bright);
    background: var(--eq-surface);
    padding: 4px 8px;
    border-radius: 4px;
    border: 1px solid var(--eq-border);
    word-break: break-word;
  }

  .eq-fah-rationale {
    background: var(--eq-bg);
    border: 1px dashed var(--eq-border);
    border-radius: 6px;
    padding: 10px;
    font-size: 12px;
    color: var(--eq-muted);
  }

  .eq-fah-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding: 10px 14px;
    background: var(--eq-surface);
    border-top: 1px solid var(--eq-border);
    font-size: 11px;
    color: var(--eq-muted);
  }

  .eq-fah-copy-all {
    background: var(--eq-accent);
    color: var(--eq-text-bright);
    border: none;
    border-radius: 4px;
    font-size: 11px;
    font-weight: 600;
    padding: 6px 12px;
    cursor: pointer;
    transition: background 0.15s;
    user-select: none;
  }

  .eq-fah-copy-all:hover {
    background: var(--eq-accent-hover);
  }

  /* ===== BARRA DE CARREGAMENTO DINÂMICA ===== */
  .eq-progress-container {
    padding: 8px 14px;
    background: var(--eq-surface);
    border-bottom: 1px solid var(--eq-border);
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .eq-progress-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    color: var(--eq-text-bright);
  }
  .eq-progress-track {
    width: 100%;
    height: 4px;
    background: var(--eq-surface-raised);
    border-radius: 2px;
    overflow: hidden;
  }
  .eq-progress-bar {
    height: 100%;
    background: var(--eq-accent);
    border-radius: 2px;
    transition: width 0.25s ease-out;
  }

  /* ===== EXPLORADOR DE CONTEXTO & RAG (ESTILO VS CODE) ===== */
  .eq-tree-container {
    display: flex;
    flex-direction: column;
    gap: 8px;
    font-size: 13px;
    color: var(--eq-text);
  }
  .eq-tree-node {
    display: flex;
    flex-direction: column;
    background: var(--eq-surface);
    border: 1px solid var(--eq-border);
    border-radius: 6px;
    overflow: hidden;
  }
  .eq-tree-header {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    background: var(--eq-surface);
    cursor: pointer;
    user-select: none;
    font-weight: 600;
    color: var(--eq-text-bright);
    transition: background 0.15s;
  }
  .eq-tree-header:hover {
    background: var(--eq-surface-hover);
  }
  .eq-tree-arrow {
    font-size: 10px;
    color: var(--eq-muted);
    transition: transform 0.2s;
  }
  .eq-tree-content {
    padding: 10px 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    font-size: 12px;
    color: var(--eq-muted);
    border-top: 1px solid var(--eq-border);
    background: var(--eq-bg);
  }
  .eq-tree-leaf {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    padding: 4px 0;
    border-bottom: 1px dashed var(--eq-border);
  }
  .eq-tree-leaf:last-child {
    border-bottom: none;
  }
  .eq-tree-badge {
    font-size: 10px;
    padding: 2px 6px;
    border-radius: 4px;
    background: var(--eq-surface-raised);
    color: var(--eq-text-bright);
    font-weight: 600;
  }

  @media (max-width: 480px) {
    .eq-sidebar {
      width: 100vw;
      max-width: 100vw;
    }
    .eq-floating-hud {
      width: calc(100vw - 20px);
      left: 10px !important;
      top: 10px !important;
    }
  }

  /* Product shell: operation, execution and technical surfaces */
  .eq-operation-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; padding-bottom: 8px; }
  .eq-eyebrow { color: var(--eq-muted); font: 600 11px/1.2 inherit; text-transform: uppercase; letter-spacing: .05em; }
  .eq-operation-title { margin-top: 4px; color: var(--eq-text-bright); font-size: 20px; font-weight: 600; }
  .eq-operation-subtitle { margin-top: 5px; color: var(--eq-muted); font-size: 13px; }
  .eq-operation-state { flex: none; padding: 4px 8px; border: 1px solid var(--eq-border); border-radius: 4px; color: var(--eq-muted); font: 600 11px/1 inherit; text-transform: uppercase; transition: all 0.2s ease; }
  .eq-operation-state.is-success { color: var(--eq-success); border-color: rgba(78, 201, 176, 0.4); background: rgba(78, 201, 176, 0.08); }
  .eq-operation-state.is-error { color: var(--eq-danger); border-color: rgba(241, 76, 76, 0.4); background: rgba(241, 76, 76, 0.08); }
  .eq-operation-state.is-busy { color: #00ffcc; border-color: rgba(0, 255, 204, 0.4); background: rgba(0, 255, 204, 0.08); }
  .eq-operation-state.is-warning, .eq-operation-state.is-stopped { color: var(--eq-warning); border-color: rgba(215, 186, 125, 0.4); background: rgba(215, 186, 125, 0.08); }
  .eq-operation-state.is-info { color: var(--eq-accent); border-color: rgba(0, 122, 204, 0.4); background: rgba(0, 122, 204, 0.08); }
  .eq-operation-actions { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .eq-operation-result { margin-top: 2px; padding-top: 16px; border-top: 1px solid var(--eq-border); }
  .eq-badges { display: flex; flex-wrap: wrap; gap: 8px; }
  
  .eq-execution-card {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 12px;
    background: var(--eq-surface);
    border: 1px solid var(--eq-border);
    border-radius: 8px;
  }
  .eq-execution-summary {
    padding: 8px 10px;
    border-left: 3px solid var(--eq-warning);
    color: var(--eq-muted);
    font-size: 12px;
  }
  .eq-execution-summary.is-success { border-left-color: var(--eq-success); color: var(--eq-text); }
  .eq-execution-list { display: flex; flex-direction: column; gap: 6px; max-height: 220px; overflow-y: auto; }
  .eq-execution-row {
    display: grid;
    grid-template-columns: 48px minmax(0, 1fr);
    gap: 10px;
    padding: 8px 10px;
    background: var(--eq-bg);
    border: 1px solid var(--eq-border);
    border-radius: 6px;
    font-size: 12px;
  }
  .eq-execution-row small { grid-column: 2; color: var(--eq-danger); overflow-wrap: anywhere; }
  .eq-execution-state { color: var(--eq-warning); font-weight: 600; }
  .eq-execution-row.is-success .eq-execution-state { color: var(--eq-success); }
  .eq-execution-details { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
  .eq-execution-details strong { color: var(--eq-text-bright); overflow-wrap: anywhere; font-weight: 600; }
  .eq-execution-details span { color: var(--eq-muted); overflow-wrap: anywhere; }

  /* ===== BOTÃO PARAR / ABORTAR ANÁLISE ===== */
  .eq-btn-primary.danger {
    background: #e51400 !important;
    border-color: #f14c4c !important;
    color: #ffffff !important;
    animation: eq-pulse-danger 1.5s infinite alternate;
  }
  .eq-btn-primary.danger:hover {
    background: #ff2a1a !important;
    border-color: #ff5555 !important;
  }
  @keyframes eq-pulse-danger {
    0% { box-shadow: 0 0 4px rgba(229, 20, 0, 0.4); }
    100% { box-shadow: 0 0 14px rgba(229, 20, 0, 0.8); }
  }

  /* ===== ABA DE MÉTRICAS & CRONÔMETRO ===== */
  .eq-live-stopwatch-box {
    background: linear-gradient(135deg, rgba(0, 122, 204, 0.12), rgba(0, 255, 204, 0.08));
    border: 1px solid rgba(0, 255, 204, 0.25);
    border-radius: 8px;
    padding: 14px 16px;
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-bottom: 12px;
  }
  .eq-live-stopwatch-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .eq-live-stopwatch-label {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.08em;
    color: var(--eq-accent);
    text-transform: uppercase;
  }
  .eq-live-stopwatch-status {
    font-size: 11px;
    font-weight: 600;
    color: var(--eq-muted);
    padding: 2px 6px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 4px;
  }
  .eq-live-stopwatch-status.active {
    color: #00ffcc;
    background: rgba(0, 255, 204, 0.15);
    animation: eq-blink 1s infinite alternate;
  }
  .eq-live-stopwatch-status.is-warning {
    color: var(--eq-warning);
    background: rgba(215, 186, 125, 0.15);
  }
  .eq-live-stopwatch-status.is-success {
    color: var(--eq-success);
    background: rgba(78, 201, 176, 0.15);
  }
  .eq-live-stopwatch-status.is-error {
    color: var(--eq-danger);
    background: rgba(241, 76, 76, 0.15);
  }
  .eq-live-stopwatch-time {
    font-family: 'JetBrains Mono', monospace;
    font-size: 28px;
    font-weight: 800;
    color: #ffffff;
    letter-spacing: 0.05em;
    text-shadow: 0 0 12px rgba(0, 255, 204, 0.3);
  }
  .eq-live-stopwatch-hint {
    font-size: 11px;
    color: var(--eq-muted);
  }

  .eq-metrics-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    margin-bottom: 12px;
  }
  .eq-metric-card {
    background: var(--eq-surface);
    border: 1px solid var(--eq-border);
    border-radius: 6px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .eq-metric-card-title {
    font-size: 10px;
    font-weight: 600;
    color: var(--eq-muted);
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }
  .eq-metric-card-val {
    font-family: 'JetBrains Mono', monospace;
    font-size: 16px;
    font-weight: 700;
    color: var(--eq-text-bright);
  }
  .eq-metric-card-sub {
    font-size: 10px;
    color: var(--eq-muted);
  }

  .eq-metrics-actions {
    display: flex;
    gap: 8px;
    margin-bottom: 12px;
  }
  .eq-metrics-actions button {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    height: 30px;
    font-size: 11px;
  }
  .eq-btn-secondary.danger {
    color: var(--eq-danger);
    border-color: rgba(241, 76, 76, 0.4);
  }
  .eq-btn-secondary.danger:hover {
    background: rgba(241, 76, 76, 0.15);
    border-color: var(--eq-danger);
  }

  .eq-metrics-history-list {
    display: flex;
    flex-direction: column;
    gap: 6px;
    overflow-y: auto;
    max-height: 240px;
    padding-right: 4px;
  }
  .eq-metrics-empty {
    color: var(--eq-muted);
    font-size: 12px;
    font-style: italic;
    padding: 16px 8px;
    text-align: center;
  }
  .eq-metrics-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: var(--eq-surface);
    border: 1px solid var(--eq-border);
    border-radius: 6px;
    padding: 8px 10px;
    gap: 8px;
    transition: background 0.15s;
  }
  .eq-metrics-item:hover {
    background: var(--eq-surface-hover);
  }
  .eq-metrics-item-left {
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
    flex: 1;
  }
  .eq-metrics-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 28px;
    height: 22px;
    padding: 0 4px;
    background: rgba(0, 122, 204, 0.2);
    border: 1px solid rgba(0, 122, 204, 0.4);
    border-radius: 4px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    font-weight: 700;
    color: var(--eq-accent);
  }
  .eq-metrics-item-info {
    display: flex;
    flex-direction: column;
    min-width: 0;
    flex: 1;
  }
  .eq-metrics-item-title {
    font-size: 12px;
    font-weight: 600;
    color: var(--eq-text-bright);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .eq-metrics-item-meta {
    font-size: 10px;
    color: var(--eq-muted);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .eq-metrics-item-right {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 2px;
    flex-shrink: 0;
  }
  .eq-metrics-item-dur {
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px;
    font-weight: 700;
    color: #00ffcc;
  }
  .eq-metrics-item-status {
    font-size: 9px;
    font-weight: 700;
    text-transform: uppercase;
    padding: 1px 4px;
    border-radius: 3px;
  }
  .eq-metrics-item-status.is-verified,
  .eq-metrics-item-status.is-answered {
    background: rgba(78, 201, 176, 0.15);
    color: var(--eq-success);
  }
  .eq-metrics-item-status.is-manual {
    background: rgba(215, 186, 125, 0.15);
    color: var(--eq-warning);
  }
  .eq-metrics-item-status.is-skipped {
    background: rgba(241, 76, 76, 0.15);
    color: var(--eq-danger);
  }
`

