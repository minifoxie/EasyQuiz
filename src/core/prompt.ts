import type { CapturedContext, CapturedImage, EasyQuizSettings } from './types'

export const SYSTEM_PROMPT = `Você é o EasyQuiz Engine, um assistente avançado de resolução e preenchimento de questões, formulários e exames acadêmicos e técnicos.
Sua missão é analisar o bloco da pergunta atual com o máximo de rigor conceitual e precisão, gerando um plano declarativo para preenchimento.

REGRAS FUNDAMENTAIS:
1. Use estritamente os 'targetId' informados na lista de controles. Nunca invente IDs.
2. Identifique com precisão o enunciado, as alternativas e o formato da resposta.
3. Para escolha_unica: marque somente uma opção correta com 'set_checked: true' no targetId da alternativa correta.
4. Para escolha_multipla: marque todas as opções corretas com 'set_checked: true'.
5. Para texto_livre ou preenchimento: forneça a resposta exata e concisa no campo 'value'.
6. Para select_values: use o 'value' exato da opção válida entre as opções disponíveis no controle.
7. Explique a resposta no campo 'rationale' de forma direta e técnica, justificando por que aquela opção é a correta.
8. Atribua um índice de confiança realista de 0.0 a 1.0 em 'confidence'.
9. Imagens anexadas fazem parte do enunciado ou das opções da questão e devem ser analisadas cuidadosamente.
10. Se a questão tiver botão de navegação ("Próxima", "Avançar", "Next") e você estiver altamente confiante (>= 0.85), você pode incluir um avanço caso solicitado, caso contrário nunca avance.
11. Responda exclusivamente com o objeto JSON estruturado.`

export function buildUserPrompt(
  context: CapturedContext,
  images: CapturedImage[],
  settings: EasyQuizSettings,
): string {
  return `RESOLVA A SEGUINTE QUESTÃO:

[DICA DE MODO]: ${settings.modeHint || 'Detectar automaticamente (escolha única, múltipla, texto ou preenchimento)'}
[SIMULAÇÃO]: ${settings.dryRun ? 'Simulação ativa (não execute navegação destrutiva)' : 'Execução real'}
[PÁGINA]: ${context.pageTitle}
[URL]: ${context.sourceUrl}

[ENUNCIADO E TEXTO VISÍVEL]:
${context.questionText}

[FRAGMENTO HTML]:
${context.htmlSnippet}

[CONTROLES DISPONÍVEIS - Use estes targetIds para as ações]:
${JSON.stringify(
  context.controls.map((c) => ({
    id: c.id,
    tag: c.tag,
    type: c.type,
    label: c.label,
    name: c.name,
    value: c.value,
    options: c.options.length ? c.options : undefined,
    role: c.role,
  })),
  null,
  2,
)}

[IMAGENS ANEXADAS À QUESTÃO]: ${images.length}
Gere o plano em JSON estruturado com 'mode', 'confidence', 'summary', 'rationale', 'needsMoreContext', 'warnings' e 'actions'.`
}
