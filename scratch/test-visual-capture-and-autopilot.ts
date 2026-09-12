import { JSDOM } from 'jsdom'

const html = `
<!DOCTYPE html>
<html>
<head>
  <style>
    .card { padding: 20px; width: 600px; }
    .trig-diagram-container { width: 280px; height: 280px; }
  </style>
</head>
<body>
  <article class="card" id="task-step-1">
    <h2>Trigonometria</h2>
    <div class="trig-diagram-container">
      <svg width="280" height="280" viewBox="0 0 300 300">
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#64748b"/>
          </marker>
        </defs>
        <line x1="20" y1="150" x2="280" y2="150" stroke="#64748b" stroke-width="1.5" marker-end="url(#arrow)"/>
        <line x1="150" y1="280" x2="150" y2="20" stroke="#64748b" stroke-width="1.5" marker-end="url(#arrow)"/>
        <text x="270" y="140" fill="#94a3b8">cos</text>
        <text x="156" y="32" fill="#94a3b8">sen</text>
        <circle cx="150" cy="150" r="100" fill="none" stroke="#334155"/>
        <line x1="150" y1="150" x2="100" y2="63.4" stroke="#00ffcc"/>
        <circle cx="100" cy="63.4" r="5" fill="#00ffcc"/>
        <text x="92" y="166">-1/2</text>
        <text x="154" y="68">√3/2</text>
        <text x="156" y="132">120°</text>
      </svg>
    </div>
    <div class="options">
      <label><input type="radio" name="trig-choice" id="q2-opt-a" value="A"> A</label>
      <label><input type="radio" name="trig-choice" id="q2-opt-b" value="B"> B</label>
    </div>
    <button id="btn-check-1">Verificar resposta</button>
  </article>
</body>
</html>
`

const dom = new JSDOM(html, { url: 'http://localhost:3333' })
globalThis.window = dom.window as any
globalThis.document = dom.window.document
globalThis.HTMLElement = dom.window.HTMLElement
globalThis.HTMLInputElement = dom.window.HTMLInputElement
globalThis.SVGElement = dom.window.SVGElement
globalThis.Element = dom.window.Element
globalThis.Node = dom.window.Node
globalThis.XMLSerializer = dom.window.XMLSerializer

async function runTests() {
  console.log('=== TESTE 1: Importação dos Módulos de Mídia e Highlighter ===')
  const { extractTextContextForImage, findAssociatedContextForMedia } = await import('../src/media/capture.js')
  const { highlightAttachedImages, highlightScope, highlightTargetActions, clearHighlights } = await import('../src/dom/highlighter.js')
  console.log('✓ Módulos importados com sucesso!')

  console.log('\n=== TESTE 2: Extração de Texto e Metadados do SVG Trigonométrico ===')
  const svgEl = document.querySelector('svg')!
  const textContext = extractTextContextForImage(svgEl)
  console.log('Contexto textual extraído do SVG:', textContext)
  if (!textContext.includes('cos') || !textContext.includes('sen') || !textContext.includes('120°')) {
    throw new Error('Falha ao extrair textos e ângulos do gráfico SVG!')
  }
  console.log('✓ Textos trigonométricos (cos, sen, 120°, √3/2) extraídos com perfeição!')

  console.log('\n=== TESTE 3: Associação de Metadados de Contexto ===')
  const scope = document.getElementById('task-step-1') as HTMLElement
  const meta = findAssociatedContextForMedia(svgEl, scope)
  console.log('Meta associada:', meta)
  if (!meta.associatedLabel) {
    throw new Error('Falha na associação de metadados da imagem!')
  }
  console.log('✓ Associação de gráfico do enunciado validada com sucesso!')

  console.log('\n=== TESTE 4: Moldura Flutuante de Highlight Bounding-Box [data-easyquiz-image-frame] ===')
  // Mock do getBoundingClientRect no JSDOM
  svgEl.getBoundingClientRect = () => ({
    top: 100,
    left: 50,
    width: 280,
    height: 280,
    bottom: 380,
    right: 330,
    x: 50,
    y: 100,
    toJSON: () => ({})
  })

  highlightAttachedImages([svgEl])

  const frames = document.querySelectorAll('[data-easyquiz-image-frame]')
  console.log(`Molduras flutuantes encontradas no body: ${frames.length}`)
  if (frames.length !== 1) {
    throw new Error(`Esperado 1 moldura flutuante, encontrado ${frames.length}`)
  }
  const frame = frames[0] as HTMLElement
  console.log('Estilo da moldura:', frame.style.border, frame.style.boxShadow)
  if (!frame.style.border.includes('#ffd600') && !frame.style.border.includes('rgb(255, 214, 0)')) {
    throw new Error('Moldura flutuante não contém a borda dourada neon esperada!')
  }

  const badge = frame.querySelector('[data-easyquiz-capture-badge]')
  if (!badge || !badge.textContent?.includes('Imagem / Gráfico Analisado pela IA')) {
    throw new Error('Badge informativo não encontrado na moldura flutuante!')
  }
  console.log('✓ Moldura flutuante e badge 📷 Imagem / Gráfico Analisado pela IA criados perfeitamente!')

  console.log('\n=== TESTE 5: Scanner Cibernético Contínuo e Remoção no Target Highlight ===')
  highlightScope(scope)
  const scanner = scope.querySelector('div[style*="eq-scope-scan"]') as HTMLElement
  if (!scanner || !scanner.style.animation.includes('eq-scope-scan-loop')) {
    throw new Error('Scanner contínuo com animação de loop não encontrado no escopo!')
  }
  console.log('✓ Scanner contínuo sweep ativo no card da questão!')

  // Ao destacar as ações alvo, o scanner deve ser finalizado
  highlightTargetActions([{ t: 'clk', id: 'q2-opt-b' }], 0.95)
  const scannerAfter = scope.querySelector('div[style*="eq-scope-scan-loop"]')
  if (scannerAfter) {
    throw new Error('Scanner ainda presente após conclusão das ações alvo!')
  }
  console.log('✓ Scanner finalizado suavemente com a chegada do plano de ação!')

  console.log('\n=== TESTE 6: Limpeza Completa dos Realces (clearHighlights) ===')
  clearHighlights()
  const framesAfterClear = document.querySelectorAll('[data-easyquiz-image-frame]')
  const badgesAfterClear = document.querySelectorAll('[data-easyquiz-capture-badge]')
  if (framesAfterClear.length !== 0 || badgesAfterClear.length !== 0) {
    throw new Error('clearHighlights não removeu todas as molduras ou badges!')
  }
  console.log('✓ Limpeza de molduras e badges 100% validada!')

  console.log('\n🎉 TODOS OS TESTES DO MOTOR VISUAL E HIGHLIGHTER PASSARAM COM SUCESSO ABSOLUTO!')
}

runTests().catch((err) => {
  console.error('Falha no teste:', err)
  process.exit(1)
})
