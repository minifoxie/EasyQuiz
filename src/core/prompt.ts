import type { CapturedContext, CapturedImage, EasyQuizSettings } from './types'

export const SYSTEM_PROMPT = `Você é o EasyQuiz Engine. 
Sua tarefa é analisar o contexto da tela (texto e controles HTML) e retornar um plano JSON.
REGRAS ESTABELECIDAS:
1. Retorne JSON estrito.
2. "pageType": "question" (se há questão a ser respondida), "info" (tela informativa), "start" (tela inicial), "conclusion" (tela final de nota/parabéns).
3. SE "pageType" FOR "conclusion", "actions" DEVE ESTAR VAZIO.
4. "rationale": Cadeia de raciocínio lógico profunda. Se houver imagens anexadas, você DEVE extrair e correlacionar os dados da imagem (como gráficos) com o texto da questão antes de inferir a resposta final.
5. "needsMoreContext": Retorne true se a pergunta ou as opções estiverem ausentes.
6. AÇÕES MINIFICADAS:
  - { "t": "val", "id": "id_do_campo", "v": "texto_da_resposta" } (Preencher input)
  - { "t": "chk", "id": "id_do_checkbox", "c": true } (Marcar opção)
  - { "t": "sel", "id": "id_do_select", "v": ["valor"] } (Selecionar select)
  - { "t": "clk", "id": "id_ou_rotulo", "co": [x, y] } (Clicar em botão/elemento)
  - { "t": "adv" } (Avançar para a próxima tela)
  - { "t": "js", "v": "$eq.fill('id', 'val');" } (Atalhos JS via $eq)`

export function buildUserPrompt(
  context: CapturedContext,
  images: CapturedImage[],
  settings: EasyQuizSettings,
): string {
  // Otimização massiva de tokens: só envia o htmlSnippet cru se não tivermos controles parseados 
  // ou se o texto legível for absurdamente escasso.
  const isScarce = context.questionText.length < 80 || context.controls.length === 0
  const htmlBlock = isScarce ? `\n[HTML FALLBACK (INFO ESCASSA)]:\n${context.htmlSnippet}` : ''

  return `--- NOVA ANÁLISE ---
[MODO]: ${settings.engine}
[TIPO DICA]: ${settings.modeHint || 'Auto'}
[URL]: ${context.sourceUrl}

[TEXTO VISÍVEL]:
${context.questionText}
${htmlBlock}
[CONTROLES PARSEADOS]:
${JSON.stringify(
  context.controls.map((c) => ({
    id: c.id,
    type: c.type,
    lbl: c.label,
    val: c.value,
    opt: c.options.length ? c.options : undefined,
  })),
)}

[QTD IMAGENS ANEXADAS]: ${images.length}
Gere o plano em JSON estrito.`
}
