import { mkdir, writeFile, readFile, unlink } from 'node:fs/promises'
import path from 'node:path'
import { build } from 'esbuild'

const root = process.cwd()
const dist = path.join(root, 'dist')
await mkdir(dist, { recursive: true })

const isWatch = process.argv.includes('--watch')

const bannerText = `/* EasyQuiz v1.0.0 — Resolução inteligente de quizzes sem servidor
 * GitHub: https://github.com/minifoxie/EasyQuiz
 * 100% Client-side. Direct Google Gemini REST API.
 */`

console.log('[EasyQuiz] Compilando bundle...')

const buildOptions = {
  entryPoints: [path.join(root, 'src', 'index.ts')],
  outfile: path.join(dist, 'easyquiz.js'),
  bundle: true,
  format: 'iife',
  platform: 'browser',
  target: ['chrome100', 'firefox100', 'safari15', 'edge100'],
  minify: true,
  legalComments: 'none',
  sourcemap: false,
  banner: { js: bannerText },
}

await build(buildOptions)

// ============================================================
// BUILD DO MODO DISCRETO
// ============================================================
console.log('[EasyQuiz] Compilando bundle Discreto...')

const discreteBuildOptions = {
  entryPoints: [path.join(root, 'src', 'discrete.ts')],
  outfile: path.join(dist, 'discrete.js'),
  bundle: true,
  format: 'iife',
  platform: 'browser',
  target: ['chrome100', 'firefox100', 'safari15', 'edge100'],
  minify: true,
  legalComments: 'none',
  sourcemap: false,
  banner: { js: `/* EasyQuiz Discreto v1.0.0 — Modo Stealth sem interface\n * 100% Client-side. Direct Google Gemini REST API.\n */` },
}

await build(discreteBuildOptions)

// ============================================================
// BOOKMARKLET SUPREMO — INLINE / AUTO-CONTIDO (Anti-CSP)
// ============================================================
// Por que inline e não fetch+eval?
//
// Problema com fetch+eval:
//   - eval() é bloqueado por Trusted Types (Google Forms, GitHub, etc.)
//   - fetch() a raw.githubusercontent.com é bloqueado por connect-src CSP
//   - script.src = url é bloqueado por TrustedScriptURL
//
// Solução: javascript: URL com bundle completo embutido inline
//   - O browser trata javascript: de bookmark como gesture do usuário (não CSP da página)
//   - Sem eval, sem fetch, sem innerHTML — tudo é DOM API segura
//   - Funciona em Google Forms, Wayground, Quizizz, qualquer site
//
// Limitação: bookmarklet fica grande (~200KB minificado). Browsers modernos
// suportam javascript: URLs de qualquer tamanho quando salvas como favorito.
// ============================================================

// ============================================================
// GERAÇÃO DOS BOOKMARKLETS UNIFICADOS E LIMPEZA
// ============================================================
const bundleRaw = await readFile(path.join(dist, 'easyquiz.js'), 'utf-8')
const bundleClean = bundleRaw.replace(/^\/\*[\s\S]*?\*\/\s*/, '')
const bookmarkletCode = `javascript:(function(){${bundleClean}})();void 0`

const discreteRaw = await readFile(path.join(dist, 'discrete.js'), 'utf-8')
const discreteClean = discreteRaw.replace(/^\/\*[\s\S]*?\*\/\s*/, '')
const discreteBookmarkletCode = `javascript:(function(){${discreteClean}})();void 0`

// Versões Auto-Update Anti-Cache (Legacy Fetch + Eval com timestamp único e auto-destruição prévia)
const githubRepo = 'minifoxie/EasyQuiz'
const rawBase = `https://raw.githubusercontent.com/${githubRepo}/main/dist`

const legacyBookmarklet = `javascript:(function(){fetch('${rawBase}/easyquiz.js?t='+Date.now(),{cache:'no-store'}).then(function(r){if(!r.ok)throw new Error('HTTP '+r.status);return r.text()}).then(function(code){try{if(window.__easyquiz&&typeof window.__easyquiz.destroy==='function'){window.__easyquiz.destroy()}var host=document.getElementById('easyquiz-shadow-root');if(host)host.remove();(0,eval)(code)}catch(e){alert('EasyQuiz erro na execução: '+e)}}).catch(function(err){alert('EasyQuiz falha no download: '+err)})})();`

