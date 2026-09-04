import type { CapturedContext, CapturedImage, EasyQuizSettings } from './types'

export const SYSTEM_PROMPT = `Você é o EasyQuiz Engine v3.0. Retorne JSON estrito.
Regras Absolutas:
1. "pageType": "question" (se há pergunta), "info" (avisos), "start" (início), "conclusion" (FIM/NOTA: retorne actions vazias).
2. "rationale" (OBRIGATÓRIO): Pense passo a passo. SE HOUVER IMAGENS, descreva matematicamente/textualmente o que você vê nelas ANTES de responder.
3. "needsMoreContext": true se não houver dados suficientes.
4. "actions": Array de comandos minificados:
   - { "t": "val", "id": "id_campo", "v": "resposta" }
   - { "t": "chk", "id": "id_check", "c": true }
   - { "t": "sel", "id": "id_select", "v": ["valor"] }
   - { "t": "clk", "id": "id_ou_texto" }
   - { "t": "adv" } (Botão próximo)
   - { "t": "js", "v": "$eq.click('botao')" }`

export function buildUserPrompt(
  context: CapturedContext,
  images: CapturedImage[],
  settings: EasyQuizSettings,
): string {
  // Otimização extrema Anti-Quizizz e economia de tokens
  // Se o texto puro capturado for razoavelmente longo (ex: > 80 chars),
  // e as imagens existirem, muito provavelmente o HTML é inútil e só desperdiça tokens.
  const shouldIncludeHtml = context.questionText.length < 80

  const htmlBlock = shouldIncludeHtml
    ? `\n[HTML FRAGMENT]:\n${context.htmlSnippet}`
    : `\n[HTML FRAGMENT]: Omitido (Texto puro suficiente. Foque no texto e nos controles).`

  return `--- NOVA QUESTÃO ---
[MODO REQUERIDO]: ${settings.engine}
[DICA]: ${settings.modeHint || 'Auto'}
[SIMULAÇÃO]: ${settings.dryRun ? 'ON' : 'OFF'}
[URL]: ${context.sourceUrl}
[PÁGINA]: ${context.pageTitle}

[TEXTO VISÍVEL]:
${context.questionText}
${htmlBlock}

[CONTROLES]:
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
Responda em JSON.`
}
