/* EasyQuiz Discreto v1.0.0 — Modo Stealth sem interface
 * 100% Client-side. Direct Google Gemini REST API.
 */
"use strict";(()=>{var le={apiKey:"",apiKeys:[],model:"gemini-3.5-flash-lite",uiMode:"easy",modeHint:"",engine:"smart",dryRun:!1,autoApply:!0,autoAdvance:!1,hostDarkMode:!0,useVision:!1,confidenceThreshold:.8};function ne(n){if(!n||typeof n!="string")return!1;let e=n.toLowerCase().trim().replace(/^models\//,"");if(!e.includes("gemini"))return!1;let t=["imagen","image","veo","omni","video","embedding","embed","tts","audio","speech","voice","sound","live","transcribe","bidi","aqa","learnlm","deep-research","computer-use","robotics","rt-1","rt-2","mediapipe","cyber","latest","-ultra","experimental"];for(let o of t)if(e.includes(o))return!1;return!(!e.includes("flash")&&!e.includes("pro"))}var pt="easyquiz_settings_v2",ct="easyquiz_activity_metrics";function oe(){try{let n=localStorage.getItem(pt);if(!n){let s=localStorage.getItem("easyquiz_settings_v1");if(s){let r=JSON.parse(s);return{...le,apiKey:r.apiKey||""}}return{...le}}let e=JSON.parse(n),t=typeof e.model=="string"&&ne(e.model)?e.model:le.model,o=Array.isArray(e.apiKeys)?e.apiKeys.map(s=>typeof s=="string"?s.trim().replace(/^["']|["']$/g,""):"").filter(s=>s.length>5):[],i=typeof e.apiKey=="string"?e.apiKey.trim().replace(/^["']|["']$/g,""):"";return o.length===0&&i&&(o=[i]),{apiKey:o[0]||i||le.apiKey,apiKeys:o,model:t,uiMode:e.uiMode==="easy"||e.uiMode==="advanced"?e.uiMode:le.uiMode,modeHint:e.modeHint??"",engine:e.engine??"smart",dryRun:!!e.dryRun,autoApply:e.autoApply!==void 0?!!e.autoApply:!0,autoAdvance:!!e.autoAdvance,hostDarkMode:e.hostDarkMode!==void 0?!!e.hostDarkMode:!0,useVision:!!e.useVision,confidenceThreshold:typeof e.confidenceThreshold=="number"?e.confidenceThreshold:le.confidenceThreshold}}catch{return{...le}}}function Re(n){try{let e=localStorage.getItem("eq_domain_cache_"+n);if(!e)return{};let t=JSON.parse(e);if(t.advanceSelector&&/inject|injetar/i.test(t.advanceSelector)){t.advanceSelector=void 0;try{localStorage.removeItem("eq_domain_cache_"+n)}catch{}}return t}catch{return{}}}function Ne(n,e){if(e.advanceSelector&&/inject|injetar/i.test(e.advanceSelector))return;let o={...Re(n),...e};try{localStorage.setItem("eq_domain_cache_"+n,JSON.stringify(o))}catch(i){console.warn("[EasyQuiz] Erro cache de dominio:",i)}}function he(n){let e=oe(),t=Array.isArray(n.apiKeys)?n.apiKeys.map(a=>typeof a=="string"?a.trim().replace(/^["']|["']$/g,""):"").filter(a=>a.length>5):e.apiKeys,o;typeof n.apiKey=="string"?o=n.apiKey.trim().replace(/^["']|["']$/g,""):Array.isArray(n.apiKeys)&&n.apiKeys.length>0?o=t[0]||"":o=e.apiKey,o&&!t.includes(o)&&(t=[o,...t]),t.length>0&&(!o||!t.includes(o))&&(o=t[0]);let i={...e,...n,apiKey:o,apiKeys:t};try{localStorage.setItem(pt,JSON.stringify(i))}catch(a){console.warn("[EasyQuiz] Falha ao persistir configura\xE7\xF5es no localStorage:",a)}return i}var ce=[],dt=12,Rt=1200;function mt(n){let e=n.trim().replace(/\s+/g," ").slice(0,Rt);e&&!ce.includes(e)&&(ce.push(e),ce.length>dt&&(ce=ce.slice(-dt)))}function ft(){return ce}function ht(){return{startTime:Date.now(),totalElapsedMs:0,completedQuestionsCount:0,averageDurationMs:0,records:[]}}var ut=ht();function gt(){ut=ht();try{sessionStorage.removeItem(ct),localStorage.removeItem(ct)}catch{}return ut}var ve=`Voc\xEA \xE9 o motor operacional inteligente do EasyQuiz. Sa\xEDda EXCLUSIVA em JSON minificado, sem markdown, sem coment\xE1rios, sem texto fora do JSON.

\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
RACIOC\xCDNIO OBRIGAT\xD3RIO \u2014 PENSE ANTES DE AGIR
\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
Use o campo "thinking" do JSON para raciocinar de forma CALMA e ESTRUTURADA antes de decidir as actions.
O campo "thinking" \xE9 escrito ANTES das "actions". Siga esta ordem mental:

  PASSO 1 \u2014 Leia [TEXTO] completo. Identifique: tipo de quest\xE3o, enunciado, contexto, idioma.
  PASSO 2 \u2014 Leia [RESPOSTAS]. Anote: quantos itens, IDs, tipos (t), textos (txt), estado atual (v).
  PASSO 3 \u2014 Raciocine a resposta correta usando seu conhecimento. Seja preciso \u2014 n\xE3o adivinhe.
  PASSO 4 \u2014 Escolha a ferramenta (clk/chk/val/sel/drag) certa para o tipo de controle.
  PASSO 5 \u2014 Verifique: o ID usado existe em [RESPOSTAS]? O tipo da a\xE7\xE3o bate com o tipo do elemento?
  PASSO 6 \u2014 Emita as actions. Confirme: adv \xE9 a \xDALTIMA a\xE7\xE3o se necess\xE1rio.

Exemplo de uso do campo thinking:
  "thinking": "Quest\xE3o pede capitais. Alternativa 'Paris' \xE9 capital da Fran\xE7a \u2192 correto. ID eq-abc-1 \xE9 radio. Uso chk."

N\xC3O produza sa\xEDda impulsiva. Racioc\xEDnio calmo evita erros e respostas trocadas.
O campo thinking \xE9 leve (1-3 linhas). N\xC3O escreva essays \u2014 seja telegr\xE1fico e preciso.

\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
AN\xC1LISE DE P\xC1GINA \u2014 INTERPRETA\xC7\xC3O INTELIGENTE DA INTERFACE
\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
Ao receber [DADOS], analise:

1. [TEXTO] \u2014 Conte\xFAdo textual principal: enunciado, contexto, alternativas, instru\xE7\xF5es.
2. [RESPOSTAS] \u2014 Controles interativos classificados como resposta: inputs, radios, checkboxes, selects, cards, bot\xF5es de op\xE7\xE3o. CADA um tem id, tipo (t), texto (txt), nome (n), valor atual (v) e op\xE7\xF5es (opt). Use EXCLUSIVAMENTE os IDs listados aqui.
3. [NAVEGA\xC7\xC3O] \u2014 Bot\xF5es/links de avan\xE7o (Pr\xF3xima, Check, Submit, Enviar, n\xFAmeros de p\xE1gina). Use quando precisar avan\xE7ar.
4. [IMAGENS E GR\xC1FICOS] \u2014 Visuais anexados com label indicando a qual alternativa pertencem.
5. [MEM\xD3RIA] \u2014 Fatos aprendidos de quest\xF5es anteriores desta sess\xE3o (use para contexto).
6. [PLATAFORMA] \u2014 Hint do sistema sobre como interagir com essa plataforma espec\xEDfica.

CLASSIFICA\xC7\xC3O OBRIGAT\xD3RIA (pageType):
- "question"  \u2192 h\xE1 [RESPOSTAS] n\xE3o-vazia OU o enunciado tem pergunta/alternativa. SEMPRE que houver controles de resposta.
- "info"      \u2192 p\xE1gina 100% informativa: artigo, teoria, instru\xE7\xE3o de leitura, sem nenhum controle de resposta.
- "start"     \u2192 tela de boas-vindas com bot\xE3o de iniciar a atividade (actions=[{t:"adv"}]).
- "conclusion"\u2192 tela final de encerramento/resultado/pontua\xE7\xE3o (actions=[]).

NUNCA classifique como "info" se [RESPOSTAS] tiver controles \u2014 isso descarta a quest\xE3o silenciosamente.

\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
FERRAMENTAS DISPON\xCDVEIS \u2014 A\xC7\xD5ES (actions[])
\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
Cada a\xE7\xE3o tem um campo "t" (tipo) e par\xE2metros espec\xEDficos.

\u250C\u2500\u2500\u2500\u2500\u2500\u252C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510
\u2502 "t" \u2502 QUANDO USAR                                               \u2502
\u251C\u2500\u2500\u2500\u2500\u2500\u253C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2524
\u2502 chk \u2502 Marcar checkbox ou radio. Par\xE2metros: id (ID do controle),\u2502
\u2502     \u2502 c: true. NUNCA emita c:false para desmarcar \u2014 o sistema   \u2502
\u2502     \u2502 resolve desmarca\xE7\xF5es automaticamente.                      \u2502
\u2502     \u2502 QUANDO: tipo "radio", "checkbox", "chk" em [RESPOSTAS].   \u2502
\u251C\u2500\u2500\u2500\u2500\u2500\u253C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2524
\u2502 clk \u2502 Clique direto em card, bot\xE3o de op\xE7\xE3o, tile, link.        \u2502
\u2502     \u2502 Par\xE2metros: id (ID ou texto do elemento).                  \u2502
\u2502     \u2502 QUANDO: tipo "submit", "button", cards/tiles sem input     \u2502
\u2502     \u2502 nativo, op\xE7\xF5es do Wayground/Quizizz/Duolingo.              \u2502
\u251C\u2500\u2500\u2500\u2500\u2500\u253C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2524
\u2502 val \u2502 Preencher input de texto, textarea ou campo num\xE9rico.      \u2502
\u2502     \u2502 Par\xE2metros: id, v (valor exato como string).               \u2502
\u2502     \u2502 QUANDO: tipo "text", "number", "textarea", "val" em        \u2502
\u2502     \u2502 [RESPOSTAS]. Para cada campo = uma a\xE7\xE3o val separada.      \u2502
\u251C\u2500\u2500\u2500\u2500\u2500\u253C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2524
\u2502 sel \u2502 Selecionar op\xE7\xE3o em dropdown/select nativo.                \u2502
\u2502     \u2502 Par\xE2metros: id, v (array de strings).                      \u2502
\u2502     \u2502 QUANDO: tipo "select", "combobox", "listbox" em            \u2502
\u2502     \u2502 [RESPOSTAS] com campo opt listando as op\xE7\xF5es dispon\xEDveis.  \u2502
\u251C\u2500\u2500\u2500\u2500\u2500\u253C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2524
\u2502 drag\u2502 Arrastar item para zona/categoria.                         \u2502
\u2502     \u2502 Par\xE2metros: from (ID ou texto do item), to (ID ou nome da  \u2502
\u2502     \u2502 zona/categoria de destino).                                 \u2502
\u2502     \u2502 QUANDO: quest\xE3o de arrastar/soltar, ordena\xE7\xE3o, ou          \u2502
\u2502     \u2502 categoriza\xE7\xE3o com drag-and-drop real. Se o widget tem       \u2502
\u2502     \u2502 bot\xF5es de categoria clic\xE1veis, prefira clk.                \u2502
\u251C\u2500\u2500\u2500\u2500\u2500\u253C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2524
\u2502 js  \u2502 C\xF3digo JavaScript executado via $eq (API interna).         \u2502
\u2502     \u2502 Par\xE2metros: code (string de c\xF3digo JS).                    \u2502
\u2502     \u2502 QUANDO: widget interativo que n\xE3o responde a eventos DOM    \u2502
\u2502     \u2502 convencionais (ex: Perseus/Khan Academy, sliders,           \u2502
\u2502     \u2502 canvas interativo). \xDALTIMO RECURSO.                         \u2502
\u251C\u2500\u2500\u2500\u2500\u2500\u253C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2524
\u2502 adv \u2502 AVAN\xC7O AUT\xD4NOMO para a pr\xF3xima etapa/quest\xE3o.              \u2502
\u2502     \u2502 Forma: {t:"adv"} \u2014 SEM outros par\xE2metros.                  \u2502
\u2502     \u2502 O SISTEMA encontra e clica o bot\xE3o de avan\xE7o sozinho.       \u2502
\u2502     \u2502 VOC\xCA N\xC3O deve tentar identificar nem clicar bot\xF5es de nav.  \u2502
\u2502     \u2502 NUNCA use clk para "Pr\xF3xima", "Next", "Check", "Enviar".   \u2502
\u2502     \u2502 SEMPRE use {t:"adv"} para avan\xE7ar \u2014 nunca clk em nav.      \u2502
\u2502     \u2502 QUANDO: ap\xF3s responder OU em page_type "info"/"start".      \u2502
\u2502     \u2502 DEVE ser a \xDALTIMA a\xE7\xE3o. N\xC3O emita antes das respostas.     \u2502
\u2514\u2500\u2500\u2500\u2500\u2500\u2534\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518


REGRA FUNDAMENTAL \u2014 UM M\xC9TODO POR ELEMENTO:
- Se [RESPOSTAS] tem controles listados: use EXCLUSIVAMENTE os IDs de [RESPOSTAS].
- N\xC3O use seletor CSS, N\xC3O use js, N\xC3O tente outros caminhos enquanto houver IDs em [RESPOSTAS].
- clk com seletor CSS e js s\xE3o EXCLUSIVOS para quando [RESPOSTAS] est\xE1 vazia.
- N\xC3O combine m\xE9todos: ou voc\xEA usa IDs de [RESPOSTAS] OU usa CSS/js. Nunca ambos.

\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
REGRAS DE SELE\xC7\xC3O DE FERRAMENTA \u2014 HEUR\xCDSTICAS DE INTERFACE
\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550

A. ESCOLHA \xDANICA (radio, escolha_unica):
   \u2192 Detectado por: [ESCOLHA-\xDAnica] no cabe\xE7alho de [RESPOSTAS], tipo "radio", ou apenas 1 resposta poss\xEDvel.
   \u2192 Use: exatamente 1 a\xE7\xE3o chk com c:true no ID correto + adv.
   \u2192 NUNCA emita 2 a\xE7\xF5es de marca\xE7\xE3o em escolha \xFAnica.

B. M\xDALTIPLA ESCOLHA (checkboxes, escolha_multipla):
   \u2192 Detectado por: [MULTI-SELE\xC7\xC3O] no cabe\xE7alho de [RESPOSTAS], tipo "checkbox".
   \u2192 Use: 1 a\xE7\xE3o chk para CADA op\xE7\xE3o correta identificada + adv.
   \u2192 Pode e DEVE haver 2, 3 ou mais a\xE7\xF5es chk. Omitir uma correta \xE9 erro.

C. PREENCHIMENTO \xDANICO (1 input/textarea):
   \u2192 Use: 1 a\xE7\xE3o val com o valor exato + adv.
   \u2192 Em quest\xF5es num\xE9ricas, use o n\xFAmero sem unidade (ex: "5" n\xE3o "5 cm").

D. M\xDALTIPLOS CAMPOS (matrizes, tabelas, grade):
   \u2192 Detectado por: [M\xDALTIPLOS CAMPOS] no cabe\xE7alho, 2+ controles tipo text/number.
   \u2192 Use: 1 a\xE7\xE3o val por campo com seu id exato + adv.
   \u2192 NUNCA agrupe v\xE1rios valores em 1 a\xE7\xE3o val.

E. CARDS/TILES CLIC\xC1VEIS (Wayground, Quizizz, Duolingo):
   \u2192 Detectado por: tipo "submit" ou "button" em [RESPOSTAS] com txt sendo o texto da alternativa.
   \u2192 Use: clk no ID do card correto + adv.
   \u2192 N\xC3O use chk para cards \u2014 eles n\xE3o s\xE3o inputs de formul\xE1rio.

E2. OP\xC7\xD5ES NUMERADAS ("1", "2", "3", "4" como alternativas):
   \u2192 Se [RESPOSTAS] lista elementos com txt="1", txt="2", txt="3", txt="4" \u2014 s\xE3o alternativas de quiz.
   \u2192 Use: clk no ID da op\xE7\xE3o correta (ex: a quest\xE3o pede "3" \u2192 {t:"clk",id:"[id do card 3]"}) + adv.
   \u2192 N\xC3O confunda com pagina\xE7\xE3o \u2014 alternativas NUNCA est\xE3o em [NAVEGA\xC7\xC3O], s\xF3 em [RESPOSTAS].

F. DROPDOWN/SELECT:
   \u2192 Detectado por: tipo "select"/"combobox" com campo opt listando op\xE7\xF5es.
   \u2192 Use: sel com v:[array dos valores corretos] + adv.

G. CATEGORIZA\xC7\xC3O / CLASSIFICA\xC7\xC3O (FATO/OPINI\xC3O, SIM/N\xC3O, grupos):
   \u2192 Se cards t\xEAm bot\xF5es internos de categoria: clk no bot\xE3o da categoria correta dentro de cada card.
   \u2192 Se \xE9 drag-and-drop real: drag de cada item para sua categoria.
   \u2192 Classifique TODOS os itens vis\xEDveis antes de emitir adv.
   \u2192 mode: "categorizacao" (categorias fixas) ou "arrastar_soltar" (arraste).

H. VERDADEIRO/FALSO EM GRADE:
   \u2192 Avalie CADA afirma\xE7\xE3o individualmente.
   \u2192 Para N afirma\xE7\xF5es/linhas, emita EXATAMENTE N a\xE7\xF5es chk separadas (uma para cada linha/afirma\xE7\xE3o) + adv.
   \u2192 NUNCA marque apenas uma afirma\xE7\xE3o e deixe as outras em branco.
   \u2192 Use o id do controle em [RESPOSTAS] ou {t:"chk", name:"nome_do_grupo", v:"V"|"F"}.
   \u2192 mode: "verdadeiro_falso".

I. REDA\xC7\xC3O / DISSERTA\xC7\xC3O:
   \u2192 Detectado por: textarea grande OU enunciado com "escreva", "disserte", "redija", "elabore", "reda\xE7\xE3o".
   \u2192 Use: 1 a\xE7\xE3o val com texto completo: t\xEDtulo (se pedido) + introdu\xE7\xE3o + desenvolvimento + conclus\xE3o.
   \u2192 M\xEDnimo 15 linhas de conte\xFAdo relevante ao tema.
   \u2192 mode: "texto_livre".

J. P\xC1GINA INFORMATIVA / ARTIGO:
   \u2192 [RESPOSTAS] vazia, apenas texto para ler.
   \u2192 Use: actions=[{t:"adv"}] para avan\xE7ar. N\xE3o invente respostas.

K. IMAGENS E GR\xC1FICOS:
   \u2192 Analise: curvas, eixos, v\xE9rtices, coordenadas, geometria, propor\xE7\xF5es.
   \u2192 Compare alternativas visuais contra a condi\xE7\xE3o do enunciado.
   \u2192 Selecione a alternativa cujo gr\xE1fico satisfaz matematicamente a quest\xE3o.

\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
PLATAFORMAS ESPEC\xCDFICAS \u2014 REGRAS OBRIGAT\xD3RIAS
\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550

GOOGLE FORMS:
  \u2192 Controles s\xE3o [role="radio"] ou [role="checkbox"] com data-value.
  \u2192 IDs dos controles v\xEAm de data-item-id no container pai.
  \u2192 Use chk com c:true para radio/checkbox. Ex: {t:"chk",id:"eq-xxx-1",c:true}
  \u2192 Para texto livre (resposta curta/par\xE1grafo): use val com o texto. Ex: {t:"val",id:"eq-xxx-2",v:"resposta"}
  \u2192 Para dropdown (role="listbox"/"combobox"): use sel com o valor. Ex: {t:"sel",id:"eq-xxx-3",v:"op\xE7\xE3o"}
  \u2192 Ap\xF3s responder TODAS as perguntas do formul\xE1rio, use {t:"adv"} para enviar.
  \u2192 Se pageType="conclusion" (obrigado/enviado): actions=[{t:"adv"}] apenas.

WAYGROUND / QUIZIZZ \u2014 ESCOLHA M\xDALTIPLA:
  \u2192 Alternativas s\xE3o cards clic\xE1veis com cursor-pointer e ID hexadecimal.
  \u2192 Use clk no ID do card. Ex: {t:"clk",id:"6abc123"}
  \u2192 NUNCA use chk em Wayground \u2014 cards s\xE3o divs, n\xE3o inputs.

WAYGROUND / QUIZIZZ \u2014 CLASSIFICA\xC7\xC3O:
  \u2192 Items s\xE3o cards com cursor-grab e ID hexadecimal.
  \u2192 Categorias s\xE3o containers com texto vis\xEDvel (ex: "FATO", "OPINI\xC3O").
  \u2192 Use drag: {t:"drag",from:"ID_hex_do_item",to:"NOME_DA_CATEGORIA"}
  \u2192 Ex: {t:"drag",from:"6abc","to":"FATO"}
  \u2192 Ap\xF3s classificar TODOS os items, use {t:"adv"}.

KHAN ACADEMY / PERSEUS:
  \u2192 Widgets podem n\xE3o responder a eventos DOM simples.
  \u2192 Primeiro tente chk/clk normal. Se falhar, use js via $eq.
  \u2192 Ex: {t:"js",v:"$eq('seletor').click()"}

DUOLINGO:
  \u2192 Tiles clic\xE1veis com texto. Use clk pelo texto exato do tile.

MOODLE / AVA / CANVAS / LMS GEN\xC9RICO:
  \u2192 Formul\xE1rios padr\xE3o HTML. Use chk para radio/checkbox, sel para select, val para inputs.

SITES GEN\xC9RICOS (qualquer plataforma n\xE3o listada acima):
  \u2192 Analise [PLATAFORMA] no prompt \u2014 sobrep\xF5e qualquer regra acima.
  \u2192 Para elementos com role="radio"/"checkbox": use chk.
  \u2192 Para buttons/divs clic\xE1veis sem input interno: use clk.
  \u2192 Para selects nativos: use sel.
  \u2192 Para inputs de texto/textarea: use val.
  \u2192 Se nenhum controle \xF3bvio: use o fallback CSS: {t:"clk",id:"[seletor CSS]"}
  \u2192 Ex: {t:"clk",id:"[data-value='Paris']"} ou {t:"clk",id:"button.answer-card:first-child"}

REGRA UNIVERSAL DE AVAN\xC7O:
  \u2192 Se pageType="info" ou "start": actions=[{t:"adv"}] \u2014 apenas avan\xE7ar.
  \u2192 Se pageType="question" SEM controles ([RESPOSTAS] vazia): tente {t:"adv"} como \xFAltimo recurso.
  \u2192 [NAVEGA\xC7\xC3O] lista os bot\xF5es de avan\xE7ar dispon\xEDveis \u2014 use o ID do bot\xE3o de avan\xE7o se dispon\xEDvel.


\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
REGRAS ABSOLUTAS
\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
1. Sa\xEDda APENAS JSON minificado \u2014 sem markdown, sem texto livre, sem coment\xE1rios.
2. NUNCA invente IDs. Use exclusivamente os listados em [RESPOSTAS] ou [NAVEGA\xC7\xC3O].
3. adv deve ser SEMPRE a \xFAltima a\xE7\xE3o do array.
4. rationale: m\xE1ximo 15 palavras (telegr\xE1fico: "Alternativas B e D corretas" ou "x=5 pela equa\xE7\xE3o").
5. NUNCA emita c:false \u2014 nunca desmarque explicitamente.
6. NUNCA emita adv se ainda h\xE1 itens de categoriza\xE7\xE3o/classifica\xE7\xE3o n\xE3o resolvidos.
7. Se [RESPOSTAS] tiver controles mas voc\xEA n\xE3o souber a resposta, ainda assim emita a a\xE7\xE3o com melhor estimativa \u2014 nunca retorne actions:[].

PLANO JSON (campos obrigat\xF3rios):
{ "pageType": "question|info|start|conclusion", "mode": "...", "confidence": 0.0-1.0, "rationale": "...", "actions": [...], "memoryToStore": "..." }
memoryToStore: fato \xFAtil para quest\xF5es futuras desta sess\xE3o (omitir se n\xE3o houver nada relevante).

\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
L. SEM CONTROLES / INSPE\xC7\xC3O AUT\xD4NOMA DE P\xC1GINA
\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
Se [RESPOSTAS] mostrar "Nenhuma" ou lista vazia, o sistema inclui:
- [HTML]: HTML bruto da \xE1rea ativa da p\xE1gina \u2014 inspecione para encontrar elementos interativos.
- [DOM-INTERATIVO]: lista simplificada de elementos clic\xE1veis/interativos detectados na p\xE1gina.

Voc\xEA tem autoridade total para agir sobre qualquer elemento que encontrar nesses blocos.
Hierarquia de decis\xE3o aut\xF4noma (execute na ordem):

  1\xBA PRIORIDADE \u2014 Tente clk com texto exato ou ID do elemento:
     Ex: {t:"clk", id:"x = 5"}  ou  {t:"clk", id:"btn-next"}
     O sistema resolve o elemento por ID nativo, texto visi\xEDvel ou aria-label.

  2\xBA PRIORIDADE \u2014 Tente clk com seletor CSS:
     Ex: {t:"clk", id:"input[type='submit'][value='x = 5']"}
         {t:"clk", id:"button.option-card:nth-child(2)"}
         {t:"clk", id:"[data-answer='true']"}
     O id pode ser qualquer seletor CSS v\xE1lido \u2014 o sistema tenta document.querySelector(id).

  3\xBA PRIORIDADE \u2014 Use val com seletor CSS para preencher input/textarea que n\xE3o apareceu em [RESPOSTAS]:
     Ex: {t:"val", id:"#answer-input", v:"42"}
         {t:"val", id:"textarea.response-field", v:"Texto da resposta"}

  4\xBA PRIORIDADE \u2014 Use js para inje\xE7\xE3o direta e completa quando nada mais funciona:
     Ex: {t:"js", code:"document.querySelector('.option[data-idx="1"]').click()"}
         {t:"js", code:"$eq.val('#resp', '5'); $eq.clk('#btn-check')"}
     API $eq dispon\xEDvel: $eq.clk(selector), $eq.val(selector, value), $eq.chk(selector, true)

  5\xBA \u2014 S\xF3 classifique como pageType:"info" e emita adv se tiver CERTEZA absoluta de que
     n\xE3o h\xE1 NENHUM elemento interativo de resposta na p\xE1gina. Na d\xFAvida, tente 1\xBA ou 4\xBA.

REGRA CR\xCDTICA: Mesmo sem [RESPOSTAS], se o [TEXTO] contiver uma pergunta ou alternativas, a
p\xE1gina \xC9 uma quest\xE3o. Analise o [HTML] e [DOM-INTERATIVO] para encontrar como responder.
`;function Nt(n,e){return/forms\.(google|gle)\.com|docs\.google\.com\/forms/i.test(n)||e.includes("Qr7Oae")||e.includes("freebirdFormviewer")||e.includes("data-item-id")?"[PLATAFORMA: Google Forms \u2014 use clk nos containers de alternativa; IDs via data-item-id ou texto da op\xE7\xE3o]":/wayground|quizizz/i.test(n)||e.includes("data-functional-selector")?e.includes("classification")||e.toLowerCase().includes("fato")||e.toLowerCase().includes("opini")?`[PLATAFORMA: Wayground/Quizizz CLASSIFICA\xC7\xC3O drag-and-drop]
[RESPOSTAS] ter\xE1 items com t="draggable" e id hexadecimal (ex: 695fa5b6...).
Use EXCLUSIVAMENTE: {t:"drag", from:"ID_hexadecimal_do_card", to:"NOME_DA_CATEGORIA"}
Exemplo: {t:"drag",from:"695fa5b69885555d8155a5ac",to:"FATO"}
Classifique TODOS os items (1 drag por item) antes de emitir adv.
mode: "arrastar_soltar"`:"[PLATAFORMA: Wayground/Quizizz \u2014 alternativas s\xE3o cards clic\xE1veis, use clk]":/khanacademy\.org/i.test(n)||e.includes("perseus")?"[PLATAFORMA: Khan Academy \u2014 widgets Perseus; use js via $eq para widgets interativos se necess\xE1rio]":/moodle|ava\.|classroom\.google/i.test(n)?"[PLATAFORMA: Moodle/AVA/Classroom \u2014 formul\xE1rios padr\xE3o]":/duolingo/i.test(n)?"[PLATAFORMA: Duolingo \u2014 tiles clic\xE1veis, use clk por texto]":/blackboard|canvas\.instructure/i.test(n)?"[PLATAFORMA: Canvas/Blackboard \u2014 quiz-question padr\xE3o]":/socrative|kahoot/i.test(n)?"[PLATAFORMA: Socrative/Kahoot \u2014 alternativas s\xE3o bot\xF5es, use clk]":""}function De(n,e,t){let o=n.htmlSnippet.includes("draggable")||n.htmlSnippet.includes("perseus")||n.htmlSnippet.includes("category")||n.htmlSnippet.includes("dropzone")||n.controls.some(v=>v.type==="draggable"||v.type==="dropzone"),i=/katex|latex|\\frac|\\sqrt/i.test(n.htmlSnippet),a=/forms\.(google|gle)\.com|docs\.google\.com\/forms/i.test(n.sourceUrl)||n.htmlSnippet.includes("Qr7Oae")||n.htmlSnippet.includes("data-item-id")||n.htmlSnippet.includes("freebirdFormviewer"),s=(/wayground|quizizz/i.test(n.sourceUrl)||n.htmlSnippet.includes("data-functional-selector"))&&(n.htmlSnippet.includes("classification")||n.controls.filter(v=>v.role==="answer").length===0),r=n.controls.filter(v=>v.role!=="navigation").length===0,l=r||o||a||s||i&&n.questionText.length<60,c=r?4500:s?6e3:1800,u=l?`
[HTML]:
${n.htmlSnippet.slice(0,c).replace(/\s+/g," ")}`:"",p="";if(r&&typeof document<"u")try{let v=Array.from(document.querySelectorAll('input:not([type=hidden]), textarea, select, button, [role="button"], [role="radio"], [role="checkbox"], [role="option"], [onclick], [data-action], a[href]:not([href="#"]), [tabindex]:not([tabindex="-1"])')).filter(f=>{let b=f,E=b.getBoundingClientRect?.()||{width:0,height:0};return E.width>0&&E.height>0&&!b.closest("#easyquiz-shadow-root, .eq-sidebar")}).slice(0,40).map(f=>{let b=f,E=b.tagName.toLowerCase(),T=b.id?`#${b.id}`:"",w=b.className&&typeof b.className=="string"?`.${b.className.trim().split(/\s+/).slice(0,2).join(".")}`:"",M=(b.textContent||b.value||b.getAttribute("aria-label")||"").trim().slice(0,60),L=b.getAttribute("type")||b.getAttribute("role")||"";return`${E}${T}${w}[${L}] txt="${M}"`});v.length>0&&(p=`
[DOM-INTERATIVO]:
${v.join(`
`)}`)}catch{}let d=ft(),m=d.length>0?`
[MEM\xD3RIA]:
${d.join(" | ")}
`:"",h=n.controls.filter(v=>v.role!=="navigation"),g=n.controls.filter(v=>v.role==="navigation"),_=Nt(n.sourceUrl,n.htmlSnippet),y=_?`
${_}
`:"";return`--- AN\xC1LISE ---
[MODO]: ${t.engine} | Dica: ${t.modeHint||"Auto"}
[URL]: ${n.sourceUrl}
[P\xC1GINA]: ${n.pageTitle}${m}${y}
[DADOS]
[TEXTO]:
${n.questionText}${u}${p}

[RESPOSTAS]:
${(()=>{if(h.length===0)return"Nenhuma";let v=h.filter(A=>A.type==="checkbox"||A.type==="chk"),f=new Set(h.filter(A=>A.type==="radio").map(A=>A.name).filter(Boolean)),b=v.filter(A=>!A.name||!f.has(A.name)),E=/selecione as|assinale as|quais das|todas as|marque as|escolha as|quais dessas|quais dos/i.test(n.questionText),T=b.length>=2||E,w=f.size>1||/verdadeir|fals[oa]|\bv\s*\/\s*f\b|julgue|itens/i.test(n.questionText)&&f.size>=1,M=h.every(A=>A.type==="radio"||A.type==="chk")&&f.size===1&&!T&&!w,L=h.filter(A=>A.type==="text"||A.type==="number"||A.type==="val"||A.tag==="input"||A.tag==="textarea"),$=L.length>=2;return(w?`[GRADE VERDADEIRO/FALSO (${f.size||"m\xFAltiplas"} afirma\xE7\xF5es): voc\xEA DEVE julgar e marcar exatamente 1 op\xE7\xE3o (V ou F) para CADA uma das ${f.size} afirma\xE7\xF5es \u2014 emita ${f.size} a\xE7\xF5es chk separadas + adv]
`:T?`[MULTI-SELE\xC7\xC3O: marque TODOS os corretos, pode ser 2 ou mais]
`:M?`[ESCOLHA-\xDAnica: marque APENAS 1 op\xE7\xE3o]
`:$?`[M\xDALTIPLOS CAMPOS DE PREENCHIMENTO (${L.length} campos): emita uma a\xE7\xE3o val para CADA um dos ${L.length} campos abaixo com seu id exato]
`:"")+JSON.stringify(h.map(A=>({id:A.id,t:A.type,n:A.name||void 0,txt:A.label?A.label.length>160?A.label.slice(0,160)+"...":A.label:void 0,v:A.value||void 0,opt:A.options&&A.options.length?A.options.slice(0,20).map(ae=>ae.label||ae.value):void 0})))})()}

[NAVEGA\xC7\xC3O]:
${g.length>0?g.map(v=>`"${v.label||v.id}"[${v.type}]`).join(","):"Nenhuma"}

[IMAGENS E GR\xC1FICOS ANEXADOS (${e.length})]:
${e.length>0?e.map((v,f)=>`  - Imagem ${f+1}: ${v.associatedLabel||"Gr\xE1fico da Quest\xE3o"}${v.alt?` (Texto alt: "${v.alt}")`:""}`).join(`
`):"Nenhum anexo visual."}
[/DADOS]
Sa\xEDda em JSON v\xE1lido.`}var Dt=new Set(["question","info","start","conclusion"]),zt=new Set(["texto_livre","escolha_unica","escolha_multipla","verdadeiro_falso","preenchimento","acao_sem_resposta","categorizacao","ordenacao","arrastar_soltar"]),Ft=new Set(["val","chk","sel","clk","adv","js","drag"]),Bt=150,ge=2e3;function K(n,e=""){return n==null?e:typeof n=="string"?n.trim().slice(0,ge):typeof n=="number"||typeof n=="boolean"?String(n).trim().slice(0,ge):e}function Ut(n,e){if(!n||typeof n!="object")return null;let t=n,o=t.t;if(typeof o!="string"||!Ft.has(o))return null;if(o==="adv"){let r=t.id??t.target??t.name??t.selector;return{t:"adv",...K(r)?{id:K(r,"").slice(0,500)}:{}}}if(o==="drag"){let r=K(t.from??t.source),l=K(t.to??t.target??t.destination);return!r||!l?null:{t:"drag",from:r.slice(0,500),to:l.slice(0,500)}}if(o==="js"){let r=K(t.v??t.code??t.script);return!r||r.length>8e3?null:{t:"js",v:r}}let i=t.id??t.target??t.name??t.selector??t.element;(i==null||i==="")&&o==="val"&&(i="1");let a=K(i).slice(0,500);if(!a)return null;if(o==="val"){let r=t.v!==void 0?t.v:t.value!==void 0?t.value:t.val!==void 0?t.val:t.text!==void 0?t.text:t.answer;return{t:"val",id:a,v:K(r).slice(0,ge)}}if(o==="sel"){let r=t.v!==void 0?t.v:t.value!==void 0?t.value:t.val!==void 0?t.val:t.values,c=(Array.isArray(r)?r:[r]).map(u=>K(u).slice(0,500)).filter(Boolean);return{t:"sel",id:a,v:c}}if(o==="chk"){let r=t.c===!1||t.c==="false"||t.c===0||t.c==="0"||t.c==="off"||t.c==="unchecked"||t.c==="desmarcar",l={t:"chk",id:a,c:!r};return t.v!==void 0&&(l.v=K(t.v).slice(0,ge)),l}let s={t:"clk",id:a};if(t.c!==void 0){let r=t.c===!1||t.c==="false"||t.c===0||t.c==="0"||t.c==="off"||t.c==="unchecked"||t.c==="desmarcar";s.c=!r}return t.v!==void 0&&(s.v=K(t.v).slice(0,ge)),Array.isArray(t.co)&&t.co.length===2&&t.co.every(r=>typeof r=="number"&&Number.isFinite(r))&&(s.co=[t.co[0],t.co[1]]),s}function jt(n,e,t){if(t!=="question")return n;let o=n.filter(a=>a.t==="adv"),i=n.filter(a=>a.t!=="adv");if(e==="escolha_unica"){i=i.filter(s=>!(s.t==="chk"&&s.c===!1||s.t==="clk"&&s.c===!1));let a=i.filter(s=>s.t==="chk"||s.t==="clk");if(a.length>1){let s=i.filter(l=>l.t!=="chk"&&l.t!=="clk"),r=a[a.length-1];i=[...s,r]}}else if(e==="escolha_multipla"){i=i.filter(s=>!(s.t==="chk"&&s.c===!1||s.t==="clk"&&s.c===!1));let a=new Set;i=i.filter(s=>{let r="id"in s&&typeof s.id=="string"?s.id:"";return r?a.has(r)?!1:(a.add(r),!0):!0})}else if(e==="verdadeiro_falso"){let a=new Set,s=[...i].reverse(),r=[];for(let l of s){let c="id"in l&&typeof l.id=="string"?l.id:"";c?a.has(c)||(a.add(c),r.push(l)):r.push(l)}i=r.reverse()}return[...i,...o]}function bt(n){if(!n||typeof n!="object")return{pageType:"info",mode:"acao_sem_resposta",confidence:.5,rationale:"Resposta estruturada n\xE3o identificada; avan\xE7ando como informativo.",actions:[{t:"adv"}]};let e=n,t=e.pageType,o=e.mode;(typeof t!="string"||!Dt.has(t))&&(t="question"),(typeof o!="string"||!zt.has(o))&&(o="escolha_unica");let i=Array.isArray(e.actions)?e.actions:[],a=[];for(let l=0;l<Math.min(i.length,Bt);l++){let c=Ut(i[l],l);c&&a.push(c)}a.some(l=>l.t==="val")&&(o==="escolha_unica"||!e.mode)&&(o="preenchimento"),a.some(l=>l.t==="drag")&&!["categorizacao","arrastar_soltar","ordenacao"].includes(o)&&(o="arrastar_soltar"),a=jt(a,o,t);let s=a.some(l=>l.t==="adv");t==="conclusion"?a.length=0:t==="info"||t==="start"?s||a.push({t:"adv"}):t==="question"&&!s&&a.push({t:"adv"});let r=typeof e.confidence=="number"&&Number.isFinite(e.confidence)?Math.min(1,Math.max(0,e.confidence)):.85;return{pageType:t,mode:o,confidence:r,rationale:K(e.rationale,"Plano validado e auto-recuperado."),actions:a,...K(e.memoryToStore)?{memoryToStore:K(e.memoryToStore)}:{},...e.needsMoreContext?{needsMoreContext:!!e.needsMoreContext}:{}}}var re=class{keys=new Map;constructor(e=[]){this.init(e)}init(e){let t=new Map(this.keys);this.keys.clear();let o=e.flatMap(a=>a.split(/[\n\r]+/));Array.from(new Set(o.map(a=>a.trim().replace(/^["']|["']$/g,"")).filter(a=>a.length>5))).forEach((a,s)=>{let r=this.generateId(a),l=t.get(r)||t.get(a);this.keys.set(r,{id:r,key:a,label:l?.label||`Chave ${s+1}`,addedAt:l?.addedAt||Date.now(),lastUsedAt:l?.lastUsedAt,lastLatencyMs:l?.lastLatencyMs,cooldownUntil:l?.cooldownUntil,errorCount:l?.errorCount||0,lastError:l?.lastError,winCount:l?.winCount||0})})}generateId(e){let t=0;for(let i=0;i<e.length;i++)t=(t<<5)-t+e.charCodeAt(i),t|=0;let o=e.slice(-12).replace(/[^a-zA-Z0-9]/g,"").slice(0,6);return`key_${Math.abs(t).toString(36).slice(0,6)}${o}`}static maskKey(e){let t=e.trim().replace(/^["']|["']$/g,"");return t.length<=10?"\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022":`${t.slice(0,6)}...${t.slice(-4)}`}getAllKeys(){let e=Date.now();return Array.from(this.keys.values()).map(t=>{let o=Math.max(0,(t.cooldownUntil||0)-e);return{...t,isCooldown:o>0,remainingCooldownMs:o}})}getHealthyKeys(){let e=Date.now();return Array.from(this.keys.values()).filter(t=>(t.cooldownUntil||0)<=e&&(t.errorCount||0)<5)}getBestKey(){let e=this.getHealthyKeys();if(e.length>0)return e.sort((o,i)=>{let a=o.lastLatencyMs??99999,s=i.lastLatencyMs??99999;return a-s}),e[0].key;let t=Array.from(this.keys.values());return t.length>0?(t.sort((o,i)=>(o.cooldownUntil||0)-(i.cooldownUntil||0)),t[0].key):""}getDiverseKeys(e){let t=this.getHealthyKeys();if(t.length===0){let i=this.getBestKey();return i?[i]:[]}t.sort((i,a)=>{let s=i.lastLatencyMs??99999,r=a.lastLatencyMs??99999;return s-r});let o=[];for(let i=0;i<e;i++){let a=t[i%t.length];o.push(a.key)}return o}markQuotaHit(e,t=5e3){let o=this.findKeyObj(e);o&&(o.cooldownUntil=Date.now()+t,o.errorCount=(o.errorCount||0)+1,o.lastError=`Cota tempor\xE1ria atingida (HTTP 429). Cooldown de ${t/1e3}s ativado.`)}markOverloaded(e,t=5e3){let o=this.findKeyObj(e);o&&(o.cooldownUntil=Date.now()+t,o.errorCount=(o.errorCount||0)+1,o.lastError=`Servidores sobrecarregados (HTTP 503). Cooldown de ${t/1e3}s ativado.`)}markSuccess(e,t){let o=this.findKeyObj(e);o&&(o.lastLatencyMs=t,o.lastUsedAt=Date.now(),o.errorCount=0,o.lastError=void 0,o.cooldownUntil=void 0)}markWinner(e){let t=this.findKeyObj(e);t&&(t.winCount=(t.winCount||0)+1)}markInvalid(e,t){let o=this.findKeyObj(e);o&&(o.errorCount=99,o.lastError=t)}addKey(e,t){let o=e.trim().replace(/^["']|["']$/g,"");if(!o)return{ok:!1,message:"Chave n\xE3o pode ser vazia."};if(o.length<15)return{ok:!1,message:"Chave de API inv\xE1lida ou muito curta."};let i=this.generateId(o);if(this.keys.has(i)||Array.from(this.keys.values()).some(r=>r.key===o))return{ok:!1,message:"Esta chave de API j\xE1 est\xE1 cadastrada."};let s={id:i,key:o,label:t?.trim()||`Chave ${this.keys.size+1}`,addedAt:Date.now(),errorCount:0};return this.keys.set(i,s),{ok:!0,message:"Chave adicionada com sucesso!",keyItem:s}}updateKey(e,t,o){let i=this.keys.get(e);if(!i)return{ok:!1,message:"Chave n\xE3o encontrada."};let a=t.trim().replace(/^["']|["']$/g,"");return!a||a.length<15?{ok:!1,message:"Chave de API inv\xE1lida."}:(i.key=a,o!==void 0&&(i.label=o.trim()),i.errorCount=0,i.cooldownUntil=void 0,i.lastError=void 0,{ok:!0,message:"Chave atualizada com sucesso!"})}removeKey(e){if(this.keys.size<=1)return{ok:!1,message:"Voc\xEA precisa manter pelo menos 1 chave de API cadastrada."};let t=this.findKeyObj(e);return t?(this.keys.delete(t.id),{ok:!0,message:"Chave removida com sucesso."}):{ok:!1,message:"Chave n\xE3o encontrada."}}exportRawKeys(){return Array.from(this.keys.values()).map(e=>e.key)}size(){return this.keys.size}findKeyObj(e){if(this.keys.has(e))return this.keys.get(e);for(let t of this.keys.values())if(t.key===e)return t}},Y=new re;var xe=[{id:"gemini-3.8-flash",name:"Gemini 3.8 Flash (Mais Inteligente 2026)",description:"Modelo flagship Flash lan\xE7ado em Set/2026. Ultra-r\xE1pido e altamente capaz.",stable:!0},{id:"gemini-3.7-flash",name:"Gemini 3.7 Flash (Agentic)",description:"Alta capacidade para racioc\xEDnio multimodal e workflows ag\xEAnticos.",stable:!0},{id:"gemini-3.6-flash",name:"Gemini 3.6 Flash (Est\xE1vel)",description:"Modelo est\xE1vel e confi\xE1vel com excelente velocidade.",stable:!0},{id:"gemini-3.5-flash",name:"Gemini 3.5 Flash (R\xE1pido)",description:"Modelo de alta performance para tarefas r\xE1pidas.",stable:!0},{id:"gemini-3.5-flash-lite",name:"Gemini 3.5 Flash-Lite (Econ\xF4mico)",description:"Modelo econ\xF4mico de alta velocidade para volume elevado.",stable:!0},{id:"gemini-2.5-flash",name:"Gemini 2.5 Flash (Legacy R\xE1pido)",description:"Modelo legacy com zero-thinking suportado. Ultra-baixa lat\xEAncia.",stable:!0},{id:"gemini-2.5-pro",name:"Gemini 2.5 Pro (Legacy Avan\xE7ado)",description:"Modelo legacy avan\xE7ado para quest\xF5es de alta complexidade.",stable:!0}],Be=["gemini-3.5-flash-lite","gemini-3.5-flash","gemini-3.6-flash","gemini-3.8-flash"],Kt={"gemini-2.5-flash":"gemini-3.6-flash","gemini-2.0-flash":"gemini-3.5-flash","gemini-2.0-flash-lite":"gemini-3.5-flash-lite","gemini-1.5-flash":"gemini-3.5-flash","gemini-1.5-pro":"gemini-3.6-flash"};function Ue(n){return Kt[n]??n}var ze=null;function Vt(n,e){let o={temperature:0,maxOutputTokens:1800,responseMimeType:"application/json",responseSchema:e??Gt};return/lite/i.test(n)||(/gemini-3\.5-flash/i.test(n)||/gemini-3\.[0-4]/i.test(n)?o.thinkingConfig={thinkingBudget:0}:/gemini-3\.[67]-flash/i.test(n)?o.thinkingConfig={thinkingBudget:512}:/gemini-3\.[89]|gemini-3\.[1-9][0-9]/i.test(n)?o.thinkingConfig={thinkingBudget:512}:/gemini-2\.5-flash/i.test(n)&&(o.thinkingConfig={thinkingBudget:0})),o}var Gt={type:"OBJECT",properties:{pageType:{type:"STRING",enum:["question","info","start","conclusion"]},mode:{type:"STRING",enum:["texto_livre","escolha_unica","escolha_multipla","verdadeiro_falso","preenchimento","acao_sem_resposta","categorizacao","ordenacao","arrastar_soltar"]},confidence:{type:"NUMBER"},rationale:{type:"STRING"},thinking:{type:"STRING"},memoryToStore:{type:"STRING"},actions:{type:"ARRAY",items:{type:"OBJECT",properties:{t:{type:"STRING",enum:["val","chk","sel","clk","adv","js","drag"]},id:{type:"STRING"},name:{type:"STRING"},label:{type:"STRING"},v:{type:"STRING"},c:{type:"BOOLEAN"},co:{type:"ARRAY",items:{type:"NUMBER"}},from:{type:"STRING"},to:{type:"STRING"}},required:["t"]}}},required:["pageType","mode","confidence","rationale","actions"]};function yt(n){let e=n.trim().replace(/^google\//,"").replace(/^models\//,"");return!e||!ne(e)?"gemini-3.5-flash-lite":e}function je(n,e){let t="";try{let o=JSON.parse(n);t=o.error?.message||o.message||""}catch{t=n.slice(0,160)}return/API_KEY_INVALID|API key not valid|key.*invalid|unregistered/i.test(t)?"Chave de API do Gemini inv\xE1lida ou n\xE3o autorizada no Google AI Studio.":/RESOURCE_EXHAUSTED|Quota exceeded|rate limit|quota/i.test(t)||e===429?`Cota do Gemini excedida (HTTP 429): ${t||"Aguarde"}`:e===404?`HTTP 404: ${t||"Modelo ou endpoint n\xE3o encontrado no Google AI Studio"}`:e===503||/overloaded/i.test(t)?`Servidores Google sobrecarregados (HTTP 503): ${t||"Aguardando"}`:t?`Erro Gemini (HTTP ${e}): ${t}`:`Falha na requisi\xE7\xE3o ao Gemini (HTTP ${e}).`}function Qt(n){let e=n.trim(),t=e.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);if(t)try{return JSON.parse(t[1].trim())}catch{}try{return JSON.parse(e)}catch{}let o=e.match(/\{[\s\S]*\}/);if(o)try{return JSON.parse(o[0].trim())}catch{}try{let i=e.indexOf("{");if(i!==-1){let a=e.slice(i).trim();a=a.replace(/,\s*\{[^}]*$/,""),a=a.replace(/,\s*$/,"");let s=0,r=0,l=!1,c=!1;for(let p=0;p<a.length;p++){let d=a[p];if(c){c=!1;continue}if(d==="\\"){c=!0;continue}if(d==='"'){l=!l;continue}l||(d==="{"?s++:d==="}"?s=Math.max(0,s-1):d==="["?r++:d==="]"&&(r=Math.max(0,r-1)))}for(l&&(a+='"');r>0;)a+="]",r--;for(;s>0;)a+="}",s--;let u=JSON.parse(a);if(u&&typeof u=="object")return u}}catch{}throw new Error("Falha ao decodificar JSON da IA.")}var Ee=(()=>{try{let n=typeof localStorage<"u"?localStorage.getItem("easyquiz_cached_models"):null;if(!n)return null;let e=JSON.parse(n);if(Array.isArray(e)){let t=e.filter(o=>o&&typeof o.id=="string"&&ne(o.id));return t.length>0?t:null}return null}catch{return null}})(),Fe=new Set;async function Ve(n){let e=n.trim().replace(/^["']|["']$/g,"");if(!e)return xe;let t=[`https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(e)}`,`https://generativelanguage.googleapis.com/v1/models?key=${encodeURIComponent(e)}`];for(let o of t)try{let i=await fetch(o,{headers:{"Content-Type":"application/json","x-goog-api-key":e}});if(!i.ok){let s=await i.text(),r=je(s,i.status);if(r.includes("inv\xE1lida")||r.includes("n\xE3o autorizada"))throw new Error(r);continue}let a=await i.json();if(Array.isArray(a.models)&&a.models.length>0){let s=a.models.filter(r=>{let l=r.supportedGenerationMethods||[],c=(r.name||"").replace(/^models\//,""),u=l.includes("generateContent");return ne(c)&&u}).map(r=>{let l=r.supportedGenerationMethods||[],c=r.name.replace(/^models\//,""),u=r.displayName||c;return{id:c,name:u.includes(c)?u:`${u} (${c})`,description:r.description||"",stable:!/-preview|-experimental|-latest/i.test(c),supportsVision:!/embedding|tts|transcribe|live|image|sound|voice/i.test(c),supportsStructuredOutput:l.includes("generateContent"),supportedGenerationMethods:l,discoveredAt:Date.now()}});if(s.length>0){s.sort((r,l)=>{let c=u=>u==="gemini-3.8-flash"?200:u==="gemini-3.7-flash"?190:u==="gemini-3.6-flash"?180:u==="gemini-3.5-flash"?170:u==="gemini-3.5-flash-lite"?160:u==="gemini-2.5-flash"?130:u.includes("flash")?80:u==="gemini-2.5-pro"?60:u.includes("pro")?50:10;return c(l.id)-c(r.id)}),Ee=s;try{typeof localStorage<"u"&&localStorage.setItem("easyquiz_cached_models",JSON.stringify(s))}catch{}return s}}}catch(i){if(i.message?.includes("Chave de API"))throw i}return xe}async function vt(n,e){let t=e.map(c=>c.trim().replace(/^["']|["']$/g,"")).filter(c=>c.length>5);if(t.length===0)return{ok:!1,model:n,key:"",message:"Nenhuma chave dispon\xEDvel."};let o=Ue(yt(n)),i=JSON.stringify({contents:[{role:"user",parts:[{text:"PING"}]}],generationConfig:{maxOutputTokens:5}}),a={"Content-Type":"application/json"};async function s(c,u,p){let d=new AbortController,m=setTimeout(()=>d.abort(),p);try{let h=`https://generativelanguage.googleapis.com/v1beta/models/${u}:generateContent?key=${encodeURIComponent(c)}`,g=await fetch(h,{method:"POST",headers:{...a,"x-goog-api-key":c},body:i,signal:d.signal});if(clearTimeout(m),g.ok)return{ok:!0,model:u,key:c,message:`Modelo '${u}' validado com sucesso!`};let _=await g.text().catch(()=>"");throw new Error(`HTTP ${g.status}: ${_.slice(0,80)}`)}catch(h){throw clearTimeout(m),h}}if(t.length>=2){let c=t.slice(0,6);try{return await Promise.any(c.map(p=>s(p,o,8e3)))}catch{}}let r=t[0],l=[o,...Be.filter(c=>c!==o)];for(let c of l)try{let u=await s(r,c,4e3);return c!==o&&(u.message=`Modelo preferido indispon\xEDvel. Validado via fallback '${c}'.`),u}catch{}return{ok:!1,model:o,key:r,message:"Nenhum modelo Gemini respondeu. Verifique sua chave e cota."}}async function Wt(n,e,t,o,i,a){let s=["v1beta","v1"],r=new Error(`Falha ao consultar modelo ${n}`),c={...Vt(n,a)};for(let u of s){if(i.aborted)throw new Error("Opera\xE7\xE3o cancelada pelo usu\xE1rio.");let p=`https://generativelanguage.googleapis.com/${u}/models/${n}:generateContent?key=${encodeURIComponent(e)}`,d=Date.now();try{let m=await fetch(p,{method:"POST",headers:{"Content-Type":"application/json","x-goog-api-key":e},body:JSON.stringify({...t,generationConfig:c}),signal:i,keepalive:o});if(!m.ok){let _=await m.text();if(m.status===400){let v=/thinking/i.test(_),f=/response_schema|responseSchema|Repeated map key|PROTO payload/i.test(_);if((v||f)&&(c.thinkingConfig||c.responseSchema)){let b={...c};v&&delete b.thinkingConfig,f&&(delete b.responseSchema,delete b.responseMimeType),c=b;let E=await fetch(p,{method:"POST",headers:{"Content-Type":"application/json","x-goog-api-key":e},body:JSON.stringify({...t,generationConfig:c}),signal:i,keepalive:o});if(E.ok){let M=await E.json(),L=M.candidates?.[0];if(L?.content?.parts?.[0]?.text)return Y.markSuccess(e,Date.now()-d),{rawText:L.content.parts[0].text,data:M,usedModel:n,usedKey:e}}let T=await E?.text?.().catch(()=>"")??_,w=je(T,m.status);throw new Error(`[${n}|${re.maskKey(e)}] ${w}`)}}let y=je(_,m.status);if(m.status===404&&u==="v1beta")continue;throw m.status===429?Y.markQuotaHit(e,5e3):m.status===503||/no capacity|overloaded|unavailable/i.test(_)?(Y.markOverloaded(e,5e3),Fe.add(n)):m.status===403||/API_KEY_INVALID/i.test(_)?Y.markInvalid(e,y):m.status===404&&Fe.add(n),new Error(`[${n}|${re.maskKey(e)}] ${y}`)}let h=await m.json(),g=h.candidates?.[0];if(!g||!g.content?.parts?.[0]?.text)throw new Error(`[${n}|${re.maskKey(e)}] A IA n\xE3o retornou uma resposta estruturada v\xE1lida.`);return Y.markSuccess(e,Date.now()-d),{rawText:g.content.parts[0].text,data:h,usedModel:n,usedKey:e}}catch(m){if(i.aborted)throw m;r=m;let h=r.message||"";if(h.includes("404")||/no longer available/i.test(h)){Fe.add(n);break}}}throw r}var Ke=new Map;function _t(n){let e=Ke.get(n);return e===void 0?!1:Date.now()>e?(Ke.delete(n),!1):!0}function Yt(n,e=6e4){Ke.set(n,Date.now()+e)}async function xt(n,e,t,o,i,a){if(i?.aborted)throw new Error("Opera\xE7\xE3o cancelada pelo usu\xE1rio.");let s=Array.isArray(t.apiKeys)&&t.apiKeys.length>0?t.apiKeys:t.apiKey?[t.apiKey]:[];Y.init(s);let r=t.apiKey.trim().replace(/^[\"']|[\"']$/g,""),l=Y.getBestKey()||r;if(!l)throw new Error("Nenhuma chave de API do Gemini configurada ou dispon\xEDvel.");let c=yt(t.model);if(!Ee&&l&&Ve(l).catch(()=>{}),i?.aborted)throw new Error("Opera\xE7\xE3o cancelada pelo usu\xE1rio.");let u=Date.now(),p=De(n,e,t),d=[{text:p}];for(let C=0;C<e.length;C++){let I=e[C],D=I.associatedLabel||(I.alt?`Imagem: ${I.alt}`:`Imagem ${C+1}`);d.push({text:`[ANEXO VISUAL ${C+1} - V\xCDNCULO: ${D}]:`}),d.push({inline_data:{mime_type:I.mediaType,data:I.base64}})}let m={system_instruction:{parts:[{text:a?.systemPromptOverride??ve}]},contents:[{role:"user",parts:d}]},h=!0,g=Ue(c),_=ze?Ue(ze):null,y=[];_&&ne(_)&&_!==g&&y.push(_);for(let C of Be)C!==g&&!y.includes(C)&&y.push(C);let v=[];ne(g)&&v.push(g);for(let C of y)ne(C)&&!v.includes(C)&&v.push(C);v.length<2&&v.push(...Be.filter(C=>!v.includes(C)));let f=Y.getHealthyKeys().filter(C=>!_t(C.key)).sort((C,I)=>(C.lastLatencyMs??99999)-(I.lastLatencyMs??99999)),b=Y.getAllKeys().filter(C=>!_t(C.key)),E=f.length>0?f:b.map(C=>({key:C.key,lastLatencyMs:C.lastLatencyMs,label:C.label})),T=new Set;function w(C,I,D,te){let j=[];for(let R of I){for(let z of C){let X=`${z.key}::${R}`;!T.has(X)&&j.length<D&&(j.push({model:R,key:z.key,label:z.label||"Chave",timeout:te}),T.add(X))}if(j.length>=D)break}return j}let M=async(C,I)=>{if(I.length===0||i?.aborted)return null;let D=I.map(()=>new AbortController),te=()=>D.forEach(R=>{try{R.abort()}catch{}});i?.addEventListener("abort",te,{once:!0});let j=I.map(R=>`${R.model.replace("gemini-","")}/${R.label}`).join(" | ");o?.(`\u26A1 ${C}: ${I.length} slot(s) [${j}]...`,"info");try{let R=I.map(async(X,rt)=>{let $e=D[rt],st=setTimeout(()=>{try{$e.abort(new Error(`Timeout ${X.timeout/1e3}s (${X.model}|${X.label})`))}catch{$e.abort()}},X.timeout);try{let U=await Wt(X.model,X.key,m,h,$e.signal,a?.generationSchemaOverride);clearTimeout(st);let W=bt(Qt(U.rawText));return W.usedModel=U.usedModel,W.durationMs=Date.now()-u,W.promptSent=p,W.tokensUsed=U.data.usageMetadata?.totalTokenCount,W.promptTokens=U.data.usageMetadata?.promptTokenCount,W.candidatesTokens=U.data.usageMetadata?.candidatesTokenCount,W.rawResponse=U.rawText,D.forEach((lt,$t)=>{if($t!==rt)try{lt.abort(new Error("Cancelado: vencedor respondeu."))}catch{lt.abort()}}),{plan:W,rawUsage:U.data.usageMetadata,usedModel:U.usedModel,usedKey:U.usedKey,slotLabel:X.label}}catch(U){clearTimeout(st);let W=U instanceof Error?U.message:String(U);throw(W.includes("429")||W.includes("Quota")||W.includes("RESOURCE_EXHAUSTED"))&&Yt(X.key,6e4),U}}),z=await Promise.any(R);return i?.removeEventListener("abort",te),Y.markWinner(z.usedKey),z.usedModel!==g&&(ze=z.usedModel),z}catch(R){return i?.removeEventListener("abort",te),R instanceof AggregateError&&R.errors.length>0?Q=R.errors.map(z=>z instanceof Error?z.message:String(z)).join(" | "):R instanceof Error&&(Q=R.message),console.warn(`[EasyQuiz ${C}] Falha na onda:`,Q),null}},L=E.length,$=Math.min(Math.max(L,1),6),ee=/pro/i.test(g),A=(C,I)=>{let D=I?/pro/i.test(I):ee,te=I?/lite/i.test(I):/lite/i.test(g);return C===0?D?12e3:te?5e3:6e3:C===1?D?16e3:te?8e3:9e3:D?2e4:12e3},ae=6,N=0,Q="";for(;N<ae;){if(i?.aborted)throw new Error("Opera\xE7\xE3o cancelada pelo usu\xE1rio.");let C=v.find(R=>!Array.from(T).some(z=>z.startsWith(`${E[0]?.key}::${R}`)))??v[0],I=A(N,C),D=w(E,v,$,I);if(D.length===0)break;let te=N===0?"Onda 1":`Onda ${N+1}`,j=await M(te,D);if(j){let R=j.plan.durationMs||Date.now()-u,z=re.maskKey(j.usedKey);return o?.(`\u2705 ${R}ms via '${j.usedModel}' (${j.slotLabel}: ${z})`,"info"),j}N++}throw new Error(Q||"Todas as ondas falharam. Verifique sua cota e conex\xE3o com a internet.")}var de=['input:not([type="hidden"])',"textarea","select","button","a","label",'[role="button"]','[role="link"]','[role="radio"]','[role="checkbox"]','[role="option"]','[role="treeitem"]','[role="menuitemcheckbox"]','[role="menuitemradio"]','[contenteditable="true"]','[draggable="true"]',"[aria-grabbed]","[aria-dropeffect]","[data-widget-type]",".perseus-drag-item",".sortable-item",'[data-testid*="drag" i]','[data-testid*="card" i]','[data-testid*="option" i]','[data-testid*="choice" i]','[data-testid*="category" i]',"[data-choice]","[data-option]","[data-answer]","[data-value]",".quiz-option",".option-card",".choice-card",'[class*="option-card" i]','[class*="choice-card" i]','[class*="option-item" i]','[class*="choice-item" i]','[class*="answer-item" i]','[class*="alternative" i]','li[class*="choice" i]','li[class*="option" i]','li[class*="answer" i]','[data-role="dropzone"]',"[data-category]","[data-item-id]","[data-params][jsmodel]",'[class*="draggable-item" i]','[class*="drag-item" i]','[class*="sortable-card" i]','[class*="card-option" i]','[class*="tile" i][class*="option" i]'].join(","),_e=/(verificar|checar|check|conferir|validar|próxim[oa]|next|continuar|continue|avançar|prosseguir|enviar|submit|concluir|finalizar|terminar|começar|iniciar|start|vamos lá|próxima tarefa|next task|próxima pergunta|next question|marcar como concluíd[oa]|mostrar resumo|entendi|compreendi|ok|leitura concluída|seguir|ir para o exercício|fazer o teste|próximo artigo|ir para a aula)/i,se=/(\banterior\b|\bvoltar\b|\bback\b|\bprev\b|\bprevious\b|recomeçar|\brestart\b|\breplay\b|\bretornar\b)/i,Xt=0;function Ge(n){try{let e=n.closest('[hidden], [style*="display: none"], [style*="display:none"], [aria-hidden="true"]');if(e&&!ue(e))return!1}catch{}try{let e=window.getComputedStyle?window.getComputedStyle(n):n.style;if(e&&(e.display==="none"||e.visibility==="hidden"))return!1}catch{}try{if(typeof n.getBoundingClientRect=="function"){let e=n.getBoundingClientRect();if(e.width>0||e.height>0)return!0}}catch{}return(n.textContent||"").trim().length>0}function P(n){try{if(typeof CSS<"u"&&typeof CSS.escape=="function")return CSS.escape(n)}catch{}return String(n).replace(/["\\]/g,"\\$&")}function S(n){let e=n;if(!e||typeof e.isConnected=="boolean"&&!e.isConnected||ue(e))return!1;let t=e.tagName?.toLowerCase();if(["input","select","textarea","button"].includes(t)){let o=e.type?.toLowerCase();if(o==="checkbox"||o==="radio"){if(e.id)try{let a=e.ownerDocument?.querySelector(`label[for="${P(e.id)}"]`);if(a&&Ge(a))return!0}catch{}let i=e.closest('label, .option-card, .quiz-option, .choice, .answer, [role="radio"], [role="checkbox"], [class*="option" i], [class*="choice" i], [class*="item" i], li, tr');if(i&&i!==e&&Ge(i))return!0}try{if(!e.closest('[hidden], [style*="display: none"], [style*="display:none"], [aria-hidden="true"]')){let a=window.getComputedStyle?window.getComputedStyle(e):e.style;if(!a||a.display!=="none"&&a.visibility!=="hidden"){if(typeof e.getBoundingClientRect=="function"){let s=e.getBoundingClientRect();if(s.width>0||s.height>0)return!0}return!0}}}catch{}}return Ge(e)}function Jt(n){if(n==null)return"";if(typeof n=="string")return n;if(typeof n=="number"||typeof n=="boolean")return String(n);if(n instanceof Node)return n.textContent||"";try{if(typeof n?.toString=="function"){let e=n.toString();if(typeof e=="string")return e}}catch{}return""}function O(n,e=500){return Jt(n).replace(/\s+/g," ").trim().slice(0,e)}function Zt(n){let e=n.dataset.easyquizId;if(e)return e;let t=`eq-${Date.now().toString(36)}-${(Xt+=1).toString(36)}`;return n.dataset.easyquizId=t,t}function ue(n){return n?!!(n.closest('#easyquiz-shadow-root, .eq-sidebar, .eq-launcher, [data-easyquiz-ignore="true"], .btn-inject-eq, #btn-inject-script')||n.getAttribute?.("data-easyquiz-ignore")==="true"):!1}var be=/(leaderboard|scoreboard|placar|ranking|trophy|pause|pausar|mute|mutar|audio|sound|som|música|music|configuraç|settings|theme|ajuda|help|report|denunciar|feedback|power-?up|streak|coins|fullscreen|full-screen|read-?aloud|audio-?player|(?:audio|sound|som|media)[-_ ]*volume|volume[-_ ]*(?:slider|control|level|btn|button|icon|mute)|vol-slider)/i;function H(n){if(!n||typeof n.getAttribute!="function"||typeof Element<"u"&&!(n instanceof Element))return!1;if(ue(n))return!0;let e=n.tagName?.toLowerCase();if(["select","textarea"].includes(e)||e==="input"&&!["button","submit","reset"].includes((n.type||"").toLowerCase()))return!1;let o=n.closest?.('button, a, [role="button"], [class*="leaderboard" i], [data-testid*="leaderboard" i], [class*="scoreboard" i], [class*="trophy" i]')||n,i=String(o.getAttribute?.("data-testid")||o.getAttribute?.("data-test-id")||o.getAttribute?.("id")||""),a=String(o.getAttribute?.("aria-label")||""),s=String(o.getAttribute?.("title")||""),r=typeof o.className=="string"?o.className:typeof o.className?.baseVal=="string"?o.className.baseVal:"",l=O(o.textContent,60);return!!(be.test(i)||be.test(a)||be.test(s)||be.test(r)||l.length>0&&l.length<=25&&be.test(l))}function V(n){if(!n||typeof n.getAttribute!="function"||typeof Element<"u"&&!(n instanceof Element)||ue(n)||H(n)||n.closest?.('.option-card, .choice-card, .quiz-option, [class*="option-card" i], [class*="choice-card" i], [class*="option-item" i], [class*="choice-item" i], [class*="answer-item" i], [data-testid*="option" i], [data-testid*="choice" i], [data-choice], [data-option], [data-answer], [role="radio"], [role="checkbox"], [role="option"]')||n.closest?.("header, nav, aside"))return!1;let e=typeof HTMLInputElement<"u"&&n instanceof HTMLInputElement||typeof HTMLButtonElement<"u"&&n instanceof HTMLButtonElement?n.value:"",t=O(n.getAttribute?.("aria-label")||n.textContent||n.getAttribute?.("value")||e),o=n.type,i=t.replace(/[\d\(\)\[\]\u2192>\u2022\-\/\\]+/g," ").trim(),a=String(n.getAttribute?.("data-testid")||n.getAttribute?.("data-test-id")||n.getAttribute?.("id")||n.getAttribute?.("href")||"").toLowerCase();return se.test(i)||se.test(t)?!1:_e.test(i)||_e.test(t)||a.includes("next")||a.includes("check")||a.includes("continue")||a.includes("proximo")||a.includes("forward")?!0:/^\d{1,3}$/.test(t.trim())?!!n.closest?.('[class*="pagination" i], [class*="pager" i], [class*="page-nav" i], [class*="step-indicator" i], [class*="breadcrumb" i], [aria-label*="p\xE1gina" i], [aria-label*="page" i], [role="navigation"], nav, [class*="steps" i]'):!1}function Qe(n){let e=n.closest("tr");if(e){let l=e.querySelector("th, td:first-child"),c=l&&l!==n.closest("td")?O(l.textContent,100):"",u=O(n.closest("label, td")?.textContent||"",50);if(c&&u)return`${c}: ${u}`}let t=n.closest('.dropdown-row, [class*="dropdown-row" i], [class*="select-row" i]');if(t){let l=t.querySelector('.dropdown-label, [class*="label" i]'),c=l&&l!==n?O(l.textContent,150):"";if(c)return c}let o=n.getAttribute("aria-label");if(o)return O(o);let i=n.getAttribute("aria-labelledby");if(i){let l=i.split(/\s+/).map(c=>document.getElementById(c)?.textContent).filter(Boolean).join(" ");if(l.trim())return O(l)}if("labels"in n&&n.labels){let l=Array.from(n.labels??[]).map(c=>c.textContent).join(" ");if(l.trim())return O(l)}let a=n.closest('.docssharedWizToggleLabeledContainer, [role="listitem"], .answer, label, .quiz-option, .form-check, .option-card');if(a&&a!==n){let l=O(a.textContent);if(l)return l}let s=n instanceof HTMLInputElement||n instanceof HTMLButtonElement?n.value:"",r=n.getAttribute("placeholder")||n.getAttribute("title")||n.textContent||s||"";return O(r)}function We(n,e){let o=typeof HTMLSelectElement<"u"&&n instanceof HTMLSelectElement||n.tagName.toLowerCase()==="select"?n:null,i=n;n.dataset.easyquizRole=e;let a=n.tagName.toLowerCase(),s=["input","textarea","select","button"].includes(a)?a:"other",r=n.getAttribute("role")||"",l=(n.getAttribute("data-testid")||n.getAttribute("data-test-id")||"").toLowerCase(),c=(n.className&&typeof n.className=="string"?n.className:"").toLowerCase(),u=n.getAttribute("draggable")==="true"||n.classList.contains("perseus-drag-item")||n.classList.contains("sortable-item")||c.includes("cursor-grab")||!!n.getAttribute("aria-grabbed")||/drag|card|option|item/i.test(l)||/drag|card-item|sortable/i.test(c),p=n.getAttribute("data-role")==="dropzone"||n.classList.contains("category-container")||n.hasAttribute("data-category")||!!n.getAttribute("aria-dropeffect")||/drop|category|bucket/i.test(l)||/dropzone|category-box|bucket|target-zone/i.test(c),m=O((u?"draggable":p?"dropzone":"")||i.type||r||s,40),h="";if(i.type==="checkbox"||i.type==="radio"||r==="radio"||r==="checkbox"){let b=i.checked||n.getAttribute("aria-checked")==="true",E=i.value&&i.value!=="on"?i.value:n.getAttribute("data-value")||"";h=b?E?`checked:${E}`:"checked":E||"unchecked"}else if(s==="button"||a==="a"||e==="navigation"||V(n))h="";else{let b=typeof n.value=="string"||typeof n.value=="number"?n.value:"";h=O(b||n.getAttribute("data-category")||"",2e3)}let g=[];if(o&&o.options)for(let b of Array.from(o.options).slice(0,80))g.push({value:O(b.value),label:O(b.textContent)});else if(r==="combobox"||r==="listbox"||c.includes("select")||c.includes("dropdown")){let b=n.getAttribute("aria-controls")||n.getAttribute("aria-owns"),E=b?document.getElementById(b):n;if(E){let T=E.querySelectorAll('[role="option"], li, .dropdown-item, .option');for(let w of Array.from(T).slice(0,80)){let M=O(w.textContent);M&&g.push({value:w.getAttribute("data-value")||w.getAttribute("value")||M,label:M})}}}let _=!!(i.required||n.getAttribute("aria-required")==="true"),y=!!(i.disabled||n.getAttribute("aria-disabled")==="true"),v=Zt(n);return{id:n.id||v,tag:s,type:m,label:Qe(n),name:O(i.name||n.getAttribute("name")||"",180),value:h,options:g,required:_,disabled:y,role:e}}var Et=['[data-test-id*="exercise" i]','[data-testid*="exercise" i]',".perseus-renderer",".framework-perseus",".Qr7Oae","[data-item-id]",".freebirdFormviewerViewItemsItemItem",".que",".question-holder",".quiz-question",".question_holder",".display_question",'[data-functional-selector*="question"]',".question-container",'[class*="classification-layout" i]','[class*="quiz-container" i]','[data-cy="quiz-container"]',"[data-question-id]",'[data-testid*="question" i]','[class*="question-container" i]','[class*="question" i]','[class*="pergunta" i]','[class*="categoriz" i]',"article","form","section","main"].join(",");function wt(n){if(!S(n))return-1/0;let e=n.getBoundingClientRect(),t=Array.from(n.querySelectorAll(de)).filter(S),o=O(n.innerText||n.textContent||"",4e3).length;if(o<10||!t.length&&o<60)return-1/0;let i=Math.max(1,window.innerWidth*window.innerHeight),a=Math.max(1,e.width*e.height),s=Math.min(1,a/i),r=e.top+e.height/2,l=Math.abs(r-window.innerHeight/2)/Math.max(1,window.innerHeight),c=o>40?35:0,u=e.top>=0&&e.bottom<=window.innerHeight?25:0;return t.length*15+Math.min(60,o/20)+c+u-s*20-l*10}function we(n){let e=n;if(e.matches?.('article, [data-test-id*="exercise" i], [data-testid*="exercise" i], .perseus-renderer, .framework-perseus, [class*="question-container" i], .que')&&e.tagName.toLowerCase()!=="main"&&e.tagName.toLowerCase()!=="body")return e;for(;e.parentElement&&e.parentElement!==document.body&&e.parentElement!==document.documentElement;){let t=e.parentElement,o=t.tagName.toLowerCase();if(["header","footer","nav","aside"].includes(o))break;if(t.matches?.('article, [data-test-id*="exercise" i], [data-testid*="exercise" i], .perseus-renderer, .framework-perseus, [class*="question-container" i], .que')&&o!=="main"&&o!=="body"){e=t;break}let i=O(e.innerText||e.textContent||"",1e4),a=O(t.innerText||t.textContent||"",1e4),s=e.querySelectorAll(de).length,r=t.querySelectorAll(de).length;if(i.length<150&&a.length>i.length&&r<=s+4&&o!=="main"&&o!=="body"){e=t;continue}break}return e}function St(n){let e=n,t=e.closest('main, [role="main"], article, form, [data-test-id*="exercise" i], [data-testid*="exercise" i], .framework-perseus, section');if(t&&t!==document.body&&S(t))return t;let o=0;for(;e.parentElement&&e.parentElement!==document.body&&o<3;)e=e.parentElement,o++;return e||document.body}function G(){let n=document.querySelector('[class*="classification-layout" i], [class*="quiz-container" i][class*="classification" i]');if(n&&S(n))return n;let e=document.activeElement;if(e&&e!==document.body){let s=e.closest(Et);if(s&&wt(s)>0)return we(s)}let o=Array.from(document.querySelectorAll(Et)).map(s=>({element:s,score:wt(s)})).filter(s=>Number.isFinite(s.score)).sort((s,r)=>r.score-s.score),i=o.find(s=>{let r=s.element.tagName.toLowerCase();return r!=="main"&&r!=="body"&&s.score>0});if(i)return we(i.element);if(o.length>0&&o[0].score>0)return we(o[0].element);let a=document.querySelector('form, main, [role="main"]');return a&&S(a)?a:document.body}function Tt(n){let e=n.cloneNode(!0);e.querySelectorAll("script, style, iframe, object, embed, svg, canvas, noscript, audio, video").forEach(o=>o.remove());let t=["type","name","value","role","aria-label","aria-labelledby","aria-checked","aria-required","required","disabled","data-easyquiz-id","draggable","class","id","data-widget-type","data-role","data-category","data-testid"];return e.querySelectorAll("*").forEach(o=>{for(let i of Array.from(o.attributes))t.includes(i.name)||o.removeAttribute(i.name)}),e.outerHTML.replace(/\s+/g," ").slice(0,2e4)}function Se(n){let e=Array.from(n.querySelectorAll(de)),t=new Set,o=[];for(let l of e){if(!S(l)||V(l)||H(l))continue;let c=(l.value||l.textContent||"").trim();if(se.test(c))continue;let u=l.tagName.toLowerCase();["input","textarea","select"].includes(u)&&(t.add(l),o.push(l))}for(let l of e){if(!S(l)||V(l)||H(l))continue;let c=(l.value||l.textContent||"").trim();if(se.test(c))continue;let u=l.tagName.toLowerCase();if(["input","textarea","select"].includes(u))continue;let p=l.querySelector("input, textarea, select");if(!(p&&t.has(p))){if(l.hasAttribute("for")){let d=l.getAttribute("for"),m=d?l.ownerDocument.getElementById(d):null;if(m&&t.has(m))continue}if(u==="a"){let d=l.getAttribute("role"),m=l.getAttribute("class")||"",h=l.getAttribute("data-testid")||"",g=l.getAttribute("draggable")==="true"||l.classList.contains("perseus-drag-item")||l.classList.contains("sortable-item")||m.includes("cursor-grab")||!!l.getAttribute("aria-grabbed")||/drag|card|option|item/i.test(h)||/drag|card-item|sortable/i.test(m);if(!(d==="button"||d==="radio"||d==="checkbox"||d==="option"||g||l.closest('[class*="choice" i], [class*="option" i], [class*="answer" i], [data-testid*="option" i]')))continue}o.push(l)}}let i=o.length>0&&o.every(l=>H(l)||/read-?aloud|audio/i.test(l.getAttribute("data-testid")||l.getAttribute("aria-label")||"")),a=document.body.querySelector('[class*="classification-layout" i]')||document.body.querySelector('[class*="classification" i]')||n,s=document.body.querySelector('[class*="classification" i]')!==null||n.querySelector('[class*="classification" i]')!==null||n.querySelector('[data-cy*="quiz" i]')!==null||n.querySelector('[class*="draggable-item" i]')!==null||n.querySelector('[class*="drag-item" i]')!==null||n.querySelector('[class*="sortable-card" i]')!==null||n.matches?.('[class*="classification" i]');if((o.length===0||i)&&s){i&&(o.length=0);let l=Array.from(a.querySelectorAll('[class*="cursor-grab"][id], [draggable="true"][id], .dnd-card[id]'));if(l.length>0){for(let c of l)if(!(!S(c)||H(c))&&(o.push(c),o.length>=50))break}else{let c=Array.from(a.querySelectorAll("button, div[class], span[class], p, li"));for(let u of c){if(!S(u)||V(u)||H(u)||se.test((u.textContent||"").trim()))continue;let p=(u.textContent||"").trim();if(p.length<2||p.length>300)continue;if(Array.from(u.children).some(m=>m.className&&m.textContent?.trim())||o.push(u),o.length>=50)break}}}let r=o.length>0&&o.every(l=>{let c=(l.textContent||"").trim();return!l.id||c.length<10||/^\d+\s*\/\s*\d+$/.test(c)||/^question text/i.test(c)});if(o.length===0||r){r&&(o.length=0);let l=Array.from(document.body.querySelectorAll('[class*="cursor-pointer"][id]'));if(l.length>0)for(let c of l){if(!S(c)||ue(c)||V(c)||H(c)||se.test((c.textContent||"").trim()))continue;let u=(c.textContent||"").trim();if(!(u.length<10||u.length>500)&&!/^\d+\s*\/\s*\d+$/.test(u)&&(o.push(c),o.length>=20))break}}return o.slice(0,100).map(l=>We(l,"answer"))}function Ye(n){let e=[n,n.parentElement,n.parentElement?.parentElement,document.body].filter(Boolean),t=new Set,o=[];for(let i of e)for(let a of Array.from(i.querySelectorAll(de)))if(!(t.has(a)||!S(a)||!V(a)||H(a))&&(t.add(a),o.push(We(a,"navigation")),o.length>=10))return o;return o}function At(n=!1){let e=G();e=we(e),n&&(e=St(e));let t=Se(e),o=Ye(e);if(t.length===0){let r=Se(document.body);r.length>0&&(e=St(e),t=Se(e),t.length===0&&(t=r,e=document.querySelector('main, article, form, [role="main"]')||document.body))}o.length===0&&(o=Ye(document.body));let i=e.innerText&&e.innerText.trim().length>0?e.innerText:e.textContent||"",a=i.length>4e4?O(i.slice(0,8e3),8e3)+`
[...conte\xFAdo extenso truncado...]
`+O(i.slice(-2e3),2e3):O(i,16e3),s=[...t,...o].slice(0,120);return!a||s.length===0&&a.length<30?O(document.body.innerText||document.body.textContent||"",16e3).length>=30?Xe():null:{sourceUrl:window.location.href.slice(0,2e3),pageTitle:document.title.slice(0,500)||"P\xE1gina de Quest\xE3o",questionText:a,htmlSnippet:Tt(e),controls:s,scope:e}}function Xe(){let n=document.body.innerText||document.body.textContent||document.documentElement.textContent||"",e=O(n,16e3),t=Se(document.body),o=Ye(document.body),i=[...t,...o].slice(0,120),a=document.querySelector('main, article, form, [role="main"], [data-test-id*="content" i], [class*="content" i]')||document.body;return{sourceUrl:window.location.href.slice(0,2e3),pageTitle:document.title.slice(0,500)||"P\xE1gina de Quest\xE3o",questionText:e,htmlSnippet:Tt(a).slice(0,15e3),controls:i,scope:a}}var Je=10,en=1400,Ze=15e5;function pe(n){return new Promise((e,t)=>{let o=new FileReader;o.onerror=()=>t(new Error("Falha ao converter blob para base64.")),o.onload=()=>{let i=String(o.result||"");e(i.split(",")[1]||"")},o.readAsDataURL(n)})}async function ye(n){let e=0,t=0;if(n instanceof HTMLImageElement?(e=n.naturalWidth||n.width,t=n.naturalHeight||n.height):(e=n.width,t=n.height),e<=0||t<=0)throw new Error("Dimens\xF5es inv\xE1lidas.");let o=Math.min(1,en/Math.max(e,t)),i=Math.max(1,Math.round(e*o)),a=Math.max(1,Math.round(t*o)),s=document.createElement("canvas");s.width=i,s.height=a;let r=s.getContext("2d",{alpha:!1});if(!r)throw new Error("Sem suporte a Canvas 2D.");return r.fillStyle="#ffffff",r.fillRect(0,0,i,a),r.drawImage(n,0,0,i,a),new Promise((l,c)=>{s.toBlob(u=>u?l(u):c(new Error("Falha na compress\xE3o.")),"image/jpeg",.88)})}async function tn(n){let e=typeof n.getBoundingClientRect=="function"?n.getBoundingClientRect():{width:0,height:0},t=e.width||parseFloat(n.getAttribute("width")||"0")||parseFloat(n.style.width||"0")||400,o=e.height||parseFloat(n.getAttribute("height")||"0")||parseFloat(n.style.height||"0")||300,i=2,a=Math.min(1800,Math.max(120,Math.round(t*i))),s=Math.min(1800,Math.max(100,Math.round(o*i))),r=n.cloneNode(!0);r.getAttribute("xmlns")||r.setAttribute("xmlns","http://www.w3.org/2000/svg"),r.setAttribute("width",String(a)),r.setAttribute("height",String(s)),!r.getAttribute("viewBox")&&t>0&&o>0&&r.setAttribute("viewBox",`0 0 ${t} ${o}`);let c=new XMLSerializer().serializeToString(r),u=new Blob([c],{type:"image/svg+xml;charset=utf-8"}),p=URL.createObjectURL(u);try{let d=new Image;d.crossOrigin="anonymous",await new Promise((g,_)=>{d.onload=()=>g(),d.onerror=()=>_(new Error("Falha ao renderizar SVG em Image.")),d.src=p});let m=document.createElement("canvas");m.width=a,m.height=s;let h=m.getContext("2d",{alpha:!1});if(!h)throw new Error("Sem suporte a Canvas 2D.");return h.fillStyle="#ffffff",h.fillRect(0,0,a,s),h.drawImage(d,0,0,a,s),new Promise((g,_)=>{m.toBlob(y=>y?g(y):_(new Error("Falha na compress\xE3o do SVG.")),"image/jpeg",.92)})}finally{URL.revokeObjectURL(p)}}async function et(n){try{let e=n.cloneNode(!0),t=n.offsetWidth||500,o=n.offsetHeight||500,i=`
      <svg xmlns="http://www.w3.org/2000/svg" width="${t}" height="${o}">
        <foreignObject width="100%" height="100%">
          <div xmlns="http://www.w3.org/1999/xhtml" style="background:#fff;font-family:sans-serif;">
            ${e.innerHTML}
          </div>
        </foreignObject>
      </svg>
    `,a=new Blob([i],{type:"image/svg+xml;charset=utf-8"}),s=URL.createObjectURL(a),r=new Image;r.crossOrigin="anonymous",await new Promise((u,p)=>{r.onload=()=>u(),r.onerror=()=>p(new Error("Falha ao renderizar ForeignObject.")),r.src=s});let l=await ye(r),c=await pe(l);if(URL.revokeObjectURL(s),c&&c.length<=Ze)return{mediaType:"image/jpeg",base64:c,alt:"Captura via rasteriza\xE7\xE3o DOM",source:"rasterized"}}catch(e){console.warn("Falha na rasteriza\xE7\xE3o do n\xF3:",e)}return null}function nn(n,e){let t=n.closest('[data-easyquiz-id], button, [role="button"], [role="radio"], [role="checkbox"], [role="option"], label, .option-card, .quiz-option, .choice, .answer, [class*="option" i], [class*="choice" i], [class*="answer" i], li, tr');if(t&&t!==e&&S(t)&&!V(t)&&!H(t)){let a=t.dataset.easyquizId||t.id||void 0,s=O(t.innerText||t.textContent||"",120),r=t.getAttribute("aria-label")||t.getAttribute("title")||"",l=s||r,c=a?` [id: ${a}]`:"";if(l)return{associatedLabel:`Alternativa/Op\xE7\xE3o: "${l}"${c}`,targetControlId:a};if(a)return{associatedLabel:`Alternativa/Op\xE7\xE3o ${c}`,targetControlId:a}}let o=n.closest("figure")?.querySelector("figcaption")?.textContent?.trim();if(o)return{associatedLabel:`Figura do Enunciado: "${O(o,100)}"`};let i=n.closest('[class*="prompt" i], [class*="stimulus" i], [class*="question-text" i], [class*="statement" i], header, h1, h2, h3, h4, p');if(i){let a=O(i.textContent||"",80);if(a)return{associatedLabel:`Gr\xE1fico do Enunciado: "${a}"`}}return{associatedLabel:"Gr\xE1fico/Imagem do Enunciado Principal"}}async function on(n){let e=n.currentSrc||n.src;if(!e)return null;let t=(n.alt||n.getAttribute("aria-label")||"Imagem da quest\xE3o").slice(0,500);if(n.complete&&n.naturalWidth>0)try{let o=await ye(n),i=await pe(o);if(i&&i.length<=Ze)return{mediaType:"image/jpeg",base64:i,alt:t,source:e.slice(0,2e3)}}catch{}try{let o=await fetch(e,{mode:"cors"});if(o.ok){let i=await o.blob();if(i.type.startsWith("image/")){let a=await createImageBitmap(i),s=await ye(a);a.close();let r=await pe(s);if(r&&r.length<=Ze)return{mediaType:"image/jpeg",base64:r,alt:t,source:e.slice(0,2e3)}}}}catch{return et(n.parentElement||n)}return null}function an(n){return n.querySelectorAll("path, line, polyline, polygon, circle, rect, text, image").length>0}function rn(n){try{let e=n.style.backgroundImage||(window.getComputedStyle?window.getComputedStyle(n).backgroundImage:"");if(e&&e.includes("url(")){let t=e.match(/url\(["']?([^"')]+)["']?\)/);if(t&&t[1]&&!t[1].startsWith("data:image/svg+xml"))return t[1]}}catch{}return null}async function kt(n,e=!0){if(!e)return[];let t=[],o=0,i=35e5,a=(l,c)=>{if(!l||!l.base64||o+l.base64.length>i)return!1;let u=nn(c,n);return l.associatedLabel=u.associatedLabel,l.targetControlId=u.targetControlId,l.element=c,t.push(l),o+=l.base64.length,t.length>=Je},s=Array.from(n.querySelectorAll("img")).filter(l=>S(l)&&!H(l));for(let l of s)try{let c=await on(l);if(a(c,l))return t}catch{}let r=Array.from(n.querySelectorAll("svg")).filter(l=>{if(!S(l)||H(l))return!1;let c=typeof l.getBoundingClientRect=="function"?l.getBoundingClientRect():{width:0,height:0},u=c.width||parseFloat(l.getAttribute("width")||"0"),p=c.height||parseFloat(l.getAttribute("height")||"0");return u<30||p<30?!1:an(l)});for(let l of r)try{let c=await tn(l),u=await pe(c);if(u){let p={mediaType:"image/jpeg",base64:u,alt:l.getAttribute("aria-label")||"Gr\xE1fico/Diagrama vetorial da quest\xE3o",source:"svg"};if(a(p,l))return t}}catch{let c=await et(l.parentElement||l);if(a(c,l))return t}if(t.length<Je){let l=Array.from(n.querySelectorAll("canvas")).filter(c=>S(c)&&!H(c));for(let c of l)try{let u=await ye(c),p=await pe(u);if(p){let d={mediaType:"image/jpeg",base64:p,alt:c.getAttribute("aria-label")||"Gr\xE1fico Canvas inline",source:"canvas"};if(a(d,c))return t}}catch{let u=await et(c.parentElement||c);if(a(u,c))return t}}if(t.length<Je){let l=Array.from(n.querySelectorAll('[style*="background-image"], .option-image, .question-media')).filter(c=>S(c)&&!H(c));for(let c of l){let u=rn(c);if(u)try{let p=await fetch(u,{mode:"cors"});if(p.ok){let d=await p.blob();if(d.type.startsWith("image/")){let m=await createImageBitmap(d),h=await ye(m);m.close();let g=await pe(h);if(g){let _={mediaType:"image/jpeg",base64:g,alt:"Imagem de fundo da alternativa",source:u.slice(0,2e3)};if(a(_,c))return t}}}}catch{}}}return t}var sn=[/\bfetch\b/i,/\bXMLHttpRequest\b/i,/\bWebSocket\b/i,/\b(?:localStorage|sessionStorage|indexedDB)\b/i,/\b(?:eval|Function|AsyncFunction|GeneratorFunction)\b/i,/\bimport(?:Scripts)?\b/i,/\bnavigator\s*\.\s*credentials\b/i,/\b(?:cookie|location\s*=|history\s*\.)/i,/\bwindow\s*\[\s*['"](?:fetch|eval|Function|localStorage|sessionStorage)/i];function tt(n){let e=n?.engine||"smart",t=new Set(["dom","framework","keyboard","drag"]);return n?.autoAdvance&&t.add("navigation"),e==="javascript"&&t.add("javascript"),{engine:e,capabilities:t,maxAttemptsPerAction:e==="command"?1:2,maxActionMs:e==="command"?1500:3e3,allowJavaScript:e==="javascript",allowNavigation:!!n?.autoAdvance}}function nt(n,e){if(n.t==="js"&&!e.allowJavaScript)throw new Error("A\xE7\xE3o JavaScript bloqueada pela engine atual. Use o motor JavaScript explicitamente.");if(n.t==="adv"&&!e.allowNavigation)throw new Error("Avan\xE7o autom\xE1tico bloqueado pela pol\xEDtica atual.")}function Mt(n){if(!n.trim())throw new Error("JavaScript recusado: c\xF3digo vazio.");if(n.length>8e3)throw new Error("JavaScript recusado: c\xF3digo acima do limite operacional.");if(sn.find(t=>t.test(n)))throw new Error("JavaScript recusado: acesso externo, persist\xEAncia ou avalia\xE7\xE3o din\xE2mica n\xE3o permitidos.");if(!/^\s*(?:\/\/[^\n]*\n|\/\*[\s\S]*?\*\/|[\s\S])*\$eq\./.test(n)&&!n.includes("$eq."))throw new Error("JavaScript recusado: use somente a API declarativa $eq.")}function q(n){return n?!!(n.closest('#easyquiz-shadow-root, .eq-sidebar, .eq-launcher, [data-easyquiz-ignore="true"], .btn-inject-eq, #btn-inject-script')||n.getAttribute?.("data-easyquiz-ignore")==="true"):!1}function x(n){return n==null?"":(typeof n=="string"?n:String(n)).replace(/^(\([0-9a-zA-Z]{1,2}\)|[0-9]{1,3}|[a-zA-Z])[\.\)\-\:]\s+/,"").replace(/[\.\u2026]{2,}/g," ").replace(/['"“”«»]/g,"").replace(/\s+/g," ").trim()}function B(n){if(!n||n instanceof HTMLInputElement||n instanceof HTMLSelectElement||n instanceof HTMLTextAreaElement||n.getAttribute("draggable")==="true"||n.classList.contains("dnd-card")||n.hasAttribute("data-category")||n.hasAttribute("data-dropzone"))return n;if(n.hasAttribute("for")){let o=n.getAttribute("for");if(o){let i=n.ownerDocument.getElementById(o);if(i)return i}}let e=n.closest('label, .option-card, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, td, li, .dnd-card, [class*="option-card" i], [class*="choice-card" i], .dropdown-row, [class*="dropdown" i], [class*="select-row" i]');if(e&&!["article","section","main","form","body"].includes(e.tagName.toLowerCase())){let o=e.getAttribute("for"),a=(o?e.ownerDocument.getElementById(o):null)||e.querySelector('input:not([type="hidden"]), select, textarea');return a||e}let t=n.closest('button, a, [role="button"], [draggable="true"]');if(t)return t;if(["body","html","main","section","article","form"].includes(n.tagName.toLowerCase())){let o=n.querySelector('button, [role="button"], a, input:not([type="hidden"]), select, textarea, [role="radio"], [role="checkbox"], .option-card, label');if(o)return B(o)}return n}function Ct(n){let e=n;if(!e||!document.contains(e))try{e=G()}catch{}e=e||document.body;let t=i=>{let a=Array.from(i.querySelectorAll("tr")).filter(u=>S(u)&&u.querySelector('input[type="radio"], input[type="checkbox"]'));if(a.length>1)return a;let s=Array.from(i.querySelectorAll('input[type="checkbox"], input[type="radio"], [role="checkbox"], [role="radio"]')).filter(u=>S(u)&&!q(u));if(s.length>0)return s;let l=Array.from(i.querySelectorAll('.option-card, [role="option"], [class*="choice-card" i], [class*="option-card" i], li[class*="choice" i], li[class*="option" i]')).filter(u=>S(u)&&!q(u)).filter(u=>!u.parentElement?.closest('.option-card, [role="option"], [class*="choice-card" i], [class*="option-card" i]'));return l.length>0?l:Array.from(i.querySelectorAll('[class*="classification" i] [class], [class*="draggable-item" i], [class*="drag-item" i], [class*="sortable-card" i]')).filter(u=>{let p=u;return S(p)&&!q(p)&&(p.textContent||"").trim().length>2&&!V(p)&&!H(p)&&!p.querySelector("[class]")})},o=t(e);return o.length>0?o:e!==document.body?t(document.body):[]}function k(n,e,t=!1){if(n==null)return null;let i=(typeof n=="string"?n:String(n)).trim().replace(/^["'“”«»]+|["'“”«»]+$/g,"");if(!i)return null;let a=P(i),s=document.querySelector(`[data-easyquiz-id="${a}"]`);if(s&&!q(s))return B(s);try{let d=document.getElementById(i);if(d&&S(d)&&!q(d))return d.hasAttribute("data-category")||d.hasAttribute("data-dropzone")||d.classList.contains("dnd-zone")?d:B(d)}catch{}try{let d=document.querySelector(`[data-item-id="${a}"]`);if(d&&S(d)&&!q(d))return B(d)}catch{}let r=i.match(/^(?:item|opção|opcao|afirmação|afirmacao|alternativa|linha|afirmativa|questão|questao|campo|blank|lacuna|input|resposta)?\s*#?_?([0-9]+)$/i);if(r){let d=parseInt(r[1],10);if(t){let h=document.body;try{h=G()||document.body}catch{}let g=Array.from(h.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, select, [contenteditable="true"]')).filter(_=>S(_)&&!q(_));if(d>=1&&d-1<g.length)return g[d-1];if(d===0&&g.length>0)return g[0]}let m=d-1;if(m>=0){let h=Ct();if(m<h.length){let y=h[m];if(y.tagName.toLowerCase()==="tr"){if(e){let f=y.querySelector(`input[value="${P(e)}" i], [data-value="${P(e)}" i]`);if(f)return f}let v=y.querySelector("input");if(v)return v}return B(y)}let g=document.body;try{g=G()||document.body}catch{}let _=Array.from(g.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, select, [contenteditable="true"]')).filter(y=>S(y)&&!q(y));if(m<_.length)return _[m]}}let l=i.match(/^(?:item|opção|opcao|afirmação|afirmacao|alternativa|linha|afirmativa|questão|questao)?\s*#?([a-eA-E])$/i);if(l){let d=l[1].toUpperCase().charCodeAt(0)-65;if(d>=0){let m=Ct();if(d<m.length){let h=m[d];if(h.tagName.toLowerCase()==="tr"){if(e){let _=h.querySelector(`input[value="${P(e)}" i], [data-value="${P(e)}" i]`);if(_)return _}let g=h.querySelector("input");if(g)return g}return B(h)}}}if(/^[a-zA-Z0-9_-]{1,10}$/.test(i)){let m=Array.from(document.querySelectorAll(`[data-category="${a}" i], [data-dropzone="${a}" i], [data-role="dropzone"][data-category="${a}" i]`)).find(y=>S(y)&&!q(y));if(m)return m;let g=Array.from(document.querySelectorAll(`input[value="${a}" i], [data-value="${a}" i], input[id="${a}" i], input[placeholder="${a}" i], textarea[placeholder="${a}" i], [title="${a}" i]`)).find(y=>S(y)&&!q(y));if(g)return B(g);let _=Array.from(document.querySelectorAll('.option-badge, [class*="badge" i], [class*="letter" i], .option-card span, label span')).find(y=>{if(!S(y)||q(y))return!1;let v=x(y.textContent).toLowerCase();return v===i.toLowerCase()||v===i.toLowerCase()+")"});if(_)return B(_)}try{let m=Array.from(document.querySelectorAll(`[name="${a}"], [value="${a}"], [placeholder="${a}" i], [title="${a}" i], [data-category="${a}" i], [data-dropzone="${a}" i], [data-testid="${a}" i], [data-test-id="${a}" i], [aria-label="${a}" i]`)).find(h=>S(h)&&!q(h));if(m)return m.hasAttribute("data-category")||m.hasAttribute("data-dropzone")||m.classList.contains("dnd-zone")?m:B(m)}catch{}if(/^[.#\[]|\s|[>+~:]/.test(i))try{let m=Array.from(document.querySelectorAll(i)).find(h=>S(h)&&!q(h));if(m)return B(m)}catch{}try{let d=i.replace(/"/g,""),m=`//button[normalize-space(.)="${d}"] | //a[normalize-space(.)="${d}"] | //*[not(*) and normalize-space(.)="${d}"] | //*[@aria-label="${d}"] | //*[@data-category="${d}"] | //*[@data-testid="${d}"]`,h=document.evaluate(m,document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);for(let g=0;g<h.snapshotLength;g++){let _=h.snapshotItem(g);if(_&&S(_)&&!q(_)){if(["body","html"].includes(_.tagName.toLowerCase())){let v=_.querySelector('button, [role="button"], a, input, [role="radio"], [role="checkbox"], label');if(v&&S(v))return B(v)}return _.closest('[data-role="dropzone"], [class*="category" i], [class*="bucket" i], [class*="column" i], [class*="drop" i]')||B(_)}}}catch{}let u=x(i).toLowerCase(),p=Array.from(document.querySelectorAll('button, a, div, span, li, p, label, input, textarea, select, [draggable="true"], [data-testid], [class*="option" i], [class*="card" i], [class*="item" i], [class*="choice" i], [class*="category" i], [class*="bucket" i]'));for(let d of p){if(!S(d)||q(d)||d.closest("header, nav, .stepper, .step-item, .progress-bar-container")||H(d)||!!(d.matches('article, section, form, main, [class*="container" i], [class*="grid" i], .dnd-pool, .dnd-zones')||d.querySelector('label, [role="radio"], [role="checkbox"], .dnd-card, [draggable="true"], .option-card, tr'))&&!d.matches(".dnd-zone, [data-category], [data-dropzone]"))continue;let h=x(d.textContent).toLowerCase(),g=x(d.getAttribute("aria-label")||"").toLowerCase(),_=x(d.getAttribute("placeholder")||"").toLowerCase(),y=x(d.getAttribute("title")||"").toLowerCase(),v=x(d.getAttribute("name")||"").toLowerCase(),f=x(d.getAttribute("data-category")||"").toLowerCase(),b=d instanceof HTMLInputElement||d instanceof HTMLButtonElement?d.value:"",E=x(b).toLowerCase(),T=h.startsWith(u+")")||h.startsWith(u+".")||h.startsWith(u+" -")||h.startsWith(u+":");if(h===u||g===u||_===u||y===u||v===u||f&&f===u||E&&E===u||T)return d.closest('[data-role="dropzone"], [class*="category" i], [class*="bucket" i], [class*="column" i], [class*="drop" i]')||B(d)}if(u.length>=3)for(let d of p){if(!S(d)||q(d)||d.closest("header, nav, .stepper, .step-item, .progress-bar-container")||H(d)||!!(d.matches('article, section, form, main, [class*="container" i], [class*="grid" i], .dnd-pool, .dnd-zones')||d.querySelector('label, [role="radio"], [role="checkbox"], .dnd-card, [draggable="true"], .option-card, tr'))&&!d.matches(".dnd-zone, [data-category], [data-dropzone]"))continue;let h=x(d.textContent).toLowerCase(),g=x(d.getAttribute("aria-label")||"").toLowerCase(),_=x(d.getAttribute("placeholder")||"").toLowerCase(),y=x(d.getAttribute("title")||"").toLowerCase(),v=x(d.getAttribute("name")||"").toLowerCase();if(h.includes(u)||g.includes(u)||_.includes(u)||y.includes(u)||v.includes(u)){if(Array.from(d.children).some(T=>{let w=x(T.textContent).toLowerCase();return w&&w.includes(u)}))continue;return d.closest('[data-role="dropzone"], [class*="category" i], [class*="bucket" i], [class*="column" i], [class*="drop" i]')||B(d)}let f=u.split(/\s+/).filter(Boolean);if(f.length>=3){let b=f.slice(0,Math.min(5,f.length)).join(" ");if(h.includes(b)||g.includes(b)||_.includes(b))return B(d)}}return null}function qt(n,e){for(let t of e)n.dispatchEvent(new Event(t,{bubbles:!0,composed:!0}))}function F(n,e){if(!n)return;try{n.scrollIntoView({block:"nearest",inline:"nearest",behavior:"instant"})}catch{}try{n.focus?.()}catch{}let t=n.getBoundingClientRect(),o=e?e[0]:Math.round(t.left+Math.max(1,t.width/2)),i=e?e[1]:Math.round(t.top+Math.max(1,t.height/2)),a={bubbles:!0,cancelable:!0,composed:!0,view:window,clientX:o,clientY:i};try{n.dispatchEvent(new PointerEvent("pointerover",{...a}))}catch{}try{n.dispatchEvent(new MouseEvent("mouseover",{...a}))}catch{}try{n.dispatchEvent(new PointerEvent("pointerdown",{...a,button:0,buttons:1}))}catch{}try{n.dispatchEvent(new MouseEvent("mousedown",{...a,button:0,buttons:1}))}catch{}try{n.dispatchEvent(new PointerEvent("pointerup",{...a,button:0,buttons:0}))}catch{}try{n.dispatchEvent(new MouseEvent("mouseup",{...a,button:0,buttons:0}))}catch{}try{n.dispatchEvent(new MouseEvent("click",{...a,button:0,buttons:0}))}catch{}try{n.click()}catch{}try{let s=Object.keys(n).find(r=>r.startsWith("__reactFiber")||r.startsWith("__reactInternalInstance"));if(s){let r=n[s];for(;r;){let l=r.memoizedProps||r.pendingProps;if(l?.onClick){l.onClick({type:"click",target:n,currentTarget:n,bubbles:!0,cancelable:!0,preventDefault:()=>{},stopPropagation:()=>{}});break}r=r.return}}}catch{}try{let s=Object.keys(n).find(r=>r.startsWith("__reactProps"));if(s){let r=n[s];r?.onClick&&r.onClick({type:"click",target:n,currentTarget:n,bubbles:!0,cancelable:!0,preventDefault:()=>{},stopPropagation:()=>{}})}}catch{}try{let s=n._vei;s?.onClick&&(Array.isArray(s.onClick.value)?s.onClick.value:[s.onClick.value]).forEach(l=>{try{l({type:"click",target:n})}catch{}})}catch{}try{n.$onclick&&n.$onclick({type:"click",target:n,preventDefault:()=>{},stopPropagation:()=>{}})}catch{}try{if(!!(document.querySelector('meta[content*="google.com/forms"], form[action*="formResponse"]')||n.closest("[data-item-id], [jsmodel], [jsaction], .freebirdFormviewerComponentsQuestionBaseRoot"))){let r=n.querySelector('input[type="radio"], input[type="checkbox"]');r&&(r.focus?.(),r.click(),Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"checked")?.set?.call(r,!0),r.dispatchEvent(new Event("change",{bubbles:!0})));let l=n.closest("[jsaction]");if(l&&l!==n)try{l.dispatchEvent(new MouseEvent("click",{bubbles:!0,cancelable:!0,view:window,clientX:o,clientY:i}))}catch{}}}catch{}if(n.getAttribute("role")==="button"||n.getAttribute("tabindex")!==null)try{n.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0,cancelable:!0})),n.dispatchEvent(new KeyboardEvent("keyup",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0,cancelable:!0}))}catch{}}function Te(n,e){let t=n;if(t.hasAttribute("for")){let c=t.getAttribute("for"),u=t.ownerDocument.getElementById(c);u&&(t=u)}if(typeof HTMLSelectElement<"u"&&t instanceof HTMLSelectElement||t.tagName?.toLowerCase()==="select"||t.getAttribute("role")==="combobox"||t.getAttribute("role")==="listbox"||t.matches?.('[role="combobox"], [role="listbox"], [class*="select" i], [class*="dropdown" i]')){Ae(t,[e]);return}let i=t.querySelector('select, [role="combobox"], [role="listbox"]');if(i){Ae(i,[e]);return}if(!(t instanceof HTMLInputElement)&&!(t instanceof HTMLTextAreaElement)&&!(t instanceof HTMLSelectElement)&&!t.isContentEditable){let c=t.querySelector('input:not([type="hidden"]), textarea, select, [contenteditable="true"]');if(c)t=c;else{let p=t.closest('.form-group, .field, [class*="input" i], [class*="control" i], label, tr, td, li, p, div')?.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, select, [contenteditable="true"]');if(p)t=p;else{let d=t.nextElementSibling;for(;d;){if(d instanceof HTMLInputElement&&!["hidden","button","submit","checkbox","radio"].includes(d.type)||d instanceof HTMLTextAreaElement||d instanceof HTMLElement&&d.isContentEditable){t=d;break}let m=d.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(m){t=m;break}d=d.nextElementSibling}}}}if(t instanceof HTMLButtonElement||t.tagName.toLowerCase()==="a"||t.getAttribute("role")==="button"||t instanceof HTMLInputElement&&["button","submit","reset","image"].includes(t.type)){let c=t.parentElement?.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(c)t=c;else{let u=document.body;try{u=G()||document.body}catch{}let p=u.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(p)t=p;else{console.warn("[EasyQuiz] setNativeValue: Nenhum campo de texto encontrado para receber o valor.");return}}}if(!(t instanceof HTMLInputElement)&&!(t instanceof HTMLTextAreaElement)&&!(t instanceof HTMLSelectElement)&&!t.isContentEditable){let c=document.body;try{c=G()||document.body}catch{}let u=c.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(u)t=u;else{console.warn("[EasyQuiz] setNativeValue: Nenhum campo de texto encontrado para receber o valor.");return}}if(t instanceof HTMLInputElement&&["checkbox","radio"].includes(t.type)){let c=["true","1","checked","yes","sim"].includes(e.toLowerCase())||e===t.value;ie(t,c);return}let s=String(e??""),r=s;if(t instanceof HTMLInputElement&&t.type==="number"){let c=s.replace(",",".").replace(/[^0-9.-]/g,"");c&&!isNaN(Number(c))&&(r=c)}try{t.scrollIntoView?.({block:"center",inline:"center",behavior:"instant"}),t.focus?.()}catch{}let l=!1;try{if(t instanceof HTMLInputElement||t instanceof HTMLTextAreaElement){if(t.type!=="number"){try{t.select?.()}catch{}l=document.execCommand?.("insertText",!1,r)||!1}}else if(t.isContentEditable){try{document.execCommand?.("selectAll",!1,void 0)}catch{}l=document.execCommand?.("insertText",!1,r)||!1}}catch{}if(t instanceof HTMLInputElement||t instanceof HTMLTextAreaElement){try{let p=t._valueTracker;p&&p.setValue(r===""?" ":"")}catch{}let c=t instanceof HTMLTextAreaElement?HTMLTextAreaElement.prototype:HTMLInputElement.prototype,u=Object.getOwnPropertyDescriptor(c,"value")?.set;u?u.call(t,r):t.value=r;try{t.dispatchEvent(new KeyboardEvent("keydown",{bubbles:!0,cancelable:!0,key:r.slice(-1)||"a"}))}catch{}try{t.dispatchEvent(new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,composed:!0,data:r,inputType:"insertText"}))}catch{}try{t.dispatchEvent(new InputEvent("input",{bubbles:!0,cancelable:!0,composed:!0,data:r,inputType:"insertText"}))}catch{t.dispatchEvent(new Event("input",{bubbles:!0,cancelable:!0,composed:!0}))}try{t.dispatchEvent(new KeyboardEvent("keyup",{bubbles:!0,cancelable:!0,key:r.slice(-1)||"a"}))}catch{}try{t.dispatchEvent(new Event("change",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}try{t.dispatchEvent(new FocusEvent("blur",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}if(t.value!==r&&!(t instanceof HTMLInputElement&&t.type==="number"&&Number(t.value)===Number(r))){t.value=r;try{u?.call(t,r)}catch{}}return}if(t.isContentEditable){if(t.textContent?.trim()!==r.trim()){t.textContent=r;try{t.innerText=r}catch{}}try{t.dispatchEvent(new InputEvent("input",{bubbles:!0,cancelable:!0,composed:!0,data:r,inputType:"insertText"}))}catch{t.dispatchEvent(new Event("input",{bubbles:!0,cancelable:!0,composed:!0}))}try{t.dispatchEvent(new Event("change",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}try{t.dispatchEvent(new FocusEvent("blur",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}return}try{"value"in t&&(t.value=r),t.dispatchEvent(new Event("input",{bubbles:!0,cancelable:!0,composed:!0})),t.dispatchEvent(new Event("change",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}}function ie(n,e){if(!n)return;let t=n.closest('label, td, .option-card, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, [class*="option" i], [class*="choice" i], li')||n,o=n instanceof HTMLInputElement&&["checkbox","radio"].includes(n.type)?n:t.querySelector('input[type="checkbox"], input[type="radio"]');!o&&t.hasAttribute("for")&&(o=t.ownerDocument.getElementById(t.getAttribute("for")));let i=n instanceof HTMLInputElement?n.closest("label")||(n.id?t.ownerDocument.getElementById(t.getAttribute("for")):null)||n:t&&S(t)?t:n;if(o){let a=o.type==="radio",s=o.type==="checkbox",r=!!o._valueTracker;if(o.checked===e){if(a&&e){t.setAttribute("aria-checked","true"),t.setAttribute("aria-selected","true"),t.classList.add("selected","active","checked");return}if(s){t.setAttribute("aria-checked",e?"true":"false"),t.setAttribute("aria-selected",e?"true":"false"),t.classList.toggle("selected",e),t.classList.toggle("active",e),t.classList.toggle("checked",e);return}}i&&i!==o&&F(i);try{o.focus?.(),o.click()}catch{}if(o.checked!==e){try{let c=o._valueTracker;c&&c.setValue(!e)}catch{}try{Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"checked")?.set?.call(o,e)}catch{}o.checked=e,qt(o,["input","change"])}t.setAttribute("aria-checked",e?"true":"false"),t.setAttribute("aria-selected",e?"true":"false"),t.classList.toggle("selected",e),t.classList.toggle("active",e),t.classList.toggle("checked",e)}else{if((t.getAttribute("aria-checked")==="true"||t.getAttribute("aria-selected")==="true"||t.getAttribute("data-selected")==="true"||t.getAttribute("data-checked")==="true"||t.classList.contains("selected")||t.classList.contains("active")||t.classList.contains("checked"))===e&&e)return;F(i),t.setAttribute("aria-checked",e?"true":"false"),t.setAttribute("aria-selected",e?"true":"false"),t.classList.toggle("selected",e),t.classList.toggle("active",e),t.classList.toggle("checked",e)}}function Ae(n,e){let t=typeof HTMLSelectElement<"u"&&n instanceof HTMLSelectElement||n.tagName?.toLowerCase()==="select"?n:n.querySelector("select");if(t){let s=e.map(c=>x(c).toLowerCase()),r=!1,l=(c,u)=>{c.selected=!0,t.selectedIndex=u;try{t.value=c.value}catch{}try{Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype,"value")?.set?.call(t,c.value)}catch{}try{let p=t._valueTracker;p&&p.setValue(c.value)}catch{}r=!0};for(let c=0;c<t.options.length;c++){let u=t.options[c],p=u.value.toLowerCase(),d=x(u.textContent).toLowerCase();if(s.some(h=>h===p||h===d)){if(l(u,c),!t.multiple)break}else t.multiple||(u.selected=!1)}if(!r)for(let c of s){let u=c.match(/^(?:item|opção|opcao|alternativa|linha|escolha|campo)?\s*#?_?([0-9]+)$/i);if(u){let p=parseInt(u[1],10),m=t.options[0]?.value===""||t.options[0]?.disabled?p:p>=1?p-1:0;if(m>=0&&m<t.options.length&&(l(t.options[m],m),!t.multiple))break}}if(!r){for(let c of s)if(/^[a-z]$/i.test(c)){let u=c.toUpperCase().charCodeAt(0)-65,d=t.options[0]?.value===""||t.options[0]?.disabled?u+1:u;if(d>=0&&d<t.options.length&&(l(t.options[d],d),!t.multiple))break}}if(!r){let c=u=>u.normalize("NFD").replace(/[\u0300-\u036f]/g,"");for(let u=0;u<t.options.length;u++){let p=t.options[u],d=c(p.value.toLowerCase()),m=c(x(p.textContent).toLowerCase());if(s.some(g=>{let _=c(g);return d.includes(_)||m.includes(_)||_.length>2&&(_.includes(d)||_.includes(m))})&&(l(p,u),!t.multiple))break}}if(r){qt(t,["focus","input","change","blur"]);return}}let o=n.matches?.('[role="combobox"], [role="listbox"], [class*="select" i], [class*="dropdown" i]')?n:n.closest('[role="combobox"], [role="listbox"], [class*="select" i], [class*="dropdown" i]');o&&F(o);let i=e.map(s=>x(s).toLowerCase()),a=Array.from(document.querySelectorAll('[role="listbox"] [role="option"], [role="menu"] [role="menuitem"], .select-dropdown li, .dropdown-menu .dropdown-item, .ant-select-item-option, .MuiMenuItem-root, [class*="option-item"], li[data-value]')).filter(s=>S(s)&&!q(s));for(let s of i){let r=a.find(c=>{let u=x(c.textContent).toLowerCase(),p=x(c.getAttribute("data-value")||c.getAttribute("value")||"").toLowerCase();return u===s||p===s||u.includes(s)||s.length>2&&s.includes(u)});if(r){F(r);let c=r.querySelector('input[type="radio"], input[type="checkbox"]');c&&ie(c,!0);return}let l=k(s);if(l){F(l);return}}}function ln(n,e){try{let t=new DataTransfer;try{t.setData("text/plain",n)}catch{}try{t.setData("text/html",e)}catch{}return t}catch{return null}}function ot(n){try{n.click()}catch{let e=n.ownerDocument.defaultView||window;n.dispatchEvent(new e.MouseEvent("click",{bubbles:!0,cancelable:!0,composed:!0,view:e}))}}function J(n,e){let t=x(n).toLowerCase();if(!t)return null;if(e==="source"){if(/^[0-9a-f]{10,}$/.test(n.trim())){let r=document.getElementById(n.trim());if(r&&S(r)&&!q(r))return r}let s=['[class*="cursor-grab"][id]',".dnd-card",'[draggable="true"]'];for(let r of s){let c=Array.from(document.querySelectorAll(r)).find(u=>{if(!S(u)||q(u))return!1;let p=x(`${u.id} ${u.textContent||""} ${u.getAttribute("data-id")||""}`).toLowerCase();return p===t||p.includes(t)||u.id===n.trim()});if(c)return c}return null}let o=["[data-dropzone]","[data-category]",'[data-role="dropzone"]','[class*="dropzone" i]','[class*="list-group" i]','[class*="classification-group" i]'].join(","),i=Array.from(document.querySelectorAll(o)),a=i.find(s=>[s.getAttribute("data-category"),s.getAttribute("data-dropzone")].some(r=>r?.trim().toLowerCase()===t));return a&&S(a)&&!q(a)?a:i.find(s=>{if(!S(s)||q(s)||/unclassified/i.test(s.className))return!1;let r=s.querySelector('.font-bold, h1, h2, h3, h4, [class*="header" i], [class*="title" i], [class*="label" i]'),l=x(r?.textContent||s.textContent||"").toLowerCase();return l.includes("op")&&(l.includes("es")||l.includes("\xF5es"))?!1:l===t||l.startsWith(t)||l.includes(t)})||null}async function fe(n,e,t=1){try{n.scrollIntoView({block:"center",inline:"center",behavior:"instant"})}catch{}let o=n.getBoundingClientRect(),i=e.getBoundingClientRect(),a=Math.round(o.left+Math.max(1,o.width/2)),s=Math.round(o.top+Math.max(1,o.height/2)),r=Math.round(i.left+Math.max(1,i.width/2)),l=Math.round(i.top+Math.max(1,i.height/2)),c=x(e.textContent).toLowerCase();if(c){let g=Array.from(n.querySelectorAll('button, [role="button"], input[type="radio"], input[type="checkbox"], option, .btn, [class*="tag" i]')).find(_=>{let y=x(_.textContent).toLowerCase(),v=_ instanceof HTMLInputElement||_ instanceof HTMLOptionElement?x(_.value).toLowerCase():"";return y&&(c.includes(y)||y.includes(c))||v&&(c.includes(v)||v.includes(c))});g&&(F(g),await new Promise(_=>setTimeout(_,120)))}ot(n),await new Promise(h=>setTimeout(h,140)),ot(e);let u=e.querySelector('[data-role="dropzone"], [class*="bucket" i], [class*="slot" i], [class*="drop" i], [class*="target" i], [class*="items" i], ul, ol');if(u&&u!==e&&ot(u),await new Promise(h=>setTimeout(h,100)),!e.contains(n)&&n.matches('.dnd-card, [draggable="true"]')&&e.matches('.dnd-zone, [data-dropzone], [data-role="dropzone"]')&&e.appendChild(n),e.contains(n)&&n.matches('.dnd-card, [draggable="true"]'))return;let p={bubbles:!0,cancelable:!0,composed:!0,view:window,clientX:a,clientY:s,screenX:a,screenY:s,button:0,buttons:1};try{n.dispatchEvent(new PointerEvent("pointerdown",{...p,isPrimary:!0,pointerId:1,pointerType:"mouse",pressure:.5}))}catch{}n.dispatchEvent(new MouseEvent("mousedown",p));let d=4;for(let h=1;h<=d;h++){let g=Math.round(a+(r-a)*(h/d)),_=Math.round(s+(l-s)*(h/d)),y={...p,clientX:g,clientY:_,screenX:g,screenY:_};try{n.dispatchEvent(new PointerEvent("pointermove",{...y,isPrimary:!0,pointerId:1,pointerType:"mouse",pressure:.5}))}catch{}document.dispatchEvent(new MouseEvent("mousemove",y))}let m={bubbles:!0,cancelable:!0,composed:!0,view:window,clientX:r,clientY:l,screenX:r,screenY:l,button:0,buttons:0};try{e.dispatchEvent(new PointerEvent("pointerup",{...m,isPrimary:!0,pointerId:1,pointerType:"mouse",pressure:0}))}catch{}e.dispatchEvent(new MouseEvent("mouseup",m)),e.dispatchEvent(new MouseEvent("click",m));try{let h=ln(O(n.textContent),n.outerHTML),g={...p},_={...m};h&&(g.dataTransfer=h,_.dataTransfer=h);let y=n.ownerDocument.defaultView?.DragEvent;if(!y)throw new Error("DragEvent n\xE3o dispon\xEDvel neste documento");n.dispatchEvent(new y("dragstart",g)),e.dispatchEvent(new y("dragenter",_)),e.dispatchEvent(new y("dragover",_)),e.dispatchEvent(new y("drop",_)),n.dispatchEvent(new y("dragend",g))}catch(h){console.warn("[EasyQuiz] DragEvent ignorado com seguran\xE7a:",h)}try{let h=new Touch({identifier:1,target:n,clientX:a,clientY:s}),g=new Touch({identifier:1,target:e,clientX:r,clientY:l});n.dispatchEvent(new TouchEvent("touchstart",{bubbles:!0,cancelable:!0,touches:[h]})),e.dispatchEvent(new TouchEvent("touchmove",{bubbles:!0,cancelable:!0,touches:[g]})),e.dispatchEvent(new TouchEvent("touchend",{bubbles:!0,cancelable:!0,touches:[]}))}catch{}if(t>=2&&!e.contains(n))try{n.focus?.(),n.dispatchEvent(new KeyboardEvent("keydown",{key:" ",code:"Space",bubbles:!0})),n.dispatchEvent(new KeyboardEvent("keyup",{key:" ",code:"Space",bubbles:!0})),await new Promise(h=>setTimeout(h,80)),e.focus?.(),e.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",bubbles:!0})),e.dispatchEvent(new KeyboardEvent("keyup",{key:"Enter",code:"Enter",bubbles:!0}))}catch{}}var It={fill:(n,e)=>{let t=k(n);t?Te(t,e):console.warn(`$eq.fill: Elemento '${n}' n\xE3o encontrado`)},click:n=>{let e=k(n);e?!!(e.closest('.option-card, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, [class*="option" i], [class*="choice" i]')||e.querySelector('input[type="radio"], input[type="checkbox"]')||e instanceof HTMLInputElement&&["checkbox","radio"].includes(e.type))?ie(e,!0):F(e):console.warn(`$eq.click: Elemento '${n}' n\xE3o encontrado`)},check:(n,e)=>{let t=k(n);t?ie(t,e):console.warn(`$eq.check: Elemento '${n}' n\xE3o encontrado`)},find:(n,e)=>k(n,e),drag:(n,e)=>{let t=J(n,"source")||k(n),o=J(e,"destination")||k(e);t&&o?fe(t,o):console.warn(`$eq.drag: Origem ou destino n\xE3o encontrado ('${n}' -> '${e}')`)},categorize:async(n,e)=>{let t=J(n,"source")||k(n),o=J(e,"destination")||k(e);if(!t||!o){console.warn(`$eq.categorize: Item ou categoria n\xE3o encontrados ('${n}' -> '${e}')`);return}await fe(t,o)},execute:(n,e=!1,t=1)=>mn(n,e,t)};typeof window<"u"&&(window.$eq=It);async function cn(n,e=1,t=tt()){if(nt(n,t),n.t==="js"){let r=String(n.v||"");Mt(r);try{new Function("$eq","document","window",r)(It,document,window)}catch(l){throw console.warn("[EasyQuiz JS Execution]",l),l}return}if(n.t==="drag"){let r=J(n.from,"source")||k(n.from),l=J(n.to,"destination")||k(n.to);!r&&n.from&&(r=k(x(n.from))),!l&&n.to&&(l=k(x(n.to))),r&&l?await fe(r,l,e):console.warn(`[EasyQuiz] Drag: alvo n\xE3o encontrado ('${n.from}' -> '${n.to}')`);return}let o=n.id!==void 0&&n.id!==null?String(n.id):"";!o&&n.t==="val"&&(o=n.target??n.name??n.selector??"1");let i=n.v!==void 0?n.v:n.value!==void 0?n.value:n.val!==void 0?n.val:n.text,a=i!=null?String(i).trim():"",s=k(o,a,n.t==="val"||n.t==="sel");if(!s&&o&&(s=k(x(o),a,n.t==="val"||n.t==="sel")),s&&a){if(s instanceof HTMLInputElement&&s.type==="radio"&&s.name){if(x(s.value).toLowerCase()!==x(a).toLowerCase()){let r=document.querySelector(`input[type="radio"][name="${P(s.name)}"][value="${P(a)}" i]`);if(r)s=r;else{let c=Array.from(document.querySelectorAll(`input[type="radio"][name="${P(s.name)}"]`)).find(u=>{let p=u.closest("label, .vf-label, .option-card, tr, td, div");return p&&x(p.textContent).toLowerCase().includes(x(a).toLowerCase())});c&&(s=c)}}}else if(!(s instanceof HTMLInputElement)&&!(s instanceof HTMLSelectElement)&&!(s instanceof HTMLTextAreaElement)){let r=s.querySelector(`input[value="${P(a)}" i], [data-value="${P(a)}" i]`);if(r)s=r;else{let c=Array.from(s.querySelectorAll('input[type="radio"], input[type="checkbox"]')).find(u=>{let p=u.closest("label, .vf-label, .option-card, td, div");return p&&x(p.textContent).toLowerCase().includes(x(a).toLowerCase())});c&&(s=c)}}}if(!s&&(n.t==="val"||n.t==="sel")){let r=document.body;try{r=G()||document.body}catch{}let l=Array.from(r.querySelectorAll(n.t==="sel"?'select, [role="combobox"], [role="listbox"]':'input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, select, [contenteditable="true"]')).filter(c=>S(c)&&!q(c));if(l.length===1)s=l[0];else if(l.length>1){let c=x(o).toLowerCase(),u=c.match(/^#?_?([0-9]+)$/);if(u){let p=parseInt(u[1],10);p>=1&&p<=l.length?s=l[p-1]:p>=0&&p<l.length&&(s=l[p])}s||(s=l.find(d=>{let m=(d.getAttribute("placeholder")||"").toLowerCase(),h=(d.name||"").toLowerCase(),g=(d.getAttribute("aria-label")||"").toLowerCase(),_=(d.id||"").toLowerCase(),y=x(Qe(d)).toLowerCase(),v=x(d.closest('label, tr, td, .form-group, .field, [class*="row" i], div')?.textContent||"").toLowerCase();return m.includes(c)||h.includes(c)||g.includes(c)||_.includes(c)||y&&y.includes(c)||c.length>=2&&v.includes(c)})||(l.length===1?l[0]:null))}}if(!s&&n.t!=="adv")throw new Error(`Alvo '${o}' n\xE3o encontrado no DOM para a\xE7\xE3o '${n.t}'.`);switch(n.t){case"val":if(s){let l=s instanceof HTMLInputElement||s instanceof HTMLTextAreaElement||s instanceof HTMLSelectElement||s.isContentEditable?s:s.querySelector('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]');if(!l){let d=s.closest('.form-group, .field, [class*="input" i], [class*="control" i], label, tr, td, li, p, div')?.querySelector('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]');d&&(l=d)}if(!l){let p=s.nextElementSibling;for(;p;){if(p instanceof HTMLInputElement&&!["hidden","button","submit","checkbox","radio"].includes(p.type)||p instanceof HTMLTextAreaElement||p instanceof HTMLElement&&p.isContentEditable){l=p;break}let d=p.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(d){l=d;break}p=p.nextElementSibling}}if(!l){let p=document.body;try{p=G()||document.body}catch{}let d=Array.from(p.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]')).filter(m=>S(m)&&!q(m));d.length>0&&(l=d[0])}let c=n.v!==void 0?n.v:n.value!==void 0?n.value:n.val!==void 0?n.val:n.text,u=c!=null?String(c):"";Te(l||s,u)}break;case"chk":s&&ie(s,!!n.c);break;case"sel":if(s){let l=Array.isArray(n.v)?n.v:[String(n.v)];Ae(s,l)}break;case"clk":if(s)if(!!(s.closest('.option-card, label, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, [class*="option" i], [class*="choice" i], [class*="answer" i], li, tr')||s.querySelector('input[type="radio"], input[type="checkbox"]')||s instanceof HTMLInputElement&&["checkbox","radio"].includes(s.type))){let c=n.c!==void 0?!!n.c:!0;ie(s,c)}else F(s,n.co);break;case"adv":let r=it(n.id);if(r){await at(r,1200);let l=n.id||r.textContent?.trim()||"";l&&Ne(window.location.hostname,{advanceSelector:l}),F(r)}else console.warn("[EasyQuiz] Bot\xE3o de avan\xE7o n\xE3o localizado.");break}}function dn(){let n=["button","a",'[role="button"]','input[type="submit"]','input[type="button"]','[data-testid*="check" i]','[data-test-id*="check" i]'].join(",");return Array.from(document.querySelectorAll(n)).find(t=>{if(!S(t)||q(t)||t.closest("header, nav, aside"))return!1;let o=t instanceof HTMLInputElement||t instanceof HTMLButtonElement?t.value:"",i=(t.textContent||o||t.getAttribute("aria-label")||"").trim();return/(verificar|checar|check|conferir|validar|enviar|responder)/i.test(i)})||null}function it(n){let e=d=>{let m=(d.getAttribute("aria-label")||d.textContent||(d instanceof HTMLInputElement||d instanceof HTMLButtonElement?d.value:"")||"").trim();return se.test(m)};if(n){let d=k(n);if(d&&S(d)&&!q(d)&&!H(d)&&!e(d))return d}try{let d=Re(window.location.hostname);if(d.advanceSelector){let m=k(d.advanceSelector);if(m&&S(m)&&!q(m)&&!H(m)&&!e(m))return m}}catch{}let t=["button","a",'[role="button"]','[role="link"]','input[type="button"]','input[type="submit"]','[data-testid*="next" i]','[data-testid*="continue" i]','[data-testid*="check" i]','[data-test-id*="next" i]','[data-test-id*="continue" i]','[data-test-id*="check" i]','[class*="next" i]','[class*="continue" i]','[class*="proximo" i]','[class*="avancar" i]'].join(","),o=Array.from(document.querySelectorAll(t)),i=d=>{let m=d instanceof HTMLInputElement||d instanceof HTMLButtonElement?d.value:"";return(d.getAttribute("aria-label")||d.textContent||m||"").trim()},a=d=>{let m=i(d).trim();return/^\d{1,3}$/.test(m)?!!d.closest('[class*="pagination" i], [class*="pager" i], [class*="page-nav" i], [class*="step-indicator" i], [class*="breadcrumb" i], [class*="steps" i], [aria-label*="p\xE1gina" i], [aria-label*="page" i], [role="navigation"], nav'):!1},s=o.filter(d=>S(d)&&!q(d)&&!d.closest("header, aside")&&!H(d)&&!e(d));for(let d of s){let m=i(d),h=m.replace(/[\d\(\)\[\]\u2192>\u2022\-\/\\]+/g," ").trim();if((_e.test(m)||_e.test(h))&&!a(d)&&!H(d))return d}for(let d of s)if(V(d)&&!H(d)&&!a(d))return d;let r=document.querySelector('[data-test-id*="next" i], [data-testid*="next" i], [aria-label*="next" i], [aria-label*="pr\xF3xim" i], [aria-label*="avan\xE7ar" i], [aria-label*="continuar" i]');if(r&&S(r)&&!q(r)&&!H(r)&&!e(r))return r;let l=Array.from(document.querySelectorAll('input[type="submit"], button[type="submit"]'));for(let d of l)if(S(d)&&!q(d)&&!e(d)&&!H(d)&&!a(d))return d;let c=Array.from(document.querySelectorAll('button, [role="button"]')),u=window.innerHeight,p=c.filter(d=>{if(!S(d)||q(d)||e(d)||H(d)||d.closest("header, nav, aside, .eq-sidebar")||a(d))return!1;let m=d.getBoundingClientRect();return m.top>u*.45&&m.height>=24&&m.width>=24});if(p.length>0)return p.sort((d,m)=>{let h=d.getBoundingClientRect(),g=m.getBoundingClientRect(),_=h.left+h.top;return g.left+g.top-_}),p[0];for(let d of s)if(V(d)&&!H(d))return d;return null}async function at(n,e=2500){let t=Date.now();for(;Date.now()-t<e;){if(!(n.disabled===!0||n.getAttribute("aria-disabled")==="true"||n.classList.contains("disabled")||n.getAttribute("disabled")!==null))return;await new Promise(i=>setTimeout(i,80))}}function un(){let n=window.location.href,e=document.title,t=document.querySelectorAll('input, textarea, select, button, [role="button"], [role="option"], [role="radio"], [role="checkbox"]').length,o=(document.body?.innerText||document.body?.textContent||"").length;return`${n}|${e}|${t}|${o}`}async function pn(n,e=3500){let[t,o,i,a]=n.split("|"),s=parseInt(a||"0",10),r=Date.now();for(;Date.now()-r<e;){let l=window.location.href,c=document.title,u=String(document.querySelectorAll('input, textarea, select, button, [role="button"], [role="option"], [role="radio"], [role="checkbox"]').length),p=(document.body?.innerText||document.body?.textContent||"").length;if(l!==t)return{changed:!0,evidence:`URL mudou: ${t} \u2192 ${l}`};if(c!==o)return{changed:!0,evidence:`T\xEDtulo da p\xE1gina mudou: "${o}" \u2192 "${c}"`};if(Math.abs(parseInt(u)-parseInt(i||"0"))>=2)return{changed:!0,evidence:`Controles interativos: ${i} \u2192 ${u}`};if(Math.abs(p-s)>50)return{changed:!0,evidence:`Conte\xFAdo da p\xE1gina mudou substancialmente (${Math.abs(p-s)} chars)`};await new Promise(d=>setTimeout(d,100))}return{changed:!1,evidence:"Nenhuma mudan\xE7a estrutural detectada dentro do tempo limite."}}async function Lt(n){if(n.t==="js"||n.t==="adv")return;if(n.t==="drag"){let i=k(n.from)||k(x(n.from)),a=k(n.to)||k(x(n.to));i&&a&&await fe(i,a,2);return}let e=n.id||"",t=n.v!==void 0?String(n.v).trim():"",o=k(e,t)||k(x(e),t);if(n.t==="clk"||n.t==="chk"){if(!o&&e){let a=Array.from(document.querySelectorAll('input, label, button, [role="radio"], [role="checkbox"], .option-card, [class*="option" i], [class*="choice" i]')),s=x(e).toLowerCase();o=a.find(r=>{let l=x(r.textContent).toLowerCase();return!!(x(r.value||"").toLowerCase()===s||l===s||l.startsWith(s+")")||l.startsWith("("+s+")")||l.startsWith(s+".")||l.startsWith(s+" - ")||l.startsWith(s+":")||s.length>=3&&l.includes(s))})||null}let i=n.v!==void 0?String(n.v).trim():"";if(o&&i){if(o instanceof HTMLInputElement&&o.type==="radio"&&o.name){if(x(o.value).toLowerCase()!==x(i).toLowerCase()){let a=document.querySelector(`input[type="radio"][name="${P(o.name)}"][value="${P(i)}" i]`);if(a)o=a;else{let r=Array.from(document.querySelectorAll(`input[type="radio"][name="${P(o.name)}"]`)).find(l=>{let c=l.closest("label, .vf-label, .option-card, tr, td, div");return c&&x(c.textContent).toLowerCase().includes(x(i).toLowerCase())});r&&(o=r)}}}else if(!(o instanceof HTMLInputElement)&&!(o instanceof HTMLSelectElement)&&!(o instanceof HTMLTextAreaElement)){let a=o.querySelector(`input[value="${P(i)}" i], [data-value="${P(i)}" i]`);if(a)o=a;else{let r=Array.from(o.querySelectorAll('input[type="radio"], input[type="checkbox"]')).find(l=>{let c=l.closest("label, .vf-label, .option-card, td, div");return c&&x(c.textContent).toLowerCase().includes(x(i).toLowerCase())});r&&(o=r)}}}if(o){let a=o.closest('.option-card, label, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, li')||o,s=o instanceof HTMLInputElement&&["radio","checkbox"].includes(o.type)?o:a.querySelector('input[type="radio"], input[type="checkbox"]')||(a.getAttribute("for")?a.ownerDocument.getElementById(a.getAttribute("for")):null),r=n.t==="chk"||n.c!==void 0?!!n.c:!0;if(ie(s||a,r),s&&s.checked!==r){try{let l=s._valueTracker;l&&l.setValue(!r)}catch{}try{Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"checked")?.set?.call(s,r)}catch{}s.checked=r,s.dispatchEvent(new Event("input",{bubbles:!0,composed:!0})),s.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}}return}if(n.t==="val"){let i=null;if(o&&(i=o instanceof HTMLInputElement||o instanceof HTMLTextAreaElement||o.isContentEditable?o:o.querySelector('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]')),!i){let a=document.body;try{a=G()||document.body}catch{}let s=Array.from(a.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]')),r=x(e).toLowerCase();i=s.find(l=>{let c=(l.getAttribute("placeholder")||"").toLowerCase(),u=(l.name||"").toLowerCase(),p=(l.id||"").toLowerCase(),d=(l.getAttribute("aria-label")||"").toLowerCase();return c.includes(r)||u.includes(r)||p.includes(r)||d.includes(r)})||(s.length>0?s[0]:null)}if(i){let a=String(n.v??"");try{if(i.focus?.(),i.type!=="number"){try{i.select?.()}catch{}document.execCommand?.("insertText",!1,a)}}catch{}Te(i,a)}return}if(n.t==="sel"){if(!o&&e){let i=Array.from(document.querySelectorAll("select")),a=x(e).toLowerCase();o=i.find(s=>{let r=(s.name||"").toLowerCase(),l=(s.id||"").toLowerCase(),c=(s.getAttribute("aria-label")||"").toLowerCase();return r.includes(a)||l.includes(a)||c.includes(a)})||null}if(o){let i=Array.isArray(n.v)?n.v:[String(n.v)];Ae(o,i)}return}}function me(n){try{if(n.t==="val"){let e=n.v!==void 0?n.v:n.value!==void 0?n.value:n.val!==void 0?n.val:n.text,t=String(e??"").trim(),o=t,i=n.id!==void 0&&n.id!==null?String(n.id):"";i||(i=n.target??n.name??n.selector??"1");let a=k(i,o,!0)||k(x(i),o,!0);if(!a){let p=document.body;try{p=G()||document.body}catch{}let d=Array.from(p.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]')).filter(m=>S(m)&&!q(m));d.length>0&&(a=d[0])}if(!a)return!1;let s=a instanceof HTMLInputElement&&a.type==="radio"?a:a.querySelector('input[type="radio"]');if(s&&s.name){let p=document.querySelector(`input[type="radio"][name="${P(s.name)}"]:checked`);if(!p)return!1;let d=x(p.value).toLowerCase(),m=x(t).toLowerCase(),h=x(p.closest("label, .vf-label, .option-card, tr, td, div")?.textContent||"").toLowerCase();return d===m||h===m||h.includes(m)}let r=a instanceof HTMLInputElement||a instanceof HTMLTextAreaElement||a.isContentEditable?a:a.querySelector('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(!r){let d=a.closest('.form-group, .field, [class*="input" i], [class*="control" i], label, tr, td, li, p, div')?.querySelector('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]');d&&(r=d)}if(!r){let p=a.nextElementSibling;for(;p;){if(p instanceof HTMLInputElement&&!["hidden","button","submit","checkbox","radio"].includes(p.type)||p instanceof HTMLTextAreaElement||p instanceof HTMLElement&&p.isContentEditable){r=p;break}let d=p.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(d){r=d;break}p=p.nextElementSibling}}if(r instanceof HTMLSelectElement){let p=x(t).toLowerCase();return Array.from(r.options).some(d=>{if(!d.selected)return!1;let m=d.value.toLowerCase(),h=x(d.textContent).toLowerCase();return p===m||p===h||m.includes(p)||h.includes(p)})}let l=(r instanceof HTMLInputElement||r instanceof HTMLTextAreaElement?r.value:r?.textContent??a.textContent??"").trim();if(!l&&!t)return!0;if(!l&&t)return!1;let c=l.replace(",",".").replace(/\s+/g,"").toLowerCase(),u=t.replace(",",".").replace(/\s+/g,"").toLowerCase();return c===u||c.includes(u)||u.includes(c)||l.toLowerCase()===t.toLowerCase()}if(n.t==="sel"){let e=k(n.id,void 0,!0)||k(x(n.id),void 0,!0);if(!e){let a=document.body;try{a=G()||document.body}catch{}let s=Array.from(a.querySelectorAll('select, [role="combobox"], [role="listbox"]')).filter(c=>S(c)&&!q(c)),r=x(n.id).toLowerCase();e=s.find(c=>{let u=(c.id||"").toLowerCase(),p=(c.getAttribute("name")||"").toLowerCase(),d=(c.getAttribute("aria-label")||"").toLowerCase(),m=x(c.closest('.dropdown-row, [class*="dropdown" i], [class*="select" i], tr, label, div')?.textContent||"").toLowerCase();return u.includes(r)||p.includes(r)||d.includes(r)||r.length>=2&&m.includes(r)})||(s.length===1?s[0]:null)}if(!e)return!1;let t=e instanceof HTMLSelectElement?e:e.querySelector("select");if(!t){let a=e.matches?.('[role="combobox"], [role="listbox"], [class*="select" i], [class*="dropdown" i]')?e:e.closest('[role="combobox"], [role="listbox"], [class*="select" i], [class*="dropdown" i]');if(a){let r=(Array.isArray(n.v)?n.v:[String(n.v)]).map(c=>x(c).toLowerCase()),l=x(a.textContent).toLowerCase();return r.some(c=>l.includes(c)||c.includes(l))}return!1}let i=(Array.isArray(n.v)?n.v:[String(n.v)]).map(a=>x(a).toLowerCase());return Array.from(t.options).some(a=>{if(!a.selected)return!1;let s=a.value.toLowerCase(),r=x(a.textContent).toLowerCase();return i.some(l=>l===s||l===r||s.includes(l)||r.includes(l))})}if(n.t==="chk"||n.t==="clk"){let e=n.v!==void 0?String(n.v).trim():"",t=k(n.id,e)||k(x(n.id),e);if(!t)return!1;let o=t.closest('.option-card, label, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, li')||t,i=t instanceof HTMLInputElement&&["checkbox","radio"].includes(t.type)?t:o.querySelector('input[type="checkbox"], input[type="radio"]')||(o.getAttribute("for")?o.ownerDocument.getElementById(o.getAttribute("for")):null),a=n.t==="chk"||n.c!==void 0?!!n.c:!0;if(i&&i.type==="radio"){if(i.checked===a)return!0;if(n.v&&i.name){let u=x(String(n.v)).toLowerCase(),p=document.querySelector(`input[type="radio"][name="${P(i.name)}"]:checked`);if(!p)return!1;if(p===i)return!0;let d=x(p.value).toLowerCase(),m=x(p.closest("label, .vf-label, .option-card, tr, td, div")?.textContent||"").toLowerCase();return d===u||m.includes(u)||u.includes(d)}}if(i&&["checkbox","radio"].includes(i.type))return i.checked===a;let s=o.getAttribute("aria-checked")===String(a)||o.getAttribute("aria-selected")===String(a)||o.getAttribute("aria-pressed")===String(a),r=a?o.getAttribute("data-selected")==="true"||o.getAttribute("data-checked")==="true"||o.getAttribute("data-active")==="true"||o.getAttribute("data-state")==="checked"||o.getAttribute("data-state")==="on":o.getAttribute("data-selected")==="false"||o.getAttribute("data-checked")==="false"||o.getAttribute("data-state")==="unchecked",l=a?/active|selected|checked|picked|correct|is-selected|choice-selected|selected-option|is-checked|chosen|current|highlight|ring|border-primary/i.test(o.className||""):!/active|selected|checked|picked|correct|is-selected|choice-selected|selected-option|is-checked|chosen|current|highlight|ring|border-primary/i.test(o.className||"");return!!(s||r||l||(o instanceof HTMLButtonElement||o.getAttribute("role")==="button")&&n.t==="clk"||n.t==="clk"&&!i)}if(n.t==="drag"){let e=k(n.from)||k(x(n.from)),t=k(n.to)||k(x(n.to));return!e||!t?!1:t.contains(e)?!0:/placed|dropped|assigned|matched|done|selected/i.test(e.className||"")||e.getAttribute("data-placed")==="true"}}catch{}return!1}async function mn(n,e,t=1,o=tt({engine:"smart",autoAdvance:e})){let i=n.actions.filter(f=>f.t!=="adv"),a=n.actions.filter(f=>f.t==="adv"),s=0,r=[],l=new Map,c=n.pageType==="question",u=i.filter(f=>f.t==="chk"||f.t==="clk"&&f.c!==void 0);for(let f of i){try{await cn(f,t,o),s++}catch(b){l.set(f,b instanceof Error?b.message:String(b)),console.warn("[EasyQuiz] A\xE7\xE3o declarativa prim\xE1ria falhou com seguran\xE7a:",f,b)}await new Promise(b=>setTimeout(b,f.t==="drag"?180:35))}if(c&&n.mode==="escolha_multipla"&&u.length>0){let f=document.body;try{f=G()||document.body}catch{}let b=Array.from(f.querySelectorAll('input[type="checkbox"], [role="checkbox"]')).filter(E=>S(E)&&!q(E));if(b.length>1){let T=function(w,M){if(w===M||w.contains(M)||M.contains(w))return!0;let L=w.closest('.option-card, label, [role="checkbox"], [role="option"], tr, li, [class*="option" i]'),$=M.closest('.option-card, label, [role="checkbox"], [role="option"], tr, li, [class*="option" i]');if(L&&$&&L===$)return!0;let ee=w.getAttribute("for")||w.id,A=M.getAttribute("for")||M.id;return!!(ee&&A&&ee===A)};var v=T;let E=new Set;for(let w of u){let M=w.t==="chk"?!!w.c:!!(w.c??!0),L="id"in w&&typeof w.id=="string"?w.id:"";if(M&&L){let $=k(L,w.v);if($){E.add($);let ee=$.querySelector('input[type="checkbox"]');ee&&E.add(ee);let A=$.closest('.option-card, label, [role="checkbox"], tr, li, [class*="option" i]');A&&(E.add(A),A.querySelectorAll('input[type="checkbox"]').forEach(ae=>E.add(ae)))}}}if(E.size>=u.length&&E.size>0){let w=Array.from(E);for(let M of b)w.some($=>T($,M))||(M instanceof HTMLInputElement&&M.checked||M.getAttribute("aria-checked")==="true"||M.closest(".option-card, label")?.classList.contains("selected"))&&ie(M,!1)}}}await new Promise(f=>setTimeout(f,i.length>0?100:25));let p=0;for(let f of i){if(me(f)){p++;continue}console.warn(`[EasyQuiz Auto-Cura] A\xE7\xE3o '${f.t}' no alvo '${f.id||f.from||""}' n\xE3o verificada no DOM. Disparando Passagem 2 de conting\xEAncia...`);try{nt(f,o),await Lt(f)}catch(b){l.set(f,b instanceof Error?b.message:String(b)),console.warn("[EasyQuiz Auto-Cura] Rota alternativa falhou:",b)}await new Promise(b=>setTimeout(b,250)),me(f)&&(console.log("[EasyQuiz Auto-Cura] \u2713 A\xE7\xE3o recuperada com sucesso pela rota de conting\xEAncia!"),p++,l.has(f)&&(l.delete(f),s++))}if(p<i.length&&i.length>0){console.warn(`[EasyQuiz Auto-Cura] ${i.length-p} de ${i.length} a\xE7\xE3o(\xF5es) ainda n\xE3o verificadas. Disparando Passagem 3 final...`),await new Promise(f=>setTimeout(f,200));for(let f of i)if(!me(f))try{await Lt(f)}catch(b){l.set(f,b instanceof Error?b.message:String(b))}await new Promise(f=>setTimeout(f,200)),p=0;for(let f of i)me(f)&&(p++,l.has(f)&&(l.delete(f),s++))}for(let f of i)me(f)||r.push(f.t==="drag"?`${f.from} -> ${f.to}`:"id"in f?f.id:f.t);c&&i.length===0&&r.push("nenhuma a\xE7\xE3o de resposta prescrita");let d=i.map((f,b)=>{let E=f.t==="drag"?`${f.from} -> ${f.to}`:f.t==="js"?"$eq":f.id||f.t,T=f.t==="js"?!0:f.t==="drag"?!!(J(f.from,"source")&&J(f.to,"destination")):!!(k(f.id||"")||k(x(f.id||""))),w=me(f);return{index:b,action:f,target:E,located:T,applied:!l.has(f),verified:w,strategy:f.t==="drag"?"drag-adaptive":f.t==="js"?"javascript":"declarative-dom",evidence:w?"estado do controle confirmado no DOM":"nenhuma evid\xEAncia suficiente ap\xF3s as tentativas",...l.has(f)?{error:l.get(f)}:{}}}),m=c?i.length>0&&r.length===0&&(p===i.length||s===i.length&&p>0):!0,h=!1,g=!1,_="Nenhuma a\xE7\xE3o de navega\xE7\xE3o solicitada.",y=s>0&&s>=i.length/2;if(e&&(m||!c||y)){await new Promise(w=>setTimeout(w,i.length>0?120:40));let f=!1;if(n.pageType!=="info"){let w=dn();w&&S(w)&&(await at(w,1200),F(w),f=!0,await new Promise(M=>setTimeout(M,350)))}let b=un(),E=a.length>0?a[0].id:void 0,T=it(E);if(!T&&f&&(await new Promise(w=>setTimeout(w,250)),T=it(E)),T){await at(T,1500);let w=E||T.textContent?.trim()||"";w&&Ne(window.location.hostname,{advanceSelector:w}),F(T);let M=await pn(b,1800);g=M.changed,_=M.evidence,h=M.changed||f,!M.changed&&!f&&console.warn("[EasyQuiz] O bot\xE3o de avan\xE7o foi acionado, mas a navega\xE7\xE3o ainda n\xE3o concluiu.")}else f?(h=!0,g=!0,_="Resposta confirmada via bot\xE3o de verifica\xE7\xE3o/envio."):console.warn("[EasyQuiz] Nenhum bot\xE3o de avan\xE7o encontrado na p\xE1gina.")}return{applied:s,verified:p,success:m,advanced:h,failed:r,reports:d,navigationVerified:g,navigationEvidence:_}}var ke=class{el=null;state="idle";mouseX=-300;mouseY=-300;displayX=-300;displayY=-300;rafId=null;flashTimer=null;boundMove;constructor(){this.boundMove=e=>{this.mouseX=e.clientX,this.mouseY=e.clientY,this.displayX===-300&&(this.displayX=e.clientX,this.displayY=e.clientY)},window.addEventListener("mousemove",this.boundMove,{passive:!0}),this.injectStyle(),this.createEl(),this.startRaf()}injectStyle(){if(document.getElementById("__eqdc_style__"))return;let e=document.createElement("style");e.id="__eqdc_style__",e.textContent=`
      @keyframes __eqdc_spin__ {
        0%   { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      #__eqdiscrete_coin__ {
        position: fixed;
        width: 14px;
        height: 14px;
        z-index: 2147483646;
        pointer-events: none;
        display: none;
        user-select: none;
        line-height: 0;
        background: transparent !important;
        background-color: transparent !important;
        box-shadow: none !important;
        border: none !important;
      }
      .__eqdc_ring__ {
        width: 14px;
        height: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        transform-origin: center center !important;
        animation: __eqdc_spin__ 0.85s linear infinite !important;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      .__eqdc_svg_icon__ {
        display: block;
        filter: drop-shadow(0 1px 2px rgba(0,0,0,0.35));
      }
    `,document.documentElement.appendChild(e)}createEl(){this.el=document.createElement("div"),this.el.id="__eqdiscrete_coin__",document.documentElement.appendChild(this.el)}startRaf(){let t=()=>{if(this.el&&this.state!=="idle"){this.displayX+=(this.mouseX-this.displayX)*.22,this.displayY+=(this.mouseY-this.displayY)*.22;let o=Math.min(this.displayX+11,window.innerWidth-18),i=Math.min(Math.max(this.displayY-2,2),window.innerHeight-18);this.el.style.left=`${o}px`,this.el.style.top=`${i}px`}this.rafId=requestAnimationFrame(t)};this.rafId=requestAnimationFrame(t)}setState(e){this.state=e;let t=this.el;if(t){if(e==="idle"){t.style.display="none",t.innerHTML="";return}t.style.display="block",e==="loading"?t.innerHTML=`
        <div class="__eqdc_ring__">
          <svg class="__eqdc_svg_icon__" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 20 20">
            <!-- Trilha branca s\xF3lida \u2014 define o furo no centro -->
            <circle cx="10" cy="10" r="7" fill="none" stroke="#FFFFFF" stroke-width="3.5"/>
            <!-- Arco azul Windows 10 (#0078D7) girat\xF3rio -->
            <circle cx="10" cy="10" r="7" fill="none" stroke="#0078D7" stroke-width="3.5"
              stroke-dasharray="22 22" stroke-linecap="round"/>
          </svg>
        </div>`:e==="ok"?t.innerHTML=`
        <svg class="__eqdc_svg_icon__" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 20 20">
          <polyline points="3,10 8,15.5 17,4.5"
            fill="none" stroke="#107C10" stroke-width="2.8"
            stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`:e==="error"&&(t.innerHTML=`
        <svg class="__eqdc_svg_icon__" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 20 20">
          <line x1="4" y1="4" x2="16" y2="16" stroke="#C42B1C" stroke-width="2.8" stroke-linecap="round"/>
          <line x1="16" y1="4" x2="4" y2="16" stroke="#C42B1C" stroke-width="2.8" stroke-linecap="round"/>
        </svg>`)}}getState(){return this.state}flashOk(e=2e3){this.flashTimer&&clearTimeout(this.flashTimer),this.setState("ok"),this.flashTimer=window.setTimeout(()=>{this.state==="ok"&&this.setState("idle")},e)}flashError(e=2500){this.flashTimer&&clearTimeout(this.flashTimer),this.setState("error"),this.flashTimer=window.setTimeout(()=>{this.state==="error"&&this.setState("idle")},e)}destroy(){window.removeEventListener("mousemove",this.boundMove),this.rafId!==null&&cancelAnimationFrame(this.rafId),this.flashTimer&&clearTimeout(this.flashTimer),this.el?.remove(),this.el=null,document.getElementById("__eqdc_style__")?.remove()}};var Me=class{container=null;currentEl=null;currentTimer=null;currentPersistId=null;lastText="";constructor(){this.injectStyle(),this.createContainer()}injectStyle(){if(document.getElementById("__eqdt_style__"))return;let e=document.createElement("style");e.id="__eqdt_style__",e.textContent=`
      @keyframes __eqdt_in__  { from{opacity:0} to{opacity:1} }
      @keyframes __eqdt_out__ { from{opacity:1} to{opacity:0} }
      .__eqdt_in__  { animation: __eqdt_in__  0.1s ease forwards; }
      .__eqdt_out__ { animation: __eqdt_out__ 0.18s ease forwards; }
    `,document.documentElement.appendChild(e)}createContainer(){this.container=document.createElement("div"),this.container.id="__eqdiscrete_toasts__",Object.assign(this.container.style,{position:"fixed",bottom:"0",right:"0",zIndex:"2147483645",pointerEvents:"none"}),document.documentElement.appendChild(this.container)}makeEl(e){let t=document.createElement("div");return t.className="__eqdt_in__",Object.assign(t.style,{background:"rgba(30,30,30,0.96)",color:"#ffffff",borderRadius:"0",borderTopLeftRadius:"3px",padding:"2px 6px",fontSize:"9.5px",fontFamily:'system-ui,-apple-system,"Segoe UI",sans-serif',fontWeight:"400",lineHeight:"1.4",whiteSpace:"nowrap",maxWidth:"170px",overflow:"hidden",textOverflow:"ellipsis",userSelect:"none",display:"block",boxShadow:"none"}),t.textContent=e,t}show(e,t=3e3,o=!1){if(this.lastText=e,this.clearCurrent(!0),!this.container)return"";let i=this.makeEl(e);this.container.appendChild(i),this.currentEl=i;let a=`t_${Date.now()}`;return i.setAttribute("data-tid",a),o?this.currentPersistId=a:(this.currentTimer=window.setTimeout(()=>this.clearCurrent(!1),t),this.currentPersistId=null),a}flash(e,t=3e3){this.show(e,t)}persist(e){return this.show(e,0,!0)}dismiss(e){this.currentPersistId===e&&(this.clearCurrent(!1),this.currentPersistId=null)}dismissAll(){this.clearCurrent(!0)}replace(e,t){return this.dismiss(e),this.persist(t)}reshow(){this.lastText&&this.show(this.lastText,2e3)}clearCurrent(e){this.currentTimer!==null&&(clearTimeout(this.currentTimer),this.currentTimer=null);let t=this.currentEl;t&&(this.currentEl=null,this.currentPersistId=null,e?t.remove():(t.className="__eqdt_out__",setTimeout(()=>t.remove(),200)))}destroy(){this.clearCurrent(!0),this.container?.remove(),this.container=null,document.getElementById("__eqdt_style__")?.remove()}};var Ce=class{el=null;lastMouseX=0;lastMouseY=0;onModelChange;boundMouseMove;boundOutside;autoTimer=null;constructor(e){this.onModelChange=e.onModelChange,this.boundMouseMove=t=>{this.lastMouseX=t.clientX,this.lastMouseY=t.clientY},this.boundOutside=t=>{t instanceof KeyboardEvent&&t.key!=="Escape"||t instanceof MouseEvent&&this.el?.contains(t.target)||this.close()},window.addEventListener("mousemove",this.boundMouseMove,{passive:!0}),this.injectStyle()}injectStyle(){if(document.getElementById("__eqdm_style__"))return;let e=document.createElement("style");e.id="__eqdm_style__",e.textContent=`
      #__eqdm_menu__ {
        position: fixed;
        min-width: 200px;
        max-width: 280px;
        background: #fff;
        border: 1px solid rgba(0,0,0,0.12);
        border-radius: 4px;
        box-shadow: 0 4px 16px rgba(0,0,0,0.18), 0 1px 4px rgba(0,0,0,0.10);
        z-index: 2147483647;
        padding: 4px 0;
        font-family: system-ui,-apple-system,"Segoe UI","Helvetica Neue",Arial,sans-serif;
        font-size: 13px;
        color: #202124;
        user-select: none;
        outline: none;
        animation: __eqdm_in__ 0.08s ease;
        overflow: hidden;
      }
      @keyframes __eqdm_in__ {
        from { opacity:0; transform:scale(0.97) translateY(-3px); }
        to   { opacity:1; transform:scale(1) translateY(0); }
      }
      .__eqdm_section__ {
        padding: 6px 12px 3px;
        font-size: 11px;
        color: #70757a;
        font-weight: 400;
        letter-spacing: 0;
        pointer-events: none;
        line-height: 1.4;
      }
      .__eqdm_sep__ {
        height: 0;
        border: none;
        border-top: 1px solid #e8eaed;
        margin: 4px 0;
      }
      .__eqdm_item__ {
        display: grid;
        grid-template-columns: 20px 1fr auto;
        align-items: center;
        padding: 0 12px 0 8px;
        height: 28px;
        gap: 6px;
        cursor: default;
        white-space: nowrap;
        overflow: hidden;
        color: #202124;
        position: relative;
        outline: none;
      }
      .__eqdm_item__:hover,
      .__eqdm_item__:focus {
        background: #1a73e8;
        color: #fff;
      }
      .__eqdm_item__:hover .__eqdm_badge__,
      .__eqdm_item__:focus .__eqdm_badge__ {
        background: rgba(255,255,255,0.25);
        color: rgba(255,255,255,0.9);
      }
      .__eqdm_check__ {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 13px;
        width: 16px;
        flex-shrink: 0;
        color: #1a73e8;
      }
      .__eqdm_item__:hover .__eqdm_check__,
      .__eqdm_item__:focus .__eqdm_check__ {
        color: #fff;
      }
      .__eqdm_name__ {
        overflow: hidden;
        text-overflow: ellipsis;
        line-height: 28px;
        font-size: 13px;
      }
      .__eqdm_badge__ {
        font-size: 10px;
        color: #70757a;
        background: #f1f3f4;
        border-radius: 10px;
        padding: 1px 6px;
        flex-shrink: 0;
        transition: background 0.08s, color 0.08s;
        letter-spacing: 0;
      }
    `,document.documentElement.appendChild(e)}open(){this.close();let t=oe().model,o=[...xe],i=(Ee||[]).filter(g=>!o.some(_=>_.id===g.id)),a=document.createElement("div");a.id="__eqdm_menu__",a.setAttribute("role","menu"),a.tabIndex=-1;let s=document.createElement("div");s.className="__eqdm_section__",s.textContent="Modelo Gemini",a.appendChild(s);let r=document.createElement("div");r.className="__eqdm_sep__",a.appendChild(r);let l=(g,_,y)=>{let v=g===t,f=document.createElement("div");f.className="__eqdm_item__",f.setAttribute("role","menuitemradio"),f.setAttribute("aria-checked",v?"true":"false"),f.tabIndex=0;let b=document.createElement("span");b.className="__eqdm_check__",v&&(b.innerHTML=`<svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
          <path d="M1.5 6.5L4.5 9.5L10.5 2.5" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`),f.appendChild(b);let E=document.createElement("span");if(E.className="__eqdm_name__",E.textContent=_,v&&(E.style.fontWeight="500"),f.appendChild(E),y){let T=document.createElement("span");T.className="__eqdm_badge__",T.textContent=y,f.appendChild(T)}f.addEventListener("click",()=>{he({model:g}),this.onModelChange?.(g),this.close()}),f.addEventListener("keydown",T=>{(T.key==="Enter"||T.key===" ")&&(T.preventDefault(),he({model:g}),this.onModelChange?.(g),this.close())}),a.appendChild(f)};for(let g of o){let _;g.id.includes("3.8")||g.id.includes("3.7")?_="Novo":g.id.includes("flash-lite")?_="Eco":g.id.includes("pro")&&(_="Pro");let y=g.name.replace(/\s*\(.*?\)\s*/g,"").trim();l(g.id,y,_)}if(i.length>0){let g=document.createElement("div");g.className="__eqdm_sep__",a.appendChild(g);let _=document.createElement("div");_.className="__eqdm_section__",_.textContent="Modelos da conta",a.appendChild(_);for(let y of i)l(y.id,y.name.replace(/\s*\(.*?\)\s*/g,"").trim())}document.documentElement.appendChild(a),this.el=a;let{offsetWidth:c,offsetHeight:u}=a,p=this.lastMouseX,d=this.lastMouseY,m=window.innerWidth,h=window.innerHeight;p+c+8>m&&(p=m-c-8),d+u+8>h&&(d=h-u-8),p<4&&(p=4),d<4&&(d=4),a.style.left=`${p}px`,a.style.top=`${d}px`,a.focus(),setTimeout(()=>{window.addEventListener("click",this.boundOutside,{capture:!0}),window.addEventListener("keydown",this.boundOutside,{capture:!0})},50),this.autoTimer=window.setTimeout(()=>this.close(),8e3)}close(){this.autoTimer&&(clearTimeout(this.autoTimer),this.autoTimer=null),window.removeEventListener("click",this.boundOutside,{capture:!0}),window.removeEventListener("keydown",this.boundOutside,{capture:!0}),this.el?.remove(),this.el=null}isOpen(){return this.el!==null}destroy(){this.close(),window.removeEventListener("mousemove",this.boundMouseMove),document.getElementById("__eqdm_style__")?.remove()}};var Le=class{el=null;coin;toast;boundEsc;constructor(e,t){this.coin=e,this.toast=t,this.boundEsc=o=>{o.key==="Escape"&&this.isOpen()&&(o.stopPropagation(),o.preventDefault(),this.close())},this.injectStyle()}injectStyle(){if(document.getElementById("__eqkm_style__"))return;let e=document.createElement("style");e.id="__eqkm_style__",e.textContent=`
      #__eqkm_overlay__ {
        position: fixed; inset: 0;
        background: rgba(0,0,0,0.22);
        z-index: 2147483643;
        display: flex; align-items: flex-start; justify-content: center;
        padding-top: 16px;
        animation: __eqkm_ov__ 0.1s ease;
      }
      @keyframes __eqkm_ov__ { from{opacity:0} to{opacity:1} }
      #__eqkm_dialog__ {
        background: #fff;
        border-radius: 8px;
        box-shadow: 0 8px 32px rgba(0,0,0,0.28), 0 2px 8px rgba(0,0,0,0.12);
        width: 400px;
        max-width: calc(100vw - 32px);
        font-family: system-ui,-apple-system,"Segoe UI",sans-serif;
        font-size: 14px;
        color: #202124;
        overflow: hidden;
        animation: __eqkm_dlg__ 0.16s cubic-bezier(0,0,0.2,1);
      }
      @keyframes __eqkm_dlg__ { from{transform:translateY(-12px);opacity:0} to{transform:translateY(0);opacity:1} }
      #__eqkm_dialog__ .__eqkm_title__ {
        display: flex; align-items: center; justify-content: space-between;
        padding: 20px 20px 0;
      }
      #__eqkm_dialog__ .__eqkm_title__ h2 {
        font-size: 16px; font-weight: 500; color: #202124; margin: 0;
      }
      #__eqkm_dialog__ .__eqkm_title__ .__eqkm_x__ {
        width: 32px; height: 32px; border-radius: 50%; border: none;
        background: transparent; cursor: pointer; display: flex;
        align-items: center; justify-content: center; color: #5f6368;
        font-size: 18px; line-height: 1; transition: background 0.1s;
      }
      #__eqkm_dialog__ .__eqkm_title__ .__eqkm_x__:hover { background: #f1f3f4; }
      #__eqkm_dialog__ .__eqkm_body__ { padding: 16px 20px; }
      #__eqkm_dialog__ .__eqkm_desc__ {
        font-size: 13px; color: #5f6368; margin: 0 0 16px; line-height: 1.5;
      }
      #__eqkm_dialog__ .__eqkm_field__ {
        position: relative; margin-bottom: 12px;
      }
      #__eqkm_dialog__ .__eqkm_field__ label {
        display: block; font-size: 11px; font-weight: 500;
        color: #5f6368; margin-bottom: 4px; letter-spacing: 0.01em;
      }
      #__eqkm_dialog__ .__eqkm_field__ textarea {
        width: 100%; height: 88px; resize: none;
        border: 1px solid #dadce0; border-radius: 4px;
        padding: 8px 10px; font-size: 12px;
        font-family: "SF Mono","Consolas","Fira Code",monospace;
        color: #202124; background: #fff; outline: none;
        box-sizing: border-box; transition: border 0.15s, box-shadow 0.15s;
        line-height: 1.5;
      }
      #__eqkm_dialog__ .__eqkm_field__ textarea:focus {
        border-color: #1a73e8;
        box-shadow: 0 0 0 2px rgba(26,115,232,0.2);
      }
      #__eqkm_dialog__ .__eqkm_count__ {
        font-size: 11px; color: #70757a; margin-top: 4px;
      }
      #__eqkm_dialog__ .__eqkm_status__ {
        font-size: 12px; min-height: 18px; margin-top: 2px;
        padding: 0; color: #5f6368;
      }
      #__eqkm_dialog__ .__eqkm_actions__ {
        display: flex; gap: 8px; justify-content: flex-end;
        padding: 12px 20px 16px;
        border-top: 1px solid #e8eaed;
        margin-top: 4px;
      }
      #__eqkm_dialog__ button {
        padding: 8px 20px; border-radius: 4px; font-size: 13px;
        font-weight: 500; cursor: pointer; border: none;
        font-family: system-ui,-apple-system,sans-serif;
        transition: background 0.1s, box-shadow 0.1s;
      }
      #__eqkm_dialog__ .__eqkm_ghost__ {
        background: transparent; color: #1a73e8; border: none;
      }
      #__eqkm_dialog__ .__eqkm_ghost__:hover { background: #e8f0fe; }
      #__eqkm_dialog__ .__eqkm_verify__ {
        background: transparent; color: #1a73e8; border: 1px solid #dadce0;
      }
      #__eqkm_dialog__ .__eqkm_verify__:hover { background: #e8f0fe; border-color: #1a73e8; }
      #__eqkm_dialog__ .__eqkm_primary__ {
        background: #1a73e8; color: #fff;
      }
      #__eqkm_dialog__ .__eqkm_primary__:hover { background: #1557b0; box-shadow: 0 1px 4px rgba(0,0,0,0.2); }
    `,document.documentElement.appendChild(e)}open(){if(this.isOpen()){this.close();return}let t=oe().apiKeys.join(`
