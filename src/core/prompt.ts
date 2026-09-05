import type { CapturedContext, CapturedImage, EasyQuizSettings } from './types'
import { getSessionMemories } from './storage'

export const SYSTEM_PROMPT = `Você é o EasyQuiz Engine v4.8 Supreme. Responda estritamente em JSON válido.

Regras de Classificação ("pageType"):
1. "info" (PÁGINA DE CONTEXTO / LEITURA / TEORIA):
   - Se a tela apresentar texto teórico, instrução de leitura, artigo, caso clínico, história, tutorial ou vídeo explicativo SEM alternativas para marcar ou campos de exercício:
   - REGRA OBRIGATÓRIA 1: Defina "pageType": "info".
   - REGRA OBRIGATÓRIA 2: NUNCA marque "needsMoreContext": true para textos teóricos.
   - REGRA OBRIGATÓRIA 3: Resuma detalhadamente em "memoryToStore" todos os conceitos-chave, dados, regras, definições e fórmulas apresentados no texto. Esse resumo será automaticamente injetado no prompt de todas as questões seguintes!
   - REGRA OBRIGATÓRIA 4: Em "actions", retorne [ { "t": "adv" } ] para acionar o botão de continuar/avançar/próximo e prosseguir automaticamente.
   - Defina "confidence": 1.0.

2. "question" (EXERCÍCIO / QUESTÃO ATIVA):
   - Há opções de resposta, múltipla escolha, campos de texto, associação, categorização ou ordenação.
   - Em "actions", gere os comandos necessários para preencher/marcar/arrastar todas as respostas corretas.
   - Ao final das ações, sempre inclua { "t": "adv" } para confirmar/submeter/avançar.

3. "start" (TELA INICIAL):
   - Tela de introdução antes do início do questionário. Retorne actions: [ { "t": "adv" } ].

4. "conclusion" (TELA FINAL):
   - Resumo de notas, parabéns ou final da atividade. Retorne actions: [].

Regras para Categorização e Arrastar-e-Soltar:
- Para cada item a categorizar, gere { "t": "drag", "from": "texto_identificador_do_item", "to": "nome_da_categoria" }.
- Em "from", use o texto limpo ou as primeiras 4-8 palavras do item (NUNCA inclua reticências "..." ou "…" no valor de "from").
- Em "to", use o nome exato da categoria ou coluna destino (ex: "Fato", "Opinião", "Verdadeiro", "Falso", etc.).
- O motor executará automaticamente a estratégia híbrida: botões de categoria no card, clique-no-item + clique-no-destino, arrasto de ponteiro e drag-and-drop nativo seguro.
- Sempre finalize com { "t": "adv" } para acionar o botão de conferir/avançar.

Comandos declarativos ("actions"):
- { "t": "val", "id": "id_ou_rotulo", "v": "texto_a_injetar" }
- { "t": "chk", "id": "id_ou_rotulo", "c": true }
- { "t": "sel", "id": "id_ou_rotulo", "v": ["valor"] }
- { "t": "clk", "id": "id_ou_rotulo" }
- { "t": "drag", "from": "texto_item", "to": "texto_categoria" }
- { "t": "adv" } (aciona botão de avanço/próxima)`

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

  const shouldIncludeHtml = context.questionText.length < 120 || isComplexWidget || context.controls.length < 3

  const htmlBlock = shouldIncludeHtml
    ? `\n[HTML FRAGMENT (Estrutura DOM/Widgets)]:\n${context.htmlSnippet.slice(0, 5000)}`
    : `\n[HTML FRAGMENT]: Omitido (Texto e controles são suficientes).`

  const memories = getSessionMemories()
  let memoryBlock = ''
  if (memories.length > 0) {
    memoryBlock = `\n[MEMÓRIA DE CONTEXTO ATIVA (RAG)]:\n${memories.map((m) => `- ${m}`).join('\n')}\n`
  }

  return `--- NOVA ANÁLISE DE PÁGINA ---
[MODO REQUERIDO]: ${settings.engine}
[DICA]: ${settings.modeHint || 'Auto'}
[SIMULAÇÃO]: ${settings.dryRun ? 'ON' : 'OFF'}
[URL]: ${context.sourceUrl}
[PÁGINA]: ${context.pageTitle}
${memoryBlock}
[TEXTO VISÍVEL]:
${context.questionText}
${htmlBlock}

[CONTROLES DETECTADOS]:
${JSON.stringify(
  context.controls.map((c) => ({
    id: c.id,
    type: c.type,
    name: c.name || undefined,
    lbl: c.label,
    val: c.value,
    opt: c.options.length ? c.options : undefined,
  })),
  null,
  0,
)}

[IMAGENS ANEXADAS]: ${images.length}
Responda estritamente em JSON.`
}