const discreteLegacy = `javascript:(function(){fetch('${rawBase}/discrete.js?t='+Date.now(),{cache:'no-store'}).then(function(r){if(!r.ok)throw new Error('HTTP '+r.status);return r.text()}).then(function(code){try{if(window.__eqdiscrete&&typeof window.__eqdiscrete.destroy==='function'){window.__eqdiscrete.destroy()}(0,eval)(code)}catch(e){alert('EasyQuiz Discreto erro na execução: '+e)}}).catch(function(err){alert('EasyQuiz Discreto falha no download: '+err)})})();`

// Códigos Curtos Diretos (GitHub Raw sem timestamp)
const legacyShort = `javascript:(function(){fetch('${rawBase}/easyquiz.js',{cache:'no-store'}).then(r=>r.text()).then(code=>{try{(0,eval)(code)}catch(e){alert('EasyQuiz erro: '+e)}})})();`
const discreteShort = `javascript:(function(){fetch('${rawBase}/discrete.js',{cache:'no-store'}).then(r=>r.text()).then(code=>{try{(0,eval)(code)}catch(e){alert('EasyQuiz Discreto erro: '+e)}})})();`

// Deleta arquivos .txt antigos e redundantes
for (const oldTxt of ['bookmarklet_legacy.txt', 'bookmarklet_discrete.txt', 'bookmarklet_discrete_legacy.txt']) {
  try {
    await unlink(path.join(dist, oldTxt))
  } catch {}
}

// Arquivo Único Mestre de Bookmarklets com Documentação Completa (Apenas Códigos Resumidos do GitHub)
const masterBookmarkletDoc = `================================================================================
                    EASYQUIZ — MANUAL SUPREMO DE BOOKMARKLETS
================================================================================
GitHub: https://github.com/minifoxie/EasyQuiz

Estes são os códigos definitivos, resumidos e oficiais do EasyQuiz via GitHub Raw.
Basta criar um favorito no seu navegador (Ctrl+D ou botão direito na barra
de favoritos > Adicionar página) e colar o código desejado no campo "URL".

--------------------------------------------------------------------------------
1. MODO LEGACY (PAINEL COMPLETO ESTILO VS CODE)
--------------------------------------------------------------------------------
Painel visual flutuante completo com todas as abas:
  • 🚀 Resolver (Ações rápidas e execução)
  • 🧠 Cérebro da IA (Contexto e árvore de elementos)
  • 🖼️ Mídias & Imagens (Miniaturas reais, status da IA, relevância e lightbox)
  • ⏱️ Métricas & Cronômetro (Histórico e tempo por questão)
  • 💻 Terminal & Debug Output (Logs ao vivo, console e tokens)
  • ⚙️ Configurações (Chaves Gemini, seleção de modelo, visão computacional)
Atalho padrão: Alt+Q para abrir/fechar e analisar.

Opção A — Código Curto Direto (Recomendado):
${legacyShort}

Opção B — Código com Anti-Cache Timestamp & Auto-Limpeza:
${legacyBookmarklet}

--------------------------------------------------------------------------------
2. MODO DISCRETO (STEALTH 100% INVISÍVEL)
--------------------------------------------------------------------------------
Opera em segundo plano de forma 100% invisível sem botões na tela:
  • Alt+Q / Shift+Q: Analisar questão
  • Shift+V: Janela de Mídias e Imagens (miniaturas reais e lightbox da IA)
  • Shift+H: DevTools completo (Console, Fluxo, Plano IA, Mídias, Auditoria)
  • Shift+M: Trocar modelo de IA em tempo real
  • Shift+A: Adicionar ou trocar chaves de API
  • Shift+C: Menu de comandos rápidos
  • Shift+Z: Cancelar fluxo atual
  • Shift+R: Re-analisar questão

Opção A — Código Curto Direto (Recomendado):
${discreteShort}

Opção B — Código com Anti-Cache Timestamp & Auto-Limpeza:
${discreteLegacy}
`

await writeFile(path.join(dist, 'bookmarklet.txt'), masterBookmarkletDoc, 'utf-8')


const discreteBmEscaped = discreteBookmarkletCode
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')

