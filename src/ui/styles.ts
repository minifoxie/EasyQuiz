export const PANEL_STYLES = `
  :host {
    all: initial;
    color-scheme: dark;
    font-family: 'JetBrains Mono', 'Segoe UI Mono', ui-monospace, monospace;
    font-size: 13px;
    line-height: 1.45;
  }

  * {
    box-sizing: border-box;
    border-radius: 0px !important;
    margin: 0;
    padding: 0;
  }

  .eq-launcher {
    position: fixed;
    right: 20px;
    bottom: 20px;
    z-index: 2147483647;
    width: 52px;
    height: 52px;
    background: #060a0d;
    border: 2px solid #00e5ff;
    color: #00e5ff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 3px;
    cursor: pointer;
    font-weight: 900;
    font-size: 10px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    box-shadow: 4px 4px 0px #000000;
    transition: transform 0.1s, box-shadow 0.1s;
    user-select: none;
  }

  .eq-launcher:hover {
    background: #00e5ff;
    color: #04080a;
    box-shadow: 6px 6px 0px #000000;
  }

  .eq-launcher:active {
    transform: translate(2px, 2px);
    box-shadow: 2px 2px 0px #000000;
  }

  .eq-panel {
    position: fixed;
    right: 20px;
    bottom: 84px;
    z-index: 2147483647;
    width: 380px;
    max-width: calc(100vw - 32px);
    max-height: min(720px, calc(100vh - 100px));
    background: #080d12;
    border: 2px solid #1a2d3d;
    color: #d8edf5;
    box-shadow: 8px 8px 0px #000000;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .eq-panel[hidden] {
    display: none !important;
  }

  .eq-header {
    background: #0f1821;
    border-bottom: 2px solid #1a2d3d;
    padding: 10px 14px;
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
    font-weight: 900;
    letter-spacing: 0.08em;
    color: #00e5ff;
    text-transform: uppercase;
  }

  .eq-brand-badge {
    background: #00e5ff;
    color: #04080a;
    font-size: 9px;
    padding: 2px 5px;
    font-weight: 900;
    letter-spacing: 0.05em;
  }

  .eq-header-tools {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .eq-icon-btn {
    width: 28px;
    height: 28px;
    background: transparent;
    border: 1px solid #1a2d3d;
    color: #7b94a3;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .eq-icon-btn:hover {
    border-color: #00e5ff;
    color: #00e5ff;
    background: #0b141c;
  }

  .eq-content {
    padding: 14px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .eq-section-title {
    font-size: 10px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #668291;
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

  .eq-input-wrap {
    display: flex;
    position: relative;
  }

  .eq-input {
    width: 100%;
    height: 36px;
    background: #0b1218;
    border: 1px solid #1a2d3d;
    color: #d8edf5;
    padding: 0 10px;
    font-family: inherit;
    font-size: 12px;
    outline: none;
  }

  .eq-input:focus {
    border-color: #00e5ff;
    background: #0c151c;
  }

  .eq-input-action-btn {
    height: 36px;
    padding: 0 10px;
    background: #101c26;
    border: 1px solid #1a2d3d;
    border-left: none;
    color: #00e5ff;
    font-size: 11px;
    font-weight: 800;
    text-transform: uppercase;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;
    white-space: nowrap;
  }

  .eq-input-action-btn:hover {
    background: #142330;
  }

  .eq-select {
    width: 100%;
    height: 36px;
    background: #0b1218;
    border: 1px solid #1a2d3d;
    color: #d8edf5;
    padding: 0 8px;
    font-family: inherit;
    font-size: 12px;
    outline: none;
    cursor: pointer;
  }

  .eq-select:focus {
    border-color: #00e5ff;
  }

  .eq-row-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }

  .eq-checkbox-label {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 11px;
    color: #9cb2be;
    cursor: pointer;
    user-select: none;
  }

  .eq-checkbox-label input[type="checkbox"] {
    appearance: none;
    width: 16px;
    height: 16px;
    background: #0b1218;
    border: 1px solid #1a2d3d;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .eq-checkbox-label input[type="checkbox"]:checked {
    background: #00e5ff;
    border-color: #00e5ff;
  }

  .eq-btn-primary {
    height: 42px;
    background: #00e5ff;
    border: 1px solid #00e5ff;
    color: #03080b;
    font-family: inherit;
    font-size: 12px;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    box-shadow: 4px 4px 0px #000000;
  }

  .eq-btn-primary:hover {
    background: #38edff;
  }

  .eq-btn-primary:active {
    transform: translate(2px, 2px);
    box-shadow: 2px 2px 0px #000000;
  }

  .eq-btn-primary:disabled {
    background: #14232e;
    border-color: #1a2d3d;
    color: #4a6270;
    cursor: not-allowed;
    box-shadow: none;
    transform: none;
  }

  .eq-btn-secondary {
    height: 38px;
    background: #0f1b24;
    border: 1px solid #00ff9d;
    color: #00ff9d;
    font-family: inherit;
    font-size: 12px;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    box-shadow: 3px 3px 0px #000000;
  }

  .eq-btn-secondary:hover {
    background: #00ff9d;
    color: #04080a;
  }

  .eq-btn-secondary:active {
    transform: translate(2px, 2px);
    box-shadow: 1px 1px 0px #000000;
  }

  .eq-btn-secondary:disabled {
    opacity: 0.35;
    cursor: not-allowed;
    border-color: #1a2d3d;
    color: #4a6270;
    background: #0b1218;
    box-shadow: none;
  }

  .eq-status-box {
    padding: 10px 12px;
    background: #0b131a;
    border-left: 3px solid #00e5ff;
    font-size: 11px;
    color: #9cb2be;
    line-height: 1.5;
    word-break: break-word;
  }

  .eq-status-box.error {
    border-left-color: #ff3355;
    color: #ff99aa;
    background: #1a0a0f;
  }

  .eq-status-box.success {
    border-left-color: #00ff9d;
    color: #a8ffd9;
    background: #071710;
  }

  .eq-result-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .eq-result-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #0e1720;
    border: 1px solid #1a2d3d;
    padding: 8px 10px;
  }

  .eq-badges {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
  }

  .eq-badge {
    background: #13202c;
    border: 1px solid #1f3547;
    color: #7d96a6;
    font-size: 10px;
    font-weight: 800;
    padding: 2px 6px;
    text-transform: uppercase;
  }

  .eq-badge.highlight {
    border-color: #00e5ff;
    color: #00e5ff;
  }

  .eq-badge.success {
    border-color: #00ff9d;
    color: #00ff9d;
  }

  .eq-rationale-box {
    background: #0b1218;
    border: 1px solid #1a2d3d;
    padding: 10px;
    font-size: 11px;
    color: #b0c9d6;
  }

  .eq-rationale-title {
    font-size: 10px;
    font-weight: 800;
    color: #00e5ff;
    text-transform: uppercase;
    margin-bottom: 4px;
  }

  .eq-actions-summary {
    background: #0b1218;
    border: 1px solid #1a2d3d;
    padding: 10px;
    font-size: 11px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .eq-action-item {
    display: flex;
    align-items: flex-start;
    gap: 6px;
    color: #8fa7b5;
  }

  .eq-action-bullet {
    color: #00ff9d;
    font-weight: 900;
  }

  .eq-link {
    color: #00e5ff;
    text-decoration: none;
    font-size: 10px;
    font-weight: 800;
  }

  .eq-link:hover {
    text-decoration: underline;
  }

  .eq-footer-note {
    font-size: 9px;
    color: #4a6372;
    text-align: center;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    padding-top: 4px;
  }

  @media (max-width: 480px) {
    .eq-panel {
      right: 16px;
      bottom: 76px;
      width: calc(100vw - 32px);
    }
  }
`
