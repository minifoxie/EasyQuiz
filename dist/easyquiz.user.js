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
"use strict";(()=>{var ae={apiKey:"",apiKeys:[],model:"gemini-3.5-flash-lite",uiMode:"easy",modeHint:"",engine:"smart",dryRun:!1,autoApply:!0,autoAdvance:!1,hostDarkMode:!0,useVision:!1,confidenceThreshold:.8};function Q(o){if(!o||typeof o!="string")return!1;let e=o.toLowerCase().trim().replace(/^models\//,"");if(!e.includes("gemini"))return!1;let t=["imagen","image","veo","omni","video","embedding","embed","tts","audio","speech","voice","sound","live","transcribe","bidi","aqa","learnlm","deep-research","computer-use","robotics","rt-1","rt-2","mediapipe","cyber","latest","-ultra","experimental"];for(let a of t)if(e.includes(a))return!1;return!(!e.includes("flash")&&!e.includes("pro"))}var je="easyquiz_settings_v2",ce="easyquiz_activity_metrics";function Fe(){try{let o=localStorage.getItem(je);if(!o){let l=localStorage.getItem("easyquiz_settings_v1");if(l){let s=JSON.parse(l);return{...ae,apiKey:s.apiKey||""}}return{...ae}}let e=JSON.parse(o),t=typeof e.model=="string"&&Q(e.model)?e.model:ae.model,a=Array.isArray(e.apiKeys)?e.apiKeys.map(l=>typeof l=="string"?l.trim().replace(/^["']|["']$/g,""):"").filter(l=>l.length>5):[],r=typeof e.apiKey=="string"?e.apiKey.trim().replace(/^["']|["']$/g,""):"";return a.length===0&&r&&(a=[r]),{apiKey:a[0]||r||ae.apiKey,apiKeys:a,model:t,uiMode:e.uiMode==="easy"||e.uiMode==="advanced"?e.uiMode:ae.uiMode,modeHint:e.modeHint??"",engine:e.engine??"smart",dryRun:!!e.dryRun,autoApply:e.autoApply!==void 0?!!e.autoApply:!0,autoAdvance:!!e.autoAdvance,hostDarkMode:e.hostDarkMode!==void 0?!!e.hostDarkMode:!0,useVision:!!e.useVision,confidenceThreshold:typeof e.confidenceThreshold=="number"?e.confidenceThreshold:ae.confidenceThreshold}}catch{return{...ae}}}function bt(){try{localStorage.removeItem(je),localStorage.removeItem("easyquiz_settings_v1"),localStorage.removeItem(ce),sessionStorage.removeItem(ce);let o=[];for(let e=0;e<localStorage.length;e++){let t=localStorage.key(e);t&&(t.startsWith("eq_")||t.startsWith("easyquiz_"))&&o.push(t)}o.forEach(e=>localStorage.removeItem(e)),Qe()}catch(o){console.warn("[EasyQuiz] Erro ao resetar dados:",o)}}function we(o){try{let e=localStorage.getItem("eq_domain_cache_"+o);if(!e)return{};let t=JSON.parse(e);if(t.advanceSelector&&/inject|injetar/i.test(t.advanceSelector)){t.advanceSelector=void 0;try{localStorage.removeItem("eq_domain_cache_"+o)}catch{}}return t}catch{return{}}}function Ge(o,e){if(e.advanceSelector&&/inject|injetar/i.test(e.advanceSelector))return;let a={...we(o),...e};try{localStorage.setItem("eq_domain_cache_"+o,JSON.stringify(a))}catch(r){console.warn("[EasyQuiz] Erro cache de dominio:",r)}}function vt(o){let e=Fe(),t=Array.isArray(o.apiKeys)?o.apiKeys.map(n=>typeof n=="string"?n.trim().replace(/^["']|["']$/g,""):"").filter(n=>n.length>5):e.apiKeys,a;typeof o.apiKey=="string"?a=o.apiKey.trim().replace(/^["']|["']$/g,""):Array.isArray(o.apiKeys)&&o.apiKeys.length>0?a=t[0]||"":a=e.apiKey,a&&!t.includes(a)&&(t=[a,...t]),t.length>0&&(!a||!t.includes(a))&&(a=t[0]);let r={...e,...o,apiKey:a,apiKeys:t};try{localStorage.setItem(je,JSON.stringify(r))}catch(n){console.warn("[EasyQuiz] Falha ao persistir configura\xE7\xF5es no localStorage:",n)}return r}var le=[],ft=12,Qt=1200;function yt(o){let e=o.trim().replace(/\s+/g," ").slice(0,Qt);e&&!le.includes(e)&&(le.push(e),le.length>ft&&(le=le.slice(-ft)))}function He(){return le}function Qe(){le=[]}function xt(){return{startTime:Date.now(),totalElapsedMs:0,completedQuestionsCount:0,averageDurationMs:0,records:[]}}var xe=xt();function qe(){try{localStorage.removeItem(ce)}catch{}return xe}function Jt(o){xe=o;try{let e=JSON.stringify(o);sessionStorage.setItem(ce,e),localStorage.removeItem(ce)}catch{}}function wt(o){let e=xe,t=Date.now(),a=e.records[e.records.length-1];if(a&&a.id===o.id&&t-a.timestamp<3e3)return e;let r={...o,timestamp:t},n=[...e.records,r],l=n.filter(u=>u.status==="answered"||u.status==="verified").length,s=n.reduce((u,h)=>u+h.durationMs,0),i=l>0?Math.round(s/l):0,c={startTime:e.startTime||t,totalElapsedMs:Math.max(t-(e.startTime||t),s),completedQuestionsCount:l,averageDurationMs:i,records:n};return Jt(c),c}function Ee(){xe=xt();try{sessionStorage.removeItem(ce),localStorage.removeItem(ce)}catch{}return xe}var qt=`Voc\xEA \xE9 o motor operacional inteligente do EasyQuiz. Sa\xEDda EXCLUSIVA em JSON minificado, sem markdown, sem coment\xE1rios, sem texto fora do JSON.

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
`;function Yt(o,e){return/forms\.(google|gle)\.com|docs\.google\.com\/forms/i.test(o)||e.includes("Qr7Oae")||e.includes("freebirdFormviewer")||e.includes("data-item-id")?"[PLATAFORMA: Google Forms \u2014 use clk nos containers de alternativa; IDs via data-item-id ou texto da op\xE7\xE3o]":/wayground|quizizz/i.test(o)||e.includes("data-functional-selector")?e.includes("classification")||e.toLowerCase().includes("fato")||e.toLowerCase().includes("opini")?`[PLATAFORMA: Wayground/Quizizz CLASSIFICA\xC7\xC3O drag-and-drop]
[RESPOSTAS] ter\xE1 items com t="draggable" e id hexadecimal (ex: 695fa5b6...).
Use EXCLUSIVAMENTE: {t:"drag", from:"ID_hexadecimal_do_card", to:"NOME_DA_CATEGORIA"}
Exemplo: {t:"drag",from:"695fa5b69885555d8155a5ac",to:"FATO"}
Classifique TODOS os items (1 drag por item) antes de emitir adv.
mode: "arrastar_soltar"`:"[PLATAFORMA: Wayground/Quizizz \u2014 alternativas s\xE3o cards clic\xE1veis, use clk]":/khanacademy\.org/i.test(o)||e.includes("perseus")?"[PLATAFORMA: Khan Academy \u2014 widgets Perseus; use js via $eq para widgets interativos se necess\xE1rio]":/moodle|ava\.|classroom\.google/i.test(o)?"[PLATAFORMA: Moodle/AVA/Classroom \u2014 formul\xE1rios padr\xE3o]":/duolingo/i.test(o)?"[PLATAFORMA: Duolingo \u2014 tiles clic\xE1veis, use clk por texto]":/blackboard|canvas\.instructure/i.test(o)?"[PLATAFORMA: Canvas/Blackboard \u2014 quiz-question padr\xE3o]":/socrative|kahoot/i.test(o)?"[PLATAFORMA: Socrative/Kahoot \u2014 alternativas s\xE3o bot\xF5es, use clk]":""}function Ce(o,e,t){let a=o.htmlSnippet.includes("draggable")||o.htmlSnippet.includes("perseus")||o.htmlSnippet.includes("category")||o.htmlSnippet.includes("dropzone")||o.controls.some(f=>f.type==="draggable"||f.type==="dropzone"),r=/katex|latex|\\frac|\\sqrt/i.test(o.htmlSnippet),n=/forms\.(google|gle)\.com|docs\.google\.com\/forms/i.test(o.sourceUrl)||o.htmlSnippet.includes("Qr7Oae")||o.htmlSnippet.includes("data-item-id")||o.htmlSnippet.includes("freebirdFormviewer"),l=(/wayground|quizizz/i.test(o.sourceUrl)||o.htmlSnippet.includes("data-functional-selector"))&&(o.htmlSnippet.includes("classification")||o.controls.filter(f=>f.role==="answer").length===0),s=o.controls.filter(f=>f.role!=="navigation").length===0,i=s||a||n||l||r&&o.questionText.length<60,c=s?4500:l?6e3:1800,u=i?`
[HTML]:
${o.htmlSnippet.slice(0,c).replace(/\s+/g," ")}`:"",h="";if(s&&typeof document<"u")try{let f=Array.from(document.querySelectorAll('input:not([type=hidden]), textarea, select, button, [role="button"], [role="radio"], [role="checkbox"], [role="option"], [onclick], [data-action], a[href]:not([href="#"]), [tabindex]:not([tabindex="-1"])')).filter(v=>{let x=v,T=x.getBoundingClientRect?.()||{width:0,height:0};return T.width>0&&T.height>0&&!x.closest("#easyquiz-shadow-root, .eq-sidebar")}).slice(0,40).map(v=>{let x=v,T=x.tagName.toLowerCase(),w=x.id?`#${x.id}`:"",E=x.className&&typeof x.className=="string"?`.${x.className.trim().split(/\s+/).slice(0,2).join(".")}`:"",C=(x.textContent||x.value||x.getAttribute("aria-label")||"").trim().slice(0,60),I=x.getAttribute("type")||x.getAttribute("role")||"";return`${T}${w}${E}[${I}] txt="${C}"`});f.length>0&&(h=`
[DOM-INTERATIVO]:
${f.join(`
`)}`)}catch{}let d=He(),m=d.length>0?`
[MEM\xD3RIA]:
${d.join(" | ")}
`:"",p=o.controls.filter(f=>f.role!=="navigation"),b=o.controls.filter(f=>f.role==="navigation"),y=Yt(o.sourceUrl,o.htmlSnippet),g=y?`
${y}
`:"";return`--- AN\xC1LISE ---
[MODO]: ${t.engine} | Dica: ${t.modeHint||"Auto"}
[URL]: ${o.sourceUrl}
[P\xC1GINA]: ${o.pageTitle}${m}${g}
[DADOS]
[TEXTO]:
${o.questionText}${u}${h}

[RESPOSTAS]:
${(()=>{if(p.length===0)return"Nenhuma";let f=p.filter(A=>A.type==="checkbox"||A.type==="chk"),v=new Set(p.filter(A=>A.type==="radio").map(A=>A.name).filter(Boolean)),x=f.filter(A=>!A.name||!v.has(A.name)),T=/selecione as|assinale as|quais das|todas as|marque as|escolha as|quais dessas|quais dos/i.test(o.questionText),w=x.length>=2||T,E=v.size>1||/verdadeir|fals[oa]|\bv\s*\/\s*f\b|julgue|itens/i.test(o.questionText)&&v.size>=1,C=p.every(A=>A.type==="radio"||A.type==="chk")&&v.size===1&&!w&&!E,I=p.filter(A=>A.type==="text"||A.type==="number"||A.type==="val"||A.tag==="input"||A.tag==="textarea"),M=I.length>=2;return(E?`[GRADE VERDADEIRO/FALSO (${v.size||"m\xFAltiplas"} afirma\xE7\xF5es): voc\xEA DEVE julgar e marcar exatamente 1 op\xE7\xE3o (V ou F) para CADA uma das ${v.size} afirma\xE7\xF5es \u2014 emita ${v.size} a\xE7\xF5es chk separadas + adv]
`:w?`[MULTI-SELE\xC7\xC3O: marque TODOS os corretos, pode ser 2 ou mais]
`:C?`[ESCOLHA-\xDAnica: marque APENAS 1 op\xE7\xE3o]
`:M?`[M\xDALTIPLOS CAMPOS DE PREENCHIMENTO (${I.length} campos): emita uma a\xE7\xE3o val para CADA um dos ${I.length} campos abaixo com seu id exato]
`:"")+JSON.stringify(p.map(A=>({id:A.id,t:A.type,n:A.name||void 0,txt:A.label?A.label.length>160?A.label.slice(0,160)+"...":A.label:void 0,v:A.value||void 0,opt:A.options&&A.options.length?A.options.slice(0,20).map(z=>z.label||z.value):void 0})))})()}

[NAVEGA\xC7\xC3O]:
${b.length>0?b.map(f=>`"${f.label||f.id}"[${f.type}]`).join(","):"Nenhuma"}

[IMAGENS E GR\xC1FICOS ANEXADOS (${e.length})]:
${e.length===0?"Nenhum anexo visual.":e.map((f,v)=>{let x=f.associatedLabel||"Gr\xE1fico da Quest\xE3o",T=f.alt?` | alt: "${f.alt}"`:"";return f.captureStatus==="text_only"?`  - Imagem ${v+1} [CONTEXTO_TEXTUAL]: ${x}${T} | ${f.textContext||"sem contexto adicional"}`:f.captureStatus==="captured"||f.base64?`  - Imagem ${v+1} [VISUAL_INLINE]: ${x}${T}`:`  - Imagem ${v+1} [FALHOU]: ${x}${T}`}).join(`
`)}
[/DADOS]
Sa\xEDda em JSON v\xE1lido.`}var Wt=new Set(["question","info","start","conclusion"]),Xt=new Set(["texto_livre","escolha_unica","escolha_multipla","verdadeiro_falso","preenchimento","acao_sem_resposta","categorizacao","ordenacao","arrastar_soltar"]),Zt=new Set(["val","chk","sel","clk","adv","js","drag"]),eo=150,Te=2e3;function J(o,e=""){return o==null?e:typeof o=="string"?o.trim().slice(0,Te):typeof o=="number"||typeof o=="boolean"?String(o).trim().slice(0,Te):e}function to(o,e){if(!o||typeof o!="object")return null;let t=o,a=t.t;if(typeof a!="string"||!Zt.has(a))return null;if(a==="adv"){let s=t.id??t.target??t.name??t.selector;return{t:"adv",...J(s)?{id:J(s,"").slice(0,500)}:{}}}if(a==="drag"){let s=J(t.from??t.source),i=J(t.to??t.target??t.destination);return!s||!i?null:{t:"drag",from:s.slice(0,500),to:i.slice(0,500)}}if(a==="js"){let s=J(t.v??t.code??t.script);return!s||s.length>8e3?null:{t:"js",v:s}}let r=t.id??t.target??t.name??t.selector??t.element;(r==null||r==="")&&a==="val"&&(r="1");let n=J(r).slice(0,500);if(!n)return null;if(a==="val"){let s=t.v!==void 0?t.v:t.value!==void 0?t.value:t.val!==void 0?t.val:t.text!==void 0?t.text:t.answer;return{t:"val",id:n,v:J(s).slice(0,Te)}}if(a==="sel"){let s=t.v!==void 0?t.v:t.value!==void 0?t.value:t.val!==void 0?t.val:t.values,c=(Array.isArray(s)?s:[s]).map(u=>J(u).slice(0,500)).filter(Boolean);return{t:"sel",id:n,v:c}}if(a==="chk"){let s=t.c===!1||t.c==="false"||t.c===0||t.c==="0"||t.c==="off"||t.c==="unchecked"||t.c==="desmarcar",i={t:"chk",id:n,c:!s};return t.v!==void 0&&(i.v=J(t.v).slice(0,Te)),i}let l={t:"clk",id:n};if(t.c!==void 0){let s=t.c===!1||t.c==="false"||t.c===0||t.c==="0"||t.c==="off"||t.c==="unchecked"||t.c==="desmarcar";l.c=!s}return t.v!==void 0&&(l.v=J(t.v).slice(0,Te)),Array.isArray(t.co)&&t.co.length===2&&t.co.every(s=>typeof s=="number"&&Number.isFinite(s))&&(l.co=[t.co[0],t.co[1]]),l}function oo(o,e,t){if(t!=="question")return o;let a=o.filter(n=>n.t==="adv"),r=o.filter(n=>n.t!=="adv");if(e==="escolha_unica"){r=r.filter(l=>!(l.t==="chk"&&l.c===!1||l.t==="clk"&&l.c===!1));let n=r.filter(l=>l.t==="chk"||l.t==="clk");if(n.length>1){let l=r.filter(i=>i.t!=="chk"&&i.t!=="clk"),s=n[n.length-1];r=[...l,s]}}else if(e==="escolha_multipla"){r=r.filter(l=>!(l.t==="chk"&&l.c===!1||l.t==="clk"&&l.c===!1));let n=new Set;r=r.filter(l=>{let s="id"in l&&typeof l.id=="string"?l.id:"";return s?n.has(s)?!1:(n.add(s),!0):!0})}else if(e==="verdadeiro_falso"){let n=new Set,l=[...r].reverse(),s=[];for(let i of l){let c="id"in i&&typeof i.id=="string"?i.id:"";c?n.has(c)||(n.add(c),s.push(i)):s.push(i)}r=s.reverse()}return[...r,...a]}function Et(o){if(!o||typeof o!="object")return{pageType:"info",mode:"acao_sem_resposta",confidence:.5,rationale:"Resposta estruturada n\xE3o identificada; avan\xE7ando como informativo.",actions:[{t:"adv"}]};let e=o,t=e.pageType,a=e.mode;(typeof t!="string"||!Wt.has(t))&&(t="question"),(typeof a!="string"||!Xt.has(a))&&(a="escolha_unica");let r=Array.isArray(e.actions)?e.actions:[],n=[];for(let i=0;i<Math.min(r.length,eo);i++){let c=to(r[i],i);c&&n.push(c)}n.some(i=>i.t==="val")&&(a==="escolha_unica"||!e.mode)&&(a="preenchimento"),n.some(i=>i.t==="drag")&&!["categorizacao","arrastar_soltar","ordenacao"].includes(a)&&(a="arrastar_soltar"),n=oo(n,a,t);let l=n.some(i=>i.t==="adv");t==="conclusion"?n.length=0:t==="info"||t==="start"?l||n.push({t:"adv"}):t==="question"&&!l&&n.push({t:"adv"});let s=typeof e.confidence=="number"&&Number.isFinite(e.confidence)?Math.min(1,Math.max(0,e.confidence)):.85;return{pageType:t,mode:a,confidence:s,rationale:J(e.rationale,"Plano validado e auto-recuperado."),actions:n,...J(e.memoryToStore)?{memoryToStore:J(e.memoryToStore)}:{},...e.needsMoreContext?{needsMoreContext:!!e.needsMoreContext}:{}}}var X=class{keys=new Map;constructor(e=[]){this.init(e)}init(e){let t=new Map(this.keys);this.keys.clear();let a=e.flatMap(n=>n.split(/[\n\r]+/));Array.from(new Set(a.map(n=>n.trim().replace(/^["']|["']$/g,"")).filter(n=>n.length>5))).forEach((n,l)=>{let s=this.generateId(n),i=t.get(s)||t.get(n);this.keys.set(s,{id:s,key:n,label:i?.label||`Chave ${l+1}`,addedAt:i?.addedAt||Date.now(),lastUsedAt:i?.lastUsedAt,lastLatencyMs:i?.lastLatencyMs,cooldownUntil:i?.cooldownUntil,errorCount:i?.errorCount||0,lastError:i?.lastError,winCount:i?.winCount||0})})}generateId(e){let t=0;for(let r=0;r<e.length;r++)t=(t<<5)-t+e.charCodeAt(r),t|=0;let a=e.slice(-12).replace(/[^a-zA-Z0-9]/g,"").slice(0,6);return`key_${Math.abs(t).toString(36).slice(0,6)}${a}`}static maskKey(e){let t=e.trim().replace(/^["']|["']$/g,"");return t.length<=10?"\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022":`${t.slice(0,6)}...${t.slice(-4)}`}getAllKeys(){let e=Date.now();return Array.from(this.keys.values()).map(t=>{let a=Math.max(0,(t.cooldownUntil||0)-e);return{...t,isCooldown:a>0,remainingCooldownMs:a}})}getHealthyKeys(){let e=Date.now();return Array.from(this.keys.values()).filter(t=>(t.cooldownUntil||0)<=e&&(t.errorCount||0)<50)}getRoundRobinKeys(e=2){let t=Date.now(),a=Array.from(this.keys.values()).filter(n=>(n.errorCount||0)<50);if(a.length===0)return Array.from(this.keys.values()).slice(0,e);let r=a.filter(n=>(n.cooldownUntil||0)<=t);return r.length>0?(r.sort((n,l)=>(n.lastUsedAt||0)-(l.lastUsedAt||0)),r.slice(0,e)):(a.sort((n,l)=>(n.cooldownUntil||0)-(l.cooldownUntil||0)),a.slice(0,e))}getBestKey(){return this.getRoundRobinKeys(1)[0]?.key||""}getDiverseKeys(e){return this.getRoundRobinKeys(e).map(t=>t.key)}markQuotaHit(e,t=8e3){let a=this.findKeyObj(e);a&&(a.cooldownUntil=Date.now()+t,a.lastError=`Cota tempor\xE1ria atingida (HTTP 429). Cooldown de ${Math.round(t/1e3)}s ativado.`)}markOverloaded(e,t=5e3){let a=this.findKeyObj(e);a&&(a.cooldownUntil=Date.now()+t,a.lastError=`Servidores sobrecarregados (HTTP 503). Cooldown de ${Math.round(t/1e3)}s ativado.`)}markSuccess(e,t){let a=this.findKeyObj(e);a&&(a.lastLatencyMs=t,a.lastUsedAt=Date.now(),a.errorCount=0,a.lastError=void 0,a.cooldownUntil=void 0)}markWinner(e){let t=this.findKeyObj(e);t&&(t.winCount=(t.winCount||0)+1)}markInvalid(e,t){let a=this.findKeyObj(e);a&&(a.errorCount=99,a.lastError=t)}addKey(e,t){let a=e.trim().replace(/^["']|["']$/g,"");if(!a)return{ok:!1,message:"Chave n\xE3o pode ser vazia."};if(a.length<15)return{ok:!1,message:"Chave de API inv\xE1lida ou muito curta."};let r=this.generateId(a);if(this.keys.has(r)||Array.from(this.keys.values()).some(s=>s.key===a))return{ok:!1,message:"Esta chave de API j\xE1 est\xE1 cadastrada."};let l={id:r,key:a,label:t?.trim()||`Chave ${this.keys.size+1}`,addedAt:Date.now(),errorCount:0};return this.keys.set(r,l),{ok:!0,message:"Chave adicionada com sucesso!",keyItem:l}}updateKey(e,t,a){let r=this.keys.get(e);if(!r)return{ok:!1,message:"Chave n\xE3o encontrada."};let n=t.trim().replace(/^["']|["']$/g,"");return!n||n.length<15?{ok:!1,message:"Chave de API inv\xE1lida."}:(r.key=n,a!==void 0&&(r.label=a.trim()),r.errorCount=0,r.cooldownUntil=void 0,r.lastError=void 0,{ok:!0,message:"Chave atualizada com sucesso!"})}removeKey(e){if(this.keys.size<=1)return{ok:!1,message:"Voc\xEA precisa manter pelo menos 1 chave de API cadastrada."};let t=this.findKeyObj(e);return t?(this.keys.delete(t.id),{ok:!0,message:"Chave removida com sucesso."}):{ok:!1,message:"Chave n\xE3o encontrada."}}exportRawKeys(){return Array.from(this.keys.values()).map(e=>e.key)}size(){return this.keys.size}findKeyObj(e){if(this.keys.has(e))return this.keys.get(e);for(let t of this.keys.values())if(t.key===e)return t}},$=new X;var he=[{id:"gemini-3.8-flash",name:"Gemini 3.8 Flash (Mais Inteligente 2026)",description:"Modelo flagship Flash lan\xE7ado em Set/2026. Ultra-r\xE1pido e altamente capaz.",stable:!0},{id:"gemini-3.7-flash",name:"Gemini 3.7 Flash (Agentic)",description:"Alta capacidade para racioc\xEDnio multimodal e workflows ag\xEAnticos.",stable:!0},{id:"gemini-3.6-flash",name:"Gemini 3.6 Flash (Est\xE1vel)",description:"Modelo est\xE1vel e confi\xE1vel com excelente velocidade.",stable:!0},{id:"gemini-3.5-flash",name:"Gemini 3.5 Flash (R\xE1pido)",description:"Modelo de alta performance para tarefas r\xE1pidas.",stable:!0},{id:"gemini-3.5-flash-lite",name:"Gemini 3.5 Flash-Lite (Cota Alta 30 RPM)",description:"Modelo econ\xF4mico de ultra-alta velocidade e maior limite de RPM.",stable:!0},{id:"gemini-3.1-pro",name:"Gemini 3.1 Pro (Racioc\xEDnio Profundo)",description:"Modelo topo de linha para racioc\xEDnio complexo, exatas e matem\xE1tica.",stable:!0},{id:"gemini-2.5-flash",name:"Gemini 2.5 Flash (Ultra R\xE1pido)",description:"Modelo comprovado de baix\xEDssima lat\xEAncia e alta disponibilidade.",stable:!0},{id:"gemini-2.5-pro",name:"Gemini 2.5 Pro (Avan\xE7ado)",description:"Modelo avan\xE7ado para quest\xF5es de alta complexidade.",stable:!0}],Tt=["gemini-3.5-flash-lite","gemini-3.5-flash","gemini-3.6-flash","gemini-3.8-flash","gemini-2.5-flash"],ao={"gemini-2.0-flash":"gemini-3.5-flash","gemini-2.0-flash-lite":"gemini-3.5-flash-lite","gemini-1.5-flash":"gemini-3.5-flash","gemini-1.5-pro":"gemini-3.6-flash","gemini-1.0-pro":"gemini-2.5-flash"};function We(o){return ao[o]??o}function no(o,e){let a={temperature:0,maxOutputTokens:1350,responseMimeType:"application/json",responseSchema:e??io};return/lite/i.test(o)||(/gemini-3\.[0-9]+-?flash/i.test(o)?a.thinkingConfig={thinkingBudget:0}:/gemini-2\.5-flash/i.test(o)&&(a.thinkingConfig={thinkingBudget:0})),a}var io={type:"OBJECT",properties:{pageType:{type:"STRING",enum:["question","info","start","conclusion"]},mode:{type:"STRING",enum:["texto_livre","escolha_unica","escolha_multipla","verdadeiro_falso","preenchimento","acao_sem_resposta","categorizacao","ordenacao","arrastar_soltar"]},confidence:{type:"NUMBER"},rationale:{type:"STRING"},thinking:{type:"STRING"},memoryToStore:{type:"STRING"},imageDescriptions:{type:"ARRAY",items:{type:"OBJECT",properties:{index:{type:"NUMBER"},description:{type:"STRING"},relevant:{type:"BOOLEAN"},associatedLabel:{type:"STRING"}}}},actions:{type:"ARRAY",items:{type:"OBJECT",properties:{t:{type:"STRING",enum:["val","chk","sel","clk","adv","js","drag"]},id:{type:"STRING"},name:{type:"STRING"},label:{type:"STRING"},v:{type:"STRING"},c:{type:"BOOLEAN"},co:{type:"ARRAY",items:{type:"NUMBER"}},from:{type:"STRING"},to:{type:"STRING"}},required:["t"]}}},required:["pageType","mode","confidence","rationale","actions"]};function At(o){let e=o.trim().replace(/^google\//,"").replace(/^models\//,"");if(!e)return"gemini-3.5-flash-lite";let t=We(e);return Q(t)?t:(console.warn(`[EasyQuiz] Modelo desconhecido ou inv\xE1lido: "${e}". Verifique se o modelo est\xE1 dispon\xEDvel no Google AI Studio.`),"gemini-3.5-flash-lite")}function Ye(o,e){let t="";try{let a=JSON.parse(o);t=a.error?.message||a.message||""}catch{t=o.slice(0,160)}return/API_KEY_INVALID|API key not valid|key.*invalid|unregistered/i.test(t)?"Chave de API do Gemini inv\xE1lida ou n\xE3o autorizada no Google AI Studio.":/RESOURCE_EXHAUSTED|Quota exceeded|rate limit|quota/i.test(t)||e===429?`Cota do Gemini excedida (HTTP 429): ${t||"Aguarde"}`:e===404?`HTTP 404: ${t||"Modelo ou endpoint n\xE3o encontrado no Google AI Studio"}`:e===503||/overloaded/i.test(t)?`Servidores Google sobrecarregados (HTTP 503): ${t||"Aguardando"}`:t?`Erro Gemini (HTTP ${e}): ${t}`:`Falha na requisi\xE7\xE3o ao Gemini (HTTP ${e}).`}function so(o){let e=o.trim(),t=e.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);if(t)try{return JSON.parse(t[1].trim())}catch{}try{return JSON.parse(e)}catch{}let a=e.match(/\{[\s\S]*\}/);if(a)try{return JSON.parse(a[0].trim())}catch{}try{let r=e.indexOf("{");if(r!==-1){let n=e.slice(r).trim();n=n.replace(/,\s*\{[^}]*$/,""),n=n.replace(/,\s*$/,"");let l=0,s=0,i=!1,c=!1;for(let h=0;h<n.length;h++){let d=n[h];if(c){c=!1;continue}if(d==="\\"){c=!0;continue}if(d==='"'){i=!i;continue}i||(d==="{"?l++:d==="}"?l=Math.max(0,l-1):d==="["?s++:d==="]"&&(s=Math.max(0,s-1)))}for(i&&(n+='"');s>0;)n+="]",s--;for(;l>0;)n+="}",l--;let u=JSON.parse(n);if(u&&typeof u=="object")return u}}catch{}throw new Error("Falha ao decodificar JSON da IA.")}var St=(()=>{try{let o=typeof localStorage<"u"?localStorage.getItem("easyquiz_cached_models"):null;if(!o)return null;let e=JSON.parse(o);if(Array.isArray(e)){let t=e.filter(a=>a&&typeof a.id=="string"&&Q(a.id));return t.length>0?t:null}return null}catch{return null}})(),Je=new Set;async function ze(o){let e=o.trim().replace(/^["']|["']$/g,"");if(!e)return he;let t=[`https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(e)}`,`https://generativelanguage.googleapis.com/v1/models?key=${encodeURIComponent(e)}`];for(let a of t)try{let r=await fetch(a,{headers:{"Content-Type":"application/json","x-goog-api-key":e}});if(!r.ok){let l=await r.text(),s=Ye(l,r.status);if(s.includes("inv\xE1lida")||s.includes("n\xE3o autorizada"))throw new Error(s);continue}let n=await r.json();if(Array.isArray(n.models)&&n.models.length>0){let l=n.models.filter(s=>{let i=s.supportedGenerationMethods||[],c=(s.name||"").replace(/^models\//,""),u=i.includes("generateContent");return Q(c)&&u}).map(s=>{let i=s.supportedGenerationMethods||[],c=s.name.replace(/^models\//,""),u=s.displayName||c;return{id:c,name:u.includes(c)?u:`${u} (${c})`,description:s.description||"",stable:!/-preview|-experimental|-latest/i.test(c),supportsVision:!/embedding|tts|transcribe|live|image|sound|voice/i.test(c),supportsStructuredOutput:i.includes("generateContent"),supportedGenerationMethods:i,discoveredAt:Date.now()}});if(l.length>0){l.sort((s,i)=>{let c=u=>u==="gemini-3.8-flash"?200:u==="gemini-3.7-flash"?190:u==="gemini-3.6-flash"?180:u==="gemini-3.5-flash"?170:u==="gemini-3.5-flash-lite"?160:u==="gemini-2.5-flash"?130:u.includes("flash")?80:u==="gemini-2.5-pro"?60:u.includes("pro")?50:10;return c(i.id)-c(s.id)}),St=l;try{typeof localStorage<"u"&&localStorage.setItem("easyquiz_cached_models",JSON.stringify(l))}catch{}return l}}}catch(r){if(r.message?.includes("Chave de API"))throw r}return he}async function Pe(o){let e=o.trim().replace(/^["']|["']$/g,"");if(!e)return{ok:!1,message:"Insira sua chave de API."};try{let a=await ze(e);if(a.length>0&&a!==he){let r=a[0];return{ok:!0,message:`Chave v\xE1lida! ${a.length} modelos Gemini dispon\xEDveis em sua conta. Recomendado: ${r.name}`,models:a}}}catch(a){return{ok:!1,message:a instanceof Error?a.message:String(a)}}let t=["gemini-3.8-flash","gemini-3.6-flash","gemini-3.5-flash"];for(let a of t)for(let r of["v1beta","v1"]){let n=`https://generativelanguage.googleapis.com/${r}/models/${a}:generateContent?key=${encodeURIComponent(e)}`;try{if((await fetch(n,{method:"POST",headers:{"Content-Type":"application/json","x-goog-api-key":e},body:JSON.stringify({contents:[{role:"user",parts:[{text:"PING"}]}],generationConfig:{maxOutputTokens:5}})})).ok)return{ok:!0,message:`Chave validada com sucesso no ${a} (${r})!`,models:he}}catch{}}return{ok:!1,message:"Chave de API inv\xE1lida, sem cota ou sem permiss\xE3o para modelos Gemini."}}async function Xe(o,e){let t=e.map(c=>c.trim().replace(/^["']|["']$/g,"")).filter(c=>c.length>5);if(t.length===0)return{ok:!1,model:o,key:"",message:"Nenhuma chave dispon\xEDvel."};let a=We(At(o)),r=JSON.stringify({contents:[{role:"user",parts:[{text:"PING"}]}],generationConfig:{maxOutputTokens:5}}),n={"Content-Type":"application/json"};async function l(c,u,h){let d=new AbortController,m=setTimeout(()=>d.abort(),h);try{let p=`https://generativelanguage.googleapis.com/v1beta/models/${u}:generateContent?key=${encodeURIComponent(c)}`,b=await fetch(p,{method:"POST",headers:{...n,"x-goog-api-key":c},body:r,signal:d.signal});if(clearTimeout(m),b.ok)return{ok:!0,model:u,key:c,message:`Modelo '${u}' validado com sucesso!`};let y=await b.text().catch(()=>"");throw new Error(`HTTP ${b.status}: ${y.slice(0,80)}`)}catch(p){throw clearTimeout(m),p}}if(t.length>=2){let c=t.slice(0,6);try{return await Promise.any(c.map(h=>l(h,a,8e3)))}catch{}}let s=t[0],i=[a,...Tt.filter(c=>c!==a)];for(let c of i)try{let u=await l(s,c,4e3);return c!==a&&(u.message=`Modelo preferido indispon\xEDvel. Validado via fallback '${c}'.`),u}catch{}return{ok:!1,model:a,key:s,message:"Nenhum modelo Gemini respondeu. Verifique sua chave e cota."}}async function ro(o,e,t,a,r){let n=["v1beta","v1"],l=new Error(`Falha ao consultar modelo ${o}`),i={...no(o,r)};for(let c of n){if(a.aborted)throw new Error("Opera\xE7\xE3o cancelada pelo usu\xE1rio.");let u=`https://generativelanguage.googleapis.com/${c}/models/${o}:generateContent?key=${encodeURIComponent(e)}`,h=Date.now();try{let d=await fetch(u,{method:"POST",headers:{"Content-Type":"application/json","x-goog-api-key":e},body:JSON.stringify({...t,generationConfig:i}),signal:a});if(!d.ok){let b=await d.text();if(d.status===400){let g=/thinking/i.test(b),f=/response_schema|responseSchema|Repeated map key|PROTO payload/i.test(b);if((g||f)&&(i.thinkingConfig||i.responseSchema)){let v={...i};g&&delete v.thinkingConfig,f&&(delete v.responseSchema,delete v.responseMimeType),i=v;let x=await fetch(u,{method:"POST",headers:{"Content-Type":"application/json","x-goog-api-key":e},body:JSON.stringify({...t,generationConfig:i}),signal:a});if(x.ok){let E=await x.json(),C=E.candidates?.[0];if(C?.content?.parts?.[0]?.text)return $.markSuccess(e,Date.now()-h),{rawText:C.content.parts[0].text,data:E,usedModel:o,usedKey:e}}let T=await x?.text?.().catch(()=>"")??b,w=Ye(T,d.status);throw new Error(`[${o}|${X.maskKey(e)}] ${w}`)}}let y=Ye(b,d.status);if(d.status===404&&c==="v1beta")continue;throw d.status===429?($.markQuotaHit(e,8e3),Lt(e,o,1e4),new Error(`[${o}|${X.maskKey(e)}] ${y}`)):(d.status===503||/no capacity|overloaded|unavailable/i.test(b)?($.markOverloaded(e,5e3),Je.add(o)):d.status===403||/API_KEY_INVALID/i.test(b)?$.markInvalid(e,y):d.status===404&&Je.add(o),new Error(`[${o}|${X.maskKey(e)}] ${y}`))}let m=await d.json(),p=m.candidates?.[0];if(!p||!p.content?.parts?.[0]?.text)throw new Error(`[${o}|${X.maskKey(e)}] A IA n\xE3o retornou uma resposta estruturada v\xE1lida.`);return $.markSuccess(e,Date.now()-h),{rawText:p.content.parts[0].text,data:m,usedModel:o,usedKey:e}}catch(d){if(a.aborted)throw d;l=d;let m=l.message||"";if(m.includes("404")||/no longer available/i.test(m)){Je.add(o);break}if(m.includes("429")||m.includes("Quota"))break}}throw l}var $e=new Map;function Ct(o,e){let t=`${o}::${e}`,a=$e.get(t);return a===void 0?!1:Date.now()>a?($e.delete(t),!1):!0}function Lt(o,e,t=1e4){$e.set(`${o}::${e}`,Date.now()+t)}function Mt(){$e.clear()}async function Re(o,e,t,a,r,n){if(r?.aborted)throw new Error("Opera\xE7\xE3o cancelada pelo usu\xE1rio.");let l=Array.isArray(t.apiKeys)&&t.apiKeys.length>0?t.apiKeys:t.apiKey?[t.apiKey]:[];$.init(l);let s=t.apiKey.trim().replace(/^["']|["']$/g,""),i=$.getBestKey()||s;if(!i)throw new Error("Nenhuma chave de API do Gemini configurada ou dispon\xEDvel.");let c=At(t.model);if(!St&&i&&ze(i).catch(()=>{}),r?.aborted)throw new Error("Opera\xE7\xE3o cancelada pelo usu\xE1rio.");let u=Date.now(),h=Ce(o,e,t),d=[{text:h}];for(let k=0;k<e.length;k++){let A=e[k],z=A.associatedLabel||(A.alt?`Imagem: ${A.alt}`:`Imagem ${k+1}`);if(A.captureStatus==="text_only"||!A.base64){let D=A.textContext||A.alt||"";d.push({text:`[CONTEXTO_IMAGEM_${k+1} - V\xCDNCULO: ${z}]: ${D}`})}else d.push({text:`[ANEXO VISUAL ${k+1} - V\xCDNCULO: ${z}]:`}),d.push({inline_data:{mime_type:A.mediaType,data:A.base64}})}let m={system_instruction:{parts:[{text:n?.systemPromptOverride??qt}]},contents:[{role:"user",parts:d}]},p=We(c),b=Tt.filter(k=>k!==p),g=$.getAllKeys().length,f=k=>g<=1||k===0?1:2,v=new Set,x=(k,A)=>{let z=/pro/i.test(k),D=/lite/i.test(k);return z?A===0?9e3:A===1?12e3:16e3:D?A===0?3500:A===1?5e3:6500:A===0?4500:A===1?6500:8e3},T=async(k,A)=>{if(A.length===0||r?.aborted)return null;let z=A.map(()=>new AbortController),D=()=>z.forEach(N=>{try{N.abort()}catch{}});r?.addEventListener("abort",D,{once:!0});let K=A.map(N=>`${N.model.replace("gemini-","")}/${N.label}`).join(" | ");a?.(`\u26A1 ${k}: ${A.length} slot(s) [${K}]...`,"info");try{let N=A.map(async(U,te)=>{let j=z[te],re=setTimeout(()=>{try{j.abort(new Error(`Timeout ${U.timeout/1e3}s (${U.model}|${U.label})`))}catch{j.abort()}},U.timeout);try{let _=await ro(U.model,U.key,m,j.signal,n?.generationSchemaOverride);clearTimeout(re);let W=Et(so(_.rawText));return W.usedModel=_.usedModel,W.durationMs=Date.now()-u,W.promptSent=h,W.tokensUsed=_.data.usageMetadata?.totalTokenCount,W.promptTokens=_.data.usageMetadata?.promptTokenCount,W.candidatesTokens=_.data.usageMetadata?.candidatesTokenCount,W.rawResponse=_.rawText,z.forEach((gt,Gt)=>{if(Gt!==te)try{gt.abort(new Error("Cancelado: vencedor respondeu."))}catch{gt.abort()}}),{plan:W,rawUsage:_.data.usageMetadata,usedModel:_.usedModel,usedKey:_.usedKey,slotLabel:U.label}}catch(_){clearTimeout(re);let W=_ instanceof Error?_.message:String(_);throw(W.includes("429")||W.includes("Quota")||W.includes("RESOURCE_EXHAUSTED"))&&(Lt(U.key,U.model,1e4),$.markQuotaHit(U.key,8e3)),_}}),B=await Promise.any(N);return r?.removeEventListener("abort",D),$.markWinner(B.usedKey),B}catch(N){return r?.removeEventListener("abort",D),N instanceof AggregateError&&N.errors.length>0?I=N.errors.map(B=>B instanceof Error?B.message:String(B)).join(" | "):N instanceof Error&&(I=N.message),console.warn(`[EasyQuiz ${k}] Falha na onda:`,I),null}},E=(g<=1?1:1+Math.ceil((g-1)/2))+4,C=0,I="",M=0;for(;C<E;){if(r?.aborted)throw new Error("Opera\xE7\xE3o cancelada pelo usu\xE1rio.");let k=$.getRoundRobinKeys(g),A=k.filter(j=>!v.has(`${j.key}::${p}`)&&!Ct(j.key,p)),z,D;if(A.length>0)z=p,D=A;else{let j=b;z=j[M%j.length]||p,M++;let re=k.filter(_=>!v.has(`${_.key}::${z}`)&&!Ct(_.key,z));D=re.length>0?re:k.filter(_=>!v.has(`${_.key}::${z}`))}if(D.length===0){if(M<b.length)continue;break}let K=D.slice(0,f(C));if(K.length===0)break;let N=x(z,C),B=K.map(j=>(v.add(`${j.key}::${z}`),{model:z,key:j.key,label:j.label||"Chave",timeout:N})),U=C===0?"Onda 1":`Onda ${C+1}`,te=await T(U,B);if(te){let j=te.plan.durationMs||Date.now()-u,re=X.maskKey(te.usedKey);return a?.(`\u2705 ${j}ms via '${te.usedModel}' (${te.slotLabel}: ${re})`,"info"),te}C++}throw new Error(I||"Todas as tentativas falharam. Verifique suas chaves de API e cotas.")}var lo=[/\bfetch\b/i,/\bXMLHttpRequest\b/i,/\bWebSocket\b/i,/\b(?:localStorage|sessionStorage|indexedDB)\b/i,/\b(?:eval|Function|AsyncFunction|GeneratorFunction)\b/i,/\bimport(?:Scripts)?\b/i,/\bnavigator\s*\.\s*credentials\b/i,/\b(?:cookie|location\s*=|history\s*\.)/i,/\bwindow\s*\[\s*['"](?:fetch|eval|Function|localStorage|sessionStorage)/i];function de(o){let e=o?.engine||"smart",t=new Set(["dom","framework","keyboard","drag"]);return o?.autoAdvance&&t.add("navigation"),e==="javascript"&&t.add("javascript"),{engine:e,capabilities:t,maxAttemptsPerAction:e==="command"?1:2,maxActionMs:e==="command"?1500:3e3,allowJavaScript:e==="javascript",allowNavigation:!!o?.autoAdvance}}function Ze(o,e){if(o.t==="js"&&!e.allowJavaScript)throw new Error("A\xE7\xE3o JavaScript bloqueada pela engine atual. Use o motor JavaScript explicitamente.");if(o.t==="adv"&&!e.allowNavigation)throw new Error("Avan\xE7o autom\xE1tico bloqueado pela pol\xEDtica atual.")}function kt(o){if(!o.trim())throw new Error("JavaScript recusado: c\xF3digo vazio.");if(o.length>8e3)throw new Error("JavaScript recusado: c\xF3digo acima do limite operacional.");if(lo.find(t=>t.test(o)))throw new Error("JavaScript recusado: acesso externo, persist\xEAncia ou avalia\xE7\xE3o din\xE2mica n\xE3o permitidos.");if(!/^\s*(?:\/\/[^\n]*\n|\/\*[\s\S]*?\*\/|[\s\S])*\$eq\./.test(o)&&!o.includes("$eq."))throw new Error("JavaScript recusado: use somente a API declarativa $eq.")}var ge=['input:not([type="hidden"])',"textarea","select","button","a","label",'[role="button"]','[role="link"]','[role="radio"]','[role="checkbox"]','[role="option"]','[role="treeitem"]','[role="menuitemcheckbox"]','[role="menuitemradio"]','[contenteditable="true"]','[draggable="true"]',"[aria-grabbed]","[aria-dropeffect]","[data-widget-type]",".perseus-drag-item",".sortable-item",'[data-testid*="drag" i]','[data-testid*="card" i]','[data-testid*="option" i]','[data-testid*="choice" i]','[data-testid*="category" i]',"[data-choice]","[data-option]","[data-answer]","[data-value]",".quiz-option",".option-card",".choice-card",'[class*="option-card" i]','[class*="choice-card" i]','[class*="option-item" i]','[class*="choice-item" i]','[class*="answer-item" i]','[class*="alternative" i]','li[class*="choice" i]','li[class*="option" i]','li[class*="answer" i]','[data-role="dropzone"]',"[data-category]","[data-item-id]","[data-params][jsmodel]",'[class*="draggable-item" i]','[class*="drag-item" i]','[class*="sortable-card" i]','[class*="card-option" i]','[class*="tile" i][class*="option" i]'].join(","),Se=/(verificar|checar|check|conferir|validar|próxim[oa]|next|continuar|continue|avançar|prosseguir|enviar|submit|concluir|finalizar|terminar|começar|iniciar|start|vamos lá|próxima tarefa|next task|próxima pergunta|next question|marcar como concluíd[oa]|mostrar resumo|entendi|compreendi|ok|leitura concluída|seguir|ir para o exercício|fazer o teste|próximo artigo|ir para a aula)/i,oe=/(\banterior\b|\bvoltar\b|\bback\b|\bprev\b|\bprevious\b|recomeçar|\brestart\b|\breplay\b|\bretornar\b)/i,co=0;function et(o){try{let e=o.closest('[hidden], [style*="display: none"], [style*="display:none"], [aria-hidden="true"]');if(e&&!ne(e))return!1}catch{}try{let e=window.getComputedStyle?window.getComputedStyle(o):o.style;if(e&&(e.display==="none"||e.visibility==="hidden"))return!1}catch{}try{if(typeof o.getBoundingClientRect=="function"){let e=o.getBoundingClientRect();if(e.width>0||e.height>0)return!0}}catch{}return(o.textContent||"").trim().length>0}function V(o){try{if(typeof CSS<"u"&&typeof CSS.escape=="function")return CSS.escape(o)}catch{}return String(o).replace(/["\\]/g,"\\$&")}function L(o){let e=o;if(!e||typeof e.isConnected=="boolean"&&!e.isConnected||ne(e))return!1;let t=e.tagName?.toLowerCase();if(["input","select","textarea","button"].includes(t)){let a=e.type?.toLowerCase();if(a==="checkbox"||a==="radio"){if(e.id)try{let n=e.ownerDocument?.querySelector(`label[for="${V(e.id)}"]`);if(n&&et(n))return!0}catch{}let r=e.closest('label, .option-card, .quiz-option, .choice, .answer, [role="radio"], [role="checkbox"], [class*="option" i], [class*="choice" i], [class*="item" i], li, tr');if(r&&r!==e&&et(r))return!0}try{if(!e.closest('[hidden], [style*="display: none"], [style*="display:none"], [aria-hidden="true"]')){let n=window.getComputedStyle?window.getComputedStyle(e):e.style;if(!n||n.display!=="none"&&n.visibility!=="hidden"){if(typeof e.getBoundingClientRect=="function"){let l=e.getBoundingClientRect();if(l.width>0||l.height>0)return!0}return!0}}}catch{}}return et(e)}function uo(o){if(o==null)return"";if(typeof o=="string")return o;if(typeof o=="number"||typeof o=="boolean")return String(o);if(o instanceof Node)return o.textContent||"";try{if(typeof o?.toString=="function"){let e=o.toString();if(typeof e=="string")return e}}catch{}return""}function R(o,e=500){return uo(o).replace(/\s+/g," ").trim().slice(0,e)}function po(o){let e=o.dataset.easyquizId;if(e)return e;let t=`eq-${Date.now().toString(36)}-${(co+=1).toString(36)}`;return o.dataset.easyquizId=t,t}function ne(o){return o?!!(o.closest('#easyquiz-shadow-root, .eq-sidebar, .eq-launcher, [data-easyquiz-ignore="true"], .btn-inject-eq, #btn-inject-script')||o.getAttribute?.("data-easyquiz-ignore")==="true"):!1}var Ae=/(leaderboard|scoreboard|placar|ranking|trophy|pause|pausar|mute|mutar|audio|sound|som|música|music|configuraç|settings|theme|ajuda|help|report|denunciar|feedback|power-?up|streak|coins|fullscreen|full-screen|read-?aloud|audio-?player|(?:audio|sound|som|media)[-_ ]*volume|volume[-_ ]*(?:slider|control|level|btn|button|icon|mute)|vol-slider)/i;function O(o){if(!o||typeof o.getAttribute!="function"||typeof Element<"u"&&!(o instanceof Element))return!1;if(ne(o))return!0;let e=o.tagName?.toLowerCase();if(["select","textarea"].includes(e)||e==="input"&&!["button","submit","reset"].includes((o.type||"").toLowerCase()))return!1;let a=o.closest?.('button, a, [role="button"], [class*="leaderboard" i], [data-testid*="leaderboard" i], [class*="scoreboard" i], [class*="trophy" i]')||o,r=String(a.getAttribute?.("data-testid")||a.getAttribute?.("data-test-id")||a.getAttribute?.("id")||""),n=String(a.getAttribute?.("aria-label")||""),l=String(a.getAttribute?.("title")||""),s=typeof a.className=="string"?a.className:typeof a.className?.baseVal=="string"?a.className.baseVal:"",i=R(a.textContent,60);return!!(Ae.test(r)||Ae.test(n)||Ae.test(l)||Ae.test(s)||i.length>0&&i.length<=25&&Ae.test(i))}function Y(o){if(!o||typeof o.getAttribute!="function"||typeof Element<"u"&&!(o instanceof Element)||ne(o)||O(o)||o.closest?.('.option-card, .choice-card, .quiz-option, [class*="option-card" i], [class*="choice-card" i], [class*="option-item" i], [class*="choice-item" i], [class*="answer-item" i], [data-testid*="option" i], [data-testid*="choice" i], [data-choice], [data-option], [data-answer], [role="radio"], [role="checkbox"], [role="option"]')||o.closest?.("header, nav, aside"))return!1;let e=typeof HTMLInputElement<"u"&&o instanceof HTMLInputElement||typeof HTMLButtonElement<"u"&&o instanceof HTMLButtonElement?o.value:"",t=R(o.getAttribute?.("aria-label")||o.textContent||o.getAttribute?.("value")||e),a=o.type,r=t.replace(/[\d\(\)\[\]\u2192>\u2022\-\/\\]+/g," ").trim(),n=String(o.getAttribute?.("data-testid")||o.getAttribute?.("data-test-id")||o.getAttribute?.("id")||o.getAttribute?.("href")||"").toLowerCase();return oe.test(r)||oe.test(t)?!1:Se.test(r)||Se.test(t)||n.includes("next")||n.includes("check")||n.includes("continue")||n.includes("proximo")||n.includes("forward")?!0:/^\d{1,3}$/.test(t.trim())?!!o.closest?.('[class*="pagination" i], [class*="pager" i], [class*="page-nav" i], [class*="step-indicator" i], [class*="breadcrumb" i], [aria-label*="p\xE1gina" i], [aria-label*="page" i], [role="navigation"], nav, [class*="steps" i]'):!1}function tt(o){let e=o.closest("tr");if(e){let i=e.querySelector("th, td:first-child"),c=i&&i!==o.closest("td")?R(i.textContent,100):"",u=R(o.closest("label, td")?.textContent||"",50);if(c&&u)return`${c}: ${u}`}let t=o.closest('.dropdown-row, [class*="dropdown-row" i], [class*="select-row" i]');if(t){let i=t.querySelector('.dropdown-label, [class*="label" i]'),c=i&&i!==o?R(i.textContent,150):"";if(c)return c}let a=o.getAttribute("aria-label");if(a)return R(a);let r=o.getAttribute("aria-labelledby");if(r){let i=r.split(/\s+/).map(c=>document.getElementById(c)?.textContent).filter(Boolean).join(" ");if(i.trim())return R(i)}if("labels"in o&&o.labels){let i=Array.from(o.labels??[]).map(c=>c.textContent).join(" ");if(i.trim())return R(i)}let n=o.closest('.docssharedWizToggleLabeledContainer, [role="listitem"], .answer, label, .quiz-option, .form-check, .option-card');if(n&&n!==o){let i=R(n.textContent);if(i)return i}let l=o instanceof HTMLInputElement||o instanceof HTMLButtonElement?o.value:"",s=o.getAttribute("placeholder")||o.getAttribute("title")||o.textContent||l||"";return R(s)}function ot(o,e){let a=typeof HTMLSelectElement<"u"&&o instanceof HTMLSelectElement||o.tagName.toLowerCase()==="select"?o:null,r=o;o.dataset.easyquizRole=e;let n=o.tagName.toLowerCase(),l=["input","textarea","select","button"].includes(n)?n:"other",s=o.getAttribute("role")||"",i=(o.getAttribute("data-testid")||o.getAttribute("data-test-id")||"").toLowerCase(),c=(o.className&&typeof o.className=="string"?o.className:"").toLowerCase(),u=o.getAttribute("draggable")==="true"||o.classList.contains("perseus-drag-item")||o.classList.contains("sortable-item")||c.includes("cursor-grab")||!!o.getAttribute("aria-grabbed")||/drag|card|option|item/i.test(i)||/drag|card-item|sortable/i.test(c),h=o.getAttribute("data-role")==="dropzone"||o.classList.contains("category-container")||o.hasAttribute("data-category")||!!o.getAttribute("aria-dropeffect")||/drop|category|bucket/i.test(i)||/dropzone|category-box|bucket|target-zone/i.test(c),m=R((u?"draggable":h?"dropzone":"")||r.type||s||l,40),p="";if(r.type==="checkbox"||r.type==="radio"||s==="radio"||s==="checkbox"){let x=r.checked||o.getAttribute("aria-checked")==="true",T=r.value&&r.value!=="on"?r.value:o.getAttribute("data-value")||"";p=x?T?`checked:${T}`:"checked":T||"unchecked"}else if(l==="button"||n==="a"||e==="navigation"||Y(o))p="";else{let x=typeof o.value=="string"||typeof o.value=="number"?o.value:"";p=R(x||o.getAttribute("data-category")||"",2e3)}let b=[];if(a&&a.options)for(let x of Array.from(a.options).slice(0,80))b.push({value:R(x.value),label:R(x.textContent)});else if(s==="combobox"||s==="listbox"||c.includes("select")||c.includes("dropdown")){let x=o.getAttribute("aria-controls")||o.getAttribute("aria-owns"),T=x?document.getElementById(x):o;if(T){let w=T.querySelectorAll('[role="option"], li, .dropdown-item, .option');for(let E of Array.from(w).slice(0,80)){let C=R(E.textContent);C&&b.push({value:E.getAttribute("data-value")||E.getAttribute("value")||C,label:C})}}}let y=!!(r.required||o.getAttribute("aria-required")==="true"),g=!!(r.disabled||o.getAttribute("aria-disabled")==="true"),f=po(o);return{id:o.id||f,tag:l,type:m,label:tt(o),name:R(r.name||o.getAttribute("name")||"",180),value:p,options:b,required:y,disabled:g,role:e}}var It=['[data-test-id*="exercise" i]','[data-testid*="exercise" i]',".perseus-renderer",".framework-perseus",".Qr7Oae","[data-item-id]",".freebirdFormviewerViewItemsItemItem",".que",".question-holder",".quiz-question",".question_holder",".display_question",'[data-functional-selector*="question"]',".question-container",'[class*="classification-layout" i]','[class*="quiz-container" i]','[data-cy="quiz-container"]',"[data-question-id]",'[data-testid*="question" i]','[class*="question-container" i]','[class*="question" i]','[class*="pergunta" i]','[class*="categoriz" i]',"article","form","section","main"].join(",");function Ht(o){if(!L(o))return-1/0;let e=o.getBoundingClientRect(),t=Array.from(o.querySelectorAll(ge)).filter(L),a=R(o.innerText||o.textContent||"",4e3).length;if(a<10||!t.length&&a<60)return-1/0;let r=Math.max(1,window.innerWidth*window.innerHeight),n=Math.max(1,e.width*e.height),l=Math.min(1,n/r),s=e.top+e.height/2,i=Math.abs(s-window.innerHeight/2)/Math.max(1,window.innerHeight),c=a>40?35:0,u=e.top>=0&&e.bottom<=window.innerHeight?25:0;return t.length*15+Math.min(60,a/20)+c+u-l*20-i*10}function Oe(o){let e=o;if(e.matches?.('article, [data-test-id*="exercise" i], [data-testid*="exercise" i], .perseus-renderer, .framework-perseus, [class*="question-container" i], .que')&&e.tagName.toLowerCase()!=="main"&&e.tagName.toLowerCase()!=="body")return e;for(;e.parentElement&&e.parentElement!==document.body&&e.parentElement!==document.documentElement;){let t=e.parentElement,a=t.tagName.toLowerCase();if(["header","footer","nav","aside"].includes(a))break;if(t.matches?.('article, [data-test-id*="exercise" i], [data-testid*="exercise" i], .perseus-renderer, .framework-perseus, [class*="question-container" i], .que')&&a!=="main"&&a!=="body"){e=t;break}let r=R(e.innerText||e.textContent||"",1e4),n=R(t.innerText||t.textContent||"",1e4),l=e.querySelectorAll(ge).length,s=t.querySelectorAll(ge).length;if(r.length<150&&n.length>r.length&&s<=l+4&&a!=="main"&&a!=="body"){e=t;continue}break}return e}function $t(o){let e=o,t=e.closest('main, [role="main"], article, form, [data-test-id*="exercise" i], [data-testid*="exercise" i], .framework-perseus, section');if(t&&t!==document.body&&L(t))return t;let a=0;for(;e.parentElement&&e.parentElement!==document.body&&a<3;)e=e.parentElement,a++;return e||document.body}function F(){let o=document.querySelector('[class*="classification-layout" i], [class*="quiz-container" i][class*="classification" i]');if(o&&L(o))return o;let e=document.activeElement;if(e&&e!==document.body){let l=e.closest(It);if(l&&Ht(l)>0)return Oe(l)}let a=Array.from(document.querySelectorAll(It)).map(l=>({element:l,score:Ht(l)})).filter(l=>Number.isFinite(l.score)).sort((l,s)=>s.score-l.score),r=a.find(l=>{let s=l.element.tagName.toLowerCase();return s!=="main"&&s!=="body"&&l.score>0});if(r)return Oe(r.element);if(a.length>0&&a[0].score>0)return Oe(a[0].element);let n=document.querySelector('form, main, [role="main"]');return n&&L(n)?n:document.body}function zt(o){let e=o.cloneNode(!0);e.querySelectorAll("script, style, iframe, object, embed, svg, canvas, noscript, audio, video").forEach(a=>a.remove());let t=["type","name","value","role","aria-label","aria-labelledby","aria-checked","aria-required","required","disabled","data-easyquiz-id","draggable","class","id","data-widget-type","data-role","data-category","data-testid"];return e.querySelectorAll("*").forEach(a=>{for(let r of Array.from(a.attributes))t.includes(r.name)||a.removeAttribute(r.name)}),e.outerHTML.replace(/\s+/g," ").slice(0,2e4)}function Ne(o){let e=Array.from(o.querySelectorAll(ge)),t=new Set,a=[];for(let i of e){if(!L(i)||Y(i)||O(i))continue;let c=(i.value||i.textContent||"").trim();if(oe.test(c))continue;let u=i.tagName.toLowerCase();["input","textarea","select"].includes(u)&&(t.add(i),a.push(i))}for(let i of e){if(!L(i)||Y(i)||O(i))continue;let c=(i.value||i.textContent||"").trim();if(oe.test(c))continue;let u=i.tagName.toLowerCase();if(["input","textarea","select"].includes(u))continue;let h=i.querySelector("input, textarea, select");if(!(h&&t.has(h))){if(i.hasAttribute("for")){let d=i.getAttribute("for"),m=d?i.ownerDocument.getElementById(d):null;if(m&&t.has(m))continue}if(u==="a"){let d=i.getAttribute("role"),m=i.getAttribute("class")||"",p=i.getAttribute("data-testid")||"",b=i.getAttribute("draggable")==="true"||i.classList.contains("perseus-drag-item")||i.classList.contains("sortable-item")||m.includes("cursor-grab")||!!i.getAttribute("aria-grabbed")||/drag|card|option|item/i.test(p)||/drag|card-item|sortable/i.test(m);if(!(d==="button"||d==="radio"||d==="checkbox"||d==="option"||b||i.closest('[class*="choice" i], [class*="option" i], [class*="answer" i], [data-testid*="option" i]')))continue}a.push(i)}}let r=a.length>0&&a.every(i=>O(i)||/read-?aloud|audio/i.test(i.getAttribute("data-testid")||i.getAttribute("aria-label")||"")),n=document.body.querySelector('[class*="classification-layout" i]')||document.body.querySelector('[class*="classification" i]')||o,l=document.body.querySelector('[class*="classification" i]')!==null||o.querySelector('[class*="classification" i]')!==null||o.querySelector('[data-cy*="quiz" i]')!==null||o.querySelector('[class*="draggable-item" i]')!==null||o.querySelector('[class*="drag-item" i]')!==null||o.querySelector('[class*="sortable-card" i]')!==null||o.matches?.('[class*="classification" i]');if((a.length===0||r)&&l){r&&(a.length=0);let i=Array.from(n.querySelectorAll('[class*="cursor-grab"][id], [draggable="true"][id], .dnd-card[id]'));if(i.length>0){for(let c of i)if(!(!L(c)||O(c))&&(a.push(c),a.length>=50))break}else{let c=Array.from(n.querySelectorAll("button, div[class], span[class], p, li"));for(let u of c){if(!L(u)||Y(u)||O(u)||oe.test((u.textContent||"").trim()))continue;let h=(u.textContent||"").trim();if(h.length<2||h.length>300)continue;if(Array.from(u.children).some(m=>m.className&&m.textContent?.trim())||a.push(u),a.length>=50)break}}}let s=a.length>0&&a.every(i=>{let c=(i.textContent||"").trim();return!i.id||c.length<10||/^\d+\s*\/\s*\d+$/.test(c)||/^question text/i.test(c)});if(a.length===0||s){s&&(a.length=0);let i=Array.from(document.body.querySelectorAll('[class*="cursor-pointer"][id]'));if(i.length>0)for(let c of i){if(!L(c)||ne(c)||Y(c)||O(c)||oe.test((c.textContent||"").trim()))continue;let u=(c.textContent||"").trim();if(!(u.length<10||u.length>500)&&!/^\d+\s*\/\s*\d+$/.test(u)&&(a.push(c),a.length>=20))break}}return a.slice(0,100).map(i=>ot(i,"answer"))}function at(o){let e=[o,o.parentElement,o.parentElement?.parentElement,document.body].filter(Boolean),t=new Set,a=[];for(let r of e)for(let n of Array.from(r.querySelectorAll(ge)))if(!(t.has(n)||!L(n)||!Y(n)||O(n))&&(t.add(n),a.push(ot(n,"navigation")),a.length>=10))return a;return a}function Le(o=!1){let e=F();e=Oe(e),o&&(e=$t(e));let t=Ne(e),a=at(e);if(t.length===0){let s=Ne(document.body);s.length>0&&(e=$t(e),t=Ne(e),t.length===0&&(t=s,e=document.querySelector('main, article, form, [role="main"]')||document.body))}a.length===0&&(a=at(document.body));let r=e.innerText&&e.innerText.trim().length>0?e.innerText:e.textContent||"",n=r.length>4e4?R(r.slice(0,8e3),8e3)+`
[...conte\xFAdo extenso truncado...]
`+R(r.slice(-2e3),2e3):R(r,16e3),l=[...t,...a].slice(0,120);return!n||l.length===0&&n.length<30?R(document.body.innerText||document.body.textContent||"",16e3).length>=30?fe():null:{sourceUrl:window.location.href.slice(0,2e3),pageTitle:document.title.slice(0,500)||"P\xE1gina de Quest\xE3o",questionText:n,htmlSnippet:zt(e),controls:l,scope:e}}function fe(){let o=document.body.innerText||document.body.textContent||document.documentElement.textContent||"",e=R(o,16e3),t=Ne(document.body),a=at(document.body),r=[...t,...a].slice(0,120),n=document.querySelector('main, article, form, [role="main"], [data-test-id*="content" i], [class*="content" i]')||document.body;return{sourceUrl:window.location.href.slice(0,2e3),pageTitle:document.title.slice(0,500)||"P\xE1gina de Quest\xE3o",questionText:e,htmlSnippet:zt(n).slice(0,15e3),controls:r,scope:n}}function Pt(o){let e=o.controls.map(t=>`${t.role}:${t.id}:${t.type}`).join("|");return[window.location.href,o.pageTitle,o.questionText.slice(0,400),e].join("::")}function P(o){return o?!!(o.closest('#easyquiz-shadow-root, .eq-sidebar, .eq-launcher, [data-easyquiz-ignore="true"], .btn-inject-eq, #btn-inject-script')||o.getAttribute?.("data-easyquiz-ignore")==="true"):!1}function q(o){return o==null?"":(typeof o=="string"?o:String(o)).replace(/^(\([0-9a-zA-Z]{1,2}\)|[0-9]{1,3}|[a-zA-Z])[\.\)\-\:]\s+/,"").replace(/[\.\u2026]{2,}/g," ").replace(/['"“”«»]/g,"").replace(/\s+/g," ").trim()}function G(o){if(!o||o instanceof HTMLInputElement||o instanceof HTMLSelectElement||o instanceof HTMLTextAreaElement||o.getAttribute("draggable")==="true"||o.classList.contains("dnd-card")||o.hasAttribute("data-category")||o.hasAttribute("data-dropzone"))return o;if(o.hasAttribute("for")){let a=o.getAttribute("for");if(a){let r=o.ownerDocument.getElementById(a);if(r)return r}}let e=o.closest('label, .option-card, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, td, li, .dnd-card, [class*="option-card" i], [class*="choice-card" i], .dropdown-row, [class*="dropdown" i], [class*="select-row" i]');if(e&&!["article","section","main","form","body"].includes(e.tagName.toLowerCase())){let a=e.getAttribute("for"),n=(a?e.ownerDocument.getElementById(a):null)||e.querySelector('input:not([type="hidden"]), select, textarea');return n||e}let t=o.closest('button, a, [role="button"], [draggable="true"]');if(t)return t;if(["body","html","main","section","article","form"].includes(o.tagName.toLowerCase())){let a=o.querySelector('button, [role="button"], a, input:not([type="hidden"]), select, textarea, [role="radio"], [role="checkbox"], .option-card, label');if(a)return G(a)}return o}function Rt(o){let e=o;if(!e||!document.contains(e))try{e=F()}catch{}e=e||document.body;let t=r=>{let n=Array.from(r.querySelectorAll("tr")).filter(u=>L(u)&&u.querySelector('input[type="radio"], input[type="checkbox"]'));if(n.length>1)return n;let l=Array.from(r.querySelectorAll('input[type="checkbox"], input[type="radio"], [role="checkbox"], [role="radio"]')).filter(u=>L(u)&&!P(u));if(l.length>0)return l;let i=Array.from(r.querySelectorAll('.option-card, [role="option"], [class*="choice-card" i], [class*="option-card" i], li[class*="choice" i], li[class*="option" i]')).filter(u=>L(u)&&!P(u)).filter(u=>!u.parentElement?.closest('.option-card, [role="option"], [class*="choice-card" i], [class*="option-card" i]'));return i.length>0?i:Array.from(r.querySelectorAll('[class*="classification" i] [class], [class*="draggable-item" i], [class*="drag-item" i], [class*="sortable-card" i]')).filter(u=>{let h=u;return L(h)&&!P(h)&&(h.textContent||"").trim().length>2&&!Y(h)&&!O(h)&&!h.querySelector("[class]")})},a=t(e);return a.length>0?a:e!==document.body?t(document.body):[]}function H(o,e,t=!1){if(o==null)return null;let r=(typeof o=="string"?o:String(o)).trim().replace(/^["'“”«»]+|["'“”«»]+$/g,"");if(!r)return null;let n=V(r),l=document.querySelector(`[data-easyquiz-id="${n}"]`);if(l&&!P(l))return G(l);try{let d=document.getElementById(r);if(d&&L(d)&&!P(d))return d.hasAttribute("data-category")||d.hasAttribute("data-dropzone")||d.classList.contains("dnd-zone")?d:G(d)}catch{}try{let d=document.querySelector(`[data-item-id="${n}"]`);if(d&&L(d)&&!P(d))return G(d)}catch{}let s=r.match(/^(?:item|opção|opcao|afirmação|afirmacao|alternativa|linha|afirmativa|questão|questao|campo|blank|lacuna|input|resposta)?\s*#?_?([0-9]+)$/i);if(s){let d=parseInt(s[1],10);if(t){let p=document.body;try{p=F()||document.body}catch{}let b=Array.from(p.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, select, [contenteditable="true"]')).filter(y=>L(y)&&!P(y));if(d>=1&&d-1<b.length)return b[d-1];if(d===0&&b.length>0)return b[0]}let m=d-1;if(m>=0){let p=Rt();if(m<p.length){let g=p[m];if(g.tagName.toLowerCase()==="tr"){if(e){let v=g.querySelector(`input[value="${V(e)}" i], [data-value="${V(e)}" i]`);if(v)return v}let f=g.querySelector("input");if(f)return f}return G(g)}let b=document.body;try{b=F()||document.body}catch{}let y=Array.from(b.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, select, [contenteditable="true"]')).filter(g=>L(g)&&!P(g));if(m<y.length)return y[m]}}let i=r.match(/^(?:item|opção|opcao|afirmação|afirmacao|alternativa|linha|afirmativa|questão|questao)?\s*#?([a-eA-E])$/i);if(i){let d=i[1].toUpperCase().charCodeAt(0)-65;if(d>=0){let m=Rt();if(d<m.length){let p=m[d];if(p.tagName.toLowerCase()==="tr"){if(e){let y=p.querySelector(`input[value="${V(e)}" i], [data-value="${V(e)}" i]`);if(y)return y}let b=p.querySelector("input");if(b)return b}return G(p)}}}if(/^[a-zA-Z0-9_-]{1,10}$/.test(r)){let m=Array.from(document.querySelectorAll(`[data-category="${n}" i], [data-dropzone="${n}" i], [data-role="dropzone"][data-category="${n}" i]`)).find(g=>L(g)&&!P(g));if(m)return m;let b=Array.from(document.querySelectorAll(`input[value="${n}" i], [data-value="${n}" i], input[id="${n}" i], input[placeholder="${n}" i], textarea[placeholder="${n}" i], [title="${n}" i]`)).find(g=>L(g)&&!P(g));if(b)return G(b);let y=Array.from(document.querySelectorAll('.option-badge, [class*="badge" i], [class*="letter" i], .option-card span, label span')).find(g=>{if(!L(g)||P(g))return!1;let f=q(g.textContent).toLowerCase();return f===r.toLowerCase()||f===r.toLowerCase()+")"});if(y)return G(y)}try{let m=Array.from(document.querySelectorAll(`[name="${n}"], [value="${n}"], [placeholder="${n}" i], [title="${n}" i], [data-category="${n}" i], [data-dropzone="${n}" i], [data-testid="${n}" i], [data-test-id="${n}" i], [aria-label="${n}" i]`)).find(p=>L(p)&&!P(p));if(m)return m.hasAttribute("data-category")||m.hasAttribute("data-dropzone")||m.classList.contains("dnd-zone")?m:G(m)}catch{}if(/^[.#\[]|\s|[>+~:]/.test(r))try{let m=Array.from(document.querySelectorAll(r)).find(p=>L(p)&&!P(p));if(m)return G(m)}catch{}try{let d=r.replace(/"/g,""),m=`//button[normalize-space(.)="${d}"] | //a[normalize-space(.)="${d}"] | //*[not(*) and normalize-space(.)="${d}"] | //*[@aria-label="${d}"] | //*[@data-category="${d}"] | //*[@data-testid="${d}"]`,p=document.evaluate(m,document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);for(let b=0;b<p.snapshotLength;b++){let y=p.snapshotItem(b);if(y&&L(y)&&!P(y)){if(["body","html"].includes(y.tagName.toLowerCase())){let f=y.querySelector('button, [role="button"], a, input, [role="radio"], [role="checkbox"], label');if(f&&L(f))return G(f)}return y.closest('[data-role="dropzone"], [class*="category" i], [class*="bucket" i], [class*="column" i], [class*="drop" i]')||G(y)}}}catch{}let u=q(r).toLowerCase(),h=Array.from(document.querySelectorAll('button, a, div, span, li, p, label, input, textarea, select, [draggable="true"], [data-testid], [class*="option" i], [class*="card" i], [class*="item" i], [class*="choice" i], [class*="category" i], [class*="bucket" i]'));for(let d of h){if(!L(d)||P(d)||d.closest("header, nav, .stepper, .step-item, .progress-bar-container")||O(d)||!!(d.matches('article, section, form, main, [class*="container" i], [class*="grid" i], .dnd-pool, .dnd-zones')||d.querySelector('label, [role="radio"], [role="checkbox"], .dnd-card, [draggable="true"], .option-card, tr'))&&!d.matches(".dnd-zone, [data-category], [data-dropzone]"))continue;let p=q(d.textContent).toLowerCase(),b=q(d.getAttribute("aria-label")||"").toLowerCase(),y=q(d.getAttribute("placeholder")||"").toLowerCase(),g=q(d.getAttribute("title")||"").toLowerCase(),f=q(d.getAttribute("name")||"").toLowerCase(),v=q(d.getAttribute("data-category")||"").toLowerCase(),x=d instanceof HTMLInputElement||d instanceof HTMLButtonElement?d.value:"",T=q(x).toLowerCase(),w=p.startsWith(u+")")||p.startsWith(u+".")||p.startsWith(u+" -")||p.startsWith(u+":");if(p===u||b===u||y===u||g===u||f===u||v&&v===u||T&&T===u||w)return d.closest('[data-role="dropzone"], [class*="category" i], [class*="bucket" i], [class*="column" i], [class*="drop" i]')||G(d)}if(u.length>=3)for(let d of h){if(!L(d)||P(d)||d.closest("header, nav, .stepper, .step-item, .progress-bar-container")||O(d)||!!(d.matches('article, section, form, main, [class*="container" i], [class*="grid" i], .dnd-pool, .dnd-zones')||d.querySelector('label, [role="radio"], [role="checkbox"], .dnd-card, [draggable="true"], .option-card, tr'))&&!d.matches(".dnd-zone, [data-category], [data-dropzone]"))continue;let p=q(d.textContent).toLowerCase(),b=q(d.getAttribute("aria-label")||"").toLowerCase(),y=q(d.getAttribute("placeholder")||"").toLowerCase(),g=q(d.getAttribute("title")||"").toLowerCase(),f=q(d.getAttribute("name")||"").toLowerCase();if(p.includes(u)||b.includes(u)||y.includes(u)||g.includes(u)||f.includes(u)){if(Array.from(d.children).some(w=>{let E=q(w.textContent).toLowerCase();return E&&E.includes(u)}))continue;return d.closest('[data-role="dropzone"], [class*="category" i], [class*="bucket" i], [class*="column" i], [class*="drop" i]')||G(d)}let v=u.split(/\s+/).filter(Boolean);if(v.length>=3){let x=v.slice(0,Math.min(5,v.length)).join(" ");if(p.includes(x)||b.includes(x)||y.includes(x))return G(d)}}return null}function Nt(o,e){for(let t of e)o.dispatchEvent(new Event(t,{bubbles:!0,composed:!0}))}function ee(o,e){if(!o)return;try{o.scrollIntoView({block:"nearest",inline:"nearest",behavior:"instant"})}catch{}try{o.focus?.()}catch{}let t=o.getBoundingClientRect(),a=e?e[0]:Math.round(t.left+Math.max(1,t.width/2)),r=e?e[1]:Math.round(t.top+Math.max(1,t.height/2)),n={bubbles:!0,cancelable:!0,composed:!0,view:window,clientX:a,clientY:r};try{o.dispatchEvent(new PointerEvent("pointerover",{...n}))}catch{}try{o.dispatchEvent(new MouseEvent("mouseover",{...n}))}catch{}try{o.dispatchEvent(new PointerEvent("pointerdown",{...n,button:0,buttons:1}))}catch{}try{o.dispatchEvent(new MouseEvent("mousedown",{...n,button:0,buttons:1}))}catch{}try{o.dispatchEvent(new PointerEvent("pointerup",{...n,button:0,buttons:0}))}catch{}try{o.dispatchEvent(new MouseEvent("mouseup",{...n,button:0,buttons:0}))}catch{}try{o.dispatchEvent(new MouseEvent("click",{...n,button:0,buttons:0}))}catch{}try{o.click()}catch{}try{let l=Object.keys(o).find(s=>s.startsWith("__reactFiber")||s.startsWith("__reactInternalInstance"));if(l){let s=o[l];for(;s;){let i=s.memoizedProps||s.pendingProps;if(i?.onClick){i.onClick({type:"click",target:o,currentTarget:o,bubbles:!0,cancelable:!0,preventDefault:()=>{},stopPropagation:()=>{}});break}s=s.return}}}catch{}try{let l=Object.keys(o).find(s=>s.startsWith("__reactProps"));if(l){let s=o[l];s?.onClick&&s.onClick({type:"click",target:o,currentTarget:o,bubbles:!0,cancelable:!0,preventDefault:()=>{},stopPropagation:()=>{}})}}catch{}try{let l=o._vei;l?.onClick&&(Array.isArray(l.onClick.value)?l.onClick.value:[l.onClick.value]).forEach(i=>{try{i({type:"click",target:o})}catch{}})}catch{}try{o.$onclick&&o.$onclick({type:"click",target:o,preventDefault:()=>{},stopPropagation:()=>{}})}catch{}try{if(!!(document.querySelector('meta[content*="google.com/forms"], form[action*="formResponse"]')||o.closest("[data-item-id], [jsmodel], [jsaction], .freebirdFormviewerComponentsQuestionBaseRoot"))){let s=o.querySelector('input[type="radio"], input[type="checkbox"]');s&&(s.focus?.(),s.click(),Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"checked")?.set?.call(s,!0),s.dispatchEvent(new Event("change",{bubbles:!0})));let i=o.closest("[jsaction]");if(i&&i!==o)try{i.dispatchEvent(new MouseEvent("click",{bubbles:!0,cancelable:!0,view:window,clientX:a,clientY:r}))}catch{}}}catch{}if(o.getAttribute("role")==="button"||o.getAttribute("tabindex")!==null)try{o.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0,cancelable:!0})),o.dispatchEvent(new KeyboardEvent("keyup",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0,cancelable:!0}))}catch{}}function De(o,e){let t=o;if(t.hasAttribute("for")){let c=t.getAttribute("for"),u=t.ownerDocument.getElementById(c);u&&(t=u)}if(typeof HTMLSelectElement<"u"&&t instanceof HTMLSelectElement||t.tagName?.toLowerCase()==="select"||t.getAttribute("role")==="combobox"||t.getAttribute("role")==="listbox"||t.matches?.('[role="combobox"], [role="listbox"], [class*="select" i], [class*="dropdown" i]')){Be(t,[e]);return}let r=t.querySelector('select, [role="combobox"], [role="listbox"]');if(r){Be(r,[e]);return}if(!(t instanceof HTMLInputElement)&&!(t instanceof HTMLTextAreaElement)&&!(t instanceof HTMLSelectElement)&&!t.isContentEditable){let c=t.querySelector('input:not([type="hidden"]), textarea, select, [contenteditable="true"]');if(c)t=c;else{let h=t.closest('.form-group, .field, [class*="input" i], [class*="control" i], label, tr, td, li, p, div')?.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, select, [contenteditable="true"]');if(h)t=h;else{let d=t.nextElementSibling;for(;d;){if(d instanceof HTMLInputElement&&!["hidden","button","submit","checkbox","radio"].includes(d.type)||d instanceof HTMLTextAreaElement||d instanceof HTMLElement&&d.isContentEditable){t=d;break}let m=d.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(m){t=m;break}d=d.nextElementSibling}}}}if(t instanceof HTMLButtonElement||t.tagName.toLowerCase()==="a"||t.getAttribute("role")==="button"||t instanceof HTMLInputElement&&["button","submit","reset","image"].includes(t.type)){let c=t.parentElement?.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(c)t=c;else{let u=document.body;try{u=F()||document.body}catch{}let h=u.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(h)t=h;else{console.warn("[EasyQuiz] setNativeValue: Nenhum campo de texto encontrado para receber o valor.");return}}}if(!(t instanceof HTMLInputElement)&&!(t instanceof HTMLTextAreaElement)&&!(t instanceof HTMLSelectElement)&&!t.isContentEditable){let c=document.body;try{c=F()||document.body}catch{}let u=c.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(u)t=u;else{console.warn("[EasyQuiz] setNativeValue: Nenhum campo de texto encontrado para receber o valor.");return}}if(t instanceof HTMLInputElement&&["checkbox","radio"].includes(t.type)){let c=["true","1","checked","yes","sim"].includes(e.toLowerCase())||e===t.value;ie(t,c);return}let l=String(e??""),s=l;if(t instanceof HTMLInputElement&&t.type==="number"){let c=l.replace(",",".").replace(/[^0-9.-]/g,"");c&&!isNaN(Number(c))&&(s=c)}try{t.scrollIntoView?.({block:"center",inline:"center",behavior:"instant"}),t.focus?.()}catch{}let i=!1;try{if(t instanceof HTMLInputElement||t instanceof HTMLTextAreaElement){if(t.type!=="number"&&t.type!=="range"){try{t.select?.()}catch{}i=document.execCommand?.("insertText",!1,s)||!1}}else if(t.isContentEditable){try{document.execCommand?.("selectAll",!1,void 0)}catch{}i=document.execCommand?.("insertText",!1,s)||!1}}catch{}if(t instanceof HTMLInputElement||t instanceof HTMLTextAreaElement){try{let h=t._valueTracker;h&&h.setValue(s===""?" ":"")}catch{}let c=t instanceof HTMLTextAreaElement?HTMLTextAreaElement.prototype:HTMLInputElement.prototype,u=Object.getOwnPropertyDescriptor(c,"value")?.set;u?u.call(t,s):t.value=s;try{t.dispatchEvent(new KeyboardEvent("keydown",{bubbles:!0,cancelable:!0,key:s.slice(-1)||"a"}))}catch{}try{t.dispatchEvent(new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,composed:!0,data:s,inputType:"insertText"}))}catch{}try{t.dispatchEvent(new InputEvent("input",{bubbles:!0,cancelable:!0,composed:!0,data:s,inputType:"insertText"}))}catch{t.dispatchEvent(new Event("input",{bubbles:!0,cancelable:!0,composed:!0}))}try{t.dispatchEvent(new KeyboardEvent("keyup",{bubbles:!0,cancelable:!0,key:s.slice(-1)||"a"}))}catch{}try{t.dispatchEvent(new Event("change",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}try{t.dispatchEvent(new FocusEvent("blur",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}if(t.value!==s&&!(t instanceof HTMLInputElement&&t.type==="number"&&Number(t.value)===Number(s))){t.value=s;try{u?.call(t,s)}catch{}}return}if(t.isContentEditable){if(t.textContent?.trim()!==s.trim()){t.textContent=s;try{t.innerText=s}catch{}}try{t.dispatchEvent(new InputEvent("input",{bubbles:!0,cancelable:!0,composed:!0,data:s,inputType:"insertText"}))}catch{t.dispatchEvent(new Event("input",{bubbles:!0,cancelable:!0,composed:!0}))}try{t.dispatchEvent(new Event("change",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}try{t.dispatchEvent(new FocusEvent("blur",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}return}try{"value"in t&&(t.value=s),t.dispatchEvent(new Event("input",{bubbles:!0,cancelable:!0,composed:!0})),t.dispatchEvent(new Event("change",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}}function Me(o,e=""){if(o==null)return e;let t=typeof o=="string"?o:String(o);if(!t)return e;let a=/^(eq-|#|\$|\.|input_|mat-|choice_|radio_|chk_)/i.test(t),r=q(t),n=H(t)||H(r);if(!n)return a?e:r||e;let l=n.closest('label, .option-card, [class*="choice" i], [class*="option" i], .quiz-option, tr, td, li');if(l){let h=q(l.textContent);if(h&&h.length>0&&h.length<150)return h}if(n.id){let h=document.querySelector(`label[for="${V(n.id)}"]`);if(h){let d=q(h.textContent);if(d&&d.length>0&&d.length<150)return d}}let s=n.getAttribute("aria-label");if(s)return q(s);let i=n.getAttribute("placeholder");if(i)return q(i);let c=q(n.textContent);if(c&&c.length>0&&c.length<120)return c;let u=n instanceof HTMLInputElement||n instanceof HTMLButtonElement?n.value:"";return u?q(u):a?e:r||e}function ie(o,e){if(!o)return;let t=o.closest('label, td, .option-card, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, [class*="option" i], [class*="choice" i], li')||o,a=o instanceof HTMLInputElement&&["checkbox","radio"].includes(o.type)?o:t.querySelector('input[type="checkbox"], input[type="radio"]');!a&&t.hasAttribute("for")&&(a=t.ownerDocument.getElementById(t.getAttribute("for")));let r=o instanceof HTMLInputElement?o.closest("label")||(o.id?t.ownerDocument.getElementById(t.getAttribute("for")):null)||o:t&&L(t)?t:o;if(a){let n=a.type==="radio",l=a.type==="checkbox",s=!!a._valueTracker;if(a.checked===e){if(n&&e){t.setAttribute("aria-checked","true"),t.setAttribute("aria-selected","true"),t.classList.add("selected","active","checked");return}if(l){t.setAttribute("aria-checked",e?"true":"false"),t.setAttribute("aria-selected",e?"true":"false"),t.classList.toggle("selected",e),t.classList.toggle("active",e),t.classList.toggle("checked",e);return}}r&&r!==a&&ee(r);try{a.focus?.(),a.click()}catch{}if(a.checked!==e){try{let c=a._valueTracker;c&&c.setValue(!e)}catch{}try{Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"checked")?.set?.call(a,e)}catch{}a.checked=e,Nt(a,["input","change"])}t.setAttribute("aria-checked",e?"true":"false"),t.setAttribute("aria-selected",e?"true":"false"),t.classList.toggle("selected",e),t.classList.toggle("active",e),t.classList.toggle("checked",e)}else{if((t.getAttribute("aria-checked")==="true"||t.getAttribute("aria-selected")==="true"||t.getAttribute("data-selected")==="true"||t.getAttribute("data-checked")==="true"||t.classList.contains("selected")||t.classList.contains("active")||t.classList.contains("checked"))===e&&e)return;ee(r),t.setAttribute("aria-checked",e?"true":"false"),t.setAttribute("aria-selected",e?"true":"false"),t.classList.toggle("selected",e),t.classList.toggle("active",e),t.classList.toggle("checked",e)}}function Be(o,e){let t=typeof HTMLSelectElement<"u"&&o instanceof HTMLSelectElement||o.tagName?.toLowerCase()==="select"?o:o.querySelector("select");if(t){let l=e.map(c=>q(c).toLowerCase()),s=!1,i=(c,u)=>{c.selected=!0,t.selectedIndex=u;try{t.value=c.value}catch{}try{Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype,"value")?.set?.call(t,c.value)}catch{}try{let h=t._valueTracker;h&&h.setValue(c.value)}catch{}s=!0};for(let c=0;c<t.options.length;c++){let u=t.options[c],h=u.value.toLowerCase(),d=q(u.textContent).toLowerCase();if(l.some(p=>p===h||p===d)){if(i(u,c),!t.multiple)break}else t.multiple||(u.selected=!1)}if(!s)for(let c of l){let u=c.match(/^(?:item|opção|opcao|alternativa|linha|escolha|campo)?\s*#?_?([0-9]+)$/i);if(u){let h=parseInt(u[1],10),m=t.options[0]?.value===""||t.options[0]?.disabled?h:h>=1?h-1:0;if(m>=0&&m<t.options.length&&(i(t.options[m],m),!t.multiple))break}}if(!s){for(let c of l)if(/^[a-z]$/i.test(c)){let u=c.toUpperCase().charCodeAt(0)-65,d=t.options[0]?.value===""||t.options[0]?.disabled?u+1:u;if(d>=0&&d<t.options.length&&(i(t.options[d],d),!t.multiple))break}}if(!s){let c=u=>u.normalize("NFD").replace(/[\u0300-\u036f]/g,"");for(let u=0;u<t.options.length;u++){let h=t.options[u],d=c(h.value.toLowerCase()),m=c(q(h.textContent).toLowerCase());if(l.some(b=>{let y=c(b);return d.includes(y)||m.includes(y)||y.length>2&&(y.includes(d)||y.includes(m))})&&(i(h,u),!t.multiple))break}}if(s){Nt(t,["focus","input","change","blur"]);return}}let a=o.matches?.('[role="combobox"], [role="listbox"], [class*="select" i], [class*="dropdown" i]')?o:o.closest('[role="combobox"], [role="listbox"], [class*="select" i], [class*="dropdown" i]');a&&ee(a);let r=e.map(l=>q(l).toLowerCase()),n=Array.from(document.querySelectorAll('[role="listbox"] [role="option"], [role="menu"] [role="menuitem"], .select-dropdown li, .dropdown-menu .dropdown-item, .ant-select-item-option, .MuiMenuItem-root, [class*="option-item"], li[data-value]')).filter(l=>L(l)&&!P(l));for(let l of r){let s=n.find(c=>{let u=q(c.textContent).toLowerCase(),h=q(c.getAttribute("data-value")||c.getAttribute("value")||"").toLowerCase();return u===l||h===l||u.includes(l)||l.length>2&&l.includes(u)});if(s){ee(s);let c=s.querySelector('input[type="radio"], input[type="checkbox"]');c&&ie(c,!0);return}let i=H(l);if(i){ee(i);return}}}function mo(o,e){try{let t=new DataTransfer;try{t.setData("text/plain",o)}catch{}try{t.setData("text/html",e)}catch{}return t}catch{return null}}function nt(o){try{o.click()}catch{let e=o.ownerDocument.defaultView||window;o.dispatchEvent(new e.MouseEvent("click",{bubbles:!0,cancelable:!0,composed:!0,view:e}))}}function ho(o,e){try{if(e.contains(o))return{success:!0,evidence:"origin is child of dest (DOM move confirmed)"};let t=o.parentElement,a=e.parentElement;if(t&&a&&t!==a&&!document.body.contains(o))return{success:!0,evidence:"origin removed from DOM (consumed by framework)"};if([o.getAttribute("data-placed")==="true",o.getAttribute("data-assigned")==="true",o.getAttribute("data-matched")==="true",o.getAttribute("aria-grabbed")==="false",/placed|dropped|assigned|matched|done|sorted|categorized/i.test(o.className||"")].some(Boolean))return{success:!0,evidence:"origin has placement indicator: class/attr"};let n=(o.textContent||"").trim().toLowerCase();if(n.length>2&&Array.from(e.querySelectorAll("*")).some(u=>u!==e&&(u.textContent||"").trim().toLowerCase()===n))return{success:!0,evidence:"origin text found inside dest children"};let l=e.getAttribute("aria-label")||e.getAttribute("data-category")||"",s=o.getAttribute("aria-label")||o.getAttribute("data-category")||"";return l&&s&&e.getAttribute("data-count")?{success:!0,evidence:"dest data-count changed, categorization likely succeeded"}:{success:!1,evidence:"no DOM evidence of successful drag/categorization"}}catch{return{success:!1,evidence:"verification threw exception"}}}function Z(o,e){let t=q(o).toLowerCase();if(!t)return null;if(e==="source"){if(/^[0-9a-f]{10,}$/.test(o.trim())){let s=document.getElementById(o.trim());if(s&&L(s)&&!P(s))return s}let l=['[class*="cursor-grab"][id]',".dnd-card",'[draggable="true"]'];for(let s of l){let c=Array.from(document.querySelectorAll(s)).find(u=>{if(!L(u)||P(u))return!1;let h=q(`${u.id} ${u.textContent||""} ${u.getAttribute("data-id")||""}`).toLowerCase();return h===t||h.includes(t)||u.id===o.trim()});if(c)return c}return null}let a=["[data-dropzone]","[data-category]",'[data-role="dropzone"]','[class*="dropzone" i]','[class*="list-group" i]','[class*="classification-group" i]'].join(","),r=Array.from(document.querySelectorAll(a)),n=r.find(l=>[l.getAttribute("data-category"),l.getAttribute("data-dropzone")].some(s=>s?.trim().toLowerCase()===t));return n&&L(n)&&!P(n)?n:r.find(l=>{if(!L(l)||P(l)||/unclassified/i.test(l.className))return!1;let s=l.querySelector('.font-bold, h1, h2, h3, h4, [class*="header" i], [class*="title" i], [class*="label" i]'),i=q(s?.textContent||l.textContent||"").toLowerCase();return i.includes("op")&&(i.includes("es")||i.includes("\xF5es"))?!1:i===t||i.startsWith(t)||i.includes(t)})||null}async function Ve(o,e,t=1){try{o.scrollIntoView({block:"center",inline:"center",behavior:"instant"})}catch{}let a=o.getBoundingClientRect(),r=e.getBoundingClientRect(),n=Math.round(a.left+Math.max(1,a.width/2)),l=Math.round(a.top+Math.max(1,a.height/2)),s=Math.round(r.left+Math.max(1,r.width/2)),i=Math.round(r.top+Math.max(1,r.height/2)),c=q(e.textContent).toLowerCase();if(c){let b=Array.from(o.querySelectorAll('button, [role="button"], input[type="radio"], input[type="checkbox"], option, .btn, [class*="tag" i]')).find(y=>{let g=q(y.textContent).toLowerCase(),f=y instanceof HTMLInputElement||y instanceof HTMLOptionElement?q(y.value).toLowerCase():"";return g&&(c.includes(g)||g.includes(c))||f&&(c.includes(f)||f.includes(c))});b&&(ee(b),await new Promise(y=>setTimeout(y,120)))}nt(o),await new Promise(p=>setTimeout(p,140)),nt(e);let u=e.querySelector('[data-role="dropzone"], [class*="bucket" i], [class*="slot" i], [class*="drop" i], [class*="target" i], [class*="items" i], ul, ol');if(u&&u!==e&&nt(u),await new Promise(p=>setTimeout(p,100)),!e.contains(o)&&o.matches('.dnd-card, [draggable="true"]')&&e.matches('.dnd-zone, [data-dropzone], [data-role="dropzone"]')&&e.appendChild(o),e.contains(o)&&o.matches('.dnd-card, [draggable="true"]'))return;let h={bubbles:!0,cancelable:!0,composed:!0,view:window,clientX:n,clientY:l,screenX:n,screenY:l,button:0,buttons:1};try{o.dispatchEvent(new PointerEvent("pointerdown",{...h,isPrimary:!0,pointerId:1,pointerType:"mouse",pressure:.5}))}catch{}o.dispatchEvent(new MouseEvent("mousedown",h));let d=4;for(let p=1;p<=d;p++){let b=Math.round(n+(s-n)*(p/d)),y=Math.round(l+(i-l)*(p/d)),g={...h,clientX:b,clientY:y,screenX:b,screenY:y};try{o.dispatchEvent(new PointerEvent("pointermove",{...g,isPrimary:!0,pointerId:1,pointerType:"mouse",pressure:.5}))}catch{}document.dispatchEvent(new MouseEvent("mousemove",g))}let m={bubbles:!0,cancelable:!0,composed:!0,view:window,clientX:s,clientY:i,screenX:s,screenY:i,button:0,buttons:0};try{e.dispatchEvent(new PointerEvent("pointerup",{...m,isPrimary:!0,pointerId:1,pointerType:"mouse",pressure:0}))}catch{}e.dispatchEvent(new MouseEvent("mouseup",m)),e.dispatchEvent(new MouseEvent("click",m));try{let p=mo(R(o.textContent),o.outerHTML),b={...h},y={...m};p&&(b.dataTransfer=p,y.dataTransfer=p);let g=o.ownerDocument.defaultView?.DragEvent;if(!g)throw new Error("DragEvent n\xE3o dispon\xEDvel neste documento");o.dispatchEvent(new g("dragstart",b)),e.dispatchEvent(new g("dragenter",y)),e.dispatchEvent(new g("dragover",y)),e.dispatchEvent(new g("drop",y)),o.dispatchEvent(new g("dragend",b))}catch(p){console.warn("[EasyQuiz] DragEvent ignorado com seguran\xE7a:",p)}try{let p=new Touch({identifier:1,target:o,clientX:n,clientY:l}),b=new Touch({identifier:1,target:e,clientX:s,clientY:i});o.dispatchEvent(new TouchEvent("touchstart",{bubbles:!0,cancelable:!0,touches:[p]})),e.dispatchEvent(new TouchEvent("touchmove",{bubbles:!0,cancelable:!0,touches:[b]})),e.dispatchEvent(new TouchEvent("touchend",{bubbles:!0,cancelable:!0,touches:[]}))}catch{}if(t>=2&&!e.contains(o))try{o.focus?.(),o.dispatchEvent(new KeyboardEvent("keydown",{key:" ",code:"Space",bubbles:!0})),o.dispatchEvent(new KeyboardEvent("keyup",{key:" ",code:"Space",bubbles:!0})),await new Promise(p=>setTimeout(p,80)),e.focus?.(),e.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",bubbles:!0})),e.dispatchEvent(new KeyboardEvent("keyup",{key:"Enter",code:"Enter",bubbles:!0}))}catch{}if(!e.contains(o))try{let p=g=>{let f=Object.keys(g).find(x=>x.startsWith("__reactFiber")||x.startsWith("__reactInternalInstance"));if(!f)return null;let v=g[f];for(let x=0;x<10&&v;x++){if(v.memoizedProps)return v.memoizedProps;v=v.return}return null},b=p(o),y=p(e);if(b){let g=b.onMouseDown||b.onPointerDown||b.onDragStart;if(typeof g=="function")try{g({type:"mousedown",button:0,buttons:1,clientX:n,clientY:l,bubbles:!0,preventDefault:()=>{},stopPropagation:()=>{},currentTarget:o,target:o}),await new Promise(f=>setTimeout(f,100))}catch{}}if(y){let g=y.onMouseUp||y.onPointerUp||y.onDrop;if(typeof g=="function")try{g({type:"mouseup",button:0,buttons:0,clientX:s,clientY:i,bubbles:!0,preventDefault:()=>{},stopPropagation:()=>{},currentTarget:e,target:e})}catch{}}try{o.focus?.(),o.dispatchEvent(new KeyboardEvent("keydown",{key:" ",code:"Space",keyCode:32,bubbles:!0,cancelable:!0})),await new Promise(f=>setTimeout(f,200));let g=i>l?"ArrowDown":"ArrowUp";for(let f=0;f<3;f++)document.dispatchEvent(new KeyboardEvent("keydown",{key:g,bubbles:!0,cancelable:!0})),await new Promise(v=>setTimeout(v,60));document.dispatchEvent(new KeyboardEvent("keydown",{key:" ",code:"Space",keyCode:32,bubbles:!0,cancelable:!0})),await new Promise(f=>setTimeout(f,80))}catch{}try{!!document.querySelector("[data-rbd-draggable-id], [data-rbd-droppable-id], [data-dnd-kit-sortable]")&&(o.dispatchEvent(new CustomEvent("dndkitdragstart",{bubbles:!0,cancelable:!0,detail:{id:o.id||o.getAttribute("data-id")}})),await new Promise(f=>setTimeout(f,100)),e.dispatchEvent(new CustomEvent("dndkitdrop",{bubbles:!0,cancelable:!0,detail:{overId:e.id||e.getAttribute("data-id")}})))}catch{}}catch(p){console.warn("[EasyQuiz] Estrat\xE9gia G (React DnD internals) falhou:",p)}}function Dt(o,e,t,a){let r=c=>c.replace(/\\/g,"\\\\").replace(/'/g,"\\'").replace(/"/g,'\\"').slice(0,100),n=r(o.toLowerCase()),l=r(e.toLowerCase()),s=r(t),i=r(a);return`var src=$eq.find('${s}')||Array.from(document.querySelectorAll('[draggable],[class*="cursor-grab"],[class*="dnd-card"]')).find(function(e){return (e.textContent||'').toLowerCase().includes('${n}');});var dst=Array.from(document.querySelectorAll('[class*="list-group"],[class*="dropzone"],[data-category],[data-rbd-droppable-id]')).find(function(e){var h=e.querySelector('.font-bold,h1,h2,h3,h4,[class*="header"]');var t=(h||e);return (t.textContent||'').toLowerCase().includes('${l}');});if(src&&dst){dst.appendChild(src);[src,dst].forEach(function(el){try{el.dispatchEvent(new Event('change',{bubbles:true}));}catch(e){}try{el.dispatchEvent(new CustomEvent('dndkitdrop',{bubbles:true,detail:{}}));}catch(e){}});}else{console.warn('[EQ-drag-fallback] nao localizado: ${n} -> ${l}');}`}var Bt={fill:(o,e)=>{let t=H(o);t?De(t,e):console.warn(`$eq.fill: Elemento '${o}' n\xE3o encontrado`)},click:o=>{let e=H(o);e?!!(e.closest('.option-card, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, [class*="option" i], [class*="choice" i]')||e.querySelector('input[type="radio"], input[type="checkbox"]')||e instanceof HTMLInputElement&&["checkbox","radio"].includes(e.type))?ie(e,!0):ee(e):console.warn(`$eq.click: Elemento '${o}' n\xE3o encontrado`)},check:(o,e)=>{let t=H(o);t?ie(t,e):console.warn(`$eq.check: Elemento '${o}' n\xE3o encontrado`)},find:(o,e)=>H(o,e),drag:(o,e)=>{let t=Z(o,"source")||H(o),a=Z(e,"destination")||H(e);t&&a?Ve(t,a):console.warn(`$eq.drag: Origem ou destino n\xE3o encontrado ('${o}' -> '${e}')`)},categorize:async(o,e)=>{let t=Z(o,"source")||H(o),a=Z(e,"destination")||H(e);if(!t||!a){console.warn(`$eq.categorize: Item ou categoria n\xE3o encontrados ('${o}' -> '${e}')`);return}await Ve(t,a)},execute:(o,e=!1,t=1)=>ke(o,e,t)};typeof window<"u"&&(window.$eq=Bt);async function go(o,e=1,t=de()){if(Ze(o,t),o.t==="js"){let i=String(o.v||"");kt(i);try{new Function("$eq","document","window",i)(Bt,document,window)}catch(c){throw console.warn("[EasyQuiz JS Execution]",c),c}return}if(o.t==="drag"){let i=Z(o.from,"source")||H(o.from),c=Z(o.to,"destination")||H(o.to);!i&&o.from&&(i=H(q(o.from))),!c&&o.to&&(c=H(q(o.to))),i&&c?await Ve(i,c,e):console.warn(`[EasyQuiz] Drag: alvo n\xE3o encontrado ('${o.from}' -> '${o.to}')`);return}let a=o.id!==void 0&&o.id!==null?String(o.id):"";!a&&o.t==="val"&&(a=o.target??o.name??o.selector??"1");let r=o.v!==void 0?o.v:o.value!==void 0?o.value:o.val!==void 0?o.val:o.text,n=r!=null?String(r).trim():"",l=null,s=String(o.name??o.n??"").trim();if(o.t==="chk"&&s){let i=Array.from(document.querySelectorAll(`input[name="${V(s)}"]`));if(n&&(l=i.find(c=>c.value?.toLowerCase()===n.toLowerCase())??null),!l&&n){let c=/^(v|verdadeiro|true|1|t|sim|correto)$/i.test(n),u=/^(f|falso|false|0|nao|não|incorreto|errado)$/i.test(n);if(c||u){let h=c?["v","verdadeiro","true","1","t","sim","correto"]:["f","falso","false","0","nao","n\xE3o","incorreto","errado"];l=i.find(d=>{let m=d.value?.toLowerCase()??"";if(h.includes(m))return!0;let b=(d.closest('label, td, [class*="option" i]')?.textContent??"").trim().toLowerCase();return h.some(y=>b===y||b.startsWith(y+" ")||b.startsWith("("+y+")"))})??null}}!l&&i.length>0&&(l=i[0])}if(l||(l=H(a,n,o.t==="val"||o.t==="sel")),!l&&a&&(l=H(q(a),n,o.t==="val"||o.t==="sel")),l&&n){if(l instanceof HTMLInputElement&&l.type==="radio"&&l.name){if(q(l.value).toLowerCase()!==q(n).toLowerCase()){let i=document.querySelector(`input[type="radio"][name="${V(l.name)}"][value="${V(n)}" i]`);if(i)l=i;else{let u=Array.from(document.querySelectorAll(`input[type="radio"][name="${V(l.name)}"]`)).find(h=>{let d=h.closest("label, .vf-label, .option-card, tr, td, div");return d&&q(d.textContent).toLowerCase().includes(q(n).toLowerCase())});u&&(l=u)}}}else if(!(l instanceof HTMLInputElement)&&!(l instanceof HTMLSelectElement)&&!(l instanceof HTMLTextAreaElement)){let i=l.querySelector(`input[value="${V(n)}" i], [data-value="${V(n)}" i]`);if(i)l=i;else{let u=Array.from(l.querySelectorAll('input[type="radio"], input[type="checkbox"]')).find(h=>{let d=h.closest("label, .vf-label, .option-card, td, div");return d&&q(d.textContent).toLowerCase().includes(q(n).toLowerCase())});u&&(l=u)}}}if(!l&&(o.t==="val"||o.t==="sel")){let i=document.body;try{i=F()||document.body}catch{}let c=Array.from(i.querySelectorAll(o.t==="sel"?'select, [role="combobox"], [role="listbox"]':'input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, select, [contenteditable="true"]')).filter(u=>L(u)&&!P(u));if(c.length===1)l=c[0];else if(c.length>1){let u=q(a).toLowerCase(),h=u.match(/^#?_?([0-9]+)$/);if(h){let d=parseInt(h[1],10);d>=1&&d<=c.length?l=c[d-1]:d>=0&&d<c.length&&(l=c[d])}l||(l=c.find(m=>{let p=(m.getAttribute("placeholder")||"").toLowerCase(),b=(m.name||"").toLowerCase(),y=(m.getAttribute("aria-label")||"").toLowerCase(),g=(m.id||"").toLowerCase(),f=q(tt(m)).toLowerCase(),v=q(m.closest('label, tr, td, .form-group, .field, [class*="row" i], div')?.textContent||"").toLowerCase();return p.includes(u)||b.includes(u)||y.includes(u)||g.includes(u)||f&&f.includes(u)||u.length>=2&&v.includes(u)})||(c.length===1?c[0]:null))}}if(!l&&o.t!=="adv")throw new Error(`Alvo '${a}' n\xE3o encontrado no DOM para a\xE7\xE3o '${o.t}'.`);switch(o.t){case"val":if(l){let c=l instanceof HTMLInputElement||l instanceof HTMLTextAreaElement||l instanceof HTMLSelectElement||l.isContentEditable?l:l.querySelector('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]');if(!c){let m=l.closest('.form-group, .field, [class*="input" i], [class*="control" i], label, tr, td, li, p, div')?.querySelector('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]');m&&(c=m)}if(!c){let d=l.nextElementSibling;for(;d;){if(d instanceof HTMLInputElement&&!["hidden","button","submit","checkbox","radio"].includes(d.type)||d instanceof HTMLTextAreaElement||d instanceof HTMLElement&&d.isContentEditable){c=d;break}let m=d.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(m){c=m;break}d=d.nextElementSibling}}if(!c){let d=document.body;try{d=F()||document.body}catch{}let m=Array.from(d.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]')).filter(p=>L(p)&&!P(p));m.length>0&&(c=m[0])}let u=o.v!==void 0?o.v:o.value!==void 0?o.value:o.val!==void 0?o.val:o.text,h=u!=null?String(u):"";De(c||l,h)}break;case"chk":l&&ie(l,!!o.c);break;case"sel":if(l){let c=Array.isArray(o.v)?o.v:[String(o.v)];Be(l,c)}break;case"clk":if(l)if(!!(l.closest('.option-card, label, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, [class*="option" i], [class*="choice" i], [class*="answer" i], li, tr')||l.querySelector('input[type="radio"], input[type="checkbox"]')||l instanceof HTMLInputElement&&["checkbox","radio"].includes(l.type))){let u=o.c!==void 0?!!o.c:!0;ie(l,u)}else ee(l,o.co);break;case"adv":let i=it(o.id);if(i){await st(i,1200);let c=o.id||i.textContent?.trim()||"";c&&Ge(window.location.hostname,{advanceSelector:c}),ee(i)}else console.warn("[EasyQuiz] Bot\xE3o de avan\xE7o n\xE3o localizado.");break}}function fo(){let o=["button","a",'[role="button"]','input[type="submit"]','input[type="button"]','[data-testid*="check" i]','[data-test-id*="check" i]'].join(",");return Array.from(document.querySelectorAll(o)).find(t=>{if(!L(t)||P(t)||t.closest("header, nav, aside"))return!1;let a=t instanceof HTMLInputElement||t instanceof HTMLButtonElement?t.value:"",r=(t.textContent||a||t.getAttribute("aria-label")||"").trim();return/(verificar|checar|check|conferir|validar|enviar|responder)/i.test(r)})||null}function it(o){let e=d=>{let m=(d.getAttribute("aria-label")||d.textContent||(d instanceof HTMLInputElement||d instanceof HTMLButtonElement?d.value:"")||"").trim();return oe.test(m)};if(o){let d=H(o);if(d&&L(d)&&!P(d)&&!O(d)&&!e(d))return d}try{let d=we(window.location.hostname);if(d.advanceSelector){let m=H(d.advanceSelector);if(m&&L(m)&&!P(m)&&!O(m)&&!e(m))return m}}catch{}let t=["button","a",'[role="button"]','[role="link"]','input[type="button"]','input[type="submit"]','[data-testid*="next" i]','[data-testid*="continue" i]','[data-testid*="check" i]','[data-test-id*="next" i]','[data-test-id*="continue" i]','[data-test-id*="check" i]','[class*="next" i]','[class*="continue" i]','[class*="proximo" i]','[class*="avancar" i]'].join(","),a=Array.from(document.querySelectorAll(t)),r=d=>{let m=d instanceof HTMLInputElement||d instanceof HTMLButtonElement?d.value:"";return(d.getAttribute("aria-label")||d.textContent||m||"").trim()},n=d=>{let m=r(d).trim();return/^\d{1,3}$/.test(m)?!!d.closest('[class*="pagination" i], [class*="pager" i], [class*="page-nav" i], [class*="step-indicator" i], [class*="breadcrumb" i], [class*="steps" i], [aria-label*="p\xE1gina" i], [aria-label*="page" i], [role="navigation"], nav'):!1},l=a.filter(d=>L(d)&&!P(d)&&!d.closest("header, aside")&&!O(d)&&!e(d));for(let d of l){let m=r(d),p=m.replace(/[\d\(\)\[\]\u2192>\u2022\-\/\\]+/g," ").trim();if((Se.test(m)||Se.test(p))&&!n(d)&&!O(d))return d}for(let d of l)if(Y(d)&&!O(d)&&!n(d))return d;let s=document.querySelector('[data-test-id*="next" i], [data-testid*="next" i], [aria-label*="next" i], [aria-label*="pr\xF3xim" i], [aria-label*="avan\xE7ar" i], [aria-label*="continuar" i]');if(s&&L(s)&&!P(s)&&!O(s)&&!e(s))return s;let i=Array.from(document.querySelectorAll('input[type="submit"], button[type="submit"]'));for(let d of i)if(L(d)&&!P(d)&&!e(d)&&!O(d)&&!n(d))return d;let c=Array.from(document.querySelectorAll('button, [role="button"]')),u=window.innerHeight,h=c.filter(d=>{if(!L(d)||P(d)||e(d)||O(d)||d.closest("header, nav, aside, .eq-sidebar")||n(d))return!1;let m=d.getBoundingClientRect();return m.top>u*.45&&m.height>=24&&m.width>=24});if(h.length>0)return h.sort((d,m)=>{let p=d.getBoundingClientRect(),b=m.getBoundingClientRect(),y=p.left+p.top;return b.left+b.top-y}),h[0];for(let d of l)if(Y(d)&&!O(d))return d;return null}async function st(o,e=2500){let t=Date.now();for(;Date.now()-t<e;){if(!(o.disabled===!0||o.getAttribute("aria-disabled")==="true"||o.classList.contains("disabled")||o.getAttribute("disabled")!==null))return;await new Promise(r=>setTimeout(r,80))}}function bo(){let o=window.location.href,e=document.title,t=document.querySelectorAll('input, textarea, select, button, [role="button"], [role="option"], [role="radio"], [role="checkbox"]').length,a=(document.body?.innerText||document.body?.textContent||"").length;return`${o}|${e}|${t}|${a}`}async function vo(o,e=3500){let[t,a,r,n]=o.split("|"),l=parseInt(n||"0",10),s=Date.now();for(;Date.now()-s<e;){let i=window.location.href,c=document.title,u=String(document.querySelectorAll('input, textarea, select, button, [role="button"], [role="option"], [role="radio"], [role="checkbox"]').length),h=(document.body?.innerText||document.body?.textContent||"").length;if(i!==t)return{changed:!0,evidence:`URL mudou: ${t} \u2192 ${i}`};if(c!==a)return{changed:!0,evidence:`T\xEDtulo da p\xE1gina mudou: "${a}" \u2192 "${c}"`};if(Math.abs(parseInt(u)-parseInt(r||"0"))>=2)return{changed:!0,evidence:`Controles interativos: ${r} \u2192 ${u}`};if(Math.abs(h-l)>50)return{changed:!0,evidence:`Conte\xFAdo da p\xE1gina mudou substancialmente (${Math.abs(h-l)} chars)`};await new Promise(d=>setTimeout(d,100))}return{changed:!1,evidence:"Nenhuma mudan\xE7a estrutural detectada dentro do tempo limite."}}async function Ot(o){if(o.t==="js"||o.t==="adv")return;if(o.t==="drag"){let r=H(o.from)||H(q(o.from)),n=H(o.to)||H(q(o.to));r&&n&&await Ve(r,n,2);return}let e=o.id||"",t=o.v!==void 0?String(o.v).trim():"",a=H(e,t)||H(q(e),t);if(o.t==="clk"||o.t==="chk"){if(!a&&e){let n=Array.from(document.querySelectorAll('input, label, button, [role="radio"], [role="checkbox"], .option-card, [class*="option" i], [class*="choice" i]')),l=q(e).toLowerCase();a=n.find(s=>{let i=q(s.textContent).toLowerCase();return!!(q(s.value||"").toLowerCase()===l||i===l||i.startsWith(l+")")||i.startsWith("("+l+")")||i.startsWith(l+".")||i.startsWith(l+" - ")||i.startsWith(l+":")||l.length>=3&&i.includes(l))})||null}let r=o.v!==void 0?String(o.v).trim():"";if(a&&r){if(a instanceof HTMLInputElement&&a.type==="radio"&&a.name){if(q(a.value).toLowerCase()!==q(r).toLowerCase()){let n=document.querySelector(`input[type="radio"][name="${V(a.name)}"][value="${V(r)}" i]`);if(n)a=n;else{let s=Array.from(document.querySelectorAll(`input[type="radio"][name="${V(a.name)}"]`)).find(i=>{let c=i.closest("label, .vf-label, .option-card, tr, td, div");return c&&q(c.textContent).toLowerCase().includes(q(r).toLowerCase())});s&&(a=s)}}}else if(!(a instanceof HTMLInputElement)&&!(a instanceof HTMLSelectElement)&&!(a instanceof HTMLTextAreaElement)){let n=a.querySelector(`input[value="${V(r)}" i], [data-value="${V(r)}" i]`);if(n)a=n;else{let s=Array.from(a.querySelectorAll('input[type="radio"], input[type="checkbox"]')).find(i=>{let c=i.closest("label, .vf-label, .option-card, td, div");return c&&q(c.textContent).toLowerCase().includes(q(r).toLowerCase())});s&&(a=s)}}}if(a){let n=a.closest('.option-card, label, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, li')||a,l=a instanceof HTMLInputElement&&["radio","checkbox"].includes(a.type)?a:n.querySelector('input[type="radio"], input[type="checkbox"]')||(n.getAttribute("for")?n.ownerDocument.getElementById(n.getAttribute("for")):null),s=o.t==="chk"||o.c!==void 0?!!o.c:!0;if(ie(l||n,s),l&&l.checked!==s){try{let i=l._valueTracker;i&&i.setValue(!s)}catch{}try{Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"checked")?.set?.call(l,s)}catch{}l.checked=s,l.dispatchEvent(new Event("input",{bubbles:!0,composed:!0})),l.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}}return}if(o.t==="val"){let r=null;if(a&&(r=a instanceof HTMLInputElement||a instanceof HTMLTextAreaElement||a.isContentEditable?a:a.querySelector('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]')),!r){let n=document.body;try{n=F()||document.body}catch{}let l=Array.from(n.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]')),s=q(e).toLowerCase();r=l.find(i=>{let c=(i.getAttribute("placeholder")||"").toLowerCase(),u=(i.name||"").toLowerCase(),h=(i.id||"").toLowerCase(),d=(i.getAttribute("aria-label")||"").toLowerCase();return c.includes(s)||u.includes(s)||h.includes(s)||d.includes(s)})||(l.length>0?l[0]:null)}if(r){let n=String(o.v??"");try{if(r.focus?.(),r.type!=="number"){try{r.select?.()}catch{}document.execCommand?.("insertText",!1,n)}}catch{}De(r,n)}return}if(o.t==="sel"){if(!a&&e){let r=Array.from(document.querySelectorAll("select")),n=q(e).toLowerCase();a=r.find(l=>{let s=(l.name||"").toLowerCase(),i=(l.id||"").toLowerCase(),c=(l.getAttribute("aria-label")||"").toLowerCase();return s.includes(n)||i.includes(n)||c.includes(n)})||null}if(a){let r=Array.isArray(o.v)?o.v:[String(o.v)];Be(a,r)}return}}function be(o){try{if(o.t==="val"){let e=o.v!==void 0?o.v:o.value!==void 0?o.value:o.val!==void 0?o.val:o.text,t=String(e??"").trim(),a=t,r=o.id!==void 0&&o.id!==null?String(o.id):"";r||(r=o.target??o.name??o.selector??"1");let n=H(r,a,!0)||H(q(r),a,!0);if(!n){let h=document.body;try{h=F()||document.body}catch{}let d=Array.from(h.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]')).filter(m=>L(m)&&!P(m));d.length>0&&(n=d[0])}if(!n)return!1;let l=n instanceof HTMLInputElement&&n.type==="radio"?n:n.querySelector('input[type="radio"]');if(l&&l.name){let h=document.querySelector(`input[type="radio"][name="${V(l.name)}"]:checked`);if(!h)return!1;let d=q(h.value).toLowerCase(),m=q(t).toLowerCase(),p=q(h.closest("label, .vf-label, .option-card, tr, td, div")?.textContent||"").toLowerCase();return d===m||p===m||p.includes(m)}let s=n instanceof HTMLInputElement||n instanceof HTMLTextAreaElement||n.isContentEditable?n:n.querySelector('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(!s){let d=n.closest('.form-group, .field, [class*="input" i], [class*="control" i], label, tr, td, li, p, div')?.querySelector('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]');d&&(s=d)}if(!s){let h=n.nextElementSibling;for(;h;){if(h instanceof HTMLInputElement&&!["hidden","button","submit","checkbox","radio"].includes(h.type)||h instanceof HTMLTextAreaElement||h instanceof HTMLElement&&h.isContentEditable){s=h;break}let d=h.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(d){s=d;break}h=h.nextElementSibling}}if(s instanceof HTMLSelectElement){let h=q(t).toLowerCase();return Array.from(s.options).some(d=>{if(!d.selected)return!1;let m=d.value.toLowerCase(),p=q(d.textContent).toLowerCase();return h===m||h===p||m.includes(h)||p.includes(h)})}let i=(s instanceof HTMLInputElement||s instanceof HTMLTextAreaElement?s.value:s?.textContent??n.textContent??"").trim();if(!i&&!t)return!0;if(!i&&t)return!1;let c=i.replace(",",".").replace(/\s+/g,"").toLowerCase(),u=t.replace(",",".").replace(/\s+/g,"").toLowerCase();return c===u||c.includes(u)||u.includes(c)||i.toLowerCase()===t.toLowerCase()}if(o.t==="sel"){let e=H(o.id,void 0,!0)||H(q(o.id),void 0,!0);if(!e){let n=document.body;try{n=F()||document.body}catch{}let l=Array.from(n.querySelectorAll('select, [role="combobox"], [role="listbox"]')).filter(c=>L(c)&&!P(c)),s=q(o.id).toLowerCase();e=l.find(c=>{let u=(c.id||"").toLowerCase(),h=(c.getAttribute("name")||"").toLowerCase(),d=(c.getAttribute("aria-label")||"").toLowerCase(),m=q(c.closest('.dropdown-row, [class*="dropdown" i], [class*="select" i], tr, label, div')?.textContent||"").toLowerCase();return u.includes(s)||h.includes(s)||d.includes(s)||s.length>=2&&m.includes(s)})||(l.length===1?l[0]:null)}if(!e)return!1;let t=e instanceof HTMLSelectElement?e:e.querySelector("select");if(!t){let n=e.matches?.('[role="combobox"], [role="listbox"], [class*="select" i], [class*="dropdown" i]')?e:e.closest('[role="combobox"], [role="listbox"], [class*="select" i], [class*="dropdown" i]');if(n){let s=(Array.isArray(o.v)?o.v:[String(o.v)]).map(c=>q(c).toLowerCase()),i=q(n.textContent).toLowerCase();return s.some(c=>i.includes(c)||c.includes(i))}return!1}let r=(Array.isArray(o.v)?o.v:[String(o.v)]).map(n=>q(n).toLowerCase());return Array.from(t.options).some(n=>{if(!n.selected)return!1;let l=n.value.toLowerCase(),s=q(n.textContent).toLowerCase();return r.some(i=>i===l||i===s||l.includes(i)||s.includes(i))})}if(o.t==="chk"||o.t==="clk"){let e=o.v!==void 0?String(o.v).trim():"",t=H(o.id,e)||H(q(o.id),e);if(!t)return!1;let a=t.closest('.option-card, label, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, li')||t,r=t instanceof HTMLInputElement&&["checkbox","radio"].includes(t.type)?t:a.querySelector('input[type="checkbox"], input[type="radio"]')||(a.getAttribute("for")?a.ownerDocument.getElementById(a.getAttribute("for")):null),n=o.t==="chk"||o.c!==void 0?!!o.c:!0;if(r&&r.type==="radio"){if(r.checked===n)return!0;if(o.v&&r.name){let u=q(String(o.v)).toLowerCase(),h=document.querySelector(`input[type="radio"][name="${V(r.name)}"]:checked`);if(!h)return!1;if(h===r)return!0;let d=q(h.value).toLowerCase(),m=q(h.closest("label, .vf-label, .option-card, tr, td, div")?.textContent||"").toLowerCase();return d===u||m.includes(u)||u.includes(d)}}if(r&&["checkbox","radio"].includes(r.type))return r.checked===n;let l=a.getAttribute("aria-checked")===String(n)||a.getAttribute("aria-selected")===String(n)||a.getAttribute("aria-pressed")===String(n),s=n?a.getAttribute("data-selected")==="true"||a.getAttribute("data-checked")==="true"||a.getAttribute("data-active")==="true"||a.getAttribute("data-state")==="checked"||a.getAttribute("data-state")==="on":a.getAttribute("data-selected")==="false"||a.getAttribute("data-checked")==="false"||a.getAttribute("data-state")==="unchecked",i=n?/active|selected|checked|picked|correct|is-selected|choice-selected|selected-option|is-checked|chosen|current|highlight|ring|border-primary/i.test(a.className||""):!/active|selected|checked|picked|correct|is-selected|choice-selected|selected-option|is-checked|chosen|current|highlight|ring|border-primary/i.test(a.className||"");return!!(l||s||i||(a instanceof HTMLButtonElement||a.getAttribute("role")==="button")&&o.t==="clk"||o.t==="clk"&&!r)}if(o.t==="drag"){let e=Z(o.from,"source")||H(o.from)||H(q(o.from)),t=Z(o.to,"destination")||H(o.to)||H(q(o.to));return!e||!t?!1:ho(e,t).success}}catch{}return!1}async function ke(o,e,t=1,a=de({engine:"smart",autoAdvance:e})){let r=o.actions.filter(w=>w.t!=="adv"),n=o.actions.filter(w=>w.t==="adv"),l=0,s=[],i=new Map,c=new Map,u=new Map,h=o.pageType==="question",d=r.filter(w=>w.t==="chk"||w.t==="clk"&&w.c!==void 0);for(let w of r){let E=[];c.set(w,E);try{if(w.t==="drag"){E.push("declarative-A-F");try{let C=Z(w.from,"source")||H(w.from);C&&u.set(w,C.parentElement?.outerHTML?.slice(0,500)||"")}catch{}}else E.push("declarative-primary");await go(w,t,a),l++}catch(C){i.set(w,C instanceof Error?C.message:String(C)),console.warn("[EasyQuiz] A\xE7\xE3o declarativa prim\xE1ria falhou com seguran\xE7a:",w,C)}await new Promise(C=>setTimeout(C,w.t==="drag"?180:35))}if(h&&o.mode==="escolha_multipla"&&d.length>0){let w=document.body;try{w=F()||document.body}catch{}let E=Array.from(w.querySelectorAll('input[type="checkbox"], [role="checkbox"]')).filter(C=>L(C)&&!P(C));if(E.length>1){let I=function(M,k){if(M===k||M.contains(k)||k.contains(M))return!0;let A=M.closest('.option-card, label, [role="checkbox"], [role="option"], tr, li, [class*="option" i]'),z=k.closest('.option-card, label, [role="checkbox"], [role="option"], tr, li, [class*="option" i]');if(A&&z&&A===z)return!0;let D=M.getAttribute("for")||M.id,K=k.getAttribute("for")||k.id;return!!(D&&K&&D===K)};var T=I;let C=new Set;for(let M of d){let k=M.t==="chk"?!!M.c:!!(M.c??!0),A="id"in M&&typeof M.id=="string"?M.id:"";if(k&&A){let z=H(A,M.v);if(z){C.add(z);let D=z.querySelector('input[type="checkbox"]');D&&C.add(D);let K=z.closest('.option-card, label, [role="checkbox"], tr, li, [class*="option" i]');K&&(C.add(K),K.querySelectorAll('input[type="checkbox"]').forEach(N=>C.add(N)))}}}if(C.size>=d.length&&C.size>0){let M=Array.from(C);for(let k of E)M.some(z=>I(z,k))||(k instanceof HTMLInputElement&&k.checked||k.getAttribute("aria-checked")==="true"||k.closest(".option-card, label")?.classList.contains("selected"))&&ie(k,!1)}}}await new Promise(w=>setTimeout(w,r.length>0?100:25));let m=0;for(let w of r){if(be(w)){m++;continue}console.warn(`[EasyQuiz Auto-Cura] A\xE7\xE3o '${w.t}' no alvo '${w.id||w.from||""}' n\xE3o verificada no DOM. Disparando Passagem 2 de conting\xEAncia...`);try{Ze(w,a),c.get(w)?.push("alternative-path"),await Ot(w)}catch(E){i.set(w,E instanceof Error?E.message:String(E)),console.warn("[EasyQuiz Auto-Cura] Rota alternativa falhou:",E)}await new Promise(E=>setTimeout(E,250)),be(w)&&(console.log("[EasyQuiz Auto-Cura] \u2713 A\xE7\xE3o recuperada com sucesso pela rota de conting\xEAncia!"),m++,i.has(w)&&(i.delete(w),l++))}if(m<r.length&&r.length>0){console.warn(`[EasyQuiz Auto-Cura] ${r.length-m} de ${r.length} a\xE7\xE3o(\xF5es) ainda n\xE3o verificadas. Disparando Passagem 3 final...`),await new Promise(w=>setTimeout(w,200));for(let w of r)if(!be(w))try{await Ot(w)}catch(E){i.set(w,E instanceof Error?E.message:String(E))}await new Promise(w=>setTimeout(w,200)),m=0;for(let w of r)be(w)&&(m++,i.has(w)&&(i.delete(w),l++))}let p=[];for(let[w,E]of r.entries())if(!be(E)){let C=E.t==="drag"?`${E.from} -> ${E.to}`:"id"in E?E.id:E.t;s.push(C),p.push({actionIndex:w,action:E,strategiesAttempted:c.get(E)||[],evidence:i.get(E)||"sem evid\xEAncia de aplica\xE7\xE3o no DOM",domSnapshot:u.get(E)}),E.t==="drag"&&console.warn(`[EasyQuiz Drag] FALHA CONFIRMADA: "${E.from}" -> "${E.to}"`,`
  Estrat\xE9gias: ${(c.get(E)||[]).join(", ")}`,`
  Snapshot DOM: ${u.get(E)?.slice(0,200)||"n/a"}`)}h&&r.length===0&&s.push("nenhuma a\xE7\xE3o de resposta prescrita");let b=r.map((w,E)=>{let C=w.t==="drag"?`${w.from} -> ${w.to}`:w.t==="js"?"$eq":w.id||w.t,I=w.t==="js"?!0:w.t==="drag"?!!(Z(w.from,"source")&&Z(w.to,"destination")):!!(H(w.id||"")||H(q(w.id||""))),M=be(w);return{index:E,action:w,target:C,located:I,applied:!i.has(w),verified:M,strategy:w.t==="drag"?"drag-adaptive":w.t==="js"?"javascript":"declarative-dom",evidence:M?"estado do controle confirmado no DOM":"nenhuma evid\xEAncia suficiente ap\xF3s as tentativas",...i.has(w)?{error:i.get(w)}:{}}}),y=h?r.length>0&&s.length===0&&(m===r.length||l===r.length&&m>0):!0,g=!1,f=!1,v="Nenhuma a\xE7\xE3o de navega\xE7\xE3o solicitada.",x=l>0&&l>=r.length/2;if(e&&(y||!h||x)){await new Promise(M=>setTimeout(M,r.length>0?120:40));let w=!1;if(o.pageType!=="info"){let M=fo();M&&L(M)&&(await st(M,1200),ee(M),w=!0,await new Promise(k=>setTimeout(k,350)))}let E=bo(),C=n.length>0?n[0].id:void 0,I=it(C);if(!I&&w&&(await new Promise(M=>setTimeout(M,250)),I=it(C)),I){await st(I,1500);let M=C||I.textContent?.trim()||"";M&&Ge(window.location.hostname,{advanceSelector:M}),ee(I);let k=await vo(E,1800);f=k.changed,v=k.evidence,g=k.changed||w,!k.changed&&!w&&console.warn("[EasyQuiz] O bot\xE3o de avan\xE7o foi acionado, mas a navega\xE7\xE3o ainda n\xE3o concluiu.")}else w?(g=!0,f=!0,v="Resposta confirmada via bot\xE3o de verifica\xE7\xE3o/envio."):console.warn("[EasyQuiz] Nenhum bot\xE3o de avan\xE7o encontrado na p\xE1gina.")}return{applied:l,verified:m,success:y,advanced:g,failed:s,reports:b,navigationVerified:f,navigationEvidence:v,failedActions:p}}var ve=null,ue=[],rt=[],lt=[],ye=null,yo=`
@keyframes eq-image-pulse-yellow-white {
  0%, 100% {
    outline-color: #ffd600;
    box-shadow: 0 0 14px rgba(255, 214, 0, 0.95), 0 0 6px rgba(255, 214, 0, 0.6);
  }
  50% {
    outline-color: #ffffff;
    box-shadow: 0 0 18px rgba(255, 255, 255, 0.95), 0 0 8px rgba(255, 255, 255, 0.8);
  }
}
@keyframes eq-scope-scan {
  0% { top: 0%; opacity: 1; }
  80% { top: 90%; opacity: 0.6; }
  100% { top: 100%; opacity: 0; }
}
@keyframes eq-badge-fade-in {
  0% { opacity: 0; transform: scale(0.7) translateY(4px); }
  100% { opacity: 1; transform: scale(1) translateY(0); }
}
`;function Vt(){try{if(typeof document>"u"||!document.head)return;if(!document.getElementById("eq-image-pulse-style")){let o=document.createElement("style");o.id="eq-image-pulse-style",o.textContent=yo,document.head.appendChild(o)}}catch{}}function pe(){ve&&(ve.style.removeProperty("outline"),ve.style.removeProperty("outline-offset"),ve.style.removeProperty("position"),ve=null);for(let o of ue)o.style.removeProperty("outline"),o.style.removeProperty("outline-offset"),o.style.removeProperty("background-color"),o.style.removeProperty("box-shadow"),o.removeAttribute("data-easyquiz-highlight");ue=[];for(let o of rt)o.style.removeProperty("animation"),o.style.removeProperty("outline"),o.style.removeProperty("outline-offset"),o.style.removeProperty("box-shadow"),o.removeAttribute("data-easyquiz-image-highlight");rt=[];for(let o of lt)try{o.remove()}catch{}if(lt=[],ye){try{ye.remove()}catch{}ye=null}}function ct(o){Vt();for(let e of o){if(!e||!(e instanceof(typeof HTMLElement<"u"?HTMLElement:e.constructor)))continue;let t=e;t.style.outline="3px solid #ffd600",t.style.outlineOffset="3px",t.style.animation="eq-image-pulse-yellow-white 1.2s ease-in-out infinite",t.setAttribute("data-easyquiz-image-highlight","true"),rt.push(t);try{let a=t.parentElement;if(a&&!a.querySelector("[data-easyquiz-capture-badge]")){window.getComputedStyle(a).position==="static"&&(a.style.position="relative");let n=document.createElement("div");n.setAttribute("data-easyquiz-capture-badge","true"),n.textContent="\u{1F4F7} Capturado pela IA",n.style.cssText=`
          position: absolute; top: 4px; left: 4px; z-index: 99999;
          background: rgba(0,0,0,0.75); color: #ffd600; font-size: 10px;
          font-weight: 700; padding: 2px 7px; border-radius: 4px;
          pointer-events: none; font-family: system-ui, sans-serif;
          animation: eq-badge-fade-in 0.3s ease-out;
          box-shadow: 0 1px 4px rgba(0,0,0,0.4);
          letter-spacing: 0.3px;
        `,a.appendChild(n),lt.push(n)}}catch{}}}function dt(o){pe(),Vt(),ve=o,o.style.outline="2px solid #00e5ff",o.style.outlineOffset="4px";try{window.getComputedStyle(o).position==="static"&&(o.style.position="relative");let t=document.createElement("div");t.style.cssText=`
      position: absolute; left: 0; right: 0; top: 0; height: 3px;
      background: linear-gradient(90deg, transparent, #00e5ff, #00ff88, #00e5ff, transparent);
      z-index: 99998; pointer-events: none; border-radius: 2px;
      animation: eq-scope-scan 0.8s ease-in-out forwards;
      box-shadow: 0 0 8px rgba(0, 229, 255, 0.6);
    `,o.appendChild(t),ye=t,setTimeout(()=>{try{t.remove()}catch{}ye===t&&(ye=null)},900)}catch{}}function xo(o){return!o||o>=.9?{outline:"#00ff88",bg:"rgba(0, 255, 136, 0.12)",glow:"rgba(0, 255, 136, 0.8)"}:o>=.7?{outline:"#00bfff",bg:"rgba(0, 191, 255, 0.10)",glow:"rgba(0, 191, 255, 0.7)"}:{outline:"#ffaa00",bg:"rgba(255, 170, 0, 0.10)",glow:"rgba(255, 170, 0, 0.7)"}}function _t(o,e){let t=xo(e);for(let a of o){if(a.t==="adv"||a.t==="js")continue;if(a.t==="drag"){try{let h=H(a.from),d=H(a.to);h&&(h.style.outline=`2px solid ${t.outline}`,ue.push(h)),d&&(d.style.outline="2px dashed #00e5ff",ue.push(d))}catch{}continue}if(!a.id)continue;let r=a.v!==void 0?Array.isArray(a.v)?a.v[0]:String(a.v):"",n=H(a.id,r,a.t==="val"||a.t==="sel")||H(q(a.id),r,a.t==="val"||a.t==="sel");if(!n&&a.t==="sel"){let h=document.body;try{h=F()||document.body}catch{}let d=Array.from(h.querySelectorAll('select, [role="combobox"], [role="listbox"]')).filter(b=>L(b)&&!ne(b)),m=q(a.id).toLowerCase();n=d.find(b=>{let y=(b.id||"").toLowerCase(),g=(b.getAttribute("name")||"").toLowerCase(),f=(b.getAttribute("aria-label")||"").toLowerCase(),v=q(b.closest('.dropdown-row, [class*="dropdown" i], [class*="select" i], tr, label, div')?.textContent||"").toLowerCase();return y.includes(m)||g.includes(m)||f.includes(m)||m.length>=2&&v.includes(m)})||(d.length===1?d[0]:null)}if(!n)continue;let l=typeof HTMLSelectElement<"u"&&n instanceof HTMLSelectElement||n.tagName?.toLowerCase()==="select"||n.getAttribute("role")==="combobox"||n.getAttribute("role")==="listbox",i=n.parentElement?.closest('.dropdown-row, [class*="dropdown" i], [class*="select-row" i], .form-group, tr, li')||n.closest('label, .option-card, [role="radio"], [role="checkbox"], [role="listitem"], .answer, .quiz-option, .form-check, [class*="option" i], [class*="choice" i]')||n;i.style.outline=`2px solid ${t.outline}`,i.style.outlineOffset="2px",i.style.backgroundColor=t.bg,i.setAttribute("data-easyquiz-highlight","true"),ue.push(i);let c=l?n:i.querySelector('select, [role="combobox"], [role="listbox"]');c&&(c.style.outline=`2px solid ${t.outline}`,c.style.outlineOffset="2px",c.style.boxShadow=`0 0 10px ${t.glow}`,c.setAttribute("data-easyquiz-highlight","true"),ue.push(c));let u=n instanceof HTMLInputElement&&["checkbox","radio"].includes(n.type)?n:i.querySelector('input[type="checkbox"], input[type="radio"]');u&&u!==i&&(u.style.outline=`2px solid ${t.outline}`,u.style.outlineOffset="2px",u.style.boxShadow=`0 0 10px ${t.glow}`,u.setAttribute("data-easyquiz-highlight","true"),ue.push(u))}}var ut=10,pt=1400,Ie=15e5;function se(o){return new Promise((e,t)=>{let a=new FileReader;a.onerror=()=>t(new Error("Falha ao converter blob para base64.")),a.onload=()=>{let r=String(a.result||"");e(r.split(",")[1]||"")},a.readAsDataURL(o)})}async function me(o){let e=0,t=0;if(o instanceof HTMLImageElement?(e=o.naturalWidth||o.width,t=o.naturalHeight||o.height):(e=o.width,t=o.height),e<=0||t<=0)throw new Error("Dimens\xF5es inv\xE1lidas.");let a=Math.min(1,pt/Math.max(e,t)),r=Math.max(1,Math.round(e*a)),n=Math.max(1,Math.round(t*a)),l=document.createElement("canvas");l.width=r,l.height=n;let s=l.getContext("2d",{alpha:!1});if(!s)throw new Error("Sem suporte a Canvas 2D.");return s.fillStyle="#ffffff",s.fillRect(0,0,r,n),s.drawImage(o,0,0,r,n),new Promise((i,c)=>{l.toBlob(u=>u?i(u):c(new Error("Falha na compress\xE3o.")),"image/jpeg",.88)})}async function wo(o){let e=typeof o.getBoundingClientRect=="function"?o.getBoundingClientRect():{width:0,height:0},t=e.width||parseFloat(o.getAttribute("width")||"0")||parseFloat(o.style.width||"0")||400,a=e.height||parseFloat(o.getAttribute("height")||"0")||parseFloat(o.style.height||"0")||300,r=2,n=Math.min(1800,Math.max(120,Math.round(t*r))),l=Math.min(1800,Math.max(100,Math.round(a*r))),s=o.cloneNode(!0);s.getAttribute("xmlns")||s.setAttribute("xmlns","http://www.w3.org/2000/svg"),s.setAttribute("width",String(n)),s.setAttribute("height",String(l)),!s.getAttribute("viewBox")&&t>0&&a>0&&s.setAttribute("viewBox",`0 0 ${t} ${a}`);let c=new XMLSerializer().serializeToString(s),u=new Blob([c],{type:"image/svg+xml;charset=utf-8"}),h=URL.createObjectURL(u);try{let d=new Image;d.crossOrigin="anonymous",await new Promise((b,y)=>{d.onload=()=>b(),d.onerror=()=>y(new Error("Falha ao renderizar SVG em Image.")),d.src=h});let m=document.createElement("canvas");m.width=n,m.height=l;let p=m.getContext("2d",{alpha:!1});if(!p)throw new Error("Sem suporte a Canvas 2D.");return p.fillStyle="#ffffff",p.fillRect(0,0,n,l),p.drawImage(d,0,0,n,l),new Promise((b,y)=>{m.toBlob(g=>g?b(g):y(new Error("Falha na compress\xE3o do SVG.")),"image/jpeg",.92)})}finally{URL.revokeObjectURL(h)}}async function mt(o){try{let e=o.cloneNode(!0),t=o.offsetWidth||500,a=o.offsetHeight||500,r=`
      <svg xmlns="http://www.w3.org/2000/svg" width="${t}" height="${a}">
        <foreignObject width="100%" height="100%">
          <div xmlns="http://www.w3.org/1999/xhtml" style="background:#fff;font-family:sans-serif;">
            ${e.innerHTML}
          </div>
        </foreignObject>
      </svg>
    `,n=new Blob([r],{type:"image/svg+xml;charset=utf-8"}),l=URL.createObjectURL(n),s=new Image;s.crossOrigin="anonymous",await new Promise((u,h)=>{s.onload=()=>u(),s.onerror=()=>h(new Error("Falha ao renderizar ForeignObject.")),s.src=l});let i=await me(s),c=await se(i);if(URL.revokeObjectURL(l),c&&c.length<=Ie)return{mediaType:"image/jpeg",base64:c,alt:"Captura via rasteriza\xE7\xE3o DOM",source:"rasterized",captureStatus:"captured"}}catch(e){console.warn("[EasyQuiz] Falha na rasteriza\xE7\xE3o do n\xF3:",e)}return null}function Kt(o,e,t,a){if(t<=0||a<=0){let d=typeof o.getBoundingClientRect=="function"?o.getBoundingClientRect():{width:0,height:0};if(t=d.width||t,a=d.height||a,t<=0||a<=0){if(e&&/\b(icon|logo|avatar|badge|emoji|spinner|loading)\b/i.test(e))return!1;let p=o instanceof HTMLImageElement&&o.src||"";return p&&/\/icons?\/|\/logos?\/|\/avatars?\/|\/badges?\//i.test(p)?!1:!!(p||e)}}if(t<48||a<48||Math.max(t,a)/Math.max(1,Math.min(t,a))>15)return!1;let n=o.getAttribute("class")||"",l=o.getAttribute("aria-hidden"),s=o.getAttribute("role"),i=o instanceof HTMLImageElement&&o.src||"";if(l==="true"||s==="presentation"||s==="none")return!1;let c=/\b(icon|logo|avatar|badge|emoji|decoration|ornament|spinner|loading|thumbnail|profile|photo)\b/i;if(c.test(n)||e&&c.test(e)||i&&/\/icons?\/|\/logos?\/|\/avatars?\/|\/badges?\/|\/emojis?\//i.test(i)||e===""||e===" "||e==="-")return!1;let u=/\b(graph|chart|diagram|table|map|formula|equation|figure|plot|curve|histogram|scatter|matrix|image|foto|imagem|gráfico|tabela|mapa|fórmula|questão|enunciado|stimulus)\b/i;return u.test(e)||u.test(n)||o.closest('[data-question], [class*="question" i], [class*="prompt" i], [class*="stimulus" i], [class*="enunciado" i], [class*="statement" i], article, .problem, .exercise')?!0:t>=80&&a>=80}function Ut(o){let e=[],t=o.getAttribute("alt")||o.getAttribute("aria-label")||o.getAttribute("title")||"";t&&t.length>2&&e.push(`Alt: "${t}"`);let n=o.closest("figure")?.querySelector("figcaption")?.textContent?.trim();n&&n.length>2&&e.push(`Legenda: "${n}"`);let l=o.getAttribute("aria-describedby");if(l){let u=document.getElementById(l)?.textContent?.trim();u&&e.push(`Descri\xE7\xE3o: "${u.slice(0,200)}"`)}let s=o.parentElement;if(s){let c=R(s.textContent||"",300);c&&c.length>5&&c!==t&&e.push(`Contexto: "${c.slice(0,200)}"`)}let i=o.getAttribute("data-alt")||o.getAttribute("data-description")||"";return i&&e.push(`Data: "${i}"`),e.length===0?"":e.join(" | ")}async function qo(o){let e=o.currentSrc||o.src;if(!e)return null;let t=(o.alt||o.getAttribute("aria-label")||"Imagem da quest\xE3o").slice(0,500);if(o.complete&&o.naturalWidth>0)try{let l=await me(o),s=await se(l);if(s&&s.length<=Ie)return{mediaType:"image/jpeg",base64:s,alt:t,source:e.slice(0,2e3),captureStatus:"captured"}}catch{}try{let l=await fetch(e,{mode:"cors"});if(l.ok){let s=await l.blob();if(s.type.startsWith("image/")){let i=await createImageBitmap(s),c=await me(i);i.close();let u=await se(c);if(u&&u.length<=Ie)return{mediaType:"image/jpeg",base64:u,alt:t,source:e.slice(0,2e3),captureStatus:"captured"}}}}catch{}if(!e.startsWith("data:"))try{let s=await(await fetch(e,{mode:"no-cors"})).blob();if(s.size>100)try{let i=await createImageBitmap(s),c=await me(i);i.close();let u=await se(c);if(u&&u.length>100&&u.length<=Ie)return{mediaType:"image/jpeg",base64:u,alt:t,source:e.slice(0,2e3),captureStatus:"captured"}}catch{}}catch{}let a=o.parentElement||o,r=await mt(a);if(r)return r;try{if(o.complete&&o.naturalWidth>0&&typeof HTMLCanvasElement.prototype.captureStream=="function"){let l=document.createElement("canvas");l.width=Math.min(o.naturalWidth,pt),l.height=Math.min(o.naturalHeight,pt);let s=l.getContext("2d");if(s){s.drawImage(o,0,0,l.width,l.height);let i=l.toDataURL("image/jpeg",.88).split(",")[1];if(i&&i.length>100&&i.length<=Ie)return{mediaType:"image/jpeg",base64:i,alt:t,source:e.slice(0,2e3),captureStatus:"captured"}}}}catch{}let n=Ut(o);return n||t?{mediaType:"image/jpeg",base64:"",alt:t,source:e.slice(0,2e3),captureStatus:"text_only",textContext:n||`Imagem sem descri\xE7\xE3o textual dispon\xEDvel (src: ${e.slice(0,100)})`}:null}function Eo(o){return o.querySelectorAll("path, line, polyline, polygon, circle, rect, text, image").length>0}function Co(o){try{let e=o.style.backgroundImage||(window.getComputedStyle?window.getComputedStyle(o).backgroundImage:"");if(e&&e.includes("url(")){let t=e.match(/url\(["']?([^"')]+)["']?\)/);if(t&&t[1]&&!t[1].startsWith("data:image/svg+xml"))return t[1]}}catch{}return null}function To(o,e){let t=o.closest('[data-easyquiz-id], button, [role="button"], [role="radio"], [role="checkbox"], [role="option"], label, .option-card, .quiz-option, .choice, .answer, [class*="option" i], [class*="choice" i], [class*="answer" i], li, tr');if(t&&t!==e&&L(t)&&!Y(t)&&!O(t)){let n=t.dataset.easyquizId||t.id||void 0,l=R(t.innerText||t.textContent||"",120),s=t.getAttribute("aria-label")||t.getAttribute("title")||"",i=l||s,c=n?` [id: ${n}]`:"";if(i)return{associatedLabel:`Alternativa/Op\xE7\xE3o: "${i}"${c}`,targetControlId:n};if(n)return{associatedLabel:`Alternativa/Op\xE7\xE3o ${c}`,targetControlId:n}}let a=o.closest("figure")?.querySelector("figcaption")?.textContent?.trim();if(a)return{associatedLabel:`Figura do Enunciado: "${R(a,100)}"`};let r=o.closest('[class*="prompt" i], [class*="stimulus" i], [class*="question-text" i], [class*="statement" i], header, h1, h2, h3, h4, p');if(r){let n=R(r.textContent||"",80);if(n)return{associatedLabel:`Gr\xE1fico do Enunciado: "${n}"`}}return{associatedLabel:"Gr\xE1fico/Imagem do Enunciado Principal"}}async function ht(o,e=!0){if(!e)return[];let t=[],a=0,r=35e5,n=(i,c)=>{if(!i)return!1;let u=i.base64?i.base64.length:0;if(u>0&&a+u>r)return!1;let h=To(c,o);return i.associatedLabel=h.associatedLabel,i.targetControlId=h.targetControlId,i.element=c,t.push(i),a+=u,t.filter(m=>m.captureStatus==="captured").length>=ut},l=Array.from(o.querySelectorAll("img")).filter(i=>L(i)&&!O(i));for(let i of l)try{let c=i.getBoundingClientRect(),u=i.naturalWidth||c.width||i.width||0,h=i.naturalHeight||c.height||i.height||0,d=i.alt||"";if(!Kt(i,d,u,h))continue;let m=await qo(i);if(n(m,i))return t}catch{}let s=Array.from(o.querySelectorAll("svg")).filter(i=>{if(!L(i)||O(i))return!1;let c=typeof i.getBoundingClientRect=="function"?i.getBoundingClientRect():{width:0,height:0},u=c.width||parseFloat(i.getAttribute("width")||"0"),h=c.height||parseFloat(i.getAttribute("height")||"0");return u<30||h<30?!1:Eo(i)});for(let i of s)try{let c=await wo(i),u=await se(c);if(u){let h={mediaType:"image/jpeg",base64:u,alt:i.getAttribute("aria-label")||"Gr\xE1fico/Diagrama vetorial da quest\xE3o",source:"svg",captureStatus:"captured"};if(n(h,i))return t}}catch{let c=await mt(i.parentElement||i);if(c){if(n(c,i))return t}else{let u=Ut(i);if(u){let h={mediaType:"image/jpeg",base64:"",alt:i.getAttribute("aria-label")||"Gr\xE1fico vetorial",source:"svg",captureStatus:"text_only",textContext:u};n(h,i)}}}if(t.filter(i=>i.captureStatus==="captured").length<ut){let i=Array.from(o.querySelectorAll("canvas")).filter(c=>L(c)&&!O(c));for(let c of i)try{let u=await me(c),h=await se(u);if(h){let d={mediaType:"image/jpeg",base64:h,alt:c.getAttribute("aria-label")||"Gr\xE1fico Canvas inline",source:"canvas",captureStatus:"captured"};if(n(d,c))return t}}catch{let u=await mt(c.parentElement||c);if(n(u,c))return t}}if(t.filter(i=>i.captureStatus==="captured").length<ut){let i=Array.from(o.querySelectorAll('[style*="background-image"], .option-image, .question-media')).filter(c=>L(c)&&!O(c));for(let c of i){let u=Co(c);if(!u)continue;let h=c.getBoundingClientRect();if(Kt(c,c.getAttribute("aria-label")||"",h.width,h.height))try{let d=await fetch(u,{mode:"cors"});if(d.ok){let m=await d.blob();if(m.type.startsWith("image/")){let p=await createImageBitmap(m),b=await me(p);p.close();let y=await se(b);if(y){let g={mediaType:"image/jpeg",base64:y,alt:"Imagem de fundo da alternativa",source:u.slice(0,2e3),captureStatus:"captured"};if(n(g,c))return t}}}}catch{try{let m=await(await fetch(u,{mode:"no-cors"})).blob();if(m.size>100){let p=await createImageBitmap(m),b=await me(p);p.close();let y=await se(b);if(y&&y.length>100){let g={mediaType:"image/jpeg",base64:y,alt:"Imagem CSS background",source:u.slice(0,2e3),captureStatus:"captured"};if(n(g,c))return t}}}catch{}}}}return t}function Ao(o,e=""){if(typeof document>"u")return!1;let t=o||document.body,a=(e+" "+(t.textContent||"")).toLowerCase();return!!t.querySelector('.celebration-icon, [class*="celebrat" i], [class*="conclu" i], [class*="finish" i], [class*="result" i], [class*="score-screen" i], [data-testid*="completion" i], [data-functional-selector*="game-over" i], .perseus-message-renderer, [data-congratulations]')&&(a.includes("parab\xE9ns")||a.includes("conclu")||a.includes("finaliz")||a.includes("resultado")||a.includes("pontua")||a.includes("sucesso")||a.includes("\u{1F3C6}")||a.includes("game over")||a.includes("great job"))?!0:["parab\xE9ns! lista de exerc\xEDcios conclu\xEDda","exerc\xEDcios conclu\xEDda","lista de exerc\xEDcios conclu\xEDda","atividade conclu\xEDda","atividade finalizada","finalizado com sucesso","finalizada com sucesso","simulado conclu\xEDdo","simulado finalizado","question\xE1rio conclu\xEDdo","question\xE1rio finalizado","voc\xEA concluiu a atividade","voc\xEA concluiu o question\xE1rio","sua resposta foi registrada","todas as perguntas foram respondidas","quiz completed","exercise completed","activity completed","all questions answered","view results","game over","leaderboard","scoreboard","awesome","great job","you got it right","mission complete","your response has been recorded","sua resposta foi registrada"].some(l=>a.includes(l))}var _e=class{active=!1;callbacks;isProcessing=!1;observer=null;mutationTimer=null;heartbeatTimer=null;abortController=null;errorCount=0;resolvedSigs=new Set;lastContentSig="";lastAttemptSig="";lastAttemptTime=0;replanCount=new Map;constructor(e){this.callbacks=e}isActive(){return this.active}start(){this.active||(this.active=!0,this.callbacks.onStatusChange("waiting","> [SYS] Autopilot ENGAGED. Monitorando..."),typeof MutationObserver<"u"&&(this.observer=new MutationObserver(()=>{!this.active||this.isProcessing||(this.mutationTimer&&clearTimeout(this.mutationTimer),this.mutationTimer=window.setTimeout(()=>{this.mutationTimer=null,this.isProcessing||this.checkAndAnalyze()},120))}),this.observer.observe(document.body,{subtree:!0,childList:!0,characterData:!0,attributes:!0})),this.scheduleHeartbeat(),this.checkAndAnalyze())}stop(){if(this.active=!1,this.abortController){try{this.abortController.abort()}catch{}this.abortController=null}this.mutationTimer&&(clearTimeout(this.mutationTimer),this.mutationTimer=null),this.heartbeatTimer&&(clearTimeout(this.heartbeatTimer),this.heartbeatTimer=null),this.observer?.disconnect(),this.observer=null,this.isProcessing=!1,this.resolvedSigs.clear(),this.replanCount.clear(),this.callbacks.onStatusChange("idle","> [SYS] Autopilot DESATIVADO pelo usu\xE1rio.","text-yellow")}scheduleHeartbeat(){this.heartbeatTimer&&clearTimeout(this.heartbeatTimer),this.heartbeatTimer=window.setTimeout(()=>{this.heartbeatTimer=null,this.active&&!this.isProcessing&&this.checkAndAnalyze(),this.active&&this.scheduleHeartbeat()},3e3)}sleep(e){return new Promise(t=>{if(!this.active)return t();let a=null,r=()=>{a&&clearTimeout(a),t()};a=window.setTimeout(t,e),this.abortController?.signal.addEventListener("abort",r,{once:!0})})}async checkAndAnalyze(){if(!(!this.active||this.isProcessing))try{this.isProcessing=!0;let e=Le(!1);if(e||(e=fe()),!this.active)return;if(!e){this.callbacks.onStatusChange("waiting","> [SYS] Monitorando p\xE1gina... Aguardando elementos.");return}if(Ao(e.scope,e.questionText)){this.callbacks.onStatusChange("idle","> [SYS] \u{1F3C6} Atividade conclu\xEDda! Autopilot finalizado.","text-green"),this.stop();return}if(this.callbacks.isManualModeActive?.()){this.callbacks.onStatusChange("waiting","> [SYS] Gabarito manual ativo. Aguardando voc\xEA avan\xE7ar...","text-yellow");return}let t=Pt(e);if(this.resolvedSigs.has(t))return;let a=Date.now();if(t===this.lastAttemptSig&&a-this.lastAttemptTime<1500)return;t!==this.lastContentSig&&this.lastContentSig!==""&&(this.callbacks.onStatusChange("waiting","> [SYS] Nova quest\xE3o detectada! Analisando...","text-green"),this.callbacks.onPageAdvance?.(),this.errorCount=0),this.lastContentSig=t,this.lastAttemptSig=t,this.lastAttemptTime=a;let n=e.controls.filter(s=>s.role==="answer"),l=we(window.location.hostname);if(n.length>0){if(this.callbacks.onStatusChange("analyzing","> [IA] Quest\xE3o detectada. Consultando IA...","text-blue"),!this.active)return;this.abortController=new AbortController;let s=await this.callbacks.onRequestAnalysis(1,this.abortController.signal);if(this.abortController=null,!this.active)return;if(s){if(this.callbacks.onStatusChange("analyzing",`> [IA] (${s.usedModel||"gemini"}) Confian\xE7a: ${(s.confidence*100).toFixed(1)}% | Modo: ${s.mode}`,"text-blue"),this.callbacks.onStatusChange("analyzing",`> [IA] Racioc\xEDnio: ${s.rationale}`,"text-blue"),this.callbacks.onStatusChange("analyzing",`> [IA] A\xE7\xF5es: ${s.actions.length}`,"text-blue"),this.errorCount=0,s.memoryToStore&&this.callbacks.onStatusChange("analyzing",`> [IA] \u{1F9E0} Mem\xF3ria RAG: "${s.memoryToStore}"`,"text-yellow"),s.pageType==="conclusion"){this.callbacks.onStatusChange("idle","> [SYS] Atividade conclu\xEDda! Desligando Autopilot.","text-green"),this.stop();return}this.resolvedSigs.add(t)}else{this.errorCount++;let i=this.errorCount===1?5e3:8e3;this.callbacks.onStatusChange("waiting",`> [AVISO] Falha na an\xE1lise (${this.errorCount}). Aguardando ${i/1e3}s...`,"text-yellow"),await this.sleep(i),this.lastAttemptTime=0}}else{if(this.callbacks.onStatusChange("analyzing","> [IA] P\xE1gina sem controles detectados. Consultando IA...","text-blue"),!this.active)return;this.abortController=new AbortController;let s=await this.callbacks.onRequestAnalysis(1,this.abortController.signal);if(this.abortController=null,!this.active)return;if(s){if(this.callbacks.onStatusChange("analyzing",`> [IA] (${s.usedModel||"gemini"}) Tipo: ${s.pageType} | Modo: ${s.mode}`,"text-blue"),this.callbacks.onStatusChange("analyzing",`> [IA] Racioc\xEDnio: ${s.rationale}`,"text-blue"),s.memoryToStore&&this.callbacks.onStatusChange("analyzing",`> [IA] \u{1F9E0} Absorvido: "${s.memoryToStore}"`,"text-yellow"),s.pageType==="conclusion"){this.callbacks.onStatusChange("idle","> [SYS] Atividade conclu\xEDda! Desligando Autopilot.","text-green"),this.stop();return}s.pageType==="info"?(this.callbacks.onStatusChange("advancing","> [IA] \u{1F4D6} Leitura conclu\xEDda. Avan\xE7ando...","text-green"),await this.sleep(100)):s.pageType==="start"&&(this.callbacks.onStatusChange("advancing","> [SYS] In\xEDcio detectado. Iniciando...","text-blue"),await this.sleep(100)),this.errorCount=0,s.actions.length>0&&this.resolvedSigs.add(t)}else{this.errorCount++;let i=this.errorCount===1?5e3:8e3;this.callbacks.onStatusChange("waiting",`> [AVISO] Falha ao processar p\xE1gina (${this.errorCount}). Aguardando ${i/1e3}s...`,"text-yellow"),await this.sleep(i),this.lastAttemptTime=0}}this.errorCount>=5&&(this.callbacks.onStatusChange("waiting","> [AVISO] Muitas falhas. Reiniciando contadores e aguardando 15s...","text-yellow"),this.errorCount=0,this.lastAttemptTime=0,await this.sleep(15e3))}catch(e){if(!this.active)return;let t=e instanceof Error?e.message:String(e);if(t.includes("cancelada")||t.includes("aborted"))return;/timeout|aborted|network|failed to fetch|cancelad/i.test(t)||this.errorCount++,console.warn("[EasyQuiz Autopilot]",e),this.callbacks.onStatusChange("error",`> [ERRO NO AUTOPILOT] ${t}`,"text-red")}finally{this.abortController=null,this.isProcessing=!1,this.active&&window.setTimeout(()=>void this.checkAndAnalyze(),150)}}};var S={logo:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.8L19.2 8 12 11.2 4.8 8 12 4.8zM4 9.6l7 3.1v7.5l-7-3.5V9.6zm9 10.6v-7.5l7-3.1v7.1l-7 3.5z"/></svg>',rocket:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M13.13 2.81a.5.5 0 0 0-.46-.07c-.42.15-2.08.79-3.9 2.61-2.04 2.04-2.6 4.09-2.73 4.96l-.97.98a1 1 0 0 0-.29.71v2.12a1 1 0 0 0 .29.71l2.83 2.83a1 1 0 0 0 .71.29h2.12a1 1 0 0 0 .71-.29l.98-.97c.87-.13 2.92-.69 4.96-2.73 1.82-1.82 2.46-3.48 2.61-3.9a.5.5 0 0 0-.07-.46l-6.79-6.79zM4.5 16.5l-2.09 2.09a.5.5 0 0 0 .35.85h3.04l.35.35v3.04a.5.5 0 0 0 .85.35L9.09 21.1l-4.59-4.6z"/></svg>',play:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>',stop:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h12v12H6z"/></svg>',code:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>',terminal:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8h16v10zm-12-3l3-3-3-3 1.4-1.4L13.8 12l-4.4 4.4L8 15zm6 0h4v2h-4v-2z"/></svg>',inspector:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>',settings:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.49.49 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>',key:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M7 14c-2.76 0-5-2.24-5-5s2.24-5 5-5c2.42 0 4.44 1.72 4.9 4H22v4h-2v3h-3v-3h-2v3h-3v-3h-2.1c-.46 2.28-2.48 4-4.9 4zm0-7c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>',paste:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 2h-4.18C14.4 .84 13.3 0 12 0c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm7 18H5V4h2v3h10V4h2v16z"/></svg>',edit:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>',trash:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>',eraser:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M15.14 3c-.51 0-1.02.2-1.41.59L2.59 14.73c-.78.78-.78 2.05 0 2.83L6.44 21.4c.78.78 2.05.78 2.83 0l11.14-11.14c.78-.78.78-2.05 0-2.83l-3.86-3.84c-.39-.39-.9-.59-1.41-.59zm.71 2.71l3.15 3.15-3.15 3.15-3.15-3.15 3.15-3.15zm-4.57 4.57l3.15 3.15-4.57 4.57H6.71l-3-3 7.57-7.57z"/></svg>',save:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/></svg>',analyze:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L3 14h8l-2 8 12-12h-8l2-8z"/></svg>',apply:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>',close:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>',chevronRight:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>',chevronLeft:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>',eye:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>',eyeOff:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.44-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.17c0-1.66-1.34-3-3-3l-.17.02z"/></svg>',check:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>',clock:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>',copy:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>',refresh:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg>',chip:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4h12v16H6V4zm2 2v12h8V6H8zm-4 3h2v2H4V9zm0 4h2v2H4v-2zm16-4h2v2h-2V9zm0 4h2v2h-2v-2zM9 2h2v2H9V2zm4 0h2v2h-2V2zm-4 18h2v2H9v-2zm4 0h2v2h-2v-2z"/></svg>',moreVertical:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>',minimize:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M19 13H5v-2h14v2z"/></svg>',maximize:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/></svg>',dragHandle:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M10 9h4V6h-4v3zm0 5h4v-3h-4v3zm0 5h4v-3h-4v3zM4 9h4V6H4v3zm0 5h4v-3H4v3zm0 5h4v-3H4v3zm12-10V6h4v3h-4zm0 5h4v-3h-4v3zm0 5h4v-3h-4v3z"/></svg>',list:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/></svg>',folderTree:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6 10H6v-2h8v2zm4-4H6v-2h12v2z"/></svg>',folder:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/></svg>',file:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>',stopwatch:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M15 1H9v2h6V1zm-4 13h2V8h-2v6zm8.03-6.61l1.42-1.42c-.43-.51-.9-.99-1.41-1.41l-1.42 1.42A8.962 8.962 0 0 0 12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9a8.994 8.994 0 0 0 7.03-14.61zM12 20c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"/></svg>',plus:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>',listPlus:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h8v-2H7v2zm0 4h8v-2H7v2zM7 7v2h8V7H7zm11 6h-2v2h-2v2h2v2h2v-2h2v-2h-2v-2z"/></svg>',sparkles:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M9 21l-2.5-5.5L1 13l5.5-2.5L9 5l2.5 5.5L17 13l-5.5 2.5L9 21zm9.5-12.5l-1.5-3.5-3.5-1.5 3.5-1.5 1.5-3.5 1.5 3.5 3.5 1.5-3.5 1.5-1.5 3.5z"/></svg>'};var Ke=class{element=null;shadow;isMinimized=!1;currentPlan=null;isDragging=!1;dragStartX=0;dragStartY=0;initialLeft=25;initialTop=25;onAdvanceCallback;constructor(e,t){this.shadow=e,this.onAdvanceCallback=t,this.initGlobalListeners()}initGlobalListeners(){window.addEventListener("popstate",()=>this.handlePageNavigated()),window.addEventListener("hashchange",()=>this.handlePageNavigated()),document.addEventListener("click",e=>{if(!this.isOpen())return;let t=e.target;if(!t||this.shadow.contains(t)||t.closest("#easyquiz-shadow-root"))return;let a=t.closest('button, [role="button"], a, input[type="submit"]');if(a){let r=(a.textContent||a.value||"").toLowerCase();/pr[oó]xim|avan[cç]|continu|verific|enviar|submit|confirm|checar|validar|next/i.test(r)&&setTimeout(()=>{this.isOpen()&&this.handlePageNavigated()},800)}},!0)}handlePageNavigated(){this.isOpen()&&(this.hide(),this.onAdvanceCallback?.())}isOpen(){return this.element!==null&&this.element.style.display!=="none"}show(e){this.currentPlan=e,this.element||this.createElement(),this.renderContent(),this.element&&(this.element.style.display="flex")}hide(){this.element&&(this.element.style.display="none")}minimize(){this.isMinimized=!0,this.element&&this.element.classList.add("minimized")}restore(){this.isMinimized=!1,this.element&&this.element.classList.remove("minimized")}createElement(){this.element=document.createElement("div"),this.element.className="eq-floating-hud",this.element.style.left=`${this.initialLeft}px`,this.element.style.top=`${this.initialTop}px`,this.element.innerHTML=`
      <!-- P\xEDlula compacta quando minimizado -->
      <div class="eq-fah-pill" id="eq-fah-pill" title="Clique para expandir gabarito interativo">
        <span class="eq-fah-pill-icon">${S.list}</span>
        <span id="eq-fah-pill-text">Gabarito Manual</span>
        <span class="eq-fah-pill-badge" id="eq-fah-pill-badge">0</span>
      </div>

      <!-- Cabe\xE7alho com barra de arraste -->
      <div class="eq-fah-header" id="eq-fah-header">
        <div class="eq-fah-title">
          <span style="display:flex; align-items:center;">${S.dragHandle}</span>
          <span>Gabarito Manual Interativo</span>
        </div>
        <div class="eq-fah-actions">
          <button class="eq-fah-btn" id="eq-fah-copy-md-btn" title="Copiar tudo formatado em Markdown">${S.copy}</button>
          <button class="eq-fah-btn" id="eq-fah-min-btn" title="Minimizar para p\xEDlula flutuante">${S.minimize}</button>
          <button class="eq-fah-btn" id="eq-fah-close-btn" title="Fechar gabarito">${S.close}</button>
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
    `,this.shadow.appendChild(this.element),this.element.querySelector("#eq-fah-pill").addEventListener("click",()=>this.restore()),this.element.querySelector("#eq-fah-min-btn").addEventListener("click",()=>this.minimize()),this.element.querySelector("#eq-fah-close-btn").addEventListener("click",()=>this.hide());let r=this.element.querySelector("#eq-fah-copy-md-btn");r.addEventListener("click",()=>this.copyMarkdownToClipboard(r));let n=this.element.querySelector("#eq-fah-copy-all-btn");n.addEventListener("click",()=>this.copyMarkdownToClipboard(n));let l=this.element.querySelector("#eq-fah-header");this.setupDraggable(l)}setupDraggable(e){let t=a=>{if(a.target.closest(".eq-fah-btn"))return;a.preventDefault(),this.isDragging=!0,this.dragStartX=a.clientX,this.dragStartY=a.clientY;let r=this.element.getBoundingClientRect();this.initialLeft=r.left,this.initialTop=r.top;let n=s=>{if(!this.isDragging||!this.element)return;let i=s.clientX-this.dragStartX,c=s.clientY-this.dragStartY,u=Math.max(10,window.innerWidth-this.element.offsetWidth-10),h=Math.max(10,window.innerHeight-this.element.offsetHeight-10),d=Math.min(Math.max(10,this.initialLeft+i),u),m=Math.min(Math.max(10,this.initialTop+c),h);this.element.style.left=`${d}px`,this.element.style.top=`${m}px`},l=()=>{this.isDragging=!1,window.removeEventListener("mousemove",n),window.removeEventListener("mouseup",l)};window.addEventListener("mousemove",n),window.addEventListener("mouseup",l)};e.addEventListener("mousedown",t)}renderContent(){if(!this.element||!this.currentPlan)return;let e=this.element.querySelector("#eq-fah-body"),t=this.element.querySelector("#eq-fah-pill-text"),a=this.element.querySelector("#eq-fah-pill-badge");e.innerHTML="";let r=this.currentPlan,n=r.actions.filter(m=>m.t==="drag"),l=r.actions.filter(m=>{if(m.t!=="val")return!1;let p=q(m.id||"").toLowerCase();return!/continu|avan[cç]|pr[oó]xim|submet|enviar|check|verific/i.test(p)}),s=r.actions.filter(m=>m.t==="clk"||m.t==="chk"),i=r.actions.filter(m=>m.t==="sel"),c=n.length||l.length||s.length||i.length,u=document.createElement("div");u.className="eq-fah-meta";let h=document.createElement("span");h.textContent=`Modo: ${r.mode.replace("_"," ")}`;let d=document.createElement("span");if(d.className="eq-fah-meta-badge",d.textContent=`${Math.round(r.confidence*100)}% Confian\xE7a`,u.append(h,d),e.appendChild(u),n.length>0||r.mode==="categorizacao"||r.mode==="arrastar_soltar"){t.textContent=`Categoriza\xE7\xE3o (${n.length} itens)`,a.textContent=String(n.length);let m={};for(let p of n){let b=q(p.to)||"Geral";m[b]||(m[b]=[]),m[b].push(q(p.from))}for(let[p,b]of Object.entries(m)){let y=document.createElement("div"),g=/fato|true|verdadeiro|sim/i.test(p),f=/opini[aã]o|false|falso|n[aã]o/i.test(p);y.className=`eq-fah-group ${g?"group-fato":f?"group-opiniao":""}`;let v=document.createElement("div");v.className="eq-fah-group-title",v.textContent=`\u{1F4C1} ${p} (${b.length})`,y.appendChild(v);let x=document.createElement("div");x.className="eq-fah-group-items";for(let T of b){let w=document.createElement("div");w.className="eq-fah-item";let E=document.createElement("span");E.className="eq-fah-item-text",E.textContent=T,w.appendChild(E);let C=document.createElement("button");C.className="eq-fah-copy-inline",C.textContent="Copiar",C.addEventListener("click",()=>{navigator.clipboard.writeText(T),C.textContent="\u2713 Copiado",setTimeout(()=>C.textContent="Copiar",1200)}),w.appendChild(C),x.appendChild(w)}y.appendChild(x),e.appendChild(y)}}else if(l.length>0){t.textContent=`Preenchimento (${l.length} campos)`,a.textContent=String(l.length);let m=document.createElement("div");m.className="eq-fah-group";let p=document.createElement("div");p.className="eq-fah-group-title",p.textContent="\u{1F4DD} Respostas para os Campos de Texto:",m.appendChild(p);let b=document.createElement("div");b.className="eq-fah-group-items";for(let y=0;y<l.length;y++){let g=l[y],f=document.createElement("div");f.className="eq-fah-item";let v=Me(g.id);(!v||/^[#\.\$]|input|mat-|cell|field|q[0-9]|eq-/i.test(v))&&(v=`Campo ${y+1}`);let x=String(g.v??""),T=document.createElement("div");T.className="eq-fah-field-box";let w=document.createElement("div");w.className="eq-fah-field-label",w.textContent=v,T.appendChild(w);let E=document.createElement("div");E.className="eq-fah-field-val",E.textContent=x,T.appendChild(E),f.appendChild(T);let C=document.createElement("button");C.className="eq-fah-copy-inline",C.textContent="Copiar",C.addEventListener("click",()=>{navigator.clipboard.writeText(x),C.textContent="\u2713 Copiado",setTimeout(()=>C.textContent="Copiar",1200)}),f.appendChild(C),b.appendChild(f)}m.appendChild(b),e.appendChild(m)}else if(s.length>0){t.textContent=`Op\xE7\xF5es (${s.length} marcadas)`,a.textContent=String(s.length);let m=document.createElement("div");m.className="eq-fah-group";let p=document.createElement("div");p.className="eq-fah-group-title",p.textContent="\u{1F3AF} Alternativa(s) Correta(s):",m.appendChild(p);let b=document.createElement("div");b.className="eq-fah-group-items";for(let y=0;y<s.length;y++){let g=s[y],f=document.createElement("div");f.className="eq-fah-item";let v=Me(g.id);(!v||/^(eq-|#|\$|\.|input_|mat-|choice_|radio_|chk_)/i.test(v))&&g.v&&(v=String(g.v)),v=q(v),/^(eq-|#|\$|\.|input_|mat-|choice_|radio_|chk_)/i.test(v)&&(v="");let x="",T=v.match(/^(\([A-Za-z0-9]\)|[A-Za-z0-9][\)\.\:\-])\s*(.*)$/);T?(x=T[1].replace(/[\(\)\.\:\-\s]/g,"").toUpperCase(),v=T[2].trim()||v):s.length>1&&(x=String.fromCharCode(65+y));let w=document.createElement("div");if(w.style.display="flex",w.style.alignItems="center",w.style.gap="8px",w.style.flex="1",x){let I=document.createElement("span");I.className="eq-fah-letter-badge",I.textContent=x,w.appendChild(I)}let E=document.createElement("span");E.className="eq-fah-item-text",E.textContent=v||(x?`Alternativa ${x}`:"Alternativa Selecionada"),w.appendChild(E),f.appendChild(w);let C=document.createElement("button");C.className="eq-fah-copy-inline",C.textContent="Copiar",C.addEventListener("click",()=>{navigator.clipboard.writeText(v||x),C.textContent="\u2713 Copiado",setTimeout(()=>C.textContent="Copiar",1200)}),f.appendChild(C),b.appendChild(f)}m.appendChild(b),e.appendChild(m)}else if(i.length>0){t.textContent=`Sele\xE7\xE3o (${i.length} listas)`,a.textContent=String(i.length);let m=document.createElement("div");m.className="eq-fah-group";let p=document.createElement("div");p.className="eq-fah-group-title",p.textContent="\u{1F4CB} Op\xE7\xF5es para Selecionar na Lista:",m.appendChild(p);let b=document.createElement("div");b.className="eq-fah-group-items";for(let y=0;y<i.length;y++){let g=i[y],f=document.createElement("div");f.className="eq-fah-item";let v=Me(g.id);(!v||/^[#\.\$]|select|input|mat-|cell|field|q[0-9]|eq-/i.test(v))&&(v=`Lista ${y+1}`);let w=(Array.isArray(g.v)?g.v:[String(g.v??"")]).map(k=>{let A=H(g.id,void 0,!0)||H(q(g.id),void 0,!0),z=A instanceof HTMLSelectElement?A:A?.querySelector("select");if(z){let D=q(k).toLowerCase();for(let K=0;K<z.options.length;K++){let N=z.options[K];if(N.value.toLowerCase()===D||q(N.textContent).toLowerCase()===D){let B=q(N.textContent);if(B&&!B.toLowerCase().includes("selecione"))return B}}}return k}).join(", "),E=document.createElement("div");E.className="eq-fah-field-box";let C=document.createElement("div");C.className="eq-fah-field-label",C.textContent=v,E.appendChild(C);let I=document.createElement("div");I.className="eq-fah-field-val",I.textContent=w,E.appendChild(I),f.appendChild(E);let M=document.createElement("button");M.className="eq-fah-copy-inline",M.textContent="Copiar",M.addEventListener("click",()=>{navigator.clipboard.writeText(w),M.textContent="\u2713 Copiado",setTimeout(()=>M.textContent="Copiar",1200)}),f.appendChild(M),b.appendChild(f)}m.appendChild(b),e.appendChild(m)}else{t.textContent="Gabarito",a.textContent="0";let m=document.createElement("div");m.style.padding="10px",m.style.color="#888",m.textContent="Nenhuma resposta direta para exibir.",e.appendChild(m)}if(r.rationale){let m=document.createElement("div");m.className="eq-fah-rationale",m.textContent=`\u{1F4A1} Racioc\xEDnio da IA: ${r.rationale}`,e.appendChild(m)}}generateMarkdown(){if(!this.currentPlan)return"";let e=this.currentPlan,t=[];t.push("# Gabarito da Quest\xE3o \u2014 EasyQuiz Pro"),t.push(`- **Modo:** ${e.mode}`),t.push(`- **Confian\xE7a:** ${(e.confidence*100).toFixed(0)}%`),t.push("");let a=e.actions.filter(s=>s.t==="drag"),r=e.actions.filter(s=>s.t==="val"),n=e.actions.filter(s=>s.t==="clk"||s.t==="chk"),l=e.actions.filter(s=>s.t==="sel");if(a.length>0){t.push("## \u{1F4C2} Categoriza\xE7\xE3o:");let s={};for(let i of a){let c=q(i.to)||"Geral";s[c]||(s[c]=[]),s[c].push(q(i.from))}for(let[i,c]of Object.entries(s)){t.push(`### Categoria: ${i}`);for(let u of c)t.push(`- ${u}`);t.push("")}}else if(r.length>0){t.push("## \u270F\uFE0F Respostas para Preenchimento:");for(let s of r){let i=q(s.id);t.push(`- **${i||"Campo"}:** \`${s.v}\``)}t.push("")}else if(n.length>0){t.push("## \u2705 Alternativas Corretas:");for(let s=0;s<n.length;s++){let i=n[s],c=Me(i.id);(!c||/^(eq-|#|\$|\.|input_|mat-|choice_|radio_|chk_)/i.test(c))&&i.v&&(c=String(i.v)),c=q(c),/^(eq-|#|\$|\.|input_|mat-|choice_|radio_|chk_)/i.test(c)&&(c="");let u=n.length>1?`${String.fromCharCode(65+s)}) `:"";t.push(`- [x] ${u}${c||"Alternativa "+String.fromCharCode(65+s)}`)}t.push("")}else if(l.length>0){t.push("## \u{1F4CB} Op\xE7\xF5es Selecionadas em Lista:");for(let s of l){let i=q(s.id)||"Lista",c=Array.isArray(s.v)?s.v.join(", "):String(s.v??"");t.push(`- **${i}:** \`${c}\``)}t.push("")}return e.rationale&&(t.push("---"),t.push(`**\u{1F4A1} Racioc\xEDnio:** ${e.rationale}`)),t.join(`
`)}copyMarkdownToClipboard(e){let t=this.generateMarkdown();t&&navigator.clipboard.writeText(t).then(()=>{let a=e.innerHTML;e.id==="eq-fah-copy-md-btn"?e.innerHTML='<span style="font-size:10px; color:#00ffcc; font-weight:bold;">\u2713</span>':e.innerHTML="\u2713 Copiado!",setTimeout(()=>{e.innerHTML=a},1500)})}};var jt=`
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&display=swap');

  :host {
    all: initial;
    color-scheme: dark;
    font-family: 'Nunito', 'gg sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-size: 13px;
    line-height: 1.5;

    /* === Tema Discord 2026 === */
    --eq-bg:             #1e1f22;  /* fundo principal */
    --eq-surface:        #2b2d31;  /* painel / cards */
    --eq-surface-raised: #313338;  /* elementos elevados */
    --eq-surface-hover:  #383a40;  /* hover */
    --eq-border:         #3f4147;  /* bordas */
    --eq-text:           #b5bac1;  /* texto principal */
    --eq-text-bright:    #f2f3f5;  /* texto destaque */
    --eq-muted:          #6d6f78;  /* texto secund\xE1rio */
    --eq-accent:         #5865f2;  /* Blurple */
    --eq-accent-hover:   #4752c4;
    --eq-success:        #23a55a;  /* verde Discord */
    --eq-warning:        #f0b232;  /* amarelo Discord */
    --eq-danger:         #da373c;  /* vermelho Discord */
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
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
    border-radius: 8px 0 0 8px;
    color: var(--eq-accent);
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
    height: 42px;
    padding: 0 16px;
    background: var(--eq-surface);
    border: 1px solid var(--eq-border);
    border-radius: 21px;
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
    color: var(--eq-accent);
  }

  .eq-launcher-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--eq-success);
    transition: background 0.2s;
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
    background: var(--eq-bg);
    border-left: 1px solid var(--eq-border);
    color: var(--eq-text);
    display: flex;
    flex-direction: row;
    box-shadow: -8px 0 32px rgba(0, 0, 0, 0.5);
    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    transform: translateX(0);
    overflow: visible;
  }

  .eq-sidebar.eq-collapsed {
    transform: translateX(100%);
  }

  .eq-sidebar.eq-collapsed .eq-dock-toggle-icon {
    transform: rotate(180deg);
  }

  /* ===== ACTIVITY BAR VERTICAL (COLUNA EM P\xC9 ESTILO VS CODE) ===== */
  .eq-activity-bar {
    width: 48px;
    min-width: 48px;
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
    background: transparent;
    border: none;
    border-radius: 4px;
    color: var(--eq-muted);
    cursor: pointer;
    transition: all 0.15s;
  }

  .eq-activity-btn:hover {
    color: var(--eq-text-bright);
  }

  .eq-activity-btn.active {
    color: var(--eq-text-bright);
  }

  .eq-activity-indicator {
    position: absolute;
    left: -2px;
    top: 6px;
    bottom: 6px;
    width: 3px;
    background: var(--eq-accent);
    border-radius: 0 3px 3px 0;
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
    background: var(--eq-surface);
    overflow: hidden;
    min-width: 0;
  }

  /* Cabe\xE7alho */
  .eq-header {
    background: var(--eq-surface);
    border-bottom: 1px solid var(--eq-border);
    height: 40px;
    min-height: 40px;
    padding: 0 14px;
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
    color: var(--eq-accent);
    display: flex;
    align-items: center;
  }

  .eq-brand-name {
    font-size: 13px;
    font-weight: 600;
    color: var(--eq-text-bright);
    letter-spacing: 0.02em;
  }

  .eq-brand-badge {
    background: rgba(88, 101, 242, 0.15);
    border: 1px solid rgba(88, 101, 242, 0.35);
    color: var(--eq-accent);
    font-size: 9px;
    font-weight: 800;
    padding: 2px 6px;
    border-radius: 3px;
    text-transform: uppercase;
    letter-spacing: 0.06em;
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
    animation: eq-view-fade 0.2s ease-out;
  }

  @keyframes eq-view-fade {
    0% { opacity: 0; transform: translateY(4px); }
    100% { opacity: 1; transform: translateY(0); }
  }

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
    background: var(--eq-surface-raised);
    border: 1px solid var(--eq-border);
    border-radius: 6px;
    padding: 6px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
    z-index: 100;
    display: flex;
    flex-direction: column;
    gap: 2px;
    animation: eq-menu-pop 0.15s ease-out;
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
    transition: background 0.1s, color 0.1s;
  }

  .eq-context-item:hover {
    background: var(--eq-accent);
    color: var(--eq-text-bright);
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
    background: var(--eq-accent);
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
    background: var(--eq-accent-hover);
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
    background: var(--eq-surface-raised);
    border: 1px solid var(--eq-border);
    border-radius: 4px;
    color: var(--eq-text);
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
    background: var(--eq-surface-hover);
    border-color: var(--eq-muted);
    color: var(--eq-text-bright);
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
`;var Ft=(()=>{try{if(typeof window.trustedTypes?.createPolicy=="function")return window.trustedTypes.createPolicy("easyquiz-ui#html",{createHTML:o=>o})}catch{}return null})();function So(o,e){try{if(Ft){o.innerHTML=Ft.createHTML(e);return}}catch{}try{if(typeof o.setHTMLUnsafe=="function"){o.setHTMLUnsafe(e);return}}catch{}o.innerHTML=e}var Lo=[{value:"",label:"Detec\xE7\xE3o Autom\xE1tica"},{value:"escolha_unica",label:"M\xFAltipla Escolha (\xDAnica)"},{value:"escolha_multipla",label:"M\xFAltipla Escolha (V\xE1rias)"},{value:"categorizacao",label:"Categoriza\xE7\xE3o / Grupos"},{value:"arrastar_soltar",label:"Arrastar e Soltar (Drag & Drop)"},{value:"ordenacao",label:"Ordena\xE7\xE3o / Sequ\xEAncia"},{value:"verdadeiro_falso",label:"Verdadeiro / Falso"},{value:"texto_livre",label:"Texto Livre / Dissertativa"},{value:"preenchimento",label:"Preenchimento de Lacunas"}],Mo=[{value:"smart",label:"Inteligente (Auto-H\xEDbrido)"},{value:"command",label:"Apenas Comando (Seguro)"},{value:"javascript",label:"Apenas JS Nativo (Avan\xE7ado)"}],Ue=class{host;shadow;callbacks;autopilot;floatingAnswers;initialSettings;isCollapsed=!1;activeTab="resolver";isBusy=!1;stopwatchInterval=null;stopwatchStartTime=0;latestPlan=null;latestContext=null;latestImages=[];latestImageDescriptions=[];latestPromptText="";metricsLiveTime;metricsLiveStatus;metricsTotalBadge;metricTotalTime;metricAvgTime;metricTotalCount;metricsHistoryList;metricsHistoryCount;metricsCopyBtn;metricsResetBtn;currentQuestionStartTime=0;questionLiveTimerInterval=null;liveDebugTerminal;dbgModel;dbgLatency;dbgSplitTokens;dbgTotalTokens;dbgErrorCard;dbgErrorText;dbgPromptLen;dbgPromptView;dbgContextView;dbgRawRespView;dbgCountAll;dbgCountError;dbgCountAi;dbgCountDom;logEntries=[];activeLogFilter="all";autoScrollLogs=!0;lastErrorMsg=null;_autopilotAnalyzingShown=!1;progressContainer;progressBar;progressLabel;progressVal;contextTreeContainer;launcherBtn;launcherDot;dockToggleBtn;sidebarEl;apToggleBtn;apConsole;executionConsole;dotPulseAp;statusTextAp;stopwatchAp;dotPulseAdv;statusTextAdv;stopwatchAdv;inspModel;inspLatency;inspTokens;inspPrompt;inspRationale;inspActions;copyPromptBtn;apiKeyInput;keyContextMenu;keyMoreBtn;keysListEl;keysBadgeEl;modelSelect;modeSelect;engineSelect;dryRunCheckbox;autoApplyCheckbox;autoAdvanceCheckbox;hostDarkModeCheckbox;useVisionCheckbox;analyzeBtn;applyBtn;resultContainer;constructor(e,t){this.initialSettings=e,this.callbacks=t,this.autopilot=new _e({onStatusChange:(s,i,c)=>{this.logToConsole(i,c),s==="analyzing"?this._autopilotAnalyzingShown||(this._autopilotAnalyzingShown=!0,this.setBusy(!0,"Autopilot: IA analisando...")):s==="advancing"||s==="waiting"?(this._autopilotAnalyzingShown=!1,this.setBusy(!1),this.updateAutopilotUi(!0)):s==="idle"?(this._autopilotAnalyzingShown=!1,this.setBusy(!1),this.updateAutopilotUi(!1),i.includes("conclus\xE3o")||i.includes("finalizada")||i.includes("Parab\xE9ns")?this.setStatus("Atividade conclu\xEDda com sucesso! Autopilot finalizado.","success"):this.setStatus("Autopilot desativado.","info")):s==="error"&&(this._autopilotAnalyzingShown=!1,this.setBusy(!1),this.updateAutopilotUi(!1),this.setStatus("Autopilot interrompido por erro.","error"))},onRequestAnalysis:async(s,i)=>{try{return await this.callbacks.onAnalyze(s,i,!0)||null}catch{return null}},isManualModeActive:()=>this.floatingAnswers?.isOpen()??!1,onPageAdvance:()=>{this.floatingAnswers?.hide()}}),this.host=document.createElement("div"),this.host.id="easyquiz-shadow-root",this.host.style.position="fixed",this.host.style.top="0",this.host.style.left="0",this.host.style.width="100vw",this.host.style.height="100vh",this.host.style.zIndex="2147483647",this.host.style.pointerEvents="none",this.shadow=this.host.attachShadow({mode:"open"}),So(this.shadow,`
      <style>${jt}</style>

      <!-- Bot\xE3o Flutuante Inferior Renovado (C\xE1psula com Status ao Vivo) -->
      <button class="eq-launcher" type="button" title="Abrir / Recolher EasyQuiz (Alt+Q)">
        <span class="eq-launcher-icon">${S.logo}</span>
        <span>EasyQuiz</span>
        <span class="eq-launcher-dot" id="eq-launcher-dot"></span>
      </button>

      <!-- Sidebar Fixa Lateral Direita Estilo VS Code -->
      <aside class="eq-sidebar" aria-label="EasyQuiz Sidebar">
        <!-- Aba Retr\xE1til na Borda Esquerda -->
        <button class="eq-dock-toggle" id="eq-dock-toggle" type="button" title="Recolher / Expandir Painel (Alt+Q)">
          <span class="eq-dock-toggle-icon">${S.chevronRight}</span>
          <span class="eq-dock-toggle-label">EQ</span>
        </button>
           <!-- Activity Bar Vertical na Esquerda (Estilo VS Code - Apenas \xCDcones) -->
          <nav class="eq-activity-bar" role="tablist" aria-label="Atalhos">
            <div class="eq-activity-top">
              <button class="eq-activity-btn active" id="eq-tab-resolver" role="tab" title="Resolver (Opera\xE7\xF5es Atuais)">
                <span class="eq-activity-indicator"></span>
                <span class="eq-activity-icon">${S.rocket}</span>
              </button>

              <button class="eq-activity-btn" id="eq-tab-brain" role="tab" title="C\xE9rebro da IA (Contexto e Inspe\xE7\xE3o)">
                <span class="eq-activity-indicator"></span>
                <span class="eq-activity-icon">${S.chip}</span>
              </button>

              <button class="eq-activity-btn" id="eq-tab-metrics" role="tab" title="M\xE9tricas & Cron\xF4metro (Tempo por Quest\xE3o e Hist\xF3rico)">
                <span class="eq-activity-indicator"></span>
                <span class="eq-activity-icon">${S.stopwatch}</span>
              </button>

              <button class="eq-activity-btn" id="eq-tab-debug" role="tab" title="Terminal & Debug Output (Logs, Tokens, Prompts, Erros)">
                <span class="eq-activity-indicator"></span>
                <span class="eq-activity-icon">${S.terminal}</span>
              </button>
            </div>

            <div class="eq-activity-bottom">
              <button class="eq-activity-btn" id="eq-tab-settings" role="tab" title="Configura\xE7\xF5es e Ajustes Avan\xE7ados">
                <span class="eq-activity-indicator"></span>
                <span class="eq-activity-icon">${S.settings}</span>
              </button>
            </div>
          </nav>

          <!-- Corpo Principal da Sidebar -->
          <main class="eq-sidebar-body">
            <!-- Cabe\xE7alho VS Code -->
            <header class="eq-header">
              <div class="eq-brand">
                <span class="eq-brand-icon">${S.logo}</span>
                <span class="eq-brand-name">EasyQuiz</span>
                <span class="eq-brand-badge">SUPREME</span>
                <span id="eq-active-model-badge" style="display:none; font-size:9px; font-weight:700; padding:1px 5px; border-radius:3px; background:rgba(88,101,242,0.2); border:1px solid rgba(88,101,242,0.4); color:#7983f5; letter-spacing:0.04em; white-space:nowrap;"></span>
              </div>
              <div class="eq-header-tools">
                <button class="eq-icon-btn" id="eq-min-btn" type="button" title="Minimizar (Alt+Q)">${S.chevronRight}</button>
                <button class="eq-icon-btn" id="eq-close-btn" type="button" title="Fechar">${S.close}</button>
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
                <div class="eq-operation-header">
                  <div>
                    <div class="eq-eyebrow">OPERA\xC7\xC3O ATUAL</div>
                    <h1 class="eq-operation-title">Resolver quest\xE3o</h1>
                    <p class="eq-operation-subtitle">Analise o contexto e aplique a resposta sugerida.</p>
                  </div>
                  <span class="eq-operation-state" id="eq-operation-state">Pronto</span>
                </div>

                <div class="eq-operation-actions">
                  <button class="eq-btn-primary" id="eq-analyze-btn" type="button">${S.analyze} Analisar quest\xE3o</button>
                  <button class="eq-btn-secondary" id="eq-apply-btn" type="button">${S.apply} Aplicar respostas</button>
                </div>

                <div style="display: flex; gap: 8px; width: 100%; align-items: center;">
                  <button class="eq-btn-primary" id="eq-ap-toggle-btn" type="button" style="flex: 1;">
                    ${S.play} INICIAR AUTOPILOT
                  </button>
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
                  <button class="eq-btn-secondary" id="eq-open-hud-btn" type="button">${S.list} Abrir respostas dispon\xEDveis</button>
                </div>

                <!-- Status & Stopwatch Card -->
                <div class="eq-status-card">
                  <div class="eq-status-card-header">
                    <div class="eq-ai-indicator">
                      <span class="eq-dot-pulse" id="eq-dot-ap"></span>
                      <span>Status da IA</span>
                    </div>
                    <div class="eq-stopwatch" id="eq-stopwatch-ap">
                      ${S.clock} <span>0.00s</span>
                    </div>
                  </div>
                  <div class="eq-status-text" id="eq-status-text-ap">
                    Pronto para iniciar. O Autopilot responder\xE1 e avan\xE7ar\xE1 as quest\xF5es de forma autom\xE1tica.
                  </div>
                </div>

                <!-- Console Terminal Oculto (Apenas para Autopilot Interno) -->
                <div class="eq-terminal" id="eq-ap-console" style="display: none;"></div>
                <div class="eq-terminal eq-terminal-execution" id="eq-execution-console" style="display: none;"></div>
                
                <div class="eq-footer-note" style="margin-top: auto;">H\xEDbrido 4.0 \u2022 RAG + AST + Vision (Opt-in)</div>
              </div>

              <!-- TAB 2: C\xC9REBRO DA IA -->
              <div class="eq-view-pane" id="eq-view-brain" style="display: none;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <div class="eq-section-title" style="margin: 0;">
                    <span>Explorador de Contexto & RAG</span>
                  </div>
                  <div style="display: flex; gap: 4px;">
                    <button class="eq-icon-btn" id="eq-refresh-context-btn" type="button" title="Atualizar Varredura em Tempo Real" style="width: 28px; height: 28px;">
                      ${S.refresh}
                    </button>
                    <button class="eq-icon-btn" id="eq-ap-clear-memory" type="button" title="Limpar Mem\xF3ria Contextual (RAG)" style="width: 28px; height: 28px; color: #ff5555;">
                      ${S.eraser}
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
                      ${S.copy} Copiar
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
                    ${S.copy} Copiar Relat\xF3rio
                  </button>
                  <button class="eq-btn-secondary danger" id="eq-metrics-reset-btn" type="button">
                    ${S.trash} Zerar M\xE9tricas
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
                    <span>\u26A0\uFE0F \xDAltimo Erro / Falha Registrada</span>
                    <button class="eq-icon-btn" id="eq-dbg-copy-error-btn" type="button" title="Copiar Erro" style="width: 20px; height: 20px;">
                      ${S.copy}
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
                        ${S.copy}
                      </button>
                      <button class="eq-icon-btn" id="eq-dbg-clear-logs" type="button" title="Limpar Console" style="width: 26px; height: 26px; color: #ff5555;">
                        ${S.eraser}
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
                        ${S.copy} Copiar
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
                      ${S.copy} Copiar JSON
                    </button>
                  </div>
                  <div class="eq-code-block" id="eq-dbg-context-view" style="max-height: 110px;">Aguardando captura de contexto...</div>
                </div>

                <!-- Resposta Bruta da IA -->
                <div class="eq-field-group">
                  <div class="eq-section-title">
                    <span>Resposta Bruta da IA (Raw Output)</span>
                    <button class="eq-btn-secondary" id="eq-dbg-copy-raw-resp" type="button" style="height: 24px; padding: 0 6px; font-size: 10px;">
                      ${S.copy} Copiar Resposta
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
                      <span id="eq-keys-chevron" style="display:inline-flex;transition:transform 0.2s;">${S.chevronRight}</span>
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
                      <span class="eq-input-prefix-icon">${S.key}</span>
                      <input id="eq-api-key" class="eq-input" type="password" placeholder="Adicionar nova chave AIzaSy..." autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" />
                      <button class="eq-icon-btn" id="eq-key-save" type="button" title="Adicionar Chave">${S.plus}</button>
                      <button class="eq-icon-btn" id="eq-key-more-btn" type="button" title="Mais Op\xE7\xF5es das Chaves">${S.moreVertical}</button>
                    </div>

                    <!-- Context Menu Suspenso Din\xE2mico -->
                    <div class="eq-context-menu" id="eq-key-context-menu" hidden>
                      <button class="eq-context-item" id="eq-menu-prompt" type="button">
                        <span class="eq-item-icon">${S.edit}</span>
                        <span class="eq-item-text">Inserir via Janela Nativa</span>
                        <span class="eq-item-badge">Bypass</span>
                      </button>
                      <button class="eq-context-item" id="eq-menu-paste" type="button">
                        <span class="eq-item-icon">${S.paste}</span>
                        <span class="eq-item-text">Colar da \xC1rea de Transfer\xEAncia</span>
                      </button>
                      <button class="eq-context-item" id="eq-menu-toggle-vis" type="button">
                        <span class="eq-item-icon" id="eq-menu-vis-icon">${S.eye}</span>
                        <span class="eq-item-text" id="eq-menu-vis-text">Mostrar/Ocultar Campo</span>
                      </button>
                      <button class="eq-context-item" id="eq-menu-clear" type="button">
                        <span class="eq-item-icon">${S.eraser}</span>
                        <span class="eq-item-text">Limpar Campo</span>
                      </button>
                      <div class="eq-context-divider"></div>
                      <button class="eq-context-item" id="eq-menu-bulk" type="button">
                        <span class="eq-item-icon">${S.listPlus}</span>
                        <span class="eq-item-text">Importar Chaves em Lote</span>
                        <span class="eq-item-badge">Novo</span>
                      </button>
                      <button class="eq-context-item" id="eq-menu-edit-text" type="button">
                        <span class="eq-item-icon">${S.edit}</span>
                        <span class="eq-item-text">Ver / Editar Chaves como Texto</span>
                      </button>
                      <div class="eq-context-divider"></div>
                      <button class="eq-context-item" id="eq-menu-test" type="button">
                        <span class="eq-item-icon">${S.sparkles}</span>
                        <span class="eq-item-text">Testar Todas as Chaves</span>
                      </button>
                      <button class="eq-context-item danger" id="eq-menu-delete-all" type="button">
                        <span class="eq-item-icon">${S.trash}</span>
                        <span class="eq-item-text">Apagar Todas as Chaves</span>
                      </button>
                      <button class="eq-context-item danger" id="eq-menu-reset" type="button">
                        <span class="eq-item-icon">${S.trash}</span>
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
                    ${S.trash} Resetar Todos os Dados e Mem\xF3ria
                  </button>
                </div>

                <div class="eq-footer-note" style="margin-top: auto;">Configura\xE7\xF5es salvas localmente no navegador</div>
              </div>
            </div>
          </main>
        </aside>
    `),this.launcherBtn=this.shadow.querySelector(".eq-launcher"),this.launcherDot=this.shadow.querySelector("#eq-launcher-dot"),this.dockToggleBtn=this.shadow.querySelector("#eq-dock-toggle"),this.sidebarEl=this.shadow.querySelector(".eq-sidebar"),this.apToggleBtn=this.shadow.querySelector("#eq-ap-toggle-btn"),this.apConsole=this.shadow.querySelector("#eq-ap-console"),this.executionConsole=this.shadow.querySelector("#eq-execution-console"),this.progressContainer=this.shadow.querySelector("#eq-progress-container"),this.progressBar=this.shadow.querySelector("#eq-progress-bar"),this.progressLabel=this.shadow.querySelector("#eq-progress-label"),this.progressVal=this.shadow.querySelector("#eq-progress-val"),this.contextTreeContainer=this.shadow.querySelector("#eq-tree-container"),this.dotPulseAp=this.shadow.querySelector("#eq-dot-ap"),this.statusTextAp=this.shadow.querySelector("#eq-status-text-ap"),this.stopwatchAp=this.shadow.querySelector("#eq-stopwatch-ap span"),this.dotPulseAdv=this.dotPulseAp,this.statusTextAdv=this.statusTextAp,this.stopwatchAdv=this.stopwatchAp,this.inspModel=this.shadow.querySelector("#eq-insp-model"),this.inspLatency=this.shadow.querySelector("#eq-insp-latency"),this.inspTokens=this.shadow.querySelector("#eq-insp-tokens"),this.inspPrompt=this.shadow.querySelector("#eq-insp-prompt"),this.inspRationale=this.shadow.querySelector("#eq-insp-rationale"),this.inspActions=this.shadow.querySelector("#eq-insp-actions"),this.copyPromptBtn=this.shadow.querySelector("#eq-copy-prompt-btn"),this.liveDebugTerminal=this.shadow.querySelector("#eq-live-debug-terminal"),this.dbgModel=this.shadow.querySelector("#eq-dbg-model"),this.dbgLatency=this.shadow.querySelector("#eq-dbg-latency"),this.dbgSplitTokens=this.shadow.querySelector("#eq-dbg-split-tokens"),this.dbgTotalTokens=this.shadow.querySelector("#eq-dbg-total-tokens"),this.dbgErrorCard=this.shadow.querySelector("#eq-dbg-error-card"),this.dbgErrorText=this.shadow.querySelector("#eq-dbg-error-text"),this.dbgPromptLen=this.shadow.querySelector("#eq-dbg-prompt-len"),this.dbgPromptView=this.shadow.querySelector("#eq-dbg-prompt-view"),this.dbgContextView=this.shadow.querySelector("#eq-dbg-context-view"),this.dbgRawRespView=this.shadow.querySelector("#eq-dbg-raw-resp-view"),this.dbgCountAll=this.shadow.querySelector("#eq-dbg-count-all"),this.dbgCountError=this.shadow.querySelector("#eq-dbg-count-error"),this.dbgCountAi=this.shadow.querySelector("#eq-dbg-count-ai"),this.dbgCountDom=this.shadow.querySelector("#eq-dbg-count-dom"),this.apiKeyInput=this.shadow.querySelector("#eq-api-key"),this.keyContextMenu=this.shadow.querySelector("#eq-key-context-menu"),this.keyMoreBtn=this.shadow.querySelector("#eq-key-more-btn"),this.keysListEl=this.shadow.querySelector("#eq-keys-list"),this.keysBadgeEl=this.shadow.querySelector("#eq-keys-badge"),this.modelSelect=this.shadow.querySelector("#eq-model-select"),this.modeSelect=this.shadow.querySelector("#eq-mode-select"),this.engineSelect=this.shadow.querySelector("#eq-engine-select"),this.dryRunCheckbox=this.shadow.querySelector("#eq-dry-run"),this.autoApplyCheckbox=this.shadow.querySelector("#eq-auto-apply"),this.autoAdvanceCheckbox=this.shadow.querySelector("#eq-auto-advance"),this.hostDarkModeCheckbox=this.shadow.querySelector("#eq-host-dark"),this.useVisionCheckbox=this.shadow.querySelector("#eq-use-vision"),this.analyzeBtn=this.shadow.querySelector("#eq-analyze-btn"),this.applyBtn=this.shadow.querySelector("#eq-apply-btn"),this.applyBtn.disabled=!0,this.resultContainer=this.shadow.querySelector("#eq-result"),this.floatingAnswers=new Ke(this.shadow,()=>{this.callbacks.onAnalyze(1)});let a=this.shadow.querySelector("#eq-open-hud-btn");a&&a.addEventListener("click",()=>{this.latestPlan&&this.floatingAnswers.show(this.latestPlan)}),he.filter(s=>Q(s.id)).forEach(s=>this.modelSelect.add(new Option(s.name,s.id,!1,s.id===e.model))),Lo.forEach(s=>this.modeSelect.add(new Option(s.label,s.value,!1,s.value===e.modeHint))),Mo.forEach(s=>this.engineSelect.add(new Option(s.label,s.value,!1,s.value===e.engine))),this.apiKeyInput.value=e.apiKey,this.dryRunCheckbox.checked=e.dryRun,this.autoApplyCheckbox.checked=e.autoApply,this.autoAdvanceCheckbox.checked=e.autoAdvance,this.hostDarkModeCheckbox.checked=e.hostDarkMode,this.useVisionCheckbox.checked=e.useVision,this.metricsLiveTime=this.shadow.querySelector("#eq-metrics-live-time"),this.metricsLiveStatus=this.shadow.querySelector("#eq-metrics-live-status"),this.metricsTotalBadge=this.shadow.querySelector("#eq-metrics-total-badge"),this.metricTotalTime=this.shadow.querySelector("#eq-metric-total-time"),this.metricAvgTime=this.shadow.querySelector("#eq-metric-avg-time"),this.metricTotalCount=this.shadow.querySelector("#eq-metric-total-count"),this.metricsHistoryList=this.shadow.querySelector("#eq-metrics-history-list"),this.metricsHistoryCount=this.shadow.querySelector("#eq-metrics-history-count"),this.metricsCopyBtn=this.shadow.querySelector("#eq-metrics-copy-btn"),this.metricsResetBtn=this.shadow.querySelector("#eq-metrics-reset-btn"),this.setupEventListeners(),this.updateTimingMetrics(),this.mountHost(),this.applyHostDarkMode(e.hostDarkMode);let r=Array.isArray(e.apiKeys)&&e.apiKeys.length>0?e.apiKeys:e.apiKey?[e.apiKey]:[];$.init(r),this.renderKeysList();let n=window.setInterval(()=>{this.activeTab==="settings"&&this.renderKeysList()},1e3);typeof n?.unref=="function"&&n.unref();let l=$.getBestKey()||e.apiKey;l&&ze(l).then(s=>{s&&s.length>0&&this.updateModelSelect(s,e.model)}).catch(()=>{})}switchTab(e){this.activeTab=e;let t=["resolver","brain","metrics","debug","settings"];for(let a of t){let r=this.shadow.querySelector(`#eq-tab-${a}`),n=this.shadow.querySelector(`#eq-view-${a}`);a===e?(r?.classList.add("active"),n&&(n.style.display="flex")):(r?.classList.remove("active"),n&&(n.style.display="none"))}e==="brain"?(this.renderContextTree(),this.refreshInspectorView()):e==="metrics"?this.updateTimingMetrics():e==="debug"&&(this.refreshDebugView(),this.renderTerminalEntries())}setupEventListeners(){this.shadow.querySelector("#eq-tab-resolver")?.addEventListener("click",()=>this.switchTab("resolver")),this.shadow.querySelector("#eq-tab-brain")?.addEventListener("click",()=>this.switchTab("brain")),this.shadow.querySelector("#eq-tab-metrics")?.addEventListener("click",()=>this.switchTab("metrics")),this.shadow.querySelector("#eq-tab-debug")?.addEventListener("click",()=>this.switchTab("debug")),this.shadow.querySelector("#eq-tab-settings")?.addEventListener("click",()=>this.switchTab("settings")),this.metricsResetBtn?.addEventListener("click",()=>{Ee(),this.stopQuestionTimer(0),this.currentQuestionStartTime=0,this.metricsLiveTime&&(this.metricsLiveTime.textContent="00:00.00"),this.metricsLiveStatus&&(this.metricsLiveStatus.textContent="Em espera",this.metricsLiveStatus.classList.remove("active")),this.updateTimingMetrics(),this.logToConsole("> [SYS] M\xE9tricas e hist\xF3rico de tempo zerados com sucesso.","text-yellow")}),this.metricsCopyBtn?.addEventListener("click",()=>{this.copyMetricsReport()}),this.shadow.querySelector("#eq-dbg-filter-all")?.addEventListener("click",()=>this.setLogFilter("all")),this.shadow.querySelector("#eq-dbg-filter-error")?.addEventListener("click",()=>this.setLogFilter("error")),this.shadow.querySelector("#eq-dbg-filter-ai")?.addEventListener("click",()=>this.setLogFilter("ai")),this.shadow.querySelector("#eq-dbg-filter-dom")?.addEventListener("click",()=>this.setLogFilter("dom"));let e=this.shadow.querySelector("#eq-dbg-scroll-toggle");e?.addEventListener("click",()=>{this.autoScrollLogs=!this.autoScrollLogs,e&&(e.style.color=this.autoScrollLogs?"#00ffcc":"#858585",e.title=this.autoScrollLogs?"Auto-Scroll Ligado (Clique para desligar)":"Auto-Scroll Desligado (Clique para ligar)"),this.autoScrollLogs&&this.liveDebugTerminal&&(this.liveDebugTerminal.scrollTop=this.liveDebugTerminal.scrollHeight)});let t=this.shadow.querySelector("#eq-dbg-copy-logs");t?.addEventListener("click",()=>{let g=this.getFormattedLogs();navigator.clipboard.writeText(g).then(()=>{let f=t.innerHTML;t.innerHTML=S.check,setTimeout(()=>t.innerHTML=f,1800)})}),this.shadow.querySelector("#eq-dbg-clear-logs")?.addEventListener("click",()=>{this.clearLogs()});let a=this.shadow.querySelector("#eq-dbg-copy-prompt");a?.addEventListener("click",()=>{let g=this.latestPromptText||this.latestPlan?.promptSent||"";navigator.clipboard.writeText(g).then(()=>{let f=a.innerHTML;a.innerHTML=`${S.check} Copiado!`,setTimeout(()=>a.innerHTML=f,1800)})});let r=this.shadow.querySelector("#eq-dbg-copy-context");r?.addEventListener("click",()=>{let g=this.dbgContextView?.textContent||"";navigator.clipboard.writeText(g).then(()=>{let f=r.innerHTML;r.innerHTML=`${S.check} Copiado!`,setTimeout(()=>r.innerHTML=f,1800)})});let n=this.shadow.querySelector("#eq-dbg-copy-raw-resp");n?.addEventListener("click",()=>{let g=this.latestPlan?.rawResponse||this.dbgRawRespView?.textContent||"";navigator.clipboard.writeText(g).then(()=>{let f=n.innerHTML;n.innerHTML=`${S.check} Copiado!`,setTimeout(()=>n.innerHTML=f,1800)})});let l=this.shadow.querySelector("#eq-dbg-copy-error-btn");l?.addEventListener("click",()=>{let g=this.lastErrorMsg||"";navigator.clipboard.writeText(g).then(()=>{let f=l.innerHTML;l.innerHTML=S.check,setTimeout(()=>l.innerHTML=f,1800)})}),this.shadow.querySelector("#eq-refresh-context-btn")?.addEventListener("click",()=>{this.renderContextTree()}),this.launcherBtn.addEventListener("click",()=>this.toggle()),this.dockToggleBtn.addEventListener("click",()=>this.toggle()),this.shadow.querySelector("#eq-min-btn")?.addEventListener("click",()=>this.toggle(!1)),this.shadow.querySelector("#eq-close-btn")?.addEventListener("click",()=>this.toggle(!1)),window.addEventListener("keydown",g=>{g.altKey&&(g.key==="q"||g.key==="Q")&&(g.preventDefault(),this.toggle())},!0);let s=g=>{let f=g.composedPath();f.includes(this.shadow)||(f.includes(this.sidebarEl)||f.includes(this.host))&&g.stopImmediatePropagation()};window.addEventListener("keydown",s,!0),window.addEventListener("keyup",s,!0),window.addEventListener("keypress",s,!0),this.apiKeyInput.addEventListener("input",()=>{let g=this.apiKeyInput.value.trim().replace(/^["']|["']$/g,"");this.callbacks.onSettingsChange({apiKey:g})});let i=this.shadow.querySelector("#eq-keys-collapsible"),c=this.shadow.querySelector("#eq-keys-chevron"),u=this.shadow.querySelector("#eq-keys-section-header"),h=g=>{i&&(g?(i.style.display="none",c&&(c.style.transform="rotate(0deg)")):(i.style.display="block",i.style.maxHeight="none",i.style.overflow="visible",c&&(c.style.transform="rotate(90deg)")))},d=!1;try{d=localStorage.getItem("easyquiz_keys_collapsed")==="true"}catch{}h(d),u?.addEventListener("click",g=>{if(g.target?.closest("a"))return;let f=i?.style.display==="none";h(!f);try{localStorage.setItem("easyquiz_keys_collapsed",f?"false":"true")}catch{}}),this.shadow.querySelector("#eq-key-save").addEventListener("click",()=>{let g=this.apiKeyInput.value.trim().replace(/^["']|["']$/g,"");if(!g){this.setStatus("Insira o valor da chave antes de adicionar.","warning");return}let f=$.addKey(g);if(f.ok){let v=$.exportRawKeys();this.callbacks.onSettingsChange({apiKey:v[0],apiKeys:v}),this.apiKeyInput.value="",this.setStatus(`\u2713 Nova chave adicionada com sucesso! (${v.length} chaves ativas no pool)`,"success"),h(!1);try{localStorage.setItem("easyquiz_keys_collapsed","false")}catch{}this.renderKeysList(),this.keyContextMenu.hidden=!0,Pe(g).then(x=>{x.ok?($.markSuccess(g,100),this.setStatus("\u2713 Nova chave validada com sucesso no Google AI Studio!","success")):($.markInvalid(g,x.message),this.setStatus(`\u26A0\uFE0F Chave cadastrada, mas aviso retornado: ${x.message}`,"warning")),this.renderKeysList()}).catch(()=>{})}else this.setStatus(f.message,"warning")}),this.keyMoreBtn.addEventListener("click",g=>{g.stopPropagation(),this.keyContextMenu.hidden=!this.keyContextMenu.hidden}),this.shadow.addEventListener("click",g=>{let f=g.target;!f.closest("#eq-key-context-menu")&&!f.closest("#eq-key-more-btn")&&(this.keyContextMenu.hidden=!0)}),this.shadow.querySelector("#eq-menu-prompt")?.addEventListener("click",()=>{this.keyContextMenu.hidden=!0;let g=window.prompt("Adicionar Nova Chave API do Google Gemini (AI Studio):");if(g!==null&&g.trim()){let f=g.trim().replace(/^["']|["']$/g,""),v=$.addKey(f);if(v.ok){let x=$.exportRawKeys();this.callbacks.onSettingsChange({apiKey:x[0],apiKeys:x}),this.setStatus("Chave Gemini adicionada com sucesso!","success"),this.renderKeysList()}else this.setStatus(v.message,"warning")}}),this.shadow.querySelector("#eq-menu-paste")?.addEventListener("click",async()=>{this.keyContextMenu.hidden=!0;try{let g=await navigator.clipboard.readText();if(g){let f=g.trim().replace(/^["']|["']$/g,"");this.apiKeyInput.value=f,this.setStatus('Chave colada no campo. Clique no bot\xE3o "+" para adicionar ao pool.',"info")}}catch{let g=window.prompt("Adicionar Nova Chave API do Google Gemini:");if(g!==null&&g.trim()){let f=g.trim().replace(/^["']|["']$/g,"");if($.addKey(f).ok){let x=$.exportRawKeys();this.callbacks.onSettingsChange({apiKey:x[0],apiKeys:x}),this.setStatus("Chave Gemini adicionada com sucesso!","success"),this.renderKeysList()}}}}),this.shadow.querySelector("#eq-menu-toggle-vis")?.addEventListener("click",()=>{this.keyContextMenu.hidden=!0;let g=this.apiKeyInput.type==="password";this.apiKeyInput.type=g?"text":"password";let f=this.shadow.querySelector("#eq-menu-vis-icon"),v=this.shadow.querySelector("#eq-menu-vis-text");f&&(f.innerHTML=g?S.eyeOff:S.eye),v&&(v.textContent=g?"Ocultar Campo":"Mostrar Campo")}),this.shadow.querySelector("#eq-menu-clear")?.addEventListener("click",()=>{this.keyContextMenu.hidden=!0,this.apiKeyInput.value="",this.setStatus("Campo de inser\xE7\xE3o limpo.","info"),this.apiKeyInput.focus()}),this.shadow.querySelector("#eq-menu-bulk")?.addEventListener("click",()=>{this.keyContextMenu.hidden=!0,this.shadow.querySelector("#eq-bulk-overlay")?.remove();let g=document.createElement("div");g.id="eq-bulk-overlay",g.style.cssText=["position:fixed","inset:0","z-index:2147483647","pointer-events:auto","background:rgba(0,0,0,0.78)","backdrop-filter:blur(4px)","-webkit-backdrop-filter:blur(4px)","display:flex","align-items:center","justify-content:center",'font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif',"user-select:text","-webkit-user-select:text"].join(";");let f=document.createElement("div");f.style.cssText=["background:#11151c","color:#e2e8f0","border:1px solid #283548","border-radius:12px","padding:20px","width:440px","max-width:92vw","font-size:13px","box-shadow:0 12px 40px rgba(0,0,0,0.85), 0 0 0 1px rgba(0,229,255,0.15)","display:flex","flex-direction:column","gap:10px","pointer-events:auto"].join(";"),f.innerHTML=`
        <div style="display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #1f2937;padding-bottom:10px;">
          <div style="display:flex;align-items:center;gap:8px;">
            <span style="font-size:16px;">\u{1F511}</span>
            <h3 style="margin:0;font-size:14px;color:#00e5ff;font-weight:700;letter-spacing:0.02em;">Importar Chaves em Lote</h3>
          </div>
          <button id="eq-bulk-x" style="background:none;border:none;color:#94a3b8;font-size:20px;cursor:pointer;padding:0 4px;line-height:1;border-radius:4px;pointer-events:auto;" title="Fechar (Esc)">\u2715</button>
        </div>
        <p style="margin:0;font-size:11px;color:#94a3b8;line-height:1.4;">
          Cole suas chaves Gemini abaixo (uma por linha ou qualquer texto contendo chaves). O EasyQuiz extrai, adiciona e valida tudo automaticamente.
        </p>
        <div style="display:flex;gap:8px;">
          <button id="eq-bulk-paste-btn" type="button" style="background:#1e293b;color:#38bdf8;border:1px solid #0284c7;border-radius:6px;padding:5px 12px;font-size:11px;font-weight:600;cursor:pointer;display:inline-flex;align-items:center;gap:5px;pointer-events:auto;">
            \u{1F4CB} Colar do Clipboard
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
          <button id="eq-bulk-import" type="button" style="background:#00e5ff;color:#031326;border:none;border-radius:6px;padding:7px 18px;cursor:pointer;font-size:12px;font-weight:700;box-shadow:0 0 12px rgba(0,229,255,0.25);pointer-events:auto;">\u26A1 Importar e Validar</button>
        </div>
      `,g.appendChild(f),this.shadow.appendChild(g);let v=f.querySelector("#eq-bulk-ta"),x=f.querySelector("#eq-bulk-status"),T=f.querySelector("#eq-bulk-import"),w=f.querySelector("#eq-bulk-paste-btn"),E=f.querySelector("#eq-bulk-clear-btn");requestAnimationFrame(()=>v?.focus());let C=()=>{g.remove()};["keydown","keyup","keypress","paste","copy","cut"].forEach(I=>{g.addEventListener(I,M=>{M.stopPropagation(),M.stopImmediatePropagation()},!0)}),g.addEventListener("keydown",I=>{I.key==="Escape"&&C()}),g.addEventListener("click",I=>{I.target===g&&C()}),f.querySelector("#eq-bulk-x")?.addEventListener("click",C),f.querySelector("#eq-bulk-cancel")?.addEventListener("click",C),E.addEventListener("click",()=>{v.value="",x.textContent="",v.focus()}),w.addEventListener("click",async()=>{try{let I=await navigator.clipboard?.readText();I?(v.value=I,v.focus(),x.style.color="#38bdf8",x.textContent="Conte\xFAdo colado da \xE1rea de transfer\xEAncia com sucesso!"):(x.style.color="#fbbf24",x.textContent="\xC1rea de transfer\xEAncia vazia ou sem permiss\xE3o de leitura.")}catch{x.style.color="#fbbf24",x.textContent="Permiss\xE3o de clipboard negada pelo navegador. Use Ctrl+V diretamente na caixa.",v.focus()}}),f.querySelector("#eq-bulk-import")?.addEventListener("click",async()=>{let I=v.value.trim();if(!I){x.style.color="#f87171",x.textContent="Insira pelo menos uma chave de API antes de importar.";return}let M=I.match(/AIza[0-9A-Za-z\-_]{35}/g),k=[];if(M&&M.length>0?k=Array.from(new Set(M)):k=Array.from(new Set(I.split(/[\n,;\s]+/).map(B=>B.trim().replace(/^["'`]|["'`]$/g,"")).filter(B=>B.length>=20))),k.length===0){x.style.color="#f87171",x.textContent="Nenhuma chave v\xE1lida encontrada (m\xEDnimo 20 caracteres).";return}x.style.color="#00e5ff",x.textContent=`Processando ${k.length} chave(s)...`,T.disabled=!0,T.style.opacity="0.6";let A=0,z=0;for(let B of k){let U=$.addKey(B);U.ok?A++:U.message.includes("j\xE1 est\xE1 cadastrada")&&z++}if(A>0){let B=$.exportRawKeys();this.callbacks.onSettingsChange({apiKey:B[0],apiKeys:B}),h(!1);try{localStorage.setItem("easyquiz_keys_collapsed","false")}catch{}}x.textContent=`${A} adicionada(s), ${z} duplicada(s). Validando modelo em paralelo...`;let D=$.exportRawKeys(),K=this.modelSelect?.value||"gemini-3.5-flash-lite",N=await Xe(K,D);N.ok?($.markSuccess(N.key,200),x.style.color="#4ade80",x.textContent=`\u2713 ${A} adicionada(s), ${z} duplicada(s). Modelo '${N.model}' pronto!`):(x.style.color="#fbbf24",x.textContent=`${A} adicionada(s), ${z} duplicada(s). Aviso: ${N.message}`),this.renderKeysList(),T.disabled=!1,T.style.opacity="1",A>0&&(this.setStatus(`\u2713 Lote importado: ${A} chave(s) adicionada(s) ao pool!`,"success"),setTimeout(C,2200))})}),this.shadow.querySelector("#eq-menu-edit-text")?.addEventListener("click",()=>{this.keyContextMenu.hidden=!0,this.shadow.querySelector("#eq-text-editor-overlay")?.remove();let g=$.exportRawKeys(),f=document.createElement("div");f.id="eq-text-editor-overlay",f.style.cssText=["position:fixed","inset:0","z-index:2147483647","pointer-events:auto","background:rgba(0,0,0,0.82)","backdrop-filter:blur(4px)","-webkit-backdrop-filter:blur(4px)","display:flex","align-items:center","justify-content:center",'font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif'].join(";");let v=document.createElement("div");v.style.cssText=["background:#11151c","color:#e2e8f0","border:1px solid #283548","border-radius:12px","padding:20px","width:460px","max-width:94vw","font-size:13px","box-shadow:0 12px 40px rgba(0,0,0,0.85),0 0 0 1px rgba(0,229,255,0.15)","display:flex","flex-direction:column","gap:10px","pointer-events:auto"].join(";"),v.innerHTML=`
        <div style="display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #1f2937;padding-bottom:10px;">
          <div style="display:flex;align-items:center;gap:8px;">
            <span style="font-size:16px;">\u{1F5DD}\uFE0F</span>
            <h3 style="margin:0;font-size:14px;color:#00e5ff;font-weight:700;">Ver / Editar Chaves como Texto</h3>
          </div>
          <button id="eq-edittext-x" style="background:none;border:none;color:#94a3b8;font-size:20px;cursor:pointer;padding:0 4px;line-height:1;border-radius:4px;" title="Fechar (Esc)">\u2715</button>
        </div>
        <p style="margin:0;font-size:11px;color:#94a3b8;line-height:1.5;">
          Cada linha = uma chave. Edite, apague linhas ou cole novas. Clique <b style="color:#e2e8f0;">Salvar</b> para substituir todas as chaves atuais pelas do texto.
        </p>
        <textarea id="eq-edittext-ta"
          style="width:100%;height:180px;background:#0b0f17;color:#4ade80;border:1px solid #334155;border-radius:8px;padding:10px;font-family:'JetBrains Mono',Consolas,monospace;font-size:11.5px;box-sizing:border-box;resize:vertical;outline:none;line-height:1.6;pointer-events:auto;user-select:text;-webkit-user-select:text;letter-spacing:0.02em;"
          placeholder="Cole ou edite suas chaves aqui (uma por linha)"></textarea>
        <div id="eq-edittext-status" style="min-height:16px;font-size:11px;color:#94a3b8;"></div>
        <div style="display:flex;gap:8px;justify-content:space-between;margin-top:2px;align-items:center;">
          <button id="eq-edittext-clear" type="button" style="background:#1e293b;color:#f87171;border:1px solid #7f1d1d;border-radius:6px;padding:6px 14px;cursor:pointer;font-size:11px;font-weight:600;">\u{1F5D1} Apagar Tudo</button>
          <div style="display:flex;gap:8px;">
            <button id="eq-edittext-cancel" type="button" style="background:#1e293b;color:#cbd5e1;border:1px solid #334155;border-radius:6px;padding:7px 16px;cursor:pointer;font-size:12px;font-weight:600;">Cancelar</button>
            <button id="eq-edittext-save" type="button" style="background:#00e5ff;color:#031326;border:none;border-radius:6px;padding:7px 18px;cursor:pointer;font-size:12px;font-weight:700;box-shadow:0 0 12px rgba(0,229,255,0.25);">\u{1F4BE} Salvar</button>
          </div>
        </div>
      `,f.appendChild(v),this.shadow.appendChild(f);let x=v.querySelector("#eq-edittext-ta"),T=v.querySelector("#eq-edittext-status");x.value=g.join(`
`),requestAnimationFrame(()=>{x.focus(),x.select()});let w=()=>f.remove();["keydown","keyup","keypress","paste","copy","cut"].forEach(E=>{f.addEventListener(E,C=>{C.stopPropagation(),C.stopImmediatePropagation()},!0)}),f.addEventListener("keydown",E=>{E.key==="Escape"&&w()}),f.addEventListener("click",E=>{E.target===f&&w()}),v.querySelector("#eq-edittext-x")?.addEventListener("click",w),v.querySelector("#eq-edittext-cancel")?.addEventListener("click",w),v.querySelector("#eq-edittext-clear")?.addEventListener("click",()=>{confirm("Apagar todas as chaves? Esta a\xE7\xE3o \xE9 irrevers\xEDvel.")&&(x.value="",T.style.color="#fbbf24",T.textContent="Campo limpo. Clique em Salvar para confirmar a remo\xE7\xE3o de todas as chaves.")}),v.querySelector("#eq-edittext-save")?.addEventListener("click",()=>{let E=x.value.split(/[\n\r]+/).map(M=>M.trim().replace(/^["']|["']$/g,"")).filter(M=>M.length>5),C=Array.from(new Set(E));$.init(C);let I=$.exportRawKeys();this.callbacks.onSettingsChange({apiKey:I[0]||"",apiKeys:I}),this.renderKeysList(),T.style.color="#4ade80",C.length===0?T.textContent="\u2713 Todas as chaves removidas.":T.textContent=`\u2713 ${C.length} chave(s) salva(s) com sucesso!`,this.setStatus(C.length>0?`\u2713 ${C.length} chave(s) salva(s)!`:"Todas as chaves foram removidas.",C.length>0?"success":"info"),setTimeout(w,1400)})}),this.shadow.querySelector("#eq-menu-delete-all")?.addEventListener("click",()=>{this.keyContextMenu.hidden=!0;let g=$.getAllKeys();if(g.length===0)return this.setStatus("Nenhuma chave para apagar.","info");confirm(`Apagar todas as ${g.length} chave(s) permanentemente?`)&&($.init([]),this.callbacks.onSettingsChange({apiKey:"",apiKeys:[]}),this.renderKeysList(),this.setStatus("Todas as chaves foram removidas.","info"))}),this.shadow.querySelector("#eq-menu-test")?.addEventListener("click",async()=>{this.keyContextMenu.hidden=!0;let g=$.getAllKeys();if(g.length===0)return this.setStatus("Nenhuma chave cadastrada para testar.","error");this.setStatus(`\u26A1 Testando ${g.length} chave(s) em paralelo...`,"info");let f=this.modelSelect?.value||"gemini-3.5-flash-lite",v=g.map(T=>T.key),x=await Xe(f,v);if(x.ok)$.markSuccess(x.key,150),this.setStatus(`\u2713 Validado! Modelo '${x.model}' respondeu com sucesso!`,"success");else{let T=await Promise.allSettled(v.map(E=>Pe(E))),w=0;T.forEach((E,C)=>{if(E.status==="fulfilled"&&E.value.ok)w++,$.markSuccess(v[C],200);else{let I=E.status==="fulfilled"?E.value.message:String(E.reason);$.markInvalid(v[C],I)}}),this.setStatus(`Teste: ${w}/${g.length} chave(s) v\xE1lidas. ${x.message}`,w>0?"info":"error")}this.renderKeysList()});let p=()=>{this.keyContextMenu.hidden=!0,window.confirm("Deseja realmente resetar todos os dados, chaves e mem\xF3ria de sess\xE3o do EasyQuiz?")&&(this.autopilot.isActive()&&this.autopilot.stop(),this.updateAutopilotUi(!1),this.setBusy(!1),bt(),Ee(),this.stopQuestionTimer(0),this.currentQuestionStartTime=0,this.metricsLiveTime&&(this.metricsLiveTime.textContent="00:00.00"),this.metricsLiveStatus&&(this.metricsLiveStatus.textContent="Em espera",this.metricsLiveStatus.className="eq-live-stopwatch-status"),this.updateTimingMetrics(),this.apiKeyInput.value="",this.callbacks.onSettingsChange({apiKey:""}),this.setStatus("Todos os dados do EasyQuiz foram limpos.","info"),this.logToConsole("> [SYS] Armazenamento local resetado.","text-yellow"))};this.shadow.querySelector("#eq-menu-reset")?.addEventListener("click",p),this.shadow.querySelector("#eq-reset-all-btn")?.addEventListener("click",p),this.apToggleBtn.addEventListener("click",()=>{if(this.autopilot.isActive())this.autopilot.stop(),this.callbacks.onCancel?.(),this.setProgress(0),this.updateAutopilotUi(!1),this.setInterrupted("Autopilot interrompido imediatamente pelo usu\xE1rio.");else{if(!this.apiKeyInput.value.trim().replace(/^["']|["']$/g,"")){this.setStatus("Configure sua chave de API Gemini na aba Configura\xE7\xF5es antes de ligar o Autopilot.","error"),this.switchTab("settings"),this.apiKeyInput.focus();return}this.callbacks.onSettingsChange({autoApply:!0,autoAdvance:!0}),this.autoApplyCheckbox.checked=!0,this.autoAdvanceCheckbox.checked=!0,Mt(),this.autopilot.start(),this.updateAutopilotUi(!0),this.startStopwatch(),this.setStatus("Autopilot ativo. Monitorando exerc\xEDcios...","info")}}),this.shadow.querySelector("#eq-ap-clear-memory").addEventListener("click",()=>{Qe(),this.logToConsole("> [SYS] Mem\xF3ria contextual limpa com sucesso.","text-green"),this.setStatus("Mem\xF3ria contextual da sess\xE3o limpa.","success")});let y=this.shadow.querySelector("#eq-copy-console-btn");y?.addEventListener("click",()=>{let g=this.apConsole?.innerText||"";navigator.clipboard.writeText(g).then(()=>{let f=y.innerHTML;y.innerHTML=S.check,setTimeout(()=>y.innerHTML=f,1800)})}),this.copyPromptBtn.addEventListener("click",()=>{let g=this.inspPrompt.textContent||"";navigator.clipboard.writeText(g).then(()=>{let f=this.copyPromptBtn.innerHTML;this.copyPromptBtn.innerHTML=`${S.check} Copiado!`,setTimeout(()=>this.copyPromptBtn.innerHTML=f,2e3)})}),this.modelSelect.addEventListener("change",()=>this.callbacks.onSettingsChange({model:this.modelSelect.value})),this.modeSelect.addEventListener("change",()=>this.callbacks.onSettingsChange({modeHint:this.modeSelect.value})),this.engineSelect.addEventListener("change",()=>this.callbacks.onSettingsChange({engine:this.engineSelect.value})),this.dryRunCheckbox.addEventListener("change",()=>this.callbacks.onSettingsChange({dryRun:this.dryRunCheckbox.checked})),this.autoApplyCheckbox.addEventListener("change",()=>this.callbacks.onSettingsChange({autoApply:this.autoApplyCheckbox.checked})),this.autoAdvanceCheckbox.addEventListener("change",()=>this.callbacks.onSettingsChange({autoAdvance:this.autoAdvanceCheckbox.checked})),this.useVisionCheckbox.addEventListener("change",()=>{let g=this.useVisionCheckbox.checked;this.callbacks.onSettingsChange({useVision:g}),this.setStatus(g?"Vis\xE3o Computacional ativada (capturas habilitadas).":"Modo DOM R\xE1pido ativado (capturas desabilitadas).","info")}),this.hostDarkModeCheckbox.addEventListener("change",()=>{let g=this.hostDarkModeCheckbox.checked;this.callbacks.onSettingsChange({hostDarkMode:g}),this.applyHostDarkMode(g)}),this.analyzeBtn.addEventListener("click",async()=>{if(this.isBusy){this.callbacks.onCancel?.(),this.setInterrupted("An\xE1lise cancelada pelo usu\xE1rio. Pronto para nova tentativa.");return}await this.callbacks.onAnalyze()&&!this.dryRunCheckbox.checked&&!this.autoApplyCheckbox.checked&&this.callbacks.onApply()}),this.applyBtn.addEventListener("click",()=>this.callbacks.onApply())}startStopwatch(){this.stopStopwatch(),this.stopwatchStartTime=Date.now();let e=()=>{let t=((Date.now()-this.stopwatchStartTime)/1e3).toFixed(2)+"s";this.stopwatchAp.textContent=t,this.stopwatchAdv.textContent=t};e(),this.stopwatchInterval=setInterval(e,100)}stopStopwatch(e){if(this.stopwatchInterval&&(clearInterval(this.stopwatchInterval),this.stopwatchInterval=null),e!==void 0){let t=(e/1e3).toFixed(2)+"s";this.stopwatchAp.textContent=t,this.stopwatchAdv.textContent=t}}setLogFilter(e){this.activeLogFilter=e;let t=["all","error","ai","dom"];for(let a of t){let r=this.shadow.querySelector(`#eq-dbg-filter-${a}`);a===e?r?.classList.add("active"):r?.classList.remove("active")}this.renderTerminalEntries()}updateLogCounters(){let e=0,t=0,a=0;for(let r of this.logEntries)r.category==="error"?e++:r.category==="ai"?t++:r.category==="dom"&&a++;this.dbgCountAll&&(this.dbgCountAll.textContent=String(this.logEntries.length)),this.dbgCountError&&(this.dbgCountError.textContent=String(e)),this.dbgCountAi&&(this.dbgCountAi.textContent=String(t)),this.dbgCountDom&&(this.dbgCountDom.textContent=String(a))}renderTerminalEntries(){if(!this.liveDebugTerminal)return;this.liveDebugTerminal.replaceChildren();let e=this.activeLogFilter==="all"?this.logEntries:this.logEntries.filter(t=>t.category===this.activeLogFilter);if(e.length===0){let t=document.createElement("div");t.className="text-muted",t.textContent=`Nenhum log encontrado para o filtro "${this.activeLogFilter.toUpperCase()}".`,this.liveDebugTerminal.appendChild(t);return}for(let t of e){let a=document.createElement("div");a.textContent=t.message,t.colorClass&&(a.className=t.colorClass),this.liveDebugTerminal.appendChild(a)}this.autoScrollLogs&&(this.liveDebugTerminal.scrollTop=this.liveDebugTerminal.scrollHeight)}clearLogs(){if(this.logEntries=[],this.updateLogCounters(),this.liveDebugTerminal){this.liveDebugTerminal.replaceChildren();let e=document.createElement("div");e.className="text-blue",e.textContent="> [SYS] Console de logs limpo pelo usu\xE1rio.",this.liveDebugTerminal.appendChild(e)}this.apConsole&&this.apConsole.replaceChildren(),this.executionConsole&&this.executionConsole.replaceChildren()}getFormattedLogs(){return(this.activeLogFilter==="all"?this.logEntries:this.logEntries.filter(t=>t.category===this.activeLogFilter)).map(t=>t.message).join(`
`)}setLastError(e){this.lastErrorMsg=e,this.dbgErrorCard&&this.dbgErrorText&&(this.dbgErrorText.textContent=e,this.dbgErrorCard.style.display="flex")}setErrorDiagnostic(e,t){let a=t?`[${t}] ${e}`:e;this.setLastError(a)}refreshDebugView(){let e=this.latestPlan,t=this.latestContext,a=this.latestPromptText||e?.promptSent||"";if(this.dbgModel&&(this.dbgModel.textContent=e?.usedModel||this.initialSettings.model||"--"),this.dbgLatency&&(this.dbgLatency.textContent=e?.durationMs?`${e.durationMs}ms`:"--"),this.dbgSplitTokens){let r=e?.promptTokens!==void 0?String(e.promptTokens):"--",n=e?.candidatesTokens!==void 0?String(e.candidatesTokens):"--";this.dbgSplitTokens.textContent=`${r} / ${n}`,this.dbgSplitTokens.title=`Prompt: ${r} tokens | Resposta: ${n} tokens`}if(this.dbgTotalTokens){let r=e?.tokensUsed??(e?.promptTokens&&e?.candidatesTokens?e.promptTokens+e.candidatesTokens:void 0);this.dbgTotalTokens.textContent=r!==void 0?`${r}`:"--"}if(this.dbgPromptLen){let r=a.length,n=Math.round(r/4);this.dbgPromptLen.textContent=`${r} chars (~${n} tokens est.)`}if(this.dbgPromptView&&(this.dbgPromptView.textContent=a||"Nenhum prompt enviado at\xE9 o momento."),this.dbgContextView)if(t){let r={scope:`${t.scope.tagName.toLowerCase()}${t.scope.id?"#"+t.scope.id:""}${t.scope.className?"."+t.scope.className.split(" ").join("."):""}`,questionLength:t.questionText.length,questionSnippet:t.questionText.slice(0,150)+(t.questionText.length>150?"...":""),controlsCount:t.controls.length,controls:t.controls.map((n,l)=>({index:l+1,tag:n.tag,type:n.type,name:n.name||void 0,id:n.id||void 0,value:n.value||void 0,label:n.label||void 0,role:n.role}))};this.dbgContextView.textContent=JSON.stringify(r,null,2)}else this.dbgContextView.textContent="Aguardando captura de contexto pelo EasyQuiz...";this.dbgRawRespView&&(e?e.rawResponse?this.dbgRawRespView.textContent=e.rawResponse:this.dbgRawRespView.textContent=JSON.stringify({pageType:e.pageType,mode:e.mode,confidence:e.confidence,rationale:e.rationale,actions:e.actions},null,2):this.dbgRawRespView.textContent="Aguardando retorno da API Gemini..."),this.lastErrorMsg&&this.dbgErrorCard&&this.dbgErrorText&&(this.dbgErrorText.textContent=this.lastErrorMsg,this.dbgErrorCard.style.display="flex")}logToConsole(e,t){let a=new Date,r=`${String(a.getHours()).padStart(2,"0")}:${String(a.getMinutes()).padStart(2,"0")}:${String(a.getSeconds()).padStart(2,"0")}.${String(Math.floor(a.getMilliseconds()/100))}`,n=e;e.startsWith(">")?n=`> [${r}] ${e.slice(1).trim()}`:n=`[${r}] ${e}`;let l="all";t==="text-red"||n.includes("[ERRO]")||n.includes("Falha")||n.includes("Error")?l="error":n.includes("[IA]")||n.includes("[RAG]")||n.includes("Tokens")||n.includes("Gemini")||n.includes("Modelo:")?l="ai":(n.includes("[DOM]")||n.includes("[EXEC]")||n.includes("[VERIF]")||n.includes("[NAV]"))&&(l="dom");let s={id:Date.now()+Math.random(),timestamp:r,message:n,colorClass:t,category:l};for(this.logEntries.push(s);this.logEntries.length>250;)this.logEntries.shift();if(this.updateLogCounters(),l==="error"&&this.setLastError(n),this.liveDebugTerminal&&(this.activeLogFilter==="all"||this.activeLogFilter===l)){let i=document.createElement("div");for(i.textContent=n,t&&(i.className=t),this.liveDebugTerminal.appendChild(i);this.liveDebugTerminal.children.length>250;)this.liveDebugTerminal.removeChild(this.liveDebugTerminal.firstChild);this.autoScrollLogs&&(this.liveDebugTerminal.scrollTop=this.liveDebugTerminal.scrollHeight)}if(this.apConsole){let i=document.createElement("div");for(i.textContent=n,t&&(i.className=t),this.apConsole.appendChild(i),this.apConsole.scrollTop=this.apConsole.scrollHeight;this.apConsole.children.length>150;)this.apConsole.removeChild(this.apConsole.firstChild)}if(this.executionConsole){let i=document.createElement("div");for(i.textContent=n,t&&(i.className=t),this.executionConsole.appendChild(i),this.executionConsole.scrollTop=this.executionConsole.scrollHeight;this.executionConsole.children.length>150;)this.executionConsole.removeChild(this.executionConsole.firstChild)}}setProgress(e,t){if(!this.progressContainer||!this.progressBar)return;if(e<=0){this.progressContainer.style.display="none",this.progressBar.style.width="0%";return}this.progressContainer.style.display="flex";let a=Math.min(100,Math.max(0,Math.round(e)));this.progressBar.style.width=`${a}%`,this.progressVal&&(this.progressVal.textContent=`${a}%`),t&&this.progressLabel&&(this.progressLabel.textContent=t),a>=100&&setTimeout(()=>{this.progressContainer&&this.progressBar&&this.progressBar.style.width==="100%"&&(this.progressContainer.style.display="none")},1500)}updateContext(e,t){this.latestContext=e,t&&(this.latestPlan=t,t.imageDescriptions&&(this.latestImageDescriptions=t.imageDescriptions)),this.activeTab==="brain"?(this.renderContextTree(),t&&this.refreshInspectorView()):this.activeTab==="debug"&&this.refreshDebugView()}updateImages(e){this.latestImages=e,this.activeTab==="brain"&&this.renderContextTree()}renderContextTree(){if(!this.contextTreeContainer)return;let e=this.latestContext,t=He(),a=this.latestPlan;this.contextTreeContainer.innerHTML="";let r=this.createTreeFolder("\u{1F4C4} P\xC1GINA & ESCOPO ATUAL",!0,[{label:"T\xEDtulo",value:document.title||"Sem t\xEDtulo"},{label:"URL",value:window.location.pathname||"/"},{label:"Escopo DOM",value:e?`${e.scope.tagName.toLowerCase()}${e.scope.className?"."+e.scope.className.split(" ").join("."):""}`:"Document"},{label:"Tamanho Texto",value:e?`${e.questionText.length} caracteres`:"N\xE3o analisado"},{label:"Trecho Enunciado",value:e?`"${e.questionText.slice(0,120)}..."`:"Nenhum"}]);this.contextTreeContainer.appendChild(r);let n=e?e.controls:[],l=n.map((d,m)=>{let p=d.role==="navigation"||d.type==="button",b=!p&&d.value?` [val: "${d.value}"]`:"";return{label:`[#${m+1}] ${d.type.toUpperCase()}`,value:`${d.label||d.id||d.name||"(Sem r\xF3tulo)"}${b}`.trim(),badge:p?"Navega\xE7\xE3o":d.role||d.type}}),s=this.createTreeFolder(`\u{1F39B}\uFE0F CONTROLES DETECTADOS (${n.length})`,n.length>0,l);this.contextTreeContainer.appendChild(s);let i=t.map((d,m)=>({label:`Mem\xF3ria #${m+1}`,value:d,badge:"RAG"})),c=this.createTreeFolder(`\u{1F9E0} MEM\xD3RIA RAG ACUMULADA (${t.length})`,t.length>0,i);if(this.contextTreeContainer.appendChild(c),a){let d=this.createTreeFolder(`\u{1F916} \xDALTIMO PLANO IA (${a.actions.length} a\xE7\xF5es)`,!0,[{label:"Tipo P\xE1gina",value:a.pageType,badge:`${(a.confidence*100).toFixed(0)}%`},{label:"Modo",value:a.mode},{label:"Racioc\xEDnio",value:a.rationale||"N/A"},...a.actions.map((m,p)=>({label:`A\xE7\xE3o #${p+1} (${m.t})`,value:JSON.stringify(m)}))]);this.contextTreeContainer.appendChild(d)}let u=this.latestImages,h=this.latestImageDescriptions;if(u.length>0){let d=u.map((p,b)=>{let y=h.find(T=>T.index===b),g=p.captureStatus==="captured"?"\u2705":p.captureStatus==="text_only"?"\u{1F4DD}":"\u274C",f=p.captureStatus==="captured"?"Visual":p.captureStatus==="text_only"?"Texto":"Falhou",v=y?y.relevant?"\u{1F3AF} Relevante":"\u26A0\uFE0F Ignorada":"\u2014",x=y?y.description.slice(0,80):p.textContext?p.textContext.slice(0,80):"Aguardando an\xE1lise IA...";return{label:`${g} Img ${b+1} [${f}]`,value:`${x} | ${p.associatedLabel||p.alt||"sem label"}`,badge:v}}),m=this.createTreeFolder(`\u{1F5BC}\uFE0F IMAGENS DETECTADAS (${u.length})`,!0,d);this.contextTreeContainer.appendChild(m)}}createTreeFolder(e,t,a){let r=document.createElement("div");r.className="eq-tree-node";let n=document.createElement("div");n.className="eq-tree-header",n.innerHTML=`<span class="eq-tree-arrow">${t?"\u25BC":"\u25B6"}</span> <span>${e}</span>`;let l=document.createElement("div");if(l.className="eq-tree-content",l.style.display=t?"flex":"none",a.length===0)l.innerHTML='<div class="text-muted" style="padding: 2px 0;">Nenhum item registrado.</div>';else for(let s of a){let i=document.createElement("div");i.className="eq-tree-leaf",i.innerHTML=`
          <strong style="color:#ffffff; min-width: 80px;">${s.label}:</strong>
          <span style="flex:1; word-break: break-word; color:#aaaaaa;">${s.value}</span>
          ${s.badge?`<span class="eq-tree-badge">${s.badge}</span>`:""}
        `,l.appendChild(i)}return n.addEventListener("click",()=>{let s=l.style.display==="none";l.style.display=s?"flex":"none";let i=n.querySelector(".eq-tree-arrow");i&&(i.textContent=s?"\u25BC":"\u25B6")}),r.appendChild(n),r.appendChild(l),r}toggle(e){e!==void 0?this.isCollapsed=!e:this.isCollapsed=!this.isCollapsed,this.isCollapsed?this.sidebarEl.classList.add("eq-collapsed"):(this.sidebarEl.classList.remove("eq-collapsed"),this.apiKeyInput.value||(this.switchTab("settings"),this.apiKeyInput.focus()))}updateAutopilotUi(e){e?(this.apToggleBtn.innerHTML=`${S.stop} PARAR AUTOPILOT`,this.apToggleBtn.classList.add("danger"),this.apToggleBtn.title="Interromper execu\xE7\xE3o cont\xEDnua do Autopilot"):(this.apToggleBtn.innerHTML=`${S.play} INICIAR AUTOPILOT`,this.apToggleBtn.classList.remove("danger"),this.apToggleBtn.title="Iniciar resolu\xE7\xE3o autom\xE1tica cont\xEDnua de quest\xF5es")}setOperationState(e,t){let a=this.shadow.querySelector("#eq-operation-state");a&&(a.textContent=e,a.className=`eq-operation-state is-${t}`)}setInterrupted(e="An\xE1lise interrompida pelo usu\xE1rio."){this.isBusy=!1,[this.modelSelect,this.modeSelect,this.engineSelect,this.dryRunCheckbox,this.autoApplyCheckbox,this.autoAdvanceCheckbox,this.useVisionCheckbox].forEach(t=>t.disabled=!1),this.analyzeBtn.disabled=!1,this.analyzeBtn.classList.remove("danger"),this.analyzeBtn.innerHTML=`${S.sparkles} Resolver com IA (Alt+R)`,this.analyzeBtn.title="Analisar e responder quest\xE3o ativa",this.applyBtn.disabled=!this.latestPlan||!this.latestPlan.actions.length,this.stopStopwatch(),this.stopQuestionTimer(),this.dotPulseAp.className="eq-dot-pulse stopped",this.dotPulseAdv.className="eq-dot-pulse stopped",this.launcherDot.className="eq-launcher-dot stopped",this.metricsLiveStatus&&(this.metricsLiveStatus.textContent="Interrompido",this.metricsLiveStatus.className="eq-live-stopwatch-status is-warning"),this.autopilot.isActive()||this.updateAutopilotUi(!1),this.setStatus(e,"warning")}setBusy(e,t){this.isBusy=e,[this.modelSelect,this.modeSelect,this.engineSelect,this.dryRunCheckbox,this.autoApplyCheckbox,this.autoAdvanceCheckbox,this.useVisionCheckbox].forEach(a=>a.disabled=e),e?(this.analyzeBtn.disabled=!1,this.analyzeBtn.classList.add("danger"),this.analyzeBtn.innerHTML=`${S.stop} Parar An\xE1lise`,this.analyzeBtn.title="Interromper e cancelar an\xE1lise em andamento",this.applyBtn.disabled=!0,this.startStopwatch(),this.startQuestionTimer(),this.dotPulseAp.className="eq-dot-pulse busy",this.dotPulseAdv.className="eq-dot-pulse busy",this.launcherDot.className="eq-launcher-dot busy",this.setOperationState("Analisando...","busy"),this.metricsLiveStatus&&(this.metricsLiveStatus.textContent="Calculando...",this.metricsLiveStatus.className="eq-live-stopwatch-status is-busy"),t&&this.setStatus(t,"info")):(this.analyzeBtn.disabled=!1,this.analyzeBtn.classList.remove("danger"),this.analyzeBtn.innerHTML=`${S.sparkles} Resolver com IA (Alt+R)`,this.analyzeBtn.title="Analisar e responder quest\xE3o ativa",this.applyBtn.disabled=!this.latestPlan||!this.latestPlan.actions.length,this.stopStopwatch(),this.stopQuestionTimer(),this.dotPulseAp.className="eq-dot-pulse",this.dotPulseAdv.className="eq-dot-pulse",this.launcherDot.className="eq-launcher-dot",this.setOperationState(this.autopilot.isActive()?"Monitorando":"Pronto","idle"),this.metricsLiveStatus&&this.metricsLiveStatus.textContent==="Calculando..."&&(this.metricsLiveStatus.textContent="Em espera",this.metricsLiveStatus.className="eq-live-stopwatch-status"))}setStatus(e,t="info"){this.statusTextAp.textContent=e,this.statusTextAdv.textContent=e,t==="error"?(this.setOperationState("Bloqueado","error"),this.dotPulseAp.className="eq-dot-pulse error",this.dotPulseAdv.className="eq-dot-pulse error",this.launcherDot.className="eq-launcher-dot error"):t==="warning"?(this.setOperationState("Interrompido","warning"),this.dotPulseAp.className="eq-dot-pulse stopped",this.dotPulseAdv.className="eq-dot-pulse stopped",this.launcherDot.className="eq-launcher-dot stopped"):t==="success"?(this.setOperationState("Confirmado","success"),this.dotPulseAp.className="eq-dot-pulse",this.dotPulseAdv.className="eq-dot-pulse",this.launcherDot.className="eq-launcher-dot"):this.isBusy?(this.setOperationState("Analisando...","busy"),this.dotPulseAp.className="eq-dot-pulse busy",this.dotPulseAdv.className="eq-dot-pulse busy",this.launcherDot.className="eq-launcher-dot busy"):(this.setOperationState(this.autopilot.isActive()?"Monitorando":"Pronto","info"),this.dotPulseAp.className="eq-dot-pulse",this.dotPulseAdv.className="eq-dot-pulse",this.launcherDot.className="eq-launcher-dot");let a=e.includes("Alternando")||e.includes("indispon\xEDvel")||e.includes("fallback")||e.includes("alternativo"),r=t==="error"?"> [ERRO] ":t==="success"?"> [SUCESSO] ":t==="warning"?"> [PARADO] ":a?"> [FALLBACK] ":"> [SYS] ",n=t==="error"?"text-red":t==="success"?"text-green":t==="warning"||a?"text-yellow":"text-blue";this.logToConsole(`${r}${e}`,n)}setPlan(e,t){if(this.latestPlan=e,this.resultContainer.style.display="flex",e.durationMs&&this.stopStopwatch(e.durationMs),e.usedModel){let i=this.shadow.querySelector("#eq-active-model-badge");if(i){let c=e.usedModel.replace("gemini-","").replace("-latest","");i.textContent=`\u25CF ${c}`,i.style.display="inline-block"}}let a=this.shadow.querySelector("#eq-badges");a.replaceChildren();let r=[e.mode.replace("_"," "),`${Math.round(e.confidence*100)}% Confian\xE7a`,`${e.actions.length} a\xE7\xF5es`,...e.usedModel?[e.usedModel]:[]];for(let i of r){let c=document.createElement("span");c.className="eq-brand-badge",c.textContent=i,a.appendChild(c)}let n=this.shadow.querySelector("#eq-rationale-text");n.textContent=e.rationale;let l=this.shadow.querySelector("#eq-actions-list");l.innerHTML="";for(let i of e.actions){let c=document.createElement("div");c.className="eq-action-item";let u="";i.t==="chk"?u=`chk ${i.id} (${i.c})`:i.t==="val"?u=`val "${i.v}" -> ${i.id}`:i.t==="sel"?u=`sel "${Array.isArray(i.v)?i.v.join(","):i.v}" -> ${i.id}`:i.t==="clk"?u=`clk ${i.id}`:i.t==="adv"?u="adv":i.t==="js"?u=`js: ${String(i.v).slice(0,40)}...`:i.t==="drag"&&(u=`drag "${i.from}" -> "${i.to}"`);let h=document.createElement("span");h.className="eq-action-badge",h.textContent=i.t.toUpperCase();let d=document.createElement("span");d.textContent=u,c.append(h,d),l.appendChild(c)}this.applyBtn.disabled=!t||!e.actions.length;let s=this.shadow.querySelector("#eq-execution-card");s&&(s.hidden=!0),this.refreshInspectorView(),this.refreshDebugView()}setExecutionReport(e){let t=this.shadow.querySelector("#eq-execution-card"),a=this.shadow.querySelector("#eq-execution-summary"),r=this.shadow.querySelector("#eq-execution-list");if(!t||!a||!r)return;t.hidden=!1,a.textContent=e.navigationVerified?`${e.verified}/${e.applied} a\xE7\xF5es verificadas. Navega\xE7\xE3o confirmada.`:`${e.verified}/${e.applied} a\xE7\xF5es verificadas. ${e.navigationEvidence}`,a.className=`eq-execution-summary ${e.success?"is-success":"is-warning"}`,r.replaceChildren();let n=this.shadow.querySelector("#eq-execution-placeholder");n&&(n.textContent=e.navigationVerified?"Fluxo conclu\xEDdo: aplica\xE7\xE3o e navega\xE7\xE3o confirmadas.":`Fluxo interrompido: ${e.navigationEvidence}`,n.className=`eq-execution-placeholder ${e.success?"is-success":"is-warning"}`);for(let l of e.reports){let s=document.createElement("div");s.className=`eq-execution-row ${l.verified?"is-success":"is-failed"}`;let i=document.createElement("span");i.className="eq-execution-state",i.textContent=l.verified?"OK":"FALHOU";let c=document.createElement("div");c.className="eq-execution-details";let u=document.createElement("strong");u.textContent=l.target;let h=document.createElement("span");if(h.textContent=`${l.strategy} | ${l.evidence}`,c.append(u,h),s.append(i,c),l.error){let d=document.createElement("small");d.textContent=l.error,s.appendChild(d)}r.appendChild(s)}}setInspectorPrompt(e,t){this.latestPromptText=e,this.inspPrompt&&(this.inspPrompt.textContent=e),t&&this.inspModel&&(this.inspModel.textContent=t),this.inspLatency&&(this.inspLatency.textContent="Aguardando IA..."),this.activeTab==="debug"&&this.refreshDebugView()}refreshInspectorView(){let e=this.latestPlan;if(e)if(this.inspModel.textContent=e.usedModel||this.initialSettings.model,this.inspLatency.textContent=e.durationMs?`${e.durationMs}ms`:"--",this.inspTokens.textContent=e.tokensUsed?`${e.tokensUsed}`:"--",this.inspPrompt.textContent=e.promptSent||this.latestPromptText||"Prompt n\xE3o registrado para esta requisi\xE7\xE3o.",this.inspRationale.textContent=e.rationale,this.inspActions.innerHTML="",e.actions.length>0)for(let t of e.actions){let a=document.createElement("div");a.className="eq-action-item",a.textContent=JSON.stringify(t),this.inspActions.appendChild(a)}else this.inspActions.innerHTML='<div class="text-muted" style="padding: 4px;">Nenhuma a\xE7\xE3o prescrita pela IA.</div>';else this.latestPromptText&&(this.inspPrompt.textContent=this.latestPromptText)}showFloatingAnswers(e){let t=e||this.latestPlan;t&&this.floatingAnswers.show(t)}hideFloatingAnswers(){this.floatingAnswers.hide()}renderKeysList(){if(!this.keysListEl)return;let e=$.getAllKeys();if(this.keysBadgeEl){let r=e.filter(s=>!s.isCooldown).length,n=e.reduce((s,i)=>s+(i.winCount||0),0),l=r>=3?" \u26A1 TURBO":"";this.keysBadgeEl.textContent=`${e.length} chave${e.length>1?"s":""} (${r} pronta${r!==1?"s":""})${l}`,this.keysBadgeEl.className=`eq-key-badge ${r>=3?"racing":r>0?"ready":"cooldown"}`}this.keysListEl.replaceChildren();let t=this.shadow?.querySelector("#eq-keys-collapsible");t&&t.style.display!=="none"&&(t.style.maxHeight="none",t.style.overflow="visible"),[...e].sort((r,n)=>{let l=r.winCount||0,s=n.winCount||0;if(l!==s)return s-l;let i=r.lastLatencyMs||99999,c=n.lastLatencyMs||99999;if(i!==c)return i-c;let u=r.isCooldown?1:0,h=n.isCooldown?1:0;return u-h}).forEach((r,n)=>{let l=e.findIndex(f=>f.id===r.id),s=l>=0?l:n,i=document.createElement("div");i.className="eq-key-item";let c=document.createElement("div");c.className="eq-key-info";let u=document.createElement("span");u.className="eq-key-label",u.textContent=r.label||`Chave ${s+1}`;let h=document.createElement("span");h.className="eq-key-masked",h.textContent=X.maskKey(r.key),h.title="Clique para copiar a chave",h.style.cursor="pointer",h.addEventListener("click",()=>{navigator.clipboard?.writeText(r.key),this.setStatus(`Chave ${s+1} copiada para a \xE1rea de transfer\xEAncia!`,"info")});let d=document.createElement("span");if(r.isCooldown){d.className="eq-key-badge cooldown";let f=Math.ceil(r.remainingCooldownMs/1e3);d.textContent=`\u23F1 Cooldown (${f}s)`}else r.lastError&&r.errorCount&&r.errorCount>3?(d.className="eq-key-badge invalid",d.textContent="Erro",d.title=r.lastError):r.lastLatencyMs?(d.className="eq-key-badge ready",d.textContent=`Pronta (${r.lastLatencyMs}ms)`):(d.className="eq-key-badge ready",d.textContent="Pronta");c.appendChild(u),c.appendChild(h),c.appendChild(d);let m=r.winCount||0;if(m>0){let f=document.createElement("span");f.className="eq-key-badge winner",f.textContent=`\u{1F3C6} ${m} vit\xF3ria${m>1?"s":""}`,f.title=`Esta chave foi a mais r\xE1pida ${m} vez${m>1?"es":""} nas corridas paralelas`,c.appendChild(f)}let p=document.createElement("div");p.className="eq-key-actions";let b=document.createElement("button");b.className="eq-icon-btn",b.type="button",b.title="Testar esta chave",b.innerHTML=S.sparkles,b.addEventListener("click",async()=>{this.setStatus(`Testando chave ${r.label||s+1}...`,"info");let f=await Pe(r.key);f.ok?($.markSuccess(r.key,120),this.setStatus(`\u2713 ${r.label||`Chave ${s+1}`}: Conex\xE3o com Google Gemini aprovada!`,"success")):($.markInvalid(r.key,f.message),this.setStatus(`\u26A0\uFE0F ${r.label||`Chave ${s+1}`}: ${f.message}`,"error")),this.renderKeysList()});let y=document.createElement("button");y.className="eq-icon-btn",y.type="button",y.title="Editar chave",y.innerHTML=S.edit,y.addEventListener("click",()=>{let f=window.prompt(`Editar ${r.label||`Chave ${s+1}`}:`,r.key);if(f!==null&&f.trim()){let v=$.updateKey(r.id,f.trim());if(v.ok){let x=$.exportRawKeys();this.callbacks.onSettingsChange({apiKey:x[0],apiKeys:x}),this.setStatus(`Chave ${s+1} atualizada com sucesso!`,"success"),this.renderKeysList()}else this.setStatus(v.message,"warning")}});let g=document.createElement("button");g.className="eq-icon-btn",g.type="button",g.title="Remover chave",g.innerHTML=S.trash,g.addEventListener("click",()=>{if(confirm(`Remover permanentemente a ${r.label||`Chave ${s+1}`}?`)){let f=$.removeKey(r.id);if(f.ok){let v=$.exportRawKeys();this.callbacks.onSettingsChange({apiKey:v[0]||"",apiKeys:v}),this.setStatus("Chave removida com sucesso.","info"),this.renderKeysList()}else this.setStatus(f.message,"warning")}}),p.appendChild(b),p.appendChild(y),p.appendChild(g),i.appendChild(c),i.appendChild(p),this.keysListEl.appendChild(i)})}updateModelSelect(e,t){let a=e.filter(l=>Q(l.id)),r=t&&Q(t)?t:Q(this.initialSettings.model)?this.initialSettings.model:"gemini-2.5-flash";this.modelSelect.innerHTML="";let n=!1;a.forEach(l=>{let s=l.id===r;s&&(n=!0),this.modelSelect.add(new Option(l.name,l.id,!1,s))}),!n&&r&&Q(r)&&this.modelSelect.add(new Option(`Gemini (${r})`,r,!1,!0)),this.modelSelect.value=r}updateSelectedModel(e){if(!Q(e))return;Array.from(this.modelSelect.options).some(a=>a.value===e)||this.modelSelect.add(new Option(`Gemini (${e})`,e,!1,!0)),this.modelSelect.value=e}mountHost(){let e=document.body||document.documentElement;if(!e){let t=()=>{let a=document.body||document.documentElement;a&&!this.host.isConnected&&a.appendChild(this.host)};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",t,{once:!0}):setTimeout(t,0);return}this.host.isConnected||e.appendChild(this.host)}applyHostDarkMode(e){document.getElementById("eq-host-dark-mode-style")?.remove(),this.host.classList.toggle("eq-dark-mode-active",e)}startQuestionTimer(){this.currentQuestionStartTime=Date.now(),this.questionLiveTimerInterval&&clearInterval(this.questionLiveTimerInterval),this.metricsLiveStatus&&(this.metricsLiveStatus.textContent="Calculando...",this.metricsLiveStatus.classList.add("active"));let e=()=>{if(!this.metricsLiveTime)return;let t=Date.now()-this.currentQuestionStartTime,a=Math.floor(t/6e4),r=Math.floor(t%6e4/1e3),n=Math.floor(t%1e3/10);this.metricsLiveTime.textContent=`${String(a).padStart(2,"0")}:${String(r).padStart(2,"0")}.${String(n).padStart(2,"0")}`};e(),this.questionLiveTimerInterval=setInterval(e,50)}stopQuestionTimer(e){if(this.questionLiveTimerInterval&&(clearInterval(this.questionLiveTimerInterval),this.questionLiveTimerInterval=null),this.metricsLiveStatus&&(this.metricsLiveStatus.textContent="Parado",this.metricsLiveStatus.classList.remove("active")),this.metricsLiveTime&&this.currentQuestionStartTime>0){let t=e!==void 0?e:Math.max(0,Date.now()-this.currentQuestionStartTime),a=Math.floor(t/6e4),r=Math.floor(t%6e4/1e3),n=Math.floor(t%1e3/10);this.metricsLiveTime.textContent=`${String(a).padStart(2,"0")}:${String(r).padStart(2,"0")}.${String(n).padStart(2,"0")}`}}updateTimingMetrics(e){let t=e||qe();if(!this.metricTotalTime)return;let a=Math.floor(t.totalElapsedMs/1e3),r=Math.floor(a/60),n=a%60;this.metricTotalTime.textContent=`${String(r).padStart(2,"0")}:${String(n).padStart(2,"0")}`;let l=(t.averageDurationMs/1e3).toFixed(1);this.metricAvgTime.textContent=`${l}s`,this.metricTotalCount.textContent=String(t.completedQuestionsCount),this.metricsTotalBadge&&(this.metricsTotalBadge.textContent=`${t.completedQuestionsCount} Quest\xE3o(\xF5es)`),this.metricsHistoryCount&&(this.metricsHistoryCount.textContent=`${t.records.length} registros`),this.renderMetricsHistory(t.records)}renderMetricsHistory(e){if(!this.metricsHistoryList)return;if(e.length===0){this.metricsHistoryList.innerHTML='<div class="eq-metrics-empty">Nenhuma quest\xE3o respondida nesta sess\xE3o ainda.</div>';return}this.metricsHistoryList.innerHTML="";let t=[...e].reverse();for(let a of t){let r=document.createElement("div");r.className="eq-metrics-item";let n=document.createElement("div");n.className="eq-metrics-item-left";let l=document.createElement("span");l.className="eq-metrics-badge",l.textContent=`Q${a.questionIndex}`;let s=document.createElement("div");s.className="eq-metrics-item-info";let i=document.createElement("div");i.className="eq-metrics-item-title",i.textContent=a.questionTitle||`Quest\xE3o ${a.questionIndex}`;let c=document.createElement("div");c.className="eq-metrics-item-meta";let u=new Date(a.timestamp).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit",second:"2-digit"}),h=a.mode?a.mode.replace("_"," "):"auto";c.textContent=`${u} \u2022 Modo: ${h}${a.actionsCount?` \u2022 ${a.actionsCount} a\xE7\xE3o(\xF5es)`:""}`,s.appendChild(i),s.appendChild(c),n.appendChild(l),n.appendChild(s);let d=document.createElement("div");d.className="eq-metrics-item-right";let m=document.createElement("span");m.className="eq-metrics-item-dur",m.textContent=`${(a.durationMs/1e3).toFixed(2)}s`;let p=document.createElement("span");p.className=`eq-metrics-item-status is-${a.status}`,p.textContent=a.status==="verified"||a.status==="answered"?"\u2713 Injetado":a.status==="manual"?"Gabarito":"Pendente",d.appendChild(m),d.appendChild(p),r.appendChild(n),r.appendChild(d),this.metricsHistoryList.appendChild(r)}}copyMetricsReport(){let e=qe(),t=[];t.push("# Relat\xF3rio de Desempenho e Tempo \u2014 EasyQuiz"),t.push(`- **Quest\xF5es Respondidas:** ${e.completedQuestionsCount}`),t.push(`- **Tempo Total:** ${(e.totalElapsedMs/1e3).toFixed(1)}s`),t.push(`- **Tempo M\xE9dio por Quest\xE3o:** ${(e.averageDurationMs/1e3).toFixed(2)}s`),t.push(""),t.push("### Hist\xF3rico:"),e.records.length===0?t.push("_Nenhum registro ainda._"):e.records.forEach((a,r)=>{t.push(`${r+1}. **${a.questionTitle||`Q${a.questionIndex}`}**: ${(a.durationMs/1e3).toFixed(2)}s (${a.status})`)}),navigator.clipboard.writeText(t.join(`
`)).then(()=>{if(this.metricsCopyBtn){let a=this.metricsCopyBtn.innerHTML;this.metricsCopyBtn.innerHTML="\u2713 Copiado!",setTimeout(()=>{this.metricsCopyBtn.innerHTML=a},1500)}})}destroy(){this.stopStopwatch(),this.stopQuestionTimer(),this.autopilot.stop(),this.applyHostDarkMode(!1),this.callbacks.onDestroy(),this.host.remove()}};function ko(){try{if(typeof document>"u"||!document.head||document.querySelector("link[data-easyquiz-preconnect]"))return;let o=document.createElement("link");o.rel="preconnect",o.href="https://generativelanguage.googleapis.com",o.crossOrigin="anonymous",o.setAttribute("data-easyquiz-preconnect","true"),document.head.appendChild(o);let e=document.createElement("link");e.rel="dns-prefetch",e.href="https://generativelanguage.googleapis.com",e.setAttribute("data-easyquiz-preconnect","true"),document.head.appendChild(e)}catch{}}async function Io(){let o=window;if(Ee(),ko(),o.__easyquiz){o.__easyquiz.toggle();return}let e=Fe(),t=null,a=null,r=0,n=new Ue(e,{onAnalyze:(c=1,u,h=!1)=>l(c,u,h),onApply:(c=1)=>void s(c),onDestroy:()=>{if(a){try{a.abort()}catch{}a=null}pe(),delete o.__easyquiz},onCancel:()=>{if(a){try{a.abort()}catch{}a=null}pe(),n.setProgress(0),n.setInterrupted("Opera\xE7\xE3o cancelada imediatamente pelo usu\xE1rio.")},onSettingsChange:c=>{e=vt(c)}});o.__easyquiz={toggle:()=>n.toggle(),destroy:()=>n.destroy(),analyze:async()=>{await l()}},window.addEventListener("keydown",c=>{if(c.altKey&&(c.key==="q"||c.key==="Q")){if(c.preventDefault(),!n)return;n.toggle(!0),l()}});async function l(c=1,u,h=!1){if(!e.apiKey){n.setStatus("Configure sua chave de API Gemini acima para come\xE7ar.","error"),n.toggle(!0);return}if(a)try{a.abort()}catch{}a=new AbortController;let d=a,m=()=>{try{d.abort()}catch{}};if(u&&(u.aborted?d.abort():u.addEventListener("abort",m,{once:!0})),d.signal.aborted){n.setBusy(!1),n.setProgress(0);return}r=Date.now(),n.setBusy(!0,"Identificando o bloco da quest\xE3o ativa na p\xE1gina..."),n.setProgress(20,"Varrendo escopo do DOM e controles..."),pe(),n.hideFloatingAnswers();try{let p=Le(!1);p||(n.setStatus("Nenhum controle detectado. Tentando captura de tela inteira...","info"),p=fe()),dt(p.scope),n.updateContext(p),n.logToConsole(`> [DOM] Escopo: <${p.scope.tagName.toLowerCase()}> com ${p.controls.length} controle(s) e ${p.questionText.length} caracteres.`,"text-blue"),n.setStatus(`Quest\xE3o localizada (${p.controls.length} controles). Preparando an\xE1lise...`,"info"),n.setProgress(40,`Consultando Gemini (${e.model})...`);let b=await ht(p.scope,e.useVision);if(b.length>0){let T=b.map(w=>w.element).filter(Boolean);ct(T),n.updateImages(b)}if(d.signal.aborted)return;let y=e.model;n.setStatus(b.length>0?`Consultando Gemini (${y}) com ${b.length} imagem(ns) anexada(s)...`:`Consultando Gemini (${y}) via DOM nativo (modo r\xE1pido)...`,"info");let g=Ce(p,b,e);n.setInspectorPrompt(g,e.model);let f=(T,w)=>{n.setStatus(T,w==="warning"?"info":w);let E=T.match(/Onda\s+\d+.*?\[([^\]]+)\]/);if(E){let C=E[1].split(",")[0].trim();n.setProgress(50,`Gemini ${C} respondendo...`)}},{plan:v,usedModel:x}=await Re(p,b,e,f,d.signal);if(d.signal.aborted)return;if(v.needsMoreContext){if(n.setProgress(55,"Ampliando escopo da quest\xE3o..."),n.setStatus("Enunciado ou contexto isolado detectado pela IA. Acionando Sele\xE7\xE3o Geral Expandida...","info"),n.logToConsole("> [DOM] Enunciado isolado. Ampliando escopo para sele\xE7\xE3o expandida...","text-blue"),p=Le(!0),p||(p=fe()),dt(p.scope),n.updateContext(p),b=await ht(p.scope,e.useVision),b.length>0){let E=b.map(C=>C.element).filter(Boolean);ct(E),n.updateImages(b)}n.setStatus(`Reconsultando IA com escopo ampliado (${p.controls.length} controles)...`,"info");let T=Ce(p,b,e);n.setInspectorPrompt(T,e.model),v=(await Re(p,b,e,f,d.signal)).plan}if(d.signal.aborted)return;if(n.setProgress(70,"Resposta recebida da IA! Processando plano..."),n.logToConsole(`> [IA] Modelo: ${x||e.model} | Modo: ${v.mode} | Confian\xE7a: ${(v.confidence*100).toFixed(0)}%`,"text-green"),v.rationale&&n.logToConsole(`> [IA] Racioc\xEDnio: "${v.rationale}"`,"text-blue"),n.logToConsole(`> [IA] ${v.actions.length} a\xE7\xE3o(\xF5es) prescritas no plano.`,"text-blue"),v.memoryToStore&&(yt(v.memoryToStore),n.logToConsole(`> [RAG] \u{1F9E0} Nova mem\xF3ria te\xF3rica salva na sess\xE3o: "${v.memoryToStore}"`,"text-yellow")),v.imageDescriptions&&v.imageDescriptions.length>0){n.logToConsole(`> [VISION] \u{1F5BC}\uFE0F An\xE1lise de ${v.imageDescriptions.length} imagem(ns) pela IA:`,"text-blue");for(let T of v.imageDescriptions){let w=T.relevant?"\u2705":"\u26A0\uFE0F";n.logToConsole(`>   ${w} Imagem ${T.index+1} [${T.relevant?"RELEVANTE":"IGNORADA"}]: ${T.description}`,T.relevant?"text-blue":"text-yellow")}}return t=v,n.updateContext(p,v),_t(v.actions,v.confidence),n.setPlan(v,!e.dryRun),v.pageType==="conclusion"?(n.setProgress(100,"Atividade conclu\xEDda!"),n.setStatus("Atividade conclu\xEDda ou tela final detectada pela IA.","success")):v.pageType==="info"?(n.setProgress(100,"Contexto absorvido na mem\xF3ria!"),n.setStatus("\u{1F4D8} Conte\xFAdo de contexto absorvido na mem\xF3ria RAG. Avan\xE7ando...","success")):v.pageType==="start"?(n.setProgress(100,"In\xEDcio detectado!"),n.setStatus("In\xEDcio de atividade detectado. Iniciando...","info")):(n.setProgress(80,"Plano de resolu\xE7\xE3o pronto!"),n.setStatus(e.dryRun?"Simula\xE7\xE3o conclu\xEDda. As respostas foram real\xE7adas na p\xE1gina sem altera\xE7\xE3o.":"Resolu\xE7\xE3o pronta! Verifique o realce na tela e aplique quando desejar.","success")),e.dryRun&&v.pageType==="question"&&n.showFloatingAnswers(v),d.signal.aborted?void 0:((h||e.autoApply)&&!e.dryRun&&await s(c,d.signal,h),v)}catch(p){if(d.signal.aborted||p instanceof Error&&(p.name==="AbortError"||p.message.includes("cancelada"))){pe(),n.setProgress(0),n.setInterrupted("Opera\xE7\xE3o cancelada pelo usu\xE1rio.");return}pe(),n.setProgress(0);let b=p instanceof Error?p.message:"Falha desconhecida na an\xE1lise.";n.setStatus(b,"error"),n.setErrorDiagnostic(b,"An\xE1lise da IA");return}finally{u?.removeEventListener("abort",m),a===d&&(a=null),d.signal.aborted||n.setBusy(!1)}}async function s(c=1,u,h=!1){if(u?.aborted)return;if(!t){n.setStatus("Nenhum plano dispon\xEDvel para aplicar. Execute a an\xE1lise primeiro.","error");return}if(e.dryRun){n.setStatus("O modo de simula\xE7\xE3o est\xE1 ativo. Desmarque para poder aplicar.","error");return}let d=t.pageType==="info"||t.pageType==="start",m=(h||e.autoAdvance||d)&&t.confidence>=e.confidenceThreshold&&!t.needsMoreContext;n.setBusy(!0,"Aplicando respostas no formul\xE1rio..."),n.setProgress(85,`Aplicando ${t.actions.length} a\xE7\xE3o(\xF5es) no formul\xE1rio...`),n.logToConsole(`> [EXEC] Iniciando aplica\xE7\xE3o com 6 vias de persist\xEAncia para ${t.actions.length} a\xE7\xE3o(\xF5es)...`,"text-blue");try{let p=await ke(t,m,c,de(e));if(u?.aborted)return;if(n.setExecutionReport(p),p.failedActions&&p.failedActions.length>0){n.logToConsole(`> [REPLAN] \u26A0\uFE0F ${p.failedActions.length} a\xE7\xE3o(\xF5es) n\xE3o verificadas no DOM. Iniciando replanejamento...`,"text-yellow");for(let v of p.failedActions){let x=v.action,T=x.t==="drag"?`drag: "${x.from}" \u2192 "${x.to}"`:x.t==="clk"||x.t==="chk"?`${x.t}: "${x.id}"`:x.t==="val"?`val: "${x.id}" = "${x.v}"`:JSON.stringify(x).slice(0,80);n.logToConsole(`>   \u2717 [${x.t.toUpperCase()}] ${T} | ${v.evidence.slice(0,80)}`,"text-yellow")}await i(p.failedActions,u)}let b=r>0?Date.now()-r:1200,y=p.verified>0,g=p.applied>0;if(p.success||y&&g){n.setProgress(100,"Sucesso! Resposta preenchida."),n.logToConsole(`> [DOM] \u2713 ${p.applied} a\xE7\xE3o(\xF5es) aplicada(s) \u2014 ${p.verified} verificada(s) no DOM.`,"text-green"),p.advanced?n.logToConsole("> [NAV] \u2713 Bot\xE3o de confirma\xE7\xE3o/avan\xE7o acionado com sucesso!","text-green"):m&&n.logToConsole(`> [NAV] ${p.navigationEvidence}`,"text-blue"),n.setStatus(p.advanced?`Sucesso: ${p.applied} resposta(s) preenchida(s) e avan\xE7ando.`:`Resposta aplicada na p\xE1gina (${p.applied} a\xE7\xE3o(\xF5es)).`,"success"),n.hideFloatingAnswers();let v=wt({id:`q-${Date.now()}`,questionIndex:(qe().records.length||0)+1,questionTitle:t.rationale?t.rationale.slice(0,45)+"...":`Quest\xE3o ${t.mode||"Auto"}`,durationMs:b,status:"answered",mode:t.mode,actionsCount:p.applied});n.updateTimingMetrics(v)}else g?(n.setProgress(75,"Resposta aplicada (verifica\xE7\xE3o incerta)."),n.logToConsole(`> [DOM] \u26A0\uFE0F ${p.applied} a\xE7\xE3o(\xF5es) disparadas mas sem confirma\xE7\xE3o DOM clara. Pendentes: ${p.failed.join(", ")||"nenhuma"}`,"text-yellow"),n.setStatus(`Resposta preenchida (${p.applied} a\xE7\xE3o(\xF5es) aplicadas, verifica\xE7\xE3o incerta).`,"warning")):(n.setProgress(0,"Alvo de resposta n\xE3o localizado."),n.logToConsole(`> [DOM] Alerta: nenhum controle de resposta foi modificado no DOM. Pend\xEAncias: ${p.failed.join(", ")||"nenhuma a\xE7\xE3o"}.`,"text-yellow"),n.setStatus("Controle de resposta n\xE3o encontrado na p\xE1gina. Use o bot\xE3o Gabarito no painel se desejar.","warning"),e.dryRun&&n.showFloatingAnswers(t))}catch(p){n.setProgress(0);let b=p instanceof Error?p.message:"Falha ao aplicar plano.";n.setStatus(`Erro ao aplicar: ${b}`,"error"),n.logToConsole(`> [ERRO] ${b}`,"text-red")}finally{n.setBusy(!1)}}async function i(c,u){if(!t||!latestContext)return;let h=c.filter(b=>b.action.t==="drag");for(let b of h){if(u?.aborted)return;let y=b.action,g=String(y.from||""),f=String(y.to||""),v=Dt(g,f,g,f);n.logToConsole(`> [REPLAN] \u{1F527} Drag JS fallback: "${g}" \u2192 "${f}"`,"text-blue");let x={...t,actions:[{t:"js",v}],pageType:"question"},T=await ke(x,!1,1,de(e));n.logToConsole(T.applied>0?"> [REPLAN] \u2705 Drag fallback aplicado!":"> [REPLAN] \u2717 Drag fallback sem efeito.",T.applied>0?"text-green":"text-yellow")}let d=c.filter(b=>b.action.t!=="drag");if(d.length===0||u?.aborted)return;n.logToConsole("> [REPLAN] \u{1F504} Re-consultando IA para a\xE7\xF5es n\xE3o aplicadas...","text-blue");let p=`
[REPLANEJAMENTO URGENTE]
As seguintes a\xE7\xF5es foram geradas mas N\xC3O foram verificadas no DOM ap\xF3s 3 tentativas autom\xE1ticas:
${d.map(b=>{let y=b.action,g="";try{let f=document.querySelector(`[data-easyquiz-id="${y.id}"]`)||document.getElementById(y.id||"")||Array.from(document.querySelectorAll('input, button, [role="radio"], [role="checkbox"], [role="option"]')).find(v=>(v.textContent||"").toLowerCase().includes(String(y.id||"").toLowerCase().slice(0,20)));f&&(g=f.outerHTML.slice(0,300))}catch{}return`A\xE7\xE3o (${y.t}) alvo="${y.id||y.from||""}" valor="${y.v||y.c||""}" \u2014 Falha: "${b.evidence.slice(0,80)}"${g?`
HTML do alvo: ${g}`:""}`}).join(`
---
`)}

Contexto da quest\xE3o atual:
${latestContext.questionText.slice(0,500)}

Controles dispon\xEDveis na p\xE1gina (JSON):
${JSON.stringify(latestContext.controls.slice(0,8).map(b=>({id:b.id,type:b.type,label:b.label,options:b.options?.slice(0,4)})),null,2)}

Gere APENAS a\xE7\xF5es {t:"js"} com c\xF3digo JavaScript que use $eq.find(id) ou document.querySelector para localizar e marcar/preencher/clicar o controle correto DIRETAMENTE.
Use: $eq.find(id)?.click() ou setNativeValue equivalente via descriptor.
N\xC3O repita as mesmas a\xE7\xF5es que falharam. Crie c\xF3digo JS robusto como fallback.
`;try{let b={...latestContext,questionText:p},y=await Re(b,[],{...e,model:e.model},(T,w)=>n.logToConsole(`> [REPLAN-API] ${T}`,w==="error"?"text-red":"text-blue"),u);if(u?.aborted||!y?.plan){n.logToConsole("> [REPLAN] \u2717 Re-consulta n\xE3o retornou plano.","text-yellow");return}let f=y.plan.actions.filter(T=>T.t==="js");if(f.length===0){n.logToConsole("> [REPLAN] \u2139\uFE0F IA n\xE3o gerou a\xE7\xF5es JS de fallback.","text-yellow");return}n.logToConsole(`> [REPLAN] \u{1F916} IA gerou ${f.length} a\xE7\xE3o(\xF5es) JS de fallback. Executando...`,"text-blue");let v={...t,actions:f,pageType:"question"},x=await ke(v,!1,1,de(e));x.applied>0?n.logToConsole(`> [REPLAN] \u2705 Replan aplicado: ${x.applied} a\xE7\xE3o(\xF5es) JS executada(s)!`,"text-green"):n.logToConsole("> [REPLAN] \u2717 Replan executado mas sem efeito DOM confirmado.","text-yellow")}catch(b){n.logToConsole(`> [REPLAN] Erro na re-consulta: ${b instanceof Error?b.message:String(b)}`,"text-yellow")}}n.toggle(!0)}Io().catch(o=>{console.error("[EasyQuiz] Erro fatal na inicializa\xE7\xE3o:",o),window.alert(`EasyQuiz: falha ao iniciar: ${o instanceof Error?o.message:String(o)}`)});})();