const installerDiscreto = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>EasyQuiz Discreto — Instalar</title>
  <style>
    *{box-sizing:border-box;margin:0;padding:0}
    body{font-family:system-ui,sans-serif;background:#0a0a0f;color:#e2e8f0;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:32px 16px}
    .card{background:#111118;border:1px solid #1e1e2e;border-radius:14px;padding:44px;max-width:660px;width:100%;text-align:center}
    h1{font-size:26px;background:linear-gradient(90deg,#a78bfa,#60a5fa);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:6px;letter-spacing:-0.02em}
    .sub{font-size:12px;color:#6366f1;background:#1e1b4b;border:1px solid #312e81;display:inline-block;padding:2px 10px;border-radius:20px;margin-bottom:22px}
    p{color:#94a3b8;line-height:1.65;margin-bottom:18px;font-size:14px}
    .bm-link{display:inline-flex;align-items:center;gap:8px;background:linear-gradient(135deg,#4c1d95,#6d28d9);color:#ede9fe;padding:14px 30px;border-radius:8px;text-decoration:none;font-size:16px;font-weight:700;margin:22px 0;cursor:grab;border:2px dashed #7c3aed;transition:all .2s}
    .bm-link:hover{background:linear-gradient(135deg,#6d28d9,#7c3aed);transform:scale(1.03);box-shadow:0 0 24px rgba(109,40,217,.4)}
    .shortcuts{background:#0d0d16;border:1px solid #1e1e2e;border-radius:10px;padding:18px 20px;margin:22px 0;text-align:left}
    .shortcuts h3{font-size:12px;text-transform:uppercase;letter-spacing:0.08em;color:#6366f1;margin-bottom:12px;font-weight:600}
    .shortcuts table{width:100%;border-collapse:collapse}
    .shortcuts td{padding:5px 0;font-size:12px;color:#94a3b8;vertical-align:top}
    .shortcuts td:first-child{width:130px}
    kbd{background:#1e1e2e;border:1px solid #312e81;border-radius:4px;padding:1px 6px;font-size:11px;color:#a5b4fc;font-family:'SF Mono','Fira Code',monospace;white-space:nowrap}
    .step{display:flex;align-items:flex-start;gap:12px;text-align:left;background:#0d0d16;border:1px solid #1e1e2e;border-radius:8px;padding:12px;margin-bottom:8px}
    .step-num{background:#4c1d95;color:#ede9fe;border-radius:50%;width:22px;height:22px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;flex-shrink:0;margin-top:2px}
    .step-text{color:#cbd5e1;font-size:13px;line-height:1.5}
    .step-text strong{color:#e2e8f0}
    .note{background:#0d0d16;border:1px solid #92400e44;border-radius:8px;padding:10px 14px;color:#d97706;font-size:12px;margin-top:14px;text-align:left}
    code{background:#1e1e2e;padding:2px 5px;border-radius:3px;font-size:11px;color:#a5b4fc}
  </style>
</head>
<body>
  <div class="card">
    <h1>EasyQuiz Discreto</h1>
    <span class="sub">STEALTH MODE — SEM INTERFACE — 100% ANTI-DETEC&#xC7;&#xC3;O</span>
    <p>Arraste o bot&#xE3;o abaixo para a <strong>barra de favoritos</strong>. Opera completamente em segundo plano &#x2014; apenas micro-indicadores discretos no canto da tela e ao lado do cursor.</p>
    <div style="margin:20px 0">
      <a class="bm-link" href="${discreteBmEscaped}" title="Arraste para a barra de favoritos">
        &#x1F441; EasyQuiz Discreto &#x2014; Arrastar para Favoritos
      </a>
    </div>
    <div class="shortcuts">
      <h3>Atalhos do Sistema</h3>
      <table>
        <tr><td><kbd>Alt+Q</kbd> / <kbd>Shift+Q</kbd></td><td>Analisar p&#xE1;gina atual</td></tr>
        <tr><td><kbd>Shift+V</kbd></td><td>M&#xED;dias &amp; Imagens IA (Lightbox)</td></tr>
        <tr><td><kbd>Shift+H</kbd></td><td>Debug Output (Logs, Fluxo, IA)</td></tr>
        <tr><td><kbd>Shift+M</kbd></td><td>Selecionar modelo Gemini</td></tr>
        <tr><td><kbd>Shift+A</kbd></td><td>Configurar chaves de API</td></tr>
        <tr><td><kbd>Shift+Z</kbd></td><td>Cancelar fluxo ativo</td></tr>
        <tr><td><kbd>Shift+R</kbd></td><td>Re-analisar p&#xE1;gina</td></tr>
        <tr><td><kbd>Shift+C</kbd></td><td>Menu de Comandos clic&#xE1;veis</td></tr>
        <tr><td><kbd>Shift+I</kbd></td><td>Status atual (dica r&#xE1;pida)</td></tr>
        <tr><td><kbd>Escape</kbd></td><td>Fechar menus</td></tr>
        <tr><td><em>Qualquer tecla&#x2728;</em></td><td>Avan&#xE7;a resposta de texto</td></tr>
        <tr><td><em>Clique&#x2728;</em></td><td>Executa sele&#xE7;&#xE3;o/a&#xE7;&#xE3;o</td></tr>
      </table>
      <p style="font-size:11px;color:#475569;margin-top:8px;">&#x2728; = apenas quando h&#xE1; fluxo de resposta ativo</p>
    </div>
    <div class="step"><div class="step-num">1</div><div class="step-text">Ative a <strong>barra de favoritos</strong> (Ctrl+Shift+B no Chrome/Edge)</div></div>
    <div class="step"><div class="step-num">2</div><div class="step-text">Arraste o bot&#xE3;o acima para a barra de favoritos</div></div>
    <div class="step"><div class="step-num">3</div><div class="step-text">Acesse qualquer quiz, clique no favorito e configure as API keys com <kbd>Shift+A</kbd></div></div>
    <div class="step"><div class="step-num">4</div><div class="step-text">Pressione <kbd>Shift+Q</kbd> para analisar. Siga as dicas no canto da tela.</div></div>
    <div class="note"><strong>&#x26A0;&#xFE0F; Se n&#xE3;o conseguir arrastar:</strong> Bot&#xE3;o direito na barra &#x2192; Adicionar p&#xE1;gina &#x2192; cole o conte&#xFA;do de <code>dist/bookmarklet_discrete.txt</code> no campo URL.</div>
  </div>
</body>
</html>`

await writeFile(path.join(dist, 'instalar_discreto.html'), installerDiscreto, 'utf-8')

// Userscript para Tampermonkey / Violentmonkey (mais robusto que bookmarklet em sites restritos)
const pkg = JSON.parse(await readFile(path.join(root, 'package.json'), 'utf-8'))
const version = pkg.version || '2.1.0'

const userscriptHeader = `// ==UserScript==
// @name         EasyQuiz Pro
// @namespace    https://github.com/${githubRepo}
// @version      ${version}
// @description  Resolução inteligente e preenchimento de questões e formulários com IA
// @author       minifoxie
// @match        *://*/*
// @updateURL    https://raw.githubusercontent.com/${githubRepo}/main/dist/easyquiz.user.js
// @downloadURL  https://raw.githubusercontent.com/${githubRepo}/main/dist/easyquiz.user.js
// @grant        none
// @run-at       document-idle
// ==/UserScript==

`
const bundleContent = await readFile(path.join(dist, 'easyquiz.js'), 'utf-8')
await writeFile(path.join(dist, 'easyquiz.user.js'), userscriptHeader + bundleContent, 'utf-8')

// ============================================================
// PAGINA INSTALADORA DO BOOKMARKLET
// ============================================================
// Cria dist/instalar_bookmarklet.html — pagina local que permite
// arrastar o bookmarklet inline para a barra de favoritos do browser.
// Resolve o problema de copiar 300KB de texto manualmente.
// ============================================================
const bmEscaped = bookmarkletCode
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')

const installerHtml = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>EasyQuiz — Instalar Bookmarklet</title>
  <style>
    *{box-sizing:border-box;margin:0;padding:0}
    body{font-family:system-ui,sans-serif;background:#0d1117;color:#e6edf3;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:32px 16px}
    .card{background:#161b22;border:1px solid #30363d;border-radius:12px;padding:40px;max-width:640px;width:100%;text-align:center}
    h1{font-size:28px;background:linear-gradient(90deg,#58a6ff,#bc8cff);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:8px}
    .badge{display:inline-block;background:#1f6feb;color:#fff;font-size:11px;padding:2px 8px;border-radius:20px;margin-bottom:24px}
    p{color:#8b949e;line-height:1.6;margin-bottom:20px}
    .step{display:flex;align-items:flex-start;gap:12px;text-align:left;background:#0d1117;border:1px solid #30363d;border-radius:8px;padding:14px;margin-bottom:10px}
    .step-num{background:#1f6feb;color:#fff;border-radius:50%;width:24px;height:24px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;flex-shrink:0;margin-top:2px}
    .step-text{color:#c9d1d9;font-size:14px;line-height:1.5}
    .step-text strong{color:#e6edf3}
    .bm-link{display:inline-block;background:linear-gradient(135deg,#238636,#2ea043);color:#fff;padding:16px 32px;border-radius:8px;text-decoration:none;font-size:17px;font-weight:700;margin:24px 0;cursor:grab;border:2px dashed #3fb950;transition:all .2s}
    .bm-link:hover{background:linear-gradient(135deg,#2ea043,#3fb950);transform:scale(1.03);box-shadow:0 0 20px rgba(63,185,80,.3)}
    .works{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin:16px 0}
    .works span{background:#21262d;border:1px solid #30363d;border-radius:20px;padding:4px 12px;font-size:12px;color:#8b949e}
    .works span::before{content:'\u2713 ';color:#3fb950}
    .note{background:#161b22;border:1px solid #f0883e44;border-radius:8px;padding:12px 16px;color:#f0883e;font-size:13px;margin-top:16px;text-align:left}
    .note strong{color:#ffa657}
    code{background:#21262d;padding:2px 6px;border-radius:4px;font-size:12px}
  </style>
</head>
<body>
  <div class="card">
    <h1>EasyQuiz Pro</h1>
    <span class="badge">BOOKMARKLET INLINE — SEM EVAL, SEM FETCH — ANTI-CSP</span>
    <p>Arraste o bot&#xE3;o abaixo para a <strong>barra de favoritos</strong>. Funciona em qualquer site, incluindo Google Forms e sites com CSP restrito.</p>
    <div style="margin:24px 0">
      <a class="bm-link" href="${bmEscaped}" title="Arraste para a barra de favoritos">&#x1F3AF; EasyQuiz &#x2014; Arrastar para Favoritos</a>
    </div>
    <div class="works">
      <span>Google Forms</span><span>Wayground</span><span>Quizizz</span><span>Moodle</span><span>Khan Academy</span><span>Qualquer site</span>
    </div>
    <div class="step"><div class="step-num">1</div><div class="step-text">Ative a <strong>barra de favoritos</strong> (Ctrl+Shift+B no Chrome/Edge)</div></div>
    <div class="step"><div class="step-num">2</div><div class="step-text">Arraste o bot&#xE3;o verde acima para a barra de favoritos</div></div>
    <div class="step"><div class="step-num">3</div><div class="step-text">Acesse qualquer quiz/formul&#xE1;rio e clique no favorito instalado</div></div>
    <div class="note"><strong>&#x26A0;&#xFE0F; Se n&#xE3;o conseguir arrastar:</strong><br>Bot&#xE3;o direito na barra de favoritos &#x2192; Adicionar p&#xE1;gina &#x2192; cole o conte&#xFA;do de <code>dist/bookmarklet.txt</code> no campo URL.</div>
  </div>
</body>
</html>`

await writeFile(path.join(dist, 'instalar_bookmarklet.html'), installerHtml, 'utf-8')

// Informações de tamanho para diagnóstico
const bookmarkletSize = Buffer.byteLength(bookmarkletCode, 'utf-8')
const bundleSize = Buffer.byteLength(bundleContent, 'utf-8')

console.log('[EasyQuiz] Build concluído com sucesso!')
console.log(`- Artefato JS: dist/easyquiz.js (${(bundleSize / 1024).toFixed(1)} KB)`)
console.log(`- Manual Unificado Supremo: dist/bookmarklet.txt`)
console.log(`- Userscript: dist/easyquiz.user.js`)
