export const PANEL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&family=Nunito:wght@400;600;700;800;900&display=swap');

  :host {
    all: initial;
    color-scheme: dark;
    font-family: 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-size: 13px;
    line-height: 1.4;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  :host(.eq-dark-mode-active) .eq-sidebar,
  :host(.eq-dark-mode-active) .eq-launcher {
    filter: invert(1) hue-rotate(180deg) !important;
  }

  /* Retractable Edge Tab (Dock Toggle on left border of sidebar) */
  .eq-dock-toggle {
    pointer-events: auto;
    position: absolute;
    left: -38px;
    top: 50%;
    transform: translateY(-50%);
    width: 38px;
    height: 76px;
    background: #181818;
    border: 1px solid #333333;
    border-right: none;
    border-radius: 8px 0 0 8px;
    color: #00ffcc;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    cursor: pointer;
    box-shadow: -4px 0 16px rgba(0, 0, 0, 0.6);
    transition: background 0.15s, color 0.15s, width 0.15s;
    user-select: none;
    z-index: 10;
  }

  .eq-dock-toggle:hover {
    background: #252526;
    color: #ffffff;
    width: 42px;
    left: -42px;
  }

  .eq-dock-toggle-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.25s ease;
  }

  .eq-dock-toggle-label {
    font-size: 9px;
    font-weight: 900;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  /* Floating Launcher (Bottom Right) */
  .eq-launcher {
    pointer-events: auto;
    position: fixed;
    right: 20px;
    bottom: 20px;
    z-index: 2147483646;
    width: 50px;
    height: 50px;
    background: #181818;
    border: 2px solid #00ffcc;
    border-radius: 12px;
    color: #00ffcc;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2px;
    cursor: pointer;
    font-weight: 900;
    font-size: 10px;
    letter-spacing: 0.05em;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.7), 0 0 10px rgba(0, 255, 204, 0.2);
    transition: transform 0.15s, box-shadow 0.15s, background 0.15s;
    user-select: none;
  }

  .eq-launcher:hover {
    background: #00ffcc;
    color: #121212;
    transform: scale(1.05);
    box-shadow: 0 6px 24px rgba(0, 255, 204, 0.4);
  }

  .eq-launcher:active {
    transform: scale(0.95);
  }

  /* VS Code Fixed Right Sidebar */
  .eq-sidebar {
    pointer-events: auto;
    position: fixed;
    right: 0;
    top: 0;
    width: 420px;
    max-width: 95vw;
    height: 100vh;
    z-index: 2147483647;
    background: #181818;
    border-left: 1px solid #2d2d30;
    color: #cccccc;
    display: flex;
    flex-direction: column;
    box-shadow: -8px 0 32px rgba(0, 0, 0, 0.75);
    transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    transform: translateX(0);
    overflow: visible;
  }

  .eq-sidebar.eq-collapsed {
    transform: translateX(100%);
  }

  .eq-sidebar.eq-collapsed .eq-dock-toggle-icon {
    transform: rotate(180deg);
  }

  /* Sidebar Header */
  .eq-header {
    background: #1f1f1f;
    border-bottom: 1px solid #2d2d30;
    height: 48px;
    min-height: 48px;
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
    font-size: 13px;
    font-weight: 800;
    color: #ffffff;
    letter-spacing: 0.05em;
  }

  .eq-brand-badge {
    background: rgba(0, 255, 204, 0.15);
    border: 1px solid #00ffcc;
    color: #00ffcc;
    font-size: 10px;
    font-weight: 800;
    padding: 1px 6px;
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
    color: #858585;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background 0.15s, color 0.15s;
  }

  .eq-icon-btn:hover {
    background: #2a2d2e;
    color: #ffffff;
  }

  /* VS Code Activity Rail / Tabs */
  .eq-activity-bar {
    display: flex;
    background: #252526;
    border-bottom: 1px solid #2d2d30;
    height: 42px;
    min-height: 42px;
  }

  .eq-tab-btn {
    flex: 1;
    background: transparent;
    border: none;
    border-bottom: 2px solid transparent;
    color: #969696;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    font-family: inherit;
    font-size: 11px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.15s;
    user-select: none;
    padding: 0 6px;
    white-space: nowrap;
  }

  .eq-tab-btn:hover {
    color: #ffffff;
    background: #2a2d2e;
  }

  .eq-tab-btn.active {
    color: #ffffff;
    background: #1e1e1e;
    border-bottom: 2px solid #00ffcc;
  }

  .eq-tab-btn svg {
    flex-shrink: 0;
  }

  /* Main Scrollable View Area */
  .eq-view-container {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 14px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    background: #1e1e1e;
  }

  .eq-view-container::-webkit-scrollbar {
    width: 8px;
  }
  .eq-view-container::-webkit-scrollbar-track {
    background: #181818;
  }
  .eq-view-container::-webkit-scrollbar-thumb {
    background: #333333;
    border-radius: 4px;
  }
  .eq-view-container::-webkit-scrollbar-thumb:hover {
    background: #444444;
  }

  /* Section Styles */
  .eq-section-title {
    font-size: 11px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: #858585;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 4px;
  }

  .eq-field-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  /* Input and Actions Bar */
  .eq-input-box {
    display: flex;
    flex-direction: column;
    gap: 6px;
    background: #252526;
    border: 1px solid #333333;
    border-radius: 6px;
    padding: 8px;
  }

  .eq-input-wrap {
    display: flex;
    align-items: center;
    background: #1e1e1e;
    border: 1px solid #3c3c3c;
    border-radius: 4px;
    overflow: hidden;
    transition: border-color 0.15s;
  }

  .eq-input-wrap:focus-within {
    border-color: #00ffcc;
  }

  .eq-input {
    flex: 1;
    height: 34px;
    background: transparent;
    border: none;
    color: #ffffff;
    padding: 0 10px;
    font-family: 'JetBrains Mono', Consolas, monospace;
    font-size: 12px;
    outline: none;
    user-select: text !important;
    -webkit-user-select: text !important;
  }

  .eq-input-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
  }

  .eq-btn-tool {
    height: 28px;
    background: #2d2d30;
    border: 1px solid #3c3c3c;
    border-radius: 4px;
    color: #cccccc;
    font-size: 11px;
    font-weight: 700;
    font-family: inherit;
    padding: 0 8px;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    cursor: pointer;
    transition: all 0.15s;
    user-select: none;
  }

  .eq-btn-tool:hover {
    background: #3e3e42;
    color: #ffffff;
    border-color: #00ffcc;
  }

  .eq-btn-tool.primary {
    background: #007acc;
    border-color: #007acc;
    color: #ffffff;
  }

  .eq-btn-tool.primary:hover {
    background: #0098ff;
  }

  .eq-btn-tool.danger {
    background: #442222;
    border-color: #662222;
    color: #ff8888;
  }

  .eq-btn-tool.danger:hover {
    background: #662222;
    color: #ffffff;
  }

  /* Form Elements */
  .eq-select {
    width: 100%;
    height: 34px;
    background: #252526;
    border: 1px solid #3c3c3c;
    border-radius: 4px;
    color: #ffffff;
    padding: 0 8px;
    font-family: inherit;
    font-size: 12px;
    font-weight: 600;
    outline: none;
    cursor: pointer;
  }

  .eq-select:focus {
    border-color: #00ffcc;
  }

  .eq-checkbox-label {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    font-weight: 600;
    color: #cccccc;
    cursor: pointer;
    user-select: none;
  }

  .eq-checkbox-label input[type="checkbox"] {
    appearance: none;
    width: 16px;
    height: 16px;
    background: #252526;
    border: 1px solid #3c3c3c;
    border-radius: 3px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .eq-checkbox-label input[type="checkbox"]:checked {
    background: #00ffcc;
    border-color: #00ffcc;
  }

  .eq-checkbox-label input[type="checkbox"]:checked::after {
    content: '';
    width: 4px;
    height: 8px;
    border: solid #000000;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
    margin-bottom: 2px;
  }

  .eq-grid-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }

  /* Live AI Status Timeline Card */
  .eq-status-card {
    background: #252526;
    border: 1px solid #2d2d30;
    border-radius: 6px;
    padding: 10px 12px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .eq-status-card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .eq-ai-indicator {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 11px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .eq-dot-pulse {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #00ff55;
    box-shadow: 0 0 6px #00ff55;
  }

  .eq-dot-pulse.busy {
    background: #00ffcc;
    box-shadow: 0 0 8px #00ffcc;
    animation: eq-pulse 1s infinite alternate;
  }

  .eq-dot-pulse.error {
    background: #ff4757;
    box-shadow: 0 0 8px #ff4757;
    animation: none;
  }

  @keyframes eq-pulse {
    0% { transform: scale(0.8); opacity: 0.7; }
    100% { transform: scale(1.3); opacity: 1; }
  }

  .eq-stopwatch {
    font-family: 'JetBrains Mono', Consolas, monospace;
    font-size: 11px;
    font-weight: 700;
    color: #00ffcc;
    background: #181818;
    padding: 2px 6px;
    border-radius: 4px;
    border: 1px solid #333333;
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .eq-status-text {
    font-size: 12px;
    color: #bbbbbb;
    line-height: 1.4;
    word-break: break-word;
  }

  /* Primary Action Buttons */
  .eq-btn-primary {
    height: 42px;
    background: #00ffcc;
    border: 1px solid #00ffcc;
    border-radius: 6px;
    color: #000000;
    font-family: inherit;
    font-size: 13px;
    font-weight: 800;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    box-shadow: 0 4px 12px rgba(0, 255, 204, 0.2);
    transition: all 0.15s;
    user-select: none;
  }

  .eq-btn-primary:hover {
    background: #33ffdb;
    box-shadow: 0 6px 16px rgba(0, 255, 204, 0.35);
  }

  .eq-btn-primary:active {
    transform: translateY(1px);
  }

  .eq-btn-primary.danger {
    background: #ff4757;
    border-color: #ff4757;
    color: #ffffff;
    box-shadow: 0 4px 12px rgba(255, 71, 87, 0.3);
  }

  .eq-btn-primary:disabled {
    background: #2d2d30;
    border-color: #3c3c3c;
    color: #666666;
    cursor: not-allowed;
    box-shadow: none;
    transform: none;
  }

  .eq-btn-secondary {
    height: 38px;
    background: #252526;
    border: 1px solid #3c3c3c;
    border-radius: 6px;
    color: #00ffcc;
    font-family: inherit;
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: all 0.15s;
  }

  .eq-btn-secondary:hover {
    background: #2d2d30;
    border-color: #00ffcc;
    color: #ffffff;
  }

  .eq-btn-secondary:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    border-color: #333333;
    color: #666666;
  }

  /* VS Code Console Terminal */
  .eq-terminal {
    width: 100%;
    background: #141414;
    border: 1px solid #2d2d30;
    border-radius: 6px;
    padding: 10px;
    font-family: 'JetBrains Mono', Consolas, monospace;
    font-size: 11px;
    color: #cccccc;
    height: 190px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 4px;
    text-align: left;
  }

  .eq-terminal::-webkit-scrollbar {
    width: 6px;
  }
  .eq-terminal::-webkit-scrollbar-thumb {
    background: #2a2a2a;
    border-radius: 3px;
  }

  .text-blue { color: #5bc0eb; }
  .text-yellow { color: #fde74c; }
  .text-red { color: #ff5555; }
  .text-green { color: #00ff88; }
  .text-muted { color: #666666; }

  /* Prompt Inspector Views */
  .eq-inspector-meta {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 6px;
  }

  .eq-meta-box {
    background: #252526;
    border: 1px solid #2d2d30;
    border-radius: 4px;
    padding: 6px 8px;
    text-align: center;
  }

  .eq-meta-title {
    font-size: 9px;
    color: #888888;
    text-transform: uppercase;
    font-weight: 700;
  }

  .eq-meta-val {
    font-family: 'JetBrains Mono', Consolas, monospace;
    font-size: 12px;
    font-weight: 800;
    color: #00ffcc;
    margin-top: 2px;
  }

  .eq-code-block {
    background: #141414;
    border: 1px solid #2d2d30;
    border-radius: 6px;
    padding: 10px;
    font-family: 'JetBrains Mono', Consolas, monospace;
    font-size: 11px;
    color: #dddddd;
    max-height: 220px;
    overflow-y: auto;
    white-space: pre-wrap;
    word-break: break-word;
    user-select: text;
  }

  .eq-rationale-card {
    background: #252526;
    border-left: 3px solid #00ffcc;
    border-radius: 0 6px 6px 0;
    padding: 10px;
    font-size: 12px;
    color: #dddddd;
    line-height: 1.45;
  }

  .eq-action-list {
    display: flex;
    flex-direction: column;
    gap: 4px;
    background: #141414;
    border: 1px solid #2d2d30;
    border-radius: 6px;
    padding: 8px;
    max-height: 160px;
    overflow-y: auto;
  }

  .eq-action-item {
    font-family: 'JetBrains Mono', Consolas, monospace;
    font-size: 11px;
    color: #cccccc;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .eq-action-badge {
    background: #252526;
    border: 1px solid #3c3c3c;
    color: #00ffcc;
    font-size: 9px;
    font-weight: 800;
    padding: 1px 4px;
    border-radius: 3px;
  }

  .eq-footer-note {
    font-size: 10px;
    font-weight: 700;
    color: #555555;
    text-align: center;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    padding-top: 6px;
  }

  @media (max-width: 480px) {
    .eq-sidebar {
      width: 100vw;
      max-width: 100vw;
    }
  }
`
