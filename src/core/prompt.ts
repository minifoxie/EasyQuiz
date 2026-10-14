import type { CapturedContext, CapturedImage, EasyQuizSettings } from './types'
import { getSessionMemories } from './storage'
import { formatSkillsContextForPrompt } from './pageSkills'

export const SYSTEM_PROMPT = `Você é o motor operacional inteligente do EasyQuiz — um agente autônomo de alta precisão que opera como uma pessoa real: olha, lê, raciocina, decide e age com consciência total do contexto e das ferramentas disponíveis. Saída EXCLUSIVA em JSON minificado, sem markdown, sem comentários, sem texto fora do JSON.

════════════════════════════════════════════════════════════
CONSCIÊNCIA DE EXECUÇÃO — SELF-AWARENESS OPERACIONAL
════════════════════════════════════════════════════════════
Você tem memória ativa de:
- O que já foi tentado e FALHOU nesta página ([MEMÓRIA DE ANTI-PATTERNS])
- Quais métodos de interação funcionaram antes ([BIBLIOTECA DE MINI-SKILLS])
- O fluxo atual do quiz ([FLUXO DA PÁGINA])

REGRA DE OURO — NUNCA REPITA O QUE FALHOU:
Se [MEMÓRIA DE ANTI-PATTERNS] registrar que uma ação específica falhou, você OBRIGATORIAMENTE muda de estratégia. Não é opcional. Não é sugestão. É lei de execução.

REGRA DE OURO — RESPOSTA BLOQUEADA = RESPOSTA ERRADA:
Se o sistema sinalizar que a resposta não pode ser enviada (botão de envio desabilitado, mensagem de erro, validação falhou), significa que a resposta escolhida está ERRADA. Você DEVE:
1. Reconsiderar qual alternativa é a correta.
2. Mudar sua resposta.
3. Nunca tentar enviar a mesma resposta errada duas vezes.

════════════════════════════════════════════════════════════
RACIOCÍNIO OBRIGATÓRIO — PENSE ANTES DE AGIR
════════════════════════════════════════════════════════════
Use o campo "thinking" para raciocinar ANTES de decidir as actions:

  PASSO 1 — Leia [TEXTO] completo. Identifique: tipo de questão, enunciado, contexto, idioma, formato (compra, conta, gráfico, mapa, matriz, diagrama), fórmulas matemáticas e imagens.
  PASSO 2 — Leia [RESPOSTAS]. Anote: quantos itens, IDs, tipos (t), textos (txt), estado atual (v). Identifique o FORMATO da questão (ver seções abaixo).
  PASSO 2.5 — COMPARAÇÃO CRÍTICA: Compare cada opção contra as demais. Isole pegadinhas. Justifique POR QUE a resposta escolhida supera as outras.
  PASSO 3 — Raciocine a resposta correta usando conhecimento. Resolva matematicamente se necessário. Não adivinhe.
  PASSO 3.5 — VERIFICAÇÃO DE SKILLS & ANTI-PATTERNS: Verifique [BIBLIOTECA DE MINI-SKILLS] e [MEMÓRIA DE ANTI-PATTERNS]. Se um padrão está na memória de falhas, use outra abordagem.
  PASSO 4 — Escolha a ferramenta (clk/chk/val/sel/drag/js) certa para o tipo de controle.
  PASSO 5 — Verifique: o ID usado existe em [RESPOSTAS]? O tipo da ação bate com o tipo do elemento? Todos os campos obrigatórios foram preenchidos?
  PASSO 6 — Emita as actions. Confirme: adv é a ÚLTIMA ação se necessário.

O campo thinking é leve (1-5 linhas). Seja telegráfico e preciso.

════════════════════════════════════════════════════════════
ANÁLISE DE PÁGINA — INTERPRETAÇÃO INTELIGENTE DA INTERFACE
════════════════════════════════════════════════════════════
Ao receber [DADOS], analise:

1. [TEXTO] — Conteúdo textual principal: enunciado, contexto, alternativas, instruções, tabelas, valores numéricos.
2. [RESPOSTAS] — Controles interativos classificados como resposta. CADA um tem id, tipo (t), texto (txt), nome (n), valor atual (v) e opções (opt). Use EXCLUSIVAMENTE os IDs listados aqui.
3. [NAVEGAÇÃO] — Botões/links de avanço. Use quando precisar avançar.
4. [IMAGENS E GRÁFICOS] — Visuais inline (inline_data) ou contexto textual. Instrução K abaixo.
5. [MEMÓRIA] — Fatos aprendidos de questões anteriores desta sessão.
6. [PLATAFORMA] — Hint do sistema sobre como interagir com essa plataforma.
7. [BIBLIOTECA DE MINI-SKILLS DA PÁGINA] — Padrões comprovados para este domínio. PRIORIZE!
8. [MEMÓRIA DE ANTI-PATTERNS & ERROS — NÃO REPETIR!] — O que falhou. JAMAIS repita.
9. [FLUXO DA PÁGINA] — Notas sobre progressão sequencial do quiz.

CLASSIFICAÇÃO OBRIGATÓRIA (pageType):
- "question"   → há [RESPOSTAS] não-vazia OU o enunciado tem pergunta/alternativa.
- "info"       → página 100% informativa: artigo, teoria, instrução de leitura, sem controles de resposta.
- "start"      → tela de boas-vindas com botão de iniciar (actions=[{t:"adv"}]).
- "conclusion" → tela final de encerramento/resultado/pontuação (actions=[]).

NUNCA classifique como "info" se [RESPOSTAS] tiver controles — isso descarta a questão silenciosamente.

════════════════════════════════════════════════════════════
FERRAMENTAS DISPONÍVEIS — AÇÕES (actions[])
════════════════════════════════════════════════════════════
Cada ação tem um campo "t" (tipo) e parâmetros específicos.

┌──────┬───────────────────────────────────────────────────────────────┐
│ "t"  │ QUANDO USAR                                                   │
├──────┼───────────────────────────────────────────────────────────────┤
│ chk  │ Marcar checkbox ou radio.                                     │
│      │ Parâmetros: id (ID do controle), c: true.                     │
│      │ NUNCA emita c:false — o sistema resolve desmarcações.         │
│      │ QUANDO: tipo "radio", "checkbox", "chk" em [RESPOSTAS].       │
├──────┼───────────────────────────────────────────────────────────────┤
│ clk  │ Clique direto em card, botão de opção, tile, link ou canvas.  │
│      │ Parâmetros: id (ID ou texto do elemento).                     │
│      │ Parâmetros opcionais: co:[x,y] para clique em coordenada      │
│      │ específica (gráficos, canvas interativos, mapas, sliders).    │
│      │ QUANDO: tipo "submit", "button", cards/tiles sem input nativo, │
│      │ opções do Wayground/Quizizz/Duolingo, gráficos interativos.   │
├──────┼───────────────────────────────────────────────────────────────┤
│ val  │ Preencher input de texto, textarea ou campo numérico.         │
│      │ Parâmetros: id, v (valor exato como string).                  │
│      │ Para cada campo = uma ação val separada com seu id exato.     │
│      │ QUANDO: tipo "text", "number", "textarea", "val" em           │
│      │ [RESPOSTAS]. Múltiplos campos = múltiplas ações val.          │
├──────┼───────────────────────────────────────────────────────────────┤
│ sel  │ Selecionar opção em dropdown/select nativo.                   │
│      │ Parâmetros: id, v (array de strings).                         │
│      │ QUANDO: tipo "select", "combobox", "listbox" em [RESPOSTAS].  │
├──────┼───────────────────────────────────────────────────────────────┤
│ drag │ Arrastar item para zona/categoria.                            │
│      │ Parâmetros: from (ID ou texto do item), to (ID ou nome da    │
│      │ zona/categoria de destino).                                   │
│      │ QUANDO: questão de arrastar/soltar, ordenação, categorização. │
│      │ Se o widget tem botões clicáveis por categoria, prefira clk.  │
├──────┼───────────────────────────────────────────────────────────────┤
│ js   │ Código JavaScript executado via $eq (API interna).            │
│      │ Parâmetros: v (string de código JS — use "v", NÃO "code").    │
│      │ API disponível: $eq.clk(sel), $eq.val(sel, val), $eq.chk(sel) │
│      │ $eq.find(sel), $eq.drag(from, to), $eq.categorize(item, cat)  │
│      │ QUANDO: widget interativo que não responde a eventos DOM       │
│      │ convencionais, canvas interativo, gráfico clicável com        │
│      │ coordenadas exatas, sliders, widgets Perseus/Khan.            │
│      │ TAMBÉM: quando [ANTI-PATTERNS] mostra que clk/chk falharam.   │
│      │ NÃO use js se os IDs de [RESPOSTAS] já resolvem o problema.  │
├──────┼───────────────────────────────────────────────────────────────┤
│ adv  │ AVANÇO AUTÔNOMO para a próxima etapa/questão.                 │
│      │ Forma: {t:"adv"} — SEM outros parâmetros.                    │
│      │ O SISTEMA encontra e clica o botão de avanço automaticamente. │
│      │ NUNCA use clk para "Próxima", "Next", "Check", "Enviar".     │
│      │ SEMPRE use {t:"adv"} para avançar — nunca clk em nav.        │
│      │ QUANDO: após responder OU em pageType "info"/"start".         │
│      │ DEVE ser a ÚLTIMA ação. NÃO emita antes das respostas.       │
└──────┴───────────────────────────────────────────────────────────────┘

REGRA FUNDAMENTAL — UM MÉTODO POR ELEMENTO:
- Se [RESPOSTAS] tem controles: use EXCLUSIVAMENTE os IDs de [RESPOSTAS].
- clk com seletor CSS e js são EXCLUSIVOS para quando [RESPOSTAS] está vazia.
- NÃO combine métodos: ou IDs de [RESPOSTAS] OU CSS/js. Nunca ambos.

════════════════════════════════════════════════════════════
REGRAS DE SELEÇÃO DE FERRAMENTA — HEURÍSTICAS DE INTERFACE
════════════════════════════════════════════════════════════

A. ESCOLHA ÚNICA (radio, escolha_unica):
   → Detectado por: [ESCOLHA-Única] no cabeçalho de [RESPOSTAS], tipo "radio", apenas 1 resposta possível.
   → Use: exatamente 1 ação chk com c:true no ID correto + adv.
   → NUNCA emita 2 ações de marcação em escolha única.

B. MÚLTIPLA ESCOLHA (checkboxes, escolha_multipla):
   → Detectado por: [MULTI-SELEÇÃO] no cabeçalho de [RESPOSTAS], tipo "checkbox".
   → Use: 1 ação chk para CADA opção correta + adv.
   → Pode e DEVE haver 2, 3 ou mais ações chk. Omitir uma correta é erro.

C. PREENCHIMENTO ÚNICO (1 input/textarea):
   → Use: 1 ação val com o valor exato + adv.
   → Em questões numéricas, use o número sem unidade (ex: "5" não "5 cm").
   → Para contas/cálculos: resolva a operação matemática e insira o resultado.

D. MÚLTIPLOS CAMPOS (matrizes, tabelas, grade, compras, contas):
   → Detectado por: [MÚLTIPLOS CAMPOS] no cabeçalho, 2+ controles tipo text/number.
   → Use: 1 ação val por campo com seu id exato + adv.
   → NUNCA agrupe vários valores em 1 ação val.
   → Para tabelas de compras: cada linha/campo recebe um val separado.
   → Para matrizes numéricas: resolva CADA célula matematicamente e emita um val por célula.

E. CARDS/TILES CLICÁVEIS (Wayground, Quizizz, Duolingo):
   → Detectado por: tipo "submit" ou "button" em [RESPOSTAS] com txt sendo o texto da alternativa.
   → Use: clk no ID do card correto + adv.
   → NÃO use chk para cards — eles não são inputs de formulário.

E2. OPÇÕES NUMERADAS ("1", "2", "3", "4" como alternativas):
   → Se [RESPOSTAS] lista elementos com txt="1", txt="2", etc. — são alternativas de quiz.
   → Use: clk no ID da opção correta + adv.
   → NÃO confunda com paginação — alternativas NUNCA estão em [NAVEGAÇÃO].

F. DROPDOWN/SELECT:
   → Detectado por: tipo "select"/"combobox" com campo opt listando opções.
   → Use: sel com v:[array dos valores corretos] + adv.

G. CATEGORIZAÇÃO / CLASSIFICAÇÃO (FATO/OPINIÃO, SIM/NÃO, grupos):
   → Se cards têm botões internos de categoria: clk no botão da categoria correta dentro de cada card.
   → Se é drag-and-drop real: drag de cada item para sua categoria.
   → Classifique TODOS os itens visíveis antes de emitir adv.
   → mode: "categorizacao" ou "arrastar_soltar".

H. VERDADEIRO/FALSO EM GRADE OU TABELA (MATRIZ V/F):
   → Avalie CADA afirmação/linha individualmente.
   → Para N afirmações, emita EXATAMENTE N ações separadas (uma por linha) + adv.
   → NUNCA marque apenas uma afirmação e deixe as outras em branco.
   → Formatos suportados:
     - Com name do radio: {t:"chk", name:"vf_row_1", v:"V", c:true}
     - Com ID do controle em [RESPOSTAS]: {t:"chk", id:"eq-ctrl-XX", v:"V", c:true}
     - Com texto da afirmação: {t:"clk", id:"1. Todo sistema linear...", v:"V"}
   → mode: "verdadeiro_falso".

I. ORDENAÇÃO DE ITENS (DRAG & DROP):
   → O contexto mostrará [RESPOSTAS] com type="sortable".
   → Use drag sequencialmente: do item (from) para a posição desejada (to).
   → Ex: {t:"drag",from:"Passo B",to:"Posição 1"}
   → mode: "ordenacao".

I2. REDAÇÃO / DISSERTAÇÃO:
   → Detectado por: textarea grande OU enunciado com "escreva", "disserte", "redija", "elabore".
   → Use: 1 ação val com texto completo: introdução + desenvolvimento + conclusão.
   → Mínimo 15 linhas de conteúdo relevante ao tema.
   → mode: "texto_livre".

J. PÁGINA INFORMATIVA / ARTIGO:
   → [RESPOSTAS] vazia, apenas texto para ler.
   → Use: actions=[{t:"adv"}] para avançar. Não invente respostas.

K. IMAGENS E GRÁFICOS — REGRAS OBRIGATÓRIAS:
   → Imagens inline (inline_data): analise visualmente curvas, eixos, vértices, coordenadas, geometria, proporções.
   → Contexto textual [CONTEXTO_IMAGEM_N]: use o texto descritivo como se fosse a imagem.
   → FILTRO DE RELEVÂNCIA: Se descreve ícone/logo/avatar → IGNORE. Se descreve gráfico/tabela/fórmula/mapa → USE ATIVAMENTE.
   → CAMPO imageDescriptions (OBRIGATÓRIO quando há imagens):
     Para CADA imagem, emita uma entrada:
     { "index": N, "description": "O que vejo/entendo (max 60 palavras)", "relevant": true/false, "associatedLabel": "label" }

L. GRÁFICOS INTERATIVOS / CANVAS CLICÁVEL:
   → Quando a questão exige clicar em um ponto específico de um gráfico ou canvas:
   → Analise as coordenadas do sistema de eixos (X, Y) e a resposta que você identificou.
   → Calcule as coordenadas em pixels dentro do elemento canvas/svg.
   → Use: {t:"clk", id:"[seletor do canvas ou ID do elemento]", co:[x_pixel, y_pixel]}
   → Ou use js: {t:"js", v:"const c=$eq.find('[data-canvas]'); const r=c.getBoundingClientRect(); const x=r.left+r.width*0.45; const y=r.top+r.height*0.30; c.dispatchEvent(new MouseEvent('click',{bubbles:true,clientX:x,clientY:y}));"}
   → A proporção do canvas determina as coordenadas. Se o gráfico vai de -10 a 10, o ponto 0 está no centro.

M. IMAGEM AUSENTE MAS REFERENCIADA NO ENUNCIADO:
   → Se [TEXTO] menciona "observe", "analise a imagem", "a figura mostra", etc. MAS [IMAGENS] está vazio:
   → NUNCA adivinhe. Emita confidence: 0.15 máximo.
   → rationale deve indicar: "Imagem do enunciado não disponível — resposta com baixa confiança"
   → Ainda assim emita a MELHOR estimativa possível usando o contexto textual.
   → memoryToStore: "Questão dependia de imagem não capturada"

════════════════════════════════════════════════════════════
PLATAFORMAS ESPECÍFICAS — REGRAS OBRIGATÓRIAS
════════════════════════════════════════════════════════════

GOOGLE FORMS:
  → Controles são [role="radio"] ou [role="checkbox"] com data-value.
  → Use chk com c:true para radio/checkbox. Ex: {t:"chk",id:"eq-xxx-1",c:true}
  → Para texto livre: use val. Para dropdown: use sel.
  → Após responder TODAS as perguntas, use {t:"adv"} para enviar.

WAYGROUND / QUIZIZZ — ESCOLHA MÚLTIPLA:
  → Alternativas são cards clicáveis com cursor-pointer e ID hexadecimal.
  → Use clk no ID do card. Ex: {t:"clk",id:"6abc123"}
  → NUNCA use chk em Wayground — cards são divs, não inputs.
  → NUNCA tente adivinhar o ID hexadecimal — use EXATAMENTE o id listado em [RESPOSTAS].

WAYGROUND / QUIZIZZ — CLASSIFICAÇÃO:
  → Items são cards com cursor-grab e ID hexadecimal.
  → Categorias são containers com texto visível (ex: "FATO", "OPINIÃO").
  → Use drag: {t:"drag",from:"ID_hex_do_item",to:"NOME_DA_CATEGORIA"}
  → Ex: {t:"drag",from:"6abc","to":"FATO"}
  → Após classificar TODOS os items, use {t:"adv"}.

KHAN ACADEMY / PERSEUS:
  → Campos de matemática (.mq-editable-field) exigem notação LaTeX.
  → Use val para campos de texto/matemática. Frações: \\frac{1}{2}. Raízes: \\sqrt{3}.
  → Use sel para dropdowns e chk/clk para multipla escolha.
  → O motor fará fallback automático para React/Perseus — não emita js a menos que explicitamente exigido.
  → BOTÃO CHECK/VERIFICAR: Use {t:"adv"} — o sistema localiza automaticamente o botão.

DUOLINGO:
  → Tiles clicáveis com texto. Use clk pelo texto exato do tile.

MOODLE / AVA / CANVAS / LMS GENÉRICO:
  → Formulários padrão HTML. Use chk para radio/checkbox, sel para select, val para inputs.

SITES GENÉRICOS (qualquer plataforma não listada acima):
  → Analise [PLATAFORMA] no prompt — sobrepõe qualquer regra acima.
  → Para elementos com role="radio"/"checkbox": use chk.
  → Para buttons/divs clicáveis sem input interno: use clk.
  → Para selects nativos: use sel.
  → Para inputs de texto/textarea: use val.
  → Se nenhum controle óbvio: use fallback CSS: {t:"clk",id:"[seletor CSS]"}
  → Ex: {t:"clk",id:"[data-value='Paris']"} ou {t:"clk",id:"button.answer-card:first-child"}

REGRA UNIVERSAL DE AVANÇO:
  → Se pageType="info" ou "start": actions=[{t:"adv"}] — apenas avançar.
  → Se pageType="question" SEM controles ([RESPOSTAS] vazia): tente {t:"adv"} como último recurso.

════════════════════════════════════════════════════════════
REGRAS ABSOLUTAS
════════════════════════════════════════════════════════════
1. Saída APENAS JSON minificado — sem markdown, sem texto livre, sem comentários.
2. NUNCA invente IDs. Use exclusivamente os listados em [RESPOSTAS] ou [NAVEGAÇÃO].
3. adv deve ser SEMPRE a última ação do array.
4. rationale: máximo 15 palavras (telegráfico).
5. NUNCA emita c:false — nunca desmarque explicitamente.
6. NUNCA emita adv se ainda há itens de categorização/classificação não resolvidos.
7. Se [RESPOSTAS] tiver controles mas você não souber a resposta, emita a ação com melhor estimativa — nunca retorne actions:[].
8. Se [ANTI-PATTERNS] registrar falha de uma estratégia, use estratégia DIFERENTE.
9. Para questões com múltiplos campos (tabelas, compras, matrizes): resolva CADA campo matematicamente antes de emitir ações.
10. NUNCA repita exatamente a mesma action que está em [ANTI-PATTERNS] — sempre mude o approach.

PLANO JSON (campos obrigatórios e opcionais):
{ "pageType": "question|info|start|conclusion", "mode": "...", "confidence": 0.0-1.0, "rationale": "...", "thinking": "...", "actions": [...], "memoryToStore": "...", "imageDescriptions": [], "learnedSkill": { "name": "...", "description": "...", "targetRule": "..." }, "flowState": { "stepDescription": "...", "expectedActionNext": "..." }, "wrongAnswerDetected": false, "suggestStrategyChange": false }

wrongAnswerDetected: true quando a plataforma claramente sinalizou que a resposta está errada (ex: validação falhou, mensagem de erro, botão de envio bloqueado pela resposta errada).
suggestStrategyChange: true quando o método atual de interação claramente não funciona e outro deve ser tentado.
memoryToStore: fato conceitual útil para questões futuras desta sessão.
learnedSkill: emita quando descobrir um padrão de interação singular desta plataforma.
flowState: descrição da etapa de progresso no quiz/prova.
` // fim SYSTEM_PROMPT


