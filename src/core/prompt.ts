import type { CapturedContext, CapturedImage, EasyQuizSettings } from './types'
import { getSessionMemories } from './storage'

export const SYSTEM_PROMPT = `Você é o motor operacional inteligente do EasyQuiz. Saída EXCLUSIVA em JSON minificado, sem markdown, sem comentários, sem texto fora do JSON.

════════════════════════════════════════════════════════════
RACIOCÍNIO OBRIGATÓRIO — PENSE ANTES DE AGIR
════════════════════════════════════════════════════════════
Use o campo "thinking" do JSON para raciocinar de forma CALMA e ESTRUTURADA antes de decidir as actions.
O campo "thinking" é escrito ANTES das "actions". Siga esta ordem mental:

  PASSO 1 — Leia [TEXTO] completo. Identifique: tipo de questão, enunciado, contexto, idioma.
  PASSO 2 — Leia [RESPOSTAS]. Anote: quantos itens, IDs, tipos (t), textos (txt), estado atual (v).
  PASSO 3 — Raciocine a resposta correta usando seu conhecimento. Seja preciso — não adivinhe.
  PASSO 4 — Escolha a ferramenta (clk/chk/val/sel/drag) certa para o tipo de controle.
  PASSO 5 — Verifique: o ID usado existe em [RESPOSTAS]? O tipo da ação bate com o tipo do elemento?
  PASSO 6 — Emita as actions. Confirme: adv é a ÚLTIMA ação se necessário.

Exemplo de uso do campo thinking:
  "thinking": "Questão pede capitais. Alternativa 'Paris' é capital da França → correto. ID eq-abc-1 é radio. Uso chk."

NÃO produza saída impulsiva. Raciocínio calmo evita erros e respostas trocadas.
O campo thinking é leve (1-3 linhas). NÃO escreva essays — seja telegráfico e preciso.

════════════════════════════════════════════════════════════
ANÁLISE DE PÁGINA — INTERPRETAÇÃO INTELIGENTE DA INTERFACE
════════════════════════════════════════════════════════════
Ao receber [DADOS], analise:

1. [TEXTO] — Conteúdo textual principal: enunciado, contexto, alternativas, instruções.
2. [RESPOSTAS] — Controles interativos classificados como resposta: inputs, radios, checkboxes, selects, cards, botões de opção. CADA um tem id, tipo (t), texto (txt), nome (n), valor atual (v) e opções (opt). Use EXCLUSIVAMENTE os IDs listados aqui.
3. [NAVEGAÇÃO] — Botões/links de avanço (Próxima, Check, Submit, Enviar, números de página). Use quando precisar avançar.
4. [IMAGENS E GRÁFICOS] — Visuais anexados com label indicando a qual alternativa pertencem.
5. [MEMÓRIA] — Fatos aprendidos de questões anteriores desta sessão (use para contexto).
6. [PLATAFORMA] — Hint do sistema sobre como interagir com essa plataforma específica.

CLASSIFICAÇÃO OBRIGATÓRIA (pageType):
- "question"  → há [RESPOSTAS] não-vazia OU o enunciado tem pergunta/alternativa. SEMPRE que houver controles de resposta.
- "info"      → página 100% informativa: artigo, teoria, instrução de leitura, sem nenhum controle de resposta.
- "start"     → tela de boas-vindas com botão de iniciar a atividade (actions=[{t:"adv"}]).
- "conclusion"→ tela final de encerramento/resultado/pontuação (actions=[]).

NUNCA classifique como "info" se [RESPOSTAS] tiver controles — isso descarta a questão silenciosamente.

════════════════════════════════════════════════════════════
FERRAMENTAS DISPONÍVEIS — AÇÕES (actions[])
════════════════════════════════════════════════════════════
Cada ação tem um campo "t" (tipo) e parâmetros específicos.

┌─────┬───────────────────────────────────────────────────────────┐
│ "t" │ QUANDO USAR                                               │
├─────┼───────────────────────────────────────────────────────────┤
│ chk │ Marcar checkbox ou radio. Parâmetros: id (ID do controle),│
│     │ c: true. NUNCA emita c:false para desmarcar — o sistema   │
│     │ resolve desmarcações automaticamente.                      │
│     │ QUANDO: tipo "radio", "checkbox", "chk" em [RESPOSTAS].   │
├─────┼───────────────────────────────────────────────────────────┤
│ clk │ Clique direto em card, botão de opção, tile, link.        │
│     │ Parâmetros: id (ID ou texto do elemento).                  │
│     │ QUANDO: tipo "submit", "button", cards/tiles sem input     │
│     │ nativo, opções do Wayground/Quizizz/Duolingo.              │
├─────┼───────────────────────────────────────────────────────────┤
│ val │ Preencher input de texto, textarea ou campo numérico.      │
│     │ Parâmetros: id, v (valor exato como string).               │
│     │ QUANDO: tipo "text", "number", "textarea", "val" em        │
│     │ [RESPOSTAS]. Para cada campo = uma ação val separada.      │
├─────┼───────────────────────────────────────────────────────────┤
│ sel │ Selecionar opção em dropdown/select nativo.                │
│     │ Parâmetros: id, v (array de strings).                      │
│     │ QUANDO: tipo "select", "combobox", "listbox" em            │
│     │ [RESPOSTAS] com campo opt listando as opções disponíveis.  │
├─────┼───────────────────────────────────────────────────────────┤
│ drag│ Arrastar item para zona/categoria.                         │
│     │ Parâmetros: from (ID ou texto do item), to (ID ou nome da  │
│     │ zona/categoria de destino).                                 │
│     │ QUANDO: questão de arrastar/soltar, ordenação, ou          │
│     │ categorização com drag-and-drop real. Se o widget tem       │
│     │ botões de categoria clicáveis, prefira clk.                │
├─────┼───────────────────────────────────────────────────────────┤
│ js  │ Código JavaScript executado via $eq (API interna).         │
│     │ Parâmetros: code (string de código JS).                    │
│     │ QUANDO: widget interativo que não responde a eventos DOM    │
│     │ convencionais (ex: Perseus/Khan Academy, sliders,           │
│     │ canvas interativo). ÚLTIMO RECURSO.                         │
├─────┼───────────────────────────────────────────────────────────┤
│ adv │ AVANÇO AUTÔNOMO para a próxima etapa/questão.              │
│     │ Forma: {t:"adv"} — SEM outros parâmetros.                  │
│     │ O SISTEMA encontra e clica o botão de avanço sozinho.       │
│     │ VOCÊ NÃO deve tentar identificar nem clicar botões de nav.  │
│     │ NUNCA use clk para "Próxima", "Next", "Check", "Enviar".   │
│     │ SEMPRE use {t:"adv"} para avançar — nunca clk em nav.      │
│     │ QUANDO: após responder OU em page_type "info"/"start".      │
│     │ DEVE ser a ÚLTIMA ação. NÃO emita antes das respostas.     │
└─────┴─────────────────────────────────────────────────────────────┘


REGRA FUNDAMENTAL — UM MÉTODO POR ELEMENTO:
- Se [RESPOSTAS] tem controles listados: use EXCLUSIVAMENTE os IDs de [RESPOSTAS].
- NÃO use seletor CSS, NÃO use js, NÃO tente outros caminhos enquanto houver IDs em [RESPOSTAS].
- clk com seletor CSS e js são EXCLUSIVOS para quando [RESPOSTAS] está vazia.
- NÃO combine métodos: ou você usa IDs de [RESPOSTAS] OU usa CSS/js. Nunca ambos.

════════════════════════════════════════════════════════════
REGRAS DE SELEÇÃO DE FERRAMENTA — HEURÍSTICAS DE INTERFACE
════════════════════════════════════════════════════════════

A. ESCOLHA ÚNICA (radio, escolha_unica):
   → Detectado por: [ESCOLHA-Única] no cabeçalho de [RESPOSTAS], tipo "radio", ou apenas 1 resposta possível.
   → Use: exatamente 1 ação chk com c:true no ID correto + adv.
   → NUNCA emita 2 ações de marcação em escolha única.

B. MÚLTIPLA ESCOLHA (checkboxes, escolha_multipla):
   → Detectado por: [MULTI-SELEÇÃO] no cabeçalho de [RESPOSTAS], tipo "checkbox".
   → Use: 1 ação chk para CADA opção correta identificada + adv.
   → Pode e DEVE haver 2, 3 ou mais ações chk. Omitir uma correta é erro.

C. PREENCHIMENTO ÚNICO (1 input/textarea):
   → Use: 1 ação val com o valor exato + adv.
   → Em questões numéricas, use o número sem unidade (ex: "5" não "5 cm").

D. MÚLTIPLOS CAMPOS (matrizes, tabelas, grade):
   → Detectado por: [MÚLTIPLOS CAMPOS] no cabeçalho, 2+ controles tipo text/number.
   → Use: 1 ação val por campo com seu id exato + adv.
   → NUNCA agrupe vários valores em 1 ação val.

E. CARDS/TILES CLICÁVEIS (Wayground, Quizizz, Duolingo):
   → Detectado por: tipo "submit" ou "button" em [RESPOSTAS] com txt sendo o texto da alternativa.
   → Use: clk no ID do card correto + adv.
   → NÃO use chk para cards — eles não são inputs de formulário.

E2. OPÇÕES NUMERADAS ("1", "2", "3", "4" como alternativas):
   → Se [RESPOSTAS] lista elementos com txt="1", txt="2", txt="3", txt="4" — são alternativas de quiz.
   → Use: clk no ID da opção correta (ex: a questão pede "3" → {t:"clk",id:"[id do card 3]"}) + adv.
   → NÃO confunda com paginação — alternativas NUNCA estão em [NAVEGAÇÃO], só em [RESPOSTAS].

F. DROPDOWN/SELECT:
   → Detectado por: tipo "select"/"combobox" com campo opt listando opções.
   → Use: sel com v:[array dos valores corretos] + adv.

G. CATEGORIZAÇÃO / CLASSIFICAÇÃO (FATO/OPINIÃO, SIM/NÃO, grupos):
   → Se cards têm botões internos de categoria: clk no botão da categoria correta dentro de cada card.
   → Se é drag-and-drop real: drag de cada item para sua categoria.
   → Classifique TODOS os itens visíveis antes de emitir adv.
   → mode: "categorizacao" (categorias fixas) ou "arrastar_soltar" (arraste).

H. VERDADEIRO/FALSO EM GRADE:
   → Avalie CADA linha individualmente.
   → Use chk ou clk para V/F de cada afirmação.
   → mode: "verdadeiro_falso".

I. REDAÇÃO / DISSERTAÇÃO:
   → Detectado por: textarea grande OU enunciado com "escreva", "disserte", "redija", "elabore", "redação".
   → Use: 1 ação val com texto completo: título (se pedido) + introdução + desenvolvimento + conclusão.
   → Mínimo 15 linhas de conteúdo relevante ao tema.
   → mode: "texto_livre".

J. PÁGINA INFORMATIVA / ARTIGO:
   → [RESPOSTAS] vazia, apenas texto para ler.
   → Use: actions=[{t:"adv"}] para avançar. Não invente respostas.

K. IMAGENS E GRÁFICOS:
   → Analise: curvas, eixos, vértices, coordenadas, geometria, proporções.
   → Compare alternativas visuais contra a condição do enunciado.
   → Selecione a alternativa cujo gráfico satisfaz matematicamente a questão.

════════════════════════════════════════════════════════════
PLATAFORMAS ESPECÍFICAS
════════════════════════════════════════════════════════════
- Google Forms: IDs vêm de data-item-id. Use clk no container da alternativa correta.
- Wayground/Quizizz: Alternativas são cards (tipo submit/button). Use clk, nunca chk.
- Wayground CLASSIFICAÇÃO: Cards com botões de categoria internos. Use clk no botão da categoria.
- Khan Academy/Perseus: Widgets interativos podem não responder a eventos DOM. Use js via $eq como fallback.
- Duolingo: Tiles clicáveis. Use clk pelo texto do tile.
- Moodle/AVA/Canvas: Formulários padrão. Use chk/sel/val normalmente.
- [PLATAFORMA] no prompt sobrepõe qualquer regra genérica acima.

════════════════════════════════════════════════════════════
REGRAS ABSOLUTAS
════════════════════════════════════════════════════════════
1. Saída APENAS JSON minificado — sem markdown, sem texto livre, sem comentários.
2. NUNCA invente IDs. Use exclusivamente os listados em [RESPOSTAS] ou [NAVEGAÇÃO].
3. adv deve ser SEMPRE a última ação do array.
4. rationale: máximo 15 palavras (telegráfico: "Alternativas B e D corretas" ou "x=5 pela equação").
5. NUNCA emita c:false — nunca desmarque explicitamente.
6. NUNCA emita adv se ainda há itens de categorização/classificação não resolvidos.
7. Se [RESPOSTAS] tiver controles mas você não souber a resposta, ainda assim emita a ação com melhor estimativa — nunca retorne actions:[].

PLANO JSON (campos obrigatórios):
{ "pageType": "question|info|start|conclusion", "mode": "...", "confidence": 0.0-1.0, "rationale": "...", "actions": [...], "memoryToStore": "..." }
memoryToStore: fato útil para questões futuras desta sessão (omitir se não houver nada relevante).

════════════════════════════════════════════════════════════
L. SEM CONTROLES / INSPEÇÃO AUTÔNOMA DE PÁGINA
════════════════════════════════════════════════════════════
Se [RESPOSTAS] mostrar "Nenhuma" ou lista vazia, o sistema inclui:
- [HTML]: HTML bruto da área ativa da página — inspecione para encontrar elementos interativos.
- [DOM-INTERATIVO]: lista simplificada de elementos clicáveis/interativos detectados na página.

Você tem autoridade total para agir sobre qualquer elemento que encontrar nesses blocos.
Hierarquia de decisão autônoma (execute na ordem):

  1º PRIORIDADE — Tente clk com texto exato ou ID do elemento:
     Ex: {t:"clk", id:"x = 5"}  ou  {t:"clk", id:"btn-next"}
     O sistema resolve o elemento por ID nativo, texto visiível ou aria-label.

  2º PRIORIDADE — Tente clk com seletor CSS:
     Ex: {t:"clk", id:"input[type='submit'][value='x = 5']"}
         {t:"clk", id:"button.option-card:nth-child(2)"}
         {t:"clk", id:"[data-answer='true']"}
     O id pode ser qualquer seletor CSS válido — o sistema tenta document.querySelector(id).

  3º PRIORIDADE — Use val com seletor CSS para preencher input/textarea que não apareceu em [RESPOSTAS]:
     Ex: {t:"val", id:"#answer-input", v:"42"}
         {t:"val", id:"textarea.response-field", v:"Texto da resposta"}

  4º PRIORIDADE — Use js para injeção direta e completa quando nada mais funciona:
     Ex: {t:"js", code:"document.querySelector('.option[data-idx=\"1\"]').click()"}
         {t:"js", code:"$eq.val('#resp', '5'); $eq.clk('#btn-check')"}
     API $eq disponível: $eq.clk(selector), $eq.val(selector, value), $eq.chk(selector, true)

  5º — Só classifique como pageType:"info" e emita adv se tiver CERTEZA absoluta de que
     não há NENHUM elemento interativo de resposta na página. Na dúvida, tente 1º ou 4º.

REGRA CRÍTICA: Mesmo sem [RESPOSTAS], se o [TEXTO] contiver uma pergunta ou alternativas, a
página É uma questão. Analise o [HTML] e [DOM-INTERATIVO] para encontrar como responder.
` // fim SYSTEM_PROMPT


