import type { CapturedContext, CapturedImage, EasyQuizSettings } from './types'
import { getSessionMemories } from './storage'
import { formatStrategyCatalog, type StrategyWidget } from '../dom/strategies'

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
- Para questões de multi-seleção (escolha_multipla):
  - Avalie cada afirmação/opção individualmente; marque com chk (c: true) EXCLUSIVAMENTE as que forem comprovadamente verdadeiras.
  - NUNCA marque ou inclua ações para alternativas incorretas/falsas.
- Para escolha única (rádio): marque com clk ou chk apenas a alternativa correta.
- Para imagens e gráficos (anexados em [IMAGENS E GRÁFICOS ANEXADOS]):
  - Analise detalhadamente curvas, eixos cartesianos, vértices, coordenadas numéricas e geometria.
  - Cada anexo visual traz explicitamente seu vínculo (Enunciado ou Alternativa correspondente).
  - Compare as figuras de cada alternativa contra a condição do enunciado e selecione a alternativa cujo gráfico é matematicamente idêntico ou satisfaz a questão.

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
rationale: resolução passo a passo e dedução da resposta correta.
`

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

  const widgets = new Set<StrategyWidget>(['navigation'])
  if (context.controls.some((control) => ['text', 'number', 'textarea', 'contenteditable'].some((type) => control.type.includes(type)))) widgets.add('text')
  if (context.controls.some((control) => ['radio', 'checkbox'].includes(control.type) || control.tag === 'button')) widgets.add('choice')
  if (context.controls.some((control) => control.tag === 'select')) widgets.add('select')
  if (context.controls.some((control) => /combobox|dropdown/i.test(control.type))) widgets.add('combobox')
  if (context.controls.some((control) => ['draggable', 'dropzone'].includes(control.type)) || isComplexWidget) widgets.add('drag')
  if (settings.engine === 'javascript') widgets.add('javascript')

  const hasMathOrFormulas =
    /katex|latex|math|matrix|formula|frac|\$|\^|\_/i.test(context.htmlSnippet) ||
    /calcular|calcule|resolva|matriz|equação|função|probabilidade|geometria|fórmula|coordenada|sistema/i.test(context.questionText)

  const shouldIncludeHtml =
    context.questionText.length < 250 || isComplexWidget || context.controls.length < 4 || hasMathOrFormulas

  const htmlBlock = shouldIncludeHtml
    ? `\n[HTML]:\n${context.htmlSnippet.slice(0, 3500).replace(/\s+/g, ' ')}`
    : `\n[HTML]: Omitido.`

  const memories = getSessionMemories()
  const memoryBlock = memories.length > 0 ? `\n[MEMÓRIA]:\n${memories.join(' | ')}\n` : ''

  const answerControls = context.controls.filter((c) => c.role !== 'navigation')
  const navControls = context.controls.filter((c) => c.role === 'navigation')

  return `--- ANÁLISE ---
[MODO]: ${settings.engine} | Dica: ${settings.modeHint || 'Auto'}
[URL]: ${context.sourceUrl}
[PÁGINA]: ${context.pageTitle}${memoryBlock}
[ESTRATÉGIAS]:
${formatStrategyCatalog([...widgets])}
[DADOS]
[TEXTO]:
${context.questionText}${htmlBlock}

[RESPOSTAS]:
${
  answerControls.length > 0
    ? JSON.stringify(
        answerControls.map((c) => ({
          id: c.id,
          t: c.type,
          n: c.name || undefined,
          txt: c.label,
          v: c.value || undefined,
          opt: c.options.length ? c.options : undefined,
        }))
      )
    : 'Nenhuma'
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
