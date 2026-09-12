/* EasyQuiz v1.0.0 — Resolução inteligente de quizzes sem servidor
 * GitHub: https://github.com/minifoxie/EasyQuiz
 * 100% Client-side. Direct Google Gemini REST API.
 */
"use strict";(()=>{var ie={apiKey:"",apiKeys:[],model:"gemini-3.5-flash-lite",uiMode:"easy",modeHint:"",engine:"smart",dryRun:!1,autoApply:!0,autoAdvance:!1,hostDarkMode:!0,useVision:!0,confidenceThreshold:.8};function Q(o){if(!o||typeof o!="string")return!1;let e=o.toLowerCase().trim().replace(/^models\//,"");if(!e.includes("gemini"))return!1;let t=["imagen","image","veo","omni","video","embedding","embed","tts","audio","speech","voice","sound","live","transcribe","bidi","aqa","learnlm","deep-research","computer-use","robotics","rt-1","rt-2","mediapipe","cyber","latest","-ultra","experimental"];for(let a of t)if(e.includes(a))return!1;return!(!e.includes("flash")&&!e.includes("pro"))}var Qe="easyquiz_settings_v2",ge="easyquiz_activity_metrics";function We(){try{let o=localStorage.getItem(Qe);if(!o){let s=localStorage.getItem("easyquiz_settings_v1");if(s){let i=JSON.parse(s);return{...ie,apiKey:i.apiKey||""}}return{...ie}}let e=JSON.parse(o),t=typeof e.model=="string"&&Q(e.model)?e.model:ie.model,a=Array.isArray(e.apiKeys)?e.apiKeys.map(s=>typeof s=="string"?s.trim().replace(/^["']|["']$/g,""):"").filter(s=>s.length>5):[],r=typeof e.apiKey=="string"?e.apiKey.trim().replace(/^["']|["']$/g,""):"";return a.length===0&&r&&(a=[r]),{apiKey:a[0]||r||ie.apiKey,apiKeys:a,model:t,uiMode:e.uiMode==="easy"||e.uiMode==="advanced"?e.uiMode:ie.uiMode,modeHint:e.modeHint??"",engine:e.engine??"smart",dryRun:!!e.dryRun,autoApply:e.autoApply!==void 0?!!e.autoApply:!0,autoAdvance:!!e.autoAdvance,hostDarkMode:e.hostDarkMode!==void 0?!!e.hostDarkMode:!0,useVision:e.useVision!==void 0?!!e.useVision:ie.useVision,confidenceThreshold:typeof e.confidenceThreshold=="number"?e.confidenceThreshold:ie.confidenceThreshold}}catch{return{...ie}}}function xt(){try{localStorage.removeItem(Qe),localStorage.removeItem("easyquiz_settings_v1"),localStorage.removeItem(ge),sessionStorage.removeItem(ge);let o=[];for(let e=0;e<localStorage.length;e++){let t=localStorage.key(e);t&&(t.startsWith("eq_")||t.startsWith("easyquiz_"))&&o.push(t)}o.forEach(e=>localStorage.removeItem(e)),Ye()}catch(o){console.warn("[EasyQuiz] Erro ao resetar dados:",o)}}function Ce(o){try{let e=localStorage.getItem("eq_domain_cache_"+o);if(!e)return{};let t=JSON.parse(e);if(t.advanceSelector&&/inject|injetar/i.test(t.advanceSelector)){t.advanceSelector=void 0;try{localStorage.removeItem("eq_domain_cache_"+o)}catch{}}return t}catch{return{}}}function Je(o,e){if(e.advanceSelector&&/inject|injetar/i.test(e.advanceSelector))return;let a={...Ce(o),...e};try{localStorage.setItem("eq_domain_cache_"+o,JSON.stringify(a))}catch(r){console.warn("[EasyQuiz] Erro cache de dominio:",r)}}function wt(o){let e=We(),t=Array.isArray(o.apiKeys)?o.apiKeys.map(n=>typeof n=="string"?n.trim().replace(/^["']|["']$/g,""):"").filter(n=>n.length>5):e.apiKeys,a;typeof o.apiKey=="string"?a=o.apiKey.trim().replace(/^["']|["']$/g,""):Array.isArray(o.apiKeys)&&o.apiKeys.length>0?a=t[0]||"":a=e.apiKey,a&&!t.includes(a)&&(t=[a,...t]),t.length>0&&(!a||!t.includes(a))&&(a=t[0]);let r={...e,...o,apiKey:a,apiKeys:t};try{localStorage.setItem(Qe,JSON.stringify(r))}catch(n){console.warn("[EasyQuiz] Falha ao persistir configura\xE7\xF5es no localStorage:",n)}return r}var he=[],yt=12,Yt=1200;function Et(o){let e=o.trim().replace(/\s+/g," ").slice(0,Yt);e&&!he.includes(e)&&(he.push(e),he.length>yt&&(he=he.slice(-yt)))}function Pe(){return he}function Ye(){he=[]}function qt(){return{startTime:Date.now(),totalElapsedMs:0,completedQuestionsCount:0,averageDurationMs:0,records:[]}}var qe=qt();function Te(){try{localStorage.removeItem(ge)}catch{}return qe}function Xt(o){qe=o;try{let e=JSON.stringify(o);sessionStorage.setItem(ge,e),localStorage.removeItem(ge)}catch{}}function Ct(o){let e=qe,t=Date.now(),a=e.records[e.records.length-1];if(a&&a.id===o.id&&t-a.timestamp<3e3)return e;let r={...o,timestamp:t},n=[...e.records,r],s=n.filter(p=>p.status==="answered"||p.status==="verified").length,i=n.reduce((p,b)=>p+b.durationMs,0),d=s>0?Math.round(i/s):0,l={startTime:e.startTime||t,totalElapsedMs:Math.max(t-(e.startTime||t),i),completedQuestionsCount:s,averageDurationMs:d,records:n};return Xt(l),l}function Ae(){qe=qt();try{sessionStorage.removeItem(ge),localStorage.removeItem(ge)}catch{}return qe}var Tt=`Voc\xEA \xE9 o motor operacional inteligente do EasyQuiz. Sa\xEDda EXCLUSIVA em JSON minificado, sem markdown, sem coment\xE1rios, sem texto fora do JSON.

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
`;function Zt(o,e){return/forms\.(google|gle)\.com|docs\.google\.com\/forms/i.test(o)||e.includes("Qr7Oae")||e.includes("freebirdFormviewer")||e.includes("data-item-id")?"[PLATAFORMA: Google Forms \u2014 use clk nos containers de alternativa; IDs via data-item-id ou texto da op\xE7\xE3o]":/wayground|quizizz/i.test(o)||e.includes("data-functional-selector")?e.includes("classification")||e.toLowerCase().includes("fato")||e.toLowerCase().includes("opini")?`[PLATAFORMA: Wayground/Quizizz CLASSIFICA\xC7\xC3O drag-and-drop]
[RESPOSTAS] ter\xE1 items com t="draggable" e id hexadecimal (ex: 695fa5b6...).
Use EXCLUSIVAMENTE: {t:"drag", from:"ID_hexadecimal_do_card", to:"NOME_DA_CATEGORIA"}
Exemplo: {t:"drag",from:"695fa5b69885555d8155a5ac",to:"FATO"}
Classifique TODOS os items (1 drag por item) antes de emitir adv.
mode: "arrastar_soltar"`:"[PLATAFORMA: Wayground/Quizizz \u2014 alternativas s\xE3o cards clic\xE1veis, use clk]":/khanacademy\.org/i.test(o)||e.includes("perseus")?"[PLATAFORMA: Khan Academy \u2014 widgets Perseus; use js via $eq para widgets interativos se necess\xE1rio]":/moodle|ava\.|classroom\.google/i.test(o)?"[PLATAFORMA: Moodle/AVA/Classroom \u2014 formul\xE1rios padr\xE3o]":/duolingo/i.test(o)?"[PLATAFORMA: Duolingo \u2014 tiles clic\xE1veis, use clk por texto]":/blackboard|canvas\.instructure/i.test(o)?"[PLATAFORMA: Canvas/Blackboard \u2014 quiz-question padr\xE3o]":/socrative|kahoot/i.test(o)?"[PLATAFORMA: Socrative/Kahoot \u2014 alternativas s\xE3o bot\xF5es, use clk]":""}function Se(o,e,t){let a=o.htmlSnippet.includes("draggable")||o.htmlSnippet.includes("perseus")||o.htmlSnippet.includes("category")||o.htmlSnippet.includes("dropzone")||o.controls.some(g=>g.type==="draggable"||g.type==="dropzone"),r=/katex|latex|\\frac|\\sqrt/i.test(o.htmlSnippet),n=/forms\.(google|gle)\.com|docs\.google\.com\/forms/i.test(o.sourceUrl)||o.htmlSnippet.includes("Qr7Oae")||o.htmlSnippet.includes("data-item-id")||o.htmlSnippet.includes("freebirdFormviewer"),s=(/wayground|quizizz/i.test(o.sourceUrl)||o.htmlSnippet.includes("data-functional-selector"))&&(o.htmlSnippet.includes("classification")||o.controls.filter(g=>g.role==="answer").length===0),i=o.controls.filter(g=>g.role!=="navigation").length===0,d=i||a||n||s||r&&o.questionText.length<60,l=i?4500:s?6e3:1800,p=d?`
[HTML]:
${o.htmlSnippet.slice(0,l).replace(/\s+/g," ")}`:"",b="";if(i&&typeof document<"u")try{let g=Array.from(document.querySelectorAll('input:not([type=hidden]), textarea, select, button, [role="button"], [role="radio"], [role="checkbox"], [role="option"], [onclick], [data-action], a[href]:not([href="#"]), [tabindex]:not([tabindex="-1"])')).filter(v=>{let w=v,C=w.getBoundingClientRect?.()||{width:0,height:0};return C.width>0&&C.height>0&&!w.closest("#easyquiz-shadow-root, .eq-sidebar")}).slice(0,40).map(v=>{let w=v,C=w.tagName.toLowerCase(),M=w.id?`#${w.id}`:"",S=w.className&&typeof w.className=="string"?`.${w.className.trim().split(/\s+/).slice(0,2).join(".")}`:"",x=(w.textContent||w.value||w.getAttribute("aria-label")||"").trim().slice(0,60),T=w.getAttribute("type")||w.getAttribute("role")||"";return`${C}${M}${S}[${T}] txt="${x}"`});g.length>0&&(b=`
[DOM-INTERATIVO]:
${g.join(`
`)}`)}catch{}let c=Pe(),m=c.length>0?`
[MEM\xD3RIA]:
${c.join(" | ")}
`:"",u=o.controls.filter(g=>g.role!=="navigation"),f=o.controls.filter(g=>g.role==="navigation"),y=Zt(o.sourceUrl,o.htmlSnippet),h=y?`
${y}
`:"";return`--- AN\xC1LISE ---
[MODO]: ${t.engine} | Dica: ${t.modeHint||"Auto"}
[URL]: ${o.sourceUrl}
[P\xC1GINA]: ${o.pageTitle}${m}${h}
[DADOS]
[TEXTO]:
${o.questionText}${p}${b}

[RESPOSTAS]:
${(()=>{if(u.length===0)return"Nenhuma";let g=u.filter(E=>E.type==="checkbox"||E.type==="chk"),v=new Set(u.filter(E=>E.type==="radio").map(E=>E.name).filter(Boolean)),w=g.filter(E=>!E.name||!v.has(E.name)),C=/selecione as|assinale as|quais das|todas as|marque as|escolha as|quais dessas|quais dos/i.test(o.questionText),M=w.length>=2||C,S=v.size>1||/verdadeir|fals[oa]|\bv\s*\/\s*f\b|julgue|itens/i.test(o.questionText)&&v.size>=1,x=u.every(E=>E.type==="radio"||E.type==="chk")&&v.size===1&&!M&&!S,T=u.filter(E=>E.type==="text"||E.type==="number"||E.type==="val"||E.tag==="input"||E.tag==="textarea"),L=T.length>=2;return(S?`[GRADE VERDADEIRO/FALSO (${v.size||"m\xFAltiplas"} afirma\xE7\xF5es): voc\xEA DEVE julgar e marcar exatamente 1 op\xE7\xE3o (V ou F) para CADA uma das ${v.size} afirma\xE7\xF5es \u2014 emita ${v.size} a\xE7\xF5es chk separadas + adv]
`:M?`[MULTI-SELE\xC7\xC3O: marque TODOS os corretos, pode ser 2 ou mais]
`:x?`[ESCOLHA-\xDAnica: marque APENAS 1 op\xE7\xE3o]
`:L?`[M\xDALTIPLOS CAMPOS DE PREENCHIMENTO (${T.length} campos): emita uma a\xE7\xE3o val para CADA um dos ${T.length} campos abaixo com seu id exato]
`:"")+JSON.stringify(u.map(E=>({id:E.id,t:E.type,n:E.name||void 0,txt:E.label?E.label.length>160?E.label.slice(0,160)+"...":E.label:void 0,v:E.value||void 0,opt:E.options&&E.options.length?E.options.slice(0,20).map(H=>H.label||H.value):void 0})))})()}

[NAVEGA\xC7\xC3O]:
${f.length>0?f.map(g=>`"${g.label||g.id}"[${g.type}]`).join(","):"Nenhuma"}

[IMAGENS E GR\xC1FICOS ANEXADOS (${e.length})]:
${e.length===0?"Nenhum anexo visual.":e.map((g,v)=>{let w=g.associatedLabel||"Gr\xE1fico da Quest\xE3o",C=g.alt?` | alt: "${g.alt}"`:"";if(g.captureStatus==="text_only")return`  - Imagem ${v+1} [CONTEXTO_TEXTUAL]: ${w}${C} | ${g.textContext||"sem contexto adicional"}`;if(g.captureStatus==="captured"||g.base64){let M=g.textContext?` | Textos e r\xF3tulos do gr\xE1fico: "${g.textContext}"`:"";return`  - Imagem ${v+1} [VISUAL_INLINE]: ${w}${C}${M}`}return`  - Imagem ${v+1} [FALHOU]: ${w}${C}`}).join(`
`)}
[/DADOS]
Sa\xEDda em JSON v\xE1lido.`}var eo=new Set(["question","info","start","conclusion"]),to=new Set(["texto_livre","escolha_unica","escolha_multipla","verdadeiro_falso","preenchimento","acao_sem_resposta","categorizacao","ordenacao","arrastar_soltar"]),oo=new Set(["val","chk","sel","clk","adv","js","drag"]),ao=150,Le=2e3;function W(o,e=""){return o==null?e:typeof o=="string"?o.trim().slice(0,Le):typeof o=="number"||typeof o=="boolean"?String(o).trim().slice(0,Le):e}function no(o,e){if(!o||typeof o!="object")return null;let t=o,a=t.t;if(typeof a!="string"||!oo.has(a))return null;if(a==="adv"){let i=t.id??t.target??t.name??t.selector;return{t:"adv",...W(i)?{id:W(i,"").slice(0,500)}:{}}}if(a==="drag"){let i=W(t.from??t.source),d=W(t.to??t.target??t.destination);return!i||!d?null:{t:"drag",from:i.slice(0,500),to:d.slice(0,500)}}if(a==="js"){let i=W(t.v??t.code??t.script);return!i||i.length>8e3?null:{t:"js",v:i}}let r=t.id??t.target??t.name??t.selector??t.element;(r==null||r==="")&&a==="val"&&(r="1");let n=W(r).slice(0,500);if(!n)return null;if(a==="val"){let i=t.v!==void 0?t.v:t.value!==void 0?t.value:t.val!==void 0?t.val:t.text!==void 0?t.text:t.answer;return{t:"val",id:n,v:W(i).slice(0,Le)}}if(a==="sel"){let i=t.v!==void 0?t.v:t.value!==void 0?t.value:t.val!==void 0?t.val:t.values,l=(Array.isArray(i)?i:[i]).map(p=>W(p).slice(0,500)).filter(Boolean);return{t:"sel",id:n,v:l}}if(a==="chk"){let i=t.c===!1||t.c==="false"||t.c===0||t.c==="0"||t.c==="off"||t.c==="unchecked"||t.c==="desmarcar",d={t:"chk",id:n,c:!i};return t.v!==void 0&&(d.v=W(t.v).slice(0,Le)),d}let s={t:"clk",id:n};if(t.c!==void 0){let i=t.c===!1||t.c==="false"||t.c===0||t.c==="0"||t.c==="off"||t.c==="unchecked"||t.c==="desmarcar";s.c=!i}return t.v!==void 0&&(s.v=W(t.v).slice(0,Le)),Array.isArray(t.co)&&t.co.length===2&&t.co.every(i=>typeof i=="number"&&Number.isFinite(i))&&(s.co=[t.co[0],t.co[1]]),s}function io(o,e,t){if(t!=="question")return o;let a=o.filter(n=>n.t==="adv"),r=o.filter(n=>n.t!=="adv");if(e==="escolha_unica"){r=r.filter(s=>!(s.t==="chk"&&s.c===!1||s.t==="clk"&&s.c===!1));let n=r.filter(s=>s.t==="chk"||s.t==="clk");if(n.length>1){let s=r.filter(d=>d.t!=="chk"&&d.t!=="clk"),i=n[n.length-1];r=[...s,i]}}else if(e==="escolha_multipla"){r=r.filter(s=>!(s.t==="chk"&&s.c===!1||s.t==="clk"&&s.c===!1));let n=new Set;r=r.filter(s=>{let i="id"in s&&typeof s.id=="string"?s.id:"";return i?n.has(i)?!1:(n.add(i),!0):!0})}else if(e==="verdadeiro_falso"){let n=new Set,s=[...r].reverse(),i=[];for(let d of s){let l="id"in d&&typeof d.id=="string"?d.id:"";l?n.has(l)||(n.add(l),i.push(d)):i.push(d)}r=i.reverse()}return[...r,...a]}function At(o){if(!o||typeof o!="object")return{pageType:"info",mode:"acao_sem_resposta",confidence:.5,rationale:"Resposta estruturada n\xE3o identificada; avan\xE7ando como informativo.",actions:[{t:"adv"}]};let e=o,t=e.pageType,a=e.mode;(typeof t!="string"||!eo.has(t))&&(t="question"),(typeof a!="string"||!to.has(a))&&(a="escolha_unica");let r=Array.isArray(e.actions)?e.actions:[],n=[];for(let d=0;d<Math.min(r.length,ao);d++){let l=no(r[d],d);l&&n.push(l)}n.some(d=>d.t==="val")&&(a==="escolha_unica"||!e.mode)&&(a="preenchimento"),n.some(d=>d.t==="drag")&&!["categorizacao","arrastar_soltar","ordenacao"].includes(a)&&(a="arrastar_soltar"),n=io(n,a,t);let s=n.some(d=>d.t==="adv");t==="conclusion"?n.length=0:t==="info"||t==="start"?s||n.push({t:"adv"}):t==="question"&&!s&&n.push({t:"adv"});let i=typeof e.confidence=="number"&&Number.isFinite(e.confidence)?Math.min(1,Math.max(0,e.confidence)):.85;return{pageType:t,mode:a,confidence:i,rationale:W(e.rationale,"Plano validado e auto-recuperado."),actions:n,...W(e.memoryToStore)?{memoryToStore:W(e.memoryToStore)}:{},...e.needsMoreContext?{needsMoreContext:!!e.needsMoreContext}:{}}}var X=class{keys=new Map;constructor(e=[]){this.init(e)}init(e){let t=new Map(this.keys);this.keys.clear();let a=e.flatMap(n=>n.split(/[\n\r]+/));Array.from(new Set(a.map(n=>n.trim().replace(/^["']|["']$/g,"")).filter(n=>n.length>5))).forEach((n,s)=>{let i=this.generateId(n),d=t.get(i)||t.get(n);this.keys.set(i,{id:i,key:n,label:d?.label||`Chave ${s+1}`,addedAt:d?.addedAt||Date.now(),lastUsedAt:d?.lastUsedAt,lastLatencyMs:d?.lastLatencyMs,cooldownUntil:d?.cooldownUntil,errorCount:d?.errorCount||0,lastError:d?.lastError,winCount:d?.winCount||0})})}generateId(e){let t=0;for(let r=0;r<e.length;r++)t=(t<<5)-t+e.charCodeAt(r),t|=0;let a=e.slice(-12).replace(/[^a-zA-Z0-9]/g,"").slice(0,6);return`key_${Math.abs(t).toString(36).slice(0,6)}${a}`}static maskKey(e){let t=e.trim().replace(/^["']|["']$/g,"");return t.length<=10?"\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022":`${t.slice(0,6)}...${t.slice(-4)}`}getAllKeys(){let e=Date.now();return Array.from(this.keys.values()).map(t=>{let a=Math.max(0,(t.cooldownUntil||0)-e);return{...t,isCooldown:a>0,remainingCooldownMs:a}})}getHealthyKeys(){let e=Date.now();return Array.from(this.keys.values()).filter(t=>(t.cooldownUntil||0)<=e&&(t.errorCount||0)<50)}getRoundRobinKeys(e=2){let t=Date.now(),a=Array.from(this.keys.values()).filter(n=>(n.errorCount||0)<50);if(a.length===0)return Array.from(this.keys.values()).slice(0,e);let r=a.filter(n=>(n.cooldownUntil||0)<=t);return r.length>0?(r.sort((n,s)=>{let i=n.lastLatencyMs!==void 0?n.lastLatencyMs:99999,d=s.lastLatencyMs!==void 0?s.lastLatencyMs:99999;if(i!==d)return i-d;let l=(n.lastUsedAt||0)-(s.lastUsedAt||0);return l!==0?l:n.addedAt-s.addedAt}),r.slice(0,e)):(a.sort((n,s)=>(n.cooldownUntil||0)-(s.cooldownUntil||0)),a.slice(0,e))}getBestKey(){return this.getRoundRobinKeys(1)[0]?.key||""}getDiverseKeys(e){return this.getRoundRobinKeys(e).map(t=>t.key)}markQuotaHit(e,t=8e3){let a=this.findKeyObj(e);a&&(a.cooldownUntil=Date.now()+t,a.lastError=`Cota tempor\xE1ria atingida (HTTP 429). Cooldown de ${Math.round(t/1e3)}s ativado.`)}markOverloaded(e,t=5e3){let a=this.findKeyObj(e);a&&(a.cooldownUntil=Date.now()+t,a.lastError=`Servidores sobrecarregados (HTTP 503). Cooldown de ${Math.round(t/1e3)}s ativado.`)}markSuccess(e,t){let a=this.findKeyObj(e);a&&(a.lastLatencyMs=t,a.lastUsedAt=Date.now(),a.errorCount=0,a.lastError=void 0,a.cooldownUntil=void 0)}markWinner(e){let t=this.findKeyObj(e);t&&(t.winCount=(t.winCount||0)+1)}markInvalid(e,t){let a=this.findKeyObj(e);a&&(a.errorCount=99,a.lastError=t)}addKey(e,t){let a=e.trim().replace(/^["']|["']$/g,"");if(!a)return{ok:!1,message:"Chave n\xE3o pode ser vazia."};if(a.length<15)return{ok:!1,message:"Chave de API inv\xE1lida ou muito curta."};let r=this.generateId(a);if(this.keys.has(r)||Array.from(this.keys.values()).some(i=>i.key===a))return{ok:!1,message:"Esta chave de API j\xE1 est\xE1 cadastrada."};let s={id:r,key:a,label:t?.trim()||`Chave ${this.keys.size+1}`,addedAt:Date.now(),errorCount:0};return this.keys.set(r,s),{ok:!0,message:"Chave adicionada com sucesso!",keyItem:s}}updateKey(e,t,a){let r=this.keys.get(e);if(!r)return{ok:!1,message:"Chave n\xE3o encontrada."};let n=t.trim().replace(/^["']|["']$/g,"");return!n||n.length<15?{ok:!1,message:"Chave de API inv\xE1lida."}:(r.key=n,a!==void 0&&(r.label=a.trim()),r.errorCount=0,r.cooldownUntil=void 0,r.lastError=void 0,{ok:!0,message:"Chave atualizada com sucesso!"})}removeKey(e){if(this.keys.size<=1)return{ok:!1,message:"Voc\xEA precisa manter pelo menos 1 chave de API cadastrada."};let t=this.findKeyObj(e);return t?(this.keys.delete(t.id),{ok:!0,message:"Chave removida com sucesso."}):{ok:!1,message:"Chave n\xE3o encontrada."}}exportRawKeys(){return Array.from(this.keys.values()).map(e=>e.key)}size(){return this.keys.size}findKeyObj(e){if(this.keys.has(e))return this.keys.get(e);for(let t of this.keys.values())if(t.key===e)return t}},P=new X;var xe=[{id:"gemini-3.8-flash",name:"Gemini 3.8 Flash (Mais Inteligente 2026)",description:"Modelo flagship Flash lan\xE7ado em Set/2026. Ultra-r\xE1pido e altamente capaz.",stable:!0},{id:"gemini-3.7-flash",name:"Gemini 3.7 Flash (Agentic)",description:"Alta capacidade para racioc\xEDnio multimodal e workflows ag\xEAnticos.",stable:!0},{id:"gemini-3.6-flash",name:"Gemini 3.6 Flash (Est\xE1vel)",description:"Modelo est\xE1vel e confi\xE1vel com excelente velocidade.",stable:!0},{id:"gemini-3.5-flash",name:"Gemini 3.5 Flash (R\xE1pido)",description:"Modelo de alta performance para tarefas r\xE1pidas.",stable:!0},{id:"gemini-3.5-flash-lite",name:"Gemini 3.5 Flash-Lite (Cota Alta 30 RPM)",description:"Modelo econ\xF4mico de ultra-alta velocidade e maior limite de RPM.",stable:!0},{id:"gemini-3.1-pro",name:"Gemini 3.1 Pro (Racioc\xEDnio Profundo)",description:"Modelo topo de linha para racioc\xEDnio complexo, exatas e matem\xE1tica.",stable:!0},{id:"gemini-2.5-flash",name:"Gemini 2.5 Flash (Ultra R\xE1pido)",description:"Modelo comprovado de baix\xEDssima lat\xEAncia e alta disponibilidade.",stable:!0},{id:"gemini-2.5-pro",name:"Gemini 2.5 Pro (Avan\xE7ado)",description:"Modelo avan\xE7ado para quest\xF5es de alta complexidade.",stable:!0}],Lt=["gemini-3.5-flash-lite","gemini-3.5-flash","gemini-3.6-flash","gemini-3.8-flash","gemini-2.5-flash"],so={"gemini-2.0-flash":"gemini-3.5-flash","gemini-2.0-flash-lite":"gemini-3.5-flash-lite","gemini-1.5-flash":"gemini-3.5-flash","gemini-1.5-pro":"gemini-3.6-flash","gemini-1.0-pro":"gemini-2.5-flash"};function et(o){return so[o]??o}function ro(o,e){let a={temperature:0,maxOutputTokens:1350,responseMimeType:"application/json",responseSchema:e??lo};return/lite/i.test(o)||(/gemini-3\.[0-9]+-?flash/i.test(o)?a.thinkingConfig={thinkingBudget:0}:/gemini-2\.5-flash/i.test(o)&&(a.thinkingConfig={thinkingBudget:0})),a}var lo={type:"OBJECT",properties:{pageType:{type:"STRING",enum:["question","info","start","conclusion"]},mode:{type:"STRING",enum:["texto_livre","escolha_unica","escolha_multipla","verdadeiro_falso","preenchimento","acao_sem_resposta","categorizacao","ordenacao","arrastar_soltar"]},confidence:{type:"NUMBER"},rationale:{type:"STRING"},thinking:{type:"STRING"},memoryToStore:{type:"STRING"},imageDescriptions:{type:"ARRAY",items:{type:"OBJECT",properties:{index:{type:"NUMBER"},description:{type:"STRING"},relevant:{type:"BOOLEAN"},associatedLabel:{type:"STRING"}}}},actions:{type:"ARRAY",items:{type:"OBJECT",properties:{t:{type:"STRING",enum:["val","chk","sel","clk","adv","js","drag"]},id:{type:"STRING"},name:{type:"STRING"},label:{type:"STRING"},v:{type:"STRING"},c:{type:"BOOLEAN"},co:{type:"ARRAY",items:{type:"NUMBER"}},from:{type:"STRING"},to:{type:"STRING"}},required:["t"]}}},required:["pageType","mode","confidence","rationale","actions"]};function Mt(o){let e=o.trim().replace(/^google\//,"").replace(/^models\//,"");if(!e)return"gemini-3.5-flash-lite";let t=et(e);return Q(t)?t:(console.warn(`[EasyQuiz] Modelo desconhecido ou inv\xE1lido: "${e}". Verifique se o modelo est\xE1 dispon\xEDvel no Google AI Studio.`),"gemini-3.5-flash-lite")}function Ze(o,e){let t="";try{let a=JSON.parse(o);t=a.error?.message||a.message||""}catch{t=o.slice(0,160)}return/API_KEY_INVALID|API key not valid|key.*invalid|unregistered/i.test(t)?"Chave de API do Gemini inv\xE1lida ou n\xE3o autorizada no Google AI Studio.":/RESOURCE_EXHAUSTED|Quota exceeded|rate limit|quota/i.test(t)||e===429?`Cota do Gemini excedida (HTTP 429): ${t||"Aguarde"}`:e===404?`HTTP 404: ${t||"Modelo ou endpoint n\xE3o encontrado no Google AI Studio"}`:e===503||/overloaded/i.test(t)?`Servidores Google sobrecarregados (HTTP 503): ${t||"Aguardando"}`:t?`Erro Gemini (HTTP ${e}): ${t}`:`Falha na requisi\xE7\xE3o ao Gemini (HTTP ${e}).`}function co(o){let e=o.trim(),t=e.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);if(t)try{return JSON.parse(t[1].trim())}catch{}try{return JSON.parse(e)}catch{}let a=e.match(/\{[\s\S]*\}/);if(a)try{return JSON.parse(a[0].trim())}catch{}try{let r=e.indexOf("{");if(r!==-1){let n=e.slice(r).trim();n=n.replace(/,\s*\{[^}]*$/,""),n=n.replace(/,\s*$/,"");let s=0,i=0,d=!1,l=!1;for(let b=0;b<n.length;b++){let c=n[b];if(l){l=!1;continue}if(c==="\\"){l=!0;continue}if(c==='"'){d=!d;continue}d||(c==="{"?s++:c==="}"?s=Math.max(0,s-1):c==="["?i++:c==="]"&&(i=Math.max(0,i-1)))}for(d&&(n+='"');i>0;)n+="]",i--;for(;s>0;)n+="}",s--;let p=JSON.parse(n);if(p&&typeof p=="object")return p}}catch{}throw new Error("Falha ao decodificar JSON da IA.")}var kt=(()=>{try{let o=typeof localStorage<"u"?localStorage.getItem("easyquiz_cached_models"):null;if(!o)return null;let e=JSON.parse(o);if(Array.isArray(e)){let t=e.filter(a=>a&&typeof a.id=="string"&&Q(a.id));return t.length>0?t:null}return null}catch{return null}})(),Xe=new Set;async function Re(o){let e=o.trim().replace(/^["']|["']$/g,"");if(!e)return xe;let t=[`https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(e)}`,`https://generativelanguage.googleapis.com/v1/models?key=${encodeURIComponent(e)}`];for(let a of t)try{let r=await fetch(a,{headers:{"Content-Type":"application/json","x-goog-api-key":e}});if(!r.ok){let s=await r.text(),i=Ze(s,r.status);if(i.includes("inv\xE1lida")||i.includes("n\xE3o autorizada"))throw new Error(i);continue}let n=await r.json();if(Array.isArray(n.models)&&n.models.length>0){let s=n.models.filter(i=>{let d=i.supportedGenerationMethods||[],l=(i.name||"").replace(/^models\//,""),p=d.includes("generateContent");return Q(l)&&p}).map(i=>{let d=i.supportedGenerationMethods||[],l=i.name.replace(/^models\//,""),p=i.displayName||l;return{id:l,name:p.includes(l)?p:`${p} (${l})`,description:i.description||"",stable:!/-preview|-experimental|-latest/i.test(l),supportsVision:!/embedding|tts|transcribe|live|image|sound|voice/i.test(l),supportsStructuredOutput:d.includes("generateContent"),supportedGenerationMethods:d,discoveredAt:Date.now()}});if(s.length>0){s.sort((i,d)=>{let l=p=>p==="gemini-3.8-flash"?200:p==="gemini-3.7-flash"?190:p==="gemini-3.6-flash"?180:p==="gemini-3.5-flash"?170:p==="gemini-3.5-flash-lite"?160:p==="gemini-2.5-flash"?130:p.includes("flash")?80:p==="gemini-2.5-pro"?60:p.includes("pro")?50:10;return l(d.id)-l(i.id)}),kt=s;try{typeof localStorage<"u"&&localStorage.setItem("easyquiz_cached_models",JSON.stringify(s))}catch{}return s}}}catch(r){if(r.message?.includes("Chave de API"))throw r}return xe}async function Oe(o){let e=o.trim().replace(/^["']|["']$/g,"");if(!e)return{ok:!1,message:"Insira sua chave de API."};try{let a=await Re(e);if(a.length>0&&a!==xe){let r=a[0];return{ok:!0,message:`Chave v\xE1lida! ${a.length} modelos Gemini dispon\xEDveis em sua conta. Recomendado: ${r.name}`,models:a}}}catch(a){return{ok:!1,message:a instanceof Error?a.message:String(a)}}let t=["gemini-3.8-flash","gemini-3.6-flash","gemini-3.5-flash"];for(let a of t)for(let r of["v1beta","v1"]){let n=`https://generativelanguage.googleapis.com/${r}/models/${a}:generateContent?key=${encodeURIComponent(e)}`;try{if((await fetch(n,{method:"POST",headers:{"Content-Type":"application/json","x-goog-api-key":e},body:JSON.stringify({contents:[{role:"user",parts:[{text:"PING"}]}],generationConfig:{maxOutputTokens:5}})})).ok)return{ok:!0,message:`Chave validada com sucesso no ${a} (${r})!`,models:xe}}catch{}}return{ok:!1,message:"Chave de API inv\xE1lida, sem cota ou sem permiss\xE3o para modelos Gemini."}}async function tt(o,e){let t=e.map(l=>l.trim().replace(/^["']|["']$/g,"")).filter(l=>l.length>5);if(t.length===0)return{ok:!1,model:o,key:"",message:"Nenhuma chave dispon\xEDvel."};let a=et(Mt(o)),r=JSON.stringify({contents:[{role:"user",parts:[{text:"PING"}]}],generationConfig:{maxOutputTokens:5}}),n={"Content-Type":"application/json"};async function s(l,p,b){let c=new AbortController,m=setTimeout(()=>c.abort(),b);try{let u=`https://generativelanguage.googleapis.com/v1beta/models/${p}:generateContent?key=${encodeURIComponent(l)}`,f=await fetch(u,{method:"POST",headers:{...n,"x-goog-api-key":l},body:r,signal:c.signal});if(clearTimeout(m),f.ok)return{ok:!0,model:p,key:l,message:`Modelo '${p}' validado com sucesso!`};let y=await f.text().catch(()=>"");throw new Error(`HTTP ${f.status}: ${y.slice(0,80)}`)}catch(u){throw clearTimeout(m),u}}if(t.length>=2){let l=t.slice(0,6);try{return await Promise.any(l.map(b=>s(b,a,8e3)))}catch{}}let i=t[0],d=[a,...Lt.filter(l=>l!==a)];for(let l of d)try{let p=await s(i,l,4e3);return l!==a&&(p.message=`Modelo preferido indispon\xEDvel. Validado via fallback '${l}'.`),p}catch{}return{ok:!1,model:a,key:i,message:"Nenhum modelo Gemini respondeu. Verifique sua chave e cota."}}async function uo(o,e,t,a,r){let n=["v1beta","v1"],s=new Error(`Falha ao consultar modelo ${o}`),d={...ro(o,r)};for(let l of n){if(a.aborted)throw new Error("Opera\xE7\xE3o cancelada pelo usu\xE1rio.");let p=`https://generativelanguage.googleapis.com/${l}/models/${o}:generateContent?key=${encodeURIComponent(e)}`,b=Date.now();try{let c=await fetch(p,{method:"POST",headers:{"Content-Type":"application/json","x-goog-api-key":e},body:JSON.stringify({...t,generationConfig:d}),signal:a});if(!c.ok){let f=await c.text();if(c.status===400){let h=/thinking/i.test(f),g=/response_schema|responseSchema|Repeated map key|PROTO payload/i.test(f);if((h||g)&&(d.thinkingConfig||d.responseSchema)){let v={...d};h&&delete v.thinkingConfig,g&&(delete v.responseSchema,delete v.responseMimeType),d=v;let w=await fetch(p,{method:"POST",headers:{"Content-Type":"application/json","x-goog-api-key":e},body:JSON.stringify({...t,generationConfig:d}),signal:a});if(w.ok){let S=await w.json(),x=S.candidates?.[0];if(x?.content?.parts?.[0]?.text)return P.markSuccess(e,Date.now()-b),{rawText:x.content.parts[0].text,data:S,usedModel:o,usedKey:e}}let C=await w?.text?.().catch(()=>"")??f,M=Ze(C,c.status);throw new Error(`[${o}|${X.maskKey(e)}] ${M}`)}}let y=Ze(f,c.status);if(c.status===404&&l==="v1beta")continue;throw c.status===429?(P.markQuotaHit(e,8e3),It(e,o,1e4),new Error(`[${o}|${X.maskKey(e)}] ${y}`)):(c.status===503||/no capacity|overloaded|unavailable/i.test(f)?(P.markOverloaded(e,5e3),Xe.add(o)):c.status===403||/API_KEY_INVALID/i.test(f)?P.markInvalid(e,y):c.status===404&&Xe.add(o),new Error(`[${o}|${X.maskKey(e)}] ${y}`))}let m=await c.json(),u=m.candidates?.[0];if(!u||!u.content?.parts?.[0]?.text)throw new Error(`[${o}|${X.maskKey(e)}] A IA n\xE3o retornou uma resposta estruturada v\xE1lida.`);return P.markSuccess(e,Date.now()-b),{rawText:u.content.parts[0].text,data:m,usedModel:o,usedKey:e}}catch(c){if(a.aborted)throw c;s=c;let m=s.message||"";if(m.includes("404")||/no longer available/i.test(m)){Xe.add(o);break}if(m.includes("429")||m.includes("Quota"))break}}throw s}var ze=new Map;function St(o,e){let t=`${o}::${e}`,a=ze.get(t);return a===void 0?!1:Date.now()>a?(ze.delete(t),!1):!0}function It(o,e,t=1e4){ze.set(`${o}::${e}`,Date.now()+t)}function Ht(){ze.clear()}async function Ne(o,e,t,a,r,n){if(r?.aborted)throw new Error("Opera\xE7\xE3o cancelada pelo usu\xE1rio.");let s=Array.isArray(t.apiKeys)&&t.apiKeys.length>0?t.apiKeys:t.apiKey?[t.apiKey]:[];P.init(s);let i=t.apiKey.trim().replace(/^["']|["']$/g,""),d=P.getBestKey()||i;if(!d)throw new Error("Nenhuma chave de API do Gemini configurada ou dispon\xEDvel.");let l=Mt(t.model);if(!kt&&d&&Re(d).catch(()=>{}),r?.aborted)throw new Error("Opera\xE7\xE3o cancelada pelo usu\xE1rio.");let p=Date.now(),b=Se(o,e,t),c=[{text:b}];for(let $=0;$<e.length;$++){let E=e[$],H=E.associatedLabel||(E.alt?`Imagem: ${E.alt}`:`Imagem ${$+1}`);if(E.captureStatus==="text_only"||!E.base64){let O=E.textContext||E.alt||"";c.push({text:`[CONTEXTO_IMAGEM_${$+1} - V\xCDNCULO: ${H}]: ${O}`})}else c.push({text:`[ANEXO VISUAL ${$+1} - V\xCDNCULO: ${H}]:`}),c.push({inline_data:{mime_type:E.mediaType,data:E.base64}})}let m={system_instruction:{parts:[{text:n?.systemPromptOverride??Tt}]},contents:[{role:"user",parts:c}]},u=et(l),f=Lt.filter($=>$!==u),h=P.getAllKeys().length,g=$=>h<=1||$===0?1:2,v=new Set,w=($,E)=>{let H=/pro/i.test($),O=/lite/i.test($);return H?E===0?18e3:E===1?24e3:3e4:O?E===0?1e4:E===1?14e3:18e3:E===0?16e3:E===1?2e4:25e3},C=async($,E)=>{if(E.length===0||r?.aborted)return null;let H=E.map(()=>new AbortController),O=()=>H.forEach(N=>{try{N.abort()}catch{}});r?.addEventListener("abort",O,{once:!0});let _=E.map(N=>`${N.model.replace("gemini-","")}/${N.label}`).join(" | ");a?.(`\u26A1 ${$}: ${E.length} slot(s) [${_}]...`,"info");try{let N=E.map(async(j,ne)=>{let F=H[ne],me=setTimeout(()=>{try{F.abort(new Error(`Timeout ${j.timeout/1e3}s (${j.model}|${j.label})`))}catch{F.abort()}},j.timeout);try{let K=await uo(j.model,j.key,m,F.signal,n?.generationSchemaOverride);clearTimeout(me);let Y=At(co(K.rawText));return Y.usedModel=K.usedModel,Y.durationMs=Date.now()-p,Y.promptSent=b,Y.tokensUsed=K.data.usageMetadata?.totalTokenCount,Y.promptTokens=K.data.usageMetadata?.promptTokenCount,Y.candidatesTokens=K.data.usageMetadata?.candidatesTokenCount,Y.rawResponse=K.rawText,H.forEach((vt,Jt)=>{if(Jt!==ne)try{vt.abort(new Error("Cancelado: vencedor respondeu."))}catch{vt.abort()}}),{plan:Y,rawUsage:K.data.usageMetadata,usedModel:K.usedModel,usedKey:K.usedKey,slotLabel:j.label}}catch(K){clearTimeout(me);let Y=K instanceof Error?K.message:String(K);throw(Y.includes("429")||Y.includes("Quota")||Y.includes("RESOURCE_EXHAUSTED"))&&(It(j.key,j.model,1e4),P.markQuotaHit(j.key,8e3)),K}}),D=await Promise.any(N);return r?.removeEventListener("abort",O),P.markWinner(D.usedKey),D}catch(N){return r?.removeEventListener("abort",O),N instanceof AggregateError&&N.errors.length>0?T=N.errors.map(D=>D instanceof Error?D.message:String(D)).join(" | "):N instanceof Error&&(T=N.message),console.warn(`[EasyQuiz ${$}] Falha na onda:`,T),null}},S=(h<=1?1:1+Math.ceil((h-1)/2))+4,x=0,T="",L=0;for(;x<S;){if(r?.aborted)throw new Error("Opera\xE7\xE3o cancelada pelo usu\xE1rio.");let $=P.getRoundRobinKeys(h),E=$.filter(F=>!v.has(`${F.key}::${u}`)&&!St(F.key,u)),H,O;if(E.length>0)H=u,O=E;else{let F=f;H=F[L%F.length]||u,L++;let me=$.filter(K=>!v.has(`${K.key}::${H}`)&&!St(K.key,H));O=me.length>0?me:$.filter(K=>!v.has(`${K.key}::${H}`))}if(O.length===0){if(L<f.length)continue;break}let _=O.slice(0,g(x));if(_.length===0)break;let N=w(H,x),D=_.map(F=>(v.add(`${F.key}::${H}`),{model:H,key:F.key,label:F.label||"Chave",timeout:N})),j=x===0?"Onda 1":`Onda ${x+1}`,ne=await C(j,D);if(ne){let F=ne.plan.durationMs||Date.now()-p,me=X.maskKey(ne.usedKey);return a?.(`\u2705 ${F}ms via '${ne.usedModel}' (${ne.slotLabel}: ${me})`,"info"),ne}x++}throw new Error(T||"Todas as tentativas falharam. Verifique suas chaves de API e cotas.")}var po=[/\bfetch\b/i,/\bXMLHttpRequest\b/i,/\bWebSocket\b/i,/\b(?:localStorage|sessionStorage|indexedDB)\b/i,/\b(?:eval|Function|AsyncFunction|GeneratorFunction)\b/i,/\bimport(?:Scripts)?\b/i,/\bnavigator\s*\.\s*credentials\b/i,/\b(?:cookie|location\s*=|history\s*\.)/i,/\bwindow\s*\[\s*['"](?:fetch|eval|Function|localStorage|sessionStorage)/i];function fe(o){let e=o?.engine||"smart",t=new Set(["dom","framework","keyboard","drag"]);return o?.autoAdvance&&t.add("navigation"),e==="javascript"&&t.add("javascript"),{engine:e,capabilities:t,maxAttemptsPerAction:e==="command"?1:2,maxActionMs:e==="command"?1500:3e3,allowJavaScript:e==="javascript",allowNavigation:!!o?.autoAdvance}}function ot(o,e){if(o.t==="js"&&!e.allowJavaScript)throw new Error("A\xE7\xE3o JavaScript bloqueada pela engine atual. Use o motor JavaScript explicitamente.");if(o.t==="adv"&&!e.allowNavigation)throw new Error("Avan\xE7o autom\xE1tico bloqueado pela pol\xEDtica atual.")}function $t(o){if(!o.trim())throw new Error("JavaScript recusado: c\xF3digo vazio.");if(o.length>8e3)throw new Error("JavaScript recusado: c\xF3digo acima do limite operacional.");if(po.find(t=>t.test(o)))throw new Error("JavaScript recusado: acesso externo, persist\xEAncia ou avalia\xE7\xE3o din\xE2mica n\xE3o permitidos.");if(!/^\s*(?:\/\/[^\n]*\n|\/\*[\s\S]*?\*\/|[\s\S])*\$eq\./.test(o)&&!o.includes("$eq."))throw new Error("JavaScript recusado: use somente a API declarativa $eq.")}var we=['input:not([type="hidden"])',"textarea","select","button","a","label",'[role="button"]','[role="link"]','[role="radio"]','[role="checkbox"]','[role="option"]','[role="treeitem"]','[role="menuitemcheckbox"]','[role="menuitemradio"]','[contenteditable="true"]','[draggable="true"]',"[aria-grabbed]","[aria-dropeffect]","[data-widget-type]",".perseus-drag-item",".sortable-item",'[data-testid*="drag" i]','[data-testid*="card" i]','[data-testid*="option" i]','[data-testid*="choice" i]','[data-testid*="category" i]',"[data-choice]","[data-option]","[data-answer]","[data-value]",".quiz-option",".option-card",".choice-card",'[class*="option-card" i]','[class*="choice-card" i]','[class*="option-item" i]','[class*="choice-item" i]','[class*="answer-item" i]','[class*="alternative" i]','li[class*="choice" i]','li[class*="option" i]','li[class*="answer" i]','[data-role="dropzone"]',"[data-category]","[data-item-id]","[data-params][jsmodel]",'[class*="draggable-item" i]','[class*="drag-item" i]','[class*="sortable-card" i]','[class*="card-option" i]','[class*="tile" i][class*="option" i]'].join(","),ke=/(verificar|checar|check|conferir|validar|próxim[oa]|next|continuar|continue|avançar|prosseguir|enviar|submit|concluir|finalizar|terminar|começar|iniciar|start|vamos lá|próxima tarefa|next task|próxima pergunta|next question|marcar como concluíd[oa]|mostrar resumo|entendi|compreendi|ok|leitura concluída|seguir|ir para o exercício|fazer o teste|próximo artigo|ir para a aula)/i,se=/(\banterior\b|\bvoltar\b|\bback\b|\bprev\b|\bprevious\b|recomeçar|\brestart\b|\breplay\b|\bretornar\b)/i,mo=0;function at(o){try{let e=o.closest('[hidden], [style*="display: none"], [style*="display:none"], [aria-hidden="true"]');if(e&&!le(e))return!1}catch{}try{let e=window.getComputedStyle?window.getComputedStyle(o):o.style;if(e&&(e.display==="none"||e.visibility==="hidden"))return!1}catch{}try{if(typeof o.getBoundingClientRect=="function"){let e=o.getBoundingClientRect();if(e.width>0||e.height>0)return!0}}catch{}return(o.textContent||"").trim().length>0}function B(o){try{if(typeof CSS<"u"&&typeof CSS.escape=="function")return CSS.escape(o)}catch{}return String(o).replace(/["\\]/g,"\\$&")}function k(o){let e=o;if(!e||typeof e.isConnected=="boolean"&&!e.isConnected||le(e))return!1;let t=e.tagName?.toLowerCase();if(["input","select","textarea","button"].includes(t)){let a=e.type?.toLowerCase();if(a==="checkbox"||a==="radio"){if(e.id)try{let n=e.ownerDocument?.querySelector(`label[for="${B(e.id)}"]`);if(n&&at(n))return!0}catch{}let r=e.closest('label, .option-card, .quiz-option, .choice, .answer, [role="radio"], [role="checkbox"], [class*="option" i], [class*="choice" i], [class*="item" i], li, tr');if(r&&r!==e&&at(r))return!0}try{if(!e.closest('[hidden], [style*="display: none"], [style*="display:none"], [aria-hidden="true"]')){let n=window.getComputedStyle?window.getComputedStyle(e):e.style;if(!n||n.display!=="none"&&n.visibility!=="hidden"){if(typeof e.getBoundingClientRect=="function"){let s=e.getBoundingClientRect();if(s.width>0||s.height>0)return!0}return!0}}}catch{}}return at(e)}function ho(o){if(o==null)return"";if(typeof o=="string")return o;if(typeof o=="number"||typeof o=="boolean")return String(o);if(o instanceof Node)return o.textContent||"";try{if(typeof o?.toString=="function"){let e=o.toString();if(typeof e=="string")return e}}catch{}return""}function R(o,e=500){return ho(o).replace(/\s+/g," ").trim().slice(0,e)}function go(o){let e=o.dataset.easyquizId;if(e)return e;let t=`eq-${Date.now().toString(36)}-${(mo+=1).toString(36)}`;return o.dataset.easyquizId=t,t}function le(o){return o?!!(o.closest('#easyquiz-shadow-root, .eq-sidebar, .eq-launcher, [data-easyquiz-ignore="true"], .btn-inject-eq, #btn-inject-script')||o.getAttribute?.("data-easyquiz-ignore")==="true"):!1}var Me=/(leaderboard|scoreboard|placar|ranking|trophy|pause|pausar|mute|mutar|audio|sound|som|música|music|configuraç|settings|theme|ajuda|help|report|denunciar|feedback|power-?up|streak|coins|fullscreen|full-screen|read-?aloud|audio-?player|(?:audio|sound|som|media)[-_ ]*volume|volume[-_ ]*(?:slider|control|level|btn|button|icon|mute)|vol-slider)/i;function V(o){if(!o||typeof o.getAttribute!="function"||typeof Element<"u"&&!(o instanceof Element))return!1;if(le(o))return!0;let e=o.tagName?.toLowerCase();if(["select","textarea"].includes(e)||e==="input"&&!["button","submit","reset"].includes((o.type||"").toLowerCase()))return!1;let a=o.closest?.('button, a, [role="button"], [class*="leaderboard" i], [data-testid*="leaderboard" i], [class*="scoreboard" i], [class*="trophy" i]')||o,r=String(a.getAttribute?.("data-testid")||a.getAttribute?.("data-test-id")||a.getAttribute?.("id")||""),n=String(a.getAttribute?.("aria-label")||""),s=String(a.getAttribute?.("title")||""),i=typeof a.className=="string"?a.className:typeof a.className?.baseVal=="string"?a.className.baseVal:"",d=R(a.textContent,60);return!!(Me.test(r)||Me.test(n)||Me.test(s)||Me.test(i)||d.length>0&&d.length<=25&&Me.test(d))}function J(o){if(!o||typeof o.getAttribute!="function"||typeof Element<"u"&&!(o instanceof Element)||le(o)||V(o)||o.closest?.('.option-card, .choice-card, .quiz-option, [class*="option-card" i], [class*="choice-card" i], [class*="option-item" i], [class*="choice-item" i], [class*="answer-item" i], [data-testid*="option" i], [data-testid*="choice" i], [data-choice], [data-option], [data-answer], [role="radio"], [role="checkbox"], [role="option"]')||o.closest?.("header, nav, aside"))return!1;let e=typeof HTMLInputElement<"u"&&o instanceof HTMLInputElement||typeof HTMLButtonElement<"u"&&o instanceof HTMLButtonElement?o.value:"",t=R(o.getAttribute?.("aria-label")||o.textContent||o.getAttribute?.("value")||e),a=o.type,r=t.replace(/[\d\(\)\[\]\u2192>\u2022\-\/\\]+/g," ").trim(),n=String(o.getAttribute?.("data-testid")||o.getAttribute?.("data-test-id")||o.getAttribute?.("id")||o.getAttribute?.("href")||"").toLowerCase();return se.test(r)||se.test(t)?!1:ke.test(r)||ke.test(t)||n.includes("next")||n.includes("check")||n.includes("continue")||n.includes("proximo")||n.includes("forward")?!0:/^\d{1,3}$/.test(t.trim())?!!o.closest?.('[class*="pagination" i], [class*="pager" i], [class*="page-nav" i], [class*="step-indicator" i], [class*="breadcrumb" i], [aria-label*="p\xE1gina" i], [aria-label*="page" i], [role="navigation"], nav, [class*="steps" i]'):!1}function nt(o){let e=o.closest("tr");if(e){let d=e.querySelector("th, td:first-child"),l=d&&d!==o.closest("td")?R(d.textContent,100):"",p=R(o.closest("label, td")?.textContent||"",50);if(l&&p)return`${l}: ${p}`}let t=o.closest('.dropdown-row, [class*="dropdown-row" i], [class*="select-row" i]');if(t){let d=t.querySelector('.dropdown-label, [class*="label" i]'),l=d&&d!==o?R(d.textContent,150):"";if(l)return l}let a=o.getAttribute("aria-label");if(a)return R(a);let r=o.getAttribute("aria-labelledby");if(r){let d=r.split(/\s+/).map(l=>document.getElementById(l)?.textContent).filter(Boolean).join(" ");if(d.trim())return R(d)}if("labels"in o&&o.labels){let d=Array.from(o.labels??[]).map(l=>l.textContent).join(" ");if(d.trim())return R(d)}let n=o.closest('.docssharedWizToggleLabeledContainer, [role="listitem"], .answer, label, .quiz-option, .form-check, .option-card');if(n&&n!==o){let d=R(n.textContent);if(d)return d}let s=o instanceof HTMLInputElement||o instanceof HTMLButtonElement?o.value:"",i=o.getAttribute("placeholder")||o.getAttribute("title")||o.textContent||s||"";return R(i)}function it(o,e){let a=typeof HTMLSelectElement<"u"&&o instanceof HTMLSelectElement||o.tagName.toLowerCase()==="select"?o:null,r=o;o.dataset.easyquizRole=e;let n=o.tagName.toLowerCase(),s=["input","textarea","select","button"].includes(n)?n:"other",i=o.getAttribute("role")||"",d=(o.getAttribute("data-testid")||o.getAttribute("data-test-id")||"").toLowerCase(),l=(o.className&&typeof o.className=="string"?o.className:"").toLowerCase(),p=o.getAttribute("draggable")==="true"||o.classList.contains("perseus-drag-item")||o.classList.contains("sortable-item")||l.includes("cursor-grab")||!!o.getAttribute("aria-grabbed")||/drag|card|option|item/i.test(d)||/drag|card-item|sortable/i.test(l),b=o.getAttribute("data-role")==="dropzone"||o.classList.contains("category-container")||o.hasAttribute("data-category")||!!o.getAttribute("aria-dropeffect")||/drop|category|bucket/i.test(d)||/dropzone|category-box|bucket|target-zone/i.test(l),m=R((p?"draggable":b?"dropzone":"")||r.type||i||s,40),u="";if(r.type==="checkbox"||r.type==="radio"||i==="radio"||i==="checkbox"){let w=r.checked||o.getAttribute("aria-checked")==="true",C=r.value&&r.value!=="on"?r.value:o.getAttribute("data-value")||"";u=w?C?`checked:${C}`:"checked":C||"unchecked"}else if(s==="button"||n==="a"||e==="navigation"||J(o))u="";else{let w=typeof o.value=="string"||typeof o.value=="number"?o.value:"";u=R(w||o.getAttribute("data-category")||"",2e3)}let f=[];if(a&&a.options)for(let w of Array.from(a.options).slice(0,80))f.push({value:R(w.value),label:R(w.textContent)});else if(i==="combobox"||i==="listbox"||l.includes("select")||l.includes("dropdown")){let w=o.getAttribute("aria-controls")||o.getAttribute("aria-owns"),C=w?document.getElementById(w):o;if(C){let M=C.querySelectorAll('[role="option"], li, .dropdown-item, .option');for(let S of Array.from(M).slice(0,80)){let x=R(S.textContent);x&&f.push({value:S.getAttribute("data-value")||S.getAttribute("value")||x,label:x})}}}let y=!!(r.required||o.getAttribute("aria-required")==="true"),h=!!(r.disabled||o.getAttribute("aria-disabled")==="true"),g=go(o);return{id:o.id||g,tag:s,type:m,label:nt(o),name:R(r.name||o.getAttribute("name")||"",180),value:u,options:f,required:y,disabled:h,role:e}}var Pt=['[data-test-id*="exercise" i]','[data-testid*="exercise" i]',".perseus-renderer",".framework-perseus",".Qr7Oae","[data-item-id]",".freebirdFormviewerViewItemsItemItem",".que",".question-holder",".quiz-question",".question_holder",".display_question",'[data-functional-selector*="question"]',".question-container",'[class*="classification-layout" i]','[class*="quiz-container" i]','[data-cy="quiz-container"]',"[data-question-id]",'[data-testid*="question" i]','[class*="question-container" i]','[class*="question" i]','[class*="pergunta" i]','[class*="categoriz" i]',"article","form","section","main"].join(",");function zt(o){if(!k(o))return-1/0;let e=o.getBoundingClientRect(),t=Array.from(o.querySelectorAll(we)).filter(k),a=R(o.innerText||o.textContent||"",4e3).length;if(a<10||!t.length&&a<60)return-1/0;let r=Math.max(1,window.innerWidth*window.innerHeight),n=Math.max(1,e.width*e.height),s=Math.min(1,n/r),i=e.top+e.height/2,d=Math.abs(i-window.innerHeight/2)/Math.max(1,window.innerHeight),l=a>40?35:0,p=e.top>=0&&e.bottom<=window.innerHeight?25:0;return t.length*15+Math.min(60,a/20)+l+p-s*20-d*10}function De(o){let e=o;if(e.matches?.('article, [data-test-id*="exercise" i], [data-testid*="exercise" i], .perseus-renderer, .framework-perseus, [class*="question-container" i], .que')&&e.tagName.toLowerCase()!=="main"&&e.tagName.toLowerCase()!=="body")return e;for(;e.parentElement&&e.parentElement!==document.body&&e.parentElement!==document.documentElement;){let t=e.parentElement,a=t.tagName.toLowerCase();if(["header","footer","nav","aside"].includes(a))break;if(t.matches?.('article, [data-test-id*="exercise" i], [data-testid*="exercise" i], .perseus-renderer, .framework-perseus, [class*="question-container" i], .que')&&a!=="main"&&a!=="body"){e=t;break}let r=R(e.innerText||e.textContent||"",1e4),n=R(t.innerText||t.textContent||"",1e4),s=e.querySelectorAll(we).length,i=t.querySelectorAll(we).length;if(r.length<150&&n.length>r.length&&i<=s+4&&a!=="main"&&a!=="body"){e=t;continue}break}return e}function Rt(o){let e=o,t=e.closest('main, [role="main"], article, form, [data-test-id*="exercise" i], [data-testid*="exercise" i], .framework-perseus, section');if(t&&t!==document.body&&k(t))return t;let a=0;for(;e.parentElement&&e.parentElement!==document.body&&a<3;)e=e.parentElement,a++;return e||document.body}function G(){let o=document.querySelector('[class*="classification-layout" i], [class*="quiz-container" i][class*="classification" i]');if(o&&k(o))return o;let e=document.activeElement;if(e&&e!==document.body){let s=e.closest(Pt);if(s&&zt(s)>0)return De(s)}let a=Array.from(document.querySelectorAll(Pt)).map(s=>({element:s,score:zt(s)})).filter(s=>Number.isFinite(s.score)).sort((s,i)=>i.score-s.score),r=a.find(s=>{let i=s.element.tagName.toLowerCase();return i!=="main"&&i!=="body"&&s.score>0});if(r)return De(r.element);if(a.length>0&&a[0].score>0)return De(a[0].element);let n=document.querySelector('form, main, [role="main"]');return n&&k(n)?n:document.body}function Ot(o){let e=o.cloneNode(!0);e.querySelectorAll("script, style, iframe, object, embed, svg, canvas, noscript, audio, video").forEach(a=>a.remove());let t=["type","name","value","role","aria-label","aria-labelledby","aria-checked","aria-required","required","disabled","data-easyquiz-id","draggable","class","id","data-widget-type","data-role","data-category","data-testid"];return e.querySelectorAll("*").forEach(a=>{for(let r of Array.from(a.attributes))t.includes(r.name)||a.removeAttribute(r.name)}),e.outerHTML.replace(/\s+/g," ").slice(0,2e4)}function Be(o){let e=Array.from(o.querySelectorAll(we)),t=new Set,a=[];for(let l of e){if(!k(l)||J(l)||V(l))continue;let p=(l.value||l.textContent||"").trim();if(se.test(p))continue;let b=l.tagName.toLowerCase();["input","textarea","select"].includes(b)&&(t.add(l),a.push(l))}for(let l of e){if(!k(l)||J(l)||V(l))continue;let p=(l.value||l.textContent||"").trim();if(se.test(p))continue;let b=l.tagName.toLowerCase();if(["input","textarea","select"].includes(b))continue;let c=l.querySelector("input, textarea, select");if(!(c&&t.has(c))){if(l.hasAttribute("for")){let m=l.getAttribute("for"),u=m?l.ownerDocument.getElementById(m):null;if(u&&t.has(u))continue}if(b==="a"){let m=l.getAttribute("role"),u=l.getAttribute("class")||"",f=l.getAttribute("data-testid")||"",y=l.getAttribute("draggable")==="true"||l.classList.contains("perseus-drag-item")||l.classList.contains("sortable-item")||u.includes("cursor-grab")||!!l.getAttribute("aria-grabbed")||/drag|card|option|item/i.test(f)||/drag|card-item|sortable/i.test(u);if(!(m==="button"||m==="radio"||m==="checkbox"||m==="option"||y||l.closest('[class*="choice" i], [class*="option" i], [class*="answer" i], [data-testid*="option" i]')))continue}a.push(l)}}let r=a.length>0&&a.every(l=>V(l)||/read-?aloud|audio/i.test(l.getAttribute("data-testid")||l.getAttribute("aria-label")||"")),n=document.body.querySelector('[class*="classification-layout" i]')||document.body.querySelector('[class*="classification" i]')||o,s=document.body.querySelector('[class*="classification" i]')!==null||o.querySelector('[class*="classification" i]')!==null||o.querySelector('[data-cy*="quiz" i]')!==null||o.querySelector('[class*="draggable-item" i]')!==null||o.querySelector('[class*="drag-item" i]')!==null||o.querySelector('[class*="sortable-card" i]')!==null||o.matches?.('[class*="classification" i]');if((a.length===0||r)&&s){r&&(a.length=0);let l=Array.from(n.querySelectorAll('[class*="cursor-grab"][id], [draggable="true"][id], .dnd-card[id]'));if(l.length>0){for(let p of l)if(!(!k(p)||V(p))&&(a.push(p),a.length>=50))break}else{let p=Array.from(n.querySelectorAll("button, div[class], span[class], p, li"));for(let b of p){if(!k(b)||J(b)||V(b)||se.test((b.textContent||"").trim()))continue;let c=(b.textContent||"").trim();if(c.length<2||c.length>300)continue;if(Array.from(b.children).some(u=>u.className&&u.textContent?.trim())||a.push(b),a.length>=50)break}}}let d=!a.some(l=>["input","select","textarea"].includes(l.tagName.toLowerCase()))&&a.length>0&&a.every(l=>{let p=l.tagName.toLowerCase();if(["input","select","textarea","button"].includes(p))return!1;let b=(l.textContent||"").trim();return!l.id||b.length<10||/^\d+\s*\/\s*\d+$/.test(b)||/^question text/i.test(b)});if(a.length===0||d){d&&(a.length=0);let l=Array.from(document.body.querySelectorAll('[class*="cursor-pointer"][id]'));if(l.length>0)for(let p of l){if(!k(p)||le(p)||J(p)||V(p)||se.test((p.textContent||"").trim()))continue;let b=(p.textContent||"").trim();if(!(b.length<10||b.length>500)&&!/^\d+\s*\/\s*\d+$/.test(b)&&(a.push(p),a.length>=20))break}}return a.slice(0,100).map(l=>it(l,"answer"))}function st(o){let e=[o,o.parentElement,o.parentElement?.parentElement,document.body].filter(Boolean),t=new Set,a=[];for(let r of e)for(let n of Array.from(r.querySelectorAll(we)))if(!(t.has(n)||!k(n)||!J(n)||V(n))&&(t.add(n),a.push(it(n,"navigation")),a.length>=10))return a;return a}function be(o=!1){let e=G();e=De(e),o&&(e=Rt(e));let t=Be(e),a=st(e);if(t.length===0){let i=Be(document.body);i.length>0&&(e=Rt(e),t=Be(e),t.length===0&&(t=i,e=document.querySelector('main, article, form, [role="main"]')||document.body))}a.length===0&&(a=st(document.body));let r=e.innerText&&e.innerText.trim().length>0?e.innerText:e.textContent||"",n=r.length>4e4?R(r.slice(0,8e3),8e3)+`
[...conte\xFAdo extenso truncado...]
`+R(r.slice(-2e3),2e3):R(r,16e3),s=[...t,...a].slice(0,120);return!n||s.length===0&&n.length<30?R(document.body.innerText||document.body.textContent||"",16e3).length>=30?ce():null:{sourceUrl:window.location.href.slice(0,2e3),pageTitle:document.title.slice(0,500)||"P\xE1gina de Quest\xE3o",questionText:n,htmlSnippet:Ot(e),controls:s,scope:e}}function ce(){let o=document.body.innerText||document.body.textContent||document.documentElement.textContent||"",e=R(o,16e3),t=Be(document.body),a=st(document.body),r=[...t,...a].slice(0,120),n=document.querySelector('main, article, form, [role="main"], [data-test-id*="content" i], [class*="content" i]')||document.body;return{sourceUrl:window.location.href.slice(0,2e3),pageTitle:document.title.slice(0,500)||"P\xE1gina de Quest\xE3o",questionText:e,htmlSnippet:Ot(n).slice(0,15e3),controls:r,scope:n}}function Nt(o){let e=o.controls.map(t=>`${t.role}:${t.id}:${t.type}`).join("|");return[window.location.href,o.pageTitle,o.questionText.slice(0,400),e].join("::")}function z(o){return o?!!(o.closest('#easyquiz-shadow-root, .eq-sidebar, .eq-launcher, [data-easyquiz-ignore="true"], .btn-inject-eq, #btn-inject-script')||o.getAttribute?.("data-easyquiz-ignore")==="true"):!1}function q(o){return o==null?"":(typeof o=="string"?o:String(o)).replace(/^(\([0-9a-zA-Z]{1,2}\)|[0-9]{1,3}|[a-zA-Z])[\.\)\-\:]\s+/,"").replace(/[\.\u2026]{2,}/g," ").replace(/['"“”«»]/g,"").replace(/\s+/g," ").trim()}function U(o){if(!o||o instanceof HTMLInputElement||o instanceof HTMLSelectElement||o instanceof HTMLTextAreaElement||o.getAttribute("draggable")==="true"||o.classList.contains("dnd-card")||o.hasAttribute("data-category")||o.hasAttribute("data-dropzone"))return o;if(o.hasAttribute("for")){let a=o.getAttribute("for");if(a){let r=o.ownerDocument.getElementById(a);if(r)return r}}let e=o.closest('label, .option-card, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, td, li, .dnd-card, [class*="option-card" i], [class*="choice-card" i], .dropdown-row, [class*="dropdown" i], [class*="select-row" i]');if(e&&!["article","section","main","form","body"].includes(e.tagName.toLowerCase())){let a=e.getAttribute("for"),n=(a?e.ownerDocument.getElementById(a):null)||e.querySelector('input:not([type="hidden"]), select, textarea');return n||e}let t=o.closest('button, a, [role="button"], [draggable="true"]');if(t)return t;if(["body","html","main","section","article","form"].includes(o.tagName.toLowerCase())){let a=o.querySelector('button, [role="button"], a, input:not([type="hidden"]), select, textarea, [role="radio"], [role="checkbox"], .option-card, label');if(a)return U(a)}return o}function Dt(o){let e=o;if(!e||!document.contains(e))try{e=G()}catch{}e=e||document.body;let t=r=>{let n=Array.from(r.querySelectorAll("tr")).filter(p=>k(p)&&p.querySelector('input[type="radio"], input[type="checkbox"]'));if(n.length>1)return n;let s=Array.from(r.querySelectorAll('input[type="checkbox"], input[type="radio"], [role="checkbox"], [role="radio"]')).filter(p=>k(p)&&!z(p));if(s.length>0)return s;let d=Array.from(r.querySelectorAll('.option-card, [role="option"], [class*="choice-card" i], [class*="option-card" i], li[class*="choice" i], li[class*="option" i]')).filter(p=>k(p)&&!z(p)).filter(p=>!p.parentElement?.closest('.option-card, [role="option"], [class*="choice-card" i], [class*="option-card" i]'));return d.length>0?d:Array.from(r.querySelectorAll('[class*="classification" i] [class], [class*="draggable-item" i], [class*="drag-item" i], [class*="sortable-card" i]')).filter(p=>{let b=p;return k(b)&&!z(b)&&(b.textContent||"").trim().length>2&&!J(b)&&!V(b)&&!b.querySelector("[class]")})},a=t(e);return a.length>0?a:e!==document.body?t(document.body):[]}function I(o,e,t=!1){if(o==null)return null;let r=(typeof o=="string"?o:String(o)).trim().replace(/^["'“”«»]+|["'“”«»]+$/g,"");if(!r)return null;let n=B(r),s=document.querySelector(`[data-easyquiz-id="${n}"]`);if(s&&!z(s))return U(s);try{let c=document.getElementById(r);if(c&&k(c)&&!z(c))return c.hasAttribute("data-category")||c.hasAttribute("data-dropzone")||c.classList.contains("dnd-zone")?c:U(c)}catch{}try{let c=document.querySelector(`[data-item-id="${n}"]`);if(c&&k(c)&&!z(c))return U(c)}catch{}let i=r.match(/^(?:item|opção|opcao|afirmação|afirmacao|alternativa|linha|afirmativa|questão|questao|campo|blank|lacuna|input|resposta)?\s*#?_?([0-9]+)$/i);if(i){let c=parseInt(i[1],10);if(t){let u=document.body;try{u=G()||document.body}catch{}let f=Array.from(u.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, select, [contenteditable="true"]')).filter(y=>k(y)&&!z(y));if(c>=1&&c-1<f.length)return f[c-1];if(c===0&&f.length>0)return f[0]}let m=c-1;if(m>=0){let u=Dt();if(m<u.length){let h=u[m];if(h.tagName.toLowerCase()==="tr"){if(e){let v=h.querySelector(`input[value="${B(e)}" i], [data-value="${B(e)}" i]`);if(v)return v}let g=h.querySelector("input");if(g)return g}return U(h)}let f=document.body;try{f=G()||document.body}catch{}let y=Array.from(f.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, select, [contenteditable="true"]')).filter(h=>k(h)&&!z(h));if(m<y.length)return y[m]}}let d=r.match(/^(?:item|opção|opcao|afirmação|afirmacao|alternativa|linha|afirmativa|questão|questao)?\s*#?([a-eA-E])$/i);if(d){let c=d[1].toUpperCase().charCodeAt(0)-65;if(c>=0){let m=Dt();if(c<m.length){let u=m[c];if(u.tagName.toLowerCase()==="tr"){if(e){let y=u.querySelector(`input[value="${B(e)}" i], [data-value="${B(e)}" i]`);if(y)return y}let f=u.querySelector("input");if(f)return f}return U(u)}}}if(/^[a-zA-Z0-9_-]{1,10}$/.test(r)){let m=Array.from(document.querySelectorAll(`[data-category="${n}" i], [data-dropzone="${n}" i], [data-role="dropzone"][data-category="${n}" i]`)).find(h=>k(h)&&!z(h));if(m)return m;let f=Array.from(document.querySelectorAll(`input[value="${n}" i], [data-value="${n}" i], input[id="${n}" i], input[placeholder="${n}" i], textarea[placeholder="${n}" i], [title="${n}" i]`)).find(h=>k(h)&&!z(h));if(f)return U(f);let y=Array.from(document.querySelectorAll('.option-badge, [class*="badge" i], [class*="letter" i], .option-card span, label span')).find(h=>{if(!k(h)||z(h))return!1;let g=q(h.textContent).toLowerCase();return g===r.toLowerCase()||g===r.toLowerCase()+")"});if(y)return U(y)}try{let c=Array.from(document.querySelectorAll(`[name="${n}"], [value="${n}"], [placeholder="${n}" i], [title="${n}" i], [data-category="${n}" i], [data-dropzone="${n}" i], [data-testid="${n}" i], [data-test-id="${n}" i], [aria-label="${n}" i]`));if(e){let u=c.find(f=>{if(!k(f)||z(f))return!1;if(f instanceof HTMLInputElement&&f.value.toLowerCase()===e.toLowerCase())return!0;let y=f.closest("label, .vf-label, td, div");return y&&q(y.textContent).toLowerCase().includes(q(e).toLowerCase())});if(u)return U(u)}let m=c.find(u=>k(u)&&!z(u));if(m)return m.hasAttribute("data-category")||m.hasAttribute("data-dropzone")||m.classList.contains("dnd-zone")?m:U(m)}catch{}if(/^[.#\[]|\s|[>+~:]/.test(r))try{let m=Array.from(document.querySelectorAll(r)).find(u=>k(u)&&!z(u));if(m)return U(m)}catch{}try{let c=r.replace(/"/g,""),m=`//button[normalize-space(.)="${c}"] | //a[normalize-space(.)="${c}"] | //*[not(*) and normalize-space(.)="${c}"] | //*[@aria-label="${c}"] | //*[@data-category="${c}"] | //*[@data-testid="${c}"]`,u=document.evaluate(m,document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);for(let f=0;f<u.snapshotLength;f++){let y=u.snapshotItem(f);if(y&&k(y)&&!z(y)){if(["body","html"].includes(y.tagName.toLowerCase())){let g=y.querySelector('button, [role="button"], a, input, [role="radio"], [role="checkbox"], label');if(g&&k(g))return U(g)}return y.closest('[data-role="dropzone"], [class*="category" i], [class*="bucket" i], [class*="column" i], [class*="drop" i]')||U(y)}}}catch{}let p=q(r).toLowerCase(),b=Array.from(document.querySelectorAll('button, a, div, span, li, p, label, input, textarea, select, [draggable="true"], [data-testid], [class*="option" i], [class*="card" i], [class*="item" i], [class*="choice" i], [class*="category" i], [class*="bucket" i]'));for(let c of b){if(!k(c)||z(c)||c.closest("header, nav, .stepper, .step-item, .progress-bar-container")||V(c)||!!(c.matches('article, section, form, main, [class*="container" i], [class*="grid" i], .dnd-pool, .dnd-zones')||c.querySelector('label, [role="radio"], [role="checkbox"], .dnd-card, [draggable="true"], .option-card, tr'))&&!c.matches(".dnd-zone, [data-category], [data-dropzone]"))continue;let u=q(c.textContent).toLowerCase(),f=q(c.getAttribute("aria-label")||"").toLowerCase(),y=q(c.getAttribute("placeholder")||"").toLowerCase(),h=q(c.getAttribute("title")||"").toLowerCase(),g=q(c.getAttribute("name")||"").toLowerCase(),v=q(c.getAttribute("data-category")||"").toLowerCase(),w=c instanceof HTMLInputElement||c instanceof HTMLButtonElement?c.value:"",C=q(w).toLowerCase(),M=u.startsWith(p+")")||u.startsWith(p+".")||u.startsWith(p+" -")||u.startsWith(p+":");if(u===p||f===p||y===p||h===p||g===p||v&&v===p||C&&C===p||M)return c.closest('[data-role="dropzone"], [class*="category" i], [class*="bucket" i], [class*="column" i], [class*="drop" i]')||U(c)}if(p.length>=3)for(let c of b){if(!k(c)||z(c)||c.closest("header, nav, .stepper, .step-item, .progress-bar-container")||V(c)||!!(c.matches('article, section, form, main, [class*="container" i], [class*="grid" i], .dnd-pool, .dnd-zones')||c.querySelector('label, [role="radio"], [role="checkbox"], .dnd-card, [draggable="true"], .option-card, tr'))&&!c.matches(".dnd-zone, [data-category], [data-dropzone]"))continue;let u=q(c.textContent).toLowerCase(),f=q(c.getAttribute("aria-label")||"").toLowerCase(),y=q(c.getAttribute("placeholder")||"").toLowerCase(),h=q(c.getAttribute("title")||"").toLowerCase(),g=q(c.getAttribute("name")||"").toLowerCase();if(u.includes(p)||f.includes(p)||y.includes(p)||h.includes(p)||g.includes(p)){if(Array.from(c.children).some(M=>{let S=q(M.textContent).toLowerCase();return S&&S.includes(p)}))continue;return c.closest('[data-role="dropzone"], [class*="category" i], [class*="bucket" i], [class*="column" i], [class*="drop" i]')||U(c)}let v=p.split(/\s+/).filter(Boolean);if(v.length>=3){let w=v.slice(0,Math.min(5,v.length)).join(" ");if(u.includes(w)||f.includes(w)||y.includes(w))return U(c)}}return null}function Bt(o,e){for(let t of e)o.dispatchEvent(new Event(t,{bubbles:!0,composed:!0}))}function te(o,e){if(!o)return;try{o.scrollIntoView({block:"nearest",inline:"nearest",behavior:"instant"})}catch{}try{o.focus?.()}catch{}let t=o.getBoundingClientRect(),a=e?e[0]:Math.round(t.left+Math.max(1,t.width/2)),r=e?e[1]:Math.round(t.top+Math.max(1,t.height/2)),n={bubbles:!0,cancelable:!0,composed:!0,view:window,clientX:a,clientY:r};try{o.dispatchEvent(new PointerEvent("pointerover",{...n}))}catch{}try{o.dispatchEvent(new MouseEvent("mouseover",{...n}))}catch{}try{o.dispatchEvent(new PointerEvent("pointerdown",{...n,button:0,buttons:1}))}catch{}try{o.dispatchEvent(new MouseEvent("mousedown",{...n,button:0,buttons:1}))}catch{}try{o.dispatchEvent(new PointerEvent("pointerup",{...n,button:0,buttons:0}))}catch{}try{o.dispatchEvent(new MouseEvent("mouseup",{...n,button:0,buttons:0}))}catch{}if(typeof o.click=="function")try{o.click()}catch{try{o.dispatchEvent(new MouseEvent("click",{...n,button:0,buttons:0}))}catch{}}else try{o.dispatchEvent(new MouseEvent("click",{...n,button:0,buttons:0}))}catch{}try{let s=Object.keys(o).find(i=>i.startsWith("__reactFiber")||i.startsWith("__reactInternalInstance"));if(s){let i=o[s];for(;i;){let d=i.memoizedProps||i.pendingProps;if(d?.onClick){d.onClick({type:"click",target:o,currentTarget:o,bubbles:!0,cancelable:!0,preventDefault:()=>{},stopPropagation:()=>{}});break}i=i.return}}}catch{}try{let s=Object.keys(o).find(i=>i.startsWith("__reactProps"));if(s){let i=o[s];i?.onClick&&i.onClick({type:"click",target:o,currentTarget:o,bubbles:!0,cancelable:!0,preventDefault:()=>{},stopPropagation:()=>{}})}}catch{}try{let s=o._vei;s?.onClick&&(Array.isArray(s.onClick.value)?s.onClick.value:[s.onClick.value]).forEach(d=>{try{d({type:"click",target:o})}catch{}})}catch{}try{o.$onclick&&o.$onclick({type:"click",target:o,preventDefault:()=>{},stopPropagation:()=>{}})}catch{}try{if(!!(document.querySelector('meta[content*="google.com/forms"], form[action*="formResponse"]')||o.closest("[data-item-id], [jsmodel], [jsaction], .freebirdFormviewerComponentsQuestionBaseRoot"))){let i=o.querySelector('input[type="radio"], input[type="checkbox"]');i&&(i.focus?.(),i.click(),Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"checked")?.set?.call(i,!0),i.dispatchEvent(new Event("change",{bubbles:!0})));let d=o.closest("[jsaction]");if(d&&d!==o)try{d.dispatchEvent(new MouseEvent("click",{bubbles:!0,cancelable:!0,view:window,clientX:a,clientY:r}))}catch{}}}catch{}if(o.getAttribute("role")==="button"||o.getAttribute("tabindex")!==null)try{o.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0,cancelable:!0})),o.dispatchEvent(new KeyboardEvent("keyup",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0,cancelable:!0}))}catch{}}function ct(o){try{let e=o.id,t=!!e;e||(e=`__eq_tmp_${Math.random().toString(36).slice(2,8)}`,o.id=e);let a=document.createElement("script");return a.textContent=`(function(){var el=document.getElementById(${JSON.stringify(e)});if(el){el.dispatchEvent(new MouseEvent('click',{bubbles:true,cancelable:true,composed:true,view:window}));if(typeof el.click==='function')el.click();var fk=Object.keys(el).find(function(k){return k.startsWith('__reactFiber')||k.startsWith('__reactInternalInstance');});if(fk){var fb=el[fk];while(fb){var mp=fb.memoizedProps||fb.pendingProps;if(mp&&typeof mp.onClick==='function'){try{mp.onClick({type:'click',target:el,currentTarget:el,bubbles:true,cancelable:true,preventDefault:function(){},stopPropagation:function(){}});}catch(e){}break;}fb=fb.return;}}var pk=Object.keys(el).find(function(k){return k.startsWith('__reactProps');});if(pk&&el[pk]&&typeof el[pk].onClick==='function'){try{el[pk].onClick({type:'click',target:el,currentTarget:el,bubbles:true,cancelable:true,preventDefault:function(){},stopPropagation:function(){}});}catch(e){}}if(el._vei&&el._vei.onClick){var h=el._vei.onClick.value;var hs=Array.isArray(h)?h:[h];hs.forEach(function(fn){try{fn({type:'click',target:el});}catch(e){}});}}})()`,document.head.appendChild(a),a.remove(),t||setTimeout(()=>{try{o.id===e&&o.removeAttribute("id")}catch{}},0),!0}catch{return!1}}function Ve(o,e){let t=o;if(t.hasAttribute("for")){let l=t.getAttribute("for"),p=t.ownerDocument.getElementById(l);p&&(t=p)}if(typeof HTMLSelectElement<"u"&&t instanceof HTMLSelectElement||t.tagName?.toLowerCase()==="select"||t.getAttribute("role")==="combobox"||t.getAttribute("role")==="listbox"||t.matches?.('[role="combobox"], [role="listbox"], [class*="select" i], [class*="dropdown" i]')){_e(t,[e]);return}let r=t.querySelector('select, [role="combobox"], [role="listbox"]');if(r){_e(r,[e]);return}if(!(t instanceof HTMLInputElement)&&!(t instanceof HTMLTextAreaElement)&&!(t instanceof HTMLSelectElement)&&!t.isContentEditable){let l=t.querySelector('input:not([type="hidden"]), textarea, select, [contenteditable="true"]');if(l)t=l;else{let b=t.closest('.form-group, .field, [class*="input" i], [class*="control" i], label, tr, td, li, p, div')?.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, select, [contenteditable="true"]');if(b)t=b;else{let c=t.nextElementSibling;for(;c;){if(c instanceof HTMLInputElement&&!["hidden","button","submit","checkbox","radio"].includes(c.type)||c instanceof HTMLTextAreaElement||c instanceof HTMLElement&&c.isContentEditable){t=c;break}let m=c.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(m){t=m;break}c=c.nextElementSibling}}}}if(t instanceof HTMLButtonElement||t.tagName.toLowerCase()==="a"||t.getAttribute("role")==="button"||t instanceof HTMLInputElement&&["button","submit","reset","image"].includes(t.type)){let l=t.parentElement?.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(l)t=l;else{let p=document.body;try{p=G()||document.body}catch{}let b=p.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(b)t=b;else{console.warn("[EasyQuiz] setNativeValue: Nenhum campo de texto encontrado para receber o valor.");return}}}if(!(t instanceof HTMLInputElement)&&!(t instanceof HTMLTextAreaElement)&&!(t instanceof HTMLSelectElement)&&!t.isContentEditable){let l=document.body;try{l=G()||document.body}catch{}let p=l.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(p)t=p;else{console.warn("[EasyQuiz] setNativeValue: Nenhum campo de texto encontrado para receber o valor.");return}}if(t instanceof HTMLInputElement&&["checkbox","radio"].includes(t.type)){let l=["true","1","checked","yes","sim"].includes(e.toLowerCase())||e===t.value;de(t,l);return}let s=String(e??""),i=s;if(t instanceof HTMLInputElement&&t.type==="number"){let l=s.replace(",",".").replace(/[^0-9.-]/g,"");l&&!isNaN(Number(l))&&(i=l)}try{t.scrollIntoView?.({block:"center",inline:"center",behavior:"instant"}),t.focus?.()}catch{}try{if(t instanceof HTMLInputElement||t instanceof HTMLTextAreaElement){let l=t instanceof HTMLTextAreaElement?HTMLTextAreaElement.prototype:HTMLInputElement.prototype,p=Object.getOwnPropertyDescriptor(l,"value")?.set;p?p.call(t,""):t.value="";try{t.select?.()}catch{}}else if(t.isContentEditable){t.textContent="";try{document.execCommand?.("selectAll",!1,void 0)}catch{}}}catch{}let d=!1;try{t instanceof HTMLInputElement||t instanceof HTMLTextAreaElement?t.type!=="number"&&t.type!=="range"&&(d=document.execCommand?.("insertText",!1,i)||!1):t.isContentEditable&&(d=document.execCommand?.("insertText",!1,i)||!1)}catch{}if(t instanceof HTMLInputElement||t instanceof HTMLTextAreaElement){try{let b=t._valueTracker;b&&b.setValue(i===""?" ":"")}catch{}let l=t instanceof HTMLTextAreaElement?HTMLTextAreaElement.prototype:HTMLInputElement.prototype,p=Object.getOwnPropertyDescriptor(l,"value")?.set;p?p.call(t,i):t.value=i;try{t.dispatchEvent(new KeyboardEvent("keydown",{bubbles:!0,cancelable:!0,key:i.slice(-1)||"a"}))}catch{}try{t.dispatchEvent(new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,composed:!0,data:i,inputType:"insertText"}))}catch{}try{t.dispatchEvent(new InputEvent("input",{bubbles:!0,cancelable:!0,composed:!0,data:i,inputType:"insertText"}))}catch{t.dispatchEvent(new Event("input",{bubbles:!0,cancelable:!0,composed:!0}))}try{t.dispatchEvent(new KeyboardEvent("keyup",{bubbles:!0,cancelable:!0,key:i.slice(-1)||"a"}))}catch{}try{t.dispatchEvent(new Event("change",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}try{t.dispatchEvent(new FocusEvent("blur",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}if(t.value!==i&&!(t instanceof HTMLInputElement&&t.type==="number"&&Number(t.value)===Number(i))){t.value=i;try{p?.call(t,i)}catch{}}return}if(t.isContentEditable){if(t.textContent?.trim()!==i.trim()){t.textContent=i;try{t.innerText=i}catch{}}try{t.dispatchEvent(new InputEvent("input",{bubbles:!0,cancelable:!0,composed:!0,data:i,inputType:"insertText"}))}catch{t.dispatchEvent(new Event("input",{bubbles:!0,cancelable:!0,composed:!0}))}try{t.dispatchEvent(new Event("change",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}try{t.dispatchEvent(new FocusEvent("blur",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}return}try{"value"in t&&(t.value=i),t.dispatchEvent(new Event("input",{bubbles:!0,cancelable:!0,composed:!0})),t.dispatchEvent(new Event("change",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}}function Ie(o,e=""){if(o==null)return e;let t=typeof o=="string"?o:String(o);if(!t)return e;let a=/^(eq-|#|\$|\.|input_|mat-|choice_|radio_|chk_)/i.test(t),r=q(t),n=I(t)||I(r);if(!n)return a?e:r||e;let s=n.closest('label, .option-card, [class*="choice" i], [class*="option" i], .quiz-option, tr, td, li');if(s){let b=q(s.textContent);if(b&&b.length>0&&b.length<150)return b}if(n.id){let b=document.querySelector(`label[for="${B(n.id)}"]`);if(b){let c=q(b.textContent);if(c&&c.length>0&&c.length<150)return c}}let i=n.getAttribute("aria-label");if(i)return q(i);let d=n.getAttribute("placeholder");if(d)return q(d);let l=q(n.textContent);if(l&&l.length>0&&l.length<120)return l;let p=n instanceof HTMLInputElement||n instanceof HTMLButtonElement?n.value:"";return p?q(p):a?e:r||e}function de(o,e){if(!o)return;let t=o.closest('label, td, .option-card, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, [class*="option" i], [class*="choice" i], li')||o,a=o instanceof HTMLInputElement&&["checkbox","radio"].includes(o.type)?o:t.querySelector('input[type="checkbox"], input[type="radio"]');!a&&t.hasAttribute("for")&&(a=t.ownerDocument.getElementById(t.getAttribute("for")));let r=o instanceof HTMLInputElement?o.closest("label")||(o.id?t.ownerDocument.getElementById(t.getAttribute("for")):null)||o:t&&k(t)?t:o;if(a){let n=a.type==="radio",s=a.type==="checkbox",i=!!a._valueTracker;if(a.checked===e){if(n&&e){t.setAttribute("aria-checked","true"),t.setAttribute("aria-selected","true"),t.classList.add("selected","active","checked");return}if(s){t.setAttribute("aria-checked",e?"true":"false"),t.setAttribute("aria-selected",e?"true":"false"),t.classList.toggle("selected",e),t.classList.toggle("active",e),t.classList.toggle("checked",e);return}}if(r&&r!==a&&te(r),a.checked!==e)try{a.focus?.(),a.click()}catch{}if(a.checked!==e){try{let l=a._valueTracker;l&&l.setValue(!e)}catch{}try{Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"checked")?.set?.call(a,e)}catch{}a.checked=e,Bt(a,["input","change"])}t.setAttribute("aria-checked",e?"true":"false"),t.setAttribute("aria-selected",e?"true":"false"),t.classList.toggle("selected",e),t.classList.toggle("active",e),t.classList.toggle("checked",e)}else{if((t.getAttribute("aria-checked")==="true"||t.getAttribute("aria-selected")==="true"||t.getAttribute("data-selected")==="true"||t.getAttribute("data-checked")==="true"||t.classList.contains("selected")||t.classList.contains("active")||t.classList.contains("checked"))===e&&e)return;te(r),t.setAttribute("aria-checked",e?"true":"false"),t.setAttribute("aria-selected",e?"true":"false"),t.classList.toggle("selected",e),t.classList.toggle("active",e),t.classList.toggle("checked",e)}}function _e(o,e){let t=typeof HTMLSelectElement<"u"&&o instanceof HTMLSelectElement||o.tagName?.toLowerCase()==="select"?o:o.querySelector("select");if(t){let s=e.map(l=>q(l).toLowerCase()),i=!1,d=(l,p)=>{l.selected=!0,t.selectedIndex=p;try{t.value=l.value}catch{}try{Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype,"value")?.set?.call(t,l.value)}catch{}try{let b=t._valueTracker;b&&b.setValue(l.value)}catch{}i=!0};for(let l=0;l<t.options.length;l++){let p=t.options[l],b=p.value.toLowerCase(),c=q(p.textContent).toLowerCase();if(s.some(u=>u===b||u===c)){if(d(p,l),!t.multiple)break}else t.multiple||(p.selected=!1)}if(!i)for(let l of s){let p=l.match(/^(?:item|opção|opcao|alternativa|linha|escolha|campo)?\s*#?_?([0-9]+)$/i);if(p){let b=parseInt(p[1],10),m=t.options[0]?.value===""||t.options[0]?.disabled?b:b>=1?b-1:0;if(m>=0&&m<t.options.length&&(d(t.options[m],m),!t.multiple))break}}if(!i){for(let l of s)if(/^[a-z]$/i.test(l)){let p=l.toUpperCase().charCodeAt(0)-65,c=t.options[0]?.value===""||t.options[0]?.disabled?p+1:p;if(c>=0&&c<t.options.length&&(d(t.options[c],c),!t.multiple))break}}if(!i){let l=p=>p.normalize("NFD").replace(/[\u0300-\u036f]/g,"");for(let p=0;p<t.options.length;p++){let b=t.options[p],c=l(b.value.toLowerCase()),m=l(q(b.textContent).toLowerCase());if(s.some(f=>{let y=l(f);return c.includes(y)||m.includes(y)||y.length>2&&(y.includes(c)||y.includes(m))})&&(d(b,p),!t.multiple))break}}if(i){Bt(t,["focus","input","change","blur"]);return}}let a=o.matches?.('[role="combobox"], [role="listbox"], [class*="select" i], [class*="dropdown" i]')?o:o.closest('[role="combobox"], [role="listbox"], [class*="select" i], [class*="dropdown" i]');a&&te(a);let r=e.map(s=>q(s).toLowerCase()),n=Array.from(document.querySelectorAll('[role="listbox"] [role="option"], [role="menu"] [role="menuitem"], .select-dropdown li, .dropdown-menu .dropdown-item, .ant-select-item-option, .MuiMenuItem-root, [class*="option-item"], li[data-value]')).filter(s=>k(s)&&!z(s));for(let s of r){let i=n.find(l=>{let p=q(l.textContent).toLowerCase(),b=q(l.getAttribute("data-value")||l.getAttribute("value")||"").toLowerCase();return p===s||b===s||p.includes(s)||s.length>2&&s.includes(p)});if(i){te(i);let l=i.querySelector('input[type="radio"], input[type="checkbox"]');l&&de(l,!0);return}let d=I(s);if(d){te(d);return}}}function fo(o,e){try{let t=new DataTransfer;try{t.setData("text/plain",o)}catch{}try{t.setData("text/html",e)}catch{}return t}catch{return null}}function rt(o){try{o.click()}catch{let e=o.ownerDocument.defaultView||window;o.dispatchEvent(new e.MouseEvent("click",{bubbles:!0,cancelable:!0,composed:!0,view:e}))}}function bo(o,e,t){try{if(e.contains(o))return{success:!0,evidence:"origin is child of dest (DOM move confirmed)"};if(!document.body.contains(o))return{success:!0,evidence:"origin removed from DOM (consumed by framework)"};let a=e.children.length;if(t!==void 0&&a>t)return{success:!0,evidence:`dest child count increased: ${t} \u2192 ${a}`};if([o.getAttribute("data-placed")==="true",o.getAttribute("data-assigned")==="true",o.getAttribute("data-matched")==="true",o.getAttribute("aria-grabbed")==="false",/placed|dropped|assigned|matched|done|sorted|categorized/i.test(o.className||"")].some(Boolean))return{success:!0,evidence:"origin has placement indicator: class/attr"};let n=(o.textContent||"").trim().toLowerCase();return n.length>2&&Array.from(e.querySelectorAll("*")).some(d=>d!==e&&(d.textContent||"").trim().toLowerCase()===n)?{success:!0,evidence:"origin text found inside dest children (clone or DOM move)"}:e.getAttribute("data-count")&&parseInt(e.getAttribute("data-count")||"0")>0?{success:!0,evidence:"dest data-count > 0, categorization likely succeeded"}:o.getAttribute("aria-hidden")==="true"||o.style.display==="none"||o.style.visibility==="hidden"?{success:!0,evidence:"origin hidden after drop (framework confirmed placement)"}:{success:!1,evidence:"no DOM evidence of successful drag/categorization"}}catch{return{success:!1,evidence:"verification threw exception"}}}function ee(o,e){let t=q(o).toLowerCase();if(!t)return null;if(e==="source"){if(/^[0-9a-f]{10,}$/.test(o.trim())){let i=document.getElementById(o.trim());if(i&&k(i)&&!z(i))return i}let s=['[class*="cursor-grab"][id]',".dnd-card",'[draggable="true"]'];for(let i of s){let l=Array.from(document.querySelectorAll(i)).find(p=>{if(!k(p)||z(p))return!1;let b=q(`${p.id} ${p.textContent||""} ${p.getAttribute("data-id")||""}`).toLowerCase();return b===t||b.includes(t)||p.id===o.trim()});if(l)return l}return null}let a=["[data-dropzone]","[data-category]",'[data-role="dropzone"]','[class*="dropzone" i]','[class*="list-group" i]','[class*="classification-group" i]'].join(","),r=Array.from(document.querySelectorAll(a)),n=r.find(s=>[s.getAttribute("data-category"),s.getAttribute("data-dropzone")].some(i=>i?.trim().toLowerCase()===t));return n&&k(n)&&!z(n)?n:r.find(s=>{if(!k(s)||z(s)||/unclassified/i.test(s.className))return!1;let i=s.querySelector('.font-bold, h1, h2, h3, h4, [class*="header" i], [class*="title" i], [class*="label" i]'),d=q(i?.textContent||s.textContent||"").toLowerCase();return d.includes("op")&&(d.includes("es")||d.includes("\xF5es"))?!1:d===t||d.startsWith(t)||d.includes(t)})||null}async function Ke(o,e,t=1){try{o.scrollIntoView({block:"center",inline:"center",behavior:"instant"})}catch{}let a=o.getBoundingClientRect(),r=e.getBoundingClientRect(),n=Math.round(a.left+Math.max(1,a.width/2)),s=Math.round(a.top+Math.max(1,a.height/2)),i=Math.round(r.left+Math.max(1,r.width/2)),d=Math.round(r.top+Math.max(1,r.height/2)),l=q(e.textContent).toLowerCase();if(l){let f=Array.from(o.querySelectorAll('button, [role="button"], input[type="radio"], input[type="checkbox"], option, .btn, [class*="tag" i]')).find(y=>{let h=q(y.textContent).toLowerCase(),g=y instanceof HTMLInputElement||y instanceof HTMLOptionElement?q(y.value).toLowerCase():"";return h&&(l.includes(h)||h.includes(l))||g&&(l.includes(g)||g.includes(l))});f&&(te(f),await new Promise(y=>setTimeout(y,120)))}rt(o),await new Promise(u=>setTimeout(u,140)),rt(e);let p=e.querySelector('[data-role="dropzone"], [class*="bucket" i], [class*="slot" i], [class*="drop" i], [class*="target" i], [class*="items" i], ul, ol');if(p&&p!==e&&rt(p),await new Promise(u=>setTimeout(u,100)),!e.contains(o)&&o.matches('.dnd-card, [draggable="true"]')&&e.matches('.dnd-zone, [data-dropzone], [data-role="dropzone"]')&&e.appendChild(o),e.contains(o)&&o.matches('.dnd-card, [draggable="true"]'))return;let b={bubbles:!0,cancelable:!0,composed:!0,view:window,clientX:n,clientY:s,screenX:n,screenY:s,button:0,buttons:1};try{o.dispatchEvent(new PointerEvent("pointerdown",{...b,isPrimary:!0,pointerId:1,pointerType:"mouse",pressure:.5}))}catch{}o.dispatchEvent(new MouseEvent("mousedown",b));let c=4;for(let u=1;u<=c;u++){let f=Math.round(n+(i-n)*(u/c)),y=Math.round(s+(d-s)*(u/c)),h={...b,clientX:f,clientY:y,screenX:f,screenY:y};try{o.dispatchEvent(new PointerEvent("pointermove",{...h,isPrimary:!0,pointerId:1,pointerType:"mouse",pressure:.5}))}catch{}document.dispatchEvent(new MouseEvent("mousemove",h))}let m={bubbles:!0,cancelable:!0,composed:!0,view:window,clientX:i,clientY:d,screenX:i,screenY:d,button:0,buttons:0};try{e.dispatchEvent(new PointerEvent("pointerup",{...m,isPrimary:!0,pointerId:1,pointerType:"mouse",pressure:0}))}catch{}e.dispatchEvent(new MouseEvent("mouseup",m)),e.dispatchEvent(new MouseEvent("click",m));try{let u=fo(R(o.textContent),o.outerHTML),f={...b},y={...m};u&&(f.dataTransfer=u,y.dataTransfer=u);let h=o.ownerDocument.defaultView?.DragEvent;if(!h)throw new Error("DragEvent n\xE3o dispon\xEDvel neste documento");o.dispatchEvent(new h("dragstart",f)),e.dispatchEvent(new h("dragenter",y)),e.dispatchEvent(new h("dragover",y)),e.dispatchEvent(new h("drop",y)),o.dispatchEvent(new h("dragend",f))}catch(u){console.warn("[EasyQuiz] DragEvent ignorado com seguran\xE7a:",u)}try{let u=new Touch({identifier:1,target:o,clientX:n,clientY:s}),f=new Touch({identifier:1,target:e,clientX:i,clientY:d});o.dispatchEvent(new TouchEvent("touchstart",{bubbles:!0,cancelable:!0,touches:[u]})),e.dispatchEvent(new TouchEvent("touchmove",{bubbles:!0,cancelable:!0,touches:[f]})),e.dispatchEvent(new TouchEvent("touchend",{bubbles:!0,cancelable:!0,touches:[]}))}catch{}if(t>=2&&!e.contains(o))try{o.focus?.(),o.dispatchEvent(new KeyboardEvent("keydown",{key:" ",code:"Space",bubbles:!0})),o.dispatchEvent(new KeyboardEvent("keyup",{key:" ",code:"Space",bubbles:!0})),await new Promise(u=>setTimeout(u,80)),e.focus?.(),e.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",bubbles:!0})),e.dispatchEvent(new KeyboardEvent("keyup",{key:"Enter",code:"Enter",bubbles:!0}))}catch{}if(!e.contains(o))try{let u=h=>{let g=Object.keys(h).find(w=>w.startsWith("__reactFiber")||w.startsWith("__reactInternalInstance"));if(!g)return null;let v=h[g];for(let w=0;w<10&&v;w++){if(v.memoizedProps)return v.memoizedProps;v=v.return}return null},f=u(o),y=u(e);if(f){let h=f.onMouseDown||f.onPointerDown||f.onDragStart;if(typeof h=="function")try{h({type:"mousedown",button:0,buttons:1,clientX:n,clientY:s,bubbles:!0,preventDefault:()=>{},stopPropagation:()=>{},currentTarget:o,target:o}),await new Promise(g=>setTimeout(g,100))}catch{}}if(y){let h=y.onMouseUp||y.onPointerUp||y.onDrop;if(typeof h=="function")try{h({type:"mouseup",button:0,buttons:0,clientX:i,clientY:d,bubbles:!0,preventDefault:()=>{},stopPropagation:()=>{},currentTarget:e,target:e})}catch{}}try{o.focus?.(),o.dispatchEvent(new KeyboardEvent("keydown",{key:" ",code:"Space",keyCode:32,bubbles:!0,cancelable:!0})),await new Promise(g=>setTimeout(g,200));let h=d>s?"ArrowDown":"ArrowUp";for(let g=0;g<3;g++)document.dispatchEvent(new KeyboardEvent("keydown",{key:h,bubbles:!0,cancelable:!0})),await new Promise(v=>setTimeout(v,60));document.dispatchEvent(new KeyboardEvent("keydown",{key:" ",code:"Space",keyCode:32,bubbles:!0,cancelable:!0})),await new Promise(g=>setTimeout(g,80))}catch{}try{!!document.querySelector("[data-rbd-draggable-id], [data-rbd-droppable-id], [data-dnd-kit-sortable]")&&(o.dispatchEvent(new CustomEvent("dndkitdragstart",{bubbles:!0,cancelable:!0,detail:{id:o.id||o.getAttribute("data-id")}})),await new Promise(g=>setTimeout(g,100)),e.dispatchEvent(new CustomEvent("dndkitdrop",{bubbles:!0,cancelable:!0,detail:{overId:e.id||e.getAttribute("data-id")}})))}catch{}}catch(u){console.warn("[EasyQuiz] Estrat\xE9gia G (React DnD internals) falhou:",u)}}function Vt(o,e,t,a){let r=l=>l.replace(/\\/g,"\\\\").replace(/'/g,"\\'").replace(/"/g,'\\"').slice(0,100),n=r(o.toLowerCase()),s=r(e.toLowerCase()),i=r(t),d=r(a);return`var src=$eq.find('${i}')||Array.from(document.querySelectorAll('[draggable],[class*="cursor-grab"],[class*="dnd-card"]')).find(function(e){return (e.textContent||'').toLowerCase().includes('${n}');});var dst=Array.from(document.querySelectorAll('[class*="list-group"],[class*="dropzone"],[data-category],[data-rbd-droppable-id]')).find(function(e){var h=e.querySelector('.font-bold,h1,h2,h3,h4,[class*="header"]');var t=(h||e);return (t.textContent||'').toLowerCase().includes('${s}');});if(src&&dst){dst.appendChild(src);[src,dst].forEach(function(el){try{el.dispatchEvent(new Event('change',{bubbles:true}));}catch(e){}try{el.dispatchEvent(new CustomEvent('dndkitdrop',{bubbles:true,detail:{}}));}catch(e){}});}else{console.warn('[EQ-drag-fallback] nao localizado: ${n} -> ${s}');}`}var _t={fill:(o,e)=>{let t=I(o);t?Ve(t,e):console.warn(`$eq.fill: Elemento '${o}' n\xE3o encontrado`)},click:o=>{let e=I(o);e?!!(e.closest('.option-card, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, [class*="option" i], [class*="choice" i]')||e.querySelector('input[type="radio"], input[type="checkbox"]')||e instanceof HTMLInputElement&&["checkbox","radio"].includes(e.type))?de(e,!0):te(e):console.warn(`$eq.click: Elemento '${o}' n\xE3o encontrado`)},check:(o,e)=>{let t=I(o);t?de(t,e):console.warn(`$eq.check: Elemento '${o}' n\xE3o encontrado`)},find:(o,e)=>I(o,e),drag:(o,e)=>{let t=ee(o,"source")||I(o),a=ee(e,"destination")||I(e);t&&a?Ke(t,a):console.warn(`$eq.drag: Origem ou destino n\xE3o encontrado ('${o}' -> '${e}')`)},categorize:async(o,e)=>{let t=ee(o,"source")||I(o),a=ee(e,"destination")||I(e);if(!t||!a){console.warn(`$eq.categorize: Item ou categoria n\xE3o encontrados ('${o}' -> '${e}')`);return}await Ke(t,a)},execute:(o,e=!1,t=1)=>He(o,e,t)};typeof window<"u"&&(window.$eq=_t);async function vo(o,e=1,t=fe()){if(ot(o,t),o.t==="js"){let d=String(o.v||"");$t(d);try{new Function("$eq","document","window",d)(_t,document,window)}catch(l){throw console.warn("[EasyQuiz JS Execution]",l),l}return}if(o.t==="drag"){let d=ee(o.from,"source")||I(o.from),l=ee(o.to,"destination")||I(o.to);!d&&o.from&&(d=I(q(o.from))),!l&&o.to&&(l=I(q(o.to))),d&&l?await Ke(d,l,e):console.warn(`[EasyQuiz] Drag: alvo n\xE3o encontrado ('${o.from}' -> '${o.to}')`);return}let a=o.id!==void 0&&o.id!==null?String(o.id):"";!a&&o.t==="val"&&(a=o.target??o.name??o.selector??"1");let r=o.v!==void 0?o.v:o.value!==void 0?o.value:o.val!==void 0?o.val:o.text,n=r!=null?String(r).trim():"",s=null,i=String(o.name??o.n??"").trim();if(!i&&a&&document.querySelector(`input[type="radio"][name="${B(a)}"]`)&&(i=a),(o.t==="chk"||o.t==="clk")&&i){let d=Array.from(document.querySelectorAll(`input[name="${B(i)}"]`));if(n&&(s=d.find(l=>l.value?.toLowerCase()===n.toLowerCase())??null),!s&&n){let l=/^(v|verdadeiro|true|1|t|sim|correto)$/i.test(n),p=/^(f|falso|false|0|nao|não|incorreto|errado)$/i.test(n);if(l||p){let b=l?["v","verdadeiro","true","1","t","sim","correto"]:["f","falso","false","0","nao","n\xE3o","incorreto","errado"];s=d.find(c=>{let m=c.value?.toLowerCase()??"";if(b.includes(m))return!0;let f=(c.closest('label, td, [class*="option" i]')?.textContent??"").trim().toLowerCase();return b.some(y=>f===y||f.startsWith(y+" ")||f.startsWith("("+y+")"))})??null}}!s&&d.length>0&&(s=d[0])}if(s||(s=I(a,n,o.t==="val"||o.t==="sel")),!s&&a&&(s=I(q(a),n,o.t==="val"||o.t==="sel")),s&&n){if(s instanceof HTMLInputElement&&s.type==="radio"&&s.name){if(q(s.value).toLowerCase()!==q(n).toLowerCase()){let d=document.querySelector(`input[type="radio"][name="${B(s.name)}"][value="${B(n)}" i]`);if(d)s=d;else{let p=Array.from(document.querySelectorAll(`input[type="radio"][name="${B(s.name)}"]`)).find(b=>{let c=b.closest("label, .vf-label, .option-card, tr, td, div");return c&&q(c.textContent).toLowerCase().includes(q(n).toLowerCase())});p&&(s=p)}}}else if(!(s instanceof HTMLInputElement)&&!(s instanceof HTMLSelectElement)&&!(s instanceof HTMLTextAreaElement)){let d=s.querySelector(`input[value="${B(n)}" i], [data-value="${B(n)}" i]`);if(d)s=d;else{let p=Array.from(s.querySelectorAll('input[type="radio"], input[type="checkbox"]')).find(b=>{let c=b.closest("label, .vf-label, .option-card, td, div");return c&&q(c.textContent).toLowerCase().includes(q(n).toLowerCase())});p&&(s=p)}}}if(!s&&(o.t==="val"||o.t==="sel")){let d=document.body;try{d=G()||document.body}catch{}let l=Array.from(d.querySelectorAll(o.t==="sel"?'select, [role="combobox"], [role="listbox"]':'input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, select, [contenteditable="true"]')).filter(p=>k(p)&&!z(p));if(l.length===1)s=l[0];else if(l.length>1){let p=q(a).toLowerCase(),b=p.match(/^#?_?([0-9]+)$/);if(b){let c=parseInt(b[1],10);c>=1&&c<=l.length?s=l[c-1]:c>=0&&c<l.length&&(s=l[c])}s||(s=l.find(m=>{let u=(m.getAttribute("placeholder")||"").toLowerCase(),f=(m.name||"").toLowerCase(),y=(m.getAttribute("aria-label")||"").toLowerCase(),h=(m.id||"").toLowerCase(),g=q(nt(m)).toLowerCase(),v=q(m.closest('label, tr, td, .form-group, .field, [class*="row" i], div')?.textContent||"").toLowerCase();return u.includes(p)||f.includes(p)||y.includes(p)||h.includes(p)||g&&g.includes(p)||p.length>=2&&v.includes(p)})||(l.length===1?l[0]:null))}}if(!s&&o.t!=="adv")throw new Error(`Alvo '${a}' n\xE3o encontrado no DOM para a\xE7\xE3o '${o.t}'.`);switch(o.t){case"val":if(s){let p=s instanceof HTMLInputElement||s instanceof HTMLTextAreaElement||s instanceof HTMLSelectElement||s.isContentEditable?s:s.querySelector('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]');if(!p){let u=s.closest('.form-group, .field, [class*="input" i], [class*="control" i], label, tr, td, li, p, div')?.querySelector('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]');u&&(p=u)}if(!p){let m=s.nextElementSibling;for(;m;){if(m instanceof HTMLInputElement&&!["hidden","button","submit","checkbox","radio"].includes(m.type)||m instanceof HTMLTextAreaElement||m instanceof HTMLElement&&m.isContentEditable){p=m;break}let u=m.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(u){p=u;break}m=m.nextElementSibling}}if(!p){let m=document.body;try{m=G()||document.body}catch{}let u=Array.from(m.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]')).filter(f=>k(f)&&!z(f));u.length>0&&(p=u[0])}let b=o.v!==void 0?o.v:o.value!==void 0?o.value:o.val!==void 0?o.val:o.text,c=b!=null?String(b):"";Ve(p||s,c)}break;case"chk":let d=o.c!==void 0?!!o.c:!0;s&&de(s,d);break;case"sel":if(s){let p=Array.isArray(o.v)?o.v:[String(o.v)];_e(s,p)}break;case"clk":if(s)if(!!(s.closest('.option-card, label, .vf-label, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, [class*="option" i], [class*="choice" i], [class*="answer" i], li, tr')||s.querySelector('input[type="radio"], input[type="checkbox"]')||s instanceof HTMLInputElement&&["checkbox","radio"].includes(s.type))){let b=o.c!==void 0?!!o.c:!0;de(s,b)}else te(s,o.co);break;case"adv":let l=Kt(o.id);if(l){await lt(l,1200);let p=o.id||l.textContent?.trim()||"";p&&Je(window.location.hostname,{advanceSelector:p}),te(l)}else console.warn("[EasyQuiz] Bot\xE3o de avan\xE7o n\xE3o localizado.");break}}function yo(){let o=["button","a",'[role="button"]','input[type="submit"]','input[type="button"]','[data-testid*="check" i]','[data-test-id*="check" i]'].join(",");return Array.from(document.querySelectorAll(o)).find(t=>{if(!k(t)||z(t)||t.closest("header, nav, aside"))return!1;let a=t instanceof HTMLInputElement||t instanceof HTMLButtonElement?t.value:"",r=(t.textContent||a||t.getAttribute("aria-label")||"").trim();return/(verificar|checar|check|conferir|validar|enviar|responder)/i.test(r)})||null}function Kt(o){let e=c=>{let m=(c.getAttribute("aria-label")||c.textContent||(c instanceof HTMLInputElement||c instanceof HTMLButtonElement?c.value:"")||"").trim();return se.test(m)};if(o){let c=I(o);if(c&&k(c)&&!z(c)&&!V(c)&&!e(c))return c}try{let c=Ce(window.location.hostname);if(c.advanceSelector){let m=I(c.advanceSelector);if(m&&k(m)&&!z(m)&&!V(m)&&!e(m))return m}}catch{}let t=["button","a",'[role="button"]','[role="link"]','input[type="button"]','input[type="submit"]','[data-testid*="next" i]','[data-testid*="continue" i]','[data-testid*="check" i]','[data-test-id*="next" i]','[data-test-id*="continue" i]','[data-test-id*="check" i]','[class*="next" i]','[class*="continue" i]','[class*="proximo" i]','[class*="avancar" i]'].join(","),a=Array.from(document.querySelectorAll(t)),r=c=>{let m=c instanceof HTMLInputElement||c instanceof HTMLButtonElement?c.value:"";return(c.getAttribute("aria-label")||c.textContent||m||"").trim()},n=c=>{let m=r(c).trim();return/^\d{1,3}$/.test(m)?!!c.closest('[class*="pagination" i], [class*="pager" i], [class*="page-nav" i], [class*="step-indicator" i], [class*="breadcrumb" i], [class*="steps" i], [aria-label*="p\xE1gina" i], [aria-label*="page" i], [role="navigation"], nav'):!1},s=a.filter(c=>k(c)&&!z(c)&&!c.closest("header, aside")&&!V(c)&&!e(c));for(let c of s){let m=r(c),u=m.replace(/[\d\(\)\[\]\u2192>\u2022\-\/\\]+/g," ").trim();if((ke.test(m)||ke.test(u))&&!n(c)&&!V(c))return c}for(let c of s)if(J(c)&&!V(c)&&!n(c))return c;let i=document.querySelector('[data-test-id*="next" i], [data-testid*="next" i], [aria-label*="next" i], [aria-label*="pr\xF3xim" i], [aria-label*="avan\xE7ar" i], [aria-label*="continuar" i]');if(i&&k(i)&&!z(i)&&!V(i)&&!e(i))return i;let d=Array.from(document.querySelectorAll('input[type="submit"], button[type="submit"]'));for(let c of d)if(k(c)&&!z(c)&&!e(c)&&!V(c)&&!n(c))return c;let l=Array.from(document.querySelectorAll('button, [role="button"]')),p=window.innerHeight,b=l.filter(c=>{if(!k(c)||z(c)||e(c)||V(c)||c.closest("header, nav, aside, .eq-sidebar")||n(c))return!1;let m=c.getBoundingClientRect();return m.top>p*.45&&m.height>=24&&m.width>=24});if(b.length>0)return b.sort((c,m)=>{let u=c.getBoundingClientRect(),f=m.getBoundingClientRect(),y=u.left+u.top;return f.left+f.top-y}),b[0];for(let c of s)if(J(c)&&!V(c))return c;return null}async function lt(o,e=2500){let t=Date.now();for(;Date.now()-t<e;){if(!(o.disabled===!0||o.getAttribute("aria-disabled")==="true"||o.classList.contains("disabled")||o.getAttribute("disabled")!==null))return;await new Promise(r=>setTimeout(r,80))}}function xo(){let o=window.location.href,e=document.title,t=document.querySelectorAll('input, textarea, select, button, [role="button"], [role="option"], [role="radio"], [role="checkbox"]').length,a=(document.body?.innerText||document.body?.textContent||"").length;return`${o}|${e}|${t}|${a}`}async function wo(o,e=3500){let[t,a,r,n]=o.split("|"),s=parseInt(n||"0",10),i=Date.now();for(;Date.now()-i<e;){let d=window.location.href,l=document.title,p=String(document.querySelectorAll('input, textarea, select, button, [role="button"], [role="option"], [role="radio"], [role="checkbox"]').length),b=(document.body?.innerText||document.body?.textContent||"").length;if(d!==t)return{changed:!0,evidence:`URL mudou: ${t} \u2192 ${d}`};if(l!==a)return{changed:!0,evidence:`T\xEDtulo da p\xE1gina mudou: "${a}" \u2192 "${l}"`};if(Math.abs(parseInt(p)-parseInt(r||"0"))>=2)return{changed:!0,evidence:`Controles interativos: ${r} \u2192 ${p}`};if(Math.abs(b-s)>50)return{changed:!0,evidence:`Conte\xFAdo da p\xE1gina mudou substancialmente (${Math.abs(b-s)} chars)`};await new Promise(c=>setTimeout(c,100))}return{changed:!1,evidence:"Nenhuma mudan\xE7a estrutural detectada dentro do tempo limite."}}async function je(o){if(o.t==="js"||o.t==="adv")return;if(o.t==="drag"){let n=I(o.from)||I(q(o.from)),s=I(o.to)||I(q(o.to));n&&s&&await Ke(n,s,2);return}let e=o.id||"",t=o.v!==void 0?String(o.v).trim():"",a=I(e,t)||I(q(e),t),r=String(o.name??o.n??"").trim();if(!r&&e&&document.querySelector(`input[type="radio"][name="${B(e)}"]`)&&(r=e),!a&&r){let n=Array.from(document.querySelectorAll(`input[name="${B(r)}"]`));if(t&&(a=n.find(s=>s.value?.toLowerCase()===t.toLowerCase())??null),!a&&t){let s=/^(v|verdadeiro|true|1|t|sim|correto)$/i.test(t),i=/^(f|falso|false|0|nao|não|incorreto|errado)$/i.test(t);if(s||i){let d=s?["v","verdadeiro","true","1","t","sim","correto"]:["f","falso","false","0","nao","n\xE3o","incorreto","errado"];a=n.find(l=>{let p=l.value?.toLowerCase()??"";if(d.includes(p))return!0;let c=(l.closest('label, td, [class*="option" i]')?.textContent??"").trim().toLowerCase();return d.some(m=>c===m||c.startsWith(m+" ")||c.startsWith("("+m+")"))})??null}}!a&&n.length>0&&(a=n[0])}if(o.t==="clk"||o.t==="chk"){if(!a&&e){let s=Array.from(document.querySelectorAll('input, label, button, [role="radio"], [role="checkbox"], .option-card, [class*="option" i], [class*="choice" i]')),i=q(e).toLowerCase();a=s.find(d=>{let l=q(d.textContent).toLowerCase();return!!(q(d.value||"").toLowerCase()===i||l===i||l.startsWith(i+")")||l.startsWith("("+i+")")||l.startsWith(i+".")||l.startsWith(i+" - ")||l.startsWith(i+":")||i.length>=3&&l.includes(i))})||null}let n=o.v!==void 0?String(o.v).trim():"";if(a&&n){if(a instanceof HTMLInputElement&&a.type==="radio"&&a.name){if(q(a.value).toLowerCase()!==q(n).toLowerCase()){let s=document.querySelector(`input[type="radio"][name="${B(a.name)}"][value="${B(n)}" i]`);if(s)a=s;else{let d=Array.from(document.querySelectorAll(`input[type="radio"][name="${B(a.name)}"]`)).find(l=>{let p=l.closest("label, .vf-label, .option-card, tr, td, div");return p&&q(p.textContent).toLowerCase().includes(q(n).toLowerCase())});d&&(a=d)}}}else if(!(a instanceof HTMLInputElement)&&!(a instanceof HTMLSelectElement)&&!(a instanceof HTMLTextAreaElement)){let s=a.querySelector(`input[value="${B(n)}" i], [data-value="${B(n)}" i]`);if(s)a=s;else{let d=Array.from(a.querySelectorAll('input[type="radio"], input[type="checkbox"]')).find(l=>{let p=l.closest("label, .vf-label, .option-card, td, div");return p&&q(p.textContent).toLowerCase().includes(q(n).toLowerCase())});d&&(a=d)}}}if(a){let s=a.closest('.option-card, label, .vf-label, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, li')||a,i=a instanceof HTMLInputElement&&["radio","checkbox"].includes(a.type)?a:s.querySelector('input[type="radio"], input[type="checkbox"]')||(s.getAttribute("for")?s.ownerDocument.getElementById(s.getAttribute("for")):null),d=o.c!==void 0?!!o.c:!0;if(de(i||s,d),i&&i.checked!==d){try{let l=i._valueTracker;l&&l.setValue(!d)}catch{}try{Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"checked")?.set?.call(i,d)}catch{}i.checked=d,i.dispatchEvent(new Event("input",{bubbles:!0,composed:!0})),i.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}}return}if(o.t==="val"){let n=null;if(a&&(n=a instanceof HTMLInputElement||a instanceof HTMLTextAreaElement||a.isContentEditable?a:a.querySelector('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]')),!n){let s=document.body;try{s=G()||document.body}catch{}let i=Array.from(s.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]')),d=q(e).toLowerCase();n=i.find(l=>{let p=(l.getAttribute("placeholder")||"").toLowerCase(),b=(l.name||"").toLowerCase(),c=(l.id||"").toLowerCase(),m=(l.getAttribute("aria-label")||"").toLowerCase();return p.includes(d)||b.includes(d)||c.includes(d)||m.includes(d)})||(i.length>0?i[0]:null)}if(n){let s=String(o.v??"");try{if(n.focus?.(),n.type!=="number"){try{n.select?.()}catch{}document.execCommand?.("insertText",!1,s)}}catch{}Ve(n,s)}return}if(o.t==="sel"){if(!a&&e){let n=Array.from(document.querySelectorAll("select")),s=q(e).toLowerCase();a=n.find(i=>{let d=(i.name||"").toLowerCase(),l=(i.id||"").toLowerCase(),p=(i.getAttribute("aria-label")||"").toLowerCase();return d.includes(s)||l.includes(s)||p.includes(s)})||null}if(a){let n=Array.isArray(o.v)?o.v:[String(o.v)];_e(a,n)}return}}function Z(o){try{if(o.t==="val"){let e=o.v!==void 0?o.v:o.value!==void 0?o.value:o.val!==void 0?o.val:o.text,t=String(e??"").trim(),a=t,r=o.id!==void 0&&o.id!==null?String(o.id):"";r||(r=o.target??o.name??o.selector??"1");let n=I(r,a,!0)||I(q(r),a,!0);if(!n){let m=document.body;try{m=G()||document.body}catch{}let u=Array.from(m.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]')).filter(f=>k(f)&&!z(f));u.length>0&&(n=u[0])}if(!n)return!1;let s=n instanceof HTMLInputElement&&n.type==="radio"?n:n.querySelector('input[type="radio"]');if(s&&s.name){let m=document.querySelector(`input[type="radio"][name="${B(s.name)}"]:checked`);if(!m)return!1;let u=q(m.value).toLowerCase(),f=q(t).toLowerCase(),y=q(m.closest("label, .vf-label, .option-card, tr, td, div")?.textContent||"").toLowerCase();return u===f||y===f||y.includes(f)}let i=n instanceof HTMLInputElement||n instanceof HTMLTextAreaElement||n.isContentEditable?n:n.querySelector('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(!i){let u=n.closest('.form-group, .field, [class*="input" i], [class*="control" i], label, tr, td, li, p, div')?.querySelector('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]');u&&(i=u)}if(!i){let m=n.nextElementSibling;for(;m;){if(m instanceof HTMLInputElement&&!["hidden","button","submit","checkbox","radio"].includes(m.type)||m instanceof HTMLTextAreaElement||m instanceof HTMLElement&&m.isContentEditable){i=m;break}let u=m.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(u){i=u;break}m=m.nextElementSibling}}if(i instanceof HTMLSelectElement){let m=q(t).toLowerCase();return Array.from(i.options).some(u=>{if(!u.selected)return!1;let f=u.value.toLowerCase(),y=q(u.textContent).toLowerCase();return m===f||m===y||f.includes(m)||y.includes(m)})}let d=(i instanceof HTMLInputElement||i instanceof HTMLTextAreaElement?i.value:i?.textContent??n.textContent??"").trim();if(!d&&!t)return!0;if(!d&&t)return!1;let l=d.replace(",",".").replace(/\s+/g,"").toLowerCase(),p=t.replace(",",".").replace(/\s+/g,"").toLowerCase(),b=parseFloat(l),c=parseFloat(p);return!isNaN(b)&&!isNaN(c)&&l.match(/^-?[\d.,]+$/)&&p.match(/^-?[\d.,]+$/)?Math.abs(b-c)<1e-4:l===p||d.toLowerCase()===t.toLowerCase()||p.length>=3&&l===p}if(o.t==="sel"){let e=I(o.id,void 0,!0)||I(q(o.id),void 0,!0);if(!e){let n=document.body;try{n=G()||document.body}catch{}let s=Array.from(n.querySelectorAll('select, [role="combobox"], [role="listbox"]')).filter(l=>k(l)&&!z(l)),i=q(o.id).toLowerCase();e=s.find(l=>{let p=(l.id||"").toLowerCase(),b=(l.getAttribute("name")||"").toLowerCase(),c=(l.getAttribute("aria-label")||"").toLowerCase(),m=q(l.closest('.dropdown-row, [class*="dropdown" i], [class*="select" i], tr, label, div')?.textContent||"").toLowerCase();return p.includes(i)||b.includes(i)||c.includes(i)||i.length>=2&&m.includes(i)})||(s.length===1?s[0]:null)}if(!e)return!1;let t=e instanceof HTMLSelectElement?e:e.querySelector("select");if(!t){let n=e.matches?.('[role="combobox"], [role="listbox"], [class*="select" i], [class*="dropdown" i]')?e:e.closest('[role="combobox"], [role="listbox"], [class*="select" i], [class*="dropdown" i]');if(n){let i=(Array.isArray(o.v)?o.v:[String(o.v)]).map(l=>q(l).toLowerCase()),d=q(n.textContent).toLowerCase();return i.some(l=>d.includes(l)||l.includes(d))}return!1}let r=(Array.isArray(o.v)?o.v:[String(o.v)]).map(n=>q(n).toLowerCase());return Array.from(t.options).some(n=>{if(!n.selected)return!1;let s=n.value.toLowerCase(),i=q(n.textContent).toLowerCase();return r.some(d=>d===s||d===i||s.includes(d)||i.includes(d))})}if(o.t==="chk"||o.t==="clk"){let e=o.v!==void 0?String(o.v).trim():"",t=String(o.name??o.n??"").trim();if(t&&!o.id){let c=Array.from(document.querySelectorAll(`input[name="${B(t)}"]`));if(c.length>0){let m=c.find(g=>g.checked);if(!m)return!1;if(!e)return!0;let u=m.value?.toLowerCase()??"",f=e.toLowerCase();if(u===f)return!0;let y=/^(v|verdadeiro|true|1|t|sim|correto)$/i.test(e),h=/^(f|falso|false|0|nao|não|incorreto|errado)$/i.test(e);return y?/^(v|verdadeiro|true|1|t|sim|correto)$/i.test(u):h?/^(f|falso|false|0|nao|não|incorreto|errado)$/i.test(u):!1}}let a=I(o.id,e)||I(q(o.id),e);if(!a&&t){let c=document.querySelector(`input[name="${B(t)}"]`);c&&(a=c)}if(!a)return!1;let r=a.closest('.option-card, label, .vf-label, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, li')||a,n=a instanceof HTMLInputElement&&["checkbox","radio"].includes(a.type)?a:r.querySelector('input[type="checkbox"], input[type="radio"]')||(r.getAttribute("for")?r.ownerDocument.getElementById(r.getAttribute("for")):null),s=o.t==="chk"||o.c!==void 0?!!o.c:!0;if(n&&n.type==="radio"){if(n.checked===s)return!0;if(o.v&&n.name){let c=q(String(o.v)).toLowerCase(),m=document.querySelector(`input[type="radio"][name="${B(n.name)}"]:checked`);if(!m)return!1;if(m===n)return!0;let u=q(m.value).toLowerCase(),f=q(m.closest("label, .vf-label, .option-card, tr, td, div")?.textContent||"").toLowerCase();return u===c||f.includes(c)||c.includes(u)}}if(n&&["checkbox","radio"].includes(n.type))return n.checked===s;let i=r.getAttribute("aria-checked")===String(s)||r.getAttribute("aria-selected")===String(s)||r.getAttribute("aria-pressed")===String(s),d=s?r.getAttribute("data-selected")==="true"||r.getAttribute("data-checked")==="true"||r.getAttribute("data-active")==="true"||r.getAttribute("data-state")==="checked"||r.getAttribute("data-state")==="on":r.getAttribute("data-selected")==="false"||r.getAttribute("data-checked")==="false"||r.getAttribute("data-state")==="unchecked",l=r.className||"",p=s?/\b(active|selected|checked|picked|is-selected|choice-selected|selected-option|is-checked|chosen|current)\b/i.test(l):!/\b(active|selected|checked|picked|is-selected|choice-selected|selected-option|is-checked|chosen|current)\b/i.test(l);if(i||d||p)return!0;let b=!!r.closest('[role="radiogroup"], [role="listbox"], .options, .choices, [class*="option" i], [class*="choice" i], [class*="answer" i], [class*="quiz" i]');return o.t==="clk"&&!n&&!b||r.getAttribute("aria-expanded")!==null||r.getAttribute("aria-pressed")!==null}if(o.t==="drag"){let e=ee(o.from,"source")||I(o.from)||I(q(o.from)),t=ee(o.to,"destination")||I(o.to)||I(q(o.to));return!e||!t?!1:bo(e,t).success}}catch{}return!1}async function He(o,e,t=1,a=fe({engine:"smart",autoAdvance:e})){let r=o.actions.filter(x=>x.t!=="adv"),n=o.actions.filter(x=>x.t==="adv"),s=0,i=[],d=new Map,l=new Map,p=new Map,b=new Set,c=o.pageType==="question",m=r.filter(x=>x.t==="chk"||x.t==="clk"&&x.c!==void 0),u=new Map;for(let x of r){let T=[];l.set(x,T);try{if(x.t==="drag"){T.push("declarative-A-F");try{let L=ee(x.from,"source")||I(x.from),$=ee(x.to,"destination")||I(x.to);L&&p.set(x,L.parentElement?.outerHTML?.slice(0,500)||""),$&&u.set(x,$.children.length)}catch{}}else T.push("declarative-primary");await vo(x,t,a),s++,b.add(x)}catch(L){d.set(x,L instanceof Error?L.message:String(L)),console.warn("[EasyQuiz] A\xE7\xE3o declarativa prim\xE1ria falhou com seguran\xE7a:",x,L)}await new Promise(L=>setTimeout(L,x.t==="drag"?180:35))}if(c&&o.mode==="escolha_multipla"&&m.length>0){let x=document.body;try{x=G()||document.body}catch{}let T=Array.from(x.querySelectorAll('input[type="checkbox"], [role="checkbox"]')).filter(L=>k(L)&&!z(L));if(T.length>1){let $=function(E,H){if(E===H||E.contains(H)||H.contains(E))return!0;let O=E.closest('.option-card, label, [role="checkbox"], [role="option"], tr, li, [class*="option" i]'),_=H.closest('.option-card, label, [role="checkbox"], [role="option"], tr, li, [class*="option" i]');if(O&&_&&O===_)return!0;let N=E.getAttribute("for")||E.id,D=H.getAttribute("for")||H.id;return!!(N&&D&&N===D)};var S=$;let L=new Set;for(let E of m){let H=E.t==="chk"?!!E.c:!!(E.c??!0),O="id"in E&&typeof E.id=="string"?E.id:"";if(H&&O){let _=I(O,E.v);if(_){L.add(_);let N=_.querySelector('input[type="checkbox"]');N&&L.add(N);let D=_.closest('.option-card, label, [role="checkbox"], tr, li, [class*="option" i]');D&&(L.add(D),D.querySelectorAll('input[type="checkbox"]').forEach(j=>L.add(j)))}}}if(L.size>=m.length&&L.size>0){let E=Array.from(L);for(let H of T)E.some(_=>$(_,H))||(H instanceof HTMLInputElement&&H.checked||H.getAttribute("aria-checked")==="true"||H.closest(".option-card, label")?.classList.contains("selected"))&&de(H,!1)}}}await new Promise(x=>setTimeout(x,r.length>0?100:25));let f=0;for(let x of r){if(Z(x)){f++;continue}console.warn(`[EasyQuiz Auto-Cura] A\xE7\xE3o '${x.t}' no alvo '${x.id||x.from||""}' n\xE3o verificada no DOM. Disparando Passagem 2 de conting\xEAncia...`);try{ot(x,a),l.get(x)?.push("alternative-path"),await je(x)}catch(T){d.set(x,T instanceof Error?T.message:String(T)),console.warn("[EasyQuiz Auto-Cura] Rota alternativa falhou:",T)}await new Promise(T=>setTimeout(T,250)),Z(x)&&(console.log("[EasyQuiz Auto-Cura] \u2713 A\xE7\xE3o recuperada com sucesso pela rota de conting\xEAncia!"),f++,b.has(x)?d.has(x)&&d.delete(x):(d.delete(x),s++,b.add(x)))}if(f<r.length&&r.length>0){console.warn(`[EasyQuiz Auto-Cura] ${r.length-f} de ${r.length} a\xE7\xE3o(\xF5es) ainda n\xE3o verificadas. Disparando Passagem 3 final...`),await new Promise(x=>setTimeout(x,200));for(let x of r)if(!Z(x))try{if(await je(x),await new Promise(T=>setTimeout(T,80)),!Z(x)&&(x.t==="clk"||x.t==="chk"))try{let T="id"in x?String(x.id||""):"",L=x.v!==void 0?String(x.v).trim():"",$=I(T,L)||I(q(T),L);$&&(ct($),await new Promise(E=>setTimeout(E,120)))}catch{}}catch(T){d.set(x,T instanceof Error?T.message:String(T))}await new Promise(x=>setTimeout(x,200)),f=0;for(let x of r)Z(x)&&(f++,b.has(x)?d.has(x)&&d.delete(x):(d.delete(x),s++,b.add(x)))}let y=[];for(let[x,T]of r.entries())if(!Z(T)){let L=T.t==="drag"?`${T.from} -> ${T.to}`:"id"in T&&T.id?T.id:T.t;i.push(L),y.push({actionIndex:x,action:T,strategiesAttempted:l.get(T)||[],evidence:d.get(T)||"sem evid\xEAncia de aplica\xE7\xE3o no DOM",domSnapshot:p.get(T)}),T.t==="drag"&&console.warn(`[EasyQuiz Drag] FALHA CONFIRMADA: "${T.from}" -> "${T.to}"`,`
  Estrat\xE9gias: ${(l.get(T)||[]).join(", ")}`,`
  Snapshot DOM: ${p.get(T)?.slice(0,200)||"n/a"}`)}c&&r.length===0&&i.push("nenhuma a\xE7\xE3o de resposta prescrita");let h=r.map((x,T)=>{let L=x.t==="drag"?`${x.from} -> ${x.to}`:x.t==="js"?"$eq":x.id||x.t,$=x.t==="js"?!0:x.t==="drag"?!!(ee(x.from,"source")&&ee(x.to,"destination")):!!(I(x.id||"")||I(q(x.id||""))),E=Z(x);return{index:T,action:x,target:L,located:$,applied:!d.has(x),verified:E,strategy:x.t==="drag"?"drag-adaptive":x.t==="js"?"javascript":"declarative-dom",evidence:E?"estado do controle confirmado no DOM":"nenhuma evid\xEAncia suficiente ap\xF3s as tentativas",...d.has(x)?{error:d.get(x)}:{}}}),g=c?r.length>0&&i.length===0&&(f===r.length||s===r.length&&f>0):!0,v=!1,w=!1,C="Nenhuma a\xE7\xE3o de navega\xE7\xE3o solicitada.",M=s>0&&s>=r.length/2;if(e&&(g||!c||M)){await new Promise(L=>setTimeout(L,r.length>0?120:40));let x=!1,T=null;if(o.pageType!=="info"){let L=yo();L&&k(L)&&(await lt(L,1200),te(L),x=!0,T=L,v=!0,w=!0,C="Resposta confirmada via bot\xE3o de verifica\xE7\xE3o/envio.",await new Promise($=>setTimeout($,400)))}if(!x){let L=xo(),$=n.length>0&&"id"in n[0]?n[0].id:void 0,E=Kt($);if(E){await lt(E,1500);let H=$||E.textContent?.trim()||"";H&&Je(window.location.hostname,{advanceSelector:H}),te(E);let O=await wo(L,1800);w=O.changed,C=O.evidence,v=O.changed||!0,O.changed||console.warn("[EasyQuiz] O bot\xE3o de avan\xE7o foi acionado, mas a navega\xE7\xE3o ainda n\xE3o concluiu.")}else console.warn("[EasyQuiz] Nenhum bot\xE3o de avan\xE7o encontrado na p\xE1gina.")}}return{applied:s,verified:f,success:g,advanced:v,failed:i,reports:h,navigationVerified:w,navigationEvidence:C,failedActions:y}}var oe=null,ve=[],dt=[],ut=[],pt=[],ae=null,ue=null,Eo=`
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
`;function jt(){try{if(typeof document>"u"||!document.head)return;if(!document.getElementById("eq-image-pulse-style")){let o=document.createElement("style");o.id="eq-image-pulse-style",o.textContent=Eo,document.head.appendChild(o)}}catch{}}function Ee(){oe&&(oe.style.removeProperty("outline"),oe.style.removeProperty("outline-offset"),oe.style.removeProperty("position"),oe=null);for(let o of ve)o.style.removeProperty("outline"),o.style.removeProperty("outline-offset"),o.style.removeProperty("background-color"),o.style.removeProperty("box-shadow"),o.removeAttribute("data-easyquiz-highlight");ve=[];for(let o of dt)o.style.removeProperty("animation"),o.style.removeProperty("outline"),o.style.removeProperty("outline-offset"),o.style.removeProperty("box-shadow"),o.style.removeProperty("filter"),o.removeAttribute("data-easyquiz-image-highlight");dt=[];for(let o of ut)try{o.remove()}catch{}ut=[],ue&&typeof window<"u"&&(window.removeEventListener("scroll",ue),window.removeEventListener("resize",ue),ue=null);for(let o of pt)try{o.remove()}catch{}if(pt=[],ae){try{ae.remove()}catch{}ae=null}}function mt(o){jt();let e=[];for(let t of o){if(!t||typeof t.setAttribute!="function")continue;let a=t;try{a.style&&(a.style.outline="3px solid #ffd600",a.style.outlineOffset="4px",a.style.animation="eq-image-pulse-yellow-white 1.2s ease-in-out infinite",a.style.boxShadow="0 0 16px rgba(255, 214, 0, 0.7)",a.style.filter="drop-shadow(0 0 8px rgba(255, 214, 0, 0.8))"),a.setAttribute("data-easyquiz-image-highlight","true"),dt.push(a)}catch{}try{let r=t.getBoundingClientRect(),n=r.width||t.offsetWidth||280,s=r.height||t.offsetHeight||200;if(n>10&&s>10){let i=document.createElement("div");i.setAttribute("data-easyquiz-image-frame","true"),i.style.cssText=`
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
        `,i.appendChild(d),document.body.appendChild(i),ut.push(i),pt.push(d),e.push({element:t,frame:i})}}catch{}}e.length>0&&!ue&&typeof window<"u"&&(ue=()=>{for(let t of e)try{let a=t.element.getBoundingClientRect();a.width>0&&a.height>0&&(t.frame.style.top=`${a.top+window.scrollY-3}px`,t.frame.style.left=`${a.left+window.scrollX-3}px`,t.frame.style.width=`${a.width+6}px`,t.frame.style.height=`${a.height+6}px`)}catch{}},window.addEventListener("scroll",ue,{passive:!0}),window.addEventListener("resize",ue,{passive:!0}))}function ht(o){oe&&oe!==o&&(oe.style.removeProperty("outline"),oe.style.removeProperty("outline-offset")),jt(),oe=o,o.style.outline="2px solid #00e5ff",o.style.outlineOffset="4px";try{if(ae){try{ae.remove()}catch{}ae=null}window.getComputedStyle(o).position==="static"&&(o.style.position="relative");let t=document.createElement("div");t.style.cssText=`
      position: absolute; left: 0; right: 0; top: 0; height: 3px;
      background: linear-gradient(90deg, transparent, #00e5ff, #00ff88, #00e5ff, transparent);
      z-index: 99998; pointer-events: none; border-radius: 2px;
      animation: eq-scope-scan-loop 1.4s ease-in-out infinite;
      box-shadow: 0 0 14px rgba(0, 229, 255, 0.85), 0 0 6px #00ff88;
    `,o.appendChild(t),ae=t}catch{}}function qo(o){return!o||o>=.9?{outline:"#00ff88",bg:"rgba(0, 255, 136, 0.12)",glow:"rgba(0, 255, 136, 0.8)"}:o>=.7?{outline:"#00bfff",bg:"rgba(0, 191, 255, 0.10)",glow:"rgba(0, 191, 255, 0.7)"}:{outline:"#ffaa00",bg:"rgba(255, 170, 0, 0.10)",glow:"rgba(255, 170, 0, 0.7)"}}function Ut(o,e){if(ae){try{ae.remove()}catch{}ae=null}let t=qo(e);for(let a of o){if(a.t==="adv"||a.t==="js")continue;if(a.t==="drag"){try{let m=I(a.from),u=I(a.to);m&&(m.style.outline=`2px solid ${t.outline}`,ve.push(m)),u&&(u.style.outline="2px dashed #00e5ff",ve.push(u))}catch{}continue}let r=a.v!==void 0?Array.isArray(a.v)?a.v[0]:String(a.v):"",n=String(a.name??a.n??"").trim(),s=null;if(n){let m=Array.from(document.querySelectorAll(`input[name="${B(n)}"]`));if(r&&(s=m.find(u=>u.value?.toLowerCase()===r.toLowerCase())??null,!s)){let u=/^(v|verdadeiro|true|1|t|sim|correto)$/i.test(r),f=/^(f|falso|false|0|nao|não|incorreto|errado)$/i.test(r);if(u||f){let y=u?["v","verdadeiro","true","1","t","sim","correto"]:["f","falso","false","0","nao","n\xE3o","incorreto","errado"];s=m.find(h=>{let g=h.value?.toLowerCase()??"";if(y.includes(g))return!0;let w=(h.closest('label, .vf-label, td, [class*="option" i]')?.textContent??"").trim().toLowerCase();return y.some(C=>w===C||w.startsWith(C+" ")||w.startsWith("("+C+")"))})??null}}!s&&m.length>0&&(s=m[0])}if(!s&&a.id&&(s=I(a.id,r,a.t==="val"||a.t==="sel")||I(q(a.id),r,a.t==="val"||a.t==="sel")),!s&&a.t==="sel"){let m=document.body;try{m=G()||document.body}catch{}let u=Array.from(m.querySelectorAll('select, [role="combobox"], [role="listbox"]')).filter(h=>k(h)&&!le(h)),f=q(a.id).toLowerCase();s=u.find(h=>{let g=(h.id||"").toLowerCase(),v=(h.getAttribute("name")||"").toLowerCase(),w=(h.getAttribute("aria-label")||"").toLowerCase(),C=q(h.closest('.dropdown-row, [class*="dropdown" i], [class*="select" i], tr, label, div')?.textContent||"").toLowerCase();return g.includes(f)||v.includes(f)||w.includes(f)||f.length>=2&&C.includes(f)})||(u.length===1?u[0]:null)}if(!s)continue;let i=typeof HTMLSelectElement<"u"&&s instanceof HTMLSelectElement||s.tagName?.toLowerCase()==="select"||s.getAttribute("role")==="combobox"||s.getAttribute("role")==="listbox",d=s.closest('label, .vf-label, .option-card, [role="radio"], [role="checkbox"], [role="option"], [role="listitem"], .answer, .quiz-option, .form-check, [class*="option" i], [class*="choice" i]'),l=i?s.parentElement?.closest('.dropdown-row, [class*="dropdown" i], [class*="select-row" i], .form-group, tr, li'):null,p=d||l||s;p.style.outline=`2px solid ${t.outline}`,p.style.outlineOffset="2px",p.style.backgroundColor=t.bg,p.setAttribute("data-easyquiz-highlight","true"),ve.push(p);let b=i?s:p.querySelector('select, [role="combobox"], [role="listbox"]');b&&(b.style.outline=`2px solid ${t.outline}`,b.style.outlineOffset="2px",b.style.boxShadow=`0 0 10px ${t.glow}`,b.setAttribute("data-easyquiz-highlight","true"),ve.push(b));let c=s instanceof HTMLInputElement&&["checkbox","radio"].includes(s.type)?s:p.querySelector('input[type="checkbox"], input[type="radio"]');c&&c!==p&&(c.style.outline=`2px solid ${t.outline}`,c.style.outlineOffset="2px",c.style.boxShadow=`0 0 10px ${t.glow}`,c.setAttribute("data-easyquiz-highlight","true"),ve.push(c))}}var gt=10,Co=1400,$e=15e5;function re(o){return new Promise((e,t)=>{let a=new FileReader;a.onerror=()=>t(new Error("Falha ao converter blob para base64.")),a.onload=()=>{let r=String(a.result||"");e(r.split(",")[1]||"")},a.readAsDataURL(o)})}async function ye(o){let e=0,t=0;if(o instanceof HTMLImageElement?(e=o.naturalWidth||o.width,t=o.naturalHeight||o.height):(e=o.width,t=o.height),e<=0||t<=0)throw new Error("Dimens\xF5es inv\xE1lidas.");let a=Math.min(1,Co/Math.max(e,t)),r=Math.max(1,Math.round(e*a)),n=Math.max(1,Math.round(t*a)),s=document.createElement("canvas");s.width=r,s.height=n;let i=s.getContext("2d",{alpha:!1});if(!i)throw new Error("Sem suporte a Canvas 2D.");return i.fillStyle="#ffffff",i.fillRect(0,0,r,n),i.drawImage(o,0,0,r,n),new Promise((d,l)=>{s.toBlob(p=>p?d(p):l(new Error("Falha na compress\xE3o.")),"image/jpeg",.88)})}async function Gt(o){let e=typeof o.getBoundingClientRect=="function"?o.getBoundingClientRect():{width:0,height:0},t=e.width||parseFloat(o.getAttribute("width")||"0")||parseFloat(o.style.width||"0")||400,a=e.height||parseFloat(o.getAttribute("height")||"0")||parseFloat(o.style.height||"0")||300,r=2,n=Math.min(1800,Math.max(120,Math.round(t*r))),s=Math.min(1800,Math.max(100,Math.round(a*r))),i=o.cloneNode(!0);i.getAttribute("xmlns")||i.setAttribute("xmlns","http://www.w3.org/2000/svg"),i.getAttribute("xmlns:xlink")||i.setAttribute("xmlns:xlink","http://www.w3.org/1999/xlink"),i.setAttribute("width",String(n)),i.setAttribute("height",String(s)),!i.getAttribute("viewBox")&&t>0&&a>0&&i.setAttribute("viewBox",`0 0 ${t} ${a}`);try{let c=Array.from(o.querySelectorAll("*")),m=Array.from(i.querySelectorAll("*"));for(let u=0;u<Math.min(c.length,m.length);u++){let f=c[u],y=m[u];if(!f||!y||!y.style)continue;let h=window.getComputedStyle?window.getComputedStyle(f):null;h&&(h.fill&&h.fill!=="none"&&(y.style.fill=h.fill),h.stroke&&h.stroke!=="none"&&(y.style.stroke=h.stroke),h.strokeWidth&&(y.style.strokeWidth=h.strokeWidth),h.fontFamily&&(y.style.fontFamily=h.fontFamily),h.fontSize&&(y.style.fontSize=h.fontSize),h.fontWeight&&(y.style.fontWeight=h.fontWeight),h.color&&(y.style.color=h.color))}}catch{}let d="#ffffff";try{let c=o.parentElement||o;for(;c&&c!==document.documentElement;){let u=(window.getComputedStyle?window.getComputedStyle(c):null)?.backgroundColor;if(u&&u!=="transparent"&&u!=="rgba(0, 0, 0, 0)"){d=u;break}c=c.parentElement}}catch{}let p=new XMLSerializer().serializeToString(i),b="";try{b=btoa(unescape(encodeURIComponent(p)))}catch{}try{let c=y=>new Promise((h,g)=>{let v=new Image,w=setTimeout(()=>g(new Error("Timeout render SVG")),1200);v.onload=()=>{clearTimeout(w),h(v)},v.onerror=()=>{clearTimeout(w),g(new Error("Falha ao renderizar SVG em Image."))},v.src=y}),m=null;if(b)try{m=await c(`data:image/svg+xml;base64,${b}`)}catch{}if(!m){let y=new Blob([p],{type:"image/svg+xml;charset=utf-8"}),h=URL.createObjectURL(y);try{m=await c(h)}finally{URL.revokeObjectURL(h)}}let u=document.createElement("canvas");u.width=n,u.height=s;let f=u.getContext("2d",{alpha:!1});if(f&&m){f.fillStyle=d,f.fillRect(0,0,n,s),f.drawImage(m,0,0,n,s);let y=await new Promise(h=>{u.toBlob(h,"image/jpeg",.92)});if(y){let h=await re(y);if(h)return{blob:y,base64:h,mediaType:"image/jpeg"}}}}catch{}return{base64:b,mediaType:"image/svg+xml"}}async function ft(o){try{let e=o.getBoundingClientRect(),t=Math.round(e.width)||o.offsetWidth||400,a=Math.round(e.height)||o.offsetHeight||300;if(t<30||a<30)return null;let r=o.tagName.toLowerCase()==="svg"?o:o.querySelector("svg");if(r&&o.querySelectorAll("input, select, textarea").length===0)try{let f=await Gt(r);if(f.base64&&f.base64.length<=$e)return{mediaType:f.mediaType,base64:f.base64,alt:o.getAttribute("aria-label")||r.getAttribute("aria-label")||"Captura de diagrama/gr\xE1fico",source:"visual_snapshot",captureStatus:"captured",textContext:pe(r)}}catch{}if(o instanceof HTMLCanvasElement)try{let f=await ye(o),y=await re(f);if(y)return{mediaType:"image/jpeg",base64:y,alt:o.getAttribute("aria-label")||"Captura de canvas visual",source:"canvas_snapshot",captureStatus:"captured"}}catch{}let n="#ffffff";try{let f=o;for(;f&&f!==document.documentElement;){let h=(window.getComputedStyle?window.getComputedStyle(f):null)?.backgroundColor;if(h&&h!=="transparent"&&h!=="rgba(0, 0, 0, 0)"){n=h;break}f=f.parentElement}}catch{}let s=o.cloneNode(!0),i=Array.from(o.querySelectorAll("*")),d=Array.from(s.querySelectorAll("*"));for(let f=0;f<Math.min(i.length,d.length);f++){let y=i[f],h=d[f];if(!(!y||!h||!h.style))try{let g=window.getComputedStyle(y);h.style.color=g.color,h.style.backgroundColor=g.backgroundColor,h.style.borderColor=g.borderColor,h.style.borderWidth=g.borderWidth,h.style.borderStyle=g.borderStyle,h.style.fontSize=g.fontSize,h.style.fontFamily=g.fontFamily,h.style.fontWeight=g.fontWeight,h.style.lineHeight=g.lineHeight,h.style.letterSpacing=g.letterSpacing,h.style.textAlign=g.textAlign}catch{}}let l=Math.min(2,Math.max(1,1200/Math.max(t,a))),p=Math.round(t*l),b=Math.round(a*l),c=`
      <svg xmlns="http://www.w3.org/2000/svg" width="${p}" height="${b}" viewBox="0 0 ${t} ${a}">
        <foreignObject width="${t}" height="${a}">
          <div xmlns="http://www.w3.org/1999/xhtml" style="background:${n};width:100%;height:100%;overflow:hidden;box-sizing:border-box;">
            ${s.outerHTML}
          </div>
        </foreignObject>
      </svg>
    `,m=new Blob([c],{type:"image/svg+xml;charset=utf-8"}),u=URL.createObjectURL(m);try{let f=new Image;await new Promise((g,v)=>{let w=setTimeout(()=>v(new Error("Timeout render ForeignObject")),2500);f.onload=()=>{clearTimeout(w),g()},f.onerror=()=>{clearTimeout(w),v(new Error("Falha ao carregar ForeignObject"))},f.src=u});let y=document.createElement("canvas");y.width=p,y.height=b;let h=y.getContext("2d",{alpha:!1});if(h){h.fillStyle=n,h.fillRect(0,0,p,b),h.drawImage(f,0,0,p,b);let g=await new Promise(v=>y.toBlob(v,"image/jpeg",.9));if(g){let v=await re(g);if(v&&v.length<=$e)return{mediaType:"image/jpeg",base64:v,alt:o.getAttribute("aria-label")||"Captura visual da \xE1rea (print-like)",source:"element_snapshot",captureStatus:"captured",textContext:pe(o)}}}}finally{URL.revokeObjectURL(u)}}catch(e){console.warn("[EasyQuiz] Snapshot visual do n\xF3:",e)}return null}function Ft(o,e,t,a){if(t<=0||a<=0){let c=typeof o.getBoundingClientRect=="function"?o.getBoundingClientRect():{width:0,height:0};if(t=c.width||t,a=c.height||a,t<=0||a<=0){if(e&&/\b(icon|logo|avatar|badge|emoji|spinner|loading)\b/i.test(e))return!1;let u=o instanceof HTMLImageElement&&o.src||"";return u&&/\/icons?\/|\/logos?\/|\/avatars?\/|\/badges?\//i.test(u)?!1:!!(u||e)}}if(t<48||a<48||Math.max(t,a)/Math.max(1,Math.min(t,a))>15)return!1;let n=o.getAttribute("class")||"",s=o.getAttribute("aria-hidden"),i=o.getAttribute("role"),d=o instanceof HTMLImageElement&&o.src||"";if(s==="true"||i==="presentation"||i==="none")return!1;let l=/\b(icon|logo|avatar|badge|emoji|decoration|ornament|spinner|loading|thumbnail|profile|photo)\b/i;if(l.test(n)||e&&l.test(e)||d&&/\/icons?\/|\/logos?\/|\/avatars?\/|\/badges?\/|\/emojis?\//i.test(d)||e===""||e===" "||e==="-")return!1;let p=/\b(graph|chart|diagram|table|map|formula|equation|figure|plot|curve|histogram|scatter|matrix|image|foto|imagem|gráfico|tabela|mapa|fórmula|questão|enunciado|stimulus)\b/i;return p.test(e)||p.test(n)||o.closest('[data-question], [class*="question" i], [class*="prompt" i], [class*="stimulus" i], [class*="enunciado" i], [class*="statement" i], article, .problem, .exercise')?!0:t>=80&&a>=80}function pe(o){let e=[],t=o.getAttribute("alt")||o.getAttribute("aria-label")||o.getAttribute("title")||"";t&&t.length>2&&e.push(`Alt: "${t}"`);let n=o.closest("figure")?.querySelector("figcaption")?.textContent?.trim();n&&n.length>2&&e.push(`Legenda: "${n}"`);let s=o.getAttribute("aria-describedby");if(s){let p=document.getElementById(s)?.textContent?.trim();p&&e.push(`Descri\xE7\xE3o: "${p.slice(0,200)}"`)}let i=o.parentElement;if(i){let l=R(i.textContent||"",300);l&&l.length>5&&l!==t&&e.push(`Contexto: "${l.slice(0,200)}"`)}if(o.tagName.toLowerCase()==="svg"){let l=Array.from(o.querySelectorAll("text, tspan")).map(p=>p.textContent?.trim()).filter(Boolean);l.length>0&&e.push(`R\xF3tulos/Textos do Gr\xE1fico: "${l.join(" | ")}"`)}let d=o.getAttribute("data-alt")||o.getAttribute("data-description")||"";return d&&e.push(`Data: "${d}"`),e.length===0?"":e.join(" | ")}async function To(o){let e=o.currentSrc||o.src;if(!e)return null;let t=(o.alt||o.getAttribute("aria-label")||"Imagem da quest\xE3o").slice(0,500);if(o.complete&&o.naturalWidth>0)try{let s=await ye(o),i=await re(s);if(i&&i.length<=$e)return{mediaType:"image/jpeg",base64:i,alt:t,source:e.slice(0,2e3),captureStatus:"captured",textContext:pe(o)}}catch{}try{let s=await fetch(e,{mode:"cors"});if(s.ok){let i=await s.blob();if(i.type.startsWith("image/")){let d=await createImageBitmap(i),l=await ye(d);d.close();let p=await re(l);if(p&&p.length<=$e)return{mediaType:"image/jpeg",base64:p,alt:t,source:e.slice(0,2e3),captureStatus:"captured",textContext:pe(o)}}}}catch{}if(e.startsWith("http")){let s=[`https://corsproxy.io/?${encodeURIComponent(e)}`,`https://api.allorigins.win/raw?url=${encodeURIComponent(e)}`],i=async d=>{let l=new AbortController,p=setTimeout(()=>l.abort(),1500);try{let b=await fetch(d,{signal:l.signal});if(clearTimeout(p),b.ok)return b;throw new Error("Proxy status "+b.status)}catch(b){throw clearTimeout(p),b}};try{let l=await(await Promise.any(s.map(i))).blob();if(l.type.startsWith("image/")||l.size>200){let p=await createImageBitmap(l),b=await ye(p);p.close();let c=await re(b);if(c&&c.length<=$e)return{mediaType:"image/jpeg",base64:c,alt:t,source:e.slice(0,2e3),captureStatus:"captured",textContext:pe(o)}}}catch{}}let a=o.parentElement||o,r=await ft(a);if(r)return r;let n=pe(o);return n||t?{mediaType:"image/jpeg",base64:"",alt:t,source:e.slice(0,2e3),captureStatus:"text_only",textContext:n||`Imagem da quest\xE3o (src: ${e.slice(0,100)})`}:null}function Ao(o){return o.querySelectorAll("path, line, polyline, polygon, circle, rect, text, image").length>0}function So(o){try{let e=o.style.backgroundImage||(window.getComputedStyle?window.getComputedStyle(o).backgroundImage:"");if(e&&e.includes("url(")){let t=e.match(/url\(["']?([^"')]+)["']?\)/);if(t&&t[1]&&!t[1].startsWith("data:image/svg+xml"))return t[1]}}catch{}return null}function Lo(o,e){let t=o.closest('[data-easyquiz-id], button, [role="button"], [role="radio"], [role="checkbox"], [role="option"], label, .option-card, .quiz-option, .choice, .answer, [class*="option" i], [class*="choice" i], [class*="answer" i], li, tr');if(t&&t!==e&&k(t)&&!J(t)&&!V(t)){let n=t.dataset.easyquizId||t.id||void 0,s=R(t.innerText||t.textContent||"",120),i=t.getAttribute("aria-label")||t.getAttribute("title")||"",d=s||i,l=n?` [id: ${n}]`:"";if(d)return{associatedLabel:`Alternativa/Op\xE7\xE3o: "${d}"${l}`,targetControlId:n};if(n)return{associatedLabel:`Alternativa/Op\xE7\xE3o ${l}`,targetControlId:n}}let a=o.closest("figure")?.querySelector("figcaption")?.textContent?.trim();if(a)return{associatedLabel:`Figura do Enunciado: "${R(a,100)}"`};let r=o.closest('[class*="prompt" i], [class*="stimulus" i], [class*="question-text" i], [class*="statement" i], header, h1, h2, h3, h4, p');if(r){let n=R(r.textContent||"",80);if(n)return{associatedLabel:`Gr\xE1fico do Enunciado: "${n}"`}}return{associatedLabel:"Gr\xE1fico/Imagem do Enunciado Principal"}}async function bt(o,e=!0){if(!e)return[];let t=[],a=0,r=35e5,n=(p,b)=>{if(!p)return!1;let c=p.base64?p.base64.length:0;if(c>0&&a+c>r)return!1;let m=Lo(b,o);return p.associatedLabel=m.associatedLabel,p.targetControlId=m.targetControlId,p.element=b,t.push(p),a+=c,t.filter(f=>f.captureStatus==="captured").length>=gt},s=[o],i=o.closest('article, .card, [class*="question" i], [class*="exercise" i], form, [data-test-id*="exercise" i], [data-testid*="exercise" i]');i&&i!==o&&i!==document.body&&k(i)&&s.push(i);let d=new Set;for(let p of s){let b=Array.from(p.querySelectorAll("img")).filter(c=>k(c)&&!V(c)&&!d.has(c));for(let c of b){d.add(c);try{let m=c.getBoundingClientRect(),u=c.naturalWidth||m.width||c.width||0,f=c.naturalHeight||m.height||c.height||0,y=c.alt||"";if(!Ft(c,y,u,f))continue;let h=await To(c);if(n(h,c))return t}catch{}}}let l=new Set;for(let p of s){let b=Array.from(p.querySelectorAll("svg")).filter(c=>{if(!k(c)||V(c)||l.has(c))return!1;let m=typeof c.getBoundingClientRect=="function"?c.getBoundingClientRect():{width:0,height:0},u=m.width||parseFloat(c.getAttribute("width")||"0"),f=m.height||parseFloat(c.getAttribute("height")||"0");return u<30||f<30?!1:Ao(c)});for(let c of b){l.add(c);try{let m=await Gt(c);if(m.base64){let u=pe(c),f={mediaType:m.mediaType,base64:m.base64,alt:c.getAttribute("aria-label")||"Gr\xE1fico/Diagrama vetorial da quest\xE3o",source:"svg",captureStatus:"captured",textContext:u};if(n(f,c))return t}}catch{let m=c.closest('.trig-diagram-container, [class*="diagram" i], [class*="graph" i], figure')||c.parentElement||c,u=await ft(m);if(u){if(n(u,c))return t}else{let f=pe(c);if(f){let y={mediaType:"image/jpeg",base64:"",alt:c.getAttribute("aria-label")||"Gr\xE1fico vetorial",source:"svg",captureStatus:"text_only",textContext:f};n(y,c)}}}}}if(t.filter(p=>p.captureStatus==="captured").length<gt){let p=Array.from(o.querySelectorAll("canvas")).filter(b=>k(b)&&!V(b));for(let b of p)try{let c=await ye(b),m=await re(c);if(m){let u={mediaType:"image/jpeg",base64:m,alt:b.getAttribute("aria-label")||"Gr\xE1fico Canvas inline",source:"canvas",captureStatus:"captured"};if(n(u,b))return t}}catch{let c=await ft(b.parentElement||b);if(n(c,b))return t}}if(t.filter(p=>p.captureStatus==="captured").length<gt){let p=Array.from(o.querySelectorAll('[style*="background-image"], .option-image, .question-media')).filter(b=>k(b)&&!V(b));for(let b of p){let c=So(b);if(!c)continue;let m=b.getBoundingClientRect();if(Ft(b,b.getAttribute("aria-label")||"",m.width,m.height))try{let u=await fetch(c,{mode:"cors"});if(u.ok){let f=await u.blob();if(f.type.startsWith("image/")){let y=await createImageBitmap(f),h=await ye(y);y.close();let g=await re(h);if(g){let v={mediaType:"image/jpeg",base64:g,alt:"Imagem de fundo da alternativa",source:c.slice(0,2e3),captureStatus:"captured"};if(n(v,b))return t}}}}catch{try{let f=await(await fetch(c,{mode:"no-cors"})).blob();if(f.size>100){let y=await createImageBitmap(f),h=await ye(y);y.close();let g=await re(h);if(g&&g.length>100){let v={mediaType:"image/jpeg",base64:g,alt:"Imagem CSS background",source:c.slice(0,2e3),captureStatus:"captured"};if(n(v,b))return t}}}catch{}}}}return t}function Mo(o,e=""){if(typeof document>"u")return!1;let t=o||document.body,a=(e+" "+(t.textContent||"")).toLowerCase();return!!t.querySelector('.celebration-icon, [class*="celebrat" i], [class*="conclu" i], [class*="finish" i], [class*="result" i], [class*="score-screen" i], [data-testid*="completion" i], [data-functional-selector*="game-over" i], .perseus-message-renderer, [data-congratulations]')&&(a.includes("parab\xE9ns")||a.includes("conclu")||a.includes("finaliz")||a.includes("resultado")||a.includes("pontua")||a.includes("sucesso")||a.includes("\u{1F3C6}")||a.includes("game over")||a.includes("great job"))?!0:["parab\xE9ns! lista de exerc\xEDcios conclu\xEDda","exerc\xEDcios conclu\xEDda","lista de exerc\xEDcios conclu\xEDda","atividade conclu\xEDda","atividade finalizada","finalizado com sucesso","finalizada com sucesso","simulado conclu\xEDdo","simulado finalizado","question\xE1rio conclu\xEDdo","question\xE1rio finalizado","voc\xEA concluiu a atividade","voc\xEA concluiu o question\xE1rio","sua resposta foi registrada","todas as perguntas foram respondidas","quiz completed","exercise completed","activity completed","all questions answered","view results","game over","leaderboard","scoreboard","awesome","great job","you got it right","mission complete","your response has been recorded","sua resposta foi registrada"].some(s=>a.includes(s))}var Ue=class{active=!1;callbacks;isProcessing=!1;observer=null;mutationTimer=null;heartbeatTimer=null;abortController=null;errorCount=0;resolvedSigs=new Set;lastContentSig="";lastAttemptSig="";lastAttemptTime=0;replanCount=new Map;constructor(e){this.callbacks=e}isActive(){return this.active}start(){this.active||(this.active=!0,this.callbacks.onStatusChange("waiting","> [SYS] Autopilot ENGAGED. Monitorando..."),typeof MutationObserver<"u"&&(this.observer=new MutationObserver(()=>{!this.active||this.isProcessing||(this.mutationTimer&&clearTimeout(this.mutationTimer),this.mutationTimer=window.setTimeout(()=>{this.mutationTimer=null,this.isProcessing||this.checkAndAnalyze()},120))}),this.observer.observe(document.body,{subtree:!0,childList:!0,characterData:!0,attributes:!0})),this.scheduleHeartbeat(),this.checkAndAnalyze())}stop(){if(this.active=!1,this.abortController){try{this.abortController.abort()}catch{}this.abortController=null}this.mutationTimer&&(clearTimeout(this.mutationTimer),this.mutationTimer=null),this.heartbeatTimer&&(clearTimeout(this.heartbeatTimer),this.heartbeatTimer=null),this.observer?.disconnect(),this.observer=null,this.isProcessing=!1,this.resolvedSigs.clear(),this.replanCount.clear(),this.callbacks.onStatusChange("idle","> [SYS] Autopilot DESATIVADO pelo usu\xE1rio.","text-yellow")}scheduleHeartbeat(){this.heartbeatTimer&&clearTimeout(this.heartbeatTimer),this.heartbeatTimer=window.setTimeout(()=>{this.heartbeatTimer=null,this.active&&!this.isProcessing&&this.checkAndAnalyze(),this.active&&this.scheduleHeartbeat()},3e3)}sleep(e){return new Promise(t=>{if(!this.active)return t();let a=null,r=()=>{a&&clearTimeout(a),t()};a=window.setTimeout(t,e),this.abortController?.signal.addEventListener("abort",r,{once:!0})})}async checkAndAnalyze(){if(!(!this.active||this.isProcessing))try{this.isProcessing=!0;let e=be(!1);if(e||(e=ce()),!this.active)return;if(!e){this.callbacks.onStatusChange("waiting","> [SYS] Monitorando p\xE1gina... Aguardando elementos.");return}if(Mo(e.scope,e.questionText)){this.callbacks.onStatusChange("idle","> [SYS] \u{1F3C6} Atividade conclu\xEDda! Autopilot finalizado.","text-green"),this.stop();return}if(this.callbacks.isManualModeActive?.()){this.callbacks.onStatusChange("waiting","> [SYS] Gabarito manual ativo. Aguardando voc\xEA avan\xE7ar...","text-yellow");return}let t=Nt(e);if(this.resolvedSigs.has(t))return;let a=Date.now();if(t===this.lastAttemptSig&&a-this.lastAttemptTime<1500)return;t!==this.lastContentSig&&this.lastContentSig!==""&&(this.callbacks.onStatusChange("waiting","> [SYS] Nova quest\xE3o detectada! Analisando...","text-green"),this.callbacks.onPageAdvance?.(),this.errorCount=0),this.lastContentSig=t,this.lastAttemptSig=t,this.lastAttemptTime=a;let n=e.controls.filter(i=>i.role==="answer"),s=Ce(window.location.hostname);if(n.length===0)for(let i=0;i<3;i++){if(await this.sleep(300),!this.active)return;let d=be(!1)||ce();if(d&&d.controls.filter(l=>l.role==="answer").length>0){e=d,n=e.controls.filter(l=>l.role==="answer");break}}if(n.length>0){if(this.callbacks.onStatusChange("analyzing","> [IA] Quest\xE3o detectada. Consultando IA...","text-blue"),!this.active)return;this.abortController=new AbortController;let i=await this.callbacks.onRequestAnalysis(1,this.abortController.signal);if(this.abortController=null,!this.active)return;if(i){if(this.callbacks.onStatusChange("analyzing",`> [IA] (${i.usedModel||"gemini"}) Confian\xE7a: ${(i.confidence*100).toFixed(1)}% | Modo: ${i.mode}`,"text-blue"),this.callbacks.onStatusChange("analyzing",`> [IA] Racioc\xEDnio: ${i.rationale}`,"text-blue"),this.callbacks.onStatusChange("analyzing",`> [IA] A\xE7\xF5es: ${i.actions.length}`,"text-blue"),this.errorCount=0,i.memoryToStore&&this.callbacks.onStatusChange("analyzing",`> [IA] \u{1F9E0} Mem\xF3ria RAG: "${i.memoryToStore}"`,"text-yellow"),i.pageType==="conclusion"){this.callbacks.onStatusChange("idle","> [SYS] Atividade conclu\xEDda! Desligando Autopilot.","text-green"),this.stop();return}let d=(this.replanCount.get(t)||0)+1;this.replanCount.set(t,d),(i.actions.length>0||d>=3)&&this.resolvedSigs.add(t)}else{this.errorCount++;let d=this.errorCount===1?5e3:8e3;this.callbacks.onStatusChange("waiting",`> [AVISO] Falha na an\xE1lise (${this.errorCount}). Aguardando ${d/1e3}s...`,"text-yellow"),await this.sleep(d),this.lastAttemptTime=0}}else{if(this.callbacks.onStatusChange("analyzing","> [IA] P\xE1gina informativa ou texto de leitura. Consultando IA...","text-blue"),!this.active)return;this.abortController=new AbortController;let i=await this.callbacks.onRequestAnalysis(1,this.abortController.signal);if(this.abortController=null,!this.active)return;if(i){if(this.callbacks.onStatusChange("analyzing",`> [IA] (${i.usedModel||"gemini"}) Tipo: ${i.pageType} | Modo: ${i.mode}`,"text-blue"),this.callbacks.onStatusChange("analyzing",`> [IA] Racioc\xEDnio: ${i.rationale}`,"text-blue"),i.memoryToStore&&this.callbacks.onStatusChange("analyzing",`> [IA] \u{1F9E0} Absorvido: "${i.memoryToStore}"`,"text-yellow"),i.pageType==="conclusion"){this.callbacks.onStatusChange("idle","> [SYS] Atividade conclu\xEDda! Desligando Autopilot.","text-green"),this.stop();return}i.pageType==="info"?(this.callbacks.onStatusChange("advancing","> [IA] \u{1F4D6} Leitura conclu\xEDda. Avan\xE7ando com seguran\xE7a...","text-green"),await this.sleep(500)):i.pageType==="start"&&(this.callbacks.onStatusChange("advancing","> [SYS] In\xEDcio detectado. Iniciando...","text-blue"),await this.sleep(500)),this.errorCount=0,i.actions.length>0&&this.resolvedSigs.add(t)}else{this.errorCount++;let d=this.errorCount===1?5e3:8e3;this.callbacks.onStatusChange("waiting",`> [AVISO] Falha ao processar p\xE1gina (${this.errorCount}). Aguardando ${d/1e3}s...`,"text-yellow"),await this.sleep(d),this.lastAttemptTime=0}}this.errorCount>=5&&(this.callbacks.onStatusChange("waiting","> [AVISO] Muitas falhas. Reiniciando contadores e aguardando 15s...","text-yellow"),this.errorCount=0,this.lastAttemptTime=0,await this.sleep(15e3))}catch(e){if(!this.active)return;let t=e instanceof Error?e.message:String(e);if(t.includes("cancelada")||t.includes("aborted"))return;/timeout|aborted|network|failed to fetch|cancelad/i.test(t)||this.errorCount++,console.warn("[EasyQuiz Autopilot]",e),this.callbacks.onStatusChange("error",`> [ERRO NO AUTOPILOT] ${t}`,"text-red")}finally{this.abortController=null,this.isProcessing=!1,this.active&&window.setTimeout(()=>void this.checkAndAnalyze(),800)}}};var A={logo:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.8L19.2 8 12 11.2 4.8 8 12 4.8zM4 9.6l7 3.1v7.5l-7-3.5V9.6zm9 10.6v-7.5l7-3.1v7.1l-7 3.5z"/></svg>',rocket:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M13.13 2.81a.5.5 0 0 0-.46-.07c-.42.15-2.08.79-3.9 2.61-2.04 2.04-2.6 4.09-2.73 4.96l-.97.98a1 1 0 0 0-.29.71v2.12a1 1 0 0 0 .29.71l2.83 2.83a1 1 0 0 0 .71.29h2.12a1 1 0 0 0 .71-.29l.98-.97c.87-.13 2.92-.69 4.96-2.73 1.82-1.82 2.46-3.48 2.61-3.9a.5.5 0 0 0-.07-.46l-6.79-6.79zM4.5 16.5l-2.09 2.09a.5.5 0 0 0 .35.85h3.04l.35.35v3.04a.5.5 0 0 0 .85.35L9.09 21.1l-4.59-4.6z"/></svg>',play:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>',stop:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h12v12H6z"/></svg>',code:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>',terminal:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8h16v10zm-12-3l3-3-3-3 1.4-1.4L13.8 12l-4.4 4.4L8 15zm6 0h4v2h-4v-2z"/></svg>',inspector:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>',settings:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.49.49 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>',key:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M7 14c-2.76 0-5-2.24-5-5s2.24-5 5-5c2.42 0 4.44 1.72 4.9 4H22v4h-2v3h-3v-3h-2v3h-3v-3h-2.1c-.46 2.28-2.48 4-4.9 4zm0-7c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>',paste:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 2h-4.18C14.4 .84 13.3 0 12 0c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm7 18H5V4h2v3h10V4h2v16z"/></svg>',edit:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>',trash:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>',eraser:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M15.14 3c-.51 0-1.02.2-1.41.59L2.59 14.73c-.78.78-.78 2.05 0 2.83L6.44 21.4c.78.78 2.05.78 2.83 0l11.14-11.14c.78-.78.78-2.05 0-2.83l-3.86-3.84c-.39-.39-.9-.59-1.41-.59zm.71 2.71l3.15 3.15-3.15 3.15-3.15-3.15 3.15-3.15zm-4.57 4.57l3.15 3.15-4.57 4.57H6.71l-3-3 7.57-7.57z"/></svg>',save:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/></svg>',analyze:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L3 14h8l-2 8 12-12h-8l2-8z"/></svg>',apply:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>',close:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>',chevronRight:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>',chevronLeft:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>',eye:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>',eyeOff:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.44-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.17c0-1.66-1.34-3-3-3l-.17.02z"/></svg>',check:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>',clock:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>',copy:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>',refresh:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg>',chip:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4h12v16H6V4zm2 2v12h8V6H8zm-4 3h2v2H4V9zm0 4h2v2H4v-2zm16-4h2v2h-2V9zm0 4h2v2h-2v-2zM9 2h2v2H9V2zm4 0h2v2h-2V2zm-4 18h2v2H9v-2zm4 0h2v2h-2v-2z"/></svg>',moreVertical:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>',minimize:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M19 13H5v-2h14v2z"/></svg>',maximize:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/></svg>',dragHandle:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M10 9h4V6h-4v3zm0 5h4v-3h-4v3zm0 5h4v-3h-4v3zM4 9h4V6H4v3zm0 5h4v-3H4v3zm0 5h4v-3H4v3zm12-10V6h4v3h-4zm0 5h4v-3h-4v3zm0 5h4v-3h-4v3z"/></svg>',list:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/></svg>',folderTree:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6 10H6v-2h8v2zm4-4H6v-2h12v2z"/></svg>',folder:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/></svg>',file:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>',stopwatch:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M15 1H9v2h6V1zm-4 13h2V8h-2v6zm8.03-6.61l1.42-1.42c-.43-.51-.9-.99-1.41-1.41l-1.42 1.42A8.962 8.962 0 0 0 12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9a8.994 8.994 0 0 0 7.03-14.61zM12 20c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"/></svg>',plus:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>',listPlus:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h8v-2H7v2zm0 4h8v-2H7v2zM7 7v2h8V7H7zm11 6h-2v2h-2v2h2v2h2v-2h2v-2h-2v-2z"/></svg>',sparkles:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M9 21l-2.5-5.5L1 13l5.5-2.5L9 5l2.5 5.5L17 13l-5.5 2.5L9 21zm9.5-12.5l-1.5-3.5-3.5-1.5 3.5-1.5 1.5-3.5 1.5 3.5 3.5 1.5-3.5 1.5-1.5 3.5z"/></svg>',image:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>'};var Fe=class{element=null;shadow;isMinimized=!1;currentPlan=null;isDragging=!1;dragStartX=0;dragStartY=0;initialLeft=25;initialTop=25;onAdvanceCallback;constructor(e,t){this.shadow=e,this.onAdvanceCallback=t,this.initGlobalListeners()}initGlobalListeners(){window.addEventListener("popstate",()=>this.handlePageNavigated()),window.addEventListener("hashchange",()=>this.handlePageNavigated()),document.addEventListener("click",e=>{if(!this.isOpen())return;let t=e.target;if(!t||this.shadow.contains(t)||t.closest("#easyquiz-shadow-root"))return;let a=t.closest('button, [role="button"], a, input[type="submit"]');if(a){let r=(a.textContent||a.value||"").toLowerCase();/pr[oó]xim|avan[cç]|continu|verific|enviar|submit|confirm|checar|validar|next/i.test(r)&&setTimeout(()=>{this.isOpen()&&this.handlePageNavigated()},800)}},!0)}handlePageNavigated(){this.isOpen()&&(this.hide(),this.onAdvanceCallback?.())}isOpen(){return this.element!==null&&this.element.style.display!=="none"}show(e){this.currentPlan=e,this.element||this.createElement(),this.renderContent(),this.element&&(this.element.style.display="flex")}hide(){this.element&&(this.element.style.display="none")}minimize(){this.isMinimized=!0,this.element&&this.element.classList.add("minimized")}restore(){this.isMinimized=!1,this.element&&this.element.classList.remove("minimized")}createElement(){this.element=document.createElement("div"),this.element.className="eq-floating-hud",this.element.style.left=`${this.initialLeft}px`,this.element.style.top=`${this.initialTop}px`,this.element.innerHTML=`
      <!-- P\xEDlula compacta quando minimizado -->
      <div class="eq-fah-pill" id="eq-fah-pill" title="Clique para expandir gabarito interativo">
        <span class="eq-fah-pill-icon">${A.list}</span>
        <span id="eq-fah-pill-text">Gabarito Manual</span>
        <span class="eq-fah-pill-badge" id="eq-fah-pill-badge">0</span>
      </div>

      <!-- Cabe\xE7alho com barra de arraste -->
      <div class="eq-fah-header" id="eq-fah-header">
        <div class="eq-fah-title">
          <span style="display:flex; align-items:center;">${A.dragHandle}</span>
          <span>Gabarito Manual Interativo</span>
        </div>
        <div class="eq-fah-actions">
          <button class="eq-fah-btn" id="eq-fah-copy-md-btn" title="Copiar tudo formatado em Markdown">${A.copy}</button>
          <button class="eq-fah-btn" id="eq-fah-min-btn" title="Minimizar para p\xEDlula flutuante">${A.minimize}</button>
          <button class="eq-fah-btn" id="eq-fah-close-btn" title="Fechar gabarito">${A.close}</button>
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
    `,this.shadow.appendChild(this.element),this.element.querySelector("#eq-fah-pill").addEventListener("click",()=>this.restore()),this.element.querySelector("#eq-fah-min-btn").addEventListener("click",()=>this.minimize()),this.element.querySelector("#eq-fah-close-btn").addEventListener("click",()=>this.hide());let r=this.element.querySelector("#eq-fah-copy-md-btn");r.addEventListener("click",()=>this.copyMarkdownToClipboard(r));let n=this.element.querySelector("#eq-fah-copy-all-btn");n.addEventListener("click",()=>this.copyMarkdownToClipboard(n));let s=this.element.querySelector("#eq-fah-header");this.setupDraggable(s)}setupDraggable(e){let t=a=>{if(a.target.closest(".eq-fah-btn"))return;a.preventDefault(),this.isDragging=!0,this.dragStartX=a.clientX,this.dragStartY=a.clientY;let r=this.element.getBoundingClientRect();this.initialLeft=r.left,this.initialTop=r.top;let n=i=>{if(!this.isDragging||!this.element)return;let d=i.clientX-this.dragStartX,l=i.clientY-this.dragStartY,p=Math.max(10,window.innerWidth-this.element.offsetWidth-10),b=Math.max(10,window.innerHeight-this.element.offsetHeight-10),c=Math.min(Math.max(10,this.initialLeft+d),p),m=Math.min(Math.max(10,this.initialTop+l),b);this.element.style.left=`${c}px`,this.element.style.top=`${m}px`},s=()=>{this.isDragging=!1,window.removeEventListener("mousemove",n),window.removeEventListener("mouseup",s)};window.addEventListener("mousemove",n),window.addEventListener("mouseup",s)};e.addEventListener("mousedown",t)}renderContent(){if(!this.element||!this.currentPlan)return;let e=this.element.querySelector("#eq-fah-body"),t=this.element.querySelector("#eq-fah-pill-text"),a=this.element.querySelector("#eq-fah-pill-badge");e.innerHTML="";let r=this.currentPlan,n=r.actions.filter(m=>m.t==="drag"),s=r.actions.filter(m=>{if(m.t!=="val")return!1;let u=q(m.id||"").toLowerCase();return!/continu|avan[cç]|pr[oó]xim|submet|enviar|check|verific/i.test(u)}),i=r.actions.filter(m=>m.t==="clk"||m.t==="chk"),d=r.actions.filter(m=>m.t==="sel"),l=n.length||s.length||i.length||d.length,p=document.createElement("div");p.className="eq-fah-meta";let b=document.createElement("span");b.textContent=`Modo: ${r.mode.replace("_"," ")}`;let c=document.createElement("span");if(c.className="eq-fah-meta-badge",c.textContent=`${Math.round(r.confidence*100)}% Confian\xE7a`,p.append(b,c),e.appendChild(p),n.length>0||r.mode==="categorizacao"||r.mode==="arrastar_soltar"){t.textContent=`Categoriza\xE7\xE3o (${n.length} itens)`,a.textContent=String(n.length);let m={};for(let u of n){let f=q(u.to)||"Geral";m[f]||(m[f]=[]),m[f].push(q(u.from))}for(let[u,f]of Object.entries(m)){let y=document.createElement("div"),h=/fato|true|verdadeiro|sim/i.test(u),g=/opini[aã]o|false|falso|n[aã]o/i.test(u);y.className=`eq-fah-group ${h?"group-fato":g?"group-opiniao":""}`;let v=document.createElement("div");v.className="eq-fah-group-title",v.textContent=`\u{1F4C1} ${u} (${f.length})`,y.appendChild(v);let w=document.createElement("div");w.className="eq-fah-group-items";for(let C of f){let M=document.createElement("div");M.className="eq-fah-item";let S=document.createElement("span");S.className="eq-fah-item-text",S.textContent=C,M.appendChild(S);let x=document.createElement("button");x.className="eq-fah-copy-inline",x.textContent="Copiar",x.addEventListener("click",()=>{navigator.clipboard.writeText(C),x.textContent="\u2713 Copiado",setTimeout(()=>x.textContent="Copiar",1200)}),M.appendChild(x),w.appendChild(M)}y.appendChild(w),e.appendChild(y)}}else if(s.length>0){t.textContent=`Preenchimento (${s.length} campos)`,a.textContent=String(s.length);let m=document.createElement("div");m.className="eq-fah-group";let u=document.createElement("div");u.className="eq-fah-group-title",u.textContent="\u{1F4DD} Respostas para os Campos de Texto:",m.appendChild(u);let f=document.createElement("div");f.className="eq-fah-group-items";for(let y=0;y<s.length;y++){let h=s[y],g=document.createElement("div");g.className="eq-fah-item";let v=Ie(h.id);(!v||/^[#\.\$]|input|mat-|cell|field|q[0-9]|eq-/i.test(v))&&(v=`Campo ${y+1}`);let w=String(h.v??""),C=document.createElement("div");C.className="eq-fah-field-box";let M=document.createElement("div");M.className="eq-fah-field-label",M.textContent=v,C.appendChild(M);let S=document.createElement("div");S.className="eq-fah-field-val",S.textContent=w,C.appendChild(S),g.appendChild(C);let x=document.createElement("button");x.className="eq-fah-copy-inline",x.textContent="Copiar",x.addEventListener("click",()=>{navigator.clipboard.writeText(w),x.textContent="\u2713 Copiado",setTimeout(()=>x.textContent="Copiar",1200)}),g.appendChild(x),f.appendChild(g)}m.appendChild(f),e.appendChild(m)}else if(i.length>0){t.textContent=`Op\xE7\xF5es (${i.length} marcadas)`,a.textContent=String(i.length);let m=document.createElement("div");m.className="eq-fah-group";let u=document.createElement("div");u.className="eq-fah-group-title",u.textContent="\u{1F3AF} Alternativa(s) Correta(s):",m.appendChild(u);let f=document.createElement("div");f.className="eq-fah-group-items";for(let y=0;y<i.length;y++){let h=i[y],g=document.createElement("div");g.className="eq-fah-item";let v=Ie(h.id);(!v||/^(eq-|#|\$|\.|input_|mat-|choice_|radio_|chk_)/i.test(v))&&h.v&&(v=String(h.v)),v=q(v),/^(eq-|#|\$|\.|input_|mat-|choice_|radio_|chk_)/i.test(v)&&(v="");let w="",C=v.match(/^(\([A-Za-z0-9]\)|[A-Za-z0-9][\)\.\:\-])\s*(.*)$/);C?(w=C[1].replace(/[\(\)\.\:\-\s]/g,"").toUpperCase(),v=C[2].trim()||v):i.length>1&&(w=String.fromCharCode(65+y));let M=document.createElement("div");if(M.style.display="flex",M.style.alignItems="center",M.style.gap="8px",M.style.flex="1",w){let T=document.createElement("span");T.className="eq-fah-letter-badge",T.textContent=w,M.appendChild(T)}let S=document.createElement("span");S.className="eq-fah-item-text",S.textContent=v||(w?`Alternativa ${w}`:"Alternativa Selecionada"),M.appendChild(S),g.appendChild(M);let x=document.createElement("button");x.className="eq-fah-copy-inline",x.textContent="Copiar",x.addEventListener("click",()=>{navigator.clipboard.writeText(v||w),x.textContent="\u2713 Copiado",setTimeout(()=>x.textContent="Copiar",1200)}),g.appendChild(x),f.appendChild(g)}m.appendChild(f),e.appendChild(m)}else if(d.length>0){t.textContent=`Sele\xE7\xE3o (${d.length} listas)`,a.textContent=String(d.length);let m=document.createElement("div");m.className="eq-fah-group";let u=document.createElement("div");u.className="eq-fah-group-title",u.textContent="\u{1F4CB} Op\xE7\xF5es para Selecionar na Lista:",m.appendChild(u);let f=document.createElement("div");f.className="eq-fah-group-items";for(let y=0;y<d.length;y++){let h=d[y],g=document.createElement("div");g.className="eq-fah-item";let v=Ie(h.id);(!v||/^[#\.\$]|select|input|mat-|cell|field|q[0-9]|eq-/i.test(v))&&(v=`Lista ${y+1}`);let M=(Array.isArray(h.v)?h.v:[String(h.v??"")]).map($=>{let E=I(h.id,void 0,!0)||I(q(h.id),void 0,!0),H=E instanceof HTMLSelectElement?E:E?.querySelector("select");if(H){let O=q($).toLowerCase();for(let _=0;_<H.options.length;_++){let N=H.options[_];if(N.value.toLowerCase()===O||q(N.textContent).toLowerCase()===O){let D=q(N.textContent);if(D&&!D.toLowerCase().includes("selecione"))return D}}}return $}).join(", "),S=document.createElement("div");S.className="eq-fah-field-box";let x=document.createElement("div");x.className="eq-fah-field-label",x.textContent=v,S.appendChild(x);let T=document.createElement("div");T.className="eq-fah-field-val",T.textContent=M,S.appendChild(T),g.appendChild(S);let L=document.createElement("button");L.className="eq-fah-copy-inline",L.textContent="Copiar",L.addEventListener("click",()=>{navigator.clipboard.writeText(M),L.textContent="\u2713 Copiado",setTimeout(()=>L.textContent="Copiar",1200)}),g.appendChild(L),f.appendChild(g)}m.appendChild(f),e.appendChild(m)}else{t.textContent="Gabarito",a.textContent="0";let m=document.createElement("div");m.style.padding="10px",m.style.color="#888",m.textContent="Nenhuma resposta direta para exibir.",e.appendChild(m)}if(r.rationale){let m=document.createElement("div");m.className="eq-fah-rationale",m.textContent=`\u{1F4A1} Racioc\xEDnio da IA: ${r.rationale}`,e.appendChild(m)}}generateMarkdown(){if(!this.currentPlan)return"";let e=this.currentPlan,t=[];t.push("# Gabarito da Quest\xE3o \u2014 EasyQuiz Pro"),t.push(`- **Modo:** ${e.mode}`),t.push(`- **Confian\xE7a:** ${(e.confidence*100).toFixed(0)}%`),t.push("");let a=e.actions.filter(i=>i.t==="drag"),r=e.actions.filter(i=>i.t==="val"),n=e.actions.filter(i=>i.t==="clk"||i.t==="chk"),s=e.actions.filter(i=>i.t==="sel");if(a.length>0){t.push("## \u{1F4C2} Categoriza\xE7\xE3o:");let i={};for(let d of a){let l=q(d.to)||"Geral";i[l]||(i[l]=[]),i[l].push(q(d.from))}for(let[d,l]of Object.entries(i)){t.push(`### Categoria: ${d}`);for(let p of l)t.push(`- ${p}`);t.push("")}}else if(r.length>0){t.push("## \u270F\uFE0F Respostas para Preenchimento:");for(let i of r){let d=q(i.id);t.push(`- **${d||"Campo"}:** \`${i.v}\``)}t.push("")}else if(n.length>0){t.push("## \u2705 Alternativas Corretas:");for(let i=0;i<n.length;i++){let d=n[i],l=Ie(d.id);(!l||/^(eq-|#|\$|\.|input_|mat-|choice_|radio_|chk_)/i.test(l))&&d.v&&(l=String(d.v)),l=q(l),/^(eq-|#|\$|\.|input_|mat-|choice_|radio_|chk_)/i.test(l)&&(l="");let p=n.length>1?`${String.fromCharCode(65+i)}) `:"";t.push(`- [x] ${p}${l||"Alternativa "+String.fromCharCode(65+i)}`)}t.push("")}else if(s.length>0){t.push("## \u{1F4CB} Op\xE7\xF5es Selecionadas em Lista:");for(let i of s){let d=q(i.id)||"Lista",l=Array.isArray(i.v)?i.v.join(", "):String(i.v??"");t.push(`- **${d}:** \`${l}\``)}t.push("")}return e.rationale&&(t.push("---"),t.push(`**\u{1F4A1} Racioc\xEDnio:** ${e.rationale}`)),t.join(`
`)}copyMarkdownToClipboard(e){let t=this.generateMarkdown();t&&navigator.clipboard.writeText(t).then(()=>{let a=e.innerHTML;e.id==="eq-fah-copy-md-btn"?e.innerHTML='<span style="font-size:10px; color:#00ffcc; font-weight:bold;">\u2713</span>':e.innerHTML="\u2713 Copiado!",setTimeout(()=>{e.innerHTML=a},1500)})}};var Qt=`
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
`;var Wt=(()=>{try{if(typeof window.trustedTypes?.createPolicy=="function")return window.trustedTypes.createPolicy("easyquiz-ui#html",{createHTML:o=>o})}catch{}return null})();function ko(o,e){try{if(Wt){o.innerHTML=Wt.createHTML(e);return}}catch{}try{if(typeof o.setHTMLUnsafe=="function"){o.setHTMLUnsafe(e);return}}catch{}o.innerHTML=e}var Io=[{value:"",label:"Detec\xE7\xE3o Autom\xE1tica"},{value:"escolha_unica",label:"M\xFAltipla Escolha (\xDAnica)"},{value:"escolha_multipla",label:"M\xFAltipla Escolha (V\xE1rias)"},{value:"categorizacao",label:"Categoriza\xE7\xE3o / Grupos"},{value:"arrastar_soltar",label:"Arrastar e Soltar (Drag & Drop)"},{value:"ordenacao",label:"Ordena\xE7\xE3o / Sequ\xEAncia"},{value:"verdadeiro_falso",label:"Verdadeiro / Falso"},{value:"texto_livre",label:"Texto Livre / Dissertativa"},{value:"preenchimento",label:"Preenchimento de Lacunas"}],Ho=[{value:"smart",label:"Inteligente (Auto-H\xEDbrido)"},{value:"command",label:"Apenas Comando (Seguro)"},{value:"javascript",label:"Apenas JS Nativo (Avan\xE7ado)"}],Ge=class{host;shadow;callbacks;autopilot;floatingAnswers;initialSettings;isCollapsed=!1;activeTab="resolver";isBusy=!1;stopwatchInterval=null;stopwatchStartTime=0;latestPlan=null;latestContext=null;latestImages=[];latestImageDescriptions=[];latestPromptText="";metricsLiveTime;metricsLiveStatus;metricsTotalBadge;metricTotalTime;metricAvgTime;metricTotalCount;metricsHistoryList;metricsHistoryCount;metricsCopyBtn;metricsResetBtn;currentQuestionStartTime=0;questionLiveTimerInterval=null;liveDebugTerminal;dbgModel;dbgLatency;dbgSplitTokens;dbgTotalTokens;dbgErrorCard;dbgErrorText;dbgPromptLen;dbgPromptView;dbgContextView;dbgRawRespView;dbgCountAll;dbgCountError;dbgCountAi;dbgCountDom;logEntries=[];activeLogFilter="all";autoScrollLogs=!0;lastErrorMsg=null;_autopilotAnalyzingShown=!1;progressContainer;progressBar;progressLabel;progressVal;contextTreeContainer;launcherBtn;launcherDot;dockToggleBtn;sidebarEl;apToggleBtn;apConsole;executionConsole;dotPulseAp;statusTextAp;stopwatchAp;dotPulseAdv;statusTextAdv;stopwatchAdv;inspModel;inspLatency;inspTokens;inspPrompt;inspRationale;inspActions;copyPromptBtn;apiKeyInput;keyContextMenu;keyMoreBtn;keysListEl;keysBadgeEl;modelSelect;modeSelect;engineSelect;dryRunCheckbox;autoApplyCheckbox;autoAdvanceCheckbox;hostDarkModeCheckbox;useVisionCheckbox;analyzeBtn;applyBtn;resultContainer;constructor(e,t){this.initialSettings=e,this.callbacks=t,this.autopilot=new Ue({onStatusChange:(i,d,l)=>{this.logToConsole(d,l),i==="analyzing"?this._autopilotAnalyzingShown||(this._autopilotAnalyzingShown=!0,this.setBusy(!0,"Autopilot: IA analisando...")):i==="advancing"||i==="waiting"?(this._autopilotAnalyzingShown=!1,this.setBusy(!1),this.updateAutopilotUi(!0)):i==="idle"?(this._autopilotAnalyzingShown=!1,this.setBusy(!1),this.updateAutopilotUi(!1),d.includes("conclus\xE3o")||d.includes("finalizada")||d.includes("Parab\xE9ns")?this.setStatus("Atividade conclu\xEDda com sucesso! Autopilot finalizado.","success"):this.setStatus("Autopilot desativado.","info")):i==="error"&&(this._autopilotAnalyzingShown=!1,this.setBusy(!1),this.updateAutopilotUi(!1),this.setStatus("Autopilot interrompido por erro.","error"))},onRequestAnalysis:async(i,d)=>{try{return await this.callbacks.onAnalyze(i,d,!0)||null}catch{return null}},isManualModeActive:()=>this.floatingAnswers?.isOpen()??!1,onPageAdvance:()=>{this.floatingAnswers?.hide()}}),this.host=document.createElement("div"),this.host.id="easyquiz-shadow-root",this.host.style.position="fixed",this.host.style.top="0",this.host.style.left="0",this.host.style.width="100vw",this.host.style.height="100vh",this.host.style.zIndex="2147483647",this.host.style.pointerEvents="none",this.shadow=this.host.attachShadow({mode:"open"}),ko(this.shadow,`
      <style>${Qt}</style>

      <!-- Bot\xE3o Flutuante Inferior Renovado (C\xE1psula com Status ao Vivo) -->
      <button class="eq-launcher" type="button" title="Abrir / Recolher EasyQuiz (Alt+Q)">
        <span class="eq-launcher-icon">${A.logo}</span>
        <span>EasyQuiz</span>
        <span class="eq-launcher-dot" id="eq-launcher-dot"></span>
      </button>

      <!-- Sidebar Fixa Lateral Direita Estilo VS Code -->
      <aside class="eq-sidebar" aria-label="EasyQuiz Sidebar">
        <!-- Aba Retr\xE1til na Borda Esquerda -->
        <button class="eq-dock-toggle" id="eq-dock-toggle" type="button" title="Recolher / Expandir Painel (Alt+Q)">
          <span class="eq-dock-toggle-icon">${A.chevronRight}</span>
          <span class="eq-dock-toggle-label">EQ</span>
        </button>
           <!-- Activity Bar Vertical na Esquerda (Estilo VS Code - Apenas \xCDcones) -->
          <nav class="eq-activity-bar" role="tablist" aria-label="Atalhos">
            <div class="eq-activity-top">
              <button class="eq-activity-btn active" id="eq-tab-resolver" role="tab" title="Resolver (Opera\xE7\xF5es Atuais)">
                <span class="eq-activity-indicator"></span>
                <span class="eq-activity-icon">${A.rocket}</span>
              </button>

              <button class="eq-activity-btn" id="eq-tab-brain" role="tab" title="C\xE9rebro da IA (Contexto e Inspe\xE7\xE3o)">
                <span class="eq-activity-indicator"></span>
                <span class="eq-activity-icon">${A.chip}</span>
              </button>

              <button class="eq-activity-btn" id="eq-tab-media" role="tab" title="M\xEDdias & Imagens (Capturas enviadas \xE0 IA e Interpreta\xE7\xF5es)">
                <span class="eq-activity-indicator"></span>
                <span class="eq-activity-icon">${A.image}</span>
              </button>

              <button class="eq-activity-btn" id="eq-tab-metrics" role="tab" title="M\xE9tricas & Cron\xF4metro (Tempo por Quest\xE3o e Hist\xF3rico)">
                <span class="eq-activity-indicator"></span>
                <span class="eq-activity-icon">${A.stopwatch}</span>
              </button>

              <button class="eq-activity-btn" id="eq-tab-debug" role="tab" title="Terminal & Debug Output (Logs, Tokens, Prompts, Erros)">
                <span class="eq-activity-indicator"></span>
                <span class="eq-activity-icon">${A.terminal}</span>
              </button>
            </div>

            <div class="eq-activity-bottom">
              <button class="eq-activity-btn" id="eq-tab-settings" role="tab" title="Configura\xE7\xF5es e Ajustes Avan\xE7ados">
                <span class="eq-activity-indicator"></span>
                <span class="eq-activity-icon">${A.settings}</span>
              </button>
            </div>
          </nav>

          <!-- Corpo Principal da Sidebar -->
          <main class="eq-sidebar-body">
            <!-- Cabe\xE7alho VS Code -->
            <header class="eq-header">
              <div class="eq-brand">
                <span class="eq-brand-icon">${A.logo}</span>
                <span class="eq-brand-name">EasyQuiz</span>
                <span class="eq-brand-badge">SUPREME</span>
                <span id="eq-active-model-badge" style="display:none; font-size:9px; font-weight:700; padding:1px 5px; border-radius:3px; background:rgba(88,101,242,0.2); border:1px solid rgba(88,101,242,0.4); color:#7983f5; letter-spacing:0.04em; white-space:nowrap;"></span>
              </div>
              <div class="eq-header-tools">
                <button class="eq-icon-btn" id="eq-min-btn" type="button" title="Minimizar (Alt+Q)">${A.chevronRight}</button>
                <button class="eq-icon-btn" id="eq-close-btn" type="button" title="Fechar">${A.close}</button>
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
                  <button class="eq-btn-primary" id="eq-analyze-btn" type="button">${A.analyze} Analisar quest\xE3o</button>
                  <button class="eq-btn-secondary" id="eq-apply-btn" type="button">${A.apply} Aplicar respostas</button>
                </div>

                <div style="display: flex; gap: 8px; width: 100%; align-items: center;">
                  <button class="eq-btn-primary" id="eq-ap-toggle-btn" type="button" style="flex: 1;">
                    ${A.play} INICIAR AUTOPILOT
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
                  <button class="eq-btn-secondary" id="eq-open-hud-btn" type="button">${A.list} Abrir respostas dispon\xEDveis</button>
                </div>

                <!-- Status & Stopwatch Card -->
                <div class="eq-status-card">
                  <div class="eq-status-card-header">
                    <div class="eq-ai-indicator">
                      <span class="eq-dot-pulse" id="eq-dot-ap"></span>
                      <span>Status da IA</span>
                    </div>
                    <div class="eq-stopwatch" id="eq-stopwatch-ap">
                      ${A.clock} <span>0.00s</span>
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
                      ${A.refresh}
                    </button>
                    <button class="eq-icon-btn" id="eq-ap-clear-memory" type="button" title="Limpar Mem\xF3ria Contextual (RAG)" style="width: 28px; height: 28px; color: #ff5555;">
                      ${A.eraser}
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
                      ${A.copy} Copiar
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
                  <span class="eq-brand-badge" id="eq-media-count-badge" style="background: rgba(88,101,242,0.2); color: #7983f5;">0 m\xEDdias</span>
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
                    ${A.copy} Copiar Relat\xF3rio
                  </button>
                  <button class="eq-btn-secondary danger" id="eq-metrics-reset-btn" type="button">
                    ${A.trash} Zerar M\xE9tricas
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
                      ${A.copy}
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
                        ${A.copy}
                      </button>
                      <button class="eq-icon-btn" id="eq-dbg-clear-logs" type="button" title="Limpar Console" style="width: 26px; height: 26px; color: #ff5555;">
                        ${A.eraser}
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
                        ${A.copy} Copiar
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
                      ${A.copy} Copiar JSON
                    </button>
                  </div>
                  <div class="eq-code-block" id="eq-dbg-context-view" style="max-height: 110px;">Aguardando captura de contexto...</div>
                </div>

                <!-- Resposta Bruta da IA -->
                <div class="eq-field-group">
                  <div class="eq-section-title">
                    <span>Resposta Bruta da IA (Raw Output)</span>
                    <button class="eq-btn-secondary" id="eq-dbg-copy-raw-resp" type="button" style="height: 24px; padding: 0 6px; font-size: 10px;">
                      ${A.copy} Copiar Resposta
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
                      <span id="eq-keys-chevron" style="display:inline-flex;transition:transform 0.2s;">${A.chevronRight}</span>
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
                      <span class="eq-input-prefix-icon">${A.key}</span>
                      <input id="eq-api-key" class="eq-input" type="password" placeholder="Adicionar nova chave AIzaSy..." autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" />
                      <button class="eq-icon-btn" id="eq-key-save" type="button" title="Adicionar Chave">${A.plus}</button>
                      <button class="eq-icon-btn" id="eq-key-more-btn" type="button" title="Mais Op\xE7\xF5es das Chaves">${A.moreVertical}</button>
                    </div>

                    <!-- Context Menu Suspenso Din\xE2mico -->
                    <div class="eq-context-menu" id="eq-key-context-menu" hidden>
                      <button class="eq-context-item" id="eq-menu-prompt" type="button">
                        <span class="eq-item-icon">${A.edit}</span>
                        <span class="eq-item-text">Inserir via Janela Nativa</span>
                        <span class="eq-item-badge">Bypass</span>
                      </button>
                      <button class="eq-context-item" id="eq-menu-paste" type="button">
                        <span class="eq-item-icon">${A.paste}</span>
                        <span class="eq-item-text">Colar da \xC1rea de Transfer\xEAncia</span>
                      </button>
                      <button class="eq-context-item" id="eq-menu-toggle-vis" type="button">
                        <span class="eq-item-icon" id="eq-menu-vis-icon">${A.eye}</span>
                        <span class="eq-item-text" id="eq-menu-vis-text">Mostrar/Ocultar Campo</span>
                      </button>
                      <button class="eq-context-item" id="eq-menu-clear" type="button">
                        <span class="eq-item-icon">${A.eraser}</span>
                        <span class="eq-item-text">Limpar Campo</span>
                      </button>
                      <div class="eq-context-divider"></div>
                      <button class="eq-context-item" id="eq-menu-bulk" type="button">
                        <span class="eq-item-icon">${A.listPlus}</span>
                        <span class="eq-item-text">Importar Chaves em Lote</span>
                        <span class="eq-item-badge">Novo</span>
                      </button>
                      <button class="eq-context-item" id="eq-menu-edit-text" type="button">
                        <span class="eq-item-icon">${A.edit}</span>
                        <span class="eq-item-text">Ver / Editar Chaves como Texto</span>
                      </button>
                      <div class="eq-context-divider"></div>
                      <button class="eq-context-item" id="eq-menu-test" type="button">
                        <span class="eq-item-icon">${A.sparkles}</span>
                        <span class="eq-item-text">Testar Todas as Chaves</span>
                      </button>
                      <button class="eq-context-item danger" id="eq-menu-delete-all" type="button">
                        <span class="eq-item-icon">${A.trash}</span>
                        <span class="eq-item-text">Apagar Todas as Chaves</span>
                      </button>
                      <button class="eq-context-item danger" id="eq-menu-reset" type="button">
                        <span class="eq-item-icon">${A.trash}</span>
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
                    ${A.trash} Resetar Todos os Dados e Mem\xF3ria
                  </button>
                </div>

                <div class="eq-footer-note" style="margin-top: auto;">Configura\xE7\xF5es salvas localmente no navegador</div>
              </div>
            </div>
          </main>
        </aside>
    `),this.launcherBtn=this.shadow.querySelector(".eq-launcher"),this.launcherDot=this.shadow.querySelector("#eq-launcher-dot"),this.dockToggleBtn=this.shadow.querySelector("#eq-dock-toggle"),this.sidebarEl=this.shadow.querySelector(".eq-sidebar"),this.apToggleBtn=this.shadow.querySelector("#eq-ap-toggle-btn"),this.apConsole=this.shadow.querySelector("#eq-ap-console"),this.executionConsole=this.shadow.querySelector("#eq-execution-console"),this.progressContainer=this.shadow.querySelector("#eq-progress-container"),this.progressBar=this.shadow.querySelector("#eq-progress-bar"),this.progressLabel=this.shadow.querySelector("#eq-progress-label"),this.progressVal=this.shadow.querySelector("#eq-progress-val"),this.contextTreeContainer=this.shadow.querySelector("#eq-tree-container"),this.dotPulseAp=this.shadow.querySelector("#eq-dot-ap"),this.statusTextAp=this.shadow.querySelector("#eq-status-text-ap"),this.stopwatchAp=this.shadow.querySelector("#eq-stopwatch-ap span"),this.dotPulseAdv=this.dotPulseAp,this.statusTextAdv=this.statusTextAp,this.stopwatchAdv=this.stopwatchAp,this.inspModel=this.shadow.querySelector("#eq-insp-model"),this.inspLatency=this.shadow.querySelector("#eq-insp-latency"),this.inspTokens=this.shadow.querySelector("#eq-insp-tokens"),this.inspPrompt=this.shadow.querySelector("#eq-insp-prompt"),this.inspRationale=this.shadow.querySelector("#eq-insp-rationale"),this.inspActions=this.shadow.querySelector("#eq-insp-actions"),this.copyPromptBtn=this.shadow.querySelector("#eq-copy-prompt-btn"),this.liveDebugTerminal=this.shadow.querySelector("#eq-live-debug-terminal"),this.dbgModel=this.shadow.querySelector("#eq-dbg-model"),this.dbgLatency=this.shadow.querySelector("#eq-dbg-latency"),this.dbgSplitTokens=this.shadow.querySelector("#eq-dbg-split-tokens"),this.dbgTotalTokens=this.shadow.querySelector("#eq-dbg-total-tokens"),this.dbgErrorCard=this.shadow.querySelector("#eq-dbg-error-card"),this.dbgErrorText=this.shadow.querySelector("#eq-dbg-error-text"),this.dbgPromptLen=this.shadow.querySelector("#eq-dbg-prompt-len"),this.dbgPromptView=this.shadow.querySelector("#eq-dbg-prompt-view"),this.dbgContextView=this.shadow.querySelector("#eq-dbg-context-view"),this.dbgRawRespView=this.shadow.querySelector("#eq-dbg-raw-resp-view"),this.dbgCountAll=this.shadow.querySelector("#eq-dbg-count-all"),this.dbgCountError=this.shadow.querySelector("#eq-dbg-count-error"),this.dbgCountAi=this.shadow.querySelector("#eq-dbg-count-ai"),this.dbgCountDom=this.shadow.querySelector("#eq-dbg-count-dom"),this.apiKeyInput=this.shadow.querySelector("#eq-api-key"),this.keyContextMenu=this.shadow.querySelector("#eq-key-context-menu"),this.keyMoreBtn=this.shadow.querySelector("#eq-key-more-btn"),this.keysListEl=this.shadow.querySelector("#eq-keys-list"),this.keysBadgeEl=this.shadow.querySelector("#eq-keys-badge"),this.modelSelect=this.shadow.querySelector("#eq-model-select"),this.modeSelect=this.shadow.querySelector("#eq-mode-select"),this.engineSelect=this.shadow.querySelector("#eq-engine-select"),this.dryRunCheckbox=this.shadow.querySelector("#eq-dry-run"),this.autoApplyCheckbox=this.shadow.querySelector("#eq-auto-apply"),this.autoAdvanceCheckbox=this.shadow.querySelector("#eq-auto-advance"),this.hostDarkModeCheckbox=this.shadow.querySelector("#eq-host-dark"),this.useVisionCheckbox=this.shadow.querySelector("#eq-use-vision"),this.analyzeBtn=this.shadow.querySelector("#eq-analyze-btn"),this.applyBtn=this.shadow.querySelector("#eq-apply-btn"),this.applyBtn.disabled=!0,this.resultContainer=this.shadow.querySelector("#eq-result"),this.floatingAnswers=new Fe(this.shadow,()=>{this.callbacks.onAnalyze(1)});let a=this.shadow.querySelector("#eq-open-hud-btn");a&&a.addEventListener("click",()=>{this.latestPlan&&this.floatingAnswers.show(this.latestPlan)}),xe.filter(i=>Q(i.id)).forEach(i=>this.modelSelect.add(new Option(i.name,i.id,!1,i.id===e.model))),Io.forEach(i=>this.modeSelect.add(new Option(i.label,i.value,!1,i.value===e.modeHint))),Ho.forEach(i=>this.engineSelect.add(new Option(i.label,i.value,!1,i.value===e.engine))),this.apiKeyInput.value=e.apiKey,this.dryRunCheckbox.checked=e.dryRun,this.autoApplyCheckbox.checked=e.autoApply,this.autoAdvanceCheckbox.checked=e.autoAdvance,this.hostDarkModeCheckbox.checked=e.hostDarkMode,this.useVisionCheckbox.checked=e.useVision,this.metricsLiveTime=this.shadow.querySelector("#eq-metrics-live-time"),this.metricsLiveStatus=this.shadow.querySelector("#eq-metrics-live-status"),this.metricsTotalBadge=this.shadow.querySelector("#eq-metrics-total-badge"),this.metricTotalTime=this.shadow.querySelector("#eq-metric-total-time"),this.metricAvgTime=this.shadow.querySelector("#eq-metric-avg-time"),this.metricTotalCount=this.shadow.querySelector("#eq-metric-total-count"),this.metricsHistoryList=this.shadow.querySelector("#eq-metrics-history-list"),this.metricsHistoryCount=this.shadow.querySelector("#eq-metrics-history-count"),this.metricsCopyBtn=this.shadow.querySelector("#eq-metrics-copy-btn"),this.metricsResetBtn=this.shadow.querySelector("#eq-metrics-reset-btn"),this.setupEventListeners(),this.updateTimingMetrics(),this.mountHost(),this.applyHostDarkMode(e.hostDarkMode);let r=Array.isArray(e.apiKeys)&&e.apiKeys.length>0?e.apiKeys:e.apiKey?[e.apiKey]:[];P.init(r),this.renderKeysList();let n=window.setInterval(()=>{this.activeTab==="settings"&&this.renderKeysList()},1e3);typeof n?.unref=="function"&&n.unref();let s=P.getBestKey()||e.apiKey;s&&Re(s).then(i=>{i&&i.length>0&&this.updateModelSelect(i,e.model)}).catch(()=>{})}switchTab(e){this.activeTab=e;let t=["resolver","brain","media","metrics","debug","settings"];for(let a of t){let r=this.shadow.querySelector(`#eq-tab-${a}`),n=this.shadow.querySelector(`#eq-view-${a}`);a===e?(r?.classList.add("active"),n&&(n.style.display="flex")):(r?.classList.remove("active"),n&&(n.style.display="none"))}e==="brain"?(this.renderContextTree(),this.refreshInspectorView()):e==="media"?this.renderMediaTab():e==="metrics"?this.updateTimingMetrics():e==="debug"&&(this.refreshDebugView(),this.renderTerminalEntries())}setupEventListeners(){this.shadow.querySelector("#eq-tab-resolver")?.addEventListener("click",()=>this.switchTab("resolver")),this.shadow.querySelector("#eq-tab-brain")?.addEventListener("click",()=>this.switchTab("brain")),this.shadow.querySelector("#eq-tab-media")?.addEventListener("click",()=>this.switchTab("media")),this.shadow.querySelector("#eq-tab-metrics")?.addEventListener("click",()=>this.switchTab("metrics")),this.shadow.querySelector("#eq-tab-debug")?.addEventListener("click",()=>this.switchTab("debug")),this.shadow.querySelector("#eq-tab-settings")?.addEventListener("click",()=>this.switchTab("settings")),this.metricsResetBtn?.addEventListener("click",()=>{Ae(),this.stopQuestionTimer(0),this.currentQuestionStartTime=0,this.metricsLiveTime&&(this.metricsLiveTime.textContent="00:00.00"),this.metricsLiveStatus&&(this.metricsLiveStatus.textContent="Em espera",this.metricsLiveStatus.classList.remove("active")),this.updateTimingMetrics(),this.logToConsole("> [SYS] M\xE9tricas e hist\xF3rico de tempo zerados com sucesso.","text-yellow")}),this.metricsCopyBtn?.addEventListener("click",()=>{this.copyMetricsReport()}),this.shadow.querySelector("#eq-dbg-filter-all")?.addEventListener("click",()=>this.setLogFilter("all")),this.shadow.querySelector("#eq-dbg-filter-error")?.addEventListener("click",()=>this.setLogFilter("error")),this.shadow.querySelector("#eq-dbg-filter-ai")?.addEventListener("click",()=>this.setLogFilter("ai")),this.shadow.querySelector("#eq-dbg-filter-dom")?.addEventListener("click",()=>this.setLogFilter("dom"));let e=this.shadow.querySelector("#eq-dbg-scroll-toggle");e?.addEventListener("click",()=>{this.autoScrollLogs=!this.autoScrollLogs,e&&(e.style.color=this.autoScrollLogs?"#00ffcc":"#858585",e.title=this.autoScrollLogs?"Auto-Scroll Ligado (Clique para desligar)":"Auto-Scroll Desligado (Clique para ligar)"),this.autoScrollLogs&&this.liveDebugTerminal&&(this.liveDebugTerminal.scrollTop=this.liveDebugTerminal.scrollHeight)});let t=this.shadow.querySelector("#eq-dbg-copy-logs");t?.addEventListener("click",()=>{let h=this.getFormattedLogs();navigator.clipboard.writeText(h).then(()=>{let g=t.innerHTML;t.innerHTML=A.check,setTimeout(()=>t.innerHTML=g,1800)})}),this.shadow.querySelector("#eq-dbg-clear-logs")?.addEventListener("click",()=>{this.clearLogs()});let a=this.shadow.querySelector("#eq-dbg-copy-prompt");a?.addEventListener("click",()=>{let h=this.latestPromptText||this.latestPlan?.promptSent||"";navigator.clipboard.writeText(h).then(()=>{let g=a.innerHTML;a.innerHTML=`${A.check} Copiado!`,setTimeout(()=>a.innerHTML=g,1800)})});let r=this.shadow.querySelector("#eq-dbg-copy-context");r?.addEventListener("click",()=>{let h=this.dbgContextView?.textContent||"";navigator.clipboard.writeText(h).then(()=>{let g=r.innerHTML;r.innerHTML=`${A.check} Copiado!`,setTimeout(()=>r.innerHTML=g,1800)})});let n=this.shadow.querySelector("#eq-dbg-copy-raw-resp");n?.addEventListener("click",()=>{let h=this.latestPlan?.rawResponse||this.dbgRawRespView?.textContent||"";navigator.clipboard.writeText(h).then(()=>{let g=n.innerHTML;n.innerHTML=`${A.check} Copiado!`,setTimeout(()=>n.innerHTML=g,1800)})});let s=this.shadow.querySelector("#eq-dbg-copy-error-btn");s?.addEventListener("click",()=>{let h=this.lastErrorMsg||"";navigator.clipboard.writeText(h).then(()=>{let g=s.innerHTML;s.innerHTML=A.check,setTimeout(()=>s.innerHTML=g,1800)})}),this.shadow.querySelector("#eq-refresh-context-btn")?.addEventListener("click",()=>{this.renderContextTree()}),this.launcherBtn.addEventListener("click",()=>this.toggle()),this.dockToggleBtn.addEventListener("click",()=>this.toggle()),this.shadow.querySelector("#eq-min-btn")?.addEventListener("click",()=>this.toggle(!1)),this.shadow.querySelector("#eq-close-btn")?.addEventListener("click",()=>this.toggle(!1)),window.addEventListener("keydown",h=>{h.altKey&&(h.key==="q"||h.key==="Q")&&(h.preventDefault(),this.toggle())},!0);let i=h=>{let g=h.composedPath();g.includes(this.shadow)||(g.includes(this.sidebarEl)||g.includes(this.host))&&h.stopImmediatePropagation()};window.addEventListener("keydown",i,!0),window.addEventListener("keyup",i,!0),window.addEventListener("keypress",i,!0),this.apiKeyInput.addEventListener("input",()=>{let h=this.apiKeyInput.value.trim().replace(/^["']|["']$/g,"");this.callbacks.onSettingsChange({apiKey:h})});let d=this.shadow.querySelector("#eq-keys-collapsible"),l=this.shadow.querySelector("#eq-keys-chevron"),p=this.shadow.querySelector("#eq-keys-section-header"),b=h=>{d&&(h?(d.style.display="none",l&&(l.style.transform="rotate(0deg)")):(d.style.display="block",d.style.maxHeight="none",d.style.overflow="visible",l&&(l.style.transform="rotate(90deg)")))},c=!1;try{c=localStorage.getItem("easyquiz_keys_collapsed")==="true"}catch{}b(c),p?.addEventListener("click",h=>{if(h.target?.closest("a"))return;let g=d?.style.display==="none";b(!g);try{localStorage.setItem("easyquiz_keys_collapsed",g?"false":"true")}catch{}}),this.shadow.querySelector("#eq-key-save").addEventListener("click",()=>{let h=this.apiKeyInput.value.trim().replace(/^["']|["']$/g,"");if(!h){this.setStatus("Insira o valor da chave antes de adicionar.","warning");return}let g=P.addKey(h);if(g.ok){let v=P.exportRawKeys();this.callbacks.onSettingsChange({apiKey:v[0],apiKeys:v}),this.apiKeyInput.value="",this.setStatus(`\u2713 Nova chave adicionada com sucesso! (${v.length} chaves ativas no pool)`,"success"),b(!1);try{localStorage.setItem("easyquiz_keys_collapsed","false")}catch{}this.renderKeysList(),this.keyContextMenu.hidden=!0,Oe(h).then(w=>{w.ok?(P.markSuccess(h,100),this.setStatus("\u2713 Nova chave validada com sucesso no Google AI Studio!","success")):(P.markInvalid(h,w.message),this.setStatus(`\u26A0\uFE0F Chave cadastrada, mas aviso retornado: ${w.message}`,"warning")),this.renderKeysList()}).catch(()=>{})}else this.setStatus(g.message,"warning")}),this.keyMoreBtn.addEventListener("click",h=>{h.stopPropagation(),this.keyContextMenu.hidden=!this.keyContextMenu.hidden}),this.shadow.addEventListener("click",h=>{let g=h.target;!g.closest("#eq-key-context-menu")&&!g.closest("#eq-key-more-btn")&&(this.keyContextMenu.hidden=!0)}),this.shadow.querySelector("#eq-menu-prompt")?.addEventListener("click",()=>{this.keyContextMenu.hidden=!0;let h=window.prompt("Adicionar Nova Chave API do Google Gemini (AI Studio):");if(h!==null&&h.trim()){let g=h.trim().replace(/^["']|["']$/g,""),v=P.addKey(g);if(v.ok){let w=P.exportRawKeys();this.callbacks.onSettingsChange({apiKey:w[0],apiKeys:w}),this.setStatus("Chave Gemini adicionada com sucesso!","success"),this.renderKeysList()}else this.setStatus(v.message,"warning")}}),this.shadow.querySelector("#eq-menu-paste")?.addEventListener("click",async()=>{this.keyContextMenu.hidden=!0;try{let h=await navigator.clipboard.readText();if(h){let g=h.trim().replace(/^["']|["']$/g,"");this.apiKeyInput.value=g,this.setStatus('Chave colada no campo. Clique no bot\xE3o "+" para adicionar ao pool.',"info")}}catch{let h=window.prompt("Adicionar Nova Chave API do Google Gemini:");if(h!==null&&h.trim()){let g=h.trim().replace(/^["']|["']$/g,"");if(P.addKey(g).ok){let w=P.exportRawKeys();this.callbacks.onSettingsChange({apiKey:w[0],apiKeys:w}),this.setStatus("Chave Gemini adicionada com sucesso!","success"),this.renderKeysList()}}}}),this.shadow.querySelector("#eq-menu-toggle-vis")?.addEventListener("click",()=>{this.keyContextMenu.hidden=!0;let h=this.apiKeyInput.type==="password";this.apiKeyInput.type=h?"text":"password";let g=this.shadow.querySelector("#eq-menu-vis-icon"),v=this.shadow.querySelector("#eq-menu-vis-text");g&&(g.innerHTML=h?A.eyeOff:A.eye),v&&(v.textContent=h?"Ocultar Campo":"Mostrar Campo")}),this.shadow.querySelector("#eq-menu-clear")?.addEventListener("click",()=>{this.keyContextMenu.hidden=!0,this.apiKeyInput.value="",this.setStatus("Campo de inser\xE7\xE3o limpo.","info"),this.apiKeyInput.focus()}),this.shadow.querySelector("#eq-menu-bulk")?.addEventListener("click",()=>{this.keyContextMenu.hidden=!0,this.shadow.querySelector("#eq-bulk-overlay")?.remove();let h=document.createElement("div");h.id="eq-bulk-overlay",h.style.cssText=["position:fixed","inset:0","z-index:2147483647","pointer-events:auto","background:rgba(0,0,0,0.78)","backdrop-filter:blur(4px)","-webkit-backdrop-filter:blur(4px)","display:flex","align-items:center","justify-content:center",'font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif',"user-select:text","-webkit-user-select:text"].join(";");let g=document.createElement("div");g.style.cssText=["background:#11151c","color:#e2e8f0","border:1px solid #283548","border-radius:12px","padding:20px","width:440px","max-width:92vw","font-size:13px","box-shadow:0 12px 40px rgba(0,0,0,0.85), 0 0 0 1px rgba(0,229,255,0.15)","display:flex","flex-direction:column","gap:10px","pointer-events:auto"].join(";"),g.innerHTML=`
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
      `,h.appendChild(g),this.shadow.appendChild(h);let v=g.querySelector("#eq-bulk-ta"),w=g.querySelector("#eq-bulk-status"),C=g.querySelector("#eq-bulk-import"),M=g.querySelector("#eq-bulk-paste-btn"),S=g.querySelector("#eq-bulk-clear-btn");requestAnimationFrame(()=>v?.focus());let x=()=>{h.remove()};["keydown","keyup","keypress","paste","copy","cut"].forEach(T=>{h.addEventListener(T,L=>{L.stopPropagation(),L.stopImmediatePropagation()},!0)}),h.addEventListener("keydown",T=>{T.key==="Escape"&&x()}),h.addEventListener("click",T=>{T.target===h&&x()}),g.querySelector("#eq-bulk-x")?.addEventListener("click",x),g.querySelector("#eq-bulk-cancel")?.addEventListener("click",x),S.addEventListener("click",()=>{v.value="",w.textContent="",v.focus()}),M.addEventListener("click",async()=>{try{let T=await navigator.clipboard?.readText();T?(v.value=T,v.focus(),w.style.color="#38bdf8",w.textContent="Conte\xFAdo colado da \xE1rea de transfer\xEAncia com sucesso!"):(w.style.color="#fbbf24",w.textContent="\xC1rea de transfer\xEAncia vazia ou sem permiss\xE3o de leitura.")}catch{w.style.color="#fbbf24",w.textContent="Permiss\xE3o de clipboard negada pelo navegador. Use Ctrl+V diretamente na caixa.",v.focus()}}),g.querySelector("#eq-bulk-import")?.addEventListener("click",async()=>{let T=v.value.trim();if(!T){w.style.color="#f87171",w.textContent="Insira pelo menos uma chave de API antes de importar.";return}let L=T.match(/AIza[0-9A-Za-z\-_]{35}/g),$=[];if(L&&L.length>0?$=Array.from(new Set(L)):$=Array.from(new Set(T.split(/[\n,;\s]+/).map(D=>D.trim().replace(/^["'`]|["'`]$/g,"")).filter(D=>D.length>=20))),$.length===0){w.style.color="#f87171",w.textContent="Nenhuma chave v\xE1lida encontrada (m\xEDnimo 20 caracteres).";return}w.style.color="#00e5ff",w.textContent=`Processando ${$.length} chave(s)...`,C.disabled=!0,C.style.opacity="0.6";let E=0,H=0;for(let D of $){let j=P.addKey(D);j.ok?E++:j.message.includes("j\xE1 est\xE1 cadastrada")&&H++}if(E>0){let D=P.exportRawKeys();this.callbacks.onSettingsChange({apiKey:D[0],apiKeys:D}),b(!1);try{localStorage.setItem("easyquiz_keys_collapsed","false")}catch{}}w.textContent=`${E} adicionada(s), ${H} duplicada(s). Validando modelo em paralelo...`;let O=P.exportRawKeys(),_=this.modelSelect?.value||"gemini-3.5-flash-lite",N=await tt(_,O);N.ok?(P.markSuccess(N.key,200),w.style.color="#4ade80",w.textContent=`\u2713 ${E} adicionada(s), ${H} duplicada(s). Modelo '${N.model}' pronto!`):(w.style.color="#fbbf24",w.textContent=`${E} adicionada(s), ${H} duplicada(s). Aviso: ${N.message}`),this.renderKeysList(),C.disabled=!1,C.style.opacity="1",E>0&&(this.setStatus(`\u2713 Lote importado: ${E} chave(s) adicionada(s) ao pool!`,"success"),setTimeout(x,2200))})}),this.shadow.querySelector("#eq-menu-edit-text")?.addEventListener("click",()=>{this.keyContextMenu.hidden=!0,this.shadow.querySelector("#eq-text-editor-overlay")?.remove();let h=P.exportRawKeys(),g=document.createElement("div");g.id="eq-text-editor-overlay",g.style.cssText=["position:fixed","inset:0","z-index:2147483647","pointer-events:auto","background:rgba(0,0,0,0.82)","backdrop-filter:blur(4px)","-webkit-backdrop-filter:blur(4px)","display:flex","align-items:center","justify-content:center",'font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif'].join(";");let v=document.createElement("div");v.style.cssText=["background:#11151c","color:#e2e8f0","border:1px solid #283548","border-radius:12px","padding:20px","width:460px","max-width:94vw","font-size:13px","box-shadow:0 12px 40px rgba(0,0,0,0.85),0 0 0 1px rgba(0,229,255,0.15)","display:flex","flex-direction:column","gap:10px","pointer-events:auto"].join(";"),v.innerHTML=`
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
      `,g.appendChild(v),this.shadow.appendChild(g);let w=v.querySelector("#eq-edittext-ta"),C=v.querySelector("#eq-edittext-status");w.value=h.join(`
`),requestAnimationFrame(()=>{w.focus(),w.select()});let M=()=>g.remove();["keydown","keyup","keypress","paste","copy","cut"].forEach(S=>{g.addEventListener(S,x=>{x.stopPropagation(),x.stopImmediatePropagation()},!0)}),g.addEventListener("keydown",S=>{S.key==="Escape"&&M()}),g.addEventListener("click",S=>{S.target===g&&M()}),v.querySelector("#eq-edittext-x")?.addEventListener("click",M),v.querySelector("#eq-edittext-cancel")?.addEventListener("click",M),v.querySelector("#eq-edittext-clear")?.addEventListener("click",()=>{confirm("Apagar todas as chaves? Esta a\xE7\xE3o \xE9 irrevers\xEDvel.")&&(w.value="",C.style.color="#fbbf24",C.textContent="Campo limpo. Clique em Salvar para confirmar a remo\xE7\xE3o de todas as chaves.")}),v.querySelector("#eq-edittext-save")?.addEventListener("click",()=>{let S=w.value.split(/[\n\r]+/).map(L=>L.trim().replace(/^["']|["']$/g,"")).filter(L=>L.length>5),x=Array.from(new Set(S));P.init(x);let T=P.exportRawKeys();this.callbacks.onSettingsChange({apiKey:T[0]||"",apiKeys:T}),this.renderKeysList(),C.style.color="#4ade80",x.length===0?C.textContent="\u2713 Todas as chaves removidas.":C.textContent=`\u2713 ${x.length} chave(s) salva(s) com sucesso!`,this.setStatus(x.length>0?`\u2713 ${x.length} chave(s) salva(s)!`:"Todas as chaves foram removidas.",x.length>0?"success":"info"),setTimeout(M,1400)})}),this.shadow.querySelector("#eq-menu-delete-all")?.addEventListener("click",()=>{this.keyContextMenu.hidden=!0;let h=P.getAllKeys();if(h.length===0)return this.setStatus("Nenhuma chave para apagar.","info");confirm(`Apagar todas as ${h.length} chave(s) permanentemente?`)&&(P.init([]),this.callbacks.onSettingsChange({apiKey:"",apiKeys:[]}),this.renderKeysList(),this.setStatus("Todas as chaves foram removidas.","info"))}),this.shadow.querySelector("#eq-menu-test")?.addEventListener("click",async()=>{this.keyContextMenu.hidden=!0;let h=P.getAllKeys();if(h.length===0)return this.setStatus("Nenhuma chave cadastrada para testar.","error");this.setStatus(`\u26A1 Testando ${h.length} chave(s) em paralelo...`,"info");let g=this.modelSelect?.value||"gemini-3.5-flash-lite",v=h.map(C=>C.key),w=await tt(g,v);if(w.ok)P.markSuccess(w.key,150),this.setStatus(`\u2713 Validado! Modelo '${w.model}' respondeu com sucesso!`,"success");else{let C=await Promise.allSettled(v.map(S=>Oe(S))),M=0;C.forEach((S,x)=>{if(S.status==="fulfilled"&&S.value.ok)M++,P.markSuccess(v[x],200);else{let T=S.status==="fulfilled"?S.value.message:String(S.reason);P.markInvalid(v[x],T)}}),this.setStatus(`Teste: ${M}/${h.length} chave(s) v\xE1lidas. ${w.message}`,M>0?"info":"error")}this.renderKeysList()});let u=()=>{this.keyContextMenu.hidden=!0,window.confirm("Deseja realmente resetar todos os dados, chaves e mem\xF3ria de sess\xE3o do EasyQuiz?")&&(this.autopilot.isActive()&&this.autopilot.stop(),this.updateAutopilotUi(!1),this.setBusy(!1),xt(),Ae(),this.stopQuestionTimer(0),this.currentQuestionStartTime=0,this.metricsLiveTime&&(this.metricsLiveTime.textContent="00:00.00"),this.metricsLiveStatus&&(this.metricsLiveStatus.textContent="Em espera",this.metricsLiveStatus.className="eq-live-stopwatch-status"),this.updateTimingMetrics(),this.apiKeyInput.value="",this.callbacks.onSettingsChange({apiKey:""}),this.setStatus("Todos os dados do EasyQuiz foram limpos.","info"),this.logToConsole("> [SYS] Armazenamento local resetado.","text-yellow"))};this.shadow.querySelector("#eq-menu-reset")?.addEventListener("click",u),this.shadow.querySelector("#eq-reset-all-btn")?.addEventListener("click",u),this.apToggleBtn.addEventListener("click",()=>{if(this.autopilot.isActive())this.autopilot.stop(),this.callbacks.onCancel?.(),this.setProgress(0),this.updateAutopilotUi(!1),this.setInterrupted("Autopilot interrompido imediatamente pelo usu\xE1rio.");else{if(!this.apiKeyInput.value.trim().replace(/^["']|["']$/g,"")){this.setStatus("Configure sua chave de API Gemini na aba Configura\xE7\xF5es antes de ligar o Autopilot.","error"),this.switchTab("settings"),this.apiKeyInput.focus();return}this.callbacks.onSettingsChange({autoApply:!0,autoAdvance:!0}),this.autoApplyCheckbox.checked=!0,this.autoAdvanceCheckbox.checked=!0,Ht(),this.autopilot.start(),this.updateAutopilotUi(!0),this.startStopwatch(),this.setStatus("Autopilot ativo. Monitorando exerc\xEDcios...","info")}}),this.shadow.querySelector("#eq-ap-clear-memory").addEventListener("click",()=>{Ye(),this.logToConsole("> [SYS] Mem\xF3ria contextual limpa com sucesso.","text-green"),this.setStatus("Mem\xF3ria contextual da sess\xE3o limpa.","success")});let y=this.shadow.querySelector("#eq-copy-console-btn");y?.addEventListener("click",()=>{let h=this.apConsole?.innerText||"";navigator.clipboard.writeText(h).then(()=>{let g=y.innerHTML;y.innerHTML=A.check,setTimeout(()=>y.innerHTML=g,1800)})}),this.copyPromptBtn.addEventListener("click",()=>{let h=this.inspPrompt.textContent||"";navigator.clipboard.writeText(h).then(()=>{let g=this.copyPromptBtn.innerHTML;this.copyPromptBtn.innerHTML=`${A.check} Copiado!`,setTimeout(()=>this.copyPromptBtn.innerHTML=g,2e3)})}),this.modelSelect.addEventListener("change",()=>this.callbacks.onSettingsChange({model:this.modelSelect.value})),this.modeSelect.addEventListener("change",()=>this.callbacks.onSettingsChange({modeHint:this.modeSelect.value})),this.engineSelect.addEventListener("change",()=>this.callbacks.onSettingsChange({engine:this.engineSelect.value})),this.dryRunCheckbox.addEventListener("change",()=>this.callbacks.onSettingsChange({dryRun:this.dryRunCheckbox.checked})),this.autoApplyCheckbox.addEventListener("change",()=>this.callbacks.onSettingsChange({autoApply:this.autoApplyCheckbox.checked})),this.autoAdvanceCheckbox.addEventListener("change",()=>this.callbacks.onSettingsChange({autoAdvance:this.autoAdvanceCheckbox.checked})),this.useVisionCheckbox.addEventListener("change",()=>{let h=this.useVisionCheckbox.checked;this.callbacks.onSettingsChange({useVision:h}),this.setStatus(h?"Vis\xE3o Computacional ativada (capturas habilitadas).":"Modo DOM R\xE1pido ativado (capturas desabilitadas).","info")}),this.hostDarkModeCheckbox.addEventListener("change",()=>{let h=this.hostDarkModeCheckbox.checked;this.callbacks.onSettingsChange({hostDarkMode:h}),this.applyHostDarkMode(h)}),this.analyzeBtn.addEventListener("click",async()=>{if(this.isBusy){this.callbacks.onCancel?.(),this.setInterrupted("An\xE1lise cancelada pelo usu\xE1rio. Pronto para nova tentativa.");return}await this.callbacks.onAnalyze()&&!this.dryRunCheckbox.checked&&!this.autoApplyCheckbox.checked&&this.callbacks.onApply()}),this.applyBtn.addEventListener("click",()=>this.callbacks.onApply())}startStopwatch(){this.stopStopwatch(),this.stopwatchStartTime=Date.now();let e=()=>{let t=((Date.now()-this.stopwatchStartTime)/1e3).toFixed(2)+"s";this.stopwatchAp.textContent=t,this.stopwatchAdv.textContent=t};e(),this.stopwatchInterval=setInterval(e,100)}stopStopwatch(e){if(this.stopwatchInterval&&(clearInterval(this.stopwatchInterval),this.stopwatchInterval=null),e!==void 0){let t=(e/1e3).toFixed(2)+"s";this.stopwatchAp.textContent=t,this.stopwatchAdv.textContent=t}}setLogFilter(e){this.activeLogFilter=e;let t=["all","error","ai","dom"];for(let a of t){let r=this.shadow.querySelector(`#eq-dbg-filter-${a}`);a===e?r?.classList.add("active"):r?.classList.remove("active")}this.renderTerminalEntries()}updateLogCounters(){let e=0,t=0,a=0;for(let r of this.logEntries)r.category==="error"?e++:r.category==="ai"?t++:r.category==="dom"&&a++;this.dbgCountAll&&(this.dbgCountAll.textContent=String(this.logEntries.length)),this.dbgCountError&&(this.dbgCountError.textContent=String(e)),this.dbgCountAi&&(this.dbgCountAi.textContent=String(t)),this.dbgCountDom&&(this.dbgCountDom.textContent=String(a))}renderTerminalEntries(){if(!this.liveDebugTerminal)return;this.liveDebugTerminal.replaceChildren();let e=this.activeLogFilter==="all"?this.logEntries:this.logEntries.filter(t=>t.category===this.activeLogFilter);if(e.length===0){let t=document.createElement("div");t.className="text-muted",t.textContent=`Nenhum log encontrado para o filtro "${this.activeLogFilter.toUpperCase()}".`,this.liveDebugTerminal.appendChild(t);return}for(let t of e){let a=document.createElement("div");a.textContent=t.message,t.colorClass&&(a.className=t.colorClass),this.liveDebugTerminal.appendChild(a)}this.autoScrollLogs&&(this.liveDebugTerminal.scrollTop=this.liveDebugTerminal.scrollHeight)}clearLogs(){if(this.logEntries=[],this.updateLogCounters(),this.liveDebugTerminal){this.liveDebugTerminal.replaceChildren();let e=document.createElement("div");e.className="text-blue",e.textContent="> [SYS] Console de logs limpo pelo usu\xE1rio.",this.liveDebugTerminal.appendChild(e)}this.apConsole&&this.apConsole.replaceChildren(),this.executionConsole&&this.executionConsole.replaceChildren()}getFormattedLogs(){return(this.activeLogFilter==="all"?this.logEntries:this.logEntries.filter(t=>t.category===this.activeLogFilter)).map(t=>t.message).join(`
`)}setLastError(e){this.lastErrorMsg=e,this.dbgErrorCard&&this.dbgErrorText&&(this.dbgErrorText.textContent=e,this.dbgErrorCard.style.display="flex")}setErrorDiagnostic(e,t){let a=t?`[${t}] ${e}`:e;this.setLastError(a)}refreshDebugView(){let e=this.latestPlan,t=this.latestContext,a=this.latestPromptText||e?.promptSent||"";if(this.dbgModel&&(this.dbgModel.textContent=e?.usedModel||this.initialSettings.model||"--"),this.dbgLatency&&(this.dbgLatency.textContent=e?.durationMs?`${e.durationMs}ms`:"--"),this.dbgSplitTokens){let r=e?.promptTokens!==void 0?String(e.promptTokens):"--",n=e?.candidatesTokens!==void 0?String(e.candidatesTokens):"--";this.dbgSplitTokens.textContent=`${r} / ${n}`,this.dbgSplitTokens.title=`Prompt: ${r} tokens | Resposta: ${n} tokens`}if(this.dbgTotalTokens){let r=e?.tokensUsed??(e?.promptTokens&&e?.candidatesTokens?e.promptTokens+e.candidatesTokens:void 0);this.dbgTotalTokens.textContent=r!==void 0?`${r}`:"--"}if(this.dbgPromptLen){let r=a.length,n=Math.round(r/4);this.dbgPromptLen.textContent=`${r} chars (~${n} tokens est.)`}if(this.dbgPromptView&&(this.dbgPromptView.textContent=a||"Nenhum prompt enviado at\xE9 o momento."),this.dbgContextView)if(t){let r={scope:`${t.scope.tagName.toLowerCase()}${t.scope.id?"#"+t.scope.id:""}${t.scope.className?"."+t.scope.className.split(" ").join("."):""}`,questionLength:t.questionText.length,questionSnippet:t.questionText.slice(0,150)+(t.questionText.length>150?"...":""),controlsCount:t.controls.length,controls:t.controls.map((n,s)=>({index:s+1,tag:n.tag,type:n.type,name:n.name||void 0,id:n.id||void 0,value:n.value||void 0,label:n.label||void 0,role:n.role}))};this.dbgContextView.textContent=JSON.stringify(r,null,2)}else this.dbgContextView.textContent="Aguardando captura de contexto pelo EasyQuiz...";this.dbgRawRespView&&(e?e.rawResponse?this.dbgRawRespView.textContent=e.rawResponse:this.dbgRawRespView.textContent=JSON.stringify({pageType:e.pageType,mode:e.mode,confidence:e.confidence,rationale:e.rationale,actions:e.actions},null,2):this.dbgRawRespView.textContent="Aguardando retorno da API Gemini..."),this.lastErrorMsg&&this.dbgErrorCard&&this.dbgErrorText&&(this.dbgErrorText.textContent=this.lastErrorMsg,this.dbgErrorCard.style.display="flex")}logToConsole(e,t){let a=new Date,r=`${String(a.getHours()).padStart(2,"0")}:${String(a.getMinutes()).padStart(2,"0")}:${String(a.getSeconds()).padStart(2,"0")}.${String(Math.floor(a.getMilliseconds()/100))}`,n=e;e.startsWith(">")?n=`> [${r}] ${e.slice(1).trim()}`:n=`[${r}] ${e}`;let s="all";t==="text-red"||n.includes("[ERRO]")||n.includes("Falha")||n.includes("Error")?s="error":n.includes("[IA]")||n.includes("[RAG]")||n.includes("Tokens")||n.includes("Gemini")||n.includes("Modelo:")?s="ai":(n.includes("[DOM]")||n.includes("[EXEC]")||n.includes("[VERIF]")||n.includes("[NAV]"))&&(s="dom");let i={id:Date.now()+Math.random(),timestamp:r,message:n,colorClass:t,category:s};for(this.logEntries.push(i);this.logEntries.length>250;)this.logEntries.shift();if(this.updateLogCounters(),s==="error"&&this.setLastError(n),this.liveDebugTerminal&&(this.activeLogFilter==="all"||this.activeLogFilter===s)){let d=document.createElement("div");for(d.textContent=n,t&&(d.className=t),this.liveDebugTerminal.appendChild(d);this.liveDebugTerminal.children.length>250;)this.liveDebugTerminal.removeChild(this.liveDebugTerminal.firstChild);this.autoScrollLogs&&(this.liveDebugTerminal.scrollTop=this.liveDebugTerminal.scrollHeight)}if(this.apConsole){let d=document.createElement("div");for(d.textContent=n,t&&(d.className=t),this.apConsole.appendChild(d),this.apConsole.scrollTop=this.apConsole.scrollHeight;this.apConsole.children.length>150;)this.apConsole.removeChild(this.apConsole.firstChild)}if(this.executionConsole){let d=document.createElement("div");for(d.textContent=n,t&&(d.className=t),this.executionConsole.appendChild(d),this.executionConsole.scrollTop=this.executionConsole.scrollHeight;this.executionConsole.children.length>150;)this.executionConsole.removeChild(this.executionConsole.firstChild)}}setProgress(e,t){if(!this.progressContainer||!this.progressBar)return;if(e<=0){this.progressContainer.style.display="none",this.progressBar.style.width="0%";return}this.progressContainer.style.display="flex";let a=Math.min(100,Math.max(0,Math.round(e)));this.progressBar.style.width=`${a}%`,this.progressVal&&(this.progressVal.textContent=`${a}%`),t&&this.progressLabel&&(this.progressLabel.textContent=t),a>=100&&setTimeout(()=>{this.progressContainer&&this.progressBar&&this.progressBar.style.width==="100%"&&(this.progressContainer.style.display="none")},1500)}updateContext(e,t){this.latestContext=e,t&&(this.latestPlan=t,t.imageDescriptions&&(this.latestImageDescriptions=t.imageDescriptions,this.renderMediaTab())),this.activeTab==="brain"?(this.renderContextTree(),t&&this.refreshInspectorView()):this.activeTab==="debug"&&this.refreshDebugView()}updateImages(e){this.latestImages=e,this.activeTab==="brain"&&this.renderContextTree(),(this.activeTab==="media"||e.length>0)&&this.renderMediaTab()}renderMediaTab(){let e=this.shadow?.querySelector("#eq-media-grid"),t=this.shadow?.querySelector("#eq-media-count-badge");if(!e)return;let a=this.latestImages,r=this.latestImageDescriptions;if(t&&(t.textContent=`${a.length} m\xEDdias`),a.length===0){e.innerHTML=`
        <div class="text-muted" style="padding: 16px 0; text-align: center;">
          Nenhuma imagem capturada ainda.<br>
          <span style="font-size: 10px; opacity: 0.6;">Ative \u201CVis\xE3o Computacional\u201D nas configura\xE7\xF5es e execute uma an\xE1lise.</span>
        </div>`;return}e.innerHTML="",a.forEach((n,s)=>{let i=r.find(h=>h.index===s),d=n.captureStatus==="captured"?"\u2705":n.captureStatus==="text_only"?"\u{1F4DD}":"\u274C",l=n.captureStatus==="captured"?"Visual":n.captureStatus==="text_only"?"Texto":"Falhou",p=i?.relevant??!0,b=i?.description??(n.textContext||"Aguardando an\xE1lise da IA..."),c=document.createElement("div");c.style.cssText=["background: rgba(255,255,255,0.04)","border: 1px solid rgba(255,255,255,0.08)","border-radius: 8px","overflow: hidden",`border-left: 3px solid ${p?"#5865f2":"#666"}`].join(";");let m=n.base64?`data:${n.mediaType||"image/jpeg"};base64,${n.base64}`:"",u="";m?u=`
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
          </div>`:u=`
          <div style="background:#1a1a1a; padding:12px; text-align:center; color:#666; font-size:11px; border-bottom: 1px solid rgba(255,255,255,0.06);">
            ${d} ${l} \u2014 sem dados de imagem
          </div>`;let f=p?'<span style="font-size:9px;font-weight:700;padding:1px 5px;border-radius:3px;background:rgba(88,101,242,0.2);border:1px solid rgba(88,101,242,0.4);color:#7983f5;">RELEVANTE</span>':'<span style="font-size:9px;font-weight:700;padding:1px 5px;border-radius:3px;background:rgba(255,85,85,0.2);border:1px solid rgba(255,85,85,0.4);color:#ff5555;">IGNORADA</span>',y=`
        <div style="padding: 10px 12px; display: flex; flex-direction: column; gap: 6px;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size:11px;font-weight:700;color:#e0e0e0;">Imagem ${s+1}</span>
            ${f}
          </div>
          <div style="font-size:10px;color:#aaa;line-height:1.5;">${b}</div>
          ${n.textContext&&m?`<div style="font-size:9px;color:#666;margin-top:2px;">Contexto textual: ${n.textContext.slice(0,100)}${n.textContext.length>100?"...":""}</div>`:""}
        </div>`;c.innerHTML=u+y,e.appendChild(c)})}renderContextTree(){if(!this.contextTreeContainer)return;let e=this.latestContext,t=Pe(),a=this.latestPlan;this.contextTreeContainer.innerHTML="";let r=this.createTreeFolder("\u{1F4C4} P\xC1GINA & ESCOPO ATUAL",!0,[{label:"T\xEDtulo",value:document.title||"Sem t\xEDtulo"},{label:"URL",value:window.location.pathname||"/"},{label:"Escopo DOM",value:e?`${e.scope.tagName.toLowerCase()}${e.scope.className?"."+e.scope.className.split(" ").join("."):""}`:"Document"},{label:"Tamanho Texto",value:e?`${e.questionText.length} caracteres`:"N\xE3o analisado"},{label:"Trecho Enunciado",value:e?`"${e.questionText.slice(0,120)}..."`:"Nenhum"}]);this.contextTreeContainer.appendChild(r);let n=e?e.controls:[],s=n.map((u,f)=>{let y=u.role==="navigation"||u.type==="button",h=!y&&u.value?` [val: "${u.value}"]`:"";return{label:`[#${f+1}] ${u.type.toUpperCase()}`,value:`${u.label||u.id||u.name||"(Sem r\xF3tulo)"}${h}`.trim(),badge:y?"Navega\xE7\xE3o":u.role||u.type}}),i=this.createTreeFolder(`\u{1F39B}\uFE0F CONTROLES DETECTADOS (${n.length})`,n.length>0,s);this.contextTreeContainer.appendChild(i);let d=t.map((u,f)=>({label:`Mem\xF3ria #${f+1}`,value:u,badge:"RAG"})),l=this.createTreeFolder(`\u{1F9E0} MEM\xD3RIA RAG ACUMULADA (${t.length})`,t.length>0,d);if(this.contextTreeContainer.appendChild(l),a){let u=this.createTreeFolder(`\u{1F916} \xDALTIMO PLANO IA (${a.actions.length} a\xE7\xF5es)`,!0,[{label:"Tipo P\xE1gina",value:a.pageType,badge:`${(a.confidence*100).toFixed(0)}%`},{label:"Modo",value:a.mode},{label:"Racioc\xEDnio",value:a.rationale||"N/A"},...a.actions.map((f,y)=>({label:`A\xE7\xE3o #${y+1} (${f.t})`,value:JSON.stringify(f)}))]);this.contextTreeContainer.appendChild(u)}let p=this.latestImages,b=this.latestImageDescriptions,c=p.map((u,f)=>{let y=b.find(C=>C.index===f),h=u.captureStatus==="captured"?"\u2705":u.captureStatus==="text_only"?"\u{1F4DD}":"\u274C",g=u.captureStatus==="captured"?"Visual":u.captureStatus==="text_only"?"Texto":"Falhou",v=y?y.relevant?"\u{1F3AF} Relevante":"\u26A0\uFE0F Ignorada":"\u2014",w=y?y.description:u.textContext?u.textContext:"Aguardando an\xE1lise IA...";return{label:`${h} Img ${f+1} [${g}]`,value:`${w}`,badge:v,imgSrc:u.base64?`data:${u.mediaType||"image/jpeg"};base64,${u.base64}`:void 0}}),m=this.createTreeFolder(`\u{1F5BC}\uFE0F IMAGENS DETECTADAS (${p.length})`,!0,c);this.contextTreeContainer.appendChild(m)}createTreeFolder(e,t,a){let r=document.createElement("div");r.className="eq-tree-node";let n=document.createElement("div");n.className="eq-tree-header",n.innerHTML=`<span class="eq-tree-arrow">${t?"\u25BC":"\u25B6"}</span> <span>${e}</span>`;let s=document.createElement("div");if(s.className="eq-tree-content",s.style.display=t?"flex":"none",a.length===0)s.innerHTML='<div class="text-muted" style="padding: 2px 0;">Nenhum item registrado.</div>';else for(let i of a){let d=document.createElement("div");d.className="eq-tree-leaf";let l="";i.imgSrc&&i.imgSrc.startsWith("data:image")&&(l=`<div style="margin-top: 8px; margin-bottom: 4px;"><img src="${i.imgSrc}" style="max-width: 100%; max-height: 120px; border-radius: 4px; border: 1px solid #3c4043; background: #1e1f22;" alt="Captura"></div>`),d.innerHTML=`
          <div style="display: flex; align-items: flex-start; gap: 8px; width: 100%;">
            <strong style="color:#ffffff; min-width: 80px;">${i.label}:</strong>
            <div style="flex:1; display: flex; flex-direction: column;">
              <span style="word-break: break-word; color:#aaaaaa;">${i.value}</span>
              ${l}
            </div>
            ${i.badge?`<span class="eq-tree-badge" style="white-space: nowrap;">${i.badge}</span>`:""}
          </div>
        `,s.appendChild(d)}return n.addEventListener("click",()=>{let i=s.style.display==="none";s.style.display=i?"flex":"none";let d=n.querySelector(".eq-tree-arrow");d&&(d.textContent=i?"\u25BC":"\u25B6")}),r.appendChild(n),r.appendChild(s),r}toggle(e){e!==void 0?this.isCollapsed=!e:this.isCollapsed=!this.isCollapsed,this.isCollapsed?this.sidebarEl.classList.add("eq-collapsed"):(this.sidebarEl.classList.remove("eq-collapsed"),this.apiKeyInput.value||(this.switchTab("settings"),this.apiKeyInput.focus()))}updateAutopilotUi(e){e?(this.apToggleBtn.innerHTML=`${A.stop} PARAR AUTOPILOT`,this.apToggleBtn.classList.add("danger"),this.apToggleBtn.title="Interromper execu\xE7\xE3o cont\xEDnua do Autopilot"):(this.apToggleBtn.innerHTML=`${A.play} INICIAR AUTOPILOT`,this.apToggleBtn.classList.remove("danger"),this.apToggleBtn.title="Iniciar resolu\xE7\xE3o autom\xE1tica cont\xEDnua de quest\xF5es")}setOperationState(e,t){let a=this.shadow.querySelector("#eq-operation-state");a&&(a.textContent=e,a.className=`eq-operation-state is-${t}`)}setInterrupted(e="An\xE1lise interrompida pelo usu\xE1rio."){this.isBusy=!1,[this.modelSelect,this.modeSelect,this.engineSelect,this.dryRunCheckbox,this.autoApplyCheckbox,this.autoAdvanceCheckbox,this.useVisionCheckbox].forEach(t=>t.disabled=!1),this.analyzeBtn.disabled=!1,this.analyzeBtn.classList.remove("danger"),this.analyzeBtn.innerHTML=`${A.sparkles} Resolver com IA (Alt+R)`,this.analyzeBtn.title="Analisar e responder quest\xE3o ativa",this.applyBtn.disabled=!this.latestPlan||!this.latestPlan.actions.length,this.stopStopwatch(),this.stopQuestionTimer(),this.dotPulseAp.className="eq-dot-pulse stopped",this.dotPulseAdv.className="eq-dot-pulse stopped",this.launcherDot.className="eq-launcher-dot stopped",this.metricsLiveStatus&&(this.metricsLiveStatus.textContent="Interrompido",this.metricsLiveStatus.className="eq-live-stopwatch-status is-warning"),this.autopilot.isActive()||this.updateAutopilotUi(!1),this.setStatus(e,"warning")}setBusy(e,t){this.isBusy=e,[this.modelSelect,this.modeSelect,this.engineSelect,this.dryRunCheckbox,this.autoApplyCheckbox,this.autoAdvanceCheckbox,this.useVisionCheckbox].forEach(a=>a.disabled=e),e?(this.analyzeBtn.disabled=!1,this.analyzeBtn.classList.add("danger"),this.analyzeBtn.innerHTML=`${A.stop} Parar An\xE1lise`,this.analyzeBtn.title="Interromper e cancelar an\xE1lise em andamento",this.applyBtn.disabled=!0,this.startStopwatch(),this.startQuestionTimer(),this.dotPulseAp.className="eq-dot-pulse busy",this.dotPulseAdv.className="eq-dot-pulse busy",this.launcherDot.className="eq-launcher-dot busy",this.setOperationState("Analisando...","busy"),this.metricsLiveStatus&&(this.metricsLiveStatus.textContent="Calculando...",this.metricsLiveStatus.className="eq-live-stopwatch-status is-busy"),t&&this.setStatus(t,"info")):(this.analyzeBtn.disabled=!1,this.analyzeBtn.classList.remove("danger"),this.analyzeBtn.innerHTML=`${A.sparkles} Resolver com IA (Alt+R)`,this.analyzeBtn.title="Analisar e responder quest\xE3o ativa",this.applyBtn.disabled=!this.latestPlan||!this.latestPlan.actions.length,this.stopStopwatch(),this.stopQuestionTimer(),this.dotPulseAp.className="eq-dot-pulse",this.dotPulseAdv.className="eq-dot-pulse",this.launcherDot.className="eq-launcher-dot",this.setOperationState(this.autopilot.isActive()?"Monitorando":"Pronto","idle"),this.metricsLiveStatus&&this.metricsLiveStatus.textContent==="Calculando..."&&(this.metricsLiveStatus.textContent="Em espera",this.metricsLiveStatus.className="eq-live-stopwatch-status"))}setStatus(e,t="info"){this.statusTextAp.textContent=e,this.statusTextAdv.textContent=e,t==="error"?(this.setOperationState("Bloqueado","error"),this.dotPulseAp.className="eq-dot-pulse error",this.dotPulseAdv.className="eq-dot-pulse error",this.launcherDot.className="eq-launcher-dot error"):t==="warning"?(this.setOperationState("Interrompido","warning"),this.dotPulseAp.className="eq-dot-pulse stopped",this.dotPulseAdv.className="eq-dot-pulse stopped",this.launcherDot.className="eq-launcher-dot stopped"):t==="success"?(this.setOperationState("Confirmado","success"),this.dotPulseAp.className="eq-dot-pulse",this.dotPulseAdv.className="eq-dot-pulse",this.launcherDot.className="eq-launcher-dot"):this.isBusy?(this.setOperationState("Analisando...","busy"),this.dotPulseAp.className="eq-dot-pulse busy",this.dotPulseAdv.className="eq-dot-pulse busy",this.launcherDot.className="eq-launcher-dot busy"):(this.setOperationState(this.autopilot.isActive()?"Monitorando":"Pronto","info"),this.dotPulseAp.className="eq-dot-pulse",this.dotPulseAdv.className="eq-dot-pulse",this.launcherDot.className="eq-launcher-dot");let a=e.includes("Alternando")||e.includes("indispon\xEDvel")||e.includes("fallback")||e.includes("alternativo"),r=t==="error"?"> [ERRO] ":t==="success"?"> [SUCESSO] ":t==="warning"?"> [PARADO] ":a?"> [FALLBACK] ":"> [SYS] ",n=t==="error"?"text-red":t==="success"?"text-green":t==="warning"||a?"text-yellow":"text-blue";this.logToConsole(`${r}${e}`,n)}setPlan(e,t){if(this.latestPlan=e,this.resultContainer.style.display="flex",e.durationMs&&this.stopStopwatch(e.durationMs),e.usedModel){let d=this.shadow.querySelector("#eq-active-model-badge");if(d){let l=e.usedModel.replace("gemini-","").replace("-latest","");d.textContent=`\u25CF ${l}`,d.style.display="inline-block"}}let a=this.shadow.querySelector("#eq-badges");a.replaceChildren();let r=[e.mode.replace("_"," "),`${Math.round(e.confidence*100)}% Confian\xE7a`,`${e.actions.length} a\xE7\xF5es`,...e.usedModel?[e.usedModel]:[]];for(let d of r){let l=document.createElement("span");l.className="eq-brand-badge",l.textContent=d,a.appendChild(l)}let n=this.shadow.querySelector("#eq-rationale-text");n.textContent=e.rationale;let s=this.shadow.querySelector("#eq-actions-list");s.innerHTML="";for(let d of e.actions){let l=document.createElement("div");l.className="eq-action-item";let p="";d.t==="chk"?p=`chk ${d.id} (${d.c})`:d.t==="val"?p=`val "${d.v}" -> ${d.id}`:d.t==="sel"?p=`sel "${Array.isArray(d.v)?d.v.join(","):d.v}" -> ${d.id}`:d.t==="clk"?p=`clk ${d.id}`:d.t==="adv"?p="adv":d.t==="js"?p=`js: ${String(d.v).slice(0,40)}...`:d.t==="drag"&&(p=`drag "${d.from}" -> "${d.to}"`);let b=document.createElement("span");b.className="eq-action-badge",b.textContent=d.t.toUpperCase();let c=document.createElement("span");c.textContent=p,l.append(b,c),s.appendChild(l)}this.applyBtn.disabled=!t||!e.actions.length;let i=this.shadow.querySelector("#eq-execution-card");i&&(i.hidden=!0),e.imageDescriptions&&e.imageDescriptions.length>0&&(this.latestImageDescriptions=e.imageDescriptions,this.renderMediaTab()),this.refreshInspectorView(),this.refreshDebugView()}setExecutionReport(e){let t=this.shadow.querySelector("#eq-execution-card"),a=this.shadow.querySelector("#eq-execution-summary"),r=this.shadow.querySelector("#eq-execution-list");if(!t||!a||!r)return;t.hidden=!1,a.textContent=e.navigationVerified?`${e.verified}/${e.applied} a\xE7\xF5es verificadas. Navega\xE7\xE3o confirmada.`:`${e.verified}/${e.applied} a\xE7\xF5es verificadas. ${e.navigationEvidence}`,a.className=`eq-execution-summary ${e.success?"is-success":"is-warning"}`,r.replaceChildren();let n=this.shadow.querySelector("#eq-execution-placeholder");n&&(n.textContent=e.navigationVerified?"Fluxo conclu\xEDdo: aplica\xE7\xE3o e navega\xE7\xE3o confirmadas.":`Fluxo interrompido: ${e.navigationEvidence}`,n.className=`eq-execution-placeholder ${e.success?"is-success":"is-warning"}`);for(let s of e.reports){let i=document.createElement("div");i.className=`eq-execution-row ${s.verified?"is-success":"is-failed"}`;let d=document.createElement("span");d.className="eq-execution-state",d.textContent=s.verified?"OK":"FALHOU";let l=document.createElement("div");l.className="eq-execution-details";let p=document.createElement("strong");p.textContent=s.target;let b=document.createElement("span");if(b.textContent=`${s.strategy} | ${s.evidence}`,l.append(p,b),i.append(d,l),s.error){let c=document.createElement("small");c.textContent=s.error,i.appendChild(c)}r.appendChild(i)}}setInspectorPrompt(e,t){this.latestPromptText=e,this.inspPrompt&&(this.inspPrompt.textContent=e),t&&this.inspModel&&(this.inspModel.textContent=t),this.inspLatency&&(this.inspLatency.textContent="Aguardando IA..."),this.activeTab==="debug"&&this.refreshDebugView()}refreshInspectorView(){let e=this.latestPlan;if(e)if(this.inspModel.textContent=e.usedModel||this.initialSettings.model,this.inspLatency.textContent=e.durationMs?`${e.durationMs}ms`:"--",this.inspTokens.textContent=e.tokensUsed?`${e.tokensUsed}`:"--",this.inspPrompt.textContent=e.promptSent||this.latestPromptText||"Prompt n\xE3o registrado para esta requisi\xE7\xE3o.",this.inspRationale.textContent=e.rationale,this.inspActions.innerHTML="",e.actions.length>0)for(let t of e.actions){let a=document.createElement("div");a.className="eq-action-item",a.textContent=JSON.stringify(t),this.inspActions.appendChild(a)}else this.inspActions.innerHTML='<div class="text-muted" style="padding: 4px;">Nenhuma a\xE7\xE3o prescrita pela IA.</div>';else this.latestPromptText&&(this.inspPrompt.textContent=this.latestPromptText)}showFloatingAnswers(e){let t=e||this.latestPlan;t&&this.floatingAnswers.show(t)}hideFloatingAnswers(){this.floatingAnswers.hide()}renderKeysList(){if(!this.keysListEl)return;let e=P.getAllKeys();if(this.keysBadgeEl){let r=e.filter(i=>!i.isCooldown).length,n=e.reduce((i,d)=>i+(d.winCount||0),0),s=r>=3?" \u26A1 TURBO":"";this.keysBadgeEl.textContent=`${e.length} chave${e.length>1?"s":""} (${r} pronta${r!==1?"s":""})${s}`,this.keysBadgeEl.className=`eq-key-badge ${r>=3?"racing":r>0?"ready":"cooldown"}`}this.keysListEl.replaceChildren();let t=this.shadow?.querySelector("#eq-keys-collapsible");t&&t.style.display!=="none"&&(t.style.maxHeight="none",t.style.overflow="visible"),[...e].sort((r,n)=>{let s=r.winCount||0,i=n.winCount||0;if(s!==i)return i-s;let d=r.lastLatencyMs||99999,l=n.lastLatencyMs||99999;if(d!==l)return d-l;let p=r.isCooldown?1:0,b=n.isCooldown?1:0;return p-b}).forEach((r,n)=>{let s=e.findIndex(g=>g.id===r.id),i=s>=0?s:n,d=document.createElement("div");d.className="eq-key-item";let l=document.createElement("div");l.className="eq-key-info";let p=document.createElement("span");p.className="eq-key-label",p.textContent=r.label||`Chave ${i+1}`;let b=document.createElement("span");b.className="eq-key-masked",b.textContent=X.maskKey(r.key),b.title="Clique para copiar a chave",b.style.cursor="pointer",b.addEventListener("click",()=>{navigator.clipboard?.writeText(r.key),this.setStatus(`Chave ${i+1} copiada para a \xE1rea de transfer\xEAncia!`,"info")});let c=document.createElement("span");if(r.isCooldown){c.className="eq-key-badge cooldown";let g=Math.ceil(r.remainingCooldownMs/1e3);c.textContent=`\u23F1 Cooldown (${g}s)`}else r.lastError&&r.errorCount&&r.errorCount>3?(c.className="eq-key-badge invalid",c.textContent="Erro",c.title=r.lastError):r.lastLatencyMs?(c.className="eq-key-badge ready",c.textContent=`Pronta (${r.lastLatencyMs}ms)`):(c.className="eq-key-badge ready",c.textContent="Pronta");l.appendChild(p),l.appendChild(b),l.appendChild(c);let m=r.winCount||0;if(m>0){let g=document.createElement("span");g.className="eq-key-badge winner",g.textContent=`\u{1F3C6} ${m} vit\xF3ria${m>1?"s":""}`,g.title=`Esta chave foi a mais r\xE1pida ${m} vez${m>1?"es":""} nas corridas paralelas`,l.appendChild(g)}let u=document.createElement("div");u.className="eq-key-actions";let f=document.createElement("button");f.className="eq-icon-btn",f.type="button",f.title="Testar esta chave",f.innerHTML=A.sparkles,f.addEventListener("click",async()=>{this.setStatus(`Testando chave ${r.label||i+1}...`,"info");let g=await Oe(r.key);g.ok?(P.markSuccess(r.key,120),this.setStatus(`\u2713 ${r.label||`Chave ${i+1}`}: Conex\xE3o com Google Gemini aprovada!`,"success")):(P.markInvalid(r.key,g.message),this.setStatus(`\u26A0\uFE0F ${r.label||`Chave ${i+1}`}: ${g.message}`,"error")),this.renderKeysList()});let y=document.createElement("button");y.className="eq-icon-btn",y.type="button",y.title="Editar chave",y.innerHTML=A.edit,y.addEventListener("click",()=>{let g=window.prompt(`Editar ${r.label||`Chave ${i+1}`}:`,r.key);if(g!==null&&g.trim()){let v=P.updateKey(r.id,g.trim());if(v.ok){let w=P.exportRawKeys();this.callbacks.onSettingsChange({apiKey:w[0],apiKeys:w}),this.setStatus(`Chave ${i+1} atualizada com sucesso!`,"success"),this.renderKeysList()}else this.setStatus(v.message,"warning")}});let h=document.createElement("button");h.className="eq-icon-btn",h.type="button",h.title="Remover chave",h.innerHTML=A.trash,h.addEventListener("click",()=>{if(confirm(`Remover permanentemente a ${r.label||`Chave ${i+1}`}?`)){let g=P.removeKey(r.id);if(g.ok){let v=P.exportRawKeys();this.callbacks.onSettingsChange({apiKey:v[0]||"",apiKeys:v}),this.setStatus("Chave removida com sucesso.","info"),this.renderKeysList()}else this.setStatus(g.message,"warning")}}),u.appendChild(f),u.appendChild(y),u.appendChild(h),d.appendChild(l),d.appendChild(u),this.keysListEl.appendChild(d)})}updateModelSelect(e,t){let a=e.filter(s=>Q(s.id)),r=t&&Q(t)?t:Q(this.initialSettings.model)?this.initialSettings.model:"gemini-2.5-flash";this.modelSelect.innerHTML="";let n=!1;a.forEach(s=>{let i=s.id===r;i&&(n=!0),this.modelSelect.add(new Option(s.name,s.id,!1,i))}),!n&&r&&Q(r)&&this.modelSelect.add(new Option(`Gemini (${r})`,r,!1,!0)),this.modelSelect.value=r}updateSelectedModel(e){if(!Q(e))return;Array.from(this.modelSelect.options).some(a=>a.value===e)||this.modelSelect.add(new Option(`Gemini (${e})`,e,!1,!0)),this.modelSelect.value=e}mountHost(){let e=document.body||document.documentElement;if(!e){let t=()=>{let a=document.body||document.documentElement;a&&!this.host.isConnected&&a.appendChild(this.host)};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",t,{once:!0}):setTimeout(t,0);return}this.host.isConnected||e.appendChild(this.host)}applyHostDarkMode(e){document.getElementById("eq-host-dark-mode-style")?.remove(),this.host.classList.toggle("eq-dark-mode-active",e)}startQuestionTimer(){this.currentQuestionStartTime=Date.now(),this.questionLiveTimerInterval&&clearInterval(this.questionLiveTimerInterval),this.metricsLiveStatus&&(this.metricsLiveStatus.textContent="Calculando...",this.metricsLiveStatus.classList.add("active"));let e=()=>{if(!this.metricsLiveTime)return;let t=Date.now()-this.currentQuestionStartTime,a=Math.floor(t/6e4),r=Math.floor(t%6e4/1e3),n=Math.floor(t%1e3/10);this.metricsLiveTime.textContent=`${String(a).padStart(2,"0")}:${String(r).padStart(2,"0")}.${String(n).padStart(2,"0")}`};e(),this.questionLiveTimerInterval=setInterval(e,50)}stopQuestionTimer(e){if(this.questionLiveTimerInterval&&(clearInterval(this.questionLiveTimerInterval),this.questionLiveTimerInterval=null),this.metricsLiveStatus&&(this.metricsLiveStatus.textContent="Parado",this.metricsLiveStatus.classList.remove("active")),this.metricsLiveTime&&this.currentQuestionStartTime>0){let t=e!==void 0?e:Math.max(0,Date.now()-this.currentQuestionStartTime),a=Math.floor(t/6e4),r=Math.floor(t%6e4/1e3),n=Math.floor(t%1e3/10);this.metricsLiveTime.textContent=`${String(a).padStart(2,"0")}:${String(r).padStart(2,"0")}.${String(n).padStart(2,"0")}`}}updateTimingMetrics(e){let t=e||Te();if(!this.metricTotalTime)return;let a=Math.floor(t.totalElapsedMs/1e3),r=Math.floor(a/60),n=a%60;this.metricTotalTime.textContent=`${String(r).padStart(2,"0")}:${String(n).padStart(2,"0")}`;let s=(t.averageDurationMs/1e3).toFixed(1);this.metricAvgTime.textContent=`${s}s`,this.metricTotalCount.textContent=String(t.completedQuestionsCount),this.metricsTotalBadge&&(this.metricsTotalBadge.textContent=`${t.completedQuestionsCount} Quest\xE3o(\xF5es)`),this.metricsHistoryCount&&(this.metricsHistoryCount.textContent=`${t.records.length} registros`),this.renderMetricsHistory(t.records)}renderMetricsHistory(e){if(!this.metricsHistoryList)return;if(e.length===0){this.metricsHistoryList.innerHTML='<div class="eq-metrics-empty">Nenhuma quest\xE3o respondida nesta sess\xE3o ainda.</div>';return}this.metricsHistoryList.innerHTML="";let t=[...e].reverse();for(let a of t){let r=document.createElement("div");r.className="eq-metrics-item";let n=document.createElement("div");n.className="eq-metrics-item-left";let s=document.createElement("span");s.className="eq-metrics-badge",s.textContent=`Q${a.questionIndex}`;let i=document.createElement("div");i.className="eq-metrics-item-info";let d=document.createElement("div");d.className="eq-metrics-item-title",d.textContent=a.questionTitle||`Quest\xE3o ${a.questionIndex}`;let l=document.createElement("div");l.className="eq-metrics-item-meta";let p=new Date(a.timestamp).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit",second:"2-digit"}),b=a.mode?a.mode.replace("_"," "):"auto";l.textContent=`${p} \u2022 Modo: ${b}${a.actionsCount?` \u2022 ${a.actionsCount} a\xE7\xE3o(\xF5es)`:""}`,i.appendChild(d),i.appendChild(l),n.appendChild(s),n.appendChild(i);let c=document.createElement("div");c.className="eq-metrics-item-right";let m=document.createElement("span");m.className="eq-metrics-item-dur",m.textContent=`${(a.durationMs/1e3).toFixed(2)}s`;let u=document.createElement("span");u.className=`eq-metrics-item-status is-${a.status}`,u.textContent=a.status==="verified"||a.status==="answered"?"\u2713 Injetado":a.status==="manual"?"Gabarito":"Pendente",c.appendChild(m),c.appendChild(u),r.appendChild(n),r.appendChild(c),this.metricsHistoryList.appendChild(r)}}copyMetricsReport(){let e=Te(),t=[];t.push("# Relat\xF3rio de Desempenho e Tempo \u2014 EasyQuiz"),t.push(`- **Quest\xF5es Respondidas:** ${e.completedQuestionsCount}`),t.push(`- **Tempo Total:** ${(e.totalElapsedMs/1e3).toFixed(1)}s`),t.push(`- **Tempo M\xE9dio por Quest\xE3o:** ${(e.averageDurationMs/1e3).toFixed(2)}s`),t.push(""),t.push("### Hist\xF3rico:"),e.records.length===0?t.push("_Nenhum registro ainda._"):e.records.forEach((a,r)=>{t.push(`${r+1}. **${a.questionTitle||`Q${a.questionIndex}`}**: ${(a.durationMs/1e3).toFixed(2)}s (${a.status})`)}),navigator.clipboard.writeText(t.join(`
`)).then(()=>{if(this.metricsCopyBtn){let a=this.metricsCopyBtn.innerHTML;this.metricsCopyBtn.innerHTML="\u2713 Copiado!",setTimeout(()=>{this.metricsCopyBtn.innerHTML=a},1500)}})}destroy(){this.stopStopwatch(),this.stopQuestionTimer(),this.autopilot.stop(),this.applyHostDarkMode(!1),this.callbacks.onDestroy(),this.host.remove()}};function $o(){try{if(typeof document>"u"||!document.head||document.querySelector("link[data-easyquiz-preconnect]"))return;let o=document.createElement("link");o.rel="preconnect",o.href="https://generativelanguage.googleapis.com",o.crossOrigin="anonymous",o.setAttribute("data-easyquiz-preconnect","true"),document.head.appendChild(o);let e=document.createElement("link");e.rel="dns-prefetch",e.href="https://generativelanguage.googleapis.com",e.setAttribute("data-easyquiz-preconnect","true"),document.head.appendChild(e)}catch{}}async function Po(){let o=window;if(Ae(),$o(),o.__easyquiz){try{o.__easyquiz.destroy()}catch{}try{document.getElementById("easyquiz-shadow-root")?.remove()}catch{}}let e=We(),t=null,a=null,r=0,n=new Ge(e,{onAnalyze:(l=1,p,b=!1)=>s(l,p,b),onApply:(l=1)=>void i(l),onDestroy:()=>{if(a){try{a.abort()}catch{}a=null}Ee(),delete o.__easyquiz},onCancel:()=>{if(a){try{a.abort()}catch{}a=null}Ee(),n.setProgress(0),n.setInterrupted("Opera\xE7\xE3o cancelada imediatamente pelo usu\xE1rio.")},onSettingsChange:l=>{e=wt(l)}});o.__easyquiz={toggle:()=>n.toggle(),destroy:()=>n.destroy(),analyze:async()=>{await s()}},window.addEventListener("keydown",l=>{if(l.altKey&&(l.key==="q"||l.key==="Q")){if(l.preventDefault(),!n)return;n.toggle(!0),s()}});async function s(l=1,p,b=!1){if(!e.apiKey){n.setStatus("Configure sua chave de API Gemini acima para come\xE7ar.","error"),n.toggle(!0);return}if(a)try{a.abort()}catch{}a=new AbortController;let c=a,m=()=>{try{c.abort()}catch{}};if(p&&(p.aborted?c.abort():p.addEventListener("abort",m,{once:!0})),c.signal.aborted){n.setBusy(!1),n.setProgress(0);return}r=Date.now(),n.setBusy(!0,"Identificando o bloco da quest\xE3o ativa na p\xE1gina..."),n.setProgress(20,"Varrendo escopo do DOM e controles..."),Ee(),n.hideFloatingAnswers();try{let u=be(!1);u||(n.setStatus("Nenhum controle detectado. Tentando captura de tela inteira...","info"),u=ce()),ht(u.scope),n.updateContext(u),n.logToConsole(`> [DOM] Escopo: <${u.scope.tagName.toLowerCase()}> com ${u.controls.length} controle(s) e ${u.questionText.length} caracteres.`,"text-blue"),n.setStatus(`Quest\xE3o localizada (${u.controls.length} controles). Preparando an\xE1lise...`,"info"),n.setProgress(40,`Consultando Gemini (${e.model})...`);let f=await bt(u.scope,e.useVision);if(f.length>0){let C=f.map(M=>M.element).filter(Boolean);mt(C),n.updateImages(f)}if(c.signal.aborted)return;let y=e.model;n.setStatus(f.length>0?`Consultando Gemini (${y}) com ${f.length} imagem(ns) anexada(s)...`:`Consultando Gemini (${y}) via DOM nativo (modo r\xE1pido)...`,"info");let h=Se(u,f,e);n.setInspectorPrompt(h,e.model);let g=(C,M)=>{n.setStatus(C,M==="warning"?"info":M);let S=C.match(/Onda\s+\d+.*?\[([^\]]+)\]/);if(S){let x=S[1].split(",")[0].trim();n.setProgress(50,`Gemini ${x} respondendo...`)}},{plan:v,usedModel:w}=await Ne(u,f,e,g,c.signal);if(c.signal.aborted)return;if(v.needsMoreContext){if(n.setProgress(55,"Ampliando escopo da quest\xE3o..."),n.setStatus("Enunciado ou contexto isolado detectado pela IA. Acionando Sele\xE7\xE3o Geral Expandida...","info"),n.logToConsole("> [DOM] Enunciado isolado. Ampliando escopo para sele\xE7\xE3o expandida...","text-blue"),u=be(!0),u||(u=ce()),ht(u.scope),n.updateContext(u),f=await bt(u.scope,e.useVision),f.length>0){let S=f.map(x=>x.element).filter(Boolean);mt(S),n.updateImages(f)}n.setStatus(`Reconsultando IA com escopo ampliado (${u.controls.length} controles)...`,"info");let C=Se(u,f,e);n.setInspectorPrompt(C,e.model),v=(await Ne(u,f,e,g,c.signal)).plan}if(c.signal.aborted)return;if(n.setProgress(70,"Resposta recebida da IA! Processando plano..."),n.logToConsole(`> [IA] Modelo: ${w||e.model} | Modo: ${v.mode} | Confian\xE7a: ${(v.confidence*100).toFixed(0)}%`,"text-green"),v.rationale&&n.logToConsole(`> [IA] Racioc\xEDnio: "${v.rationale}"`,"text-blue"),n.logToConsole(`> [IA] ${v.actions.length} a\xE7\xE3o(\xF5es) prescritas no plano.`,"text-blue"),v.memoryToStore&&(Et(v.memoryToStore),n.logToConsole(`> [RAG] \u{1F9E0} Nova mem\xF3ria te\xF3rica salva na sess\xE3o: "${v.memoryToStore}"`,"text-yellow")),v.imageDescriptions&&v.imageDescriptions.length>0){n.logToConsole(`> [VISION] \u{1F5BC}\uFE0F An\xE1lise de ${v.imageDescriptions.length} imagem(ns) pela IA:`,"text-blue");for(let C of v.imageDescriptions){let M=C.relevant?"\u2705":"\u26A0\uFE0F";n.logToConsole(`>   ${M} Imagem ${C.index+1} [${C.relevant?"RELEVANTE":"IGNORADA"}]: ${C.description}`,C.relevant?"text-blue":"text-yellow")}}return t=v,n.updateContext(u,v),Ut(v.actions,v.confidence),n.setPlan(v,!e.dryRun),v.pageType==="conclusion"?(n.setProgress(100,"Atividade conclu\xEDda!"),n.setStatus("Atividade conclu\xEDda ou tela final detectada pela IA.","success")):v.pageType==="info"?(n.setProgress(100,"Contexto absorvido na mem\xF3ria!"),n.setStatus("\u{1F4D8} Conte\xFAdo de contexto absorvido na mem\xF3ria RAG. Avan\xE7ando...","success")):v.pageType==="start"?(n.setProgress(100,"In\xEDcio detectado!"),n.setStatus("In\xEDcio de atividade detectado. Iniciando...","info")):(n.setProgress(80,"Plano de resolu\xE7\xE3o pronto!"),n.setStatus(e.dryRun?"Simula\xE7\xE3o conclu\xEDda. As respostas foram real\xE7adas na p\xE1gina sem altera\xE7\xE3o.":"Resolu\xE7\xE3o pronta! Verifique o realce na tela e aplique quando desejar.","success")),e.dryRun&&v.pageType==="question"&&n.showFloatingAnswers(v),c.signal.aborted?void 0:((b||e.autoApply)&&!e.dryRun&&await i(l,c.signal,b),v)}catch(u){if(c.signal.aborted||u instanceof Error&&(u.name==="AbortError"||u.message.includes("cancelada"))){Ee(),n.setProgress(0),n.setInterrupted("Opera\xE7\xE3o cancelada pelo usu\xE1rio.");return}Ee(),n.setProgress(0);let f=u instanceof Error?u.message:"Falha desconhecida na an\xE1lise.";n.setStatus(f,"error"),n.setErrorDiagnostic(f,"An\xE1lise da IA");return}finally{p?.removeEventListener("abort",m),a===c&&(a=null),c.signal.aborted||n.setBusy(!1)}}async function i(l=1,p,b=!1){if(p?.aborted)return;if(!t){n.setStatus("Nenhum plano dispon\xEDvel para aplicar. Execute a an\xE1lise primeiro.","error");return}if(e.dryRun){n.setStatus("O modo de simula\xE7\xE3o est\xE1 ativo. Desmarque para poder aplicar.","error");return}let c=t.pageType==="info"||t.pageType==="start",m=(b||e.autoAdvance||c)&&t.confidence>=e.confidenceThreshold&&!t.needsMoreContext;n.setBusy(!0,"Aplicando respostas no formul\xE1rio..."),n.setProgress(85,`Aplicando ${t.actions.length} a\xE7\xE3o(\xF5es) no formul\xE1rio...`),n.logToConsole(`> [EXEC] Iniciando aplica\xE7\xE3o com 6 vias de persist\xEAncia para ${t.actions.length} a\xE7\xE3o(\xF5es)...`,"text-blue");try{let u=await He(t,m,l,fe(e));if(p?.aborted)return;if(n.setExecutionReport(u),u.failedActions&&u.failedActions.length>0){n.logToConsole(`> [REPLAN] \u26A0\uFE0F ${u.failedActions.length} a\xE7\xE3o(\xF5es) n\xE3o verificadas no DOM. Iniciando replanejamento...`,"text-yellow");for(let v of u.failedActions){let w=v.action,C=w.t==="drag"?`drag: "${w.from}" \u2192 "${w.to}"`:w.t==="clk"||w.t==="chk"?`${w.t}: "${w.id}"`:w.t==="val"?`val: "${w.id}" = "${w.v}"`:JSON.stringify(w).slice(0,80);n.logToConsole(`>   \u2717 [${w.t.toUpperCase()}] ${C} | ${v.evidence.slice(0,80)}`,"text-yellow")}await d(u.failedActions,p)}let f=r>0?Date.now()-r:1200,y=u.verified>0,h=u.applied>0;if(u.success||y&&h){n.setProgress(100,"Sucesso! Resposta preenchida."),n.logToConsole(`> [DOM] \u2713 ${u.applied} a\xE7\xE3o(\xF5es) aplicada(s) \u2014 ${u.verified} verificada(s) no DOM.`,"text-green"),u.advanced?n.logToConsole("> [NAV] \u2713 Bot\xE3o de confirma\xE7\xE3o/avan\xE7o acionado com sucesso!","text-green"):m&&n.logToConsole(`> [NAV] ${u.navigationEvidence}`,"text-blue"),n.setStatus(u.advanced?`Sucesso: ${u.applied} resposta(s) preenchida(s) e avan\xE7ando.`:`Resposta aplicada na p\xE1gina (${u.applied} a\xE7\xE3o(\xF5es)).`,"success"),n.hideFloatingAnswers();let v=Ct({id:`q-${Date.now()}`,questionIndex:(Te().records.length||0)+1,questionTitle:t.rationale?t.rationale.slice(0,45)+"...":`Quest\xE3o ${t.mode||"Auto"}`,durationMs:f,status:"answered",mode:t.mode,actionsCount:u.applied});n.updateTimingMetrics(v)}else h?(n.setProgress(75,"Resposta aplicada (verifica\xE7\xE3o incerta)."),n.logToConsole(`> [DOM] \u26A0\uFE0F ${u.applied} a\xE7\xE3o(\xF5es) disparadas mas sem confirma\xE7\xE3o DOM clara. Pendentes: ${u.failed.join(", ")||"nenhuma"}`,"text-yellow"),n.setStatus(`Resposta preenchida (${u.applied} a\xE7\xE3o(\xF5es) aplicadas, verifica\xE7\xE3o incerta).`,"warning")):(n.setProgress(0,"Alvo de resposta n\xE3o localizado."),n.logToConsole(`> [DOM] Alerta: nenhum controle de resposta foi modificado no DOM. Pend\xEAncias: ${u.failed.join(", ")||"nenhuma a\xE7\xE3o"}.`,"text-yellow"),n.setStatus("Controle de resposta n\xE3o encontrado na p\xE1gina. Use o bot\xE3o Gabarito no painel se desejar.","warning"),e.dryRun&&n.showFloatingAnswers(t))}catch(u){n.setProgress(0);let f=u instanceof Error?u.message:"Falha ao aplicar plano.";n.setStatus(`Erro ao aplicar: ${f}`,"error"),n.logToConsole(`> [ERRO] ${f}`,"text-red")}finally{n.setBusy(!1)}}async function d(l,p){if(!t)return;let b=l.filter(m=>m.action.t==="drag");for(let m of b){if(p?.aborted)return;let u=m.action,f=String(u.from||""),y=String(u.to||""),h=Vt(f,y,f,y);n.logToConsole(`> [REPLAN] \u{1F527} Drag JS fallback: "${f}" \u2192 "${y}"`,"text-blue");let g={...t,actions:[{t:"js",v:h}],pageType:"question"},v=await He(g,!1,1,fe(e));n.logToConsole(v.applied>0?"> [REPLAN] \u2705 Drag fallback aplicado!":"> [REPLAN] \u2717 Drag fallback sem efeito.",v.applied>0?"text-green":"text-yellow")}let c=l.filter(m=>m.action.t!=="drag");if(c.length!==0&&!p?.aborted){n.logToConsole(`> [REPLAN] \u{1F504} ${c.length} a\xE7\xE3o(\xF5es) pendente(s) \u2014 iniciando pipeline de recupera\xE7\xE3o multi-estrat\xE9gia...`,"text-blue");for(let m of c){if(p?.aborted)return;let u=m.action,f=u.t==="clk"||u.t==="chk"?`${u.t}: "${u.id}"`:u.t==="val"?`val: "${u.id}" = "${u.v}"`:u.t==="sel"?`sel: "${u.id}" = "${Array.isArray(u.v)?u.v[0]:u.v}"`:JSON.stringify(u).slice(0,60);n.logToConsole(`> [REPLAN] \u26A1 Recuperando: ${f}`,"text-blue");let y=String(u.id||u.name||u.selector||""),h=u.v!==void 0?String(u.v):"";n.logToConsole("> [REPLAN] Estrat\xE9gia 1: rota alternativa padr\xE3o...","text-blue");try{if(await je(m.action),await new Promise(g=>setTimeout(g,250)),Z(m.action)){n.logToConsole(`> [REPLAN] \u2705 Estrat\xE9gia 1 OK: ${f}`,"text-green");continue}}catch{}if(u.t==="clk"||u.t==="chk"){n.logToConsole("> [REPLAN] Estrat\xE9gia 2: script injection (bypass isTrusted)...","text-blue");try{let g=I(y,h)||I(y.replace(/[^\w\s]/g," ").trim(),h);if(g&&(ct(g),await new Promise(v=>setTimeout(v,300)),Z(m.action))){n.logToConsole(`> [REPLAN] \u2705 Estrat\xE9gia 2 OK: ${f}`,"text-green");continue}}catch{}}if(u.t==="clk"||u.t==="chk"){n.logToConsole("> [REPLAN] Estrat\xE9gia 3: simula\xE7\xE3o de teclado (Tab+Space)...","text-blue");try{let g=I(y,h)||I(y.replace(/[^\w\s]/g," ").trim(),h);if(g&&(g.focus?.(),await new Promise(v=>setTimeout(v,50)),g.dispatchEvent(new KeyboardEvent("keydown",{key:" ",code:"Space",keyCode:32,bubbles:!0,cancelable:!0})),g.dispatchEvent(new KeyboardEvent("keyup",{key:" ",code:"Space",keyCode:32,bubbles:!0,cancelable:!0})),await new Promise(v=>setTimeout(v,80)),g.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0,cancelable:!0})),g.dispatchEvent(new KeyboardEvent("keyup",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0,cancelable:!0})),await new Promise(v=>setTimeout(v,200)),Z(m.action))){n.logToConsole(`> [REPLAN] \u2705 Estrat\xE9gia 3 OK: ${f}`,"text-green");continue}}catch{}}if(u.t==="clk"||u.t==="chk"||u.t==="val"){n.logToConsole("> [REPLAN] Estrat\xE9gia 4: internals Vue/React via script injection...","text-blue");try{let g=I(y,h)||I(y.replace(/[^\w\s]/g," ").trim(),h);if(g){let v=g.id,w=!!v;v||(v=`__eq_s4_${Math.random().toString(36).slice(2,8)}`,g.id=v);let C=String(u.v??""),M=u.t==="val",S=document.createElement("script");if(S.textContent=`(function(){
              var el=document.getElementById(${JSON.stringify(v)});
              if(!el)return;
              // Tenta Vue 3 update trigger
              try{if(el.__vueParentComponent){var ins=el.__vueParentComponent;var pr=ins.props||{};if(pr.modelValue!==undefined&&typeof ins.emit==='function'){ins.emit('update:modelValue',${M?JSON.stringify(C):"true"});}}}catch(e){}
              // Tenta React setState via fiber
              try{var fk=Object.keys(el).find(function(k){return k.startsWith('__reactFiber');});
              if(fk){var fb=el[fk];while(fb){var p=fb.memoizedProps||{};
              if(typeof p.onChange==='function')try{p.onChange({target:el,currentTarget:el,type:'change',bubbles:true,preventDefault:function(){},stopPropagation:function(){}});}catch(e){}
              if(typeof p.onInput==='function')try{p.onInput({target:el,currentTarget:el,type:'input',bubbles:true,preventDefault:function(){},stopPropagation:function(){}});}catch(e){}
              fb=fb.return;}}}catch(e){}
            })()`.replace(/\n\s+/g,""),document.head.appendChild(S),S.remove(),w||setTimeout(()=>{try{g.id===v&&g.removeAttribute("id")}catch{}},0),await new Promise(x=>setTimeout(x,300)),Z(m.action)){n.logToConsole(`> [REPLAN] \u2705 Estrat\xE9gia 4 OK: ${f}`,"text-green");continue}}}catch{}}if(p?.aborted)return;n.logToConsole("> [REPLAN] Estrat\xE9gia 5: re-consulta IA com diagn\xF3stico focado...","text-blue");try{let g="";try{let E=document.querySelector(`[data-easyquiz-id="${u.id}"]`)||document.getElementById(u.id||"")||Array.from(document.querySelectorAll('input, button, [role="radio"], [role="checkbox"], [role="option"]')).find(H=>(H.textContent||"").toLowerCase().includes(String(u.id||"").toLowerCase().slice(0,20)));E&&(g=E.outerHTML.slice(0,400))}catch{}let v=be(!1)||ce(),w=`A\xE7\xE3o (${u.t}) alvo="${y}" valor="${u.v||u.c||""}" \u2014 Falha: "${m.evidence.slice(0,80)}"${g?`
HTML do alvo: ${g}`:""}`,C=m.strategiesAttempted?[m.strategiesAttempted].flat().concat(["alternative-path","injectScript","keyboard","vue-react-internals"]):["alternative-path","injectScript","keyboard","vue-react-internals"],M=`[REPLANEJAMENTO URGENTE \u2014 TENTATIVA FINAL]
A seguinte a\xE7\xE3o falhou ap\xF3s ${C.length} estrat\xE9gias autom\xE1ticas: ${C.join(", ")}.

${w}

Contexto atual da quest\xE3o:
${v?.questionText.slice(0,400)||"N/A"}

Controles dispon\xEDveis:
${JSON.stringify((v?.controls||[]).slice(0,6).map(E=>({id:E.id,type:E.type,label:E.label,options:E.options?.slice(0,3)})),null,2)}

TAREFA: Gere APENAS a\xE7\xF5es {t:"js"} com JavaScript criativo e robusto que consiga marcar/preencher/clicar o controle correto. 
Tente usar: document.querySelector, getComputedStyle, querySelectorAll com seletores diferentes, ou manipula\xE7\xE3o DOM direta.
Voc\xEA pode tentar m\xFAltiplas abordagens em um \xFAnico bloco JS. Seja criativo.
N\xC3O repita as estrat\xE9gias j\xE1 tentadas acima.`,S={...v,questionText:M},x=await Ne(S,[],{...e},E=>n.logToConsole(`> [REPLAN-AI] ${E}`,"text-blue"),p);if(p?.aborted||!x?.plan){n.logToConsole("> [REPLAN] \u2717 Re-consulta n\xE3o retornou plano.","text-yellow");continue}let T=x.plan.actions.filter(E=>E.t==="js");if(T.length===0){n.logToConsole("> [REPLAN] \u2139\uFE0F IA n\xE3o gerou a\xE7\xF5es JS de fallback.","text-yellow");continue}n.logToConsole(`> [REPLAN] \u{1F916} IA gerou ${T.length} a\xE7\xE3o(\xF5es) JS custom. Executando...`,"text-blue");let L={...t,actions:T,pageType:"question"},$=await He(L,!1,1,fe(e));$.applied>0?n.logToConsole(`> [REPLAN] \u2705 Estrat\xE9gia 5 OK: ${$.applied} a\xE7\xE3o(\xF5es) JS executada(s)!`,"text-green"):n.logToConsole("> [REPLAN] \u2717 Todas as estrat\xE9gias esgotadas para esta a\xE7\xE3o.","text-yellow")}catch(g){n.logToConsole(`> [REPLAN] Erro na re-consulta: ${g instanceof Error?g.message:String(g)}`,"text-yellow")}}}}n.toggle(!0)}Po().catch(o=>{console.error("[EasyQuiz] Erro fatal na inicializa\xE7\xE3o:",o),window.alert(`EasyQuiz: falha ao iniciar: ${o instanceof Error?o.message:String(o)}`)});})();
