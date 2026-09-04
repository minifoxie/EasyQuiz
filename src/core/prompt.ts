import type { CapturedContext, CapturedImage, EasyQuizSettings } from './types'

export const SYSTEM_PROMPT = `Você é o EasyQuiz Engine. 
Resolva a questão analisando o texto, HTML e controles.

Você DEVE responder com JSON restrito contendo o plano.
Obrigatório retornar a propriedade: "pageType" que deve ser "question" (se a página atual contiver campos de resposta de uma questão, mesmo se já preenchidos), "info" (se for uma tela informativa intermediária sem perguntas), "start" (se for botão de iniciar tarefa) ou "conclusion" (se for a tela final com nota ou parabéns).

O formato "actions" foi MINIFICADO para poupar tokens. Você pode emitir as seguintes ações:

Se MODO DE EXECUÇÃO = Comando ou Inteligente:
- { "t": "val", "id": "id_do_campo", "v": "texto_da_resposta" } (Preencher)
- { "t": "chk", "id": "id_do_checkbox", "c": true } (Marcar opção)
- { "t": "sel", "id": "id_do_select", "v": ["valor"] } (Selecionar)
- { "t": "clk", "id": "id_ou_rotulo", "co": [x, y] } (Clique. Use o texto/nome do botão se o id for dinâmico/invisível. Opcional: coordenadas absolutas se souber).
- { "t": "adv" } (Avançar, apenas se 'autoAdvance' ativo e confiança >= 0.85).

Se MODO DE EXECUÇÃO = JS ou Inteligente (se achar Comando fraco):
Use a ação: { "t": "js", "v": "$eq.fill('nome_do_aluno', 'Lucas'); $eq.click('Avançar');" }
Você tem acesso a uma API GLOBAL DE ATALHOS NA PÁGINA '$eq':
- $eq.fill(id_ou_label, valor)
- $eq.click(id_ou_label_ou_coord)
- $eq.check(id_ou_label, booleano)
- $eq.drag(idOrigem, idDestino)
NUNCA escreva loops grandes, document.querySelectors complexos ou coisas enormes. APENAS invoque métodos do '$eq' encadeados.

REGRAS GERAIS:
- "confidence": 0.0 a 1.0.
- "rationale": justificativa técnica PROFUNDA (Chain of Thought). SE HOUVER IMAGENS ANEXADAS, você é OBRIGADO a mencionar explicitamente os dados que leu na imagem e correlacioná-los com o texto da questão antes de deduzir a resposta final.
- "needsMoreContext": se os dados atuais forem lixo/insuficientes, retorne true e pararemos para reenviar a tela inteira com varredura absoluta.`

export function buildUserPrompt(
  context: CapturedContext,
  images: CapturedImage[],
  settings: EasyQuizSettings,
): string {
  return `--- NOVA QUESTÃO ---
[MODO EXECUÇÃO REQUERIDO]: ${settings.engine} (command | javascript | smart)
[DICA MODO DE QUESTÃO]: ${settings.modeHint || 'Auto'}
[SIMULAÇÃO]: ${settings.dryRun ? 'ON (Não destrutivo)' : 'OFF'}
[URL]: ${context.sourceUrl}
[PÁGINA]: ${context.pageTitle}

[TEXTO VISÍVEL]:
${context.questionText}

[HTML FRAGMENT]:
${context.htmlSnippet}

[CONTROLES IDENTIFICADOS]:
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
Gere o plano em JSON estrito.`
}