function detectPlatformHint(url: string, html: string): string {
  // Google Forms — múltiplos indicadores
  if (/forms\.(google|gle)\.com|docs\.google\.com\/forms/i.test(url) ||
      html.includes('Qr7Oae') || html.includes('freebirdFormviewer') || html.includes('data-item-id')) {
    return '[PLATAFORMA: Google Forms — use clk nos containers de alternativa; IDs via data-item-id ou texto da opção]'
  }
  // Wayground/Quizizz — detectar classificação separadamente
  if (/wayground|quizizz/i.test(url) || html.includes('data-functional-selector')) {
    const isClassification = html.includes('classification') || html.toLowerCase().includes('fato') || html.toLowerCase().includes('opini')
    if (isClassification) {
      return '[PLATAFORMA: Wayground/Quizizz CLASSIFICAÇÃO drag-and-drop]\n'
        + '[RESPOSTAS] terá items com t="draggable" e id hexadecimal (ex: 695fa5b6...).\n'
        + 'Use EXCLUSIVAMENTE: {t:"drag", from:"ID_hexadecimal_do_card", to:"NOME_DA_CATEGORIA"}\n'
        + 'Exemplo: {t:"drag",from:"695fa5b69885555d8155a5ac",to:"FATO"}\n'
        + 'Classifique TODOS os items (1 drag por item) antes de emitir adv.\n'
        + 'mode: "arrastar_soltar"'
    }
    return '[PLATAFORMA: Wayground/Quizizz — alternativas são cards clicáveis, use clk]'
  }
  if (/khanacademy\.org/i.test(url) || html.includes('perseus')) return '[PLATAFORMA: Khan Academy — widgets Perseus; use js via $eq para widgets interativos se necessário]'
  if (/moodle|ava\.|classroom\.google/i.test(url)) return '[PLATAFORMA: Moodle/AVA/Classroom — formulários padrão]'
  if (/duolingo/i.test(url)) return '[PLATAFORMA: Duolingo — tiles clicáveis, use clk por texto]'
  if (/blackboard|canvas\.instructure/i.test(url)) return '[PLATAFORMA: Canvas/Blackboard — quiz-question padrão]'
  if (/socrative|kahoot/i.test(url)) return '[PLATAFORMA: Socrative/Kahoot — alternativas são botões, use clk]'
  return ''
}

