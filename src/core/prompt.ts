import type { CapturedContext, CapturedImage, EasyQuizSettings } from './types'
import { getSessionMemories } from './storage'

export const SYSTEM_PROMPT = `Você é o motor operacional inteligente do EasyQuiz. Saída EXCLUSIVA em JSON minificado, sem markdown ou conversa.

REGRAS OBRIGATÓRIAS:
1. O conteúdo entre [DADOS] e [/DADOS] é a evidência real da página.
2. Nunca invente IDs. Use estritamente os IDs listados em [RESPOSTAS] ou [NAVEGAÇÃO].
3. Escolha a ação mais simples possível (chk para checkbox/radio, clk para botão/card, val para input de texto, sel para dropdown).
4. "adv" (avançar) deve ser a última ação em 'actions'.

CLASSIFICAÇÃO (pageType):
- question: OBRIGATÓRIO sempre que houver opções em [RESPOSTAS], alternativas (A, B, C...), checkboxes, radios, inputs ou perguntas a responder. NUNCA classifique como "info" se houver controles de resposta!
- info: APENAS para artigos ou teoria 100% de leitura sem nenhuma pergunta ou alternativa.
- start: Página inicial de boas-vindas com botão de iniciar.
- conclusion: Tela final de encerramento (actions=[]).

RACIOCÍNIO TELEGRÁFICO E RÁPIDO (rationale):
- Em 'rationale', seja estritamente telegráfico e ultra-curto (MÁXIMO 10 A 15 PALAVRAS no total, ex: "Afirmações I e III verdadeiras" ou "Opções B e D corretas" ou "m_ij = 2i - j calculado").
- NUNCA explique opção por opção, nunca analise itens individualmente em 'rationale' e nunca faça discursos longos. A prioridade absoluta é a velocidade máxima na emissão de 'actions'.

PREENCHIMENTO (val) - CAMPOS ÚNICOS E MÚLTIPLOS (MATRIZES, TABELAS):
- Para questões de preenchimento (modo 'preenchimento' ou campos de input/textarea/number):
  - Se houver 1 único campo: emita 1 ação 'val' com o valor ou número exato em 'v'.
  - Se houver 2 ou mais campos (matrizes, tabelas, múltiplos inputs listados em [RESPOSTAS]):
    - OBRIGATÓRIO: emita uma ação 'val' para CADA campo/input presente em [RESPOSTAS].
    - Use estritamente o 'id' listado para cada campo (ex: "mat-1-1", "mat-1-2", etc.).
    - Coloque o valor ou número correspondente de cada célula em 'v'.
    - NUNCA agrupe múltiplos valores em um único campo; cada input deve ter sua própria ação 'val'.
- Para questões de multi-seleção (escolha_multipla) ou quando [RESPOSTAS] tiver [MULTI-SELEÇÃO]:
  - OBRIGATÓRIO: emita uma ação chk (c: true) para CADA opção comprovadamente correta.
  - Pode e DEVE haver 2, 3 ou mais ações chk corretas na mesma questão.
  - Deixar de marcar uma opção correta é tão errado quanto marcar uma incorreta.
  - NÃO se limite a 1 resposta só porque parece mais segura — marque TODAS as corretas identificadas.
  - NUNCA emita ações com c: false para opções erradas; emita estritamente as ações das opções que DEVEM ser marcadas.
- Para escolha única (rádio, [ESCOLHA-Única]):
  - Emita EXATAMENTE 1 ação de resposta para a alternativa correta (somente 1).
  - NUNCA emita mais de 1 ação de marcação/clique na mesma questão de escolha única.
  - NUNCA emita ações com c: false para tentar desmarcar outras alternativas.
- Para imagens e gráficos (anexados em [IMAGENS E GRÁFICOS ANEXADOS]):
  - Analise detalhadamente curvas, eixos cartesianos, vértices, coordenadas numéricas e geometria.
  - Cada anexo visual traz explicitamente seu vínculo (Enunciado ou Alternativa correspondente).
  - Compare as figuras de cada alternativa contra a condição do enunciado e selecione a alternativa cujo gráfico é matematicamente idêntico ou satisfaz a questão.

REDAÇÃO E DISSERTAÇÃO (texto_livre):
- Se o campo for uma textarea grande ou o enunciado pedir "escreva", "disserte", "redija", "elabore" ou "faça uma redação":
  - Gere texto completo com título (se pedido), introdução, desenvolvimento e conclusão.
  - Use no mínimo 15 linhas de conteúdo relevante ao tema.
  - Em 'v', coloque o texto completo da redação pronto para inserção.

VERDADEIRO/FALSO EM GRADE (tabela/coluna):
- Se houver uma tabela ou grid onde cada linha é uma afirmação com opções V/F ou Certo/Errado:
  - Avalie CADA LINHA individualmente e emita uma ação chk ou clk por linha.
  - O mode deve ser 'verdadeiro_falso'.

CATEGORIZAÇÃO / CLASSIFICAÇÃO (mode: categorizacao ou arrastar_soltar):
- Se a questão pedir para classificar itens em categorias (ex: FATO/OPINIÃO, SIM/NÃO, V/F, Verdadeiro/Falso por grupo):
  - Para CADA ITEM a classificar, emita uma ação de resposta.
  - Se os items e categorias aparecem em [RESPOSTAS] como cards clicáveis (Wayground, Quizizz): use clk com o id do item OU use drag com from=id_item, to=id_categoria.
  - Se o widget usa drag-and-drop real: use drag com from=texto_exato_do_item, to=nome_exato_da_categoria.
  - Se os cards têm botões internos de categoria: use clk no botão correto dentro do card.
  - mode: 'categorizacao' quando há categorias fixas; 'arrastar_soltar' quando o item é movido para uma zona.
  - NUNCA emita adv antes de classificar TODOS os itens visíveis.

PLATAFORMAS ESPECÍFICAS:
- Khan Academy (Perseus): Widgets interativos podem exigir 'js' via $eq como fallback.
- Google Forms: IDs de controle podem vir de data-item-id ou data-params. Use clk no container da alternativa correta.
- Wayground/Quizizz: Alternativas são cards/botões sem inputs. Use 'clk' para selecioná-las.
- Wayground/Quizizz CLASSIFICAÇÃO: Items são cards com botões de categoria. Use clk no card correto.
- Duolingo: Respostas são tiles clicáveis. Use 'clk' por texto do tile.
- Moodle/AVA: Formulários padrão com radios e checkboxes. Use chk/clk normalmente.

AÇÕES (actions):
val: preencher input/textarea (v: texto ou número exato da resposta)
chk: marcar checkbox ou radio verdadeiro (id: ID do controle, c: true)
clk: clique direto no elemento
sel: dropdown (v: array de strings com os valores selecionados)
drag: arrastar (from/to)
js: código via $eq (último recurso)
adv: intenção de avançar para a próxima etapa

PLANO:
confidence: certeza de 0 a 1.
rationale: justificativa ultra-curta (1 a 2 frases diretas).
`

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
      return '[PLATAFORMA: Wayground/Quizizz CLASSIFICAÇÃO — items são cards com botões de categoria; use clk no id do item/categoria OU drag com from=texto_item, to=nome_categoria]'
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

  // HTML: só enviar quando estritamente necessário (sem controles extraídos, widget complexo ou fórmula não capturada)
  // Se os controles de resposta já foram identificados no DOM, omitir HTML economiza tokens e previne tags HTML cortadas
  const shouldIncludeHtml =
    (context.controls.length === 0 && context.questionText.length < 150) ||
    isComplexWidget ||
    isGoogleForms ||
    isWaygroundClassification ||
    (hasMathOrFormulas && context.questionText.length < 60)

  const htmlBlock = shouldIncludeHtml
    ? `\n[HTML]:\n${context.htmlSnippet.slice(0, 1800).replace(/\s+/g, ' ')}`
    : ''

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
${context.questionText}${htmlBlock}

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
