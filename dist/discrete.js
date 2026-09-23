/* EasyQuiz Discreto v3.4.9 — Modo Stealth sem interface
 * 100% Client-side. Direct Google Gemini REST API.
 */
"use strict";(()=>{var se={apiKey:"",apiKeys:[],model:"gemini-3.5-flash-lite",uiMode:"easy",modeHint:"",engine:"smart",dryRun:!1,autoApply:!0,autoAdvance:!1,hostDarkMode:!0,useVision:!0,confidenceThreshold:.8,toastStacking:!0};function ue(t){if(!t||typeof t!="string")return!1;let e=t.toLowerCase().trim().replace(/^models\//,"");if(!e.includes("gemini"))return!1;let o=["imagen","image","veo","omni","video","embedding","embed","tts","audio","speech","voice","sound","live","transcribe","bidi","aqa","learnlm","deep-research","computer-use","robotics","rt-1","rt-2","mediapipe","cyber","latest","-ultra","experimental"];for(let n of o)if(e.includes(n))return!1;return!(!e.includes("flash")&&!e.includes("pro"))}var pt="easyquiz_settings_v2",ct="easyquiz_activity_metrics";function oe(){try{let t=localStorage.getItem(pt);if(!t){let r=localStorage.getItem("easyquiz_settings_v1");if(r){let s=JSON.parse(r);return{...se,apiKey:s.apiKey||""}}return{...se}}let e=JSON.parse(t),o=typeof e.model=="string"&&ue(e.model)?e.model:se.model,n=Array.isArray(e.apiKeys)?e.apiKeys.map(r=>typeof r=="string"?r.trim().replace(/^["']|["']$/g,""):"").filter(r=>r.length>5):[],a=typeof e.apiKey=="string"?e.apiKey.trim().replace(/^["']|["']$/g,""):"";if(n.length===0&&a&&(n=[a]),n.length===0)try{let r=localStorage.getItem("easyquiz_api_keys");if(r){let s=JSON.parse(r);Array.isArray(s)&&(n=s.filter(l=>typeof l=="string"&&l.trim().length>5))}}catch{}return{apiKey:n[0]||a||se.apiKey,apiKeys:n,model:o,uiMode:e.uiMode==="easy"||e.uiMode==="advanced"?e.uiMode:se.uiMode,modeHint:e.modeHint??"",engine:e.engine??"smart",dryRun:!!e.dryRun,autoApply:e.autoApply!==void 0?!!e.autoApply:!0,autoAdvance:!!e.autoAdvance,hostDarkMode:e.hostDarkMode!==void 0?!!e.hostDarkMode:!0,useVision:e.useVision!==void 0?!!e.useVision:se.useVision,confidenceThreshold:typeof e.confidenceThreshold=="number"?e.confidenceThreshold:se.confidenceThreshold}}catch{return{...se}}}function Ue(t){try{let e=localStorage.getItem("eq_domain_cache_"+t);if(!e)return{};let o=JSON.parse(e);if(o.advanceSelector&&/inject|injetar/i.test(o.advanceSelector)){o.advanceSelector=void 0;try{localStorage.removeItem("eq_domain_cache_"+t)}catch{}}return o}catch{return{}}}function Xe(t,e){if(e.advanceSelector&&/inject|injetar/i.test(e.advanceSelector))return;let n={...Ue(t),...e};try{localStorage.setItem("eq_domain_cache_"+t,JSON.stringify(n))}catch(a){console.warn("[EasyQuiz] Erro cache de dominio:",a)}}function he(t){let e=oe(),o=Array.isArray(t.apiKeys)?t.apiKeys.map(i=>typeof i=="string"?i.trim().replace(/^["']|["']$/g,""):"").filter(i=>i.length>5):e.apiKeys,n;typeof t.apiKey=="string"?n=t.apiKey.trim().replace(/^["']|["']$/g,""):Array.isArray(t.apiKeys)&&t.apiKeys.length>0?n=o[0]||"":n=e.apiKey,n&&!o.includes(n)&&(o=[n,...o]),o.length>0&&(!n||!o.includes(n))&&(n=o[0]);let a={...e,...t,apiKey:n,apiKeys:o};try{localStorage.setItem(pt,JSON.stringify(a)),localStorage.setItem("easyquiz_api_keys",JSON.stringify(o))}catch(i){console.warn("[EasyQuiz] Falha ao persistir configura\xE7\xF5es no localStorage:",i)}return a}var pe=[],dt=12,Ft=1200;function mt(t){let e=t.trim().replace(/\s+/g," ").slice(0,Ft);e&&!pe.includes(e)&&(pe.push(e),pe.length>dt&&(pe=pe.slice(-dt)))}function ft(){return pe}function gt(){return{startTime:Date.now(),totalElapsedMs:0,completedQuestionsCount:0,averageDurationMs:0,records:[]}}var ut=gt();function ht(){ut=gt();try{sessionStorage.removeItem(ct),localStorage.removeItem(ct)}catch{}return ut}var Ee=`Voc\xEA \xE9 o motor operacional inteligente do EasyQuiz. Sa\xEDda EXCLUSIVA em JSON minificado, sem markdown, sem coment\xE1rios, sem texto fora do JSON.

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

  M. IMAGEM AUSENTE MAS REFERENCIADA NO ENUNCIADO:
    \u2192 Se [TEXTO] menciona "observe", "analise a imagem", "a figura mostra", "de acordo com o gr\xE1fico",
      "veja o diagrama", "considere a imagem", "pela tabela", "no mapa" etc.
      MAS [IMAGENS] est\xE1 vazio, com status "FALHOU" ou "CONTEXTO_TEXTUAL" insuficiente:
    \u2192 NUNCA adivinhe a resposta. Emita confidence: 0.15 m\xE1ximo.
    \u2192 rationale deve indicar: "Imagem do enunciado n\xE3o dispon\xEDvel \u2014 resposta com baixa confian\xE7a"
    \u2192 Ainda assim emita a MELHOR estimativa poss\xEDvel usando o contexto textual e mem\xF3ria.
    \u2192 Se [IMAGEM_RELEVANTE_N\xC3O_CAPTURADA] aparece nas imagens, use todo o contexto textual associado.
    \u2192 memoryToStore: "Quest\xE3o dependia de imagem n\xE3o capturada"
    \u2192 Quando h\xE1 imagem com status FALHOU mas com textContext rico, use esse textContext como substituto.

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
`;function Ut(t,e){return/forms\.(google|gle)\.com|docs\.google\.com\/forms/i.test(t)||e.includes("Qr7Oae")||e.includes("freebirdFormviewer")||e.includes("data-item-id")?"[PLATAFORMA: Google Forms \u2014 use clk nos containers de alternativa; IDs via data-item-id ou texto da op\xE7\xE3o]":/wayground|quizizz/i.test(t)||e.includes("data-functional-selector")?e.includes("classification")||e.toLowerCase().includes("fato")||e.toLowerCase().includes("opini")?`[PLATAFORMA: Wayground/Quizizz CLASSIFICA\xC7\xC3O drag-and-drop]
[RESPOSTAS] ter\xE1 items com t="draggable" e id hexadecimal (ex: 695fa5b6...).
Use EXCLUSIVAMENTE: {t:"drag", from:"ID_hexadecimal_do_card", to:"NOME_DA_CATEGORIA"}
Exemplo: {t:"drag",from:"695fa5b69885555d8155a5ac",to:"FATO"}
Classifique TODOS os items (1 drag por item) antes de emitir adv.
mode: "arrastar_soltar"`:"[PLATAFORMA: Wayground/Quizizz \u2014 alternativas s\xE3o cards clic\xE1veis, use clk]":/khanacademy\.org/i.test(t)||e.includes("perseus")?"[PLATAFORMA: Khan Academy \u2014 widgets Perseus; use js via $eq para widgets interativos se necess\xE1rio]":/moodle|ava\.|classroom\.google/i.test(t)?"[PLATAFORMA: Moodle/AVA/Classroom \u2014 formul\xE1rios padr\xE3o]":/duolingo/i.test(t)?"[PLATAFORMA: Duolingo \u2014 tiles clic\xE1veis, use clk por texto]":/blackboard|canvas\.instructure/i.test(t)?"[PLATAFORMA: Canvas/Blackboard \u2014 quiz-question padr\xE3o]":/socrative|kahoot/i.test(t)?"[PLATAFORMA: Socrative/Kahoot \u2014 alternativas s\xE3o bot\xF5es, use clk]":""}function Ve(t,e,o){let n=t.htmlSnippet.includes("draggable")||t.htmlSnippet.includes("perseus")||t.htmlSnippet.includes("category")||t.htmlSnippet.includes("dropzone")||t.controls.some(b=>b.type==="draggable"||b.type==="dropzone"),a=/katex|latex|\\frac|\\sqrt/i.test(t.htmlSnippet),i=/forms\.(google|gle)\.com|docs\.google\.com\/forms/i.test(t.sourceUrl)||t.htmlSnippet.includes("Qr7Oae")||t.htmlSnippet.includes("data-item-id")||t.htmlSnippet.includes("freebirdFormviewer"),r=(/wayground|quizizz/i.test(t.sourceUrl)||t.htmlSnippet.includes("data-functional-selector"))&&(t.htmlSnippet.includes("classification")||t.controls.filter(b=>b.role==="answer").length===0),s=t.controls.filter(b=>b.role!=="navigation").length===0,l=s||n||i||r||a&&t.questionText.length<60,c=s?4500:r?6e3:1800,u=l?`
[HTML]:
${t.htmlSnippet.slice(0,c).replace(/\s+/g," ")}`:"",g="";if(s&&typeof document<"u")try{let b=Array.from(document.querySelectorAll('input:not([type=hidden]), textarea, select, button, [role="button"], [role="radio"], [role="checkbox"], [role="option"], [onclick], [data-action], a[href]:not([href="#"]), [tabindex]:not([tabindex="-1"])')).filter(y=>{let x=y,w=x.getBoundingClientRect?.()||{width:0,height:0};return w.width>0&&w.height>0&&!x.closest("#easyquiz-shadow-root, .eq-sidebar")}).slice(0,40).map(y=>{let x=y,w=x.tagName.toLowerCase(),k=x.id?`#${x.id}`:"",M=x.className&&typeof x.className=="string"?`.${x.className.trim().split(/\s+/).slice(0,2).join(".")}`:"",P=(x.textContent||x.value||x.getAttribute("aria-label")||"").trim().slice(0,60),v=x.getAttribute("type")||x.getAttribute("role")||"";return`${w}${k}${M}[${v}] txt="${P}"`});b.length>0&&(g=`
[DOM-INTERATIVO]:
${b.join(`
`)}`)}catch{}let d=ft(),m=d.length>0?`
[MEM\xD3RIA]:
${d.join(" | ")}
`:"",p=t.controls.filter(b=>b.role!=="navigation"),f=t.controls.filter(b=>b.role==="navigation"),h=Ut(t.sourceUrl,t.htmlSnippet),A=h?`
${h}
`:"";return`--- AN\xC1LISE ---
[MODO]: ${o.engine} | Dica: ${o.modeHint||"Auto"}
[URL]: ${t.sourceUrl}
[P\xC1GINA]: ${t.pageTitle}${m}${A}
[DADOS]
[TEXTO]:
${t.questionText}${u}${g}

[RESPOSTAS]:
${(()=>{if(p.length===0)return"Nenhuma";let b=p.filter(C=>C.type==="checkbox"||C.type==="chk"),y=new Set(p.filter(C=>C.type==="radio").map(C=>C.name).filter(Boolean)),x=b.filter(C=>!C.name||!y.has(C.name)),w=/selecione as|assinale as|quais das|todas as|marque as|escolha as|quais dessas|quais dos/i.test(t.questionText),k=x.length>=2||w,M=y.size>1||/verdadeir|fals[oa]|\bv\s*\/\s*f\b|julgue|itens/i.test(t.questionText)&&y.size>=1,P=p.every(C=>C.type==="radio"||C.type==="chk")&&y.size===1&&!k&&!M,v=p.filter(C=>C.type==="text"||C.type==="number"||C.type==="val"||C.tag==="input"||C.tag==="textarea"),S=v.length>=2;return(M?`[GRADE VERDADEIRO/FALSO (${y.size||"m\xFAltiplas"} afirma\xE7\xF5es): voc\xEA DEVE julgar e marcar exatamente 1 op\xE7\xE3o (V ou F) para CADA uma das ${y.size} afirma\xE7\xF5es \u2014 emita ${y.size} a\xE7\xF5es chk separadas + adv]
`:k?`[MULTI-SELE\xC7\xC3O: marque TODOS os corretos, pode ser 2 ou mais]
`:P?`[ESCOLHA-\xDAnica: marque APENAS 1 op\xE7\xE3o]
`:S?`[M\xDALTIPLOS CAMPOS DE PREENCHIMENTO (${v.length} campos): emita uma a\xE7\xE3o val para CADA um dos ${v.length} campos abaixo com seu id exato]
`:"")+JSON.stringify(p.map(C=>({id:C.id,t:C.type,n:C.name||void 0,txt:C.label?C.label.length>160?C.label.slice(0,160)+"...":C.label:void 0,v:C.value||void 0,opt:C.options&&C.options.length?C.options.slice(0,20).map(I=>I.label||I.value):void 0})))})()}

[NAVEGA\xC7\xC3O]:
${f.length>0?f.map(b=>`"${b.label||b.id}"[${b.type}]`).join(","):"Nenhuma"}

[IMAGENS E GR\xC1FICOS ANEXADOS (${e.length})]:
${(()=>{if(e.length===0)return/\b(observ[ea]|analis[ea]|figur[a]|gráfic[o]|diagram[a]|image[mn]|mapa|tabela|veja|conforme|de acordo com|pela|ilustra|representa|mostr[a]|exib[ea]|consider[ea]\s+(a|o)\s+(image|figur|gráfic|diagram|tabela|mapa))\b/i.test(t.questionText)?"[AVISO CR\xCDTICO]: O enunciado referencia conte\xFAdo visual (gr\xE1fico/imagem/figura/diagrama) mas NENHUMA imagem foi capturada. Sua confian\xE7a DEVE ser \u22640.15. N\xC3O adivinhe \u2014 use apenas o contexto textual dispon\xEDvel.":"Nenhum anexo visual.";let b=e.filter(M=>M.captureStatus==="failed_relevant"),x=/\b(observ[ea]|analis[ea]|figur[a]|gráfic[o]|diagram[a]|image[mn]|mapa|tabela|veja|conforme|de acordo com|pela|ilustra|representa|mostr[a])\b/i.test(t.questionText),w=e.every(M=>M.captureStatus!=="captured"),k="";return(b.length>0||x&&w)&&(k=`
  [AVISO]: Imagem(s) relevante(s) do enunciado N\xC3O puderam ser capturadas visualmente. Use o contexto textual abaixo como substituto. Confian\xE7a deve ser reduzida.
`),k+e.map((M,P)=>{let v=M.associatedLabel||"Gr\xE1fico da Quest\xE3o",S=M.alt?` | alt: "${M.alt}"`:"";if(M.captureStatus==="failed_relevant")return`  - Imagem ${P+1} [IMAGEM_RELEVANTE_N\xC3O_CAPTURADA]: ${v}${S} | ${M.textContext||"sem contexto adicional"} | src: ${(M.source||"").slice(0,100)}`;if(M.captureStatus==="text_only")return`  - Imagem ${P+1} [CONTEXTO_TEXTUAL]: ${v}${S} | ${M.textContext||"sem contexto adicional"}`;if(M.captureStatus==="captured"||M.base64){let _=M.textContext?` | Textos e r\xF3tulos do gr\xE1fico: "${M.textContext}"`:"";return`  - Imagem ${P+1} [VISUAL_INLINE]: ${v}${S}${_}`}return`  - Imagem ${P+1} [FALHOU]: ${v}${S}`}).join(`
`)})()}
[/DADOS]
Sa\xEDda em JSON v\xE1lido.`}var Xt=new Set(["question","info","start","conclusion"]),Vt=new Set(["texto_livre","escolha_unica","escolha_multipla","verdadeiro_falso","preenchimento","acao_sem_resposta","categorizacao","ordenacao","arrastar_soltar"]),Wt=new Set(["val","chk","sel","clk","adv","js","drag"]),Kt=150,Ae=2e3;function J(t,e=""){return t==null?e:typeof t=="string"?t.trim().slice(0,Ae):typeof t=="number"||typeof t=="boolean"?String(t).trim().slice(0,Ae):e}function Yt(t,e){if(!t||typeof t!="object")return null;let o=t,n=o.t;if(typeof n!="string"||!Wt.has(n))return null;if(n==="adv"){let s=o.id??o.target??o.name??o.selector;return{t:"adv",...J(s)?{id:J(s,"").slice(0,500)}:{}}}if(n==="drag"){let s=J(o.from??o.source),l=J(o.to??o.target??o.destination);return!s||!l?null:{t:"drag",from:s.slice(0,500),to:l.slice(0,500)}}if(n==="js"){let s=J(o.v??o.code??o.script);return!s||s.length>8e3?null:{t:"js",v:s}}let a=o.id??o.target??o.name??o.selector??o.element;(a==null||a==="")&&n==="val"&&(a="1");let i=J(a).slice(0,500);if(!i)return null;if(n==="val"){let s=o.v!==void 0?o.v:o.value!==void 0?o.value:o.val!==void 0?o.val:o.text!==void 0?o.text:o.answer;return{t:"val",id:i,v:J(s).slice(0,Ae)}}if(n==="sel"){let s=o.v!==void 0?o.v:o.value!==void 0?o.value:o.val!==void 0?o.val:o.values,c=(Array.isArray(s)?s:[s]).map(u=>J(u).slice(0,500)).filter(Boolean);return{t:"sel",id:i,v:c}}if(n==="chk"){let s=o.c===!1||o.c==="false"||o.c===0||o.c==="0"||o.c==="off"||o.c==="unchecked"||o.c==="desmarcar",l={t:"chk",id:i,c:!s};return o.v!==void 0&&(l.v=J(o.v).slice(0,Ae)),l}let r={t:"clk",id:i};if(o.c!==void 0){let s=o.c===!1||o.c==="false"||o.c===0||o.c==="0"||o.c==="off"||o.c==="unchecked"||o.c==="desmarcar";r.c=!s}return o.v!==void 0&&(r.v=J(o.v).slice(0,Ae)),Array.isArray(o.co)&&o.co.length===2&&o.co.every(s=>typeof s=="number"&&Number.isFinite(s))&&(r.co=[o.co[0],o.co[1]]),r}function Jt(t,e,o){if(o!=="question")return t;let n=t.filter(i=>i.t==="adv"),a=t.filter(i=>i.t!=="adv");if(e==="escolha_unica"){a=a.filter(r=>!(r.t==="chk"&&r.c===!1||r.t==="clk"&&r.c===!1));let i=a.filter(r=>r.t==="chk"||r.t==="clk");if(i.length>1){let r=a.filter(l=>l.t!=="chk"&&l.t!=="clk"),s=i[i.length-1];a=[...r,s]}}else if(e==="escolha_multipla"){a=a.filter(r=>!(r.t==="chk"&&r.c===!1||r.t==="clk"&&r.c===!1));let i=new Set;a=a.filter(r=>{let s="id"in r&&typeof r.id=="string"?r.id:"";return s?i.has(s)?!1:(i.add(s),!0):!0})}else if(e==="verdadeiro_falso"){let i=new Set,r=[...a].reverse(),s=[];for(let l of r){let c="id"in l&&typeof l.id=="string"?l.id:"";c?i.has(c)||(i.add(c),s.push(l)):s.push(l)}a=s.reverse()}return[...a,...n]}function At(t){if(!t||typeof t!="object")return{pageType:"info",mode:"acao_sem_resposta",confidence:.5,rationale:"Resposta estruturada n\xE3o identificada; avan\xE7ando como informativo.",actions:[{t:"adv"}]};let e=t,o=e.pageType,n=e.mode;(typeof o!="string"||!Xt.has(o))&&(o="question"),(typeof n!="string"||!Vt.has(n))&&(n="escolha_unica");let a=Array.isArray(e.actions)?e.actions:[],i=[];for(let l=0;l<Math.min(a.length,Kt);l++){let c=Yt(a[l],l);c&&i.push(c)}i.some(l=>l.t==="val")&&(n==="escolha_unica"||!e.mode)&&(n="preenchimento"),i.some(l=>l.t==="drag")&&!["categorizacao","arrastar_soltar","ordenacao"].includes(n)&&(n="arrastar_soltar"),i=Jt(i,n,o);let r=i.some(l=>l.t==="adv");o==="conclusion"?i.length=0:o==="info"||o==="start"?r||i.push({t:"adv"}):o==="question"&&!r&&i.push({t:"adv"});let s=typeof e.confidence=="number"&&Number.isFinite(e.confidence)?Math.min(1,Math.max(0,e.confidence)):.85;return{pageType:o,mode:n,confidence:s,rationale:J(e.rationale,"Plano validado e auto-recuperado."),actions:i,...J(e.memoryToStore)?{memoryToStore:J(e.memoryToStore)}:{},...e.needsMoreContext?{needsMoreContext:!!e.needsMoreContext}:{}}}var ne=class{keys=new Map;constructor(e=[]){this.init(e)}init(e){let o=new Map(this.keys);this.keys.clear();let n=e.flatMap(i=>i.split(/[\n\r]+/));Array.from(new Set(n.map(i=>i.trim().replace(/^["']|["']$/g,"")).filter(i=>i.length>5))).forEach((i,r)=>{let s=this.generateId(i),l=o.get(s)||o.get(i);this.keys.set(s,{id:s,key:i,label:l?.label||`Chave ${r+1}`,addedAt:l?.addedAt||Date.now(),lastUsedAt:l?.lastUsedAt,lastLatencyMs:l?.lastLatencyMs,cooldownUntil:l?.cooldownUntil,errorCount:l?.errorCount||0,lastError:l?.lastError,winCount:l?.winCount||0})})}generateId(e){let o=0;for(let a=0;a<e.length;a++)o=(o<<5)-o+e.charCodeAt(a),o|=0;let n=e.slice(-12).replace(/[^a-zA-Z0-9]/g,"").slice(0,6);return`key_${Math.abs(o).toString(36).slice(0,6)}${n}`}static maskKey(e){let o=e.trim().replace(/^["']|["']$/g,"");return o.length<=10?"\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022":`${o.slice(0,6)}...${o.slice(-4)}`}getAllKeys(){let e=Date.now();return Array.from(this.keys.values()).map(o=>{let n=Math.max(0,(o.cooldownUntil||0)-e);return{...o,isCooldown:n>0,remainingCooldownMs:n}})}getHealthyKeys(){let e=Date.now();return Array.from(this.keys.values()).filter(o=>(o.cooldownUntil||0)<=e&&(o.errorCount||0)<50)}getRoundRobinKeys(e=2){let o=Date.now(),n=Array.from(this.keys.values()).filter(i=>(i.errorCount||0)<50);if(n.length===0)return Array.from(this.keys.values()).slice(0,e);let a=n.filter(i=>(i.cooldownUntil||0)<=o);return a.length>0?(a.sort((i,r)=>{let s=i.lastLatencyMs!==void 0?i.lastLatencyMs:99999,l=r.lastLatencyMs!==void 0?r.lastLatencyMs:99999;if(s!==l)return s-l;let c=(i.lastUsedAt||0)-(r.lastUsedAt||0);return c!==0?c:i.addedAt-r.addedAt}),a.slice(0,e)):(n.sort((i,r)=>(i.cooldownUntil||0)-(r.cooldownUntil||0)),n.slice(0,e))}getBestKey(){return this.getRoundRobinKeys(1)[0]?.key||""}getDiverseKeys(e){return this.getRoundRobinKeys(e).map(o=>o.key)}markQuotaHit(e,o=8e3){let n=this.findKeyObj(e);n&&(n.cooldownUntil=Date.now()+o,n.lastError=`Cota tempor\xE1ria atingida (HTTP 429). Cooldown de ${Math.round(o/1e3)}s ativado.`)}markOverloaded(e,o=5e3){let n=this.findKeyObj(e);n&&(n.cooldownUntil=Date.now()+o,n.lastError=`Servidores sobrecarregados (HTTP 503). Cooldown de ${Math.round(o/1e3)}s ativado.`)}markSuccess(e,o){let n=this.findKeyObj(e);n&&(n.lastLatencyMs=o,n.lastUsedAt=Date.now(),n.errorCount=0,n.lastError=void 0,n.cooldownUntil=void 0)}markWinner(e){let o=this.findKeyObj(e);o&&(o.winCount=(o.winCount||0)+1)}markInvalid(e,o){let n=this.findKeyObj(e);n&&(n.errorCount=99,n.lastError=o)}addKey(e,o){let n=e.trim().replace(/^["']|["']$/g,"");if(!n)return{ok:!1,message:"Chave n\xE3o pode ser vazia."};if(n.length<15)return{ok:!1,message:"Chave de API inv\xE1lida ou muito curta."};let a=this.generateId(n);if(this.keys.has(a)||Array.from(this.keys.values()).some(s=>s.key===n))return{ok:!1,message:"Esta chave de API j\xE1 est\xE1 cadastrada."};let r={id:a,key:n,label:o?.trim()||`Chave ${this.keys.size+1}`,addedAt:Date.now(),errorCount:0};return this.keys.set(a,r),{ok:!0,message:"Chave adicionada com sucesso!",keyItem:r}}updateKey(e,o,n){let a=this.keys.get(e);if(!a)return{ok:!1,message:"Chave n\xE3o encontrada."};let i=o.trim().replace(/^["']|["']$/g,"");return!i||i.length<15?{ok:!1,message:"Chave de API inv\xE1lida."}:(a.key=i,n!==void 0&&(a.label=n.trim()),a.errorCount=0,a.cooldownUntil=void 0,a.lastError=void 0,{ok:!0,message:"Chave atualizada com sucesso!"})}removeKey(e){if(this.keys.size<=1)return{ok:!1,message:"Voc\xEA precisa manter pelo menos 1 chave de API cadastrada."};let o=this.findKeyObj(e);return o?(this.keys.delete(o.id),{ok:!0,message:"Chave removida com sucesso."}):{ok:!1,message:"Chave n\xE3o encontrada."}}exportRawKeys(){return Array.from(this.keys.values()).map(e=>e.key)}size(){return this.keys.size}findKeyObj(e){if(this.keys.has(e))return this.keys.get(e);for(let o of this.keys.values())if(o.key===e)return o}},G=new ne;var Ce=[{id:"gemini-3.8-flash",name:"Gemini 3.8 Flash (Mais Inteligente 2026)",description:"Modelo flagship Flash lan\xE7ado em Set/2026. Ultra-r\xE1pido e altamente capaz.",stable:!0},{id:"gemini-3.7-flash",name:"Gemini 3.7 Flash (Agentic)",description:"Alta capacidade para racioc\xEDnio multimodal e workflows ag\xEAnticos.",stable:!0},{id:"gemini-3.6-flash",name:"Gemini 3.6 Flash (Est\xE1vel)",description:"Modelo est\xE1vel e confi\xE1vel com excelente velocidade.",stable:!0},{id:"gemini-3.5-flash",name:"Gemini 3.5 Flash (R\xE1pido)",description:"Modelo de alta performance para tarefas r\xE1pidas.",stable:!0},{id:"gemini-3.5-flash-lite",name:"Gemini 3.5 Flash-Lite (Cota Alta 30 RPM)",description:"Modelo econ\xF4mico de ultra-alta velocidade e maior limite de RPM.",stable:!0},{id:"gemini-3.1-pro",name:"Gemini 3.1 Pro (Racioc\xEDnio Profundo)",description:"Modelo topo de linha para racioc\xEDnio complexo, exatas e matem\xE1tica.",stable:!0},{id:"gemini-2.5-flash",name:"Gemini 2.5 Flash (Ultra R\xE1pido)",description:"Modelo comprovado de baix\xEDssima lat\xEAncia e alta disponibilidade.",stable:!0},{id:"gemini-2.5-pro",name:"Gemini 2.5 Pro (Avan\xE7ado)",description:"Modelo avan\xE7ado para quest\xF5es de alta complexidade.",stable:!0}],vt=["gemini-3.5-flash-lite","gemini-3.5-flash","gemini-3.6-flash","gemini-3.8-flash","gemini-2.5-flash"],Gt={"gemini-2.0-flash":"gemini-3.5-flash","gemini-2.0-flash-lite":"gemini-3.5-flash-lite","gemini-1.5-flash":"gemini-3.5-flash","gemini-1.5-pro":"gemini-3.6-flash","gemini-1.0-pro":"gemini-2.5-flash"};function Je(t){return Gt[t]??t}function Zt(t,e){let n={temperature:0,maxOutputTokens:1350,responseMimeType:"application/json",responseSchema:e??$t};return/lite/i.test(t)||(/gemini-3\.[0-9]+-?flash/i.test(t)?n.thinkingConfig={thinkingBudget:0}:/gemini-2\.5-flash/i.test(t)&&(n.thinkingConfig={thinkingBudget:0})),n}var $t={type:"OBJECT",properties:{pageType:{type:"STRING",enum:["question","info","start","conclusion"]},mode:{type:"STRING",enum:["texto_livre","escolha_unica","escolha_multipla","verdadeiro_falso","preenchimento","acao_sem_resposta","categorizacao","ordenacao","arrastar_soltar"]},confidence:{type:"NUMBER"},rationale:{type:"STRING"},thinking:{type:"STRING"},memoryToStore:{type:"STRING"},imageDescriptions:{type:"ARRAY",items:{type:"OBJECT",properties:{index:{type:"NUMBER"},description:{type:"STRING"},relevant:{type:"BOOLEAN"},associatedLabel:{type:"STRING"}}}},actions:{type:"ARRAY",items:{type:"OBJECT",properties:{t:{type:"STRING",enum:["val","chk","sel","clk","adv","js","drag"]},id:{type:"STRING"},name:{type:"STRING"},label:{type:"STRING"},v:{type:"STRING"},c:{type:"BOOLEAN"},co:{type:"ARRAY",items:{type:"NUMBER"}},from:{type:"STRING"},to:{type:"STRING"}},required:["t"]}}},required:["pageType","mode","confidence","rationale","actions"]};function yt(t){let e=t.trim().replace(/^google\//,"").replace(/^models\//,"");if(!e)return"gemini-3.5-flash-lite";let o=Je(e);return ue(o)?o:(console.warn(`[EasyQuiz] Modelo desconhecido ou inv\xE1lido: "${e}". Verifique se o modelo est\xE1 dispon\xEDvel no Google AI Studio.`),"gemini-3.5-flash-lite")}function Ke(t,e){let o="";try{let n=JSON.parse(t);o=n.error?.message||n.message||""}catch{o=t.slice(0,160)}return/API_KEY_INVALID|API key not valid|key.*invalid|unregistered/i.test(o)?"Chave de API do Gemini inv\xE1lida ou n\xE3o autorizada no Google AI Studio.":/RESOURCE_EXHAUSTED|Quota exceeded|rate limit|quota/i.test(o)||e===429?`Cota do Gemini excedida (HTTP 429): ${o||"Aguarde"}`:e===404?`HTTP 404: ${o||"Modelo ou endpoint n\xE3o encontrado no Google AI Studio"}`:e===503||/overloaded/i.test(o)?`Servidores Google sobrecarregados (HTTP 503): ${o||"Aguardando"}`:o?`Erro Gemini (HTTP ${e}): ${o}`:`Falha na requisi\xE7\xE3o ao Gemini (HTTP ${e}).`}function eo(t){let e=t.trim(),o=e.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);if(o)try{return JSON.parse(o[1].trim())}catch{}try{return JSON.parse(e)}catch{}let n=e.match(/\{[\s\S]*\}/);if(n)try{return JSON.parse(n[0].trim())}catch{}try{let a=e.indexOf("{");if(a!==-1){let i=e.slice(a).trim();i=i.replace(/,\s*\{[^}]*$/,""),i=i.replace(/,\s*$/,"");let r=0,s=0,l=!1,c=!1;for(let g=0;g<i.length;g++){let d=i[g];if(c){c=!1;continue}if(d==="\\"){c=!0;continue}if(d==='"'){l=!l;continue}l||(d==="{"?r++:d==="}"?r=Math.max(0,r-1):d==="["?s++:d==="]"&&(s=Math.max(0,s-1)))}for(l&&(i+='"');s>0;)i+="]",s--;for(;r>0;)i+="}",r--;let u=JSON.parse(i);if(u&&typeof u=="object")return u}}catch{}throw new Error("Falha ao decodificar JSON da IA.")}var _e=(()=>{try{let t=typeof localStorage<"u"?localStorage.getItem("easyquiz_cached_models"):null;if(!t)return null;let e=JSON.parse(t);if(Array.isArray(e)){let o=e.filter(n=>n&&typeof n.id=="string"&&ue(n.id));return o.length>0?o:null}return null}catch{return null}})(),We=new Set;async function Ge(t){let e=t.trim().replace(/^["']|["']$/g,"");if(!e)return Ce;let o=[`https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(e)}`,`https://generativelanguage.googleapis.com/v1/models?key=${encodeURIComponent(e)}`];for(let n of o)try{let a=await fetch(n,{headers:{"Content-Type":"application/json","x-goog-api-key":e}});if(!a.ok){let r=await a.text(),s=Ke(r,a.status);if(s.includes("inv\xE1lida")||s.includes("n\xE3o autorizada"))throw new Error(s);continue}let i=await a.json();if(Array.isArray(i.models)&&i.models.length>0){let r=i.models.filter(s=>{let l=s.supportedGenerationMethods||[],c=(s.name||"").replace(/^models\//,""),u=l.includes("generateContent");return ue(c)&&u}).map(s=>{let l=s.supportedGenerationMethods||[],c=s.name.replace(/^models\//,""),u=s.displayName||c;return{id:c,name:u.includes(c)?u:`${u} (${c})`,description:s.description||"",stable:!/-preview|-experimental|-latest/i.test(c),supportsVision:!/embedding|tts|transcribe|live|image|sound|voice/i.test(c),supportsStructuredOutput:l.includes("generateContent"),supportedGenerationMethods:l,discoveredAt:Date.now()}});if(r.length>0){r.sort((s,l)=>{let c=u=>u==="gemini-3.8-flash"?200:u==="gemini-3.7-flash"?190:u==="gemini-3.6-flash"?180:u==="gemini-3.5-flash"?170:u==="gemini-3.5-flash-lite"?160:u==="gemini-2.5-flash"?130:u.includes("flash")?80:u==="gemini-2.5-pro"?60:u.includes("pro")?50:10;return c(l.id)-c(s.id)}),_e=r;try{typeof localStorage<"u"&&localStorage.setItem("easyquiz_cached_models",JSON.stringify(r))}catch{}return r}}}catch(a){if(a.message?.includes("Chave de API"))throw a}return Ce}async function wt(t,e){let o=e.map(c=>c.trim().replace(/^["']|["']$/g,"")).filter(c=>c.length>5);if(o.length===0)return{ok:!1,model:t,key:"",message:"Nenhuma chave dispon\xEDvel."};let n=Je(yt(t)),a=JSON.stringify({contents:[{role:"user",parts:[{text:"PING"}]}],generationConfig:{maxOutputTokens:5}}),i={"Content-Type":"application/json"};async function r(c,u,g){let d=new AbortController,m=setTimeout(()=>d.abort(),g);try{let p=`https://generativelanguage.googleapis.com/v1beta/models/${u}:generateContent?key=${encodeURIComponent(c)}`,f=await fetch(p,{method:"POST",headers:{...i,"x-goog-api-key":c},body:a,signal:d.signal});if(clearTimeout(m),f.ok)return{ok:!0,model:u,key:c,message:`Modelo '${u}' validado com sucesso!`};let h=await f.text().catch(()=>"");throw new Error(`HTTP ${f.status}: ${h.slice(0,80)}`)}catch(p){throw clearTimeout(m),p}}if(o.length>=2){let c=o.slice(0,6);try{return await Promise.any(c.map(g=>r(g,n,8e3)))}catch{}}let s=o[0],l=[n,...vt.filter(c=>c!==n)];for(let c of l)try{let u=await r(s,c,4e3);return c!==n&&(u.message=`Modelo preferido indispon\xEDvel. Validado via fallback '${c}'.`),u}catch{}return{ok:!1,model:n,key:s,message:"Nenhum modelo Gemini respondeu. Verifique sua chave e cota."}}async function to(t,e,o,n,a){let i=["v1beta","v1"],r=new Error(`Falha ao consultar modelo ${t}`),l={...Zt(t,a)};for(let c of i){if(n.aborted)throw new Error("Opera\xE7\xE3o cancelada pelo usu\xE1rio.");let u=`https://generativelanguage.googleapis.com/${c}/models/${t}:generateContent?key=${encodeURIComponent(e)}`,g=Date.now();try{let d=await fetch(u,{method:"POST",headers:{"Content-Type":"application/json","x-goog-api-key":e},body:JSON.stringify({...o,generationConfig:l}),signal:n});if(!d.ok){let f=await d.text();if(d.status===400){let A=/thinking/i.test(f),b=/response_schema|responseSchema|Repeated map key|PROTO payload/i.test(f);if((A||b)&&(l.thinkingConfig||l.responseSchema)){let y={...l};A&&delete y.thinkingConfig,b&&(delete y.responseSchema,delete y.responseMimeType),l=y;let x=await fetch(u,{method:"POST",headers:{"Content-Type":"application/json","x-goog-api-key":e},body:JSON.stringify({...o,generationConfig:l}),signal:n});if(x.ok){let M=await x.json(),P=M.candidates?.[0];if(P?.content?.parts?.[0]?.text)return G.markSuccess(e,Date.now()-g),{rawText:P.content.parts[0].text,data:M,usedModel:t,usedKey:e}}let w=await x?.text?.().catch(()=>"")??f,k=Ke(w,d.status);throw new Error(`[${t}|${ne.maskKey(e)}] ${k}`)}}let h=Ke(f,d.status);if(d.status===404&&c==="v1beta")continue;throw d.status===429?(G.markQuotaHit(e,8e3),xt(e,t,1e4),new Error(`[${t}|${ne.maskKey(e)}] ${h}`)):(d.status===503||/no capacity|overloaded|unavailable/i.test(f)?(G.markOverloaded(e,5e3),We.add(t)):d.status===403||/API_KEY_INVALID/i.test(f)?G.markInvalid(e,h):d.status===404&&We.add(t),new Error(`[${t}|${ne.maskKey(e)}] ${h}`))}let m=await d.json(),p=m.candidates?.[0];if(!p||!p.content?.parts?.[0]?.text)throw new Error(`[${t}|${ne.maskKey(e)}] A IA n\xE3o retornou uma resposta estruturada v\xE1lida.`);return G.markSuccess(e,Date.now()-g),{rawText:p.content.parts[0].text,data:m,usedModel:t,usedKey:e}}catch(d){if(n.aborted)throw d;r=d;let m=r.message||"";if(m.includes("404")||/no longer available/i.test(m)){We.add(t);break}if(m.includes("429")||m.includes("Quota"))break}}throw r}var Ye=new Map;function bt(t,e){let o=`${t}::${e}`,n=Ye.get(o);return n===void 0?!1:Date.now()>n?(Ye.delete(o),!1):!0}function xt(t,e,o=1e4){Ye.set(`${t}::${e}`,Date.now()+o)}async function Et(t,e,o,n,a,i){if(a?.aborted)throw new Error("Opera\xE7\xE3o cancelada pelo usu\xE1rio.");let r=Array.isArray(o.apiKeys)&&o.apiKeys.length>0?o.apiKeys:o.apiKey?[o.apiKey]:[];G.init(r);let s=o.apiKey.trim().replace(/^["']|["']$/g,""),l=G.getBestKey()||s;if(!l)throw new Error("Nenhuma chave de API do Gemini configurada ou dispon\xEDvel.");let c=yt(o.model);if(!_e&&l&&Ge(l).catch(()=>{}),a?.aborted)throw new Error("Opera\xE7\xE3o cancelada pelo usu\xE1rio.");let u=Date.now(),g=Ve(t,e,o),d=[{text:g}];for(let _=0;_<e.length;_++){let C=e[_],I=C.associatedLabel||(C.alt?`Imagem: ${C.alt}`:`Imagem ${_+1}`);if(C.captureStatus==="text_only"||!C.base64){let O=C.textContext||C.alt||"";d.push({text:`[CONTEXTO_IMAGEM_${_+1} - V\xCDNCULO: ${I}]: ${O}`})}else d.push({text:`[ANEXO VISUAL ${_+1} - V\xCDNCULO: ${I}]:`}),d.push({inline_data:{mime_type:C.mediaType,data:C.base64}})}let m={system_instruction:{parts:[{text:i?.systemPromptOverride??Ee}]},contents:[{role:"user",parts:d}]},p=Je(c),f=vt.filter(_=>_!==p),A=G.getAllKeys().length,b=_=>A<=1||_===0?1:2,y=new Set,x=(_,C)=>{let I=/pro/i.test(_),O=/lite/i.test(_);return I?C===0?18e3:C===1?24e3:3e4:O?C===0?1e4:C===1?14e3:18e3:C===0?16e3:C===1?2e4:25e3},w=async(_,C)=>{if(C.length===0||a?.aborted)return null;let I=C.map(()=>new AbortController),O=()=>I.forEach(H=>{try{H.abort()}catch{}});a?.addEventListener("abort",O,{once:!0});let D=C.map(H=>`${H.model.replace("gemini-","")}/${H.label}`).join(" | ");n?.(`\u26A1 ${_}: ${C.length} slot(s) [${D}]...`,"info");try{let H=C.map(async(Q,R)=>{let j=I[R],de=setTimeout(()=>{try{j.abort(new Error(`Timeout ${Q.timeout/1e3}s (${Q.model}|${Q.label})`))}catch{j.abort()}},Q.timeout);try{let F=await to(Q.model,Q.key,m,j.signal,i?.generationSchemaOverride);clearTimeout(de);let $=At(eo(F.rawText));return $.usedModel=F.usedModel,$.durationMs=Date.now()-u,$.promptSent=g,$.tokensUsed=F.data.usageMetadata?.totalTokenCount,$.promptTokens=F.data.usageMetadata?.promptTokenCount,$.candidatesTokens=F.data.usageMetadata?.candidatesTokenCount,$.rawResponse=F.rawText,I.forEach((lt,Qt)=>{if(Qt!==R)try{lt.abort(new Error("Cancelado: vencedor respondeu."))}catch{lt.abort()}}),{plan:$,rawUsage:F.data.usageMetadata,usedModel:F.usedModel,usedKey:F.usedKey,slotLabel:Q.label}}catch(F){clearTimeout(de);let $=F instanceof Error?F.message:String(F);throw($.includes("429")||$.includes("Quota")||$.includes("RESOURCE_EXHAUSTED"))&&(xt(Q.key,Q.model,1e4),G.markQuotaHit(Q.key,8e3)),F}}),U=await Promise.any(H);return a?.removeEventListener("abort",O),G.markWinner(U.usedKey),U}catch(H){return a?.removeEventListener("abort",O),H instanceof AggregateError&&H.errors.length>0?v=H.errors.map(U=>U instanceof Error?U.message:String(U)).join(" | "):H instanceof Error&&(v=H.message),console.warn(`[EasyQuiz ${_}] Falha na onda:`,v),null}},M=(A<=1?1:1+Math.ceil((A-1)/2))+4,P=0,v="",S=0;for(;P<M;){if(a?.aborted)throw new Error("Opera\xE7\xE3o cancelada pelo usu\xE1rio.");let _=G.getRoundRobinKeys(A),C=_.filter(j=>!y.has(`${j.key}::${p}`)&&!bt(j.key,p)),I,O;if(C.length>0)I=p,O=C;else{let j=f;I=j[S%j.length]||p,S++;let de=_.filter(F=>!y.has(`${F.key}::${I}`)&&!bt(F.key,I));O=de.length>0?de:_.filter(F=>!y.has(`${F.key}::${I}`))}if(O.length===0){if(S<f.length)continue;break}let D=O.slice(0,b(P));if(D.length===0)break;let H=x(I,P),U=D.map(j=>(y.add(`${j.key}::${I}`),{model:I,key:j.key,label:j.label||"Chave",timeout:H})),Q=P===0?"Onda 1":`Onda ${P+1}`,R=await w(Q,U);if(R){let j=R.plan.durationMs||Date.now()-u,de=ne.maskKey(R.usedKey);return n?.(`\u2705 ${j}ms via '${R.usedModel}' (${R.slotLabel}: ${de})`,"info"),R}P++}throw new Error(v||"Todas as tentativas falharam. Verifique suas chaves de API e cotas.")}var me=['input:not([type="hidden"])',"textarea","select","button","a","label",'[role="button"]','[role="link"]','[role="radio"]','[role="checkbox"]','[role="option"]','[role="treeitem"]','[role="menuitemcheckbox"]','[role="menuitemradio"]','[contenteditable="true"]','[draggable="true"]',"[aria-grabbed]","[aria-dropeffect]","[data-widget-type]",".perseus-drag-item",".sortable-item",'[data-testid*="drag" i]','[data-testid*="card" i]','[data-testid*="option" i]','[data-testid*="choice" i]','[data-testid*="category" i]',"[data-choice]","[data-option]","[data-answer]","[data-value]",".quiz-option",".option-card",".choice-card",'[class*="option-card" i]','[class*="choice-card" i]','[class*="option-item" i]','[class*="choice-item" i]','[class*="answer-item" i]','[class*="alternative" i]','li[class*="choice" i]','li[class*="option" i]','li[class*="answer" i]','[data-role="dropzone"]',"[data-category]","[data-item-id]","[data-params][jsmodel]",'[class*="draggable-item" i]','[class*="drag-item" i]','[class*="sortable-card" i]','[class*="card-option" i]','[class*="tile" i][class*="option" i]',".mq-editable-field",".mq-root-block",'[class*="expression-editor" i]','[class*="math-input" i]','[class*="perseus-dropdown" i]','[class*="perseus-radio" i]','[class*="perseus"] [role="listbox"]','[class*="perseus"] [role="radio"]','[class*="perseus"] [role="combobox"]','.perseus-widget-container [role="button"]',".perseus-widget-container input",".perseus-widget-container select",'.number-line [role="slider"]','[class*="interactive-graph" i]'].join(","),ve=/(verificar|checar|check|conferir|validar|próxim[oa]|next|continuar|continue|avançar|prosseguir|enviar|submit|concluir|finalizar|terminar|começar|iniciar|start|vamos lá|próxima tarefa|next task|próxima pergunta|next question|marcar como concluíd[oa]|mostrar resumo|entendi|compreendi|ok|leitura concluída|seguir|ir para o exercício|fazer o teste|próximo artigo|ir para a aula)/i,le=/(\banterior\b|\bvoltar\b|\bback\b|\bprev\b|\bprevious\b|recomeçar|\brestart\b|\breplay\b|\bretornar\b)/i,oo=0;function Ze(t){try{let e=t.closest('[hidden], [style*="display: none"], [style*="display:none"], [aria-hidden="true"]');if(e&&!ee(e))return!1}catch{}try{let e=window.getComputedStyle?window.getComputedStyle(t):t.style;if(e&&(e.display==="none"||e.visibility==="hidden"))return!1}catch{}try{if(typeof t.getBoundingClientRect=="function"){let e=t.getBoundingClientRect();if(e.width>0||e.height>0)return!0}}catch{}return(t.textContent||"").trim().length>0}function N(t){try{if(typeof CSS<"u"&&typeof CSS.escape=="function")return CSS.escape(t)}catch{}return String(t).replace(/["\\]/g,"\\$&")}function T(t){let e=t;if(!e||typeof e.isConnected=="boolean"&&!e.isConnected||ee(e))return!1;let o=e.tagName?.toLowerCase();if(["input","select","textarea","button"].includes(o)){let n=e.type?.toLowerCase();if(n==="checkbox"||n==="radio"){if(e.id)try{let i=e.ownerDocument?.querySelector(`label[for="${N(e.id)}"]`);if(i&&Ze(i))return!0}catch{}let a=e.closest('label, .option-card, .quiz-option, .choice, .answer, [role="radio"], [role="checkbox"], [class*="option" i], [class*="choice" i], [class*="item" i], li, tr');if(a&&a!==e&&Ze(a))return!0}try{if(!e.closest('[hidden], [style*="display: none"], [style*="display:none"], [aria-hidden="true"]')){let i=window.getComputedStyle?window.getComputedStyle(e):e.style;if(!i||i.display!=="none"&&i.visibility!=="hidden"){if(typeof e.getBoundingClientRect=="function"){let r=e.getBoundingClientRect();if(r.width>0||r.height>0)return!0}return!0}}}catch{}}return Ze(e)}function no(t){if(t==null)return"";if(typeof t=="string")return t;if(typeof t=="number"||typeof t=="boolean")return String(t);if(t instanceof Node)return t.textContent||"";try{if(typeof t?.toString=="function"){let e=t.toString();if(typeof e=="string")return e}}catch{}return""}function z(t,e=500){return no(t).replace(/\s+/g," ").trim().slice(0,e)}function io(t){let e=t.dataset.easyquizId;if(e)return e;let o=`eq-${Date.now().toString(36)}-${(oo+=1).toString(36)}`;return t.dataset.easyquizId=o,o}function ee(t){return t?!!(t.closest('#easyquiz-shadow-root, .eq-sidebar, .eq-launcher, [data-easyquiz-ignore="true"], .btn-inject-eq, #btn-inject-script')||t.getAttribute?.("data-easyquiz-ignore")==="true"):!1}var be=/(leaderboard|scoreboard|placar|ranking|trophy|pause|pausar|mute|mutar|audio|sound|som|música|music|configuraç|settings|theme|ajuda|help|report|denunciar|feedback|power-?up|streak|coins|fullscreen|full-screen|read-?aloud|audio-?player|(?:audio|sound|som|media)[-_ ]*volume|volume[-_ ]*(?:slider|control|level|btn|button|icon|mute)|vol-slider)/i;function B(t){if(!t||typeof t.getAttribute!="function"||typeof Element<"u"&&!(t instanceof Element))return!1;if(ee(t))return!0;let e=t.tagName?.toLowerCase();if(["select","textarea"].includes(e)||e==="input"&&!["button","submit","reset"].includes((t.type||"").toLowerCase()))return!1;let n=t.closest?.('button, a, [role="button"], [class*="leaderboard" i], [data-testid*="leaderboard" i], [class*="scoreboard" i], [class*="trophy" i]')||t,a=String(n.getAttribute?.("data-testid")||n.getAttribute?.("data-test-id")||n.getAttribute?.("id")||""),i=String(n.getAttribute?.("aria-label")||""),r=String(n.getAttribute?.("title")||""),s=typeof n.className=="string"?n.className:typeof n.className?.baseVal=="string"?n.className.baseVal:"",l=z(n.textContent,60);return!!(be.test(a)||be.test(i)||be.test(r)||be.test(s)||l.length>0&&l.length<=25&&be.test(l))}function K(t){if(!t||typeof t.getAttribute!="function"||typeof Element<"u"&&!(t instanceof Element)||ee(t)||B(t)||t.closest?.('.option-card, .choice-card, .quiz-option, [class*="option-card" i], [class*="choice-card" i], [class*="option-item" i], [class*="choice-item" i], [class*="answer-item" i], [data-testid*="option" i], [data-testid*="choice" i], [data-choice], [data-option], [data-answer], [role="radio"], [role="checkbox"], [role="option"]')||t.closest?.("header, nav, aside"))return!1;let e=typeof HTMLInputElement<"u"&&t instanceof HTMLInputElement||typeof HTMLButtonElement<"u"&&t instanceof HTMLButtonElement?t.value:"",o=z(t.getAttribute?.("aria-label")||t.textContent||t.getAttribute?.("value")||e),n=t.type,a=o.replace(/[\d\(\)\[\]\u2192>\u2022\-\/\\]+/g," ").trim(),i=String(t.getAttribute?.("data-testid")||t.getAttribute?.("data-test-id")||t.getAttribute?.("id")||t.getAttribute?.("href")||"").toLowerCase();return le.test(a)||le.test(o)?!1:ve.test(a)||ve.test(o)||i.includes("next")||i.includes("check")||i.includes("continue")||i.includes("proximo")||i.includes("forward")?!0:/^\d{1,3}$/.test(o.trim())?!!t.closest?.('[class*="pagination" i], [class*="pager" i], [class*="page-nav" i], [class*="step-indicator" i], [class*="breadcrumb" i], [aria-label*="p\xE1gina" i], [aria-label*="page" i], [role="navigation"], nav, [class*="steps" i]'):!1}function $e(t){let e=t.closest("tr");if(e){let l=e.querySelector("th, td:first-child"),c=l&&l!==t.closest("td")?z(l.textContent,100):"",u=z(t.closest("label, td")?.textContent||"",50);if(c&&u)return`${c}: ${u}`}let o=t.closest('.dropdown-row, [class*="dropdown-row" i], [class*="select-row" i]');if(o){let l=o.querySelector('.dropdown-label, [class*="label" i]'),c=l&&l!==t?z(l.textContent,150):"";if(c)return c}let n=t.getAttribute("aria-label");if(n)return z(n);let a=t.getAttribute("aria-labelledby");if(a){let l=a.split(/\s+/).map(c=>document.getElementById(c)?.textContent).filter(Boolean).join(" ");if(l.trim())return z(l)}if("labels"in t&&t.labels){let l=Array.from(t.labels??[]).map(c=>c.textContent).join(" ");if(l.trim())return z(l)}let i=t.closest('.docssharedWizToggleLabeledContainer, [role="listitem"], .answer, label, .quiz-option, .form-check, .option-card');if(i&&i!==t){let l=z(i.textContent);if(l)return l}let r=t instanceof HTMLInputElement||t instanceof HTMLButtonElement?t.value:"",s=t.getAttribute("placeholder")||t.getAttribute("title")||t.textContent||r||"";return z(s)}function et(t,e){let n=typeof HTMLSelectElement<"u"&&t instanceof HTMLSelectElement||t.tagName.toLowerCase()==="select"?t:null,a=t;t.dataset.easyquizRole=e;let i=t.tagName.toLowerCase(),r=["input","textarea","select","button"].includes(i)?i:"other",s=t.getAttribute("role")||"",l=(t.getAttribute("data-testid")||t.getAttribute("data-test-id")||"").toLowerCase(),c=(t.className&&typeof t.className=="string"?t.className:"").toLowerCase(),u=t.getAttribute("draggable")==="true"||t.classList.contains("perseus-drag-item")||t.classList.contains("sortable-item")||c.includes("cursor-grab")||!!t.getAttribute("aria-grabbed")||/drag|card|option|item/i.test(l)||/drag|card-item|sortable/i.test(c),g=t.getAttribute("data-role")==="dropzone"||t.classList.contains("category-container")||t.hasAttribute("data-category")||!!t.getAttribute("aria-dropeffect")||/drop|category|bucket/i.test(l)||/dropzone|category-box|bucket|target-zone/i.test(c),m=z((u?"draggable":g?"dropzone":"")||a.type||s||r,40),p="";if(a.type==="checkbox"||a.type==="radio"||s==="radio"||s==="checkbox"){let x=a.checked||t.getAttribute("aria-checked")==="true",w=a.value&&a.value!=="on"?a.value:t.getAttribute("data-value")||"";p=x?w?`checked:${w}`:"checked":w||"unchecked"}else if(r==="button"||i==="a"||e==="navigation"||K(t))p="";else{let x=typeof t.value=="string"||typeof t.value=="number"?t.value:"";p=z(x||t.getAttribute("data-category")||"",2e3)}let f=[];if(n&&n.options)for(let x of Array.from(n.options).slice(0,80))f.push({value:z(x.value),label:z(x.textContent)});else if(s==="combobox"||s==="listbox"||c.includes("select")||c.includes("dropdown")){let x=t.getAttribute("aria-controls")||t.getAttribute("aria-owns"),w=x?document.getElementById(x):t;if(w){let k=w.querySelectorAll('[role="option"], li, .dropdown-item, .option');for(let M of Array.from(k).slice(0,80)){let P=z(M.textContent);P&&f.push({value:M.getAttribute("data-value")||M.getAttribute("value")||P,label:P})}}}let h=!!(a.required||t.getAttribute("aria-required")==="true"),A=!!(a.disabled||t.getAttribute("aria-disabled")==="true"),b=io(t);return{id:t.id||b,tag:r,type:m,label:$e(t),name:z(a.name||t.getAttribute("name")||"",180),value:p,options:f,required:h,disabled:A,role:e}}var Ct=['[data-test-id*="exercise" i]','[data-testid*="exercise" i]',".perseus-renderer",".framework-perseus",".Qr7Oae","[data-item-id]",".freebirdFormviewerViewItemsItemItem",".que",".question-holder",".quiz-question",".question_holder",".display_question",'[data-functional-selector*="question"]',".question-container",'[class*="classification-layout" i]','[class*="quiz-container" i]','[data-cy="quiz-container"]',"[data-question-id]",'[data-testid*="question" i]','[class*="question-container" i]','[class*="question" i]','[class*="pergunta" i]','[class*="categoriz" i]',"article","form","section","main"].join(",");function _t(t){if(!T(t))return-1/0;let e=t.getBoundingClientRect(),o=Array.from(t.querySelectorAll(me)).filter(T),n=z(t.innerText||t.textContent||"",4e3).length;if(n<10||!o.length&&n<60)return-1/0;let a=Math.max(1,window.innerWidth*window.innerHeight),i=Math.max(1,e.width*e.height),r=Math.min(1,i/a),s=e.top+e.height/2,l=Math.abs(s-window.innerHeight/2)/Math.max(1,window.innerHeight),c=n>40?35:0,u=e.top>=0&&e.bottom<=window.innerHeight?25:0;return o.length*15+Math.min(60,n/20)+c+u-r*20-l*10}function ke(t){let e=t;if(e.matches?.('article, [data-test-id*="exercise" i], [data-testid*="exercise" i], .perseus-renderer, .framework-perseus, [class*="question-container" i], .que')&&e.tagName.toLowerCase()!=="main"&&e.tagName.toLowerCase()!=="body")return e;for(;e.parentElement&&e.parentElement!==document.body&&e.parentElement!==document.documentElement;){let o=e.parentElement,n=o.tagName.toLowerCase();if(["header","footer","nav","aside"].includes(n))break;if(o.matches?.('article, [data-test-id*="exercise" i], [data-testid*="exercise" i], .perseus-renderer, .framework-perseus, [class*="question-container" i], .que')&&n!=="main"&&n!=="body"){e=o;break}let a=z(e.innerText||e.textContent||"",1e4),i=z(o.innerText||o.textContent||"",1e4),r=e.querySelectorAll(me).length,s=o.querySelectorAll(me).length;if(a.length<150&&i.length>a.length&&s<=r+4&&n!=="main"&&n!=="body"){e=o;continue}break}return e}function kt(t){let e=t,o=e.closest('main, [role="main"], article, form, [data-test-id*="exercise" i], [data-testid*="exercise" i], .framework-perseus, section');if(o&&o!==document.body&&T(o))return o;let n=0;for(;e.parentElement&&e.parentElement!==document.body&&n<3;)e=e.parentElement,n++;return e||document.body}function Z(){let t=document.querySelector('[class*="classification-layout" i], [class*="quiz-container" i][class*="classification" i]');if(t&&T(t))return t;let e=document.activeElement;if(e&&e!==document.body){let r=e.closest(Ct);if(r&&_t(r)>0)return ke(r)}let n=Array.from(document.querySelectorAll(Ct)).map(r=>({element:r,score:_t(r)})).filter(r=>Number.isFinite(r.score)).sort((r,s)=>s.score-r.score),a=n.find(r=>{let s=r.element.tagName.toLowerCase();return s!=="main"&&s!=="body"&&r.score>0});if(a)return ke(a.element);if(n.length>0&&n[0].score>0)return ke(n[0].element);let i=document.querySelector('form, main, [role="main"]');return i&&T(i)?i:document.body}function St(t){let e=t.cloneNode(!0);e.querySelectorAll("script, style, iframe, object, embed, svg, canvas, noscript, audio, video").forEach(n=>n.remove());let o=["type","name","value","role","aria-label","aria-labelledby","aria-checked","aria-required","required","disabled","data-easyquiz-id","draggable","class","id","data-widget-type","data-role","data-category","data-testid"];return e.querySelectorAll("*").forEach(n=>{for(let a of Array.from(n.attributes))o.includes(a.name)||n.removeAttribute(a.name)}),e.outerHTML.replace(/\s+/g," ").slice(0,2e4)}function Se(t){let e=Array.from(t.querySelectorAll(me)),o=new Set,n=[];for(let c of e){if(!T(c)||K(c)||B(c))continue;let u=(c.value||c.textContent||"").trim();if(le.test(u))continue;let g=c.tagName.toLowerCase();["input","textarea","select"].includes(g)&&(o.add(c),n.push(c))}for(let c of e){if(!T(c)||K(c)||B(c))continue;let u=(c.value||c.textContent||"").trim();if(le.test(u))continue;let g=c.tagName.toLowerCase();if(["input","textarea","select"].includes(g))continue;let d=c.querySelector("input, textarea, select");if(!(d&&o.has(d))){if(c.hasAttribute("for")){let m=c.getAttribute("for"),p=m?c.ownerDocument.getElementById(m):null;if(p&&o.has(p))continue}if(g==="a"){let m=c.getAttribute("role"),p=c.getAttribute("class")||"",f=c.getAttribute("data-testid")||"",h=c.getAttribute("draggable")==="true"||c.classList.contains("perseus-drag-item")||c.classList.contains("sortable-item")||p.includes("cursor-grab")||!!c.getAttribute("aria-grabbed")||/drag|card|option|item/i.test(f)||/drag|card-item|sortable/i.test(p);if(!(m==="button"||m==="radio"||m==="checkbox"||m==="option"||h||c.closest('[class*="choice" i], [class*="option" i], [class*="answer" i], [data-testid*="option" i]')))continue}n.push(c)}}let a=n.length>0&&n.every(c=>B(c)||/read-?aloud|audio/i.test(c.getAttribute("data-testid")||c.getAttribute("aria-label")||"")),i=document.body.querySelector('[class*="classification-layout" i]')||document.body.querySelector('[class*="classification" i]')||t,r=document.body.querySelector('[class*="classification" i]')!==null||t.querySelector('[class*="classification" i]')!==null||t.querySelector('[data-cy*="quiz" i]')!==null||t.querySelector('[class*="draggable-item" i]')!==null||t.querySelector('[class*="drag-item" i]')!==null||t.querySelector('[class*="sortable-card" i]')!==null||t.matches?.('[class*="classification" i]');if((n.length===0||a)&&r){a&&(n.length=0);let c=Array.from(i.querySelectorAll('[class*="cursor-grab"][id], [draggable="true"][id], .dnd-card[id]'));if(c.length>0){for(let u of c)if(!(!T(u)||B(u))&&(n.push(u),n.length>=50))break}else{let u=Array.from(i.querySelectorAll("button, div[class], span[class], p, li"));for(let g of u){if(!T(g)||K(g)||B(g)||le.test((g.textContent||"").trim()))continue;let d=(g.textContent||"").trim();if(d.length<2||d.length>300)continue;if(Array.from(g.children).some(p=>p.className&&p.textContent?.trim())||n.push(g),n.length>=50)break}}}let s=n.some(c=>["input","select","textarea"].includes(c.tagName.toLowerCase())),l=!s&&n.length>0&&n.every(c=>{let u=c.tagName.toLowerCase();if(["input","select","textarea","button"].includes(u))return!1;let g=(c.textContent||"").trim();return!c.id||g.length<10||/^\d+\s*\/\s*\d+$/.test(g)||/^question text/i.test(g)});if(n.length===0||l){l&&(n.length=0);let c=Array.from(document.body.querySelectorAll('[class*="cursor-pointer"][id]'));if(c.length>0)for(let u of c){if(!T(u)||ee(u)||K(u)||B(u)||le.test((u.textContent||"").trim()))continue;let g=(u.textContent||"").trim();if(!(g.length<10||g.length>500)&&!/^\d+\s*\/\s*\d+$/.test(g)&&(n.push(u),n.length>=20))break}}if(n.length===0||n.length>0&&!s&&!n.some(c=>c.getAttribute("role")==="radio"||c.getAttribute("role")==="checkbox"||c.classList.contains("mq-editable-field")||c.closest(".perseus-widget-container"))){let u=document.querySelector(".perseus-renderer, .framework-perseus")||t,g=Array.from(u.querySelectorAll('.mq-editable-field, .mq-root-block, [class*="expression-editor" i], [class*="math-input" i]'));for(let h of g)!T(h)||ee(h)||n.includes(h)||n.push(h);let d=Array.from(u.querySelectorAll('[class*="perseus-dropdown" i], .perseus-widget-container select, .perseus-widget-container [role="combobox"], .perseus-widget-container [role="listbox"]'));for(let h of d)!T(h)||ee(h)||n.includes(h)||n.push(h);let m=Array.from(u.querySelectorAll('[class*="perseus-radio" i] [role="radio"], .perseus-widget-container [role="radio"], .perseus-widget-container [role="checkbox"]'));for(let h of m)!T(h)||ee(h)||h.querySelector('input[type="radio"], input[type="checkbox"]')||n.includes(h)||n.push(h);let p=Array.from(u.querySelectorAll('.perseus-widget-container [role="button"], .number-line [role="slider"], [class*="interactive-graph" i] [role="button"]'));for(let h of p)!T(h)||ee(h)||K(h)||n.includes(h)||n.push(h);let f=Array.from(u.querySelectorAll('.perseus-widget-container input:not([type="hidden"]), .perseus-widget-container textarea, .perseus-widget-container select'));for(let h of f)!T(h)||ee(h)||o.has(h)||n.includes(h)||n.push(h)}return n.slice(0,100).map(c=>et(c,"answer"))}function tt(t){let e=[t,t.parentElement,t.parentElement?.parentElement,document.body].filter(Boolean),o=new Set,n=[];for(let a of e)for(let i of Array.from(a.querySelectorAll(me)))if(!(o.has(i)||!T(i)||!K(i)||B(i))&&(o.add(i),n.push(et(i,"navigation")),n.length>=10))return n;return n}function Te(t=!1){let e=Z();e=ke(e),t&&(e=kt(e));let o=Se(e),n=tt(e);if(o.length===0){let s=Se(document.body);s.length>0&&(e=kt(e),o=Se(e),o.length===0&&(o=s,e=document.querySelector('main, article, form, [role="main"]')||document.body))}n.length===0&&(n=tt(document.body));let a=e.innerText&&e.innerText.trim().length>0?e.innerText:e.textContent||"",i=a.length>4e4?z(a.slice(0,8e3),8e3)+`
[...conte\xFAdo extenso truncado...]
`+z(a.slice(-2e3),2e3):z(a,16e3),r=[...o,...n].slice(0,120);return!i||r.length===0&&i.length<30?z(document.body.innerText||document.body.textContent||"",16e3).length>=30?ye():null:{sourceUrl:window.location.href.slice(0,2e3),pageTitle:document.title.slice(0,500)||"P\xE1gina de Quest\xE3o",questionText:i,htmlSnippet:St(e),controls:r,scope:e}}function ye(){let t=document.body.innerText||document.body.textContent||document.documentElement.textContent||"",e=z(t,16e3),o=Se(document.body),n=tt(document.body),a=[...o,...n].slice(0,120),i=document.querySelector('main, article, form, [role="main"], [data-test-id*="content" i], [class*="content" i]')||document.body;return{sourceUrl:window.location.href.slice(0,2e3),pageTitle:document.title.slice(0,500)||"P\xE1gina de Quest\xE3o",questionText:e,htmlSnippet:St(i).slice(0,15e3),controls:a,scope:i}}function Tt(t){let e=t.controls.map(o=>{let n=o.options?o.options.length:0;return`${o.role}:${o.id}:${o.type}:${n}`}).join("|");return[window.location.href,t.pageTitle,t.questionText.slice(0,400),e].join("::")}var Me=10,ao=1400,we=15e5;function ae(t){return new Promise((e,o)=>{let n=new FileReader;n.onerror=()=>o(new Error("Falha ao converter blob para base64.")),n.onload=()=>{let a=String(n.result||"");e(a.split(",")[1]||"")},n.readAsDataURL(t)})}async function ce(t){let e=0,o=0;if(t instanceof HTMLImageElement?(e=t.naturalWidth||t.width,o=t.naturalHeight||t.height):(e=t.width,o=t.height),e<=0||o<=0)throw new Error("Dimens\xF5es inv\xE1lidas.");let n=Math.min(1,ao/Math.max(e,o)),a=Math.max(1,Math.round(e*n)),i=Math.max(1,Math.round(o*n)),r=document.createElement("canvas");r.width=a,r.height=i;let s=r.getContext("2d",{alpha:!1});if(!s)throw new Error("Sem suporte a Canvas 2D.");return s.fillStyle="#ffffff",s.fillRect(0,0,a,i),s.drawImage(t,0,0,a,i),new Promise((l,c)=>{r.toBlob(u=>u?l(u):c(new Error("Falha na compress\xE3o.")),"image/jpeg",.88)})}async function Mt(t){let e=typeof t.getBoundingClientRect=="function"?t.getBoundingClientRect():{width:0,height:0},o=e.width||parseFloat(t.getAttribute("width")||"0")||parseFloat(t.style.width||"0")||400,n=e.height||parseFloat(t.getAttribute("height")||"0")||parseFloat(t.style.height||"0")||300,a=2,i=Math.min(1800,Math.max(120,Math.round(o*a))),r=Math.min(1800,Math.max(100,Math.round(n*a))),s=t.cloneNode(!0);s.getAttribute("xmlns")||s.setAttribute("xmlns","http://www.w3.org/2000/svg"),s.getAttribute("xmlns:xlink")||s.setAttribute("xmlns:xlink","http://www.w3.org/1999/xlink"),s.setAttribute("width",String(i)),s.setAttribute("height",String(r)),!s.getAttribute("viewBox")&&o>0&&n>0&&s.setAttribute("viewBox",`0 0 ${o} ${n}`);try{let d=Array.from(t.querySelectorAll("*")),m=Array.from(s.querySelectorAll("*"));for(let p=0;p<Math.min(d.length,m.length);p++){let f=d[p],h=m[p];if(!f||!h||!h.style)continue;let A=window.getComputedStyle?window.getComputedStyle(f):null;A&&(A.fill&&A.fill!=="none"&&(h.style.fill=A.fill),A.stroke&&A.stroke!=="none"&&(h.style.stroke=A.stroke),A.strokeWidth&&(h.style.strokeWidth=A.strokeWidth),A.fontFamily&&(h.style.fontFamily=A.fontFamily),A.fontSize&&(h.style.fontSize=A.fontSize),A.fontWeight&&(h.style.fontWeight=A.fontWeight),A.color&&(h.style.color=A.color))}}catch{}let l="#ffffff";try{let d=t.parentElement||t;for(;d&&d!==document.documentElement;){let p=(window.getComputedStyle?window.getComputedStyle(d):null)?.backgroundColor;if(p&&p!=="transparent"&&p!=="rgba(0, 0, 0, 0)"){l=p;break}d=d.parentElement}}catch{}let u=new XMLSerializer().serializeToString(s),g="";try{g=btoa(unescape(encodeURIComponent(u)))}catch{}try{let d=h=>new Promise((A,b)=>{let y=new Image,x=setTimeout(()=>b(new Error("Timeout render SVG")),1200);y.onload=()=>{clearTimeout(x),A(y)},y.onerror=()=>{clearTimeout(x),b(new Error("Falha ao renderizar SVG em Image."))},y.src=h}),m=null;if(g)try{m=await d(`data:image/svg+xml;base64,${g}`)}catch{}if(!m){let h=new Blob([u],{type:"image/svg+xml;charset=utf-8"}),A=URL.createObjectURL(h);try{m=await d(A)}finally{URL.revokeObjectURL(A)}}let p=document.createElement("canvas");p.width=i,p.height=r;let f=p.getContext("2d",{alpha:!1});if(f&&m){f.fillStyle=l,f.fillRect(0,0,i,r),f.drawImage(m,0,0,i,r);let h=await new Promise(A=>{p.toBlob(A,"image/jpeg",.92)});if(h){let A=await ae(h);if(A)return{blob:h,base64:A,mediaType:"image/jpeg"}}}}catch{}return{base64:g,mediaType:"image/svg+xml"}}async function Ie(t){try{let e=t.getBoundingClientRect(),o=Math.round(e.width)||t.offsetWidth||400,n=Math.round(e.height)||t.offsetHeight||300;if(o<30||n<30)return null;let a=t.tagName.toLowerCase()==="svg"?t:t.querySelector("svg");if(a&&t.querySelectorAll("input, select, textarea").length===0)try{let f=await Mt(a);if(f.base64&&f.base64.length<=we)return{mediaType:f.mediaType,base64:f.base64,alt:t.getAttribute("aria-label")||a.getAttribute("aria-label")||"Captura de diagrama/gr\xE1fico",source:"visual_snapshot",captureStatus:"captured",textContext:ie(a)}}catch{}if(t instanceof HTMLCanvasElement)try{let f=await ce(t),h=await ae(f);if(h)return{mediaType:"image/jpeg",base64:h,alt:t.getAttribute("aria-label")||"Captura de canvas visual",source:"canvas_snapshot",captureStatus:"captured"}}catch{}let i="#ffffff";try{let f=t;for(;f&&f!==document.documentElement;){let A=(window.getComputedStyle?window.getComputedStyle(f):null)?.backgroundColor;if(A&&A!=="transparent"&&A!=="rgba(0, 0, 0, 0)"){i=A;break}f=f.parentElement}}catch{}let r=t.cloneNode(!0),s=Array.from(t.querySelectorAll("*")),l=Array.from(r.querySelectorAll("*"));for(let f=0;f<Math.min(s.length,l.length);f++){let h=s[f],A=l[f];if(!(!h||!A||!A.style))try{let b=window.getComputedStyle(h);A.style.color=b.color,A.style.backgroundColor=b.backgroundColor,A.style.borderColor=b.borderColor,A.style.borderWidth=b.borderWidth,A.style.borderStyle=b.borderStyle,A.style.fontSize=b.fontSize,A.style.fontFamily=b.fontFamily,A.style.fontWeight=b.fontWeight,A.style.lineHeight=b.lineHeight,A.style.letterSpacing=b.letterSpacing,A.style.textAlign=b.textAlign}catch{}}let c=Math.min(2,Math.max(1,1200/Math.max(o,n))),u=Math.round(o*c),g=Math.round(n*c),d=`
      <svg xmlns="http://www.w3.org/2000/svg" width="${u}" height="${g}" viewBox="0 0 ${o} ${n}">
        <foreignObject width="${o}" height="${n}">
          <div xmlns="http://www.w3.org/1999/xhtml" style="background:${i};width:100%;height:100%;overflow:hidden;box-sizing:border-box;">
            ${r.outerHTML}
          </div>
        </foreignObject>
      </svg>
    `,m=new Blob([d],{type:"image/svg+xml;charset=utf-8"}),p=URL.createObjectURL(m);try{let f=new Image;await new Promise((b,y)=>{let x=setTimeout(()=>y(new Error("Timeout render ForeignObject")),2500);f.onload=()=>{clearTimeout(x),b()},f.onerror=()=>{clearTimeout(x),y(new Error("Falha ao carregar ForeignObject"))},f.src=p});let h=document.createElement("canvas");h.width=u,h.height=g;let A=h.getContext("2d",{alpha:!1});if(A){A.fillStyle=i,A.fillRect(0,0,u,g),A.drawImage(f,0,0,u,g);let b=await new Promise(y=>h.toBlob(y,"image/jpeg",.9));if(b){let y=await ae(b);if(y&&y.length<=we)return{mediaType:"image/jpeg",base64:y,alt:t.getAttribute("aria-label")||"Captura visual da \xE1rea (print-like)",source:"element_snapshot",captureStatus:"captured",textContext:ie(t)}}}}finally{URL.revokeObjectURL(p)}}catch(e){console.warn("[EasyQuiz] Snapshot visual do n\xF3:",e)}return null}function Le(t,e,o,n){if(o<=0||n<=0){let m=typeof t.getBoundingClientRect=="function"?t.getBoundingClientRect():{width:0,height:0};if(o=m.width||o,n=m.height||n,o<=0||n<=0){if(e&&/\b(icon|logo|avatar|badge|emoji|spinner|loading)\b/i.test(e))return!1;let f=t instanceof HTMLImageElement&&t.src||"";return f&&/\/icons?\/|\/logos?\/|\/avatars?\/|\/badges?\//i.test(f)?!1:!!(f||e)}}if(o<48||n<48||Math.max(o,n)/Math.max(1,Math.min(o,n))>15)return!1;let i=t.getAttribute("class")||"",r=t.getAttribute("aria-hidden"),s=t.getAttribute("role"),l=t instanceof HTMLImageElement&&t.src||"",c=!!t.closest('.perseus-renderer, .framework-perseus, [data-test-id*="exercise" i], [data-testid*="exercise" i], .perseus-widget-container, [class*="problem" i], [class*="exercise" i], [data-question], [class*="question-content" i], [class*="stimulus" i], [class*="enunciado" i], [class*="statement" i], figure, .problem, .exercise');if(c&&o>=60&&n>=60)return!0;if(r==="true"&&!c||(s==="presentation"||s==="none")&&!c)return!1;let u=/\b(icon|logo|avatar|badge|emoji|decoration|ornament|spinner|loading|thumbnail|profile|photo)\b/i;if(u.test(i)||e&&u.test(e)||l&&/\/icons?\/|\/logos?\/|\/avatars?\/|\/badges?\/|\/emojis?\//i.test(l)||(e===""||e===" "||e==="-")&&!c)return!1;let g=/\b(graph|chart|diagram|table|map|formula|equation|figure|plot|curve|histogram|scatter|matrix|image|foto|imagem|gráfico|tabela|mapa|fórmula|questão|enunciado|stimulus)\b/i;if(g.test(e)||g.test(i)||t.closest('[data-question], [class*="question" i], [class*="prompt" i], [class*="stimulus" i], [class*="enunciado" i], [class*="statement" i], article, .problem, .exercise'))return!0;try{let m=t.parentElement;if(m){let p=(m.textContent||"").toLowerCase();if(/\?|calcul|determin|observ|analis|image|figur|gráfic|diagram/i.test(p)&&o>=60&&n>=60)return!0}}catch{}return o>=80&&n>=80}function ie(t){let e=[],o=t.getAttribute("alt")||t.getAttribute("aria-label")||t.getAttribute("title")||"";o&&o.length>2&&e.push(`Alt: "${o}"`);let i=t.closest("figure")?.querySelector("figcaption")?.textContent?.trim();i&&i.length>2&&e.push(`Legenda: "${i}"`);let r=t.getAttribute("aria-describedby");if(r){let u=document.getElementById(r)?.textContent?.trim();u&&e.push(`Descri\xE7\xE3o: "${u.slice(0,200)}"`)}let s=t.parentElement;if(s){let c=z(s.textContent||"",300);c&&c.length>5&&c!==o&&e.push(`Contexto: "${c.slice(0,200)}"`)}if(t.tagName.toLowerCase()==="svg"){let c=Array.from(t.querySelectorAll("text, tspan")).map(u=>u.textContent?.trim()).filter(Boolean);c.length>0&&e.push(`R\xF3tulos/Textos do Gr\xE1fico: "${c.join(" | ")}"`)}let l=t.getAttribute("data-alt")||t.getAttribute("data-description")||"";return l&&e.push(`Data: "${l}"`),e.length===0?"":e.join(" | ")}async function ro(t){let e=t.currentSrc||t.src;if(!e)return null;let o=(t.alt||t.getAttribute("aria-label")||"Imagem da quest\xE3o").slice(0,500),n=t.getBoundingClientRect(),a=t.naturalWidth||n.width||t.width||0,i=t.naturalHeight||n.height||t.height||0,r=Le(t,o,a,i);if(t.complete&&t.naturalWidth>0)try{let u=await ce(t),g=await ae(u);if(g&&g.length<=we)return{mediaType:"image/jpeg",base64:g,alt:o,source:e.slice(0,2e3),captureStatus:"captured",textContext:ie(t)}}catch{}try{let u=await fetch(e,{mode:"cors"});if(u.ok){let g=await u.blob();if(g.type.startsWith("image/")){let d=await createImageBitmap(g),m=await ce(d);d.close();let p=await ae(m);if(p&&p.length<=we)return{mediaType:"image/jpeg",base64:p,alt:o,source:e.slice(0,2e3),captureStatus:"captured",textContext:ie(t)}}}}catch{}if(e.startsWith("http")){let u=[`https://corsproxy.io/?${encodeURIComponent(e)}`,`https://api.allorigins.win/raw?url=${encodeURIComponent(e)}`],g=async d=>{let m=new AbortController,p=setTimeout(()=>m.abort(),1500);try{let f=await fetch(d,{signal:m.signal});if(clearTimeout(p),f.ok)return f;throw new Error("Proxy status "+f.status)}catch(f){throw clearTimeout(p),f}};try{let m=await(await Promise.any(u.map(g))).blob();if(m.type.startsWith("image/")||m.size>200){let p=await createImageBitmap(m),f=await ce(p);p.close();let h=await ae(f);if(h&&h.length<=we)return{mediaType:"image/jpeg",base64:h,alt:o,source:e.slice(0,2e3),captureStatus:"captured",textContext:ie(t)}}}catch{}}let s=t.parentElement||t,l=await Ie(s);if(l)return l;let c=ie(t);return c||o?{mediaType:"image/jpeg",base64:"",alt:o,source:e.slice(0,2e3),captureStatus:r?"failed_relevant":"text_only",textContext:c||`Imagem da quest\xE3o (src: ${e.slice(0,100)})`}:r&&e?{mediaType:"image/jpeg",base64:"",alt:o||"Imagem relevante n\xE3o capturada",source:e.slice(0,2e3),captureStatus:"failed_relevant",textContext:`IMAGEM RELEVANTE N\xC3O CAPTURADA. Src: ${e.slice(0,200)}. ${ie(t)}`}:null}function so(t){return t.querySelectorAll("path, line, polyline, polygon, circle, rect, text, image").length>0}function lo(t){try{let e=t.style.backgroundImage||(window.getComputedStyle?window.getComputedStyle(t).backgroundImage:"");if(e&&e.includes("url(")){let o=e.match(/url\(["']?([^"')]+)["']?\)/);if(o&&o[1]&&!o[1].startsWith("data:image/svg+xml"))return o[1]}}catch{}return null}function co(t,e){let o=t.closest('[data-easyquiz-id], button, [role="button"], [role="radio"], [role="checkbox"], [role="option"], label, .option-card, .quiz-option, .choice, .answer, [class*="option" i], [class*="choice" i], [class*="answer" i], li, tr');if(o&&o!==e&&T(o)&&!K(o)&&!B(o)){let i=o.dataset.easyquizId||o.id||void 0,r=z(o.innerText||o.textContent||"",120),s=o.getAttribute("aria-label")||o.getAttribute("title")||"",l=r||s,c=i?` [id: ${i}]`:"";if(l)return{associatedLabel:`Alternativa/Op\xE7\xE3o: "${l}"${c}`,targetControlId:i};if(i)return{associatedLabel:`Alternativa/Op\xE7\xE3o ${c}`,targetControlId:i}}let n=t.closest("figure")?.querySelector("figcaption")?.textContent?.trim();if(n)return{associatedLabel:`Figura do Enunciado: "${z(n,100)}"`};let a=t.closest('[class*="prompt" i], [class*="stimulus" i], [class*="question-text" i], [class*="statement" i], header, h1, h2, h3, h4, p');if(a){let i=z(a.textContent||"",80);if(i)return{associatedLabel:`Gr\xE1fico do Enunciado: "${i}"`}}return{associatedLabel:"Gr\xE1fico/Imagem do Enunciado Principal"}}async function It(t,e=!0){if(!e)return[];let o=[],n=0,a=35e5,i=(d,m)=>{if(!d)return!1;let p=d.base64?d.base64.length:0;if(p>0&&n+p>a)return!1;let f=co(m,t);return d.associatedLabel=f.associatedLabel,d.targetControlId=f.targetControlId,d.element=m,o.push(d),n+=p,o.filter(A=>A.captureStatus==="captured").length>=Me},r=[t],s=["article",".card",'[class*="question" i]','[class*="exercise" i]',"form",'[data-test-id*="exercise" i]','[data-testid*="exercise" i]',".perseus-renderer",".framework-perseus",'[class*="perseus" i]',".perseus-widget-container",'[class*="problem" i]'].join(", "),l=t.closest(s);l&&l!==t&&l!==document.body&&T(l)&&r.push(l);let c=document.querySelector(".perseus-renderer, .framework-perseus");c&&!r.includes(c)&&c!==document.body&&T(c)&&r.push(c);let u=new Set;for(let d of r){let m=Array.from(d.querySelectorAll("img")).filter(p=>T(p)&&!B(p)&&!u.has(p));for(let p of m){u.add(p);try{let f=p.getBoundingClientRect(),h=p.naturalWidth||f.width||p.width||0,A=p.naturalHeight||f.height||p.height||0,b=p.alt||"";if(!Le(p,b,h,A))continue;let y=await ro(p);if(i(y,p))return o}catch{}}}let g=new Set;for(let d of r){let m=Array.from(d.querySelectorAll("svg")).filter(p=>{if(!T(p)||B(p)||g.has(p))return!1;let f=typeof p.getBoundingClientRect=="function"?p.getBoundingClientRect():{width:0,height:0},h=f.width||parseFloat(p.getAttribute("width")||"0"),A=f.height||parseFloat(p.getAttribute("height")||"0");return h<30||A<30?!1:so(p)});for(let p of m){g.add(p);try{let f=await Mt(p);if(f.base64){let h=ie(p),A={mediaType:f.mediaType,base64:f.base64,alt:p.getAttribute("aria-label")||"Gr\xE1fico/Diagrama vetorial da quest\xE3o",source:"svg",captureStatus:"captured",textContext:h};if(i(A,p))return o}}catch{let f=p.closest('.trig-diagram-container, [class*="diagram" i], [class*="graph" i], figure')||p.parentElement||p,h=await Ie(f);if(h){if(i(h,p))return o}else{let A=ie(p);if(A){let b={mediaType:"image/jpeg",base64:"",alt:p.getAttribute("aria-label")||"Gr\xE1fico vetorial",source:"svg",captureStatus:"text_only",textContext:A};i(b,p)}}}}}if(o.filter(d=>d.captureStatus==="captured").length<Me){let d=Array.from(t.querySelectorAll("canvas")).filter(m=>T(m)&&!B(m));for(let m of d)try{let p=await ce(m),f=await ae(p);if(f){let h={mediaType:"image/jpeg",base64:f,alt:m.getAttribute("aria-label")||"Gr\xE1fico Canvas inline",source:"canvas",captureStatus:"captured"};if(i(h,m))return o}}catch{let p=await Ie(m.parentElement||m);if(i(p,m))return o}}if(o.filter(d=>d.captureStatus==="captured").length<Me){let d=Array.from(t.querySelectorAll('[style*="background-image"], .option-image, .question-media')).filter(m=>T(m)&&!B(m));for(let m of d){let p=lo(m);if(!p)continue;let f=m.getBoundingClientRect();if(Le(m,m.getAttribute("aria-label")||"",f.width,f.height))try{let h=await fetch(p,{mode:"cors"});if(h.ok){let A=await h.blob();if(A.type.startsWith("image/")){let b=await createImageBitmap(A),y=await ce(b);b.close();let x=await ae(y);if(x){let w={mediaType:"image/jpeg",base64:x,alt:"Imagem de fundo da alternativa",source:p.slice(0,2e3),captureStatus:"captured"};if(i(w,m))return o}}}}catch{try{let A=await(await fetch(p,{mode:"no-cors"})).blob();if(A.size>100){let b=await createImageBitmap(A),y=await ce(b);b.close();let x=await ae(y);if(x&&x.length>100){let w={mediaType:"image/jpeg",base64:x,alt:"Imagem CSS background",source:p.slice(0,2e3),captureStatus:"captured"};if(i(w,m))return o}}}catch{}}}}if(o.filter(d=>d.captureStatus==="captured").length<Me){let d=new Set;for(let m of r){let p=Array.from(m.querySelectorAll('div, span, section, figure, [class*="image" i], [class*="media" i], [class*="visual" i], [class*="graph" i], [class*="diagram" i], [class*="figure" i]')).filter(f=>{if(d.has(f)||!T(f)||B(f))return!1;let h=f.getBoundingClientRect();return h.width>=80&&h.height>=60});for(let f of p){d.add(f);try{let h=window.getComputedStyle?window.getComputedStyle(f).backgroundImage:"";if(!h||h==="none"||!h.includes("url(")||f.style.backgroundImage&&f.style.backgroundImage.includes("url("))continue;let A=h.match(/url\(["']?([^"')]+)["']?\)/);if(!A||!A[1]||A[1].startsWith("data:image/svg+xml"))continue;let b=A[1],y=f.getBoundingClientRect();if(!Le(f,f.getAttribute("aria-label")||"",y.width,y.height))continue;try{let x=await fetch(b,{mode:"cors"});if(x.ok){let w=await x.blob();if(w.type.startsWith("image/")||w.size>200){let k=await createImageBitmap(w),M=await ce(k);k.close();let P=await ae(M);if(P){let v={mediaType:"image/jpeg",base64:P,alt:f.getAttribute("aria-label")||"Imagem CSS computada da quest\xE3o",source:b.slice(0,2e3),captureStatus:"captured",textContext:ie(f)};if(i(v,f))return o}}}}catch{let x=await Ie(f);if(x&&i(x,f))return o}}catch{}}}}return o}var uo=[/\bfetch\b/i,/\bXMLHttpRequest\b/i,/\bWebSocket\b/i,/\b(?:localStorage|sessionStorage|indexedDB)\b/i,/\b(?:eval|Function|AsyncFunction|GeneratorFunction)\b/i,/\bimport(?:Scripts)?\b/i,/\bnavigator\s*\.\s*credentials\b/i,/\b(?:cookie|location\s*=|history\s*\.)/i,/\bwindow\s*\[\s*['"](?:fetch|eval|Function|localStorage|sessionStorage)/i];function ot(t){let e=t?.engine||"smart",o=new Set(["dom","framework","keyboard","drag"]);return t?.autoAdvance&&o.add("navigation"),e==="javascript"&&o.add("javascript"),{engine:e,capabilities:o,maxAttemptsPerAction:e==="command"?1:2,maxActionMs:e==="command"?1500:3e3,allowJavaScript:e==="javascript",allowNavigation:!!t?.autoAdvance}}function nt(t,e){if(t.t==="js"&&!e.allowJavaScript)throw new Error("A\xE7\xE3o JavaScript bloqueada pela engine atual. Use o motor JavaScript explicitamente.");if(t.t==="adv"&&!e.allowNavigation)throw new Error("Avan\xE7o autom\xE1tico bloqueado pela pol\xEDtica atual.")}function Lt(t){if(!t.trim())throw new Error("JavaScript recusado: c\xF3digo vazio.");if(t.length>8e3)throw new Error("JavaScript recusado: c\xF3digo acima do limite operacional.");if(uo.find(o=>o.test(t)))throw new Error("JavaScript recusado: acesso externo, persist\xEAncia ou avalia\xE7\xE3o din\xE2mica n\xE3o permitidos.");if(!/^\s*(?:\/\/[^\n]*\n|\/\*[\s\S]*?\*\/|[\s\S])*\$eq\./.test(t)&&!t.includes("$eq."))throw new Error("JavaScript recusado: use somente a API declarativa $eq.")}function q(t){return t?!!(t.closest('#easyquiz-shadow-root, .eq-sidebar, .eq-launcher, [data-easyquiz-ignore="true"], .btn-inject-eq, #btn-inject-script')||t.getAttribute?.("data-easyquiz-ignore")==="true"):!1}function E(t){return t==null?"":(typeof t=="string"?t:String(t)).replace(/^(\([0-9a-zA-Z]{1,2}\)|[0-9]{1,3}|[a-zA-Z])[\.\)\-\:]\s+/,"").replace(/[\.\u2026]{2,}/g," ").replace(/['"“”«»]/g,"").replace(/\s+/g," ").trim()}function X(t){if(!t||t instanceof HTMLInputElement||t instanceof HTMLSelectElement||t instanceof HTMLTextAreaElement||t.getAttribute("draggable")==="true"||t.classList.contains("dnd-card")||t.hasAttribute("data-category")||t.hasAttribute("data-dropzone"))return t;if(t.hasAttribute("for")){let n=t.getAttribute("for");if(n){let a=t.ownerDocument.getElementById(n);if(a)return a}}let e=t.closest('label, .option-card, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, td, li, .dnd-card, [class*="option-card" i], [class*="choice-card" i], .dropdown-row, [class*="dropdown" i], [class*="select-row" i]');if(e&&!["article","section","main","form","body"].includes(e.tagName.toLowerCase())){let n=e.getAttribute("for"),i=(n?e.ownerDocument.getElementById(n):null)||e.querySelector('input:not([type="hidden"]), select, textarea');return i||e}let o=t.closest('button, a, [role="button"], [draggable="true"]');if(o)return o;if(["body","html","main","section","article","form"].includes(t.tagName.toLowerCase())){let n=t.querySelector('button, [role="button"], a, input:not([type="hidden"]), select, textarea, [role="radio"], [role="checkbox"], .option-card, label');if(n)return X(n)}return t}function qt(t){let e=t;if(!e||!document.contains(e))try{e=Z()}catch{}e=e||document.body;let o=a=>{let i=Array.from(a.querySelectorAll("tr")).filter(u=>T(u)&&u.querySelector('input[type="radio"], input[type="checkbox"]'));if(i.length>1)return i;let r=Array.from(a.querySelectorAll('input[type="checkbox"], input[type="radio"], [role="checkbox"], [role="radio"]')).filter(u=>T(u)&&!q(u));if(r.length>0)return r;let l=Array.from(a.querySelectorAll('.option-card, [role="option"], [class*="choice-card" i], [class*="option-card" i], li[class*="choice" i], li[class*="option" i]')).filter(u=>T(u)&&!q(u)).filter(u=>!u.parentElement?.closest('.option-card, [role="option"], [class*="choice-card" i], [class*="option-card" i]'));return l.length>0?l:Array.from(a.querySelectorAll('[class*="classification" i] [class], [class*="draggable-item" i], [class*="drag-item" i], [class*="sortable-card" i]')).filter(u=>{let g=u;return T(g)&&!q(g)&&(g.textContent||"").trim().length>2&&!K(g)&&!B(g)&&!g.querySelector("[class]")})},n=o(e);return n.length>0?n:e!==document.body?o(document.body):[]}function L(t,e,o=!1){if(t==null)return null;let a=(typeof t=="string"?t:String(t)).trim().replace(/^["'“”«»]+|["'“”«»]+$/g,"");if(!a)return null;let i=N(a),r=document.querySelector(`[data-easyquiz-id="${i}"]`);if(r&&!q(r))return X(r);try{let d=document.getElementById(a);if(d&&T(d)&&!q(d))return d.hasAttribute("data-category")||d.hasAttribute("data-dropzone")||d.classList.contains("dnd-zone")?d:X(d)}catch{}try{let d=document.querySelector(`[data-item-id="${i}"]`);if(d&&T(d)&&!q(d))return X(d)}catch{}let s=a.match(/^(?:item|opção|opcao|afirmação|afirmacao|alternativa|linha|afirmativa|questão|questao|campo|blank|lacuna|input|resposta)?\s*#?_?([0-9]+)$/i);if(s){let d=parseInt(s[1],10);if(o){let p=document.body;try{p=Z()||document.body}catch{}let f=Array.from(p.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, select, [contenteditable="true"]')).filter(h=>T(h)&&!q(h));if(d>=1&&d-1<f.length)return f[d-1];if(d===0&&f.length>0)return f[0]}let m=d-1;if(m>=0){let p=qt();if(m<p.length){let A=p[m];if(A.tagName.toLowerCase()==="tr"){if(e){let y=A.querySelector(`input[value="${N(e)}" i], [data-value="${N(e)}" i]`);if(y)return y}let b=A.querySelector("input");if(b)return b}return X(A)}let f=document.body;try{f=Z()||document.body}catch{}let h=Array.from(f.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, select, [contenteditable="true"]')).filter(A=>T(A)&&!q(A));if(m<h.length)return h[m]}}let l=a.match(/^(?:item|opção|opcao|afirmação|afirmacao|alternativa|linha|afirmativa|questão|questao)?\s*#?([a-eA-E])$/i);if(l){let d=l[1].toUpperCase(),m=d.charCodeAt(0)-65,p=Array.from(document.querySelectorAll(`input[type="radio"][value="${d}" i], input[type="checkbox"][value="${d}" i]`)).find(h=>T(h)&&!q(h));if(p)return X(p);let f=Array.from(document.querySelectorAll('.option-card, .choice, .answer, label, [role="radio"], [role="checkbox"]')).find(h=>{if(!T(h)||q(h))return!1;let b=(h.querySelector('.option-badge, .badge, [class*="badge" i], [class*="letter" i]')?.textContent||"").trim().toUpperCase();if(b===d||b===`${d})`||b===`(${d})`||b===`${d}.`||b===`${d}:`)return!0;let y=(h.textContent||"").trim().toUpperCase();return y.startsWith(`${d})`)||y.startsWith(`(${d})`)||y.startsWith(`${d}.`)||y.startsWith(`${d}:`)});if(f)return X(f);if(m>=0){let h=qt();if(m<h.length){let A=h[m];if(A.tagName.toLowerCase()==="tr"){if(e){let y=A.querySelector(`input[value="${N(e)}" i], [data-value="${N(e)}" i]`);if(y)return y}let b=A.querySelector("input");if(b)return b}return X(A)}}}if(/^[a-zA-Z0-9_-]{1,10}$/.test(a)){let m=Array.from(document.querySelectorAll(`[data-category="${i}" i], [data-dropzone="${i}" i], [data-role="dropzone"][data-category="${i}" i]`)).find(A=>T(A)&&!q(A));if(m)return m;let f=Array.from(document.querySelectorAll(`input[value="${i}" i], [data-value="${i}" i], input[id="${i}" i], input[placeholder="${i}" i], textarea[placeholder="${i}" i], [title="${i}" i]`)).find(A=>T(A)&&!q(A));if(f)return X(f);let h=Array.from(document.querySelectorAll('.option-badge, [class*="badge" i], [class*="letter" i], .option-card span, label span')).find(A=>{if(!T(A)||q(A))return!1;let b=E(A.textContent).toLowerCase();return b===a.toLowerCase()||b===a.toLowerCase()+")"});if(h)return X(h)}try{let d=Array.from(document.querySelectorAll(`[name="${i}"], [value="${i}"], [placeholder="${i}" i], [title="${i}" i], [data-category="${i}" i], [data-dropzone="${i}" i], [data-testid="${i}" i], [data-test-id="${i}" i], [aria-label="${i}" i]`));if(e){let p=d.find(f=>{if(!T(f)||q(f))return!1;if(f instanceof HTMLInputElement&&f.value.toLowerCase()===e.toLowerCase())return!0;let h=f.closest("label, .vf-label, td, div");return h&&E(h.textContent).toLowerCase().includes(E(e).toLowerCase())});if(p)return X(p)}let m=d.find(p=>T(p)&&!q(p));if(m)return m.hasAttribute("data-category")||m.hasAttribute("data-dropzone")||m.classList.contains("dnd-zone")?m:X(m)}catch{}if(/^[.#\[]|\s|[>+~:]/.test(a))try{let m=Array.from(document.querySelectorAll(a)).find(p=>T(p)&&!q(p));if(m)return X(m)}catch{}try{let d=a.replace(/"/g,""),m=`//button[normalize-space(.)="${d}"] | //a[normalize-space(.)="${d}"] | //*[not(*) and normalize-space(.)="${d}"] | //*[@aria-label="${d}"] | //*[@data-category="${d}"] | //*[@data-testid="${d}"]`,p=document.evaluate(m,document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);for(let f=0;f<p.snapshotLength;f++){let h=p.snapshotItem(f);if(h&&T(h)&&!q(h)){if(["body","html"].includes(h.tagName.toLowerCase())){let b=h.querySelector('button, [role="button"], a, input, [role="radio"], [role="checkbox"], label');if(b&&T(b))return X(b)}return h.closest('[data-role="dropzone"], [class*="category" i], [class*="bucket" i], [class*="column" i], [class*="drop" i]')||X(h)}}}catch{}let u=E(a).toLowerCase(),g=Array.from(document.querySelectorAll('button, a, div, span, li, p, label, input, textarea, select, [draggable="true"], [data-testid], [class*="option" i], [class*="card" i], [class*="item" i], [class*="choice" i], [class*="category" i], [class*="bucket" i]'));for(let d of g){if(!T(d)||q(d)||d.closest("header, nav, .stepper, .step-item, .progress-bar-container")||B(d)||!!(d.matches('article, section, form, main, [class*="container" i], [class*="grid" i], .dnd-pool, .dnd-zones')||d.querySelector('label, [role="radio"], [role="checkbox"], .dnd-card, [draggable="true"], .option-card, tr'))&&!d.matches(".dnd-zone, [data-category], [data-dropzone]"))continue;let p=E(d.textContent).toLowerCase(),f=E(d.getAttribute("aria-label")||"").toLowerCase(),h=E(d.getAttribute("placeholder")||"").toLowerCase(),A=E(d.getAttribute("title")||"").toLowerCase(),b=E(d.getAttribute("name")||"").toLowerCase(),y=E(d.getAttribute("data-category")||"").toLowerCase(),x=d instanceof HTMLInputElement||d instanceof HTMLButtonElement?d.value:"",w=E(x).toLowerCase(),k=p.startsWith(u+")")||p.startsWith(u+".")||p.startsWith(u+" -")||p.startsWith(u+":");if(p===u||f===u||h===u||A===u||b===u||y&&y===u||w&&w===u||k)return d.closest('[data-role="dropzone"], [class*="category" i], [class*="bucket" i], [class*="column" i], [class*="drop" i]')||X(d)}if(u.length>=3)for(let d of g){if(!T(d)||q(d)||d.closest("header, nav, .stepper, .step-item, .progress-bar-container")||B(d)||!!(d.matches('article, section, form, main, [class*="container" i], [class*="grid" i], .dnd-pool, .dnd-zones')||d.querySelector('label, [role="radio"], [role="checkbox"], .dnd-card, [draggable="true"], .option-card, tr'))&&!d.matches(".dnd-zone, [data-category], [data-dropzone]"))continue;let p=E(d.textContent).toLowerCase(),f=E(d.getAttribute("aria-label")||"").toLowerCase(),h=E(d.getAttribute("placeholder")||"").toLowerCase(),A=E(d.getAttribute("title")||"").toLowerCase(),b=E(d.getAttribute("name")||"").toLowerCase();if(p.includes(u)||f.includes(u)||h.includes(u)||A.includes(u)||b.includes(u)){if(Array.from(d.children).some(k=>{let M=E(k.textContent).toLowerCase();return M&&M.includes(u)}))continue;return d.closest('[data-role="dropzone"], [class*="category" i], [class*="bucket" i], [class*="column" i], [class*="drop" i]')||X(d)}let y=u.split(/\s+/).filter(Boolean);if(y.length>=3){let x=y.slice(0,Math.min(5,y.length)).join(" ");if(p.includes(x)||f.includes(x)||h.includes(x))return X(d)}}return null}function Ht(t,e){for(let o of e)t.dispatchEvent(new Event(o,{bubbles:!0,composed:!0}))}function V(t,e){if(!t)return;try{t.scrollIntoView({block:"nearest",inline:"nearest",behavior:"instant"})}catch{}try{t.focus?.()}catch{}let o=t.getBoundingClientRect(),n=e?e[0]:Math.round(o.left+Math.max(1,o.width/2)),a=e?e[1]:Math.round(o.top+Math.max(1,o.height/2)),i={bubbles:!0,cancelable:!0,composed:!0,view:window,clientX:n,clientY:a};try{t.dispatchEvent(new PointerEvent("pointerover",{...i}))}catch{}try{t.dispatchEvent(new MouseEvent("mouseover",{...i}))}catch{}try{t.dispatchEvent(new PointerEvent("pointerdown",{...i,button:0,buttons:1}))}catch{}try{t.dispatchEvent(new MouseEvent("mousedown",{...i,button:0,buttons:1}))}catch{}try{t.dispatchEvent(new PointerEvent("pointerup",{...i,button:0,buttons:0}))}catch{}try{t.dispatchEvent(new MouseEvent("mouseup",{...i,button:0,buttons:0}))}catch{}if(typeof t.click=="function")try{t.click()}catch{try{t.dispatchEvent(new MouseEvent("click",{...i,button:0,buttons:0}))}catch{}}else try{t.dispatchEvent(new MouseEvent("click",{...i,button:0,buttons:0}))}catch{}try{let r=Object.keys(t).find(s=>s.startsWith("__reactFiber")||s.startsWith("__reactInternalInstance"));if(r){let s=t[r];for(;s;){let l=s.memoizedProps||s.pendingProps;if(l?.onClick){l.onClick({type:"click",target:t,currentTarget:t,bubbles:!0,cancelable:!0,preventDefault:()=>{},stopPropagation:()=>{}});break}s=s.return}}}catch{}try{let r=Object.keys(t).find(s=>s.startsWith("__reactProps"));if(r){let s=t[r];s?.onClick&&s.onClick({type:"click",target:t,currentTarget:t,bubbles:!0,cancelable:!0,preventDefault:()=>{},stopPropagation:()=>{}})}}catch{}try{let r=t._vei;r?.onClick&&(Array.isArray(r.onClick.value)?r.onClick.value:[r.onClick.value]).forEach(l=>{try{l({type:"click",target:t})}catch{}})}catch{}try{t.$onclick&&t.$onclick({type:"click",target:t,preventDefault:()=>{},stopPropagation:()=>{}})}catch{}try{if(!!(document.querySelector('meta[content*="google.com/forms"], form[action*="formResponse"]')||t.closest("[data-item-id], [jsmodel], [jsaction], .freebirdFormviewerComponentsQuestionBaseRoot"))){let s=t.querySelector('input[type="radio"], input[type="checkbox"]');s&&(s.focus?.(),s.click(),Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"checked")?.set?.call(s,!0),s.dispatchEvent(new Event("change",{bubbles:!0})));let l=t.closest("[jsaction]");if(l&&l!==t)try{l.dispatchEvent(new MouseEvent("click",{bubbles:!0,cancelable:!0,view:window,clientX:n,clientY:a}))}catch{}}}catch{}if(t.getAttribute("role")==="button"||t.getAttribute("tabindex")!==null)try{t.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0,cancelable:!0})),t.dispatchEvent(new KeyboardEvent("keyup",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0,cancelable:!0}))}catch{}}function He(t){try{let e=t.id,o=!!e;e||(e=`__eq_tmp_${Math.random().toString(36).slice(2,8)}`,t.id=e);let n=document.createElement("script");return n.textContent=`(function(){var el=document.getElementById(${JSON.stringify(e)});if(el){el.dispatchEvent(new MouseEvent('click',{bubbles:true,cancelable:true,composed:true,view:window}));if(typeof el.click==='function')el.click();var fk=Object.keys(el).find(function(k){return k.startsWith('__reactFiber')||k.startsWith('__reactInternalInstance');});if(fk){var fb=el[fk];while(fb){var mp=fb.memoizedProps||fb.pendingProps;if(mp&&typeof mp.onClick==='function'){try{mp.onClick({type:'click',target:el,currentTarget:el,bubbles:true,cancelable:true,preventDefault:function(){},stopPropagation:function(){}});}catch(e){}break;}fb=fb.return;}}var pk=Object.keys(el).find(function(k){return k.startsWith('__reactProps');});if(pk&&el[pk]&&typeof el[pk].onClick==='function'){try{el[pk].onClick({type:'click',target:el,currentTarget:el,bubbles:true,cancelable:true,preventDefault:function(){},stopPropagation:function(){}});}catch(e){}}if(el._vei&&el._vei.onClick){var h=el._vei.onClick.value;var hs=Array.isArray(h)?h:[h];hs.forEach(function(fn){try{fn({type:'click',target:el});}catch(e){}});}}})()`,document.head.appendChild(n),n.remove(),o||setTimeout(()=>{try{t.id===e&&t.removeAttribute("id")}catch{}},0),!0}catch{return!1}}function qe(t,e){let o=t;if(o.hasAttribute("for")){let g=o.getAttribute("for"),d=o.ownerDocument.getElementById(g);d&&(o=d)}let n=o.classList?.contains("mq-editable-field")||o.classList?.contains("mq-root-block")?o:o.querySelector(".mq-editable-field, .mq-root-block");if(n)try{let g=n.__mathquill||n.mathquill;if(g&&typeof g.latex=="function"){g.latex(e),n.dispatchEvent(new Event("input",{bubbles:!0,composed:!0})),n.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}));return}let d=window.MathQuill?.getInterface?.(2)||window.MathQuill?.getInterface?.(1);if(d){let m=d(n);if(m&&typeof m.latex=="function"){m.latex(e),n.dispatchEvent(new Event("input",{bubbles:!0,composed:!0}));return}}n.focus?.(),n.dispatchEvent(new KeyboardEvent("keydown",{key:"a",code:"KeyA",ctrlKey:!0,bubbles:!0})),n.dispatchEvent(new KeyboardEvent("keydown",{key:"Backspace",code:"Backspace",bubbles:!0}));for(let m of e)n.dispatchEvent(new KeyboardEvent("keydown",{key:m,code:`Key${m.toUpperCase()}`,bubbles:!0,cancelable:!0})),n.dispatchEvent(new KeyboardEvent("keypress",{key:m,code:`Key${m.toUpperCase()}`,bubbles:!0,cancelable:!0})),n.dispatchEvent(new InputEvent("input",{data:m,inputType:"insertText",bubbles:!0,cancelable:!0,composed:!0})),n.dispatchEvent(new KeyboardEvent("keyup",{key:m,code:`Key${m.toUpperCase()}`,bubbles:!0,cancelable:!0}));n.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}));return}catch(g){console.warn("[EasyQuiz] MathQuill fill falhou, continuando com fallback padr\xE3o:",g)}let a=o.matches?.('[class*="perseus-dropdown" i], [class*="perseus"] [role="combobox"]')?o:o.querySelector('[class*="perseus-dropdown" i], [class*="perseus"] [role="combobox"]');if(a)try{V(a),setTimeout(()=>{let g=e.trim().toLowerCase(),d=Array.from(document.querySelectorAll('[role="option"], [role="listbox"] [role="option"], [class*="dropdown"] [role="option"], [class*="perseus"] [class*="option"], .dropdown-option, [class*="select-option"]')).filter(m=>{let p=m;if(!T(p)||q(p))return!1;let f=(p.textContent||"").trim().toLowerCase(),h=p.getAttribute("data-value")?.toLowerCase()||"";return f===g||h===g||f.includes(g)||g.length>2&&g.includes(f)});d.length>0&&V(d[0])},250);return}catch(g){console.warn("[EasyQuiz] Perseus dropdown fill falhou:",g)}if(typeof HTMLSelectElement<"u"&&o instanceof HTMLSelectElement||o.tagName?.toLowerCase()==="select"||o.getAttribute("role")==="combobox"||o.getAttribute("role")==="listbox"||o.matches?.('[role="combobox"], [role="listbox"], [class*="select" i], [class*="dropdown" i]')){Oe(o,[e]);return}let r=o.querySelector('select, [role="combobox"], [role="listbox"]');if(r){Oe(r,[e]);return}if(!(o instanceof HTMLInputElement)&&!(o instanceof HTMLTextAreaElement)&&!(o instanceof HTMLSelectElement)&&!o.isContentEditable){let g=o.querySelector('input:not([type="hidden"]), textarea, select, [contenteditable="true"]');if(g)o=g;else{let m=o.closest('.form-group, .field, [class*="input" i], [class*="control" i], label, tr, td, li, p, div')?.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, select, [contenteditable="true"]');if(m)o=m;else{let p=o.nextElementSibling;for(;p;){if(p instanceof HTMLInputElement&&!["hidden","button","submit","checkbox","radio"].includes(p.type)||p instanceof HTMLTextAreaElement||p instanceof HTMLElement&&p.isContentEditable){o=p;break}let f=p.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(f){o=f;break}p=p.nextElementSibling}}}}if(o instanceof HTMLButtonElement||o.tagName.toLowerCase()==="a"||o.getAttribute("role")==="button"||o instanceof HTMLInputElement&&["button","submit","reset","image"].includes(o.type)){let g=o.parentElement?.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(g)o=g;else{let d=document.body;try{d=Z()||document.body}catch{}let m=d.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(m)o=m;else{console.warn("[EasyQuiz] setNativeValue: Nenhum campo de texto encontrado para receber o valor.");return}}}if(!(o instanceof HTMLInputElement)&&!(o instanceof HTMLTextAreaElement)&&!(o instanceof HTMLSelectElement)&&!o.isContentEditable){let g=document.body;try{g=Z()||document.body}catch{}let d=g.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(d)o=d;else{console.warn("[EasyQuiz] setNativeValue: Nenhum campo de texto encontrado para receber o valor.");return}}if(o instanceof HTMLInputElement&&["checkbox","radio"].includes(o.type)){let g=["true","1","checked","yes","sim"].includes(e.toLowerCase())||e===o.value;re(o,g);return}let l=String(e??""),c=l;if(o instanceof HTMLInputElement&&o.type==="number"){let g=l.replace(",",".").replace(/[^0-9.-]/g,"");g&&!isNaN(Number(g))&&(c=g)}try{o.scrollIntoView?.({block:"center",inline:"center",behavior:"instant"}),o.focus?.()}catch{}try{if(o instanceof HTMLInputElement||o instanceof HTMLTextAreaElement){let g=o instanceof HTMLTextAreaElement?HTMLTextAreaElement.prototype:HTMLInputElement.prototype,d=Object.getOwnPropertyDescriptor(g,"value")?.set;d?d.call(o,""):o.value="";try{o.select?.()}catch{}}else if(o.isContentEditable){o.textContent="";try{document.execCommand?.("selectAll",!1,void 0)}catch{}}}catch{}let u=!1;try{o instanceof HTMLInputElement||o instanceof HTMLTextAreaElement?o.type!=="number"&&o.type!=="range"&&(u=document.execCommand?.("insertText",!1,c)||!1):o.isContentEditable&&(u=document.execCommand?.("insertText",!1,c)||!1)}catch{}if(o instanceof HTMLInputElement||o instanceof HTMLTextAreaElement){try{let m=o._valueTracker;m&&m.setValue(c===""?" ":"")}catch{}let g=o instanceof HTMLTextAreaElement?HTMLTextAreaElement.prototype:HTMLInputElement.prototype,d=Object.getOwnPropertyDescriptor(g,"value")?.set;d?d.call(o,c):o.value=c;try{o.dispatchEvent(new KeyboardEvent("keydown",{bubbles:!0,cancelable:!0,key:c.slice(-1)||"a"}))}catch{}try{o.dispatchEvent(new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,composed:!0,data:c,inputType:"insertText"}))}catch{}try{o.dispatchEvent(new InputEvent("input",{bubbles:!0,cancelable:!0,composed:!0,data:c,inputType:"insertText"}))}catch{o.dispatchEvent(new Event("input",{bubbles:!0,cancelable:!0,composed:!0}))}try{o.dispatchEvent(new KeyboardEvent("keyup",{bubbles:!0,cancelable:!0,key:c.slice(-1)||"a"}))}catch{}try{o.dispatchEvent(new Event("change",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}try{o.dispatchEvent(new FocusEvent("blur",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}if(o.value!==c&&!(o instanceof HTMLInputElement&&o.type==="number"&&Number(o.value)===Number(c))){o.value=c;try{d?.call(o,c)}catch{}}return}if(o.isContentEditable){if(o.textContent?.trim()!==c.trim()){o.textContent=c;try{o.innerText=c}catch{}}try{o.dispatchEvent(new InputEvent("input",{bubbles:!0,cancelable:!0,composed:!0,data:c,inputType:"insertText"}))}catch{o.dispatchEvent(new Event("input",{bubbles:!0,cancelable:!0,composed:!0}))}try{o.dispatchEvent(new Event("change",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}try{o.dispatchEvent(new FocusEvent("blur",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}return}try{"value"in o&&(o.value=c),o.dispatchEvent(new Event("input",{bubbles:!0,cancelable:!0,composed:!0})),o.dispatchEvent(new Event("change",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}}function re(t,e){if(!t)return;let o=t.closest('label, td, .option-card, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, [class*="option" i], [class*="choice" i], li')||t,n=t instanceof HTMLInputElement&&["checkbox","radio"].includes(t.type)?t:o.querySelector('input[type="checkbox"], input[type="radio"]');!n&&o.hasAttribute("for")&&(n=o.ownerDocument.getElementById(o.getAttribute("for")));let a=t instanceof HTMLInputElement?t.closest("label")||(t.id?o.ownerDocument.getElementById(o.getAttribute("for")):null)||t:o&&T(o)?o:t;if(n){let i=n.type==="radio",r=n.type==="checkbox",s=!!n._valueTracker;if(n.checked===e){if(i&&e){o.setAttribute("aria-checked","true"),o.setAttribute("aria-selected","true"),o.classList.add("selected","active","checked");return}if(r){o.setAttribute("aria-checked",e?"true":"false"),o.setAttribute("aria-selected",e?"true":"false"),o.classList.toggle("selected",e),o.classList.toggle("active",e),o.classList.toggle("checked",e);return}}if(a&&a!==n&&V(a),n.checked!==e)try{n.focus?.(),n.click()}catch{}if(n.checked!==e){try{let c=n._valueTracker;c&&c.setValue(!e)}catch{}try{Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"checked")?.set?.call(n,e)}catch{}n.checked=e,Ht(n,["input","change"])}o.setAttribute("aria-checked",e?"true":"false"),o.setAttribute("aria-selected",e?"true":"false"),o.classList.toggle("selected",e),o.classList.toggle("active",e),o.classList.toggle("checked",e)}else{if((o.getAttribute("aria-checked")==="true"||o.getAttribute("aria-selected")==="true"||o.getAttribute("data-selected")==="true"||o.getAttribute("data-checked")==="true"||o.classList.contains("selected")||o.classList.contains("active")||o.classList.contains("checked"))===e&&e)return;V(a),o.setAttribute("aria-checked",e?"true":"false"),o.setAttribute("aria-selected",e?"true":"false"),o.classList.toggle("selected",e),o.classList.toggle("active",e),o.classList.toggle("checked",e)}}function Oe(t,e){let o=typeof HTMLSelectElement<"u"&&t instanceof HTMLSelectElement||t.tagName?.toLowerCase()==="select"?t:t.querySelector("select");if(o){let r=e.map(c=>E(c).toLowerCase()),s=!1,l=(c,u)=>{c.selected=!0,o.selectedIndex=u;try{o.value=c.value}catch{}try{Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype,"value")?.set?.call(o,c.value)}catch{}try{let g=o._valueTracker;g&&g.setValue(c.value)}catch{}s=!0};for(let c=0;c<o.options.length;c++){let u=o.options[c],g=u.value.toLowerCase(),d=E(u.textContent).toLowerCase();if(r.some(p=>p===g||p===d)){if(l(u,c),!o.multiple)break}else o.multiple||(u.selected=!1)}if(!s)for(let c of r){let u=c.match(/^(?:item|opção|opcao|alternativa|linha|escolha|campo)?\s*#?_?([0-9]+)$/i);if(u){let g=parseInt(u[1],10),m=o.options[0]?.value===""||o.options[0]?.disabled?g:g>=1?g-1:0;if(m>=0&&m<o.options.length&&(l(o.options[m],m),!o.multiple))break}}if(!s){for(let c of r)if(/^[a-z]$/i.test(c)){let u=c.toUpperCase().charCodeAt(0)-65,d=o.options[0]?.value===""||o.options[0]?.disabled?u+1:u;if(d>=0&&d<o.options.length&&(l(o.options[d],d),!o.multiple))break}}if(!s){let c=u=>u.normalize("NFD").replace(/[\u0300-\u036f]/g,"");for(let u=0;u<o.options.length;u++){let g=o.options[u],d=c(g.value.toLowerCase()),m=c(E(g.textContent).toLowerCase());if(r.some(f=>{let h=c(f);return d.includes(h)||m.includes(h)||h.length>2&&(h.includes(d)||h.includes(m))})&&(l(g,u),!o.multiple))break}}if(s){Ht(o,["focus","input","change","blur"]);return}}let n=t.matches?.('[role="combobox"], [role="listbox"], [class*="select" i], [class*="dropdown" i]')?t:t.closest('[role="combobox"], [role="listbox"], [class*="select" i], [class*="dropdown" i]');n&&V(n);let a=e.map(r=>E(r).toLowerCase()),i=Array.from(document.querySelectorAll('[role="listbox"] [role="option"], [role="menu"] [role="menuitem"], .select-dropdown li, .dropdown-menu .dropdown-item, .ant-select-item-option, .MuiMenuItem-root, [class*="option-item"], li[data-value]')).filter(r=>T(r)&&!q(r));for(let r of a){let s=i.find(c=>{let u=E(c.textContent).toLowerCase(),g=E(c.getAttribute("data-value")||c.getAttribute("value")||"").toLowerCase();return u===r||g===r||u.includes(r)||r.length>2&&r.includes(u)});if(s){V(s);let c=s.querySelector('input[type="radio"], input[type="checkbox"]');c&&re(c,!0);return}let l=L(r);if(l){V(l);return}}}function po(t,e){try{let o=new DataTransfer;try{o.setData("text/plain",t)}catch{}try{o.setData("text/html",e)}catch{}return o}catch{return null}}function it(t){try{t.click()}catch{let e=t.ownerDocument.defaultView||window;t.dispatchEvent(new e.MouseEvent("click",{bubbles:!0,cancelable:!0,composed:!0,view:e}))}}function mo(t,e,o){try{if(e.contains(t))return{success:!0,evidence:"origin is child of dest (DOM move confirmed)"};if(!document.body.contains(t))return{success:!0,evidence:"origin removed from DOM (consumed by framework)"};let n=e.children.length;if(o!==void 0&&n>o)return{success:!0,evidence:`dest child count increased: ${o} \u2192 ${n}`};if([t.getAttribute("data-placed")==="true",t.getAttribute("data-assigned")==="true",t.getAttribute("data-matched")==="true",t.getAttribute("aria-grabbed")==="false",/placed|dropped|assigned|matched|done|sorted|categorized/i.test(t.className||"")].some(Boolean))return{success:!0,evidence:"origin has placement indicator: class/attr"};let i=(t.textContent||"").trim().toLowerCase();return i.length>2&&Array.from(e.querySelectorAll("*")).some(l=>l!==e&&(l.textContent||"").trim().toLowerCase()===i)?{success:!0,evidence:"origin text found inside dest children (clone or DOM move)"}:e.getAttribute("data-count")&&parseInt(e.getAttribute("data-count")||"0")>0?{success:!0,evidence:"dest data-count > 0, categorization likely succeeded"}:t.getAttribute("aria-hidden")==="true"||t.style.display==="none"||t.style.visibility==="hidden"?{success:!0,evidence:"origin hidden after drop (framework confirmed placement)"}:{success:!1,evidence:"no DOM evidence of successful drag/categorization"}}catch{return{success:!1,evidence:"verification threw exception"}}}function W(t,e){let o=E(t).toLowerCase();if(!o)return null;if(e==="source"){if(/^[0-9a-f]{10,}$/.test(t.trim())){let s=document.getElementById(t.trim());if(s&&T(s)&&!q(s))return s}let r=['[class*="cursor-grab"][id]',".dnd-card",'[draggable="true"]'];for(let s of r){let c=Array.from(document.querySelectorAll(s)).find(u=>{if(!T(u)||q(u))return!1;let g=E(`${u.id} ${u.textContent||""} ${u.getAttribute("data-id")||""}`).toLowerCase();return g===o||g.includes(o)||u.id===t.trim()});if(c)return c}return null}let n=["[data-dropzone]","[data-category]",'[data-role="dropzone"]','[class*="dropzone" i]','[class*="list-group" i]','[class*="classification-group" i]'].join(","),a=Array.from(document.querySelectorAll(n)),i=a.find(r=>[r.getAttribute("data-category"),r.getAttribute("data-dropzone")].some(s=>s?.trim().toLowerCase()===o));return i&&T(i)&&!q(i)?i:a.find(r=>{if(!T(r)||q(r)||/unclassified/i.test(r.className))return!1;let s=r.querySelector('.font-bold, h1, h2, h3, h4, [class*="header" i], [class*="title" i], [class*="label" i]'),l=E(s?.textContent||r.textContent||"").toLowerCase();return l.includes("op")&&(l.includes("es")||l.includes("\xF5es"))?!1:l===o||l.startsWith(o)||l.includes(o)})||null}async function fe(t,e,o=1){try{t.scrollIntoView({block:"center",inline:"center",behavior:"instant"})}catch{}let n=t.getBoundingClientRect(),a=e.getBoundingClientRect(),i=Math.round(n.left+Math.max(1,n.width/2)),r=Math.round(n.top+Math.max(1,n.height/2)),s=Math.round(a.left+Math.max(1,a.width/2)),l=Math.round(a.top+Math.max(1,a.height/2)),c=E(e.textContent).toLowerCase();if(c){let f=Array.from(t.querySelectorAll('button, [role="button"], input[type="radio"], input[type="checkbox"], option, .btn, [class*="tag" i]')).find(h=>{let A=E(h.textContent).toLowerCase(),b=h instanceof HTMLInputElement||h instanceof HTMLOptionElement?E(h.value).toLowerCase():"";return A&&(c.includes(A)||A.includes(c))||b&&(c.includes(b)||b.includes(c))});f&&(V(f),await new Promise(h=>setTimeout(h,120)))}it(t),await new Promise(p=>setTimeout(p,140)),it(e);let u=e.querySelector('[data-role="dropzone"], [class*="bucket" i], [class*="slot" i], [class*="drop" i], [class*="target" i], [class*="items" i], ul, ol');if(u&&u!==e&&it(u),await new Promise(p=>setTimeout(p,100)),!e.contains(t)&&t.matches('.dnd-card, [draggable="true"]')&&e.matches('.dnd-zone, [data-dropzone], [data-role="dropzone"]')&&e.appendChild(t),e.contains(t)&&t.matches('.dnd-card, [draggable="true"]'))return;let g={bubbles:!0,cancelable:!0,composed:!0,view:window,clientX:i,clientY:r,screenX:i,screenY:r,button:0,buttons:1};try{t.dispatchEvent(new PointerEvent("pointerdown",{...g,isPrimary:!0,pointerId:1,pointerType:"mouse",pressure:.5}))}catch{}t.dispatchEvent(new MouseEvent("mousedown",g));let d=4;for(let p=1;p<=d;p++){let f=Math.round(i+(s-i)*(p/d)),h=Math.round(r+(l-r)*(p/d)),A={...g,clientX:f,clientY:h,screenX:f,screenY:h};try{t.dispatchEvent(new PointerEvent("pointermove",{...A,isPrimary:!0,pointerId:1,pointerType:"mouse",pressure:.5}))}catch{}document.dispatchEvent(new MouseEvent("mousemove",A))}let m={bubbles:!0,cancelable:!0,composed:!0,view:window,clientX:s,clientY:l,screenX:s,screenY:l,button:0,buttons:0};try{e.dispatchEvent(new PointerEvent("pointerup",{...m,isPrimary:!0,pointerId:1,pointerType:"mouse",pressure:0}))}catch{}e.dispatchEvent(new MouseEvent("mouseup",m)),e.dispatchEvent(new MouseEvent("click",m));try{let p=po(z(t.textContent),t.outerHTML),f={...g},h={...m};p&&(f.dataTransfer=p,h.dataTransfer=p);let A=t.ownerDocument.defaultView?.DragEvent;if(!A)throw new Error("DragEvent n\xE3o dispon\xEDvel neste documento");t.dispatchEvent(new A("dragstart",f)),e.dispatchEvent(new A("dragenter",h)),e.dispatchEvent(new A("dragover",h)),e.dispatchEvent(new A("drop",h)),t.dispatchEvent(new A("dragend",f))}catch(p){console.warn("[EasyQuiz] DragEvent ignorado com seguran\xE7a:",p)}try{let p=new Touch({identifier:1,target:t,clientX:i,clientY:r}),f=new Touch({identifier:1,target:e,clientX:s,clientY:l});t.dispatchEvent(new TouchEvent("touchstart",{bubbles:!0,cancelable:!0,touches:[p]})),e.dispatchEvent(new TouchEvent("touchmove",{bubbles:!0,cancelable:!0,touches:[f]})),e.dispatchEvent(new TouchEvent("touchend",{bubbles:!0,cancelable:!0,touches:[]}))}catch{}if(o>=2&&!e.contains(t))try{t.focus?.(),t.dispatchEvent(new KeyboardEvent("keydown",{key:" ",code:"Space",bubbles:!0})),t.dispatchEvent(new KeyboardEvent("keyup",{key:" ",code:"Space",bubbles:!0})),await new Promise(p=>setTimeout(p,80)),e.focus?.(),e.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",bubbles:!0})),e.dispatchEvent(new KeyboardEvent("keyup",{key:"Enter",code:"Enter",bubbles:!0}))}catch{}if(!e.contains(t))try{let p=A=>{let b=Object.keys(A).find(x=>x.startsWith("__reactFiber")||x.startsWith("__reactInternalInstance"));if(!b)return null;let y=A[b];for(let x=0;x<10&&y;x++){if(y.memoizedProps)return y.memoizedProps;y=y.return}return null},f=p(t),h=p(e);if(f){let A=f.onMouseDown||f.onPointerDown||f.onDragStart;if(typeof A=="function")try{A({type:"mousedown",button:0,buttons:1,clientX:i,clientY:r,bubbles:!0,preventDefault:()=>{},stopPropagation:()=>{},currentTarget:t,target:t}),await new Promise(b=>setTimeout(b,100))}catch{}}if(h){let A=h.onMouseUp||h.onPointerUp||h.onDrop;if(typeof A=="function")try{A({type:"mouseup",button:0,buttons:0,clientX:s,clientY:l,bubbles:!0,preventDefault:()=>{},stopPropagation:()=>{},currentTarget:e,target:e})}catch{}}try{t.focus?.(),t.dispatchEvent(new KeyboardEvent("keydown",{key:" ",code:"Space",keyCode:32,bubbles:!0,cancelable:!0})),await new Promise(b=>setTimeout(b,200));let A=l>r?"ArrowDown":"ArrowUp";for(let b=0;b<3;b++)document.dispatchEvent(new KeyboardEvent("keydown",{key:A,bubbles:!0,cancelable:!0})),await new Promise(y=>setTimeout(y,60));document.dispatchEvent(new KeyboardEvent("keydown",{key:" ",code:"Space",keyCode:32,bubbles:!0,cancelable:!0})),await new Promise(b=>setTimeout(b,80))}catch{}try{document.querySelector("[data-rbd-draggable-id], [data-rbd-droppable-id], [data-dnd-kit-sortable]")&&(t.dispatchEvent(new CustomEvent("dndkitdragstart",{bubbles:!0,cancelable:!0,detail:{id:t.id||t.getAttribute("data-id")}})),await new Promise(b=>setTimeout(b,100)),e.dispatchEvent(new CustomEvent("dndkitdrop",{bubbles:!0,cancelable:!0,detail:{overId:e.id||e.getAttribute("data-id")}})))}catch{}}catch(p){console.warn("[EasyQuiz] Estrat\xE9gia G (React DnD internals) falhou:",p)}}var Pt={fill:(t,e)=>{let o=L(t);o?qe(o,e):console.warn(`$eq.fill: Elemento '${t}' n\xE3o encontrado`)},click:t=>{let e=L(t);e?!!(e.closest('.option-card, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, [class*="option" i], [class*="choice" i]')||e.querySelector('input[type="radio"], input[type="checkbox"]')||e instanceof HTMLInputElement&&["checkbox","radio"].includes(e.type))?re(e,!0):V(e):console.warn(`$eq.click: Elemento '${t}' n\xE3o encontrado`)},check:(t,e)=>{let o=L(t);o?re(o,e):console.warn(`$eq.check: Elemento '${t}' n\xE3o encontrado`)},find:(t,e)=>L(t,e),drag:(t,e)=>{let o=W(t,"source")||L(t),n=W(e,"destination")||L(e);o&&n?fe(o,n):console.warn(`$eq.drag: Origem ou destino n\xE3o encontrado ('${t}' -> '${e}')`)},categorize:async(t,e)=>{let o=W(t,"source")||L(t),n=W(e,"destination")||L(e);if(!o||!n){console.warn(`$eq.categorize: Item ou categoria n\xE3o encontrados ('${t}' -> '${e}')`);return}await fe(o,n)},execute:(t,e=!1,o=1)=>bo(t,e,o)};typeof window<"u"&&(window.$eq=Pt);async function fo(t,e=1,o=ot()){if(nt(t,o),t.t==="js"){let l=String(t.v||"");Lt(l);try{new Function("$eq","document","window",l)(Pt,document,window)}catch(c){throw console.warn("[EasyQuiz JS Execution]",c),c}return}if(t.t==="drag"){let l=W(t.from,"source")||L(t.from),c=W(t.to,"destination")||L(t.to);!l&&t.from&&(l=L(E(t.from))),!c&&t.to&&(c=L(E(t.to))),l&&c?await fe(l,c,e):console.warn(`[EasyQuiz] Drag: alvo n\xE3o encontrado ('${t.from}' -> '${t.to}')`);return}let n=t.id!==void 0&&t.id!==null?String(t.id):"";!n&&t.t==="val"&&(n=t.target??t.name??t.selector??"1");let a=t.v!==void 0?t.v:t.value!==void 0?t.value:t.val!==void 0?t.val:t.text,i=a!=null?String(a).trim():"",r=null,s=String(t.name??t.n??"").trim();if(!s&&n&&document.querySelector(`input[type="radio"][name="${N(n)}"]`)&&(s=n),(t.t==="chk"||t.t==="clk")&&s){let l=Array.from(document.querySelectorAll(`input[name="${N(s)}"]`));if(i&&(r=l.find(c=>c.value?.toLowerCase()===i.toLowerCase())??null),!r&&i){let c=/^(v|verdadeiro|true|1|t|sim|correto)$/i.test(i),u=/^(f|falso|false|0|nao|não|incorreto|errado)$/i.test(i);if(c||u){let g=c?["v","verdadeiro","true","1","t","sim","correto"]:["f","falso","false","0","nao","n\xE3o","incorreto","errado"];r=l.find(d=>{let m=d.value?.toLowerCase()??"";if(g.includes(m))return!0;let f=(d.closest('label, td, [class*="option" i]')?.textContent??"").trim().toLowerCase();return g.some(h=>f===h||f.startsWith(h+" ")||f.startsWith("("+h+")"))})??null}}!r&&l.length>0&&(r=l[0])}if(r||(r=L(n,i,t.t==="val"||t.t==="sel")),!r&&n&&(r=L(E(n),i,t.t==="val"||t.t==="sel")),r&&i){if(r instanceof HTMLInputElement&&r.type==="radio"&&r.name){if(E(r.value).toLowerCase()!==E(i).toLowerCase()){let l=document.querySelector(`input[type="radio"][name="${N(r.name)}"][value="${N(i)}" i]`);if(l)r=l;else{let u=Array.from(document.querySelectorAll(`input[type="radio"][name="${N(r.name)}"]`)).find(g=>{let d=g.closest("label, .vf-label, .option-card, tr, td, div");return d&&E(d.textContent).toLowerCase().includes(E(i).toLowerCase())});u&&(r=u)}}}else if(!(r instanceof HTMLInputElement)&&!(r instanceof HTMLSelectElement)&&!(r instanceof HTMLTextAreaElement)){let l=r.querySelector(`input[value="${N(i)}" i], [data-value="${N(i)}" i]`);if(l)r=l;else{let u=Array.from(r.querySelectorAll('input[type="radio"], input[type="checkbox"]')).find(g=>{let d=g.closest("label, .vf-label, .option-card, td, div");return d&&E(d.textContent).toLowerCase().includes(E(i).toLowerCase())});u&&(r=u)}}}if(!r&&(t.t==="val"||t.t==="sel")){let l=document.body;try{l=Z()||document.body}catch{}let c=Array.from(l.querySelectorAll(t.t==="sel"?'select, [role="combobox"], [role="listbox"]':'input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, select, [contenteditable="true"]')).filter(u=>T(u)&&!q(u));if(c.length===1)r=c[0];else if(c.length>1){let u=E(n).toLowerCase(),g=u.match(/^#?_?([0-9]+)$/);if(g){let d=parseInt(g[1],10);d>=1&&d<=c.length?r=c[d-1]:d>=0&&d<c.length&&(r=c[d])}r||(r=c.find(m=>{let p=(m.getAttribute("placeholder")||"").toLowerCase(),f=(m.name||"").toLowerCase(),h=(m.getAttribute("aria-label")||"").toLowerCase(),A=(m.id||"").toLowerCase(),b=E($e(m)).toLowerCase(),y=E(m.closest('label, tr, td, .form-group, .field, [class*="row" i], div')?.textContent||"").toLowerCase();return p.includes(u)||f.includes(u)||h.includes(u)||A.includes(u)||b&&b.includes(u)||u.length>=2&&y.includes(u)})||(c.length===1?c[0]:null))}}if(!r&&t.t!=="adv"){let l=document.querySelector(".perseus-renderer, .framework-perseus, .perseus-widget-container");if(l){let c=E(n).toLowerCase(),u=Array.from(l.querySelectorAll('.mq-editable-field, [role="radio"], [role="checkbox"], [role="combobox"], input:not([type="hidden"]), textarea, select, [role="button"], [role="option"]')).filter(g=>T(g)&&!q(g));if(r=u.find(g=>{let d=(g.textContent||"").trim().toLowerCase(),m=(g.id||"").toLowerCase(),p=(g.getAttribute("aria-label")||"").toLowerCase(),f=(g.value||g.getAttribute("data-value")||"").toLowerCase();return m===c||d===c||p===c||f===c||c.length>=3&&(d.includes(c)||p.includes(c))})||null,!r&&t.t==="val"&&u.length>0){let g=u.filter(d=>d instanceof HTMLInputElement||d instanceof HTMLTextAreaElement||d.classList.contains("mq-editable-field")||d.classList.contains("mq-root-block")||d.isContentEditable);if(g.length>0){let d=c.match(/^#?_?([0-9]+)$/);if(d){let m=parseInt(d[1],10);r=g[Math.min(m-1,g.length-1)]||g[0]}else r=g[0]}}}}if(!r&&t.t!=="adv")throw new Error(`Alvo '${n}' n\xE3o encontrado no DOM para a\xE7\xE3o '${t.t}'.`);switch(t.t){case"val":if(r){let u=r instanceof HTMLInputElement||r instanceof HTMLTextAreaElement||r instanceof HTMLSelectElement||r.isContentEditable?r:r.querySelector('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]');if(!u){let p=r.closest('.form-group, .field, [class*="input" i], [class*="control" i], label, tr, td, li, p, div')?.querySelector('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]');p&&(u=p)}if(!u){let m=r.nextElementSibling;for(;m;){if(m instanceof HTMLInputElement&&!["hidden","button","submit","checkbox","radio"].includes(m.type)||m instanceof HTMLTextAreaElement||m instanceof HTMLElement&&m.isContentEditable){u=m;break}let p=m.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(p){u=p;break}m=m.nextElementSibling}}if(!u){let m=document.body;try{m=Z()||document.body}catch{}let p=Array.from(m.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]')).filter(f=>T(f)&&!q(f));p.length>0&&(u=p[0])}let g=t.v!==void 0?t.v:t.value!==void 0?t.value:t.val!==void 0?t.val:t.text,d=g!=null?String(g):"";qe(u||r,d)}break;case"chk":let l=t.c!==void 0?!!t.c:!0;r&&re(r,l);break;case"sel":if(r){let u=Array.isArray(t.v)?t.v:[String(t.v)];Oe(r,u)}break;case"clk":if(r)if(!!(r.closest('.option-card, label, .vf-label, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, [class*="option" i], [class*="choice" i], [class*="answer" i], li, tr')||r.querySelector('input[type="radio"], input[type="checkbox"]')||r instanceof HTMLInputElement&&["checkbox","radio"].includes(r.type))){let g=t.c!==void 0?!!t.c:!0;re(r,g)}else V(r,t.co);break;case"adv":let c=Dt(t.id);if(c){await at(c,1200);let u=t.id||c.textContent?.trim()||"";u&&Xe(window.location.hostname,{advanceSelector:u}),V(c)}else console.warn("[EasyQuiz] Bot\xE3o de avan\xE7o n\xE3o localizado.");break}}function go(){let t=["button","a",'[role="button"]','input[type="submit"]','input[type="button"]','[data-testid*="check" i]','[data-test-id*="check" i]'].join(",");return Array.from(document.querySelectorAll(t)).find(o=>{if(!T(o)||q(o)||o.closest("header, nav, aside"))return!1;let n=o instanceof HTMLInputElement||o instanceof HTMLButtonElement?o.value:"",a=(o.textContent||n||o.getAttribute("aria-label")||"").trim();return/(verificar|checar|check|conferir|validar|enviar|responder)/i.test(a)})||null}function Dt(t){let e=d=>{let m=(d.getAttribute("aria-label")||d.textContent||(d instanceof HTMLInputElement||d instanceof HTMLButtonElement?d.value:"")||"").trim();return le.test(m)};if(t){let d=L(t);if(d&&T(d)&&!q(d)&&!B(d)&&!e(d))return d}try{let d=Ue(window.location.hostname);if(d.advanceSelector){let m=L(d.advanceSelector);if(m&&T(m)&&!q(m)&&!B(m)&&!e(m))return m}}catch{}let o=["button","a",'[role="button"]','[role="link"]','input[type="button"]','input[type="submit"]','[data-testid*="next" i]','[data-testid*="continue" i]','[data-testid*="check" i]','[data-test-id*="next" i]','[data-test-id*="continue" i]','[data-test-id*="check" i]','[class*="next" i]','[class*="continue" i]','[class*="proximo" i]','[class*="avancar" i]'].join(","),n=Array.from(document.querySelectorAll(o)),a=d=>{let m=d instanceof HTMLInputElement||d instanceof HTMLButtonElement?d.value:"";return(d.getAttribute("aria-label")||d.textContent||m||"").trim()},i=d=>{let m=a(d).trim();return/^\d{1,3}$/.test(m)?!!d.closest('[class*="pagination" i], [class*="pager" i], [class*="page-nav" i], [class*="step-indicator" i], [class*="breadcrumb" i], [class*="steps" i], [aria-label*="p\xE1gina" i], [aria-label*="page" i], [role="navigation"], nav'):!1},r=n.filter(d=>T(d)&&!q(d)&&!d.closest("header, aside")&&!B(d)&&!e(d));for(let d of r){let m=a(d),p=m.replace(/[\d\(\)\[\]\u2192>\u2022\-\/\\]+/g," ").trim();if((ve.test(m)||ve.test(p))&&!i(d)&&!B(d))return d}for(let d of r)if(K(d)&&!B(d)&&!i(d))return d;let s=document.querySelector('[data-test-id*="next" i], [data-testid*="next" i], [aria-label*="next" i], [aria-label*="pr\xF3xim" i], [aria-label*="avan\xE7ar" i], [aria-label*="continuar" i]');if(s&&T(s)&&!q(s)&&!B(s)&&!e(s))return s;let l=Array.from(document.querySelectorAll('input[type="submit"], button[type="submit"]'));for(let d of l)if(T(d)&&!q(d)&&!e(d)&&!B(d)&&!i(d))return d;let c=Array.from(document.querySelectorAll('button, [role="button"]')),u=window.innerHeight,g=c.filter(d=>{if(!T(d)||q(d)||e(d)||B(d)||d.closest("header, nav, aside, .eq-sidebar")||i(d))return!1;let m=d.getBoundingClientRect();return m.top>u*.45&&m.height>=24&&m.width>=24});if(g.length>0)return g.sort((d,m)=>{let p=d.getBoundingClientRect(),f=m.getBoundingClientRect(),h=p.left+p.top;return f.left+f.top-h}),g[0];for(let d of r)if(K(d)&&!B(d))return d;return null}async function at(t,e=2500){let o=Date.now();for(;Date.now()-o<e;){if(!(t.disabled===!0||t.getAttribute("aria-disabled")==="true"||t.classList.contains("disabled")||t.getAttribute("disabled")!==null))return;await new Promise(a=>setTimeout(a,80))}}function ho(){let t=window.location.href,e=document.title,o=document.querySelectorAll('input, textarea, select, button, [role="button"], [role="option"], [role="radio"], [role="checkbox"]').length,n=(document.body?.innerText||document.body?.textContent||"").length;return`${t}|${e}|${o}|${n}`}async function Ao(t,e=3500){let[o,n,a,i]=t.split("|"),r=parseInt(i||"0",10),s=Date.now();for(;Date.now()-s<e;){let l=window.location.href,c=document.title,u=String(document.querySelectorAll('input, textarea, select, button, [role="button"], [role="option"], [role="radio"], [role="checkbox"]').length),g=(document.body?.innerText||document.body?.textContent||"").length;if(l!==o)return{changed:!0,evidence:`URL mudou: ${o} \u2192 ${l}`};if(c!==n)return{changed:!0,evidence:`T\xEDtulo da p\xE1gina mudou: "${n}" \u2192 "${c}"`};if(Math.abs(parseInt(u)-parseInt(a||"0"))>=2)return{changed:!0,evidence:`Controles interativos: ${a} \u2192 ${u}`};if(Math.abs(g-r)>50)return{changed:!0,evidence:`Conte\xFAdo da p\xE1gina mudou substancialmente (${Math.abs(g-r)} chars)`};await new Promise(d=>setTimeout(d,100))}return{changed:!1,evidence:"Nenhuma mudan\xE7a estrutural detectada dentro do tempo limite."}}async function Ot(t){if(t.t==="js"||t.t==="adv")return;if(t.t==="drag"){let i=L(t.from)||L(E(t.from)),r=L(t.to)||L(E(t.to));i&&r&&await fe(i,r,2);return}let e=t.id||"",o=t.v!==void 0?String(t.v).trim():"",n=L(e,o)||L(E(e),o),a=String(t.name??t.n??"").trim();if(!a&&e&&document.querySelector(`input[type="radio"][name="${N(e)}"]`)&&(a=e),!n&&a){let i=Array.from(document.querySelectorAll(`input[name="${N(a)}"]`));if(o&&(n=i.find(r=>r.value?.toLowerCase()===o.toLowerCase())??null),!n&&o){let r=/^(v|verdadeiro|true|1|t|sim|correto)$/i.test(o),s=/^(f|falso|false|0|nao|não|incorreto|errado)$/i.test(o);if(r||s){let l=r?["v","verdadeiro","true","1","t","sim","correto"]:["f","falso","false","0","nao","n\xE3o","incorreto","errado"];n=i.find(c=>{let u=c.value?.toLowerCase()??"";if(l.includes(u))return!0;let d=(c.closest('label, td, [class*="option" i]')?.textContent??"").trim().toLowerCase();return l.some(m=>d===m||d.startsWith(m+" ")||d.startsWith("("+m+")"))})??null}}!n&&i.length>0&&(n=i[0])}if(t.t==="clk"||t.t==="chk"){if(!n&&e){let r=Array.from(document.querySelectorAll('input, label, button, [role="radio"], [role="checkbox"], .option-card, [class*="option" i], [class*="choice" i]')),s=E(e).toLowerCase();n=r.find(l=>{let c=E(l.textContent).toLowerCase();return!!(E(l.value||"").toLowerCase()===s||c===s||c.startsWith(s+")")||c.startsWith("("+s+")")||c.startsWith(s+".")||c.startsWith(s+" - ")||c.startsWith(s+":")||s.length>=3&&c.includes(s))})||null}let i=t.v!==void 0?String(t.v).trim():"";if(n&&i){if(n instanceof HTMLInputElement&&n.type==="radio"&&n.name){if(E(n.value).toLowerCase()!==E(i).toLowerCase()){let r=document.querySelector(`input[type="radio"][name="${N(n.name)}"][value="${N(i)}" i]`);if(r)n=r;else{let l=Array.from(document.querySelectorAll(`input[type="radio"][name="${N(n.name)}"]`)).find(c=>{let u=c.closest("label, .vf-label, .option-card, tr, td, div");return u&&E(u.textContent).toLowerCase().includes(E(i).toLowerCase())});l&&(n=l)}}}else if(!(n instanceof HTMLInputElement)&&!(n instanceof HTMLSelectElement)&&!(n instanceof HTMLTextAreaElement)){let r=n.querySelector(`input[value="${N(i)}" i], [data-value="${N(i)}" i]`);if(r)n=r;else{let l=Array.from(n.querySelectorAll('input[type="radio"], input[type="checkbox"]')).find(c=>{let u=c.closest("label, .vf-label, .option-card, td, div");return u&&E(u.textContent).toLowerCase().includes(E(i).toLowerCase())});l&&(n=l)}}}if(n){let r=n.closest('.option-card, label, .vf-label, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, li')||n,s=n instanceof HTMLInputElement&&["radio","checkbox"].includes(n.type)?n:r.querySelector('input[type="radio"], input[type="checkbox"]')||(r.getAttribute("for")?r.ownerDocument.getElementById(r.getAttribute("for")):null),l=t.c!==void 0?!!t.c:!0;if(re(s||r,l),s&&s.checked!==l){try{let c=s._valueTracker;c&&c.setValue(!l)}catch{}try{Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"checked")?.set?.call(s,l)}catch{}s.checked=l,s.dispatchEvent(new Event("input",{bubbles:!0,composed:!0})),s.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}}return}if(t.t==="val"){let i=null;if(n&&(i=n instanceof HTMLInputElement||n instanceof HTMLTextAreaElement||n.isContentEditable?n:n.querySelector('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]')),!i){let r=document.body;try{r=Z()||document.body}catch{}let s=Array.from(r.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]')),l=E(e).toLowerCase();i=s.find(c=>{let u=(c.getAttribute("placeholder")||"").toLowerCase(),g=(c.name||"").toLowerCase(),d=(c.id||"").toLowerCase(),m=(c.getAttribute("aria-label")||"").toLowerCase();return u.includes(l)||g.includes(l)||d.includes(l)||m.includes(l)})||(s.length>0?s[0]:null)}if(i){let r=String(t.v??"");try{if(i.focus?.(),i.type!=="number"){try{i.select?.()}catch{}document.execCommand?.("insertText",!1,r)}}catch{}qe(i,r)}return}if(t.t==="sel"){if(!n&&e){let i=Array.from(document.querySelectorAll("select")),r=E(e).toLowerCase();n=i.find(s=>{let l=(s.name||"").toLowerCase(),c=(s.id||"").toLowerCase(),u=(s.getAttribute("aria-label")||"").toLowerCase();return l.includes(r)||c.includes(r)||u.includes(r)})||null}if(n){let i=Array.isArray(t.v)?t.v:[String(t.v)];Oe(n,i)}return}}function te(t){try{if(t.t==="val"){let e=t.v!==void 0?t.v:t.value!==void 0?t.value:t.val!==void 0?t.val:t.text,o=String(e??"").trim(),n=o,a=t.id!==void 0&&t.id!==null?String(t.id):"";a||(a=t.target??t.name??t.selector??"1");let i=L(a,n,!0)||L(E(a),n,!0);if(!i){let m=document.body;try{m=Z()||document.body}catch{}let p=Array.from(m.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]')).filter(f=>T(f)&&!q(f));p.length>0&&(i=p[0])}if(!i)return!1;let r=i instanceof HTMLInputElement&&i.type==="radio"?i:i.querySelector('input[type="radio"]');if(r&&r.name){let m=document.querySelector(`input[type="radio"][name="${N(r.name)}"]:checked`);if(!m)return!1;let p=E(m.value).toLowerCase(),f=E(o).toLowerCase(),h=E(m.closest("label, .vf-label, .option-card, tr, td, div")?.textContent||"").toLowerCase();return p===f||h===f||h.includes(f)}let s=i instanceof HTMLInputElement||i instanceof HTMLTextAreaElement||i.isContentEditable?i:i.querySelector('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(!s){let p=i.closest('.form-group, .field, [class*="input" i], [class*="control" i], label, tr, td, li, p, div')?.querySelector('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]');p&&(s=p)}if(!s){let m=i.nextElementSibling;for(;m;){if(m instanceof HTMLInputElement&&!["hidden","button","submit","checkbox","radio"].includes(m.type)||m instanceof HTMLTextAreaElement||m instanceof HTMLElement&&m.isContentEditable){s=m;break}let p=m.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(p){s=p;break}m=m.nextElementSibling}}if(s instanceof HTMLSelectElement){let m=E(o).toLowerCase();return Array.from(s.options).some(p=>{if(!p.selected)return!1;let f=p.value.toLowerCase(),h=E(p.textContent).toLowerCase();return m===f||m===h||f.includes(m)||h.includes(m)})}let l=(s instanceof HTMLInputElement||s instanceof HTMLTextAreaElement?s.value:s?.textContent??i.textContent??"").trim();if(!l&&!o)return!0;if(!l&&o)return!1;let c=l.replace(",",".").replace(/\s+/g,"").toLowerCase(),u=o.replace(",",".").replace(/\s+/g,"").toLowerCase(),g=parseFloat(c),d=parseFloat(u);return!isNaN(g)&&!isNaN(d)&&c.match(/^-?[\d.,]+$/)&&u.match(/^-?[\d.,]+$/)?Math.abs(g-d)<1e-4:c===u||l.toLowerCase()===o.toLowerCase()||u.length>=3&&c===u}if(t.t==="sel"){let e=L(t.id,void 0,!0)||L(E(t.id),void 0,!0);if(!e){let i=document.body;try{i=Z()||document.body}catch{}let r=Array.from(i.querySelectorAll('select, [role="combobox"], [role="listbox"]')).filter(c=>T(c)&&!q(c)),s=E(t.id).toLowerCase();e=r.find(c=>{let u=(c.id||"").toLowerCase(),g=(c.getAttribute("name")||"").toLowerCase(),d=(c.getAttribute("aria-label")||"").toLowerCase(),m=E(c.closest('.dropdown-row, [class*="dropdown" i], [class*="select" i], tr, label, div')?.textContent||"").toLowerCase();return u.includes(s)||g.includes(s)||d.includes(s)||s.length>=2&&m.includes(s)})||(r.length===1?r[0]:null)}if(!e)return!1;let o=e instanceof HTMLSelectElement?e:e.querySelector("select");if(!o){let i=e.matches?.('[role="combobox"], [role="listbox"], [class*="select" i], [class*="dropdown" i]')?e:e.closest('[role="combobox"], [role="listbox"], [class*="select" i], [class*="dropdown" i]');if(i){let s=(Array.isArray(t.v)?t.v:[String(t.v)]).map(c=>E(c).toLowerCase()),l=E(i.textContent).toLowerCase();return s.some(c=>l.includes(c)||c.includes(l))}return!1}let a=(Array.isArray(t.v)?t.v:[String(t.v)]).map(i=>E(i).toLowerCase());return Array.from(o.options).some(i=>{if(!i.selected)return!1;let r=i.value.toLowerCase(),s=E(i.textContent).toLowerCase();return a.some(l=>l===r||l===s||r.includes(l)||s.includes(l))})}if(t.t==="chk"||t.t==="clk"){let e=t.v!==void 0?String(t.v).trim():"",o=String(t.name??t.n??"").trim();if(o&&!t.id){let d=Array.from(document.querySelectorAll(`input[name="${N(o)}"]`));if(d.length>0){let m=d.find(b=>b.checked);if(!m)return!1;if(!e)return!0;let p=m.value?.toLowerCase()??"",f=e.toLowerCase();if(p===f)return!0;let h=/^(v|verdadeiro|true|1|t|sim|correto)$/i.test(e),A=/^(f|falso|false|0|nao|não|incorreto|errado)$/i.test(e);return h?/^(v|verdadeiro|true|1|t|sim|correto)$/i.test(p):A?/^(f|falso|false|0|nao|não|incorreto|errado)$/i.test(p):!1}}let n=L(t.id,e)||L(E(t.id),e);if(!n&&o){let d=document.querySelector(`input[name="${N(o)}"]`);d&&(n=d)}if(!n)return!1;let a=n.closest('.option-card, label, .vf-label, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, li')||n,i=n instanceof HTMLInputElement&&["checkbox","radio"].includes(n.type)?n:a.querySelector('input[type="checkbox"], input[type="radio"]')||(a.getAttribute("for")?a.ownerDocument.getElementById(a.getAttribute("for")):null),r=t.t==="chk"||t.c!==void 0?!!t.c:!0;if(i&&i.type==="radio"){if(i.checked===r)return!0;if(t.v&&i.name){let d=E(String(t.v)).toLowerCase(),m=document.querySelector(`input[type="radio"][name="${N(i.name)}"]:checked`);if(!m)return!1;if(m===i)return!0;let p=E(m.value).toLowerCase(),f=E(m.closest("label, .vf-label, .option-card, tr, td, div")?.textContent||"").toLowerCase();return p===d||f.includes(d)||d.includes(p)}}if(i&&["checkbox","radio"].includes(i.type))return i.checked===r;let s=a.getAttribute("aria-checked")===String(r)||a.getAttribute("aria-selected")===String(r)||a.getAttribute("aria-pressed")===String(r),l=r?a.getAttribute("data-selected")==="true"||a.getAttribute("data-checked")==="true"||a.getAttribute("data-active")==="true"||a.getAttribute("data-state")==="checked"||a.getAttribute("data-state")==="on":a.getAttribute("data-selected")==="false"||a.getAttribute("data-checked")==="false"||a.getAttribute("data-state")==="unchecked",c=a.className||"",u=r?/\b(active|selected|checked|picked|is-selected|choice-selected|selected-option|is-checked|chosen|current)\b/i.test(c):!/\b(active|selected|checked|picked|is-selected|choice-selected|selected-option|is-checked|chosen|current)\b/i.test(c);if(s||l||u)return!0;let g=!!a.closest('[role="radiogroup"], [role="listbox"], .options, .choices, [class*="option" i], [class*="choice" i], [class*="answer" i], [class*="quiz" i]');return t.t==="clk"&&!i&&!g||a.getAttribute("aria-expanded")!==null||a.getAttribute("aria-pressed")!==null}if(t.t==="drag"){let e=W(t.from,"source")||L(t.from)||L(E(t.from)),o=W(t.to,"destination")||L(t.to)||L(E(t.to));return!e||!o?!1:mo(e,o).success}}catch{}return!1}async function bo(t,e,o=1,n=ot({engine:"smart",autoAdvance:e})){let a=t.actions.filter(v=>v.t!=="adv"),i=t.actions.filter(v=>v.t==="adv"),r=0,s=[],l=new Map,c=new Map,u=new Map,g=new Set,d=t.pageType==="question"||a.length>0,m=a.filter(v=>v.t==="chk"||v.t==="clk"&&v.c!==void 0),p=new Map;for(let v of a){let S=[];c.set(v,S);try{if(v.t==="drag"){S.push("declarative-A-F");try{let _=W(v.from,"source")||L(v.from),C=W(v.to,"destination")||L(v.to);_&&u.set(v,_.parentElement?.outerHTML?.slice(0,500)||""),C&&p.set(v,C.children.length)}catch{}}else S.push("declarative-primary");await fo(v,o,n),r++,g.add(v)}catch(_){l.set(v,_ instanceof Error?_.message:String(_)),console.warn("[EasyQuiz] A\xE7\xE3o declarativa prim\xE1ria falhou com seguran\xE7a:",v,_)}await new Promise(_=>setTimeout(_,v.t==="drag"?180:35))}if(d&&t.mode==="escolha_multipla"&&m.length>0){let v=document.body;try{v=Z()||document.body}catch{}let S=Array.from(v.querySelectorAll('input[type="checkbox"], [role="checkbox"]')).filter(_=>T(_)&&!q(_));if(S.length>1){let C=function(I,O){if(I===O||I.contains(O)||O.contains(I))return!0;let D=I.closest('.option-card, label, [role="checkbox"], [role="option"], tr, li, [class*="option" i]'),H=O.closest('.option-card, label, [role="checkbox"], [role="option"], tr, li, [class*="option" i]');if(D&&H&&D===H)return!0;let U=I.getAttribute("for")||I.id,Q=O.getAttribute("for")||O.id;return!!(U&&Q&&U===Q)};var P=C;let _=new Set;for(let I of m){let O=I.t==="chk"?!!I.c:!!(I.c??!0),D="id"in I&&typeof I.id=="string"?I.id:"";if(O&&D){let H=L(D,I.v);if(H){_.add(H);let U=H.querySelector('input[type="checkbox"]');U&&_.add(U);let Q=H.closest('.option-card, label, [role="checkbox"], tr, li, [class*="option" i]');Q&&(_.add(Q),Q.querySelectorAll('input[type="checkbox"]').forEach(R=>_.add(R)))}}}if(_.size>=m.length&&_.size>0){let I=Array.from(_);for(let O of S)I.some(H=>C(H,O))||(O instanceof HTMLInputElement&&O.checked||O.getAttribute("aria-checked")==="true"||O.closest(".option-card, label")?.classList.contains("selected"))&&re(O,!1)}}}await new Promise(v=>setTimeout(v,a.length>0?100:25));let f=0;for(let v of a){if(te(v)){f++;continue}console.warn(`[EasyQuiz Auto-Cura] A\xE7\xE3o '${v.t}' no alvo '${v.id||v.from||""}' n\xE3o verificada no DOM. Disparando Passagem 2 de conting\xEAncia...`);try{nt(v,n),c.get(v)?.push("alternative-path"),await Ot(v)}catch(S){l.set(v,S instanceof Error?S.message:String(S)),console.warn("[EasyQuiz Auto-Cura] Rota alternativa falhou:",S)}await new Promise(S=>setTimeout(S,250)),te(v)&&(console.log("[EasyQuiz Auto-Cura] \u2713 A\xE7\xE3o recuperada com sucesso pela rota de conting\xEAncia!"),f++,g.has(v)?l.has(v)&&l.delete(v):(l.delete(v),r++,g.add(v)))}if(f<a.length&&a.length>0){console.warn(`[EasyQuiz Auto-Cura] ${a.length-f} de ${a.length} a\xE7\xE3o(\xF5es) ainda n\xE3o verificadas. Disparando Passagem 3 final...`),await new Promise(v=>setTimeout(v,200));for(let v of a)if(!te(v))try{if(await Ot(v),await new Promise(S=>setTimeout(S,80)),!te(v)&&(v.t==="clk"||v.t==="chk"))try{let S="id"in v?String(v.id||""):"",_=v.v!==void 0?String(v.v).trim():"",C=L(S,_)||L(E(S),_);C&&(He(C),await new Promise(I=>setTimeout(I,120)))}catch{}}catch(S){l.set(v,S instanceof Error?S.message:String(S))}await new Promise(v=>setTimeout(v,200)),f=0;for(let v of a)te(v)&&(f++,g.has(v)?l.has(v)&&l.delete(v):(l.delete(v),r++,g.add(v)))}let h=[];for(let[v,S]of a.entries())if(!te(S)){let _=S.t==="drag"?`${S.from} -> ${S.to}`:"id"in S&&S.id?S.id:S.t;s.push(_),h.push({actionIndex:v,action:S,strategiesAttempted:c.get(S)||[],evidence:l.get(S)||"sem evid\xEAncia de aplica\xE7\xE3o no DOM",domSnapshot:u.get(S)}),S.t==="drag"&&console.warn(`[EasyQuiz Drag] FALHA CONFIRMADA: "${S.from}" -> "${S.to}"`,`
  Estrat\xE9gias: ${(c.get(S)||[]).join(", ")}`,`
  Snapshot DOM: ${u.get(S)?.slice(0,200)||"n/a"}`)}d&&a.length===0&&s.push("nenhuma a\xE7\xE3o de resposta prescrita");let A=a.map((v,S)=>{let _=v.t==="drag"?`${v.from} -> ${v.to}`:v.t==="js"?"$eq":v.id||v.t,C=v.t==="js"?!0:v.t==="drag"?!!(W(v.from,"source")&&W(v.to,"destination")):!!(L(v.id||"")||L(E(v.id||""))),I=te(v);return{index:S,action:v,target:_,located:C,applied:!l.has(v),verified:I,strategy:v.t==="drag"?"drag-adaptive":v.t==="js"?"javascript":"declarative-dom",evidence:I?"estado do controle confirmado no DOM":"nenhuma evid\xEAncia suficiente ap\xF3s as tentativas",...l.has(v)?{error:l.get(v)}:{}}}),b=d?a.length>0&&s.length===0&&(f===a.length||r===a.length&&f>0):!0,y=!1,x=!1,w="Nenhuma a\xE7\xE3o de navega\xE7\xE3o solicitada.",k=d?f>0&&f>=Math.ceil(a.length/2):r>0&&r>=a.length/2,M=d?f>0&&(b||k):b||a.length===0||k;if(e&&M){await new Promise(_=>setTimeout(_,a.length>0?120:40));let v=!1,S=null;if(t.pageType!=="info"){let _=go();if(_&&T(_)){await at(_,1200),V(_),v=!0,S=_,await new Promise(O=>setTimeout(O,350));let C=document.querySelector('.feedback-message.error, [class*="feedback"][class*="error" i], [role="alert"][class*="error" i]');C&&T(C)&&(C.textContent||"").trim().length>0?(y=!1,x=!1,w=`Aviso do formul\xE1rio ap\xF3s checagem: ${C.textContent?.trim().slice(0,100)}`):(y=!0,x=!0,w="Resposta confirmada via bot\xE3o de verifica\xE7\xE3o/envio.")}}if(!v){let _=ho(),C=i.length>0&&"id"in i[0]?i[0].id:void 0,I=Dt(C);if(I){await at(I,1500);let O=C||I.textContent?.trim()||"";O&&Xe(window.location.hostname,{advanceSelector:O}),V(I);let D=await Ao(_,1800);x=D.changed,w=D.evidence,y=D.changed||!0,D.changed||console.warn("[EasyQuiz] O bot\xE3o de avan\xE7o foi acionado, mas a navega\xE7\xE3o ainda n\xE3o concluiu.")}else console.warn("[EasyQuiz] Nenhum bot\xE3o de avan\xE7o encontrado na p\xE1gina.")}}return{applied:r,verified:f,success:b,advanced:y,failed:s,reports:A,navigationVerified:x,navigationEvidence:w,failedActions:h}}var ge="v3.4.9";var xe={canvasLogo:"data:image/png;base64,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dR/4337uYwwdXhTSKDB5oWAsGwgYGodS2wpYM8gEplWlTok0HWlElUTRdKKJ6My0nSYVScooVdtkmrZMOpkyk6JpQwKhDQEaJSkwBGPj2BiDjS+Xa7DMNROLJBBnwNg8z54/7Avn3vuctc/Lfln7tz8fCSH57LPPPmvte/f53v1b5zRt27YFAACApbu1aZpXTH0QS3Yw9QEAAAAAAjoAAACkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACh1MfAFTgM03TXDn1QQAAAPPmDjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAIC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",logo:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.8L19.2 8 12 11.2 4.8 8 12 4.8zM4 9.6l7 3.1v7.5l-7-3.5V9.6zm9 10.6v-7.5l7-3.1v7.1l-7 3.5z"/></svg>',rocket:`
<svg
  class="lucide lucide-rocket"
  xmlns="http://www.w3.org/2000/svg"
  width="16"
  height="16"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09" />
  <path d="M9 12a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.4 22.4 0 0 1-4 2z" />
  <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 .05 5 .05" />
</svg>
`,play:`
<svg
  class="lucide lucide-play"
  xmlns="http://www.w3.org/2000/svg"
  width="16"
  height="16"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" />
</svg>
`,stop:`
<svg
  class="lucide lucide-square"
  xmlns="http://www.w3.org/2000/svg"
  width="16"
  height="16"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <rect width="18" height="18" x="3" y="3" rx="2" />
</svg>
`,code:`
<svg
  class="lucide lucide-code"
  xmlns="http://www.w3.org/2000/svg"
  width="16"
  height="16"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="m16 18 6-6-6-6" />
  <path d="m8 6-6 6 6 6" />
</svg>
`,terminal:`
<svg
  class="lucide lucide-terminal"
  xmlns="http://www.w3.org/2000/svg"
  width="16"
  height="16"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M12 19h8" />
  <path d="m4 17 6-6-6-6" />
</svg>
`,inspector:`
<svg
  class="lucide lucide-scan-search"
  xmlns="http://www.w3.org/2000/svg"
  width="16"
  height="16"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M3 7V5a2 2 0 0 1 2-2h2" />
  <path d="M17 3h2a2 2 0 0 1 2 2v2" />
  <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
  <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
  <circle cx="12" cy="12" r="3" />
  <path d="m16 16-1.9-1.9" />
</svg>
`,settings:`
<svg
  class="lucide lucide-settings"
  xmlns="http://www.w3.org/2000/svg"
  width="16"
  height="16"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915" />
  <circle cx="12" cy="12" r="3" />
</svg>
`,key:`
<svg
  class="lucide lucide-key"
  xmlns="http://www.w3.org/2000/svg"
  width="16"
  height="16"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="m2 21 9.6-9.6" />
  <path d="m7.5 15.5 2.3 2.3a1 1 0 0 1 0 1.4l-2.1 2.1a1 1 0 0 1-1.4 0L4 19" />
  <circle cx="15.5" cy="7.5" r="5.5" />
</svg>
`,paste:`
<svg
  class="lucide lucide-clipboard-paste"
  xmlns="http://www.w3.org/2000/svg"
  width="16"
  height="16"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M11 14h10" />
  <path d="M16 4h2a2 2 0 0 1 2 2v1.344" />
  <path d="m17 18 4-4-4-4" />
  <path d="M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 1.793-1.113" />
  <rect x="8" y="2" width="8" height="4" rx="1" />
</svg>
`,edit:`
<svg
  class="lucide lucide-pencil"
  xmlns="http://www.w3.org/2000/svg"
  width="16"
  height="16"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
  <path d="m15 5 4 4" />
</svg>
`,trash:`
<svg
  class="lucide lucide-trash"
  xmlns="http://www.w3.org/2000/svg"
  width="16"
  height="16"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M10 11v6" />
  <path d="M14 11v6" />
  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
  <path d="M3 6h18" />
  <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
</svg>
`,eraser:`
<svg
  class="lucide lucide-eraser"
  xmlns="http://www.w3.org/2000/svg"
  width="16"
  height="16"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M21 21H8a2 2 0 0 1-1.42-.587l-3.994-3.999a2 2 0 0 1 0-2.828l10-10a2 2 0 0 1 2.829 0l5.999 6a2 2 0 0 1 0 2.828L12.834 21" />
  <path d="m5.082 11.09 8.828 8.828" />
</svg>
`,save:`
<svg
  class="lucide lucide-save"
  xmlns="http://www.w3.org/2000/svg"
  width="16"
  height="16"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
  <path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7" />
  <path d="M7 3v4a1 1 0 0 0 1 1h7" />
</svg>
`,analyze:`
<svg
  class="lucide lucide-scan-line"
  xmlns="http://www.w3.org/2000/svg"
  width="16"
  height="16"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M3 7V5a2 2 0 0 1 2-2h2" />
  <path d="M17 3h2a2 2 0 0 1 2 2v2" />
  <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
  <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
  <path d="M7 12h10" />
</svg>
`,apply:`
<svg
  class="lucide lucide-circle-check-big"
  xmlns="http://www.w3.org/2000/svg"
  width="16"
  height="16"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M21.801 10A10 10 0 1 1 17 3.335" />
  <path d="m9 11 3 3L22 4" />
</svg>
`,close:`
<svg
  class="lucide lucide-x"
  xmlns="http://www.w3.org/2000/svg"
  width="16"
  height="16"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M18 6 6 18" />
  <path d="m6 6 12 12" />
</svg>
`,chevronRight:`
<svg
  class="lucide lucide-chevron-right"
  xmlns="http://www.w3.org/2000/svg"
  width="16"
  height="16"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="m9 18 6-6-6-6" />
</svg>
`,chevronDown:`
<svg
  class="lucide lucide-chevron-down"
  xmlns="http://www.w3.org/2000/svg"
  width="16"
  height="16"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="m6 9 6 6 6-6" />
</svg>
`,chevronLeft:`
<svg
  class="lucide lucide-chevron-left"
  xmlns="http://www.w3.org/2000/svg"
  width="16"
  height="16"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="m15 18-6-6 6-6" />
</svg>
`,eye:`
<svg
  class="lucide lucide-eye"
  xmlns="http://www.w3.org/2000/svg"
  width="16"
  height="16"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
  <circle cx="12" cy="12" r="3" />
</svg>
`,eyeOff:`
<svg
  class="lucide lucide-eye-off"
  xmlns="http://www.w3.org/2000/svg"
  width="16"
  height="16"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" />
  <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />
  <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" />
  <path d="m2 2 20 20" />
</svg>
`,check:`
<svg
  class="lucide lucide-check"
  xmlns="http://www.w3.org/2000/svg"
  width="16"
  height="16"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M20 6 9 17l-5-5" />
</svg>
`,info:`
<svg
  class="lucide lucide-info"
  xmlns="http://www.w3.org/2000/svg"
  width="16"
  height="16"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <circle cx="12" cy="12" r="10" />
  <path d="M12 16v-4" />
  <path d="M12 8h.01" />
</svg>
`,clock:`
<svg
  class="lucide lucide-clock"
  xmlns="http://www.w3.org/2000/svg"
  width="16"
  height="16"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <circle cx="12" cy="12" r="10" />
  <path d="M12 6v6l4 2" />
</svg>
`,copy:`
<svg
  class="lucide lucide-copy"
  xmlns="http://www.w3.org/2000/svg"
  width="16"
  height="16"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
  <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
</svg>
`,refresh:`
<svg
  class="lucide lucide-refresh-cw"
  xmlns="http://www.w3.org/2000/svg"
  width="16"
  height="16"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
  <path d="M21 3v5h-5" />
  <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
  <path d="M8 16H3v5" />
</svg>
`,chip:`
<svg
  class="lucide lucide-cpu"
  xmlns="http://www.w3.org/2000/svg"
  width="16"
  height="16"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M12 20v2" />
  <path d="M12 2v2" />
  <path d="M17 20v2" />
  <path d="M17 2v2" />
  <path d="M2 12h2" />
  <path d="M2 17h2" />
  <path d="M2 7h2" />
  <path d="M20 12h2" />
  <path d="M20 17h2" />
  <path d="M20 7h2" />
  <path d="M7 20v2" />
  <path d="M7 2v2" />
  <rect x="4" y="4" width="16" height="16" rx="2" />
  <rect x="8" y="8" width="8" height="8" rx="1" />
</svg>
`,moreVertical:`
<svg
  class="lucide lucide-ellipsis-vertical"
  xmlns="http://www.w3.org/2000/svg"
  width="16"
  height="16"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <circle cx="12" cy="12" r="1" />
  <circle cx="12" cy="5" r="1" />
  <circle cx="12" cy="19" r="1" />
</svg>
`,minimize:`
<svg
  class="lucide lucide-minus"
  xmlns="http://www.w3.org/2000/svg"
  width="16"
  height="16"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M5 12h14" />
</svg>
`,maximize:`
<svg
  class="lucide lucide-maximize-2"
  xmlns="http://www.w3.org/2000/svg"
  width="16"
  height="16"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M15 3h6v6" />
  <path d="m21 3-7 7" />
  <path d="m3 21 7-7" />
  <path d="M9 21H3v-6" />
</svg>
`,dragHandle:`
<svg
  class="lucide lucide-grip-vertical"
  xmlns="http://www.w3.org/2000/svg"
  width="16"
  height="16"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <circle cx="9" cy="12" r="1" />
  <circle cx="9" cy="5" r="1" />
  <circle cx="9" cy="19" r="1" />
  <circle cx="15" cy="12" r="1" />
  <circle cx="15" cy="5" r="1" />
  <circle cx="15" cy="19" r="1" />
</svg>
`,list:`
<svg
  class="lucide lucide-list"
  xmlns="http://www.w3.org/2000/svg"
  width="16"
  height="16"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M3 5h.01" />
  <path d="M3 12h.01" />
  <path d="M3 19h.01" />
  <path d="M8 5h13" />
  <path d="M8 12h13" />
  <path d="M8 19h13" />
</svg>
`,folderTree:`
<svg
  class="lucide lucide-folder-tree"
  xmlns="http://www.w3.org/2000/svg"
  width="16"
  height="16"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M20 10a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-2.5a1 1 0 0 1-.8-.4l-.9-1.2A1 1 0 0 0 15 3h-2a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1Z" />
  <path d="M20 21a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-2.9a1 1 0 0 1-.88-.55l-.42-.85a1 1 0 0 0-.92-.6H13a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1Z" />
  <path d="M3 5a2 2 0 0 0 2 2h3" />
  <path d="M3 3v13a2 2 0 0 0 2 2h3" />
</svg>
`,folder:`
<svg
  class="lucide lucide-folder"
  xmlns="http://www.w3.org/2000/svg"
  width="16"
  height="16"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
</svg>
`,file:`
<svg
  class="lucide lucide-file"
  xmlns="http://www.w3.org/2000/svg"
  width="16"
  height="16"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
  <path d="M14 2v5a1 1 0 0 0 1 1h5" />
</svg>
`,stopwatch:`
<svg
  class="lucide lucide-timer"
  xmlns="http://www.w3.org/2000/svg"
  width="16"
  height="16"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <line x1="10" x2="14" y1="2" y2="2" />
  <line x1="12" x2="15" y1="14" y2="11" />
  <circle cx="12" cy="14" r="8" />
</svg>
`,plus:`
<svg
  class="lucide lucide-plus"
  xmlns="http://www.w3.org/2000/svg"
  width="16"
  height="16"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M5 12h14" />
  <path d="M12 5v14" />
</svg>
`,listPlus:`
<svg
  class="lucide lucide-list-plus"
  xmlns="http://www.w3.org/2000/svg"
  width="16"
  height="16"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M16 5H3" />
  <path d="M11 12H3" />
  <path d="M16 19H3" />
  <path d="M18 9v6" />
  <path d="M21 12h-6" />
</svg>
`,sparkles:`
<svg
  class="lucide lucide-sparkles"
  xmlns="http://www.w3.org/2000/svg"
  width="16"
  height="16"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" />
  <path d="M20 2v4" />
  <path d="M22 4h-4" />
  <circle cx="4" cy="20" r="2" />
</svg>
`,image:`
<svg
  class="lucide lucide-image"
  xmlns="http://www.w3.org/2000/svg"
  width="16"
  height="16"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
  <circle cx="9" cy="9" r="2" />
  <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
</svg>
`,refreshCw:`
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
  <path d="M3 3v5h5"/>
</svg>
`,zap:`
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
</svg>
`,upload:`
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
  <polyline points="17 8 12 3 7 8"/>
  <line x1="12" y1="3" x2="12" y2="15"/>
</svg>
`};var Pe=class{el=null;state="idle";mouseX=-300;mouseY=-300;displayX=-300;displayY=-300;rafId=null;flashTimer=null;boundMove;constructor(){this.boundMove=e=>{this.mouseX=e.clientX,this.mouseY=e.clientY,this.displayX===-300&&(this.displayX=e.clientX,this.displayY=e.clientY)},window.addEventListener("mousemove",this.boundMove,{passive:!0}),this.injectStyle(),this.createEl(),this.startRaf()}injectStyle(){if(document.getElementById("__eqdc_style__"))return;let e=document.createElement("style");e.id="__eqdc_style__",e.textContent=`
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
    `,document.documentElement.appendChild(e)}createEl(){this.el=document.createElement("div"),this.el.id="__eqdiscrete_coin__",document.documentElement.appendChild(this.el)}startRaf(){let o=()=>{if(this.el&&this.state!=="idle"){this.displayX+=(this.mouseX-this.displayX)*.22,this.displayY+=(this.mouseY-this.displayY)*.22;let n=Math.min(this.displayX+11,window.innerWidth-18),a=Math.min(Math.max(this.displayY-2,2),window.innerHeight-18);this.el.style.left=`${n}px`,this.el.style.top=`${a}px`}this.rafId=requestAnimationFrame(o)};this.rafId=requestAnimationFrame(o)}setState(e){this.state=e;let o=this.el;if(o){if(e==="idle"){o.style.display="none",o.innerHTML="";return}o.style.display="block",e==="loading"?o.innerHTML=`
        <div class="__eqdc_ring__">
          <svg class="__eqdc_svg_icon__" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 20 20">
            <!-- Trilha branca s\xF3lida \u2014 define o furo no centro -->
            <circle cx="10" cy="10" r="7" fill="none" stroke="#FFFFFF" stroke-width="3.5"/>
            <!-- Arco azul Windows 10 (#0078D7) girat\xF3rio -->
            <circle cx="10" cy="10" r="7" fill="none" stroke="#0078D7" stroke-width="3.5"
              stroke-dasharray="22 22" stroke-linecap="round"/>
          </svg>
        </div>`:e==="ok"?o.innerHTML=`
        <svg class="__eqdc_svg_icon__" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 20 20">
          <polyline points="3,10 8,15.5 17,4.5"
            fill="none" stroke="#107C10" stroke-width="2.8"
            stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`:e==="error"&&(o.innerHTML=`
        <svg class="__eqdc_svg_icon__" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 20 20">
          <line x1="4" y1="4" x2="16" y2="16" stroke="#C42B1C" stroke-width="2.8" stroke-linecap="round"/>
          <line x1="16" y1="4" x2="4" y2="16" stroke="#C42B1C" stroke-width="2.8" stroke-linecap="round"/>
        </svg>`)}}getState(){return this.state}flashOk(e=2e3){this.flashTimer&&clearTimeout(this.flashTimer),this.setState("ok"),this.flashTimer=window.setTimeout(()=>{this.state==="ok"&&this.setState("idle")},e)}flashError(e=2500){this.flashTimer&&clearTimeout(this.flashTimer),this.setState("error"),this.flashTimer=window.setTimeout(()=>{this.state==="error"&&this.setState("idle")},e)}destroy(){window.removeEventListener("mousemove",this.boundMove),this.rafId!==null&&cancelAnimationFrame(this.rafId),this.flashTimer&&clearTimeout(this.flashTimer),this.el?.remove(),this.el=null,document.getElementById("__eqdc_style__")?.remove()}};var De=class{container=null;items=[];currentPersistId=null;lastText="";constructor(){this.injectStyle(),this.createContainer()}injectStyle(){if(document.getElementById("__eqdt_style__"))return;let e=document.createElement("style");e.id="__eqdt_style__",e.textContent=`
      @keyframes __eqdt_in__  { from{opacity:0; transform:translateY(8px) scale(.98)} to{opacity:1; transform:translateY(0) scale(1)} }
      @keyframes __eqdt_out__ { from{opacity:1; transform:translateY(0) scale(1)} to{opacity:0; transform:translateY(8px) scale(.98)} }
      .__eqdt_in__  { animation: __eqdt_in__  0.18s ease forwards; }
      .__eqdt_out__ { animation: __eqdt_out__ 0.18s ease forwards; }
    `,document.documentElement.appendChild(e)}createContainer(){this.container=document.createElement("div"),this.container.id="__eqdiscrete_toasts__",Object.assign(this.container.style,{position:"fixed",left:"16px",bottom:"16px",zIndex:"2147483645",pointerEvents:"none",display:"flex",flexDirection:"column",gap:"8px",alignItems:"flex-start"}),document.documentElement.appendChild(this.container)}makeEl(e){let o=document.createElement("div");return o.className="__eqdt_in__",Object.assign(o.style,{background:"rgba(21,21,21,0.78)",color:"#ffffff",border:"1px solid rgba(255,255,255,0.08)",borderRadius:"0",padding:"8px 10px",fontSize:"11px",fontFamily:'system-ui,-apple-system,"Segoe UI",sans-serif',fontWeight:"600",lineHeight:"1.35",whiteSpace:"normal",maxWidth:"260px",overflow:"hidden",userSelect:"none",display:"flex",alignItems:"center",gap:"6px",boxShadow:"0 12px 28px rgba(0,0,0,0.25)",backdropFilter:"blur(18px) saturate(160%)",WebkitBackdropFilter:"blur(18px) saturate(160%)"}),o.textContent=e,o}show(e,o=3e3,n=!1){if(this.lastText=e,!this.container)return"";let a=`t_${Date.now()}_${Math.random().toString(16).slice(2)}`,i=this.makeEl(e);i.setAttribute("data-tid",a);let r={el:i,timer:null,id:a,text:e};return n?this.currentPersistId=a:r.timer=window.setTimeout(()=>this.clearItem(a),o),this.items.push(r),this.container.appendChild(i),this.reflowStack(),a}flash(e,o=3e3){this.show(e,o)}persist(e){return this.show(e,0,!0)}dismiss(e){this.currentPersistId===e&&(this.currentPersistId=null),this.clearItem(e)}dismissAll(){for(;this.items.length;)this.clearItem(this.items[0].id,!0)}replace(e,o){return this.dismiss(e),this.persist(o)}reshow(){this.lastText&&this.show(this.lastText,2e3)}reflowStack(){if(!this.container)return;Array.from(this.container.children).forEach((o,n)=>{o.style.transform=`translateY(${n*0}px)`,o.style.opacity="1"})}clearItem(e,o=!1){let n=this.items.findIndex(i=>i.id===e);if(n===-1)return;let a=this.items[n];if(a.timer!==null&&(clearTimeout(a.timer),a.timer=null),this.items.splice(n,1),o){a.el.remove();return}a.el.className="__eqdt_out__",setTimeout(()=>a.el.remove(),180)}destroy(){this.dismissAll(),this.container?.remove(),this.container=null,document.getElementById("__eqdt_style__")?.remove()}};var ze=class{el=null;lastMouseX=0;lastMouseY=0;onModelChange;boundMouseMove;boundOutside;autoTimer=null;constructor(e){this.onModelChange=e.onModelChange,this.boundMouseMove=o=>{this.lastMouseX=o.clientX,this.lastMouseY=o.clientY},this.boundOutside=o=>{o instanceof KeyboardEvent&&o.key!=="Escape"||o instanceof MouseEvent&&this.el?.contains(o.target)||this.close()},window.addEventListener("mousemove",this.boundMouseMove,{passive:!0}),this.injectStyle()}injectStyle(){if(document.getElementById("__eqdm_style__"))return;let e=document.createElement("style");e.id="__eqdm_style__",e.textContent=`
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
    `,document.documentElement.appendChild(e)}open(){this.close();let o=oe().model,n=[...Ce],a=(_e||[]).filter(f=>!n.some(h=>h.id===f.id)),i=document.createElement("div");i.id="__eqdm_menu__",i.setAttribute("role","menu"),i.tabIndex=-1;let r=document.createElement("div");r.className="__eqdm_section__",r.textContent="Modelo Gemini",i.appendChild(r);let s=document.createElement("div");s.className="__eqdm_sep__",i.appendChild(s);let l=(f,h,A)=>{let b=f===o,y=document.createElement("div");y.className="__eqdm_item__",y.setAttribute("role","menuitemradio"),y.setAttribute("aria-checked",b?"true":"false"),y.tabIndex=0;let x=document.createElement("span");x.className="__eqdm_check__",b&&(x.innerHTML=`<svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
          <path d="M1.5 6.5L4.5 9.5L10.5 2.5" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`),y.appendChild(x);let w=document.createElement("span");if(w.className="__eqdm_name__",w.textContent=h,b&&(w.style.fontWeight="500"),y.appendChild(w),A){let k=document.createElement("span");k.className="__eqdm_badge__",k.textContent=A,y.appendChild(k)}y.addEventListener("click",()=>{he({model:f}),this.onModelChange?.(f),this.close()}),y.addEventListener("keydown",k=>{(k.key==="Enter"||k.key===" ")&&(k.preventDefault(),he({model:f}),this.onModelChange?.(f),this.close())}),i.appendChild(y)};for(let f of n){let h;f.id.includes("3.8")||f.id.includes("3.7")?h="Novo":f.id.includes("flash-lite")?h="Eco":f.id.includes("pro")&&(h="Pro");let A=f.name.replace(/\s*\(.*?\)\s*/g,"").trim();l(f.id,A,h)}if(a.length>0){let f=document.createElement("div");f.className="__eqdm_sep__",i.appendChild(f);let h=document.createElement("div");h.className="__eqdm_section__",h.textContent="Modelos da conta",i.appendChild(h);for(let A of a)l(A.id,A.name.replace(/\s*\(.*?\)\s*/g,"").trim())}document.documentElement.appendChild(i),this.el=i;let{offsetWidth:c,offsetHeight:u}=i,g=this.lastMouseX,d=this.lastMouseY,m=window.innerWidth,p=window.innerHeight;g+c+8>m&&(g=m-c-8),d+u+8>p&&(d=p-u-8),g<4&&(g=4),d<4&&(d=4),i.style.left=`${g}px`,i.style.top=`${d}px`,i.focus(),setTimeout(()=>{window.addEventListener("click",this.boundOutside,{capture:!0}),window.addEventListener("keydown",this.boundOutside,{capture:!0})},50),this.autoTimer=window.setTimeout(()=>this.close(),8e3)}close(){this.autoTimer&&(clearTimeout(this.autoTimer),this.autoTimer=null),window.removeEventListener("click",this.boundOutside,{capture:!0}),window.removeEventListener("keydown",this.boundOutside,{capture:!0}),this.el?.remove(),this.el=null}isOpen(){return this.el!==null}destroy(){this.close(),window.removeEventListener("mousemove",this.boundMouseMove),document.getElementById("__eqdm_style__")?.remove()}};var Ne=class{el=null;coin;toast;boundEsc;constructor(e,o){this.coin=e,this.toast=o,this.boundEsc=n=>{n.key==="Escape"&&this.isOpen()&&(n.stopPropagation(),n.preventDefault(),this.close())},this.injectStyle()}injectStyle(){if(document.getElementById("__eqkm_style__"))return;let e=document.createElement("style");e.id="__eqkm_style__",e.textContent=`
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
    `,document.documentElement.appendChild(e)}open(){if(this.isOpen()){this.close();return}let o=oe().apiKeys.join(`
`),n=document.createElement("div");n.id="__eqkm_overlay__";let a=document.createElement("div");a.id="__eqkm_dialog__",a.setAttribute("role","dialog"),a.setAttribute("aria-modal","true"),a.innerHTML=`
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
    `,n.appendChild(a),document.documentElement.appendChild(n),this.el=n;let i=a.querySelector("#__eqkm_ta__"),r=a.querySelector("#__eqkm_count__"),s=a.querySelector("#__eqkm_status__");i.value=o,this.updateCount(i.value,r),i.addEventListener("input",()=>this.updateCount(i.value,r)),a.querySelector("#__eqkm_close__").addEventListener("click",()=>this.close()),a.querySelector("#__eqkm_cancel__").addEventListener("click",()=>this.close()),a.querySelector("#__eqkm_save__").addEventListener("click",()=>{let l=this.parseKeys(i.value);he({apiKey:l[0]||"",apiKeys:l}),this.toast.flash("Config Saved"),this.coin.flashOk(1200),this.close()}),a.querySelector("#__eqkm_verify__").addEventListener("click",async()=>{let l=this.parseKeys(i.value);if(!l.length){s.style.color="#c5221f",s.textContent="Insira ao menos uma chave.";return}s.style.color="#70757a",s.textContent="Verificando\u2026",this.coin.setState("loading");try{let c=oe().model,u=await wt(c,l);u.ok?(s.style.color="#137333",s.textContent=`\u2713 Acesso v\xE1lido \u2014 ${u.model}`,this.coin.flashOk(),this.toast.flash("Access OK")):(s.style.color="#c5221f",s.textContent=`\u2717 ${u.message.slice(0,55)}`,this.coin.flashError(),this.toast.flash("Access Denied"))}catch{s.style.color="#c5221f",s.textContent="\u2717 Erro ao verificar.",this.coin.flashError()}}),n.addEventListener("click",l=>{l.target===n&&this.close()}),window.addEventListener("keydown",this.boundEsc,{capture:!0}),requestAnimationFrame(()=>i.focus())}parseKeys(e){return e.split(/[\n\r,]+/).map(o=>o.trim().replace(/^["']|["']$/g,"")).filter(o=>o.length>5)}updateCount(e,o){let n=this.parseKeys(e).length;o.textContent=n===0?"":`${n} chave${n!==1?"s":""} cadastrada${n!==1?"s":""}`}close(){window.removeEventListener("keydown",this.boundEsc,{capture:!0}),this.el?.remove(),this.el=null}isOpen(){return this.el!==null}destroy(){this.close()}};var Re=class{active=[];constructor(){this.injectStyle()}injectStyle(){if(document.getElementById("__eqsh_style__"))return;let e=document.createElement("style");e.id="__eqsh_style__",e.textContent=`
      @keyframes __eqsh_p__ {
        0%,100% { outline-color: rgba(0,120,212,0.15); }
        50%     { outline-color: rgba(0,120,212,0.26); }
      }
      .__eqsh__ {
        outline: 1px solid rgba(0,120,212,0.17) !important;
        outline-offset: 2px !important;
        animation: __eqsh_p__ 2.5s ease-in-out infinite !important;
      }
    `,document.documentElement.appendChild(e)}highlightTarget(e){this.clearAll();for(let o of e)!o||this.active.some(n=>n.el===o)||(this.active.push({el:o,orig:o.style.outline,origOffset:o.style.outlineOffset}),o.classList.add("__eqsh__"))}clearAll(){for(let{el:e,orig:o,origOffset:n}of this.active)e.classList.remove("__eqsh__"),e.style.outline=o,e.style.outlineOffset=n;this.active=[]}destroy(){this.clearAll(),document.getElementById("__eqsh_style__")?.remove()}};var Be=class{opts;lastSignature="";pollTimer=null;debounceTimer=null;cooldownUntil=0;POLL_MS=180;DEBOUNCE_MS=600;COOLDOWN_MS=150;origPush=typeof history<"u"?history.pushState.bind(history):null;origReplace=typeof history<"u"?history.replaceState.bind(history):null;constructor(e){this.opts=e}start(){this.lastSignature=this.getSignature(),this.patchHistory(),window.addEventListener("popstate",this.onUrlChange,{capture:!0,passive:!0}),this.pollTimer=window.setInterval(this.poll,this.POLL_MS)}stop(){this.unpatchHistory(),window.removeEventListener("popstate",this.onUrlChange,{capture:!0}),this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null),this.debounceTimer&&(clearTimeout(this.debounceTimer),this.debounceTimer=null)}resetHash(){this.lastSignature=this.getSignature(),this.cooldownUntil=Date.now()+this.COOLDOWN_MS}patchHistory(){if(typeof history>"u")return;let e=this;history.pushState=function(...o){e.origPush?.(...o),e.onUrlChange()},history.replaceState=function(...o){e.origReplace?.(...o),e.onUrlChange()}}unpatchHistory(){typeof history>"u"||!this.origPush||!this.origReplace||(history.pushState=this.origPush,history.replaceState=this.origReplace)}onUrlChange=()=>{let e=this.getSignature();e&&e!==this.lastSignature&&this.debounce()};poll=()=>{let e=this.getSignature();e&&e!==this.lastSignature&&this.debounce()};getSignature(){try{let e=Te(!1)||ye();return e&&e.questionText?Tt(e):`${location.href}|${document.title}|${(document.body?.innerText||"").slice(0,300)}`}catch{return""}}debounce(){if(this.debounceTimer)return;let e=Date.now(),o=e<this.cooldownUntil?Math.max(this.cooldownUntil-e+80,this.DEBOUNCE_MS):this.DEBOUNCE_MS;this.debounceTimer=window.setTimeout(()=>{this.debounceTimer=null;let n=this.getSignature();n&&n!==this.lastSignature&&this.opts.onPageAdvance()!==!1&&(this.lastSignature=n,this.cooldownUntil=Date.now()+this.COOLDOWN_MS)},o)}};var rt=new Set(["Control","Alt","Meta","Shift","CapsLock","Tab","Escape","F1","F2","F3","F4","F5","F6","F7","F8","F9","F10","F11","F12","PrintScreen","ScrollLock","Pause","Insert","Home","End","PageUp","PageDown","ArrowLeft","ArrowRight","ArrowUp","ArrowDown","ContextMenu","NumLock"]),st=t=>t.altKey||t.shiftKey&&"QAMZRHIC".includes(t.key.toUpperCase()),zt=typeof HTMLInputElement<"u"?Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"value")?.set:void 0,Nt=typeof HTMLTextAreaElement<"u"?Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype,"value")?.set:void 0,je=class{flow=[];stepIdx=0;state="idle";isExecuting=!1;stepping=!1;pendingClick=!1;lastClickTs=0;coin;toast;highlight;debugOutput;stepTimer=null;charsInserted=new Map;failedSteps=new Set;boundKey;boundKeypress;boundBeforeInput;boundKeyup;boundClick;constructor(e,o,n,a){this.coin=e,this.toast=o,this.highlight=n,this.debugOutput=a,this.boundKey=this.onKey.bind(this),this.boundKeypress=this.onKeypress.bind(this),this.boundBeforeInput=this.onBeforeInput.bind(this),this.boundKeyup=this.onKeyup.bind(this),this.boundClick=this.onClick.bind(this)}setDebugOutput(e){this.debugOutput=e}start(e){this.abort(),e?.length&&(this.flow=e,this.stepIdx=0,this.charsInserted.clear(),this.failedSteps.clear(),this.state="idle",this.isExecuting=!1,this.stepping=!1,this.pendingClick=!1,this.debugOutput?.setFlow(e),this.attach(),this.gotoStep(0))}abort(){this.unlockAllInputs();let e=this.isActive();this.state="aborted",this.isExecuting=!1,this.stepping=!1,this.pendingClick=!1,this.detach(),this.clearTimer(),this.highlight.clearAll(),e&&(this.coin.flashError(800),this.toast.flash("Abortado"),this.debugOutput?.log("FLOW","Fluxo abortado pelo usu\xE1rio"))}isActive(){return this.state==="waiting_key"||this.state==="waiting_click"}getState(){return this.state}getCurrentStep(){return this.stepIdx}getTotalSteps(){return this.flow.length}lockedInputs=new Set;lockInput(e,o){try{e.readOnly=!0}catch{}let n=()=>{if(e.value!==""&&e.value!==o){let a=e instanceof HTMLInputElement?HTMLInputElement.prototype:HTMLTextAreaElement.prototype,i=(e instanceof HTMLInputElement?zt:Nt)||Object.getOwnPropertyDescriptor(a,"value")?.set;i?i.call(e,o):e.value=o}};e.addEventListener("input",n,{capture:!0}),this.lockedInputs.add({el:e,sanitizer:n})}unlockAllInputs(){for(let e of this.lockedInputs){try{e.el.readOnly=!1}catch{}e.el.removeEventListener("input",e.sanitizer,{capture:!0})}this.lockedInputs.clear()}attach(){for(let e of[window,document])e.addEventListener("keydown",this.boundKey,{capture:!0}),e.addEventListener("keypress",this.boundKeypress,{capture:!0}),e.addEventListener("beforeinput",this.boundBeforeInput,{capture:!0}),e.addEventListener("keyup",this.boundKeyup,{capture:!0}),e.addEventListener("click",this.boundClick,{capture:!0})}detach(){for(let e of[window,document])e.removeEventListener("keydown",this.boundKey,{capture:!0}),e.removeEventListener("keypress",this.boundKeypress,{capture:!0}),e.removeEventListener("beforeinput",this.boundBeforeInput,{capture:!0}),e.removeEventListener("keyup",this.boundKeyup,{capture:!0}),e.removeEventListener("click",this.boundClick,{capture:!0})}gotoStep(e){this.isExecuting=!1,this.stepping=!1,this.pendingClick=!1,this.clearTimer(),this.highlight.clearAll();try{(document.activeElement instanceof HTMLInputElement||document.activeElement instanceof HTMLTextAreaElement)&&document.activeElement.blur()}catch{}if(e>=this.flow.length){this.complete();return}this.stepIdx=e;let o=this.flow[e];this.state=o.trigger==="key"?"waiting_key":"waiting_click",this.debugOutput?.setStepIndex(e);let n=o.action;if(n.id||n.label||n.from||n.v||n.name||n.n){let i=this.resolveEl(n);if(i&&(this.highlight.highlightTarget([i]),o.trigger==="key")){let r=this.resolveInput(i);(r instanceof HTMLInputElement||r instanceof HTMLTextAreaElement)&&this.lockInput(r,String(n.v??""));try{r?.focus?.()}catch{}}}if(o.trigger==="key"&&this.lockedInputs.size===0){let i=document.activeElement;if(i instanceof HTMLInputElement||i instanceof HTMLTextAreaElement)this.lockInput(i,String(n.v??""));else{let r=document.querySelector("input:not([type=hidden]):not([type=submit]):not([type=button]):not([type=radio]):not([type=checkbox]),textarea,[contenteditable=true]");r&&this.lockInput(r,String(n.v??""))}}let a=o.hint||(o.trigger==="key"?"Keyboard Interact":"Mouse Interact");this.toast.flash(a),o.customMsg&&setTimeout(()=>{this.stepIdx===e&&this.isActive()&&this.toast.flash(o.customMsg)},500),this.stepTimer=window.setTimeout(()=>{this.stepIdx===e&&this.isActive()&&this.toast.flash(a)},9e4)}clearTimer(){this.stepTimer!==null&&(clearTimeout(this.stepTimer),this.stepTimer=null)}onKeypress(e){(this.isActive()||this.stepping)&&!st(e)&&e.key!=="Escape"&&(e.preventDefault(),e.stopPropagation(),e.stopImmediatePropagation())}onBeforeInput(e){(this.isActive()||this.stepping)&&e.isTrusted&&(e.preventDefault(),e.stopPropagation(),e.stopImmediatePropagation())}onKeyup(e){(this.isActive()||this.stepping)&&!st(e)&&e.key!=="Escape"&&!rt.has(e.key)&&(e.preventDefault(),e.stopPropagation(),e.stopImmediatePropagation())}onKey(e){if(st(e)||e.key==="Escape")return;if(this.state==="waiting_click"){rt.has(e.key)||(e.preventDefault(),e.stopPropagation(),e.stopImmediatePropagation()),this.toast.flash("Mouse Interact");return}if(this.state!=="waiting_key")return;if(this.stepping){e.preventDefault(),e.stopPropagation(),e.stopImmediatePropagation();return}if(rt.has(e.key))return;e.preventDefault(),e.stopPropagation(),e.stopImmediatePropagation(),this.debugOutput?.log("KEY",`Gatilho de teclado: "${e.key}" (Passo ${this.stepIdx+1})`);let n=this.flow[this.stepIdx].action;if(n.t!=="val")return;let a=String(n.v??"");if(a.length===0){this.stepping=!0,this.clearTimer(),this.highlight.clearAll(),this.debugOutput?.markStepSuccess(this.stepIdx,"Texto vazio \u2014 avan\xE7o autom\xE1tico"),setTimeout(()=>this.gotoStep(this.stepIdx+1),40);return}this.insertChars(this.stepIdx,n,a)&&(this.stepping=!0,this.clearTimer(),this.highlight.clearAll(),this.coin.flashOk(800),this.debugOutput?.markStepSuccess(this.stepIdx,`"${a}" inserido com sucesso`),setTimeout(()=>this.gotoStep(this.stepIdx+1),60))}onClick(e){if(!e.isTrusted)return;let o=e.target;if(!o||o.closest("#__eqdm_menu__,#__eqkm_overlay__,#__eqcm_menu__,#__eqdiscrete_coin__,#__eqdiscrete_toasts__,#__eq_dbg_window__,#__eq_dbg_pill__"))return;if(this.state==="waiting_key"){this.toast.flash("Keyboard Interact");return}if(this.state!=="waiting_click")return;let n=Date.now();if(this.isExecuting){n-this.lastClickTs>80&&(this.pendingClick=!0,this.debugOutput?.log("CLICK",`Clique r\xE1pido enfileirado (Passo ${this.stepIdx+1})`));return}this.lastClickTs=n,this.debugOutput?.log("CLICK",`Gatilho de mouse em <${o.tagName.toLowerCase()}> (Passo ${this.stepIdx+1})`);let a=this.flow[this.stepIdx],i=a.action;if(String(i.t??"")==="adv"){this.clearTimer(),this.highlight.clearAll(),this.debugOutput?.markStepSuccess(this.stepIdx,"Avan\xE7o natural do usu\xE1rio"),setTimeout(()=>this.gotoStep(this.stepIdx+1),80);return}e.preventDefault(),e.stopImmediatePropagation(),this.isExecuting=!0,this.pendingClick=!1,this.execClickAction(i,a).then(s=>{this.clearTimer(),this.highlight.clearAll(),this.isExecuting=!1;let l=this.pendingClick;this.pendingClick=!1,s?this.coin.flashOk(700):(this.failedSteps.add(this.stepIdx),this.coin.flashError(600)),setTimeout(()=>this.gotoStep(this.stepIdx+1),l?20:s?60:30)}).catch(s=>{this.isExecuting=!1,this.pendingClick=!1,this.failedSteps.add(this.stepIdx),this.debugOutput?.markStepFailed(this.stepIdx,`Exce\xE7\xE3o: ${s instanceof Error?s.message:String(s)}`),setTimeout(()=>this.gotoStep(this.stepIdx+1),30)})}async execClickAction(e,o){let n=String(e.t??"");try{if(n==="chk"||n==="clk"){let a=this.resolveEl(e);if(!a)return this.toast.flash("Alvo n\xE3o achado"),this.debugOutput?.markStepFailed(this.stepIdx,`Alvo n\xE3o encontrado: ${JSON.stringify(e)}`),!1;let i=a instanceof HTMLInputElement&&["radio","checkbox"].includes(a.type);if(i||a.getAttribute("role")==="radio"||a.getAttribute("role")==="checkbox"||a.closest('.option-card, [role="radio"], [role="checkbox"], [role="option"], .vf-radio-group, .vf-label')!==null||n==="chk"){let s=i?a:a.querySelector('input[type="radio"], input[type="checkbox"]')||(a.getAttribute("for")?a.ownerDocument.getElementById(a.getAttribute("for")):null),l=s||a,c=l.closest("label"),u=l.id?document.querySelector(`label[for="${N(l.id)}"]`):null,g=c||u||l.closest("td")||l,d=e.c!==void 0?!!e.c:!0;if(re(l,d),s&&s.checked!==d){try{let p=s._valueTracker;p&&p.setValue(!d)}catch{}try{Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"checked")?.set?.call(s,d)}catch{}s.dispatchEvent(new Event("input",{bubbles:!0,composed:!0})),s.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}if(s&&s.checked!==d&&g&&g!==s&&(V(g),await new Promise(p=>setTimeout(p,16))),s&&s.checked!==d)try{let p=l.getBoundingClientRect(),f=p.left+p.width/2,h=p.top+p.height/2;for(let A of["pointerdown","mousedown","pointerup","mouseup","click"])l.dispatchEvent(new PointerEvent(A,{bubbles:!0,cancelable:!0,composed:!0,clientX:f,clientY:h,pointerId:1,isPrimary:!0}));await new Promise(A=>setTimeout(A,16))}catch{}if(s&&s.checked!==d){try{s.checked=d}catch{}try{s.click()}catch{}await new Promise(p=>setTimeout(p,8)),s.dispatchEvent(new Event("change",{bubbles:!0}))}if(s){if(s.checked===d)this.debugOutput?.markStepSuccess(this.stepIdx,`[name="${s.name}"] marcado checked=${d}`);else return s.type==="radio"&&s.name&&document.querySelector(`input[name="${N(s.name)}"]:checked`)?(this.debugOutput?.markStepSuccess(this.stepIdx,`Grupo de r\xE1dio [name="${s.name}"] tem sele\xE7\xE3o`),!0):(this.debugOutput?.markStepFailed(this.stepIdx,`[name="${s.name}"] resistiu ap\xF3s 5 estrat\xE9gias`),!1);return!0}return g&&V(g),await new Promise(p=>setTimeout(p,80)),te({t:e.t,id:String(e.id??e.label??""),c:e.c,v:e.v})?this.debugOutput?.markStepSuccess(this.stepIdx,"Op\xE7\xE3o customizada ativada e verificada no DOM"):(g&&(He(g),await new Promise(p=>setTimeout(p,120))),this.debugOutput?.log("WARN","Card custom: DOM n\xE3o confirmou sele\xE7\xE3o \u2014 tentativa via script injection")),!0}return V(a),this.debugOutput?.markStepSuccess(this.stepIdx,`<${a.tagName.toLowerCase()}> ativado`),!0}if(n==="sel"){let a=this.resolveEl(e);if(!a)return this.toast.flash("Alvo n\xE3o achado"),this.debugOutput?.markStepFailed(this.stepIdx,`Select n\xE3o encontrado: ${JSON.stringify(e)}`),!1;let i=a instanceof HTMLSelectElement?a:a.querySelector("select");if(i){let r=String(Array.isArray(e.v)?e.v[0]:e.v??"");for(let l=0;l<i.options.length;l++)if(i.options[l].value===r||i.options[l].text.trim()===r)return i.selectedIndex=l,i.dispatchEvent(new Event("change",{bubbles:!0})),this.debugOutput?.markStepSuccess(this.stepIdx,`Select atualizado para "${r}"`),!0;let s=parseInt(r,10);if(!isNaN(s)&&s>=0&&s<i.options.length)return i.selectedIndex=s,i.dispatchEvent(new Event("change",{bubbles:!0})),this.debugOutput?.markStepSuccess(this.stepIdx,`Select atualizado por \xEDndice ${s}`),!0}return a&&V(a),!!a}if(n==="drag"){let a=String(e.from??e.id??""),i=String(e.to??e.label??""),r=W(a,"source")||L(a),s=W(i,"destination")||L(i);return r&&s?(await fe(r,s),this.debugOutput?.markStepSuccess(this.stepIdx,`Arrasto conclu\xEDdo de "${a}" para "${i}"`),!0):(this.toast.flash("Alvo n\xE3o achado"),this.debugOutput?.markStepFailed(this.stepIdx,`Alvo de arrasto n\xE3o achado: from="${a}", to="${i}"`),!1)}if(n==="adv")return this.debugOutput?.markStepSuccess(this.stepIdx,"Avan\xE7o de etapa"),!0}catch(a){return this.toast.flash("Erro exec"),this.debugOutput?.markStepFailed(this.stepIdx,`Erro de execu\xE7\xE3o: ${a instanceof Error?a.message:String(a)}`),!1}return!0}insertChars(e,o,n){let a=this.resolveEl(o);if(!a)return this.toast.flash("Campo n\xE3o achado"),this.debugOutput?.markStepFailed(e,`Campo de texto n\xE3o encontrado: ${JSON.stringify(o)}`),this.charsInserted.set(e,n.length),!0;let i=this.resolveInput(a);if(!i)return this.charsInserted.set(e,n.length),!0;let r=n;if(i instanceof HTMLInputElement&&(i.type==="number"||i.type==="range")){let u=n.replace(",",".").replace(/[^0-9.-]/g,"");u&&!isNaN(Number(u))&&(r=u)}let l=this.charsInserted.get(e)??0;l<r.length&&(l++,this.charsInserted.set(e,l));let c=r.substring(0,l);if(this.applyValueSlice(i,c),l>=r.length){try{i.blur?.()}catch{}return!0}return!1}applyValueSlice(e,o){if(e instanceof HTMLInputElement||e instanceof HTMLTextAreaElement){try{let i=e._valueTracker;i&&i.setValue("")}catch{}let n=e instanceof HTMLInputElement?HTMLInputElement.prototype:HTMLTextAreaElement.prototype,a=(e instanceof HTMLInputElement?zt:Nt)||Object.getOwnPropertyDescriptor(n,"value")?.set;a?(a.call(e,""),a.call(e,o)):(e.value="",e.value=o);try{e.dispatchEvent(new Event("input",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}try{e.dispatchEvent(new Event("change",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}try{e.setSelectionRange(o.length,o.length)}catch{}if(e.value!==o&&!(e instanceof HTMLInputElement&&e.type==="number"&&Number(e.value)===Number(o))){e.value=o;try{a?.call(e,o)}catch{}}}else if(e.isContentEditable){let n=e;n.textContent=o;try{n.dispatchEvent(new InputEvent("input",{bubbles:!0,cancelable:!0,composed:!0,data:o,inputType:"insertText"}))}catch{n.dispatchEvent(new Event("input",{bubbles:!0,cancelable:!0,composed:!0}))}try{n.dispatchEvent(new Event("change",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}try{let a=document.createRange();a.selectNodeContents(n),a.collapse(!1);let i=window.getSelection();i?.removeAllRanges(),i?.addRange(a)}catch{}}}resolveEl(e){let o=String(e.id??"").trim(),n=String(e.v??"").trim(),a=String(e.label??"").trim(),i=String(e.from??"").trim(),r=String(e.name??e.n??"").trim(),l=(o||a||n).trim().match(/^(?:item|opção|opcao|afirmação|afirmacao|alternativa|linha|afirmativa|questão|questao)?\s*#?([a-eA-E])$/i);if(l&&(e.t==="chk"||e.t==="clk")){let A=l[1].toUpperCase(),b=Array.from(document.querySelectorAll(`input[type="radio"][value="${A}" i], input[type="checkbox"][value="${A}" i]`)).find(y=>!y.closest("#__eqdm_menu__,#__eqkm_overlay__,#__eqcm_menu__,#__eqdiscrete_coin__,#__eqdiscrete_toasts__,#__eq_dbg_window__,#__eq_dbg_pill__"));if(b)return b}let u=(n||(a.match(/:\s*(verdadeiro|falso|v|f)\b/i)?.[1]??"")||(o.match(/_(v|f|verdadeiro|falso)$/i)?.[1]??"")).toLowerCase().trim(),g=/^(v|verdadeiro|true|t|1|sim|yes|correto)$/i.test(u)||u.includes("verdadeir"),d=/^(f|falso|false|0|nao|não|no|incorreto|errado)$/i.test(u)||u.includes("fals"),m=g||d,p=g?["v","verdadeiro","true","1","t","sim","correto"]:["f","falso","false","0","n\xE3o","nao","incorreto","errado"];if(r){let A=Array.from(document.querySelectorAll(`input[name="${N(r)}"]`));if(n){let b=A.find(y=>y.value?.toLowerCase()===n.toLowerCase());if(b)return b}if(m){let b=A.find(y=>this.isVfMatch(y,p));if(b)return b}if(A.length>0)return A[0]}let f=null;if(o&&(f=L(o,n,e.t==="val")),!f&&a&&(f=L(a,n,e.t==="val")),!f&&i&&(f=L(i,n,e.t==="val")),m){if(f){if(f instanceof HTMLInputElement&&f.type==="radio"&&f.name){if(this.isVfMatch(f,p))return f;let k=Array.from(document.querySelectorAll(`input[type="radio"][name="${N(f.name)}"]`)).find(M=>this.isVfMatch(M,p));if(k)return k}let b=f.closest('tr, [role="row"], [role="radiogroup"], .vf-row, [class*="row" i], fieldset, td, div')||f,x=Array.from(b.querySelectorAll('input[type="radio"], input[type="checkbox"], [role="radio"], label, td, [class*="choice" i], [class*="option" i]')).find(w=>this.isVfMatch(w,p));if(x)return(x instanceof HTMLInputElement?x:x.querySelector('input[type="radio"]'))||x}let A=(a||o).replace(/:\s*(verdadeiro|falso|v|f)\b/i,"").toLowerCase();if(A){let b=Array.from(document.querySelectorAll('tr, [role="row"], [role="radiogroup"], .vf-row, [class*="row" i], li')),y=E(A).toLowerCase(),x=b.find(w=>{let k=E(w.textContent||"").toLowerCase();return y.length>=3&&k.includes(y)||o&&w.id===o});if(x){let k=Array.from(x.querySelectorAll('input[type="radio"], [role="radio"], label, td')).find(M=>this.isVfMatch(M,p));if(k)return(k instanceof HTMLInputElement?k:k.querySelector('input[type="radio"]'))||k}}}let h=(o||a||n).trim().toLowerCase();if(h){let b=Array.from(document.querySelectorAll('input, label, button, [role="radio"], [role="checkbox"], .option-card, [class*="option" i], [class*="choice" i]')).find(y=>{let x=(y.textContent||"").trim().toLowerCase();return(y.value?String(y.value).trim().toLowerCase():"")===h||x===h||x.startsWith(h+")")||x.startsWith("("+h+")")||h.length>=3&&x.includes(h)});if(b)return b}return f}isVfMatch(e,o){if(!e)return!1;let n=e.value?String(e.value).trim().toLowerCase():"",a=(e.getAttribute("aria-label")||"").trim().toLowerCase(),i=(e.getAttribute("data-value")||"").trim().toLowerCase();if(n&&o.includes(n)||i&&o.includes(i)||a&&o.includes(a))return!0;let r=e.closest('label, td, [class*="option" i], [class*="choice" i]'),s=((e.className||"")+" "+(r?.className||"")).toLowerCase();if(o.includes("v")&&(s.includes("vf-true")||s.includes("true")||s.includes("verdadeiro"))||o.includes("f")&&(s.includes("vf-false")||s.includes("false")||s.includes("falso")))return!0;if(r){let l=E(r.textContent||"").trim().toLowerCase();for(let c of o)if(l===c||l.startsWith(c+" ")||l.endsWith(" "+c)||l.startsWith("("+c+")")||l.startsWith(c+")")||c.length>=4&&l.includes(c))return!0}if(e.id){let l=document.querySelector(`label[for="${N(e.id)}"]`);if(l){let c=E(l.textContent||"").trim().toLowerCase();for(let u of o)if(c===u||c.startsWith(u+" ")||c.endsWith(" "+u)||c.startsWith("("+u+")")||c.startsWith(u+")")||u.length>=4&&c.includes(u))return!0}}return!1}resolveInput(e){return e instanceof HTMLInputElement||e instanceof HTMLTextAreaElement||e.isContentEditable?e:e.querySelector("input:not([type=hidden]):not([type=submit]):not([type=button]):not([type=radio]):not([type=checkbox]),textarea,[contenteditable=true]")??e}async forceStep(e){if(e<0||e>=this.flow.length)return!1;let o=this.flow[e],n=o.action,a=String(n.t??""),i=!1;if(a==="val"){let r=String(n.v??""),s=this.resolveEl(n);if(!s)return!1;let l=this.resolveInput(s);if(!l)return!1;this.applyValueSlice(l,r),this.charsInserted.set(e,r.length),this.debugOutput?.markStepSuccess(e,`Texto "${r}" injetado`),i=!0}else i=await this.execClickAction(n,o);return i&&e===this.stepIdx&&(this.clearTimer(),this.highlight.clearAll(),this.gotoStep(e+1)),i}async forceAll(){this.toast.flash("Injetando respostas...");let e=0,o=0;for(let n=0;n<this.flow.length;n++){let i=this.flow[n].action;if(i.t==="adv")continue;let r=await this.forceStep(n);await new Promise(c=>setTimeout(c,80));let s={t:i.t,id:String(i.id??i.label??""),c:i.c,v:i.v,name:i.name,from:i.from,to:i.to},l=!1;if(i.t!=="drag"&&i.t!=="val"&&i.t!=="adv")try{l=te(s)}catch{}else l=r;if(!l&&r&&(i.t==="chk"||i.t==="clk")){let c=this.resolveEl(i);if(c){He(c),await new Promise(u=>setTimeout(u,150));try{l=te(s)}catch{}}if(l)this.debugOutput?.log("FLOW",`Step ${n+1}: recuperado via script injection`);else{this.debugOutput?.markStepFailed(n,"DOM n\xE3o confirmou ap\xF3s script injection"),o++;continue}}l||r?e++:o++}this.debugOutput?.log("FLOW",`forceAll: ${e} sucesso(s), ${o} falha(s)`),this.complete()}complete(){this.unlockAllInputs(),this.state="done",this.isExecuting=!1,this.detach(),this.clearTimer(),this.highlight.clearAll(),this.failedSteps.size>0?(this.coin.flashError(2200),this.toast.flash("Conclu\xEDdo c/ erros"),this.debugOutput?.log("WARN",`Fluxo finalizado com ${this.failedSteps.size} passos que falharam!`)):(this.coin.flashOk(1800),this.toast.flash("Conclu\xEDdo"),this.debugOutput?.log("FLOW","Fluxo finalizado com 100% de sucesso!"))}destroy(){this.isActive()?this.abort():(this.detach(),this.clearTimer())}};var Qe=class{el=null;lastMouseX=0;lastMouseY=0;boundOutside;boundMouseMove;commands=[];constructor(){this.boundMouseMove=e=>{this.lastMouseX=e.clientX,this.lastMouseY=e.clientY},this.boundOutside=e=>{e instanceof KeyboardEvent&&e.key!=="Escape"||e instanceof MouseEvent&&this.el?.contains(e.target)||this.close()},window.addEventListener("mousemove",this.boundMouseMove,{passive:!0}),this.injectStyle()}setCommands(e){this.commands=e}injectStyle(){if(document.getElementById("__eqcm_style__"))return;let e=document.createElement("style");e.id="__eqcm_style__",e.textContent=`
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
    `,document.documentElement.appendChild(e)}open(){this.close();let e=document.createElement("div");e.id="__eqcm_menu__",e.setAttribute("role","menu"),e.tabIndex=-1;let o=document.createElement("div");o.className="__eqcm_section__",o.textContent="Comandos dispon\xEDveis",e.appendChild(o);let n=document.createElement("div");n.className="__eqcm_sep__",e.appendChild(n);for(let u of this.commands){let g=document.createElement("div");g.className="__eqcm_item__",g.setAttribute("role","menuitem"),g.tabIndex=0;let d=document.createElement("span");d.className="__eqcm_kbd__",d.textContent=u.keys;let m=document.createElement("span");m.className="__eqcm_lbl__",m.textContent=u.label,g.appendChild(d),g.appendChild(m);let p=()=>{this.close(),setTimeout(()=>u.action(),60)};g.addEventListener("click",p),g.addEventListener("keydown",f=>{(f.key==="Enter"||f.key===" ")&&(f.preventDefault(),p())}),e.appendChild(g)}document.documentElement.appendChild(e),this.el=e;let a=240,i=this.commands.length*28+50,r=this.lastMouseX,s=this.lastMouseY,l=window.innerWidth,c=window.innerHeight;r+a+8>l&&(r=l-a-8),s+i+8>c&&(s=c-i-8),r<4&&(r=4),s<4&&(s=4),e.style.left=`${r}px`,e.style.top=`${s}px`,e.focus(),setTimeout(()=>{window.addEventListener("click",this.boundOutside,{capture:!0}),window.addEventListener("keydown",this.boundOutside,{capture:!0})},50)}close(){window.removeEventListener("click",this.boundOutside,{capture:!0}),window.removeEventListener("keydown",this.boundOutside,{capture:!0}),this.el?.remove(),this.el=null}isOpen(){return this.el!==null}destroy(){this.close(),window.removeEventListener("mousemove",this.boundMouseMove),document.getElementById("__eqcm_style__")?.remove()}};var Fe=class{el=null;pillEl=null;activeTab="console";activeFilter="all";autoScroll=!0;capturedImages=[];logs=[];logSeq=0;currentPlan=null;currentFlow=[];currentStepIdx=0;stepStatuses=new Map;stepErrors=new Map;modelName="--";latencyMs=0;questionSummary="";promptTokens=0;responseTokens=0;isDragging=!1;dragStartX=0;dragStartY=0;initialLeft=0;initialTop=0;isMinimized=!1;isVisible=!1;boundMouseMove;boundMouseUp;options;constructor(e={}){this.options=e,this.boundMouseMove=this.onMouseMove.bind(this),this.boundMouseUp=this.onMouseUp.bind(this),this.injectStyle(),this.createDom(),window.addEventListener("mousemove",this.boundMouseMove),window.addEventListener("mouseup",this.boundMouseUp),this.log("SYS","Debug Output Discreto pronto (Shift+H para alternar)")}open(){this.isVisible=!0,this.isMinimized&&(this.isMinimized=!1),this.el&&(this.el.style.display="flex",this.clampPosition()),this.pillEl&&(this.pillEl.style.display="none"),this.render()}openTab(e){this.activeTab=e,this.open(),this.el&&this.el.querySelectorAll(".__eq_dbg_tab__").forEach(o=>{let n=o.getAttribute("data-tab")===e;o.classList.toggle("active",n)}),this.render()}close(){this.isVisible=!1,this.isMinimized=!1,this.el&&(this.el.style.display="none"),this.pillEl&&(this.pillEl.style.display="none")}toggle(){!this.isVisible||this.isMinimized?this.open():this.close()}minimize(){this.isVisible&&(this.isMinimized=!0,this.el&&(this.el.style.display="none"),this.pillEl&&(this.pillEl.style.display="flex",this.updatePill()))}restore(){this.isMinimized=!1,this.pillEl&&(this.pillEl.style.display="none"),this.el&&(this.el.style.display="flex",this.clampPosition()),this.render()}isOpen(){return this.isVisible&&!this.isMinimized}log(e,o,n){let a=new Date,i=`${a.getHours().toString().padStart(2,"0")}:${a.getMinutes().toString().padStart(2,"0")}:${a.getSeconds().toString().padStart(2,"0")}.${a.getMilliseconds().toString().padStart(3,"0").slice(0,2)}`,r={id:++this.logSeq,time:i,category:e,msg:o,detail:n};this.logs.push(r),this.logs.length>300&&this.logs.shift(),this.updatePill(),this.isOpen()&&(this.activeTab==="console"&&this.renderConsoleLogs(),this.updateTabCounters())}setImages(e){this.capturedImages=e||[],this.updateTabCounters(),this.isOpen()&&this.activeTab==="media"&&this.renderMedia()}setPlan(e,o="",n=0,a="--",i){this.currentPlan=e,this.questionSummary=(o||"").slice(0,300),this.latencyMs=n,this.modelName=a,i&&(this.capturedImages=i),this.stepStatuses.clear(),this.stepErrors.clear();let r=Array.isArray(e?.actions)?e.actions.length:0;this.log("AI",`Plano recebido: ${r} a\xE7\xF5es planejadas`,JSON.stringify(e?.actions||[],null,2)),(e?.thinking||e?.rationale)&&this.log("AI",`Racioc\xEDnio: ${(e.thinking||e.rationale).slice(0,150)}...`),this.isOpen()&&this.render()}setFlow(e){this.currentFlow=e||[],this.currentStepIdx=0,this.stepStatuses.clear(),this.stepErrors.clear(),e.forEach((o,n)=>{this.stepStatuses.set(n,n===0?"active":"pending")}),this.log("FLOW",`Fluxo carregado com ${e.length} passos de intera\xE7\xE3o`),this.updatePill(),this.isOpen()&&this.render()}setStepIndex(e){this.currentStepIdx=e,this.currentFlow.forEach((n,a)=>{a<e?this.stepStatuses.get(a)!=="failed"&&this.stepStatuses.set(a,"done"):a===e?this.stepStatuses.set(a,"active"):this.stepStatuses.get(a)!=="failed"&&this.stepStatuses.set(a,"pending")});let o=this.currentFlow[e];if(o){let n=o.action,a=n.id||n.name||n.label||n.from||"alvo";this.log("FLOW",`Passo ${e+1}/${this.currentFlow.length} (${o.trigger}): ${n.t??"a\xE7\xE3o"} em "${a}"`)}this.updatePill(),this.isOpen()&&(this.activeTab==="flow"&&this.renderFlow(),this.updateTabCounters())}markStepSuccess(e,o){this.stepStatuses.set(e,"done"),this.log("ACTION",`\u2713 Passo ${e+1} executado com sucesso`,o),this.updatePill(),this.isOpen()&&this.activeTab==="flow"&&this.renderFlow()}markStepFailed(e,o){this.stepStatuses.set(e,"failed"),this.stepErrors.set(e,o),this.log("ERROR",`\u2715 Falha no Passo ${e+1}: ${o}`),this.updatePill(),this.isOpen()&&this.activeTab==="flow"&&this.renderFlow()}onHeaderMouseDown(e){if(!e.target.closest(".__eq_dbg_btn__, .__eq_dbg_tab__")&&(e.preventDefault(),this.isDragging=!0,this.dragStartX=e.clientX,this.dragStartY=e.clientY,this.el)){let o=this.el.getBoundingClientRect();this.initialLeft=o.left,this.initialTop=o.top}}onMouseMove(e){if(!this.isDragging||!this.el)return;let o=e.clientX-this.dragStartX,n=e.clientY-this.dragStartY,a=Math.max(10,window.innerWidth-this.el.offsetWidth-10),i=Math.max(10,window.innerHeight-this.el.offsetHeight-10),r=Math.min(Math.max(10,this.initialLeft+o),a),s=Math.min(Math.max(10,this.initialTop+n),i);this.el.style.left=`${r}px`,this.el.style.top=`${s}px`,this.el.style.right="auto",this.el.style.bottom="auto"}onMouseUp(){this.isDragging=!1}clampPosition(){if(!this.el)return;let e=this.el.getBoundingClientRect(),o=Math.max(10,window.innerWidth-e.width-10),n=Math.max(10,window.innerHeight-e.height-10),a=e.left,i=e.top;(a>o||i>n||a<10||i<10)&&(this.el.style.left=`${Math.min(Math.max(10,a),o)}px`,this.el.style.top=`${Math.min(Math.max(10,i),n)}px`,this.el.style.right="auto",this.el.style.bottom="auto")}render(){if(!this.el)return;this.updateTabCounters();let e=this.el.querySelector(".__eq_dbg_body__");e&&(this.activeTab==="console"?(e.innerHTML=`
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
      `,this.renderConsoleLogs(),this.wireConsoleEvents()):this.activeTab==="flow"?this.renderFlow():this.activeTab==="plan"?this.renderPlan():this.activeTab==="media"?this.renderMedia():this.activeTab==="audit"&&this.renderAudit())}renderConsoleLogs(){let e=this.el?.querySelector("#__eq_dbg_terminal__");if(!e)return;e.innerHTML="";let o=this.logs.filter(n=>this.activeFilter==="all"?!0:this.activeFilter==="error"?n.category==="ERROR"||n.category==="WARN":this.activeFilter==="flow"?n.category==="FLOW"||n.category==="KEY"||n.category==="CLICK":this.activeFilter==="dom"?n.category==="DOM"||n.category==="ACTION":this.activeFilter==="ai"?n.category==="AI":!0);if(o.length===0){e.innerHTML='<div class="__eq_dbg_empty__">Nenhum log correspondente ao filtro.</div>';return}o.forEach(n=>{let a=document.createElement("div");a.className=`__eq_dbg_line__ __eq_cat_${n.category.toLowerCase()}__`;let i=document.createElement("span");i.className=`__eq_dbg_badge__ __eq_bg_${n.category.toLowerCase()}__`,i.textContent=n.category;let r=document.createElement("span");r.className="__eq_dbg_time__",r.textContent=n.time;let s=document.createElement("span");if(s.className="__eq_dbg_msg__",s.textContent=n.msg,a.appendChild(r),a.appendChild(i),a.appendChild(s),n.detail){let l=document.createElement("span");l.className="__eq_dbg_detail_btn__",l.textContent=" [detalhes]",l.onclick=()=>{let c=a.querySelector("pre");if(c)c.remove();else{let u=document.createElement("pre");u.className="__eq_dbg_detail_pre__",u.textContent=n.detail,a.appendChild(u)}},a.appendChild(l)}e.appendChild(a)}),this.autoScroll&&(e.scrollTop=e.scrollHeight)}wireConsoleEvents(){if(!this.el)return;this.el.querySelectorAll(".__eq_dbg_chip__").forEach(a=>{a.addEventListener("click",i=>{let r=i.currentTarget.getAttribute("data-filter");this.activeFilter=r||"all",this.el?.querySelectorAll(".__eq_dbg_chip__").forEach(s=>s.classList.remove("active")),i.currentTarget.classList.add("active"),this.renderConsoleLogs()})});let e=this.el.querySelector("#__eq_dbg_btn_scroll__");e?.addEventListener("click",()=>{this.autoScroll=!this.autoScroll,e.classList.toggle("active",this.autoScroll)});let o=this.el.querySelector("#__eq_dbg_btn_copy__");o?.addEventListener("click",()=>{let a=this.logs.map(i=>`[${i.time}] [${i.category}] ${i.msg}${i.detail?`
${i.detail}`:""}`).join(`
`);navigator.clipboard.writeText(a).then(()=>{o.textContent="\u2713",setTimeout(()=>o.textContent="\u{1F4CB}",1e3)})}),this.el.querySelector("#__eq_dbg_btn_clear__")?.addEventListener("click",()=>{this.logs=[],this.renderConsoleLogs(),this.updateTabCounters()})}renderFlow(){let e=this.el?.querySelector(".__eq_dbg_body__");if(!e)return;if(!this.currentFlow||this.currentFlow.length===0){e.innerHTML=`
        <div class="__eq_dbg_empty__" style="padding:40px 20px;text-align:center;">
          <div style="font-size:24px;margin-bottom:8px;">\u23F8\uFE0F</div>
          <div>Nenhum fluxo de intera\xE7\xE3o ativo no momento.</div>
          <div style="font-size:11px;color:#9aa0a6;margin-top:6px;">Pressione Shift+Q para analisar a p\xE1gina ou aguarde o avan\xE7o autom\xE1tico.</div>
        </div>
      `;return}let o=this.currentFlow.map((a,i)=>{let r=a.action,s=this.stepStatuses.get(i)||(i===this.currentStepIdx?"active":i<this.currentStepIdx?"done":"pending"),l=s==="done"?'<span class="__eq_status_done__">\u2713 Conclu\xEDdo</span>':s==="active"?'<span class="__eq_status_active__">\u25B6 Em Andamento</span>':s==="failed"?'<span class="__eq_status_failed__">\u2715 Falhou</span>':'<span class="__eq_status_pending__">Pendente</span>',c=a.trigger==="key"?"\u2328\uFE0F Tecla":"\u{1F5B1}\uFE0F Clique",u=String(r.t||"act").toUpperCase(),g=r.id?`#${r.id}`:r.name?`[name="${r.name}"]`:r.label||r.from||"alvo",d=r.v!==void 0?` = "${r.v}"`:r.c!==void 0?` (check: ${r.c})`:"";return`
        <div class="__eq_flow_card__ ${s==="active"?"__eq_flow_active__":""}">
          <div class="__eq_flow_header__">
            <span class="__eq_flow_num__">Passo ${i+1}</span>
            <span class="__eq_flow_trigger__">${c}</span>
            <span class="__eq_flow_type__">${u}</span>
            <span class="__eq_flow_status__">${l}</span>
          </div>
          <div class="__eq_flow_content__">
            <div class="__eq_flow_target__">${Y(String(g))}<span style="color:#8ab4f8;">${Y(String(d))}</span></div>
            <div class="__eq_flow_hint__">${Y(a.hint||"")}${a.customMsg?` \u2022 <i style="color:#81c995;">${Y(a.customMsg)}</i>`:""}</div>
            ${this.stepErrors.has(i)?`<div class="__eq_flow_err__">Erro: ${Y(this.stepErrors.get(i))}</div>`:""}
          </div>
          <div class="__eq_flow_actions__">
            <button class="__eq_dbg_btn__ __eq_btn_exec_step__" data-step="${i}">For\xE7ar Passo</button>
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
      <div class="__eq_dbg_flow_list__">${o}</div>
    `,e.querySelectorAll(".__eq_btn_exec_step__").forEach(a=>{a.addEventListener("click",async i=>{let r=parseInt(i.currentTarget.getAttribute("data-step")||"0",10);if(this.options.onForceStep){a.textContent="Executando...";let s=await this.options.onForceStep(r);a.textContent=s?"\u2713 Sucesso":"\u2715 Falhou",setTimeout(()=>a.textContent="For\xE7ar Passo",1500)}})});let n=e.querySelector("#__eq_btn_force_all__");n?.addEventListener("click",async()=>{this.options.onForceAllSteps&&(n.textContent="Injetando...",await this.options.onForceAllSteps(),n.textContent="\u2713 Conclu\xEDdo",setTimeout(()=>n.textContent="\u26A1 Injetar Todas as Respostas",1500))})}renderPlan(){let e=this.el?.querySelector(".__eq_dbg_body__");if(!e)return;if(!this.currentPlan){e.innerHTML='<div class="__eq_dbg_empty__">Nenhum plano de IA capturado ainda. Pressione Shift+Q.</div>';return}let o=Math.round((this.currentPlan.confidence||1)*100),n=this.currentPlan.thinking||this.currentPlan.rationale||"Nenhum racioc\xEDnio textual retornado.",a=JSON.stringify(this.currentPlan,null,2);e.innerHTML=`
      <div style="padding:12px;overflow-y:auto;height:100%;box-sizing:border-box;display:flex;flex-direction:column;gap:12px;">
        <div style="display:flex;justify-content:space-between;align-items:center;background:#292a2d;padding:10px 14px;border-radius:6px;border:1px solid #3c4043;">
          <div>
            <div style="font-size:11px;color:#9aa0a6;text-transform:uppercase;font-weight:700;">Modo & Tipo</div>
            <div style="font-size:13px;font-weight:600;color:#8ab4f8;margin-top:2px;">${Y(this.currentPlan.mode||"auto")} \u2022 ${Y(this.currentPlan.pageType||"question")}</div>
          </div>
          <div style="text-align:right;">
            <div style="font-size:11px;color:#9aa0a6;text-transform:uppercase;font-weight:700;">Confian\xE7a</div>
            <div style="font-size:14px;font-weight:700;color:${o>80?"#81c995":"#fdd663"};margin-top:2px;">${o}%</div>
          </div>
        </div>

        <div>
          <div style="font-size:11px;font-weight:700;color:#9aa0a6;margin-bottom:4px;text-transform:uppercase;">Racioc\xEDnio da IA:</div>
          <div style="background:#1e1f22;border:1px solid #3c4043;border-radius:6px;padding:10px 12px;font-size:12.5px;line-height:1.5;color:#e8eaed;max-height:120px;overflow-y:auto;white-space:pre-wrap;">${Y(n)}</div>
        </div>

        <div style="flex:1;display:flex;flex-direction:column;min-height:140px;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
            <span style="font-size:11px;font-weight:700;color:#9aa0a6;text-transform:uppercase;">JSON do Plano Bruto:</span>
            <button class="__eq_dbg_btn__" id="__eq_btn_copy_json__" style="font-size:10px;padding:3px 8px;">Copiar JSON</button>
          </div>
          <pre style="flex:1;background:#1e1f22;border:1px solid #3c4043;border-radius:6px;padding:10px;font-family:'JetBrains Mono','Consolas',monospace;font-size:11px;color:#8ab4f8;overflow:auto;margin:0;">${Y(a)}</pre>
        </div>
      </div>
    `,e.querySelector("#__eq_btn_copy_json__")?.addEventListener("click",i=>{navigator.clipboard.writeText(a).then(()=>{let r=i.currentTarget;r.textContent="\u2713 Copiado",setTimeout(()=>r.textContent="Copiar JSON",1200)})})}renderMedia(){let e=this.el?.querySelector(".__eq_dbg_body__");if(!e)return;if(!this.capturedImages||this.capturedImages.length===0){e.innerHTML=`
        <div class="__eq_dbg_empty__" style="padding:40px 20px;text-align:center;">
          <div style="font-size:32px;margin-bottom:8px;">\u{1F5BC}\uFE0F</div>
          <div style="font-size:13px;font-weight:600;color:#e8eaed;">Nenhuma m\xEDdia detectada na quest\xE3o atual</div>
          <div style="font-size:11px;color:#9aa0a6;margin-top:6px;max-width:320px;margin-left:auto;margin-right:auto;line-height:1.5;">
            EasyQuiz varre automaticamente imagens &lt;img&gt;, gr\xE1ficos &lt;svg&gt;, &lt;canvas&gt; e fundos CSS do escopo da quest\xE3o ao analisar (Shift+Q).
          </div>
        </div>
      `;return}let o=this.currentPlan?.imageDescriptions||[],n="";this.capturedImages.forEach((a,i)=>{let r=o.find(p=>p.index===i),s=r?.relevant??!0,l=r?.description??(a.textContext||"Aguardando an\xE1lise da IA..."),c=a.captureStatus==="captured"?"\u2705":a.captureStatus==="text_only"?"\u{1F4DD}":"\u26A0\uFE0F",u=a.captureStatus==="captured"?"Visual":a.captureStatus==="text_only"?"Texto":"Falhou",g=a.base64?`data:${a.mediaType||"image/jpeg"};base64,${a.base64}`:"",d="";g?d=`
          <div style="position:relative;background:#111;border-bottom:1px solid #3c4043;height:120px;display:flex;align-items:center;justify-content:center;overflow:hidden;">
            <img src="${g}"
              style="max-width:100%;max-height:100%;object-fit:contain;cursor:pointer;"
              alt="M\xEDdia ${i+1}"
              title="Clique para ampliar"
              onclick="(function(el){ var ov=document.createElement('div'); ov.style='position:fixed;inset:0;z-index:2147483647;background:rgba(0,0,0,0.92);display:flex;align-items:center;justify-content:center;cursor:zoom-out;'; var img=document.createElement('img'); img.src=el.src; img.style='max-width:95vw;max-height:95vh;border-radius:6px;box-shadow:0 8px 32px rgba(0,0,0,0.8);'; ov.appendChild(img); ov.onclick=function(){ov.remove();}; document.body.appendChild(ov); })(this)"
            >
            <div style="position:absolute;top:6px;right:6px;background:rgba(0,0,0,0.75);border-radius:4px;padding:2px 6px;font-size:10px;font-weight:700;color:#fff;">
              ${c} ${u}
            </div>
          </div>
        `:d=`
          <div style="background:#1e1f22;padding:20px;text-align:center;color:#9aa0a6;font-size:11px;border-bottom:1px solid #3c4043;">
            ${c} ${u} \u2014 sem dados visuais
          </div>
        `;let m=s?'<span style="font-size:9.5px;font-weight:700;padding:1px 6px;border-radius:3px;background:rgba(129,201,149,0.2);border:1px solid rgba(129,201,149,0.4);color:#81c995;">RELEVANTE</span>':'<span style="font-size:9.5px;font-weight:700;padding:1px 6px;border-radius:3px;background:rgba(242,139,130,0.2);border:1px solid rgba(242,139,130,0.4);color:#f28b82;">IGNORADA</span>';n+=`
        <div style="background:#292a2d;border:1px solid #3c4043;border-radius:6px;overflow:hidden;border-left:3px solid ${s?"#81c995":"#5f6368"};">
          ${d}
          <div style="padding:10px 12px;display:flex;flex-direction:column;gap:6px;">
            <div style="display:flex;justify-content:space-between;align-items:center;">
              <span style="font-size:11.5px;font-weight:700;color:#e8eaed;">Imagem ${i+1} (${Y(a.source||"inline")})</span>
              ${m}
            </div>
            ${a.associatedLabel?`<div style="font-size:10.5px;color:#8ab4f8;font-weight:500;">${Y(a.associatedLabel)}</div>`:""}
            <div style="font-size:11px;color:#bdc1c6;line-height:1.45;background:#1e1f22;padding:6px 8px;border-radius:4px;">
              <strong style="color:#9aa0a6;display:block;font-size:10px;text-transform:uppercase;margin-bottom:2px;">Interpreta\xE7\xE3o da IA:</strong>
              ${Y(l)}
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
        ${n}
      </div>
    `}renderAudit(){let e=this.el?.querySelector(".__eq_dbg_body__");e&&(e.innerHTML=`
      <div style="padding:14px;overflow-y:auto;height:100%;box-sizing:border-box;display:flex;flex-direction:column;gap:14px;">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
          <div style="background:#292a2d;border:1px solid #3c4043;border-radius:6px;padding:10px 12px;">
            <div style="font-size:10.5px;color:#9aa0a6;text-transform:uppercase;font-weight:700;">Modelo Ativo</div>
            <div style="font-size:13px;font-weight:700;color:#8ab4f8;margin-top:3px;overflow:hidden;text-overflow:ellipsis;">${Y(this.modelName)}</div>
          </div>
          <div style="background:#292a2d;border:1px solid #3c4043;border-radius:6px;padding:10px 12px;">
            <div style="font-size:10.5px;color:#9aa0a6;text-transform:uppercase;font-weight:700;">Lat\xEAncia da API</div>
            <div style="font-size:13px;font-weight:700;color:#81c995;margin-top:3px;">${this.latencyMs?`${this.latencyMs} ms`:"--"}</div>
          </div>
        </div>

        <div>
          <div style="font-size:11px;font-weight:700;color:#9aa0a6;margin-bottom:6px;text-transform:uppercase;">Enunciado Capturado:</div>
          <div style="background:#1e1f22;border:1px solid #3c4043;border-radius:6px;padding:10px;font-size:12px;color:#bdc1c6;line-height:1.45;max-height:140px;overflow-y:auto;white-space:pre-wrap;">${Y(this.questionSummary||"Nenhum texto capturado.")}</div>
        </div>

        <div>
          <div style="font-size:11px;font-weight:700;color:#9aa0a6;margin-bottom:6px;text-transform:uppercase;">Diagn\xF3stico do Modo Discreto:</div>
          <div style="background:#1e1f22;border:1px solid #3c4043;border-radius:6px;padding:10px;font-size:11.5px;color:#bdc1c6;line-height:1.5;">
            \u2022 Vers\xE3o: <span style="color:#f28b82;font-weight:600;">${ge}</span><br>
            \u2022 Interceptores de Op\xE7\xF5es: <span style="color:#81c995;font-weight:600;">Ativos</span><br>
            \u2022 Concorr\xEAncia Guard: <span style="color:#81c995;font-weight:600;">Protegido</span><br>
            \u2022 Mapeamento V/F em Tabela: <span style="color:#8ab4f8;font-weight:600;">Direcionado (name, value, label)</span><br>
            \u2022 Fallback de Inje\xE7\xE3o: <span style="color:#8ab4f8;font-weight:600;">Native setter + Synthetic dispatch</span>
          </div>
        </div>
      </div>
    `)}updateTabCounters(){if(!this.el)return;let e=this.el.querySelector("#__eq_cnt_all"),o=this.el.querySelector("#__eq_cnt_err"),n=this.el.querySelector("#__eq_cnt_flow"),a=this.el.querySelector("#__eq_cnt_dom"),i=this.el.querySelector("#__eq_cnt_ai");e&&(e.textContent=String(this.logs.length)),o&&(o.textContent=String(this.logs.filter(l=>l.category==="ERROR"||l.category==="WARN"||l.category==="REPLAN").length)),n&&(n.textContent=String(this.logs.filter(l=>l.category==="FLOW"||l.category==="KEY"||l.category==="CLICK").length)),a&&(a.textContent=String(this.logs.filter(l=>l.category==="DOM"||l.category==="ACTION").length)),i&&(i.textContent=String(this.logs.filter(l=>l.category==="AI").length));let r=this.el.querySelector("#__eq_tab_badge_flow__");r&&(r.textContent=this.currentFlow.length>0?`${this.currentStepIdx+1}/${this.currentFlow.length}`:"0");let s=this.el.querySelector("#__eq_tab_badge_media__");s&&(s.textContent=String(this.capturedImages.length))}updatePill(){if(!this.pillEl)return;let e=this.logs.filter(i=>i.category==="ERROR").length,o=this.currentFlow.length,n=o>0?`${this.currentStepIdx+1}/${o}`:"Idle",a=this.pillEl.querySelector(".__eq_pill_text__");a&&(a.innerHTML=`<img src="${xe.canvasLogo}" style="width:14px;height:14px;vertical-align:middle;margin-right:4px;object-fit:contain;"/>EQ ${ge}: ${n} ${e>0?`(${e} err)`:"\u2022 OK"}`)}createDom(){this.el=document.createElement("div"),this.el.id="__eq_dbg_window__",this.el.style.display="none",this.el.innerHTML=`
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
    `,this.el.querySelector(".__eq_dbg_header__").addEventListener("mousedown",this.onHeaderMouseDown.bind(this)),this.el.querySelectorAll(".__eq_dbg_tab__").forEach(o=>{o.addEventListener("click",n=>{let a=n.currentTarget.getAttribute("data-tab");this.activeTab=a||"console",this.el?.querySelectorAll(".__eq_dbg_tab__").forEach(i=>i.classList.remove("active")),n.currentTarget.classList.add("active"),this.render()})}),this.el.querySelector("#__eq_win_min__")?.addEventListener("click",()=>this.minimize()),this.el.querySelector("#__eq_win_close__")?.addEventListener("click",()=>this.close()),document.documentElement.appendChild(this.el),this.pillEl=document.createElement("div"),this.pillEl.id="__eq_dbg_pill__",this.pillEl.style.display="none",this.pillEl.innerHTML=`
      <span class="__eq_pill_dot__"></span>
      <span class="__eq_pill_text__"><img src="${xe.canvasLogo}" style="width:14px;height:14px;vertical-align:middle;margin-right:4px;object-fit:contain;"/>EQ ${ge}: Pronto</span>
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
    `,document.documentElement.appendChild(e)}destroy(){window.removeEventListener("mousemove",this.boundMouseMove),window.removeEventListener("mouseup",this.boundMouseUp),this.el?.remove(),this.pillEl?.remove(),document.getElementById("__eq_dbg_style__")?.remove()}};function Y(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}var Bt=`

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
3. Para a\xE7\xE3o "val" (texto/n\xFAmero): use trigger="key". Sempre 1 \xFAnico step por campo contendo o VALOR COMPLETO no campo "v" (ex: "282,6").
   - NUNCA divida o valor em m\xFAltiplos steps nem caractere por caractere.
   - 1 tecla do usu\xE1rio = 1 campo preenchido com seu valor exato e completo.
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
`;function Rt(t){let e=[],o=1;for(let n of t){let a=n.t;a==="val"?e.push({step:o++,trigger:"key",action:n,hint:"Keyboard Interact",customMsg:null}):a==="chk"||a==="clk"?e.push({step:o++,trigger:"click",action:n,hint:"Mouse Interact",customMsg:null}):a==="sel"?(e.push({step:o++,trigger:"click",action:n,hint:"Mouse Interact",customMsg:"Opening..."}),e.push({step:o++,trigger:"click",action:n,hint:"Option Selected",customMsg:null})):a==="drag"?e.push({step:o++,trigger:"click",action:n,hint:"Mover Item",customMsg:null}):a==="adv"&&e.push({step:o++,trigger:"click",action:n,hint:"Next Page Loading",customMsg:null})}return e}function jt(t,e){if(!Array.isArray(t)||t.length===0)return Rt(e);let o=[];for(let r of t){if(!r||typeof r!="object")continue;let s=r,l=s.trigger==="key"?"key":"click",c=s.action||{},u=l==="key"?1:void 0;o.push({step:typeof s.step=="number"?s.step:o.length+1,trigger:l,action:c,chars:u,hint:typeof s.hint=="string"?s.hint.slice(0,30):l==="key"?"Keyboard Interact":"Mouse Interact",customMsg:typeof s.customMsg=="string"?s.customMsg.slice(0,22):null})}if(o.length===0)return Rt(e);let n=vo(o,e),a=[],i=1;for(let r of n)if(r.action.t==="val"){let s=String(r.action.v??"");if(s.length>0)for(let l=1;l<=s.length;l++)a.push({...r,step:i++,chars:1,action:{...r.action,v:s.slice(0,l)},customMsg:l===s.length?"Preenchido":null});else r.step=i++,a.push(r)}else r.step=i++,a.push(r);return a}function vo(t,e){let o=[];for(let n=0;n<t.length;n++){let a=t[n],i=a.action;if(!i.t&&e[n]&&(a.action=e[n]),i.t==="chk"&&!i.name&&i.id){let s=String(i.id);if(s.startsWith("eq-")||s.match(/^[a-z0-9]+-[a-z0-9]+-[a-z0-9]+$/))try{let l=document.querySelector(`[data-easyquiz-id="${s}"], #${s}`);l?.name&&(a.action.name=l.name,l.value&&l.value!=="on"&&(a.action.v=l.value))}catch{}}if(i.t==="val"){let s=e.find(l=>l.t==="val"&&(i.id&&l.id===i.id||i.name&&l.name===i.name));s&&s.v!==void 0&&String(s.v).length>String(i.v??"").length&&(a.action.v=s.v)}let r=o[o.length-1];if(r){let s=r.action;if(s.t==="val"&&i.t==="val"&&(!!i.id&&!!s.id&&i.id===s.id||!!i.name&&!!s.name&&i.name===s.name||!i.id&&!i.name&&!s.id&&!s.name)){let g=e.find(d=>d.t==="val"&&(i.id&&d.id===i.id||i.name&&d.name===i.name))?.v??(String(s.v||"").length>=String(i.v||"").length?s.v:i.v);s.v=g;continue}if(r.trigger===a.trigger&&s.t===i.t&&s.name===i.name&&s.v===i.v&&s.id===i.id||s.t==="adv"&&i.t==="adv")continue}a.step=o.length+1,o.push(a)}return o.length>0?o:t}if(window.__eqdiscrete)try{window.__eqdiscrete.destroy()}catch{}xo();function yo(){try{if(document.querySelector("link[data-eqdiscrete-preconnect]"))return;let t=document.createElement("link");t.rel="preconnect",t.href="https://generativelanguage.googleapis.com",t.crossOrigin="anonymous",t.setAttribute("data-eqdiscrete-preconnect","true"),document.head?.appendChild(t)}catch{}}var wo=Ee+Bt;async function xo(){yo(),ht();let t=new Pe,e=new De,o=new Re,n=new je(t,e,o),a=new Fe({onForceStep:w=>n.forceStep(w),onForceAllSteps:()=>n.forceAll()});n.setDebugOutput(a);let i=new ze({onModelChange:()=>e.flash("Modelo OK")}),r=new Ne(t,e),s=new Qe,l=null,c=!1,u=null,g=0;window.addEventListener("click",w=>{if(c&&w.isTrusted){let k=w.target;k&&!k.closest("#__eqdm_menu__,#__eqkm_overlay__,#__eqcm_menu__,#__eqdiscrete_coin__,#__eqdiscrete_toasts__,#__eq_dbg_window__,#__eq_dbg_pill__")&&(g=Date.now(),a.log("CLICK","Clique antecipado registrado durante an\xE1lise"))}},{capture:!0});let d=new Be({onPageAdvance:()=>n.isActive()||c?!1:(h(!0),!0)});d.start();let m=oe();m.apiKey&&Ge(m.apiKey).catch(()=>{}),e.flash(`<img src="${xe.canvasLogo}" style="width:14px;height:14px;vertical-align:middle;margin-right:4px;object-fit:contain;"/>EQ ${ge} Ativo`);let p=0,f=[1500,3e3,5e3,8e3];async function h(w=!1,k=0){if(u&&(clearTimeout(u),u=null),c&&w){a.log("SYS","An\xE1lise j\xE1 em andamento \u2014 preservando requisi\xE7\xE3o ativa");return}if(w&&n.isActive())return;if(l){try{l.abort()}catch{}l=null}n.isActive()&&n.abort();let M=oe();if(!M.apiKey&&(!Array.isArray(M.apiKeys)||M.apiKeys.length===0)){e.flash("Config: Shift+A"),t.flashError(2e3);return}c=!0,p=k,l=new AbortController;let P=l.signal;d.resetHash(),t.setState("loading"),(!w||k>0)&&e.flash(k>0?`Tentativa ${k+1}`:"Analisando"),a.log("SYS",`Iniciando an\xE1lise (proativo: ${w}, retry: ${k})`);function v(){let S=f[Math.min(k,f.length-1)];a.log("WARN",`Agendando retry em ${S}ms`),u=window.setTimeout(()=>{n.isActive()||h(!1,k+1)},S)}try{if(w&&await new Promise(R=>setTimeout(R,60)),P.aborted)return;let S=Te(!1);if(S||(S=ye()),!S||!S.questionText?.trim()){t.setState("idle"),k===0&&!w&&e.flash("Sem conte\xFAdo"),a.log("WARN","Nenhum conte\xFAdo ou quest\xE3o detectada na p\xE1gina"),v();return}a.log("DOM",`Contexto detectado: ${S.controls.length} controles, ${S.questionText.length} chars`,S.questionText);let _=await It(S.scope,M.useVision);if(P.aborted)return;a.setImages(_);let C=performance.now(),I=await Et(S,_,M,(R,j)=>a.log(j==="error"?"ERROR":j==="warning"?"WARN":"SYS",`[IA] ${R}`),P,{systemPromptOverride:wo}),O=Math.round(performance.now()-C);if(P.aborted)return;t.setState("idle");let D=I.plan;if(a.log("SYS",`An\xE1lise conclu\xEDda em ${O}ms via ${I.usedModel??M.model} \u2014 pageType: ${D.pageType} | mode: ${D.mode} | ${D.actions?.length??0} a\xE7\xE3o(\xF5es)`),a.setPlan(D,S.questionText,O,M.model,_),D.memoryToStore&&mt(D.memoryToStore),D.imageDescriptions&&D.imageDescriptions.length>0){a.log("AI",`\u{1F5BC}\uFE0F ${D.imageDescriptions.length} imagem(ns) analisadas:`);for(let R of D.imageDescriptions){let j=R.relevant?"\u2705":"\u26A0\uFE0F";a.log(R.relevant?"AI":"WARN",`  ${j} Imagem ${R.index+1} [${R.relevant?"RELEVANTE":"IGNORADA"}]: ${R.description}`)}}if(D.pageType==="conclusion"){e.flash("Sess\xE3o encerrada"),a.log("SYS","P\xE1gina de conclus\xE3o detectada");return}let H=jt(D.interactionFlow,D.actions||[]);if(a.log("SYS",`Fluxo gerado: ${H.length} step(s) \u2014 ${H.map(R=>`${R.trigger}[${R.action?.t}]`).join(", ")}`),D.pageType==="info"||D.pageType==="start"){if(t.flashOk(1e3),e.flash("Avan\xE7ar \u2192"),a.log("SYS",`P\xE1gina informativa (${D.pageType}) \u2014 aguardando clique do usu\xE1rio para avan\xE7ar`),H.length>0)n.start(H);else{let R=[{step:1,trigger:"click",action:{t:"adv",label:"continuar"},hint:"Clique para avan\xE7ar",customMsg:null}];a.log("SYS","Fluxo adv gerado automaticamente para p\xE1gina informativa"),n.start(R)}return}if(!H.length){a.log("WARN","Plano da IA retornou sem a\xE7\xF5es ou fluxo de intera\xE7\xE3o"),v();return}p=0,t.flashOk(500);let U=H[0];e.flash(U.hint||"Pronto"),U.customMsg&&setTimeout(()=>e.flash(U.customMsg),1400);let Q=H.filter(R=>R.action?.t==="drag");if(Q.length>0){a.log("FLOW",`\u{1F504} ${Q.length} step(s) de drag/categoriza\xE7\xE3o no fluxo. Estrat\xE9gias A-G ser\xE3o tentadas.`);for(let R of Q){let j=R.action;a.log("FLOW",`  Drag: "${j.from}" \u2192 "${j.to}"`,JSON.stringify(j))}}n.start(H),H.length>0&&H[0].trigger==="click"&&Date.now()-g<4e3&&(g=0,a.log("FLOW","Aplicando clique antecipado no primeiro step"),setTimeout(()=>{n.forceStep(0)},40))}catch(S){if(P.aborted)return;t.setState("idle");let _=S instanceof Error?S.message:String(S);if(a.log("ERROR",`Erro na an\xE1lise: ${_}`),_.includes("403")||_.includes("API key")||_.includes("inv\xE1lida")){e.flash("Acesso negado"),t.flashError();return}if(_.includes("429")||_.includes("Quota")||_.includes("RESOURCE_EXHAUSTED")||_.includes("Todas as tentativas")){_.includes("Todas as tentativas")||k>=4?(e.flash("Limite \u2014 aguarde"),t.flashError(),v()):(e.flash("Chave rotacionando"),t.flashError(300),h(!1,k+1));return}t.flashError(800),v()}finally{l?.signal===P&&(l=null),c=!1}}function A(){if(c){e.flash("Analisando...");return}if(n.isActive()){let w=n.getCurrentStep()+1,k=n.getTotalSteps(),M=n.getState()==="waiting_key"?"Tecla":"Mouse";e.flash(`${w}/${k} ${M}`)}else{let k=oe().model.replace("gemini-","").replace("-flash","F").replace("-lite","L").replace("-preview","P");e.flash(`OK \u2014 ${k}`)}}function b(){i.isOpen()&&i.close(),r.isOpen()&&r.close(),s.isOpen()&&s.close(),a.isOpen()&&a.close()}let y=[{keys:"Shift+Q",label:"Analisar p\xE1gina",action:()=>{h()}},{keys:"Shift+V",label:"M\xEDdias IA (Vision)",action:()=>{a.openTab("media"),e.flash("M\xEDdias IA")}},{keys:"Shift+M",label:"Trocar modelo",action:()=>i.isOpen()?i.close():i.open()},{keys:"Shift+A",label:"Config API keys",action:()=>r.isOpen()?r.close():r.open()},{keys:"Shift+Z",label:"Abortar fluxo",action:()=>n.isActive()?n.abort():e.flash("Nada ativo")},{keys:"Shift+R",label:"Re-analisar",action:()=>{h()}},{keys:"Shift+H",label:"Debug Output",action:()=>a.toggle()},{keys:"Shift+I",label:"\xDAltimo aviso",action:()=>e.reshow()},{keys:"Shift+C",label:"Comandos",action:()=>s.isOpen()?s.close():s.open()},{keys:"Escape",label:"Fechar menus",action:b}];s.setCommands(y);function x(w){let k=w.key;if(w.altKey&&(k==="q"||k==="Q")||w.shiftKey&&k==="Q"){w.preventDefault(),w.stopPropagation(),h();return}if(w.shiftKey&&k==="M"){w.preventDefault(),w.stopPropagation(),i.isOpen()?i.close():i.open();return}if(w.shiftKey&&k==="A"){w.preventDefault(),w.stopPropagation(),r.isOpen()?r.close():r.open();return}if(w.shiftKey&&k==="Z"){if(w.preventDefault(),w.stopPropagation(),l){try{l.abort()}catch{}l=null}u&&(clearTimeout(u),u=null),n.isActive()?n.abort():e.flash("Abortado"),c=!1,t.setState("idle");return}if(w.shiftKey&&k==="R"){w.preventDefault(),w.stopPropagation(),h();return}if(w.shiftKey&&k==="H"){w.preventDefault(),w.stopPropagation(),a.toggle();return}if(w.shiftKey&&(k==="V"||k==="v")){w.preventDefault(),w.stopPropagation(),a.openTab("media"),e.flash("M\xEDdias IA");return}if(w.shiftKey&&k==="I"){w.preventDefault(),w.stopPropagation(),e.reshow();return}if(w.shiftKey&&k==="C"){w.preventDefault(),w.stopPropagation(),s.isOpen()?s.close():s.open();return}k==="Escape"&&(i.isOpen()||r.isOpen()||s.isOpen()||a.isOpen())&&(w.stopPropagation(),w.preventDefault(),b())}window.addEventListener("keydown",x,{capture:!0}),window.__eqdiscrete={analyze:()=>h(),destroy:()=>{window.removeEventListener("keydown",x,{capture:!0}),u&&clearTimeout(u),n.destroy(),a.destroy(),i.destroy(),r.destroy(),s.destroy(),d.stop(),t.destroy(),e.destroy(),o.clearAll(),delete window.__eqdiscrete}},h(!0)}})();
