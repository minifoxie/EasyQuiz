import { mkdir, writeFile, readFile } from 'node:fs/promises'
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

const bundleRaw = await readFile(path.join(dist, 'easyquiz.js'), 'utf-8')

// Remove o banner de comentário do topo (/* ... */) para economizar bytes
const bundleClean = bundleRaw.replace(/^\/\*[\s\S]*?\*\/\s*/, '')

// Wrap: protege variáveis globais e garante que o bundle não polua o escopo
// void 0 no final evita que o browser tente navegar para o valor de retorno
const bookmarkletCode = `javascript:(function(){${bundleClean}})();void 0`

await writeFile(path.join(dist, 'bookmarklet.txt'), `${bookmarkletCode}\n`, 'utf-8')

// Versão legacy fetch+eval (mantida como bookmarklet_legacy.txt para quem quiser)
const githubRepo = 'minifoxie/EasyQuiz'
const rawUrl = `https://raw.githubusercontent.com/${githubRepo}/main/dist/easyquiz.js`
const legacyBookmarklet = `javascript:fetch('${rawUrl}?t='+Date.now()).then(r=>r.text()).then(eval);`
await writeFile(path.join(dist, 'bookmarklet_legacy.txt'), `${legacyBookmarklet}\n`, 'utf-8')

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
console.log(`- Bookmarklet: dist/bookmarklet.txt (${(bookmarkletSize / 1024).toFixed(1)} KB inline — sem eval, sem fetch)`)
console.log(`- Bookmarklet legacy: dist/bookmarklet_legacy.txt (fetch+eval — pode falhar em sites com CSP)`)
console.log(`- Userscript: dist/easyquiz.user.js`)
