// ==UserScript==
// @name         EasyQuiz Pro
// @namespace    https://github.com/minifoxie/EasyQuiz
// @version      2.3.6
// @description  Resolução inteligente e preenchimento de questões e formulários com IA
// @author       minifoxie
// @match        *://*/*
// @updateURL    https://raw.githubusercontent.com/minifoxie/EasyQuiz/main/dist/easyquiz.user.js
// @downloadURL  https://raw.githubusercontent.com/minifoxie/EasyQuiz/main/dist/easyquiz.user.js
// @grant        none
// @run-at       document-idle
// ==/UserScript==

/* EasyQuiz v1.0.0 — Resolução inteligente de quizzes sem servidor
 * GitHub: https://github.com/minifoxie/EasyQuiz
 * 100% Client-side. Direct Google Gemini REST API.
 */
"use strict";(()=>{var se={apiKey:"",apiKeys:[],model:"gemini-3.5-flash-lite",uiMode:"easy",modeHint:"",engine:"smart",dryRun:!1,autoApply:!0,autoAdvance:!1,hostDarkMode:!0,useVision:!0,confidenceThreshold:.8};function W(o){if(!o||typeof o!="string")return!1;let e=o.toLowerCase().trim().replace(/^models\//,"");if(!e.includes("gemini"))return!1;let t=["imagen","image","veo","omni","video","embedding","embed","tts","audio","speech","voice","sound","live","transcribe","bidi","aqa","learnlm","deep-research","computer-use","robotics","rt-1","rt-2","mediapipe","cyber","latest","-ultra","experimental"];for(let a of t)if(e.includes(a))return!1;return!(!e.includes("flash")&&!e.includes("pro"))}var Ye="easyquiz_settings_v2",Ae="easyquiz_activity_metrics";function Ze(){try{let o=localStorage.getItem(Ye);if(!o){let s=localStorage.getItem("easyquiz_settings_v1");if(s){let i=JSON.parse(s);return{...se,apiKey:i.apiKey||""}}return{...se}}let e=JSON.parse(o),t=typeof e.model=="string"&&W(e.model)?e.model:se.model,a=Array.isArray(e.apiKeys)?e.apiKeys.map(s=>typeof s=="string"?s.trim().replace(/^["']|["']$/g,""):"").filter(s=>s.length>5):[],r=typeof e.apiKey=="string"?e.apiKey.trim().replace(/^["']|["']$/g,""):"";if(a.length===0&&r&&(a=[r]),a.length===0)try{let s=localStorage.getItem("easyquiz_api_keys");if(s){let i=JSON.parse(s);Array.isArray(i)&&(a=i.filter(d=>typeof d=="string"&&d.trim().length>5))}}catch{}return{apiKey:a[0]||r||se.apiKey,apiKeys:a,model:t,uiMode:e.uiMode==="easy"||e.uiMode==="advanced"?e.uiMode:se.uiMode,modeHint:e.modeHint??"",engine:e.engine??"smart",dryRun:!!e.dryRun,autoApply:e.autoApply!==void 0?!!e.autoApply:!0,autoAdvance:!!e.autoAdvance,hostDarkMode:e.hostDarkMode!==void 0?!!e.hostDarkMode:!0,useVision:e.useVision!==void 0?!!e.useVision:se.useVision,confidenceThreshold:typeof e.confidenceThreshold=="number"?e.confidenceThreshold:se.confidenceThreshold}}catch{return{...se}}}function wt(){try{localStorage.removeItem(Ye),localStorage.removeItem("easyquiz_settings_v1"),localStorage.removeItem(Ae),sessionStorage.removeItem(Ae);let o=[];for(let e=0;e<localStorage.length;e++){let t=localStorage.key(e);t&&(t.startsWith("eq_")||t.startsWith("easyquiz_"))&&o.push(t)}o.forEach(e=>localStorage.removeItem(e)),et()}catch(o){console.warn("[EasyQuiz] Erro ao resetar dados:",o)}}function $e(o){try{let e=localStorage.getItem("eq_domain_cache_"+o);if(!e)return{};let t=JSON.parse(e);if(t.advanceSelector&&/inject|injetar/i.test(t.advanceSelector)){t.advanceSelector=void 0;try{localStorage.removeItem("eq_domain_cache_"+o)}catch{}}return t}catch{return{}}}function _e(o,e){if(e.advanceSelector&&/inject|injetar/i.test(e.advanceSelector))return;let a={...$e(o),...e};try{localStorage.setItem("eq_domain_cache_"+o,JSON.stringify(a))}catch(r){console.warn("[EasyQuiz] Erro cache de dominio:",r)}}function Ct(o){let e=Ze(),t=Array.isArray(o.apiKeys)?o.apiKeys.map(n=>typeof n=="string"?n.trim().replace(/^["']|["']$/g,""):"").filter(n=>n.length>5):e.apiKeys,a;typeof o.apiKey=="string"?a=o.apiKey.trim().replace(/^["']|["']$/g,""):Array.isArray(o.apiKeys)&&o.apiKeys.length>0?a=t[0]||"":a=e.apiKey,a&&!t.includes(a)&&(t=[a,...t]),t.length>0&&(!a||!t.includes(a))&&(a=t[0]);let r={...e,...o,apiKey:a,apiKeys:t};try{localStorage.setItem(Ye,JSON.stringify(r)),localStorage.setItem("easyquiz_api_keys",JSON.stringify(t))}catch(n){console.warn("[EasyQuiz] Falha ao persistir configura\xE7\xF5es no localStorage:",n)}return r}var ge=[],Et=12,_t=1200;function qt(o){let e=o.trim().replace(/\s+/g," ").slice(0,_t);e&&!ge.includes(e)&&(ge.push(e),ge.length>Et&&(ge=ge.slice(-Et)))}function Oe(){return ge}function et(){ge=[]}function Tt(){return{startTime:Date.now(),totalElapsedMs:0,completedQuestionsCount:0,averageDurationMs:0,records:[]}}var we=Tt();function Ce(){try{localStorage.removeItem(Ae)}catch{}return we}function eo(o){we=o;try{let e=JSON.stringify(o);sessionStorage.setItem(Ae,e),localStorage.removeItem(Ae)}catch{}}function St(o){let e=we,t=Date.now(),a=e.records[e.records.length-1];if(a&&a.id===o.id&&t-a.timestamp<3e3)return e;let r={...o,timestamp:t},n=[...e.records,r],s=n.filter(u=>u.status==="answered"||u.status==="verified").length,i=n.reduce((u,h)=>u+h.durationMs,0),d=s>0?Math.round(i/s):0,l={startTime:e.startTime||t,totalElapsedMs:Math.max(t-(e.startTime||t),i),completedQuestionsCount:s,averageDurationMs:d,records:n};return eo(l),l}function qe(){we=Tt();try{sessionStorage.removeItem(Ae),localStorage.removeItem(Ae)}catch{}return we}var Lt=`Voc\xEA \xE9 o motor operacional inteligente do EasyQuiz. Sa\xEDda EXCLUSIVA em JSON minificado, sem markdown, sem coment\xE1rios, sem texto fora do JSON.

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
`;function to(o,e){return/forms\.(google|gle)\.com|docs\.google\.com\/forms/i.test(o)||e.includes("Qr7Oae")||e.includes("freebirdFormviewer")||e.includes("data-item-id")?"[PLATAFORMA: Google Forms \u2014 use clk nos containers de alternativa; IDs via data-item-id ou texto da op\xE7\xE3o]":/wayground|quizizz/i.test(o)||e.includes("data-functional-selector")?e.includes("classification")||e.toLowerCase().includes("fato")||e.toLowerCase().includes("opini")?`[PLATAFORMA: Wayground/Quizizz CLASSIFICA\xC7\xC3O drag-and-drop]
[RESPOSTAS] ter\xE1 items com t="draggable" e id hexadecimal (ex: 695fa5b6...).
Use EXCLUSIVAMENTE: {t:"drag", from:"ID_hexadecimal_do_card", to:"NOME_DA_CATEGORIA"}
Exemplo: {t:"drag",from:"695fa5b69885555d8155a5ac",to:"FATO"}
Classifique TODOS os items (1 drag por item) antes de emitir adv.
mode: "arrastar_soltar"`:"[PLATAFORMA: Wayground/Quizizz \u2014 alternativas s\xE3o cards clic\xE1veis, use clk]":/khanacademy\.org/i.test(o)||e.includes("perseus")?"[PLATAFORMA: Khan Academy \u2014 widgets Perseus; use js via $eq para widgets interativos se necess\xE1rio]":/moodle|ava\.|classroom\.google/i.test(o)?"[PLATAFORMA: Moodle/AVA/Classroom \u2014 formul\xE1rios padr\xE3o]":/duolingo/i.test(o)?"[PLATAFORMA: Duolingo \u2014 tiles clic\xE1veis, use clk por texto]":/blackboard|canvas\.instructure/i.test(o)?"[PLATAFORMA: Canvas/Blackboard \u2014 quiz-question padr\xE3o]":/socrative|kahoot/i.test(o)?"[PLATAFORMA: Socrative/Kahoot \u2014 alternativas s\xE3o bot\xF5es, use clk]":""}function Te(o,e,t){let a=o.htmlSnippet.includes("draggable")||o.htmlSnippet.includes("perseus")||o.htmlSnippet.includes("category")||o.htmlSnippet.includes("dropzone")||o.controls.some(b=>b.type==="draggable"||b.type==="dropzone"),r=/katex|latex|\\frac|\\sqrt/i.test(o.htmlSnippet),n=/forms\.(google|gle)\.com|docs\.google\.com\/forms/i.test(o.sourceUrl)||o.htmlSnippet.includes("Qr7Oae")||o.htmlSnippet.includes("data-item-id")||o.htmlSnippet.includes("freebirdFormviewer"),s=(/wayground|quizizz/i.test(o.sourceUrl)||o.htmlSnippet.includes("data-functional-selector"))&&(o.htmlSnippet.includes("classification")||o.controls.filter(b=>b.role==="answer").length===0),i=o.controls.filter(b=>b.role!=="navigation").length===0,d=i||a||n||s||r&&o.questionText.length<60,l=i?4500:s?6e3:1800,u=d?`
[HTML]:
${o.htmlSnippet.slice(0,l).replace(/\s+/g," ")}`:"",h="";if(i&&typeof document<"u")try{let b=Array.from(document.querySelectorAll('input:not([type=hidden]), textarea, select, button, [role="button"], [role="radio"], [role="checkbox"], [role="option"], [onclick], [data-action], a[href]:not([href="#"]), [tabindex]:not([tabindex="-1"])')).filter(y=>{let v=y,x=v.getBoundingClientRect?.()||{width:0,height:0};return x.width>0&&x.height>0&&!v.closest("#easyquiz-shadow-root, .eq-sidebar")}).slice(0,40).map(y=>{let v=y,x=v.tagName.toLowerCase(),q=v.id?`#${v.id}`:"",T=v.className&&typeof v.className=="string"?`.${v.className.trim().split(/\s+/).slice(0,2).join(".")}`:"",M=(v.textContent||v.value||v.getAttribute("aria-label")||"").trim().slice(0,60),E=v.getAttribute("type")||v.getAttribute("role")||"";return`${x}${q}${T}[${E}] txt="${M}"`});b.length>0&&(h=`
[DOM-INTERATIVO]:
${b.join(`
`)}`)}catch{}let c=Oe(),m=c.length>0?`
[MEM\xD3RIA]:
${c.join(" | ")}
`:"",p=o.controls.filter(b=>b.role!=="navigation"),f=o.controls.filter(b=>b.role==="navigation"),g=to(o.sourceUrl,o.htmlSnippet),A=g?`
${g}
`:"";return`--- AN\xC1LISE ---
[MODO]: ${t.engine} | Dica: ${t.modeHint||"Auto"}
[URL]: ${o.sourceUrl}
[P\xC1GINA]: ${o.pageTitle}${m}${A}
[DADOS]
[TEXTO]:
${o.questionText}${u}${h}

[RESPOSTAS]:
${(()=>{if(p.length===0)return"Nenhuma";let b=p.filter(w=>w.type==="checkbox"||w.type==="chk"),y=new Set(p.filter(w=>w.type==="radio").map(w=>w.name).filter(Boolean)),v=b.filter(w=>!w.name||!y.has(w.name)),x=/selecione as|assinale as|quais das|todas as|marque as|escolha as|quais dessas|quais dos/i.test(o.questionText),q=v.length>=2||x,T=y.size>1||/verdadeir|fals[oa]|\bv\s*\/\s*f\b|julgue|itens/i.test(o.questionText)&&y.size>=1,M=p.every(w=>w.type==="radio"||w.type==="chk")&&y.size===1&&!q&&!T,E=p.filter(w=>w.type==="text"||w.type==="number"||w.type==="val"||w.tag==="input"||w.tag==="textarea"),L=E.length>=2;return(T?`[GRADE VERDADEIRO/FALSO (${y.size||"m\xFAltiplas"} afirma\xE7\xF5es): voc\xEA DEVE julgar e marcar exatamente 1 op\xE7\xE3o (V ou F) para CADA uma das ${y.size} afirma\xE7\xF5es \u2014 emita ${y.size} a\xE7\xF5es chk separadas + adv]
`:q?`[MULTI-SELE\xC7\xC3O: marque TODOS os corretos, pode ser 2 ou mais]
`:M?`[ESCOLHA-\xDAnica: marque APENAS 1 op\xE7\xE3o]
`:L?`[M\xDALTIPLOS CAMPOS DE PREENCHIMENTO (${E.length} campos): emita uma a\xE7\xE3o val para CADA um dos ${E.length} campos abaixo com seu id exato]
`:"")+JSON.stringify(p.map(w=>({id:w.id,t:w.type,n:w.name||void 0,txt:w.label?w.label.length>160?w.label.slice(0,160)+"...":w.label:void 0,v:w.value||void 0,opt:w.options&&w.options.length?w.options.slice(0,20).map(I=>I.label||I.value):void 0})))})()}

[NAVEGA\xC7\xC3O]:
${f.length>0?f.map(b=>`"${b.label||b.id}"[${b.type}]`).join(","):"Nenhuma"}

[IMAGENS E GR\xC1FICOS ANEXADOS (${e.length})]:
${e.length===0?"Nenhum anexo visual.":e.map((b,y)=>{let v=b.associatedLabel||"Gr\xE1fico da Quest\xE3o",x=b.alt?` | alt: "${b.alt}"`:"";if(b.captureStatus==="text_only")return`  - Imagem ${y+1} [CONTEXTO_TEXTUAL]: ${v}${x} | ${b.textContext||"sem contexto adicional"}`;if(b.captureStatus==="captured"||b.base64){let q=b.textContext?` | Textos e r\xF3tulos do gr\xE1fico: "${b.textContext}"`:"";return`  - Imagem ${y+1} [VISUAL_INLINE]: ${v}${x}${q}`}return`  - Imagem ${y+1} [FALHOU]: ${v}${x}`}).join(`
`)}
[/DADOS]
Sa\xEDda em JSON v\xE1lido.`}var oo=new Set(["question","info","start","conclusion"]),ao=new Set(["texto_livre","escolha_unica","escolha_multipla","verdadeiro_falso","preenchimento","acao_sem_resposta","categorizacao","ordenacao","arrastar_soltar"]),no=new Set(["val","chk","sel","clk","adv","js","drag"]),io=150,Se=2e3;function Y(o,e=""){return o==null?e:typeof o=="string"?o.trim().slice(0,Se):typeof o=="number"||typeof o=="boolean"?String(o).trim().slice(0,Se):e}function so(o,e){if(!o||typeof o!="object")return null;let t=o,a=t.t;if(typeof a!="string"||!no.has(a))return null;if(a==="adv"){let i=t.id??t.target??t.name??t.selector;return{t:"adv",...Y(i)?{id:Y(i,"").slice(0,500)}:{}}}if(a==="drag"){let i=Y(t.from??t.source),d=Y(t.to??t.target??t.destination);return!i||!d?null:{t:"drag",from:i.slice(0,500),to:d.slice(0,500)}}if(a==="js"){let i=Y(t.v??t.code??t.script);return!i||i.length>8e3?null:{t:"js",v:i}}let r=t.id??t.target??t.name??t.selector??t.element;(r==null||r==="")&&a==="val"&&(r="1");let n=Y(r).slice(0,500);if(!n)return null;if(a==="val"){let i=t.v!==void 0?t.v:t.value!==void 0?t.value:t.val!==void 0?t.val:t.text!==void 0?t.text:t.answer;return{t:"val",id:n,v:Y(i).slice(0,Se)}}if(a==="sel"){let i=t.v!==void 0?t.v:t.value!==void 0?t.value:t.val!==void 0?t.val:t.values,l=(Array.isArray(i)?i:[i]).map(u=>Y(u).slice(0,500)).filter(Boolean);return{t:"sel",id:n,v:l}}if(a==="chk"){let i=t.c===!1||t.c==="false"||t.c===0||t.c==="0"||t.c==="off"||t.c==="unchecked"||t.c==="desmarcar",d={t:"chk",id:n,c:!i};return t.v!==void 0&&(d.v=Y(t.v).slice(0,Se)),d}let s={t:"clk",id:n};if(t.c!==void 0){let i=t.c===!1||t.c==="false"||t.c===0||t.c==="0"||t.c==="off"||t.c==="unchecked"||t.c==="desmarcar";s.c=!i}return t.v!==void 0&&(s.v=Y(t.v).slice(0,Se)),Array.isArray(t.co)&&t.co.length===2&&t.co.every(i=>typeof i=="number"&&Number.isFinite(i))&&(s.co=[t.co[0],t.co[1]]),s}function ro(o,e,t){if(t!=="question")return o;let a=o.filter(n=>n.t==="adv"),r=o.filter(n=>n.t!=="adv");if(e==="escolha_unica"){r=r.filter(s=>!(s.t==="chk"&&s.c===!1||s.t==="clk"&&s.c===!1));let n=r.filter(s=>s.t==="chk"||s.t==="clk");if(n.length>1){let s=r.filter(d=>d.t!=="chk"&&d.t!=="clk"),i=n[n.length-1];r=[...s,i]}}else if(e==="escolha_multipla"){r=r.filter(s=>!(s.t==="chk"&&s.c===!1||s.t==="clk"&&s.c===!1));let n=new Set;r=r.filter(s=>{let i="id"in s&&typeof s.id=="string"?s.id:"";return i?n.has(i)?!1:(n.add(i),!0):!0})}else if(e==="verdadeiro_falso"){let n=new Set,s=[...r].reverse(),i=[];for(let d of s){let l="id"in d&&typeof d.id=="string"?d.id:"";l?n.has(l)||(n.add(l),i.push(d)):i.push(d)}r=i.reverse()}return[...r,...a]}function kt(o){if(!o||typeof o!="object")return{pageType:"info",mode:"acao_sem_resposta",confidence:.5,rationale:"Resposta estruturada n\xE3o identificada; avan\xE7ando como informativo.",actions:[{t:"adv"}]};let e=o,t=e.pageType,a=e.mode;(typeof t!="string"||!oo.has(t))&&(t="question"),(typeof a!="string"||!ao.has(a))&&(a="escolha_unica");let r=Array.isArray(e.actions)?e.actions:[],n=[];for(let d=0;d<Math.min(r.length,io);d++){let l=so(r[d],d);l&&n.push(l)}n.some(d=>d.t==="val")&&(a==="escolha_unica"||!e.mode)&&(a="preenchimento"),n.some(d=>d.t==="drag")&&!["categorizacao","arrastar_soltar","ordenacao"].includes(a)&&(a="arrastar_soltar"),n=ro(n,a,t);let s=n.some(d=>d.t==="adv");t==="conclusion"?n.length=0:t==="info"||t==="start"?s||n.push({t:"adv"}):t==="question"&&!s&&n.push({t:"adv"});let i=typeof e.confidence=="number"&&Number.isFinite(e.confidence)?Math.min(1,Math.max(0,e.confidence)):.85;return{pageType:t,mode:a,confidence:i,rationale:Y(e.rationale,"Plano validado e auto-recuperado."),actions:n,...Y(e.memoryToStore)?{memoryToStore:Y(e.memoryToStore)}:{},...e.needsMoreContext?{needsMoreContext:!!e.needsMoreContext}:{}}}var _=class{keys=new Map;constructor(e=[]){this.init(e)}init(e){let t=new Map(this.keys);this.keys.clear();let a=e.flatMap(n=>n.split(/[\n\r]+/));Array.from(new Set(a.map(n=>n.trim().replace(/^["']|["']$/g,"")).filter(n=>n.length>5))).forEach((n,s)=>{let i=this.generateId(n),d=t.get(i)||t.get(n);this.keys.set(i,{id:i,key:n,label:d?.label||`Chave ${s+1}`,addedAt:d?.addedAt||Date.now(),lastUsedAt:d?.lastUsedAt,lastLatencyMs:d?.lastLatencyMs,cooldownUntil:d?.cooldownUntil,errorCount:d?.errorCount||0,lastError:d?.lastError,winCount:d?.winCount||0})})}generateId(e){let t=0;for(let r=0;r<e.length;r++)t=(t<<5)-t+e.charCodeAt(r),t|=0;let a=e.slice(-12).replace(/[^a-zA-Z0-9]/g,"").slice(0,6);return`key_${Math.abs(t).toString(36).slice(0,6)}${a}`}static maskKey(e){let t=e.trim().replace(/^["']|["']$/g,"");return t.length<=10?"\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022":`${t.slice(0,6)}...${t.slice(-4)}`}getAllKeys(){let e=Date.now();return Array.from(this.keys.values()).map(t=>{let a=Math.max(0,(t.cooldownUntil||0)-e);return{...t,isCooldown:a>0,remainingCooldownMs:a}})}getHealthyKeys(){let e=Date.now();return Array.from(this.keys.values()).filter(t=>(t.cooldownUntil||0)<=e&&(t.errorCount||0)<50)}getRoundRobinKeys(e=2){let t=Date.now(),a=Array.from(this.keys.values()).filter(n=>(n.errorCount||0)<50);if(a.length===0)return Array.from(this.keys.values()).slice(0,e);let r=a.filter(n=>(n.cooldownUntil||0)<=t);return r.length>0?(r.sort((n,s)=>{let i=n.lastLatencyMs!==void 0?n.lastLatencyMs:99999,d=s.lastLatencyMs!==void 0?s.lastLatencyMs:99999;if(i!==d)return i-d;let l=(n.lastUsedAt||0)-(s.lastUsedAt||0);return l!==0?l:n.addedAt-s.addedAt}),r.slice(0,e)):(a.sort((n,s)=>(n.cooldownUntil||0)-(s.cooldownUntil||0)),a.slice(0,e))}getBestKey(){return this.getRoundRobinKeys(1)[0]?.key||""}getDiverseKeys(e){return this.getRoundRobinKeys(e).map(t=>t.key)}markQuotaHit(e,t=8e3){let a=this.findKeyObj(e);a&&(a.cooldownUntil=Date.now()+t,a.lastError=`Cota tempor\xE1ria atingida (HTTP 429). Cooldown de ${Math.round(t/1e3)}s ativado.`)}markOverloaded(e,t=5e3){let a=this.findKeyObj(e);a&&(a.cooldownUntil=Date.now()+t,a.lastError=`Servidores sobrecarregados (HTTP 503). Cooldown de ${Math.round(t/1e3)}s ativado.`)}markSuccess(e,t){let a=this.findKeyObj(e);a&&(a.lastLatencyMs=t,a.lastUsedAt=Date.now(),a.errorCount=0,a.lastError=void 0,a.cooldownUntil=void 0)}markWinner(e){let t=this.findKeyObj(e);t&&(t.winCount=(t.winCount||0)+1)}markInvalid(e,t){let a=this.findKeyObj(e);a&&(a.errorCount=99,a.lastError=t)}addKey(e,t){let a=e.trim().replace(/^["']|["']$/g,"");if(!a)return{ok:!1,message:"Chave n\xE3o pode ser vazia."};if(a.length<15)return{ok:!1,message:"Chave de API inv\xE1lida ou muito curta."};let r=this.generateId(a);if(this.keys.has(r)||Array.from(this.keys.values()).some(i=>i.key===a))return{ok:!1,message:"Esta chave de API j\xE1 est\xE1 cadastrada."};let s={id:r,key:a,label:t?.trim()||`Chave ${this.keys.size+1}`,addedAt:Date.now(),errorCount:0};return this.keys.set(r,s),{ok:!0,message:"Chave adicionada com sucesso!",keyItem:s}}updateKey(e,t,a){let r=this.keys.get(e);if(!r)return{ok:!1,message:"Chave n\xE3o encontrada."};let n=t.trim().replace(/^["']|["']$/g,"");return!n||n.length<15?{ok:!1,message:"Chave de API inv\xE1lida."}:(r.key=n,a!==void 0&&(r.label=a.trim()),r.errorCount=0,r.cooldownUntil=void 0,r.lastError=void 0,{ok:!0,message:"Chave atualizada com sucesso!"})}removeKey(e){if(this.keys.size<=1)return{ok:!1,message:"Voc\xEA precisa manter pelo menos 1 chave de API cadastrada."};let t=this.findKeyObj(e);return t?(this.keys.delete(t.id),{ok:!0,message:"Chave removida com sucesso."}):{ok:!1,message:"Chave n\xE3o encontrada."}}exportRawKeys(){return Array.from(this.keys.values()).map(e=>e.key)}size(){return this.keys.size}findKeyObj(e){if(this.keys.has(e))return this.keys.get(e);for(let t of this.keys.values())if(t.key===e)return t}},z=new _;var xe=[{id:"gemini-3.8-flash",name:"Gemini 3.8 Flash (Mais Inteligente 2026)",description:"Modelo flagship Flash lan\xE7ado em Set/2026. Ultra-r\xE1pido e altamente capaz.",stable:!0},{id:"gemini-3.7-flash",name:"Gemini 3.7 Flash (Agentic)",description:"Alta capacidade para racioc\xEDnio multimodal e workflows ag\xEAnticos.",stable:!0},{id:"gemini-3.6-flash",name:"Gemini 3.6 Flash (Est\xE1vel)",description:"Modelo est\xE1vel e confi\xE1vel com excelente velocidade.",stable:!0},{id:"gemini-3.5-flash",name:"Gemini 3.5 Flash (R\xE1pido)",description:"Modelo de alta performance para tarefas r\xE1pidas.",stable:!0},{id:"gemini-3.5-flash-lite",name:"Gemini 3.5 Flash-Lite (Cota Alta 30 RPM)",description:"Modelo econ\xF4mico de ultra-alta velocidade e maior limite de RPM.",stable:!0},{id:"gemini-3.1-pro",name:"Gemini 3.1 Pro (Racioc\xEDnio Profundo)",description:"Modelo topo de linha para racioc\xEDnio complexo, exatas e matem\xE1tica.",stable:!0},{id:"gemini-2.5-flash",name:"Gemini 2.5 Flash (Ultra R\xE1pido)",description:"Modelo comprovado de baix\xEDssima lat\xEAncia e alta disponibilidade.",stable:!0},{id:"gemini-2.5-pro",name:"Gemini 2.5 Pro (Avan\xE7ado)",description:"Modelo avan\xE7ado para quest\xF5es de alta complexidade.",stable:!0}],It=["gemini-3.5-flash-lite","gemini-3.5-flash","gemini-3.6-flash","gemini-3.8-flash","gemini-2.5-flash"],lo={"gemini-2.0-flash":"gemini-3.5-flash","gemini-2.0-flash-lite":"gemini-3.5-flash-lite","gemini-1.5-flash":"gemini-3.5-flash","gemini-1.5-pro":"gemini-3.6-flash","gemini-1.0-pro":"gemini-2.5-flash"};function at(o){return lo[o]??o}function co(o,e){let a={temperature:0,maxOutputTokens:1350,responseMimeType:"application/json",responseSchema:e??uo};return/lite/i.test(o)||(/gemini-3\.[0-9]+-?flash/i.test(o)?a.thinkingConfig={thinkingBudget:0}:/gemini-2\.5-flash/i.test(o)&&(a.thinkingConfig={thinkingBudget:0})),a}var uo={type:"OBJECT",properties:{pageType:{type:"STRING",enum:["question","info","start","conclusion"]},mode:{type:"STRING",enum:["texto_livre","escolha_unica","escolha_multipla","verdadeiro_falso","preenchimento","acao_sem_resposta","categorizacao","ordenacao","arrastar_soltar"]},confidence:{type:"NUMBER"},rationale:{type:"STRING"},thinking:{type:"STRING"},memoryToStore:{type:"STRING"},imageDescriptions:{type:"ARRAY",items:{type:"OBJECT",properties:{index:{type:"NUMBER"},description:{type:"STRING"},relevant:{type:"BOOLEAN"},associatedLabel:{type:"STRING"}}}},actions:{type:"ARRAY",items:{type:"OBJECT",properties:{t:{type:"STRING",enum:["val","chk","sel","clk","adv","js","drag"]},id:{type:"STRING"},name:{type:"STRING"},label:{type:"STRING"},v:{type:"STRING"},c:{type:"BOOLEAN"},co:{type:"ARRAY",items:{type:"NUMBER"}},from:{type:"STRING"},to:{type:"STRING"}},required:["t"]}}},required:["pageType","mode","confidence","rationale","actions"]};function Ht(o){let e=o.trim().replace(/^google\//,"").replace(/^models\//,"");if(!e)return"gemini-3.5-flash-lite";let t=at(e);return W(t)?t:(console.warn(`[EasyQuiz] Modelo desconhecido ou inv\xE1lido: "${e}". Verifique se o modelo est\xE1 dispon\xEDvel no Google AI Studio.`),"gemini-3.5-flash-lite")}function ot(o,e){let t="";try{let a=JSON.parse(o);t=a.error?.message||a.message||""}catch{t=o.slice(0,160)}return/API_KEY_INVALID|API key not valid|key.*invalid|unregistered/i.test(t)?"Chave de API do Gemini inv\xE1lida ou n\xE3o autorizada no Google AI Studio.":/RESOURCE_EXHAUSTED|Quota exceeded|rate limit|quota/i.test(t)||e===429?`Cota do Gemini excedida (HTTP 429): ${t||"Aguarde"}`:e===404?`HTTP 404: ${t||"Modelo ou endpoint n\xE3o encontrado no Google AI Studio"}`:e===503||/overloaded/i.test(t)?`Servidores Google sobrecarregados (HTTP 503): ${t||"Aguardando"}`:t?`Erro Gemini (HTTP ${e}): ${t}`:`Falha na requisi\xE7\xE3o ao Gemini (HTTP ${e}).`}function po(o){let e=o.trim(),t=e.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);if(t)try{return JSON.parse(t[1].trim())}catch{}try{return JSON.parse(e)}catch{}let a=e.match(/\{[\s\S]*\}/);if(a)try{return JSON.parse(a[0].trim())}catch{}try{let r=e.indexOf("{");if(r!==-1){let n=e.slice(r).trim();n=n.replace(/,\s*\{[^}]*$/,""),n=n.replace(/,\s*$/,"");let s=0,i=0,d=!1,l=!1;for(let h=0;h<n.length;h++){let c=n[h];if(l){l=!1;continue}if(c==="\\"){l=!0;continue}if(c==='"'){d=!d;continue}d||(c==="{"?s++:c==="}"?s=Math.max(0,s-1):c==="["?i++:c==="]"&&(i=Math.max(0,i-1)))}for(d&&(n+='"');i>0;)n+="]",i--;for(;s>0;)n+="}",s--;let u=JSON.parse(n);if(u&&typeof u=="object")return u}}catch{}throw new Error("Falha ao decodificar JSON da IA.")}var Pt=(()=>{try{let o=typeof localStorage<"u"?localStorage.getItem("easyquiz_cached_models"):null;if(!o)return null;let e=JSON.parse(o);if(Array.isArray(e)){let t=e.filter(a=>a&&typeof a.id=="string"&&W(a.id));return t.length>0?t:null}return null}catch{return null}})(),tt=new Set;async function Ne(o){let e=o.trim().replace(/^["']|["']$/g,"");if(!e)return xe;let t=[`https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(e)}`,`https://generativelanguage.googleapis.com/v1/models?key=${encodeURIComponent(e)}`];for(let a of t)try{let r=await fetch(a,{headers:{"Content-Type":"application/json","x-goog-api-key":e}});if(!r.ok){let s=await r.text(),i=ot(s,r.status);if(i.includes("inv\xE1lida")||i.includes("n\xE3o autorizada"))throw new Error(i);continue}let n=await r.json();if(Array.isArray(n.models)&&n.models.length>0){let s=n.models.filter(i=>{let d=i.supportedGenerationMethods||[],l=(i.name||"").replace(/^models\//,""),u=d.includes("generateContent");return W(l)&&u}).map(i=>{let d=i.supportedGenerationMethods||[],l=i.name.replace(/^models\//,""),u=i.displayName||l;return{id:l,name:u.includes(l)?u:`${u} (${l})`,description:i.description||"",stable:!/-preview|-experimental|-latest/i.test(l),supportsVision:!/embedding|tts|transcribe|live|image|sound|voice/i.test(l),supportsStructuredOutput:d.includes("generateContent"),supportedGenerationMethods:d,discoveredAt:Date.now()}});if(s.length>0){s.sort((i,d)=>{let l=u=>u==="gemini-3.8-flash"?200:u==="gemini-3.7-flash"?190:u==="gemini-3.6-flash"?180:u==="gemini-3.5-flash"?170:u==="gemini-3.5-flash-lite"?160:u==="gemini-2.5-flash"?130:u.includes("flash")?80:u==="gemini-2.5-pro"?60:u.includes("pro")?50:10;return l(d.id)-l(i.id)}),Pt=s;try{typeof localStorage<"u"&&localStorage.setItem("easyquiz_cached_models",JSON.stringify(s))}catch{}return s}}}catch(r){if(r.message?.includes("Chave de API"))throw r}return xe}async function Re(o){let e=o.trim().replace(/^["']|["']$/g,"");if(!e)return{ok:!1,message:"Insira sua chave de API."};try{let a=await Ne(e);if(a.length>0&&a!==xe){let r=a[0];return{ok:!0,message:`Chave v\xE1lida! ${a.length} modelos Gemini dispon\xEDveis em sua conta. Recomendado: ${r.name}`,models:a}}}catch(a){return{ok:!1,message:a instanceof Error?a.message:String(a)}}let t=["gemini-3.8-flash","gemini-3.6-flash","gemini-3.5-flash"];for(let a of t)for(let r of["v1beta","v1"]){let n=`https://generativelanguage.googleapis.com/${r}/models/${a}:generateContent?key=${encodeURIComponent(e)}`;try{if((await fetch(n,{method:"POST",headers:{"Content-Type":"application/json","x-goog-api-key":e},body:JSON.stringify({contents:[{role:"user",parts:[{text:"PING"}]}],generationConfig:{maxOutputTokens:5}})})).ok)return{ok:!0,message:`Chave validada com sucesso no ${a} (${r})!`,models:xe}}catch{}}return{ok:!1,message:"Chave de API inv\xE1lida, sem cota ou sem permiss\xE3o para modelos Gemini."}}async function nt(o,e){let t=e.map(l=>l.trim().replace(/^["']|["']$/g,"")).filter(l=>l.length>5);if(t.length===0)return{ok:!1,model:o,key:"",message:"Nenhuma chave dispon\xEDvel."};let a=at(Ht(o)),r=JSON.stringify({contents:[{role:"user",parts:[{text:"PING"}]}],generationConfig:{maxOutputTokens:5}}),n={"Content-Type":"application/json"};async function s(l,u,h){let c=new AbortController,m=setTimeout(()=>c.abort(),h);try{let p=`https://generativelanguage.googleapis.com/v1beta/models/${u}:generateContent?key=${encodeURIComponent(l)}`,f=await fetch(p,{method:"POST",headers:{...n,"x-goog-api-key":l},body:r,signal:c.signal});if(clearTimeout(m),f.ok)return{ok:!0,model:u,key:l,message:`Modelo '${u}' validado com sucesso!`};let g=await f.text().catch(()=>"");throw new Error(`HTTP ${f.status}: ${g.slice(0,80)}`)}catch(p){throw clearTimeout(m),p}}if(t.length>=2){let l=t.slice(0,6);try{return await Promise.any(l.map(h=>s(h,a,8e3)))}catch{}}let i=t[0],d=[a,...It.filter(l=>l!==a)];for(let l of d)try{let u=await s(i,l,4e3);return l!==a&&(u.message=`Modelo preferido indispon\xEDvel. Validado via fallback '${l}'.`),u}catch{}return{ok:!1,model:a,key:i,message:"Nenhum modelo Gemini respondeu. Verifique sua chave e cota."}}async function mo(o,e,t,a,r){let n=["v1beta","v1"],s=new Error(`Falha ao consultar modelo ${o}`),d={...co(o,r)};for(let l of n){if(a.aborted)throw new Error("Opera\xE7\xE3o cancelada pelo usu\xE1rio.");let u=`https://generativelanguage.googleapis.com/${l}/models/${o}:generateContent?key=${encodeURIComponent(e)}`,h=Date.now();try{let c=await fetch(u,{method:"POST",headers:{"Content-Type":"application/json","x-goog-api-key":e},body:JSON.stringify({...t,generationConfig:d}),signal:a});if(!c.ok){let f=await c.text();if(c.status===400){let A=/thinking/i.test(f),b=/response_schema|responseSchema|Repeated map key|PROTO payload/i.test(f);if((A||b)&&(d.thinkingConfig||d.responseSchema)){let y={...d};A&&delete y.thinkingConfig,b&&(delete y.responseSchema,delete y.responseMimeType),d=y;let v=await fetch(u,{method:"POST",headers:{"Content-Type":"application/json","x-goog-api-key":e},body:JSON.stringify({...t,generationConfig:d}),signal:a});if(v.ok){let T=await v.json(),M=T.candidates?.[0];if(M?.content?.parts?.[0]?.text)return z.markSuccess(e,Date.now()-h),{rawText:M.content.parts[0].text,data:T,usedModel:o,usedKey:e}}let x=await v?.text?.().catch(()=>"")??f,q=ot(x,c.status);throw new Error(`[${o}|${_.maskKey(e)}] ${q}`)}}let g=ot(f,c.status);if(c.status===404&&l==="v1beta")continue;throw c.status===429?(z.markQuotaHit(e,8e3),zt(e,o,1e4),new Error(`[${o}|${_.maskKey(e)}] ${g}`)):(c.status===503||/no capacity|overloaded|unavailable/i.test(f)?(z.markOverloaded(e,5e3),tt.add(o)):c.status===403||/API_KEY_INVALID/i.test(f)?z.markInvalid(e,g):c.status===404&&tt.add(o),new Error(`[${o}|${_.maskKey(e)}] ${g}`))}let m=await c.json(),p=m.candidates?.[0];if(!p||!p.content?.parts?.[0]?.text)throw new Error(`[${o}|${_.maskKey(e)}] A IA n\xE3o retornou uma resposta estruturada v\xE1lida.`);return z.markSuccess(e,Date.now()-h),{rawText:p.content.parts[0].text,data:m,usedModel:o,usedKey:e}}catch(c){if(a.aborted)throw c;s=c;let m=s.message||"";if(m.includes("404")||/no longer available/i.test(m)){tt.add(o);break}if(m.includes("429")||m.includes("Quota"))break}}throw s}var De=new Map;function Mt(o,e){let t=`${o}::${e}`,a=De.get(t);return a===void 0?!1:Date.now()>a?(De.delete(t),!1):!0}function zt(o,e,t=1e4){De.set(`${o}::${e}`,Date.now()+t)}function Ot(){De.clear()}async function Be(o,e,t,a,r,n){if(r?.aborted)throw new Error("Opera\xE7\xE3o cancelada pelo usu\xE1rio.");let s=Array.isArray(t.apiKeys)&&t.apiKeys.length>0?t.apiKeys:t.apiKey?[t.apiKey]:[];z.init(s);let i=t.apiKey.trim().replace(/^["']|["']$/g,""),d=z.getBestKey()||i;if(!d)throw new Error("Nenhuma chave de API do Gemini configurada ou dispon\xEDvel.");let l=Ht(t.model);if(!Pt&&d&&Ne(d).catch(()=>{}),r?.aborted)throw new Error("Opera\xE7\xE3o cancelada pelo usu\xE1rio.");let u=Date.now(),h=Te(o,e,t),c=[{text:h}];for(let S=0;S<e.length;S++){let w=e[S],I=w.associatedLabel||(w.alt?`Imagem: ${w.alt}`:`Imagem ${S+1}`);if(w.captureStatus==="text_only"||!w.base64){let O=w.textContext||w.alt||"";c.push({text:`[CONTEXTO_IMAGEM_${S+1} - V\xCDNCULO: ${I}]: ${O}`})}else c.push({text:`[ANEXO VISUAL ${S+1} - V\xCDNCULO: ${I}]:`}),c.push({inline_data:{mime_type:w.mediaType,data:w.base64}})}let m={system_instruction:{parts:[{text:n?.systemPromptOverride??Lt}]},contents:[{role:"user",parts:c}]},p=at(l),f=It.filter(S=>S!==p),A=z.getAllKeys().length,b=S=>A<=1||S===0?1:2,y=new Set,v=(S,w)=>{let I=/pro/i.test(S),O=/lite/i.test(S);return I?w===0?18e3:w===1?24e3:3e4:O?w===0?1e4:w===1?14e3:18e3:w===0?16e3:w===1?2e4:25e3},x=async(S,w)=>{if(w.length===0||r?.aborted)return null;let I=w.map(()=>new AbortController),O=()=>I.forEach(N=>{try{N.abort()}catch{}});r?.addEventListener("abort",O,{once:!0});let B=w.map(N=>`${N.model.replace("gemini-","")}/${N.label}`).join(" | ");a?.(`\u26A1 ${S}: ${w.length} slot(s) [${B}]...`,"info");try{let N=w.map(async(U,J)=>{let V=I[J],ae=setTimeout(()=>{try{V.abort(new Error(`Timeout ${U.timeout/1e3}s (${U.model}|${U.label})`))}catch{V.abort()}},U.timeout);try{let F=await mo(U.model,U.key,m,V.signal,n?.generationSchemaOverride);clearTimeout(ae);let $=kt(po(F.rawText));return $.usedModel=F.usedModel,$.durationMs=Date.now()-u,$.promptSent=h,$.tokensUsed=F.data.usageMetadata?.totalTokenCount,$.promptTokens=F.data.usageMetadata?.promptTokenCount,$.candidatesTokens=F.data.usageMetadata?.candidatesTokenCount,$.rawResponse=F.rawText,I.forEach((xt,$t)=>{if($t!==J)try{xt.abort(new Error("Cancelado: vencedor respondeu."))}catch{xt.abort()}}),{plan:$,rawUsage:F.data.usageMetadata,usedModel:F.usedModel,usedKey:F.usedKey,slotLabel:U.label}}catch(F){clearTimeout(ae);let $=F instanceof Error?F.message:String(F);throw($.includes("429")||$.includes("Quota")||$.includes("RESOURCE_EXHAUSTED"))&&(zt(U.key,U.model,1e4),z.markQuotaHit(U.key,8e3)),F}}),X=await Promise.any(N);return r?.removeEventListener("abort",O),z.markWinner(X.usedKey),X}catch(N){return r?.removeEventListener("abort",O),N instanceof AggregateError&&N.errors.length>0?E=N.errors.map(X=>X instanceof Error?X.message:String(X)).join(" | "):N instanceof Error&&(E=N.message),console.warn(`[EasyQuiz ${S}] Falha na onda:`,E),null}},T=(A<=1?1:1+Math.ceil((A-1)/2))+4,M=0,E="",L=0;for(;M<T;){if(r?.aborted)throw new Error("Opera\xE7\xE3o cancelada pelo usu\xE1rio.");let S=z.getRoundRobinKeys(A),w=S.filter(V=>!y.has(`${V.key}::${p}`)&&!Mt(V.key,p)),I,O;if(w.length>0)I=p,O=w;else{let V=f;I=V[L%V.length]||p,L++;let ae=S.filter(F=>!y.has(`${F.key}::${I}`)&&!Mt(F.key,I));O=ae.length>0?ae:S.filter(F=>!y.has(`${F.key}::${I}`))}if(O.length===0){if(L<f.length)continue;break}let B=O.slice(0,b(M));if(B.length===0)break;let N=v(I,M),X=B.map(V=>(y.add(`${V.key}::${I}`),{model:I,key:V.key,label:V.label||"Chave",timeout:N})),U=M===0?"Onda 1":`Onda ${M+1}`,J=await x(U,X);if(J){let V=J.plan.durationMs||Date.now()-u,ae=_.maskKey(J.usedKey);return a?.(`\u2705 ${V}ms via '${J.usedModel}' (${J.slotLabel}: ${ae})`,"info"),J}M++}throw new Error(E||"Todas as tentativas falharam. Verifique suas chaves de API e cotas.")}var fo=[/\bfetch\b/i,/\bXMLHttpRequest\b/i,/\bWebSocket\b/i,/\b(?:localStorage|sessionStorage|indexedDB)\b/i,/\b(?:eval|Function|AsyncFunction|GeneratorFunction)\b/i,/\bimport(?:Scripts)?\b/i,/\bnavigator\s*\.\s*credentials\b/i,/\b(?:cookie|location\s*=|history\s*\.)/i,/\bwindow\s*\[\s*['"](?:fetch|eval|Function|localStorage|sessionStorage)/i];function be(o){let e=o?.engine||"smart",t=new Set(["dom","framework","keyboard","drag"]);return o?.autoAdvance&&t.add("navigation"),e==="javascript"&&t.add("javascript"),{engine:e,capabilities:t,maxAttemptsPerAction:e==="command"?1:2,maxActionMs:e==="command"?1500:3e3,allowJavaScript:e==="javascript",allowNavigation:!!o?.autoAdvance}}function it(o,e){if(o.t==="js"&&!e.allowJavaScript)throw new Error("A\xE7\xE3o JavaScript bloqueada pela engine atual. Use o motor JavaScript explicitamente.");if(o.t==="adv"&&!e.allowNavigation)throw new Error("Avan\xE7o autom\xE1tico bloqueado pela pol\xEDtica atual.")}function Dt(o){if(!o.trim())throw new Error("JavaScript recusado: c\xF3digo vazio.");if(o.length>8e3)throw new Error("JavaScript recusado: c\xF3digo acima do limite operacional.");if(fo.find(t=>t.test(o)))throw new Error("JavaScript recusado: acesso externo, persist\xEAncia ou avalia\xE7\xE3o din\xE2mica n\xE3o permitidos.");if(!/^\s*(?:\/\/[^\n]*\n|\/\*[\s\S]*?\*\/|[\s\S])*\$eq\./.test(o)&&!o.includes("$eq."))throw new Error("JavaScript recusado: use somente a API declarativa $eq.")}var Ee=['input:not([type="hidden"])',"textarea","select","button","a","label",'[role="button"]','[role="link"]','[role="radio"]','[role="checkbox"]','[role="option"]','[role="treeitem"]','[role="menuitemcheckbox"]','[role="menuitemradio"]','[contenteditable="true"]','[draggable="true"]',"[aria-grabbed]","[aria-dropeffect]","[data-widget-type]",".perseus-drag-item",".sortable-item",'[data-testid*="drag" i]','[data-testid*="card" i]','[data-testid*="option" i]','[data-testid*="choice" i]','[data-testid*="category" i]',"[data-choice]","[data-option]","[data-answer]","[data-value]",".quiz-option",".option-card",".choice-card",'[class*="option-card" i]','[class*="choice-card" i]','[class*="option-item" i]','[class*="choice-item" i]','[class*="answer-item" i]','[class*="alternative" i]','li[class*="choice" i]','li[class*="option" i]','li[class*="answer" i]','[data-role="dropzone"]',"[data-category]","[data-item-id]","[data-params][jsmodel]",'[class*="draggable-item" i]','[class*="drag-item" i]','[class*="sortable-card" i]','[class*="card-option" i]','[class*="tile" i][class*="option" i]'].join(","),ke=/(verificar|checar|check|conferir|validar|próxim[oa]|next|continuar|continue|avançar|prosseguir|enviar|submit|concluir|finalizar|terminar|começar|iniciar|start|vamos lá|próxima tarefa|next task|próxima pergunta|next question|marcar como concluíd[oa]|mostrar resumo|entendi|compreendi|ok|leitura concluída|seguir|ir para o exercício|fazer o teste|próximo artigo|ir para a aula)/i,re=/(\banterior\b|\bvoltar\b|\bback\b|\bprev\b|\bprevious\b|recomeçar|\brestart\b|\breplay\b|\bretornar\b)/i,ho=0;function st(o){try{let e=o.closest('[hidden], [style*="display: none"], [style*="display:none"], [aria-hidden="true"]');if(e&&!de(e))return!1}catch{}try{let e=window.getComputedStyle?window.getComputedStyle(o):o.style;if(e&&(e.display==="none"||e.visibility==="hidden"))return!1}catch{}try{if(typeof o.getBoundingClientRect=="function"){let e=o.getBoundingClientRect();if(e.width>0||e.height>0)return!0}}catch{}return(o.textContent||"").trim().length>0}function Q(o){try{if(typeof CSS<"u"&&typeof CSS.escape=="function")return CSS.escape(o)}catch{}return String(o).replace(/["\\]/g,"\\$&")}function H(o){let e=o;if(!e||typeof e.isConnected=="boolean"&&!e.isConnected||de(e))return!1;let t=e.tagName?.toLowerCase();if(["input","select","textarea","button"].includes(t)){let a=e.type?.toLowerCase();if(a==="checkbox"||a==="radio"){if(e.id)try{let n=e.ownerDocument?.querySelector(`label[for="${Q(e.id)}"]`);if(n&&st(n))return!0}catch{}let r=e.closest('label, .option-card, .quiz-option, .choice, .answer, [role="radio"], [role="checkbox"], [class*="option" i], [class*="choice" i], [class*="item" i], li, tr');if(r&&r!==e&&st(r))return!0}try{if(!e.closest('[hidden], [style*="display: none"], [style*="display:none"], [aria-hidden="true"]')){let n=window.getComputedStyle?window.getComputedStyle(e):e.style;if(!n||n.display!=="none"&&n.visibility!=="hidden"){if(typeof e.getBoundingClientRect=="function"){let s=e.getBoundingClientRect();if(s.width>0||s.height>0)return!0}return!0}}}catch{}}return st(e)}function go(o){if(o==null)return"";if(typeof o=="string")return o;if(typeof o=="number"||typeof o=="boolean")return String(o);if(o instanceof Node)return o.textContent||"";try{if(typeof o?.toString=="function"){let e=o.toString();if(typeof e=="string")return e}}catch{}return""}function R(o,e=500){return go(o).replace(/\s+/g," ").trim().slice(0,e)}function Ao(o){let e=o.dataset.easyquizId;if(e)return e;let t=`eq-${Date.now().toString(36)}-${(ho+=1).toString(36)}`;return o.dataset.easyquizId=t,t}function de(o){return o?!!(o.closest('#easyquiz-shadow-root, .eq-sidebar, .eq-launcher, [data-easyquiz-ignore="true"], .btn-inject-eq, #btn-inject-script')||o.getAttribute?.("data-easyquiz-ignore")==="true"):!1}var Le=/(leaderboard|scoreboard|placar|ranking|trophy|pause|pausar|mute|mutar|audio|sound|som|música|music|configuraç|settings|theme|ajuda|help|report|denunciar|feedback|power-?up|streak|coins|fullscreen|full-screen|read-?aloud|audio-?player|(?:audio|sound|som|media)[-_ ]*volume|volume[-_ ]*(?:slider|control|level|btn|button|icon|mute)|vol-slider)/i;function j(o){if(!o||typeof o.getAttribute!="function"||typeof Element<"u"&&!(o instanceof Element))return!1;if(de(o))return!0;let e=o.tagName?.toLowerCase();if(["select","textarea"].includes(e)||e==="input"&&!["button","submit","reset"].includes((o.type||"").toLowerCase()))return!1;let a=o.closest?.('button, a, [role="button"], [class*="leaderboard" i], [data-testid*="leaderboard" i], [class*="scoreboard" i], [class*="trophy" i]')||o,r=String(a.getAttribute?.("data-testid")||a.getAttribute?.("data-test-id")||a.getAttribute?.("id")||""),n=String(a.getAttribute?.("aria-label")||""),s=String(a.getAttribute?.("title")||""),i=typeof a.className=="string"?a.className:typeof a.className?.baseVal=="string"?a.className.baseVal:"",d=R(a.textContent,60);return!!(Le.test(r)||Le.test(n)||Le.test(s)||Le.test(i)||d.length>0&&d.length<=25&&Le.test(d))}function Z(o){if(!o||typeof o.getAttribute!="function"||typeof Element<"u"&&!(o instanceof Element)||de(o)||j(o)||o.closest?.('.option-card, .choice-card, .quiz-option, [class*="option-card" i], [class*="choice-card" i], [class*="option-item" i], [class*="choice-item" i], [class*="answer-item" i], [data-testid*="option" i], [data-testid*="choice" i], [data-choice], [data-option], [data-answer], [role="radio"], [role="checkbox"], [role="option"]')||o.closest?.("header, nav, aside"))return!1;let e=typeof HTMLInputElement<"u"&&o instanceof HTMLInputElement||typeof HTMLButtonElement<"u"&&o instanceof HTMLButtonElement?o.value:"",t=R(o.getAttribute?.("aria-label")||o.textContent||o.getAttribute?.("value")||e),a=o.type,r=t.replace(/[\d\(\)\[\]\u2192>\u2022\-\/\\]+/g," ").trim(),n=String(o.getAttribute?.("data-testid")||o.getAttribute?.("data-test-id")||o.getAttribute?.("id")||o.getAttribute?.("href")||"").toLowerCase();return re.test(r)||re.test(t)?!1:ke.test(r)||ke.test(t)||n.includes("next")||n.includes("check")||n.includes("continue")||n.includes("proximo")||n.includes("forward")?!0:/^\d{1,3}$/.test(t.trim())?!!o.closest?.('[class*="pagination" i], [class*="pager" i], [class*="page-nav" i], [class*="step-indicator" i], [class*="breadcrumb" i], [aria-label*="p\xE1gina" i], [aria-label*="page" i], [role="navigation"], nav, [class*="steps" i]'):!1}function rt(o){let e=o.closest("tr");if(e){let d=e.querySelector("th, td:first-child"),l=d&&d!==o.closest("td")?R(d.textContent,100):"",u=R(o.closest("label, td")?.textContent||"",50);if(l&&u)return`${l}: ${u}`}let t=o.closest('.dropdown-row, [class*="dropdown-row" i], [class*="select-row" i]');if(t){let d=t.querySelector('.dropdown-label, [class*="label" i]'),l=d&&d!==o?R(d.textContent,150):"";if(l)return l}let a=o.getAttribute("aria-label");if(a)return R(a);let r=o.getAttribute("aria-labelledby");if(r){let d=r.split(/\s+/).map(l=>document.getElementById(l)?.textContent).filter(Boolean).join(" ");if(d.trim())return R(d)}if("labels"in o&&o.labels){let d=Array.from(o.labels??[]).map(l=>l.textContent).join(" ");if(d.trim())return R(d)}let n=o.closest('.docssharedWizToggleLabeledContainer, [role="listitem"], .answer, label, .quiz-option, .form-check, .option-card');if(n&&n!==o){let d=R(n.textContent);if(d)return d}let s=o instanceof HTMLInputElement||o instanceof HTMLButtonElement?o.value:"",i=o.getAttribute("placeholder")||o.getAttribute("title")||o.textContent||s||"";return R(i)}function lt(o,e){let a=typeof HTMLSelectElement<"u"&&o instanceof HTMLSelectElement||o.tagName.toLowerCase()==="select"?o:null,r=o;o.dataset.easyquizRole=e;let n=o.tagName.toLowerCase(),s=["input","textarea","select","button"].includes(n)?n:"other",i=o.getAttribute("role")||"",d=(o.getAttribute("data-testid")||o.getAttribute("data-test-id")||"").toLowerCase(),l=(o.className&&typeof o.className=="string"?o.className:"").toLowerCase(),u=o.getAttribute("draggable")==="true"||o.classList.contains("perseus-drag-item")||o.classList.contains("sortable-item")||l.includes("cursor-grab")||!!o.getAttribute("aria-grabbed")||/drag|card|option|item/i.test(d)||/drag|card-item|sortable/i.test(l),h=o.getAttribute("data-role")==="dropzone"||o.classList.contains("category-container")||o.hasAttribute("data-category")||!!o.getAttribute("aria-dropeffect")||/drop|category|bucket/i.test(d)||/dropzone|category-box|bucket|target-zone/i.test(l),m=R((u?"draggable":h?"dropzone":"")||r.type||i||s,40),p="";if(r.type==="checkbox"||r.type==="radio"||i==="radio"||i==="checkbox"){let v=r.checked||o.getAttribute("aria-checked")==="true",x=r.value&&r.value!=="on"?r.value:o.getAttribute("data-value")||"";p=v?x?`checked:${x}`:"checked":x||"unchecked"}else if(s==="button"||n==="a"||e==="navigation"||Z(o))p="";else{let v=typeof o.value=="string"||typeof o.value=="number"?o.value:"";p=R(v||o.getAttribute("data-category")||"",2e3)}let f=[];if(a&&a.options)for(let v of Array.from(a.options).slice(0,80))f.push({value:R(v.value),label:R(v.textContent)});else if(i==="combobox"||i==="listbox"||l.includes("select")||l.includes("dropdown")){let v=o.getAttribute("aria-controls")||o.getAttribute("aria-owns"),x=v?document.getElementById(v):o;if(x){let q=x.querySelectorAll('[role="option"], li, .dropdown-item, .option');for(let T of Array.from(q).slice(0,80)){let M=R(T.textContent);M&&f.push({value:T.getAttribute("data-value")||T.getAttribute("value")||M,label:M})}}}let g=!!(r.required||o.getAttribute("aria-required")==="true"),A=!!(r.disabled||o.getAttribute("aria-disabled")==="true"),b=Ao(o);return{id:o.id||b,tag:s,type:m,label:rt(o),name:R(r.name||o.getAttribute("name")||"",180),value:p,options:f,required:g,disabled:A,role:e}}var Nt=['[data-test-id*="exercise" i]','[data-testid*="exercise" i]',".perseus-renderer",".framework-perseus",".Qr7Oae","[data-item-id]",".freebirdFormviewerViewItemsItemItem",".que",".question-holder",".quiz-question",".question_holder",".display_question",'[data-functional-selector*="question"]',".question-container",'[class*="classification-layout" i]','[class*="quiz-container" i]','[data-cy="quiz-container"]',"[data-question-id]",'[data-testid*="question" i]','[class*="question-container" i]','[class*="question" i]','[class*="pergunta" i]','[class*="categoriz" i]',"article","form","section","main"].join(",");function Rt(o){if(!H(o))return-1/0;let e=o.getBoundingClientRect(),t=Array.from(o.querySelectorAll(Ee)).filter(H),a=R(o.innerText||o.textContent||"",4e3).length;if(a<10||!t.length&&a<60)return-1/0;let r=Math.max(1,window.innerWidth*window.innerHeight),n=Math.max(1,e.width*e.height),s=Math.min(1,n/r),i=e.top+e.height/2,d=Math.abs(i-window.innerHeight/2)/Math.max(1,window.innerHeight),l=a>40?35:0,u=e.top>=0&&e.bottom<=window.innerHeight?25:0;return t.length*15+Math.min(60,a/20)+l+u-s*20-d*10}function Qe(o){let e=o;if(e.matches?.('article, [data-test-id*="exercise" i], [data-testid*="exercise" i], .perseus-renderer, .framework-perseus, [class*="question-container" i], .que')&&e.tagName.toLowerCase()!=="main"&&e.tagName.toLowerCase()!=="body")return e;for(;e.parentElement&&e.parentElement!==document.body&&e.parentElement!==document.documentElement;){let t=e.parentElement,a=t.tagName.toLowerCase();if(["header","footer","nav","aside"].includes(a))break;if(t.matches?.('article, [data-test-id*="exercise" i], [data-testid*="exercise" i], .perseus-renderer, .framework-perseus, [class*="question-container" i], .que')&&a!=="main"&&a!=="body"){e=t;break}let r=R(e.innerText||e.textContent||"",1e4),n=R(t.innerText||t.textContent||"",1e4),s=e.querySelectorAll(Ee).length,i=t.querySelectorAll(Ee).length;if(r.length<150&&n.length>r.length&&i<=s+4&&a!=="main"&&a!=="body"){e=t;continue}break}return e}function Bt(o){let e=o,t=e.closest('main, [role="main"], article, form, [data-test-id*="exercise" i], [data-testid*="exercise" i], .framework-perseus, section');if(t&&t!==document.body&&H(t))return t;let a=0;for(;e.parentElement&&e.parentElement!==document.body&&a<3;)e=e.parentElement,a++;return e||document.body}function G(){let o=document.querySelector('[class*="classification-layout" i], [class*="quiz-container" i][class*="classification" i]');if(o&&H(o))return o;let e=document.activeElement;if(e&&e!==document.body){let s=e.closest(Nt);if(s&&Rt(s)>0)return Qe(s)}let a=Array.from(document.querySelectorAll(Nt)).map(s=>({element:s,score:Rt(s)})).filter(s=>Number.isFinite(s.score)).sort((s,i)=>i.score-s.score),r=a.find(s=>{let i=s.element.tagName.toLowerCase();return i!=="main"&&i!=="body"&&s.score>0});if(r)return Qe(r.element);if(a.length>0&&a[0].score>0)return Qe(a[0].element);let n=document.querySelector('form, main, [role="main"]');return n&&H(n)?n:document.body}function Qt(o){let e=o.cloneNode(!0);e.querySelectorAll("script, style, iframe, object, embed, svg, canvas, noscript, audio, video").forEach(a=>a.remove());let t=["type","name","value","role","aria-label","aria-labelledby","aria-checked","aria-required","required","disabled","data-easyquiz-id","draggable","class","id","data-widget-type","data-role","data-category","data-testid"];return e.querySelectorAll("*").forEach(a=>{for(let r of Array.from(a.attributes))t.includes(r.name)||a.removeAttribute(r.name)}),e.outerHTML.replace(/\s+/g," ").slice(0,2e4)}function je(o){let e=Array.from(o.querySelectorAll(Ee)),t=new Set,a=[];for(let l of e){if(!H(l)||Z(l)||j(l))continue;let u=(l.value||l.textContent||"").trim();if(re.test(u))continue;let h=l.tagName.toLowerCase();["input","textarea","select"].includes(h)&&(t.add(l),a.push(l))}for(let l of e){if(!H(l)||Z(l)||j(l))continue;let u=(l.value||l.textContent||"").trim();if(re.test(u))continue;let h=l.tagName.toLowerCase();if(["input","textarea","select"].includes(h))continue;let c=l.querySelector("input, textarea, select");if(!(c&&t.has(c))){if(l.hasAttribute("for")){let m=l.getAttribute("for"),p=m?l.ownerDocument.getElementById(m):null;if(p&&t.has(p))continue}if(h==="a"){let m=l.getAttribute("role"),p=l.getAttribute("class")||"",f=l.getAttribute("data-testid")||"",g=l.getAttribute("draggable")==="true"||l.classList.contains("perseus-drag-item")||l.classList.contains("sortable-item")||p.includes("cursor-grab")||!!l.getAttribute("aria-grabbed")||/drag|card|option|item/i.test(f)||/drag|card-item|sortable/i.test(p);if(!(m==="button"||m==="radio"||m==="checkbox"||m==="option"||g||l.closest('[class*="choice" i], [class*="option" i], [class*="answer" i], [data-testid*="option" i]')))continue}a.push(l)}}let r=a.length>0&&a.every(l=>j(l)||/read-?aloud|audio/i.test(l.getAttribute("data-testid")||l.getAttribute("aria-label")||"")),n=document.body.querySelector('[class*="classification-layout" i]')||document.body.querySelector('[class*="classification" i]')||o,s=document.body.querySelector('[class*="classification" i]')!==null||o.querySelector('[class*="classification" i]')!==null||o.querySelector('[data-cy*="quiz" i]')!==null||o.querySelector('[class*="draggable-item" i]')!==null||o.querySelector('[class*="drag-item" i]')!==null||o.querySelector('[class*="sortable-card" i]')!==null||o.matches?.('[class*="classification" i]');if((a.length===0||r)&&s){r&&(a.length=0);let l=Array.from(n.querySelectorAll('[class*="cursor-grab"][id], [draggable="true"][id], .dnd-card[id]'));if(l.length>0){for(let u of l)if(!(!H(u)||j(u))&&(a.push(u),a.length>=50))break}else{let u=Array.from(n.querySelectorAll("button, div[class], span[class], p, li"));for(let h of u){if(!H(h)||Z(h)||j(h)||re.test((h.textContent||"").trim()))continue;let c=(h.textContent||"").trim();if(c.length<2||c.length>300)continue;if(Array.from(h.children).some(p=>p.className&&p.textContent?.trim())||a.push(h),a.length>=50)break}}}let d=!a.some(l=>["input","select","textarea"].includes(l.tagName.toLowerCase()))&&a.length>0&&a.every(l=>{let u=l.tagName.toLowerCase();if(["input","select","textarea","button"].includes(u))return!1;let h=(l.textContent||"").trim();return!l.id||h.length<10||/^\d+\s*\/\s*\d+$/.test(h)||/^question text/i.test(h)});if(a.length===0||d){d&&(a.length=0);let l=Array.from(document.body.querySelectorAll('[class*="cursor-pointer"][id]'));if(l.length>0)for(let u of l){if(!H(u)||de(u)||Z(u)||j(u)||re.test((u.textContent||"").trim()))continue;let h=(u.textContent||"").trim();if(!(h.length<10||h.length>500)&&!/^\d+\s*\/\s*\d+$/.test(h)&&(a.push(u),a.length>=20))break}}return a.slice(0,100).map(l=>lt(l,"answer"))}function ct(o){let e=[o,o.parentElement,o.parentElement?.parentElement,document.body].filter(Boolean),t=new Set,a=[];for(let r of e)for(let n of Array.from(r.querySelectorAll(Ee)))if(!(t.has(n)||!H(n)||!Z(n)||j(n))&&(t.add(n),a.push(lt(n,"navigation")),a.length>=10))return a;return a}function ue(o=!1){let e=G();e=Qe(e),o&&(e=Bt(e));let t=je(e),a=ct(e);if(t.length===0){let i=je(document.body);i.length>0&&(e=Bt(e),t=je(e),t.length===0&&(t=i,e=document.querySelector('main, article, form, [role="main"]')||document.body))}a.length===0&&(a=ct(document.body));let r=e.innerText&&e.innerText.trim().length>0?e.innerText:e.textContent||"",n=r.length>4e4?R(r.slice(0,8e3),8e3)+`
[...conte\xFAdo extenso truncado...]
`+R(r.slice(-2e3),2e3):R(r,16e3),s=[...t,...a].slice(0,120);return!n||s.length===0&&n.length<30?R(document.body.innerText||document.body.textContent||"",16e3).length>=30?le():null:{sourceUrl:window.location.href.slice(0,2e3),pageTitle:document.title.slice(0,500)||"P\xE1gina de Quest\xE3o",questionText:n,htmlSnippet:Qt(e),controls:s,scope:e}}function le(){let o=document.body.innerText||document.body.textContent||document.documentElement.textContent||"",e=R(o,16e3),t=je(document.body),a=ct(document.body),r=[...t,...a].slice(0,120),n=document.querySelector('main, article, form, [role="main"], [data-test-id*="content" i], [class*="content" i]')||document.body;return{sourceUrl:window.location.href.slice(0,2e3),pageTitle:document.title.slice(0,500)||"P\xE1gina de Quest\xE3o",questionText:e,htmlSnippet:Qt(n).slice(0,15e3),controls:r,scope:n}}function dt(o){let e=o.controls.map(t=>{let a=t.options?t.options.length:0;return`${t.role}:${t.id}:${t.type}:${a}`}).join("|");return[window.location.href,o.pageTitle,o.questionText.slice(0,400),e].join("::")}function Ve(o){if(!o)return!1;let e=o.toLowerCase();return["?","quest\xE3o","questao","pergunta","exerc\xEDcio","exercicio","assinale","calcule","determine","qual \xE9","qual o","quais","indique","selecione","escolha","responda","julgue","verdadeiro ou falso","complete","resolva","encontre","alternativa","correta","incorreta","m\xB3","cm\xB2","volume","probabilidade","matriz","valor de","resultado de","considere","dada a","sabendo que","quanto vale","obtenha"].some(a=>e.includes(a))}function D(o){return o?!!(o.closest('#easyquiz-shadow-root, .eq-sidebar, .eq-launcher, [data-easyquiz-ignore="true"], .btn-inject-eq, #btn-inject-script')||o.getAttribute?.("data-easyquiz-ignore")==="true"):!1}function C(o){return o==null?"":(typeof o=="string"?o:String(o)).replace(/^(\([0-9a-zA-Z]{1,2}\)|[0-9]{1,3}|[a-zA-Z])[\.\)\-\:]\s+/,"").replace(/[\.\u2026]{2,}/g," ").replace(/['"“”«»]/g,"").replace(/\s+/g," ").trim()}function K(o){if(!o||o instanceof HTMLInputElement||o instanceof HTMLSelectElement||o instanceof HTMLTextAreaElement||o.getAttribute("draggable")==="true"||o.classList.contains("dnd-card")||o.hasAttribute("data-category")||o.hasAttribute("data-dropzone"))return o;if(o.hasAttribute("for")){let a=o.getAttribute("for");if(a){let r=o.ownerDocument.getElementById(a);if(r)return r}}let e=o.closest('label, .option-card, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, td, li, .dnd-card, [class*="option-card" i], [class*="choice-card" i], .dropdown-row, [class*="dropdown" i], [class*="select-row" i]');if(e&&!["article","section","main","form","body"].includes(e.tagName.toLowerCase())){let a=e.getAttribute("for"),n=(a?e.ownerDocument.getElementById(a):null)||e.querySelector('input:not([type="hidden"]), select, textarea');return n||e}let t=o.closest('button, a, [role="button"], [draggable="true"]');if(t)return t;if(["body","html","main","section","article","form"].includes(o.tagName.toLowerCase())){let a=o.querySelector('button, [role="button"], a, input:not([type="hidden"]), select, textarea, [role="radio"], [role="checkbox"], .option-card, label');if(a)return K(a)}return o}function jt(o){let e=o;if(!e||!document.contains(e))try{e=G()}catch{}e=e||document.body;let t=r=>{let n=Array.from(r.querySelectorAll("tr")).filter(u=>H(u)&&u.querySelector('input[type="radio"], input[type="checkbox"]'));if(n.length>1)return n;let s=Array.from(r.querySelectorAll('input[type="checkbox"], input[type="radio"], [role="checkbox"], [role="radio"]')).filter(u=>H(u)&&!D(u));if(s.length>0)return s;let d=Array.from(r.querySelectorAll('.option-card, [role="option"], [class*="choice-card" i], [class*="option-card" i], li[class*="choice" i], li[class*="option" i]')).filter(u=>H(u)&&!D(u)).filter(u=>!u.parentElement?.closest('.option-card, [role="option"], [class*="choice-card" i], [class*="option-card" i]'));return d.length>0?d:Array.from(r.querySelectorAll('[class*="classification" i] [class], [class*="draggable-item" i], [class*="drag-item" i], [class*="sortable-card" i]')).filter(u=>{let h=u;return H(h)&&!D(h)&&(h.textContent||"").trim().length>2&&!Z(h)&&!j(h)&&!h.querySelector("[class]")})},a=t(e);return a.length>0?a:e!==document.body?t(document.body):[]}function P(o,e,t=!1){if(o==null)return null;let r=(typeof o=="string"?o:String(o)).trim().replace(/^["'“”«»]+|["'“”«»]+$/g,"");if(!r)return null;let n=Q(r),s=document.querySelector(`[data-easyquiz-id="${n}"]`);if(s&&!D(s))return K(s);try{let c=document.getElementById(r);if(c&&H(c)&&!D(c))return c.hasAttribute("data-category")||c.hasAttribute("data-dropzone")||c.classList.contains("dnd-zone")?c:K(c)}catch{}try{let c=document.querySelector(`[data-item-id="${n}"]`);if(c&&H(c)&&!D(c))return K(c)}catch{}let i=r.match(/^(?:item|opção|opcao|afirmação|afirmacao|alternativa|linha|afirmativa|questão|questao|campo|blank|lacuna|input|resposta)?\s*#?_?([0-9]+)$/i);if(i){let c=parseInt(i[1],10);if(t){let p=document.body;try{p=G()||document.body}catch{}let f=Array.from(p.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, select, [contenteditable="true"]')).filter(g=>H(g)&&!D(g));if(c>=1&&c-1<f.length)return f[c-1];if(c===0&&f.length>0)return f[0]}let m=c-1;if(m>=0){let p=jt();if(m<p.length){let A=p[m];if(A.tagName.toLowerCase()==="tr"){if(e){let y=A.querySelector(`input[value="${Q(e)}" i], [data-value="${Q(e)}" i]`);if(y)return y}let b=A.querySelector("input");if(b)return b}return K(A)}let f=document.body;try{f=G()||document.body}catch{}let g=Array.from(f.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, select, [contenteditable="true"]')).filter(A=>H(A)&&!D(A));if(m<g.length)return g[m]}}let d=r.match(/^(?:item|opção|opcao|afirmação|afirmacao|alternativa|linha|afirmativa|questão|questao)?\s*#?([a-eA-E])$/i);if(d){let c=d[1].toUpperCase(),m=c.charCodeAt(0)-65,p=Array.from(document.querySelectorAll(`input[type="radio"][value="${c}" i], input[type="checkbox"][value="${c}" i]`)).find(g=>H(g)&&!D(g));if(p)return K(p);let f=Array.from(document.querySelectorAll('.option-card, .choice, .answer, label, [role="radio"], [role="checkbox"]')).find(g=>{if(!H(g)||D(g))return!1;let b=(g.querySelector('.option-badge, .badge, [class*="badge" i], [class*="letter" i]')?.textContent||"").trim().toUpperCase();if(b===c||b===`${c})`||b===`(${c})`||b===`${c}.`||b===`${c}:`)return!0;let y=(g.textContent||"").trim().toUpperCase();return y.startsWith(`${c})`)||y.startsWith(`(${c})`)||y.startsWith(`${c}.`)||y.startsWith(`${c}:`)});if(f)return K(f);if(m>=0){let g=jt();if(m<g.length){let A=g[m];if(A.tagName.toLowerCase()==="tr"){if(e){let y=A.querySelector(`input[value="${Q(e)}" i], [data-value="${Q(e)}" i]`);if(y)return y}let b=A.querySelector("input");if(b)return b}return K(A)}}}if(/^[a-zA-Z0-9_-]{1,10}$/.test(r)){let m=Array.from(document.querySelectorAll(`[data-category="${n}" i], [data-dropzone="${n}" i], [data-role="dropzone"][data-category="${n}" i]`)).find(A=>H(A)&&!D(A));if(m)return m;let f=Array.from(document.querySelectorAll(`input[value="${n}" i], [data-value="${n}" i], input[id="${n}" i], input[placeholder="${n}" i], textarea[placeholder="${n}" i], [title="${n}" i]`)).find(A=>H(A)&&!D(A));if(f)return K(f);let g=Array.from(document.querySelectorAll('.option-badge, [class*="badge" i], [class*="letter" i], .option-card span, label span')).find(A=>{if(!H(A)||D(A))return!1;let b=C(A.textContent).toLowerCase();return b===r.toLowerCase()||b===r.toLowerCase()+")"});if(g)return K(g)}try{let c=Array.from(document.querySelectorAll(`[name="${n}"], [value="${n}"], [placeholder="${n}" i], [title="${n}" i], [data-category="${n}" i], [data-dropzone="${n}" i], [data-testid="${n}" i], [data-test-id="${n}" i], [aria-label="${n}" i]`));if(e){let p=c.find(f=>{if(!H(f)||D(f))return!1;if(f instanceof HTMLInputElement&&f.value.toLowerCase()===e.toLowerCase())return!0;let g=f.closest("label, .vf-label, td, div");return g&&C(g.textContent).toLowerCase().includes(C(e).toLowerCase())});if(p)return K(p)}let m=c.find(p=>H(p)&&!D(p));if(m)return m.hasAttribute("data-category")||m.hasAttribute("data-dropzone")||m.classList.contains("dnd-zone")?m:K(m)}catch{}if(/^[.#\[]|\s|[>+~:]/.test(r))try{let m=Array.from(document.querySelectorAll(r)).find(p=>H(p)&&!D(p));if(m)return K(m)}catch{}try{let c=r.replace(/"/g,""),m=`//button[normalize-space(.)="${c}"] | //a[normalize-space(.)="${c}"] | //*[not(*) and normalize-space(.)="${c}"] | //*[@aria-label="${c}"] | //*[@data-category="${c}"] | //*[@data-testid="${c}"]`,p=document.evaluate(m,document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);for(let f=0;f<p.snapshotLength;f++){let g=p.snapshotItem(f);if(g&&H(g)&&!D(g)){if(["body","html"].includes(g.tagName.toLowerCase())){let b=g.querySelector('button, [role="button"], a, input, [role="radio"], [role="checkbox"], label');if(b&&H(b))return K(b)}return g.closest('[data-role="dropzone"], [class*="category" i], [class*="bucket" i], [class*="column" i], [class*="drop" i]')||K(g)}}}catch{}let u=C(r).toLowerCase(),h=Array.from(document.querySelectorAll('button, a, div, span, li, p, label, input, textarea, select, [draggable="true"], [data-testid], [class*="option" i], [class*="card" i], [class*="item" i], [class*="choice" i], [class*="category" i], [class*="bucket" i]'));for(let c of h){if(!H(c)||D(c)||c.closest("header, nav, .stepper, .step-item, .progress-bar-container")||j(c)||!!(c.matches('article, section, form, main, [class*="container" i], [class*="grid" i], .dnd-pool, .dnd-zones')||c.querySelector('label, [role="radio"], [role="checkbox"], .dnd-card, [draggable="true"], .option-card, tr'))&&!c.matches(".dnd-zone, [data-category], [data-dropzone]"))continue;let p=C(c.textContent).toLowerCase(),f=C(c.getAttribute("aria-label")||"").toLowerCase(),g=C(c.getAttribute("placeholder")||"").toLowerCase(),A=C(c.getAttribute("title")||"").toLowerCase(),b=C(c.getAttribute("name")||"").toLowerCase(),y=C(c.getAttribute("data-category")||"").toLowerCase(),v=c instanceof HTMLInputElement||c instanceof HTMLButtonElement?c.value:"",x=C(v).toLowerCase(),q=p.startsWith(u+")")||p.startsWith(u+".")||p.startsWith(u+" -")||p.startsWith(u+":");if(p===u||f===u||g===u||A===u||b===u||y&&y===u||x&&x===u||q)return c.closest('[data-role="dropzone"], [class*="category" i], [class*="bucket" i], [class*="column" i], [class*="drop" i]')||K(c)}if(u.length>=3)for(let c of h){if(!H(c)||D(c)||c.closest("header, nav, .stepper, .step-item, .progress-bar-container")||j(c)||!!(c.matches('article, section, form, main, [class*="container" i], [class*="grid" i], .dnd-pool, .dnd-zones')||c.querySelector('label, [role="radio"], [role="checkbox"], .dnd-card, [draggable="true"], .option-card, tr'))&&!c.matches(".dnd-zone, [data-category], [data-dropzone]"))continue;let p=C(c.textContent).toLowerCase(),f=C(c.getAttribute("aria-label")||"").toLowerCase(),g=C(c.getAttribute("placeholder")||"").toLowerCase(),A=C(c.getAttribute("title")||"").toLowerCase(),b=C(c.getAttribute("name")||"").toLowerCase();if(p.includes(u)||f.includes(u)||g.includes(u)||A.includes(u)||b.includes(u)){if(Array.from(c.children).some(q=>{let T=C(q.textContent).toLowerCase();return T&&T.includes(u)}))continue;return c.closest('[data-role="dropzone"], [class*="category" i], [class*="bucket" i], [class*="column" i], [class*="drop" i]')||K(c)}let y=u.split(/\s+/).filter(Boolean);if(y.length>=3){let v=y.slice(0,Math.min(5,y.length)).join(" ");if(p.includes(v)||f.includes(v)||g.includes(v))return K(c)}}return null}function Vt(o,e){for(let t of e)o.dispatchEvent(new Event(t,{bubbles:!0,composed:!0}))}function oe(o,e){if(!o)return;try{o.scrollIntoView({block:"nearest",inline:"nearest",behavior:"instant"})}catch{}try{o.focus?.()}catch{}let t=o.getBoundingClientRect(),a=e?e[0]:Math.round(t.left+Math.max(1,t.width/2)),r=e?e[1]:Math.round(t.top+Math.max(1,t.height/2)),n={bubbles:!0,cancelable:!0,composed:!0,view:window,clientX:a,clientY:r};try{o.dispatchEvent(new PointerEvent("pointerover",{...n}))}catch{}try{o.dispatchEvent(new MouseEvent("mouseover",{...n}))}catch{}try{o.dispatchEvent(new PointerEvent("pointerdown",{...n,button:0,buttons:1}))}catch{}try{o.dispatchEvent(new MouseEvent("mousedown",{...n,button:0,buttons:1}))}catch{}try{o.dispatchEvent(new PointerEvent("pointerup",{...n,button:0,buttons:0}))}catch{}try{o.dispatchEvent(new MouseEvent("mouseup",{...n,button:0,buttons:0}))}catch{}if(typeof o.click=="function")try{o.click()}catch{try{o.dispatchEvent(new MouseEvent("click",{...n,button:0,buttons:0}))}catch{}}else try{o.dispatchEvent(new MouseEvent("click",{...n,button:0,buttons:0}))}catch{}try{let s=Object.keys(o).find(i=>i.startsWith("__reactFiber")||i.startsWith("__reactInternalInstance"));if(s){let i=o[s];for(;i;){let d=i.memoizedProps||i.pendingProps;if(d?.onClick){d.onClick({type:"click",target:o,currentTarget:o,bubbles:!0,cancelable:!0,preventDefault:()=>{},stopPropagation:()=>{}});break}i=i.return}}}catch{}try{let s=Object.keys(o).find(i=>i.startsWith("__reactProps"));if(s){let i=o[s];i?.onClick&&i.onClick({type:"click",target:o,currentTarget:o,bubbles:!0,cancelable:!0,preventDefault:()=>{},stopPropagation:()=>{}})}}catch{}try{let s=o._vei;s?.onClick&&(Array.isArray(s.onClick.value)?s.onClick.value:[s.onClick.value]).forEach(d=>{try{d({type:"click",target:o})}catch{}})}catch{}try{o.$onclick&&o.$onclick({type:"click",target:o,preventDefault:()=>{},stopPropagation:()=>{}})}catch{}try{if(!!(document.querySelector('meta[content*="google.com/forms"], form[action*="formResponse"]')||o.closest("[data-item-id], [jsmodel], [jsaction], .freebirdFormviewerComponentsQuestionBaseRoot"))){let i=o.querySelector('input[type="radio"], input[type="checkbox"]');i&&(i.focus?.(),i.click(),Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"checked")?.set?.call(i,!0),i.dispatchEvent(new Event("change",{bubbles:!0})));let d=o.closest("[jsaction]");if(d&&d!==o)try{d.dispatchEvent(new MouseEvent("click",{bubbles:!0,cancelable:!0,view:window,clientX:a,clientY:r}))}catch{}}}catch{}if(o.getAttribute("role")==="button"||o.getAttribute("tabindex")!==null)try{o.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0,cancelable:!0})),o.dispatchEvent(new KeyboardEvent("keyup",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0,cancelable:!0}))}catch{}}function mt(o){try{let e=o.id,t=!!e;e||(e=`__eq_tmp_${Math.random().toString(36).slice(2,8)}`,o.id=e);let a=document.createElement("script");return a.textContent=`(function(){var el=document.getElementById(${JSON.stringify(e)});if(el){el.dispatchEvent(new MouseEvent('click',{bubbles:true,cancelable:true,composed:true,view:window}));if(typeof el.click==='function')el.click();var fk=Object.keys(el).find(function(k){return k.startsWith('__reactFiber')||k.startsWith('__reactInternalInstance');});if(fk){var fb=el[fk];while(fb){var mp=fb.memoizedProps||fb.pendingProps;if(mp&&typeof mp.onClick==='function'){try{mp.onClick({type:'click',target:el,currentTarget:el,bubbles:true,cancelable:true,preventDefault:function(){},stopPropagation:function(){}});}catch(e){}break;}fb=fb.return;}}var pk=Object.keys(el).find(function(k){return k.startsWith('__reactProps');});if(pk&&el[pk]&&typeof el[pk].onClick==='function'){try{el[pk].onClick({type:'click',target:el,currentTarget:el,bubbles:true,cancelable:true,preventDefault:function(){},stopPropagation:function(){}});}catch(e){}}if(el._vei&&el._vei.onClick){var h=el._vei.onClick.value;var hs=Array.isArray(h)?h:[h];hs.forEach(function(fn){try{fn({type:'click',target:el});}catch(e){}});}}})()`,document.head.appendChild(a),a.remove(),t||setTimeout(()=>{try{o.id===e&&o.removeAttribute("id")}catch{}},0),!0}catch{return!1}}function Ue(o,e){let t=o;if(t.hasAttribute("for")){let l=t.getAttribute("for"),u=t.ownerDocument.getElementById(l);u&&(t=u)}if(typeof HTMLSelectElement<"u"&&t instanceof HTMLSelectElement||t.tagName?.toLowerCase()==="select"||t.getAttribute("role")==="combobox"||t.getAttribute("role")==="listbox"||t.matches?.('[role="combobox"], [role="listbox"], [class*="select" i], [class*="dropdown" i]')){Xe(t,[e]);return}let r=t.querySelector('select, [role="combobox"], [role="listbox"]');if(r){Xe(r,[e]);return}if(!(t instanceof HTMLInputElement)&&!(t instanceof HTMLTextAreaElement)&&!(t instanceof HTMLSelectElement)&&!t.isContentEditable){let l=t.querySelector('input:not([type="hidden"]), textarea, select, [contenteditable="true"]');if(l)t=l;else{let h=t.closest('.form-group, .field, [class*="input" i], [class*="control" i], label, tr, td, li, p, div')?.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, select, [contenteditable="true"]');if(h)t=h;else{let c=t.nextElementSibling;for(;c;){if(c instanceof HTMLInputElement&&!["hidden","button","submit","checkbox","radio"].includes(c.type)||c instanceof HTMLTextAreaElement||c instanceof HTMLElement&&c.isContentEditable){t=c;break}let m=c.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(m){t=m;break}c=c.nextElementSibling}}}}if(t instanceof HTMLButtonElement||t.tagName.toLowerCase()==="a"||t.getAttribute("role")==="button"||t instanceof HTMLInputElement&&["button","submit","reset","image"].includes(t.type)){let l=t.parentElement?.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(l)t=l;else{let u=document.body;try{u=G()||document.body}catch{}let h=u.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(h)t=h;else{console.warn("[EasyQuiz] setNativeValue: Nenhum campo de texto encontrado para receber o valor.");return}}}if(!(t instanceof HTMLInputElement)&&!(t instanceof HTMLTextAreaElement)&&!(t instanceof HTMLSelectElement)&&!t.isContentEditable){let l=document.body;try{l=G()||document.body}catch{}let u=l.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(u)t=u;else{console.warn("[EasyQuiz] setNativeValue: Nenhum campo de texto encontrado para receber o valor.");return}}if(t instanceof HTMLInputElement&&["checkbox","radio"].includes(t.type)){let l=["true","1","checked","yes","sim"].includes(e.toLowerCase())||e===t.value;pe(t,l);return}let s=String(e??""),i=s;if(t instanceof HTMLInputElement&&t.type==="number"){let l=s.replace(",",".").replace(/[^0-9.-]/g,"");l&&!isNaN(Number(l))&&(i=l)}try{t.scrollIntoView?.({block:"center",inline:"center",behavior:"instant"}),t.focus?.()}catch{}try{if(t instanceof HTMLInputElement||t instanceof HTMLTextAreaElement){let l=t instanceof HTMLTextAreaElement?HTMLTextAreaElement.prototype:HTMLInputElement.prototype,u=Object.getOwnPropertyDescriptor(l,"value")?.set;u?u.call(t,""):t.value="";try{t.select?.()}catch{}}else if(t.isContentEditable){t.textContent="";try{document.execCommand?.("selectAll",!1,void 0)}catch{}}}catch{}let d=!1;try{t instanceof HTMLInputElement||t instanceof HTMLTextAreaElement?t.type!=="number"&&t.type!=="range"&&(d=document.execCommand?.("insertText",!1,i)||!1):t.isContentEditable&&(d=document.execCommand?.("insertText",!1,i)||!1)}catch{}if(t instanceof HTMLInputElement||t instanceof HTMLTextAreaElement){try{let h=t._valueTracker;h&&h.setValue(i===""?" ":"")}catch{}let l=t instanceof HTMLTextAreaElement?HTMLTextAreaElement.prototype:HTMLInputElement.prototype,u=Object.getOwnPropertyDescriptor(l,"value")?.set;u?u.call(t,i):t.value=i;try{t.dispatchEvent(new KeyboardEvent("keydown",{bubbles:!0,cancelable:!0,key:i.slice(-1)||"a"}))}catch{}try{t.dispatchEvent(new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,composed:!0,data:i,inputType:"insertText"}))}catch{}try{t.dispatchEvent(new InputEvent("input",{bubbles:!0,cancelable:!0,composed:!0,data:i,inputType:"insertText"}))}catch{t.dispatchEvent(new Event("input",{bubbles:!0,cancelable:!0,composed:!0}))}try{t.dispatchEvent(new KeyboardEvent("keyup",{bubbles:!0,cancelable:!0,key:i.slice(-1)||"a"}))}catch{}try{t.dispatchEvent(new Event("change",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}try{t.dispatchEvent(new FocusEvent("blur",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}if(t.value!==i&&!(t instanceof HTMLInputElement&&t.type==="number"&&Number(t.value)===Number(i))){t.value=i;try{u?.call(t,i)}catch{}}return}if(t.isContentEditable){if(t.textContent?.trim()!==i.trim()){t.textContent=i;try{t.innerText=i}catch{}}try{t.dispatchEvent(new InputEvent("input",{bubbles:!0,cancelable:!0,composed:!0,data:i,inputType:"insertText"}))}catch{t.dispatchEvent(new Event("input",{bubbles:!0,cancelable:!0,composed:!0}))}try{t.dispatchEvent(new Event("change",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}try{t.dispatchEvent(new FocusEvent("blur",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}return}try{"value"in t&&(t.value=i),t.dispatchEvent(new Event("input",{bubbles:!0,cancelable:!0,composed:!0})),t.dispatchEvent(new Event("change",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}}function Me(o,e=""){if(o==null)return e;let t=typeof o=="string"?o:String(o);if(!t)return e;let a=/^(eq-|#|\$|\.|input_|mat-|choice_|radio_|chk_)/i.test(t),r=C(t),n=P(t)||P(r);if(!n)return a?e:r||e;let s=n.closest('label, .option-card, [class*="choice" i], [class*="option" i], .quiz-option, tr, td, li');if(s){let h=C(s.textContent);if(h&&h.length>0&&h.length<150)return h}if(n.id){let h=document.querySelector(`label[for="${Q(n.id)}"]`);if(h){let c=C(h.textContent);if(c&&c.length>0&&c.length<150)return c}}let i=n.getAttribute("aria-label");if(i)return C(i);let d=n.getAttribute("placeholder");if(d)return C(d);let l=C(n.textContent);if(l&&l.length>0&&l.length<120)return l;let u=n instanceof HTMLInputElement||n instanceof HTMLButtonElement?n.value:"";return u?C(u):a?e:r||e}function pe(o,e){if(!o)return;let t=o.closest('label, td, .option-card, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, [class*="option" i], [class*="choice" i], li')||o,a=o instanceof HTMLInputElement&&["checkbox","radio"].includes(o.type)?o:t.querySelector('input[type="checkbox"], input[type="radio"]');!a&&t.hasAttribute("for")&&(a=t.ownerDocument.getElementById(t.getAttribute("for")));let r=o instanceof HTMLInputElement?o.closest("label")||(o.id?t.ownerDocument.getElementById(t.getAttribute("for")):null)||o:t&&H(t)?t:o;if(a){let n=a.type==="radio",s=a.type==="checkbox",i=!!a._valueTracker;if(a.checked===e){if(n&&e){t.setAttribute("aria-checked","true"),t.setAttribute("aria-selected","true"),t.classList.add("selected","active","checked");return}if(s){t.setAttribute("aria-checked",e?"true":"false"),t.setAttribute("aria-selected",e?"true":"false"),t.classList.toggle("selected",e),t.classList.toggle("active",e),t.classList.toggle("checked",e);return}}if(r&&r!==a&&oe(r),a.checked!==e)try{a.focus?.(),a.click()}catch{}if(a.checked!==e){try{let l=a._valueTracker;l&&l.setValue(!e)}catch{}try{Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"checked")?.set?.call(a,e)}catch{}a.checked=e,Vt(a,["input","change"])}t.setAttribute("aria-checked",e?"true":"false"),t.setAttribute("aria-selected",e?"true":"false"),t.classList.toggle("selected",e),t.classList.toggle("active",e),t.classList.toggle("checked",e)}else{if((t.getAttribute("aria-checked")==="true"||t.getAttribute("aria-selected")==="true"||t.getAttribute("data-selected")==="true"||t.getAttribute("data-checked")==="true"||t.classList.contains("selected")||t.classList.contains("active")||t.classList.contains("checked"))===e&&e)return;oe(r),t.setAttribute("aria-checked",e?"true":"false"),t.setAttribute("aria-selected",e?"true":"false"),t.classList.toggle("selected",e),t.classList.toggle("active",e),t.classList.toggle("checked",e)}}function Xe(o,e){let t=typeof HTMLSelectElement<"u"&&o instanceof HTMLSelectElement||o.tagName?.toLowerCase()==="select"?o:o.querySelector("select");if(t){let s=e.map(l=>C(l).toLowerCase()),i=!1,d=(l,u)=>{l.selected=!0,t.selectedIndex=u;try{t.value=l.value}catch{}try{Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype,"value")?.set?.call(t,l.value)}catch{}try{let h=t._valueTracker;h&&h.setValue(l.value)}catch{}i=!0};for(let l=0;l<t.options.length;l++){let u=t.options[l],h=u.value.toLowerCase(),c=C(u.textContent).toLowerCase();if(s.some(p=>p===h||p===c)){if(d(u,l),!t.multiple)break}else t.multiple||(u.selected=!1)}if(!i)for(let l of s){let u=l.match(/^(?:item|opção|opcao|alternativa|linha|escolha|campo)?\s*#?_?([0-9]+)$/i);if(u){let h=parseInt(u[1],10),m=t.options[0]?.value===""||t.options[0]?.disabled?h:h>=1?h-1:0;if(m>=0&&m<t.options.length&&(d(t.options[m],m),!t.multiple))break}}if(!i){for(let l of s)if(/^[a-z]$/i.test(l)){let u=l.toUpperCase().charCodeAt(0)-65,c=t.options[0]?.value===""||t.options[0]?.disabled?u+1:u;if(c>=0&&c<t.options.length&&(d(t.options[c],c),!t.multiple))break}}if(!i){let l=u=>u.normalize("NFD").replace(/[\u0300-\u036f]/g,"");for(let u=0;u<t.options.length;u++){let h=t.options[u],c=l(h.value.toLowerCase()),m=l(C(h.textContent).toLowerCase());if(s.some(f=>{let g=l(f);return c.includes(g)||m.includes(g)||g.length>2&&(g.includes(c)||g.includes(m))})&&(d(h,u),!t.multiple))break}}if(i){Vt(t,["focus","input","change","blur"]);return}}let a=o.matches?.('[role="combobox"], [role="listbox"], [class*="select" i], [class*="dropdown" i]')?o:o.closest('[role="combobox"], [role="listbox"], [class*="select" i], [class*="dropdown" i]');a&&oe(a);let r=e.map(s=>C(s).toLowerCase()),n=Array.from(document.querySelectorAll('[role="listbox"] [role="option"], [role="menu"] [role="menuitem"], .select-dropdown li, .dropdown-menu .dropdown-item, .ant-select-item-option, .MuiMenuItem-root, [class*="option-item"], li[data-value]')).filter(s=>H(s)&&!D(s));for(let s of r){let i=n.find(l=>{let u=C(l.textContent).toLowerCase(),h=C(l.getAttribute("data-value")||l.getAttribute("value")||"").toLowerCase();return u===s||h===s||u.includes(s)||s.length>2&&s.includes(u)});if(i){oe(i);let l=i.querySelector('input[type="radio"], input[type="checkbox"]');l&&pe(l,!0);return}let d=P(s);if(d){oe(d);return}}}function bo(o,e){try{let t=new DataTransfer;try{t.setData("text/plain",o)}catch{}try{t.setData("text/html",e)}catch{}return t}catch{return null}}function ut(o){try{o.click()}catch{let e=o.ownerDocument.defaultView||window;o.dispatchEvent(new e.MouseEvent("click",{bubbles:!0,cancelable:!0,composed:!0,view:e}))}}function vo(o,e,t){try{if(e.contains(o))return{success:!0,evidence:"origin is child of dest (DOM move confirmed)"};if(!document.body.contains(o))return{success:!0,evidence:"origin removed from DOM (consumed by framework)"};let a=e.children.length;if(t!==void 0&&a>t)return{success:!0,evidence:`dest child count increased: ${t} \u2192 ${a}`};if([o.getAttribute("data-placed")==="true",o.getAttribute("data-assigned")==="true",o.getAttribute("data-matched")==="true",o.getAttribute("aria-grabbed")==="false",/placed|dropped|assigned|matched|done|sorted|categorized/i.test(o.className||"")].some(Boolean))return{success:!0,evidence:"origin has placement indicator: class/attr"};let n=(o.textContent||"").trim().toLowerCase();return n.length>2&&Array.from(e.querySelectorAll("*")).some(d=>d!==e&&(d.textContent||"").trim().toLowerCase()===n)?{success:!0,evidence:"origin text found inside dest children (clone or DOM move)"}:e.getAttribute("data-count")&&parseInt(e.getAttribute("data-count")||"0")>0?{success:!0,evidence:"dest data-count > 0, categorization likely succeeded"}:o.getAttribute("aria-hidden")==="true"||o.style.display==="none"||o.style.visibility==="hidden"?{success:!0,evidence:"origin hidden after drop (framework confirmed placement)"}:{success:!1,evidence:"no DOM evidence of successful drag/categorization"}}catch{return{success:!1,evidence:"verification threw exception"}}}function te(o,e){let t=C(o).toLowerCase();if(!t)return null;if(e==="source"){if(/^[0-9a-f]{10,}$/.test(o.trim())){let i=document.getElementById(o.trim());if(i&&H(i)&&!D(i))return i}let s=['[class*="cursor-grab"][id]',".dnd-card",'[draggable="true"]'];for(let i of s){let l=Array.from(document.querySelectorAll(i)).find(u=>{if(!H(u)||D(u))return!1;let h=C(`${u.id} ${u.textContent||""} ${u.getAttribute("data-id")||""}`).toLowerCase();return h===t||h.includes(t)||u.id===o.trim()});if(l)return l}return null}let a=["[data-dropzone]","[data-category]",'[data-role="dropzone"]','[class*="dropzone" i]','[class*="list-group" i]','[class*="classification-group" i]'].join(","),r=Array.from(document.querySelectorAll(a)),n=r.find(s=>[s.getAttribute("data-category"),s.getAttribute("data-dropzone")].some(i=>i?.trim().toLowerCase()===t));return n&&H(n)&&!D(n)?n:r.find(s=>{if(!H(s)||D(s)||/unclassified/i.test(s.className))return!1;let i=s.querySelector('.font-bold, h1, h2, h3, h4, [class*="header" i], [class*="title" i], [class*="label" i]'),d=C(i?.textContent||s.textContent||"").toLowerCase();return d.includes("op")&&(d.includes("es")||d.includes("\xF5es"))?!1:d===t||d.startsWith(t)||d.includes(t)})||null}async function Fe(o,e,t=1){try{o.scrollIntoView({block:"center",inline:"center",behavior:"instant"})}catch{}let a=o.getBoundingClientRect(),r=e.getBoundingClientRect(),n=Math.round(a.left+Math.max(1,a.width/2)),s=Math.round(a.top+Math.max(1,a.height/2)),i=Math.round(r.left+Math.max(1,r.width/2)),d=Math.round(r.top+Math.max(1,r.height/2)),l=C(e.textContent).toLowerCase();if(l){let f=Array.from(o.querySelectorAll('button, [role="button"], input[type="radio"], input[type="checkbox"], option, .btn, [class*="tag" i]')).find(g=>{let A=C(g.textContent).toLowerCase(),b=g instanceof HTMLInputElement||g instanceof HTMLOptionElement?C(g.value).toLowerCase():"";return A&&(l.includes(A)||A.includes(l))||b&&(l.includes(b)||b.includes(l))});f&&(oe(f),await new Promise(g=>setTimeout(g,120)))}ut(o),await new Promise(p=>setTimeout(p,140)),ut(e);let u=e.querySelector('[data-role="dropzone"], [class*="bucket" i], [class*="slot" i], [class*="drop" i], [class*="target" i], [class*="items" i], ul, ol');if(u&&u!==e&&ut(u),await new Promise(p=>setTimeout(p,100)),!e.contains(o)&&o.matches('.dnd-card, [draggable="true"]')&&e.matches('.dnd-zone, [data-dropzone], [data-role="dropzone"]')&&e.appendChild(o),e.contains(o)&&o.matches('.dnd-card, [draggable="true"]'))return;let h={bubbles:!0,cancelable:!0,composed:!0,view:window,clientX:n,clientY:s,screenX:n,screenY:s,button:0,buttons:1};try{o.dispatchEvent(new PointerEvent("pointerdown",{...h,isPrimary:!0,pointerId:1,pointerType:"mouse",pressure:.5}))}catch{}o.dispatchEvent(new MouseEvent("mousedown",h));let c=4;for(let p=1;p<=c;p++){let f=Math.round(n+(i-n)*(p/c)),g=Math.round(s+(d-s)*(p/c)),A={...h,clientX:f,clientY:g,screenX:f,screenY:g};try{o.dispatchEvent(new PointerEvent("pointermove",{...A,isPrimary:!0,pointerId:1,pointerType:"mouse",pressure:.5}))}catch{}document.dispatchEvent(new MouseEvent("mousemove",A))}let m={bubbles:!0,cancelable:!0,composed:!0,view:window,clientX:i,clientY:d,screenX:i,screenY:d,button:0,buttons:0};try{e.dispatchEvent(new PointerEvent("pointerup",{...m,isPrimary:!0,pointerId:1,pointerType:"mouse",pressure:0}))}catch{}e.dispatchEvent(new MouseEvent("mouseup",m)),e.dispatchEvent(new MouseEvent("click",m));try{let p=bo(R(o.textContent),o.outerHTML),f={...h},g={...m};p&&(f.dataTransfer=p,g.dataTransfer=p);let A=o.ownerDocument.defaultView?.DragEvent;if(!A)throw new Error("DragEvent n\xE3o dispon\xEDvel neste documento");o.dispatchEvent(new A("dragstart",f)),e.dispatchEvent(new A("dragenter",g)),e.dispatchEvent(new A("dragover",g)),e.dispatchEvent(new A("drop",g)),o.dispatchEvent(new A("dragend",f))}catch(p){console.warn("[EasyQuiz] DragEvent ignorado com seguran\xE7a:",p)}try{let p=new Touch({identifier:1,target:o,clientX:n,clientY:s}),f=new Touch({identifier:1,target:e,clientX:i,clientY:d});o.dispatchEvent(new TouchEvent("touchstart",{bubbles:!0,cancelable:!0,touches:[p]})),e.dispatchEvent(new TouchEvent("touchmove",{bubbles:!0,cancelable:!0,touches:[f]})),e.dispatchEvent(new TouchEvent("touchend",{bubbles:!0,cancelable:!0,touches:[]}))}catch{}if(t>=2&&!e.contains(o))try{o.focus?.(),o.dispatchEvent(new KeyboardEvent("keydown",{key:" ",code:"Space",bubbles:!0})),o.dispatchEvent(new KeyboardEvent("keyup",{key:" ",code:"Space",bubbles:!0})),await new Promise(p=>setTimeout(p,80)),e.focus?.(),e.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",bubbles:!0})),e.dispatchEvent(new KeyboardEvent("keyup",{key:"Enter",code:"Enter",bubbles:!0}))}catch{}if(!e.contains(o))try{let p=A=>{let b=Object.keys(A).find(v=>v.startsWith("__reactFiber")||v.startsWith("__reactInternalInstance"));if(!b)return null;let y=A[b];for(let v=0;v<10&&y;v++){if(y.memoizedProps)return y.memoizedProps;y=y.return}return null},f=p(o),g=p(e);if(f){let A=f.onMouseDown||f.onPointerDown||f.onDragStart;if(typeof A=="function")try{A({type:"mousedown",button:0,buttons:1,clientX:n,clientY:s,bubbles:!0,preventDefault:()=>{},stopPropagation:()=>{},currentTarget:o,target:o}),await new Promise(b=>setTimeout(b,100))}catch{}}if(g){let A=g.onMouseUp||g.onPointerUp||g.onDrop;if(typeof A=="function")try{A({type:"mouseup",button:0,buttons:0,clientX:i,clientY:d,bubbles:!0,preventDefault:()=>{},stopPropagation:()=>{},currentTarget:e,target:e})}catch{}}try{o.focus?.(),o.dispatchEvent(new KeyboardEvent("keydown",{key:" ",code:"Space",keyCode:32,bubbles:!0,cancelable:!0})),await new Promise(b=>setTimeout(b,200));let A=d>s?"ArrowDown":"ArrowUp";for(let b=0;b<3;b++)document.dispatchEvent(new KeyboardEvent("keydown",{key:A,bubbles:!0,cancelable:!0})),await new Promise(y=>setTimeout(y,60));document.dispatchEvent(new KeyboardEvent("keydown",{key:" ",code:"Space",keyCode:32,bubbles:!0,cancelable:!0})),await new Promise(b=>setTimeout(b,80))}catch{}try{!!document.querySelector("[data-rbd-draggable-id], [data-rbd-droppable-id], [data-dnd-kit-sortable]")&&(o.dispatchEvent(new CustomEvent("dndkitdragstart",{bubbles:!0,cancelable:!0,detail:{id:o.id||o.getAttribute("data-id")}})),await new Promise(b=>setTimeout(b,100)),e.dispatchEvent(new CustomEvent("dndkitdrop",{bubbles:!0,cancelable:!0,detail:{overId:e.id||e.getAttribute("data-id")}})))}catch{}}catch(p){console.warn("[EasyQuiz] Estrat\xE9gia G (React DnD internals) falhou:",p)}}function Ut(o,e,t,a){let r=l=>l.replace(/\\/g,"\\\\").replace(/'/g,"\\'").replace(/"/g,'\\"').slice(0,100),n=r(o.toLowerCase()),s=r(e.toLowerCase()),i=r(t),d=r(a);return`var src=$eq.find('${i}')||Array.from(document.querySelectorAll('[draggable],[class*="cursor-grab"],[class*="dnd-card"]')).find(function(e){return (e.textContent||'').toLowerCase().includes('${n}');});var dst=Array.from(document.querySelectorAll('[class*="list-group"],[class*="dropzone"],[data-category],[data-rbd-droppable-id]')).find(function(e){var h=e.querySelector('.font-bold,h1,h2,h3,h4,[class*="header"]');var t=(h||e);return (t.textContent||'').toLowerCase().includes('${s}');});if(src&&dst){dst.appendChild(src);[src,dst].forEach(function(el){try{el.dispatchEvent(new Event('change',{bubbles:true}));}catch(e){}try{el.dispatchEvent(new CustomEvent('dndkitdrop',{bubbles:true,detail:{}}));}catch(e){}});}else{console.warn('[EQ-drag-fallback] nao localizado: ${n} -> ${s}');}`}var Xt={fill:(o,e)=>{let t=P(o);t?Ue(t,e):console.warn(`$eq.fill: Elemento '${o}' n\xE3o encontrado`)},click:o=>{let e=P(o);e?!!(e.closest('.option-card, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, [class*="option" i], [class*="choice" i]')||e.querySelector('input[type="radio"], input[type="checkbox"]')||e instanceof HTMLInputElement&&["checkbox","radio"].includes(e.type))?pe(e,!0):oe(e):console.warn(`$eq.click: Elemento '${o}' n\xE3o encontrado`)},check:(o,e)=>{let t=P(o);t?pe(t,e):console.warn(`$eq.check: Elemento '${o}' n\xE3o encontrado`)},find:(o,e)=>P(o,e),drag:(o,e)=>{let t=te(o,"source")||P(o),a=te(e,"destination")||P(e);t&&a?Fe(t,a):console.warn(`$eq.drag: Origem ou destino n\xE3o encontrado ('${o}' -> '${e}')`)},categorize:async(o,e)=>{let t=te(o,"source")||P(o),a=te(e,"destination")||P(e);if(!t||!a){console.warn(`$eq.categorize: Item ou categoria n\xE3o encontrados ('${o}' -> '${e}')`);return}await Fe(t,a)},execute:(o,e=!1,t=1)=>Ie(o,e,t)};typeof window<"u"&&(window.$eq=Xt);async function yo(o,e=1,t=be()){if(it(o,t),o.t==="js"){let d=String(o.v||"");Dt(d);try{new Function("$eq","document","window",d)(Xt,document,window)}catch(l){throw console.warn("[EasyQuiz JS Execution]",l),l}return}if(o.t==="drag"){let d=te(o.from,"source")||P(o.from),l=te(o.to,"destination")||P(o.to);!d&&o.from&&(d=P(C(o.from))),!l&&o.to&&(l=P(C(o.to))),d&&l?await Fe(d,l,e):console.warn(`[EasyQuiz] Drag: alvo n\xE3o encontrado ('${o.from}' -> '${o.to}')`);return}let a=o.id!==void 0&&o.id!==null?String(o.id):"";!a&&o.t==="val"&&(a=o.target??o.name??o.selector??"1");let r=o.v!==void 0?o.v:o.value!==void 0?o.value:o.val!==void 0?o.val:o.text,n=r!=null?String(r).trim():"",s=null,i=String(o.name??o.n??"").trim();if(!i&&a&&document.querySelector(`input[type="radio"][name="${Q(a)}"]`)&&(i=a),(o.t==="chk"||o.t==="clk")&&i){let d=Array.from(document.querySelectorAll(`input[name="${Q(i)}"]`));if(n&&(s=d.find(l=>l.value?.toLowerCase()===n.toLowerCase())??null),!s&&n){let l=/^(v|verdadeiro|true|1|t|sim|correto)$/i.test(n),u=/^(f|falso|false|0|nao|não|incorreto|errado)$/i.test(n);if(l||u){let h=l?["v","verdadeiro","true","1","t","sim","correto"]:["f","falso","false","0","nao","n\xE3o","incorreto","errado"];s=d.find(c=>{let m=c.value?.toLowerCase()??"";if(h.includes(m))return!0;let f=(c.closest('label, td, [class*="option" i]')?.textContent??"").trim().toLowerCase();return h.some(g=>f===g||f.startsWith(g+" ")||f.startsWith("("+g+")"))})??null}}!s&&d.length>0&&(s=d[0])}if(s||(s=P(a,n,o.t==="val"||o.t==="sel")),!s&&a&&(s=P(C(a),n,o.t==="val"||o.t==="sel")),s&&n){if(s instanceof HTMLInputElement&&s.type==="radio"&&s.name){if(C(s.value).toLowerCase()!==C(n).toLowerCase()){let d=document.querySelector(`input[type="radio"][name="${Q(s.name)}"][value="${Q(n)}" i]`);if(d)s=d;else{let u=Array.from(document.querySelectorAll(`input[type="radio"][name="${Q(s.name)}"]`)).find(h=>{let c=h.closest("label, .vf-label, .option-card, tr, td, div");return c&&C(c.textContent).toLowerCase().includes(C(n).toLowerCase())});u&&(s=u)}}}else if(!(s instanceof HTMLInputElement)&&!(s instanceof HTMLSelectElement)&&!(s instanceof HTMLTextAreaElement)){let d=s.querySelector(`input[value="${Q(n)}" i], [data-value="${Q(n)}" i]`);if(d)s=d;else{let u=Array.from(s.querySelectorAll('input[type="radio"], input[type="checkbox"]')).find(h=>{let c=h.closest("label, .vf-label, .option-card, td, div");return c&&C(c.textContent).toLowerCase().includes(C(n).toLowerCase())});u&&(s=u)}}}if(!s&&(o.t==="val"||o.t==="sel")){let d=document.body;try{d=G()||document.body}catch{}let l=Array.from(d.querySelectorAll(o.t==="sel"?'select, [role="combobox"], [role="listbox"]':'input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, select, [contenteditable="true"]')).filter(u=>H(u)&&!D(u));if(l.length===1)s=l[0];else if(l.length>1){let u=C(a).toLowerCase(),h=u.match(/^#?_?([0-9]+)$/);if(h){let c=parseInt(h[1],10);c>=1&&c<=l.length?s=l[c-1]:c>=0&&c<l.length&&(s=l[c])}s||(s=l.find(m=>{let p=(m.getAttribute("placeholder")||"").toLowerCase(),f=(m.name||"").toLowerCase(),g=(m.getAttribute("aria-label")||"").toLowerCase(),A=(m.id||"").toLowerCase(),b=C(rt(m)).toLowerCase(),y=C(m.closest('label, tr, td, .form-group, .field, [class*="row" i], div')?.textContent||"").toLowerCase();return p.includes(u)||f.includes(u)||g.includes(u)||A.includes(u)||b&&b.includes(u)||u.length>=2&&y.includes(u)})||(l.length===1?l[0]:null))}}if(!s&&o.t!=="adv")throw new Error(`Alvo '${a}' n\xE3o encontrado no DOM para a\xE7\xE3o '${o.t}'.`);switch(o.t){case"val":if(s){let u=s instanceof HTMLInputElement||s instanceof HTMLTextAreaElement||s instanceof HTMLSelectElement||s.isContentEditable?s:s.querySelector('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]');if(!u){let p=s.closest('.form-group, .field, [class*="input" i], [class*="control" i], label, tr, td, li, p, div')?.querySelector('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]');p&&(u=p)}if(!u){let m=s.nextElementSibling;for(;m;){if(m instanceof HTMLInputElement&&!["hidden","button","submit","checkbox","radio"].includes(m.type)||m instanceof HTMLTextAreaElement||m instanceof HTMLElement&&m.isContentEditable){u=m;break}let p=m.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(p){u=p;break}m=m.nextElementSibling}}if(!u){let m=document.body;try{m=G()||document.body}catch{}let p=Array.from(m.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]')).filter(f=>H(f)&&!D(f));p.length>0&&(u=p[0])}let h=o.v!==void 0?o.v:o.value!==void 0?o.value:o.val!==void 0?o.val:o.text,c=h!=null?String(h):"";Ue(u||s,c)}break;case"chk":let d=o.c!==void 0?!!o.c:!0;s&&pe(s,d);break;case"sel":if(s){let u=Array.isArray(o.v)?o.v:[String(o.v)];Xe(s,u)}break;case"clk":if(s)if(!!(s.closest('.option-card, label, .vf-label, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, [class*="option" i], [class*="choice" i], [class*="answer" i], li, tr')||s.querySelector('input[type="radio"], input[type="checkbox"]')||s instanceof HTMLInputElement&&["checkbox","radio"].includes(s.type))){let h=o.c!==void 0?!!o.c:!0;pe(s,h)}else oe(s,o.co);break;case"adv":let l=Ft(o.id);if(l){await pt(l,1200);let u=o.id||l.textContent?.trim()||"";u&&_e(window.location.hostname,{advanceSelector:u}),oe(l)}else console.warn("[EasyQuiz] Bot\xE3o de avan\xE7o n\xE3o localizado.");break}}function xo(){let o=["button","a",'[role="button"]','input[type="submit"]','input[type="button"]','[data-testid*="check" i]','[data-test-id*="check" i]'].join(",");return Array.from(document.querySelectorAll(o)).find(t=>{if(!H(t)||D(t)||t.closest("header, nav, aside"))return!1;let a=t instanceof HTMLInputElement||t instanceof HTMLButtonElement?t.value:"",r=(t.textContent||a||t.getAttribute("aria-label")||"").trim();return/(verificar|checar|check|conferir|validar|enviar|responder)/i.test(r)})||null}function Ft(o){let e=c=>{let m=(c.getAttribute("aria-label")||c.textContent||(c instanceof HTMLInputElement||c instanceof HTMLButtonElement?c.value:"")||"").trim();return re.test(m)};if(o){let c=P(o);if(c&&H(c)&&!D(c)&&!j(c)&&!e(c))return c}try{let c=$e(window.location.hostname);if(c.advanceSelector){let m=P(c.advanceSelector);if(m&&H(m)&&!D(m)&&!j(m)&&!e(m))return m}}catch{}let t=["button","a",'[role="button"]','[role="link"]','input[type="button"]','input[type="submit"]','[data-testid*="next" i]','[data-testid*="continue" i]','[data-testid*="check" i]','[data-test-id*="next" i]','[data-test-id*="continue" i]','[data-test-id*="check" i]','[class*="next" i]','[class*="continue" i]','[class*="proximo" i]','[class*="avancar" i]'].join(","),a=Array.from(document.querySelectorAll(t)),r=c=>{let m=c instanceof HTMLInputElement||c instanceof HTMLButtonElement?c.value:"";return(c.getAttribute("aria-label")||c.textContent||m||"").trim()},n=c=>{let m=r(c).trim();return/^\d{1,3}$/.test(m)?!!c.closest('[class*="pagination" i], [class*="pager" i], [class*="page-nav" i], [class*="step-indicator" i], [class*="breadcrumb" i], [class*="steps" i], [aria-label*="p\xE1gina" i], [aria-label*="page" i], [role="navigation"], nav'):!1},s=a.filter(c=>H(c)&&!D(c)&&!c.closest("header, aside")&&!j(c)&&!e(c));for(let c of s){let m=r(c),p=m.replace(/[\d\(\)\[\]\u2192>\u2022\-\/\\]+/g," ").trim();if((ke.test(m)||ke.test(p))&&!n(c)&&!j(c))return c}for(let c of s)if(Z(c)&&!j(c)&&!n(c))return c;let i=document.querySelector('[data-test-id*="next" i], [data-testid*="next" i], [aria-label*="next" i], [aria-label*="pr\xF3xim" i], [aria-label*="avan\xE7ar" i], [aria-label*="continuar" i]');if(i&&H(i)&&!D(i)&&!j(i)&&!e(i))return i;let d=Array.from(document.querySelectorAll('input[type="submit"], button[type="submit"]'));for(let c of d)if(H(c)&&!D(c)&&!e(c)&&!j(c)&&!n(c))return c;let l=Array.from(document.querySelectorAll('button, [role="button"]')),u=window.innerHeight,h=l.filter(c=>{if(!H(c)||D(c)||e(c)||j(c)||c.closest("header, nav, aside, .eq-sidebar")||n(c))return!1;let m=c.getBoundingClientRect();return m.top>u*.45&&m.height>=24&&m.width>=24});if(h.length>0)return h.sort((c,m)=>{let p=c.getBoundingClientRect(),f=m.getBoundingClientRect(),g=p.left+p.top;return f.left+f.top-g}),h[0];for(let c of s)if(Z(c)&&!j(c))return c;return null}async function pt(o,e=2500){let t=Date.now();for(;Date.now()-t<e;){if(!(o.disabled===!0||o.getAttribute("aria-disabled")==="true"||o.classList.contains("disabled")||o.getAttribute("disabled")!==null))return;await new Promise(r=>setTimeout(r,80))}}function Eo(){let o=window.location.href,e=document.title,t=document.querySelectorAll('input, textarea, select, button, [role="button"], [role="option"], [role="radio"], [role="checkbox"]').length,a=(document.body?.innerText||document.body?.textContent||"").length;return`${o}|${e}|${t}|${a}`}async function wo(o,e=3500){let[t,a,r,n]=o.split("|"),s=parseInt(n||"0",10),i=Date.now();for(;Date.now()-i<e;){let d=window.location.href,l=document.title,u=String(document.querySelectorAll('input, textarea, select, button, [role="button"], [role="option"], [role="radio"], [role="checkbox"]').length),h=(document.body?.innerText||document.body?.textContent||"").length;if(d!==t)return{changed:!0,evidence:`URL mudou: ${t} \u2192 ${d}`};if(l!==a)return{changed:!0,evidence:`T\xEDtulo da p\xE1gina mudou: "${a}" \u2192 "${l}"`};if(Math.abs(parseInt(u)-parseInt(r||"0"))>=2)return{changed:!0,evidence:`Controles interativos: ${r} \u2192 ${u}`};if(Math.abs(h-s)>50)return{changed:!0,evidence:`Conte\xFAdo da p\xE1gina mudou substancialmente (${Math.abs(h-s)} chars)`};await new Promise(c=>setTimeout(c,100))}return{changed:!1,evidence:"Nenhuma mudan\xE7a estrutural detectada dentro do tempo limite."}}async function Ke(o){if(o.t==="js"||o.t==="adv")return;if(o.t==="drag"){let n=P(o.from)||P(C(o.from)),s=P(o.to)||P(C(o.to));n&&s&&await Fe(n,s,2);return}let e=o.id||"",t=o.v!==void 0?String(o.v).trim():"",a=P(e,t)||P(C(e),t),r=String(o.name??o.n??"").trim();if(!r&&e&&document.querySelector(`input[type="radio"][name="${Q(e)}"]`)&&(r=e),!a&&r){let n=Array.from(document.querySelectorAll(`input[name="${Q(r)}"]`));if(t&&(a=n.find(s=>s.value?.toLowerCase()===t.toLowerCase())??null),!a&&t){let s=/^(v|verdadeiro|true|1|t|sim|correto)$/i.test(t),i=/^(f|falso|false|0|nao|não|incorreto|errado)$/i.test(t);if(s||i){let d=s?["v","verdadeiro","true","1","t","sim","correto"]:["f","falso","false","0","nao","n\xE3o","incorreto","errado"];a=n.find(l=>{let u=l.value?.toLowerCase()??"";if(d.includes(u))return!0;let c=(l.closest('label, td, [class*="option" i]')?.textContent??"").trim().toLowerCase();return d.some(m=>c===m||c.startsWith(m+" ")||c.startsWith("("+m+")"))})??null}}!a&&n.length>0&&(a=n[0])}if(o.t==="clk"||o.t==="chk"){if(!a&&e){let s=Array.from(document.querySelectorAll('input, label, button, [role="radio"], [role="checkbox"], .option-card, [class*="option" i], [class*="choice" i]')),i=C(e).toLowerCase();a=s.find(d=>{let l=C(d.textContent).toLowerCase();return!!(C(d.value||"").toLowerCase()===i||l===i||l.startsWith(i+")")||l.startsWith("("+i+")")||l.startsWith(i+".")||l.startsWith(i+" - ")||l.startsWith(i+":")||i.length>=3&&l.includes(i))})||null}let n=o.v!==void 0?String(o.v).trim():"";if(a&&n){if(a instanceof HTMLInputElement&&a.type==="radio"&&a.name){if(C(a.value).toLowerCase()!==C(n).toLowerCase()){let s=document.querySelector(`input[type="radio"][name="${Q(a.name)}"][value="${Q(n)}" i]`);if(s)a=s;else{let d=Array.from(document.querySelectorAll(`input[type="radio"][name="${Q(a.name)}"]`)).find(l=>{let u=l.closest("label, .vf-label, .option-card, tr, td, div");return u&&C(u.textContent).toLowerCase().includes(C(n).toLowerCase())});d&&(a=d)}}}else if(!(a instanceof HTMLInputElement)&&!(a instanceof HTMLSelectElement)&&!(a instanceof HTMLTextAreaElement)){let s=a.querySelector(`input[value="${Q(n)}" i], [data-value="${Q(n)}" i]`);if(s)a=s;else{let d=Array.from(a.querySelectorAll('input[type="radio"], input[type="checkbox"]')).find(l=>{let u=l.closest("label, .vf-label, .option-card, td, div");return u&&C(u.textContent).toLowerCase().includes(C(n).toLowerCase())});d&&(a=d)}}}if(a){let s=a.closest('.option-card, label, .vf-label, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, li')||a,i=a instanceof HTMLInputElement&&["radio","checkbox"].includes(a.type)?a:s.querySelector('input[type="radio"], input[type="checkbox"]')||(s.getAttribute("for")?s.ownerDocument.getElementById(s.getAttribute("for")):null),d=o.c!==void 0?!!o.c:!0;if(pe(i||s,d),i&&i.checked!==d){try{let l=i._valueTracker;l&&l.setValue(!d)}catch{}try{Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"checked")?.set?.call(i,d)}catch{}i.checked=d,i.dispatchEvent(new Event("input",{bubbles:!0,composed:!0})),i.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}}return}if(o.t==="val"){let n=null;if(a&&(n=a instanceof HTMLInputElement||a instanceof HTMLTextAreaElement||a.isContentEditable?a:a.querySelector('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]')),!n){let s=document.body;try{s=G()||document.body}catch{}let i=Array.from(s.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]')),d=C(e).toLowerCase();n=i.find(l=>{let u=(l.getAttribute("placeholder")||"").toLowerCase(),h=(l.name||"").toLowerCase(),c=(l.id||"").toLowerCase(),m=(l.getAttribute("aria-label")||"").toLowerCase();return u.includes(d)||h.includes(d)||c.includes(d)||m.includes(d)})||(i.length>0?i[0]:null)}if(n){let s=String(o.v??"");try{if(n.focus?.(),n.type!=="number"){try{n.select?.()}catch{}document.execCommand?.("insertText",!1,s)}}catch{}Ue(n,s)}return}if(o.t==="sel"){if(!a&&e){let n=Array.from(document.querySelectorAll("select")),s=C(e).toLowerCase();a=n.find(i=>{let d=(i.name||"").toLowerCase(),l=(i.id||"").toLowerCase(),u=(i.getAttribute("aria-label")||"").toLowerCase();return d.includes(s)||l.includes(s)||u.includes(s)})||null}if(a){let n=Array.isArray(o.v)?o.v:[String(o.v)];Xe(a,n)}return}}function ee(o){try{if(o.t==="val"){let e=o.v!==void 0?o.v:o.value!==void 0?o.value:o.val!==void 0?o.val:o.text,t=String(e??"").trim(),a=t,r=o.id!==void 0&&o.id!==null?String(o.id):"";r||(r=o.target??o.name??o.selector??"1");let n=P(r,a,!0)||P(C(r),a,!0);if(!n){let m=document.body;try{m=G()||document.body}catch{}let p=Array.from(m.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]')).filter(f=>H(f)&&!D(f));p.length>0&&(n=p[0])}if(!n)return!1;let s=n instanceof HTMLInputElement&&n.type==="radio"?n:n.querySelector('input[type="radio"]');if(s&&s.name){let m=document.querySelector(`input[type="radio"][name="${Q(s.name)}"]:checked`);if(!m)return!1;let p=C(m.value).toLowerCase(),f=C(t).toLowerCase(),g=C(m.closest("label, .vf-label, .option-card, tr, td, div")?.textContent||"").toLowerCase();return p===f||g===f||g.includes(f)}let i=n instanceof HTMLInputElement||n instanceof HTMLTextAreaElement||n.isContentEditable?n:n.querySelector('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(!i){let p=n.closest('.form-group, .field, [class*="input" i], [class*="control" i], label, tr, td, li, p, div')?.querySelector('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]');p&&(i=p)}if(!i){let m=n.nextElementSibling;for(;m;){if(m instanceof HTMLInputElement&&!["hidden","button","submit","checkbox","radio"].includes(m.type)||m instanceof HTMLTextAreaElement||m instanceof HTMLElement&&m.isContentEditable){i=m;break}let p=m.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(p){i=p;break}m=m.nextElementSibling}}if(i instanceof HTMLSelectElement){let m=C(t).toLowerCase();return Array.from(i.options).some(p=>{if(!p.selected)return!1;let f=p.value.toLowerCase(),g=C(p.textContent).toLowerCase();return m===f||m===g||f.includes(m)||g.includes(m)})}let d=(i instanceof HTMLInputElement||i instanceof HTMLTextAreaElement?i.value:i?.textContent??n.textContent??"").trim();if(!d&&!t)return!0;if(!d&&t)return!1;let l=d.replace(",",".").replace(/\s+/g,"").toLowerCase(),u=t.replace(",",".").replace(/\s+/g,"").toLowerCase(),h=parseFloat(l),c=parseFloat(u);return!isNaN(h)&&!isNaN(c)&&l.match(/^-?[\d.,]+$/)&&u.match(/^-?[\d.,]+$/)?Math.abs(h-c)<1e-4:l===u||d.toLowerCase()===t.toLowerCase()||u.length>=3&&l===u}if(o.t==="sel"){let e=P(o.id,void 0,!0)||P(C(o.id),void 0,!0);if(!e){let n=document.body;try{n=G()||document.body}catch{}let s=Array.from(n.querySelectorAll('select, [role="combobox"], [role="listbox"]')).filter(l=>H(l)&&!D(l)),i=C(o.id).toLowerCase();e=s.find(l=>{let u=(l.id||"").toLowerCase(),h=(l.getAttribute("name")||"").toLowerCase(),c=(l.getAttribute("aria-label")||"").toLowerCase(),m=C(l.closest('.dropdown-row, [class*="dropdown" i], [class*="select" i], tr, label, div')?.textContent||"").toLowerCase();return u.includes(i)||h.includes(i)||c.includes(i)||i.length>=2&&m.includes(i)})||(s.length===1?s[0]:null)}if(!e)return!1;let t=e instanceof HTMLSelectElement?e:e.querySelector("select");if(!t){let n=e.matches?.('[role="combobox"], [role="listbox"], [class*="select" i], [class*="dropdown" i]')?e:e.closest('[role="combobox"], [role="listbox"], [class*="select" i], [class*="dropdown" i]');if(n){let i=(Array.isArray(o.v)?o.v:[String(o.v)]).map(l=>C(l).toLowerCase()),d=C(n.textContent).toLowerCase();return i.some(l=>d.includes(l)||l.includes(d))}return!1}let r=(Array.isArray(o.v)?o.v:[String(o.v)]).map(n=>C(n).toLowerCase());return Array.from(t.options).some(n=>{if(!n.selected)return!1;let s=n.value.toLowerCase(),i=C(n.textContent).toLowerCase();return r.some(d=>d===s||d===i||s.includes(d)||i.includes(d))})}if(o.t==="chk"||o.t==="clk"){let e=o.v!==void 0?String(o.v).trim():"",t=String(o.name??o.n??"").trim();if(t&&!o.id){let c=Array.from(document.querySelectorAll(`input[name="${Q(t)}"]`));if(c.length>0){let m=c.find(b=>b.checked);if(!m)return!1;if(!e)return!0;let p=m.value?.toLowerCase()??"",f=e.toLowerCase();if(p===f)return!0;let g=/^(v|verdadeiro|true|1|t|sim|correto)$/i.test(e),A=/^(f|falso|false|0|nao|não|incorreto|errado)$/i.test(e);return g?/^(v|verdadeiro|true|1|t|sim|correto)$/i.test(p):A?/^(f|falso|false|0|nao|não|incorreto|errado)$/i.test(p):!1}}let a=P(o.id,e)||P(C(o.id),e);if(!a&&t){let c=document.querySelector(`input[name="${Q(t)}"]`);c&&(a=c)}if(!a)return!1;let r=a.closest('.option-card, label, .vf-label, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, li')||a,n=a instanceof HTMLInputElement&&["checkbox","radio"].includes(a.type)?a:r.querySelector('input[type="checkbox"], input[type="radio"]')||(r.getAttribute("for")?r.ownerDocument.getElementById(r.getAttribute("for")):null),s=o.t==="chk"||o.c!==void 0?!!o.c:!0;if(n&&n.type==="radio"){if(n.checked===s)return!0;if(o.v&&n.name){let c=C(String(o.v)).toLowerCase(),m=document.querySelector(`input[type="radio"][name="${Q(n.name)}"]:checked`);if(!m)return!1;if(m===n)return!0;let p=C(m.value).toLowerCase(),f=C(m.closest("label, .vf-label, .option-card, tr, td, div")?.textContent||"").toLowerCase();return p===c||f.includes(c)||c.includes(p)}}if(n&&["checkbox","radio"].includes(n.type))return n.checked===s;let i=r.getAttribute("aria-checked")===String(s)||r.getAttribute("aria-selected")===String(s)||r.getAttribute("aria-pressed")===String(s),d=s?r.getAttribute("data-selected")==="true"||r.getAttribute("data-checked")==="true"||r.getAttribute("data-active")==="true"||r.getAttribute("data-state")==="checked"||r.getAttribute("data-state")==="on":r.getAttribute("data-selected")==="false"||r.getAttribute("data-checked")==="false"||r.getAttribute("data-state")==="unchecked",l=r.className||"",u=s?/\b(active|selected|checked|picked|is-selected|choice-selected|selected-option|is-checked|chosen|current)\b/i.test(l):!/\b(active|selected|checked|picked|is-selected|choice-selected|selected-option|is-checked|chosen|current)\b/i.test(l);if(i||d||u)return!0;let h=!!r.closest('[role="radiogroup"], [role="listbox"], .options, .choices, [class*="option" i], [class*="choice" i], [class*="answer" i], [class*="quiz" i]');return o.t==="clk"&&!n&&!h||r.getAttribute("aria-expanded")!==null||r.getAttribute("aria-pressed")!==null}if(o.t==="drag"){let e=te(o.from,"source")||P(o.from)||P(C(o.from)),t=te(o.to,"destination")||P(o.to)||P(C(o.to));return!e||!t?!1:vo(e,t).success}}catch{}return!1}async function Ie(o,e,t=1,a=be({engine:"smart",autoAdvance:e})){let r=o.actions.filter(E=>E.t!=="adv"),n=o.actions.filter(E=>E.t==="adv"),s=0,i=[],d=new Map,l=new Map,u=new Map,h=new Set,c=o.pageType==="question"||r.length>0,m=r.filter(E=>E.t==="chk"||E.t==="clk"&&E.c!==void 0),p=new Map;for(let E of r){let L=[];l.set(E,L);try{if(E.t==="drag"){L.push("declarative-A-F");try{let S=te(E.from,"source")||P(E.from),w=te(E.to,"destination")||P(E.to);S&&u.set(E,S.parentElement?.outerHTML?.slice(0,500)||""),w&&p.set(E,w.children.length)}catch{}}else L.push("declarative-primary");await yo(E,t,a),s++,h.add(E)}catch(S){d.set(E,S instanceof Error?S.message:String(S)),console.warn("[EasyQuiz] A\xE7\xE3o declarativa prim\xE1ria falhou com seguran\xE7a:",E,S)}await new Promise(S=>setTimeout(S,E.t==="drag"?180:35))}if(c&&o.mode==="escolha_multipla"&&m.length>0){let E=document.body;try{E=G()||document.body}catch{}let L=Array.from(E.querySelectorAll('input[type="checkbox"], [role="checkbox"]')).filter(S=>H(S)&&!D(S));if(L.length>1){let w=function(I,O){if(I===O||I.contains(O)||O.contains(I))return!0;let B=I.closest('.option-card, label, [role="checkbox"], [role="option"], tr, li, [class*="option" i]'),N=O.closest('.option-card, label, [role="checkbox"], [role="option"], tr, li, [class*="option" i]');if(B&&N&&B===N)return!0;let X=I.getAttribute("for")||I.id,U=O.getAttribute("for")||O.id;return!!(X&&U&&X===U)};var M=w;let S=new Set;for(let I of m){let O=I.t==="chk"?!!I.c:!!(I.c??!0),B="id"in I&&typeof I.id=="string"?I.id:"";if(O&&B){let N=P(B,I.v);if(N){S.add(N);let X=N.querySelector('input[type="checkbox"]');X&&S.add(X);let U=N.closest('.option-card, label, [role="checkbox"], tr, li, [class*="option" i]');U&&(S.add(U),U.querySelectorAll('input[type="checkbox"]').forEach(J=>S.add(J)))}}}if(S.size>=m.length&&S.size>0){let I=Array.from(S);for(let O of L)I.some(N=>w(N,O))||(O instanceof HTMLInputElement&&O.checked||O.getAttribute("aria-checked")==="true"||O.closest(".option-card, label")?.classList.contains("selected"))&&pe(O,!1)}}}await new Promise(E=>setTimeout(E,r.length>0?100:25));let f=0;for(let E of r){if(ee(E)){f++;continue}console.warn(`[EasyQuiz Auto-Cura] A\xE7\xE3o '${E.t}' no alvo '${E.id||E.from||""}' n\xE3o verificada no DOM. Disparando Passagem 2 de conting\xEAncia...`);try{it(E,a),l.get(E)?.push("alternative-path"),await Ke(E)}catch(L){d.set(E,L instanceof Error?L.message:String(L)),console.warn("[EasyQuiz Auto-Cura] Rota alternativa falhou:",L)}await new Promise(L=>setTimeout(L,250)),ee(E)&&(console.log("[EasyQuiz Auto-Cura] \u2713 A\xE7\xE3o recuperada com sucesso pela rota de conting\xEAncia!"),f++,h.has(E)?d.has(E)&&d.delete(E):(d.delete(E),s++,h.add(E)))}if(f<r.length&&r.length>0){console.warn(`[EasyQuiz Auto-Cura] ${r.length-f} de ${r.length} a\xE7\xE3o(\xF5es) ainda n\xE3o verificadas. Disparando Passagem 3 final...`),await new Promise(E=>setTimeout(E,200));for(let E of r)if(!ee(E))try{if(await Ke(E),await new Promise(L=>setTimeout(L,80)),!ee(E)&&(E.t==="clk"||E.t==="chk"))try{let L="id"in E?String(E.id||""):"",S=E.v!==void 0?String(E.v).trim():"",w=P(L,S)||P(C(L),S);w&&(mt(w),await new Promise(I=>setTimeout(I,120)))}catch{}}catch(L){d.set(E,L instanceof Error?L.message:String(L))}await new Promise(E=>setTimeout(E,200)),f=0;for(let E of r)ee(E)&&(f++,h.has(E)?d.has(E)&&d.delete(E):(d.delete(E),s++,h.add(E)))}let g=[];for(let[E,L]of r.entries())if(!ee(L)){let S=L.t==="drag"?`${L.from} -> ${L.to}`:"id"in L&&L.id?L.id:L.t;i.push(S),g.push({actionIndex:E,action:L,strategiesAttempted:l.get(L)||[],evidence:d.get(L)||"sem evid\xEAncia de aplica\xE7\xE3o no DOM",domSnapshot:u.get(L)}),L.t==="drag"&&console.warn(`[EasyQuiz Drag] FALHA CONFIRMADA: "${L.from}" -> "${L.to}"`,`
  Estrat\xE9gias: ${(l.get(L)||[]).join(", ")}`,`
  Snapshot DOM: ${u.get(L)?.slice(0,200)||"n/a"}`)}c&&r.length===0&&i.push("nenhuma a\xE7\xE3o de resposta prescrita");let A=r.map((E,L)=>{let S=E.t==="drag"?`${E.from} -> ${E.to}`:E.t==="js"?"$eq":E.id||E.t,w=E.t==="js"?!0:E.t==="drag"?!!(te(E.from,"source")&&te(E.to,"destination")):!!(P(E.id||"")||P(C(E.id||""))),I=ee(E);return{index:L,action:E,target:S,located:w,applied:!d.has(E),verified:I,strategy:E.t==="drag"?"drag-adaptive":E.t==="js"?"javascript":"declarative-dom",evidence:I?"estado do controle confirmado no DOM":"nenhuma evid\xEAncia suficiente ap\xF3s as tentativas",...d.has(E)?{error:d.get(E)}:{}}}),b=c?r.length>0&&i.length===0&&(f===r.length||s===r.length&&f>0):!0,y=!1,v=!1,x="Nenhuma a\xE7\xE3o de navega\xE7\xE3o solicitada.",q=c?f>0&&f>=Math.ceil(r.length/2):s>0&&s>=r.length/2,T=c?f>0&&(b||q):b||r.length===0||q;if(e&&T){await new Promise(S=>setTimeout(S,r.length>0?120:40));let E=!1,L=null;if(o.pageType!=="info"){let S=xo();if(S&&H(S)){await pt(S,1200),oe(S),E=!0,L=S,await new Promise(O=>setTimeout(O,350));let w=document.querySelector('.feedback-message.error, [class*="feedback"][class*="error" i], [role="alert"][class*="error" i]');w&&H(w)&&(w.textContent||"").trim().length>0?(y=!1,v=!1,x=`Aviso do formul\xE1rio ap\xF3s checagem: ${w.textContent?.trim().slice(0,100)}`):(y=!0,v=!0,x="Resposta confirmada via bot\xE3o de verifica\xE7\xE3o/envio.")}}if(!E){let S=Eo(),w=n.length>0&&"id"in n[0]?n[0].id:void 0,I=Ft(w);if(I){await pt(I,1500);let O=w||I.textContent?.trim()||"";O&&_e(window.location.hostname,{advanceSelector:O}),oe(I);let B=await wo(S,1800);v=B.changed,x=B.evidence,y=B.changed||!0,B.changed||console.warn("[EasyQuiz] O bot\xE3o de avan\xE7o foi acionado, mas a navega\xE7\xE3o ainda n\xE3o concluiu.")}else console.warn("[EasyQuiz] Nenhum bot\xE3o de avan\xE7o encontrado na p\xE1gina.")}}return{applied:s,verified:f,success:b,advanced:y,failed:i,reports:A,navigationVerified:v,navigationEvidence:x,failedActions:g}}var ne=null,ve=[],ft=[],ht=[],gt=[],ie=null,me=null,Co=`
@keyframes eq-image-pulse-yellow-white {
  0%, 100% {
    border-color: #ffd600;
    outline-color: #ffd600;
    box-shadow: 0 0 16px rgba(255, 214, 0, 0.95), 0 0 32px rgba(255, 214, 0, 0.5), inset 0 0 12px rgba(255, 214, 0, 0.25);
  }
  50% {
    border-color: #ffffff;
    outline-color: #ffffff;
    box-shadow: 0 0 22px rgba(255, 255, 255, 0.95), 0 0 40px rgba(255, 214, 0, 0.8), inset 0 0 16px rgba(255, 255, 255, 0.35);
  }
}
@keyframes eq-scope-scan-loop {
  0% { top: 0%; opacity: 0.95; }
  50% { top: 96%; opacity: 0.75; }
  100% { top: 0%; opacity: 0.95; }
}
@keyframes eq-badge-fade-in {
  0% { opacity: 0; transform: scale(0.8) translateY(-4px); }
  100% { opacity: 1; transform: scale(1) translateY(0); }
}
`;function Kt(){try{if(typeof document>"u"||!document.head)return;if(!document.getElementById("eq-image-pulse-style")){let o=document.createElement("style");o.id="eq-image-pulse-style",o.textContent=Co,document.head.appendChild(o)}}catch{}}function fe(){ne&&(ne.style.removeProperty("outline"),ne.style.removeProperty("outline-offset"),ne.style.removeProperty("position"),ne=null);for(let o of ve)o.style.removeProperty("outline"),o.style.removeProperty("outline-offset"),o.style.removeProperty("background-color"),o.style.removeProperty("box-shadow"),o.removeAttribute("data-easyquiz-highlight");ve=[];for(let o of ft)o.style.removeProperty("animation"),o.style.removeProperty("outline"),o.style.removeProperty("outline-offset"),o.style.removeProperty("box-shadow"),o.style.removeProperty("filter"),o.removeAttribute("data-easyquiz-image-highlight");ft=[];for(let o of ht)try{o.remove()}catch{}ht=[],me&&typeof window<"u"&&(window.removeEventListener("scroll",me),window.removeEventListener("resize",me),me=null);for(let o of gt)try{o.remove()}catch{}if(gt=[],ie){try{ie.remove()}catch{}ie=null}}function At(o){Kt();let e=[];for(let t of o){if(!t||typeof t.setAttribute!="function")continue;let a=t;try{a.style&&(a.style.outline="3px solid #ffd600",a.style.outlineOffset="4px",a.style.animation="eq-image-pulse-yellow-white 1.2s ease-in-out infinite",a.style.boxShadow="0 0 16px rgba(255, 214, 0, 0.7)",a.style.filter="drop-shadow(0 0 8px rgba(255, 214, 0, 0.8))"),a.setAttribute("data-easyquiz-image-highlight","true"),ft.push(a)}catch{}try{let r=t.getBoundingClientRect(),n=r.width||t.offsetWidth||280,s=r.height||t.offsetHeight||200;if(n>10&&s>10){let i=document.createElement("div");i.setAttribute("data-easyquiz-image-frame","true"),i.style.cssText=`
          position: absolute;
          top: ${r.top+window.scrollY-3}px;
          left: ${r.left+window.scrollX-3}px;
          width: ${n+6}px;
          height: ${s+6}px;
          border: 3px solid #ffd600;
          border-radius: 8px;
          pointer-events: none;
          z-index: 2147483640;
          box-sizing: border-box;
          animation: eq-image-pulse-yellow-white 1.2s ease-in-out infinite;
          box-shadow: 0 0 16px rgba(255, 214, 0, 0.95), 0 0 32px rgba(255, 214, 0, 0.5), inset 0 0 12px rgba(255, 214, 0, 0.25);
        `;let d=document.createElement("div");d.setAttribute("data-easyquiz-capture-badge","true"),d.textContent="\u{1F4F7} Imagem / Gr\xE1fico Analisado pela IA",d.style.cssText=`
          position: absolute;
          top: -14px;
          left: 8px;
          background: rgba(12, 14, 20, 0.95);
          color: #ffd600;
          font-size: 11px;
          font-weight: 800;
          padding: 2px 8px;
          border-radius: 6px;
          border: 1px solid rgba(255, 214, 0, 0.85);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.8);
          letter-spacing: 0.3px;
          white-space: nowrap;
          pointer-events: none;
          font-family: system-ui, -apple-system, sans-serif;
          animation: eq-badge-fade-in 0.3s ease-out;
        `,i.appendChild(d),document.body.appendChild(i),ht.push(i),gt.push(d),e.push({element:t,frame:i})}}catch{}}e.length>0&&!me&&typeof window<"u"&&(me=()=>{for(let t of e)try{let a=t.element.getBoundingClientRect();a.width>0&&a.height>0&&(t.frame.style.top=`${a.top+window.scrollY-3}px`,t.frame.style.left=`${a.left+window.scrollX-3}px`,t.frame.style.width=`${a.width+6}px`,t.frame.style.height=`${a.height+6}px`)}catch{}},window.addEventListener("scroll",me,{passive:!0}),window.addEventListener("resize",me,{passive:!0}))}function He(o){ne&&ne!==o&&(ne.style.removeProperty("outline"),ne.style.removeProperty("outline-offset")),Kt(),ne=o,o.style.outline="2px solid #00e5ff",o.style.outlineOffset="4px";try{if(ie){try{ie.remove()}catch{}ie=null}window.getComputedStyle(o).position==="static"&&(o.style.position="relative");let t=document.createElement("div");t.style.cssText=`
      position: absolute; left: 0; right: 0; top: 0; height: 3px;
      background: linear-gradient(90deg, transparent, #00e5ff, #00ff88, #00e5ff, transparent);
      z-index: 99998; pointer-events: none; border-radius: 2px;
      animation: eq-scope-scan-loop 1.4s ease-in-out infinite;
      box-shadow: 0 0 14px rgba(0, 229, 255, 0.85), 0 0 6px #00ff88;
    `,o.appendChild(t),ie=t}catch{}}function qo(o){return!o||o>=.9?{outline:"#00ff88",bg:"rgba(0, 255, 136, 0.12)",glow:"rgba(0, 255, 136, 0.8)"}:o>=.7?{outline:"#00bfff",bg:"rgba(0, 191, 255, 0.10)",glow:"rgba(0, 191, 255, 0.7)"}:{outline:"#ffaa00",bg:"rgba(255, 170, 0, 0.10)",glow:"rgba(255, 170, 0, 0.7)"}}function Jt(o,e){if(ie){try{ie.remove()}catch{}ie=null}let t=qo(e);for(let a of o){if(a.t==="adv"||a.t==="js")continue;if(a.t==="drag"){try{let m=P(a.from),p=P(a.to);m&&(m.style.outline=`2px solid ${t.outline}`,ve.push(m)),p&&(p.style.outline="2px dashed #00e5ff",ve.push(p))}catch{}continue}let r=a.v!==void 0?Array.isArray(a.v)?a.v[0]:String(a.v):"",n=String(a.name??a.n??"").trim(),s=null;if(n){let m=Array.from(document.querySelectorAll(`input[name="${Q(n)}"]`));if(r&&(s=m.find(p=>p.value?.toLowerCase()===r.toLowerCase())??null,!s)){let p=/^(v|verdadeiro|true|1|t|sim|correto)$/i.test(r),f=/^(f|falso|false|0|nao|não|incorreto|errado)$/i.test(r);if(p||f){let g=p?["v","verdadeiro","true","1","t","sim","correto"]:["f","falso","false","0","nao","n\xE3o","incorreto","errado"];s=m.find(A=>{let b=A.value?.toLowerCase()??"";if(g.includes(b))return!0;let v=(A.closest('label, .vf-label, td, [class*="option" i]')?.textContent??"").trim().toLowerCase();return g.some(x=>v===x||v.startsWith(x+" ")||v.startsWith("("+x+")"))})??null}}!s&&m.length>0&&(s=m[0])}if(!s&&a.id&&(s=P(a.id,r,a.t==="val"||a.t==="sel")||P(C(a.id),r,a.t==="val"||a.t==="sel")),!s&&a.t==="sel"){let m=document.body;try{m=G()||document.body}catch{}let p=Array.from(m.querySelectorAll('select, [role="combobox"], [role="listbox"]')).filter(A=>H(A)&&!de(A)),f=C(a.id).toLowerCase();s=p.find(A=>{let b=(A.id||"").toLowerCase(),y=(A.getAttribute("name")||"").toLowerCase(),v=(A.getAttribute("aria-label")||"").toLowerCase(),x=C(A.closest('.dropdown-row, [class*="dropdown" i], [class*="select" i], tr, label, div')?.textContent||"").toLowerCase();return b.includes(f)||y.includes(f)||v.includes(f)||f.length>=2&&x.includes(f)})||(p.length===1?p[0]:null)}if(!s)continue;let i=typeof HTMLSelectElement<"u"&&s instanceof HTMLSelectElement||s.tagName?.toLowerCase()==="select"||s.getAttribute("role")==="combobox"||s.getAttribute("role")==="listbox",d=s.closest('label, .vf-label, .option-card, [role="radio"], [role="checkbox"], [role="option"], [role="listitem"], .answer, .quiz-option, .form-check, [class*="option" i], [class*="choice" i]'),l=i?s.parentElement?.closest('.dropdown-row, [class*="dropdown" i], [class*="select-row" i], .form-group, tr, li'):null,u=d||l||s;u.style.outline=`2px solid ${t.outline}`,u.style.outlineOffset="2px",u.style.backgroundColor=t.bg,u.setAttribute("data-easyquiz-highlight","true"),ve.push(u);let h=i?s:u.querySelector('select, [role="combobox"], [role="listbox"]');h&&(h.style.outline=`2px solid ${t.outline}`,h.style.outlineOffset="2px",h.style.boxShadow=`0 0 10px ${t.glow}`,h.setAttribute("data-easyquiz-highlight","true"),ve.push(h));let c=s instanceof HTMLInputElement&&["checkbox","radio"].includes(s.type)?s:u.querySelector('input[type="checkbox"], input[type="radio"]');c&&c!==u&&(c.style.outline=`2px solid ${t.outline}`,c.style.outlineOffset="2px",c.style.boxShadow=`0 0 10px ${t.glow}`,c.setAttribute("data-easyquiz-highlight","true"),ve.push(c))}}var bt=10,To=1400,Pe=15e5;function ce(o){return new Promise((e,t)=>{let a=new FileReader;a.onerror=()=>t(new Error("Falha ao converter blob para base64.")),a.onload=()=>{let r=String(a.result||"");e(r.split(",")[1]||"")},a.readAsDataURL(o)})}async function ye(o){let e=0,t=0;if(o instanceof HTMLImageElement?(e=o.naturalWidth||o.width,t=o.naturalHeight||o.height):(e=o.width,t=o.height),e<=0||t<=0)throw new Error("Dimens\xF5es inv\xE1lidas.");let a=Math.min(1,To/Math.max(e,t)),r=Math.max(1,Math.round(e*a)),n=Math.max(1,Math.round(t*a)),s=document.createElement("canvas");s.width=r,s.height=n;let i=s.getContext("2d",{alpha:!1});if(!i)throw new Error("Sem suporte a Canvas 2D.");return i.fillStyle="#ffffff",i.fillRect(0,0,r,n),i.drawImage(o,0,0,r,n),new Promise((d,l)=>{s.toBlob(u=>u?d(u):l(new Error("Falha na compress\xE3o.")),"image/jpeg",.88)})}async function Wt(o){let e=typeof o.getBoundingClientRect=="function"?o.getBoundingClientRect():{width:0,height:0},t=e.width||parseFloat(o.getAttribute("width")||"0")||parseFloat(o.style.width||"0")||400,a=e.height||parseFloat(o.getAttribute("height")||"0")||parseFloat(o.style.height||"0")||300,r=2,n=Math.min(1800,Math.max(120,Math.round(t*r))),s=Math.min(1800,Math.max(100,Math.round(a*r))),i=o.cloneNode(!0);i.getAttribute("xmlns")||i.setAttribute("xmlns","http://www.w3.org/2000/svg"),i.getAttribute("xmlns:xlink")||i.setAttribute("xmlns:xlink","http://www.w3.org/1999/xlink"),i.setAttribute("width",String(n)),i.setAttribute("height",String(s)),!i.getAttribute("viewBox")&&t>0&&a>0&&i.setAttribute("viewBox",`0 0 ${t} ${a}`);try{let c=Array.from(o.querySelectorAll("*")),m=Array.from(i.querySelectorAll("*"));for(let p=0;p<Math.min(c.length,m.length);p++){let f=c[p],g=m[p];if(!f||!g||!g.style)continue;let A=window.getComputedStyle?window.getComputedStyle(f):null;A&&(A.fill&&A.fill!=="none"&&(g.style.fill=A.fill),A.stroke&&A.stroke!=="none"&&(g.style.stroke=A.stroke),A.strokeWidth&&(g.style.strokeWidth=A.strokeWidth),A.fontFamily&&(g.style.fontFamily=A.fontFamily),A.fontSize&&(g.style.fontSize=A.fontSize),A.fontWeight&&(g.style.fontWeight=A.fontWeight),A.color&&(g.style.color=A.color))}}catch{}let d="#ffffff";try{let c=o.parentElement||o;for(;c&&c!==document.documentElement;){let p=(window.getComputedStyle?window.getComputedStyle(c):null)?.backgroundColor;if(p&&p!=="transparent"&&p!=="rgba(0, 0, 0, 0)"){d=p;break}c=c.parentElement}}catch{}let u=new XMLSerializer().serializeToString(i),h="";try{h=btoa(unescape(encodeURIComponent(u)))}catch{}try{let c=g=>new Promise((A,b)=>{let y=new Image,v=setTimeout(()=>b(new Error("Timeout render SVG")),1200);y.onload=()=>{clearTimeout(v),A(y)},y.onerror=()=>{clearTimeout(v),b(new Error("Falha ao renderizar SVG em Image."))},y.src=g}),m=null;if(h)try{m=await c(`data:image/svg+xml;base64,${h}`)}catch{}if(!m){let g=new Blob([u],{type:"image/svg+xml;charset=utf-8"}),A=URL.createObjectURL(g);try{m=await c(A)}finally{URL.revokeObjectURL(A)}}let p=document.createElement("canvas");p.width=n,p.height=s;let f=p.getContext("2d",{alpha:!1});if(f&&m){f.fillStyle=d,f.fillRect(0,0,n,s),f.drawImage(m,0,0,n,s);let g=await new Promise(A=>{p.toBlob(A,"image/jpeg",.92)});if(g){let A=await ce(g);if(A)return{blob:g,base64:A,mediaType:"image/jpeg"}}}}catch{}return{base64:h,mediaType:"image/svg+xml"}}async function vt(o){try{let e=o.getBoundingClientRect(),t=Math.round(e.width)||o.offsetWidth||400,a=Math.round(e.height)||o.offsetHeight||300;if(t<30||a<30)return null;let r=o.tagName.toLowerCase()==="svg"?o:o.querySelector("svg");if(r&&o.querySelectorAll("input, select, textarea").length===0)try{let f=await Wt(r);if(f.base64&&f.base64.length<=Pe)return{mediaType:f.mediaType,base64:f.base64,alt:o.getAttribute("aria-label")||r.getAttribute("aria-label")||"Captura de diagrama/gr\xE1fico",source:"visual_snapshot",captureStatus:"captured",textContext:he(r)}}catch{}if(o instanceof HTMLCanvasElement)try{let f=await ye(o),g=await ce(f);if(g)return{mediaType:"image/jpeg",base64:g,alt:o.getAttribute("aria-label")||"Captura de canvas visual",source:"canvas_snapshot",captureStatus:"captured"}}catch{}let n="#ffffff";try{let f=o;for(;f&&f!==document.documentElement;){let A=(window.getComputedStyle?window.getComputedStyle(f):null)?.backgroundColor;if(A&&A!=="transparent"&&A!=="rgba(0, 0, 0, 0)"){n=A;break}f=f.parentElement}}catch{}let s=o.cloneNode(!0),i=Array.from(o.querySelectorAll("*")),d=Array.from(s.querySelectorAll("*"));for(let f=0;f<Math.min(i.length,d.length);f++){let g=i[f],A=d[f];if(!(!g||!A||!A.style))try{let b=window.getComputedStyle(g);A.style.color=b.color,A.style.backgroundColor=b.backgroundColor,A.style.borderColor=b.borderColor,A.style.borderWidth=b.borderWidth,A.style.borderStyle=b.borderStyle,A.style.fontSize=b.fontSize,A.style.fontFamily=b.fontFamily,A.style.fontWeight=b.fontWeight,A.style.lineHeight=b.lineHeight,A.style.letterSpacing=b.letterSpacing,A.style.textAlign=b.textAlign}catch{}}let l=Math.min(2,Math.max(1,1200/Math.max(t,a))),u=Math.round(t*l),h=Math.round(a*l),c=`
      <svg xmlns="http://www.w3.org/2000/svg" width="${u}" height="${h}" viewBox="0 0 ${t} ${a}">
        <foreignObject width="${t}" height="${a}">
          <div xmlns="http://www.w3.org/1999/xhtml" style="background:${n};width:100%;height:100%;overflow:hidden;box-sizing:border-box;">
            ${s.outerHTML}
          </div>
        </foreignObject>
      </svg>
    `,m=new Blob([c],{type:"image/svg+xml;charset=utf-8"}),p=URL.createObjectURL(m);try{let f=new Image;await new Promise((b,y)=>{let v=setTimeout(()=>y(new Error("Timeout render ForeignObject")),2500);f.onload=()=>{clearTimeout(v),b()},f.onerror=()=>{clearTimeout(v),y(new Error("Falha ao carregar ForeignObject"))},f.src=p});let g=document.createElement("canvas");g.width=u,g.height=h;let A=g.getContext("2d",{alpha:!1});if(A){A.fillStyle=n,A.fillRect(0,0,u,h),A.drawImage(f,0,0,u,h);let b=await new Promise(y=>g.toBlob(y,"image/jpeg",.9));if(b){let y=await ce(b);if(y&&y.length<=Pe)return{mediaType:"image/jpeg",base64:y,alt:o.getAttribute("aria-label")||"Captura visual da \xE1rea (print-like)",source:"element_snapshot",captureStatus:"captured",textContext:he(o)}}}}finally{URL.revokeObjectURL(p)}}catch(e){console.warn("[EasyQuiz] Snapshot visual do n\xF3:",e)}return null}function Gt(o,e,t,a){if(t<=0||a<=0){let c=typeof o.getBoundingClientRect=="function"?o.getBoundingClientRect():{width:0,height:0};if(t=c.width||t,a=c.height||a,t<=0||a<=0){if(e&&/\b(icon|logo|avatar|badge|emoji|spinner|loading)\b/i.test(e))return!1;let p=o instanceof HTMLImageElement&&o.src||"";return p&&/\/icons?\/|\/logos?\/|\/avatars?\/|\/badges?\//i.test(p)?!1:!!(p||e)}}if(t<48||a<48||Math.max(t,a)/Math.max(1,Math.min(t,a))>15)return!1;let n=o.getAttribute("class")||"",s=o.getAttribute("aria-hidden"),i=o.getAttribute("role"),d=o instanceof HTMLImageElement&&o.src||"";if(s==="true"||i==="presentation"||i==="none")return!1;let l=/\b(icon|logo|avatar|badge|emoji|decoration|ornament|spinner|loading|thumbnail|profile|photo)\b/i;if(l.test(n)||e&&l.test(e)||d&&/\/icons?\/|\/logos?\/|\/avatars?\/|\/badges?\/|\/emojis?\//i.test(d)||e===""||e===" "||e==="-")return!1;let u=/\b(graph|chart|diagram|table|map|formula|equation|figure|plot|curve|histogram|scatter|matrix|image|foto|imagem|gráfico|tabela|mapa|fórmula|questão|enunciado|stimulus)\b/i;return u.test(e)||u.test(n)||o.closest('[data-question], [class*="question" i], [class*="prompt" i], [class*="stimulus" i], [class*="enunciado" i], [class*="statement" i], article, .problem, .exercise')?!0:t>=80&&a>=80}function he(o){let e=[],t=o.getAttribute("alt")||o.getAttribute("aria-label")||o.getAttribute("title")||"";t&&t.length>2&&e.push(`Alt: "${t}"`);let n=o.closest("figure")?.querySelector("figcaption")?.textContent?.trim();n&&n.length>2&&e.push(`Legenda: "${n}"`);let s=o.getAttribute("aria-describedby");if(s){let u=document.getElementById(s)?.textContent?.trim();u&&e.push(`Descri\xE7\xE3o: "${u.slice(0,200)}"`)}let i=o.parentElement;if(i){let l=R(i.textContent||"",300);l&&l.length>5&&l!==t&&e.push(`Contexto: "${l.slice(0,200)}"`)}if(o.tagName.toLowerCase()==="svg"){let l=Array.from(o.querySelectorAll("text, tspan")).map(u=>u.textContent?.trim()).filter(Boolean);l.length>0&&e.push(`R\xF3tulos/Textos do Gr\xE1fico: "${l.join(" | ")}"`)}let d=o.getAttribute("data-alt")||o.getAttribute("data-description")||"";return d&&e.push(`Data: "${d}"`),e.length===0?"":e.join(" | ")}async function So(o){let e=o.currentSrc||o.src;if(!e)return null;let t=(o.alt||o.getAttribute("aria-label")||"Imagem da quest\xE3o").slice(0,500);if(o.complete&&o.naturalWidth>0)try{let s=await ye(o),i=await ce(s);if(i&&i.length<=Pe)return{mediaType:"image/jpeg",base64:i,alt:t,source:e.slice(0,2e3),captureStatus:"captured",textContext:he(o)}}catch{}try{let s=await fetch(e,{mode:"cors"});if(s.ok){let i=await s.blob();if(i.type.startsWith("image/")){let d=await createImageBitmap(i),l=await ye(d);d.close();let u=await ce(l);if(u&&u.length<=Pe)return{mediaType:"image/jpeg",base64:u,alt:t,source:e.slice(0,2e3),captureStatus:"captured",textContext:he(o)}}}}catch{}if(e.startsWith("http")){let s=[`https://corsproxy.io/?${encodeURIComponent(e)}`,`https://api.allorigins.win/raw?url=${encodeURIComponent(e)}`],i=async d=>{let l=new AbortController,u=setTimeout(()=>l.abort(),1500);try{let h=await fetch(d,{signal:l.signal});if(clearTimeout(u),h.ok)return h;throw new Error("Proxy status "+h.status)}catch(h){throw clearTimeout(u),h}};try{let l=await(await Promise.any(s.map(i))).blob();if(l.type.startsWith("image/")||l.size>200){let u=await createImageBitmap(l),h=await ye(u);u.close();let c=await ce(h);if(c&&c.length<=Pe)return{mediaType:"image/jpeg",base64:c,alt:t,source:e.slice(0,2e3),captureStatus:"captured",textContext:he(o)}}}catch{}}let a=o.parentElement||o,r=await vt(a);if(r)return r;let n=he(o);return n||t?{mediaType:"image/jpeg",base64:"",alt:t,source:e.slice(0,2e3),captureStatus:"text_only",textContext:n||`Imagem da quest\xE3o (src: ${e.slice(0,100)})`}:null}function Lo(o){return o.querySelectorAll("path, line, polyline, polygon, circle, rect, text, image").length>0}function ko(o){try{let e=o.style.backgroundImage||(window.getComputedStyle?window.getComputedStyle(o).backgroundImage:"");if(e&&e.includes("url(")){let t=e.match(/url\(["']?([^"')]+)["']?\)/);if(t&&t[1]&&!t[1].startsWith("data:image/svg+xml"))return t[1]}}catch{}return null}function Mo(o,e){let t=o.closest('[data-easyquiz-id], button, [role="button"], [role="radio"], [role="checkbox"], [role="option"], label, .option-card, .quiz-option, .choice, .answer, [class*="option" i], [class*="choice" i], [class*="answer" i], li, tr');if(t&&t!==e&&H(t)&&!Z(t)&&!j(t)){let n=t.dataset.easyquizId||t.id||void 0,s=R(t.innerText||t.textContent||"",120),i=t.getAttribute("aria-label")||t.getAttribute("title")||"",d=s||i,l=n?` [id: ${n}]`:"";if(d)return{associatedLabel:`Alternativa/Op\xE7\xE3o: "${d}"${l}`,targetControlId:n};if(n)return{associatedLabel:`Alternativa/Op\xE7\xE3o ${l}`,targetControlId:n}}let a=o.closest("figure")?.querySelector("figcaption")?.textContent?.trim();if(a)return{associatedLabel:`Figura do Enunciado: "${R(a,100)}"`};let r=o.closest('[class*="prompt" i], [class*="stimulus" i], [class*="question-text" i], [class*="statement" i], header, h1, h2, h3, h4, p');if(r){let n=R(r.textContent||"",80);if(n)return{associatedLabel:`Gr\xE1fico do Enunciado: "${n}"`}}return{associatedLabel:"Gr\xE1fico/Imagem do Enunciado Principal"}}async function yt(o,e=!0){if(!e)return[];let t=[],a=0,r=35e5,n=(u,h)=>{if(!u)return!1;let c=u.base64?u.base64.length:0;if(c>0&&a+c>r)return!1;let m=Mo(h,o);return u.associatedLabel=m.associatedLabel,u.targetControlId=m.targetControlId,u.element=h,t.push(u),a+=c,t.filter(f=>f.captureStatus==="captured").length>=bt},s=[o],i=o.closest('article, .card, [class*="question" i], [class*="exercise" i], form, [data-test-id*="exercise" i], [data-testid*="exercise" i]');i&&i!==o&&i!==document.body&&H(i)&&s.push(i);let d=new Set;for(let u of s){let h=Array.from(u.querySelectorAll("img")).filter(c=>H(c)&&!j(c)&&!d.has(c));for(let c of h){d.add(c);try{let m=c.getBoundingClientRect(),p=c.naturalWidth||m.width||c.width||0,f=c.naturalHeight||m.height||c.height||0,g=c.alt||"";if(!Gt(c,g,p,f))continue;let A=await So(c);if(n(A,c))return t}catch{}}}let l=new Set;for(let u of s){let h=Array.from(u.querySelectorAll("svg")).filter(c=>{if(!H(c)||j(c)||l.has(c))return!1;let m=typeof c.getBoundingClientRect=="function"?c.getBoundingClientRect():{width:0,height:0},p=m.width||parseFloat(c.getAttribute("width")||"0"),f=m.height||parseFloat(c.getAttribute("height")||"0");return p<30||f<30?!1:Lo(c)});for(let c of h){l.add(c);try{let m=await Wt(c);if(m.base64){let p=he(c),f={mediaType:m.mediaType,base64:m.base64,alt:c.getAttribute("aria-label")||"Gr\xE1fico/Diagrama vetorial da quest\xE3o",source:"svg",captureStatus:"captured",textContext:p};if(n(f,c))return t}}catch{let m=c.closest('.trig-diagram-container, [class*="diagram" i], [class*="graph" i], figure')||c.parentElement||c,p=await vt(m);if(p){if(n(p,c))return t}else{let f=he(c);if(f){let g={mediaType:"image/jpeg",base64:"",alt:c.getAttribute("aria-label")||"Gr\xE1fico vetorial",source:"svg",captureStatus:"text_only",textContext:f};n(g,c)}}}}}if(t.filter(u=>u.captureStatus==="captured").length<bt){let u=Array.from(o.querySelectorAll("canvas")).filter(h=>H(h)&&!j(h));for(let h of u)try{let c=await ye(h),m=await ce(c);if(m){let p={mediaType:"image/jpeg",base64:m,alt:h.getAttribute("aria-label")||"Gr\xE1fico Canvas inline",source:"canvas",captureStatus:"captured"};if(n(p,h))return t}}catch{let c=await vt(h.parentElement||h);if(n(c,h))return t}}if(t.filter(u=>u.captureStatus==="captured").length<bt){let u=Array.from(o.querySelectorAll('[style*="background-image"], .option-image, .question-media')).filter(h=>H(h)&&!j(h));for(let h of u){let c=ko(h);if(!c)continue;let m=h.getBoundingClientRect();if(Gt(h,h.getAttribute("aria-label")||"",m.width,m.height))try{let p=await fetch(c,{mode:"cors"});if(p.ok){let f=await p.blob();if(f.type.startsWith("image/")){let g=await createImageBitmap(f),A=await ye(g);g.close();let b=await ce(A);if(b){let y={mediaType:"image/jpeg",base64:b,alt:"Imagem de fundo da alternativa",source:c.slice(0,2e3),captureStatus:"captured"};if(n(y,h))return t}}}}catch{try{let f=await(await fetch(c,{mode:"no-cors"})).blob();if(f.size>100){let g=await createImageBitmap(f),A=await ye(g);g.close();let b=await ce(A);if(b&&b.length>100){let y={mediaType:"image/jpeg",base64:b,alt:"Imagem CSS background",source:c.slice(0,2e3),captureStatus:"captured"};if(n(y,h))return t}}}catch{}}}}return t}function Io(o,e=""){if(typeof document>"u")return!1;let t=o||document.body,a=(e+" "+(t.textContent||"")).toLowerCase();return!!t.querySelector('.celebration-icon, [class*="celebrat" i], [class*="conclu" i], [class*="finish" i], [class*="result" i], [class*="score-screen" i], [data-testid*="completion" i], [data-functional-selector*="game-over" i], .perseus-message-renderer, [data-congratulations]')&&(a.includes("parab\xE9ns")||a.includes("conclu")||a.includes("finaliz")||a.includes("resultado")||a.includes("pontua")||a.includes("sucesso")||a.includes("\u{1F3C6}")||a.includes("game over")||a.includes("great job"))?!0:["parab\xE9ns! lista de exerc\xEDcios conclu\xEDda","exerc\xEDcios conclu\xEDda","lista de exerc\xEDcios conclu\xEDda","atividade conclu\xEDda","atividade finalizada","finalizado com sucesso","finalizada com sucesso","simulado conclu\xEDdo","simulado finalizado","question\xE1rio conclu\xEDdo","question\xE1rio finalizado","voc\xEA concluiu a atividade","voc\xEA concluiu o question\xE1rio","sua resposta foi registrada","todas as perguntas foram respondidas","quiz completed","exercise completed","activity completed","all questions answered","view results","game over","leaderboard","scoreboard","awesome","great job","you got it right","mission complete","your response has been recorded","sua resposta foi registrada"].some(s=>a.includes(s))}var Je=class{active=!1;callbacks;isProcessing=!1;observer=null;mutationTimer=null;heartbeatTimer=null;abortController=null;errorCount=0;resolvedSigs=new Set;advancedSigs=new Set;hasPendingMutationDuringProcessing=!1;lastContentSig="";lastAttemptSig="";lastAttemptTime=0;replanCount=new Map;constructor(e){this.callbacks=e}isActive(){return this.active}start(){this.active||(this.active=!0,this.advancedSigs.clear(),this.hasPendingMutationDuringProcessing=!1,this.callbacks.onStatusChange("waiting","> [SYS] Autopilot ENGAGED. Monitorando..."),typeof MutationObserver<"u"&&(this.observer=new MutationObserver(()=>{if(this.active){if(this.isProcessing){this.hasPendingMutationDuringProcessing=!0;return}this.mutationTimer&&clearTimeout(this.mutationTimer),this.mutationTimer=window.setTimeout(()=>{this.mutationTimer=null,this.isProcessing||this.checkAndAnalyze()},120)}}),this.observer.observe(document.body,{subtree:!0,childList:!0,characterData:!0,attributes:!0})),this.scheduleHeartbeat(),this.checkAndAnalyze())}stop(){if(this.active=!1,this.abortController){try{this.abortController.abort()}catch{}this.abortController=null}this.mutationTimer&&(clearTimeout(this.mutationTimer),this.mutationTimer=null),this.heartbeatTimer&&(clearTimeout(this.heartbeatTimer),this.heartbeatTimer=null),this.observer?.disconnect(),this.observer=null,this.isProcessing=!1,this.resolvedSigs.clear(),this.advancedSigs.clear(),this.hasPendingMutationDuringProcessing=!1,this.replanCount.clear(),this.callbacks.onStatusChange("idle","> [SYS] Autopilot DESATIVADO pelo usu\xE1rio.","text-yellow")}scheduleHeartbeat(){this.heartbeatTimer&&clearTimeout(this.heartbeatTimer),this.heartbeatTimer=window.setTimeout(()=>{this.heartbeatTimer=null,this.active&&!this.isProcessing&&this.checkAndAnalyze(),this.active&&this.scheduleHeartbeat()},3e3)}sleep(e){return new Promise(t=>{if(!this.active)return t();let a=null,r=()=>{a&&clearTimeout(a),t()};a=window.setTimeout(t,e),this.abortController?.signal.addEventListener("abort",r,{once:!0})})}async checkAndAnalyze(){if(!(!this.active||this.isProcessing))try{this.isProcessing=!0;let e=ue(!1);if(e||(e=le()),!this.active)return;if(!e){this.callbacks.onStatusChange("waiting","> [SYS] Monitorando p\xE1gina... Aguardando elementos.");return}if(Io(e.scope,e.questionText)){this.callbacks.onStatusChange("idle","> [SYS] \u{1F3C6} Atividade conclu\xEDda! Autopilot finalizado.","text-green"),this.stop();return}if(this.callbacks.isManualModeActive?.()){this.callbacks.onStatusChange("waiting","> [SYS] Gabarito manual ativo. Aguardando voc\xEA avan\xE7ar...","text-yellow");return}let t=dt(e);if(this.resolvedSigs.has(t))return;let a=Date.now();if(t===this.lastAttemptSig&&a-this.lastAttemptTime<1500)return;if(t!==this.lastContentSig){if(this.callbacks.onStatusChange("waiting","> [SYS] Aguardando estabiliza\xE7\xE3o da p\xE1gina...","text-yellow"),await this.sleep(600),!this.active)return;let i=ue(!1)||le();i&&(e=i,t=dt(e)),this.lastContentSig!==""&&(this.callbacks.onStatusChange("waiting","> [SYS] Nova quest\xE3o detectada! Analisando...","text-green"),this.callbacks.onPageAdvance?.(),this.errorCount=0)}this.lastContentSig=t,this.lastAttemptSig=t,this.lastAttemptTime=a;let n=e.controls.filter(i=>i.role==="answer"),s=Ve(e.questionText);if(n.length===0&&s){this.callbacks.onStatusChange("waiting","> [DOM] Quest\xE3o identificada. Aguardando renderiza\xE7\xE3o dos controles...","text-yellow");for(let i=0;i<14;i++){if(await this.sleep(250),!this.active)return;let d=ue(!1)||le();if(d&&d.controls.filter(l=>l.role==="answer").length>0){e=d,n=e.controls.filter(l=>l.role==="answer");break}}}if(n.length>0||s){if(this.callbacks.onStatusChange("analyzing","> [IA] Quest\xE3o detectada. Consultando IA...","text-blue"),fe(),e?.scope&&He(e.scope),!this.active)return;this.abortController=new AbortController;let i=await this.callbacks.onRequestAnalysis(1,this.abortController.signal);if(this.abortController=null,!this.active)return;if(i){if(this.callbacks.onStatusChange("analyzing",`> [IA] (${i.usedModel||"gemini"}) Confian\xE7a: ${(i.confidence*100).toFixed(1)}% | Modo: ${i.mode}`,"text-blue"),this.callbacks.onStatusChange("analyzing",`> [IA] Racioc\xEDnio: ${i.rationale}`,"text-blue"),this.callbacks.onStatusChange("analyzing",`> [IA] A\xE7\xF5es: ${i.actions.length}`,"text-blue"),this.errorCount=0,i.memoryToStore&&this.callbacks.onStatusChange("analyzing",`> [IA] \u{1F9E0} Mem\xF3ria RAG: "${i.memoryToStore}"`,"text-yellow"),i.pageType==="conclusion"){this.callbacks.onStatusChange("idle","> [SYS] Atividade conclu\xEDda! Desligando Autopilot.","text-green"),this.stop();return}if(i.actions.length===0){let l=(this.replanCount.get(t)||0)+1;if(this.replanCount.set(t,l),l<3){this.callbacks.onStatusChange("waiting",`> [AVISO] Nenhuma resposta formulada para esta quest\xE3o. Retentando (${l}/3)...`,"text-yellow"),await this.sleep(1200),this.lastAttemptTime=0;return}}let d=(this.replanCount.get(t)||0)+1;this.replanCount.set(t,d),(i.actions.length>0||d>=3)&&this.resolvedSigs.add(t)}else{this.errorCount++;let d=this.errorCount===1?3e3:5e3;this.callbacks.onStatusChange("waiting",`> [AVISO] Falha na an\xE1lise (${this.errorCount}). Retentando em ${d/1e3}s...`,"text-yellow"),await this.sleep(d),this.lastAttemptTime=0}}else{if(this.advancedSigs.has(t)||(this.callbacks.onStatusChange("analyzing","> [IA] P\xE1gina informativa ou texto de leitura. Consultando IA...","text-blue"),!this.active))return;this.abortController=new AbortController;let i=await this.callbacks.onRequestAnalysis(1,this.abortController.signal);if(this.abortController=null,!this.active)return;if(i){if(this.callbacks.onStatusChange("analyzing",`> [IA] (${i.usedModel||"gemini"}) Tipo: ${i.pageType} | Modo: ${i.mode}`,"text-blue"),this.callbacks.onStatusChange("analyzing",`> [IA] Racioc\xEDnio: ${i.rationale}`,"text-blue"),i.memoryToStore&&this.callbacks.onStatusChange("analyzing",`> [IA] \u{1F9E0} Absorvido: "${i.memoryToStore}"`,"text-yellow"),i.pageType==="conclusion"){this.callbacks.onStatusChange("idle","> [SYS] Atividade conclu\xEDda! Desligando Autopilot.","text-green"),this.stop();return}i.pageType==="info"?(this.callbacks.onStatusChange("advancing","> [IA] \u{1F4D6} Leitura conclu\xEDda. Avan\xE7ando com seguran\xE7a...","text-green"),await this.sleep(500)):i.pageType==="start"&&(this.callbacks.onStatusChange("advancing","> [SYS] In\xEDcio detectado. Iniciando...","text-blue"),await this.sleep(500)),this.errorCount=0,this.resolvedSigs.add(t),this.advancedSigs.add(t)}else{this.errorCount++;let d=this.errorCount===1?3e3:5e3;this.callbacks.onStatusChange("waiting",`> [AVISO] Falha ao processar p\xE1gina (${this.errorCount}). Retentando em ${d/1e3}s...`,"text-yellow"),await this.sleep(d),this.lastAttemptTime=0}}this.errorCount>=5&&(this.callbacks.onStatusChange("waiting","> [AVISO] Muitas falhas. Reiniciando contadores e aguardando 10s...","text-yellow"),this.errorCount=0,this.lastAttemptTime=0,await this.sleep(1e4))}catch(e){if(!this.active)return;let t=e instanceof Error?e.message:String(e);if(t.includes("cancelada")||t.includes("aborted"))return;/timeout|aborted|network|failed to fetch|cancelad/i.test(t)||this.errorCount++,console.warn("[EasyQuiz Autopilot]",e),this.callbacks.onStatusChange("error",`> [ERRO NO AUTOPILOT] ${t}`,"text-red")}finally{this.abortController=null,this.isProcessing=!1;let e=this.hasPendingMutationDuringProcessing;this.hasPendingMutationDuringProcessing=!1,this.active&&window.setTimeout(()=>void this.checkAndAnalyze(),e?300:750)}}};var k={canvasLogo:"data:image/png;base64,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dR/4337uYwwdXhTSKDB5oWAsGwgYGodS2wpYM8gEplWlTok0HWlElUTRdKKJ6My0nSYVScooVdtkmrZMOpkyk6JpQwKhDQEaJSkwBGPj2BiDjS+Xa7DMNROLJBBnwNg8z54/7Avn3vuctc/Lfln7tz8fCSH57LPPPmvte/f53v1b5zRt27YFAACApbu1aZpXTH0QS3Yw9QEAAAAAAjoAAACkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACh1MfAFTgM03TXDn1QQAAAPPmDjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAIC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",logo:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.8L19.2 8 12 11.2 4.8 8 12 4.8zM4 9.6l7 3.1v7.5l-7-3.5V9.6zm9 10.6v-7.5l7-3.1v7.1l-7 3.5z"/></svg>',rocket:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M13.13 2.81a.5.5 0 0 0-.46-.07c-.42.15-2.08.79-3.9 2.61-2.04 2.04-2.6 4.09-2.73 4.96l-.97.98a1 1 0 0 0-.29.71v2.12a1 1 0 0 0 .29.71l2.83 2.83a1 1 0 0 0 .71.29h2.12a1 1 0 0 0 .71-.29l.98-.97c.87-.13 2.92-.69 4.96-2.73 1.82-1.82 2.46-3.48 2.61-3.9a.5.5 0 0 0-.07-.46l-6.79-6.79zM4.5 16.5l-2.09 2.09a.5.5 0 0 0 .35.85h3.04l.35.35v3.04a.5.5 0 0 0 .85.35L9.09 21.1l-4.59-4.6z"/></svg>',play:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>',stop:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h12v12H6z"/></svg>',code:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>',terminal:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8h16v10zm-12-3l3-3-3-3 1.4-1.4L13.8 12l-4.4 4.4L8 15zm6 0h4v2h-4v-2z"/></svg>',inspector:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>',settings:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.49.49 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>',key:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M7 14c-2.76 0-5-2.24-5-5s2.24-5 5-5c2.42 0 4.44 1.72 4.9 4H22v4h-2v3h-3v-3h-2v3h-3v-3h-2.1c-.46 2.28-2.48 4-4.9 4zm0-7c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>',paste:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 2h-4.18C14.4 .84 13.3 0 12 0c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm7 18H5V4h2v3h10V4h2v16z"/></svg>',edit:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>',trash:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>',eraser:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M15.14 3c-.51 0-1.02.2-1.41.59L2.59 14.73c-.78.78-.78 2.05 0 2.83L6.44 21.4c.78.78 2.05.78 2.83 0l11.14-11.14c.78-.78.78-2.05 0-2.83l-3.86-3.84c-.39-.39-.9-.59-1.41-.59zm.71 2.71l3.15 3.15-3.15 3.15-3.15-3.15 3.15-3.15zm-4.57 4.57l3.15 3.15-4.57 4.57H6.71l-3-3 7.57-7.57z"/></svg>',save:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/></svg>',analyze:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L3 14h8l-2 8 12-12h-8l2-8z"/></svg>',apply:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>',close:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>',chevronRight:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>',chevronLeft:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>',eye:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>',eyeOff:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.44-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.17c0-1.66-1.34-3-3-3l-.17.02z"/></svg>',check:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>',clock:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>',copy:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>',refresh:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg>',chip:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4h12v16H6V4zm2 2v12h8V6H8zm-4 3h2v2H4V9zm0 4h2v2H4v-2zm16-4h2v2h-2V9zm0 4h2v2h-2v-2zM9 2h2v2H9V2zm4 0h2v2h-2V2zm-4 18h2v2H9v-2zm4 0h2v2h-2v-2z"/></svg>',moreVertical:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>',minimize:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M19 13H5v-2h14v2z"/></svg>',maximize:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/></svg>',dragHandle:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M10 9h4V6h-4v3zm0 5h4v-3h-4v3zm0 5h4v-3h-4v3zM4 9h4V6H4v3zm0 5h4v-3H4v3zm0 5h4v-3H4v3zm12-10V6h4v3h-4zm0 5h4v-3h-4v3zm0 5h4v-3h-4v3z"/></svg>',list:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/></svg>',folderTree:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6 10H6v-2h8v2zm4-4H6v-2h12v2z"/></svg>',folder:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/></svg>',file:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>',stopwatch:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M15 1H9v2h6V1zm-4 13h2V8h-2v6zm8.03-6.61l1.42-1.42c-.43-.51-.9-.99-1.41-1.41l-1.42 1.42A8.962 8.962 0 0 0 12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9a8.994 8.994 0 0 0 7.03-14.61zM12 20c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"/></svg>',plus:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>',listPlus:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h8v-2H7v2zm0 4h8v-2H7v2zM7 7v2h8V7H7zm11 6h-2v2h-2v2h2v2h2v-2h2v-2h-2v-2z"/></svg>',sparkles:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M9 21l-2.5-5.5L1 13l5.5-2.5L9 5l2.5 5.5L17 13l-5.5 2.5L9 21zm9.5-12.5l-1.5-3.5-3.5-1.5 3.5-1.5 1.5-3.5 1.5 3.5 3.5 1.5-3.5 1.5-1.5 3.5z"/></svg>',image:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>'};var Ge=class{element=null;shadow;isMinimized=!1;currentPlan=null;isDragging=!1;dragStartX=0;dragStartY=0;initialLeft=25;initialTop=25;onAdvanceCallback;constructor(e,t){this.shadow=e,this.onAdvanceCallback=t,this.initGlobalListeners()}initGlobalListeners(){window.addEventListener("popstate",()=>this.handlePageNavigated()),window.addEventListener("hashchange",()=>this.handlePageNavigated()),document.addEventListener("click",e=>{if(!this.isOpen())return;let t=e.target;if(!t||this.shadow.contains(t)||t.closest("#easyquiz-shadow-root"))return;let a=t.closest('button, [role="button"], a, input[type="submit"]');if(a){let r=(a.textContent||a.value||"").toLowerCase();/pr[oó]xim|avan[cç]|continu|verific|enviar|submit|confirm|checar|validar|next/i.test(r)&&setTimeout(()=>{this.isOpen()&&this.handlePageNavigated()},800)}},!0)}handlePageNavigated(){this.isOpen()&&(this.hide(),this.onAdvanceCallback?.())}isOpen(){return this.element!==null&&this.element.style.display!=="none"}show(e){this.currentPlan=e,this.element||this.createElement(),this.renderContent(),this.element&&(this.element.style.display="flex")}hide(){this.element&&(this.element.style.display="none")}minimize(){this.isMinimized=!0,this.element&&this.element.classList.add("minimized")}restore(){this.isMinimized=!1,this.element&&this.element.classList.remove("minimized")}createElement(){this.element=document.createElement("div"),this.element.className="eq-floating-hud",this.element.style.left=`${this.initialLeft}px`,this.element.style.top=`${this.initialTop}px`,this.element.innerHTML=`
      <!-- P\xEDlula compacta quando minimizado -->
      <div class="eq-fah-pill" id="eq-fah-pill" title="Clique para expandir gabarito interativo">
        <span class="eq-fah-pill-icon">${k.list}</span>
        <span id="eq-fah-pill-text">Gabarito Manual</span>
        <span class="eq-fah-pill-badge" id="eq-fah-pill-badge">0</span>
      </div>

      <!-- Cabe\xE7alho com barra de arraste -->
      <div class="eq-fah-header" id="eq-fah-header">
        <div class="eq-fah-title">
          <span style="display:flex; align-items:center;">${k.dragHandle}</span>
          <span>Gabarito Manual Interativo</span>
        </div>
        <div class="eq-fah-actions">
          <button class="eq-fah-btn" id="eq-fah-copy-md-btn" title="Copiar tudo formatado em Markdown">${k.copy}</button>
          <button class="eq-fah-btn" id="eq-fah-min-btn" title="Minimizar para p\xEDlula flutuante">${k.minimize}</button>
          <button class="eq-fah-btn" id="eq-fah-close-btn" title="Fechar gabarito">${k.close}</button>
        </div>
      </div>

      <!-- Corpo com as respostas organizadas -->
      <div class="eq-fah-body" id="eq-fah-body"></div>

      <!-- Rodap\xE9 com dica de avan\xE7o autom\xE1tico e bot\xE3o de c\xF3pia -->
      <div class="eq-fah-footer">
        <div class="eq-fah-footer-hint">
          <span style="color:#00ffcc; font-size:12px;">\u25CF</span>
          <span>Fechamento autom\xE1tico ao avan\xE7ar</span>
        </div>
        <button class="eq-fah-copy-all" id="eq-fah-copy-all-btn">Copiar Markdown</button>
      </div>
    `,this.shadow.appendChild(this.element),this.element.querySelector("#eq-fah-pill").addEventListener("click",()=>this.restore()),this.element.querySelector("#eq-fah-min-btn").addEventListener("click",()=>this.minimize()),this.element.querySelector("#eq-fah-close-btn").addEventListener("click",()=>this.hide());let r=this.element.querySelector("#eq-fah-copy-md-btn");r.addEventListener("click",()=>this.copyMarkdownToClipboard(r));let n=this.element.querySelector("#eq-fah-copy-all-btn");n.addEventListener("click",()=>this.copyMarkdownToClipboard(n));let s=this.element.querySelector("#eq-fah-header");this.setupDraggable(s)}setupDraggable(e){let t=a=>{if(a.target.closest(".eq-fah-btn"))return;a.preventDefault(),this.isDragging=!0,this.dragStartX=a.clientX,this.dragStartY=a.clientY;let r=this.element.getBoundingClientRect();this.initialLeft=r.left,this.initialTop=r.top;let n=i=>{if(!this.isDragging||!this.element)return;let d=i.clientX-this.dragStartX,l=i.clientY-this.dragStartY,u=Math.max(10,window.innerWidth-this.element.offsetWidth-10),h=Math.max(10,window.innerHeight-this.element.offsetHeight-10),c=Math.min(Math.max(10,this.initialLeft+d),u),m=Math.min(Math.max(10,this.initialTop+l),h);this.element.style.left=`${c}px`,this.element.style.top=`${m}px`},s=()=>{this.isDragging=!1,window.removeEventListener("mousemove",n),window.removeEventListener("mouseup",s)};window.addEventListener("mousemove",n),window.addEventListener("mouseup",s)};e.addEventListener("mousedown",t)}renderContent(){if(!this.element||!this.currentPlan)return;let e=this.element.querySelector("#eq-fah-body"),t=this.element.querySelector("#eq-fah-pill-text"),a=this.element.querySelector("#eq-fah-pill-badge");e.innerHTML="";let r=this.currentPlan,n=r.actions.filter(m=>m.t==="drag"),s=r.actions.filter(m=>{if(m.t!=="val")return!1;let p=C(m.id||"").toLowerCase();return!/continu|avan[cç]|pr[oó]xim|submet|enviar|check|verific/i.test(p)}),i=r.actions.filter(m=>m.t==="clk"||m.t==="chk"),d=r.actions.filter(m=>m.t==="sel"),l=n.length||s.length||i.length||d.length,u=document.createElement("div");u.className="eq-fah-meta";let h=document.createElement("span");h.textContent=`Modo: ${r.mode.replace("_"," ")}`;let c=document.createElement("span");if(c.className="eq-fah-meta-badge",c.textContent=`${Math.round(r.confidence*100)}% Confian\xE7a`,u.append(h,c),e.appendChild(u),n.length>0||r.mode==="categorizacao"||r.mode==="arrastar_soltar"){t.textContent=`Categoriza\xE7\xE3o (${n.length} itens)`,a.textContent=String(n.length);let m={};for(let p of n){let f=C(p.to)||"Geral";m[f]||(m[f]=[]),m[f].push(C(p.from))}for(let[p,f]of Object.entries(m)){let g=document.createElement("div"),A=/fato|true|verdadeiro|sim/i.test(p),b=/opini[aã]o|false|falso|n[aã]o/i.test(p);g.className=`eq-fah-group ${A?"group-fato":b?"group-opiniao":""}`;let y=document.createElement("div");y.className="eq-fah-group-title",y.textContent=`\u{1F4C1} ${p} (${f.length})`,g.appendChild(y);let v=document.createElement("div");v.className="eq-fah-group-items";for(let x of f){let q=document.createElement("div");q.className="eq-fah-item";let T=document.createElement("span");T.className="eq-fah-item-text",T.textContent=x,q.appendChild(T);let M=document.createElement("button");M.className="eq-fah-copy-inline",M.textContent="Copiar",M.addEventListener("click",()=>{navigator.clipboard.writeText(x),M.textContent="\u2713 Copiado",setTimeout(()=>M.textContent="Copiar",1200)}),q.appendChild(M),v.appendChild(q)}g.appendChild(v),e.appendChild(g)}}else if(s.length>0){t.textContent=`Preenchimento (${s.length} campos)`,a.textContent=String(s.length);let m=document.createElement("div");m.className="eq-fah-group";let p=document.createElement("div");p.className="eq-fah-group-title",p.textContent="\u{1F4DD} Respostas para os Campos de Texto:",m.appendChild(p);let f=document.createElement("div");f.className="eq-fah-group-items";for(let g=0;g<s.length;g++){let A=s[g],b=document.createElement("div");b.className="eq-fah-item";let y=Me(A.id);(!y||/^[#\.\$]|input|mat-|cell|field|q[0-9]|eq-/i.test(y))&&(y=`Campo ${g+1}`);let v=String(A.v??""),x=document.createElement("div");x.className="eq-fah-field-box";let q=document.createElement("div");q.className="eq-fah-field-label",q.textContent=y,x.appendChild(q);let T=document.createElement("div");T.className="eq-fah-field-val",T.textContent=v,x.appendChild(T),b.appendChild(x);let M=document.createElement("button");M.className="eq-fah-copy-inline",M.textContent="Copiar",M.addEventListener("click",()=>{navigator.clipboard.writeText(v),M.textContent="\u2713 Copiado",setTimeout(()=>M.textContent="Copiar",1200)}),b.appendChild(M),f.appendChild(b)}m.appendChild(f),e.appendChild(m)}else if(i.length>0){t.textContent=`Op\xE7\xF5es (${i.length} marcadas)`,a.textContent=String(i.length);let m=document.createElement("div");m.className="eq-fah-group";let p=document.createElement("div");p.className="eq-fah-group-title",p.textContent="\u{1F3AF} Alternativa(s) Correta(s):",m.appendChild(p);let f=document.createElement("div");f.className="eq-fah-group-items";for(let g=0;g<i.length;g++){let A=i[g],b=document.createElement("div");b.className="eq-fah-item";let y=Me(A.id);(!y||/^(eq-|#|\$|\.|input_|mat-|choice_|radio_|chk_)/i.test(y))&&A.v&&(y=String(A.v)),y=C(y),/^(eq-|#|\$|\.|input_|mat-|choice_|radio_|chk_)/i.test(y)&&(y="");let v="",x=y.match(/^(\([A-Za-z0-9]\)|[A-Za-z0-9][\)\.\:\-])\s*(.*)$/);x?(v=x[1].replace(/[\(\)\.\:\-\s]/g,"").toUpperCase(),y=x[2].trim()||y):i.length>1&&(v=String.fromCharCode(65+g));let q=document.createElement("div");if(q.style.display="flex",q.style.alignItems="center",q.style.gap="8px",q.style.flex="1",v){let E=document.createElement("span");E.className="eq-fah-letter-badge",E.textContent=v,q.appendChild(E)}let T=document.createElement("span");T.className="eq-fah-item-text",T.textContent=y||(v?`Alternativa ${v}`:"Alternativa Selecionada"),q.appendChild(T),b.appendChild(q);let M=document.createElement("button");M.className="eq-fah-copy-inline",M.textContent="Copiar",M.addEventListener("click",()=>{navigator.clipboard.writeText(y||v),M.textContent="\u2713 Copiado",setTimeout(()=>M.textContent="Copiar",1200)}),b.appendChild(M),f.appendChild(b)}m.appendChild(f),e.appendChild(m)}else if(d.length>0){t.textContent=`Sele\xE7\xE3o (${d.length} listas)`,a.textContent=String(d.length);let m=document.createElement("div");m.className="eq-fah-group";let p=document.createElement("div");p.className="eq-fah-group-title",p.textContent="\u{1F4CB} Op\xE7\xF5es para Selecionar na Lista:",m.appendChild(p);let f=document.createElement("div");f.className="eq-fah-group-items";for(let g=0;g<d.length;g++){let A=d[g],b=document.createElement("div");b.className="eq-fah-item";let y=Me(A.id);(!y||/^[#\.\$]|select|input|mat-|cell|field|q[0-9]|eq-/i.test(y))&&(y=`Lista ${g+1}`);let q=(Array.isArray(A.v)?A.v:[String(A.v??"")]).map(S=>{let w=P(A.id,void 0,!0)||P(C(A.id),void 0,!0),I=w instanceof HTMLSelectElement?w:w?.querySelector("select");if(I){let O=C(S).toLowerCase();for(let B=0;B<I.options.length;B++){let N=I.options[B];if(N.value.toLowerCase()===O||C(N.textContent).toLowerCase()===O){let X=C(N.textContent);if(X&&!X.toLowerCase().includes("selecione"))return X}}}return S}).join(", "),T=document.createElement("div");T.className="eq-fah-field-box";let M=document.createElement("div");M.className="eq-fah-field-label",M.textContent=y,T.appendChild(M);let E=document.createElement("div");E.className="eq-fah-field-val",E.textContent=q,T.appendChild(E),b.appendChild(T);let L=document.createElement("button");L.className="eq-fah-copy-inline",L.textContent="Copiar",L.addEventListener("click",()=>{navigator.clipboard.writeText(q),L.textContent="\u2713 Copiado",setTimeout(()=>L.textContent="Copiar",1200)}),b.appendChild(L),f.appendChild(b)}m.appendChild(f),e.appendChild(m)}else{t.textContent="Gabarito",a.textContent="0";let m=document.createElement("div");m.style.padding="10px",m.style.color="#888",m.textContent="Nenhuma resposta direta para exibir.",e.appendChild(m)}if(r.rationale){let m=document.createElement("div");m.className="eq-fah-rationale",m.textContent=`\u{1F4A1} Racioc\xEDnio da IA: ${r.rationale}`,e.appendChild(m)}}generateMarkdown(){if(!this.currentPlan)return"";let e=this.currentPlan,t=[];t.push("# Gabarito da Quest\xE3o \u2014 EasyQuiz Pro"),t.push(`- **Modo:** ${e.mode}`),t.push(`- **Confian\xE7a:** ${(e.confidence*100).toFixed(0)}%`),t.push("");let a=e.actions.filter(i=>i.t==="drag"),r=e.actions.filter(i=>i.t==="val"),n=e.actions.filter(i=>i.t==="clk"||i.t==="chk"),s=e.actions.filter(i=>i.t==="sel");if(a.length>0){t.push("## \u{1F4C2} Categoriza\xE7\xE3o:");let i={};for(let d of a){let l=C(d.to)||"Geral";i[l]||(i[l]=[]),i[l].push(C(d.from))}for(let[d,l]of Object.entries(i)){t.push(`### Categoria: ${d}`);for(let u of l)t.push(`- ${u}`);t.push("")}}else if(r.length>0){t.push("## \u270F\uFE0F Respostas para Preenchimento:");for(let i of r){let d=C(i.id);t.push(`- **${d||"Campo"}:** \`${i.v}\``)}t.push("")}else if(n.length>0){t.push("## \u2705 Alternativas Corretas:");for(let i=0;i<n.length;i++){let d=n[i],l=Me(d.id);(!l||/^(eq-|#|\$|\.|input_|mat-|choice_|radio_|chk_)/i.test(l))&&d.v&&(l=String(d.v)),l=C(l),/^(eq-|#|\$|\.|input_|mat-|choice_|radio_|chk_)/i.test(l)&&(l="");let u=n.length>1?`${String.fromCharCode(65+i)}) `:"";t.push(`- [x] ${u}${l||"Alternativa "+String.fromCharCode(65+i)}`)}t.push("")}else if(s.length>0){t.push("## \u{1F4CB} Op\xE7\xF5es Selecionadas em Lista:");for(let i of s){let d=C(i.id)||"Lista",l=Array.isArray(i.v)?i.v.join(", "):String(i.v??"");t.push(`- **${d}:** \`${l}\``)}t.push("")}return e.rationale&&(t.push("---"),t.push(`**\u{1F4A1} Racioc\xEDnio:** ${e.rationale}`)),t.join(`
`)}copyMarkdownToClipboard(e){let t=this.generateMarkdown();t&&navigator.clipboard.writeText(t).then(()=>{let a=e.innerHTML;e.id==="eq-fah-copy-md-btn"?e.innerHTML='<span style="font-size:10px; color:#00ffcc; font-weight:bold;">\u2713</span>':e.innerHTML="\u2713 Copiado!",setTimeout(()=>{e.innerHTML=a},1500)})}};var Yt=`
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&display=swap');

  :host {
    all: initial;
    color-scheme: dark;
    font-family: 'Nunito', 'gg sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-size: 13px;
    line-height: 1.5;

    /* === Tema Legacy: preto, branco e acento dourado do modo === */
    --eq-bg:             #070707;
    --eq-surface:        #111111;
    --eq-surface-raised: #181818;
    --eq-surface-hover:  #242424;
    --eq-border:         rgba(255,255,255,0.14);
    --eq-text:           #bdbdbd;
    --eq-text-bright:    #ffffff;
    --eq-muted:          #777777;
    --eq-accent:         #ffffff;
    --eq-accent-hover:   #e5e5e5;
    --eq-icon-accent:    #fbbf24;
    --eq-success:        #4ade80;
    --eq-warning:        #fbbf24;
    --eq-danger:         #f87171;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border-radius: 0 !important;
  }

  :host, :host * {
    border-radius: 0 !important;
  }

  /* ===== ABA RETR\xC1TIL LATERAL ESQUERDA (DOCK TOGGLE) ===== */
  .eq-dock-toggle {
    pointer-events: auto;
    position: absolute;
    left: -38px;
    top: 50%;
    transform: translateY(-50%);
    width: 38px;
    height: 84px;
    background: var(--eq-surface);
    border: 1px solid var(--eq-border);
    border-right: none;
    border-radius: 0;
    color: var(--eq-text-bright);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    cursor: pointer;
    box-shadow: -4px 0 16px rgba(0, 0, 0, 0.4);
    transition: background 0.15s, color 0.15s, width 0.2s, left 0.2s;
    user-select: none;
    z-index: 10;
  }

  .eq-dock-toggle:hover {
    background: var(--eq-surface-hover);
    color: var(--eq-text-bright);
    width: 44px;
    left: -44px;
  }

  .eq-dock-toggle-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .eq-dock-toggle-label {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  /* ===== BOT\xC3O FLUTUANTE INFERIOR RENOVADO (FLOATING CAPSULE LAUNCHER) ===== */
  .eq-launcher {
    pointer-events: auto;
    position: fixed;
    right: 20px;
    bottom: 20px;
    z-index: 2147483646;
    width: 44px;
    height: 44px;
    padding: 0;
    justify-content: center;
    background: rgba(17,17,17,0.92);
    border: 1px solid var(--eq-border);
    border-radius: 0;
    color: var(--eq-text-bright);
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
    transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    user-select: none;
    font-family: inherit;
    font-weight: 600;
    font-size: 13px;
    backdrop-filter: blur(18px) saturate(140%);
    -webkit-backdrop-filter: blur(18px) saturate(140%);
  }

  .eq-launcher:hover {
    border-color: var(--eq-accent);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
    transform: translateY(-2px);
    background: var(--eq-surface-raised);
  }

  .eq-launcher:active {
    transform: translateY(1px) scale(0.98);
  }

  .eq-launcher-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--eq-icon-accent);
  }

  .eq-launcher-icon img {
    width: 24px;
    height: 24px;
    object-fit: contain;
    filter: sepia(1) saturate(5) hue-rotate(355deg) brightness(1.2);
  }

  .eq-launcher-icon svg,
  .eq-dock-toggle-icon svg {
    width: 22px;
    height: 22px;
    color: var(--eq-icon-accent);
  }

  .eq-launcher-dot {
    display: none;
  }

  .eq-launcher-dot.busy {
    background: var(--eq-accent);
    animation: eq-pulse-gentle 1.5s infinite alternate;
  }

  .eq-launcher-dot.error {
    background: var(--eq-danger);
    animation: none;
  }

  .eq-launcher-dot.stopped {
    background: var(--eq-warning);
    box-shadow: 0 0 6px rgba(215, 186, 125, 0.6);
    animation: none;
  }

  @keyframes eq-pulse-gentle {
    0% { opacity: 0.6; }
    100% { opacity: 1; }
  }

  /* ===== SIDEBAR FIXA LATERAL DIREITA ESTILO VS CODE ===== */
  .eq-sidebar {
    pointer-events: auto;
    position: fixed;
    right: 0;
    top: 0;
    width: 440px;
    max-width: 95vw;
    height: 100vh;
    z-index: 2147483647;
    background: rgba(13, 13, 13, 0.25);
    border-left: 1px solid rgba(255,255,255,0.12);
    color: var(--eq-text);
    display: flex;
    flex-direction: row;
    box-shadow: -12px 0 40px rgba(0, 0, 0, 0.45);
    transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), background 0.2s ease;
    transform: translateX(0);
    overflow: visible;
    backdrop-filter: blur(18px) saturate(160%) brightness(0.9);
    -webkit-backdrop-filter: blur(18px) saturate(160%) brightness(0.9);
  }

  .eq-sidebar.eq-collapsed {
    transform: translateX(100%);
  }

  .eq-sidebar.eq-collapsed .eq-dock-toggle-icon {
    transform: rotate(180deg);
  }

  /* ===== ACTIVITY BAR VERTICAL (COLUNA EM P\xC9 ESTILO VS CODE) ===== */
  .eq-activity-bar {
    width: 52px;
    min-width: 52px;
    background: var(--eq-bg);
    border-right: 1px solid var(--eq-border);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    user-select: none;
    z-index: 5;
  }

  .eq-activity-top,
  .eq-activity-bottom {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
    align-items: center;
  }

  .eq-activity-bottom {
    margin-top: auto;
  }

  .eq-activity-btn {
    position: relative;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #ffffff;
    border: 1px solid rgba(15,15,15,0.08);
    border-radius: 0;
    color: var(--eq-muted);
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: none;
  }

  .eq-activity-btn:hover {
    color: #111111;
    background: #f5f5f5;
    border-color: rgba(15,15,15,0.12);
    transform: translateX(2px);
  }

  .eq-activity-btn.active {
    color: #111111;
    background: #ffffff;
    border-color: rgba(15,15,15,0.12);
    box-shadow: none;
    animation: eq-activity-in 0.35s cubic-bezier(0.16,1,0.3,1);
  }

  @keyframes eq-activity-in {
    0% { opacity: 0.35; transform: translateX(-5px) scale(0.92); }
    100% { opacity: 1; transform: translateX(0) scale(1); }
  }

  .eq-activity-indicator {
    position: absolute;
    left: -2px;
    top: 6px;
    bottom: 6px;
    width: 3px;
    background: #f7c94d;
    border-radius: 0;
    opacity: 0;
    transform: scaleY(0.4);
    transition: opacity 0.15s, transform 0.15s;
  }

  .eq-activity-btn.active .eq-activity-indicator {
    opacity: 1;
    transform: scaleY(1);
  }

  .eq-activity-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
  }

  /* ===== CORPO DA SIDEBAR (PAINEL DIREITO) ===== */
  .eq-sidebar-body {
    flex: 1;
    display: flex;
    flex-direction: column;
    background: rgba(17, 17, 17, 0.72);
    overflow: hidden;
    min-width: 0;
    backdrop-filter: blur(18px) saturate(150%);
    -webkit-backdrop-filter: blur(18px) saturate(150%);
  }

  .eq-view-pane {
    background: rgba(13,13,13,0.2);
    backdrop-filter: blur(14px) saturate(140%);
    -webkit-backdrop-filter: blur(14px) saturate(140%);
  }

  /* Cabe\xE7alho */
  .eq-header {
    background: rgba(17,17,17,0.78);
    border-bottom: 1px solid var(--eq-border);
    height: 58px;
    min-height: 58px;
    padding: 0 18px;
    backdrop-filter: blur(18px) saturate(140%);
    -webkit-backdrop-filter: blur(18px) saturate(140%);
    display: flex;
    align-items: center;
    justify-content: space-between;
    user-select: none;
  }

  .eq-brand {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .eq-brand-icon {
    width: 30px;
    height: 30px;
    flex: 0 0 30px;
    overflow: hidden;
    border: 1px solid rgba(251,191,36,0.55);
    background: transparent;
    padding: 2px;
    border: 0;
    color: var(--eq-icon-accent);
    display: flex;
    align-items: center;
  }

  .eq-brand-icon img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    filter: sepia(1) saturate(5) hue-rotate(355deg) brightness(1.2);
  }

  #eq-view-resolver {
    background: #ffffff;
    color: #111111;
    padding: 18px;
    border: 1px solid rgba(15,15,15,0.06);
    box-shadow: none;
    animation: eq-resolver-entry 0.35s cubic-bezier(0.16,1,0.3,1);
  }

  @keyframes eq-resolver-entry {
    0% { opacity: 0; transform: translateY(12px); filter: blur(8px); }
    100% { opacity: 1; transform: translateY(0); filter: blur(0); }
  }

  .eq-resolver-hero {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 18px;
  }

  .eq-resolver-brand {
    display: flex;
    align-items: center;
    gap: 14px;
    min-width: 0;
  }

  .eq-brand-mark {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 78px;
    height: 78px;
    background: rgba(247,201,77,0.08);
    border: 1px solid rgba(247,201,77,0.28);
    box-shadow: none;
    flex-shrink: 0;
  }

  .eq-brand-mark img {
    width: 52px;
    height: 52px;
    object-fit: contain;
    filter: sepia(1) saturate(4) hue-rotate(340deg) brightness(1.35);
  }

  .eq-brand-copy {
    min-width: 0;
  }

  .eq-brand-title {
    color: #111111;
    font-size: 28px;
    font-weight: 900;
    line-height: 1;
    letter-spacing: 0.02em;
  }

  .eq-brand-subline {
    margin-top: 7px;
    color: rgba(17,17,17,0.66);
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .eq-resolver-tools {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .eq-more-btn {
    width: 34px;
    height: 34px;
    background: #ffffff;
    border: 1px solid rgba(15,15,15,0.12);
    color: #111111;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .eq-more-btn:hover {
    background: #f5f5f5;
    border-color: rgba(15,15,15,0.2);
    transform: translateY(-1px);
  }

  .eq-resolver-menu {
    position: absolute;
    top: calc(100% + 8px);
    right: 0;
    width: 190px;
    background: rgba(255,255,255,0.9);
    border: 1px solid rgba(15,15,15,0.1);
    box-shadow: 0 14px 30px rgba(0,0,0,0.08);
    backdrop-filter: blur(14px) saturate(130%);
    -webkit-backdrop-filter: blur(14px) saturate(130%);
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 6px;
    z-index: 40;
  }

  .eq-resolver-menu[hidden] { display: none !important; }

  .eq-menu-action {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 8px;
    color: #111111;
    background: transparent;
    border: 0;
    padding: 9px 10px;
    font: inherit;
    text-align: left;
    cursor: pointer;
    transition: background 0.2s ease;
  }

  .eq-menu-action:hover {
    background: rgba(247,201,77,0.12);
  }

  .eq-resolver-cta-row {
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 0 0 16px;
  }

  .eq-resolve-primary {
    flex: 1;
    min-height: 52px;
    border: 1px solid #ebc14e;
    background: #f4d16d;
    color: #111111;
    font-weight: 900;
    font-size: 14px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    box-shadow: none;
    cursor: pointer;
    transition: transform 0.2s ease, background 0.2s ease, border-color 0.2s ease;
    animation: eq-primary-pulse 1.8s ease-in-out infinite;
  }

  @keyframes eq-primary-pulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(244, 209, 109, 0.5); }
    50% { box-shadow: 0 0 0 4px rgba(244, 209, 109, 0.18); }
  }

  .eq-resolve-primary:hover {
    transform: translateY(-1px);
    background: #efc751;
  }

  .eq-resolve-primary.is-running {
    background: #dcae17;
    border-color: #c19300;
    color: #111111;
  }

  .eq-resolve-secondary {
    width: 42px;
    height: 42px;
    border: 1px solid rgba(15,15,15,0.12);
    background: #ffffff;
    color: #111111;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .eq-resolve-secondary:hover {
    background: #f5f5f5;
    border-color: rgba(15,15,15,0.2);
  }

  .eq-status-card-resolver {
    background: transparent;
    border: 1px solid rgba(15,15,15,0.08);
    box-shadow: none;
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    padding: 12px 0 0;
    border-radius: 0;
    transition: all 0.2s ease;
  }

  .eq-status-card-resolver.is-collapsed .eq-status-metrics,
  .eq-status-card-resolver.is-collapsed .eq-status-summary {
    display: none;
  }

  .eq-status-card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    cursor: pointer;
  }

  .eq-status-title-wrap {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #111111;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    font-size: 11px;
  }

  .eq-status-dot {
    width: 8px;
    height: 8px;
    background: #5ad88b;
    display: inline-block;
  }

  .eq-status-summary {
    margin-top: 10px;
    font-size: 13px;
    color: rgba(17,17,17,0.8);
    line-height: 1.5;
  }

  .eq-status-metrics {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 10px;
    margin-top: 12px;
  }

  .eq-status-item {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 8px 10px;
    background: #f5f5f5;
    border: 1px solid rgba(15,15,15,0.08);
  }

  .eq-status-item strong {
    font-size: 9px;
    color: rgba(17,17,17,0.6);
    text-transform: uppercase;
    letter-spacing: 0.08em;
   }

  .eq-status-item em {
    font-style: normal;
    color: #111111;
    font-size: 12px;
    font-weight: 700;
  }

  #eq-view-resolver .eq-operation-state {
    border-color: rgba(15,15,15,0.12);
    background: transparent;
    color: #111111;
  }

  #eq-view-resolver .eq-operation-state.is-success { color: #baf7cf; }
  #eq-view-resolver .eq-operation-state.is-error { color: #ffb1b1; }
  #eq-view-resolver .eq-operation-state.is-warning { color: #ffd977; }
  #eq-view-resolver .eq-operation-state.is-info { color: #9dd1ff; }

  #eq-view-resolver .eq-btn-primary,
  #eq-view-resolver .eq-btn-secondary {
    background: #050505;
    border-color: #050505;
    color: #ffffff;
  }

  #eq-view-resolver .eq-btn-primary:hover,
  #eq-view-resolver .eq-btn-secondary:hover {
    background: #303030;
    border-color: #303030;
  }

  .eq-brand-name {
    font-size: 13px;
    font-weight: 900;
    color: var(--eq-text-bright);
    letter-spacing: 0.02em;
  }

  .eq-brand-badge {
    background: #ffffff;
    border: 1px solid #ffffff;
    color: #050505;
    font-size: 9px;
    font-weight: 800;
    padding: 2px 6px;
    border-radius: 3px;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  .eq-brand-version {
    color: var(--eq-accent);
    font-family: 'JetBrains Mono', Consolas, monospace;
    font-size: 10px;
    font-weight: 800;
    letter-spacing: 0.04em;
  }

  .eq-header-tools {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .eq-icon-btn {
    width: 28px;
    height: 28px;
    background: transparent;
    border: 1px solid transparent;
    border-radius: 4px;
    color: var(--eq-muted);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background 0.15s, color 0.15s, border-color 0.15s;
  }

  .eq-icon-btn:hover {
    background: var(--eq-surface-hover);
    color: var(--eq-text-bright);
    border-color: var(--eq-border);
  }

  /* \xC1rea Scroll\xE1vel das Visualiza\xE7\xF5es */
  .eq-views-wrapper {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    background: var(--eq-bg);
  }

  .eq-views-wrapper::-webkit-scrollbar {
    width: 4px;
  }
  .eq-views-wrapper::-webkit-scrollbar-track {
    background: transparent;
  }
  .eq-views-wrapper::-webkit-scrollbar-thumb {
    background: var(--eq-surface-hover);
    border-radius: 2px;
  }
  .eq-views-wrapper::-webkit-scrollbar-thumb:hover {
    background: var(--eq-border);
  }

  .eq-view-pane {
    display: flex;
    flex-direction: column;
    gap: 16px;
    animation: eq-view-fade 0.35s cubic-bezier(0.16,1,0.3,1);
  }

  @keyframes eq-view-fade {
    0% { opacity: 0; transform: translateY(4px); }
    100% { opacity: 1; transform: translateY(0); }
  }

  .eq-views-wrapper > * {
    animation: eq-view-fade 0.35s cubic-bezier(0.16,1,0.3,1) both;
  }

  .eq-views-wrapper > *:nth-child(2) { animation-delay: 0.04s; }
  .eq-views-wrapper > *:nth-child(3) { animation-delay: 0.08s; }
  .eq-views-wrapper > *:nth-child(4) { animation-delay: 0.12s; }

  /* ===== SE\xC7\xD5ES E COMPONENTES ===== */
  /* Section headers estilo Discord Channel Categories */
  .eq-section-title {
    font-size: 10px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--eq-muted);
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    user-select: none;
    padding: 2px 0;
    transition: color 0.15s;
  }

  .eq-section-title:hover {
    color: var(--eq-text);
  }

  .eq-field-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  /* ===== WRAPPER DO INPUT DA CHAVE ===== */
  .eq-key-input-container {
    position: relative;
    width: 100%;
  }

  .eq-input-wrap {
    display: flex;
    align-items: center;
    background: var(--eq-surface);
    border: 1px solid var(--eq-border);
    border-radius: 4px;
    overflow: visible;
    transition: border-color 0.15s;
  }

  .eq-input-wrap:focus-within {
    border-color: var(--eq-accent);
  }

  .eq-input-prefix-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 10px;
    color: var(--eq-muted);
  }

  .eq-input {
    flex: 1;
    height: 34px;
    background: transparent;
    border: none;
    color: var(--eq-text-bright);
    padding: 0 10px;
    font-family: inherit;
    font-size: 13px;
    outline: none;
  }

  .eq-input-wrap .eq-icon-btn {
    border-radius: 0;
    height: 32px;
    width: 32px;
    margin: 1px 1px 1px 0;
  }

  /* ===== CONTEXT MENU SUSPENSO DIN\xC2MICO ===== */
  .eq-context-menu {
    position: absolute;
    right: 0;
    top: calc(100% + 6px);
    width: 240px;
    background: rgba(18,18,18,0.94);
    border: 1px solid var(--eq-border);
    border-radius: 10px;
    padding: 6px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
    z-index: 100;
    display: flex;
    flex-direction: column;
    gap: 2px;
    animation: eq-menu-pop 0.24s cubic-bezier(0.16,1,0.3,1);
    backdrop-filter: blur(22px) saturate(140%);
    -webkit-backdrop-filter: blur(22px) saturate(140%);
  }

  .eq-context-menu[hidden] {
    display: none !important;
  }

  .eq-context-item {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
    height: 32px;
    padding: 0 10px;
    background: transparent;
    border: none;
    border-radius: 4px;
    color: var(--eq-text);
    font-family: inherit;
    font-size: 12px;
    text-align: left;
    cursor: pointer;
    transition: background 0.2s, color 0.2s, transform 0.2s;
  }

  .eq-context-item:hover {
    background: rgba(251,191,36,0.16);
    color: var(--eq-text-bright);
    transform: translateX(3px);
  }

  .eq-context-item.danger {
    color: var(--eq-danger);
  }

  .eq-context-item.danger:hover {
    background: var(--eq-danger);
    color: var(--eq-text-bright);
  }

  .eq-item-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    color: var(--eq-text-bright);
    background: transparent;
  }

  .eq-item-text {
    flex: 1;
  }

  .eq-context-divider {
    height: 1px;
    background: var(--eq-border);
    margin: 4px 0;
  }

  /* ===== GERENCIADOR MULTI-API KEYS ===== */
  .eq-keys-list {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-bottom: 8px;
  }

  .eq-key-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: var(--eq-surface);
    border: 1px solid var(--eq-border);
    border-radius: 4px;
    padding: 6px 10px;
    gap: 8px;
    transition: border-color 0.15s, background 0.15s;
  }

  .eq-key-item:hover {
    border-color: var(--eq-accent);
    background: var(--eq-surface-raised);
  }

  .eq-key-info {
    display: flex;
    align-items: center;
    gap: 8px;
    flex: 1;
    overflow: hidden;
  }

  .eq-key-label {
    font-size: 11px;
    font-weight: 700;
    color: var(--eq-text-bright);
    white-space: nowrap;
  }

  .eq-key-masked {
    font-family: 'JetBrains Mono', 'Consolas', monospace;
    font-size: 11px;
    color: var(--eq-muted);
    letter-spacing: 0.3px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .eq-key-badge {
    font-size: 10px;
    font-weight: 700;
    padding: 2px 6px;
    border-radius: 4px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    white-space: nowrap;
  }

  .eq-key-badge.ready {
    background: rgba(35, 165, 90, 0.15);
    color: var(--eq-success);
    border: 1px solid rgba(35, 165, 90, 0.35);
  }

  .eq-key-badge.cooldown {
    background: rgba(240, 178, 50, 0.15);
    color: var(--eq-warning);
    border: 1px solid rgba(240, 178, 50, 0.35);
  }

  .eq-key-badge.invalid {
    background: rgba(218, 55, 60, 0.15);
    color: var(--eq-danger);
    border: 1px solid rgba(218, 55, 60, 0.35);
  }

  @keyframes eq-key-race-pulse {
    0% { box-shadow: 0 0 4px rgba(0, 255, 136, 0.4); }
    100% { box-shadow: 0 0 12px rgba(0, 255, 136, 0.9); }
  }

  .eq-key-badge.racing {
    background: rgba(0, 255, 136, 0.15);
    border: 1px solid #00ff88;
    animation: eq-key-race-pulse 0.5s ease-in-out infinite alternate;
    color: #00ff88;
  }

  .eq-key-badge.winner {
    background: linear-gradient(135deg, rgba(255, 215, 0, 0.2), rgba(255, 165, 0, 0.1));
    border: 1px solid #ffd700;
    color: #ffd700;
    font-weight: 800;
  }

  @keyframes eq-turbo-pulse {
    0%, 100% { opacity: 1; text-shadow: 0 0 6px rgba(0, 255, 136, 0.5); }
    50% { opacity: 0.7; text-shadow: 0 0 12px rgba(0, 255, 136, 0.9); }
  }

  .eq-turbo-badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 10px;
    font-weight: 800;
    padding: 2px 8px;
    border-radius: 4px;
    background: rgba(0, 255, 136, 0.12);
    border: 1px solid rgba(0, 255, 136, 0.3);
    color: #00ff88;
    animation: eq-turbo-pulse 1s ease-in-out infinite;
    letter-spacing: 0.5px;
  }

  .eq-key-actions {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .eq-key-actions .eq-icon-btn {
    width: 26px;
    height: 26px;
    padding: 4px;
  }

  /* Selects & Inputs */
  .eq-select {
    width: 100%;
    height: 34px;
    background: var(--eq-surface);
    border: 1px solid var(--eq-border);
    border-radius: 4px;
    color: var(--eq-text-bright);
    padding: 0 10px;
    font-family: inherit;
    font-size: 13px;
    font-weight: 500;
    outline: none;
    cursor: pointer;
    transition: border-color 0.15s;
  }

  .eq-select:focus {
    border-color: var(--eq-accent);
  }

  .eq-grid-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }

  .eq-checkbox-label {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    color: var(--eq-text);
    cursor: pointer;
    user-select: none;
    transition: color 0.15s;
  }

  .eq-checkbox-label:hover {
    color: var(--eq-text-bright);
  }

  .eq-checkbox-label input[type="checkbox"] {
    appearance: none;
    width: 16px;
    height: 16px;
    background: var(--eq-surface);
    border: 1px solid var(--eq-border);
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    transition: all 0.15s;
  }

  .eq-checkbox-label input[type="checkbox"]:checked {
    background: var(--eq-accent);
    border-color: var(--eq-accent);
  }

  .eq-checkbox-label input[type="checkbox"]:checked::after {
    content: '';
    width: 4px;
    height: 8px;
    border: solid var(--eq-text-bright);
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
    margin-bottom: 2px;
  }

  /* ===== CARD DE STATUS ===== */
  .eq-status-card {
    background: var(--eq-surface);
    border: 1px solid var(--eq-border);
    border-radius: 8px;
    padding: 12px 14px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .eq-status-card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .eq-ai-indicator {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    font-weight: 600;
    color: var(--eq-text-bright);
  }

  .eq-dot-pulse {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: var(--eq-muted);
    transition: background 0.2s;
  }

  .eq-dot-pulse.busy {
    background: var(--eq-accent);
    animation: eq-pulse-gentle 1.5s infinite alternate;
  }

  .eq-dot-pulse.error {
    background: var(--eq-danger);
  }

  .eq-dot-pulse.stopped {
    background: var(--eq-warning);
    box-shadow: 0 0 8px rgba(215, 186, 125, 0.5);
    animation: none;
  }

  .eq-stopwatch {
    font-family: 'JetBrains Mono', Consolas, monospace;
    font-size: 11px;
    color: var(--eq-muted);
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .eq-status-text {
    font-size: 13px;
    color: var(--eq-text);
    line-height: 1.5;
  }

  /* ===== BOT\xD5ES DE A\xC7\xC3O ===== */
  .eq-btn-primary {
    height: 38px;
    background: #050505;
    border: none;
    border-radius: 4px;
    color: #fff;
    font-family: inherit;
    font-size: 13px;
    font-weight: 700;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: background 0.15s, filter 0.1s;
    user-select: none;
  }

  .eq-btn-primary:hover {
    background: #252525;
    filter: brightness(1.08);
  }

  .eq-btn-primary:active {
    filter: brightness(0.95);
  }

  .eq-btn-primary.danger {
    background: var(--eq-danger);
  }

  .eq-btn-primary.danger:hover {
    filter: brightness(1.1);
  }

  .eq-btn-primary:disabled {
    background: var(--eq-surface-raised);
    color: var(--eq-muted);
    cursor: not-allowed;
    filter: none;
  }

  .eq-btn-secondary {
    height: 34px;
    background: #050505;
    border: 1px solid #050505;
    border-radius: 4px;
    color: #fff;
    font-family: inherit;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: background 0.15s, border-color 0.15s;
  }

  .eq-btn-secondary:hover {
    background: #252525;
    border-color: #252525;
    color: #fff;
  }

  .eq-btn-secondary:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  /* ===== TERMINAL CONSOLE ===== */
  .eq-terminal {
    width: 100%;
    background: var(--eq-bg);
    border: 1px solid var(--eq-border);
    border-radius: 4px;
    padding: 12px;
    font-family: 'JetBrains Mono', Consolas, monospace;
    font-size: 12px;
    color: var(--eq-text);
    height: 180px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 6px;
    user-select: text !important;
  }

  .text-blue { color: var(--eq-accent); }
  .text-yellow { color: var(--eq-warning); }
  .text-red { color: var(--eq-danger); }
  .text-green { color: var(--eq-success); }
  .text-muted { color: var(--eq-muted); }

  /* ===== INSPETOR DE PROMPT & IA ===== */
  .eq-inspector-meta {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
  }

  .eq-meta-box {
    background: var(--eq-surface);
    border: 1px solid var(--eq-border);
    border-radius: 6px;
    padding: 10px;
    text-align: center;
  }

  .eq-meta-title {
    font-size: 10px;
    color: var(--eq-muted);
    text-transform: uppercase;
    font-weight: 600;
  }

  .eq-meta-val {
    font-family: inherit;
    font-size: 13px;
    font-weight: 600;
    color: var(--eq-text-bright);
    margin-top: 4px;
  }

  .eq-code-block {
    background: var(--eq-bg);
    border: 1px solid var(--eq-border);
    border-radius: 6px;
    padding: 12px;
    font-family: 'JetBrains Mono', Consolas, monospace;
    font-size: 11.5px;
    color: var(--eq-text);
    max-height: 200px;
    overflow-y: auto;
    white-space: pre-wrap;
    word-break: break-word;
    user-select: text;
  }

  .eq-rationale-card {
    background: var(--eq-surface);
    border-left: 3px solid var(--eq-accent);
    border-radius: 0 6px 6px 0;
    padding: 12px;
    font-size: 13px;
    color: var(--eq-text);
  }

  .eq-action-list {
    display: flex;
    flex-direction: column;
    gap: 6px;
    background: var(--eq-bg);
    border: 1px solid var(--eq-border);
    border-radius: 6px;
    padding: 10px;
    max-height: 150px;
    overflow-y: auto;
  }

  .eq-action-item {
    font-family: 'JetBrains Mono', Consolas, monospace;
    font-size: 12px;
    color: var(--eq-text);
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .eq-action-badge {
    background: var(--eq-surface-raised);
    border: 1px solid var(--eq-border);
    color: var(--eq-text-bright);
    font-size: 10px;
    font-weight: 600;
    padding: 2px 6px;
    border-radius: 4px;
  }

  /* ===== BARRA DE FERRAMENTAS DO TERMINAL & DEBUG ===== */
  .eq-debug-toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    margin-bottom: 6px;
  }

  .eq-filter-chips {
    display: flex;
    align-items: center;
    gap: 4px;
    overflow-x: auto;
  }

  .eq-filter-chip {
    background: var(--eq-surface);
    border: 1px solid var(--eq-border);
    border-radius: 12px;
    color: var(--eq-muted);
    font-family: inherit;
    font-size: 11px;
    font-weight: 500;
    padding: 2px 8px;
    cursor: pointer;
    transition: all 0.15s;
    user-select: none;
    white-space: nowrap;
  }

  .eq-filter-chip:hover {
    color: var(--eq-text-bright);
    background: var(--eq-surface-hover);
  }

  .eq-filter-chip.active {
    background: var(--eq-accent);
    border-color: var(--eq-accent);
    color: var(--eq-text-bright);
    font-weight: 600;
  }

  .eq-debug-toolbar-actions {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  /* Grid de 4 M\xE9tricas de Tokens / Diagn\xF3stico */
  .eq-token-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
  }

  .eq-token-box {
    background: var(--eq-surface);
    border: 1px solid var(--eq-border);
    border-radius: 6px;
    padding: 8px 6px;
    text-align: center;
  }

  .eq-token-title {
    font-size: 9.5px;
    color: var(--eq-muted);
    text-transform: uppercase;
    font-weight: 600;
    letter-spacing: 0.03em;
  }

  .eq-token-val {
    font-family: 'JetBrains Mono', Consolas, monospace;
    font-size: 11.5px;
    font-weight: 600;
    color: var(--eq-text-bright);
    margin-top: 3px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .eq-debug-error-card {
    background: rgba(241, 76, 76, 0.1);
    border: 1px solid rgba(241, 76, 76, 0.3);
    border-left: 3px solid var(--eq-danger);
    border-radius: 6px;
    padding: 10px 12px;
    display: flex;
    flex-direction: column;
    gap: 6px;
    font-size: 12px;
    color: var(--eq-text);
  }

  .eq-debug-error-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: 600;
    color: var(--eq-danger);
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .eq-debug-error-msg {
    font-family: 'JetBrains Mono', Consolas, monospace;
    font-size: 11px;
    word-break: break-word;
    color: #ffaaaa;
  }

  .eq-footer-note {
    font-size: 11px;
    color: var(--eq-muted);
    text-align: center;
    padding-top: 8px;
  }

  /* ===== GABARITO MANUAL FLUTUANTE ARRAST\xC1VEL E MINIMIZ\xC1VEL ===== */
  .eq-floating-hud {
    pointer-events: auto;
    position: fixed;
    z-index: 2147483647;
    top: 25px;
    left: 25px;
    width: 390px;
    max-width: calc(100vw - 40px);
    background: rgba(30, 30, 30, 0.95);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid var(--eq-border);
    border-radius: 12px;
    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.5);
    color: var(--eq-text);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    font-family: inherit;
    font-size: 13px;
    transition: width 0.2s, height 0.2s, border-radius 0.2s, box-shadow 0.2s;
  }

  .eq-floating-hud.minimized {
    width: auto;
    border-radius: 20px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
  }

  .eq-floating-hud.minimized .eq-fah-header,
  .eq-floating-hud.minimized .eq-fah-body,
  .eq-floating-hud.minimized .eq-fah-footer {
    display: none !important;
  }

  .eq-fah-pill {
    display: none;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    cursor: pointer;
    font-weight: 600;
    font-size: 13px;
    color: var(--eq-text-bright);
    user-select: none;
    background: transparent;
  }

  .eq-floating-hud.minimized .eq-fah-pill {
    display: flex;
  }

  .eq-fah-pill-icon {
    color: var(--eq-accent);
    display: flex;
    align-items: center;
  }

  .eq-fah-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 14px;
    background: var(--eq-surface);
    border-bottom: 1px solid var(--eq-border);
    cursor: grab;
    user-select: none;
  }

  .eq-fah-header:active {
    cursor: grabbing;
  }

  .eq-fah-title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 600;
    font-size: 13px;
    color: var(--eq-text-bright);
  }

  .eq-fah-actions {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .eq-fah-btn {
    background: transparent;
    border: 1px solid transparent;
    color: var(--eq-muted);
    border-radius: 4px;
    padding: 4px 6px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.15s;
  }

  .eq-fah-btn:hover {
    background: var(--eq-surface-hover);
    color: var(--eq-text-bright);
  }

  .eq-fah-body {
    padding: 14px;
    max-height: 420px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .eq-fah-body::-webkit-scrollbar {
    width: 6px;
  }

  .eq-fah-body::-webkit-scrollbar-thumb {
    background: var(--eq-surface-raised);
    border-radius: 4px;
  }

  .eq-fah-meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 11px;
    padding-bottom: 8px;
    border-bottom: 1px solid var(--eq-border);
    color: var(--eq-muted);
  }

  .eq-fah-meta-badge {
    background: var(--eq-surface-raised);
    color: var(--eq-text-bright);
    font-weight: 600;
    padding: 2px 6px;
    border-radius: 4px;
  }

  .eq-fah-group {
    background: var(--eq-surface);
    border: 1px solid var(--eq-border);
    border-radius: 8px;
    padding: 10px 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .eq-fah-group-title {
    font-weight: 600;
    font-size: 12px;
    display: flex;
    align-items: center;
    gap: 6px;
    color: var(--eq-text-bright);
  }

  .eq-fah-group-items {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .eq-fah-item {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 8px;
    font-size: 13px;
    color: var(--eq-text);
    background: var(--eq-bg);
    border: 1px solid var(--eq-border);
    border-radius: 6px;
    padding: 8px 10px;
  }

  .eq-fah-item-text {
    flex: 1;
    word-break: break-word;
  }

  .eq-fah-copy-inline {
    background: var(--eq-surface-raised);
    border: 1px solid var(--eq-border);
    color: var(--eq-text-bright);
    border-radius: 4px;
    font-size: 11px;
    font-weight: 600;
    padding: 3px 8px;
    cursor: pointer;
    flex-shrink: 0;
    transition: all 0.15s;
    user-select: none;
  }

  .eq-fah-copy-inline:hover {
    background: var(--eq-surface-hover);
    color: #fff;
  }

  .eq-fah-letter-badge {
    background: var(--eq-accent);
    color: #fff;
    font-weight: 700;
    font-size: 11px;
    padding: 2px 7px;
    border-radius: 4px;
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .eq-fah-field-box {
    display: flex;
    flex-direction: column;
    gap: 4px;
    flex: 1;
  }

  .eq-fah-field-label {
    font-size: 11px;
    font-weight: 600;
    color: var(--eq-muted);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .eq-fah-field-val {
    font-size: 13px;
    font-weight: 600;
    color: var(--eq-text-bright);
    background: var(--eq-surface);
    padding: 4px 8px;
    border-radius: 4px;
    border: 1px solid var(--eq-border);
    word-break: break-word;
  }

  .eq-fah-rationale {
    background: var(--eq-bg);
    border: 1px dashed var(--eq-border);
    border-radius: 6px;
    padding: 10px;
    font-size: 12px;
    color: var(--eq-muted);
  }

  .eq-fah-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding: 10px 14px;
    background: var(--eq-surface);
    border-top: 1px solid var(--eq-border);
    font-size: 11px;
    color: var(--eq-muted);
  }

  .eq-fah-copy-all {
    background: var(--eq-accent);
    color: var(--eq-text-bright);
    border: none;
    border-radius: 4px;
    font-size: 11px;
    font-weight: 600;
    padding: 6px 12px;
    cursor: pointer;
    transition: background 0.15s;
    user-select: none;
  }

  .eq-fah-copy-all:hover {
    background: var(--eq-accent-hover);
  }

  /* ===== BARRA DE CARREGAMENTO DIN\xC2MICA ===== */
  .eq-progress-container {
    padding: 8px 14px;
    background: var(--eq-surface);
    border-bottom: 1px solid var(--eq-border);
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .eq-progress-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    color: var(--eq-text-bright);
  }
  .eq-progress-track {
    width: 100%;
    height: 4px;
    background: var(--eq-surface-raised);
    border-radius: 2px;
    overflow: hidden;
  }
  .eq-progress-bar {
    height: 100%;
    background: var(--eq-accent);
    border-radius: 2px;
    transition: width 0.25s ease-out;
  }

  /* ===== EXPLORADOR DE CONTEXTO & RAG (ESTILO VS CODE) ===== */
  .eq-tree-container {
    display: flex;
    flex-direction: column;
    gap: 8px;
    font-size: 13px;
    color: var(--eq-text);
  }
  .eq-tree-node {
    display: flex;
    flex-direction: column;
    background: var(--eq-surface);
    border: 1px solid var(--eq-border);
    border-radius: 6px;
    overflow: hidden;
  }
  .eq-tree-header {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    background: var(--eq-surface);
    cursor: pointer;
    user-select: none;
    font-weight: 600;
    color: var(--eq-text-bright);
    transition: background 0.15s;
  }
  .eq-tree-header:hover {
    background: var(--eq-surface-hover);
  }
  .eq-tree-arrow {
    font-size: 10px;
    color: var(--eq-muted);
    transition: transform 0.2s;
  }
  .eq-tree-content {
    padding: 10px 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    font-size: 12px;
    color: var(--eq-muted);
    border-top: 1px solid var(--eq-border);
    background: var(--eq-bg);
  }
  .eq-tree-leaf {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    padding: 4px 0;
    border-bottom: 1px dashed var(--eq-border);
  }
  .eq-tree-leaf:last-child {
    border-bottom: none;
  }
  .eq-tree-badge {
    font-size: 10px;
    padding: 2px 6px;
    border-radius: 4px;
    background: var(--eq-surface-raised);
    color: var(--eq-text-bright);
    font-weight: 600;
  }

  @media (max-width: 480px) {
    .eq-sidebar {
      width: 100vw;
      max-width: 100vw;
    }
    .eq-activity-bar {
      width: 46px;
      min-width: 46px;
    }
    .eq-header {
      padding: 0 12px;
    }
    .eq-brand-name {
      font-size: 12px;
    }
    .eq-brand-version {
      font-size: 9px;
    }
    .eq-views-wrapper {
      padding: 12px;
      gap: 12px;
    }
    .eq-floating-hud {
      width: calc(100vw - 20px);
      left: 10px !important;
      top: 10px !important;
    }
  }

  /* Product shell: operation, execution and technical surfaces */
  .eq-operation-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; padding-bottom: 8px; }
  .eq-eyebrow { color: var(--eq-muted); font: 600 11px/1.2 inherit; text-transform: uppercase; letter-spacing: .05em; }
  .eq-operation-title { margin-top: 4px; color: var(--eq-text-bright); font-size: 20px; font-weight: 600; }
  .eq-operation-subtitle { margin-top: 5px; color: var(--eq-muted); font-size: 13px; }
  .eq-operation-state { flex: none; padding: 4px 8px; border: 1px solid var(--eq-border); border-radius: 4px; color: var(--eq-muted); font: 600 11px/1 inherit; text-transform: uppercase; transition: all 0.2s ease; }
  .eq-operation-state.is-success { color: var(--eq-success); border-color: rgba(78, 201, 176, 0.4); background: rgba(78, 201, 176, 0.08); }
  .eq-operation-state.is-error { color: var(--eq-danger); border-color: rgba(241, 76, 76, 0.4); background: rgba(241, 76, 76, 0.08); }
  .eq-operation-state.is-busy { color: #00ffcc; border-color: rgba(0, 255, 204, 0.4); background: rgba(0, 255, 204, 0.08); }
  .eq-operation-state.is-warning, .eq-operation-state.is-stopped { color: var(--eq-warning); border-color: rgba(215, 186, 125, 0.4); background: rgba(215, 186, 125, 0.08); }
  .eq-operation-state.is-info { color: var(--eq-accent); border-color: rgba(0, 122, 204, 0.4); background: rgba(0, 122, 204, 0.08); }
  .eq-operation-actions { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .eq-operation-result { margin-top: 2px; padding-top: 16px; border-top: 1px solid var(--eq-border); }
  .eq-badges { display: flex; flex-wrap: wrap; gap: 8px; }
  
  .eq-execution-card {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 12px;
    background: var(--eq-surface);
    border: 1px solid var(--eq-border);
    border-radius: 8px;
  }
  .eq-execution-summary {
    padding: 8px 10px;
    border-left: 3px solid var(--eq-warning);
    color: var(--eq-muted);
    font-size: 12px;
  }
  .eq-execution-summary.is-success { border-left-color: var(--eq-success); color: var(--eq-text); }
  .eq-execution-list { display: flex; flex-direction: column; gap: 6px; max-height: 220px; overflow-y: auto; }
  .eq-execution-row {
    display: grid;
    grid-template-columns: 48px minmax(0, 1fr);
    gap: 10px;
    padding: 8px 10px;
    background: var(--eq-bg);
    border: 1px solid var(--eq-border);
    border-radius: 6px;
    font-size: 12px;
  }
  .eq-execution-row small { grid-column: 2; color: var(--eq-danger); overflow-wrap: anywhere; }
  .eq-execution-state { color: var(--eq-warning); font-weight: 600; }
  .eq-execution-row.is-success .eq-execution-state { color: var(--eq-success); }
  .eq-execution-details { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
  .eq-execution-details strong { color: var(--eq-text-bright); overflow-wrap: anywhere; font-weight: 600; }
  .eq-execution-details span { color: var(--eq-muted); overflow-wrap: anywhere; }

  /* ===== BOT\xC3O PARAR / ABORTAR AN\xC1LISE ===== */
  .eq-btn-primary.danger {
    background: #e51400 !important;
    border-color: #f14c4c !important;
    color: #ffffff !important;
    animation: eq-pulse-danger 1.5s infinite alternate;
  }
  .eq-btn-primary.danger:hover {
    background: #ff2a1a !important;
    border-color: #ff5555 !important;
  }
  @keyframes eq-pulse-danger {
    0% { box-shadow: 0 0 4px rgba(229, 20, 0, 0.4); }
    100% { box-shadow: 0 0 14px rgba(229, 20, 0, 0.8); }
  }

  /* ===== ABA DE M\xC9TRICAS & CRON\xD4METRO ===== */
  .eq-live-stopwatch-box {
    background: linear-gradient(135deg, rgba(0, 122, 204, 0.12), rgba(0, 255, 204, 0.08));
    border: 1px solid rgba(0, 255, 204, 0.25);
    border-radius: 8px;
    padding: 14px 16px;
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-bottom: 12px;
  }
  .eq-live-stopwatch-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .eq-live-stopwatch-label {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.08em;
    color: var(--eq-accent);
    text-transform: uppercase;
  }
  .eq-live-stopwatch-status {
    font-size: 11px;
    font-weight: 600;
    color: var(--eq-muted);
    padding: 2px 6px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 4px;
  }
  .eq-live-stopwatch-status.active {
    color: #00ffcc;
    background: rgba(0, 255, 204, 0.15);
    animation: eq-blink 1s infinite alternate;
  }
  .eq-live-stopwatch-status.is-warning {
    color: var(--eq-warning);
    background: rgba(215, 186, 125, 0.15);
  }
  .eq-live-stopwatch-status.is-success {
    color: var(--eq-success);
    background: rgba(78, 201, 176, 0.15);
  }
  .eq-live-stopwatch-status.is-error {
    color: var(--eq-danger);
    background: rgba(241, 76, 76, 0.15);
  }
  .eq-live-stopwatch-time {
    font-family: 'JetBrains Mono', monospace;
    font-size: 28px;
    font-weight: 800;
    color: #ffffff;
    letter-spacing: 0.05em;
    text-shadow: 0 0 12px rgba(0, 255, 204, 0.3);
  }
  .eq-live-stopwatch-hint {
    font-size: 11px;
    color: var(--eq-muted);
  }

  .eq-metrics-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    margin-bottom: 12px;
  }
  .eq-metric-card {
    background: var(--eq-surface);
    border: 1px solid var(--eq-border);
    border-radius: 6px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .eq-metric-card-title {
    font-size: 10px;
    font-weight: 600;
    color: var(--eq-muted);
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }
  .eq-metric-card-val {
    font-family: 'JetBrains Mono', monospace;
    font-size: 16px;
    font-weight: 700;
    color: var(--eq-text-bright);
  }
  .eq-metric-card-sub {
    font-size: 10px;
    color: var(--eq-muted);
  }

  .eq-metrics-actions {
    display: flex;
    gap: 8px;
    margin-bottom: 12px;
  }
  .eq-metrics-actions button {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    height: 30px;
    font-size: 11px;
  }
  .eq-btn-secondary.danger {
    color: var(--eq-danger);
    border-color: rgba(241, 76, 76, 0.4);
  }
  .eq-btn-secondary.danger:hover {
    background: rgba(241, 76, 76, 0.15);
    border-color: var(--eq-danger);
  }

  .eq-metrics-history-list {
    display: flex;
    flex-direction: column;
    gap: 6px;
    overflow-y: auto;
    max-height: 240px;
    padding-right: 4px;
  }
  .eq-metrics-empty {
    color: var(--eq-muted);
    font-size: 12px;
    font-style: italic;
    padding: 16px 8px;
    text-align: center;
  }
  .eq-metrics-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: var(--eq-surface);
    border: 1px solid var(--eq-border);
    border-radius: 6px;
    padding: 8px 10px;
    gap: 8px;
    transition: background 0.15s;
  }
  .eq-metrics-item:hover {
    background: var(--eq-surface-hover);
  }
  .eq-metrics-item-left {
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
    flex: 1;
  }
  .eq-metrics-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 28px;
    height: 22px;
    padding: 0 4px;
    background: rgba(0, 122, 204, 0.2);
    border: 1px solid rgba(0, 122, 204, 0.4);
    border-radius: 4px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    font-weight: 700;
    color: var(--eq-accent);
  }
  .eq-metrics-item-info {
    display: flex;
    flex-direction: column;
    min-width: 0;
    flex: 1;
  }
  .eq-metrics-item-title {
    font-size: 12px;
    font-weight: 600;
    color: var(--eq-text-bright);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .eq-metrics-item-meta {
    font-size: 10px;
    color: var(--eq-muted);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .eq-metrics-item-right {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 2px;
    flex-shrink: 0;
  }
  .eq-metrics-item-dur {
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px;
    font-weight: 700;
    color: #00ffcc;
  }
  .eq-metrics-item-status {
    font-size: 9px;
    font-weight: 700;
    text-transform: uppercase;
    padding: 1px 4px;
    border-radius: 3px;
  }
  .eq-metrics-item-status.is-verified,
  .eq-metrics-item-status.is-answered {
    background: rgba(78, 201, 176, 0.15);
    color: var(--eq-success);
  }
  .eq-metrics-item-status.is-manual {
    background: rgba(215, 186, 125, 0.15);
    color: var(--eq-warning);
  }
  .eq-metrics-item-status.is-skipped {
    background: rgba(241, 76, 76, 0.15);
    color: var(--eq-danger);
  }
`;var ze="v2.5.7";var Zt=(()=>{try{if(typeof window.trustedTypes?.createPolicy=="function")return window.trustedTypes.createPolicy("easyquiz-ui#html",{createHTML:o=>o})}catch{}return null})();function Ho(o,e){try{if(Zt){o.innerHTML=Zt.createHTML(e);return}}catch{}try{if(typeof o.setHTMLUnsafe=="function"){o.setHTMLUnsafe(e);return}}catch{}o.innerHTML=e}var Po=[{value:"",label:"Detec\xE7\xE3o Autom\xE1tica"},{value:"escolha_unica",label:"M\xFAltipla Escolha (\xDAnica)"},{value:"escolha_multipla",label:"M\xFAltipla Escolha (V\xE1rias)"},{value:"categorizacao",label:"Categoriza\xE7\xE3o / Grupos"},{value:"arrastar_soltar",label:"Arrastar e Soltar (Drag & Drop)"},{value:"ordenacao",label:"Ordena\xE7\xE3o / Sequ\xEAncia"},{value:"verdadeiro_falso",label:"Verdadeiro / Falso"},{value:"texto_livre",label:"Texto Livre / Dissertativa"},{value:"preenchimento",label:"Preenchimento de Lacunas"}],zo=[{value:"smart",label:"Inteligente (Auto-H\xEDbrido)"},{value:"command",label:"Apenas Comando (Seguro)"},{value:"javascript",label:"Apenas JS Nativo (Avan\xE7ado)"}],We=class{host;shadow;callbacks;autopilot;floatingAnswers;initialSettings;isCollapsed=!1;activeTab="resolver";isBusy=!1;stopwatchInterval=null;stopwatchStartTime=0;latestPlan=null;latestContext=null;latestImages=[];latestImageDescriptions=[];latestPromptText="";metricsLiveTime;metricsLiveStatus;metricsTotalBadge;metricTotalTime;metricAvgTime;metricTotalCount;metricsHistoryList;metricsHistoryCount;metricsCopyBtn;metricsResetBtn;currentQuestionStartTime=0;questionLiveTimerInterval=null;liveDebugTerminal;dbgModel;dbgLatency;dbgSplitTokens;dbgTotalTokens;dbgErrorCard;dbgErrorText;dbgPromptLen;dbgPromptView;dbgContextView;dbgRawRespView;dbgCountAll;dbgCountError;dbgCountAi;dbgCountDom;logEntries=[];activeLogFilter="all";autoScrollLogs=!0;lastErrorMsg=null;_autopilotAnalyzingShown=!1;progressContainer;progressBar;progressLabel;progressVal;contextTreeContainer;launcherBtn;launcherDot;dockToggleBtn;sidebarEl;apToggleBtn;apConsole;executionConsole;dotPulseAp;statusTextAp;stopwatchAp;dotPulseAdv;statusTextAdv;stopwatchAdv;inspModel;inspLatency;inspTokens;inspPrompt;inspRationale;inspActions;copyPromptBtn;apiKeyInput;keyContextMenu;keyMoreBtn;keysListEl;keysBadgeEl;modelSelect;modeSelect;engineSelect;dryRunCheckbox;autoApplyCheckbox;autoAdvanceCheckbox;hostDarkModeCheckbox;useVisionCheckbox;analyzeBtn;applyBtn;resultContainer;constructor(e,t){this.initialSettings=e,this.callbacks=t,this.autopilot=new Je({onStatusChange:(i,d,l)=>{this.logToConsole(d,l),i==="analyzing"?this._autopilotAnalyzingShown||(this._autopilotAnalyzingShown=!0,this.setBusy(!0,"Autopilot: IA analisando...")):i==="advancing"||i==="waiting"?(this._autopilotAnalyzingShown=!1,this.setBusy(!1),this.updateAutopilotUi(!0)):i==="idle"?(this._autopilotAnalyzingShown=!1,this.setBusy(!1),this.updateAutopilotUi(!1),d.includes("conclus\xE3o")||d.includes("finalizada")||d.includes("Parab\xE9ns")?this.setStatus("Atividade conclu\xEDda com sucesso! Autopilot finalizado.","success"):this.setStatus("Autopilot desativado.","info")):i==="error"&&(this._autopilotAnalyzingShown=!1,this.setBusy(!1),this.updateAutopilotUi(!1),this.setStatus("Autopilot interrompido por erro.","error"))},onRequestAnalysis:async(i,d)=>{try{return await this.callbacks.onAnalyze(i,d,!0)||null}catch{return null}},isManualModeActive:()=>this.floatingAnswers?.isOpen()??!1,onPageAdvance:()=>{this.floatingAnswers?.hide()}}),this.host=document.createElement("div"),this.host.id="easyquiz-shadow-root",this.host.style.position="fixed",this.host.style.top="0",this.host.style.left="0",this.host.style.width="100vw",this.host.style.height="100vh",this.host.style.zIndex="2147483647",this.host.style.pointerEvents="none",this.shadow=this.host.attachShadow({mode:"open"}),Ho(this.shadow,`
      <style>${Yt}</style>

      <!-- Launcher m\xEDnimo: apenas o controle para abrir/recolher o painel. -->
      <button class="eq-launcher" type="button" title="Abrir / Recolher painel EasyQuiz (Alt+Q)" aria-label="Abrir ou esconder painel EasyQuiz">
        <span class="eq-launcher-icon">${k.chevronRight}</span>
        <span class="eq-launcher-dot" id="eq-launcher-dot" aria-hidden="true"></span>
      </button>

      <!-- Sidebar Fixa Lateral Direita Estilo VS Code -->
      <aside class="eq-sidebar" aria-label="EasyQuiz Sidebar">
        <!-- Aba Retr\xE1til na Borda Esquerda -->
        <button class="eq-dock-toggle" id="eq-dock-toggle" type="button" title="Recolher / Expandir Painel (Alt+Q)">
          <span class="eq-dock-toggle-icon">${k.chevronRight}</span>
        </button>
           <!-- Activity Bar Vertical na Esquerda (Estilo VS Code - Apenas \xCDcones) -->
          <nav class="eq-activity-bar" role="tablist" aria-label="Atalhos">
            <div class="eq-activity-top">
              <button class="eq-activity-btn active" id="eq-tab-resolver" role="tab" title="Resolver (Opera\xE7\xF5es Atuais)">
                <span class="eq-activity-indicator"></span>
                <span class="eq-activity-icon">${k.sparkles}</span>
              </button>

              <button class="eq-activity-btn" id="eq-tab-brain" role="tab" title="C\xE9rebro da IA (Contexto e Inspe\xE7\xE3o)">
                <span class="eq-activity-indicator"></span>
                <span class="eq-activity-icon">${k.inspector}</span>
              </button>

              <button class="eq-activity-btn" id="eq-tab-media" role="tab" title="M\xEDdias & Imagens (Capturas enviadas \xE0 IA e Interpreta\xE7\xF5es)">
                <span class="eq-activity-indicator"></span>
                <span class="eq-activity-icon">${k.image}</span>
              </button>

              <button class="eq-activity-btn" id="eq-tab-metrics" role="tab" title="M\xE9tricas & Cron\xF4metro (Tempo por Quest\xE3o e Hist\xF3rico)">
                <span class="eq-activity-indicator"></span>
                <span class="eq-activity-icon">${k.clock}</span>
              </button>

              <button class="eq-activity-btn" id="eq-tab-debug" role="tab" title="Terminal & Debug Output (Logs, Tokens, Prompts, Erros)">
                <span class="eq-activity-indicator"></span>
                <span class="eq-activity-icon">${k.code}</span>
              </button>
            </div>

            <div class="eq-activity-bottom">
              <button class="eq-activity-btn" id="eq-tab-settings" role="tab" title="Configura\xE7\xF5es e Ajustes Avan\xE7ados">
                <span class="eq-activity-indicator"></span>
                <span class="eq-activity-icon">${k.settings}</span>
              </button>
            </div>
          </nav>

          <!-- Corpo Principal da Sidebar -->
          <main class="eq-sidebar-body">
            <!-- Cabe\xE7alho do painel Legacy -->
            <header class="eq-header">
              <div class="eq-brand">
                <span class="eq-brand-icon"><img src="${k.canvasLogo}" alt="EasyQuiz" /></span>
                <span class="eq-brand-name">EasyQuiz</span>
                <span class="eq-brand-badge">BETA</span>
                <span class="eq-brand-version">${ze}</span>
                <span id="eq-active-model-badge" style="display:none; font-size:9px; font-weight:700; padding:1px 5px; border-radius:3px; background:rgba(251,191,36,0.14); border:1px solid rgba(251,191,36,0.4); color:#fbbf24; letter-spacing:0.04em; white-space:nowrap;"></span>
              </div>
              <div class="eq-header-tools">
                <button class="eq-icon-btn" id="eq-min-btn" type="button" title="Minimizar (Alt+Q)">${k.chevronRight}</button>
                <button class="eq-icon-btn" id="eq-close-btn" type="button" title="Fechar">${k.close}</button>
              </div>
            </header>

            <!-- Barra de Carregamento / Progresso Din\xE2mica -->
            <div class="eq-progress-container" id="eq-progress-container" style="display: none;">
              <div class="eq-progress-info">
                <span class="eq-progress-label" id="eq-progress-label">Processando...</span>
                <span class="eq-progress-val" id="eq-progress-val">0%</span>
              </div>
              <div class="eq-progress-track">
                <div class="eq-progress-bar" id="eq-progress-bar" style="width: 0%;"></div>
              </div>
            </div>

            <div class="eq-views-wrapper">
              
              <!-- TAB 1: RESOLVER -->
              <div class="eq-view-pane" id="eq-view-resolver">
                <div class="eq-resolver-hero">
                  <div class="eq-resolver-brand">
                    <span class="eq-brand-mark"><img src="${k.canvasLogo}" alt="EQ Legacy" /></span>
                    <div class="eq-brand-copy">
                      <div class="eq-brand-title">EQ Legacy</div>
                      <div class="eq-brand-subline">BETA \u2022 ${ze}</div>
                    </div>
                  </div>
                  <div class="eq-resolver-tools">
                    <button class="eq-more-btn" id="eq-resolver-menu-btn" type="button" title="Mais a\xE7\xF5es" aria-label="Abrir menu de a\xE7\xF5es">${k.moreVertical}</button>
                    <div class="eq-resolver-menu" id="eq-resolver-menu" hidden>
                      <button type="button" class="eq-menu-action" data-action="analyze">${k.analyze} Analisar p\xE1gina</button>
                      <button type="button" class="eq-menu-action" data-action="inject">${k.apply} Injetar resposta</button>
                    </div>
                  </div>
                </div>

                <div class="eq-resolver-cta-row">
                  <button class="eq-resolve-primary" id="eq-analyze-btn" type="button">${k.play} Iniciar Leitura</button>
                  <button class="eq-resolve-secondary" id="eq-ap-toggle-btn" type="button" title="Autopilot">${k.play}</button>
                  <button class="eq-more-btn eq-more-btn-inline" id="eq-resolver-menu-btn" type="button" title="Mais a\xE7\xF5es" aria-label="Abrir menu de a\xE7\xF5es">${k.moreVertical}</button>
                  <button class="eq-btn-secondary" id="eq-apply-btn" type="button" style="display:none;" aria-hidden="true">Aplicar</button>
                </div>

                <div class="eq-status-card eq-status-card-resolver is-collapsed" id="eq-status-card" aria-expanded="false">
                  <div class="eq-status-card-header">
                    <div class="eq-status-title-wrap">
                      <span class="eq-status-dot"></span>
                      <span class="eq-status-label">Status da IA</span>
                    </div>
                    <span class="eq-operation-state" id="eq-operation-state">Pronto</span>
                  </div>
                  <div class="eq-status-summary" id="eq-status-summary">Sistema aguardando leitura da p\xE1gina.</div>
                  <div class="eq-status-metrics">
                    <span class="eq-status-item"><strong>Modo</strong><em>Legacy</em></span>
                    <span class="eq-status-item"><strong>Lat\xEAncia</strong><em>-- ms</em></span>
                    <span class="eq-status-item"><strong>Contexto</strong><em>0 itens</em></span>
                  </div>
                </div>

                <div id="eq-result" class="eq-operation-result" style="display: none; flex-direction: column; gap: 10px;">
                  <div class="eq-section-title">Plano e respostas</div>
                  <div class="eq-badges" id="eq-badges"></div>
                  <div class="eq-rationale-card" id="eq-rationale-text"></div>
                  <div class="eq-action-list" id="eq-actions-list"></div>
                  
                  <div class="eq-execution-card" id="eq-execution-card" hidden>
                    <div class="eq-section-title">Execu\xE7\xE3o e evid\xEAncias</div>
                    <div class="eq-execution-placeholder" id="eq-execution-placeholder" style="display: none;"></div>
                    <div class="eq-execution-summary" id="eq-execution-summary"></div>
                    <div class="eq-execution-list" id="eq-execution-list"></div>
                  </div>
                  <button class="eq-btn-secondary" id="eq-open-hud-btn" type="button">${k.list} Abrir respostas dispon\xEDveis</button>
                </div>

                <!-- Status & Stopwatch Card -->
                <div class="eq-status-card">
                  <div class="eq-status-card-header">
                    <div class="eq-ai-indicator">
                      <span class="eq-dot-pulse" id="eq-dot-ap"></span>
                      <span>Status da IA</span>
                    </div>
                    <div class="eq-stopwatch" id="eq-stopwatch-ap">
                      ${k.clock} <span>0.00s</span>
                    </div>
                  </div>
                  <div class="eq-status-text" id="eq-status-text-ap">
                    Pronto para iniciar. O Autopilot responder\xE1 e avan\xE7ar\xE1 as quest\xF5es de forma autom\xE1tica.
                  </div>
                </div>

                <!-- Console Terminal Oculto (Apenas para Autopilot Interno) -->
                <div class="eq-terminal" id="eq-ap-console" style="display: none;"></div>
                <div class="eq-terminal eq-terminal-execution" id="eq-execution-console" style="display: none;"></div>
                
                <div class="eq-footer-note" style="margin-top: auto;">${ze} \u2022 H\xEDbrido 4.0 (RAG + AST + Vision)</div>
              </div>

              <!-- TAB 2: C\xC9REBRO DA IA -->
              <div class="eq-view-pane" id="eq-view-brain" style="display: none;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <div class="eq-section-title" style="margin: 0;">
                    <span>Explorador de Contexto & RAG</span>
                  </div>
                  <div style="display: flex; gap: 4px;">
                    <button class="eq-icon-btn" id="eq-refresh-context-btn" type="button" title="Atualizar Varredura em Tempo Real" style="width: 28px; height: 28px;">
                      ${k.refresh}
                    </button>
                    <button class="eq-icon-btn" id="eq-ap-clear-memory" type="button" title="Limpar Mem\xF3ria Contextual (RAG)" style="width: 28px; height: 28px; color: #ff5555;">
                      ${k.eraser}
                    </button>
                  </div>
                </div>

                <div class="eq-tree-container" id="eq-tree-container">
                  <div class="text-muted" style="padding: 8px 0;">Aguardando an\xE1lise da quest\xE3o...</div>
                </div>

                <div class="eq-inspector-meta">
                  <div class="eq-meta-box">
                    <div class="eq-meta-title">Modelo IA</div>
                    <div class="eq-meta-val" id="eq-insp-model">--</div>
                  </div>
                  <div class="eq-meta-box">
                    <div class="eq-meta-title">Lat\xEAncia</div>
                    <div class="eq-meta-val" id="eq-insp-latency">--</div>
                  </div>
                  <div class="eq-meta-box">
                    <div class="eq-meta-title">Tokens</div>
                    <div class="eq-meta-val" id="eq-insp-tokens">--</div>
                  </div>
                </div>

                <div class="eq-field-group">
                  <div class="eq-section-title">
                    <span>Prompt Enviado (Sistema)</span>
                    <button class="eq-btn-secondary" id="eq-copy-prompt-btn" type="button" style="height: 26px; padding: 0 8px; font-size: 11px;">
                      ${k.copy} Copiar
                    </button>
                  </div>
                  <div class="eq-code-block" id="eq-insp-prompt">Nenhuma consulta realizada.</div>
                </div>

                <div class="eq-field-group">
                  <div class="eq-section-title">Racioc\xEDnio Bruto (Resposta)</div>
                  <div class="eq-rationale-card" id="eq-insp-rationale">Aguardando resposta da IA...</div>
                </div>
                
                <div class="eq-field-group" style="display: none;">
                  <div class="eq-action-list" id="eq-insp-actions"></div>
                </div>

                <div class="eq-footer-note" style="margin-top: auto;">Inspetor em Tempo Real \u2022 100% Transparente</div>
              </div>

              <!-- TAB 2.5: M\xCDDIAS E IMAGENS -->
              <div class="eq-view-pane" id="eq-view-media" style="display: none;">
                <div class="eq-operation-header" style="margin-bottom: 8px;">
                  <div>
                    <div class="eq-eyebrow">CONTEXTO VISUAL</div>
                    <h1 class="eq-operation-title" style="font-size: 15px;">M\xEDdias da IA</h1>
                    <p class="eq-operation-subtitle">Imagens capturadas e interpreta\xE7\xE3o da IA para cada uma.</p>
                  </div>
                  <span class="eq-brand-badge" id="eq-media-count-badge" style="background: rgba(251,191,36,0.14); color: #fbbf24;">0 m\xEDdias</span>
                </div>

                <div id="eq-media-grid" style="display: flex; flex-direction: column; gap: 12px; flex: 1; overflow-y: auto;">
                  <div class="text-muted" style="padding: 16px 0; text-align: center;">
                    Nenhuma imagem capturada ainda.<br>
                    <span style="font-size: 10px; opacity: 0.6;">Ative \u201CVis\xE3o Computacional\u201D nas configura\xE7\xF5es e execute uma an\xE1lise.</span>
                  </div>
                </div>

                <div class="eq-footer-note" style="margin-top: auto;">Capturas Visuais \u2022 Interpreta\xE7\xE3o IA em Tempo Real</div>
              </div>

              <!-- TAB 3: M\xC9TRICAS & CRON\xD4METRO -->
              <div class="eq-view-pane" id="eq-view-metrics" style="display: none;">
                <div class="eq-operation-header">
                  <div>
                    <div class="eq-eyebrow">ESTAT\xCDSTICAS & CRON\xD4METRO</div>
                    <h1 class="eq-operation-title" style="font-size: 15px;">Tempo e Rendimento</h1>
                    <p class="eq-operation-subtitle">Monitore o tempo de resposta por quest\xE3o e o rendimento total.</p>
                  </div>
                  <span class="eq-brand-badge" id="eq-metrics-total-badge" style="background: rgba(0, 122, 204, 0.2); color: #0098ff;">0 Quest\xF5es</span>
                </div>

                <!-- Cron\xF4metro em Tempo Real da Quest\xE3o Atual -->
                <div class="eq-live-stopwatch-box">
                  <div class="eq-live-stopwatch-header">
                    <span class="eq-live-stopwatch-label">CRON\xD4METRO AO VIVO</span>
                    <span class="eq-live-stopwatch-status" id="eq-metrics-live-status">Em espera</span>
                  </div>
                  <div class="eq-live-stopwatch-time" id="eq-metrics-live-time">00:00.00</div>
                  <div class="eq-live-stopwatch-hint">Tempo decorrido na quest\xE3o ativa (0 tokens extras consumidos)</div>
                </div>

                <!-- Grade de Cart\xF5es de Resumo (3 Colunas) -->
                <div class="eq-metrics-grid">
                  <div class="eq-metric-card">
                    <div class="eq-metric-card-title">Tempo Total</div>
                    <div class="eq-metric-card-val" id="eq-metric-total-time">00:00</div>
                    <div class="eq-metric-card-sub">Dura\xE7\xE3o da sess\xE3o</div>
                  </div>
                  <div class="eq-metric-card">
                    <div class="eq-metric-card-title">M\xE9dia / Quest\xE3o</div>
                    <div class="eq-metric-card-val" id="eq-metric-avg-time">0.0s</div>
                    <div class="eq-metric-card-sub">Ritmo m\xE9dio</div>
                  </div>
                  <div class="eq-metric-card">
                    <div class="eq-metric-card-title">Respondidas</div>
                    <div class="eq-metric-card-val" id="eq-metric-total-count">0</div>
                    <div class="eq-metric-card-sub">Quest\xF5es conclu\xEDdas</div>
                  </div>
                </div>

                <!-- Barra de A\xE7\xF5es R\xE1pidas -->
                <div class="eq-metrics-actions">
                  <button class="eq-btn-secondary" id="eq-metrics-copy-btn" type="button">
                    ${k.copy} Copiar Relat\xF3rio
                  </button>
                  <button class="eq-btn-secondary danger" id="eq-metrics-reset-btn" type="button">
                    ${k.trash} Zerar M\xE9tricas
                  </button>
                </div>

                <!-- Hist\xF3rico Detalhado de Respostas -->
                <div class="eq-field-group" style="flex: 1; display: flex; flex-direction: column; min-height: 180px;">
                  <div class="eq-section-title">
                    <span>Hist\xF3rico Detalhado por Quest\xE3o</span>
                    <span class="eq-item-badge" id="eq-metrics-history-count">0 registros</span>
                  </div>
                  <div class="eq-metrics-history-list" id="eq-metrics-history-list">
                    <div class="eq-metrics-empty">Nenhuma quest\xE3o respondida nesta sess\xE3o ainda.</div>
                  </div>
                </div>

                <div class="eq-footer-note" style="margin-top: auto;">M\xE9tricas calculadas nativamente no navegador \u2022 100% livre de consumo de tokens</div>
              </div>

              <!-- TAB 4: DEBUG OUTPUT & TERMINAL -->
              <div class="eq-view-pane" id="eq-view-debug" style="display: none;">
                <!-- Cabe\xE7alho da Aba -->
                <div class="eq-operation-header" style="margin-bottom: 8px;">
                  <div>
                    <div class="eq-eyebrow">TERMINAL & AUDITORIA</div>
                    <h1 class="eq-operation-title" style="font-size: 15px;">Debug Output</h1>
                    <p class="eq-operation-subtitle">Logs em tempo real, m\xE9tricas de tokens e payloads brutos.</p>
                  </div>
                  <span class="eq-brand-badge" id="eq-debug-badge" style="background: rgba(0, 122, 204, 0.2); color: #0098ff;">ATIVO</span>
                </div>

                <!-- Grid 4 M\xE9tricas de Tokens / Desempenho -->
                <div class="eq-token-grid">
                  <div class="eq-token-box">
                    <div class="eq-token-title">Modelo</div>
                    <div class="eq-token-val" id="eq-dbg-model">--</div>
                  </div>
                  <div class="eq-token-box">
                    <div class="eq-token-title">Lat\xEAncia</div>
                    <div class="eq-token-val" id="eq-dbg-latency">--</div>
                  </div>
                  <div class="eq-token-box">
                    <div class="eq-token-title">Prompt / Resp</div>
                    <div class="eq-token-val" id="eq-dbg-split-tokens">-- / --</div>
                  </div>
                  <div class="eq-token-box">
                    <div class="eq-token-title">Total Tokens</div>
                    <div class="eq-token-val" id="eq-dbg-total-tokens" style="color: #4ec9b0;">--</div>
                  </div>
                </div>

                <!-- Alerta de Erro Recente (Se houver) -->
                <div class="eq-debug-error-card" id="eq-dbg-error-card" style="display: none;">
                  <div class="eq-debug-error-header">
                    <span>\uFE0F \xDAltimo Erro / Falha Registrada</span>
                    <button class="eq-icon-btn" id="eq-dbg-copy-error-btn" type="button" title="Copiar Erro" style="width: 20px; height: 20px;">
                      ${k.copy}
                    </button>
                  </div>
                  <div class="eq-debug-error-msg" id="eq-dbg-error-text"></div>
                </div>

                <!-- Terminal Interativo ao Vivo -->
                <div class="eq-field-group" style="gap: 6px;">
                  <div class="eq-debug-toolbar">
                    <div class="eq-filter-chips">
                      <button class="eq-filter-chip active" id="eq-dbg-filter-all" type="button">Todos (<span id="eq-dbg-count-all">0</span>)</button>
                      <button class="eq-filter-chip" id="eq-dbg-filter-error" type="button">Erros (<span id="eq-dbg-count-error">0</span>)</button>
                      <button class="eq-filter-chip" id="eq-dbg-filter-ai" type="button">IA (<span id="eq-dbg-count-ai">0</span>)</button>
                      <button class="eq-filter-chip" id="eq-dbg-filter-dom" type="button">DOM / Exec (<span id="eq-dbg-count-dom">0</span>)</button>
                    </div>
                    <div class="eq-debug-toolbar-actions">
                      <button class="eq-icon-btn" id="eq-dbg-scroll-toggle" type="button" title="Auto-Scroll Ligado (Clique para alternar)" style="width: 26px; height: 26px; color: #00ffcc;">
                        \u2193
                      </button>
                      <button class="eq-icon-btn" id="eq-dbg-copy-logs" type="button" title="Copiar Logs Atuais" style="width: 26px; height: 26px;">
                        ${k.copy}
                      </button>
                      <button class="eq-icon-btn" id="eq-dbg-clear-logs" type="button" title="Limpar Console" style="width: 26px; height: 26px; color: #ff5555;">
                        ${k.eraser}
                      </button>
                    </div>
                  </div>

                  <div class="eq-terminal" id="eq-live-debug-terminal" style="height: 180px;">
                    <div class="text-blue">> [SYS] Terminal de auditoria EasyQuiz pronto.</div>
                  </div>
                </div>

                <!-- Prompt Bruto Enviado (Raw) -->
                <div class="eq-field-group">
                  <div class="eq-section-title">
                    <span>Prompt Enviado \xE0 IA (Raw)</span>
                    <div style="display: flex; gap: 6px; align-items: center;">
                      <span class="text-muted" id="eq-dbg-prompt-len" style="font-size: 10px;">0 chars</span>
                      <button class="eq-btn-secondary" id="eq-dbg-copy-prompt" type="button" style="height: 24px; padding: 0 6px; font-size: 10px;">
                        ${k.copy} Copiar
                      </button>
                    </div>
                  </div>
                  <div class="eq-code-block" id="eq-dbg-prompt-view" style="max-height: 120px;">Nenhum prompt registrado ainda.</div>
                </div>

                <!-- Contexto & Escopo Injetado -->
                <div class="eq-field-group">
                  <div class="eq-section-title">
                    <span>Contexto & Escopo Injetado</span>
                    <button class="eq-btn-secondary" id="eq-dbg-copy-context" type="button" style="height: 24px; padding: 0 6px; font-size: 10px;">
                      ${k.copy} Copiar JSON
                    </button>
                  </div>
                  <div class="eq-code-block" id="eq-dbg-context-view" style="max-height: 110px;">Aguardando captura de contexto...</div>
                </div>

                <!-- Resposta Bruta da IA -->
                <div class="eq-field-group">
                  <div class="eq-section-title">
                    <span>Resposta Bruta da IA (Raw Output)</span>
                    <button class="eq-btn-secondary" id="eq-dbg-copy-raw-resp" type="button" style="height: 24px; padding: 0 6px; font-size: 10px;">
                      ${k.copy} Copiar Resposta
                    </button>
                  </div>
                  <div class="eq-code-block" id="eq-dbg-raw-resp-view" style="max-height: 110px;">Aguardando retorno da API...</div>
                </div>

                <div class="eq-footer-note" style="margin-top: auto;">Debug Live Output \u2022 Auditoria Completa de Tokens e Payloads</div>
              </div>

              <!-- TAB 4: CONFIGURA\xC7\xD5ES -->
              <div class="eq-view-pane" id="eq-view-settings" style="display: none;">
                <!-- Se\xE7\xE3o Multi-API Keys Gemini com Gerenciamento Completo -->
                <div class="eq-field-group">
                  <div class="eq-section-title" id="eq-keys-section-header">
                    <span style="display:flex;align-items:center;gap:6px;">
                      <span id="eq-keys-chevron" style="display:inline-flex;transition:transform 0.2s;">${k.chevronRight}</span>
                      <span>Chaves Gemini</span>
                    </span>
                    <div style="display: flex; gap: 8px; align-items: center;">
                      <span id="eq-keys-badge" class="eq-key-badge ready">1 ativa</span>
                      <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" style="color: var(--eq-accent); text-decoration: none; font-size: 10px; font-weight: 800; letter-spacing: 0.05em; text-transform: uppercase;">
                        + Obter \u2197
                      </a>
                    </div>
                  </div>

                  <!-- Lista Din\xE2mica de Chaves Cadastradas (colaps\xE1vel) -->
                  <div id="eq-keys-collapsible" style="overflow: hidden; transition: max-height 0.25s ease;">
                  <div id="eq-keys-list" class="eq-keys-list"></div>
                  </div>

                  <!-- Formul\xE1rio de Adi\xE7\xE3o de Nova Chave -->
                  <div class="eq-key-input-container">
                    <div class="eq-input-wrap">
                      <span class="eq-input-prefix-icon">${k.key}</span>
                      <input id="eq-api-key" class="eq-input" type="password" placeholder="Adicionar nova chave AIzaSy..." autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" />
                      <button class="eq-icon-btn" id="eq-key-save" type="button" title="Adicionar Chave">${k.plus}</button>
                      <button class="eq-icon-btn" id="eq-key-more-btn" type="button" title="Mais Op\xE7\xF5es das Chaves">${k.moreVertical}</button>
                    </div>

                    <!-- Context Menu Suspenso Din\xE2mico -->
                    <div class="eq-context-menu" id="eq-key-context-menu" hidden>
                      <button class="eq-context-item" id="eq-menu-prompt" type="button">
                        <span class="eq-item-icon">${k.edit}</span>
                        <span class="eq-item-text">Inserir via Janela Nativa</span>
                        <span class="eq-item-badge">Bypass</span>
                      </button>
                      <button class="eq-context-item" id="eq-menu-paste" type="button">
                        <span class="eq-item-icon">${k.paste}</span>
                        <span class="eq-item-text">Colar da \xC1rea de Transfer\xEAncia</span>
                      </button>
                      <button class="eq-context-item" id="eq-menu-toggle-vis" type="button">
                        <span class="eq-item-icon" id="eq-menu-vis-icon">${k.eye}</span>
                        <span class="eq-item-text" id="eq-menu-vis-text">Mostrar/Ocultar Campo</span>
                      </button>
                      <button class="eq-context-item" id="eq-menu-clear" type="button">
                        <span class="eq-item-icon">${k.eraser}</span>
                        <span class="eq-item-text">Limpar Campo</span>
                      </button>
                      <div class="eq-context-divider"></div>
                      <button class="eq-context-item" id="eq-menu-bulk" type="button">
                        <span class="eq-item-icon">${k.listPlus}</span>
                        <span class="eq-item-text">Importar Chaves em Lote</span>
                        <span class="eq-item-badge">Novo</span>
                      </button>
                      <button class="eq-context-item" id="eq-menu-edit-text" type="button">
                        <span class="eq-item-icon">${k.edit}</span>
                        <span class="eq-item-text">Ver / Editar Chaves como Texto</span>
                      </button>
                      <div class="eq-context-divider"></div>
                      <button class="eq-context-item" id="eq-menu-test" type="button">
                        <span class="eq-item-icon">${k.sparkles}</span>
                        <span class="eq-item-text">Testar Todas as Chaves</span>
                      </button>
                      <button class="eq-context-item danger" id="eq-menu-delete-all" type="button">
                        <span class="eq-item-icon">${k.trash}</span>
                        <span class="eq-item-text">Apagar Todas as Chaves</span>
                      </button>
                      <button class="eq-context-item danger" id="eq-menu-reset" type="button">
                        <span class="eq-item-icon">${k.trash}</span>
                        <span class="eq-item-text">Resetar Dados e Cache</span>
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Sele\xE7\xE3o de Modelos -->
                <div class="eq-field-group">
                  <div class="eq-section-title">Modelo Padr\xE3o</div>
                  <select id="eq-model-select" class="eq-select"></select>
                </div>
                
                <div class="eq-grid-2">
                  <div class="eq-field-group">
                    <div class="eq-section-title">Modo da Quest\xE3o</div>
                    <select id="eq-mode-select" class="eq-select"></select>
                  </div>
                  <div class="eq-field-group">
                    <div class="eq-section-title">Motor de Execu\xE7\xE3o</div>
                    <select id="eq-engine-select" class="eq-select"></select>
                  </div>
                </div>

                <!-- Prefer\xEAncias do Sistema -->
                <div class="eq-grid-2" style="margin-top: 8px;">
                  <label class="eq-checkbox-label">
                    <input id="eq-dry-run" type="checkbox" />
                    <span>Simular (Dry-Run)</span>
                  </label>
                  <label class="eq-checkbox-label">
                    <input id="eq-auto-apply" type="checkbox" />
                    <span>Auto Aplicar</span>
                  </label>
                </div>
                
                <label class="eq-checkbox-label">
                  <input id="eq-auto-advance" type="checkbox" />
                  <span>Auto Avan\xE7ar Ap\xF3s Injetar</span>
                </label>

                <div class="eq-field-group" style="gap: 8px; margin-top: 8px;">
                  <label class="eq-checkbox-label">
                    <input id="eq-use-vision" type="checkbox" />
                    <span>Vis\xE3o Computacional (Imagens)</span>
                  </label>

                  <label class="eq-checkbox-label" style="margin-top: 6px;">
                    <input id="eq-host-dark" type="checkbox" />
                    <span style="color: #00ffcc;">Habilitar Smart Dark Mode no Site</span>
                  </label>
                </div>

                <!-- Zona de Redefini\xE7\xE3o -->
                <div class="eq-field-group" style="margin-top: 14px; padding-top: 12px; border-top: 1px solid #282828;">
                  <div class="eq-section-title" style="color: #ff5555;">Zona de Redefini\xE7\xE3o</div>
                  <button class="eq-btn-secondary" id="eq-reset-all-btn" type="button" style="border-color: #662222; color: #ff8888;">
                    ${k.trash} Resetar Todos os Dados e Mem\xF3ria
                  </button>
                </div>

                <div class="eq-footer-note" style="margin-top: auto;">Configura\xE7\xF5es salvas localmente no navegador \u2022 ${ze}</div>
              </div>
            </div>
          </main>
        </aside>
    `),this.launcherBtn=this.shadow.querySelector(".eq-launcher"),this.launcherDot=this.shadow.querySelector("#eq-launcher-dot"),this.dockToggleBtn=this.shadow.querySelector("#eq-dock-toggle"),this.sidebarEl=this.shadow.querySelector(".eq-sidebar"),this.apToggleBtn=this.shadow.querySelector("#eq-ap-toggle-btn"),this.apConsole=this.shadow.querySelector("#eq-ap-console"),this.executionConsole=this.shadow.querySelector("#eq-execution-console"),this.progressContainer=this.shadow.querySelector("#eq-progress-container"),this.progressBar=this.shadow.querySelector("#eq-progress-bar"),this.progressLabel=this.shadow.querySelector("#eq-progress-label"),this.progressVal=this.shadow.querySelector("#eq-progress-val"),this.contextTreeContainer=this.shadow.querySelector("#eq-tree-container"),this.dotPulseAp=this.shadow.querySelector("#eq-dot-ap"),this.statusTextAp=this.shadow.querySelector("#eq-status-text-ap"),this.stopwatchAp=this.shadow.querySelector("#eq-stopwatch-ap span"),this.dotPulseAdv=this.dotPulseAp,this.statusTextAdv=this.statusTextAp,this.stopwatchAdv=this.stopwatchAp,this.inspModel=this.shadow.querySelector("#eq-insp-model"),this.inspLatency=this.shadow.querySelector("#eq-insp-latency"),this.inspTokens=this.shadow.querySelector("#eq-insp-tokens"),this.inspPrompt=this.shadow.querySelector("#eq-insp-prompt"),this.inspRationale=this.shadow.querySelector("#eq-insp-rationale"),this.inspActions=this.shadow.querySelector("#eq-insp-actions"),this.copyPromptBtn=this.shadow.querySelector("#eq-copy-prompt-btn"),this.liveDebugTerminal=this.shadow.querySelector("#eq-live-debug-terminal"),this.dbgModel=this.shadow.querySelector("#eq-dbg-model"),this.dbgLatency=this.shadow.querySelector("#eq-dbg-latency"),this.dbgSplitTokens=this.shadow.querySelector("#eq-dbg-split-tokens"),this.dbgTotalTokens=this.shadow.querySelector("#eq-dbg-total-tokens"),this.dbgErrorCard=this.shadow.querySelector("#eq-dbg-error-card"),this.dbgErrorText=this.shadow.querySelector("#eq-dbg-error-text"),this.dbgPromptLen=this.shadow.querySelector("#eq-dbg-prompt-len"),this.dbgPromptView=this.shadow.querySelector("#eq-dbg-prompt-view"),this.dbgContextView=this.shadow.querySelector("#eq-dbg-context-view"),this.dbgRawRespView=this.shadow.querySelector("#eq-dbg-raw-resp-view"),this.dbgCountAll=this.shadow.querySelector("#eq-dbg-count-all"),this.dbgCountError=this.shadow.querySelector("#eq-dbg-count-error"),this.dbgCountAi=this.shadow.querySelector("#eq-dbg-count-ai"),this.dbgCountDom=this.shadow.querySelector("#eq-dbg-count-dom"),this.apiKeyInput=this.shadow.querySelector("#eq-api-key"),this.keyContextMenu=this.shadow.querySelector("#eq-key-context-menu"),this.keyMoreBtn=this.shadow.querySelector("#eq-key-more-btn"),this.keysListEl=this.shadow.querySelector("#eq-keys-list"),this.keysBadgeEl=this.shadow.querySelector("#eq-keys-badge"),this.modelSelect=this.shadow.querySelector("#eq-model-select"),this.modeSelect=this.shadow.querySelector("#eq-mode-select"),this.engineSelect=this.shadow.querySelector("#eq-engine-select"),this.dryRunCheckbox=this.shadow.querySelector("#eq-dry-run"),this.autoApplyCheckbox=this.shadow.querySelector("#eq-auto-apply"),this.autoAdvanceCheckbox=this.shadow.querySelector("#eq-auto-advance"),this.hostDarkModeCheckbox=this.shadow.querySelector("#eq-host-dark"),this.useVisionCheckbox=this.shadow.querySelector("#eq-use-vision"),this.analyzeBtn=this.shadow.querySelector("#eq-analyze-btn"),this.applyBtn=this.shadow.querySelector("#eq-apply-btn"),this.applyBtn&&(this.applyBtn.disabled=!0),this.resultContainer=this.shadow.querySelector("#eq-result"),this.floatingAnswers=new Ge(this.shadow,()=>{this.callbacks.onAnalyze(1)});let a=this.shadow.querySelector("#eq-open-hud-btn");a&&a.addEventListener("click",()=>{this.latestPlan&&this.floatingAnswers.show(this.latestPlan)}),xe.filter(i=>W(i.id)).forEach(i=>this.modelSelect.add(new Option(i.name,i.id,!1,i.id===e.model))),Po.forEach(i=>this.modeSelect.add(new Option(i.label,i.value,!1,i.value===e.modeHint))),zo.forEach(i=>this.engineSelect.add(new Option(i.label,i.value,!1,i.value===e.engine))),this.apiKeyInput.value=e.apiKey,this.dryRunCheckbox.checked=e.dryRun,this.autoApplyCheckbox.checked=e.autoApply,this.autoAdvanceCheckbox.checked=e.autoAdvance,this.hostDarkModeCheckbox.checked=e.hostDarkMode,this.useVisionCheckbox.checked=e.useVision,this.metricsLiveTime=this.shadow.querySelector("#eq-metrics-live-time"),this.metricsLiveStatus=this.shadow.querySelector("#eq-metrics-live-status"),this.metricsTotalBadge=this.shadow.querySelector("#eq-metrics-total-badge"),this.metricTotalTime=this.shadow.querySelector("#eq-metric-total-time"),this.metricAvgTime=this.shadow.querySelector("#eq-metric-avg-time"),this.metricTotalCount=this.shadow.querySelector("#eq-metric-total-count"),this.metricsHistoryList=this.shadow.querySelector("#eq-metrics-history-list"),this.metricsHistoryCount=this.shadow.querySelector("#eq-metrics-history-count"),this.metricsCopyBtn=this.shadow.querySelector("#eq-metrics-copy-btn"),this.metricsResetBtn=this.shadow.querySelector("#eq-metrics-reset-btn"),this.setupEventListeners(),this.updateTimingMetrics(),this.mountHost(),this.applyHostDarkMode(e.hostDarkMode);let r=Array.isArray(e.apiKeys)&&e.apiKeys.length>0?e.apiKeys:e.apiKey?[e.apiKey]:[];z.init(r),this.apiKeyInput.value=z.getBestKey()||e.apiKey||"",this.renderKeysList();let n=window.setInterval(()=>{this.activeTab==="settings"&&this.renderKeysList()},1e3);typeof n?.unref=="function"&&n.unref();let s=z.getBestKey()||e.apiKey;s&&Ne(s).then(i=>{i&&i.length>0&&this.updateModelSelect(i,e.model)}).catch(()=>{})}switchTab(e){this.activeTab=e;let t=["resolver","brain","media","metrics","debug","settings"];for(let a of t){let r=this.shadow.querySelector(`#eq-tab-${a}`),n=this.shadow.querySelector(`#eq-view-${a}`);a===e?(r?.classList.add("active"),n&&(n.style.display="flex")):(r?.classList.remove("active"),n&&(n.style.display="none"))}e==="brain"?(this.renderContextTree(),this.refreshInspectorView()):e==="media"?this.renderMediaTab():e==="metrics"?this.updateTimingMetrics():e==="debug"&&(this.refreshDebugView(),this.renderTerminalEntries())}setupEventListeners(){this.shadow.querySelector("#eq-tab-resolver")?.addEventListener("click",()=>this.switchTab("resolver")),this.shadow.querySelector("#eq-tab-brain")?.addEventListener("click",()=>this.switchTab("brain")),this.shadow.querySelector("#eq-tab-media")?.addEventListener("click",()=>this.switchTab("media")),this.shadow.querySelector("#eq-tab-metrics")?.addEventListener("click",()=>this.switchTab("metrics")),this.shadow.querySelector("#eq-tab-debug")?.addEventListener("click",()=>this.switchTab("debug")),this.shadow.querySelector("#eq-tab-settings")?.addEventListener("click",()=>this.switchTab("settings"));let e=this.shadow.querySelector("#eq-resolver-menu-btn"),t=this.shadow.querySelector("#eq-resolver-menu");e?.addEventListener("click",v=>{v.stopPropagation(),t&&(t.hidden=!t.hidden)}),this.shadow.addEventListener("click",v=>{let x=v.target;!x.closest("#eq-resolver-menu")&&!x.closest("#eq-resolver-menu-btn")&&t?.setAttribute("hidden","true")}),t?.querySelectorAll("[data-action]").forEach(v=>{v.addEventListener("click",()=>{let x=v.dataset.action;x==="analyze"?this.callbacks.onAnalyze(1):x==="inject"&&this.callbacks.onApply(1),t.hidden=!0})});let a=this.shadow.querySelector("#eq-status-card");a?.addEventListener("click",()=>{let v=a.classList.toggle("is-collapsed");a.setAttribute("aria-expanded",String(!v))}),this.metricsResetBtn?.addEventListener("click",()=>{qe(),this.stopQuestionTimer(0),this.currentQuestionStartTime=0,this.metricsLiveTime&&(this.metricsLiveTime.textContent="00:00.00"),this.metricsLiveStatus&&(this.metricsLiveStatus.textContent="Em espera",this.metricsLiveStatus.classList.remove("active")),this.updateTimingMetrics(),this.logToConsole("> [SYS] M\xE9tricas e hist\xF3rico de tempo zerados com sucesso.","text-yellow")}),this.metricsCopyBtn?.addEventListener("click",()=>{this.copyMetricsReport()}),this.shadow.querySelector("#eq-dbg-filter-all")?.addEventListener("click",()=>this.setLogFilter("all")),this.shadow.querySelector("#eq-dbg-filter-error")?.addEventListener("click",()=>this.setLogFilter("error")),this.shadow.querySelector("#eq-dbg-filter-ai")?.addEventListener("click",()=>this.setLogFilter("ai")),this.shadow.querySelector("#eq-dbg-filter-dom")?.addEventListener("click",()=>this.setLogFilter("dom"));let r=this.shadow.querySelector("#eq-dbg-scroll-toggle");r?.addEventListener("click",()=>{this.autoScrollLogs=!this.autoScrollLogs,r&&(r.style.color=this.autoScrollLogs?"#00ffcc":"#858585",r.title=this.autoScrollLogs?"Auto-Scroll Ligado (Clique para desligar)":"Auto-Scroll Desligado (Clique para ligar)"),this.autoScrollLogs&&this.liveDebugTerminal&&(this.liveDebugTerminal.scrollTop=this.liveDebugTerminal.scrollHeight)});let n=this.shadow.querySelector("#eq-dbg-copy-logs");n?.addEventListener("click",()=>{let v=this.getFormattedLogs();navigator.clipboard.writeText(v).then(()=>{let x=n.innerHTML;n.innerHTML=k.check,setTimeout(()=>n.innerHTML=x,1800)})}),this.shadow.querySelector("#eq-dbg-clear-logs")?.addEventListener("click",()=>{this.clearLogs()});let s=this.shadow.querySelector("#eq-dbg-copy-prompt");s?.addEventListener("click",()=>{let v=this.latestPromptText||this.latestPlan?.promptSent||"";navigator.clipboard.writeText(v).then(()=>{let x=s.innerHTML;s.innerHTML=`${k.check} Copiado!`,setTimeout(()=>s.innerHTML=x,1800)})});let i=this.shadow.querySelector("#eq-dbg-copy-context");i?.addEventListener("click",()=>{let v=this.dbgContextView?.textContent||"";navigator.clipboard.writeText(v).then(()=>{let x=i.innerHTML;i.innerHTML=`${k.check} Copiado!`,setTimeout(()=>i.innerHTML=x,1800)})});let d=this.shadow.querySelector("#eq-dbg-copy-raw-resp");d?.addEventListener("click",()=>{let v=this.latestPlan?.rawResponse||this.dbgRawRespView?.textContent||"";navigator.clipboard.writeText(v).then(()=>{let x=d.innerHTML;d.innerHTML=`${k.check} Copiado!`,setTimeout(()=>d.innerHTML=x,1800)})});let l=this.shadow.querySelector("#eq-dbg-copy-error-btn");l?.addEventListener("click",()=>{let v=this.lastErrorMsg||"";navigator.clipboard.writeText(v).then(()=>{let x=l.innerHTML;l.innerHTML=k.check,setTimeout(()=>l.innerHTML=x,1800)})}),this.shadow.querySelector("#eq-refresh-context-btn")?.addEventListener("click",()=>{this.renderContextTree()}),this.launcherBtn.addEventListener("click",()=>this.toggle()),this.dockToggleBtn.addEventListener("click",()=>this.toggle()),window.addEventListener("keydown",v=>{v.altKey&&(v.key==="q"||v.key==="Q"||v.key==="a"||v.key==="A")&&(v.preventDefault(),this.toggle())},!0);let u=v=>{let x=v.composedPath();x.includes(this.shadow)||(x.includes(this.sidebarEl)||x.includes(this.host))&&v.stopImmediatePropagation()};window.addEventListener("keydown",u,!0),window.addEventListener("keyup",u,!0),window.addEventListener("keypress",u,!0),this.apiKeyInput.addEventListener("input",()=>{let v=this.apiKeyInput.value.trim().replace(/^["']|["']$/g,"");this.callbacks.onSettingsChange({apiKey:v})});let h=this.shadow.querySelector("#eq-keys-collapsible"),c=this.shadow.querySelector("#eq-keys-chevron"),m=this.shadow.querySelector("#eq-keys-section-header"),p=v=>{h&&(v?(h.style.display="none",c&&(c.style.transform="rotate(0deg)")):(h.style.display="block",h.style.maxHeight="none",h.style.overflow="visible",c&&(c.style.transform="rotate(90deg)")))},f=!1;try{f=localStorage.getItem("easyquiz_keys_collapsed")==="true"}catch{}p(f),m?.addEventListener("click",v=>{if(v.target?.closest("a"))return;let x=h?.style.display==="none";p(!x);try{localStorage.setItem("easyquiz_keys_collapsed",x?"false":"true")}catch{}}),this.shadow.querySelector("#eq-key-save").addEventListener("click",()=>{let v=this.apiKeyInput.value.trim().replace(/^["']|["']$/g,"");if(!v){this.setStatus("Insira o valor da chave antes de adicionar.","warning");return}let x=z.addKey(v);if(x.ok){let q=z.exportRawKeys();this.callbacks.onSettingsChange({apiKey:q[0],apiKeys:q}),this.apiKeyInput.value="",this.setStatus(` Nova chave adicionada com sucesso! (${q.length} chaves ativas no pool)`,"success"),p(!1);try{localStorage.setItem("easyquiz_keys_collapsed","false")}catch{}this.renderKeysList(),this.keyContextMenu.hidden=!0,Re(v).then(T=>{T.ok?(z.markSuccess(v,100),this.setStatus(" Nova chave validada com sucesso no Google AI Studio!","success")):(z.markInvalid(v,T.message),this.setStatus(`\uFE0F Chave cadastrada, mas aviso retornado: ${T.message}`,"warning")),this.renderKeysList()}).catch(()=>{})}else this.setStatus(x.message,"warning")}),this.keyMoreBtn.addEventListener("click",v=>{v.stopPropagation(),this.keyContextMenu.hidden=!this.keyContextMenu.hidden}),this.shadow.addEventListener("click",v=>{let x=v.target;!x.closest("#eq-key-context-menu")&&!x.closest("#eq-key-more-btn")&&(this.keyContextMenu.hidden=!0)}),this.shadow.querySelector("#eq-menu-prompt")?.addEventListener("click",()=>{this.keyContextMenu.hidden=!0;let v=window.prompt("Adicionar Nova Chave API do Google Gemini (AI Studio):");if(v!==null&&v.trim()){let x=v.trim().replace(/^["']|["']$/g,""),q=z.addKey(x);if(q.ok){let T=z.exportRawKeys();this.callbacks.onSettingsChange({apiKey:T[0],apiKeys:T}),this.setStatus("Chave Gemini adicionada com sucesso!","success"),this.renderKeysList()}else this.setStatus(q.message,"warning")}}),this.shadow.querySelector("#eq-menu-paste")?.addEventListener("click",async()=>{this.keyContextMenu.hidden=!0;try{let v=await navigator.clipboard.readText();if(v){let x=v.trim().replace(/^["']|["']$/g,"");this.apiKeyInput.value=x,this.setStatus('Chave colada no campo. Clique no bot\xE3o "+" para adicionar ao pool.',"info")}}catch{let v=window.prompt("Adicionar Nova Chave API do Google Gemini:");if(v!==null&&v.trim()){let x=v.trim().replace(/^["']|["']$/g,"");if(z.addKey(x).ok){let T=z.exportRawKeys();this.callbacks.onSettingsChange({apiKey:T[0],apiKeys:T}),this.setStatus("Chave Gemini adicionada com sucesso!","success"),this.renderKeysList()}}}}),this.shadow.querySelector("#eq-menu-toggle-vis")?.addEventListener("click",()=>{this.keyContextMenu.hidden=!0;let v=this.apiKeyInput.type==="password";this.apiKeyInput.type=v?"text":"password";let x=this.shadow.querySelector("#eq-menu-vis-icon"),q=this.shadow.querySelector("#eq-menu-vis-text");x&&(x.innerHTML=v?k.eyeOff:k.eye),q&&(q.textContent=v?"Ocultar Campo":"Mostrar Campo")}),this.shadow.querySelector("#eq-menu-clear")?.addEventListener("click",()=>{this.keyContextMenu.hidden=!0,this.apiKeyInput.value="",this.setStatus("Campo de inser\xE7\xE3o limpo.","info"),this.apiKeyInput.focus()}),this.shadow.querySelector("#eq-menu-bulk")?.addEventListener("click",()=>{this.keyContextMenu.hidden=!0,this.shadow.querySelector("#eq-bulk-overlay")?.remove();let v=document.createElement("div");v.id="eq-bulk-overlay",v.style.cssText=["position:fixed","inset:0","z-index:2147483647","pointer-events:auto","background:rgba(0,0,0,0.78)","backdrop-filter:blur(4px)","-webkit-backdrop-filter:blur(4px)","display:flex","align-items:center","justify-content:center",'font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif',"user-select:text","-webkit-user-select:text"].join(";");let x=document.createElement("div");x.style.cssText=["background:#11151c","color:#e2e8f0","border:1px solid #283548","border-radius:12px","padding:20px","width:440px","max-width:92vw","font-size:13px","box-shadow:0 12px 40px rgba(0,0,0,0.85), 0 0 0 1px rgba(0,229,255,0.15)","display:flex","flex-direction:column","gap:10px","pointer-events:auto"].join(";"),x.innerHTML=`
        <div style="display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #1f2937;padding-bottom:10px;">
          <div style="display:flex;align-items:center;gap:8px;">
            <span style="font-size:16px;"></span>
            <h3 style="margin:0;font-size:14px;color:#00e5ff;font-weight:700;letter-spacing:0.02em;">Importar Chaves em Lote</h3>
          </div>
          <button id="eq-bulk-x" style="background:none;border:none;color:#94a3b8;font-size:20px;cursor:pointer;padding:0 4px;line-height:1;border-radius:4px;pointer-events:auto;" title="Fechar (Esc)"></button>
        </div>
        <p style="margin:0;font-size:11px;color:#94a3b8;line-height:1.4;">
          Cole suas chaves Gemini abaixo (uma por linha ou qualquer texto contendo chaves). O EasyQuiz extrai, adiciona e valida tudo automaticamente.
        </p>
        <div style="display:flex;gap:8px;">
          <button id="eq-bulk-paste-btn" type="button" style="background:#1e293b;color:#38bdf8;border:1px solid #0284c7;border-radius:6px;padding:5px 12px;font-size:11px;font-weight:600;cursor:pointer;display:inline-flex;align-items:center;gap:5px;pointer-events:auto;">
             Colar do Clipboard
          </button>
          <button id="eq-bulk-clear-btn" type="button" style="background:#1e293b;color:#94a3b8;border:1px solid #334155;border-radius:6px;padding:5px 10px;font-size:11px;cursor:pointer;pointer-events:auto;">
            Limpar
          </button>
        </div>
        <textarea id="eq-bulk-ta"
          style="width:100%;height:150px;background:#0b0f17;color:#f8fafc;border:1px solid #334155;border-radius:8px;padding:10px;font-family:'JetBrains Mono',Consolas,monospace;font-size:11px;box-sizing:border-box;resize:vertical;outline:none;line-height:1.5;pointer-events:auto;user-select:text;-webkit-user-select:text;"
          placeholder="AIzaSyA123...&#10;AIzaSyB456...&#10;AIzaSyC789..."></textarea>
        <div id="eq-bulk-status" style="min-height:18px;font-size:11px;color:#94a3b8;line-height:1.4;"></div>
        <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:2px;">
          <button id="eq-bulk-cancel" type="button" style="background:#1e293b;color:#cbd5e1;border:1px solid #334155;border-radius:6px;padding:7px 16px;cursor:pointer;font-size:12px;font-weight:600;pointer-events:auto;">Cancelar</button>
          <button id="eq-bulk-import" type="button" style="background:#00e5ff;color:#031326;border:none;border-radius:6px;padding:7px 18px;cursor:pointer;font-size:12px;font-weight:700;box-shadow:0 0 12px rgba(0,229,255,0.25);pointer-events:auto;"> Importar e Validar</button>
        </div>
      `,v.appendChild(x),this.shadow.appendChild(v);let q=x.querySelector("#eq-bulk-ta"),T=x.querySelector("#eq-bulk-status"),M=x.querySelector("#eq-bulk-import"),E=x.querySelector("#eq-bulk-paste-btn"),L=x.querySelector("#eq-bulk-clear-btn");requestAnimationFrame(()=>q?.focus());let S=()=>{v.remove()};["keydown","keyup","keypress","paste","copy","cut"].forEach(w=>{v.addEventListener(w,I=>{I.stopPropagation(),I.stopImmediatePropagation()},!0)}),v.addEventListener("keydown",w=>{w.key==="Escape"&&S()}),v.addEventListener("click",w=>{w.target===v&&S()}),x.querySelector("#eq-bulk-x")?.addEventListener("click",S),x.querySelector("#eq-bulk-cancel")?.addEventListener("click",S),L.addEventListener("click",()=>{q.value="",T.textContent="",q.focus()}),E.addEventListener("click",async()=>{try{let w=await navigator.clipboard?.readText();w?(q.value=w,q.focus(),T.style.color="#38bdf8",T.textContent="Conte\xFAdo colado da \xE1rea de transfer\xEAncia com sucesso!"):(T.style.color="#fbbf24",T.textContent="\xC1rea de transfer\xEAncia vazia ou sem permiss\xE3o de leitura.")}catch{T.style.color="#fbbf24",T.textContent="Permiss\xE3o de clipboard negada pelo navegador. Use Ctrl+V diretamente na caixa.",q.focus()}}),x.querySelector("#eq-bulk-import")?.addEventListener("click",async()=>{let w=q.value.trim();if(!w){T.style.color="#f87171",T.textContent="Insira pelo menos uma chave de API antes de importar.";return}let I=w.match(/AIza[0-9A-Za-z\-_]{35}/g),O=[];if(I&&I.length>0?O=Array.from(new Set(I)):O=Array.from(new Set(w.split(/[\n,;\s]+/).map(V=>V.trim().replace(/^["'`]|["'`]$/g,"")).filter(V=>V.length>=20))),O.length===0){T.style.color="#f87171",T.textContent="Nenhuma chave v\xE1lida encontrada (m\xEDnimo 20 caracteres).";return}T.style.color="#00e5ff",T.textContent=`Processando ${O.length} chave(s)...`,M.disabled=!0,M.style.opacity="0.6";let B=0,N=0;for(let V of O){let ae=z.addKey(V);ae.ok?B++:ae.message.includes("j\xE1 est\xE1 cadastrada")&&N++}if(B>0){let V=z.exportRawKeys();this.callbacks.onSettingsChange({apiKey:V[0],apiKeys:V}),p(!1);try{localStorage.setItem("easyquiz_keys_collapsed","false")}catch{}}T.textContent=`${B} adicionada(s), ${N} duplicada(s). Validando modelo em paralelo...`;let X=z.exportRawKeys(),U=this.modelSelect?.value||"gemini-3.5-flash-lite",J=await nt(U,X);J.ok?(z.markSuccess(J.key,200),T.style.color="#4ade80",T.textContent=` ${B} adicionada(s), ${N} duplicada(s). Modelo '${J.model}' pronto!`):(T.style.color="#fbbf24",T.textContent=`${B} adicionada(s), ${N} duplicada(s). Aviso: ${J.message}`),this.renderKeysList(),M.disabled=!1,M.style.opacity="1",B>0&&(this.setStatus(` Lote importado: ${B} chave(s) adicionada(s) ao pool!`,"success"),setTimeout(S,2200))})}),this.shadow.querySelector("#eq-menu-edit-text")?.addEventListener("click",()=>{this.keyContextMenu.hidden=!0,this.shadow.querySelector("#eq-text-editor-overlay")?.remove();let v=z.exportRawKeys(),x=document.createElement("div");x.id="eq-text-editor-overlay",x.style.cssText=["position:fixed","inset:0","z-index:2147483647","pointer-events:auto","background:rgba(0,0,0,0.82)","backdrop-filter:blur(4px)","-webkit-backdrop-filter:blur(4px)","display:flex","align-items:center","justify-content:center",'font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif'].join(";");let q=document.createElement("div");q.style.cssText=["background:#11151c","color:#e2e8f0","border:1px solid #283548","border-radius:12px","padding:20px","width:460px","max-width:94vw","font-size:13px","box-shadow:0 12px 40px rgba(0,0,0,0.85),0 0 0 1px rgba(0,229,255,0.15)","display:flex","flex-direction:column","gap:10px","pointer-events:auto"].join(";"),q.innerHTML=`
        <div style="display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #1f2937;padding-bottom:10px;">
          <div style="display:flex;align-items:center;gap:8px;">
            <span style="font-size:16px;">\uFE0F</span>
            <h3 style="margin:0;font-size:14px;color:#00e5ff;font-weight:700;">Ver / Editar Chaves como Texto</h3>
          </div>
          <button id="eq-edittext-x" style="background:none;border:none;color:#94a3b8;font-size:20px;cursor:pointer;padding:0 4px;line-height:1;border-radius:4px;" title="Fechar (Esc)"></button>
        </div>
        <p style="margin:0;font-size:11px;color:#94a3b8;line-height:1.5;">
          Cada linha = uma chave. Edite, apague linhas ou cole novas. Clique <b style="color:#e2e8f0;">Salvar</b> para substituir todas as chaves atuais pelas do texto.
        </p>
        <textarea id="eq-edittext-ta"
          style="width:100%;height:180px;background:#0b0f17;color:#4ade80;border:1px solid #334155;border-radius:8px;padding:10px;font-family:'JetBrains Mono',Consolas,monospace;font-size:11.5px;box-sizing:border-box;resize:vertical;outline:none;line-height:1.6;pointer-events:auto;user-select:text;-webkit-user-select:text;letter-spacing:0.02em;"
          placeholder="Cole ou edite suas chaves aqui (uma por linha)"></textarea>
        <div id="eq-edittext-status" style="min-height:16px;font-size:11px;color:#94a3b8;"></div>
        <div style="display:flex;gap:8px;justify-content:space-between;margin-top:2px;align-items:center;">
          <button id="eq-edittext-clear" type="button" style="background:#1e293b;color:#f87171;border:1px solid #7f1d1d;border-radius:6px;padding:6px 14px;cursor:pointer;font-size:11px;font-weight:600;"> Apagar Tudo</button>
          <div style="display:flex;gap:8px;">
            <button id="eq-edittext-cancel" type="button" style="background:#1e293b;color:#cbd5e1;border:1px solid #334155;border-radius:6px;padding:7px 16px;cursor:pointer;font-size:12px;font-weight:600;">Cancelar</button>
            <button id="eq-edittext-save" type="button" style="background:#00e5ff;color:#031326;border:none;border-radius:6px;padding:7px 18px;cursor:pointer;font-size:12px;font-weight:700;box-shadow:0 0 12px rgba(0,229,255,0.25);"> Salvar</button>
          </div>
        </div>
      `,x.appendChild(q),this.shadow.appendChild(x);let T=q.querySelector("#eq-edittext-ta"),M=q.querySelector("#eq-edittext-status");T.value=v.join(`
`),requestAnimationFrame(()=>{T.focus(),T.select()});let E=()=>x.remove();["keydown","keyup","keypress","paste","copy","cut"].forEach(L=>{x.addEventListener(L,S=>{S.stopPropagation(),S.stopImmediatePropagation()},!0)}),x.addEventListener("keydown",L=>{L.key==="Escape"&&E()}),x.addEventListener("click",L=>{L.target===x&&E()}),q.querySelector("#eq-edittext-x")?.addEventListener("click",E),q.querySelector("#eq-edittext-cancel")?.addEventListener("click",E),q.querySelector("#eq-edittext-clear")?.addEventListener("click",()=>{confirm("Apagar todas as chaves? Esta a\xE7\xE3o \xE9 irrevers\xEDvel.")&&(T.value="",M.style.color="#fbbf24",M.textContent="Campo limpo. Clique em Salvar para confirmar a remo\xE7\xE3o de todas as chaves.")}),q.querySelector("#eq-edittext-save")?.addEventListener("click",()=>{let L=T.value.split(/[\n\r]+/).map(I=>I.trim().replace(/^["']|["']$/g,"")).filter(I=>I.length>5),S=Array.from(new Set(L));z.init(S);let w=z.exportRawKeys();this.callbacks.onSettingsChange({apiKey:w[0]||"",apiKeys:w}),this.renderKeysList(),M.style.color="#4ade80",S.length===0?M.textContent=" Todas as chaves removidas.":M.textContent=` ${S.length} chave(s) salva(s) com sucesso!`,this.setStatus(S.length>0?` ${S.length} chave(s) salva(s)!`:"Todas as chaves foram removidas.",S.length>0?"success":"info"),setTimeout(E,1400)})}),this.shadow.querySelector("#eq-menu-delete-all")?.addEventListener("click",()=>{this.keyContextMenu.hidden=!0;let v=z.getAllKeys();if(v.length===0)return this.setStatus("Nenhuma chave para apagar.","info");confirm(`Apagar todas as ${v.length} chave(s) permanentemente?`)&&(z.init([]),this.callbacks.onSettingsChange({apiKey:"",apiKeys:[]}),this.renderKeysList(),this.setStatus("Todas as chaves foram removidas.","info"))}),this.shadow.querySelector("#eq-menu-test")?.addEventListener("click",async()=>{this.keyContextMenu.hidden=!0;let v=z.getAllKeys();if(v.length===0)return this.setStatus("Nenhuma chave cadastrada para testar.","error");this.setStatus(` Testando ${v.length} chave(s) em paralelo...`,"info");let x=this.modelSelect?.value||"gemini-3.5-flash-lite",q=v.map(M=>M.key),T=await nt(x,q);if(T.ok)z.markSuccess(T.key,150),this.setStatus(` Validado! Modelo '${T.model}' respondeu com sucesso!`,"success");else{let M=await Promise.allSettled(q.map(L=>Re(L))),E=0;M.forEach((L,S)=>{if(L.status==="fulfilled"&&L.value.ok)E++,z.markSuccess(q[S],200);else{let w=L.status==="fulfilled"?L.value.message:String(L.reason);z.markInvalid(q[S],w)}}),this.setStatus(`Teste: ${E}/${v.length} chave(s) v\xE1lidas. ${T.message}`,E>0?"info":"error")}this.renderKeysList()});let A=()=>{this.keyContextMenu.hidden=!0,window.confirm("Deseja realmente resetar todos os dados, chaves e mem\xF3ria de sess\xE3o do EasyQuiz?")&&(this.autopilot.isActive()&&this.autopilot.stop(),this.updateAutopilotUi(!1),this.setBusy(!1),wt(),qe(),this.stopQuestionTimer(0),this.currentQuestionStartTime=0,this.metricsLiveTime&&(this.metricsLiveTime.textContent="00:00.00"),this.metricsLiveStatus&&(this.metricsLiveStatus.textContent="Em espera",this.metricsLiveStatus.className="eq-live-stopwatch-status"),this.updateTimingMetrics(),this.apiKeyInput.value="",this.callbacks.onSettingsChange({apiKey:""}),this.setStatus("Todos os dados do EasyQuiz foram limpos.","info"),this.logToConsole("> [SYS] Armazenamento local resetado.","text-yellow"))};this.shadow.querySelector("#eq-menu-reset")?.addEventListener("click",A),this.shadow.querySelector("#eq-reset-all-btn")?.addEventListener("click",A),this.apToggleBtn.addEventListener("click",()=>{if(this.autopilot.isActive())this.autopilot.stop(),this.callbacks.onCancel?.(),this.setProgress(0),this.updateAutopilotUi(!1),this.setInterrupted("Autopilot interrompido imediatamente pelo usu\xE1rio.");else{if(!this.apiKeyInput.value.trim().replace(/^["']|["']$/g,"")){this.setStatus("Configure sua chave de API Gemini na aba Configura\xE7\xF5es antes de ligar o Autopilot.","error"),this.switchTab("settings"),this.apiKeyInput.focus();return}this.callbacks.onSettingsChange({autoApply:!0,autoAdvance:!0}),this.autoApplyCheckbox.checked=!0,this.autoAdvanceCheckbox.checked=!0,Ot(),this.autopilot.start(),this.updateAutopilotUi(!0),this.startStopwatch(),this.setStatus("Autopilot ativo. Monitorando exerc\xEDcios...","info")}}),this.shadow.querySelector("#eq-ap-clear-memory").addEventListener("click",()=>{et(),this.logToConsole("> [SYS] Mem\xF3ria contextual limpa com sucesso.","text-green"),this.setStatus("Mem\xF3ria contextual da sess\xE3o limpa.","success")});let y=this.shadow.querySelector("#eq-copy-console-btn");y?.addEventListener("click",()=>{let v=this.apConsole?.innerText||"";navigator.clipboard.writeText(v).then(()=>{let x=y.innerHTML;y.innerHTML=k.check,setTimeout(()=>y.innerHTML=x,1800)})}),this.copyPromptBtn.addEventListener("click",()=>{let v=this.inspPrompt.textContent||"";navigator.clipboard.writeText(v).then(()=>{let x=this.copyPromptBtn.innerHTML;this.copyPromptBtn.innerHTML=`${k.check} Copiado!`,setTimeout(()=>this.copyPromptBtn.innerHTML=x,2e3)})}),this.modelSelect.addEventListener("change",()=>this.callbacks.onSettingsChange({model:this.modelSelect.value})),this.modeSelect.addEventListener("change",()=>this.callbacks.onSettingsChange({modeHint:this.modeSelect.value})),this.engineSelect.addEventListener("change",()=>this.callbacks.onSettingsChange({engine:this.engineSelect.value})),this.dryRunCheckbox.addEventListener("change",()=>this.callbacks.onSettingsChange({dryRun:this.dryRunCheckbox.checked})),this.autoApplyCheckbox.addEventListener("change",()=>this.callbacks.onSettingsChange({autoApply:this.autoApplyCheckbox.checked})),this.autoAdvanceCheckbox.addEventListener("change",()=>this.callbacks.onSettingsChange({autoAdvance:this.autoAdvanceCheckbox.checked})),this.useVisionCheckbox.addEventListener("change",()=>{let v=this.useVisionCheckbox.checked;this.callbacks.onSettingsChange({useVision:v}),this.setStatus(v?"Vis\xE3o Computacional ativada (capturas habilitadas).":"Modo DOM R\xE1pido ativado (capturas desabilitadas).","info")}),this.hostDarkModeCheckbox.addEventListener("change",()=>{let v=this.hostDarkModeCheckbox.checked;this.callbacks.onSettingsChange({hostDarkMode:v}),this.applyHostDarkMode(v)}),this.analyzeBtn.addEventListener("click",async()=>{if(this.isBusy){this.callbacks.onCancel?.(),this.setInterrupted("An\xE1lise cancelada pelo usu\xE1rio. Pronto para nova tentativa.");return}await this.callbacks.onAnalyze()&&!this.dryRunCheckbox.checked&&!this.autoApplyCheckbox.checked&&this.callbacks.onApply()}),this.applyBtn&&this.applyBtn.addEventListener("click",()=>this.callbacks.onApply())}startStopwatch(){this.stopStopwatch(),this.stopwatchStartTime=Date.now();let e=()=>{let t=((Date.now()-this.stopwatchStartTime)/1e3).toFixed(2)+"s";this.stopwatchAp.textContent=t,this.stopwatchAdv.textContent=t};e(),this.stopwatchInterval=setInterval(e,100)}stopStopwatch(e){if(this.stopwatchInterval&&(clearInterval(this.stopwatchInterval),this.stopwatchInterval=null),e!==void 0){let t=(e/1e3).toFixed(2)+"s";this.stopwatchAp.textContent=t,this.stopwatchAdv.textContent=t}}setLogFilter(e){this.activeLogFilter=e;let t=["all","error","ai","dom"];for(let a of t){let r=this.shadow.querySelector(`#eq-dbg-filter-${a}`);a===e?r?.classList.add("active"):r?.classList.remove("active")}this.renderTerminalEntries()}updateLogCounters(){let e=0,t=0,a=0;for(let r of this.logEntries)r.category==="error"?e++:r.category==="ai"?t++:r.category==="dom"&&a++;this.dbgCountAll&&(this.dbgCountAll.textContent=String(this.logEntries.length)),this.dbgCountError&&(this.dbgCountError.textContent=String(e)),this.dbgCountAi&&(this.dbgCountAi.textContent=String(t)),this.dbgCountDom&&(this.dbgCountDom.textContent=String(a))}renderTerminalEntries(){if(!this.liveDebugTerminal)return;this.liveDebugTerminal.replaceChildren();let e=this.activeLogFilter==="all"?this.logEntries:this.logEntries.filter(t=>t.category===this.activeLogFilter);if(e.length===0){let t=document.createElement("div");t.className="text-muted",t.textContent=`Nenhum log encontrado para o filtro "${this.activeLogFilter.toUpperCase()}".`,this.liveDebugTerminal.appendChild(t);return}for(let t of e){let a=document.createElement("div");a.textContent=t.message,t.colorClass&&(a.className=t.colorClass),this.liveDebugTerminal.appendChild(a)}this.autoScrollLogs&&(this.liveDebugTerminal.scrollTop=this.liveDebugTerminal.scrollHeight)}clearLogs(){if(this.logEntries=[],this.updateLogCounters(),this.liveDebugTerminal){this.liveDebugTerminal.replaceChildren();let e=document.createElement("div");e.className="text-blue",e.textContent="> [SYS] Console de logs limpo pelo usu\xE1rio.",this.liveDebugTerminal.appendChild(e)}this.apConsole&&this.apConsole.replaceChildren(),this.executionConsole&&this.executionConsole.replaceChildren()}getFormattedLogs(){return(this.activeLogFilter==="all"?this.logEntries:this.logEntries.filter(t=>t.category===this.activeLogFilter)).map(t=>t.message).join(`
`)}setLastError(e){this.lastErrorMsg=e,this.dbgErrorCard&&this.dbgErrorText&&(this.dbgErrorText.textContent=e,this.dbgErrorCard.style.display="flex")}setErrorDiagnostic(e,t){let a=t?`[${t}] ${e}`:e;this.setLastError(a)}refreshDebugView(){let e=this.latestPlan,t=this.latestContext,a=this.latestPromptText||e?.promptSent||"";if(this.dbgModel&&(this.dbgModel.textContent=e?.usedModel||this.initialSettings.model||"--"),this.dbgLatency&&(this.dbgLatency.textContent=e?.durationMs?`${e.durationMs}ms`:"--"),this.dbgSplitTokens){let r=e?.promptTokens!==void 0?String(e.promptTokens):"--",n=e?.candidatesTokens!==void 0?String(e.candidatesTokens):"--";this.dbgSplitTokens.textContent=`${r} / ${n}`,this.dbgSplitTokens.title=`Prompt: ${r} tokens | Resposta: ${n} tokens`}if(this.dbgTotalTokens){let r=e?.tokensUsed??(e?.promptTokens&&e?.candidatesTokens?e.promptTokens+e.candidatesTokens:void 0);this.dbgTotalTokens.textContent=r!==void 0?`${r}`:"--"}if(this.dbgPromptLen){let r=a.length,n=Math.round(r/4);this.dbgPromptLen.textContent=`${r} chars (~${n} tokens est.)`}if(this.dbgPromptView&&(this.dbgPromptView.textContent=a||"Nenhum prompt enviado at\xE9 o momento."),this.dbgContextView)if(t){let r={scope:`${t.scope.tagName.toLowerCase()}${t.scope.id?"#"+t.scope.id:""}${t.scope.className?"."+t.scope.className.split(" ").join("."):""}`,questionLength:t.questionText.length,questionSnippet:t.questionText.slice(0,150)+(t.questionText.length>150?"...":""),controlsCount:t.controls.length,controls:t.controls.map((n,s)=>({index:s+1,tag:n.tag,type:n.type,name:n.name||void 0,id:n.id||void 0,value:n.value||void 0,label:n.label||void 0,role:n.role}))};this.dbgContextView.textContent=JSON.stringify(r,null,2)}else this.dbgContextView.textContent="Aguardando captura de contexto pelo EasyQuiz...";this.dbgRawRespView&&(e?e.rawResponse?this.dbgRawRespView.textContent=e.rawResponse:this.dbgRawRespView.textContent=JSON.stringify({pageType:e.pageType,mode:e.mode,confidence:e.confidence,rationale:e.rationale,actions:e.actions},null,2):this.dbgRawRespView.textContent="Aguardando retorno da API Gemini..."),this.lastErrorMsg&&this.dbgErrorCard&&this.dbgErrorText&&(this.dbgErrorText.textContent=this.lastErrorMsg,this.dbgErrorCard.style.display="flex")}logToConsole(e,t){let a=new Date,r=`${String(a.getHours()).padStart(2,"0")}:${String(a.getMinutes()).padStart(2,"0")}:${String(a.getSeconds()).padStart(2,"0")}.${String(Math.floor(a.getMilliseconds()/100))}`,n=e;e.startsWith(">")?n=`> [${r}] ${e.slice(1).trim()}`:n=`[${r}] ${e}`;let s="all";t==="text-red"||n.includes("[ERRO]")||n.includes("Falha")||n.includes("Error")?s="error":n.includes("[IA]")||n.includes("[RAG]")||n.includes("Tokens")||n.includes("Gemini")||n.includes("Modelo:")?s="ai":(n.includes("[DOM]")||n.includes("[EXEC]")||n.includes("[VERIF]")||n.includes("[NAV]"))&&(s="dom");let i={id:Date.now()+Math.random(),timestamp:r,message:n,colorClass:t,category:s};for(this.logEntries.push(i);this.logEntries.length>250;)this.logEntries.shift();if(this.updateLogCounters(),s==="error"&&this.setLastError(n),this.liveDebugTerminal&&(this.activeLogFilter==="all"||this.activeLogFilter===s)){let d=document.createElement("div");for(d.textContent=n,t&&(d.className=t),this.liveDebugTerminal.appendChild(d);this.liveDebugTerminal.children.length>250;)this.liveDebugTerminal.removeChild(this.liveDebugTerminal.firstChild);this.autoScrollLogs&&(this.liveDebugTerminal.scrollTop=this.liveDebugTerminal.scrollHeight)}if(this.apConsole){let d=document.createElement("div");for(d.textContent=n,t&&(d.className=t),this.apConsole.appendChild(d),this.apConsole.scrollTop=this.apConsole.scrollHeight;this.apConsole.children.length>150;)this.apConsole.removeChild(this.apConsole.firstChild)}if(this.executionConsole){let d=document.createElement("div");for(d.textContent=n,t&&(d.className=t),this.executionConsole.appendChild(d),this.executionConsole.scrollTop=this.executionConsole.scrollHeight;this.executionConsole.children.length>150;)this.executionConsole.removeChild(this.executionConsole.firstChild)}}setProgress(e,t){if(!this.progressContainer||!this.progressBar)return;if(e<=0){this.progressContainer.style.display="none",this.progressBar.style.width="0%";return}this.progressContainer.style.display="flex";let a=Math.min(100,Math.max(0,Math.round(e)));this.progressBar.style.width=`${a}%`,this.progressVal&&(this.progressVal.textContent=`${a}%`),t&&this.progressLabel&&(this.progressLabel.textContent=t),a>=100&&setTimeout(()=>{this.progressContainer&&this.progressBar&&this.progressBar.style.width==="100%"&&(this.progressContainer.style.display="none")},1500)}updateContext(e,t){this.latestContext=e,t&&(this.latestPlan=t,t.imageDescriptions&&(this.latestImageDescriptions=t.imageDescriptions,this.renderMediaTab())),this.activeTab==="brain"?(this.renderContextTree(),t&&this.refreshInspectorView()):this.activeTab==="debug"&&this.refreshDebugView()}updateImages(e){this.latestImages=e,this.activeTab==="brain"&&this.renderContextTree(),(this.activeTab==="media"||e.length>0)&&this.renderMediaTab()}renderMediaTab(){let e=this.shadow?.querySelector("#eq-media-grid"),t=this.shadow?.querySelector("#eq-media-count-badge");if(!e)return;let a=this.latestImages,r=this.latestImageDescriptions;if(t&&(t.textContent=`${a.length} m\xEDdias`),a.length===0){e.innerHTML=`
        <div class="text-muted" style="padding: 16px 0; text-align: center;">
          Nenhuma imagem capturada ainda.<br>
          <span style="font-size: 10px; opacity: 0.6;">Ative \u201CVis\xE3o Computacional\u201D nas configura\xE7\xF5es e execute uma an\xE1lise.</span>
        </div>`;return}e.innerHTML="",a.forEach((n,s)=>{let i=r.find(A=>A.index===s),d=(n.captureStatus==="captured"||n.captureStatus==="text_only",""),l=n.captureStatus==="captured"?"Visual":n.captureStatus==="text_only"?"Texto":"Falhou",u=i?.relevant??!0,h=i?.description??(n.textContext||"Aguardando an\xE1lise da IA..."),c=document.createElement("div");c.style.cssText=["background: rgba(255,255,255,0.04)","border: 1px solid rgba(255,255,255,0.08)","border-radius: 8px","overflow: hidden",`border-left: 3px solid ${u?"#fbbf24":"#666"}`].join(";");let m=n.base64?`data:${n.mediaType||"image/jpeg"};base64,${n.base64}`:"",p="";m?p=`
          <div style="position: relative; background: #111; border-bottom: 1px solid rgba(255,255,255,0.06);">
            <img src="${m}" 
              style="width: 100%; max-height: 180px; object-fit: contain; display: block; cursor: pointer;"
              alt="Captura ${s+1}"
              title="Clique para ampliar"
              onclick="(function(el){ var ov=document.createElement('div'); ov.style='position:fixed;inset:0;z-index:2147483647;background:rgba(0,0,0,0.92);display:flex;align-items:center;justify-content:center;cursor:zoom-out;'; var img=document.createElement('img'); img.src=el.src; img.style='max-width:95vw;max-height:95vh;border-radius:6px;'; ov.appendChild(img); ov.onclick=function(){ov.remove();}; document.body.appendChild(ov); })(this)"
            >
            <div style="position:absolute;top:6px;right:6px;background:rgba(0,0,0,0.7);border-radius:4px;padding:2px 6px;font-size:10px;font-weight:700;color:#fff;">
              ${d} ${l}
            </div>
          </div>`:p=`
          <div style="background:#1a1a1a; padding:12px; text-align:center; color:#666; font-size:11px; border-bottom: 1px solid rgba(255,255,255,0.06);">
            ${d} ${l} \u2014 sem dados de imagem
          </div>`;let f=u?'<span style="font-size:9px;font-weight:700;padding:1px 5px;border-radius:3px;background:rgba(251,191,36,0.14);border:1px solid rgba(251,191,36,0.4);color:#fbbf24;">RELEVANTE</span>':'<span style="font-size:9px;font-weight:700;padding:1px 5px;border-radius:3px;background:rgba(255,85,85,0.2);border:1px solid rgba(255,85,85,0.4);color:#ff5555;">IGNORADA</span>',g=`
        <div style="padding: 10px 12px; display: flex; flex-direction: column; gap: 6px;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size:11px;font-weight:700;color:#e0e0e0;">Imagem ${s+1}</span>
            ${f}
          </div>
          <div style="font-size:10px;color:#aaa;line-height:1.5;">${h}</div>
          ${n.textContext&&m?`<div style="font-size:9px;color:#666;margin-top:2px;">Contexto textual: ${n.textContext.slice(0,100)}${n.textContext.length>100?"...":""}</div>`:""}
        </div>`;c.innerHTML=p+g,e.appendChild(c)})}renderContextTree(){if(!this.contextTreeContainer)return;let e=this.latestContext,t=Oe(),a=this.latestPlan;this.contextTreeContainer.innerHTML="";let r=this.createTreeFolder(" P\xC1GINA & ESCOPO ATUAL",!0,[{label:"T\xEDtulo",value:document.title||"Sem t\xEDtulo"},{label:"URL",value:window.location.pathname||"/"},{label:"Escopo DOM",value:e?`${e.scope.tagName.toLowerCase()}${e.scope.className?"."+e.scope.className.split(" ").join("."):""}`:"Document"},{label:"Tamanho Texto",value:e?`${e.questionText.length} caracteres`:"N\xE3o analisado"},{label:"Trecho Enunciado",value:e?`"${e.questionText.slice(0,120)}..."`:"Nenhum"}]);this.contextTreeContainer.appendChild(r);let n=e?e.controls:[],s=n.map((p,f)=>{let g=p.role==="navigation"||p.type==="button",A=!g&&p.value?` [val: "${p.value}"]`:"";return{label:`[#${f+1}] ${p.type.toUpperCase()}`,value:`${p.label||p.id||p.name||"(Sem r\xF3tulo)"}${A}`.trim(),badge:g?"Navega\xE7\xE3o":p.role||p.type}}),i=this.createTreeFolder(`\uFE0F CONTROLES DETECTADOS (${n.length})`,n.length>0,s);this.contextTreeContainer.appendChild(i);let d=t.map((p,f)=>({label:`Mem\xF3ria #${f+1}`,value:p,badge:"RAG"})),l=this.createTreeFolder(` MEM\xD3RIA RAG ACUMULADA (${t.length})`,t.length>0,d);if(this.contextTreeContainer.appendChild(l),a){let p=this.createTreeFolder(` \xDALTIMO PLANO IA (${a.actions.length} a\xE7\xF5es)`,!0,[{label:"Tipo P\xE1gina",value:a.pageType,badge:`${(a.confidence*100).toFixed(0)}%`},{label:"Modo",value:a.mode},{label:"Racioc\xEDnio",value:a.rationale||"N/A"},...a.actions.map((f,g)=>({label:`A\xE7\xE3o #${g+1} (${f.t})`,value:JSON.stringify(f)}))]);this.contextTreeContainer.appendChild(p)}let u=this.latestImages,h=this.latestImageDescriptions,c=u.map((p,f)=>{let g=h.find(x=>x.index===f),A=(p.captureStatus==="captured"||p.captureStatus==="text_only",""),b=p.captureStatus==="captured"?"Visual":p.captureStatus==="text_only"?"Texto":"Falhou",y=g?g.relevant?" Relevante":"\uFE0F Ignorada":"\u2014",v=g?g.description:p.textContext?p.textContext:"Aguardando an\xE1lise IA...";return{label:`${A} Img ${f+1} [${b}]`,value:`${v}`,badge:y,imgSrc:p.base64?`data:${p.mediaType||"image/jpeg"};base64,${p.base64}`:void 0}}),m=this.createTreeFolder(`\uFE0F IMAGENS DETECTADAS (${u.length})`,!0,c);this.contextTreeContainer.appendChild(m)}createTreeFolder(e,t,a){let r=document.createElement("div");r.className="eq-tree-node";let n=document.createElement("div");n.className="eq-tree-header",n.innerHTML=`<span class="eq-tree-arrow">${t?"\u25BC":"\u25B6"}</span> <span>${e}</span>`;let s=document.createElement("div");if(s.className="eq-tree-content",s.style.display=t?"flex":"none",a.length===0)s.innerHTML='<div class="text-muted" style="padding: 2px 0;">Nenhum item registrado.</div>';else for(let i of a){let d=document.createElement("div");d.className="eq-tree-leaf";let l="";i.imgSrc&&i.imgSrc.startsWith("data:image")&&(l=`<div style="margin-top: 8px; margin-bottom: 4px;"><img src="${i.imgSrc}" style="max-width: 100%; max-height: 120px; border-radius: 4px; border: 1px solid #3c4043; background: #1e1f22;" alt="Captura"></div>`),d.innerHTML=`
          <div style="display: flex; align-items: flex-start; gap: 8px; width: 100%;">
            <strong style="color:#ffffff; min-width: 80px;">${i.label}:</strong>
            <div style="flex:1; display: flex; flex-direction: column;">
              <span style="word-break: break-word; color:#aaaaaa;">${i.value}</span>
              ${l}
            </div>
            ${i.badge?`<span class="eq-tree-badge" style="white-space: nowrap;">${i.badge}</span>`:""}
          </div>
        `,s.appendChild(d)}return n.addEventListener("click",()=>{let i=s.style.display==="none";s.style.display=i?"flex":"none";let d=n.querySelector(".eq-tree-arrow");d&&(d.textContent=i?"\u25BC":"\u25B6")}),r.appendChild(n),r.appendChild(s),r}toggle(e){e!==void 0?this.isCollapsed=!e:this.isCollapsed=!this.isCollapsed,this.isCollapsed?this.sidebarEl.classList.add("eq-collapsed"):(this.sidebarEl.classList.remove("eq-collapsed"),z.getAllKeys().length===0&&(this.switchTab("settings"),this.apiKeyInput.focus()))}updateAutopilotUi(e){e?(this.apToggleBtn.innerHTML=`${k.stop} PARAR AUTOPILOT`,this.apToggleBtn.classList.add("danger"),this.apToggleBtn.title="Interromper execu\xE7\xE3o cont\xEDnua do Autopilot"):(this.apToggleBtn.innerHTML=`${k.play} INICIAR AUTOPILOT`,this.apToggleBtn.classList.remove("danger"),this.apToggleBtn.title="Iniciar resolu\xE7\xE3o autom\xE1tica cont\xEDnua de quest\xF5es")}setOperationState(e,t){let a=this.shadow.querySelector("#eq-operation-state");a&&(a.textContent=e,a.className=`eq-operation-state is-${t}`)}setInterrupted(e="An\xE1lise interrompida pelo usu\xE1rio."){this.isBusy=!1,[this.modelSelect,this.modeSelect,this.engineSelect,this.dryRunCheckbox,this.autoApplyCheckbox,this.autoAdvanceCheckbox,this.useVisionCheckbox].forEach(t=>t.disabled=!1),this.analyzeBtn.disabled=!1,this.analyzeBtn.classList.remove("danger"),this.analyzeBtn.innerHTML=`${k.sparkles} Resolver com IA (Alt+R)`,this.analyzeBtn.title="Analisar e responder quest\xE3o ativa",this.applyBtn&&(this.applyBtn.disabled=!this.latestPlan||!this.latestPlan.actions.length),this.stopStopwatch(),this.stopQuestionTimer(),this.dotPulseAp.className="eq-dot-pulse stopped",this.dotPulseAdv.className="eq-dot-pulse stopped",this.launcherDot.className="eq-launcher-dot stopped",this.metricsLiveStatus&&(this.metricsLiveStatus.textContent="Interrompido",this.metricsLiveStatus.className="eq-live-stopwatch-status is-warning"),this.autopilot.isActive()||this.updateAutopilotUi(!1),this.setStatus(e,"warning")}setBusy(e,t){this.isBusy=e,[this.modelSelect,this.modeSelect,this.engineSelect,this.dryRunCheckbox,this.autoApplyCheckbox,this.autoAdvanceCheckbox,this.useVisionCheckbox].forEach(a=>a.disabled=e),e?(this.analyzeBtn.disabled=!1,this.analyzeBtn.classList.add("danger"),this.analyzeBtn.innerHTML=`${k.stop} Parar An\xE1lise`,this.analyzeBtn.title="Interromper e cancelar an\xE1lise em andamento",this.applyBtn&&(this.applyBtn.disabled=!0),this.startStopwatch(),this.startQuestionTimer(),this.dotPulseAp.className="eq-dot-pulse busy",this.dotPulseAdv.className="eq-dot-pulse busy",this.launcherDot.className="eq-launcher-dot busy",this.setOperationState("Analisando...","busy"),this.metricsLiveStatus&&(this.metricsLiveStatus.textContent="Calculando...",this.metricsLiveStatus.className="eq-live-stopwatch-status is-busy"),t&&this.setStatus(t,"info")):(this.analyzeBtn.disabled=!1,this.analyzeBtn.classList.remove("danger"),this.analyzeBtn.innerHTML=`${k.sparkles} Resolver com IA (Alt+R)`,this.analyzeBtn.title="Analisar e responder quest\xE3o ativa",this.applyBtn&&(this.applyBtn.disabled=!this.latestPlan||!this.latestPlan.actions.length),this.stopStopwatch(),this.stopQuestionTimer(),this.dotPulseAp.className="eq-dot-pulse",this.dotPulseAdv.className="eq-dot-pulse",this.launcherDot.className="eq-launcher-dot",this.setOperationState(this.autopilot.isActive()?"Monitorando":"Pronto","idle"),this.metricsLiveStatus&&this.metricsLiveStatus.textContent==="Calculando..."&&(this.metricsLiveStatus.textContent="Em espera",this.metricsLiveStatus.className="eq-live-stopwatch-status"))}setStatus(e,t="info"){this.statusTextAp.textContent=e,this.statusTextAdv.textContent=e,t==="error"?(this.setOperationState("Bloqueado","error"),this.dotPulseAp.className="eq-dot-pulse error",this.dotPulseAdv.className="eq-dot-pulse error",this.launcherDot.className="eq-launcher-dot error"):t==="warning"?(this.setOperationState("Interrompido","warning"),this.dotPulseAp.className="eq-dot-pulse stopped",this.dotPulseAdv.className="eq-dot-pulse stopped",this.launcherDot.className="eq-launcher-dot stopped"):t==="success"?(this.setOperationState("Confirmado","success"),this.dotPulseAp.className="eq-dot-pulse",this.dotPulseAdv.className="eq-dot-pulse",this.launcherDot.className="eq-launcher-dot"):this.isBusy?(this.setOperationState("Analisando...","busy"),this.dotPulseAp.className="eq-dot-pulse busy",this.dotPulseAdv.className="eq-dot-pulse busy",this.launcherDot.className="eq-launcher-dot busy"):(this.setOperationState(this.autopilot.isActive()?"Monitorando":"Pronto","info"),this.dotPulseAp.className="eq-dot-pulse",this.dotPulseAdv.className="eq-dot-pulse",this.launcherDot.className="eq-launcher-dot");let a=e.includes("Alternando")||e.includes("indispon\xEDvel")||e.includes("fallback")||e.includes("alternativo"),r=t==="error"?"> [ERRO] ":t==="success"?"> [SUCESSO] ":t==="warning"?"> [PARADO] ":a?"> [FALLBACK] ":"> [SYS] ",n=t==="error"?"text-red":t==="success"?"text-green":t==="warning"||a?"text-yellow":"text-blue";this.logToConsole(`${r}${e}`,n)}setPlan(e,t){if(this.latestPlan=e,this.resultContainer.style.display="flex",e.durationMs&&this.stopStopwatch(e.durationMs),e.usedModel){let d=this.shadow.querySelector("#eq-active-model-badge");if(d){let l=e.usedModel.replace("gemini-","").replace("-latest","");d.textContent=`\u25CF ${l}`,d.style.display="inline-block"}}let a=this.shadow.querySelector("#eq-badges");a.replaceChildren();let r=[e.mode.replace("_"," "),`${Math.round(e.confidence*100)}% Confian\xE7a`,`${e.actions.length} a\xE7\xF5es`,...e.usedModel?[e.usedModel]:[]];for(let d of r){let l=document.createElement("span");l.className="eq-brand-badge",l.textContent=d,a.appendChild(l)}let n=this.shadow.querySelector("#eq-rationale-text");n.textContent=e.rationale;let s=this.shadow.querySelector("#eq-actions-list");s.innerHTML="";for(let d of e.actions){let l=document.createElement("div");l.className="eq-action-item";let u="";d.t==="chk"?u=`chk ${d.id} (${d.c})`:d.t==="val"?u=`val "${d.v}" -> ${d.id}`:d.t==="sel"?u=`sel "${Array.isArray(d.v)?d.v.join(","):d.v}" -> ${d.id}`:d.t==="clk"?u=`clk ${d.id}`:d.t==="adv"?u="adv":d.t==="js"?u=`js: ${String(d.v).slice(0,40)}...`:d.t==="drag"&&(u=`drag "${d.from}" -> "${d.to}"`);let h=document.createElement("span");h.className="eq-action-badge",h.textContent=d.t.toUpperCase();let c=document.createElement("span");c.textContent=u,l.append(h,c),s.appendChild(l)}this.applyBtn&&(this.applyBtn.disabled=!t||!e.actions.length);let i=this.shadow.querySelector("#eq-execution-card");i&&(i.hidden=!0),e.imageDescriptions&&e.imageDescriptions.length>0&&(this.latestImageDescriptions=e.imageDescriptions,this.renderMediaTab()),this.refreshInspectorView(),this.refreshDebugView()}setExecutionReport(e){let t=this.shadow.querySelector("#eq-execution-card"),a=this.shadow.querySelector("#eq-execution-summary"),r=this.shadow.querySelector("#eq-execution-list");if(!t||!a||!r)return;t.hidden=!1,a.textContent=e.navigationVerified?`${e.verified}/${e.applied} a\xE7\xF5es verificadas. Navega\xE7\xE3o confirmada.`:`${e.verified}/${e.applied} a\xE7\xF5es verificadas. ${e.navigationEvidence}`,a.className=`eq-execution-summary ${e.success?"is-success":"is-warning"}`,r.replaceChildren();let n=this.shadow.querySelector("#eq-execution-placeholder");n&&(n.textContent=e.navigationVerified?"Fluxo conclu\xEDdo: aplica\xE7\xE3o e navega\xE7\xE3o confirmadas.":`Fluxo interrompido: ${e.navigationEvidence}`,n.className=`eq-execution-placeholder ${e.success?"is-success":"is-warning"}`);for(let s of e.reports){let i=document.createElement("div");i.className=`eq-execution-row ${s.verified?"is-success":"is-failed"}`;let d=document.createElement("span");d.className="eq-execution-state",d.textContent=s.verified?"OK":"FALHOU";let l=document.createElement("div");l.className="eq-execution-details";let u=document.createElement("strong");u.textContent=s.target;let h=document.createElement("span");if(h.textContent=`${s.strategy} | ${s.evidence}`,l.append(u,h),i.append(d,l),s.error){let c=document.createElement("small");c.textContent=s.error,i.appendChild(c)}r.appendChild(i)}}setInspectorPrompt(e,t){this.latestPromptText=e,this.inspPrompt&&(this.inspPrompt.textContent=e),t&&this.inspModel&&(this.inspModel.textContent=t),this.inspLatency&&(this.inspLatency.textContent="Aguardando IA..."),this.activeTab==="debug"&&this.refreshDebugView()}refreshInspectorView(){let e=this.latestPlan;if(e)if(this.inspModel.textContent=e.usedModel||this.initialSettings.model,this.inspLatency.textContent=e.durationMs?`${e.durationMs}ms`:"--",this.inspTokens.textContent=e.tokensUsed?`${e.tokensUsed}`:"--",this.inspPrompt.textContent=e.promptSent||this.latestPromptText||"Prompt n\xE3o registrado para esta requisi\xE7\xE3o.",this.inspRationale.textContent=e.rationale,this.inspActions.innerHTML="",e.actions.length>0)for(let t of e.actions){let a=document.createElement("div");a.className="eq-action-item",a.textContent=JSON.stringify(t),this.inspActions.appendChild(a)}else this.inspActions.innerHTML='<div class="text-muted" style="padding: 4px;">Nenhuma a\xE7\xE3o prescrita pela IA.</div>';else this.latestPromptText&&(this.inspPrompt.textContent=this.latestPromptText)}showFloatingAnswers(e){let t=e||this.latestPlan;t&&this.floatingAnswers.show(t)}hideFloatingAnswers(){this.floatingAnswers.hide()}renderKeysList(){if(!this.keysListEl)return;let e=z.getAllKeys();if(this.keysBadgeEl){let r=e.filter(i=>!i.isCooldown).length,n=e.reduce((i,d)=>i+(d.winCount||0),0),s=r>=3?"  TURBO":"";this.keysBadgeEl.textContent=`${e.length} chave${e.length>1?"s":""} (${r} pronta${r!==1?"s":""})${s}`,this.keysBadgeEl.className=`eq-key-badge ${r>=3?"racing":r>0?"ready":"cooldown"}`}this.keysListEl.replaceChildren();let t=this.shadow?.querySelector("#eq-keys-collapsible");t&&t.style.display!=="none"&&(t.style.maxHeight="none",t.style.overflow="visible"),[...e].sort((r,n)=>{let s=r.winCount||0,i=n.winCount||0;if(s!==i)return i-s;let d=r.lastLatencyMs||99999,l=n.lastLatencyMs||99999;if(d!==l)return d-l;let u=r.isCooldown?1:0,h=n.isCooldown?1:0;return u-h}).forEach((r,n)=>{let s=e.findIndex(b=>b.id===r.id),i=s>=0?s:n,d=document.createElement("div");d.className="eq-key-item";let l=document.createElement("div");l.className="eq-key-info";let u=document.createElement("span");u.className="eq-key-label",u.textContent=r.label||`Chave ${i+1}`;let h=document.createElement("span");h.className="eq-key-masked",h.textContent=_.maskKey(r.key),h.title="Clique para copiar a chave",h.style.cursor="pointer",h.addEventListener("click",()=>{navigator.clipboard?.writeText(r.key),this.setStatus(`Chave ${i+1} copiada para a \xE1rea de transfer\xEAncia!`,"info")});let c=document.createElement("span");if(r.isCooldown){c.className="eq-key-badge cooldown";let b=Math.ceil(r.remainingCooldownMs/1e3);c.textContent=`\u23F1 Cooldown (${b}s)`}else r.lastError&&r.errorCount&&r.errorCount>3?(c.className="eq-key-badge invalid",c.textContent="Erro",c.title=r.lastError):r.lastLatencyMs?(c.className="eq-key-badge ready",c.textContent=`Pronta (${r.lastLatencyMs}ms)`):(c.className="eq-key-badge ready",c.textContent="Pronta");l.appendChild(u),l.appendChild(h),l.appendChild(c);let m=r.winCount||0;if(m>0){let b=document.createElement("span");b.className="eq-key-badge winner",b.textContent=` ${m} vit\xF3ria${m>1?"s":""}`,b.title=`Esta chave foi a mais r\xE1pida ${m} vez${m>1?"es":""} nas corridas paralelas`,l.appendChild(b)}let p=document.createElement("div");p.className="eq-key-actions";let f=document.createElement("button");f.className="eq-icon-btn",f.type="button",f.title="Testar esta chave",f.innerHTML=k.sparkles,f.addEventListener("click",async()=>{this.setStatus(`Testando chave ${r.label||i+1}...`,"info");let b=await Re(r.key);b.ok?(z.markSuccess(r.key,120),this.setStatus(` ${r.label||`Chave ${i+1}`}: Conex\xE3o com Google Gemini aprovada!`,"success")):(z.markInvalid(r.key,b.message),this.setStatus(`\uFE0F ${r.label||`Chave ${i+1}`}: ${b.message}`,"error")),this.renderKeysList()});let g=document.createElement("button");g.className="eq-icon-btn",g.type="button",g.title="Editar chave",g.innerHTML=k.edit,g.addEventListener("click",()=>{let b=window.prompt(`Editar ${r.label||`Chave ${i+1}`}:`,r.key);if(b!==null&&b.trim()){let y=z.updateKey(r.id,b.trim());if(y.ok){let v=z.exportRawKeys();this.callbacks.onSettingsChange({apiKey:v[0],apiKeys:v}),this.setStatus(`Chave ${i+1} atualizada com sucesso!`,"success"),this.renderKeysList()}else this.setStatus(y.message,"warning")}});let A=document.createElement("button");A.className="eq-icon-btn",A.type="button",A.title="Remover chave",A.innerHTML=k.trash,A.addEventListener("click",()=>{if(confirm(`Remover permanentemente a ${r.label||`Chave ${i+1}`}?`)){let b=z.removeKey(r.id);if(b.ok){let y=z.exportRawKeys();this.callbacks.onSettingsChange({apiKey:y[0]||"",apiKeys:y}),this.setStatus("Chave removida com sucesso.","info"),this.renderKeysList()}else this.setStatus(b.message,"warning")}}),p.appendChild(f),p.appendChild(g),p.appendChild(A),d.appendChild(l),d.appendChild(p),this.keysListEl.appendChild(d)})}updateModelSelect(e,t){let a=e.filter(s=>W(s.id)),r=t&&W(t)?t:W(this.initialSettings.model)?this.initialSettings.model:"gemini-2.5-flash";this.modelSelect.innerHTML="";let n=!1;a.forEach(s=>{let i=s.id===r;i&&(n=!0),this.modelSelect.add(new Option(s.name,s.id,!1,i))}),!n&&r&&W(r)&&this.modelSelect.add(new Option(`Gemini (${r})`,r,!1,!0)),this.modelSelect.value=r}updateSelectedModel(e){if(!W(e))return;Array.from(this.modelSelect.options).some(a=>a.value===e)||this.modelSelect.add(new Option(`Gemini (${e})`,e,!1,!0)),this.modelSelect.value=e}mountHost(){let e=document.body||document.documentElement;if(!e){let t=()=>{let a=document.body||document.documentElement;a&&!this.host.isConnected&&a.appendChild(this.host)};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",t,{once:!0}):setTimeout(t,0);return}this.host.isConnected||e.appendChild(this.host)}applyHostDarkMode(e){document.getElementById("eq-host-dark-mode-style")?.remove(),this.host.classList.toggle("eq-dark-mode-active",e)}startQuestionTimer(){this.currentQuestionStartTime=Date.now(),this.questionLiveTimerInterval&&clearInterval(this.questionLiveTimerInterval),this.metricsLiveStatus&&(this.metricsLiveStatus.textContent="Calculando...",this.metricsLiveStatus.classList.add("active"));let e=()=>{if(!this.metricsLiveTime)return;let t=Date.now()-this.currentQuestionStartTime,a=Math.floor(t/6e4),r=Math.floor(t%6e4/1e3),n=Math.floor(t%1e3/10);this.metricsLiveTime.textContent=`${String(a).padStart(2,"0")}:${String(r).padStart(2,"0")}.${String(n).padStart(2,"0")}`};e(),this.questionLiveTimerInterval=setInterval(e,50)}stopQuestionTimer(e){if(this.questionLiveTimerInterval&&(clearInterval(this.questionLiveTimerInterval),this.questionLiveTimerInterval=null),this.metricsLiveStatus&&(this.metricsLiveStatus.textContent="Parado",this.metricsLiveStatus.classList.remove("active")),this.metricsLiveTime&&this.currentQuestionStartTime>0){let t=e!==void 0?e:Math.max(0,Date.now()-this.currentQuestionStartTime),a=Math.floor(t/6e4),r=Math.floor(t%6e4/1e3),n=Math.floor(t%1e3/10);this.metricsLiveTime.textContent=`${String(a).padStart(2,"0")}:${String(r).padStart(2,"0")}.${String(n).padStart(2,"0")}`}}updateTimingMetrics(e){let t=e||Ce();if(!this.metricTotalTime)return;let a=Math.floor(t.totalElapsedMs/1e3),r=Math.floor(a/60),n=a%60;this.metricTotalTime.textContent=`${String(r).padStart(2,"0")}:${String(n).padStart(2,"0")}`;let s=(t.averageDurationMs/1e3).toFixed(1);this.metricAvgTime.textContent=`${s}s`,this.metricTotalCount.textContent=String(t.completedQuestionsCount),this.metricsTotalBadge&&(this.metricsTotalBadge.textContent=`${t.completedQuestionsCount} Quest\xE3o(\xF5es)`),this.metricsHistoryCount&&(this.metricsHistoryCount.textContent=`${t.records.length} registros`),this.renderMetricsHistory(t.records)}renderMetricsHistory(e){if(!this.metricsHistoryList)return;if(e.length===0){this.metricsHistoryList.innerHTML='<div class="eq-metrics-empty">Nenhuma quest\xE3o respondida nesta sess\xE3o ainda.</div>';return}this.metricsHistoryList.innerHTML="";let t=[...e].reverse();for(let a of t){let r=document.createElement("div");r.className="eq-metrics-item";let n=document.createElement("div");n.className="eq-metrics-item-left";let s=document.createElement("span");s.className="eq-metrics-badge",s.textContent=`Q${a.questionIndex}`;let i=document.createElement("div");i.className="eq-metrics-item-info";let d=document.createElement("div");d.className="eq-metrics-item-title",d.textContent=a.questionTitle||`Quest\xE3o ${a.questionIndex}`;let l=document.createElement("div");l.className="eq-metrics-item-meta";let u=new Date(a.timestamp).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit",second:"2-digit"}),h=a.mode?a.mode.replace("_"," "):"auto";l.textContent=`${u} \u2022 Modo: ${h}${a.actionsCount?` \u2022 ${a.actionsCount} a\xE7\xE3o(\xF5es)`:""}`,i.appendChild(d),i.appendChild(l),n.appendChild(s),n.appendChild(i);let c=document.createElement("div");c.className="eq-metrics-item-right";let m=document.createElement("span");m.className="eq-metrics-item-dur",m.textContent=`${(a.durationMs/1e3).toFixed(2)}s`;let p=document.createElement("span");p.className=`eq-metrics-item-status is-${a.status}`,p.textContent=a.status==="verified"||a.status==="answered"?" Injetado":a.status==="manual"?"Gabarito":"Pendente",c.appendChild(m),c.appendChild(p),r.appendChild(n),r.appendChild(c),this.metricsHistoryList.appendChild(r)}}copyMetricsReport(){let e=Ce(),t=[];t.push("# Relat\xF3rio de Desempenho e Tempo \u2014 EasyQuiz"),t.push(`- **Quest\xF5es Respondidas:** ${e.completedQuestionsCount}`),t.push(`- **Tempo Total:** ${(e.totalElapsedMs/1e3).toFixed(1)}s`),t.push(`- **Tempo M\xE9dio por Quest\xE3o:** ${(e.averageDurationMs/1e3).toFixed(2)}s`),t.push(""),t.push("### Hist\xF3rico:"),e.records.length===0?t.push("_Nenhum registro ainda._"):e.records.forEach((a,r)=>{t.push(`${r+1}. **${a.questionTitle||`Q${a.questionIndex}`}**: ${(a.durationMs/1e3).toFixed(2)}s (${a.status})`)}),navigator.clipboard.writeText(t.join(`
`)).then(()=>{if(this.metricsCopyBtn){let a=this.metricsCopyBtn.innerHTML;this.metricsCopyBtn.innerHTML=" Copiado!",setTimeout(()=>{this.metricsCopyBtn.innerHTML=a},1500)}})}destroy(){this.stopStopwatch(),this.stopQuestionTimer(),this.autopilot.stop(),this.applyHostDarkMode(!1),this.callbacks.onDestroy(),this.host.remove()}};function Oo(){try{if(typeof document>"u"||!document.head||document.querySelector("link[data-easyquiz-preconnect]"))return;let o=document.createElement("link");o.rel="preconnect",o.href="https://generativelanguage.googleapis.com",o.crossOrigin="anonymous",o.setAttribute("data-easyquiz-preconnect","true"),document.head.appendChild(o);let e=document.createElement("link");e.rel="dns-prefetch",e.href="https://generativelanguage.googleapis.com",e.setAttribute("data-easyquiz-preconnect","true"),document.head.appendChild(e)}catch{}}async function Do(){let o=window;if(qe(),Oo(),o.__easyquiz){try{o.__easyquiz.destroy()}catch{}try{document.getElementById("easyquiz-shadow-root")?.remove()}catch{}}let e=Ze(),t=null,a=null,r=0,n=new We(e,{onAnalyze:(l=1,u,h=!1)=>s(l,u,h),onApply:(l=1)=>void i(l),onDestroy:()=>{if(a){try{a.abort()}catch{}a=null}fe(),delete o.__easyquiz},onCancel:()=>{if(a){try{a.abort()}catch{}a=null}fe(),n.setProgress(0),n.setInterrupted("Opera\xE7\xE3o cancelada imediatamente pelo usu\xE1rio.")},onSettingsChange:l=>{e=Ct(l)}});o.__easyquiz={toggle:()=>n.toggle(),destroy:()=>n.destroy(),analyze:async()=>{await s()}},window.addEventListener("keydown",l=>{if(l.altKey&&(l.key==="q"||l.key==="Q"||l.key==="a"||l.key==="A")){if(l.preventDefault(),!n)return;n.toggle(!0),s()}});async function s(l=1,u,h=!1){if(!e.apiKey&&(!Array.isArray(e.apiKeys)||e.apiKeys.length===0)){n.setStatus("Configure sua chave de API Gemini acima para come\xE7ar.","error"),n.toggle(!0);return}if(a)try{a.abort()}catch{}a=new AbortController;let c=a,m=()=>{try{c.abort()}catch{}};if(u&&(u.aborted?c.abort():u.addEventListener("abort",m,{once:!0})),c.signal.aborted){n.setBusy(!1),n.setProgress(0);return}r=Date.now(),n.setBusy(!0,"Identificando o bloco da quest\xE3o ativa na p\xE1gina..."),n.setProgress(20,"Varrendo escopo do DOM e controles..."),fe(),n.hideFloatingAnswers();try{let p=ue(!1);p||(n.setStatus("Nenhum controle detectado. Tentando captura de tela inteira...","info"),p=le()),He(p.scope),n.updateContext(p),n.logToConsole(`> [DOM] Escopo: <${p.scope.tagName.toLowerCase()}> com ${p.controls.length} controle(s) e ${p.questionText.length} caracteres.`,"text-blue"),n.setStatus(`Quest\xE3o localizada (${p.controls.length} controles). Preparando an\xE1lise...`,"info"),n.setProgress(40,`Consultando Gemini (${e.model})...`);let f=await yt(p.scope,e.useVision);if(f.length>0){let x=f.map(q=>q.element).filter(Boolean);At(x),n.updateImages(f)}if(c.signal.aborted)return;let g=e.model;n.setStatus(f.length>0?`Consultando Gemini (${g}) com ${f.length} imagem(ns) anexada(s)...`:`Consultando Gemini (${g}) via DOM nativo (modo r\xE1pido)...`,"info");let A=Te(p,f,e);n.setInspectorPrompt(A,e.model);let b=(x,q)=>{n.setStatus(x,q==="warning"?"info":q);let T=x.match(/Onda\s+\d+.*?\[([^\]]+)\]/);if(T){let M=T[1].split(",")[0].trim();n.setProgress(50,`Gemini ${M} respondendo...`)}},{plan:y,usedModel:v}=await Be(p,f,e,b,c.signal);if(c.signal.aborted)return;if(y.needsMoreContext){if(n.setProgress(55,"Ampliando escopo da quest\xE3o..."),n.setStatus("Enunciado ou contexto isolado detectado pela IA. Acionando Sele\xE7\xE3o Geral Expandida...","info"),n.logToConsole("> [DOM] Enunciado isolado. Ampliando escopo para sele\xE7\xE3o expandida...","text-blue"),p=ue(!0),p||(p=le()),He(p.scope),n.updateContext(p),f=await yt(p.scope,e.useVision),f.length>0){let T=f.map(M=>M.element).filter(Boolean);At(T),n.updateImages(f)}n.setStatus(`Reconsultando IA com escopo ampliado (${p.controls.length} controles)...`,"info");let x=Te(p,f,e);n.setInspectorPrompt(x,e.model),y=(await Be(p,f,e,b,c.signal)).plan}if(c.signal.aborted)return;if(n.setProgress(70,"Resposta recebida da IA! Processando plano..."),n.logToConsole(`> [IA] Modelo: ${v||e.model} | Modo: ${y.mode} | Confian\xE7a: ${(y.confidence*100).toFixed(0)}%`,"text-green"),y.rationale&&n.logToConsole(`> [IA] Racioc\xEDnio: "${y.rationale}"`,"text-blue"),n.logToConsole(`> [IA] ${y.actions.length} a\xE7\xE3o(\xF5es) prescritas no plano.`,"text-blue"),y.memoryToStore&&(qt(y.memoryToStore),n.logToConsole(`> [RAG]  Nova mem\xF3ria te\xF3rica salva na sess\xE3o: "${y.memoryToStore}"`,"text-yellow")),y.imageDescriptions&&y.imageDescriptions.length>0){n.logToConsole(`> [VISION] \uFE0F An\xE1lise de ${y.imageDescriptions.length} imagem(ns) pela IA:`,"text-blue");for(let x of y.imageDescriptions){let q=x.relevant?"":"\uFE0F";n.logToConsole(`>   ${q} Imagem ${x.index+1} [${x.relevant?"RELEVANTE":"IGNORADA"}]: ${x.description}`,x.relevant?"text-blue":"text-yellow")}}return t=y,n.updateContext(p,y),Jt(y.actions,y.confidence),n.setPlan(y,!e.dryRun),y.pageType==="conclusion"?(n.setProgress(100,"Atividade conclu\xEDda!"),n.setStatus("Atividade conclu\xEDda ou tela final detectada pela IA.","success")):y.pageType==="info"?(n.setProgress(100,"Contexto absorvido na mem\xF3ria!"),n.setStatus(" Conte\xFAdo de contexto absorvido na mem\xF3ria RAG. Avan\xE7ando...","success")):y.pageType==="start"?(n.setProgress(100,"In\xEDcio detectado!"),n.setStatus("In\xEDcio de atividade detectado. Iniciando...","info")):(n.setProgress(80,"Plano de resolu\xE7\xE3o pronto!"),n.setStatus(e.dryRun?"Simula\xE7\xE3o conclu\xEDda. As respostas foram real\xE7adas na p\xE1gina sem altera\xE7\xE3o.":"Resolu\xE7\xE3o pronta! Verifique o realce na tela e aplique quando desejar.","success")),e.dryRun&&y.pageType==="question"&&n.showFloatingAnswers(y),c.signal.aborted?void 0:((h||e.autoApply)&&!e.dryRun&&await i(l,c.signal,h),y)}catch(p){if(c.signal.aborted||p instanceof Error&&(p.name==="AbortError"||p.message.includes("cancelada"))){fe(),n.setProgress(0),n.setInterrupted("Opera\xE7\xE3o cancelada pelo usu\xE1rio.");return}fe(),n.setProgress(0);let f=p instanceof Error?p.message:"Falha desconhecida na an\xE1lise.";n.setStatus(f,"error"),n.setErrorDiagnostic(f,"An\xE1lise da IA");return}finally{u?.removeEventListener("abort",m),a===c&&(a=null),c.signal.aborted||n.setBusy(!1)}}async function i(l=1,u,h=!1){if(u?.aborted)return;if(!t){n.setStatus("Nenhum plano dispon\xEDvel para aplicar. Execute a an\xE1lise primeiro.","error");return}if(e.dryRun){n.setStatus("O modo de simula\xE7\xE3o est\xE1 ativo. Desmarque para poder aplicar.","error");return}let c=t.pageType==="info"||t.pageType==="start",m=t.actions.filter(g=>g.t!=="adv"),p=t.pageType==="question"||Ve(t.rationale||"");if(p&&m.length===0){n.logToConsole("> [NAV]  Avan\xE7o bloqueado: quest\xE3o sem respostas prescritas.","text-yellow");return}let f=(h||e.autoAdvance||c)&&t.confidence>=e.confidenceThreshold&&!t.needsMoreContext&&(!p||m.length>0);n.setBusy(!0,"Aplicando respostas no formul\xE1rio..."),n.setProgress(85,`Aplicando ${t.actions.length} a\xE7\xE3o(\xF5es) no formul\xE1rio...`),n.logToConsole(`> [EXEC] Iniciando aplica\xE7\xE3o com 6 vias de persist\xEAncia para ${t.actions.length} a\xE7\xE3o(\xF5es)...`,"text-blue");try{let g=await Ie(t,f,l,be(e));if(u?.aborted)return;if(n.setExecutionReport(g),g.failedActions&&g.failedActions.length>0){n.logToConsole(`> [REPLAN] \uFE0F ${g.failedActions.length} a\xE7\xE3o(\xF5es) n\xE3o verificadas no DOM. Iniciando replanejamento...`,"text-yellow");for(let x of g.failedActions){let q=x.action,T=q.t==="drag"?`drag: "${q.from}" \u2192 "${q.to}"`:q.t==="clk"||q.t==="chk"?`${q.t}: "${q.id}"`:q.t==="val"?`val: "${q.id}" = "${q.v}"`:JSON.stringify(q).slice(0,80);n.logToConsole(`>    [${q.t.toUpperCase()}] ${T} | ${x.evidence.slice(0,80)}`,"text-yellow")}await d(g.failedActions,u)}let A=r>0?Date.now()-r:1200,b=g.verified>0,y=g.applied>0;if(g.success||b&&y){n.setProgress(100,"Sucesso! Resposta preenchida."),n.logToConsole(`> [DOM]  ${g.applied} a\xE7\xE3o(\xF5es) aplicada(s) \u2014 ${g.verified} verificada(s) no DOM.`,"text-green"),g.advanced?n.logToConsole("> [NAV]  Bot\xE3o de confirma\xE7\xE3o/avan\xE7o acionado com sucesso!","text-green"):f&&n.logToConsole(`> [NAV] ${g.navigationEvidence}`,"text-blue"),n.setStatus(g.advanced?`Sucesso: ${g.applied} resposta(s) preenchida(s) e avan\xE7ando.`:`Resposta aplicada na p\xE1gina (${g.applied} a\xE7\xE3o(\xF5es)).`,"success"),n.hideFloatingAnswers();let x=St({id:`q-${Date.now()}`,questionIndex:(Ce().records.length||0)+1,questionTitle:t.rationale?t.rationale.slice(0,45)+"...":`Quest\xE3o ${t.mode||"Auto"}`,durationMs:A,status:"answered",mode:t.mode,actionsCount:g.applied});n.updateTimingMetrics(x)}else y?(n.setProgress(75,"Resposta aplicada (verifica\xE7\xE3o incerta)."),n.logToConsole(`> [DOM] \uFE0F ${g.applied} a\xE7\xE3o(\xF5es) disparadas mas sem confirma\xE7\xE3o DOM clara. Pendentes: ${g.failed.join(", ")||"nenhuma"}`,"text-yellow"),n.setStatus(`Resposta preenchida (${g.applied} a\xE7\xE3o(\xF5es) aplicadas, verifica\xE7\xE3o incerta).`,"warning")):(n.setProgress(0,"Alvo de resposta n\xE3o localizado."),n.logToConsole(`> [DOM] Alerta: nenhum controle de resposta foi modificado no DOM. Pend\xEAncias: ${g.failed.join(", ")||"nenhuma a\xE7\xE3o"}.`,"text-yellow"),n.setStatus("Controle de resposta n\xE3o encontrado na p\xE1gina. Use o bot\xE3o Gabarito no painel se desejar.","warning"),e.dryRun&&n.showFloatingAnswers(t))}catch(g){n.setProgress(0);let A=g instanceof Error?g.message:"Falha ao aplicar plano.";n.setStatus(`Erro ao aplicar: ${A}`,"error"),n.logToConsole(`> [ERRO] ${A}`,"text-red")}finally{n.setBusy(!1)}}async function d(l,u){if(!t)return;let h=l.filter(m=>m.action.t==="drag");for(let m of h){if(u?.aborted)return;let p=m.action,f=String(p.from||""),g=String(p.to||""),A=Ut(f,g,f,g);n.logToConsole(`> [REPLAN]  Drag JS fallback: "${f}" \u2192 "${g}"`,"text-blue");let b={...t,actions:[{t:"js",v:A}],pageType:"question"},y=await Ie(b,!1,1,be(e));n.logToConsole(y.applied>0?"> [REPLAN]  Drag fallback aplicado!":"> [REPLAN]  Drag fallback sem efeito.",y.applied>0?"text-green":"text-yellow")}let c=l.filter(m=>m.action.t!=="drag");if(c.length!==0&&!u?.aborted){n.logToConsole(`> [REPLAN]  ${c.length} a\xE7\xE3o(\xF5es) pendente(s) \u2014 iniciando pipeline de recupera\xE7\xE3o multi-estrat\xE9gia...`,"text-blue");for(let m of c){if(u?.aborted)return;let p=m.action,f=p.t==="clk"||p.t==="chk"?`${p.t}: "${p.id}"`:p.t==="val"?`val: "${p.id}" = "${p.v}"`:p.t==="sel"?`sel: "${p.id}" = "${Array.isArray(p.v)?p.v[0]:p.v}"`:JSON.stringify(p).slice(0,60);n.logToConsole(`> [REPLAN]  Recuperando: ${f}`,"text-blue");let g=String(p.id||p.name||p.selector||""),A=p.v!==void 0?String(p.v):"";n.logToConsole("> [REPLAN] Estrat\xE9gia 1: rota alternativa padr\xE3o...","text-blue");try{if(await Ke(m.action),await new Promise(b=>setTimeout(b,250)),ee(m.action)){n.logToConsole(`> [REPLAN]  Estrat\xE9gia 1 OK: ${f}`,"text-green");continue}}catch{}if(p.t==="clk"||p.t==="chk"){n.logToConsole("> [REPLAN] Estrat\xE9gia 2: script injection (bypass isTrusted)...","text-blue");try{let b=P(g,A)||P(g.replace(/[^\w\s]/g," ").trim(),A);if(b&&(mt(b),await new Promise(y=>setTimeout(y,300)),ee(m.action))){n.logToConsole(`> [REPLAN]  Estrat\xE9gia 2 OK: ${f}`,"text-green");continue}}catch{}}if(p.t==="clk"||p.t==="chk"){n.logToConsole("> [REPLAN] Estrat\xE9gia 3: simula\xE7\xE3o de teclado (Tab+Space)...","text-blue");try{let b=P(g,A)||P(g.replace(/[^\w\s]/g," ").trim(),A);if(b&&(b.focus?.(),await new Promise(y=>setTimeout(y,50)),b.dispatchEvent(new KeyboardEvent("keydown",{key:" ",code:"Space",keyCode:32,bubbles:!0,cancelable:!0})),b.dispatchEvent(new KeyboardEvent("keyup",{key:" ",code:"Space",keyCode:32,bubbles:!0,cancelable:!0})),await new Promise(y=>setTimeout(y,80)),b.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0,cancelable:!0})),b.dispatchEvent(new KeyboardEvent("keyup",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0,cancelable:!0})),await new Promise(y=>setTimeout(y,200)),ee(m.action))){n.logToConsole(`> [REPLAN]  Estrat\xE9gia 3 OK: ${f}`,"text-green");continue}}catch{}}if(p.t==="clk"||p.t==="chk"||p.t==="val"){n.logToConsole("> [REPLAN] Estrat\xE9gia 4: internals Vue/React via script injection...","text-blue");try{let b=P(g,A)||P(g.replace(/[^\w\s]/g," ").trim(),A);if(b){let y=b.id,v=!!y;y||(y=`__eq_s4_${Math.random().toString(36).slice(2,8)}`,b.id=y);let x=String(p.v??""),q=p.t==="val",T=document.createElement("script");if(T.textContent=`(function(){
              var el=document.getElementById(${JSON.stringify(y)});
              if(!el)return;
              // Tenta Vue 3 update trigger
              try{if(el.__vueParentComponent){var ins=el.__vueParentComponent;var pr=ins.props||{};if(pr.modelValue!==undefined&&typeof ins.emit==='function'){ins.emit('update:modelValue',${q?JSON.stringify(x):"true"});}}}catch(e){}
              // Tenta React setState via fiber
              try{var fk=Object.keys(el).find(function(k){return k.startsWith('__reactFiber');});
              if(fk){var fb=el[fk];while(fb){var p=fb.memoizedProps||{};
              if(typeof p.onChange==='function')try{p.onChange({target:el,currentTarget:el,type:'change',bubbles:true,preventDefault:function(){},stopPropagation:function(){}});}catch(e){}
              if(typeof p.onInput==='function')try{p.onInput({target:el,currentTarget:el,type:'input',bubbles:true,preventDefault:function(){},stopPropagation:function(){}});}catch(e){}
              fb=fb.return;}}}catch(e){}
            })()`.replace(/\n\s+/g,""),document.head.appendChild(T),T.remove(),v||setTimeout(()=>{try{b.id===y&&b.removeAttribute("id")}catch{}},0),await new Promise(M=>setTimeout(M,300)),ee(m.action)){n.logToConsole(`> [REPLAN]  Estrat\xE9gia 4 OK: ${f}`,"text-green");continue}}}catch{}}if(u?.aborted)return;n.logToConsole("> [REPLAN] Estrat\xE9gia 5: re-consulta IA com diagn\xF3stico focado...","text-blue");try{let b="";try{let w=document.querySelector(`[data-easyquiz-id="${p.id}"]`)||document.getElementById(p.id||"")||Array.from(document.querySelectorAll('input, button, [role="radio"], [role="checkbox"], [role="option"]')).find(I=>(I.textContent||"").toLowerCase().includes(String(p.id||"").toLowerCase().slice(0,20)));w&&(b=w.outerHTML.slice(0,400))}catch{}let y=ue(!1)||le(),v=`A\xE7\xE3o (${p.t}) alvo="${g}" valor="${p.v||p.c||""}" \u2014 Falha: "${m.evidence.slice(0,80)}"${b?`
HTML do alvo: ${b}`:""}`,x=m.strategiesAttempted?[m.strategiesAttempted].flat().concat(["alternative-path","injectScript","keyboard","vue-react-internals"]):["alternative-path","injectScript","keyboard","vue-react-internals"],q=`[REPLANEJAMENTO URGENTE \u2014 TENTATIVA FINAL]
A seguinte a\xE7\xE3o falhou ap\xF3s ${x.length} estrat\xE9gias autom\xE1ticas: ${x.join(", ")}.

${v}

Contexto atual da quest\xE3o:
${y?.questionText.slice(0,400)||"N/A"}

Controles dispon\xEDveis:
${JSON.stringify((y?.controls||[]).slice(0,6).map(w=>({id:w.id,type:w.type,label:w.label,options:w.options?.slice(0,3)})),null,2)}

TAREFA: Gere APENAS a\xE7\xF5es {t:"js"} com JavaScript criativo e robusto que consiga marcar/preencher/clicar o controle correto. 
Tente usar: document.querySelector, getComputedStyle, querySelectorAll com seletores diferentes, ou manipula\xE7\xE3o DOM direta.
Voc\xEA pode tentar m\xFAltiplas abordagens em um \xFAnico bloco JS. Seja criativo.
N\xC3O repita as estrat\xE9gias j\xE1 tentadas acima.`,T={...y,questionText:q},M=await Be(T,[],{...e},w=>n.logToConsole(`> [REPLAN-AI] ${w}`,"text-blue"),u);if(u?.aborted||!M?.plan){n.logToConsole("> [REPLAN]  Re-consulta n\xE3o retornou plano.","text-yellow");continue}let E=M.plan.actions.filter(w=>w.t==="js");if(E.length===0){n.logToConsole("> [REPLAN] \u2139\uFE0F IA n\xE3o gerou a\xE7\xF5es JS de fallback.","text-yellow");continue}n.logToConsole(`> [REPLAN]  IA gerou ${E.length} a\xE7\xE3o(\xF5es) JS custom. Executando...`,"text-blue");let L={...t,actions:E,pageType:"question"},S=await Ie(L,!1,1,be(e));S.applied>0?n.logToConsole(`> [REPLAN]  Estrat\xE9gia 5 OK: ${S.applied} a\xE7\xE3o(\xF5es) JS executada(s)!`,"text-green"):n.logToConsole("> [REPLAN]  Todas as estrat\xE9gias esgotadas para esta a\xE7\xE3o.","text-yellow")}catch(b){n.logToConsole(`> [REPLAN] Erro na re-consulta: ${b instanceof Error?b.message:String(b)}`,"text-yellow")}}}}n.toggle(!0)}Do().catch(o=>{console.error("[EasyQuiz] Erro fatal na inicializa\xE7\xE3o:",o),window.alert(`EasyQuiz: falha ao iniciar: ${o instanceof Error?o.message:String(o)}`)});})();
