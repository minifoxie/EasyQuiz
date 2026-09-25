/* EasyQuiz v3.7.6 (5215cb6) — Resolução inteligente de quizzes sem servidor
 * GitHub: https://github.com/minifoxie/EasyQuiz
 * 100% Client-side. Direct Google Gemini REST API.
 */
"use strict";(()=>{var ne={apiKey:"",apiKeys:[],model:"gemini-3.5-flash-lite",uiMode:"easy",modeHint:"",engine:"smart",dryRun:!1,autoApply:!0,autoAdvance:!1,hostDarkMode:!0,useVision:!0,confidenceThreshold:.8,toastStacking:!0,theme:"mega-black",panelOpacity:.65,borderRadius:"none",glowEffects:!1,highlightColor:"#ffd600",languageHint:"auto",maxRetries:2,showTokenUsage:!0,autoScrollLogs:!0,compactMode:!1,enableSoundFeedback:!1};function ce(o){if(!o||typeof o!="string")return!1;let e=o.toLowerCase().trim().replace(/^models\//,"");if(!e.includes("gemini"))return!1;let t=["imagen","image","veo","omni","video","embedding","embed","tts","audio","speech","voice","sound","live","transcribe","bidi","aqa","learnlm","deep-research","computer-use","robotics","rt-1","rt-2","mediapipe","cyber","latest","-ultra","experimental"];for(let n of t)if(e.includes(n))return!1;return!(!e.includes("flash")&&!e.includes("pro"))}var Mt="easyquiz_settings_v2",ze="easyquiz_activity_metrics";function It(){try{let o=localStorage.getItem(Mt);if(!o){let r=localStorage.getItem("easyquiz_settings_v1");if(r){let s=JSON.parse(r);return{...ne,apiKey:s.apiKey||""}}return{...ne}}let e=JSON.parse(o),t=typeof e.model=="string"&&ce(e.model)?e.model:ne.model,n=Array.isArray(e.apiKeys)?e.apiKeys.map(r=>typeof r=="string"?r.trim().replace(/^["']|["']$/g,""):"").filter(r=>r.length>5):[],i=typeof e.apiKey=="string"?e.apiKey.trim().replace(/^["']|["']$/g,""):"";if(n.length===0&&i&&(n=[i]),n.length===0)try{let r=localStorage.getItem("easyquiz_api_keys");if(r){let s=JSON.parse(r);Array.isArray(s)&&(n=s.filter(d=>typeof d=="string"&&d.trim().length>5))}}catch{}return{apiKey:n[0]||i||ne.apiKey,apiKeys:n,model:t,uiMode:e.uiMode==="easy"||e.uiMode==="advanced"?e.uiMode:ne.uiMode,modeHint:e.modeHint??"",engine:e.engine??"smart",dryRun:!!e.dryRun,autoApply:e.autoApply!==void 0?!!e.autoApply:!0,autoAdvance:!!e.autoAdvance,hostDarkMode:e.hostDarkMode!==void 0?!!e.hostDarkMode:!0,useVision:e.useVision!==void 0?!!e.useVision:ne.useVision,confidenceThreshold:typeof e.confidenceThreshold=="number"?e.confidenceThreshold:ne.confidenceThreshold,toastStacking:e.toastStacking!==void 0?!!e.toastStacking:ne.toastStacking,theme:["mega-black","dark","purple-neon","gray-blue","light"].includes(e.theme)?e.theme:ne.theme,panelOpacity:typeof e.panelOpacity=="number"?e.panelOpacity:ne.panelOpacity,borderRadius:["none","soft","rounded"].includes(e.borderRadius)?e.borderRadius:ne.borderRadius,glowEffects:e.glowEffects!==void 0?!!e.glowEffects:ne.glowEffects,highlightColor:typeof e.highlightColor=="string"?e.highlightColor:ne.highlightColor,languageHint:typeof e.languageHint=="string"?e.languageHint:ne.languageHint,maxRetries:typeof e.maxRetries=="number"?e.maxRetries:ne.maxRetries,showTokenUsage:e.showTokenUsage!==void 0?!!e.showTokenUsage:ne.showTokenUsage,autoScrollLogs:e.autoScrollLogs!==void 0?!!e.autoScrollLogs:ne.autoScrollLogs,compactMode:e.compactMode!==void 0?!!e.compactMode:ne.compactMode,enableSoundFeedback:e.enableSoundFeedback!==void 0?!!e.enableSoundFeedback:ne.enableSoundFeedback}}catch{return{...ne}}}function _t(){try{localStorage.removeItem(Mt),localStorage.removeItem("easyquiz_settings_v1"),localStorage.removeItem(ze),sessionStorage.removeItem(ze);let o=[];for(let e=0;e<localStorage.length;e++){let t=localStorage.key(e);t&&(t.startsWith("eq_")||t.startsWith("easyquiz_"))&&o.push(t)}o.forEach(e=>localStorage.removeItem(e)),rt()}catch(o){console.warn("[EasyQuiz] Erro ao resetar dados:",o)}}function Ht(o){try{let e=localStorage.getItem("eq_domain_cache_"+o);if(!e)return{};let t=JSON.parse(e);if(t.advanceSelector&&/inject|injetar/i.test(t.advanceSelector)){t.advanceSelector=void 0;try{localStorage.removeItem("eq_domain_cache_"+o)}catch{}}return t}catch{return{}}}function Pt(o,e){if(e.advanceSelector&&/inject|injetar/i.test(e.advanceSelector))return;let n={...Ht(o),...e};try{localStorage.setItem("eq_domain_cache_"+o,JSON.stringify(n))}catch(i){console.warn("[EasyQuiz] Erro cache de dominio:",i)}}function eo(o){let e=It(),t=Array.isArray(o.apiKeys)?o.apiKeys.map(a=>typeof a=="string"?a.trim().replace(/^["']|["']$/g,""):"").filter(a=>a.length>5):e.apiKeys,n;typeof o.apiKey=="string"?n=o.apiKey.trim().replace(/^["']|["']$/g,""):Array.isArray(o.apiKeys)&&o.apiKeys.length>0?n=t[0]||"":n=e.apiKey,n&&!t.includes(n)&&(t=[n,...t]),t.length>0&&(!n||!t.includes(n))&&(n=t[0]);let i={...e,...o,apiKey:n,apiKeys:t};try{localStorage.setItem(Mt,JSON.stringify(i)),localStorage.setItem("easyquiz_api_keys",JSON.stringify(t))}catch(a){console.warn("[EasyQuiz] Falha ao persistir configura\xE7\xF5es no localStorage:",a)}return i}var Pe=[],Zt=12,Ro=1200;function to(o){let e=o.trim().replace(/\s+/g," ").slice(0,Ro);e&&!Pe.includes(e)&&(Pe.push(e),Pe.length>Zt&&(Pe=Pe.slice(-Zt)))}function st(){return Pe}function rt(){Pe=[]}function oo(){return{startTime:Date.now(),totalElapsedMs:0,completedQuestionsCount:0,averageDurationMs:0,records:[]}}var Xe=oo();function Ve(){try{localStorage.removeItem(ze)}catch{}return Xe}function No(o){Xe=o;try{let e=JSON.stringify(o);sessionStorage.setItem(ze,e),localStorage.removeItem(ze)}catch{}}function no(o){let e=Xe,t=Date.now(),n=e.records[e.records.length-1];if(n&&n.id===o.id&&t-n.timestamp<3e3)return e;let i={...o,timestamp:t},a=[...e.records,i],r=a.filter(u=>u.status==="answered"||u.status==="verified").length,s=a.reduce((u,h)=>u+h.durationMs,0),d=r>0?Math.round(s/r):0,l={startTime:e.startTime||t,totalElapsedMs:Math.max(t-(e.startTime||t),s),completedQuestionsCount:r,averageDurationMs:d,records:a};return No(l),l}function Ke(){Xe=oo();try{sessionStorage.removeItem(ze),localStorage.removeItem(ze)}catch{}return Xe}var ao=`Voc\xEA \xE9 o motor operacional inteligente do EasyQuiz. Sa\xEDda EXCLUSIVA em JSON minificado, sem markdown, sem coment\xE1rios, sem texto fora do JSON.

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
  \u2192 Campos de matem\xE1tica (.mq-editable-field) exigem nota\xE7\xE3o LaTeX. Exemplo: fra\xE7\xF5es como \\frac{1}{2}, ra\xEDzes como \\sqrt{3}.
  \u2192 Use \`val\` para campos de texto/matem\xE1tica. O sistema injeta via MathQuill automaticamente.
  \u2192 Use \`sel\` para dropdowns e \`chk\` ou \`clk\` para multipla escolha/checkbox.
  \u2192 O motor far\xE1 o fallback autom\xE1tico para a API do React/Perseus, n\xE3o emita a\xE7\xF5es \`js\` a menos que explicitamente exigido.

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
`;function jo(o,e){return/forms\.(google|gle)\.com|docs\.google\.com\/forms/i.test(o)||e.includes("Qr7Oae")||e.includes("freebirdFormviewer")||e.includes("data-item-id")?"[PLATAFORMA: Google Forms \u2014 use clk nos containers de alternativa; IDs via data-item-id ou texto da op\xE7\xE3o]":/wayground|quizizz/i.test(o)||e.includes("data-functional-selector")?e.includes("classification")||e.toLowerCase().includes("fato")||e.toLowerCase().includes("opini")?`[PLATAFORMA: Wayground/Quizizz CLASSIFICA\xC7\xC3O drag-and-drop]
[RESPOSTAS] ter\xE1 items com t="draggable" e id hexadecimal (ex: 695fa5b6...).
Use EXCLUSIVAMENTE: {t:"drag", from:"ID_hexadecimal_do_card", to:"NOME_DA_CATEGORIA"}
Exemplo: {t:"drag",from:"695fa5b69885555d8155a5ac",to:"FATO"}
Classifique TODOS os items (1 drag por item) antes de emitir adv.
mode: "arrastar_soltar"`:"[PLATAFORMA: Wayground/Quizizz \u2014 alternativas s\xE3o cards clic\xE1veis, use clk]":/khanacademy\.org/i.test(o)||e.includes("perseus")?"[PLATAFORMA: Khan Academy \u2014 widgets Perseus; use js via $eq para widgets interativos se necess\xE1rio]":/moodle|ava\.|classroom\.google/i.test(o)?"[PLATAFORMA: Moodle/AVA/Classroom \u2014 formul\xE1rios padr\xE3o]":/duolingo/i.test(o)?"[PLATAFORMA: Duolingo \u2014 tiles clic\xE1veis, use clk por texto]":/blackboard|canvas\.instructure/i.test(o)?"[PLATAFORMA: Canvas/Blackboard \u2014 quiz-question padr\xE3o]":/socrative|kahoot/i.test(o)?"[PLATAFORMA: Socrative/Kahoot \u2014 alternativas s\xE3o bot\xF5es, use clk]":""}function Ge(o,e,t){let n=o.htmlSnippet.includes("draggable")||o.htmlSnippet.includes("perseus")||o.htmlSnippet.includes("category")||o.htmlSnippet.includes("dropzone")||o.controls.some(v=>v.type==="draggable"||v.type==="dropzone"),i=/katex|latex|\\frac|\\sqrt/i.test(o.htmlSnippet),a=/forms\.(google|gle)\.com|docs\.google\.com\/forms/i.test(o.sourceUrl)||o.htmlSnippet.includes("Qr7Oae")||o.htmlSnippet.includes("data-item-id")||o.htmlSnippet.includes("freebirdFormviewer"),r=(/wayground|quizizz/i.test(o.sourceUrl)||o.htmlSnippet.includes("data-functional-selector"))&&(o.htmlSnippet.includes("classification")||o.controls.filter(v=>v.role==="answer").length===0),s=o.controls.filter(v=>v.role!=="navigation").length===0,d=s||n||a||r||i&&o.questionText.length<60,l=s?4500:r?6e3:1800,u=d?`
[HTML]:
${o.htmlSnippet.slice(0,l).replace(/\s+/g," ")}`:"",h="";if(s&&typeof document<"u")try{let v=Array.from(document.querySelectorAll('input:not([type=hidden]), textarea, select, button, [role="button"], [role="radio"], [role="checkbox"], [role="option"], [onclick], [data-action], a[href]:not([href="#"]), [tabindex]:not([tabindex="-1"])')).filter(y=>{let E=y,w=E.getBoundingClientRect?.()||{width:0,height:0};return w.width>0&&w.height>0&&!E.closest("#easyquiz-shadow-root, .eq-sidebar")}).slice(0,40).map(y=>{let E=y,w=E.tagName.toLowerCase(),q=E.id?`#${E.id}`:"",C=E.className&&typeof E.className=="string"?`.${E.className.trim().split(/\s+/).slice(0,2).join(".")}`:"",L=(E.textContent||E.value||E.getAttribute("aria-label")||"").trim().slice(0,60),A=E.getAttribute("type")||E.getAttribute("role")||"";return`${w}${q}${C}[${A}] txt="${L}"`});v.length>0&&(h=`
[DOM-INTERATIVO]:
${v.join(`
`)}`)}catch{}let c=st(),m=c.length>0?`
[MEM\xD3RIA]:
${c.join(" | ")}
`:"",p=o.controls.filter(v=>v.role!=="navigation"),g=o.controls.filter(v=>v.role==="navigation"),f=jo(o.sourceUrl,o.htmlSnippet),b=f?`
${f}
`:"";return`--- AN\xC1LISE ---
[MODO]: ${t.engine} | Dica: ${t.modeHint||"Auto"}
[URL]: ${o.sourceUrl}
[P\xC1GINA]: ${o.pageTitle}${m}${b}
[DADOS]
[TEXTO]:
${o.questionText}${u}${h}

[RESPOSTAS]:
${(()=>{if(p.length===0)return"Nenhuma";let v=p.filter(T=>T.type==="checkbox"||T.type==="chk"),y=new Set(p.filter(T=>T.type==="radio").map(T=>T.name).filter(Boolean)),E=v.filter(T=>!T.name||!y.has(T.name)),w=/selecione as|assinale as|quais das|todas as|marque as|escolha as|quais dessas|quais dos/i.test(o.questionText),q=E.length>=2||w,C=y.size>1||/verdadeir|fals[oa]|\bv\s*\/\s*f\b|julgue|itens/i.test(o.questionText)&&y.size>=1,L=p.every(T=>T.type==="radio"||T.type==="chk")&&y.size===1&&!q&&!C,A=p.filter(T=>T.type==="text"||T.type==="number"||T.type==="val"||T.tag==="input"||T.tag==="textarea"),P=A.length>=2;return(C?`[GRADE VERDADEIRO/FALSO (${y.size||"m\xFAltiplas"} afirma\xE7\xF5es): voc\xEA DEVE julgar e marcar exatamente 1 op\xE7\xE3o (V ou F) para CADA uma das ${y.size} afirma\xE7\xF5es \u2014 emita ${y.size} a\xE7\xF5es chk separadas + adv]
`:q?`[MULTI-SELE\xC7\xC3O: marque TODOS os corretos, pode ser 2 ou mais]
`:L?`[ESCOLHA-\xDAnica: marque APENAS 1 op\xE7\xE3o]
`:P?`[M\xDALTIPLOS CAMPOS DE PREENCHIMENTO (${A.length} campos): emita uma a\xE7\xE3o val para CADA um dos ${A.length} campos abaixo com seu id exato]
`:"")+JSON.stringify(p.map(T=>({id:T.id,t:T.type,n:T.name||void 0,txt:T.label?T.label.length>160?T.label.slice(0,160)+"...":T.label:void 0,v:T.value||void 0,opt:T.options&&T.options.length?T.options.slice(0,20).map(x=>x.label||x.value):void 0})))})()}

[NAVEGA\xC7\xC3O]:
${g.length>0?g.map(v=>`"${v.label||v.id}"[${v.type}]`).join(","):"Nenhuma"}

[IMAGENS E GR\xC1FICOS ANEXADOS (${e.length})]:
${(()=>{if(e.length===0)return/\b(observ[ea]|analis[ea]|figur[a]|gráfic[o]|diagram[a]|image[mn]|mapa|tabela|veja|conforme|de acordo com|pela|ilustra|representa|mostr[a]|exib[ea]|consider[ea]\s+(a|o)\s+(image|figur|gráfic|diagram|tabela|mapa))\b/i.test(o.questionText)?"[AVISO CR\xCDTICO]: O enunciado referencia conte\xFAdo visual (gr\xE1fico/imagem/figura/diagrama) mas NENHUMA imagem foi capturada. Sua confian\xE7a DEVE ser \u22640.15. N\xC3O adivinhe \u2014 use apenas o contexto textual dispon\xEDvel.":"Nenhum anexo visual.";let v=e.filter(C=>C.captureStatus==="failed_relevant"),E=/\b(observ[ea]|analis[ea]|figur[a]|gráfic[o]|diagram[a]|image[mn]|mapa|tabela|veja|conforme|de acordo com|pela|ilustra|representa|mostr[a])\b/i.test(o.questionText),w=e.every(C=>C.captureStatus!=="captured"),q="";return(v.length>0||E&&w)&&(q=`
  [AVISO]: Imagem(s) relevante(s) do enunciado N\xC3O puderam ser capturadas visualmente. Use o contexto textual abaixo como substituto. Confian\xE7a deve ser reduzida.
`),q+e.map((C,L)=>{let A=C.associatedLabel||"Gr\xE1fico da Quest\xE3o",P=C.alt?` | alt: "${C.alt}"`:"";if(C.captureStatus==="failed_relevant")return`  - Imagem ${L+1} [IMAGEM_RELEVANTE_N\xC3O_CAPTURADA]: ${A}${P} | ${C.textContext||"sem contexto adicional"} | src: ${(C.source||"").slice(0,100)}`;if(C.captureStatus==="text_only")return`  - Imagem ${L+1} [CONTEXTO_TEXTUAL]: ${A}${P} | ${C.textContext||"sem contexto adicional"}`;if(C.captureStatus==="captured"||C.base64){let O=C.textContext?` | Textos e r\xF3tulos do gr\xE1fico: "${C.textContext}"`:"";return`  - Imagem ${L+1} [VISUAL_INLINE]: ${A}${P}${O}`}return`  - Imagem ${L+1} [FALHOU]: ${A}${P}`}).join(`
`)})()}
[/DADOS]
Sa\xEDda em JSON v\xE1lido.`}var Qo=new Set(["question","info","start","conclusion"]),Fo=new Set(["texto_livre","escolha_unica","escolha_multipla","verdadeiro_falso","preenchimento","acao_sem_resposta","categorizacao","ordenacao","arrastar_soltar"]),Uo=new Set(["val","chk","sel","clk","adv","js","drag"]),Xo=150,We=2e3;function ue(o,e=""){return o==null?e:typeof o=="string"?o.trim().slice(0,We):typeof o=="number"||typeof o=="boolean"?String(o).trim().slice(0,We):e}function Vo(o,e){if(!o||typeof o!="object")return null;let t=o,n=t.t;if(typeof n!="string"||!Uo.has(n))return null;if(n==="adv"){let s=t.id??t.target??t.name??t.selector;return{t:"adv",...ue(s)?{id:ue(s,"").slice(0,500)}:{}}}if(n==="drag"){let s=ue(t.from??t.source),d=ue(t.to??t.target??t.destination);return!s||!d?null:{t:"drag",from:s.slice(0,500),to:d.slice(0,500)}}if(n==="js"){let s=ue(t.v??t.code??t.script);return!s||s.length>8e3?null:{t:"js",v:s}}let i=t.id??t.target??t.name??t.selector??t.element;(i==null||i==="")&&n==="val"&&(i="1");let a=ue(i).slice(0,500);if(!a)return null;if(n==="val"){let s=t.v!==void 0?t.v:t.value!==void 0?t.value:t.val!==void 0?t.val:t.text!==void 0?t.text:t.answer;return{t:"val",id:a,v:ue(s).slice(0,We)}}if(n==="sel"){let s=t.v!==void 0?t.v:t.value!==void 0?t.value:t.val!==void 0?t.val:t.values,l=(Array.isArray(s)?s:[s]).map(u=>ue(u).slice(0,500)).filter(Boolean);return{t:"sel",id:a,v:l}}if(n==="chk"){let s=t.c===!1||t.c==="false"||t.c===0||t.c==="0"||t.c==="off"||t.c==="unchecked"||t.c==="desmarcar",d={t:"chk",id:a,c:!s};return t.v!==void 0&&(d.v=ue(t.v).slice(0,We)),d}let r={t:"clk",id:a};if(t.c!==void 0){let s=t.c===!1||t.c==="false"||t.c===0||t.c==="0"||t.c==="off"||t.c==="unchecked"||t.c==="desmarcar";r.c=!s}return t.v!==void 0&&(r.v=ue(t.v).slice(0,We)),Array.isArray(t.co)&&t.co.length===2&&t.co.every(s=>typeof s=="number"&&Number.isFinite(s))&&(r.co=[t.co[0],t.co[1]]),r}function Ko(o,e,t){if(t!=="question")return o;let n=o.filter(a=>a.t==="adv"),i=o.filter(a=>a.t!=="adv");if(e==="escolha_unica"){i=i.filter(r=>!(r.t==="chk"&&r.c===!1||r.t==="clk"&&r.c===!1));let a=i.filter(r=>r.t==="chk"||r.t==="clk");if(a.length>1){let r=i.filter(d=>d.t!=="chk"&&d.t!=="clk"),s=a[a.length-1];i=[...r,s]}}else if(e==="escolha_multipla"){i=i.filter(r=>!(r.t==="chk"&&r.c===!1||r.t==="clk"&&r.c===!1));let a=new Set;i=i.filter(r=>{let s="id"in r&&typeof r.id=="string"?r.id:"";return s?a.has(s)?!1:(a.add(s),!0):!0})}else if(e==="verdadeiro_falso"){let a=new Set,r=[...i].reverse(),s=[];for(let d of r){let l="id"in d&&typeof d.id=="string"?d.id:"";l?a.has(l)||(a.add(l),s.push(d)):s.push(d)}i=s.reverse()}return[...i,...n]}function io(o){if(!o||typeof o!="object")return{pageType:"info",mode:"acao_sem_resposta",confidence:.5,rationale:"Resposta estruturada n\xE3o identificada; avan\xE7ando como informativo.",actions:[{t:"adv"}]};let e=o,t=e.pageType,n=e.mode;(typeof t!="string"||!Qo.has(t))&&(t="question"),(typeof n!="string"||!Fo.has(n))&&(n="escolha_unica");let i=Array.isArray(e.actions)?e.actions:[],a=[];for(let d=0;d<Math.min(i.length,Xo);d++){let l=Vo(i[d],d);l&&a.push(l)}a.some(d=>d.t==="val")&&(n==="escolha_unica"||!e.mode)&&(n="preenchimento"),a.some(d=>d.t==="drag")&&!["categorizacao","arrastar_soltar","ordenacao"].includes(n)&&(n="arrastar_soltar"),a=Ko(a,n,t);let r=a.some(d=>d.t==="adv");t==="conclusion"?a.length=0:t==="info"||t==="start"?r||a.push({t:"adv"}):t==="question"&&!r&&a.push({t:"adv"});let s=typeof e.confidence=="number"&&Number.isFinite(e.confidence)?Math.min(1,Math.max(0,e.confidence)):.85;return{pageType:t,mode:n,confidence:s,rationale:ue(e.rationale,"Plano validado e auto-recuperado."),actions:a,...ue(e.memoryToStore)?{memoryToStore:ue(e.memoryToStore)}:{},...e.needsMoreContext?{needsMoreContext:!!e.needsMoreContext}:{}}}var he=class{keys=new Map;constructor(e=[]){this.init(e)}init(e){let t=new Map(this.keys);this.keys.clear();let n=e.flatMap(a=>a.split(/[\n\r]+/));Array.from(new Set(n.map(a=>a.trim().replace(/^["']|["']$/g,"")).filter(a=>a.length>5))).forEach((a,r)=>{let s=this.generateId(a),d=t.get(s)||t.get(a);this.keys.set(s,{id:s,key:a,label:d?.label||`Chave ${r+1}`,addedAt:d?.addedAt||Date.now(),lastUsedAt:d?.lastUsedAt,lastLatencyMs:d?.lastLatencyMs,cooldownUntil:d?.cooldownUntil,errorCount:d?.errorCount||0,lastError:d?.lastError,winCount:d?.winCount||0})})}generateId(e){let t=0;for(let i=0;i<e.length;i++)t=(t<<5)-t+e.charCodeAt(i),t|=0;let n=e.slice(-12).replace(/[^a-zA-Z0-9]/g,"").slice(0,6);return`key_${Math.abs(t).toString(36).slice(0,6)}${n}`}static maskKey(e){let t=e.trim().replace(/^["']|["']$/g,"");return t.length<=10?"\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022":`${t.slice(0,6)}...${t.slice(-4)}`}getAllKeys(){let e=Date.now();return Array.from(this.keys.values()).map(t=>{let n=Math.max(0,(t.cooldownUntil||0)-e);return{...t,isCooldown:n>0,remainingCooldownMs:n}})}getHealthyKeys(){let e=Date.now();return Array.from(this.keys.values()).filter(t=>(t.cooldownUntil||0)<=e&&(t.errorCount||0)<50)}getRoundRobinKeys(e=2){let t=Date.now(),n=Array.from(this.keys.values()).filter(a=>(a.errorCount||0)<50);if(n.length===0)return Array.from(this.keys.values()).slice(0,e);let i=n.filter(a=>(a.cooldownUntil||0)<=t);return i.length>0?(i.sort((a,r)=>{let s=a.lastLatencyMs!==void 0?a.lastLatencyMs:99999,d=r.lastLatencyMs!==void 0?r.lastLatencyMs:99999;if(s!==d)return s-d;let l=(a.lastUsedAt||0)-(r.lastUsedAt||0);return l!==0?l:a.addedAt-r.addedAt}),i.slice(0,e)):(n.sort((a,r)=>(a.cooldownUntil||0)-(r.cooldownUntil||0)),n.slice(0,e))}getBestKey(){return this.getRoundRobinKeys(1)[0]?.key||""}getDiverseKeys(e){return this.getRoundRobinKeys(e).map(t=>t.key)}markQuotaHit(e,t=8e3){let n=this.findKeyObj(e);n&&(n.cooldownUntil=Date.now()+t,n.lastError=`Cota tempor\xE1ria atingida (HTTP 429). Cooldown de ${Math.round(t/1e3)}s ativado.`)}markOverloaded(e,t=5e3){let n=this.findKeyObj(e);n&&(n.cooldownUntil=Date.now()+t,n.lastError=`Servidores sobrecarregados (HTTP 503). Cooldown de ${Math.round(t/1e3)}s ativado.`)}markSuccess(e,t){let n=this.findKeyObj(e);n&&(n.lastLatencyMs=t,n.lastUsedAt=Date.now(),n.errorCount=0,n.lastError=void 0,n.cooldownUntil=void 0)}markWinner(e){let t=this.findKeyObj(e);t&&(t.winCount=(t.winCount||0)+1)}markInvalid(e,t){let n=this.findKeyObj(e);n&&(n.errorCount=99,n.lastError=t)}addKey(e,t){let n=e.trim().replace(/^["']|["']$/g,"");if(!n)return{ok:!1,message:"Chave n\xE3o pode ser vazia."};if(n.length<15)return{ok:!1,message:"Chave de API inv\xE1lida ou muito curta."};let i=this.generateId(n);if(this.keys.has(i)||Array.from(this.keys.values()).some(s=>s.key===n))return{ok:!1,message:"Esta chave de API j\xE1 est\xE1 cadastrada."};let r={id:i,key:n,label:t?.trim()||`Chave ${this.keys.size+1}`,addedAt:Date.now(),errorCount:0};return this.keys.set(i,r),{ok:!0,message:"Chave adicionada com sucesso!",keyItem:r}}updateKey(e,t,n){let i=this.keys.get(e);if(!i)return{ok:!1,message:"Chave n\xE3o encontrada."};let a=t.trim().replace(/^["']|["']$/g,"");return!a||a.length<15?{ok:!1,message:"Chave de API inv\xE1lida."}:(i.key=a,n!==void 0&&(i.label=n.trim()),i.errorCount=0,i.cooldownUntil=void 0,i.lastError=void 0,{ok:!0,message:"Chave atualizada com sucesso!"})}removeKey(e){if(this.keys.size<=1)return{ok:!1,message:"Voc\xEA precisa manter pelo menos 1 chave de API cadastrada."};let t=this.findKeyObj(e);return t?(this.keys.delete(t.id),{ok:!0,message:"Chave removida com sucesso."}):{ok:!1,message:"Chave n\xE3o encontrada."}}exportRawKeys(){return Array.from(this.keys.values()).map(e=>e.key)}size(){return this.keys.size}findKeyObj(e){if(this.keys.has(e))return this.keys.get(e);for(let t of this.keys.values())if(t.key===e)return t}},U=new he;var Re=[{id:"gemini-3.8-flash",name:"Gemini 3.8 Flash (Mais Inteligente 2026)",description:"Modelo flagship Flash lan\xE7ado em Set/2026. Ultra-r\xE1pido e altamente capaz.",stable:!0},{id:"gemini-3.7-flash",name:"Gemini 3.7 Flash (Agentic)",description:"Alta capacidade para racioc\xEDnio multimodal e workflows ag\xEAnticos.",stable:!0},{id:"gemini-3.6-flash",name:"Gemini 3.6 Flash (Est\xE1vel)",description:"Modelo est\xE1vel e confi\xE1vel com excelente velocidade.",stable:!0},{id:"gemini-3.5-flash",name:"Gemini 3.5 Flash (R\xE1pido)",description:"Modelo de alta performance para tarefas r\xE1pidas.",stable:!0},{id:"gemini-3.5-flash-lite",name:"Gemini 3.5 Flash-Lite (Cota Alta 30 RPM)",description:"Modelo econ\xF4mico de ultra-alta velocidade e maior limite de RPM.",stable:!0},{id:"gemini-3.1-pro",name:"Gemini 3.1 Pro (Racioc\xEDnio Profundo)",description:"Modelo topo de linha para racioc\xEDnio complexo, exatas e matem\xE1tica.",stable:!0},{id:"gemini-2.5-flash",name:"Gemini 2.5 Flash (Ultra R\xE1pido)",description:"Modelo comprovado de baix\xEDssima lat\xEAncia e alta disponibilidade.",stable:!0},{id:"gemini-2.5-pro",name:"Gemini 2.5 Pro (Avan\xE7ado)",description:"Modelo avan\xE7ado para quest\xF5es de alta complexidade.",stable:!0}],ro=["gemini-3.5-flash-lite","gemini-3.5-flash","gemini-3.6-flash","gemini-3.8-flash","gemini-2.5-flash"],Go={"gemini-2.0-flash":"gemini-3.5-flash","gemini-2.0-flash-lite":"gemini-3.5-flash-lite","gemini-1.5-flash":"gemini-3.5-flash","gemini-1.5-pro":"gemini-3.6-flash","gemini-1.0-pro":"gemini-2.5-flash"};function Dt(o){return Go[o]??o}function Wo(o,e){let n={temperature:0,maxOutputTokens:1350,responseMimeType:"application/json",responseSchema:e??Jo};return/lite/i.test(o)||(/gemini-3\.[0-9]+-?flash/i.test(o)?n.thinkingConfig={thinkingBudget:0}:/gemini-2\.5-flash/i.test(o)&&(n.thinkingConfig={thinkingBudget:0})),n}var Jo={type:"OBJECT",properties:{pageType:{type:"STRING",enum:["question","info","start","conclusion"]},mode:{type:"STRING",enum:["texto_livre","escolha_unica","escolha_multipla","verdadeiro_falso","preenchimento","acao_sem_resposta","categorizacao","ordenacao","arrastar_soltar"]},confidence:{type:"NUMBER"},rationale:{type:"STRING"},thinking:{type:"STRING"},memoryToStore:{type:"STRING"},imageDescriptions:{type:"ARRAY",items:{type:"OBJECT",properties:{index:{type:"NUMBER"},description:{type:"STRING"},relevant:{type:"BOOLEAN"},associatedLabel:{type:"STRING"}}}},actions:{type:"ARRAY",items:{type:"OBJECT",properties:{t:{type:"STRING",enum:["val","chk","sel","clk","adv","js","drag"]},id:{type:"STRING"},name:{type:"STRING"},label:{type:"STRING"},v:{type:"STRING"},c:{type:"BOOLEAN"},co:{type:"ARRAY",items:{type:"NUMBER"}},from:{type:"STRING"},to:{type:"STRING"}},required:["t"]}}},required:["pageType","mode","confidence","rationale","actions"]};function lo(o){let e=o.trim().replace(/^google\//,"").replace(/^models\//,"");if(!e)return"gemini-3.5-flash-lite";let t=Dt(e);return ce(t)?t:(console.warn(`[EasyQuiz] Modelo desconhecido ou inv\xE1lido: "${e}". Verifique se o modelo est\xE1 dispon\xEDvel no Google AI Studio.`),"gemini-3.5-flash-lite")}function Ot(o,e){let t="";try{let n=JSON.parse(o);t=n.error?.message||n.message||""}catch{t=o.slice(0,160)}return/API_KEY_INVALID|API key not valid|key.*invalid|unregistered/i.test(t)?"Chave de API do Gemini inv\xE1lida ou n\xE3o autorizada no Google AI Studio.":/RESOURCE_EXHAUSTED|Quota exceeded|rate limit|quota/i.test(t)||e===429?`Cota do Gemini excedida (HTTP 429): ${t||"Aguarde"}`:e===404?`HTTP 404: ${t||"Modelo ou endpoint n\xE3o encontrado no Google AI Studio"}`:e===503||/overloaded/i.test(t)?`Servidores Google sobrecarregados (HTTP 503): ${t||"Aguardando"}`:t?`Erro Gemini (HTTP ${e}): ${t}`:`Falha na requisi\xE7\xE3o ao Gemini (HTTP ${e}).`}function Yo(o){let e=o.trim(),t=e.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);if(t)try{return JSON.parse(t[1].trim())}catch{}try{return JSON.parse(e)}catch{}let n=e.match(/\{[\s\S]*\}/);if(n)try{return JSON.parse(n[0].trim())}catch{}try{let i=e.indexOf("{");if(i!==-1){let a=e.slice(i).trim();a=a.replace(/,\s*\{[^}]*$/,""),a=a.replace(/,\s*$/,"");let r=0,s=0,d=!1,l=!1;for(let h=0;h<a.length;h++){let c=a[h];if(l){l=!1;continue}if(c==="\\"){l=!0;continue}if(c==='"'){d=!d;continue}d||(c==="{"?r++:c==="}"?r=Math.max(0,r-1):c==="["?s++:c==="]"&&(s=Math.max(0,s-1)))}for(d&&(a+='"');s>0;)a+="]",s--;for(;r>0;)a+="}",r--;let u=JSON.parse(a);if(u&&typeof u=="object")return u}}catch{}throw new Error("Falha ao decodificar JSON da IA.")}var co=(()=>{try{let o=typeof localStorage<"u"?localStorage.getItem("easyquiz_cached_models"):null;if(!o)return null;let e=JSON.parse(o);if(Array.isArray(e)){let t=e.filter(n=>n&&typeof n.id=="string"&&ce(n.id));return t.length>0?t:null}return null}catch{return null}})(),zt=new Set;async function ct(o){let e=o.trim().replace(/^["']|["']$/g,"");if(!e)return Re;let t=[`https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(e)}`,`https://generativelanguage.googleapis.com/v1/models?key=${encodeURIComponent(e)}`];for(let n of t)try{let i=await fetch(n,{headers:{"Content-Type":"application/json","x-goog-api-key":e}});if(!i.ok){let r=await i.text(),s=Ot(r,i.status);if(s.includes("inv\xE1lida")||s.includes("n\xE3o autorizada"))throw new Error(s);continue}let a=await i.json();if(Array.isArray(a.models)&&a.models.length>0){let r=a.models.filter(s=>{let d=s.supportedGenerationMethods||[],l=(s.name||"").replace(/^models\//,""),u=d.includes("generateContent");return ce(l)&&u}).map(s=>{let d=s.supportedGenerationMethods||[],l=s.name.replace(/^models\//,""),u=s.displayName||l;return{id:l,name:u.includes(l)?u:`${u} (${l})`,description:s.description||"",stable:!/-preview|-experimental|-latest/i.test(l),supportsVision:!/embedding|tts|transcribe|live|image|sound|voice/i.test(l),supportsStructuredOutput:d.includes("generateContent"),supportedGenerationMethods:d,discoveredAt:Date.now()}});if(r.length>0){r.sort((s,d)=>{let l=u=>u==="gemini-3.8-flash"?200:u==="gemini-3.7-flash"?190:u==="gemini-3.6-flash"?180:u==="gemini-3.5-flash"?170:u==="gemini-3.5-flash-lite"?160:u==="gemini-2.5-flash"?130:u.includes("flash")?80:u==="gemini-2.5-pro"?60:u.includes("pro")?50:10;return l(d.id)-l(s.id)}),co=r;try{typeof localStorage<"u"&&localStorage.setItem("easyquiz_cached_models",JSON.stringify(r))}catch{}return r}}}catch(i){if(i.message?.includes("Chave de API"))throw i}return Re}async function dt(o){let e=o.trim().replace(/^["']|["']$/g,"");if(!e)return{ok:!1,message:"Insira sua chave de API."};try{let n=await ct(e);if(n.length>0&&n!==Re){let i=n[0];return{ok:!0,message:`Chave v\xE1lida! ${n.length} modelos Gemini dispon\xEDveis em sua conta. Recomendado: ${i.name}`,models:n}}}catch(n){return{ok:!1,message:n instanceof Error?n.message:String(n)}}let t=["gemini-3.8-flash","gemini-3.6-flash","gemini-3.5-flash"];for(let n of t)for(let i of["v1beta","v1"]){let a=`https://generativelanguage.googleapis.com/${i}/models/${n}:generateContent?key=${encodeURIComponent(e)}`;try{if((await fetch(a,{method:"POST",headers:{"Content-Type":"application/json","x-goog-api-key":e},body:JSON.stringify({contents:[{role:"user",parts:[{text:"PING"}]}],generationConfig:{maxOutputTokens:5}})})).ok)return{ok:!0,message:`Chave validada com sucesso no ${n} (${i})!`,models:Re}}catch{}}return{ok:!1,message:"Chave de API inv\xE1lida, sem cota ou sem permiss\xE3o para modelos Gemini."}}async function Bt(o,e){let t=e.map(l=>l.trim().replace(/^["']|["']$/g,"")).filter(l=>l.length>5);if(t.length===0)return{ok:!1,model:o,key:"",message:"Nenhuma chave dispon\xEDvel."};let n=Dt(lo(o)),i=JSON.stringify({contents:[{role:"user",parts:[{text:"PING"}]}],generationConfig:{maxOutputTokens:5}}),a={"Content-Type":"application/json"};async function r(l,u,h){let c=new AbortController,m=setTimeout(()=>c.abort(),h);try{let p=`https://generativelanguage.googleapis.com/v1beta/models/${u}:generateContent?key=${encodeURIComponent(l)}`,g=await fetch(p,{method:"POST",headers:{...a,"x-goog-api-key":l},body:i,signal:c.signal});if(clearTimeout(m),g.ok)return{ok:!0,model:u,key:l,message:`Modelo '${u}' validado com sucesso!`};let f=await g.text().catch(()=>"");throw new Error(`HTTP ${g.status}: ${f.slice(0,80)}`)}catch(p){throw clearTimeout(m),p}}if(t.length>=2){let l=t.slice(0,6);try{return await Promise.any(l.map(h=>r(h,n,8e3)))}catch{}}let s=t[0],d=[n,...ro.filter(l=>l!==n)];for(let l of d)try{let u=await r(s,l,4e3);return l!==n&&(u.message=`Modelo preferido indispon\xEDvel. Validado via fallback '${l}'.`),u}catch{}return{ok:!1,model:n,key:s,message:"Nenhum modelo Gemini respondeu. Verifique sua chave e cota."}}async function $o(o,e,t,n,i){let a=["v1beta","v1"],r=new Error(`Falha ao consultar modelo ${o}`),d={...Wo(o,i)};for(let l of a){if(n.aborted)throw new Error("Opera\xE7\xE3o cancelada pelo usu\xE1rio.");let u=`https://generativelanguage.googleapis.com/${l}/models/${o}:generateContent?key=${encodeURIComponent(e)}`,h=Date.now();try{let c=await fetch(u,{method:"POST",headers:{"Content-Type":"application/json","x-goog-api-key":e},body:JSON.stringify({...t,generationConfig:d}),signal:n});if(!c.ok){let g=await c.text();if(c.status===400){let b=/thinking/i.test(g),v=/response_schema|responseSchema|Repeated map key|PROTO payload/i.test(g);if((b||v)&&(d.thinkingConfig||d.responseSchema)){let y={...d};b&&delete y.thinkingConfig,v&&(delete y.responseSchema,delete y.responseMimeType),d=y;let E=await fetch(u,{method:"POST",headers:{"Content-Type":"application/json","x-goog-api-key":e},body:JSON.stringify({...t,generationConfig:d}),signal:n});if(E.ok){let C=await E.json(),L=C.candidates?.[0];if(L?.content?.parts?.[0]?.text)return U.markSuccess(e,Date.now()-h),{rawText:L.content.parts[0].text,data:C,usedModel:o,usedKey:e}}let w=await E?.text?.().catch(()=>"")??g,q=Ot(w,c.status);throw new Error(`[${o}|${he.maskKey(e)}] ${q}`)}}let f=Ot(g,c.status);if(c.status===404&&l==="v1beta")continue;throw c.status===429?(U.markQuotaHit(e,8e3),uo(e,o,1e4),new Error(`[${o}|${he.maskKey(e)}] ${f}`)):(c.status===503||/no capacity|overloaded|unavailable/i.test(g)?(U.markOverloaded(e,5e3),zt.add(o)):c.status===403||/API_KEY_INVALID/i.test(g)?U.markInvalid(e,f):c.status===404&&zt.add(o),new Error(`[${o}|${he.maskKey(e)}] ${f}`))}let m=await c.json(),p=m.candidates?.[0];if(!p||!p.content?.parts?.[0]?.text)throw new Error(`[${o}|${he.maskKey(e)}] A IA n\xE3o retornou uma resposta estruturada v\xE1lida.`);return U.markSuccess(e,Date.now()-h),{rawText:p.content.parts[0].text,data:m,usedModel:o,usedKey:e}}catch(c){if(n.aborted)throw c;r=c;let m=r.message||"";if(m.includes("404")||/no longer available/i.test(m)){zt.add(o);break}if(m.includes("429")||m.includes("Quota"))break}}throw r}var lt=new Map;function so(o,e){let t=`${o}::${e}`,n=lt.get(t);return n===void 0?!1:Date.now()>n?(lt.delete(t),!1):!0}function uo(o,e,t=1e4){lt.set(`${o}::${e}`,Date.now()+t)}function Rt(){lt.clear()}async function ut(o,e,t,n,i,a){if(i?.aborted)throw new Error("Opera\xE7\xE3o cancelada pelo usu\xE1rio.");let r=Array.isArray(t.apiKeys)&&t.apiKeys.length>0?t.apiKeys:t.apiKey?[t.apiKey]:[];U.init(r);let s=t.apiKey.trim().replace(/^["']|["']$/g,""),d=U.getBestKey()||s;if(!d)throw new Error("Nenhuma chave de API do Gemini configurada ou dispon\xEDvel.");let l=lo(t.model);if(!co&&d&&ct(d).catch(()=>{}),i?.aborted)throw new Error("Opera\xE7\xE3o cancelada pelo usu\xE1rio.");let u=Date.now(),h=Ge(o,e,t),c=[{text:h}];for(let O=0;O<e.length;O++){let T=e[O],x=T.associatedLabel||(T.alt?`Imagem: ${T.alt}`:`Imagem ${O+1}`);if(T.captureStatus==="text_only"||!T.base64){let H=T.textContext||T.alt||"";c.push({text:`[CONTEXTO_IMAGEM_${O+1} - V\xCDNCULO: ${x}]: ${H}`})}else c.push({text:`[ANEXO VISUAL ${O+1} - V\xCDNCULO: ${x}]:`}),c.push({inline_data:{mime_type:T.mediaType,data:T.base64}})}let m={system_instruction:{parts:[{text:a?.systemPromptOverride??ao}]},contents:[{role:"user",parts:c}]},p=Dt(l),g=ro.filter(O=>O!==p),b=U.getAllKeys().length,v=O=>b<=1||O===0?1:2,y=new Set,E=(O,T)=>{let x=/pro/i.test(O),H=/lite/i.test(O);return x?T===0?18e3:T===1?24e3:3e4:H?T===0?1e4:T===1?14e3:18e3:T===0?16e3:T===1?2e4:25e3},w=async(O,T)=>{if(T.length===0||i?.aborted)return null;let x=T.map(()=>new AbortController),H=()=>x.forEach(R=>{try{R.abort()}catch{}});i?.addEventListener("abort",H,{once:!0});let B=T.map(R=>`${R.model.replace("gemini-","")}/${R.label}`).join(" | ");n?.(`\u26A1 ${O}: ${T.length} slot(s) [${B}]...`,"info");try{let R=T.map(async(V,J)=>{let G=x[J],Z=setTimeout(()=>{try{G.abort(new Error(`Timeout ${V.timeout/1e3}s (${V.model}|${V.label})`))}catch{G.abort()}},V.timeout);try{let Y=await $o(V.model,V.key,m,G.signal,a?.generationSchemaOverride);clearTimeout(Z);let oe=io(Yo(Y.rawText));return oe.usedModel=Y.usedModel,oe.durationMs=Date.now()-u,oe.promptSent=h,oe.tokensUsed=Y.data.usageMetadata?.totalTokenCount,oe.promptTokens=Y.data.usageMetadata?.promptTokenCount,oe.candidatesTokens=Y.data.usageMetadata?.candidatesTokenCount,oe.rawResponse=Y.rawText,x.forEach((de,ke)=>{if(ke!==J)try{de.abort(new Error("Cancelado: vencedor respondeu."))}catch{de.abort()}}),{plan:oe,rawUsage:Y.data.usageMetadata,usedModel:Y.usedModel,usedKey:Y.usedKey,slotLabel:V.label}}catch(Y){clearTimeout(Z);let oe=Y instanceof Error?Y.message:String(Y);throw(oe.includes("429")||oe.includes("Quota")||oe.includes("RESOURCE_EXHAUSTED"))&&(uo(V.key,V.model,1e4),U.markQuotaHit(V.key,8e3)),Y}}),X=await Promise.any(R);return i?.removeEventListener("abort",H),U.markWinner(X.usedKey),X}catch(R){return i?.removeEventListener("abort",H),R instanceof AggregateError&&R.errors.length>0?A=R.errors.map(X=>X instanceof Error?X.message:String(X)).join(" | "):R instanceof Error&&(A=R.message),console.warn(`[EasyQuiz ${O}] Falha na onda:`,A),null}},C=(b<=1?1:1+Math.ceil((b-1)/2))+4,L=0,A="",P=0;for(;L<C;){if(i?.aborted)throw new Error("Opera\xE7\xE3o cancelada pelo usu\xE1rio.");let O=U.getRoundRobinKeys(b),T=O.filter(G=>!y.has(`${G.key}::${p}`)&&!so(G.key,p)),x,H;if(T.length>0)x=p,H=T;else{let G=g;x=G[P%G.length]||p,P++;let Z=O.filter(Y=>!y.has(`${Y.key}::${x}`)&&!so(Y.key,x));H=Z.length>0?Z:O.filter(Y=>!y.has(`${Y.key}::${x}`))}if(H.length===0){if(P<g.length)continue;break}let B=H.slice(0,v(L));if(B.length===0)break;let R=E(x,L),X=B.map(G=>(y.add(`${G.key}::${x}`),{model:x,key:G.key,label:G.label||"Chave",timeout:R})),V=L===0?"Onda 1":`Onda ${L+1}`,J=await w(V,X);if(J){let G=J.plan.durationMs||Date.now()-u,Z=he.maskKey(J.usedKey);return n?.(`\u2705 ${G}ms via '${J.usedModel}' (${J.slotLabel}: ${Z})`,"info"),J}L++}throw new Error(A||"Todas as tentativas falharam. Verifique suas chaves de API e cotas.")}var Zo=[/\bfetch\b/i,/\bXMLHttpRequest\b/i,/\bWebSocket\b/i,/\b(?:localStorage|sessionStorage|indexedDB)\b/i,/\b(?:eval|Function|AsyncFunction|GeneratorFunction)\b/i,/\bimport(?:Scripts)?\b/i,/\bnavigator\s*\.\s*credentials\b/i,/\b(?:cookie|location\s*=|history\s*\.)/i,/\bwindow\s*\[\s*['"](?:fetch|eval|Function|localStorage|sessionStorage)/i];function Oe(o){let e=o?.engine||"smart",t=new Set(["dom","framework","keyboard","drag"]);return o?.autoAdvance&&t.add("navigation"),e==="javascript"&&t.add("javascript"),{engine:e,capabilities:t,maxAttemptsPerAction:e==="command"?1:2,maxActionMs:e==="command"?1500:3e3,allowJavaScript:e==="javascript",allowNavigation:!!o?.autoAdvance}}function Nt(o,e){if(o.t==="js"&&!e.allowJavaScript)throw new Error("A\xE7\xE3o JavaScript bloqueada pela engine atual. Use o motor JavaScript explicitamente.");if(o.t==="adv"&&!e.allowNavigation)throw new Error("Avan\xE7o autom\xE1tico bloqueado pela pol\xEDtica atual.")}function po(o){if(!o.trim())throw new Error("JavaScript recusado: c\xF3digo vazio.");if(o.length>8e3)throw new Error("JavaScript recusado: c\xF3digo acima do limite operacional.");if(Zo.find(t=>t.test(o)))throw new Error("JavaScript recusado: acesso externo, persist\xEAncia ou avalia\xE7\xE3o din\xE2mica n\xE3o permitidos.");if(!/^\s*(?:\/\/[^\n]*\n|\/\*[\s\S]*?\*\/|[\s\S])*\$eq\./.test(o)&&!o.includes("$eq."))throw new Error("JavaScript recusado: use somente a API declarativa $eq.")}var ho="__eq_layout_cache__";var pt=null;function mo(){if(pt)return pt;try{let o=sessionStorage.getItem(ho);if(!o)return null;let e=JSON.parse(o);return e.hostname!==location.hostname||Date.now()-e.createdAt>18e5?null:(pt=e,e)}catch{return null}}function _o(o){pt=o;try{sessionStorage.setItem(ho,JSON.stringify(o))}catch{}}function go(){let o=mo();if(o)return o;let e=[],t=null,n=["nav","aside","header","footer",'[role="navigation"]','[role="banner"]','[role="complementary"]','[class*="sidebar" i]','[class*="lesson-list" i]','[class*="task-list" i]','[class*="mission" i]','[class*="progress-list" i]','[class*="_ka-drawer_" i]','[class*="breadcrumb" i]','[class*="game-sidebar" i]','[class*="leaderboard" i]','[class*="side-panel" i]'];for(let r of n)try{let s=document.querySelector(r);if(!s)continue;let d=s.getBoundingClientRect();if(d.width<10||d.height<10)continue;e.push(r)}catch{}let i=['[role="main"]',"main",".perseus-renderer",".framework-perseus",'[data-test-id="exercise-content"]',".main-content","#main-content",'[class*="exercise-content" i]','[class*="question-area" i]'];for(let r of i)try{let s=document.querySelector(r);if(!s)continue;let d=s.getBoundingClientRect();if(d.width>window.innerWidth*.3&&d.height>100){t=r;break}}catch{}let a={knownSidebarSelectors:e,mainContentSelector:t,createdAt:Date.now(),hostname:location.hostname};return _o(a),console.log(`[EasyQuiz LayoutCache] Snapshot criado: ${e.length} sidebars, main: ${t||"N/A"}`),a}function en(){return mo()?.knownSidebarSelectors??[]}function fo(o){let e=en();if(e.length===0)return!1;try{for(let t of e)if(o.closest(t))return!0}catch{}return!1}var Ne=['input:not([type="hidden"])',"textarea","select","button","a","label",'[role="button"]','[role="link"]','[role="radio"]','[role="checkbox"]','[role="option"]','[role="treeitem"]','[role="menuitemcheckbox"]','[role="menuitemradio"]','[contenteditable="true"]','[draggable="true"]',"[aria-grabbed]","[aria-dropeffect]","[data-widget-type]",".perseus-drag-item",".sortable-item",'[data-testid*="drag" i]','[data-testid*="card" i]','[data-testid*="option" i]','[data-testid*="choice" i]','[data-testid*="category" i]',"[data-choice]","[data-option]","[data-answer]","[data-value]",".quiz-option",".option-card",".choice-card",'[class*="option-card" i]','[class*="choice-card" i]','[class*="option-item" i]','[class*="choice-item" i]','[class*="answer-item" i]','[class*="alternative" i]','li[class*="choice" i]','li[class*="option" i]','li[class*="answer" i]','[data-role="dropzone"]',"[data-category]","[data-item-id]","[data-params][jsmodel]",'[class*="draggable-item" i]','[class*="drag-item" i]','[class*="sortable-card" i]','[class*="card-option" i]','[class*="tile" i][class*="option" i]',".mq-editable-field",".mq-root-block",'[class*="expression-editor" i]','[class*="math-input" i]','[class*="perseus-dropdown" i]','[class*="perseus-radio" i]','[class*="perseus"] [role="listbox"]','[class*="perseus"] [role="radio"]','[class*="perseus"] [role="combobox"]','.perseus-widget-container [role="button"]',".perseus-widget-container input",".perseus-widget-container select",'.number-line [role="slider"]','[class*="interactive-graph" i]'].join(","),Ye=/(verificar|checar|check|conferir|validar|próxim[oa]|next|continuar|continue|avançar|prosseguir|enviar|submit|concluir|finalizar|terminar|começar|iniciar|start|vamos lá|próxima tarefa|next task|próxima pergunta|next question|marcar como concluíd[oa]|mostrar resumo|entendi|compreendi|ok|leitura concluída|seguir|ir para o exercício|fazer o teste|próximo artigo|ir para a aula)/i,Ee=/(\banterior\b|\bvoltar\b|\bback\b|\bprev\b|\bprevious\b|recomeçar|\brestart\b|\breplay\b|\bretornar\b)/i,tn=0;function jt(o){try{let e=o.closest('[hidden], [style*="display: none"], [style*="display:none"], [aria-hidden="true"]');if(e&&!pe(e))return!1}catch{}try{let e=window.getComputedStyle?window.getComputedStyle(o):o.style;if(e&&(e.display==="none"||e.visibility==="hidden"))return!1}catch{}try{if(typeof o.getBoundingClientRect=="function"){let e=o.getBoundingClientRect();if(e.width>0||e.height>0)return!0}}catch{}return(o.textContent||"").trim().length>0}function te(o){try{if(typeof CSS<"u"&&typeof CSS.escape=="function")return CSS.escape(o)}catch{}return String(o).replace(/["\\]/g,"\\$&")}function j(o){let e=o;if(!e||typeof e.isConnected=="boolean"&&!e.isConnected||pe(e))return!1;let t=e.tagName?.toLowerCase();if(["input","select","textarea","button"].includes(t)){let n=e.type?.toLowerCase();if(n==="checkbox"||n==="radio"){if(e.id)try{let a=e.ownerDocument?.querySelector(`label[for="${te(e.id)}"]`);if(a&&jt(a))return!0}catch{}let i=e.closest('label, .option-card, .quiz-option, .choice, .answer, [role="radio"], [role="checkbox"], [class*="option" i], [class*="choice" i], [class*="item" i], li, tr');if(i&&i!==e&&jt(i))return!0}try{if(!e.closest('[hidden], [style*="display: none"], [style*="display:none"], [aria-hidden="true"]')){let a=window.getComputedStyle?window.getComputedStyle(e):e.style;if(!a||a.display!=="none"&&a.visibility!=="hidden"){if(typeof e.getBoundingClientRect=="function"){let r=e.getBoundingClientRect();if(r.width>0||r.height>0)return!0}return!0}}}catch{}}return jt(e)}function on(o){if(o==null)return"";if(typeof o=="string")return o;if(typeof o=="number"||typeof o=="boolean")return String(o);if(o instanceof Node)return o.textContent||"";try{if(typeof o?.toString=="function"){let e=o.toString();if(typeof e=="string")return e}}catch{}return""}function $(o,e=500){return on(o).replace(/\s+/g," ").trim().slice(0,e)}function nn(o){let e=o.dataset.easyquizId;if(e)return e;let t=`eq-${Date.now().toString(36)}-${(tn+=1).toString(36)}`;return o.dataset.easyquizId=t,t}function pe(o){return o?!!(o.closest('#easyquiz-shadow-root, .eq-sidebar, .eq-launcher, [data-easyquiz-ignore="true"], .btn-inject-eq, #btn-inject-script')||o.getAttribute?.("data-easyquiz-ignore")==="true"):!1}function Ce(o){if(!o)return!1;if(fo(o))return!0;let e=o.closest('aside, nav, [class*="task-list" i], [class*="lesson-list" i], [class*="mastery" i], [class*="sidebar" i], [class*="side-bar" i], [class*="side_bar" i], [class*="unit-nav" i], [class*="course-nav" i], [data-testid*="sidebar" i], [data-testid*="task-list" i], [class*="practice-tab" i], [class*="progress-nav" i], [role="navigation"], [role="complementary"]');if(e&&!e.querySelector('.perseus-renderer, .framework-perseus, [data-test-id*="exercise" i]'))return!0;if(je())try{let t=o.getBoundingClientRect();if(!!document.querySelector(".perseus-renderer, .framework-perseus")&&t.width>0&&t.left>=0&&t.right<window.innerWidth*.32)return!0}catch{}return!1}function je(){try{if(/khanacademy\.org/i.test(window.location.href)||document.querySelector(".perseus-renderer, .framework-perseus"))return!0}catch{}return!1}var Je=/(leaderboard|scoreboard|placar|ranking|trophy|pause|pausar|mute|mutar|audio|sound|som|música|music|configuraç|settings|theme|ajuda|help|report|denunciar|feedback|power-?up|streak|coins|fullscreen|full-screen|read-?aloud|audio-?player|(?:audio|sound|som|media)[-_ ]*volume|volume[-_ ]*(?:slider|control|level|btn|button|icon|mute)|vol-slider)/i;function _(o){if(!o||typeof o.getAttribute!="function"||typeof Element<"u"&&!(o instanceof Element))return!1;if(pe(o))return!0;let e=o.tagName?.toLowerCase();if(["select","textarea"].includes(e)||e==="input"&&!["button","submit","reset"].includes((o.type||"").toLowerCase()))return!1;let n=o.closest?.('button, a, [role="button"], [class*="leaderboard" i], [data-testid*="leaderboard" i], [class*="scoreboard" i], [class*="trophy" i]')||o,i=String(n.getAttribute?.("data-testid")||n.getAttribute?.("data-test-id")||n.getAttribute?.("id")||""),a=String(n.getAttribute?.("aria-label")||""),r=String(n.getAttribute?.("title")||""),s=typeof n.className=="string"?n.className:typeof n.className?.baseVal=="string"?n.className.baseVal:"",d=$(n.textContent,60);return!!(Je.test(i)||Je.test(a)||Je.test(r)||Je.test(s)||d.length>0&&d.length<=25&&Je.test(d))}function re(o){if(!o||typeof o.getAttribute!="function"||typeof Element<"u"&&!(o instanceof Element)||pe(o)||_(o)||o.closest?.('.option-card, .choice-card, .quiz-option, [class*="option-card" i], [class*="choice-card" i], [class*="option-item" i], [class*="choice-item" i], [class*="answer-item" i], [data-testid*="option" i], [data-testid*="choice" i], [data-choice], [data-option], [data-answer], [role="radio"], [role="checkbox"], [role="option"]')||o.closest?.("header, nav, aside"))return!1;let e=typeof HTMLInputElement<"u"&&o instanceof HTMLInputElement||typeof HTMLButtonElement<"u"&&o instanceof HTMLButtonElement?o.value:"",t=$(o.getAttribute?.("aria-label")||o.textContent||o.getAttribute?.("value")||e),n=o.type,i=t.replace(/[\d\(\)\[\]\u2192>\u2022\-\/\\]+/g," ").trim(),a=String(o.getAttribute?.("data-testid")||o.getAttribute?.("data-test-id")||o.getAttribute?.("id")||o.getAttribute?.("href")||"").toLowerCase();return Ee.test(i)||Ee.test(t)?!1:Ye.test(i)||Ye.test(t)||a.includes("next")||a.includes("check")||a.includes("continue")||a.includes("proximo")||a.includes("forward")?!0:/^\d{1,3}$/.test(t.trim())?!!o.closest?.('[class*="pagination" i], [class*="pager" i], [class*="page-nav" i], [class*="step-indicator" i], [class*="breadcrumb" i], [aria-label*="p\xE1gina" i], [aria-label*="page" i], [role="navigation"], nav, [class*="steps" i]'):!1}function Qt(o){let e=o.closest("tr");if(e){let d=e.querySelector("th, td:first-child"),l=d&&d!==o.closest("td")?$(d.textContent,100):"",u=$(o.closest("label, td")?.textContent||"",50);if(l&&u)return`${l}: ${u}`}let t=o.closest('.dropdown-row, [class*="dropdown-row" i], [class*="select-row" i]');if(t){let d=t.querySelector('.dropdown-label, [class*="label" i]'),l=d&&d!==o?$(d.textContent,150):"";if(l)return l}let n=o.getAttribute("aria-label");if(n)return $(n);let i=o.getAttribute("aria-labelledby");if(i){let d=i.split(/\s+/).map(l=>document.getElementById(l)?.textContent).filter(Boolean).join(" ");if(d.trim())return $(d)}if("labels"in o&&o.labels){let d=Array.from(o.labels??[]).map(l=>l.textContent).join(" ");if(d.trim())return $(d)}let a=o.closest('.docssharedWizToggleLabeledContainer, [role="listitem"], .answer, label, .quiz-option, .form-check, .option-card');if(a&&a!==o){let d=$(a.textContent);if(d)return d}let r=o instanceof HTMLInputElement||o instanceof HTMLButtonElement?o.value:"",s=o.getAttribute("placeholder")||o.getAttribute("title")||o.textContent||r||"";return $(s)}function Ft(o,e){let n=typeof HTMLSelectElement<"u"&&o instanceof HTMLSelectElement||o.tagName.toLowerCase()==="select"?o:null,i=o;o.dataset.easyquizRole=e;let a=o.tagName.toLowerCase(),r=["input","textarea","select","button"].includes(a)?a:"other",s=o.getAttribute("role")||"",d=(o.getAttribute("data-testid")||o.getAttribute("data-test-id")||"").toLowerCase(),l=(o.className&&typeof o.className=="string"?o.className:"").toLowerCase(),u=o.getAttribute("draggable")==="true"||o.classList.contains("perseus-drag-item")||o.classList.contains("sortable-item")||l.includes("cursor-grab")||!!o.getAttribute("aria-grabbed")||/drag|card|option|item/i.test(d)||/drag|card-item|sortable/i.test(l),h=o.getAttribute("data-role")==="dropzone"||o.classList.contains("category-container")||o.hasAttribute("data-category")||!!o.getAttribute("aria-dropeffect")||/drop|category|bucket/i.test(d)||/dropzone|category-box|bucket|target-zone/i.test(l),m=$((u?"draggable":h?"dropzone":"")||i.type||s||r,40),p="";if(i.type==="checkbox"||i.type==="radio"||s==="radio"||s==="checkbox"){let E=i.checked||o.getAttribute("aria-checked")==="true",w=i.value&&i.value!=="on"?i.value:o.getAttribute("data-value")||"";p=E?w?`checked:${w}`:"checked":w||"unchecked"}else if(r==="button"||a==="a"||e==="navigation"||re(o))p="";else{let E=typeof o.value=="string"||typeof o.value=="number"?o.value:"";p=$(E||o.getAttribute("data-category")||"",2e3)}let g=[];if(n&&n.options)for(let E of Array.from(n.options).slice(0,80))g.push({value:$(E.value),label:$(E.textContent)});else if(s==="combobox"||s==="listbox"||l.includes("select")||l.includes("dropdown")){let E=o.getAttribute("aria-controls")||o.getAttribute("aria-owns"),w=E?document.getElementById(E):o;if(w){let q=w.querySelectorAll('[role="option"], li, .dropdown-item, .option');for(let C of Array.from(q).slice(0,80)){let L=$(C.textContent);L&&g.push({value:C.getAttribute("data-value")||C.getAttribute("value")||L,label:L})}}}let f=!!(i.required||o.getAttribute("aria-required")==="true"),b=!!(i.disabled||o.getAttribute("aria-disabled")==="true"),v=nn(o);return{id:o.id||v,tag:r,type:m,label:Qt(o),name:$(i.name||o.getAttribute("name")||"",180),value:p,options:g,required:f,disabled:b,role:e}}var bo=['[data-test-id*="exercise" i]','[data-testid*="exercise" i]',".perseus-renderer",".framework-perseus",".Qr7Oae","[data-item-id]",".freebirdFormviewerViewItemsItemItem",".que",".question-holder",".quiz-question",".question_holder",".display_question",'[data-functional-selector*="question"]',".question-container",'[class*="classification-layout" i]','[class*="quiz-container" i]','[data-cy="quiz-container"]',"[data-question-id]",'[data-testid*="question" i]','[class*="question-container" i]','[class*="question" i]','[class*="pergunta" i]','[class*="categoriz" i]','[role="group"]',"article","form","section","main"].join(",");function ht(o){if(!j(o)||Ce(o))return-1/0;let e=o.getBoundingClientRect(),t=Array.from(o.querySelectorAll(Ne)).filter(f=>j(f)&&!Ce(f)),n=$(o.innerText||o.textContent||"",4e3).length;if(n<10||!t.length&&n<60)return-1/0;let i=Math.max(1,window.innerWidth*window.innerHeight),a=Math.max(1,e.width*e.height),r=Math.min(1,a/i),s=e.top+e.height/2,d=e.left+e.width/2,l=Math.abs(s-window.innerHeight/2)/Math.max(1,window.innerHeight),u=Math.abs(d-window.innerWidth/2)/Math.max(1,window.innerWidth),h=n>40?35:0,c=e.top>=0&&e.bottom<=window.innerHeight?25:0,m=u>.35?150:0,p=r>.85?100:0,g=o.matches?.('.perseus-renderer, .framework-perseus, [data-test-id*="exercise" i]')?50:0;return Math.min(10,t.length)*15+Math.min(60,n/20)+h+c+g-r*30-l*20-m-p}function Qe(o){let e=o;if(e.matches?.('article, [data-test-id*="exercise" i], [data-testid*="exercise" i], .perseus-renderer, .framework-perseus, [class*="question-container" i], .que')&&e.tagName.toLowerCase()!=="main"&&e.tagName.toLowerCase()!=="body")return e;for(;e.parentElement&&e.parentElement!==document.body&&e.parentElement!==document.documentElement;){let t=e.parentElement,n=t.tagName.toLowerCase();if(["header","footer","nav","aside"].includes(n))break;if(t.matches?.('article, [data-test-id*="exercise" i], [data-testid*="exercise" i], .perseus-renderer, .framework-perseus, [class*="question-container" i], .que')&&n!=="main"&&n!=="body"){e=t;break}let i=$(e.innerText||e.textContent||"",1e4),a=$(t.innerText||t.textContent||"",1e4),r=e.querySelectorAll(Ne).length,s=t.querySelectorAll(Ne).length;if(i.length<150&&a.length>i.length&&s<=r+4&&n!=="main"&&n!=="body"){e=t;continue}break}return e}function an(o,e=16e3){let t=o.cloneNode(!0);t.querySelectorAll('nav, aside, [class*="sidebar" i], [class*="lesson" i], [class*="_ka-drawer_" i], [class*="navigation" i], [role="navigation"]').forEach(h=>h.remove());let n=Array.from(t.querySelectorAll(".katex"));for(let h of n){let c=h.querySelector('annotation[encoding="application/x-tex"]');if(c&&c.textContent){let m=` $${c.textContent.trim()}$ `,p=document.createTextNode(m);h.replaceWith(p)}}let i=Array.from(t.querySelectorAll("math"));for(let h of i)try{let c=sn(h);if(c){let m=document.createTextNode(` ${c} `);h.replaceWith(m)}}catch{}let a=Array.from(t.querySelectorAll(".mq-root-block, .mq-editable-field"));for(let h of a){let c=h.textContent?.trim();c&&(h.textContent=` [math: ${c}] `)}let r=Array.from(t.querySelectorAll("sup"));for(let h of r)h.textContent=`^{${h.textContent?.trim()||""}}`;let s=Array.from(t.querySelectorAll("sub"));for(let h of s)h.textContent=`_{${h.textContent?.trim()||""}}`;let d="";t.querySelectorAll(".sr-only, .visuallyhidden, .visually-hidden, [aria-label], [aria-describedby]").forEach(h=>{let c=h.getAttribute("aria-label")||h.getAttribute("aria-describedby")||"",m=h.textContent?.trim()||"";h.closest("button, input, a")||(c&&!d.includes(c)&&(d+=`
[Dado do Gr\xE1fico/Imagem: ${c}]`),m&&!c&&m.length>5&&!d.includes(m)&&(d+=`
[Tabela Oculta do Gr\xE1fico: ${m}]`))});let u=(t.innerText&&t.innerText.trim().length>0?t.innerText:t.textContent||"")+(d?`

--- DADOS OCULTOS DA QUEST\xC3O ---
${d}`:"");return $(u,e)}function sn(o){let e=[];function t(n){let i=n.tagName?.toLowerCase();if(i==="mfrac"){let a=Array.from(n.children),r=a[0]?.textContent?.trim()||"?",s=a[1]?.textContent?.trim()||"?";e.push(`(${r}/${s})`);return}if(i==="msqrt"){e.push(`sqrt(${n.textContent?.trim()||"?"})`);return}if(i==="msup"){let a=Array.from(n.children),r=a[0]?.textContent?.trim()||"?",s=a[1]?.textContent?.trim()||"?";e.push(`${r}^{${s}}`);return}if(i==="msub"){let a=Array.from(n.children),r=a[0]?.textContent?.trim()||"?",s=a[1]?.textContent?.trim()||"?";e.push(`${r}_{${s}}`);return}if(i==="mn"||i==="mi"||i==="mo"||i==="mtext"){e.push(n.textContent?.trim()||"");return}for(let a of Array.from(n.children))t(a)}return t(o),e.join(" ")}function vo(o){let e=o,t=e.closest('main, [role="main"], article, form, [data-test-id*="exercise" i], [data-testid*="exercise" i], .framework-perseus, section');if(t&&t!==document.body&&j(t))return t;let n=0;for(;e.parentElement&&e.parentElement!==document.body&&n<3;)e=e.parentElement,n++;return e||document.body}var gt=new Map,rn=3e4,yo=8;function ln(){let o=window.location.href,e=gt.get(o);return e?Date.now()-e.timestamp>rn?(gt.delete(o),null):e.selector:null}function $e(o){try{if(ht(o)<yo)return;let e=o.tagName.toLowerCase(),t=o.id?`#${o.id}`:"",n=o.dataset.easyquizId?`[data-easyquiz-id="${o.dataset.easyquizId}"]`:"",i=Array.from(o.classList).slice(0,3).map(r=>`.${r}`).join(""),a=`${e}${t}${n}${i}`;a&&a!=="body"&&a!=="html"&&gt.set(window.location.href,{selector:a,timestamp:Date.now()})}catch{}}function le(){let o=ln();if(o){try{let s=document.querySelector(o);if(s&&j(s)&&!Ce(s)&&ht(s)>=yo)return Qe(s)}catch{}gt.delete(window.location.href)}let e=document.querySelector('[class*="classification-layout" i], [class*="quiz-container" i][class*="classification" i]');if(e&&j(e))return $e(e),e;if(je()){let d=Array.from(document.querySelectorAll(".perseus-renderer, .framework-perseus")).filter(l=>{if(!j(l)||Ce(l))return!1;let u=l.getBoundingClientRect();return u.width>100&&u.height>50&&u.bottom>0&&u.top<window.innerHeight});if(d.length>0){d.sort((u,h)=>{let c=u.getBoundingClientRect(),m=h.getBoundingClientRect();return m.width*m.height-c.width*c.height});let l=Qe(d[0]);return $e(l),l}}let t=document.activeElement;if(t&&t!==document.body){let s=t.closest(bo);if(s&&!Ce(s)&&ht(s)>0){let d=Qe(s);return $e(d),d}}let i=Array.from(document.querySelectorAll(bo)).filter(s=>!Ce(s)).map(s=>({element:s,score:ht(s)})).filter(s=>Number.isFinite(s.score)).sort((s,d)=>d.score-s.score),a=i.find(s=>{let d=s.element.tagName.toLowerCase();return d!=="main"&&d!=="body"&&s.score>0});if(a){let s=Qe(a.element);return $e(s),s}if(i.length>0&&i[0].score>0){let s=Qe(i[0].element);return $e(s),s}let r=document.querySelector('form, main, [role="main"]');return r&&j(r)?r:document.body}function xo(o){let e=o.cloneNode(!0);e.querySelectorAll("script, style, iframe, object, embed, svg, canvas, noscript, audio, video").forEach(n=>n.remove());let t=["type","name","value","role","aria-label","aria-labelledby","aria-checked","aria-required","required","disabled","data-easyquiz-id","draggable","class","id","data-widget-type","data-role","data-category","data-testid"];return e.querySelectorAll("*").forEach(n=>{for(let i of Array.from(n.attributes))t.includes(i.name)||n.removeAttribute(i.name)}),e.outerHTML.replace(/\s+/g," ").slice(0,2e4)}function mt(o){let e=Array.from(o.querySelectorAll(Ne)),t=new Set,n=[],i=je();for(let u of e){if(!j(u)||re(u)||_(u)||i&&Ce(u))continue;let h=(u.value||u.textContent||"").trim();if(Ee.test(h))continue;let c=u.tagName.toLowerCase();["input","textarea","select"].includes(c)&&(t.add(u),n.push(u))}for(let u of e){if(!j(u)||re(u)||_(u)||i&&Ce(u))continue;let h=(u.value||u.textContent||"").trim();if(Ee.test(h))continue;let c=u.tagName.toLowerCase();if(["input","textarea","select"].includes(c))continue;let m=u.querySelector("input, textarea, select");if(!(m&&t.has(m))){if(u.hasAttribute("for")){let p=u.getAttribute("for"),g=p?u.ownerDocument.getElementById(p):null;if(g&&t.has(g))continue}if(c==="a"){let p=u.getAttribute("role"),g=u.getAttribute("class")||"",f=u.getAttribute("data-testid")||"",b=u.getAttribute("draggable")==="true"||u.classList.contains("perseus-drag-item")||u.classList.contains("sortable-item")||g.includes("cursor-grab")||!!u.getAttribute("aria-grabbed")||/drag|card|option|item/i.test(f)||/drag|card-item|sortable/i.test(g);if(!(p==="button"||p==="radio"||p==="checkbox"||p==="option"||b||u.closest('[class*="choice" i], [class*="option" i], [class*="answer" i], [data-testid*="option" i]')))continue}n.push(u)}}let a=n.length>0&&n.every(u=>_(u)||/read-?aloud|audio/i.test(u.getAttribute("data-testid")||u.getAttribute("aria-label")||"")),r=document.body.querySelector('[class*="classification-layout" i]')||document.body.querySelector('[class*="classification" i]')||o,s=document.body.querySelector('[class*="classification" i]')!==null||o.querySelector('[class*="classification" i]')!==null||o.querySelector('[data-cy*="quiz" i]')!==null||o.querySelector('[class*="draggable-item" i]')!==null||o.querySelector('[class*="drag-item" i]')!==null||o.querySelector('[class*="sortable-card" i]')!==null||o.matches?.('[class*="classification" i]');if((n.length===0||a)&&s){a&&(n.length=0);let u=Array.from(r.querySelectorAll('[class*="cursor-grab"][id], [draggable="true"][id], .dnd-card[id]'));if(u.length>0){for(let h of u)if(!(!j(h)||_(h))&&(n.push(h),n.length>=50))break}else{let h=Array.from(r.querySelectorAll("button, div[class], span[class], p, li"));for(let c of h){if(!j(c)||re(c)||_(c)||Ee.test((c.textContent||"").trim()))continue;let m=(c.textContent||"").trim();if(m.length<2||m.length>300)continue;if(Array.from(c.children).some(g=>g.className&&g.textContent?.trim())||n.push(c),n.length>=50)break}}}let d=n.some(u=>["input","select","textarea"].includes(u.tagName.toLowerCase())),l=!d&&n.length>0&&n.every(u=>{let h=u.tagName.toLowerCase();if(["input","select","textarea","button"].includes(h))return!1;let c=(u.textContent||"").trim();return!u.id||c.length<10||/^\d+\s*\/\s*\d+$/.test(c)||/^question text/i.test(c)});if(n.length===0||l){l&&(n.length=0);let u=Array.from(document.body.querySelectorAll('[class*="cursor-pointer"][id]'));if(u.length>0)for(let h of u){if(!j(h)||pe(h)||re(h)||_(h)||Ee.test((h.textContent||"").trim()))continue;let c=(h.textContent||"").trim();if(!(c.length<10||c.length>500)&&!/^\d+\s*\/\s*\d+$/.test(c)&&(n.push(h),n.length>=20))break}}if(n.length===0||n.length>0&&!d&&!n.some(u=>u.getAttribute("role")==="radio"||u.getAttribute("role")==="checkbox"||u.classList.contains("mq-editable-field")||u.closest(".perseus-widget-container"))){let h=document.querySelector(".perseus-renderer, .framework-perseus")||o,c=Array.from(h.querySelectorAll('.mq-editable-field, .mq-root-block, [class*="expression-editor" i], [class*="math-input" i]'));for(let b of c)!j(b)||pe(b)||n.includes(b)||n.push(b);let m=Array.from(h.querySelectorAll('[class*="perseus-dropdown" i], .perseus-widget-container select, .perseus-widget-container [role="combobox"], .perseus-widget-container [role="listbox"]'));for(let b of m)!j(b)||pe(b)||n.includes(b)||n.push(b);let p=Array.from(h.querySelectorAll('[class*="perseus-radio" i] [role="radio"], .perseus-widget-container [role="radio"], .perseus-widget-container [role="checkbox"]'));for(let b of p)!j(b)||pe(b)||b.querySelector('input[type="radio"], input[type="checkbox"]')||n.includes(b)||n.push(b);let g=Array.from(h.querySelectorAll('.perseus-widget-container [role="button"], .number-line [role="slider"], [class*="interactive-graph" i] [role="button"]'));for(let b of g)!j(b)||pe(b)||re(b)||n.includes(b)||n.push(b);let f=Array.from(h.querySelectorAll('.perseus-widget-container input:not([type="hidden"]), .perseus-widget-container textarea, .perseus-widget-container select'));for(let b of f)!j(b)||pe(b)||t.has(b)||n.includes(b)||n.push(b)}return n.slice(0,100).map(u=>Ft(u,"answer"))}function Ut(o){let e=[o,o.parentElement,o.parentElement?.parentElement,document.body].filter(Boolean),t=new Set,n=[];for(let i of e)for(let a of Array.from(i.querySelectorAll(Ne)))if(!(t.has(a)||!j(a)||!re(a)||_(a))&&(t.add(a),n.push(Ft(a,"navigation")),n.length>=10))return n;return n}function Te(o=!1){let e=le();e=Qe(e),o&&(e=vo(e));let t=mt(e),n=Ut(e);if(t.length===0){let s=mt(document.body);s.length>0&&(e=vo(e),t=mt(e),t.length===0&&(t=s,e=document.querySelector('main, article, form, [role="main"]')||document.body))}n.length===0&&(n=Ut(document.body));let i=e.querySelector(".katex, math, .mq-root-block, .mq-editable-field"),a;if(i)a=an(e,16e3);else{let s=e.innerText&&e.innerText.trim().length>0?e.innerText:e.textContent||"";a=s.length>4e4?$(s.slice(0,8e3),8e3)+`
[...conte\xFAdo extenso truncado...]
`+$(s.slice(-2e3),2e3):$(s,16e3)}let r=[...t,...n].slice(0,120);return!a||r.length===0&&a.length<30?$(document.body.innerText||document.body.textContent||"",16e3).length>=30?qe():null:{sourceUrl:window.location.href.slice(0,2e3),pageTitle:document.title.slice(0,500)||"P\xE1gina de Quest\xE3o",questionText:a,htmlSnippet:xo(e),controls:r,scope:e}}function qe(){let o=document.body.innerText||document.body.textContent||document.documentElement.textContent||"",e=$(o,16e3),t=mt(document.body),n=Ut(document.body),i=[...t,...n].slice(0,120),a=document.querySelector('main, article, form, [role="main"], [data-test-id*="content" i], [class*="content" i]')||document.body;return{sourceUrl:window.location.href.slice(0,2e3),pageTitle:document.title.slice(0,500)||"P\xE1gina de Quest\xE3o",questionText:e,htmlSnippet:xo(a).slice(0,15e3),controls:i,scope:a}}function Xt(o){let e=o.controls.map(t=>{let n=t.options?t.options.length:0;return`${t.role}:${t.id}:${t.type}:${n}`}).join("|");return[window.location.href,o.pageTitle,o.questionText.slice(0,400),e].join("::")}function ft(o){if(!o)return!1;let e=o.toLowerCase();return["?","quest\xE3o","questao","pergunta","exerc\xEDcio","exercicio","assinale","calcule","determine","qual \xE9","qual o","quais","indique","selecione","escolha","responda","julgue","verdadeiro ou falso","complete","resolva","encontre","alternativa","correta","incorreta","m\xB3","cm\xB2","volume","probabilidade","matriz","valor de","resultado de","considere","dada a","sabendo que","quanto vale","obtenha"].some(n=>e.includes(n))}function W(o){return o?!!(o.closest('#easyquiz-shadow-root, .eq-sidebar, .eq-launcher, [data-easyquiz-ignore="true"], .btn-inject-eq, #btn-inject-script')||o.getAttribute?.("data-easyquiz-ignore")==="true"):!1}function I(o){return o==null?"":(typeof o=="string"?o:String(o)).replace(/^(\([0-9a-zA-Z]{1,2}\)|[0-9]{1,3}|[a-zA-Z])[\.\)\-\:]\s+/,"").replace(/[\.\u2026]{2,}/g," ").replace(/['"“”«»]/g,"").replace(/\s+/g," ").trim()}function ie(o){if(!o||o instanceof HTMLInputElement||o instanceof HTMLSelectElement||o instanceof HTMLTextAreaElement||o.getAttribute("draggable")==="true"||o.classList.contains("dnd-card")||o.hasAttribute("data-category")||o.hasAttribute("data-dropzone"))return o;if(o.hasAttribute("for")){let n=o.getAttribute("for");if(n){let i=o.ownerDocument.getElementById(n);if(i)return i}}let e=o.closest('label, .option-card, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, td, li, .dnd-card, [class*="option-card" i], [class*="choice-card" i], .dropdown-row, [class*="dropdown" i], [class*="select-row" i]');if(e&&!["article","section","main","form","body"].includes(e.tagName.toLowerCase())){let n=e.getAttribute("for"),a=(n?e.ownerDocument.getElementById(n):null)||e.querySelector('input:not([type="hidden"]), select, textarea');return a||e}let t=o.closest('button, a, [role="button"], [draggable="true"]');if(t)return t;if(["body","html","main","section","article","form"].includes(o.tagName.toLowerCase())){let n=o.querySelector('button, [role="button"], a, input:not([type="hidden"]), select, textarea, [role="radio"], [role="checkbox"], .option-card, label');if(n)return ie(n)}return o}function Ao(o){let e=o;if(!e||!document.contains(e))try{e=le()}catch{}e=e||document.body;let t=i=>{let a=Array.from(i.querySelectorAll("tr")).filter(u=>j(u)&&u.querySelector('input[type="radio"], input[type="checkbox"]'));if(a.length>1)return a;let r=Array.from(i.querySelectorAll('input[type="checkbox"], input[type="radio"], [role="checkbox"], [role="radio"]')).filter(u=>j(u)&&!W(u));if(r.length>0)return r;let d=Array.from(i.querySelectorAll('.option-card, [role="option"], [class*="choice-card" i], [class*="option-card" i], li[class*="choice" i], li[class*="option" i]')).filter(u=>j(u)&&!W(u)).filter(u=>!u.parentElement?.closest('.option-card, [role="option"], [class*="choice-card" i], [class*="option-card" i]'));return d.length>0?d:Array.from(i.querySelectorAll('[class*="classification" i] [class], [class*="draggable-item" i], [class*="drag-item" i], [class*="sortable-card" i]')).filter(u=>{let h=u;return j(h)&&!W(h)&&(h.textContent||"").trim().length>2&&!re(h)&&!_(h)&&!h.querySelector("[class]")})},n=t(e);return n.length>0?n:e!==document.body?t(document.body):[]}function Q(o,e,t=!1){if(o==null)return null;let i=(typeof o=="string"?o:String(o)).trim().replace(/^["'“”«»]+|["'“”«»]+$/g,"");if(!i)return null;let a=te(i),r=document.querySelector(`[data-easyquiz-id="${a}"]`);if(r&&!W(r))return ie(r);try{let c=document.getElementById(i);if(c&&j(c)&&!W(c))return c.hasAttribute("data-category")||c.hasAttribute("data-dropzone")||c.classList.contains("dnd-zone")?c:ie(c)}catch{}try{let c=document.querySelector(`[data-item-id="${a}"]`);if(c&&j(c)&&!W(c))return ie(c)}catch{}let s=i.match(/^(?:item|opção|opcao|afirmação|afirmacao|alternativa|linha|afirmativa|questão|questao|campo|blank|lacuna|input|resposta)?\s*#?_?([0-9]+)$/i);if(s){let c=parseInt(s[1],10);if(t){let p=document.body;try{p=le()||document.body}catch{}let g=Array.from(p.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, select, [contenteditable="true"]')).filter(f=>j(f)&&!W(f));if(c>=1&&c-1<g.length)return g[c-1];if(c===0&&g.length>0)return g[0]}let m=c-1;if(m>=0){let p=Ao();if(m<p.length){let b=p[m];if(b.tagName.toLowerCase()==="tr"){if(e){let y=b.querySelector(`input[value="${te(e)}" i], [data-value="${te(e)}" i]`);if(y)return y}let v=b.querySelector("input");if(v)return v}return ie(b)}let g=document.body;try{g=le()||document.body}catch{}let f=Array.from(g.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, select, [contenteditable="true"]')).filter(b=>j(b)&&!W(b));if(m<f.length)return f[m]}}let d=i.match(/^(?:item|opção|opcao|afirmação|afirmacao|alternativa|linha|afirmativa|questão|questao)?\s*#?([a-eA-E])$/i);if(d){let c=d[1].toUpperCase(),m=c.charCodeAt(0)-65,p=Array.from(document.querySelectorAll(`input[type="radio"][value="${c}" i], input[type="checkbox"][value="${c}" i]`)).find(f=>j(f)&&!W(f));if(p)return ie(p);let g=Array.from(document.querySelectorAll('.option-card, .choice, .answer, label, [role="radio"], [role="checkbox"]')).find(f=>{if(!j(f)||W(f))return!1;let v=(f.querySelector('.option-badge, .badge, [class*="badge" i], [class*="letter" i]')?.textContent||"").trim().toUpperCase();if(v===c||v===`${c})`||v===`(${c})`||v===`${c}.`||v===`${c}:`)return!0;let y=(f.textContent||"").trim().toUpperCase();return y.startsWith(`${c})`)||y.startsWith(`(${c})`)||y.startsWith(`${c}.`)||y.startsWith(`${c}:`)});if(g)return ie(g);if(m>=0){let f=Ao();if(m<f.length){let b=f[m];if(b.tagName.toLowerCase()==="tr"){if(e){let y=b.querySelector(`input[value="${te(e)}" i], [data-value="${te(e)}" i]`);if(y)return y}let v=b.querySelector("input");if(v)return v}return ie(b)}}}if(/^[a-zA-Z0-9_-]{1,10}$/.test(i)){let m=Array.from(document.querySelectorAll(`[data-category="${a}" i], [data-dropzone="${a}" i], [data-role="dropzone"][data-category="${a}" i]`)).find(b=>j(b)&&!W(b));if(m)return m;let g=Array.from(document.querySelectorAll(`input[value="${a}" i], [data-value="${a}" i], input[id="${a}" i], input[placeholder="${a}" i], textarea[placeholder="${a}" i], [title="${a}" i]`)).find(b=>j(b)&&!W(b));if(g)return ie(g);let f=Array.from(document.querySelectorAll('.option-badge, [class*="badge" i], [class*="letter" i], .option-card span, label span')).find(b=>{if(!j(b)||W(b))return!1;let v=I(b.textContent).toLowerCase();return v===i.toLowerCase()||v===i.toLowerCase()+")"});if(f)return ie(f)}try{let c=Array.from(document.querySelectorAll(`[name="${a}"], [value="${a}"], [placeholder="${a}" i], [title="${a}" i], [data-category="${a}" i], [data-dropzone="${a}" i], [data-testid="${a}" i], [data-test-id="${a}" i], [aria-label="${a}" i]`));if(e){let p=c.find(g=>{if(!j(g)||W(g))return!1;if(g instanceof HTMLInputElement&&g.value.toLowerCase()===e.toLowerCase())return!0;let f=g.closest("label, .vf-label, td, div");return f&&I(f.textContent).toLowerCase().includes(I(e).toLowerCase())});if(p)return ie(p)}let m=c.find(p=>j(p)&&!W(p));if(m)return m.hasAttribute("data-category")||m.hasAttribute("data-dropzone")||m.classList.contains("dnd-zone")?m:ie(m)}catch{}if(/^[.#\[]|\s|[>+~:]/.test(i))try{let m=Array.from(document.querySelectorAll(i)).find(p=>j(p)&&!W(p));if(m)return ie(m)}catch{}try{let c=i.replace(/"/g,""),m=`//button[normalize-space(.)="${c}"] | //a[normalize-space(.)="${c}"] | //*[not(*) and normalize-space(.)="${c}"] | //*[@aria-label="${c}"] | //*[@data-category="${c}"] | //*[@data-testid="${c}"]`,p=document.evaluate(m,document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);for(let g=0;g<p.snapshotLength;g++){let f=p.snapshotItem(g);if(f&&j(f)&&!W(f)){if(["body","html"].includes(f.tagName.toLowerCase())){let v=f.querySelector('button, [role="button"], a, input, [role="radio"], [role="checkbox"], label');if(v&&j(v))return ie(v)}return f.closest('[data-role="dropzone"], [class*="category" i], [class*="bucket" i], [class*="column" i], [class*="drop" i]')||ie(f)}}}catch{}let u=I(i).toLowerCase(),h=Array.from(document.querySelectorAll('button, a, div, span, li, p, label, input, textarea, select, [draggable="true"], [data-testid], [class*="option" i], [class*="card" i], [class*="item" i], [class*="choice" i], [class*="category" i], [class*="bucket" i]'));for(let c of h){if(!j(c)||W(c)||c.closest("header, nav, .stepper, .step-item, .progress-bar-container")||_(c)||!!(c.matches('article, section, form, main, [class*="container" i], [class*="grid" i], .dnd-pool, .dnd-zones')||c.querySelector('label, [role="radio"], [role="checkbox"], .dnd-card, [draggable="true"], .option-card, tr'))&&!c.matches(".dnd-zone, [data-category], [data-dropzone]"))continue;let p=I(c.textContent).toLowerCase(),g=I(c.getAttribute("aria-label")||"").toLowerCase(),f=I(c.getAttribute("placeholder")||"").toLowerCase(),b=I(c.getAttribute("title")||"").toLowerCase(),v=I(c.getAttribute("name")||"").toLowerCase(),y=I(c.getAttribute("data-category")||"").toLowerCase(),E=c instanceof HTMLInputElement||c instanceof HTMLButtonElement?c.value:"",w=I(E).toLowerCase(),q=p.startsWith(u+")")||p.startsWith(u+".")||p.startsWith(u+" -")||p.startsWith(u+":");if(p===u||g===u||f===u||b===u||v===u||y&&y===u||w&&w===u||q)return c.closest('[data-role="dropzone"], [class*="category" i], [class*="bucket" i], [class*="column" i], [class*="drop" i]')||ie(c)}if(u.length>=3)for(let c of h){if(!j(c)||W(c)||c.closest("header, nav, .stepper, .step-item, .progress-bar-container")||_(c)||!!(c.matches('article, section, form, main, [class*="container" i], [class*="grid" i], .dnd-pool, .dnd-zones')||c.querySelector('label, [role="radio"], [role="checkbox"], .dnd-card, [draggable="true"], .option-card, tr'))&&!c.matches(".dnd-zone, [data-category], [data-dropzone]"))continue;let p=I(c.textContent).toLowerCase(),g=I(c.getAttribute("aria-label")||"").toLowerCase(),f=I(c.getAttribute("placeholder")||"").toLowerCase(),b=I(c.getAttribute("title")||"").toLowerCase(),v=I(c.getAttribute("name")||"").toLowerCase();if(p.includes(u)||g.includes(u)||f.includes(u)||b.includes(u)||v.includes(u)){if(Array.from(c.children).some(q=>{let C=I(q.textContent).toLowerCase();return C&&C.includes(u)}))continue;return c.closest('[data-role="dropzone"], [class*="category" i], [class*="bucket" i], [class*="column" i], [class*="drop" i]')||ie(c)}let y=u.split(/\s+/).filter(Boolean);if(y.length>=3){let E=y.slice(0,Math.min(5,y.length)).join(" ");if(p.includes(E)||g.includes(E)||f.includes(E))return ie(c)}}return null}function wo(o,e){for(let t of e)o.dispatchEvent(new Event(t,{bubbles:!0,composed:!0}))}function se(o,e){if(!o)return;try{o.scrollIntoView({block:"nearest",inline:"nearest",behavior:"instant"})}catch{}try{o.focus?.()}catch{}let t=o.getBoundingClientRect(),n=e?e[0]:Math.round(t.left+Math.max(1,t.width/2)),i=e?e[1]:Math.round(t.top+Math.max(1,t.height/2)),a={bubbles:!0,cancelable:!0,composed:!0,view:window,clientX:n,clientY:i};try{o.dispatchEvent(new PointerEvent("pointerover",{...a}))}catch{}try{o.dispatchEvent(new MouseEvent("mouseover",{...a}))}catch{}try{o.dispatchEvent(new PointerEvent("pointerdown",{...a,button:0,buttons:1}))}catch{}try{o.dispatchEvent(new MouseEvent("mousedown",{...a,button:0,buttons:1}))}catch{}try{o.dispatchEvent(new PointerEvent("pointerup",{...a,button:0,buttons:0}))}catch{}try{o.dispatchEvent(new MouseEvent("mouseup",{...a,button:0,buttons:0}))}catch{}if(typeof o.click=="function")try{o.click()}catch{try{o.dispatchEvent(new MouseEvent("click",{...a,button:0,buttons:0}))}catch{}}else try{o.dispatchEvent(new MouseEvent("click",{...a,button:0,buttons:0}))}catch{}try{let r=Object.keys(o).find(s=>s.startsWith("__reactFiber")||s.startsWith("__reactInternalInstance"));if(r){let s=o[r];for(;s;){let d=s.memoizedProps||s.pendingProps;if(d?.onClick){d.onClick({type:"click",target:o,currentTarget:o,bubbles:!0,cancelable:!0,preventDefault:()=>{},stopPropagation:()=>{}});break}s=s.return}}}catch{}try{let r=Object.keys(o).find(s=>s.startsWith("__reactProps"));if(r){let s=o[r];s?.onClick&&s.onClick({type:"click",target:o,currentTarget:o,bubbles:!0,cancelable:!0,preventDefault:()=>{},stopPropagation:()=>{}})}}catch{}try{let r=o._vei;r?.onClick&&(Array.isArray(r.onClick.value)?r.onClick.value:[r.onClick.value]).forEach(d=>{try{d({type:"click",target:o})}catch{}})}catch{}try{o.$onclick&&o.$onclick({type:"click",target:o,preventDefault:()=>{},stopPropagation:()=>{}})}catch{}try{if(!!(document.querySelector('meta[content*="google.com/forms"], form[action*="formResponse"]')||o.closest("[data-item-id], [jsmodel], [jsaction], .freebirdFormviewerComponentsQuestionBaseRoot"))){let s=o.querySelector('input[type="radio"], input[type="checkbox"]');s&&(s.focus?.(),s.click(),Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"checked")?.set?.call(s,!0),s.dispatchEvent(new Event("change",{bubbles:!0})));let d=o.closest("[jsaction]");if(d&&d!==o)try{d.dispatchEvent(new MouseEvent("click",{bubbles:!0,cancelable:!0,view:window,clientX:n,clientY:i}))}catch{}}}catch{}if(o.getAttribute("role")==="button"||o.getAttribute("tabindex")!==null)try{o.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0,cancelable:!0})),o.dispatchEvent(new KeyboardEvent("keyup",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0,cancelable:!0}))}catch{}}function Gt(o){try{let e=o.id,t=!!e;e||(e=`__eq_tmp_${Math.random().toString(36).slice(2,8)}`,o.id=e);let n=document.createElement("script");return n.textContent=`(function(){var el=document.getElementById(${JSON.stringify(e)});if(el){el.dispatchEvent(new MouseEvent('click',{bubbles:true,cancelable:true,composed:true,view:window}));if(typeof el.click==='function')el.click();var fk=Object.keys(el).find(function(k){return k.startsWith('__reactFiber')||k.startsWith('__reactInternalInstance');});if(fk){var fb=el[fk];while(fb){var mp=fb.memoizedProps||fb.pendingProps;if(mp&&typeof mp.onClick==='function'){try{mp.onClick({type:'click',target:el,currentTarget:el,bubbles:true,cancelable:true,preventDefault:function(){},stopPropagation:function(){}});}catch(e){}break;}fb=fb.return;}}var pk=Object.keys(el).find(function(k){return k.startsWith('__reactProps');});if(pk&&el[pk]&&typeof el[pk].onClick==='function'){try{el[pk].onClick({type:'click',target:el,currentTarget:el,bubbles:true,cancelable:true,preventDefault:function(){},stopPropagation:function(){}});}catch(e){}}if(el._vei&&el._vei.onClick){var h=el._vei.onClick.value;var hs=Array.isArray(h)?h:[h];hs.forEach(function(fn){try{fn({type:'click',target:el});}catch(e){}});}}})()`,document.head.appendChild(n),n.remove(),t||setTimeout(()=>{try{o.id===e&&o.removeAttribute("id")}catch{}},0),!0}catch{return!1}}function bt(o,e){let t=o;if(t.hasAttribute("for")){let h=t.getAttribute("for"),c=t.ownerDocument.getElementById(h);c&&(t=c)}let n=t.classList?.contains("mq-editable-field")||t.classList?.contains("mq-root-block")?t:t.querySelector(".mq-editable-field, .mq-root-block");if(n)try{let h=n.__mathquill||n.mathquill;if(h&&typeof h.latex=="function"){h.latex(e),n.dispatchEvent(new Event("input",{bubbles:!0,composed:!0})),n.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}));return}let c=window.MathQuill?.getInterface?.(2)||window.MathQuill?.getInterface?.(1);if(c){let m=c(n);if(m&&typeof m.latex=="function"){m.latex(e),n.dispatchEvent(new Event("input",{bubbles:!0,composed:!0}));return}}n.focus?.(),n.dispatchEvent(new KeyboardEvent("keydown",{key:"a",code:"KeyA",ctrlKey:!0,bubbles:!0})),n.dispatchEvent(new KeyboardEvent("keydown",{key:"Backspace",code:"Backspace",bubbles:!0}));for(let m of e)n.dispatchEvent(new KeyboardEvent("keydown",{key:m,code:`Key${m.toUpperCase()}`,bubbles:!0,cancelable:!0})),n.dispatchEvent(new KeyboardEvent("keypress",{key:m,code:`Key${m.toUpperCase()}`,bubbles:!0,cancelable:!0})),n.dispatchEvent(new InputEvent("input",{data:m,inputType:"insertText",bubbles:!0,cancelable:!0,composed:!0})),n.dispatchEvent(new KeyboardEvent("keyup",{key:m,code:`Key${m.toUpperCase()}`,bubbles:!0,cancelable:!0}));n.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}));return}catch(h){console.warn("[EasyQuiz] MathQuill fill falhou, continuando com fallback padr\xE3o:",h)}let i=t.matches?.('[class*="perseus-dropdown" i], [class*="perseus"] [role="combobox"]')?t:t.querySelector('[class*="perseus-dropdown" i], [class*="perseus"] [role="combobox"]');if(i)try{se(i),setTimeout(()=>{let h=e.trim().toLowerCase(),c=Array.from(document.querySelectorAll('[role="option"], [role="listbox"] [role="option"], [class*="dropdown"] [role="option"], [class*="perseus"] [class*="option"], .dropdown-option, [class*="select-option"]')).filter(m=>{let p=m;if(!j(p)||W(p))return!1;let g=(p.textContent||"").trim().toLowerCase(),f=p.getAttribute("data-value")?.toLowerCase()||"";return g===h||f===h||g.includes(h)||h.length>2&&h.includes(g)});c.length>0&&se(c[0])},250);return}catch(h){console.warn("[EasyQuiz] Perseus dropdown fill falhou:",h)}if(typeof HTMLSelectElement<"u"&&t instanceof HTMLSelectElement||t.tagName?.toLowerCase()==="select"||t.getAttribute("role")==="combobox"||t.getAttribute("role")==="listbox"||t.matches?.('[role="combobox"], [role="listbox"], [class*="select" i], [class*="dropdown" i]')){vt(t,[e]);return}let r=t.querySelector('select, [role="combobox"], [role="listbox"]');if(r){vt(r,[e]);return}if(!(t instanceof HTMLInputElement)&&!(t instanceof HTMLTextAreaElement)&&!(t instanceof HTMLSelectElement)&&!t.isContentEditable){let h=t.querySelector('input:not([type="hidden"]), textarea, select, [contenteditable="true"]');if(h)t=h;else{let m=t.closest('.form-group, .field, [class*="input" i], [class*="control" i], label, tr, td, li, p, div')?.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, select, [contenteditable="true"]');if(m)t=m;else{let p=t.nextElementSibling;for(;p;){if(p instanceof HTMLInputElement&&!["hidden","button","submit","checkbox","radio"].includes(p.type)||p instanceof HTMLTextAreaElement||p instanceof HTMLElement&&p.isContentEditable){t=p;break}let g=p.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(g){t=g;break}p=p.nextElementSibling}}}}if(t instanceof HTMLButtonElement||t.tagName.toLowerCase()==="a"||t.getAttribute("role")==="button"||t instanceof HTMLInputElement&&["button","submit","reset","image"].includes(t.type)){let h=t.parentElement?.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(h)t=h;else{let c=document.body;try{c=le()||document.body}catch{}let m=c.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(m)t=m;else{console.warn("[EasyQuiz] setNativeValue: Nenhum campo de texto encontrado para receber o valor.");return}}}if(!(t instanceof HTMLInputElement)&&!(t instanceof HTMLTextAreaElement)&&!(t instanceof HTMLSelectElement)&&!t.isContentEditable){let h=document.body;try{h=le()||document.body}catch{}let c=h.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(c)t=c;else{console.warn("[EasyQuiz] setNativeValue: Nenhum campo de texto encontrado para receber o valor.");return}}if(t instanceof HTMLInputElement&&["checkbox","radio"].includes(t.type)){let h=["true","1","checked","yes","sim"].includes(e.toLowerCase())||e===t.value;Se(t,h);return}let d=String(e??""),l=d;if(t instanceof HTMLInputElement&&t.type==="number"){let h=d.replace(",",".").replace(/[^0-9.-]/g,"");h&&!isNaN(Number(h))&&(l=h)}try{t.scrollIntoView?.({block:"center",inline:"center",behavior:"instant"}),t.focus?.()}catch{}try{if(t instanceof HTMLInputElement||t instanceof HTMLTextAreaElement){let h=t instanceof HTMLTextAreaElement?HTMLTextAreaElement.prototype:HTMLInputElement.prototype,c=Object.getOwnPropertyDescriptor(h,"value")?.set;c?c.call(t,""):t.value="";try{t.select?.()}catch{}}else if(t.isContentEditable){t.textContent="";try{document.execCommand?.("selectAll",!1,void 0)}catch{}}}catch{}let u=!1;try{t instanceof HTMLInputElement||t instanceof HTMLTextAreaElement?t.type!=="number"&&t.type!=="range"&&(u=document.execCommand?.("insertText",!1,l)||!1):t.isContentEditable&&(u=document.execCommand?.("insertText",!1,l)||!1)}catch{}if(t instanceof HTMLInputElement||t instanceof HTMLTextAreaElement){try{let m=t._valueTracker;m&&m.setValue(l===""?" ":"")}catch{}let h=t instanceof HTMLTextAreaElement?HTMLTextAreaElement.prototype:HTMLInputElement.prototype,c=Object.getOwnPropertyDescriptor(h,"value")?.set;c?c.call(t,l):t.value=l;try{t.dispatchEvent(new KeyboardEvent("keydown",{bubbles:!0,cancelable:!0,key:l.slice(-1)||"a"}))}catch{}try{t.dispatchEvent(new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,composed:!0,data:l,inputType:"insertText"}))}catch{}try{t.dispatchEvent(new InputEvent("input",{bubbles:!0,cancelable:!0,composed:!0,data:l,inputType:"insertText"}))}catch{t.dispatchEvent(new Event("input",{bubbles:!0,cancelable:!0,composed:!0}))}try{t.dispatchEvent(new KeyboardEvent("keyup",{bubbles:!0,cancelable:!0,key:l.slice(-1)||"a"}))}catch{}try{t.dispatchEvent(new Event("change",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}try{t.dispatchEvent(new FocusEvent("blur",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}if(t.value!==l&&!(t instanceof HTMLInputElement&&t.type==="number"&&Number(t.value)===Number(l))){t.value=l;try{c?.call(t,l)}catch{}}return}if(t.isContentEditable){if(t.textContent?.trim()!==l.trim()){t.textContent=l;try{t.innerText=l}catch{}}try{t.dispatchEvent(new InputEvent("input",{bubbles:!0,cancelable:!0,composed:!0,data:l,inputType:"insertText"}))}catch{t.dispatchEvent(new Event("input",{bubbles:!0,cancelable:!0,composed:!0}))}try{t.dispatchEvent(new Event("change",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}try{t.dispatchEvent(new FocusEvent("blur",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}return}try{"value"in t&&(t.value=l),t.dispatchEvent(new Event("input",{bubbles:!0,cancelable:!0,composed:!0})),t.dispatchEvent(new Event("change",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}}function Ze(o,e=""){if(o==null)return e;let t=typeof o=="string"?o:String(o);if(!t)return e;let n=/^(eq-|#|\$|\.|input_|mat-|choice_|radio_|chk_)/i.test(t),i=I(t),a=Q(t)||Q(i);if(!a)return n?e:i||e;let r=a.closest('label, .option-card, [class*="choice" i], [class*="option" i], .quiz-option, tr, td, li');if(r){let h=I(r.textContent);if(h&&h.length>0&&h.length<150)return h}if(a.id){let h=document.querySelector(`label[for="${te(a.id)}"]`);if(h){let c=I(h.textContent);if(c&&c.length>0&&c.length<150)return c}}let s=a.getAttribute("aria-label");if(s)return I(s);let d=a.getAttribute("placeholder");if(d)return I(d);let l=I(a.textContent);if(l&&l.length>0&&l.length<120)return l;let u=a instanceof HTMLInputElement||a instanceof HTMLButtonElement?a.value:"";return u?I(u):n?e:i||e}function Se(o,e){if(!o)return;let t=o.closest('label, td, .option-card, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, [class*="option" i], [class*="choice" i], li')||o,n=o instanceof HTMLInputElement&&["checkbox","radio"].includes(o.type)?o:t.querySelector('input[type="checkbox"], input[type="radio"]');!n&&t.hasAttribute("for")&&(n=t.ownerDocument.getElementById(t.getAttribute("for")));let i=o instanceof HTMLInputElement?o.closest("label")||(o.id?t.ownerDocument.getElementById(t.getAttribute("for")):null)||o:t&&j(t)?t:o;if(n){let a=n.type==="radio",r=n.type==="checkbox",s=!!n._valueTracker;if(n.checked===e){if(a&&e){t.setAttribute("aria-checked","true"),t.setAttribute("aria-selected","true"),t.classList.add("selected","active","checked");return}if(r){t.setAttribute("aria-checked",e?"true":"false"),t.setAttribute("aria-selected",e?"true":"false"),t.classList.toggle("selected",e),t.classList.toggle("active",e),t.classList.toggle("checked",e);return}}if(i&&i!==n&&se(i),n.checked!==e)try{n.focus?.(),n.click()}catch{}if(n.checked!==e){try{let l=n._valueTracker;l&&l.setValue(!e)}catch{}try{Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"checked")?.set?.call(n,e)}catch{}n.checked=e,wo(n,["input","change"])}t.setAttribute("aria-checked",e?"true":"false"),t.setAttribute("aria-selected",e?"true":"false"),t.classList.toggle("selected",e),t.classList.toggle("active",e),t.classList.toggle("checked",e)}else{if((t.getAttribute("aria-checked")==="true"||t.getAttribute("aria-selected")==="true"||t.getAttribute("data-selected")==="true"||t.getAttribute("data-checked")==="true"||t.classList.contains("selected")||t.classList.contains("active")||t.classList.contains("checked"))===e&&e)return;se(i),t.setAttribute("aria-checked",e?"true":"false"),t.setAttribute("aria-selected",e?"true":"false"),t.classList.toggle("selected",e),t.classList.toggle("active",e),t.classList.toggle("checked",e)}}function vt(o,e){let t=typeof HTMLSelectElement<"u"&&o instanceof HTMLSelectElement||o.tagName?.toLowerCase()==="select"?o:o.querySelector("select");if(t){let r=e.map(l=>I(l).toLowerCase()),s=!1,d=(l,u)=>{l.selected=!0,t.selectedIndex=u;try{t.value=l.value}catch{}try{Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype,"value")?.set?.call(t,l.value)}catch{}try{let h=t._valueTracker;h&&h.setValue(l.value)}catch{}s=!0};for(let l=0;l<t.options.length;l++){let u=t.options[l],h=u.value.toLowerCase(),c=I(u.textContent).toLowerCase();if(r.some(p=>p===h||p===c)){if(d(u,l),!t.multiple)break}else t.multiple||(u.selected=!1)}if(!s)for(let l of r){let u=l.match(/^(?:item|opção|opcao|alternativa|linha|escolha|campo)?\s*#?_?([0-9]+)$/i);if(u){let h=parseInt(u[1],10),m=t.options[0]?.value===""||t.options[0]?.disabled?h:h>=1?h-1:0;if(m>=0&&m<t.options.length&&(d(t.options[m],m),!t.multiple))break}}if(!s){for(let l of r)if(/^[a-z]$/i.test(l)){let u=l.toUpperCase().charCodeAt(0)-65,c=t.options[0]?.value===""||t.options[0]?.disabled?u+1:u;if(c>=0&&c<t.options.length&&(d(t.options[c],c),!t.multiple))break}}if(!s){let l=u=>u.normalize("NFD").replace(/[\u0300-\u036f]/g,"");for(let u=0;u<t.options.length;u++){let h=t.options[u],c=l(h.value.toLowerCase()),m=l(I(h.textContent).toLowerCase());if(r.some(g=>{let f=l(g);return c.includes(f)||m.includes(f)||f.length>2&&(f.includes(c)||f.includes(m))})&&(d(h,u),!t.multiple))break}}if(s){wo(t,["focus","input","change","blur"]);return}}let n=o.matches?.('[role="combobox"], [role="listbox"], [class*="select" i], [class*="dropdown" i]')?o:o.closest('[role="combobox"], [role="listbox"], [class*="select" i], [class*="dropdown" i]');n&&se(n);let i=e.map(r=>I(r).toLowerCase()),a=Array.from(document.querySelectorAll('[role="listbox"] [role="option"], [role="menu"] [role="menuitem"], .select-dropdown li, .dropdown-menu .dropdown-item, .ant-select-item-option, .MuiMenuItem-root, [class*="option-item"], li[data-value]')).filter(r=>j(r)&&!W(r));for(let r of i){let s=a.find(l=>{let u=I(l.textContent).toLowerCase(),h=I(l.getAttribute("data-value")||l.getAttribute("value")||"").toLowerCase();return u===r||h===r||u.includes(r)||r.length>2&&r.includes(u)});if(s){se(s);let l=s.querySelector('input[type="radio"], input[type="checkbox"]');l&&Se(l,!0);return}let d=Q(r);if(d){se(d);return}}}function cn(o,e){try{let t=new DataTransfer;try{t.setData("text/plain",o)}catch{}try{t.setData("text/html",e)}catch{}return t}catch{return null}}function Vt(o){try{o.click()}catch{let e=o.ownerDocument.defaultView||window;o.dispatchEvent(new e.MouseEvent("click",{bubbles:!0,cancelable:!0,composed:!0,view:e}))}}function dn(o,e,t){try{if(e.contains(o))return{success:!0,evidence:"origin is child of dest (DOM move confirmed)"};if(!document.body.contains(o))return{success:!0,evidence:"origin removed from DOM (consumed by framework)"};let n=e.children.length;if(t!==void 0&&n>t)return{success:!0,evidence:`dest child count increased: ${t} \u2192 ${n}`};if([o.getAttribute("data-placed")==="true",o.getAttribute("data-assigned")==="true",o.getAttribute("data-matched")==="true",o.getAttribute("aria-grabbed")==="false",/placed|dropped|assigned|matched|done|sorted|categorized/i.test(o.className||"")].some(Boolean))return{success:!0,evidence:"origin has placement indicator: class/attr"};let a=(o.textContent||"").trim().toLowerCase();return a.length>2&&Array.from(e.querySelectorAll("*")).some(d=>d!==e&&(d.textContent||"").trim().toLowerCase()===a)?{success:!0,evidence:"origin text found inside dest children (clone or DOM move)"}:e.getAttribute("data-count")&&parseInt(e.getAttribute("data-count")||"0")>0?{success:!0,evidence:"dest data-count > 0, categorization likely succeeded"}:o.getAttribute("aria-hidden")==="true"||o.style.display==="none"||o.style.visibility==="hidden"?{success:!0,evidence:"origin hidden after drop (framework confirmed placement)"}:{success:!1,evidence:"no DOM evidence of successful drag/categorization"}}catch{return{success:!1,evidence:"verification threw exception"}}}function ge(o,e){let t=I(o).toLowerCase();if(!t)return null;if(e==="source"){if(/^[0-9a-f]{10,}$/.test(o.trim())){let s=document.getElementById(o.trim());if(s&&j(s)&&!W(s))return s}let r=['[class*="cursor-grab"][id]',".dnd-card",'[draggable="true"]'];for(let s of r){let l=Array.from(document.querySelectorAll(s)).find(u=>{if(!j(u)||W(u))return!1;let h=I(`${u.id} ${u.textContent||""} ${u.getAttribute("data-id")||""}`).toLowerCase();return h===t||h.includes(t)||u.id===o.trim()});if(l)return l}return null}let n=["[data-dropzone]","[data-category]",'[data-role="dropzone"]','[class*="dropzone" i]','[class*="list-group" i]','[class*="classification-group" i]'].join(","),i=Array.from(document.querySelectorAll(n)),a=i.find(r=>[r.getAttribute("data-category"),r.getAttribute("data-dropzone")].some(s=>s?.trim().toLowerCase()===t));return a&&j(a)&&!W(a)?a:i.find(r=>{if(!j(r)||W(r)||/unclassified/i.test(r.className))return!1;let s=r.querySelector('.font-bold, h1, h2, h3, h4, [class*="header" i], [class*="title" i], [class*="label" i]'),d=I(s?.textContent||r.textContent||"").toLowerCase();return d.includes("op")&&(d.includes("es")||d.includes("\xF5es"))?!1:d===t||d.startsWith(t)||d.includes(t)})||null}async function yt(o,e,t=1){try{o.scrollIntoView({block:"center",inline:"center",behavior:"instant"})}catch{}let n=o.getBoundingClientRect(),i=e.getBoundingClientRect(),a=Math.round(n.left+Math.max(1,n.width/2)),r=Math.round(n.top+Math.max(1,n.height/2)),s=Math.round(i.left+Math.max(1,i.width/2)),d=Math.round(i.top+Math.max(1,i.height/2)),l=I(e.textContent).toLowerCase();if(l){let g=Array.from(o.querySelectorAll('button, [role="button"], input[type="radio"], input[type="checkbox"], option, .btn, [class*="tag" i]')).find(f=>{let b=I(f.textContent).toLowerCase(),v=f instanceof HTMLInputElement||f instanceof HTMLOptionElement?I(f.value).toLowerCase():"";return b&&(l.includes(b)||b.includes(l))||v&&(l.includes(v)||v.includes(l))});g&&(se(g),await new Promise(f=>setTimeout(f,120)))}Vt(o),await new Promise(p=>setTimeout(p,140)),Vt(e);let u=e.querySelector('[data-role="dropzone"], [class*="bucket" i], [class*="slot" i], [class*="drop" i], [class*="target" i], [class*="items" i], ul, ol');if(u&&u!==e&&Vt(u),await new Promise(p=>setTimeout(p,100)),!e.contains(o)&&o.matches('.dnd-card, [draggable="true"]')&&e.matches('.dnd-zone, [data-dropzone], [data-role="dropzone"]')&&e.appendChild(o),e.contains(o)&&o.matches('.dnd-card, [draggable="true"]'))return;let h={bubbles:!0,cancelable:!0,composed:!0,view:window,clientX:a,clientY:r,screenX:a,screenY:r,button:0,buttons:1};try{o.dispatchEvent(new PointerEvent("pointerdown",{...h,isPrimary:!0,pointerId:1,pointerType:"mouse",pressure:.5}))}catch{}o.dispatchEvent(new MouseEvent("mousedown",h));let c=4;for(let p=1;p<=c;p++){let g=Math.round(a+(s-a)*(p/c)),f=Math.round(r+(d-r)*(p/c)),b={...h,clientX:g,clientY:f,screenX:g,screenY:f};try{o.dispatchEvent(new PointerEvent("pointermove",{...b,isPrimary:!0,pointerId:1,pointerType:"mouse",pressure:.5}))}catch{}document.dispatchEvent(new MouseEvent("mousemove",b))}let m={bubbles:!0,cancelable:!0,composed:!0,view:window,clientX:s,clientY:d,screenX:s,screenY:d,button:0,buttons:0};try{e.dispatchEvent(new PointerEvent("pointerup",{...m,isPrimary:!0,pointerId:1,pointerType:"mouse",pressure:0}))}catch{}e.dispatchEvent(new MouseEvent("mouseup",m)),e.dispatchEvent(new MouseEvent("click",m));try{let p=cn($(o.textContent),o.outerHTML),g={...h},f={...m};p&&(g.dataTransfer=p,f.dataTransfer=p);let b=o.ownerDocument.defaultView?.DragEvent;if(!b)throw new Error("DragEvent n\xE3o dispon\xEDvel neste documento");o.dispatchEvent(new b("dragstart",g)),e.dispatchEvent(new b("dragenter",f)),e.dispatchEvent(new b("dragover",f)),e.dispatchEvent(new b("drop",f)),o.dispatchEvent(new b("dragend",g))}catch(p){console.warn("[EasyQuiz] DragEvent ignorado com seguran\xE7a:",p)}try{let p=new Touch({identifier:1,target:o,clientX:a,clientY:r}),g=new Touch({identifier:1,target:e,clientX:s,clientY:d});o.dispatchEvent(new TouchEvent("touchstart",{bubbles:!0,cancelable:!0,touches:[p]})),e.dispatchEvent(new TouchEvent("touchmove",{bubbles:!0,cancelable:!0,touches:[g]})),e.dispatchEvent(new TouchEvent("touchend",{bubbles:!0,cancelable:!0,touches:[]}))}catch{}if(t>=2&&!e.contains(o))try{o.focus?.(),o.dispatchEvent(new KeyboardEvent("keydown",{key:" ",code:"Space",bubbles:!0})),o.dispatchEvent(new KeyboardEvent("keyup",{key:" ",code:"Space",bubbles:!0})),await new Promise(p=>setTimeout(p,80)),e.focus?.(),e.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",bubbles:!0})),e.dispatchEvent(new KeyboardEvent("keyup",{key:"Enter",code:"Enter",bubbles:!0}))}catch{}if(!e.contains(o))try{let p=b=>{let v=Object.keys(b).find(E=>E.startsWith("__reactFiber")||E.startsWith("__reactInternalInstance"));if(!v)return null;let y=b[v];for(let E=0;E<10&&y;E++){if(y.memoizedProps)return y.memoizedProps;y=y.return}return null},g=p(o),f=p(e);if(g){let b=g.onMouseDown||g.onPointerDown||g.onDragStart;if(typeof b=="function")try{b({type:"mousedown",button:0,buttons:1,clientX:a,clientY:r,bubbles:!0,preventDefault:()=>{},stopPropagation:()=>{},currentTarget:o,target:o}),await new Promise(v=>setTimeout(v,100))}catch{}}if(f){let b=f.onMouseUp||f.onPointerUp||f.onDrop;if(typeof b=="function")try{b({type:"mouseup",button:0,buttons:0,clientX:s,clientY:d,bubbles:!0,preventDefault:()=>{},stopPropagation:()=>{},currentTarget:e,target:e})}catch{}}try{o.focus?.(),o.dispatchEvent(new KeyboardEvent("keydown",{key:" ",code:"Space",keyCode:32,bubbles:!0,cancelable:!0})),await new Promise(v=>setTimeout(v,200));let b=d>r?"ArrowDown":"ArrowUp";for(let v=0;v<3;v++)document.dispatchEvent(new KeyboardEvent("keydown",{key:b,bubbles:!0,cancelable:!0})),await new Promise(y=>setTimeout(y,60));document.dispatchEvent(new KeyboardEvent("keydown",{key:" ",code:"Space",keyCode:32,bubbles:!0,cancelable:!0})),await new Promise(v=>setTimeout(v,80))}catch{}try{!!document.querySelector("[data-rbd-draggable-id], [data-rbd-droppable-id], [data-dnd-kit-sortable]")&&(o.dispatchEvent(new CustomEvent("dndkitdragstart",{bubbles:!0,cancelable:!0,detail:{id:o.id||o.getAttribute("data-id")}})),await new Promise(v=>setTimeout(v,100)),e.dispatchEvent(new CustomEvent("dndkitdrop",{bubbles:!0,cancelable:!0,detail:{overId:e.id||e.getAttribute("data-id")}})))}catch{}}catch(p){console.warn("[EasyQuiz] Estrat\xE9gia G (React DnD internals) falhou:",p)}if(!e.contains(o))try{let p=o.closest("[data-rbd-draggable-id]"),g=e.closest("[data-rbd-droppable-id]");if(p&&g){let f=p.getBoundingClientRect(),b=g.getBoundingClientRect(),v=f.left+f.width/2,y=f.top+f.height/2,E=b.left+b.width/2,w=b.top+b.height/2,q=(L,A,P,O)=>new PointerEvent(L,{bubbles:!0,cancelable:!0,composed:!0,clientX:A,clientY:P,screenX:A,screenY:P,isPrimary:!0,pointerId:1,pointerType:"mouse",pressure:L==="pointerup"?0:.5,...O});p.dispatchEvent(q("pointerdown",v,y)),await new Promise(L=>setTimeout(L,80));let C=8;for(let L=1;L<=C;L++){let A=v+(E-v)*(L/C),P=y+(w-y)*(L/C);window.dispatchEvent(q("pointermove",A,P)),document.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:A,clientY:P})),await new Promise(O=>setTimeout(O,20))}g.dispatchEvent(q("pointerup",E,w,{pressure:0})),g.dispatchEvent(new MouseEvent("mouseup",{bubbles:!0,clientX:E,clientY:w,button:0})),await new Promise(L=>setTimeout(L,120)),console.log("[EasyQuiz] Estrat\xE9gia H (Quizizz RBD) executada")}}catch(p){console.warn("[EasyQuiz] Estrat\xE9gia H (Quizizz RBD) falhou:",p)}}function Eo(o,e,t,n){let i=d=>d.replace(/\\/g,"\\\\").replace(/'/g,"\\'").replace(/"/g,'\\"').slice(0,100),a=i(o.toLowerCase()),r=i(e.toLowerCase());return`var src=$eq.find('${i(t)}')||Array.from(document.querySelectorAll('[data-rbd-draggable-id],[draggable],[class*="cursor-grab"],[class*="dnd-card"]')).find(function(e){return (e.textContent||'').toLowerCase().includes('${a}');});var dst=Array.from(document.querySelectorAll('[data-rbd-droppable-id],[class*="list-group"],[class*="dropzone"],[data-category]')).find(function(e){var h=e.querySelector('.font-bold,h1,h2,h3,h4,[class*="header"]');var t=(h||e);return (t.textContent||'').toLowerCase().includes('${r}');});if(src&&dst){try{src.focus();src.dispatchEvent(new KeyboardEvent('keydown',{key:' ',code:'Space',keyCode:32,bubbles:true}));setTimeout(function(){dst.dispatchEvent(new KeyboardEvent('keydown',{key:'Enter',code:'Enter',bubbles:true}));},200);}catch(e){}try{dst.appendChild(src);}catch(e){}[src,dst].forEach(function(el){try{el.dispatchEvent(new Event('change',{bubbles:true}));}catch(e){}try{el.dispatchEvent(new CustomEvent('dndkitdrop',{bubbles:true,detail:{}}));}catch(e){}});}else{console.warn('[EQ-drag-fallback] nao localizado: ${a} -> ${r}');}`}var Co={fill:(o,e)=>{let t=Q(o);t?bt(t,e):console.warn(`$eq.fill: Elemento '${o}' n\xE3o encontrado`)},click:o=>{let e=Q(o);e?!!(e.closest('.option-card, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, [class*="option" i], [class*="choice" i]')||e.querySelector('input[type="radio"], input[type="checkbox"]')||e instanceof HTMLInputElement&&["checkbox","radio"].includes(e.type))?Se(e,!0):se(e):console.warn(`$eq.click: Elemento '${o}' n\xE3o encontrado`)},check:(o,e)=>{let t=Q(o);t?Se(t,e):console.warn(`$eq.check: Elemento '${o}' n\xE3o encontrado`)},find:(o,e)=>Q(o,e),drag:(o,e)=>{let t=ge(o,"source")||Q(o),n=ge(e,"destination")||Q(e);t&&n?yt(t,n):console.warn(`$eq.drag: Origem ou destino n\xE3o encontrado ('${o}' -> '${e}')`)},categorize:async(o,e)=>{let t=ge(o,"source")||Q(o),n=ge(e,"destination")||Q(e);if(!t||!n){console.warn(`$eq.categorize: Item ou categoria n\xE3o encontrados ('${o}' -> '${e}')`);return}await yt(t,n)},execute:(o,e=!1,t=1)=>_e(o,e,t)};typeof window<"u"&&(window.$eq=Co);async function un(o,e,t){if(!e)return!1;if(o.t==="val"&&(e.classList.contains("mq-editable-field")||e.closest(".mq-editable-field"))){let n=e.classList.contains("mq-editable-field")?e:e.closest(".mq-editable-field");if(n){try{let i=n.__controller||n.__mathquill_controller;if(i&&i.API)return i.API.latex(t),!0}catch{}try{n.focus();for(let i of t){let a={key:i,bubbles:!0,cancelable:!0};n.dispatchEvent(new KeyboardEvent("keydown",a)),n.dispatchEvent(new KeyboardEvent("keypress",a)),document.execCommand?.("insertText",!1,i),n.dispatchEvent(new KeyboardEvent("keyup",a))}return!0}catch{}}}if(o.t==="sel"&&e.closest(".perseus-widget-container")){let n=e.tagName==="BUTTON"?e:e.querySelector("button")||e.closest("button");if(n)try{se(n),await new Promise(a=>setTimeout(a,150));let i=Array.from(document.querySelectorAll('[data-reach-popover], [role="listbox"], .perseus-dropdown'));for(let a of i){let s=Array.from(a.querySelectorAll('[role="option"], li, button')).find(d=>I(d.textContent).toLowerCase().includes(I(t).toLowerCase()));if(s)return se(s),!0}se(n)}catch{}}if((o.t==="clk"||o.t==="chk")&&e.closest(".perseus-widget-container"))try{let n=Object.keys(e).find(a=>a.startsWith("__reactFiber$")),i=Object.keys(e).find(a=>a.startsWith("__reactProps$"));if(i&&e[i]){let a=e[i];if(typeof a.onClick=="function")return a.onClick({preventDefault:()=>{},stopPropagation:()=>{}}),!0;if(typeof a.onChange=="function")return a.onChange({target:{checked:!0,value:t},preventDefault:()=>{}}),!0}}catch{}return!1}async function pn(o,e=1,t=Oe()){if(Nt(o,t),o.t==="js"){let d=String(o.v||"");po(d);try{new Function("$eq","document","window",d)(Co,document,window)}catch(l){throw console.warn("[EasyQuiz JS Execution]",l),l}return}if(o.t==="drag"){let d=ge(o.from,"source")||Q(o.from),l=ge(o.to,"destination")||Q(o.to);!d&&o.from&&(d=Q(I(o.from))),!l&&o.to&&(l=Q(I(o.to))),d&&l?await yt(d,l,e):console.warn(`[EasyQuiz] Drag: alvo n\xE3o encontrado ('${o.from}' -> '${o.to}')`);return}let n=o.id!==void 0&&o.id!==null?String(o.id):"";!n&&o.t==="val"&&(n=o.target??o.name??o.selector??"1");let i=o.v!==void 0?o.v:o.value!==void 0?o.value:o.val!==void 0?o.val:o.text,a=i!=null?String(i).trim():"",r=null,s=String(o.name??o.n??"").trim();if(!s&&n&&document.querySelector(`input[type="radio"][name="${te(n)}"]`)&&(s=n),(o.t==="chk"||o.t==="clk")&&s){let d=Array.from(document.querySelectorAll(`input[name="${te(s)}"]`));if(a&&(r=d.find(l=>l.value?.toLowerCase()===a.toLowerCase())??null),!r&&a){let l=/^(v|verdadeiro|true|1|t|sim|correto)$/i.test(a),u=/^(f|falso|false|0|nao|não|incorreto|errado)$/i.test(a);if(l||u){let h=l?["v","verdadeiro","true","1","t","sim","correto"]:["f","falso","false","0","nao","n\xE3o","incorreto","errado"];r=d.find(c=>{let m=c.value?.toLowerCase()??"";if(h.includes(m))return!0;let g=(c.closest('label, td, [class*="option" i]')?.textContent??"").trim().toLowerCase();return h.some(f=>g===f||g.startsWith(f+" ")||g.startsWith("("+f+")"))})??null}}!r&&d.length>0&&(r=d[0])}if(r||(r=Q(n,a,o.t==="val"||o.t==="sel")),!r&&n&&(r=Q(I(n),a,o.t==="val"||o.t==="sel")),r&&a){if(r instanceof HTMLInputElement&&r.type==="radio"&&r.name){if(I(r.value).toLowerCase()!==I(a).toLowerCase()){let d=document.querySelector(`input[type="radio"][name="${te(r.name)}"][value="${te(a)}" i]`);if(d)r=d;else{let u=Array.from(document.querySelectorAll(`input[type="radio"][name="${te(r.name)}"]`)).find(h=>{let c=h.closest("label, .vf-label, .option-card, tr, td, div");return c&&I(c.textContent).toLowerCase().includes(I(a).toLowerCase())});u&&(r=u)}}}else if(!(r instanceof HTMLInputElement)&&!(r instanceof HTMLSelectElement)&&!(r instanceof HTMLTextAreaElement)){let d=r.querySelector(`input[value="${te(a)}" i], [data-value="${te(a)}" i]`);if(d)r=d;else{let u=Array.from(r.querySelectorAll('input[type="radio"], input[type="checkbox"]')).find(h=>{let c=h.closest("label, .vf-label, .option-card, td, div");return c&&I(c.textContent).toLowerCase().includes(I(a).toLowerCase())});u&&(r=u)}}}if(!r&&(o.t==="val"||o.t==="sel")){let d=document.body;try{d=le()||document.body}catch{}let l=Array.from(d.querySelectorAll(o.t==="sel"?'select, [role="combobox"], [role="listbox"]':'input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, select, [contenteditable="true"]')).filter(u=>j(u)&&!W(u));if(l.length===1)r=l[0];else if(l.length>1){let u=I(n).toLowerCase(),h=u.match(/^#?_?([0-9]+)$/);if(h){let c=parseInt(h[1],10);c>=1&&c<=l.length?r=l[c-1]:c>=0&&c<l.length&&(r=l[c])}r||(r=l.find(m=>{let p=(m.getAttribute("placeholder")||"").toLowerCase(),g=(m.name||"").toLowerCase(),f=(m.getAttribute("aria-label")||"").toLowerCase(),b=(m.id||"").toLowerCase(),v=I(Qt(m)).toLowerCase(),y=I(m.closest('label, tr, td, .form-group, .field, [class*="row" i], div')?.textContent||"").toLowerCase();return p.includes(u)||g.includes(u)||f.includes(u)||b.includes(u)||v&&v.includes(u)||u.length>=2&&y.includes(u)})||(l.length===1?l[0]:null))}}if(!r&&o.t!=="adv"){let d=document.querySelector(".perseus-renderer, .framework-perseus, .perseus-widget-container");if(d){let l=I(n).toLowerCase(),u=Array.from(d.querySelectorAll('.mq-editable-field, [role="radio"], [role="checkbox"], [role="combobox"], input:not([type="hidden"]), textarea, select, [role="button"], [role="option"]')).filter(h=>j(h)&&!W(h));if(r=u.find(h=>{let c=(h.textContent||"").trim().toLowerCase(),m=(h.id||"").toLowerCase(),p=(h.getAttribute("aria-label")||"").toLowerCase(),g=(h.value||h.getAttribute("data-value")||"").toLowerCase();return m===l||c===l||p===l||g===l||l.length>=3&&(c.includes(l)||p.includes(l))})||null,!r&&o.t==="val"&&u.length>0){let h=u.filter(c=>c instanceof HTMLInputElement||c instanceof HTMLTextAreaElement||c.classList.contains("mq-editable-field")||c.classList.contains("mq-root-block")||c.isContentEditable);if(h.length>0){let c=l.match(/^#?_?([0-9]+)$/);if(c){let m=parseInt(c[1],10);r=h[Math.min(m-1,h.length-1)]||h[0]}else r=h[0]}}}}if(!r&&o.t!=="adv")throw new Error(`Alvo '${n}' n\xE3o encontrado no DOM para a\xE7\xE3o '${o.t}'.`);if(!(je()&&r&&o.t!=="adv"&&await un(o,r,a)))switch(o.t){case"val":if(r){let u=r instanceof HTMLInputElement||r instanceof HTMLTextAreaElement||r instanceof HTMLSelectElement||r.isContentEditable?r:r.querySelector('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]');if(!u){let g=r.closest('.form-group, .field, [class*="input" i], [class*="control" i], label, tr, td, li, p, div')?.querySelector('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]');g&&(u=g)}if(!u){let p=r.nextElementSibling;for(;p;){if(p instanceof HTMLInputElement&&!["hidden","button","submit","checkbox","radio"].includes(p.type)||p instanceof HTMLTextAreaElement||p instanceof HTMLElement&&p.isContentEditable){u=p;break}let g=p.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(g){u=g;break}p=p.nextElementSibling}}if(!u){let p=document.body;try{p=le()||document.body}catch{}let g=Array.from(p.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]')).filter(f=>j(f)&&!W(f));g.length>0&&(u=g[0])}let h=o.v!==void 0?o.v:o.value!==void 0?o.value:o.val!==void 0?o.val:o.text,c=h!=null?String(h):"",m=u||r;if(m instanceof HTMLInputElement){let p=m.type.toLowerCase(),g=m.maxLength,f=m.min,b=m.max,v=m.step,y=m.pattern;if(g>0&&c.length>g&&(c=c.slice(0,g)),p==="number"||p==="range"){let E=parseFloat(c);if(!isNaN(E)){let w=E;if(f!==""&&!isNaN(parseFloat(f))&&(w=Math.max(w,parseFloat(f))),b!==""&&!isNaN(parseFloat(b))&&(w=Math.min(w,parseFloat(b))),v!==""&&v!=="any"&&!isNaN(parseFloat(v))){let q=parseFloat(v),C=f!==""?parseFloat(f):0;w=C+Math.round((w-C)/q)*q,f!==""&&!isNaN(parseFloat(f))&&(w=Math.max(w,parseFloat(f))),b!==""&&!isNaN(parseFloat(b))&&(w=Math.min(w,parseFloat(b)))}c=Number.isInteger(w)?String(w):String(parseFloat(w.toFixed(6)))}}if(y)try{let E=new RegExp(`^(?:${y})$`);if(!E.test(c)){let w=c.match(/-?\d+\.?\d*/);w&&E.test(w[0])&&(c=w[0])}}catch{}}bt(u||r,c)}break;case"chk":let d=o.c!==void 0?!!o.c:!0;r&&Se(r,d);break;case"sel":if(r){let u=Array.isArray(o.v)?o.v:[String(o.v)];vt(r,u)}break;case"clk":if(r)if(!!(r.closest('.option-card, label, .vf-label, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, [class*="option" i], [class*="choice" i], [class*="answer" i], li, tr')||r.querySelector('input[type="radio"], input[type="checkbox"]')||r instanceof HTMLInputElement&&["checkbox","radio"].includes(r.type))){let h=o.c!==void 0?!!o.c:!0;Se(r,h)}else se(r,o.co);break;case"adv":let l=At(o.id);if(l){await Kt(l,1200);let u=o.id||l.textContent?.trim()||"";u&&Pt(window.location.hostname,{advanceSelector:u}),se(l)}else console.warn("[EasyQuiz] Bot\xE3o de avan\xE7o n\xE3o localizado.");break}}function hn(){let o=["button","a",'[role="button"]','input[type="submit"]','input[type="button"]','[data-testid*="check" i]','[data-test-id*="check" i]'].join(",");return Array.from(document.querySelectorAll(o)).find(t=>{if(!j(t)||W(t)||t.closest("header, nav, aside"))return!1;let n=t instanceof HTMLInputElement||t instanceof HTMLButtonElement?t.value:"",i=(t.textContent||n||t.getAttribute("aria-label")||"").trim();return/(verificar|checar|check|conferir|validar|enviar|responder)/i.test(i)})||null}function At(o){let e=c=>{let m=(c.getAttribute("aria-label")||c.textContent||(c instanceof HTMLInputElement||c instanceof HTMLButtonElement?c.value:"")||"").trim();return Ee.test(m)};if(o){let c=Q(o);if(c&&j(c)&&!W(c)&&!_(c)&&!e(c))return c}try{let c=Ht(window.location.hostname);if(c.advanceSelector){let m=Q(c.advanceSelector);if(m&&j(m)&&!W(m)&&!_(m)&&!e(m))return m}}catch{}let t=["button","a",'[role="button"]','[role="link"]','input[type="button"]','input[type="submit"]','[data-testid*="next" i]','[data-testid*="continue" i]','[data-testid*="check" i]','[data-test-id*="next" i]','[data-test-id*="continue" i]','[data-test-id*="check" i]','[class*="next" i]','[class*="continue" i]','[class*="proximo" i]','[class*="avancar" i]'].join(","),n=Array.from(document.querySelectorAll(t)),i=c=>{let m=c instanceof HTMLInputElement||c instanceof HTMLButtonElement?c.value:"";return(c.getAttribute("aria-label")||c.textContent||m||"").trim()},a=c=>{let m=i(c).trim();return/^\d{1,3}$/.test(m)?!!c.closest('[class*="pagination" i], [class*="pager" i], [class*="page-nav" i], [class*="step-indicator" i], [class*="breadcrumb" i], [class*="steps" i], [aria-label*="p\xE1gina" i], [aria-label*="page" i], [role="navigation"], nav'):!1},r=n.filter(c=>j(c)&&!W(c)&&!c.closest("header, aside")&&!_(c)&&!e(c));for(let c of r){let m=i(c),p=m.replace(/[\d\(\)\[\]\u2192>\u2022\-\/\\]+/g," ").trim();if((Ye.test(m)||Ye.test(p))&&!a(c)&&!_(c))return c}for(let c of r)if(re(c)&&!_(c)&&!a(c))return c;let s=document.querySelector('[data-test-id*="next" i], [data-testid*="next" i], [aria-label*="next" i], [aria-label*="pr\xF3xim" i], [aria-label*="avan\xE7ar" i], [aria-label*="continuar" i]');if(s&&j(s)&&!W(s)&&!_(s)&&!e(s))return s;let d=Array.from(document.querySelectorAll('input[type="submit"], button[type="submit"]'));for(let c of d)if(j(c)&&!W(c)&&!e(c)&&!_(c)&&!a(c))return c;let l=Array.from(document.querySelectorAll('button, [role="button"]')),u=window.innerHeight,h=l.filter(c=>{if(!j(c)||W(c)||e(c)||_(c)||c.closest("header, nav, aside, .eq-sidebar")||a(c))return!1;let m=c.getBoundingClientRect();return m.top>u*.45&&m.height>=24&&m.width>=24});if(h.length>0)return h.sort((c,m)=>{let p=c.getBoundingClientRect(),g=m.getBoundingClientRect(),f=p.left+p.top;return g.left+g.top-f}),h[0];for(let c of r)if(re(c)&&!_(c))return c;return null}async function Kt(o,e=2500){let t=Date.now();for(;Date.now()-t<e;){if(!(o.disabled===!0||o.getAttribute("aria-disabled")==="true"||o.classList.contains("disabled")||o.getAttribute("disabled")!==null))return;await new Promise(i=>setTimeout(i,80))}}function mn(){let o=window.location.href,e=document.title,t=document.querySelectorAll('input, textarea, select, button, [role="button"], [role="option"], [role="radio"], [role="checkbox"]').length,n=(document.body?.innerText||document.body?.textContent||"").length;return`${o}|${e}|${t}|${n}`}async function gn(o,e=3500){let[t,n,i,a]=o.split("|"),r=parseInt(a||"0",10),s=Date.now();for(;Date.now()-s<e;){let d=window.location.href,l=document.title,u=String(document.querySelectorAll('input, textarea, select, button, [role="button"], [role="option"], [role="radio"], [role="checkbox"]').length),h=(document.body?.innerText||document.body?.textContent||"").length;if(d!==t)return{changed:!0,evidence:`URL mudou: ${t} \u2192 ${d}`};if(l!==n)return{changed:!0,evidence:`T\xEDtulo da p\xE1gina mudou: "${n}" \u2192 "${l}"`};if(Math.abs(parseInt(u)-parseInt(i||"0"))>=2)return{changed:!0,evidence:`Controles interativos: ${i} \u2192 ${u}`};if(Math.abs(h-r)>50)return{changed:!0,evidence:`Conte\xFAdo da p\xE1gina mudou substancialmente (${Math.abs(h-r)} chars)`};await new Promise(c=>setTimeout(c,100))}return{changed:!1,evidence:"Nenhuma mudan\xE7a estrutural detectada dentro do tempo limite."}}async function xt(o){if(o.t==="js"||o.t==="adv")return;if(o.t==="drag"){let a=Q(o.from)||Q(I(o.from)),r=Q(o.to)||Q(I(o.to));a&&r&&await yt(a,r,2);return}let e=o.id||"",t=o.v!==void 0?String(o.v).trim():"",n=Q(e,t)||Q(I(e),t),i=String(o.name??o.n??"").trim();if(!i&&e&&document.querySelector(`input[type="radio"][name="${te(e)}"]`)&&(i=e),!n&&i){let a=Array.from(document.querySelectorAll(`input[name="${te(i)}"]`));if(t&&(n=a.find(r=>r.value?.toLowerCase()===t.toLowerCase())??null),!n&&t){let r=/^(v|verdadeiro|true|1|t|sim|correto)$/i.test(t),s=/^(f|falso|false|0|nao|não|incorreto|errado)$/i.test(t);if(r||s){let d=r?["v","verdadeiro","true","1","t","sim","correto"]:["f","falso","false","0","nao","n\xE3o","incorreto","errado"];n=a.find(l=>{let u=l.value?.toLowerCase()??"";if(d.includes(u))return!0;let c=(l.closest('label, td, [class*="option" i]')?.textContent??"").trim().toLowerCase();return d.some(m=>c===m||c.startsWith(m+" ")||c.startsWith("("+m+")"))})??null}}!n&&a.length>0&&(n=a[0])}if(o.t==="clk"||o.t==="chk"){if(!n&&e){let r=Array.from(document.querySelectorAll('input, label, button, [role="radio"], [role="checkbox"], .option-card, [class*="option" i], [class*="choice" i]')),s=I(e).toLowerCase();n=r.find(d=>{let l=I(d.textContent).toLowerCase();return!!(I(d.value||"").toLowerCase()===s||l===s||l.startsWith(s+")")||l.startsWith("("+s+")")||l.startsWith(s+".")||l.startsWith(s+" - ")||l.startsWith(s+":")||s.length>=3&&l.includes(s))})||null}let a=o.v!==void 0?String(o.v).trim():"";if(n&&a){if(n instanceof HTMLInputElement&&n.type==="radio"&&n.name){if(I(n.value).toLowerCase()!==I(a).toLowerCase()){let r=document.querySelector(`input[type="radio"][name="${te(n.name)}"][value="${te(a)}" i]`);if(r)n=r;else{let d=Array.from(document.querySelectorAll(`input[type="radio"][name="${te(n.name)}"]`)).find(l=>{let u=l.closest("label, .vf-label, .option-card, tr, td, div");return u&&I(u.textContent).toLowerCase().includes(I(a).toLowerCase())});d&&(n=d)}}}else if(!(n instanceof HTMLInputElement)&&!(n instanceof HTMLSelectElement)&&!(n instanceof HTMLTextAreaElement)){let r=n.querySelector(`input[value="${te(a)}" i], [data-value="${te(a)}" i]`);if(r)n=r;else{let d=Array.from(n.querySelectorAll('input[type="radio"], input[type="checkbox"]')).find(l=>{let u=l.closest("label, .vf-label, .option-card, td, div");return u&&I(u.textContent).toLowerCase().includes(I(a).toLowerCase())});d&&(n=d)}}}if(n){let r=n.closest('.option-card, label, .vf-label, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, li')||n,s=n instanceof HTMLInputElement&&["radio","checkbox"].includes(n.type)?n:r.querySelector('input[type="radio"], input[type="checkbox"]')||(r.getAttribute("for")?r.ownerDocument.getElementById(r.getAttribute("for")):null),d=o.c!==void 0?!!o.c:!0;if(Se(s||r,d),s&&s.checked!==d){try{let l=s._valueTracker;l&&l.setValue(!d)}catch{}try{Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"checked")?.set?.call(s,d)}catch{}s.checked=d,s.dispatchEvent(new Event("input",{bubbles:!0,composed:!0})),s.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}}return}if(o.t==="val"){let a=null;if(n&&(a=n instanceof HTMLInputElement||n instanceof HTMLTextAreaElement||n.isContentEditable?n:n.querySelector('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]')),!a){let r=document.body;try{r=le()||document.body}catch{}let s=Array.from(r.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]')),d=I(e).toLowerCase();a=s.find(l=>{let u=(l.getAttribute("placeholder")||"").toLowerCase(),h=(l.name||"").toLowerCase(),c=(l.id||"").toLowerCase(),m=(l.getAttribute("aria-label")||"").toLowerCase();return u.includes(d)||h.includes(d)||c.includes(d)||m.includes(d)})||(s.length>0?s[0]:null)}if(a){let r=String(o.v??"");try{if(a.focus?.(),a.type!=="number"){try{a.select?.()}catch{}document.execCommand?.("insertText",!1,r)}}catch{}bt(a,r)}return}if(o.t==="sel"){if(!n&&e){let a=Array.from(document.querySelectorAll("select")),r=I(e).toLowerCase();n=a.find(s=>{let d=(s.name||"").toLowerCase(),l=(s.id||"").toLowerCase(),u=(s.getAttribute("aria-label")||"").toLowerCase();return d.includes(r)||l.includes(r)||u.includes(r)})||null}if(n){let a=Array.isArray(o.v)?o.v:[String(o.v)];vt(n,a)}return}}function me(o){try{if(o.t==="val"){let e=o.v!==void 0?o.v:o.value!==void 0?o.value:o.val!==void 0?o.val:o.text,t=String(e??"").trim(),n=t,i=o.id!==void 0&&o.id!==null?String(o.id):"";i||(i=o.target??o.name??o.selector??"1");let a=Q(i,n,!0)||Q(I(i),n,!0);if(!a){let m=document.body;try{m=le()||document.body}catch{}let p=Array.from(m.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]')).filter(g=>j(g)&&!W(g));p.length>0&&(a=p[0])}if(!a)return!1;let r=a instanceof HTMLInputElement&&a.type==="radio"?a:a.querySelector('input[type="radio"]');if(r&&r.name){let m=document.querySelector(`input[type="radio"][name="${te(r.name)}"]:checked`);if(!m)return!1;let p=I(m.value).toLowerCase(),g=I(t).toLowerCase(),f=I(m.closest("label, .vf-label, .option-card, tr, td, div")?.textContent||"").toLowerCase();return p===g||f===g||f.includes(g)}let s=a instanceof HTMLInputElement||a instanceof HTMLTextAreaElement||a.isContentEditable?a:a.querySelector('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(!s){let p=a.closest('.form-group, .field, [class*="input" i], [class*="control" i], label, tr, td, li, p, div')?.querySelector('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]');p&&(s=p)}if(!s){let m=a.nextElementSibling;for(;m;){if(m instanceof HTMLInputElement&&!["hidden","button","submit","checkbox","radio"].includes(m.type)||m instanceof HTMLTextAreaElement||m instanceof HTMLElement&&m.isContentEditable){s=m;break}let p=m.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(p){s=p;break}m=m.nextElementSibling}}if(s instanceof HTMLSelectElement){let m=I(t).toLowerCase();return Array.from(s.options).some(p=>{if(!p.selected)return!1;let g=p.value.toLowerCase(),f=I(p.textContent).toLowerCase();return m===g||m===f||g.includes(m)||f.includes(m)})}let d=(s instanceof HTMLInputElement||s instanceof HTMLTextAreaElement?s.value:s?.textContent??a.textContent??"").trim();if(!d&&!t)return!0;if(!d&&t)return!1;let l=d.replace(",",".").replace(/\s+/g,"").toLowerCase(),u=t.replace(",",".").replace(/\s+/g,"").toLowerCase(),h=parseFloat(l),c=parseFloat(u);return!isNaN(h)&&!isNaN(c)&&l.match(/^-?[\d.,]+$/)&&u.match(/^-?[\d.,]+$/)?Math.abs(h-c)<1e-4:l===u||d.toLowerCase()===t.toLowerCase()||u.length>=3&&l===u}if(o.t==="sel"){let e=Q(o.id,void 0,!0)||Q(I(o.id),void 0,!0);if(!e){let a=document.body;try{a=le()||document.body}catch{}let r=Array.from(a.querySelectorAll('select, [role="combobox"], [role="listbox"]')).filter(l=>j(l)&&!W(l)),s=I(o.id).toLowerCase();e=r.find(l=>{let u=(l.id||"").toLowerCase(),h=(l.getAttribute("name")||"").toLowerCase(),c=(l.getAttribute("aria-label")||"").toLowerCase(),m=I(l.closest('.dropdown-row, [class*="dropdown" i], [class*="select" i], tr, label, div')?.textContent||"").toLowerCase();return u.includes(s)||h.includes(s)||c.includes(s)||s.length>=2&&m.includes(s)})||(r.length===1?r[0]:null)}if(!e)return!1;let t=e instanceof HTMLSelectElement?e:e.querySelector("select");if(!t){let a=e.matches?.('[role="combobox"], [role="listbox"], [class*="select" i], [class*="dropdown" i]')?e:e.closest('[role="combobox"], [role="listbox"], [class*="select" i], [class*="dropdown" i]');if(a){let s=(Array.isArray(o.v)?o.v:[String(o.v)]).map(l=>I(l).toLowerCase()),d=I(a.textContent).toLowerCase();return s.some(l=>d.includes(l)||l.includes(d))}return!1}let i=(Array.isArray(o.v)?o.v:[String(o.v)]).map(a=>I(a).toLowerCase());return Array.from(t.options).some(a=>{if(!a.selected)return!1;let r=a.value.toLowerCase(),s=I(a.textContent).toLowerCase();return i.some(d=>d===r||d===s||r.includes(d)||s.includes(d))})}if(o.t==="chk"||o.t==="clk"){let e=o.v!==void 0?String(o.v).trim():"",t=String(o.name??o.n??"").trim();if(t&&!o.id){let c=Array.from(document.querySelectorAll(`input[name="${te(t)}"]`));if(c.length>0){let m=c.find(v=>v.checked);if(!m)return!1;if(!e)return!0;let p=m.value?.toLowerCase()??"",g=e.toLowerCase();if(p===g)return!0;let f=/^(v|verdadeiro|true|1|t|sim|correto)$/i.test(e),b=/^(f|falso|false|0|nao|não|incorreto|errado)$/i.test(e);return f?/^(v|verdadeiro|true|1|t|sim|correto)$/i.test(p):b?/^(f|falso|false|0|nao|não|incorreto|errado)$/i.test(p):!1}}let n=Q(o.id,e)||Q(I(o.id),e);if(!n&&t){let c=document.querySelector(`input[name="${te(t)}"]`);c&&(n=c)}if(!n)return!1;let i=n.closest('.option-card, label, .vf-label, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, li')||n,a=n instanceof HTMLInputElement&&["checkbox","radio"].includes(n.type)?n:i.querySelector('input[type="checkbox"], input[type="radio"]')||(i.getAttribute("for")?i.ownerDocument.getElementById(i.getAttribute("for")):null),r=o.t==="chk"||o.c!==void 0?!!o.c:!0;if(a&&a.type==="radio"){if(a.checked===r)return!0;if(o.v&&a.name){let c=I(String(o.v)).toLowerCase(),m=document.querySelector(`input[type="radio"][name="${te(a.name)}"]:checked`);if(!m)return!1;if(m===a)return!0;let p=I(m.value).toLowerCase(),g=I(m.closest("label, .vf-label, .option-card, tr, td, div")?.textContent||"").toLowerCase();return p===c||g.includes(c)||c.includes(p)}}if(a&&["checkbox","radio"].includes(a.type))return a.checked===r;let s=i.getAttribute("aria-checked")===String(r)||i.getAttribute("aria-selected")===String(r)||i.getAttribute("aria-pressed")===String(r),d=r?i.getAttribute("data-selected")==="true"||i.getAttribute("data-checked")==="true"||i.getAttribute("data-active")==="true"||i.getAttribute("data-state")==="checked"||i.getAttribute("data-state")==="on":i.getAttribute("data-selected")==="false"||i.getAttribute("data-checked")==="false"||i.getAttribute("data-state")==="unchecked",l=i.className||"",u=r?/\b(active|selected|checked|picked|is-selected|choice-selected|selected-option|is-checked|chosen|current)\b/i.test(l):!/\b(active|selected|checked|picked|is-selected|choice-selected|selected-option|is-checked|chosen|current)\b/i.test(l);if(s||d||u)return!0;let h=!!i.closest('[role="radiogroup"], [role="listbox"], .options, .choices, [class*="option" i], [class*="choice" i], [class*="answer" i], [class*="quiz" i]');return o.t==="clk"&&!a&&!h||i.getAttribute("aria-expanded")!==null||i.getAttribute("aria-pressed")!==null}if(o.t==="drag"){let e=ge(o.from,"source")||Q(o.from)||Q(I(o.from)),t=ge(o.to,"destination")||Q(o.to)||Q(I(o.to));return!e||!t?!1:dn(e,t).success}}catch{}return!1}async function _e(o,e,t=1,n=Oe({engine:"smart",autoAdvance:e})){let i=o.actions.filter(A=>A.t!=="adv"),a=o.actions.filter(A=>A.t==="adv"),r=0,s=[],d=new Map,l=new Map,u=new Map,h=new Set,c=o.pageType==="question"||i.length>0,m=i.filter(A=>A.t==="chk"||A.t==="clk"&&A.c!==void 0),p=new Map;for(let A of i){let P=[];l.set(A,P);try{if(A.t==="drag"){P.push("declarative-A-F");try{let O=ge(A.from,"source")||Q(A.from),T=ge(A.to,"destination")||Q(A.to);O&&u.set(A,O.parentElement?.outerHTML?.slice(0,500)||""),T&&p.set(A,T.children.length)}catch{}}else P.push("declarative-primary");await pn(A,t,n),r++,h.add(A)}catch(O){d.set(A,O instanceof Error?O.message:String(O)),console.warn("[EasyQuiz] A\xE7\xE3o declarativa prim\xE1ria falhou com seguran\xE7a:",A,O)}await new Promise(O=>setTimeout(O,A.t==="drag"?180:35))}if(c&&o.mode==="escolha_multipla"&&m.length>0){let A=document.body;try{A=le()||document.body}catch{}let P=Array.from(A.querySelectorAll('input[type="checkbox"], [role="checkbox"]')).filter(O=>j(O)&&!W(O));if(P.length>1){let T=function(x,H){if(x===H||x.contains(H)||H.contains(x))return!0;let B=x.closest('.option-card, label, [role="checkbox"], [role="option"], tr, li, [class*="option" i]'),R=H.closest('.option-card, label, [role="checkbox"], [role="option"], tr, li, [class*="option" i]');if(B&&R&&B===R)return!0;let X=x.getAttribute("for")||x.id,V=H.getAttribute("for")||H.id;return!!(X&&V&&X===V)};var L=T;let O=new Set;for(let x of m){let H=x.t==="chk"?!!x.c:!!(x.c??!0),B="id"in x&&typeof x.id=="string"?x.id:"";if(H&&B){let R=Q(B,x.v);if(R){O.add(R);let X=R.querySelector('input[type="checkbox"]');X&&O.add(X);let V=R.closest('.option-card, label, [role="checkbox"], tr, li, [class*="option" i]');V&&(O.add(V),V.querySelectorAll('input[type="checkbox"]').forEach(J=>O.add(J)))}}}if(O.size>=m.length&&O.size>0){let x=Array.from(O);for(let H of P)x.some(R=>T(R,H))||(H instanceof HTMLInputElement&&H.checked||H.getAttribute("aria-checked")==="true"||H.closest(".option-card, label")?.classList.contains("selected"))&&Se(H,!1)}}}await new Promise(A=>setTimeout(A,i.length>0?100:25));let g=0;for(let A of i){if(me(A)){g++;continue}console.warn(`[EasyQuiz Auto-Cura] A\xE7\xE3o '${A.t}' no alvo '${A.id||A.from||""}' n\xE3o verificada no DOM. Disparando Passagem 2 de conting\xEAncia...`);try{Nt(A,n),l.get(A)?.push("alternative-path"),await xt(A)}catch(P){d.set(A,P instanceof Error?P.message:String(P)),console.warn("[EasyQuiz Auto-Cura] Rota alternativa falhou:",P)}await new Promise(P=>setTimeout(P,250)),me(A)&&(console.log("[EasyQuiz Auto-Cura] \u2713 A\xE7\xE3o recuperada com sucesso pela rota de conting\xEAncia!"),g++,h.has(A)?d.has(A)&&d.delete(A):(d.delete(A),r++,h.add(A)))}if(g<i.length&&i.length>0){console.warn(`[EasyQuiz Auto-Cura] ${i.length-g} de ${i.length} a\xE7\xE3o(\xF5es) ainda n\xE3o verificadas. Disparando Passagem 3 final...`),await new Promise(A=>setTimeout(A,200));for(let A of i)if(!me(A))try{if(await xt(A),await new Promise(P=>setTimeout(P,80)),!me(A)&&(A.t==="clk"||A.t==="chk"))try{let P="id"in A?String(A.id||""):"",O=A.v!==void 0?String(A.v).trim():"",T=Q(P,O)||Q(I(P),O);T&&(Gt(T),await new Promise(x=>setTimeout(x,120)))}catch{}}catch(P){d.set(A,P instanceof Error?P.message:String(P))}await new Promise(A=>setTimeout(A,200)),g=0;for(let A of i)me(A)&&(g++,h.has(A)?d.has(A)&&d.delete(A):(d.delete(A),r++,h.add(A)))}let f=[];for(let[A,P]of i.entries())if(!me(P)){let O=P.t==="drag"?`${P.from} -> ${P.to}`:"id"in P&&P.id?P.id:P.t;s.push(O),f.push({actionIndex:A,action:P,strategiesAttempted:l.get(P)||[],evidence:d.get(P)||"sem evid\xEAncia de aplica\xE7\xE3o no DOM",domSnapshot:u.get(P)}),P.t==="drag"&&console.warn(`[EasyQuiz Drag] FALHA CONFIRMADA: "${P.from}" -> "${P.to}"`,`
  Estrat\xE9gias: ${(l.get(P)||[]).join(", ")}`,`
  Snapshot DOM: ${u.get(P)?.slice(0,200)||"n/a"}`)}c&&i.length===0&&s.push("nenhuma a\xE7\xE3o de resposta prescrita");let b=i.map((A,P)=>{let O=A.t==="drag"?`${A.from} -> ${A.to}`:A.t==="js"?"$eq":A.id||A.t,T=A.t==="js"?!0:A.t==="drag"?!!(ge(A.from,"source")&&ge(A.to,"destination")):!!(Q(A.id||"")||Q(I(A.id||""))),x=me(A);return{index:P,action:A,target:O,located:T,applied:!d.has(A),verified:x,strategy:A.t==="drag"?"drag-adaptive":A.t==="js"?"javascript":"declarative-dom",evidence:x?"estado do controle confirmado no DOM":"nenhuma evid\xEAncia suficiente ap\xF3s as tentativas",...d.has(A)?{error:d.get(A)}:{}}}),v=c?i.length>0&&s.length===0&&(g===i.length||r===i.length&&g>0):!0,y=!1,E=!1,w="Nenhuma a\xE7\xE3o de navega\xE7\xE3o solicitada.",q=c?g>0&&g>=Math.ceil(i.length/2):r>0&&r>=i.length/2,C=c?g>0&&(v||q):v||i.length===0||q;if(e&&C){await new Promise(O=>setTimeout(O,i.length>0?120:40));let A=!1,P=null;if(o.pageType!=="info"){let O=hn();if(O&&j(O)){await Kt(O,1200),se(O),A=!0,P=O,await new Promise(H=>setTimeout(H,350));let T=document.querySelector('.feedback-message.error, [class*="feedback"][class*="error" i], [role="alert"][class*="error" i]');T&&j(T)&&(T.textContent||"").trim().length>0?(y=!1,E=!1,w=`Aviso do formul\xE1rio ap\xF3s checagem: ${T.textContent?.trim().slice(0,100)}`):(y=!0,E=!0,w="Resposta confirmada via bot\xE3o de verifica\xE7\xE3o/envio.")}}if(!A){let O=mn(),T=a.length>0&&"id"in a[0]?a[0].id:void 0,x=At(T);if(x){await Kt(x,1500);let H=T||x.textContent?.trim()||"";H&&Pt(window.location.hostname,{advanceSelector:H}),se(x);let B=await gn(O,1800);E=B.changed,w=B.evidence,y=B.changed||!0,B.changed||console.warn("[EasyQuiz] O bot\xE3o de avan\xE7o foi acionado, mas a navega\xE7\xE3o ainda n\xE3o concluiu.")}else console.warn("[EasyQuiz] Nenhum bot\xE3o de avan\xE7o encontrado na p\xE1gina.")}}return{applied:r,verified:g,success:v,advanced:y,failed:s,reports:b,navigationVerified:E,navigationEvidence:w,failedActions:f}}var ve=null,De=[],Wt=[],et=[],Jt=[],ye=null,fe=null,qo=40,fn=`
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
`;function ko(){try{if(typeof document>"u"||!document.head)return;if(!document.getElementById("eq-image-pulse-style")){let o=document.createElement("style");o.id="eq-image-pulse-style",o.textContent=fn,document.head.appendChild(o)}}catch{}}function Le(){ve&&(ve.style.removeProperty("outline"),ve.style.removeProperty("outline-offset"),ve.style.removeProperty("position"),ve=null);for(let o of De)o.style.removeProperty("outline"),o.style.removeProperty("outline-offset"),o.style.removeProperty("background-color"),o.style.removeProperty("box-shadow"),o.removeAttribute("data-easyquiz-highlight");De=[];for(let o of Wt)o.style.removeProperty("animation"),o.style.removeProperty("outline"),o.style.removeProperty("outline-offset"),o.style.removeProperty("box-shadow"),o.style.removeProperty("filter"),o.removeAttribute("data-easyquiz-image-highlight");Wt=[];for(let o of et)try{o.remove()}catch{}et=[],fe&&typeof window<"u"&&(window.removeEventListener("scroll",fe),window.removeEventListener("resize",fe),fe=null);for(let o of Jt)try{o.remove()}catch{}if(Jt=[],ye){try{ye.remove()}catch{}ye=null}try{document.querySelectorAll("[data-easyquiz-image-frame]").forEach(o=>{try{o.remove()}catch{}}),document.querySelectorAll("[data-easyquiz-capture-badge]").forEach(o=>{try{o.remove()}catch{}}),document.querySelectorAll("[data-easyquiz-image-highlight]").forEach(o=>{try{let e=o;e.style.removeProperty("animation"),e.style.removeProperty("outline"),e.style.removeProperty("outline-offset"),e.style.removeProperty("box-shadow"),e.style.removeProperty("filter"),e.removeAttribute("data-easyquiz-image-highlight")}catch{}})}catch{}}function Yt(o){ko();let e=[];for(let t of o){if(!t||typeof t.setAttribute!="function")continue;let n=t;try{let i=t.getBoundingClientRect(),a=i.width||n.offsetWidth||0,r=i.height||n.offsetHeight||0;if(a>=qo&&r>=qo){try{n.style&&(n.style.outline="3px solid #ffd600",n.style.outlineOffset="4px",n.style.animation="eq-image-pulse-yellow-white 1.2s ease-in-out infinite",n.style.boxShadow="0 0 16px rgba(255, 214, 0, 0.7)",n.style.filter="drop-shadow(0 0 8px rgba(255, 214, 0, 0.8))"),n.setAttribute("data-easyquiz-image-highlight","true"),Wt.push(n)}catch{}let s=document.createElement("div");s.setAttribute("data-easyquiz-image-frame","true"),s.style.cssText=`
          position: absolute;
          top: ${i.top+window.scrollY-3}px;
          left: ${i.left+window.scrollX-3}px;
          width: ${a+6}px;
          height: ${r+6}px;
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
        `,s.appendChild(d),document.body.appendChild(s),et.push(s),Jt.push(d),e.push({element:t,frame:s})}}catch{}}e.length>0&&!fe&&typeof window<"u"&&(fe=()=>{for(let t=e.length-1;t>=0;t--){let n=e[t];try{if(!document.contains(n.element)){try{n.frame.remove()}catch{}let a=et.indexOf(n.frame);a!==-1&&et.splice(a,1),e.splice(t,1);continue}let i=n.element.getBoundingClientRect();i.width>0&&i.height>0?(n.frame.style.top=`${i.top+window.scrollY-3}px`,n.frame.style.left=`${i.left+window.scrollX-3}px`,n.frame.style.width=`${i.width+6}px`,n.frame.style.height=`${i.height+6}px`):n.frame.style.display="none"}catch{}}e.length===0&&fe&&(window.removeEventListener("scroll",fe),window.removeEventListener("resize",fe),fe=null)},window.addEventListener("scroll",fe,{passive:!0}),window.addEventListener("resize",fe,{passive:!0}))}function tt(o){ve&&ve!==o&&(ve.style.removeProperty("outline"),ve.style.removeProperty("outline-offset")),ko(),ve=o,o.style.outline="2px solid #00e5ff",o.style.outlineOffset="4px";try{if(ye){try{ye.remove()}catch{}ye=null}window.getComputedStyle(o).position==="static"&&(o.style.position="relative");let t=document.createElement("div");t.style.cssText=`
      position: absolute; left: 0; right: 0; top: 0; height: 3px;
      background: linear-gradient(90deg, transparent, #00e5ff, #00ff88, #00e5ff, transparent);
      z-index: 99998; pointer-events: none; border-radius: 2px;
      animation: eq-scope-scan-loop 1.4s ease-in-out infinite;
      box-shadow: 0 0 14px rgba(0, 229, 255, 0.85), 0 0 6px #00ff88;
    `,o.appendChild(t),ye=t}catch{}}function bn(o){return!o||o>=.9?{outline:"#00ff88",bg:"rgba(0, 255, 136, 0.12)",glow:"rgba(0, 255, 136, 0.8)"}:o>=.7?{outline:"#00bfff",bg:"rgba(0, 191, 255, 0.10)",glow:"rgba(0, 191, 255, 0.7)"}:{outline:"#ffaa00",bg:"rgba(255, 170, 0, 0.10)",glow:"rgba(255, 170, 0, 0.7)"}}function To(o,e){if(ye){try{ye.remove()}catch{}ye=null}let t=bn(e);for(let n of o){if(n.t==="adv"||n.t==="js")continue;if(n.t==="drag"){try{let m=Q(n.from),p=Q(n.to);m&&(m.style.outline=`2px solid ${t.outline}`,De.push(m)),p&&(p.style.outline="2px dashed #00e5ff",De.push(p))}catch{}continue}let i=n.v!==void 0?Array.isArray(n.v)?n.v[0]:String(n.v):"",a=String(n.name??n.n??"").trim(),r=null;if(a){let m=Array.from(document.querySelectorAll(`input[name="${te(a)}"]`));if(i&&(r=m.find(p=>p.value?.toLowerCase()===i.toLowerCase())??null,!r)){let p=/^(v|verdadeiro|true|1|t|sim|correto)$/i.test(i),g=/^(f|falso|false|0|nao|não|incorreto|errado)$/i.test(i);if(p||g){let f=p?["v","verdadeiro","true","1","t","sim","correto"]:["f","falso","false","0","nao","n\xE3o","incorreto","errado"];r=m.find(b=>{let v=b.value?.toLowerCase()??"";if(f.includes(v))return!0;let E=(b.closest('label, .vf-label, td, [class*="option" i]')?.textContent??"").trim().toLowerCase();return f.some(w=>E===w||E.startsWith(w+" ")||E.startsWith("("+w+")"))})??null}}!r&&m.length>0&&(r=m[0])}if(!r&&n.id&&(r=Q(n.id,i,n.t==="val"||n.t==="sel")||Q(I(n.id),i,n.t==="val"||n.t==="sel")),!r&&n.t==="sel"){let m=document.body;try{m=le()||document.body}catch{}let p=Array.from(m.querySelectorAll('select, [role="combobox"], [role="listbox"]')).filter(b=>j(b)&&!pe(b)),g=I(n.id).toLowerCase();r=p.find(b=>{let v=(b.id||"").toLowerCase(),y=(b.getAttribute("name")||"").toLowerCase(),E=(b.getAttribute("aria-label")||"").toLowerCase(),w=I(b.closest('.dropdown-row, [class*="dropdown" i], [class*="select" i], tr, label, div')?.textContent||"").toLowerCase();return v.includes(g)||y.includes(g)||E.includes(g)||g.length>=2&&w.includes(g)})||(p.length===1?p[0]:null)}if(!r)continue;let s=typeof HTMLSelectElement<"u"&&r instanceof HTMLSelectElement||r.tagName?.toLowerCase()==="select"||r.getAttribute("role")==="combobox"||r.getAttribute("role")==="listbox",d=r.closest('label, .vf-label, .option-card, [role="radio"], [role="checkbox"], [role="option"], [role="listitem"], .answer, .quiz-option, .form-check, [class*="option" i], [class*="choice" i]'),l=s?r.parentElement?.closest('.dropdown-row, [class*="dropdown" i], [class*="select-row" i], .form-group, tr, li'):null,u=d||l||r;u.style.outline=`2px solid ${t.outline}`,u.style.outlineOffset="2px",u.style.backgroundColor=t.bg,u.setAttribute("data-easyquiz-highlight","true"),De.push(u);let h=s?r:u.querySelector('select, [role="combobox"], [role="listbox"]');h&&(h.style.outline=`2px solid ${t.outline}`,h.style.outlineOffset="2px",h.style.boxShadow=`0 0 10px ${t.glow}`,h.setAttribute("data-easyquiz-highlight","true"),De.push(h));let c=r instanceof HTMLInputElement&&["checkbox","radio"].includes(r.type)?r:u.querySelector('input[type="checkbox"], input[type="radio"]');c&&c!==u&&(c.style.outline=`2px solid ${t.outline}`,c.style.outlineOffset="2px",c.style.boxShadow=`0 0 10px ${t.glow}`,c.setAttribute("data-easyquiz-highlight","true"),De.push(c))}}var wt=10,vn=1400,ot=15e5;function Ae(o){return new Promise((e,t)=>{let n=new FileReader;n.onerror=()=>t(new Error("Falha ao converter blob para base64.")),n.onload=()=>{let i=String(n.result||"");e(i.split(",")[1]||"")},n.readAsDataURL(o)})}function So(o){try{let e=o.getContext("2d");if(!e)return!0;let t=o.width,n=o.height;if(t<=0||n<=0)return!0;let i=Math.min(40,Math.floor(t/3),Math.floor(n/3));if(i<=0)return!0;let a=[[0,0],[Math.floor(t/2)-Math.floor(i/2),Math.floor(n/2)-Math.floor(i/2)],[Math.floor(t/3),Math.floor(n*2/3)]],r=0,s=0,d=-1,l=-1,u=-1;for(let[h,c]of a){let m=Math.max(0,Math.min(h,t-i)),p=Math.max(0,Math.min(c,n-i)),g=e.getImageData(m,p,i,i).data;for(let f=0;f<g.length;f+=4){r++;let b=g[f],v=g[f+1],y=g[f+2];if(g[f+3]===0){s++;continue}d===-1&&(d=b,l=v,u=y),Math.abs(b-d)<8&&Math.abs(v-l)<8&&Math.abs(y-u)<8&&s++}}return r>0&&s/r>.97}catch{return!1}}function Lo(o){try{let e=o.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);if(e){let[t,n,i]=[parseInt(e[1]),parseInt(e[2]),parseInt(e[3])];if((.299*t+.587*n+.114*i)/255<.15)return"#ffffff"}if(o==="transparent"||o==="rgba(0, 0, 0, 0)")return"#ffffff"}catch{}return o}async function Me(o){let e=0,t=0;if(o instanceof HTMLImageElement?(e=o.naturalWidth||o.width,t=o.naturalHeight||o.height):(e=o.width,t=o.height),e<=0||t<=0)throw new Error("Dimens\xF5es inv\xE1lidas.");let n=Math.min(1,vn/Math.max(e,t)),i=Math.max(1,Math.round(e*n)),a=Math.max(1,Math.round(t*n)),r=document.createElement("canvas");r.width=i,r.height=a;let s=r.getContext("2d",{alpha:!1});if(!s)throw new Error("Sem suporte a Canvas 2D.");return s.fillStyle="#ffffff",s.fillRect(0,0,i,a),s.drawImage(o,0,0,i,a),new Promise((d,l)=>{r.toBlob(u=>u?d(u):l(new Error("Falha na compress\xE3o.")),"image/jpeg",.88)})}async function Mo(o){let e=typeof o.getBoundingClientRect=="function"?o.getBoundingClientRect():{width:0,height:0},t=e.width||parseFloat(o.getAttribute("width")||"0")||parseFloat(o.style.width||"0")||400,n=e.height||parseFloat(o.getAttribute("height")||"0")||parseFloat(o.style.height||"0")||300,i=2,a=Math.min(1800,Math.max(120,Math.round(t*i))),r=Math.min(1800,Math.max(100,Math.round(n*i))),s=o.cloneNode(!0);s.getAttribute("xmlns")||s.setAttribute("xmlns","http://www.w3.org/2000/svg"),s.getAttribute("xmlns:xlink")||s.setAttribute("xmlns:xlink","http://www.w3.org/1999/xlink"),s.setAttribute("width",String(a)),s.setAttribute("height",String(r)),!s.getAttribute("viewBox")&&t>0&&n>0&&s.setAttribute("viewBox",`0 0 ${t} ${n}`);try{let c=[o,...Array.from(o.querySelectorAll("*"))],m=[s,...Array.from(s.querySelectorAll("*"))];for(let p=0;p<Math.min(c.length,m.length);p++){let g=c[p],f=m[p];if(!g||!f||!f.style)continue;let b=window.getComputedStyle?window.getComputedStyle(g):null;b&&["fill","stroke","stroke-width","stroke-dasharray","stroke-linecap","stroke-linejoin","opacity","font-family","font-size","font-weight","color","transform","display","visibility"].forEach(y=>{let E=b.getPropertyValue(y);E&&E!=="none"&&E!=="normal"&&E!=="auto"&&f.style.setProperty(y,E,"important")})}}catch{}let d="#ffffff";try{let c=o.parentElement||o;for(;c&&c!==document.documentElement;){let p=(window.getComputedStyle?window.getComputedStyle(c):null)?.backgroundColor;if(p&&p!=="transparent"&&p!=="rgba(0, 0, 0, 0)"){d=p;break}c=c.parentElement}}catch{}d=Lo(d),s.getAttribute("xmlns")||s.setAttribute("xmlns","http://www.w3.org/2000/svg");let u=new XMLSerializer().serializeToString(s),h="";try{h=btoa(unescape(encodeURIComponent(u)))}catch{}try{let c=f=>new Promise((b,v)=>{let y=new Image,E=setTimeout(()=>v(new Error("Timeout render SVG")),1200);y.onload=()=>{clearTimeout(E),b(y)},y.onerror=()=>{clearTimeout(E),v(new Error("Falha ao renderizar SVG em Image."))},y.src=f}),m=null;if(h)try{m=await c(`data:image/svg+xml;base64,${h}`)}catch{}if(!m){let f=new Blob([u],{type:"image/svg+xml;charset=utf-8"}),b=URL.createObjectURL(f);try{m=await c(b)}finally{URL.revokeObjectURL(b)}}let p=document.createElement("canvas");p.width=a,p.height=r;let g=p.getContext("2d",{alpha:!1});if(g&&m){if(g.fillStyle="#ffffff",g.fillRect(0,0,a,r),g.drawImage(m,0,0,a,r),So(p))return{base64:h,mediaType:"image/svg+xml"};let f=await new Promise(b=>{p.toBlob(b,"image/jpeg",.92)});if(f){let b=await Ae(f);if(b)return{blob:f,base64:b,mediaType:"image/jpeg"}}}}catch{}return{base64:h,mediaType:"image/svg+xml"}}async function Et(o){try{let e=o.getBoundingClientRect(),t=Math.round(e.width)||o.offsetWidth||400,n=Math.round(e.height)||o.offsetHeight||300;if(t<30||n<30)return null;let i=o.tagName.toLowerCase()==="svg"?o:o.querySelector("svg");if(i&&o.querySelectorAll("input, select, textarea").length===0)try{let g=await Mo(i);if(g.base64&&g.base64.length<=ot)return{mediaType:g.mediaType,base64:g.base64,alt:o.getAttribute("aria-label")||i.getAttribute("aria-label")||"Captura de diagrama/gr\xE1fico",source:"visual_snapshot",captureStatus:"captured",textContext:xe(i)}}catch{}if(o instanceof HTMLCanvasElement)try{let g=await Me(o),f=await Ae(g);if(f)return{mediaType:"image/jpeg",base64:f,alt:o.getAttribute("aria-label")||"Captura de canvas visual",source:"canvas_snapshot",captureStatus:"captured"}}catch{}let a="#ffffff";try{let g=o;for(;g&&g!==document.documentElement;){let b=(window.getComputedStyle?window.getComputedStyle(g):null)?.backgroundColor;if(b&&b!=="transparent"&&b!=="rgba(0, 0, 0, 0)"){a=b;break}g=g.parentElement}}catch{}a=Lo(a);let r=o.cloneNode(!0),s=Array.from(o.querySelectorAll("*")),d=Array.from(r.querySelectorAll("*"));for(let g=0;g<Math.min(s.length,d.length);g++){let f=s[g],b=d[g];if(!(!f||!b||!b.style))try{let v=window.getComputedStyle(f);b.style.color=v.color,b.style.backgroundColor=v.backgroundColor,b.style.borderColor=v.borderColor,b.style.borderWidth=v.borderWidth,b.style.borderStyle=v.borderStyle,b.style.fontSize=v.fontSize,b.style.fontFamily=v.fontFamily,b.style.fontWeight=v.fontWeight,b.style.lineHeight=v.lineHeight,b.style.letterSpacing=v.letterSpacing,b.style.textAlign=v.textAlign}catch{}}let l=Math.min(2,Math.max(1,1200/Math.max(t,n))),u=Math.round(t*l),h=Math.round(n*l),c=`
      <svg xmlns="http://www.w3.org/2000/svg" width="${u}" height="${h}" viewBox="0 0 ${t} ${n}">
        <foreignObject width="${t}" height="${n}">
          <div xmlns="http://www.w3.org/1999/xhtml" style="background:${a};width:100%;height:100%;overflow:hidden;box-sizing:border-box;">
            ${r.outerHTML}
          </div>
        </foreignObject>
      </svg>
    `,m=new Blob([c],{type:"image/svg+xml;charset=utf-8"}),p=URL.createObjectURL(m);try{let g=new Image;await new Promise((v,y)=>{let E=setTimeout(()=>y(new Error("Timeout render ForeignObject")),2500);g.onload=()=>{clearTimeout(E),v()},g.onerror=()=>{clearTimeout(E),y(new Error("Falha ao carregar ForeignObject"))},g.src=p});let f=document.createElement("canvas");f.width=u,f.height=h;let b=f.getContext("2d",{alpha:!1});if(b){if(b.fillStyle=a,b.fillRect(0,0,u,h),b.drawImage(g,0,0,u,h),So(f))throw new Error("ForeignObject gerou canvas em branco");let v=await new Promise(y=>f.toBlob(y,"image/jpeg",.9));if(v){let y=await Ae(v);if(y&&y.length<=ot)return{mediaType:"image/jpeg",base64:y,alt:o.getAttribute("aria-label")||"Captura visual da \xE1rea (print-like)",source:"element_snapshot",captureStatus:"captured",textContext:xe(o)}}}}finally{URL.revokeObjectURL(p)}}catch(e){console.warn("[EasyQuiz] Snapshot visual do n\xF3:",e)}return null}function Ct(o,e,t,n){if(t<=0||n<=0){let m=typeof o.getBoundingClientRect=="function"?o.getBoundingClientRect():{width:0,height:0};if(t=m.width||t,n=m.height||n,t<=0||n<=0){if(e&&/\b(icon|logo|avatar|badge|emoji|spinner|loading)\b/i.test(e))return!1;let g=o instanceof HTMLImageElement&&o.src||"";return g&&/\/icons?\/|\/logos?\/|\/avatars?\/|\/badges?\//i.test(g)?!1:!!(g||e)}}if(t<48||n<48||Math.max(t,n)/Math.max(1,Math.min(t,n))>15)return!1;let a=o.getAttribute("class")||"",r=o.getAttribute("aria-hidden"),s=o.getAttribute("role"),d=o instanceof HTMLImageElement&&o.src||"",l=!!o.closest('.perseus-renderer, .framework-perseus, [data-test-id*="exercise" i], [data-testid*="exercise" i], .perseus-widget-container, [class*="problem" i], [class*="exercise" i], [data-question], [class*="question-content" i], [class*="stimulus" i], [class*="enunciado" i], [class*="statement" i], figure, .problem, .exercise');if(l&&t>=60&&n>=60)return!0;if(r==="true"&&!l||(s==="presentation"||s==="none")&&!l)return!1;let u=/\b(icon|logo|avatar|badge|emoji|decoration|ornament|spinner|loading|thumbnail|profile|photo)\b/i;if(u.test(a)||e&&u.test(e)||d&&/\/icons?\/|\/logos?\/|\/avatars?\/|\/badges?\/|\/emojis?\//i.test(d)||(e===""||e===" "||e==="-")&&!l)return!1;let h=/\b(graph|chart|diagram|table|map|formula|equation|figure|plot|curve|histogram|scatter|matrix|image|foto|imagem|gráfico|tabela|mapa|fórmula|questão|enunciado|stimulus)\b/i;if(h.test(e)||h.test(a)||o.closest('[data-question], [class*="question" i], [class*="prompt" i], [class*="stimulus" i], [class*="enunciado" i], [class*="statement" i], article, .problem, .exercise'))return!0;try{let m=o.parentElement;if(m){let p=(m.textContent||"").toLowerCase();if(/\?|calcul|determin|observ|analis|image|figur|gráfic|diagram/i.test(p)&&t>=60&&n>=60)return!0}}catch{}return t>=80&&n>=80}function xe(o){let e=[],t=o.getAttribute("alt")||o.getAttribute("aria-label")||o.getAttribute("title")||"";t&&t.length>2&&e.push(`Alt: "${t}"`);let a=o.closest("figure")?.querySelector("figcaption")?.textContent?.trim();a&&a.length>2&&e.push(`Legenda: "${a}"`);let r=o.getAttribute("aria-describedby");if(r){let u=document.getElementById(r)?.textContent?.trim();u&&e.push(`Descri\xE7\xE3o: "${u.slice(0,200)}"`)}let s=o.parentElement;if(s){let l=$(s.textContent||"",300);l&&l.length>5&&l!==t&&e.push(`Contexto: "${l.slice(0,200)}"`)}if(o.tagName.toLowerCase()==="svg"){let l=Array.from(o.querySelectorAll("text, tspan")).map(u=>u.textContent?.trim()).filter(Boolean);l.length>0&&e.push(`R\xF3tulos/Textos do Gr\xE1fico: "${l.join(" | ")}"`)}let d=o.getAttribute("data-alt")||o.getAttribute("data-description")||"";return d&&e.push(`Data: "${d}"`),e.length===0?"":e.join(" | ")}async function yn(o){let e=o.currentSrc||o.src;if(!e)return null;let t=(o.alt||o.getAttribute("aria-label")||"Imagem da quest\xE3o").slice(0,500),n=o.getBoundingClientRect(),i=o.naturalWidth||n.width||o.width||0,a=o.naturalHeight||n.height||o.height||0,r=Ct(o,t,i,a);if(o.complete&&o.naturalWidth>0)try{let u=await Me(o),h=await Ae(u);if(h&&h.length<=ot)return{mediaType:"image/jpeg",base64:h,alt:t,source:e.slice(0,2e3),captureStatus:"captured",textContext:xe(o)}}catch{}try{let u=await fetch(e,{mode:"cors"});if(u.ok){let h=await u.blob();if(h.type.startsWith("image/")){let c=await createImageBitmap(h),m=await Me(c);c.close();let p=await Ae(m);if(p&&p.length<=ot)return{mediaType:"image/jpeg",base64:p,alt:t,source:e.slice(0,2e3),captureStatus:"captured",textContext:xe(o)}}}}catch{}if(e.startsWith("http")){let u=encodeURIComponent(e),h=[`https://corsproxy.io/?${u}`,`https://api.allorigins.win/raw?url=${u}`,`https://api.codetabs.com/v1/proxy?quest=${u}`],c=async m=>{let p=new AbortController,g=setTimeout(()=>p.abort(),800);try{let f=await fetch(m,{signal:p.signal});if(clearTimeout(g),f.ok)return f;throw new Error("Proxy status "+f.status)}catch(f){throw clearTimeout(g),f}};try{let p=await(await Promise.any(h.map(c))).blob();if(p.type.startsWith("image/")||p.size>200){let g=await createImageBitmap(p),f=await Me(g);g.close();let b=await Ae(f);if(b&&b.length<=ot)return{mediaType:"image/jpeg",base64:b,alt:t,source:e.slice(0,2e3),captureStatus:"captured",textContext:xe(o)}}}catch{}}let s=o.parentElement||o,d=await Et(s);if(d)return d;let l=xe(o);return l||t?{mediaType:"image/jpeg",base64:"",alt:t,source:e.slice(0,2e3),captureStatus:r?"failed_relevant":"text_only",textContext:l||`Imagem da quest\xE3o (src: ${e.slice(0,100)})`}:r&&e?{mediaType:"image/jpeg",base64:"",alt:t||"Imagem relevante n\xE3o capturada",source:e.slice(0,2e3),captureStatus:"failed_relevant",textContext:`IMAGEM RELEVANTE N\xC3O CAPTURADA. Src: ${e.slice(0,200)}. ${xe(o)}`}:null}function xn(o){return o.querySelectorAll("path, line, polyline, polygon, circle, rect, text, image").length>0}function An(o){try{let e=o.style.backgroundImage||(window.getComputedStyle?window.getComputedStyle(o).backgroundImage:"");if(e&&e.includes("url(")){let t=e.match(/url\(["']?([^"')]+)["']?\)/);if(t&&t[1]&&!t[1].startsWith("data:image/svg+xml"))return t[1]}}catch{}return null}function wn(o,e){let t=o.closest('[data-easyquiz-id], button, [role="button"], [role="radio"], [role="checkbox"], [role="option"], label, .option-card, .quiz-option, .choice, .answer, [class*="option" i], [class*="choice" i], [class*="answer" i], li, tr');if(t&&t!==e&&j(t)&&!re(t)&&!_(t)){let a=t.dataset.easyquizId||t.id||void 0,r=$(t.innerText||t.textContent||"",120),s=t.getAttribute("aria-label")||t.getAttribute("title")||"",d="";try{let h=Array.from(e.querySelectorAll('[data-easyquiz-id], [role="radio"], [role="checkbox"], [role="option"], .option-card, .quiz-option, .choice, .answer, [class*="option" i], [class*="choice" i]')).filter(m=>j(m)&&!re(m)),c=h.indexOf(t);c>=0&&(d=` (op\xE7\xE3o ${c+1} de ${h.length})`)}catch{}let l=r||s,u=a?` [id: ${a}]`:"";if(l)return{associatedLabel:`Alternativa/Op\xE7\xE3o: "${l}"${u}${d}`,targetControlId:a};if(a)return{associatedLabel:`Alternativa/Op\xE7\xE3o${u}${d}`,targetControlId:a};if(d)return{associatedLabel:`Imagem da Alternativa${d}`,targetControlId:a}}let n=o.closest("figure")?.querySelector("figcaption")?.textContent?.trim();if(n)return{associatedLabel:`Figura do Enunciado: "${$(n,100)}"`};let i=o.closest('[class*="prompt" i], [class*="stimulus" i], [class*="question-text" i], [class*="statement" i], header, h1, h2, h3, h4, p');if(i){let a=$(i.textContent||"",80);if(a)return{associatedLabel:`Gr\xE1fico do Enunciado: "${a}"`}}try{let a=Array.from(e.querySelectorAll('img, svg, canvas, [style*="background-image"]')).filter(r=>j(r));if(a.length>1){let r=a.indexOf(o);if(r>=0)return{associatedLabel:`Imagem ${r+1} de ${a.length} do Enunciado`}}}catch{}return{associatedLabel:"Gr\xE1fico/Imagem do Enunciado Principal"}}async function $t(o,e=!0){if(!e)return[];let t=[],n=0,i=35e5,a=(l,u)=>{if(!l)return!1;let h=l.base64?l.base64.length:0;if(h>0&&n+h>i)return!1;let c=wn(u,o);return l.associatedLabel=c.associatedLabel,l.targetControlId=c.targetControlId,l.element=u,t.push(l),n+=h,t.filter(p=>p.captureStatus==="captured").length>=wt},r=[o],s=new Set;for(let l of r){let u=Array.from(l.querySelectorAll("img")).filter(h=>j(h)&&!_(h)&&!s.has(h)&&!h.closest('footer, nav, aside, [class*="sidebar" i], [class*="lesson" i]'));for(let h of u){s.add(h);try{let c=h.getBoundingClientRect(),m=h.naturalWidth||c.width||h.width||0,p=h.naturalHeight||c.height||h.height||0,g=h.alt||"";if(!Ct(h,g,m,p))continue;let f=await yn(h);if(a(f,h))return t}catch{}}}let d=new Set;for(let l of r){let u=Array.from(l.querySelectorAll("svg")).filter(h=>{if(h.closest(".katex")||h.classList.contains("katex-mathml")||h.closest('footer, nav, aside, [class*="sidebar" i], [class*="lesson" i]')||!j(h)||_(h)||d.has(h))return!1;let c=typeof h.getBoundingClientRect=="function"?h.getBoundingClientRect():{width:0,height:0},m=c.width||parseFloat(h.getAttribute("width")||"0"),p=c.height||parseFloat(h.getAttribute("height")||"0");return m<30||p<30?!1:xn(h)});for(let h of u){d.add(h);try{let c=await Mo(h);if(c.base64){let m=xe(h),p={mediaType:c.mediaType,base64:c.base64,alt:h.getAttribute("aria-label")||"Gr\xE1fico/Diagrama vetorial da quest\xE3o",source:"svg",captureStatus:"captured",textContext:m};if(a(p,h))return t}}catch{let c=h.closest('.trig-diagram-container, [class*="diagram" i], [class*="graph" i], figure')||h.parentElement||h,m=await Et(c);if(m){if(a(m,h))return t}else{let p=xe(h);if(p){let g={mediaType:"image/jpeg",base64:"",alt:h.getAttribute("aria-label")||"Gr\xE1fico vetorial",source:"svg",captureStatus:"text_only",textContext:p};a(g,h)}}}}}if(t.filter(l=>l.captureStatus==="captured").length<wt){let l=Array.from(o.querySelectorAll("canvas")).filter(u=>j(u)&&!_(u));for(let u of l)try{let h=await Me(u),c=await Ae(h);if(c){let m={mediaType:"image/jpeg",base64:c,alt:u.getAttribute("aria-label")||"Gr\xE1fico Canvas inline",source:"canvas",captureStatus:"captured"};if(a(m,u))return t}}catch{let h=await Et(u.parentElement||u);if(a(h,u))return t}}if(t.filter(l=>l.captureStatus==="captured").length<wt){let l=Array.from(o.querySelectorAll('[style*="background-image"], .option-image, .question-media')).filter(u=>j(u)&&!_(u));for(let u of l){let h=An(u);if(!h)continue;let c=u.getBoundingClientRect();if(Ct(u,u.getAttribute("aria-label")||"",c.width,c.height))try{let m=await fetch(h,{mode:"cors"});if(m.ok){let p=await m.blob();if(p.type.startsWith("image/")){let g=await createImageBitmap(p),f=await Me(g);g.close();let b=await Ae(f);if(b){let v={mediaType:"image/jpeg",base64:b,alt:"Imagem de fundo da alternativa",source:h.slice(0,2e3),captureStatus:"captured"};if(a(v,u))return t}}}}catch{try{let p=await(await fetch(h,{mode:"no-cors"})).blob();if(p.size>100){let g=await createImageBitmap(p),f=await Me(g);g.close();let b=await Ae(f);if(b&&b.length>100){let v={mediaType:"image/jpeg",base64:b,alt:"Imagem CSS background",source:h.slice(0,2e3),captureStatus:"captured"};if(a(v,u))return t}}}catch{}}}}if(t.filter(l=>l.captureStatus==="captured").length<wt){let l=new Set;for(let u of r){let h=Array.from(u.querySelectorAll('div, span, section, figure, [class*="image" i], [class*="media" i], [class*="visual" i], [class*="graph" i], [class*="diagram" i], [class*="figure" i]')).filter(c=>{if(l.has(c)||!j(c)||_(c))return!1;let m=c.getBoundingClientRect();return m.width>=80&&m.height>=60});for(let c of h){l.add(c);try{let m=window.getComputedStyle?window.getComputedStyle(c).backgroundImage:"";if(!m||m==="none"||!m.includes("url(")||c.style.backgroundImage&&c.style.backgroundImage.includes("url("))continue;let p=m.match(/url\(["']?([^"')]+)["']?\)/);if(!p||!p[1]||p[1].startsWith("data:image/svg+xml"))continue;let g=p[1],f=c.getBoundingClientRect();if(!Ct(c,c.getAttribute("aria-label")||"",f.width,f.height))continue;try{let b=await fetch(g,{mode:"cors"});if(b.ok){let v=await b.blob();if(v.type.startsWith("image/")||v.size>200){let y=await createImageBitmap(v),E=await Me(y);y.close();let w=await Ae(E);if(w){let q={mediaType:"image/jpeg",base64:w,alt:c.getAttribute("aria-label")||"Imagem CSS computada da quest\xE3o",source:g.slice(0,2e3),captureStatus:"captured",textContext:xe(c)};if(a(q,c))return t}}}}catch{let b=await Et(c);if(b&&a(b,c))return t}}catch{}}}}return t}function En(o,e=""){if(typeof document>"u")return!1;let t=o||document.body,n=(e+" "+(t.textContent||"")).toLowerCase();return!!t.querySelector('.celebration-icon, [class*="celebrat" i], [class*="conclu" i], [class*="finish" i], [class*="result" i], [class*="score-screen" i], [data-testid*="completion" i], [data-functional-selector*="game-over" i], .perseus-message-renderer, [data-congratulations]')&&(n.includes("parab\xE9ns")||n.includes("conclu")||n.includes("finaliz")||n.includes("resultado")||n.includes("pontua")||n.includes("sucesso")||n.includes("\u{1F3C6}")||n.includes("game over")||n.includes("great job"))?!0:["parab\xE9ns! lista de exerc\xEDcios conclu\xEDda","exerc\xEDcios conclu\xEDda","lista de exerc\xEDcios conclu\xEDda","atividade conclu\xEDda","atividade finalizada","finalizado com sucesso","finalizada com sucesso","simulado conclu\xEDdo","simulado finalizado","question\xE1rio conclu\xEDdo","question\xE1rio finalizado","voc\xEA concluiu a atividade","voc\xEA concluiu o question\xE1rio","sua resposta foi registrada","todas as perguntas foram respondidas","quiz completed","exercise completed","activity completed","all questions answered","view results","game over","leaderboard","scoreboard","awesome","great job","you got it right","mission complete","your response has been recorded","sua resposta foi registrada"].some(r=>n.includes(r))}var qt=class{active=!1;callbacks;isProcessing=!1;observer=null;mutationTimer=null;heartbeatTimer=null;abortController=null;errorCount=0;resolvedSigs=new Set;advancedSigs=new Set;hasPendingMutationDuringProcessing=!1;lastContentSig="";lastAttemptSig="";lastAttemptTime=0;replanCount=new Map;questionPhase="unanswered";answerSubmittedAt=0;analysisStallTimer=null;stallCount=0;constructor(e){this.callbacks=e}isActive(){return this.active}start(){this.active||(this.active=!0,this.advancedSigs.clear(),this.hasPendingMutationDuringProcessing=!1,this.callbacks.onStatusChange("waiting","> [SYS] Autopilot ENGAGED. Monitorando..."),typeof MutationObserver<"u"&&(this.observer=new MutationObserver(()=>{if(this.active){if(this.isProcessing){this.hasPendingMutationDuringProcessing=!0;return}this.mutationTimer&&clearTimeout(this.mutationTimer),this.mutationTimer=window.setTimeout(()=>{this.mutationTimer=null,this.isProcessing||this.checkAndAnalyze()},120)}}),this.observer.observe(document.body,{subtree:!0,childList:!0,characterData:!0,attributes:!0})),this.scheduleHeartbeat(),this.checkAndAnalyze())}stop(){if(this.active=!1,this.analysisStallTimer&&(clearTimeout(this.analysisStallTimer),this.analysisStallTimer=null),this.abortController){try{this.abortController.abort()}catch{}this.abortController=null}this.mutationTimer&&(clearTimeout(this.mutationTimer),this.mutationTimer=null),this.heartbeatTimer&&(clearTimeout(this.heartbeatTimer),this.heartbeatTimer=null),this.observer?.disconnect(),this.observer=null,this.isProcessing=!1,this.resolvedSigs.clear(),this.advancedSigs.clear(),this.hasPendingMutationDuringProcessing=!1,this.replanCount.clear(),this.questionPhase="unanswered",this.answerSubmittedAt=0,this.stallCount=0,this.callbacks.onStatusChange("idle","> [SYS] Autopilot DESATIVADO pelo usu\xE1rio.","text-yellow")}scheduleHeartbeat(){this.heartbeatTimer&&clearTimeout(this.heartbeatTimer),this.heartbeatTimer=window.setTimeout(()=>{this.heartbeatTimer=null,this.active&&!this.isProcessing&&this.checkAndAnalyze(),this.active&&this.scheduleHeartbeat()},3e3)}sleep(e){return new Promise(t=>{if(!this.active)return t();let n=null,i=()=>{n&&clearTimeout(n),t()};n=window.setTimeout(t,e),this.abortController?.signal.addEventListener("abort",i,{once:!0})})}async checkAndAnalyze(){if(!(!this.active||this.isProcessing))try{this.isProcessing=!0;let e=Te(!1);if(e||(e=qe()),!this.active)return;if(!e){this.callbacks.onStatusChange("waiting","> [SYS] Monitorando p\xE1gina... Aguardando elementos.");return}if(En(e.scope,e.questionText)){this.callbacks.onStatusChange("idle","> [SYS] \u{1F3C6} Atividade conclu\xEDda! Autopilot finalizado.","text-green"),this.stop();return}if(this.callbacks.isManualModeActive?.()){this.callbacks.onStatusChange("waiting","> [SYS] Gabarito manual ativo. Aguardando voc\xEA avan\xE7ar...","text-yellow");return}let t=Xt(e);if(this.resolvedSigs.has(t))if(this.questionPhase==="answered"||this.questionPhase==="feedback"){if(this.detectFeedbackOverlay()){this.questionPhase="feedback",this.callbacks.onStatusChange("advancing","> [SYS] Feedback detectado. Procurando bot\xE3o de avan\xE7o...","text-green"),await this.handleFeedbackPhase();return}if(Date.now()-this.answerSubmittedAt>5e3)this.resolvedSigs.delete(t),this.lastAttemptTime=0,this.questionPhase="unanswered";else return}else return;let n=Date.now();if(t===this.lastAttemptSig&&n-this.lastAttemptTime<1500)return;if(t!==this.lastContentSig){if(this.questionPhase="unanswered",this.answerSubmittedAt=0,this.callbacks.onStatusChange("waiting","> [SYS] Aguardando estabiliza\xE7\xE3o da p\xE1gina...","text-yellow"),await this.sleep(600),!this.active)return;let s=Te(!1)||qe();s&&(e=s,t=Xt(e)),this.lastContentSig!==""&&(this.callbacks.onStatusChange("waiting","> [SYS] Nova quest\xE3o detectada! Analisando...","text-green"),this.callbacks.onPageAdvance?.(),this.errorCount=0)}this.lastContentSig=t,this.lastAttemptSig=t,this.lastAttemptTime=n;let a=e.controls.filter(s=>s.role==="answer"),r=ft(e.questionText);if(a.length===0&&r){this.callbacks.onStatusChange("waiting","> [DOM] Quest\xE3o identificada. Aguardando renderiza\xE7\xE3o dos controles...","text-yellow");for(let s=0;s<14;s++){if(await this.sleep(250),!this.active)return;let d=Te(!1)||qe();if(d&&d.controls.filter(l=>l.role==="answer").length>0){e=d,a=e.controls.filter(l=>l.role==="answer");break}}}if(a.length>0||r){if(this.callbacks.onStatusChange("analyzing","> [IA] Quest\xE3o detectada. Consultando IA...","text-blue"),Le(),e?.scope&&tt(e.scope),!this.active)return;this.abortController=new AbortController,this.stallCount=this.stallCount||0,this.analysisStallTimer&&clearTimeout(this.analysisStallTimer),this.analysisStallTimer=window.setTimeout(()=>{this.stallCount++,this.callbacks.onStatusChange("waiting",`> [AVISO] An\xE1lise travada (stall #${this.stallCount}). Abortando e reiniciando automaticamente...`,"text-yellow");try{this.abortController?.abort()}catch{}this.abortController=null,this.isProcessing=!1,this.lastAttemptTime=0,this.stallCount>=3?(this.callbacks.onStatusChange("waiting","> [AVISO] Muitos stalls consecutivos. Aguardando 15s antes de tentar novamente...","text-yellow"),this.stallCount=0,window.setTimeout(()=>{this.active&&this.checkAndAnalyze()},15e3)):window.setTimeout(()=>{this.active&&this.checkAndAnalyze()},2e3)},45e3);let s=await this.callbacks.onRequestAnalysis(1,this.abortController.signal);if(this.analysisStallTimer&&(clearTimeout(this.analysisStallTimer),this.analysisStallTimer=null),this.abortController=null,!this.active)return;if(s){if(this.callbacks.onStatusChange("analyzing",`> [IA] (${s.usedModel||"gemini"}) Confian\xE7a: ${(s.confidence*100).toFixed(1)}% | Modo: ${s.mode}`,"text-blue"),this.callbacks.onStatusChange("analyzing",`> [IA] Racioc\xEDnio: ${s.rationale}`,"text-blue"),this.callbacks.onStatusChange("analyzing",`> [IA] A\xE7\xF5es: ${s.actions.length}`,"text-blue"),this.errorCount=0,this.stallCount=0,s.memoryToStore&&this.callbacks.onStatusChange("analyzing",`> [IA] \u{1F9E0} Mem\xF3ria RAG: "${s.memoryToStore}"`,"text-yellow"),s.pageType==="conclusion"){this.callbacks.onStatusChange("idle","> [SYS] Atividade conclu\xEDda! Desligando Autopilot.","text-green"),this.stop();return}if(s.actions.length===0){let l=(this.replanCount.get(t)||0)+1;if(this.replanCount.set(t,l),l<3){this.callbacks.onStatusChange("waiting",`> [AVISO] Nenhuma resposta formulada para esta quest\xE3o. Retentando (${l}/3)...`,"text-yellow"),await this.sleep(1200),this.lastAttemptTime=0;return}}let d=(this.replanCount.get(t)||0)+1;if(this.replanCount.set(t,d),(s.actions.length>0||d>=3)&&(this.resolvedSigs.add(t),this.questionPhase="answered",this.answerSubmittedAt=Date.now(),this.active)){if(await this.sleep(1200),!this.active)return;await this.handleFeedbackPhase()}}else{this.errorCount++;let d=this.errorCount===1?3e3:5e3;this.callbacks.onStatusChange("waiting",`> [AVISO] Falha na an\xE1lise (${this.errorCount}). Retentando em ${d/1e3}s...`,"text-yellow"),await this.sleep(d),this.lastAttemptTime=0}}else{if(this.advancedSigs.has(t)||(this.callbacks.onStatusChange("analyzing","> [IA] P\xE1gina informativa ou texto de leitura. Consultando IA...","text-blue"),!this.active))return;this.abortController=new AbortController;let s=await this.callbacks.onRequestAnalysis(1,this.abortController.signal);if(this.abortController=null,!this.active)return;if(s){if(this.callbacks.onStatusChange("analyzing",`> [IA] (${s.usedModel||"gemini"}) Tipo: ${s.pageType} | Modo: ${s.mode}`,"text-blue"),this.callbacks.onStatusChange("analyzing",`> [IA] Racioc\xEDnio: ${s.rationale}`,"text-blue"),s.memoryToStore&&this.callbacks.onStatusChange("analyzing",`> [IA] \u{1F9E0} Absorvido: "${s.memoryToStore}"`,"text-yellow"),s.pageType==="conclusion"){this.callbacks.onStatusChange("idle","> [SYS] Atividade conclu\xEDda! Desligando Autopilot.","text-green"),this.stop();return}s.pageType==="info"?(this.callbacks.onStatusChange("advancing","> [IA] \u{1F4D6} Leitura conclu\xEDda. Avan\xE7ando com seguran\xE7a...","text-green"),await this.sleep(500)):s.pageType==="start"&&(this.callbacks.onStatusChange("advancing","> [SYS] In\xEDcio detectado. Iniciando...","text-blue"),await this.sleep(500)),this.errorCount=0,this.resolvedSigs.add(t),this.advancedSigs.add(t)}else{this.errorCount++;let d=this.errorCount===1?3e3:5e3;this.callbacks.onStatusChange("waiting",`> [AVISO] Falha ao processar p\xE1gina (${this.errorCount}). Retentando em ${d/1e3}s...`,"text-yellow"),await this.sleep(d),this.lastAttemptTime=0}}this.errorCount>=5&&(this.callbacks.onStatusChange("waiting","> [AVISO] Muitas falhas. Reiniciando contadores e aguardando 10s...","text-yellow"),this.errorCount=0,this.lastAttemptTime=0,await this.sleep(1e4))}catch(e){if(!this.active)return;let t=e instanceof Error?e.message:String(e);if(t.includes("cancelada")||t.includes("aborted"))return;/timeout|aborted|network|failed to fetch|cancelad/i.test(t)||this.errorCount++,console.warn("[EasyQuiz Autopilot]",e),this.callbacks.onStatusChange("error",`> [ERRO NO AUTOPILOT] ${t}`,"text-red")}finally{this.abortController=null,this.isProcessing=!1;let e=this.hasPendingMutationDuringProcessing;this.hasPendingMutationDuringProcessing=!1,this.active&&window.setTimeout(()=>void this.checkAndAnalyze(),e?300:750)}}detectFeedbackOverlay(){if(typeof document>"u")return!1;let e=[".correct",".incorrect",".perseus-message-renderer",'[class*="feedback" i]','[class*="resultado" i]','[class*="result" i]','[role="alert"]','[class*="check-answer" i][class*="result" i]','[class*="banner" i][class*="correct" i]','[class*="banner" i][class*="incorrect" i]'].join(", "),t=document.querySelector(e);if(!t)return!1;try{let n=t.getBoundingClientRect();if(n.width<=0||n.height<=0)return!1;let i=window.getComputedStyle(t);if(i.display==="none"||i.visibility==="hidden")return!1}catch{return!1}return!0}async handleFeedbackPhase(){if(this.active){for(let e=0;e<16;e++){if(!this.active)return;let t=this.detectFeedbackOverlay();t&&(this.questionPhase="feedback",this.callbacks.onStatusChange("advancing","> [SYS] \u2705 Feedback do quiz detectado. Buscando bot\xE3o de avan\xE7o...","text-green"));let n=At();if(n){let i=(n.textContent||n.getAttribute("aria-label")||"").trim().toLowerCase();if(/(próxim|next|continuar|continue|avançar|prosseguir|próxima tarefa|next task|próxima pergunta|seguir)/i.test(i)||t&&!/(verificar|checar|check|conferir|responder)/i.test(i)){if(this.callbacks.onStatusChange("advancing",`> [SYS] \u2705 Avan\xE7ando: "${i.slice(0,40)}"`,"text-green"),se(n),this.questionPhase="advanced",await this.sleep(800),!this.active)return;this.questionPhase="unanswered",this.lastContentSig="",this.lastAttemptSig="",this.lastAttemptTime=0,this.answerSubmittedAt=0,this.callbacks.onPageAdvance?.();return}}await this.sleep(250)}this.questionPhase="unanswered",this.resolvedSigs.delete(this.lastContentSig),this.lastAttemptTime=0,this.callbacks.onStatusChange("waiting","> [SYS] Feedback n\xE3o detectado ou sem bot\xE3o de avan\xE7o. Re-analisando...","text-yellow")}}};var k={canvasLogo:"data:image/png;base64,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dR/4337uYwwdXhTSKDB5oWAsGwgYGodS2wpYM8gEplWlTok0HWlElUTRdKKJ6My0nSYVScooVdtkmrZMOpkyk6JpQwKhDQEaJSkwBGPj2BiDjS+Xa7DMNROLJBBnwNg8z54/7Avn3vuctc/Lfln7tz8fCSH57LPPPmvte/f53v1b5zRt27YFAACApbu1aZpXTH0QS3Yw9QEAAAAAAjoAAACkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACh1MfAFTgM03TXDn1QQAAAPPmDjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAIC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",logo:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.8L19.2 8 12 11.2 4.8 8 12 4.8zM4 9.6l7 3.1v7.5l-7-3.5V9.6zm9 10.6v-7.5l7-3.1v7.1l-7 3.5z"/></svg>',rocket:`
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
`,download:`
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
  <polyline points="7 10 12 15 17 10"/>
  <line x1="12" y1="15" x2="12" y2="3"/>
</svg>
`,bell:`
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
  <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
</svg>
`,barChart:`
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <line x1="18" y1="20" x2="18" y2="10"/>
  <line x1="12" y1="20" x2="12" y2="4"/>
  <line x1="6" y1="20" x2="6" y2="14"/>
</svg>
`,moon:`
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
</svg>
`,volume:`
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
  <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
  <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
</svg>
`,flask:`
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M9 3h6l3 9H6L9 3z"/>
  <path d="M6 12a6 6 0 1 0 12 0"/>
  <line x1="12" y1="3" x2="12" y2="12"/>
</svg>
`,checkCircle:`
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
  <polyline points="22 4 12 14.01 9 11.01"/>
</svg>
`,palette:`
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/>
  <circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/>
  <circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/>
  <circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/>
  <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>
</svg>
`,github:`
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
  <path d="M9 18c-4.51 2-5-2-7-2"/>
</svg>
`,cpu:`
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <rect x="4" y="4" width="16" height="16" rx="2"/>
  <rect x="9" y="9" width="6" height="6"/>
  <path d="M15 2v2M15 20v2M9 2v2M9 20v2M2 15h2M2 9h2M20 15h2M20 9h2"/>
</svg>
`};var kt=class{element=null;shadow;isMinimized=!1;currentPlan=null;isDragging=!1;dragStartX=0;dragStartY=0;initialLeft=25;initialTop=25;onAdvanceCallback;constructor(e,t){this.shadow=e,this.onAdvanceCallback=t,this.initGlobalListeners()}initGlobalListeners(){window.addEventListener("popstate",()=>this.handlePageNavigated()),window.addEventListener("hashchange",()=>this.handlePageNavigated()),document.addEventListener("click",e=>{if(!this.isOpen())return;let t=e.target;if(!t||this.shadow.contains(t)||t.closest("#easyquiz-shadow-root"))return;let n=t.closest('button, [role="button"], a, input[type="submit"]');if(n){let i=(n.textContent||n.value||"").toLowerCase();/pr[oó]xim|avan[cç]|continu|verific|enviar|submit|confirm|checar|validar|next/i.test(i)&&setTimeout(()=>{this.isOpen()&&this.handlePageNavigated()},800)}},!0)}handlePageNavigated(){this.isOpen()&&(this.hide(),this.onAdvanceCallback?.())}isOpen(){return this.element!==null&&this.element.style.display!=="none"}show(e){this.currentPlan=e,this.element||this.createElement(),this.renderContent(),this.element&&(this.element.style.display="flex")}hide(){this.element&&(this.element.style.display="none")}minimize(){this.isMinimized=!0,this.element&&this.element.classList.add("minimized")}restore(){this.isMinimized=!1,this.element&&this.element.classList.remove("minimized")}createElement(){this.element=document.createElement("div"),this.element.className="eq-floating-hud",this.element.style.left=`${this.initialLeft}px`,this.element.style.top=`${this.initialTop}px`,this.element.innerHTML=`
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
    `,this.shadow.appendChild(this.element),this.element.querySelector("#eq-fah-pill").addEventListener("click",()=>this.restore()),this.element.querySelector("#eq-fah-min-btn").addEventListener("click",()=>this.minimize()),this.element.querySelector("#eq-fah-close-btn").addEventListener("click",()=>this.hide());let i=this.element.querySelector("#eq-fah-copy-md-btn");i.addEventListener("click",()=>this.copyMarkdownToClipboard(i));let a=this.element.querySelector("#eq-fah-copy-all-btn");a.addEventListener("click",()=>this.copyMarkdownToClipboard(a));let r=this.element.querySelector("#eq-fah-header");this.setupDraggable(r)}setupDraggable(e){let t=n=>{if(n.target.closest(".eq-fah-btn"))return;n.preventDefault(),this.isDragging=!0,this.dragStartX=n.clientX,this.dragStartY=n.clientY;let i=this.element.getBoundingClientRect();this.initialLeft=i.left,this.initialTop=i.top;let a=s=>{if(!this.isDragging||!this.element)return;let d=s.clientX-this.dragStartX,l=s.clientY-this.dragStartY,u=Math.max(10,window.innerWidth-this.element.offsetWidth-10),h=Math.max(10,window.innerHeight-this.element.offsetHeight-10),c=Math.min(Math.max(10,this.initialLeft+d),u),m=Math.min(Math.max(10,this.initialTop+l),h);this.element.style.left=`${c}px`,this.element.style.top=`${m}px`},r=()=>{this.isDragging=!1,window.removeEventListener("mousemove",a),window.removeEventListener("mouseup",r)};window.addEventListener("mousemove",a),window.addEventListener("mouseup",r)};e.addEventListener("mousedown",t)}renderContent(){if(!this.element||!this.currentPlan)return;let e=this.element.querySelector("#eq-fah-body"),t=this.element.querySelector("#eq-fah-pill-text"),n=this.element.querySelector("#eq-fah-pill-badge");e.innerHTML="";let i=this.currentPlan,a=i.actions.filter(m=>m.t==="drag"),r=i.actions.filter(m=>{if(m.t!=="val")return!1;let p=I(m.id||"").toLowerCase();return!/continu|avan[cç]|pr[oó]xim|submet|enviar|check|verific/i.test(p)}),s=i.actions.filter(m=>m.t==="clk"||m.t==="chk"),d=i.actions.filter(m=>m.t==="sel"),l=a.length||r.length||s.length||d.length,u=document.createElement("div");u.className="eq-fah-meta";let h=document.createElement("span");h.textContent=`Modo: ${i.mode.replace("_"," ")}`;let c=document.createElement("span");if(c.className="eq-fah-meta-badge",c.textContent=`${Math.round(i.confidence*100)}% Confian\xE7a`,u.append(h,c),e.appendChild(u),a.length>0||i.mode==="categorizacao"||i.mode==="arrastar_soltar"){t.textContent=`Categoriza\xE7\xE3o (${a.length} itens)`,n.textContent=String(a.length);let m={};for(let p of a){let g=I(p.to)||"Geral";m[g]||(m[g]=[]),m[g].push(I(p.from))}for(let[p,g]of Object.entries(m)){let f=document.createElement("div"),b=/fato|true|verdadeiro|sim/i.test(p),v=/opini[aã]o|false|falso|n[aã]o/i.test(p);f.className=`eq-fah-group ${b?"group-fato":v?"group-opiniao":""}`;let y=document.createElement("div");y.className="eq-fah-group-title",y.textContent=`\u{1F4C1} ${p} (${g.length})`,f.appendChild(y);let E=document.createElement("div");E.className="eq-fah-group-items";for(let w of g){let q=document.createElement("div");q.className="eq-fah-item";let C=document.createElement("span");C.className="eq-fah-item-text",C.textContent=w,q.appendChild(C);let L=document.createElement("button");L.className="eq-fah-copy-inline",L.textContent="Copiar",L.addEventListener("click",()=>{navigator.clipboard.writeText(w),L.textContent="\u2713 Copiado",setTimeout(()=>L.textContent="Copiar",1200)}),q.appendChild(L),E.appendChild(q)}f.appendChild(E),e.appendChild(f)}}else if(r.length>0){t.textContent=`Preenchimento (${r.length} campos)`,n.textContent=String(r.length);let m=document.createElement("div");m.className="eq-fah-group";let p=document.createElement("div");p.className="eq-fah-group-title",p.textContent="\u{1F4DD} Respostas para os Campos de Texto:",m.appendChild(p);let g=document.createElement("div");g.className="eq-fah-group-items";for(let f=0;f<r.length;f++){let b=r[f],v=document.createElement("div");v.className="eq-fah-item";let y=Ze(b.id);(!y||/^[#\.\$]|input|mat-|cell|field|q[0-9]|eq-/i.test(y))&&(y=`Campo ${f+1}`);let E=String(b.v??""),w=document.createElement("div");w.className="eq-fah-field-box";let q=document.createElement("div");q.className="eq-fah-field-label",q.textContent=y,w.appendChild(q);let C=document.createElement("div");C.className="eq-fah-field-val",C.textContent=E,w.appendChild(C),v.appendChild(w);let L=document.createElement("button");L.className="eq-fah-copy-inline",L.textContent="Copiar",L.addEventListener("click",()=>{navigator.clipboard.writeText(E),L.textContent="\u2713 Copiado",setTimeout(()=>L.textContent="Copiar",1200)}),v.appendChild(L),g.appendChild(v)}m.appendChild(g),e.appendChild(m)}else if(s.length>0){t.textContent=`Op\xE7\xF5es (${s.length} marcadas)`,n.textContent=String(s.length);let m=document.createElement("div");m.className="eq-fah-group";let p=document.createElement("div");p.className="eq-fah-group-title",p.textContent="\u{1F3AF} Alternativa(s) Correta(s):",m.appendChild(p);let g=document.createElement("div");g.className="eq-fah-group-items";for(let f=0;f<s.length;f++){let b=s[f],v=document.createElement("div");v.className="eq-fah-item";let y=Ze(b.id);(!y||/^(eq-|#|\$|\.|input_|mat-|choice_|radio_|chk_)/i.test(y))&&b.v&&(y=String(b.v)),y=I(y),/^(eq-|#|\$|\.|input_|mat-|choice_|radio_|chk_)/i.test(y)&&(y="");let E="",w=y.match(/^(\([A-Za-z0-9]\)|[A-Za-z0-9][\)\.\:\-])\s*(.*)$/);w?(E=w[1].replace(/[\(\)\.\:\-\s]/g,"").toUpperCase(),y=w[2].trim()||y):s.length>1&&(E=String.fromCharCode(65+f));let q=document.createElement("div");if(q.style.display="flex",q.style.alignItems="center",q.style.gap="8px",q.style.flex="1",E){let A=document.createElement("span");A.className="eq-fah-letter-badge",A.textContent=E,q.appendChild(A)}let C=document.createElement("span");C.className="eq-fah-item-text",C.textContent=y||(E?`Alternativa ${E}`:"Alternativa Selecionada"),q.appendChild(C),v.appendChild(q);let L=document.createElement("button");L.className="eq-fah-copy-inline",L.textContent="Copiar",L.addEventListener("click",()=>{navigator.clipboard.writeText(y||E),L.textContent="\u2713 Copiado",setTimeout(()=>L.textContent="Copiar",1200)}),v.appendChild(L),g.appendChild(v)}m.appendChild(g),e.appendChild(m)}else if(d.length>0){t.textContent=`Sele\xE7\xE3o (${d.length} listas)`,n.textContent=String(d.length);let m=document.createElement("div");m.className="eq-fah-group";let p=document.createElement("div");p.className="eq-fah-group-title",p.textContent="\u{1F4CB} Op\xE7\xF5es para Selecionar na Lista:",m.appendChild(p);let g=document.createElement("div");g.className="eq-fah-group-items";for(let f=0;f<d.length;f++){let b=d[f],v=document.createElement("div");v.className="eq-fah-item";let y=Ze(b.id);(!y||/^[#\.\$]|select|input|mat-|cell|field|q[0-9]|eq-/i.test(y))&&(y=`Lista ${f+1}`);let q=(Array.isArray(b.v)?b.v:[String(b.v??"")]).map(O=>{let T=Q(b.id,void 0,!0)||Q(I(b.id),void 0,!0),x=T instanceof HTMLSelectElement?T:T?.querySelector("select");if(x){let H=I(O).toLowerCase();for(let B=0;B<x.options.length;B++){let R=x.options[B];if(R.value.toLowerCase()===H||I(R.textContent).toLowerCase()===H){let X=I(R.textContent);if(X&&!X.toLowerCase().includes("selecione"))return X}}}return O}).join(", "),C=document.createElement("div");C.className="eq-fah-field-box";let L=document.createElement("div");L.className="eq-fah-field-label",L.textContent=y,C.appendChild(L);let A=document.createElement("div");A.className="eq-fah-field-val",A.textContent=q,C.appendChild(A),v.appendChild(C);let P=document.createElement("button");P.className="eq-fah-copy-inline",P.textContent="Copiar",P.addEventListener("click",()=>{navigator.clipboard.writeText(q),P.textContent="\u2713 Copiado",setTimeout(()=>P.textContent="Copiar",1200)}),v.appendChild(P),g.appendChild(v)}m.appendChild(g),e.appendChild(m)}else{t.textContent="Gabarito",n.textContent="0";let m=document.createElement("div");m.style.padding="10px",m.style.color="#888",m.textContent="Nenhuma resposta direta para exibir.",e.appendChild(m)}if(i.rationale){let m=document.createElement("div");m.className="eq-fah-rationale",m.textContent=`\u{1F4A1} Racioc\xEDnio da IA: ${i.rationale}`,e.appendChild(m)}}generateMarkdown(){if(!this.currentPlan)return"";let e=this.currentPlan,t=[];t.push("# Gabarito da Quest\xE3o \u2014 EasyQuiz Pro"),t.push(`- **Modo:** ${e.mode}`),t.push(`- **Confian\xE7a:** ${(e.confidence*100).toFixed(0)}%`),t.push("");let n=e.actions.filter(s=>s.t==="drag"),i=e.actions.filter(s=>s.t==="val"),a=e.actions.filter(s=>s.t==="clk"||s.t==="chk"),r=e.actions.filter(s=>s.t==="sel");if(n.length>0){t.push("## \u{1F4C2} Categoriza\xE7\xE3o:");let s={};for(let d of n){let l=I(d.to)||"Geral";s[l]||(s[l]=[]),s[l].push(I(d.from))}for(let[d,l]of Object.entries(s)){t.push(`### Categoria: ${d}`);for(let u of l)t.push(`- ${u}`);t.push("")}}else if(i.length>0){t.push("## \u270F\uFE0F Respostas para Preenchimento:");for(let s of i){let d=I(s.id);t.push(`- **${d||"Campo"}:** \`${s.v}\``)}t.push("")}else if(a.length>0){t.push("## \u2705 Alternativas Corretas:");for(let s=0;s<a.length;s++){let d=a[s],l=Ze(d.id);(!l||/^(eq-|#|\$|\.|input_|mat-|choice_|radio_|chk_)/i.test(l))&&d.v&&(l=String(d.v)),l=I(l),/^(eq-|#|\$|\.|input_|mat-|choice_|radio_|chk_)/i.test(l)&&(l="");let u=a.length>1?`${String.fromCharCode(65+s)}) `:"";t.push(`- [x] ${u}${l||"Alternativa "+String.fromCharCode(65+s)}`)}t.push("")}else if(r.length>0){t.push("## \u{1F4CB} Op\xE7\xF5es Selecionadas em Lista:");for(let s of r){let d=I(s.id)||"Lista",l=Array.isArray(s.v)?s.v.join(", "):String(s.v??"");t.push(`- **${d}:** \`${l}\``)}t.push("")}return e.rationale&&(t.push("---"),t.push(`**\u{1F4A1} Racioc\xEDnio:** ${e.rationale}`)),t.join(`
`)}copyMarkdownToClipboard(e){let t=this.generateMarkdown();t&&navigator.clipboard.writeText(t).then(()=>{let n=e.innerHTML;e.id==="eq-fah-copy-md-btn"?e.innerHTML='<span style="font-size:10px; color:#00ffcc; font-weight:bold;">\u2713</span>':e.innerHTML="\u2713 Copiado!",setTimeout(()=>{e.innerHTML=n},1500)})}};var Io=`
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&display=swap');

  :host {
    all: initial;
    color-scheme: dark;
    font-family: 'Nunito', 'gg sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-size: 13px;
    line-height: 1.5;

    /* === Tema Legacy: preto, branco e acento dourado do modo === */
    --eq-bg:             transparent;
    --eq-surface:        transparent;
    --eq-surface-raised: transparent;
    --eq-surface-hover:  rgba(255,255,255,0.06);
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

  /* Themes */
  :host([data-eq-theme="mega-black"]) {
    --eq-bg: transparent;
    --eq-surface: transparent;
    --eq-surface-raised: rgba(0,0,0,0.15);
    --eq-surface-hover: rgba(255,255,255,0.06);
    --eq-border: rgba(255,255,255,0.14);
    --eq-text: #bdbdbd;
    --eq-text-bright: #ffffff;
    --eq-muted: #777777;
    --eq-accent: #ffffff;
    --eq-accent-hover: #e5e5e5;
    --eq-icon-accent: #fbbf24;
    --eq-success: #4ade80;
    --eq-warning: #fbbf24;
    --eq-danger: #f87171;
  }

  :host([data-eq-theme="dark"]) {
    --eq-bg: rgba(28,28,34,0.82);
    --eq-surface: rgba(38,38,46,0.55);
    --eq-surface-raised: rgba(45,45,55,0.7);
    --eq-surface-hover: rgba(255,255,255,0.08);
    --eq-border: rgba(255,255,255,0.1);
    --eq-text: #a8b2c8;
    --eq-text-bright: #e8ecf8;
    --eq-muted: #6b7280;
    --eq-accent: #818cf8;
    --eq-accent-hover: #6d77e8;
    --eq-icon-accent: #818cf8;
    --eq-success: #34d399;
    --eq-warning: #f59e0b;
    --eq-danger: #f87171;
  }
  
  :host([data-eq-theme="purple-neon"]) {
    --eq-bg: rgba(18,8,36,0.90);
    --eq-surface: rgba(32,12,60,0.55);
    --eq-surface-raised: rgba(40,16,80,0.7);
    --eq-surface-hover: rgba(160,80,255,0.12);
    --eq-border: rgba(160,80,255,0.30);
    --eq-text: #c8a8f8;
    --eq-text-bright: #f0e0ff;
    --eq-muted: #8060a8;
    --eq-accent: #bf7fff;
    --eq-accent-hover: #aa6aee;
    --eq-icon-accent: #bf7fff;
    --eq-success: #4ade80;
    --eq-warning: #fbbf24;
    --eq-danger: #ff6090;
  }

  :host([data-eq-theme="gray-blue"]) {
    --eq-bg: rgba(40,43,48,0.88);
    --eq-surface: rgba(50,54,60,0.55);
    --eq-surface-raised: rgba(58,62,68,0.7);
    --eq-surface-hover: rgba(100,130,200,0.12);
    --eq-border: rgba(88,101,242,0.22);
    --eq-text: #b9bbbe;
    --eq-text-bright: #dcddde;
    --eq-muted: #72767d;
    --eq-accent: #5865f2;
    --eq-accent-hover: #4752c4;
    --eq-icon-accent: #5865f2;
    --eq-success: #3ba55c;
    --eq-warning: #faa61a;
    --eq-danger: #ed4245;
  }

  :host([data-eq-theme="light"]) {
    color-scheme: light;
    --eq-bg: rgba(255,255,255,0.96);
    --eq-surface: rgba(245,245,250,0.8);
    --eq-surface-raised: rgba(235,235,242,0.9);
    --eq-surface-hover: rgba(0,0,0,0.06);
    --eq-border: rgba(0,0,0,0.1);
    --eq-text: #4e5568;
    --eq-text-bright: #1a1c23;
    --eq-muted: #9ba3af;
    --eq-accent: #5865f2;
    --eq-accent-hover: #4752c4;
    --eq-icon-accent: #5865f2;
    --eq-success: #3ba55c;
    --eq-warning: #d97706;
    --eq-danger: #da3633;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  /* Aplica border-radius se n\xE3o for mega-black */
  :host([data-eq-theme="mega-black"]), :host([data-eq-theme="mega-black"]) * {
    border-radius: 0 !important;
  }
  :host([data-eq-theme="dark"]) * { border-radius: 4px; }
  :host([data-eq-theme="purple-neon"]) * { border-radius: 8px; }
  :host([data-eq-theme="gray-blue"]) * { border-radius: 6px; }
  :host([data-eq-theme="light"]) * { border-radius: 6px; }


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
    display: block;
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
    background: var(--eq-bg);
    border-left: 1px solid var(--eq-border);
    color: var(--eq-text);
    display: flex;
    flex-direction: row;
    box-shadow: -12px 0 40px rgba(0, 0, 0, 0.45);
    transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), background 0.2s ease;
    transform: translateX(0);
    overflow: visible;
    /* Backdrop filters por tema definidos via vari\xE1veis ou overrides */
    backdrop-filter: blur(20px) saturate(200%) brightness(0.85);
    -webkit-backdrop-filter: blur(20px) saturate(200%) brightness(0.85);
  }

  /* Tema mega-black (legacy): sem backdrop-filter para manter transpar\xEAncia total */
  :host([data-eq-theme="mega-black"]) .eq-sidebar {
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    box-shadow: none;
    border-left: 1px solid rgba(255,255,255,0.10);
  }

  :host([data-eq-theme="dark"]) .eq-sidebar {
    backdrop-filter: blur(16px) saturate(180%);
    -webkit-backdrop-filter: blur(16px) saturate(180%);
  }
  :host([data-eq-theme="purple-neon"]) .eq-sidebar {
    backdrop-filter: blur(18px) saturate(220%) hue-rotate(10deg);
    -webkit-backdrop-filter: blur(18px) saturate(220%) hue-rotate(10deg);
  }
  :host([data-eq-theme="gray-blue"]) .eq-sidebar {
    backdrop-filter: blur(16px) saturate(160%);
    -webkit-backdrop-filter: blur(16px) saturate(160%);
  }
  :host([data-eq-theme="light"]) .eq-sidebar {
    backdrop-filter: blur(12px) saturate(120%) brightness(1.05);
    -webkit-backdrop-filter: blur(12px) saturate(120%) brightness(1.05);
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
    background: transparent;
    border-right: none;
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
    color: #000000;
    background: #ffffff;
    border-color: rgba(255,255,255,0.28);
    box-shadow: 0 2px 8px rgba(0,0,0,0.22);
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
    background: transparent;
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
  .eq-activity-icon svg { width: 20px; height: 20px; display: block; flex-shrink: 0; }

  /* ===== CORPO DA SIDEBAR (PAINEL DIREITO) ===== */
  .eq-sidebar-body {
    flex: 1;
    display: flex;
    flex-direction: column;
    background: transparent;
    overflow: hidden;
    min-width: 0;
  }

  .eq-view-pane {
    background: transparent;
  }

  /* Cabe\xE7alho */
  .eq-header {
    background: transparent;
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
    background: transparent;
    color: #f4f7fb;
    padding: 18px;
    border: none;
    border-radius: 18px;
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
  .eq-resolve-menu svg { width: 18px; height: 18px; display: block; }

  /* \u2500\u2500 CONTEXT MENU (transparent + backdrop blur) \u2500\u2500 */
  /* .eq-resolver-context-menu \u2192 replaced by .eq-ctx */

  .eq-resolver-context-menu[hidden] { display: none !important; }

  /* Smooth open */
  @keyframes eq-menu-appear {
    0%   { opacity: 0; transform: translateY(-8px) scale(0.94); }
    60%  { opacity: 1; transform: translateY(2px)  scale(1.01); }
    100% { opacity: 1; transform: translateY(0)    scale(1);    }
  }

  /* .eq-menu-item \u2192 replaced by .eq-ctx-item */

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
  .eq-btn-icon svg, .eq-menu-icon svg { width: 14px; height: 14px; display: block; }

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
  .eq-result-toggle-icon svg { width: 13px; height: 13px; display: block; }

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


  

  

  .eq-brand-name {
    font-size: 13px;
    font-weight: 900;
    color: var(--eq-text-bright);
    letter-spacing: 0.02em;
  }

  .eq-brand-badge {
    background: rgba(255,255,255,0.88);
    border: 1px solid rgba(255,255,255,0.6);
    color: #111111;
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
  .eq-icon-btn svg { width: 16px; height: 16px; display: block; }

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
  .eq-view-pane::-webkit-scrollbar-track { background: rgba(0,0,0,0.5);
    backdrop-filter: blur(28px) saturate(250%);
    -webkit-backdrop-filter: blur(28px) saturate(250%); }
  .eq-view-pane::-webkit-scrollbar-thumb { background: var(--eq-surface-hover); border-radius: 2px; }



  /* ===== SE\xC7\xD5ES E COMPONENTES ===== */
  
  /* Topbar de Configura\xE7\xF5es */
  .eq-settings-topbar {
    display: flex;
    overflow-x: auto;
    gap: 8px;
    padding: 0 4px 12px 4px;
    border-bottom: 1px solid var(--eq-border);
    margin-bottom: 12px;
  }
  .eq-settings-topbar::-webkit-scrollbar {
    width: 0px;
    height: 0px;
    background: transparent;
  }
  .eq-settings-cat-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 8px 16px;
    background: transparent;
    border: none;
    border-radius: 4px;
    color: var(--eq-muted);
    font-size: 11px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    min-width: 64px;
  }
  .eq-settings-cat-btn svg {
    width: 18px;
    height: 18px;
    opacity: 0.8;
  }
  .eq-settings-cat-btn:hover {
    color: var(--eq-text-bright);
    background: var(--eq-surface-hover);
  }
  .eq-settings-cat-btn.active {
    color: #000;
    background: #fff;
  }
  :host([data-eq-theme="mega-black"]) .eq-settings-cat-btn {
    border-radius: 0;
  }
  :host([data-eq-theme="mega-black"]) .eq-settings-cat-btn.active {
    background: #fff;
    color: #000;
  }
  
  /* Configuration Rows */
  .eq-cfg-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 9px 0;
    border-bottom: 1px solid rgba(255,255,255,0.05);
    gap: 12px;
  }
  :host([data-eq-theme="light"]) .eq-cfg-row {
    border-bottom: 1px solid rgba(0,0,0,0.05);
  }
  .eq-cfg-row:last-child { border-bottom: none; }
  
  .eq-cfg-label {
    display: flex;
    flex-direction: column;
    gap: 2px;
    flex: 1;
  }
  .eq-cfg-label-title {
    font-size: 12px;
    font-weight: 600;
    color: var(--eq-text-bright);
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .eq-cfg-label-desc {
    font-size: 10px;
    color: var(--eq-muted);
    line-height: 1.4;
  }
  
  /* Toggle Switch */
  .eq-toggle {
    position: relative;
    width: 36px;
    height: 20px;
    flex-shrink: 0;
  }
  .eq-toggle input { opacity: 0; width: 0; height: 0; position: absolute; }
  .eq-toggle-track {
    position: absolute;
    inset: 0;
    background: rgba(255,255,255,0.12);
    cursor: pointer;
    transition: background 0.2s cubic-bezier(0.16,1,0.3,1);
  }
  :host([data-eq-theme="light"]) .eq-toggle-track {
    background: rgba(0,0,0,0.12);
  }
  :host([data-eq-theme="dark"]) .eq-toggle-track,
  :host([data-eq-theme="purple-neon"]) .eq-toggle-track,
  :host([data-eq-theme="gray-blue"]) .eq-toggle-track,
  :host([data-eq-theme="light"]) .eq-toggle-track {
    border-radius: 10px !important;
  }
  .eq-toggle-knob {
    position: absolute;
    top: 3px;
    left: 3px;
    width: 14px;
    height: 14px;
    background: rgba(255,255,255,0.5);
    transition: transform 0.2s cubic-bezier(0.16,1,0.3,1), background 0.2s ease;
    pointer-events: none;
  }
  :host([data-eq-theme="light"]) .eq-toggle-knob {
    background: #fff;
    box-shadow: 0 1px 3px rgba(0,0,0,0.2);
  }
  :host([data-eq-theme="dark"]) .eq-toggle-knob,
  :host([data-eq-theme="purple-neon"]) .eq-toggle-knob,
  :host([data-eq-theme="gray-blue"]) .eq-toggle-knob,
  :host([data-eq-theme="light"]) .eq-toggle-knob {
    border-radius: 50% !important;
  }
  .eq-toggle input:checked ~ .eq-toggle-track {
    background: var(--eq-accent);
  }
  .eq-toggle input:checked ~ .eq-toggle-track .eq-toggle-knob {
    transform: translateX(16px);
    background: #fff;
  }
  :host([data-eq-theme="mega-black"]) .eq-toggle input:checked ~ .eq-toggle-track .eq-toggle-knob {
    background: #000;
  }
  
  /* Theme Cards */
  .eq-theme-cards-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    margin-top: 8px;
  }
  .eq-theme-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    background: var(--eq-surface);
    border: 1px solid var(--eq-border);
    padding: 8px;
    cursor: pointer;
    transition: all 0.2s;
  }
  .eq-theme-card:hover {
    border-color: var(--eq-text);
  }
  .eq-theme-card.active {
    border-color: var(--eq-accent);
    background: var(--eq-surface-raised);
  }
  .eq-theme-card-preview {
    width: 100%;
    height: 36px;
    display: flex;
    border: 1px solid rgba(255,255,255,0.1);
  }
  :host([data-eq-theme="light"]) .eq-theme-card-preview {
    border-color: rgba(0,0,0,0.1);
  }
  .eq-theme-card-preview-bar {
    width: 12px;
    height: 100%;
    background: rgba(0,0,0,0.3);
  }
  .eq-theme-card-preview-main {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 4px;
  }
  .eq-theme-card-preview-line {
    height: 4px;
    background: rgba(255,255,255,0.2);
    border-radius: 2px;
  }
  .eq-theme-card-label {
    font-size: 10px;
    font-weight: 700;
    color: var(--eq-text);
    text-transform: uppercase;
    display: flex;
    align-items: center;
    gap: 4px;
  }
  .eq-theme-card.active .eq-theme-card-label {
    color: var(--eq-accent);
  }

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
  /* .eq-context-menu \u2192 replaced by .eq-ctx */

  .eq-context-menu[hidden] {
    display: none !important;
  }

  /* .eq-context-item \u2192 replaced by .eq-ctx-item */

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
    background: transparent;
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
    background: transparent;
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
    background: transparent;
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
    background: transparent;
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
    background: transparent;
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
  .eq-brain-tab-icon { display:inline-flex; align-items:center; flex-shrink:0; opacity:0.45; width:13px; height:13px; }
  .eq-brain-tab-icon svg { width:13px; height:13px; display:block; }
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
    background: transparent;
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
    background: transparent; flex-shrink:0;
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
  .eq-md-codeblock { background: transparent; border-radius:5px; margin:6px 0; overflow:hidden; border:1px solid rgba(255,255,255,0.06); }
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

  .eq-tree-ficon { display:inline-flex; align-items:center; flex-shrink:0; width:16px; height:16px; transition:color 0.1s; }
  .eq-tree-ficon svg { display:block; width:14px; height:14px; }

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
    background: var(--eq-bg);
    backdrop-filter: blur(20px) saturate(160%);
    -webkit-backdrop-filter: blur(20px) saturate(160%);
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
  .eq-operation-state.is-busy { color: #aaa; border-color: rgba(255, 255, 255, 0.15); background: rgba(255, 255, 255, 0.05); }
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
    background: transparent;
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
    background: transparent;
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
    background: transparent;
    border: 1px solid rgba(255,255,255,0.08);
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
    color: #555;
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
    color: #ccc;
    background: rgba(255, 255, 255, 0.08);
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
    text-shadow: none;
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
    background: transparent;
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
    background: transparent;
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
    color: #888;
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

  /* \u2500\u2500 Terminal block cursor \u2500\u2500 */
  .eq-term-cursor {
    display: inline-block;
    width: 0.6em;
    height: 2px;
    background: transparent;
    animation: eq-term-blink 1.1s step-end infinite;
    vertical-align: text-bottom;
    margin-left: 1px;
  }
  @keyframes eq-term-blink {
    0%, 100% { opacity: 1 }
    50% { opacity: 0 }
  }
  #eq-term-output.eq-term-unfocused .eq-term-cursor {
    opacity: 0.25;
    animation-play-state: paused;
  }
  #eq-term-output { scrollbar-width: thin; scrollbar-color: #1e1e1e #0a0a0a; }
  #eq-live-debug-terminal { scrollbar-width: thin; scrollbar-color: #1e1e1e #0a0a0a; }


  /* eq-item-icon: used in list items and context items */
  .eq-item-icon { display:inline-flex; align-items:center; flex-shrink:0; width:15px; height:15px; }
  .eq-item-icon svg { width:14px; height:14px; display:block; }


  /* \u2550\u2550\u2550 UNIFIED CONTEXT MENU \u2014 .eq-ctx / .eq-ctx-item \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
     Both the resolver menu and the settings menu use THESE classes only.
     position:fixed is set by JS on open so backdrop-filter blur always works.
  \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */
  .eq-ctx {
    display: flex;
    flex-direction: column;
    gap: 1px;
    padding: 4px;
    min-width: 200px;
    /* Very transparent so blurred content behind is clearly visible */
    background: rgba(10,12,20,0.22);
    backdrop-filter: blur(28px) saturate(250%) brightness(0.95);
    -webkit-backdrop-filter: blur(28px) saturate(250%) brightness(0.95);
    border: 1px solid rgba(255,255,255,0.10);
    border-radius: 0;
    box-shadow: 0 18px 56px rgba(0,0,0,0.96), 0 0 0 0.5px rgba(255,255,255,0.06);
    /* isolation:isolate creates own stacking context for backdrop-filter */
    isolation: isolate;
  }
  .eq-ctx[hidden] { display: none !important; }

  .eq-ctx-item {
    display: flex;
    align-items: center;
    gap: 9px;
    width: 100%;
    height: 30px;
    padding: 0 10px;
    background: transparent;
    border: none;
    border-radius: 1px;
    color: #aaa;
    font-family: inherit;
    font-size: 12px;
    font-weight: 600;
    text-align: left;
    cursor: pointer;
    transition: background 0.08s, color 0.08s;
  }
  .eq-ctx-item:hover { background: rgba(255,255,255,0.09); color: #fff; }
  .eq-ctx-item.danger { color: #f87171; }
  .eq-ctx-item.danger:hover { background: rgba(255,80,80,0.12); color: #fca5a5; }

  .eq-ctx-icon {
    display: inline-flex;
    width: 14px;
    height: 14px;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    opacity: 0.75;
  }
  .eq-ctx-icon svg { width: 13px; height: 13px; }
  .eq-ctx-item:hover .eq-ctx-icon { opacity: 1; }
  .eq-ctx-divider { height: 1px; background: rgba(255,255,255,0.06); margin: 3px 6px; }
  .eq-ctx-badge {
    font-size: 9px; font-weight: 700; padding: 2px 6px;
    background: rgba(255,255,255,0.07); color: #555; border-radius: 2px;
    letter-spacing: 0.06em; margin-left: auto;
  }

  /* Terminal wallpaper canvas \u2014 injected by JS in initTerminalWallpaper() */
  #eq-wallpaper-canvas { display:block; }

  
  /* \u2500\u2500 Icon Sizing \u2014 all icons 16x16 consistent \u2500\u2500 */
  .eq-btn-icon, .eq-menu-icon, .eq-item-icon,
  .eq-brain-tab-icon, .eq-dock-toggle-icon,
  .eq-result-toggle-icon {
    display:inline-flex; align-items:center; justify-content:center;
    width:16px; height:16px; flex-shrink:0;
  }
  .eq-activity-icon {
    display:inline-flex; align-items:center; justify-content:center;
    width:18px; height:18px; flex-shrink:0;
  }
  .eq-launcher-icon {
    display:inline-flex; align-items:center; justify-content:center;
    width:13px; height:13px; flex-shrink:0;
  }
  .eq-icon-btn > svg { width:14px; height:14px; display:block; }
  .eq-btn-icon > svg { width:15px; height:15px; display:block; }
  .eq-activity-icon > svg { width:18px; height:18px; display:block; }
  .eq-menu-icon > svg, .eq-item-icon > svg { width:13px; height:13px; display:block; }
  .eq-brand-icon img, .eq-brand-mark img { width:20px; height:20px; display:block; }
  .eq-resolver-brand .eq-brand-mark img { width:60px; height:auto; }
  #eq-term-output ::selection,
  #eq-live-debug-terminal ::selection {
    background: rgba(255,255,255,0.85);
    color: #0a0a0a;
  }

  /* \u2500\u2500 Resolver + Output context menus \u2014 glassmorphism \u2500\u2500 */
  .eq-resolver-context-menu {
    background: transparent !important;
    backdrop-filter: blur(16px) saturate(140%) !important;
    -webkit-backdrop-filter: blur(16px) saturate(140%) !important;
    border: 1px solid rgba(255,255,255,0.08) !important;
    border-radius: 8px !important;
    box-shadow: 0 12px 36px rgba(0,0,0,0.75) !important;
  }

  /* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
     SISTEMA DE GLOW EFFECTS
     Ativado via atributo data-eq-glow="true" no host.
     Aplica brilho vibrante em bot\xF5es, controles e elementos
     interativos \u2014 intensidade calibrada para n\xE3o ofuscar.
  \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */
  :host([data-eq-glow="true"]) .eq-btn,
  :host([data-eq-glow="true"]) .eq-primary-btn,
  :host([data-eq-glow="true"]) .eq-launcher,
  :host([data-eq-glow="true"]) .eq-activity-btn.active {
    box-shadow: 0 0 10px var(--eq-accent), 0 0 22px color-mix(in srgb, var(--eq-accent) 35%, transparent);
    filter: brightness(1.15);
    transition: box-shadow 0.25s ease, filter 0.25s ease;
  }

  :host([data-eq-glow="true"]) .eq-btn:hover,
  :host([data-eq-glow="true"]) .eq-primary-btn:hover,
  :host([data-eq-glow="true"]) .eq-launcher:hover {
    box-shadow: 0 0 16px var(--eq-accent), 0 0 36px color-mix(in srgb, var(--eq-accent) 50%, transparent);
    filter: brightness(1.3);
  }

  :host([data-eq-glow="true"]) .eq-activity-btn:hover {
    box-shadow: 0 0 8px var(--eq-icon-accent), 0 0 16px color-mix(in srgb, var(--eq-icon-accent) 30%, transparent);
    filter: brightness(1.2);
  }

  :host([data-eq-glow="true"]) .eq-brand-icon,
  :host([data-eq-glow="true"]) .eq-launcher-icon {
    filter: drop-shadow(0 0 6px var(--eq-icon-accent)) brightness(1.25);
  }

  /* \xCDcones de ac\xE7\xE3o dentro de bot\xF5es ficam mais vibrantes */
  :host([data-eq-glow="true"]) .eq-btn-icon,
  :host([data-eq-glow="true"]) .eq-menu-icon {
    filter: brightness(1.4) drop-shadow(0 0 3px currentColor);
  }

  /* Indicador de aba activa pulsa suavemente com glow */
  :host([data-eq-glow="true"]) .eq-activity-indicator {
    background: var(--eq-accent);
    box-shadow: 0 0 8px var(--eq-accent);
    animation: eq-glow-pulse 2s ease-in-out infinite alternate;
  }

  @keyframes eq-glow-pulse {
    from { opacity: 0.7; box-shadow: 0 0 4px var(--eq-accent); }
    to   { opacity: 1;   box-shadow: 0 0 14px var(--eq-accent); }
  }

`;var Ie="v3.7.6";var Ho=(()=>{try{if(typeof window.trustedTypes?.createPolicy=="function")return window.trustedTypes.createPolicy("easyquiz-ui#html",{createHTML:o=>o})}catch{}return null})();function Cn(o,e){try{if(Ho){o.innerHTML=Ho.createHTML(e);return}}catch{}try{if(typeof o.setHTMLUnsafe=="function"){o.setHTMLUnsafe(e);return}}catch{}o.innerHTML=e}var qn=[{value:"",label:"Detec\xE7\xE3o Autom\xE1tica"},{value:"escolha_unica",label:"M\xFAltipla Escolha (\xDAnica)"},{value:"escolha_multipla",label:"M\xFAltipla Escolha (V\xE1rias)"},{value:"categorizacao",label:"Categoriza\xE7\xE3o / Grupos"},{value:"arrastar_soltar",label:"Arrastar e Soltar (Drag & Drop)"},{value:"ordenacao",label:"Ordena\xE7\xE3o / Sequ\xEAncia"},{value:"verdadeiro_falso",label:"Verdadeiro / Falso"},{value:"texto_livre",label:"Texto Livre / Dissertativa"},{value:"preenchimento",label:"Preenchimento de Lacunas"}],kn=[{value:"smart",label:"Inteligente (Auto-H\xEDbrido)"},{value:"command",label:"Apenas Comando (Seguro)"},{value:"javascript",label:"Apenas JS Nativo (Avan\xE7ado)"}],Tt=class{host;shadow;callbacks;autopilot;floatingAnswers;initialSettings;isCollapsed=!1;activeTab="resolver";isBusy=!1;stopwatchInterval=null;stopwatchStartTime=0;latestPlan=null;latestContext=null;latestImages=[];latestImageDescriptions=[];latestPromptText="";metricsLiveTime;metricsLiveStatus;metricsTotalBadge;metricTotalTime;metricAvgTime;metricTotalCount;metricsHistoryList;metricsHistoryCount;metricsCopyBtn;metricsResetBtn;currentQuestionStartTime=0;questionLiveTimerInterval=null;liveDebugTerminal;dbgModel;dbgLatency;dbgSplitTokens;dbgTotalTokens;dbgErrorCard;dbgErrorText;dbgPromptLen;dbgPromptView;dbgContextView;dbgRawRespView;dbgCountAll;dbgCountError;dbgCountAi;dbgCountDom;logEntries=[];activeLogFilter="all";autoScrollLogs=!0;lastErrorMsg=null;terminalCmdHistory=[];terminalCmdHistoryIdx=-1;terminalMode="terminal";_wallpaperRAF=0;_wlpWhiteLogo=null;_terminalInited=!1;liveTerminalOutput=null;terminalInputEl=null;outputSearchQuery="";outputSortNewest=!0;_reconnectContextbarBtns=()=>{};_autopilotAnalyzingShown=!1;progressContainer;progressBar;progressLabel;progressVal;contextTreeContainer;launcherBtn;launcherDot;dockToggleBtn;sidebarEl;apToggleBtn;apConsole;executionConsole;dotPulseAp;statusTextAp;stopwatchAp;dotPulseAdv;statusTextAdv;stopwatchAdv;inspModel;inspLatency;inspTokens;inspPrompt;inspRationale;inspActions;copyPromptBtn=null;apiKeyInput;keyContextMenu;_ctxPopup=null;_ctxCloseH=null;keyMoreBtn;keysListEl;keysBadgeEl;modelSelect;modeSelect;engineSelect;dryRunCheckbox;autoApplyCheckbox;autoAdvanceCheckbox;hostDarkModeCheckbox;useVisionCheckbox;toastStackingCheckbox;showTokensCheckbox;soundFeedbackCheckbox;compactModeCheckbox;glowEffectsCheckbox;languageHintSelect;autoScrollLogsCheckbox;analyzeBtn;applyBtn=null;resultContainer;constructor(e,t){this.initialSettings=e,this.callbacks=t,this.autopilot=new qt({onStatusChange:(l,u,h)=>{this.logToConsole(u,h),l==="analyzing"?this._autopilotAnalyzingShown||(this._autopilotAnalyzingShown=!0,this.setBusy(!0,"Autopilot: IA analisando...")):l==="advancing"||l==="waiting"?(this._autopilotAnalyzingShown=!1,this.setBusy(!1),this.updateAutopilotUi(!0)):l==="idle"?(this._autopilotAnalyzingShown=!1,this.setBusy(!1),this.updateAutopilotUi(!1),u.includes("conclus\xE3o")||u.includes("finalizada")||u.includes("Parab\xE9ns")?this.setStatus("Atividade conclu\xEDda. Resolver Autopilot finalizado com sucesso.","success"):this.setStatus("Resolver Autopilot pausado e aguardando nova a\xE7\xE3o.","info")):l==="error"&&(this._autopilotAnalyzingShown=!1,this.setBusy(!1),this.updateAutopilotUi(!1),this.setStatus("Resolver Autopilot interrompido por erro.","error"))},onRequestAnalysis:async(l,u)=>{try{return await this.callbacks.onAnalyze(l,u,!0)||null}catch{return null}},isManualModeActive:()=>this.floatingAnswers?.isOpen()??!1,onPageAdvance:()=>{this.floatingAnswers?.hide()}}),this.host=document.createElement("div"),this.host.id="easyquiz-shadow-root",this.host.style.position="fixed",this.host.style.top="0",this.host.style.left="0",this.host.style.width="100vw",this.host.style.height="100vh",this.host.style.zIndex="2147483647",this.host.style.pointerEvents="none",this.shadow=this.host.attachShadow({mode:"open"}),Cn(this.shadow,`
      <svg width="0" height="0" style="position:absolute;">
        <defs>
          <linearGradient id="geminiGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#4285F4"/>
            <stop offset="50%" stop-color="#9B72CB"/>
            <stop offset="100%" stop-color="#D96570"/>
          </linearGradient>
        </defs>
      </svg>
      <style>${Io}</style>

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
                <span class="eq-brand-version">${Ie}</span>
                <span id="eq-active-model-badge" style="display:none; font-size:9px; font-weight:700; padding:1px 5px; border-radius:3px; background:rgba(251,191,36,0.14); border:1px solid rgba(251,191,36,0.4); color:#fbbf24; letter-spacing:0.04em; white-space:nowrap;"></span>
              </div>
              <div class="eq-header-tools">
                <button class="eq-icon-btn" id="eq-min-btn" type="button" title="Minimizar (Alt+Q)">${k.chevronRight}</button>
                <button class="eq-icon-btn" id="eq-close-btn" type="button" title="Fechar">${k.close}</button>
              </div>
            </header>

            <!-- Context Topbar: padronizado em todas as abas -->
            <div id="eq-tab-contextbar" style="display:flex;align-items:center;justify-content:space-between;padding:7px 12px;background:rgba(255,255,255,0.025);border-bottom:1px solid rgba(255,255,255,0.06);flex-shrink:0;min-height:30px;">
              <div style="display:flex;align-items:center;gap:8px;">
                <span id="eq-ctxbar-icon" style="display:inline-flex;color:#aaa;opacity:0.7;"></span>
                <span id="eq-ctxbar-name" style="font-size:11px;font-weight:700;color:#ccc;letter-spacing:0.02em;"></span>
                <span id="eq-ctxbar-sub" style="font-size:9px;color:#444;font-weight:500;"></span>
              </div>
              <div id="eq-ctxbar-actions" style="display:flex;align-items:center;gap:4px;"></div>
            </div>

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
                      <div class="eq-brand-subline">BETA \u2022 ${Ie}</div>
                    </div>
                  </div>
                </div>

                <!-- CTA: Autopilot + 3-dot as SEPARATE standalone buttons -->
                <div class="eq-cta-wrapper">
                  <button class="eq-resolve-primary" id="eq-analyze-btn" type="button">
                    <span class="eq-btn-icon">${k.sparkles}</span>
                    <span class="eq-btn-label">Resolver Autopilot</span>
                    <span class="eq-btn-shimmer" aria-hidden="true"></span>
                  </button>
                  <!-- 3-dot shell: button + floating menu as siblings -->
                  <div class="eq-menu-shell">
                    <button class="eq-resolve-menu" id="eq-auto-menu-btn" type="button" aria-label="Mais op\xE7\xF5es" title="Mais op\xE7\xF5es">
                      <span class="eq-btn-icon">${k.moreVertical}</span>
                    </button>
                    <div class="eq-ctx" id="eq-auto-menu" hidden>
                      <button type="button" class="eq-ctx-item" data-auto-action="toggle">
                        <span class="eq-ctx-icon">${k.sparkles}</span>
                        <span>Resolver Autopilot</span>
                      </button>
                      <button type="button" class="eq-ctx-item" data-auto-action="memory">
                        <span class="eq-ctx-icon">${k.eraser}</span>
                        <span>Limpar mem\xF3ria</span>
                      </button>
                      <button type="button" class="eq-ctx-item" data-auto-action="status">
                        <span class="eq-ctx-icon">${k.info}</span>
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
                    <span class="eq-result-toggle-icon">${k.chevronRight}</span>
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
                    <button class="eq-btn-secondary" id="eq-open-hud-btn" type="button">${k.list} Abrir respostas dispon\xEDveis</button>
                  </div>
                </div>

                <!-- Console Terminal Oculto (Apenas para Autopilot Interno) -->
                <div class="eq-terminal" id="eq-ap-console" style="display: none;"></div>
                <div class="eq-terminal eq-terminal-execution" id="eq-execution-console" style="display: none;"></div>
                
                <div class="eq-footer-note" style="margin-top: auto;">${Ie} \u2022 H\xEDbrido 4.0 (RAG + AST + Vision)</div>
              </div>

              <!-- TAB 2: C\xC9REBRO DA IA \u2014 VS Code Explorer -->
              <div class="eq-view-pane eq-brain-pane" id="eq-view-brain" style="display: none;">
                <!-- Toolbar -->
                <!-- Toolbar buttons hidden -->
                <div style="display:none"><button id="eq-brain-canvas-toggle"></button><button id="eq-copy-prompt-btn"></button></div>
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

                <span id="eq-metrics-total-badge" style="display:none">0 QUEST\xD5ES</span>
                <!-- Cron\xF4metro ao vivo -->
                <div style="padding:14px 14px 10px;border-bottom:1px solid rgba(255,255,255,0.05);flex-shrink:0;background:transparent;">
                  <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;">
                    <span style="font-size:9px;font-weight:700;letter-spacing:0.12em;color:#555;">QUEST\xC3O ATUAL</span>
                    <span id="eq-metrics-live-status" style="font-size:9px;padding:2px 8px;border-radius:8px;background:rgba(255,255,255,0.06);color:#666;font-weight:600;">Em espera</span>
                  </div>
                  <div id="eq-metrics-live-time" style="font-size:36px;font-weight:800;letter-spacing:-0.02em;color:#fff;font-variant-numeric:tabular-nums;line-height:1;font-family:monospace;">00:00.00</div>
                  <div style="font-size:9px;color:#444;margin-top:5px;">Cron\xF4metro em tempo real \xB7 zero tokens consumidos</div>
                </div>

                <!-- Cards de resumo (3 col) -->
                <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:rgba(255,255,255,0.05);flex-shrink:0;">
                  <div style="background:transparent;padding:10px 12px;display:flex;flex-direction:column;gap:3px;">
                    <div style="font-size:9px;color:#555;font-weight:600;letter-spacing:0.06em;">TEMPO TOTAL</div>
                    <div id="eq-metric-total-time" style="font-size:20px;font-weight:800;color:#e0e0e0;font-variant-numeric:tabular-nums;font-family:monospace;">00:00</div>
                    <div style="font-size:9px;color:#444;">Sess\xE3o atual</div>
                  </div>
                  <div style="background:transparent;padding:10px 12px;display:flex;flex-direction:column;gap:3px;">
                    <div style="font-size:9px;color:#555;font-weight:600;letter-spacing:0.06em;">M\xC9DIA / Q.</div>
                    <div id="eq-metric-avg-time" style="font-size:20px;font-weight:800;color:#4ade80;font-variant-numeric:tabular-nums;font-family:monospace;">0.0s</div>
                    <div style="font-size:9px;color:#444;">Ritmo m\xE9dio</div>
                  </div>
                  <div style="background:transparent;padding:10px 12px;display:flex;flex-direction:column;gap:3px;">
                    <div style="font-size:9px;color:#555;font-weight:600;letter-spacing:0.06em;">RESPONDIDAS</div>
                    <div id="eq-metric-total-count" style="font-size:20px;font-weight:800;color:#fbbf24;font-variant-numeric:tabular-nums;font-family:monospace;">0</div>
                    <div style="font-size:9px;color:#444;">Quest\xF5es OK</div>
                  </div>
                </div>

                <div style="display:none"><button id="eq-metrics-copy-btn" type="button"></button><button id="eq-metrics-reset-btn" type="button"></button></div>

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
              <div class="eq-view-pane" id="eq-view-debug" style="display:none;flex-direction:column;">
                <span id="eq-debug-badge" style="display:none">ATIVO</span>

                <!-- Output toolbar \u2014 only in Output mode (mode pill is in contextbar) -->
                <div id="eq-output-toolbar" style="display:none;align-items:center;gap:5px;padding:5px 10px;background:#080808;border-bottom:1px solid #161616;flex-shrink:0;">
                  <div style="position:relative;display:inline-flex;">
                    <button id="eq-output-filter-btn" type="button" style="display:inline-flex;align-items:center;gap:4px;height:24px;font-size:9.5px;font-weight:600;padding:0 9px;border-radius:5px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);color:#777;cursor:pointer;font-family:'Cascadia Code','Fira Code',monospace;white-space:nowrap;"><span id="eq-output-filter-label">Filtro: Todos</span><span style="display:inline-flex;width:10px;height:10px;color:#444;transform:rotate(90deg);">${k.chevronRight}</span></button>
                    <div id="eq-output-filter-menu" style="display:none;position:absolute;top:calc(100% + 5px);left:0;z-index:9999;background:rgba(8,8,14,0.72);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:5px;min-width:172px;box-shadow:0 12px 32px rgba(0,0,0,0.75);">
                      <div style="padding:3px 8px 4px;font-size:8px;font-weight:700;letter-spacing:0.1em;color:#333;font-family:monospace;">CATEGORIAS</div>
                      <label class="eq-filter-lbl" id="eq-filter-opt-all"   style="display:flex;align-items:center;gap:7px;padding:5px 10px;cursor:pointer;border-radius:5px;transition:background 0.08s;" onmouseover="this.style.background='rgba(255,255,255,0.05)'" onmouseout="this.style.background='transparent'"><input type="checkbox" id="eq-fchk-all"   checked style="accent-color:#aaa;cursor:pointer;"> <span style="display:inline-flex;width:12px;height:12px;color:#777;">${k.list}</span>     <span style="font-size:10px;color:#aaa;font-family:monospace;">Todos</span>    <span id="eq-dbg-count-all"   style="margin-left:auto;color:#333;font-size:8px;font-family:monospace;">0</span></label>
                      <label class="eq-filter-lbl" id="eq-filter-opt-error" style="display:flex;align-items:center;gap:7px;padding:5px 10px;cursor:pointer;border-radius:5px;transition:background 0.08s;" onmouseover="this.style.background='rgba(255,85,85,0.08)'"   onmouseout="this.style.background='transparent'"><input type="checkbox" id="eq-fchk-error"         style="accent-color:#ff5555;cursor:pointer;"> <span style="display:inline-flex;width:12px;height:12px;color:#ff5555;">${k.info}</span>    <span style="font-size:10px;color:#aaa;font-family:monospace;">Erros</span>    <span id="eq-dbg-count-error" style="margin-left:auto;color:#333;font-size:8px;font-family:monospace;">0</span></label>
                      <label class="eq-filter-lbl" id="eq-filter-opt-ai"    style="display:flex;align-items:center;gap:7px;padding:5px 10px;cursor:pointer;border-radius:5px;transition:background 0.08s;" onmouseover="this.style.background='rgba(96,165,250,0.08)'"  onmouseout="this.style.background='transparent'"><input type="checkbox" id="eq-fchk-ai"           style="accent-color:#60a5fa;cursor:pointer;"> <span style="display:inline-flex;width:12px;height:12px;color:#60a5fa;">${k.sparkles}</span> <span style="font-size:10px;color:#aaa;font-family:monospace;">IA</span>       <span id="eq-dbg-count-ai"    style="margin-left:auto;color:#333;font-size:8px;font-family:monospace;">0</span></label>
                      <label class="eq-filter-lbl" id="eq-filter-opt-dom"   style="display:flex;align-items:center;gap:7px;padding:5px 10px;cursor:pointer;border-radius:5px;transition:background 0.08s;" onmouseover="this.style.background='rgba(74,222,128,0.06)'"  onmouseout="this.style.background='transparent'"><input type="checkbox" id="eq-fchk-dom"          style="accent-color:#4ade80;cursor:pointer;"> <span style="display:inline-flex;width:12px;height:12px;color:#4ade80;">${k.code}</span>    <span style="font-size:10px;color:#aaa;font-family:monospace;">DOM/Exec</span> <span id="eq-dbg-count-dom"   style="margin-left:auto;color:#333;font-size:8px;font-family:monospace;">0</span></label>
                    </div>
                  </div>
                  <button id="eq-output-sort-btn" type="button" title="Ordenar" style="display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);border-radius:5px;color:#aaa;cursor:pointer;flex-shrink:0;transition:color 0.12s;"><span id="eq-sort-arrow" style="display:inline-flex;width:13px;height:13px;transform:rotate(270deg);transition:transform 0.2s;">${k.chevronRight}</span></button>
                  <div style="flex:1;display:flex;align-items:center;gap:5px;background:#0d0d0d;border:1px solid #1a1a1a;border-radius:5px;padding:0 8px;height:24px;"><input id="eq-output-search" type="text" placeholder="buscar logs..." autocomplete="off" style="flex:1;background:transparent;border:none;outline:none;color:#777;font-size:9.5px;font-family:'Cascadia Code','Fira Code',monospace;caret-color:#555;" /><button id="eq-output-search-clear" type="button" style="display:none;background:transparent;border:none;color:#333;cursor:pointer;font-size:9px;padding:0;line-height:1;">\u2715</button></div>
                  <button id="eq-dbg-scroll-toggle" type="button" title="Auto-scroll: ativo" style="display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.18);border-radius:5px;color:#ddd;cursor:pointer;flex-shrink:0;font-size:12px;font-weight:700;">\u2913</button>
                </div>

                <!-- TERMINAL MODE \u2014 True terminal, no input bar -->
                <div id="eq-term-panel-terminal" style="flex:1;display:flex;flex-direction:column;overflow:hidden;min-height:0;position:relative;">
                  <!-- Click position cursor -->
                  <div id="eq-click-cursor" style="position:absolute;pointer-events:none;display:none;z-index:10;background:rgba(255,255,255,0.75);mix-blend-mode:difference;"></div>
                  <canvas id="eq-term-sel-canvas" style="position:absolute;top:0;left:0;pointer-events:none;z-index:8;mix-blend-mode:difference;opacity:1;"></canvas>
                  <!-- Hidden textarea captures keyboard input -->
                  <textarea id="eq-term-capture" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" style="position:absolute;left:-9999px;top:-9999px;width:1px;height:1px;opacity:0;pointer-events:none;resize:none;border:none;outline:none;"></textarea>
                  <!-- Output area: all lines + current prompt at bottom -->
                  <div id="eq-term-output" style="flex:1;overflow-y:auto;overflow-x:hidden;padding:10px 14px 6px;font-family:'Cascadia Code','Fira Code','Courier New',monospace;font-size:11.5px;line-height:1.65;background:transparent;color:#ddd;user-select:text;-webkit-user-select:text;cursor:text;outline:none;caret-color:transparent;position:relative;z-index:9;">
                    


                                        <div data-perm="1" style="display:inline-block;user-select:none;margin-bottom:8px;max-width:100%;">
                      <div style="display:inline-flex;align-items:center;gap:14px;padding:12px 18px;outline:1px solid #1e1e1e;outline-offset:-1px;border-radius:3px;">
                        <img src="${k.canvasLogo}" alt="EQ" style="width:48px;height:auto;opacity:0.5;filter:brightness(0) invert(1);" />
                        <div>
                          <div style="font-family:'Cascadia Code','Fira Code','Courier New',monospace;font-size:15px;font-weight:800;color:#3a3a3a;letter-spacing:0.14em;line-height:1;">EASYQUIZ</div>
                          <div style="font-family:'Cascadia Code','Fira Code','Courier New',monospace;font-size:10px;color:#555;font-weight:600;letter-spacing:0.06em;margin-top:4px;">Terminal \xB7 Motor H\xEDbrido 4.0</div>
                          <div style="font-family:'Cascadia Code','Fira Code','Courier New',monospace;font-size:9px;color:#2a2a2a;margin-top:5px;letter-spacing:0.04em;">${Ie} &nbsp;\xB7&nbsp; RAG &middot; AST &middot; VISION &middot; MULTIMODAL</div>
                        </div>
                      </div>
                    </div>
                    <div data-perm="1" style="font-family:'Cascadia Code','Fira Code','Courier New',monospace;font-size:10px;color:#2a2a2a;padding:2px 0 8px;">Digite <span style="color:#555;font-weight:700;">help</span> <span style="color:#222;">para listar comandos dispon\xEDveis</span></div>
                    <!-- Current input line \u2014 always last -->
                    <div id="eq-term-current-line" style="display:flex;align-items:baseline;overflow:hidden;flex-shrink:0;"><span style="color:#fff;font-weight:700;user-select:none;">EasyQuiz_Legacy:&nbsp;</span><span id="eq-term-typed" style="color:#e0e0e0;"></span><span class="eq-term-cursor"></span></div>
                  </div>
                </div>

                <!-- OUTPUT MODE -->
                <div id="eq-term-panel-output" style="flex:1;display:none;flex-direction:column;overflow:hidden;min-height:0;">
                  <div class="eq-terminal" id="eq-live-debug-terminal" style="flex:1;font-family:'Cascadia Code','Fira Code','Courier New',monospace;font-size:10.5px;background:transparent;overflow-y:auto;position:relative;z-index:1;padding:8px 14px;line-height:1.55;user-select:text;-webkit-user-select:text;color:#bbb;">
                    <div style="color:#333;">&gt; [SYS] Output de auditoria pronto.</div>
                  </div>
                </div>

                <!-- Error card -->
                <div class="eq-debug-error-card" id="eq-dbg-error-card" style="display:none;flex-shrink:0;">
                  <div class="eq-debug-error-header">
                    <span>\xDAltimo Erro</span>
                    <button class="eq-icon-btn" id="eq-dbg-copy-error-btn" type="button" title="Copiar" style="width:20px;height:20px;">${k.copy}</button>
                  </div>
                  <div class="eq-debug-error-msg" id="eq-dbg-error-text"></div>
                </div>

                <!-- Hidden API info elements -->
                <div style="display:none;">
                  <span id="eq-dbg-model">--</span>
                  <span id="eq-dbg-latency">--</span>
                  <span id="eq-dbg-total-tokens">--</span>
                  <span id="eq-dbg-split-tokens">--/--</span>
                  <span id="eq-dbg-prompt-len">--</span>
                </div>

              </div>

              <!-- TAB 4: CONFIGURA\xC7\xD5ES -->
              <div class="eq-view-pane" id="eq-view-settings" style="display: none; padding-top: 12px;">
                <!-- Topbar de Categorias -->
                <div class="eq-settings-topbar" id="eq-settings-topbar">
                  <button type="button" class="eq-settings-cat-btn active" data-cat="general" title="Geral">
                    ${k.settings}<span>Geral</span>
                  </button>
                  <button type="button" class="eq-settings-cat-btn" data-cat="tokens" title="Tokens API">
                    ${k.key}<span>Tokens</span>
                  </button>
                  <button type="button" class="eq-settings-cat-btn" data-cat="visual" title="Visual e Temas">
                    ${k.palette}<span>Visual</span>
                  </button>
                  <button type="button" class="eq-settings-cat-btn" data-cat="ai" title="IA e Modelos">
                    ${k.sparkles}<span>IA</span>
                  </button>
                  <button type="button" class="eq-settings-cat-btn" data-cat="system" title="Sistema e Motor">
                    ${k.cpu}<span>Sistema</span>
                  </button>
                  <button type="button" class="eq-settings-cat-btn" data-cat="about" title="Sobre">
                    ${k.info}<span>Sobre</span>
                  </button>
                </div>

                <!-- CATEGORIA: GERAL -->
                <div class="eq-settings-cat-content" id="eq-cat-general" style="display: flex; flex-direction: column;">
                  <div class="eq-cfg-row">
                    <div class="eq-cfg-label">
                      <span class="eq-cfg-label-title">${k.checkCircle} Auto Aplicar</span>
                      <span class="eq-cfg-label-desc">Aplica respostas automaticamente ap\xF3s a an\xE1lise.</span>
                    </div>
                    <label class="eq-toggle">
                      <input id="eq-auto-apply" type="checkbox" />
                      <div class="eq-toggle-track"><div class="eq-toggle-knob"></div></div>
                    </label>
                  </div>
                  
                  <div class="eq-cfg-row">
                    <div class="eq-cfg-label">
                      <span class="eq-cfg-label-title">${k.chevronRight} Auto Avan\xE7ar</span>
                      <span class="eq-cfg-label-desc">Clica em "Pr\xF3ximo" ou "Verificar" automaticamente ap\xF3s injetar.</span>
                    </div>
                    <label class="eq-toggle">
                      <input id="eq-auto-advance" type="checkbox" />
                      <div class="eq-toggle-track"><div class="eq-toggle-knob"></div></div>
                    </label>
                  </div>
                  
                  <div class="eq-cfg-row">
                    <div class="eq-cfg-label">
                      <span class="eq-cfg-label-title" style="color: var(--eq-warning);">${k.flask} Modo Dry-Run (Simula\xE7\xE3o)</span>
                      <span class="eq-cfg-label-desc">Analisa a quest\xE3o mas N\xC3O aplica a resposta no DOM.</span>
                    </div>
                    <label class="eq-toggle">
                      <input id="eq-dry-run" type="checkbox" />
                      <div class="eq-toggle-track"><div class="eq-toggle-knob"></div></div>
                    </label>
                  </div>
                  
                  <div class="eq-cfg-row">
                    <div class="eq-cfg-label">
                      <span class="eq-cfg-label-title">${k.moon} Dark Mode no Site Host</span>
                      <span class="eq-cfg-label-desc">For\xE7a inje\xE7\xE3o de CSS para escurecer o site hospedeiro (ex: Moodle).</span>
                    </div>
                    <label class="eq-toggle">
                      <input id="eq-host-dark" type="checkbox" />
                      <div class="eq-toggle-track"><div class="eq-toggle-knob"></div></div>
                    </label>
                  </div>
                  
                  <div class="eq-cfg-row">
                    <div class="eq-cfg-label">
                      <span class="eq-cfg-label-title">${k.bell} Notifica\xE7\xF5es Empilhadas</span>
                      <span class="eq-cfg-label-desc">Acumula hist\xF3rico de toasts (mensagens).</span>
                    </div>
                    <label class="eq-toggle">
                      <input id="eq-toast-stacking" type="checkbox" />
                      <div class="eq-toggle-track"><div class="eq-toggle-knob"></div></div>
                    </label>
                  </div>
                  
                  <div class="eq-cfg-row">
                    <div class="eq-cfg-label">
                      <span class="eq-cfg-label-title">${k.barChart} Exibir Uso de Tokens</span>
                      <span class="eq-cfg-label-desc">Mostra tokens consumidos da API no terminal.</span>
                    </div>
                    <label class="eq-toggle">
                      <input id="eq-show-tokens" type="checkbox" />
                      <div class="eq-toggle-track"><div class="eq-toggle-knob"></div></div>
                    </label>
                  </div>
                  
                  <div class="eq-cfg-row">
                    <div class="eq-cfg-label">
                      <span class="eq-cfg-label-title">${k.volume} Feedback Sonoro</span>
                      <span class="eq-cfg-label-desc">Emite um bip curto ao completar a an\xE1lise.</span>
                    </div>
                    <label class="eq-toggle">
                      <input id="eq-sound-feedback" type="checkbox" />
                      <div class="eq-toggle-track"><div class="eq-toggle-knob"></div></div>
                    </label>
                  </div>
                  
                  <div class="eq-cfg-row">
                    <div class="eq-cfg-label">
                      <span class="eq-cfg-label-title">${k.minimize} Modo Compacto</span>
                      <span class="eq-cfg-label-desc">Reduz paddings e tamanho de fontes do painel.</span>
                    </div>
                    <label class="eq-toggle">
                      <input id="eq-compact-mode" type="checkbox" />
                      <div class="eq-toggle-track"><div class="eq-toggle-knob"></div></div>
                    </label>
                  </div>
                </div>

                <!-- CATEGORIA: TOKENS -->
                <div class="eq-settings-cat-content" id="eq-cat-tokens" style="display: none; flex-direction: column; gap: 12px;">
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-size: 12px; font-weight: 600;">Chaves de API (Gemini)</span>
                    <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" style="color: var(--eq-accent); text-decoration: none; font-size: 10px; font-weight: 800; letter-spacing: 0.05em; text-transform: uppercase;">+ Obter Chave \u2197</a>
                  </div>
                  
                  <!-- Formul\xE1rio de Adi\xE7\xE3o de Nova Chave -->
                  <div class="eq-key-input-container">
                    <div class="eq-input-wrap">
                      <span class="eq-input-prefix-icon">${k.key}</span>
                      <input id="eq-api-key" class="eq-input" type="password" placeholder="AIzaSy..." autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" />
                      <button class="eq-icon-btn" id="eq-key-save" type="button" title="Adicionar Chave">${k.plus}</button>
                      <button class="eq-icon-btn" id="eq-key-more-btn" type="button" title="Mais Op\xE7\xF5es das Chaves">${k.moreVertical}</button>
                    </div>
                  </div>

                  <!-- Lista Din\xE2mica de Chaves Cadastradas -->
                  <div id="eq-keys-list" class="eq-keys-list"></div>
                </div>

                <!-- CATEGORIA: VISUAL -->
                <div class="eq-settings-cat-content" id="eq-cat-visual" style="display: none; flex-direction: column;">
                  <div class="eq-section-title" style="margin-bottom: 4px;">Tema do Painel</div>
                  <div class="eq-theme-cards-grid" id="eq-theme-grid">
                    <!-- Themes will be generated by JS -->
                  </div>
                  
                  <div class="eq-section-title" style="margin-top: 16px;">Op\xE7\xF5es Visuais</div>
                  
                  <div class="eq-cfg-row">
                    <div class="eq-cfg-label">
                      <span class="eq-cfg-label-title">Efeitos de Brilho (Glow)</span>
                      <span class="eq-cfg-label-desc">Sombra colorida nos bot\xF5es principais.</span>
                    </div>
                    <label class="eq-toggle">
                      <input id="eq-glow-effects" type="checkbox" />
                      <div class="eq-toggle-track"><div class="eq-toggle-knob"></div></div>
                    </label>
                  </div>
                </div>

                <!-- CATEGORIA: IA -->
                <div class="eq-settings-cat-content" id="eq-cat-ai" style="display: none; flex-direction: column; gap: 12px;">
                  <div class="eq-field-group">
                    <div class="eq-section-title">Modelo de Intelig\xEAncia Artificial</div>
                    <select id="eq-model-select" class="eq-select">
                      <option value="gemini-3.5-flash-lite">Gemini 3.5 Flash Lite</option>
                      <option value="gemini-3.5-flash">Gemini 3.5 Flash</option>
                      <option value="gemini-3.5-pro">Gemini 3.5 Pro</option>
                    </select>
                  </div>
                  
                  <div class="eq-field-group">
                    <div class="eq-section-title">Dica do Modo de Quest\xE3o</div>
                    <select id="eq-mode-select" class="eq-select"></select>
                  </div>
                  
                  <div class="eq-field-group">
                    <div class="eq-section-title">Dica de Idioma da Resposta</div>
                    <select id="eq-language-hint" class="eq-select">
                      <option value="auto">Auto-Detectar</option>
                      <option value="pt">Portugu\xEAs</option>
                      <option value="en">English</option>
                      <option value="es">Espa\xF1ol</option>
                      <option value="fr">Fran\xE7ais</option>
                    </select>
                  </div>
                  
                  <div class="eq-cfg-row" style="margin-top: 8px;">
                    <div class="eq-cfg-label">
                      <span class="eq-cfg-label-title">${k.image} Vis\xE3o Computacional</span>
                      <span class="eq-cfg-label-desc">Permite a IA capturar e analisar imagens e gr\xE1ficos da quest\xE3o na tela.</span>
                    </div>
                    <label class="eq-toggle">
                      <input id="eq-use-vision" type="checkbox" />
                      <div class="eq-toggle-track"><div class="eq-toggle-knob"></div></div>
                    </label>
                  </div>
                </div>

                <!-- CATEGORIA: SISTEMA -->
                <div class="eq-settings-cat-content" id="eq-cat-system" style="display: none; flex-direction: column; gap: 12px;">
                  <div class="eq-field-group">
                    <div class="eq-section-title">Motor de Execu\xE7\xE3o (DOM)</div>
                    <select id="eq-engine-select" class="eq-select"></select>
                  </div>
                  
                  <div class="eq-cfg-row">
                    <div class="eq-cfg-label">
                      <span class="eq-cfg-label-title">${k.list} Auto Scroll nos Logs</span>
                      <span class="eq-cfg-label-desc">Rola o terminal para o final automaticamente.</span>
                    </div>
                    <label class="eq-toggle">
                      <input id="eq-auto-scroll-logs" type="checkbox" />
                      <div class="eq-toggle-track"><div class="eq-toggle-knob"></div></div>
                    </label>
                  </div>
                  
                  <div class="eq-section-title" style="margin-top: 12px;">Dados Locais</div>
                  <div style="display: flex; gap: 8px;">
                    <button type="button" class="eq-btn-secondary" id="eq-export-config-btn" style="flex: 1;">${k.download} Exportar</button>
                    <button type="button" class="eq-btn-secondary" id="eq-import-config-btn" style="flex: 1;">${k.upload} Importar</button>
                  </div>
                  <input type="file" id="eq-import-file" accept=".json" style="display: none;" />
                  
                  <div class="eq-section-title" style="color: #ff5555; margin-top: 12px;">Zona de Risco</div>
                  <button class="eq-btn-secondary" id="eq-reset-all-btn" type="button" style="border-color: rgba(255,85,85,0.3); color: #ff8888; background: rgba(255,85,85,0.05);">
                    ${k.trash} Resetar Todos os Dados e Mem\xF3ria
                  </button>
                </div>
                
                <!-- CATEGORIA: SOBRE -->
                <div class="eq-settings-cat-content" id="eq-cat-about" style="display: none; flex-direction: column; gap: 16px; align-items: center; justify-content: center; padding-top: 20px;">
                  <div style="text-align: center;">
                    <div style="font-size: 24px; font-weight: 800; color: var(--eq-text-bright); letter-spacing: -0.5px;">EasyQuiz <span style="color: var(--eq-accent);">Legacy</span></div>
                    <div style="font-size: 11px; color: var(--eq-muted); margin-top: 2px;">Vers\xE3o: ${Ie}</div>
                  </div>
                  
                  <div style="display: flex; flex-direction: column; gap: 8px; width: 100%;">
                    <a href="https://github.com/minifoxie/EasyQuiz" target="_blank" class="eq-btn-secondary" style="text-decoration: none; display: flex; justify-content: center; border: 1px solid var(--eq-border);">${k.github} Reposit\xF3rio Oficial \u2197</a>
                  </div>
                  
                  <div style="font-size: 10px; color: var(--eq-muted); text-align: center; margin-top: 20px; opacity: 0.6;">
                    MIT License &copy; minifoxie<br/>
                    Constru\xEDdo com TypeScript & Web Components
                  </div>
                </div>

                <div class="eq-footer-note" style="margin-top: auto; padding-top: 16px; border-top: 1px solid var(--eq-border);">Configura\xE7\xF5es salvas localmente no navegador</div>
              </div>
            </div>
          </main>
        </aside>
    `),this.launcherBtn=this.shadow.querySelector(".eq-launcher"),this.launcherDot=this.shadow.querySelector("#eq-launcher-dot"),this.dockToggleBtn=this.shadow.querySelector("#eq-dock-toggle"),this.sidebarEl=this.shadow.querySelector(".eq-sidebar"),this.apToggleBtn=this.shadow.querySelector("#eq-ap-toggle-btn"),this.apConsole=this.shadow.querySelector("#eq-ap-console"),this.executionConsole=this.shadow.querySelector("#eq-execution-console"),this.progressContainer=this.shadow.querySelector("#eq-progress-container"),this.progressBar=this.shadow.querySelector("#eq-progress-bar"),this.progressLabel=this.shadow.querySelector("#eq-progress-label"),this.progressVal=this.shadow.querySelector("#eq-progress-val"),this.contextTreeContainer=this.shadow.querySelector("#eq-tree-container"),this.dotPulseAp=this.shadow.querySelector("#eq-dot-ap"),this.statusTextAp=this.shadow.querySelector("#eq-status-text-ap")||this.shadow.querySelector("#eq-status-summary")||this.dotPulseAp,this.stopwatchAp=this.shadow.querySelector("#eq-stopwatch-ap span"),this.dotPulseAdv=this.dotPulseAp,this.statusTextAdv=this.statusTextAp,this.stopwatchAdv=this.stopwatchAp,this.inspModel=this.shadow.querySelector("#eq-insp-model"),this.inspLatency=this.shadow.querySelector("#eq-insp-latency"),this.inspTokens=this.shadow.querySelector("#eq-insp-tokens"),this.inspPrompt=this.shadow.querySelector("#eq-insp-prompt"),this.inspRationale=this.shadow.querySelector("#eq-insp-rationale"),this.inspActions=this.shadow.querySelector("#eq-insp-actions"),this.copyPromptBtn=this.shadow.querySelector("#eq-copy-prompt-btn"),this.liveDebugTerminal=this.shadow.querySelector("#eq-live-debug-terminal"),this.dbgModel=this.shadow.querySelector("#eq-dbg-model"),this.dbgLatency=this.shadow.querySelector("#eq-dbg-latency"),this.dbgSplitTokens=this.shadow.querySelector("#eq-dbg-split-tokens"),this.dbgTotalTokens=this.shadow.querySelector("#eq-dbg-total-tokens"),this.dbgErrorCard=this.shadow.querySelector("#eq-dbg-error-card"),this.dbgErrorText=this.shadow.querySelector("#eq-dbg-error-text"),this.dbgPromptLen=this.shadow.querySelector("#eq-dbg-prompt-len"),this.dbgPromptView=this.shadow.querySelector("#eq-dbg-prompt-view"),this.dbgContextView=this.shadow.querySelector("#eq-dbg-context-view"),this.dbgRawRespView=this.shadow.querySelector("#eq-dbg-raw-resp-view"),this.dbgCountAll=this.shadow.querySelector("#eq-dbg-count-all"),this.dbgCountError=this.shadow.querySelector("#eq-dbg-count-error"),this.dbgCountAi=this.shadow.querySelector("#eq-dbg-count-ai"),this.dbgCountDom=this.shadow.querySelector("#eq-dbg-count-dom"),this.apiKeyInput=this.shadow.querySelector("#eq-api-key"),this.keyContextMenu=this.shadow.querySelector("#eq-key-context-menu"),this.keyMoreBtn=this.shadow.querySelector("#eq-key-more-btn"),this.keysListEl=this.shadow.querySelector("#eq-keys-list"),this.keysBadgeEl=this.shadow.querySelector("#eq-keys-badge"),this.modelSelect=this.shadow.querySelector("#eq-model-select"),this.modeSelect=this.shadow.querySelector("#eq-mode-select"),this.engineSelect=this.shadow.querySelector("#eq-engine-select"),this.dryRunCheckbox=this.shadow.querySelector("#eq-dry-run"),this.autoApplyCheckbox=this.shadow.querySelector("#eq-auto-apply"),this.autoAdvanceCheckbox=this.shadow.querySelector("#eq-auto-advance"),this.hostDarkModeCheckbox=this.shadow.querySelector("#eq-host-dark"),this.useVisionCheckbox=this.shadow.querySelector("#eq-use-vision"),this.toastStackingCheckbox=this.shadow.querySelector("#eq-toast-stacking"),this.showTokensCheckbox=this.shadow.querySelector("#eq-show-tokens"),this.soundFeedbackCheckbox=this.shadow.querySelector("#eq-sound-feedback"),this.compactModeCheckbox=this.shadow.querySelector("#eq-compact-mode"),this.glowEffectsCheckbox=this.shadow.querySelector("#eq-glow-effects"),this.languageHintSelect=this.shadow.querySelector("#eq-language-hint"),this.autoScrollLogsCheckbox=this.shadow.querySelector("#eq-auto-scroll-logs"),this.analyzeBtn=this.shadow.querySelector("#eq-analyze-btn"),this.applyBtn=this.shadow.querySelector("#eq-apply-btn"),this.applyBtn&&(this.applyBtn.disabled=!0),this.resultContainer=this.shadow.querySelector("#eq-result"),this.floatingAnswers=new kt(this.shadow,()=>{this.callbacks.onAnalyze(1)});let n=this.shadow.querySelector("#eq-open-hud-btn");n&&n.addEventListener("click",()=>{this.latestPlan&&this.floatingAnswers.show(this.latestPlan)}),Re.filter(l=>ce(l.id)).forEach(l=>this.modelSelect.add(new Option(l.name,l.id,!1,l.id===e.model))),qn.forEach(l=>this.modeSelect.add(new Option(l.label,l.value,!1,l.value===e.modeHint))),kn.forEach(l=>this.engineSelect.add(new Option(l.label,l.value,!1,l.value===e.engine))),this.apiKeyInput.value=e.apiKey,this.dryRunCheckbox.checked=e.dryRun,this.autoApplyCheckbox.checked=e.autoApply,this.autoAdvanceCheckbox.checked=e.autoAdvance,this.hostDarkModeCheckbox.checked=e.hostDarkMode,this.useVisionCheckbox.checked=e.useVision,this.toastStackingCheckbox.checked=e.toastStacking??!0,this.showTokensCheckbox&&(this.showTokensCheckbox.checked=e.showTokenUsage??!0),this.soundFeedbackCheckbox&&(this.soundFeedbackCheckbox.checked=e.enableSoundFeedback??!1),this.compactModeCheckbox&&(this.compactModeCheckbox.checked=e.compactMode??!1),this.glowEffectsCheckbox&&(this.glowEffectsCheckbox.checked=e.glowEffects??!1),this.languageHintSelect&&(this.languageHintSelect.value=e.languageHint??"auto"),this.autoScrollLogsCheckbox&&(this.autoScrollLogsCheckbox.checked=e.autoScrollLogs??!0),this.metricsLiveTime=this.shadow.querySelector("#eq-metrics-live-time"),this.metricsLiveStatus=this.shadow.querySelector("#eq-metrics-live-status"),this.metricsTotalBadge=this.shadow.querySelector("#eq-metrics-total-badge"),this.metricTotalTime=this.shadow.querySelector("#eq-metric-total-time"),this.metricAvgTime=this.shadow.querySelector("#eq-metric-avg-time"),this.metricTotalCount=this.shadow.querySelector("#eq-metric-total-count"),this.metricsHistoryList=this.shadow.querySelector("#eq-metrics-history-list"),this.metricsHistoryCount=this.shadow.querySelector("#eq-metrics-history-count"),this.metricsCopyBtn=this.shadow.querySelector("#eq-metrics-copy-btn"),this.metricsResetBtn=this.shadow.querySelector("#eq-metrics-reset-btn"),this.setupEventListeners(),this.updateTimingMetrics(),this.mountHost(),this.applyHostDarkMode(e.hostDarkMode);let a=(()=>{try{return localStorage.getItem("easyquiz_theme")||""}catch{return""}})()||e.theme||"mega-black";this.shadow.host.setAttribute("data-eq-theme",a),this.shadow.host.setAttribute("data-eq-glow",String(e.glowEffects??!1));let r=Array.isArray(e.apiKeys)&&e.apiKeys.length>0?e.apiKeys:e.apiKey?[e.apiKey]:[];U.init(r),this.apiKeyInput.value=U.getBestKey()||e.apiKey||"",this.renderKeysList();let s=window.setInterval(()=>{this.activeTab==="settings"&&this.renderKeysList()},1e3);typeof s?.unref=="function"&&s.unref();let d=U.getBestKey()||e.apiKey;d&&ct(d).then(l=>{l&&l.length>0&&this.updateModelSelect(l,e.model)}).catch(()=>{})}switchTab(e){this.activeTab=e;let t=["resolver","brain","media","metrics","debug","settings"];this.shadow.querySelector(".eq-views-wrapper")?.classList.toggle("is-brain-active",e==="brain");for(let i of t){let a=this.shadow.querySelector(`#eq-tab-${i}`),r=this.shadow.querySelector(`#eq-view-${i}`),s=i===e;a?.classList.toggle("active",s),r&&(r.style.display=s?"flex":"none")}switch(this.updateContextBar(e),e){case"brain":this.initBrainControls(),this.renderContextTree(),this.refreshInspectorView();break;case"metrics":try{this.updateTimingMetrics()}catch{}break;case"debug":this.terminalMode="terminal";try{this.refreshDebugView(),this.renderTerminalEntries(),this.initTerminalREPL(),this.initTerminalWallpaper()}catch{}break;case"settings":try{this.renderThemeGrid()}catch{}break}}updateContextBar(e){let t=this.shadow.querySelector("#eq-ctxbar-icon"),n=this.shadow.querySelector("#eq-ctxbar-name"),i=this.shadow.querySelector("#eq-ctxbar-sub"),a=this.shadow.querySelector("#eq-ctxbar-actions");if(!t||!n||!i||!a)return;a.innerHTML="";let s={resolver:{icon:k.sparkles,label:"Resolver",sub:"Autopilot & opera\xE7\xF5es",color:"#a78bfa",actions:()=>{let d=document.createElement("span");return d.id="eq-ctxbar-status",d.style.cssText="font-size:9px;font-weight:700;padding:2px 7px;border-radius:10px;background:rgba(167,139,250,0.13);border:1px solid rgba(167,139,250,0.25);color:#a78bfa;letter-spacing:0.04em;",d.textContent="PRONTO",[d]}},brain:{icon:k.inspector,label:"C\xE9rebro da IA",sub:"Contexto & inspe\xE7\xE3o",color:"#60a5fa",actions:()=>{let d=this.shadow.querySelector("#eq-brain-canvas-toggle"),l=document.createElement("button");l.style.cssText="display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);border-radius:4px;cursor:pointer;color:#888;",l.innerHTML=this.brainCanvasHidden?k.eyeOff:k.eye,l.title="Mostrar/Ocultar canvas",l.addEventListener("click",()=>{d?.click(),l.innerHTML=this.brainCanvasHidden?k.eyeOff:k.eye});let u=document.createElement("button");return u.style.cssText="display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);border-radius:4px;cursor:pointer;color:#888;",u.innerHTML=k.copy,u.title="Copiar conte\xFAdo selecionado",u.addEventListener("click",()=>this.smartCopy()),[l,u]}},metrics:{icon:k.clock,label:"M\xE9tricas",sub:"Cron\xF4metro & hist\xF3rico",color:"#4ade80",actions:()=>{let d=document.createElement("button");d.style.cssText="display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);border-radius:4px;cursor:pointer;color:#888;",d.innerHTML=k.copy,d.title="Copiar relat\xF3rio",d.addEventListener("click",()=>this.copyMetricsReport());let l=document.createElement("button");return l.style.cssText="display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;background:rgba(255,85,85,0.07);border:1px solid rgba(255,85,85,0.13);border-radius:4px;cursor:pointer;color:#ff5555;",l.innerHTML=k.trash,l.title="Zerar m\xE9tricas",l.addEventListener("click",()=>{this.shadow.querySelector("#eq-metrics-reset-btn")?.click()}),[d,l]}},debug:{icon:k.code,label:"Terminal",sub:"Comandos & logs",color:"#0098ff",actions:()=>{let d=document.createElement("div");d.style.cssText="display:inline-flex;align-items:center;gap:1px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:4px;padding:2px;";let l=(c,m,p)=>{let g=document.createElement("button");return g.id=c,g.type="button",g.textContent=m,g.style.cssText="font-size:9px;font-weight:600;padding:2px 8px;border-radius:3px;cursor:pointer;transition:all 0.1s;background:"+(p?"#1a1a1a":"transparent")+";border:1px solid "+(p?"#333":"transparent")+";color:"+(p?"#ddd":"#555")+";",g};d.appendChild(l("eq-term-mode-terminal","Terminal",!0)),d.appendChild(l("eq-term-mode-output","Output",!1));let u=document.createElement("button");u.id="eq-term-copy-btn",u.type="button",u.title="Copiar",u.style.cssText="display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:4px;cursor:pointer;color:#888;",u.innerHTML=k.copy;let h=document.createElement("button");return h.id="eq-term-clear-btn",h.type="button",h.title="Limpar",h.style.cssText="display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;background:rgba(255,85,85,0.07);border:1px solid rgba(255,85,85,0.13);border-radius:4px;cursor:pointer;color:#ff5555;",h.innerHTML=k.trash,[d,u,h]}},settings:{icon:k.settings,label:"Configura\xE7\xF5es",sub:"Ajustes & prefer\xEAncias",color:"#fbbf24"}}[e];if(s&&(t.innerHTML=s.icon,t.style.color=s.color,n.textContent=s.label,n.style.color=s.color==="#a78bfa"?"#ccc":"#ddd",i.textContent=s.sub,s.actions))for(let d of s.actions())a.appendChild(d)}setupSettingsTabs(){let e=this.shadow.querySelectorAll(".eq-settings-cat-btn"),t=this.shadow.querySelectorAll(".eq-settings-cat-content");e.forEach(n=>{n.addEventListener("click",i=>{let a=i.currentTarget,r=a.dataset.cat;if(!r)return;e.forEach(d=>d.classList.remove("active")),t.forEach(d=>d.style.display="none"),a.classList.add("active");let s=this.shadow.querySelector(`#eq-cat-${r}`);s&&(s.style.display="flex")})}),this.renderThemeGrid()}renderThemeGrid(){let e=this.shadow.querySelector("#eq-theme-grid");if(!e)return;let t=[{id:"mega-black",name:"Mega Black",color:"#000000",border:"rgba(255,255,255,0.14)"},{id:"dark",name:"Dark",color:"#1c1c22",border:"rgba(255,255,255,0.1)"},{id:"purple-neon",name:"Purple Neon",color:"#120824",border:"rgba(160,80,255,0.3)"},{id:"gray-blue",name:"Gray Blue",color:"#282b30",border:"rgba(88,101,242,0.22)"},{id:"light",name:"Light",color:"#ffffff",border:"rgba(0,0,0,0.1)"}],n=localStorage.getItem("easyquiz_theme")||"mega-black";this.shadow.host.setAttribute("data-eq-theme",n),e.innerHTML=t.map(i=>`
      <div class="eq-theme-card ${i.id===n?"active":""}" data-theme-id="${i.id}">
        <div class="eq-theme-card-preview" style="background:${i.color};border-color:${i.border}">
          <div class="eq-theme-card-preview-bar" style="border-right:1px solid ${i.border}"></div>
          <div class="eq-theme-card-preview-main">
            <div class="eq-theme-card-preview-line" style="width:80%;"></div>
            <div class="eq-theme-card-preview-line" style="width:40%;"></div>
          </div>
        </div>
        <div class="eq-theme-card-label">${i.name}</div>
      </div>
    `).join(""),e.querySelectorAll(".eq-theme-card").forEach(i=>{i.addEventListener("click",a=>{let r=a.currentTarget,s=r.dataset.themeId;s&&(localStorage.setItem("easyquiz_theme",s),this.shadow.host.setAttribute("data-eq-theme",s),e.querySelectorAll(".eq-theme-card").forEach(d=>d.classList.remove("active")),r.classList.add("active"),this.setStatus(`Tema atualizado para ${s}`,"info"))})})}setupEventListeners(){this.shadow.querySelector("#eq-tab-resolver")?.addEventListener("click",()=>this.switchTab("resolver")),setTimeout(()=>this.updateContextBar(this.activeTab||"resolver"),0),this.shadow.querySelector("#eq-tab-brain")?.addEventListener("click",()=>this.switchTab("brain")),this.shadow.querySelector("#eq-tab-metrics")?.addEventListener("click",()=>this.switchTab("metrics")),this.shadow.querySelector("#eq-tab-debug")?.addEventListener("click",()=>this.switchTab("debug")),this.shadow.querySelector("#eq-tab-settings")?.addEventListener("click",()=>this.switchTab("settings")),this.setupSettingsTabs();let e=this.shadow.querySelector("#eq-status-card");e?.addEventListener("click",()=>{let x=e.classList.toggle("is-collapsed");e.setAttribute("aria-expanded",String(!x))}),this.metricsResetBtn?.addEventListener("click",()=>{Ke(),this.stopQuestionTimer(0),this.currentQuestionStartTime=0,this.metricsLiveTime&&(this.metricsLiveTime.textContent="00:00.00"),this.metricsLiveStatus&&(this.metricsLiveStatus.textContent="Em espera",this.metricsLiveStatus.classList.remove("active")),this.updateTimingMetrics(),this.logToConsole("> [SYS] M\xE9tricas e hist\xF3rico de tempo zerados com sucesso.","text-yellow")}),this.metricsCopyBtn?.addEventListener("click",()=>{this.copyMetricsReport()}),this.shadow.querySelector("#eq-dbg-filter-all")?.addEventListener("click",()=>this.setLogFilter("all")),this.shadow.querySelector("#eq-dbg-filter-error")?.addEventListener("click",()=>this.setLogFilter("error")),this.shadow.querySelector("#eq-dbg-filter-ai")?.addEventListener("click",()=>this.setLogFilter("ai")),this.shadow.querySelector("#eq-dbg-filter-dom")?.addEventListener("click",()=>this.setLogFilter("dom"));let t=this.shadow.querySelector("#eq-dbg-copy-logs");t?.addEventListener("click",()=>{let x=this.getFormattedLogs();navigator.clipboard.writeText(x).then(()=>{let H=t.innerHTML;t.innerHTML=k.check,setTimeout(()=>t.innerHTML=H,1800)})}),this.shadow.querySelector("#eq-dbg-clear-logs")?.addEventListener("click",()=>{this.clearLogs()});let n=this.shadow.querySelector("#eq-dbg-copy-prompt");n?.addEventListener("click",()=>{let x=this.latestPromptText||this.latestPlan?.promptSent||"";navigator.clipboard.writeText(x).then(()=>{let H=n.innerHTML;n.innerHTML=`${k.check} Copiado!`,setTimeout(()=>n.innerHTML=H,1800)})});let i=this.shadow.querySelector("#eq-dbg-copy-context");i?.addEventListener("click",()=>{let x=this.dbgContextView?.textContent||"";navigator.clipboard.writeText(x).then(()=>{let H=i.innerHTML;i.innerHTML=`${k.check} Copiado!`,setTimeout(()=>i.innerHTML=H,1800)})});let a=this.shadow.querySelector("#eq-dbg-copy-raw-resp");a?.addEventListener("click",()=>{let x=this.latestPlan?.rawResponse||this.dbgRawRespView?.textContent||"";navigator.clipboard.writeText(x).then(()=>{let H=a.innerHTML;a.innerHTML=`${k.check} Copiado!`,setTimeout(()=>a.innerHTML=H,1800)})});let r=this.shadow.querySelector("#eq-dbg-copy-error-btn");r?.addEventListener("click",()=>{let x=this.lastErrorMsg||"";navigator.clipboard.writeText(x).then(()=>{let H=r.innerHTML;r.innerHTML=k.check,setTimeout(()=>r.innerHTML=H,1800)})}),this.shadow.querySelector("#eq-refresh-context-btn")?.addEventListener("click",()=>{this.renderContextTree()}),this.launcherBtn.addEventListener("click",()=>this.toggle()),this.dockToggleBtn.addEventListener("click",()=>this.toggle()),window.addEventListener("keydown",x=>{x.altKey&&(x.key==="q"||x.key==="Q"||x.key==="a"||x.key==="A")&&(x.preventDefault(),this.toggle())},!0);let s=x=>{let H=x.composedPath();H.includes(this.shadow)||(H.includes(this.sidebarEl)||H.includes(this.host))&&x.stopImmediatePropagation()};window.addEventListener("keydown",s,!0),window.addEventListener("keyup",s,!0),window.addEventListener("keypress",s,!0),this.apiKeyInput.addEventListener("input",()=>{let x=this.apiKeyInput.value.trim().replace(/^["']|["']$/g,"");this.callbacks.onSettingsChange({apiKey:x})});let d=this.shadow.querySelector("#eq-keys-collapsible"),l=this.shadow.querySelector("#eq-keys-chevron"),u=this.shadow.querySelector("#eq-keys-section-header"),h=x=>{d&&(x?(d.style.display="none",l&&(l.style.transform="rotate(0deg)")):(d.style.display="block",d.style.maxHeight="none",d.style.overflow="visible",l&&(l.style.transform="rotate(90deg)")))},c=!1;try{c=localStorage.getItem("easyquiz_keys_collapsed")==="true"}catch{}h(c),u?.addEventListener("click",x=>{if(x.target?.closest("a"))return;let H=d?.style.display==="none";h(!H);try{localStorage.setItem("easyquiz_keys_collapsed",H?"false":"true")}catch{}});let m=this.shadow.querySelector("#eq-auto-menu-btn"),p=this.shadow.querySelector("#eq-auto-menu");p&&(p.hidden=!0),m?.classList.remove("is-open"),m?.addEventListener("click",x=>{if(x.stopPropagation(),!!p){if(this._ctxPopup){this.closeCtxPopup(),m.classList.remove("is-open");return}m.classList.add("is-open"),this.showCtxPopup(m,[{ic:"sparkles",label:"Resolver Autopilot",onClick:()=>{m.classList.remove("is-open"),p.querySelector('[data-auto-action="toggle"]')?.click()}},{ic:"eraser",label:"Limpar mem\xF3ria",onClick:()=>{m.classList.remove("is-open"),p.querySelector('[data-auto-action="memory"]')?.click()}},{ic:"info",label:"Mostrar status",onClick:()=>{m.classList.remove("is-open"),p.querySelector('[data-auto-action="status"]')?.click()}}])}}),p?.querySelectorAll("[data-auto-action]").forEach(x=>{x.addEventListener("click",H=>{H.stopPropagation();let B=x.dataset.autoAction;B==="toggle"?this.analyzeBtn?.click():B==="memory"?(rt(),this.logToConsole("> [SYS] Mem\xF3ria contextual limpa com sucesso.","text-green"),this.setStatus("Mem\xF3ria contextual da sess\xE3o limpa.","success")):B==="status"&&this.shadow.querySelector("#eq-status-card")?.scrollIntoView({behavior:"smooth",block:"nearest"}),p&&(p.hidden=!0),m?.classList.remove("is-open")})}),this.shadow.addEventListener("click",x=>{x.target.closest(".eq-menu-shell")||(p&&(p.hidden=!0),m?.classList.remove("is-open"))});let g=this.shadow.querySelector("#eq-result-toggle"),f=this.shadow.querySelector("#eq-result-body");g&&f&&(f.classList.add("is-collapsed"),g.classList.remove("is-open"),g.addEventListener("click",()=>{let x=g.classList.toggle("is-open");f.classList.toggle("is-collapsed",!x)})),this.shadow.querySelector("#eq-key-save")?.addEventListener("click",()=>{let x=this.apiKeyInput.value.trim().replace(/^["']|["']$/g,"");if(!x){this.setStatus("Insira o valor da chave antes de adicionar.","warning");return}let H=U.addKey(x);if(H.ok){let B=U.exportRawKeys();this.callbacks.onSettingsChange({apiKey:B[0],apiKeys:B}),this.apiKeyInput.value="",this.setStatus(` Nova chave adicionada com sucesso! (${B.length} chaves ativas no pool)`,"success"),h(!1);try{localStorage.setItem("easyquiz_keys_collapsed","false")}catch{}this.renderKeysList(),this.keyContextMenu.hidden=!0,dt(x).then(R=>{R.ok?(U.markSuccess(x,100),this.setStatus(" Nova chave validada com sucesso no Google AI Studio!","success")):(U.markInvalid(x,R.message),this.setStatus(`\uFE0F Chave cadastrada, mas aviso retornado: ${R.message}`,"warning")),this.renderKeysList()}).catch(()=>{})}else this.setStatus(H.message,"warning")}),this.shadow.addEventListener("click",x=>{let H=x.target;!H.closest("#eq-key-context-menu")&&!H.closest("#eq-key-more-btn")&&(this.keyContextMenu.hidden=!0)});let v=()=>{this.keyContextMenu.hidden=!0;let x=window.prompt("Adicionar Nova Chave API do Google Gemini (AI Studio):");if(x!==null&&x.trim()){let H=x.trim().replace(/^["']|["']$/g,""),B=U.addKey(H);if(B.ok){let R=U.exportRawKeys();this.callbacks.onSettingsChange({apiKey:R[0],apiKeys:R}),this.setStatus("Chave Gemini adicionada com sucesso!","success"),this.renderKeysList()}else this.setStatus(B.message,"warning")}},y=async()=>{this.keyContextMenu.hidden=!0;try{let x=await navigator.clipboard.readText();if(x){let H=x.trim().replace(/^["']|["']$/g,"");this.apiKeyInput.value=H,this.setStatus('Chave colada no campo. Clique no bot\xE3o "+" para adicionar ao pool.',"info")}}catch{let x=window.prompt("Adicionar Nova Chave API do Google Gemini:");if(x!==null&&x.trim()){let H=x.trim().replace(/^["']|["']$/g,"");if(U.addKey(H).ok){let R=U.exportRawKeys();this.callbacks.onSettingsChange({apiKey:R[0],apiKeys:R}),this.setStatus("Chave Gemini adicionada com sucesso!","success"),this.renderKeysList()}}}},E=()=>{this.keyContextMenu.hidden=!0;let x=this.apiKeyInput.type==="password";this.apiKeyInput.type=x?"text":"password";let H=this.shadow.querySelector("#eq-menu-vis-icon"),B=this.shadow.querySelector("#eq-menu-vis-text");H&&(H.innerHTML=x?k.eyeOff:k.eye),B&&(B.textContent=x?"Ocultar Campo":"Mostrar Campo")},w=()=>{this.keyContextMenu.hidden=!0,this.apiKeyInput.value="",this.setStatus("Campo de inser\xE7\xE3o limpo.","info"),this.apiKeyInput.focus()},q=()=>{this.keyContextMenu.hidden=!0,this.shadow.querySelector("#eq-bulk-overlay")?.remove();let x=document.createElement("div");x.id="eq-bulk-overlay",x.style.cssText=["position:fixed","inset:0","z-index:2147483647","pointer-events:auto","background:rgba(0,0,0,0.78)","backdrop-filter:blur(4px)","-webkit-backdrop-filter:blur(4px)","display:flex","align-items:center","justify-content:center",'font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif',"user-select:text","-webkit-user-select:text"].join(";");let H=document.createElement("div");H.style.cssText=["background:#11151c","color:#e2e8f0","border:1px solid #283548","border-radius:12px","padding:20px","width:440px","max-width:92vw","font-size:13px","box-shadow:0 12px 40px rgba(0,0,0,0.85), 0 0 0 1px rgba(0,229,255,0.15)","display:flex","flex-direction:column","gap:10px","pointer-events:auto"].join(";"),H.innerHTML=`
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
      `,x.appendChild(H),this.shadow.appendChild(x);let B=H.querySelector("#eq-bulk-ta"),R=H.querySelector("#eq-bulk-status"),X=H.querySelector("#eq-bulk-import"),V=H.querySelector("#eq-bulk-paste-btn"),J=H.querySelector("#eq-bulk-clear-btn");requestAnimationFrame(()=>B?.focus());let G=()=>{x.remove()};["keydown","keyup","keypress","paste","copy","cut"].forEach(Z=>{x.addEventListener(Z,Y=>{Y.stopPropagation(),Y.stopImmediatePropagation()},!0)}),x.addEventListener("keydown",Z=>{Z.key==="Escape"&&G()}),x.addEventListener("click",Z=>{Z.target===x&&G()}),H.querySelector("#eq-bulk-x")?.addEventListener("click",G),H.querySelector("#eq-bulk-cancel")?.addEventListener("click",G),J.addEventListener("click",()=>{B.value="",R.textContent="",B.focus()}),V.addEventListener("click",async()=>{try{let Z=await navigator.clipboard?.readText();Z?(B.value=Z,B.focus(),R.style.color="#38bdf8",R.textContent="Conte\xFAdo colado da \xE1rea de transfer\xEAncia com sucesso!"):(R.style.color="#fbbf24",R.textContent="\xC1rea de transfer\xEAncia vazia ou sem permiss\xE3o de leitura.")}catch{R.style.color="#fbbf24",R.textContent="Permiss\xE3o de clipboard negada pelo navegador. Use Ctrl+V diretamente na caixa.",B.focus()}}),H.querySelector("#eq-bulk-import")?.addEventListener("click",async()=>{let Z=B.value.trim();if(!Z){R.style.color="#f87171",R.textContent="Insira pelo menos uma chave de API antes de importar.";return}let Y=Z.match(/AIza[0-9A-Za-z\-_]{35}/g),oe=[];if(Y&&Y.length>0?oe=Array.from(new Set(Y)):oe=Array.from(new Set(Z.split(/[\n,;\s]+/).map(be=>be.trim().replace(/^["'`]|["'`]$/g,"")).filter(be=>be.length>=20))),oe.length===0){R.style.color="#f87171",R.textContent="Nenhuma chave v\xE1lida encontrada (m\xEDnimo 20 caracteres).";return}R.style.color="#00e5ff",R.textContent=`Processando ${oe.length} chave(s)...`,X.disabled=!0,X.style.opacity="0.6";let de=0,ke=0;for(let be of oe){let at=U.addKey(be);at.ok?de++:at.message.includes("j\xE1 est\xE1 cadastrada")&&ke++}if(de>0){let be=U.exportRawKeys();this.callbacks.onSettingsChange({apiKey:be[0],apiKeys:be}),h(!1);try{localStorage.setItem("easyquiz_keys_collapsed","false")}catch{}}R.textContent=`${de} adicionada(s), ${ke} duplicada(s). Validando modelo em paralelo...`;let nt=U.exportRawKeys(),we=this.modelSelect?.value||"gemini-3.5-flash-lite",Be=await Bt(we,nt);Be.ok?(U.markSuccess(Be.key,200),R.style.color="#4ade80",R.textContent=` ${de} adicionada(s), ${ke} duplicada(s). Modelo '${Be.model}' pronto!`):(R.style.color="#fbbf24",R.textContent=`${de} adicionada(s), ${ke} duplicada(s). Aviso: ${Be.message}`),this.renderKeysList(),X.disabled=!1,X.style.opacity="1",de>0&&(this.setStatus(` Lote importado: ${de} chave(s) adicionada(s) ao pool!`,"success"),setTimeout(G,2200))})},C=()=>{this.keyContextMenu.hidden=!0,this.shadow.querySelector("#eq-text-editor-overlay")?.remove();let x=U.exportRawKeys(),H=document.createElement("div");H.id="eq-text-editor-overlay",H.style.cssText=["position:fixed","inset:0","z-index:2147483647","pointer-events:auto","background:rgba(0,0,0,0.82)","backdrop-filter:blur(4px)","-webkit-backdrop-filter:blur(4px)","display:flex","align-items:center","justify-content:center",'font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif'].join(";");let B=document.createElement("div");B.style.cssText=["background:#11151c","color:#e2e8f0","border:1px solid #283548","border-radius:12px","padding:20px","width:460px","max-width:94vw","font-size:13px","box-shadow:0 12px 40px rgba(0,0,0,0.85),0 0 0 1px rgba(0,229,255,0.15)","display:flex","flex-direction:column","gap:10px","pointer-events:auto"].join(";"),B.innerHTML=`
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
      `,H.appendChild(B),this.shadow.appendChild(H);let R=B.querySelector("#eq-edittext-ta"),X=B.querySelector("#eq-edittext-status");R.value=x.join(`
`),requestAnimationFrame(()=>{R.focus(),R.select()});let V=()=>H.remove();["keydown","keyup","keypress","paste","copy","cut"].forEach(J=>{H.addEventListener(J,G=>{G.stopPropagation(),G.stopImmediatePropagation()},!0)}),H.addEventListener("keydown",J=>{J.key==="Escape"&&V()}),H.addEventListener("click",J=>{J.target===H&&V()}),B.querySelector("#eq-edittext-x")?.addEventListener("click",V),B.querySelector("#eq-edittext-cancel")?.addEventListener("click",V),B.querySelector("#eq-edittext-clear")?.addEventListener("click",()=>{confirm("Apagar todas as chaves? Esta a\xE7\xE3o \xE9 irrevers\xEDvel.")&&(R.value="",X.style.color="#fbbf24",X.textContent="Campo limpo. Clique em Salvar para confirmar a remo\xE7\xE3o de todas as chaves.")}),B.querySelector("#eq-edittext-save")?.addEventListener("click",()=>{let J=R.value.split(/[\n\r]+/).map(Y=>Y.trim().replace(/^["']|["']$/g,"")).filter(Y=>Y.length>5),G=Array.from(new Set(J));U.init(G);let Z=U.exportRawKeys();this.callbacks.onSettingsChange({apiKey:Z[0]||"",apiKeys:Z}),this.renderKeysList(),X.style.color="#4ade80",G.length===0?X.textContent=" Todas as chaves removidas.":X.textContent=` ${G.length} chave(s) salva(s) com sucesso!`,this.setStatus(G.length>0?` ${G.length} chave(s) salva(s)!`:"Todas as chaves foram removidas.",G.length>0?"success":"info"),setTimeout(V,1400)})},L=()=>{this.keyContextMenu.hidden=!0;let x=U.getAllKeys();if(x.length===0)return this.setStatus("Nenhuma chave para apagar.","info");confirm(`Apagar todas as ${x.length} chave(s) permanentemente?`)&&(U.init([]),this.callbacks.onSettingsChange({apiKey:"",apiKeys:[]}),this.renderKeysList(),this.setStatus("Todas as chaves foram removidas.","info"))},A=async()=>{this.keyContextMenu.hidden=!0;let x=U.getAllKeys();if(x.length===0)return this.setStatus("Nenhuma chave cadastrada para testar.","error");this.setStatus(` Testando ${x.length} chave(s) em paralelo...`,"info");let H=this.modelSelect?.value||"gemini-3.5-flash-lite",B=x.map(X=>X.key),R=await Bt(H,B);if(R.ok)U.markSuccess(R.key,150),this.setStatus(` Validado! Modelo '${R.model}' respondeu com sucesso!`,"success");else{let X=await Promise.allSettled(B.map(J=>dt(J))),V=0;X.forEach((J,G)=>{if(J.status==="fulfilled"&&J.value.ok)V++,U.markSuccess(B[G],200);else{let Z=J.status==="fulfilled"?J.value.message:String(J.reason);U.markInvalid(B[G],Z)}}),this.setStatus(`Teste: ${V}/${x.length} chave(s) v\xE1lidas. ${R.message}`,V>0?"info":"error")}this.renderKeysList()},P=()=>{this.keyContextMenu.hidden=!0,window.confirm("Deseja realmente resetar todos os dados, chaves e mem\xF3ria de sess\xE3o do EasyQuiz?")&&(this.autopilot.isActive()&&this.autopilot.stop(),this.updateAutopilotUi(!1),this.setBusy(!1),_t(),Ke(),this.stopQuestionTimer(0),this.currentQuestionStartTime=0,this.metricsLiveTime&&(this.metricsLiveTime.textContent="00:00.00"),this.metricsLiveStatus&&(this.metricsLiveStatus.textContent="Em espera",this.metricsLiveStatus.className="eq-live-stopwatch-status"),this.updateTimingMetrics(),this.apiKeyInput.value="",this.callbacks.onSettingsChange({apiKey:""}),this.setStatus("Todos os dados do EasyQuiz foram limpos.","info"),this.logToConsole("> [SYS] Armazenamento local resetado.","text-yellow"))};this.shadow.querySelector("#eq-reset-all-btn")?.addEventListener("click",P),this.keyMoreBtn.addEventListener("click",x=>{if(x.stopPropagation(),this._ctxPopup){this.closeCtxPopup();return}this.showCtxPopup(this.keyMoreBtn,[{ic:"edit",label:"Inserir via Janela Nativa",badge:"Bypass",onClick:()=>v()},{ic:"paste",label:"Colar da \xC1rea de Transfer\xEAncia",onClick:()=>y()},{ic:"eye",label:"Mostrar/Ocultar Campo",onClick:()=>E()},{ic:"eraser",label:"Limpar Campo",onClick:()=>w()},{ic:"upload",label:"Importar Chaves em Lote",onClick:()=>q()},{ic:"code",label:"Ver/Editar Chaves como Texto",onClick:()=>C()},{ic:"zap",label:"Testar Todas as Chaves",onClick:()=>A()},{divider:!0,label:"",onClick:()=>{}},{ic:"trash",label:"Apagar Todas as Chaves",danger:!0,onClick:()=>L()},{ic:"refreshCw",label:"Resetar Todos os Dados",danger:!0,onClick:()=>P()}])}),this.apToggleBtn?.addEventListener("click",()=>{if(this.autopilot.isActive())this.autopilot.stop(),this.callbacks.onCancel?.(),this.setProgress(0),this.updateAutopilotUi(!1),this.setInterrupted("Autopilot interrompido imediatamente pelo usu\xE1rio.");else{if(!this.apiKeyInput.value.trim().replace(/^["']|["']$/g,"")){this.setStatus("Configure sua chave de API Gemini na aba Configura\xE7\xF5es antes de ligar o Autopilot.","error"),this.switchTab("settings"),this.apiKeyInput.focus();return}this.callbacks.onSettingsChange({autoApply:!0,autoAdvance:!0}),this.autoApplyCheckbox.checked=!0,this.autoAdvanceCheckbox.checked=!0,Rt(),this.autopilot.start(),this.updateAutopilotUi(!0),this.startStopwatch(),this.setStatus("Autopilot ativo. Monitorando exerc\xEDcios...","info")}}),this.shadow.querySelector("#eq-ap-clear-memory")?.addEventListener("click",()=>{rt(),this.logToConsole("> [SYS] Mem\xF3ria contextual limpa com sucesso.","text-green"),this.setStatus("Mem\xF3ria contextual da sess\xE3o limpa.","success")});let T=this.shadow.querySelector("#eq-copy-console-btn");T?.addEventListener("click",()=>{let x=this.apConsole?.innerText||"";navigator.clipboard.writeText(x).then(()=>{let H=T.innerHTML;T.innerHTML=k.check,setTimeout(()=>T.innerHTML=H,1800)})}),this.copyPromptBtn?.addEventListener("click",()=>{let x=this.inspPrompt.textContent||"";navigator.clipboard.writeText(x).then(()=>{if(!this.copyPromptBtn)return;let H=this.copyPromptBtn.innerHTML;this.copyPromptBtn.innerHTML=`${k.check} Copiado!`,setTimeout(()=>{this.copyPromptBtn&&(this.copyPromptBtn.innerHTML=H)},2e3)})}),this.modelSelect.addEventListener("change",()=>this.callbacks.onSettingsChange({model:this.modelSelect.value})),this.modeSelect.addEventListener("change",()=>this.callbacks.onSettingsChange({modeHint:this.modeSelect.value})),this.engineSelect.addEventListener("change",()=>this.callbacks.onSettingsChange({engine:this.engineSelect.value})),this.dryRunCheckbox.addEventListener("change",()=>this.callbacks.onSettingsChange({dryRun:this.dryRunCheckbox.checked})),this.autoApplyCheckbox.addEventListener("change",()=>this.callbacks.onSettingsChange({autoApply:this.autoApplyCheckbox.checked})),this.autoAdvanceCheckbox.addEventListener("change",()=>this.callbacks.onSettingsChange({autoAdvance:this.autoAdvanceCheckbox.checked})),this.useVisionCheckbox.addEventListener("change",()=>{let x=this.useVisionCheckbox.checked;this.callbacks.onSettingsChange({useVision:x}),this.setStatus(x?"Vis\xE3o Computacional ativada (capturas habilitadas).":"Modo DOM R\xE1pido ativado (capturas desabilitadas).","info")}),this.hostDarkModeCheckbox.addEventListener("change",()=>{let x=this.hostDarkModeCheckbox.checked;this.callbacks.onSettingsChange({hostDarkMode:x}),this.applyHostDarkMode(x)}),this.toastStackingCheckbox?.addEventListener("change",()=>this.callbacks.onSettingsChange({toastStacking:this.toastStackingCheckbox.checked})),this.showTokensCheckbox?.addEventListener("change",()=>this.callbacks.onSettingsChange({showTokenUsage:this.showTokensCheckbox.checked})),this.soundFeedbackCheckbox?.addEventListener("change",()=>this.callbacks.onSettingsChange({enableSoundFeedback:this.soundFeedbackCheckbox.checked})),this.compactModeCheckbox?.addEventListener("change",()=>this.callbacks.onSettingsChange({compactMode:this.compactModeCheckbox.checked})),this.glowEffectsCheckbox?.addEventListener("change",()=>{let x=this.glowEffectsCheckbox.checked;this.shadow.host.setAttribute("data-eq-glow",String(x)),this.callbacks.onSettingsChange({glowEffects:x})}),this.languageHintSelect?.addEventListener("change",()=>this.callbacks.onSettingsChange({languageHint:this.languageHintSelect.value})),this.autoScrollLogsCheckbox?.addEventListener("change",()=>this.callbacks.onSettingsChange({autoScrollLogs:this.autoScrollLogsCheckbox.checked})),this.analyzeBtn?.addEventListener("click",async()=>{if(this.analyzeBtn.classList.contains("danger")){this.autopilot.stop(),this.callbacks.onCancel?.(),this.setProgress(0),this.updateAutopilotUi(!1),this.setBusy(!1),this.setInterrupted("Resolver Autopilot interrompido pelo usu\xE1rio.");return}if(!(U.getBestKey()||this.apiKeyInput.value.trim().replace(/^['"]|['"]$/g,""))){this.setStatus("Configure sua chave de API Gemini antes de ativar o Resolver Autopilot.","error"),this.switchTab("settings"),this.apiKeyInput.focus();return}this.callbacks.onSettingsChange({autoApply:!0,autoAdvance:!0}),this.autoApplyCheckbox.checked=!0,this.autoAdvanceCheckbox.checked=!0,Rt(),this.autopilot.start(),this.updateAutopilotUi(!0),this.startStopwatch(),this.setStatus("Resolver Autopilot ativo. Monitorando e respondendo...","info")}),this.applyBtn&&this.applyBtn.addEventListener("click",()=>this.callbacks.onApply())}startStopwatch(){this.stopStopwatch(),this.stopwatchStartTime=Date.now();let e=()=>{let t=((Date.now()-this.stopwatchStartTime)/1e3).toFixed(2)+"s";this.stopwatchAp&&(this.stopwatchAp.textContent=t),this.stopwatchAdv&&(this.stopwatchAdv.textContent=t)};e(),this.stopwatchInterval=setInterval(e,100)}stopStopwatch(e){if(this.stopwatchInterval&&(clearInterval(this.stopwatchInterval),this.stopwatchInterval=null),e!==void 0){let t=(e/1e3).toFixed(2)+"s";this.stopwatchAp&&(this.stopwatchAp.textContent=t),this.stopwatchAdv&&(this.stopwatchAdv.textContent=t)}}setLogFilter(e){this.activeLogFilter=e;let t=["all","error","ai","dom"];for(let n of t){let i=this.shadow.querySelector(`#eq-dbg-filter-${n}`);n===e?i?.classList.add("active"):i?.classList.remove("active")}this.renderTerminalEntries()}updateLogCounters(){let e=0,t=0,n=0;for(let i of this.logEntries)i.category==="error"?e++:i.category==="ai"?t++:i.category==="dom"&&n++;this.dbgCountAll&&(this.dbgCountAll.textContent=String(this.logEntries.length)),this.dbgCountError&&(this.dbgCountError.textContent=String(e)),this.dbgCountAi&&(this.dbgCountAi.textContent=String(t)),this.dbgCountDom&&(this.dbgCountDom.textContent=String(n))}renderTerminalEntries(){if(!this.liveDebugTerminal)return;this.liveDebugTerminal.replaceChildren();let e=this.activeLogFilter==="all"?[...this.logEntries]:this.logEntries.filter(t=>t.category===this.activeLogFilter);if(this.outputSearchQuery){let t=this.outputSearchQuery.toLowerCase();e=e.filter(n=>n.message.toLowerCase().includes(t))}if(this.outputSortNewest||(e=e.reverse()),e.length===0){let t=document.createElement("div");t.style.cssText="color:#333;font-style:italic;white-space:pre-wrap;",t.textContent=this.outputSearchQuery?'Nenhum resultado para "'+this.outputSearchQuery+'".':'Nenhum log para o filtro "'+this.activeLogFilter.toUpperCase()+'".',this.liveDebugTerminal.appendChild(t);return}for(let t of e){let n=document.createElement("div");n.style.cssText="padding:1px 0;white-space:pre-wrap;overflow-wrap:break-word;word-break:break-word;max-width:100%;",n.textContent=t.message,t.colorClass&&(n.className=t.colorClass),this.liveDebugTerminal.appendChild(n)}this.autoScrollLogs&&(this.liveDebugTerminal.scrollTop=this.liveDebugTerminal.scrollHeight)}appendTerminalLine(e,t){if(!this.liveTerminalOutput)return;let n=this.shadow.querySelector("#eq-term-current-line"),i=document.createElement("div");i.style.cssText="padding:0;white-space:pre-wrap;overflow-wrap:break-word;",i.textContent=e;let a=t==="text-red"?"#ff4444":t==="text-blue"?"#888":t==="text-green"?"#aaa":t==="text-yellow"?"#888":"#ccc";for(i.style.color=a,n?this.liveTerminalOutput.insertBefore(i,n):this.liveTerminalOutput.appendChild(i);this.liveTerminalOutput.children.length>600;){let r=this.liveTerminalOutput.firstChild;if(r&&r!==n)this.liveTerminalOutput.removeChild(r);else break}this.liveTerminalOutput.scrollTop=this.liveTerminalOutput.scrollHeight}initTerminalREPL(){if(this.liveTerminalOutput=this.shadow.querySelector("#eq-term-output"),this._terminalInited){this._reconnectContextbarBtns();return}this._terminalInited=!0;let e=this.shadow.querySelector("#eq-term-capture"),t=this.shadow.querySelector("#eq-term-output"),n=this.shadow.querySelector("#eq-term-typed"),i=this.shadow.querySelector("#eq-term-current-line"),a=this.shadow.querySelector("#eq-term-panel-terminal"),r=this.shadow.querySelector("#eq-term-panel-output"),s=this.shadow.querySelector("#eq-output-toolbar"),d=this.shadow.querySelector("#eq-output-search"),l=this.shadow.querySelector("#eq-output-search-clear"),u=this.shadow.querySelector("#eq-output-filter-btn"),h=this.shadow.querySelector("#eq-output-filter-menu"),c=this.shadow.querySelector("#eq-fchk-apply"),m=(M,N="#888",D=13)=>`<span data-icon="1" aria-hidden="true" style="display:inline-flex;vertical-align:middle;width:${D}px;height:${D}px;color:${N};flex-shrink:0;isolation:isolate;">${k[M]||""}</span>`,p=(M,N="")=>{if(!t||!i)return;let D=document.createElement("div");D.style.cssText="padding:0;white-space:pre-wrap;overflow-wrap:break-word;word-break:break-word;max-width:100%;line-height:1.65;"+N,D.innerHTML=M,t.insertBefore(D,i)},g=(M,N="#cccccc")=>p(`<span style="color:${N};">${M}</span>`),f=()=>g("","#000"),b=(M=52)=>g("  "+"\u2500".repeat(M),"#222"),v=(M,N,D)=>{let S=M.map((F,K)=>F.padEnd(N[K]||0)),z=D?S.map((F,K)=>`<span style="color:${D[K]||"#aaa"}">${F}</span>`):S.map(F=>`<span style="color:#aaa">${F}</span>`);p("  "+z.join("  ")+"  ")},y=M=>{let N="";return M.childNodes.forEach(D=>{if(D.nodeType===Node.TEXT_NODE)N+=D.textContent||"";else if(D.nodeType===Node.ELEMENT_NODE){let S=D;S.dataset?.icon||(N+=y(S))}}),N},E=(M,N="#1a1a1a",D=2)=>{if(!t||!i){M();return}let S=i.previousSibling;M();let z=[],F=S?S.nextSibling:t.firstChild;for(;F&&F!==i;)z.push(F),F=F.nextSibling;if(!z.length)return;let K=document.createElement("div");K.style.cssText=`margin:${D}px 4px;outline:1px solid ${N};outline-offset:-1px;border-radius:3px;overflow:hidden;`,t.insertBefore(K,i),z.forEach(ee=>K.appendChild(ee))},w=M=>{let N=M.trim().replace(/\s+/g," ").split(" "),D=N[0].toLowerCase().replace(/[^a-z0-9\-]/g,"");switch(D){case"help":E(()=>{f(),p("  "+m("terminal","#555",14)+' <span style="color:#888;font-weight:700;letter-spacing:0.1em;font-size:10px;"> COMANDOS DO TERMINAL</span>'),f(),[["help","lista todos os comandos","list","#555"],["status","estado atual do sistema","sparkles","#555"],["version","vers\xE3o e info do build","info","#555"],["info-api","dados da \xFAltima requisi\xE7\xE3o \xE0 API","chip","#555"],["tokens","tokens consumidos (detalhado)","code","#555"],["context","contexto da quest\xE3o atual","eye","#555"],["controls","controles detectados (tabela)","list","#555"],["errors","erros recentes registrados","info","#555"],["logs [n]","\xFAltimas N entradas do output","file","#555"],["history","hist\xF3rico de quest\xF5es respondidas","clock","#555"],["reset","limpa logs e m\xE9tricas","eraser","#555"],["clear","limpa o terminal","trash","#555"],["copy","copia terminal para clipboard","copy","#555"]].forEach(([z,F,K,ee])=>{p(`    ${m(K,ee,11)} <span style="color:#aaa;font-weight:700;min-width:72px;display:inline-block;">${z}</span>  <span style="color:#444;">${F}</span>`)}),f(),g("  Dica: \u2191 \u2193 para hist\xF3rico de comandos","#1e1e1e"),f()},"#1a1a1a");break;case"clear":t&&i&&[...t.children].forEach(z=>{z!==i&&z.dataset?.perm!=="1"&&z.remove()});return;case"info-api":{let S=this.latestPlan;if(!S){f(),g("  Nenhuma requisi\xE7\xE3o \xE0 API ainda.","#333"),f();break}E(()=>{f(),p("  "+m("chip","#444",14)+' <span style="color:#777;font-weight:700;letter-spacing:0.08em;font-size:10px;"> API \u2014 \xDALTIMA REQUISI\xC7\xC3O</span>'),b(44);let z=(F,K,ee,ae,Fe="#888")=>p(`  ${m(F,K,11)}  <span style="color:#444;">${ee.padEnd(16)}</span><span style="color:${Fe};font-weight:600;">${ae||"--"}</span>`);z("sparkles","#555","Modelo",S?.usedModel||this.initialSettings?.model||"--","#bbb"),z("clock","#444","Lat\xEAncia",S?.durationMs?S.durationMs+"ms":"--","#888"),z("code","#444","Prompt tokens",String(S?.promptTokens??"--"),"#777"),z("code","#444","Resp. tokens",String(S?.candidatesTokens??"--"),"#777"),z("chip","#555","Total tokens",String(S?.tokensUsed??"--"),"#aaa"),z("file","#444","Prompt chars",this.latestPromptText?.length?this.latestPromptText.length+" chars":"--","#777"),f()},"#1a1a1a");break}case"version":E(()=>{f(),p("  "+m("sparkles","#555",14)+` <span style="color:#bbb;font-weight:700;letter-spacing:0.04em;"> EasyQuiz ${typeof Ie<"u"?Ie:"?"}</span>`),g("  Motor H\xEDbrido 4.0  \xB7  RAG \xB7 AST \xB7 Vision \xB7 Multimodal","#444"),g("  Build: "+new Date().toLocaleDateString("pt-BR"),"#2a2a2a"),f()},"#1a1a1a");break;case"status":{let S=this.latestPlan,z=this.latestContext;E(()=>{f(),p("  "+m("inspector","#444",14)+' <span style="color:#777;font-weight:700;letter-spacing:0.08em;font-size:10px;"> STATUS DO SISTEMA</span>'),b(44);let F=(Po,zo,Oo,Do,Bo="#aaa")=>p(`  ${m(Po,zo,11)}  <span style="color:#444;">${Oo.padEnd(14)}</span><span style="color:${Bo};font-weight:600;">${Do||"--"}</span>`);F("sparkles","#666","Modelo",S?.usedModel||this.initialSettings?.model||"--","#ccc");let K=S?.mode||"aguardando",ee=K==="aguardando"?"#444":K.includes("error")?"#7a3333":"#4a6a4a";F("play","#555","Modo",K,ee);let ae=S?.durationMs,Fe=ae?ae<1e3?"#4a6a4a":ae<3e3?"#888":"#7a5533":"#333";F("clock","#555","Lat\xEAncia",ae?ae+"ms":"--",Fe),F("chip","#555","Tokens",S?.tokensUsed?String(S.tokensUsed):"--","#aaa");let He=S?Math.round((S.confidence||0)*100):null,Ue=He?He>=80?"#4a6a4a":He>=50?"#888":"#7a5533":"#333";F("analyze","#555","Confian\xE7a",He!==null?He+"%":"--",Ue),F("eye","#555","Controles",z?String(z.controls.length):"--","#888"),z&&(b(44),g("  "+z.questionText.slice(0,56)+(z.questionText.length>56?"\u2026":""),"#333")),f()},"#1a1a1a");break}case"tokens":{let S=this.latestPlan;if(!S){f(),g("  Nenhuma requisi\xE7\xE3o ainda.","#333"),f();break}E(()=>{f(),p("  "+m("code","#444",14)+' <span style="color:#777;font-weight:700;letter-spacing:0.08em;font-size:10px;"> TOKENS \u2014 \xDALTIMA REQUISI\xC7\xC3O</span>'),b(38);let z=S.promptTokens||0,F=S.candidatesTokens||0,K=z+F||1,ee=Math.round(z/K*20),ae=20-ee;g(`  Prompt tokens    ${String(z).padStart(8)}   [${"\u2588".repeat(ee)}${"\u2591".repeat(ae)}]`,"#555"),g(`  Response tokens  ${String(F).padStart(8)}   [${"\u2591".repeat(ee)}${"\u2588".repeat(ae)}]`,"#555"),g("  "+"\u2508".repeat(46),"#1e1e1e"),g(`  Total            ${String(S.tokensUsed??"--").padStart(8)}`,"#aaa"),g(`  Lat\xEAncia         ${(S.durationMs?S.durationMs+"ms":"--").padStart(8)}`,"#444"),f()},"#1a1a1a");break}case"context":{let S=this.latestContext;if(!S){f(),g("  Contexto n\xE3o dispon\xEDvel.","#333"),f();break}E(()=>{f(),p("  "+m("eye","#444",14)+' <span style="color:#777;font-weight:700;letter-spacing:0.08em;font-size:10px;"> CONTEXTO ATUAL</span>'),b(44),g("  Escopo     "+S.scope.tagName.toLowerCase()+(S.scope.id?"#"+S.scope.id:""),"#666"),g("  Controles  "+S.controls.length,"#555"),b(44),g("  "+S.questionText.slice(0,58)+(S.questionText.length>58?"\u2026":""),"#444"),f()},"#1a1a1a");break}case"controls":{let S=this.latestContext;if(!S?.controls.length){f(),g("  Nenhum controle detectado.","#333"),f();break}E(()=>{f(),p("  "+m("list","#444",14)+` <span style="color:#777;font-weight:700;letter-spacing:0.08em;font-size:10px;"> CONTROLES (${S.controls.length})</span>`),b(55),v(["#","Tipo","Label / ID","Valor"],[3,10,27,10],["#444","#555","#888","#666"]),g("  "+"\u2508".repeat(53),"#1a1a1a"),S.controls.forEach((z,F)=>v([String(F+1),(z.type||z.tag||"?").toUpperCase().slice(0,9),(z.label||z.id||z.name||"\u2014").slice(0,26),(z.value||"\u2014").slice(0,9)],[3,10,27,10],["#444","#555","#999","#777"])),f()},"#1a1a1a");break}case"errors":{let S=this.logEntries.filter(z=>z.category==="error");if(!S.length){f(),p("  "+m("check","#4a6a4a",13)+' <span style="color:#4a6a4a;font-weight:600;"> Nenhum erro</span><span style="color:#2a3a2a;"> nesta sess\xE3o \u2014 tudo ok.</span>'),f();break}E(()=>{f(),p("  "+m("info","#7a3333",14)+` <span style="color:#777;font-weight:700;letter-spacing:0.08em;font-size:10px;"> ERROS (${S.length})</span>`),b(44),S.slice(-15).forEach(z=>g("  "+z.message,"#666")),f()},"#2a1a1a");break}case"logs":{let S=Math.min(parseInt(N[1]||"10",10)||10,50),z=this.logEntries.slice(-S);if(!z.length){f(),g("  Nenhum log registrado.","#333"),f();break}E(()=>{f(),p("  "+m("file","#444",14)+` <span style="color:#777;font-weight:700;letter-spacing:0.08em;font-size:10px;"> \xDALTIMAS ${S} ENTRADAS</span>`),b(44),z.forEach(F=>g("  "+F.message,"#555")),f()},"#1a1a1a");break}case"history":{let S=this.metricsHistory;if(!S?.length){f(),g("  Nenhuma quest\xE3o respondida ainda.","#333"),f();break}E(()=>{f(),p("  "+m("clock","#444",14)+` <span style="color:#777;font-weight:700;letter-spacing:0.08em;font-size:10px;"> HIST\xD3RICO (${S.length})</span>`),b(58),v(["#","Quest\xE3o","Tempo","Modelo"],[3,38,7,10],["#444","#666","#555","#555"]),g("  "+"\u2508".repeat(58),"#1a1a1a"),S.slice(-15).forEach((z,F)=>v([String(F+1),(z.questionTitle||"Quest\xE3o").slice(0,37),z.durationMs?(z.durationMs/1e3).toFixed(1)+"s":"--",(z.model||"--").slice(0,9)],[3,38,7,10],["#444","#aaa","#777","#666"])),f()},"#1a1a1a");break}case"reset":this.clearLogs(),f(),p("  "+m("check","#4a6a4a",13)+' <span style="color:#4a6a4a;font-weight:600;"> Resetado</span><span style="color:#444;">  \u2014 logs e m\xE9tricas zerados.</span>'),f();break;case"copy":{if(!t)break;let S=Array.from(t.children).filter(z=>z!==i&&z.id!=="eq-click-cursor"&&z.id!=="eq-term-sel-canvas").map(z=>y(z).trimEnd());navigator.clipboard.writeText(S.join(`
`)).then(()=>{p("  "+m("copy","#888",11)+' <span style="color:#666;"> Conte\xFAdo copiado para a \xE1rea de transfer\xEAncia.</span>'),this.showToast("Terminal copiado","success",2e3)});break}case"":break;default:f(),p(`  <span style="color:#555;">Comando desconhecido: </span><span style="color:#777;font-weight:600;">${D||"(vazio)"}</span>`),g("  Digite help para ver os comandos.","#2a2a2a"),f()}t&&(t.scrollTop=t.scrollHeight)},q=M=>{this.terminalMode=M;let N=M==="terminal";a&&(a.style.display=N?"flex":"none"),r&&(r.style.display=N?"none":"flex"),s&&(s.style.display=N?"none":"flex");let D=this.shadow.querySelector("#eq-term-mode-terminal"),S=this.shadow.querySelector("#eq-term-mode-output");D&&(D.style.background=N?"#181818":"transparent",D.style.borderColor=N?"#2a2a2a":"transparent",D.style.color=N?"#ddd":"#555"),S&&(S.style.background=N?"transparent":"#181818",S.style.borderColor=N?"transparent":"#2a2a2a",S.style.color=N?"#555":"#ddd"),N||this.renderTerminalEntries()};this._reconnectContextbarBtns=()=>{let M=this.shadow.querySelector("#eq-term-mode-terminal"),N=this.shadow.querySelector("#eq-term-mode-output");M?.addEventListener("click",()=>q("terminal")),N?.addEventListener("click",()=>q("output"));let D=this.shadow.querySelector("#eq-term-copy-btn"),S=this.shadow.querySelector("#eq-term-clear-btn");D?.addEventListener("click",()=>{let z=ee=>{let ae=ee.style.color;ee.style.color="#4ade80",setTimeout(()=>ee.style.color=ae,400)},F=this._getCustomSel?.();if(F&&F.trim().length>0){this._clearCustomSel?.(),navigator.clipboard.writeText(F).then(()=>{this.showToast("Sele\xE7\xE3o copiada","success",2e3),D&&z(D)});return}let K=window.getSelection()?.toString()?.trim()||"";if(this.terminalMode==="terminal"){if(K)navigator.clipboard.writeText(K).then(()=>{this.showToast("Sele\xE7\xE3o copiada","success",2e3),D&&z(D)});else if(t){let ee=Array.from(t.children).filter(ae=>ae!==i&&ae.id!=="eq-click-cursor"&&ae.id!=="eq-term-sel-canvas").map(ae=>y(ae).trimEnd());navigator.clipboard.writeText(ee.join(`
`)).then(()=>{this.showToast("Terminal copiado","success",2e3),D&&z(D)})}}else K?navigator.clipboard.writeText(K).then(()=>{this.showToast("Sele\xE7\xE3o copiada","success",2e3),D&&z(D)}):navigator.clipboard.writeText(this.getFormattedLogs()).then(()=>{this.showToast("Output copiado","success",2e3),D&&z(D)})}),S?.addEventListener("click",()=>{this.terminalMode==="terminal"?(t&&i&&[...t.children].forEach(z=>{z!==i&&z.dataset?.perm!=="1"&&z.remove()}),n&&(n.textContent="")):this.clearLogs()})},this._reconnectContextbarBtns();let C=()=>{e?.focus(),t?.classList.remove("eq-term-unfocused")},A=(()=>{try{let N=document.createElement("canvas").getContext("2d");return N?(N.font='11.5px "Cascadia Code","Fira Code","Courier New",monospace',N.measureText("X").width):6.9}catch{return 6.9}})(),P=()=>parseFloat(getComputedStyle(t).lineHeight)||19,O=14,T=10,x=this.shadow.querySelector("#eq-click-cursor");t&&(t.style.position="relative"),x&&(t?.appendChild(x),x.style.position="absolute",x.style.width=A+"px",x.style.height=P()+"px",x.style.animation="eq-term-blink 0.9s step-end infinite");let H=(M,N)=>{if(!x||!t)return;let D=P(),S=Math.max(0,Math.floor((M-O)/A)),z=Math.max(0,Math.floor((N-T)/D)),F=S*A+O,K=z*D+T;x.style.left=F+"px",x.style.top=K+"px",x.style.width=A+"px",x.style.height=D+"px",x.style.animation="eq-term-blink 0.9s step-end infinite",x.style.display="block"},B=this.shadow.querySelector("#eq-term-sel-canvas"),R=null;B&&(R=B.getContext("2d"));let X=null,V=null,J=!1,G=0,Z=0,Y=()=>{if(!B||!t)return;let M=t.scrollWidth,N=Math.max(t.scrollHeight,t.clientHeight);(B.width!==M||B.height!==N)&&(B.width=M,B.height=N,B.style.width=M+"px",B.style.height=N+"px")},oe=()=>{if(!R||!B||(Y(),R.clearRect(0,0,B.width,B.height),!X||!V))return;let M=P(),N=B.width,D=X.row,S=X.col,z=V.row,F=V.col;if((D>z||D===z&&S>F)&&([D,S,z,F]=[z,F,D,S]),R.fillStyle="white",D===z)R.fillRect(O+S*A,T+D*M,(F-S+1)*A,M);else{R.fillRect(O+S*A,T+D*M,N-O-S*A,M);for(let K=D+1;K<z;K++)R.fillRect(O,T+K*M,N-O,M);R.fillRect(O,T+z*M,(F+1)*A,M)}},de=(M,N)=>({row:Math.max(0,Math.floor((N-T)/P())),col:Math.max(0,Math.floor((M-O)/A))}),ke=()=>{if(!X||!V||!t)return"";let M=X.row,N=X.col,D=V.row,S=V.col;(M>D||M===D&&N>S)&&([M,N,D,S]=[D,S,M,N]);let z=Array.from(t.children).filter(K=>{let ee=K.id;return ee!=="eq-click-cursor"&&ee!=="eq-term-sel-canvas"&&ee!=="eq-term-current-line"}).map(K=>y(K).replace(/\n/g,"")),F=[];for(let K=M;K<=D;K++){let ee=K<z.length?z[K]:"";M===D?F.push(ee.padEnd(S+1," ").slice(N,S+1)):K===M?F.push(ee.slice(N)):K===D?F.push(ee.padEnd(S+1," ").slice(0,S+1)):F.push(ee)}return F.join(`
`).replace(/\n+$/,"")};if(this._getCustomSel=ke,this._clearCustomSel=()=>{X=null,V=null,R&&B&&R.clearRect(0,0,B.width,B.height)},B&&t)try{new ResizeObserver(()=>{Y(),X&&V&&oe()}).observe(t)}catch{}t?.addEventListener("mousedown",M=>{if(M.button!==0)return;G=M.clientX,Z=M.clientY,J=!1,X=null,V=null,R&&B&&R.clearRect(0,0,B.width,B.height),x&&(x.style.display="none");let N=t.getBoundingClientRect(),D=M.clientX-N.left+t.scrollLeft,S=M.clientY-N.top+t.scrollTop;H(D,S),setTimeout(()=>{J||C()},80)}),t?.addEventListener("mousemove",M=>{if(M.buttons!==1)return;let N=Math.abs(M.clientX-G),D=Math.abs(M.clientY-Z);if(N>2||D>2){if(!J){J=!0,x&&(x.style.display="none");let z=t.getBoundingClientRect();X=de(G-z.left+t.scrollLeft,Z-z.top+t.scrollTop)}let S=t.getBoundingClientRect();V=de(M.clientX-S.left+t.scrollLeft,M.clientY-S.top+t.scrollTop),oe()}}),t?.addEventListener("mouseup",()=>{J&&(J=!1,(!X||!V)&&C())}),e?.addEventListener("keydown",()=>{x&&(x.style.display="none")},{passive:!0}),t?.addEventListener("focus",()=>t.classList.remove("eq-term-unfocused")),e?.addEventListener("blur",()=>t?.classList.add("eq-term-unfocused")),e?.addEventListener("focus",()=>t?.classList.remove("eq-term-unfocused")),e?.addEventListener("keydown",M=>{if(!n)return;let N=n.textContent||"";if(M.key==="Enter"){M.preventDefault();let D=N.trim();if(n.textContent="",this.terminalCmdHistoryIdx=-1,D&&(this.terminalCmdHistory.unshift(D),this.terminalCmdHistory.length>50&&this.terminalCmdHistory.pop()),i){let S=document.createElement("div");S.style.cssText="white-space:pre-wrap;overflow-wrap:break-word;",S.innerHTML=`<span style="color:#fff;font-weight:700;">EasyQuiz_Legacy:&nbsp;</span><span style="color:#888;">${D}</span>`,t?.insertBefore(S,i)}D&&w(D),t&&(t.scrollTop=t.scrollHeight)}else if(M.key==="Backspace")M.preventDefault(),n.textContent=N.slice(0,-1);else if(M.key==="ArrowUp")M.preventDefault(),this.terminalCmdHistoryIdx=Math.min(this.terminalCmdHistoryIdx+1,this.terminalCmdHistory.length-1),this.terminalCmdHistoryIdx>=0&&(n.textContent=this.terminalCmdHistory[this.terminalCmdHistoryIdx]);else if(M.key==="ArrowDown")M.preventDefault(),this.terminalCmdHistoryIdx=Math.max(this.terminalCmdHistoryIdx-1,-1),n.textContent=this.terminalCmdHistoryIdx>=0?this.terminalCmdHistory[this.terminalCmdHistoryIdx]:"";else if(M.key==="c"&&M.ctrlKey){let D=this._getCustomSel?.();if(D&&D.trim().length>0)this._clearCustomSel?.(),navigator.clipboard.writeText(D);else{let z=window.getSelection()?.toString()||"";z?navigator.clipboard.writeText(z):n?.textContent&&navigator.clipboard.writeText(n.textContent)}let S=this.shadow.querySelector("#eq-term-copy-btn");if(S){let z=S.style.color;S.style.color="#4ade80",setTimeout(()=>S.style.color=z,400)}}else M.key==="v"&&M.ctrlKey?(M.preventDefault(),navigator.clipboard.readText().then(D=>{n&&(n.textContent=(n.textContent||"")+D.replace(/\n/g," ")),t&&(t.scrollTop=t.scrollHeight)})):M.key==="l"&&M.ctrlKey?(M.preventDefault(),t&&i&&[...t.children].forEach(D=>{D!==i&&D.dataset?.perm!=="1"&&D.remove()}),n.textContent=""):M.key.length===1&&!M.ctrlKey&&!M.metaKey&&(M.preventDefault(),n.textContent=N+M.key,t&&(t.scrollTop=t.scrollHeight))}),e?.addEventListener("paste",M=>{M.preventDefault();let N=M.clipboardData?.getData("text")||"",D=/\n/g;n&&(n.textContent=(n.textContent||"")+N.replace(D," "))});let nt=()=>{let M=this.shadow.querySelector("#eq-fchk-all")?.checked,N=this.shadow.querySelector("#eq-fchk-error")?.checked,D=this.shadow.querySelector("#eq-fchk-ai")?.checked,S=this.shadow.querySelector("#eq-fchk-dom")?.checked;M?this.activeLogFilter="all":N&&!D&&!S?this.activeLogFilter="error":D&&!N&&!S?this.activeLogFilter="ai":S&&!N&&!D?this.activeLogFilter="dom":this.activeLogFilter="all";let z=this.shadow.querySelector("#eq-output-filter-label"),F={all:"Todos",error:"Erros",ai:"IA",dom:"DOM"};if(z){let K={all:"Todos",error:"Erros",ai:"IA",dom:"DOM"},ee=this.shadow.querySelector("#eq-fchk-error")?.checked,ae=this.shadow.querySelector("#eq-fchk-ai")?.checked,Fe=this.shadow.querySelector("#eq-fchk-dom")?.checked,He=this.shadow.querySelector("#eq-fchk-all")?.checked,Ue=[ee,ae,Fe].filter(Boolean).length;He||Ue===0?z.textContent="Todos":Ue===1?z.textContent=K[this.activeLogFilter]||this.activeLogFilter:z.textContent="\u22EF ("+Ue+")"}this.renderTerminalEntries()};u?.addEventListener("click",M=>{if(M.stopPropagation(),!h)return;let N=h.style.display!=="none";h.style.display=N?"none":"block"}),h?.addEventListener("mousedown",M=>M.stopPropagation());let we=this.shadow.querySelector("#eq-fchk-all"),Be=this.shadow.querySelector("#eq-fchk-error"),be=this.shadow.querySelector("#eq-fchk-ai"),at=this.shadow.querySelector("#eq-fchk-dom"),St=[Be,be,at].filter(Boolean);we?.addEventListener("change",()=>{we.checked?St.forEach(M=>{M.checked=!1}):we.checked=!0,nt()}),St.forEach(M=>{M.addEventListener("change",()=>{M.checked&&we&&(we.checked=!1),!St.some(D=>D.checked)&&we&&(we.checked=!0),nt()})}),document.addEventListener("mousedown",M=>{h&&h.style.display!=="none"&&(h.style.display="none"),t&&!t.contains(M.target)&&this._clearCustomSel?.()});let Lt=this.shadow.querySelector("#eq-output-sort-btn"),it=this.shadow.querySelector("#eq-sort-arrow");if(it&&(it.style.transform="rotate(270deg)"),Lt?.addEventListener("click",()=>{this.outputSortNewest=!this.outputSortNewest,it&&(it.style.transform=this.outputSortNewest?"rotate(270deg)":"rotate(90deg)"),Lt&&(Lt.style.color=this.outputSortNewest?"#aaa":"#60a5fa"),this.renderTerminalEntries()}),d?.addEventListener("input",()=>{this.outputSearchQuery=d.value,l&&(l.style.display=d.value?"inline":"none"),this.renderTerminalEntries()}),l?.addEventListener("click",()=>{d&&(d.value=""),this.outputSearchQuery="",l&&(l.style.display="none"),this.renderTerminalEntries()}),this.liveDebugTerminal){let M=null;this.liveDebugTerminal.addEventListener("scroll",()=>{M&&clearTimeout(M),M=setTimeout(()=>{if(!this.liveDebugTerminal)return;let N=this.liveDebugTerminal,D=N.scrollHeight-N.scrollTop-N.clientHeight,S=this.shadow.querySelector("#eq-dbg-scroll-toggle");D>40?(this.autoScrollLogs=!1,S&&(S.style.color="#333",S.style.borderColor="rgba(255,255,255,0.07)",S.title="Auto-scroll: desativado")):D<10&&(this.autoScrollLogs=!0,S&&(S.style.color="#ddd",S.style.borderColor="rgba(255,255,255,0.18)",S.title="Auto-scroll: ativo"))},150)})}this.shadow.querySelector("#eq-dbg-scroll-toggle")?.addEventListener("click",M=>{this.autoScrollLogs=!this.autoScrollLogs;let N=M.currentTarget;N.style.color=this.autoScrollLogs?"#ddd":"#333",N.style.borderColor=this.autoScrollLogs?"rgba(255,255,255,0.18)":"rgba(255,255,255,0.07)",N.title=this.autoScrollLogs?"Auto-scroll: ativo":"Auto-scroll: desativado"}),q("terminal"),setTimeout(()=>C(),80)}clearLogs(){if(this.logEntries=[],this.updateLogCounters(),this.liveDebugTerminal){this.liveDebugTerminal.replaceChildren();let e=document.createElement("div");e.style.cssText="color:#333;",e.textContent="> [SYS] Output limpo.",this.liveDebugTerminal.appendChild(e)}this.apConsole&&this.apConsole.replaceChildren(),this.executionConsole&&this.executionConsole.replaceChildren()}termBorder(e,t="#1e1e1e",n=3){return e.style.outline=`1px solid ${t}`,e.style.outlineOffset="-1px",e.style.borderRadius=n+"px",e}getFormattedLogs(){return(this.activeLogFilter==="all"?this.logEntries:this.logEntries.filter(t=>t.category===this.activeLogFilter)).map(t=>t.message).join(`
`)}setLastError(e){this.lastErrorMsg=e,this.dbgErrorCard&&this.dbgErrorText&&(this.dbgErrorText.textContent=e,this.dbgErrorCard.style.display="flex")}setErrorDiagnostic(e,t){let n=t?`[${t}] ${e}`:e;this.setLastError(n)}refreshDebugView(){let e=this.latestPlan,t=this.latestContext,n=this.latestPromptText||e?.promptSent||"";if(this.dbgModel&&(this.dbgModel.textContent=e?.usedModel||this.initialSettings.model||"--"),this.dbgLatency&&(this.dbgLatency.textContent=e?.durationMs?`${e.durationMs}ms`:"--"),this.dbgSplitTokens){let i=e?.promptTokens!==void 0?String(e.promptTokens):"--",a=e?.candidatesTokens!==void 0?String(e.candidatesTokens):"--";this.dbgSplitTokens.textContent=`${i} / ${a}`,this.dbgSplitTokens.title=`Prompt: ${i} tokens | Resposta: ${a} tokens`}if(this.dbgTotalTokens){let i=e?.tokensUsed??(e?.promptTokens&&e?.candidatesTokens?e.promptTokens+e.candidatesTokens:void 0);this.dbgTotalTokens.textContent=i!==void 0?`${i}`:"--"}if(this.dbgPromptLen){let i=n.length,a=Math.round(i/4);this.dbgPromptLen.textContent=`${i}c (~${a}tok)`}this.dbgRawRespView&&(e?e.rawResponse?this.dbgRawRespView.textContent=e.rawResponse:this.dbgRawRespView.textContent=JSON.stringify({pageType:e.pageType,mode:e.mode,confidence:e.confidence,rationale:e.rationale,actions:e.actions},null,2):this.dbgRawRespView.textContent="Aguardando retorno da API Gemini..."),this.lastErrorMsg&&this.dbgErrorCard&&this.dbgErrorText&&(this.dbgErrorText.textContent=this.lastErrorMsg,this.dbgErrorCard.style.display="flex")}logToConsole(e,t){let n=new Date,i=`${String(n.getHours()).padStart(2,"0")}:${String(n.getMinutes()).padStart(2,"0")}:${String(n.getSeconds()).padStart(2,"0")}.${String(Math.floor(n.getMilliseconds()/100))}`,a=e;e.startsWith(">")?a=`> [${i}] ${e.slice(1).trim()}`:a=`[${i}] ${e}`;let r="all";t==="text-red"||a.includes("[ERRO]")||a.includes("Falha")||a.includes("Error")?r="error":a.includes("[IA]")||a.includes("[RAG]")||a.includes("Tokens")||a.includes("Gemini")||a.includes("Modelo:")?r="ai":(a.includes("[DOM]")||a.includes("[EXEC]")||a.includes("[VERIF]")||a.includes("[NAV]"))&&(r="dom");let s={id:Date.now()+Math.random(),timestamp:i,message:a,colorClass:t,category:r};for(this.logEntries.push(s);this.logEntries.length>250;)this.logEntries.shift();if(this.updateLogCounters(),r==="error"&&this.setLastError(a),this.liveDebugTerminal&&(this.activeLogFilter==="all"||this.activeLogFilter===r)){let d=document.createElement("div");d.style.cssText="padding:1px 0;",d.textContent=a,t&&(d.className=t),this.liveDebugTerminal.appendChild(d)}if(this.liveTerminalOutput&&(r==="dom"||r==="all"||r==="error")){for(this.appendTerminalLine(a,t);this.liveDebugTerminal.children.length>300;)this.liveDebugTerminal.removeChild(this.liveDebugTerminal.firstChild);this.autoScrollLogs&&(this.liveDebugTerminal.scrollTop=this.liveDebugTerminal.scrollHeight)}if(this.apConsole){let d=document.createElement("div");for(d.textContent=a,t&&(d.className=t),this.apConsole.appendChild(d),this.apConsole.scrollTop=this.apConsole.scrollHeight;this.apConsole.children.length>150;)this.apConsole.removeChild(this.apConsole.firstChild)}if(this.executionConsole){let d=document.createElement("div");for(d.textContent=a,t&&(d.className=t),this.executionConsole.appendChild(d),this.executionConsole.scrollTop=this.executionConsole.scrollHeight;this.executionConsole.children.length>150;)this.executionConsole.removeChild(this.executionConsole.firstChild)}}setProgress(e,t){if(!this.progressContainer||!this.progressBar)return;if(e<=0){this.progressContainer.style.display="none",this.progressBar.style.width="0%";return}this.progressContainer.style.display="flex";let n=Math.min(100,Math.max(0,Math.round(e)));this.progressBar.style.width=`${n}%`,this.progressVal&&(this.progressVal.textContent=`${n}%`),t&&this.progressLabel&&(this.progressLabel.textContent=t),n>=100&&setTimeout(()=>{this.progressContainer&&this.progressBar&&this.progressBar.style.width==="100%"&&(this.progressContainer.style.display="none")},1500)}updateContext(e,t){this.latestContext=e,t&&(this.latestPlan=t,t.imageDescriptions&&(this.latestImageDescriptions=t.imageDescriptions)),this.activeTab==="brain"?(this.renderContextTree(),this.refreshBrainCanvas(),t&&this.refreshInspectorView()):this.activeTab==="debug"&&this.refreshDebugView()}updateImages(e){this.latestImages=e,this.activeTab==="brain"&&(this.renderContextTree(),this.refreshBrainCanvas()),this.activeTab==="brain"&&(this.brainSelectedFolder==="media-images"||(this.brainActiveTab||"").startsWith("img-"))&&this.refreshBrainCanvas()}renderContextTree(){if(!this.contextTreeContainer)return;let e=this.latestContext,t=st(),n=this.latestPlan,i=!!(this.latestPromptText||n?.promptSent),a=!!e,r=!!n;this.contextTreeContainer.innerHTML="";let s=this.createTreeFolder(" P\xC1GINA & ESCOPO ATUAL",!0,[{label:"T\xEDtulo",value:document.title||"Sem t\xEDtulo"},{label:"URL",value:window.location.pathname||"/"},{label:"Escopo DOM",value:e?`${e.scope.tagName.toLowerCase()}${e.scope.className?"."+e.scope.className.split(" ").join("."):""}`:"Document"},{label:"Tamanho Texto",value:e?`${e.questionText.length} caracteres`:"N\xE3o analisado"},{label:"Trecho Enunciado",value:e?`"${e.questionText.slice(0,120)}..."`:"Nenhum"}]);this.contextTreeContainer.appendChild(s);let d=e?e.controls:[],l=d.map((b,v)=>{let y=b.role==="navigation"||b.type==="button",E=!y&&b.value?` [val: "${b.value}"]`:"";return{label:`[#${v+1}] ${b.type.toUpperCase()}`,value:`${b.label||b.id||b.name||"(Sem r\xF3tulo)"}${E}`.trim(),badge:y?"Navega\xE7\xE3o":b.role||b.type}}),u=this.createTreeFolder(`\uFE0F CONTROLES DETECTADOS (${d.length})`,d.length>0,l);this.contextTreeContainer.appendChild(u);let h=t.map((b,v)=>({label:`Mem\xF3ria #${v+1}`,value:b,badge:"RAG"})),c=this.createTreeFolder(` MEM\xD3RIA RAG ACUMULADA (${t.length})`,t.length>0,h);if(this.contextTreeContainer.appendChild(c),n){let b=this.createTreeFolder(` \xDALTIMO PLANO IA (${n.actions.length} a\xE7\xF5es)`,!0,[{label:"Tipo P\xE1gina",value:n.pageType,badge:`${(n.confidence*100).toFixed(0)}%`},{label:"Modo",value:n.mode},{label:"Racioc\xEDnio",value:n.rationale||"N/A"},...n.actions.map((v,y)=>({label:`A\xE7\xE3o #${y+1} (${v.t})`,value:JSON.stringify(v)}))]);this.contextTreeContainer.appendChild(b)}{let b=document.createElement("div");b.style.cssText="border-bottom:1px solid rgba(255,255,255,0.04);";let v=document.createElement("div");v.style.cssText="display:flex;align-items:center;gap:6px;padding:5px 10px;cursor:pointer;font-size:10px;font-weight:600;color:#fbbf24;letter-spacing:0.04em;user-select:none;",v.innerHTML='<span style="display:inline-flex;width:12px;height:12px;color:#fbbf24;">'+k.inspector+"</span> IA ARTIFACTS";let y=document.createElement("div");y.style.cssText="padding-left:16px;overflow:hidden;";let E=(q,C,L,A)=>{let P=document.createElement("div");return P.style.cssText="display:flex;align-items:center;gap:6px;padding:4px 10px 4px 4px;cursor:pointer;border-radius:4px;transition:background 0.1s;"+(this.brainActiveTab===q?"background:rgba(251,191,36,0.1);":""),P.innerHTML='<span style="font-size:9px;color:'+(A?"#fbbf24":"#444")+';">'+k.code+'</span><span style="font-size:10px;color:'+(A?"#ddd":"#444")+';flex:1;">'+C+'</span><span style="font-size:8px;color:#333;">'+L+"</span>",P.addEventListener("click",()=>{this.brainSelectedFolder=null,this.brainActiveTab=q;let O=this.getBrainFileText(q),T=this.shadow.querySelector("#eq-brain-content");if(T){T.innerHTML="";let x=document.createElement("pre");x.className="eq-brain-code",x.style.cssText='padding:12px;font-size:10.5px;line-height:1.55;white-space:pre-wrap;word-break:break-word;color:#d0d8e8;font-family:"Cascadia Code","Fira Code","Courier New",monospace;',x.textContent=O,T.appendChild(x)}this.renderBrainExplorer(),this.renderBrainTabs()}),P};y.appendChild(E("ai-prompt","prompt.txt",i?"pronto":"aguardando",i)),y.appendChild(E("ai-context","context.json",a?"pronto":"aguardando",a)),y.appendChild(E("ai-response","response.txt",r?"pronto":"aguardando",!!n));let w=!1;v.addEventListener("click",()=>{w=!w,y.style.display=w?"block":"none"}),y.style.display="none",b.appendChild(v),b.appendChild(y),this.contextTreeContainer.appendChild(b)}let m=this.latestImages,p=this.latestImageDescriptions,g=m.map((b,v)=>{let y=p.find(L=>L.index===v),E=(b.captureStatus==="captured"||b.captureStatus==="text_only",""),w=b.captureStatus==="captured"?"Visual":b.captureStatus==="text_only"?"Texto":"Falhou",q=y?y.relevant?" Relevante":"\uFE0F Ignorada":"\u2014",C=y?y.description:b.textContext?b.textContext:"Aguardando an\xE1lise IA...";return{label:`${E} Img ${v+1} [${w}]`,value:`${C}`,badge:q,imgSrc:b.base64?`data:${b.mediaType||"image/jpeg"};base64,${b.base64}`:void 0}}),f=this.createTreeFolder(`\uFE0F IMAGENS DETECTADAS (${m.length})`,!0,g);this.contextTreeContainer.appendChild(f)}createTreeFolder(e,t,n){let i=document.createElement("div");i.className="eq-tree-node";let a=document.createElement("div");a.className="eq-tree-header",a.innerHTML=`<span class="eq-tree-arrow">${t?"\u25BC":"\u25B6"}</span> <span>${e}</span>`;let r=document.createElement("div");if(r.className="eq-tree-content",r.style.display=t?"flex":"none",n.length===0)r.innerHTML='<div class="text-muted" style="padding: 2px 0;">Nenhum item registrado.</div>';else for(let s of n){let d=document.createElement("div");d.className="eq-tree-leaf";let l="";s.imgSrc&&s.imgSrc.startsWith("data:image")&&(l=`<div style="margin-top: 8px; margin-bottom: 4px;"><img src="${s.imgSrc}" style="max-width: 100%; max-height: 120px; border-radius: 4px; border: 1px solid #3c4043; background: #1e1f22;" alt="Captura"></div>`),d.innerHTML=`
          <div style="display: flex; align-items: flex-start; gap: 8px; width: 100%;">
            <strong style="color:#ffffff; min-width: 80px;">${s.label}:</strong>
            <div style="flex:1; display: flex; flex-direction: column;">
              <span style="word-break: break-word; color:#aaaaaa;">${s.value}</span>
              ${l}
            </div>
            ${s.badge?`<span class="eq-tree-badge" style="white-space: nowrap;">${s.badge}</span>`:""}
          </div>
        `,r.appendChild(d)}return a.addEventListener("click",()=>{let s=r.style.display==="none";r.style.display=s?"flex":"none";let d=a.querySelector(".eq-tree-arrow");d&&(d.textContent=s?"\u25BC":"\u25B6")}),i.appendChild(a),i.appendChild(r),i}toggle(e){e!==void 0?this.isCollapsed=!e:this.isCollapsed=!this.isCollapsed,this.isCollapsed?this.sidebarEl.classList.add("eq-collapsed"):(this.sidebarEl.classList.remove("eq-collapsed"),U.getAllKeys().length===0&&(this.switchTab("settings"),this.apiKeyInput.focus()))}updateAutopilotUi(e){let t=this.analyzeBtn;if(t){let n=t.closest(".eq-cta-wrapper"),i=e?"Parar Autopilot":"Resolver Autopilot",a=e?k.stop:k.sparkles;n&&(n.classList.toggle("is-running",e),n.classList.toggle("is-idle",!e)),t.classList.toggle("is-running",e),t.classList.toggle("is-idle",!e),t.classList.toggle("danger",e),t.innerHTML=`<span class="eq-btn-icon">${a}</span><span class="eq-btn-label">${i}</span>`,t.title=e?"Interromper o Resolver Autopilot":"Ligar o Resolver Autopilot"}this.apToggleBtn&&(this.apToggleBtn.innerHTML=`${e?k.stop:k.sparkles} ${e?"Parar Autopilot":"Resolver Autopilot"}`,this.apToggleBtn.classList.toggle("danger",e),this.apToggleBtn.title=e?"Interromper o Resolver Autopilot":"Ligar o Resolver Autopilot")}setOperationState(e,t){let n=this.shadow.querySelector("#eq-operation-state"),i=this.shadow.querySelector("#eq-status-card");n&&(n.innerHTML=`${k.info} <span>${e}</span>`,n.className=`eq-operation-state is-${t}`),i&&(i.classList.remove("is-busy","is-success","is-error","is-warning","is-info"),i.classList.add(`is-${t}`));let a=this.analyzeBtn;if(a){let r=a.closest(".eq-cta-wrapper");r&&(r.classList.remove("status-busy","status-success","status-error","status-warning","status-info"),r.classList.add(`status-${t}`)),a.classList.remove("status-busy","status-success","status-error","status-warning","status-info"),a.classList.add(`status-${t}`)}}setInterrupted(e="An\xE1lise interrompida pelo usu\xE1rio."){this.isBusy=!1,[this.modelSelect,this.modeSelect,this.engineSelect,this.dryRunCheckbox,this.autoApplyCheckbox,this.autoAdvanceCheckbox,this.useVisionCheckbox,this.toastStackingCheckbox].forEach(n=>n.disabled=!1);let t=this.analyzeBtn.closest(".eq-cta-wrapper");t&&t.classList.remove("is-running"),this.analyzeBtn.disabled=!1,this.analyzeBtn.classList.remove("danger"),this.analyzeBtn.innerHTML=`<span class="eq-btn-icon">${k.sparkles}</span><span class="eq-btn-label">Resolver Autopilot</span>`,this.analyzeBtn.title="Ligar o Resolver Autopilot",this.applyBtn&&(this.applyBtn.disabled=!this.latestPlan||!this.latestPlan.actions.length),this.stopStopwatch(),this.stopQuestionTimer(),this.dotPulseAp&&(this.dotPulseAp.className="eq-dot-pulse stopped"),this.dotPulseAdv&&(this.dotPulseAdv.className="eq-dot-pulse stopped"),this.launcherDot&&(this.launcherDot.className="eq-launcher-dot stopped"),this.metricsLiveStatus&&(this.metricsLiveStatus.textContent="Interrompido",this.metricsLiveStatus.className="eq-live-stopwatch-status is-warning"),this.autopilot.isActive()||this.updateAutopilotUi(!1),this.setStatus(e,"warning")}setBusy(e,t){this.isBusy=e,[this.modelSelect,this.modeSelect,this.engineSelect,this.dryRunCheckbox,this.autoApplyCheckbox,this.autoAdvanceCheckbox,this.useVisionCheckbox,this.toastStackingCheckbox].forEach(i=>i.disabled=e);let n=this.analyzeBtn?.closest(".eq-cta-wrapper");e?(n&&n.classList.add("is-running"),this.analyzeBtn&&(this.analyzeBtn.disabled=!1,this.analyzeBtn.classList.add("danger"),this.analyzeBtn.innerHTML=`<span class="eq-btn-icon">${k.stop}</span><span class="eq-btn-label">Parar Autopilot</span>`,this.analyzeBtn.title="Interromper o Resolver Autopilot"),this.applyBtn&&(this.applyBtn.disabled=!0),this.startStopwatch(),this.startQuestionTimer(),this.dotPulseAp&&(this.dotPulseAp.className="eq-dot-pulse busy"),this.dotPulseAdv&&(this.dotPulseAdv.className="eq-dot-pulse busy"),this.launcherDot&&(this.launcherDot.className="eq-launcher-dot busy"),this.setOperationState("Analisando...","busy"),this.metricsLiveStatus&&(this.metricsLiveStatus.textContent="Calculando...",this.metricsLiveStatus.className="eq-live-stopwatch-status is-busy"),t&&this.setStatus(t,"info")):(this.analyzeBtn&&(this.analyzeBtn.disabled=!1,this.analyzeBtn.classList.remove("danger"),this.analyzeBtn.innerHTML=`<span class="eq-btn-icon">${k.sparkles}</span><span class="eq-btn-label">Resolver Autopilot</span>`,this.analyzeBtn.title="Ligar o Resolver Autopilot"),this.applyBtn&&(this.applyBtn.disabled=!this.latestPlan||!this.latestPlan.actions.length),this.stopStopwatch(),this.stopQuestionTimer(),this.dotPulseAp&&(this.dotPulseAp.className="eq-dot-pulse"),this.dotPulseAdv&&(this.dotPulseAdv.className="eq-dot-pulse"),this.launcherDot&&(this.launcherDot.className="eq-launcher-dot"),this.setOperationState(this.autopilot.isActive()?"Monitorando":"Pronto","idle"),this.metricsLiveStatus&&this.metricsLiveStatus.textContent==="Calculando..."&&(this.metricsLiveStatus.textContent="Em espera",this.metricsLiveStatus.className="eq-live-stopwatch-status"))}_lastToastMsg="";_lastToastTime=0;_toastQueue=[];_toastVisible=[];_toastOverflowBtn=null;showToast(e,t="info",n=3500,i=!1){let a=Date.now(),r=t+":"+e;if(!i&&r===this._lastToastMsg&&a-this._lastToastTime<1500)return;this._lastToastMsg=r,this._lastToastTime=a;let s={success:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>',error:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>',warning:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>',info:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>'},d={success:"#22c55e",error:"#ef4444",warning:"#f59e0b",info:"#60a5fa"},l=d[t]||d.info,u=s[t]||s.info,h=this.initialSettings.toastStacking??!0,c={message:e,type:t,col:l,iconHtml:u,expiresAt:Date.now()+n};h&&this._toastQueue.push(c);let m=this.shadow.querySelector("#eq-toast-container");m||(m=document.createElement("div"),m.id="eq-toast-container",m.style.cssText="position:fixed;bottom:8px;left:12px;z-index:2147483647;display:flex;flex-direction:column-reverse;gap:5px;pointer-events:none;max-width:300px;",this.shadow.appendChild(m));let p=5,g=(E,w,q,C)=>{let L=document.createElement("div");L.style.cssText="display:flex;align-items:center;gap:8px;background:rgba(10,10,18,0.98);border:1px solid rgba(255,255,255,0.09);border-left:3px solid "+w+";padding:7px 12px 7px 10px;border-radius:7px;font-size:11px;color:rgba(235,240,248,0.92);font-family:inherit;box-shadow:0 4px 20px rgba(0,0,0,0.65),0 1px 4px rgba(0,0,0,0.4);pointer-events:all;max-width:296px;word-break:break-word;transform:translateX(-10px);opacity:0;transition:transform 0.22s cubic-bezier(0.34,1.5,0.64,1),opacity 0.16s ease;cursor:pointer;";let A=document.createElement("span");A.style.cssText="color:"+w+";display:inline-flex;flex-shrink:0;width:14px;height:14px;",A.innerHTML=q;let P=document.createElement("span");return P.textContent=E,P.style.flex="1",L.appendChild(A),L.appendChild(P),L};this._toastVisible=this._toastVisible.filter(E=>E.isConnected);let f=h?Math.max(0,this._toastQueue.filter(E=>E.expiresAt>Date.now()).length-p):0;if(h&&this._toastVisible.length>=p){this._updateToastOverflow(m,f);return}let b=g(e,l,u,n);m.appendChild(b),h&&this._toastVisible.push(b),requestAnimationFrame(()=>requestAnimationFrame(()=>{b.style.transform="translateX(0)",b.style.opacity="1"}));let v=()=>{b.style.transform="translateX(-10px)",b.style.opacity="0",setTimeout(()=>{b.remove(),h&&(this._toastVisible=this._toastVisible.filter(E=>E!==b),this._toastQueue=this._toastQueue.filter(E=>E.expiresAt>Date.now()),this._updateToastOverflow(m,Math.max(0,this._toastQueue.length-this._toastVisible.filter(E=>E.isConnected).length)))},200)},y=setTimeout(v,n);b.addEventListener("click",()=>{clearTimeout(y),v()},{once:!0}),h&&this._updateToastOverflow(m,f)}_updateToastOverflow(e,t){if(this._toastOverflowBtn&&(this._toastOverflowBtn.remove(),this._toastOverflowBtn=null),t<=0)return;let n=document.createElement("button");n.style.cssText="display:flex;align-items:center;gap:5px;background:rgba(14,14,20,0.92);border:1px solid rgba(255,255,255,0.1);border-radius:5px;font-size:10px;color:rgba(200,210,225,0.8);padding:4px 8px;cursor:pointer;pointer-events:all;font-family:inherit;",n.innerHTML=`<svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/></svg><span>+${t} notif.</span>`,n.addEventListener("click",()=>this._showToastHistory()),this._toastOverflowBtn=n,e.appendChild(n)}_showToastHistory(){let e=Date.now(),t=this._toastQueue.filter(a=>a.expiresAt>e);if(t.length===0)return;let n=this.shadow.querySelector("#eq-toast-container");if(!n)return;this._toastOverflowBtn&&(this._toastOverflowBtn.remove(),this._toastOverflowBtn=null);let i={success:"#22c55e",error:"#ef4444",warning:"#f59e0b",info:"#60a5fa"};for(let a of t){if(n.querySelectorAll(".eq-toast-hist").length>20)break;let r=document.createElement("div");r.className="eq-toast-hist",r.style.cssText=`display:flex;align-items:center;gap:7px;background:rgba(14,14,20,0.95);border:1px solid rgba(255,255,255,0.07);border-left:3px solid ${a.col};padding:5px 9px 5px 8px;border-radius:5px;font-size:10.5px;color:rgba(200,210,225,0.82);font-family:inherit;box-shadow:0 2px 10px rgba(0,0,0,0.4);pointer-events:all;max-width:288px;word-break:break-word;`;let s=document.createElement("span");s.style.cssText=`color:${a.col};display:inline-flex;flex-shrink:0;`,s.innerHTML=a.iconHtml;let d=document.createElement("span");d.textContent=a.message,d.style.flex="1";let l=document.createElement("span"),u=Math.ceil((a.expiresAt-e)/1e3);l.textContent=`${u}s`,l.style.cssText="color:rgba(150,160,180,0.5);font-size:9px;flex-shrink:0;",r.appendChild(s),r.appendChild(d),r.appendChild(l),r.addEventListener("click",()=>r.remove(),{once:!0}),n.appendChild(r),setTimeout(()=>r.remove(),Math.max(500,a.expiresAt-e))}}setStatus(e,t="info"){e&&e.length>4&&(t==="success"||t==="error")?this.showToast(e,t,3500):t==="warning"&&e.length>8?this.showToast(e,t,4e3):t==="info"&&e.length>10&&this.showToast(e,t,2400);let n=this.shadow.querySelector("#eq-status-summary");n&&(n.textContent=e),this.statusTextAp&&this.statusTextAp&&(this.statusTextAp.textContent=e),this.statusTextAdv&&this.statusTextAdv&&(this.statusTextAdv.textContent=e),t==="error"?(this.setOperationState("Bloqueado","error"),this.dotPulseAp&&(this.dotPulseAp.className="eq-dot-pulse error"),this.dotPulseAdv&&(this.dotPulseAdv.className="eq-dot-pulse error"),this.launcherDot&&(this.launcherDot.className="eq-launcher-dot error")):t==="warning"?(this.setOperationState("Interrompido","warning"),this.dotPulseAp&&(this.dotPulseAp.className="eq-dot-pulse stopped"),this.dotPulseAdv&&(this.dotPulseAdv.className="eq-dot-pulse stopped"),this.launcherDot&&(this.launcherDot.className="eq-launcher-dot stopped")):t==="success"?(this.setOperationState("Confirmado","success"),this.dotPulseAp&&(this.dotPulseAp.className="eq-dot-pulse"),this.dotPulseAdv&&(this.dotPulseAdv.className="eq-dot-pulse"),this.launcherDot&&(this.launcherDot.className="eq-launcher-dot")):this.isBusy?(this.setOperationState("Analisando...","busy"),this.dotPulseAp&&(this.dotPulseAp.className="eq-dot-pulse busy"),this.dotPulseAdv&&(this.dotPulseAdv.className="eq-dot-pulse busy"),this.launcherDot&&(this.launcherDot.className="eq-launcher-dot busy")):(this.setOperationState(this.autopilot.isActive()?"Monitorando":"Pronto","info"),this.dotPulseAp&&(this.dotPulseAp.className="eq-dot-pulse"),this.dotPulseAdv&&(this.dotPulseAdv.className="eq-dot-pulse"),this.launcherDot&&(this.launcherDot.className="eq-launcher-dot"));let i=e.includes("Alternando")||e.includes("indispon\xEDvel")||e.includes("fallback")||e.includes("alternativo"),a=t==="error"?"> [ERRO] ":t==="success"?"> [SUCESSO] ":t==="warning"?"> [PARADO] ":i?"> [FALLBACK] ":"> [SYS] ",r=t==="error"?"text-red":t==="success"?"text-green":t==="warning"||i?"text-yellow":"text-blue";this.logToConsole(`${a}${e}`,r)}setPlan(e,t){if(this.latestPlan=e,this.resultContainer.style.display="flex",e.durationMs&&this.stopStopwatch(e.durationMs),e.usedModel){let s=this.shadow.querySelector("#eq-active-model-badge");if(s){let d=e.usedModel.replace("gemini-","").replace("-latest","");s.textContent=`\u25CF ${d}`,s.style.display="inline-block"}}let n=this.shadow.querySelector("#eq-badges");if(n){n.replaceChildren();let s=document.createElement("span");s.className="eq-count-badge",s.textContent=String(e.actions.length),s.title=`${e.actions.length} a\xE7\xF5es \xB7 ${Math.round(e.confidence*100)}% confian\xE7a`,n.appendChild(s)}let i=this.shadow.querySelector("#eq-rationale-text");i.textContent=e.rationale;let a=this.shadow.querySelector("#eq-actions-list");a.innerHTML="";for(let s of e.actions){let d=document.createElement("div");d.className="eq-action-item";let l="";s.t==="chk"?l=`chk ${s.id} (${s.c})`:s.t==="val"?l=`val "${s.v}" -> ${s.id}`:s.t==="sel"?l=`sel "${Array.isArray(s.v)?s.v.join(","):s.v}" -> ${s.id}`:s.t==="clk"?l=`clk ${s.id}`:s.t==="adv"?l="adv":s.t==="js"?l=`js: ${String(s.v).slice(0,40)}...`:s.t==="drag"&&(l=`drag "${s.from}" -> "${s.to}"`);let u=document.createElement("span");u.className=`eq-action-badge t-${s.t}`,u.textContent=s.t.toUpperCase();let h=document.createElement("span");h.textContent=l,d.append(u,h),a.appendChild(d)}this.applyBtn&&(this.applyBtn.disabled=!t||!e.actions.length);let r=this.shadow.querySelector("#eq-execution-card");r&&(r.hidden=!0),e.imageDescriptions&&e.imageDescriptions.length>0&&(this.latestImageDescriptions=e.imageDescriptions),this.refreshInspectorView(),this.refreshDebugView()}setExecutionReport(e){let t=this.shadow.querySelector("#eq-execution-card"),n=this.shadow.querySelector("#eq-execution-summary"),i=this.shadow.querySelector("#eq-execution-list");if(!t||!n||!i)return;t.hidden=!1,n.textContent=e.navigationVerified?`${e.verified}/${e.applied} a\xE7\xF5es verificadas. Navega\xE7\xE3o confirmada.`:`${e.verified}/${e.applied} a\xE7\xF5es verificadas. ${e.navigationEvidence}`,n.className=`eq-execution-summary ${e.success?"is-success":"is-warning"}`,i.replaceChildren();let a=this.shadow.querySelector("#eq-execution-placeholder");a&&(a.textContent=e.navigationVerified?"Fluxo conclu\xEDdo: aplica\xE7\xE3o e navega\xE7\xE3o confirmadas.":`Fluxo interrompido: ${e.navigationEvidence}`,a.className=`eq-execution-placeholder ${e.success?"is-success":"is-warning"}`);for(let r of e.reports){let s=document.createElement("div");s.className=`eq-execution-row ${r.verified?"is-success":"is-failed"}`;let d=document.createElement("span");d.className="eq-execution-state",d.textContent=r.verified?"OK":"FALHOU";let l=document.createElement("div");l.className="eq-execution-details";let u=document.createElement("strong");u.textContent=r.target;let h=document.createElement("span");if(h.textContent=`${r.strategy} | ${r.evidence}`,l.append(u,h),s.append(d,l),r.error){let c=document.createElement("small");c.textContent=r.error,s.appendChild(c)}i.appendChild(s)}}setInspectorPrompt(e,t){this.latestPromptText=e,this.inspPrompt&&(this.inspPrompt.textContent=e),t&&this.inspModel&&(this.inspModel.textContent=t),this.inspLatency&&(this.inspLatency.textContent="Aguardando IA..."),this.activeTab==="debug"&&this.refreshDebugView()}refreshInspectorView(){let e=this.latestPlan;this.inspModel&&(this.inspModel.textContent=e?.usedModel||this.initialSettings.model),this.inspLatency&&(this.inspLatency.textContent=e?.durationMs?`${e.durationMs}ms`:"--"),this.inspTokens&&(this.inspTokens.textContent=e?.tokensUsed?`${e.tokensUsed}`:"--"),this.inspPrompt&&(this.inspPrompt.textContent=e?.promptSent||this.latestPromptText||""),this.inspRationale&&(this.inspRationale.textContent=e?.rationale||""),this.renderBrainExplorer(),this.brainActiveTab&&this.renderBrainFileContent(this.brainActiveTab)}brainOpenTabs=[];brainActiveTab=null;brainSelectedFolder=null;brainOpenFolders=new Set(["folder-ia","folder-ctx","folder-meta"]);brainCanvasHidden=!1;brainCanvasHeight=280;GLOBAL_ID="__global__";GLOBAL_LABEL="Contexto Global";getBrainFileColor(e){return{file:"#7eb8f7",code:"#f4c96a",list:"#a5d6a7",chip:"#80cbc4",sparkles:"#ce93d8",clock:"#ffcc80",info:"#81deea"}[e]||"#9e9e9e"}renderMarkdown(e){let t=u=>u.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"),n="",i=e.split(`
`),a=!1,r="",s=[],d=()=>{if(!a)return"";a=!1;let u=s.join(`
`);return s=[],`<div class="eq-md-codeblock"><div class="eq-md-codelang">${t(r)}</div><pre><code>${t(u)}</code></pre></div>`},l=u=>u.replace(/`([^`]+)`/g,(h,c)=>`<code class="eq-md-inline">${t(c)}</code>`).replace(/\\*\\*\\*([^\\*]+)\\*\\*\\*/g,(h,c)=>`<strong><em>${t(c)}</em></strong>`).replace(/\\*\\*([^\\*]+)\\*\\*/g,(h,c)=>`<strong>${t(c)}</strong>`).replace(/\\*([^\\*]+)\\*/g,(h,c)=>`<em>${t(c)}</em>`).replace(/~~([^~]+)~~/g,(h,c)=>`<del>${t(c)}</del>`);for(let u of i){if(/^```/.test(u)){a?n+=d():(a=!0,r=u.slice(3).trim()||"text",s=[]);continue}if(a){s.push(u);continue}let h=u.match(/^#s+(.+)/),c=u.match(/^##s+(.+)/),m=u.match(/^###s+(.+)/);if(m){n+=`<h3 class="eq-md-h3">${l(m[1])}</h3>`;continue}if(c){n+=`<h2 class="eq-md-h2">${l(c[1])}</h2>`;continue}if(h){n+=`<h1 class="eq-md-h1">${l(h[1])}</h1>`;continue}let p=u.match(/^>s*(.*)/);if(p){n+=`<blockquote class="eq-md-bq">${l(p[1])}</blockquote>`;continue}if(/^---+$/.test(u)){n+='<hr class="eq-md-hr">';continue}let g=u.match(/^[-*+]s+(.+)/);if(g){n+=`<div class="eq-md-li"><span class="eq-md-bullet">\xB7</span><span>${l(g[1])}</span></div>`;continue}if(u.trim()===""){n+='<div class="eq-md-gap"></div>';continue}n+=`<div class="eq-md-p">${l(t(u))}</div>`}return n+=d(),n}getBrainFolders(){let e=this.latestPlan,t=this.latestImages.map((i,a)=>({id:"img-"+a,label:"img-"+(a+1)+"."+(i.mediaType?.split("/")?.[1]||"jpg"),icon:"image"})),n=[{id:"folder-ia",label:"Resposta da IA",files:[{id:"rationale",label:"rationale.md",icon:"file"},{id:"actions",label:"actions.json",icon:"code"},{id:"summary",label:"resumo.txt",icon:"list"}]},{id:"folder-ctx",label:"Contexto & Prompt",files:[{id:"prompt",label:"prompt-enviado.txt",icon:"file"},{id:"rag",label:"rag-context.txt",icon:"chip"}]},{id:"folder-meta",label:"Metadados",files:[{id:"meta-model",label:"modelo.info",icon:"sparkles"},{id:"meta-latency",label:"latencia.info",icon:"clock"},{id:"meta-tokens",label:"tokens.info",icon:"info"}]}];return e?.executionResult&&n.push({id:"folder-exec",label:"Execu\xE7\xE3o",files:[{id:"exec-steps",label:"steps.log",icon:"list"},{id:"exec-result",label:"resultado.log",icon:"file"}]}),n.push({id:"folder-media",label:"M\xEDdia",files:[],subfolders:[{id:"media-images",label:"Imagens",icon:"image",files:t}]}),n}getActiveFolder(){if(!this.brainActiveTab)return null;for(let e of this.getBrainFolders()){if(e.files.some(t=>t.id===this.brainActiveTab))return e.id;for(let t of e.subfolders||[])if(t.files.some(n=>n.id===this.brainActiveTab))return t.id}return null}smartCopy(){let e=this.shadow.querySelector("#eq-brain-content");if(this.brainActiveTab&&this.brainActiveTab.startsWith("img-")){let n=parseInt(this.brainActiveTab.slice(4),10),i=this.latestImages[n];if(i?.base64){let a="data:"+(i.mediaType||"image/jpeg")+";base64,"+i.base64,r=this.latestImageDescriptions.find(d=>d.index===n),s=["[EasyQuiz] Imagem "+(n+1)+" de "+this.latestImages.length,"Status: "+(i.captureStatus||"desconhecido"),"Tipo: "+(i.mediaType||"--"),i.alt?"Alt: "+i.alt:"",i.source?"Fonte: "+i.source:"",r?.description?"Analise IA: "+r.description:"",i.textContext?"Contexto: "+i.textContext:"","Data URI: "+a.slice(0,80)+"..."].filter(Boolean).join(`
`);navigator.clipboard.writeText(s).then(()=>this.showToast("Imagem copiada (URI + metadados)","success",2500));return}}if(this.brainSelectedFolder==="media-images"){let n=["[EasyQuiz] Imagens capturadas: "+this.latestImages.length];this.latestImages.forEach((i,a)=>{let r=this.latestImageDescriptions.find(s=>s.index===a);n.push(a+1+". "+(i.captureStatus||"?")+(r?.description?" \u2014 "+r.description.slice(0,80):""))}),navigator.clipboard.writeText(n.join(`
`)).then(()=>this.showToast("Lista de imagens copiada","success",2500));return}if(this.brainActiveTab){let n=this.getBrainFileText(this.brainActiveTab);if(n){navigator.clipboard.writeText(n).then(()=>this.showToast("Conte\xFAdo copiado","success",2200));return}}if(this.brainSelectedFolder){let n=e?.innerText?.trim()||"";if(n){navigator.clipboard.writeText(n).then(()=>this.showToast("Estrutura copiada","success",2200));return}}let t=e?.innerText?.trim()||"";t?navigator.clipboard.writeText(t).then(()=>this.showToast("Conte\xFAdo copiado","success",2200)):this.showToast("Nada selecionado para copiar","warning",2e3)}initBrainControls(){let e=this.shadow.querySelector("#eq-brain-resize-handle"),t=this.shadow.querySelector(".eq-brain-canvas"),n=this.shadow.querySelector("#eq-brain-canvas-toggle"),i=this.shadow.querySelector("#eq-copy-prompt-btn");if(n&&(n.innerHTML=this.brainCanvasHidden?k.eyeOff:k.eye,n.title=this.brainCanvasHidden?"Mostrar visualizador":"Ocultar visualizador"),!this._brainControlsInited){if(this._brainControlsInited=!0,e&&t){let a=0,r=0;e.addEventListener("mousedown",s=>{s.preventDefault(),a=s.clientY,r=t.getBoundingClientRect().height;let d=u=>{let h=Math.max(100,Math.min(520,r+u.clientY-a));t.style.height=h+"px",this.brainCanvasHeight=h},l=()=>{window.removeEventListener("mousemove",d),window.removeEventListener("mouseup",l)};window.addEventListener("mousemove",d),window.addEventListener("mouseup",l)})}n&&t&&n.addEventListener("click",()=>{this.brainCanvasHidden=!this.brainCanvasHidden;let a=this.shadow.querySelector("#eq-brain-resize-handle");this.brainCanvasHidden?(t.classList.add("is-hidden"),n.innerHTML=k.eyeOff,n.title="Mostrar visualizador",a&&(a.style.display="none")):(t.classList.remove("is-hidden"),n.innerHTML=k.eye,n.title="Ocultar visualizador",a&&(a.style.display=""))}),i&&i.addEventListener("click",()=>this.smartCopy())}}copyCurrentContent(){this.smartCopy()}getBrainFileText(e){if(e===this.GLOBAL_ID)return this.buildGlobalContext();if(e==="ai-prompt")return this.latestPromptText||this.latestPlan?.promptSent||""||"// Nenhum prompt enviado ainda. Execute o Autopilot para gerar.";if(e==="ai-context"){let i=this.latestContext;if(!i)return"// Aguardando captura de contexto pelo EasyQuiz...";let a={scope:i.scope.tagName.toLowerCase()+(i.scope.id?"#"+i.scope.id:"")+(i.scope.className?"."+i.scope.className.split(" ").join("."):""),questionLength:i.questionText.length,questionSnippet:i.questionText.slice(0,200)+(i.questionText.length>200?"...":""),controlsCount:i.controls.length,controls:i.controls.map((r,s)=>({index:s+1,tag:r.tag,type:r.type,name:r.name||void 0,id:r.id||void 0,value:r.value||void 0,label:r.label||void 0,role:r.role}))};return JSON.stringify(a,null,2)}if(e==="ai-response"){let i=this.latestPlan;return i?i.rawResponse||JSON.stringify({pageType:i.pageType,mode:i.mode,confidence:i.confidence,rationale:i.rationale,actions:i.actions},null,2):"// Aguardando retorno da API..."}if(e.startsWith("img-")){let i=parseInt(e.slice(4),10),a=this.latestImages[i];if(!a)return"Imagem n\xE3o encontrada.";let r=this.latestImageDescriptions.find(s=>s.index===i);return[`Imagem ${i+1} de ${this.latestImages.length}`,`Status: ${a.captureStatus||"desconhecido"}`,`Relev\xE2ncia: ${r?.relevant??!0?"Relevante":"Ignorada"}`,`Tipo: ${a.mediaType||"--"}`,a.alt?`Alt: ${a.alt}`:"",a.source?`Fonte: ${a.source}`:"",a.associatedLabel?`R\xF3tulo: ${a.associatedLabel}`:"",r?.description?`
An\xE1lise IA: ${r.description}`:"",a.textContext?`
Contexto textual: ${a.textContext}`:""].filter(Boolean).join(`
`)}let t=this.latestPlan;return{rationale:t?.rationale||"Aguardando racioc\xEDnio da IA (ou extra\xE7\xE3o em andamento)...",actions:t?.actions?.length?JSON.stringify(t.actions,null,2):"// Nenhuma a\xE7\xE3o planejada no momento.",summary:t?`Modo: ${t.mode||"auto"}
Confian\xE7a: ${Math.round((t.confidence||0)*100)}%
A\xE7\xF5es: ${t.actions?.length||0}
Modelo: ${t.usedModel||"--"}`:"Aguardando primeira an\xE1lise completa...",prompt:t?.promptSent||this.latestPromptText||"Nenhum prompt em mem\xF3ria. A IA ainda n\xE3o foi acionada.",rag:t?.ragContext||"Nenhuma mem\xF3ria estendida usada ou capturada.","meta-model":`Modelo Ativo: ${t?.usedModel||this.initialSettings.model||"--"}`,"meta-latency":t?.durationMs?`Lat\xEAncia: ${t.durationMs}ms`:"Lat\xEAncia: --","meta-tokens":t?.tokensUsed?`Tokens: ${t.tokensUsed}`:"Tokens: --","exec-steps":t?.executionResult?.steps?.map(i=>JSON.stringify(i)).join(`
`)||"Passos de execu\xE7\xE3o ainda n\xE3o iniciados.","exec-result":t?.executionResult?JSON.stringify(t.executionResult,null,2):"Aguardando resultado de execu\xE7\xE3o..."}[e]??"Conte\xFAdo n\xE3o dispon\xEDvel para este arquivo."}buildGlobalContext(){let e=this.latestPlan,t=this.latestContext,n=this.latestImages,i=r=>String(r??"-- sem dados --"),a=["# Vis\xE3o Global \u2014 EasyQuiz","",`**URL:** ${window.location.href}`,`**T\xEDtulo:** ${document.title}`,`**M\xEDdias Capturadas:** ${n.length} imagem(ns)`,"","---","","## Status da Extra\xE7\xE3o Local","","### Texto do Enunciado Detectado",t?t.questionText:"Aguardando captura do DOM...","","### Controles (Alternativas/Bot\xF5es)",t&&t.controls.length>0?t.controls.map(r=>`- [${r.type}] ${r.label||r.id||r.name||r.value||"Sem r\xF3tulo"}`).join(`
`):"Nenhum controle capturado ainda.","","---","","## Resposta da IA","","### Racioc\xEDnio (Rationale)",i(e?.rationale||"Aguardando an\xE1lise da IA..."),"","### A\xE7\xF5es a Executar",e?.actions?.length?JSON.stringify(e.actions,null,2):"// Nenhuma a\xE7\xE3o planejada no momento.","","### Resumo",e?`- Modo: ${e.mode||"auto"}
- Confian\xE7a: ${Math.round((e.confidence||0)*100)}%
- Total de a\xE7\xF5es: ${e.actions?.length||0}
- Modelo: ${e.usedModel||"--"}`:"Aguardando primeira an\xE1lise...","","---","","## Inje\xE7\xE3o & Metadados","","### Prompt Enviado (Raw)",i(e?.promptSent||this.latestPromptText||"Nenhum prompt em mem\xF3ria."),"","### Contexto RAG Acumulado",i(e?.ragContext||"Nenhuma mem\xF3ria estendida usada."),"",`- **Modelo Configurado:** ${e?.usedModel||this.initialSettings.model||"--"}`,`- **Lat\xEAncia \xDAltimo Call:** ${e?.durationMs?e.durationMs+"ms":"--"}`,`- **Tokens Consumidos:** ${e?.tokensUsed??"--"}`,""];return e?.executionResult&&(a.push("---","","## Execu\xE7\xE3o Autom\xE1tica (Autopilot)",""),a.push("### Steps (Passo a Passo)"),a.push(e.executionResult?.steps?.map(r=>JSON.stringify(r)).join(`
`)||"Sem passos."),a.push("","### Resultado Final"),a.push(JSON.stringify(e.executionResult,null,2))),a.join(`
`)}renderBrainExplorer(){let e=this.shadow.querySelector("#eq-brain-explorer");if(!e)return;e.innerHTML="";let t=this.getActiveFolder(),n=document.createElement("div");n.className="eq-tree-file eq-tree-global"+(this.brainActiveTab===this.GLOBAL_ID?" is-selected":""),n.innerHTML=`<span class="eq-tree-ficon" style="color:#60a5fa">${k.folderTree}</span><span class="eq-tree-label">${this.GLOBAL_LABEL}</span>`,n.addEventListener("click",()=>{this.brainSelectedFolder=null,this.openBrainFile(this.GLOBAL_ID,this.GLOBAL_LABEL)}),e.appendChild(n);let i=document.createElement("div");i.className="eq-tree-sep",e.appendChild(i);for(let a of this.getBrainFolders()){let r=this.brainOpenFolders.has(a.id),s=this.brainSelectedFolder===a.id||t===a.id,d=document.createElement("div");d.className="eq-tree-folder"+(s?" is-folder-sel":"");let l=document.createElement("span");l.className="eq-tree-arrow",l.innerHTML=r?k.chevronDown:k.chevronRight,l.addEventListener("click",p=>{p.stopPropagation(),this.brainOpenFolders.has(a.id)?this.brainOpenFolders.delete(a.id):this.brainOpenFolders.add(a.id),this.renderBrainExplorer()}),d.appendChild(l);let u=document.createElement("span");u.className="eq-tree-ficon",u.style.color="#fbbf24",u.innerHTML=k.folder;let h=document.createElement("span");h.className="eq-tree-label",h.textContent=a.label,d.appendChild(u),d.appendChild(h),d.addEventListener("click",()=>{this.brainSelectedFolder=a.id,this.brainActiveTab=null,this.showFolderContent(a),this.renderBrainExplorer(),this.renderBrainTabs()}),e.appendChild(d);let c=document.createElement("div"),m=a.files.length+(a.subfolders?.reduce((p,g)=>p+g.files.length+1,0)??0);c.className="eq-tree-children"+(r?" is-open":""),c.style.setProperty("--child-count",String(m));for(let p of a.files){let g=this.getBrainFileColor(p.icon),f=document.createElement("div");f.className="eq-tree-file"+(this.brainActiveTab===p.id?" is-selected":""),f.innerHTML=`<span class="eq-tree-ficon" style="color:${g}">${k[p.icon]||k.file}</span><span class="eq-tree-label">${p.label}</span>`,f.addEventListener("click",b=>{b.stopPropagation(),this.brainSelectedFolder=null,this.openBrainFile(p.id,p.label)}),c.appendChild(f)}for(let p of a.subfolders||[]){let g=this.brainOpenFolders.has(p.id),f=this.brainSelectedFolder===p.id,b=document.createElement("div");b.className="eq-tree-folder eq-tree-subfolder"+(f?" is-folder-sel":""),b.style.paddingLeft="18px";let v=document.createElement("span");v.className="eq-tree-arrow",v.innerHTML=g?k.chevronDown:k.chevronRight,v.addEventListener("click",C=>{C.stopPropagation(),this.brainOpenFolders.has(p.id)?this.brainOpenFolders.delete(p.id):this.brainOpenFolders.add(p.id),this.renderBrainExplorer()}),b.appendChild(v);let y=document.createElement("span");y.className="eq-tree-ficon",y.style.color="#60a5fa",y.innerHTML=k[p.icon]||k.folder;let E=document.createElement("span");E.className="eq-tree-label",E.textContent=p.label;let w=document.createElement("span");w.style.cssText="font-size:9px;color:#666;margin-left:4px;flex-shrink:0;",w.textContent=String(p.files.length),b.appendChild(y),b.appendChild(E),b.appendChild(w),b.addEventListener("click",()=>{this.brainSelectedFolder=p.id,this.brainActiveTab=null,this.brainOpenFolders.add(p.id),this.showSubfolderContent(p),this.renderBrainExplorer(),this.renderBrainTabs()}),c.appendChild(b);let q=document.createElement("div");q.className="eq-tree-children"+(g?" is-open":""),q.style.setProperty("--child-count",String(p.files.length));for(let C of p.files){let L=this.getBrainFileColor(C.icon),A=document.createElement("div");A.className="eq-tree-file"+(this.brainActiveTab===C.id?" is-selected":""),A.style.paddingLeft="32px",A.innerHTML=`<span class="eq-tree-ficon" style="color:${L}">${k[C.icon]||k.file}</span><span class="eq-tree-label">${C.label}</span>`,A.addEventListener("click",P=>{P.stopPropagation(),this.brainSelectedFolder=null,this.openBrainFile(C.id,C.label)}),q.appendChild(A)}c.appendChild(q)}e.appendChild(c)}}showFolderContent(e){let t=this.shadow.querySelector("#eq-brain-content");if(!t)return;t.innerHTML="";let n=s=>String(s??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"),i=document.createElement("div");i.className="eq-folder-view";let a=document.createElement("div");a.className="eq-folder-view-header",a.innerHTML=`<span class="eq-tree-ficon" style="color:#fbbf24">${k.folder}</span><span>${n(e.label)}</span>`,i.appendChild(a);let r=document.createElement("div");r.className="eq-folder-view-files";for(let s of e.files){let d=this.getBrainFileColor(s.icon),l=document.createElement("div");l.className="eq-folder-view-row",l.innerHTML=`<span class="eq-tree-ficon" style="color:${d}">${k[s.icon]||k.file}</span><span>${n(s.label)}</span>`,l.addEventListener("click",()=>this.openBrainFile(s.id,s.label)),r.appendChild(l)}for(let s of e.subfolders||[]){let d=document.createElement("div");d.className="eq-folder-view-row",d.style.cssText="display:flex;align-items:center;gap:6px;padding:7px 10px;cursor:pointer;border-radius:5px;";let l=s.id==="media-images"?this.latestImages.length:s.files.length;d.innerHTML=`<span class="eq-tree-ficon" style="color:#60a5fa">${k[s.icon]||k.folder}</span><span style="flex:1">${n(s.label)}</span><span style="font-size:9px;color:#555;">${l} item${l!==1?"s":""}</span>`,d.addEventListener("mouseenter",()=>{d.style.background="rgba(255,255,255,0.04)"}),d.addEventListener("mouseleave",()=>{d.style.background=""}),d.addEventListener("click",()=>{this.brainSelectedFolder=s.id,this.brainActiveTab=null,this.brainOpenFolders.add(s.id),this.showSubfolderContent(s),this.renderBrainExplorer(),this.renderBrainTabs()}),r.appendChild(d)}i.appendChild(r),t.appendChild(i)}openBrainFile(e,t){if(this.brainOpenTabs.find(n=>n.id===e)||this.brainOpenTabs.push({id:e,label:t}),this.brainActiveTab=e,this.brainCanvasHidden){let n=this.shadow.querySelector(".eq-brain-canvas"),i=this.shadow.querySelector("#eq-brain-canvas-toggle");n?.classList.remove("is-hidden"),i&&(i.innerHTML=k.eye,i.title="Ocultar visualizador"),this.brainCanvasHidden=!1}this.renderBrainExplorer(),this.renderBrainTabs(),this.renderBrainFileContent(e)}showSubfolderContent(e){e.id==="media-images"?this.showMediaGrid():this.showFolderContent(e)}showMediaGrid(){let e=this.shadow.querySelector("#eq-brain-content");if(!e)return;e.innerHTML="";let t=this.latestImages,n=this.latestImageDescriptions,i=document.createElement("div");i.style.cssText="display:flex;flex-direction:column;height:100%;overflow:hidden;";let a=document.createElement("div");a.style.cssText="padding:8px 12px;font-size:10px;color:#666;border-bottom:1px solid rgba(255,255,255,0.06);display:flex;justify-content:space-between;flex-shrink:0;",a.innerHTML=`<span style="color:#60a5fa;font-weight:600;">Imagens</span><span>${t.length} captura${t.length!==1?"s":""}</span>`,i.appendChild(a);let r=document.createElement("div");if(r.style.cssText="flex:1;overflow-y:auto;padding:10px;",t.length===0)r.innerHTML='<div style="text-align:center;padding:32px 0;color:#555;font-size:11px;">Nenhuma imagem capturada.<br><span style="opacity:0.6;font-size:10px;">Ative "Vis\xE3o Computacional" nas configura\xE7\xF5es e execute uma an\xE1lise.</span></div>';else{let s=document.createElement("div");s.style.cssText="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;",t.forEach((d,l)=>{let h=n.find(g=>g.index===l)?.relevant??!0,c=d.base64?`data:${d.mediaType||"image/jpeg"};base64,${d.base64}`:"",m=document.createElement("div");if(m.style.cssText=`position:relative;aspect-ratio:1;border-radius:5px;overflow:hidden;cursor:pointer;background:#111;border:2px solid ${h?"rgba(96,165,250,0.3)":"rgba(255,255,255,0.06)"};transition:border-color 0.15s,transform 0.12s;`,c){let g=document.createElement("img");g.src=c,g.style.cssText="width:100%;height:100%;object-fit:cover;display:block;",m.appendChild(g)}else{let g=document.createElement("div");g.style.cssText="width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:#555;font-size:10px;",g.textContent="Texto",m.appendChild(g)}let p=document.createElement("div");p.style.cssText="position:absolute;bottom:3px;right:3px;background:rgba(0,0,0,0.75);border-radius:3px;padding:1px 4px;font-size:9px;color:#aaa;",p.textContent=String(l+1),m.appendChild(p),m.addEventListener("mouseenter",()=>{m.style.transform="scale(1.03)",m.style.borderColor="#60a5fa"}),m.addEventListener("mouseleave",()=>{m.style.transform="",m.style.borderColor=h?"rgba(96,165,250,0.3)":"rgba(255,255,255,0.06)"}),m.addEventListener("click",()=>{this.brainSelectedFolder=null,this.openBrainFile("img-"+l,"img-"+(l+1)+"."+(d.mediaType?.split("/")?.[1]||"jpg"))}),s.appendChild(m)}),r.appendChild(s)}i.appendChild(r),e.appendChild(i)}showImageFile(e){let t=this.shadow.querySelector("#eq-brain-content");if(!t)return;t.innerHTML="";let n=this.latestImages[e];if(!n){t.innerHTML='<div style="padding:16px;color:#666;font-size:11px;">Imagem n\xE3o encontrada.</div>';return}let i=this.latestImageDescriptions.find(m=>m.index===e),a=n.base64?`data:${n.mediaType||"image/jpeg"};base64,${n.base64}`:"",r=i?.relevant??!0,s=n.captureStatus==="captured"?"Visual":n.captureStatus==="text_only"?"Texto":"Falhou",d=n.captureStatus==="captured"?"#4ade80":n.captureStatus==="text_only"?"#fbbf24":"#ef4444",l=document.createElement("div");l.style.cssText="display:flex;flex-direction:column;height:100%;overflow:hidden;";let u=document.createElement("div");if(u.style.cssText="flex:0 0 auto;background:#0a0a0f;display:flex;align-items:center;justify-content:center;padding:10px;min-height:140px;max-height:55%;cursor:zoom-in;border-bottom:1px solid rgba(255,255,255,0.06);position:relative;overflow:hidden;",a){let m=document.createElement("img");m.src=a,m.alt=n.alt||`Imagem ${e+1}`,m.style.cssText="max-width:100%;max-height:100%;object-fit:contain;border-radius:4px;transform-origin:center center;transition:transform 0.12s ease;user-select:none;",u.appendChild(m);let p=1,g=.5,f=4;u.addEventListener("wheel",y=>{y.preventDefault(),y.stopPropagation();let E=y.deltaY>0?-.15:.15;p=Math.min(f,Math.max(g,p+E)),m.style.transform=p===1?"":`scale(${p.toFixed(2)})`,u.style.cursor=p>1?"grab":"zoom-in";let w=u.querySelector(".eq-zoom-hint");w&&(w.textContent=p!==1?`${Math.round(p*100)}% \xB7 scroll para zoom \xB7 clique para ampliar`:"scroll para zoom \xB7 clique para ampliar")},{passive:!1}),u.addEventListener("click",()=>this.openImageLightbox(e));let b=document.createElement("div");b.className="eq-zoom-hint",b.style.cssText="position:absolute;bottom:6px;right:8px;font-size:9px;color:rgba(255,255,255,0.3);pointer-events:none;",b.textContent="scroll para zoom \xB7 clique para ampliar",u.appendChild(b);let v=this.latestImages.length;if(v>1){let y=E=>{let w=document.createElement("button");return w.style.cssText=`position:absolute;${E==="prev"?"left:6px":"right:6px"};top:50%;transform:translateY(-50%);background:rgba(0,0,0,0.55);border:1px solid rgba(255,255,255,0.12);color:#ccc;width:24px;height:24px;border-radius:50%;cursor:pointer;font-size:13px;z-index:5;display:flex;align-items:center;justify-content:center;transition:background 0.12s;`,w.innerHTML=E==="prev"?"\u2039":"\u203A",w.title=E==="prev"?"Imagem anterior":"Pr\xF3xima imagem",w.style.display=E==="prev"&&e===0||E==="next"&&e===v-1?"none":"flex",w.addEventListener("mouseenter",()=>{w.style.background="rgba(96,165,250,0.3)"}),w.addEventListener("mouseleave",()=>{w.style.background="rgba(0,0,0,0.55)"}),w.addEventListener("click",q=>{q.stopPropagation();let C=E==="prev"?e-1:e+1;if(C>=0&&C<v){this.brainActiveTab="img-"+C;let L=this.latestImages[C],A="img-"+(C+1)+"."+(L?.mediaType?.split("/")?.[1]||"jpg");this.brainOpenTabs.find(P=>P.id==="img-"+C)||this.brainOpenTabs.push({id:"img-"+C,label:A}),this.renderBrainExplorer(),this.renderBrainTabs(),this.showImageFile(C)}}),w};u.appendChild(y("prev")),u.appendChild(y("next"))}}else u.style.cssText+="color:#555;font-size:11px;",u.textContent="Sem dados visuais \u2014 captura em modo texto";l.appendChild(u);let h=document.createElement("div");h.style.cssText="flex:1;overflow-y:auto;padding:10px 12px;display:flex;flex-direction:column;gap:7px;";let c=(m,p,g="#aaa")=>{let f=document.createElement("div");return f.style.cssText="display:flex;gap:8px;font-size:10.5px;",f.innerHTML=`<span style="color:#555;min-width:72px;flex-shrink:0;">${m}</span><span style="color:${g};word-break:break-word;">${p}</span>`,f};if(h.appendChild(c("\xCDndice",`Imagem ${e+1} de ${this.latestImages.length}`)),h.appendChild(c("Status",s,d)),h.appendChild(c("Relev\xE2ncia",r?"Relevante":"Ignorada",r?"#60a5fa":"#666")),h.appendChild(c("Tipo",n.mediaType||"--")),n.alt&&h.appendChild(c("Alt text",n.alt)),n.source&&h.appendChild(c("Fonte",n.source)),n.associatedLabel&&h.appendChild(c("R\xF3tulo",n.associatedLabel)),i?.description){let m=document.createElement("div");m.style.cssText="background:rgba(96,165,250,0.06);border:1px solid rgba(96,165,250,0.15);border-radius:5px;padding:8px;",m.innerHTML=`<div style="font-size:9px;color:#60a5fa;font-weight:600;margin-bottom:4px;">AN\xC1LISE DA IA</div><div style="font-size:10.5px;color:#ccc;line-height:1.55;">${i.description}</div>`,h.appendChild(m)}if(n.textContext){let m=document.createElement("div");m.style.cssText="background:rgba(251,191,36,0.05);border:1px solid rgba(251,191,36,0.12);border-radius:5px;padding:8px;",m.innerHTML=`<div style="font-size:9px;color:#fbbf24;font-weight:600;margin-bottom:4px;">CONTEXTO TEXTUAL</div><div style="font-size:10.5px;color:#ccc;line-height:1.55;">${n.textContext}</div>`,h.appendChild(m)}l.appendChild(h),t.appendChild(l)}openImageLightbox(e){let t=this.latestImages[e];if(!t)return;let n=this.latestImageDescriptions.find(w=>w.index===e),i=t.base64?`data:${t.mediaType||"image/jpeg"};base64,${t.base64}`:"";this.shadow.querySelector("#eq-img-lightbox")?.remove();let a=document.createElement("div");a.id="eq-img-lightbox",a.style.cssText="position:fixed;inset:0;z-index:2147483647;background:rgba(0,0,0,0.92);display:flex;align-items:center;justify-content:center;padding:20px;box-sizing:border-box;";let r=document.createElement("div");r.style.cssText="display:flex;width:min(90vw,1100px);max-height:90vh;border-radius:10px;background:#0f0f17;border:1px solid rgba(255,255,255,0.1);box-shadow:0 24px 64px rgba(0,0,0,0.8);position:relative;overflow:hidden;";let s=document.createElement("div");s.style.cssText="position:absolute;top:0;left:0;right:0;z-index:20;display:flex;align-items:center;justify-content:space-between;padding:7px 12px;background:rgba(0,0,0,0.6);backdrop-filter:blur(4px);border-bottom:1px solid rgba(255,255,255,0.07);border-radius:10px 10px 0 0;";let d=document.createElement("span");d.style.cssText="font-size:11px;color:rgba(234,240,248,0.45);font-weight:600;letter-spacing:0.04em;user-select:none;",d.textContent="Imagem "+(e+1)+" de "+this.latestImages.length;let l=document.createElement("button");l.style.cssText="background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.14);color:rgba(234,240,248,0.65);width:26px;height:26px;border-radius:6px;cursor:pointer;font-size:16px;display:flex;align-items:center;justify-content:center;line-height:1;transition:background 0.15s,color 0.15s;flex-shrink:0;",l.textContent="\xD7",l.title="Fechar (ESC)",l.addEventListener("mouseenter",()=>{l.style.background="rgba(239,68,68,0.32)",l.style.color="#fff"}),l.addEventListener("mouseleave",()=>{l.style.background="rgba(255,255,255,0.08)",l.style.color="rgba(234,240,248,0.65)"}),s.appendChild(d),s.appendChild(l);let u=document.createElement("div");if(u.style.cssText="flex:0 0 65%;display:flex;align-items:center;justify-content:center;background:#050508;padding:16px;min-width:0;overflow:hidden;position:relative;",i){let w=document.createElement("img");w.src=i,w.style.cssText="max-width:100%;max-height:82vh;object-fit:contain;border-radius:4px;transform-origin:center center;transition:transform 0.1s ease;user-select:none;display:block;";let q=1,C=.3,L=6;u.addEventListener("wheel",P=>{P.preventDefault(),P.stopPropagation();let O=P.deltaY<0?.18:-.18;q=Math.min(L,Math.max(C,q+O)),w.style.transform=`scale(${q.toFixed(3)})`,w.style.cursor=q>1?"grab":"default",A.textContent=`${Math.round(q*100)}%`,A.style.opacity="1",clearTimeout(u._zt),u._zt=setTimeout(()=>{A.style.opacity="0"},1200)},{passive:!1}),w.addEventListener("dblclick",()=>{q=1,w.style.transform="",w.style.cursor="default",A.textContent="100%",A.style.opacity="1",setTimeout(()=>{A.style.opacity="0"},800)});let A=document.createElement("div");A.style.cssText="position:absolute;bottom:10px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,0.7);color:#aaa;font-size:10px;padding:2px 8px;border-radius:10px;pointer-events:none;opacity:0;transition:opacity 0.3s;",A.textContent="100%",u.appendChild(w),u.appendChild(A)}else u.innerHTML='<div style="color:#555;font-size:12px;text-align:center;width:100%;">Sem dados visuais</div>';u.style.paddingTop="44px",r.appendChild(u);let h=document.createElement("div");h.style.cssText="flex:0 0 35%;overflow-y:auto;padding:20px 16px 20px;border-left:1px solid rgba(255,255,255,0.06);display:flex;flex-direction:column;gap:8px;min-width:0;";let c=document.createElement("div");c.style.cssText="font-size:13px;font-weight:700;color:#e0e0e0;margin-bottom:6px;",c.textContent=`Imagem ${e+1} de ${this.latestImages.length}`,h.appendChild(c);let m=t.captureStatus==="captured"?"#4ade80":t.captureStatus==="text_only"?"#fbbf24":"#ef4444",p=t.captureStatus==="captured"?"Visual":t.captureStatus==="text_only"?"Texto":"Falhou",g=(w,q,C="#aaa")=>{let L=document.createElement("div");return L.style.cssText="display:flex;gap:6px;font-size:10px;",L.innerHTML=`<span style="color:#555;min-width:64px;flex-shrink:0;">${w}</span><span style="color:${C};word-break:break-word;">${q}</span>`,L};h.appendChild(g("Status",p,m)),h.appendChild(g("Relev\xE2ncia",n?.relevant??!0?"Relevante":"Ignorada",n?.relevant??!0?"#60a5fa":"#666")),h.appendChild(g("Tipo",t.mediaType||"--")),t.alt&&h.appendChild(g("Alt",t.alt)),t.source&&h.appendChild(g("Fonte",t.source)),t.associatedLabel&&h.appendChild(g("R\xF3tulo",t.associatedLabel));let f=document.createElement("div");if(f.style.cssText="font-size:9px;color:#444;margin-top:4px;",f.textContent="Scroll na imagem para zoom \xB7 Duplo-clique para resetar",h.appendChild(f),n?.description){let w=document.createElement("div");w.style.cssText="background:rgba(96,165,250,0.07);border:1px solid rgba(96,165,250,0.18);border-radius:5px;padding:8px;margin-top:4px;",w.innerHTML=`<div style="font-size:9px;color:#60a5fa;font-weight:700;margin-bottom:5px;">AN\xC1LISE DA IA</div><div style="font-size:10px;color:#ccc;line-height:1.6;">${n.description}</div>`,h.appendChild(w)}if(t.textContext){let w=document.createElement("div");w.style.cssText="background:rgba(251,191,36,0.05);border:1px solid rgba(251,191,36,0.12);border-radius:5px;padding:8px;",w.innerHTML=`<div style="font-size:9px;color:#fbbf24;font-weight:700;margin-bottom:5px;">CONTEXTO TEXTUAL</div><div style="font-size:10px;color:#ccc;line-height:1.6;">${t.textContext}</div>`,h.appendChild(w)}r.appendChild(h),r.appendChild(s),a.appendChild(r),document.body.appendChild(a);let b=()=>{a.remove(),document.removeEventListener("click",v,!0),document.removeEventListener("keydown",E),window.removeEventListener("keydown",E)};l.addEventListener("click",w=>{w.stopPropagation(),b()}),r.addEventListener("click",w=>w.stopPropagation()),a.addEventListener("click",()=>b());let v=w=>{let q=this.shadow.host;q&&!q.contains(w.target)&&b()};setTimeout(()=>document.addEventListener("click",v,!0),0);let y=this.latestImages.length;if(y>1){let w=q=>{let C=document.createElement("button");return C.style.cssText=`position:absolute;${q==="prev"?"left:12px":"right:12px"};top:50%;transform:translateY(-50%);background:rgba(0,0,0,0.6);border:1px solid rgba(255,255,255,0.15);color:#ddd;width:36px;height:36px;border-radius:50%;cursor:pointer;font-size:22px;z-index:10;display:${q==="prev"&&e===0||q==="next"&&e===y-1?"none":"flex"};align-items:center;justify-content:center;`,C.innerHTML=q==="prev"?"\u2039":"\u203A",C.title=q==="prev"?"Anterior":"Pr\xF3xima",C.addEventListener("mouseenter",()=>{C.style.background="rgba(96,165,250,0.35)"}),C.addEventListener("mouseleave",()=>{C.style.background="rgba(0,0,0,0.6)"}),C.addEventListener("click",L=>{L.stopPropagation();let A=q==="prev"?e-1:e+1;A>=0&&A<y&&(a.remove(),this.openImageLightbox(A))}),C};a.appendChild(w("prev")),a.appendChild(w("next"))}let E=w=>{w.key==="Escape"&&b()};window.addEventListener("keydown",E),document.addEventListener("keydown",E)}closeBrainTab(e){let t=this.brainOpenTabs.findIndex(n=>n.id===e);t!==-1&&(this.brainOpenTabs.splice(t,1),this.brainActiveTab===e&&(this.brainActiveTab=this.brainOpenTabs[t-1]?.id||this.brainOpenTabs[0]?.id||null),this.renderBrainExplorer(),this.renderBrainTabs(),this.refreshBrainCanvas())}refreshBrainCanvas(){if(this.brainActiveTab)this.renderBrainFileContent(this.brainActiveTab);else if(this.brainSelectedFolder){if(this.brainSelectedFolder==="media-images"){this.showMediaGrid();return}for(let t of this.getBrainFolders()){let n=(t.subfolders||[]).find(i=>i.id===this.brainSelectedFolder);if(n){this.showSubfolderContent(n);return}}let e=this.getBrainFolders().find(t=>t.id===this.brainSelectedFolder);if(e)this.showFolderContent(e);else{let t=this.shadow.querySelector("#eq-brain-content");t&&(t.innerHTML='<div class="eq-brain-empty-canvas"><div style="margin-bottom:4px;opacity:0.5">Nada selecionado</div><div class="eq-brain-empty-sub">Selecione um arquivo no explorador abaixo para visualiz\xE1-lo</div></div>')}}else{let e=this.shadow.querySelector("#eq-brain-content");e&&(e.innerHTML='<div class="eq-brain-empty-canvas"><div style="margin-bottom:4px;opacity:0.5">Nada selecionado</div><div class="eq-brain-empty-sub">Selecione um arquivo no explorador abaixo para visualiz\xE1-lo</div></div>')}}renderBrainTabs(){let e=this.shadow.querySelector("#eq-brain-tabbar");if(e){e.innerHTML="";for(let t of this.brainOpenTabs){let n=document.createElement("div");n.className="eq-brain-tab"+(this.brainActiveTab===t.id?" is-active":""),n.innerHTML=`<span class="eq-brain-tab-icon">${t.id===this.GLOBAL_ID?k.folderTree:k.file}</span><span class="eq-brain-tab-label">${t.label}</span><button class="eq-brain-tab-close" data-tab-id="${t.id}" type="button">${k.close}</button>`,n.addEventListener("click",i=>{let a=i.target.closest(".eq-brain-tab-close");a?this.closeBrainTab(a.dataset.tabId):(this.brainActiveTab=t.id,this.brainSelectedFolder=null,this.renderBrainExplorer(),this.renderBrainTabs(),this.renderBrainFileContent(t.id))}),e.appendChild(n)}}}renderBrainFileContent(e){let t=this.shadow.querySelector("#eq-brain-content");if(!t)return;if(e.startsWith("img-")){this.showImageFile(parseInt(e.slice(4),10));return}let n=this.getBrainFileText(e),i=h=>String(h??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"),a=e===this.GLOBAL_ID,r=e==="rationale"||a,d=a||r?"markdown":e==="actions"||e==="exec-result"?"json":"text";t.innerHTML="";let l=document.createElement("div");l.className="eq-brain-file-view";let u=document.createElement("div");if(u.className="eq-brain-file-header",u.innerHTML=`<span class="eq-brain-file-lang">${i(d)}</span>`,l.appendChild(u),r){let h=document.createElement("div");h.className="eq-brain-markdown";try{h.innerHTML=this.renderMarkdown(n||"(sem conte\xFAdo)")}catch{h.textContent=n||"(sem conte\xFAdo)"}l.appendChild(h)}else{let h=document.createElement("pre");h.className="eq-brain-code";let c=document.createElement("code");c.textContent=n||"(sem conte\xFAdo)",h.appendChild(c),l.appendChild(h)}t.appendChild(l)}initTerminalWallpaper(){let e=this.shadow.querySelector("#eq-view-debug");if(!e)return;e.style.position="relative",this.shadow.querySelector("#eq-wallpaper-canvas")?.remove();let t=document.createElement("canvas");t.id="eq-wallpaper-canvas",t.style.cssText="position:absolute;inset:0;pointer-events:none;z-index:0;width:100%;height:100%;",e.insertBefore(t,e.firstChild),this._startWallpaperAnim(t)}_startWallpaperAnim(e){cancelAnimationFrame(this._wallpaperRAF);let t=e.getContext("2d");if(!t)return;let n=18,i=.082,a=[{a:0,r:.28,s:.006},{a:Math.PI*.667,r:.22,s:-.004},{a:Math.PI*1.333,r:.32,s:.003}];if(!this._wlpWhiteLogo){let d=new Image;d.onload=()=>{let l=document.createElement("canvas");l.width=d.naturalWidth||d.width,l.height=d.naturalHeight||d.height;let u=l.getContext("2d");u.drawImage(d,0,0),u.globalCompositeOperation="source-atop",u.fillStyle="#fff",u.fillRect(0,0,l.width,l.height),this._wlpWhiteLogo=l},d.src=k.canvasLogo}let r=0,s=()=>{let d=e.offsetWidth,l=e.offsetHeight;if(!d||!l){this._wallpaperRAF=requestAnimationFrame(s);return}e.width!==d&&(e.width=d),e.height!==l&&(e.height=l),t.clearRect(0,0,d,l),r+=.013;for(let p of a)p.a+=p.s;let u=Math.ceil(d/n)+1,h=Math.ceil(l/n)+1,c=u*.5,m=h*.5;for(let p=0;p<h;p++)for(let g=0;g<u;g++){let f=0;for(let v of a){let y=c+Math.cos(v.a)*u*v.r,E=m+Math.sin(v.a)*h*v.r,w=Math.sqrt((g-y)**2+(p-E)**2);f+=Math.sin(w*.85-r*3.5)*Math.exp(-w*.09)}let b=Math.max(0,f/a.length)*i;b<.003||(t.fillStyle=`rgba(255,255,255,${b.toFixed(3)})`,t.fillRect(g*n,p*n,n,n))}if(this._wlpWhiteLogo){let p=l*.33,g=p*(this._wlpWhiteLogo.width/this._wlpWhiteLogo.height);t.globalAlpha=.038,t.drawImage(this._wlpWhiteLogo,(d-g)/2,(l-p)/2,g,p),t.globalAlpha=1}this._wallpaperRAF=requestAnimationFrame(s)};s()}showFloatingAnswers(e){let t=e||this.latestPlan;t&&this.floatingAnswers.show(t)}hideFloatingAnswers(){this.floatingAnswers.hide()}closeCtxPopup(){this._ctxPopup?.remove(),this._ctxPopup=null,this._ctxCloseH&&(document.removeEventListener("click",this._ctxCloseH),this._ctxCloseH=null)}showCtxPopup(e,t){this.closeCtxPopup();let n=240,i=e.getBoundingClientRect(),a=Math.min(Math.max(4,i.right-n),window.innerWidth-n-4),r=i.bottom+4,s=document.createElement("div");Object.assign(s.style,{position:"fixed",top:r+"px",left:a+"px",width:n+"px",zIndex:"2147483647",display:"flex",flexDirection:"column",gap:"1px",padding:"4px",background:"rgba(10,12,20,0.25)",backdropFilter:"blur(28px) saturate(250%) brightness(0.92)",WebkitBackdropFilter:"blur(28px) saturate(250%) brightness(0.92)",border:"1px solid rgba(255,255,255,0.09)",borderRadius:"0px",boxShadow:"0 18px 56px rgba(0,0,0,0.48)",fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif'}),t.forEach(l=>{if(l.divider){let c=document.createElement("div");Object.assign(c.style,{height:"1px",background:"rgba(255,255,255,0.06)",margin:"3px 6px"}),s.appendChild(c);return}let u=document.createElement("button");if(u.type="button",Object.assign(u.style,{display:"flex",alignItems:"center",gap:"9px",width:"100%",height:"30px",padding:"0 10px",background:"transparent",border:"none",borderRadius:"1px",color:l.danger?"#f87171":"#a0a0a0",fontSize:"12px",fontWeight:"600",fontFamily:"inherit",textAlign:"left",cursor:"pointer"}),u.addEventListener("mouseenter",()=>{u.style.background=l.danger?"rgba(255,80,80,0.12)":"rgba(255,255,255,0.09)",u.style.color=l.danger?"#fca5a5":"#fff"}),u.addEventListener("mouseleave",()=>{u.style.background="transparent",u.style.color=l.danger?"#f87171":"#a0a0a0"}),l.ic){let c=document.createElement("span");Object.assign(c.style,{display:"inline-flex",width:"14px",height:"14px",flexShrink:"0",alignItems:"center",justifyContent:"center",opacity:"0.75"}),c.innerHTML=k[l.ic]||"";let m=c.querySelector("svg");m&&(m.style.width="13px",m.style.height="13px"),u.appendChild(c)}let h=document.createElement("span");if(h.style.flex="1",h.textContent=l.label,u.appendChild(h),l.badge){let c=document.createElement("span");c.textContent=l.badge,Object.assign(c.style,{fontSize:"9px",fontWeight:"700",padding:"2px 6px",background:"rgba(255,255,255,0.07)",color:"#555",borderRadius:"2px",letterSpacing:"0.06em",marginLeft:"auto"}),u.appendChild(c)}u.addEventListener("click",c=>{c.stopPropagation(),this.closeCtxPopup(),l.onClick()}),s.appendChild(u)}),document.body.appendChild(s),this._ctxPopup=s;let d=l=>{s.contains(l.target)||this.closeCtxPopup()};setTimeout(()=>{document.addEventListener("click",d),this._ctxCloseH=d},0)}renderKeysList(){if(!this.keysListEl)return;let e=U.getAllKeys();if(this.keysBadgeEl){let i=e.filter(s=>!s.isCooldown).length,a=e.reduce((s,d)=>s+(d.winCount||0),0),r=i>=3?"  TURBO":"";this.keysBadgeEl.textContent=`${e.length} chave${e.length>1?"s":""} (${i} pronta${i!==1?"s":""})${r}`,this.keysBadgeEl.className=`eq-key-badge ${i>=3?"racing":i>0?"ready":"cooldown"}`}this.keysListEl.replaceChildren();let t=this.shadow?.querySelector("#eq-keys-collapsible");t&&t.style.display!=="none"&&(t.style.maxHeight="none",t.style.overflow="visible"),[...e].sort((i,a)=>{let r=i.winCount||0,s=a.winCount||0;if(r!==s)return s-r;let d=i.lastLatencyMs||99999,l=a.lastLatencyMs||99999;if(d!==l)return d-l;let u=i.isCooldown?1:0,h=a.isCooldown?1:0;return u-h}).forEach((i,a)=>{let r=e.findIndex(v=>v.id===i.id),s=r>=0?r:a,d=document.createElement("div");d.className="eq-key-item";let l=document.createElement("div");l.className="eq-key-info";let u=document.createElement("span");u.className="eq-key-label",u.textContent=i.label||`Chave ${s+1}`;let h=document.createElement("span");h.className="eq-key-masked",h.textContent=he.maskKey(i.key),h.title="Clique para copiar a chave",h.style.cursor="pointer",h.addEventListener("click",()=>{navigator.clipboard?.writeText(i.key),this.setStatus(`Chave ${s+1} copiada para a \xE1rea de transfer\xEAncia!`,"info")});let c=document.createElement("span");if(i.isCooldown){c.className="eq-key-badge cooldown";let v=Math.ceil(i.remainingCooldownMs/1e3);c.textContent=`\u23F1 Cooldown (${v}s)`}else i.lastError&&i.errorCount&&i.errorCount>3?(c.className="eq-key-badge invalid",c.textContent="Erro",c.title=i.lastError):i.lastLatencyMs?(c.className="eq-key-badge ready",c.textContent=`Pronta (${i.lastLatencyMs}ms)`):(c.className="eq-key-badge ready",c.textContent="Pronta");l.appendChild(u),l.appendChild(h),l.appendChild(c);let m=i.winCount||0;if(m>0){let v=document.createElement("span");v.className="eq-key-badge winner",v.textContent=` ${m} vit\xF3ria${m>1?"s":""}`,v.title=`Esta chave foi a mais r\xE1pida ${m} vez${m>1?"es":""} nas corridas paralelas`,l.appendChild(v)}let p=document.createElement("div");p.className="eq-key-actions";let g=document.createElement("button");g.className="eq-icon-btn",g.type="button",g.title="Testar esta chave",g.innerHTML=k.sparkles,g.addEventListener("click",async()=>{this.setStatus(`Testando chave ${i.label||s+1}...`,"info");let v=await dt(i.key);v.ok?(U.markSuccess(i.key,120),this.setStatus(` ${i.label||`Chave ${s+1}`}: Conex\xE3o com Google Gemini aprovada!`,"success")):(U.markInvalid(i.key,v.message),this.setStatus(`\uFE0F ${i.label||`Chave ${s+1}`}: ${v.message}`,"error")),this.renderKeysList()});let f=document.createElement("button");f.className="eq-icon-btn",f.type="button",f.title="Editar chave",f.innerHTML=k.edit,f.addEventListener("click",()=>{let v=window.prompt(`Editar ${i.label||`Chave ${s+1}`}:`,i.key);if(v!==null&&v.trim()){let y=U.updateKey(i.id,v.trim());if(y.ok){let E=U.exportRawKeys();this.callbacks.onSettingsChange({apiKey:E[0],apiKeys:E}),this.setStatus(`Chave ${s+1} atualizada com sucesso!`,"success"),this.renderKeysList()}else this.setStatus(y.message,"warning")}});let b=document.createElement("button");b.className="eq-icon-btn",b.type="button",b.title="Remover chave",b.innerHTML=k.trash,b.addEventListener("click",()=>{if(confirm(`Remover permanentemente a ${i.label||`Chave ${s+1}`}?`)){let v=U.removeKey(i.id);if(v.ok){let y=U.exportRawKeys();this.callbacks.onSettingsChange({apiKey:y[0]||"",apiKeys:y}),this.setStatus("Chave removida com sucesso.","info"),this.renderKeysList()}else this.setStatus(v.message,"warning")}}),p.appendChild(g),p.appendChild(f),p.appendChild(b),d.appendChild(l),d.appendChild(p),this.keysListEl.appendChild(d)})}updateModelSelect(e,t){let n=e.filter(r=>ce(r.id)),i=t&&ce(t)?t:ce(this.initialSettings.model)?this.initialSettings.model:"gemini-2.5-flash";this.modelSelect.innerHTML="";let a=!1;n.forEach(r=>{let s=r.id===i;s&&(a=!0),this.modelSelect.add(new Option(r.name,r.id,!1,s))}),!a&&i&&ce(i)&&this.modelSelect.add(new Option(`Gemini (${i})`,i,!1,!0)),this.modelSelect.value=i}updateSelectedModel(e){if(!ce(e))return;Array.from(this.modelSelect.options).some(n=>n.value===e)||this.modelSelect.add(new Option(`Gemini (${e})`,e,!1,!0)),this.modelSelect.value=e}mountHost(){let e=document.body||document.documentElement;if(!e){let t=()=>{let n=document.body||document.documentElement;n&&!this.host.isConnected&&n.appendChild(this.host)};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",t,{once:!0}):setTimeout(t,0);return}this.host.isConnected||e.appendChild(this.host)}applyHostDarkMode(e){document.getElementById("eq-host-dark-mode-style")?.remove(),this.host.classList.toggle("eq-dark-mode-active",e)}startQuestionTimer(){this.currentQuestionStartTime=Date.now(),this.questionLiveTimerInterval&&clearInterval(this.questionLiveTimerInterval),this.metricsLiveStatus&&(this.metricsLiveStatus.textContent="Calculando...",this.metricsLiveStatus.classList.add("active"));let e=()=>{if(!this.metricsLiveTime)return;let t=Date.now()-this.currentQuestionStartTime,n=Math.floor(t/6e4),i=Math.floor(t%6e4/1e3),a=Math.floor(t%1e3/10);this.metricsLiveTime.textContent=`${String(n).padStart(2,"0")}:${String(i).padStart(2,"0")}.${String(a).padStart(2,"0")}`};e(),this.questionLiveTimerInterval=setInterval(e,50)}stopQuestionTimer(e){if(this.questionLiveTimerInterval&&(clearInterval(this.questionLiveTimerInterval),this.questionLiveTimerInterval=null),this.metricsLiveStatus&&(this.metricsLiveStatus.textContent="Parado",this.metricsLiveStatus.classList.remove("active")),this.metricsLiveTime&&this.currentQuestionStartTime>0){let t=e!==void 0?e:Math.max(0,Date.now()-this.currentQuestionStartTime),n=Math.floor(t/6e4),i=Math.floor(t%6e4/1e3),a=Math.floor(t%1e3/10);this.metricsLiveTime.textContent=`${String(n).padStart(2,"0")}:${String(i).padStart(2,"0")}.${String(a).padStart(2,"0")}`}}updateTimingMetrics(e){let t=e||Ve();if(!this.metricTotalTime)return;let n=Math.floor(t.totalElapsedMs/1e3),i=Math.floor(n/60),a=n%60;this.metricTotalTime.textContent=`${String(i).padStart(2,"0")}:${String(a).padStart(2,"0")}`;let r=(t.averageDurationMs/1e3).toFixed(1);this.metricAvgTime.textContent=`${r}s`,this.metricTotalCount.textContent=String(t.completedQuestionsCount),this.metricsTotalBadge&&(this.metricsTotalBadge.textContent=`${t.completedQuestionsCount} Quest\xE3o(\xF5es)`),this.metricsHistoryCount&&(this.metricsHistoryCount.textContent=`${t.records.length} registros`),this.renderMetricsHistory(t.records)}renderMetricsHistory(e){if(!this.metricsHistoryList)return;if(e.length===0){this.metricsHistoryList.innerHTML='<div style="text-align:center;padding:24px 0;color:#444;font-size:11px;">Nenhuma quest\xE3o respondida ainda.</div>';return}this.metricsHistoryList.innerHTML="";let t=[...e].reverse(),n=Math.max(...e.map(i=>i.durationMs),1);for(let i of t){let a=i.durationMs/1e3,r=Math.round(i.durationMs/n*100),s=i.status==="verified"||i.status==="answered",d=i.status==="manual",l=s?"#4ade80":d?"#fbbf24":"#666",u=s?"Injetado":d?"Gabarito":"Pendente",h=new Date(i.timestamp).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit",second:"2-digit"}),c=i.mode?i.mode.replace(/_/g," "):"auto",m=a<5?"#4ade80":a<15?"#fbbf24":"#ef4444",p=document.createElement("div");p.style.cssText="background:rgba(255,255,255,0.025);border:1px solid rgba(255,255,255,0.055);border-radius:7px;padding:9px 10px;margin-bottom:5px;cursor:default;transition:background 0.1s;",p.addEventListener("mouseenter",()=>{p.style.background="rgba(255,255,255,0.045)"}),p.addEventListener("mouseleave",()=>{p.style.background="rgba(255,255,255,0.025)"});let g=document.createElement("div");g.style.cssText="display:flex;align-items:flex-start;gap:8px;margin-bottom:6px;";let f=document.createElement("div");f.style.cssText="flex-shrink:0;width:22px;height:22px;border-radius:5px;background:rgba(0,152,255,0.15);border:1px solid rgba(0,152,255,0.25);display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:800;color:#0098ff;",f.textContent=String(i.questionIndex);let b=document.createElement("div");b.style.cssText="flex:1;font-size:10.5px;color:#ccc;font-weight:600;line-height:1.4;word-break:break-word;",b.textContent=i.questionTitle||"Quest\xE3o "+i.questionIndex;let v=document.createElement("div");v.style.cssText="flex-shrink:0;font-size:13px;font-weight:800;color:"+m+";font-family:monospace;font-variant-numeric:tabular-nums;",v.textContent=a<60?a.toFixed(1)+"s":Math.floor(a/60)+"m"+String(Math.round(a%60)).padStart(2,"0")+"s",g.appendChild(f),g.appendChild(b),g.appendChild(v);let y=document.createElement("div");y.style.cssText="height:2px;background:rgba(255,255,255,0.05);border-radius:1px;margin-bottom:6px;overflow:hidden;";let E=document.createElement("div");E.style.cssText="height:100%;width:"+r+"%;background:"+m+";border-radius:1px;transition:width 0.4s ease;",y.appendChild(E);let w=document.createElement("div");w.style.cssText="display:flex;align-items:center;gap:6px;flex-wrap:wrap;";let q=(T,x,H)=>{let B=document.createElement("span");return B.style.cssText="font-size:8.5px;font-weight:700;letter-spacing:0.04em;padding:1px 6px;border-radius:8px;background:rgba("+H+",0.12);color:"+x+";",B.textContent=T,B};w.appendChild(q(u,l,s?"74,222,128":d?"251,191,36":"102,102,102")),w.appendChild(q(c,"#888","255,255,255")),i.actionsCount&&w.appendChild(q(i.actionsCount+" a\xE7\xE3o"+(i.actionsCount>1?"\xF5es":""),"#888","255,255,255"));let C=document.createElement("span");C.style.cssText="font-size:8.5px;color:#444;margin-left:auto;",C.textContent=h,w.appendChild(C);let L=document.createElement("span");L.style.cssText="flex-shrink:0;display:inline-flex;color:#444;transition:transform 0.2s ease;margin-left:4px;",L.innerHTML='<svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5z"/></svg>',g.appendChild(L);let A=document.createElement("div");A.style.cssText="overflow:hidden;max-height:0;transition:max-height 0.22s ease;",A.appendChild(y),A.appendChild(w);let P=!1,O=()=>{P=!P,P?(this.metricsHistoryList?.querySelectorAll(".eq-mhist-body").forEach(T=>{if(T!==A){T.style.maxHeight="0";let x=T.parentElement?.querySelector(".eq-mhist-chevron");x&&(x.style.transform="")}}),A.style.maxHeight=A.scrollHeight+40+"px",L.style.transform="rotate(180deg)"):(A.style.maxHeight="0",L.style.transform="")};A.className="eq-mhist-body",L.className="eq-mhist-chevron",g.style.cursor="pointer",g.addEventListener("click",O),p.appendChild(g),p.appendChild(A),this.metricsHistoryList.appendChild(p)}}copyMetricsReport(){let e=Ve(),t=[];t.push("# Relat\xF3rio de Desempenho e Tempo \u2014 EasyQuiz"),t.push(`- **Quest\xF5es Respondidas:** ${e.completedQuestionsCount}`),t.push(`- **Tempo Total:** ${(e.totalElapsedMs/1e3).toFixed(1)}s`),t.push(`- **Tempo M\xE9dio por Quest\xE3o:** ${(e.averageDurationMs/1e3).toFixed(2)}s`),t.push(""),t.push("### Hist\xF3rico:"),e.records.length===0?t.push("_Nenhum registro ainda._"):e.records.forEach((n,i)=>{t.push(`${i+1}. **${n.questionTitle||`Q${n.questionIndex}`}**: ${(n.durationMs/1e3).toFixed(2)}s (${n.status})`)}),navigator.clipboard.writeText(t.join(`
`)).then(()=>{this.showToast("Relat\xF3rio copiado!","success",2500)})}destroy(){this.stopStopwatch(),this.stopQuestionTimer(),this.autopilot.stop(),this.applyHostDarkMode(!1),this.callbacks.onDestroy(),this.host.remove()}};function Tn(){try{if(typeof document>"u"||!document.head||document.querySelector("link[data-easyquiz-preconnect]"))return;let o=document.createElement("link");o.rel="preconnect",o.href="https://generativelanguage.googleapis.com",o.crossOrigin="anonymous",o.setAttribute("data-easyquiz-preconnect","true"),document.head.appendChild(o);let e=document.createElement("link");e.rel="dns-prefetch",e.href="https://generativelanguage.googleapis.com",e.setAttribute("data-easyquiz-preconnect","true"),document.head.appendChild(e)}catch{}}async function Sn(){let o=window;if(Ke(),Tn(),setTimeout(()=>{try{go()}catch{}},500),o.__easyquiz){try{o.__easyquiz.destroy()}catch{}try{document.getElementById("easyquiz-shadow-root")?.remove()}catch{}}let e=It(),t=null,n=null,i=0,a=new Tt(e,{onAnalyze:(l=1,u,h=!1)=>r(l,u,h),onApply:(l=1)=>void s(l),onDestroy:()=>{if(n){try{n.abort()}catch{}n=null}Le(),delete o.__easyquiz},onCancel:()=>{if(n){try{n.abort()}catch{}n=null}Le(),a.setProgress(0),a.setInterrupted("Opera\xE7\xE3o cancelada imediatamente pelo usu\xE1rio.")},onSettingsChange:l=>{e=eo(l)}});o.__easyquiz={toggle:()=>a.toggle(),destroy:()=>a.destroy(),analyze:async()=>{await r()}},window.addEventListener("keydown",l=>{if(l.altKey&&(l.key==="q"||l.key==="Q"||l.key==="a"||l.key==="A")){if(l.preventDefault(),!a)return;a.toggle(!0),r()}});async function r(l=1,u,h=!1){if(!e.apiKey&&(!Array.isArray(e.apiKeys)||e.apiKeys.length===0)){a.setStatus("Configure sua chave de API Gemini acima para come\xE7ar.","error"),a.toggle(!0);return}if(n)try{n.abort()}catch{}n=new AbortController;let c=n,m=()=>{try{c.abort()}catch{}};if(u&&(u.aborted?c.abort():u.addEventListener("abort",m,{once:!0})),c.signal.aborted){a.setBusy(!1),a.setProgress(0);return}i=Date.now(),a.setBusy(!0,"Identificando o bloco da quest\xE3o ativa na p\xE1gina..."),a.setProgress(20,"Varrendo escopo do DOM e controles..."),Le(),a.hideFloatingAnswers();try{let p=Te(!1);p||(a.setStatus("Nenhum controle detectado. Tentando captura de tela inteira...","info"),p=qe()),tt(p.scope),a.updateContext(p),a.logToConsole(`> [DOM] Escopo: <${p.scope.tagName.toLowerCase()}> com ${p.controls.length} controle(s) e ${p.questionText.length} caracteres.`,"text-blue"),a.setStatus(`Quest\xE3o localizada (${p.controls.length} controles). Preparando an\xE1lise...`,"info"),a.setProgress(40,`Consultando Gemini (${e.model})...`);let g=await $t(p.scope,e.useVision);if(console.log("================ [SANITY CHECK] ================"),console.log(`[DOM Scope]: ${p.scope.tagName.toLowerCase()}#${p.scope.id||"N/A"}`),console.log(`[Imagens Capturadas]: ${g.length}`),console.log(`[Texto Extra\xEDdo (In\xEDcio)]: ${p.questionText.slice(0,150).replace(/\n/g," ")}...`),console.log("================================================"),p.questionText.trim().length<10&&g.length===0){a.logToConsole("> [ERRO] Texto extra\xEDdo muito curto e sem imagens. Abortando API.","text-red"),a.setStatus("Falha de escopo: cont\xEAiner inv\xE1lido ou vazio.","error");return}if(g.length>0){let w=g.filter(q=>q.captureStatus==="captured"&&q.base64&&q.base64.length>100&&q.element);if(w.length>0){let q=w.map(C=>C.element).filter(Boolean);Yt(q)}a.updateImages(g)}if(c.signal.aborted)return;let f=e.model;a.setStatus(g.length>0?`Consultando Gemini (${f}) com ${g.length} imagem(ns) anexada(s)...`:`Consultando Gemini (${f}) via DOM nativo (modo r\xE1pido)...`,"info");let b=Ge(p,g,e);a.setInspectorPrompt(b,e.model);let v=(w,q)=>{a.setStatus(w,q==="warning"?"info":q);let C=w.match(/Onda\s+\d+.*?\[([^\]]+)\]/);if(C){let L=C[1].split(",")[0].trim();a.setProgress(50,`Gemini ${L} respondendo...`)}},{plan:y,usedModel:E}=await ut(p,g,e,v,c.signal);if(c.signal.aborted)return;if(y.needsMoreContext){if(a.setProgress(55,"Ampliando escopo da quest\xE3o..."),a.setStatus("Enunciado ou contexto isolado detectado pela IA. Acionando Sele\xE7\xE3o Geral Expandida...","info"),a.logToConsole("> [DOM] Enunciado isolado. Ampliando escopo para sele\xE7\xE3o expandida...","text-blue"),p=Te(!0),p||(p=qe()),tt(p.scope),a.updateContext(p),g=await $t(p.scope,e.useVision),g.length>0){let C=g.filter(L=>L.captureStatus==="captured"&&L.base64&&L.base64.length>100&&L.element);if(C.length>0){let L=C.map(A=>A.element).filter(Boolean);Yt(L)}a.updateImages(g)}a.setStatus(`Reconsultando IA com escopo ampliado (${p.controls.length} controles)...`,"info");let w=Ge(p,g,e);a.setInspectorPrompt(w,e.model),y=(await ut(p,g,e,v,c.signal)).plan}if(c.signal.aborted)return;if(a.setProgress(70,"Resposta recebida da IA! Processando plano..."),a.logToConsole(`> [IA] Modelo: ${E||e.model} | Modo: ${y.mode} | Confian\xE7a: ${(y.confidence*100).toFixed(0)}%`,"text-green"),y.rationale&&a.logToConsole(`> [IA] Racioc\xEDnio: "${y.rationale}"`,"text-blue"),a.logToConsole(`> [IA] ${y.actions.length} a\xE7\xE3o(\xF5es) prescritas no plano.`,"text-blue"),y.memoryToStore&&(to(y.memoryToStore),a.logToConsole(`> [RAG]  Nova mem\xF3ria te\xF3rica salva na sess\xE3o: "${y.memoryToStore}"`,"text-yellow")),y.imageDescriptions&&y.imageDescriptions.length>0){a.logToConsole(`> [VISION] \uFE0F An\xE1lise de ${y.imageDescriptions.length} imagem(ns) pela IA:`,"text-blue");for(let w of y.imageDescriptions){let q=w.relevant?"":"\uFE0F";a.logToConsole(`>   ${q} Imagem ${w.index+1} [${w.relevant?"RELEVANTE":"IGNORADA"}]: ${w.description}`,w.relevant?"text-blue":"text-yellow")}}return t=y,a.updateContext(p,y),To(y.actions,y.confidence),a.setPlan(y,!e.dryRun),y.pageType==="conclusion"?(a.setProgress(100,"Atividade conclu\xEDda!"),a.setStatus("Atividade conclu\xEDda ou tela final detectada pela IA.","success")):y.pageType==="info"?(a.setProgress(100,"Contexto absorvido na mem\xF3ria!"),a.setStatus(" Conte\xFAdo de contexto absorvido na mem\xF3ria RAG. Avan\xE7ando...","success")):y.pageType==="start"?(a.setProgress(100,"In\xEDcio detectado!"),a.setStatus("In\xEDcio de atividade detectado. Iniciando...","info")):(a.setProgress(80,"Plano de resolu\xE7\xE3o pronto!"),a.setStatus(e.dryRun?"Simula\xE7\xE3o conclu\xEDda. As respostas foram real\xE7adas na p\xE1gina sem altera\xE7\xE3o.":"Resolu\xE7\xE3o pronta! Verifique o realce na tela e aplique quando desejar.","success")),e.dryRun&&y.pageType==="question"&&a.showFloatingAnswers(y),c.signal.aborted?void 0:((h||e.autoApply)&&!e.dryRun&&await s(l,c.signal,h),y)}catch(p){if(c.signal.aborted||p instanceof Error&&(p.name==="AbortError"||p.message.includes("cancelada"))){Le(),a.setProgress(0),a.setInterrupted("Opera\xE7\xE3o cancelada pelo usu\xE1rio.");return}Le(),a.setProgress(0);let g=p instanceof Error?p.message:"Falha desconhecida na an\xE1lise.";a.setStatus(g,"error"),a.setErrorDiagnostic(g,"An\xE1lise da IA");return}finally{u?.removeEventListener("abort",m),n===c&&(n=null),c.signal.aborted||a.setBusy(!1)}}async function s(l=1,u,h=!1){if(u?.aborted)return;if(!t){a.setStatus("Nenhum plano dispon\xEDvel para aplicar. Execute a an\xE1lise primeiro.","error");return}if(e.dryRun){a.setStatus("O modo de simula\xE7\xE3o est\xE1 ativo. Desmarque para poder aplicar.","error");return}let c=t.pageType==="info"||t.pageType==="start",m=t.actions.filter(f=>f.t!=="adv"),p=t.pageType==="question"||ft(t.rationale||"");if(p&&m.length===0){a.logToConsole("> [NAV]  Avan\xE7o bloqueado: quest\xE3o sem respostas prescritas.","text-yellow");return}let g=(h||e.autoAdvance||c)&&t.confidence>=e.confidenceThreshold&&!t.needsMoreContext&&(!p||m.length>0);a.setBusy(!0,"Aplicando respostas no formul\xE1rio..."),a.setProgress(85,`Aplicando ${t.actions.length} a\xE7\xE3o(\xF5es) no formul\xE1rio...`),a.logToConsole(`> [EXEC] Iniciando aplica\xE7\xE3o com 6 vias de persist\xEAncia para ${t.actions.length} a\xE7\xE3o(\xF5es)...`,"text-blue");try{let f=await _e(t,g,l,Oe(e));if(u?.aborted)return;if(a.setExecutionReport(f),f.failedActions&&f.failedActions.length>0){a.logToConsole(`> [REPLAN] \uFE0F ${f.failedActions.length} a\xE7\xE3o(\xF5es) n\xE3o verificadas no DOM. Iniciando replanejamento...`,"text-yellow");for(let w of f.failedActions){let q=w.action,C=q.t==="drag"?`drag: "${q.from}" \u2192 "${q.to}"`:q.t==="clk"||q.t==="chk"?`${q.t}: "${q.id}"`:q.t==="val"?`val: "${q.id}" = "${q.v}"`:JSON.stringify(q).slice(0,80);a.logToConsole(`>    [${q.t.toUpperCase()}] ${C} | ${w.evidence.slice(0,80)}`,"text-yellow")}await d(f.failedActions,u)}let b=i>0?Date.now()-i:1200,v=f.verified>0,y=f.applied>0;if(f.success||v&&y){a.setProgress(100,"Sucesso! Resposta preenchida."),a.logToConsole(`> [DOM]  ${f.applied} a\xE7\xE3o(\xF5es) aplicada(s) \u2014 ${f.verified} verificada(s) no DOM.`,"text-green"),f.advanced?a.logToConsole("> [NAV]  Bot\xE3o de confirma\xE7\xE3o/avan\xE7o acionado com sucesso!","text-green"):g&&a.logToConsole(`> [NAV] ${f.navigationEvidence}`,"text-blue"),a.setStatus(f.advanced?`Sucesso: ${f.applied} resposta(s) preenchida(s) e avan\xE7ando.`:`Resposta aplicada na p\xE1gina (${f.applied} a\xE7\xE3o(\xF5es)).`,"success"),a.hideFloatingAnswers();let w=no({id:`q-${Date.now()}`,questionIndex:(Ve().records.length||0)+1,questionTitle:t.rationale?t.rationale.slice(0,45)+"...":`Quest\xE3o ${t.mode||"Auto"}`,durationMs:b,status:"answered",mode:t.mode,actionsCount:f.applied});a.updateTimingMetrics(w)}else y?(a.setProgress(75,"Resposta aplicada (verifica\xE7\xE3o incerta)."),a.logToConsole(`> [DOM] \uFE0F ${f.applied} a\xE7\xE3o(\xF5es) disparadas mas sem confirma\xE7\xE3o DOM clara. Pendentes: ${f.failed.join(", ")||"nenhuma"}`,"text-yellow"),a.setStatus(`Resposta preenchida (${f.applied} a\xE7\xE3o(\xF5es) aplicadas, verifica\xE7\xE3o incerta).`,"warning")):(a.setProgress(0,"Alvo de resposta n\xE3o localizado."),a.logToConsole(`> [DOM] Alerta: nenhum controle de resposta foi modificado no DOM. Pend\xEAncias: ${f.failed.join(", ")||"nenhuma a\xE7\xE3o"}.`,"text-yellow"),a.setStatus("Controle de resposta n\xE3o encontrado na p\xE1gina. Use o bot\xE3o Gabarito no painel se desejar.","warning"),e.dryRun&&a.showFloatingAnswers(t))}catch(f){a.setProgress(0);let b=f instanceof Error?f.message:"Falha ao aplicar plano.";a.setStatus(`Erro ao aplicar: ${b}`,"error"),a.logToConsole(`> [ERRO] ${b}`,"text-red")}finally{a.setBusy(!1)}}async function d(l,u){if(!t)return;let h=l.filter(m=>m.action.t==="drag");for(let m of h){if(u?.aborted)return;let p=m.action,g=String(p.from||""),f=String(p.to||""),b=Eo(g,f,g,f);a.logToConsole(`> [REPLAN]  Drag JS fallback: "${g}" \u2192 "${f}"`,"text-blue");let v={...t,actions:[{t:"js",v:b}],pageType:"question"},y=await _e(v,!1,1,Oe(e));a.logToConsole(y.applied>0?"> [REPLAN]  Drag fallback aplicado!":"> [REPLAN]  Drag fallback sem efeito.",y.applied>0?"text-green":"text-yellow")}let c=l.filter(m=>m.action.t!=="drag");if(c.length!==0&&!u?.aborted){a.logToConsole(`> [REPLAN]  ${c.length} a\xE7\xE3o(\xF5es) pendente(s) \u2014 iniciando pipeline de recupera\xE7\xE3o multi-estrat\xE9gia...`,"text-blue");for(let m of c){if(u?.aborted)return;let p=m.action,g=p.t==="clk"||p.t==="chk"?`${p.t}: "${p.id}"`:p.t==="val"?`val: "${p.id}" = "${p.v}"`:p.t==="sel"?`sel: "${p.id}" = "${Array.isArray(p.v)?p.v[0]:p.v}"`:JSON.stringify(p).slice(0,60);a.logToConsole(`> [REPLAN]  Recuperando: ${g}`,"text-blue");let f=String(p.id||p.name||p.selector||""),b=p.v!==void 0?String(p.v):"";a.logToConsole("> [REPLAN] Estrat\xE9gia 1: rota alternativa padr\xE3o...","text-blue");try{if(await xt(m.action),await new Promise(v=>setTimeout(v,250)),me(m.action)){a.logToConsole(`> [REPLAN]  Estrat\xE9gia 1 OK: ${g}`,"text-green");continue}}catch{}if(p.t==="clk"||p.t==="chk"){a.logToConsole("> [REPLAN] Estrat\xE9gia 2: script injection (bypass isTrusted)...","text-blue");try{let v=Q(f,b)||Q(f.replace(/[^\w\s]/g," ").trim(),b);if(v&&(Gt(v),await new Promise(y=>setTimeout(y,300)),me(m.action))){a.logToConsole(`> [REPLAN]  Estrat\xE9gia 2 OK: ${g}`,"text-green");continue}}catch{}}if(p.t==="clk"||p.t==="chk"){a.logToConsole("> [REPLAN] Estrat\xE9gia 3: simula\xE7\xE3o de teclado (Tab+Space)...","text-blue");try{let v=Q(f,b)||Q(f.replace(/[^\w\s]/g," ").trim(),b);if(v&&(v.focus?.(),await new Promise(y=>setTimeout(y,50)),v.dispatchEvent(new KeyboardEvent("keydown",{key:" ",code:"Space",keyCode:32,bubbles:!0,cancelable:!0})),v.dispatchEvent(new KeyboardEvent("keyup",{key:" ",code:"Space",keyCode:32,bubbles:!0,cancelable:!0})),await new Promise(y=>setTimeout(y,80)),v.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0,cancelable:!0})),v.dispatchEvent(new KeyboardEvent("keyup",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0,cancelable:!0})),await new Promise(y=>setTimeout(y,200)),me(m.action))){a.logToConsole(`> [REPLAN]  Estrat\xE9gia 3 OK: ${g}`,"text-green");continue}}catch{}}if(p.t==="clk"||p.t==="chk"||p.t==="val"){a.logToConsole("> [REPLAN] Estrat\xE9gia 4: internals Vue/React via script injection...","text-blue");try{let v=Q(f,b)||Q(f.replace(/[^\w\s]/g," ").trim(),b);if(v){let y=v.id,E=!!y;y||(y=`__eq_s4_${Math.random().toString(36).slice(2,8)}`,v.id=y);let w=String(p.v??""),q=p.t==="val",C=document.createElement("script");if(C.textContent=`(function(){
              var el=document.getElementById(${JSON.stringify(y)});
              if(!el)return;
              // Tenta Vue 3 update trigger
              try{if(el.__vueParentComponent){var ins=el.__vueParentComponent;var pr=ins.props||{};if(pr.modelValue!==undefined&&typeof ins.emit==='function'){ins.emit('update:modelValue',${q?JSON.stringify(w):"true"});}}}catch(e){}
              // Tenta React setState via fiber
              try{var fk=Object.keys(el).find(function(k){return k.startsWith('__reactFiber');});
              if(fk){var fb=el[fk];while(fb){var p=fb.memoizedProps||{};
              if(typeof p.onChange==='function')try{p.onChange({target:el,currentTarget:el,type:'change',bubbles:true,preventDefault:function(){},stopPropagation:function(){}});}catch(e){}
              if(typeof p.onInput==='function')try{p.onInput({target:el,currentTarget:el,type:'input',bubbles:true,preventDefault:function(){},stopPropagation:function(){}});}catch(e){}
              fb=fb.return;}}}catch(e){}
            })()`.replace(/\n\s+/g,""),document.head.appendChild(C),C.remove(),E||setTimeout(()=>{try{v.id===y&&v.removeAttribute("id")}catch{}},0),await new Promise(L=>setTimeout(L,300)),me(m.action)){a.logToConsole(`> [REPLAN]  Estrat\xE9gia 4 OK: ${g}`,"text-green");continue}}}catch{}}if(u?.aborted)return;a.logToConsole("> [REPLAN] Estrat\xE9gia 5: re-consulta IA com diagn\xF3stico focado...","text-blue");try{let v="";try{let T=document.querySelector(`[data-easyquiz-id="${p.id}"]`)||document.getElementById(p.id||"")||Array.from(document.querySelectorAll('input, button, [role="radio"], [role="checkbox"], [role="option"]')).find(x=>(x.textContent||"").toLowerCase().includes(String(p.id||"").toLowerCase().slice(0,20)));T&&(v=T.outerHTML.slice(0,400))}catch{}let y=Te(!1)||qe(),E=`A\xE7\xE3o (${p.t}) alvo="${f}" valor="${p.v||p.c||""}" \u2014 Falha: "${m.evidence.slice(0,80)}"${v?`
HTML do alvo: ${v}`:""}`,w=m.strategiesAttempted?[m.strategiesAttempted].flat().concat(["alternative-path","injectScript","keyboard","vue-react-internals"]):["alternative-path","injectScript","keyboard","vue-react-internals"],q=`[REPLANEJAMENTO URGENTE \u2014 TENTATIVA FINAL]
A seguinte a\xE7\xE3o falhou ap\xF3s ${w.length} estrat\xE9gias autom\xE1ticas: ${w.join(", ")}.

${E}

Contexto atual da quest\xE3o:
${y?.questionText.slice(0,400)||"N/A"}

Controles dispon\xEDveis:
${JSON.stringify((y?.controls||[]).slice(0,6).map(T=>({id:T.id,type:T.type,label:T.label,options:T.options?.slice(0,3)})),null,2)}

TAREFA: Gere APENAS a\xE7\xF5es {t:"js"} com JavaScript criativo e robusto que consiga marcar/preencher/clicar o controle correto. 
Tente usar: document.querySelector, getComputedStyle, querySelectorAll com seletores diferentes, ou manipula\xE7\xE3o DOM direta.
Voc\xEA pode tentar m\xFAltiplas abordagens em um \xFAnico bloco JS. Seja criativo.
N\xC3O repita as estrat\xE9gias j\xE1 tentadas acima.`,C={...y,questionText:q},L=await ut(C,[],{...e},T=>a.logToConsole(`> [REPLAN-AI] ${T}`,"text-blue"),u);if(u?.aborted||!L?.plan){a.logToConsole("> [REPLAN]  Re-consulta n\xE3o retornou plano.","text-yellow");continue}let A=L.plan.actions.filter(T=>T.t==="js");if(A.length===0){a.logToConsole("> [REPLAN] \u2139\uFE0F IA n\xE3o gerou a\xE7\xF5es JS de fallback.","text-yellow");continue}a.logToConsole(`> [REPLAN]  IA gerou ${A.length} a\xE7\xE3o(\xF5es) JS custom. Executando...`,"text-blue");let P={...t,actions:A,pageType:"question"},O=await _e(P,!1,1,Oe(e));O.applied>0?a.logToConsole(`> [REPLAN]  Estrat\xE9gia 5 OK: ${O.applied} a\xE7\xE3o(\xF5es) JS executada(s)!`,"text-green"):a.logToConsole("> [REPLAN]  Todas as estrat\xE9gias esgotadas para esta a\xE7\xE3o.","text-yellow")}catch(v){a.logToConsole(`> [REPLAN] Erro na re-consulta: ${v instanceof Error?v.message:String(v)}`,"text-yellow")}}}}a.toggle(!0)}Sn().catch(o=>{console.error("[EasyQuiz] Erro fatal na inicializa\xE7\xE3o:",o),window.alert(`EasyQuiz: falha ao iniciar: ${o instanceof Error?o.message:String(o)}`)});})();
