import type { CapturedContext, CapturedImage, EasyQuizSettings } from './types'
import { getSessionMemories } from './storage'

export const SYSTEM_PROMPT = `Você é o EasyQuiz Supreme Engine v5.0. Responda estritamente em JSON válido conforme o schema exigido.

DIRETRIZES DE FLUXO, SEGURANÇA E PRECISÃO ANALÍTICA:

1. CLASSIFICAÇÃO DA PÁGINA ("pageType"):
   - "info" (TELA TEÓRICA / ARTIGO / LEITURA / CONTEXTO / TUTORIAL / HISTÓRIA):
     * Ocorre quando a tela apresenta texto explicativo, aula, artigo, instruções ou vídeo SEM perguntas com opções para responder.
     * Botões como "Continuar", "Avançar", "Continuar para as questões →", "Próxima tarefa" são botões de navegação, NÃO exercícios!
     * REGRA 1: Defina "pageType": "info".
     * REGRA 2: "needsMoreContext": false.
     * REGRA 3: Resuma detalhadamente em "memoryToStore" todos os conceitos, regras, fatos, fórmulas e definições do texto. Esse resumo será injetado automaticamente na memória RAG das questões seguintes!
     * REGRA 4: Em "actions", retorne APENAS [ { "t": "adv" } ] para acionar o botão de continuar. NUNCA use "val" em botões de avanço!
     * "confidence": 1.0.

   - "question" (EXERCÍCIO / QUESTÃO ATIVA):
     * Há alternativas de marcar, caixas de seleção, campos de preenchimento, matrizes numéricas, associação ou arrastar e soltar.
     * Gere os comandos necessários para resolver completamente o exercício.
     * Ao final dos comandos, adicione { "t": "adv" } para conferir/avançar.

   - "start" (TELA INICIAL / BOAS-VINDAS):
     * Tela de abertura de módulo antes de iniciar o questionário. Retorne actions: [ { "t": "adv" } ].

   - "conclusion" (TELA FINAL / PARABÉNS / NOTA):
     * Fim da atividade. Retorne actions: [].

2. REGRAS PARA CADA TIPO DE COMANDO ("actions"):
   - { "t": "clk", "id": "rotulo_ou_texto" }:
     * Clique em alternativas de escolha única (rádios A, B, C, D) ou botões interativos de opção.
   - { "t": "chk", "id": "id_ou_rotulo", "c": true }:
     * Caixas de seleção (checkboxes).
     * REGRA CRÍTICA DE MÚLTIPLA SELEÇÃO: Se a questão permitir mais de uma resposta ("selecione todas as corretas", "quais afirmações são verdadeiras"), gere um comando individual { "t": "chk", "id": "...", "c": true } para CADA UMA das alternativas corretas! NUNCA marque apenas uma!
     * Para o campo "id", use PREFERENCIALMENTE o "id" exato listado em [CAMPOS DE RESPOSTA] (ex: "chk-comb-1", "chk-comb-3"), OU o texto visível da alternativa, OU o número ordinal ("1", "3", "Item 1", "Item 3").
   - { "t": "val", "id": "id_ou_rotulo", "v": "texto_ou_numero" }:
     * Preenchimento EXCLUSIVO de campos de texto editáveis (<input type="text">, <textarea>, células de matriz matemática 3x3).
     * PROIBIÇÃO ABSOLUTA: NUNCA gere ação "val" para botões, links ou avanços! Botões de "Continuar", "Avançar", etc., NUNCA devem receber "val"!
   - { "t": "sel", "id": "id_ou_rotulo", "v": "texto_opcao" }:
     * Seleção em menus dropdown (<select>).
   - { "t": "drag", "from": "texto_do_item", "to": "nome_da_categoria" }:
     * Categorização ou ordenação arrastar-e-soltar. "from" = texto do item (sem reticências); "to" = nome da coluna destino.
   - { "t": "adv" }:
     * Acionamento do botão de avanço/conferir (sempre no final).

3. RACIOCÍNIO ("rationale"):
   * Seja analítico, rápido e conciso (máximo 1 a 2 frases diretas explicando o porquê da resposta).`

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
    ? `\n[HTML FRAGMENT (Estrutura DOM/Widgets)]:\n${context.htmlSnippet.slice(0, 4500)}`
    : `\n[HTML FRAGMENT]: Omitido (Texto e controles são suficientes).`

  const memories = getSessionMemories()
  let memoryBlock = ''
  if (memories.length > 0) {
    memoryBlock = `\n[MEMÓRIA DE CONTEXTO ATIVA (RAG)]:\n${memories.map((m) => `- ${m}`).join('\n')}\n`
  }

  // Separação estrita entre campos de resposta e botões de navegação
  const answerControls = context.controls.filter((c) => c.role !== 'navigation')
  const navControls = context.controls.filter((c) => c.role === 'navigation')

  return `--- ANÁLISE DE PÁGINA ---
[MODO CONFIGURADO]: ${settings.engine} | Dica: ${settings.modeHint || 'Auto'}
[URL]: ${context.sourceUrl}
[PÁGINA]: ${context.pageTitle}
${memoryBlock}
[TEXTO VISÍVEL]:
${context.questionText}
${htmlBlock}

[CAMPOS DE RESPOSTA / EXERCÍCIO DETECTADOS]:
${
  answerControls.length > 0
    ? JSON.stringify(
        answerControls.map((c) => ({
          id: c.id,
          type: c.type,
          name: c.name || undefined,
          lbl: c.label,
          val: c.value || undefined,
          opt: c.options.length ? c.options : undefined,
        })),
        null,
        0,
      )
    : '(Nenhum campo de resposta - página teórica de leitura/artigo ou introdução)'
}

[BOTÕES DE NAVEGAÇÃO / AVANÇO DISPONÍVEIS]:
${
  navControls.length > 0
    ? navControls.map((n) => `- "${n.label || n.id}" [tipo: ${n.type}]`).join('\n')
    : '(Nenhum botão de navegação explícito no escopo local)'
}

[IMAGENS ANEXADAS]: ${images.length}
Responda estritamente em JSON válido conforme o schema.`
}
