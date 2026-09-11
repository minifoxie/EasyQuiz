/* EasyQuiz Discreto v1.0.0 — Modo Stealth sem interface
 * 100% Client-side. Direct Google Gemini REST API.
 */
"use strict";(()=>{var ae={apiKey:"",apiKeys:[],model:"gemini-3.5-flash-lite",uiMode:"easy",modeHint:"",engine:"smart",dryRun:!1,autoApply:!0,autoAdvance:!1,hostDarkMode:!0,useVision:!0,confidenceThreshold:.8};function ce(t){if(!t||typeof t!="string")return!1;let e=t.toLowerCase().trim().replace(/^models\//,"");if(!e.includes("gemini"))return!1;let n=["imagen","image","veo","omni","video","embedding","embed","tts","audio","speech","voice","sound","live","transcribe","bidi","aqa","learnlm","deep-research","computer-use","robotics","rt-1","rt-2","mediapipe","cyber","latest","-ultra","experimental"];for(let o of n)if(e.includes(o))return!1;return!(!e.includes("flash")&&!e.includes("pro"))}var st="easyquiz_settings_v2",at="easyquiz_activity_metrics";function te(){try{let t=localStorage.getItem(st);if(!t){let s=localStorage.getItem("easyquiz_settings_v1");if(s){let c=JSON.parse(s);return{...ae,apiKey:c.apiKey||""}}return{...ae}}let e=JSON.parse(t),n=typeof e.model=="string"&&ce(e.model)?e.model:ae.model,o=Array.isArray(e.apiKeys)?e.apiKeys.map(s=>typeof s=="string"?s.trim().replace(/^["']|["']$/g,""):"").filter(s=>s.length>5):[],i=typeof e.apiKey=="string"?e.apiKey.trim().replace(/^["']|["']$/g,""):"";return o.length===0&&i&&(o=[i]),{apiKey:o[0]||i||ae.apiKey,apiKeys:o,model:n,uiMode:e.uiMode==="easy"||e.uiMode==="advanced"?e.uiMode:ae.uiMode,modeHint:e.modeHint??"",engine:e.engine??"smart",dryRun:!!e.dryRun,autoApply:e.autoApply!==void 0?!!e.autoApply:!0,autoAdvance:!!e.autoAdvance,hostDarkMode:e.hostDarkMode!==void 0?!!e.hostDarkMode:!0,useVision:e.useVision!==void 0?!!e.useVision:ae.useVision,confidenceThreshold:typeof e.confidenceThreshold=="number"?e.confidenceThreshold:ae.confidenceThreshold}}catch{return{...ae}}}function Pe(t){try{let e=localStorage.getItem("eq_domain_cache_"+t);if(!e)return{};let n=JSON.parse(e);if(n.advanceSelector&&/inject|injetar/i.test(n.advanceSelector)){n.advanceSelector=void 0;try{localStorage.removeItem("eq_domain_cache_"+t)}catch{}}return n}catch{return{}}}function Re(t,e){if(e.advanceSelector&&/inject|injetar/i.test(e.advanceSelector))return;let o={...Pe(t),...e};try{localStorage.setItem("eq_domain_cache_"+t,JSON.stringify(o))}catch(i){console.warn("[EasyQuiz] Erro cache de dominio:",i)}}function fe(t){let e=te(),n=Array.isArray(t.apiKeys)?t.apiKeys.map(a=>typeof a=="string"?a.trim().replace(/^["']|["']$/g,""):"").filter(a=>a.length>5):e.apiKeys,o;typeof t.apiKey=="string"?o=t.apiKey.trim().replace(/^["']|["']$/g,""):Array.isArray(t.apiKeys)&&t.apiKeys.length>0?o=n[0]||"":o=e.apiKey,o&&!n.includes(o)&&(n=[o,...n]),n.length>0&&(!o||!n.includes(o))&&(o=n[0]);let i={...e,...t,apiKey:o,apiKeys:n};try{localStorage.setItem(st,JSON.stringify(i))}catch(a){console.warn("[EasyQuiz] Falha ao persistir configura\xE7\xF5es no localStorage:",a)}return i}var de=[],it=12,Pt=1200;function ct(t){let e=t.trim().replace(/\s+/g," ").slice(0,Pt);e&&!de.includes(e)&&(de.push(e),de.length>it&&(de=de.slice(-it)))}function lt(){return de}function dt(){return{startTime:Date.now(),totalElapsedMs:0,completedQuestionsCount:0,averageDurationMs:0,records:[]}}var rt=dt();function ut(){rt=dt();try{sessionStorage.removeItem(at),localStorage.removeItem(at)}catch{}return rt}var _e=`Voc\xEA \xE9 o motor operacional inteligente do EasyQuiz. Sa\xEDda EXCLUSIVA em JSON minificado, sem markdown, sem coment\xE1rios, sem texto fora do JSON.

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
4. [IMAGENS E GR\xC1FICOS] \u2014 Visuais inline (inline_data) OU contexto textual [CONTEXTO_IMAGEM_N]. Veja instru\xE7\xE3o K abaixo.
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

H. VERDADEIRO/FALSO EM GRADE OU TABELA (MATRIZ V/F):
   \u2192 Avalie CADA afirma\xE7\xE3o/linha individualmente.
   \u2192 Para N afirma\xE7\xF5es/linhas, emita EXATAMENTE N a\xE7\xF5es separadas (uma para cada linha/afirma\xE7\xE3o) + adv para verificar.
   \u2192 NUNCA marque apenas uma afirma\xE7\xE3o e deixe as outras em branco.
   \u2192 Formatos suportados e recomendados:
     - Com name do radio: {t:"chk", name:"vf_row_1", v:"V", c:true} ou {t:"clk", name:"vf_row_1", v:"V"}
     - Com ID do controle em [RESPOSTAS]: {t:"chk", id:"eq-ctrl-XX", v:"V", c:true} ou {t:"clk", id:"eq-ctrl-XX"}
     - Com texto da afirma\xE7\xE3o/linha: {t:"clk", id:"1. Todo sistema linear...", v:"V"}
   \u2192 mode: "verdadeiro_falso" (ou "matriz_vf").

I. ORDENA\xC7\xC3O DE ITENS (DRAG & DROP):
   \u2192 O contexto mostrar\xE1 [RESPOSTAS] com type="sortable".
   \u2192 Use drag sequencialmente: do item (from) para a posi\xE7\xE3o desejada (to).
   \u2192 Ex: {t:"drag",from:"Passo B",to:"Posi\xE7\xE3o 1"}
   \u2192 mode: "ordenacao".

I. REDA\xC7\xC3O / DISSERTA\xC7\xC3O:
   \u2192 Detectado por: textarea grande OU enunciado com "escreva", "disserte", "redija", "elabore", "reda\xE7\xE3o".
   \u2192 Use: 1 a\xE7\xE3o val com texto completo: t\xEDtulo (se pedido) + introdu\xE7\xE3o + desenvolvimento + conclus\xE3o.
   \u2192 M\xEDnimo 15 linhas de conte\xFAdo relevante ao tema.
   \u2192 mode: "texto_livre".

J. P\xC1GINA INFORMATIVA / ARTIGO:
   \u2192 [RESPOSTAS] vazia, apenas texto para ler.
   \u2192 Use: actions=[{t:"adv"}] para avan\xE7ar. N\xE3o invente respostas.

K. IMAGENS E GR\xC1FICOS \u2014 REGRAS OBRIGAT\xD3RIAS:
   \u2192 Imagens inline (inline_data): analise visualmente curvas, eixos, v\xE9rtices, coordenadas, geometria, propor\xE7\xF5es.
   \u2192 Contexto textual [CONTEXTO_IMAGEM_N]: use o texto descritivo como se fosse a imagem. Extraia informa\xE7\xF5es num\xE9ricas, rela\xE7\xF5es e elementos relevantes.
   \u2192 FILTRO DE RELEV\xC2NCIA: Se [CONTEXTO_IMAGEM_N] descreve um \xEDcone, logo, avatar ou elemento decorativo \u2192 IGNORE.
     Se descreve gr\xE1fico, tabela, f\xF3rmula, mapa, diagrama ou figura do enunciado \u2192 USE ATIVAMENTE para resolver.
   \u2192 CAMPO imageDescriptions (OBRIGAT\xD3RIO quando h\xE1 imagens):
     Para CADA imagem/contexto visual recebido, emita uma entrada em imageDescriptions[]:
     { "index": N, "description": "O que vejo/entendo (max 60 palavras)", "relevant": true/false, "associatedLabel": "label da imagem" }
     - Se relevant=false: descri\xE7\xE3o breve ("\xEDcone decorativo" / "logo do site")
     - Se relevant=true: descri\xE7\xE3o do conte\xFAdo \xFAtil para a quest\xE3o
   \u2192 Selecione a alternativa cujo gr\xE1fico/dados satisfaz matematicamente a quest\xE3o.

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
{ "pageType": "question|info|start|conclusion", "mode": "...", "confidence": 0.0-1.0, "rationale": "...", "actions": [...], "memoryToStore": "...", "imageDescriptions": [] }
imageDescriptions: array descrevendo cada imagem/contexto visual recebido. Array vazio [] quando n\xE3o h\xE1 imagens.
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
`;function Rt(t,e){return/forms\.(google|gle)\.com|docs\.google\.com\/forms/i.test(t)||e.includes("Qr7Oae")||e.includes("freebirdFormviewer")||e.includes("data-item-id")?"[PLATAFORMA: Google Forms \u2014 use clk nos containers de alternativa; IDs via data-item-id ou texto da op\xE7\xE3o]":/wayground|quizizz/i.test(t)||e.includes("data-functional-selector")?e.includes("classification")||e.toLowerCase().includes("fato")||e.toLowerCase().includes("opini")?`[PLATAFORMA: Wayground/Quizizz CLASSIFICA\xC7\xC3O drag-and-drop]
[RESPOSTAS] ter\xE1 items com t="draggable" e id hexadecimal (ex: 695fa5b6...).
Use EXCLUSIVAMENTE: {t:"drag", from:"ID_hexadecimal_do_card", to:"NOME_DA_CATEGORIA"}
Exemplo: {t:"drag",from:"695fa5b69885555d8155a5ac",to:"FATO"}
Classifique TODOS os items (1 drag por item) antes de emitir adv.
mode: "arrastar_soltar"`:"[PLATAFORMA: Wayground/Quizizz \u2014 alternativas s\xE3o cards clic\xE1veis, use clk]":/khanacademy\.org/i.test(t)||e.includes("perseus")?"[PLATAFORMA: Khan Academy \u2014 widgets Perseus; use js via $eq para widgets interativos se necess\xE1rio]":/moodle|ava\.|classroom\.google/i.test(t)?"[PLATAFORMA: Moodle/AVA/Classroom \u2014 formul\xE1rios padr\xE3o]":/duolingo/i.test(t)?"[PLATAFORMA: Duolingo \u2014 tiles clic\xE1veis, use clk por texto]":/blackboard|canvas\.instructure/i.test(t)?"[PLATAFORMA: Canvas/Blackboard \u2014 quiz-question padr\xE3o]":/socrative|kahoot/i.test(t)?"[PLATAFORMA: Socrative/Kahoot \u2014 alternativas s\xE3o bot\xF5es, use clk]":""}function De(t,e,n){let o=t.htmlSnippet.includes("draggable")||t.htmlSnippet.includes("perseus")||t.htmlSnippet.includes("category")||t.htmlSnippet.includes("dropzone")||t.controls.some(v=>v.type==="draggable"||v.type==="dropzone"),i=/katex|latex|\\frac|\\sqrt/i.test(t.htmlSnippet),a=/forms\.(google|gle)\.com|docs\.google\.com\/forms/i.test(t.sourceUrl)||t.htmlSnippet.includes("Qr7Oae")||t.htmlSnippet.includes("data-item-id")||t.htmlSnippet.includes("freebirdFormviewer"),s=(/wayground|quizizz/i.test(t.sourceUrl)||t.htmlSnippet.includes("data-functional-selector"))&&(t.htmlSnippet.includes("classification")||t.controls.filter(v=>v.role==="answer").length===0),c=t.controls.filter(v=>v.role!=="navigation").length===0,r=c||o||a||s||i&&t.questionText.length<60,l=c?4500:s?6e3:1800,d=r?`
[HTML]:
${t.htmlSnippet.slice(0,l).replace(/\s+/g," ")}`:"",g="";if(c&&typeof document<"u")try{let v=Array.from(document.querySelectorAll('input:not([type=hidden]), textarea, select, button, [role="button"], [role="radio"], [role="checkbox"], [role="option"], [onclick], [data-action], a[href]:not([href="#"]), [tabindex]:not([tabindex="-1"])')).filter(w=>{let y=w,T=y.getBoundingClientRect?.()||{width:0,height:0};return T.width>0&&T.height>0&&!y.closest("#easyquiz-shadow-root, .eq-sidebar")}).slice(0,40).map(w=>{let y=w,T=y.tagName.toLowerCase(),$=y.id?`#${y.id}`:"",D=y.className&&typeof y.className=="string"?`.${y.className.trim().split(/\s+/).slice(0,2).join(".")}`:"",b=(y.textContent||y.value||y.getAttribute("aria-label")||"").trim().slice(0,60),S=y.getAttribute("type")||y.getAttribute("role")||"";return`${T}${$}${D}[${S}] txt="${b}"`});v.length>0&&(g=`
[DOM-INTERATIVO]:
${v.join(`
`)}`)}catch{}let u=lt(),p=u.length>0?`
[MEM\xD3RIA]:
${u.join(" | ")}
`:"",m=t.controls.filter(v=>v.role!=="navigation"),f=t.controls.filter(v=>v.role==="navigation"),h=Rt(t.sourceUrl,t.htmlSnippet),_=h?`
${h}
`:"";return`--- AN\xC1LISE ---
[MODO]: ${n.engine} | Dica: ${n.modeHint||"Auto"}
[URL]: ${t.sourceUrl}
[P\xC1GINA]: ${t.pageTitle}${p}${_}
[DADOS]
[TEXTO]:
${t.questionText}${d}${g}

[RESPOSTAS]:
${(()=>{if(m.length===0)return"Nenhuma";let v=m.filter(x=>x.type==="checkbox"||x.type==="chk"),w=new Set(m.filter(x=>x.type==="radio").map(x=>x.name).filter(Boolean)),y=v.filter(x=>!x.name||!w.has(x.name)),T=/selecione as|assinale as|quais das|todas as|marque as|escolha as|quais dessas|quais dos/i.test(t.questionText),$=y.length>=2||T,D=w.size>1||/verdadeir|fals[oa]|\bv\s*\/\s*f\b|julgue|itens/i.test(t.questionText)&&w.size>=1,b=m.every(x=>x.type==="radio"||x.type==="chk")&&w.size===1&&!$&&!D,S=m.filter(x=>x.type==="text"||x.type==="number"||x.type==="val"||x.tag==="input"||x.tag==="textarea"),C=S.length>=2;return(D?`[GRADE VERDADEIRO/FALSO (${w.size||"m\xFAltiplas"} afirma\xE7\xF5es): voc\xEA DEVE julgar e marcar exatamente 1 op\xE7\xE3o (V ou F) para CADA uma das ${w.size} afirma\xE7\xF5es \u2014 emita ${w.size} a\xE7\xF5es chk separadas + adv]
`:$?`[MULTI-SELE\xC7\xC3O: marque TODOS os corretos, pode ser 2 ou mais]
`:b?`[ESCOLHA-\xDAnica: marque APENAS 1 op\xE7\xE3o]
`:C?`[M\xDALTIPLOS CAMPOS DE PREENCHIMENTO (${S.length} campos): emita uma a\xE7\xE3o val para CADA um dos ${S.length} campos abaixo com seu id exato]
`:"")+JSON.stringify(m.map(x=>({id:x.id,t:x.type,n:x.name||void 0,txt:x.label?x.label.length>160?x.label.slice(0,160)+"...":x.label:void 0,v:x.value||void 0,opt:x.options&&x.options.length?x.options.slice(0,20).map(k=>k.label||k.value):void 0})))})()}

[NAVEGA\xC7\xC3O]:
${f.length>0?f.map(v=>`"${v.label||v.id}"[${v.type}]`).join(","):"Nenhuma"}

[IMAGENS E GR\xC1FICOS ANEXADOS (${e.length})]:
${e.length===0?"Nenhum anexo visual.":e.map((v,w)=>{let y=v.associatedLabel||"Gr\xE1fico da Quest\xE3o",T=v.alt?` | alt: "${v.alt}"`:"";return v.captureStatus==="text_only"?`  - Imagem ${w+1} [CONTEXTO_TEXTUAL]: ${y}${T} | ${v.textContext||"sem contexto adicional"}`:v.captureStatus==="captured"||v.base64?`  - Imagem ${w+1} [VISUAL_INLINE]: ${y}${T}`:`  - Imagem ${w+1} [FALHOU]: ${y}${T}`}).join(`
`)}
[/DADOS]
Sa\xEDda em JSON v\xE1lido.`}var Dt=new Set(["question","info","start","conclusion"]),Nt=new Set(["texto_livre","escolha_unica","escolha_multipla","verdadeiro_falso","preenchimento","acao_sem_resposta","categorizacao","ordenacao","arrastar_soltar"]),zt=new Set(["val","chk","sel","clk","adv","js","drag"]),Ft=150,ge=2e3;function Q(t,e=""){return t==null?e:typeof t=="string"?t.trim().slice(0,ge):typeof t=="number"||typeof t=="boolean"?String(t).trim().slice(0,ge):e}function Bt(t,e){if(!t||typeof t!="object")return null;let n=t,o=n.t;if(typeof o!="string"||!zt.has(o))return null;if(o==="adv"){let c=n.id??n.target??n.name??n.selector;return{t:"adv",...Q(c)?{id:Q(c,"").slice(0,500)}:{}}}if(o==="drag"){let c=Q(n.from??n.source),r=Q(n.to??n.target??n.destination);return!c||!r?null:{t:"drag",from:c.slice(0,500),to:r.slice(0,500)}}if(o==="js"){let c=Q(n.v??n.code??n.script);return!c||c.length>8e3?null:{t:"js",v:c}}let i=n.id??n.target??n.name??n.selector??n.element;(i==null||i==="")&&o==="val"&&(i="1");let a=Q(i).slice(0,500);if(!a)return null;if(o==="val"){let c=n.v!==void 0?n.v:n.value!==void 0?n.value:n.val!==void 0?n.val:n.text!==void 0?n.text:n.answer;return{t:"val",id:a,v:Q(c).slice(0,ge)}}if(o==="sel"){let c=n.v!==void 0?n.v:n.value!==void 0?n.value:n.val!==void 0?n.val:n.values,l=(Array.isArray(c)?c:[c]).map(d=>Q(d).slice(0,500)).filter(Boolean);return{t:"sel",id:a,v:l}}if(o==="chk"){let c=n.c===!1||n.c==="false"||n.c===0||n.c==="0"||n.c==="off"||n.c==="unchecked"||n.c==="desmarcar",r={t:"chk",id:a,c:!c};return n.v!==void 0&&(r.v=Q(n.v).slice(0,ge)),r}let s={t:"clk",id:a};if(n.c!==void 0){let c=n.c===!1||n.c==="false"||n.c===0||n.c==="0"||n.c==="off"||n.c==="unchecked"||n.c==="desmarcar";s.c=!c}return n.v!==void 0&&(s.v=Q(n.v).slice(0,ge)),Array.isArray(n.co)&&n.co.length===2&&n.co.every(c=>typeof c=="number"&&Number.isFinite(c))&&(s.co=[n.co[0],n.co[1]]),s}function Ut(t,e,n){if(n!=="question")return t;let o=t.filter(a=>a.t==="adv"),i=t.filter(a=>a.t!=="adv");if(e==="escolha_unica"){i=i.filter(s=>!(s.t==="chk"&&s.c===!1||s.t==="clk"&&s.c===!1));let a=i.filter(s=>s.t==="chk"||s.t==="clk");if(a.length>1){let s=i.filter(r=>r.t!=="chk"&&r.t!=="clk"),c=a[a.length-1];i=[...s,c]}}else if(e==="escolha_multipla"){i=i.filter(s=>!(s.t==="chk"&&s.c===!1||s.t==="clk"&&s.c===!1));let a=new Set;i=i.filter(s=>{let c="id"in s&&typeof s.id=="string"?s.id:"";return c?a.has(c)?!1:(a.add(c),!0):!0})}else if(e==="verdadeiro_falso"){let a=new Set,s=[...i].reverse(),c=[];for(let r of s){let l="id"in r&&typeof r.id=="string"?r.id:"";l?a.has(l)||(a.add(l),c.push(r)):c.push(r)}i=c.reverse()}return[...i,...o]}function pt(t){if(!t||typeof t!="object")return{pageType:"info",mode:"acao_sem_resposta",confidence:.5,rationale:"Resposta estruturada n\xE3o identificada; avan\xE7ando como informativo.",actions:[{t:"adv"}]};let e=t,n=e.pageType,o=e.mode;(typeof n!="string"||!Dt.has(n))&&(n="question"),(typeof o!="string"||!Nt.has(o))&&(o="escolha_unica");let i=Array.isArray(e.actions)?e.actions:[],a=[];for(let r=0;r<Math.min(i.length,Ft);r++){let l=Bt(i[r],r);l&&a.push(l)}a.some(r=>r.t==="val")&&(o==="escolha_unica"||!e.mode)&&(o="preenchimento"),a.some(r=>r.t==="drag")&&!["categorizacao","arrastar_soltar","ordenacao"].includes(o)&&(o="arrastar_soltar"),a=Ut(a,o,n);let s=a.some(r=>r.t==="adv");n==="conclusion"?a.length=0:n==="info"||n==="start"?s||a.push({t:"adv"}):n==="question"&&!s&&a.push({t:"adv"});let c=typeof e.confidence=="number"&&Number.isFinite(e.confidence)?Math.min(1,Math.max(0,e.confidence)):.85;return{pageType:n,mode:o,confidence:c,rationale:Q(e.rationale,"Plano validado e auto-recuperado."),actions:a,...Q(e.memoryToStore)?{memoryToStore:Q(e.memoryToStore)}:{},...e.needsMoreContext?{needsMoreContext:!!e.needsMoreContext}:{}}}var ne=class{keys=new Map;constructor(e=[]){this.init(e)}init(e){let n=new Map(this.keys);this.keys.clear();let o=e.flatMap(a=>a.split(/[\n\r]+/));Array.from(new Set(o.map(a=>a.trim().replace(/^["']|["']$/g,"")).filter(a=>a.length>5))).forEach((a,s)=>{let c=this.generateId(a),r=n.get(c)||n.get(a);this.keys.set(c,{id:c,key:a,label:r?.label||`Chave ${s+1}`,addedAt:r?.addedAt||Date.now(),lastUsedAt:r?.lastUsedAt,lastLatencyMs:r?.lastLatencyMs,cooldownUntil:r?.cooldownUntil,errorCount:r?.errorCount||0,lastError:r?.lastError,winCount:r?.winCount||0})})}generateId(e){let n=0;for(let i=0;i<e.length;i++)n=(n<<5)-n+e.charCodeAt(i),n|=0;let o=e.slice(-12).replace(/[^a-zA-Z0-9]/g,"").slice(0,6);return`key_${Math.abs(n).toString(36).slice(0,6)}${o}`}static maskKey(e){let n=e.trim().replace(/^["']|["']$/g,"");return n.length<=10?"\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022":`${n.slice(0,6)}...${n.slice(-4)}`}getAllKeys(){let e=Date.now();return Array.from(this.keys.values()).map(n=>{let o=Math.max(0,(n.cooldownUntil||0)-e);return{...n,isCooldown:o>0,remainingCooldownMs:o}})}getHealthyKeys(){let e=Date.now();return Array.from(this.keys.values()).filter(n=>(n.cooldownUntil||0)<=e&&(n.errorCount||0)<50)}getRoundRobinKeys(e=2){let n=Date.now(),o=Array.from(this.keys.values()).filter(a=>(a.errorCount||0)<50);if(o.length===0)return Array.from(this.keys.values()).slice(0,e);let i=o.filter(a=>(a.cooldownUntil||0)<=n);return i.length>0?(i.sort((a,s)=>{let c=a.lastLatencyMs!==void 0?a.lastLatencyMs:99999,r=s.lastLatencyMs!==void 0?s.lastLatencyMs:99999;if(c!==r)return c-r;let l=(a.lastUsedAt||0)-(s.lastUsedAt||0);return l!==0?l:a.addedAt-s.addedAt}),i.slice(0,e)):(o.sort((a,s)=>(a.cooldownUntil||0)-(s.cooldownUntil||0)),o.slice(0,e))}getBestKey(){return this.getRoundRobinKeys(1)[0]?.key||""}getDiverseKeys(e){return this.getRoundRobinKeys(e).map(n=>n.key)}markQuotaHit(e,n=8e3){let o=this.findKeyObj(e);o&&(o.cooldownUntil=Date.now()+n,o.lastError=`Cota tempor\xE1ria atingida (HTTP 429). Cooldown de ${Math.round(n/1e3)}s ativado.`)}markOverloaded(e,n=5e3){let o=this.findKeyObj(e);o&&(o.cooldownUntil=Date.now()+n,o.lastError=`Servidores sobrecarregados (HTTP 503). Cooldown de ${Math.round(n/1e3)}s ativado.`)}markSuccess(e,n){let o=this.findKeyObj(e);o&&(o.lastLatencyMs=n,o.lastUsedAt=Date.now(),o.errorCount=0,o.lastError=void 0,o.cooldownUntil=void 0)}markWinner(e){let n=this.findKeyObj(e);n&&(n.winCount=(n.winCount||0)+1)}markInvalid(e,n){let o=this.findKeyObj(e);o&&(o.errorCount=99,o.lastError=n)}addKey(e,n){let o=e.trim().replace(/^["']|["']$/g,"");if(!o)return{ok:!1,message:"Chave n\xE3o pode ser vazia."};if(o.length<15)return{ok:!1,message:"Chave de API inv\xE1lida ou muito curta."};let i=this.generateId(o);if(this.keys.has(i)||Array.from(this.keys.values()).some(c=>c.key===o))return{ok:!1,message:"Esta chave de API j\xE1 est\xE1 cadastrada."};let s={id:i,key:o,label:n?.trim()||`Chave ${this.keys.size+1}`,addedAt:Date.now(),errorCount:0};return this.keys.set(i,s),{ok:!0,message:"Chave adicionada com sucesso!",keyItem:s}}updateKey(e,n,o){let i=this.keys.get(e);if(!i)return{ok:!1,message:"Chave n\xE3o encontrada."};let a=n.trim().replace(/^["']|["']$/g,"");return!a||a.length<15?{ok:!1,message:"Chave de API inv\xE1lida."}:(i.key=a,o!==void 0&&(i.label=o.trim()),i.errorCount=0,i.cooldownUntil=void 0,i.lastError=void 0,{ok:!0,message:"Chave atualizada com sucesso!"})}removeKey(e){if(this.keys.size<=1)return{ok:!1,message:"Voc\xEA precisa manter pelo menos 1 chave de API cadastrada."};let n=this.findKeyObj(e);return n?(this.keys.delete(n.id),{ok:!0,message:"Chave removida com sucesso."}):{ok:!1,message:"Chave n\xE3o encontrada."}}exportRawKeys(){return Array.from(this.keys.values()).map(e=>e.key)}size(){return this.keys.size}findKeyObj(e){if(this.keys.has(e))return this.keys.get(e);for(let n of this.keys.values())if(n.key===e)return n}},Y=new ne;var ve=[{id:"gemini-3.8-flash",name:"Gemini 3.8 Flash (Mais Inteligente 2026)",description:"Modelo flagship Flash lan\xE7ado em Set/2026. Ultra-r\xE1pido e altamente capaz.",stable:!0},{id:"gemini-3.7-flash",name:"Gemini 3.7 Flash (Agentic)",description:"Alta capacidade para racioc\xEDnio multimodal e workflows ag\xEAnticos.",stable:!0},{id:"gemini-3.6-flash",name:"Gemini 3.6 Flash (Est\xE1vel)",description:"Modelo est\xE1vel e confi\xE1vel com excelente velocidade.",stable:!0},{id:"gemini-3.5-flash",name:"Gemini 3.5 Flash (R\xE1pido)",description:"Modelo de alta performance para tarefas r\xE1pidas.",stable:!0},{id:"gemini-3.5-flash-lite",name:"Gemini 3.5 Flash-Lite (Cota Alta 30 RPM)",description:"Modelo econ\xF4mico de ultra-alta velocidade e maior limite de RPM.",stable:!0},{id:"gemini-3.1-pro",name:"Gemini 3.1 Pro (Racioc\xEDnio Profundo)",description:"Modelo topo de linha para racioc\xEDnio complexo, exatas e matem\xE1tica.",stable:!0},{id:"gemini-2.5-flash",name:"Gemini 2.5 Flash (Ultra R\xE1pido)",description:"Modelo comprovado de baix\xEDssima lat\xEAncia e alta disponibilidade.",stable:!0},{id:"gemini-2.5-pro",name:"Gemini 2.5 Pro (Avan\xE7ado)",description:"Modelo avan\xE7ado para quest\xF5es de alta complexidade.",stable:!0}],ft=["gemini-3.5-flash-lite","gemini-3.5-flash","gemini-3.6-flash","gemini-3.8-flash","gemini-2.5-flash"],jt={"gemini-2.0-flash":"gemini-3.5-flash","gemini-2.0-flash-lite":"gemini-3.5-flash-lite","gemini-1.5-flash":"gemini-3.5-flash","gemini-1.5-pro":"gemini-3.6-flash","gemini-1.0-pro":"gemini-2.5-flash"};function Be(t){return jt[t]??t}function Vt(t,e){let o={temperature:0,maxOutputTokens:1350,responseMimeType:"application/json",responseSchema:e??Kt};return/lite/i.test(t)||(/gemini-3\.[0-9]+-?flash/i.test(t)?o.thinkingConfig={thinkingBudget:0}:/gemini-2\.5-flash/i.test(t)&&(o.thinkingConfig={thinkingBudget:0})),o}var Kt={type:"OBJECT",properties:{pageType:{type:"STRING",enum:["question","info","start","conclusion"]},mode:{type:"STRING",enum:["texto_livre","escolha_unica","escolha_multipla","verdadeiro_falso","preenchimento","acao_sem_resposta","categorizacao","ordenacao","arrastar_soltar"]},confidence:{type:"NUMBER"},rationale:{type:"STRING"},thinking:{type:"STRING"},memoryToStore:{type:"STRING"},imageDescriptions:{type:"ARRAY",items:{type:"OBJECT",properties:{index:{type:"NUMBER"},description:{type:"STRING"},relevant:{type:"BOOLEAN"},associatedLabel:{type:"STRING"}}}},actions:{type:"ARRAY",items:{type:"OBJECT",properties:{t:{type:"STRING",enum:["val","chk","sel","clk","adv","js","drag"]},id:{type:"STRING"},name:{type:"STRING"},label:{type:"STRING"},v:{type:"STRING"},c:{type:"BOOLEAN"},co:{type:"ARRAY",items:{type:"NUMBER"}},from:{type:"STRING"},to:{type:"STRING"}},required:["t"]}}},required:["pageType","mode","confidence","rationale","actions"]};function gt(t){let e=t.trim().replace(/^google\//,"").replace(/^models\//,"");if(!e)return"gemini-3.5-flash-lite";let n=Be(e);return ce(n)?n:(console.warn(`[EasyQuiz] Modelo desconhecido ou inv\xE1lido: "${e}". Verifique se o modelo est\xE1 dispon\xEDvel no Google AI Studio.`),"gemini-3.5-flash-lite")}function ze(t,e){let n="";try{let o=JSON.parse(t);n=o.error?.message||o.message||""}catch{n=t.slice(0,160)}return/API_KEY_INVALID|API key not valid|key.*invalid|unregistered/i.test(n)?"Chave de API do Gemini inv\xE1lida ou n\xE3o autorizada no Google AI Studio.":/RESOURCE_EXHAUSTED|Quota exceeded|rate limit|quota/i.test(n)||e===429?`Cota do Gemini excedida (HTTP 429): ${n||"Aguarde"}`:e===404?`HTTP 404: ${n||"Modelo ou endpoint n\xE3o encontrado no Google AI Studio"}`:e===503||/overloaded/i.test(n)?`Servidores Google sobrecarregados (HTTP 503): ${n||"Aguardando"}`:n?`Erro Gemini (HTTP ${e}): ${n}`:`Falha na requisi\xE7\xE3o ao Gemini (HTTP ${e}).`}function Gt(t){let e=t.trim(),n=e.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);if(n)try{return JSON.parse(n[1].trim())}catch{}try{return JSON.parse(e)}catch{}let o=e.match(/\{[\s\S]*\}/);if(o)try{return JSON.parse(o[0].trim())}catch{}try{let i=e.indexOf("{");if(i!==-1){let a=e.slice(i).trim();a=a.replace(/,\s*\{[^}]*$/,""),a=a.replace(/,\s*$/,"");let s=0,c=0,r=!1,l=!1;for(let g=0;g<a.length;g++){let u=a[g];if(l){l=!1;continue}if(u==="\\"){l=!0;continue}if(u==='"'){r=!r;continue}r||(u==="{"?s++:u==="}"?s=Math.max(0,s-1):u==="["?c++:u==="]"&&(c=Math.max(0,c-1)))}for(r&&(a+='"');c>0;)a+="]",c--;for(;s>0;)a+="}",s--;let d=JSON.parse(a);if(d&&typeof d=="object")return d}}catch{}throw new Error("Falha ao decodificar JSON da IA.")}var xe=(()=>{try{let t=typeof localStorage<"u"?localStorage.getItem("easyquiz_cached_models"):null;if(!t)return null;let e=JSON.parse(t);if(Array.isArray(e)){let n=e.filter(o=>o&&typeof o.id=="string"&&ce(o.id));return n.length>0?n:null}return null}catch{return null}})(),Ne=new Set;async function Ue(t){let e=t.trim().replace(/^["']|["']$/g,"");if(!e)return ve;let n=[`https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(e)}`,`https://generativelanguage.googleapis.com/v1/models?key=${encodeURIComponent(e)}`];for(let o of n)try{let i=await fetch(o,{headers:{"Content-Type":"application/json","x-goog-api-key":e}});if(!i.ok){let s=await i.text(),c=ze(s,i.status);if(c.includes("inv\xE1lida")||c.includes("n\xE3o autorizada"))throw new Error(c);continue}let a=await i.json();if(Array.isArray(a.models)&&a.models.length>0){let s=a.models.filter(c=>{let r=c.supportedGenerationMethods||[],l=(c.name||"").replace(/^models\//,""),d=r.includes("generateContent");return ce(l)&&d}).map(c=>{let r=c.supportedGenerationMethods||[],l=c.name.replace(/^models\//,""),d=c.displayName||l;return{id:l,name:d.includes(l)?d:`${d} (${l})`,description:c.description||"",stable:!/-preview|-experimental|-latest/i.test(l),supportsVision:!/embedding|tts|transcribe|live|image|sound|voice/i.test(l),supportsStructuredOutput:r.includes("generateContent"),supportedGenerationMethods:r,discoveredAt:Date.now()}});if(s.length>0){s.sort((c,r)=>{let l=d=>d==="gemini-3.8-flash"?200:d==="gemini-3.7-flash"?190:d==="gemini-3.6-flash"?180:d==="gemini-3.5-flash"?170:d==="gemini-3.5-flash-lite"?160:d==="gemini-2.5-flash"?130:d.includes("flash")?80:d==="gemini-2.5-pro"?60:d.includes("pro")?50:10;return l(r.id)-l(c.id)}),xe=s;try{typeof localStorage<"u"&&localStorage.setItem("easyquiz_cached_models",JSON.stringify(s))}catch{}return s}}}catch(i){if(i.message?.includes("Chave de API"))throw i}return ve}async function ht(t,e){let n=e.map(l=>l.trim().replace(/^["']|["']$/g,"")).filter(l=>l.length>5);if(n.length===0)return{ok:!1,model:t,key:"",message:"Nenhuma chave dispon\xEDvel."};let o=Be(gt(t)),i=JSON.stringify({contents:[{role:"user",parts:[{text:"PING"}]}],generationConfig:{maxOutputTokens:5}}),a={"Content-Type":"application/json"};async function s(l,d,g){let u=new AbortController,p=setTimeout(()=>u.abort(),g);try{let m=`https://generativelanguage.googleapis.com/v1beta/models/${d}:generateContent?key=${encodeURIComponent(l)}`,f=await fetch(m,{method:"POST",headers:{...a,"x-goog-api-key":l},body:i,signal:u.signal});if(clearTimeout(p),f.ok)return{ok:!0,model:d,key:l,message:`Modelo '${d}' validado com sucesso!`};let h=await f.text().catch(()=>"");throw new Error(`HTTP ${f.status}: ${h.slice(0,80)}`)}catch(m){throw clearTimeout(p),m}}if(n.length>=2){let l=n.slice(0,6);try{return await Promise.any(l.map(g=>s(g,o,8e3)))}catch{}}let c=n[0],r=[o,...ft.filter(l=>l!==o)];for(let l of r)try{let d=await s(c,l,4e3);return l!==o&&(d.message=`Modelo preferido indispon\xEDvel. Validado via fallback '${l}'.`),d}catch{}return{ok:!1,model:o,key:c,message:"Nenhum modelo Gemini respondeu. Verifique sua chave e cota."}}async function Wt(t,e,n,o,i){let a=["v1beta","v1"],s=new Error(`Falha ao consultar modelo ${t}`),r={...Vt(t,i)};for(let l of a){if(o.aborted)throw new Error("Opera\xE7\xE3o cancelada pelo usu\xE1rio.");let d=`https://generativelanguage.googleapis.com/${l}/models/${t}:generateContent?key=${encodeURIComponent(e)}`,g=Date.now();try{let u=await fetch(d,{method:"POST",headers:{"Content-Type":"application/json","x-goog-api-key":e},body:JSON.stringify({...n,generationConfig:r}),signal:o});if(!u.ok){let f=await u.text();if(u.status===400){let _=/thinking/i.test(f),v=/response_schema|responseSchema|Repeated map key|PROTO payload/i.test(f);if((_||v)&&(r.thinkingConfig||r.responseSchema)){let w={...r};_&&delete w.thinkingConfig,v&&(delete w.responseSchema,delete w.responseMimeType),r=w;let y=await fetch(d,{method:"POST",headers:{"Content-Type":"application/json","x-goog-api-key":e},body:JSON.stringify({...n,generationConfig:r}),signal:o});if(y.ok){let D=await y.json(),b=D.candidates?.[0];if(b?.content?.parts?.[0]?.text)return Y.markSuccess(e,Date.now()-g),{rawText:b.content.parts[0].text,data:D,usedModel:t,usedKey:e}}let T=await y?.text?.().catch(()=>"")??f,$=ze(T,u.status);throw new Error(`[${t}|${ne.maskKey(e)}] ${$}`)}}let h=ze(f,u.status);if(u.status===404&&l==="v1beta")continue;throw u.status===429?(Y.markQuotaHit(e,8e3),bt(e,t,1e4),new Error(`[${t}|${ne.maskKey(e)}] ${h}`)):(u.status===503||/no capacity|overloaded|unavailable/i.test(f)?(Y.markOverloaded(e,5e3),Ne.add(t)):u.status===403||/API_KEY_INVALID/i.test(f)?Y.markInvalid(e,h):u.status===404&&Ne.add(t),new Error(`[${t}|${ne.maskKey(e)}] ${h}`))}let p=await u.json(),m=p.candidates?.[0];if(!m||!m.content?.parts?.[0]?.text)throw new Error(`[${t}|${ne.maskKey(e)}] A IA n\xE3o retornou uma resposta estruturada v\xE1lida.`);return Y.markSuccess(e,Date.now()-g),{rawText:m.content.parts[0].text,data:p,usedModel:t,usedKey:e}}catch(u){if(o.aborted)throw u;s=u;let p=s.message||"";if(p.includes("404")||/no longer available/i.test(p)){Ne.add(t);break}if(p.includes("429")||p.includes("Quota"))break}}throw s}var Fe=new Map;function mt(t,e){let n=`${t}::${e}`,o=Fe.get(n);return o===void 0?!1:Date.now()>o?(Fe.delete(n),!1):!0}function bt(t,e,n=1e4){Fe.set(`${t}::${e}`,Date.now()+n)}async function yt(t,e,n,o,i,a){if(i?.aborted)throw new Error("Opera\xE7\xE3o cancelada pelo usu\xE1rio.");let s=Array.isArray(n.apiKeys)&&n.apiKeys.length>0?n.apiKeys:n.apiKey?[n.apiKey]:[];Y.init(s);let c=n.apiKey.trim().replace(/^["']|["']$/g,""),r=Y.getBestKey()||c;if(!r)throw new Error("Nenhuma chave de API do Gemini configurada ou dispon\xEDvel.");let l=gt(n.model);if(!xe&&r&&Ue(r).catch(()=>{}),i?.aborted)throw new Error("Opera\xE7\xE3o cancelada pelo usu\xE1rio.");let d=Date.now(),g=De(t,e,n),u=[{text:g}];for(let L=0;L<e.length;L++){let x=e[L],k=x.associatedLabel||(x.alt?`Imagem: ${x.alt}`:`Imagem ${L+1}`);if(x.captureStatus==="text_only"||!x.base64){let q=x.textContext||x.alt||"";u.push({text:`[CONTEXTO_IMAGEM_${L+1} - V\xCDNCULO: ${k}]: ${q}`})}else u.push({text:`[ANEXO VISUAL ${L+1} - V\xCDNCULO: ${k}]:`}),u.push({inline_data:{mime_type:x.mediaType,data:x.base64}})}let p={system_instruction:{parts:[{text:a?.systemPromptOverride??_e}]},contents:[{role:"user",parts:u}]},m=Be(l),f=ft.filter(L=>L!==m),_=Y.getAllKeys().length,v=L=>_<=1||L===0?1:2,w=new Set,y=(L,x)=>{let k=/pro/i.test(L),q=/lite/i.test(L);return k?x===0?9e3:x===1?12e3:16e3:q?x===0?3500:x===1?5e3:6500:x===0?4500:x===1?6500:8e3},T=async(L,x)=>{if(x.length===0||i?.aborted)return null;let k=x.map(()=>new AbortController),q=()=>k.forEach(z=>{try{z.abort()}catch{}});i?.addEventListener("abort",q,{once:!0});let N=x.map(z=>`${z.model.replace("gemini-","")}/${z.label}`).join(" | ");o?.(`\u26A1 ${L}: ${x.length} slot(s) [${N}]...`,"info");try{let z=x.map(async(O,U)=>{let K=k[U],se=setTimeout(()=>{try{K.abort(new Error(`Timeout ${O.timeout/1e3}s (${O.model}|${O.label})`))}catch{K.abort()}},O.timeout);try{let B=await Wt(O.model,O.key,p,K.signal,a?.generationSchemaOverride);clearTimeout(se);let Z=pt(Gt(B.rawText));return Z.usedModel=B.usedModel,Z.durationMs=Date.now()-d,Z.promptSent=g,Z.tokensUsed=B.data.usageMetadata?.totalTokenCount,Z.promptTokens=B.data.usageMetadata?.promptTokenCount,Z.candidatesTokens=B.data.usageMetadata?.candidatesTokenCount,Z.rawResponse=B.rawText,k.forEach((ot,$t)=>{if($t!==U)try{ot.abort(new Error("Cancelado: vencedor respondeu."))}catch{ot.abort()}}),{plan:Z,rawUsage:B.data.usageMetadata,usedModel:B.usedModel,usedKey:B.usedKey,slotLabel:O.label}}catch(B){clearTimeout(se);let Z=B instanceof Error?B.message:String(B);throw(Z.includes("429")||Z.includes("Quota")||Z.includes("RESOURCE_EXHAUSTED"))&&(bt(O.key,O.model,1e4),Y.markQuotaHit(O.key,8e3)),B}}),F=await Promise.any(z);return i?.removeEventListener("abort",q),Y.markWinner(F.usedKey),F}catch(z){return i?.removeEventListener("abort",q),z instanceof AggregateError&&z.errors.length>0?S=z.errors.map(F=>F instanceof Error?F.message:String(F)).join(" | "):z instanceof Error&&(S=z.message),console.warn(`[EasyQuiz ${L}] Falha na onda:`,S),null}},D=(_<=1?1:1+Math.ceil((_-1)/2))+4,b=0,S="",C=0;for(;b<D;){if(i?.aborted)throw new Error("Opera\xE7\xE3o cancelada pelo usu\xE1rio.");let L=Y.getRoundRobinKeys(_),x=L.filter(K=>!w.has(`${K.key}::${m}`)&&!mt(K.key,m)),k,q;if(x.length>0)k=m,q=x;else{let K=f;k=K[C%K.length]||m,C++;let se=L.filter(B=>!w.has(`${B.key}::${k}`)&&!mt(B.key,k));q=se.length>0?se:L.filter(B=>!w.has(`${B.key}::${k}`))}if(q.length===0){if(C<f.length)continue;break}let N=q.slice(0,v(b));if(N.length===0)break;let z=y(k,b),F=N.map(K=>(w.add(`${K.key}::${k}`),{model:k,key:K.key,label:K.label||"Chave",timeout:z})),O=b===0?"Onda 1":`Onda ${b+1}`,U=await T(O,F);if(U){let K=U.plan.durationMs||Date.now()-d,se=ne.maskKey(U.usedKey);return o?.(`\u2705 ${K}ms via '${U.usedModel}' (${U.slotLabel}: ${se})`,"info"),U}b++}throw new Error(S||"Todas as tentativas falharam. Verifique suas chaves de API e cotas.")}var ue=['input:not([type="hidden"])',"textarea","select","button","a","label",'[role="button"]','[role="link"]','[role="radio"]','[role="checkbox"]','[role="option"]','[role="treeitem"]','[role="menuitemcheckbox"]','[role="menuitemradio"]','[contenteditable="true"]','[draggable="true"]',"[aria-grabbed]","[aria-dropeffect]","[data-widget-type]",".perseus-drag-item",".sortable-item",'[data-testid*="drag" i]','[data-testid*="card" i]','[data-testid*="option" i]','[data-testid*="choice" i]','[data-testid*="category" i]',"[data-choice]","[data-option]","[data-answer]","[data-value]",".quiz-option",".option-card",".choice-card",'[class*="option-card" i]','[class*="choice-card" i]','[class*="option-item" i]','[class*="choice-item" i]','[class*="answer-item" i]','[class*="alternative" i]','li[class*="choice" i]','li[class*="option" i]','li[class*="answer" i]','[data-role="dropzone"]',"[data-category]","[data-item-id]","[data-params][jsmodel]",'[class*="draggable-item" i]','[class*="drag-item" i]','[class*="sortable-card" i]','[class*="card-option" i]','[class*="tile" i][class*="option" i]'].join(","),be=/(verificar|checar|check|conferir|validar|próxim[oa]|next|continuar|continue|avançar|prosseguir|enviar|submit|concluir|finalizar|terminar|começar|iniciar|start|vamos lá|próxima tarefa|next task|próxima pergunta|next question|marcar como concluíd[oa]|mostrar resumo|entendi|compreendi|ok|leitura concluída|seguir|ir para o exercício|fazer o teste|próximo artigo|ir para a aula)/i,ie=/(\banterior\b|\bvoltar\b|\bback\b|\bprev\b|\bprevious\b|recomeçar|\brestart\b|\breplay\b|\bretornar\b)/i,Qt=0;function je(t){try{let e=t.closest('[hidden], [style*="display: none"], [style*="display:none"], [aria-hidden="true"]');if(e&&!pe(e))return!1}catch{}try{let e=window.getComputedStyle?window.getComputedStyle(t):t.style;if(e&&(e.display==="none"||e.visibility==="hidden"))return!1}catch{}try{if(typeof t.getBoundingClientRect=="function"){let e=t.getBoundingClientRect();if(e.width>0||e.height>0)return!0}}catch{}return(t.textContent||"").trim().length>0}function P(t){try{if(typeof CSS<"u"&&typeof CSS.escape=="function")return CSS.escape(t)}catch{}return String(t).replace(/["\\]/g,"\\$&")}function A(t){let e=t;if(!e||typeof e.isConnected=="boolean"&&!e.isConnected||pe(e))return!1;let n=e.tagName?.toLowerCase();if(["input","select","textarea","button"].includes(n)){let o=e.type?.toLowerCase();if(o==="checkbox"||o==="radio"){if(e.id)try{let a=e.ownerDocument?.querySelector(`label[for="${P(e.id)}"]`);if(a&&je(a))return!0}catch{}let i=e.closest('label, .option-card, .quiz-option, .choice, .answer, [role="radio"], [role="checkbox"], [class*="option" i], [class*="choice" i], [class*="item" i], li, tr');if(i&&i!==e&&je(i))return!0}try{if(!e.closest('[hidden], [style*="display: none"], [style*="display:none"], [aria-hidden="true"]')){let a=window.getComputedStyle?window.getComputedStyle(e):e.style;if(!a||a.display!=="none"&&a.visibility!=="hidden"){if(typeof e.getBoundingClientRect=="function"){let s=e.getBoundingClientRect();if(s.width>0||s.height>0)return!0}return!0}}}catch{}}return je(e)}function Yt(t){if(t==null)return"";if(typeof t=="string")return t;if(typeof t=="number"||typeof t=="boolean")return String(t);if(t instanceof Node)return t.textContent||"";try{if(typeof t?.toString=="function"){let e=t.toString();if(typeof e=="string")return e}}catch{}return""}function H(t,e=500){return Yt(t).replace(/\s+/g," ").trim().slice(0,e)}function Xt(t){let e=t.dataset.easyquizId;if(e)return e;let n=`eq-${Date.now().toString(36)}-${(Qt+=1).toString(36)}`;return t.dataset.easyquizId=n,n}function pe(t){return t?!!(t.closest('#easyquiz-shadow-root, .eq-sidebar, .eq-launcher, [data-easyquiz-ignore="true"], .btn-inject-eq, #btn-inject-script')||t.getAttribute?.("data-easyquiz-ignore")==="true"):!1}var he=/(leaderboard|scoreboard|placar|ranking|trophy|pause|pausar|mute|mutar|audio|sound|som|música|music|configuraç|settings|theme|ajuda|help|report|denunciar|feedback|power-?up|streak|coins|fullscreen|full-screen|read-?aloud|audio-?player|(?:audio|sound|som|media)[-_ ]*volume|volume[-_ ]*(?:slider|control|level|btn|button|icon|mute)|vol-slider)/i;function R(t){if(!t||typeof t.getAttribute!="function"||typeof Element<"u"&&!(t instanceof Element))return!1;if(pe(t))return!0;let e=t.tagName?.toLowerCase();if(["select","textarea"].includes(e)||e==="input"&&!["button","submit","reset"].includes((t.type||"").toLowerCase()))return!1;let o=t.closest?.('button, a, [role="button"], [class*="leaderboard" i], [data-testid*="leaderboard" i], [class*="scoreboard" i], [class*="trophy" i]')||t,i=String(o.getAttribute?.("data-testid")||o.getAttribute?.("data-test-id")||o.getAttribute?.("id")||""),a=String(o.getAttribute?.("aria-label")||""),s=String(o.getAttribute?.("title")||""),c=typeof o.className=="string"?o.className:typeof o.className?.baseVal=="string"?o.className.baseVal:"",r=H(o.textContent,60);return!!(he.test(i)||he.test(a)||he.test(s)||he.test(c)||r.length>0&&r.length<=25&&he.test(r))}function X(t){if(!t||typeof t.getAttribute!="function"||typeof Element<"u"&&!(t instanceof Element)||pe(t)||R(t)||t.closest?.('.option-card, .choice-card, .quiz-option, [class*="option-card" i], [class*="choice-card" i], [class*="option-item" i], [class*="choice-item" i], [class*="answer-item" i], [data-testid*="option" i], [data-testid*="choice" i], [data-choice], [data-option], [data-answer], [role="radio"], [role="checkbox"], [role="option"]')||t.closest?.("header, nav, aside"))return!1;let e=typeof HTMLInputElement<"u"&&t instanceof HTMLInputElement||typeof HTMLButtonElement<"u"&&t instanceof HTMLButtonElement?t.value:"",n=H(t.getAttribute?.("aria-label")||t.textContent||t.getAttribute?.("value")||e),o=t.type,i=n.replace(/[\d\(\)\[\]\u2192>\u2022\-\/\\]+/g," ").trim(),a=String(t.getAttribute?.("data-testid")||t.getAttribute?.("data-test-id")||t.getAttribute?.("id")||t.getAttribute?.("href")||"").toLowerCase();return ie.test(i)||ie.test(n)?!1:be.test(i)||be.test(n)||a.includes("next")||a.includes("check")||a.includes("continue")||a.includes("proximo")||a.includes("forward")?!0:/^\d{1,3}$/.test(n.trim())?!!t.closest?.('[class*="pagination" i], [class*="pager" i], [class*="page-nav" i], [class*="step-indicator" i], [class*="breadcrumb" i], [aria-label*="p\xE1gina" i], [aria-label*="page" i], [role="navigation"], nav, [class*="steps" i]'):!1}function Ve(t){let e=t.closest("tr");if(e){let r=e.querySelector("th, td:first-child"),l=r&&r!==t.closest("td")?H(r.textContent,100):"",d=H(t.closest("label, td")?.textContent||"",50);if(l&&d)return`${l}: ${d}`}let n=t.closest('.dropdown-row, [class*="dropdown-row" i], [class*="select-row" i]');if(n){let r=n.querySelector('.dropdown-label, [class*="label" i]'),l=r&&r!==t?H(r.textContent,150):"";if(l)return l}let o=t.getAttribute("aria-label");if(o)return H(o);let i=t.getAttribute("aria-labelledby");if(i){let r=i.split(/\s+/).map(l=>document.getElementById(l)?.textContent).filter(Boolean).join(" ");if(r.trim())return H(r)}if("labels"in t&&t.labels){let r=Array.from(t.labels??[]).map(l=>l.textContent).join(" ");if(r.trim())return H(r)}let a=t.closest('.docssharedWizToggleLabeledContainer, [role="listitem"], .answer, label, .quiz-option, .form-check, .option-card');if(a&&a!==t){let r=H(a.textContent);if(r)return r}let s=t instanceof HTMLInputElement||t instanceof HTMLButtonElement?t.value:"",c=t.getAttribute("placeholder")||t.getAttribute("title")||t.textContent||s||"";return H(c)}function Ke(t,e){let o=typeof HTMLSelectElement<"u"&&t instanceof HTMLSelectElement||t.tagName.toLowerCase()==="select"?t:null,i=t;t.dataset.easyquizRole=e;let a=t.tagName.toLowerCase(),s=["input","textarea","select","button"].includes(a)?a:"other",c=t.getAttribute("role")||"",r=(t.getAttribute("data-testid")||t.getAttribute("data-test-id")||"").toLowerCase(),l=(t.className&&typeof t.className=="string"?t.className:"").toLowerCase(),d=t.getAttribute("draggable")==="true"||t.classList.contains("perseus-drag-item")||t.classList.contains("sortable-item")||l.includes("cursor-grab")||!!t.getAttribute("aria-grabbed")||/drag|card|option|item/i.test(r)||/drag|card-item|sortable/i.test(l),g=t.getAttribute("data-role")==="dropzone"||t.classList.contains("category-container")||t.hasAttribute("data-category")||!!t.getAttribute("aria-dropeffect")||/drop|category|bucket/i.test(r)||/dropzone|category-box|bucket|target-zone/i.test(l),p=H((d?"draggable":g?"dropzone":"")||i.type||c||s,40),m="";if(i.type==="checkbox"||i.type==="radio"||c==="radio"||c==="checkbox"){let y=i.checked||t.getAttribute("aria-checked")==="true",T=i.value&&i.value!=="on"?i.value:t.getAttribute("data-value")||"";m=y?T?`checked:${T}`:"checked":T||"unchecked"}else if(s==="button"||a==="a"||e==="navigation"||X(t))m="";else{let y=typeof t.value=="string"||typeof t.value=="number"?t.value:"";m=H(y||t.getAttribute("data-category")||"",2e3)}let f=[];if(o&&o.options)for(let y of Array.from(o.options).slice(0,80))f.push({value:H(y.value),label:H(y.textContent)});else if(c==="combobox"||c==="listbox"||l.includes("select")||l.includes("dropdown")){let y=t.getAttribute("aria-controls")||t.getAttribute("aria-owns"),T=y?document.getElementById(y):t;if(T){let $=T.querySelectorAll('[role="option"], li, .dropdown-item, .option');for(let D of Array.from($).slice(0,80)){let b=H(D.textContent);b&&f.push({value:D.getAttribute("data-value")||D.getAttribute("value")||b,label:b})}}}let h=!!(i.required||t.getAttribute("aria-required")==="true"),_=!!(i.disabled||t.getAttribute("aria-disabled")==="true"),v=Xt(t);return{id:t.id||v,tag:s,type:p,label:Ve(t),name:H(i.name||t.getAttribute("name")||"",180),value:m,options:f,required:h,disabled:_,role:e}}var _t=['[data-test-id*="exercise" i]','[data-testid*="exercise" i]',".perseus-renderer",".framework-perseus",".Qr7Oae","[data-item-id]",".freebirdFormviewerViewItemsItemItem",".que",".question-holder",".quiz-question",".question_holder",".display_question",'[data-functional-selector*="question"]',".question-container",'[class*="classification-layout" i]','[class*="quiz-container" i]','[data-cy="quiz-container"]',"[data-question-id]",'[data-testid*="question" i]','[class*="question-container" i]','[class*="question" i]','[class*="pergunta" i]','[class*="categoriz" i]',"article","form","section","main"].join(",");function vt(t){if(!A(t))return-1/0;let e=t.getBoundingClientRect(),n=Array.from(t.querySelectorAll(ue)).filter(A),o=H(t.innerText||t.textContent||"",4e3).length;if(o<10||!n.length&&o<60)return-1/0;let i=Math.max(1,window.innerWidth*window.innerHeight),a=Math.max(1,e.width*e.height),s=Math.min(1,a/i),c=e.top+e.height/2,r=Math.abs(c-window.innerHeight/2)/Math.max(1,window.innerHeight),l=o>40?35:0,d=e.top>=0&&e.bottom<=window.innerHeight?25:0;return n.length*15+Math.min(60,o/20)+l+d-s*20-r*10}function Ee(t){let e=t;if(e.matches?.('article, [data-test-id*="exercise" i], [data-testid*="exercise" i], .perseus-renderer, .framework-perseus, [class*="question-container" i], .que')&&e.tagName.toLowerCase()!=="main"&&e.tagName.toLowerCase()!=="body")return e;for(;e.parentElement&&e.parentElement!==document.body&&e.parentElement!==document.documentElement;){let n=e.parentElement,o=n.tagName.toLowerCase();if(["header","footer","nav","aside"].includes(o))break;if(n.matches?.('article, [data-test-id*="exercise" i], [data-testid*="exercise" i], .perseus-renderer, .framework-perseus, [class*="question-container" i], .que')&&o!=="main"&&o!=="body"){e=n;break}let i=H(e.innerText||e.textContent||"",1e4),a=H(n.innerText||n.textContent||"",1e4),s=e.querySelectorAll(ue).length,c=n.querySelectorAll(ue).length;if(i.length<150&&a.length>i.length&&c<=s+4&&o!=="main"&&o!=="body"){e=n;continue}break}return e}function xt(t){let e=t,n=e.closest('main, [role="main"], article, form, [data-test-id*="exercise" i], [data-testid*="exercise" i], .framework-perseus, section');if(n&&n!==document.body&&A(n))return n;let o=0;for(;e.parentElement&&e.parentElement!==document.body&&o<3;)e=e.parentElement,o++;return e||document.body}function J(){let t=document.querySelector('[class*="classification-layout" i], [class*="quiz-container" i][class*="classification" i]');if(t&&A(t))return t;let e=document.activeElement;if(e&&e!==document.body){let s=e.closest(_t);if(s&&vt(s)>0)return Ee(s)}let o=Array.from(document.querySelectorAll(_t)).map(s=>({element:s,score:vt(s)})).filter(s=>Number.isFinite(s.score)).sort((s,c)=>c.score-s.score),i=o.find(s=>{let c=s.element.tagName.toLowerCase();return c!=="main"&&c!=="body"&&s.score>0});if(i)return Ee(i.element);if(o.length>0&&o[0].score>0)return Ee(o[0].element);let a=document.querySelector('form, main, [role="main"]');return a&&A(a)?a:document.body}function Et(t){let e=t.cloneNode(!0);e.querySelectorAll("script, style, iframe, object, embed, svg, canvas, noscript, audio, video").forEach(o=>o.remove());let n=["type","name","value","role","aria-label","aria-labelledby","aria-checked","aria-required","required","disabled","data-easyquiz-id","draggable","class","id","data-widget-type","data-role","data-category","data-testid"];return e.querySelectorAll("*").forEach(o=>{for(let i of Array.from(o.attributes))n.includes(i.name)||o.removeAttribute(i.name)}),e.outerHTML.replace(/\s+/g," ").slice(0,2e4)}function we(t){let e=Array.from(t.querySelectorAll(ue)),n=new Set,o=[];for(let r of e){if(!A(r)||X(r)||R(r))continue;let l=(r.value||r.textContent||"").trim();if(ie.test(l))continue;let d=r.tagName.toLowerCase();["input","textarea","select"].includes(d)&&(n.add(r),o.push(r))}for(let r of e){if(!A(r)||X(r)||R(r))continue;let l=(r.value||r.textContent||"").trim();if(ie.test(l))continue;let d=r.tagName.toLowerCase();if(["input","textarea","select"].includes(d))continue;let g=r.querySelector("input, textarea, select");if(!(g&&n.has(g))){if(r.hasAttribute("for")){let u=r.getAttribute("for"),p=u?r.ownerDocument.getElementById(u):null;if(p&&n.has(p))continue}if(d==="a"){let u=r.getAttribute("role"),p=r.getAttribute("class")||"",m=r.getAttribute("data-testid")||"",f=r.getAttribute("draggable")==="true"||r.classList.contains("perseus-drag-item")||r.classList.contains("sortable-item")||p.includes("cursor-grab")||!!r.getAttribute("aria-grabbed")||/drag|card|option|item/i.test(m)||/drag|card-item|sortable/i.test(p);if(!(u==="button"||u==="radio"||u==="checkbox"||u==="option"||f||r.closest('[class*="choice" i], [class*="option" i], [class*="answer" i], [data-testid*="option" i]')))continue}o.push(r)}}let i=o.length>0&&o.every(r=>R(r)||/read-?aloud|audio/i.test(r.getAttribute("data-testid")||r.getAttribute("aria-label")||"")),a=document.body.querySelector('[class*="classification-layout" i]')||document.body.querySelector('[class*="classification" i]')||t,s=document.body.querySelector('[class*="classification" i]')!==null||t.querySelector('[class*="classification" i]')!==null||t.querySelector('[data-cy*="quiz" i]')!==null||t.querySelector('[class*="draggable-item" i]')!==null||t.querySelector('[class*="drag-item" i]')!==null||t.querySelector('[class*="sortable-card" i]')!==null||t.matches?.('[class*="classification" i]');if((o.length===0||i)&&s){i&&(o.length=0);let r=Array.from(a.querySelectorAll('[class*="cursor-grab"][id], [draggable="true"][id], .dnd-card[id]'));if(r.length>0){for(let l of r)if(!(!A(l)||R(l))&&(o.push(l),o.length>=50))break}else{let l=Array.from(a.querySelectorAll("button, div[class], span[class], p, li"));for(let d of l){if(!A(d)||X(d)||R(d)||ie.test((d.textContent||"").trim()))continue;let g=(d.textContent||"").trim();if(g.length<2||g.length>300)continue;if(Array.from(d.children).some(p=>p.className&&p.textContent?.trim())||o.push(d),o.length>=50)break}}}let c=o.length>0&&o.every(r=>{let l=(r.textContent||"").trim();return!r.id||l.length<10||/^\d+\s*\/\s*\d+$/.test(l)||/^question text/i.test(l)});if(o.length===0||c){c&&(o.length=0);let r=Array.from(document.body.querySelectorAll('[class*="cursor-pointer"][id]'));if(r.length>0)for(let l of r){if(!A(l)||pe(l)||X(l)||R(l)||ie.test((l.textContent||"").trim()))continue;let d=(l.textContent||"").trim();if(!(d.length<10||d.length>500)&&!/^\d+\s*\/\s*\d+$/.test(d)&&(o.push(l),o.length>=20))break}}return o.slice(0,100).map(r=>Ke(r,"answer"))}function Ge(t){let e=[t,t.parentElement,t.parentElement?.parentElement,document.body].filter(Boolean),n=new Set,o=[];for(let i of e)for(let a of Array.from(i.querySelectorAll(ue)))if(!(n.has(a)||!A(a)||!X(a)||R(a))&&(n.add(a),o.push(Ke(a,"navigation")),o.length>=10))return o;return o}function wt(t=!1){let e=J();e=Ee(e),t&&(e=xt(e));let n=we(e),o=Ge(e);if(n.length===0){let c=we(document.body);c.length>0&&(e=xt(e),n=we(e),n.length===0&&(n=c,e=document.querySelector('main, article, form, [role="main"]')||document.body))}o.length===0&&(o=Ge(document.body));let i=e.innerText&&e.innerText.trim().length>0?e.innerText:e.textContent||"",a=i.length>4e4?H(i.slice(0,8e3),8e3)+`
[...conte\xFAdo extenso truncado...]
`+H(i.slice(-2e3),2e3):H(i,16e3),s=[...n,...o].slice(0,120);return!a||s.length===0&&a.length<30?H(document.body.innerText||document.body.textContent||"",16e3).length>=30?We():null:{sourceUrl:window.location.href.slice(0,2e3),pageTitle:document.title.slice(0,500)||"P\xE1gina de Quest\xE3o",questionText:a,htmlSnippet:Et(e),controls:s,scope:e}}function We(){let t=document.body.innerText||document.body.textContent||document.documentElement.textContent||"",e=H(t,16e3),n=we(document.body),o=Ge(document.body),i=[...n,...o].slice(0,120),a=document.querySelector('main, article, form, [role="main"], [data-test-id*="content" i], [class*="content" i]')||document.body;return{sourceUrl:window.location.href.slice(0,2e3),pageTitle:document.title.slice(0,500)||"P\xE1gina de Quest\xE3o",questionText:e,htmlSnippet:Et(a).slice(0,15e3),controls:i,scope:a}}var Qe=10,Ye=1400,ye=15e5;function re(t){return new Promise((e,n)=>{let o=new FileReader;o.onerror=()=>n(new Error("Falha ao converter blob para base64.")),o.onload=()=>{let i=String(o.result||"");e(i.split(",")[1]||"")},o.readAsDataURL(t)})}async function le(t){let e=0,n=0;if(t instanceof HTMLImageElement?(e=t.naturalWidth||t.width,n=t.naturalHeight||t.height):(e=t.width,n=t.height),e<=0||n<=0)throw new Error("Dimens\xF5es inv\xE1lidas.");let o=Math.min(1,Ye/Math.max(e,n)),i=Math.max(1,Math.round(e*o)),a=Math.max(1,Math.round(n*o)),s=document.createElement("canvas");s.width=i,s.height=a;let c=s.getContext("2d",{alpha:!1});if(!c)throw new Error("Sem suporte a Canvas 2D.");return c.fillStyle="#ffffff",c.fillRect(0,0,i,a),c.drawImage(t,0,0,i,a),new Promise((r,l)=>{s.toBlob(d=>d?r(d):l(new Error("Falha na compress\xE3o.")),"image/jpeg",.88)})}async function Jt(t){let e=typeof t.getBoundingClientRect=="function"?t.getBoundingClientRect():{width:0,height:0},n=e.width||parseFloat(t.getAttribute("width")||"0")||parseFloat(t.style.width||"0")||400,o=e.height||parseFloat(t.getAttribute("height")||"0")||parseFloat(t.style.height||"0")||300,i=2,a=Math.min(1800,Math.max(120,Math.round(n*i))),s=Math.min(1800,Math.max(100,Math.round(o*i))),c=t.cloneNode(!0);c.getAttribute("xmlns")||c.setAttribute("xmlns","http://www.w3.org/2000/svg"),c.getAttribute("xmlns:xlink")||c.setAttribute("xmlns:xlink","http://www.w3.org/1999/xlink"),c.setAttribute("width",String(a)),c.setAttribute("height",String(s)),!c.getAttribute("viewBox")&&n>0&&o>0&&c.setAttribute("viewBox",`0 0 ${n} ${o}`);let r="#ffffff";try{let f=t.parentElement||t;for(;f&&f!==document.documentElement;){let _=(window.getComputedStyle?window.getComputedStyle(f):null)?.backgroundColor;if(_&&_!=="transparent"&&_!=="rgba(0, 0, 0, 0)"){r=_;break}f=f.parentElement}}catch{}let d=new XMLSerializer().serializeToString(c),g=f=>new Promise((h,_)=>{let v=new Image;v.onload=()=>h(v),v.onerror=()=>_(new Error("Falha ao renderizar SVG em Image.")),v.src=f}),u=null,p=new Blob([d],{type:"image/svg+xml;charset=utf-8"}),m=URL.createObjectURL(p);try{try{u=await g(m)}catch{let _=`data:image/svg+xml;charset=utf-8,${encodeURIComponent(d)}`;u=await g(_)}let f=document.createElement("canvas");f.width=a,f.height=s;let h=f.getContext("2d",{alpha:!1});if(!h)throw new Error("Sem suporte a Canvas 2D.");return h.fillStyle=r,h.fillRect(0,0,a,s),h.drawImage(u,0,0,a,s),new Promise((_,v)=>{f.toBlob(w=>w?_(w):v(new Error("Falha na compress\xE3o do SVG.")),"image/jpeg",.92)})}finally{URL.revokeObjectURL(m)}}async function Xe(t){try{let e=t.cloneNode(!0),n=t.offsetWidth||500,o=t.offsetHeight||500,i=`
      <svg xmlns="http://www.w3.org/2000/svg" width="${n}" height="${o}">
        <foreignObject width="100%" height="100%">
          <div xmlns="http://www.w3.org/1999/xhtml" style="background:#fff;font-family:sans-serif;">
            ${e.innerHTML}
          </div>
        </foreignObject>
      </svg>
    `,a=new Blob([i],{type:"image/svg+xml;charset=utf-8"}),s=URL.createObjectURL(a);try{let c=new Image;await new Promise((d,g)=>{c.onload=()=>d(),c.onerror=()=>g(new Error("Falha ao renderizar ForeignObject.")),c.src=s});let r=await le(c),l=await re(r);if(l&&l.length<=ye)return{mediaType:"image/jpeg",base64:l,alt:"Captura via rasteriza\xE7\xE3o DOM",source:"rasterized",captureStatus:"captured"}}finally{URL.revokeObjectURL(s)}}catch(e){console.warn("[EasyQuiz] Falha na rasteriza\xE7\xE3o do n\xF3:",e)}return null}function St(t,e,n,o){if(n<=0||o<=0){let u=typeof t.getBoundingClientRect=="function"?t.getBoundingClientRect():{width:0,height:0};if(n=u.width||n,o=u.height||o,n<=0||o<=0){if(e&&/\b(icon|logo|avatar|badge|emoji|spinner|loading)\b/i.test(e))return!1;let m=t instanceof HTMLImageElement&&t.src||"";return m&&/\/icons?\/|\/logos?\/|\/avatars?\/|\/badges?\//i.test(m)?!1:!!(m||e)}}if(n<48||o<48||Math.max(n,o)/Math.max(1,Math.min(n,o))>15)return!1;let a=t.getAttribute("class")||"",s=t.getAttribute("aria-hidden"),c=t.getAttribute("role"),r=t instanceof HTMLImageElement&&t.src||"";if(s==="true"||c==="presentation"||c==="none")return!1;let l=/\b(icon|logo|avatar|badge|emoji|decoration|ornament|spinner|loading|thumbnail|profile|photo)\b/i;if(l.test(a)||e&&l.test(e)||r&&/\/icons?\/|\/logos?\/|\/avatars?\/|\/badges?\/|\/emojis?\//i.test(r)||e===""||e===" "||e==="-")return!1;let d=/\b(graph|chart|diagram|table|map|formula|equation|figure|plot|curve|histogram|scatter|matrix|image|foto|imagem|gráfico|tabela|mapa|fórmula|questão|enunciado|stimulus)\b/i;return d.test(e)||d.test(a)||t.closest('[data-question], [class*="question" i], [class*="prompt" i], [class*="stimulus" i], [class*="enunciado" i], [class*="statement" i], article, .problem, .exercise')?!0:n>=80&&o>=80}function Tt(t){let e=[],n=t.getAttribute("alt")||t.getAttribute("aria-label")||t.getAttribute("title")||"";n&&n.length>2&&e.push(`Alt: "${n}"`);let a=t.closest("figure")?.querySelector("figcaption")?.textContent?.trim();a&&a.length>2&&e.push(`Legenda: "${a}"`);let s=t.getAttribute("aria-describedby");if(s){let d=document.getElementById(s)?.textContent?.trim();d&&e.push(`Descri\xE7\xE3o: "${d.slice(0,200)}"`)}let c=t.parentElement;if(c){let l=H(c.textContent||"",300);l&&l.length>5&&l!==n&&e.push(`Contexto: "${l.slice(0,200)}"`)}if(t.tagName.toLowerCase()==="svg"){let l=Array.from(t.querySelectorAll("text, tspan")).map(d=>d.textContent?.trim()).filter(Boolean);l.length>0&&e.push(`R\xF3tulos/Textos do Gr\xE1fico: "${l.join(" | ")}"`)}let r=t.getAttribute("data-alt")||t.getAttribute("data-description")||"";return r&&e.push(`Data: "${r}"`),e.length===0?"":e.join(" | ")}async function Zt(t){let e=t.currentSrc||t.src;if(!e)return null;let n=(t.alt||t.getAttribute("aria-label")||"Imagem da quest\xE3o").slice(0,500);if(t.complete&&t.naturalWidth>0)try{let s=await le(t),c=await re(s);if(c&&c.length<=ye)return{mediaType:"image/jpeg",base64:c,alt:n,source:e.slice(0,2e3),captureStatus:"captured"}}catch{}try{let s=await fetch(e,{mode:"cors"});if(s.ok){let c=await s.blob();if(c.type.startsWith("image/")){let r=await createImageBitmap(c),l=await le(r);r.close();let d=await re(l);if(d&&d.length<=ye)return{mediaType:"image/jpeg",base64:d,alt:n,source:e.slice(0,2e3),captureStatus:"captured"}}}}catch{}if(!e.startsWith("data:"))try{let c=await(await fetch(e,{mode:"no-cors"})).blob();if(c.size>100)try{let r=await createImageBitmap(c),l=await le(r);r.close();let d=await re(l);if(d&&d.length>100&&d.length<=ye)return{mediaType:"image/jpeg",base64:d,alt:n,source:e.slice(0,2e3),captureStatus:"captured"}}catch{}}catch{}let o=t.parentElement||t,i=await Xe(o);if(i)return i;try{if(t.complete&&t.naturalWidth>0&&typeof HTMLCanvasElement.prototype.captureStream=="function"){let s=document.createElement("canvas");s.width=Math.min(t.naturalWidth,Ye),s.height=Math.min(t.naturalHeight,Ye);let c=s.getContext("2d");if(c){c.drawImage(t,0,0,s.width,s.height);let r=s.toDataURL("image/jpeg",.88).split(",")[1];if(r&&r.length>100&&r.length<=ye)return{mediaType:"image/jpeg",base64:r,alt:n,source:e.slice(0,2e3),captureStatus:"captured"}}}}catch{}let a=Tt(t);return a||n?{mediaType:"image/jpeg",base64:"",alt:n,source:e.slice(0,2e3),captureStatus:"text_only",textContext:a||`Imagem sem descri\xE7\xE3o textual dispon\xEDvel (src: ${e.slice(0,100)})`}:null}function en(t){return t.querySelectorAll("path, line, polyline, polygon, circle, rect, text, image").length>0}function tn(t){try{let e=t.style.backgroundImage||(window.getComputedStyle?window.getComputedStyle(t).backgroundImage:"");if(e&&e.includes("url(")){let n=e.match(/url\(["']?([^"')]+)["']?\)/);if(n&&n[1]&&!n[1].startsWith("data:image/svg+xml"))return n[1]}}catch{}return null}function nn(t,e){let n=t.closest('[data-easyquiz-id], button, [role="button"], [role="radio"], [role="checkbox"], [role="option"], label, .option-card, .quiz-option, .choice, .answer, [class*="option" i], [class*="choice" i], [class*="answer" i], li, tr');if(n&&n!==e&&A(n)&&!X(n)&&!R(n)){let a=n.dataset.easyquizId||n.id||void 0,s=H(n.innerText||n.textContent||"",120),c=n.getAttribute("aria-label")||n.getAttribute("title")||"",r=s||c,l=a?` [id: ${a}]`:"";if(r)return{associatedLabel:`Alternativa/Op\xE7\xE3o: "${r}"${l}`,targetControlId:a};if(a)return{associatedLabel:`Alternativa/Op\xE7\xE3o ${l}`,targetControlId:a}}let o=t.closest("figure")?.querySelector("figcaption")?.textContent?.trim();if(o)return{associatedLabel:`Figura do Enunciado: "${H(o,100)}"`};let i=t.closest('[class*="prompt" i], [class*="stimulus" i], [class*="question-text" i], [class*="statement" i], header, h1, h2, h3, h4, p');if(i){let a=H(i.textContent||"",80);if(a)return{associatedLabel:`Gr\xE1fico do Enunciado: "${a}"`}}return{associatedLabel:"Gr\xE1fico/Imagem do Enunciado Principal"}}async function At(t,e=!0){if(!e)return[];let n=[],o=0,i=35e5,a=(r,l)=>{if(!r)return!1;let d=r.base64?r.base64.length:0;if(d>0&&o+d>i)return!1;let g=nn(l,t);return r.associatedLabel=g.associatedLabel,r.targetControlId=g.targetControlId,r.element=l,n.push(r),o+=d,n.filter(p=>p.captureStatus==="captured").length>=Qe},s=Array.from(t.querySelectorAll("img")).filter(r=>A(r)&&!R(r));for(let r of s)try{let l=r.getBoundingClientRect(),d=r.naturalWidth||l.width||r.width||0,g=r.naturalHeight||l.height||r.height||0,u=r.alt||"";if(!St(r,u,d,g))continue;let p=await Zt(r);if(a(p,r))return n}catch{}let c=Array.from(t.querySelectorAll("svg")).filter(r=>{if(!A(r)||R(r))return!1;let l=typeof r.getBoundingClientRect=="function"?r.getBoundingClientRect():{width:0,height:0},d=l.width||parseFloat(r.getAttribute("width")||"0"),g=l.height||parseFloat(r.getAttribute("height")||"0");return d<30||g<30?!1:en(r)});for(let r of c)try{let l=await Jt(r),d=await re(l);if(d){let g={mediaType:"image/jpeg",base64:d,alt:r.getAttribute("aria-label")||"Gr\xE1fico/Diagrama vetorial da quest\xE3o",source:"svg",captureStatus:"captured"};if(a(g,r))return n}}catch{let l=await Xe(r.parentElement||r);if(l){if(a(l,r))return n}else{let d=Tt(r);if(d){let g={mediaType:"image/jpeg",base64:"",alt:r.getAttribute("aria-label")||"Gr\xE1fico vetorial",source:"svg",captureStatus:"text_only",textContext:d};a(g,r)}}}if(n.filter(r=>r.captureStatus==="captured").length<Qe){let r=Array.from(t.querySelectorAll("canvas")).filter(l=>A(l)&&!R(l));for(let l of r)try{let d=await le(l),g=await re(d);if(g){let u={mediaType:"image/jpeg",base64:g,alt:l.getAttribute("aria-label")||"Gr\xE1fico Canvas inline",source:"canvas",captureStatus:"captured"};if(a(u,l))return n}}catch{let d=await Xe(l.parentElement||l);if(a(d,l))return n}}if(n.filter(r=>r.captureStatus==="captured").length<Qe){let r=Array.from(t.querySelectorAll('[style*="background-image"], .option-image, .question-media')).filter(l=>A(l)&&!R(l));for(let l of r){let d=tn(l);if(!d)continue;let g=l.getBoundingClientRect();if(St(l,l.getAttribute("aria-label")||"",g.width,g.height))try{let u=await fetch(d,{mode:"cors"});if(u.ok){let p=await u.blob();if(p.type.startsWith("image/")){let m=await createImageBitmap(p),f=await le(m);m.close();let h=await re(f);if(h){let _={mediaType:"image/jpeg",base64:h,alt:"Imagem de fundo da alternativa",source:d.slice(0,2e3),captureStatus:"captured"};if(a(_,l))return n}}}}catch{try{let p=await(await fetch(d,{mode:"no-cors"})).blob();if(p.size>100){let m=await createImageBitmap(p),f=await le(m);m.close();let h=await re(f);if(h&&h.length>100){let _={mediaType:"image/jpeg",base64:h,alt:"Imagem CSS background",source:d.slice(0,2e3),captureStatus:"captured"};if(a(_,l))return n}}}catch{}}}}return n}var on=[/\bfetch\b/i,/\bXMLHttpRequest\b/i,/\bWebSocket\b/i,/\b(?:localStorage|sessionStorage|indexedDB)\b/i,/\b(?:eval|Function|AsyncFunction|GeneratorFunction)\b/i,/\bimport(?:Scripts)?\b/i,/\bnavigator\s*\.\s*credentials\b/i,/\b(?:cookie|location\s*=|history\s*\.)/i,/\bwindow\s*\[\s*['"](?:fetch|eval|Function|localStorage|sessionStorage)/i];function Je(t){let e=t?.engine||"smart",n=new Set(["dom","framework","keyboard","drag"]);return t?.autoAdvance&&n.add("navigation"),e==="javascript"&&n.add("javascript"),{engine:e,capabilities:n,maxAttemptsPerAction:e==="command"?1:2,maxActionMs:e==="command"?1500:3e3,allowJavaScript:e==="javascript",allowNavigation:!!t?.autoAdvance}}function Ze(t,e){if(t.t==="js"&&!e.allowJavaScript)throw new Error("A\xE7\xE3o JavaScript bloqueada pela engine atual. Use o motor JavaScript explicitamente.");if(t.t==="adv"&&!e.allowNavigation)throw new Error("Avan\xE7o autom\xE1tico bloqueado pela pol\xEDtica atual.")}function Ct(t){if(!t.trim())throw new Error("JavaScript recusado: c\xF3digo vazio.");if(t.length>8e3)throw new Error("JavaScript recusado: c\xF3digo acima do limite operacional.");if(on.find(n=>n.test(t)))throw new Error("JavaScript recusado: acesso externo, persist\xEAncia ou avalia\xE7\xE3o din\xE2mica n\xE3o permitidos.");if(!/^\s*(?:\/\/[^\n]*\n|\/\*[\s\S]*?\*\/|[\s\S])*\$eq\./.test(t)&&!t.includes("$eq."))throw new Error("JavaScript recusado: use somente a API declarativa $eq.")}function I(t){return t?!!(t.closest('#easyquiz-shadow-root, .eq-sidebar, .eq-launcher, [data-easyquiz-ignore="true"], .btn-inject-eq, #btn-inject-script')||t.getAttribute?.("data-easyquiz-ignore")==="true"):!1}function E(t){return t==null?"":(typeof t=="string"?t:String(t)).replace(/^(\([0-9a-zA-Z]{1,2}\)|[0-9]{1,3}|[a-zA-Z])[\.\)\-\:]\s+/,"").replace(/[\.\u2026]{2,}/g," ").replace(/['"“”«»]/g,"").replace(/\s+/g," ").trim()}function j(t){if(!t||t instanceof HTMLInputElement||t instanceof HTMLSelectElement||t instanceof HTMLTextAreaElement||t.getAttribute("draggable")==="true"||t.classList.contains("dnd-card")||t.hasAttribute("data-category")||t.hasAttribute("data-dropzone"))return t;if(t.hasAttribute("for")){let o=t.getAttribute("for");if(o){let i=t.ownerDocument.getElementById(o);if(i)return i}}let e=t.closest('label, .option-card, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, td, li, .dnd-card, [class*="option-card" i], [class*="choice-card" i], .dropdown-row, [class*="dropdown" i], [class*="select-row" i]');if(e&&!["article","section","main","form","body"].includes(e.tagName.toLowerCase())){let o=e.getAttribute("for"),a=(o?e.ownerDocument.getElementById(o):null)||e.querySelector('input:not([type="hidden"]), select, textarea');return a||e}let n=t.closest('button, a, [role="button"], [draggable="true"]');if(n)return n;if(["body","html","main","section","article","form"].includes(t.tagName.toLowerCase())){let o=t.querySelector('button, [role="button"], a, input:not([type="hidden"]), select, textarea, [role="radio"], [role="checkbox"], .option-card, label');if(o)return j(o)}return t}function kt(t){let e=t;if(!e||!document.contains(e))try{e=J()}catch{}e=e||document.body;let n=i=>{let a=Array.from(i.querySelectorAll("tr")).filter(d=>A(d)&&d.querySelector('input[type="radio"], input[type="checkbox"]'));if(a.length>1)return a;let s=Array.from(i.querySelectorAll('input[type="checkbox"], input[type="radio"], [role="checkbox"], [role="radio"]')).filter(d=>A(d)&&!I(d));if(s.length>0)return s;let r=Array.from(i.querySelectorAll('.option-card, [role="option"], [class*="choice-card" i], [class*="option-card" i], li[class*="choice" i], li[class*="option" i]')).filter(d=>A(d)&&!I(d)).filter(d=>!d.parentElement?.closest('.option-card, [role="option"], [class*="choice-card" i], [class*="option-card" i]'));return r.length>0?r:Array.from(i.querySelectorAll('[class*="classification" i] [class], [class*="draggable-item" i], [class*="drag-item" i], [class*="sortable-card" i]')).filter(d=>{let g=d;return A(g)&&!I(g)&&(g.textContent||"").trim().length>2&&!X(g)&&!R(g)&&!g.querySelector("[class]")})},o=n(e);return o.length>0?o:e!==document.body?n(document.body):[]}function M(t,e,n=!1){if(t==null)return null;let i=(typeof t=="string"?t:String(t)).trim().replace(/^["'“”«»]+|["'“”«»]+$/g,"");if(!i)return null;let a=P(i),s=document.querySelector(`[data-easyquiz-id="${a}"]`);if(s&&!I(s))return j(s);try{let u=document.getElementById(i);if(u&&A(u)&&!I(u))return u.hasAttribute("data-category")||u.hasAttribute("data-dropzone")||u.classList.contains("dnd-zone")?u:j(u)}catch{}try{let u=document.querySelector(`[data-item-id="${a}"]`);if(u&&A(u)&&!I(u))return j(u)}catch{}let c=i.match(/^(?:item|opção|opcao|afirmação|afirmacao|alternativa|linha|afirmativa|questão|questao|campo|blank|lacuna|input|resposta)?\s*#?_?([0-9]+)$/i);if(c){let u=parseInt(c[1],10);if(n){let m=document.body;try{m=J()||document.body}catch{}let f=Array.from(m.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, select, [contenteditable="true"]')).filter(h=>A(h)&&!I(h));if(u>=1&&u-1<f.length)return f[u-1];if(u===0&&f.length>0)return f[0]}let p=u-1;if(p>=0){let m=kt();if(p<m.length){let _=m[p];if(_.tagName.toLowerCase()==="tr"){if(e){let w=_.querySelector(`input[value="${P(e)}" i], [data-value="${P(e)}" i]`);if(w)return w}let v=_.querySelector("input");if(v)return v}return j(_)}let f=document.body;try{f=J()||document.body}catch{}let h=Array.from(f.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, select, [contenteditable="true"]')).filter(_=>A(_)&&!I(_));if(p<h.length)return h[p]}}let r=i.match(/^(?:item|opção|opcao|afirmação|afirmacao|alternativa|linha|afirmativa|questão|questao)?\s*#?([a-eA-E])$/i);if(r){let u=r[1].toUpperCase().charCodeAt(0)-65;if(u>=0){let p=kt();if(u<p.length){let m=p[u];if(m.tagName.toLowerCase()==="tr"){if(e){let h=m.querySelector(`input[value="${P(e)}" i], [data-value="${P(e)}" i]`);if(h)return h}let f=m.querySelector("input");if(f)return f}return j(m)}}}if(/^[a-zA-Z0-9_-]{1,10}$/.test(i)){let p=Array.from(document.querySelectorAll(`[data-category="${a}" i], [data-dropzone="${a}" i], [data-role="dropzone"][data-category="${a}" i]`)).find(_=>A(_)&&!I(_));if(p)return p;let f=Array.from(document.querySelectorAll(`input[value="${a}" i], [data-value="${a}" i], input[id="${a}" i], input[placeholder="${a}" i], textarea[placeholder="${a}" i], [title="${a}" i]`)).find(_=>A(_)&&!I(_));if(f)return j(f);let h=Array.from(document.querySelectorAll('.option-badge, [class*="badge" i], [class*="letter" i], .option-card span, label span')).find(_=>{if(!A(_)||I(_))return!1;let v=E(_.textContent).toLowerCase();return v===i.toLowerCase()||v===i.toLowerCase()+")"});if(h)return j(h)}try{let u=Array.from(document.querySelectorAll(`[name="${a}"], [value="${a}"], [placeholder="${a}" i], [title="${a}" i], [data-category="${a}" i], [data-dropzone="${a}" i], [data-testid="${a}" i], [data-test-id="${a}" i], [aria-label="${a}" i]`));if(e){let m=u.find(f=>{if(!A(f)||I(f))return!1;if(f instanceof HTMLInputElement&&f.value.toLowerCase()===e.toLowerCase())return!0;let h=f.closest("label, .vf-label, td, div");return h&&E(h.textContent).toLowerCase().includes(E(e).toLowerCase())});if(m)return j(m)}let p=u.find(m=>A(m)&&!I(m));if(p)return p.hasAttribute("data-category")||p.hasAttribute("data-dropzone")||p.classList.contains("dnd-zone")?p:j(p)}catch{}if(/^[.#\[]|\s|[>+~:]/.test(i))try{let p=Array.from(document.querySelectorAll(i)).find(m=>A(m)&&!I(m));if(p)return j(p)}catch{}try{let u=i.replace(/"/g,""),p=`//button[normalize-space(.)="${u}"] | //a[normalize-space(.)="${u}"] | //*[not(*) and normalize-space(.)="${u}"] | //*[@aria-label="${u}"] | //*[@data-category="${u}"] | //*[@data-testid="${u}"]`,m=document.evaluate(p,document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);for(let f=0;f<m.snapshotLength;f++){let h=m.snapshotItem(f);if(h&&A(h)&&!I(h)){if(["body","html"].includes(h.tagName.toLowerCase())){let v=h.querySelector('button, [role="button"], a, input, [role="radio"], [role="checkbox"], label');if(v&&A(v))return j(v)}return h.closest('[data-role="dropzone"], [class*="category" i], [class*="bucket" i], [class*="column" i], [class*="drop" i]')||j(h)}}}catch{}let d=E(i).toLowerCase(),g=Array.from(document.querySelectorAll('button, a, div, span, li, p, label, input, textarea, select, [draggable="true"], [data-testid], [class*="option" i], [class*="card" i], [class*="item" i], [class*="choice" i], [class*="category" i], [class*="bucket" i]'));for(let u of g){if(!A(u)||I(u)||u.closest("header, nav, .stepper, .step-item, .progress-bar-container")||R(u)||!!(u.matches('article, section, form, main, [class*="container" i], [class*="grid" i], .dnd-pool, .dnd-zones')||u.querySelector('label, [role="radio"], [role="checkbox"], .dnd-card, [draggable="true"], .option-card, tr'))&&!u.matches(".dnd-zone, [data-category], [data-dropzone]"))continue;let m=E(u.textContent).toLowerCase(),f=E(u.getAttribute("aria-label")||"").toLowerCase(),h=E(u.getAttribute("placeholder")||"").toLowerCase(),_=E(u.getAttribute("title")||"").toLowerCase(),v=E(u.getAttribute("name")||"").toLowerCase(),w=E(u.getAttribute("data-category")||"").toLowerCase(),y=u instanceof HTMLInputElement||u instanceof HTMLButtonElement?u.value:"",T=E(y).toLowerCase(),$=m.startsWith(d+")")||m.startsWith(d+".")||m.startsWith(d+" -")||m.startsWith(d+":");if(m===d||f===d||h===d||_===d||v===d||w&&w===d||T&&T===d||$)return u.closest('[data-role="dropzone"], [class*="category" i], [class*="bucket" i], [class*="column" i], [class*="drop" i]')||j(u)}if(d.length>=3)for(let u of g){if(!A(u)||I(u)||u.closest("header, nav, .stepper, .step-item, .progress-bar-container")||R(u)||!!(u.matches('article, section, form, main, [class*="container" i], [class*="grid" i], .dnd-pool, .dnd-zones')||u.querySelector('label, [role="radio"], [role="checkbox"], .dnd-card, [draggable="true"], .option-card, tr'))&&!u.matches(".dnd-zone, [data-category], [data-dropzone]"))continue;let m=E(u.textContent).toLowerCase(),f=E(u.getAttribute("aria-label")||"").toLowerCase(),h=E(u.getAttribute("placeholder")||"").toLowerCase(),_=E(u.getAttribute("title")||"").toLowerCase(),v=E(u.getAttribute("name")||"").toLowerCase();if(m.includes(d)||f.includes(d)||h.includes(d)||_.includes(d)||v.includes(d)){if(Array.from(u.children).some($=>{let D=E($.textContent).toLowerCase();return D&&D.includes(d)}))continue;return u.closest('[data-role="dropzone"], [class*="category" i], [class*="bucket" i], [class*="column" i], [class*="drop" i]')||j(u)}let w=d.split(/\s+/).filter(Boolean);if(w.length>=3){let y=w.slice(0,Math.min(5,w.length)).join(" ");if(m.includes(y)||f.includes(y)||h.includes(y))return j(u)}}return null}function Lt(t,e){for(let n of e)t.dispatchEvent(new Event(n,{bubbles:!0,composed:!0}))}function V(t,e){if(!t)return;try{t.scrollIntoView({block:"nearest",inline:"nearest",behavior:"instant"})}catch{}try{t.focus?.()}catch{}let n=t.getBoundingClientRect(),o=e?e[0]:Math.round(n.left+Math.max(1,n.width/2)),i=e?e[1]:Math.round(n.top+Math.max(1,n.height/2)),a={bubbles:!0,cancelable:!0,composed:!0,view:window,clientX:o,clientY:i};try{t.dispatchEvent(new PointerEvent("pointerover",{...a}))}catch{}try{t.dispatchEvent(new MouseEvent("mouseover",{...a}))}catch{}try{t.dispatchEvent(new PointerEvent("pointerdown",{...a,button:0,buttons:1}))}catch{}try{t.dispatchEvent(new MouseEvent("mousedown",{...a,button:0,buttons:1}))}catch{}try{t.dispatchEvent(new PointerEvent("pointerup",{...a,button:0,buttons:0}))}catch{}try{t.dispatchEvent(new MouseEvent("mouseup",{...a,button:0,buttons:0}))}catch{}try{t.dispatchEvent(new MouseEvent("click",{...a,button:0,buttons:0}))}catch{}try{t.click()}catch{}try{let s=Object.keys(t).find(c=>c.startsWith("__reactFiber")||c.startsWith("__reactInternalInstance"));if(s){let c=t[s];for(;c;){let r=c.memoizedProps||c.pendingProps;if(r?.onClick){r.onClick({type:"click",target:t,currentTarget:t,bubbles:!0,cancelable:!0,preventDefault:()=>{},stopPropagation:()=>{}});break}c=c.return}}}catch{}try{let s=Object.keys(t).find(c=>c.startsWith("__reactProps"));if(s){let c=t[s];c?.onClick&&c.onClick({type:"click",target:t,currentTarget:t,bubbles:!0,cancelable:!0,preventDefault:()=>{},stopPropagation:()=>{}})}}catch{}try{let s=t._vei;s?.onClick&&(Array.isArray(s.onClick.value)?s.onClick.value:[s.onClick.value]).forEach(r=>{try{r({type:"click",target:t})}catch{}})}catch{}try{t.$onclick&&t.$onclick({type:"click",target:t,preventDefault:()=>{},stopPropagation:()=>{}})}catch{}try{if(!!(document.querySelector('meta[content*="google.com/forms"], form[action*="formResponse"]')||t.closest("[data-item-id], [jsmodel], [jsaction], .freebirdFormviewerComponentsQuestionBaseRoot"))){let c=t.querySelector('input[type="radio"], input[type="checkbox"]');c&&(c.focus?.(),c.click(),Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"checked")?.set?.call(c,!0),c.dispatchEvent(new Event("change",{bubbles:!0})));let r=t.closest("[jsaction]");if(r&&r!==t)try{r.dispatchEvent(new MouseEvent("click",{bubbles:!0,cancelable:!0,view:window,clientX:o,clientY:i}))}catch{}}}catch{}if(t.getAttribute("role")==="button"||t.getAttribute("tabindex")!==null)try{t.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0,cancelable:!0})),t.dispatchEvent(new KeyboardEvent("keyup",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0,cancelable:!0}))}catch{}}function Ae(t){try{let e=t.id,n=!!e;e||(e=`__eq_tmp_${Math.random().toString(36).slice(2,8)}`,t.id=e);let o=document.createElement("script");return o.textContent=`(function(){var el=document.getElementById(${JSON.stringify(e)});if(el){el.dispatchEvent(new MouseEvent('click',{bubbles:true,cancelable:true,composed:true,view:window}));if(typeof el.click==='function')el.click();var fk=Object.keys(el).find(function(k){return k.startsWith('__reactFiber')||k.startsWith('__reactInternalInstance');});if(fk){var fb=el[fk];while(fb){var mp=fb.memoizedProps||fb.pendingProps;if(mp&&typeof mp.onClick==='function'){try{mp.onClick({type:'click',target:el,currentTarget:el,bubbles:true,cancelable:true,preventDefault:function(){},stopPropagation:function(){}});}catch(e){}break;}fb=fb.return;}}var pk=Object.keys(el).find(function(k){return k.startsWith('__reactProps');});if(pk&&el[pk]&&typeof el[pk].onClick==='function'){try{el[pk].onClick({type:'click',target:el,currentTarget:el,bubbles:true,cancelable:true,preventDefault:function(){},stopPropagation:function(){}});}catch(e){}}if(el._vei&&el._vei.onClick){var h=el._vei.onClick.value;var hs=Array.isArray(h)?h:[h];hs.forEach(function(fn){try{fn({type:'click',target:el});}catch(e){}});}}})()`,document.head.appendChild(o),o.remove(),n||setTimeout(()=>{try{t.id===e&&t.removeAttribute("id")}catch{}},0),!0}catch{return!1}}function Se(t,e){let n=t;if(n.hasAttribute("for")){let l=n.getAttribute("for"),d=n.ownerDocument.getElementById(l);d&&(n=d)}if(typeof HTMLSelectElement<"u"&&n instanceof HTMLSelectElement||n.tagName?.toLowerCase()==="select"||n.getAttribute("role")==="combobox"||n.getAttribute("role")==="listbox"||n.matches?.('[role="combobox"], [role="listbox"], [class*="select" i], [class*="dropdown" i]')){Te(n,[e]);return}let i=n.querySelector('select, [role="combobox"], [role="listbox"]');if(i){Te(i,[e]);return}if(!(n instanceof HTMLInputElement)&&!(n instanceof HTMLTextAreaElement)&&!(n instanceof HTMLSelectElement)&&!n.isContentEditable){let l=n.querySelector('input:not([type="hidden"]), textarea, select, [contenteditable="true"]');if(l)n=l;else{let g=n.closest('.form-group, .field, [class*="input" i], [class*="control" i], label, tr, td, li, p, div')?.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, select, [contenteditable="true"]');if(g)n=g;else{let u=n.nextElementSibling;for(;u;){if(u instanceof HTMLInputElement&&!["hidden","button","submit","checkbox","radio"].includes(u.type)||u instanceof HTMLTextAreaElement||u instanceof HTMLElement&&u.isContentEditable){n=u;break}let p=u.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(p){n=p;break}u=u.nextElementSibling}}}}if(n instanceof HTMLButtonElement||n.tagName.toLowerCase()==="a"||n.getAttribute("role")==="button"||n instanceof HTMLInputElement&&["button","submit","reset","image"].includes(n.type)){let l=n.parentElement?.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(l)n=l;else{let d=document.body;try{d=J()||document.body}catch{}let g=d.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(g)n=g;else{console.warn("[EasyQuiz] setNativeValue: Nenhum campo de texto encontrado para receber o valor.");return}}}if(!(n instanceof HTMLInputElement)&&!(n instanceof HTMLTextAreaElement)&&!(n instanceof HTMLSelectElement)&&!n.isContentEditable){let l=document.body;try{l=J()||document.body}catch{}let d=l.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(d)n=d;else{console.warn("[EasyQuiz] setNativeValue: Nenhum campo de texto encontrado para receber o valor.");return}}if(n instanceof HTMLInputElement&&["checkbox","radio"].includes(n.type)){let l=["true","1","checked","yes","sim"].includes(e.toLowerCase())||e===n.value;oe(n,l);return}let s=String(e??""),c=s;if(n instanceof HTMLInputElement&&n.type==="number"){let l=s.replace(",",".").replace(/[^0-9.-]/g,"");l&&!isNaN(Number(l))&&(c=l)}try{n.scrollIntoView?.({block:"center",inline:"center",behavior:"instant"}),n.focus?.()}catch{}let r=!1;try{if(n instanceof HTMLInputElement||n instanceof HTMLTextAreaElement){if(n.type!=="number"&&n.type!=="range"){try{n.select?.()}catch{}r=document.execCommand?.("insertText",!1,c)||!1}}else if(n.isContentEditable){try{document.execCommand?.("selectAll",!1,void 0)}catch{}r=document.execCommand?.("insertText",!1,c)||!1}}catch{}if(n instanceof HTMLInputElement||n instanceof HTMLTextAreaElement){try{let g=n._valueTracker;g&&g.setValue(c===""?" ":"")}catch{}let l=n instanceof HTMLTextAreaElement?HTMLTextAreaElement.prototype:HTMLInputElement.prototype,d=Object.getOwnPropertyDescriptor(l,"value")?.set;d?d.call(n,c):n.value=c;try{n.dispatchEvent(new KeyboardEvent("keydown",{bubbles:!0,cancelable:!0,key:c.slice(-1)||"a"}))}catch{}try{n.dispatchEvent(new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,composed:!0,data:c,inputType:"insertText"}))}catch{}try{n.dispatchEvent(new InputEvent("input",{bubbles:!0,cancelable:!0,composed:!0,data:c,inputType:"insertText"}))}catch{n.dispatchEvent(new Event("input",{bubbles:!0,cancelable:!0,composed:!0}))}try{n.dispatchEvent(new KeyboardEvent("keyup",{bubbles:!0,cancelable:!0,key:c.slice(-1)||"a"}))}catch{}try{n.dispatchEvent(new Event("change",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}try{n.dispatchEvent(new FocusEvent("blur",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}if(n.value!==c&&!(n instanceof HTMLInputElement&&n.type==="number"&&Number(n.value)===Number(c))){n.value=c;try{d?.call(n,c)}catch{}}return}if(n.isContentEditable){if(n.textContent?.trim()!==c.trim()){n.textContent=c;try{n.innerText=c}catch{}}try{n.dispatchEvent(new InputEvent("input",{bubbles:!0,cancelable:!0,composed:!0,data:c,inputType:"insertText"}))}catch{n.dispatchEvent(new Event("input",{bubbles:!0,cancelable:!0,composed:!0}))}try{n.dispatchEvent(new Event("change",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}try{n.dispatchEvent(new FocusEvent("blur",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}return}try{"value"in n&&(n.value=c),n.dispatchEvent(new Event("input",{bubbles:!0,cancelable:!0,composed:!0})),n.dispatchEvent(new Event("change",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}}function oe(t,e){if(!t)return;let n=t.closest('label, td, .option-card, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, [class*="option" i], [class*="choice" i], li')||t,o=t instanceof HTMLInputElement&&["checkbox","radio"].includes(t.type)?t:n.querySelector('input[type="checkbox"], input[type="radio"]');!o&&n.hasAttribute("for")&&(o=n.ownerDocument.getElementById(n.getAttribute("for")));let i=t instanceof HTMLInputElement?t.closest("label")||(t.id?n.ownerDocument.getElementById(n.getAttribute("for")):null)||t:n&&A(n)?n:t;if(o){let a=o.type==="radio",s=o.type==="checkbox",c=!!o._valueTracker;if(o.checked===e){if(a&&e){n.setAttribute("aria-checked","true"),n.setAttribute("aria-selected","true"),n.classList.add("selected","active","checked");return}if(s){n.setAttribute("aria-checked",e?"true":"false"),n.setAttribute("aria-selected",e?"true":"false"),n.classList.toggle("selected",e),n.classList.toggle("active",e),n.classList.toggle("checked",e);return}}i&&i!==o&&V(i);try{o.focus?.(),o.click()}catch{}if(o.checked!==e){try{let l=o._valueTracker;l&&l.setValue(!e)}catch{}try{Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"checked")?.set?.call(o,e)}catch{}o.checked=e,Lt(o,["input","change"])}n.setAttribute("aria-checked",e?"true":"false"),n.setAttribute("aria-selected",e?"true":"false"),n.classList.toggle("selected",e),n.classList.toggle("active",e),n.classList.toggle("checked",e)}else{if((n.getAttribute("aria-checked")==="true"||n.getAttribute("aria-selected")==="true"||n.getAttribute("data-selected")==="true"||n.getAttribute("data-checked")==="true"||n.classList.contains("selected")||n.classList.contains("active")||n.classList.contains("checked"))===e&&e)return;V(i),n.setAttribute("aria-checked",e?"true":"false"),n.setAttribute("aria-selected",e?"true":"false"),n.classList.toggle("selected",e),n.classList.toggle("active",e),n.classList.toggle("checked",e)}}function Te(t,e){let n=typeof HTMLSelectElement<"u"&&t instanceof HTMLSelectElement||t.tagName?.toLowerCase()==="select"?t:t.querySelector("select");if(n){let s=e.map(l=>E(l).toLowerCase()),c=!1,r=(l,d)=>{l.selected=!0,n.selectedIndex=d;try{n.value=l.value}catch{}try{Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype,"value")?.set?.call(n,l.value)}catch{}try{let g=n._valueTracker;g&&g.setValue(l.value)}catch{}c=!0};for(let l=0;l<n.options.length;l++){let d=n.options[l],g=d.value.toLowerCase(),u=E(d.textContent).toLowerCase();if(s.some(m=>m===g||m===u)){if(r(d,l),!n.multiple)break}else n.multiple||(d.selected=!1)}if(!c)for(let l of s){let d=l.match(/^(?:item|opção|opcao|alternativa|linha|escolha|campo)?\s*#?_?([0-9]+)$/i);if(d){let g=parseInt(d[1],10),p=n.options[0]?.value===""||n.options[0]?.disabled?g:g>=1?g-1:0;if(p>=0&&p<n.options.length&&(r(n.options[p],p),!n.multiple))break}}if(!c){for(let l of s)if(/^[a-z]$/i.test(l)){let d=l.toUpperCase().charCodeAt(0)-65,u=n.options[0]?.value===""||n.options[0]?.disabled?d+1:d;if(u>=0&&u<n.options.length&&(r(n.options[u],u),!n.multiple))break}}if(!c){let l=d=>d.normalize("NFD").replace(/[\u0300-\u036f]/g,"");for(let d=0;d<n.options.length;d++){let g=n.options[d],u=l(g.value.toLowerCase()),p=l(E(g.textContent).toLowerCase());if(s.some(f=>{let h=l(f);return u.includes(h)||p.includes(h)||h.length>2&&(h.includes(u)||h.includes(p))})&&(r(g,d),!n.multiple))break}}if(c){Lt(n,["focus","input","change","blur"]);return}}let o=t.matches?.('[role="combobox"], [role="listbox"], [class*="select" i], [class*="dropdown" i]')?t:t.closest('[role="combobox"], [role="listbox"], [class*="select" i], [class*="dropdown" i]');o&&V(o);let i=e.map(s=>E(s).toLowerCase()),a=Array.from(document.querySelectorAll('[role="listbox"] [role="option"], [role="menu"] [role="menuitem"], .select-dropdown li, .dropdown-menu .dropdown-item, .ant-select-item-option, .MuiMenuItem-root, [class*="option-item"], li[data-value]')).filter(s=>A(s)&&!I(s));for(let s of i){let c=a.find(l=>{let d=E(l.textContent).toLowerCase(),g=E(l.getAttribute("data-value")||l.getAttribute("value")||"").toLowerCase();return d===s||g===s||d.includes(s)||s.length>2&&s.includes(d)});if(c){V(c);let l=c.querySelector('input[type="radio"], input[type="checkbox"]');l&&oe(l,!0);return}let r=M(s);if(r){V(r);return}}}function an(t,e){try{let n=new DataTransfer;try{n.setData("text/plain",t)}catch{}try{n.setData("text/html",e)}catch{}return n}catch{return null}}function et(t){try{t.click()}catch{let e=t.ownerDocument.defaultView||window;t.dispatchEvent(new e.MouseEvent("click",{bubbles:!0,cancelable:!0,composed:!0,view:e}))}}function rn(t,e,n){try{if(e.contains(t))return{success:!0,evidence:"origin is child of dest (DOM move confirmed)"};if(!document.body.contains(t))return{success:!0,evidence:"origin removed from DOM (consumed by framework)"};let o=e.children.length;if(n!==void 0&&o>n)return{success:!0,evidence:`dest child count increased: ${n} \u2192 ${o}`};if([t.getAttribute("data-placed")==="true",t.getAttribute("data-assigned")==="true",t.getAttribute("data-matched")==="true",t.getAttribute("aria-grabbed")==="false",/placed|dropped|assigned|matched|done|sorted|categorized/i.test(t.className||"")].some(Boolean))return{success:!0,evidence:"origin has placement indicator: class/attr"};let a=(t.textContent||"").trim().toLowerCase();return a.length>2&&Array.from(e.querySelectorAll("*")).some(r=>r!==e&&(r.textContent||"").trim().toLowerCase()===a)?{success:!0,evidence:"origin text found inside dest children (clone or DOM move)"}:e.getAttribute("data-count")&&parseInt(e.getAttribute("data-count")||"0")>0?{success:!0,evidence:"dest data-count > 0, categorization likely succeeded"}:t.getAttribute("aria-hidden")==="true"||t.style.display==="none"||t.style.visibility==="hidden"?{success:!0,evidence:"origin hidden after drop (framework confirmed placement)"}:{success:!1,evidence:"no DOM evidence of successful drag/categorization"}}catch{return{success:!1,evidence:"verification threw exception"}}}function G(t,e){let n=E(t).toLowerCase();if(!n)return null;if(e==="source"){if(/^[0-9a-f]{10,}$/.test(t.trim())){let c=document.getElementById(t.trim());if(c&&A(c)&&!I(c))return c}let s=['[class*="cursor-grab"][id]',".dnd-card",'[draggable="true"]'];for(let c of s){let l=Array.from(document.querySelectorAll(c)).find(d=>{if(!A(d)||I(d))return!1;let g=E(`${d.id} ${d.textContent||""} ${d.getAttribute("data-id")||""}`).toLowerCase();return g===n||g.includes(n)||d.id===t.trim()});if(l)return l}return null}let o=["[data-dropzone]","[data-category]",'[data-role="dropzone"]','[class*="dropzone" i]','[class*="list-group" i]','[class*="classification-group" i]'].join(","),i=Array.from(document.querySelectorAll(o)),a=i.find(s=>[s.getAttribute("data-category"),s.getAttribute("data-dropzone")].some(c=>c?.trim().toLowerCase()===n));return a&&A(a)&&!I(a)?a:i.find(s=>{if(!A(s)||I(s)||/unclassified/i.test(s.className))return!1;let c=s.querySelector('.font-bold, h1, h2, h3, h4, [class*="header" i], [class*="title" i], [class*="label" i]'),r=E(c?.textContent||s.textContent||"").toLowerCase();return r.includes("op")&&(r.includes("es")||r.includes("\xF5es"))?!1:r===n||r.startsWith(n)||r.includes(n)})||null}async function me(t,e,n=1){try{t.scrollIntoView({block:"center",inline:"center",behavior:"instant"})}catch{}let o=t.getBoundingClientRect(),i=e.getBoundingClientRect(),a=Math.round(o.left+Math.max(1,o.width/2)),s=Math.round(o.top+Math.max(1,o.height/2)),c=Math.round(i.left+Math.max(1,i.width/2)),r=Math.round(i.top+Math.max(1,i.height/2)),l=E(e.textContent).toLowerCase();if(l){let f=Array.from(t.querySelectorAll('button, [role="button"], input[type="radio"], input[type="checkbox"], option, .btn, [class*="tag" i]')).find(h=>{let _=E(h.textContent).toLowerCase(),v=h instanceof HTMLInputElement||h instanceof HTMLOptionElement?E(h.value).toLowerCase():"";return _&&(l.includes(_)||_.includes(l))||v&&(l.includes(v)||v.includes(l))});f&&(V(f),await new Promise(h=>setTimeout(h,120)))}et(t),await new Promise(m=>setTimeout(m,140)),et(e);let d=e.querySelector('[data-role="dropzone"], [class*="bucket" i], [class*="slot" i], [class*="drop" i], [class*="target" i], [class*="items" i], ul, ol');if(d&&d!==e&&et(d),await new Promise(m=>setTimeout(m,100)),!e.contains(t)&&t.matches('.dnd-card, [draggable="true"]')&&e.matches('.dnd-zone, [data-dropzone], [data-role="dropzone"]')&&e.appendChild(t),e.contains(t)&&t.matches('.dnd-card, [draggable="true"]'))return;let g={bubbles:!0,cancelable:!0,composed:!0,view:window,clientX:a,clientY:s,screenX:a,screenY:s,button:0,buttons:1};try{t.dispatchEvent(new PointerEvent("pointerdown",{...g,isPrimary:!0,pointerId:1,pointerType:"mouse",pressure:.5}))}catch{}t.dispatchEvent(new MouseEvent("mousedown",g));let u=4;for(let m=1;m<=u;m++){let f=Math.round(a+(c-a)*(m/u)),h=Math.round(s+(r-s)*(m/u)),_={...g,clientX:f,clientY:h,screenX:f,screenY:h};try{t.dispatchEvent(new PointerEvent("pointermove",{..._,isPrimary:!0,pointerId:1,pointerType:"mouse",pressure:.5}))}catch{}document.dispatchEvent(new MouseEvent("mousemove",_))}let p={bubbles:!0,cancelable:!0,composed:!0,view:window,clientX:c,clientY:r,screenX:c,screenY:r,button:0,buttons:0};try{e.dispatchEvent(new PointerEvent("pointerup",{...p,isPrimary:!0,pointerId:1,pointerType:"mouse",pressure:0}))}catch{}e.dispatchEvent(new MouseEvent("mouseup",p)),e.dispatchEvent(new MouseEvent("click",p));try{let m=an(H(t.textContent),t.outerHTML),f={...g},h={...p};m&&(f.dataTransfer=m,h.dataTransfer=m);let _=t.ownerDocument.defaultView?.DragEvent;if(!_)throw new Error("DragEvent n\xE3o dispon\xEDvel neste documento");t.dispatchEvent(new _("dragstart",f)),e.dispatchEvent(new _("dragenter",h)),e.dispatchEvent(new _("dragover",h)),e.dispatchEvent(new _("drop",h)),t.dispatchEvent(new _("dragend",f))}catch(m){console.warn("[EasyQuiz] DragEvent ignorado com seguran\xE7a:",m)}try{let m=new Touch({identifier:1,target:t,clientX:a,clientY:s}),f=new Touch({identifier:1,target:e,clientX:c,clientY:r});t.dispatchEvent(new TouchEvent("touchstart",{bubbles:!0,cancelable:!0,touches:[m]})),e.dispatchEvent(new TouchEvent("touchmove",{bubbles:!0,cancelable:!0,touches:[f]})),e.dispatchEvent(new TouchEvent("touchend",{bubbles:!0,cancelable:!0,touches:[]}))}catch{}if(n>=2&&!e.contains(t))try{t.focus?.(),t.dispatchEvent(new KeyboardEvent("keydown",{key:" ",code:"Space",bubbles:!0})),t.dispatchEvent(new KeyboardEvent("keyup",{key:" ",code:"Space",bubbles:!0})),await new Promise(m=>setTimeout(m,80)),e.focus?.(),e.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",bubbles:!0})),e.dispatchEvent(new KeyboardEvent("keyup",{key:"Enter",code:"Enter",bubbles:!0}))}catch{}if(!e.contains(t))try{let m=_=>{let v=Object.keys(_).find(y=>y.startsWith("__reactFiber")||y.startsWith("__reactInternalInstance"));if(!v)return null;let w=_[v];for(let y=0;y<10&&w;y++){if(w.memoizedProps)return w.memoizedProps;w=w.return}return null},f=m(t),h=m(e);if(f){let _=f.onMouseDown||f.onPointerDown||f.onDragStart;if(typeof _=="function")try{_({type:"mousedown",button:0,buttons:1,clientX:a,clientY:s,bubbles:!0,preventDefault:()=>{},stopPropagation:()=>{},currentTarget:t,target:t}),await new Promise(v=>setTimeout(v,100))}catch{}}if(h){let _=h.onMouseUp||h.onPointerUp||h.onDrop;if(typeof _=="function")try{_({type:"mouseup",button:0,buttons:0,clientX:c,clientY:r,bubbles:!0,preventDefault:()=>{},stopPropagation:()=>{},currentTarget:e,target:e})}catch{}}try{t.focus?.(),t.dispatchEvent(new KeyboardEvent("keydown",{key:" ",code:"Space",keyCode:32,bubbles:!0,cancelable:!0})),await new Promise(v=>setTimeout(v,200));let _=r>s?"ArrowDown":"ArrowUp";for(let v=0;v<3;v++)document.dispatchEvent(new KeyboardEvent("keydown",{key:_,bubbles:!0,cancelable:!0})),await new Promise(w=>setTimeout(w,60));document.dispatchEvent(new KeyboardEvent("keydown",{key:" ",code:"Space",keyCode:32,bubbles:!0,cancelable:!0})),await new Promise(v=>setTimeout(v,80))}catch{}try{!!document.querySelector("[data-rbd-draggable-id], [data-rbd-droppable-id], [data-dnd-kit-sortable]")&&(t.dispatchEvent(new CustomEvent("dndkitdragstart",{bubbles:!0,cancelable:!0,detail:{id:t.id||t.getAttribute("data-id")}})),await new Promise(v=>setTimeout(v,100)),e.dispatchEvent(new CustomEvent("dndkitdrop",{bubbles:!0,cancelable:!0,detail:{overId:e.id||e.getAttribute("data-id")}})))}catch{}}catch(m){console.warn("[EasyQuiz] Estrat\xE9gia G (React DnD internals) falhou:",m)}}var qt={fill:(t,e)=>{let n=M(t);n?Se(n,e):console.warn(`$eq.fill: Elemento '${t}' n\xE3o encontrado`)},click:t=>{let e=M(t);e?!!(e.closest('.option-card, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, [class*="option" i], [class*="choice" i]')||e.querySelector('input[type="radio"], input[type="checkbox"]')||e instanceof HTMLInputElement&&["checkbox","radio"].includes(e.type))?oe(e,!0):V(e):console.warn(`$eq.click: Elemento '${t}' n\xE3o encontrado`)},check:(t,e)=>{let n=M(t);n?oe(n,e):console.warn(`$eq.check: Elemento '${t}' n\xE3o encontrado`)},find:(t,e)=>M(t,e),drag:(t,e)=>{let n=G(t,"source")||M(t),o=G(e,"destination")||M(e);n&&o?me(n,o):console.warn(`$eq.drag: Origem ou destino n\xE3o encontrado ('${t}' -> '${e}')`)},categorize:async(t,e)=>{let n=G(t,"source")||M(t),o=G(e,"destination")||M(e);if(!n||!o){console.warn(`$eq.categorize: Item ou categoria n\xE3o encontrados ('${t}' -> '${e}')`);return}await me(n,o)},execute:(t,e=!1,n=1)=>un(t,e,n)};typeof window<"u"&&(window.$eq=qt);async function sn(t,e=1,n=Je()){if(Ze(t,n),t.t==="js"){let r=String(t.v||"");Ct(r);try{new Function("$eq","document","window",r)(qt,document,window)}catch(l){throw console.warn("[EasyQuiz JS Execution]",l),l}return}if(t.t==="drag"){let r=G(t.from,"source")||M(t.from),l=G(t.to,"destination")||M(t.to);!r&&t.from&&(r=M(E(t.from))),!l&&t.to&&(l=M(E(t.to))),r&&l?await me(r,l,e):console.warn(`[EasyQuiz] Drag: alvo n\xE3o encontrado ('${t.from}' -> '${t.to}')`);return}let o=t.id!==void 0&&t.id!==null?String(t.id):"";!o&&t.t==="val"&&(o=t.target??t.name??t.selector??"1");let i=t.v!==void 0?t.v:t.value!==void 0?t.value:t.val!==void 0?t.val:t.text,a=i!=null?String(i).trim():"",s=null,c=String(t.name??t.n??"").trim();if(!c&&o&&document.querySelector(`input[type="radio"][name="${P(o)}"]`)&&(c=o),(t.t==="chk"||t.t==="clk")&&c){let r=Array.from(document.querySelectorAll(`input[name="${P(c)}"]`));if(a&&(s=r.find(l=>l.value?.toLowerCase()===a.toLowerCase())??null),!s&&a){let l=/^(v|verdadeiro|true|1|t|sim|correto)$/i.test(a),d=/^(f|falso|false|0|nao|não|incorreto|errado)$/i.test(a);if(l||d){let g=l?["v","verdadeiro","true","1","t","sim","correto"]:["f","falso","false","0","nao","n\xE3o","incorreto","errado"];s=r.find(u=>{let p=u.value?.toLowerCase()??"";if(g.includes(p))return!0;let f=(u.closest('label, td, [class*="option" i]')?.textContent??"").trim().toLowerCase();return g.some(h=>f===h||f.startsWith(h+" ")||f.startsWith("("+h+")"))})??null}}!s&&r.length>0&&(s=r[0])}if(s||(s=M(o,a,t.t==="val"||t.t==="sel")),!s&&o&&(s=M(E(o),a,t.t==="val"||t.t==="sel")),s&&a){if(s instanceof HTMLInputElement&&s.type==="radio"&&s.name){if(E(s.value).toLowerCase()!==E(a).toLowerCase()){let r=document.querySelector(`input[type="radio"][name="${P(s.name)}"][value="${P(a)}" i]`);if(r)s=r;else{let d=Array.from(document.querySelectorAll(`input[type="radio"][name="${P(s.name)}"]`)).find(g=>{let u=g.closest("label, .vf-label, .option-card, tr, td, div");return u&&E(u.textContent).toLowerCase().includes(E(a).toLowerCase())});d&&(s=d)}}}else if(!(s instanceof HTMLInputElement)&&!(s instanceof HTMLSelectElement)&&!(s instanceof HTMLTextAreaElement)){let r=s.querySelector(`input[value="${P(a)}" i], [data-value="${P(a)}" i]`);if(r)s=r;else{let d=Array.from(s.querySelectorAll('input[type="radio"], input[type="checkbox"]')).find(g=>{let u=g.closest("label, .vf-label, .option-card, td, div");return u&&E(u.textContent).toLowerCase().includes(E(a).toLowerCase())});d&&(s=d)}}}if(!s&&(t.t==="val"||t.t==="sel")){let r=document.body;try{r=J()||document.body}catch{}let l=Array.from(r.querySelectorAll(t.t==="sel"?'select, [role="combobox"], [role="listbox"]':'input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, select, [contenteditable="true"]')).filter(d=>A(d)&&!I(d));if(l.length===1)s=l[0];else if(l.length>1){let d=E(o).toLowerCase(),g=d.match(/^#?_?([0-9]+)$/);if(g){let u=parseInt(g[1],10);u>=1&&u<=l.length?s=l[u-1]:u>=0&&u<l.length&&(s=l[u])}s||(s=l.find(p=>{let m=(p.getAttribute("placeholder")||"").toLowerCase(),f=(p.name||"").toLowerCase(),h=(p.getAttribute("aria-label")||"").toLowerCase(),_=(p.id||"").toLowerCase(),v=E(Ve(p)).toLowerCase(),w=E(p.closest('label, tr, td, .form-group, .field, [class*="row" i], div')?.textContent||"").toLowerCase();return m.includes(d)||f.includes(d)||h.includes(d)||_.includes(d)||v&&v.includes(d)||d.length>=2&&w.includes(d)})||(l.length===1?l[0]:null))}}if(!s&&t.t!=="adv")throw new Error(`Alvo '${o}' n\xE3o encontrado no DOM para a\xE7\xE3o '${t.t}'.`);switch(t.t){case"val":if(s){let d=s instanceof HTMLInputElement||s instanceof HTMLTextAreaElement||s instanceof HTMLSelectElement||s.isContentEditable?s:s.querySelector('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]');if(!d){let m=s.closest('.form-group, .field, [class*="input" i], [class*="control" i], label, tr, td, li, p, div')?.querySelector('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]');m&&(d=m)}if(!d){let p=s.nextElementSibling;for(;p;){if(p instanceof HTMLInputElement&&!["hidden","button","submit","checkbox","radio"].includes(p.type)||p instanceof HTMLTextAreaElement||p instanceof HTMLElement&&p.isContentEditable){d=p;break}let m=p.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(m){d=m;break}p=p.nextElementSibling}}if(!d){let p=document.body;try{p=J()||document.body}catch{}let m=Array.from(p.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]')).filter(f=>A(f)&&!I(f));m.length>0&&(d=m[0])}let g=t.v!==void 0?t.v:t.value!==void 0?t.value:t.val!==void 0?t.val:t.text,u=g!=null?String(g):"";Se(d||s,u)}break;case"chk":let r=t.c!==void 0?!!t.c:!0;s&&oe(s,r);break;case"sel":if(s){let d=Array.isArray(t.v)?t.v:[String(t.v)];Te(s,d)}break;case"clk":if(s)if(!!(s.closest('.option-card, label, .vf-label, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, [class*="option" i], [class*="choice" i], [class*="answer" i], li, tr')||s.querySelector('input[type="radio"], input[type="checkbox"]')||s instanceof HTMLInputElement&&["checkbox","radio"].includes(s.type))){let g=t.c!==void 0?!!t.c:!0;oe(s,g)}else V(s,t.co);break;case"adv":let l=tt(t.id);if(l){await nt(l,1200);let d=t.id||l.textContent?.trim()||"";d&&Re(window.location.hostname,{advanceSelector:d}),V(l)}else console.warn("[EasyQuiz] Bot\xE3o de avan\xE7o n\xE3o localizado.");break}}function cn(){let t=["button","a",'[role="button"]','input[type="submit"]','input[type="button"]','[data-testid*="check" i]','[data-test-id*="check" i]'].join(",");return Array.from(document.querySelectorAll(t)).find(n=>{if(!A(n)||I(n)||n.closest("header, nav, aside"))return!1;let o=n instanceof HTMLInputElement||n instanceof HTMLButtonElement?n.value:"",i=(n.textContent||o||n.getAttribute("aria-label")||"").trim();return/(verificar|checar|check|conferir|validar|enviar|responder)/i.test(i)})||null}function tt(t){let e=u=>{let p=(u.getAttribute("aria-label")||u.textContent||(u instanceof HTMLInputElement||u instanceof HTMLButtonElement?u.value:"")||"").trim();return ie.test(p)};if(t){let u=M(t);if(u&&A(u)&&!I(u)&&!R(u)&&!e(u))return u}try{let u=Pe(window.location.hostname);if(u.advanceSelector){let p=M(u.advanceSelector);if(p&&A(p)&&!I(p)&&!R(p)&&!e(p))return p}}catch{}let n=["button","a",'[role="button"]','[role="link"]','input[type="button"]','input[type="submit"]','[data-testid*="next" i]','[data-testid*="continue" i]','[data-testid*="check" i]','[data-test-id*="next" i]','[data-test-id*="continue" i]','[data-test-id*="check" i]','[class*="next" i]','[class*="continue" i]','[class*="proximo" i]','[class*="avancar" i]'].join(","),o=Array.from(document.querySelectorAll(n)),i=u=>{let p=u instanceof HTMLInputElement||u instanceof HTMLButtonElement?u.value:"";return(u.getAttribute("aria-label")||u.textContent||p||"").trim()},a=u=>{let p=i(u).trim();return/^\d{1,3}$/.test(p)?!!u.closest('[class*="pagination" i], [class*="pager" i], [class*="page-nav" i], [class*="step-indicator" i], [class*="breadcrumb" i], [class*="steps" i], [aria-label*="p\xE1gina" i], [aria-label*="page" i], [role="navigation"], nav'):!1},s=o.filter(u=>A(u)&&!I(u)&&!u.closest("header, aside")&&!R(u)&&!e(u));for(let u of s){let p=i(u),m=p.replace(/[\d\(\)\[\]\u2192>\u2022\-\/\\]+/g," ").trim();if((be.test(p)||be.test(m))&&!a(u)&&!R(u))return u}for(let u of s)if(X(u)&&!R(u)&&!a(u))return u;let c=document.querySelector('[data-test-id*="next" i], [data-testid*="next" i], [aria-label*="next" i], [aria-label*="pr\xF3xim" i], [aria-label*="avan\xE7ar" i], [aria-label*="continuar" i]');if(c&&A(c)&&!I(c)&&!R(c)&&!e(c))return c;let r=Array.from(document.querySelectorAll('input[type="submit"], button[type="submit"]'));for(let u of r)if(A(u)&&!I(u)&&!e(u)&&!R(u)&&!a(u))return u;let l=Array.from(document.querySelectorAll('button, [role="button"]')),d=window.innerHeight,g=l.filter(u=>{if(!A(u)||I(u)||e(u)||R(u)||u.closest("header, nav, aside, .eq-sidebar")||a(u))return!1;let p=u.getBoundingClientRect();return p.top>d*.45&&p.height>=24&&p.width>=24});if(g.length>0)return g.sort((u,p)=>{let m=u.getBoundingClientRect(),f=p.getBoundingClientRect(),h=m.left+m.top;return f.left+f.top-h}),g[0];for(let u of s)if(X(u)&&!R(u))return u;return null}async function nt(t,e=2500){let n=Date.now();for(;Date.now()-n<e;){if(!(t.disabled===!0||t.getAttribute("aria-disabled")==="true"||t.classList.contains("disabled")||t.getAttribute("disabled")!==null))return;await new Promise(i=>setTimeout(i,80))}}function ln(){let t=window.location.href,e=document.title,n=document.querySelectorAll('input, textarea, select, button, [role="button"], [role="option"], [role="radio"], [role="checkbox"]').length,o=(document.body?.innerText||document.body?.textContent||"").length;return`${t}|${e}|${n}|${o}`}async function dn(t,e=3500){let[n,o,i,a]=t.split("|"),s=parseInt(a||"0",10),c=Date.now();for(;Date.now()-c<e;){let r=window.location.href,l=document.title,d=String(document.querySelectorAll('input, textarea, select, button, [role="button"], [role="option"], [role="radio"], [role="checkbox"]').length),g=(document.body?.innerText||document.body?.textContent||"").length;if(r!==n)return{changed:!0,evidence:`URL mudou: ${n} \u2192 ${r}`};if(l!==o)return{changed:!0,evidence:`T\xEDtulo da p\xE1gina mudou: "${o}" \u2192 "${l}"`};if(Math.abs(parseInt(d)-parseInt(i||"0"))>=2)return{changed:!0,evidence:`Controles interativos: ${i} \u2192 ${d}`};if(Math.abs(g-s)>50)return{changed:!0,evidence:`Conte\xFAdo da p\xE1gina mudou substancialmente (${Math.abs(g-s)} chars)`};await new Promise(u=>setTimeout(u,100))}return{changed:!1,evidence:"Nenhuma mudan\xE7a estrutural detectada dentro do tempo limite."}}async function Mt(t){if(t.t==="js"||t.t==="adv")return;if(t.t==="drag"){let a=M(t.from)||M(E(t.from)),s=M(t.to)||M(E(t.to));a&&s&&await me(a,s,2);return}let e=t.id||"",n=t.v!==void 0?String(t.v).trim():"",o=M(e,n)||M(E(e),n),i=String(t.name??t.n??"").trim();if(!i&&e&&document.querySelector(`input[type="radio"][name="${P(e)}"]`)&&(i=e),!o&&i){let a=Array.from(document.querySelectorAll(`input[name="${P(i)}"]`));if(n&&(o=a.find(s=>s.value?.toLowerCase()===n.toLowerCase())??null),!o&&n){let s=/^(v|verdadeiro|true|1|t|sim|correto)$/i.test(n),c=/^(f|falso|false|0|nao|não|incorreto|errado)$/i.test(n);if(s||c){let r=s?["v","verdadeiro","true","1","t","sim","correto"]:["f","falso","false","0","nao","n\xE3o","incorreto","errado"];o=a.find(l=>{let d=l.value?.toLowerCase()??"";if(r.includes(d))return!0;let u=(l.closest('label, td, [class*="option" i]')?.textContent??"").trim().toLowerCase();return r.some(p=>u===p||u.startsWith(p+" ")||u.startsWith("("+p+")"))})??null}}!o&&a.length>0&&(o=a[0])}if(t.t==="clk"||t.t==="chk"){if(!o&&e){let s=Array.from(document.querySelectorAll('input, label, button, [role="radio"], [role="checkbox"], .option-card, [class*="option" i], [class*="choice" i]')),c=E(e).toLowerCase();o=s.find(r=>{let l=E(r.textContent).toLowerCase();return!!(E(r.value||"").toLowerCase()===c||l===c||l.startsWith(c+")")||l.startsWith("("+c+")")||l.startsWith(c+".")||l.startsWith(c+" - ")||l.startsWith(c+":")||c.length>=3&&l.includes(c))})||null}let a=t.v!==void 0?String(t.v).trim():"";if(o&&a){if(o instanceof HTMLInputElement&&o.type==="radio"&&o.name){if(E(o.value).toLowerCase()!==E(a).toLowerCase()){let s=document.querySelector(`input[type="radio"][name="${P(o.name)}"][value="${P(a)}" i]`);if(s)o=s;else{let r=Array.from(document.querySelectorAll(`input[type="radio"][name="${P(o.name)}"]`)).find(l=>{let d=l.closest("label, .vf-label, .option-card, tr, td, div");return d&&E(d.textContent).toLowerCase().includes(E(a).toLowerCase())});r&&(o=r)}}}else if(!(o instanceof HTMLInputElement)&&!(o instanceof HTMLSelectElement)&&!(o instanceof HTMLTextAreaElement)){let s=o.querySelector(`input[value="${P(a)}" i], [data-value="${P(a)}" i]`);if(s)o=s;else{let r=Array.from(o.querySelectorAll('input[type="radio"], input[type="checkbox"]')).find(l=>{let d=l.closest("label, .vf-label, .option-card, td, div");return d&&E(d.textContent).toLowerCase().includes(E(a).toLowerCase())});r&&(o=r)}}}if(o){let s=o.closest('.option-card, label, .vf-label, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, li')||o,c=o instanceof HTMLInputElement&&["radio","checkbox"].includes(o.type)?o:s.querySelector('input[type="radio"], input[type="checkbox"]')||(s.getAttribute("for")?s.ownerDocument.getElementById(s.getAttribute("for")):null),r=t.c!==void 0?!!t.c:!0;if(oe(c||s,r),c&&c.checked!==r){try{let l=c._valueTracker;l&&l.setValue(!r)}catch{}try{Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"checked")?.set?.call(c,r)}catch{}c.checked=r,c.dispatchEvent(new Event("input",{bubbles:!0,composed:!0})),c.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}}return}if(t.t==="val"){let a=null;if(o&&(a=o instanceof HTMLInputElement||o instanceof HTMLTextAreaElement||o.isContentEditable?o:o.querySelector('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]')),!a){let s=document.body;try{s=J()||document.body}catch{}let c=Array.from(s.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]')),r=E(e).toLowerCase();a=c.find(l=>{let d=(l.getAttribute("placeholder")||"").toLowerCase(),g=(l.name||"").toLowerCase(),u=(l.id||"").toLowerCase(),p=(l.getAttribute("aria-label")||"").toLowerCase();return d.includes(r)||g.includes(r)||u.includes(r)||p.includes(r)})||(c.length>0?c[0]:null)}if(a){let s=String(t.v??"");try{if(a.focus?.(),a.type!=="number"){try{a.select?.()}catch{}document.execCommand?.("insertText",!1,s)}}catch{}Se(a,s)}return}if(t.t==="sel"){if(!o&&e){let a=Array.from(document.querySelectorAll("select")),s=E(e).toLowerCase();o=a.find(c=>{let r=(c.name||"").toLowerCase(),l=(c.id||"").toLowerCase(),d=(c.getAttribute("aria-label")||"").toLowerCase();return r.includes(s)||l.includes(s)||d.includes(s)})||null}if(o){let a=Array.isArray(t.v)?t.v:[String(t.v)];Te(o,a)}return}}function ee(t){try{if(t.t==="val"){let e=t.v!==void 0?t.v:t.value!==void 0?t.value:t.val!==void 0?t.val:t.text,n=String(e??"").trim(),o=n,i=t.id!==void 0&&t.id!==null?String(t.id):"";i||(i=t.target??t.name??t.selector??"1");let a=M(i,o,!0)||M(E(i),o,!0);if(!a){let p=document.body;try{p=J()||document.body}catch{}let m=Array.from(p.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]')).filter(f=>A(f)&&!I(f));m.length>0&&(a=m[0])}if(!a)return!1;let s=a instanceof HTMLInputElement&&a.type==="radio"?a:a.querySelector('input[type="radio"]');if(s&&s.name){let p=document.querySelector(`input[type="radio"][name="${P(s.name)}"]:checked`);if(!p)return!1;let m=E(p.value).toLowerCase(),f=E(n).toLowerCase(),h=E(p.closest("label, .vf-label, .option-card, tr, td, div")?.textContent||"").toLowerCase();return m===f||h===f||h.includes(f)}let c=a instanceof HTMLInputElement||a instanceof HTMLTextAreaElement||a.isContentEditable?a:a.querySelector('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(!c){let m=a.closest('.form-group, .field, [class*="input" i], [class*="control" i], label, tr, td, li, p, div')?.querySelector('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]');m&&(c=m)}if(!c){let p=a.nextElementSibling;for(;p;){if(p instanceof HTMLInputElement&&!["hidden","button","submit","checkbox","radio"].includes(p.type)||p instanceof HTMLTextAreaElement||p instanceof HTMLElement&&p.isContentEditable){c=p;break}let m=p.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(m){c=m;break}p=p.nextElementSibling}}if(c instanceof HTMLSelectElement){let p=E(n).toLowerCase();return Array.from(c.options).some(m=>{if(!m.selected)return!1;let f=m.value.toLowerCase(),h=E(m.textContent).toLowerCase();return p===f||p===h||f.includes(p)||h.includes(p)})}let r=(c instanceof HTMLInputElement||c instanceof HTMLTextAreaElement?c.value:c?.textContent??a.textContent??"").trim();if(!r&&!n)return!0;if(!r&&n)return!1;let l=r.replace(",",".").replace(/\s+/g,"").toLowerCase(),d=n.replace(",",".").replace(/\s+/g,"").toLowerCase(),g=parseFloat(l),u=parseFloat(d);return!isNaN(g)&&!isNaN(u)&&l.match(/^-?[\d.,]+$/)&&d.match(/^-?[\d.,]+$/)?Math.abs(g-u)<1e-4:l===d||r.toLowerCase()===n.toLowerCase()||d.length>=3&&l===d}if(t.t==="sel"){let e=M(t.id,void 0,!0)||M(E(t.id),void 0,!0);if(!e){let a=document.body;try{a=J()||document.body}catch{}let s=Array.from(a.querySelectorAll('select, [role="combobox"], [role="listbox"]')).filter(l=>A(l)&&!I(l)),c=E(t.id).toLowerCase();e=s.find(l=>{let d=(l.id||"").toLowerCase(),g=(l.getAttribute("name")||"").toLowerCase(),u=(l.getAttribute("aria-label")||"").toLowerCase(),p=E(l.closest('.dropdown-row, [class*="dropdown" i], [class*="select" i], tr, label, div')?.textContent||"").toLowerCase();return d.includes(c)||g.includes(c)||u.includes(c)||c.length>=2&&p.includes(c)})||(s.length===1?s[0]:null)}if(!e)return!1;let n=e instanceof HTMLSelectElement?e:e.querySelector("select");if(!n){let a=e.matches?.('[role="combobox"], [role="listbox"], [class*="select" i], [class*="dropdown" i]')?e:e.closest('[role="combobox"], [role="listbox"], [class*="select" i], [class*="dropdown" i]');if(a){let c=(Array.isArray(t.v)?t.v:[String(t.v)]).map(l=>E(l).toLowerCase()),r=E(a.textContent).toLowerCase();return c.some(l=>r.includes(l)||l.includes(r))}return!1}let i=(Array.isArray(t.v)?t.v:[String(t.v)]).map(a=>E(a).toLowerCase());return Array.from(n.options).some(a=>{if(!a.selected)return!1;let s=a.value.toLowerCase(),c=E(a.textContent).toLowerCase();return i.some(r=>r===s||r===c||s.includes(r)||c.includes(r))})}if(t.t==="chk"||t.t==="clk"){let e=t.v!==void 0?String(t.v).trim():"",n=String(t.name??t.n??"").trim();if(n&&!t.id){let u=Array.from(document.querySelectorAll(`input[name="${P(n)}"]`));if(u.length>0){let p=u.find(v=>v.checked);if(!p)return!1;if(!e)return!0;let m=p.value?.toLowerCase()??"",f=e.toLowerCase();if(m===f)return!0;let h=/^(v|verdadeiro|true|1|t|sim|correto)$/i.test(e),_=/^(f|falso|false|0|nao|não|incorreto|errado)$/i.test(e);return h?/^(v|verdadeiro|true|1|t|sim|correto)$/i.test(m):_?/^(f|falso|false|0|nao|não|incorreto|errado)$/i.test(m):!1}}let o=M(t.id,e)||M(E(t.id),e);if(!o&&n){let u=document.querySelector(`input[name="${P(n)}"]`);u&&(o=u)}if(!o)return!1;let i=o.closest('.option-card, label, .vf-label, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, li')||o,a=o instanceof HTMLInputElement&&["checkbox","radio"].includes(o.type)?o:i.querySelector('input[type="checkbox"], input[type="radio"]')||(i.getAttribute("for")?i.ownerDocument.getElementById(i.getAttribute("for")):null),s=t.t==="chk"||t.c!==void 0?!!t.c:!0;if(a&&a.type==="radio"){if(a.checked===s)return!0;if(t.v&&a.name){let u=E(String(t.v)).toLowerCase(),p=document.querySelector(`input[type="radio"][name="${P(a.name)}"]:checked`);if(!p)return!1;if(p===a)return!0;let m=E(p.value).toLowerCase(),f=E(p.closest("label, .vf-label, .option-card, tr, td, div")?.textContent||"").toLowerCase();return m===u||f.includes(u)||u.includes(m)}}if(a&&["checkbox","radio"].includes(a.type))return a.checked===s;let c=i.getAttribute("aria-checked")===String(s)||i.getAttribute("aria-selected")===String(s)||i.getAttribute("aria-pressed")===String(s),r=s?i.getAttribute("data-selected")==="true"||i.getAttribute("data-checked")==="true"||i.getAttribute("data-active")==="true"||i.getAttribute("data-state")==="checked"||i.getAttribute("data-state")==="on":i.getAttribute("data-selected")==="false"||i.getAttribute("data-checked")==="false"||i.getAttribute("data-state")==="unchecked",l=i.className||"",d=s?/\b(active|selected|checked|picked|is-selected|choice-selected|selected-option|is-checked|chosen|current)\b/i.test(l):!/\b(active|selected|checked|picked|is-selected|choice-selected|selected-option|is-checked|chosen|current)\b/i.test(l);if(c||r||d)return!0;let g=!!i.closest('[role="radiogroup"], [role="listbox"], .options, .choices, [class*="option" i], [class*="choice" i], [class*="answer" i], [class*="quiz" i]');return t.t==="clk"&&!a&&!g||i.getAttribute("aria-expanded")!==null||i.getAttribute("aria-pressed")!==null}if(t.t==="drag"){let e=G(t.from,"source")||M(t.from)||M(E(t.from)),n=G(t.to,"destination")||M(t.to)||M(E(t.to));return!e||!n?!1:rn(e,n).success}}catch{}return!1}async function un(t,e,n=1,o=Je({engine:"smart",autoAdvance:e})){let i=t.actions.filter(b=>b.t!=="adv"),a=t.actions.filter(b=>b.t==="adv"),s=0,c=[],r=new Map,l=new Map,d=new Map,g=new Set,u=t.pageType==="question",p=i.filter(b=>b.t==="chk"||b.t==="clk"&&b.c!==void 0),m=new Map;for(let b of i){let S=[];l.set(b,S);try{if(b.t==="drag"){S.push("declarative-A-F");try{let C=G(b.from,"source")||M(b.from),L=G(b.to,"destination")||M(b.to);C&&d.set(b,C.parentElement?.outerHTML?.slice(0,500)||""),L&&m.set(b,L.children.length)}catch{}}else S.push("declarative-primary");await sn(b,n,o),s++,g.add(b)}catch(C){r.set(b,C instanceof Error?C.message:String(C)),console.warn("[EasyQuiz] A\xE7\xE3o declarativa prim\xE1ria falhou com seguran\xE7a:",b,C)}await new Promise(C=>setTimeout(C,b.t==="drag"?180:35))}if(u&&t.mode==="escolha_multipla"&&p.length>0){let b=document.body;try{b=J()||document.body}catch{}let S=Array.from(b.querySelectorAll('input[type="checkbox"], [role="checkbox"]')).filter(C=>A(C)&&!I(C));if(S.length>1){let L=function(x,k){if(x===k||x.contains(k)||k.contains(x))return!0;let q=x.closest('.option-card, label, [role="checkbox"], [role="option"], tr, li, [class*="option" i]'),N=k.closest('.option-card, label, [role="checkbox"], [role="option"], tr, li, [class*="option" i]');if(q&&N&&q===N)return!0;let z=x.getAttribute("for")||x.id,F=k.getAttribute("for")||k.id;return!!(z&&F&&z===F)};var D=L;let C=new Set;for(let x of p){let k=x.t==="chk"?!!x.c:!!(x.c??!0),q="id"in x&&typeof x.id=="string"?x.id:"";if(k&&q){let N=M(q,x.v);if(N){C.add(N);let z=N.querySelector('input[type="checkbox"]');z&&C.add(z);let F=N.closest('.option-card, label, [role="checkbox"], tr, li, [class*="option" i]');F&&(C.add(F),F.querySelectorAll('input[type="checkbox"]').forEach(O=>C.add(O)))}}}if(C.size>=p.length&&C.size>0){let x=Array.from(C);for(let k of S)x.some(N=>L(N,k))||(k instanceof HTMLInputElement&&k.checked||k.getAttribute("aria-checked")==="true"||k.closest(".option-card, label")?.classList.contains("selected"))&&oe(k,!1)}}}await new Promise(b=>setTimeout(b,i.length>0?100:25));let f=0;for(let b of i){if(ee(b)){f++;continue}console.warn(`[EasyQuiz Auto-Cura] A\xE7\xE3o '${b.t}' no alvo '${b.id||b.from||""}' n\xE3o verificada no DOM. Disparando Passagem 2 de conting\xEAncia...`);try{Ze(b,o),l.get(b)?.push("alternative-path"),await Mt(b)}catch(S){r.set(b,S instanceof Error?S.message:String(S)),console.warn("[EasyQuiz Auto-Cura] Rota alternativa falhou:",S)}await new Promise(S=>setTimeout(S,250)),ee(b)&&(console.log("[EasyQuiz Auto-Cura] \u2713 A\xE7\xE3o recuperada com sucesso pela rota de conting\xEAncia!"),f++,g.has(b)?r.has(b)&&r.delete(b):(r.delete(b),s++,g.add(b)))}if(f<i.length&&i.length>0){console.warn(`[EasyQuiz Auto-Cura] ${i.length-f} de ${i.length} a\xE7\xE3o(\xF5es) ainda n\xE3o verificadas. Disparando Passagem 3 final...`),await new Promise(b=>setTimeout(b,200));for(let b of i)if(!ee(b))try{if(await Mt(b),await new Promise(S=>setTimeout(S,80)),!ee(b)&&(b.t==="clk"||b.t==="chk"))try{let S="id"in b?String(b.id||""):"",C=b.v!==void 0?String(b.v).trim():"",L=M(S,C)||M(E(S),C);L&&(Ae(L),await new Promise(x=>setTimeout(x,120)))}catch{}}catch(S){r.set(b,S instanceof Error?S.message:String(S))}await new Promise(b=>setTimeout(b,200)),f=0;for(let b of i)ee(b)&&(f++,g.has(b)?r.has(b)&&r.delete(b):(r.delete(b),s++,g.add(b)))}let h=[];for(let[b,S]of i.entries())if(!ee(S)){let C=S.t==="drag"?`${S.from} -> ${S.to}`:"id"in S?S.id:S.t;c.push(C),h.push({actionIndex:b,action:S,strategiesAttempted:l.get(S)||[],evidence:r.get(S)||"sem evid\xEAncia de aplica\xE7\xE3o no DOM",domSnapshot:d.get(S)}),S.t==="drag"&&console.warn(`[EasyQuiz Drag] FALHA CONFIRMADA: "${S.from}" -> "${S.to}"`,`
  Estrat\xE9gias: ${(l.get(S)||[]).join(", ")}`,`
  Snapshot DOM: ${d.get(S)?.slice(0,200)||"n/a"}`)}u&&i.length===0&&c.push("nenhuma a\xE7\xE3o de resposta prescrita");let _=i.map((b,S)=>{let C=b.t==="drag"?`${b.from} -> ${b.to}`:b.t==="js"?"$eq":b.id||b.t,L=b.t==="js"?!0:b.t==="drag"?!!(G(b.from,"source")&&G(b.to,"destination")):!!(M(b.id||"")||M(E(b.id||""))),x=ee(b);return{index:S,action:b,target:C,located:L,applied:!r.has(b),verified:x,strategy:b.t==="drag"?"drag-adaptive":b.t==="js"?"javascript":"declarative-dom",evidence:x?"estado do controle confirmado no DOM":"nenhuma evid\xEAncia suficiente ap\xF3s as tentativas",...r.has(b)?{error:r.get(b)}:{}}}),v=u?i.length>0&&c.length===0&&(f===i.length||s===i.length&&f>0):!0,w=!1,y=!1,T="Nenhuma a\xE7\xE3o de navega\xE7\xE3o solicitada.",$=s>0&&s>=i.length/2;if(e&&(v||!u||$)){await new Promise(x=>setTimeout(x,i.length>0?120:40));let b=!1;if(t.pageType!=="info"){let x=cn();x&&A(x)&&(await nt(x,1200),V(x),b=!0,await new Promise(k=>setTimeout(k,350)))}let S=ln(),C=a.length>0?a[0].id:void 0,L=tt(C);if(!L&&b&&(await new Promise(x=>setTimeout(x,250)),L=tt(C)),L){await nt(L,1500);let x=C||L.textContent?.trim()||"";x&&Re(window.location.hostname,{advanceSelector:x}),V(L);let k=await dn(S,1800);y=k.changed,T=k.evidence,w=k.changed||b,!k.changed&&!b&&console.warn("[EasyQuiz] O bot\xE3o de avan\xE7o foi acionado, mas a navega\xE7\xE3o ainda n\xE3o concluiu.")}else b?(w=!0,y=!0,T="Resposta confirmada via bot\xE3o de verifica\xE7\xE3o/envio."):console.warn("[EasyQuiz] Nenhum bot\xE3o de avan\xE7o encontrado na p\xE1gina.")}return{applied:s,verified:f,success:v,advanced:w,failed:c,reports:_,navigationVerified:y,navigationEvidence:T,failedActions:h}}var Ce=class{el=null;state="idle";mouseX=-300;mouseY=-300;displayX=-300;displayY=-300;rafId=null;flashTimer=null;boundMove;constructor(){this.boundMove=e=>{this.mouseX=e.clientX,this.mouseY=e.clientY,this.displayX===-300&&(this.displayX=e.clientX,this.displayY=e.clientY)},window.addEventListener("mousemove",this.boundMove,{passive:!0}),this.injectStyle(),this.createEl(),this.startRaf()}injectStyle(){if(document.getElementById("__eqdc_style__"))return;let e=document.createElement("style");e.id="__eqdc_style__",e.textContent=`
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
    `,document.documentElement.appendChild(e)}createEl(){this.el=document.createElement("div"),this.el.id="__eqdiscrete_coin__",document.documentElement.appendChild(this.el)}startRaf(){let n=()=>{if(this.el&&this.state!=="idle"){this.displayX+=(this.mouseX-this.displayX)*.22,this.displayY+=(this.mouseY-this.displayY)*.22;let o=Math.min(this.displayX+11,window.innerWidth-18),i=Math.min(Math.max(this.displayY-2,2),window.innerHeight-18);this.el.style.left=`${o}px`,this.el.style.top=`${i}px`}this.rafId=requestAnimationFrame(n)};this.rafId=requestAnimationFrame(n)}setState(e){this.state=e;let n=this.el;if(n){if(e==="idle"){n.style.display="none",n.innerHTML="";return}n.style.display="block",e==="loading"?n.innerHTML=`
        <div class="__eqdc_ring__">
          <svg class="__eqdc_svg_icon__" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 20 20">
            <!-- Trilha branca s\xF3lida \u2014 define o furo no centro -->
            <circle cx="10" cy="10" r="7" fill="none" stroke="#FFFFFF" stroke-width="3.5"/>
            <!-- Arco azul Windows 10 (#0078D7) girat\xF3rio -->
            <circle cx="10" cy="10" r="7" fill="none" stroke="#0078D7" stroke-width="3.5"
              stroke-dasharray="22 22" stroke-linecap="round"/>
          </svg>
        </div>`:e==="ok"?n.innerHTML=`
        <svg class="__eqdc_svg_icon__" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 20 20">
          <polyline points="3,10 8,15.5 17,4.5"
            fill="none" stroke="#107C10" stroke-width="2.8"
            stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`:e==="error"&&(n.innerHTML=`
        <svg class="__eqdc_svg_icon__" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 20 20">
          <line x1="4" y1="4" x2="16" y2="16" stroke="#C42B1C" stroke-width="2.8" stroke-linecap="round"/>
          <line x1="16" y1="4" x2="4" y2="16" stroke="#C42B1C" stroke-width="2.8" stroke-linecap="round"/>
        </svg>`)}}getState(){return this.state}flashOk(e=2e3){this.flashTimer&&clearTimeout(this.flashTimer),this.setState("ok"),this.flashTimer=window.setTimeout(()=>{this.state==="ok"&&this.setState("idle")},e)}flashError(e=2500){this.flashTimer&&clearTimeout(this.flashTimer),this.setState("error"),this.flashTimer=window.setTimeout(()=>{this.state==="error"&&this.setState("idle")},e)}destroy(){window.removeEventListener("mousemove",this.boundMove),this.rafId!==null&&cancelAnimationFrame(this.rafId),this.flashTimer&&clearTimeout(this.flashTimer),this.el?.remove(),this.el=null,document.getElementById("__eqdc_style__")?.remove()}};var ke=class{container=null;currentEl=null;currentTimer=null;currentPersistId=null;lastText="";constructor(){this.injectStyle(),this.createContainer()}injectStyle(){if(document.getElementById("__eqdt_style__"))return;let e=document.createElement("style");e.id="__eqdt_style__",e.textContent=`
      @keyframes __eqdt_in__  { from{opacity:0} to{opacity:1} }
      @keyframes __eqdt_out__ { from{opacity:1} to{opacity:0} }
      .__eqdt_in__  { animation: __eqdt_in__  0.1s ease forwards; }
      .__eqdt_out__ { animation: __eqdt_out__ 0.18s ease forwards; }
    `,document.documentElement.appendChild(e)}createContainer(){this.container=document.createElement("div"),this.container.id="__eqdiscrete_toasts__",Object.assign(this.container.style,{position:"fixed",bottom:"0",right:"0",zIndex:"2147483645",pointerEvents:"none"}),document.documentElement.appendChild(this.container)}makeEl(e){let n=document.createElement("div");return n.className="__eqdt_in__",Object.assign(n.style,{background:"rgba(30,30,30,0.96)",color:"#ffffff",borderRadius:"0",borderTopLeftRadius:"3px",padding:"2px 6px",fontSize:"9.5px",fontFamily:'system-ui,-apple-system,"Segoe UI",sans-serif',fontWeight:"400",lineHeight:"1.4",whiteSpace:"nowrap",maxWidth:"170px",overflow:"hidden",textOverflow:"ellipsis",userSelect:"none",display:"block",boxShadow:"none"}),n.textContent=e,n}show(e,n=3e3,o=!1){if(this.lastText=e,this.clearCurrent(!0),!this.container)return"";let i=this.makeEl(e);this.container.appendChild(i),this.currentEl=i;let a=`t_${Date.now()}`;return i.setAttribute("data-tid",a),o?this.currentPersistId=a:(this.currentTimer=window.setTimeout(()=>this.clearCurrent(!1),n),this.currentPersistId=null),a}flash(e,n=3e3){this.show(e,n)}persist(e){return this.show(e,0,!0)}dismiss(e){this.currentPersistId===e&&(this.clearCurrent(!1),this.currentPersistId=null)}dismissAll(){this.clearCurrent(!0)}replace(e,n){return this.dismiss(e),this.persist(n)}reshow(){this.lastText&&this.show(this.lastText,2e3)}clearCurrent(e){this.currentTimer!==null&&(clearTimeout(this.currentTimer),this.currentTimer=null);let n=this.currentEl;n&&(this.currentEl=null,this.currentPersistId=null,e?n.remove():(n.className="__eqdt_out__",setTimeout(()=>n.remove(),200)))}destroy(){this.clearCurrent(!0),this.container?.remove(),this.container=null,document.getElementById("__eqdt_style__")?.remove()}};var Me=class{el=null;lastMouseX=0;lastMouseY=0;onModelChange;boundMouseMove;boundOutside;autoTimer=null;constructor(e){this.onModelChange=e.onModelChange,this.boundMouseMove=n=>{this.lastMouseX=n.clientX,this.lastMouseY=n.clientY},this.boundOutside=n=>{n instanceof KeyboardEvent&&n.key!=="Escape"||n instanceof MouseEvent&&this.el?.contains(n.target)||this.close()},window.addEventListener("mousemove",this.boundMouseMove,{passive:!0}),this.injectStyle()}injectStyle(){if(document.getElementById("__eqdm_style__"))return;let e=document.createElement("style");e.id="__eqdm_style__",e.textContent=`
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
    `,document.documentElement.appendChild(e)}open(){this.close();let n=te().model,o=[...ve],i=(xe||[]).filter(f=>!o.some(h=>h.id===f.id)),a=document.createElement("div");a.id="__eqdm_menu__",a.setAttribute("role","menu"),a.tabIndex=-1;let s=document.createElement("div");s.className="__eqdm_section__",s.textContent="Modelo Gemini",a.appendChild(s);let c=document.createElement("div");c.className="__eqdm_sep__",a.appendChild(c);let r=(f,h,_)=>{let v=f===n,w=document.createElement("div");w.className="__eqdm_item__",w.setAttribute("role","menuitemradio"),w.setAttribute("aria-checked",v?"true":"false"),w.tabIndex=0;let y=document.createElement("span");y.className="__eqdm_check__",v&&(y.innerHTML=`<svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
          <path d="M1.5 6.5L4.5 9.5L10.5 2.5" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`),w.appendChild(y);let T=document.createElement("span");if(T.className="__eqdm_name__",T.textContent=h,v&&(T.style.fontWeight="500"),w.appendChild(T),_){let $=document.createElement("span");$.className="__eqdm_badge__",$.textContent=_,w.appendChild($)}w.addEventListener("click",()=>{fe({model:f}),this.onModelChange?.(f),this.close()}),w.addEventListener("keydown",$=>{($.key==="Enter"||$.key===" ")&&($.preventDefault(),fe({model:f}),this.onModelChange?.(f),this.close())}),a.appendChild(w)};for(let f of o){let h;f.id.includes("3.8")||f.id.includes("3.7")?h="Novo":f.id.includes("flash-lite")?h="Eco":f.id.includes("pro")&&(h="Pro");let _=f.name.replace(/\s*\(.*?\)\s*/g,"").trim();r(f.id,_,h)}if(i.length>0){let f=document.createElement("div");f.className="__eqdm_sep__",a.appendChild(f);let h=document.createElement("div");h.className="__eqdm_section__",h.textContent="Modelos da conta",a.appendChild(h);for(let _ of i)r(_.id,_.name.replace(/\s*\(.*?\)\s*/g,"").trim())}document.documentElement.appendChild(a),this.el=a;let{offsetWidth:l,offsetHeight:d}=a,g=this.lastMouseX,u=this.lastMouseY,p=window.innerWidth,m=window.innerHeight;g+l+8>p&&(g=p-l-8),u+d+8>m&&(u=m-d-8),g<4&&(g=4),u<4&&(u=4),a.style.left=`${g}px`,a.style.top=`${u}px`,a.focus(),setTimeout(()=>{window.addEventListener("click",this.boundOutside,{capture:!0}),window.addEventListener("keydown",this.boundOutside,{capture:!0})},50),this.autoTimer=window.setTimeout(()=>this.close(),8e3)}close(){this.autoTimer&&(clearTimeout(this.autoTimer),this.autoTimer=null),window.removeEventListener("click",this.boundOutside,{capture:!0}),window.removeEventListener("keydown",this.boundOutside,{capture:!0}),this.el?.remove(),this.el=null}isOpen(){return this.el!==null}destroy(){this.close(),window.removeEventListener("mousemove",this.boundMouseMove),document.getElementById("__eqdm_style__")?.remove()}};var Le=class{el=null;coin;toast;boundEsc;constructor(e,n){this.coin=e,this.toast=n,this.boundEsc=o=>{o.key==="Escape"&&this.isOpen()&&(o.stopPropagation(),o.preventDefault(),this.close())},this.injectStyle()}injectStyle(){if(document.getElementById("__eqkm_style__"))return;let e=document.createElement("style");e.id="__eqkm_style__",e.textContent=`
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
    `,document.documentElement.appendChild(e)}open(){if(this.isOpen()){this.close();return}let n=te().apiKeys.join(`
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
    `,o.appendChild(i),document.documentElement.appendChild(o),this.el=o;let a=i.querySelector("#__eqkm_ta__"),s=i.querySelector("#__eqkm_count__"),c=i.querySelector("#__eqkm_status__");a.value=n,this.updateCount(a.value,s),a.addEventListener("input",()=>this.updateCount(a.value,s)),i.querySelector("#__eqkm_close__").addEventListener("click",()=>this.close()),i.querySelector("#__eqkm_cancel__").addEventListener("click",()=>this.close()),i.querySelector("#__eqkm_save__").addEventListener("click",()=>{let r=this.parseKeys(a.value);fe({apiKey:r[0]||"",apiKeys:r}),this.toast.flash("Config Saved"),this.coin.flashOk(1200),this.close()}),i.querySelector("#__eqkm_verify__").addEventListener("click",async()=>{let r=this.parseKeys(a.value);if(!r.length){c.style.color="#c5221f",c.textContent="Insira ao menos uma chave.";return}c.style.color="#70757a",c.textContent="Verificando\u2026",this.coin.setState("loading");try{let l=te().model,d=await ht(l,r);d.ok?(c.style.color="#137333",c.textContent=`\u2713 Acesso v\xE1lido \u2014 ${d.model}`,this.coin.flashOk(),this.toast.flash("Access OK")):(c.style.color="#c5221f",c.textContent=`\u2717 ${d.message.slice(0,55)}`,this.coin.flashError(),this.toast.flash("Access Denied"))}catch{c.style.color="#c5221f",c.textContent="\u2717 Erro ao verificar.",this.coin.flashError()}}),o.addEventListener("click",r=>{r.target===o&&this.close()}),window.addEventListener("keydown",this.boundEsc,{capture:!0}),requestAnimationFrame(()=>a.focus())}parseKeys(e){return e.split(/[\n\r,]+/).map(n=>n.trim().replace(/^["']|["']$/g,"")).filter(n=>n.length>5)}updateCount(e,n){let o=this.parseKeys(e).length;n.textContent=o===0?"":`${o} chave${o!==1?"s":""} cadastrada${o!==1?"s":""}`}close(){window.removeEventListener("keydown",this.boundEsc,{capture:!0}),this.el?.remove(),this.el=null}isOpen(){return this.el!==null}destroy(){this.close()}};var qe=class{active=[];constructor(){this.injectStyle()}injectStyle(){if(document.getElementById("__eqsh_style__"))return;let e=document.createElement("style");e.id="__eqsh_style__",e.textContent=`
      @keyframes __eqsh_p__ {
        0%,100% { outline-color: rgba(0,120,212,0.15); }
        50%     { outline-color: rgba(0,120,212,0.26); }
      }
      .__eqsh__ {
        outline: 1px solid rgba(0,120,212,0.17) !important;
        outline-offset: 2px !important;
        animation: __eqsh_p__ 2.5s ease-in-out infinite !important;
      }
    `,document.documentElement.appendChild(e)}highlightTarget(e){this.clearAll();for(let n of e)!n||this.active.some(o=>o.el===n)||(this.active.push({el:n,orig:n.style.outline,origOffset:n.style.outlineOffset}),n.classList.add("__eqsh__"))}clearAll(){for(let{el:e,orig:n,origOffset:o}of this.active)e.classList.remove("__eqsh__"),e.style.outline=n,e.style.outlineOffset=o;this.active=[]}destroy(){this.clearAll(),document.getElementById("__eqsh_style__")?.remove()}};var Ie=class{opts;lastSignature="";pollTimer=null;debounceTimer=null;cooldownUntil=0;POLL_MS=700;DEBOUNCE_MS=500;COOLDOWN_MS=2500;origPush=history.pushState.bind(history);origReplace=history.replaceState.bind(history);constructor(e){this.opts=e}start(){this.lastSignature=this.getSignature(),this.patchHistory(),window.addEventListener("popstate",this.onUrlChange,{capture:!0,passive:!0}),this.pollTimer=window.setInterval(this.poll,this.POLL_MS)}stop(){this.unpatchHistory(),window.removeEventListener("popstate",this.onUrlChange,{capture:!0}),this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null),this.debounceTimer&&(clearTimeout(this.debounceTimer),this.debounceTimer=null)}resetHash(){this.lastSignature=this.getSignature(),this.cooldownUntil=Date.now()+this.COOLDOWN_MS}patchHistory(){let e=this;history.pushState=function(...n){e.origPush(...n),e.onUrlChange()},history.replaceState=function(...n){e.origReplace(...n),e.onUrlChange()}}unpatchHistory(){history.pushState=this.origPush,history.replaceState=this.origReplace}onUrlChange=()=>{let e=this.getSignature();e&&e!==this.lastSignature&&this.debounce()};poll=()=>{let e=this.getSignature();e&&e!==this.lastSignature&&this.debounce()};getSignature(){try{let e=location.href,n=document.title||"",i=document.querySelector('.question-text, .qtext, [data-question], [class*="question" i] h2, [class*="question" i] h3, [class*="prompt" i], [role="main"], main, article')?.innerText?.trim()?.slice(0,300)||"",a=document.querySelectorAll('input:not([type="hidden"]), textarea, select, [role="radio"], [role="checkbox"], [role="option"], .option-card, [class*="choice" i], [class*="option" i]').length,s=Math.round((document.body?.innerText||"").length/50)*50;return`${e}|${n}|${i}|${a}|${s}`}catch{return""}}debounce(){this.debounceTimer&&clearTimeout(this.debounceTimer);let e=Date.now(),n=e<this.cooldownUntil?Math.max(this.cooldownUntil-e+80,this.DEBOUNCE_MS):this.DEBOUNCE_MS;this.debounceTimer=window.setTimeout(()=>{let o=this.getSignature();o&&o!==this.lastSignature&&(this.lastSignature=o,this.cooldownUntil=Date.now()+this.COOLDOWN_MS,this.opts.onPageAdvance())},n)}};var pn=new Set(["Control","Alt","Meta","Shift","CapsLock","Tab","Escape","F1","F2","F3","F4","F5","F6","F7","F8","F9","F10","F11","F12","PrintScreen","ScrollLock","Pause","Insert","Home","End","PageUp","PageDown","ArrowLeft","ArrowRight","ArrowUp","ArrowDown","ContextMenu","NumLock"]),mn=t=>t.altKey||t.shiftKey&&"QAMZRHIC".includes(t.key.toUpperCase()),fn=Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"value")?.set,gn=Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype,"value")?.set,Oe=class{flow=[];stepIdx=0;state="idle";isExecuting=!1;stepping=!1;pendingClick=!1;lastClickTs=0;coin;toast;highlight;debugOutput;stepTimer=null;charsInserted=new Map;failedSteps=new Set;boundKey;boundClick;constructor(e,n,o,i){this.coin=e,this.toast=n,this.highlight=o,this.debugOutput=i,this.boundKey=this.onKey.bind(this),this.boundClick=this.onClick.bind(this)}setDebugOutput(e){this.debugOutput=e}start(e){this.abort(),e?.length&&(this.flow=e,this.stepIdx=0,this.charsInserted.clear(),this.failedSteps.clear(),this.state="idle",this.isExecuting=!1,this.stepping=!1,this.pendingClick=!1,this.debugOutput?.setFlow(e),this.attach(),this.gotoStep(0))}abort(){let e=this.isActive();this.state="aborted",this.isExecuting=!1,this.stepping=!1,this.pendingClick=!1,this.detach(),this.clearTimer(),this.highlight.clearAll(),e&&(this.coin.flashError(800),this.toast.flash("Abortado"),this.debugOutput?.log("FLOW","Fluxo abortado pelo usu\xE1rio"))}isActive(){return this.state==="waiting_key"||this.state==="waiting_click"}getState(){return this.state}getCurrentStep(){return this.stepIdx}getTotalSteps(){return this.flow.length}attach(){window.addEventListener("keydown",this.boundKey,{capture:!0}),window.addEventListener("click",this.boundClick,{capture:!0})}detach(){window.removeEventListener("keydown",this.boundKey,{capture:!0}),window.removeEventListener("click",this.boundClick,{capture:!0})}gotoStep(e){if(this.isExecuting=!1,this.stepping=!1,this.pendingClick=!1,this.clearTimer(),this.highlight.clearAll(),e>=this.flow.length){this.complete();return}this.stepIdx=e;let n=this.flow[e];this.state=n.trigger==="key"?"waiting_key":"waiting_click",this.debugOutput?.setStepIndex(e);let o=n.action;if(o.id||o.label||o.from||o.v||o.name||o.n){let a=this.resolveEl(o);if(a&&(this.highlight.highlightTarget([a]),n.trigger==="key")){let s=this.resolveInput(a);try{s?.focus?.()}catch{}}}let i=n.hint||(n.trigger==="key"?"Keyboard Interact":"Mouse Interact");this.toast.flash(i),n.customMsg&&setTimeout(()=>{this.stepIdx===e&&this.isActive()&&this.toast.flash(n.customMsg)},500),this.stepTimer=window.setTimeout(()=>{this.stepIdx===e&&this.isActive()&&this.toast.flash(i)},9e4)}clearTimer(){this.stepTimer!==null&&(clearTimeout(this.stepTimer),this.stepTimer=null)}onKey(e){if(pn.has(e.key)||mn(e))return;if(this.state==="waiting_click"){this.toast.flash("Mouse Interact");return}if(this.state!=="waiting_key"||this.stepping)return;this.debugOutput?.log("KEY",`Gatilho de teclado: "${e.key}" (Passo ${this.stepIdx+1})`);let o=this.flow[this.stepIdx].action;if(o.t!=="val")return;let i=String(o.v??""),a=1;if(i.length===0){this.stepping=!0,this.clearTimer(),this.highlight.clearAll(),this.debugOutput?.markStepSuccess(this.stepIdx,"Texto vazio \u2014 avan\xE7o autom\xE1tico"),setTimeout(()=>this.gotoStep(this.stepIdx+1),40);return}if(this.insertChars(this.stepIdx,o,i,a))this.stepping=!0,this.clearTimer(),this.highlight.clearAll(),this.coin.flashOk(800),this.debugOutput?.markStepSuccess(this.stepIdx,`"${i}" inserido com sucesso`),setTimeout(()=>this.gotoStep(this.stepIdx+1),50);else{let c=this.charsInserted.get(this.stepIdx)??0,r=Math.round(c/i.length*100);this.toast.flash(`${r}%`)}}onClick(e){if(!e.isTrusted)return;let n=e.target;if(!n||n.closest("#__eqdm_menu__,#__eqkm_overlay__,#__eqcm_menu__,#__eqdiscrete_coin__,#__eqdiscrete_toasts__,#__eq_dbg_window__,#__eq_dbg_pill__"))return;if(this.state==="waiting_key"){this.toast.flash("Keyboard Interact");return}if(this.state!=="waiting_click")return;let o=Date.now();if(this.isExecuting){o-this.lastClickTs>80&&(this.pendingClick=!0,this.debugOutput?.log("CLICK",`Clique r\xE1pido enfileirado (Passo ${this.stepIdx+1})`));return}this.lastClickTs=o,this.debugOutput?.log("CLICK",`Gatilho de mouse em <${n.tagName.toLowerCase()}> (Passo ${this.stepIdx+1})`);let i=this.flow[this.stepIdx],a=i.action;if(String(a.t??"")==="adv"){this.clearTimer(),this.highlight.clearAll(),this.debugOutput?.markStepSuccess(this.stepIdx,"Avan\xE7o natural do usu\xE1rio"),setTimeout(()=>this.gotoStep(this.stepIdx+1),80);return}e.preventDefault(),e.stopImmediatePropagation(),this.isExecuting=!0,this.pendingClick=!1,this.execClickAction(a,i).then(c=>{this.clearTimer(),this.highlight.clearAll(),this.isExecuting=!1;let r=this.pendingClick;this.pendingClick=!1,c?this.coin.flashOk(700):(this.failedSteps.add(this.stepIdx),this.coin.flashError(600)),setTimeout(()=>this.gotoStep(this.stepIdx+1),r?20:c?60:30)}).catch(c=>{this.isExecuting=!1,this.pendingClick=!1,this.failedSteps.add(this.stepIdx),this.debugOutput?.markStepFailed(this.stepIdx,`Exce\xE7\xE3o: ${c instanceof Error?c.message:String(c)}`),setTimeout(()=>this.gotoStep(this.stepIdx+1),30)})}async execClickAction(e,n){let o=String(e.t??"");try{if(o==="chk"||o==="clk"){let i=this.resolveEl(e);if(!i)return this.toast.flash("Alvo n\xE3o achado"),this.debugOutput?.markStepFailed(this.stepIdx,`Alvo n\xE3o encontrado: ${JSON.stringify(e)}`),!1;let a=i instanceof HTMLInputElement&&["radio","checkbox"].includes(i.type);if(a||i.getAttribute("role")==="radio"||i.getAttribute("role")==="checkbox"||i.closest('.option-card, [role="radio"], [role="checkbox"], [role="option"], .vf-radio-group, .vf-label')!==null||o==="chk"){let c=a?i:i.querySelector('input[type="radio"], input[type="checkbox"]')||(i.getAttribute("for")?i.ownerDocument.getElementById(i.getAttribute("for")):null),r=c||i,l=r.closest("label"),d=r.id?document.querySelector(`label[for="${P(r.id)}"]`):null,g=l||d||r.closest("td")||r,u=e.c!==void 0?!!e.c:!0;if(oe(r,u),c&&c.checked!==u){try{let m=c._valueTracker;m&&m.setValue(!u)}catch{}try{Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"checked")?.set?.call(c,u)}catch{}c.dispatchEvent(new Event("input",{bubbles:!0,composed:!0})),c.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}if(c&&c.checked!==u&&g&&g!==c&&(V(g),await new Promise(m=>setTimeout(m,16))),c&&c.checked!==u)try{let m=r.getBoundingClientRect(),f=m.left+m.width/2,h=m.top+m.height/2;for(let _ of["pointerdown","mousedown","pointerup","mouseup","click"])r.dispatchEvent(new PointerEvent(_,{bubbles:!0,cancelable:!0,composed:!0,clientX:f,clientY:h,pointerId:1,isPrimary:!0}));await new Promise(_=>setTimeout(_,16))}catch{}if(c&&c.checked!==u){try{c.checked=u}catch{}try{c.click()}catch{}await new Promise(m=>setTimeout(m,8)),c.dispatchEvent(new Event("change",{bubbles:!0}))}if(c){if(c.checked===u)this.debugOutput?.markStepSuccess(this.stepIdx,`[name="${c.name}"] marcado checked=${u}`);else return c.type==="radio"&&c.name&&document.querySelector(`input[name="${P(c.name)}"]:checked`)?(this.debugOutput?.markStepSuccess(this.stepIdx,`Grupo de r\xE1dio [name="${c.name}"] tem sele\xE7\xE3o`),!0):(this.debugOutput?.markStepFailed(this.stepIdx,`[name="${c.name}"] resistiu ap\xF3s 5 estrat\xE9gias`),!1);return!0}return g&&V(g),await new Promise(m=>setTimeout(m,80)),ee({t:e.t,id:String(e.id??e.label??""),c:e.c,v:e.v})?this.debugOutput?.markStepSuccess(this.stepIdx,"Op\xE7\xE3o customizada ativada e verificada no DOM"):(g&&(Ae(g),await new Promise(m=>setTimeout(m,120))),this.debugOutput?.log("WARN","Card custom: DOM n\xE3o confirmou sele\xE7\xE3o \u2014 tentativa via script injection")),!0}return V(i),this.debugOutput?.markStepSuccess(this.stepIdx,`<${i.tagName.toLowerCase()}> ativado`),!0}if(o==="sel"){let i=this.resolveEl(e);if(!i)return this.toast.flash("Alvo n\xE3o achado"),this.debugOutput?.markStepFailed(this.stepIdx,`Select n\xE3o encontrado: ${JSON.stringify(e)}`),!1;let a=i instanceof HTMLSelectElement?i:i.querySelector("select");if(a){let s=String(Array.isArray(e.v)?e.v[0]:e.v??"");for(let r=0;r<a.options.length;r++)if(a.options[r].value===s||a.options[r].text.trim()===s)return a.selectedIndex=r,a.dispatchEvent(new Event("change",{bubbles:!0})),this.debugOutput?.markStepSuccess(this.stepIdx,`Select atualizado para "${s}"`),!0;let c=parseInt(s,10);if(!isNaN(c)&&c>=0&&c<a.options.length)return a.selectedIndex=c,a.dispatchEvent(new Event("change",{bubbles:!0})),this.debugOutput?.markStepSuccess(this.stepIdx,`Select atualizado por \xEDndice ${c}`),!0}return i&&V(i),!!i}if(o==="drag"){let i=String(e.from??e.id??""),a=String(e.to??e.label??""),s=G(i,"source")||M(i),c=G(a,"destination")||M(a);return s&&c?(await me(s,c),this.debugOutput?.markStepSuccess(this.stepIdx,`Arrasto conclu\xEDdo de "${i}" para "${a}"`),!0):(this.toast.flash("Alvo n\xE3o achado"),this.debugOutput?.markStepFailed(this.stepIdx,`Alvo de arrasto n\xE3o achado: from="${i}", to="${a}"`),!1)}if(o==="adv")return this.debugOutput?.markStepSuccess(this.stepIdx,"Avan\xE7o de etapa"),!0}catch(i){return this.toast.flash("Erro exec"),this.debugOutput?.markStepFailed(this.stepIdx,`Erro de execu\xE7\xE3o: ${i instanceof Error?i.message:String(i)}`),!1}return!0}insertChars(e,n,o,i){let a=this.charsInserted.get(e)??0;if(a>=o.length)return!0;let s=this.resolveEl(n);if(!s)return this.toast.flash("Campo n\xE3o achado"),this.debugOutput?.markStepFailed(e,`Campo de texto n\xE3o encontrado: ${JSON.stringify(n)}`),this.charsInserted.set(e,o.length),!0;let c=this.resolveInput(s);if(!c)return this.charsInserted.set(e,o.length),!0;if(c instanceof HTMLInputElement&&(c.type==="number"||c.type==="range")){this.applyValueSlice(c,o,!0),this.charsInserted.set(e,o.length);try{c.blur?.()}catch{}return!0}let l=o.slice(a,a+i),d=a+l.length;if(this.applyValueSlice(c,l,!1),this.charsInserted.set(e,d),d>=o.length){try{c.blur?.()}catch{}return!0}return!1}applyValueSlice(e,n,o=!1){if(e instanceof HTMLInputElement||e instanceof HTMLTextAreaElement){let i=o?n:e.value+n,a=e instanceof HTMLInputElement?fn:gn;a?a.call(e,i):e.value=i,e.dispatchEvent(new Event("input",{bubbles:!0,cancelable:!0})),e.dispatchEvent(new Event("change",{bubbles:!0,cancelable:!0}));try{e.setSelectionRange(i.length,i.length)}catch{}}else if(e.isContentEditable){let i=e;i.textContent=(i.textContent??"")+n,i.dispatchEvent(new Event("input",{bubbles:!0}));try{let a=document.createRange();a.selectNodeContents(i),a.collapse(!1);let s=window.getSelection();s?.removeAllRanges(),s?.addRange(a)}catch{}}}resolveEl(e){let n=String(e.id??"").trim(),o=String(e.v??"").trim(),i=String(e.label??"").trim(),a=String(e.from??"").trim(),s=String(e.name??e.n??"").trim(),r=(o||(i.match(/:\s*(verdadeiro|falso|v|f)\b/i)?.[1]??"")||(n.match(/_(v|f|verdadeiro|falso)$/i)?.[1]??"")).toLowerCase().trim(),l=/^(v|verdadeiro|true|t|1|sim|yes|correto)$/i.test(r)||r.includes("verdadeir"),d=/^(f|falso|false|0|nao|não|no|incorreto|errado)$/i.test(r)||r.includes("fals"),g=l||d,u=l?["v","verdadeiro","true","1","t","sim","correto"]:["f","falso","false","0","n\xE3o","nao","incorreto","errado"];if(s){let f=Array.from(document.querySelectorAll(`input[name="${P(s)}"]`));if(o){let h=f.find(_=>_.value?.toLowerCase()===o.toLowerCase());if(h)return h}if(g){let h=f.find(_=>this.isVfMatch(_,u));if(h)return h}if(f.length>0)return f[0]}let p=null;if(n&&(p=M(n,o,e.t==="val")),!p&&i&&(p=M(i,o,e.t==="val")),!p&&a&&(p=M(a,o,e.t==="val")),g){if(p){if(p instanceof HTMLInputElement&&p.type==="radio"&&p.name){if(this.isVfMatch(p,u))return p;let y=Array.from(document.querySelectorAll(`input[type="radio"][name="${P(p.name)}"]`)).find(T=>this.isVfMatch(T,u));if(y)return y}let h=p.closest('tr, [role="row"], [role="radiogroup"], .vf-row, [class*="row" i], fieldset, td, div')||p,v=Array.from(h.querySelectorAll('input[type="radio"], input[type="checkbox"], [role="radio"], label, td, [class*="choice" i], [class*="option" i]')).find(w=>this.isVfMatch(w,u));if(v)return(v instanceof HTMLInputElement?v:v.querySelector('input[type="radio"]'))||v}let f=(i||n).replace(/:\s*(verdadeiro|falso|v|f)\b/i,"").toLowerCase();if(f){let h=Array.from(document.querySelectorAll('tr, [role="row"], [role="radiogroup"], .vf-row, [class*="row" i], li')),_=E(f).toLowerCase(),v=h.find(w=>{let y=E(w.textContent||"").toLowerCase();return _.length>=3&&y.includes(_)||n&&w.id===n});if(v){let y=Array.from(v.querySelectorAll('input[type="radio"], [role="radio"], label, td')).find(T=>this.isVfMatch(T,u));if(y)return(y instanceof HTMLInputElement?y:y.querySelector('input[type="radio"]'))||y}}}let m=(n||i||o).trim().toLowerCase();if(m){let h=Array.from(document.querySelectorAll('input, label, button, [role="radio"], [role="checkbox"], .option-card, [class*="option" i], [class*="choice" i]')).find(_=>{let v=(_.textContent||"").trim().toLowerCase();return(_.value?String(_.value).trim().toLowerCase():"")===m||v===m||v.startsWith(m+")")||v.startsWith("("+m+")")||m.length>=3&&v.includes(m)});if(h)return h}return p}isVfMatch(e,n){if(!e)return!1;let o=e.value?String(e.value).trim().toLowerCase():"",i=(e.getAttribute("aria-label")||"").trim().toLowerCase(),a=(e.getAttribute("data-value")||"").trim().toLowerCase();if(o&&n.includes(o)||a&&n.includes(a)||i&&n.includes(i))return!0;let s=e.closest('label, td, [class*="option" i], [class*="choice" i]'),c=((e.className||"")+" "+(s?.className||"")).toLowerCase();if(n.includes("v")&&(c.includes("vf-true")||c.includes("true")||c.includes("verdadeiro"))||n.includes("f")&&(c.includes("vf-false")||c.includes("false")||c.includes("falso")))return!0;if(s){let r=E(s.textContent||"").trim().toLowerCase();for(let l of n)if(r===l||r.startsWith(l+" ")||r.endsWith(" "+l)||r.startsWith("("+l+")")||r.startsWith(l+")")||l.length>=4&&r.includes(l))return!0}if(e.id){let r=document.querySelector(`label[for="${P(e.id)}"]`);if(r){let l=E(r.textContent||"").trim().toLowerCase();for(let d of n)if(l===d||l.startsWith(d+" ")||l.endsWith(" "+d)||l.startsWith("("+d+")")||l.startsWith(d+")")||d.length>=4&&l.includes(d))return!0}}return!1}resolveInput(e){return e instanceof HTMLInputElement||e instanceof HTMLTextAreaElement||e.isContentEditable?e:e.querySelector("input:not([type=hidden]):not([type=submit]):not([type=button]):not([type=radio]):not([type=checkbox]),textarea,[contenteditable=true]")??e}async forceStep(e){if(e<0||e>=this.flow.length)return!1;let n=this.flow[e],o=n.action;if(String(o.t??"")==="val"){let a=String(o.v??""),s=this.resolveEl(o);if(!s)return!1;let c=this.resolveInput(s);return c?(this.applyValueSlice(c,a),this.charsInserted.set(e,a.length),this.debugOutput?.markStepSuccess(e,`Texto "${a}" injetado`),!0):!1}return await this.execClickAction(o,n)}async forceAll(){this.toast.flash("Injetando respostas...");let e=0,n=0;for(let o=0;o<this.flow.length;o++){let a=this.flow[o].action;if(a.t==="adv")continue;let s=await this.forceStep(o);await new Promise(l=>setTimeout(l,80));let c={t:a.t,id:String(a.id??a.label??""),c:a.c,v:a.v,name:a.name,from:a.from,to:a.to},r=!1;if(a.t!=="drag"&&a.t!=="val"&&a.t!=="adv")try{r=ee(c)}catch{}else r=s;if(!r&&s&&(a.t==="chk"||a.t==="clk")){let l=this.resolveEl(a);if(l){Ae(l),await new Promise(d=>setTimeout(d,150));try{r=ee(c)}catch{}}if(r)this.debugOutput?.log("FLOW",`Step ${o+1}: recuperado via script injection`);else{this.debugOutput?.markStepFailed(o,"DOM n\xE3o confirmou ap\xF3s script injection"),n++;continue}}r||s?e++:n++}this.debugOutput?.log("FLOW",`forceAll: ${e} sucesso(s), ${n} falha(s)`),this.complete()}complete(){this.state="done",this.isExecuting=!1,this.detach(),this.clearTimer(),this.highlight.clearAll(),this.failedSteps.size>0?(this.coin.flashError(2200),this.toast.flash("Conclu\xEDdo c/ erros"),this.debugOutput?.log("WARN",`Fluxo finalizado com ${this.failedSteps.size} passos que falharam!`)):(this.coin.flashOk(1800),this.toast.flash("Conclu\xEDdo"),this.debugOutput?.log("FLOW","Fluxo finalizado com 100% de sucesso!"))}destroy(){this.isActive()?this.abort():(this.detach(),this.clearTimer())}};var He=class{el=null;lastMouseX=0;lastMouseY=0;boundOutside;boundMouseMove;commands=[];constructor(){this.boundMouseMove=e=>{this.lastMouseX=e.clientX,this.lastMouseY=e.clientY},this.boundOutside=e=>{e instanceof KeyboardEvent&&e.key!=="Escape"||e instanceof MouseEvent&&this.el?.contains(e.target)||this.close()},window.addEventListener("mousemove",this.boundMouseMove,{passive:!0}),this.injectStyle()}setCommands(e){this.commands=e}injectStyle(){if(document.getElementById("__eqcm_style__"))return;let e=document.createElement("style");e.id="__eqcm_style__",e.textContent=`
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
    `,document.documentElement.appendChild(e)}open(){this.close();let e=document.createElement("div");e.id="__eqcm_menu__",e.setAttribute("role","menu"),e.tabIndex=-1;let n=document.createElement("div");n.className="__eqcm_section__",n.textContent="Comandos dispon\xEDveis",e.appendChild(n);let o=document.createElement("div");o.className="__eqcm_sep__",e.appendChild(o);for(let d of this.commands){let g=document.createElement("div");g.className="__eqcm_item__",g.setAttribute("role","menuitem"),g.tabIndex=0;let u=document.createElement("span");u.className="__eqcm_kbd__",u.textContent=d.keys;let p=document.createElement("span");p.className="__eqcm_lbl__",p.textContent=d.label,g.appendChild(u),g.appendChild(p);let m=()=>{this.close(),setTimeout(()=>d.action(),60)};g.addEventListener("click",m),g.addEventListener("keydown",f=>{(f.key==="Enter"||f.key===" ")&&(f.preventDefault(),m())}),e.appendChild(g)}document.documentElement.appendChild(e),this.el=e;let i=240,a=this.commands.length*28+50,s=this.lastMouseX,c=this.lastMouseY,r=window.innerWidth,l=window.innerHeight;s+i+8>r&&(s=r-i-8),c+a+8>l&&(c=l-a-8),s<4&&(s=4),c<4&&(c=4),e.style.left=`${s}px`,e.style.top=`${c}px`,e.focus(),setTimeout(()=>{window.addEventListener("click",this.boundOutside,{capture:!0}),window.addEventListener("keydown",this.boundOutside,{capture:!0})},50)}close(){window.removeEventListener("click",this.boundOutside,{capture:!0}),window.removeEventListener("keydown",this.boundOutside,{capture:!0}),this.el?.remove(),this.el=null}isOpen(){return this.el!==null}destroy(){this.close(),window.removeEventListener("mousemove",this.boundMouseMove),document.getElementById("__eqcm_style__")?.remove()}};var $e=class{el=null;pillEl=null;activeTab="console";activeFilter="all";autoScroll=!0;capturedImages=[];logs=[];logSeq=0;currentPlan=null;currentFlow=[];currentStepIdx=0;stepStatuses=new Map;stepErrors=new Map;modelName="--";latencyMs=0;questionSummary="";promptTokens=0;responseTokens=0;isDragging=!1;dragStartX=0;dragStartY=0;initialLeft=0;initialTop=0;isMinimized=!1;isVisible=!1;boundMouseMove;boundMouseUp;options;constructor(e={}){this.options=e,this.boundMouseMove=this.onMouseMove.bind(this),this.boundMouseUp=this.onMouseUp.bind(this),this.injectStyle(),this.createDom(),window.addEventListener("mousemove",this.boundMouseMove),window.addEventListener("mouseup",this.boundMouseUp),this.log("SYS","Debug Output Discreto pronto (Shift+H para alternar)")}open(){this.isVisible=!0,this.isMinimized&&(this.isMinimized=!1),this.el&&(this.el.style.display="flex",this.clampPosition()),this.pillEl&&(this.pillEl.style.display="none"),this.render()}openTab(e){this.activeTab=e,this.open(),this.el&&this.el.querySelectorAll(".__eq_dbg_tab__").forEach(n=>{let o=n.getAttribute("data-tab")===e;n.classList.toggle("active",o)}),this.render()}close(){this.isVisible=!1,this.isMinimized=!1,this.el&&(this.el.style.display="none"),this.pillEl&&(this.pillEl.style.display="none")}toggle(){!this.isVisible||this.isMinimized?this.open():this.close()}minimize(){this.isVisible&&(this.isMinimized=!0,this.el&&(this.el.style.display="none"),this.pillEl&&(this.pillEl.style.display="flex",this.updatePill()))}restore(){this.isMinimized=!1,this.pillEl&&(this.pillEl.style.display="none"),this.el&&(this.el.style.display="flex",this.clampPosition()),this.render()}isOpen(){return this.isVisible&&!this.isMinimized}log(e,n,o){let i=new Date,a=`${i.getHours().toString().padStart(2,"0")}:${i.getMinutes().toString().padStart(2,"0")}:${i.getSeconds().toString().padStart(2,"0")}.${i.getMilliseconds().toString().padStart(3,"0").slice(0,2)}`,s={id:++this.logSeq,time:a,category:e,msg:n,detail:o};this.logs.push(s),this.logs.length>300&&this.logs.shift(),this.updatePill(),this.isOpen()&&(this.activeTab==="console"&&this.renderConsoleLogs(),this.updateTabCounters())}setImages(e){this.capturedImages=e||[],this.updateTabCounters(),this.isOpen()&&this.activeTab==="media"&&this.renderMedia()}setPlan(e,n="",o=0,i="--",a){this.currentPlan=e,this.questionSummary=(n||"").slice(0,300),this.latencyMs=o,this.modelName=i,a&&(this.capturedImages=a),this.stepStatuses.clear(),this.stepErrors.clear();let s=Array.isArray(e?.actions)?e.actions.length:0;this.log("AI",`Plano recebido: ${s} a\xE7\xF5es planejadas`,JSON.stringify(e?.actions||[],null,2)),(e?.thinking||e?.rationale)&&this.log("AI",`Racioc\xEDnio: ${(e.thinking||e.rationale).slice(0,150)}...`),this.isOpen()&&this.render()}setFlow(e){this.currentFlow=e||[],this.currentStepIdx=0,this.stepStatuses.clear(),this.stepErrors.clear(),e.forEach((n,o)=>{this.stepStatuses.set(o,o===0?"active":"pending")}),this.log("FLOW",`Fluxo carregado com ${e.length} passos de intera\xE7\xE3o`),this.updatePill(),this.isOpen()&&this.render()}setStepIndex(e){this.currentStepIdx=e,this.currentFlow.forEach((o,i)=>{i<e?this.stepStatuses.get(i)!=="failed"&&this.stepStatuses.set(i,"done"):i===e?this.stepStatuses.set(i,"active"):this.stepStatuses.get(i)!=="failed"&&this.stepStatuses.set(i,"pending")});let n=this.currentFlow[e];if(n){let o=n.action,i=o.id||o.name||o.label||o.from||"alvo";this.log("FLOW",`Passo ${e+1}/${this.currentFlow.length} (${n.trigger}): ${o.t??"a\xE7\xE3o"} em "${i}"`)}this.updatePill(),this.isOpen()&&(this.activeTab==="flow"&&this.renderFlow(),this.updateTabCounters())}markStepSuccess(e,n){this.stepStatuses.set(e,"done"),this.log("ACTION",`\u2713 Passo ${e+1} executado com sucesso`,n),this.updatePill(),this.isOpen()&&this.activeTab==="flow"&&this.renderFlow()}markStepFailed(e,n){this.stepStatuses.set(e,"failed"),this.stepErrors.set(e,n),this.log("ERROR",`\u2715 Falha no Passo ${e+1}: ${n}`),this.updatePill(),this.isOpen()&&this.activeTab==="flow"&&this.renderFlow()}onHeaderMouseDown(e){if(!e.target.closest(".__eq_dbg_btn__, .__eq_dbg_tab__")&&(e.preventDefault(),this.isDragging=!0,this.dragStartX=e.clientX,this.dragStartY=e.clientY,this.el)){let n=this.el.getBoundingClientRect();this.initialLeft=n.left,this.initialTop=n.top}}onMouseMove(e){if(!this.isDragging||!this.el)return;let n=e.clientX-this.dragStartX,o=e.clientY-this.dragStartY,i=Math.max(10,window.innerWidth-this.el.offsetWidth-10),a=Math.max(10,window.innerHeight-this.el.offsetHeight-10),s=Math.min(Math.max(10,this.initialLeft+n),i),c=Math.min(Math.max(10,this.initialTop+o),a);this.el.style.left=`${s}px`,this.el.style.top=`${c}px`,this.el.style.right="auto",this.el.style.bottom="auto"}onMouseUp(){this.isDragging=!1}clampPosition(){if(!this.el)return;let e=this.el.getBoundingClientRect(),n=Math.max(10,window.innerWidth-e.width-10),o=Math.max(10,window.innerHeight-e.height-10),i=e.left,a=e.top;(i>n||a>o||i<10||a<10)&&(this.el.style.left=`${Math.min(Math.max(10,i),n)}px`,this.el.style.top=`${Math.min(Math.max(10,a),o)}px`,this.el.style.right="auto",this.el.style.bottom="auto")}render(){if(!this.el)return;this.updateTabCounters();let e=this.el.querySelector(".__eq_dbg_body__");e&&(this.activeTab==="console"?(e.innerHTML=`
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
      `,this.renderConsoleLogs(),this.wireConsoleEvents()):this.activeTab==="flow"?this.renderFlow():this.activeTab==="plan"?this.renderPlan():this.activeTab==="media"?this.renderMedia():this.activeTab==="audit"&&this.renderAudit())}renderConsoleLogs(){let e=this.el?.querySelector("#__eq_dbg_terminal__");if(!e)return;e.innerHTML="";let n=this.logs.filter(o=>this.activeFilter==="all"?!0:this.activeFilter==="error"?o.category==="ERROR"||o.category==="WARN":this.activeFilter==="flow"?o.category==="FLOW"||o.category==="KEY"||o.category==="CLICK":this.activeFilter==="dom"?o.category==="DOM"||o.category==="ACTION":this.activeFilter==="ai"?o.category==="AI":!0);if(n.length===0){e.innerHTML='<div class="__eq_dbg_empty__">Nenhum log correspondente ao filtro.</div>';return}n.forEach(o=>{let i=document.createElement("div");i.className=`__eq_dbg_line__ __eq_cat_${o.category.toLowerCase()}__`;let a=document.createElement("span");a.className=`__eq_dbg_badge__ __eq_bg_${o.category.toLowerCase()}__`,a.textContent=o.category;let s=document.createElement("span");s.className="__eq_dbg_time__",s.textContent=o.time;let c=document.createElement("span");if(c.className="__eq_dbg_msg__",c.textContent=o.msg,i.appendChild(s),i.appendChild(a),i.appendChild(c),o.detail){let r=document.createElement("span");r.className="__eq_dbg_detail_btn__",r.textContent=" [detalhes]",r.onclick=()=>{let l=i.querySelector("pre");if(l)l.remove();else{let d=document.createElement("pre");d.className="__eq_dbg_detail_pre__",d.textContent=o.detail,i.appendChild(d)}},i.appendChild(r)}e.appendChild(i)}),this.autoScroll&&(e.scrollTop=e.scrollHeight)}wireConsoleEvents(){if(!this.el)return;this.el.querySelectorAll(".__eq_dbg_chip__").forEach(i=>{i.addEventListener("click",a=>{let s=a.currentTarget.getAttribute("data-filter");this.activeFilter=s||"all",this.el?.querySelectorAll(".__eq_dbg_chip__").forEach(c=>c.classList.remove("active")),a.currentTarget.classList.add("active"),this.renderConsoleLogs()})});let e=this.el.querySelector("#__eq_dbg_btn_scroll__");e?.addEventListener("click",()=>{this.autoScroll=!this.autoScroll,e.classList.toggle("active",this.autoScroll)});let n=this.el.querySelector("#__eq_dbg_btn_copy__");n?.addEventListener("click",()=>{let i=this.logs.map(a=>`[${a.time}] [${a.category}] ${a.msg}${a.detail?`
${a.detail}`:""}`).join(`
`);navigator.clipboard.writeText(i).then(()=>{n.textContent="\u2713",setTimeout(()=>n.textContent="\u{1F4CB}",1e3)})}),this.el.querySelector("#__eq_dbg_btn_clear__")?.addEventListener("click",()=>{this.logs=[],this.renderConsoleLogs(),this.updateTabCounters()})}renderFlow(){let e=this.el?.querySelector(".__eq_dbg_body__");if(!e)return;if(!this.currentFlow||this.currentFlow.length===0){e.innerHTML=`
        <div class="__eq_dbg_empty__" style="padding:40px 20px;text-align:center;">
          <div style="font-size:24px;margin-bottom:8px;">\u23F8\uFE0F</div>
          <div>Nenhum fluxo de intera\xE7\xE3o ativo no momento.</div>
          <div style="font-size:11px;color:#9aa0a6;margin-top:6px;">Pressione Shift+Q para analisar a p\xE1gina ou aguarde o avan\xE7o autom\xE1tico.</div>
        </div>
      `;return}let n=this.currentFlow.map((i,a)=>{let s=i.action,c=this.stepStatuses.get(a)||(a===this.currentStepIdx?"active":a<this.currentStepIdx?"done":"pending"),r=c==="done"?'<span class="__eq_status_done__">\u2713 Conclu\xEDdo</span>':c==="active"?'<span class="__eq_status_active__">\u25B6 Em Andamento</span>':c==="failed"?'<span class="__eq_status_failed__">\u2715 Falhou</span>':'<span class="__eq_status_pending__">Pendente</span>',l=i.trigger==="key"?"\u2328\uFE0F Tecla":"\u{1F5B1}\uFE0F Clique",d=String(s.t||"act").toUpperCase(),g=s.id?`#${s.id}`:s.name?`[name="${s.name}"]`:s.label||s.from||"alvo",u=s.v!==void 0?` = "${s.v}"`:s.c!==void 0?` (check: ${s.c})`:"";return`
        <div class="__eq_flow_card__ ${c==="active"?"__eq_flow_active__":""}">
          <div class="__eq_flow_header__">
            <span class="__eq_flow_num__">Passo ${a+1}</span>
            <span class="__eq_flow_trigger__">${l}</span>
            <span class="__eq_flow_type__">${d}</span>
            <span class="__eq_flow_status__">${r}</span>
          </div>
          <div class="__eq_flow_content__">
            <div class="__eq_flow_target__">${W(String(g))}<span style="color:#8ab4f8;">${W(String(u))}</span></div>
            <div class="__eq_flow_hint__">${W(i.hint||"")}${i.customMsg?` \u2022 <i style="color:#81c995;">${W(i.customMsg)}</i>`:""}</div>
            ${this.stepErrors.has(a)?`<div class="__eq_flow_err__">Erro: ${W(this.stepErrors.get(a))}</div>`:""}
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
      <div class="__eq_dbg_flow_list__">${n}</div>
    `,e.querySelectorAll(".__eq_btn_exec_step__").forEach(i=>{i.addEventListener("click",async a=>{let s=parseInt(a.currentTarget.getAttribute("data-step")||"0",10);if(this.options.onForceStep){i.textContent="Executando...";let c=await this.options.onForceStep(s);i.textContent=c?"\u2713 Sucesso":"\u2715 Falhou",setTimeout(()=>i.textContent="For\xE7ar Passo",1500)}})});let o=e.querySelector("#__eq_btn_force_all__");o?.addEventListener("click",async()=>{this.options.onForceAllSteps&&(o.textContent="Injetando...",await this.options.onForceAllSteps(),o.textContent="\u2713 Conclu\xEDdo",setTimeout(()=>o.textContent="\u26A1 Injetar Todas as Respostas",1500))})}renderPlan(){let e=this.el?.querySelector(".__eq_dbg_body__");if(!e)return;if(!this.currentPlan){e.innerHTML='<div class="__eq_dbg_empty__">Nenhum plano de IA capturado ainda. Pressione Shift+Q.</div>';return}let n=Math.round((this.currentPlan.confidence||1)*100),o=this.currentPlan.thinking||this.currentPlan.rationale||"Nenhum racioc\xEDnio textual retornado.",i=JSON.stringify(this.currentPlan,null,2);e.innerHTML=`
      <div style="padding:12px;overflow-y:auto;height:100%;box-sizing:border-box;display:flex;flex-direction:column;gap:12px;">
        <div style="display:flex;justify-content:space-between;align-items:center;background:#292a2d;padding:10px 14px;border-radius:6px;border:1px solid #3c4043;">
          <div>
            <div style="font-size:11px;color:#9aa0a6;text-transform:uppercase;font-weight:700;">Modo & Tipo</div>
            <div style="font-size:13px;font-weight:600;color:#8ab4f8;margin-top:2px;">${W(this.currentPlan.mode||"auto")} \u2022 ${W(this.currentPlan.pageType||"question")}</div>
          </div>
          <div style="text-align:right;">
            <div style="font-size:11px;color:#9aa0a6;text-transform:uppercase;font-weight:700;">Confian\xE7a</div>
            <div style="font-size:14px;font-weight:700;color:${n>80?"#81c995":"#fdd663"};margin-top:2px;">${n}%</div>
          </div>
        </div>

        <div>
          <div style="font-size:11px;font-weight:700;color:#9aa0a6;margin-bottom:4px;text-transform:uppercase;">Racioc\xEDnio da IA:</div>
          <div style="background:#1e1f22;border:1px solid #3c4043;border-radius:6px;padding:10px 12px;font-size:12.5px;line-height:1.5;color:#e8eaed;max-height:120px;overflow-y:auto;white-space:pre-wrap;">${W(o)}</div>
        </div>

        <div style="flex:1;display:flex;flex-direction:column;min-height:140px;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
            <span style="font-size:11px;font-weight:700;color:#9aa0a6;text-transform:uppercase;">JSON do Plano Bruto:</span>
            <button class="__eq_dbg_btn__" id="__eq_btn_copy_json__" style="font-size:10px;padding:3px 8px;">Copiar JSON</button>
          </div>
          <pre style="flex:1;background:#1e1f22;border:1px solid #3c4043;border-radius:6px;padding:10px;font-family:'JetBrains Mono','Consolas',monospace;font-size:11px;color:#8ab4f8;overflow:auto;margin:0;">${W(i)}</pre>
        </div>
      </div>
    `,e.querySelector("#__eq_btn_copy_json__")?.addEventListener("click",a=>{navigator.clipboard.writeText(i).then(()=>{let s=a.currentTarget;s.textContent="\u2713 Copiado",setTimeout(()=>s.textContent="Copiar JSON",1200)})})}renderMedia(){let e=this.el?.querySelector(".__eq_dbg_body__");if(!e)return;if(!this.capturedImages||this.capturedImages.length===0){e.innerHTML=`
        <div class="__eq_dbg_empty__" style="padding:40px 20px;text-align:center;">
          <div style="font-size:32px;margin-bottom:8px;">\u{1F5BC}\uFE0F</div>
          <div style="font-size:13px;font-weight:600;color:#e8eaed;">Nenhuma m\xEDdia detectada na quest\xE3o atual</div>
          <div style="font-size:11px;color:#9aa0a6;margin-top:6px;max-width:320px;margin-left:auto;margin-right:auto;line-height:1.5;">
            EasyQuiz varre automaticamente imagens &lt;img&gt;, gr\xE1ficos &lt;svg&gt;, &lt;canvas&gt; e fundos CSS do escopo da quest\xE3o ao analisar (Shift+Q).
          </div>
        </div>
      `;return}let n=this.currentPlan?.imageDescriptions||[],o="";this.capturedImages.forEach((i,a)=>{let s=n.find(m=>m.index===a),c=s?.relevant??!0,r=s?.description??(i.textContext||"Aguardando an\xE1lise da IA..."),l=i.captureStatus==="captured"?"\u2705":i.captureStatus==="text_only"?"\u{1F4DD}":"\u26A0\uFE0F",d=i.captureStatus==="captured"?"Visual":i.captureStatus==="text_only"?"Texto":"Falhou",g=i.base64?`data:${i.mediaType||"image/jpeg"};base64,${i.base64}`:"",u="";g?u=`
          <div style="position:relative;background:#111;border-bottom:1px solid #3c4043;height:120px;display:flex;align-items:center;justify-content:center;overflow:hidden;">
            <img src="${g}"
              style="max-width:100%;max-height:100%;object-fit:contain;cursor:pointer;"
              alt="M\xEDdia ${a+1}"
              title="Clique para ampliar"
              onclick="(function(el){ var ov=document.createElement('div'); ov.style='position:fixed;inset:0;z-index:2147483647;background:rgba(0,0,0,0.92);display:flex;align-items:center;justify-content:center;cursor:zoom-out;'; var img=document.createElement('img'); img.src=el.src; img.style='max-width:95vw;max-height:95vh;border-radius:6px;box-shadow:0 8px 32px rgba(0,0,0,0.8);'; ov.appendChild(img); ov.onclick=function(){ov.remove();}; document.body.appendChild(ov); })(this)"
            >
            <div style="position:absolute;top:6px;right:6px;background:rgba(0,0,0,0.75);border-radius:4px;padding:2px 6px;font-size:10px;font-weight:700;color:#fff;">
              ${l} ${d}
            </div>
          </div>
        `:u=`
          <div style="background:#1e1f22;padding:20px;text-align:center;color:#9aa0a6;font-size:11px;border-bottom:1px solid #3c4043;">
            ${l} ${d} \u2014 sem dados visuais
          </div>
        `;let p=c?'<span style="font-size:9.5px;font-weight:700;padding:1px 6px;border-radius:3px;background:rgba(129,201,149,0.2);border:1px solid rgba(129,201,149,0.4);color:#81c995;">RELEVANTE</span>':'<span style="font-size:9.5px;font-weight:700;padding:1px 6px;border-radius:3px;background:rgba(242,139,130,0.2);border:1px solid rgba(242,139,130,0.4);color:#f28b82;">IGNORADA</span>';o+=`
        <div style="background:#292a2d;border:1px solid #3c4043;border-radius:6px;overflow:hidden;border-left:3px solid ${c?"#81c995":"#5f6368"};">
          ${u}
          <div style="padding:10px 12px;display:flex;flex-direction:column;gap:6px;">
            <div style="display:flex;justify-content:space-between;align-items:center;">
              <span style="font-size:11.5px;font-weight:700;color:#e8eaed;">Imagem ${a+1} (${W(i.source||"inline")})</span>
              ${p}
            </div>
            ${i.associatedLabel?`<div style="font-size:10.5px;color:#8ab4f8;font-weight:500;">${W(i.associatedLabel)}</div>`:""}
            <div style="font-size:11px;color:#bdc1c6;line-height:1.45;background:#1e1f22;padding:6px 8px;border-radius:4px;">
              <strong style="color:#9aa0a6;display:block;font-size:10px;text-transform:uppercase;margin-bottom:2px;">Interpreta\xE7\xE3o da IA:</strong>
              ${W(r)}
            </div>
          </div>
        </div>
      `}),e.innerHTML=`
      <div style="padding:12px;overflow-y:auto;height:100%;box-sizing:border-box;display:flex;flex-direction:column;gap:10px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:2px;">
          <div style="font-size:11px;font-weight:700;color:#9aa0a6;text-transform:uppercase;">
            M\xEDdias Analisadas (${this.capturedImages.length})
          </div>
          <div style="font-size:10.5px;color:#8ab4f8;">Clique em qualquer imagem para ampliar</div>
        </div>
        ${o}
      </div>
    `}renderAudit(){let e=this.el?.querySelector(".__eq_dbg_body__");e&&(e.innerHTML=`
      <div style="padding:14px;overflow-y:auto;height:100%;box-sizing:border-box;display:flex;flex-direction:column;gap:14px;">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
          <div style="background:#292a2d;border:1px solid #3c4043;border-radius:6px;padding:10px 12px;">
            <div style="font-size:10.5px;color:#9aa0a6;text-transform:uppercase;font-weight:700;">Modelo Ativo</div>
            <div style="font-size:13px;font-weight:700;color:#8ab4f8;margin-top:3px;overflow:hidden;text-overflow:ellipsis;">${W(this.modelName)}</div>
          </div>
          <div style="background:#292a2d;border:1px solid #3c4043;border-radius:6px;padding:10px 12px;">
            <div style="font-size:10.5px;color:#9aa0a6;text-transform:uppercase;font-weight:700;">Lat\xEAncia da API</div>
            <div style="font-size:13px;font-weight:700;color:#81c995;margin-top:3px;">${this.latencyMs?`${this.latencyMs} ms`:"--"}</div>
          </div>
        </div>

        <div>
          <div style="font-size:11px;font-weight:700;color:#9aa0a6;margin-bottom:6px;text-transform:uppercase;">Enunciado Capturado:</div>
          <div style="background:#1e1f22;border:1px solid #3c4043;border-radius:6px;padding:10px;font-size:12px;color:#bdc1c6;line-height:1.45;max-height:140px;overflow-y:auto;white-space:pre-wrap;">${W(this.questionSummary||"Nenhum texto capturado.")}</div>
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
    `)}updateTabCounters(){if(!this.el)return;let e=this.el.querySelector("#__eq_cnt_all"),n=this.el.querySelector("#__eq_cnt_err"),o=this.el.querySelector("#__eq_cnt_flow"),i=this.el.querySelector("#__eq_cnt_dom"),a=this.el.querySelector("#__eq_cnt_ai");e&&(e.textContent=String(this.logs.length)),n&&(n.textContent=String(this.logs.filter(r=>r.category==="ERROR"||r.category==="WARN"||r.category==="REPLAN").length)),o&&(o.textContent=String(this.logs.filter(r=>r.category==="FLOW"||r.category==="KEY"||r.category==="CLICK").length)),i&&(i.textContent=String(this.logs.filter(r=>r.category==="DOM"||r.category==="ACTION").length)),a&&(a.textContent=String(this.logs.filter(r=>r.category==="AI").length));let s=this.el.querySelector("#__eq_tab_badge_flow__");s&&(s.textContent=this.currentFlow.length>0?`${this.currentStepIdx+1}/${this.currentFlow.length}`:"0");let c=this.el.querySelector("#__eq_tab_badge_media__");c&&(c.textContent=String(this.capturedImages.length))}updatePill(){if(!this.pillEl)return;let e=this.logs.filter(a=>a.category==="ERROR").length,n=this.currentFlow.length,o=n>0?`${this.currentStepIdx+1}/${n}`:"Idle",i=this.pillEl.querySelector(".__eq_pill_text__");i&&(i.textContent=`EQ Debug: ${o} ${e>0?`(${e} err)`:"\u2022 OK"}`)}createDom(){this.el=document.createElement("div"),this.el.id="__eq_dbg_window__",this.el.style.display="none",this.el.innerHTML=`
      <div class="__eq_dbg_header__">
        <div class="__eq_dbg_tabs__">
          <button class="__eq_dbg_tab__ ${this.activeTab==="console"?"active":""}" data-tab="console">Console</button>
          <button class="__eq_dbg_tab__ ${this.activeTab==="flow"?"active":""}" data-tab="flow">Fluxo <span class="__eq_tab_badge__" id="__eq_tab_badge_flow__">0</span></button>
          <button class="__eq_dbg_tab__ ${this.activeTab==="plan"?"active":""}" data-tab="plan">Plano IA</button>
          <button class="__eq_dbg_tab__ ${this.activeTab==="media"?"active":""}" data-tab="media">M\xEDdias <span class="__eq_tab_badge__" id="__eq_tab_badge_media__">0</span></button>
          <button class="__eq_dbg_tab__ ${this.activeTab==="audit"?"active":""}" data-tab="audit">Auditoria</button>
        </div>
        <div class="__eq_dbg_controls__">
          <button class="__eq_dbg_btn_win__" id="__eq_win_min__" title="Minimizar">_</button>
          <button class="__eq_dbg_btn_win__" id="__eq_win_close__" title="Fechar (Shift+H)">\u2715</button>
        </div>
      </div>
      <div class="__eq_dbg_body__"></div>
    `,this.el.querySelector(".__eq_dbg_header__").addEventListener("mousedown",this.onHeaderMouseDown.bind(this)),this.el.querySelectorAll(".__eq_dbg_tab__").forEach(n=>{n.addEventListener("click",o=>{let i=o.currentTarget.getAttribute("data-tab");this.activeTab=i||"console",this.el?.querySelectorAll(".__eq_dbg_tab__").forEach(a=>a.classList.remove("active")),o.currentTarget.classList.add("active"),this.render()})}),this.el.querySelector("#__eq_win_min__")?.addEventListener("click",()=>this.minimize()),this.el.querySelector("#__eq_win_close__")?.addEventListener("click",()=>this.close()),document.documentElement.appendChild(this.el),this.pillEl=document.createElement("div"),this.pillEl.id="__eq_dbg_pill__",this.pillEl.style.display="none",this.pillEl.innerHTML=`
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
      .__eq_bg_replan__{ background: #4a2800; color: #ffb86c; }

      .__eq_cat_error__ { background: rgba(234,67,53,0.1); }
      .__eq_cat_warn__  { background: rgba(251,188,4,0.06); }
      .__eq_cat_replan__{ background: rgba(255,184,108,0.08); }

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
    `,document.documentElement.appendChild(e)}destroy(){window.removeEventListener("mousemove",this.boundMouseMove),window.removeEventListener("mouseup",this.boundMouseUp),this.el?.remove(),this.pillEl?.remove(),document.getElementById("__eq_dbg_style__")?.remove()}};function W(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}var Ot=`

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
3. Para a\xE7\xE3o "val" (texto/n\xFAmero): use trigger="key" com chars=1. Sempre 1 step por campo val.
   - Inputs de texto: o sistema injeta 1 char por tecla at\xE9 o valor completo.
   - Inputs num\xE9ricos (type=number): o sistema injeta o valor completo na 1\xAA tecla (n\xFAmero negativo, decimal, etc.).
   - Nunca duplique steps para o mesmo campo val.
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
`;function It(t){let e=[],n=1;for(let o of t){let i=o.t;if(i==="val"){let a=String(o.v??""),s=Math.max(1,a.length);for(let c=0;c<s;c++){let r=c===0,l=c===s-1,d=s>1?`${c+1}/${s}`:null;e.push({step:n++,trigger:"key",action:o,chars:1,hint:r?"Keyboard Interact":l?"Buffer Flush":"Key Capture",customMsg:d})}}else i==="chk"||i==="clk"?e.push({step:n++,trigger:"click",action:o,hint:"Mouse Interact",customMsg:null}):i==="sel"?(e.push({step:n++,trigger:"click",action:o,hint:"Mouse Interact",customMsg:"Opening..."}),e.push({step:n++,trigger:"click",action:o,hint:"Option Selected",customMsg:null})):i==="drag"?e.push({step:n++,trigger:"click",action:o,hint:"Mover Item",customMsg:null}):i==="adv"&&e.push({step:n++,trigger:"click",action:o,hint:"Next Page Loading",customMsg:null})}return e}function Ht(t,e){if(!Array.isArray(t)||t.length===0)return It(e);let n=[];for(let o of t){if(!o||typeof o!="object")continue;let i=o,a=i.trigger==="key"?"key":"click",s=i.action||{},c=a==="key"?1:void 0;n.push({step:typeof i.step=="number"?i.step:n.length+1,trigger:a,action:s,chars:c,hint:typeof i.hint=="string"?i.hint.slice(0,30):a==="key"?"Keyboard Interact":"Mouse Interact",customMsg:typeof i.customMsg=="string"?i.customMsg.slice(0,22):null})}return n.length===0?It(e):hn(n,e)}function hn(t,e){let n=[];for(let o=0;o<t.length;o++){let i=t[o],a=i.action;if(!a.t&&e[o]&&(i.action=e[o]),a.t==="chk"&&!a.name&&a.id){let c=String(a.id);if(c.startsWith("eq-")||c.match(/^[a-z0-9]+-[a-z0-9]+-[a-z0-9]+$/))try{let r=document.querySelector(`[data-easyquiz-id="${c}"], #${c}`);r?.name&&(i.action.name=r.name,r.value&&r.value!=="on"&&(i.action.v=r.value))}catch{}}let s=n[n.length-1];if(s){let c=s.action;if(s.trigger===i.trigger&&c.t===a.t&&c.name===a.name&&c.v===a.v&&c.id===a.id)continue}n.push(i)}return n.length>0?n:t}if(window.__eqdiscrete)try{window.__eqdiscrete.destroy()}catch{}_n();function bn(){try{if(document.querySelector("link[data-eqdiscrete-preconnect]"))return;let t=document.createElement("link");t.rel="preconnect",t.href="https://generativelanguage.googleapis.com",t.crossOrigin="anonymous",t.setAttribute("data-eqdiscrete-preconnect","true"),document.head?.appendChild(t)}catch{}}var yn=_e+Ot;async function _n(){bn(),ut();let t=new Ce,e=new ke,n=new qe,o=new Oe(t,e,n),i=new $e({onForceStep:y=>o.forceStep(y),onForceAllSteps:()=>o.forceAll()});o.setDebugOutput(i);let a=new Me({onModelChange:()=>e.flash("Modelo OK")}),s=new Le(t,e),c=new He,r=null,l=!1,d=null,g=new Ie({onPageAdvance:()=>{o.isActive()||l||f(!0)}});g.start();let u=te();u.apiKey&&Ue(u.apiKey).catch(()=>{}),e.flash("EQ Ativo");let p=0,m=[1500,3e3,5e3,8e3];async function f(y=!1,T=0){if(d&&(clearTimeout(d),d=null),r){try{r.abort()}catch{}r=null}o.isActive()&&o.abort();let $=te();if(!$.apiKey){e.flash("Config: Shift+A"),t.flashError(2e3);return}l=!0,p=T,r=new AbortController;let D=r.signal;g.resetHash(),t.setState("loading"),(!y||T>0)&&e.flash(T>0?`Tentativa ${T+1}`:"Analisando"),i.log("SYS",`Iniciando an\xE1lise (proativo: ${y}, retry: ${T})`);function b(){let S=m[Math.min(T,m.length-1)];i.log("WARN",`Agendando retry em ${S}ms`),d=window.setTimeout(()=>{o.isActive()||f(!1,T+1)},S)}try{if(y&&await new Promise(O=>setTimeout(O,700)),D.aborted)return;let S=wt(!1);if(S||(S=We()),!S||!S.questionText?.trim()){t.setState("idle"),T===0&&!y&&e.flash("Sem conte\xFAdo"),i.log("WARN","Nenhum conte\xFAdo ou quest\xE3o detectada na p\xE1gina"),b();return}i.log("DOM",`Contexto detectado: ${S.controls.length} controles, ${S.questionText.length} chars`,S.questionText);let C=await At(S.scope,$.useVision);if(D.aborted)return;i.setImages(C);let L=performance.now(),x=await yt(S,C,$,(O,U)=>i.log(U==="error"?"ERROR":U==="warning"?"WARN":"SYS",`[IA] ${O}`),D,{systemPromptOverride:yn}),k=Math.round(performance.now()-L);if(D.aborted)return;t.setState("idle");let q=x.plan;if(i.log("SYS",`An\xE1lise conclu\xEDda em ${k}ms via ${x.usedModel??$.model} \u2014 pageType: ${q.pageType} | mode: ${q.mode} | ${q.actions?.length??0} a\xE7\xE3o(\xF5es)`),i.setPlan(q,S.questionText,k,$.model,C),q.memoryToStore&&ct(q.memoryToStore),q.imageDescriptions&&q.imageDescriptions.length>0){i.log("AI",`\u{1F5BC}\uFE0F ${q.imageDescriptions.length} imagem(ns) analisadas:`);for(let O of q.imageDescriptions){let U=O.relevant?"\u2705":"\u26A0\uFE0F";i.log(O.relevant?"AI":"WARN",`  ${U} Imagem ${O.index+1} [${O.relevant?"RELEVANTE":"IGNORADA"}]: ${O.description}`)}}if(q.pageType==="conclusion"){e.flash("Sess\xE3o encerrada"),i.log("SYS","P\xE1gina de conclus\xE3o detectada");return}let N=Ht(q.interactionFlow,q.actions||[]);if(i.log("SYS",`Fluxo gerado: ${N.length} step(s) \u2014 ${N.map(O=>`${O.trigger}[${O.action?.t}]`).join(", ")}`),q.pageType==="info"||q.pageType==="start"){if(t.flashOk(1e3),e.flash("Avan\xE7ar \u2192"),i.log("SYS",`P\xE1gina informativa (${q.pageType}) \u2014 aguardando clique do usu\xE1rio para avan\xE7ar`),N.length>0)o.start(N);else{let O=[{step:1,trigger:"click",action:{t:"adv",label:"continuar"},hint:"Clique para avan\xE7ar",customMsg:null}];i.log("SYS","Fluxo adv gerado automaticamente para p\xE1gina informativa"),o.start(O)}return}if(!N.length){i.log("WARN","Plano da IA retornou sem a\xE7\xF5es ou fluxo de intera\xE7\xE3o"),b();return}p=0,t.flashOk(500);let z=N[0];e.flash(z.hint||"Pronto"),z.customMsg&&setTimeout(()=>e.flash(z.customMsg),1400);let F=N.filter(O=>O.action?.t==="drag");if(F.length>0){i.log("FLOW",`\u{1F504} ${F.length} step(s) de drag/categoriza\xE7\xE3o no fluxo. Estrat\xE9gias A-G ser\xE3o tentadas.`);for(let O of F){let U=O.action;i.log("FLOW",`  Drag: "${U.from}" \u2192 "${U.to}"`,JSON.stringify(U))}}o.start(N)}catch(S){if(D.aborted)return;t.setState("idle");let C=S instanceof Error?S.message:String(S);if(i.log("ERROR",`Erro na an\xE1lise: ${C}`),C.includes("403")||C.includes("API key")||C.includes("inv\xE1lida")){e.flash("Acesso negado"),t.flashError();return}if(C.includes("429")||C.includes("Quota")||C.includes("RESOURCE_EXHAUSTED")||C.includes("Todas as tentativas")){C.includes("Todas as tentativas")||T>=4?(e.flash("Limite \u2014 aguarde"),t.flashError(),b()):(e.flash("Chave rotacionando"),t.flashError(300),f(!1,T+1));return}t.flashError(800),b()}finally{r?.signal===D&&(r=null),l=!1}}function h(){if(l){e.flash("Analisando...");return}if(o.isActive()){let y=o.getCurrentStep()+1,T=o.getTotalSteps(),$=o.getState()==="waiting_key"?"Tecla":"Mouse";e.flash(`${y}/${T} ${$}`)}else{let T=te().model.replace("gemini-","").replace("-flash","F").replace("-lite","L").replace("-preview","P");e.flash(`OK \u2014 ${T}`)}}function _(){a.isOpen()&&a.close(),s.isOpen()&&s.close(),c.isOpen()&&c.close(),i.isOpen()&&i.close()}let v=[{keys:"Shift+Q",label:"Analisar p\xE1gina",action:()=>void f()},{keys:"Shift+V",label:"M\xEDdias IA (Vision)",action:()=>{i.openTab("media"),e.flash("M\xEDdias IA")}},{keys:"Shift+M",label:"Trocar modelo",action:()=>a.isOpen()?a.close():a.open()},{keys:"Shift+A",label:"Config API keys",action:()=>s.isOpen()?s.close():s.open()},{keys:"Shift+Z",label:"Abortar fluxo",action:()=>o.isActive()?o.abort():e.flash("Nada ativo")},{keys:"Shift+R",label:"Re-analisar",action:()=>void f()},{keys:"Shift+H",label:"Debug Output",action:()=>i.toggle()},{keys:"Shift+I",label:"\xDAltimo aviso",action:()=>e.reshow()},{keys:"Shift+C",label:"Comandos",action:()=>c.isOpen()?c.close():c.open()},{keys:"Escape",label:"Fechar menus",action:_}];c.setCommands(v);function w(y){let T=y.key;if(y.altKey&&(T==="q"||T==="Q")||y.shiftKey&&T==="Q"){y.preventDefault(),y.stopPropagation(),f();return}if(y.shiftKey&&T==="M"){y.preventDefault(),y.stopPropagation(),a.isOpen()?a.close():a.open();return}if(y.shiftKey&&T==="A"){y.preventDefault(),y.stopPropagation(),s.isOpen()?s.close():s.open();return}if(y.shiftKey&&T==="Z"){if(y.preventDefault(),y.stopPropagation(),r){try{r.abort()}catch{}r=null}d&&(clearTimeout(d),d=null),o.isActive()?o.abort():e.flash("Abortado"),l=!1,t.setState("idle");return}if(y.shiftKey&&T==="R"){y.preventDefault(),y.stopPropagation(),f();return}if(y.shiftKey&&T==="H"){y.preventDefault(),y.stopPropagation(),i.toggle();return}if(y.shiftKey&&(T==="V"||T==="v")){y.preventDefault(),y.stopPropagation(),i.openTab("media"),e.flash("M\xEDdias IA");return}if(y.shiftKey&&T==="I"){y.preventDefault(),y.stopPropagation(),e.reshow();return}if(y.shiftKey&&T==="C"){y.preventDefault(),y.stopPropagation(),c.isOpen()?c.close():c.open();return}T==="Escape"&&(a.isOpen()||s.isOpen()||c.isOpen()||i.isOpen())&&(y.stopPropagation(),y.preventDefault(),_())}window.addEventListener("keydown",w,{capture:!0}),window.__eqdiscrete={analyze:()=>f(),destroy:()=>{window.removeEventListener("keydown",w,{capture:!0}),d&&clearTimeout(d),o.destroy(),i.destroy(),a.destroy(),s.destroy(),c.destroy(),g.stop(),t.destroy(),e.destroy(),n.clearAll(),delete window.__eqdiscrete}}}})();
