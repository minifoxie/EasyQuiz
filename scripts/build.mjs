import { mkdir, writeFile } from 'node:fs/promises'
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

// Bookmarklet Supremo (Anti-Cache)
const githubRepo = 'minifoxie/EasyQuiz'
const rawUrl = `https://raw.githubusercontent.com/${githubRepo}/main/dist/easyquiz.js`

// Versão compacta com fetch + eval para driblar MIME text/plain e Cache do Github
const bookmarkletCode = `javascript:fetch('${rawUrl}?t='+Date.now()).then(r=>r.text()).then(eval);`

await writeFile(path.join(dist, 'bookmarklet.txt'), `${bookmarkletCode}\n`, 'utf-8')

// Userscript para Tampermonkey / Violentmonkey
const pkg = JSON.parse(await import('node:fs').then((fs) => fs.readFileSync(path.join(root, 'package.json'), 'utf-8')))
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
const bundleContent = await import('node:fs').then((fs) => fs.readFileSync(path.join(dist, 'easyquiz.js'), 'utf-8'))
await writeFile(path.join(dist, 'easyquiz.user.js'), userscriptHeader + bundleContent, 'utf-8')

console.log('[EasyQuiz] Build concluído com sucesso!')
console.log(`- Artefato JS: dist/easyquiz.js`)
console.log(`- Bookmarklet: dist/bookmarklet.txt`)
console.log(`- Userscript: dist/easyquiz.user.js`)
