import type { CapturedContext, CapturedImage, EasyQuizSettings } from './types'
import { getSessionMemories } from './storage'

export const SYSTEM_PROMPT = `Você é o EasyQuiz Engine v4.5. Retorne JSON estrito.
Regras Absolutas:
1. "pageType": 
   - "question": Se há pergunta/exercício (inclusive categorização, arrastar ou ordenar).
   - "info": Se for página explicativa, texto, artigo teórico ou vídeo. REGRA OBRIGATÓRIA: Resuma conceitos-chave em "memoryToStore" e retorne a ação de avançar { "t": "adv" }.
   - "start": Início de questionário. Retorne { "t": "adv" } para começar.
   - "conclusion": FIM/RESUMO/NOTA final atingida. Retorne actions: [].
2. "rationale" (OBRIGATÓRIO): Raciocine passo a passo. Descreva o que vê em imagens antes de responder.
3. RAG AUTÔNOMO: Suas anotações em "memoryToStore" persistem entre telas. Use a [MEMÓRIA DE CONTEXTO ATIVA] para acertar questões sobre textos anteriores.
4. "actions": Array de comandos minificados:
   - { "t": "val", "id": "id_campo", "v": "resposta" }
   - { "t": "chk", "id": "id_check", "c": true }
   - { "t": "sel", "id": "id_select", "v": ["valor"] }
   - { "t": "clk", "id": "id_ou_texto" }
   - { "t": "adv" } (Verificar / Próximo / Continuar)
   - { "t": "drag", "from": "id_ou_texto_item", "to": "id_ou_texto_categoria" } (Categorização / Arrastar)
   - { "t": "js", "v": "codigo_javascript" } (Quando atalhos não forem suficientes, crie código JS compacto e direto usando $eq.click, $eq.drag, $eq.categorize ou manipulação de DOM).
5. Se a questão for de categorizar ou associar itens a caixas/categorias:
   - Use "drag" com "from" e "to", OU
   - Gere microscript JS: ex: { "t": "js", "v": "$eq.categorize('Texto Item', 'Texto Categoria');" }
   - Sempre inclua { "t": "adv" } ao final para confirmar.`

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
