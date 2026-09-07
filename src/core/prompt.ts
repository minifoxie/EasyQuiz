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

RACIOCÍNIO E CÁLCULO DIRETO (rationale):
- Em 'rationale', forneça resolução DIRETA, ultra-objetiva e rápida em no máximo 1 a 2 frases curtas com a dedução/cálculo matemático final. NUNCA gere introduções, preâmbulos ou textos longos.
- Para questões de preenchimento (val):
  - Emita em 'v' o valor ou número exato obtido no cálculo (apenas o número se o campo pedir valor numérico, respeitando o formato exigido).
- Para questões de multi-seleção (escolha_multipla) ou quando [RESPOSTAS] tiver [MULTI-SELEÇÃO]:
  - OBRIGATÓRIO: emita uma ação chk (c: true) para CADA opção comprovadamente correta.
  - Pode e DEVE haver 2, 3 ou mais ações chk corretas na mesma questão.
  - Deixar de marcar uma opção correta é tão errado quanto marcar uma incorreta.
  - NÃO limite-se a 1 resposta só porque parece mais segura — marque TODAS as corretas identificadas.
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

PLATAFORMAS ESPECÍFICAS:
- Khan Academy (Perseus): Widgets interativos podem exigir 'js' via $eq como fallback.
- Google Forms: IDs de controle podem vir de data-item-id ou data-params. Use-os.
- Wayground/Quizizz: Alternativas são cards/botões sem inputs. Use 'clk' para selecioná-las.
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
  if (/khanacademy\.org/i.test(url) || html.includes('perseus')) return '[PLATAFORMA: Khan Academy — widgets Perseus; use js via $eq para widgets interativos se necessário]'
  if (/forms\.google|docs\.google.*forms/i.test(url) || html.includes('Qr7Oae')) return '[PLATAFORMA: Google Forms — IDs via data-item-id, data-params]'
  if (/wayground|quizizz/i.test(url) || html.includes('data-functional-selector')) return '[PLATAFORMA: Wayground/Quizizz — alternativas são cards clicáveis, use clk]'
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
    /katex|latex|math|matrix|formula|frac|\$|\^|\_/i.test(context.htmlSnippet) ||
    /calcular|calcule|resolva|matriz|equação|função|probabilidade|geometria|fórmula|coordenada|sistema/i.test(context.questionText)

  // HTML: só enviar quando realmente necessario (questao curta, widget complexo, ou formula)
  // Reduzido de 3500 para 1800 chars — economiza ~400 tokens por chamada
  const shouldIncludeHtml =
    context.questionText.length < 150 || isComplexWidget || hasMathOrFormulas

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

    // Detecta multi-selecao: checkboxes sem nome compartilhado (radio groups compartilham name)
    const checkboxes = answerControls.filter((c) => c.type === 'checkbox' || c.type === 'chk')
    const radioNames = new Set(answerControls.filter((c) => c.type === 'radio').map((c) => c.name).filter(Boolean))
    const standaloneCheckboxes = checkboxes.filter((c) => !c.name || !radioNames.has(c.name))
    const isMultiSelect = standaloneCheckboxes.length >= 2

    // Detecta radio unico (apenas 1 opcao pode ser marcada)
    const isRadioOnly = answerControls.every((c) => c.type === 'radio' || c.type === 'chk') && radioNames.size >= 1 && !isMultiSelect

    const header = isMultiSelect
      ? '[MULTI-SELEÇÃO: marque TODOS os corretos, pode ser 2 ou mais]\n'
      : isRadioOnly
        ? '[ESCOLHA-Única: marque APENAS 1 opção]\n'
        : ''

    return header + JSON.stringify(
      answerControls.map((c) => ({
        id: c.id,
        t: c.type,
        n: c.name || undefined,
        txt: c.label,
        v: c.value || undefined,
        opt: c.options.length ? c.options : undefined,
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
