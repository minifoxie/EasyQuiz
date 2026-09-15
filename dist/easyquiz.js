/* EasyQuiz v1.0.0 — Resolução inteligente de quizzes sem servidor
 * GitHub: https://github.com/minifoxie/EasyQuiz
 * 100% Client-side. Direct Google Gemini REST API.
 */
"use strict";(()=>{var re={apiKey:"",apiKeys:[],model:"gemini-3.5-flash-lite",uiMode:"easy",modeHint:"",engine:"smart",dryRun:!1,autoApply:!0,autoAdvance:!1,hostDarkMode:!0,useVision:!0,confidenceThreshold:.8,toastStacking:!0};function Y(o){if(!o||typeof o!="string")return!1;let e=o.toLowerCase().trim().replace(/^models\//,"");if(!e.includes("gemini"))return!1;let t=["imagen","image","veo","omni","video","embedding","embed","tts","audio","speech","voice","sound","live","transcribe","bidi","aqa","learnlm","deep-research","computer-use","robotics","rt-1","rt-2","mediapipe","cyber","latest","-ultra","experimental"];for(let n of t)if(e.includes(n))return!1;return!(!e.includes("flash")&&!e.includes("pro"))}var $e="easyquiz_settings_v2",ve="easyquiz_activity_metrics";function _e(){try{let o=localStorage.getItem($e);if(!o){let s=localStorage.getItem("easyquiz_settings_v1");if(s){let i=JSON.parse(s);return{...re,apiKey:i.apiKey||""}}return{...re}}let e=JSON.parse(o),t=typeof e.model=="string"&&Y(e.model)?e.model:re.model,n=Array.isArray(e.apiKeys)?e.apiKeys.map(s=>typeof s=="string"?s.trim().replace(/^["']|["']$/g,""):"").filter(s=>s.length>5):[],r=typeof e.apiKey=="string"?e.apiKey.trim().replace(/^["']|["']$/g,""):"";if(n.length===0&&r&&(n=[r]),n.length===0)try{let s=localStorage.getItem("easyquiz_api_keys");if(s){let i=JSON.parse(s);Array.isArray(i)&&(n=i.filter(d=>typeof d=="string"&&d.trim().length>5))}}catch{}return{apiKey:n[0]||r||re.apiKey,apiKeys:n,model:t,uiMode:e.uiMode==="easy"||e.uiMode==="advanced"?e.uiMode:re.uiMode,modeHint:e.modeHint??"",engine:e.engine??"smart",dryRun:!!e.dryRun,autoApply:e.autoApply!==void 0?!!e.autoApply:!0,autoAdvance:!!e.autoAdvance,hostDarkMode:e.hostDarkMode!==void 0?!!e.hostDarkMode:!0,useVision:e.useVision!==void 0?!!e.useVision:re.useVision,confidenceThreshold:typeof e.confidenceThreshold=="number"?e.confidenceThreshold:re.confidenceThreshold}}catch{return{...re}}}function qt(){try{localStorage.removeItem($e),localStorage.removeItem("easyquiz_settings_v1"),localStorage.removeItem(ve),sessionStorage.removeItem(ve);let o=[];for(let e=0;e<localStorage.length;e++){let t=localStorage.key(e);t&&(t.startsWith("eq_")||t.startsWith("easyquiz_"))&&o.push(t)}o.forEach(e=>localStorage.removeItem(e)),Be()}catch(o){console.warn("[EasyQuiz] Erro ao resetar dados:",o)}}function et(o){try{let e=localStorage.getItem("eq_domain_cache_"+o);if(!e)return{};let t=JSON.parse(e);if(t.advanceSelector&&/inject|injetar/i.test(t.advanceSelector)){t.advanceSelector=void 0;try{localStorage.removeItem("eq_domain_cache_"+o)}catch{}}return t}catch{return{}}}function tt(o,e){if(e.advanceSelector&&/inject|injetar/i.test(e.advanceSelector))return;let n={...et(o),...e};try{localStorage.setItem("eq_domain_cache_"+o,JSON.stringify(n))}catch(r){console.warn("[EasyQuiz] Erro cache de dominio:",r)}}function Tt(o){let e=_e(),t=Array.isArray(o.apiKeys)?o.apiKeys.map(a=>typeof a=="string"?a.trim().replace(/^["']|["']$/g,""):"").filter(a=>a.length>5):e.apiKeys,n;typeof o.apiKey=="string"?n=o.apiKey.trim().replace(/^["']|["']$/g,""):Array.isArray(o.apiKeys)&&o.apiKeys.length>0?n=t[0]||"":n=e.apiKey,n&&!t.includes(n)&&(t=[n,...t]),t.length>0&&(!n||!t.includes(n))&&(n=t[0]);let r={...e,...o,apiKey:n,apiKeys:t};try{localStorage.setItem($e,JSON.stringify(r)),localStorage.setItem("easyquiz_api_keys",JSON.stringify(t))}catch(a){console.warn("[EasyQuiz] Falha ao persistir configura\xE7\xF5es no localStorage:",a)}return r}var be=[],Ct=12,eo=1200;function kt(o){let e=o.trim().replace(/\s+/g," ").slice(0,eo);e&&!be.includes(e)&&(be.push(e),be.length>Ct&&(be=be.slice(-Ct)))}function De(){return be}function Be(){be=[]}function Lt(){return{startTime:Date.now(),totalElapsedMs:0,completedQuestionsCount:0,averageDurationMs:0,records:[]}}var Ce=Lt();function qe(){try{localStorage.removeItem(ve)}catch{}return Ce}function to(o){Ce=o;try{let e=JSON.stringify(o);sessionStorage.setItem(ve,e),localStorage.removeItem(ve)}catch{}}function St(o){let e=Ce,t=Date.now(),n=e.records[e.records.length-1];if(n&&n.id===o.id&&t-n.timestamp<3e3)return e;let r={...o,timestamp:t},a=[...e.records,r],s=a.filter(u=>u.status==="answered"||u.status==="verified").length,i=a.reduce((u,f)=>u+f.durationMs,0),d=s>0?Math.round(i/s):0,l={startTime:e.startTime||t,totalElapsedMs:Math.max(t-(e.startTime||t),i),completedQuestionsCount:s,averageDurationMs:d,records:a};return to(l),l}function Te(){Ce=Lt();try{sessionStorage.removeItem(ve),localStorage.removeItem(ve)}catch{}return Ce}var Mt=`Voc\xEA \xE9 o motor operacional inteligente do EasyQuiz. Sa\xEDda EXCLUSIVA em JSON minificado, sem markdown, sem coment\xE1rios, sem texto fora do JSON.

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
`;function oo(o,e){return/forms\.(google|gle)\.com|docs\.google\.com\/forms/i.test(o)||e.includes("Qr7Oae")||e.includes("freebirdFormviewer")||e.includes("data-item-id")?"[PLATAFORMA: Google Forms \u2014 use clk nos containers de alternativa; IDs via data-item-id ou texto da op\xE7\xE3o]":/wayground|quizizz/i.test(o)||e.includes("data-functional-selector")?e.includes("classification")||e.toLowerCase().includes("fato")||e.toLowerCase().includes("opini")?`[PLATAFORMA: Wayground/Quizizz CLASSIFICA\xC7\xC3O drag-and-drop]
[RESPOSTAS] ter\xE1 items com t="draggable" e id hexadecimal (ex: 695fa5b6...).
Use EXCLUSIVAMENTE: {t:"drag", from:"ID_hexadecimal_do_card", to:"NOME_DA_CATEGORIA"}
Exemplo: {t:"drag",from:"695fa5b69885555d8155a5ac",to:"FATO"}
Classifique TODOS os items (1 drag por item) antes de emitir adv.
mode: "arrastar_soltar"`:"[PLATAFORMA: Wayground/Quizizz \u2014 alternativas s\xE3o cards clic\xE1veis, use clk]":/khanacademy\.org/i.test(o)||e.includes("perseus")?"[PLATAFORMA: Khan Academy \u2014 widgets Perseus; use js via $eq para widgets interativos se necess\xE1rio]":/moodle|ava\.|classroom\.google/i.test(o)?"[PLATAFORMA: Moodle/AVA/Classroom \u2014 formul\xE1rios padr\xE3o]":/duolingo/i.test(o)?"[PLATAFORMA: Duolingo \u2014 tiles clic\xE1veis, use clk por texto]":/blackboard|canvas\.instructure/i.test(o)?"[PLATAFORMA: Canvas/Blackboard \u2014 quiz-question padr\xE3o]":/socrative|kahoot/i.test(o)?"[PLATAFORMA: Socrative/Kahoot \u2014 alternativas s\xE3o bot\xF5es, use clk]":""}function ke(o,e,t){let n=o.htmlSnippet.includes("draggable")||o.htmlSnippet.includes("perseus")||o.htmlSnippet.includes("category")||o.htmlSnippet.includes("dropzone")||o.controls.some(v=>v.type==="draggable"||v.type==="dropzone"),r=/katex|latex|\\frac|\\sqrt/i.test(o.htmlSnippet),a=/forms\.(google|gle)\.com|docs\.google\.com\/forms/i.test(o.sourceUrl)||o.htmlSnippet.includes("Qr7Oae")||o.htmlSnippet.includes("data-item-id")||o.htmlSnippet.includes("freebirdFormviewer"),s=(/wayground|quizizz/i.test(o.sourceUrl)||o.htmlSnippet.includes("data-functional-selector"))&&(o.htmlSnippet.includes("classification")||o.controls.filter(v=>v.role==="answer").length===0),i=o.controls.filter(v=>v.role!=="navigation").length===0,d=i||n||a||s||r&&o.questionText.length<60,l=i?4500:s?6e3:1800,u=d?`
[HTML]:
${o.htmlSnippet.slice(0,l).replace(/\s+/g," ")}`:"",f="";if(i&&typeof document<"u")try{let v=Array.from(document.querySelectorAll('input:not([type=hidden]), textarea, select, button, [role="button"], [role="radio"], [role="checkbox"], [role="option"], [onclick], [data-action], a[href]:not([href="#"]), [tabindex]:not([tabindex="-1"])')).filter(y=>{let C=y,q=C.getBoundingClientRect?.()||{width:0,height:0};return q.width>0&&q.height>0&&!C.closest("#easyquiz-shadow-root, .eq-sidebar")}).slice(0,40).map(y=>{let C=y,q=C.tagName.toLowerCase(),x=C.id?`#${C.id}`:"",E=C.className&&typeof C.className=="string"?`.${C.className.trim().split(/\s+/).slice(0,2).join(".")}`:"",k=(C.textContent||C.value||C.getAttribute("aria-label")||"").trim().slice(0,60),w=C.getAttribute("type")||C.getAttribute("role")||"";return`${q}${x}${E}[${w}] txt="${k}"`});v.length>0&&(f=`
[DOM-INTERATIVO]:
${v.join(`
`)}`)}catch{}let c=De(),m=c.length>0?`
[MEM\xD3RIA]:
${c.join(" | ")}
`:"",p=o.controls.filter(v=>v.role!=="navigation"),h=o.controls.filter(v=>v.role==="navigation"),b=oo(o.sourceUrl,o.htmlSnippet),A=b?`
${b}
`:"";return`--- AN\xC1LISE ---
[MODO]: ${t.engine} | Dica: ${t.modeHint||"Auto"}
[URL]: ${o.sourceUrl}
[P\xC1GINA]: ${o.pageTitle}${m}${A}
[DADOS]
[TEXTO]:
${o.questionText}${u}${f}

[RESPOSTAS]:
${(()=>{if(p.length===0)return"Nenhuma";let v=p.filter(T=>T.type==="checkbox"||T.type==="chk"),y=new Set(p.filter(T=>T.type==="radio").map(T=>T.name).filter(Boolean)),C=v.filter(T=>!T.name||!y.has(T.name)),q=/selecione as|assinale as|quais das|todas as|marque as|escolha as|quais dessas|quais dos/i.test(o.questionText),x=C.length>=2||q,E=y.size>1||/verdadeir|fals[oa]|\bv\s*\/\s*f\b|julgue|itens/i.test(o.questionText)&&y.size>=1,k=p.every(T=>T.type==="radio"||T.type==="chk")&&y.size===1&&!x&&!E,w=p.filter(T=>T.type==="text"||T.type==="number"||T.type==="val"||T.tag==="input"||T.tag==="textarea"),M=w.length>=2;return(E?`[GRADE VERDADEIRO/FALSO (${y.size||"m\xFAltiplas"} afirma\xE7\xF5es): voc\xEA DEVE julgar e marcar exatamente 1 op\xE7\xE3o (V ou F) para CADA uma das ${y.size} afirma\xE7\xF5es \u2014 emita ${y.size} a\xE7\xF5es chk separadas + adv]
`:x?`[MULTI-SELE\xC7\xC3O: marque TODOS os corretos, pode ser 2 ou mais]
`:k?`[ESCOLHA-\xDAnica: marque APENAS 1 op\xE7\xE3o]
`:M?`[M\xDALTIPLOS CAMPOS DE PREENCHIMENTO (${w.length} campos): emita uma a\xE7\xE3o val para CADA um dos ${w.length} campos abaixo com seu id exato]
`:"")+JSON.stringify(p.map(T=>({id:T.id,t:T.type,n:T.name||void 0,txt:T.label?T.label.length>160?T.label.slice(0,160)+"...":T.label:void 0,v:T.value||void 0,opt:T.options&&T.options.length?T.options.slice(0,20).map(H=>H.label||H.value):void 0})))})()}

[NAVEGA\xC7\xC3O]:
${h.length>0?h.map(v=>`"${v.label||v.id}"[${v.type}]`).join(","):"Nenhuma"}

[IMAGENS E GR\xC1FICOS ANEXADOS (${e.length})]:
${e.length===0?"Nenhum anexo visual.":e.map((v,y)=>{let C=v.associatedLabel||"Gr\xE1fico da Quest\xE3o",q=v.alt?` | alt: "${v.alt}"`:"";if(v.captureStatus==="text_only")return`  - Imagem ${y+1} [CONTEXTO_TEXTUAL]: ${C}${q} | ${v.textContext||"sem contexto adicional"}`;if(v.captureStatus==="captured"||v.base64){let x=v.textContext?` | Textos e r\xF3tulos do gr\xE1fico: "${v.textContext}"`:"";return`  - Imagem ${y+1} [VISUAL_INLINE]: ${C}${q}${x}`}return`  - Imagem ${y+1} [FALHOU]: ${C}${q}`}).join(`
`)}
[/DADOS]
Sa\xEDda em JSON v\xE1lido.`}var no=new Set(["question","info","start","conclusion"]),ao=new Set(["texto_livre","escolha_unica","escolha_multipla","verdadeiro_falso","preenchimento","acao_sem_resposta","categorizacao","ordenacao","arrastar_soltar"]),io=new Set(["val","chk","sel","clk","adv","js","drag"]),so=150,Le=2e3;function $(o,e=""){return o==null?e:typeof o=="string"?o.trim().slice(0,Le):typeof o=="number"||typeof o=="boolean"?String(o).trim().slice(0,Le):e}function ro(o,e){if(!o||typeof o!="object")return null;let t=o,n=t.t;if(typeof n!="string"||!io.has(n))return null;if(n==="adv"){let i=t.id??t.target??t.name??t.selector;return{t:"adv",...$(i)?{id:$(i,"").slice(0,500)}:{}}}if(n==="drag"){let i=$(t.from??t.source),d=$(t.to??t.target??t.destination);return!i||!d?null:{t:"drag",from:i.slice(0,500),to:d.slice(0,500)}}if(n==="js"){let i=$(t.v??t.code??t.script);return!i||i.length>8e3?null:{t:"js",v:i}}let r=t.id??t.target??t.name??t.selector??t.element;(r==null||r==="")&&n==="val"&&(r="1");let a=$(r).slice(0,500);if(!a)return null;if(n==="val"){let i=t.v!==void 0?t.v:t.value!==void 0?t.value:t.val!==void 0?t.val:t.text!==void 0?t.text:t.answer;return{t:"val",id:a,v:$(i).slice(0,Le)}}if(n==="sel"){let i=t.v!==void 0?t.v:t.value!==void 0?t.value:t.val!==void 0?t.val:t.values,l=(Array.isArray(i)?i:[i]).map(u=>$(u).slice(0,500)).filter(Boolean);return{t:"sel",id:a,v:l}}if(n==="chk"){let i=t.c===!1||t.c==="false"||t.c===0||t.c==="0"||t.c==="off"||t.c==="unchecked"||t.c==="desmarcar",d={t:"chk",id:a,c:!i};return t.v!==void 0&&(d.v=$(t.v).slice(0,Le)),d}let s={t:"clk",id:a};if(t.c!==void 0){let i=t.c===!1||t.c==="false"||t.c===0||t.c==="0"||t.c==="off"||t.c==="unchecked"||t.c==="desmarcar";s.c=!i}return t.v!==void 0&&(s.v=$(t.v).slice(0,Le)),Array.isArray(t.co)&&t.co.length===2&&t.co.every(i=>typeof i=="number"&&Number.isFinite(i))&&(s.co=[t.co[0],t.co[1]]),s}function lo(o,e,t){if(t!=="question")return o;let n=o.filter(a=>a.t==="adv"),r=o.filter(a=>a.t!=="adv");if(e==="escolha_unica"){r=r.filter(s=>!(s.t==="chk"&&s.c===!1||s.t==="clk"&&s.c===!1));let a=r.filter(s=>s.t==="chk"||s.t==="clk");if(a.length>1){let s=r.filter(d=>d.t!=="chk"&&d.t!=="clk"),i=a[a.length-1];r=[...s,i]}}else if(e==="escolha_multipla"){r=r.filter(s=>!(s.t==="chk"&&s.c===!1||s.t==="clk"&&s.c===!1));let a=new Set;r=r.filter(s=>{let i="id"in s&&typeof s.id=="string"?s.id:"";return i?a.has(i)?!1:(a.add(i),!0):!0})}else if(e==="verdadeiro_falso"){let a=new Set,s=[...r].reverse(),i=[];for(let d of s){let l="id"in d&&typeof d.id=="string"?d.id:"";l?a.has(l)||(a.add(l),i.push(d)):i.push(d)}r=i.reverse()}return[...r,...n]}function It(o){if(!o||typeof o!="object")return{pageType:"info",mode:"acao_sem_resposta",confidence:.5,rationale:"Resposta estruturada n\xE3o identificada; avan\xE7ando como informativo.",actions:[{t:"adv"}]};let e=o,t=e.pageType,n=e.mode;(typeof t!="string"||!no.has(t))&&(t="question"),(typeof n!="string"||!ao.has(n))&&(n="escolha_unica");let r=Array.isArray(e.actions)?e.actions:[],a=[];for(let d=0;d<Math.min(r.length,so);d++){let l=ro(r[d],d);l&&a.push(l)}a.some(d=>d.t==="val")&&(n==="escolha_unica"||!e.mode)&&(n="preenchimento"),a.some(d=>d.t==="drag")&&!["categorizacao","arrastar_soltar","ordenacao"].includes(n)&&(n="arrastar_soltar"),a=lo(a,n,t);let s=a.some(d=>d.t==="adv");t==="conclusion"?a.length=0:t==="info"||t==="start"?s||a.push({t:"adv"}):t==="question"&&!s&&a.push({t:"adv"});let i=typeof e.confidence=="number"&&Number.isFinite(e.confidence)?Math.min(1,Math.max(0,e.confidence)):.85;return{pageType:t,mode:n,confidence:i,rationale:$(e.rationale,"Plano validado e auto-recuperado."),actions:a,...$(e.memoryToStore)?{memoryToStore:$(e.memoryToStore)}:{},...e.needsMoreContext?{needsMoreContext:!!e.needsMoreContext}:{}}}var te=class{keys=new Map;constructor(e=[]){this.init(e)}init(e){let t=new Map(this.keys);this.keys.clear();let n=e.flatMap(a=>a.split(/[\n\r]+/));Array.from(new Set(n.map(a=>a.trim().replace(/^["']|["']$/g,"")).filter(a=>a.length>5))).forEach((a,s)=>{let i=this.generateId(a),d=t.get(i)||t.get(a);this.keys.set(i,{id:i,key:a,label:d?.label||`Chave ${s+1}`,addedAt:d?.addedAt||Date.now(),lastUsedAt:d?.lastUsedAt,lastLatencyMs:d?.lastLatencyMs,cooldownUntil:d?.cooldownUntil,errorCount:d?.errorCount||0,lastError:d?.lastError,winCount:d?.winCount||0})})}generateId(e){let t=0;for(let r=0;r<e.length;r++)t=(t<<5)-t+e.charCodeAt(r),t|=0;let n=e.slice(-12).replace(/[^a-zA-Z0-9]/g,"").slice(0,6);return`key_${Math.abs(t).toString(36).slice(0,6)}${n}`}static maskKey(e){let t=e.trim().replace(/^["']|["']$/g,"");return t.length<=10?"\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022":`${t.slice(0,6)}...${t.slice(-4)}`}getAllKeys(){let e=Date.now();return Array.from(this.keys.values()).map(t=>{let n=Math.max(0,(t.cooldownUntil||0)-e);return{...t,isCooldown:n>0,remainingCooldownMs:n}})}getHealthyKeys(){let e=Date.now();return Array.from(this.keys.values()).filter(t=>(t.cooldownUntil||0)<=e&&(t.errorCount||0)<50)}getRoundRobinKeys(e=2){let t=Date.now(),n=Array.from(this.keys.values()).filter(a=>(a.errorCount||0)<50);if(n.length===0)return Array.from(this.keys.values()).slice(0,e);let r=n.filter(a=>(a.cooldownUntil||0)<=t);return r.length>0?(r.sort((a,s)=>{let i=a.lastLatencyMs!==void 0?a.lastLatencyMs:99999,d=s.lastLatencyMs!==void 0?s.lastLatencyMs:99999;if(i!==d)return i-d;let l=(a.lastUsedAt||0)-(s.lastUsedAt||0);return l!==0?l:a.addedAt-s.addedAt}),r.slice(0,e)):(n.sort((a,s)=>(a.cooldownUntil||0)-(s.cooldownUntil||0)),n.slice(0,e))}getBestKey(){return this.getRoundRobinKeys(1)[0]?.key||""}getDiverseKeys(e){return this.getRoundRobinKeys(e).map(t=>t.key)}markQuotaHit(e,t=8e3){let n=this.findKeyObj(e);n&&(n.cooldownUntil=Date.now()+t,n.lastError=`Cota tempor\xE1ria atingida (HTTP 429). Cooldown de ${Math.round(t/1e3)}s ativado.`)}markOverloaded(e,t=5e3){let n=this.findKeyObj(e);n&&(n.cooldownUntil=Date.now()+t,n.lastError=`Servidores sobrecarregados (HTTP 503). Cooldown de ${Math.round(t/1e3)}s ativado.`)}markSuccess(e,t){let n=this.findKeyObj(e);n&&(n.lastLatencyMs=t,n.lastUsedAt=Date.now(),n.errorCount=0,n.lastError=void 0,n.cooldownUntil=void 0)}markWinner(e){let t=this.findKeyObj(e);t&&(t.winCount=(t.winCount||0)+1)}markInvalid(e,t){let n=this.findKeyObj(e);n&&(n.errorCount=99,n.lastError=t)}addKey(e,t){let n=e.trim().replace(/^["']|["']$/g,"");if(!n)return{ok:!1,message:"Chave n\xE3o pode ser vazia."};if(n.length<15)return{ok:!1,message:"Chave de API inv\xE1lida ou muito curta."};let r=this.generateId(n);if(this.keys.has(r)||Array.from(this.keys.values()).some(i=>i.key===n))return{ok:!1,message:"Esta chave de API j\xE1 est\xE1 cadastrada."};let s={id:r,key:n,label:t?.trim()||`Chave ${this.keys.size+1}`,addedAt:Date.now(),errorCount:0};return this.keys.set(r,s),{ok:!0,message:"Chave adicionada com sucesso!",keyItem:s}}updateKey(e,t,n){let r=this.keys.get(e);if(!r)return{ok:!1,message:"Chave n\xE3o encontrada."};let a=t.trim().replace(/^["']|["']$/g,"");return!a||a.length<15?{ok:!1,message:"Chave de API inv\xE1lida."}:(r.key=a,n!==void 0&&(r.label=n.trim()),r.errorCount=0,r.cooldownUntil=void 0,r.lastError=void 0,{ok:!0,message:"Chave atualizada com sucesso!"})}removeKey(e){if(this.keys.size<=1)return{ok:!1,message:"Voc\xEA precisa manter pelo menos 1 chave de API cadastrada."};let t=this.findKeyObj(e);return t?(this.keys.delete(t.id),{ok:!0,message:"Chave removida com sucesso."}):{ok:!1,message:"Chave n\xE3o encontrada."}}exportRawKeys(){return Array.from(this.keys.values()).map(e=>e.key)}size(){return this.keys.size}findKeyObj(e){if(this.keys.has(e))return this.keys.get(e);for(let t of this.keys.values())if(t.key===e)return t}},D=new te;var we=[{id:"gemini-3.8-flash",name:"Gemini 3.8 Flash (Mais Inteligente 2026)",description:"Modelo flagship Flash lan\xE7ado em Set/2026. Ultra-r\xE1pido e altamente capaz.",stable:!0},{id:"gemini-3.7-flash",name:"Gemini 3.7 Flash (Agentic)",description:"Alta capacidade para racioc\xEDnio multimodal e workflows ag\xEAnticos.",stable:!0},{id:"gemini-3.6-flash",name:"Gemini 3.6 Flash (Est\xE1vel)",description:"Modelo est\xE1vel e confi\xE1vel com excelente velocidade.",stable:!0},{id:"gemini-3.5-flash",name:"Gemini 3.5 Flash (R\xE1pido)",description:"Modelo de alta performance para tarefas r\xE1pidas.",stable:!0},{id:"gemini-3.5-flash-lite",name:"Gemini 3.5 Flash-Lite (Cota Alta 30 RPM)",description:"Modelo econ\xF4mico de ultra-alta velocidade e maior limite de RPM.",stable:!0},{id:"gemini-3.1-pro",name:"Gemini 3.1 Pro (Racioc\xEDnio Profundo)",description:"Modelo topo de linha para racioc\xEDnio complexo, exatas e matem\xE1tica.",stable:!0},{id:"gemini-2.5-flash",name:"Gemini 2.5 Flash (Ultra R\xE1pido)",description:"Modelo comprovado de baix\xEDssima lat\xEAncia e alta disponibilidade.",stable:!0},{id:"gemini-2.5-pro",name:"Gemini 2.5 Pro (Avan\xE7ado)",description:"Modelo avan\xE7ado para quest\xF5es de alta complexidade.",stable:!0}],zt=["gemini-3.5-flash-lite","gemini-3.5-flash","gemini-3.6-flash","gemini-3.8-flash","gemini-2.5-flash"],co={"gemini-2.0-flash":"gemini-3.5-flash","gemini-2.0-flash-lite":"gemini-3.5-flash-lite","gemini-1.5-flash":"gemini-3.5-flash","gemini-1.5-pro":"gemini-3.6-flash","gemini-1.0-pro":"gemini-2.5-flash"};function at(o){return co[o]??o}function uo(o,e){let n={temperature:0,maxOutputTokens:1350,responseMimeType:"application/json",responseSchema:e??po};return/lite/i.test(o)||(/gemini-3\.[0-9]+-?flash/i.test(o)?n.thinkingConfig={thinkingBudget:0}:/gemini-2\.5-flash/i.test(o)&&(n.thinkingConfig={thinkingBudget:0})),n}var po={type:"OBJECT",properties:{pageType:{type:"STRING",enum:["question","info","start","conclusion"]},mode:{type:"STRING",enum:["texto_livre","escolha_unica","escolha_multipla","verdadeiro_falso","preenchimento","acao_sem_resposta","categorizacao","ordenacao","arrastar_soltar"]},confidence:{type:"NUMBER"},rationale:{type:"STRING"},thinking:{type:"STRING"},memoryToStore:{type:"STRING"},imageDescriptions:{type:"ARRAY",items:{type:"OBJECT",properties:{index:{type:"NUMBER"},description:{type:"STRING"},relevant:{type:"BOOLEAN"},associatedLabel:{type:"STRING"}}}},actions:{type:"ARRAY",items:{type:"OBJECT",properties:{t:{type:"STRING",enum:["val","chk","sel","clk","adv","js","drag"]},id:{type:"STRING"},name:{type:"STRING"},label:{type:"STRING"},v:{type:"STRING"},c:{type:"BOOLEAN"},co:{type:"ARRAY",items:{type:"NUMBER"}},from:{type:"STRING"},to:{type:"STRING"}},required:["t"]}}},required:["pageType","mode","confidence","rationale","actions"]};function Pt(o){let e=o.trim().replace(/^google\//,"").replace(/^models\//,"");if(!e)return"gemini-3.5-flash-lite";let t=at(e);return Y(t)?t:(console.warn(`[EasyQuiz] Modelo desconhecido ou inv\xE1lido: "${e}". Verifique se o modelo est\xE1 dispon\xEDvel no Google AI Studio.`),"gemini-3.5-flash-lite")}function nt(o,e){let t="";try{let n=JSON.parse(o);t=n.error?.message||n.message||""}catch{t=o.slice(0,160)}return/API_KEY_INVALID|API key not valid|key.*invalid|unregistered/i.test(t)?"Chave de API do Gemini inv\xE1lida ou n\xE3o autorizada no Google AI Studio.":/RESOURCE_EXHAUSTED|Quota exceeded|rate limit|quota/i.test(t)||e===429?`Cota do Gemini excedida (HTTP 429): ${t||"Aguarde"}`:e===404?`HTTP 404: ${t||"Modelo ou endpoint n\xE3o encontrado no Google AI Studio"}`:e===503||/overloaded/i.test(t)?`Servidores Google sobrecarregados (HTTP 503): ${t||"Aguardando"}`:t?`Erro Gemini (HTTP ${e}): ${t}`:`Falha na requisi\xE7\xE3o ao Gemini (HTTP ${e}).`}function mo(o){let e=o.trim(),t=e.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);if(t)try{return JSON.parse(t[1].trim())}catch{}try{return JSON.parse(e)}catch{}let n=e.match(/\{[\s\S]*\}/);if(n)try{return JSON.parse(n[0].trim())}catch{}try{let r=e.indexOf("{");if(r!==-1){let a=e.slice(r).trim();a=a.replace(/,\s*\{[^}]*$/,""),a=a.replace(/,\s*$/,"");let s=0,i=0,d=!1,l=!1;for(let f=0;f<a.length;f++){let c=a[f];if(l){l=!1;continue}if(c==="\\"){l=!0;continue}if(c==='"'){d=!d;continue}d||(c==="{"?s++:c==="}"?s=Math.max(0,s-1):c==="["?i++:c==="]"&&(i=Math.max(0,i-1)))}for(d&&(a+='"');i>0;)a+="]",i--;for(;s>0;)a+="}",s--;let u=JSON.parse(a);if(u&&typeof u=="object")return u}}catch{}throw new Error("Falha ao decodificar JSON da IA.")}var Ot=(()=>{try{let o=typeof localStorage<"u"?localStorage.getItem("easyquiz_cached_models"):null;if(!o)return null;let e=JSON.parse(o);if(Array.isArray(e)){let t=e.filter(n=>n&&typeof n.id=="string"&&Y(n.id));return t.length>0?t:null}return null}catch{return null}})(),ot=new Set;async function Re(o){let e=o.trim().replace(/^["']|["']$/g,"");if(!e)return we;let t=[`https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(e)}`,`https://generativelanguage.googleapis.com/v1/models?key=${encodeURIComponent(e)}`];for(let n of t)try{let r=await fetch(n,{headers:{"Content-Type":"application/json","x-goog-api-key":e}});if(!r.ok){let s=await r.text(),i=nt(s,r.status);if(i.includes("inv\xE1lida")||i.includes("n\xE3o autorizada"))throw new Error(i);continue}let a=await r.json();if(Array.isArray(a.models)&&a.models.length>0){let s=a.models.filter(i=>{let d=i.supportedGenerationMethods||[],l=(i.name||"").replace(/^models\//,""),u=d.includes("generateContent");return Y(l)&&u}).map(i=>{let d=i.supportedGenerationMethods||[],l=i.name.replace(/^models\//,""),u=i.displayName||l;return{id:l,name:u.includes(l)?u:`${u} (${l})`,description:i.description||"",stable:!/-preview|-experimental|-latest/i.test(l),supportsVision:!/embedding|tts|transcribe|live|image|sound|voice/i.test(l),supportsStructuredOutput:d.includes("generateContent"),supportedGenerationMethods:d,discoveredAt:Date.now()}});if(s.length>0){s.sort((i,d)=>{let l=u=>u==="gemini-3.8-flash"?200:u==="gemini-3.7-flash"?190:u==="gemini-3.6-flash"?180:u==="gemini-3.5-flash"?170:u==="gemini-3.5-flash-lite"?160:u==="gemini-2.5-flash"?130:u.includes("flash")?80:u==="gemini-2.5-pro"?60:u.includes("pro")?50:10;return l(d.id)-l(i.id)}),Ot=s;try{typeof localStorage<"u"&&localStorage.setItem("easyquiz_cached_models",JSON.stringify(s))}catch{}return s}}}catch(r){if(r.message?.includes("Chave de API"))throw r}return we}async function Qe(o){let e=o.trim().replace(/^["']|["']$/g,"");if(!e)return{ok:!1,message:"Insira sua chave de API."};try{let n=await Re(e);if(n.length>0&&n!==we){let r=n[0];return{ok:!0,message:`Chave v\xE1lida! ${n.length} modelos Gemini dispon\xEDveis em sua conta. Recomendado: ${r.name}`,models:n}}}catch(n){return{ok:!1,message:n instanceof Error?n.message:String(n)}}let t=["gemini-3.8-flash","gemini-3.6-flash","gemini-3.5-flash"];for(let n of t)for(let r of["v1beta","v1"]){let a=`https://generativelanguage.googleapis.com/${r}/models/${n}:generateContent?key=${encodeURIComponent(e)}`;try{if((await fetch(a,{method:"POST",headers:{"Content-Type":"application/json","x-goog-api-key":e},body:JSON.stringify({contents:[{role:"user",parts:[{text:"PING"}]}],generationConfig:{maxOutputTokens:5}})})).ok)return{ok:!0,message:`Chave validada com sucesso no ${n} (${r})!`,models:we}}catch{}}return{ok:!1,message:"Chave de API inv\xE1lida, sem cota ou sem permiss\xE3o para modelos Gemini."}}async function it(o,e){let t=e.map(l=>l.trim().replace(/^["']|["']$/g,"")).filter(l=>l.length>5);if(t.length===0)return{ok:!1,model:o,key:"",message:"Nenhuma chave dispon\xEDvel."};let n=at(Pt(o)),r=JSON.stringify({contents:[{role:"user",parts:[{text:"PING"}]}],generationConfig:{maxOutputTokens:5}}),a={"Content-Type":"application/json"};async function s(l,u,f){let c=new AbortController,m=setTimeout(()=>c.abort(),f);try{let p=`https://generativelanguage.googleapis.com/v1beta/models/${u}:generateContent?key=${encodeURIComponent(l)}`,h=await fetch(p,{method:"POST",headers:{...a,"x-goog-api-key":l},body:r,signal:c.signal});if(clearTimeout(m),h.ok)return{ok:!0,model:u,key:l,message:`Modelo '${u}' validado com sucesso!`};let b=await h.text().catch(()=>"");throw new Error(`HTTP ${h.status}: ${b.slice(0,80)}`)}catch(p){throw clearTimeout(m),p}}if(t.length>=2){let l=t.slice(0,6);try{return await Promise.any(l.map(f=>s(f,n,8e3)))}catch{}}let i=t[0],d=[n,...zt.filter(l=>l!==n)];for(let l of d)try{let u=await s(i,l,4e3);return l!==n&&(u.message=`Modelo preferido indispon\xEDvel. Validado via fallback '${l}'.`),u}catch{}return{ok:!1,model:n,key:i,message:"Nenhum modelo Gemini respondeu. Verifique sua chave e cota."}}async function ho(o,e,t,n,r){let a=["v1beta","v1"],s=new Error(`Falha ao consultar modelo ${o}`),d={...uo(o,r)};for(let l of a){if(n.aborted)throw new Error("Opera\xE7\xE3o cancelada pelo usu\xE1rio.");let u=`https://generativelanguage.googleapis.com/${l}/models/${o}:generateContent?key=${encodeURIComponent(e)}`,f=Date.now();try{let c=await fetch(u,{method:"POST",headers:{"Content-Type":"application/json","x-goog-api-key":e},body:JSON.stringify({...t,generationConfig:d}),signal:n});if(!c.ok){let h=await c.text();if(c.status===400){let A=/thinking/i.test(h),v=/response_schema|responseSchema|Repeated map key|PROTO payload/i.test(h);if((A||v)&&(d.thinkingConfig||d.responseSchema)){let y={...d};A&&delete y.thinkingConfig,v&&(delete y.responseSchema,delete y.responseMimeType),d=y;let C=await fetch(u,{method:"POST",headers:{"Content-Type":"application/json","x-goog-api-key":e},body:JSON.stringify({...t,generationConfig:d}),signal:n});if(C.ok){let E=await C.json(),k=E.candidates?.[0];if(k?.content?.parts?.[0]?.text)return D.markSuccess(e,Date.now()-f),{rawText:k.content.parts[0].text,data:E,usedModel:o,usedKey:e}}let q=await C?.text?.().catch(()=>"")??h,x=nt(q,c.status);throw new Error(`[${o}|${te.maskKey(e)}] ${x}`)}}let b=nt(h,c.status);if(c.status===404&&l==="v1beta")continue;throw c.status===429?(D.markQuotaHit(e,8e3),Dt(e,o,1e4),new Error(`[${o}|${te.maskKey(e)}] ${b}`)):(c.status===503||/no capacity|overloaded|unavailable/i.test(h)?(D.markOverloaded(e,5e3),ot.add(o)):c.status===403||/API_KEY_INVALID/i.test(h)?D.markInvalid(e,b):c.status===404&&ot.add(o),new Error(`[${o}|${te.maskKey(e)}] ${b}`))}let m=await c.json(),p=m.candidates?.[0];if(!p||!p.content?.parts?.[0]?.text)throw new Error(`[${o}|${te.maskKey(e)}] A IA n\xE3o retornou uma resposta estruturada v\xE1lida.`);return D.markSuccess(e,Date.now()-f),{rawText:p.content.parts[0].text,data:m,usedModel:o,usedKey:e}}catch(c){if(n.aborted)throw c;s=c;let m=s.message||"";if(m.includes("404")||/no longer available/i.test(m)){ot.add(o);break}if(m.includes("429")||m.includes("Quota"))break}}throw s}var Ne=new Map;function Ht(o,e){let t=`${o}::${e}`,n=Ne.get(t);return n===void 0?!1:Date.now()>n?(Ne.delete(t),!1):!0}function Dt(o,e,t=1e4){Ne.set(`${o}::${e}`,Date.now()+t)}function st(){Ne.clear()}async function je(o,e,t,n,r,a){if(r?.aborted)throw new Error("Opera\xE7\xE3o cancelada pelo usu\xE1rio.");let s=Array.isArray(t.apiKeys)&&t.apiKeys.length>0?t.apiKeys:t.apiKey?[t.apiKey]:[];D.init(s);let i=t.apiKey.trim().replace(/^["']|["']$/g,""),d=D.getBestKey()||i;if(!d)throw new Error("Nenhuma chave de API do Gemini configurada ou dispon\xEDvel.");let l=Pt(t.model);if(!Ot&&d&&Re(d).catch(()=>{}),r?.aborted)throw new Error("Opera\xE7\xE3o cancelada pelo usu\xE1rio.");let u=Date.now(),f=ke(o,e,t),c=[{text:f}];for(let I=0;I<e.length;I++){let T=e[I],H=T.associatedLabel||(T.alt?`Imagem: ${T.alt}`:`Imagem ${I+1}`);if(T.captureStatus==="text_only"||!T.base64){let O=T.textContext||T.alt||"";c.push({text:`[CONTEXTO_IMAGEM_${I+1} - V\xCDNCULO: ${H}]: ${O}`})}else c.push({text:`[ANEXO VISUAL ${I+1} - V\xCDNCULO: ${H}]:`}),c.push({inline_data:{mime_type:T.mediaType,data:T.base64}})}let m={system_instruction:{parts:[{text:a?.systemPromptOverride??Mt}]},contents:[{role:"user",parts:c}]},p=at(l),h=zt.filter(I=>I!==p),A=D.getAllKeys().length,v=I=>A<=1||I===0?1:2,y=new Set,C=(I,T)=>{let H=/pro/i.test(I),O=/lite/i.test(I);return H?T===0?18e3:T===1?24e3:3e4:O?T===0?1e4:T===1?14e3:18e3:T===0?16e3:T===1?2e4:25e3},q=async(I,T)=>{if(T.length===0||r?.aborted)return null;let H=T.map(()=>new AbortController),O=()=>H.forEach(R=>{try{R.abort()}catch{}});r?.addEventListener("abort",O,{once:!0});let N=T.map(R=>`${R.model.replace("gemini-","")}/${R.label}`).join(" | ");n?.(`\u26A1 ${I}: ${T.length} slot(s) [${N}]...`,"info");try{let R=T.map(async(X,Z)=>{let K=H[Z],ee=setTimeout(()=>{try{K.abort(new Error(`Timeout ${X.timeout/1e3}s (${X.model}|${X.label})`))}catch{K.abort()}},X.timeout);try{let j=await ho(X.model,X.key,m,K.signal,a?.generationSchemaOverride);clearTimeout(ee);let J=It(mo(j.rawText));return J.usedModel=j.usedModel,J.durationMs=Date.now()-u,J.promptSent=f,J.tokensUsed=j.data.usageMetadata?.totalTokenCount,J.promptTokens=j.data.usageMetadata?.promptTokenCount,J.candidatesTokens=j.data.usageMetadata?.candidatesTokenCount,J.rawResponse=j.rawText,H.forEach((Et,_t)=>{if(_t!==Z)try{Et.abort(new Error("Cancelado: vencedor respondeu."))}catch{Et.abort()}}),{plan:J,rawUsage:j.data.usageMetadata,usedModel:j.usedModel,usedKey:j.usedKey,slotLabel:X.label}}catch(j){clearTimeout(ee);let J=j instanceof Error?j.message:String(j);throw(J.includes("429")||J.includes("Quota")||J.includes("RESOURCE_EXHAUSTED"))&&(Dt(X.key,X.model,1e4),D.markQuotaHit(X.key,8e3)),j}}),U=await Promise.any(R);return r?.removeEventListener("abort",O),D.markWinner(U.usedKey),U}catch(R){return r?.removeEventListener("abort",O),R instanceof AggregateError&&R.errors.length>0?w=R.errors.map(U=>U instanceof Error?U.message:String(U)).join(" | "):R instanceof Error&&(w=R.message),console.warn(`[EasyQuiz ${I}] Falha na onda:`,w),null}},E=(A<=1?1:1+Math.ceil((A-1)/2))+4,k=0,w="",M=0;for(;k<E;){if(r?.aborted)throw new Error("Opera\xE7\xE3o cancelada pelo usu\xE1rio.");let I=D.getRoundRobinKeys(A),T=I.filter(K=>!y.has(`${K.key}::${p}`)&&!Ht(K.key,p)),H,O;if(T.length>0)H=p,O=T;else{let K=h;H=K[M%K.length]||p,M++;let ee=I.filter(j=>!y.has(`${j.key}::${H}`)&&!Ht(j.key,H));O=ee.length>0?ee:I.filter(j=>!y.has(`${j.key}::${H}`))}if(O.length===0){if(M<h.length)continue;break}let N=O.slice(0,v(k));if(N.length===0)break;let R=C(H,k),U=N.map(K=>(y.add(`${K.key}::${H}`),{model:H,key:K.key,label:K.label||"Chave",timeout:R})),X=k===0?"Onda 1":`Onda ${k+1}`,Z=await q(X,U);if(Z){let K=Z.plan.durationMs||Date.now()-u,ee=te.maskKey(Z.usedKey);return n?.(`\u2705 ${K}ms via '${Z.usedModel}' (${Z.slotLabel}: ${ee})`,"info"),Z}k++}throw new Error(w||"Todas as tentativas falharam. Verifique suas chaves de API e cotas.")}var go=[/\bfetch\b/i,/\bXMLHttpRequest\b/i,/\bWebSocket\b/i,/\b(?:localStorage|sessionStorage|indexedDB)\b/i,/\b(?:eval|Function|AsyncFunction|GeneratorFunction)\b/i,/\bimport(?:Scripts)?\b/i,/\bnavigator\s*\.\s*credentials\b/i,/\b(?:cookie|location\s*=|history\s*\.)/i,/\bwindow\s*\[\s*['"](?:fetch|eval|Function|localStorage|sessionStorage)/i];function Ae(o){let e=o?.engine||"smart",t=new Set(["dom","framework","keyboard","drag"]);return o?.autoAdvance&&t.add("navigation"),e==="javascript"&&t.add("javascript"),{engine:e,capabilities:t,maxAttemptsPerAction:e==="command"?1:2,maxActionMs:e==="command"?1500:3e3,allowJavaScript:e==="javascript",allowNavigation:!!o?.autoAdvance}}function rt(o,e){if(o.t==="js"&&!e.allowJavaScript)throw new Error("A\xE7\xE3o JavaScript bloqueada pela engine atual. Use o motor JavaScript explicitamente.");if(o.t==="adv"&&!e.allowNavigation)throw new Error("Avan\xE7o autom\xE1tico bloqueado pela pol\xEDtica atual.")}function Bt(o){if(!o.trim())throw new Error("JavaScript recusado: c\xF3digo vazio.");if(o.length>8e3)throw new Error("JavaScript recusado: c\xF3digo acima do limite operacional.");if(go.find(t=>t.test(o)))throw new Error("JavaScript recusado: acesso externo, persist\xEAncia ou avalia\xE7\xE3o din\xE2mica n\xE3o permitidos.");if(!/^\s*(?:\/\/[^\n]*\n|\/\*[\s\S]*?\*\/|[\s\S])*\$eq\./.test(o)&&!o.includes("$eq."))throw new Error("JavaScript recusado: use somente a API declarativa $eq.")}var Ee=['input:not([type="hidden"])',"textarea","select","button","a","label",'[role="button"]','[role="link"]','[role="radio"]','[role="checkbox"]','[role="option"]','[role="treeitem"]','[role="menuitemcheckbox"]','[role="menuitemradio"]','[contenteditable="true"]','[draggable="true"]',"[aria-grabbed]","[aria-dropeffect]","[data-widget-type]",".perseus-drag-item",".sortable-item",'[data-testid*="drag" i]','[data-testid*="card" i]','[data-testid*="option" i]','[data-testid*="choice" i]','[data-testid*="category" i]',"[data-choice]","[data-option]","[data-answer]","[data-value]",".quiz-option",".option-card",".choice-card",'[class*="option-card" i]','[class*="choice-card" i]','[class*="option-item" i]','[class*="choice-item" i]','[class*="answer-item" i]','[class*="alternative" i]','li[class*="choice" i]','li[class*="option" i]','li[class*="answer" i]','[data-role="dropzone"]',"[data-category]","[data-item-id]","[data-params][jsmodel]",'[class*="draggable-item" i]','[class*="drag-item" i]','[class*="sortable-card" i]','[class*="card-option" i]','[class*="tile" i][class*="option" i]'].join(","),Me=/(verificar|checar|check|conferir|validar|próxim[oa]|next|continuar|continue|avançar|prosseguir|enviar|submit|concluir|finalizar|terminar|começar|iniciar|start|vamos lá|próxima tarefa|next task|próxima pergunta|next question|marcar como concluíd[oa]|mostrar resumo|entendi|compreendi|ok|leitura concluída|seguir|ir para o exercício|fazer o teste|próximo artigo|ir para a aula)/i,le=/(\banterior\b|\bvoltar\b|\bback\b|\bprev\b|\bprevious\b|recomeçar|\brestart\b|\breplay\b|\bretornar\b)/i,fo=0;function lt(o){try{let e=o.closest('[hidden], [style*="display: none"], [style*="display:none"], [aria-hidden="true"]');if(e&&!ue(e))return!1}catch{}try{let e=window.getComputedStyle?window.getComputedStyle(o):o.style;if(e&&(e.display==="none"||e.visibility==="hidden"))return!1}catch{}try{if(typeof o.getBoundingClientRect=="function"){let e=o.getBoundingClientRect();if(e.width>0||e.height>0)return!0}}catch{}return(o.textContent||"").trim().length>0}function V(o){try{if(typeof CSS<"u"&&typeof CSS.escape=="function")return CSS.escape(o)}catch{}return String(o).replace(/["\\]/g,"\\$&")}function z(o){let e=o;if(!e||typeof e.isConnected=="boolean"&&!e.isConnected||ue(e))return!1;let t=e.tagName?.toLowerCase();if(["input","select","textarea","button"].includes(t)){let n=e.type?.toLowerCase();if(n==="checkbox"||n==="radio"){if(e.id)try{let a=e.ownerDocument?.querySelector(`label[for="${V(e.id)}"]`);if(a&&lt(a))return!0}catch{}let r=e.closest('label, .option-card, .quiz-option, .choice, .answer, [role="radio"], [role="checkbox"], [class*="option" i], [class*="choice" i], [class*="item" i], li, tr');if(r&&r!==e&&lt(r))return!0}try{if(!e.closest('[hidden], [style*="display: none"], [style*="display:none"], [aria-hidden="true"]')){let a=window.getComputedStyle?window.getComputedStyle(e):e.style;if(!a||a.display!=="none"&&a.visibility!=="hidden"){if(typeof e.getBoundingClientRect=="function"){let s=e.getBoundingClientRect();if(s.width>0||s.height>0)return!0}return!0}}}catch{}}return lt(e)}function bo(o){if(o==null)return"";if(typeof o=="string")return o;if(typeof o=="number"||typeof o=="boolean")return String(o);if(o instanceof Node)return o.textContent||"";try{if(typeof o?.toString=="function"){let e=o.toString();if(typeof e=="string")return e}}catch{}return""}function Q(o,e=500){return bo(o).replace(/\s+/g," ").trim().slice(0,e)}function vo(o){let e=o.dataset.easyquizId;if(e)return e;let t=`eq-${Date.now().toString(36)}-${(fo+=1).toString(36)}`;return o.dataset.easyquizId=t,t}function ue(o){return o?!!(o.closest('#easyquiz-shadow-root, .eq-sidebar, .eq-launcher, [data-easyquiz-ignore="true"], .btn-inject-eq, #btn-inject-script')||o.getAttribute?.("data-easyquiz-ignore")==="true"):!1}var Se=/(leaderboard|scoreboard|placar|ranking|trophy|pause|pausar|mute|mutar|audio|sound|som|música|music|configuraç|settings|theme|ajuda|help|report|denunciar|feedback|power-?up|streak|coins|fullscreen|full-screen|read-?aloud|audio-?player|(?:audio|sound|som|media)[-_ ]*volume|volume[-_ ]*(?:slider|control|level|btn|button|icon|mute)|vol-slider)/i;function F(o){if(!o||typeof o.getAttribute!="function"||typeof Element<"u"&&!(o instanceof Element))return!1;if(ue(o))return!0;let e=o.tagName?.toLowerCase();if(["select","textarea"].includes(e)||e==="input"&&!["button","submit","reset"].includes((o.type||"").toLowerCase()))return!1;let n=o.closest?.('button, a, [role="button"], [class*="leaderboard" i], [data-testid*="leaderboard" i], [class*="scoreboard" i], [class*="trophy" i]')||o,r=String(n.getAttribute?.("data-testid")||n.getAttribute?.("data-test-id")||n.getAttribute?.("id")||""),a=String(n.getAttribute?.("aria-label")||""),s=String(n.getAttribute?.("title")||""),i=typeof n.className=="string"?n.className:typeof n.className?.baseVal=="string"?n.className.baseVal:"",d=Q(n.textContent,60);return!!(Se.test(r)||Se.test(a)||Se.test(s)||Se.test(i)||d.length>0&&d.length<=25&&Se.test(d))}function _(o){if(!o||typeof o.getAttribute!="function"||typeof Element<"u"&&!(o instanceof Element)||ue(o)||F(o)||o.closest?.('.option-card, .choice-card, .quiz-option, [class*="option-card" i], [class*="choice-card" i], [class*="option-item" i], [class*="choice-item" i], [class*="answer-item" i], [data-testid*="option" i], [data-testid*="choice" i], [data-choice], [data-option], [data-answer], [role="radio"], [role="checkbox"], [role="option"]')||o.closest?.("header, nav, aside"))return!1;let e=typeof HTMLInputElement<"u"&&o instanceof HTMLInputElement||typeof HTMLButtonElement<"u"&&o instanceof HTMLButtonElement?o.value:"",t=Q(o.getAttribute?.("aria-label")||o.textContent||o.getAttribute?.("value")||e),n=o.type,r=t.replace(/[\d\(\)\[\]\u2192>\u2022\-\/\\]+/g," ").trim(),a=String(o.getAttribute?.("data-testid")||o.getAttribute?.("data-test-id")||o.getAttribute?.("id")||o.getAttribute?.("href")||"").toLowerCase();return le.test(r)||le.test(t)?!1:Me.test(r)||Me.test(t)||a.includes("next")||a.includes("check")||a.includes("continue")||a.includes("proximo")||a.includes("forward")?!0:/^\d{1,3}$/.test(t.trim())?!!o.closest?.('[class*="pagination" i], [class*="pager" i], [class*="page-nav" i], [class*="step-indicator" i], [class*="breadcrumb" i], [aria-label*="p\xE1gina" i], [aria-label*="page" i], [role="navigation"], nav, [class*="steps" i]'):!1}function ct(o){let e=o.closest("tr");if(e){let d=e.querySelector("th, td:first-child"),l=d&&d!==o.closest("td")?Q(d.textContent,100):"",u=Q(o.closest("label, td")?.textContent||"",50);if(l&&u)return`${l}: ${u}`}let t=o.closest('.dropdown-row, [class*="dropdown-row" i], [class*="select-row" i]');if(t){let d=t.querySelector('.dropdown-label, [class*="label" i]'),l=d&&d!==o?Q(d.textContent,150):"";if(l)return l}let n=o.getAttribute("aria-label");if(n)return Q(n);let r=o.getAttribute("aria-labelledby");if(r){let d=r.split(/\s+/).map(l=>document.getElementById(l)?.textContent).filter(Boolean).join(" ");if(d.trim())return Q(d)}if("labels"in o&&o.labels){let d=Array.from(o.labels??[]).map(l=>l.textContent).join(" ");if(d.trim())return Q(d)}let a=o.closest('.docssharedWizToggleLabeledContainer, [role="listitem"], .answer, label, .quiz-option, .form-check, .option-card');if(a&&a!==o){let d=Q(a.textContent);if(d)return d}let s=o instanceof HTMLInputElement||o instanceof HTMLButtonElement?o.value:"",i=o.getAttribute("placeholder")||o.getAttribute("title")||o.textContent||s||"";return Q(i)}function dt(o,e){let n=typeof HTMLSelectElement<"u"&&o instanceof HTMLSelectElement||o.tagName.toLowerCase()==="select"?o:null,r=o;o.dataset.easyquizRole=e;let a=o.tagName.toLowerCase(),s=["input","textarea","select","button"].includes(a)?a:"other",i=o.getAttribute("role")||"",d=(o.getAttribute("data-testid")||o.getAttribute("data-test-id")||"").toLowerCase(),l=(o.className&&typeof o.className=="string"?o.className:"").toLowerCase(),u=o.getAttribute("draggable")==="true"||o.classList.contains("perseus-drag-item")||o.classList.contains("sortable-item")||l.includes("cursor-grab")||!!o.getAttribute("aria-grabbed")||/drag|card|option|item/i.test(d)||/drag|card-item|sortable/i.test(l),f=o.getAttribute("data-role")==="dropzone"||o.classList.contains("category-container")||o.hasAttribute("data-category")||!!o.getAttribute("aria-dropeffect")||/drop|category|bucket/i.test(d)||/dropzone|category-box|bucket|target-zone/i.test(l),m=Q((u?"draggable":f?"dropzone":"")||r.type||i||s,40),p="";if(r.type==="checkbox"||r.type==="radio"||i==="radio"||i==="checkbox"){let C=r.checked||o.getAttribute("aria-checked")==="true",q=r.value&&r.value!=="on"?r.value:o.getAttribute("data-value")||"";p=C?q?`checked:${q}`:"checked":q||"unchecked"}else if(s==="button"||a==="a"||e==="navigation"||_(o))p="";else{let C=typeof o.value=="string"||typeof o.value=="number"?o.value:"";p=Q(C||o.getAttribute("data-category")||"",2e3)}let h=[];if(n&&n.options)for(let C of Array.from(n.options).slice(0,80))h.push({value:Q(C.value),label:Q(C.textContent)});else if(i==="combobox"||i==="listbox"||l.includes("select")||l.includes("dropdown")){let C=o.getAttribute("aria-controls")||o.getAttribute("aria-owns"),q=C?document.getElementById(C):o;if(q){let x=q.querySelectorAll('[role="option"], li, .dropdown-item, .option');for(let E of Array.from(x).slice(0,80)){let k=Q(E.textContent);k&&h.push({value:E.getAttribute("data-value")||E.getAttribute("value")||k,label:k})}}}let b=!!(r.required||o.getAttribute("aria-required")==="true"),A=!!(r.disabled||o.getAttribute("aria-disabled")==="true"),v=vo(o);return{id:o.id||v,tag:s,type:m,label:ct(o),name:Q(r.name||o.getAttribute("name")||"",180),value:p,options:h,required:b,disabled:A,role:e}}var Nt=['[data-test-id*="exercise" i]','[data-testid*="exercise" i]',".perseus-renderer",".framework-perseus",".Qr7Oae","[data-item-id]",".freebirdFormviewerViewItemsItemItem",".que",".question-holder",".quiz-question",".question_holder",".display_question",'[data-functional-selector*="question"]',".question-container",'[class*="classification-layout" i]','[class*="quiz-container" i]','[data-cy="quiz-container"]',"[data-question-id]",'[data-testid*="question" i]','[class*="question-container" i]','[class*="question" i]','[class*="pergunta" i]','[class*="categoriz" i]',"article","form","section","main"].join(",");function Rt(o){if(!z(o))return-1/0;let e=o.getBoundingClientRect(),t=Array.from(o.querySelectorAll(Ee)).filter(z),n=Q(o.innerText||o.textContent||"",4e3).length;if(n<10||!t.length&&n<60)return-1/0;let r=Math.max(1,window.innerWidth*window.innerHeight),a=Math.max(1,e.width*e.height),s=Math.min(1,a/r),i=e.top+e.height/2,d=Math.abs(i-window.innerHeight/2)/Math.max(1,window.innerHeight),l=n>40?35:0,u=e.top>=0&&e.bottom<=window.innerHeight?25:0;return t.length*15+Math.min(60,n/20)+l+u-s*20-d*10}function Ve(o){let e=o;if(e.matches?.('article, [data-test-id*="exercise" i], [data-testid*="exercise" i], .perseus-renderer, .framework-perseus, [class*="question-container" i], .que')&&e.tagName.toLowerCase()!=="main"&&e.tagName.toLowerCase()!=="body")return e;for(;e.parentElement&&e.parentElement!==document.body&&e.parentElement!==document.documentElement;){let t=e.parentElement,n=t.tagName.toLowerCase();if(["header","footer","nav","aside"].includes(n))break;if(t.matches?.('article, [data-test-id*="exercise" i], [data-testid*="exercise" i], .perseus-renderer, .framework-perseus, [class*="question-container" i], .que')&&n!=="main"&&n!=="body"){e=t;break}let r=Q(e.innerText||e.textContent||"",1e4),a=Q(t.innerText||t.textContent||"",1e4),s=e.querySelectorAll(Ee).length,i=t.querySelectorAll(Ee).length;if(r.length<150&&a.length>r.length&&i<=s+4&&n!=="main"&&n!=="body"){e=t;continue}break}return e}function Qt(o){let e=o,t=e.closest('main, [role="main"], article, form, [data-test-id*="exercise" i], [data-testid*="exercise" i], .framework-perseus, section');if(t&&t!==document.body&&z(t))return t;let n=0;for(;e.parentElement&&e.parentElement!==document.body&&n<3;)e=e.parentElement,n++;return e||document.body}function W(){let o=document.querySelector('[class*="classification-layout" i], [class*="quiz-container" i][class*="classification" i]');if(o&&z(o))return o;let e=document.activeElement;if(e&&e!==document.body){let s=e.closest(Nt);if(s&&Rt(s)>0)return Ve(s)}let n=Array.from(document.querySelectorAll(Nt)).map(s=>({element:s,score:Rt(s)})).filter(s=>Number.isFinite(s.score)).sort((s,i)=>i.score-s.score),r=n.find(s=>{let i=s.element.tagName.toLowerCase();return i!=="main"&&i!=="body"&&s.score>0});if(r)return Ve(r.element);if(n.length>0&&n[0].score>0)return Ve(n[0].element);let a=document.querySelector('form, main, [role="main"]');return a&&z(a)?a:document.body}function jt(o){let e=o.cloneNode(!0);e.querySelectorAll("script, style, iframe, object, embed, svg, canvas, noscript, audio, video").forEach(n=>n.remove());let t=["type","name","value","role","aria-label","aria-labelledby","aria-checked","aria-required","required","disabled","data-easyquiz-id","draggable","class","id","data-widget-type","data-role","data-category","data-testid"];return e.querySelectorAll("*").forEach(n=>{for(let r of Array.from(n.attributes))t.includes(r.name)||n.removeAttribute(r.name)}),e.outerHTML.replace(/\s+/g," ").slice(0,2e4)}function Fe(o){let e=Array.from(o.querySelectorAll(Ee)),t=new Set,n=[];for(let l of e){if(!z(l)||_(l)||F(l))continue;let u=(l.value||l.textContent||"").trim();if(le.test(u))continue;let f=l.tagName.toLowerCase();["input","textarea","select"].includes(f)&&(t.add(l),n.push(l))}for(let l of e){if(!z(l)||_(l)||F(l))continue;let u=(l.value||l.textContent||"").trim();if(le.test(u))continue;let f=l.tagName.toLowerCase();if(["input","textarea","select"].includes(f))continue;let c=l.querySelector("input, textarea, select");if(!(c&&t.has(c))){if(l.hasAttribute("for")){let m=l.getAttribute("for"),p=m?l.ownerDocument.getElementById(m):null;if(p&&t.has(p))continue}if(f==="a"){let m=l.getAttribute("role"),p=l.getAttribute("class")||"",h=l.getAttribute("data-testid")||"",b=l.getAttribute("draggable")==="true"||l.classList.contains("perseus-drag-item")||l.classList.contains("sortable-item")||p.includes("cursor-grab")||!!l.getAttribute("aria-grabbed")||/drag|card|option|item/i.test(h)||/drag|card-item|sortable/i.test(p);if(!(m==="button"||m==="radio"||m==="checkbox"||m==="option"||b||l.closest('[class*="choice" i], [class*="option" i], [class*="answer" i], [data-testid*="option" i]')))continue}n.push(l)}}let r=n.length>0&&n.every(l=>F(l)||/read-?aloud|audio/i.test(l.getAttribute("data-testid")||l.getAttribute("aria-label")||"")),a=document.body.querySelector('[class*="classification-layout" i]')||document.body.querySelector('[class*="classification" i]')||o,s=document.body.querySelector('[class*="classification" i]')!==null||o.querySelector('[class*="classification" i]')!==null||o.querySelector('[data-cy*="quiz" i]')!==null||o.querySelector('[class*="draggable-item" i]')!==null||o.querySelector('[class*="drag-item" i]')!==null||o.querySelector('[class*="sortable-card" i]')!==null||o.matches?.('[class*="classification" i]');if((n.length===0||r)&&s){r&&(n.length=0);let l=Array.from(a.querySelectorAll('[class*="cursor-grab"][id], [draggable="true"][id], .dnd-card[id]'));if(l.length>0){for(let u of l)if(!(!z(u)||F(u))&&(n.push(u),n.length>=50))break}else{let u=Array.from(a.querySelectorAll("button, div[class], span[class], p, li"));for(let f of u){if(!z(f)||_(f)||F(f)||le.test((f.textContent||"").trim()))continue;let c=(f.textContent||"").trim();if(c.length<2||c.length>300)continue;if(Array.from(f.children).some(p=>p.className&&p.textContent?.trim())||n.push(f),n.length>=50)break}}}let d=!n.some(l=>["input","select","textarea"].includes(l.tagName.toLowerCase()))&&n.length>0&&n.every(l=>{let u=l.tagName.toLowerCase();if(["input","select","textarea","button"].includes(u))return!1;let f=(l.textContent||"").trim();return!l.id||f.length<10||/^\d+\s*\/\s*\d+$/.test(f)||/^question text/i.test(f)});if(n.length===0||d){d&&(n.length=0);let l=Array.from(document.body.querySelectorAll('[class*="cursor-pointer"][id]'));if(l.length>0)for(let u of l){if(!z(u)||ue(u)||_(u)||F(u)||le.test((u.textContent||"").trim()))continue;let f=(u.textContent||"").trim();if(!(f.length<10||f.length>500)&&!/^\d+\s*\/\s*\d+$/.test(f)&&(n.push(u),n.length>=20))break}}return n.slice(0,100).map(l=>dt(l,"answer"))}function ut(o){let e=[o,o.parentElement,o.parentElement?.parentElement,document.body].filter(Boolean),t=new Set,n=[];for(let r of e)for(let a of Array.from(r.querySelectorAll(Ee)))if(!(t.has(a)||!z(a)||!_(a)||F(a))&&(t.add(a),n.push(dt(a,"navigation")),n.length>=10))return n;return n}function pe(o=!1){let e=W();e=Ve(e),o&&(e=Qt(e));let t=Fe(e),n=ut(e);if(t.length===0){let i=Fe(document.body);i.length>0&&(e=Qt(e),t=Fe(e),t.length===0&&(t=i,e=document.querySelector('main, article, form, [role="main"]')||document.body))}n.length===0&&(n=ut(document.body));let r=e.innerText&&e.innerText.trim().length>0?e.innerText:e.textContent||"",a=r.length>4e4?Q(r.slice(0,8e3),8e3)+`
[...conte\xFAdo extenso truncado...]
`+Q(r.slice(-2e3),2e3):Q(r,16e3),s=[...t,...n].slice(0,120);return!a||s.length===0&&a.length<30?Q(document.body.innerText||document.body.textContent||"",16e3).length>=30?ce():null:{sourceUrl:window.location.href.slice(0,2e3),pageTitle:document.title.slice(0,500)||"P\xE1gina de Quest\xE3o",questionText:a,htmlSnippet:jt(e),controls:s,scope:e}}function ce(){let o=document.body.innerText||document.body.textContent||document.documentElement.textContent||"",e=Q(o,16e3),t=Fe(document.body),n=ut(document.body),r=[...t,...n].slice(0,120),a=document.querySelector('main, article, form, [role="main"], [data-test-id*="content" i], [class*="content" i]')||document.body;return{sourceUrl:window.location.href.slice(0,2e3),pageTitle:document.title.slice(0,500)||"P\xE1gina de Quest\xE3o",questionText:e,htmlSnippet:jt(a).slice(0,15e3),controls:r,scope:a}}function pt(o){let e=o.controls.map(t=>{let n=t.options?t.options.length:0;return`${t.role}:${t.id}:${t.type}:${n}`}).join("|");return[window.location.href,o.pageTitle,o.questionText.slice(0,400),e].join("::")}function Ue(o){if(!o)return!1;let e=o.toLowerCase();return["?","quest\xE3o","questao","pergunta","exerc\xEDcio","exercicio","assinale","calcule","determine","qual \xE9","qual o","quais","indique","selecione","escolha","responda","julgue","verdadeiro ou falso","complete","resolva","encontre","alternativa","correta","incorreta","m\xB3","cm\xB2","volume","probabilidade","matriz","valor de","resultado de","considere","dada a","sabendo que","quanto vale","obtenha"].some(n=>e.includes(n))}function B(o){return o?!!(o.closest('#easyquiz-shadow-root, .eq-sidebar, .eq-launcher, [data-easyquiz-ignore="true"], .btn-inject-eq, #btn-inject-script')||o.getAttribute?.("data-easyquiz-ignore")==="true"):!1}function L(o){return o==null?"":(typeof o=="string"?o:String(o)).replace(/^(\([0-9a-zA-Z]{1,2}\)|[0-9]{1,3}|[a-zA-Z])[\.\)\-\:]\s+/,"").replace(/[\.\u2026]{2,}/g," ").replace(/['"“”«»]/g,"").replace(/\s+/g," ").trim()}function G(o){if(!o||o instanceof HTMLInputElement||o instanceof HTMLSelectElement||o instanceof HTMLTextAreaElement||o.getAttribute("draggable")==="true"||o.classList.contains("dnd-card")||o.hasAttribute("data-category")||o.hasAttribute("data-dropzone"))return o;if(o.hasAttribute("for")){let n=o.getAttribute("for");if(n){let r=o.ownerDocument.getElementById(n);if(r)return r}}let e=o.closest('label, .option-card, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, td, li, .dnd-card, [class*="option-card" i], [class*="choice-card" i], .dropdown-row, [class*="dropdown" i], [class*="select-row" i]');if(e&&!["article","section","main","form","body"].includes(e.tagName.toLowerCase())){let n=e.getAttribute("for"),a=(n?e.ownerDocument.getElementById(n):null)||e.querySelector('input:not([type="hidden"]), select, textarea');return a||e}let t=o.closest('button, a, [role="button"], [draggable="true"]');if(t)return t;if(["body","html","main","section","article","form"].includes(o.tagName.toLowerCase())){let n=o.querySelector('button, [role="button"], a, input:not([type="hidden"]), select, textarea, [role="radio"], [role="checkbox"], .option-card, label');if(n)return G(n)}return o}function Vt(o){let e=o;if(!e||!document.contains(e))try{e=W()}catch{}e=e||document.body;let t=r=>{let a=Array.from(r.querySelectorAll("tr")).filter(u=>z(u)&&u.querySelector('input[type="radio"], input[type="checkbox"]'));if(a.length>1)return a;let s=Array.from(r.querySelectorAll('input[type="checkbox"], input[type="radio"], [role="checkbox"], [role="radio"]')).filter(u=>z(u)&&!B(u));if(s.length>0)return s;let d=Array.from(r.querySelectorAll('.option-card, [role="option"], [class*="choice-card" i], [class*="option-card" i], li[class*="choice" i], li[class*="option" i]')).filter(u=>z(u)&&!B(u)).filter(u=>!u.parentElement?.closest('.option-card, [role="option"], [class*="choice-card" i], [class*="option-card" i]'));return d.length>0?d:Array.from(r.querySelectorAll('[class*="classification" i] [class], [class*="draggable-item" i], [class*="drag-item" i], [class*="sortable-card" i]')).filter(u=>{let f=u;return z(f)&&!B(f)&&(f.textContent||"").trim().length>2&&!_(f)&&!F(f)&&!f.querySelector("[class]")})},n=t(e);return n.length>0?n:e!==document.body?t(document.body):[]}function P(o,e,t=!1){if(o==null)return null;let r=(typeof o=="string"?o:String(o)).trim().replace(/^["'“”«»]+|["'“”«»]+$/g,"");if(!r)return null;let a=V(r),s=document.querySelector(`[data-easyquiz-id="${a}"]`);if(s&&!B(s))return G(s);try{let c=document.getElementById(r);if(c&&z(c)&&!B(c))return c.hasAttribute("data-category")||c.hasAttribute("data-dropzone")||c.classList.contains("dnd-zone")?c:G(c)}catch{}try{let c=document.querySelector(`[data-item-id="${a}"]`);if(c&&z(c)&&!B(c))return G(c)}catch{}let i=r.match(/^(?:item|opção|opcao|afirmação|afirmacao|alternativa|linha|afirmativa|questão|questao|campo|blank|lacuna|input|resposta)?\s*#?_?([0-9]+)$/i);if(i){let c=parseInt(i[1],10);if(t){let p=document.body;try{p=W()||document.body}catch{}let h=Array.from(p.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, select, [contenteditable="true"]')).filter(b=>z(b)&&!B(b));if(c>=1&&c-1<h.length)return h[c-1];if(c===0&&h.length>0)return h[0]}let m=c-1;if(m>=0){let p=Vt();if(m<p.length){let A=p[m];if(A.tagName.toLowerCase()==="tr"){if(e){let y=A.querySelector(`input[value="${V(e)}" i], [data-value="${V(e)}" i]`);if(y)return y}let v=A.querySelector("input");if(v)return v}return G(A)}let h=document.body;try{h=W()||document.body}catch{}let b=Array.from(h.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, select, [contenteditable="true"]')).filter(A=>z(A)&&!B(A));if(m<b.length)return b[m]}}let d=r.match(/^(?:item|opção|opcao|afirmação|afirmacao|alternativa|linha|afirmativa|questão|questao)?\s*#?([a-eA-E])$/i);if(d){let c=d[1].toUpperCase(),m=c.charCodeAt(0)-65,p=Array.from(document.querySelectorAll(`input[type="radio"][value="${c}" i], input[type="checkbox"][value="${c}" i]`)).find(b=>z(b)&&!B(b));if(p)return G(p);let h=Array.from(document.querySelectorAll('.option-card, .choice, .answer, label, [role="radio"], [role="checkbox"]')).find(b=>{if(!z(b)||B(b))return!1;let v=(b.querySelector('.option-badge, .badge, [class*="badge" i], [class*="letter" i]')?.textContent||"").trim().toUpperCase();if(v===c||v===`${c})`||v===`(${c})`||v===`${c}.`||v===`${c}:`)return!0;let y=(b.textContent||"").trim().toUpperCase();return y.startsWith(`${c})`)||y.startsWith(`(${c})`)||y.startsWith(`${c}.`)||y.startsWith(`${c}:`)});if(h)return G(h);if(m>=0){let b=Vt();if(m<b.length){let A=b[m];if(A.tagName.toLowerCase()==="tr"){if(e){let y=A.querySelector(`input[value="${V(e)}" i], [data-value="${V(e)}" i]`);if(y)return y}let v=A.querySelector("input");if(v)return v}return G(A)}}}if(/^[a-zA-Z0-9_-]{1,10}$/.test(r)){let m=Array.from(document.querySelectorAll(`[data-category="${a}" i], [data-dropzone="${a}" i], [data-role="dropzone"][data-category="${a}" i]`)).find(A=>z(A)&&!B(A));if(m)return m;let h=Array.from(document.querySelectorAll(`input[value="${a}" i], [data-value="${a}" i], input[id="${a}" i], input[placeholder="${a}" i], textarea[placeholder="${a}" i], [title="${a}" i]`)).find(A=>z(A)&&!B(A));if(h)return G(h);let b=Array.from(document.querySelectorAll('.option-badge, [class*="badge" i], [class*="letter" i], .option-card span, label span')).find(A=>{if(!z(A)||B(A))return!1;let v=L(A.textContent).toLowerCase();return v===r.toLowerCase()||v===r.toLowerCase()+")"});if(b)return G(b)}try{let c=Array.from(document.querySelectorAll(`[name="${a}"], [value="${a}"], [placeholder="${a}" i], [title="${a}" i], [data-category="${a}" i], [data-dropzone="${a}" i], [data-testid="${a}" i], [data-test-id="${a}" i], [aria-label="${a}" i]`));if(e){let p=c.find(h=>{if(!z(h)||B(h))return!1;if(h instanceof HTMLInputElement&&h.value.toLowerCase()===e.toLowerCase())return!0;let b=h.closest("label, .vf-label, td, div");return b&&L(b.textContent).toLowerCase().includes(L(e).toLowerCase())});if(p)return G(p)}let m=c.find(p=>z(p)&&!B(p));if(m)return m.hasAttribute("data-category")||m.hasAttribute("data-dropzone")||m.classList.contains("dnd-zone")?m:G(m)}catch{}if(/^[.#\[]|\s|[>+~:]/.test(r))try{let m=Array.from(document.querySelectorAll(r)).find(p=>z(p)&&!B(p));if(m)return G(m)}catch{}try{let c=r.replace(/"/g,""),m=`//button[normalize-space(.)="${c}"] | //a[normalize-space(.)="${c}"] | //*[not(*) and normalize-space(.)="${c}"] | //*[@aria-label="${c}"] | //*[@data-category="${c}"] | //*[@data-testid="${c}"]`,p=document.evaluate(m,document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);for(let h=0;h<p.snapshotLength;h++){let b=p.snapshotItem(h);if(b&&z(b)&&!B(b)){if(["body","html"].includes(b.tagName.toLowerCase())){let v=b.querySelector('button, [role="button"], a, input, [role="radio"], [role="checkbox"], label');if(v&&z(v))return G(v)}return b.closest('[data-role="dropzone"], [class*="category" i], [class*="bucket" i], [class*="column" i], [class*="drop" i]')||G(b)}}}catch{}let u=L(r).toLowerCase(),f=Array.from(document.querySelectorAll('button, a, div, span, li, p, label, input, textarea, select, [draggable="true"], [data-testid], [class*="option" i], [class*="card" i], [class*="item" i], [class*="choice" i], [class*="category" i], [class*="bucket" i]'));for(let c of f){if(!z(c)||B(c)||c.closest("header, nav, .stepper, .step-item, .progress-bar-container")||F(c)||!!(c.matches('article, section, form, main, [class*="container" i], [class*="grid" i], .dnd-pool, .dnd-zones')||c.querySelector('label, [role="radio"], [role="checkbox"], .dnd-card, [draggable="true"], .option-card, tr'))&&!c.matches(".dnd-zone, [data-category], [data-dropzone]"))continue;let p=L(c.textContent).toLowerCase(),h=L(c.getAttribute("aria-label")||"").toLowerCase(),b=L(c.getAttribute("placeholder")||"").toLowerCase(),A=L(c.getAttribute("title")||"").toLowerCase(),v=L(c.getAttribute("name")||"").toLowerCase(),y=L(c.getAttribute("data-category")||"").toLowerCase(),C=c instanceof HTMLInputElement||c instanceof HTMLButtonElement?c.value:"",q=L(C).toLowerCase(),x=p.startsWith(u+")")||p.startsWith(u+".")||p.startsWith(u+" -")||p.startsWith(u+":");if(p===u||h===u||b===u||A===u||v===u||y&&y===u||q&&q===u||x)return c.closest('[data-role="dropzone"], [class*="category" i], [class*="bucket" i], [class*="column" i], [class*="drop" i]')||G(c)}if(u.length>=3)for(let c of f){if(!z(c)||B(c)||c.closest("header, nav, .stepper, .step-item, .progress-bar-container")||F(c)||!!(c.matches('article, section, form, main, [class*="container" i], [class*="grid" i], .dnd-pool, .dnd-zones')||c.querySelector('label, [role="radio"], [role="checkbox"], .dnd-card, [draggable="true"], .option-card, tr'))&&!c.matches(".dnd-zone, [data-category], [data-dropzone]"))continue;let p=L(c.textContent).toLowerCase(),h=L(c.getAttribute("aria-label")||"").toLowerCase(),b=L(c.getAttribute("placeholder")||"").toLowerCase(),A=L(c.getAttribute("title")||"").toLowerCase(),v=L(c.getAttribute("name")||"").toLowerCase();if(p.includes(u)||h.includes(u)||b.includes(u)||A.includes(u)||v.includes(u)){if(Array.from(c.children).some(x=>{let E=L(x.textContent).toLowerCase();return E&&E.includes(u)}))continue;return c.closest('[data-role="dropzone"], [class*="category" i], [class*="bucket" i], [class*="column" i], [class*="drop" i]')||G(c)}let y=u.split(/\s+/).filter(Boolean);if(y.length>=3){let C=y.slice(0,Math.min(5,y.length)).join(" ");if(p.includes(C)||h.includes(C)||b.includes(C))return G(c)}}return null}function Ft(o,e){for(let t of e)o.dispatchEvent(new Event(t,{bubbles:!0,composed:!0}))}function ae(o,e){if(!o)return;try{o.scrollIntoView({block:"nearest",inline:"nearest",behavior:"instant"})}catch{}try{o.focus?.()}catch{}let t=o.getBoundingClientRect(),n=e?e[0]:Math.round(t.left+Math.max(1,t.width/2)),r=e?e[1]:Math.round(t.top+Math.max(1,t.height/2)),a={bubbles:!0,cancelable:!0,composed:!0,view:window,clientX:n,clientY:r};try{o.dispatchEvent(new PointerEvent("pointerover",{...a}))}catch{}try{o.dispatchEvent(new MouseEvent("mouseover",{...a}))}catch{}try{o.dispatchEvent(new PointerEvent("pointerdown",{...a,button:0,buttons:1}))}catch{}try{o.dispatchEvent(new MouseEvent("mousedown",{...a,button:0,buttons:1}))}catch{}try{o.dispatchEvent(new PointerEvent("pointerup",{...a,button:0,buttons:0}))}catch{}try{o.dispatchEvent(new MouseEvent("mouseup",{...a,button:0,buttons:0}))}catch{}if(typeof o.click=="function")try{o.click()}catch{try{o.dispatchEvent(new MouseEvent("click",{...a,button:0,buttons:0}))}catch{}}else try{o.dispatchEvent(new MouseEvent("click",{...a,button:0,buttons:0}))}catch{}try{let s=Object.keys(o).find(i=>i.startsWith("__reactFiber")||i.startsWith("__reactInternalInstance"));if(s){let i=o[s];for(;i;){let d=i.memoizedProps||i.pendingProps;if(d?.onClick){d.onClick({type:"click",target:o,currentTarget:o,bubbles:!0,cancelable:!0,preventDefault:()=>{},stopPropagation:()=>{}});break}i=i.return}}}catch{}try{let s=Object.keys(o).find(i=>i.startsWith("__reactProps"));if(s){let i=o[s];i?.onClick&&i.onClick({type:"click",target:o,currentTarget:o,bubbles:!0,cancelable:!0,preventDefault:()=>{},stopPropagation:()=>{}})}}catch{}try{let s=o._vei;s?.onClick&&(Array.isArray(s.onClick.value)?s.onClick.value:[s.onClick.value]).forEach(d=>{try{d({type:"click",target:o})}catch{}})}catch{}try{o.$onclick&&o.$onclick({type:"click",target:o,preventDefault:()=>{},stopPropagation:()=>{}})}catch{}try{if(!!(document.querySelector('meta[content*="google.com/forms"], form[action*="formResponse"]')||o.closest("[data-item-id], [jsmodel], [jsaction], .freebirdFormviewerComponentsQuestionBaseRoot"))){let i=o.querySelector('input[type="radio"], input[type="checkbox"]');i&&(i.focus?.(),i.click(),Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"checked")?.set?.call(i,!0),i.dispatchEvent(new Event("change",{bubbles:!0})));let d=o.closest("[jsaction]");if(d&&d!==o)try{d.dispatchEvent(new MouseEvent("click",{bubbles:!0,cancelable:!0,view:window,clientX:n,clientY:r}))}catch{}}}catch{}if(o.getAttribute("role")==="button"||o.getAttribute("tabindex")!==null)try{o.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0,cancelable:!0})),o.dispatchEvent(new KeyboardEvent("keyup",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0,cancelable:!0}))}catch{}}function gt(o){try{let e=o.id,t=!!e;e||(e=`__eq_tmp_${Math.random().toString(36).slice(2,8)}`,o.id=e);let n=document.createElement("script");return n.textContent=`(function(){var el=document.getElementById(${JSON.stringify(e)});if(el){el.dispatchEvent(new MouseEvent('click',{bubbles:true,cancelable:true,composed:true,view:window}));if(typeof el.click==='function')el.click();var fk=Object.keys(el).find(function(k){return k.startsWith('__reactFiber')||k.startsWith('__reactInternalInstance');});if(fk){var fb=el[fk];while(fb){var mp=fb.memoizedProps||fb.pendingProps;if(mp&&typeof mp.onClick==='function'){try{mp.onClick({type:'click',target:el,currentTarget:el,bubbles:true,cancelable:true,preventDefault:function(){},stopPropagation:function(){}});}catch(e){}break;}fb=fb.return;}}var pk=Object.keys(el).find(function(k){return k.startsWith('__reactProps');});if(pk&&el[pk]&&typeof el[pk].onClick==='function'){try{el[pk].onClick({type:'click',target:el,currentTarget:el,bubbles:true,cancelable:true,preventDefault:function(){},stopPropagation:function(){}});}catch(e){}}if(el._vei&&el._vei.onClick){var h=el._vei.onClick.value;var hs=Array.isArray(h)?h:[h];hs.forEach(function(fn){try{fn({type:'click',target:el});}catch(e){}});}}})()`,document.head.appendChild(n),n.remove(),t||setTimeout(()=>{try{o.id===e&&o.removeAttribute("id")}catch{}},0),!0}catch{return!1}}function Xe(o,e){let t=o;if(t.hasAttribute("for")){let l=t.getAttribute("for"),u=t.ownerDocument.getElementById(l);u&&(t=u)}if(typeof HTMLSelectElement<"u"&&t instanceof HTMLSelectElement||t.tagName?.toLowerCase()==="select"||t.getAttribute("role")==="combobox"||t.getAttribute("role")==="listbox"||t.matches?.('[role="combobox"], [role="listbox"], [class*="select" i], [class*="dropdown" i]')){Ge(t,[e]);return}let r=t.querySelector('select, [role="combobox"], [role="listbox"]');if(r){Ge(r,[e]);return}if(!(t instanceof HTMLInputElement)&&!(t instanceof HTMLTextAreaElement)&&!(t instanceof HTMLSelectElement)&&!t.isContentEditable){let l=t.querySelector('input:not([type="hidden"]), textarea, select, [contenteditable="true"]');if(l)t=l;else{let f=t.closest('.form-group, .field, [class*="input" i], [class*="control" i], label, tr, td, li, p, div')?.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, select, [contenteditable="true"]');if(f)t=f;else{let c=t.nextElementSibling;for(;c;){if(c instanceof HTMLInputElement&&!["hidden","button","submit","checkbox","radio"].includes(c.type)||c instanceof HTMLTextAreaElement||c instanceof HTMLElement&&c.isContentEditable){t=c;break}let m=c.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(m){t=m;break}c=c.nextElementSibling}}}}if(t instanceof HTMLButtonElement||t.tagName.toLowerCase()==="a"||t.getAttribute("role")==="button"||t instanceof HTMLInputElement&&["button","submit","reset","image"].includes(t.type)){let l=t.parentElement?.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(l)t=l;else{let u=document.body;try{u=W()||document.body}catch{}let f=u.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(f)t=f;else{console.warn("[EasyQuiz] setNativeValue: Nenhum campo de texto encontrado para receber o valor.");return}}}if(!(t instanceof HTMLInputElement)&&!(t instanceof HTMLTextAreaElement)&&!(t instanceof HTMLSelectElement)&&!t.isContentEditable){let l=document.body;try{l=W()||document.body}catch{}let u=l.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(u)t=u;else{console.warn("[EasyQuiz] setNativeValue: Nenhum campo de texto encontrado para receber o valor.");return}}if(t instanceof HTMLInputElement&&["checkbox","radio"].includes(t.type)){let l=["true","1","checked","yes","sim"].includes(e.toLowerCase())||e===t.value;me(t,l);return}let s=String(e??""),i=s;if(t instanceof HTMLInputElement&&t.type==="number"){let l=s.replace(",",".").replace(/[^0-9.-]/g,"");l&&!isNaN(Number(l))&&(i=l)}try{t.scrollIntoView?.({block:"center",inline:"center",behavior:"instant"}),t.focus?.()}catch{}try{if(t instanceof HTMLInputElement||t instanceof HTMLTextAreaElement){let l=t instanceof HTMLTextAreaElement?HTMLTextAreaElement.prototype:HTMLInputElement.prototype,u=Object.getOwnPropertyDescriptor(l,"value")?.set;u?u.call(t,""):t.value="";try{t.select?.()}catch{}}else if(t.isContentEditable){t.textContent="";try{document.execCommand?.("selectAll",!1,void 0)}catch{}}}catch{}let d=!1;try{t instanceof HTMLInputElement||t instanceof HTMLTextAreaElement?t.type!=="number"&&t.type!=="range"&&(d=document.execCommand?.("insertText",!1,i)||!1):t.isContentEditable&&(d=document.execCommand?.("insertText",!1,i)||!1)}catch{}if(t instanceof HTMLInputElement||t instanceof HTMLTextAreaElement){try{let f=t._valueTracker;f&&f.setValue(i===""?" ":"")}catch{}let l=t instanceof HTMLTextAreaElement?HTMLTextAreaElement.prototype:HTMLInputElement.prototype,u=Object.getOwnPropertyDescriptor(l,"value")?.set;u?u.call(t,i):t.value=i;try{t.dispatchEvent(new KeyboardEvent("keydown",{bubbles:!0,cancelable:!0,key:i.slice(-1)||"a"}))}catch{}try{t.dispatchEvent(new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,composed:!0,data:i,inputType:"insertText"}))}catch{}try{t.dispatchEvent(new InputEvent("input",{bubbles:!0,cancelable:!0,composed:!0,data:i,inputType:"insertText"}))}catch{t.dispatchEvent(new Event("input",{bubbles:!0,cancelable:!0,composed:!0}))}try{t.dispatchEvent(new KeyboardEvent("keyup",{bubbles:!0,cancelable:!0,key:i.slice(-1)||"a"}))}catch{}try{t.dispatchEvent(new Event("change",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}try{t.dispatchEvent(new FocusEvent("blur",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}if(t.value!==i&&!(t instanceof HTMLInputElement&&t.type==="number"&&Number(t.value)===Number(i))){t.value=i;try{u?.call(t,i)}catch{}}return}if(t.isContentEditable){if(t.textContent?.trim()!==i.trim()){t.textContent=i;try{t.innerText=i}catch{}}try{t.dispatchEvent(new InputEvent("input",{bubbles:!0,cancelable:!0,composed:!0,data:i,inputType:"insertText"}))}catch{t.dispatchEvent(new Event("input",{bubbles:!0,cancelable:!0,composed:!0}))}try{t.dispatchEvent(new Event("change",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}try{t.dispatchEvent(new FocusEvent("blur",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}return}try{"value"in t&&(t.value=i),t.dispatchEvent(new Event("input",{bubbles:!0,cancelable:!0,composed:!0})),t.dispatchEvent(new Event("change",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}}function Ie(o,e=""){if(o==null)return e;let t=typeof o=="string"?o:String(o);if(!t)return e;let n=/^(eq-|#|\$|\.|input_|mat-|choice_|radio_|chk_)/i.test(t),r=L(t),a=P(t)||P(r);if(!a)return n?e:r||e;let s=a.closest('label, .option-card, [class*="choice" i], [class*="option" i], .quiz-option, tr, td, li');if(s){let f=L(s.textContent);if(f&&f.length>0&&f.length<150)return f}if(a.id){let f=document.querySelector(`label[for="${V(a.id)}"]`);if(f){let c=L(f.textContent);if(c&&c.length>0&&c.length<150)return c}}let i=a.getAttribute("aria-label");if(i)return L(i);let d=a.getAttribute("placeholder");if(d)return L(d);let l=L(a.textContent);if(l&&l.length>0&&l.length<120)return l;let u=a instanceof HTMLInputElement||a instanceof HTMLButtonElement?a.value:"";return u?L(u):n?e:r||e}function me(o,e){if(!o)return;let t=o.closest('label, td, .option-card, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, [class*="option" i], [class*="choice" i], li')||o,n=o instanceof HTMLInputElement&&["checkbox","radio"].includes(o.type)?o:t.querySelector('input[type="checkbox"], input[type="radio"]');!n&&t.hasAttribute("for")&&(n=t.ownerDocument.getElementById(t.getAttribute("for")));let r=o instanceof HTMLInputElement?o.closest("label")||(o.id?t.ownerDocument.getElementById(t.getAttribute("for")):null)||o:t&&z(t)?t:o;if(n){let a=n.type==="radio",s=n.type==="checkbox",i=!!n._valueTracker;if(n.checked===e){if(a&&e){t.setAttribute("aria-checked","true"),t.setAttribute("aria-selected","true"),t.classList.add("selected","active","checked");return}if(s){t.setAttribute("aria-checked",e?"true":"false"),t.setAttribute("aria-selected",e?"true":"false"),t.classList.toggle("selected",e),t.classList.toggle("active",e),t.classList.toggle("checked",e);return}}if(r&&r!==n&&ae(r),n.checked!==e)try{n.focus?.(),n.click()}catch{}if(n.checked!==e){try{let l=n._valueTracker;l&&l.setValue(!e)}catch{}try{Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"checked")?.set?.call(n,e)}catch{}n.checked=e,Ft(n,["input","change"])}t.setAttribute("aria-checked",e?"true":"false"),t.setAttribute("aria-selected",e?"true":"false"),t.classList.toggle("selected",e),t.classList.toggle("active",e),t.classList.toggle("checked",e)}else{if((t.getAttribute("aria-checked")==="true"||t.getAttribute("aria-selected")==="true"||t.getAttribute("data-selected")==="true"||t.getAttribute("data-checked")==="true"||t.classList.contains("selected")||t.classList.contains("active")||t.classList.contains("checked"))===e&&e)return;ae(r),t.setAttribute("aria-checked",e?"true":"false"),t.setAttribute("aria-selected",e?"true":"false"),t.classList.toggle("selected",e),t.classList.toggle("active",e),t.classList.toggle("checked",e)}}function Ge(o,e){let t=typeof HTMLSelectElement<"u"&&o instanceof HTMLSelectElement||o.tagName?.toLowerCase()==="select"?o:o.querySelector("select");if(t){let s=e.map(l=>L(l).toLowerCase()),i=!1,d=(l,u)=>{l.selected=!0,t.selectedIndex=u;try{t.value=l.value}catch{}try{Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype,"value")?.set?.call(t,l.value)}catch{}try{let f=t._valueTracker;f&&f.setValue(l.value)}catch{}i=!0};for(let l=0;l<t.options.length;l++){let u=t.options[l],f=u.value.toLowerCase(),c=L(u.textContent).toLowerCase();if(s.some(p=>p===f||p===c)){if(d(u,l),!t.multiple)break}else t.multiple||(u.selected=!1)}if(!i)for(let l of s){let u=l.match(/^(?:item|opção|opcao|alternativa|linha|escolha|campo)?\s*#?_?([0-9]+)$/i);if(u){let f=parseInt(u[1],10),m=t.options[0]?.value===""||t.options[0]?.disabled?f:f>=1?f-1:0;if(m>=0&&m<t.options.length&&(d(t.options[m],m),!t.multiple))break}}if(!i){for(let l of s)if(/^[a-z]$/i.test(l)){let u=l.toUpperCase().charCodeAt(0)-65,c=t.options[0]?.value===""||t.options[0]?.disabled?u+1:u;if(c>=0&&c<t.options.length&&(d(t.options[c],c),!t.multiple))break}}if(!i){let l=u=>u.normalize("NFD").replace(/[\u0300-\u036f]/g,"");for(let u=0;u<t.options.length;u++){let f=t.options[u],c=l(f.value.toLowerCase()),m=l(L(f.textContent).toLowerCase());if(s.some(h=>{let b=l(h);return c.includes(b)||m.includes(b)||b.length>2&&(b.includes(c)||b.includes(m))})&&(d(f,u),!t.multiple))break}}if(i){Ft(t,["focus","input","change","blur"]);return}}let n=o.matches?.('[role="combobox"], [role="listbox"], [class*="select" i], [class*="dropdown" i]')?o:o.closest('[role="combobox"], [role="listbox"], [class*="select" i], [class*="dropdown" i]');n&&ae(n);let r=e.map(s=>L(s).toLowerCase()),a=Array.from(document.querySelectorAll('[role="listbox"] [role="option"], [role="menu"] [role="menuitem"], .select-dropdown li, .dropdown-menu .dropdown-item, .ant-select-item-option, .MuiMenuItem-root, [class*="option-item"], li[data-value]')).filter(s=>z(s)&&!B(s));for(let s of r){let i=a.find(l=>{let u=L(l.textContent).toLowerCase(),f=L(l.getAttribute("data-value")||l.getAttribute("value")||"").toLowerCase();return u===s||f===s||u.includes(s)||s.length>2&&s.includes(u)});if(i){ae(i);let l=i.querySelector('input[type="radio"], input[type="checkbox"]');l&&me(l,!0);return}let d=P(s);if(d){ae(d);return}}}function Ao(o,e){try{let t=new DataTransfer;try{t.setData("text/plain",o)}catch{}try{t.setData("text/html",e)}catch{}return t}catch{return null}}function mt(o){try{o.click()}catch{let e=o.ownerDocument.defaultView||window;o.dispatchEvent(new e.MouseEvent("click",{bubbles:!0,cancelable:!0,composed:!0,view:e}))}}function yo(o,e,t){try{if(e.contains(o))return{success:!0,evidence:"origin is child of dest (DOM move confirmed)"};if(!document.body.contains(o))return{success:!0,evidence:"origin removed from DOM (consumed by framework)"};let n=e.children.length;if(t!==void 0&&n>t)return{success:!0,evidence:`dest child count increased: ${t} \u2192 ${n}`};if([o.getAttribute("data-placed")==="true",o.getAttribute("data-assigned")==="true",o.getAttribute("data-matched")==="true",o.getAttribute("aria-grabbed")==="false",/placed|dropped|assigned|matched|done|sorted|categorized/i.test(o.className||"")].some(Boolean))return{success:!0,evidence:"origin has placement indicator: class/attr"};let a=(o.textContent||"").trim().toLowerCase();return a.length>2&&Array.from(e.querySelectorAll("*")).some(d=>d!==e&&(d.textContent||"").trim().toLowerCase()===a)?{success:!0,evidence:"origin text found inside dest children (clone or DOM move)"}:e.getAttribute("data-count")&&parseInt(e.getAttribute("data-count")||"0")>0?{success:!0,evidence:"dest data-count > 0, categorization likely succeeded"}:o.getAttribute("aria-hidden")==="true"||o.style.display==="none"||o.style.visibility==="hidden"?{success:!0,evidence:"origin hidden after drop (framework confirmed placement)"}:{success:!1,evidence:"no DOM evidence of successful drag/categorization"}}catch{return{success:!1,evidence:"verification threw exception"}}}function ne(o,e){let t=L(o).toLowerCase();if(!t)return null;if(e==="source"){if(/^[0-9a-f]{10,}$/.test(o.trim())){let i=document.getElementById(o.trim());if(i&&z(i)&&!B(i))return i}let s=['[class*="cursor-grab"][id]',".dnd-card",'[draggable="true"]'];for(let i of s){let l=Array.from(document.querySelectorAll(i)).find(u=>{if(!z(u)||B(u))return!1;let f=L(`${u.id} ${u.textContent||""} ${u.getAttribute("data-id")||""}`).toLowerCase();return f===t||f.includes(t)||u.id===o.trim()});if(l)return l}return null}let n=["[data-dropzone]","[data-category]",'[data-role="dropzone"]','[class*="dropzone" i]','[class*="list-group" i]','[class*="classification-group" i]'].join(","),r=Array.from(document.querySelectorAll(n)),a=r.find(s=>[s.getAttribute("data-category"),s.getAttribute("data-dropzone")].some(i=>i?.trim().toLowerCase()===t));return a&&z(a)&&!B(a)?a:r.find(s=>{if(!z(s)||B(s)||/unclassified/i.test(s.className))return!1;let i=s.querySelector('.font-bold, h1, h2, h3, h4, [class*="header" i], [class*="title" i], [class*="label" i]'),d=L(i?.textContent||s.textContent||"").toLowerCase();return d.includes("op")&&(d.includes("es")||d.includes("\xF5es"))?!1:d===t||d.startsWith(t)||d.includes(t)})||null}async function Ke(o,e,t=1){try{o.scrollIntoView({block:"center",inline:"center",behavior:"instant"})}catch{}let n=o.getBoundingClientRect(),r=e.getBoundingClientRect(),a=Math.round(n.left+Math.max(1,n.width/2)),s=Math.round(n.top+Math.max(1,n.height/2)),i=Math.round(r.left+Math.max(1,r.width/2)),d=Math.round(r.top+Math.max(1,r.height/2)),l=L(e.textContent).toLowerCase();if(l){let h=Array.from(o.querySelectorAll('button, [role="button"], input[type="radio"], input[type="checkbox"], option, .btn, [class*="tag" i]')).find(b=>{let A=L(b.textContent).toLowerCase(),v=b instanceof HTMLInputElement||b instanceof HTMLOptionElement?L(b.value).toLowerCase():"";return A&&(l.includes(A)||A.includes(l))||v&&(l.includes(v)||v.includes(l))});h&&(ae(h),await new Promise(b=>setTimeout(b,120)))}mt(o),await new Promise(p=>setTimeout(p,140)),mt(e);let u=e.querySelector('[data-role="dropzone"], [class*="bucket" i], [class*="slot" i], [class*="drop" i], [class*="target" i], [class*="items" i], ul, ol');if(u&&u!==e&&mt(u),await new Promise(p=>setTimeout(p,100)),!e.contains(o)&&o.matches('.dnd-card, [draggable="true"]')&&e.matches('.dnd-zone, [data-dropzone], [data-role="dropzone"]')&&e.appendChild(o),e.contains(o)&&o.matches('.dnd-card, [draggable="true"]'))return;let f={bubbles:!0,cancelable:!0,composed:!0,view:window,clientX:a,clientY:s,screenX:a,screenY:s,button:0,buttons:1};try{o.dispatchEvent(new PointerEvent("pointerdown",{...f,isPrimary:!0,pointerId:1,pointerType:"mouse",pressure:.5}))}catch{}o.dispatchEvent(new MouseEvent("mousedown",f));let c=4;for(let p=1;p<=c;p++){let h=Math.round(a+(i-a)*(p/c)),b=Math.round(s+(d-s)*(p/c)),A={...f,clientX:h,clientY:b,screenX:h,screenY:b};try{o.dispatchEvent(new PointerEvent("pointermove",{...A,isPrimary:!0,pointerId:1,pointerType:"mouse",pressure:.5}))}catch{}document.dispatchEvent(new MouseEvent("mousemove",A))}let m={bubbles:!0,cancelable:!0,composed:!0,view:window,clientX:i,clientY:d,screenX:i,screenY:d,button:0,buttons:0};try{e.dispatchEvent(new PointerEvent("pointerup",{...m,isPrimary:!0,pointerId:1,pointerType:"mouse",pressure:0}))}catch{}e.dispatchEvent(new MouseEvent("mouseup",m)),e.dispatchEvent(new MouseEvent("click",m));try{let p=Ao(Q(o.textContent),o.outerHTML),h={...f},b={...m};p&&(h.dataTransfer=p,b.dataTransfer=p);let A=o.ownerDocument.defaultView?.DragEvent;if(!A)throw new Error("DragEvent n\xE3o dispon\xEDvel neste documento");o.dispatchEvent(new A("dragstart",h)),e.dispatchEvent(new A("dragenter",b)),e.dispatchEvent(new A("dragover",b)),e.dispatchEvent(new A("drop",b)),o.dispatchEvent(new A("dragend",h))}catch(p){console.warn("[EasyQuiz] DragEvent ignorado com seguran\xE7a:",p)}try{let p=new Touch({identifier:1,target:o,clientX:a,clientY:s}),h=new Touch({identifier:1,target:e,clientX:i,clientY:d});o.dispatchEvent(new TouchEvent("touchstart",{bubbles:!0,cancelable:!0,touches:[p]})),e.dispatchEvent(new TouchEvent("touchmove",{bubbles:!0,cancelable:!0,touches:[h]})),e.dispatchEvent(new TouchEvent("touchend",{bubbles:!0,cancelable:!0,touches:[]}))}catch{}if(t>=2&&!e.contains(o))try{o.focus?.(),o.dispatchEvent(new KeyboardEvent("keydown",{key:" ",code:"Space",bubbles:!0})),o.dispatchEvent(new KeyboardEvent("keyup",{key:" ",code:"Space",bubbles:!0})),await new Promise(p=>setTimeout(p,80)),e.focus?.(),e.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",bubbles:!0})),e.dispatchEvent(new KeyboardEvent("keyup",{key:"Enter",code:"Enter",bubbles:!0}))}catch{}if(!e.contains(o))try{let p=A=>{let v=Object.keys(A).find(C=>C.startsWith("__reactFiber")||C.startsWith("__reactInternalInstance"));if(!v)return null;let y=A[v];for(let C=0;C<10&&y;C++){if(y.memoizedProps)return y.memoizedProps;y=y.return}return null},h=p(o),b=p(e);if(h){let A=h.onMouseDown||h.onPointerDown||h.onDragStart;if(typeof A=="function")try{A({type:"mousedown",button:0,buttons:1,clientX:a,clientY:s,bubbles:!0,preventDefault:()=>{},stopPropagation:()=>{},currentTarget:o,target:o}),await new Promise(v=>setTimeout(v,100))}catch{}}if(b){let A=b.onMouseUp||b.onPointerUp||b.onDrop;if(typeof A=="function")try{A({type:"mouseup",button:0,buttons:0,clientX:i,clientY:d,bubbles:!0,preventDefault:()=>{},stopPropagation:()=>{},currentTarget:e,target:e})}catch{}}try{o.focus?.(),o.dispatchEvent(new KeyboardEvent("keydown",{key:" ",code:"Space",keyCode:32,bubbles:!0,cancelable:!0})),await new Promise(v=>setTimeout(v,200));let A=d>s?"ArrowDown":"ArrowUp";for(let v=0;v<3;v++)document.dispatchEvent(new KeyboardEvent("keydown",{key:A,bubbles:!0,cancelable:!0})),await new Promise(y=>setTimeout(y,60));document.dispatchEvent(new KeyboardEvent("keydown",{key:" ",code:"Space",keyCode:32,bubbles:!0,cancelable:!0})),await new Promise(v=>setTimeout(v,80))}catch{}try{!!document.querySelector("[data-rbd-draggable-id], [data-rbd-droppable-id], [data-dnd-kit-sortable]")&&(o.dispatchEvent(new CustomEvent("dndkitdragstart",{bubbles:!0,cancelable:!0,detail:{id:o.id||o.getAttribute("data-id")}})),await new Promise(v=>setTimeout(v,100)),e.dispatchEvent(new CustomEvent("dndkitdrop",{bubbles:!0,cancelable:!0,detail:{overId:e.id||e.getAttribute("data-id")}})))}catch{}}catch(p){console.warn("[EasyQuiz] Estrat\xE9gia G (React DnD internals) falhou:",p)}}function Ut(o,e,t,n){let r=l=>l.replace(/\\/g,"\\\\").replace(/'/g,"\\'").replace(/"/g,'\\"').slice(0,100),a=r(o.toLowerCase()),s=r(e.toLowerCase()),i=r(t),d=r(n);return`var src=$eq.find('${i}')||Array.from(document.querySelectorAll('[draggable],[class*="cursor-grab"],[class*="dnd-card"]')).find(function(e){return (e.textContent||'').toLowerCase().includes('${a}');});var dst=Array.from(document.querySelectorAll('[class*="list-group"],[class*="dropzone"],[data-category],[data-rbd-droppable-id]')).find(function(e){var h=e.querySelector('.font-bold,h1,h2,h3,h4,[class*="header"]');var t=(h||e);return (t.textContent||'').toLowerCase().includes('${s}');});if(src&&dst){dst.appendChild(src);[src,dst].forEach(function(el){try{el.dispatchEvent(new Event('change',{bubbles:true}));}catch(e){}try{el.dispatchEvent(new CustomEvent('dndkitdrop',{bubbles:true,detail:{}}));}catch(e){}});}else{console.warn('[EQ-drag-fallback] nao localizado: ${a} -> ${s}');}`}var Xt={fill:(o,e)=>{let t=P(o);t?Xe(t,e):console.warn(`$eq.fill: Elemento '${o}' n\xE3o encontrado`)},click:o=>{let e=P(o);e?!!(e.closest('.option-card, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, [class*="option" i], [class*="choice" i]')||e.querySelector('input[type="radio"], input[type="checkbox"]')||e instanceof HTMLInputElement&&["checkbox","radio"].includes(e.type))?me(e,!0):ae(e):console.warn(`$eq.click: Elemento '${o}' n\xE3o encontrado`)},check:(o,e)=>{let t=P(o);t?me(t,e):console.warn(`$eq.check: Elemento '${o}' n\xE3o encontrado`)},find:(o,e)=>P(o,e),drag:(o,e)=>{let t=ne(o,"source")||P(o),n=ne(e,"destination")||P(e);t&&n?Ke(t,n):console.warn(`$eq.drag: Origem ou destino n\xE3o encontrado ('${o}' -> '${e}')`)},categorize:async(o,e)=>{let t=ne(o,"source")||P(o),n=ne(e,"destination")||P(e);if(!t||!n){console.warn(`$eq.categorize: Item ou categoria n\xE3o encontrados ('${o}' -> '${e}')`);return}await Ke(t,n)},execute:(o,e=!1,t=1)=>He(o,e,t)};typeof window<"u"&&(window.$eq=Xt);async function xo(o,e=1,t=Ae()){if(rt(o,t),o.t==="js"){let d=String(o.v||"");Bt(d);try{new Function("$eq","document","window",d)(Xt,document,window)}catch(l){throw console.warn("[EasyQuiz JS Execution]",l),l}return}if(o.t==="drag"){let d=ne(o.from,"source")||P(o.from),l=ne(o.to,"destination")||P(o.to);!d&&o.from&&(d=P(L(o.from))),!l&&o.to&&(l=P(L(o.to))),d&&l?await Ke(d,l,e):console.warn(`[EasyQuiz] Drag: alvo n\xE3o encontrado ('${o.from}' -> '${o.to}')`);return}let n=o.id!==void 0&&o.id!==null?String(o.id):"";!n&&o.t==="val"&&(n=o.target??o.name??o.selector??"1");let r=o.v!==void 0?o.v:o.value!==void 0?o.value:o.val!==void 0?o.val:o.text,a=r!=null?String(r).trim():"",s=null,i=String(o.name??o.n??"").trim();if(!i&&n&&document.querySelector(`input[type="radio"][name="${V(n)}"]`)&&(i=n),(o.t==="chk"||o.t==="clk")&&i){let d=Array.from(document.querySelectorAll(`input[name="${V(i)}"]`));if(a&&(s=d.find(l=>l.value?.toLowerCase()===a.toLowerCase())??null),!s&&a){let l=/^(v|verdadeiro|true|1|t|sim|correto)$/i.test(a),u=/^(f|falso|false|0|nao|não|incorreto|errado)$/i.test(a);if(l||u){let f=l?["v","verdadeiro","true","1","t","sim","correto"]:["f","falso","false","0","nao","n\xE3o","incorreto","errado"];s=d.find(c=>{let m=c.value?.toLowerCase()??"";if(f.includes(m))return!0;let h=(c.closest('label, td, [class*="option" i]')?.textContent??"").trim().toLowerCase();return f.some(b=>h===b||h.startsWith(b+" ")||h.startsWith("("+b+")"))})??null}}!s&&d.length>0&&(s=d[0])}if(s||(s=P(n,a,o.t==="val"||o.t==="sel")),!s&&n&&(s=P(L(n),a,o.t==="val"||o.t==="sel")),s&&a){if(s instanceof HTMLInputElement&&s.type==="radio"&&s.name){if(L(s.value).toLowerCase()!==L(a).toLowerCase()){let d=document.querySelector(`input[type="radio"][name="${V(s.name)}"][value="${V(a)}" i]`);if(d)s=d;else{let u=Array.from(document.querySelectorAll(`input[type="radio"][name="${V(s.name)}"]`)).find(f=>{let c=f.closest("label, .vf-label, .option-card, tr, td, div");return c&&L(c.textContent).toLowerCase().includes(L(a).toLowerCase())});u&&(s=u)}}}else if(!(s instanceof HTMLInputElement)&&!(s instanceof HTMLSelectElement)&&!(s instanceof HTMLTextAreaElement)){let d=s.querySelector(`input[value="${V(a)}" i], [data-value="${V(a)}" i]`);if(d)s=d;else{let u=Array.from(s.querySelectorAll('input[type="radio"], input[type="checkbox"]')).find(f=>{let c=f.closest("label, .vf-label, .option-card, td, div");return c&&L(c.textContent).toLowerCase().includes(L(a).toLowerCase())});u&&(s=u)}}}if(!s&&(o.t==="val"||o.t==="sel")){let d=document.body;try{d=W()||document.body}catch{}let l=Array.from(d.querySelectorAll(o.t==="sel"?'select, [role="combobox"], [role="listbox"]':'input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, select, [contenteditable="true"]')).filter(u=>z(u)&&!B(u));if(l.length===1)s=l[0];else if(l.length>1){let u=L(n).toLowerCase(),f=u.match(/^#?_?([0-9]+)$/);if(f){let c=parseInt(f[1],10);c>=1&&c<=l.length?s=l[c-1]:c>=0&&c<l.length&&(s=l[c])}s||(s=l.find(m=>{let p=(m.getAttribute("placeholder")||"").toLowerCase(),h=(m.name||"").toLowerCase(),b=(m.getAttribute("aria-label")||"").toLowerCase(),A=(m.id||"").toLowerCase(),v=L(ct(m)).toLowerCase(),y=L(m.closest('label, tr, td, .form-group, .field, [class*="row" i], div')?.textContent||"").toLowerCase();return p.includes(u)||h.includes(u)||b.includes(u)||A.includes(u)||v&&v.includes(u)||u.length>=2&&y.includes(u)})||(l.length===1?l[0]:null))}}if(!s&&o.t!=="adv")throw new Error(`Alvo '${n}' n\xE3o encontrado no DOM para a\xE7\xE3o '${o.t}'.`);switch(o.t){case"val":if(s){let u=s instanceof HTMLInputElement||s instanceof HTMLTextAreaElement||s instanceof HTMLSelectElement||s.isContentEditable?s:s.querySelector('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]');if(!u){let p=s.closest('.form-group, .field, [class*="input" i], [class*="control" i], label, tr, td, li, p, div')?.querySelector('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]');p&&(u=p)}if(!u){let m=s.nextElementSibling;for(;m;){if(m instanceof HTMLInputElement&&!["hidden","button","submit","checkbox","radio"].includes(m.type)||m instanceof HTMLTextAreaElement||m instanceof HTMLElement&&m.isContentEditable){u=m;break}let p=m.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(p){u=p;break}m=m.nextElementSibling}}if(!u){let m=document.body;try{m=W()||document.body}catch{}let p=Array.from(m.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]')).filter(h=>z(h)&&!B(h));p.length>0&&(u=p[0])}let f=o.v!==void 0?o.v:o.value!==void 0?o.value:o.val!==void 0?o.val:o.text,c=f!=null?String(f):"";Xe(u||s,c)}break;case"chk":let d=o.c!==void 0?!!o.c:!0;s&&me(s,d);break;case"sel":if(s){let u=Array.isArray(o.v)?o.v:[String(o.v)];Ge(s,u)}break;case"clk":if(s)if(!!(s.closest('.option-card, label, .vf-label, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, [class*="option" i], [class*="choice" i], [class*="answer" i], li, tr')||s.querySelector('input[type="radio"], input[type="checkbox"]')||s instanceof HTMLInputElement&&["checkbox","radio"].includes(s.type))){let f=o.c!==void 0?!!o.c:!0;me(s,f)}else ae(s,o.co);break;case"adv":let l=Gt(o.id);if(l){await ht(l,1200);let u=o.id||l.textContent?.trim()||"";u&&tt(window.location.hostname,{advanceSelector:u}),ae(l)}else console.warn("[EasyQuiz] Bot\xE3o de avan\xE7o n\xE3o localizado.");break}}function wo(){let o=["button","a",'[role="button"]','input[type="submit"]','input[type="button"]','[data-testid*="check" i]','[data-test-id*="check" i]'].join(",");return Array.from(document.querySelectorAll(o)).find(t=>{if(!z(t)||B(t)||t.closest("header, nav, aside"))return!1;let n=t instanceof HTMLInputElement||t instanceof HTMLButtonElement?t.value:"",r=(t.textContent||n||t.getAttribute("aria-label")||"").trim();return/(verificar|checar|check|conferir|validar|enviar|responder)/i.test(r)})||null}function Gt(o){let e=c=>{let m=(c.getAttribute("aria-label")||c.textContent||(c instanceof HTMLInputElement||c instanceof HTMLButtonElement?c.value:"")||"").trim();return le.test(m)};if(o){let c=P(o);if(c&&z(c)&&!B(c)&&!F(c)&&!e(c))return c}try{let c=et(window.location.hostname);if(c.advanceSelector){let m=P(c.advanceSelector);if(m&&z(m)&&!B(m)&&!F(m)&&!e(m))return m}}catch{}let t=["button","a",'[role="button"]','[role="link"]','input[type="button"]','input[type="submit"]','[data-testid*="next" i]','[data-testid*="continue" i]','[data-testid*="check" i]','[data-test-id*="next" i]','[data-test-id*="continue" i]','[data-test-id*="check" i]','[class*="next" i]','[class*="continue" i]','[class*="proximo" i]','[class*="avancar" i]'].join(","),n=Array.from(document.querySelectorAll(t)),r=c=>{let m=c instanceof HTMLInputElement||c instanceof HTMLButtonElement?c.value:"";return(c.getAttribute("aria-label")||c.textContent||m||"").trim()},a=c=>{let m=r(c).trim();return/^\d{1,3}$/.test(m)?!!c.closest('[class*="pagination" i], [class*="pager" i], [class*="page-nav" i], [class*="step-indicator" i], [class*="breadcrumb" i], [class*="steps" i], [aria-label*="p\xE1gina" i], [aria-label*="page" i], [role="navigation"], nav'):!1},s=n.filter(c=>z(c)&&!B(c)&&!c.closest("header, aside")&&!F(c)&&!e(c));for(let c of s){let m=r(c),p=m.replace(/[\d\(\)\[\]\u2192>\u2022\-\/\\]+/g," ").trim();if((Me.test(m)||Me.test(p))&&!a(c)&&!F(c))return c}for(let c of s)if(_(c)&&!F(c)&&!a(c))return c;let i=document.querySelector('[data-test-id*="next" i], [data-testid*="next" i], [aria-label*="next" i], [aria-label*="pr\xF3xim" i], [aria-label*="avan\xE7ar" i], [aria-label*="continuar" i]');if(i&&z(i)&&!B(i)&&!F(i)&&!e(i))return i;let d=Array.from(document.querySelectorAll('input[type="submit"], button[type="submit"]'));for(let c of d)if(z(c)&&!B(c)&&!e(c)&&!F(c)&&!a(c))return c;let l=Array.from(document.querySelectorAll('button, [role="button"]')),u=window.innerHeight,f=l.filter(c=>{if(!z(c)||B(c)||e(c)||F(c)||c.closest("header, nav, aside, .eq-sidebar")||a(c))return!1;let m=c.getBoundingClientRect();return m.top>u*.45&&m.height>=24&&m.width>=24});if(f.length>0)return f.sort((c,m)=>{let p=c.getBoundingClientRect(),h=m.getBoundingClientRect(),b=p.left+p.top;return h.left+h.top-b}),f[0];for(let c of s)if(_(c)&&!F(c))return c;return null}async function ht(o,e=2500){let t=Date.now();for(;Date.now()-t<e;){if(!(o.disabled===!0||o.getAttribute("aria-disabled")==="true"||o.classList.contains("disabled")||o.getAttribute("disabled")!==null))return;await new Promise(r=>setTimeout(r,80))}}function Eo(){let o=window.location.href,e=document.title,t=document.querySelectorAll('input, textarea, select, button, [role="button"], [role="option"], [role="radio"], [role="checkbox"]').length,n=(document.body?.innerText||document.body?.textContent||"").length;return`${o}|${e}|${t}|${n}`}async function Co(o,e=3500){let[t,n,r,a]=o.split("|"),s=parseInt(a||"0",10),i=Date.now();for(;Date.now()-i<e;){let d=window.location.href,l=document.title,u=String(document.querySelectorAll('input, textarea, select, button, [role="button"], [role="option"], [role="radio"], [role="checkbox"]').length),f=(document.body?.innerText||document.body?.textContent||"").length;if(d!==t)return{changed:!0,evidence:`URL mudou: ${t} \u2192 ${d}`};if(l!==n)return{changed:!0,evidence:`T\xEDtulo da p\xE1gina mudou: "${n}" \u2192 "${l}"`};if(Math.abs(parseInt(u)-parseInt(r||"0"))>=2)return{changed:!0,evidence:`Controles interativos: ${r} \u2192 ${u}`};if(Math.abs(f-s)>50)return{changed:!0,evidence:`Conte\xFAdo da p\xE1gina mudou substancialmente (${Math.abs(f-s)} chars)`};await new Promise(c=>setTimeout(c,100))}return{changed:!1,evidence:"Nenhuma mudan\xE7a estrutural detectada dentro do tempo limite."}}async function Je(o){if(o.t==="js"||o.t==="adv")return;if(o.t==="drag"){let a=P(o.from)||P(L(o.from)),s=P(o.to)||P(L(o.to));a&&s&&await Ke(a,s,2);return}let e=o.id||"",t=o.v!==void 0?String(o.v).trim():"",n=P(e,t)||P(L(e),t),r=String(o.name??o.n??"").trim();if(!r&&e&&document.querySelector(`input[type="radio"][name="${V(e)}"]`)&&(r=e),!n&&r){let a=Array.from(document.querySelectorAll(`input[name="${V(r)}"]`));if(t&&(n=a.find(s=>s.value?.toLowerCase()===t.toLowerCase())??null),!n&&t){let s=/^(v|verdadeiro|true|1|t|sim|correto)$/i.test(t),i=/^(f|falso|false|0|nao|não|incorreto|errado)$/i.test(t);if(s||i){let d=s?["v","verdadeiro","true","1","t","sim","correto"]:["f","falso","false","0","nao","n\xE3o","incorreto","errado"];n=a.find(l=>{let u=l.value?.toLowerCase()??"";if(d.includes(u))return!0;let c=(l.closest('label, td, [class*="option" i]')?.textContent??"").trim().toLowerCase();return d.some(m=>c===m||c.startsWith(m+" ")||c.startsWith("("+m+")"))})??null}}!n&&a.length>0&&(n=a[0])}if(o.t==="clk"||o.t==="chk"){if(!n&&e){let s=Array.from(document.querySelectorAll('input, label, button, [role="radio"], [role="checkbox"], .option-card, [class*="option" i], [class*="choice" i]')),i=L(e).toLowerCase();n=s.find(d=>{let l=L(d.textContent).toLowerCase();return!!(L(d.value||"").toLowerCase()===i||l===i||l.startsWith(i+")")||l.startsWith("("+i+")")||l.startsWith(i+".")||l.startsWith(i+" - ")||l.startsWith(i+":")||i.length>=3&&l.includes(i))})||null}let a=o.v!==void 0?String(o.v).trim():"";if(n&&a){if(n instanceof HTMLInputElement&&n.type==="radio"&&n.name){if(L(n.value).toLowerCase()!==L(a).toLowerCase()){let s=document.querySelector(`input[type="radio"][name="${V(n.name)}"][value="${V(a)}" i]`);if(s)n=s;else{let d=Array.from(document.querySelectorAll(`input[type="radio"][name="${V(n.name)}"]`)).find(l=>{let u=l.closest("label, .vf-label, .option-card, tr, td, div");return u&&L(u.textContent).toLowerCase().includes(L(a).toLowerCase())});d&&(n=d)}}}else if(!(n instanceof HTMLInputElement)&&!(n instanceof HTMLSelectElement)&&!(n instanceof HTMLTextAreaElement)){let s=n.querySelector(`input[value="${V(a)}" i], [data-value="${V(a)}" i]`);if(s)n=s;else{let d=Array.from(n.querySelectorAll('input[type="radio"], input[type="checkbox"]')).find(l=>{let u=l.closest("label, .vf-label, .option-card, td, div");return u&&L(u.textContent).toLowerCase().includes(L(a).toLowerCase())});d&&(n=d)}}}if(n){let s=n.closest('.option-card, label, .vf-label, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, li')||n,i=n instanceof HTMLInputElement&&["radio","checkbox"].includes(n.type)?n:s.querySelector('input[type="radio"], input[type="checkbox"]')||(s.getAttribute("for")?s.ownerDocument.getElementById(s.getAttribute("for")):null),d=o.c!==void 0?!!o.c:!0;if(me(i||s,d),i&&i.checked!==d){try{let l=i._valueTracker;l&&l.setValue(!d)}catch{}try{Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"checked")?.set?.call(i,d)}catch{}i.checked=d,i.dispatchEvent(new Event("input",{bubbles:!0,composed:!0})),i.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}}return}if(o.t==="val"){let a=null;if(n&&(a=n instanceof HTMLInputElement||n instanceof HTMLTextAreaElement||n.isContentEditable?n:n.querySelector('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]')),!a){let s=document.body;try{s=W()||document.body}catch{}let i=Array.from(s.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]')),d=L(e).toLowerCase();a=i.find(l=>{let u=(l.getAttribute("placeholder")||"").toLowerCase(),f=(l.name||"").toLowerCase(),c=(l.id||"").toLowerCase(),m=(l.getAttribute("aria-label")||"").toLowerCase();return u.includes(d)||f.includes(d)||c.includes(d)||m.includes(d)})||(i.length>0?i[0]:null)}if(a){let s=String(o.v??"");try{if(a.focus?.(),a.type!=="number"){try{a.select?.()}catch{}document.execCommand?.("insertText",!1,s)}}catch{}Xe(a,s)}return}if(o.t==="sel"){if(!n&&e){let a=Array.from(document.querySelectorAll("select")),s=L(e).toLowerCase();n=a.find(i=>{let d=(i.name||"").toLowerCase(),l=(i.id||"").toLowerCase(),u=(i.getAttribute("aria-label")||"").toLowerCase();return d.includes(s)||l.includes(s)||u.includes(s)})||null}if(n){let a=Array.isArray(o.v)?o.v:[String(o.v)];Ge(n,a)}return}}function oe(o){try{if(o.t==="val"){let e=o.v!==void 0?o.v:o.value!==void 0?o.value:o.val!==void 0?o.val:o.text,t=String(e??"").trim(),n=t,r=o.id!==void 0&&o.id!==null?String(o.id):"";r||(r=o.target??o.name??o.selector??"1");let a=P(r,n,!0)||P(L(r),n,!0);if(!a){let m=document.body;try{m=W()||document.body}catch{}let p=Array.from(m.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]')).filter(h=>z(h)&&!B(h));p.length>0&&(a=p[0])}if(!a)return!1;let s=a instanceof HTMLInputElement&&a.type==="radio"?a:a.querySelector('input[type="radio"]');if(s&&s.name){let m=document.querySelector(`input[type="radio"][name="${V(s.name)}"]:checked`);if(!m)return!1;let p=L(m.value).toLowerCase(),h=L(t).toLowerCase(),b=L(m.closest("label, .vf-label, .option-card, tr, td, div")?.textContent||"").toLowerCase();return p===h||b===h||b.includes(h)}let i=a instanceof HTMLInputElement||a instanceof HTMLTextAreaElement||a.isContentEditable?a:a.querySelector('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(!i){let p=a.closest('.form-group, .field, [class*="input" i], [class*="control" i], label, tr, td, li, p, div')?.querySelector('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]');p&&(i=p)}if(!i){let m=a.nextElementSibling;for(;m;){if(m instanceof HTMLInputElement&&!["hidden","button","submit","checkbox","radio"].includes(m.type)||m instanceof HTMLTextAreaElement||m instanceof HTMLElement&&m.isContentEditable){i=m;break}let p=m.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(p){i=p;break}m=m.nextElementSibling}}if(i instanceof HTMLSelectElement){let m=L(t).toLowerCase();return Array.from(i.options).some(p=>{if(!p.selected)return!1;let h=p.value.toLowerCase(),b=L(p.textContent).toLowerCase();return m===h||m===b||h.includes(m)||b.includes(m)})}let d=(i instanceof HTMLInputElement||i instanceof HTMLTextAreaElement?i.value:i?.textContent??a.textContent??"").trim();if(!d&&!t)return!0;if(!d&&t)return!1;let l=d.replace(",",".").replace(/\s+/g,"").toLowerCase(),u=t.replace(",",".").replace(/\s+/g,"").toLowerCase(),f=parseFloat(l),c=parseFloat(u);return!isNaN(f)&&!isNaN(c)&&l.match(/^-?[\d.,]+$/)&&u.match(/^-?[\d.,]+$/)?Math.abs(f-c)<1e-4:l===u||d.toLowerCase()===t.toLowerCase()||u.length>=3&&l===u}if(o.t==="sel"){let e=P(o.id,void 0,!0)||P(L(o.id),void 0,!0);if(!e){let a=document.body;try{a=W()||document.body}catch{}let s=Array.from(a.querySelectorAll('select, [role="combobox"], [role="listbox"]')).filter(l=>z(l)&&!B(l)),i=L(o.id).toLowerCase();e=s.find(l=>{let u=(l.id||"").toLowerCase(),f=(l.getAttribute("name")||"").toLowerCase(),c=(l.getAttribute("aria-label")||"").toLowerCase(),m=L(l.closest('.dropdown-row, [class*="dropdown" i], [class*="select" i], tr, label, div')?.textContent||"").toLowerCase();return u.includes(i)||f.includes(i)||c.includes(i)||i.length>=2&&m.includes(i)})||(s.length===1?s[0]:null)}if(!e)return!1;let t=e instanceof HTMLSelectElement?e:e.querySelector("select");if(!t){let a=e.matches?.('[role="combobox"], [role="listbox"], [class*="select" i], [class*="dropdown" i]')?e:e.closest('[role="combobox"], [role="listbox"], [class*="select" i], [class*="dropdown" i]');if(a){let i=(Array.isArray(o.v)?o.v:[String(o.v)]).map(l=>L(l).toLowerCase()),d=L(a.textContent).toLowerCase();return i.some(l=>d.includes(l)||l.includes(d))}return!1}let r=(Array.isArray(o.v)?o.v:[String(o.v)]).map(a=>L(a).toLowerCase());return Array.from(t.options).some(a=>{if(!a.selected)return!1;let s=a.value.toLowerCase(),i=L(a.textContent).toLowerCase();return r.some(d=>d===s||d===i||s.includes(d)||i.includes(d))})}if(o.t==="chk"||o.t==="clk"){let e=o.v!==void 0?String(o.v).trim():"",t=String(o.name??o.n??"").trim();if(t&&!o.id){let c=Array.from(document.querySelectorAll(`input[name="${V(t)}"]`));if(c.length>0){let m=c.find(v=>v.checked);if(!m)return!1;if(!e)return!0;let p=m.value?.toLowerCase()??"",h=e.toLowerCase();if(p===h)return!0;let b=/^(v|verdadeiro|true|1|t|sim|correto)$/i.test(e),A=/^(f|falso|false|0|nao|não|incorreto|errado)$/i.test(e);return b?/^(v|verdadeiro|true|1|t|sim|correto)$/i.test(p):A?/^(f|falso|false|0|nao|não|incorreto|errado)$/i.test(p):!1}}let n=P(o.id,e)||P(L(o.id),e);if(!n&&t){let c=document.querySelector(`input[name="${V(t)}"]`);c&&(n=c)}if(!n)return!1;let r=n.closest('.option-card, label, .vf-label, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, li')||n,a=n instanceof HTMLInputElement&&["checkbox","radio"].includes(n.type)?n:r.querySelector('input[type="checkbox"], input[type="radio"]')||(r.getAttribute("for")?r.ownerDocument.getElementById(r.getAttribute("for")):null),s=o.t==="chk"||o.c!==void 0?!!o.c:!0;if(a&&a.type==="radio"){if(a.checked===s)return!0;if(o.v&&a.name){let c=L(String(o.v)).toLowerCase(),m=document.querySelector(`input[type="radio"][name="${V(a.name)}"]:checked`);if(!m)return!1;if(m===a)return!0;let p=L(m.value).toLowerCase(),h=L(m.closest("label, .vf-label, .option-card, tr, td, div")?.textContent||"").toLowerCase();return p===c||h.includes(c)||c.includes(p)}}if(a&&["checkbox","radio"].includes(a.type))return a.checked===s;let i=r.getAttribute("aria-checked")===String(s)||r.getAttribute("aria-selected")===String(s)||r.getAttribute("aria-pressed")===String(s),d=s?r.getAttribute("data-selected")==="true"||r.getAttribute("data-checked")==="true"||r.getAttribute("data-active")==="true"||r.getAttribute("data-state")==="checked"||r.getAttribute("data-state")==="on":r.getAttribute("data-selected")==="false"||r.getAttribute("data-checked")==="false"||r.getAttribute("data-state")==="unchecked",l=r.className||"",u=s?/\b(active|selected|checked|picked|is-selected|choice-selected|selected-option|is-checked|chosen|current)\b/i.test(l):!/\b(active|selected|checked|picked|is-selected|choice-selected|selected-option|is-checked|chosen|current)\b/i.test(l);if(i||d||u)return!0;let f=!!r.closest('[role="radiogroup"], [role="listbox"], .options, .choices, [class*="option" i], [class*="choice" i], [class*="answer" i], [class*="quiz" i]');return o.t==="clk"&&!a&&!f||r.getAttribute("aria-expanded")!==null||r.getAttribute("aria-pressed")!==null}if(o.t==="drag"){let e=ne(o.from,"source")||P(o.from)||P(L(o.from)),t=ne(o.to,"destination")||P(o.to)||P(L(o.to));return!e||!t?!1:yo(e,t).success}}catch{}return!1}async function He(o,e,t=1,n=Ae({engine:"smart",autoAdvance:e})){let r=o.actions.filter(w=>w.t!=="adv"),a=o.actions.filter(w=>w.t==="adv"),s=0,i=[],d=new Map,l=new Map,u=new Map,f=new Set,c=o.pageType==="question"||r.length>0,m=r.filter(w=>w.t==="chk"||w.t==="clk"&&w.c!==void 0),p=new Map;for(let w of r){let M=[];l.set(w,M);try{if(w.t==="drag"){M.push("declarative-A-F");try{let I=ne(w.from,"source")||P(w.from),T=ne(w.to,"destination")||P(w.to);I&&u.set(w,I.parentElement?.outerHTML?.slice(0,500)||""),T&&p.set(w,T.children.length)}catch{}}else M.push("declarative-primary");await xo(w,t,n),s++,f.add(w)}catch(I){d.set(w,I instanceof Error?I.message:String(I)),console.warn("[EasyQuiz] A\xE7\xE3o declarativa prim\xE1ria falhou com seguran\xE7a:",w,I)}await new Promise(I=>setTimeout(I,w.t==="drag"?180:35))}if(c&&o.mode==="escolha_multipla"&&m.length>0){let w=document.body;try{w=W()||document.body}catch{}let M=Array.from(w.querySelectorAll('input[type="checkbox"], [role="checkbox"]')).filter(I=>z(I)&&!B(I));if(M.length>1){let T=function(H,O){if(H===O||H.contains(O)||O.contains(H))return!0;let N=H.closest('.option-card, label, [role="checkbox"], [role="option"], tr, li, [class*="option" i]'),R=O.closest('.option-card, label, [role="checkbox"], [role="option"], tr, li, [class*="option" i]');if(N&&R&&N===R)return!0;let U=H.getAttribute("for")||H.id,X=O.getAttribute("for")||O.id;return!!(U&&X&&U===X)};var k=T;let I=new Set;for(let H of m){let O=H.t==="chk"?!!H.c:!!(H.c??!0),N="id"in H&&typeof H.id=="string"?H.id:"";if(O&&N){let R=P(N,H.v);if(R){I.add(R);let U=R.querySelector('input[type="checkbox"]');U&&I.add(U);let X=R.closest('.option-card, label, [role="checkbox"], tr, li, [class*="option" i]');X&&(I.add(X),X.querySelectorAll('input[type="checkbox"]').forEach(Z=>I.add(Z)))}}}if(I.size>=m.length&&I.size>0){let H=Array.from(I);for(let O of M)H.some(R=>T(R,O))||(O instanceof HTMLInputElement&&O.checked||O.getAttribute("aria-checked")==="true"||O.closest(".option-card, label")?.classList.contains("selected"))&&me(O,!1)}}}await new Promise(w=>setTimeout(w,r.length>0?100:25));let h=0;for(let w of r){if(oe(w)){h++;continue}console.warn(`[EasyQuiz Auto-Cura] A\xE7\xE3o '${w.t}' no alvo '${w.id||w.from||""}' n\xE3o verificada no DOM. Disparando Passagem 2 de conting\xEAncia...`);try{rt(w,n),l.get(w)?.push("alternative-path"),await Je(w)}catch(M){d.set(w,M instanceof Error?M.message:String(M)),console.warn("[EasyQuiz Auto-Cura] Rota alternativa falhou:",M)}await new Promise(M=>setTimeout(M,250)),oe(w)&&(console.log("[EasyQuiz Auto-Cura] \u2713 A\xE7\xE3o recuperada com sucesso pela rota de conting\xEAncia!"),h++,f.has(w)?d.has(w)&&d.delete(w):(d.delete(w),s++,f.add(w)))}if(h<r.length&&r.length>0){console.warn(`[EasyQuiz Auto-Cura] ${r.length-h} de ${r.length} a\xE7\xE3o(\xF5es) ainda n\xE3o verificadas. Disparando Passagem 3 final...`),await new Promise(w=>setTimeout(w,200));for(let w of r)if(!oe(w))try{if(await Je(w),await new Promise(M=>setTimeout(M,80)),!oe(w)&&(w.t==="clk"||w.t==="chk"))try{let M="id"in w?String(w.id||""):"",I=w.v!==void 0?String(w.v).trim():"",T=P(M,I)||P(L(M),I);T&&(gt(T),await new Promise(H=>setTimeout(H,120)))}catch{}}catch(M){d.set(w,M instanceof Error?M.message:String(M))}await new Promise(w=>setTimeout(w,200)),h=0;for(let w of r)oe(w)&&(h++,f.has(w)?d.has(w)&&d.delete(w):(d.delete(w),s++,f.add(w)))}let b=[];for(let[w,M]of r.entries())if(!oe(M)){let I=M.t==="drag"?`${M.from} -> ${M.to}`:"id"in M&&M.id?M.id:M.t;i.push(I),b.push({actionIndex:w,action:M,strategiesAttempted:l.get(M)||[],evidence:d.get(M)||"sem evid\xEAncia de aplica\xE7\xE3o no DOM",domSnapshot:u.get(M)}),M.t==="drag"&&console.warn(`[EasyQuiz Drag] FALHA CONFIRMADA: "${M.from}" -> "${M.to}"`,`
  Estrat\xE9gias: ${(l.get(M)||[]).join(", ")}`,`
  Snapshot DOM: ${u.get(M)?.slice(0,200)||"n/a"}`)}c&&r.length===0&&i.push("nenhuma a\xE7\xE3o de resposta prescrita");let A=r.map((w,M)=>{let I=w.t==="drag"?`${w.from} -> ${w.to}`:w.t==="js"?"$eq":w.id||w.t,T=w.t==="js"?!0:w.t==="drag"?!!(ne(w.from,"source")&&ne(w.to,"destination")):!!(P(w.id||"")||P(L(w.id||""))),H=oe(w);return{index:M,action:w,target:I,located:T,applied:!d.has(w),verified:H,strategy:w.t==="drag"?"drag-adaptive":w.t==="js"?"javascript":"declarative-dom",evidence:H?"estado do controle confirmado no DOM":"nenhuma evid\xEAncia suficiente ap\xF3s as tentativas",...d.has(w)?{error:d.get(w)}:{}}}),v=c?r.length>0&&i.length===0&&(h===r.length||s===r.length&&h>0):!0,y=!1,C=!1,q="Nenhuma a\xE7\xE3o de navega\xE7\xE3o solicitada.",x=c?h>0&&h>=Math.ceil(r.length/2):s>0&&s>=r.length/2,E=c?h>0&&(v||x):v||r.length===0||x;if(e&&E){await new Promise(I=>setTimeout(I,r.length>0?120:40));let w=!1,M=null;if(o.pageType!=="info"){let I=wo();if(I&&z(I)){await ht(I,1200),ae(I),w=!0,M=I,await new Promise(O=>setTimeout(O,350));let T=document.querySelector('.feedback-message.error, [class*="feedback"][class*="error" i], [role="alert"][class*="error" i]');T&&z(T)&&(T.textContent||"").trim().length>0?(y=!1,C=!1,q=`Aviso do formul\xE1rio ap\xF3s checagem: ${T.textContent?.trim().slice(0,100)}`):(y=!0,C=!0,q="Resposta confirmada via bot\xE3o de verifica\xE7\xE3o/envio.")}}if(!w){let I=Eo(),T=a.length>0&&"id"in a[0]?a[0].id:void 0,H=Gt(T);if(H){await ht(H,1500);let O=T||H.textContent?.trim()||"";O&&tt(window.location.hostname,{advanceSelector:O}),ae(H);let N=await Co(I,1800);C=N.changed,q=N.evidence,y=N.changed||!0,N.changed||console.warn("[EasyQuiz] O bot\xE3o de avan\xE7o foi acionado, mas a navega\xE7\xE3o ainda n\xE3o concluiu.")}else console.warn("[EasyQuiz] Nenhum bot\xE3o de avan\xE7o encontrado na p\xE1gina.")}}return{applied:s,verified:h,success:v,advanced:y,failed:i,reports:A,navigationVerified:C,navigationEvidence:q,failedActions:b}}var ie=null,ye=[],ft=[],bt=[],vt=[],se=null,he=null,qo=`
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
`;function Kt(){try{if(typeof document>"u"||!document.head)return;if(!document.getElementById("eq-image-pulse-style")){let o=document.createElement("style");o.id="eq-image-pulse-style",o.textContent=qo,document.head.appendChild(o)}}catch{}}function ge(){ie&&(ie.style.removeProperty("outline"),ie.style.removeProperty("outline-offset"),ie.style.removeProperty("position"),ie=null);for(let o of ye)o.style.removeProperty("outline"),o.style.removeProperty("outline-offset"),o.style.removeProperty("background-color"),o.style.removeProperty("box-shadow"),o.removeAttribute("data-easyquiz-highlight");ye=[];for(let o of ft)o.style.removeProperty("animation"),o.style.removeProperty("outline"),o.style.removeProperty("outline-offset"),o.style.removeProperty("box-shadow"),o.style.removeProperty("filter"),o.removeAttribute("data-easyquiz-image-highlight");ft=[];for(let o of bt)try{o.remove()}catch{}bt=[],he&&typeof window<"u"&&(window.removeEventListener("scroll",he),window.removeEventListener("resize",he),he=null);for(let o of vt)try{o.remove()}catch{}if(vt=[],se){try{se.remove()}catch{}se=null}}function At(o){Kt();let e=[];for(let t of o){if(!t||typeof t.setAttribute!="function")continue;let n=t;try{n.style&&(n.style.outline="3px solid #ffd600",n.style.outlineOffset="4px",n.style.animation="eq-image-pulse-yellow-white 1.2s ease-in-out infinite",n.style.boxShadow="0 0 16px rgba(255, 214, 0, 0.7)",n.style.filter="drop-shadow(0 0 8px rgba(255, 214, 0, 0.8))"),n.setAttribute("data-easyquiz-image-highlight","true"),ft.push(n)}catch{}try{let r=t.getBoundingClientRect(),a=r.width||t.offsetWidth||280,s=r.height||t.offsetHeight||200;if(a>10&&s>10){let i=document.createElement("div");i.setAttribute("data-easyquiz-image-frame","true"),i.style.cssText=`
          position: absolute;
          top: ${r.top+window.scrollY-3}px;
          left: ${r.left+window.scrollX-3}px;
          width: ${a+6}px;
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
        `,i.appendChild(d),document.body.appendChild(i),bt.push(i),vt.push(d),e.push({element:t,frame:i})}}catch{}}e.length>0&&!he&&typeof window<"u"&&(he=()=>{for(let t of e)try{let n=t.element.getBoundingClientRect();n.width>0&&n.height>0&&(t.frame.style.top=`${n.top+window.scrollY-3}px`,t.frame.style.left=`${n.left+window.scrollX-3}px`,t.frame.style.width=`${n.width+6}px`,t.frame.style.height=`${n.height+6}px`)}catch{}},window.addEventListener("scroll",he,{passive:!0}),window.addEventListener("resize",he,{passive:!0}))}function ze(o){ie&&ie!==o&&(ie.style.removeProperty("outline"),ie.style.removeProperty("outline-offset")),Kt(),ie=o,o.style.outline="2px solid #00e5ff",o.style.outlineOffset="4px";try{if(se){try{se.remove()}catch{}se=null}window.getComputedStyle(o).position==="static"&&(o.style.position="relative");let t=document.createElement("div");t.style.cssText=`
      position: absolute; left: 0; right: 0; top: 0; height: 3px;
      background: linear-gradient(90deg, transparent, #00e5ff, #00ff88, #00e5ff, transparent);
      z-index: 99998; pointer-events: none; border-radius: 2px;
      animation: eq-scope-scan-loop 1.4s ease-in-out infinite;
      box-shadow: 0 0 14px rgba(0, 229, 255, 0.85), 0 0 6px #00ff88;
    `,o.appendChild(t),se=t}catch{}}function To(o){return!o||o>=.9?{outline:"#00ff88",bg:"rgba(0, 255, 136, 0.12)",glow:"rgba(0, 255, 136, 0.8)"}:o>=.7?{outline:"#00bfff",bg:"rgba(0, 191, 255, 0.10)",glow:"rgba(0, 191, 255, 0.7)"}:{outline:"#ffaa00",bg:"rgba(255, 170, 0, 0.10)",glow:"rgba(255, 170, 0, 0.7)"}}function Jt(o,e){if(se){try{se.remove()}catch{}se=null}let t=To(e);for(let n of o){if(n.t==="adv"||n.t==="js")continue;if(n.t==="drag"){try{let m=P(n.from),p=P(n.to);m&&(m.style.outline=`2px solid ${t.outline}`,ye.push(m)),p&&(p.style.outline="2px dashed #00e5ff",ye.push(p))}catch{}continue}let r=n.v!==void 0?Array.isArray(n.v)?n.v[0]:String(n.v):"",a=String(n.name??n.n??"").trim(),s=null;if(a){let m=Array.from(document.querySelectorAll(`input[name="${V(a)}"]`));if(r&&(s=m.find(p=>p.value?.toLowerCase()===r.toLowerCase())??null,!s)){let p=/^(v|verdadeiro|true|1|t|sim|correto)$/i.test(r),h=/^(f|falso|false|0|nao|não|incorreto|errado)$/i.test(r);if(p||h){let b=p?["v","verdadeiro","true","1","t","sim","correto"]:["f","falso","false","0","nao","n\xE3o","incorreto","errado"];s=m.find(A=>{let v=A.value?.toLowerCase()??"";if(b.includes(v))return!0;let C=(A.closest('label, .vf-label, td, [class*="option" i]')?.textContent??"").trim().toLowerCase();return b.some(q=>C===q||C.startsWith(q+" ")||C.startsWith("("+q+")"))})??null}}!s&&m.length>0&&(s=m[0])}if(!s&&n.id&&(s=P(n.id,r,n.t==="val"||n.t==="sel")||P(L(n.id),r,n.t==="val"||n.t==="sel")),!s&&n.t==="sel"){let m=document.body;try{m=W()||document.body}catch{}let p=Array.from(m.querySelectorAll('select, [role="combobox"], [role="listbox"]')).filter(A=>z(A)&&!ue(A)),h=L(n.id).toLowerCase();s=p.find(A=>{let v=(A.id||"").toLowerCase(),y=(A.getAttribute("name")||"").toLowerCase(),C=(A.getAttribute("aria-label")||"").toLowerCase(),q=L(A.closest('.dropdown-row, [class*="dropdown" i], [class*="select" i], tr, label, div')?.textContent||"").toLowerCase();return v.includes(h)||y.includes(h)||C.includes(h)||h.length>=2&&q.includes(h)})||(p.length===1?p[0]:null)}if(!s)continue;let i=typeof HTMLSelectElement<"u"&&s instanceof HTMLSelectElement||s.tagName?.toLowerCase()==="select"||s.getAttribute("role")==="combobox"||s.getAttribute("role")==="listbox",d=s.closest('label, .vf-label, .option-card, [role="radio"], [role="checkbox"], [role="option"], [role="listitem"], .answer, .quiz-option, .form-check, [class*="option" i], [class*="choice" i]'),l=i?s.parentElement?.closest('.dropdown-row, [class*="dropdown" i], [class*="select-row" i], .form-group, tr, li'):null,u=d||l||s;u.style.outline=`2px solid ${t.outline}`,u.style.outlineOffset="2px",u.style.backgroundColor=t.bg,u.setAttribute("data-easyquiz-highlight","true"),ye.push(u);let f=i?s:u.querySelector('select, [role="combobox"], [role="listbox"]');f&&(f.style.outline=`2px solid ${t.outline}`,f.style.outlineOffset="2px",f.style.boxShadow=`0 0 10px ${t.glow}`,f.setAttribute("data-easyquiz-highlight","true"),ye.push(f));let c=s instanceof HTMLInputElement&&["checkbox","radio"].includes(s.type)?s:u.querySelector('input[type="checkbox"], input[type="radio"]');c&&c!==u&&(c.style.outline=`2px solid ${t.outline}`,c.style.outlineOffset="2px",c.style.boxShadow=`0 0 10px ${t.glow}`,c.setAttribute("data-easyquiz-highlight","true"),ye.push(c))}}var yt=10,ko=1400,Pe=15e5;function de(o){return new Promise((e,t)=>{let n=new FileReader;n.onerror=()=>t(new Error("Falha ao converter blob para base64.")),n.onload=()=>{let r=String(n.result||"");e(r.split(",")[1]||"")},n.readAsDataURL(o)})}async function xe(o){let e=0,t=0;if(o instanceof HTMLImageElement?(e=o.naturalWidth||o.width,t=o.naturalHeight||o.height):(e=o.width,t=o.height),e<=0||t<=0)throw new Error("Dimens\xF5es inv\xE1lidas.");let n=Math.min(1,ko/Math.max(e,t)),r=Math.max(1,Math.round(e*n)),a=Math.max(1,Math.round(t*n)),s=document.createElement("canvas");s.width=r,s.height=a;let i=s.getContext("2d",{alpha:!1});if(!i)throw new Error("Sem suporte a Canvas 2D.");return i.fillStyle="#ffffff",i.fillRect(0,0,r,a),i.drawImage(o,0,0,r,a),new Promise((d,l)=>{s.toBlob(u=>u?d(u):l(new Error("Falha na compress\xE3o.")),"image/jpeg",.88)})}async function Yt(o){let e=typeof o.getBoundingClientRect=="function"?o.getBoundingClientRect():{width:0,height:0},t=e.width||parseFloat(o.getAttribute("width")||"0")||parseFloat(o.style.width||"0")||400,n=e.height||parseFloat(o.getAttribute("height")||"0")||parseFloat(o.style.height||"0")||300,r=2,a=Math.min(1800,Math.max(120,Math.round(t*r))),s=Math.min(1800,Math.max(100,Math.round(n*r))),i=o.cloneNode(!0);i.getAttribute("xmlns")||i.setAttribute("xmlns","http://www.w3.org/2000/svg"),i.getAttribute("xmlns:xlink")||i.setAttribute("xmlns:xlink","http://www.w3.org/1999/xlink"),i.setAttribute("width",String(a)),i.setAttribute("height",String(s)),!i.getAttribute("viewBox")&&t>0&&n>0&&i.setAttribute("viewBox",`0 0 ${t} ${n}`);try{let c=Array.from(o.querySelectorAll("*")),m=Array.from(i.querySelectorAll("*"));for(let p=0;p<Math.min(c.length,m.length);p++){let h=c[p],b=m[p];if(!h||!b||!b.style)continue;let A=window.getComputedStyle?window.getComputedStyle(h):null;A&&(A.fill&&A.fill!=="none"&&(b.style.fill=A.fill),A.stroke&&A.stroke!=="none"&&(b.style.stroke=A.stroke),A.strokeWidth&&(b.style.strokeWidth=A.strokeWidth),A.fontFamily&&(b.style.fontFamily=A.fontFamily),A.fontSize&&(b.style.fontSize=A.fontSize),A.fontWeight&&(b.style.fontWeight=A.fontWeight),A.color&&(b.style.color=A.color))}}catch{}let d="#ffffff";try{let c=o.parentElement||o;for(;c&&c!==document.documentElement;){let p=(window.getComputedStyle?window.getComputedStyle(c):null)?.backgroundColor;if(p&&p!=="transparent"&&p!=="rgba(0, 0, 0, 0)"){d=p;break}c=c.parentElement}}catch{}let u=new XMLSerializer().serializeToString(i),f="";try{f=btoa(unescape(encodeURIComponent(u)))}catch{}try{let c=b=>new Promise((A,v)=>{let y=new Image,C=setTimeout(()=>v(new Error("Timeout render SVG")),1200);y.onload=()=>{clearTimeout(C),A(y)},y.onerror=()=>{clearTimeout(C),v(new Error("Falha ao renderizar SVG em Image."))},y.src=b}),m=null;if(f)try{m=await c(`data:image/svg+xml;base64,${f}`)}catch{}if(!m){let b=new Blob([u],{type:"image/svg+xml;charset=utf-8"}),A=URL.createObjectURL(b);try{m=await c(A)}finally{URL.revokeObjectURL(A)}}let p=document.createElement("canvas");p.width=a,p.height=s;let h=p.getContext("2d",{alpha:!1});if(h&&m){h.fillStyle=d,h.fillRect(0,0,a,s),h.drawImage(m,0,0,a,s);let b=await new Promise(A=>{p.toBlob(A,"image/jpeg",.92)});if(b){let A=await de(b);if(A)return{blob:b,base64:A,mediaType:"image/jpeg"}}}}catch{}return{base64:f,mediaType:"image/svg+xml"}}async function xt(o){try{let e=o.getBoundingClientRect(),t=Math.round(e.width)||o.offsetWidth||400,n=Math.round(e.height)||o.offsetHeight||300;if(t<30||n<30)return null;let r=o.tagName.toLowerCase()==="svg"?o:o.querySelector("svg");if(r&&o.querySelectorAll("input, select, textarea").length===0)try{let h=await Yt(r);if(h.base64&&h.base64.length<=Pe)return{mediaType:h.mediaType,base64:h.base64,alt:o.getAttribute("aria-label")||r.getAttribute("aria-label")||"Captura de diagrama/gr\xE1fico",source:"visual_snapshot",captureStatus:"captured",textContext:fe(r)}}catch{}if(o instanceof HTMLCanvasElement)try{let h=await xe(o),b=await de(h);if(b)return{mediaType:"image/jpeg",base64:b,alt:o.getAttribute("aria-label")||"Captura de canvas visual",source:"canvas_snapshot",captureStatus:"captured"}}catch{}let a="#ffffff";try{let h=o;for(;h&&h!==document.documentElement;){let A=(window.getComputedStyle?window.getComputedStyle(h):null)?.backgroundColor;if(A&&A!=="transparent"&&A!=="rgba(0, 0, 0, 0)"){a=A;break}h=h.parentElement}}catch{}let s=o.cloneNode(!0),i=Array.from(o.querySelectorAll("*")),d=Array.from(s.querySelectorAll("*"));for(let h=0;h<Math.min(i.length,d.length);h++){let b=i[h],A=d[h];if(!(!b||!A||!A.style))try{let v=window.getComputedStyle(b);A.style.color=v.color,A.style.backgroundColor=v.backgroundColor,A.style.borderColor=v.borderColor,A.style.borderWidth=v.borderWidth,A.style.borderStyle=v.borderStyle,A.style.fontSize=v.fontSize,A.style.fontFamily=v.fontFamily,A.style.fontWeight=v.fontWeight,A.style.lineHeight=v.lineHeight,A.style.letterSpacing=v.letterSpacing,A.style.textAlign=v.textAlign}catch{}}let l=Math.min(2,Math.max(1,1200/Math.max(t,n))),u=Math.round(t*l),f=Math.round(n*l),c=`
      <svg xmlns="http://www.w3.org/2000/svg" width="${u}" height="${f}" viewBox="0 0 ${t} ${n}">
        <foreignObject width="${t}" height="${n}">
          <div xmlns="http://www.w3.org/1999/xhtml" style="background:${a};width:100%;height:100%;overflow:hidden;box-sizing:border-box;">
            ${s.outerHTML}
          </div>
        </foreignObject>
      </svg>
    `,m=new Blob([c],{type:"image/svg+xml;charset=utf-8"}),p=URL.createObjectURL(m);try{let h=new Image;await new Promise((v,y)=>{let C=setTimeout(()=>y(new Error("Timeout render ForeignObject")),2500);h.onload=()=>{clearTimeout(C),v()},h.onerror=()=>{clearTimeout(C),y(new Error("Falha ao carregar ForeignObject"))},h.src=p});let b=document.createElement("canvas");b.width=u,b.height=f;let A=b.getContext("2d",{alpha:!1});if(A){A.fillStyle=a,A.fillRect(0,0,u,f),A.drawImage(h,0,0,u,f);let v=await new Promise(y=>b.toBlob(y,"image/jpeg",.9));if(v){let y=await de(v);if(y&&y.length<=Pe)return{mediaType:"image/jpeg",base64:y,alt:o.getAttribute("aria-label")||"Captura visual da \xE1rea (print-like)",source:"element_snapshot",captureStatus:"captured",textContext:fe(o)}}}}finally{URL.revokeObjectURL(p)}}catch(e){console.warn("[EasyQuiz] Snapshot visual do n\xF3:",e)}return null}function Wt(o,e,t,n){if(t<=0||n<=0){let c=typeof o.getBoundingClientRect=="function"?o.getBoundingClientRect():{width:0,height:0};if(t=c.width||t,n=c.height||n,t<=0||n<=0){if(e&&/\b(icon|logo|avatar|badge|emoji|spinner|loading)\b/i.test(e))return!1;let p=o instanceof HTMLImageElement&&o.src||"";return p&&/\/icons?\/|\/logos?\/|\/avatars?\/|\/badges?\//i.test(p)?!1:!!(p||e)}}if(t<48||n<48||Math.max(t,n)/Math.max(1,Math.min(t,n))>15)return!1;let a=o.getAttribute("class")||"",s=o.getAttribute("aria-hidden"),i=o.getAttribute("role"),d=o instanceof HTMLImageElement&&o.src||"";if(s==="true"||i==="presentation"||i==="none")return!1;let l=/\b(icon|logo|avatar|badge|emoji|decoration|ornament|spinner|loading|thumbnail|profile|photo)\b/i;if(l.test(a)||e&&l.test(e)||d&&/\/icons?\/|\/logos?\/|\/avatars?\/|\/badges?\/|\/emojis?\//i.test(d)||e===""||e===" "||e==="-")return!1;let u=/\b(graph|chart|diagram|table|map|formula|equation|figure|plot|curve|histogram|scatter|matrix|image|foto|imagem|gráfico|tabela|mapa|fórmula|questão|enunciado|stimulus)\b/i;return u.test(e)||u.test(a)||o.closest('[data-question], [class*="question" i], [class*="prompt" i], [class*="stimulus" i], [class*="enunciado" i], [class*="statement" i], article, .problem, .exercise')?!0:t>=80&&n>=80}function fe(o){let e=[],t=o.getAttribute("alt")||o.getAttribute("aria-label")||o.getAttribute("title")||"";t&&t.length>2&&e.push(`Alt: "${t}"`);let a=o.closest("figure")?.querySelector("figcaption")?.textContent?.trim();a&&a.length>2&&e.push(`Legenda: "${a}"`);let s=o.getAttribute("aria-describedby");if(s){let u=document.getElementById(s)?.textContent?.trim();u&&e.push(`Descri\xE7\xE3o: "${u.slice(0,200)}"`)}let i=o.parentElement;if(i){let l=Q(i.textContent||"",300);l&&l.length>5&&l!==t&&e.push(`Contexto: "${l.slice(0,200)}"`)}if(o.tagName.toLowerCase()==="svg"){let l=Array.from(o.querySelectorAll("text, tspan")).map(u=>u.textContent?.trim()).filter(Boolean);l.length>0&&e.push(`R\xF3tulos/Textos do Gr\xE1fico: "${l.join(" | ")}"`)}let d=o.getAttribute("data-alt")||o.getAttribute("data-description")||"";return d&&e.push(`Data: "${d}"`),e.length===0?"":e.join(" | ")}async function Lo(o){let e=o.currentSrc||o.src;if(!e)return null;let t=(o.alt||o.getAttribute("aria-label")||"Imagem da quest\xE3o").slice(0,500);if(o.complete&&o.naturalWidth>0)try{let s=await xe(o),i=await de(s);if(i&&i.length<=Pe)return{mediaType:"image/jpeg",base64:i,alt:t,source:e.slice(0,2e3),captureStatus:"captured",textContext:fe(o)}}catch{}try{let s=await fetch(e,{mode:"cors"});if(s.ok){let i=await s.blob();if(i.type.startsWith("image/")){let d=await createImageBitmap(i),l=await xe(d);d.close();let u=await de(l);if(u&&u.length<=Pe)return{mediaType:"image/jpeg",base64:u,alt:t,source:e.slice(0,2e3),captureStatus:"captured",textContext:fe(o)}}}}catch{}if(e.startsWith("http")){let s=[`https://corsproxy.io/?${encodeURIComponent(e)}`,`https://api.allorigins.win/raw?url=${encodeURIComponent(e)}`],i=async d=>{let l=new AbortController,u=setTimeout(()=>l.abort(),1500);try{let f=await fetch(d,{signal:l.signal});if(clearTimeout(u),f.ok)return f;throw new Error("Proxy status "+f.status)}catch(f){throw clearTimeout(u),f}};try{let l=await(await Promise.any(s.map(i))).blob();if(l.type.startsWith("image/")||l.size>200){let u=await createImageBitmap(l),f=await xe(u);u.close();let c=await de(f);if(c&&c.length<=Pe)return{mediaType:"image/jpeg",base64:c,alt:t,source:e.slice(0,2e3),captureStatus:"captured",textContext:fe(o)}}}catch{}}let n=o.parentElement||o,r=await xt(n);if(r)return r;let a=fe(o);return a||t?{mediaType:"image/jpeg",base64:"",alt:t,source:e.slice(0,2e3),captureStatus:"text_only",textContext:a||`Imagem da quest\xE3o (src: ${e.slice(0,100)})`}:null}function So(o){return o.querySelectorAll("path, line, polyline, polygon, circle, rect, text, image").length>0}function Mo(o){try{let e=o.style.backgroundImage||(window.getComputedStyle?window.getComputedStyle(o).backgroundImage:"");if(e&&e.includes("url(")){let t=e.match(/url\(["']?([^"')]+)["']?\)/);if(t&&t[1]&&!t[1].startsWith("data:image/svg+xml"))return t[1]}}catch{}return null}function Io(o,e){let t=o.closest('[data-easyquiz-id], button, [role="button"], [role="radio"], [role="checkbox"], [role="option"], label, .option-card, .quiz-option, .choice, .answer, [class*="option" i], [class*="choice" i], [class*="answer" i], li, tr');if(t&&t!==e&&z(t)&&!_(t)&&!F(t)){let a=t.dataset.easyquizId||t.id||void 0,s=Q(t.innerText||t.textContent||"",120),i=t.getAttribute("aria-label")||t.getAttribute("title")||"",d=s||i,l=a?` [id: ${a}]`:"";if(d)return{associatedLabel:`Alternativa/Op\xE7\xE3o: "${d}"${l}`,targetControlId:a};if(a)return{associatedLabel:`Alternativa/Op\xE7\xE3o ${l}`,targetControlId:a}}let n=o.closest("figure")?.querySelector("figcaption")?.textContent?.trim();if(n)return{associatedLabel:`Figura do Enunciado: "${Q(n,100)}"`};let r=o.closest('[class*="prompt" i], [class*="stimulus" i], [class*="question-text" i], [class*="statement" i], header, h1, h2, h3, h4, p');if(r){let a=Q(r.textContent||"",80);if(a)return{associatedLabel:`Gr\xE1fico do Enunciado: "${a}"`}}return{associatedLabel:"Gr\xE1fico/Imagem do Enunciado Principal"}}async function wt(o,e=!0){if(!e)return[];let t=[],n=0,r=35e5,a=(u,f)=>{if(!u)return!1;let c=u.base64?u.base64.length:0;if(c>0&&n+c>r)return!1;let m=Io(f,o);return u.associatedLabel=m.associatedLabel,u.targetControlId=m.targetControlId,u.element=f,t.push(u),n+=c,t.filter(h=>h.captureStatus==="captured").length>=yt},s=[o],i=o.closest('article, .card, [class*="question" i], [class*="exercise" i], form, [data-test-id*="exercise" i], [data-testid*="exercise" i]');i&&i!==o&&i!==document.body&&z(i)&&s.push(i);let d=new Set;for(let u of s){let f=Array.from(u.querySelectorAll("img")).filter(c=>z(c)&&!F(c)&&!d.has(c));for(let c of f){d.add(c);try{let m=c.getBoundingClientRect(),p=c.naturalWidth||m.width||c.width||0,h=c.naturalHeight||m.height||c.height||0,b=c.alt||"";if(!Wt(c,b,p,h))continue;let A=await Lo(c);if(a(A,c))return t}catch{}}}let l=new Set;for(let u of s){let f=Array.from(u.querySelectorAll("svg")).filter(c=>{if(!z(c)||F(c)||l.has(c))return!1;let m=typeof c.getBoundingClientRect=="function"?c.getBoundingClientRect():{width:0,height:0},p=m.width||parseFloat(c.getAttribute("width")||"0"),h=m.height||parseFloat(c.getAttribute("height")||"0");return p<30||h<30?!1:So(c)});for(let c of f){l.add(c);try{let m=await Yt(c);if(m.base64){let p=fe(c),h={mediaType:m.mediaType,base64:m.base64,alt:c.getAttribute("aria-label")||"Gr\xE1fico/Diagrama vetorial da quest\xE3o",source:"svg",captureStatus:"captured",textContext:p};if(a(h,c))return t}}catch{let m=c.closest('.trig-diagram-container, [class*="diagram" i], [class*="graph" i], figure')||c.parentElement||c,p=await xt(m);if(p){if(a(p,c))return t}else{let h=fe(c);if(h){let b={mediaType:"image/jpeg",base64:"",alt:c.getAttribute("aria-label")||"Gr\xE1fico vetorial",source:"svg",captureStatus:"text_only",textContext:h};a(b,c)}}}}}if(t.filter(u=>u.captureStatus==="captured").length<yt){let u=Array.from(o.querySelectorAll("canvas")).filter(f=>z(f)&&!F(f));for(let f of u)try{let c=await xe(f),m=await de(c);if(m){let p={mediaType:"image/jpeg",base64:m,alt:f.getAttribute("aria-label")||"Gr\xE1fico Canvas inline",source:"canvas",captureStatus:"captured"};if(a(p,f))return t}}catch{let c=await xt(f.parentElement||f);if(a(c,f))return t}}if(t.filter(u=>u.captureStatus==="captured").length<yt){let u=Array.from(o.querySelectorAll('[style*="background-image"], .option-image, .question-media')).filter(f=>z(f)&&!F(f));for(let f of u){let c=Mo(f);if(!c)continue;let m=f.getBoundingClientRect();if(Wt(f,f.getAttribute("aria-label")||"",m.width,m.height))try{let p=await fetch(c,{mode:"cors"});if(p.ok){let h=await p.blob();if(h.type.startsWith("image/")){let b=await createImageBitmap(h),A=await xe(b);b.close();let v=await de(A);if(v){let y={mediaType:"image/jpeg",base64:v,alt:"Imagem de fundo da alternativa",source:c.slice(0,2e3),captureStatus:"captured"};if(a(y,f))return t}}}}catch{try{let h=await(await fetch(c,{mode:"no-cors"})).blob();if(h.size>100){let b=await createImageBitmap(h),A=await xe(b);b.close();let v=await de(A);if(v&&v.length>100){let y={mediaType:"image/jpeg",base64:v,alt:"Imagem CSS background",source:c.slice(0,2e3),captureStatus:"captured"};if(a(y,f))return t}}}catch{}}}}return t}function Ho(o,e=""){if(typeof document>"u")return!1;let t=o||document.body,n=(e+" "+(t.textContent||"")).toLowerCase();return!!t.querySelector('.celebration-icon, [class*="celebrat" i], [class*="conclu" i], [class*="finish" i], [class*="result" i], [class*="score-screen" i], [data-testid*="completion" i], [data-functional-selector*="game-over" i], .perseus-message-renderer, [data-congratulations]')&&(n.includes("parab\xE9ns")||n.includes("conclu")||n.includes("finaliz")||n.includes("resultado")||n.includes("pontua")||n.includes("sucesso")||n.includes("\u{1F3C6}")||n.includes("game over")||n.includes("great job"))?!0:["parab\xE9ns! lista de exerc\xEDcios conclu\xEDda","exerc\xEDcios conclu\xEDda","lista de exerc\xEDcios conclu\xEDda","atividade conclu\xEDda","atividade finalizada","finalizado com sucesso","finalizada com sucesso","simulado conclu\xEDdo","simulado finalizado","question\xE1rio conclu\xEDdo","question\xE1rio finalizado","voc\xEA concluiu a atividade","voc\xEA concluiu o question\xE1rio","sua resposta foi registrada","todas as perguntas foram respondidas","quiz completed","exercise completed","activity completed","all questions answered","view results","game over","leaderboard","scoreboard","awesome","great job","you got it right","mission complete","your response has been recorded","sua resposta foi registrada"].some(s=>n.includes(s))}var We=class{active=!1;callbacks;isProcessing=!1;observer=null;mutationTimer=null;heartbeatTimer=null;abortController=null;errorCount=0;resolvedSigs=new Set;advancedSigs=new Set;hasPendingMutationDuringProcessing=!1;lastContentSig="";lastAttemptSig="";lastAttemptTime=0;replanCount=new Map;constructor(e){this.callbacks=e}isActive(){return this.active}start(){this.active||(this.active=!0,this.advancedSigs.clear(),this.hasPendingMutationDuringProcessing=!1,this.callbacks.onStatusChange("waiting","> [SYS] Autopilot ENGAGED. Monitorando..."),typeof MutationObserver<"u"&&(this.observer=new MutationObserver(()=>{if(this.active){if(this.isProcessing){this.hasPendingMutationDuringProcessing=!0;return}this.mutationTimer&&clearTimeout(this.mutationTimer),this.mutationTimer=window.setTimeout(()=>{this.mutationTimer=null,this.isProcessing||this.checkAndAnalyze()},120)}}),this.observer.observe(document.body,{subtree:!0,childList:!0,characterData:!0,attributes:!0})),this.scheduleHeartbeat(),this.checkAndAnalyze())}stop(){if(this.active=!1,this.abortController){try{this.abortController.abort()}catch{}this.abortController=null}this.mutationTimer&&(clearTimeout(this.mutationTimer),this.mutationTimer=null),this.heartbeatTimer&&(clearTimeout(this.heartbeatTimer),this.heartbeatTimer=null),this.observer?.disconnect(),this.observer=null,this.isProcessing=!1,this.resolvedSigs.clear(),this.advancedSigs.clear(),this.hasPendingMutationDuringProcessing=!1,this.replanCount.clear(),this.callbacks.onStatusChange("idle","> [SYS] Autopilot DESATIVADO pelo usu\xE1rio.","text-yellow")}scheduleHeartbeat(){this.heartbeatTimer&&clearTimeout(this.heartbeatTimer),this.heartbeatTimer=window.setTimeout(()=>{this.heartbeatTimer=null,this.active&&!this.isProcessing&&this.checkAndAnalyze(),this.active&&this.scheduleHeartbeat()},3e3)}sleep(e){return new Promise(t=>{if(!this.active)return t();let n=null,r=()=>{n&&clearTimeout(n),t()};n=window.setTimeout(t,e),this.abortController?.signal.addEventListener("abort",r,{once:!0})})}async checkAndAnalyze(){if(!(!this.active||this.isProcessing))try{this.isProcessing=!0;let e=pe(!1);if(e||(e=ce()),!this.active)return;if(!e){this.callbacks.onStatusChange("waiting","> [SYS] Monitorando p\xE1gina... Aguardando elementos.");return}if(Ho(e.scope,e.questionText)){this.callbacks.onStatusChange("idle","> [SYS] \u{1F3C6} Atividade conclu\xEDda! Autopilot finalizado.","text-green"),this.stop();return}if(this.callbacks.isManualModeActive?.()){this.callbacks.onStatusChange("waiting","> [SYS] Gabarito manual ativo. Aguardando voc\xEA avan\xE7ar...","text-yellow");return}let t=pt(e);if(this.resolvedSigs.has(t))return;let n=Date.now();if(t===this.lastAttemptSig&&n-this.lastAttemptTime<1500)return;if(t!==this.lastContentSig){if(this.callbacks.onStatusChange("waiting","> [SYS] Aguardando estabiliza\xE7\xE3o da p\xE1gina...","text-yellow"),await this.sleep(600),!this.active)return;let i=pe(!1)||ce();i&&(e=i,t=pt(e)),this.lastContentSig!==""&&(this.callbacks.onStatusChange("waiting","> [SYS] Nova quest\xE3o detectada! Analisando...","text-green"),this.callbacks.onPageAdvance?.(),this.errorCount=0)}this.lastContentSig=t,this.lastAttemptSig=t,this.lastAttemptTime=n;let a=e.controls.filter(i=>i.role==="answer"),s=Ue(e.questionText);if(a.length===0&&s){this.callbacks.onStatusChange("waiting","> [DOM] Quest\xE3o identificada. Aguardando renderiza\xE7\xE3o dos controles...","text-yellow");for(let i=0;i<14;i++){if(await this.sleep(250),!this.active)return;let d=pe(!1)||ce();if(d&&d.controls.filter(l=>l.role==="answer").length>0){e=d,a=e.controls.filter(l=>l.role==="answer");break}}}if(a.length>0||s){if(this.callbacks.onStatusChange("analyzing","> [IA] Quest\xE3o detectada. Consultando IA...","text-blue"),ge(),e?.scope&&ze(e.scope),!this.active)return;this.abortController=new AbortController;let i=await this.callbacks.onRequestAnalysis(1,this.abortController.signal);if(this.abortController=null,!this.active)return;if(i){if(this.callbacks.onStatusChange("analyzing",`> [IA] (${i.usedModel||"gemini"}) Confian\xE7a: ${(i.confidence*100).toFixed(1)}% | Modo: ${i.mode}`,"text-blue"),this.callbacks.onStatusChange("analyzing",`> [IA] Racioc\xEDnio: ${i.rationale}`,"text-blue"),this.callbacks.onStatusChange("analyzing",`> [IA] A\xE7\xF5es: ${i.actions.length}`,"text-blue"),this.errorCount=0,i.memoryToStore&&this.callbacks.onStatusChange("analyzing",`> [IA] \u{1F9E0} Mem\xF3ria RAG: "${i.memoryToStore}"`,"text-yellow"),i.pageType==="conclusion"){this.callbacks.onStatusChange("idle","> [SYS] Atividade conclu\xEDda! Desligando Autopilot.","text-green"),this.stop();return}if(i.actions.length===0){let l=(this.replanCount.get(t)||0)+1;if(this.replanCount.set(t,l),l<3){this.callbacks.onStatusChange("waiting",`> [AVISO] Nenhuma resposta formulada para esta quest\xE3o. Retentando (${l}/3)...`,"text-yellow"),await this.sleep(1200),this.lastAttemptTime=0;return}}let d=(this.replanCount.get(t)||0)+1;this.replanCount.set(t,d),(i.actions.length>0||d>=3)&&this.resolvedSigs.add(t)}else{this.errorCount++;let d=this.errorCount===1?3e3:5e3;this.callbacks.onStatusChange("waiting",`> [AVISO] Falha na an\xE1lise (${this.errorCount}). Retentando em ${d/1e3}s...`,"text-yellow"),await this.sleep(d),this.lastAttemptTime=0}}else{if(this.advancedSigs.has(t)||(this.callbacks.onStatusChange("analyzing","> [IA] P\xE1gina informativa ou texto de leitura. Consultando IA...","text-blue"),!this.active))return;this.abortController=new AbortController;let i=await this.callbacks.onRequestAnalysis(1,this.abortController.signal);if(this.abortController=null,!this.active)return;if(i){if(this.callbacks.onStatusChange("analyzing",`> [IA] (${i.usedModel||"gemini"}) Tipo: ${i.pageType} | Modo: ${i.mode}`,"text-blue"),this.callbacks.onStatusChange("analyzing",`> [IA] Racioc\xEDnio: ${i.rationale}`,"text-blue"),i.memoryToStore&&this.callbacks.onStatusChange("analyzing",`> [IA] \u{1F9E0} Absorvido: "${i.memoryToStore}"`,"text-yellow"),i.pageType==="conclusion"){this.callbacks.onStatusChange("idle","> [SYS] Atividade conclu\xEDda! Desligando Autopilot.","text-green"),this.stop();return}i.pageType==="info"?(this.callbacks.onStatusChange("advancing","> [IA] \u{1F4D6} Leitura conclu\xEDda. Avan\xE7ando com seguran\xE7a...","text-green"),await this.sleep(500)):i.pageType==="start"&&(this.callbacks.onStatusChange("advancing","> [SYS] In\xEDcio detectado. Iniciando...","text-blue"),await this.sleep(500)),this.errorCount=0,this.resolvedSigs.add(t),this.advancedSigs.add(t)}else{this.errorCount++;let d=this.errorCount===1?3e3:5e3;this.callbacks.onStatusChange("waiting",`> [AVISO] Falha ao processar p\xE1gina (${this.errorCount}). Retentando em ${d/1e3}s...`,"text-yellow"),await this.sleep(d),this.lastAttemptTime=0}}this.errorCount>=5&&(this.callbacks.onStatusChange("waiting","> [AVISO] Muitas falhas. Reiniciando contadores e aguardando 10s...","text-yellow"),this.errorCount=0,this.lastAttemptTime=0,await this.sleep(1e4))}catch(e){if(!this.active)return;let t=e instanceof Error?e.message:String(e);if(t.includes("cancelada")||t.includes("aborted"))return;/timeout|aborted|network|failed to fetch|cancelad/i.test(t)||this.errorCount++,console.warn("[EasyQuiz Autopilot]",e),this.callbacks.onStatusChange("error",`> [ERRO NO AUTOPILOT] ${t}`,"text-red")}finally{this.abortController=null,this.isProcessing=!1;let e=this.hasPendingMutationDuringProcessing;this.hasPendingMutationDuringProcessing=!1,this.active&&window.setTimeout(()=>void this.checkAndAnalyze(),e?300:750)}}};var S={canvasLogo:"data:image/png;base64,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dR/4337uYwwdXhTSKDB5oWAsGwgYGodS2wpYM8gEplWlTok0HWlElUTRdKKJ6My0nSYVScooVdtkmrZMOpkyk6JpQwKhDQEaJSkwBGPj2BiDjS+Xa7DMNROLJBBnwNg8z54/7Avn3vuctc/Lfln7tz8fCSH57LPPPmvte/f53v1b5zRt27YFAACApbu1aZpXTH0QS3Yw9QEAAAAAAjoAAACkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACh1MfAFTgM03TXDn1QQAAAPPmDjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAIC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",logo:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.8L19.2 8 12 11.2 4.8 8 12 4.8zM4 9.6l7 3.1v7.5l-7-3.5V9.6zm9 10.6v-7.5l7-3.1v7.1l-7 3.5z"/></svg>',rocket:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M13.13 2.81a.5.5 0 0 0-.46-.07c-.42.15-2.08.79-3.9 2.61-2.04 2.04-2.6 4.09-2.73 4.96l-.97.98a1 1 0 0 0-.29.71v2.12a1 1 0 0 0 .29.71l2.83 2.83a1 1 0 0 0 .71.29h2.12a1 1 0 0 0 .71-.29l.98-.97c.87-.13 2.92-.69 4.96-2.73 1.82-1.82 2.46-3.48 2.61-3.9a.5.5 0 0 0-.07-.46l-6.79-6.79zM4.5 16.5l-2.09 2.09a.5.5 0 0 0 .35.85h3.04l.35.35v3.04a.5.5 0 0 0 .85.35L9.09 21.1l-4.59-4.6z"/></svg>',play:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>',stop:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h12v12H6z"/></svg>',code:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>',terminal:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8h16v10zm-12-3l3-3-3-3 1.4-1.4L13.8 12l-4.4 4.4L8 15zm6 0h4v2h-4v-2z"/></svg>',inspector:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>',settings:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.49.49 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>',key:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M7 14c-2.76 0-5-2.24-5-5s2.24-5 5-5c2.42 0 4.44 1.72 4.9 4H22v4h-2v3h-3v-3h-2v3h-3v-3h-2.1c-.46 2.28-2.48 4-4.9 4zm0-7c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>',paste:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 2h-4.18C14.4 .84 13.3 0 12 0c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm7 18H5V4h2v3h10V4h2v16z"/></svg>',edit:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>',trash:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>',eraser:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M15.14 3c-.51 0-1.02.2-1.41.59L2.59 14.73c-.78.78-.78 2.05 0 2.83L6.44 21.4c.78.78 2.05.78 2.83 0l11.14-11.14c.78-.78.78-2.05 0-2.83l-3.86-3.84c-.39-.39-.9-.59-1.41-.59zm.71 2.71l3.15 3.15-3.15 3.15-3.15-3.15 3.15-3.15zm-4.57 4.57l3.15 3.15-4.57 4.57H6.71l-3-3 7.57-7.57z"/></svg>',save:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/></svg>',analyze:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L3 14h8l-2 8 12-12h-8l2-8z"/></svg>',apply:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>',close:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>',chevronRight:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>',chevronDown:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/></svg>',chevronLeft:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>',eye:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>',eyeOff:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.44-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.17c0-1.66-1.34-3-3-3l-.17.02z"/></svg>',check:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>',info:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>',clock:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>',copy:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>',refresh:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg>',chip:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4h12v16H6V4zm2 2v12h8V6H8zm-4 3h2v2H4V9zm0 4h2v2H4v-2zm16-4h2v2h-2V9zm0 4h2v2h-2v-2zM9 2h2v2H9V2zm4 0h2v2h-2V2zm-4 18h2v2H9v-2zm4 0h2v2h-2v-2z"/></svg>',moreVertical:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>',minimize:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M19 13H5v-2h14v2z"/></svg>',maximize:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/></svg>',dragHandle:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M10 9h4V6h-4v3zm0 5h4v-3h-4v3zm0 5h4v-3h-4v3zM4 9h4V6H4v3zm0 5h4v-3H4v3zm0 5h4v-3H4v3zm12-10V6h4v3h-4zm0 5h4v-3h-4v3zm0 5h4v-3h-4v3z"/></svg>',list:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/></svg>',folderTree:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6 10H6v-2h8v2zm4-4H6v-2h12v2z"/></svg>',folder:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/></svg>',file:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>',stopwatch:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M15 1H9v2h6V1zm-4 13h2V8h-2v6zm8.03-6.61l1.42-1.42c-.43-.51-.9-.99-1.41-1.41l-1.42 1.42A8.962 8.962 0 0 0 12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9a8.994 8.994 0 0 0 7.03-14.61zM12 20c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"/></svg>',plus:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>',listPlus:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h8v-2H7v2zm0 4h8v-2H7v2zM7 7v2h8V7H7zm11 6h-2v2h-2v2h2v2h2v-2h2v-2h-2v-2z"/></svg>',sparkles:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M9 21l-2.5-5.5L1 13l5.5-2.5L9 5l2.5 5.5L17 13l-5.5 2.5L9 21zm9.5-12.5l-1.5-3.5-3.5-1.5 3.5-1.5 1.5-3.5 1.5 3.5 3.5 1.5-3.5 1.5-1.5 3.5z"/></svg>',image:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>'};var Ye=class{element=null;shadow;isMinimized=!1;currentPlan=null;isDragging=!1;dragStartX=0;dragStartY=0;initialLeft=25;initialTop=25;onAdvanceCallback;constructor(e,t){this.shadow=e,this.onAdvanceCallback=t,this.initGlobalListeners()}initGlobalListeners(){window.addEventListener("popstate",()=>this.handlePageNavigated()),window.addEventListener("hashchange",()=>this.handlePageNavigated()),document.addEventListener("click",e=>{if(!this.isOpen())return;let t=e.target;if(!t||this.shadow.contains(t)||t.closest("#easyquiz-shadow-root"))return;let n=t.closest('button, [role="button"], a, input[type="submit"]');if(n){let r=(n.textContent||n.value||"").toLowerCase();/pr[oó]xim|avan[cç]|continu|verific|enviar|submit|confirm|checar|validar|next/i.test(r)&&setTimeout(()=>{this.isOpen()&&this.handlePageNavigated()},800)}},!0)}handlePageNavigated(){this.isOpen()&&(this.hide(),this.onAdvanceCallback?.())}isOpen(){return this.element!==null&&this.element.style.display!=="none"}show(e){this.currentPlan=e,this.element||this.createElement(),this.renderContent(),this.element&&(this.element.style.display="flex")}hide(){this.element&&(this.element.style.display="none")}minimize(){this.isMinimized=!0,this.element&&this.element.classList.add("minimized")}restore(){this.isMinimized=!1,this.element&&this.element.classList.remove("minimized")}createElement(){this.element=document.createElement("div"),this.element.className="eq-floating-hud",this.element.style.left=`${this.initialLeft}px`,this.element.style.top=`${this.initialTop}px`,this.element.innerHTML=`
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
    `,this.shadow.appendChild(this.element),this.element.querySelector("#eq-fah-pill").addEventListener("click",()=>this.restore()),this.element.querySelector("#eq-fah-min-btn").addEventListener("click",()=>this.minimize()),this.element.querySelector("#eq-fah-close-btn").addEventListener("click",()=>this.hide());let r=this.element.querySelector("#eq-fah-copy-md-btn");r.addEventListener("click",()=>this.copyMarkdownToClipboard(r));let a=this.element.querySelector("#eq-fah-copy-all-btn");a.addEventListener("click",()=>this.copyMarkdownToClipboard(a));let s=this.element.querySelector("#eq-fah-header");this.setupDraggable(s)}setupDraggable(e){let t=n=>{if(n.target.closest(".eq-fah-btn"))return;n.preventDefault(),this.isDragging=!0,this.dragStartX=n.clientX,this.dragStartY=n.clientY;let r=this.element.getBoundingClientRect();this.initialLeft=r.left,this.initialTop=r.top;let a=i=>{if(!this.isDragging||!this.element)return;let d=i.clientX-this.dragStartX,l=i.clientY-this.dragStartY,u=Math.max(10,window.innerWidth-this.element.offsetWidth-10),f=Math.max(10,window.innerHeight-this.element.offsetHeight-10),c=Math.min(Math.max(10,this.initialLeft+d),u),m=Math.min(Math.max(10,this.initialTop+l),f);this.element.style.left=`${c}px`,this.element.style.top=`${m}px`},s=()=>{this.isDragging=!1,window.removeEventListener("mousemove",a),window.removeEventListener("mouseup",s)};window.addEventListener("mousemove",a),window.addEventListener("mouseup",s)};e.addEventListener("mousedown",t)}renderContent(){if(!this.element||!this.currentPlan)return;let e=this.element.querySelector("#eq-fah-body"),t=this.element.querySelector("#eq-fah-pill-text"),n=this.element.querySelector("#eq-fah-pill-badge");e.innerHTML="";let r=this.currentPlan,a=r.actions.filter(m=>m.t==="drag"),s=r.actions.filter(m=>{if(m.t!=="val")return!1;let p=L(m.id||"").toLowerCase();return!/continu|avan[cç]|pr[oó]xim|submet|enviar|check|verific/i.test(p)}),i=r.actions.filter(m=>m.t==="clk"||m.t==="chk"),d=r.actions.filter(m=>m.t==="sel"),l=a.length||s.length||i.length||d.length,u=document.createElement("div");u.className="eq-fah-meta";let f=document.createElement("span");f.textContent=`Modo: ${r.mode.replace("_"," ")}`;let c=document.createElement("span");if(c.className="eq-fah-meta-badge",c.textContent=`${Math.round(r.confidence*100)}% Confian\xE7a`,u.append(f,c),e.appendChild(u),a.length>0||r.mode==="categorizacao"||r.mode==="arrastar_soltar"){t.textContent=`Categoriza\xE7\xE3o (${a.length} itens)`,n.textContent=String(a.length);let m={};for(let p of a){let h=L(p.to)||"Geral";m[h]||(m[h]=[]),m[h].push(L(p.from))}for(let[p,h]of Object.entries(m)){let b=document.createElement("div"),A=/fato|true|verdadeiro|sim/i.test(p),v=/opini[aã]o|false|falso|n[aã]o/i.test(p);b.className=`eq-fah-group ${A?"group-fato":v?"group-opiniao":""}`;let y=document.createElement("div");y.className="eq-fah-group-title",y.textContent=`\u{1F4C1} ${p} (${h.length})`,b.appendChild(y);let C=document.createElement("div");C.className="eq-fah-group-items";for(let q of h){let x=document.createElement("div");x.className="eq-fah-item";let E=document.createElement("span");E.className="eq-fah-item-text",E.textContent=q,x.appendChild(E);let k=document.createElement("button");k.className="eq-fah-copy-inline",k.textContent="Copiar",k.addEventListener("click",()=>{navigator.clipboard.writeText(q),k.textContent="\u2713 Copiado",setTimeout(()=>k.textContent="Copiar",1200)}),x.appendChild(k),C.appendChild(x)}b.appendChild(C),e.appendChild(b)}}else if(s.length>0){t.textContent=`Preenchimento (${s.length} campos)`,n.textContent=String(s.length);let m=document.createElement("div");m.className="eq-fah-group";let p=document.createElement("div");p.className="eq-fah-group-title",p.textContent="\u{1F4DD} Respostas para os Campos de Texto:",m.appendChild(p);let h=document.createElement("div");h.className="eq-fah-group-items";for(let b=0;b<s.length;b++){let A=s[b],v=document.createElement("div");v.className="eq-fah-item";let y=Ie(A.id);(!y||/^[#\.\$]|input|mat-|cell|field|q[0-9]|eq-/i.test(y))&&(y=`Campo ${b+1}`);let C=String(A.v??""),q=document.createElement("div");q.className="eq-fah-field-box";let x=document.createElement("div");x.className="eq-fah-field-label",x.textContent=y,q.appendChild(x);let E=document.createElement("div");E.className="eq-fah-field-val",E.textContent=C,q.appendChild(E),v.appendChild(q);let k=document.createElement("button");k.className="eq-fah-copy-inline",k.textContent="Copiar",k.addEventListener("click",()=>{navigator.clipboard.writeText(C),k.textContent="\u2713 Copiado",setTimeout(()=>k.textContent="Copiar",1200)}),v.appendChild(k),h.appendChild(v)}m.appendChild(h),e.appendChild(m)}else if(i.length>0){t.textContent=`Op\xE7\xF5es (${i.length} marcadas)`,n.textContent=String(i.length);let m=document.createElement("div");m.className="eq-fah-group";let p=document.createElement("div");p.className="eq-fah-group-title",p.textContent="\u{1F3AF} Alternativa(s) Correta(s):",m.appendChild(p);let h=document.createElement("div");h.className="eq-fah-group-items";for(let b=0;b<i.length;b++){let A=i[b],v=document.createElement("div");v.className="eq-fah-item";let y=Ie(A.id);(!y||/^(eq-|#|\$|\.|input_|mat-|choice_|radio_|chk_)/i.test(y))&&A.v&&(y=String(A.v)),y=L(y),/^(eq-|#|\$|\.|input_|mat-|choice_|radio_|chk_)/i.test(y)&&(y="");let C="",q=y.match(/^(\([A-Za-z0-9]\)|[A-Za-z0-9][\)\.\:\-])\s*(.*)$/);q?(C=q[1].replace(/[\(\)\.\:\-\s]/g,"").toUpperCase(),y=q[2].trim()||y):i.length>1&&(C=String.fromCharCode(65+b));let x=document.createElement("div");if(x.style.display="flex",x.style.alignItems="center",x.style.gap="8px",x.style.flex="1",C){let w=document.createElement("span");w.className="eq-fah-letter-badge",w.textContent=C,x.appendChild(w)}let E=document.createElement("span");E.className="eq-fah-item-text",E.textContent=y||(C?`Alternativa ${C}`:"Alternativa Selecionada"),x.appendChild(E),v.appendChild(x);let k=document.createElement("button");k.className="eq-fah-copy-inline",k.textContent="Copiar",k.addEventListener("click",()=>{navigator.clipboard.writeText(y||C),k.textContent="\u2713 Copiado",setTimeout(()=>k.textContent="Copiar",1200)}),v.appendChild(k),h.appendChild(v)}m.appendChild(h),e.appendChild(m)}else if(d.length>0){t.textContent=`Sele\xE7\xE3o (${d.length} listas)`,n.textContent=String(d.length);let m=document.createElement("div");m.className="eq-fah-group";let p=document.createElement("div");p.className="eq-fah-group-title",p.textContent="\u{1F4CB} Op\xE7\xF5es para Selecionar na Lista:",m.appendChild(p);let h=document.createElement("div");h.className="eq-fah-group-items";for(let b=0;b<d.length;b++){let A=d[b],v=document.createElement("div");v.className="eq-fah-item";let y=Ie(A.id);(!y||/^[#\.\$]|select|input|mat-|cell|field|q[0-9]|eq-/i.test(y))&&(y=`Lista ${b+1}`);let x=(Array.isArray(A.v)?A.v:[String(A.v??"")]).map(I=>{let T=P(A.id,void 0,!0)||P(L(A.id),void 0,!0),H=T instanceof HTMLSelectElement?T:T?.querySelector("select");if(H){let O=L(I).toLowerCase();for(let N=0;N<H.options.length;N++){let R=H.options[N];if(R.value.toLowerCase()===O||L(R.textContent).toLowerCase()===O){let U=L(R.textContent);if(U&&!U.toLowerCase().includes("selecione"))return U}}}return I}).join(", "),E=document.createElement("div");E.className="eq-fah-field-box";let k=document.createElement("div");k.className="eq-fah-field-label",k.textContent=y,E.appendChild(k);let w=document.createElement("div");w.className="eq-fah-field-val",w.textContent=x,E.appendChild(w),v.appendChild(E);let M=document.createElement("button");M.className="eq-fah-copy-inline",M.textContent="Copiar",M.addEventListener("click",()=>{navigator.clipboard.writeText(x),M.textContent="\u2713 Copiado",setTimeout(()=>M.textContent="Copiar",1200)}),v.appendChild(M),h.appendChild(v)}m.appendChild(h),e.appendChild(m)}else{t.textContent="Gabarito",n.textContent="0";let m=document.createElement("div");m.style.padding="10px",m.style.color="#888",m.textContent="Nenhuma resposta direta para exibir.",e.appendChild(m)}if(r.rationale){let m=document.createElement("div");m.className="eq-fah-rationale",m.textContent=`\u{1F4A1} Racioc\xEDnio da IA: ${r.rationale}`,e.appendChild(m)}}generateMarkdown(){if(!this.currentPlan)return"";let e=this.currentPlan,t=[];t.push("# Gabarito da Quest\xE3o \u2014 EasyQuiz Pro"),t.push(`- **Modo:** ${e.mode}`),t.push(`- **Confian\xE7a:** ${(e.confidence*100).toFixed(0)}%`),t.push("");let n=e.actions.filter(i=>i.t==="drag"),r=e.actions.filter(i=>i.t==="val"),a=e.actions.filter(i=>i.t==="clk"||i.t==="chk"),s=e.actions.filter(i=>i.t==="sel");if(n.length>0){t.push("## \u{1F4C2} Categoriza\xE7\xE3o:");let i={};for(let d of n){let l=L(d.to)||"Geral";i[l]||(i[l]=[]),i[l].push(L(d.from))}for(let[d,l]of Object.entries(i)){t.push(`### Categoria: ${d}`);for(let u of l)t.push(`- ${u}`);t.push("")}}else if(r.length>0){t.push("## \u270F\uFE0F Respostas para Preenchimento:");for(let i of r){let d=L(i.id);t.push(`- **${d||"Campo"}:** \`${i.v}\``)}t.push("")}else if(a.length>0){t.push("## \u2705 Alternativas Corretas:");for(let i=0;i<a.length;i++){let d=a[i],l=Ie(d.id);(!l||/^(eq-|#|\$|\.|input_|mat-|choice_|radio_|chk_)/i.test(l))&&d.v&&(l=String(d.v)),l=L(l),/^(eq-|#|\$|\.|input_|mat-|choice_|radio_|chk_)/i.test(l)&&(l="");let u=a.length>1?`${String.fromCharCode(65+i)}) `:"";t.push(`- [x] ${u}${l||"Alternativa "+String.fromCharCode(65+i)}`)}t.push("")}else if(s.length>0){t.push("## \u{1F4CB} Op\xE7\xF5es Selecionadas em Lista:");for(let i of s){let d=L(i.id)||"Lista",l=Array.isArray(i.v)?i.v.join(", "):String(i.v??"");t.push(`- **${d}:** \`${l}\``)}t.push("")}return e.rationale&&(t.push("---"),t.push(`**\u{1F4A1} Racioc\xEDnio:** ${e.rationale}`)),t.join(`
`)}copyMarkdownToClipboard(e){let t=this.generateMarkdown();t&&navigator.clipboard.writeText(t).then(()=>{let n=e.innerHTML;e.id==="eq-fah-copy-md-btn"?e.innerHTML='<span style="font-size:10px; color:#00ffcc; font-weight:bold;">\u2713</span>':e.innerHTML="\u2713 Copiado!",setTimeout(()=>{e.innerHTML=n},1500)})}};var Zt=`
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
    background: transparent;
    border: 1px solid transparent;
    border-radius: 12px;
    color: rgba(255,255,255,0.72);
    cursor: pointer;
    transition: transform 0.2s ease, border-color 0.2s ease, background 0.2s ease, color 0.2s ease;
    box-shadow: none;
  }

  .eq-activity-btn:hover {
    color: #ffffff;
    background: rgba(255,255,255,0.04);
    border-color: rgba(255,255,255,0.08);
    transform: translateX(2px);
  }

  .eq-activity-btn.active {
    color: #111111;
    background: #ffffff;
    border-color: rgba(255,255,255,0.25);
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
    border: none;
    background: transparent;
    padding: 0;
    color: var(--eq-icon-accent);
    display: flex;
    align-items: center;
  }

  .eq-brand-icon img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    filter: none;
    opacity: 1;
  }

  #eq-view-resolver {
    background: rgba(16, 18, 22, 0.9);
    color: #f4f7fb;
    padding: 18px;
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 18px;
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.03);
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
    background: transparent;
    border: none;
    box-shadow: none;
    flex-shrink: 0;
  }

  .eq-brand-mark img {
    width: 52px;
    height: 52px;
    object-fit: contain;
    filter: none;
    opacity: 0.96;
  }

  .eq-brand-copy {
    min-width: 0;
  }

  .eq-brand-title {
    color: #f4f7fb;
    font-size: 28px;
    font-weight: 900;
    line-height: 1;
    letter-spacing: 0.02em;
  }

  .eq-brand-subline {
    margin-top: 7px;
    color: rgba(223, 231, 243, 0.7);
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

  .eq-more-btn,
  .eq-more-btn-inline {
    width: 38px;
    height: 38px;
    min-width: 38px;
    background: #ffffff;
    border: 1px solid rgba(15,15,15,0.12);
    color: #111111;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .eq-more-btn:hover,
  .eq-more-btn-inline:hover {
    background: #f5f5f5;
    border-color: rgba(15,15,15,0.2);
    transform: translateY(-1px);
  }


  /* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
     CTA WRAPPER  (two separate standalone buttons)
  \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
  .eq-cta-wrapper {
    display: flex;
    gap: 8px;
    margin: 0 0 10px;
    align-items: stretch;
    position: relative;
  }

  /* \u2500\u2500 PRIMARY AUTOPILOT BUTTON \u2500\u2500 */
  .eq-resolve-primary {
    flex: 1;
    min-height: 50px;
    background: #f0e6c8;
    border: none;
    border-radius: 4px;
    color: #3a2e18;
    font-weight: 800;
    font-size: 13px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 9px;
    padding: 0 16px;
    position: relative;
    overflow: hidden;
    outline: none;
    transition: background 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
    box-shadow: 0 2px 8px rgba(200,160,80,0.2);
  }

  .eq-resolve-primary:hover {
    background: #e8dab8;
    box-shadow: 0 4px 14px rgba(200,160,80,0.3);
  }

  /* Icon inside autopilot button \u2014 absolutely positioned, fixed left */
  .eq-resolve-primary {
    padding: 0 16px 0 48px; /* left padding makes room for abs icon */
  }

  .eq-resolve-primary .eq-btn-icon {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    width: 22px;
    height: 22px;
    filter: none;
    z-index: 2;
    flex-shrink: 0;
  }

  .eq-resolve-primary .eq-btn-icon svg {
    fill: url(#geminiGradient) !important;
    width: 100%;
    height: 100%;
    display: block;
  }

  /* \u2500\u2500 Apple/Google-quality icon glow ring when processing \u2500\u2500 */
  .eq-resolve-primary.danger .eq-btn-icon {
    /* orbit halo via ::before, inner pulse via ::after */
  }

  .eq-resolve-primary.danger .eq-btn-icon::before {
    content: '';
    position: absolute;
    inset: -6px;
    border-radius: 50%;
    background: conic-gradient(
      from var(--eq-orbit-angle, 0deg),
      transparent 0deg,
      rgba(66,133,244,0.8) 60deg,
      rgba(155,114,203,0.9) 120deg,
      rgba(217,101,112,0.8) 180deg,
      transparent 230deg,
      transparent 360deg
    );
    animation: eq-icon-orbit 2s linear infinite;
    z-index: -1;
    mask-image: radial-gradient(transparent 60%, black 62%);
    -webkit-mask-image: radial-gradient(transparent 60%, black 62%);
  }

  .eq-resolve-primary.danger .eq-btn-icon::after {
    content: '';
    position: absolute;
    inset: -3px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(155,114,203,0.4) 0%, transparent 70%);
    animation: eq-icon-pulse 1.8s ease-in-out infinite alternate;
    z-index: -1;
  }

  @keyframes eq-icon-orbit {
    0%   { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  @keyframes eq-icon-pulse {
    0%   { opacity: 0.5; transform: scale(0.9); }
    100% { opacity: 1;   transform: scale(1.2); }
  }

  .eq-btn-label {
    display: inline-block;
    white-space: nowrap;
    position: relative;
    z-index: 2;
  }

  /* RUNNING STATE: transparent bg + shimmer */
  .eq-resolve-primary.danger {
    background: transparent !important;
    color: #edf3ff;
    box-shadow: none;
    border: 1px solid rgba(255,255,255,0.1);
  }

  /* Shimmer + radial glow overlay */
  .eq-btn-shimmer {
    display: none;
    position: absolute;
    inset: 0;
    background: linear-gradient(
      110deg,
      rgba(66,133,244,0.0) 10%,
      rgba(155,114,203,0.35) 45%,
      rgba(217,101,112,0.25) 65%,
      rgba(66,133,244,0.0) 90%
    );
    background-size: 250% 100%;
    animation: eq-shimmer-move 2s linear infinite;
    pointer-events: none;
    border-radius: inherit;
  }

  /* Radial glow that breathes while processing */
  .eq-btn-shimmer::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at 50% 120%, rgba(155,114,203,0.25) 0%, transparent 70%);
    animation: eq-glow-breathe 2.2s ease-in-out infinite alternate;
    border-radius: inherit;
  }

  @keyframes eq-glow-breathe {
    0%   { opacity: 0.4; transform: scaleX(0.85); }
    100% { opacity: 1;   transform: scaleX(1.1); }
  }

  .eq-resolve-primary.danger .eq-btn-shimmer {
    display: block;
  }

  @keyframes eq-shimmer-move {
    0%   { background-position: 250% 0; }
    100% { background-position: -250% 0; }
  }

  /* \u2500\u2500 PING-PONG LINE: smooth translateX-based, no abrupt jumps \u2500\u2500 */
  .eq-cta-progress-line {
    position: absolute;
    bottom: -5px;
    left: 0;
    right: 58px;
    height: 2px;
    background: rgba(255,255,255,0.06);
    overflow: hidden;
    border-radius: 2px;
    pointer-events: none;
  }

  /* Track segment using translateX \u2014 guaranteed smooth, no position jumps */
  .eq-cta-progress-line::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 35%;
    background: linear-gradient(90deg, transparent 0%, rgba(155,114,203,0.35) 50%, transparent 100%);
    border-radius: 2px;
    /* translateX(0) \u2192 translateX(186%): 186 = (100/35)*65 \u2248 moves width across track */
    animation: eq-slide-idle 4s cubic-bezier(0.37, 0, 0.63, 1) infinite alternate;
  }

  .eq-cta-wrapper.is-running .eq-cta-progress-line {
    background: rgba(255,255,255,0.04);
  }

  .eq-cta-wrapper.is-running .eq-cta-progress-line::after {
    background: linear-gradient(90deg, transparent 0%, #9B72CB 40%, #4285F4 70%, transparent 100%);
    animation: eq-slide-run 1.6s cubic-bezier(0.37, 0, 0.63, 1) infinite alternate;
  }

  @keyframes eq-slide-idle {
    0%   { transform: translateX(0%); opacity: 0.45; }
    50%  { opacity: 0.65; }
    100% { transform: translateX(186%); opacity: 0.45; }
  }

  @keyframes eq-slide-run {
    0%   { transform: translateX(0%); opacity: 0.8; }
    100% { transform: translateX(186%); opacity: 1; }
  }

  /* \u2500\u2500 3-DOT SHELL (wrapper: button + floating menu as siblings) \u2500\u2500 */
  .eq-menu-shell {
    position: relative;
    display: flex;
    flex-shrink: 0;
    overflow: visible;
  }

  /* \u2500\u2500 3-DOT MENU BUTTON (white bg, standalone) \u2500\u2500 */
  .eq-resolve-menu {
    width: 50px;
    min-width: 50px;
    min-height: 50px;
    background: #ffffff;
    border: none;
    border-radius: 4px;
    color: #1a1a1a;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: relative;
    outline: none;
    flex-shrink: 0;
    box-shadow: 0 2px 8px rgba(0,0,0,0.12);
    transition: background 0.2s ease, box-shadow 0.2s ease;
  }

  .eq-resolve-menu:hover,
  .eq-resolve-menu.is-open {
    background: #f0f0f0;
    box-shadow: 0 4px 14px rgba(0,0,0,0.18);
  }

  /* \u2500\u2500 CONTEXT MENU (transparent + backdrop blur) \u2500\u2500 */
  .eq-resolver-context-menu {
    position: absolute;
    top: calc(100% + 6px);
    right: 0;
    min-width: 210px;
    background: rgba(12, 12, 14, 0.50);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 6px;
    box-shadow: 0 12px 36px rgba(0,0,0,0.55);
    padding: 6px;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    gap: 2px;
    backdrop-filter: blur(24px) saturate(150%);
    -webkit-backdrop-filter: blur(24px) saturate(150%);
    animation: eq-menu-appear 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    transform-origin: top right;
    opacity: 0;
  }

  .eq-resolver-context-menu[hidden] { display: none !important; }

  /* Smooth open */
  @keyframes eq-menu-appear {
    0%   { opacity: 0; transform: translateY(-8px) scale(0.94); }
    60%  { opacity: 1; transform: translateY(2px)  scale(1.01); }
    100% { opacity: 1; transform: translateY(0)    scale(1);    }
  }

  .eq-menu-item {
    appearance: none;
    border: 1px solid transparent;
    background: transparent;
    color: #d8dde8;
    border-radius: 4px;
    padding: 9px 12px;
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    text-align: left;
    font-size: 12px;
    font-weight: 600;
    transition: background 0.15s ease, color 0.15s ease;
  }

  .eq-menu-item:hover {
    background: rgba(255,255,255,0.07);
    color: #fff;
  }

  .eq-btn-icon, .eq-menu-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    flex-shrink: 0;
    filter: brightness(1.2);
    transition: transform 0.25s ease;
  }

  /* \u2500\u2500 STATUS BAR (always-minimal single line) \u2500\u2500 */
  .eq-status-bar {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 10px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 4px;
    margin-bottom: 10px;
    min-height: 32px;
  }

  .eq-status-bar-text {
    flex: 1;
    font-size: 11px;
    color: rgba(234,240,248,0.7);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.3;
  }

  .eq-status-bar-timer {
    font-style: normal;
    font-size: 10px;
    color: rgba(234,240,248,0.4);
    font-weight: 600;
    flex-shrink: 0;
  }

  /* \u2500\u2500 RESULT SECTION (collapsible) \u2500\u2500 */
  .eq-result-toggle {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 4px;
    color: #c2ccd8;
    font-size: 11px;
    font-weight: 700;
    padding: 7px 12px;
    cursor: pointer;
    text-align: left;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    outline: none;
    transition: background 0.2s ease;
    margin-bottom: 4px;
  }

  .eq-result-toggle:hover { background: rgba(255,255,255,0.07); }

  .eq-result-toggle-icon {
    display: inline-flex;
    align-items: center;
    width: 13px;
    height: 13px;
    transition: transform 0.2s ease;
    flex-shrink: 0;
    color: #93c5fd;
  }

  .eq-result-toggle.is-open .eq-result-toggle-icon {
    transform: rotate(90deg);
  }

  .eq-result-body {
    padding: 4px 0 0;
    overflow: hidden;
    max-height: 2000px;
    transition: max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1),
                opacity 0.25s ease,
                padding 0.25s ease;
    opacity: 1;
  }

  .eq-result-body.is-collapsed {
    max-height: 0;
    opacity: 0;
    padding: 0;
  }

  /* \u2500\u2500 DOT PULSE (in status bar) \u2500\u2500 */
  .eq-dot-pulse {
    width: 7px;
    height: 7px;
    border-radius: 999px;
    background: #5ad88b;
    flex-shrink: 0;
    box-shadow: 0 0 0 3px rgba(90,216,139,0.15);
    animation: eq-status-dot-pulse 1.8s ease-in-out infinite;
  }

  .eq-dot-pulse.busy  { background: #7bb5ff; box-shadow: 0 0 0 3px rgba(123,181,255,0.18); }
  .eq-dot-pulse.error { background: #ff7d7d; box-shadow: 0 0 0 3px rgba(255,125,125,0.18); }
  .eq-dot-pulse.stopped { background: #ffd166; box-shadow: 0 0 0 3px rgba(255,209,102,0.18); }

  @keyframes eq-status-dot-pulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50%       { transform: scale(1.3); opacity: 0.7; }
  }

  /* \u2500\u2500 OPERATION STATE PILL \u2500\u2500 */
  #eq-view-resolver .eq-operation-state {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    border: 1px solid rgba(255,255,255,0.1);
    background: rgba(255,255,255,0.04);
    color: #edf3ff;
    border-radius: 999px;
    padding: 3px 9px;
    min-height: 20px;
    font-size: 9px;
    font-weight: 800;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    transition: all 0.2s ease;
    flex-shrink: 0;
    white-space: nowrap;
  }

  #eq-view-resolver .eq-operation-state.is-busy    { color: #b9d4ff; background: rgba(123,181,255,0.12); border-color: rgba(123,181,255,0.22); }
  #eq-view-resolver .eq-operation-state.is-success { color: #baf7cf; background: rgba(90,216,139,0.10);  border-color: rgba(90,216,139,0.20);  }
  #eq-view-resolver .eq-operation-state.is-error   { color: #ffb1b1; background: rgba(255,125,125,0.10); border-color: rgba(255,125,125,0.20); }
  #eq-view-resolver .eq-operation-state.is-warning { color: #ffd977; background: rgba(255,209,102,0.10); border-color: rgba(255,209,102,0.20); }
  #eq-view-resolver .eq-operation-state.is-info    { color: #9dd1ff; background: rgba(147,197,253,0.10); border-color: rgba(147,197,253,0.20); }


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
    overflow: hidden; /* n\xE3o scrolla o wrapper \u2014 o pane interno \xE9 que scrolla */
    display: flex;
    flex-direction: column;
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

  /* cada pane preenche 100% do wrapper e tem scroll pr\xF3prio */
  .eq-view-pane {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 16px;
    overflow-y: auto;
    overflow-x: hidden;
    min-height: 0;
  }

  /* scrollbar fina no pane (mesmo estilo do wrapper antigo) */
  .eq-view-pane::-webkit-scrollbar { width: 3px; }
  .eq-view-pane::-webkit-scrollbar-track { background: transparent; }
  .eq-view-pane::-webkit-scrollbar-thumb { background: var(--eq-surface-hover); border-radius: 2px; }



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


  /* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
     VS CODE BRAIN EXPLORER \u2014 v4
  \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */

  .eq-brain-pane {
    flex-direction: column;
    padding: 0 !important;
    gap: 0 !important;
    overflow: hidden !important;
    min-height: 0;
  }

  /* Brain pane fills the entire wrapper when active */
  .eq-views-wrapper.is-brain-active {
    overflow: hidden !important;
  }

  .eq-views-wrapper.is-brain-active > .eq-brain-pane {
    flex: 1;
    height: 100%;
    display: flex !important;
  }

  .eq-brain-toolbar {
    display:flex; align-items:center; justify-content:space-between;
    padding:5px 8px; border-bottom:1px solid rgba(255,255,255,0.06);
    flex-shrink:0; min-height:34px;
  }

  .eq-brain-toolbar-title {
    font-size:10px; font-weight:700; letter-spacing:0.1em;
    color:rgba(234,240,248,0.38); text-transform:uppercase;
  }

  .eq-brain-toolbar-actions { display:flex; gap:2px; }

  .eq-brain-layout { display:flex; flex-direction:column; flex:1; min-height:0; overflow:hidden; }

  /* \u2500\u2500 CANVAS (fixed height, resizable, toggleable) \u2500\u2500 */
  .eq-brain-canvas {
    height: 280px;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border-bottom: 1px solid rgba(255,255,255,0.07);
    transition: opacity 0.25s ease;
  }

  .eq-brain-canvas.is-hidden {
    height: 0 !important;
    opacity: 0;
    pointer-events: none;
    border-bottom: none;
  }

  /* Tab bar */
  .eq-brain-tabbar {
    display:flex; align-items:stretch;
    border-bottom:1px solid rgba(255,255,255,0.06);
    background:rgba(0,0,0,0.12);
    overflow-x:auto; overflow-y:hidden;
    flex-shrink:0; min-height:30px;
    scrollbar-width:thin; scrollbar-color:rgba(255,255,255,0.1) transparent;
  }
  .eq-brain-tabbar::-webkit-scrollbar { height:2px; position:absolute; }
  .eq-brain-tabbar::-webkit-scrollbar-track { background:transparent; }
  .eq-brain-tabbar::-webkit-scrollbar-thumb { background:rgba(255,255,255,0.14); border-radius:1px; }
  .eq-brain-tabbar::-webkit-scrollbar-thumb:hover { background:rgba(255,255,255,0.26); }

  .eq-brain-tab {
    display:flex; align-items:center; gap:5px; padding:0 10px;
    border-right:1px solid rgba(255,255,255,0.05); cursor:pointer;
    font-size:11.5px; color:rgba(234,240,248,0.42);
    white-space:nowrap; user-select:none;
    transition:background 0.12s,color 0.12s;
    min-width:90px; max-width:150px; flex-shrink:0;
  }
  .eq-brain-tab:hover { background:rgba(255,255,255,0.04); color:rgba(234,240,248,0.82); }
  .eq-brain-tab.is-active { background:rgba(255,255,255,0.06); color:rgba(234,240,248,0.96); border-bottom:2px solid #4285F4; }
  .eq-brain-tab-icon { display:inline-flex; align-items:center; flex-shrink:0; opacity:0.45; }
  .eq-brain-tab-label { overflow:hidden; text-overflow:ellipsis; flex:1; }
  .eq-brain-tab-close {
    background:none; border:none; color:inherit;
    display:inline-flex; align-items:center; padding:0 2px;
    cursor:pointer; opacity:0; transition:opacity 0.12s; flex-shrink:0;
  }
  .eq-brain-tab:hover .eq-brain-tab-close,
  .eq-brain-tab.is-active .eq-brain-tab-close { opacity:0.5; }
  .eq-brain-tab-close:hover { opacity:1!important; }

  /* Content */
  .eq-brain-content {
    flex:1; overflow-y:auto; overflow-x:hidden;
    background:rgba(0,0,0,0.04);
    scrollbar-width:thin; scrollbar-color:rgba(255,255,255,0.1) transparent;
  }
  .eq-brain-content::-webkit-scrollbar { width:3px; }
  .eq-brain-content::-webkit-scrollbar-track { background:transparent; }
  .eq-brain-content::-webkit-scrollbar-thumb { background:rgba(255,255,255,0.13); border-radius:2px; }

  .eq-brain-empty-canvas {
    display:flex; flex-direction:column; align-items:center; justify-content:center;
    height:100%; min-height:55px; gap:5px;
    color:rgba(234,240,248,0.18); font-size:12px; text-align:center; padding:12px;
  }
  .eq-brain-empty-sub { font-size:10px; color:rgba(234,240,248,0.12); }

  /* Resize handle */
  .eq-brain-resize-handle {
    height:5px; flex-shrink:0; cursor:ns-resize;
    background:linear-gradient(to bottom,rgba(255,255,255,0.05) 0%,transparent 100%);
    transition:background 0.15s; position:relative;
  }
  .eq-brain-resize-handle:hover { background:rgba(66,133,244,0.25); }
  .eq-brain-resize-handle::after {
    content:''; position:absolute; left:50%; top:50%;
    transform:translate(-50%,-50%);
    width:28px; height:2px; border-radius:1px;
    background:rgba(255,255,255,0.18);
  }

  /* File view */
  .eq-brain-file-view { display:flex; flex-direction:column; height:100%; }
  .eq-brain-file-header {
    display:flex; align-items:center; padding:3px 12px;
    border-bottom:1px solid rgba(255,255,255,0.04);
    background:rgba(0,0,0,0.08); flex-shrink:0;
  }
  .eq-brain-file-lang {
    font-size:9px; font-weight:700; color:rgba(234,240,248,0.22);
    text-transform:uppercase; letter-spacing:0.08em;
  }

  /* Code (raw) */
  .eq-brain-code {
    margin:0; padding:10px 14px;
    font-family:'JetBrains Mono',Consolas,monospace;
    font-size:11.5px; line-height:1.65; color:rgba(220,235,255,0.88);
    overflow:visible; white-space:pre-wrap; word-break:break-word;
    flex:1; background:transparent; border:none; tab-size:2;
  }

  /* Markdown */
  .eq-brain-markdown { padding:12px 16px; font-size:12px; line-height:1.7; color:rgba(234,240,248,0.88); flex:1; }
  .eq-md-h1 { font-size:15px; font-weight:700; color:rgba(234,240,248,0.96); margin:12px 0 6px; padding-bottom:4px; border-bottom:1px solid rgba(255,255,255,0.08); }
  .eq-md-h2 { font-size:13.5px; font-weight:700; color:rgba(234,240,248,0.9); margin:10px 0 4px; }
  .eq-md-h3 { font-size:12.5px; font-weight:600; color:rgba(234,240,248,0.85); margin:8px 0 3px; }
  .eq-md-p  { margin:3px 0; }
  .eq-md-gap { height:6px; }
  .eq-md-inline {
    font-family:'JetBrains Mono',Consolas,monospace; font-size:10.5px;
    background:rgba(255,255,255,0.08); padding:1px 5px; border-radius:3px; color:#93c5fd;
  }
  .eq-md-codeblock { background:rgba(0,0,0,0.25); border-radius:5px; margin:6px 0; overflow:hidden; border:1px solid rgba(255,255,255,0.06); }
  .eq-md-codelang {
    font-size:9px; font-weight:700; color:rgba(234,240,248,0.28); text-transform:uppercase;
    letter-spacing:0.06em; padding:3px 10px; border-bottom:1px solid rgba(255,255,255,0.05);
    background:rgba(0,0,0,0.15);
  }
  .eq-md-codeblock pre {
    margin:0; padding:8px 10px;
    font-family:'JetBrains Mono',Consolas,monospace; font-size:11px;
    line-height:1.6; color:rgba(220,235,255,0.88); white-space:pre-wrap; word-break:break-word;
  }
  .eq-md-bq { border-left:3px solid rgba(66,133,244,0.5); padding:3px 10px; margin:4px 0; color:rgba(234,240,248,0.6); font-style:italic; }
  .eq-md-hr { border:none; height:1px; background:rgba(255,255,255,0.08); margin:8px 0; }
  .eq-md-li { display:flex; gap:6px; margin:2px 0; padding-left:4px; }
  .eq-md-bullet { color:rgba(66,133,244,0.8); flex-shrink:0; }

  /* Folder overview */
  .eq-folder-view { padding:8px 10px; }
  .eq-folder-view-header {
    display:flex; align-items:center; gap:6px;
    font-size:12.5px; font-weight:600; color:rgba(234,240,248,0.72);
    padding-bottom:7px; border-bottom:1px solid rgba(255,255,255,0.05); margin-bottom:5px;
  }
  .eq-folder-view-row {
    display:flex; align-items:center; gap:8px; padding:5px 8px;
    border-radius:4px; cursor:pointer; font-size:12px; color:rgba(234,240,248,0.58);
    transition:background 0.1s,color 0.1s; user-select:none;
  }
  .eq-folder-view-row:hover { background:rgba(255,255,255,0.06); color:rgba(234,240,248,0.9); }

  /* \u2500\u2500 EXPLORER (adaptive height with scroll) \u2500\u2500 */
  .eq-brain-explorer {
    flex: 1;
    min-height: 80px;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 3px 0;
    background: transparent;
    scrollbar-width: thin;
    scrollbar-color: rgba(255,255,255,0.08) transparent;
  }
  .eq-brain-explorer::-webkit-scrollbar { width:2px; }
  .eq-brain-explorer::-webkit-scrollbar-track { background:transparent; }
  .eq-brain-explorer::-webkit-scrollbar-thumb { background:rgba(255,255,255,0.12); border-radius:1px; }

  .eq-brain-empty-tree { padding:10px; font-size:11.5px; color:rgba(234,240,248,0.26); font-style:italic; }

  /* Global node */
  .eq-tree-global { padding-left:8px!important; color:rgba(156,210,255,0.7)!important; font-weight:600; border-bottom:1px solid rgba(255,255,255,0.04); margin-bottom:1px; }
  .eq-tree-global:hover { color:rgba(156,210,255,0.95)!important; background:rgba(66,133,244,0.08)!important; }
  .eq-tree-global.is-selected { color:#89c8ff!important; border-left-color:#60a5fa!important; background:rgba(66,133,244,0.14)!important; }

  .eq-tree-sep { height:1px; background:rgba(255,255,255,0.05); margin:2px 0; }

  .eq-tree-folder {
    display:flex; align-items:center; gap:3px; padding:4px 6px;
    font-size:12.5px; color:rgba(234,240,248,0.76);
    user-select:none; white-space:nowrap; overflow:hidden;
    cursor:default; transition:background 0.1s;
  }
  .eq-tree-folder:hover { background:rgba(255,255,255,0.04); }
  .eq-tree-folder.is-folder-sel { background:rgba(255,255,255,0.07); }

  .eq-tree-arrow {
    width:16px; flex-shrink:0; display:inline-flex; align-items:center;
    cursor:pointer; color:rgba(234,240,248,0.36); padding:2px; border-radius:2px;
    transition:background 0.1s,color 0.1s;
  }
  .eq-tree-arrow:hover { background:rgba(255,255,255,0.1); color:rgba(234,240,248,0.7); }

  .eq-tree-ficon { display:inline-flex; align-items:center; flex-shrink:0; width:16px; transition:color 0.1s; }
  .eq-tree-ficon svg { display:block; }

  /* Smooth collapse */
  .eq-tree-children {
    overflow:hidden; max-height:0; opacity:0;
    transition:max-height 0.24s cubic-bezier(0.4,0,0.2,1), opacity 0.2s cubic-bezier(0.4,0,0.2,1);
  }
  .eq-tree-children.is-open { max-height:calc(var(--child-count,6)*27px + 6px); opacity:1; }

  .eq-tree-file {
    display:flex; align-items:center; gap:5px; padding:3px 6px 3px 30px;
    cursor:pointer; font-size:12px; color:rgba(234,240,248,0.54);
    user-select:none; transition:background 0.1s,color 0.1s; white-space:nowrap; overflow:hidden;
  }
  .eq-tree-file:hover { background:rgba(255,255,255,0.05); color:rgba(234,240,248,0.9); }
  .eq-tree-file.is-selected { background:rgba(66,133,244,0.18); color:#b9d4ff; border-left:2px solid #4285F4; padding-left:28px; }

  .eq-tree-label { overflow:hidden; text-overflow:ellipsis; flex:1; }

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
`;var Oe="v3.0.3";var $t=(()=>{try{if(typeof window.trustedTypes?.createPolicy=="function")return window.trustedTypes.createPolicy("easyquiz-ui#html",{createHTML:o=>o})}catch{}return null})();function zo(o,e){try{if($t){o.innerHTML=$t.createHTML(e);return}}catch{}try{if(typeof o.setHTMLUnsafe=="function"){o.setHTMLUnsafe(e);return}}catch{}o.innerHTML=e}var Po=[{value:"",label:"Detec\xE7\xE3o Autom\xE1tica"},{value:"escolha_unica",label:"M\xFAltipla Escolha (\xDAnica)"},{value:"escolha_multipla",label:"M\xFAltipla Escolha (V\xE1rias)"},{value:"categorizacao",label:"Categoriza\xE7\xE3o / Grupos"},{value:"arrastar_soltar",label:"Arrastar e Soltar (Drag & Drop)"},{value:"ordenacao",label:"Ordena\xE7\xE3o / Sequ\xEAncia"},{value:"verdadeiro_falso",label:"Verdadeiro / Falso"},{value:"texto_livre",label:"Texto Livre / Dissertativa"},{value:"preenchimento",label:"Preenchimento de Lacunas"}],Oo=[{value:"smart",label:"Inteligente (Auto-H\xEDbrido)"},{value:"command",label:"Apenas Comando (Seguro)"},{value:"javascript",label:"Apenas JS Nativo (Avan\xE7ado)"}],Ze=class{host;shadow;callbacks;autopilot;floatingAnswers;initialSettings;isCollapsed=!1;activeTab="resolver";isBusy=!1;stopwatchInterval=null;stopwatchStartTime=0;latestPlan=null;latestContext=null;latestImages=[];latestImageDescriptions=[];latestPromptText="";metricsLiveTime;metricsLiveStatus;metricsTotalBadge;metricTotalTime;metricAvgTime;metricTotalCount;metricsHistoryList;metricsHistoryCount;metricsCopyBtn;metricsResetBtn;currentQuestionStartTime=0;questionLiveTimerInterval=null;liveDebugTerminal;dbgModel;dbgLatency;dbgSplitTokens;dbgTotalTokens;dbgErrorCard;dbgErrorText;dbgPromptLen;dbgPromptView;dbgContextView;dbgRawRespView;dbgCountAll;dbgCountError;dbgCountAi;dbgCountDom;logEntries=[];activeLogFilter="all";autoScrollLogs=!0;lastErrorMsg=null;_autopilotAnalyzingShown=!1;progressContainer;progressBar;progressLabel;progressVal;contextTreeContainer;launcherBtn;launcherDot;dockToggleBtn;sidebarEl;apToggleBtn;apConsole;executionConsole;dotPulseAp;statusTextAp;stopwatchAp;dotPulseAdv;statusTextAdv;stopwatchAdv;inspModel;inspLatency;inspTokens;inspPrompt;inspRationale;inspActions;copyPromptBtn=null;apiKeyInput;keyContextMenu;keyMoreBtn;keysListEl;keysBadgeEl;modelSelect;modeSelect;engineSelect;dryRunCheckbox;autoApplyCheckbox;autoAdvanceCheckbox;hostDarkModeCheckbox;useVisionCheckbox;toastStackingCheckbox;analyzeBtn;applyBtn;resultContainer;constructor(e,t){this.initialSettings=e,this.callbacks=t,this.autopilot=new We({onStatusChange:(i,d,l)=>{this.logToConsole(d,l),i==="analyzing"?this._autopilotAnalyzingShown||(this._autopilotAnalyzingShown=!0,this.setBusy(!0,"Autopilot: IA analisando...")):i==="advancing"||i==="waiting"?(this._autopilotAnalyzingShown=!1,this.setBusy(!1),this.updateAutopilotUi(!0)):i==="idle"?(this._autopilotAnalyzingShown=!1,this.setBusy(!1),this.updateAutopilotUi(!1),d.includes("conclus\xE3o")||d.includes("finalizada")||d.includes("Parab\xE9ns")?this.setStatus("Atividade conclu\xEDda. Resolver Autopilot finalizado com sucesso.","success"):this.setStatus("Resolver Autopilot pausado e aguardando nova a\xE7\xE3o.","info")):i==="error"&&(this._autopilotAnalyzingShown=!1,this.setBusy(!1),this.updateAutopilotUi(!1),this.setStatus("Resolver Autopilot interrompido por erro.","error"))},onRequestAnalysis:async(i,d)=>{try{return await this.callbacks.onAnalyze(i,d,!0)||null}catch{return null}},isManualModeActive:()=>this.floatingAnswers?.isOpen()??!1,onPageAdvance:()=>{this.floatingAnswers?.hide()}}),this.host=document.createElement("div"),this.host.id="easyquiz-shadow-root",this.host.style.position="fixed",this.host.style.top="0",this.host.style.left="0",this.host.style.width="100vw",this.host.style.height="100vh",this.host.style.zIndex="2147483647",this.host.style.pointerEvents="none",this.shadow=this.host.attachShadow({mode:"open"}),zo(this.shadow,`
      <svg width="0" height="0" style="position:absolute;">
        <defs>
          <linearGradient id="geminiGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#4285F4"/>
            <stop offset="50%" stop-color="#9B72CB"/>
            <stop offset="100%" stop-color="#D96570"/>
          </linearGradient>
        </defs>
      </svg>
      <style>${Zt}</style>

      <!-- Launcher m\xEDnimo: apenas o controle para abrir/recolher o painel. -->
      <button class="eq-launcher" type="button" title="Abrir / Recolher painel EasyQuiz (Alt+Q)" aria-label="Abrir ou esconder painel EasyQuiz">
        <span class="eq-launcher-icon">${S.chevronRight}</span>
        <span class="eq-launcher-dot" id="eq-launcher-dot" aria-hidden="true"></span>
      </button>

      <!-- Sidebar Fixa Lateral Direita Estilo VS Code -->
      <aside class="eq-sidebar" aria-label="EasyQuiz Sidebar">
        <!-- Aba Retr\xE1til na Borda Esquerda -->
        <button class="eq-dock-toggle" id="eq-dock-toggle" type="button" title="Recolher / Expandir Painel (Alt+Q)">
          <span class="eq-dock-toggle-icon">${S.chevronRight}</span>
        </button>
           <!-- Activity Bar Vertical na Esquerda (Estilo VS Code - Apenas \xCDcones) -->
          <nav class="eq-activity-bar" role="tablist" aria-label="Atalhos">
            <div class="eq-activity-top">
              <button class="eq-activity-btn active" id="eq-tab-resolver" role="tab" title="Resolver (Opera\xE7\xF5es Atuais)">
                <span class="eq-activity-indicator"></span>
                <span class="eq-activity-icon">${S.sparkles}</span>
              </button>

              <button class="eq-activity-btn" id="eq-tab-brain" role="tab" title="C\xE9rebro da IA (Contexto e Inspe\xE7\xE3o)">
                <span class="eq-activity-indicator"></span>
                <span class="eq-activity-icon">${S.inspector}</span>
              </button>

              <button class="eq-activity-btn" id="eq-tab-metrics" role="tab" title="M\xE9tricas & Cron\xF4metro (Tempo por Quest\xE3o e Hist\xF3rico)">
                <span class="eq-activity-indicator"></span>
                <span class="eq-activity-icon">${S.clock}</span>
              </button>

              <button class="eq-activity-btn" id="eq-tab-debug" role="tab" title="Terminal & Debug Output (Logs, Tokens, Prompts, Erros)">
                <span class="eq-activity-indicator"></span>
                <span class="eq-activity-icon">${S.code}</span>
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
            <!-- Cabe\xE7alho do painel Legacy -->
            <header class="eq-header">
              <div class="eq-brand">
                <span class="eq-brand-icon"><img src="${S.canvasLogo}" alt="EasyQuiz" /></span>
                <span class="eq-brand-name">EasyQuiz</span>
                <span class="eq-brand-badge">BETA</span>
                <span class="eq-brand-version">${Oe}</span>
                <span id="eq-active-model-badge" style="display:none; font-size:9px; font-weight:700; padding:1px 5px; border-radius:3px; background:rgba(251,191,36,0.14); border:1px solid rgba(251,191,36,0.4); color:#fbbf24; letter-spacing:0.04em; white-space:nowrap;"></span>
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
                <div class="eq-resolver-hero">
                  <div class="eq-resolver-brand">
                    <span class="eq-brand-mark"><img src="${S.canvasLogo}" alt="EQ Legacy" /></span>
                    <div class="eq-brand-copy">
                      <div class="eq-brand-title">EQ Legacy</div>
                      <div class="eq-brand-subline">BETA \u2022 ${Oe}</div>
                    </div>
                  </div>
                </div>

                <!-- CTA: Autopilot + 3-dot as SEPARATE standalone buttons -->
                <div class="eq-cta-wrapper">
                  <button class="eq-resolve-primary" id="eq-analyze-btn" type="button">
                    <span class="eq-btn-icon">${S.sparkles}</span>
                    <span class="eq-btn-label">Resolver Autopilot</span>
                    <span class="eq-btn-shimmer" aria-hidden="true"></span>
                  </button>
                  <!-- 3-dot shell: button + floating menu as siblings -->
                  <div class="eq-menu-shell">
                    <button class="eq-resolve-menu" id="eq-auto-menu-btn" type="button" aria-label="Mais op\xE7\xF5es" title="Mais op\xE7\xF5es">
                      <span class="eq-btn-icon">${S.moreVertical}</span>
                    </button>
                    <div class="eq-resolver-context-menu" id="eq-auto-menu" hidden>
                      <button type="button" class="eq-menu-item" data-auto-action="toggle">
                        <span class="eq-menu-icon">${S.sparkles}</span>
                        <span>Resolver Autopilot</span>
                      </button>
                      <button type="button" class="eq-menu-item" data-auto-action="memory">
                        <span class="eq-menu-icon">${S.eraser}</span>
                        <span>Limpar mem\xF3ria</span>
                      </button>
                      <button type="button" class="eq-menu-item" data-auto-action="status">
                        <span class="eq-menu-icon">${S.info}</span>
                        <span>Mostrar status</span>
                      </button>
                    </div>
                  </div>
                  <!-- Animated ping-pong line (visible only when running) -->
                  <div class="eq-cta-progress-line" id="eq-cta-progress-line" aria-hidden="true"></div>
                </div>

                <!-- STATUS BAR: always minimal single line -->
                <div class="eq-status-bar" id="eq-status-card">
                  <span class="eq-dot-pulse" id="eq-dot-ap"></span>
                  <span class="eq-status-bar-text" id="eq-status-summary">Sistema aguardando.</span>
                  <span class="eq-operation-state" id="eq-operation-state">Pronto</span>
                  <em class="eq-status-bar-timer" id="eq-stopwatch-ap"><span>--</span></em>
                </div>

                <!-- RESULTS: collapsible -->
                <div id="eq-result" class="eq-operation-result" style="display: none; flex-direction: column; gap: 0;">
                  <button class="eq-result-toggle" id="eq-result-toggle" type="button">
                    <span class="eq-result-toggle-icon">${S.chevronRight}</span>
                    <span>Plano e respostas</span>
                    <div class="eq-badges" id="eq-badges" style="margin-left:auto;"></div>
                  </button>
                  <div class="eq-result-body" id="eq-result-body">
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
                </div>

                <!-- Console Terminal Oculto (Apenas para Autopilot Interno) -->
                <div class="eq-terminal" id="eq-ap-console" style="display: none;"></div>
                <div class="eq-terminal eq-terminal-execution" id="eq-execution-console" style="display: none;"></div>
                
                <div class="eq-footer-note" style="margin-top: auto;">${Oe} \u2022 H\xEDbrido 4.0 (RAG + AST + Vision)</div>
              </div>

              <!-- TAB 2: C\xC9REBRO DA IA \u2014 VS Code Explorer -->
              <div class="eq-view-pane eq-brain-pane" id="eq-view-brain" style="display: none;">
                <!-- Toolbar -->
                <div class="eq-brain-toolbar">
                  <span class="eq-brain-toolbar-title">C\xC9REBRO DA IA</span>
                  <div class="eq-brain-toolbar-actions">
                    <button class="eq-icon-btn" id="eq-brain-canvas-toggle" type="button" title="Mostrar/Ocultar visualizador">${S.eye}</button>
                    <button class="eq-icon-btn" id="eq-copy-prompt-btn" type="button" title="Copiar conte\xFAdo selecionado">${S.copy}</button>
                  </div>
                </div>
                <!-- Main layout: canvas top, explorer bottom -->
                <div class="eq-brain-layout">
                  <!-- TOP: Tab Canvas -->
                  <div class="eq-brain-canvas">
                    <div class="eq-brain-tabbar" id="eq-brain-tabbar"></div>
                    <div class="eq-brain-content" id="eq-brain-content">
                      <div class="eq-brain-empty-canvas">
                        <div class="eq-brain-empty-icon"></div>
                        <div>Nada selecionado</div>
                        <div class="eq-brain-empty-sub">Clique em um item no explorador abaixo</div>
                      </div>
                    </div>
                  </div>
                  <!-- Resize handle -->
                  <div class="eq-brain-resize-handle" id="eq-brain-resize-handle" title="Arrastar para redimensionar"></div>
                  <!-- BOTTOM: File Tree -->
                  <div class="eq-brain-explorer" id="eq-brain-explorer">
                    <div class="eq-brain-empty-tree">Aguardando an\xE1lise...</div>
                  </div>
                </div>
                <!-- Hidden compat holders -->
                <span id="eq-insp-model" style="display:none;"></span>
                <span id="eq-insp-latency" style="display:none;"></span>
                <span id="eq-insp-tokens" style="display:none;"></span>
                <span id="eq-insp-prompt" style="display:none;"></span>
                <span id="eq-insp-rationale" style="display:none;"></span>
                <div id="eq-insp-actions" style="display:none;"></div>
              </div><!-- FIX: FECHAMENTO eq-view-brain -->


              <!-- TAB 3: M\xC9TRICAS & CRON\xD4METRO -->
              <div class="eq-view-pane" id="eq-view-metrics" style="display: none; gap:0; padding: 0;">

                <!-- Header compacto -->
                <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 14px 6px;border-bottom:1px solid rgba(255,255,255,0.06);flex-shrink:0;">
                  <div style="display:flex;align-items:center;gap:8px;">
                    <span style="display:inline-flex;color:#0098ff;opacity:0.85;">${S.clock}</span>
                    <span style="font-size:12px;font-weight:700;color:#e0e0e0;letter-spacing:0.02em;">M\xE9tricas & Cron\xF4metro</span>
                  </div>
                  <span id="eq-metrics-total-badge" style="font-size:9px;font-weight:700;padding:2px 7px;border-radius:10px;background:rgba(0,152,255,0.13);border:1px solid rgba(0,152,255,0.25);color:#0098ff;letter-spacing:0.04em;">0 QUEST\xD5ES</span>
                </div>

                <!-- Cron\xF4metro ao vivo -->
                <div style="padding:14px 14px 10px;border-bottom:1px solid rgba(255,255,255,0.05);flex-shrink:0;background:rgba(0,152,255,0.03);">
                  <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;">
                    <span style="font-size:9px;font-weight:700;letter-spacing:0.12em;color:#555;">QUEST\xC3O ATUAL</span>
                    <span id="eq-metrics-live-status" style="font-size:9px;padding:2px 8px;border-radius:8px;background:rgba(255,255,255,0.06);color:#666;font-weight:600;">Em espera</span>
                  </div>
                  <div id="eq-metrics-live-time" style="font-size:36px;font-weight:800;letter-spacing:-0.02em;color:#fff;font-variant-numeric:tabular-nums;line-height:1;font-family:monospace;">00:00.00</div>
                  <div style="font-size:9px;color:#444;margin-top:5px;">Cron\xF4metro em tempo real \xB7 zero tokens consumidos</div>
                </div>

                <!-- Cards de resumo (3 col) -->
                <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:rgba(255,255,255,0.05);flex-shrink:0;">
                  <div style="background:#0c0c14;padding:10px 12px;display:flex;flex-direction:column;gap:3px;">
                    <div style="font-size:9px;color:#555;font-weight:600;letter-spacing:0.06em;">TEMPO TOTAL</div>
                    <div id="eq-metric-total-time" style="font-size:20px;font-weight:800;color:#e0e0e0;font-variant-numeric:tabular-nums;font-family:monospace;">00:00</div>
                    <div style="font-size:9px;color:#444;">Sess\xE3o atual</div>
                  </div>
                  <div style="background:#0c0c14;padding:10px 12px;display:flex;flex-direction:column;gap:3px;">
                    <div style="font-size:9px;color:#555;font-weight:600;letter-spacing:0.06em;">M\xC9DIA / Q.</div>
                    <div id="eq-metric-avg-time" style="font-size:20px;font-weight:800;color:#4ade80;font-variant-numeric:tabular-nums;font-family:monospace;">0.0s</div>
                    <div style="font-size:9px;color:#444;">Ritmo m\xE9dio</div>
                  </div>
                  <div style="background:#0c0c14;padding:10px 12px;display:flex;flex-direction:column;gap:3px;">
                    <div style="font-size:9px;color:#555;font-weight:600;letter-spacing:0.06em;">RESPONDIDAS</div>
                    <div id="eq-metric-total-count" style="font-size:20px;font-weight:800;color:#fbbf24;font-variant-numeric:tabular-nums;font-family:monospace;">0</div>
                    <div style="font-size:9px;color:#444;">Quest\xF5es OK</div>
                  </div>
                </div>

                <!-- A\xE7\xF5es -->
                <div style="display:flex;gap:6px;padding:8px 12px;border-bottom:1px solid rgba(255,255,255,0.05);flex-shrink:0;">
                  <button id="eq-metrics-copy-btn" type="button" style="flex:1;display:flex;align-items:center;justify-content:center;gap:5px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);border-radius:5px;color:#aaa;font-size:10px;padding:5px 8px;cursor:pointer;transition:background 0.12s;">
                    ${S.copy} <span>Copiar Relat\xF3rio</span>
                  </button>
                  <button id="eq-metrics-reset-btn" type="button" style="display:flex;align-items:center;justify-content:center;gap:5px;background:rgba(255,85,85,0.08);border:1px solid rgba(255,85,85,0.18);border-radius:5px;color:#ff8888;font-size:10px;padding:5px 10px;cursor:pointer;transition:background 0.12s;">
                    ${S.trash}
                  </button>
                </div>

                <!-- Hist\xF3rico -->
                <div style="display:flex;align-items:center;justify-content:space-between;padding:7px 12px 5px;flex-shrink:0;">
                  <span style="font-size:9px;font-weight:700;letter-spacing:0.08em;color:#555;">HIST\xD3RICO POR QUEST\xC3O</span>
                  <span id="eq-metrics-history-count" style="font-size:9px;color:#444;">0 registros</span>
                </div>
                <div id="eq-metrics-history-list" style="flex:1;overflow-y:auto;padding:0 10px 10px;">
                  <div class="eq-metrics-empty">Nenhuma quest\xE3o respondida nesta sess\xE3o ainda.</div>
                </div>

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
                  <label class="eq-checkbox-label" style="margin-top: 6px;">
                    <input id="eq-toast-stacking" type="checkbox" />
                    <span style="color: #fbbf24;">Acumular Toasts (Hist\xF3rico de Notifica\xE7\xF5es)</span>
                  </label>
                </div>

                <!-- Zona de Redefini\xE7\xE3o -->
                <div class="eq-field-group" style="margin-top: 14px; padding-top: 12px; border-top: 1px solid #282828;">
                  <div class="eq-section-title" style="color: #ff5555;">Zona de Redefini\xE7\xE3o</div>
                  <button class="eq-btn-secondary" id="eq-reset-all-btn" type="button" style="border-color: #662222; color: #ff8888;">
                    ${S.trash} Resetar Todos os Dados e Mem\xF3ria
                  </button>
                </div>

                <div class="eq-footer-note" style="margin-top: auto;">Configura\xE7\xF5es salvas localmente no navegador \u2022 ${Oe}</div>
              </div>
            </div>
          </main>
        </aside>
    `),this.launcherBtn=this.shadow.querySelector(".eq-launcher"),this.launcherDot=this.shadow.querySelector("#eq-launcher-dot"),this.dockToggleBtn=this.shadow.querySelector("#eq-dock-toggle"),this.sidebarEl=this.shadow.querySelector(".eq-sidebar"),this.apToggleBtn=this.shadow.querySelector("#eq-ap-toggle-btn"),this.apConsole=this.shadow.querySelector("#eq-ap-console"),this.executionConsole=this.shadow.querySelector("#eq-execution-console"),this.progressContainer=this.shadow.querySelector("#eq-progress-container"),this.progressBar=this.shadow.querySelector("#eq-progress-bar"),this.progressLabel=this.shadow.querySelector("#eq-progress-label"),this.progressVal=this.shadow.querySelector("#eq-progress-val"),this.contextTreeContainer=this.shadow.querySelector("#eq-tree-container"),this.dotPulseAp=this.shadow.querySelector("#eq-dot-ap"),this.statusTextAp=this.shadow.querySelector("#eq-status-text-ap")||this.shadow.querySelector("#eq-status-summary")||this.dotPulseAp,this.stopwatchAp=this.shadow.querySelector("#eq-stopwatch-ap span"),this.dotPulseAdv=this.dotPulseAp,this.statusTextAdv=this.statusTextAp,this.stopwatchAdv=this.stopwatchAp,this.inspModel=this.shadow.querySelector("#eq-insp-model"),this.inspLatency=this.shadow.querySelector("#eq-insp-latency"),this.inspTokens=this.shadow.querySelector("#eq-insp-tokens"),this.inspPrompt=this.shadow.querySelector("#eq-insp-prompt"),this.inspRationale=this.shadow.querySelector("#eq-insp-rationale"),this.inspActions=this.shadow.querySelector("#eq-insp-actions"),this.copyPromptBtn=this.shadow.querySelector("#eq-copy-prompt-btn"),this.liveDebugTerminal=this.shadow.querySelector("#eq-live-debug-terminal"),this.dbgModel=this.shadow.querySelector("#eq-dbg-model"),this.dbgLatency=this.shadow.querySelector("#eq-dbg-latency"),this.dbgSplitTokens=this.shadow.querySelector("#eq-dbg-split-tokens"),this.dbgTotalTokens=this.shadow.querySelector("#eq-dbg-total-tokens"),this.dbgErrorCard=this.shadow.querySelector("#eq-dbg-error-card"),this.dbgErrorText=this.shadow.querySelector("#eq-dbg-error-text"),this.dbgPromptLen=this.shadow.querySelector("#eq-dbg-prompt-len"),this.dbgPromptView=this.shadow.querySelector("#eq-dbg-prompt-view"),this.dbgContextView=this.shadow.querySelector("#eq-dbg-context-view"),this.dbgRawRespView=this.shadow.querySelector("#eq-dbg-raw-resp-view"),this.dbgCountAll=this.shadow.querySelector("#eq-dbg-count-all"),this.dbgCountError=this.shadow.querySelector("#eq-dbg-count-error"),this.dbgCountAi=this.shadow.querySelector("#eq-dbg-count-ai"),this.dbgCountDom=this.shadow.querySelector("#eq-dbg-count-dom"),this.apiKeyInput=this.shadow.querySelector("#eq-api-key"),this.keyContextMenu=this.shadow.querySelector("#eq-key-context-menu"),this.keyMoreBtn=this.shadow.querySelector("#eq-key-more-btn"),this.keysListEl=this.shadow.querySelector("#eq-keys-list"),this.keysBadgeEl=this.shadow.querySelector("#eq-keys-badge"),this.modelSelect=this.shadow.querySelector("#eq-model-select"),this.modeSelect=this.shadow.querySelector("#eq-mode-select"),this.engineSelect=this.shadow.querySelector("#eq-engine-select"),this.dryRunCheckbox=this.shadow.querySelector("#eq-dry-run"),this.autoApplyCheckbox=this.shadow.querySelector("#eq-auto-apply"),this.autoAdvanceCheckbox=this.shadow.querySelector("#eq-auto-advance"),this.hostDarkModeCheckbox=this.shadow.querySelector("#eq-host-dark"),this.useVisionCheckbox=this.shadow.querySelector("#eq-use-vision"),this.toastStackingCheckbox=this.shadow.querySelector("#eq-toast-stacking"),this.toastStackingCheckbox=this.shadow.querySelector("#eq-toast-stacking"),this.analyzeBtn=this.shadow.querySelector("#eq-analyze-btn"),this.applyBtn=this.shadow.querySelector("#eq-apply-btn"),this.applyBtn&&(this.applyBtn.disabled=!0),this.resultContainer=this.shadow.querySelector("#eq-result"),this.floatingAnswers=new Ye(this.shadow,()=>{this.callbacks.onAnalyze(1)});let n=this.shadow.querySelector("#eq-open-hud-btn");n&&n.addEventListener("click",()=>{this.latestPlan&&this.floatingAnswers.show(this.latestPlan)}),we.filter(i=>Y(i.id)).forEach(i=>this.modelSelect.add(new Option(i.name,i.id,!1,i.id===e.model))),Po.forEach(i=>this.modeSelect.add(new Option(i.label,i.value,!1,i.value===e.modeHint))),Oo.forEach(i=>this.engineSelect.add(new Option(i.label,i.value,!1,i.value===e.engine))),this.apiKeyInput.value=e.apiKey,this.dryRunCheckbox.checked=e.dryRun,this.autoApplyCheckbox.checked=e.autoApply,this.autoAdvanceCheckbox.checked=e.autoAdvance,this.hostDarkModeCheckbox.checked=e.hostDarkMode,this.useVisionCheckbox.checked=e.useVision,this.toastStackingCheckbox.checked=e.toastStacking??!0,this.toastStackingCheckbox.checked=e.toastStacking??!0,this.metricsLiveTime=this.shadow.querySelector("#eq-metrics-live-time"),this.metricsLiveStatus=this.shadow.querySelector("#eq-metrics-live-status"),this.metricsTotalBadge=this.shadow.querySelector("#eq-metrics-total-badge"),this.metricTotalTime=this.shadow.querySelector("#eq-metric-total-time"),this.metricAvgTime=this.shadow.querySelector("#eq-metric-avg-time"),this.metricTotalCount=this.shadow.querySelector("#eq-metric-total-count"),this.metricsHistoryList=this.shadow.querySelector("#eq-metrics-history-list"),this.metricsHistoryCount=this.shadow.querySelector("#eq-metrics-history-count"),this.metricsCopyBtn=this.shadow.querySelector("#eq-metrics-copy-btn"),this.metricsResetBtn=this.shadow.querySelector("#eq-metrics-reset-btn"),this.setupEventListeners(),this.updateTimingMetrics(),this.mountHost(),this.applyHostDarkMode(e.hostDarkMode);let r=Array.isArray(e.apiKeys)&&e.apiKeys.length>0?e.apiKeys:e.apiKey?[e.apiKey]:[];D.init(r),this.apiKeyInput.value=D.getBestKey()||e.apiKey||"",this.renderKeysList();let a=window.setInterval(()=>{this.activeTab==="settings"&&this.renderKeysList()},1e3);typeof a?.unref=="function"&&a.unref();let s=D.getBestKey()||e.apiKey;s&&Re(s).then(i=>{i&&i.length>0&&this.updateModelSelect(i,e.model)}).catch(()=>{})}switchTab(e){this.activeTab=e;let t=["resolver","brain","metrics","debug","settings"];this.shadow.querySelector(".eq-views-wrapper")?.classList.toggle("is-brain-active",e==="brain");for(let r of t){let a=this.shadow.querySelector(`#eq-tab-${r}`),s=this.shadow.querySelector(`#eq-view-${r}`),i=r===e;a?.classList.toggle("active",i),s&&(s.style.display=i?"flex":"none")}switch(e){case"brain":this.initBrainControls(),this.renderContextTree(),this.refreshInspectorView();break;case"metrics":try{this.updateTimingMetrics()}catch{}break;case"debug":try{this.refreshDebugView(),this.renderTerminalEntries()}catch{}break;case"settings":break}}setupEventListeners(){this.shadow.querySelector("#eq-tab-resolver")?.addEventListener("click",()=>this.switchTab("resolver")),this.shadow.querySelector("#eq-tab-brain")?.addEventListener("click",()=>this.switchTab("brain")),this.shadow.querySelector("#eq-tab-metrics")?.addEventListener("click",()=>this.switchTab("metrics")),this.shadow.querySelector("#eq-tab-debug")?.addEventListener("click",()=>this.switchTab("debug")),this.shadow.querySelector("#eq-tab-settings")?.addEventListener("click",()=>this.switchTab("settings"));let e=this.shadow.querySelector("#eq-status-card");e?.addEventListener("click",()=>{let x=e.classList.toggle("is-collapsed");e.setAttribute("aria-expanded",String(!x))}),this.metricsResetBtn?.addEventListener("click",()=>{Te(),this.stopQuestionTimer(0),this.currentQuestionStartTime=0,this.metricsLiveTime&&(this.metricsLiveTime.textContent="00:00.00"),this.metricsLiveStatus&&(this.metricsLiveStatus.textContent="Em espera",this.metricsLiveStatus.classList.remove("active")),this.updateTimingMetrics(),this.logToConsole("> [SYS] M\xE9tricas e hist\xF3rico de tempo zerados com sucesso.","text-yellow")}),this.metricsCopyBtn?.addEventListener("click",()=>{this.copyMetricsReport()}),this.shadow.querySelector("#eq-dbg-filter-all")?.addEventListener("click",()=>this.setLogFilter("all")),this.shadow.querySelector("#eq-dbg-filter-error")?.addEventListener("click",()=>this.setLogFilter("error")),this.shadow.querySelector("#eq-dbg-filter-ai")?.addEventListener("click",()=>this.setLogFilter("ai")),this.shadow.querySelector("#eq-dbg-filter-dom")?.addEventListener("click",()=>this.setLogFilter("dom"));let t=this.shadow.querySelector("#eq-dbg-scroll-toggle");t?.addEventListener("click",()=>{this.autoScrollLogs=!this.autoScrollLogs,t&&(t.style.color=this.autoScrollLogs?"#00ffcc":"#858585",t.title=this.autoScrollLogs?"Auto-Scroll Ligado (Clique para desligar)":"Auto-Scroll Desligado (Clique para ligar)"),this.autoScrollLogs&&this.liveDebugTerminal&&(this.liveDebugTerminal.scrollTop=this.liveDebugTerminal.scrollHeight)});let n=this.shadow.querySelector("#eq-dbg-copy-logs");n?.addEventListener("click",()=>{let x=this.getFormattedLogs();navigator.clipboard.writeText(x).then(()=>{let E=n.innerHTML;n.innerHTML=S.check,setTimeout(()=>n.innerHTML=E,1800)})}),this.shadow.querySelector("#eq-dbg-clear-logs")?.addEventListener("click",()=>{this.clearLogs()});let r=this.shadow.querySelector("#eq-dbg-copy-prompt");r?.addEventListener("click",()=>{let x=this.latestPromptText||this.latestPlan?.promptSent||"";navigator.clipboard.writeText(x).then(()=>{let E=r.innerHTML;r.innerHTML=`${S.check} Copiado!`,setTimeout(()=>r.innerHTML=E,1800)})});let a=this.shadow.querySelector("#eq-dbg-copy-context");a?.addEventListener("click",()=>{let x=this.dbgContextView?.textContent||"";navigator.clipboard.writeText(x).then(()=>{let E=a.innerHTML;a.innerHTML=`${S.check} Copiado!`,setTimeout(()=>a.innerHTML=E,1800)})});let s=this.shadow.querySelector("#eq-dbg-copy-raw-resp");s?.addEventListener("click",()=>{let x=this.latestPlan?.rawResponse||this.dbgRawRespView?.textContent||"";navigator.clipboard.writeText(x).then(()=>{let E=s.innerHTML;s.innerHTML=`${S.check} Copiado!`,setTimeout(()=>s.innerHTML=E,1800)})});let i=this.shadow.querySelector("#eq-dbg-copy-error-btn");i?.addEventListener("click",()=>{let x=this.lastErrorMsg||"";navigator.clipboard.writeText(x).then(()=>{let E=i.innerHTML;i.innerHTML=S.check,setTimeout(()=>i.innerHTML=E,1800)})}),this.shadow.querySelector("#eq-refresh-context-btn")?.addEventListener("click",()=>{this.renderContextTree()}),this.launcherBtn.addEventListener("click",()=>this.toggle()),this.dockToggleBtn.addEventListener("click",()=>this.toggle()),window.addEventListener("keydown",x=>{x.altKey&&(x.key==="q"||x.key==="Q"||x.key==="a"||x.key==="A")&&(x.preventDefault(),this.toggle())},!0);let d=x=>{let E=x.composedPath();E.includes(this.shadow)||(E.includes(this.sidebarEl)||E.includes(this.host))&&x.stopImmediatePropagation()};window.addEventListener("keydown",d,!0),window.addEventListener("keyup",d,!0),window.addEventListener("keypress",d,!0),this.apiKeyInput.addEventListener("input",()=>{let x=this.apiKeyInput.value.trim().replace(/^["']|["']$/g,"");this.callbacks.onSettingsChange({apiKey:x})});let l=this.shadow.querySelector("#eq-keys-collapsible"),u=this.shadow.querySelector("#eq-keys-chevron"),f=this.shadow.querySelector("#eq-keys-section-header"),c=x=>{l&&(x?(l.style.display="none",u&&(u.style.transform="rotate(0deg)")):(l.style.display="block",l.style.maxHeight="none",l.style.overflow="visible",u&&(u.style.transform="rotate(90deg)")))},m=!1;try{m=localStorage.getItem("easyquiz_keys_collapsed")==="true"}catch{}c(m),f?.addEventListener("click",x=>{if(x.target?.closest("a"))return;let E=l?.style.display==="none";c(!E);try{localStorage.setItem("easyquiz_keys_collapsed",E?"false":"true")}catch{}});let p=this.shadow.querySelector("#eq-auto-menu-btn"),h=this.shadow.querySelector("#eq-auto-menu");h&&(h.hidden=!0),p?.classList.remove("is-open"),p?.addEventListener("click",x=>{if(x.stopPropagation(),!h)return;let E=h.hidden;h.hidden=!E,p.classList.toggle("is-open",!h.hidden)}),h?.querySelectorAll("[data-auto-action]").forEach(x=>{x.addEventListener("click",E=>{E.stopPropagation();let k=x.dataset.autoAction;k==="toggle"?this.analyzeBtn?.click():k==="memory"?(Be(),this.logToConsole("> [SYS] Mem\xF3ria contextual limpa com sucesso.","text-green"),this.setStatus("Mem\xF3ria contextual da sess\xE3o limpa.","success")):k==="status"&&this.shadow.querySelector("#eq-status-card")?.scrollIntoView({behavior:"smooth",block:"nearest"}),h&&(h.hidden=!0),p?.classList.remove("is-open")})}),this.shadow.addEventListener("click",x=>{x.target.closest(".eq-menu-shell")||(h&&(h.hidden=!0),p?.classList.remove("is-open"))});let b=this.shadow.querySelector("#eq-result-toggle"),A=this.shadow.querySelector("#eq-result-body");b&&A&&(A.classList.add("is-collapsed"),b.classList.remove("is-open"),b.addEventListener("click",()=>{let x=b.classList.toggle("is-open");A.classList.toggle("is-collapsed",!x)})),this.shadow.querySelector("#eq-key-save")?.addEventListener("click",()=>{let x=this.apiKeyInput.value.trim().replace(/^["']|["']$/g,"");if(!x){this.setStatus("Insira o valor da chave antes de adicionar.","warning");return}let E=D.addKey(x);if(E.ok){let k=D.exportRawKeys();this.callbacks.onSettingsChange({apiKey:k[0],apiKeys:k}),this.apiKeyInput.value="",this.setStatus(` Nova chave adicionada com sucesso! (${k.length} chaves ativas no pool)`,"success"),c(!1);try{localStorage.setItem("easyquiz_keys_collapsed","false")}catch{}this.renderKeysList(),this.keyContextMenu.hidden=!0,Qe(x).then(w=>{w.ok?(D.markSuccess(x,100),this.setStatus(" Nova chave validada com sucesso no Google AI Studio!","success")):(D.markInvalid(x,w.message),this.setStatus(`\uFE0F Chave cadastrada, mas aviso retornado: ${w.message}`,"warning")),this.renderKeysList()}).catch(()=>{})}else this.setStatus(E.message,"warning")}),this.keyMoreBtn.addEventListener("click",x=>{x.stopPropagation(),this.keyContextMenu.hidden=!this.keyContextMenu.hidden}),this.shadow.addEventListener("click",x=>{let E=x.target;!E.closest("#eq-key-context-menu")&&!E.closest("#eq-key-more-btn")&&(this.keyContextMenu.hidden=!0)}),this.shadow.querySelector("#eq-menu-prompt")?.addEventListener("click",()=>{this.keyContextMenu.hidden=!0;let x=window.prompt("Adicionar Nova Chave API do Google Gemini (AI Studio):");if(x!==null&&x.trim()){let E=x.trim().replace(/^["']|["']$/g,""),k=D.addKey(E);if(k.ok){let w=D.exportRawKeys();this.callbacks.onSettingsChange({apiKey:w[0],apiKeys:w}),this.setStatus("Chave Gemini adicionada com sucesso!","success"),this.renderKeysList()}else this.setStatus(k.message,"warning")}}),this.shadow.querySelector("#eq-menu-paste")?.addEventListener("click",async()=>{this.keyContextMenu.hidden=!0;try{let x=await navigator.clipboard.readText();if(x){let E=x.trim().replace(/^["']|["']$/g,"");this.apiKeyInput.value=E,this.setStatus('Chave colada no campo. Clique no bot\xE3o "+" para adicionar ao pool.',"info")}}catch{let x=window.prompt("Adicionar Nova Chave API do Google Gemini:");if(x!==null&&x.trim()){let E=x.trim().replace(/^["']|["']$/g,"");if(D.addKey(E).ok){let w=D.exportRawKeys();this.callbacks.onSettingsChange({apiKey:w[0],apiKeys:w}),this.setStatus("Chave Gemini adicionada com sucesso!","success"),this.renderKeysList()}}}}),this.shadow.querySelector("#eq-menu-toggle-vis")?.addEventListener("click",()=>{this.keyContextMenu.hidden=!0;let x=this.apiKeyInput.type==="password";this.apiKeyInput.type=x?"text":"password";let E=this.shadow.querySelector("#eq-menu-vis-icon"),k=this.shadow.querySelector("#eq-menu-vis-text");E&&(E.innerHTML=x?S.eyeOff:S.eye),k&&(k.textContent=x?"Ocultar Campo":"Mostrar Campo")}),this.shadow.querySelector("#eq-menu-clear")?.addEventListener("click",()=>{this.keyContextMenu.hidden=!0,this.apiKeyInput.value="",this.setStatus("Campo de inser\xE7\xE3o limpo.","info"),this.apiKeyInput.focus()}),this.shadow.querySelector("#eq-menu-bulk")?.addEventListener("click",()=>{this.keyContextMenu.hidden=!0,this.shadow.querySelector("#eq-bulk-overlay")?.remove();let x=document.createElement("div");x.id="eq-bulk-overlay",x.style.cssText=["position:fixed","inset:0","z-index:2147483647","pointer-events:auto","background:rgba(0,0,0,0.78)","backdrop-filter:blur(4px)","-webkit-backdrop-filter:blur(4px)","display:flex","align-items:center","justify-content:center",'font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif',"user-select:text","-webkit-user-select:text"].join(";");let E=document.createElement("div");E.style.cssText=["background:#11151c","color:#e2e8f0","border:1px solid #283548","border-radius:12px","padding:20px","width:440px","max-width:92vw","font-size:13px","box-shadow:0 12px 40px rgba(0,0,0,0.85), 0 0 0 1px rgba(0,229,255,0.15)","display:flex","flex-direction:column","gap:10px","pointer-events:auto"].join(";"),E.innerHTML=`
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
      `,x.appendChild(E),this.shadow.appendChild(x);let k=E.querySelector("#eq-bulk-ta"),w=E.querySelector("#eq-bulk-status"),M=E.querySelector("#eq-bulk-import"),I=E.querySelector("#eq-bulk-paste-btn"),T=E.querySelector("#eq-bulk-clear-btn");requestAnimationFrame(()=>k?.focus());let H=()=>{x.remove()};["keydown","keyup","keypress","paste","copy","cut"].forEach(O=>{x.addEventListener(O,N=>{N.stopPropagation(),N.stopImmediatePropagation()},!0)}),x.addEventListener("keydown",O=>{O.key==="Escape"&&H()}),x.addEventListener("click",O=>{O.target===x&&H()}),E.querySelector("#eq-bulk-x")?.addEventListener("click",H),E.querySelector("#eq-bulk-cancel")?.addEventListener("click",H),T.addEventListener("click",()=>{k.value="",w.textContent="",k.focus()}),I.addEventListener("click",async()=>{try{let O=await navigator.clipboard?.readText();O?(k.value=O,k.focus(),w.style.color="#38bdf8",w.textContent="Conte\xFAdo colado da \xE1rea de transfer\xEAncia com sucesso!"):(w.style.color="#fbbf24",w.textContent="\xC1rea de transfer\xEAncia vazia ou sem permiss\xE3o de leitura.")}catch{w.style.color="#fbbf24",w.textContent="Permiss\xE3o de clipboard negada pelo navegador. Use Ctrl+V diretamente na caixa.",k.focus()}}),E.querySelector("#eq-bulk-import")?.addEventListener("click",async()=>{let O=k.value.trim();if(!O){w.style.color="#f87171",w.textContent="Insira pelo menos uma chave de API antes de importar.";return}let N=O.match(/AIza[0-9A-Za-z\-_]{35}/g),R=[];if(N&&N.length>0?R=Array.from(new Set(N)):R=Array.from(new Set(O.split(/[\n,;\s]+/).map(j=>j.trim().replace(/^["'`]|["'`]$/g,"")).filter(j=>j.length>=20))),R.length===0){w.style.color="#f87171",w.textContent="Nenhuma chave v\xE1lida encontrada (m\xEDnimo 20 caracteres).";return}w.style.color="#00e5ff",w.textContent=`Processando ${R.length} chave(s)...`,M.disabled=!0,M.style.opacity="0.6";let U=0,X=0;for(let j of R){let J=D.addKey(j);J.ok?U++:J.message.includes("j\xE1 est\xE1 cadastrada")&&X++}if(U>0){let j=D.exportRawKeys();this.callbacks.onSettingsChange({apiKey:j[0],apiKeys:j}),c(!1);try{localStorage.setItem("easyquiz_keys_collapsed","false")}catch{}}w.textContent=`${U} adicionada(s), ${X} duplicada(s). Validando modelo em paralelo...`;let Z=D.exportRawKeys(),K=this.modelSelect?.value||"gemini-3.5-flash-lite",ee=await it(K,Z);ee.ok?(D.markSuccess(ee.key,200),w.style.color="#4ade80",w.textContent=` ${U} adicionada(s), ${X} duplicada(s). Modelo '${ee.model}' pronto!`):(w.style.color="#fbbf24",w.textContent=`${U} adicionada(s), ${X} duplicada(s). Aviso: ${ee.message}`),this.renderKeysList(),M.disabled=!1,M.style.opacity="1",U>0&&(this.setStatus(` Lote importado: ${U} chave(s) adicionada(s) ao pool!`,"success"),setTimeout(H,2200))})}),this.shadow.querySelector("#eq-menu-edit-text")?.addEventListener("click",()=>{this.keyContextMenu.hidden=!0,this.shadow.querySelector("#eq-text-editor-overlay")?.remove();let x=D.exportRawKeys(),E=document.createElement("div");E.id="eq-text-editor-overlay",E.style.cssText=["position:fixed","inset:0","z-index:2147483647","pointer-events:auto","background:rgba(0,0,0,0.82)","backdrop-filter:blur(4px)","-webkit-backdrop-filter:blur(4px)","display:flex","align-items:center","justify-content:center",'font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif'].join(";");let k=document.createElement("div");k.style.cssText=["background:#11151c","color:#e2e8f0","border:1px solid #283548","border-radius:12px","padding:20px","width:460px","max-width:94vw","font-size:13px","box-shadow:0 12px 40px rgba(0,0,0,0.85),0 0 0 1px rgba(0,229,255,0.15)","display:flex","flex-direction:column","gap:10px","pointer-events:auto"].join(";"),k.innerHTML=`
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
      `,E.appendChild(k),this.shadow.appendChild(E);let w=k.querySelector("#eq-edittext-ta"),M=k.querySelector("#eq-edittext-status");w.value=x.join(`
`),requestAnimationFrame(()=>{w.focus(),w.select()});let I=()=>E.remove();["keydown","keyup","keypress","paste","copy","cut"].forEach(T=>{E.addEventListener(T,H=>{H.stopPropagation(),H.stopImmediatePropagation()},!0)}),E.addEventListener("keydown",T=>{T.key==="Escape"&&I()}),E.addEventListener("click",T=>{T.target===E&&I()}),k.querySelector("#eq-edittext-x")?.addEventListener("click",I),k.querySelector("#eq-edittext-cancel")?.addEventListener("click",I),k.querySelector("#eq-edittext-clear")?.addEventListener("click",()=>{confirm("Apagar todas as chaves? Esta a\xE7\xE3o \xE9 irrevers\xEDvel.")&&(w.value="",M.style.color="#fbbf24",M.textContent="Campo limpo. Clique em Salvar para confirmar a remo\xE7\xE3o de todas as chaves.")}),k.querySelector("#eq-edittext-save")?.addEventListener("click",()=>{let T=w.value.split(/[\n\r]+/).map(N=>N.trim().replace(/^["']|["']$/g,"")).filter(N=>N.length>5),H=Array.from(new Set(T));D.init(H);let O=D.exportRawKeys();this.callbacks.onSettingsChange({apiKey:O[0]||"",apiKeys:O}),this.renderKeysList(),M.style.color="#4ade80",H.length===0?M.textContent=" Todas as chaves removidas.":M.textContent=` ${H.length} chave(s) salva(s) com sucesso!`,this.setStatus(H.length>0?` ${H.length} chave(s) salva(s)!`:"Todas as chaves foram removidas.",H.length>0?"success":"info"),setTimeout(I,1400)})}),this.shadow.querySelector("#eq-menu-delete-all")?.addEventListener("click",()=>{this.keyContextMenu.hidden=!0;let x=D.getAllKeys();if(x.length===0)return this.setStatus("Nenhuma chave para apagar.","info");confirm(`Apagar todas as ${x.length} chave(s) permanentemente?`)&&(D.init([]),this.callbacks.onSettingsChange({apiKey:"",apiKeys:[]}),this.renderKeysList(),this.setStatus("Todas as chaves foram removidas.","info"))}),this.shadow.querySelector("#eq-menu-test")?.addEventListener("click",async()=>{this.keyContextMenu.hidden=!0;let x=D.getAllKeys();if(x.length===0)return this.setStatus("Nenhuma chave cadastrada para testar.","error");this.setStatus(` Testando ${x.length} chave(s) em paralelo...`,"info");let E=this.modelSelect?.value||"gemini-3.5-flash-lite",k=x.map(M=>M.key),w=await it(E,k);if(w.ok)D.markSuccess(w.key,150),this.setStatus(` Validado! Modelo '${w.model}' respondeu com sucesso!`,"success");else{let M=await Promise.allSettled(k.map(T=>Qe(T))),I=0;M.forEach((T,H)=>{if(T.status==="fulfilled"&&T.value.ok)I++,D.markSuccess(k[H],200);else{let O=T.status==="fulfilled"?T.value.message:String(T.reason);D.markInvalid(k[H],O)}}),this.setStatus(`Teste: ${I}/${x.length} chave(s) v\xE1lidas. ${w.message}`,I>0?"info":"error")}this.renderKeysList()});let y=()=>{this.keyContextMenu.hidden=!0,window.confirm("Deseja realmente resetar todos os dados, chaves e mem\xF3ria de sess\xE3o do EasyQuiz?")&&(this.autopilot.isActive()&&this.autopilot.stop(),this.updateAutopilotUi(!1),this.setBusy(!1),qt(),Te(),this.stopQuestionTimer(0),this.currentQuestionStartTime=0,this.metricsLiveTime&&(this.metricsLiveTime.textContent="00:00.00"),this.metricsLiveStatus&&(this.metricsLiveStatus.textContent="Em espera",this.metricsLiveStatus.className="eq-live-stopwatch-status"),this.updateTimingMetrics(),this.apiKeyInput.value="",this.callbacks.onSettingsChange({apiKey:""}),this.setStatus("Todos os dados do EasyQuiz foram limpos.","info"),this.logToConsole("> [SYS] Armazenamento local resetado.","text-yellow"))};this.shadow.querySelector("#eq-menu-reset")?.addEventListener("click",y),this.shadow.querySelector("#eq-reset-all-btn")?.addEventListener("click",y),this.apToggleBtn?.addEventListener("click",()=>{if(this.autopilot.isActive())this.autopilot.stop(),this.callbacks.onCancel?.(),this.setProgress(0),this.updateAutopilotUi(!1),this.setInterrupted("Autopilot interrompido imediatamente pelo usu\xE1rio.");else{if(!this.apiKeyInput.value.trim().replace(/^["']|["']$/g,"")){this.setStatus("Configure sua chave de API Gemini na aba Configura\xE7\xF5es antes de ligar o Autopilot.","error"),this.switchTab("settings"),this.apiKeyInput.focus();return}this.callbacks.onSettingsChange({autoApply:!0,autoAdvance:!0}),this.autoApplyCheckbox.checked=!0,this.autoAdvanceCheckbox.checked=!0,st(),this.autopilot.start(),this.updateAutopilotUi(!0),this.startStopwatch(),this.setStatus("Autopilot ativo. Monitorando exerc\xEDcios...","info")}}),this.shadow.querySelector("#eq-ap-clear-memory")?.addEventListener("click",()=>{Be(),this.logToConsole("> [SYS] Mem\xF3ria contextual limpa com sucesso.","text-green"),this.setStatus("Mem\xF3ria contextual da sess\xE3o limpa.","success")});let q=this.shadow.querySelector("#eq-copy-console-btn");q?.addEventListener("click",()=>{let x=this.apConsole?.innerText||"";navigator.clipboard.writeText(x).then(()=>{let E=q.innerHTML;q.innerHTML=S.check,setTimeout(()=>q.innerHTML=E,1800)})}),this.copyPromptBtn?.addEventListener("click",()=>{let x=this.inspPrompt.textContent||"";navigator.clipboard.writeText(x).then(()=>{if(!this.copyPromptBtn)return;let E=this.copyPromptBtn.innerHTML;this.copyPromptBtn.innerHTML=`${S.check} Copiado!`,setTimeout(()=>this.copyPromptBtn.innerHTML=E,2e3)})}),this.modelSelect.addEventListener("change",()=>this.callbacks.onSettingsChange({model:this.modelSelect.value})),this.modeSelect.addEventListener("change",()=>this.callbacks.onSettingsChange({modeHint:this.modeSelect.value})),this.engineSelect.addEventListener("change",()=>this.callbacks.onSettingsChange({engine:this.engineSelect.value})),this.dryRunCheckbox.addEventListener("change",()=>this.callbacks.onSettingsChange({dryRun:this.dryRunCheckbox.checked})),this.autoApplyCheckbox.addEventListener("change",()=>this.callbacks.onSettingsChange({autoApply:this.autoApplyCheckbox.checked})),this.autoAdvanceCheckbox.addEventListener("change",()=>this.callbacks.onSettingsChange({autoAdvance:this.autoAdvanceCheckbox.checked})),this.useVisionCheckbox.addEventListener("change",()=>{let x=this.useVisionCheckbox.checked;this.callbacks.onSettingsChange({useVision:x}),this.setStatus(x?"Vis\xE3o Computacional ativada (capturas habilitadas).":"Modo DOM R\xE1pido ativado (capturas desabilitadas).","info")}),this.hostDarkModeCheckbox.addEventListener("change",()=>{let x=this.hostDarkModeCheckbox.checked;this.callbacks.onSettingsChange({hostDarkMode:x}),this.applyHostDarkMode(x)}),this.analyzeBtn?.addEventListener("click",async()=>{if(this.analyzeBtn.classList.contains("danger")){this.autopilot.stop(),this.callbacks.onCancel?.(),this.setProgress(0),this.updateAutopilotUi(!1),this.setBusy(!1),this.setInterrupted("Resolver Autopilot interrompido pelo usu\xE1rio.");return}if(!this.apiKeyInput.value.trim().replace(/^['"]|['"]$/g,"")){this.setStatus("Configure sua chave de API Gemini antes de ativar o Resolver Autopilot.","error"),this.switchTab("settings"),this.apiKeyInput.focus();return}this.callbacks.onSettingsChange({autoApply:!0,autoAdvance:!0}),this.autoApplyCheckbox.checked=!0,this.autoAdvanceCheckbox.checked=!0,st(),this.autopilot.start(),this.updateAutopilotUi(!0),this.startStopwatch(),this.setStatus("Resolver Autopilot ativo. Monitorando e respondendo...","info")}),this.applyBtn&&this.applyBtn.addEventListener("click",()=>this.callbacks.onApply())}startStopwatch(){this.stopStopwatch(),this.stopwatchStartTime=Date.now();let e=()=>{let t=((Date.now()-this.stopwatchStartTime)/1e3).toFixed(2)+"s";this.stopwatchAp&&(this.stopwatchAp.textContent=t),this.stopwatchAdv&&(this.stopwatchAdv.textContent=t)};e(),this.stopwatchInterval=setInterval(e,100)}stopStopwatch(e){if(this.stopwatchInterval&&(clearInterval(this.stopwatchInterval),this.stopwatchInterval=null),e!==void 0){let t=(e/1e3).toFixed(2)+"s";this.stopwatchAp&&(this.stopwatchAp.textContent=t),this.stopwatchAdv&&(this.stopwatchAdv.textContent=t)}}setLogFilter(e){this.activeLogFilter=e;let t=["all","error","ai","dom"];for(let n of t){let r=this.shadow.querySelector(`#eq-dbg-filter-${n}`);n===e?r?.classList.add("active"):r?.classList.remove("active")}this.renderTerminalEntries()}updateLogCounters(){let e=0,t=0,n=0;for(let r of this.logEntries)r.category==="error"?e++:r.category==="ai"?t++:r.category==="dom"&&n++;this.dbgCountAll&&(this.dbgCountAll.textContent=String(this.logEntries.length)),this.dbgCountError&&(this.dbgCountError.textContent=String(e)),this.dbgCountAi&&(this.dbgCountAi.textContent=String(t)),this.dbgCountDom&&(this.dbgCountDom.textContent=String(n))}renderTerminalEntries(){if(!this.liveDebugTerminal)return;this.liveDebugTerminal.replaceChildren();let e=this.activeLogFilter==="all"?this.logEntries:this.logEntries.filter(t=>t.category===this.activeLogFilter);if(e.length===0){let t=document.createElement("div");t.className="text-muted",t.textContent=`Nenhum log encontrado para o filtro "${this.activeLogFilter.toUpperCase()}".`,this.liveDebugTerminal.appendChild(t);return}for(let t of e){let n=document.createElement("div");n.textContent=t.message,t.colorClass&&(n.className=t.colorClass),this.liveDebugTerminal.appendChild(n)}this.autoScrollLogs&&(this.liveDebugTerminal.scrollTop=this.liveDebugTerminal.scrollHeight)}clearLogs(){if(this.logEntries=[],this.updateLogCounters(),this.liveDebugTerminal){this.liveDebugTerminal.replaceChildren();let e=document.createElement("div");e.className="text-blue",e.textContent="> [SYS] Console de logs limpo pelo usu\xE1rio.",this.liveDebugTerminal.appendChild(e)}this.apConsole&&this.apConsole.replaceChildren(),this.executionConsole&&this.executionConsole.replaceChildren()}getFormattedLogs(){return(this.activeLogFilter==="all"?this.logEntries:this.logEntries.filter(t=>t.category===this.activeLogFilter)).map(t=>t.message).join(`
`)}setLastError(e){this.lastErrorMsg=e,this.dbgErrorCard&&this.dbgErrorText&&(this.dbgErrorText.textContent=e,this.dbgErrorCard.style.display="flex")}setErrorDiagnostic(e,t){let n=t?`[${t}] ${e}`:e;this.setLastError(n)}refreshDebugView(){let e=this.latestPlan,t=this.latestContext,n=this.latestPromptText||e?.promptSent||"";if(this.dbgModel&&(this.dbgModel.textContent=e?.usedModel||this.initialSettings.model||"--"),this.dbgLatency&&(this.dbgLatency.textContent=e?.durationMs?`${e.durationMs}ms`:"--"),this.dbgSplitTokens){let r=e?.promptTokens!==void 0?String(e.promptTokens):"--",a=e?.candidatesTokens!==void 0?String(e.candidatesTokens):"--";this.dbgSplitTokens.textContent=`${r} / ${a}`,this.dbgSplitTokens.title=`Prompt: ${r} tokens | Resposta: ${a} tokens`}if(this.dbgTotalTokens){let r=e?.tokensUsed??(e?.promptTokens&&e?.candidatesTokens?e.promptTokens+e.candidatesTokens:void 0);this.dbgTotalTokens.textContent=r!==void 0?`${r}`:"--"}if(this.dbgPromptLen){let r=n.length,a=Math.round(r/4);this.dbgPromptLen.textContent=`${r} chars (~${a} tokens est.)`}if(this.dbgPromptView&&(this.dbgPromptView.textContent=n||"Nenhum prompt enviado at\xE9 o momento."),this.dbgContextView)if(t){let r={scope:`${t.scope.tagName.toLowerCase()}${t.scope.id?"#"+t.scope.id:""}${t.scope.className?"."+t.scope.className.split(" ").join("."):""}`,questionLength:t.questionText.length,questionSnippet:t.questionText.slice(0,150)+(t.questionText.length>150?"...":""),controlsCount:t.controls.length,controls:t.controls.map((a,s)=>({index:s+1,tag:a.tag,type:a.type,name:a.name||void 0,id:a.id||void 0,value:a.value||void 0,label:a.label||void 0,role:a.role}))};this.dbgContextView.textContent=JSON.stringify(r,null,2)}else this.dbgContextView.textContent="Aguardando captura de contexto pelo EasyQuiz...";this.dbgRawRespView&&(e?e.rawResponse?this.dbgRawRespView.textContent=e.rawResponse:this.dbgRawRespView.textContent=JSON.stringify({pageType:e.pageType,mode:e.mode,confidence:e.confidence,rationale:e.rationale,actions:e.actions},null,2):this.dbgRawRespView.textContent="Aguardando retorno da API Gemini..."),this.lastErrorMsg&&this.dbgErrorCard&&this.dbgErrorText&&(this.dbgErrorText.textContent=this.lastErrorMsg,this.dbgErrorCard.style.display="flex")}logToConsole(e,t){let n=new Date,r=`${String(n.getHours()).padStart(2,"0")}:${String(n.getMinutes()).padStart(2,"0")}:${String(n.getSeconds()).padStart(2,"0")}.${String(Math.floor(n.getMilliseconds()/100))}`,a=e;e.startsWith(">")?a=`> [${r}] ${e.slice(1).trim()}`:a=`[${r}] ${e}`;let s="all";t==="text-red"||a.includes("[ERRO]")||a.includes("Falha")||a.includes("Error")?s="error":a.includes("[IA]")||a.includes("[RAG]")||a.includes("Tokens")||a.includes("Gemini")||a.includes("Modelo:")?s="ai":(a.includes("[DOM]")||a.includes("[EXEC]")||a.includes("[VERIF]")||a.includes("[NAV]"))&&(s="dom");let i={id:Date.now()+Math.random(),timestamp:r,message:a,colorClass:t,category:s};for(this.logEntries.push(i);this.logEntries.length>250;)this.logEntries.shift();if(this.updateLogCounters(),s==="error"&&this.setLastError(a),this.liveDebugTerminal&&(this.activeLogFilter==="all"||this.activeLogFilter===s)){let d=document.createElement("div");for(d.textContent=a,t&&(d.className=t),this.liveDebugTerminal.appendChild(d);this.liveDebugTerminal.children.length>250;)this.liveDebugTerminal.removeChild(this.liveDebugTerminal.firstChild);this.autoScrollLogs&&(this.liveDebugTerminal.scrollTop=this.liveDebugTerminal.scrollHeight)}if(this.apConsole){let d=document.createElement("div");for(d.textContent=a,t&&(d.className=t),this.apConsole.appendChild(d),this.apConsole.scrollTop=this.apConsole.scrollHeight;this.apConsole.children.length>150;)this.apConsole.removeChild(this.apConsole.firstChild)}if(this.executionConsole){let d=document.createElement("div");for(d.textContent=a,t&&(d.className=t),this.executionConsole.appendChild(d),this.executionConsole.scrollTop=this.executionConsole.scrollHeight;this.executionConsole.children.length>150;)this.executionConsole.removeChild(this.executionConsole.firstChild)}}setProgress(e,t){if(!this.progressContainer||!this.progressBar)return;if(e<=0){this.progressContainer.style.display="none",this.progressBar.style.width="0%";return}this.progressContainer.style.display="flex";let n=Math.min(100,Math.max(0,Math.round(e)));this.progressBar.style.width=`${n}%`,this.progressVal&&(this.progressVal.textContent=`${n}%`),t&&this.progressLabel&&(this.progressLabel.textContent=t),n>=100&&setTimeout(()=>{this.progressContainer&&this.progressBar&&this.progressBar.style.width==="100%"&&(this.progressContainer.style.display="none")},1500)}updateContext(e,t){this.latestContext=e,t&&(this.latestPlan=t,t.imageDescriptions&&(this.latestImageDescriptions=t.imageDescriptions)),this.activeTab==="brain"?(this.renderContextTree(),this.refreshBrainCanvas(),t&&this.refreshInspectorView()):this.activeTab==="debug"&&this.refreshDebugView()}updateImages(e){this.latestImages=e,this.activeTab==="brain"&&(this.renderContextTree(),this.refreshBrainCanvas()),this.activeTab==="brain"&&(this.brainSelectedFolder==="media-images"||(this.brainActiveTab||"").startsWith("img-"))&&this.refreshBrainCanvas()}renderContextTree(){if(!this.contextTreeContainer)return;let e=this.latestContext,t=De(),n=this.latestPlan;this.contextTreeContainer.innerHTML="";let r=this.createTreeFolder(" P\xC1GINA & ESCOPO ATUAL",!0,[{label:"T\xEDtulo",value:document.title||"Sem t\xEDtulo"},{label:"URL",value:window.location.pathname||"/"},{label:"Escopo DOM",value:e?`${e.scope.tagName.toLowerCase()}${e.scope.className?"."+e.scope.className.split(" ").join("."):""}`:"Document"},{label:"Tamanho Texto",value:e?`${e.questionText.length} caracteres`:"N\xE3o analisado"},{label:"Trecho Enunciado",value:e?`"${e.questionText.slice(0,120)}..."`:"Nenhum"}]);this.contextTreeContainer.appendChild(r);let a=e?e.controls:[],s=a.map((p,h)=>{let b=p.role==="navigation"||p.type==="button",A=!b&&p.value?` [val: "${p.value}"]`:"";return{label:`[#${h+1}] ${p.type.toUpperCase()}`,value:`${p.label||p.id||p.name||"(Sem r\xF3tulo)"}${A}`.trim(),badge:b?"Navega\xE7\xE3o":p.role||p.type}}),i=this.createTreeFolder(`\uFE0F CONTROLES DETECTADOS (${a.length})`,a.length>0,s);this.contextTreeContainer.appendChild(i);let d=t.map((p,h)=>({label:`Mem\xF3ria #${h+1}`,value:p,badge:"RAG"})),l=this.createTreeFolder(` MEM\xD3RIA RAG ACUMULADA (${t.length})`,t.length>0,d);if(this.contextTreeContainer.appendChild(l),n){let p=this.createTreeFolder(` \xDALTIMO PLANO IA (${n.actions.length} a\xE7\xF5es)`,!0,[{label:"Tipo P\xE1gina",value:n.pageType,badge:`${(n.confidence*100).toFixed(0)}%`},{label:"Modo",value:n.mode},{label:"Racioc\xEDnio",value:n.rationale||"N/A"},...n.actions.map((h,b)=>({label:`A\xE7\xE3o #${b+1} (${h.t})`,value:JSON.stringify(h)}))]);this.contextTreeContainer.appendChild(p)}let u=this.latestImages,f=this.latestImageDescriptions,c=u.map((p,h)=>{let b=f.find(q=>q.index===h),A=(p.captureStatus==="captured"||p.captureStatus==="text_only",""),v=p.captureStatus==="captured"?"Visual":p.captureStatus==="text_only"?"Texto":"Falhou",y=b?b.relevant?" Relevante":"\uFE0F Ignorada":"\u2014",C=b?b.description:p.textContext?p.textContext:"Aguardando an\xE1lise IA...";return{label:`${A} Img ${h+1} [${v}]`,value:`${C}`,badge:y,imgSrc:p.base64?`data:${p.mediaType||"image/jpeg"};base64,${p.base64}`:void 0}}),m=this.createTreeFolder(`\uFE0F IMAGENS DETECTADAS (${u.length})`,!0,c);this.contextTreeContainer.appendChild(m)}createTreeFolder(e,t,n){let r=document.createElement("div");r.className="eq-tree-node";let a=document.createElement("div");a.className="eq-tree-header",a.innerHTML=`<span class="eq-tree-arrow">${t?"\u25BC":"\u25B6"}</span> <span>${e}</span>`;let s=document.createElement("div");if(s.className="eq-tree-content",s.style.display=t?"flex":"none",n.length===0)s.innerHTML='<div class="text-muted" style="padding: 2px 0;">Nenhum item registrado.</div>';else for(let i of n){let d=document.createElement("div");d.className="eq-tree-leaf";let l="";i.imgSrc&&i.imgSrc.startsWith("data:image")&&(l=`<div style="margin-top: 8px; margin-bottom: 4px;"><img src="${i.imgSrc}" style="max-width: 100%; max-height: 120px; border-radius: 4px; border: 1px solid #3c4043; background: #1e1f22;" alt="Captura"></div>`),d.innerHTML=`
          <div style="display: flex; align-items: flex-start; gap: 8px; width: 100%;">
            <strong style="color:#ffffff; min-width: 80px;">${i.label}:</strong>
            <div style="flex:1; display: flex; flex-direction: column;">
              <span style="word-break: break-word; color:#aaaaaa;">${i.value}</span>
              ${l}
            </div>
            ${i.badge?`<span class="eq-tree-badge" style="white-space: nowrap;">${i.badge}</span>`:""}
          </div>
        `,s.appendChild(d)}return a.addEventListener("click",()=>{let i=s.style.display==="none";s.style.display=i?"flex":"none";let d=a.querySelector(".eq-tree-arrow");d&&(d.textContent=i?"\u25BC":"\u25B6")}),r.appendChild(a),r.appendChild(s),r}toggle(e){e!==void 0?this.isCollapsed=!e:this.isCollapsed=!this.isCollapsed,this.isCollapsed?this.sidebarEl.classList.add("eq-collapsed"):(this.sidebarEl.classList.remove("eq-collapsed"),D.getAllKeys().length===0&&(this.switchTab("settings"),this.apiKeyInput.focus()))}updateAutopilotUi(e){let t=this.analyzeBtn;if(t){let n=t.closest(".eq-cta-wrapper"),r=e?"Parar Autopilot":"Resolver Autopilot",a=e?S.stop:S.sparkles;n&&(n.classList.toggle("is-running",e),n.classList.toggle("is-idle",!e)),t.classList.toggle("is-running",e),t.classList.toggle("is-idle",!e),t.classList.toggle("danger",e),t.innerHTML=`<span class="eq-btn-icon">${a}</span><span class="eq-btn-label">${r}</span>`,t.title=e?"Interromper o Resolver Autopilot":"Ligar o Resolver Autopilot"}this.apToggleBtn&&(this.apToggleBtn.innerHTML=`${e?S.stop:S.sparkles} ${e?"Parar Autopilot":"Resolver Autopilot"}`,this.apToggleBtn.classList.toggle("danger",e),this.apToggleBtn.title=e?"Interromper o Resolver Autopilot":"Ligar o Resolver Autopilot")}setOperationState(e,t){let n=this.shadow.querySelector("#eq-operation-state"),r=this.shadow.querySelector("#eq-status-card");n&&(n.innerHTML=`${S.info} <span>${e}</span>`,n.className=`eq-operation-state is-${t}`),r&&(r.classList.remove("is-busy","is-success","is-error","is-warning","is-info"),r.classList.add(`is-${t}`));let a=this.analyzeBtn;if(a){let s=a.closest(".eq-cta-wrapper");s&&(s.classList.remove("status-busy","status-success","status-error","status-warning","status-info"),s.classList.add(`status-${t}`)),a.classList.remove("status-busy","status-success","status-error","status-warning","status-info"),a.classList.add(`status-${t}`)}}setInterrupted(e="An\xE1lise interrompida pelo usu\xE1rio."){this.isBusy=!1,[this.modelSelect,this.modeSelect,this.engineSelect,this.dryRunCheckbox,this.autoApplyCheckbox,this.autoAdvanceCheckbox,this.useVisionCheckbox,this.toastStackingCheckbox].forEach(n=>n.disabled=!1);let t=this.analyzeBtn.closest(".eq-cta-wrapper");t&&t.classList.remove("is-running"),this.analyzeBtn.disabled=!1,this.analyzeBtn.classList.remove("danger"),this.analyzeBtn.innerHTML=`<span class="eq-btn-icon">${S.sparkles}</span><span class="eq-btn-label">Resolver Autopilot</span>`,this.analyzeBtn.title="Ligar o Resolver Autopilot",this.applyBtn&&(this.applyBtn.disabled=!this.latestPlan||!this.latestPlan.actions.length),this.stopStopwatch(),this.stopQuestionTimer(),this.dotPulseAp&&(this.dotPulseAp.className="eq-dot-pulse stopped"),this.dotPulseAdv&&(this.dotPulseAdv.className="eq-dot-pulse stopped"),this.launcherDot&&(this.launcherDot.className="eq-launcher-dot stopped"),this.metricsLiveStatus&&(this.metricsLiveStatus.textContent="Interrompido",this.metricsLiveStatus.className="eq-live-stopwatch-status is-warning"),this.autopilot.isActive()||this.updateAutopilotUi(!1),this.setStatus(e,"warning")}setBusy(e,t){this.isBusy=e,[this.modelSelect,this.modeSelect,this.engineSelect,this.dryRunCheckbox,this.autoApplyCheckbox,this.autoAdvanceCheckbox,this.useVisionCheckbox,this.toastStackingCheckbox].forEach(r=>r.disabled=e);let n=this.analyzeBtn?.closest(".eq-cta-wrapper");e?(n&&n.classList.add("is-running"),this.analyzeBtn&&(this.analyzeBtn.disabled=!1,this.analyzeBtn.classList.add("danger"),this.analyzeBtn.innerHTML=`<span class="eq-btn-icon">${S.stop}</span><span class="eq-btn-label">Parar Autopilot</span>`,this.analyzeBtn.title="Interromper o Resolver Autopilot"),this.applyBtn&&(this.applyBtn.disabled=!0),this.startStopwatch(),this.startQuestionTimer(),this.dotPulseAp&&(this.dotPulseAp.className="eq-dot-pulse busy"),this.dotPulseAdv&&(this.dotPulseAdv.className="eq-dot-pulse busy"),this.launcherDot&&(this.launcherDot.className="eq-launcher-dot busy"),this.setOperationState("Analisando...","busy"),this.metricsLiveStatus&&(this.metricsLiveStatus.textContent="Calculando...",this.metricsLiveStatus.className="eq-live-stopwatch-status is-busy"),t&&this.setStatus(t,"info")):(this.analyzeBtn&&(this.analyzeBtn.disabled=!1,this.analyzeBtn.classList.remove("danger"),this.analyzeBtn.innerHTML=`<span class="eq-btn-icon">${S.sparkles}</span><span class="eq-btn-label">Resolver Autopilot</span>`,this.analyzeBtn.title="Ligar o Resolver Autopilot"),this.applyBtn&&(this.applyBtn.disabled=!this.latestPlan||!this.latestPlan.actions.length),this.stopStopwatch(),this.stopQuestionTimer(),this.dotPulseAp&&(this.dotPulseAp.className="eq-dot-pulse"),this.dotPulseAdv&&(this.dotPulseAdv.className="eq-dot-pulse"),this.launcherDot&&(this.launcherDot.className="eq-launcher-dot"),this.setOperationState(this.autopilot.isActive()?"Monitorando":"Pronto","idle"),this.metricsLiveStatus&&this.metricsLiveStatus.textContent==="Calculando..."&&(this.metricsLiveStatus.textContent="Em espera",this.metricsLiveStatus.className="eq-live-stopwatch-status"))}_lastToastMsg="";_lastToastTime=0;_toastQueue=[];_toastVisible=[];_toastOverflowBtn=null;showToast(e,t="info",n=3500,r=!1){let a=Date.now(),s=t+":"+e;if(!r&&s===this._lastToastMsg&&a-this._lastToastTime<1500)return;this._lastToastMsg=s,this._lastToastTime=a;let i={success:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>',error:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>',warning:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>',info:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>'},d={success:"#22c55e",error:"#ef4444",warning:"#f59e0b",info:"#60a5fa"},l=d[t]||d.info,u=i[t]||i.info,f=this.initialSettings.toastStacking??!0,c={message:e,type:t,col:l,iconHtml:u,expiresAt:Date.now()+n};f&&this._toastQueue.push(c);let m=this.shadow.querySelector("#eq-toast-container");m||(m=document.createElement("div"),m.id="eq-toast-container",m.style.cssText="position:fixed;bottom:8px;left:12px;z-index:2147483647;display:flex;flex-direction:column-reverse;gap:5px;pointer-events:none;max-width:300px;",this.shadow.appendChild(m));let p=5,h=(C,q,x,E)=>{let k=document.createElement("div");k.style.cssText="display:flex;align-items:center;gap:8px;background:rgba(10,10,18,0.98);border:1px solid rgba(255,255,255,0.09);border-left:3px solid "+q+";padding:7px 12px 7px 10px;border-radius:7px;font-size:11px;color:rgba(235,240,248,0.92);font-family:inherit;box-shadow:0 4px 20px rgba(0,0,0,0.65),0 1px 4px rgba(0,0,0,0.4);pointer-events:all;max-width:296px;word-break:break-word;transform:translateX(-10px);opacity:0;transition:transform 0.22s cubic-bezier(0.34,1.5,0.64,1),opacity 0.16s ease;cursor:pointer;";let w=document.createElement("span");w.style.cssText="color:"+q+";display:inline-flex;flex-shrink:0;width:14px;height:14px;",w.innerHTML=x;let M=document.createElement("span");return M.textContent=C,M.style.flex="1",k.appendChild(w),k.appendChild(M),k};this._toastVisible=this._toastVisible.filter(C=>C.isConnected);let b=f?Math.max(0,this._toastQueue.filter(C=>C.expiresAt>Date.now()).length-p):0;if(f&&this._toastVisible.length>=p){this._updateToastOverflow(m,b);return}let A=h(e,l,u,n);m.appendChild(A),f&&this._toastVisible.push(A),requestAnimationFrame(()=>requestAnimationFrame(()=>{A.style.transform="translateX(0)",A.style.opacity="1"}));let v=()=>{A.style.transform="translateX(-10px)",A.style.opacity="0",setTimeout(()=>{A.remove(),f&&(this._toastVisible=this._toastVisible.filter(C=>C!==A),this._toastQueue=this._toastQueue.filter(C=>C.expiresAt>Date.now()),this._updateToastOverflow(m,Math.max(0,this._toastQueue.length-this._toastVisible.filter(C=>C.isConnected).length)))},200)},y=setTimeout(v,n);A.addEventListener("click",()=>{clearTimeout(y),v()},{once:!0}),f&&this._updateToastOverflow(m,b)}_updateToastOverflow(e,t){if(this._toastOverflowBtn&&(this._toastOverflowBtn.remove(),this._toastOverflowBtn=null),t<=0)return;let n=document.createElement("button");n.style.cssText="display:flex;align-items:center;gap:5px;background:rgba(14,14,20,0.92);border:1px solid rgba(255,255,255,0.1);border-radius:5px;font-size:10px;color:rgba(200,210,225,0.8);padding:4px 8px;cursor:pointer;pointer-events:all;font-family:inherit;",n.innerHTML=`<svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/></svg><span>+${t} notif.</span>`,n.addEventListener("click",()=>this._showToastHistory()),this._toastOverflowBtn=n,e.appendChild(n)}_showToastHistory(){let e=Date.now(),t=this._toastQueue.filter(a=>a.expiresAt>e);if(t.length===0)return;let n=this.shadow.querySelector("#eq-toast-container");if(!n)return;this._toastOverflowBtn&&(this._toastOverflowBtn.remove(),this._toastOverflowBtn=null);let r={success:"#22c55e",error:"#ef4444",warning:"#f59e0b",info:"#60a5fa"};for(let a of t){if(n.querySelectorAll(".eq-toast-hist").length>20)break;let s=document.createElement("div");s.className="eq-toast-hist",s.style.cssText=`display:flex;align-items:center;gap:7px;background:rgba(14,14,20,0.95);border:1px solid rgba(255,255,255,0.07);border-left:3px solid ${a.col};padding:5px 9px 5px 8px;border-radius:5px;font-size:10.5px;color:rgba(200,210,225,0.82);font-family:inherit;box-shadow:0 2px 10px rgba(0,0,0,0.4);pointer-events:all;max-width:288px;word-break:break-word;`;let i=document.createElement("span");i.style.cssText=`color:${a.col};display:inline-flex;flex-shrink:0;`,i.innerHTML=a.iconHtml;let d=document.createElement("span");d.textContent=a.message,d.style.flex="1";let l=document.createElement("span"),u=Math.ceil((a.expiresAt-e)/1e3);l.textContent=`${u}s`,l.style.cssText="color:rgba(150,160,180,0.5);font-size:9px;flex-shrink:0;",s.appendChild(i),s.appendChild(d),s.appendChild(l),s.addEventListener("click",()=>s.remove(),{once:!0}),n.appendChild(s),setTimeout(()=>s.remove(),Math.max(500,a.expiresAt-e))}}setStatus(e,t="info"){e&&e.length>4&&(t==="success"||t==="error")?this.showToast(e,t,3500):t==="warning"&&e.length>8?this.showToast(e,t,4e3):t==="info"&&e.length>10&&this.showToast(e,t,2400);let n=this.shadow.querySelector("#eq-status-summary");n&&(n.textContent=e),this.statusTextAp&&this.statusTextAp&&(this.statusTextAp.textContent=e),this.statusTextAdv&&this.statusTextAdv&&(this.statusTextAdv.textContent=e),t==="error"?(this.setOperationState("Bloqueado","error"),this.dotPulseAp&&(this.dotPulseAp.className="eq-dot-pulse error"),this.dotPulseAdv&&(this.dotPulseAdv.className="eq-dot-pulse error"),this.launcherDot&&(this.launcherDot.className="eq-launcher-dot error")):t==="warning"?(this.setOperationState("Interrompido","warning"),this.dotPulseAp&&(this.dotPulseAp.className="eq-dot-pulse stopped"),this.dotPulseAdv&&(this.dotPulseAdv.className="eq-dot-pulse stopped"),this.launcherDot&&(this.launcherDot.className="eq-launcher-dot stopped")):t==="success"?(this.setOperationState("Confirmado","success"),this.dotPulseAp&&(this.dotPulseAp.className="eq-dot-pulse"),this.dotPulseAdv&&(this.dotPulseAdv.className="eq-dot-pulse"),this.launcherDot&&(this.launcherDot.className="eq-launcher-dot")):this.isBusy?(this.setOperationState("Analisando...","busy"),this.dotPulseAp&&(this.dotPulseAp.className="eq-dot-pulse busy"),this.dotPulseAdv&&(this.dotPulseAdv.className="eq-dot-pulse busy"),this.launcherDot&&(this.launcherDot.className="eq-launcher-dot busy")):(this.setOperationState(this.autopilot.isActive()?"Monitorando":"Pronto","info"),this.dotPulseAp&&(this.dotPulseAp.className="eq-dot-pulse"),this.dotPulseAdv&&(this.dotPulseAdv.className="eq-dot-pulse"),this.launcherDot&&(this.launcherDot.className="eq-launcher-dot"));let r=e.includes("Alternando")||e.includes("indispon\xEDvel")||e.includes("fallback")||e.includes("alternativo"),a=t==="error"?"> [ERRO] ":t==="success"?"> [SUCESSO] ":t==="warning"?"> [PARADO] ":r?"> [FALLBACK] ":"> [SYS] ",s=t==="error"?"text-red":t==="success"?"text-green":t==="warning"||r?"text-yellow":"text-blue";this.logToConsole(`${a}${e}`,s)}setPlan(e,t){if(this.latestPlan=e,this.resultContainer.style.display="flex",e.durationMs&&this.stopStopwatch(e.durationMs),e.usedModel){let i=this.shadow.querySelector("#eq-active-model-badge");if(i){let d=e.usedModel.replace("gemini-","").replace("-latest","");i.textContent=`\u25CF ${d}`,i.style.display="inline-block"}}let n=this.shadow.querySelector("#eq-badges");if(n){n.replaceChildren();let i=document.createElement("span");i.className="eq-count-badge",i.textContent=String(e.actions.length),i.title=`${e.actions.length} a\xE7\xF5es \xB7 ${Math.round(e.confidence*100)}% confian\xE7a`,n.appendChild(i)}let r=this.shadow.querySelector("#eq-rationale-text");r.textContent=e.rationale;let a=this.shadow.querySelector("#eq-actions-list");a.innerHTML="";for(let i of e.actions){let d=document.createElement("div");d.className="eq-action-item";let l="";i.t==="chk"?l=`chk ${i.id} (${i.c})`:i.t==="val"?l=`val "${i.v}" -> ${i.id}`:i.t==="sel"?l=`sel "${Array.isArray(i.v)?i.v.join(","):i.v}" -> ${i.id}`:i.t==="clk"?l=`clk ${i.id}`:i.t==="adv"?l="adv":i.t==="js"?l=`js: ${String(i.v).slice(0,40)}...`:i.t==="drag"&&(l=`drag "${i.from}" -> "${i.to}"`);let u=document.createElement("span");u.className=`eq-action-badge t-${i.t}`,u.textContent=i.t.toUpperCase();let f=document.createElement("span");f.textContent=l,d.append(u,f),a.appendChild(d)}this.applyBtn&&(this.applyBtn.disabled=!t||!e.actions.length);let s=this.shadow.querySelector("#eq-execution-card");s&&(s.hidden=!0),e.imageDescriptions&&e.imageDescriptions.length>0&&(this.latestImageDescriptions=e.imageDescriptions),this.refreshInspectorView(),this.refreshDebugView()}setExecutionReport(e){let t=this.shadow.querySelector("#eq-execution-card"),n=this.shadow.querySelector("#eq-execution-summary"),r=this.shadow.querySelector("#eq-execution-list");if(!t||!n||!r)return;t.hidden=!1,n.textContent=e.navigationVerified?`${e.verified}/${e.applied} a\xE7\xF5es verificadas. Navega\xE7\xE3o confirmada.`:`${e.verified}/${e.applied} a\xE7\xF5es verificadas. ${e.navigationEvidence}`,n.className=`eq-execution-summary ${e.success?"is-success":"is-warning"}`,r.replaceChildren();let a=this.shadow.querySelector("#eq-execution-placeholder");a&&(a.textContent=e.navigationVerified?"Fluxo conclu\xEDdo: aplica\xE7\xE3o e navega\xE7\xE3o confirmadas.":`Fluxo interrompido: ${e.navigationEvidence}`,a.className=`eq-execution-placeholder ${e.success?"is-success":"is-warning"}`);for(let s of e.reports){let i=document.createElement("div");i.className=`eq-execution-row ${s.verified?"is-success":"is-failed"}`;let d=document.createElement("span");d.className="eq-execution-state",d.textContent=s.verified?"OK":"FALHOU";let l=document.createElement("div");l.className="eq-execution-details";let u=document.createElement("strong");u.textContent=s.target;let f=document.createElement("span");if(f.textContent=`${s.strategy} | ${s.evidence}`,l.append(u,f),i.append(d,l),s.error){let c=document.createElement("small");c.textContent=s.error,i.appendChild(c)}r.appendChild(i)}}setInspectorPrompt(e,t){this.latestPromptText=e,this.inspPrompt&&(this.inspPrompt.textContent=e),t&&this.inspModel&&(this.inspModel.textContent=t),this.inspLatency&&(this.inspLatency.textContent="Aguardando IA..."),this.activeTab==="debug"&&this.refreshDebugView()}refreshInspectorView(){let e=this.latestPlan;this.inspModel&&(this.inspModel.textContent=e?.usedModel||this.initialSettings.model),this.inspLatency&&(this.inspLatency.textContent=e?.durationMs?`${e.durationMs}ms`:"--"),this.inspTokens&&(this.inspTokens.textContent=e?.tokensUsed?`${e.tokensUsed}`:"--"),this.inspPrompt&&(this.inspPrompt.textContent=e?.promptSent||this.latestPromptText||""),this.inspRationale&&(this.inspRationale.textContent=e?.rationale||""),this.renderBrainExplorer(),this.brainActiveTab&&this.renderBrainFileContent(this.brainActiveTab)}brainOpenTabs=[];brainActiveTab=null;brainSelectedFolder=null;brainOpenFolders=new Set(["folder-ia","folder-ctx","folder-meta"]);brainCanvasHidden=!1;brainCanvasHeight=280;GLOBAL_ID="__global__";GLOBAL_LABEL="Contexto Global";getBrainFileColor(e){return{file:"#7eb8f7",code:"#f4c96a",list:"#a5d6a7",chip:"#80cbc4",sparkles:"#ce93d8",clock:"#ffcc80",info:"#81deea"}[e]||"#9e9e9e"}renderMarkdown(e){let t=u=>u.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"),n="",r=e.split(`
`),a=!1,s="",i=[],d=()=>{if(!a)return"";a=!1;let u=i.join(`
`);return i=[],`<div class="eq-md-codeblock"><div class="eq-md-codelang">${t(s)}</div><pre><code>${t(u)}</code></pre></div>`},l=u=>u.replace(/`([^`]+)`/g,(f,c)=>`<code class="eq-md-inline">${t(c)}</code>`).replace(g,(f,c)=>`<strong><em>${t(c)}</em></strong>`).replace(g,(f,c)=>`<strong>${t(c)}</strong>`).replace(g,(f,c)=>`<em>${t(c)}</em>`).replace(/~~([^~]+)~~/g,(f,c)=>`<del>${t(c)}</del>`);for(let u of r){if(/^```/.test(u)){a?n+=d():(a=!0,s=u.slice(3).trim()||"text",i=[]);continue}if(a){i.push(u);continue}let f=u.match(/^#s+(.+)/),c=u.match(/^##s+(.+)/),m=u.match(/^###s+(.+)/);if(m){n+=`<h3 class="eq-md-h3">${l(m[1])}</h3>`;continue}if(c){n+=`<h2 class="eq-md-h2">${l(c[1])}</h2>`;continue}if(f){n+=`<h1 class="eq-md-h1">${l(f[1])}</h1>`;continue}let p=u.match(/^>s*(.*)/);if(p){n+=`<blockquote class="eq-md-bq">${l(p[1])}</blockquote>`;continue}if(/^---+$/.test(u)){n+='<hr class="eq-md-hr">';continue}let h=u.match(/^[-*+]s+(.+)/);if(h){n+=`<div class="eq-md-li"><span class="eq-md-bullet">\xB7</span><span>${l(h[1])}</span></div>`;continue}if(u.trim()===""){n+='<div class="eq-md-gap"></div>';continue}n+=`<div class="eq-md-p">${l(t(u))}</div>`}return n+=d(),n}getBrainFolders(){let e=this.latestPlan,t=this.latestImages.map((r,a)=>({id:"img-"+a,label:"img-"+(a+1)+"."+(r.mediaType?.split("/")?.[1]||"jpg"),icon:"image"})),n=[{id:"folder-ia",label:"Resposta da IA",files:[{id:"rationale",label:"rationale.md",icon:"file"},{id:"actions",label:"actions.json",icon:"code"},{id:"summary",label:"resumo.txt",icon:"list"}]},{id:"folder-ctx",label:"Contexto & Prompt",files:[{id:"prompt",label:"prompt-enviado.txt",icon:"file"},{id:"rag",label:"rag-context.txt",icon:"chip"}]},{id:"folder-meta",label:"Metadados",files:[{id:"meta-model",label:"modelo.info",icon:"sparkles"},{id:"meta-latency",label:"latencia.info",icon:"clock"},{id:"meta-tokens",label:"tokens.info",icon:"info"}]}];return e?.executionResult&&n.push({id:"folder-exec",label:"Execu\xE7\xE3o",files:[{id:"exec-steps",label:"steps.log",icon:"list"},{id:"exec-result",label:"resultado.log",icon:"file"}]}),n.push({id:"folder-media",label:"M\xEDdia",files:[],subfolders:[{id:"media-images",label:"Imagens",icon:"image",files:t}]}),n}getActiveFolder(){if(!this.brainActiveTab)return null;for(let e of this.getBrainFolders()){if(e.files.some(t=>t.id===this.brainActiveTab))return e.id;for(let t of e.subfolders||[])if(t.files.some(n=>n.id===this.brainActiveTab))return t.id}return null}smartCopy(){let e=this.shadow.querySelector("#eq-brain-content");if(this.brainActiveTab&&this.brainActiveTab.startsWith("img-")){let n=parseInt(this.brainActiveTab.slice(4),10),r=this.latestImages[n];if(r?.base64){let a="data:"+(r.mediaType||"image/jpeg")+";base64,"+r.base64,s=this.latestImageDescriptions.find(d=>d.index===n),i=["[EasyQuiz] Imagem "+(n+1)+" de "+this.latestImages.length,"Status: "+(r.captureStatus||"desconhecido"),"Tipo: "+(r.mediaType||"--"),r.alt?"Alt: "+r.alt:"",r.source?"Fonte: "+r.source:"",s?.description?"Analise IA: "+s.description:"",r.textContext?"Contexto: "+r.textContext:"","Data URI: "+a.slice(0,80)+"..."].filter(Boolean).join(`
`);navigator.clipboard.writeText(i).then(()=>this.showToast("Imagem copiada (URI + metadados)","success",2500));return}}if(this.brainSelectedFolder==="media-images"){let n=["[EasyQuiz] Imagens capturadas: "+this.latestImages.length];this.latestImages.forEach((r,a)=>{let s=this.latestImageDescriptions.find(i=>i.index===a);n.push(a+1+". "+(r.captureStatus||"?")+(s?.description?" \u2014 "+s.description.slice(0,80):""))}),navigator.clipboard.writeText(n.join(`
`)).then(()=>this.showToast("Lista de imagens copiada","success",2500));return}if(this.brainActiveTab){let n=this.getBrainFileText(this.brainActiveTab);if(n){navigator.clipboard.writeText(n).then(()=>this.showToast("Conte\xFAdo copiado","success",2200));return}}if(this.brainSelectedFolder){let n=e?.innerText?.trim()||"";if(n){navigator.clipboard.writeText(n).then(()=>this.showToast("Estrutura copiada","success",2200));return}}let t=e?.innerText?.trim()||"";t?navigator.clipboard.writeText(t).then(()=>this.showToast("Conte\xFAdo copiado","success",2200)):this.showToast("Nada selecionado para copiar","warning",2e3)}initBrainControls(){let e=this.shadow.querySelector("#eq-brain-resize-handle"),t=this.shadow.querySelector(".eq-brain-canvas"),n=this.shadow.querySelector("#eq-brain-canvas-toggle"),r=this.shadow.querySelector("#eq-copy-prompt-btn");if(e&&t){let a=0,s=0;e.addEventListener("mousedown",i=>{i.preventDefault(),a=i.clientY,s=t.getBoundingClientRect().height;let d=u=>{let f=Math.max(100,Math.min(520,s+u.clientY-a));t.style.height=f+"px",this.brainCanvasHeight=f},l=()=>{window.removeEventListener("mousemove",d),window.removeEventListener("mouseup",l)};window.addEventListener("mousemove",d),window.addEventListener("mouseup",l)})}n&&t&&(n.innerHTML=this.brainCanvasHidden?S.eyeOff:S.eye,n.title=this.brainCanvasHidden?"Mostrar visualizador":"Ocultar visualizador",n.addEventListener("click",()=>{this.brainCanvasHidden=!this.brainCanvasHidden,this.brainCanvasHidden?(t.classList.add("is-hidden"),n.innerHTML=S.eyeOff,n.title="Mostrar visualizador"):(t.classList.remove("is-hidden"),n.innerHTML=S.eye,n.title="Ocultar visualizador")})),r&&r.addEventListener("click",()=>this.smartCopy())}copyCurrentContent(){this.smartCopy()}getBrainFileText(e){if(e===this.GLOBAL_ID)return this.buildGlobalContext();if(e.startsWith("img-")){let r=parseInt(e.slice(4),10),a=this.latestImages[r];if(!a)return"Imagem n\xE3o encontrada.";let s=this.latestImageDescriptions.find(i=>i.index===r);return[`Imagem ${r+1} de ${this.latestImages.length}`,`Status: ${a.captureStatus||"desconhecido"}`,`Relev\xE2ncia: ${s?.relevant??!0?"Relevante":"Ignorada"}`,`Tipo: ${a.mediaType||"--"}`,a.alt?`Alt: ${a.alt}`:"",a.source?`Fonte: ${a.source}`:"",a.associatedLabel?`R\xF3tulo: ${a.associatedLabel}`:"",s?.description?`
An\xE1lise IA: ${s.description}`:"",a.textContext?`
Contexto textual: ${a.textContext}`:""].filter(Boolean).join(`
`)}let t=this.latestPlan;return{rationale:t?.rationale||"Aguardando racioc\xEDnio da IA (ou extra\xE7\xE3o em andamento)...",actions:t?.actions?.length?JSON.stringify(t.actions,null,2):"// Nenhuma a\xE7\xE3o planejada no momento.",summary:t?`Modo: ${t.mode||"auto"}
Confian\xE7a: ${Math.round((t.confidence||0)*100)}%
A\xE7\xF5es: ${t.actions?.length||0}
Modelo: ${t.usedModel||"--"}`:"Aguardando primeira an\xE1lise completa...",prompt:t?.promptSent||this.latestPromptText||"Nenhum prompt em mem\xF3ria. A IA ainda n\xE3o foi acionada.",rag:t?.ragContext||"Nenhuma mem\xF3ria estendida usada ou capturada.","meta-model":`Modelo Ativo: ${t?.usedModel||this.initialSettings.model||"--"}`,"meta-latency":t?.durationMs?`Lat\xEAncia: ${t.durationMs}ms`:"Lat\xEAncia: --","meta-tokens":t?.tokensUsed?`Tokens: ${t.tokensUsed}`:"Tokens: --","exec-steps":t?.executionResult?.steps?.map(r=>JSON.stringify(r)).join(`
`)||"Passos de execu\xE7\xE3o ainda n\xE3o iniciados.","exec-result":t?.executionResult?JSON.stringify(t.executionResult,null,2):"Aguardando resultado de execu\xE7\xE3o..."}[e]??"Conte\xFAdo n\xE3o dispon\xEDvel para este arquivo."}buildGlobalContext(){let e=this.latestPlan,t=this.latestContext,n=this.latestImages,r=s=>String(s??"-- sem dados --"),a=["# Vis\xE3o Global \u2014 EasyQuiz","",`**URL:** ${window.location.href}`,`**T\xEDtulo:** ${document.title}`,`**M\xEDdias Capturadas:** ${n.length} imagem(ns)`,"","---","","## Status da Extra\xE7\xE3o Local","","### Texto do Enunciado Detectado",t?t.questionText:"Aguardando captura do DOM...","","### Controles (Alternativas/Bot\xF5es)",t&&t.controls.length>0?t.controls.map(s=>`- [${s.type}] ${s.label||s.id||s.name||s.value||"Sem r\xF3tulo"}`).join(`
`):"Nenhum controle capturado ainda.","","---","","## Resposta da IA","","### Racioc\xEDnio (Rationale)",r(e?.rationale||"Aguardando an\xE1lise da IA..."),"","### A\xE7\xF5es a Executar",e?.actions?.length?JSON.stringify(e.actions,null,2):"// Nenhuma a\xE7\xE3o planejada no momento.","","### Resumo",e?`- Modo: ${e.mode||"auto"}
- Confian\xE7a: ${Math.round((e.confidence||0)*100)}%
- Total de a\xE7\xF5es: ${e.actions?.length||0}
- Modelo: ${e.usedModel||"--"}`:"Aguardando primeira an\xE1lise...","","---","","## Inje\xE7\xE3o & Metadados","","### Prompt Enviado (Raw)",r(e?.promptSent||this.latestPromptText||"Nenhum prompt em mem\xF3ria."),"","### Contexto RAG Acumulado",r(e?.ragContext||"Nenhuma mem\xF3ria estendida usada."),"",`- **Modelo Configurado:** ${e?.usedModel||this.initialSettings.model||"--"}`,`- **Lat\xEAncia \xDAltimo Call:** ${e?.durationMs?e.durationMs+"ms":"--"}`,`- **Tokens Consumidos:** ${e?.tokensUsed??"--"}`,""];return e?.executionResult&&(a.push("---","","## Execu\xE7\xE3o Autom\xE1tica (Autopilot)",""),a.push("### Steps (Passo a Passo)"),a.push(e.executionResult?.steps?.map(s=>JSON.stringify(s)).join(`
`)||"Sem passos."),a.push("","### Resultado Final"),a.push(JSON.stringify(e.executionResult,null,2))),a.join(`
`)}renderBrainExplorer(){let e=this.shadow.querySelector("#eq-brain-explorer");if(!e)return;e.innerHTML="";let t=this.getActiveFolder(),n=document.createElement("div");n.className="eq-tree-file eq-tree-global"+(this.brainActiveTab===this.GLOBAL_ID?" is-selected":""),n.innerHTML=`<span class="eq-tree-ficon" style="color:#60a5fa">${S.folderTree}</span><span class="eq-tree-label">${this.GLOBAL_LABEL}</span>`,n.addEventListener("click",()=>{this.brainSelectedFolder=null,this.openBrainFile(this.GLOBAL_ID,this.GLOBAL_LABEL)}),e.appendChild(n);let r=document.createElement("div");r.className="eq-tree-sep",e.appendChild(r);for(let a of this.getBrainFolders()){let s=this.brainOpenFolders.has(a.id),i=this.brainSelectedFolder===a.id||t===a.id,d=document.createElement("div");d.className="eq-tree-folder"+(i?" is-folder-sel":"");let l=document.createElement("span");l.className="eq-tree-arrow",l.innerHTML=s?S.chevronDown:S.chevronRight,l.addEventListener("click",p=>{p.stopPropagation(),this.brainOpenFolders.has(a.id)?this.brainOpenFolders.delete(a.id):this.brainOpenFolders.add(a.id),this.renderBrainExplorer()}),d.appendChild(l);let u=document.createElement("span");u.className="eq-tree-ficon",u.style.color="#fbbf24",u.innerHTML=S.folder;let f=document.createElement("span");f.className="eq-tree-label",f.textContent=a.label,d.appendChild(u),d.appendChild(f),d.addEventListener("click",()=>{this.brainSelectedFolder=a.id,this.brainActiveTab=null,this.showFolderContent(a),this.renderBrainExplorer(),this.renderBrainTabs()}),e.appendChild(d);let c=document.createElement("div"),m=a.files.length+(a.subfolders?.reduce((p,h)=>p+h.files.length+1,0)??0);c.className="eq-tree-children"+(s?" is-open":""),c.style.setProperty("--child-count",String(m));for(let p of a.files){let h=this.getBrainFileColor(p.icon),b=document.createElement("div");b.className="eq-tree-file"+(this.brainActiveTab===p.id?" is-selected":""),b.innerHTML=`<span class="eq-tree-ficon" style="color:${h}">${S[p.icon]||S.file}</span><span class="eq-tree-label">${p.label}</span>`,b.addEventListener("click",A=>{A.stopPropagation(),this.brainSelectedFolder=null,this.openBrainFile(p.id,p.label)}),c.appendChild(b)}for(let p of a.subfolders||[]){let h=this.brainOpenFolders.has(p.id),b=this.brainSelectedFolder===p.id,A=document.createElement("div");A.className="eq-tree-folder eq-tree-subfolder"+(b?" is-folder-sel":""),A.style.paddingLeft="18px";let v=document.createElement("span");v.className="eq-tree-arrow",v.innerHTML=h?S.chevronDown:S.chevronRight,v.addEventListener("click",E=>{E.stopPropagation(),this.brainOpenFolders.has(p.id)?this.brainOpenFolders.delete(p.id):this.brainOpenFolders.add(p.id),this.renderBrainExplorer()}),A.appendChild(v);let y=document.createElement("span");y.className="eq-tree-ficon",y.style.color="#60a5fa",y.innerHTML=S[p.icon]||S.folder;let C=document.createElement("span");C.className="eq-tree-label",C.textContent=p.label;let q=document.createElement("span");q.style.cssText="font-size:9px;color:#666;margin-left:4px;flex-shrink:0;",q.textContent=String(p.files.length),A.appendChild(y),A.appendChild(C),A.appendChild(q),A.addEventListener("click",()=>{this.brainSelectedFolder=p.id,this.brainActiveTab=null,this.brainOpenFolders.add(p.id),this.showSubfolderContent(p),this.renderBrainExplorer(),this.renderBrainTabs()}),c.appendChild(A);let x=document.createElement("div");x.className="eq-tree-children"+(h?" is-open":""),x.style.setProperty("--child-count",String(p.files.length));for(let E of p.files){let k=this.getBrainFileColor(E.icon),w=document.createElement("div");w.className="eq-tree-file"+(this.brainActiveTab===E.id?" is-selected":""),w.style.paddingLeft="32px",w.innerHTML=`<span class="eq-tree-ficon" style="color:${k}">${S[E.icon]||S.file}</span><span class="eq-tree-label">${E.label}</span>`,w.addEventListener("click",M=>{M.stopPropagation(),this.brainSelectedFolder=null,this.openBrainFile(E.id,E.label)}),x.appendChild(w)}c.appendChild(x)}e.appendChild(c)}}showFolderContent(e){let t=this.shadow.querySelector("#eq-brain-content");if(!t)return;t.innerHTML="";let n=i=>String(i??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"),r=document.createElement("div");r.className="eq-folder-view";let a=document.createElement("div");a.className="eq-folder-view-header",a.innerHTML=`<span class="eq-tree-ficon" style="color:#fbbf24">${S.folder}</span><span>${n(e.label)}</span>`,r.appendChild(a);let s=document.createElement("div");s.className="eq-folder-view-files";for(let i of e.files){let d=this.getBrainFileColor(i.icon),l=document.createElement("div");l.className="eq-folder-view-row",l.innerHTML=`<span class="eq-tree-ficon" style="color:${d}">${S[i.icon]||S.file}</span><span>${n(i.label)}</span>`,l.addEventListener("click",()=>this.openBrainFile(i.id,i.label)),s.appendChild(l)}for(let i of e.subfolders||[]){let d=document.createElement("div");d.className="eq-folder-view-row",d.style.cssText="display:flex;align-items:center;gap:6px;padding:7px 10px;cursor:pointer;border-radius:5px;";let l=i.id==="media-images"?this.latestImages.length:i.files.length;d.innerHTML=`<span class="eq-tree-ficon" style="color:#60a5fa">${S[i.icon]||S.folder}</span><span style="flex:1">${n(i.label)}</span><span style="font-size:9px;color:#555;">${l} item${l!==1?"s":""}</span>`,d.addEventListener("mouseenter",()=>{d.style.background="rgba(255,255,255,0.04)"}),d.addEventListener("mouseleave",()=>{d.style.background=""}),d.addEventListener("click",()=>{this.brainSelectedFolder=i.id,this.brainActiveTab=null,this.brainOpenFolders.add(i.id),this.showSubfolderContent(i),this.renderBrainExplorer(),this.renderBrainTabs()}),s.appendChild(d)}r.appendChild(s),t.appendChild(r)}openBrainFile(e,t){if(this.brainOpenTabs.find(n=>n.id===e)||this.brainOpenTabs.push({id:e,label:t}),this.brainActiveTab=e,this.brainCanvasHidden){let n=this.shadow.querySelector(".eq-brain-canvas"),r=this.shadow.querySelector("#eq-brain-canvas-toggle");n?.classList.remove("is-hidden"),r&&(r.innerHTML=S.eye,r.title="Ocultar visualizador"),this.brainCanvasHidden=!1}this.renderBrainExplorer(),this.renderBrainTabs(),this.renderBrainFileContent(e)}showSubfolderContent(e){e.id==="media-images"?this.showMediaGrid():this.showFolderContent(e)}showMediaGrid(){let e=this.shadow.querySelector("#eq-brain-content");if(!e)return;e.innerHTML="";let t=this.latestImages,n=this.latestImageDescriptions,r=document.createElement("div");r.style.cssText="display:flex;flex-direction:column;height:100%;overflow:hidden;";let a=document.createElement("div");a.style.cssText="padding:8px 12px;font-size:10px;color:#666;border-bottom:1px solid rgba(255,255,255,0.06);display:flex;justify-content:space-between;flex-shrink:0;",a.innerHTML=`<span style="color:#60a5fa;font-weight:600;">Imagens</span><span>${t.length} captura${t.length!==1?"s":""}</span>`,r.appendChild(a);let s=document.createElement("div");if(s.style.cssText="flex:1;overflow-y:auto;padding:10px;",t.length===0)s.innerHTML='<div style="text-align:center;padding:32px 0;color:#555;font-size:11px;">Nenhuma imagem capturada.<br><span style="opacity:0.6;font-size:10px;">Ative "Vis\xE3o Computacional" nas configura\xE7\xF5es e execute uma an\xE1lise.</span></div>';else{let i=document.createElement("div");i.style.cssText="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;",t.forEach((d,l)=>{let f=n.find(h=>h.index===l)?.relevant??!0,c=d.base64?`data:${d.mediaType||"image/jpeg"};base64,${d.base64}`:"",m=document.createElement("div");if(m.style.cssText=`position:relative;aspect-ratio:1;border-radius:5px;overflow:hidden;cursor:pointer;background:#111;border:2px solid ${f?"rgba(96,165,250,0.3)":"rgba(255,255,255,0.06)"};transition:border-color 0.15s,transform 0.12s;`,c){let h=document.createElement("img");h.src=c,h.style.cssText="width:100%;height:100%;object-fit:cover;display:block;",m.appendChild(h)}else{let h=document.createElement("div");h.style.cssText="width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:#555;font-size:10px;",h.textContent="Texto",m.appendChild(h)}let p=document.createElement("div");p.style.cssText="position:absolute;bottom:3px;right:3px;background:rgba(0,0,0,0.75);border-radius:3px;padding:1px 4px;font-size:9px;color:#aaa;",p.textContent=String(l+1),m.appendChild(p),m.addEventListener("mouseenter",()=>{m.style.transform="scale(1.03)",m.style.borderColor="#60a5fa"}),m.addEventListener("mouseleave",()=>{m.style.transform="",m.style.borderColor=f?"rgba(96,165,250,0.3)":"rgba(255,255,255,0.06)"}),m.addEventListener("click",()=>{this.brainSelectedFolder=null,this.openBrainFile("img-"+l,"img-"+(l+1)+"."+(d.mediaType?.split("/")?.[1]||"jpg"))}),i.appendChild(m)}),s.appendChild(i)}r.appendChild(s),e.appendChild(r)}showImageFile(e){let t=this.shadow.querySelector("#eq-brain-content");if(!t)return;t.innerHTML="";let n=this.latestImages[e];if(!n){t.innerHTML='<div style="padding:16px;color:#666;font-size:11px;">Imagem n\xE3o encontrada.</div>';return}let r=this.latestImageDescriptions.find(m=>m.index===e),a=n.base64?`data:${n.mediaType||"image/jpeg"};base64,${n.base64}`:"",s=r?.relevant??!0,i=n.captureStatus==="captured"?"Visual":n.captureStatus==="text_only"?"Texto":"Falhou",d=n.captureStatus==="captured"?"#4ade80":n.captureStatus==="text_only"?"#fbbf24":"#ef4444",l=document.createElement("div");l.style.cssText="display:flex;flex-direction:column;height:100%;overflow:hidden;";let u=document.createElement("div");if(u.style.cssText="flex:0 0 auto;background:#0a0a0f;display:flex;align-items:center;justify-content:center;padding:10px;min-height:140px;max-height:55%;cursor:zoom-in;border-bottom:1px solid rgba(255,255,255,0.06);position:relative;overflow:hidden;",a){let m=document.createElement("img");m.src=a,m.alt=n.alt||`Imagem ${e+1}`,m.style.cssText="max-width:100%;max-height:100%;object-fit:contain;border-radius:4px;transform-origin:center center;transition:transform 0.12s ease;user-select:none;",u.appendChild(m);let p=1,h=.5,b=4;u.addEventListener("wheel",y=>{y.preventDefault(),y.stopPropagation();let C=y.deltaY>0?-.15:.15;p=Math.min(b,Math.max(h,p+C)),m.style.transform=p===1?"":`scale(${p.toFixed(2)})`,u.style.cursor=p>1?"grab":"zoom-in";let q=u.querySelector(".eq-zoom-hint");q&&(q.textContent=p!==1?`${Math.round(p*100)}% \xB7 scroll para zoom \xB7 clique para ampliar`:"scroll para zoom \xB7 clique para ampliar")},{passive:!1}),u.addEventListener("click",()=>this.openImageLightbox(e));let A=document.createElement("div");A.className="eq-zoom-hint",A.style.cssText="position:absolute;bottom:6px;right:8px;font-size:9px;color:rgba(255,255,255,0.3);pointer-events:none;",A.textContent="scroll para zoom \xB7 clique para ampliar",u.appendChild(A);let v=this.latestImages.length;if(v>1){let y=C=>{let q=document.createElement("button");return q.style.cssText=`position:absolute;${C==="prev"?"left:6px":"right:6px"};top:50%;transform:translateY(-50%);background:rgba(0,0,0,0.55);border:1px solid rgba(255,255,255,0.12);color:#ccc;width:24px;height:24px;border-radius:50%;cursor:pointer;font-size:13px;z-index:5;display:flex;align-items:center;justify-content:center;transition:background 0.12s;`,q.innerHTML=C==="prev"?"\u2039":"\u203A",q.title=C==="prev"?"Imagem anterior":"Pr\xF3xima imagem",q.style.display=C==="prev"&&e===0||C==="next"&&e===v-1?"none":"flex",q.addEventListener("mouseenter",()=>{q.style.background="rgba(96,165,250,0.3)"}),q.addEventListener("mouseleave",()=>{q.style.background="rgba(0,0,0,0.55)"}),q.addEventListener("click",x=>{x.stopPropagation();let E=C==="prev"?e-1:e+1;if(E>=0&&E<v){this.brainActiveTab="img-"+E;let k=this.latestImages[E],w="img-"+(E+1)+"."+(k?.mediaType?.split("/")?.[1]||"jpg");this.brainOpenTabs.find(M=>M.id==="img-"+E)||this.brainOpenTabs.push({id:"img-"+E,label:w}),this.renderBrainExplorer(),this.renderBrainTabs(),this.showImageFile(E)}}),q};u.appendChild(y("prev")),u.appendChild(y("next"))}}else u.style.cssText+="color:#555;font-size:11px;",u.textContent="Sem dados visuais \u2014 captura em modo texto";l.appendChild(u);let f=document.createElement("div");f.style.cssText="flex:1;overflow-y:auto;padding:10px 12px;display:flex;flex-direction:column;gap:7px;";let c=(m,p,h="#aaa")=>{let b=document.createElement("div");return b.style.cssText="display:flex;gap:8px;font-size:10.5px;",b.innerHTML=`<span style="color:#555;min-width:72px;flex-shrink:0;">${m}</span><span style="color:${h};word-break:break-word;">${p}</span>`,b};if(f.appendChild(c("\xCDndice",`Imagem ${e+1} de ${this.latestImages.length}`)),f.appendChild(c("Status",i,d)),f.appendChild(c("Relev\xE2ncia",s?"Relevante":"Ignorada",s?"#60a5fa":"#666")),f.appendChild(c("Tipo",n.mediaType||"--")),n.alt&&f.appendChild(c("Alt text",n.alt)),n.source&&f.appendChild(c("Fonte",n.source)),n.associatedLabel&&f.appendChild(c("R\xF3tulo",n.associatedLabel)),r?.description){let m=document.createElement("div");m.style.cssText="background:rgba(96,165,250,0.06);border:1px solid rgba(96,165,250,0.15);border-radius:5px;padding:8px;",m.innerHTML=`<div style="font-size:9px;color:#60a5fa;font-weight:600;margin-bottom:4px;">AN\xC1LISE DA IA</div><div style="font-size:10.5px;color:#ccc;line-height:1.55;">${r.description}</div>`,f.appendChild(m)}if(n.textContext){let m=document.createElement("div");m.style.cssText="background:rgba(251,191,36,0.05);border:1px solid rgba(251,191,36,0.12);border-radius:5px;padding:8px;",m.innerHTML=`<div style="font-size:9px;color:#fbbf24;font-weight:600;margin-bottom:4px;">CONTEXTO TEXTUAL</div><div style="font-size:10.5px;color:#ccc;line-height:1.55;">${n.textContext}</div>`,f.appendChild(m)}l.appendChild(f),t.appendChild(l)}openImageLightbox(e){let t=this.latestImages[e];if(!t)return;let n=this.latestImageDescriptions.find(v=>v.index===e),r=t.base64?`data:${t.mediaType||"image/jpeg"};base64,${t.base64}`:"";this.shadow.querySelector("#eq-img-lightbox")?.remove();let a=document.createElement("div");a.id="eq-img-lightbox",a.style.cssText="position:fixed;inset:0;z-index:2147483647;background:rgba(0,0,0,0.92);display:flex;align-items:center;justify-content:center;padding:20px;box-sizing:border-box;";let s=document.createElement("div");s.style.cssText="display:flex;width:min(90vw,1100px);max-height:90vh;border-radius:10px;background:#0f0f17;border:1px solid rgba(255,255,255,0.1);box-shadow:0 24px 64px rgba(0,0,0,0.8);position:relative;overflow:hidden;";let i=document.createElement("button");i.style.cssText="position:absolute;top:10px;right:10px;background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.15);color:#ddd;width:30px;height:30px;border-radius:50%;cursor:pointer;font-size:18px;z-index:10;display:flex;align-items:center;justify-content:center;line-height:1;",i.textContent="\xD7",i.title="Fechar (ESC)";let d=document.createElement("div");if(d.style.cssText="flex:0 0 65%;display:flex;align-items:center;justify-content:center;background:#050508;padding:16px;min-width:0;overflow:hidden;position:relative;",r){let v=document.createElement("img");v.src=r,v.style.cssText="max-width:100%;max-height:82vh;object-fit:contain;border-radius:4px;transform-origin:center center;transition:transform 0.1s ease;user-select:none;display:block;";let y=1,C=.3,q=6;d.addEventListener("wheel",E=>{E.preventDefault(),E.stopPropagation();let k=E.deltaY<0?.18:-.18;y=Math.min(q,Math.max(C,y+k)),v.style.transform=`scale(${y.toFixed(3)})`,v.style.cursor=y>1?"grab":"default",x.textContent=`${Math.round(y*100)}%`,x.style.opacity="1",clearTimeout(d._zt),d._zt=setTimeout(()=>{x.style.opacity="0"},1200)},{passive:!1}),v.addEventListener("dblclick",()=>{y=1,v.style.transform="",v.style.cursor="default",x.textContent="100%",x.style.opacity="1",setTimeout(()=>{x.style.opacity="0"},800)});let x=document.createElement("div");x.style.cssText="position:absolute;bottom:10px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,0.7);color:#aaa;font-size:10px;padding:2px 8px;border-radius:10px;pointer-events:none;opacity:0;transition:opacity 0.3s;",x.textContent="100%",d.appendChild(v),d.appendChild(x)}else d.innerHTML='<div style="color:#555;font-size:12px;text-align:center;width:100%;">Sem dados visuais</div>';s.appendChild(d);let l=document.createElement("div");l.style.cssText="flex:0 0 35%;overflow-y:auto;padding:20px 16px 20px;border-left:1px solid rgba(255,255,255,0.06);display:flex;flex-direction:column;gap:8px;min-width:0;";let u=document.createElement("div");u.style.cssText="font-size:13px;font-weight:700;color:#e0e0e0;margin-bottom:6px;",u.textContent=`Imagem ${e+1} de ${this.latestImages.length}`,l.appendChild(u);let f=t.captureStatus==="captured"?"#4ade80":t.captureStatus==="text_only"?"#fbbf24":"#ef4444",c=t.captureStatus==="captured"?"Visual":t.captureStatus==="text_only"?"Texto":"Falhou",m=(v,y,C="#aaa")=>{let q=document.createElement("div");return q.style.cssText="display:flex;gap:6px;font-size:10px;",q.innerHTML=`<span style="color:#555;min-width:64px;flex-shrink:0;">${v}</span><span style="color:${C};word-break:break-word;">${y}</span>`,q};l.appendChild(m("Status",c,f)),l.appendChild(m("Relev\xE2ncia",n?.relevant??!0?"Relevante":"Ignorada",n?.relevant??!0?"#60a5fa":"#666")),l.appendChild(m("Tipo",t.mediaType||"--")),t.alt&&l.appendChild(m("Alt",t.alt)),t.source&&l.appendChild(m("Fonte",t.source)),t.associatedLabel&&l.appendChild(m("R\xF3tulo",t.associatedLabel));let p=document.createElement("div");if(p.style.cssText="font-size:9px;color:#444;margin-top:4px;",p.textContent="Scroll na imagem para zoom \xB7 Duplo-clique para resetar",l.appendChild(p),n?.description){let v=document.createElement("div");v.style.cssText="background:rgba(96,165,250,0.07);border:1px solid rgba(96,165,250,0.18);border-radius:5px;padding:8px;margin-top:4px;",v.innerHTML=`<div style="font-size:9px;color:#60a5fa;font-weight:700;margin-bottom:5px;">AN\xC1LISE DA IA</div><div style="font-size:10px;color:#ccc;line-height:1.6;">${n.description}</div>`,l.appendChild(v)}if(t.textContext){let v=document.createElement("div");v.style.cssText="background:rgba(251,191,36,0.05);border:1px solid rgba(251,191,36,0.12);border-radius:5px;padding:8px;",v.innerHTML=`<div style="font-size:9px;color:#fbbf24;font-weight:700;margin-bottom:5px;">CONTEXTO TEXTUAL</div><div style="font-size:10px;color:#ccc;line-height:1.6;">${t.textContext}</div>`,l.appendChild(v)}s.appendChild(l),a.appendChild(i),a.appendChild(s),this.shadow.appendChild(a);let h=()=>a.remove();i.addEventListener("click",v=>{v.stopPropagation(),h()}),s.addEventListener("click",v=>v.stopPropagation()),a.addEventListener("click",()=>h());let b=this.latestImages.length;if(b>1){let v=y=>{let C=document.createElement("button");return C.style.cssText=`position:absolute;${y==="prev"?"left:12px":"right:12px"};top:50%;transform:translateY(-50%);background:rgba(0,0,0,0.6);border:1px solid rgba(255,255,255,0.15);color:#ddd;width:36px;height:36px;border-radius:50%;cursor:pointer;font-size:22px;z-index:10;display:${y==="prev"&&e===0||y==="next"&&e===b-1?"none":"flex"};align-items:center;justify-content:center;`,C.innerHTML=y==="prev"?"\u2039":"\u203A",C.title=y==="prev"?"Anterior":"Pr\xF3xima",C.addEventListener("mouseenter",()=>{C.style.background="rgba(96,165,250,0.35)"}),C.addEventListener("mouseleave",()=>{C.style.background="rgba(0,0,0,0.6)"}),C.addEventListener("click",q=>{q.stopPropagation();let x=y==="prev"?e-1:e+1;x>=0&&x<b&&(a.remove(),this.openImageLightbox(x))}),C};a.appendChild(v("prev")),a.appendChild(v("next"))}let A=v=>{v.key==="Escape"&&(h(),window.removeEventListener("keydown",A))};window.addEventListener("keydown",A)}closeBrainTab(e){let t=this.brainOpenTabs.findIndex(n=>n.id===e);t!==-1&&(this.brainOpenTabs.splice(t,1),this.brainActiveTab===e&&(this.brainActiveTab=this.brainOpenTabs[t-1]?.id||this.brainOpenTabs[0]?.id||null),this.renderBrainExplorer(),this.renderBrainTabs(),this.refreshBrainCanvas())}refreshBrainCanvas(){if(this.brainActiveTab)this.renderBrainFileContent(this.brainActiveTab);else if(this.brainSelectedFolder){if(this.brainSelectedFolder==="media-images"){this.showMediaGrid();return}for(let t of this.getBrainFolders()){let n=(t.subfolders||[]).find(r=>r.id===this.brainSelectedFolder);if(n){this.showSubfolderContent(n);return}}let e=this.getBrainFolders().find(t=>t.id===this.brainSelectedFolder);if(e)this.showFolderContent(e);else{let t=this.shadow.querySelector("#eq-brain-content");t&&(t.innerHTML='<div class="eq-brain-empty-canvas"><div style="margin-bottom:4px;opacity:0.5">Nada selecionado</div><div class="eq-brain-empty-sub">Selecione um arquivo no explorador abaixo para visualiz\xE1-lo</div></div>')}}else{let e=this.shadow.querySelector("#eq-brain-content");e&&(e.innerHTML='<div class="eq-brain-empty-canvas"><div style="margin-bottom:4px;opacity:0.5">Nada selecionado</div><div class="eq-brain-empty-sub">Selecione um arquivo no explorador abaixo para visualiz\xE1-lo</div></div>')}}renderBrainTabs(){let e=this.shadow.querySelector("#eq-brain-tabbar");if(e){e.innerHTML="";for(let t of this.brainOpenTabs){let n=document.createElement("div");n.className="eq-brain-tab"+(this.brainActiveTab===t.id?" is-active":""),n.innerHTML=`<span class="eq-brain-tab-icon">${t.id===this.GLOBAL_ID?S.folderTree:S.file}</span><span class="eq-brain-tab-label">${t.label}</span><button class="eq-brain-tab-close" data-tab-id="${t.id}" type="button">${S.close}</button>`,n.addEventListener("click",r=>{let a=r.target.closest(".eq-brain-tab-close");a?this.closeBrainTab(a.dataset.tabId):(this.brainActiveTab=t.id,this.brainSelectedFolder=null,this.renderBrainExplorer(),this.renderBrainTabs(),this.renderBrainFileContent(t.id))}),e.appendChild(n)}}}renderBrainFileContent(e){let t=this.shadow.querySelector("#eq-brain-content");if(!t)return;if(e.startsWith("img-")){this.showImageFile(parseInt(e.slice(4),10));return}let n=this.getBrainFileText(e),r=f=>String(f??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"),a=e===this.GLOBAL_ID,s=e==="rationale"||a,d=a||s?"markdown":e==="actions"||e==="exec-result"?"json":"text";t.innerHTML="";let l=document.createElement("div");l.className="eq-brain-file-view";let u=document.createElement("div");if(u.className="eq-brain-file-header",u.innerHTML=`<span class="eq-brain-file-lang">${r(d)}</span>`,l.appendChild(u),s){let f=document.createElement("div");f.className="eq-brain-markdown";try{f.innerHTML=this.renderMarkdown(n||"(sem conte\xFAdo)")}catch{f.textContent=n||"(sem conte\xFAdo)"}l.appendChild(f)}else{let f=document.createElement("pre");f.className="eq-brain-code";let c=document.createElement("code");c.textContent=n||"(sem conte\xFAdo)",f.appendChild(c),l.appendChild(f)}t.appendChild(l)}showFloatingAnswers(e){let t=e||this.latestPlan;t&&this.floatingAnswers.show(t)}hideFloatingAnswers(){this.floatingAnswers.hide()}renderKeysList(){if(!this.keysListEl)return;let e=D.getAllKeys();if(this.keysBadgeEl){let r=e.filter(i=>!i.isCooldown).length,a=e.reduce((i,d)=>i+(d.winCount||0),0),s=r>=3?"  TURBO":"";this.keysBadgeEl.textContent=`${e.length} chave${e.length>1?"s":""} (${r} pronta${r!==1?"s":""})${s}`,this.keysBadgeEl.className=`eq-key-badge ${r>=3?"racing":r>0?"ready":"cooldown"}`}this.keysListEl.replaceChildren();let t=this.shadow?.querySelector("#eq-keys-collapsible");t&&t.style.display!=="none"&&(t.style.maxHeight="none",t.style.overflow="visible"),[...e].sort((r,a)=>{let s=r.winCount||0,i=a.winCount||0;if(s!==i)return i-s;let d=r.lastLatencyMs||99999,l=a.lastLatencyMs||99999;if(d!==l)return d-l;let u=r.isCooldown?1:0,f=a.isCooldown?1:0;return u-f}).forEach((r,a)=>{let s=e.findIndex(v=>v.id===r.id),i=s>=0?s:a,d=document.createElement("div");d.className="eq-key-item";let l=document.createElement("div");l.className="eq-key-info";let u=document.createElement("span");u.className="eq-key-label",u.textContent=r.label||`Chave ${i+1}`;let f=document.createElement("span");f.className="eq-key-masked",f.textContent=te.maskKey(r.key),f.title="Clique para copiar a chave",f.style.cursor="pointer",f.addEventListener("click",()=>{navigator.clipboard?.writeText(r.key),this.setStatus(`Chave ${i+1} copiada para a \xE1rea de transfer\xEAncia!`,"info")});let c=document.createElement("span");if(r.isCooldown){c.className="eq-key-badge cooldown";let v=Math.ceil(r.remainingCooldownMs/1e3);c.textContent=`\u23F1 Cooldown (${v}s)`}else r.lastError&&r.errorCount&&r.errorCount>3?(c.className="eq-key-badge invalid",c.textContent="Erro",c.title=r.lastError):r.lastLatencyMs?(c.className="eq-key-badge ready",c.textContent=`Pronta (${r.lastLatencyMs}ms)`):(c.className="eq-key-badge ready",c.textContent="Pronta");l.appendChild(u),l.appendChild(f),l.appendChild(c);let m=r.winCount||0;if(m>0){let v=document.createElement("span");v.className="eq-key-badge winner",v.textContent=` ${m} vit\xF3ria${m>1?"s":""}`,v.title=`Esta chave foi a mais r\xE1pida ${m} vez${m>1?"es":""} nas corridas paralelas`,l.appendChild(v)}let p=document.createElement("div");p.className="eq-key-actions";let h=document.createElement("button");h.className="eq-icon-btn",h.type="button",h.title="Testar esta chave",h.innerHTML=S.sparkles,h.addEventListener("click",async()=>{this.setStatus(`Testando chave ${r.label||i+1}...`,"info");let v=await Qe(r.key);v.ok?(D.markSuccess(r.key,120),this.setStatus(` ${r.label||`Chave ${i+1}`}: Conex\xE3o com Google Gemini aprovada!`,"success")):(D.markInvalid(r.key,v.message),this.setStatus(`\uFE0F ${r.label||`Chave ${i+1}`}: ${v.message}`,"error")),this.renderKeysList()});let b=document.createElement("button");b.className="eq-icon-btn",b.type="button",b.title="Editar chave",b.innerHTML=S.edit,b.addEventListener("click",()=>{let v=window.prompt(`Editar ${r.label||`Chave ${i+1}`}:`,r.key);if(v!==null&&v.trim()){let y=D.updateKey(r.id,v.trim());if(y.ok){let C=D.exportRawKeys();this.callbacks.onSettingsChange({apiKey:C[0],apiKeys:C}),this.setStatus(`Chave ${i+1} atualizada com sucesso!`,"success"),this.renderKeysList()}else this.setStatus(y.message,"warning")}});let A=document.createElement("button");A.className="eq-icon-btn",A.type="button",A.title="Remover chave",A.innerHTML=S.trash,A.addEventListener("click",()=>{if(confirm(`Remover permanentemente a ${r.label||`Chave ${i+1}`}?`)){let v=D.removeKey(r.id);if(v.ok){let y=D.exportRawKeys();this.callbacks.onSettingsChange({apiKey:y[0]||"",apiKeys:y}),this.setStatus("Chave removida com sucesso.","info"),this.renderKeysList()}else this.setStatus(v.message,"warning")}}),p.appendChild(h),p.appendChild(b),p.appendChild(A),d.appendChild(l),d.appendChild(p),this.keysListEl.appendChild(d)})}updateModelSelect(e,t){let n=e.filter(s=>Y(s.id)),r=t&&Y(t)?t:Y(this.initialSettings.model)?this.initialSettings.model:"gemini-2.5-flash";this.modelSelect.innerHTML="";let a=!1;n.forEach(s=>{let i=s.id===r;i&&(a=!0),this.modelSelect.add(new Option(s.name,s.id,!1,i))}),!a&&r&&Y(r)&&this.modelSelect.add(new Option(`Gemini (${r})`,r,!1,!0)),this.modelSelect.value=r}updateSelectedModel(e){if(!Y(e))return;Array.from(this.modelSelect.options).some(n=>n.value===e)||this.modelSelect.add(new Option(`Gemini (${e})`,e,!1,!0)),this.modelSelect.value=e}mountHost(){let e=document.body||document.documentElement;if(!e){let t=()=>{let n=document.body||document.documentElement;n&&!this.host.isConnected&&n.appendChild(this.host)};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",t,{once:!0}):setTimeout(t,0);return}this.host.isConnected||e.appendChild(this.host)}applyHostDarkMode(e){document.getElementById("eq-host-dark-mode-style")?.remove(),this.host.classList.toggle("eq-dark-mode-active",e)}startQuestionTimer(){this.currentQuestionStartTime=Date.now(),this.questionLiveTimerInterval&&clearInterval(this.questionLiveTimerInterval),this.metricsLiveStatus&&(this.metricsLiveStatus.textContent="Calculando...",this.metricsLiveStatus.classList.add("active"));let e=()=>{if(!this.metricsLiveTime)return;let t=Date.now()-this.currentQuestionStartTime,n=Math.floor(t/6e4),r=Math.floor(t%6e4/1e3),a=Math.floor(t%1e3/10);this.metricsLiveTime.textContent=`${String(n).padStart(2,"0")}:${String(r).padStart(2,"0")}.${String(a).padStart(2,"0")}`};e(),this.questionLiveTimerInterval=setInterval(e,50)}stopQuestionTimer(e){if(this.questionLiveTimerInterval&&(clearInterval(this.questionLiveTimerInterval),this.questionLiveTimerInterval=null),this.metricsLiveStatus&&(this.metricsLiveStatus.textContent="Parado",this.metricsLiveStatus.classList.remove("active")),this.metricsLiveTime&&this.currentQuestionStartTime>0){let t=e!==void 0?e:Math.max(0,Date.now()-this.currentQuestionStartTime),n=Math.floor(t/6e4),r=Math.floor(t%6e4/1e3),a=Math.floor(t%1e3/10);this.metricsLiveTime.textContent=`${String(n).padStart(2,"0")}:${String(r).padStart(2,"0")}.${String(a).padStart(2,"0")}`}}updateTimingMetrics(e){let t=e||qe();if(!this.metricTotalTime)return;let n=Math.floor(t.totalElapsedMs/1e3),r=Math.floor(n/60),a=n%60;this.metricTotalTime.textContent=`${String(r).padStart(2,"0")}:${String(a).padStart(2,"0")}`;let s=(t.averageDurationMs/1e3).toFixed(1);this.metricAvgTime.textContent=`${s}s`,this.metricTotalCount.textContent=String(t.completedQuestionsCount),this.metricsTotalBadge&&(this.metricsTotalBadge.textContent=`${t.completedQuestionsCount} Quest\xE3o(\xF5es)`),this.metricsHistoryCount&&(this.metricsHistoryCount.textContent=`${t.records.length} registros`),this.renderMetricsHistory(t.records)}renderMetricsHistory(e){if(!this.metricsHistoryList)return;if(e.length===0){this.metricsHistoryList.innerHTML='<div style="text-align:center;padding:24px 0;color:#444;font-size:11px;">Nenhuma quest\xE3o respondida ainda.</div>';return}this.metricsHistoryList.innerHTML="";let t=[...e].reverse(),n=Math.max(...e.map(r=>r.durationMs),1);for(let r of t){let a=r.durationMs/1e3,s=Math.round(r.durationMs/n*100),i=r.status==="verified"||r.status==="answered",d=r.status==="manual",l=i?"#4ade80":d?"#fbbf24":"#666",u=i?"Injetado":d?"Gabarito":"Pendente",f=new Date(r.timestamp).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit",second:"2-digit"}),c=r.mode?r.mode.replace(/_/g," "):"auto",m=a<5?"#4ade80":a<15?"#fbbf24":"#ef4444",p=document.createElement("div");p.style.cssText="background:rgba(255,255,255,0.025);border:1px solid rgba(255,255,255,0.055);border-radius:7px;padding:9px 10px;margin-bottom:5px;cursor:default;transition:background 0.1s;",p.addEventListener("mouseenter",()=>{p.style.background="rgba(255,255,255,0.045)"}),p.addEventListener("mouseleave",()=>{p.style.background="rgba(255,255,255,0.025)"});let h=document.createElement("div");h.style.cssText="display:flex;align-items:flex-start;gap:8px;margin-bottom:6px;";let b=document.createElement("div");b.style.cssText="flex-shrink:0;width:22px;height:22px;border-radius:5px;background:rgba(0,152,255,0.15);border:1px solid rgba(0,152,255,0.25);display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:800;color:#0098ff;",b.textContent=String(r.questionIndex);let A=document.createElement("div");A.style.cssText="flex:1;font-size:10.5px;color:#ccc;font-weight:600;line-height:1.3;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;",A.textContent=r.questionTitle||"Quest\xE3o "+r.questionIndex;let v=document.createElement("div");v.style.cssText="flex-shrink:0;font-size:13px;font-weight:800;color:"+m+";font-family:monospace;font-variant-numeric:tabular-nums;",v.textContent=a<60?a.toFixed(1)+"s":Math.floor(a/60)+"m"+String(Math.round(a%60)).padStart(2,"0")+"s",h.appendChild(b),h.appendChild(A),h.appendChild(v);let y=document.createElement("div");y.style.cssText="height:2px;background:rgba(255,255,255,0.05);border-radius:1px;margin-bottom:6px;overflow:hidden;";let C=document.createElement("div");C.style.cssText="height:100%;width:"+s+"%;background:"+m+";border-radius:1px;transition:width 0.4s ease;",y.appendChild(C);let q=document.createElement("div");q.style.cssText="display:flex;align-items:center;gap:6px;flex-wrap:wrap;";let x=(T,H,O)=>{let N=document.createElement("span");return N.style.cssText="font-size:8.5px;font-weight:700;letter-spacing:0.04em;padding:1px 6px;border-radius:8px;background:rgba("+O+",0.12);color:"+H+";",N.textContent=T,N};q.appendChild(x(u,l,i?"74,222,128":d?"251,191,36":"102,102,102")),q.appendChild(x(c,"#888","255,255,255")),r.actionsCount&&q.appendChild(x(r.actionsCount+" a\xE7\xE3o"+(r.actionsCount>1?"\xF5es":""),"#888","255,255,255"));let E=document.createElement("span");E.style.cssText="font-size:8.5px;color:#444;margin-left:auto;",E.textContent=f,q.appendChild(E);let k=document.createElement("span");k.style.cssText="flex-shrink:0;display:inline-flex;color:#444;transition:transform 0.2s ease;margin-left:4px;",k.innerHTML='<svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5z"/></svg>',h.appendChild(k);let w=document.createElement("div");w.style.cssText="overflow:hidden;max-height:0;transition:max-height 0.22s ease;",w.appendChild(y),w.appendChild(q);let M=!1,I=()=>{M=!M,M?(this.metricsHistoryList?.querySelectorAll(".eq-mhist-body").forEach(T=>{if(T!==w){T.style.maxHeight="0";let H=T.parentElement?.querySelector(".eq-mhist-chevron");H&&(H.style.transform="")}}),w.style.maxHeight=w.scrollHeight+40+"px",k.style.transform="rotate(180deg)"):(w.style.maxHeight="0",k.style.transform="")};w.className="eq-mhist-body",k.className="eq-mhist-chevron",h.style.cursor="pointer",h.addEventListener("click",I),p.appendChild(h),p.appendChild(w),this.metricsHistoryList.appendChild(p)}}copyMetricsReport(){let e=qe(),t=[];t.push("# Relat\xF3rio de Desempenho e Tempo \u2014 EasyQuiz"),t.push(`- **Quest\xF5es Respondidas:** ${e.completedQuestionsCount}`),t.push(`- **Tempo Total:** ${(e.totalElapsedMs/1e3).toFixed(1)}s`),t.push(`- **Tempo M\xE9dio por Quest\xE3o:** ${(e.averageDurationMs/1e3).toFixed(2)}s`),t.push(""),t.push("### Hist\xF3rico:"),e.records.length===0?t.push("_Nenhum registro ainda._"):e.records.forEach((n,r)=>{t.push(`${r+1}. **${n.questionTitle||`Q${n.questionIndex}`}**: ${(n.durationMs/1e3).toFixed(2)}s (${n.status})`)}),navigator.clipboard.writeText(t.join(`
`)).then(()=>{this.showToast("Relat\xF3rio copiado!","success",2500)})}destroy(){this.stopStopwatch(),this.stopQuestionTimer(),this.autopilot.stop(),this.applyHostDarkMode(!1),this.callbacks.onDestroy(),this.host.remove()}};function Do(){try{if(typeof document>"u"||!document.head||document.querySelector("link[data-easyquiz-preconnect]"))return;let o=document.createElement("link");o.rel="preconnect",o.href="https://generativelanguage.googleapis.com",o.crossOrigin="anonymous",o.setAttribute("data-easyquiz-preconnect","true"),document.head.appendChild(o);let e=document.createElement("link");e.rel="dns-prefetch",e.href="https://generativelanguage.googleapis.com",e.setAttribute("data-easyquiz-preconnect","true"),document.head.appendChild(e)}catch{}}async function Bo(){let o=window;if(Te(),Do(),o.__easyquiz){try{o.__easyquiz.destroy()}catch{}try{document.getElementById("easyquiz-shadow-root")?.remove()}catch{}}let e=_e(),t=null,n=null,r=0,a=new Ze(e,{onAnalyze:(l=1,u,f=!1)=>s(l,u,f),onApply:(l=1)=>void i(l),onDestroy:()=>{if(n){try{n.abort()}catch{}n=null}ge(),delete o.__easyquiz},onCancel:()=>{if(n){try{n.abort()}catch{}n=null}ge(),a.setProgress(0),a.setInterrupted("Opera\xE7\xE3o cancelada imediatamente pelo usu\xE1rio.")},onSettingsChange:l=>{e=Tt(l)}});o.__easyquiz={toggle:()=>a.toggle(),destroy:()=>a.destroy(),analyze:async()=>{await s()}},window.addEventListener("keydown",l=>{if(l.altKey&&(l.key==="q"||l.key==="Q"||l.key==="a"||l.key==="A")){if(l.preventDefault(),!a)return;a.toggle(!0),s()}});async function s(l=1,u,f=!1){if(!e.apiKey&&(!Array.isArray(e.apiKeys)||e.apiKeys.length===0)){a.setStatus("Configure sua chave de API Gemini acima para come\xE7ar.","error"),a.toggle(!0);return}if(n)try{n.abort()}catch{}n=new AbortController;let c=n,m=()=>{try{c.abort()}catch{}};if(u&&(u.aborted?c.abort():u.addEventListener("abort",m,{once:!0})),c.signal.aborted){a.setBusy(!1),a.setProgress(0);return}r=Date.now(),a.setBusy(!0,"Identificando o bloco da quest\xE3o ativa na p\xE1gina..."),a.setProgress(20,"Varrendo escopo do DOM e controles..."),ge(),a.hideFloatingAnswers();try{let p=pe(!1);p||(a.setStatus("Nenhum controle detectado. Tentando captura de tela inteira...","info"),p=ce()),ze(p.scope),a.updateContext(p),a.logToConsole(`> [DOM] Escopo: <${p.scope.tagName.toLowerCase()}> com ${p.controls.length} controle(s) e ${p.questionText.length} caracteres.`,"text-blue"),a.setStatus(`Quest\xE3o localizada (${p.controls.length} controles). Preparando an\xE1lise...`,"info"),a.setProgress(40,`Consultando Gemini (${e.model})...`);let h=await wt(p.scope,e.useVision);if(h.length>0){let q=h.map(x=>x.element).filter(Boolean);At(q),a.updateImages(h)}if(c.signal.aborted)return;let b=e.model;a.setStatus(h.length>0?`Consultando Gemini (${b}) com ${h.length} imagem(ns) anexada(s)...`:`Consultando Gemini (${b}) via DOM nativo (modo r\xE1pido)...`,"info");let A=ke(p,h,e);a.setInspectorPrompt(A,e.model);let v=(q,x)=>{a.setStatus(q,x==="warning"?"info":x);let E=q.match(/Onda\s+\d+.*?\[([^\]]+)\]/);if(E){let k=E[1].split(",")[0].trim();a.setProgress(50,`Gemini ${k} respondendo...`)}},{plan:y,usedModel:C}=await je(p,h,e,v,c.signal);if(c.signal.aborted)return;if(y.needsMoreContext){if(a.setProgress(55,"Ampliando escopo da quest\xE3o..."),a.setStatus("Enunciado ou contexto isolado detectado pela IA. Acionando Sele\xE7\xE3o Geral Expandida...","info"),a.logToConsole("> [DOM] Enunciado isolado. Ampliando escopo para sele\xE7\xE3o expandida...","text-blue"),p=pe(!0),p||(p=ce()),ze(p.scope),a.updateContext(p),h=await wt(p.scope,e.useVision),h.length>0){let E=h.map(k=>k.element).filter(Boolean);At(E),a.updateImages(h)}a.setStatus(`Reconsultando IA com escopo ampliado (${p.controls.length} controles)...`,"info");let q=ke(p,h,e);a.setInspectorPrompt(q,e.model),y=(await je(p,h,e,v,c.signal)).plan}if(c.signal.aborted)return;if(a.setProgress(70,"Resposta recebida da IA! Processando plano..."),a.logToConsole(`> [IA] Modelo: ${C||e.model} | Modo: ${y.mode} | Confian\xE7a: ${(y.confidence*100).toFixed(0)}%`,"text-green"),y.rationale&&a.logToConsole(`> [IA] Racioc\xEDnio: "${y.rationale}"`,"text-blue"),a.logToConsole(`> [IA] ${y.actions.length} a\xE7\xE3o(\xF5es) prescritas no plano.`,"text-blue"),y.memoryToStore&&(kt(y.memoryToStore),a.logToConsole(`> [RAG]  Nova mem\xF3ria te\xF3rica salva na sess\xE3o: "${y.memoryToStore}"`,"text-yellow")),y.imageDescriptions&&y.imageDescriptions.length>0){a.logToConsole(`> [VISION] \uFE0F An\xE1lise de ${y.imageDescriptions.length} imagem(ns) pela IA:`,"text-blue");for(let q of y.imageDescriptions){let x=q.relevant?"":"\uFE0F";a.logToConsole(`>   ${x} Imagem ${q.index+1} [${q.relevant?"RELEVANTE":"IGNORADA"}]: ${q.description}`,q.relevant?"text-blue":"text-yellow")}}return t=y,a.updateContext(p,y),Jt(y.actions,y.confidence),a.setPlan(y,!e.dryRun),y.pageType==="conclusion"?(a.setProgress(100,"Atividade conclu\xEDda!"),a.setStatus("Atividade conclu\xEDda ou tela final detectada pela IA.","success")):y.pageType==="info"?(a.setProgress(100,"Contexto absorvido na mem\xF3ria!"),a.setStatus(" Conte\xFAdo de contexto absorvido na mem\xF3ria RAG. Avan\xE7ando...","success")):y.pageType==="start"?(a.setProgress(100,"In\xEDcio detectado!"),a.setStatus("In\xEDcio de atividade detectado. Iniciando...","info")):(a.setProgress(80,"Plano de resolu\xE7\xE3o pronto!"),a.setStatus(e.dryRun?"Simula\xE7\xE3o conclu\xEDda. As respostas foram real\xE7adas na p\xE1gina sem altera\xE7\xE3o.":"Resolu\xE7\xE3o pronta! Verifique o realce na tela e aplique quando desejar.","success")),e.dryRun&&y.pageType==="question"&&a.showFloatingAnswers(y),c.signal.aborted?void 0:((f||e.autoApply)&&!e.dryRun&&await i(l,c.signal,f),y)}catch(p){if(c.signal.aborted||p instanceof Error&&(p.name==="AbortError"||p.message.includes("cancelada"))){ge(),a.setProgress(0),a.setInterrupted("Opera\xE7\xE3o cancelada pelo usu\xE1rio.");return}ge(),a.setProgress(0);let h=p instanceof Error?p.message:"Falha desconhecida na an\xE1lise.";a.setStatus(h,"error"),a.setErrorDiagnostic(h,"An\xE1lise da IA");return}finally{u?.removeEventListener("abort",m),n===c&&(n=null),c.signal.aborted||a.setBusy(!1)}}async function i(l=1,u,f=!1){if(u?.aborted)return;if(!t){a.setStatus("Nenhum plano dispon\xEDvel para aplicar. Execute a an\xE1lise primeiro.","error");return}if(e.dryRun){a.setStatus("O modo de simula\xE7\xE3o est\xE1 ativo. Desmarque para poder aplicar.","error");return}let c=t.pageType==="info"||t.pageType==="start",m=t.actions.filter(b=>b.t!=="adv"),p=t.pageType==="question"||Ue(t.rationale||"");if(p&&m.length===0){a.logToConsole("> [NAV]  Avan\xE7o bloqueado: quest\xE3o sem respostas prescritas.","text-yellow");return}let h=(f||e.autoAdvance||c)&&t.confidence>=e.confidenceThreshold&&!t.needsMoreContext&&(!p||m.length>0);a.setBusy(!0,"Aplicando respostas no formul\xE1rio..."),a.setProgress(85,`Aplicando ${t.actions.length} a\xE7\xE3o(\xF5es) no formul\xE1rio...`),a.logToConsole(`> [EXEC] Iniciando aplica\xE7\xE3o com 6 vias de persist\xEAncia para ${t.actions.length} a\xE7\xE3o(\xF5es)...`,"text-blue");try{let b=await He(t,h,l,Ae(e));if(u?.aborted)return;if(a.setExecutionReport(b),b.failedActions&&b.failedActions.length>0){a.logToConsole(`> [REPLAN] \uFE0F ${b.failedActions.length} a\xE7\xE3o(\xF5es) n\xE3o verificadas no DOM. Iniciando replanejamento...`,"text-yellow");for(let q of b.failedActions){let x=q.action,E=x.t==="drag"?`drag: "${x.from}" \u2192 "${x.to}"`:x.t==="clk"||x.t==="chk"?`${x.t}: "${x.id}"`:x.t==="val"?`val: "${x.id}" = "${x.v}"`:JSON.stringify(x).slice(0,80);a.logToConsole(`>    [${x.t.toUpperCase()}] ${E} | ${q.evidence.slice(0,80)}`,"text-yellow")}await d(b.failedActions,u)}let A=r>0?Date.now()-r:1200,v=b.verified>0,y=b.applied>0;if(b.success||v&&y){a.setProgress(100,"Sucesso! Resposta preenchida."),a.logToConsole(`> [DOM]  ${b.applied} a\xE7\xE3o(\xF5es) aplicada(s) \u2014 ${b.verified} verificada(s) no DOM.`,"text-green"),b.advanced?a.logToConsole("> [NAV]  Bot\xE3o de confirma\xE7\xE3o/avan\xE7o acionado com sucesso!","text-green"):h&&a.logToConsole(`> [NAV] ${b.navigationEvidence}`,"text-blue"),a.setStatus(b.advanced?`Sucesso: ${b.applied} resposta(s) preenchida(s) e avan\xE7ando.`:`Resposta aplicada na p\xE1gina (${b.applied} a\xE7\xE3o(\xF5es)).`,"success"),a.hideFloatingAnswers();let q=St({id:`q-${Date.now()}`,questionIndex:(qe().records.length||0)+1,questionTitle:t.rationale?t.rationale.slice(0,45)+"...":`Quest\xE3o ${t.mode||"Auto"}`,durationMs:A,status:"answered",mode:t.mode,actionsCount:b.applied});a.updateTimingMetrics(q)}else y?(a.setProgress(75,"Resposta aplicada (verifica\xE7\xE3o incerta)."),a.logToConsole(`> [DOM] \uFE0F ${b.applied} a\xE7\xE3o(\xF5es) disparadas mas sem confirma\xE7\xE3o DOM clara. Pendentes: ${b.failed.join(", ")||"nenhuma"}`,"text-yellow"),a.setStatus(`Resposta preenchida (${b.applied} a\xE7\xE3o(\xF5es) aplicadas, verifica\xE7\xE3o incerta).`,"warning")):(a.setProgress(0,"Alvo de resposta n\xE3o localizado."),a.logToConsole(`> [DOM] Alerta: nenhum controle de resposta foi modificado no DOM. Pend\xEAncias: ${b.failed.join(", ")||"nenhuma a\xE7\xE3o"}.`,"text-yellow"),a.setStatus("Controle de resposta n\xE3o encontrado na p\xE1gina. Use o bot\xE3o Gabarito no painel se desejar.","warning"),e.dryRun&&a.showFloatingAnswers(t))}catch(b){a.setProgress(0);let A=b instanceof Error?b.message:"Falha ao aplicar plano.";a.setStatus(`Erro ao aplicar: ${A}`,"error"),a.logToConsole(`> [ERRO] ${A}`,"text-red")}finally{a.setBusy(!1)}}async function d(l,u){if(!t)return;let f=l.filter(m=>m.action.t==="drag");for(let m of f){if(u?.aborted)return;let p=m.action,h=String(p.from||""),b=String(p.to||""),A=Ut(h,b,h,b);a.logToConsole(`> [REPLAN]  Drag JS fallback: "${h}" \u2192 "${b}"`,"text-blue");let v={...t,actions:[{t:"js",v:A}],pageType:"question"},y=await He(v,!1,1,Ae(e));a.logToConsole(y.applied>0?"> [REPLAN]  Drag fallback aplicado!":"> [REPLAN]  Drag fallback sem efeito.",y.applied>0?"text-green":"text-yellow")}let c=l.filter(m=>m.action.t!=="drag");if(c.length!==0&&!u?.aborted){a.logToConsole(`> [REPLAN]  ${c.length} a\xE7\xE3o(\xF5es) pendente(s) \u2014 iniciando pipeline de recupera\xE7\xE3o multi-estrat\xE9gia...`,"text-blue");for(let m of c){if(u?.aborted)return;let p=m.action,h=p.t==="clk"||p.t==="chk"?`${p.t}: "${p.id}"`:p.t==="val"?`val: "${p.id}" = "${p.v}"`:p.t==="sel"?`sel: "${p.id}" = "${Array.isArray(p.v)?p.v[0]:p.v}"`:JSON.stringify(p).slice(0,60);a.logToConsole(`> [REPLAN]  Recuperando: ${h}`,"text-blue");let b=String(p.id||p.name||p.selector||""),A=p.v!==void 0?String(p.v):"";a.logToConsole("> [REPLAN] Estrat\xE9gia 1: rota alternativa padr\xE3o...","text-blue");try{if(await Je(m.action),await new Promise(v=>setTimeout(v,250)),oe(m.action)){a.logToConsole(`> [REPLAN]  Estrat\xE9gia 1 OK: ${h}`,"text-green");continue}}catch{}if(p.t==="clk"||p.t==="chk"){a.logToConsole("> [REPLAN] Estrat\xE9gia 2: script injection (bypass isTrusted)...","text-blue");try{let v=P(b,A)||P(b.replace(/[^\w\s]/g," ").trim(),A);if(v&&(gt(v),await new Promise(y=>setTimeout(y,300)),oe(m.action))){a.logToConsole(`> [REPLAN]  Estrat\xE9gia 2 OK: ${h}`,"text-green");continue}}catch{}}if(p.t==="clk"||p.t==="chk"){a.logToConsole("> [REPLAN] Estrat\xE9gia 3: simula\xE7\xE3o de teclado (Tab+Space)...","text-blue");try{let v=P(b,A)||P(b.replace(/[^\w\s]/g," ").trim(),A);if(v&&(v.focus?.(),await new Promise(y=>setTimeout(y,50)),v.dispatchEvent(new KeyboardEvent("keydown",{key:" ",code:"Space",keyCode:32,bubbles:!0,cancelable:!0})),v.dispatchEvent(new KeyboardEvent("keyup",{key:" ",code:"Space",keyCode:32,bubbles:!0,cancelable:!0})),await new Promise(y=>setTimeout(y,80)),v.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0,cancelable:!0})),v.dispatchEvent(new KeyboardEvent("keyup",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0,cancelable:!0})),await new Promise(y=>setTimeout(y,200)),oe(m.action))){a.logToConsole(`> [REPLAN]  Estrat\xE9gia 3 OK: ${h}`,"text-green");continue}}catch{}}if(p.t==="clk"||p.t==="chk"||p.t==="val"){a.logToConsole("> [REPLAN] Estrat\xE9gia 4: internals Vue/React via script injection...","text-blue");try{let v=P(b,A)||P(b.replace(/[^\w\s]/g," ").trim(),A);if(v){let y=v.id,C=!!y;y||(y=`__eq_s4_${Math.random().toString(36).slice(2,8)}`,v.id=y);let q=String(p.v??""),x=p.t==="val",E=document.createElement("script");if(E.textContent=`(function(){
              var el=document.getElementById(${JSON.stringify(y)});
              if(!el)return;
              // Tenta Vue 3 update trigger
              try{if(el.__vueParentComponent){var ins=el.__vueParentComponent;var pr=ins.props||{};if(pr.modelValue!==undefined&&typeof ins.emit==='function'){ins.emit('update:modelValue',${x?JSON.stringify(q):"true"});}}}catch(e){}
              // Tenta React setState via fiber
              try{var fk=Object.keys(el).find(function(k){return k.startsWith('__reactFiber');});
              if(fk){var fb=el[fk];while(fb){var p=fb.memoizedProps||{};
              if(typeof p.onChange==='function')try{p.onChange({target:el,currentTarget:el,type:'change',bubbles:true,preventDefault:function(){},stopPropagation:function(){}});}catch(e){}
              if(typeof p.onInput==='function')try{p.onInput({target:el,currentTarget:el,type:'input',bubbles:true,preventDefault:function(){},stopPropagation:function(){}});}catch(e){}
              fb=fb.return;}}}catch(e){}
            })()`.replace(/\n\s+/g,""),document.head.appendChild(E),E.remove(),C||setTimeout(()=>{try{v.id===y&&v.removeAttribute("id")}catch{}},0),await new Promise(k=>setTimeout(k,300)),oe(m.action)){a.logToConsole(`> [REPLAN]  Estrat\xE9gia 4 OK: ${h}`,"text-green");continue}}}catch{}}if(u?.aborted)return;a.logToConsole("> [REPLAN] Estrat\xE9gia 5: re-consulta IA com diagn\xF3stico focado...","text-blue");try{let v="";try{let T=document.querySelector(`[data-easyquiz-id="${p.id}"]`)||document.getElementById(p.id||"")||Array.from(document.querySelectorAll('input, button, [role="radio"], [role="checkbox"], [role="option"]')).find(H=>(H.textContent||"").toLowerCase().includes(String(p.id||"").toLowerCase().slice(0,20)));T&&(v=T.outerHTML.slice(0,400))}catch{}let y=pe(!1)||ce(),C=`A\xE7\xE3o (${p.t}) alvo="${b}" valor="${p.v||p.c||""}" \u2014 Falha: "${m.evidence.slice(0,80)}"${v?`
HTML do alvo: ${v}`:""}`,q=m.strategiesAttempted?[m.strategiesAttempted].flat().concat(["alternative-path","injectScript","keyboard","vue-react-internals"]):["alternative-path","injectScript","keyboard","vue-react-internals"],x=`[REPLANEJAMENTO URGENTE \u2014 TENTATIVA FINAL]
A seguinte a\xE7\xE3o falhou ap\xF3s ${q.length} estrat\xE9gias autom\xE1ticas: ${q.join(", ")}.

${C}

Contexto atual da quest\xE3o:
${y?.questionText.slice(0,400)||"N/A"}

Controles dispon\xEDveis:
${JSON.stringify((y?.controls||[]).slice(0,6).map(T=>({id:T.id,type:T.type,label:T.label,options:T.options?.slice(0,3)})),null,2)}

TAREFA: Gere APENAS a\xE7\xF5es {t:"js"} com JavaScript criativo e robusto que consiga marcar/preencher/clicar o controle correto. 
Tente usar: document.querySelector, getComputedStyle, querySelectorAll com seletores diferentes, ou manipula\xE7\xE3o DOM direta.
Voc\xEA pode tentar m\xFAltiplas abordagens em um \xFAnico bloco JS. Seja criativo.
N\xC3O repita as estrat\xE9gias j\xE1 tentadas acima.`,E={...y,questionText:x},k=await je(E,[],{...e},T=>a.logToConsole(`> [REPLAN-AI] ${T}`,"text-blue"),u);if(u?.aborted||!k?.plan){a.logToConsole("> [REPLAN]  Re-consulta n\xE3o retornou plano.","text-yellow");continue}let w=k.plan.actions.filter(T=>T.t==="js");if(w.length===0){a.logToConsole("> [REPLAN] \u2139\uFE0F IA n\xE3o gerou a\xE7\xF5es JS de fallback.","text-yellow");continue}a.logToConsole(`> [REPLAN]  IA gerou ${w.length} a\xE7\xE3o(\xF5es) JS custom. Executando...`,"text-blue");let M={...t,actions:w,pageType:"question"},I=await He(M,!1,1,Ae(e));I.applied>0?a.logToConsole(`> [REPLAN]  Estrat\xE9gia 5 OK: ${I.applied} a\xE7\xE3o(\xF5es) JS executada(s)!`,"text-green"):a.logToConsole("> [REPLAN]  Todas as estrat\xE9gias esgotadas para esta a\xE7\xE3o.","text-yellow")}catch(v){a.logToConsole(`> [REPLAN] Erro na re-consulta: ${v instanceof Error?v.message:String(v)}`,"text-yellow")}}}}a.toggle(!0)}Bo().catch(o=>{console.error("[EasyQuiz] Erro fatal na inicializa\xE7\xE3o:",o),window.alert(`EasyQuiz: falha ao iniciar: ${o instanceof Error?o.message:String(o)}`)});})();