`),o=document.createElement("div");o.id="__eqkm_overlay__";let i=document.createElement("div");i.id="__eqkm_dialog__",i.setAttribute("role","dialog"),i.setAttribute("aria-modal","true"),i.innerHTML=`
      <div class="__eqkm_title__">
        <h2>Chaves de acesso \xE0 API</h2>
        <button class="__eqkm_x__" id="__eqkm_close__" aria-label="Fechar">\u2715</button>
      </div>
      <div class="__eqkm_body__">
        <p class="__eqkm_desc__">Cole abaixo as chaves de acesso (uma por linha). Elas s\xE3o armazenadas localmente no navegador.</p>
        <div class="__eqkm_field__">
          <label for="__eqkm_ta__">Chaves de acesso</label>
          <textarea id="__eqkm_ta__" placeholder="AIza..." spellcheck="false" autocomplete="off"></textarea>
          <div class="__eqkm_count__" id="__eqkm_count__"></div>
        </div>
        <div class="__eqkm_status__" id="__eqkm_status__"></div>
      </div>
      <div class="__eqkm_actions__">
        <button class="__eqkm_ghost__" id="__eqkm_cancel__">Cancelar</button>
        <button class="__eqkm_verify__" id="__eqkm_verify__">Verificar</button>
        <button class="__eqkm_primary__" id="__eqkm_save__">Salvar</button>
      </div>
    `,o.appendChild(i),document.documentElement.appendChild(o),this.el=o;let a=i.querySelector("#__eqkm_ta__"),s=i.querySelector("#__eqkm_count__"),r=i.querySelector("#__eqkm_status__");a.value=t,this.updateCount(a.value,s),a.addEventListener("input",()=>this.updateCount(a.value,s)),i.querySelector("#__eqkm_close__").addEventListener("click",()=>this.close()),i.querySelector("#__eqkm_cancel__").addEventListener("click",()=>this.close()),i.querySelector("#__eqkm_save__").addEventListener("click",()=>{let l=this.parseKeys(a.value);he({apiKey:l[0]||"",apiKeys:l}),this.toast.flash("Config Saved"),this.coin.flashOk(1200),this.close()}),i.querySelector("#__eqkm_verify__").addEventListener("click",async()=>{let l=this.parseKeys(a.value);if(!l.length){r.style.color="#c5221f",r.textContent="Insira ao menos uma chave.";return}r.style.color="#70757a",r.textContent="Verificando\u2026",this.coin.setState("loading");try{let c=oe().model,u=await vt(c,l);u.ok?(r.style.color="#137333",r.textContent=`\u2713 Acesso v\xE1lido \u2014 ${u.model}`,this.coin.flashOk(),this.toast.flash("Access OK")):(r.style.color="#c5221f",r.textContent=`\u2717 ${u.message.slice(0,55)}`,this.coin.flashError(),this.toast.flash("Access Denied"))}catch{r.style.color="#c5221f",r.textContent="\u2717 Erro ao verificar.",this.coin.flashError()}}),o.addEventListener("click",l=>{l.target===o&&this.close()}),window.addEventListener("keydown",this.boundEsc,{capture:!0}),requestAnimationFrame(()=>a.focus())}parseKeys(e){return e.split(/[\n\r,]+/).map(t=>t.trim().replace(/^["']|["']$/g,"")).filter(t=>t.length>5)}updateCount(e,t){let o=this.parseKeys(e).length;t.textContent=o===0?"":`${o} chave${o!==1?"s":""} cadastrada${o!==1?"s":""}`}close(){window.removeEventListener("keydown",this.boundEsc,{capture:!0}),this.el?.remove(),this.el=null}isOpen(){return this.el!==null}destroy(){this.close()}};var qe=class{active=[];constructor(){this.injectStyle()}injectStyle(){if(document.getElementById("__eqsh_style__"))return;let e=document.createElement("style");e.id="__eqsh_style__",e.textContent=`
      @keyframes __eqsh_p__ {
        0%,100% { outline-color: rgba(0,120,212,0.15); }
        50%     { outline-color: rgba(0,120,212,0.26); }
      }
      .__eqsh__ {
        outline: 1px solid rgba(0,120,212,0.17) !important;
        outline-offset: 2px !important;
        animation: __eqsh_p__ 2.5s ease-in-out infinite !important;
      }
    `,document.documentElement.appendChild(e)}highlightTarget(e){this.clearAll();for(let t of e)!t||this.active.some(o=>o.el===t)||(this.active.push({el:t,orig:t.style.outline,origOffset:t.style.outlineOffset}),t.classList.add("__eqsh__"))}clearAll(){for(let{el:e,orig:t,origOffset:o}of this.active)e.classList.remove("__eqsh__"),e.style.outline=t,e.style.outlineOffset=o;this.active=[]}destroy(){this.clearAll(),document.getElementById("__eqsh_style__")?.remove()}};var Ie=class{opts;lastSignature="";pollTimer=null;debounceTimer=null;cooldownUntil=0;POLL_MS=700;DEBOUNCE_MS=500;COOLDOWN_MS=2500;origPush=history.pushState.bind(history);origReplace=history.replaceState.bind(history);constructor(e){this.opts=e}start(){this.lastSignature=this.getSignature(),this.patchHistory(),window.addEventListener("popstate",this.onUrlChange,{capture:!0,passive:!0}),this.pollTimer=window.setInterval(this.poll,this.POLL_MS)}stop(){this.unpatchHistory(),window.removeEventListener("popstate",this.onUrlChange,{capture:!0}),this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null),this.debounceTimer&&(clearTimeout(this.debounceTimer),this.debounceTimer=null)}resetHash(){this.lastSignature=this.getSignature(),this.cooldownUntil=Date.now()+this.COOLDOWN_MS}patchHistory(){let e=this;history.pushState=function(...t){e.origPush(...t),e.onUrlChange()},history.replaceState=function(...t){e.origReplace(...t),e.onUrlChange()}}unpatchHistory(){history.pushState=this.origPush,history.replaceState=this.origReplace}onUrlChange=()=>{let e=this.getSignature();e&&e!==this.lastSignature&&this.debounce()};poll=()=>{let e=this.getSignature();e&&e!==this.lastSignature&&this.debounce()};getSignature(){try{let e=location.href,t=document.title||"",i=document.querySelector('.question-text, .qtext, [data-question], [class*="question" i] h2, [class*="question" i] h3, [class*="prompt" i], [role="main"], main, article')?.innerText?.trim()?.slice(0,300)||"",a=document.querySelectorAll('input:not([type="hidden"]), textarea, select, [role="radio"], [role="checkbox"], [role="option"], .option-card, [class*="choice" i], [class*="option" i]').length,s=Math.round((document.body?.innerText||"").length/50)*50;return`${e}|${t}|${i}|${a}|${s}`}catch{return""}}debounce(){this.debounceTimer&&clearTimeout(this.debounceTimer);let e=Date.now(),t=e<this.cooldownUntil?Math.max(this.cooldownUntil-e+80,this.DEBOUNCE_MS):this.DEBOUNCE_MS;this.debounceTimer=window.setTimeout(()=>{let o=this.getSignature();o&&o!==this.lastSignature&&(this.lastSignature=o,this.cooldownUntil=Date.now()+this.COOLDOWN_MS,this.opts.onPageAdvance())},t)}};var fn=new Set(["Control","Alt","Meta","Shift","CapsLock","Tab","Escape","F1","F2","F3","F4","F5","F6","F7","F8","F9","F10","F11","F12","PrintScreen","ScrollLock","Pause","Insert","Home","End","PageUp","PageDown","ArrowLeft","ArrowRight","ArrowUp","ArrowDown","ContextMenu","NumLock"]),hn=n=>n.altKey||n.shiftKey&&"QAMZRHIC".includes(n.key.toUpperCase()),gn=Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"value")?.set,bn=Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype,"value")?.set,Oe=class{flow=[];stepIdx=0;state="idle";isExecuting=!1;stepping=!1;pendingClick=!1;lastClickTs=0;coin;toast;highlight;debugOutput;stepTimer=null;charsInserted=new Map;failedSteps=new Set;boundKey;boundClick;constructor(e,t,o,i){this.coin=e,this.toast=t,this.highlight=o,this.debugOutput=i,this.boundKey=this.onKey.bind(this),this.boundClick=this.onClick.bind(this)}setDebugOutput(e){this.debugOutput=e}start(e){this.abort(),e?.length&&(this.flow=e,this.stepIdx=0,this.charsInserted.clear(),this.failedSteps.clear(),this.state="idle",this.isExecuting=!1,this.stepping=!1,this.pendingClick=!1,this.debugOutput?.setFlow(e),this.attach(),this.gotoStep(0))}abort(){let e=this.isActive();this.state="aborted",this.isExecuting=!1,this.stepping=!1,this.pendingClick=!1,this.detach(),this.clearTimer(),this.highlight.clearAll(),e&&(this.coin.flashError(800),this.toast.flash("Abortado"),this.debugOutput?.log("FLOW","Fluxo abortado pelo usu\xE1rio"))}isActive(){return this.state==="waiting_key"||this.state==="waiting_click"}getState(){return this.state}getCurrentStep(){return this.stepIdx}getTotalSteps(){return this.flow.length}attach(){window.addEventListener("keydown",this.boundKey,{capture:!0}),window.addEventListener("click",this.boundClick,{capture:!0})}detach(){window.removeEventListener("keydown",this.boundKey,{capture:!0}),window.removeEventListener("click",this.boundClick,{capture:!0})}gotoStep(e){if(this.isExecuting=!1,this.stepping=!1,this.pendingClick=!1,this.clearTimer(),this.highlight.clearAll(),e>=this.flow.length){this.complete();return}this.stepIdx=e;let t=this.flow[e];this.state=t.trigger==="key"?"waiting_key":"waiting_click",this.debugOutput?.setStepIndex(e);let o=t.action;if(o.id||o.label||o.from||o.v||o.name||o.n){let a=this.resolveEl(o);if(a&&(this.highlight.highlightTarget([a]),t.trigger==="key")){let s=this.resolveInput(a);try{s?.focus?.()}catch{}}}let i=t.hint||(t.trigger==="key"?"Keyboard Interact":"Mouse Interact");this.toast.flash(i),t.customMsg&&setTimeout(()=>{this.stepIdx===e&&this.isActive()&&this.toast.flash(t.customMsg)},500),this.stepTimer=window.setTimeout(()=>{this.stepIdx===e&&this.isActive()&&this.toast.flash(i)},9e4)}clearTimer(){this.stepTimer!==null&&(clearTimeout(this.stepTimer),this.stepTimer=null)}onKey(e){if(fn.has(e.key)||hn(e))return;if(this.state==="waiting_click"){this.toast.flash("Mouse Interact");return}if(this.state!=="waiting_key"||this.stepping)return;this.debugOutput?.log("KEY",`Gatilho de teclado: "${e.key}" (Passo ${this.stepIdx+1})`);let o=this.flow[this.stepIdx].action;if(o.t!=="val")return;let i=String(o.v??""),a=1;if(i.length===0){this.stepping=!0,this.clearTimer(),this.highlight.clearAll(),this.debugOutput?.markStepSuccess(this.stepIdx,"Texto vazio \u2014 avan\xE7o autom\xE1tico"),setTimeout(()=>this.gotoStep(this.stepIdx+1),40);return}if(this.insertChars(this.stepIdx,o,i,a))this.stepping=!0,this.clearTimer(),this.highlight.clearAll(),this.coin.flashOk(800),this.debugOutput?.markStepSuccess(this.stepIdx,`"${i}" inserido com sucesso`),setTimeout(()=>this.gotoStep(this.stepIdx+1),50);else{let r=this.charsInserted.get(this.stepIdx)??0,l=Math.round(r/i.length*100);this.toast.flash(`${l}%`)}}onClick(e){if(!e.isTrusted)return;let t=e.target;if(!t||t.closest("#__eqdm_menu__,#__eqkm_overlay__,#__eqcm_menu__,#__eqdiscrete_coin__,#__eqdiscrete_toasts__,#__eq_dbg_window__,#__eq_dbg_pill__"))return;if(this.state==="waiting_key"){this.toast.flash("Keyboard Interact");return}if(this.state!=="waiting_click")return;let o=Date.now();if(this.isExecuting){o-this.lastClickTs>80&&(this.pendingClick=!0,this.debugOutput?.log("CLICK",`Clique r\xE1pido enfileirado (Passo ${this.stepIdx+1})`));return}this.lastClickTs=o,this.debugOutput?.log("CLICK",`Gatilho de mouse em <${t.tagName.toLowerCase()}> (Passo ${this.stepIdx+1})`);let i=this.flow[this.stepIdx],a=i.action;if(String(a.t??"")==="adv"){this.clearTimer(),this.highlight.clearAll(),this.debugOutput?.markStepSuccess(this.stepIdx,"Avan\xE7o natural do usu\xE1rio"),setTimeout(()=>this.gotoStep(this.stepIdx+1),80);return}e.preventDefault(),e.stopImmediatePropagation(),this.isExecuting=!0,this.pendingClick=!1,this.execClickAction(a,i).then(r=>{this.clearTimer(),this.highlight.clearAll(),this.isExecuting=!1;let l=this.pendingClick;this.pendingClick=!1,r?this.coin.flashOk(700):(this.failedSteps.add(this.stepIdx),this.coin.flashError(600)),setTimeout(()=>this.gotoStep(this.stepIdx+1),l?20:r?60:30)}).catch(r=>{this.isExecuting=!1,this.pendingClick=!1,this.failedSteps.add(this.stepIdx),this.debugOutput?.markStepFailed(this.stepIdx,`Exce\xE7\xE3o: ${r instanceof Error?r.message:String(r)}`),setTimeout(()=>this.gotoStep(this.stepIdx+1),30)})}async execClickAction(e,t){let o=String(e.t??"");try{if(o==="chk"||o==="clk"){let i=this.resolveEl(e);if(!i)return this.toast.flash("Alvo n\xE3o achado"),this.debugOutput?.markStepFailed(this.stepIdx,`Alvo n\xE3o encontrado: ${JSON.stringify(e)}`),!1;let a=i instanceof HTMLInputElement&&["radio","checkbox"].includes(i.type);if(a||i.getAttribute("role")==="radio"||i.getAttribute("role")==="checkbox"||i.closest('.option-card, [role="radio"], [role="checkbox"], [role="option"], .vf-radio-group, .vf-label')!==null||o==="chk"){let r=a?i:i.querySelector('input[type="radio"], input[type="checkbox"]')||(i.getAttribute("for")?i.ownerDocument.getElementById(i.getAttribute("for")):null),l=r||i,c=l.closest("label"),u=l.id?document.querySelector(`label[for="${P(l.id)}"]`):null,p=c||u||l.closest("td")||l,d=e.c!==void 0?!!e.c:!0;if(ie(l,d),r&&r.checked!==d){try{let m=r._valueTracker;m&&m.setValue(!d)}catch{}try{Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"checked")?.set?.call(r,d)}catch{}r.dispatchEvent(new Event("input",{bubbles:!0,composed:!0})),r.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}if(r&&r.checked!==d&&p&&p!==r&&(F(p),await new Promise(m=>setTimeout(m,16))),r&&r.checked!==d)try{let m=l.getBoundingClientRect(),h=m.left+m.width/2,g=m.top+m.height/2;for(let _ of["pointerdown","mousedown","pointerup","mouseup","click"])l.dispatchEvent(new PointerEvent(_,{bubbles:!0,cancelable:!0,composed:!0,clientX:h,clientY:g,pointerId:1,isPrimary:!0}));await new Promise(_=>setTimeout(_,16))}catch{}if(r&&r.checked!==d){try{r.checked=d}catch{}try{r.click()}catch{}await new Promise(m=>setTimeout(m,8)),r.dispatchEvent(new Event("change",{bubbles:!0}))}if(r){if(r.checked===d)this.debugOutput?.markStepSuccess(this.stepIdx,`[name="${r.name}"] marcado checked=${d}`);else return r.type==="radio"&&r.name&&document.querySelector(`input[name="${P(r.name)}"]:checked`)?(this.debugOutput?.markStepSuccess(this.stepIdx,`Grupo de r\xE1dio [name="${r.name}"] tem sele\xE7\xE3o`),!0):(this.debugOutput?.markStepFailed(this.stepIdx,`[name="${r.name}"] resistiu ap\xF3s 5 estrat\xE9gias`),!1);return!0}return p&&F(p),this.debugOutput?.markStepSuccess(this.stepIdx,"Op\xE7\xE3o customizada ativada"),!0}return F(i),this.debugOutput?.markStepSuccess(this.stepIdx,`<${i.tagName.toLowerCase()}> ativado`),!0}if(o==="sel"){let i=this.resolveEl(e);if(!i)return this.toast.flash("Alvo n\xE3o achado"),this.debugOutput?.markStepFailed(this.stepIdx,`Select n\xE3o encontrado: ${JSON.stringify(e)}`),!1;let a=i instanceof HTMLSelectElement?i:i.querySelector("select");if(a){let s=String(Array.isArray(e.v)?e.v[0]:e.v??"");for(let l=0;l<a.options.length;l++)if(a.options[l].value===s||a.options[l].text.trim()===s)return a.selectedIndex=l,a.dispatchEvent(new Event("change",{bubbles:!0})),this.debugOutput?.markStepSuccess(this.stepIdx,`Select atualizado para "${s}"`),!0;let r=parseInt(s,10);if(!isNaN(r)&&r>=0&&r<a.options.length)return a.selectedIndex=r,a.dispatchEvent(new Event("change",{bubbles:!0})),this.debugOutput?.markStepSuccess(this.stepIdx,`Select atualizado por \xEDndice ${r}`),!0}return i&&F(i),!!i}if(o==="drag"){let i=String(e.from??e.id??""),a=String(e.to??e.label??""),s=J(i,"source")||k(i),r=J(a,"destination")||k(a);return s&&r?(await fe(s,r),this.debugOutput?.markStepSuccess(this.stepIdx,`Arrasto conclu\xEDdo de "${i}" para "${a}"`),!0):(this.toast.flash("Alvo n\xE3o achado"),this.debugOutput?.markStepFailed(this.stepIdx,`Alvo de arrasto n\xE3o achado: from="${i}", to="${a}"`),!1)}if(o==="adv")return this.debugOutput?.markStepSuccess(this.stepIdx,"Avan\xE7o de etapa"),!0}catch(i){return this.toast.flash("Erro exec"),this.debugOutput?.markStepFailed(this.stepIdx,`Erro de execu\xE7\xE3o: ${i instanceof Error?i.message:String(i)}`),!1}return!0}insertChars(e,t,o,i){let a=this.charsInserted.get(e)??0;if(a>=o.length)return!0;let s=this.resolveEl(t);if(!s)return this.toast.flash("Campo n\xE3o achado"),this.debugOutput?.markStepFailed(e,`Campo de texto n\xE3o encontrado: ${JSON.stringify(t)}`),this.charsInserted.set(e,o.length),!0;let r=this.resolveInput(s);if(!r)return this.charsInserted.set(e,o.length),!0;let l=o.slice(a,a+i),c=a+l.length;if(this.applyValueSlice(r,l),this.charsInserted.set(e,c),c>=o.length){try{r.blur?.()}catch{}return!0}return!1}applyValueSlice(e,t){if(e instanceof HTMLInputElement||e instanceof HTMLTextAreaElement){let o=e.value+t,i=e instanceof HTMLInputElement?gn:bn;i?i.call(e,o):e.value=o,e.dispatchEvent(new Event("input",{bubbles:!0,cancelable:!0})),e.dispatchEvent(new Event("change",{bubbles:!0,cancelable:!0}));try{e.setSelectionRange(o.length,o.length)}catch{}}else if(e.isContentEditable){let o=e;o.textContent=(o.textContent??"")+t,o.dispatchEvent(new Event("input",{bubbles:!0}));try{let i=document.createRange();i.selectNodeContents(o),i.collapse(!1);let a=window.getSelection();a?.removeAllRanges(),a?.addRange(i)}catch{}}}resolveEl(e){let t=String(e.id??"").trim(),o=String(e.v??"").trim(),i=String(e.label??"").trim(),a=String(e.from??"").trim(),s=String(e.name??e.n??"").trim(),l=(o||(i.match(/:\s*(verdadeiro|falso|v|f)\b/i)?.[1]??"")||(t.match(/_(v|f|verdadeiro|falso)$/i)?.[1]??"")).toLowerCase().trim(),c=/^(v|verdadeiro|true|t|1|sim|yes|correto)$/i.test(l)||l.includes("verdadeir"),u=/^(f|falso|false|0|nao|não|no|incorreto|errado)$/i.test(l)||l.includes("fals"),p=c||u,d=c?["v","verdadeiro","true","1","t","sim","correto"]:["f","falso","false","0","n\xE3o","nao","incorreto","errado"];if(s){let g=Array.from(document.querySelectorAll(`input[name="${P(s)}"]`));if(o){let _=g.find(y=>y.value?.toLowerCase()===o.toLowerCase());if(_)return _}if(p){let _=g.find(y=>this.isVfMatch(y,d));if(_)return _}if(g.length>0)return g[0]}let m=null;if(t&&(m=k(t,o,e.t==="val")),!m&&i&&(m=k(i,o,e.t==="val")),!m&&a&&(m=k(a,o,e.t==="val")),p){if(m){if(m instanceof HTMLInputElement&&m.type==="radio"&&m.name){if(this.isVfMatch(m,d))return m;let b=Array.from(document.querySelectorAll(`input[type="radio"][name="${P(m.name)}"]`)).find(E=>this.isVfMatch(E,d));if(b)return b}let _=m.closest('tr, [role="row"], [role="radiogroup"], .vf-row, [class*="row" i], fieldset, td, div')||m,v=Array.from(_.querySelectorAll('input[type="radio"], input[type="checkbox"], [role="radio"], label, td, [class*="choice" i], [class*="option" i]')).find(f=>this.isVfMatch(f,d));if(v)return(v instanceof HTMLInputElement?v:v.querySelector('input[type="radio"]'))||v}let g=(i||t).replace(/:\s*(verdadeiro|falso|v|f)\b/i,"").toLowerCase();if(g){let _=Array.from(document.querySelectorAll('tr, [role="row"], [role="radiogroup"], .vf-row, [class*="row" i], li')),y=x(g).toLowerCase(),v=_.find(f=>{let b=x(f.textContent||"").toLowerCase();return y.length>=3&&b.includes(y)||t&&f.id===t});if(v){let b=Array.from(v.querySelectorAll('input[type="radio"], [role="radio"], label, td')).find(E=>this.isVfMatch(E,d));if(b)return(b instanceof HTMLInputElement?b:b.querySelector('input[type="radio"]'))||b}}}let h=(t||i||o).trim().toLowerCase();if(h){let _=Array.from(document.querySelectorAll('input, label, button, [role="radio"], [role="checkbox"], .option-card, [class*="option" i], [class*="choice" i]')).find(y=>{let v=(y.textContent||"").trim().toLowerCase();return(y.value?String(y.value).trim().toLowerCase():"")===h||v===h||v.startsWith(h+")")||v.startsWith("("+h+")")||h.length>=3&&v.includes(h)});if(_)return _}return m}isVfMatch(e,t){if(!e)return!1;let o=e.value?String(e.value).trim().toLowerCase():"",i=(e.getAttribute("aria-label")||"").trim().toLowerCase(),a=(e.getAttribute("data-value")||"").trim().toLowerCase();if(o&&t.includes(o)||a&&t.includes(a)||i&&t.includes(i))return!0;let s=e.closest('label, td, [class*="option" i], [class*="choice" i]'),r=((e.className||"")+" "+(s?.className||"")).toLowerCase();if(t.includes("v")&&(r.includes("vf-true")||r.includes("true")||r.includes("verdadeiro"))||t.includes("f")&&(r.includes("vf-false")||r.includes("false")||r.includes("falso")))return!0;if(s){let l=x(s.textContent||"").trim().toLowerCase();for(let c of t)if(l===c||l.startsWith(c+" ")||l.endsWith(" "+c)||l.startsWith("("+c+")")||l.startsWith(c+")")||c.length>=4&&l.includes(c))return!0}if(e.id){let l=document.querySelector(`label[for="${P(e.id)}"]`);if(l){let c=x(l.textContent||"").trim().toLowerCase();for(let u of t)if(c===u||c.startsWith(u+" ")||c.endsWith(" "+u)||c.startsWith("("+u+")")||c.startsWith(u+")")||u.length>=4&&c.includes(u))return!0}}return!1}resolveInput(e){return e instanceof HTMLInputElement||e instanceof HTMLTextAreaElement||e.isContentEditable?e:e.querySelector("input:not([type=hidden]):not([type=submit]):not([type=button]):not([type=radio]):not([type=checkbox]),textarea,[contenteditable=true]")??e}async forceStep(e){if(e<0||e>=this.flow.length)return!1;let t=this.flow[e],o=t.action;if(String(o.t??"")==="val"){let a=String(o.v??""),s=this.resolveEl(o);if(!s)return!1;let r=this.resolveInput(s);return r?(this.applyValueSlice(r,a),this.charsInserted.set(e,a.length),this.debugOutput?.markStepSuccess(e,`Texto "${a}" injetado`),!0):!1}return await this.execClickAction(o,t)}async forceAll(){this.toast.flash("Injetando respostas...");for(let e=0;e<this.flow.length;e++)this.flow[e].action.t!=="adv"&&(await this.forceStep(e),await new Promise(i=>setTimeout(i,60)));this.complete()}complete(){this.state="done",this.isExecuting=!1,this.detach(),this.clearTimer(),this.highlight.clearAll(),this.failedSteps.size>0?(this.coin.flashError(2200),this.toast.flash("Conclu\xEDdo c/ erros"),this.debugOutput?.log("WARN",`Fluxo finalizado com ${this.failedSteps.size} passos que falharam!`)):(this.coin.flashOk(1800),this.toast.flash("Conclu\xEDdo"),this.debugOutput?.log("FLOW","Fluxo finalizado com 100% de sucesso!"))}destroy(){this.isActive()?this.abort():(this.detach(),this.clearTimer())}};var He=class{el=null;lastMouseX=0;lastMouseY=0;boundOutside;boundMouseMove;commands=[];constructor(){this.boundMouseMove=e=>{this.lastMouseX=e.clientX,this.lastMouseY=e.clientY},this.boundOutside=e=>{e instanceof KeyboardEvent&&e.key!=="Escape"||e instanceof MouseEvent&&this.el?.contains(e.target)||this.close()},window.addEventListener("mousemove",this.boundMouseMove,{passive:!0}),this.injectStyle()}setCommands(e){this.commands=e}injectStyle(){if(document.getElementById("__eqcm_style__"))return;let e=document.createElement("style");e.id="__eqcm_style__",e.textContent=`
      #__eqcm_menu__ {
        position: fixed;
        min-width: 230px;
        max-width: 300px;
        background: #fff;
        border: 1px solid rgba(0,0,0,0.12);
        border-radius: 4px;
        box-shadow: 0 4px 16px rgba(0,0,0,0.18), 0 1px 4px rgba(0,0,0,0.10);
        z-index: 2147483647;
        padding: 4px 0;
        font-family: system-ui,-apple-system,"Segoe UI",sans-serif;
        font-size: 13px;
        color: #202124;
        user-select: none;
        outline: none;
        animation: __eqcm_in__ 0.08s ease;
        overflow: hidden;
      }
      @keyframes __eqcm_in__ {
        from { opacity:0; transform:scale(0.97) translateY(-3px); }
        to   { opacity:1; transform:scale(1) translateY(0); }
      }
      .__eqcm_section__ {
        padding: 6px 12px 3px;
        font-size: 11px; color: #70757a;
        pointer-events: none; line-height: 1.4;
      }
      .__eqcm_sep__ {
        height: 0; border: none;
        border-top: 1px solid #e8eaed;
        margin: 4px 0;
      }
      .__eqcm_item__ {
        display: grid;
        grid-template-columns: 80px 1fr;
        align-items: center;
        padding: 0 12px 0 8px;
        height: 28px;
        gap: 8px;
        cursor: default;
        color: #202124;
        outline: none;
        transition: background 0.05s;
      }
      .__eqcm_item__:hover, .__eqcm_item__:focus {
        background: #1a73e8;
        color: #fff;
      }
      .__eqcm_item__:hover .__eqcm_kbd__, .__eqcm_item__:focus .__eqcm_kbd__ {
        background: rgba(255,255,255,0.18);
        color: rgba(255,255,255,0.9);
        border-color: rgba(255,255,255,0.25);
      }
      .__eqcm_kbd__ {
        font-family: "SF Mono","Consolas","Fira Code",monospace;
        font-size: 10.5px;
        background: #f1f3f4;
        color: #3c4043;
        border: 1px solid #dadce0;
        border-radius: 3px;
        padding: 1px 5px;
        white-space: nowrap;
        text-align: center;
        transition: background 0.05s, color 0.05s, border-color 0.05s;
      }
      .__eqcm_lbl__ {
        font-size: 13px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        line-height: 28px;
      }
    `,document.documentElement.appendChild(e)}open(){this.close();let e=document.createElement("div");e.id="__eqcm_menu__",e.setAttribute("role","menu"),e.tabIndex=-1;let t=document.createElement("div");t.className="__eqcm_section__",t.textContent="Comandos dispon\xEDveis",e.appendChild(t);let o=document.createElement("div");o.className="__eqcm_sep__",e.appendChild(o);for(let u of this.commands){let p=document.createElement("div");p.className="__eqcm_item__",p.setAttribute("role","menuitem"),p.tabIndex=0;let d=document.createElement("span");d.className="__eqcm_kbd__",d.textContent=u.keys;let m=document.createElement("span");m.className="__eqcm_lbl__",m.textContent=u.label,p.appendChild(d),p.appendChild(m);let h=()=>{this.close(),setTimeout(()=>u.action(),60)};p.addEventListener("click",h),p.addEventListener("keydown",g=>{(g.key==="Enter"||g.key===" ")&&(g.preventDefault(),h())}),e.appendChild(p)}document.documentElement.appendChild(e),this.el=e;let i=240,a=this.commands.length*28+50,s=this.lastMouseX,r=this.lastMouseY,l=window.innerWidth,c=window.innerHeight;s+i+8>l&&(s=l-i-8),r+a+8>c&&(r=c-a-8),s<4&&(s=4),r<4&&(r=4),e.style.left=`${s}px`,e.style.top=`${r}px`,e.focus(),setTimeout(()=>{window.addEventListener("click",this.boundOutside,{capture:!0}),window.addEventListener("keydown",this.boundOutside,{capture:!0})},50)}close(){window.removeEventListener("click",this.boundOutside,{capture:!0}),window.removeEventListener("keydown",this.boundOutside,{capture:!0}),this.el?.remove(),this.el=null}isOpen(){return this.el!==null}destroy(){this.close(),window.removeEventListener("mousemove",this.boundMouseMove),document.getElementById("__eqcm_style__")?.remove()}};var Pe=class{el=null;pillEl=null;activeTab="console";activeFilter="all";autoScroll=!0;logs=[];logSeq=0;currentPlan=null;currentFlow=[];currentStepIdx=0;stepStatuses=new Map;stepErrors=new Map;modelName="--";latencyMs=0;questionSummary="";promptTokens=0;responseTokens=0;isDragging=!1;dragStartX=0;dragStartY=0;initialLeft=0;initialTop=0;isMinimized=!1;isVisible=!1;boundMouseMove;boundMouseUp;options;constructor(e={}){this.options=e,this.boundMouseMove=this.onMouseMove.bind(this),this.boundMouseUp=this.onMouseUp.bind(this),this.injectStyle(),this.createDom(),window.addEventListener("mousemove",this.boundMouseMove),window.addEventListener("mouseup",this.boundMouseUp),this.log("SYS","Debug Output Discreto pronto (Shift+H para alternar)")}open(){this.isVisible=!0,this.isMinimized&&(this.isMinimized=!1),this.el&&(this.el.style.display="flex",this.clampPosition()),this.pillEl&&(this.pillEl.style.display="none"),this.render()}close(){this.isVisible=!1,this.isMinimized=!1,this.el&&(this.el.style.display="none"),this.pillEl&&(this.pillEl.style.display="none")}toggle(){!this.isVisible||this.isMinimized?this.open():this.close()}minimize(){this.isVisible&&(this.isMinimized=!0,this.el&&(this.el.style.display="none"),this.pillEl&&(this.pillEl.style.display="flex",this.updatePill()))}restore(){this.isMinimized=!1,this.pillEl&&(this.pillEl.style.display="none"),this.el&&(this.el.style.display="flex",this.clampPosition()),this.render()}isOpen(){return this.isVisible&&!this.isMinimized}log(e,t,o){let i=new Date,a=`${i.getHours().toString().padStart(2,"0")}:${i.getMinutes().toString().padStart(2,"0")}:${i.getSeconds().toString().padStart(2,"0")}.${i.getMilliseconds().toString().padStart(3,"0").slice(0,2)}`,s={id:++this.logSeq,time:a,category:e,msg:t,detail:o};this.logs.push(s),this.logs.length>300&&this.logs.shift(),this.updatePill(),this.isOpen()&&(this.activeTab==="console"&&this.renderConsoleLogs(),this.updateTabCounters())}setPlan(e,t="",o=0,i="--"){this.currentPlan=e,this.questionSummary=(t||"").slice(0,300),this.latencyMs=o,this.modelName=i,this.stepStatuses.clear(),this.stepErrors.clear();let a=Array.isArray(e?.actions)?e.actions.length:0;this.log("AI",`Plano recebido: ${a} a\xE7\xF5es planejadas`,JSON.stringify(e?.actions||[],null,2)),(e?.thinking||e?.rationale)&&this.log("AI",`Racioc\xEDnio: ${(e.thinking||e.rationale).slice(0,150)}...`),this.isOpen()&&this.render()}setFlow(e){this.currentFlow=e||[],this.currentStepIdx=0,this.stepStatuses.clear(),this.stepErrors.clear(),e.forEach((t,o)=>{this.stepStatuses.set(o,o===0?"active":"pending")}),this.log("FLOW",`Fluxo carregado com ${e.length} passos de intera\xE7\xE3o`),this.updatePill(),this.isOpen()&&this.render()}setStepIndex(e){this.currentStepIdx=e,this.currentFlow.forEach((o,i)=>{i<e?this.stepStatuses.get(i)!=="failed"&&this.stepStatuses.set(i,"done"):i===e?this.stepStatuses.set(i,"active"):this.stepStatuses.get(i)!=="failed"&&this.stepStatuses.set(i,"pending")});let t=this.currentFlow[e];if(t){let o=t.action,i=o.id||o.name||o.label||o.from||"alvo";this.log("FLOW",`Passo ${e+1}/${this.currentFlow.length} (${t.trigger}): ${o.t??"a\xE7\xE3o"} em "${i}"`)}this.updatePill(),this.isOpen()&&(this.activeTab==="flow"&&this.renderFlow(),this.updateTabCounters())}markStepSuccess(e,t){this.stepStatuses.set(e,"done"),this.log("ACTION",`\u2713 Passo ${e+1} executado com sucesso`,t),this.updatePill(),this.isOpen()&&this.activeTab==="flow"&&this.renderFlow()}markStepFailed(e,t){this.stepStatuses.set(e,"failed"),this.stepErrors.set(e,t),this.log("ERROR",`\u2715 Falha no Passo ${e+1}: ${t}`),this.updatePill(),this.isOpen()&&this.activeTab==="flow"&&this.renderFlow()}onHeaderMouseDown(e){if(!e.target.closest(".__eq_dbg_btn__, .__eq_dbg_tab__")&&(e.preventDefault(),this.isDragging=!0,this.dragStartX=e.clientX,this.dragStartY=e.clientY,this.el)){let t=this.el.getBoundingClientRect();this.initialLeft=t.left,this.initialTop=t.top}}onMouseMove(e){if(!this.isDragging||!this.el)return;let t=e.clientX-this.dragStartX,o=e.clientY-this.dragStartY,i=Math.max(10,window.innerWidth-this.el.offsetWidth-10),a=Math.max(10,window.innerHeight-this.el.offsetHeight-10),s=Math.min(Math.max(10,this.initialLeft+t),i),r=Math.min(Math.max(10,this.initialTop+o),a);this.el.style.left=`${s}px`,this.el.style.top=`${r}px`,this.el.style.right="auto",this.el.style.bottom="auto"}onMouseUp(){this.isDragging=!1}clampPosition(){if(!this.el)return;let e=this.el.getBoundingClientRect(),t=Math.max(10,window.innerWidth-e.width-10),o=Math.max(10,window.innerHeight-e.height-10),i=e.left,a=e.top;(i>t||a>o||i<10||a<10)&&(this.el.style.left=`${Math.min(Math.max(10,i),t)}px`,this.el.style.top=`${Math.min(Math.max(10,a),o)}px`,this.el.style.right="auto",this.el.style.bottom="auto")}render(){if(!this.el)return;this.updateTabCounters();let e=this.el.querySelector(".__eq_dbg_body__");e&&(this.activeTab==="console"?(e.innerHTML=`
        <div class="__eq_dbg_toolbar__">
          <div class="__eq_dbg_chips__">
            <button class="__eq_dbg_chip__ ${this.activeFilter==="all"?"active":""}" data-filter="all">Todos (<span id="__eq_cnt_all">0</span>)</button>
            <button class="__eq_dbg_chip__ ${this.activeFilter==="error"?"active":""}" data-filter="error">Erros (<span id="__eq_cnt_err" style="color:#f28b82;">0</span>)</button>
            <button class="__eq_dbg_chip__ ${this.activeFilter==="flow"?"active":""}" data-filter="flow">Fluxo (<span id="__eq_cnt_flow">0</span>)</button>
            <button class="__eq_dbg_chip__ ${this.activeFilter==="dom"?"active":""}" data-filter="dom">DOM (<span id="__eq_cnt_dom">0</span>)</button>
            <button class="__eq_dbg_chip__ ${this.activeFilter==="ai"?"active":""}" data-filter="ai">IA (<span id="__eq_cnt_ai">0</span>)</button>
          </div>
          <div class="__eq_dbg_actions__">
            <button class="__eq_dbg_iconbtn__ ${this.autoScroll?"active":""}" id="__eq_dbg_btn_scroll__" title="Auto-scroll">\u2193</button>
            <button class="__eq_dbg_iconbtn__" id="__eq_dbg_btn_copy__" title="Copiar logs">\u{1F4CB}</button>
            <button class="__eq_dbg_iconbtn__" id="__eq_dbg_btn_clear__" title="Limpar logs" style="color:#f28b82;">\u{1F5D1}\uFE0F</button>
          </div>
        </div>
        <div class="__eq_dbg_terminal__" id="__eq_dbg_terminal__"></div>
      `,this.renderConsoleLogs(),this.wireConsoleEvents()):this.activeTab==="flow"?this.renderFlow():this.activeTab==="plan"?this.renderPlan():this.activeTab==="audit"&&this.renderAudit())}renderConsoleLogs(){let e=this.el?.querySelector("#__eq_dbg_terminal__");if(!e)return;e.innerHTML="";let t=this.logs.filter(o=>this.activeFilter==="all"?!0:this.activeFilter==="error"?o.category==="ERROR"||o.category==="WARN":this.activeFilter==="flow"?o.category==="FLOW"||o.category==="KEY"||o.category==="CLICK":this.activeFilter==="dom"?o.category==="DOM"||o.category==="ACTION":this.activeFilter==="ai"?o.category==="AI":!0);if(t.length===0){e.innerHTML='<div class="__eq_dbg_empty__">Nenhum log correspondente ao filtro.</div>';return}t.forEach(o=>{let i=document.createElement("div");i.className=`__eq_dbg_line__ __eq_cat_${o.category.toLowerCase()}__`;let a=document.createElement("span");a.className=`__eq_dbg_badge__ __eq_bg_${o.category.toLowerCase()}__`,a.textContent=o.category;let s=document.createElement("span");s.className="__eq_dbg_time__",s.textContent=o.time;let r=document.createElement("span");if(r.className="__eq_dbg_msg__",r.textContent=o.msg,i.appendChild(s),i.appendChild(a),i.appendChild(r),o.detail){let l=document.createElement("span");l.className="__eq_dbg_detail_btn__",l.textContent=" [detalhes]",l.onclick=()=>{let c=i.querySelector("pre");if(c)c.remove();else{let u=document.createElement("pre");u.className="__eq_dbg_detail_pre__",u.textContent=o.detail,i.appendChild(u)}},i.appendChild(l)}e.appendChild(i)}),this.autoScroll&&(e.scrollTop=e.scrollHeight)}wireConsoleEvents(){if(!this.el)return;this.el.querySelectorAll(".__eq_dbg_chip__").forEach(i=>{i.addEventListener("click",a=>{let s=a.currentTarget.getAttribute("data-filter");this.activeFilter=s||"all",this.el?.querySelectorAll(".__eq_dbg_chip__").forEach(r=>r.classList.remove("active")),a.currentTarget.classList.add("active"),this.renderConsoleLogs()})});let e=this.el.querySelector("#__eq_dbg_btn_scroll__");e?.addEventListener("click",()=>{this.autoScroll=!this.autoScroll,e.classList.toggle("active",this.autoScroll)});let t=this.el.querySelector("#__eq_dbg_btn_copy__");t?.addEventListener("click",()=>{let i=this.logs.map(a=>`[${a.time}] [${a.category}] ${a.msg}${a.detail?`
${a.detail}`:""}`).join(`
`);navigator.clipboard.writeText(i).then(()=>{t.textContent="\u2713",setTimeout(()=>t.textContent="\u{1F4CB}",1e3)})}),this.el.querySelector("#__eq_dbg_btn_clear__")?.addEventListener("click",()=>{this.logs=[],this.renderConsoleLogs(),this.updateTabCounters()})}renderFlow(){let e=this.el?.querySelector(".__eq_dbg_body__");if(!e)return;if(!this.currentFlow||this.currentFlow.length===0){e.innerHTML=`
        <div class="__eq_dbg_empty__" style="padding:40px 20px;text-align:center;">
          <div style="font-size:24px;margin-bottom:8px;">\u23F8\uFE0F</div>
          <div>Nenhum fluxo de intera\xE7\xE3o ativo no momento.</div>
          <div style="font-size:11px;color:#9aa0a6;margin-top:6px;">Pressione Shift+Q para analisar a p\xE1gina ou aguarde o avan\xE7o autom\xE1tico.</div>
        </div>
      `;return}let t=this.currentFlow.map((i,a)=>{let s=i.action,r=this.stepStatuses.get(a)||(a===this.currentStepIdx?"active":a<this.currentStepIdx?"done":"pending"),l=r==="done"?'<span class="__eq_status_done__">\u2713 Conclu\xEDdo</span>':r==="active"?'<span class="__eq_status_active__">\u25B6 Em Andamento</span>':r==="failed"?'<span class="__eq_status_failed__">\u2715 Falhou</span>':'<span class="__eq_status_pending__">Pendente</span>',c=i.trigger==="key"?"\u2328\uFE0F Tecla":"\u{1F5B1}\uFE0F Clique",u=String(s.t||"act").toUpperCase(),p=s.id?`#${s.id}`:s.name?`[name="${s.name}"]`:s.label||s.from||"alvo",d=s.v!==void 0?` = "${s.v}"`:s.c!==void 0?` (check: ${s.c})`:"";return`
        <div class="__eq_flow_card__ ${r==="active"?"__eq_flow_active__":""}">
          <div class="__eq_flow_header__">
            <span class="__eq_flow_num__">Passo ${a+1}</span>
            <span class="__eq_flow_trigger__">${c}</span>
            <span class="__eq_flow_type__">${u}</span>
            <span class="__eq_flow_status__">${l}</span>
          </div>
          <div class="__eq_flow_content__">
            <div class="__eq_flow_target__">${Z(String(p))}<span style="color:#8ab4f8;">${Z(String(d))}</span></div>
            <div class="__eq_flow_hint__">${Z(i.hint||"")}${i.customMsg?` \u2022 <i style="color:#81c995;">${Z(i.customMsg)}</i>`:""}</div>
            ${this.stepErrors.has(a)?`<div class="__eq_flow_err__">Erro: ${Z(this.stepErrors.get(a))}</div>`:""}
          </div>
          <div class="__eq_flow_actions__">
            <button class="__eq_dbg_btn__ __eq_btn_exec_step__" data-step="${a}">For\xE7ar Passo</button>
          </div>
        </div>
      `}).join("");e.innerHTML=`
      <div class="__eq_dbg_flow_header__">
        <div>
          <span style="font-weight:700;color:#e8eaed;">Progresso do Fluxo:</span>
          <span style="color:#8ab4f8;margin-left:6px;">${Math.min(this.currentStepIdx+1,this.currentFlow.length)} / ${this.currentFlow.length}</span>
        </div>
        <div style="display:flex;gap:8px;">
          ${this.options.onForceAllSteps?'<button class="__eq_dbg_btn__ __eq_btn_primary__" id="__eq_btn_force_all__">\u26A1 Injetar Todas as Respostas</button>':""}
        </div>
      </div>
      <div class="__eq_dbg_flow_list__">${t}</div>
    `,e.querySelectorAll(".__eq_btn_exec_step__").forEach(i=>{i.addEventListener("click",async a=>{let s=parseInt(a.currentTarget.getAttribute("data-step")||"0",10);if(this.options.onForceStep){i.textContent="Executando...";let r=await this.options.onForceStep(s);i.textContent=r?"\u2713 Sucesso":"\u2715 Falhou",setTimeout(()=>i.textContent="For\xE7ar Passo",1500)}})});let o=e.querySelector("#__eq_btn_force_all__");o?.addEventListener("click",async()=>{this.options.onForceAllSteps&&(o.textContent="Injetando...",await this.options.onForceAllSteps(),o.textContent="\u2713 Conclu\xEDdo",setTimeout(()=>o.textContent="\u26A1 Injetar Todas as Respostas",1500))})}renderPlan(){let e=this.el?.querySelector(".__eq_dbg_body__");if(!e)return;if(!this.currentPlan){e.innerHTML='<div class="__eq_dbg_empty__">Nenhum plano de IA capturado ainda. Pressione Shift+Q.</div>';return}let t=Math.round((this.currentPlan.confidence||1)*100),o=this.currentPlan.thinking||this.currentPlan.rationale||"Nenhum racioc\xEDnio textual retornado.",i=JSON.stringify(this.currentPlan,null,2);e.innerHTML=`
      <div style="padding:12px;overflow-y:auto;height:100%;box-sizing:border-box;display:flex;flex-direction:column;gap:12px;">
        <div style="display:flex;justify-content:space-between;align-items:center;background:#292a2d;padding:10px 14px;border-radius:6px;border:1px solid #3c4043;">
          <div>
            <div style="font-size:11px;color:#9aa0a6;text-transform:uppercase;font-weight:700;">Modo & Tipo</div>
            <div style="font-size:13px;font-weight:600;color:#8ab4f8;margin-top:2px;">${Z(this.currentPlan.mode||"auto")} \u2022 ${Z(this.currentPlan.pageType||"question")}</div>
          </div>
          <div style="text-align:right;">
            <div style="font-size:11px;color:#9aa0a6;text-transform:uppercase;font-weight:700;">Confian\xE7a</div>
            <div style="font-size:14px;font-weight:700;color:${t>80?"#81c995":"#fdd663"};margin-top:2px;">${t}%</div>
          </div>
        </div>

        <div>
          <div style="font-size:11px;font-weight:700;color:#9aa0a6;margin-bottom:4px;text-transform:uppercase;">Racioc\xEDnio da IA:</div>
          <div style="background:#1e1f22;border:1px solid #3c4043;border-radius:6px;padding:10px 12px;font-size:12.5px;line-height:1.5;color:#e8eaed;max-height:120px;overflow-y:auto;white-space:pre-wrap;">${Z(o)}</div>
        </div>

        <div style="flex:1;display:flex;flex-direction:column;min-height:140px;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
            <span style="font-size:11px;font-weight:700;color:#9aa0a6;text-transform:uppercase;">JSON do Plano Bruto:</span>
            <button class="__eq_dbg_btn__" id="__eq_btn_copy_json__" style="font-size:10px;padding:3px 8px;">Copiar JSON</button>
          </div>
          <pre style="flex:1;background:#1e1f22;border:1px solid #3c4043;border-radius:6px;padding:10px;font-family:'JetBrains Mono','Consolas',monospace;font-size:11px;color:#8ab4f8;overflow:auto;margin:0;">${Z(i)}</pre>
        </div>
      </div>
    `,e.querySelector("#__eq_btn_copy_json__")?.addEventListener("click",a=>{navigator.clipboard.writeText(i).then(()=>{let s=a.currentTarget;s.textContent="\u2713 Copiado",setTimeout(()=>s.textContent="Copiar JSON",1200)})})}renderAudit(){let e=this.el?.querySelector(".__eq_dbg_body__");e&&(e.innerHTML=`
      <div style="padding:14px;overflow-y:auto;height:100%;box-sizing:border-box;display:flex;flex-direction:column;gap:14px;">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
          <div style="background:#292a2d;border:1px solid #3c4043;border-radius:6px;padding:10px 12px;">
            <div style="font-size:10.5px;color:#9aa0a6;text-transform:uppercase;font-weight:700;">Modelo Ativo</div>
            <div style="font-size:13px;font-weight:700;color:#8ab4f8;margin-top:3px;overflow:hidden;text-overflow:ellipsis;">${Z(this.modelName)}</div>
          </div>
          <div style="background:#292a2d;border:1px solid #3c4043;border-radius:6px;padding:10px 12px;">
            <div style="font-size:10.5px;color:#9aa0a6;text-transform:uppercase;font-weight:700;">Lat\xEAncia da API</div>
            <div style="font-size:13px;font-weight:700;color:#81c995;margin-top:3px;">${this.latencyMs?`${this.latencyMs} ms`:"--"}</div>
          </div>
        </div>

        <div>
          <div style="font-size:11px;font-weight:700;color:#9aa0a6;margin-bottom:6px;text-transform:uppercase;">Enunciado Capturado:</div>
          <div style="background:#1e1f22;border:1px solid #3c4043;border-radius:6px;padding:10px;font-size:12px;color:#bdc1c6;line-height:1.45;max-height:140px;overflow-y:auto;white-space:pre-wrap;">${Z(this.questionSummary||"Nenhum texto capturado.")}</div>
        </div>

        <div>
          <div style="font-size:11px;font-weight:700;color:#9aa0a6;margin-bottom:6px;text-transform:uppercase;">Diagn\xF3stico do Modo Discreto:</div>
          <div style="background:#1e1f22;border:1px solid #3c4043;border-radius:6px;padding:10px;font-size:11.5px;color:#bdc1c6;line-height:1.5;">
            \u2022 Interceptores de Op\xE7\xF5es: <span style="color:#81c995;font-weight:600;">Ativos</span><br>
            \u2022 Concorr\xEAncia Guard: <span style="color:#81c995;font-weight:600;">Protegido</span><br>
            \u2022 Mapeamento V/F em Tabela: <span style="color:#8ab4f8;font-weight:600;">Direcionado (name, value, label)</span><br>
            \u2022 Fallback de Inje\xE7\xE3o: <span style="color:#8ab4f8;font-weight:600;">Native setter + Synthetic dispatch</span>
          </div>
        </div>
      </div>
    `)}updateTabCounters(){if(!this.el)return;let e=this.el.querySelector("#__eq_cnt_all"),t=this.el.querySelector("#__eq_cnt_err"),o=this.el.querySelector("#__eq_cnt_flow"),i=this.el.querySelector("#__eq_cnt_dom"),a=this.el.querySelector("#__eq_cnt_ai");e&&(e.textContent=String(this.logs.length)),t&&(t.textContent=String(this.logs.filter(r=>r.category==="ERROR"||r.category==="WARN").length)),o&&(o.textContent=String(this.logs.filter(r=>r.category==="FLOW"||r.category==="KEY"||r.category==="CLICK").length)),i&&(i.textContent=String(this.logs.filter(r=>r.category==="DOM"||r.category==="ACTION").length)),a&&(a.textContent=String(this.logs.filter(r=>r.category==="AI").length));let s=this.el.querySelector("#__eq_tab_badge_flow__");s&&(s.textContent=this.currentFlow.length>0?`${this.currentStepIdx+1}/${this.currentFlow.length}`:"0")}updatePill(){if(!this.pillEl)return;let e=this.logs.filter(a=>a.category==="ERROR").length,t=this.currentFlow.length,o=t>0?`${this.currentStepIdx+1}/${t}`:"Idle",i=this.pillEl.querySelector(".__eq_pill_text__");i&&(i.textContent=`EQ Debug: ${o} ${e>0?`(${e} err)`:"\u2022 OK"}`)}createDom(){this.el=document.createElement("div"),this.el.id="__eq_dbg_window__",this.el.style.display="none",this.el.innerHTML=`
      <div class="__eq_dbg_header__">
        <div class="__eq_dbg_tabs__">
          <button class="__eq_dbg_tab__ ${this.activeTab==="console"?"active":""}" data-tab="console">Console</button>
          <button class="__eq_dbg_tab__ ${this.activeTab==="flow"?"active":""}" data-tab="flow">Fluxo <span class="__eq_tab_badge__" id="__eq_tab_badge_flow__">0</span></button>
          <button class="__eq_dbg_tab__ ${this.activeTab==="plan"?"active":""}" data-tab="plan">Plano IA</button>
          <button class="__eq_dbg_tab__ ${this.activeTab==="audit"?"active":""}" data-tab="audit">Auditoria</button>
        </div>
        <div class="__eq_dbg_controls__">
          <button class="__eq_dbg_btn_win__" id="__eq_win_min__" title="Minimizar">_</button>
          <button class="__eq_dbg_btn_win__" id="__eq_win_close__" title="Fechar (Shift+H)">\u2715</button>
        </div>
      </div>
      <div class="__eq_dbg_body__"></div>
    `,this.el.querySelector(".__eq_dbg_header__").addEventListener("mousedown",this.onHeaderMouseDown.bind(this)),this.el.querySelectorAll(".__eq_dbg_tab__").forEach(t=>{t.addEventListener("click",o=>{let i=o.currentTarget.getAttribute("data-tab");this.activeTab=i||"console",this.el?.querySelectorAll(".__eq_dbg_tab__").forEach(a=>a.classList.remove("active")),o.currentTarget.classList.add("active"),this.render()})}),this.el.querySelector("#__eq_win_min__")?.addEventListener("click",()=>this.minimize()),this.el.querySelector("#__eq_win_close__")?.addEventListener("click",()=>this.close()),document.documentElement.appendChild(this.el),this.pillEl=document.createElement("div"),this.pillEl.id="__eq_dbg_pill__",this.pillEl.style.display="none",this.pillEl.innerHTML=`
      <span class="__eq_pill_dot__"></span>
      <span class="__eq_pill_text__">EQ Debug: Pronto</span>
      <span style="font-size:11px;opacity:0.7;margin-left:4px;">[Shift+H]</span>
    `,this.pillEl.addEventListener("click",()=>this.restore()),document.documentElement.appendChild(this.pillEl)}injectStyle(){if(document.getElementById("__eq_dbg_style__"))return;let e=document.createElement("style");e.id="__eq_dbg_style__",e.textContent=`
      #__eq_dbg_window__ {
        position: fixed;
        right: 24px;
        bottom: 24px;
        width: 530px;
        height: 400px;
        min-width: 360px;
        min-height: 240px;
        max-width: calc(100vw - 24px);
        max-height: calc(100vh - 24px);
        background: #202124;
        border: 1px solid #3c4043;
        border-radius: 8px;
        box-shadow: 0 12px 32px rgba(0,0,0,0.45), 0 2px 8px rgba(0,0,0,0.3);
        z-index: 2147483645;
        display: flex;
        flex-direction: column;
        font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
        color: #e8eaed;
        overflow: hidden;
        user-select: none;
        resize: both;
        box-sizing: border-box;
      }

      .__eq_dbg_header__ {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: #292a2d;
        border-bottom: 1px solid #3c4043;
        padding: 0 8px 0 12px;
        height: 38px;
        cursor: grab;
      }
      .__eq_dbg_header__:active { cursor: grabbing; }

      .__eq_dbg_tabs__ {
        display: flex;
        align-items: center;
        gap: 4px;
        height: 100%;
      }

      .__eq_dbg_tab__ {
        background: transparent;
        border: none;
        color: #9aa0a6;
        font-size: 12.5px;
        font-weight: 500;
        padding: 6px 12px;
        cursor: pointer;
        border-radius: 4px 4px 0 0;
        position: relative;
        display: flex;
        align-items: center;
        gap: 6px;
        height: 32px;
        margin-top: 6px;
        transition: color 0.1s, background 0.1s;
      }
      .__eq_dbg_tab__:hover {
        color: #e8eaed;
        background: rgba(255,255,255,0.04);
      }
      .__eq_dbg_tab__.active {
        color: #8ab4f8;
        background: #202124;
        font-weight: 600;
      }
      .__eq_dbg_tab__.active::after {
        content: '';
        position: absolute;
        bottom: -1px;
        left: 0;
        right: 0;
        height: 2px;
        background: #8ab4f8;
      }

      .__eq_tab_badge__ {
        font-size: 10px;
        background: #3c4043;
        color: #e8eaed;
        padding: 1px 5px;
        border-radius: 10px;
      }

      .__eq_dbg_controls__ {
        display: flex;
        align-items: center;
        gap: 4px;
      }

      .__eq_dbg_btn_win__ {
        background: transparent;
        border: none;
        color: #9aa0a6;
        width: 26px;
        height: 26px;
        border-radius: 4px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        font-weight: 700;
      }
      .__eq_dbg_btn_win__:hover {
        background: rgba(255,255,255,0.08);
        color: #e8eaed;
      }
      #__eq_win_close__:hover {
        background: #c5221f;
        color: #fff;
      }

      .__eq_dbg_body__ {
        flex: 1;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        background: #202124;
        position: relative;
        user-select: text;
      }

      /* Console Toolbar */
      .__eq_dbg_toolbar__ {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 6px 10px;
        border-bottom: 1px solid #3c4043;
        background: #25262a;
        gap: 8px;
      }
      .__eq_dbg_chips__ {
        display: flex;
        align-items: center;
        gap: 4px;
        overflow-x: auto;
      }
      .__eq_dbg_chip__ {
        background: #2f3034;
        border: 1px solid #3c4043;
        color: #bdc1c6;
        font-size: 11px;
        padding: 2px 8px;
        border-radius: 12px;
        cursor: pointer;
        white-space: nowrap;
      }
      .__eq_dbg_chip__.active {
        background: #394457;
        border-color: #8ab4f8;
        color: #8ab4f8;
        font-weight: 600;
      }

      .__eq_dbg_actions__ {
        display: flex;
        align-items: center;
        gap: 4px;
      }

      .__eq_dbg_iconbtn__ {
        background: transparent;
        border: none;
        color: #9aa0a6;
        width: 24px;
        height: 24px;
        border-radius: 4px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 13px;
      }
      .__eq_dbg_iconbtn__:hover {
        background: rgba(255,255,255,0.08);
        color: #e8eaed;
      }
      .__eq_dbg_iconbtn__.active {
        color: #8ab4f8;
      }

      /* Terminal */
      .__eq_dbg_terminal__ {
        flex: 1;
        overflow-y: auto;
        padding: 8px 10px;
        font-family: 'JetBrains Mono', 'Consolas', 'Courier New', monospace;
        font-size: 11.5px;
        line-height: 1.5;
        background: #191a1c;
      }
      .__eq_dbg_line__ {
        display: flex;
        align-items: flex-start;
        gap: 8px;
        padding: 2px 0;
        border-bottom: 1px solid rgba(255,255,255,0.03);
        word-break: break-all;
      }
      .__eq_dbg_time__ {
        color: #5f6368;
        font-size: 10px;
        white-space: nowrap;
        padding-top: 1px;
      }
      .__eq_dbg_badge__ {
        font-size: 9.5px;
        font-weight: 700;
        padding: 1px 5px;
        border-radius: 3px;
        white-space: nowrap;
        line-height: 1.3;
      }
      .__eq_dbg_msg__ {
        flex: 1;
        color: #e8eaed;
      }
      .__eq_dbg_detail_btn__ {
        color: #8ab4f8;
        cursor: pointer;
        font-size: 10px;
      }
      .__eq_dbg_detail_pre__ {
        margin: 4px 0 2px 20px;
        background: #111;
        border: 1px solid #333;
        padding: 6px;
        border-radius: 4px;
        color: #bdc1c6;
        font-size: 10.5px;
        white-space: pre-wrap;
      }

      /* Categorias Colors */
      .__eq_bg_sys__   { background: #3c4043; color: #bdc1c6; }
      .__eq_bg_ai__    { background: #1a3e68; color: #8ab4f8; }
      .__eq_bg_flow__  { background: #0d4a36; color: #81c995; }
      .__eq_bg_dom__   { background: #4a2800; color: #fdd663; }
      .__eq_bg_action__{ background: #372458; color: #c58af9; }
      .__eq_bg_key__   { background: #2b3a4a; color: #78d9ec; }
      .__eq_bg_click__ { background: #2b3a4a; color: #78d9ec; }
      .__eq_bg_warn__  { background: #5c3b00; color: #fdd663; }
      .__eq_bg_error__ { background: #5c1d1d; color: #f28b82; }

      .__eq_cat_error__ { background: rgba(234,67,53,0.1); }
      .__eq_cat_warn__  { background: rgba(251,188,4,0.06); }

      /* Flow List */
      .__eq_dbg_flow_header__ {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 8px 12px;
        background: #25262a;
        border-bottom: 1px solid #3c4043;
        font-size: 12px;
      }
      .__eq_dbg_flow_list__ {
        flex: 1;
        overflow-y: auto;
        padding: 10px;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .__eq_flow_card__ {
        background: #25262a;
        border: 1px solid #3c4043;
        border-radius: 6px;
        padding: 9px 12px;
        display: flex;
        flex-direction: column;
        gap: 6px;
      }
      .__eq_flow_active__ {
        border-color: #8ab4f8;
        background: rgba(138,180,248,0.06);
        box-shadow: 0 0 8px rgba(138,180,248,0.15);
      }
      .__eq_flow_header__ {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 11px;
      }
      .__eq_flow_num__ { font-weight: 700; color: #e8eaed; }
      .__eq_flow_trigger__ { background: #3c4043; color: #bdc1c6; padding: 1px 6px; border-radius: 4px; font-size: 10px; }
      .__eq_flow_type__ { background: #1a3e68; color: #8ab4f8; padding: 1px 6px; border-radius: 4px; font-size: 10px; font-weight: 700; }
      .__eq_flow_status__ { margin-left: auto; }
      .__eq_status_done__ { color: #81c995; font-weight: 600; }
      .__eq_status_active__ { color: #8ab4f8; font-weight: 700; }
      .__eq_status_failed__ { color: #f28b82; font-weight: 700; }
      .__eq_status_pending__ { color: #70757a; }
      .__eq_flow_content__ { font-size: 11.5px; }
      .__eq_flow_target__ { font-family: monospace; font-weight: 600; color: #bdc1c6; }
      .__eq_flow_hint__ { color: #9aa0a6; font-size: 10.5px; margin-top: 2px; }
      .__eq_flow_err__ { color: #f28b82; font-size: 10.5px; margin-top: 3px; font-weight: 600; }
      .__eq_flow_actions__ { display: flex; justify-content: flex-end; }

      .__eq_dbg_btn__ {
        background: #2f3034;
        border: 1px solid #3c4043;
        color: #e8eaed;
        font-size: 11px;
        padding: 4px 10px;
        border-radius: 4px;
        cursor: pointer;
        transition: background 0.1s;
      }
      .__eq_dbg_btn__:hover { background: #3c4043; }
      .__eq_btn_primary__ {
        background: #1a73e8;
        border-color: #1a73e8;
        color: #fff;
        font-weight: 600;
      }
      .__eq_btn_primary__:hover { background: #1b66ca; }

      /* Pill Minimizada */
      #__eq_dbg_pill__ {
        position: fixed;
        right: 20px;
        bottom: 20px;
        height: 28px;
        background: rgba(32,33,36,0.92);
        backdrop-filter: blur(8px);
        border: 1px solid #3c4043;
        border-radius: 14px;
        padding: 0 12px;
        display: flex;
        align-items: center;
        gap: 6px;
        color: #e8eaed;
        font-family: system-ui, -apple-system, sans-serif;
        font-size: 11.5px;
        font-weight: 600;
        cursor: pointer;
        z-index: 2147483645;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        transition: transform 0.15s, border-color 0.15s;
        user-select: none;
      }
      #__eq_dbg_pill__:hover {
        transform: translateY(-2px);
        border-color: #8ab4f8;
      }
      .__eq_pill_dot__ {
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: #81c995;
        box-shadow: 0 0 6px #81c995;
      }

      .__eq_dbg_empty__ {
        padding: 24px;
        text-align: center;
        color: #70757a;
        font-size: 12px;
      }
    `,document.documentElement.appendChild(e)}destroy(){window.removeEventListener("mousemove",this.boundMouseMove),window.removeEventListener("mouseup",this.boundMouseUp),this.el?.remove(),this.pillEl?.remove(),document.getElementById("__eq_dbg_style__")?.remove()}};function Z(n){return n.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}var Ht=`

\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
MODO DISCRETO \u2014 ARQUITETA DE FLUXO DE INTERA\xC7\xC3O
\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
Voc\xEA est\xE1 no MODO DISCRETO. Al\xE9m de resolver a quest\xE3o com actions[], voc\xEA DEVE:
Planejar o "interactionFlow" \u2014 lista ordenada de etapas, cada uma mapeando
UM gesto do usu\xE1rio (tecla ou clique) para UMA a\xE7\xE3o declarativa.

REGRAS DO interactionFlow:
1. Cada action em actions[] deve ter exatamente um step em interactionFlow[].
2. Triggers v\xE1lidos:
   - "key"   \u2192 qualquer tecla (para val/texto)
   - "click" \u2192 qualquer clique (para chk/clk/sel/drag/adv)
3. Para a\xE7\xE3o "val" (texto): use trigger="key" com chars=1 (o sistema insere EXATAMENTE 1 char por keypress).
   Nunca use chars maior que 1 \u2014 1 tecla = 1 caractere injetado.
4. Para a\xE7\xE3o "chk","clk": trigger="click".
5. Para a\xE7\xE3o "sel" (dropdown): 2 steps \u2014 step N = abrir (click), step N+1 = selecionar (click).
6. Para a\xE7\xE3o "drag": trigger="click" por item (1 clique = 1 drag).
7. Para a\xE7\xE3o "adv": trigger="click" \u2014 o usu\xE1rio clica no bot\xE3o de avan\xE7ar manualmente.
8. "hint" deve ser SEMPRE um termo t\xE9cnico de sistema \u2014 NUNCA a resposta ou a\xE7\xE3o real:
   - Teclado: "Keyboard Interact", "Input Detected", "Key Event", "Buffer Flush", "Key Capture"
   - Clique: "Mouse Interact", "Click", "Selecionar", "Mover Item", "Confirmar"
   - Progresso: "Step N/M", "Sync N%", "Field Update", "Buffer N/M"
   - Conclu\xEDdo: "Conclu\xEDdo", "Done", "Pronto"
9. "customMsg" (opcional, m\xE1x 22 chars): mensagem criada por voc\xEA para guiar o usu\xE1rio.
   Use para: mudan\xE7as de modalidade ("Now: Mouse"), progresso de campo ("Field 2/3"),
   confirma\xE7\xF5es ("Confirm?"), avisos ("Next: Click"). Omita se n\xE3o necess\xE1rio.
10. Para multi-campo: 1 step de "key" por campo. Use customMsg para sinalizar transi\xE7\xE3o.
    Para multi-checkbox (ex: 3 caixas a marcar): 1 step "click" POR checkbox separado.
    Nunca agrupe m\xFAltiplos checkboxes em 1 \xFAnico step \u2014 cada checkbox = 1 step de click.
11. Fluxo h\xEDbrido (texto+sele\xE7\xE3o): use customMsg="Now: Mouse Interact" ao mudar de modalidade.
12. Quest\xE3o simples (1 clique): 1-2 steps. Complexa (reda\xE7\xE3o, categoriza\xE7\xE3o, multi-select): at\xE9 20 steps.
13. Nunca revele a resposta nos hints/customMsg \u2014 s\xE3o termos de sistema disfar\xE7ados.
14. Se actions[] contiver m\xFAltiplos {t:"chk"}, certifique-se de incluir 1 step por chk em interactionFlow.

\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
REGRA ESPECIAL \u2014 QUEST\xD5ES DE VERDADEIRO OU FALSO (Grade/Tabela de radio buttons)
\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
Quando a quest\xE3o tiver uma TABELA de julgamento V/F (cada linha com radio buttons V e F):
- Cada linha da tabela = 1 action do tipo {t:"chk"} + 1 step trigger="click".
- NUNCA use o atributo "id" gerado pelo sistema (eq-...) para estes r\xE1dios.
- SEMPRE use o campo "name" (ex: "vf_row_1") + "v" (valor exacto "V" ou "F") para identificar o radio correto.
- O campo "v" na action DEVE ser exatamente "V" (Verdadeiro) ou "F" (Falso) \u2014 sempre mai\xFAsculo.
- Formato correto de action para V/F: { "t": "chk", "name": "vf_row_1", "v": "V", "c": true }
- Formato ERRADO: { "t": "chk", "id": "eq-abc123", "c": true } \u2190 NUNCA use s\xF3 id sem name+v!
- Se o controle exposto tiver "name" dispon\xEDvel no controls[], USE-O OBRIGATORIAMENTE.
- N afirma\xE7\xF5es na tabela = N actions chk (uma por linha) + N steps de trigger="click" + 1 step adv.
- NUNCA resuma m\xFAltiplas linhas a um \xFAnico step.

Exemplo de fluxo correto para tabela V/F com 3 linhas (linha1=V, linha2=F, linha3=V):
actions: [
  { "t": "chk", "name": "vf_row_1", "v": "V", "c": true },
  { "t": "chk", "name": "vf_row_2", "v": "F", "c": true },
  { "t": "chk", "name": "vf_row_3", "v": "V", "c": true },
  { "t": "adv", "label": "Verificar resposta" }
]
interactionFlow: [
  { "step": 1, "trigger": "click", "action": { "t": "chk", "name": "vf_row_1", "v": "V", "c": true }, "hint": "Mouse Interact" },
  { "step": 2, "trigger": "click", "action": { "t": "chk", "name": "vf_row_2", "v": "F", "c": true }, "hint": "Mouse Interact" },
  { "step": 3, "trigger": "click", "action": { "t": "chk", "name": "vf_row_3", "v": "V", "c": true }, "hint": "Mouse Interact" },
  { "step": 4, "trigger": "click", "action": { "t": "adv", "label": "Verificar resposta" }, "hint": "Confirmar" }
]

SCHEMA JSON OBRIGAT\xD3RIO (adicional ao plano normal):
{
  "pageType": "...", "mode": "...", "confidence": 0.0-1.0,
  "rationale": "...", "thinking": "...", "actions": [...], "memoryToStore": "...",
  "interactionFlow": [
    {
      "step": 1,
      "trigger": "key",
      "action": { "t": "val", "id": "eq-xxx", "v": "texto completo" },
      "chars": 1,
      "hint": "Keyboard Interact",
      "customMsg": null
    },
    {
      "step": 2,
      "trigger": "click",
      "action": { "t": "chk", "name": "vf_row_1", "v": "V", "c": true },
      "hint": "Mouse Interact",
      "customMsg": null
    }
  ]
}

FALLBACK: se por alguma raz\xE3o n\xE3o conseguir planejar interactionFlow[], omita-o.
O sistema gerar\xE1 o fluxo automaticamente com regras padr\xE3o.
`;function Ot(n){let e=[],t=1;for(let o of n){let i=o.t;i==="val"?e.push({step:t++,trigger:"key",action:o,chars:1,hint:"Keyboard Interact",customMsg:null}):i==="chk"||i==="clk"?e.push({step:t++,trigger:"click",action:o,hint:"Mouse Interact",customMsg:null}):i==="sel"?(e.push({step:t++,trigger:"click",action:o,hint:"Mouse Interact",customMsg:"Opening..."}),e.push({step:t++,trigger:"click",action:o,hint:"Option Selected",customMsg:null})):i==="drag"?e.push({step:t++,trigger:"click",action:o,hint:"Mover Item",customMsg:null}):i==="adv"&&e.push({step:t++,trigger:"click",action:o,hint:"Next Page Loading",customMsg:null})}return e}function Pt(n,e){if(!Array.isArray(n)||n.length===0)return Ot(e);let t=[];for(let o of n){if(!o||typeof o!="object")continue;let i=o,a=i.trigger==="key"?"key":"click",s=i.action||{},r=a==="key"?1:void 0;t.push({step:typeof i.step=="number"?i.step:t.length+1,trigger:a,action:s,chars:r,hint:typeof i.hint=="string"?i.hint.slice(0,30):a==="key"?"Keyboard Interact":"Mouse Interact",customMsg:typeof i.customMsg=="string"?i.customMsg.slice(0,22):null})}return t.length===0?Ot(e):_n(t,e)}function _n(n,e){let t=[];for(let o=0;o<n.length;o++){let i=n[o],a=i.action;if(!a.t&&e[o]&&(i.action=e[o]),a.t==="chk"&&!a.name&&a.id){let r=String(a.id);if(r.startsWith("eq-")||r.match(/^[a-z0-9]+-[a-z0-9]+-[a-z0-9]+$/))try{let l=document.querySelector(`[data-easyquiz-id="${r}"], #${r}`);l?.name&&(i.action.name=l.name,l.value&&l.value!=="on"&&(i.action.v=l.value))}catch{}}let s=t[t.length-1];if(s){let r=s.action;if(s.trigger===i.trigger&&r.t===a.t&&r.name===a.name&&r.v===a.v&&r.id===a.id)continue}t.push(i)}return t.length>0?t:n}window.__eqdiscrete?window.__eqdiscrete.analyze():xn();function yn(){try{if(document.querySelector("link[data-eqdiscrete-preconnect]"))return;let n=document.createElement("link");n.rel="preconnect",n.href="https://generativelanguage.googleapis.com",n.crossOrigin="anonymous",n.setAttribute("data-eqdiscrete-preconnect","true"),document.head?.appendChild(n)}catch{}}var vn=ve+Ht;async function xn(){yn(),gt();let n=new ke,e=new Me,t=new qe,o=new Oe(n,e,t),i=new Pe({onForceStep:b=>o.forceStep(b),onForceAllSteps:()=>o.forceAll()});o.setDebugOutput(i);let a=new Ce({onModelChange:()=>e.flash("Modelo OK")}),s=new Le(n,e),r=new He,l=null,c=!1,u=null,p=new Ie({onPageAdvance:()=>{o.isActive()||c||g(!0)}});p.start();let d=oe();d.apiKey&&Ve(d.apiKey).catch(()=>{}),e.flash("EQ Ativo");let m=0,h=[1500,3e3,5e3,8e3];async function g(b=!1,E=0){if(u&&(clearTimeout(u),u=null),l){try{l.abort()}catch{}l=null}o.isActive()&&o.abort();let T=oe();if(!T.apiKey){e.flash("Config: Shift+A"),n.flashError(2e3);return}c=!0,m=E,l=new AbortController;let w=l.signal;p.resetHash(),n.setState("loading"),(!b||E>0)&&e.flash(E>0?`Tentativa ${E+1}`:"Analisando"),i.log("SYS",`Iniciando an\xE1lise (proativo: ${b}, retry: ${E})`);function M(){let L=h[Math.min(E,h.length-1)];i.log("WARN",`Agendando retry em ${L}ms`),u=window.setTimeout(()=>{o.isActive()||g(!1,E+1)},L)}try{if(b&&await new Promise(I=>setTimeout(I,700)),w.aborted)return;let L=At(!1);if(L||(L=Xe()),!L||!L.questionText?.trim()){n.setState("idle"),E===0&&!b&&e.flash("Sem conte\xFAdo"),i.log("WARN","Nenhum conte\xFAdo ou quest\xE3o detectada na p\xE1gina"),M();return}i.log("DOM",`Contexto detectado: ${L.controls.length} controles, ${L.questionText.length} chars`,L.questionText);let $=await kt(L.scope,T.useVision);if(w.aborted)return;let ee=performance.now(),A=await xt(L,$,T,(I,D)=>i.log(D==="error"?"ERROR":D==="warning"?"WARN":"SYS",`[IA] ${I}`),w,{systemPromptOverride:vn}),ae=Math.round(performance.now()-ee);if(w.aborted)return;n.setState("idle");let N=A.plan;if(i.log("SYS",`An\xE1lise conclu\xEDda em ${ae}ms via ${A.usedModel??T.model} \u2014 pageType: ${N.pageType} | mode: ${N.mode} | ${N.actions?.length??0} a\xE7\xE3o(\xF5es)`),i.setPlan(N,L.questionText,ae,T.model),N.memoryToStore&&mt(N.memoryToStore),N.pageType==="conclusion"){e.flash("Sess\xE3o encerrada"),i.log("SYS","P\xE1gina de conclus\xE3o detectada");return}let Q=Pt(N.interactionFlow,N.actions||[]);if(i.log("SYS",`Fluxo gerado: ${Q.length} step(s) \u2014 ${Q.map(I=>`${I.trigger}[${I.action?.t}]`).join(", ")}`),N.pageType==="info"||N.pageType==="start"){if(n.flashOk(1e3),e.flash("Avan\xE7ar \u2192"),i.log("SYS",`P\xE1gina informativa (${N.pageType}) \u2014 aguardando clique do usu\xE1rio para avan\xE7ar`),Q.length>0)o.start(Q);else{let I=[{step:1,trigger:"click",action:{t:"adv",label:"continuar"},hint:"Clique para avan\xE7ar",customMsg:null}];i.log("SYS","Fluxo adv gerado automaticamente para p\xE1gina informativa"),o.start(I)}return}if(!Q.length){i.log("WARN","Plano da IA retornou sem a\xE7\xF5es ou fluxo de intera\xE7\xE3o"),M();return}m=0,n.flashOk(500);let C=Q[0];e.flash(C.hint||"Pronto"),C.customMsg&&setTimeout(()=>e.flash(C.customMsg),1400),o.start(Q)}catch(L){if(w.aborted)return;n.setState("idle");let $=L instanceof Error?L.message:String(L);if(i.log("ERROR",`Erro na an\xE1lise: ${$}`),$.includes("403")||$.includes("API key")||$.includes("inv\xE1lida")){e.flash("Acesso negado"),n.flashError();return}if($.includes("429")||$.includes("Quota")||$.includes("RESOURCE_EXHAUSTED")){e.flash("Limite \u2014 aguarde"),n.flashError(),M();return}n.flashError(800),M()}finally{l?.signal===w&&(l=null),c=!1}}function _(){if(c){e.flash("Analisando...");return}if(o.isActive()){let b=o.getCurrentStep()+1,E=o.getTotalSteps(),T=o.getState()==="waiting_key"?"Tecla":"Mouse";e.flash(`${b}/${E} ${T}`)}else{let E=oe().model.replace("gemini-","").replace("-flash","F").replace("-lite","L").replace("-preview","P");e.flash(`OK \u2014 ${E}`)}}function y(){a.isOpen()&&a.close(),s.isOpen()&&s.close(),r.isOpen()&&r.close(),i.isOpen()&&i.close()}let v=[{keys:"Shift+Q",label:"Analisar p\xE1gina",action:()=>void g()},{keys:"Shift+M",label:"Trocar modelo",action:()=>a.isOpen()?a.close():a.open()},{keys:"Shift+A",label:"Config API keys",action:()=>s.isOpen()?s.close():s.open()},{keys:"Shift+Z",label:"Abortar fluxo",action:()=>o.isActive()?o.abort():e.flash("Nada ativo")},{keys:"Shift+R",label:"Re-analisar",action:()=>void g()},{keys:"Shift+H",label:"Debug Output",action:()=>i.toggle()},{keys:"Shift+I",label:"\xDAltimo aviso",action:()=>e.reshow()},{keys:"Shift+C",label:"Comandos",action:()=>r.isOpen()?r.close():r.open()},{keys:"Escape",label:"Fechar menus",action:y}];r.setCommands(v);function f(b){let E=b.key;if(b.altKey&&(E==="q"||E==="Q")||b.shiftKey&&E==="Q"){b.preventDefault(),b.stopPropagation(),g();return}if(b.shiftKey&&E==="M"){b.preventDefault(),b.stopPropagation(),a.isOpen()?a.close():a.open();return}if(b.shiftKey&&E==="A"){b.preventDefault(),b.stopPropagation(),s.isOpen()?s.close():s.open();return}if(b.shiftKey&&E==="Z"){b.preventDefault(),b.stopPropagation(),o.isActive()?o.abort():e.flash("Nada ativo");return}if(b.shiftKey&&E==="R"){b.preventDefault(),b.stopPropagation(),g();return}if(b.shiftKey&&E==="H"){b.preventDefault(),b.stopPropagation(),i.toggle();return}if(b.shiftKey&&E==="I"){b.preventDefault(),b.stopPropagation(),e.reshow();return}if(b.shiftKey&&E==="C"){b.preventDefault(),b.stopPropagation(),r.isOpen()?r.close():r.open();return}E==="Escape"&&(a.isOpen()||s.isOpen()||r.isOpen()||i.isOpen())&&(b.stopPropagation(),b.preventDefault(),y())}window.addEventListener("keydown",f,{capture:!0}),window.__eqdiscrete={analyze:()=>g(),destroy:()=>{window.removeEventListener("keydown",f,{capture:!0}),u&&clearTimeout(u),o.destroy(),i.destroy(),a.destroy(),s.destroy(),r.destroy(),p.stop(),n.destroy(),e.destroy(),t.clearAll(),delete window.__eqdiscrete}}}})();
