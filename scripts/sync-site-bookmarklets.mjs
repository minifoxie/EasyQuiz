import { readFile, writeFile } from 'node:fs/promises'

const bookmarklets = JSON.parse(await readFile('docs/bookmarklets.json', 'utf8'))
let html = await readFile('docs/index.html', 'utf8')

function escapeText(value) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

for (const mode of ['discrete', 'legacy']) {
  const code = bookmarklets[mode]
  const hrefPattern = new RegExp(`(<a\\b(?=[^>]*\\bid="bm-${mode}"(?:\\s|>))[^>]*\\bhref=")[^"]*(")`)
  html = html.replace(hrefPattern, `$1${code}$2`)

  const dataPattern = new RegExp(`(<div\\b[^>]*\\bid="code-${mode}-data"[^>]*>)[\\s\\S]*?(</div>)`)
  html = html.replace(dataPattern, `$1${escapeText(code)}$2`)
}

await writeFile('docs/index.html', html, 'utf8')
