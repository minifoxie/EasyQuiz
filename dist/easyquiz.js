/* EasyQuiz v1.0.0 — Resolução inteligente de quizzes sem servidor
 * GitHub: https://github.com/minifoxie/EasyQuiz
 * 100% Client-side. Direct Google Gemini REST API.
 */
"use strict";(()=>{var ae={apiKey:"",apiKeys:[],model:"gemini-3.5-flash-lite",uiMode:"easy",modeHint:"",engine:"smart",dryRun:!1,autoApply:!0,autoAdvance:!1,hostDarkMode:!0,useVision:!1,confidenceThreshold:.8};function _(o){if(!o||typeof o!="string")return!1;let e=o.toLowerCase().trim().replace(/^models\//,"");if(!e.includes("gemini"))return!1;let t=["imagen","image","veo","omni","video","embedding","embed","tts","audio","speech","voice","sound","live","transcribe","bidi","aqa","learnlm","deep-research","computer-use","robotics","rt-1","rt-2","mediapipe","cyber","latest","-ultra","experimental"];for(let a of t)if(e.includes(a))return!1;return!(!e.includes("flash")&&!e.includes("pro"))}var Fe="easyquiz_settings_v2",le="easyquiz_activity_metrics";function Ge(){try{let o=localStorage.getItem(Fe);if(!o){let l=localStorage.getItem("easyquiz_settings_v1");if(l){let i=JSON.parse(l);return{...ae,apiKey:i.apiKey||""}}return{...ae}}let e=JSON.parse(o),t=typeof e.model=="string"&&_(e.model)?e.model:ae.model,a=Array.isArray(e.apiKeys)?e.apiKeys.map(l=>typeof l=="string"?l.trim().replace(/^["']|["']$/g,""):"").filter(l=>l.length>5):[],s=typeof e.apiKey=="string"?e.apiKey.trim().replace(/^["']|["']$/g,""):"";return a.length===0&&s&&(a=[s]),{apiKey:a[0]||s||ae.apiKey,apiKeys:a,model:t,uiMode:e.uiMode==="easy"||e.uiMode==="advanced"?e.uiMode:ae.uiMode,modeHint:e.modeHint??"",engine:e.engine??"smart",dryRun:!!e.dryRun,autoApply:e.autoApply!==void 0?!!e.autoApply:!0,autoAdvance:!!e.autoAdvance,hostDarkMode:e.hostDarkMode!==void 0?!!e.hostDarkMode:!0,useVision:!!e.useVision,confidenceThreshold:typeof e.confidenceThreshold=="number"?e.confidenceThreshold:ae.confidenceThreshold}}catch{return{...ae}}}function qt(){try{localStorage.removeItem(Fe),localStorage.removeItem("easyquiz_settings_v1"),localStorage.removeItem(le),sessionStorage.removeItem(le);let o=[];for(let e=0;e<localStorage.length;e++){let t=localStorage.key(e);t&&(t.startsWith("eq_")||t.startsWith("easyquiz_"))&&o.push(t)}o.forEach(e=>localStorage.removeItem(e)),Je()}catch(o){console.warn("[EasyQuiz] Erro ao resetar dados:",o)}}function xe(o){try{let e=localStorage.getItem("eq_domain_cache_"+o);if(!e)return{};let t=JSON.parse(e);if(t.advanceSelector&&/inject|injetar/i.test(t.advanceSelector)){t.advanceSelector=void 0;try{localStorage.removeItem("eq_domain_cache_"+o)}catch{}}return t}catch{return{}}}function Qe(o,e){if(e.advanceSelector&&/inject|injetar/i.test(e.advanceSelector))return;let a={...xe(o),...e};try{localStorage.setItem("eq_domain_cache_"+o,JSON.stringify(a))}catch(s){console.warn("[EasyQuiz] Erro cache de dominio:",s)}}function wt(o){let e=Ge(),t=Array.isArray(o.apiKeys)?o.apiKeys.map(n=>typeof n=="string"?n.trim().replace(/^["']|["']$/g,""):"").filter(n=>n.length>5):e.apiKeys,a;typeof o.apiKey=="string"?a=o.apiKey.trim().replace(/^["']|["']$/g,""):Array.isArray(o.apiKeys)&&o.apiKeys.length>0?a=t[0]||"":a=e.apiKey,a&&!t.includes(a)&&(t=[a,...t]),t.length>0&&(!a||!t.includes(a))&&(a=t[0]);let s={...e,...o,apiKey:a,apiKeys:t};try{localStorage.setItem(Fe,JSON.stringify(s))}catch(n){console.warn("[EasyQuiz] Falha ao persistir configura\xE7\xF5es no localStorage:",n)}return s}var re=[],xt=12,Qt=1200;function Et(o){let e=o.trim().replace(/\s+/g," ").slice(0,Qt);e&&!re.includes(e)&&(re.push(e),re.length>xt&&(re=re.slice(-xt)))}function Ie(){return re}function Je(){re=[]}function Ct(){return{startTime:Date.now(),totalElapsedMs:0,completedQuestionsCount:0,averageDurationMs:0,records:[]}}var ye=Ct();function qe(){try{localStorage.removeItem(le)}catch{}return ye}function Jt(o){ye=o;try{let e=JSON.stringify(o);sessionStorage.setItem(le,e),localStorage.removeItem(le)}catch{}}function Tt(o){let e=ye,t=Date.now(),a=e.records[e.records.length-1];if(a&&a.id===o.id&&t-a.timestamp<3e3)return e;let s={...o,timestamp:t},n=[...e.records,s],l=n.filter(u=>u.status==="answered"||u.status==="verified").length,i=n.reduce((u,p)=>u+p.durationMs,0),r=l>0?Math.round(i/l):0,c={startTime:e.startTime||t,totalElapsedMs:Math.max(t-(e.startTime||t),i),completedQuestionsCount:l,averageDurationMs:r,records:n};return Jt(c),c}function we(){ye=Ct();try{sessionStorage.removeItem(le),localStorage.removeItem(le)}catch{}return ye}var At=`Voc\xEA \xE9 o motor operacional inteligente do EasyQuiz. Sa\xEDda EXCLUSIVA em JSON minificado, sem markdown, sem coment\xE1rios, sem texto fora do JSON.

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
   \u2192 Avalie CADA linha individualmente.
   \u2192 Use chk ou clk para V/F de cada afirma\xE7\xE3o.
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
PLATAFORMAS ESPEC\xCDFICAS
\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
- Google Forms: IDs v\xEAm de data-item-id. Use clk no container da alternativa correta.
- Wayground/Quizizz: Alternativas s\xE3o cards (tipo submit/button). Use clk, nunca chk.
- Wayground CLASSIFICA\xC7\xC3O: Cards com bot\xF5es de categoria internos. Use clk no bot\xE3o da categoria.
- Khan Academy/Perseus: Widgets interativos podem n\xE3o responder a eventos DOM. Use js via $eq como fallback.
- Duolingo: Tiles clic\xE1veis. Use clk pelo texto do tile.
- Moodle/AVA/Canvas: Formul\xE1rios padr\xE3o. Use chk/sel/val normalmente.
- [PLATAFORMA] no prompt sobrep\xF5e qualquer regra gen\xE9rica acima.

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
`;function Yt(o,e){return/forms\.(google|gle)\.com|docs\.google\.com\/forms/i.test(o)||e.includes("Qr7Oae")||e.includes("freebirdFormviewer")||e.includes("data-item-id")?"[PLATAFORMA: Google Forms \u2014 use clk nos containers de alternativa; IDs via data-item-id ou texto da op\xE7\xE3o]":/wayground|quizizz/i.test(o)||e.includes("data-functional-selector")?e.includes("classification")||e.toLowerCase().includes("fato")||e.toLowerCase().includes("opini")?"[PLATAFORMA: Wayground/Quizizz CLASSIFICA\xC7\xC3O \u2014 items s\xE3o cards com bot\xF5es de categoria; use clk no id do item/categoria OU drag com from=texto_item, to=nome_categoria]":"[PLATAFORMA: Wayground/Quizizz \u2014 alternativas s\xE3o cards clic\xE1veis, use clk]":/khanacademy\.org/i.test(o)||e.includes("perseus")?"[PLATAFORMA: Khan Academy \u2014 widgets Perseus; use js via $eq para widgets interativos se necess\xE1rio]":/moodle|ava\.|classroom\.google/i.test(o)?"[PLATAFORMA: Moodle/AVA/Classroom \u2014 formul\xE1rios padr\xE3o]":/duolingo/i.test(o)?"[PLATAFORMA: Duolingo \u2014 tiles clic\xE1veis, use clk por texto]":/blackboard|canvas\.instructure/i.test(o)?"[PLATAFORMA: Canvas/Blackboard \u2014 quiz-question padr\xE3o]":/socrative|kahoot/i.test(o)?"[PLATAFORMA: Socrative/Kahoot \u2014 alternativas s\xE3o bot\xF5es, use clk]":""}function Ee(o,e,t){let a=o.htmlSnippet.includes("draggable")||o.htmlSnippet.includes("perseus")||o.htmlSnippet.includes("category")||o.htmlSnippet.includes("dropzone")||o.controls.some(f=>f.type==="draggable"||f.type==="dropzone"),s=/katex|latex|\\frac|\\sqrt/i.test(o.htmlSnippet),n=/forms\.(google|gle)\.com|docs\.google\.com\/forms/i.test(o.sourceUrl)||o.htmlSnippet.includes("Qr7Oae")||o.htmlSnippet.includes("data-item-id")||o.htmlSnippet.includes("freebirdFormviewer"),l=(/wayground|quizizz/i.test(o.sourceUrl)||o.htmlSnippet.includes("data-functional-selector"))&&(o.htmlSnippet.includes("classification")||o.controls.filter(f=>f.role==="answer").length===0),i=o.controls.filter(f=>f.role!=="navigation").length===0,r=i||a||n||l||s&&o.questionText.length<60,c=i?4500:l?6e3:1800,u=r?`
[HTML]:
${o.htmlSnippet.slice(0,c).replace(/\s+/g," ")}`:"",p="";if(i&&typeof document<"u")try{let f=Array.from(document.querySelectorAll('input:not([type=hidden]), textarea, select, button, [role="button"], [role="radio"], [role="checkbox"], [role="option"], [onclick], [data-action], a[href]:not([href="#"]), [tabindex]:not([tabindex="-1"])')).filter(g=>{let v=g,C=v.getBoundingClientRect?.()||{width:0,height:0};return C.width>0&&C.height>0&&!v.closest("#easyquiz-shadow-root, .eq-sidebar")}).slice(0,40).map(g=>{let v=g,C=v.tagName.toLowerCase(),A=v.id?`#${v.id}`:"",w=v.className&&typeof v.className=="string"?`.${v.className.trim().split(/\s+/).slice(0,2).join(".")}`:"",E=(v.textContent||v.value||v.getAttribute("aria-label")||"").trim().slice(0,60),I=v.getAttribute("type")||v.getAttribute("role")||"";return`${C}${A}${w}[${I}] txt="${E}"`});f.length>0&&(p=`
[DOM-INTERATIVO]:
${f.join(`
`)}`)}catch{}let d=Ie(),m=d.length>0?`
[MEM\xD3RIA]:
${d.join(" | ")}
`:"",b=o.controls.filter(f=>f.role!=="navigation"),y=o.controls.filter(f=>f.role==="navigation"),x=Yt(o.sourceUrl,o.htmlSnippet),h=x?`
${x}
`:"";return`--- AN\xC1LISE ---
[MODO]: ${t.engine} | Dica: ${t.modeHint||"Auto"}
[URL]: ${o.sourceUrl}
[P\xC1GINA]: ${o.pageTitle}${m}${h}
[DADOS]
[TEXTO]:
${o.questionText}${u}${p}

[RESPOSTAS]:
${(()=>{if(b.length===0)return"Nenhuma";let f=b.filter(M=>M.type==="checkbox"||M.type==="chk"),g=new Set(b.filter(M=>M.type==="radio").map(M=>M.name).filter(Boolean)),v=f.filter(M=>!M.name||!g.has(M.name)),C=/selecione as|assinale as|quais das|todas as|marque as|escolha as|quais dessas|quais dos/i.test(o.questionText),A=v.length>=2||C,w=b.every(M=>M.type==="radio"||M.type==="chk")&&g.size>=1&&!A,E=b.filter(M=>M.type==="text"||M.type==="number"||M.type==="val"||M.tag==="input"||M.tag==="textarea"),I=E.length>=2;return(A?`[MULTI-SELE\xC7\xC3O: marque TODOS os corretos, pode ser 2 ou mais]
`:w?`[ESCOLHA-\xDAnica: marque APENAS 1 op\xE7\xE3o]
`:I?`[M\xDALTIPLOS CAMPOS DE PREENCHIMENTO (${E.length} campos): emita uma a\xE7\xE3o val para CADA um dos ${E.length} campos abaixo com seu id exato]
`:"")+JSON.stringify(b.map(M=>({id:M.id,t:M.type,n:M.name||void 0,txt:M.label?M.label.length>160?M.label.slice(0,160)+"...":M.label:void 0,v:M.value||void 0,opt:M.options&&M.options.length?M.options.slice(0,20).map(D=>D.label||D.value):void 0})))})()}

[NAVEGA\xC7\xC3O]:
${y.length>0?y.map(f=>`"${f.label||f.id}"[${f.type}]`).join(","):"Nenhuma"}

[IMAGENS E GR\xC1FICOS ANEXADOS (${e.length})]:
${e.length>0?e.map((f,g)=>`  - Imagem ${g+1}: ${f.associatedLabel||"Gr\xE1fico da Quest\xE3o"}${f.alt?` (Texto alt: "${f.alt}")`:""}`).join(`
`):"Nenhum anexo visual."}
[/DADOS]
Sa\xEDda em JSON v\xE1lido.`}var Wt=new Set(["question","info","start","conclusion"]),Xt=new Set(["texto_livre","escolha_unica","escolha_multipla","verdadeiro_falso","preenchimento","acao_sem_resposta","categorizacao","ordenacao","arrastar_soltar"]),Zt=new Set(["val","chk","sel","clk","adv","js","drag"]),eo=150,Ce=2e3;function Y(o,e=""){return o==null?e:typeof o=="string"?o.trim().slice(0,Ce):typeof o=="number"||typeof o=="boolean"?String(o).trim().slice(0,Ce):e}function to(o,e){if(!o||typeof o!="object")return null;let t=o,a=t.t;if(typeof a!="string"||!Zt.has(a))return null;if(a==="adv"){let i=t.id??t.target??t.name??t.selector;return{t:"adv",...Y(i)?{id:Y(i,"").slice(0,500)}:{}}}if(a==="drag"){let i=Y(t.from??t.source),r=Y(t.to??t.target??t.destination);return!i||!r?null:{t:"drag",from:i.slice(0,500),to:r.slice(0,500)}}if(a==="js"){let i=Y(t.v??t.code??t.script);return!i||i.length>8e3?null:{t:"js",v:i}}let s=t.id??t.target??t.name??t.selector??t.element;(s==null||s==="")&&a==="val"&&(s="1");let n=Y(s).slice(0,500);if(!n)return null;if(a==="val"){let i=t.v!==void 0?t.v:t.value!==void 0?t.value:t.val!==void 0?t.val:t.text!==void 0?t.text:t.answer;return{t:"val",id:n,v:Y(i).slice(0,Ce)}}if(a==="sel"){let i=t.v!==void 0?t.v:t.value!==void 0?t.value:t.val!==void 0?t.val:t.values,c=(Array.isArray(i)?i:[i]).map(u=>Y(u).slice(0,500)).filter(Boolean);return{t:"sel",id:n,v:c}}if(a==="chk"){let i=t.c===!1||t.c==="false"||t.c===0||t.c==="0"||t.c==="off"||t.c==="unchecked"||t.c==="desmarcar",r={t:"chk",id:n,c:!i};return t.v!==void 0&&(r.v=Y(t.v).slice(0,Ce)),r}let l={t:"clk",id:n};if(t.c!==void 0){let i=t.c===!1||t.c==="false"||t.c===0||t.c==="0"||t.c==="off"||t.c==="unchecked"||t.c==="desmarcar";l.c=!i}return t.v!==void 0&&(l.v=Y(t.v).slice(0,Ce)),Array.isArray(t.co)&&t.co.length===2&&t.co.every(i=>typeof i=="number"&&Number.isFinite(i))&&(l.co=[t.co[0],t.co[1]]),l}function oo(o,e,t){if(t!=="question")return o;let a=o.filter(n=>n.t==="adv"),s=o.filter(n=>n.t!=="adv");if(e==="escolha_unica"){s=s.filter(l=>!(l.t==="chk"&&l.c===!1||l.t==="clk"&&l.c===!1));let n=s.filter(l=>l.t==="chk"||l.t==="clk");if(n.length>1){let l=s.filter(r=>r.t!=="chk"&&r.t!=="clk"),i=n[n.length-1];s=[...l,i]}}else if(e==="escolha_multipla"){s=s.filter(l=>!(l.t==="chk"&&l.c===!1||l.t==="clk"&&l.c===!1));let n=new Set;s=s.filter(l=>{let i="id"in l&&typeof l.id=="string"?l.id:"";return i?n.has(i)?!1:(n.add(i),!0):!0})}else if(e==="verdadeiro_falso"){let n=new Set,l=[...s].reverse(),i=[];for(let r of l){let c="id"in r&&typeof r.id=="string"?r.id:"";c?n.has(c)||(n.add(c),i.push(r)):i.push(r)}s=i.reverse()}return[...s,...a]}function St(o){if(!o||typeof o!="object")return{pageType:"info",mode:"acao_sem_resposta",confidence:.5,rationale:"Resposta estruturada n\xE3o identificada; avan\xE7ando como informativo.",actions:[{t:"adv"}]};let e=o,t=e.pageType,a=e.mode;(typeof t!="string"||!Wt.has(t))&&(t="question"),(typeof a!="string"||!Xt.has(a))&&(a="escolha_unica");let s=Array.isArray(e.actions)?e.actions:[],n=[];for(let r=0;r<Math.min(s.length,eo);r++){let c=to(s[r],r);c&&n.push(c)}n.some(r=>r.t==="val")&&(a==="escolha_unica"||!e.mode)&&(a="preenchimento"),n.some(r=>r.t==="drag")&&!["categorizacao","arrastar_soltar","ordenacao"].includes(a)&&(a="arrastar_soltar"),n=oo(n,a,t);let l=n.some(r=>r.t==="adv");t==="conclusion"?n.length=0:t==="info"||t==="start"?l||n.push({t:"adv"}):t==="question"&&!l&&n.push({t:"adv"});let i=typeof e.confidence=="number"&&Number.isFinite(e.confidence)?Math.min(1,Math.max(0,e.confidence)):.85;return{pageType:t,mode:a,confidence:i,rationale:Y(e.rationale,"Plano validado e auto-recuperado."),actions:n,...Y(e.memoryToStore)?{memoryToStore:Y(e.memoryToStore)}:{},...e.needsMoreContext?{needsMoreContext:!!e.needsMoreContext}:{}}}var te=class{keys=new Map;constructor(e=[]){this.init(e)}init(e){let t=new Map(this.keys);this.keys.clear();let a=e.flatMap(n=>n.split(/[\n\r]+/));Array.from(new Set(a.map(n=>n.trim().replace(/^["']|["']$/g,"")).filter(n=>n.length>5))).forEach((n,l)=>{let i=this.generateId(n),r=t.get(i)||t.get(n);this.keys.set(i,{id:i,key:n,label:r?.label||`Chave ${l+1}`,addedAt:r?.addedAt||Date.now(),lastUsedAt:r?.lastUsedAt,lastLatencyMs:r?.lastLatencyMs,cooldownUntil:r?.cooldownUntil,errorCount:r?.errorCount||0,lastError:r?.lastError,winCount:r?.winCount||0})})}generateId(e){let t=0;for(let s=0;s<e.length;s++)t=(t<<5)-t+e.charCodeAt(s),t|=0;let a=e.slice(-12).replace(/[^a-zA-Z0-9]/g,"").slice(0,6);return`key_${Math.abs(t).toString(36).slice(0,6)}${a}`}static maskKey(e){let t=e.trim().replace(/^["']|["']$/g,"");return t.length<=10?"\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022":`${t.slice(0,6)}...${t.slice(-4)}`}getAllKeys(){let e=Date.now();return Array.from(this.keys.values()).map(t=>{let a=Math.max(0,(t.cooldownUntil||0)-e);return{...t,isCooldown:a>0,remainingCooldownMs:a}})}getHealthyKeys(){let e=Date.now();return Array.from(this.keys.values()).filter(t=>(t.cooldownUntil||0)<=e&&(t.errorCount||0)<5)}getBestKey(){let e=this.getHealthyKeys();if(e.length>0)return e.sort((a,s)=>{let n=a.lastLatencyMs??99999,l=s.lastLatencyMs??99999;return n-l}),e[0].key;let t=Array.from(this.keys.values());return t.length>0?(t.sort((a,s)=>(a.cooldownUntil||0)-(s.cooldownUntil||0)),t[0].key):""}getDiverseKeys(e){let t=this.getHealthyKeys();if(t.length===0){let s=this.getBestKey();return s?[s]:[]}t.sort((s,n)=>{let l=s.lastLatencyMs??99999,i=n.lastLatencyMs??99999;return l-i});let a=[];for(let s=0;s<e;s++){let n=t[s%t.length];a.push(n.key)}return a}markQuotaHit(e,t=5e3){let a=this.findKeyObj(e);a&&(a.cooldownUntil=Date.now()+t,a.errorCount=(a.errorCount||0)+1,a.lastError=`Cota tempor\xE1ria atingida (HTTP 429). Cooldown de ${t/1e3}s ativado.`)}markOverloaded(e,t=5e3){let a=this.findKeyObj(e);a&&(a.cooldownUntil=Date.now()+t,a.errorCount=(a.errorCount||0)+1,a.lastError=`Servidores sobrecarregados (HTTP 503). Cooldown de ${t/1e3}s ativado.`)}markSuccess(e,t){let a=this.findKeyObj(e);a&&(a.lastLatencyMs=t,a.lastUsedAt=Date.now(),a.errorCount=0,a.lastError=void 0,a.cooldownUntil=void 0)}markWinner(e){let t=this.findKeyObj(e);t&&(t.winCount=(t.winCount||0)+1)}markInvalid(e,t){let a=this.findKeyObj(e);a&&(a.errorCount=99,a.lastError=t)}addKey(e,t){let a=e.trim().replace(/^["']|["']$/g,"");if(!a)return{ok:!1,message:"Chave n\xE3o pode ser vazia."};if(a.length<15)return{ok:!1,message:"Chave de API inv\xE1lida ou muito curta."};let s=this.generateId(a);if(this.keys.has(s)||Array.from(this.keys.values()).some(i=>i.key===a))return{ok:!1,message:"Esta chave de API j\xE1 est\xE1 cadastrada."};let l={id:s,key:a,label:t?.trim()||`Chave ${this.keys.size+1}`,addedAt:Date.now(),errorCount:0};return this.keys.set(s,l),{ok:!0,message:"Chave adicionada com sucesso!",keyItem:l}}updateKey(e,t,a){let s=this.keys.get(e);if(!s)return{ok:!1,message:"Chave n\xE3o encontrada."};let n=t.trim().replace(/^["']|["']$/g,"");return!n||n.length<15?{ok:!1,message:"Chave de API inv\xE1lida."}:(s.key=n,a!==void 0&&(s.label=a.trim()),s.errorCount=0,s.cooldownUntil=void 0,s.lastError=void 0,{ok:!0,message:"Chave atualizada com sucesso!"})}removeKey(e){if(this.keys.size<=1)return{ok:!1,message:"Voc\xEA precisa manter pelo menos 1 chave de API cadastrada."};let t=this.findKeyObj(e);return t?(this.keys.delete(t.id),{ok:!0,message:"Chave removida com sucesso."}):{ok:!1,message:"Chave n\xE3o encontrada."}}exportRawKeys(){return Array.from(this.keys.values()).map(e=>e.key)}size(){return this.keys.size}findKeyObj(e){if(this.keys.has(e))return this.keys.get(e);for(let t of this.keys.values())if(t.key===e)return t}},k=new te;var ue=[{id:"gemini-3.8-flash",name:"Gemini 3.8 Flash (Mais Inteligente 2026)",description:"Modelo flagship Flash lan\xE7ado em Set/2026. Ultra-r\xE1pido e altamente capaz.",stable:!0},{id:"gemini-3.7-flash",name:"Gemini 3.7 Flash (Agentic)",description:"Alta capacidade para racioc\xEDnio multimodal e workflows ag\xEAnticos.",stable:!0},{id:"gemini-3.6-flash",name:"Gemini 3.6 Flash (Est\xE1vel)",description:"Modelo est\xE1vel e confi\xE1vel com excelente velocidade.",stable:!0},{id:"gemini-3.5-flash",name:"Gemini 3.5 Flash (R\xE1pido)",description:"Modelo de alta performance para tarefas r\xE1pidas.",stable:!0},{id:"gemini-3.5-flash-lite",name:"Gemini 3.5 Flash-Lite (Econ\xF4mico)",description:"Modelo econ\xF4mico de alta velocidade para volume elevado.",stable:!0},{id:"gemini-2.5-flash",name:"Gemini 2.5 Flash (Legacy R\xE1pido)",description:"Modelo legacy com zero-thinking suportado. Ultra-baixa lat\xEAncia.",stable:!0},{id:"gemini-2.5-pro",name:"Gemini 2.5 Pro (Legacy Avan\xE7ado)",description:"Modelo legacy avan\xE7ado para quest\xF5es de alta complexidade.",stable:!0}],Ye=["gemini-3.5-flash-lite","gemini-3.5-flash","gemini-3.6-flash","gemini-3.8-flash"],ao={"gemini-2.5-flash":"gemini-3.6-flash","gemini-2.0-flash":"gemini-3.5-flash","gemini-2.0-flash-lite":"gemini-3.5-flash-lite","gemini-1.5-flash":"gemini-3.5-flash","gemini-1.5-pro":"gemini-3.6-flash"};function We(o){return ao[o]??o}var Te=null;function no(o){let e={temperature:0,maxOutputTokens:1500,responseMimeType:"application/json",responseSchema:Lt,response_mime_type:"application/json",response_schema:Lt};return/lite/i.test(o)||(/gemini-3\.[567]-flash/i.test(o)?e.thinkingConfig={thinkingLevel:"none"}:/gemini-3\.[89]|gemini-3\.[1-9][0-9]/i.test(o)?e.thinkingConfig={thinkingLevel:"low"}:/gemini-2\.5-flash/i.test(o)&&(e.thinkingConfig={thinkingBudget:0})),e}var Lt={type:"OBJECT",properties:{pageType:{type:"STRING",enum:["question","info","start","conclusion"]},mode:{type:"STRING",enum:["texto_livre","escolha_unica","escolha_multipla","verdadeiro_falso","preenchimento","acao_sem_resposta","categorizacao","ordenacao","arrastar_soltar"]},confidence:{type:"NUMBER"},rationale:{type:"STRING"},memoryToStore:{type:"STRING"},actions:{type:"ARRAY",items:{type:"OBJECT",properties:{t:{type:"STRING",enum:["val","chk","sel","clk","adv","js","drag"]},id:{type:"STRING"},v:{},c:{type:"BOOLEAN"},co:{type:"ARRAY",items:{type:"NUMBER"}},from:{type:"STRING"},to:{type:"STRING"}},required:["t"]}}},required:["pageType","mode","confidence","rationale","actions"]};function kt(o){let e=o.trim().replace(/^google\//,"").replace(/^models\//,"");return!e||!_(e)?"gemini-3.5-flash-lite":e}function Ht(o,e){let t="";try{let a=JSON.parse(o);t=a.error?.message||a.message||""}catch{t=o.slice(0,160)}return/API_KEY_INVALID|API key not valid|key.*invalid|unregistered/i.test(t)?"Chave de API do Gemini inv\xE1lida ou n\xE3o autorizada no Google AI Studio.":/RESOURCE_EXHAUSTED|Quota exceeded|rate limit|quota/i.test(t)||e===429?`Cota do Gemini excedida (HTTP 429): ${t||"Aguarde"}`:e===404?`HTTP 404: ${t||"Modelo ou endpoint n\xE3o encontrado no Google AI Studio"}`:e===503||/overloaded/i.test(t)?`Servidores Google sobrecarregados (HTTP 503): ${t||"Aguardando"}`:t?`Erro Gemini (HTTP ${e}): ${t}`:`Falha na requisi\xE7\xE3o ao Gemini (HTTP ${e}).`}function io(o){let e=o.trim(),t=e.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);if(t)try{return JSON.parse(t[1].trim())}catch{}try{return JSON.parse(e)}catch{}let a=e.match(/\{[\s\S]*\}/);if(a)try{return JSON.parse(a[0].trim())}catch{}try{let s=e.indexOf("{");if(s!==-1){let n=e.slice(s).trim();n=n.replace(/,\s*\{[^}]*$/,""),n=n.replace(/,\s*$/,"");let l=0,i=0,r=!1,c=!1;for(let p=0;p<n.length;p++){let d=n[p];if(c){c=!1;continue}if(d==="\\"){c=!0;continue}if(d==='"'){r=!r;continue}r||(d==="{"?l++:d==="}"?l=Math.max(0,l-1):d==="["?i++:d==="]"&&(i=Math.max(0,i-1)))}for(r&&(n+='"');i>0;)n+="]",i--;for(;l>0;)n+="}",l--;let u=JSON.parse(n);if(u&&typeof u=="object")return u}}catch{}throw new Error("Falha ao decodificar JSON da IA.")}var It=(()=>{try{let o=typeof localStorage<"u"?localStorage.getItem("easyquiz_cached_models"):null;if(!o)return null;let e=JSON.parse(o);if(Array.isArray(e)){let t=e.filter(a=>a&&typeof a.id=="string"&&_(a.id));return t.length>0?t:null}return null}catch{return null}})(),ze=new Set;async function Pe(o){let e=o.trim().replace(/^["']|["']$/g,"");if(!e)return ue;let t=[`https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(e)}`,`https://generativelanguage.googleapis.com/v1/models?key=${encodeURIComponent(e)}`];for(let a of t)try{let s=await fetch(a,{headers:{"Content-Type":"application/json","x-goog-api-key":e}});if(!s.ok){let l=await s.text(),i=Ht(l,s.status);if(i.includes("inv\xE1lida")||i.includes("n\xE3o autorizada"))throw new Error(i);continue}let n=await s.json();if(Array.isArray(n.models)&&n.models.length>0){let l=n.models.filter(i=>{let r=i.supportedGenerationMethods||[],c=(i.name||"").replace(/^models\//,""),u=r.includes("generateContent");return _(c)&&u}).map(i=>{let r=i.supportedGenerationMethods||[],c=i.name.replace(/^models\//,""),u=i.displayName||c;return{id:c,name:u.includes(c)?u:`${u} (${c})`,description:i.description||"",stable:!/-preview|-experimental|-latest/i.test(c),supportsVision:!/embedding|tts|transcribe|live|image|sound|voice/i.test(c),supportsStructuredOutput:r.includes("generateContent"),supportedGenerationMethods:r,discoveredAt:Date.now()}});if(l.length>0){l.sort((i,r)=>{let c=u=>u==="gemini-3.8-flash"?200:u==="gemini-3.7-flash"?190:u==="gemini-3.6-flash"?180:u==="gemini-3.5-flash"?170:u==="gemini-3.5-flash-lite"?160:u==="gemini-2.5-flash"?130:u.includes("flash")?80:u==="gemini-2.5-pro"?60:u.includes("pro")?50:10;return c(r.id)-c(i.id)}),It=l;try{typeof localStorage<"u"&&localStorage.setItem("easyquiz_cached_models",JSON.stringify(l))}catch{}return l}}}catch(s){if(s.message?.includes("Chave de API"))throw s}return ue}async function Re(o){let e=o.trim().replace(/^["']|["']$/g,"");if(!e)return{ok:!1,message:"Insira sua chave de API."};try{let a=await Pe(e);if(a.length>0&&a!==ue){let s=a[0];return{ok:!0,message:`Chave v\xE1lida! ${a.length} modelos Gemini dispon\xEDveis em sua conta. Recomendado: ${s.name}`,models:a}}}catch(a){return{ok:!1,message:a instanceof Error?a.message:String(a)}}let t=["gemini-3.8-flash","gemini-3.6-flash","gemini-3.5-flash"];for(let a of t)for(let s of["v1beta","v1"]){let n=`https://generativelanguage.googleapis.com/${s}/models/${a}:generateContent?key=${encodeURIComponent(e)}`;try{if((await fetch(n,{method:"POST",headers:{"Content-Type":"application/json","x-goog-api-key":e},body:JSON.stringify({contents:[{role:"user",parts:[{text:"PING"}]}],generationConfig:{maxOutputTokens:5}})})).ok)return{ok:!0,message:`Chave validada com sucesso no ${a} (${s})!`,models:ue}}catch{}}return{ok:!1,message:"Chave de API inv\xE1lida, sem cota ou sem permiss\xE3o para modelos Gemini."}}async function Xe(o,e){let t=e.map(c=>c.trim().replace(/^["']|["']$/g,"")).filter(c=>c.length>5);if(t.length===0)return{ok:!1,model:o,key:"",message:"Nenhuma chave dispon\xEDvel."};let a=We(kt(o)),s=JSON.stringify({contents:[{role:"user",parts:[{text:"PING"}]}],generationConfig:{maxOutputTokens:5}}),n={"Content-Type":"application/json"};async function l(c,u,p){let d=new AbortController,m=setTimeout(()=>d.abort(),p);try{let b=`https://generativelanguage.googleapis.com/v1beta/models/${u}:generateContent?key=${encodeURIComponent(c)}`,y=await fetch(b,{method:"POST",headers:{...n,"x-goog-api-key":c},body:s,signal:d.signal});if(clearTimeout(m),y.ok)return{ok:!0,model:u,key:c,message:`Modelo '${u}' validado com sucesso!`};let x=await y.text().catch(()=>"");throw new Error(`HTTP ${y.status}: ${x.slice(0,80)}`)}catch(b){throw clearTimeout(m),b}}if(t.length>=2){let c=t.slice(0,6);try{return await Promise.any(c.map(p=>l(p,a,8e3)))}catch{}}let i=t[0],r=[a,...Ye.filter(c=>c!==a)];for(let c of r)try{let u=await l(i,c,4e3);return c!==a&&(u.message=`Modelo preferido indispon\xEDvel. Validado via fallback '${c}'.`),u}catch{}return{ok:!1,model:a,key:i,message:"Nenhum modelo Gemini respondeu. Verifique sua chave e cota."}}async function so(o,e,t,a,s){let n=["v1beta","v1"],l=new Error(`Falha ao consultar modelo ${o}`),r={...no(o)};for(let c of n){if(s.aborted)throw new Error("Opera\xE7\xE3o cancelada pelo usu\xE1rio.");let u=`https://generativelanguage.googleapis.com/${c}/models/${o}:generateContent?key=${encodeURIComponent(e)}`,p=Date.now();try{let d=await fetch(u,{method:"POST",headers:{"Content-Type":"application/json","x-goog-api-key":e},body:JSON.stringify({...t,generationConfig:r}),signal:s,keepalive:a});if(!d.ok){let y=await d.text();if(d.status===400&&r.thinkingConfig&&/thinking/i.test(y)){delete r.thinkingConfig;let h=await fetch(u,{method:"POST",headers:{"Content-Type":"application/json","x-goog-api-key":e},body:JSON.stringify({...t,generationConfig:r}),signal:s,keepalive:a});if(h.ok){let f=await h.json(),g=f.candidates?.[0];if(g?.content?.parts?.[0]?.text)return k.markSuccess(e,Date.now()-p),{rawText:g.content.parts[0].text,data:f,usedModel:o,usedKey:e}}}let x=Ht(y,d.status);if(d.status===404&&c==="v1beta")continue;throw d.status===429?k.markQuotaHit(e,5e3):d.status===503||/no capacity|overloaded|unavailable/i.test(y)?(k.markOverloaded(e,5e3),ze.add(o)):d.status===403||/API_KEY_INVALID/i.test(y)?k.markInvalid(e,x):d.status===404&&ze.add(o),new Error(`[${o}|${te.maskKey(e)}] ${x}`)}let m=await d.json(),b=m.candidates?.[0];if(!b||!b.content?.parts?.[0]?.text)throw new Error(`[${o}|${te.maskKey(e)}] A IA n\xE3o retornou uma resposta estruturada v\xE1lida.`);return k.markSuccess(e,Date.now()-p),{rawText:b.content.parts[0].text,data:m,usedModel:o,usedKey:e}}catch(d){if(s.aborted)throw d;l=d;let m=l.message||"";if(m.includes("404")||/no longer available/i.test(m)){ze.add(o);break}}}throw l}var $e=new Map;function Mt(o){let e=$e.get(o);return e===void 0?!1:Date.now()>e?($e.delete(o),!1):!0}function ro(o,e=6e4){$e.set(o,Date.now()+e)}function zt(){$e.clear()}async function Ze(o,e,t,a,s){if(s?.aborted)throw new Error("Opera\xE7\xE3o cancelada pelo usu\xE1rio.");let n=Array.isArray(t.apiKeys)&&t.apiKeys.length>0?t.apiKeys:t.apiKey?[t.apiKey]:[];k.init(n);let l=t.apiKey.trim().replace(/^[\"']|[\"']$/g,""),i=k.getBestKey()||l;if(!i)throw new Error("Nenhuma chave de API do Gemini configurada ou dispon\xEDvel.");let r=kt(t.model);if(!It&&i&&Pe(i).catch(()=>{}),s?.aborted)throw new Error("Opera\xE7\xE3o cancelada pelo usu\xE1rio.");let c=Date.now(),u=Ee(o,e,t),p=[{text:u}];for(let H=0;H<e.length;H++){let $=e[H],N=$.associatedLabel||($.alt?`Imagem: ${$.alt}`:`Imagem ${H+1}`);p.push({text:`[ANEXO VISUAL ${H+1} - V\xCDNCULO: ${N}]:`}),p.push({inline_data:{mime_type:$.mediaType,data:$.base64}})}let d={system_instruction:{parts:[{text:At}]},contents:[{role:"user",parts:p}]},m=!0;ze.clear();let b=We(r),y=Te?We(Te):null,x=[];y&&_(y)&&y!==b&&x.push(y);for(let H of Ye)H!==b&&!x.includes(H)&&x.push(H);let h=[];_(b)&&h.push(b);for(let H of x)_(H)&&!h.includes(H)&&h.push(H);h.length<2&&h.push(...Ye.filter(H=>!h.includes(H)));let f=k.getHealthyKeys().filter(H=>!Mt(H.key)).sort((H,$)=>(H.lastLatencyMs??99999)-($.lastLatencyMs??99999)),g=k.getAllKeys().filter(H=>!Mt(H.key)),v=f.length>0?f:g.map(H=>({key:H.key,lastLatencyMs:H.lastLatencyMs,label:H.label})),C=new Set;function A(H,$,N,Q){let J=[];for(let V of $){for(let U of H){let ee=`${U.key}::${V}`;!C.has(ee)&&J.length<N&&(J.push({model:V,key:U.key,label:U.label||"Chave",timeout:Q}),C.add(ee))}if(J.length>=N)break}return J}let w=async(H,$)=>{if($.length===0||s?.aborted)return null;let N=$.map(()=>new AbortController),Q=()=>N.forEach(V=>{try{V.abort()}catch{}});s?.addEventListener("abort",Q,{once:!0});let J=$.map(V=>`${V.model.replace("gemini-","")}/${V.label}`).join(" | ");a?.(`\u26A1 ${H}: ${$.length} slot(s) [${J}]...`,"info");try{let V=$.map(async(ee,bt)=>{let je=N[bt],vt=setTimeout(()=>{try{je.abort(new Error(`Timeout ${ee.timeout/1e3}s (${ee.model}|${ee.label})`))}catch{je.abort()}},ee.timeout);try{let G=await so(ee.model,ee.key,d,m,je.signal);clearTimeout(vt);let X=St(io(G.rawText));return X.usedModel=G.usedModel,X.durationMs=Date.now()-c,X.promptSent=u,X.tokensUsed=G.data.usageMetadata?.totalTokenCount,X.promptTokens=G.data.usageMetadata?.promptTokenCount,X.candidatesTokens=G.data.usageMetadata?.candidatesTokenCount,X.rawResponse=G.rawText,N.forEach((yt,Gt)=>{if(Gt!==bt)try{yt.abort(new Error("Cancelado: vencedor respondeu."))}catch{yt.abort()}}),{plan:X,rawUsage:G.data.usageMetadata,usedModel:G.usedModel,usedKey:G.usedKey,slotLabel:ee.label}}catch(G){clearTimeout(vt);let X=G instanceof Error?G.message:String(G);throw(X.includes("429")||X.includes("Quota")||X.includes("RESOURCE_EXHAUSTED"))&&ro(ee.key,6e4),G}}),U=await Promise.any(V);return s?.removeEventListener("abort",Q),k.markWinner(U.usedKey),U.usedModel!==b&&(Te=U.usedModel),U}catch(V){return s?.removeEventListener("abort",Q),V instanceof AggregateError&&V.errors.length>0?oe=V.errors.map(U=>U instanceof Error?U.message:String(U)).join(" | "):V instanceof Error&&(oe=V.message),console.warn(`[EasyQuiz ${H}] Falha na onda:`,oe),null}},E=v.length,I=Math.min(Math.max(E,2)+(E>=2&&E<6?1:0),6),z=/pro/i.test(b),M=(H,$)=>{let N=$?/pro/i.test($):z,Q=$?/lite/i.test($):/lite/i.test(b);return H===0?N?15e3:Q?8e3:9e3:H===1?N?18e3:Q?1e4:12e3:N?2e4:14e3},D=6,K=0,oe="";for(;K<D;){if(s?.aborted)throw new Error("Opera\xE7\xE3o cancelada pelo usu\xE1rio.");let H=h.find(V=>!Array.from(C).some(U=>U.startsWith(`${v[0]?.key}::${V}`)))??h[0],$=M(K,H),N=A(v,h,I,$);if(N.length===0)break;let Q=K===0?"Onda 1":`Onda ${K+1}`,J=await w(Q,N);if(J){let V=J.plan.durationMs||Date.now()-c,U=te.maskKey(J.usedKey);return a?.(`\u2705 ${V}ms via '${J.usedModel}' (${J.slotLabel}: ${U})`,"info"),J}K++}throw new Error(oe||"Todas as ondas falharam. Verifique sua cota e conex\xE3o com a internet.")}var lo=[/\bfetch\b/i,/\bXMLHttpRequest\b/i,/\bWebSocket\b/i,/\b(?:localStorage|sessionStorage|indexedDB)\b/i,/\b(?:eval|Function|AsyncFunction|GeneratorFunction)\b/i,/\bimport(?:Scripts)?\b/i,/\bnavigator\s*\.\s*credentials\b/i,/\b(?:cookie|location\s*=|history\s*\.)/i,/\bwindow\s*\[\s*['"](?:fetch|eval|Function|localStorage|sessionStorage)/i];function Ae(o){let e=o?.engine||"smart",t=new Set(["dom","framework","keyboard","drag"]);return o?.autoAdvance&&t.add("navigation"),e==="javascript"&&t.add("javascript"),{engine:e,capabilities:t,maxAttemptsPerAction:e==="command"?1:2,maxActionMs:e==="command"?1500:3e3,allowJavaScript:e==="javascript",allowNavigation:!!o?.autoAdvance}}function et(o,e){if(o.t==="js"&&!e.allowJavaScript)throw new Error("A\xE7\xE3o JavaScript bloqueada pela engine atual. Use o motor JavaScript explicitamente.");if(o.t==="adv"&&!e.allowNavigation)throw new Error("Avan\xE7o autom\xE1tico bloqueado pela pol\xEDtica atual.")}function $t(o){if(!o.trim())throw new Error("JavaScript recusado: c\xF3digo vazio.");if(o.length>8e3)throw new Error("JavaScript recusado: c\xF3digo acima do limite operacional.");if(lo.find(t=>t.test(o)))throw new Error("JavaScript recusado: acesso externo, persist\xEAncia ou avalia\xE7\xE3o din\xE2mica n\xE3o permitidos.");if(!/^\s*(?:\/\/[^\n]*\n|\/\*[\s\S]*?\*\/|[\s\S])*\$eq\./.test(o)&&!o.includes("$eq."))throw new Error("JavaScript recusado: use somente a API declarativa $eq.")}var pe=['input:not([type="hidden"])',"textarea","select","button","a","label",'[role="button"]','[role="link"]','[role="radio"]','[role="checkbox"]','[role="option"]','[role="treeitem"]','[role="menuitemcheckbox"]','[role="menuitemradio"]','[contenteditable="true"]','[draggable="true"]',"[aria-grabbed]","[aria-dropeffect]","[data-widget-type]",".perseus-drag-item",".sortable-item",'[data-testid*="drag" i]','[data-testid*="card" i]','[data-testid*="option" i]','[data-testid*="choice" i]','[data-testid*="category" i]',"[data-choice]","[data-option]","[data-answer]","[data-value]",".quiz-option",".option-card",".choice-card",'[class*="option-card" i]','[class*="choice-card" i]','[class*="option-item" i]','[class*="choice-item" i]','[class*="answer-item" i]','[class*="alternative" i]','li[class*="choice" i]','li[class*="option" i]','li[class*="answer" i]','[data-role="dropzone"]',"[data-category]","[data-item-id]","[data-params][jsmodel]",'[class*="draggable-item" i]','[class*="drag-item" i]','[class*="sortable-card" i]','[class*="card-option" i]','[class*="tile" i][class*="option" i]'].join(","),Le=/(verificar|checar|check|conferir|validar|próxim[oa]|next|continuar|continue|avançar|prosseguir|enviar|submit|concluir|finalizar|terminar|começar|iniciar|start|vamos lá|próxima tarefa|next task|próxima pergunta|next question|marcar como concluíd[oa]|mostrar resumo|entendi|compreendi|ok|leitura concluída|seguir|ir para o exercício|fazer o teste|próximo artigo|ir para a aula)/i,ne=/(\banterior\b|\bvoltar\b|\bback\b|\bprev\b|\bprevious\b|recomeçar|\brestart\b|\breplay\b|\bretornar\b)/i,co=0;function tt(o){try{let e=o.closest('[hidden], [style*="display: none"], [style*="display:none"], [aria-hidden="true"]');if(e&&!me(e))return!1}catch{}try{let e=window.getComputedStyle?window.getComputedStyle(o):o.style;if(e&&(e.display==="none"||e.visibility==="hidden"))return!1}catch{}try{if(typeof o.getBoundingClientRect=="function"){let e=o.getBoundingClientRect();if(e.width>0||e.height>0)return!0}}catch{}return(o.textContent||"").trim().length>0}function B(o){try{if(typeof CSS<"u"&&typeof CSS.escape=="function")return CSS.escape(o)}catch{}return String(o).replace(/["\\]/g,"\\$&")}function S(o){let e=o;if(!e||typeof e.isConnected=="boolean"&&!e.isConnected||me(e))return!1;let t=e.tagName?.toLowerCase();if(["input","select","textarea","button"].includes(t)){let a=e.type?.toLowerCase();if(a==="checkbox"||a==="radio"){if(e.id)try{let n=e.ownerDocument?.querySelector(`label[for="${B(e.id)}"]`);if(n&&tt(n))return!0}catch{}let s=e.closest('label, .option-card, .quiz-option, .choice, .answer, [role="radio"], [role="checkbox"], [class*="option" i], [class*="choice" i], [class*="item" i], li, tr');if(s&&s!==e&&tt(s))return!0}try{if(!e.closest('[hidden], [style*="display: none"], [style*="display:none"], [aria-hidden="true"]')){let n=window.getComputedStyle?window.getComputedStyle(e):e.style;if(!n||n.display!=="none"&&n.visibility!=="hidden"){if(typeof e.getBoundingClientRect=="function"){let l=e.getBoundingClientRect();if(l.width>0||l.height>0)return!0}return!0}}}catch{}}return tt(e)}function uo(o){if(o==null)return"";if(typeof o=="string")return o;if(typeof o=="number"||typeof o=="boolean")return String(o);if(o instanceof Node)return o.textContent||"";try{if(typeof o?.toString=="function"){let e=o.toString();if(typeof e=="string")return e}}catch{}return""}function P(o,e=500){return uo(o).replace(/\s+/g," ").trim().slice(0,e)}function po(o){let e=o.dataset.easyquizId;if(e)return e;let t=`eq-${Date.now().toString(36)}-${(co+=1).toString(36)}`;return o.dataset.easyquizId=t,t}function me(o){return o?!!(o.closest('#easyquiz-shadow-root, .eq-sidebar, .eq-launcher, [data-easyquiz-ignore="true"], .btn-inject-eq, #btn-inject-script')||o.getAttribute?.("data-easyquiz-ignore")==="true"):!1}var Se=/(leaderboard|scoreboard|placar|ranking|trophy|pause|pausar|mute|mutar|audio|sound|som|música|music|configuraç|settings|theme|ajuda|help|report|denunciar|feedback|power-?up|streak|coins|fullscreen|full-screen|read-?aloud|audio-?player|(?:audio|sound|som|media)[-_ ]*volume|volume[-_ ]*(?:slider|control|level|btn|button|icon|mute)|vol-slider)/i;function O(o){if(!o||typeof o.getAttribute!="function"||typeof Element<"u"&&!(o instanceof Element))return!1;if(me(o))return!0;let e=o.tagName?.toLowerCase();if(["select","textarea"].includes(e)||e==="input"&&!["button","submit","reset"].includes((o.type||"").toLowerCase()))return!1;let a=o.closest?.('button, a, [role="button"], [class*="leaderboard" i], [data-testid*="leaderboard" i], [class*="scoreboard" i], [class*="trophy" i]')||o,s=String(a.getAttribute?.("data-testid")||a.getAttribute?.("data-test-id")||a.getAttribute?.("id")||""),n=String(a.getAttribute?.("aria-label")||""),l=String(a.getAttribute?.("title")||""),i=typeof a.className=="string"?a.className:typeof a.className?.baseVal=="string"?a.className.baseVal:"",r=P(a.textContent,60);return!!(Se.test(s)||Se.test(n)||Se.test(l)||Se.test(i)||r.length>0&&r.length<=25&&Se.test(r))}function Z(o){if(!o||typeof o.getAttribute!="function"||typeof Element<"u"&&!(o instanceof Element)||me(o)||O(o)||o.closest?.('.option-card, .choice-card, .quiz-option, [class*="option-card" i], [class*="choice-card" i], [class*="option-item" i], [class*="choice-item" i], [class*="answer-item" i], [data-testid*="option" i], [data-testid*="choice" i], [data-choice], [data-option], [data-answer], [role="radio"], [role="checkbox"], [role="option"]')||o.closest?.("header, nav, aside"))return!1;let e=typeof HTMLInputElement<"u"&&o instanceof HTMLInputElement||typeof HTMLButtonElement<"u"&&o instanceof HTMLButtonElement?o.value:"",t=P(o.getAttribute?.("aria-label")||o.textContent||o.getAttribute?.("value")||e),a=o.type,s=t.replace(/[\d\(\)\[\]\u2192>\u2022\-\/\\]+/g," ").trim(),n=String(o.getAttribute?.("data-testid")||o.getAttribute?.("data-test-id")||o.getAttribute?.("id")||o.getAttribute?.("href")||"").toLowerCase();return ne.test(s)||ne.test(t)?!1:Le.test(s)||Le.test(t)||n.includes("next")||n.includes("check")||n.includes("continue")||n.includes("proximo")||n.includes("forward")?!0:/^\d{1,3}$/.test(t.trim())?!!o.closest?.('[class*="pagination" i], [class*="pager" i], [class*="page-nav" i], [class*="step-indicator" i], [class*="breadcrumb" i], [aria-label*="p\xE1gina" i], [aria-label*="page" i], [role="navigation"], nav, [class*="steps" i]'):!1}function ot(o){let e=o.closest("tr");if(e){let r=e.querySelector("th, td:first-child"),c=r&&r!==o.closest("td")?P(r.textContent,100):"",u=P(o.closest("label, td")?.textContent||"",50);if(c&&u)return`${c}: ${u}`}let t=o.closest('.dropdown-row, [class*="dropdown-row" i], [class*="select-row" i]');if(t){let r=t.querySelector('.dropdown-label, [class*="label" i]'),c=r&&r!==o?P(r.textContent,150):"";if(c)return c}let a=o.getAttribute("aria-label");if(a)return P(a);let s=o.getAttribute("aria-labelledby");if(s){let r=s.split(/\s+/).map(c=>document.getElementById(c)?.textContent).filter(Boolean).join(" ");if(r.trim())return P(r)}if("labels"in o&&o.labels){let r=Array.from(o.labels??[]).map(c=>c.textContent).join(" ");if(r.trim())return P(r)}let n=o.closest('.docssharedWizToggleLabeledContainer, [role="listitem"], .answer, label, .quiz-option, .form-check, .option-card');if(n&&n!==o){let r=P(n.textContent);if(r)return r}let l=o instanceof HTMLInputElement||o instanceof HTMLButtonElement?o.value:"",i=o.getAttribute("placeholder")||o.getAttribute("title")||o.textContent||l||"";return P(i)}function at(o,e){let a=typeof HTMLSelectElement<"u"&&o instanceof HTMLSelectElement||o.tagName.toLowerCase()==="select"?o:null,s=o;o.dataset.easyquizRole=e;let n=o.tagName.toLowerCase(),l=["input","textarea","select","button"].includes(n)?n:"other",i=o.getAttribute("role")||"",r=(o.getAttribute("data-testid")||o.getAttribute("data-test-id")||"").toLowerCase(),c=(o.className&&typeof o.className=="string"?o.className:"").toLowerCase(),u=o.getAttribute("draggable")==="true"||o.classList.contains("perseus-drag-item")||o.classList.contains("sortable-item")||!!o.getAttribute("aria-grabbed")||/drag|card|option|item/i.test(r)||/drag|card-item|sortable/i.test(c),p=o.getAttribute("data-role")==="dropzone"||o.classList.contains("category-container")||o.hasAttribute("data-category")||!!o.getAttribute("aria-dropeffect")||/drop|category|bucket/i.test(r)||/dropzone|category-box|bucket|target-zone/i.test(c),m=P((u?"draggable":p?"dropzone":"")||s.type||i||l,40),b="";if(s.type==="checkbox"||s.type==="radio"||i==="radio"||i==="checkbox")b=s.checked||o.getAttribute("aria-checked")==="true"?"checked":"unchecked";else if(l==="button"||n==="a"||e==="navigation"||Z(o))b="";else{let v=typeof o.value=="string"||typeof o.value=="number"?o.value:"";b=P(v||o.getAttribute("data-category")||"",2e3)}let y=[];if(a&&a.options)for(let v of Array.from(a.options).slice(0,80))y.push({value:P(v.value),label:P(v.textContent)});else if(i==="combobox"||i==="listbox"||c.includes("select")||c.includes("dropdown")){let v=o.getAttribute("aria-controls")||o.getAttribute("aria-owns"),C=v?document.getElementById(v):o;if(C){let A=C.querySelectorAll('[role="option"], li, .dropdown-item, .option');for(let w of Array.from(A).slice(0,80)){let E=P(w.textContent);E&&y.push({value:w.getAttribute("data-value")||w.getAttribute("value")||E,label:E})}}}let x=!!(s.required||o.getAttribute("aria-required")==="true"),h=!!(s.disabled||o.getAttribute("aria-disabled")==="true"),f=po(o);return{id:o.id||f,tag:l,type:m,label:ot(o),name:P(s.name||o.getAttribute("name")||"",180),value:b,options:y,required:x,disabled:h,role:e}}var Pt=['[data-test-id*="exercise" i]','[data-testid*="exercise" i]',".perseus-renderer",".framework-perseus",".Qr7Oae","[data-item-id]",".freebirdFormviewerViewItemsItemItem",".que",".question-holder",".quiz-question",".question_holder",".display_question",'[data-functional-selector*="question"]',".question-container",'[class*="classification-layout" i]','[class*="quiz-container" i]','[data-cy="quiz-container"]',"[data-question-id]",'[data-testid*="question" i]','[class*="question-container" i]','[class*="question" i]','[class*="pergunta" i]','[class*="categoriz" i]',"article","form","section","main"].join(",");function Rt(o){if(!S(o))return-1/0;let e=o.getBoundingClientRect(),t=Array.from(o.querySelectorAll(pe)).filter(S),a=P(o.innerText||o.textContent||"",4e3).length;if(a<10||!t.length&&a<60)return-1/0;let s=Math.max(1,window.innerWidth*window.innerHeight),n=Math.max(1,e.width*e.height),l=Math.min(1,n/s),i=e.top+e.height/2,r=Math.abs(i-window.innerHeight/2)/Math.max(1,window.innerHeight),c=a>40?35:0,u=e.top>=0&&e.bottom<=window.innerHeight?25:0;return t.length*15+Math.min(60,a/20)+c+u-l*20-r*10}function Ne(o){let e=o;if(e.matches?.('article, [data-test-id*="exercise" i], [data-testid*="exercise" i], .perseus-renderer, .framework-perseus, [class*="question-container" i], .que')&&e.tagName.toLowerCase()!=="main"&&e.tagName.toLowerCase()!=="body")return e;for(;e.parentElement&&e.parentElement!==document.body&&e.parentElement!==document.documentElement;){let t=e.parentElement,a=t.tagName.toLowerCase();if(["header","footer","nav","aside"].includes(a))break;if(t.matches?.('article, [data-test-id*="exercise" i], [data-testid*="exercise" i], .perseus-renderer, .framework-perseus, [class*="question-container" i], .que')&&a!=="main"&&a!=="body"){e=t;break}let s=P(e.innerText||e.textContent||"",1e4),n=P(t.innerText||t.textContent||"",1e4),l=e.querySelectorAll(pe).length,i=t.querySelectorAll(pe).length;if(s.length<150&&n.length>s.length&&i<=l+4&&a!=="main"&&a!=="body"){e=t;continue}break}return e}function Nt(o){let e=o,t=e.closest('main, [role="main"], article, form, [data-test-id*="exercise" i], [data-testid*="exercise" i], .framework-perseus, section');if(t&&t!==document.body&&S(t))return t;let a=0;for(;e.parentElement&&e.parentElement!==document.body&&a<3;)e=e.parentElement,a++;return e||document.body}function j(){let o=document.querySelector('[class*="classification-layout" i], [class*="quiz-container" i][class*="classification" i]');if(o&&S(o))return o;let e=document.activeElement;if(e&&e!==document.body){let l=e.closest(Pt);if(l&&Rt(l)>0)return Ne(l)}let a=Array.from(document.querySelectorAll(Pt)).map(l=>({element:l,score:Rt(l)})).filter(l=>Number.isFinite(l.score)).sort((l,i)=>i.score-l.score),s=a.find(l=>{let i=l.element.tagName.toLowerCase();return i!=="main"&&i!=="body"&&l.score>0});if(s)return Ne(s.element);if(a.length>0&&a[0].score>0)return Ne(a[0].element);let n=document.querySelector('form, main, [role="main"]');return n&&S(n)?n:document.body}function Ot(o){let e=o.cloneNode(!0);e.querySelectorAll("script, style, iframe, object, embed, svg, canvas, noscript, audio, video").forEach(a=>a.remove());let t=["type","name","value","role","aria-label","aria-labelledby","aria-checked","aria-required","required","disabled","data-easyquiz-id","draggable","class","id","data-widget-type","data-role","data-category","data-testid"];return e.querySelectorAll("*").forEach(a=>{for(let s of Array.from(a.attributes))t.includes(s.name)||a.removeAttribute(s.name)}),e.outerHTML.replace(/\s+/g," ").slice(0,2e4)}function Oe(o){let e=Array.from(o.querySelectorAll(pe)),t=new Set,a=[];for(let i of e){if(!S(i)||Z(i)||O(i))continue;let r=(i.value||i.textContent||"").trim();if(ne.test(r))continue;let c=i.tagName.toLowerCase();["input","textarea","select"].includes(c)&&(t.add(i),a.push(i))}for(let i of e){if(!S(i)||Z(i)||O(i))continue;let r=(i.value||i.textContent||"").trim();if(ne.test(r))continue;let c=i.tagName.toLowerCase();if(["input","textarea","select"].includes(c))continue;let u=i.querySelector("input, textarea, select");if(!(u&&t.has(u))){if(i.hasAttribute("for")){let p=i.getAttribute("for"),d=p?i.ownerDocument.getElementById(p):null;if(d&&t.has(d))continue}if(c==="a"){let p=i.getAttribute("role");if(!(p==="button"||p==="radio"||p==="checkbox"||p==="option"||i.closest('[class*="choice" i], [class*="option" i], [class*="answer" i], [data-testid*="option" i]')))continue}a.push(i)}}let s=a.length>0&&a.every(i=>O(i)||/read-?aloud|audio/i.test(i.getAttribute("data-testid")||i.getAttribute("aria-label")||"")),n=document.body.querySelector('[class*="classification-layout" i]')||document.body.querySelector('[class*="classification" i]')||o,l=document.body.querySelector('[class*="classification" i]')!==null||o.querySelector('[class*="classification" i]')!==null||o.querySelector('[data-cy*="quiz" i]')!==null||o.querySelector('[class*="draggable-item" i]')!==null||o.querySelector('[class*="drag-item" i]')!==null||o.querySelector('[class*="sortable-card" i]')!==null||o.matches?.('[class*="classification" i]');if((a.length===0||s)&&l){s&&(a.length=0);let i=Array.from(n.querySelectorAll("button, div[class], span[class], p, li"));for(let r of i){if(!S(r)||Z(r)||O(r)||ne.test((r.textContent||"").trim()))continue;let c=(r.textContent||"").trim();if(c.length<2||c.length>300)continue;if(Array.from(r.children).some(p=>p.className&&p.textContent?.trim())||a.push(r),a.length>=50)break}}return a.slice(0,100).map(i=>at(i,"answer"))}function nt(o){let e=[o,o.parentElement,o.parentElement?.parentElement,document.body].filter(Boolean),t=new Set,a=[];for(let s of e)for(let n of Array.from(s.querySelectorAll(pe)))if(!(t.has(n)||!S(n)||!Z(n)||O(n))&&(t.add(n),a.push(at(n,"navigation")),a.length>=10))return a;return a}function Me(o=!1){let e=j();e=Ne(e),o&&(e=Nt(e));let t=Oe(e),a=nt(e);if(t.length===0){let i=Oe(document.body);i.length>0&&(e=Nt(e),t=Oe(e),t.length===0&&(t=i,e=document.querySelector('main, article, form, [role="main"]')||document.body))}a.length===0&&(a=nt(document.body));let s=e.innerText&&e.innerText.trim().length>0?e.innerText:e.textContent||"",n=s.length>4e4?P(s.slice(0,8e3),8e3)+`
[...conte\xFAdo extenso truncado...]
`+P(s.slice(-2e3),2e3):P(s,16e3),l=[...t,...a].slice(0,120);return!n||l.length===0&&n.length<30?P(document.body.innerText||document.body.textContent||"",16e3).length>=30?he():null:{sourceUrl:window.location.href.slice(0,2e3),pageTitle:document.title.slice(0,500)||"P\xE1gina de Quest\xE3o",questionText:n,htmlSnippet:Ot(e),controls:l,scope:e}}function he(){let o=document.body.innerText||document.body.textContent||document.documentElement.textContent||"",e=P(o,16e3),t=Oe(document.body),a=nt(document.body),s=[...t,...a].slice(0,120),n=document.querySelector('main, article, form, [role="main"], [data-test-id*="content" i], [class*="content" i]')||document.body;return{sourceUrl:window.location.href.slice(0,2e3),pageTitle:document.title.slice(0,500)||"P\xE1gina de Quest\xE3o",questionText:e,htmlSnippet:Ot(n).slice(0,15e3),controls:s,scope:n}}function Dt(o){let e=o.controls.map(t=>`${t.role}:${t.id}:${t.type}`).join("|");return[window.location.href,o.pageTitle,o.questionText.slice(0,400),e].join("::")}function R(o){return o?!!(o.closest('#easyquiz-shadow-root, .eq-sidebar, .eq-launcher, [data-easyquiz-ignore="true"], .btn-inject-eq, #btn-inject-script')||o.getAttribute?.("data-easyquiz-ignore")==="true"):!1}function q(o){return o==null?"":(typeof o=="string"?o:String(o)).replace(/^(\([0-9a-zA-Z]{1,2}\)|[0-9]{1,3}|[a-zA-Z])[\.\)\-\:]\s+/,"").replace(/[\.\u2026]{2,}/g," ").replace(/['"“”«»]/g,"").replace(/\s+/g," ").trim()}function F(o){if(!o||o instanceof HTMLInputElement||o instanceof HTMLSelectElement||o instanceof HTMLTextAreaElement||o.getAttribute("draggable")==="true"||o.classList.contains("dnd-card")||o.hasAttribute("data-category")||o.hasAttribute("data-dropzone"))return o;if(o.hasAttribute("for")){let a=o.getAttribute("for");if(a){let s=o.ownerDocument.getElementById(a);if(s)return s}}let e=o.closest('label, .option-card, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, tr, li, .dnd-card, [class*="option-card" i], [class*="choice-card" i], .dropdown-row, [class*="dropdown" i], [class*="select-row" i]');if(e&&!["article","section","main","form","body"].includes(e.tagName.toLowerCase())){let a=e.getAttribute("for"),n=(a?e.ownerDocument.getElementById(a):null)||e.querySelector('input:not([type="hidden"]), select, textarea');return n||e}let t=o.closest('button, a, [role="button"], [draggable="true"]');if(t)return t;if(["body","html","main","section","article","form"].includes(o.tagName.toLowerCase())){let a=o.querySelector('button, [role="button"], a, input:not([type="hidden"]), select, textarea, [role="radio"], [role="checkbox"], .option-card, label');if(a)return F(a)}return o}function Bt(o){let e=o;if(!e||!document.contains(e))try{e=j()}catch{}e=e||document.body;let t=s=>{let n=Array.from(s.querySelectorAll("tr")).filter(u=>S(u)&&u.querySelector('input[type="radio"], input[type="checkbox"]'));if(n.length>1)return n;let l=Array.from(s.querySelectorAll('input[type="checkbox"], input[type="radio"], [role="checkbox"], [role="radio"]')).filter(u=>S(u)&&!R(u));if(l.length>0)return l;let r=Array.from(s.querySelectorAll('.option-card, [role="option"], [class*="choice-card" i], [class*="option-card" i], li[class*="choice" i], li[class*="option" i]')).filter(u=>S(u)&&!R(u)).filter(u=>!u.parentElement?.closest('.option-card, [role="option"], [class*="choice-card" i], [class*="option-card" i]'));return r.length>0?r:Array.from(s.querySelectorAll('[class*="classification" i] [class], [class*="draggable-item" i], [class*="drag-item" i], [class*="sortable-card" i]')).filter(u=>{let p=u;return S(p)&&!R(p)&&(p.textContent||"").trim().length>2&&!Z(p)&&!O(p)&&!p.querySelector("[class]")})},a=t(e);return a.length>0?a:e!==document.body?t(document.body):[]}function L(o,e,t=!1){if(o==null)return null;let s=(typeof o=="string"?o:String(o)).trim().replace(/^["'“”«»]+|["'“”«»]+$/g,"");if(!s)return null;let n=B(s),l=document.querySelector(`[data-easyquiz-id="${n}"]`);if(l&&!R(l))return F(l);try{let d=document.getElementById(s);if(d&&S(d)&&!R(d))return d.hasAttribute("data-category")||d.hasAttribute("data-dropzone")||d.classList.contains("dnd-zone")?d:F(d)}catch{}try{let d=document.querySelector(`[data-item-id="${n}"]`);if(d&&S(d)&&!R(d))return F(d)}catch{}let i=s.match(/^(?:item|opção|opcao|afirmação|afirmacao|alternativa|linha|afirmativa|questão|questao|campo|blank|lacuna|input|resposta)?\s*#?_?([0-9]+)$/i);if(i){let d=parseInt(i[1],10);if(t){let b=document.body;try{b=j()||document.body}catch{}let y=Array.from(b.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, select, [contenteditable="true"]')).filter(x=>S(x)&&!R(x));if(d>=1&&d-1<y.length)return y[d-1];if(d===0&&y.length>0)return y[0]}let m=d-1;if(m>=0){let b=Bt();if(m<b.length){let h=b[m];if(h.tagName.toLowerCase()==="tr"){if(e){let g=h.querySelector(`input[value="${B(e)}" i], [data-value="${B(e)}" i]`);if(g)return g}let f=h.querySelector("input");if(f)return f}return F(h)}let y=document.body;try{y=j()||document.body}catch{}let x=Array.from(y.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, select, [contenteditable="true"]')).filter(h=>S(h)&&!R(h));if(m<x.length)return x[m]}}let r=s.match(/^(?:item|opção|opcao|afirmação|afirmacao|alternativa|linha|afirmativa|questão|questao)?\s*#?([a-eA-E])$/i);if(r){let d=r[1].toUpperCase().charCodeAt(0)-65;if(d>=0){let m=Bt();if(d<m.length){let b=m[d];if(b.tagName.toLowerCase()==="tr"){if(e){let x=b.querySelector(`input[value="${B(e)}" i], [data-value="${B(e)}" i]`);if(x)return x}let y=b.querySelector("input");if(y)return y}return F(b)}}}if(/^[a-zA-Z0-9_-]{1,10}$/.test(s)){let m=Array.from(document.querySelectorAll(`[data-category="${n}" i], [data-dropzone="${n}" i], [data-role="dropzone"][data-category="${n}" i]`)).find(h=>S(h)&&!R(h));if(m)return m;let y=Array.from(document.querySelectorAll(`input[value="${n}" i], [data-value="${n}" i], input[id="${n}" i], input[placeholder="${n}" i], textarea[placeholder="${n}" i], [title="${n}" i]`)).find(h=>S(h)&&!R(h));if(y)return F(y);let x=Array.from(document.querySelectorAll('.option-badge, [class*="badge" i], [class*="letter" i], .option-card span, label span')).find(h=>{if(!S(h)||R(h))return!1;let f=q(h.textContent).toLowerCase();return f===s.toLowerCase()||f===s.toLowerCase()+")"});if(x)return F(x)}try{let m=Array.from(document.querySelectorAll(`[name="${n}"], [value="${n}"], [placeholder="${n}" i], [title="${n}" i], [data-category="${n}" i], [data-dropzone="${n}" i], [data-testid="${n}" i], [data-test-id="${n}" i], [aria-label="${n}" i]`)).find(b=>S(b)&&!R(b));if(m)return m.hasAttribute("data-category")||m.hasAttribute("data-dropzone")||m.classList.contains("dnd-zone")?m:F(m)}catch{}if(/^[.#\[]|\s|[>+~:]/.test(s))try{let m=Array.from(document.querySelectorAll(s)).find(b=>S(b)&&!R(b));if(m)return F(m)}catch{}try{let d=s.replace(/"/g,""),m=`//button[normalize-space(.)="${d}"] | //a[normalize-space(.)="${d}"] | //*[not(*) and normalize-space(.)="${d}"] | //*[@aria-label="${d}"] | //*[@data-category="${d}"] | //*[@data-testid="${d}"]`,b=document.evaluate(m,document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);for(let y=0;y<b.snapshotLength;y++){let x=b.snapshotItem(y);if(x&&S(x)&&!R(x)){if(["body","html"].includes(x.tagName.toLowerCase())){let f=x.querySelector('button, [role="button"], a, input, [role="radio"], [role="checkbox"], label');if(f&&S(f))return F(f)}return x.closest('[data-role="dropzone"], [class*="category" i], [class*="bucket" i], [class*="column" i], [class*="drop" i]')||F(x)}}}catch{}let u=q(s).toLowerCase(),p=Array.from(document.querySelectorAll('button, a, div, span, li, p, label, input, textarea, select, [draggable="true"], [data-testid], [class*="option" i], [class*="card" i], [class*="item" i], [class*="choice" i], [class*="category" i], [class*="bucket" i]'));for(let d of p){if(!S(d)||R(d)||d.closest("header, nav, .stepper, .step-item, .progress-bar-container")||O(d)||!!(d.matches('article, section, form, main, [class*="container" i], [class*="grid" i], .dnd-pool, .dnd-zones')||d.querySelector('label, [role="radio"], [role="checkbox"], .dnd-card, [draggable="true"], .option-card, tr'))&&!d.matches(".dnd-zone, [data-category], [data-dropzone]"))continue;let b=q(d.textContent).toLowerCase(),y=q(d.getAttribute("aria-label")||"").toLowerCase(),x=q(d.getAttribute("placeholder")||"").toLowerCase(),h=q(d.getAttribute("title")||"").toLowerCase(),f=q(d.getAttribute("name")||"").toLowerCase(),g=q(d.getAttribute("data-category")||"").toLowerCase(),v=d instanceof HTMLInputElement||d instanceof HTMLButtonElement?d.value:"",C=q(v).toLowerCase(),A=b.startsWith(u+")")||b.startsWith(u+".")||b.startsWith(u+" -")||b.startsWith(u+":");if(b===u||y===u||x===u||h===u||f===u||g&&g===u||C&&C===u||A)return d.closest('[data-role="dropzone"], [class*="category" i], [class*="bucket" i], [class*="column" i], [class*="drop" i]')||F(d)}if(u.length>=3)for(let d of p){if(!S(d)||R(d)||d.closest("header, nav, .stepper, .step-item, .progress-bar-container")||O(d)||!!(d.matches('article, section, form, main, [class*="container" i], [class*="grid" i], .dnd-pool, .dnd-zones')||d.querySelector('label, [role="radio"], [role="checkbox"], .dnd-card, [draggable="true"], .option-card, tr'))&&!d.matches(".dnd-zone, [data-category], [data-dropzone]"))continue;let b=q(d.textContent).toLowerCase(),y=q(d.getAttribute("aria-label")||"").toLowerCase(),x=q(d.getAttribute("placeholder")||"").toLowerCase(),h=q(d.getAttribute("title")||"").toLowerCase(),f=q(d.getAttribute("name")||"").toLowerCase();if(b.includes(u)||y.includes(u)||x.includes(u)||h.includes(u)||f.includes(u)){if(Array.from(d.children).some(A=>{let w=q(A.textContent).toLowerCase();return w&&w.includes(u)}))continue;return d.closest('[data-role="dropzone"], [class*="category" i], [class*="bucket" i], [class*="column" i], [class*="drop" i]')||F(d)}let g=u.split(/\s+/).filter(Boolean);if(g.length>=3){let v=g.slice(0,Math.min(5,g.length)).join(" ");if(b.includes(v)||y.includes(v)||x.includes(v))return F(d)}}return null}function _t(o,e){for(let t of e)o.dispatchEvent(new Event(t,{bubbles:!0,composed:!0}))}function W(o,e){if(!o)return;try{o.scrollIntoView({block:"nearest",inline:"nearest",behavior:"instant"})}catch{}try{o.focus?.()}catch{}let t=o.getBoundingClientRect(),a=e?e[0]:Math.round(t.left+Math.max(1,t.width/2)),s=e?e[1]:Math.round(t.top+Math.max(1,t.height/2)),n={bubbles:!0,cancelable:!0,composed:!0,view:window,clientX:a,clientY:s};try{o.dispatchEvent(new PointerEvent("pointerover",{...n}))}catch{}try{o.dispatchEvent(new MouseEvent("mouseover",{...n}))}catch{}try{o.dispatchEvent(new PointerEvent("pointerdown",{...n,button:0,buttons:1}))}catch{}try{o.dispatchEvent(new MouseEvent("mousedown",{...n,button:0,buttons:1}))}catch{}try{o.dispatchEvent(new PointerEvent("pointerup",{...n,button:0,buttons:0}))}catch{}try{o.dispatchEvent(new MouseEvent("mouseup",{...n,button:0,buttons:0}))}catch{}try{o.dispatchEvent(new MouseEvent("click",{...n,button:0,buttons:0}))}catch{}try{o.click()}catch{}try{let l=Object.keys(o).find(i=>i.startsWith("__reactFiber")||i.startsWith("__reactInternalInstance"));if(l){let i=o[l];for(;i;){let r=i.memoizedProps||i.pendingProps;if(r?.onClick){r.onClick({type:"click",target:o,currentTarget:o,bubbles:!0,cancelable:!0,preventDefault:()=>{},stopPropagation:()=>{}});break}i=i.return}}}catch{}try{let l=Object.keys(o).find(i=>i.startsWith("__reactProps"));if(l){let i=o[l];i?.onClick&&i.onClick({type:"click",target:o,currentTarget:o,bubbles:!0,cancelable:!0,preventDefault:()=>{},stopPropagation:()=>{}})}}catch{}try{let l=o._vei;l?.onClick&&(Array.isArray(l.onClick.value)?l.onClick.value:[l.onClick.value]).forEach(r=>{try{r({type:"click",target:o})}catch{}})}catch{}if(o.getAttribute("role")==="button"||o.getAttribute("tabindex")!==null)try{o.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0,cancelable:!0})),o.dispatchEvent(new KeyboardEvent("keyup",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0,cancelable:!0}))}catch{}}function De(o,e){let t=o;if(t.hasAttribute("for")){let c=t.getAttribute("for"),u=t.ownerDocument.getElementById(c);u&&(t=u)}if(typeof HTMLSelectElement<"u"&&t instanceof HTMLSelectElement||t.tagName?.toLowerCase()==="select"||t.getAttribute("role")==="combobox"||t.getAttribute("role")==="listbox"||t.matches?.('[role="combobox"], [role="listbox"], [class*="select" i], [class*="dropdown" i]')){Be(t,[e]);return}let s=t.querySelector('select, [role="combobox"], [role="listbox"]');if(s){Be(s,[e]);return}if(!(t instanceof HTMLInputElement)&&!(t instanceof HTMLTextAreaElement)&&!(t instanceof HTMLSelectElement)&&!t.isContentEditable){let c=t.querySelector('input:not([type="hidden"]), textarea, select, [contenteditable="true"]');if(c)t=c;else{let p=t.closest('.form-group, .field, [class*="input" i], [class*="control" i], label, tr, td, li, p, div')?.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, select, [contenteditable="true"]');if(p)t=p;else{let d=t.nextElementSibling;for(;d;){if(d instanceof HTMLInputElement&&!["hidden","button","submit","checkbox","radio"].includes(d.type)||d instanceof HTMLTextAreaElement||d instanceof HTMLElement&&d.isContentEditable){t=d;break}let m=d.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(m){t=m;break}d=d.nextElementSibling}}}}if(t instanceof HTMLButtonElement||t.tagName.toLowerCase()==="a"||t.getAttribute("role")==="button"||t instanceof HTMLInputElement&&["button","submit","reset","image"].includes(t.type)){let c=t.parentElement?.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(c)t=c;else{let u=document.body;try{u=j()||document.body}catch{}let p=u.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(p)t=p;else{console.warn("[EasyQuiz] setNativeValue: Nenhum campo de texto encontrado para receber o valor.");return}}}if(!(t instanceof HTMLInputElement)&&!(t instanceof HTMLTextAreaElement)&&!(t instanceof HTMLSelectElement)&&!t.isContentEditable){let c=document.body;try{c=j()||document.body}catch{}let u=c.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(u)t=u;else{console.warn("[EasyQuiz] setNativeValue: Nenhum campo de texto encontrado para receber o valor.");return}}if(t instanceof HTMLInputElement&&["checkbox","radio"].includes(t.type)){let c=["true","1","checked","yes","sim"].includes(e.toLowerCase())||e===t.value;se(t,c);return}let l=String(e??""),i=l;if(t instanceof HTMLInputElement&&t.type==="number"){let c=l.replace(",",".").replace(/[^0-9.-]/g,"");c&&!isNaN(Number(c))&&(i=c)}try{t.scrollIntoView?.({block:"center",inline:"center",behavior:"instant"}),t.focus?.()}catch{}let r=!1;try{if(t instanceof HTMLInputElement||t instanceof HTMLTextAreaElement){if(t.type!=="number"){try{t.select?.()}catch{}r=document.execCommand?.("insertText",!1,i)||!1}}else if(t.isContentEditable){try{document.execCommand?.("selectAll",!1,void 0)}catch{}r=document.execCommand?.("insertText",!1,i)||!1}}catch{}if(t instanceof HTMLInputElement||t instanceof HTMLTextAreaElement){try{let p=t._valueTracker;p&&p.setValue(i===""?" ":"")}catch{}let c=t instanceof HTMLTextAreaElement?HTMLTextAreaElement.prototype:HTMLInputElement.prototype,u=Object.getOwnPropertyDescriptor(c,"value")?.set;u?u.call(t,i):t.value=i;try{t.dispatchEvent(new KeyboardEvent("keydown",{bubbles:!0,cancelable:!0,key:i.slice(-1)||"a"}))}catch{}try{t.dispatchEvent(new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,composed:!0,data:i,inputType:"insertText"}))}catch{}try{t.dispatchEvent(new InputEvent("input",{bubbles:!0,cancelable:!0,composed:!0,data:i,inputType:"insertText"}))}catch{t.dispatchEvent(new Event("input",{bubbles:!0,cancelable:!0,composed:!0}))}try{t.dispatchEvent(new KeyboardEvent("keyup",{bubbles:!0,cancelable:!0,key:i.slice(-1)||"a"}))}catch{}try{t.dispatchEvent(new Event("change",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}try{t.dispatchEvent(new FocusEvent("blur",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}if(t.value!==i&&!(t instanceof HTMLInputElement&&t.type==="number"&&Number(t.value)===Number(i))){t.value=i;try{u?.call(t,i)}catch{}}return}if(t.isContentEditable){if(t.textContent?.trim()!==i.trim()){t.textContent=i;try{t.innerText=i}catch{}}try{t.dispatchEvent(new InputEvent("input",{bubbles:!0,cancelable:!0,composed:!0,data:i,inputType:"insertText"}))}catch{t.dispatchEvent(new Event("input",{bubbles:!0,cancelable:!0,composed:!0}))}try{t.dispatchEvent(new Event("change",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}try{t.dispatchEvent(new FocusEvent("blur",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}return}try{"value"in t&&(t.value=i),t.dispatchEvent(new Event("input",{bubbles:!0,cancelable:!0,composed:!0})),t.dispatchEvent(new Event("change",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}}function ke(o,e=""){if(o==null)return e;let t=typeof o=="string"?o:String(o);if(!t)return e;let a=/^(eq-|#|\$|\.|input_|mat-|choice_|radio_|chk_)/i.test(t),s=q(t),n=L(t)||L(s);if(!n)return a?e:s||e;let l=n.closest('label, .option-card, [class*="choice" i], [class*="option" i], .quiz-option, tr, td, li');if(l){let p=q(l.textContent);if(p&&p.length>0&&p.length<150)return p}if(n.id){let p=document.querySelector(`label[for="${B(n.id)}"]`);if(p){let d=q(p.textContent);if(d&&d.length>0&&d.length<150)return d}}let i=n.getAttribute("aria-label");if(i)return q(i);let r=n.getAttribute("placeholder");if(r)return q(r);let c=q(n.textContent);if(c&&c.length>0&&c.length<120)return c;let u=n instanceof HTMLInputElement||n instanceof HTMLButtonElement?n.value:"";return u?q(u):a?e:s||e}function se(o,e){if(!o)return;let t=o.closest('.option-card, label, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, [class*="option" i], [class*="choice" i], li, tr')||o,a=o instanceof HTMLInputElement&&["checkbox","radio"].includes(o.type)?o:t.querySelector('input[type="checkbox"], input[type="radio"]');!a&&t.hasAttribute("for")&&(a=t.ownerDocument.getElementById(t.getAttribute("for")));let s=t&&S(t)?t:o;if(a){let n=a.type==="radio",l=a.type==="checkbox",i=!!a._valueTracker;if(a.checked===e){if(n&&e){t.setAttribute("aria-checked","true"),t.setAttribute("aria-selected","true"),t.classList.add("selected","active","checked");return}if(l){t.setAttribute("aria-checked",e?"true":"false"),t.setAttribute("aria-selected",e?"true":"false"),t.classList.toggle("selected",e),t.classList.toggle("active",e),t.classList.toggle("checked",e);return}}s&&s!==a&&W(s);try{a.focus?.(),a.click()}catch{}if(a.checked!==e){try{let c=a._valueTracker;c&&c.setValue(!e)}catch{}try{Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"checked")?.set?.call(a,e)}catch{}a.checked=e,_t(a,["input","change"])}t.setAttribute("aria-checked",e?"true":"false"),t.setAttribute("aria-selected",e?"true":"false"),t.classList.toggle("selected",e),t.classList.toggle("active",e),t.classList.toggle("checked",e)}else{if((t.getAttribute("aria-checked")==="true"||t.getAttribute("aria-selected")==="true"||t.getAttribute("data-selected")==="true"||t.getAttribute("data-checked")==="true"||t.classList.contains("selected")||t.classList.contains("active")||t.classList.contains("checked"))===e&&e)return;W(s),t.setAttribute("aria-checked",e?"true":"false"),t.setAttribute("aria-selected",e?"true":"false"),t.classList.toggle("selected",e),t.classList.toggle("active",e),t.classList.toggle("checked",e)}}function Be(o,e){let t=typeof HTMLSelectElement<"u"&&o instanceof HTMLSelectElement||o.tagName?.toLowerCase()==="select"?o:o.querySelector("select");if(t){let l=e.map(c=>q(c).toLowerCase()),i=!1,r=(c,u)=>{c.selected=!0,t.selectedIndex=u;try{t.value=c.value}catch{}try{Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype,"value")?.set?.call(t,c.value)}catch{}try{let p=t._valueTracker;p&&p.setValue(c.value)}catch{}i=!0};for(let c=0;c<t.options.length;c++){let u=t.options[c],p=u.value.toLowerCase(),d=q(u.textContent).toLowerCase();if(l.some(b=>b===p||b===d)){if(r(u,c),!t.multiple)break}else t.multiple||(u.selected=!1)}if(!i)for(let c of l){let u=c.match(/^(?:item|opção|opcao|alternativa|linha|escolha|campo)?\s*#?_?([0-9]+)$/i);if(u){let p=parseInt(u[1],10),m=t.options[0]?.value===""||t.options[0]?.disabled?p:p>=1?p-1:0;if(m>=0&&m<t.options.length&&(r(t.options[m],m),!t.multiple))break}}if(!i){for(let c of l)if(/^[a-z]$/i.test(c)){let u=c.toUpperCase().charCodeAt(0)-65,d=t.options[0]?.value===""||t.options[0]?.disabled?u+1:u;if(d>=0&&d<t.options.length&&(r(t.options[d],d),!t.multiple))break}}if(!i){let c=u=>u.normalize("NFD").replace(/[\u0300-\u036f]/g,"");for(let u=0;u<t.options.length;u++){let p=t.options[u],d=c(p.value.toLowerCase()),m=c(q(p.textContent).toLowerCase());if(l.some(y=>{let x=c(y);return d.includes(x)||m.includes(x)||x.length>2&&(x.includes(d)||x.includes(m))})&&(r(p,u),!t.multiple))break}}if(i){_t(t,["focus","input","change","blur"]);return}}let a=o.matches?.('[role="combobox"], [role="listbox"], [class*="select" i], [class*="dropdown" i]')?o:o.closest('[role="combobox"], [role="listbox"], [class*="select" i], [class*="dropdown" i]');a&&W(a);let s=e.map(l=>q(l).toLowerCase()),n=Array.from(document.querySelectorAll('[role="listbox"] [role="option"], [role="menu"] [role="menuitem"], .select-dropdown li, .dropdown-menu .dropdown-item, .ant-select-item-option, .MuiMenuItem-root, [class*="option-item"], li[data-value]')).filter(l=>S(l)&&!R(l));for(let l of s){let i=n.find(c=>{let u=q(c.textContent).toLowerCase(),p=q(c.getAttribute("data-value")||c.getAttribute("value")||"").toLowerCase();return u===l||p===l||u.includes(l)||l.length>2&&l.includes(u)});if(i){W(i);let c=i.querySelector('input[type="radio"], input[type="checkbox"]');c&&se(c,!0);return}let r=L(l);if(r){W(r);return}}}function mo(o,e){try{let t=new DataTransfer;try{t.setData("text/plain",o)}catch{}try{t.setData("text/html",e)}catch{}return t}catch{return null}}function it(o){try{o.click()}catch{let e=o.ownerDocument.defaultView||window;o.dispatchEvent(new e.MouseEvent("click",{bubbles:!0,cancelable:!0,composed:!0,view:e}))}}function ie(o,e){let t=q(o).toLowerCase();if(!t)return null;let a=e==="source"?'.dnd-card, [draggable="true"]':'[data-dropzone], [data-category], [data-role="dropzone"]',s=Array.from(document.querySelectorAll(a)),n=e==="destination"?s.find(l=>[l.getAttribute("data-category"),l.getAttribute("data-dropzone")].some(i=>i?.trim().toLowerCase()===t)):null;return n&&S(n)&&!R(n)?n:s.find(l=>{if(!S(l)||R(l))return!1;let i=q(`${l.textContent||""} ${l.getAttribute("data-category")||""} ${l.getAttribute("data-dropzone")||""}`).toLowerCase();return i===t||i.includes(t)})||null}async function Ve(o,e,t=1){try{o.scrollIntoView({block:"center",inline:"center",behavior:"instant"})}catch{}let a=o.getBoundingClientRect(),s=e.getBoundingClientRect(),n=Math.round(a.left+Math.max(1,a.width/2)),l=Math.round(a.top+Math.max(1,a.height/2)),i=Math.round(s.left+Math.max(1,s.width/2)),r=Math.round(s.top+Math.max(1,s.height/2)),c=q(e.textContent).toLowerCase();if(c){let y=Array.from(o.querySelectorAll('button, [role="button"], input[type="radio"], input[type="checkbox"], option, .btn, [class*="tag" i]')).find(x=>{let h=q(x.textContent).toLowerCase(),f=x instanceof HTMLInputElement||x instanceof HTMLOptionElement?q(x.value).toLowerCase():"";return h&&(c.includes(h)||h.includes(c))||f&&(c.includes(f)||f.includes(c))});y&&(W(y),await new Promise(x=>setTimeout(x,120)))}it(o),await new Promise(b=>setTimeout(b,140)),it(e);let u=e.querySelector('[data-role="dropzone"], [class*="bucket" i], [class*="slot" i], [class*="drop" i], [class*="target" i], [class*="items" i], ul, ol');if(u&&u!==e&&it(u),await new Promise(b=>setTimeout(b,100)),!e.contains(o)&&o.matches('.dnd-card, [draggable="true"]')&&e.matches('.dnd-zone, [data-dropzone], [data-role="dropzone"]')&&e.appendChild(o),e.contains(o)&&o.matches('.dnd-card, [draggable="true"]'))return;let p={bubbles:!0,cancelable:!0,composed:!0,view:window,clientX:n,clientY:l,screenX:n,screenY:l,button:0,buttons:1};try{o.dispatchEvent(new PointerEvent("pointerdown",{...p,isPrimary:!0,pointerId:1,pointerType:"mouse",pressure:.5}))}catch{}o.dispatchEvent(new MouseEvent("mousedown",p));let d=4;for(let b=1;b<=d;b++){let y=Math.round(n+(i-n)*(b/d)),x=Math.round(l+(r-l)*(b/d)),h={...p,clientX:y,clientY:x,screenX:y,screenY:x};try{o.dispatchEvent(new PointerEvent("pointermove",{...h,isPrimary:!0,pointerId:1,pointerType:"mouse",pressure:.5}))}catch{}document.dispatchEvent(new MouseEvent("mousemove",h))}let m={bubbles:!0,cancelable:!0,composed:!0,view:window,clientX:i,clientY:r,screenX:i,screenY:r,button:0,buttons:0};try{e.dispatchEvent(new PointerEvent("pointerup",{...m,isPrimary:!0,pointerId:1,pointerType:"mouse",pressure:0}))}catch{}e.dispatchEvent(new MouseEvent("mouseup",m)),e.dispatchEvent(new MouseEvent("click",m));try{let b=mo(P(o.textContent),o.outerHTML),y={...p},x={...m};b&&(y.dataTransfer=b,x.dataTransfer=b);let h=o.ownerDocument.defaultView?.DragEvent;if(!h)throw new Error("DragEvent n\xE3o dispon\xEDvel neste documento");o.dispatchEvent(new h("dragstart",y)),e.dispatchEvent(new h("dragenter",x)),e.dispatchEvent(new h("dragover",x)),e.dispatchEvent(new h("drop",x)),o.dispatchEvent(new h("dragend",y))}catch(b){console.warn("[EasyQuiz] DragEvent ignorado com seguran\xE7a:",b)}try{let b=new Touch({identifier:1,target:o,clientX:n,clientY:l}),y=new Touch({identifier:1,target:e,clientX:i,clientY:r});o.dispatchEvent(new TouchEvent("touchstart",{bubbles:!0,cancelable:!0,touches:[b]})),e.dispatchEvent(new TouchEvent("touchmove",{bubbles:!0,cancelable:!0,touches:[y]})),e.dispatchEvent(new TouchEvent("touchend",{bubbles:!0,cancelable:!0,touches:[]}))}catch{}if(t>=2&&!e.contains(o))try{o.focus?.(),o.dispatchEvent(new KeyboardEvent("keydown",{key:" ",code:"Space",bubbles:!0})),o.dispatchEvent(new KeyboardEvent("keyup",{key:" ",code:"Space",bubbles:!0})),await new Promise(b=>setTimeout(b,80)),e.focus?.(),e.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",bubbles:!0})),e.dispatchEvent(new KeyboardEvent("keyup",{key:"Enter",code:"Enter",bubbles:!0}))}catch{}}var Kt={fill:(o,e)=>{let t=L(o);t?De(t,e):console.warn(`$eq.fill: Elemento '${o}' n\xE3o encontrado`)},click:o=>{let e=L(o);e?!!(e.closest('.option-card, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, [class*="option" i], [class*="choice" i]')||e.querySelector('input[type="radio"], input[type="checkbox"]')||e instanceof HTMLInputElement&&["checkbox","radio"].includes(e.type))?se(e,!0):W(e):console.warn(`$eq.click: Elemento '${o}' n\xE3o encontrado`)},check:(o,e)=>{let t=L(o);t?se(t,e):console.warn(`$eq.check: Elemento '${o}' n\xE3o encontrado`)},find:(o,e)=>L(o,e),drag:(o,e)=>{let t=ie(o,"source")||L(o),a=ie(e,"destination")||L(e);t&&a?Ve(t,a):console.warn(`$eq.drag: Origem ou destino n\xE3o encontrado ('${o}' -> '${e}')`)},categorize:async(o,e)=>{let t=ie(o,"source")||L(o),a=ie(e,"destination")||L(e);if(!t||!a){console.warn(`$eq.categorize: Item ou categoria n\xE3o encontrados ('${o}' -> '${e}')`);return}await Ve(t,a)},execute:(o,e=!1,t=1)=>lt(o,e,t)};typeof window<"u"&&(window.$eq=Kt);async function ho(o,e=1,t=Ae()){if(et(o,t),o.t==="js"){let i=String(o.v||"");$t(i);try{new Function("$eq","document","window",i)(Kt,document,window)}catch(r){throw console.warn("[EasyQuiz JS Execution]",r),r}return}if(o.t==="drag"){let i=ie(o.from,"source")||L(o.from),r=ie(o.to,"destination")||L(o.to);!i&&o.from&&(i=L(q(o.from))),!r&&o.to&&(r=L(q(o.to))),i&&r?await Ve(i,r,e):console.warn(`[EasyQuiz] Drag: alvo n\xE3o encontrado ('${o.from}' -> '${o.to}')`);return}let a=o.id!==void 0&&o.id!==null?String(o.id):"";!a&&o.t==="val"&&(a=o.target??o.name??o.selector??"1");let s=o.v!==void 0?o.v:o.value!==void 0?o.value:o.val!==void 0?o.val:o.text,n=s!=null?String(s).trim():"",l=L(a,n,o.t==="val"||o.t==="sel");if(!l&&a&&(l=L(q(a),n,o.t==="val"||o.t==="sel")),l&&n){if(l instanceof HTMLInputElement&&l.type==="radio"&&l.name){if(q(l.value).toLowerCase()!==q(n).toLowerCase()){let i=document.querySelector(`input[type="radio"][name="${B(l.name)}"][value="${B(n)}" i]`);if(i)l=i;else{let c=Array.from(document.querySelectorAll(`input[type="radio"][name="${B(l.name)}"]`)).find(u=>{let p=u.closest("label, .vf-label, .option-card, tr, td, div");return p&&q(p.textContent).toLowerCase().includes(q(n).toLowerCase())});c&&(l=c)}}}else if(!(l instanceof HTMLInputElement)&&!(l instanceof HTMLSelectElement)&&!(l instanceof HTMLTextAreaElement)){let i=l.querySelector(`input[value="${B(n)}" i], [data-value="${B(n)}" i]`);if(i)l=i;else{let c=Array.from(l.querySelectorAll('input[type="radio"], input[type="checkbox"]')).find(u=>{let p=u.closest("label, .vf-label, .option-card, td, div");return p&&q(p.textContent).toLowerCase().includes(q(n).toLowerCase())});c&&(l=c)}}}if(!l&&(o.t==="val"||o.t==="sel")){let i=document.body;try{i=j()||document.body}catch{}let r=Array.from(i.querySelectorAll(o.t==="sel"?'select, [role="combobox"], [role="listbox"]':'input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, select, [contenteditable="true"]')).filter(c=>S(c)&&!R(c));if(r.length===1)l=r[0];else if(r.length>1){let c=q(a).toLowerCase(),u=c.match(/^#?_?([0-9]+)$/);if(u){let p=parseInt(u[1],10);p>=1&&p<=r.length?l=r[p-1]:p>=0&&p<r.length&&(l=r[p])}l||(l=r.find(d=>{let m=(d.getAttribute("placeholder")||"").toLowerCase(),b=(d.name||"").toLowerCase(),y=(d.getAttribute("aria-label")||"").toLowerCase(),x=(d.id||"").toLowerCase(),h=q(ot(d)).toLowerCase(),f=q(d.closest('label, tr, td, .form-group, .field, [class*="row" i], div')?.textContent||"").toLowerCase();return m.includes(c)||b.includes(c)||y.includes(c)||x.includes(c)||h&&h.includes(c)||c.length>=2&&f.includes(c)})||(r.length===1?r[0]:null))}}if(!l&&o.t!=="adv")throw new Error(`Alvo '${a}' n\xE3o encontrado no DOM para a\xE7\xE3o '${o.t}'.`);switch(o.t){case"val":if(l){let r=l instanceof HTMLInputElement||l instanceof HTMLTextAreaElement||l instanceof HTMLSelectElement||l.isContentEditable?l:l.querySelector('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]');if(!r){let d=l.closest('.form-group, .field, [class*="input" i], [class*="control" i], label, tr, td, li, p, div')?.querySelector('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]');d&&(r=d)}if(!r){let p=l.nextElementSibling;for(;p;){if(p instanceof HTMLInputElement&&!["hidden","button","submit","checkbox","radio"].includes(p.type)||p instanceof HTMLTextAreaElement||p instanceof HTMLElement&&p.isContentEditable){r=p;break}let d=p.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(d){r=d;break}p=p.nextElementSibling}}if(!r){let p=document.body;try{p=j()||document.body}catch{}let d=Array.from(p.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]')).filter(m=>S(m)&&!R(m));d.length>0&&(r=d[0])}let c=o.v!==void 0?o.v:o.value!==void 0?o.value:o.val!==void 0?o.val:o.text,u=c!=null?String(c):"";De(r||l,u)}break;case"chk":l&&se(l,!!o.c);break;case"sel":if(l){let r=Array.isArray(o.v)?o.v:[String(o.v)];Be(l,r)}break;case"clk":if(l)if(!!(l.closest('.option-card, label, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, [class*="option" i], [class*="choice" i], [class*="answer" i], li, tr')||l.querySelector('input[type="radio"], input[type="checkbox"]')||l instanceof HTMLInputElement&&["checkbox","radio"].includes(l.type))){let c=o.c!==void 0?!!o.c:!0;se(l,c)}else W(l,o.co);break;case"adv":let i=st(o.id);if(i){await rt(i,1200);let r=o.id||i.textContent?.trim()||"";r&&Qe(window.location.hostname,{advanceSelector:r}),W(i)}else console.warn("[EasyQuiz] Bot\xE3o de avan\xE7o n\xE3o localizado.");break}}function go(){let o=["button","a",'[role="button"]','input[type="submit"]','input[type="button"]','[data-testid*="check" i]','[data-test-id*="check" i]'].join(",");return Array.from(document.querySelectorAll(o)).find(t=>{if(!S(t)||R(t)||t.closest("header, nav, aside"))return!1;let a=t instanceof HTMLInputElement||t instanceof HTMLButtonElement?t.value:"",s=(t.textContent||a||t.getAttribute("aria-label")||"").trim();return/(verificar|checar|check|conferir|validar|enviar|responder)/i.test(s)})||null}function st(o){let e=d=>{let m=(d.getAttribute("aria-label")||d.textContent||(d instanceof HTMLInputElement||d instanceof HTMLButtonElement?d.value:"")||"").trim();return ne.test(m)};if(o){let d=L(o);if(d&&S(d)&&!R(d)&&!O(d)&&!e(d))return d}try{let d=xe(window.location.hostname);if(d.advanceSelector){let m=L(d.advanceSelector);if(m&&S(m)&&!R(m)&&!O(m)&&!e(m))return m}}catch{}let t=["button","a",'[role="button"]','[role="link"]','input[type="button"]','input[type="submit"]','[data-testid*="next" i]','[data-testid*="continue" i]','[data-testid*="check" i]','[data-test-id*="next" i]','[data-test-id*="continue" i]','[data-test-id*="check" i]','[class*="next" i]','[class*="continue" i]','[class*="proximo" i]','[class*="avancar" i]'].join(","),a=Array.from(document.querySelectorAll(t)),s=d=>{let m=d instanceof HTMLInputElement||d instanceof HTMLButtonElement?d.value:"";return(d.getAttribute("aria-label")||d.textContent||m||"").trim()},n=d=>{let m=s(d).trim();return/^\d{1,3}$/.test(m)?!!d.closest('[class*="pagination" i], [class*="pager" i], [class*="page-nav" i], [class*="step-indicator" i], [class*="breadcrumb" i], [class*="steps" i], [aria-label*="p\xE1gina" i], [aria-label*="page" i], [role="navigation"], nav'):!1},l=a.filter(d=>S(d)&&!R(d)&&!d.closest("header, aside")&&!O(d)&&!e(d));for(let d of l){let m=s(d),b=m.replace(/[\d\(\)\[\]\u2192>\u2022\-\/\\]+/g," ").trim();if((Le.test(m)||Le.test(b))&&!n(d)&&!O(d))return d}for(let d of l)if(Z(d)&&!O(d)&&!n(d))return d;let i=document.querySelector('[data-test-id*="next" i], [data-testid*="next" i], [aria-label*="next" i], [aria-label*="pr\xF3xim" i], [aria-label*="avan\xE7ar" i], [aria-label*="continuar" i]');if(i&&S(i)&&!R(i)&&!O(i)&&!e(i))return i;let r=Array.from(document.querySelectorAll('input[type="submit"], button[type="submit"]'));for(let d of r)if(S(d)&&!R(d)&&!e(d)&&!O(d)&&!n(d))return d;let c=Array.from(document.querySelectorAll('button, [role="button"]')),u=window.innerHeight,p=c.filter(d=>{if(!S(d)||R(d)||e(d)||O(d)||d.closest("header, nav, aside, .eq-sidebar")||n(d))return!1;let m=d.getBoundingClientRect();return m.top>u*.45&&m.height>=24&&m.width>=24});if(p.length>0)return p.sort((d,m)=>{let b=d.getBoundingClientRect(),y=m.getBoundingClientRect(),x=b.left+b.top;return y.left+y.top-x}),p[0];for(let d of l)if(Z(d)&&!O(d))return d;return null}async function rt(o,e=2500){let t=Date.now();for(;Date.now()-t<e;){if(!(o.disabled===!0||o.getAttribute("aria-disabled")==="true"||o.classList.contains("disabled")||o.getAttribute("disabled")!==null))return;await new Promise(s=>setTimeout(s,80))}}function fo(){let o=window.location.href,e=document.title,t=document.querySelectorAll('input, textarea, select, button, [role="button"], [role="option"], [role="radio"], [role="checkbox"]').length,a=(document.body?.innerText||document.body?.textContent||"").length;return`${o}|${e}|${t}|${a}`}async function bo(o,e=3500){let[t,a,s,n]=o.split("|"),l=parseInt(n||"0",10),i=Date.now();for(;Date.now()-i<e;){let r=window.location.href,c=document.title,u=String(document.querySelectorAll('input, textarea, select, button, [role="button"], [role="option"], [role="radio"], [role="checkbox"]').length),p=(document.body?.innerText||document.body?.textContent||"").length;if(r!==t)return{changed:!0,evidence:`URL mudou: ${t} \u2192 ${r}`};if(c!==a)return{changed:!0,evidence:`T\xEDtulo da p\xE1gina mudou: "${a}" \u2192 "${c}"`};if(Math.abs(parseInt(u)-parseInt(s||"0"))>=2)return{changed:!0,evidence:`Controles interativos: ${s} \u2192 ${u}`};if(Math.abs(p-l)>50)return{changed:!0,evidence:`Conte\xFAdo da p\xE1gina mudou substancialmente (${Math.abs(p-l)} chars)`};await new Promise(d=>setTimeout(d,100))}return{changed:!1,evidence:"Nenhuma mudan\xE7a estrutural detectada dentro do tempo limite."}}async function Vt(o){if(o.t==="js"||o.t==="adv")return;if(o.t==="drag"){let s=L(o.from)||L(q(o.from)),n=L(o.to)||L(q(o.to));s&&n&&await Ve(s,n,2);return}let e=o.id||"",t=o.v!==void 0?String(o.v).trim():"",a=L(e,t)||L(q(e),t);if(o.t==="clk"||o.t==="chk"){if(!a&&e){let n=Array.from(document.querySelectorAll('input, label, button, [role="radio"], [role="checkbox"], .option-card, [class*="option" i], [class*="choice" i]')),l=q(e).toLowerCase();a=n.find(i=>{let r=q(i.textContent).toLowerCase();return!!(q(i.value||"").toLowerCase()===l||r===l||r.startsWith(l+")")||r.startsWith("("+l+")")||r.startsWith(l+".")||r.startsWith(l+" - ")||r.startsWith(l+":")||l.length>=3&&r.includes(l))})||null}let s=o.v!==void 0?String(o.v).trim():"";if(a&&s){if(a instanceof HTMLInputElement&&a.type==="radio"&&a.name){if(q(a.value).toLowerCase()!==q(s).toLowerCase()){let n=document.querySelector(`input[type="radio"][name="${B(a.name)}"][value="${B(s)}" i]`);if(n)a=n;else{let i=Array.from(document.querySelectorAll(`input[type="radio"][name="${B(a.name)}"]`)).find(r=>{let c=r.closest("label, .vf-label, .option-card, tr, td, div");return c&&q(c.textContent).toLowerCase().includes(q(s).toLowerCase())});i&&(a=i)}}}else if(!(a instanceof HTMLInputElement)&&!(a instanceof HTMLSelectElement)&&!(a instanceof HTMLTextAreaElement)){let n=a.querySelector(`input[value="${B(s)}" i], [data-value="${B(s)}" i]`);if(n)a=n;else{let i=Array.from(a.querySelectorAll('input[type="radio"], input[type="checkbox"]')).find(r=>{let c=r.closest("label, .vf-label, .option-card, td, div");return c&&q(c.textContent).toLowerCase().includes(q(s).toLowerCase())});i&&(a=i)}}}if(a){let n=a.closest('.option-card, label, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, li')||a,l=a instanceof HTMLInputElement&&["radio","checkbox"].includes(a.type)?a:n.querySelector('input[type="radio"], input[type="checkbox"]')||(n.getAttribute("for")?n.ownerDocument.getElementById(n.getAttribute("for")):null),i=o.t==="chk"||o.c!==void 0?!!o.c:!0;if(se(l||n,i),l&&l.checked!==i){try{let r=l._valueTracker;r&&r.setValue(!i)}catch{}try{Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"checked")?.set?.call(l,i)}catch{}l.checked=i,l.dispatchEvent(new Event("input",{bubbles:!0,composed:!0})),l.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}}return}if(o.t==="val"){let s=null;if(a&&(s=a instanceof HTMLInputElement||a instanceof HTMLTextAreaElement||a.isContentEditable?a:a.querySelector('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]')),!s){let n=document.body;try{n=j()||document.body}catch{}let l=Array.from(n.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]')),i=q(e).toLowerCase();s=l.find(r=>{let c=(r.getAttribute("placeholder")||"").toLowerCase(),u=(r.name||"").toLowerCase(),p=(r.id||"").toLowerCase(),d=(r.getAttribute("aria-label")||"").toLowerCase();return c.includes(i)||u.includes(i)||p.includes(i)||d.includes(i)})||(l.length>0?l[0]:null)}if(s){let n=String(o.v??"");try{if(s.focus?.(),s.type!=="number"){try{s.select?.()}catch{}document.execCommand?.("insertText",!1,n)}}catch{}De(s,n)}return}if(o.t==="sel"){if(!a&&e){let s=Array.from(document.querySelectorAll("select")),n=q(e).toLowerCase();a=s.find(l=>{let i=(l.name||"").toLowerCase(),r=(l.id||"").toLowerCase(),c=(l.getAttribute("aria-label")||"").toLowerCase();return i.includes(n)||r.includes(n)||c.includes(n)})||null}if(a){let s=Array.isArray(o.v)?o.v:[String(o.v)];Be(a,s)}return}}function ge(o){try{if(o.t==="val"){let e=o.v!==void 0?o.v:o.value!==void 0?o.value:o.val!==void 0?o.val:o.text,t=String(e??"").trim(),a=t,s=o.id!==void 0&&o.id!==null?String(o.id):"";s||(s=o.target??o.name??o.selector??"1");let n=L(s,a,!0)||L(q(s),a,!0);if(!n){let p=document.body;try{p=j()||document.body}catch{}let d=Array.from(p.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]')).filter(m=>S(m)&&!R(m));d.length>0&&(n=d[0])}if(!n)return!1;let l=n instanceof HTMLInputElement&&n.type==="radio"?n:n.querySelector('input[type="radio"]');if(l&&l.name){let p=document.querySelector(`input[type="radio"][name="${B(l.name)}"]:checked`);if(!p)return!1;let d=q(p.value).toLowerCase(),m=q(t).toLowerCase(),b=q(p.closest("label, .vf-label, .option-card, tr, td, div")?.textContent||"").toLowerCase();return d===m||b===m||b.includes(m)}let i=n instanceof HTMLInputElement||n instanceof HTMLTextAreaElement||n.isContentEditable?n:n.querySelector('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(!i){let d=n.closest('.form-group, .field, [class*="input" i], [class*="control" i], label, tr, td, li, p, div')?.querySelector('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]');d&&(i=d)}if(!i){let p=n.nextElementSibling;for(;p;){if(p instanceof HTMLInputElement&&!["hidden","button","submit","checkbox","radio"].includes(p.type)||p instanceof HTMLTextAreaElement||p instanceof HTMLElement&&p.isContentEditable){i=p;break}let d=p.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(d){i=d;break}p=p.nextElementSibling}}if(i instanceof HTMLSelectElement){let p=q(t).toLowerCase();return Array.from(i.options).some(d=>{if(!d.selected)return!1;let m=d.value.toLowerCase(),b=q(d.textContent).toLowerCase();return p===m||p===b||m.includes(p)||b.includes(p)})}let r=(i instanceof HTMLInputElement||i instanceof HTMLTextAreaElement?i.value:i?.textContent??n.textContent??"").trim();if(!r&&!t)return!0;if(!r&&t)return!1;let c=r.replace(",",".").replace(/\s+/g,"").toLowerCase(),u=t.replace(",",".").replace(/\s+/g,"").toLowerCase();return c===u||c.includes(u)||u.includes(c)||r.toLowerCase()===t.toLowerCase()}if(o.t==="sel"){let e=L(o.id,void 0,!0)||L(q(o.id),void 0,!0);if(!e){let n=document.body;try{n=j()||document.body}catch{}let l=Array.from(n.querySelectorAll('select, [role="combobox"], [role="listbox"]')).filter(c=>S(c)&&!R(c)),i=q(o.id).toLowerCase();e=l.find(c=>{let u=(c.id||"").toLowerCase(),p=(c.getAttribute("name")||"").toLowerCase(),d=(c.getAttribute("aria-label")||"").toLowerCase(),m=q(c.closest('.dropdown-row, [class*="dropdown" i], [class*="select" i], tr, label, div')?.textContent||"").toLowerCase();return u.includes(i)||p.includes(i)||d.includes(i)||i.length>=2&&m.includes(i)})||(l.length===1?l[0]:null)}if(!e)return!1;let t=e instanceof HTMLSelectElement?e:e.querySelector("select");if(!t){let n=e.matches?.('[role="combobox"], [role="listbox"], [class*="select" i], [class*="dropdown" i]')?e:e.closest('[role="combobox"], [role="listbox"], [class*="select" i], [class*="dropdown" i]');if(n){let i=(Array.isArray(o.v)?o.v:[String(o.v)]).map(c=>q(c).toLowerCase()),r=q(n.textContent).toLowerCase();return i.some(c=>r.includes(c)||c.includes(r))}return!1}let s=(Array.isArray(o.v)?o.v:[String(o.v)]).map(n=>q(n).toLowerCase());return Array.from(t.options).some(n=>{if(!n.selected)return!1;let l=n.value.toLowerCase(),i=q(n.textContent).toLowerCase();return s.some(r=>r===l||r===i||l.includes(r)||i.includes(r))})}if(o.t==="chk"||o.t==="clk"){let e=o.v!==void 0?String(o.v).trim():"",t=L(o.id,e)||L(q(o.id),e);if(!t)return!1;let a=t.closest('.option-card, label, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, li')||t,s=t instanceof HTMLInputElement&&["checkbox","radio"].includes(t.type)?t:a.querySelector('input[type="checkbox"], input[type="radio"]')||(a.getAttribute("for")?a.ownerDocument.getElementById(a.getAttribute("for")):null),n=o.t==="chk"||o.c!==void 0?!!o.c:!0;if(s&&s.type==="radio"){if(s.checked===n)return!0;if(o.v&&s.name){let u=q(String(o.v)).toLowerCase(),p=document.querySelector(`input[type="radio"][name="${B(s.name)}"]:checked`);if(!p)return!1;if(p===s)return!0;let d=q(p.value).toLowerCase(),m=q(p.closest("label, .vf-label, .option-card, tr, td, div")?.textContent||"").toLowerCase();return d===u||m.includes(u)||u.includes(d)}}if(s&&["checkbox","radio"].includes(s.type))return s.checked===n;let l=a.getAttribute("aria-checked")===String(n)||a.getAttribute("aria-selected")===String(n)||a.getAttribute("aria-pressed")===String(n),i=n?a.getAttribute("data-selected")==="true"||a.getAttribute("data-checked")==="true"||a.getAttribute("data-active")==="true"||a.getAttribute("data-state")==="checked"||a.getAttribute("data-state")==="on":a.getAttribute("data-selected")==="false"||a.getAttribute("data-checked")==="false"||a.getAttribute("data-state")==="unchecked",r=n?/active|selected|checked|picked|correct|is-selected|choice-selected|selected-option|is-checked|chosen|current|highlight|ring|border-primary/i.test(a.className||""):!/active|selected|checked|picked|correct|is-selected|choice-selected|selected-option|is-checked|chosen|current|highlight|ring|border-primary/i.test(a.className||"");return!!(l||i||r||(a instanceof HTMLButtonElement||a.getAttribute("role")==="button")&&o.t==="clk"||o.t==="clk"&&!s)}if(o.t==="drag"){let e=L(o.from)||L(q(o.from)),t=L(o.to)||L(q(o.to));return!e||!t?!1:t.contains(e)?!0:/placed|dropped|assigned|matched|done|selected/i.test(e.className||"")||e.getAttribute("data-placed")==="true"}}catch{}return!1}async function lt(o,e,t=1,a=Ae({engine:"smart",autoAdvance:e})){let s=o.actions.filter(g=>g.t!=="adv"),n=o.actions.filter(g=>g.t==="adv"),l=0,i=[],r=new Map,c=o.pageType==="question",u=s.filter(g=>g.t==="chk"||g.t==="clk"&&g.c!==void 0);for(let g of s){try{await ho(g,t,a),l++}catch(v){r.set(g,v instanceof Error?v.message:String(v)),console.warn("[EasyQuiz] A\xE7\xE3o declarativa prim\xE1ria falhou com seguran\xE7a:",g,v)}await new Promise(v=>setTimeout(v,g.t==="drag"?180:35))}if(c&&o.mode==="escolha_multipla"&&u.length>0){let g=document.body;try{g=j()||document.body}catch{}let v=Array.from(g.querySelectorAll('input[type="checkbox"], [role="checkbox"]')).filter(C=>S(C)&&!R(C));if(v.length>1){let A=function(w,E){if(w===E||w.contains(E)||E.contains(w))return!0;let I=w.closest('.option-card, label, [role="checkbox"], [role="option"], tr, li, [class*="option" i]'),z=E.closest('.option-card, label, [role="checkbox"], [role="option"], tr, li, [class*="option" i]');if(I&&z&&I===z)return!0;let M=w.getAttribute("for")||w.id,D=E.getAttribute("for")||E.id;return!!(M&&D&&M===D)};var f=A;let C=new Set;for(let w of u){let E=w.t==="chk"?!!w.c:!!(w.c??!0),I="id"in w&&typeof w.id=="string"?w.id:"";if(E&&I){let z=L(I,w.v);if(z){C.add(z);let M=z.querySelector('input[type="checkbox"]');M&&C.add(M);let D=z.closest('.option-card, label, [role="checkbox"], tr, li, [class*="option" i]');D&&(C.add(D),D.querySelectorAll('input[type="checkbox"]').forEach(K=>C.add(K)))}}}if(C.size>=u.length&&C.size>0){let w=Array.from(C);for(let E of v)w.some(z=>A(z,E))||(E instanceof HTMLInputElement&&E.checked||E.getAttribute("aria-checked")==="true"||E.closest(".option-card, label")?.classList.contains("selected"))&&se(E,!1)}}}await new Promise(g=>setTimeout(g,s.length>0?100:25));let p=0;for(let g of s){if(ge(g)){p++;continue}console.warn(`[EasyQuiz Auto-Cura] A\xE7\xE3o '${g.t}' no alvo '${g.id||g.from||""}' n\xE3o verificada no DOM. Disparando Passagem 2 de conting\xEAncia...`);try{et(g,a),await Vt(g)}catch(v){r.set(g,v instanceof Error?v.message:String(v)),console.warn("[EasyQuiz Auto-Cura] Rota alternativa falhou:",v)}await new Promise(v=>setTimeout(v,250)),ge(g)&&(console.log("[EasyQuiz Auto-Cura] \u2713 A\xE7\xE3o recuperada com sucesso pela rota de conting\xEAncia!"),p++,r.has(g)&&(r.delete(g),l++))}if(p<s.length&&s.length>0){console.warn(`[EasyQuiz Auto-Cura] ${s.length-p} de ${s.length} a\xE7\xE3o(\xF5es) ainda n\xE3o verificadas. Disparando Passagem 3 final...`),await new Promise(g=>setTimeout(g,200));for(let g of s)if(!ge(g))try{await Vt(g)}catch(v){r.set(g,v instanceof Error?v.message:String(v))}await new Promise(g=>setTimeout(g,200)),p=0;for(let g of s)ge(g)&&(p++,r.has(g)&&(r.delete(g),l++))}for(let g of s)ge(g)||i.push(g.t==="drag"?`${g.from} -> ${g.to}`:"id"in g?g.id:g.t);c&&s.length===0&&i.push("nenhuma a\xE7\xE3o de resposta prescrita");let d=s.map((g,v)=>{let C=g.t==="drag"?`${g.from} -> ${g.to}`:g.t==="js"?"$eq":g.id||g.t,A=g.t==="js"?!0:g.t==="drag"?!!(ie(g.from,"source")&&ie(g.to,"destination")):!!(L(g.id||"")||L(q(g.id||""))),w=ge(g);return{index:v,action:g,target:C,located:A,applied:!r.has(g),verified:w,strategy:g.t==="drag"?"drag-adaptive":g.t==="js"?"javascript":"declarative-dom",evidence:w?"estado do controle confirmado no DOM":"nenhuma evid\xEAncia suficiente ap\xF3s as tentativas",...r.has(g)?{error:r.get(g)}:{}}}),m=c?s.length>0&&i.length===0&&(p===s.length||l===s.length&&p>0):!0,b=!1,y=!1,x="Nenhuma a\xE7\xE3o de navega\xE7\xE3o solicitada.",h=l>0&&l>=s.length/2;if(e&&(m||!c||h)){await new Promise(w=>setTimeout(w,s.length>0?120:40));let g=!1;if(o.pageType!=="info"){let w=go();w&&S(w)&&(await rt(w,1200),W(w),g=!0,await new Promise(E=>setTimeout(E,350)))}let v=fo(),C=n.length>0?n[0].id:void 0,A=st(C);if(!A&&g&&(await new Promise(w=>setTimeout(w,250)),A=st(C)),A){await rt(A,1500);let w=C||A.textContent?.trim()||"";w&&Qe(window.location.hostname,{advanceSelector:w}),W(A);let E=await bo(v,1800);y=E.changed,x=E.evidence,b=E.changed||g,!E.changed&&!g&&console.warn("[EasyQuiz] O bot\xE3o de avan\xE7o foi acionado, mas a navega\xE7\xE3o ainda n\xE3o concluiu.")}else g?(b=!0,y=!0,x="Resposta confirmada via bot\xE3o de verifica\xE7\xE3o/envio."):console.warn("[EasyQuiz] Nenhum bot\xE3o de avan\xE7o encontrado na p\xE1gina.")}return{applied:l,verified:p,success:m,advanced:b,failed:i,reports:d,navigationVerified:y,navigationEvidence:x}}var fe=null,ce=[],ct=[],dt=[],be=null,vo=`
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
`;function Ut(){try{if(typeof document>"u"||!document.head)return;if(!document.getElementById("eq-image-pulse-style")){let o=document.createElement("style");o.id="eq-image-pulse-style",o.textContent=vo,document.head.appendChild(o)}}catch{}}function de(){fe&&(fe.style.removeProperty("outline"),fe.style.removeProperty("outline-offset"),fe.style.removeProperty("position"),fe=null);for(let o of ce)o.style.removeProperty("outline"),o.style.removeProperty("outline-offset"),o.style.removeProperty("background-color"),o.style.removeProperty("box-shadow"),o.removeAttribute("data-easyquiz-highlight");ce=[];for(let o of ct)o.style.removeProperty("animation"),o.style.removeProperty("outline"),o.style.removeProperty("outline-offset"),o.style.removeProperty("box-shadow"),o.removeAttribute("data-easyquiz-image-highlight");ct=[];for(let o of dt)try{o.remove()}catch{}if(dt=[],be){try{be.remove()}catch{}be=null}}function ut(o){Ut();for(let e of o){if(!e||!(e instanceof(typeof HTMLElement<"u"?HTMLElement:e.constructor)))continue;let t=e;t.style.outline="3px solid #ffd600",t.style.outlineOffset="3px",t.style.animation="eq-image-pulse-yellow-white 1.2s ease-in-out infinite",t.setAttribute("data-easyquiz-image-highlight","true"),ct.push(t);try{let a=t.parentElement;if(a&&!a.querySelector("[data-easyquiz-capture-badge]")){window.getComputedStyle(a).position==="static"&&(a.style.position="relative");let n=document.createElement("div");n.setAttribute("data-easyquiz-capture-badge","true"),n.textContent="\u{1F4F7} Capturado pela IA",n.style.cssText=`
          position: absolute; top: 4px; left: 4px; z-index: 99999;
          background: rgba(0,0,0,0.75); color: #ffd600; font-size: 10px;
          font-weight: 700; padding: 2px 7px; border-radius: 4px;
          pointer-events: none; font-family: system-ui, sans-serif;
          animation: eq-badge-fade-in 0.3s ease-out;
          box-shadow: 0 1px 4px rgba(0,0,0,0.4);
          letter-spacing: 0.3px;
        `,a.appendChild(n),dt.push(n)}}catch{}}}function pt(o){de(),Ut(),fe=o,o.style.outline="2px solid #00e5ff",o.style.outlineOffset="4px";try{window.getComputedStyle(o).position==="static"&&(o.style.position="relative");let t=document.createElement("div");t.style.cssText=`
      position: absolute; left: 0; right: 0; top: 0; height: 3px;
      background: linear-gradient(90deg, transparent, #00e5ff, #00ff88, #00e5ff, transparent);
      z-index: 99998; pointer-events: none; border-radius: 2px;
      animation: eq-scope-scan 0.8s ease-in-out forwards;
      box-shadow: 0 0 8px rgba(0, 229, 255, 0.6);
    `,o.appendChild(t),be=t,setTimeout(()=>{try{t.remove()}catch{}be===t&&(be=null)},900)}catch{}}function yo(o){return!o||o>=.9?{outline:"#00ff88",bg:"rgba(0, 255, 136, 0.12)",glow:"rgba(0, 255, 136, 0.8)"}:o>=.7?{outline:"#00bfff",bg:"rgba(0, 191, 255, 0.10)",glow:"rgba(0, 191, 255, 0.7)"}:{outline:"#ffaa00",bg:"rgba(255, 170, 0, 0.10)",glow:"rgba(255, 170, 0, 0.7)"}}function jt(o,e){let t=yo(e);for(let a of o){if(a.t==="adv"||a.t==="js")continue;if(a.t==="drag"){try{let p=L(a.from),d=L(a.to);p&&(p.style.outline=`2px solid ${t.outline}`,ce.push(p)),d&&(d.style.outline="2px dashed #00e5ff",ce.push(d))}catch{}continue}if(!a.id)continue;let s=a.v!==void 0?Array.isArray(a.v)?a.v[0]:String(a.v):"",n=L(a.id,s,a.t==="val"||a.t==="sel")||L(q(a.id),s,a.t==="val"||a.t==="sel");if(!n&&a.t==="sel"){let p=document.body;try{p=j()||document.body}catch{}let d=Array.from(p.querySelectorAll('select, [role="combobox"], [role="listbox"]')).filter(y=>S(y)&&!me(y)),m=q(a.id).toLowerCase();n=d.find(y=>{let x=(y.id||"").toLowerCase(),h=(y.getAttribute("name")||"").toLowerCase(),f=(y.getAttribute("aria-label")||"").toLowerCase(),g=q(y.closest('.dropdown-row, [class*="dropdown" i], [class*="select" i], tr, label, div')?.textContent||"").toLowerCase();return x.includes(m)||h.includes(m)||f.includes(m)||m.length>=2&&g.includes(m)})||(d.length===1?d[0]:null)}if(!n)continue;let l=typeof HTMLSelectElement<"u"&&n instanceof HTMLSelectElement||n.tagName?.toLowerCase()==="select"||n.getAttribute("role")==="combobox"||n.getAttribute("role")==="listbox",r=n.parentElement?.closest('.dropdown-row, [class*="dropdown" i], [class*="select-row" i], .form-group, tr, li')||n.closest('label, .option-card, [role="radio"], [role="checkbox"], [role="listitem"], .answer, .quiz-option, .form-check, [class*="option" i], [class*="choice" i]')||n;r.style.outline=`2px solid ${t.outline}`,r.style.outlineOffset="2px",r.style.backgroundColor=t.bg,r.setAttribute("data-easyquiz-highlight","true"),ce.push(r);let c=l?n:r.querySelector('select, [role="combobox"], [role="listbox"]');c&&(c.style.outline=`2px solid ${t.outline}`,c.style.outlineOffset="2px",c.style.boxShadow=`0 0 10px ${t.glow}`,c.setAttribute("data-easyquiz-highlight","true"),ce.push(c));let u=n instanceof HTMLInputElement&&["checkbox","radio"].includes(n.type)?n:r.querySelector('input[type="checkbox"], input[type="radio"]');u&&u!==r&&(u.style.outline=`2px solid ${t.outline}`,u.style.outlineOffset="2px",u.style.boxShadow=`0 0 10px ${t.glow}`,u.setAttribute("data-easyquiz-highlight","true"),ce.push(u))}}var mt=10,xo=1400,ht=15e5;function ve(o){return new Promise((e,t)=>{let a=new FileReader;a.onerror=()=>t(new Error("Falha ao converter blob para base64.")),a.onload=()=>{let s=String(a.result||"");e(s.split(",")[1]||"")},a.readAsDataURL(o)})}async function He(o){let e=0,t=0;if(o instanceof HTMLImageElement?(e=o.naturalWidth||o.width,t=o.naturalHeight||o.height):(e=o.width,t=o.height),e<=0||t<=0)throw new Error("Dimens\xF5es inv\xE1lidas.");let a=Math.min(1,xo/Math.max(e,t)),s=Math.max(1,Math.round(e*a)),n=Math.max(1,Math.round(t*a)),l=document.createElement("canvas");l.width=s,l.height=n;let i=l.getContext("2d",{alpha:!1});if(!i)throw new Error("Sem suporte a Canvas 2D.");return i.fillStyle="#ffffff",i.fillRect(0,0,s,n),i.drawImage(o,0,0,s,n),new Promise((r,c)=>{l.toBlob(u=>u?r(u):c(new Error("Falha na compress\xE3o.")),"image/jpeg",.88)})}async function qo(o){let e=typeof o.getBoundingClientRect=="function"?o.getBoundingClientRect():{width:0,height:0},t=e.width||parseFloat(o.getAttribute("width")||"0")||parseFloat(o.style.width||"0")||400,a=e.height||parseFloat(o.getAttribute("height")||"0")||parseFloat(o.style.height||"0")||300,s=2,n=Math.min(1800,Math.max(120,Math.round(t*s))),l=Math.min(1800,Math.max(100,Math.round(a*s))),i=o.cloneNode(!0);i.getAttribute("xmlns")||i.setAttribute("xmlns","http://www.w3.org/2000/svg"),i.setAttribute("width",String(n)),i.setAttribute("height",String(l)),!i.getAttribute("viewBox")&&t>0&&a>0&&i.setAttribute("viewBox",`0 0 ${t} ${a}`);let c=new XMLSerializer().serializeToString(i),u=new Blob([c],{type:"image/svg+xml;charset=utf-8"}),p=URL.createObjectURL(u);try{let d=new Image;d.crossOrigin="anonymous",await new Promise((y,x)=>{d.onload=()=>y(),d.onerror=()=>x(new Error("Falha ao renderizar SVG em Image.")),d.src=p});let m=document.createElement("canvas");m.width=n,m.height=l;let b=m.getContext("2d",{alpha:!1});if(!b)throw new Error("Sem suporte a Canvas 2D.");return b.fillStyle="#ffffff",b.fillRect(0,0,n,l),b.drawImage(d,0,0,n,l),new Promise((y,x)=>{m.toBlob(h=>h?y(h):x(new Error("Falha na compress\xE3o do SVG.")),"image/jpeg",.92)})}finally{URL.revokeObjectURL(p)}}async function gt(o){try{let e=o.cloneNode(!0),t=o.offsetWidth||500,a=o.offsetHeight||500,s=`
      <svg xmlns="http://www.w3.org/2000/svg" width="${t}" height="${a}">
        <foreignObject width="100%" height="100%">
          <div xmlns="http://www.w3.org/1999/xhtml" style="background:#fff;font-family:sans-serif;">
            ${e.innerHTML}
          </div>
        </foreignObject>
      </svg>
    `,n=new Blob([s],{type:"image/svg+xml;charset=utf-8"}),l=URL.createObjectURL(n),i=new Image;i.crossOrigin="anonymous",await new Promise((u,p)=>{i.onload=()=>u(),i.onerror=()=>p(new Error("Falha ao renderizar ForeignObject.")),i.src=l});let r=await He(i),c=await ve(r);if(URL.revokeObjectURL(l),c&&c.length<=ht)return{mediaType:"image/jpeg",base64:c,alt:"Captura via rasteriza\xE7\xE3o DOM",source:"rasterized"}}catch(e){console.warn("Falha na rasteriza\xE7\xE3o do n\xF3:",e)}return null}function wo(o,e){let t=o.closest('[data-easyquiz-id], button, [role="button"], [role="radio"], [role="checkbox"], [role="option"], label, .option-card, .quiz-option, .choice, .answer, [class*="option" i], [class*="choice" i], [class*="answer" i], li, tr');if(t&&t!==e&&S(t)&&!Z(t)&&!O(t)){let n=t.dataset.easyquizId||t.id||void 0,l=P(t.innerText||t.textContent||"",120),i=t.getAttribute("aria-label")||t.getAttribute("title")||"",r=l||i,c=n?` [id: ${n}]`:"";if(r)return{associatedLabel:`Alternativa/Op\xE7\xE3o: "${r}"${c}`,targetControlId:n};if(n)return{associatedLabel:`Alternativa/Op\xE7\xE3o ${c}`,targetControlId:n}}let a=o.closest("figure")?.querySelector("figcaption")?.textContent?.trim();if(a)return{associatedLabel:`Figura do Enunciado: "${P(a,100)}"`};let s=o.closest('[class*="prompt" i], [class*="stimulus" i], [class*="question-text" i], [class*="statement" i], header, h1, h2, h3, h4, p');if(s){let n=P(s.textContent||"",80);if(n)return{associatedLabel:`Gr\xE1fico do Enunciado: "${n}"`}}return{associatedLabel:"Gr\xE1fico/Imagem do Enunciado Principal"}}async function Eo(o){let e=o.currentSrc||o.src;if(!e)return null;let t=(o.alt||o.getAttribute("aria-label")||"Imagem da quest\xE3o").slice(0,500);if(o.complete&&o.naturalWidth>0)try{let a=await He(o),s=await ve(a);if(s&&s.length<=ht)return{mediaType:"image/jpeg",base64:s,alt:t,source:e.slice(0,2e3)}}catch{}try{let a=await fetch(e,{mode:"cors"});if(a.ok){let s=await a.blob();if(s.type.startsWith("image/")){let n=await createImageBitmap(s),l=await He(n);n.close();let i=await ve(l);if(i&&i.length<=ht)return{mediaType:"image/jpeg",base64:i,alt:t,source:e.slice(0,2e3)}}}}catch{return gt(o.parentElement||o)}return null}function Co(o){return o.querySelectorAll("path, line, polyline, polygon, circle, rect, text, image").length>0}function To(o){try{let e=o.style.backgroundImage||(window.getComputedStyle?window.getComputedStyle(o).backgroundImage:"");if(e&&e.includes("url(")){let t=e.match(/url\(["']?([^"')]+)["']?\)/);if(t&&t[1]&&!t[1].startsWith("data:image/svg+xml"))return t[1]}}catch{}return null}async function ft(o,e=!0){if(!e)return[];let t=[],a=0,s=35e5,n=(r,c)=>{if(!r||!r.base64||a+r.base64.length>s)return!1;let u=wo(c,o);return r.associatedLabel=u.associatedLabel,r.targetControlId=u.targetControlId,r.element=c,t.push(r),a+=r.base64.length,t.length>=mt},l=Array.from(o.querySelectorAll("img")).filter(r=>S(r)&&!O(r));for(let r of l)try{let c=await Eo(r);if(n(c,r))return t}catch{}let i=Array.from(o.querySelectorAll("svg")).filter(r=>{if(!S(r)||O(r))return!1;let c=typeof r.getBoundingClientRect=="function"?r.getBoundingClientRect():{width:0,height:0},u=c.width||parseFloat(r.getAttribute("width")||"0"),p=c.height||parseFloat(r.getAttribute("height")||"0");return u<30||p<30?!1:Co(r)});for(let r of i)try{let c=await qo(r),u=await ve(c);if(u){let p={mediaType:"image/jpeg",base64:u,alt:r.getAttribute("aria-label")||"Gr\xE1fico/Diagrama vetorial da quest\xE3o",source:"svg"};if(n(p,r))return t}}catch{let c=await gt(r.parentElement||r);if(n(c,r))return t}if(t.length<mt){let r=Array.from(o.querySelectorAll("canvas")).filter(c=>S(c)&&!O(c));for(let c of r)try{let u=await He(c),p=await ve(u);if(p){let d={mediaType:"image/jpeg",base64:p,alt:c.getAttribute("aria-label")||"Gr\xE1fico Canvas inline",source:"canvas"};if(n(d,c))return t}}catch{let u=await gt(c.parentElement||c);if(n(u,c))return t}}if(t.length<mt){let r=Array.from(o.querySelectorAll('[style*="background-image"], .option-image, .question-media')).filter(c=>S(c)&&!O(c));for(let c of r){let u=To(c);if(u)try{let p=await fetch(u,{mode:"cors"});if(p.ok){let d=await p.blob();if(d.type.startsWith("image/")){let m=await createImageBitmap(d),b=await He(m);m.close();let y=await ve(b);if(y){let x={mediaType:"image/jpeg",base64:y,alt:"Imagem de fundo da alternativa",source:u.slice(0,2e3)};if(n(x,c))return t}}}}catch{}}}return t}function Ao(o,e=""){if(typeof document>"u")return!1;let t=o||document.body,a=(e+" "+(t.textContent||"")).toLowerCase();return!!t.querySelector('.celebration-icon, [class*="celebrat" i], [class*="conclu" i], [class*="finish" i], [class*="result" i], [class*="score-screen" i], [data-testid*="completion" i], [data-functional-selector*="game-over" i], .perseus-message-renderer, [data-congratulations]')&&(a.includes("parab\xE9ns")||a.includes("conclu")||a.includes("finaliz")||a.includes("resultado")||a.includes("pontua")||a.includes("sucesso")||a.includes("\u{1F3C6}")||a.includes("game over")||a.includes("great job"))?!0:["parab\xE9ns! lista de exerc\xEDcios conclu\xEDda","exerc\xEDcios conclu\xEDda","lista de exerc\xEDcios conclu\xEDda","atividade conclu\xEDda","atividade finalizada","finalizado com sucesso","finalizada com sucesso","simulado conclu\xEDdo","simulado finalizado","question\xE1rio conclu\xEDdo","question\xE1rio finalizado","voc\xEA concluiu a atividade","voc\xEA concluiu o question\xE1rio","sua resposta foi registrada","todas as perguntas foram respondidas","quiz completed","exercise completed","activity completed","all questions answered","view results","game over","leaderboard","scoreboard","awesome","great job","you got it right","mission complete","your response has been recorded","sua resposta foi registrada"].some(l=>a.includes(l))}var _e=class{active=!1;callbacks;isProcessing=!1;observer=null;mutationTimer=null;heartbeatTimer=null;abortController=null;errorCount=0;resolvedSigs=new Set;lastContentSig="";lastAttemptSig="";lastAttemptTime=0;constructor(e){this.callbacks=e}isActive(){return this.active}start(){this.active||(this.active=!0,this.callbacks.onStatusChange("waiting","> [SYS] Autopilot ENGAGED. Monitorando..."),typeof MutationObserver<"u"&&(this.observer=new MutationObserver(()=>{!this.active||this.isProcessing||(this.mutationTimer&&clearTimeout(this.mutationTimer),this.mutationTimer=window.setTimeout(()=>{this.mutationTimer=null,this.isProcessing||this.checkAndAnalyze()},120))}),this.observer.observe(document.body,{subtree:!0,childList:!0,characterData:!0,attributes:!0})),this.scheduleHeartbeat(),this.checkAndAnalyze())}stop(){if(this.active=!1,this.abortController){try{this.abortController.abort()}catch{}this.abortController=null}this.mutationTimer&&(clearTimeout(this.mutationTimer),this.mutationTimer=null),this.heartbeatTimer&&(clearTimeout(this.heartbeatTimer),this.heartbeatTimer=null),this.observer?.disconnect(),this.observer=null,this.isProcessing=!1,this.resolvedSigs.clear(),this.callbacks.onStatusChange("idle","> [SYS] Autopilot DESATIVADO pelo usu\xE1rio.","text-yellow")}scheduleHeartbeat(){this.heartbeatTimer&&clearTimeout(this.heartbeatTimer),this.heartbeatTimer=window.setTimeout(()=>{this.heartbeatTimer=null,this.active&&!this.isProcessing&&this.checkAndAnalyze(),this.active&&this.scheduleHeartbeat()},3e3)}sleep(e){return new Promise(t=>{if(!this.active)return t();let a=null,s=()=>{a&&clearTimeout(a),t()};a=window.setTimeout(t,e),this.abortController?.signal.addEventListener("abort",s,{once:!0})})}async checkAndAnalyze(){if(!(!this.active||this.isProcessing))try{this.isProcessing=!0;let e=Me(!1);if(e||(e=he()),!this.active)return;if(!e){this.callbacks.onStatusChange("waiting","> [SYS] Monitorando p\xE1gina... Aguardando elementos.");return}if(Ao(e.scope,e.questionText)){this.callbacks.onStatusChange("idle","> [SYS] \u{1F3C6} Atividade conclu\xEDda! Autopilot finalizado.","text-green"),this.stop();return}if(this.callbacks.isManualModeActive?.()){this.callbacks.onStatusChange("waiting","> [SYS] Gabarito manual ativo. Aguardando voc\xEA avan\xE7ar...","text-yellow");return}let t=Dt(e);if(this.resolvedSigs.has(t))return;let a=Date.now();if(t===this.lastAttemptSig&&a-this.lastAttemptTime<3e3)return;t!==this.lastContentSig&&this.lastContentSig!==""&&(this.callbacks.onStatusChange("waiting","> [SYS] Nova quest\xE3o detectada! Analisando...","text-green"),this.callbacks.onPageAdvance?.(),this.errorCount=0),this.lastContentSig=t,this.lastAttemptSig=t,this.lastAttemptTime=a;let n=e.controls.filter(i=>i.role==="answer"),l=xe(window.location.hostname);if(n.length>0){if(this.callbacks.onStatusChange("analyzing","> [IA] Quest\xE3o detectada. Consultando IA...","text-blue"),!this.active)return;this.abortController=new AbortController;let i=await this.callbacks.onRequestAnalysis(1,this.abortController.signal);if(this.abortController=null,!this.active)return;if(i){if(this.callbacks.onStatusChange("analyzing",`> [IA] (${i.usedModel||"gemini"}) Confian\xE7a: ${(i.confidence*100).toFixed(1)}% | Modo: ${i.mode}`,"text-blue"),this.callbacks.onStatusChange("analyzing",`> [IA] Racioc\xEDnio: ${i.rationale}`,"text-blue"),this.callbacks.onStatusChange("analyzing",`> [IA] A\xE7\xF5es: ${i.actions.length}`,"text-blue"),this.errorCount=0,i.memoryToStore&&this.callbacks.onStatusChange("analyzing",`> [IA] \u{1F9E0} Mem\xF3ria RAG: "${i.memoryToStore}"`,"text-yellow"),i.pageType==="conclusion"){this.callbacks.onStatusChange("idle","> [SYS] Atividade conclu\xEDda! Desligando Autopilot.","text-green"),this.stop();return}this.resolvedSigs.add(t)}else{this.errorCount++;let r=this.errorCount===1?5e3:8e3;this.callbacks.onStatusChange("waiting",`> [AVISO] Falha na an\xE1lise (${this.errorCount}/5). Aguardando ${r/1e3}s...`,"text-yellow"),await this.sleep(r),this.lastAttemptTime=0}}else if(l.advanceSelector&&L(l.advanceSelector)&&e.questionText.length<50){let i=L(l.advanceSelector);if(i){if(this.callbacks.onStatusChange("advancing",`> [BRUTE] Avan\xE7ando via cache "${l.advanceSelector}"...`),await this.sleep(250),!this.active)return;W(i),this.resolvedSigs.add(t),this.errorCount=0}}else{if(this.callbacks.onStatusChange("analyzing","> [IA] P\xE1gina informativa detectada. Consultando IA...","text-blue"),!this.active)return;this.abortController=new AbortController;let i=await this.callbacks.onRequestAnalysis(1,this.abortController.signal);if(this.abortController=null,!this.active)return;if(i){if(this.callbacks.onStatusChange("analyzing",`> [IA] (${i.usedModel||"gemini"}) Tipo: ${i.pageType} | Modo: ${i.mode}`,"text-blue"),this.callbacks.onStatusChange("analyzing",`> [IA] Racioc\xEDnio: ${i.rationale}`,"text-blue"),i.memoryToStore&&this.callbacks.onStatusChange("analyzing",`> [IA] \u{1F9E0} Absorvido: "${i.memoryToStore}"`,"text-yellow"),i.pageType==="info")this.callbacks.onStatusChange("advancing","> [IA] \u{1F4D6} Leitura conclu\xEDda. Avan\xE7ando...","text-green"),await this.sleep(250);else if(i.pageType==="start")this.callbacks.onStatusChange("advancing","> [SYS] In\xEDcio detectado. Iniciando...","text-blue"),await this.sleep(250);else if(i.pageType==="conclusion"){this.callbacks.onStatusChange("idle","> [SYS] Atividade conclu\xEDda! Desligando Autopilot.","text-green"),this.stop();return}this.errorCount=0,this.resolvedSigs.add(t)}else{this.errorCount++;let r=this.errorCount===1?5e3:8e3;this.callbacks.onStatusChange("waiting",`> [AVISO] Falha ao processar p\xE1gina (${this.errorCount}/5). Aguardando ${r/1e3}s...`,"text-yellow"),await this.sleep(r)}}if(this.errorCount>=5){this.callbacks.onStatusChange("error","> [ERRO] 5 falhas consecutivas. Abortando Autopilot.","text-red"),this.callbacks.onStatusChange("waiting","> [DICA] Verifique o [ERRO DETALHADO] acima para o motivo exato.","text-yellow"),this.stop();return}}catch(e){if(!this.active)return;let t=e instanceof Error?e.message:String(e);if(t.includes("cancelada")||t.includes("aborted"))return;/timeout|aborted|network|failed to fetch|cancelad/i.test(t)||this.errorCount++,console.warn("[EasyQuiz Autopilot]",e),this.callbacks.onStatusChange("error",`> [ERRO NO AUTOPILOT] ${t}`,"text-red")}finally{this.abortController=null,this.isProcessing=!1,this.active&&window.setTimeout(()=>void this.checkAndAnalyze(),150)}}};var T={logo:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.8L19.2 8 12 11.2 4.8 8 12 4.8zM4 9.6l7 3.1v7.5l-7-3.5V9.6zm9 10.6v-7.5l7-3.1v7.1l-7 3.5z"/></svg>',rocket:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M13.13 2.81a.5.5 0 0 0-.46-.07c-.42.15-2.08.79-3.9 2.61-2.04 2.04-2.6 4.09-2.73 4.96l-.97.98a1 1 0 0 0-.29.71v2.12a1 1 0 0 0 .29.71l2.83 2.83a1 1 0 0 0 .71.29h2.12a1 1 0 0 0 .71-.29l.98-.97c.87-.13 2.92-.69 4.96-2.73 1.82-1.82 2.46-3.48 2.61-3.9a.5.5 0 0 0-.07-.46l-6.79-6.79zM4.5 16.5l-2.09 2.09a.5.5 0 0 0 .35.85h3.04l.35.35v3.04a.5.5 0 0 0 .85.35L9.09 21.1l-4.59-4.6z"/></svg>',play:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>',stop:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h12v12H6z"/></svg>',code:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>',terminal:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8h16v10zm-12-3l3-3-3-3 1.4-1.4L13.8 12l-4.4 4.4L8 15zm6 0h4v2h-4v-2z"/></svg>',inspector:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>',settings:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.49.49 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>',key:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M7 14c-2.76 0-5-2.24-5-5s2.24-5 5-5c2.42 0 4.44 1.72 4.9 4H22v4h-2v3h-3v-3h-2v3h-3v-3h-2.1c-.46 2.28-2.48 4-4.9 4zm0-7c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>',paste:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 2h-4.18C14.4 .84 13.3 0 12 0c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm7 18H5V4h2v3h10V4h2v16z"/></svg>',edit:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>',trash:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>',eraser:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M15.14 3c-.51 0-1.02.2-1.41.59L2.59 14.73c-.78.78-.78 2.05 0 2.83L6.44 21.4c.78.78 2.05.78 2.83 0l11.14-11.14c.78-.78.78-2.05 0-2.83l-3.86-3.84c-.39-.39-.9-.59-1.41-.59zm.71 2.71l3.15 3.15-3.15 3.15-3.15-3.15 3.15-3.15zm-4.57 4.57l3.15 3.15-4.57 4.57H6.71l-3-3 7.57-7.57z"/></svg>',save:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/></svg>',analyze:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L3 14h8l-2 8 12-12h-8l2-8z"/></svg>',apply:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>',close:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>',chevronRight:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>',chevronLeft:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>',eye:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>',eyeOff:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.44-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.17c0-1.66-1.34-3-3-3l-.17.02z"/></svg>',check:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>',clock:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>',copy:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>',refresh:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg>',chip:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4h12v16H6V4zm2 2v12h8V6H8zm-4 3h2v2H4V9zm0 4h2v2H4v-2zm16-4h2v2h-2V9zm0 4h2v2h-2v-2zM9 2h2v2H9V2zm4 0h2v2h-2V2zm-4 18h2v2H9v-2zm4 0h2v2h-2v-2z"/></svg>',moreVertical:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>',minimize:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M19 13H5v-2h14v2z"/></svg>',maximize:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/></svg>',dragHandle:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M10 9h4V6h-4v3zm0 5h4v-3h-4v3zm0 5h4v-3h-4v3zM4 9h4V6H4v3zm0 5h4v-3H4v3zm0 5h4v-3H4v3zm12-10V6h4v3h-4zm0 5h4v-3h-4v3zm0 5h4v-3h-4v3z"/></svg>',list:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/></svg>',folderTree:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6 10H6v-2h8v2zm4-4H6v-2h12v2z"/></svg>',folder:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/></svg>',file:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>',stopwatch:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M15 1H9v2h6V1zm-4 13h2V8h-2v6zm8.03-6.61l1.42-1.42c-.43-.51-.9-.99-1.41-1.41l-1.42 1.42A8.962 8.962 0 0 0 12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9a8.994 8.994 0 0 0 7.03-14.61zM12 20c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"/></svg>',plus:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>',listPlus:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h8v-2H7v2zm0 4h8v-2H7v2zM7 7v2h8V7H7zm11 6h-2v2h-2v2h2v2h2v-2h2v-2h-2v-2z"/></svg>',sparkles:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M9 21l-2.5-5.5L1 13l5.5-2.5L9 5l2.5 5.5L17 13l-5.5 2.5L9 21zm9.5-12.5l-1.5-3.5-3.5-1.5 3.5-1.5 1.5-3.5 1.5 3.5 3.5 1.5-3.5 1.5-1.5 3.5z"/></svg>'};var Ke=class{element=null;shadow;isMinimized=!1;currentPlan=null;isDragging=!1;dragStartX=0;dragStartY=0;initialLeft=25;initialTop=25;onAdvanceCallback;constructor(e,t){this.shadow=e,this.onAdvanceCallback=t,this.initGlobalListeners()}initGlobalListeners(){window.addEventListener("popstate",()=>this.handlePageNavigated()),window.addEventListener("hashchange",()=>this.handlePageNavigated()),document.addEventListener("click",e=>{if(!this.isOpen())return;let t=e.target;if(!t||this.shadow.contains(t)||t.closest("#easyquiz-shadow-root"))return;let a=t.closest('button, [role="button"], a, input[type="submit"]');if(a){let s=(a.textContent||a.value||"").toLowerCase();/pr[oó]xim|avan[cç]|continu|verific|enviar|submit|confirm|checar|validar|next/i.test(s)&&setTimeout(()=>{this.isOpen()&&this.handlePageNavigated()},800)}},!0)}handlePageNavigated(){this.isOpen()&&(this.hide(),this.onAdvanceCallback?.())}isOpen(){return this.element!==null&&this.element.style.display!=="none"}show(e){this.currentPlan=e,this.element||this.createElement(),this.renderContent(),this.element&&(this.element.style.display="flex")}hide(){this.element&&(this.element.style.display="none")}minimize(){this.isMinimized=!0,this.element&&this.element.classList.add("minimized")}restore(){this.isMinimized=!1,this.element&&this.element.classList.remove("minimized")}createElement(){this.element=document.createElement("div"),this.element.className="eq-floating-hud",this.element.style.left=`${this.initialLeft}px`,this.element.style.top=`${this.initialTop}px`,this.element.innerHTML=`
      <!-- P\xEDlula compacta quando minimizado -->
      <div class="eq-fah-pill" id="eq-fah-pill" title="Clique para expandir gabarito interativo">
        <span class="eq-fah-pill-icon">${T.list}</span>
        <span id="eq-fah-pill-text">Gabarito Manual</span>
        <span class="eq-fah-pill-badge" id="eq-fah-pill-badge">0</span>
      </div>

      <!-- Cabe\xE7alho com barra de arraste -->
      <div class="eq-fah-header" id="eq-fah-header">
        <div class="eq-fah-title">
          <span style="display:flex; align-items:center;">${T.dragHandle}</span>
          <span>Gabarito Manual Interativo</span>
        </div>
        <div class="eq-fah-actions">
          <button class="eq-fah-btn" id="eq-fah-copy-md-btn" title="Copiar tudo formatado em Markdown">${T.copy}</button>
          <button class="eq-fah-btn" id="eq-fah-min-btn" title="Minimizar para p\xEDlula flutuante">${T.minimize}</button>
          <button class="eq-fah-btn" id="eq-fah-close-btn" title="Fechar gabarito">${T.close}</button>
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
    `,this.shadow.appendChild(this.element),this.element.querySelector("#eq-fah-pill").addEventListener("click",()=>this.restore()),this.element.querySelector("#eq-fah-min-btn").addEventListener("click",()=>this.minimize()),this.element.querySelector("#eq-fah-close-btn").addEventListener("click",()=>this.hide());let s=this.element.querySelector("#eq-fah-copy-md-btn");s.addEventListener("click",()=>this.copyMarkdownToClipboard(s));let n=this.element.querySelector("#eq-fah-copy-all-btn");n.addEventListener("click",()=>this.copyMarkdownToClipboard(n));let l=this.element.querySelector("#eq-fah-header");this.setupDraggable(l)}setupDraggable(e){let t=a=>{if(a.target.closest(".eq-fah-btn"))return;a.preventDefault(),this.isDragging=!0,this.dragStartX=a.clientX,this.dragStartY=a.clientY;let s=this.element.getBoundingClientRect();this.initialLeft=s.left,this.initialTop=s.top;let n=i=>{if(!this.isDragging||!this.element)return;let r=i.clientX-this.dragStartX,c=i.clientY-this.dragStartY,u=Math.max(10,window.innerWidth-this.element.offsetWidth-10),p=Math.max(10,window.innerHeight-this.element.offsetHeight-10),d=Math.min(Math.max(10,this.initialLeft+r),u),m=Math.min(Math.max(10,this.initialTop+c),p);this.element.style.left=`${d}px`,this.element.style.top=`${m}px`},l=()=>{this.isDragging=!1,window.removeEventListener("mousemove",n),window.removeEventListener("mouseup",l)};window.addEventListener("mousemove",n),window.addEventListener("mouseup",l)};e.addEventListener("mousedown",t)}renderContent(){if(!this.element||!this.currentPlan)return;let e=this.element.querySelector("#eq-fah-body"),t=this.element.querySelector("#eq-fah-pill-text"),a=this.element.querySelector("#eq-fah-pill-badge");e.innerHTML="";let s=this.currentPlan,n=s.actions.filter(m=>m.t==="drag"),l=s.actions.filter(m=>{if(m.t!=="val")return!1;let b=q(m.id||"").toLowerCase();return!/continu|avan[cç]|pr[oó]xim|submet|enviar|check|verific/i.test(b)}),i=s.actions.filter(m=>m.t==="clk"||m.t==="chk"),r=s.actions.filter(m=>m.t==="sel"),c=n.length||l.length||i.length||r.length,u=document.createElement("div");u.className="eq-fah-meta";let p=document.createElement("span");p.textContent=`Modo: ${s.mode.replace("_"," ")}`;let d=document.createElement("span");if(d.className="eq-fah-meta-badge",d.textContent=`${Math.round(s.confidence*100)}% Confian\xE7a`,u.append(p,d),e.appendChild(u),n.length>0||s.mode==="categorizacao"||s.mode==="arrastar_soltar"){t.textContent=`Categoriza\xE7\xE3o (${n.length} itens)`,a.textContent=String(n.length);let m={};for(let b of n){let y=q(b.to)||"Geral";m[y]||(m[y]=[]),m[y].push(q(b.from))}for(let[b,y]of Object.entries(m)){let x=document.createElement("div"),h=/fato|true|verdadeiro|sim/i.test(b),f=/opini[aã]o|false|falso|n[aã]o/i.test(b);x.className=`eq-fah-group ${h?"group-fato":f?"group-opiniao":""}`;let g=document.createElement("div");g.className="eq-fah-group-title",g.textContent=`\u{1F4C1} ${b} (${y.length})`,x.appendChild(g);let v=document.createElement("div");v.className="eq-fah-group-items";for(let C of y){let A=document.createElement("div");A.className="eq-fah-item";let w=document.createElement("span");w.className="eq-fah-item-text",w.textContent=C,A.appendChild(w);let E=document.createElement("button");E.className="eq-fah-copy-inline",E.textContent="Copiar",E.addEventListener("click",()=>{navigator.clipboard.writeText(C),E.textContent="\u2713 Copiado",setTimeout(()=>E.textContent="Copiar",1200)}),A.appendChild(E),v.appendChild(A)}x.appendChild(v),e.appendChild(x)}}else if(l.length>0){t.textContent=`Preenchimento (${l.length} campos)`,a.textContent=String(l.length);let m=document.createElement("div");m.className="eq-fah-group";let b=document.createElement("div");b.className="eq-fah-group-title",b.textContent="\u{1F4DD} Respostas para os Campos de Texto:",m.appendChild(b);let y=document.createElement("div");y.className="eq-fah-group-items";for(let x=0;x<l.length;x++){let h=l[x],f=document.createElement("div");f.className="eq-fah-item";let g=ke(h.id);(!g||/^[#\.\$]|input|mat-|cell|field|q[0-9]|eq-/i.test(g))&&(g=`Campo ${x+1}`);let v=String(h.v??""),C=document.createElement("div");C.className="eq-fah-field-box";let A=document.createElement("div");A.className="eq-fah-field-label",A.textContent=g,C.appendChild(A);let w=document.createElement("div");w.className="eq-fah-field-val",w.textContent=v,C.appendChild(w),f.appendChild(C);let E=document.createElement("button");E.className="eq-fah-copy-inline",E.textContent="Copiar",E.addEventListener("click",()=>{navigator.clipboard.writeText(v),E.textContent="\u2713 Copiado",setTimeout(()=>E.textContent="Copiar",1200)}),f.appendChild(E),y.appendChild(f)}m.appendChild(y),e.appendChild(m)}else if(i.length>0){t.textContent=`Op\xE7\xF5es (${i.length} marcadas)`,a.textContent=String(i.length);let m=document.createElement("div");m.className="eq-fah-group";let b=document.createElement("div");b.className="eq-fah-group-title",b.textContent="\u{1F3AF} Alternativa(s) Correta(s):",m.appendChild(b);let y=document.createElement("div");y.className="eq-fah-group-items";for(let x=0;x<i.length;x++){let h=i[x],f=document.createElement("div");f.className="eq-fah-item";let g=ke(h.id);(!g||/^(eq-|#|\$|\.|input_|mat-|choice_|radio_|chk_)/i.test(g))&&h.v&&(g=String(h.v)),g=q(g),/^(eq-|#|\$|\.|input_|mat-|choice_|radio_|chk_)/i.test(g)&&(g="");let v="",C=g.match(/^(\([A-Za-z0-9]\)|[A-Za-z0-9][\)\.\:\-])\s*(.*)$/);C?(v=C[1].replace(/[\(\)\.\:\-\s]/g,"").toUpperCase(),g=C[2].trim()||g):i.length>1&&(v=String.fromCharCode(65+x));let A=document.createElement("div");if(A.style.display="flex",A.style.alignItems="center",A.style.gap="8px",A.style.flex="1",v){let I=document.createElement("span");I.className="eq-fah-letter-badge",I.textContent=v,A.appendChild(I)}let w=document.createElement("span");w.className="eq-fah-item-text",w.textContent=g||(v?`Alternativa ${v}`:"Alternativa Selecionada"),A.appendChild(w),f.appendChild(A);let E=document.createElement("button");E.className="eq-fah-copy-inline",E.textContent="Copiar",E.addEventListener("click",()=>{navigator.clipboard.writeText(g||v),E.textContent="\u2713 Copiado",setTimeout(()=>E.textContent="Copiar",1200)}),f.appendChild(E),y.appendChild(f)}m.appendChild(y),e.appendChild(m)}else if(r.length>0){t.textContent=`Sele\xE7\xE3o (${r.length} listas)`,a.textContent=String(r.length);let m=document.createElement("div");m.className="eq-fah-group";let b=document.createElement("div");b.className="eq-fah-group-title",b.textContent="\u{1F4CB} Op\xE7\xF5es para Selecionar na Lista:",m.appendChild(b);let y=document.createElement("div");y.className="eq-fah-group-items";for(let x=0;x<r.length;x++){let h=r[x],f=document.createElement("div");f.className="eq-fah-item";let g=ke(h.id);(!g||/^[#\.\$]|select|input|mat-|cell|field|q[0-9]|eq-/i.test(g))&&(g=`Lista ${x+1}`);let A=(Array.isArray(h.v)?h.v:[String(h.v??"")]).map(M=>{let D=L(h.id,void 0,!0)||L(q(h.id),void 0,!0),K=D instanceof HTMLSelectElement?D:D?.querySelector("select");if(K){let oe=q(M).toLowerCase();for(let H=0;H<K.options.length;H++){let $=K.options[H];if($.value.toLowerCase()===oe||q($.textContent).toLowerCase()===oe){let N=q($.textContent);if(N&&!N.toLowerCase().includes("selecione"))return N}}}return M}).join(", "),w=document.createElement("div");w.className="eq-fah-field-box";let E=document.createElement("div");E.className="eq-fah-field-label",E.textContent=g,w.appendChild(E);let I=document.createElement("div");I.className="eq-fah-field-val",I.textContent=A,w.appendChild(I),f.appendChild(w);let z=document.createElement("button");z.className="eq-fah-copy-inline",z.textContent="Copiar",z.addEventListener("click",()=>{navigator.clipboard.writeText(A),z.textContent="\u2713 Copiado",setTimeout(()=>z.textContent="Copiar",1200)}),f.appendChild(z),y.appendChild(f)}m.appendChild(y),e.appendChild(m)}else{t.textContent="Gabarito",a.textContent="0";let m=document.createElement("div");m.style.padding="10px",m.style.color="#888",m.textContent="Nenhuma resposta direta para exibir.",e.appendChild(m)}if(s.rationale){let m=document.createElement("div");m.className="eq-fah-rationale",m.textContent=`\u{1F4A1} Racioc\xEDnio da IA: ${s.rationale}`,e.appendChild(m)}}generateMarkdown(){if(!this.currentPlan)return"";let e=this.currentPlan,t=[];t.push("# Gabarito da Quest\xE3o \u2014 EasyQuiz Pro"),t.push(`- **Modo:** ${e.mode}`),t.push(`- **Confian\xE7a:** ${(e.confidence*100).toFixed(0)}%`),t.push("");let a=e.actions.filter(i=>i.t==="drag"),s=e.actions.filter(i=>i.t==="val"),n=e.actions.filter(i=>i.t==="clk"||i.t==="chk"),l=e.actions.filter(i=>i.t==="sel");if(a.length>0){t.push("## \u{1F4C2} Categoriza\xE7\xE3o:");let i={};for(let r of a){let c=q(r.to)||"Geral";i[c]||(i[c]=[]),i[c].push(q(r.from))}for(let[r,c]of Object.entries(i)){t.push(`### Categoria: ${r}`);for(let u of c)t.push(`- ${u}`);t.push("")}}else if(s.length>0){t.push("## \u270F\uFE0F Respostas para Preenchimento:");for(let i of s){let r=q(i.id);t.push(`- **${r||"Campo"}:** \`${i.v}\``)}t.push("")}else if(n.length>0){t.push("## \u2705 Alternativas Corretas:");for(let i=0;i<n.length;i++){let r=n[i],c=ke(r.id);(!c||/^(eq-|#|\$|\.|input_|mat-|choice_|radio_|chk_)/i.test(c))&&r.v&&(c=String(r.v)),c=q(c),/^(eq-|#|\$|\.|input_|mat-|choice_|radio_|chk_)/i.test(c)&&(c="");let u=n.length>1?`${String.fromCharCode(65+i)}) `:"";t.push(`- [x] ${u}${c||"Alternativa "+String.fromCharCode(65+i)}`)}t.push("")}else if(l.length>0){t.push("## \u{1F4CB} Op\xE7\xF5es Selecionadas em Lista:");for(let i of l){let r=q(i.id)||"Lista",c=Array.isArray(i.v)?i.v.join(", "):String(i.v??"");t.push(`- **${r}:** \`${c}\``)}t.push("")}return e.rationale&&(t.push("---"),t.push(`**\u{1F4A1} Racioc\xEDnio:** ${e.rationale}`)),t.join(`
`)}copyMarkdownToClipboard(e){let t=this.generateMarkdown();t&&navigator.clipboard.writeText(t).then(()=>{let a=e.innerHTML;e.id==="eq-fah-copy-md-btn"?e.innerHTML='<span style="font-size:10px; color:#00ffcc; font-weight:bold;">\u2713</span>':e.innerHTML="\u2713 Copiado!",setTimeout(()=>{e.innerHTML=a},1500)})}};var Ft=`
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
`;var So=[{value:"",label:"Detec\xE7\xE3o Autom\xE1tica"},{value:"escolha_unica",label:"M\xFAltipla Escolha (\xDAnica)"},{value:"escolha_multipla",label:"M\xFAltipla Escolha (V\xE1rias)"},{value:"categorizacao",label:"Categoriza\xE7\xE3o / Grupos"},{value:"arrastar_soltar",label:"Arrastar e Soltar (Drag & Drop)"},{value:"ordenacao",label:"Ordena\xE7\xE3o / Sequ\xEAncia"},{value:"verdadeiro_falso",label:"Verdadeiro / Falso"},{value:"texto_livre",label:"Texto Livre / Dissertativa"},{value:"preenchimento",label:"Preenchimento de Lacunas"}],Lo=[{value:"smart",label:"Inteligente (Auto-H\xEDbrido)"},{value:"command",label:"Apenas Comando (Seguro)"},{value:"javascript",label:"Apenas JS Nativo (Avan\xE7ado)"}],Ue=class{host;shadow;callbacks;autopilot;floatingAnswers;initialSettings;isCollapsed=!1;activeTab="resolver";isBusy=!1;stopwatchInterval=null;stopwatchStartTime=0;latestPlan=null;latestContext=null;latestPromptText="";metricsLiveTime;metricsLiveStatus;metricsTotalBadge;metricTotalTime;metricAvgTime;metricTotalCount;metricsHistoryList;metricsHistoryCount;metricsCopyBtn;metricsResetBtn;currentQuestionStartTime=0;questionLiveTimerInterval=null;liveDebugTerminal;dbgModel;dbgLatency;dbgSplitTokens;dbgTotalTokens;dbgErrorCard;dbgErrorText;dbgPromptLen;dbgPromptView;dbgContextView;dbgRawRespView;dbgCountAll;dbgCountError;dbgCountAi;dbgCountDom;logEntries=[];activeLogFilter="all";autoScrollLogs=!0;lastErrorMsg=null;_autopilotAnalyzingShown=!1;progressContainer;progressBar;progressLabel;progressVal;contextTreeContainer;launcherBtn;launcherDot;dockToggleBtn;sidebarEl;apToggleBtn;apConsole;executionConsole;dotPulseAp;statusTextAp;stopwatchAp;dotPulseAdv;statusTextAdv;stopwatchAdv;inspModel;inspLatency;inspTokens;inspPrompt;inspRationale;inspActions;copyPromptBtn;apiKeyInput;keyContextMenu;keyMoreBtn;keysListEl;keysBadgeEl;modelSelect;modeSelect;engineSelect;dryRunCheckbox;autoApplyCheckbox;autoAdvanceCheckbox;hostDarkModeCheckbox;useVisionCheckbox;analyzeBtn;applyBtn;resultContainer;constructor(e,t){this.initialSettings=e,this.callbacks=t,this.autopilot=new _e({onStatusChange:(i,r,c)=>{this.logToConsole(r,c),i==="analyzing"?this._autopilotAnalyzingShown||(this._autopilotAnalyzingShown=!0,this.setBusy(!0,"Autopilot: IA analisando...")):i==="advancing"||i==="waiting"?(this._autopilotAnalyzingShown=!1,this.setBusy(!1),this.updateAutopilotUi(!0)):i==="idle"?(this._autopilotAnalyzingShown=!1,this.setBusy(!1),this.updateAutopilotUi(!1),r.includes("conclus\xE3o")||r.includes("finalizada")||r.includes("Parab\xE9ns")?this.setStatus("Atividade conclu\xEDda com sucesso! Autopilot finalizado.","success"):this.setStatus("Autopilot desativado.","info")):i==="error"&&(this._autopilotAnalyzingShown=!1,this.setBusy(!1),this.updateAutopilotUi(!1),this.setStatus("Autopilot interrompido por erro.","error"))},onRequestAnalysis:async(i,r)=>{try{return await this.callbacks.onAnalyze(i,r,!0)||null}catch{return null}},isManualModeActive:()=>this.floatingAnswers?.isOpen()??!1,onPageAdvance:()=>{this.floatingAnswers?.hide()}}),this.host=document.createElement("div"),this.host.id="easyquiz-shadow-root",this.host.style.position="fixed",this.host.style.top="0",this.host.style.left="0",this.host.style.width="100vw",this.host.style.height="100vh",this.host.style.zIndex="2147483647",this.host.style.pointerEvents="none",this.shadow=this.host.attachShadow({mode:"open"}),this.shadow.innerHTML=`
      <style>${Ft}</style>

      <!-- Bot\xE3o Flutuante Inferior Renovado (C\xE1psula com Status ao Vivo) -->
      <button class="eq-launcher" type="button" title="Abrir / Recolher EasyQuiz (Alt+Q)">
        <span class="eq-launcher-icon">${T.logo}</span>
        <span>EasyQuiz</span>
        <span class="eq-launcher-dot" id="eq-launcher-dot"></span>
      </button>

      <!-- Sidebar Fixa Lateral Direita Estilo VS Code -->
      <aside class="eq-sidebar" aria-label="EasyQuiz Sidebar">
        <!-- Aba Retr\xE1til na Borda Esquerda -->
        <button class="eq-dock-toggle" id="eq-dock-toggle" type="button" title="Recolher / Expandir Painel (Alt+Q)">
          <span class="eq-dock-toggle-icon">${T.chevronRight}</span>
          <span class="eq-dock-toggle-label">EQ</span>
        </button>
           <!-- Activity Bar Vertical na Esquerda (Estilo VS Code - Apenas \xCDcones) -->
          <nav class="eq-activity-bar" role="tablist" aria-label="Atalhos">
            <div class="eq-activity-top">
              <button class="eq-activity-btn active" id="eq-tab-resolver" role="tab" title="Resolver (Opera\xE7\xF5es Atuais)">
                <span class="eq-activity-indicator"></span>
                <span class="eq-activity-icon">${T.rocket}</span>
              </button>

              <button class="eq-activity-btn" id="eq-tab-brain" role="tab" title="C\xE9rebro da IA (Contexto e Inspe\xE7\xE3o)">
                <span class="eq-activity-indicator"></span>
                <span class="eq-activity-icon">${T.chip}</span>
              </button>

              <button class="eq-activity-btn" id="eq-tab-metrics" role="tab" title="M\xE9tricas & Cron\xF4metro (Tempo por Quest\xE3o e Hist\xF3rico)">
                <span class="eq-activity-indicator"></span>
                <span class="eq-activity-icon">${T.stopwatch}</span>
              </button>

              <button class="eq-activity-btn" id="eq-tab-debug" role="tab" title="Terminal & Debug Output (Logs, Tokens, Prompts, Erros)">
                <span class="eq-activity-indicator"></span>
                <span class="eq-activity-icon">${T.terminal}</span>
              </button>
            </div>

            <div class="eq-activity-bottom">
              <button class="eq-activity-btn" id="eq-tab-settings" role="tab" title="Configura\xE7\xF5es e Ajustes Avan\xE7ados">
                <span class="eq-activity-indicator"></span>
                <span class="eq-activity-icon">${T.settings}</span>
              </button>
            </div>
          </nav>

          <!-- Corpo Principal da Sidebar -->
          <main class="eq-sidebar-body">
            <!-- Cabe\xE7alho VS Code -->
            <header class="eq-header">
              <div class="eq-brand">
                <span class="eq-brand-icon">${T.logo}</span>
                <span class="eq-brand-name">EasyQuiz</span>
                <span class="eq-brand-badge">SUPREME</span>
                <span id="eq-active-model-badge" style="display:none; font-size:9px; font-weight:700; padding:1px 5px; border-radius:3px; background:rgba(88,101,242,0.2); border:1px solid rgba(88,101,242,0.4); color:#7983f5; letter-spacing:0.04em; white-space:nowrap;"></span>
              </div>
              <div class="eq-header-tools">
                <button class="eq-icon-btn" id="eq-min-btn" type="button" title="Minimizar (Alt+Q)">${T.chevronRight}</button>
                <button class="eq-icon-btn" id="eq-close-btn" type="button" title="Fechar">${T.close}</button>
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
                  <button class="eq-btn-primary" id="eq-analyze-btn" type="button">${T.analyze} Analisar quest\xE3o</button>
                  <button class="eq-btn-secondary" id="eq-apply-btn" type="button">${T.apply} Aplicar respostas</button>
                </div>

                <div style="display: flex; gap: 8px; width: 100%; align-items: center;">
                  <button class="eq-btn-primary" id="eq-ap-toggle-btn" type="button" style="flex: 1;">
                    ${T.play} INICIAR AUTOPILOT
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
                  <button class="eq-btn-secondary" id="eq-open-hud-btn" type="button">${T.list} Abrir respostas dispon\xEDveis</button>
                </div>

                <!-- Status & Stopwatch Card -->
                <div class="eq-status-card">
                  <div class="eq-status-card-header">
                    <div class="eq-ai-indicator">
                      <span class="eq-dot-pulse" id="eq-dot-ap"></span>
                      <span>Status da IA</span>
                    </div>
                    <div class="eq-stopwatch" id="eq-stopwatch-ap">
                      ${T.clock} <span>0.00s</span>
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
                      ${T.refresh}
                    </button>
                    <button class="eq-icon-btn" id="eq-ap-clear-memory" type="button" title="Limpar Mem\xF3ria Contextual (RAG)" style="width: 28px; height: 28px; color: #ff5555;">
                      ${T.eraser}
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
                      ${T.copy} Copiar
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
                    ${T.copy} Copiar Relat\xF3rio
                  </button>
                  <button class="eq-btn-secondary danger" id="eq-metrics-reset-btn" type="button">
                    ${T.trash} Zerar M\xE9tricas
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
                      ${T.copy}
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
                        ${T.copy}
                      </button>
                      <button class="eq-icon-btn" id="eq-dbg-clear-logs" type="button" title="Limpar Console" style="width: 26px; height: 26px; color: #ff5555;">
                        ${T.eraser}
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
                        ${T.copy} Copiar
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
                      ${T.copy} Copiar JSON
                    </button>
                  </div>
                  <div class="eq-code-block" id="eq-dbg-context-view" style="max-height: 110px;">Aguardando captura de contexto...</div>
                </div>

                <!-- Resposta Bruta da IA -->
                <div class="eq-field-group">
                  <div class="eq-section-title">
                    <span>Resposta Bruta da IA (Raw Output)</span>
                    <button class="eq-btn-secondary" id="eq-dbg-copy-raw-resp" type="button" style="height: 24px; padding: 0 6px; font-size: 10px;">
                      ${T.copy} Copiar Resposta
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
                      <span id="eq-keys-chevron" style="display:inline-flex;transition:transform 0.2s;">${T.chevronRight}</span>
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
                      <span class="eq-input-prefix-icon">${T.key}</span>
                      <input id="eq-api-key" class="eq-input" type="password" placeholder="Adicionar nova chave AIzaSy..." autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" />
                      <button class="eq-icon-btn" id="eq-key-save" type="button" title="Adicionar Chave">${T.plus}</button>
                      <button class="eq-icon-btn" id="eq-key-more-btn" type="button" title="Mais Op\xE7\xF5es das Chaves">${T.moreVertical}</button>
                    </div>

                    <!-- Context Menu Suspenso Din\xE2mico -->
                    <div class="eq-context-menu" id="eq-key-context-menu" hidden>
                      <button class="eq-context-item" id="eq-menu-prompt" type="button">
                        <span class="eq-item-icon">${T.edit}</span>
                        <span class="eq-item-text">Inserir via Janela Nativa</span>
                        <span class="eq-item-badge">Bypass</span>
                      </button>
                      <button class="eq-context-item" id="eq-menu-paste" type="button">
                        <span class="eq-item-icon">${T.paste}</span>
                        <span class="eq-item-text">Colar da \xC1rea de Transfer\xEAncia</span>
                      </button>
                      <button class="eq-context-item" id="eq-menu-toggle-vis" type="button">
                        <span class="eq-item-icon" id="eq-menu-vis-icon">${T.eye}</span>
                        <span class="eq-item-text" id="eq-menu-vis-text">Mostrar/Ocultar Campo</span>
                      </button>
                      <button class="eq-context-item" id="eq-menu-clear" type="button">
                        <span class="eq-item-icon">${T.eraser}</span>
                        <span class="eq-item-text">Limpar Campo</span>
                      </button>
                      <div class="eq-context-divider"></div>
                      <button class="eq-context-item" id="eq-menu-bulk" type="button">
                        <span class="eq-item-icon">${T.listPlus}</span>
                        <span class="eq-item-text">Importar Chaves em Lote</span>
                        <span class="eq-item-badge">Novo</span>
                      </button>
                      <button class="eq-context-item" id="eq-menu-edit-text" type="button">
                        <span class="eq-item-icon">${T.edit}</span>
                        <span class="eq-item-text">Ver / Editar Chaves como Texto</span>
                      </button>
                      <div class="eq-context-divider"></div>
                      <button class="eq-context-item" id="eq-menu-test" type="button">
                        <span class="eq-item-icon">${T.sparkles}</span>
                        <span class="eq-item-text">Testar Todas as Chaves</span>
                      </button>
                      <button class="eq-context-item danger" id="eq-menu-delete-all" type="button">
                        <span class="eq-item-icon">${T.trash}</span>
                        <span class="eq-item-text">Apagar Todas as Chaves</span>
                      </button>
                      <button class="eq-context-item danger" id="eq-menu-reset" type="button">
                        <span class="eq-item-icon">${T.trash}</span>
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
                    ${T.trash} Resetar Todos os Dados e Mem\xF3ria
                  </button>
                </div>

                <div class="eq-footer-note" style="margin-top: auto;">Configura\xE7\xF5es salvas localmente no navegador</div>
              </div>
            </div>
          </main>
        </aside>
    `,this.launcherBtn=this.shadow.querySelector(".eq-launcher"),this.launcherDot=this.shadow.querySelector("#eq-launcher-dot"),this.dockToggleBtn=this.shadow.querySelector("#eq-dock-toggle"),this.sidebarEl=this.shadow.querySelector(".eq-sidebar"),this.apToggleBtn=this.shadow.querySelector("#eq-ap-toggle-btn"),this.apConsole=this.shadow.querySelector("#eq-ap-console"),this.executionConsole=this.shadow.querySelector("#eq-execution-console"),this.progressContainer=this.shadow.querySelector("#eq-progress-container"),this.progressBar=this.shadow.querySelector("#eq-progress-bar"),this.progressLabel=this.shadow.querySelector("#eq-progress-label"),this.progressVal=this.shadow.querySelector("#eq-progress-val"),this.contextTreeContainer=this.shadow.querySelector("#eq-tree-container"),this.dotPulseAp=this.shadow.querySelector("#eq-dot-ap"),this.statusTextAp=this.shadow.querySelector("#eq-status-text-ap"),this.stopwatchAp=this.shadow.querySelector("#eq-stopwatch-ap span"),this.dotPulseAdv=this.dotPulseAp,this.statusTextAdv=this.statusTextAp,this.stopwatchAdv=this.stopwatchAp,this.inspModel=this.shadow.querySelector("#eq-insp-model"),this.inspLatency=this.shadow.querySelector("#eq-insp-latency"),this.inspTokens=this.shadow.querySelector("#eq-insp-tokens"),this.inspPrompt=this.shadow.querySelector("#eq-insp-prompt"),this.inspRationale=this.shadow.querySelector("#eq-insp-rationale"),this.inspActions=this.shadow.querySelector("#eq-insp-actions"),this.copyPromptBtn=this.shadow.querySelector("#eq-copy-prompt-btn"),this.liveDebugTerminal=this.shadow.querySelector("#eq-live-debug-terminal"),this.dbgModel=this.shadow.querySelector("#eq-dbg-model"),this.dbgLatency=this.shadow.querySelector("#eq-dbg-latency"),this.dbgSplitTokens=this.shadow.querySelector("#eq-dbg-split-tokens"),this.dbgTotalTokens=this.shadow.querySelector("#eq-dbg-total-tokens"),this.dbgErrorCard=this.shadow.querySelector("#eq-dbg-error-card"),this.dbgErrorText=this.shadow.querySelector("#eq-dbg-error-text"),this.dbgPromptLen=this.shadow.querySelector("#eq-dbg-prompt-len"),this.dbgPromptView=this.shadow.querySelector("#eq-dbg-prompt-view"),this.dbgContextView=this.shadow.querySelector("#eq-dbg-context-view"),this.dbgRawRespView=this.shadow.querySelector("#eq-dbg-raw-resp-view"),this.dbgCountAll=this.shadow.querySelector("#eq-dbg-count-all"),this.dbgCountError=this.shadow.querySelector("#eq-dbg-count-error"),this.dbgCountAi=this.shadow.querySelector("#eq-dbg-count-ai"),this.dbgCountDom=this.shadow.querySelector("#eq-dbg-count-dom"),this.apiKeyInput=this.shadow.querySelector("#eq-api-key"),this.keyContextMenu=this.shadow.querySelector("#eq-key-context-menu"),this.keyMoreBtn=this.shadow.querySelector("#eq-key-more-btn"),this.keysListEl=this.shadow.querySelector("#eq-keys-list"),this.keysBadgeEl=this.shadow.querySelector("#eq-keys-badge"),this.modelSelect=this.shadow.querySelector("#eq-model-select"),this.modeSelect=this.shadow.querySelector("#eq-mode-select"),this.engineSelect=this.shadow.querySelector("#eq-engine-select"),this.dryRunCheckbox=this.shadow.querySelector("#eq-dry-run"),this.autoApplyCheckbox=this.shadow.querySelector("#eq-auto-apply"),this.autoAdvanceCheckbox=this.shadow.querySelector("#eq-auto-advance"),this.hostDarkModeCheckbox=this.shadow.querySelector("#eq-host-dark"),this.useVisionCheckbox=this.shadow.querySelector("#eq-use-vision"),this.analyzeBtn=this.shadow.querySelector("#eq-analyze-btn"),this.applyBtn=this.shadow.querySelector("#eq-apply-btn"),this.applyBtn.disabled=!0,this.resultContainer=this.shadow.querySelector("#eq-result"),this.floatingAnswers=new Ke(this.shadow,()=>{this.callbacks.onAnalyze(1)});let a=this.shadow.querySelector("#eq-open-hud-btn");a&&a.addEventListener("click",()=>{this.latestPlan&&this.floatingAnswers.show(this.latestPlan)}),ue.filter(i=>_(i.id)).forEach(i=>this.modelSelect.add(new Option(i.name,i.id,!1,i.id===e.model))),So.forEach(i=>this.modeSelect.add(new Option(i.label,i.value,!1,i.value===e.modeHint))),Lo.forEach(i=>this.engineSelect.add(new Option(i.label,i.value,!1,i.value===e.engine))),this.apiKeyInput.value=e.apiKey,this.dryRunCheckbox.checked=e.dryRun,this.autoApplyCheckbox.checked=e.autoApply,this.autoAdvanceCheckbox.checked=e.autoAdvance,this.hostDarkModeCheckbox.checked=e.hostDarkMode,this.useVisionCheckbox.checked=e.useVision,this.metricsLiveTime=this.shadow.querySelector("#eq-metrics-live-time"),this.metricsLiveStatus=this.shadow.querySelector("#eq-metrics-live-status"),this.metricsTotalBadge=this.shadow.querySelector("#eq-metrics-total-badge"),this.metricTotalTime=this.shadow.querySelector("#eq-metric-total-time"),this.metricAvgTime=this.shadow.querySelector("#eq-metric-avg-time"),this.metricTotalCount=this.shadow.querySelector("#eq-metric-total-count"),this.metricsHistoryList=this.shadow.querySelector("#eq-metrics-history-list"),this.metricsHistoryCount=this.shadow.querySelector("#eq-metrics-history-count"),this.metricsCopyBtn=this.shadow.querySelector("#eq-metrics-copy-btn"),this.metricsResetBtn=this.shadow.querySelector("#eq-metrics-reset-btn"),this.setupEventListeners(),this.updateTimingMetrics(),document.body.appendChild(this.host),this.applyHostDarkMode(e.hostDarkMode);let s=Array.isArray(e.apiKeys)&&e.apiKeys.length>0?e.apiKeys:e.apiKey?[e.apiKey]:[];k.init(s),this.renderKeysList();let n=window.setInterval(()=>{this.activeTab==="settings"&&this.renderKeysList()},1e3);typeof n?.unref=="function"&&n.unref();let l=k.getBestKey()||e.apiKey;l&&Pe(l).then(i=>{i&&i.length>0&&this.updateModelSelect(i,e.model)}).catch(()=>{})}switchTab(e){this.activeTab=e;let t=["resolver","brain","metrics","debug","settings"];for(let a of t){let s=this.shadow.querySelector(`#eq-tab-${a}`),n=this.shadow.querySelector(`#eq-view-${a}`);a===e?(s?.classList.add("active"),n&&(n.style.display="flex")):(s?.classList.remove("active"),n&&(n.style.display="none"))}e==="brain"?(this.renderContextTree(),this.refreshInspectorView()):e==="metrics"?this.updateTimingMetrics():e==="debug"&&(this.refreshDebugView(),this.renderTerminalEntries())}setupEventListeners(){this.shadow.querySelector("#eq-tab-resolver")?.addEventListener("click",()=>this.switchTab("resolver")),this.shadow.querySelector("#eq-tab-brain")?.addEventListener("click",()=>this.switchTab("brain")),this.shadow.querySelector("#eq-tab-metrics")?.addEventListener("click",()=>this.switchTab("metrics")),this.shadow.querySelector("#eq-tab-debug")?.addEventListener("click",()=>this.switchTab("debug")),this.shadow.querySelector("#eq-tab-settings")?.addEventListener("click",()=>this.switchTab("settings")),this.metricsResetBtn?.addEventListener("click",()=>{we(),this.stopQuestionTimer(0),this.currentQuestionStartTime=0,this.metricsLiveTime&&(this.metricsLiveTime.textContent="00:00.00"),this.metricsLiveStatus&&(this.metricsLiveStatus.textContent="Em espera",this.metricsLiveStatus.classList.remove("active")),this.updateTimingMetrics(),this.logToConsole("> [SYS] M\xE9tricas e hist\xF3rico de tempo zerados com sucesso.","text-yellow")}),this.metricsCopyBtn?.addEventListener("click",()=>{this.copyMetricsReport()}),this.shadow.querySelector("#eq-dbg-filter-all")?.addEventListener("click",()=>this.setLogFilter("all")),this.shadow.querySelector("#eq-dbg-filter-error")?.addEventListener("click",()=>this.setLogFilter("error")),this.shadow.querySelector("#eq-dbg-filter-ai")?.addEventListener("click",()=>this.setLogFilter("ai")),this.shadow.querySelector("#eq-dbg-filter-dom")?.addEventListener("click",()=>this.setLogFilter("dom"));let e=this.shadow.querySelector("#eq-dbg-scroll-toggle");e?.addEventListener("click",()=>{this.autoScrollLogs=!this.autoScrollLogs,e&&(e.style.color=this.autoScrollLogs?"#00ffcc":"#858585",e.title=this.autoScrollLogs?"Auto-Scroll Ligado (Clique para desligar)":"Auto-Scroll Desligado (Clique para ligar)"),this.autoScrollLogs&&this.liveDebugTerminal&&(this.liveDebugTerminal.scrollTop=this.liveDebugTerminal.scrollHeight)});let t=this.shadow.querySelector("#eq-dbg-copy-logs");t?.addEventListener("click",()=>{let h=this.getFormattedLogs();navigator.clipboard.writeText(h).then(()=>{let f=t.innerHTML;t.innerHTML=T.check,setTimeout(()=>t.innerHTML=f,1800)})}),this.shadow.querySelector("#eq-dbg-clear-logs")?.addEventListener("click",()=>{this.clearLogs()});let a=this.shadow.querySelector("#eq-dbg-copy-prompt");a?.addEventListener("click",()=>{let h=this.latestPromptText||this.latestPlan?.promptSent||"";navigator.clipboard.writeText(h).then(()=>{let f=a.innerHTML;a.innerHTML=`${T.check} Copiado!`,setTimeout(()=>a.innerHTML=f,1800)})});let s=this.shadow.querySelector("#eq-dbg-copy-context");s?.addEventListener("click",()=>{let h=this.dbgContextView?.textContent||"";navigator.clipboard.writeText(h).then(()=>{let f=s.innerHTML;s.innerHTML=`${T.check} Copiado!`,setTimeout(()=>s.innerHTML=f,1800)})});let n=this.shadow.querySelector("#eq-dbg-copy-raw-resp");n?.addEventListener("click",()=>{let h=this.latestPlan?.rawResponse||this.dbgRawRespView?.textContent||"";navigator.clipboard.writeText(h).then(()=>{let f=n.innerHTML;n.innerHTML=`${T.check} Copiado!`,setTimeout(()=>n.innerHTML=f,1800)})});let l=this.shadow.querySelector("#eq-dbg-copy-error-btn");l?.addEventListener("click",()=>{let h=this.lastErrorMsg||"";navigator.clipboard.writeText(h).then(()=>{let f=l.innerHTML;l.innerHTML=T.check,setTimeout(()=>l.innerHTML=f,1800)})}),this.shadow.querySelector("#eq-refresh-context-btn")?.addEventListener("click",()=>{this.renderContextTree()}),this.launcherBtn.addEventListener("click",()=>this.toggle()),this.dockToggleBtn.addEventListener("click",()=>this.toggle()),this.shadow.querySelector("#eq-min-btn")?.addEventListener("click",()=>this.toggle(!1)),this.shadow.querySelector("#eq-close-btn")?.addEventListener("click",()=>this.toggle(!1)),window.addEventListener("keydown",h=>{h.altKey&&(h.key==="q"||h.key==="Q")&&(h.preventDefault(),this.toggle())},!0);let i=h=>{let f=h.composedPath();f.includes(this.shadow)||(f.includes(this.sidebarEl)||f.includes(this.host))&&h.stopImmediatePropagation()};window.addEventListener("keydown",i,!0),window.addEventListener("keyup",i,!0),window.addEventListener("keypress",i,!0),this.apiKeyInput.addEventListener("input",()=>{let h=this.apiKeyInput.value.trim().replace(/^["']|["']$/g,"");this.callbacks.onSettingsChange({apiKey:h})});let r=this.shadow.querySelector("#eq-keys-collapsible"),c=this.shadow.querySelector("#eq-keys-chevron"),u=this.shadow.querySelector("#eq-keys-section-header"),p=h=>{r&&(h?(r.style.display="none",c&&(c.style.transform="rotate(0deg)")):(r.style.display="block",r.style.maxHeight="none",r.style.overflow="visible",c&&(c.style.transform="rotate(90deg)")))},d=!1;try{d=localStorage.getItem("easyquiz_keys_collapsed")==="true"}catch{}p(d),u?.addEventListener("click",h=>{if(h.target?.closest("a"))return;let f=r?.style.display==="none";p(!f);try{localStorage.setItem("easyquiz_keys_collapsed",f?"false":"true")}catch{}}),this.shadow.querySelector("#eq-key-save").addEventListener("click",()=>{let h=this.apiKeyInput.value.trim().replace(/^["']|["']$/g,"");if(!h){this.setStatus("Insira o valor da chave antes de adicionar.","warning");return}let f=k.addKey(h);if(f.ok){let g=k.exportRawKeys();this.callbacks.onSettingsChange({apiKey:g[0],apiKeys:g}),this.apiKeyInput.value="",this.setStatus(`\u2713 Nova chave adicionada com sucesso! (${g.length} chaves ativas no pool)`,"success"),p(!1);try{localStorage.setItem("easyquiz_keys_collapsed","false")}catch{}this.renderKeysList(),this.keyContextMenu.hidden=!0,Re(h).then(v=>{v.ok?(k.markSuccess(h,100),this.setStatus("\u2713 Nova chave validada com sucesso no Google AI Studio!","success")):(k.markInvalid(h,v.message),this.setStatus(`\u26A0\uFE0F Chave cadastrada, mas aviso retornado: ${v.message}`,"warning")),this.renderKeysList()}).catch(()=>{})}else this.setStatus(f.message,"warning")}),this.keyMoreBtn.addEventListener("click",h=>{h.stopPropagation(),this.keyContextMenu.hidden=!this.keyContextMenu.hidden}),this.shadow.addEventListener("click",h=>{let f=h.target;!f.closest("#eq-key-context-menu")&&!f.closest("#eq-key-more-btn")&&(this.keyContextMenu.hidden=!0)}),this.shadow.querySelector("#eq-menu-prompt")?.addEventListener("click",()=>{this.keyContextMenu.hidden=!0;let h=window.prompt("Adicionar Nova Chave API do Google Gemini (AI Studio):");if(h!==null&&h.trim()){let f=h.trim().replace(/^["']|["']$/g,""),g=k.addKey(f);if(g.ok){let v=k.exportRawKeys();this.callbacks.onSettingsChange({apiKey:v[0],apiKeys:v}),this.setStatus("Chave Gemini adicionada com sucesso!","success"),this.renderKeysList()}else this.setStatus(g.message,"warning")}}),this.shadow.querySelector("#eq-menu-paste")?.addEventListener("click",async()=>{this.keyContextMenu.hidden=!0;try{let h=await navigator.clipboard.readText();if(h){let f=h.trim().replace(/^["']|["']$/g,"");this.apiKeyInput.value=f,this.setStatus('Chave colada no campo. Clique no bot\xE3o "+" para adicionar ao pool.',"info")}}catch{let h=window.prompt("Adicionar Nova Chave API do Google Gemini:");if(h!==null&&h.trim()){let f=h.trim().replace(/^["']|["']$/g,"");if(k.addKey(f).ok){let v=k.exportRawKeys();this.callbacks.onSettingsChange({apiKey:v[0],apiKeys:v}),this.setStatus("Chave Gemini adicionada com sucesso!","success"),this.renderKeysList()}}}}),this.shadow.querySelector("#eq-menu-toggle-vis")?.addEventListener("click",()=>{this.keyContextMenu.hidden=!0;let h=this.apiKeyInput.type==="password";this.apiKeyInput.type=h?"text":"password";let f=this.shadow.querySelector("#eq-menu-vis-icon"),g=this.shadow.querySelector("#eq-menu-vis-text");f&&(f.innerHTML=h?T.eyeOff:T.eye),g&&(g.textContent=h?"Ocultar Campo":"Mostrar Campo")}),this.shadow.querySelector("#eq-menu-clear")?.addEventListener("click",()=>{this.keyContextMenu.hidden=!0,this.apiKeyInput.value="",this.setStatus("Campo de inser\xE7\xE3o limpo.","info"),this.apiKeyInput.focus()}),this.shadow.querySelector("#eq-menu-bulk")?.addEventListener("click",()=>{this.keyContextMenu.hidden=!0,this.shadow.querySelector("#eq-bulk-overlay")?.remove();let h=document.createElement("div");h.id="eq-bulk-overlay",h.style.cssText=["position:fixed","inset:0","z-index:2147483647","pointer-events:auto","background:rgba(0,0,0,0.78)","backdrop-filter:blur(4px)","-webkit-backdrop-filter:blur(4px)","display:flex","align-items:center","justify-content:center",'font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif',"user-select:text","-webkit-user-select:text"].join(";");let f=document.createElement("div");f.style.cssText=["background:#11151c","color:#e2e8f0","border:1px solid #283548","border-radius:12px","padding:20px","width:440px","max-width:92vw","font-size:13px","box-shadow:0 12px 40px rgba(0,0,0,0.85), 0 0 0 1px rgba(0,229,255,0.15)","display:flex","flex-direction:column","gap:10px","pointer-events:auto"].join(";"),f.innerHTML=`
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
      `,h.appendChild(f),this.shadow.appendChild(h);let g=f.querySelector("#eq-bulk-ta"),v=f.querySelector("#eq-bulk-status"),C=f.querySelector("#eq-bulk-import"),A=f.querySelector("#eq-bulk-paste-btn"),w=f.querySelector("#eq-bulk-clear-btn");requestAnimationFrame(()=>g?.focus());let E=()=>{h.remove()};["keydown","keyup","keypress","paste","copy","cut"].forEach(I=>{h.addEventListener(I,z=>{z.stopPropagation(),z.stopImmediatePropagation()},!0)}),h.addEventListener("keydown",I=>{I.key==="Escape"&&E()}),h.addEventListener("click",I=>{I.target===h&&E()}),f.querySelector("#eq-bulk-x")?.addEventListener("click",E),f.querySelector("#eq-bulk-cancel")?.addEventListener("click",E),w.addEventListener("click",()=>{g.value="",v.textContent="",g.focus()}),A.addEventListener("click",async()=>{try{let I=await navigator.clipboard?.readText();I?(g.value=I,g.focus(),v.style.color="#38bdf8",v.textContent="Conte\xFAdo colado da \xE1rea de transfer\xEAncia com sucesso!"):(v.style.color="#fbbf24",v.textContent="\xC1rea de transfer\xEAncia vazia ou sem permiss\xE3o de leitura.")}catch{v.style.color="#fbbf24",v.textContent="Permiss\xE3o de clipboard negada pelo navegador. Use Ctrl+V diretamente na caixa.",g.focus()}}),f.querySelector("#eq-bulk-import")?.addEventListener("click",async()=>{let I=g.value.trim();if(!I){v.style.color="#f87171",v.textContent="Insira pelo menos uma chave de API antes de importar.";return}let z=I.match(/AIza[0-9A-Za-z\-_]{35}/g),M=[];if(z&&z.length>0?M=Array.from(new Set(z)):M=Array.from(new Set(I.split(/[\n,;\s]+/).map(N=>N.trim().replace(/^["'`]|["'`]$/g,"")).filter(N=>N.length>=20))),M.length===0){v.style.color="#f87171",v.textContent="Nenhuma chave v\xE1lida encontrada (m\xEDnimo 20 caracteres).";return}v.style.color="#00e5ff",v.textContent=`Processando ${M.length} chave(s)...`,C.disabled=!0,C.style.opacity="0.6";let D=0,K=0;for(let N of M){let Q=k.addKey(N);Q.ok?D++:Q.message.includes("j\xE1 est\xE1 cadastrada")&&K++}if(D>0){let N=k.exportRawKeys();this.callbacks.onSettingsChange({apiKey:N[0],apiKeys:N}),p(!1);try{localStorage.setItem("easyquiz_keys_collapsed","false")}catch{}}v.textContent=`${D} adicionada(s), ${K} duplicada(s). Validando modelo em paralelo...`;let oe=k.exportRawKeys(),H=this.modelSelect?.value||"gemini-3.5-flash-lite",$=await Xe(H,oe);$.ok?(k.markSuccess($.key,200),v.style.color="#4ade80",v.textContent=`\u2713 ${D} adicionada(s), ${K} duplicada(s). Modelo '${$.model}' pronto!`):(v.style.color="#fbbf24",v.textContent=`${D} adicionada(s), ${K} duplicada(s). Aviso: ${$.message}`),this.renderKeysList(),C.disabled=!1,C.style.opacity="1",D>0&&(this.setStatus(`\u2713 Lote importado: ${D} chave(s) adicionada(s) ao pool!`,"success"),setTimeout(E,2200))})}),this.shadow.querySelector("#eq-menu-edit-text")?.addEventListener("click",()=>{this.keyContextMenu.hidden=!0,this.shadow.querySelector("#eq-text-editor-overlay")?.remove();let h=k.exportRawKeys(),f=document.createElement("div");f.id="eq-text-editor-overlay",f.style.cssText=["position:fixed","inset:0","z-index:2147483647","pointer-events:auto","background:rgba(0,0,0,0.82)","backdrop-filter:blur(4px)","-webkit-backdrop-filter:blur(4px)","display:flex","align-items:center","justify-content:center",'font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif'].join(";");let g=document.createElement("div");g.style.cssText=["background:#11151c","color:#e2e8f0","border:1px solid #283548","border-radius:12px","padding:20px","width:460px","max-width:94vw","font-size:13px","box-shadow:0 12px 40px rgba(0,0,0,0.85),0 0 0 1px rgba(0,229,255,0.15)","display:flex","flex-direction:column","gap:10px","pointer-events:auto"].join(";"),g.innerHTML=`
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
      `,f.appendChild(g),this.shadow.appendChild(f);let v=g.querySelector("#eq-edittext-ta"),C=g.querySelector("#eq-edittext-status");v.value=h.join(`
`),requestAnimationFrame(()=>{v.focus(),v.select()});let A=()=>f.remove();["keydown","keyup","keypress","paste","copy","cut"].forEach(w=>{f.addEventListener(w,E=>{E.stopPropagation(),E.stopImmediatePropagation()},!0)}),f.addEventListener("keydown",w=>{w.key==="Escape"&&A()}),f.addEventListener("click",w=>{w.target===f&&A()}),g.querySelector("#eq-edittext-x")?.addEventListener("click",A),g.querySelector("#eq-edittext-cancel")?.addEventListener("click",A),g.querySelector("#eq-edittext-clear")?.addEventListener("click",()=>{confirm("Apagar todas as chaves? Esta a\xE7\xE3o \xE9 irrevers\xEDvel.")&&(v.value="",C.style.color="#fbbf24",C.textContent="Campo limpo. Clique em Salvar para confirmar a remo\xE7\xE3o de todas as chaves.")}),g.querySelector("#eq-edittext-save")?.addEventListener("click",()=>{let w=v.value.split(/[\n\r]+/).map(z=>z.trim().replace(/^["']|["']$/g,"")).filter(z=>z.length>5),E=Array.from(new Set(w));k.init(E);let I=k.exportRawKeys();this.callbacks.onSettingsChange({apiKey:I[0]||"",apiKeys:I}),this.renderKeysList(),C.style.color="#4ade80",E.length===0?C.textContent="\u2713 Todas as chaves removidas.":C.textContent=`\u2713 ${E.length} chave(s) salva(s) com sucesso!`,this.setStatus(E.length>0?`\u2713 ${E.length} chave(s) salva(s)!`:"Todas as chaves foram removidas.",E.length>0?"success":"info"),setTimeout(A,1400)})}),this.shadow.querySelector("#eq-menu-delete-all")?.addEventListener("click",()=>{this.keyContextMenu.hidden=!0;let h=k.getAllKeys();if(h.length===0)return this.setStatus("Nenhuma chave para apagar.","info");confirm(`Apagar todas as ${h.length} chave(s) permanentemente?`)&&(k.init([]),this.callbacks.onSettingsChange({apiKey:"",apiKeys:[]}),this.renderKeysList(),this.setStatus("Todas as chaves foram removidas.","info"))}),this.shadow.querySelector("#eq-menu-test")?.addEventListener("click",async()=>{this.keyContextMenu.hidden=!0;let h=k.getAllKeys();if(h.length===0)return this.setStatus("Nenhuma chave cadastrada para testar.","error");this.setStatus(`\u26A1 Testando ${h.length} chave(s) em paralelo...`,"info");let f=this.modelSelect?.value||"gemini-3.5-flash-lite",g=h.map(C=>C.key),v=await Xe(f,g);if(v.ok)k.markSuccess(v.key,150),this.setStatus(`\u2713 Validado! Modelo '${v.model}' respondeu com sucesso!`,"success");else{let C=await Promise.allSettled(g.map(w=>Re(w))),A=0;C.forEach((w,E)=>{if(w.status==="fulfilled"&&w.value.ok)A++,k.markSuccess(g[E],200);else{let I=w.status==="fulfilled"?w.value.message:String(w.reason);k.markInvalid(g[E],I)}}),this.setStatus(`Teste: ${A}/${h.length} chave(s) v\xE1lidas. ${v.message}`,A>0?"info":"error")}this.renderKeysList()});let b=()=>{this.keyContextMenu.hidden=!0,window.confirm("Deseja realmente resetar todos os dados, chaves e mem\xF3ria de sess\xE3o do EasyQuiz?")&&(this.autopilot.isActive()&&this.autopilot.stop(),this.updateAutopilotUi(!1),this.setBusy(!1),qt(),we(),this.stopQuestionTimer(0),this.currentQuestionStartTime=0,this.metricsLiveTime&&(this.metricsLiveTime.textContent="00:00.00"),this.metricsLiveStatus&&(this.metricsLiveStatus.textContent="Em espera",this.metricsLiveStatus.className="eq-live-stopwatch-status"),this.updateTimingMetrics(),this.apiKeyInput.value="",this.callbacks.onSettingsChange({apiKey:""}),this.setStatus("Todos os dados do EasyQuiz foram limpos.","info"),this.logToConsole("> [SYS] Armazenamento local resetado.","text-yellow"))};this.shadow.querySelector("#eq-menu-reset")?.addEventListener("click",b),this.shadow.querySelector("#eq-reset-all-btn")?.addEventListener("click",b),this.apToggleBtn.addEventListener("click",()=>{if(this.autopilot.isActive())this.autopilot.stop(),this.callbacks.onCancel?.(),this.setProgress(0),this.updateAutopilotUi(!1),this.setInterrupted("Autopilot interrompido imediatamente pelo usu\xE1rio.");else{if(!this.apiKeyInput.value.trim().replace(/^["']|["']$/g,"")){this.setStatus("Configure sua chave de API Gemini na aba Configura\xE7\xF5es antes de ligar o Autopilot.","error"),this.switchTab("settings"),this.apiKeyInput.focus();return}this.callbacks.onSettingsChange({autoApply:!0,autoAdvance:!0}),this.autoApplyCheckbox.checked=!0,this.autoAdvanceCheckbox.checked=!0,zt(),this.autopilot.start(),this.updateAutopilotUi(!0),this.startStopwatch(),this.setStatus("Autopilot ativo. Monitorando exerc\xEDcios...","info")}}),this.shadow.querySelector("#eq-ap-clear-memory").addEventListener("click",()=>{Je(),this.logToConsole("> [SYS] Mem\xF3ria contextual limpa com sucesso.","text-green"),this.setStatus("Mem\xF3ria contextual da sess\xE3o limpa.","success")});let x=this.shadow.querySelector("#eq-copy-console-btn");x?.addEventListener("click",()=>{let h=this.apConsole?.innerText||"";navigator.clipboard.writeText(h).then(()=>{let f=x.innerHTML;x.innerHTML=T.check,setTimeout(()=>x.innerHTML=f,1800)})}),this.copyPromptBtn.addEventListener("click",()=>{let h=this.inspPrompt.textContent||"";navigator.clipboard.writeText(h).then(()=>{let f=this.copyPromptBtn.innerHTML;this.copyPromptBtn.innerHTML=`${T.check} Copiado!`,setTimeout(()=>this.copyPromptBtn.innerHTML=f,2e3)})}),this.modelSelect.addEventListener("change",()=>this.callbacks.onSettingsChange({model:this.modelSelect.value})),this.modeSelect.addEventListener("change",()=>this.callbacks.onSettingsChange({modeHint:this.modeSelect.value})),this.engineSelect.addEventListener("change",()=>this.callbacks.onSettingsChange({engine:this.engineSelect.value})),this.dryRunCheckbox.addEventListener("change",()=>this.callbacks.onSettingsChange({dryRun:this.dryRunCheckbox.checked})),this.autoApplyCheckbox.addEventListener("change",()=>this.callbacks.onSettingsChange({autoApply:this.autoApplyCheckbox.checked})),this.autoAdvanceCheckbox.addEventListener("change",()=>this.callbacks.onSettingsChange({autoAdvance:this.autoAdvanceCheckbox.checked})),this.useVisionCheckbox.addEventListener("change",()=>{let h=this.useVisionCheckbox.checked;this.callbacks.onSettingsChange({useVision:h}),this.setStatus(h?"Vis\xE3o Computacional ativada (capturas habilitadas).":"Modo DOM R\xE1pido ativado (capturas desabilitadas).","info")}),this.hostDarkModeCheckbox.addEventListener("change",()=>{let h=this.hostDarkModeCheckbox.checked;this.callbacks.onSettingsChange({hostDarkMode:h}),this.applyHostDarkMode(h)}),this.analyzeBtn.addEventListener("click",async()=>{if(this.isBusy){this.callbacks.onCancel?.(),this.setInterrupted("An\xE1lise cancelada pelo usu\xE1rio. Pronto para nova tentativa.");return}await this.callbacks.onAnalyze()&&!this.dryRunCheckbox.checked&&!this.autoApplyCheckbox.checked&&this.callbacks.onApply()}),this.applyBtn.addEventListener("click",()=>this.callbacks.onApply())}startStopwatch(){this.stopStopwatch(),this.stopwatchStartTime=Date.now();let e=()=>{let t=((Date.now()-this.stopwatchStartTime)/1e3).toFixed(2)+"s";this.stopwatchAp.textContent=t,this.stopwatchAdv.textContent=t};e(),this.stopwatchInterval=setInterval(e,100)}stopStopwatch(e){if(this.stopwatchInterval&&(clearInterval(this.stopwatchInterval),this.stopwatchInterval=null),e!==void 0){let t=(e/1e3).toFixed(2)+"s";this.stopwatchAp.textContent=t,this.stopwatchAdv.textContent=t}}setLogFilter(e){this.activeLogFilter=e;let t=["all","error","ai","dom"];for(let a of t){let s=this.shadow.querySelector(`#eq-dbg-filter-${a}`);a===e?s?.classList.add("active"):s?.classList.remove("active")}this.renderTerminalEntries()}updateLogCounters(){let e=0,t=0,a=0;for(let s of this.logEntries)s.category==="error"?e++:s.category==="ai"?t++:s.category==="dom"&&a++;this.dbgCountAll&&(this.dbgCountAll.textContent=String(this.logEntries.length)),this.dbgCountError&&(this.dbgCountError.textContent=String(e)),this.dbgCountAi&&(this.dbgCountAi.textContent=String(t)),this.dbgCountDom&&(this.dbgCountDom.textContent=String(a))}renderTerminalEntries(){if(!this.liveDebugTerminal)return;this.liveDebugTerminal.replaceChildren();let e=this.activeLogFilter==="all"?this.logEntries:this.logEntries.filter(t=>t.category===this.activeLogFilter);if(e.length===0){let t=document.createElement("div");t.className="text-muted",t.textContent=`Nenhum log encontrado para o filtro "${this.activeLogFilter.toUpperCase()}".`,this.liveDebugTerminal.appendChild(t);return}for(let t of e){let a=document.createElement("div");a.textContent=t.message,t.colorClass&&(a.className=t.colorClass),this.liveDebugTerminal.appendChild(a)}this.autoScrollLogs&&(this.liveDebugTerminal.scrollTop=this.liveDebugTerminal.scrollHeight)}clearLogs(){if(this.logEntries=[],this.updateLogCounters(),this.liveDebugTerminal){this.liveDebugTerminal.replaceChildren();let e=document.createElement("div");e.className="text-blue",e.textContent="> [SYS] Console de logs limpo pelo usu\xE1rio.",this.liveDebugTerminal.appendChild(e)}this.apConsole&&this.apConsole.replaceChildren(),this.executionConsole&&this.executionConsole.replaceChildren()}getFormattedLogs(){return(this.activeLogFilter==="all"?this.logEntries:this.logEntries.filter(t=>t.category===this.activeLogFilter)).map(t=>t.message).join(`
`)}setLastError(e){this.lastErrorMsg=e,this.dbgErrorCard&&this.dbgErrorText&&(this.dbgErrorText.textContent=e,this.dbgErrorCard.style.display="flex")}setErrorDiagnostic(e,t){let a=t?`[${t}] ${e}`:e;this.setLastError(a)}refreshDebugView(){let e=this.latestPlan,t=this.latestContext,a=this.latestPromptText||e?.promptSent||"";if(this.dbgModel&&(this.dbgModel.textContent=e?.usedModel||this.initialSettings.model||"--"),this.dbgLatency&&(this.dbgLatency.textContent=e?.durationMs?`${e.durationMs}ms`:"--"),this.dbgSplitTokens){let s=e?.promptTokens!==void 0?String(e.promptTokens):"--",n=e?.candidatesTokens!==void 0?String(e.candidatesTokens):"--";this.dbgSplitTokens.textContent=`${s} / ${n}`,this.dbgSplitTokens.title=`Prompt: ${s} tokens | Resposta: ${n} tokens`}if(this.dbgTotalTokens){let s=e?.tokensUsed??(e?.promptTokens&&e?.candidatesTokens?e.promptTokens+e.candidatesTokens:void 0);this.dbgTotalTokens.textContent=s!==void 0?`${s}`:"--"}if(this.dbgPromptLen){let s=a.length,n=Math.round(s/4);this.dbgPromptLen.textContent=`${s} chars (~${n} tokens est.)`}if(this.dbgPromptView&&(this.dbgPromptView.textContent=a||"Nenhum prompt enviado at\xE9 o momento."),this.dbgContextView)if(t){let s={scope:`${t.scope.tagName.toLowerCase()}${t.scope.id?"#"+t.scope.id:""}${t.scope.className?"."+t.scope.className.split(" ").join("."):""}`,questionLength:t.questionText.length,questionSnippet:t.questionText.slice(0,150)+(t.questionText.length>150?"...":""),controlsCount:t.controls.length,controls:t.controls.map((n,l)=>({index:l+1,tag:n.tag,type:n.type,name:n.name||void 0,id:n.id||void 0,value:n.value||void 0,label:n.label||void 0,role:n.role}))};this.dbgContextView.textContent=JSON.stringify(s,null,2)}else this.dbgContextView.textContent="Aguardando captura de contexto pelo EasyQuiz...";this.dbgRawRespView&&(e?e.rawResponse?this.dbgRawRespView.textContent=e.rawResponse:this.dbgRawRespView.textContent=JSON.stringify({pageType:e.pageType,mode:e.mode,confidence:e.confidence,rationale:e.rationale,actions:e.actions},null,2):this.dbgRawRespView.textContent="Aguardando retorno da API Gemini..."),this.lastErrorMsg&&this.dbgErrorCard&&this.dbgErrorText&&(this.dbgErrorText.textContent=this.lastErrorMsg,this.dbgErrorCard.style.display="flex")}logToConsole(e,t){let a=new Date,s=`${String(a.getHours()).padStart(2,"0")}:${String(a.getMinutes()).padStart(2,"0")}:${String(a.getSeconds()).padStart(2,"0")}.${String(Math.floor(a.getMilliseconds()/100))}`,n=e;e.startsWith(">")?n=`> [${s}] ${e.slice(1).trim()}`:n=`[${s}] ${e}`;let l="all";t==="text-red"||n.includes("[ERRO]")||n.includes("Falha")||n.includes("Error")?l="error":n.includes("[IA]")||n.includes("[RAG]")||n.includes("Tokens")||n.includes("Gemini")||n.includes("Modelo:")?l="ai":(n.includes("[DOM]")||n.includes("[EXEC]")||n.includes("[VERIF]")||n.includes("[NAV]"))&&(l="dom");let i={id:Date.now()+Math.random(),timestamp:s,message:n,colorClass:t,category:l};for(this.logEntries.push(i);this.logEntries.length>250;)this.logEntries.shift();if(this.updateLogCounters(),l==="error"&&this.setLastError(n),this.liveDebugTerminal&&(this.activeLogFilter==="all"||this.activeLogFilter===l)){let r=document.createElement("div");for(r.textContent=n,t&&(r.className=t),this.liveDebugTerminal.appendChild(r);this.liveDebugTerminal.children.length>250;)this.liveDebugTerminal.removeChild(this.liveDebugTerminal.firstChild);this.autoScrollLogs&&(this.liveDebugTerminal.scrollTop=this.liveDebugTerminal.scrollHeight)}if(this.apConsole){let r=document.createElement("div");for(r.textContent=n,t&&(r.className=t),this.apConsole.appendChild(r),this.apConsole.scrollTop=this.apConsole.scrollHeight;this.apConsole.children.length>150;)this.apConsole.removeChild(this.apConsole.firstChild)}if(this.executionConsole){let r=document.createElement("div");for(r.textContent=n,t&&(r.className=t),this.executionConsole.appendChild(r),this.executionConsole.scrollTop=this.executionConsole.scrollHeight;this.executionConsole.children.length>150;)this.executionConsole.removeChild(this.executionConsole.firstChild)}}setProgress(e,t){if(!this.progressContainer||!this.progressBar)return;if(e<=0){this.progressContainer.style.display="none",this.progressBar.style.width="0%";return}this.progressContainer.style.display="flex";let a=Math.min(100,Math.max(0,Math.round(e)));this.progressBar.style.width=`${a}%`,this.progressVal&&(this.progressVal.textContent=`${a}%`),t&&this.progressLabel&&(this.progressLabel.textContent=t),a>=100&&setTimeout(()=>{this.progressContainer&&this.progressBar&&this.progressBar.style.width==="100%"&&(this.progressContainer.style.display="none")},1500)}updateContext(e,t){this.latestContext=e,t&&(this.latestPlan=t),this.activeTab==="brain"?(this.renderContextTree(),t&&this.refreshInspectorView()):this.activeTab==="debug"&&this.refreshDebugView()}renderContextTree(){if(!this.contextTreeContainer)return;let e=this.latestContext,t=Ie(),a=this.latestPlan;this.contextTreeContainer.innerHTML="";let s=this.createTreeFolder("\u{1F4C4} P\xC1GINA & ESCOPO ATUAL",!0,[{label:"T\xEDtulo",value:document.title||"Sem t\xEDtulo"},{label:"URL",value:window.location.pathname||"/"},{label:"Escopo DOM",value:e?`${e.scope.tagName.toLowerCase()}${e.scope.className?"."+e.scope.className.split(" ").join("."):""}`:"Document"},{label:"Tamanho Texto",value:e?`${e.questionText.length} caracteres`:"N\xE3o analisado"},{label:"Trecho Enunciado",value:e?`"${e.questionText.slice(0,120)}..."`:"Nenhum"}]);this.contextTreeContainer.appendChild(s);let n=e?e.controls:[],l=n.map((u,p)=>{let d=u.role==="navigation"||u.type==="button",m=!d&&u.value?` [val: "${u.value}"]`:"";return{label:`[#${p+1}] ${u.type.toUpperCase()}`,value:`${u.label||u.id||u.name||"(Sem r\xF3tulo)"}${m}`.trim(),badge:d?"Navega\xE7\xE3o":u.role||u.type}}),i=this.createTreeFolder(`\u{1F39B}\uFE0F CONTROLES DETECTADOS (${n.length})`,n.length>0,l);this.contextTreeContainer.appendChild(i);let r=t.map((u,p)=>({label:`Mem\xF3ria #${p+1}`,value:u,badge:"RAG"})),c=this.createTreeFolder(`\u{1F9E0} MEM\xD3RIA RAG ACUMULADA (${t.length})`,t.length>0,r);if(this.contextTreeContainer.appendChild(c),a){let u=this.createTreeFolder(`\u{1F916} \xDALTIMO PLANO IA (${a.actions.length} a\xE7\xF5es)`,!0,[{label:"Tipo P\xE1gina",value:a.pageType,badge:`${(a.confidence*100).toFixed(0)}%`},{label:"Modo",value:a.mode},{label:"Racioc\xEDnio",value:a.rationale||"N/A"},...a.actions.map((p,d)=>({label:`A\xE7\xE3o #${d+1} (${p.t})`,value:JSON.stringify(p)}))]);this.contextTreeContainer.appendChild(u)}}createTreeFolder(e,t,a){let s=document.createElement("div");s.className="eq-tree-node";let n=document.createElement("div");n.className="eq-tree-header",n.innerHTML=`<span class="eq-tree-arrow">${t?"\u25BC":"\u25B6"}</span> <span>${e}</span>`;let l=document.createElement("div");if(l.className="eq-tree-content",l.style.display=t?"flex":"none",a.length===0)l.innerHTML='<div class="text-muted" style="padding: 2px 0;">Nenhum item registrado.</div>';else for(let i of a){let r=document.createElement("div");r.className="eq-tree-leaf",r.innerHTML=`
          <strong style="color:#ffffff; min-width: 80px;">${i.label}:</strong>
          <span style="flex:1; word-break: break-word; color:#aaaaaa;">${i.value}</span>
          ${i.badge?`<span class="eq-tree-badge">${i.badge}</span>`:""}
        `,l.appendChild(r)}return n.addEventListener("click",()=>{let i=l.style.display==="none";l.style.display=i?"flex":"none";let r=n.querySelector(".eq-tree-arrow");r&&(r.textContent=i?"\u25BC":"\u25B6")}),s.appendChild(n),s.appendChild(l),s}toggle(e){e!==void 0?this.isCollapsed=!e:this.isCollapsed=!this.isCollapsed,this.isCollapsed?this.sidebarEl.classList.add("eq-collapsed"):(this.sidebarEl.classList.remove("eq-collapsed"),this.apiKeyInput.value||(this.switchTab("settings"),this.apiKeyInput.focus()))}updateAutopilotUi(e){e?(this.apToggleBtn.innerHTML=`${T.stop} PARAR AUTOPILOT`,this.apToggleBtn.classList.add("danger"),this.apToggleBtn.title="Interromper execu\xE7\xE3o cont\xEDnua do Autopilot"):(this.apToggleBtn.innerHTML=`${T.play} INICIAR AUTOPILOT`,this.apToggleBtn.classList.remove("danger"),this.apToggleBtn.title="Iniciar resolu\xE7\xE3o autom\xE1tica cont\xEDnua de quest\xF5es")}setOperationState(e,t){let a=this.shadow.querySelector("#eq-operation-state");a&&(a.textContent=e,a.className=`eq-operation-state is-${t}`)}setInterrupted(e="An\xE1lise interrompida pelo usu\xE1rio."){this.isBusy=!1,[this.modelSelect,this.modeSelect,this.engineSelect,this.dryRunCheckbox,this.autoApplyCheckbox,this.autoAdvanceCheckbox,this.useVisionCheckbox].forEach(t=>t.disabled=!1),this.analyzeBtn.disabled=!1,this.analyzeBtn.classList.remove("danger"),this.analyzeBtn.innerHTML=`${T.sparkles} Resolver com IA (Alt+R)`,this.analyzeBtn.title="Analisar e responder quest\xE3o ativa",this.applyBtn.disabled=!this.latestPlan||!this.latestPlan.actions.length,this.stopStopwatch(),this.stopQuestionTimer(),this.dotPulseAp.className="eq-dot-pulse stopped",this.dotPulseAdv.className="eq-dot-pulse stopped",this.launcherDot.className="eq-launcher-dot stopped",this.metricsLiveStatus&&(this.metricsLiveStatus.textContent="Interrompido",this.metricsLiveStatus.className="eq-live-stopwatch-status is-warning"),this.autopilot.isActive()||this.updateAutopilotUi(!1),this.setStatus(e,"warning")}setBusy(e,t){this.isBusy=e,[this.modelSelect,this.modeSelect,this.engineSelect,this.dryRunCheckbox,this.autoApplyCheckbox,this.autoAdvanceCheckbox,this.useVisionCheckbox].forEach(a=>a.disabled=e),e?(this.analyzeBtn.disabled=!1,this.analyzeBtn.classList.add("danger"),this.analyzeBtn.innerHTML=`${T.stop} Parar An\xE1lise`,this.analyzeBtn.title="Interromper e cancelar an\xE1lise em andamento",this.applyBtn.disabled=!0,this.startStopwatch(),this.startQuestionTimer(),this.dotPulseAp.className="eq-dot-pulse busy",this.dotPulseAdv.className="eq-dot-pulse busy",this.launcherDot.className="eq-launcher-dot busy",this.setOperationState("Analisando...","busy"),this.metricsLiveStatus&&(this.metricsLiveStatus.textContent="Calculando...",this.metricsLiveStatus.className="eq-live-stopwatch-status is-busy"),t&&this.setStatus(t,"info")):(this.analyzeBtn.disabled=!1,this.analyzeBtn.classList.remove("danger"),this.analyzeBtn.innerHTML=`${T.sparkles} Resolver com IA (Alt+R)`,this.analyzeBtn.title="Analisar e responder quest\xE3o ativa",this.applyBtn.disabled=!this.latestPlan||!this.latestPlan.actions.length,this.stopStopwatch(),this.stopQuestionTimer(),this.dotPulseAp.className="eq-dot-pulse",this.dotPulseAdv.className="eq-dot-pulse",this.launcherDot.className="eq-launcher-dot",this.setOperationState(this.autopilot.isActive()?"Monitorando":"Pronto","idle"),this.metricsLiveStatus&&this.metricsLiveStatus.textContent==="Calculando..."&&(this.metricsLiveStatus.textContent="Em espera",this.metricsLiveStatus.className="eq-live-stopwatch-status"))}setStatus(e,t="info"){this.statusTextAp.textContent=e,this.statusTextAdv.textContent=e,t==="error"?(this.setOperationState("Bloqueado","error"),this.dotPulseAp.className="eq-dot-pulse error",this.dotPulseAdv.className="eq-dot-pulse error",this.launcherDot.className="eq-launcher-dot error"):t==="warning"?(this.setOperationState("Interrompido","warning"),this.dotPulseAp.className="eq-dot-pulse stopped",this.dotPulseAdv.className="eq-dot-pulse stopped",this.launcherDot.className="eq-launcher-dot stopped"):t==="success"?(this.setOperationState("Confirmado","success"),this.dotPulseAp.className="eq-dot-pulse",this.dotPulseAdv.className="eq-dot-pulse",this.launcherDot.className="eq-launcher-dot"):this.isBusy?(this.setOperationState("Analisando...","busy"),this.dotPulseAp.className="eq-dot-pulse busy",this.dotPulseAdv.className="eq-dot-pulse busy",this.launcherDot.className="eq-launcher-dot busy"):(this.setOperationState(this.autopilot.isActive()?"Monitorando":"Pronto","info"),this.dotPulseAp.className="eq-dot-pulse",this.dotPulseAdv.className="eq-dot-pulse",this.launcherDot.className="eq-launcher-dot");let a=e.includes("Alternando")||e.includes("indispon\xEDvel")||e.includes("fallback")||e.includes("alternativo"),s=t==="error"?"> [ERRO] ":t==="success"?"> [SUCESSO] ":t==="warning"?"> [PARADO] ":a?"> [FALLBACK] ":"> [SYS] ",n=t==="error"?"text-red":t==="success"?"text-green":t==="warning"||a?"text-yellow":"text-blue";this.logToConsole(`${s}${e}`,n)}setPlan(e,t){if(this.latestPlan=e,this.resultContainer.style.display="flex",e.durationMs&&this.stopStopwatch(e.durationMs),e.usedModel){let r=this.shadow.querySelector("#eq-active-model-badge");if(r){let c=e.usedModel.replace("gemini-","").replace("-latest","");r.textContent=`\u25CF ${c}`,r.style.display="inline-block"}}let a=this.shadow.querySelector("#eq-badges");a.replaceChildren();let s=[e.mode.replace("_"," "),`${Math.round(e.confidence*100)}% Confian\xE7a`,`${e.actions.length} a\xE7\xF5es`,...e.usedModel?[e.usedModel]:[]];for(let r of s){let c=document.createElement("span");c.className="eq-brand-badge",c.textContent=r,a.appendChild(c)}let n=this.shadow.querySelector("#eq-rationale-text");n.textContent=e.rationale;let l=this.shadow.querySelector("#eq-actions-list");l.innerHTML="";for(let r of e.actions){let c=document.createElement("div");c.className="eq-action-item";let u="";r.t==="chk"?u=`chk ${r.id} (${r.c})`:r.t==="val"?u=`val "${r.v}" -> ${r.id}`:r.t==="sel"?u=`sel "${Array.isArray(r.v)?r.v.join(","):r.v}" -> ${r.id}`:r.t==="clk"?u=`clk ${r.id}`:r.t==="adv"?u="adv":r.t==="js"?u=`js: ${String(r.v).slice(0,40)}...`:r.t==="drag"&&(u=`drag "${r.from}" -> "${r.to}"`);let p=document.createElement("span");p.className="eq-action-badge",p.textContent=r.t.toUpperCase();let d=document.createElement("span");d.textContent=u,c.append(p,d),l.appendChild(c)}this.applyBtn.disabled=!t||!e.actions.length;let i=this.shadow.querySelector("#eq-execution-card");i&&(i.hidden=!0),this.refreshInspectorView(),this.refreshDebugView()}setExecutionReport(e){let t=this.shadow.querySelector("#eq-execution-card"),a=this.shadow.querySelector("#eq-execution-summary"),s=this.shadow.querySelector("#eq-execution-list");if(!t||!a||!s)return;t.hidden=!1,a.textContent=e.navigationVerified?`${e.verified}/${e.applied} a\xE7\xF5es verificadas. Navega\xE7\xE3o confirmada.`:`${e.verified}/${e.applied} a\xE7\xF5es verificadas. ${e.navigationEvidence}`,a.className=`eq-execution-summary ${e.success?"is-success":"is-warning"}`,s.replaceChildren();let n=this.shadow.querySelector("#eq-execution-placeholder");n&&(n.textContent=e.navigationVerified?"Fluxo conclu\xEDdo: aplica\xE7\xE3o e navega\xE7\xE3o confirmadas.":`Fluxo interrompido: ${e.navigationEvidence}`,n.className=`eq-execution-placeholder ${e.success?"is-success":"is-warning"}`);for(let l of e.reports){let i=document.createElement("div");i.className=`eq-execution-row ${l.verified?"is-success":"is-failed"}`;let r=document.createElement("span");r.className="eq-execution-state",r.textContent=l.verified?"OK":"FALHOU";let c=document.createElement("div");c.className="eq-execution-details";let u=document.createElement("strong");u.textContent=l.target;let p=document.createElement("span");if(p.textContent=`${l.strategy} | ${l.evidence}`,c.append(u,p),i.append(r,c),l.error){let d=document.createElement("small");d.textContent=l.error,i.appendChild(d)}s.appendChild(i)}}setInspectorPrompt(e,t){this.latestPromptText=e,this.inspPrompt&&(this.inspPrompt.textContent=e),t&&this.inspModel&&(this.inspModel.textContent=t),this.inspLatency&&(this.inspLatency.textContent="Aguardando IA..."),this.activeTab==="debug"&&this.refreshDebugView()}refreshInspectorView(){let e=this.latestPlan;if(e)if(this.inspModel.textContent=e.usedModel||this.initialSettings.model,this.inspLatency.textContent=e.durationMs?`${e.durationMs}ms`:"--",this.inspTokens.textContent=e.tokensUsed?`${e.tokensUsed}`:"--",this.inspPrompt.textContent=e.promptSent||this.latestPromptText||"Prompt n\xE3o registrado para esta requisi\xE7\xE3o.",this.inspRationale.textContent=e.rationale,this.inspActions.innerHTML="",e.actions.length>0)for(let t of e.actions){let a=document.createElement("div");a.className="eq-action-item",a.textContent=JSON.stringify(t),this.inspActions.appendChild(a)}else this.inspActions.innerHTML='<div class="text-muted" style="padding: 4px;">Nenhuma a\xE7\xE3o prescrita pela IA.</div>';else this.latestPromptText&&(this.inspPrompt.textContent=this.latestPromptText)}showFloatingAnswers(e){let t=e||this.latestPlan;t&&this.floatingAnswers.show(t)}hideFloatingAnswers(){this.floatingAnswers.hide()}renderKeysList(){if(!this.keysListEl)return;let e=k.getAllKeys();if(this.keysBadgeEl){let s=e.filter(i=>!i.isCooldown).length,n=e.reduce((i,r)=>i+(r.winCount||0),0),l=s>=3?" \u26A1 TURBO":"";this.keysBadgeEl.textContent=`${e.length} chave${e.length>1?"s":""} (${s} pronta${s!==1?"s":""})${l}`,this.keysBadgeEl.className=`eq-key-badge ${s>=3?"racing":s>0?"ready":"cooldown"}`}this.keysListEl.replaceChildren();let t=this.shadow?.querySelector("#eq-keys-collapsible");t&&t.style.display!=="none"&&(t.style.maxHeight="none",t.style.overflow="visible"),[...e].sort((s,n)=>{let l=s.winCount||0,i=n.winCount||0;if(l!==i)return i-l;let r=s.lastLatencyMs||99999,c=n.lastLatencyMs||99999;if(r!==c)return r-c;let u=s.isCooldown?1:0,p=n.isCooldown?1:0;return u-p}).forEach((s,n)=>{let l=e.findIndex(f=>f.id===s.id),i=l>=0?l:n,r=document.createElement("div");r.className="eq-key-item";let c=document.createElement("div");c.className="eq-key-info";let u=document.createElement("span");u.className="eq-key-label",u.textContent=s.label||`Chave ${i+1}`;let p=document.createElement("span");p.className="eq-key-masked",p.textContent=te.maskKey(s.key),p.title="Clique para copiar a chave",p.style.cursor="pointer",p.addEventListener("click",()=>{navigator.clipboard?.writeText(s.key),this.setStatus(`Chave ${i+1} copiada para a \xE1rea de transfer\xEAncia!`,"info")});let d=document.createElement("span");if(s.isCooldown){d.className="eq-key-badge cooldown";let f=Math.ceil(s.remainingCooldownMs/1e3);d.textContent=`\u23F1 Cooldown (${f}s)`}else s.lastError&&s.errorCount&&s.errorCount>3?(d.className="eq-key-badge invalid",d.textContent="Erro",d.title=s.lastError):s.lastLatencyMs?(d.className="eq-key-badge ready",d.textContent=`Pronta (${s.lastLatencyMs}ms)`):(d.className="eq-key-badge ready",d.textContent="Pronta");c.appendChild(u),c.appendChild(p),c.appendChild(d);let m=s.winCount||0;if(m>0){let f=document.createElement("span");f.className="eq-key-badge winner",f.textContent=`\u{1F3C6} ${m} vit\xF3ria${m>1?"s":""}`,f.title=`Esta chave foi a mais r\xE1pida ${m} vez${m>1?"es":""} nas corridas paralelas`,c.appendChild(f)}let b=document.createElement("div");b.className="eq-key-actions";let y=document.createElement("button");y.className="eq-icon-btn",y.type="button",y.title="Testar esta chave",y.innerHTML=T.sparkles,y.addEventListener("click",async()=>{this.setStatus(`Testando chave ${s.label||i+1}...`,"info");let f=await Re(s.key);f.ok?(k.markSuccess(s.key,120),this.setStatus(`\u2713 ${s.label||`Chave ${i+1}`}: Conex\xE3o com Google Gemini aprovada!`,"success")):(k.markInvalid(s.key,f.message),this.setStatus(`\u26A0\uFE0F ${s.label||`Chave ${i+1}`}: ${f.message}`,"error")),this.renderKeysList()});let x=document.createElement("button");x.className="eq-icon-btn",x.type="button",x.title="Editar chave",x.innerHTML=T.edit,x.addEventListener("click",()=>{let f=window.prompt(`Editar ${s.label||`Chave ${i+1}`}:`,s.key);if(f!==null&&f.trim()){let g=k.updateKey(s.id,f.trim());if(g.ok){let v=k.exportRawKeys();this.callbacks.onSettingsChange({apiKey:v[0],apiKeys:v}),this.setStatus(`Chave ${i+1} atualizada com sucesso!`,"success"),this.renderKeysList()}else this.setStatus(g.message,"warning")}});let h=document.createElement("button");h.className="eq-icon-btn",h.type="button",h.title="Remover chave",h.innerHTML=T.trash,h.addEventListener("click",()=>{if(confirm(`Remover permanentemente a ${s.label||`Chave ${i+1}`}?`)){let f=k.removeKey(s.id);if(f.ok){let g=k.exportRawKeys();this.callbacks.onSettingsChange({apiKey:g[0]||"",apiKeys:g}),this.setStatus("Chave removida com sucesso.","info"),this.renderKeysList()}else this.setStatus(f.message,"warning")}}),b.appendChild(y),b.appendChild(x),b.appendChild(h),r.appendChild(c),r.appendChild(b),this.keysListEl.appendChild(r)})}updateModelSelect(e,t){let a=e.filter(l=>_(l.id)),s=t&&_(t)?t:_(this.initialSettings.model)?this.initialSettings.model:"gemini-2.5-flash";this.modelSelect.innerHTML="";let n=!1;a.forEach(l=>{let i=l.id===s;i&&(n=!0),this.modelSelect.add(new Option(l.name,l.id,!1,i))}),!n&&s&&_(s)&&this.modelSelect.add(new Option(`Gemini (${s})`,s,!1,!0)),this.modelSelect.value=s}updateSelectedModel(e){if(!_(e))return;Array.from(this.modelSelect.options).some(a=>a.value===e)||this.modelSelect.add(new Option(`Gemini (${e})`,e,!1,!0)),this.modelSelect.value=e}applyHostDarkMode(e){document.getElementById("eq-host-dark-mode-style")?.remove(),this.host.classList.toggle("eq-dark-mode-active",e)}startQuestionTimer(){this.currentQuestionStartTime=Date.now(),this.questionLiveTimerInterval&&clearInterval(this.questionLiveTimerInterval),this.metricsLiveStatus&&(this.metricsLiveStatus.textContent="Calculando...",this.metricsLiveStatus.classList.add("active"));let e=()=>{if(!this.metricsLiveTime)return;let t=Date.now()-this.currentQuestionStartTime,a=Math.floor(t/6e4),s=Math.floor(t%6e4/1e3),n=Math.floor(t%1e3/10);this.metricsLiveTime.textContent=`${String(a).padStart(2,"0")}:${String(s).padStart(2,"0")}.${String(n).padStart(2,"0")}`};e(),this.questionLiveTimerInterval=setInterval(e,50)}stopQuestionTimer(e){if(this.questionLiveTimerInterval&&(clearInterval(this.questionLiveTimerInterval),this.questionLiveTimerInterval=null),this.metricsLiveStatus&&(this.metricsLiveStatus.textContent="Parado",this.metricsLiveStatus.classList.remove("active")),this.metricsLiveTime&&this.currentQuestionStartTime>0){let t=e!==void 0?e:Math.max(0,Date.now()-this.currentQuestionStartTime),a=Math.floor(t/6e4),s=Math.floor(t%6e4/1e3),n=Math.floor(t%1e3/10);this.metricsLiveTime.textContent=`${String(a).padStart(2,"0")}:${String(s).padStart(2,"0")}.${String(n).padStart(2,"0")}`}}updateTimingMetrics(e){let t=e||qe();if(!this.metricTotalTime)return;let a=Math.floor(t.totalElapsedMs/1e3),s=Math.floor(a/60),n=a%60;this.metricTotalTime.textContent=`${String(s).padStart(2,"0")}:${String(n).padStart(2,"0")}`;let l=(t.averageDurationMs/1e3).toFixed(1);this.metricAvgTime.textContent=`${l}s`,this.metricTotalCount.textContent=String(t.completedQuestionsCount),this.metricsTotalBadge&&(this.metricsTotalBadge.textContent=`${t.completedQuestionsCount} Quest\xE3o(\xF5es)`),this.metricsHistoryCount&&(this.metricsHistoryCount.textContent=`${t.records.length} registros`),this.renderMetricsHistory(t.records)}renderMetricsHistory(e){if(!this.metricsHistoryList)return;if(e.length===0){this.metricsHistoryList.innerHTML='<div class="eq-metrics-empty">Nenhuma quest\xE3o respondida nesta sess\xE3o ainda.</div>';return}this.metricsHistoryList.innerHTML="";let t=[...e].reverse();for(let a of t){let s=document.createElement("div");s.className="eq-metrics-item";let n=document.createElement("div");n.className="eq-metrics-item-left";let l=document.createElement("span");l.className="eq-metrics-badge",l.textContent=`Q${a.questionIndex}`;let i=document.createElement("div");i.className="eq-metrics-item-info";let r=document.createElement("div");r.className="eq-metrics-item-title",r.textContent=a.questionTitle||`Quest\xE3o ${a.questionIndex}`;let c=document.createElement("div");c.className="eq-metrics-item-meta";let u=new Date(a.timestamp).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit",second:"2-digit"}),p=a.mode?a.mode.replace("_"," "):"auto";c.textContent=`${u} \u2022 Modo: ${p}${a.actionsCount?` \u2022 ${a.actionsCount} a\xE7\xE3o(\xF5es)`:""}`,i.appendChild(r),i.appendChild(c),n.appendChild(l),n.appendChild(i);let d=document.createElement("div");d.className="eq-metrics-item-right";let m=document.createElement("span");m.className="eq-metrics-item-dur",m.textContent=`${(a.durationMs/1e3).toFixed(2)}s`;let b=document.createElement("span");b.className=`eq-metrics-item-status is-${a.status}`,b.textContent=a.status==="verified"||a.status==="answered"?"\u2713 Injetado":a.status==="manual"?"Gabarito":"Pendente",d.appendChild(m),d.appendChild(b),s.appendChild(n),s.appendChild(d),this.metricsHistoryList.appendChild(s)}}copyMetricsReport(){let e=qe(),t=[];t.push("# Relat\xF3rio de Desempenho e Tempo \u2014 EasyQuiz"),t.push(`- **Quest\xF5es Respondidas:** ${e.completedQuestionsCount}`),t.push(`- **Tempo Total:** ${(e.totalElapsedMs/1e3).toFixed(1)}s`),t.push(`- **Tempo M\xE9dio por Quest\xE3o:** ${(e.averageDurationMs/1e3).toFixed(2)}s`),t.push(""),t.push("### Hist\xF3rico:"),e.records.length===0?t.push("_Nenhum registro ainda._"):e.records.forEach((a,s)=>{t.push(`${s+1}. **${a.questionTitle||`Q${a.questionIndex}`}**: ${(a.durationMs/1e3).toFixed(2)}s (${a.status})`)}),navigator.clipboard.writeText(t.join(`
`)).then(()=>{if(this.metricsCopyBtn){let a=this.metricsCopyBtn.innerHTML;this.metricsCopyBtn.innerHTML="\u2713 Copiado!",setTimeout(()=>{this.metricsCopyBtn.innerHTML=a},1500)}})}destroy(){this.stopStopwatch(),this.stopQuestionTimer(),this.autopilot.stop(),this.applyHostDarkMode(!1),this.callbacks.onDestroy(),this.host.remove()}};function Mo(){try{if(typeof document>"u"||!document.head||document.querySelector("link[data-easyquiz-preconnect]"))return;let o=document.createElement("link");o.rel="preconnect",o.href="https://generativelanguage.googleapis.com",o.crossOrigin="anonymous",o.setAttribute("data-easyquiz-preconnect","true"),document.head.appendChild(o);let e=document.createElement("link");e.rel="dns-prefetch",e.href="https://generativelanguage.googleapis.com",e.setAttribute("data-easyquiz-preconnect","true"),document.head.appendChild(e)}catch{}}async function ko(){let o=window;if(we(),Mo(),o.__easyquiz){o.__easyquiz.toggle();return}let e=Ge(),t=null,a=null,s=0,n=new Ue(e,{onAnalyze:(r=1,c,u=!1)=>l(r,c,u),onApply:(r=1)=>void i(r),onDestroy:()=>{if(a){try{a.abort()}catch{}a=null}de(),delete o.__easyquiz},onCancel:()=>{if(a){try{a.abort()}catch{}a=null}de(),n.setProgress(0),n.setInterrupted("Opera\xE7\xE3o cancelada imediatamente pelo usu\xE1rio.")},onSettingsChange:r=>{e=wt(r)}});o.__easyquiz={toggle:()=>n.toggle(),destroy:()=>n.destroy(),analyze:async()=>{await l()}},window.addEventListener("keydown",r=>{if(r.altKey&&(r.key==="q"||r.key==="Q")){if(r.preventDefault(),!n)return;n.toggle(!0),l()}});async function l(r=1,c,u=!1){if(!e.apiKey){n.setStatus("Configure sua chave de API Gemini acima para come\xE7ar.","error"),n.toggle(!0);return}if(a)try{a.abort()}catch{}a=new AbortController;let p=a,d=()=>{try{p.abort()}catch{}};if(c&&(c.aborted?p.abort():c.addEventListener("abort",d,{once:!0})),p.signal.aborted){n.setBusy(!1),n.setProgress(0);return}s=Date.now(),n.setBusy(!0,"Identificando o bloco da quest\xE3o ativa na p\xE1gina..."),n.setProgress(20,"Varrendo escopo do DOM e controles..."),de(),n.hideFloatingAnswers();try{let m=Me(!1);m||(n.setStatus("Nenhum controle detectado. Tentando captura de tela inteira...","info"),m=he()),pt(m.scope),n.updateContext(m),n.logToConsole(`> [DOM] Escopo: <${m.scope.tagName.toLowerCase()}> com ${m.controls.length} controle(s) e ${m.questionText.length} caracteres.`,"text-blue"),n.setStatus(`Quest\xE3o localizada (${m.controls.length} controles). Preparando an\xE1lise...`,"info"),n.setProgress(40,`Consultando Gemini (${e.model})...`);let b=await ft(m.scope,e.useVision);if(b.length>0){let v=b.map(C=>C.element).filter(Boolean);ut(v)}if(p.signal.aborted)return;let y=Te||e.model;n.setStatus(b.length>0?`Consultando Gemini (${y}) com ${b.length} imagem(ns) anexada(s)...`:`Consultando Gemini (${y}) via DOM nativo (modo r\xE1pido)...`,"info");let x=Ee(m,b,e);n.setInspectorPrompt(x,e.model);let h=(v,C)=>{n.setStatus(v,C==="warning"?"info":C);let A=v.match(/Onda\s+\d+.*?\[([^\]]+)\]/);if(A){let w=A[1].split(",")[0].trim();n.setProgress(50,`Gemini ${w} respondendo...`)}},{plan:f,usedModel:g}=await Ze(m,b,e,h,p.signal);if(p.signal.aborted)return;if(f.needsMoreContext){if(n.setProgress(55,"Ampliando escopo da quest\xE3o..."),n.setStatus("Enunciado ou contexto isolado detectado pela IA. Acionando Sele\xE7\xE3o Geral Expandida...","info"),n.logToConsole("> [DOM] Enunciado isolado. Ampliando escopo para sele\xE7\xE3o expandida...","text-blue"),m=Me(!0),m||(m=he()),pt(m.scope),n.updateContext(m),b=await ft(m.scope,e.useVision),b.length>0){let A=b.map(w=>w.element).filter(Boolean);ut(A)}n.setStatus(`Reconsultando IA com escopo ampliado (${m.controls.length} controles)...`,"info");let v=Ee(m,b,e);n.setInspectorPrompt(v,e.model),f=(await Ze(m,b,e,h,p.signal)).plan}return p.signal.aborted||(n.setProgress(70,"Resposta recebida da IA! Processando plano..."),n.logToConsole(`> [IA] Modelo: ${g||e.model} | Modo: ${f.mode} | Confian\xE7a: ${(f.confidence*100).toFixed(0)}%`,"text-green"),f.rationale&&n.logToConsole(`> [IA] Racioc\xEDnio: "${f.rationale}"`,"text-blue"),n.logToConsole(`> [IA] ${f.actions.length} a\xE7\xE3o(\xF5es) prescritas no plano.`,"text-blue"),f.memoryToStore&&(Et(f.memoryToStore),n.logToConsole(`> [RAG] \u{1F9E0} Nova mem\xF3ria te\xF3rica salva na sess\xE3o: "${f.memoryToStore}"`,"text-yellow")),t=f,n.updateContext(m,f),jt(f.actions,f.confidence),n.setPlan(f,!e.dryRun),f.pageType==="conclusion"?(n.setProgress(100,"Atividade conclu\xEDda!"),n.setStatus("Atividade conclu\xEDda ou tela final detectada pela IA.","success")):f.pageType==="info"?(n.setProgress(100,"Contexto absorvido na mem\xF3ria!"),n.setStatus("\u{1F4D8} Conte\xFAdo de contexto absorvido na mem\xF3ria RAG. Avan\xE7ando...","success")):f.pageType==="start"?(n.setProgress(100,"In\xEDcio detectado!"),n.setStatus("In\xEDcio de atividade detectado. Iniciando...","info")):(n.setProgress(80,"Plano de resolu\xE7\xE3o pronto!"),n.setStatus(e.dryRun?"Simula\xE7\xE3o conclu\xEDda. As respostas foram real\xE7adas na p\xE1gina sem altera\xE7\xE3o.":"Resolu\xE7\xE3o pronta! Verifique o realce na tela e aplique quando desejar.","success")),e.dryRun&&f.pageType==="question"&&n.showFloatingAnswers(f),p.signal.aborted)?void 0:((u||e.autoApply)&&!e.dryRun&&await i(r,p.signal,u),f)}catch(m){if(p.signal.aborted||m instanceof Error&&(m.name==="AbortError"||m.message.includes("cancelada"))){de(),n.setProgress(0),n.setInterrupted("Opera\xE7\xE3o cancelada pelo usu\xE1rio.");return}de(),n.setProgress(0);let b=m instanceof Error?m.message:"Falha desconhecida na an\xE1lise.";n.setStatus(b,"error"),n.setErrorDiagnostic(b,"An\xE1lise da IA");return}finally{c?.removeEventListener("abort",d),a===p&&(a=null),p.signal.aborted||n.setBusy(!1)}}async function i(r=1,c,u=!1){if(c?.aborted)return;if(!t){n.setStatus("Nenhum plano dispon\xEDvel para aplicar. Execute a an\xE1lise primeiro.","error");return}if(e.dryRun){n.setStatus("O modo de simula\xE7\xE3o est\xE1 ativo. Desmarque para poder aplicar.","error");return}let p=t.pageType==="info"||t.pageType==="start",d=(u||e.autoAdvance||p)&&t.confidence>=e.confidenceThreshold&&!t.needsMoreContext;n.setBusy(!0,"Aplicando respostas no formul\xE1rio..."),n.setProgress(85,`Aplicando ${t.actions.length} a\xE7\xE3o(\xF5es) no formul\xE1rio...`),n.logToConsole(`> [EXEC] Iniciando aplica\xE7\xE3o com 6 vias de persist\xEAncia para ${t.actions.length} a\xE7\xE3o(\xF5es)...`,"text-blue");try{let m=await lt(t,d,r,Ae(e));if(c?.aborted)return;n.setExecutionReport(m);let b=s>0?Date.now()-s:1200,y=t.actions.filter(g=>g.t!=="adv"&&g.t!=="js").length,x=t.pageType==="question"||y>0,h=m.applied>0;if((x?m.success||h:m.success||m.advanced)||h){n.setProgress(100,"Sucesso! Resposta preenchida."),n.logToConsole(`> [DOM] \u2713 ${m.applied} a\xE7\xE3o(\xF5es) aplicada(s) com sucesso na p\xE1gina!`,"text-green"),m.advanced?n.logToConsole("> [NAV] \u2713 Bot\xE3o de confirma\xE7\xE3o/avan\xE7o acionado com sucesso!","text-green"):d&&n.logToConsole(`> [NAV] ${m.navigationEvidence}`,"text-blue"),n.setStatus(m.advanced?`Sucesso: ${m.applied} resposta(s) preenchida(s) e avan\xE7ando.`:`Resposta aplicada na p\xE1gina (${m.applied} a\xE7\xE3o(\xF5es)).`,"success"),n.hideFloatingAnswers();let g=Tt({id:`q-${Date.now()}`,questionIndex:(qe().records.length||0)+1,questionTitle:t.rationale?t.rationale.slice(0,45)+"...":`Quest\xE3o ${t.mode||"Auto"}`,durationMs:b,status:"answered",mode:t.mode,actionsCount:m.applied});n.updateTimingMetrics(g)}else n.setProgress(0,"Alvo de resposta n\xE3o localizado."),n.logToConsole(`> [DOM] Alerta: nenhum controle de resposta foi modificado no DOM. Pend\xEAncias: ${m.failed.join(", ")||"nenhuma a\xE7\xE3o"}.`,"text-yellow"),n.setStatus("Controle de resposta n\xE3o encontrado na p\xE1gina. Use o bot\xE3o Gabarito no painel se desejar.","warning"),e.dryRun&&n.showFloatingAnswers(t)}catch(m){n.setProgress(0);let b=m instanceof Error?m.message:"Falha ao aplicar plano.";n.setStatus(`Erro ao aplicar: ${b}`,"error"),n.logToConsole(`> [ERRO] ${b}`,"text-red")}finally{n.setBusy(!1)}}n.toggle(!0)}ko().catch(o=>{console.error("[EasyQuiz] Erro fatal na inicializa\xE7\xE3o:",o),window.alert(`EasyQuiz: falha ao iniciar: ${o instanceof Error?o.message:String(o)}`)});})();
