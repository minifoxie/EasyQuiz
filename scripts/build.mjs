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

// Informações de tamanho para diagnóstico
const bookmarkletSize = Buffer.byteLength(bookmarkletCode, 'utf-8')
const bundleSize = Buffer.byteLength(bundleContent, 'utf-8')

console.log('[EasyQuiz] Build concluído com sucesso!')
console.log(`- Artefato JS: dist/easyquiz.js (${(bundleSize / 1024).toFixed(1)} KB)`)
console.log(`- Bookmarklet: dist/bookmarklet.txt (${(bookmarkletSize / 1024).toFixed(1)} KB inline — sem eval, sem fetch)`)
console.log(`- Bookmarklet legacy: dist/bookmarklet_legacy.txt (fetch+eval — pode falhar em sites com CSP)`)
console.log(`- Userscript: dist/easyquiz.user.js`)