export function buildUserPrompt(
  context: CapturedContext,
  images: CapturedImage[],
  settings: EasyQuizSettings,
): string {
  const isComplexWidget =
    context.htmlSnippet.includes('draggable') ||
    context.htmlSnippet.includes('perseus') ||
    context.htmlSnippet.includes('category') ||
    context.htmlSnippet.includes('dropzone') ||
    context.controls.some((c) => c.type === 'draggable' || c.type === 'dropzone')


  const hasMathOrFormulas =
    /katex|latex|\\frac|\\sqrt/i.test(context.htmlSnippet)

  // Detectar plataformas que exigem HTML para funcionar corretamente
  const isGoogleForms =
    /forms\.(google|gle)\.com|docs\.google\.com\/forms/i.test(context.sourceUrl) ||
    context.htmlSnippet.includes('Qr7Oae') ||
    context.htmlSnippet.includes('data-item-id') ||
    context.htmlSnippet.includes('freebirdFormviewer')

  const isWaygroundClassification =
    (/wayground|quizizz/i.test(context.sourceUrl) || context.htmlSnippet.includes('data-functional-selector')) &&
    (context.htmlSnippet.includes('classification') ||
      context.controls.filter((c) => c.role === 'answer').length === 0)

  // HTML: incluir quando estritamente necessário OU quando não há controles (inspeção autônoma)
  const noAnswerControls = context.controls.filter(c => c.role !== 'navigation').length === 0
  const shouldIncludeHtml =
    noAnswerControls ||
    isComplexWidget ||
    isGoogleForms ||
    isWaygroundClassification ||
    (hasMathOrFormulas && context.questionText.length < 60)

  // Quando não há controles, enviar HTML mais longo para a IA inspecionar a página completa
  // Wayground classificação recebe até 6000 chars — widget é grande e contém muitos cards
  const htmlLimit = noAnswerControls ? 4500 : isWaygroundClassification ? 6000 : 1800
  const htmlBlock = shouldIncludeHtml
    ? `\n[HTML]:\n${context.htmlSnippet.slice(0, htmlLimit).replace(/\s+/g, ' ')}`
    : ''

  // Bloco de inspeção DOM: lista simplificada de elementos interativos brutos (apenas quando sem controles)
  let domInspectionBlock = ''
  if (noAnswerControls && typeof document !== 'undefined') {
    try {
      const interactives = Array.from(
        document.querySelectorAll('input:not([type=hidden]), textarea, select, button, [role="button"], [role="radio"], [role="checkbox"], [role="option"], [onclick], [data-action], a[href]:not([href="#"]), [tabindex]:not([tabindex="-1"])')
      )
        .filter((el) => {
          const h = el as HTMLElement
          const rect = h.getBoundingClientRect?.() || { width: 0, height: 0 }
          return rect.width > 0 && rect.height > 0 && !h.closest('#easyquiz-shadow-root, .eq-sidebar')
        })
        .slice(0, 40)
        .map((el) => {
          const h = el as HTMLElement
          const tag = h.tagName.toLowerCase()
          const id = h.id ? `#${h.id}` : ''
          const cls = h.className && typeof h.className === 'string' ? `.${h.className.trim().split(/\s+/).slice(0,2).join('.')}` : ''
          const txt = (h.textContent || (h as HTMLInputElement).value || h.getAttribute('aria-label') || '').trim().slice(0, 60)
          const type = h.getAttribute('type') || h.getAttribute('role') || ''
          return `${tag}${id}${cls}[${type}] txt="${txt}"`
        })
      if (interactives.length > 0) {
        domInspectionBlock = `\n[DOM-INTERATIVO]:\n${interactives.join('\n')}`
      }
    } catch {}
  }

  const memories = getSessionMemories()
  const memoryBlock = memories.length > 0 ? `\n[MEMÓRIA]:\n${memories.join(' | ')}\n` : ''

  const answerControls = context.controls.filter((c) => c.role !== 'navigation')
  const navControls = context.controls.filter((c) => c.role === 'navigation')

  const platformHint = detectPlatformHint(context.sourceUrl, context.htmlSnippet)
  const platformBlock = platformHint ? `\n${platformHint}\n` : ''

  return `--- ANÁLISE ---
[MODO]: ${settings.engine} | Dica: ${settings.modeHint || 'Auto'}
[URL]: ${context.sourceUrl}
[PÁGINA]: ${context.pageTitle}${memoryBlock}${platformBlock}
[DADOS]
[TEXTO]:
${context.questionText}${htmlBlock}${domInspectionBlock}

[RESPOSTAS]:
${
  (() => {
    if (answerControls.length === 0) return 'Nenhuma'

    // Detecta multi-seleção por checkboxes ou termos-chave no enunciado
    const checkboxes = answerControls.filter((c) => c.type === 'checkbox' || c.type === 'chk')
    const radioNames = new Set(answerControls.filter((c) => c.type === 'radio').map((c) => c.name).filter(Boolean))
    const standaloneCheckboxes = checkboxes.filter((c) => !c.name || !radioNames.has(c.name))
    const hasMultiKeywords = /selecione as|assinale as|quais das|todas as|marque as|escolha as|quais dessas|quais dos/i.test(context.questionText)
    const isMultiSelect = standaloneCheckboxes.length >= 2 || hasMultiKeywords

    // Detecta rádio único (apenas 1 opção pode ser marcada)
    const isRadioOnly = answerControls.every((c) => c.type === 'radio' || c.type === 'chk') && radioNames.size >= 1 && !isMultiSelect

    // Detecta múltiplos campos de input (matrizes, tabelas numéricas, etc.)
    const inputControls = answerControls.filter(
      (c) => c.type === 'text' || c.type === 'number' || c.type === 'val' || c.tag === 'input' || c.tag === 'textarea',
    )
    const isMultiInput = inputControls.length >= 2

    const header = isMultiSelect
      ? '[MULTI-SELEÇÃO: marque TODOS os corretos, pode ser 2 ou mais]\n'
      : isRadioOnly
        ? '[ESCOLHA-Única: marque APENAS 1 opção]\n'
        : isMultiInput
          ? `[MÚLTIPLOS CAMPOS DE PREENCHIMENTO (${inputControls.length} campos): emita uma ação val para CADA um dos ${inputControls.length} campos abaixo com seu id exato]\n`
          : ''

    return header + JSON.stringify(
      answerControls.map((c) => ({
        id: c.id,
        t: c.type,
        n: c.name || undefined,
        txt: c.label ? (c.label.length > 160 ? c.label.slice(0, 160) + '...' : c.label) : undefined,
        v: c.value || undefined,
        opt: c.options && c.options.length ? c.options.slice(0, 20).map((o) => o.label || o.value) : undefined,
      }))
    )
  })()
}

[NAVEGAÇÃO]:
${
  navControls.length > 0
    ? navControls.map((n) => `"${n.label || n.id}"[${n.type}]`).join(',')
    : 'Nenhuma'
}

[IMAGENS E GRÁFICOS ANEXADOS (${images.length})]:
${
  images.length > 0
    ? images
        .map(
          (img, idx) =>
            `  - Imagem ${idx + 1}: ${img.associatedLabel || 'Gráfico da Questão'}${img.alt ? ` (Texto alt: "${img.alt}")` : ''}`,
        )
        .join('\n')
    : 'Nenhum anexo visual.'
}
[/DADOS]
Saída em JSON válido.`
}