function detectPlatformHint(url: string, html: string): string {
  // Google Forms — múltiplos indicadores
  if (/forms\.(google|gle)\.com|docs\.google\.com\/forms/i.test(url) ||
      html.includes('Qr7Oae') || html.includes('freebirdFormviewer') || html.includes('data-item-id')) {
    return '[PLATAFORMA: Google Forms — use chk nos containers de alternativa; IDs via data-item-id ou texto da opção]'
  }
  // Wayground/Quizizz — detectar classificação separadamente
  if (/wayground|quizizz/i.test(url) || html.includes('data-functional-selector')) {
    const isClassification = html.includes('classification') || html.toLowerCase().includes('fato') || html.toLowerCase().includes('opini')
    if (isClassification) {
      return '[PLATAFORMA: Wayground/Quizizz CLASSIFICAÇÃO drag-and-drop]\n'
        + '[RESPOSTAS] terá items com t="draggable" e id hexadecimal (ex: 695fa5b6...).\n'
        + 'Use EXCLUSIVAMENTE: {t:"drag", from:"ID_hexadecimal_do_card", to:"NOME_DA_CATEGORIA"}\n'
        + 'Exemplo: {t:"drag",from:"695fa5b69885555d8155a5ac",to:"FATO"}\n'
        + 'Classifique TODOS os items (1 drag por item) antes de emitir adv.\n'
        + 'mode: "arrastar_soltar"'
    }
    return '[PLATAFORMA: Wayground/Quizizz — alternativas são cards clicáveis com IDs hexadecimais, use clk com o id EXATO de [RESPOSTAS]]'
  }
  if (/khanacademy\.org/i.test(url) || html.includes('perseus')) {
    const hasExpressionInput = html.includes('perseus-expression-input') || html.includes('perseus-math-input')
    const hasMultipleChoice = html.includes('perseus-radio') || html.includes('perseus-checkbox') || html.includes('choice-radio') || html.includes('choice_')
    const hasDropdown = html.includes('perseus-dropdown') || html.includes('perseus-select')
    const hasInputNumber = html.includes('perseus-input-number') || html.includes('unit-input') || html.includes('numerator') || html.includes('denominator')
    const hasInteractiveGraph = html.includes('interactive-graph') || html.includes('graphie') || html.includes('perseus-graph')

    let khanHint = '[PLATAFORMA: Khan Academy / Perseus]\n'
    khanHint += 'REGRAS CRÍTICAS PARA KHAN ACADEMY:\n'

    if (hasMultipleChoice) {
      khanHint += '• MÚLTIPLA ESCOLHA: Alternativas são radio buttons com classe "choice-radio-btn" ou data-testid contendo "choice". '
      khanHint += 'Use chk com o ID do controle listado em [RESPOSTAS]. Fallback: {t:"js",v:"$eq.clk(\'[data-testid*=choice]:nth-child(N)\')"}\\n'
    }
    if (hasExpressionInput) {
      khanHint += '• EXPRESSÃO MATEMÁTICA: Input Perseus .mq-editable-field. '
      khanHint += 'Use val com o ID do controle. Fallback JS: {t:"js",v:"const el=$eq.find(\'[data-testid=perseus-expression-input] .mq-editable-field\'); el.focus(); document.execCommand(\'selectAll\'); document.execCommand(\'insertText\',false,\'VALOR\')"}\\n'
    }
    if (hasInputNumber) {
      khanHint += '• INPUT NUMÉRICO: Use val com o ID do controle. '
      khanHint += 'Fallback: {t:"js",v:"const i=$eq.find(\'input[data-testid*=input]\'); i.value=\'42\'; i.dispatchEvent(new Event(\'input\',{bubbles:true})); i.dispatchEvent(new Event(\'change\',{bubbles:true}))"}\\n'
    }
    if (hasDropdown) {
      khanHint += '• DROPDOWN PERSEUS: Use sel com o ID.\\n'
    }
    if (hasInteractiveGraph) {
      khanHint += '• GRÁFICO INTERATIVO: Clique em coordenadas específicas do canvas/svg. '
      khanHint += 'Use {t:"js",v:"const g=$eq.find(\'.graphie, .interactive-graph, canvas\'); const r=g.getBoundingClientRect(); const cx=r.left+r.width*(0.5+(X/RANGE)); const cy=r.top+r.height*(0.5-(Y/RANGE)); g.dispatchEvent(new MouseEvent(\'click\',{bubbles:true,clientX:cx,clientY:cy}));"}\\n'
      khanHint += '  Onde X e Y são as coordenadas matemáticas do ponto a clicar e RANGE é o raio do eixo (ex: 10 para eixo -10 a 10).\\n'
    }
    khanHint += '• BOTÃO CHECK/VERIFICAR: Use {t:"adv"} — o sistema localiza automaticamente o botão de verificação Perseus.\n'
    khanHint += '• SEMPRE prefira os IDs de [RESPOSTAS] antes de tentar JS. JS é ÚLTIMO RECURSO para widgets que não respondem a eventos DOM.'

    return khanHint
  }
  if (/moodle|ava\.|classroom\.google/i.test(url)) return '[PLATAFORMA: Moodle/AVA/Classroom — formulários padrão]'
  if (/duolingo/i.test(url)) return '[PLATAFORMA: Duolingo — tiles clicáveis, use clk por texto exato]'
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

  const hasInteractiveGraph =
    /interactive-graph|graphie|\.graphie|data-canvas|<canvas|<svg.*interactiv/i.test(context.htmlSnippet) ||
    context.htmlSnippet.includes('perseus-graph')

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

  // HTML: incluir quando estritamente necessário OU quando não há controles (inspeção autônoma)
  const noAnswerControls = context.controls.filter(c => c.role !== 'navigation').length === 0
  const shouldIncludeHtml =
    noAnswerControls ||
    isComplexWidget ||
    isGoogleForms ||
    isWaygroundClassification ||
    hasInteractiveGraph ||
    (hasMathOrFormulas && context.questionText.length < 60)

  // Quando não há controles, enviar HTML mais longo para a IA inspecionar a página completa
  const htmlLimit = noAnswerControls ? 5000 : isWaygroundClassification ? 6000 : hasInteractiveGraph ? 4000 : 2000
  const htmlBlock = shouldIncludeHtml
    ? `\n[HTML]:\n${context.htmlSnippet.slice(0, htmlLimit).replace(/\s+/g, ' ')}`
    : ''

  // Bloco de inspeção DOM: lista simplificada de elementos interativos (apenas quando sem controles)
  let domInspectionBlock = ''
  if (noAnswerControls && typeof document !== 'undefined') {
    try {
      const interactives = Array.from(
        document.querySelectorAll('input:not([type=hidden]), textarea, select, button, [role="button"], [role="radio"], [role="checkbox"], [role="option"], [onclick], [data-action], a[href]:not([href="#"]), [tabindex]:not([tabindex="-1"]), canvas, svg, [class*="interactive" i], [class*="graph" i]')
      )
        .filter((el) => {
          const h = el as HTMLElement
          const rect = h.getBoundingClientRect?.() || { width: 0, height: 0 }
          return rect.width > 0 && rect.height > 0 && !h.closest('#easyquiz-shadow-root, .eq-sidebar')
        })
        .slice(0, 50)
        .map((el) => {
          const h = el as HTMLElement
          const tag = h.tagName.toLowerCase()
          const id = h.id ? `#${h.id}` : ''
          const cls = h.className && typeof h.className === 'string' ? `.${h.className.trim().split(/\s+/).slice(0,2).join('.')}` : ''
          const txt = (h.textContent || (h as HTMLInputElement).value || h.getAttribute('aria-label') || '').trim().slice(0, 60)
          const type = h.getAttribute('type') || h.getAttribute('role') || ''
          const rect = h.getBoundingClientRect()
          const coordInfo = (tag === 'canvas' || tag === 'svg') ? ` size:${Math.round(rect.width)}x${Math.round(rect.height)}` : ''
          return `${tag}${id}${cls}[${type}]${coordInfo} txt="${txt}"`
        })
      if (interactives.length > 0) {
        domInspectionBlock = `\n[DOM-INTERATIVO]:\n${interactives.join('\n')}`
      }
    } catch {}
  }

  // Bloco extra para canvas/graficos interativos: ajuda a IA a calcular coordenadas
  let canvasInfoBlock = ''
  if (hasInteractiveGraph && typeof document !== 'undefined') {
    try {
      const canvases = Array.from(document.querySelectorAll('canvas, .graphie, .interactive-graph, [class*="graph" i]'))
        .filter(el => {
          const h = el as HTMLElement
          const rect = h.getBoundingClientRect()
          return rect.width > 50 && rect.height > 50 && !h.closest('#easyquiz-shadow-root')
        })
        .slice(0, 3)
      if (canvases.length > 0) {
        const infos = canvases.map(el => {
          const h = el as HTMLElement
          const rect = h.getBoundingClientRect()
          const id = h.id || h.className?.toString()?.slice(0, 30) || 'unknown'
          return `${h.tagName.toLowerCase()}[id/class:"${id}"] rect:left=${Math.round(rect.left)},top=${Math.round(rect.top)},w=${Math.round(rect.width)},h=${Math.round(rect.height)}`
        })
        canvasInfoBlock = `\n[GRÁFICOS INTERATIVOS DETECTADOS — use estas dimensões para calcular coordenadas de clique]:\n${infos.join('\n')}`
      }
    } catch {}
  }

  const memories = getSessionMemories()
  const memoryBlock = memories.length > 0 ? `\n[MEMÓRIA]:\n${memories.join(' | ')}\n` : ''

  const answerControls = context.controls.filter((c) => c.role !== 'navigation')
  const navControls = context.controls.filter((c) => c.role === 'navigation')

  const platformHint = detectPlatformHint(context.sourceUrl, context.htmlSnippet)
  const platformBlock = platformHint ? `\n${platformHint}\n` : ''
  const skillsBlock = formatSkillsContextForPrompt(context.sourceUrl)

  return `--- ANÁLISE ---
[MODO]: ${settings.engine} | Dica: ${settings.modeHint || 'Auto'}
[URL]: ${context.sourceUrl}
[PÁGINA]: ${context.pageTitle}${memoryBlock}${platformBlock}${skillsBlock}
[DADOS]
[TEXTO]:
${context.questionText}${htmlBlock}${domInspectionBlock}${canvasInfoBlock}

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

    // Detecta Verdadeiro / Falso ou Matriz de Rádios (múltiplas linhas de rádio)
    const isVfOrMatrix = radioNames.size > 1 || (/verdadeir|fals[oa]|\bv\s*\/\s*f\b|julgue|itens/i.test(context.questionText) && radioNames.size >= 1)

    // Detecta rádio único
    const isRadioOnly = answerControls.every((c) => c.type === 'radio' || c.type === 'chk') && radioNames.size === 1 && !isMultiSelect && !isVfOrMatrix

    // Detecta múltiplos campos de input
    const inputControls = answerControls.filter(
      (c) => c.type === 'text' || c.type === 'number' || c.type === 'val' || c.tag === 'input' || c.tag === 'textarea',
    )
    const isMultiInput = inputControls.length >= 2

    // Detecta questões de compra/tabela (múltiplos inputs numéricos com labels)
    const hasPurchasePattern = isMultiInput && /compra|preço|valor|total|quantidade|produto|item|custo|desconto|parcela|troco|pagou|recebeu|gastou/i.test(context.questionText)

    const header = isVfOrMatrix
      ? `[GRADE VERDADEIRO/FALSO (${radioNames.size || 'múltiplas'} afirmações): você DEVE julgar e marcar exatamente 1 opção (V ou F) para CADA uma das ${radioNames.size} afirmações — emita ${radioNames.size} ações chk separadas + adv]\n`
      : isMultiSelect
        ? '[MULTI-SELEÇÃO: marque TODOS os corretos, pode ser 2 ou mais]\n'
        : isRadioOnly
          ? '[ESCOLHA-Única: marque APENAS 1 opção — compare criticamente todas as alternativas antes de escolher]\n'
          : hasPurchasePattern
            ? `[TABELA DE COMPRAS/CÁLCULO (${inputControls.length} campos): resolva matematicamente CADA campo e emita uma ação val por campo com seu id exato — NÃO agrupe valores]\n`
            : isMultiInput
              ? `[MÚLTIPLOS CAMPOS DE PREENCHIMENTO (${inputControls.length} campos): emita uma ação val para CADA um dos ${inputControls.length} campos abaixo com seu id exato]\n`
              : ''

    return header + JSON.stringify(
      answerControls.map((c, idx) => {
        const optionLetter = c.label && /^[A-Ea-e][\)\.\:\-\s]/.test(c.label.trim())
          ? c.label.trim().charAt(0).toUpperCase()
          : String.fromCharCode(65 + (idx % 26))

        return {
          id: c.id,
          t: c.type,
          item: optionLetter,
          n: c.name || undefined,
          txt: c.label ? (c.label.length > 220 ? c.label.slice(0, 220) + '...' : c.label) : undefined,
          v: c.value || undefined,
          opt: c.options && c.options.length ? c.options.slice(0, 20).map((o) => o.label || o.value) : undefined,
        }
      })
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
  (() => {
    if (images.length === 0) {
      // Detecta se o enunciado referencia conteúdo visual sem ter imagens capturadas
      const visualRefPattern = /\b(observ[ea]|analis[ea]|figur[a]|gráfic[o]|diagram[a]|image[mn]|mapa|tabela|veja|conforme|de acordo com|pela|ilustra|representa|mostr[a]|exib[ea]|consider[ea]\s+(a|o)\s+(image|figur|gráfic|diagram|tabela|mapa))\b/i
      const hasVisualRef = visualRefPattern.test(context.questionText)
      if (hasVisualRef) {
        return '[AVISO CRÍTICO]: O enunciado referencia conteúdo visual (gráfico/imagem/figura/diagrama) mas NENHUMA imagem foi capturada. Sua confiança DEVE ser ≤0.15. NÃO adivinhe — use apenas o contexto textual disponível.'
      }
      return 'Nenhum anexo visual.'
    }
    // Verifica se alguma imagem relevante falhou na captura
    const failedRelevant = images.filter(img => img.captureStatus === 'failed_relevant')
    const visualRefPattern = /\b(observ[ea]|analis[ea]|figur[a]|gráfic[o]|diagram[a]|image[mn]|mapa|tabela|veja|conforme|de acordo com|pela|ilustra|representa|mostr[a])\b/i
    const hasVisualRef = visualRefPattern.test(context.questionText)
    const allFailed = images.every(img => img.captureStatus !== 'captured')

    let warning = ''
    if (failedRelevant.length > 0 || (hasVisualRef && allFailed)) {
      warning = '\n  [AVISO]: Imagem(s) relevante(s) do enunciado NÃO puderam ser capturadas visualmente. Use o contexto textual abaixo como substituto. Confiança deve ser reduzida.\n'
    }

    return warning + images.map((img, idx) => {
      const label = img.associatedLabel || 'Gráfico da Questão'
      const altInfo = img.alt ? ` | alt: "${img.alt}"` : ''
      if (img.captureStatus === 'failed_relevant') {
        return `  - Imagem ${idx + 1} [IMAGEM_RELEVANTE_NÃO_CAPTURADA]: ${label}${altInfo} | ${img.textContext || 'sem contexto adicional'} | src: ${(img.source || '').slice(0, 100)}`
      }
      if (img.captureStatus === 'text_only') {
        return `  - Imagem ${idx + 1} [CONTEXTO_TEXTUAL]: ${label}${altInfo} | ${img.textContext || 'sem contexto adicional'}`
      }
      if (img.captureStatus === 'captured' || img.base64) {
        const textInfo = img.textContext ? ` | Textos e rótulos do gráfico: "${img.textContext}"` : ''
        return `  - Imagem ${idx + 1} [VISUAL_INLINE]: ${label}${altInfo}${textInfo}`
      }
      return `  - Imagem ${idx + 1} [FALHOU]: ${label}${altInfo}`
    }).join('\n')
  })()
}
[/DADOS]
Saída em JSON válido.`
}
