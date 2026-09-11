/* EasyQuiz v1.0.0 — Resolução inteligente de quizzes sem servidor
 * GitHub: https://github.com/minifoxie/EasyQuiz
 * 100% Client-side. Direct Google Gemini REST API.
 */
"use strict";(()=>{var oe={apiKey:"",apiKeys:[],model:"gemini-3.5-flash-lite",uiMode:"easy",modeHint:"",engine:"smart",dryRun:!1,autoApply:!0,autoAdvance:!1,hostDarkMode:!0,useVision:!0,confidenceThreshold:.8};function Q(a){if(!a||typeof a!="string")return!1;let e=a.toLowerCase().trim().replace(/^models\//,"");if(!e.includes("gemini"))return!1;let t=["imagen","image","veo","omni","video","embedding","embed","tts","audio","speech","voice","sound","live","transcribe","bidi","aqa","learnlm","deep-research","computer-use","robotics","rt-1","rt-2","mediapipe","cyber","latest","-ultra","experimental"];for(let o of t)if(e.includes(o))return!1;return!(!e.includes("flash")&&!e.includes("pro"))}var Ge="easyquiz_settings_v2",de="easyquiz_activity_metrics";function Qe(){try{let a=localStorage.getItem(Ge);if(!a){let r=localStorage.getItem("easyquiz_settings_v1");if(r){let s=JSON.parse(r);return{...oe,apiKey:s.apiKey||""}}return{...oe}}let e=JSON.parse(a),t=typeof e.model=="string"&&Q(e.model)?e.model:oe.model,o=Array.isArray(e.apiKeys)?e.apiKeys.map(r=>typeof r=="string"?r.trim().replace(/^["']|["']$/g,""):"").filter(r=>r.length>5):[],l=typeof e.apiKey=="string"?e.apiKey.trim().replace(/^["']|["']$/g,""):"";return o.length===0&&l&&(o=[l]),{apiKey:o[0]||l||oe.apiKey,apiKeys:o,model:t,uiMode:e.uiMode==="easy"||e.uiMode==="advanced"?e.uiMode:oe.uiMode,modeHint:e.modeHint??"",engine:e.engine??"smart",dryRun:!!e.dryRun,autoApply:e.autoApply!==void 0?!!e.autoApply:!0,autoAdvance:!!e.autoAdvance,hostDarkMode:e.hostDarkMode!==void 0?!!e.hostDarkMode:!0,useVision:e.useVision!==void 0?!!e.useVision:oe.useVision,confidenceThreshold:typeof e.confidenceThreshold=="number"?e.confidenceThreshold:oe.confidenceThreshold}}catch{return{...oe}}}function yt(){try{localStorage.removeItem(Ge),localStorage.removeItem("easyquiz_settings_v1"),localStorage.removeItem(de),sessionStorage.removeItem(de);let a=[];for(let e=0;e<localStorage.length;e++){let t=localStorage.key(e);t&&(t.startsWith("eq_")||t.startsWith("easyquiz_"))&&a.push(t)}a.forEach(e=>localStorage.removeItem(e)),We()}catch(a){console.warn("[EasyQuiz] Erro ao resetar dados:",a)}}function Ee(a){try{let e=localStorage.getItem("eq_domain_cache_"+a);if(!e)return{};let t=JSON.parse(e);if(t.advanceSelector&&/inject|injetar/i.test(t.advanceSelector)){t.advanceSelector=void 0;try{localStorage.removeItem("eq_domain_cache_"+a)}catch{}}return t}catch{return{}}}function Je(a,e){if(e.advanceSelector&&/inject|injetar/i.test(e.advanceSelector))return;let o={...Ee(a),...e};try{localStorage.setItem("eq_domain_cache_"+a,JSON.stringify(o))}catch(l){console.warn("[EasyQuiz] Erro cache de dominio:",l)}}function xt(a){let e=Qe(),t=Array.isArray(a.apiKeys)?a.apiKeys.map(n=>typeof n=="string"?n.trim().replace(/^["']|["']$/g,""):"").filter(n=>n.length>5):e.apiKeys,o;typeof a.apiKey=="string"?o=a.apiKey.trim().replace(/^["']|["']$/g,""):Array.isArray(a.apiKeys)&&a.apiKeys.length>0?o=t[0]||"":o=e.apiKey,o&&!t.includes(o)&&(t=[o,...t]),t.length>0&&(!o||!t.includes(o))&&(o=t[0]);let l={...e,...a,apiKey:o,apiKeys:t};try{localStorage.setItem(Ge,JSON.stringify(l))}catch(n){console.warn("[EasyQuiz] Falha ao persistir configura\xE7\xF5es no localStorage:",n)}return l}var ce=[],vt=12,Jt=1200;function wt(a){let e=a.trim().replace(/\s+/g," ").slice(0,Jt);e&&!ce.includes(e)&&(ce.push(e),ce.length>vt&&(ce=ce.slice(-vt)))}function He(){return ce}function We(){ce=[]}function Et(){return{startTime:Date.now(),totalElapsedMs:0,completedQuestionsCount:0,averageDurationMs:0,records:[]}}var we=Et();function qe(){try{localStorage.removeItem(de)}catch{}return we}function Wt(a){we=a;try{let e=JSON.stringify(a);sessionStorage.setItem(de,e),localStorage.removeItem(de)}catch{}}function qt(a){let e=we,t=Date.now(),o=e.records[e.records.length-1];if(o&&o.id===a.id&&t-o.timestamp<3e3)return e;let l={...a,timestamp:t},n=[...e.records,l],r=n.filter(u=>u.status==="answered"||u.status==="verified").length,s=n.reduce((u,b)=>u+b.durationMs,0),i=r>0?Math.round(s/r):0,c={startTime:e.startTime||t,totalElapsedMs:Math.max(t-(e.startTime||t),s),completedQuestionsCount:r,averageDurationMs:i,records:n};return Wt(c),c}function Ce(){we=Et();try{sessionStorage.removeItem(de),localStorage.removeItem(de)}catch{}return we}var Ct=`Voc\xEA \xE9 o motor operacional inteligente do EasyQuiz. Sa\xEDda EXCLUSIVA em JSON minificado, sem markdown, sem coment\xE1rios, sem texto fora do JSON.

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
`;function Yt(a,e){return/forms\.(google|gle)\.com|docs\.google\.com\/forms/i.test(a)||e.includes("Qr7Oae")||e.includes("freebirdFormviewer")||e.includes("data-item-id")?"[PLATAFORMA: Google Forms \u2014 use clk nos containers de alternativa; IDs via data-item-id ou texto da op\xE7\xE3o]":/wayground|quizizz/i.test(a)||e.includes("data-functional-selector")?e.includes("classification")||e.toLowerCase().includes("fato")||e.toLowerCase().includes("opini")?`[PLATAFORMA: Wayground/Quizizz CLASSIFICA\xC7\xC3O drag-and-drop]
[RESPOSTAS] ter\xE1 items com t="draggable" e id hexadecimal (ex: 695fa5b6...).
Use EXCLUSIVAMENTE: {t:"drag", from:"ID_hexadecimal_do_card", to:"NOME_DA_CATEGORIA"}
Exemplo: {t:"drag",from:"695fa5b69885555d8155a5ac",to:"FATO"}
Classifique TODOS os items (1 drag por item) antes de emitir adv.
mode: "arrastar_soltar"`:"[PLATAFORMA: Wayground/Quizizz \u2014 alternativas s\xE3o cards clic\xE1veis, use clk]":/khanacademy\.org/i.test(a)||e.includes("perseus")?"[PLATAFORMA: Khan Academy \u2014 widgets Perseus; use js via $eq para widgets interativos se necess\xE1rio]":/moodle|ava\.|classroom\.google/i.test(a)?"[PLATAFORMA: Moodle/AVA/Classroom \u2014 formul\xE1rios padr\xE3o]":/duolingo/i.test(a)?"[PLATAFORMA: Duolingo \u2014 tiles clic\xE1veis, use clk por texto]":/blackboard|canvas\.instructure/i.test(a)?"[PLATAFORMA: Canvas/Blackboard \u2014 quiz-question padr\xE3o]":/socrative|kahoot/i.test(a)?"[PLATAFORMA: Socrative/Kahoot \u2014 alternativas s\xE3o bot\xF5es, use clk]":""}function Te(a,e,t){let o=a.htmlSnippet.includes("draggable")||a.htmlSnippet.includes("perseus")||a.htmlSnippet.includes("category")||a.htmlSnippet.includes("dropzone")||a.controls.some(g=>g.type==="draggable"||g.type==="dropzone"),l=/katex|latex|\\frac|\\sqrt/i.test(a.htmlSnippet),n=/forms\.(google|gle)\.com|docs\.google\.com\/forms/i.test(a.sourceUrl)||a.htmlSnippet.includes("Qr7Oae")||a.htmlSnippet.includes("data-item-id")||a.htmlSnippet.includes("freebirdFormviewer"),r=(/wayground|quizizz/i.test(a.sourceUrl)||a.htmlSnippet.includes("data-functional-selector"))&&(a.htmlSnippet.includes("classification")||a.controls.filter(g=>g.role==="answer").length===0),s=a.controls.filter(g=>g.role!=="navigation").length===0,i=s||o||n||r||l&&a.questionText.length<60,c=s?4500:r?6e3:1800,u=i?`
[HTML]:
${a.htmlSnippet.slice(0,c).replace(/\s+/g," ")}`:"",b="";if(s&&typeof document<"u")try{let g=Array.from(document.querySelectorAll('input:not([type=hidden]), textarea, select, button, [role="button"], [role="radio"], [role="checkbox"], [role="option"], [onclick], [data-action], a[href]:not([href="#"]), [tabindex]:not([tabindex="-1"])')).filter(v=>{let w=v,C=w.getBoundingClientRect?.()||{width:0,height:0};return C.width>0&&C.height>0&&!w.closest("#easyquiz-shadow-root, .eq-sidebar")}).slice(0,40).map(v=>{let w=v,C=w.tagName.toLowerCase(),L=w.id?`#${w.id}`:"",S=w.className&&typeof w.className=="string"?`.${w.className.trim().split(/\s+/).slice(0,2).join(".")}`:"",x=(w.textContent||w.value||w.getAttribute("aria-label")||"").trim().slice(0,60),T=w.getAttribute("type")||w.getAttribute("role")||"";return`${C}${L}${S}[${T}] txt="${x}"`});g.length>0&&(b=`
[DOM-INTERATIVO]:
${g.join(`
`)}`)}catch{}let d=He(),m=d.length>0?`
[MEM\xD3RIA]:
${d.join(" | ")}
`:"",p=a.controls.filter(g=>g.role!=="navigation"),f=a.controls.filter(g=>g.role==="navigation"),y=Yt(a.sourceUrl,a.htmlSnippet),h=y?`
${y}
`:"";return`--- AN\xC1LISE ---
[MODO]: ${t.engine} | Dica: ${t.modeHint||"Auto"}
[URL]: ${a.sourceUrl}
[P\xC1GINA]: ${a.pageTitle}${m}${h}
[DADOS]
[TEXTO]:
${a.questionText}${u}${b}

[RESPOSTAS]:
${(()=>{if(p.length===0)return"Nenhuma";let g=p.filter(E=>E.type==="checkbox"||E.type==="chk"),v=new Set(p.filter(E=>E.type==="radio").map(E=>E.name).filter(Boolean)),w=g.filter(E=>!E.name||!v.has(E.name)),C=/selecione as|assinale as|quais das|todas as|marque as|escolha as|quais dessas|quais dos/i.test(a.questionText),L=w.length>=2||C,S=v.size>1||/verdadeir|fals[oa]|\bv\s*\/\s*f\b|julgue|itens/i.test(a.questionText)&&v.size>=1,x=p.every(E=>E.type==="radio"||E.type==="chk")&&v.size===1&&!L&&!S,T=p.filter(E=>E.type==="text"||E.type==="number"||E.type==="val"||E.tag==="input"||E.tag==="textarea"),M=T.length>=2;return(S?`[GRADE VERDADEIRO/FALSO (${v.size||"m\xFAltiplas"} afirma\xE7\xF5es): voc\xEA DEVE julgar e marcar exatamente 1 op\xE7\xE3o (V ou F) para CADA uma das ${v.size} afirma\xE7\xF5es \u2014 emita ${v.size} a\xE7\xF5es chk separadas + adv]
`:L?`[MULTI-SELE\xC7\xC3O: marque TODOS os corretos, pode ser 2 ou mais]
`:x?`[ESCOLHA-\xDAnica: marque APENAS 1 op\xE7\xE3o]
`:M?`[M\xDALTIPLOS CAMPOS DE PREENCHIMENTO (${T.length} campos): emita uma a\xE7\xE3o val para CADA um dos ${T.length} campos abaixo com seu id exato]
`:"")+JSON.stringify(p.map(E=>({id:E.id,t:E.type,n:E.name||void 0,txt:E.label?E.label.length>160?E.label.slice(0,160)+"...":E.label:void 0,v:E.value||void 0,opt:E.options&&E.options.length?E.options.slice(0,20).map(H=>H.label||H.value):void 0})))})()}

[NAVEGA\xC7\xC3O]:
${f.length>0?f.map(g=>`"${g.label||g.id}"[${g.type}]`).join(","):"Nenhuma"}

[IMAGENS E GR\xC1FICOS ANEXADOS (${e.length})]:
${e.length===0?"Nenhum anexo visual.":e.map((g,v)=>{let w=g.associatedLabel||"Gr\xE1fico da Quest\xE3o",C=g.alt?` | alt: "${g.alt}"`:"";return g.captureStatus==="text_only"?`  - Imagem ${v+1} [CONTEXTO_TEXTUAL]: ${w}${C} | ${g.textContext||"sem contexto adicional"}`:g.captureStatus==="captured"||g.base64?`  - Imagem ${v+1} [VISUAL_INLINE]: ${w}${C}`:`  - Imagem ${v+1} [FALHOU]: ${w}${C}`}).join(`
`)}
[/DADOS]
Sa\xEDda em JSON v\xE1lido.`}var Xt=new Set(["question","info","start","conclusion"]),Zt=new Set(["texto_livre","escolha_unica","escolha_multipla","verdadeiro_falso","preenchimento","acao_sem_resposta","categorizacao","ordenacao","arrastar_soltar"]),ea=new Set(["val","chk","sel","clk","adv","js","drag"]),ta=150,Ae=2e3;function J(a,e=""){return a==null?e:typeof a=="string"?a.trim().slice(0,Ae):typeof a=="number"||typeof a=="boolean"?String(a).trim().slice(0,Ae):e}function aa(a,e){if(!a||typeof a!="object")return null;let t=a,o=t.t;if(typeof o!="string"||!ea.has(o))return null;if(o==="adv"){let s=t.id??t.target??t.name??t.selector;return{t:"adv",...J(s)?{id:J(s,"").slice(0,500)}:{}}}if(o==="drag"){let s=J(t.from??t.source),i=J(t.to??t.target??t.destination);return!s||!i?null:{t:"drag",from:s.slice(0,500),to:i.slice(0,500)}}if(o==="js"){let s=J(t.v??t.code??t.script);return!s||s.length>8e3?null:{t:"js",v:s}}let l=t.id??t.target??t.name??t.selector??t.element;(l==null||l==="")&&o==="val"&&(l="1");let n=J(l).slice(0,500);if(!n)return null;if(o==="val"){let s=t.v!==void 0?t.v:t.value!==void 0?t.value:t.val!==void 0?t.val:t.text!==void 0?t.text:t.answer;return{t:"val",id:n,v:J(s).slice(0,Ae)}}if(o==="sel"){let s=t.v!==void 0?t.v:t.value!==void 0?t.value:t.val!==void 0?t.val:t.values,c=(Array.isArray(s)?s:[s]).map(u=>J(u).slice(0,500)).filter(Boolean);return{t:"sel",id:n,v:c}}if(o==="chk"){let s=t.c===!1||t.c==="false"||t.c===0||t.c==="0"||t.c==="off"||t.c==="unchecked"||t.c==="desmarcar",i={t:"chk",id:n,c:!s};return t.v!==void 0&&(i.v=J(t.v).slice(0,Ae)),i}let r={t:"clk",id:n};if(t.c!==void 0){let s=t.c===!1||t.c==="false"||t.c===0||t.c==="0"||t.c==="off"||t.c==="unchecked"||t.c==="desmarcar";r.c=!s}return t.v!==void 0&&(r.v=J(t.v).slice(0,Ae)),Array.isArray(t.co)&&t.co.length===2&&t.co.every(s=>typeof s=="number"&&Number.isFinite(s))&&(r.co=[t.co[0],t.co[1]]),r}function oa(a,e,t){if(t!=="question")return a;let o=a.filter(n=>n.t==="adv"),l=a.filter(n=>n.t!=="adv");if(e==="escolha_unica"){l=l.filter(r=>!(r.t==="chk"&&r.c===!1||r.t==="clk"&&r.c===!1));let n=l.filter(r=>r.t==="chk"||r.t==="clk");if(n.length>1){let r=l.filter(i=>i.t!=="chk"&&i.t!=="clk"),s=n[n.length-1];l=[...r,s]}}else if(e==="escolha_multipla"){l=l.filter(r=>!(r.t==="chk"&&r.c===!1||r.t==="clk"&&r.c===!1));let n=new Set;l=l.filter(r=>{let s="id"in r&&typeof r.id=="string"?r.id:"";return s?n.has(s)?!1:(n.add(s),!0):!0})}else if(e==="verdadeiro_falso"){let n=new Set,r=[...l].reverse(),s=[];for(let i of r){let c="id"in i&&typeof i.id=="string"?i.id:"";c?n.has(c)||(n.add(c),s.push(i)):s.push(i)}l=s.reverse()}return[...l,...o]}function Tt(a){if(!a||typeof a!="object")return{pageType:"info",mode:"acao_sem_resposta",confidence:.5,rationale:"Resposta estruturada n\xE3o identificada; avan\xE7ando como informativo.",actions:[{t:"adv"}]};let e=a,t=e.pageType,o=e.mode;(typeof t!="string"||!Xt.has(t))&&(t="question"),(typeof o!="string"||!Zt.has(o))&&(o="escolha_unica");let l=Array.isArray(e.actions)?e.actions:[],n=[];for(let i=0;i<Math.min(l.length,ta);i++){let c=aa(l[i],i);c&&n.push(c)}n.some(i=>i.t==="val")&&(o==="escolha_unica"||!e.mode)&&(o="preenchimento"),n.some(i=>i.t==="drag")&&!["categorizacao","arrastar_soltar","ordenacao"].includes(o)&&(o="arrastar_soltar"),n=oa(n,o,t);let r=n.some(i=>i.t==="adv");t==="conclusion"?n.length=0:t==="info"||t==="start"?r||n.push({t:"adv"}):t==="question"&&!r&&n.push({t:"adv"});let s=typeof e.confidence=="number"&&Number.isFinite(e.confidence)?Math.min(1,Math.max(0,e.confidence)):.85;return{pageType:t,mode:o,confidence:s,rationale:J(e.rationale,"Plano validado e auto-recuperado."),actions:n,...J(e.memoryToStore)?{memoryToStore:J(e.memoryToStore)}:{},...e.needsMoreContext?{needsMoreContext:!!e.needsMoreContext}:{}}}var X=class{keys=new Map;constructor(e=[]){this.init(e)}init(e){let t=new Map(this.keys);this.keys.clear();let o=e.flatMap(n=>n.split(/[\n\r]+/));Array.from(new Set(o.map(n=>n.trim().replace(/^["']|["']$/g,"")).filter(n=>n.length>5))).forEach((n,r)=>{let s=this.generateId(n),i=t.get(s)||t.get(n);this.keys.set(s,{id:s,key:n,label:i?.label||`Chave ${r+1}`,addedAt:i?.addedAt||Date.now(),lastUsedAt:i?.lastUsedAt,lastLatencyMs:i?.lastLatencyMs,cooldownUntil:i?.cooldownUntil,errorCount:i?.errorCount||0,lastError:i?.lastError,winCount:i?.winCount||0})})}generateId(e){let t=0;for(let l=0;l<e.length;l++)t=(t<<5)-t+e.charCodeAt(l),t|=0;let o=e.slice(-12).replace(/[^a-zA-Z0-9]/g,"").slice(0,6);return`key_${Math.abs(t).toString(36).slice(0,6)}${o}`}static maskKey(e){let t=e.trim().replace(/^["']|["']$/g,"");return t.length<=10?"\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022":`${t.slice(0,6)}...${t.slice(-4)}`}getAllKeys(){let e=Date.now();return Array.from(this.keys.values()).map(t=>{let o=Math.max(0,(t.cooldownUntil||0)-e);return{...t,isCooldown:o>0,remainingCooldownMs:o}})}getHealthyKeys(){let e=Date.now();return Array.from(this.keys.values()).filter(t=>(t.cooldownUntil||0)<=e&&(t.errorCount||0)<50)}getRoundRobinKeys(e=2){let t=Date.now(),o=Array.from(this.keys.values()).filter(n=>(n.errorCount||0)<50);if(o.length===0)return Array.from(this.keys.values()).slice(0,e);let l=o.filter(n=>(n.cooldownUntil||0)<=t);return l.length>0?(l.sort((n,r)=>{let s=n.lastLatencyMs!==void 0?n.lastLatencyMs:99999,i=r.lastLatencyMs!==void 0?r.lastLatencyMs:99999;if(s!==i)return s-i;let c=(n.lastUsedAt||0)-(r.lastUsedAt||0);return c!==0?c:n.addedAt-r.addedAt}),l.slice(0,e)):(o.sort((n,r)=>(n.cooldownUntil||0)-(r.cooldownUntil||0)),o.slice(0,e))}getBestKey(){return this.getRoundRobinKeys(1)[0]?.key||""}getDiverseKeys(e){return this.getRoundRobinKeys(e).map(t=>t.key)}markQuotaHit(e,t=8e3){let o=this.findKeyObj(e);o&&(o.cooldownUntil=Date.now()+t,o.lastError=`Cota tempor\xE1ria atingida (HTTP 429). Cooldown de ${Math.round(t/1e3)}s ativado.`)}markOverloaded(e,t=5e3){let o=this.findKeyObj(e);o&&(o.cooldownUntil=Date.now()+t,o.lastError=`Servidores sobrecarregados (HTTP 503). Cooldown de ${Math.round(t/1e3)}s ativado.`)}markSuccess(e,t){let o=this.findKeyObj(e);o&&(o.lastLatencyMs=t,o.lastUsedAt=Date.now(),o.errorCount=0,o.lastError=void 0,o.cooldownUntil=void 0)}markWinner(e){let t=this.findKeyObj(e);t&&(t.winCount=(t.winCount||0)+1)}markInvalid(e,t){let o=this.findKeyObj(e);o&&(o.errorCount=99,o.lastError=t)}addKey(e,t){let o=e.trim().replace(/^["']|["']$/g,"");if(!o)return{ok:!1,message:"Chave n\xE3o pode ser vazia."};if(o.length<15)return{ok:!1,message:"Chave de API inv\xE1lida ou muito curta."};let l=this.generateId(o);if(this.keys.has(l)||Array.from(this.keys.values()).some(s=>s.key===o))return{ok:!1,message:"Esta chave de API j\xE1 est\xE1 cadastrada."};let r={id:l,key:o,label:t?.trim()||`Chave ${this.keys.size+1}`,addedAt:Date.now(),errorCount:0};return this.keys.set(l,r),{ok:!0,message:"Chave adicionada com sucesso!",keyItem:r}}updateKey(e,t,o){let l=this.keys.get(e);if(!l)return{ok:!1,message:"Chave n\xE3o encontrada."};let n=t.trim().replace(/^["']|["']$/g,"");return!n||n.length<15?{ok:!1,message:"Chave de API inv\xE1lida."}:(l.key=n,o!==void 0&&(l.label=o.trim()),l.errorCount=0,l.cooldownUntil=void 0,l.lastError=void 0,{ok:!0,message:"Chave atualizada com sucesso!"})}removeKey(e){if(this.keys.size<=1)return{ok:!1,message:"Voc\xEA precisa manter pelo menos 1 chave de API cadastrada."};let t=this.findKeyObj(e);return t?(this.keys.delete(t.id),{ok:!0,message:"Chave removida com sucesso."}):{ok:!1,message:"Chave n\xE3o encontrada."}}exportRawKeys(){return Array.from(this.keys.values()).map(e=>e.key)}size(){return this.keys.size}findKeyObj(e){if(this.keys.has(e))return this.keys.get(e);for(let t of this.keys.values())if(t.key===e)return t}},z=new X;var fe=[{id:"gemini-3.8-flash",name:"Gemini 3.8 Flash (Mais Inteligente 2026)",description:"Modelo flagship Flash lan\xE7ado em Set/2026. Ultra-r\xE1pido e altamente capaz.",stable:!0},{id:"gemini-3.7-flash",name:"Gemini 3.7 Flash (Agentic)",description:"Alta capacidade para racioc\xEDnio multimodal e workflows ag\xEAnticos.",stable:!0},{id:"gemini-3.6-flash",name:"Gemini 3.6 Flash (Est\xE1vel)",description:"Modelo est\xE1vel e confi\xE1vel com excelente velocidade.",stable:!0},{id:"gemini-3.5-flash",name:"Gemini 3.5 Flash (R\xE1pido)",description:"Modelo de alta performance para tarefas r\xE1pidas.",stable:!0},{id:"gemini-3.5-flash-lite",name:"Gemini 3.5 Flash-Lite (Cota Alta 30 RPM)",description:"Modelo econ\xF4mico de ultra-alta velocidade e maior limite de RPM.",stable:!0},{id:"gemini-3.1-pro",name:"Gemini 3.1 Pro (Racioc\xEDnio Profundo)",description:"Modelo topo de linha para racioc\xEDnio complexo, exatas e matem\xE1tica.",stable:!0},{id:"gemini-2.5-flash",name:"Gemini 2.5 Flash (Ultra R\xE1pido)",description:"Modelo comprovado de baix\xEDssima lat\xEAncia e alta disponibilidade.",stable:!0},{id:"gemini-2.5-pro",name:"Gemini 2.5 Pro (Avan\xE7ado)",description:"Modelo avan\xE7ado para quest\xF5es de alta complexidade.",stable:!0}],St=["gemini-3.5-flash-lite","gemini-3.5-flash","gemini-3.6-flash","gemini-3.8-flash","gemini-2.5-flash"],na={"gemini-2.0-flash":"gemini-3.5-flash","gemini-2.0-flash-lite":"gemini-3.5-flash-lite","gemini-1.5-flash":"gemini-3.5-flash","gemini-1.5-pro":"gemini-3.6-flash","gemini-1.0-pro":"gemini-2.5-flash"};function Ze(a){return na[a]??a}function ia(a,e){let o={temperature:0,maxOutputTokens:1350,responseMimeType:"application/json",responseSchema:e??sa};return/lite/i.test(a)||(/gemini-3\.[0-9]+-?flash/i.test(a)?o.thinkingConfig={thinkingBudget:0}:/gemini-2\.5-flash/i.test(a)&&(o.thinkingConfig={thinkingBudget:0})),o}var sa={type:"OBJECT",properties:{pageType:{type:"STRING",enum:["question","info","start","conclusion"]},mode:{type:"STRING",enum:["texto_livre","escolha_unica","escolha_multipla","verdadeiro_falso","preenchimento","acao_sem_resposta","categorizacao","ordenacao","arrastar_soltar"]},confidence:{type:"NUMBER"},rationale:{type:"STRING"},thinking:{type:"STRING"},memoryToStore:{type:"STRING"},imageDescriptions:{type:"ARRAY",items:{type:"OBJECT",properties:{index:{type:"NUMBER"},description:{type:"STRING"},relevant:{type:"BOOLEAN"},associatedLabel:{type:"STRING"}}}},actions:{type:"ARRAY",items:{type:"OBJECT",properties:{t:{type:"STRING",enum:["val","chk","sel","clk","adv","js","drag"]},id:{type:"STRING"},name:{type:"STRING"},label:{type:"STRING"},v:{type:"STRING"},c:{type:"BOOLEAN"},co:{type:"ARRAY",items:{type:"NUMBER"}},from:{type:"STRING"},to:{type:"STRING"}},required:["t"]}}},required:["pageType","mode","confidence","rationale","actions"]};function Lt(a){let e=a.trim().replace(/^google\//,"").replace(/^models\//,"");if(!e)return"gemini-3.5-flash-lite";let t=Ze(e);return Q(t)?t:(console.warn(`[EasyQuiz] Modelo desconhecido ou inv\xE1lido: "${e}". Verifique se o modelo est\xE1 dispon\xEDvel no Google AI Studio.`),"gemini-3.5-flash-lite")}function Xe(a,e){let t="";try{let o=JSON.parse(a);t=o.error?.message||o.message||""}catch{t=a.slice(0,160)}return/API_KEY_INVALID|API key not valid|key.*invalid|unregistered/i.test(t)?"Chave de API do Gemini inv\xE1lida ou n\xE3o autorizada no Google AI Studio.":/RESOURCE_EXHAUSTED|Quota exceeded|rate limit|quota/i.test(t)||e===429?`Cota do Gemini excedida (HTTP 429): ${t||"Aguarde"}`:e===404?`HTTP 404: ${t||"Modelo ou endpoint n\xE3o encontrado no Google AI Studio"}`:e===503||/overloaded/i.test(t)?`Servidores Google sobrecarregados (HTTP 503): ${t||"Aguardando"}`:t?`Erro Gemini (HTTP ${e}): ${t}`:`Falha na requisi\xE7\xE3o ao Gemini (HTTP ${e}).`}function ra(a){let e=a.trim(),t=e.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);if(t)try{return JSON.parse(t[1].trim())}catch{}try{return JSON.parse(e)}catch{}let o=e.match(/\{[\s\S]*\}/);if(o)try{return JSON.parse(o[0].trim())}catch{}try{let l=e.indexOf("{");if(l!==-1){let n=e.slice(l).trim();n=n.replace(/,\s*\{[^}]*$/,""),n=n.replace(/,\s*$/,"");let r=0,s=0,i=!1,c=!1;for(let b=0;b<n.length;b++){let d=n[b];if(c){c=!1;continue}if(d==="\\"){c=!0;continue}if(d==='"'){i=!i;continue}i||(d==="{"?r++:d==="}"?r=Math.max(0,r-1):d==="["?s++:d==="]"&&(s=Math.max(0,s-1)))}for(i&&(n+='"');s>0;)n+="]",s--;for(;r>0;)n+="}",r--;let u=JSON.parse(n);if(u&&typeof u=="object")return u}}catch{}throw new Error("Falha ao decodificar JSON da IA.")}var kt=(()=>{try{let a=typeof localStorage<"u"?localStorage.getItem("easyquiz_cached_models"):null;if(!a)return null;let e=JSON.parse(a);if(Array.isArray(e)){let t=e.filter(o=>o&&typeof o.id=="string"&&Q(o.id));return t.length>0?t:null}return null}catch{return null}})(),Ye=new Set;async function ze(a){let e=a.trim().replace(/^["']|["']$/g,"");if(!e)return fe;let t=[`https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(e)}`,`https://generativelanguage.googleapis.com/v1/models?key=${encodeURIComponent(e)}`];for(let o of t)try{let l=await fetch(o,{headers:{"Content-Type":"application/json","x-goog-api-key":e}});if(!l.ok){let r=await l.text(),s=Xe(r,l.status);if(s.includes("inv\xE1lida")||s.includes("n\xE3o autorizada"))throw new Error(s);continue}let n=await l.json();if(Array.isArray(n.models)&&n.models.length>0){let r=n.models.filter(s=>{let i=s.supportedGenerationMethods||[],c=(s.name||"").replace(/^models\//,""),u=i.includes("generateContent");return Q(c)&&u}).map(s=>{let i=s.supportedGenerationMethods||[],c=s.name.replace(/^models\//,""),u=s.displayName||c;return{id:c,name:u.includes(c)?u:`${u} (${c})`,description:s.description||"",stable:!/-preview|-experimental|-latest/i.test(c),supportsVision:!/embedding|tts|transcribe|live|image|sound|voice/i.test(c),supportsStructuredOutput:i.includes("generateContent"),supportedGenerationMethods:i,discoveredAt:Date.now()}});if(r.length>0){r.sort((s,i)=>{let c=u=>u==="gemini-3.8-flash"?200:u==="gemini-3.7-flash"?190:u==="gemini-3.6-flash"?180:u==="gemini-3.5-flash"?170:u==="gemini-3.5-flash-lite"?160:u==="gemini-2.5-flash"?130:u.includes("flash")?80:u==="gemini-2.5-pro"?60:u.includes("pro")?50:10;return c(i.id)-c(s.id)}),kt=r;try{typeof localStorage<"u"&&localStorage.setItem("easyquiz_cached_models",JSON.stringify(r))}catch{}return r}}}catch(l){if(l.message?.includes("Chave de API"))throw l}return fe}async function Pe(a){let e=a.trim().replace(/^["']|["']$/g,"");if(!e)return{ok:!1,message:"Insira sua chave de API."};try{let o=await ze(e);if(o.length>0&&o!==fe){let l=o[0];return{ok:!0,message:`Chave v\xE1lida! ${o.length} modelos Gemini dispon\xEDveis em sua conta. Recomendado: ${l.name}`,models:o}}}catch(o){return{ok:!1,message:o instanceof Error?o.message:String(o)}}let t=["gemini-3.8-flash","gemini-3.6-flash","gemini-3.5-flash"];for(let o of t)for(let l of["v1beta","v1"]){let n=`https://generativelanguage.googleapis.com/${l}/models/${o}:generateContent?key=${encodeURIComponent(e)}`;try{if((await fetch(n,{method:"POST",headers:{"Content-Type":"application/json","x-goog-api-key":e},body:JSON.stringify({contents:[{role:"user",parts:[{text:"PING"}]}],generationConfig:{maxOutputTokens:5}})})).ok)return{ok:!0,message:`Chave validada com sucesso no ${o} (${l})!`,models:fe}}catch{}}return{ok:!1,message:"Chave de API inv\xE1lida, sem cota ou sem permiss\xE3o para modelos Gemini."}}async function et(a,e){let t=e.map(c=>c.trim().replace(/^["']|["']$/g,"")).filter(c=>c.length>5);if(t.length===0)return{ok:!1,model:a,key:"",message:"Nenhuma chave dispon\xEDvel."};let o=Ze(Lt(a)),l=JSON.stringify({contents:[{role:"user",parts:[{text:"PING"}]}],generationConfig:{maxOutputTokens:5}}),n={"Content-Type":"application/json"};async function r(c,u,b){let d=new AbortController,m=setTimeout(()=>d.abort(),b);try{let p=`https://generativelanguage.googleapis.com/v1beta/models/${u}:generateContent?key=${encodeURIComponent(c)}`,f=await fetch(p,{method:"POST",headers:{...n,"x-goog-api-key":c},body:l,signal:d.signal});if(clearTimeout(m),f.ok)return{ok:!0,model:u,key:c,message:`Modelo '${u}' validado com sucesso!`};let y=await f.text().catch(()=>"");throw new Error(`HTTP ${f.status}: ${y.slice(0,80)}`)}catch(p){throw clearTimeout(m),p}}if(t.length>=2){let c=t.slice(0,6);try{return await Promise.any(c.map(b=>r(b,o,8e3)))}catch{}}let s=t[0],i=[o,...St.filter(c=>c!==o)];for(let c of i)try{let u=await r(s,c,4e3);return c!==o&&(u.message=`Modelo preferido indispon\xEDvel. Validado via fallback '${c}'.`),u}catch{}return{ok:!1,model:o,key:s,message:"Nenhum modelo Gemini respondeu. Verifique sua chave e cota."}}async function la(a,e,t,o,l){let n=["v1beta","v1"],r=new Error(`Falha ao consultar modelo ${a}`),i={...ia(a,l)};for(let c of n){if(o.aborted)throw new Error("Opera\xE7\xE3o cancelada pelo usu\xE1rio.");let u=`https://generativelanguage.googleapis.com/${c}/models/${a}:generateContent?key=${encodeURIComponent(e)}`,b=Date.now();try{let d=await fetch(u,{method:"POST",headers:{"Content-Type":"application/json","x-goog-api-key":e},body:JSON.stringify({...t,generationConfig:i}),signal:o});if(!d.ok){let f=await d.text();if(d.status===400){let h=/thinking/i.test(f),g=/response_schema|responseSchema|Repeated map key|PROTO payload/i.test(f);if((h||g)&&(i.thinkingConfig||i.responseSchema)){let v={...i};h&&delete v.thinkingConfig,g&&(delete v.responseSchema,delete v.responseMimeType),i=v;let w=await fetch(u,{method:"POST",headers:{"Content-Type":"application/json","x-goog-api-key":e},body:JSON.stringify({...t,generationConfig:i}),signal:o});if(w.ok){let S=await w.json(),x=S.candidates?.[0];if(x?.content?.parts?.[0]?.text)return z.markSuccess(e,Date.now()-b),{rawText:x.content.parts[0].text,data:S,usedModel:a,usedKey:e}}let C=await w?.text?.().catch(()=>"")??f,L=Xe(C,d.status);throw new Error(`[${a}|${X.maskKey(e)}] ${L}`)}}let y=Xe(f,d.status);if(d.status===404&&c==="v1beta")continue;throw d.status===429?(z.markQuotaHit(e,8e3),Mt(e,a,1e4),new Error(`[${a}|${X.maskKey(e)}] ${y}`)):(d.status===503||/no capacity|overloaded|unavailable/i.test(f)?(z.markOverloaded(e,5e3),Ye.add(a)):d.status===403||/API_KEY_INVALID/i.test(f)?z.markInvalid(e,y):d.status===404&&Ye.add(a),new Error(`[${a}|${X.maskKey(e)}] ${y}`))}let m=await d.json(),p=m.candidates?.[0];if(!p||!p.content?.parts?.[0]?.text)throw new Error(`[${a}|${X.maskKey(e)}] A IA n\xE3o retornou uma resposta estruturada v\xE1lida.`);return z.markSuccess(e,Date.now()-b),{rawText:p.content.parts[0].text,data:m,usedModel:a,usedKey:e}}catch(d){if(o.aborted)throw d;r=d;let m=r.message||"";if(m.includes("404")||/no longer available/i.test(m)){Ye.add(a);break}if(m.includes("429")||m.includes("Quota"))break}}throw r}var $e=new Map;function At(a,e){let t=`${a}::${e}`,o=$e.get(t);return o===void 0?!1:Date.now()>o?($e.delete(t),!1):!0}function Mt(a,e,t=1e4){$e.set(`${a}::${e}`,Date.now()+t)}function It(){$e.clear()}async function Re(a,e,t,o,l,n){if(l?.aborted)throw new Error("Opera\xE7\xE3o cancelada pelo usu\xE1rio.");let r=Array.isArray(t.apiKeys)&&t.apiKeys.length>0?t.apiKeys:t.apiKey?[t.apiKey]:[];z.init(r);let s=t.apiKey.trim().replace(/^["']|["']$/g,""),i=z.getBestKey()||s;if(!i)throw new Error("Nenhuma chave de API do Gemini configurada ou dispon\xEDvel.");let c=Lt(t.model);if(!kt&&i&&ze(i).catch(()=>{}),l?.aborted)throw new Error("Opera\xE7\xE3o cancelada pelo usu\xE1rio.");let u=Date.now(),b=Te(a,e,t),d=[{text:b}];for(let $=0;$<e.length;$++){let E=e[$],H=E.associatedLabel||(E.alt?`Imagem: ${E.alt}`:`Imagem ${$+1}`);if(E.captureStatus==="text_only"||!E.base64){let V=E.textContext||E.alt||"";d.push({text:`[CONTEXTO_IMAGEM_${$+1} - V\xCDNCULO: ${H}]: ${V}`})}else d.push({text:`[ANEXO VISUAL ${$+1} - V\xCDNCULO: ${H}]:`}),d.push({inline_data:{mime_type:E.mediaType,data:E.base64}})}let m={system_instruction:{parts:[{text:n?.systemPromptOverride??Ct}]},contents:[{role:"user",parts:d}]},p=Ze(c),f=St.filter($=>$!==p),h=z.getAllKeys().length,g=$=>h<=1||$===0?1:2,v=new Set,w=($,E)=>{let H=/pro/i.test($),V=/lite/i.test($);return H?E===0?9e3:E===1?12e3:16e3:V?E===0?3500:E===1?5e3:6500:E===0?4500:E===1?6500:8e3},C=async($,E)=>{if(E.length===0||l?.aborted)return null;let H=E.map(()=>new AbortController),V=()=>H.forEach(O=>{try{O.abort()}catch{}});l?.addEventListener("abort",V,{once:!0});let _=E.map(O=>`${O.model.replace("gemini-","")}/${O.label}`).join(" | ");o?.(`\u26A1 ${$}: ${E.length} slot(s) [${_}]...`,"info");try{let O=E.map(async(j,ae)=>{let F=H[ae],le=setTimeout(()=>{try{F.abort(new Error(`Timeout ${j.timeout/1e3}s (${j.model}|${j.label})`))}catch{F.abort()}},j.timeout);try{let K=await la(j.model,j.key,m,F.signal,n?.generationSchemaOverride);clearTimeout(le);let Y=Tt(ra(K.rawText));return Y.usedModel=K.usedModel,Y.durationMs=Date.now()-u,Y.promptSent=b,Y.tokensUsed=K.data.usageMetadata?.totalTokenCount,Y.promptTokens=K.data.usageMetadata?.promptTokenCount,Y.candidatesTokens=K.data.usageMetadata?.candidatesTokenCount,Y.rawResponse=K.rawText,H.forEach((bt,Qt)=>{if(Qt!==ae)try{bt.abort(new Error("Cancelado: vencedor respondeu."))}catch{bt.abort()}}),{plan:Y,rawUsage:K.data.usageMetadata,usedModel:K.usedModel,usedKey:K.usedKey,slotLabel:j.label}}catch(K){clearTimeout(le);let Y=K instanceof Error?K.message:String(K);throw(Y.includes("429")||Y.includes("Quota")||Y.includes("RESOURCE_EXHAUSTED"))&&(Mt(j.key,j.model,1e4),z.markQuotaHit(j.key,8e3)),K}}),N=await Promise.any(O);return l?.removeEventListener("abort",V),z.markWinner(N.usedKey),N}catch(O){return l?.removeEventListener("abort",V),O instanceof AggregateError&&O.errors.length>0?T=O.errors.map(N=>N instanceof Error?N.message:String(N)).join(" | "):O instanceof Error&&(T=O.message),console.warn(`[EasyQuiz ${$}] Falha na onda:`,T),null}},S=(h<=1?1:1+Math.ceil((h-1)/2))+4,x=0,T="",M=0;for(;x<S;){if(l?.aborted)throw new Error("Opera\xE7\xE3o cancelada pelo usu\xE1rio.");let $=z.getRoundRobinKeys(h),E=$.filter(F=>!v.has(`${F.key}::${p}`)&&!At(F.key,p)),H,V;if(E.length>0)H=p,V=E;else{let F=f;H=F[M%F.length]||p,M++;let le=$.filter(K=>!v.has(`${K.key}::${H}`)&&!At(K.key,H));V=le.length>0?le:$.filter(K=>!v.has(`${K.key}::${H}`))}if(V.length===0){if(M<f.length)continue;break}let _=V.slice(0,g(x));if(_.length===0)break;let O=w(H,x),N=_.map(F=>(v.add(`${F.key}::${H}`),{model:H,key:F.key,label:F.label||"Chave",timeout:O})),j=x===0?"Onda 1":`Onda ${x+1}`,ae=await C(j,N);if(ae){let F=ae.plan.durationMs||Date.now()-u,le=X.maskKey(ae.usedKey);return o?.(`\u2705 ${F}ms via '${ae.usedModel}' (${ae.slotLabel}: ${le})`,"info"),ae}x++}throw new Error(T||"Todas as tentativas falharam. Verifique suas chaves de API e cotas.")}var ca=[/\bfetch\b/i,/\bXMLHttpRequest\b/i,/\bWebSocket\b/i,/\b(?:localStorage|sessionStorage|indexedDB)\b/i,/\b(?:eval|Function|AsyncFunction|GeneratorFunction)\b/i,/\bimport(?:Scripts)?\b/i,/\bnavigator\s*\.\s*credentials\b/i,/\b(?:cookie|location\s*=|history\s*\.)/i,/\bwindow\s*\[\s*['"](?:fetch|eval|Function|localStorage|sessionStorage)/i];function ue(a){let e=a?.engine||"smart",t=new Set(["dom","framework","keyboard","drag"]);return a?.autoAdvance&&t.add("navigation"),e==="javascript"&&t.add("javascript"),{engine:e,capabilities:t,maxAttemptsPerAction:e==="command"?1:2,maxActionMs:e==="command"?1500:3e3,allowJavaScript:e==="javascript",allowNavigation:!!a?.autoAdvance}}function tt(a,e){if(a.t==="js"&&!e.allowJavaScript)throw new Error("A\xE7\xE3o JavaScript bloqueada pela engine atual. Use o motor JavaScript explicitamente.");if(a.t==="adv"&&!e.allowNavigation)throw new Error("Avan\xE7o autom\xE1tico bloqueado pela pol\xEDtica atual.")}function Ht(a){if(!a.trim())throw new Error("JavaScript recusado: c\xF3digo vazio.");if(a.length>8e3)throw new Error("JavaScript recusado: c\xF3digo acima do limite operacional.");if(ca.find(t=>t.test(a)))throw new Error("JavaScript recusado: acesso externo, persist\xEAncia ou avalia\xE7\xE3o din\xE2mica n\xE3o permitidos.");if(!/^\s*(?:\/\/[^\n]*\n|\/\*[\s\S]*?\*\/|[\s\S])*\$eq\./.test(a)&&!a.includes("$eq."))throw new Error("JavaScript recusado: use somente a API declarativa $eq.")}var be=['input:not([type="hidden"])',"textarea","select","button","a","label",'[role="button"]','[role="link"]','[role="radio"]','[role="checkbox"]','[role="option"]','[role="treeitem"]','[role="menuitemcheckbox"]','[role="menuitemradio"]','[contenteditable="true"]','[draggable="true"]',"[aria-grabbed]","[aria-dropeffect]","[data-widget-type]",".perseus-drag-item",".sortable-item",'[data-testid*="drag" i]','[data-testid*="card" i]','[data-testid*="option" i]','[data-testid*="choice" i]','[data-testid*="category" i]',"[data-choice]","[data-option]","[data-answer]","[data-value]",".quiz-option",".option-card",".choice-card",'[class*="option-card" i]','[class*="choice-card" i]','[class*="option-item" i]','[class*="choice-item" i]','[class*="answer-item" i]','[class*="alternative" i]','li[class*="choice" i]','li[class*="option" i]','li[class*="answer" i]','[data-role="dropzone"]',"[data-category]","[data-item-id]","[data-params][jsmodel]",'[class*="draggable-item" i]','[class*="drag-item" i]','[class*="sortable-card" i]','[class*="card-option" i]','[class*="tile" i][class*="option" i]'].join(","),Le=/(verificar|checar|check|conferir|validar|próxim[oa]|next|continuar|continue|avançar|prosseguir|enviar|submit|concluir|finalizar|terminar|começar|iniciar|start|vamos lá|próxima tarefa|next task|próxima pergunta|next question|marcar como concluíd[oa]|mostrar resumo|entendi|compreendi|ok|leitura concluída|seguir|ir para o exercício|fazer o teste|próximo artigo|ir para a aula)/i,ne=/(\banterior\b|\bvoltar\b|\bback\b|\bprev\b|\bprevious\b|recomeçar|\brestart\b|\breplay\b|\bretornar\b)/i,da=0;function at(a){try{let e=a.closest('[hidden], [style*="display: none"], [style*="display:none"], [aria-hidden="true"]');if(e&&!ie(e))return!1}catch{}try{let e=window.getComputedStyle?window.getComputedStyle(a):a.style;if(e&&(e.display==="none"||e.visibility==="hidden"))return!1}catch{}try{if(typeof a.getBoundingClientRect=="function"){let e=a.getBoundingClientRect();if(e.width>0||e.height>0)return!0}}catch{}return(a.textContent||"").trim().length>0}function D(a){try{if(typeof CSS<"u"&&typeof CSS.escape=="function")return CSS.escape(a)}catch{}return String(a).replace(/["\\]/g,"\\$&")}function k(a){let e=a;if(!e||typeof e.isConnected=="boolean"&&!e.isConnected||ie(e))return!1;let t=e.tagName?.toLowerCase();if(["input","select","textarea","button"].includes(t)){let o=e.type?.toLowerCase();if(o==="checkbox"||o==="radio"){if(e.id)try{let n=e.ownerDocument?.querySelector(`label[for="${D(e.id)}"]`);if(n&&at(n))return!0}catch{}let l=e.closest('label, .option-card, .quiz-option, .choice, .answer, [role="radio"], [role="checkbox"], [class*="option" i], [class*="choice" i], [class*="item" i], li, tr');if(l&&l!==e&&at(l))return!0}try{if(!e.closest('[hidden], [style*="display: none"], [style*="display:none"], [aria-hidden="true"]')){let n=window.getComputedStyle?window.getComputedStyle(e):e.style;if(!n||n.display!=="none"&&n.visibility!=="hidden"){if(typeof e.getBoundingClientRect=="function"){let r=e.getBoundingClientRect();if(r.width>0||r.height>0)return!0}return!0}}}catch{}}return at(e)}function ua(a){if(a==null)return"";if(typeof a=="string")return a;if(typeof a=="number"||typeof a=="boolean")return String(a);if(a instanceof Node)return a.textContent||"";try{if(typeof a?.toString=="function"){let e=a.toString();if(typeof e=="string")return e}}catch{}return""}function R(a,e=500){return ua(a).replace(/\s+/g," ").trim().slice(0,e)}function pa(a){let e=a.dataset.easyquizId;if(e)return e;let t=`eq-${Date.now().toString(36)}-${(da+=1).toString(36)}`;return a.dataset.easyquizId=t,t}function ie(a){return a?!!(a.closest('#easyquiz-shadow-root, .eq-sidebar, .eq-launcher, [data-easyquiz-ignore="true"], .btn-inject-eq, #btn-inject-script')||a.getAttribute?.("data-easyquiz-ignore")==="true"):!1}var Se=/(leaderboard|scoreboard|placar|ranking|trophy|pause|pausar|mute|mutar|audio|sound|som|música|music|configuraç|settings|theme|ajuda|help|report|denunciar|feedback|power-?up|streak|coins|fullscreen|full-screen|read-?aloud|audio-?player|(?:audio|sound|som|media)[-_ ]*volume|volume[-_ ]*(?:slider|control|level|btn|button|icon|mute)|vol-slider)/i;function B(a){if(!a||typeof a.getAttribute!="function"||typeof Element<"u"&&!(a instanceof Element))return!1;if(ie(a))return!0;let e=a.tagName?.toLowerCase();if(["select","textarea"].includes(e)||e==="input"&&!["button","submit","reset"].includes((a.type||"").toLowerCase()))return!1;let o=a.closest?.('button, a, [role="button"], [class*="leaderboard" i], [data-testid*="leaderboard" i], [class*="scoreboard" i], [class*="trophy" i]')||a,l=String(o.getAttribute?.("data-testid")||o.getAttribute?.("data-test-id")||o.getAttribute?.("id")||""),n=String(o.getAttribute?.("aria-label")||""),r=String(o.getAttribute?.("title")||""),s=typeof o.className=="string"?o.className:typeof o.className?.baseVal=="string"?o.className.baseVal:"",i=R(o.textContent,60);return!!(Se.test(l)||Se.test(n)||Se.test(r)||Se.test(s)||i.length>0&&i.length<=25&&Se.test(i))}function W(a){if(!a||typeof a.getAttribute!="function"||typeof Element<"u"&&!(a instanceof Element)||ie(a)||B(a)||a.closest?.('.option-card, .choice-card, .quiz-option, [class*="option-card" i], [class*="choice-card" i], [class*="option-item" i], [class*="choice-item" i], [class*="answer-item" i], [data-testid*="option" i], [data-testid*="choice" i], [data-choice], [data-option], [data-answer], [role="radio"], [role="checkbox"], [role="option"]')||a.closest?.("header, nav, aside"))return!1;let e=typeof HTMLInputElement<"u"&&a instanceof HTMLInputElement||typeof HTMLButtonElement<"u"&&a instanceof HTMLButtonElement?a.value:"",t=R(a.getAttribute?.("aria-label")||a.textContent||a.getAttribute?.("value")||e),o=a.type,l=t.replace(/[\d\(\)\[\]\u2192>\u2022\-\/\\]+/g," ").trim(),n=String(a.getAttribute?.("data-testid")||a.getAttribute?.("data-test-id")||a.getAttribute?.("id")||a.getAttribute?.("href")||"").toLowerCase();return ne.test(l)||ne.test(t)?!1:Le.test(l)||Le.test(t)||n.includes("next")||n.includes("check")||n.includes("continue")||n.includes("proximo")||n.includes("forward")?!0:/^\d{1,3}$/.test(t.trim())?!!a.closest?.('[class*="pagination" i], [class*="pager" i], [class*="page-nav" i], [class*="step-indicator" i], [class*="breadcrumb" i], [aria-label*="p\xE1gina" i], [aria-label*="page" i], [role="navigation"], nav, [class*="steps" i]'):!1}function ot(a){let e=a.closest("tr");if(e){let i=e.querySelector("th, td:first-child"),c=i&&i!==a.closest("td")?R(i.textContent,100):"",u=R(a.closest("label, td")?.textContent||"",50);if(c&&u)return`${c}: ${u}`}let t=a.closest('.dropdown-row, [class*="dropdown-row" i], [class*="select-row" i]');if(t){let i=t.querySelector('.dropdown-label, [class*="label" i]'),c=i&&i!==a?R(i.textContent,150):"";if(c)return c}let o=a.getAttribute("aria-label");if(o)return R(o);let l=a.getAttribute("aria-labelledby");if(l){let i=l.split(/\s+/).map(c=>document.getElementById(c)?.textContent).filter(Boolean).join(" ");if(i.trim())return R(i)}if("labels"in a&&a.labels){let i=Array.from(a.labels??[]).map(c=>c.textContent).join(" ");if(i.trim())return R(i)}let n=a.closest('.docssharedWizToggleLabeledContainer, [role="listitem"], .answer, label, .quiz-option, .form-check, .option-card');if(n&&n!==a){let i=R(n.textContent);if(i)return i}let r=a instanceof HTMLInputElement||a instanceof HTMLButtonElement?a.value:"",s=a.getAttribute("placeholder")||a.getAttribute("title")||a.textContent||r||"";return R(s)}function nt(a,e){let o=typeof HTMLSelectElement<"u"&&a instanceof HTMLSelectElement||a.tagName.toLowerCase()==="select"?a:null,l=a;a.dataset.easyquizRole=e;let n=a.tagName.toLowerCase(),r=["input","textarea","select","button"].includes(n)?n:"other",s=a.getAttribute("role")||"",i=(a.getAttribute("data-testid")||a.getAttribute("data-test-id")||"").toLowerCase(),c=(a.className&&typeof a.className=="string"?a.className:"").toLowerCase(),u=a.getAttribute("draggable")==="true"||a.classList.contains("perseus-drag-item")||a.classList.contains("sortable-item")||c.includes("cursor-grab")||!!a.getAttribute("aria-grabbed")||/drag|card|option|item/i.test(i)||/drag|card-item|sortable/i.test(c),b=a.getAttribute("data-role")==="dropzone"||a.classList.contains("category-container")||a.hasAttribute("data-category")||!!a.getAttribute("aria-dropeffect")||/drop|category|bucket/i.test(i)||/dropzone|category-box|bucket|target-zone/i.test(c),m=R((u?"draggable":b?"dropzone":"")||l.type||s||r,40),p="";if(l.type==="checkbox"||l.type==="radio"||s==="radio"||s==="checkbox"){let w=l.checked||a.getAttribute("aria-checked")==="true",C=l.value&&l.value!=="on"?l.value:a.getAttribute("data-value")||"";p=w?C?`checked:${C}`:"checked":C||"unchecked"}else if(r==="button"||n==="a"||e==="navigation"||W(a))p="";else{let w=typeof a.value=="string"||typeof a.value=="number"?a.value:"";p=R(w||a.getAttribute("data-category")||"",2e3)}let f=[];if(o&&o.options)for(let w of Array.from(o.options).slice(0,80))f.push({value:R(w.value),label:R(w.textContent)});else if(s==="combobox"||s==="listbox"||c.includes("select")||c.includes("dropdown")){let w=a.getAttribute("aria-controls")||a.getAttribute("aria-owns"),C=w?document.getElementById(w):a;if(C){let L=C.querySelectorAll('[role="option"], li, .dropdown-item, .option');for(let S of Array.from(L).slice(0,80)){let x=R(S.textContent);x&&f.push({value:S.getAttribute("data-value")||S.getAttribute("value")||x,label:x})}}}let y=!!(l.required||a.getAttribute("aria-required")==="true"),h=!!(l.disabled||a.getAttribute("aria-disabled")==="true"),g=pa(a);return{id:a.id||g,tag:r,type:m,label:ot(a),name:R(l.name||a.getAttribute("name")||"",180),value:p,options:f,required:y,disabled:h,role:e}}var $t=['[data-test-id*="exercise" i]','[data-testid*="exercise" i]',".perseus-renderer",".framework-perseus",".Qr7Oae","[data-item-id]",".freebirdFormviewerViewItemsItemItem",".que",".question-holder",".quiz-question",".question_holder",".display_question",'[data-functional-selector*="question"]',".question-container",'[class*="classification-layout" i]','[class*="quiz-container" i]','[data-cy="quiz-container"]',"[data-question-id]",'[data-testid*="question" i]','[class*="question-container" i]','[class*="question" i]','[class*="pergunta" i]','[class*="categoriz" i]',"article","form","section","main"].join(",");function zt(a){if(!k(a))return-1/0;let e=a.getBoundingClientRect(),t=Array.from(a.querySelectorAll(be)).filter(k),o=R(a.innerText||a.textContent||"",4e3).length;if(o<10||!t.length&&o<60)return-1/0;let l=Math.max(1,window.innerWidth*window.innerHeight),n=Math.max(1,e.width*e.height),r=Math.min(1,n/l),s=e.top+e.height/2,i=Math.abs(s-window.innerHeight/2)/Math.max(1,window.innerHeight),c=o>40?35:0,u=e.top>=0&&e.bottom<=window.innerHeight?25:0;return t.length*15+Math.min(60,o/20)+c+u-r*20-i*10}function Oe(a){let e=a;if(e.matches?.('article, [data-test-id*="exercise" i], [data-testid*="exercise" i], .perseus-renderer, .framework-perseus, [class*="question-container" i], .que')&&e.tagName.toLowerCase()!=="main"&&e.tagName.toLowerCase()!=="body")return e;for(;e.parentElement&&e.parentElement!==document.body&&e.parentElement!==document.documentElement;){let t=e.parentElement,o=t.tagName.toLowerCase();if(["header","footer","nav","aside"].includes(o))break;if(t.matches?.('article, [data-test-id*="exercise" i], [data-testid*="exercise" i], .perseus-renderer, .framework-perseus, [class*="question-container" i], .que')&&o!=="main"&&o!=="body"){e=t;break}let l=R(e.innerText||e.textContent||"",1e4),n=R(t.innerText||t.textContent||"",1e4),r=e.querySelectorAll(be).length,s=t.querySelectorAll(be).length;if(l.length<150&&n.length>l.length&&s<=r+4&&o!=="main"&&o!=="body"){e=t;continue}break}return e}function Pt(a){let e=a,t=e.closest('main, [role="main"], article, form, [data-test-id*="exercise" i], [data-testid*="exercise" i], .framework-perseus, section');if(t&&t!==document.body&&k(t))return t;let o=0;for(;e.parentElement&&e.parentElement!==document.body&&o<3;)e=e.parentElement,o++;return e||document.body}function G(){let a=document.querySelector('[class*="classification-layout" i], [class*="quiz-container" i][class*="classification" i]');if(a&&k(a))return a;let e=document.activeElement;if(e&&e!==document.body){let r=e.closest($t);if(r&&zt(r)>0)return Oe(r)}let o=Array.from(document.querySelectorAll($t)).map(r=>({element:r,score:zt(r)})).filter(r=>Number.isFinite(r.score)).sort((r,s)=>s.score-r.score),l=o.find(r=>{let s=r.element.tagName.toLowerCase();return s!=="main"&&s!=="body"&&r.score>0});if(l)return Oe(l.element);if(o.length>0&&o[0].score>0)return Oe(o[0].element);let n=document.querySelector('form, main, [role="main"]');return n&&k(n)?n:document.body}function Rt(a){let e=a.cloneNode(!0);e.querySelectorAll("script, style, iframe, object, embed, svg, canvas, noscript, audio, video").forEach(o=>o.remove());let t=["type","name","value","role","aria-label","aria-labelledby","aria-checked","aria-required","required","disabled","data-easyquiz-id","draggable","class","id","data-widget-type","data-role","data-category","data-testid"];return e.querySelectorAll("*").forEach(o=>{for(let l of Array.from(o.attributes))t.includes(l.name)||o.removeAttribute(l.name)}),e.outerHTML.replace(/\s+/g," ").slice(0,2e4)}function Ne(a){let e=Array.from(a.querySelectorAll(be)),t=new Set,o=[];for(let i of e){if(!k(i)||W(i)||B(i))continue;let c=(i.value||i.textContent||"").trim();if(ne.test(c))continue;let u=i.tagName.toLowerCase();["input","textarea","select"].includes(u)&&(t.add(i),o.push(i))}for(let i of e){if(!k(i)||W(i)||B(i))continue;let c=(i.value||i.textContent||"").trim();if(ne.test(c))continue;let u=i.tagName.toLowerCase();if(["input","textarea","select"].includes(u))continue;let b=i.querySelector("input, textarea, select");if(!(b&&t.has(b))){if(i.hasAttribute("for")){let d=i.getAttribute("for"),m=d?i.ownerDocument.getElementById(d):null;if(m&&t.has(m))continue}if(u==="a"){let d=i.getAttribute("role"),m=i.getAttribute("class")||"",p=i.getAttribute("data-testid")||"",f=i.getAttribute("draggable")==="true"||i.classList.contains("perseus-drag-item")||i.classList.contains("sortable-item")||m.includes("cursor-grab")||!!i.getAttribute("aria-grabbed")||/drag|card|option|item/i.test(p)||/drag|card-item|sortable/i.test(m);if(!(d==="button"||d==="radio"||d==="checkbox"||d==="option"||f||i.closest('[class*="choice" i], [class*="option" i], [class*="answer" i], [data-testid*="option" i]')))continue}o.push(i)}}let l=o.length>0&&o.every(i=>B(i)||/read-?aloud|audio/i.test(i.getAttribute("data-testid")||i.getAttribute("aria-label")||"")),n=document.body.querySelector('[class*="classification-layout" i]')||document.body.querySelector('[class*="classification" i]')||a,r=document.body.querySelector('[class*="classification" i]')!==null||a.querySelector('[class*="classification" i]')!==null||a.querySelector('[data-cy*="quiz" i]')!==null||a.querySelector('[class*="draggable-item" i]')!==null||a.querySelector('[class*="drag-item" i]')!==null||a.querySelector('[class*="sortable-card" i]')!==null||a.matches?.('[class*="classification" i]');if((o.length===0||l)&&r){l&&(o.length=0);let i=Array.from(n.querySelectorAll('[class*="cursor-grab"][id], [draggable="true"][id], .dnd-card[id]'));if(i.length>0){for(let c of i)if(!(!k(c)||B(c))&&(o.push(c),o.length>=50))break}else{let c=Array.from(n.querySelectorAll("button, div[class], span[class], p, li"));for(let u of c){if(!k(u)||W(u)||B(u)||ne.test((u.textContent||"").trim()))continue;let b=(u.textContent||"").trim();if(b.length<2||b.length>300)continue;if(Array.from(u.children).some(m=>m.className&&m.textContent?.trim())||o.push(u),o.length>=50)break}}}let s=o.length>0&&o.every(i=>{let c=(i.textContent||"").trim();return!i.id||c.length<10||/^\d+\s*\/\s*\d+$/.test(c)||/^question text/i.test(c)});if(o.length===0||s){s&&(o.length=0);let i=Array.from(document.body.querySelectorAll('[class*="cursor-pointer"][id]'));if(i.length>0)for(let c of i){if(!k(c)||ie(c)||W(c)||B(c)||ne.test((c.textContent||"").trim()))continue;let u=(c.textContent||"").trim();if(!(u.length<10||u.length>500)&&!/^\d+\s*\/\s*\d+$/.test(u)&&(o.push(c),o.length>=20))break}}return o.slice(0,100).map(i=>nt(i,"answer"))}function it(a){let e=[a,a.parentElement,a.parentElement?.parentElement,document.body].filter(Boolean),t=new Set,o=[];for(let l of e)for(let n of Array.from(l.querySelectorAll(be)))if(!(t.has(n)||!k(n)||!W(n)||B(n))&&(t.add(n),o.push(nt(n,"navigation")),o.length>=10))return o;return o}function ve(a=!1){let e=G();e=Oe(e),a&&(e=Pt(e));let t=Ne(e),o=it(e);if(t.length===0){let s=Ne(document.body);s.length>0&&(e=Pt(e),t=Ne(e),t.length===0&&(t=s,e=document.querySelector('main, article, form, [role="main"]')||document.body))}o.length===0&&(o=it(document.body));let l=e.innerText&&e.innerText.trim().length>0?e.innerText:e.textContent||"",n=l.length>4e4?R(l.slice(0,8e3),8e3)+`
[...conte\xFAdo extenso truncado...]
`+R(l.slice(-2e3),2e3):R(l,16e3),r=[...t,...o].slice(0,120);return!n||r.length===0&&n.length<30?R(document.body.innerText||document.body.textContent||"",16e3).length>=30?pe():null:{sourceUrl:window.location.href.slice(0,2e3),pageTitle:document.title.slice(0,500)||"P\xE1gina de Quest\xE3o",questionText:n,htmlSnippet:Rt(e),controls:r,scope:e}}function pe(){let a=document.body.innerText||document.body.textContent||document.documentElement.textContent||"",e=R(a,16e3),t=Ne(document.body),o=it(document.body),l=[...t,...o].slice(0,120),n=document.querySelector('main, article, form, [role="main"], [data-test-id*="content" i], [class*="content" i]')||document.body;return{sourceUrl:window.location.href.slice(0,2e3),pageTitle:document.title.slice(0,500)||"P\xE1gina de Quest\xE3o",questionText:e,htmlSnippet:Rt(n).slice(0,15e3),controls:l,scope:n}}function Ot(a){let e=a.controls.map(t=>`${t.role}:${t.id}:${t.type}`).join("|");return[window.location.href,a.pageTitle,a.questionText.slice(0,400),e].join("::")}function P(a){return a?!!(a.closest('#easyquiz-shadow-root, .eq-sidebar, .eq-launcher, [data-easyquiz-ignore="true"], .btn-inject-eq, #btn-inject-script')||a.getAttribute?.("data-easyquiz-ignore")==="true"):!1}function q(a){return a==null?"":(typeof a=="string"?a:String(a)).replace(/^(\([0-9a-zA-Z]{1,2}\)|[0-9]{1,3}|[a-zA-Z])[\.\)\-\:]\s+/,"").replace(/[\.\u2026]{2,}/g," ").replace(/['"“”«»]/g,"").replace(/\s+/g," ").trim()}function U(a){if(!a||a instanceof HTMLInputElement||a instanceof HTMLSelectElement||a instanceof HTMLTextAreaElement||a.getAttribute("draggable")==="true"||a.classList.contains("dnd-card")||a.hasAttribute("data-category")||a.hasAttribute("data-dropzone"))return a;if(a.hasAttribute("for")){let o=a.getAttribute("for");if(o){let l=a.ownerDocument.getElementById(o);if(l)return l}}let e=a.closest('label, .option-card, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, td, li, .dnd-card, [class*="option-card" i], [class*="choice-card" i], .dropdown-row, [class*="dropdown" i], [class*="select-row" i]');if(e&&!["article","section","main","form","body"].includes(e.tagName.toLowerCase())){let o=e.getAttribute("for"),n=(o?e.ownerDocument.getElementById(o):null)||e.querySelector('input:not([type="hidden"]), select, textarea');return n||e}let t=a.closest('button, a, [role="button"], [draggable="true"]');if(t)return t;if(["body","html","main","section","article","form"].includes(a.tagName.toLowerCase())){let o=a.querySelector('button, [role="button"], a, input:not([type="hidden"]), select, textarea, [role="radio"], [role="checkbox"], .option-card, label');if(o)return U(o)}return a}function Nt(a){let e=a;if(!e||!document.contains(e))try{e=G()}catch{}e=e||document.body;let t=l=>{let n=Array.from(l.querySelectorAll("tr")).filter(u=>k(u)&&u.querySelector('input[type="radio"], input[type="checkbox"]'));if(n.length>1)return n;let r=Array.from(l.querySelectorAll('input[type="checkbox"], input[type="radio"], [role="checkbox"], [role="radio"]')).filter(u=>k(u)&&!P(u));if(r.length>0)return r;let i=Array.from(l.querySelectorAll('.option-card, [role="option"], [class*="choice-card" i], [class*="option-card" i], li[class*="choice" i], li[class*="option" i]')).filter(u=>k(u)&&!P(u)).filter(u=>!u.parentElement?.closest('.option-card, [role="option"], [class*="choice-card" i], [class*="option-card" i]'));return i.length>0?i:Array.from(l.querySelectorAll('[class*="classification" i] [class], [class*="draggable-item" i], [class*="drag-item" i], [class*="sortable-card" i]')).filter(u=>{let b=u;return k(b)&&!P(b)&&(b.textContent||"").trim().length>2&&!W(b)&&!B(b)&&!b.querySelector("[class]")})},o=t(e);return o.length>0?o:e!==document.body?t(document.body):[]}function I(a,e,t=!1){if(a==null)return null;let l=(typeof a=="string"?a:String(a)).trim().replace(/^["'“”«»]+|["'“”«»]+$/g,"");if(!l)return null;let n=D(l),r=document.querySelector(`[data-easyquiz-id="${n}"]`);if(r&&!P(r))return U(r);try{let d=document.getElementById(l);if(d&&k(d)&&!P(d))return d.hasAttribute("data-category")||d.hasAttribute("data-dropzone")||d.classList.contains("dnd-zone")?d:U(d)}catch{}try{let d=document.querySelector(`[data-item-id="${n}"]`);if(d&&k(d)&&!P(d))return U(d)}catch{}let s=l.match(/^(?:item|opção|opcao|afirmação|afirmacao|alternativa|linha|afirmativa|questão|questao|campo|blank|lacuna|input|resposta)?\s*#?_?([0-9]+)$/i);if(s){let d=parseInt(s[1],10);if(t){let p=document.body;try{p=G()||document.body}catch{}let f=Array.from(p.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, select, [contenteditable="true"]')).filter(y=>k(y)&&!P(y));if(d>=1&&d-1<f.length)return f[d-1];if(d===0&&f.length>0)return f[0]}let m=d-1;if(m>=0){let p=Nt();if(m<p.length){let h=p[m];if(h.tagName.toLowerCase()==="tr"){if(e){let v=h.querySelector(`input[value="${D(e)}" i], [data-value="${D(e)}" i]`);if(v)return v}let g=h.querySelector("input");if(g)return g}return U(h)}let f=document.body;try{f=G()||document.body}catch{}let y=Array.from(f.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, select, [contenteditable="true"]')).filter(h=>k(h)&&!P(h));if(m<y.length)return y[m]}}let i=l.match(/^(?:item|opção|opcao|afirmação|afirmacao|alternativa|linha|afirmativa|questão|questao)?\s*#?([a-eA-E])$/i);if(i){let d=i[1].toUpperCase().charCodeAt(0)-65;if(d>=0){let m=Nt();if(d<m.length){let p=m[d];if(p.tagName.toLowerCase()==="tr"){if(e){let y=p.querySelector(`input[value="${D(e)}" i], [data-value="${D(e)}" i]`);if(y)return y}let f=p.querySelector("input");if(f)return f}return U(p)}}}if(/^[a-zA-Z0-9_-]{1,10}$/.test(l)){let m=Array.from(document.querySelectorAll(`[data-category="${n}" i], [data-dropzone="${n}" i], [data-role="dropzone"][data-category="${n}" i]`)).find(h=>k(h)&&!P(h));if(m)return m;let f=Array.from(document.querySelectorAll(`input[value="${n}" i], [data-value="${n}" i], input[id="${n}" i], input[placeholder="${n}" i], textarea[placeholder="${n}" i], [title="${n}" i]`)).find(h=>k(h)&&!P(h));if(f)return U(f);let y=Array.from(document.querySelectorAll('.option-badge, [class*="badge" i], [class*="letter" i], .option-card span, label span')).find(h=>{if(!k(h)||P(h))return!1;let g=q(h.textContent).toLowerCase();return g===l.toLowerCase()||g===l.toLowerCase()+")"});if(y)return U(y)}try{let d=Array.from(document.querySelectorAll(`[name="${n}"], [value="${n}"], [placeholder="${n}" i], [title="${n}" i], [data-category="${n}" i], [data-dropzone="${n}" i], [data-testid="${n}" i], [data-test-id="${n}" i], [aria-label="${n}" i]`));if(e){let p=d.find(f=>{if(!k(f)||P(f))return!1;if(f instanceof HTMLInputElement&&f.value.toLowerCase()===e.toLowerCase())return!0;let y=f.closest("label, .vf-label, td, div");return y&&q(y.textContent).toLowerCase().includes(q(e).toLowerCase())});if(p)return U(p)}let m=d.find(p=>k(p)&&!P(p));if(m)return m.hasAttribute("data-category")||m.hasAttribute("data-dropzone")||m.classList.contains("dnd-zone")?m:U(m)}catch{}if(/^[.#\[]|\s|[>+~:]/.test(l))try{let m=Array.from(document.querySelectorAll(l)).find(p=>k(p)&&!P(p));if(m)return U(m)}catch{}try{let d=l.replace(/"/g,""),m=`//button[normalize-space(.)="${d}"] | //a[normalize-space(.)="${d}"] | //*[not(*) and normalize-space(.)="${d}"] | //*[@aria-label="${d}"] | //*[@data-category="${d}"] | //*[@data-testid="${d}"]`,p=document.evaluate(m,document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);for(let f=0;f<p.snapshotLength;f++){let y=p.snapshotItem(f);if(y&&k(y)&&!P(y)){if(["body","html"].includes(y.tagName.toLowerCase())){let g=y.querySelector('button, [role="button"], a, input, [role="radio"], [role="checkbox"], label');if(g&&k(g))return U(g)}return y.closest('[data-role="dropzone"], [class*="category" i], [class*="bucket" i], [class*="column" i], [class*="drop" i]')||U(y)}}}catch{}let u=q(l).toLowerCase(),b=Array.from(document.querySelectorAll('button, a, div, span, li, p, label, input, textarea, select, [draggable="true"], [data-testid], [class*="option" i], [class*="card" i], [class*="item" i], [class*="choice" i], [class*="category" i], [class*="bucket" i]'));for(let d of b){if(!k(d)||P(d)||d.closest("header, nav, .stepper, .step-item, .progress-bar-container")||B(d)||!!(d.matches('article, section, form, main, [class*="container" i], [class*="grid" i], .dnd-pool, .dnd-zones')||d.querySelector('label, [role="radio"], [role="checkbox"], .dnd-card, [draggable="true"], .option-card, tr'))&&!d.matches(".dnd-zone, [data-category], [data-dropzone]"))continue;let p=q(d.textContent).toLowerCase(),f=q(d.getAttribute("aria-label")||"").toLowerCase(),y=q(d.getAttribute("placeholder")||"").toLowerCase(),h=q(d.getAttribute("title")||"").toLowerCase(),g=q(d.getAttribute("name")||"").toLowerCase(),v=q(d.getAttribute("data-category")||"").toLowerCase(),w=d instanceof HTMLInputElement||d instanceof HTMLButtonElement?d.value:"",C=q(w).toLowerCase(),L=p.startsWith(u+")")||p.startsWith(u+".")||p.startsWith(u+" -")||p.startsWith(u+":");if(p===u||f===u||y===u||h===u||g===u||v&&v===u||C&&C===u||L)return d.closest('[data-role="dropzone"], [class*="category" i], [class*="bucket" i], [class*="column" i], [class*="drop" i]')||U(d)}if(u.length>=3)for(let d of b){if(!k(d)||P(d)||d.closest("header, nav, .stepper, .step-item, .progress-bar-container")||B(d)||!!(d.matches('article, section, form, main, [class*="container" i], [class*="grid" i], .dnd-pool, .dnd-zones')||d.querySelector('label, [role="radio"], [role="checkbox"], .dnd-card, [draggable="true"], .option-card, tr'))&&!d.matches(".dnd-zone, [data-category], [data-dropzone]"))continue;let p=q(d.textContent).toLowerCase(),f=q(d.getAttribute("aria-label")||"").toLowerCase(),y=q(d.getAttribute("placeholder")||"").toLowerCase(),h=q(d.getAttribute("title")||"").toLowerCase(),g=q(d.getAttribute("name")||"").toLowerCase();if(p.includes(u)||f.includes(u)||y.includes(u)||h.includes(u)||g.includes(u)){if(Array.from(d.children).some(L=>{let S=q(L.textContent).toLowerCase();return S&&S.includes(u)}))continue;return d.closest('[data-role="dropzone"], [class*="category" i], [class*="bucket" i], [class*="column" i], [class*="drop" i]')||U(d)}let v=u.split(/\s+/).filter(Boolean);if(v.length>=3){let w=v.slice(0,Math.min(5,v.length)).join(" ");if(p.includes(w)||f.includes(w)||y.includes(w))return U(d)}}return null}function Dt(a,e){for(let t of e)a.dispatchEvent(new Event(t,{bubbles:!0,composed:!0}))}function te(a,e){if(!a)return;try{a.scrollIntoView({block:"nearest",inline:"nearest",behavior:"instant"})}catch{}try{a.focus?.()}catch{}let t=a.getBoundingClientRect(),o=e?e[0]:Math.round(t.left+Math.max(1,t.width/2)),l=e?e[1]:Math.round(t.top+Math.max(1,t.height/2)),n={bubbles:!0,cancelable:!0,composed:!0,view:window,clientX:o,clientY:l};try{a.dispatchEvent(new PointerEvent("pointerover",{...n}))}catch{}try{a.dispatchEvent(new MouseEvent("mouseover",{...n}))}catch{}try{a.dispatchEvent(new PointerEvent("pointerdown",{...n,button:0,buttons:1}))}catch{}try{a.dispatchEvent(new MouseEvent("mousedown",{...n,button:0,buttons:1}))}catch{}try{a.dispatchEvent(new PointerEvent("pointerup",{...n,button:0,buttons:0}))}catch{}try{a.dispatchEvent(new MouseEvent("mouseup",{...n,button:0,buttons:0}))}catch{}try{a.dispatchEvent(new MouseEvent("click",{...n,button:0,buttons:0}))}catch{}try{a.click()}catch{}try{let r=Object.keys(a).find(s=>s.startsWith("__reactFiber")||s.startsWith("__reactInternalInstance"));if(r){let s=a[r];for(;s;){let i=s.memoizedProps||s.pendingProps;if(i?.onClick){i.onClick({type:"click",target:a,currentTarget:a,bubbles:!0,cancelable:!0,preventDefault:()=>{},stopPropagation:()=>{}});break}s=s.return}}}catch{}try{let r=Object.keys(a).find(s=>s.startsWith("__reactProps"));if(r){let s=a[r];s?.onClick&&s.onClick({type:"click",target:a,currentTarget:a,bubbles:!0,cancelable:!0,preventDefault:()=>{},stopPropagation:()=>{}})}}catch{}try{let r=a._vei;r?.onClick&&(Array.isArray(r.onClick.value)?r.onClick.value:[r.onClick.value]).forEach(i=>{try{i({type:"click",target:a})}catch{}})}catch{}try{a.$onclick&&a.$onclick({type:"click",target:a,preventDefault:()=>{},stopPropagation:()=>{}})}catch{}try{if(!!(document.querySelector('meta[content*="google.com/forms"], form[action*="formResponse"]')||a.closest("[data-item-id], [jsmodel], [jsaction], .freebirdFormviewerComponentsQuestionBaseRoot"))){let s=a.querySelector('input[type="radio"], input[type="checkbox"]');s&&(s.focus?.(),s.click(),Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"checked")?.set?.call(s,!0),s.dispatchEvent(new Event("change",{bubbles:!0})));let i=a.closest("[jsaction]");if(i&&i!==a)try{i.dispatchEvent(new MouseEvent("click",{bubbles:!0,cancelable:!0,view:window,clientX:o,clientY:l}))}catch{}}}catch{}if(a.getAttribute("role")==="button"||a.getAttribute("tabindex")!==null)try{a.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0,cancelable:!0})),a.dispatchEvent(new KeyboardEvent("keyup",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0,cancelable:!0}))}catch{}}function ct(a){try{let e=a.id,t=!!e;e||(e=`__eq_tmp_${Math.random().toString(36).slice(2,8)}`,a.id=e);let o=document.createElement("script");return o.textContent=`(function(){var el=document.getElementById(${JSON.stringify(e)});if(el){el.dispatchEvent(new MouseEvent('click',{bubbles:true,cancelable:true,composed:true,view:window}));if(typeof el.click==='function')el.click();var fk=Object.keys(el).find(function(k){return k.startsWith('__reactFiber')||k.startsWith('__reactInternalInstance');});if(fk){var fb=el[fk];while(fb){var mp=fb.memoizedProps||fb.pendingProps;if(mp&&typeof mp.onClick==='function'){try{mp.onClick({type:'click',target:el,currentTarget:el,bubbles:true,cancelable:true,preventDefault:function(){},stopPropagation:function(){}});}catch(e){}break;}fb=fb.return;}}var pk=Object.keys(el).find(function(k){return k.startsWith('__reactProps');});if(pk&&el[pk]&&typeof el[pk].onClick==='function'){try{el[pk].onClick({type:'click',target:el,currentTarget:el,bubbles:true,cancelable:true,preventDefault:function(){},stopPropagation:function(){}});}catch(e){}}if(el._vei&&el._vei.onClick){var h=el._vei.onClick.value;var hs=Array.isArray(h)?h:[h];hs.forEach(function(fn){try{fn({type:'click',target:el});}catch(e){}});}}})()`,document.head.appendChild(o),o.remove(),t||setTimeout(()=>{try{a.id===e&&a.removeAttribute("id")}catch{}},0),!0}catch{return!1}}function De(a,e){let t=a;if(t.hasAttribute("for")){let c=t.getAttribute("for"),u=t.ownerDocument.getElementById(c);u&&(t=u)}if(typeof HTMLSelectElement<"u"&&t instanceof HTMLSelectElement||t.tagName?.toLowerCase()==="select"||t.getAttribute("role")==="combobox"||t.getAttribute("role")==="listbox"||t.matches?.('[role="combobox"], [role="listbox"], [class*="select" i], [class*="dropdown" i]')){Be(t,[e]);return}let l=t.querySelector('select, [role="combobox"], [role="listbox"]');if(l){Be(l,[e]);return}if(!(t instanceof HTMLInputElement)&&!(t instanceof HTMLTextAreaElement)&&!(t instanceof HTMLSelectElement)&&!t.isContentEditable){let c=t.querySelector('input:not([type="hidden"]), textarea, select, [contenteditable="true"]');if(c)t=c;else{let b=t.closest('.form-group, .field, [class*="input" i], [class*="control" i], label, tr, td, li, p, div')?.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, select, [contenteditable="true"]');if(b)t=b;else{let d=t.nextElementSibling;for(;d;){if(d instanceof HTMLInputElement&&!["hidden","button","submit","checkbox","radio"].includes(d.type)||d instanceof HTMLTextAreaElement||d instanceof HTMLElement&&d.isContentEditable){t=d;break}let m=d.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(m){t=m;break}d=d.nextElementSibling}}}}if(t instanceof HTMLButtonElement||t.tagName.toLowerCase()==="a"||t.getAttribute("role")==="button"||t instanceof HTMLInputElement&&["button","submit","reset","image"].includes(t.type)){let c=t.parentElement?.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(c)t=c;else{let u=document.body;try{u=G()||document.body}catch{}let b=u.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(b)t=b;else{console.warn("[EasyQuiz] setNativeValue: Nenhum campo de texto encontrado para receber o valor.");return}}}if(!(t instanceof HTMLInputElement)&&!(t instanceof HTMLTextAreaElement)&&!(t instanceof HTMLSelectElement)&&!t.isContentEditable){let c=document.body;try{c=G()||document.body}catch{}let u=c.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(u)t=u;else{console.warn("[EasyQuiz] setNativeValue: Nenhum campo de texto encontrado para receber o valor.");return}}if(t instanceof HTMLInputElement&&["checkbox","radio"].includes(t.type)){let c=["true","1","checked","yes","sim"].includes(e.toLowerCase())||e===t.value;se(t,c);return}let r=String(e??""),s=r;if(t instanceof HTMLInputElement&&t.type==="number"){let c=r.replace(",",".").replace(/[^0-9.-]/g,"");c&&!isNaN(Number(c))&&(s=c)}try{t.scrollIntoView?.({block:"center",inline:"center",behavior:"instant"}),t.focus?.()}catch{}let i=!1;try{if(t instanceof HTMLInputElement||t instanceof HTMLTextAreaElement){if(t.type!=="number"&&t.type!=="range"){try{t.select?.()}catch{}i=document.execCommand?.("insertText",!1,s)||!1}}else if(t.isContentEditable){try{document.execCommand?.("selectAll",!1,void 0)}catch{}i=document.execCommand?.("insertText",!1,s)||!1}}catch{}if(t instanceof HTMLInputElement||t instanceof HTMLTextAreaElement){try{let b=t._valueTracker;b&&b.setValue(s===""?" ":"")}catch{}let c=t instanceof HTMLTextAreaElement?HTMLTextAreaElement.prototype:HTMLInputElement.prototype,u=Object.getOwnPropertyDescriptor(c,"value")?.set;u?u.call(t,s):t.value=s;try{t.dispatchEvent(new KeyboardEvent("keydown",{bubbles:!0,cancelable:!0,key:s.slice(-1)||"a"}))}catch{}try{t.dispatchEvent(new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,composed:!0,data:s,inputType:"insertText"}))}catch{}try{t.dispatchEvent(new InputEvent("input",{bubbles:!0,cancelable:!0,composed:!0,data:s,inputType:"insertText"}))}catch{t.dispatchEvent(new Event("input",{bubbles:!0,cancelable:!0,composed:!0}))}try{t.dispatchEvent(new KeyboardEvent("keyup",{bubbles:!0,cancelable:!0,key:s.slice(-1)||"a"}))}catch{}try{t.dispatchEvent(new Event("change",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}try{t.dispatchEvent(new FocusEvent("blur",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}if(t.value!==s&&!(t instanceof HTMLInputElement&&t.type==="number"&&Number(t.value)===Number(s))){t.value=s;try{u?.call(t,s)}catch{}}return}if(t.isContentEditable){if(t.textContent?.trim()!==s.trim()){t.textContent=s;try{t.innerText=s}catch{}}try{t.dispatchEvent(new InputEvent("input",{bubbles:!0,cancelable:!0,composed:!0,data:s,inputType:"insertText"}))}catch{t.dispatchEvent(new Event("input",{bubbles:!0,cancelable:!0,composed:!0}))}try{t.dispatchEvent(new Event("change",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}try{t.dispatchEvent(new FocusEvent("blur",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}return}try{"value"in t&&(t.value=s),t.dispatchEvent(new Event("input",{bubbles:!0,cancelable:!0,composed:!0})),t.dispatchEvent(new Event("change",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}}function ke(a,e=""){if(a==null)return e;let t=typeof a=="string"?a:String(a);if(!t)return e;let o=/^(eq-|#|\$|\.|input_|mat-|choice_|radio_|chk_)/i.test(t),l=q(t),n=I(t)||I(l);if(!n)return o?e:l||e;let r=n.closest('label, .option-card, [class*="choice" i], [class*="option" i], .quiz-option, tr, td, li');if(r){let b=q(r.textContent);if(b&&b.length>0&&b.length<150)return b}if(n.id){let b=document.querySelector(`label[for="${D(n.id)}"]`);if(b){let d=q(b.textContent);if(d&&d.length>0&&d.length<150)return d}}let s=n.getAttribute("aria-label");if(s)return q(s);let i=n.getAttribute("placeholder");if(i)return q(i);let c=q(n.textContent);if(c&&c.length>0&&c.length<120)return c;let u=n instanceof HTMLInputElement||n instanceof HTMLButtonElement?n.value:"";return u?q(u):o?e:l||e}function se(a,e){if(!a)return;let t=a.closest('label, td, .option-card, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, [class*="option" i], [class*="choice" i], li')||a,o=a instanceof HTMLInputElement&&["checkbox","radio"].includes(a.type)?a:t.querySelector('input[type="checkbox"], input[type="radio"]');!o&&t.hasAttribute("for")&&(o=t.ownerDocument.getElementById(t.getAttribute("for")));let l=a instanceof HTMLInputElement?a.closest("label")||(a.id?t.ownerDocument.getElementById(t.getAttribute("for")):null)||a:t&&k(t)?t:a;if(o){let n=o.type==="radio",r=o.type==="checkbox",s=!!o._valueTracker;if(o.checked===e){if(n&&e){t.setAttribute("aria-checked","true"),t.setAttribute("aria-selected","true"),t.classList.add("selected","active","checked");return}if(r){t.setAttribute("aria-checked",e?"true":"false"),t.setAttribute("aria-selected",e?"true":"false"),t.classList.toggle("selected",e),t.classList.toggle("active",e),t.classList.toggle("checked",e);return}}l&&l!==o&&te(l);try{o.focus?.(),o.click()}catch{}if(o.checked!==e){try{let c=o._valueTracker;c&&c.setValue(!e)}catch{}try{Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"checked")?.set?.call(o,e)}catch{}o.checked=e,Dt(o,["input","change"])}t.setAttribute("aria-checked",e?"true":"false"),t.setAttribute("aria-selected",e?"true":"false"),t.classList.toggle("selected",e),t.classList.toggle("active",e),t.classList.toggle("checked",e)}else{if((t.getAttribute("aria-checked")==="true"||t.getAttribute("aria-selected")==="true"||t.getAttribute("data-selected")==="true"||t.getAttribute("data-checked")==="true"||t.classList.contains("selected")||t.classList.contains("active")||t.classList.contains("checked"))===e&&e)return;te(l),t.setAttribute("aria-checked",e?"true":"false"),t.setAttribute("aria-selected",e?"true":"false"),t.classList.toggle("selected",e),t.classList.toggle("active",e),t.classList.toggle("checked",e)}}function Be(a,e){let t=typeof HTMLSelectElement<"u"&&a instanceof HTMLSelectElement||a.tagName?.toLowerCase()==="select"?a:a.querySelector("select");if(t){let r=e.map(c=>q(c).toLowerCase()),s=!1,i=(c,u)=>{c.selected=!0,t.selectedIndex=u;try{t.value=c.value}catch{}try{Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype,"value")?.set?.call(t,c.value)}catch{}try{let b=t._valueTracker;b&&b.setValue(c.value)}catch{}s=!0};for(let c=0;c<t.options.length;c++){let u=t.options[c],b=u.value.toLowerCase(),d=q(u.textContent).toLowerCase();if(r.some(p=>p===b||p===d)){if(i(u,c),!t.multiple)break}else t.multiple||(u.selected=!1)}if(!s)for(let c of r){let u=c.match(/^(?:item|opção|opcao|alternativa|linha|escolha|campo)?\s*#?_?([0-9]+)$/i);if(u){let b=parseInt(u[1],10),m=t.options[0]?.value===""||t.options[0]?.disabled?b:b>=1?b-1:0;if(m>=0&&m<t.options.length&&(i(t.options[m],m),!t.multiple))break}}if(!s){for(let c of r)if(/^[a-z]$/i.test(c)){let u=c.toUpperCase().charCodeAt(0)-65,d=t.options[0]?.value===""||t.options[0]?.disabled?u+1:u;if(d>=0&&d<t.options.length&&(i(t.options[d],d),!t.multiple))break}}if(!s){let c=u=>u.normalize("NFD").replace(/[\u0300-\u036f]/g,"");for(let u=0;u<t.options.length;u++){let b=t.options[u],d=c(b.value.toLowerCase()),m=c(q(b.textContent).toLowerCase());if(r.some(f=>{let y=c(f);return d.includes(y)||m.includes(y)||y.length>2&&(y.includes(d)||y.includes(m))})&&(i(b,u),!t.multiple))break}}if(s){Dt(t,["focus","input","change","blur"]);return}}let o=a.matches?.('[role="combobox"], [role="listbox"], [class*="select" i], [class*="dropdown" i]')?a:a.closest('[role="combobox"], [role="listbox"], [class*="select" i], [class*="dropdown" i]');o&&te(o);let l=e.map(r=>q(r).toLowerCase()),n=Array.from(document.querySelectorAll('[role="listbox"] [role="option"], [role="menu"] [role="menuitem"], .select-dropdown li, .dropdown-menu .dropdown-item, .ant-select-item-option, .MuiMenuItem-root, [class*="option-item"], li[data-value]')).filter(r=>k(r)&&!P(r));for(let r of l){let s=n.find(c=>{let u=q(c.textContent).toLowerCase(),b=q(c.getAttribute("data-value")||c.getAttribute("value")||"").toLowerCase();return u===r||b===r||u.includes(r)||r.length>2&&r.includes(u)});if(s){te(s);let c=s.querySelector('input[type="radio"], input[type="checkbox"]');c&&se(c,!0);return}let i=I(r);if(i){te(i);return}}}function ma(a,e){try{let t=new DataTransfer;try{t.setData("text/plain",a)}catch{}try{t.setData("text/html",e)}catch{}return t}catch{return null}}function st(a){try{a.click()}catch{let e=a.ownerDocument.defaultView||window;a.dispatchEvent(new e.MouseEvent("click",{bubbles:!0,cancelable:!0,composed:!0,view:e}))}}function ha(a,e,t){try{if(e.contains(a))return{success:!0,evidence:"origin is child of dest (DOM move confirmed)"};if(!document.body.contains(a))return{success:!0,evidence:"origin removed from DOM (consumed by framework)"};let o=e.children.length;if(t!==void 0&&o>t)return{success:!0,evidence:`dest child count increased: ${t} \u2192 ${o}`};if([a.getAttribute("data-placed")==="true",a.getAttribute("data-assigned")==="true",a.getAttribute("data-matched")==="true",a.getAttribute("aria-grabbed")==="false",/placed|dropped|assigned|matched|done|sorted|categorized/i.test(a.className||"")].some(Boolean))return{success:!0,evidence:"origin has placement indicator: class/attr"};let n=(a.textContent||"").trim().toLowerCase();return n.length>2&&Array.from(e.querySelectorAll("*")).some(i=>i!==e&&(i.textContent||"").trim().toLowerCase()===n)?{success:!0,evidence:"origin text found inside dest children (clone or DOM move)"}:e.getAttribute("data-count")&&parseInt(e.getAttribute("data-count")||"0")>0?{success:!0,evidence:"dest data-count > 0, categorization likely succeeded"}:a.getAttribute("aria-hidden")==="true"||a.style.display==="none"||a.style.visibility==="hidden"?{success:!0,evidence:"origin hidden after drop (framework confirmed placement)"}:{success:!1,evidence:"no DOM evidence of successful drag/categorization"}}catch{return{success:!1,evidence:"verification threw exception"}}}function ee(a,e){let t=q(a).toLowerCase();if(!t)return null;if(e==="source"){if(/^[0-9a-f]{10,}$/.test(a.trim())){let s=document.getElementById(a.trim());if(s&&k(s)&&!P(s))return s}let r=['[class*="cursor-grab"][id]',".dnd-card",'[draggable="true"]'];for(let s of r){let c=Array.from(document.querySelectorAll(s)).find(u=>{if(!k(u)||P(u))return!1;let b=q(`${u.id} ${u.textContent||""} ${u.getAttribute("data-id")||""}`).toLowerCase();return b===t||b.includes(t)||u.id===a.trim()});if(c)return c}return null}let o=["[data-dropzone]","[data-category]",'[data-role="dropzone"]','[class*="dropzone" i]','[class*="list-group" i]','[class*="classification-group" i]'].join(","),l=Array.from(document.querySelectorAll(o)),n=l.find(r=>[r.getAttribute("data-category"),r.getAttribute("data-dropzone")].some(s=>s?.trim().toLowerCase()===t));return n&&k(n)&&!P(n)?n:l.find(r=>{if(!k(r)||P(r)||/unclassified/i.test(r.className))return!1;let s=r.querySelector('.font-bold, h1, h2, h3, h4, [class*="header" i], [class*="title" i], [class*="label" i]'),i=q(s?.textContent||r.textContent||"").toLowerCase();return i.includes("op")&&(i.includes("es")||i.includes("\xF5es"))?!1:i===t||i.startsWith(t)||i.includes(t)})||null}async function Ve(a,e,t=1){try{a.scrollIntoView({block:"center",inline:"center",behavior:"instant"})}catch{}let o=a.getBoundingClientRect(),l=e.getBoundingClientRect(),n=Math.round(o.left+Math.max(1,o.width/2)),r=Math.round(o.top+Math.max(1,o.height/2)),s=Math.round(l.left+Math.max(1,l.width/2)),i=Math.round(l.top+Math.max(1,l.height/2)),c=q(e.textContent).toLowerCase();if(c){let f=Array.from(a.querySelectorAll('button, [role="button"], input[type="radio"], input[type="checkbox"], option, .btn, [class*="tag" i]')).find(y=>{let h=q(y.textContent).toLowerCase(),g=y instanceof HTMLInputElement||y instanceof HTMLOptionElement?q(y.value).toLowerCase():"";return h&&(c.includes(h)||h.includes(c))||g&&(c.includes(g)||g.includes(c))});f&&(te(f),await new Promise(y=>setTimeout(y,120)))}st(a),await new Promise(p=>setTimeout(p,140)),st(e);let u=e.querySelector('[data-role="dropzone"], [class*="bucket" i], [class*="slot" i], [class*="drop" i], [class*="target" i], [class*="items" i], ul, ol');if(u&&u!==e&&st(u),await new Promise(p=>setTimeout(p,100)),!e.contains(a)&&a.matches('.dnd-card, [draggable="true"]')&&e.matches('.dnd-zone, [data-dropzone], [data-role="dropzone"]')&&e.appendChild(a),e.contains(a)&&a.matches('.dnd-card, [draggable="true"]'))return;let b={bubbles:!0,cancelable:!0,composed:!0,view:window,clientX:n,clientY:r,screenX:n,screenY:r,button:0,buttons:1};try{a.dispatchEvent(new PointerEvent("pointerdown",{...b,isPrimary:!0,pointerId:1,pointerType:"mouse",pressure:.5}))}catch{}a.dispatchEvent(new MouseEvent("mousedown",b));let d=4;for(let p=1;p<=d;p++){let f=Math.round(n+(s-n)*(p/d)),y=Math.round(r+(i-r)*(p/d)),h={...b,clientX:f,clientY:y,screenX:f,screenY:y};try{a.dispatchEvent(new PointerEvent("pointermove",{...h,isPrimary:!0,pointerId:1,pointerType:"mouse",pressure:.5}))}catch{}document.dispatchEvent(new MouseEvent("mousemove",h))}let m={bubbles:!0,cancelable:!0,composed:!0,view:window,clientX:s,clientY:i,screenX:s,screenY:i,button:0,buttons:0};try{e.dispatchEvent(new PointerEvent("pointerup",{...m,isPrimary:!0,pointerId:1,pointerType:"mouse",pressure:0}))}catch{}e.dispatchEvent(new MouseEvent("mouseup",m)),e.dispatchEvent(new MouseEvent("click",m));try{let p=ma(R(a.textContent),a.outerHTML),f={...b},y={...m};p&&(f.dataTransfer=p,y.dataTransfer=p);let h=a.ownerDocument.defaultView?.DragEvent;if(!h)throw new Error("DragEvent n\xE3o dispon\xEDvel neste documento");a.dispatchEvent(new h("dragstart",f)),e.dispatchEvent(new h("dragenter",y)),e.dispatchEvent(new h("dragover",y)),e.dispatchEvent(new h("drop",y)),a.dispatchEvent(new h("dragend",f))}catch(p){console.warn("[EasyQuiz] DragEvent ignorado com seguran\xE7a:",p)}try{let p=new Touch({identifier:1,target:a,clientX:n,clientY:r}),f=new Touch({identifier:1,target:e,clientX:s,clientY:i});a.dispatchEvent(new TouchEvent("touchstart",{bubbles:!0,cancelable:!0,touches:[p]})),e.dispatchEvent(new TouchEvent("touchmove",{bubbles:!0,cancelable:!0,touches:[f]})),e.dispatchEvent(new TouchEvent("touchend",{bubbles:!0,cancelable:!0,touches:[]}))}catch{}if(t>=2&&!e.contains(a))try{a.focus?.(),a.dispatchEvent(new KeyboardEvent("keydown",{key:" ",code:"Space",bubbles:!0})),a.dispatchEvent(new KeyboardEvent("keyup",{key:" ",code:"Space",bubbles:!0})),await new Promise(p=>setTimeout(p,80)),e.focus?.(),e.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",bubbles:!0})),e.dispatchEvent(new KeyboardEvent("keyup",{key:"Enter",code:"Enter",bubbles:!0}))}catch{}if(!e.contains(a))try{let p=h=>{let g=Object.keys(h).find(w=>w.startsWith("__reactFiber")||w.startsWith("__reactInternalInstance"));if(!g)return null;let v=h[g];for(let w=0;w<10&&v;w++){if(v.memoizedProps)return v.memoizedProps;v=v.return}return null},f=p(a),y=p(e);if(f){let h=f.onMouseDown||f.onPointerDown||f.onDragStart;if(typeof h=="function")try{h({type:"mousedown",button:0,buttons:1,clientX:n,clientY:r,bubbles:!0,preventDefault:()=>{},stopPropagation:()=>{},currentTarget:a,target:a}),await new Promise(g=>setTimeout(g,100))}catch{}}if(y){let h=y.onMouseUp||y.onPointerUp||y.onDrop;if(typeof h=="function")try{h({type:"mouseup",button:0,buttons:0,clientX:s,clientY:i,bubbles:!0,preventDefault:()=>{},stopPropagation:()=>{},currentTarget:e,target:e})}catch{}}try{a.focus?.(),a.dispatchEvent(new KeyboardEvent("keydown",{key:" ",code:"Space",keyCode:32,bubbles:!0,cancelable:!0})),await new Promise(g=>setTimeout(g,200));let h=i>r?"ArrowDown":"ArrowUp";for(let g=0;g<3;g++)document.dispatchEvent(new KeyboardEvent("keydown",{key:h,bubbles:!0,cancelable:!0})),await new Promise(v=>setTimeout(v,60));document.dispatchEvent(new KeyboardEvent("keydown",{key:" ",code:"Space",keyCode:32,bubbles:!0,cancelable:!0})),await new Promise(g=>setTimeout(g,80))}catch{}try{!!document.querySelector("[data-rbd-draggable-id], [data-rbd-droppable-id], [data-dnd-kit-sortable]")&&(a.dispatchEvent(new CustomEvent("dndkitdragstart",{bubbles:!0,cancelable:!0,detail:{id:a.id||a.getAttribute("data-id")}})),await new Promise(g=>setTimeout(g,100)),e.dispatchEvent(new CustomEvent("dndkitdrop",{bubbles:!0,cancelable:!0,detail:{overId:e.id||e.getAttribute("data-id")}})))}catch{}}catch(p){console.warn("[EasyQuiz] Estrat\xE9gia G (React DnD internals) falhou:",p)}}function Bt(a,e,t,o){let l=c=>c.replace(/\\/g,"\\\\").replace(/'/g,"\\'").replace(/"/g,'\\"').slice(0,100),n=l(a.toLowerCase()),r=l(e.toLowerCase()),s=l(t),i=l(o);return`var src=$eq.find('${s}')||Array.from(document.querySelectorAll('[draggable],[class*="cursor-grab"],[class*="dnd-card"]')).find(function(e){return (e.textContent||'').toLowerCase().includes('${n}');});var dst=Array.from(document.querySelectorAll('[class*="list-group"],[class*="dropzone"],[data-category],[data-rbd-droppable-id]')).find(function(e){var h=e.querySelector('.font-bold,h1,h2,h3,h4,[class*="header"]');var t=(h||e);return (t.textContent||'').toLowerCase().includes('${r}');});if(src&&dst){dst.appendChild(src);[src,dst].forEach(function(el){try{el.dispatchEvent(new Event('change',{bubbles:true}));}catch(e){}try{el.dispatchEvent(new CustomEvent('dndkitdrop',{bubbles:true,detail:{}}));}catch(e){}});}else{console.warn('[EQ-drag-fallback] nao localizado: ${n} -> ${r}');}`}var Vt={fill:(a,e)=>{let t=I(a);t?De(t,e):console.warn(`$eq.fill: Elemento '${a}' n\xE3o encontrado`)},click:a=>{let e=I(a);e?!!(e.closest('.option-card, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, [class*="option" i], [class*="choice" i]')||e.querySelector('input[type="radio"], input[type="checkbox"]')||e instanceof HTMLInputElement&&["checkbox","radio"].includes(e.type))?se(e,!0):te(e):console.warn(`$eq.click: Elemento '${a}' n\xE3o encontrado`)},check:(a,e)=>{let t=I(a);t?se(t,e):console.warn(`$eq.check: Elemento '${a}' n\xE3o encontrado`)},find:(a,e)=>I(a,e),drag:(a,e)=>{let t=ee(a,"source")||I(a),o=ee(e,"destination")||I(e);t&&o?Ve(t,o):console.warn(`$eq.drag: Origem ou destino n\xE3o encontrado ('${a}' -> '${e}')`)},categorize:async(a,e)=>{let t=ee(a,"source")||I(a),o=ee(e,"destination")||I(e);if(!t||!o){console.warn(`$eq.categorize: Item ou categoria n\xE3o encontrados ('${a}' -> '${e}')`);return}await Ve(t,o)},execute:(a,e=!1,t=1)=>Me(a,e,t)};typeof window<"u"&&(window.$eq=Vt);async function ga(a,e=1,t=ue()){if(tt(a,t),a.t==="js"){let i=String(a.v||"");Ht(i);try{new Function("$eq","document","window",i)(Vt,document,window)}catch(c){throw console.warn("[EasyQuiz JS Execution]",c),c}return}if(a.t==="drag"){let i=ee(a.from,"source")||I(a.from),c=ee(a.to,"destination")||I(a.to);!i&&a.from&&(i=I(q(a.from))),!c&&a.to&&(c=I(q(a.to))),i&&c?await Ve(i,c,e):console.warn(`[EasyQuiz] Drag: alvo n\xE3o encontrado ('${a.from}' -> '${a.to}')`);return}let o=a.id!==void 0&&a.id!==null?String(a.id):"";!o&&a.t==="val"&&(o=a.target??a.name??a.selector??"1");let l=a.v!==void 0?a.v:a.value!==void 0?a.value:a.val!==void 0?a.val:a.text,n=l!=null?String(l).trim():"",r=null,s=String(a.name??a.n??"").trim();if(!s&&o&&document.querySelector(`input[type="radio"][name="${D(o)}"]`)&&(s=o),(a.t==="chk"||a.t==="clk")&&s){let i=Array.from(document.querySelectorAll(`input[name="${D(s)}"]`));if(n&&(r=i.find(c=>c.value?.toLowerCase()===n.toLowerCase())??null),!r&&n){let c=/^(v|verdadeiro|true|1|t|sim|correto)$/i.test(n),u=/^(f|falso|false|0|nao|não|incorreto|errado)$/i.test(n);if(c||u){let b=c?["v","verdadeiro","true","1","t","sim","correto"]:["f","falso","false","0","nao","n\xE3o","incorreto","errado"];r=i.find(d=>{let m=d.value?.toLowerCase()??"";if(b.includes(m))return!0;let f=(d.closest('label, td, [class*="option" i]')?.textContent??"").trim().toLowerCase();return b.some(y=>f===y||f.startsWith(y+" ")||f.startsWith("("+y+")"))})??null}}!r&&i.length>0&&(r=i[0])}if(r||(r=I(o,n,a.t==="val"||a.t==="sel")),!r&&o&&(r=I(q(o),n,a.t==="val"||a.t==="sel")),r&&n){if(r instanceof HTMLInputElement&&r.type==="radio"&&r.name){if(q(r.value).toLowerCase()!==q(n).toLowerCase()){let i=document.querySelector(`input[type="radio"][name="${D(r.name)}"][value="${D(n)}" i]`);if(i)r=i;else{let u=Array.from(document.querySelectorAll(`input[type="radio"][name="${D(r.name)}"]`)).find(b=>{let d=b.closest("label, .vf-label, .option-card, tr, td, div");return d&&q(d.textContent).toLowerCase().includes(q(n).toLowerCase())});u&&(r=u)}}}else if(!(r instanceof HTMLInputElement)&&!(r instanceof HTMLSelectElement)&&!(r instanceof HTMLTextAreaElement)){let i=r.querySelector(`input[value="${D(n)}" i], [data-value="${D(n)}" i]`);if(i)r=i;else{let u=Array.from(r.querySelectorAll('input[type="radio"], input[type="checkbox"]')).find(b=>{let d=b.closest("label, .vf-label, .option-card, td, div");return d&&q(d.textContent).toLowerCase().includes(q(n).toLowerCase())});u&&(r=u)}}}if(!r&&(a.t==="val"||a.t==="sel")){let i=document.body;try{i=G()||document.body}catch{}let c=Array.from(i.querySelectorAll(a.t==="sel"?'select, [role="combobox"], [role="listbox"]':'input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, select, [contenteditable="true"]')).filter(u=>k(u)&&!P(u));if(c.length===1)r=c[0];else if(c.length>1){let u=q(o).toLowerCase(),b=u.match(/^#?_?([0-9]+)$/);if(b){let d=parseInt(b[1],10);d>=1&&d<=c.length?r=c[d-1]:d>=0&&d<c.length&&(r=c[d])}r||(r=c.find(m=>{let p=(m.getAttribute("placeholder")||"").toLowerCase(),f=(m.name||"").toLowerCase(),y=(m.getAttribute("aria-label")||"").toLowerCase(),h=(m.id||"").toLowerCase(),g=q(ot(m)).toLowerCase(),v=q(m.closest('label, tr, td, .form-group, .field, [class*="row" i], div')?.textContent||"").toLowerCase();return p.includes(u)||f.includes(u)||y.includes(u)||h.includes(u)||g&&g.includes(u)||u.length>=2&&v.includes(u)})||(c.length===1?c[0]:null))}}if(!r&&a.t!=="adv")throw new Error(`Alvo '${o}' n\xE3o encontrado no DOM para a\xE7\xE3o '${a.t}'.`);switch(a.t){case"val":if(r){let u=r instanceof HTMLInputElement||r instanceof HTMLTextAreaElement||r instanceof HTMLSelectElement||r.isContentEditable?r:r.querySelector('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]');if(!u){let p=r.closest('.form-group, .field, [class*="input" i], [class*="control" i], label, tr, td, li, p, div')?.querySelector('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]');p&&(u=p)}if(!u){let m=r.nextElementSibling;for(;m;){if(m instanceof HTMLInputElement&&!["hidden","button","submit","checkbox","radio"].includes(m.type)||m instanceof HTMLTextAreaElement||m instanceof HTMLElement&&m.isContentEditable){u=m;break}let p=m.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(p){u=p;break}m=m.nextElementSibling}}if(!u){let m=document.body;try{m=G()||document.body}catch{}let p=Array.from(m.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]')).filter(f=>k(f)&&!P(f));p.length>0&&(u=p[0])}let b=a.v!==void 0?a.v:a.value!==void 0?a.value:a.val!==void 0?a.val:a.text,d=b!=null?String(b):"";De(u||r,d)}break;case"chk":let i=a.c!==void 0?!!a.c:!0;r&&se(r,i);break;case"sel":if(r){let u=Array.isArray(a.v)?a.v:[String(a.v)];Be(r,u)}break;case"clk":if(r)if(!!(r.closest('.option-card, label, .vf-label, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, [class*="option" i], [class*="choice" i], [class*="answer" i], li, tr')||r.querySelector('input[type="radio"], input[type="checkbox"]')||r instanceof HTMLInputElement&&["checkbox","radio"].includes(r.type))){let b=a.c!==void 0?!!a.c:!0;se(r,b)}else te(r,a.co);break;case"adv":let c=rt(a.id);if(c){await lt(c,1200);let u=a.id||c.textContent?.trim()||"";u&&Je(window.location.hostname,{advanceSelector:u}),te(c)}else console.warn("[EasyQuiz] Bot\xE3o de avan\xE7o n\xE3o localizado.");break}}function fa(){let a=["button","a",'[role="button"]','input[type="submit"]','input[type="button"]','[data-testid*="check" i]','[data-test-id*="check" i]'].join(",");return Array.from(document.querySelectorAll(a)).find(t=>{if(!k(t)||P(t)||t.closest("header, nav, aside"))return!1;let o=t instanceof HTMLInputElement||t instanceof HTMLButtonElement?t.value:"",l=(t.textContent||o||t.getAttribute("aria-label")||"").trim();return/(verificar|checar|check|conferir|validar|enviar|responder)/i.test(l)})||null}function rt(a){let e=d=>{let m=(d.getAttribute("aria-label")||d.textContent||(d instanceof HTMLInputElement||d instanceof HTMLButtonElement?d.value:"")||"").trim();return ne.test(m)};if(a){let d=I(a);if(d&&k(d)&&!P(d)&&!B(d)&&!e(d))return d}try{let d=Ee(window.location.hostname);if(d.advanceSelector){let m=I(d.advanceSelector);if(m&&k(m)&&!P(m)&&!B(m)&&!e(m))return m}}catch{}let t=["button","a",'[role="button"]','[role="link"]','input[type="button"]','input[type="submit"]','[data-testid*="next" i]','[data-testid*="continue" i]','[data-testid*="check" i]','[data-test-id*="next" i]','[data-test-id*="continue" i]','[data-test-id*="check" i]','[class*="next" i]','[class*="continue" i]','[class*="proximo" i]','[class*="avancar" i]'].join(","),o=Array.from(document.querySelectorAll(t)),l=d=>{let m=d instanceof HTMLInputElement||d instanceof HTMLButtonElement?d.value:"";return(d.getAttribute("aria-label")||d.textContent||m||"").trim()},n=d=>{let m=l(d).trim();return/^\d{1,3}$/.test(m)?!!d.closest('[class*="pagination" i], [class*="pager" i], [class*="page-nav" i], [class*="step-indicator" i], [class*="breadcrumb" i], [class*="steps" i], [aria-label*="p\xE1gina" i], [aria-label*="page" i], [role="navigation"], nav'):!1},r=o.filter(d=>k(d)&&!P(d)&&!d.closest("header, aside")&&!B(d)&&!e(d));for(let d of r){let m=l(d),p=m.replace(/[\d\(\)\[\]\u2192>\u2022\-\/\\]+/g," ").trim();if((Le.test(m)||Le.test(p))&&!n(d)&&!B(d))return d}for(let d of r)if(W(d)&&!B(d)&&!n(d))return d;let s=document.querySelector('[data-test-id*="next" i], [data-testid*="next" i], [aria-label*="next" i], [aria-label*="pr\xF3xim" i], [aria-label*="avan\xE7ar" i], [aria-label*="continuar" i]');if(s&&k(s)&&!P(s)&&!B(s)&&!e(s))return s;let i=Array.from(document.querySelectorAll('input[type="submit"], button[type="submit"]'));for(let d of i)if(k(d)&&!P(d)&&!e(d)&&!B(d)&&!n(d))return d;let c=Array.from(document.querySelectorAll('button, [role="button"]')),u=window.innerHeight,b=c.filter(d=>{if(!k(d)||P(d)||e(d)||B(d)||d.closest("header, nav, aside, .eq-sidebar")||n(d))return!1;let m=d.getBoundingClientRect();return m.top>u*.45&&m.height>=24&&m.width>=24});if(b.length>0)return b.sort((d,m)=>{let p=d.getBoundingClientRect(),f=m.getBoundingClientRect(),y=p.left+p.top;return f.left+f.top-y}),b[0];for(let d of r)if(W(d)&&!B(d))return d;return null}async function lt(a,e=2500){let t=Date.now();for(;Date.now()-t<e;){if(!(a.disabled===!0||a.getAttribute("aria-disabled")==="true"||a.classList.contains("disabled")||a.getAttribute("disabled")!==null))return;await new Promise(l=>setTimeout(l,80))}}function ba(){let a=window.location.href,e=document.title,t=document.querySelectorAll('input, textarea, select, button, [role="button"], [role="option"], [role="radio"], [role="checkbox"]').length,o=(document.body?.innerText||document.body?.textContent||"").length;return`${a}|${e}|${t}|${o}`}async function va(a,e=3500){let[t,o,l,n]=a.split("|"),r=parseInt(n||"0",10),s=Date.now();for(;Date.now()-s<e;){let i=window.location.href,c=document.title,u=String(document.querySelectorAll('input, textarea, select, button, [role="button"], [role="option"], [role="radio"], [role="checkbox"]').length),b=(document.body?.innerText||document.body?.textContent||"").length;if(i!==t)return{changed:!0,evidence:`URL mudou: ${t} \u2192 ${i}`};if(c!==o)return{changed:!0,evidence:`T\xEDtulo da p\xE1gina mudou: "${o}" \u2192 "${c}"`};if(Math.abs(parseInt(u)-parseInt(l||"0"))>=2)return{changed:!0,evidence:`Controles interativos: ${l} \u2192 ${u}`};if(Math.abs(b-r)>50)return{changed:!0,evidence:`Conte\xFAdo da p\xE1gina mudou substancialmente (${Math.abs(b-r)} chars)`};await new Promise(d=>setTimeout(d,100))}return{changed:!1,evidence:"Nenhuma mudan\xE7a estrutural detectada dentro do tempo limite."}}async function _e(a){if(a.t==="js"||a.t==="adv")return;if(a.t==="drag"){let n=I(a.from)||I(q(a.from)),r=I(a.to)||I(q(a.to));n&&r&&await Ve(n,r,2);return}let e=a.id||"",t=a.v!==void 0?String(a.v).trim():"",o=I(e,t)||I(q(e),t),l=String(a.name??a.n??"").trim();if(!l&&e&&document.querySelector(`input[type="radio"][name="${D(e)}"]`)&&(l=e),!o&&l){let n=Array.from(document.querySelectorAll(`input[name="${D(l)}"]`));if(t&&(o=n.find(r=>r.value?.toLowerCase()===t.toLowerCase())??null),!o&&t){let r=/^(v|verdadeiro|true|1|t|sim|correto)$/i.test(t),s=/^(f|falso|false|0|nao|não|incorreto|errado)$/i.test(t);if(r||s){let i=r?["v","verdadeiro","true","1","t","sim","correto"]:["f","falso","false","0","nao","n\xE3o","incorreto","errado"];o=n.find(c=>{let u=c.value?.toLowerCase()??"";if(i.includes(u))return!0;let d=(c.closest('label, td, [class*="option" i]')?.textContent??"").trim().toLowerCase();return i.some(m=>d===m||d.startsWith(m+" ")||d.startsWith("("+m+")"))})??null}}!o&&n.length>0&&(o=n[0])}if(a.t==="clk"||a.t==="chk"){if(!o&&e){let r=Array.from(document.querySelectorAll('input, label, button, [role="radio"], [role="checkbox"], .option-card, [class*="option" i], [class*="choice" i]')),s=q(e).toLowerCase();o=r.find(i=>{let c=q(i.textContent).toLowerCase();return!!(q(i.value||"").toLowerCase()===s||c===s||c.startsWith(s+")")||c.startsWith("("+s+")")||c.startsWith(s+".")||c.startsWith(s+" - ")||c.startsWith(s+":")||s.length>=3&&c.includes(s))})||null}let n=a.v!==void 0?String(a.v).trim():"";if(o&&n){if(o instanceof HTMLInputElement&&o.type==="radio"&&o.name){if(q(o.value).toLowerCase()!==q(n).toLowerCase()){let r=document.querySelector(`input[type="radio"][name="${D(o.name)}"][value="${D(n)}" i]`);if(r)o=r;else{let i=Array.from(document.querySelectorAll(`input[type="radio"][name="${D(o.name)}"]`)).find(c=>{let u=c.closest("label, .vf-label, .option-card, tr, td, div");return u&&q(u.textContent).toLowerCase().includes(q(n).toLowerCase())});i&&(o=i)}}}else if(!(o instanceof HTMLInputElement)&&!(o instanceof HTMLSelectElement)&&!(o instanceof HTMLTextAreaElement)){let r=o.querySelector(`input[value="${D(n)}" i], [data-value="${D(n)}" i]`);if(r)o=r;else{let i=Array.from(o.querySelectorAll('input[type="radio"], input[type="checkbox"]')).find(c=>{let u=c.closest("label, .vf-label, .option-card, td, div");return u&&q(u.textContent).toLowerCase().includes(q(n).toLowerCase())});i&&(o=i)}}}if(o){let r=o.closest('.option-card, label, .vf-label, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, li')||o,s=o instanceof HTMLInputElement&&["radio","checkbox"].includes(o.type)?o:r.querySelector('input[type="radio"], input[type="checkbox"]')||(r.getAttribute("for")?r.ownerDocument.getElementById(r.getAttribute("for")):null),i=a.c!==void 0?!!a.c:!0;if(se(s||r,i),s&&s.checked!==i){try{let c=s._valueTracker;c&&c.setValue(!i)}catch{}try{Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"checked")?.set?.call(s,i)}catch{}s.checked=i,s.dispatchEvent(new Event("input",{bubbles:!0,composed:!0})),s.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}}return}if(a.t==="val"){let n=null;if(o&&(n=o instanceof HTMLInputElement||o instanceof HTMLTextAreaElement||o.isContentEditable?o:o.querySelector('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]')),!n){let r=document.body;try{r=G()||document.body}catch{}let s=Array.from(r.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]')),i=q(e).toLowerCase();n=s.find(c=>{let u=(c.getAttribute("placeholder")||"").toLowerCase(),b=(c.name||"").toLowerCase(),d=(c.id||"").toLowerCase(),m=(c.getAttribute("aria-label")||"").toLowerCase();return u.includes(i)||b.includes(i)||d.includes(i)||m.includes(i)})||(s.length>0?s[0]:null)}if(n){let r=String(a.v??"");try{if(n.focus?.(),n.type!=="number"){try{n.select?.()}catch{}document.execCommand?.("insertText",!1,r)}}catch{}De(n,r)}return}if(a.t==="sel"){if(!o&&e){let n=Array.from(document.querySelectorAll("select")),r=q(e).toLowerCase();o=n.find(s=>{let i=(s.name||"").toLowerCase(),c=(s.id||"").toLowerCase(),u=(s.getAttribute("aria-label")||"").toLowerCase();return i.includes(r)||c.includes(r)||u.includes(r)})||null}if(o){let n=Array.isArray(a.v)?a.v:[String(a.v)];Be(o,n)}return}}function Z(a){try{if(a.t==="val"){let e=a.v!==void 0?a.v:a.value!==void 0?a.value:a.val!==void 0?a.val:a.text,t=String(e??"").trim(),o=t,l=a.id!==void 0&&a.id!==null?String(a.id):"";l||(l=a.target??a.name??a.selector??"1");let n=I(l,o,!0)||I(q(l),o,!0);if(!n){let m=document.body;try{m=G()||document.body}catch{}let p=Array.from(m.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]')).filter(f=>k(f)&&!P(f));p.length>0&&(n=p[0])}if(!n)return!1;let r=n instanceof HTMLInputElement&&n.type==="radio"?n:n.querySelector('input[type="radio"]');if(r&&r.name){let m=document.querySelector(`input[type="radio"][name="${D(r.name)}"]:checked`);if(!m)return!1;let p=q(m.value).toLowerCase(),f=q(t).toLowerCase(),y=q(m.closest("label, .vf-label, .option-card, tr, td, div")?.textContent||"").toLowerCase();return p===f||y===f||y.includes(f)}let s=n instanceof HTMLInputElement||n instanceof HTMLTextAreaElement||n.isContentEditable?n:n.querySelector('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(!s){let p=n.closest('.form-group, .field, [class*="input" i], [class*="control" i], label, tr, td, li, p, div')?.querySelector('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]');p&&(s=p)}if(!s){let m=n.nextElementSibling;for(;m;){if(m instanceof HTMLInputElement&&!["hidden","button","submit","checkbox","radio"].includes(m.type)||m instanceof HTMLTextAreaElement||m instanceof HTMLElement&&m.isContentEditable){s=m;break}let p=m.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(p){s=p;break}m=m.nextElementSibling}}if(s instanceof HTMLSelectElement){let m=q(t).toLowerCase();return Array.from(s.options).some(p=>{if(!p.selected)return!1;let f=p.value.toLowerCase(),y=q(p.textContent).toLowerCase();return m===f||m===y||f.includes(m)||y.includes(m)})}let i=(s instanceof HTMLInputElement||s instanceof HTMLTextAreaElement?s.value:s?.textContent??n.textContent??"").trim();if(!i&&!t)return!0;if(!i&&t)return!1;let c=i.replace(",",".").replace(/\s+/g,"").toLowerCase(),u=t.replace(",",".").replace(/\s+/g,"").toLowerCase(),b=parseFloat(c),d=parseFloat(u);return!isNaN(b)&&!isNaN(d)&&c.match(/^-?[\d.,]+$/)&&u.match(/^-?[\d.,]+$/)?Math.abs(b-d)<1e-4:c===u||i.toLowerCase()===t.toLowerCase()||u.length>=3&&c===u}if(a.t==="sel"){let e=I(a.id,void 0,!0)||I(q(a.id),void 0,!0);if(!e){let n=document.body;try{n=G()||document.body}catch{}let r=Array.from(n.querySelectorAll('select, [role="combobox"], [role="listbox"]')).filter(c=>k(c)&&!P(c)),s=q(a.id).toLowerCase();e=r.find(c=>{let u=(c.id||"").toLowerCase(),b=(c.getAttribute("name")||"").toLowerCase(),d=(c.getAttribute("aria-label")||"").toLowerCase(),m=q(c.closest('.dropdown-row, [class*="dropdown" i], [class*="select" i], tr, label, div')?.textContent||"").toLowerCase();return u.includes(s)||b.includes(s)||d.includes(s)||s.length>=2&&m.includes(s)})||(r.length===1?r[0]:null)}if(!e)return!1;let t=e instanceof HTMLSelectElement?e:e.querySelector("select");if(!t){let n=e.matches?.('[role="combobox"], [role="listbox"], [class*="select" i], [class*="dropdown" i]')?e:e.closest('[role="combobox"], [role="listbox"], [class*="select" i], [class*="dropdown" i]');if(n){let s=(Array.isArray(a.v)?a.v:[String(a.v)]).map(c=>q(c).toLowerCase()),i=q(n.textContent).toLowerCase();return s.some(c=>i.includes(c)||c.includes(i))}return!1}let l=(Array.isArray(a.v)?a.v:[String(a.v)]).map(n=>q(n).toLowerCase());return Array.from(t.options).some(n=>{if(!n.selected)return!1;let r=n.value.toLowerCase(),s=q(n.textContent).toLowerCase();return l.some(i=>i===r||i===s||r.includes(i)||s.includes(i))})}if(a.t==="chk"||a.t==="clk"){let e=a.v!==void 0?String(a.v).trim():"",t=String(a.name??a.n??"").trim();if(t&&!a.id){let d=Array.from(document.querySelectorAll(`input[name="${D(t)}"]`));if(d.length>0){let m=d.find(g=>g.checked);if(!m)return!1;if(!e)return!0;let p=m.value?.toLowerCase()??"",f=e.toLowerCase();if(p===f)return!0;let y=/^(v|verdadeiro|true|1|t|sim|correto)$/i.test(e),h=/^(f|falso|false|0|nao|não|incorreto|errado)$/i.test(e);return y?/^(v|verdadeiro|true|1|t|sim|correto)$/i.test(p):h?/^(f|falso|false|0|nao|não|incorreto|errado)$/i.test(p):!1}}let o=I(a.id,e)||I(q(a.id),e);if(!o&&t){let d=document.querySelector(`input[name="${D(t)}"]`);d&&(o=d)}if(!o)return!1;let l=o.closest('.option-card, label, .vf-label, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, li')||o,n=o instanceof HTMLInputElement&&["checkbox","radio"].includes(o.type)?o:l.querySelector('input[type="checkbox"], input[type="radio"]')||(l.getAttribute("for")?l.ownerDocument.getElementById(l.getAttribute("for")):null),r=a.t==="chk"||a.c!==void 0?!!a.c:!0;if(n&&n.type==="radio"){if(n.checked===r)return!0;if(a.v&&n.name){let d=q(String(a.v)).toLowerCase(),m=document.querySelector(`input[type="radio"][name="${D(n.name)}"]:checked`);if(!m)return!1;if(m===n)return!0;let p=q(m.value).toLowerCase(),f=q(m.closest("label, .vf-label, .option-card, tr, td, div")?.textContent||"").toLowerCase();return p===d||f.includes(d)||d.includes(p)}}if(n&&["checkbox","radio"].includes(n.type))return n.checked===r;let s=l.getAttribute("aria-checked")===String(r)||l.getAttribute("aria-selected")===String(r)||l.getAttribute("aria-pressed")===String(r),i=r?l.getAttribute("data-selected")==="true"||l.getAttribute("data-checked")==="true"||l.getAttribute("data-active")==="true"||l.getAttribute("data-state")==="checked"||l.getAttribute("data-state")==="on":l.getAttribute("data-selected")==="false"||l.getAttribute("data-checked")==="false"||l.getAttribute("data-state")==="unchecked",c=l.className||"",u=r?/\b(active|selected|checked|picked|is-selected|choice-selected|selected-option|is-checked|chosen|current)\b/i.test(c):!/\b(active|selected|checked|picked|is-selected|choice-selected|selected-option|is-checked|chosen|current)\b/i.test(c);if(s||i||u)return!0;let b=!!l.closest('[role="radiogroup"], [role="listbox"], .options, .choices, [class*="option" i], [class*="choice" i], [class*="answer" i], [class*="quiz" i]');return a.t==="clk"&&!n&&!b||l.getAttribute("aria-expanded")!==null||l.getAttribute("aria-pressed")!==null}if(a.t==="drag"){let e=ee(a.from,"source")||I(a.from)||I(q(a.from)),t=ee(a.to,"destination")||I(a.to)||I(q(a.to));return!e||!t?!1:ha(e,t).success}}catch{}return!1}async function Me(a,e,t=1,o=ue({engine:"smart",autoAdvance:e})){let l=a.actions.filter(x=>x.t!=="adv"),n=a.actions.filter(x=>x.t==="adv"),r=0,s=[],i=new Map,c=new Map,u=new Map,b=new Set,d=a.pageType==="question",m=l.filter(x=>x.t==="chk"||x.t==="clk"&&x.c!==void 0),p=new Map;for(let x of l){let T=[];c.set(x,T);try{if(x.t==="drag"){T.push("declarative-A-F");try{let M=ee(x.from,"source")||I(x.from),$=ee(x.to,"destination")||I(x.to);M&&u.set(x,M.parentElement?.outerHTML?.slice(0,500)||""),$&&p.set(x,$.children.length)}catch{}}else T.push("declarative-primary");await ga(x,t,o),r++,b.add(x)}catch(M){i.set(x,M instanceof Error?M.message:String(M)),console.warn("[EasyQuiz] A\xE7\xE3o declarativa prim\xE1ria falhou com seguran\xE7a:",x,M)}await new Promise(M=>setTimeout(M,x.t==="drag"?180:35))}if(d&&a.mode==="escolha_multipla"&&m.length>0){let x=document.body;try{x=G()||document.body}catch{}let T=Array.from(x.querySelectorAll('input[type="checkbox"], [role="checkbox"]')).filter(M=>k(M)&&!P(M));if(T.length>1){let $=function(E,H){if(E===H||E.contains(H)||H.contains(E))return!0;let V=E.closest('.option-card, label, [role="checkbox"], [role="option"], tr, li, [class*="option" i]'),_=H.closest('.option-card, label, [role="checkbox"], [role="option"], tr, li, [class*="option" i]');if(V&&_&&V===_)return!0;let O=E.getAttribute("for")||E.id,N=H.getAttribute("for")||H.id;return!!(O&&N&&O===N)};var S=$;let M=new Set;for(let E of m){let H=E.t==="chk"?!!E.c:!!(E.c??!0),V="id"in E&&typeof E.id=="string"?E.id:"";if(H&&V){let _=I(V,E.v);if(_){M.add(_);let O=_.querySelector('input[type="checkbox"]');O&&M.add(O);let N=_.closest('.option-card, label, [role="checkbox"], tr, li, [class*="option" i]');N&&(M.add(N),N.querySelectorAll('input[type="checkbox"]').forEach(j=>M.add(j)))}}}if(M.size>=m.length&&M.size>0){let E=Array.from(M);for(let H of T)E.some(_=>$(_,H))||(H instanceof HTMLInputElement&&H.checked||H.getAttribute("aria-checked")==="true"||H.closest(".option-card, label")?.classList.contains("selected"))&&se(H,!1)}}}await new Promise(x=>setTimeout(x,l.length>0?100:25));let f=0;for(let x of l){if(Z(x)){f++;continue}console.warn(`[EasyQuiz Auto-Cura] A\xE7\xE3o '${x.t}' no alvo '${x.id||x.from||""}' n\xE3o verificada no DOM. Disparando Passagem 2 de conting\xEAncia...`);try{tt(x,o),c.get(x)?.push("alternative-path"),await _e(x)}catch(T){i.set(x,T instanceof Error?T.message:String(T)),console.warn("[EasyQuiz Auto-Cura] Rota alternativa falhou:",T)}await new Promise(T=>setTimeout(T,250)),Z(x)&&(console.log("[EasyQuiz Auto-Cura] \u2713 A\xE7\xE3o recuperada com sucesso pela rota de conting\xEAncia!"),f++,b.has(x)?i.has(x)&&i.delete(x):(i.delete(x),r++,b.add(x)))}if(f<l.length&&l.length>0){console.warn(`[EasyQuiz Auto-Cura] ${l.length-f} de ${l.length} a\xE7\xE3o(\xF5es) ainda n\xE3o verificadas. Disparando Passagem 3 final...`),await new Promise(x=>setTimeout(x,200));for(let x of l)if(!Z(x))try{if(await _e(x),await new Promise(T=>setTimeout(T,80)),!Z(x)&&(x.t==="clk"||x.t==="chk"))try{let T="id"in x?String(x.id||""):"",M=x.v!==void 0?String(x.v).trim():"",$=I(T,M)||I(q(T),M);$&&(ct($),await new Promise(E=>setTimeout(E,120)))}catch{}}catch(T){i.set(x,T instanceof Error?T.message:String(T))}await new Promise(x=>setTimeout(x,200)),f=0;for(let x of l)Z(x)&&(f++,b.has(x)?i.has(x)&&i.delete(x):(i.delete(x),r++,b.add(x)))}let y=[];for(let[x,T]of l.entries())if(!Z(T)){let M=T.t==="drag"?`${T.from} -> ${T.to}`:"id"in T?T.id:T.t;s.push(M),y.push({actionIndex:x,action:T,strategiesAttempted:c.get(T)||[],evidence:i.get(T)||"sem evid\xEAncia de aplica\xE7\xE3o no DOM",domSnapshot:u.get(T)}),T.t==="drag"&&console.warn(`[EasyQuiz Drag] FALHA CONFIRMADA: "${T.from}" -> "${T.to}"`,`
  Estrat\xE9gias: ${(c.get(T)||[]).join(", ")}`,`
  Snapshot DOM: ${u.get(T)?.slice(0,200)||"n/a"}`)}d&&l.length===0&&s.push("nenhuma a\xE7\xE3o de resposta prescrita");let h=l.map((x,T)=>{let M=x.t==="drag"?`${x.from} -> ${x.to}`:x.t==="js"?"$eq":x.id||x.t,$=x.t==="js"?!0:x.t==="drag"?!!(ee(x.from,"source")&&ee(x.to,"destination")):!!(I(x.id||"")||I(q(x.id||""))),E=Z(x);return{index:T,action:x,target:M,located:$,applied:!i.has(x),verified:E,strategy:x.t==="drag"?"drag-adaptive":x.t==="js"?"javascript":"declarative-dom",evidence:E?"estado do controle confirmado no DOM":"nenhuma evid\xEAncia suficiente ap\xF3s as tentativas",...i.has(x)?{error:i.get(x)}:{}}}),g=d?l.length>0&&s.length===0&&(f===l.length||r===l.length&&f>0):!0,v=!1,w=!1,C="Nenhuma a\xE7\xE3o de navega\xE7\xE3o solicitada.",L=r>0&&r>=l.length/2;if(e&&(g||!d||L)){await new Promise(E=>setTimeout(E,l.length>0?120:40));let x=!1;if(a.pageType!=="info"){let E=fa();E&&k(E)&&(await lt(E,1200),te(E),x=!0,await new Promise(H=>setTimeout(H,350)))}let T=ba(),M=n.length>0?n[0].id:void 0,$=rt(M);if(!$&&x&&(await new Promise(E=>setTimeout(E,250)),$=rt(M)),$){await lt($,1500);let E=M||$.textContent?.trim()||"";E&&Je(window.location.hostname,{advanceSelector:E}),te($);let H=await va(T,1800);w=H.changed,C=H.evidence,v=H.changed||x,!H.changed&&!x&&console.warn("[EasyQuiz] O bot\xE3o de avan\xE7o foi acionado, mas a navega\xE7\xE3o ainda n\xE3o concluiu.")}else x?(v=!0,w=!0,C="Resposta confirmada via bot\xE3o de verifica\xE7\xE3o/envio."):console.warn("[EasyQuiz] Nenhum bot\xE3o de avan\xE7o encontrado na p\xE1gina.")}return{applied:r,verified:f,success:g,advanced:v,failed:s,reports:h,navigationVerified:w,navigationEvidence:C,failedActions:y}}var ye=null,me=[],Ke=[],dt=[],xe=null,ya=`
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
`;function _t(){try{if(typeof document>"u"||!document.head)return;if(!document.getElementById("eq-image-pulse-style")){let a=document.createElement("style");a.id="eq-image-pulse-style",a.textContent=ya,document.head.appendChild(a)}}catch{}}function he(){ye&&(ye.style.removeProperty("outline"),ye.style.removeProperty("outline-offset"),ye.style.removeProperty("position"),ye=null);for(let a of me)a.style.removeProperty("outline"),a.style.removeProperty("outline-offset"),a.style.removeProperty("background-color"),a.style.removeProperty("box-shadow"),a.removeAttribute("data-easyquiz-highlight");me=[];for(let a of Ke)a.style.removeProperty("animation"),a.style.removeProperty("outline"),a.style.removeProperty("outline-offset"),a.style.removeProperty("box-shadow"),a.removeAttribute("data-easyquiz-image-highlight");Ke=[];for(let a of dt)try{a.remove()}catch{}if(dt=[],xe){try{xe.remove()}catch{}xe=null}}function ut(a){_t();for(let e of a){if(!e||typeof e.setAttribute!="function")continue;let t=e;try{t.style&&(t.style.outline="3px solid #ffd600",t.style.outlineOffset="4px",t.style.animation="eq-image-pulse-yellow-white 1.2s ease-in-out infinite",e.tagName.toLowerCase()==="svg"&&(t.style.boxShadow="0 0 16px rgba(255, 214, 0, 0.7)",t.style.filter="drop-shadow(0 0 8px rgba(255, 214, 0, 0.8))")),t.setAttribute("data-easyquiz-image-highlight","true"),Ke.push(t)}catch{}let o=e.tagName.toLowerCase()==="svg"&&e.closest('.trig-diagram-container, [class*="diagram" i], [class*="graph" i], [class*="chart" i], figure')||e.parentElement;if(o&&o!==document.body&&o!==document.documentElement&&!o.hasAttribute("data-easyquiz-image-highlight"))try{o.style&&e.tagName.toLowerCase()==="svg"&&(o.style.outline="2px solid rgba(255, 214, 0, 0.5)",o.style.outlineOffset="6px",o.style.borderRadius="8px",o.setAttribute("data-easyquiz-image-highlight","true"),Ke.push(o))}catch{}try{let l=o||t.parentElement;if(l&&!l.querySelector("[data-easyquiz-capture-badge]")){(window.getComputedStyle?window.getComputedStyle(l).position:l.style.position||"")==="static"&&(l.style.position="relative");let r=document.createElement("div");r.setAttribute("data-easyquiz-capture-badge","true"),r.textContent="\u{1F4F7} Imagem / Gr\xE1fico Analisado pela IA",r.style.cssText=`
          position: absolute; top: 4px; left: 4px; z-index: 99999;
          background: rgba(12, 14, 20, 0.92); color: #ffd600; font-size: 11px;
          font-weight: 800; padding: 3px 8px; border-radius: 6px;
          border: 1px solid rgba(255, 214, 0, 0.6);
          pointer-events: none; font-family: system-ui, -apple-system, sans-serif;
          animation: eq-badge-fade-in 0.3s ease-out;
          box-shadow: 0 2px 8px rgba(0,0,0,0.5);
          letter-spacing: 0.3px;
        `,l.appendChild(r),dt.push(r)}}catch{}}}function pt(a){he(),_t(),ye=a,a.style.outline="2px solid #00e5ff",a.style.outlineOffset="4px";try{window.getComputedStyle(a).position==="static"&&(a.style.position="relative");let t=document.createElement("div");t.style.cssText=`
      position: absolute; left: 0; right: 0; top: 0; height: 3px;
      background: linear-gradient(90deg, transparent, #00e5ff, #00ff88, #00e5ff, transparent);
      z-index: 99998; pointer-events: none; border-radius: 2px;
      animation: eq-scope-scan 0.8s ease-in-out forwards;
      box-shadow: 0 0 8px rgba(0, 229, 255, 0.6);
    `,a.appendChild(t),xe=t,setTimeout(()=>{try{t.remove()}catch{}xe===t&&(xe=null)},900)}catch{}}function xa(a){return!a||a>=.9?{outline:"#00ff88",bg:"rgba(0, 255, 136, 0.12)",glow:"rgba(0, 255, 136, 0.8)"}:a>=.7?{outline:"#00bfff",bg:"rgba(0, 191, 255, 0.10)",glow:"rgba(0, 191, 255, 0.7)"}:{outline:"#ffaa00",bg:"rgba(255, 170, 0, 0.10)",glow:"rgba(255, 170, 0, 0.7)"}}function Kt(a,e){let t=xa(e);for(let o of a){if(o.t==="adv"||o.t==="js")continue;if(o.t==="drag"){try{let m=I(o.from),p=I(o.to);m&&(m.style.outline=`2px solid ${t.outline}`,me.push(m)),p&&(p.style.outline="2px dashed #00e5ff",me.push(p))}catch{}continue}let l=o.v!==void 0?Array.isArray(o.v)?o.v[0]:String(o.v):"",n=String(o.name??o.n??"").trim(),r=null;if(n){let m=Array.from(document.querySelectorAll(`input[name="${D(n)}"]`));if(l&&(r=m.find(p=>p.value?.toLowerCase()===l.toLowerCase())??null,!r)){let p=/^(v|verdadeiro|true|1|t|sim|correto)$/i.test(l),f=/^(f|falso|false|0|nao|não|incorreto|errado)$/i.test(l);if(p||f){let y=p?["v","verdadeiro","true","1","t","sim","correto"]:["f","falso","false","0","nao","n\xE3o","incorreto","errado"];r=m.find(h=>{let g=h.value?.toLowerCase()??"";if(y.includes(g))return!0;let w=(h.closest('label, .vf-label, td, [class*="option" i]')?.textContent??"").trim().toLowerCase();return y.some(C=>w===C||w.startsWith(C+" ")||w.startsWith("("+C+")"))})??null}}!r&&m.length>0&&(r=m[0])}if(!r&&o.id&&(r=I(o.id,l,o.t==="val"||o.t==="sel")||I(q(o.id),l,o.t==="val"||o.t==="sel")),!r&&o.t==="sel"){let m=document.body;try{m=G()||document.body}catch{}let p=Array.from(m.querySelectorAll('select, [role="combobox"], [role="listbox"]')).filter(h=>k(h)&&!ie(h)),f=q(o.id).toLowerCase();r=p.find(h=>{let g=(h.id||"").toLowerCase(),v=(h.getAttribute("name")||"").toLowerCase(),w=(h.getAttribute("aria-label")||"").toLowerCase(),C=q(h.closest('.dropdown-row, [class*="dropdown" i], [class*="select" i], tr, label, div')?.textContent||"").toLowerCase();return g.includes(f)||v.includes(f)||w.includes(f)||f.length>=2&&C.includes(f)})||(p.length===1?p[0]:null)}if(!r)continue;let s=typeof HTMLSelectElement<"u"&&r instanceof HTMLSelectElement||r.tagName?.toLowerCase()==="select"||r.getAttribute("role")==="combobox"||r.getAttribute("role")==="listbox",i=r.closest('label, .vf-label, .option-card, [role="radio"], [role="checkbox"], [role="option"], [role="listitem"], .answer, .quiz-option, .form-check, [class*="option" i], [class*="choice" i]'),c=s?r.parentElement?.closest('.dropdown-row, [class*="dropdown" i], [class*="select-row" i], .form-group, tr, li'):null,u=i||c||r;u.style.outline=`2px solid ${t.outline}`,u.style.outlineOffset="2px",u.style.backgroundColor=t.bg,u.setAttribute("data-easyquiz-highlight","true"),me.push(u);let b=s?r:u.querySelector('select, [role="combobox"], [role="listbox"]');b&&(b.style.outline=`2px solid ${t.outline}`,b.style.outlineOffset="2px",b.style.boxShadow=`0 0 10px ${t.glow}`,b.setAttribute("data-easyquiz-highlight","true"),me.push(b));let d=r instanceof HTMLInputElement&&["checkbox","radio"].includes(r.type)?r:u.querySelector('input[type="checkbox"], input[type="radio"]');d&&d!==u&&(d.style.outline=`2px solid ${t.outline}`,d.style.outlineOffset="2px",d.style.boxShadow=`0 0 10px ${t.glow}`,d.setAttribute("data-easyquiz-highlight","true"),me.push(d))}}var mt=10,ht=1400,Ie=15e5;function re(a){return new Promise((e,t)=>{let o=new FileReader;o.onerror=()=>t(new Error("Falha ao converter blob para base64.")),o.onload=()=>{let l=String(o.result||"");e(l.split(",")[1]||"")},o.readAsDataURL(a)})}async function ge(a){let e=0,t=0;if(a instanceof HTMLImageElement?(e=a.naturalWidth||a.width,t=a.naturalHeight||a.height):(e=a.width,t=a.height),e<=0||t<=0)throw new Error("Dimens\xF5es inv\xE1lidas.");let o=Math.min(1,ht/Math.max(e,t)),l=Math.max(1,Math.round(e*o)),n=Math.max(1,Math.round(t*o)),r=document.createElement("canvas");r.width=l,r.height=n;let s=r.getContext("2d",{alpha:!1});if(!s)throw new Error("Sem suporte a Canvas 2D.");return s.fillStyle="#ffffff",s.fillRect(0,0,l,n),s.drawImage(a,0,0,l,n),new Promise((i,c)=>{r.toBlob(u=>u?i(u):c(new Error("Falha na compress\xE3o.")),"image/jpeg",.88)})}async function wa(a){let e=typeof a.getBoundingClientRect=="function"?a.getBoundingClientRect():{width:0,height:0},t=e.width||parseFloat(a.getAttribute("width")||"0")||parseFloat(a.style.width||"0")||400,o=e.height||parseFloat(a.getAttribute("height")||"0")||parseFloat(a.style.height||"0")||300,l=2,n=Math.min(1800,Math.max(120,Math.round(t*l))),r=Math.min(1800,Math.max(100,Math.round(o*l))),s=a.cloneNode(!0);s.getAttribute("xmlns")||s.setAttribute("xmlns","http://www.w3.org/2000/svg"),s.getAttribute("xmlns:xlink")||s.setAttribute("xmlns:xlink","http://www.w3.org/1999/xlink"),s.setAttribute("width",String(n)),s.setAttribute("height",String(r)),!s.getAttribute("viewBox")&&t>0&&o>0&&s.setAttribute("viewBox",`0 0 ${t} ${o}`);let i="#ffffff";try{let f=a.parentElement||a;for(;f&&f!==document.documentElement;){let h=(window.getComputedStyle?window.getComputedStyle(f):null)?.backgroundColor;if(h&&h!=="transparent"&&h!=="rgba(0, 0, 0, 0)"){i=h;break}f=f.parentElement}}catch{}let u=new XMLSerializer().serializeToString(s),b=f=>new Promise((y,h)=>{let g=new Image;g.onload=()=>y(g),g.onerror=()=>h(new Error("Falha ao renderizar SVG em Image.")),g.src=f}),d=null,m=new Blob([u],{type:"image/svg+xml;charset=utf-8"}),p=URL.createObjectURL(m);try{try{d=await b(p)}catch{let h=`data:image/svg+xml;charset=utf-8,${encodeURIComponent(u)}`;d=await b(h)}let f=document.createElement("canvas");f.width=n,f.height=r;let y=f.getContext("2d",{alpha:!1});if(!y)throw new Error("Sem suporte a Canvas 2D.");return y.fillStyle=i,y.fillRect(0,0,n,r),y.drawImage(d,0,0,n,r),new Promise((h,g)=>{f.toBlob(v=>v?h(v):g(new Error("Falha na compress\xE3o do SVG.")),"image/jpeg",.92)})}finally{URL.revokeObjectURL(p)}}async function gt(a){try{let e=a.cloneNode(!0),t=a.offsetWidth||500,o=a.offsetHeight||500,l=`
      <svg xmlns="http://www.w3.org/2000/svg" width="${t}" height="${o}">
        <foreignObject width="100%" height="100%">
          <div xmlns="http://www.w3.org/1999/xhtml" style="background:#fff;font-family:sans-serif;">
            ${e.innerHTML}
          </div>
        </foreignObject>
      </svg>
    `,n=new Blob([l],{type:"image/svg+xml;charset=utf-8"}),r=URL.createObjectURL(n);try{let s=new Image;await new Promise((u,b)=>{s.onload=()=>u(),s.onerror=()=>b(new Error("Falha ao renderizar ForeignObject.")),s.src=r});let i=await ge(s),c=await re(i);if(c&&c.length<=Ie)return{mediaType:"image/jpeg",base64:c,alt:"Captura via rasteriza\xE7\xE3o DOM",source:"rasterized",captureStatus:"captured"}}finally{URL.revokeObjectURL(r)}}catch(e){console.warn("[EasyQuiz] Falha na rasteriza\xE7\xE3o do n\xF3:",e)}return null}function jt(a,e,t,o){if(t<=0||o<=0){let d=typeof a.getBoundingClientRect=="function"?a.getBoundingClientRect():{width:0,height:0};if(t=d.width||t,o=d.height||o,t<=0||o<=0){if(e&&/\b(icon|logo|avatar|badge|emoji|spinner|loading)\b/i.test(e))return!1;let p=a instanceof HTMLImageElement&&a.src||"";return p&&/\/icons?\/|\/logos?\/|\/avatars?\/|\/badges?\//i.test(p)?!1:!!(p||e)}}if(t<48||o<48||Math.max(t,o)/Math.max(1,Math.min(t,o))>15)return!1;let n=a.getAttribute("class")||"",r=a.getAttribute("aria-hidden"),s=a.getAttribute("role"),i=a instanceof HTMLImageElement&&a.src||"";if(r==="true"||s==="presentation"||s==="none")return!1;let c=/\b(icon|logo|avatar|badge|emoji|decoration|ornament|spinner|loading|thumbnail|profile|photo)\b/i;if(c.test(n)||e&&c.test(e)||i&&/\/icons?\/|\/logos?\/|\/avatars?\/|\/badges?\/|\/emojis?\//i.test(i)||e===""||e===" "||e==="-")return!1;let u=/\b(graph|chart|diagram|table|map|formula|equation|figure|plot|curve|histogram|scatter|matrix|image|foto|imagem|gráfico|tabela|mapa|fórmula|questão|enunciado|stimulus)\b/i;return u.test(e)||u.test(n)||a.closest('[data-question], [class*="question" i], [class*="prompt" i], [class*="stimulus" i], [class*="enunciado" i], [class*="statement" i], article, .problem, .exercise')?!0:t>=80&&o>=80}function Ut(a){let e=[],t=a.getAttribute("alt")||a.getAttribute("aria-label")||a.getAttribute("title")||"";t&&t.length>2&&e.push(`Alt: "${t}"`);let n=a.closest("figure")?.querySelector("figcaption")?.textContent?.trim();n&&n.length>2&&e.push(`Legenda: "${n}"`);let r=a.getAttribute("aria-describedby");if(r){let u=document.getElementById(r)?.textContent?.trim();u&&e.push(`Descri\xE7\xE3o: "${u.slice(0,200)}"`)}let s=a.parentElement;if(s){let c=R(s.textContent||"",300);c&&c.length>5&&c!==t&&e.push(`Contexto: "${c.slice(0,200)}"`)}if(a.tagName.toLowerCase()==="svg"){let c=Array.from(a.querySelectorAll("text, tspan")).map(u=>u.textContent?.trim()).filter(Boolean);c.length>0&&e.push(`R\xF3tulos/Textos do Gr\xE1fico: "${c.join(" | ")}"`)}let i=a.getAttribute("data-alt")||a.getAttribute("data-description")||"";return i&&e.push(`Data: "${i}"`),e.length===0?"":e.join(" | ")}async function Ea(a){let e=a.currentSrc||a.src;if(!e)return null;let t=(a.alt||a.getAttribute("aria-label")||"Imagem da quest\xE3o").slice(0,500);if(a.complete&&a.naturalWidth>0)try{let r=await ge(a),s=await re(r);if(s&&s.length<=Ie)return{mediaType:"image/jpeg",base64:s,alt:t,source:e.slice(0,2e3),captureStatus:"captured"}}catch{}try{let r=await fetch(e,{mode:"cors"});if(r.ok){let s=await r.blob();if(s.type.startsWith("image/")){let i=await createImageBitmap(s),c=await ge(i);i.close();let u=await re(c);if(u&&u.length<=Ie)return{mediaType:"image/jpeg",base64:u,alt:t,source:e.slice(0,2e3),captureStatus:"captured"}}}}catch{}if(!e.startsWith("data:"))try{let s=await(await fetch(e,{mode:"no-cors"})).blob();if(s.size>100)try{let i=await createImageBitmap(s),c=await ge(i);i.close();let u=await re(c);if(u&&u.length>100&&u.length<=Ie)return{mediaType:"image/jpeg",base64:u,alt:t,source:e.slice(0,2e3),captureStatus:"captured"}}catch{}}catch{}let o=a.parentElement||a,l=await gt(o);if(l)return l;try{if(a.complete&&a.naturalWidth>0&&typeof HTMLCanvasElement.prototype.captureStream=="function"){let r=document.createElement("canvas");r.width=Math.min(a.naturalWidth,ht),r.height=Math.min(a.naturalHeight,ht);let s=r.getContext("2d");if(s){s.drawImage(a,0,0,r.width,r.height);let i=r.toDataURL("image/jpeg",.88).split(",")[1];if(i&&i.length>100&&i.length<=Ie)return{mediaType:"image/jpeg",base64:i,alt:t,source:e.slice(0,2e3),captureStatus:"captured"}}}}catch{}let n=Ut(a);return n||t?{mediaType:"image/jpeg",base64:"",alt:t,source:e.slice(0,2e3),captureStatus:"text_only",textContext:n||`Imagem sem descri\xE7\xE3o textual dispon\xEDvel (src: ${e.slice(0,100)})`}:null}function qa(a){return a.querySelectorAll("path, line, polyline, polygon, circle, rect, text, image").length>0}function Ca(a){try{let e=a.style.backgroundImage||(window.getComputedStyle?window.getComputedStyle(a).backgroundImage:"");if(e&&e.includes("url(")){let t=e.match(/url\(["']?([^"')]+)["']?\)/);if(t&&t[1]&&!t[1].startsWith("data:image/svg+xml"))return t[1]}}catch{}return null}function Ta(a,e){let t=a.closest('[data-easyquiz-id], button, [role="button"], [role="radio"], [role="checkbox"], [role="option"], label, .option-card, .quiz-option, .choice, .answer, [class*="option" i], [class*="choice" i], [class*="answer" i], li, tr');if(t&&t!==e&&k(t)&&!W(t)&&!B(t)){let n=t.dataset.easyquizId||t.id||void 0,r=R(t.innerText||t.textContent||"",120),s=t.getAttribute("aria-label")||t.getAttribute("title")||"",i=r||s,c=n?` [id: ${n}]`:"";if(i)return{associatedLabel:`Alternativa/Op\xE7\xE3o: "${i}"${c}`,targetControlId:n};if(n)return{associatedLabel:`Alternativa/Op\xE7\xE3o ${c}`,targetControlId:n}}let o=a.closest("figure")?.querySelector("figcaption")?.textContent?.trim();if(o)return{associatedLabel:`Figura do Enunciado: "${R(o,100)}"`};let l=a.closest('[class*="prompt" i], [class*="stimulus" i], [class*="question-text" i], [class*="statement" i], header, h1, h2, h3, h4, p');if(l){let n=R(l.textContent||"",80);if(n)return{associatedLabel:`Gr\xE1fico do Enunciado: "${n}"`}}return{associatedLabel:"Gr\xE1fico/Imagem do Enunciado Principal"}}async function ft(a,e=!0){if(!e)return[];let t=[],o=0,l=35e5,n=(i,c)=>{if(!i)return!1;let u=i.base64?i.base64.length:0;if(u>0&&o+u>l)return!1;let b=Ta(c,a);return i.associatedLabel=b.associatedLabel,i.targetControlId=b.targetControlId,i.element=c,t.push(i),o+=u,t.filter(m=>m.captureStatus==="captured").length>=mt},r=Array.from(a.querySelectorAll("img")).filter(i=>k(i)&&!B(i));for(let i of r)try{let c=i.getBoundingClientRect(),u=i.naturalWidth||c.width||i.width||0,b=i.naturalHeight||c.height||i.height||0,d=i.alt||"";if(!jt(i,d,u,b))continue;let m=await Ea(i);if(n(m,i))return t}catch{}let s=Array.from(a.querySelectorAll("svg")).filter(i=>{if(!k(i)||B(i))return!1;let c=typeof i.getBoundingClientRect=="function"?i.getBoundingClientRect():{width:0,height:0},u=c.width||parseFloat(i.getAttribute("width")||"0"),b=c.height||parseFloat(i.getAttribute("height")||"0");return u<30||b<30?!1:qa(i)});for(let i of s)try{let c=await wa(i),u=await re(c);if(u){let b={mediaType:"image/jpeg",base64:u,alt:i.getAttribute("aria-label")||"Gr\xE1fico/Diagrama vetorial da quest\xE3o",source:"svg",captureStatus:"captured"};if(n(b,i))return t}}catch{let c=await gt(i.parentElement||i);if(c){if(n(c,i))return t}else{let u=Ut(i);if(u){let b={mediaType:"image/jpeg",base64:"",alt:i.getAttribute("aria-label")||"Gr\xE1fico vetorial",source:"svg",captureStatus:"text_only",textContext:u};n(b,i)}}}if(t.filter(i=>i.captureStatus==="captured").length<mt){let i=Array.from(a.querySelectorAll("canvas")).filter(c=>k(c)&&!B(c));for(let c of i)try{let u=await ge(c),b=await re(u);if(b){let d={mediaType:"image/jpeg",base64:b,alt:c.getAttribute("aria-label")||"Gr\xE1fico Canvas inline",source:"canvas",captureStatus:"captured"};if(n(d,c))return t}}catch{let u=await gt(c.parentElement||c);if(n(u,c))return t}}if(t.filter(i=>i.captureStatus==="captured").length<mt){let i=Array.from(a.querySelectorAll('[style*="background-image"], .option-image, .question-media')).filter(c=>k(c)&&!B(c));for(let c of i){let u=Ca(c);if(!u)continue;let b=c.getBoundingClientRect();if(jt(c,c.getAttribute("aria-label")||"",b.width,b.height))try{let d=await fetch(u,{mode:"cors"});if(d.ok){let m=await d.blob();if(m.type.startsWith("image/")){let p=await createImageBitmap(m),f=await ge(p);p.close();let y=await re(f);if(y){let h={mediaType:"image/jpeg",base64:y,alt:"Imagem de fundo da alternativa",source:u.slice(0,2e3),captureStatus:"captured"};if(n(h,c))return t}}}}catch{try{let m=await(await fetch(u,{mode:"no-cors"})).blob();if(m.size>100){let p=await createImageBitmap(m),f=await ge(p);p.close();let y=await re(f);if(y&&y.length>100){let h={mediaType:"image/jpeg",base64:y,alt:"Imagem CSS background",source:u.slice(0,2e3),captureStatus:"captured"};if(n(h,c))return t}}}catch{}}}}return t}function Aa(a,e=""){if(typeof document>"u")return!1;let t=a||document.body,o=(e+" "+(t.textContent||"")).toLowerCase();return!!t.querySelector('.celebration-icon, [class*="celebrat" i], [class*="conclu" i], [class*="finish" i], [class*="result" i], [class*="score-screen" i], [data-testid*="completion" i], [data-functional-selector*="game-over" i], .perseus-message-renderer, [data-congratulations]')&&(o.includes("parab\xE9ns")||o.includes("conclu")||o.includes("finaliz")||o.includes("resultado")||o.includes("pontua")||o.includes("sucesso")||o.includes("\u{1F3C6}")||o.includes("game over")||o.includes("great job"))?!0:["parab\xE9ns! lista de exerc\xEDcios conclu\xEDda","exerc\xEDcios conclu\xEDda","lista de exerc\xEDcios conclu\xEDda","atividade conclu\xEDda","atividade finalizada","finalizado com sucesso","finalizada com sucesso","simulado conclu\xEDdo","simulado finalizado","question\xE1rio conclu\xEDdo","question\xE1rio finalizado","voc\xEA concluiu a atividade","voc\xEA concluiu o question\xE1rio","sua resposta foi registrada","todas as perguntas foram respondidas","quiz completed","exercise completed","activity completed","all questions answered","view results","game over","leaderboard","scoreboard","awesome","great job","you got it right","mission complete","your response has been recorded","sua resposta foi registrada"].some(r=>o.includes(r))}var je=class{active=!1;callbacks;isProcessing=!1;observer=null;mutationTimer=null;heartbeatTimer=null;abortController=null;errorCount=0;resolvedSigs=new Set;lastContentSig="";lastAttemptSig="";lastAttemptTime=0;replanCount=new Map;constructor(e){this.callbacks=e}isActive(){return this.active}start(){this.active||(this.active=!0,this.callbacks.onStatusChange("waiting","> [SYS] Autopilot ENGAGED. Monitorando..."),typeof MutationObserver<"u"&&(this.observer=new MutationObserver(()=>{!this.active||this.isProcessing||(this.mutationTimer&&clearTimeout(this.mutationTimer),this.mutationTimer=window.setTimeout(()=>{this.mutationTimer=null,this.isProcessing||this.checkAndAnalyze()},120))}),this.observer.observe(document.body,{subtree:!0,childList:!0,characterData:!0,attributes:!0})),this.scheduleHeartbeat(),this.checkAndAnalyze())}stop(){if(this.active=!1,this.abortController){try{this.abortController.abort()}catch{}this.abortController=null}this.mutationTimer&&(clearTimeout(this.mutationTimer),this.mutationTimer=null),this.heartbeatTimer&&(clearTimeout(this.heartbeatTimer),this.heartbeatTimer=null),this.observer?.disconnect(),this.observer=null,this.isProcessing=!1,this.resolvedSigs.clear(),this.replanCount.clear(),this.callbacks.onStatusChange("idle","> [SYS] Autopilot DESATIVADO pelo usu\xE1rio.","text-yellow")}scheduleHeartbeat(){this.heartbeatTimer&&clearTimeout(this.heartbeatTimer),this.heartbeatTimer=window.setTimeout(()=>{this.heartbeatTimer=null,this.active&&!this.isProcessing&&this.checkAndAnalyze(),this.active&&this.scheduleHeartbeat()},3e3)}sleep(e){return new Promise(t=>{if(!this.active)return t();let o=null,l=()=>{o&&clearTimeout(o),t()};o=window.setTimeout(t,e),this.abortController?.signal.addEventListener("abort",l,{once:!0})})}async checkAndAnalyze(){if(!(!this.active||this.isProcessing))try{this.isProcessing=!0;let e=ve(!1);if(e||(e=pe()),!this.active)return;if(!e){this.callbacks.onStatusChange("waiting","> [SYS] Monitorando p\xE1gina... Aguardando elementos.");return}if(Aa(e.scope,e.questionText)){this.callbacks.onStatusChange("idle","> [SYS] \u{1F3C6} Atividade conclu\xEDda! Autopilot finalizado.","text-green"),this.stop();return}if(this.callbacks.isManualModeActive?.()){this.callbacks.onStatusChange("waiting","> [SYS] Gabarito manual ativo. Aguardando voc\xEA avan\xE7ar...","text-yellow");return}let t=Ot(e);if(this.resolvedSigs.has(t))return;let o=Date.now();if(t===this.lastAttemptSig&&o-this.lastAttemptTime<1500)return;t!==this.lastContentSig&&this.lastContentSig!==""&&(this.callbacks.onStatusChange("waiting","> [SYS] Nova quest\xE3o detectada! Analisando...","text-green"),this.callbacks.onPageAdvance?.(),this.errorCount=0),this.lastContentSig=t,this.lastAttemptSig=t,this.lastAttemptTime=o;let n=e.controls.filter(s=>s.role==="answer"),r=Ee(window.location.hostname);if(n.length>0){if(this.callbacks.onStatusChange("analyzing","> [IA] Quest\xE3o detectada. Consultando IA...","text-blue"),!this.active)return;this.abortController=new AbortController;let s=await this.callbacks.onRequestAnalysis(1,this.abortController.signal);if(this.abortController=null,!this.active)return;if(s){if(this.callbacks.onStatusChange("analyzing",`> [IA] (${s.usedModel||"gemini"}) Confian\xE7a: ${(s.confidence*100).toFixed(1)}% | Modo: ${s.mode}`,"text-blue"),this.callbacks.onStatusChange("analyzing",`> [IA] Racioc\xEDnio: ${s.rationale}`,"text-blue"),this.callbacks.onStatusChange("analyzing",`> [IA] A\xE7\xF5es: ${s.actions.length}`,"text-blue"),this.errorCount=0,s.memoryToStore&&this.callbacks.onStatusChange("analyzing",`> [IA] \u{1F9E0} Mem\xF3ria RAG: "${s.memoryToStore}"`,"text-yellow"),s.pageType==="conclusion"){this.callbacks.onStatusChange("idle","> [SYS] Atividade conclu\xEDda! Desligando Autopilot.","text-green"),this.stop();return}this.resolvedSigs.add(t)}else{this.errorCount++;let i=this.errorCount===1?5e3:8e3;this.callbacks.onStatusChange("waiting",`> [AVISO] Falha na an\xE1lise (${this.errorCount}). Aguardando ${i/1e3}s...`,"text-yellow"),await this.sleep(i),this.lastAttemptTime=0}}else{if(this.callbacks.onStatusChange("analyzing","> [IA] P\xE1gina sem controles detectados. Consultando IA...","text-blue"),!this.active)return;this.abortController=new AbortController;let s=await this.callbacks.onRequestAnalysis(1,this.abortController.signal);if(this.abortController=null,!this.active)return;if(s){if(this.callbacks.onStatusChange("analyzing",`> [IA] (${s.usedModel||"gemini"}) Tipo: ${s.pageType} | Modo: ${s.mode}`,"text-blue"),this.callbacks.onStatusChange("analyzing",`> [IA] Racioc\xEDnio: ${s.rationale}`,"text-blue"),s.memoryToStore&&this.callbacks.onStatusChange("analyzing",`> [IA] \u{1F9E0} Absorvido: "${s.memoryToStore}"`,"text-yellow"),s.pageType==="conclusion"){this.callbacks.onStatusChange("idle","> [SYS] Atividade conclu\xEDda! Desligando Autopilot.","text-green"),this.stop();return}s.pageType==="info"?(this.callbacks.onStatusChange("advancing","> [IA] \u{1F4D6} Leitura conclu\xEDda. Avan\xE7ando...","text-green"),await this.sleep(100)):s.pageType==="start"&&(this.callbacks.onStatusChange("advancing","> [SYS] In\xEDcio detectado. Iniciando...","text-blue"),await this.sleep(100)),this.errorCount=0,s.actions.length>0&&this.resolvedSigs.add(t)}else{this.errorCount++;let i=this.errorCount===1?5e3:8e3;this.callbacks.onStatusChange("waiting",`> [AVISO] Falha ao processar p\xE1gina (${this.errorCount}). Aguardando ${i/1e3}s...`,"text-yellow"),await this.sleep(i),this.lastAttemptTime=0}}this.errorCount>=5&&(this.callbacks.onStatusChange("waiting","> [AVISO] Muitas falhas. Reiniciando contadores e aguardando 15s...","text-yellow"),this.errorCount=0,this.lastAttemptTime=0,await this.sleep(15e3))}catch(e){if(!this.active)return;let t=e instanceof Error?e.message:String(e);if(t.includes("cancelada")||t.includes("aborted"))return;/timeout|aborted|network|failed to fetch|cancelad/i.test(t)||this.errorCount++,console.warn("[EasyQuiz Autopilot]",e),this.callbacks.onStatusChange("error",`> [ERRO NO AUTOPILOT] ${t}`,"text-red")}finally{this.abortController=null,this.isProcessing=!1,this.active&&window.setTimeout(()=>void this.checkAndAnalyze(),150)}}};var A={logo:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.8L19.2 8 12 11.2 4.8 8 12 4.8zM4 9.6l7 3.1v7.5l-7-3.5V9.6zm9 10.6v-7.5l7-3.1v7.1l-7 3.5z"/></svg>',rocket:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M13.13 2.81a.5.5 0 0 0-.46-.07c-.42.15-2.08.79-3.9 2.61-2.04 2.04-2.6 4.09-2.73 4.96l-.97.98a1 1 0 0 0-.29.71v2.12a1 1 0 0 0 .29.71l2.83 2.83a1 1 0 0 0 .71.29h2.12a1 1 0 0 0 .71-.29l.98-.97c.87-.13 2.92-.69 4.96-2.73 1.82-1.82 2.46-3.48 2.61-3.9a.5.5 0 0 0-.07-.46l-6.79-6.79zM4.5 16.5l-2.09 2.09a.5.5 0 0 0 .35.85h3.04l.35.35v3.04a.5.5 0 0 0 .85.35L9.09 21.1l-4.59-4.6z"/></svg>',play:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>',stop:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h12v12H6z"/></svg>',code:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>',terminal:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8h16v10zm-12-3l3-3-3-3 1.4-1.4L13.8 12l-4.4 4.4L8 15zm6 0h4v2h-4v-2z"/></svg>',inspector:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>',settings:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.49.49 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>',key:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M7 14c-2.76 0-5-2.24-5-5s2.24-5 5-5c2.42 0 4.44 1.72 4.9 4H22v4h-2v3h-3v-3h-2v3h-3v-3h-2.1c-.46 2.28-2.48 4-4.9 4zm0-7c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>',paste:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 2h-4.18C14.4 .84 13.3 0 12 0c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm7 18H5V4h2v3h10V4h2v16z"/></svg>',edit:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>',trash:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>',eraser:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M15.14 3c-.51 0-1.02.2-1.41.59L2.59 14.73c-.78.78-.78 2.05 0 2.83L6.44 21.4c.78.78 2.05.78 2.83 0l11.14-11.14c.78-.78.78-2.05 0-2.83l-3.86-3.84c-.39-.39-.9-.59-1.41-.59zm.71 2.71l3.15 3.15-3.15 3.15-3.15-3.15 3.15-3.15zm-4.57 4.57l3.15 3.15-4.57 4.57H6.71l-3-3 7.57-7.57z"/></svg>',save:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/></svg>',analyze:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L3 14h8l-2 8 12-12h-8l2-8z"/></svg>',apply:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>',close:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>',chevronRight:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>',chevronLeft:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>',eye:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>',eyeOff:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.44-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.17c0-1.66-1.34-3-3-3l-.17.02z"/></svg>',check:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>',clock:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>',copy:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>',refresh:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg>',chip:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4h12v16H6V4zm2 2v12h8V6H8zm-4 3h2v2H4V9zm0 4h2v2H4v-2zm16-4h2v2h-2V9zm0 4h2v2h-2v-2zM9 2h2v2H9V2zm4 0h2v2h-2V2zm-4 18h2v2H9v-2zm4 0h2v2h-2v-2z"/></svg>',moreVertical:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>',minimize:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M19 13H5v-2h14v2z"/></svg>',maximize:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/></svg>',dragHandle:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M10 9h4V6h-4v3zm0 5h4v-3h-4v3zm0 5h4v-3h-4v3zM4 9h4V6H4v3zm0 5h4v-3H4v3zm0 5h4v-3H4v3zm12-10V6h4v3h-4zm0 5h4v-3h-4v3zm0 5h4v-3h-4v3z"/></svg>',list:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/></svg>',folderTree:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6 10H6v-2h8v2zm4-4H6v-2h12v2z"/></svg>',folder:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/></svg>',file:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>',stopwatch:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M15 1H9v2h6V1zm-4 13h2V8h-2v6zm8.03-6.61l1.42-1.42c-.43-.51-.9-.99-1.41-1.41l-1.42 1.42A8.962 8.962 0 0 0 12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9a8.994 8.994 0 0 0 7.03-14.61zM12 20c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"/></svg>',plus:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>',listPlus:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h8v-2H7v2zm0 4h8v-2H7v2zM7 7v2h8V7H7zm11 6h-2v2h-2v2h2v2h2v-2h2v-2h-2v-2z"/></svg>',sparkles:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M9 21l-2.5-5.5L1 13l5.5-2.5L9 5l2.5 5.5L17 13l-5.5 2.5L9 21zm9.5-12.5l-1.5-3.5-3.5-1.5 3.5-1.5 1.5-3.5 1.5 3.5 3.5 1.5-3.5 1.5-1.5 3.5z"/></svg>',image:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>'};var Ue=class{element=null;shadow;isMinimized=!1;currentPlan=null;isDragging=!1;dragStartX=0;dragStartY=0;initialLeft=25;initialTop=25;onAdvanceCallback;constructor(e,t){this.shadow=e,this.onAdvanceCallback=t,this.initGlobalListeners()}initGlobalListeners(){window.addEventListener("popstate",()=>this.handlePageNavigated()),window.addEventListener("hashchange",()=>this.handlePageNavigated()),document.addEventListener("click",e=>{if(!this.isOpen())return;let t=e.target;if(!t||this.shadow.contains(t)||t.closest("#easyquiz-shadow-root"))return;let o=t.closest('button, [role="button"], a, input[type="submit"]');if(o){let l=(o.textContent||o.value||"").toLowerCase();/pr[oó]xim|avan[cç]|continu|verific|enviar|submit|confirm|checar|validar|next/i.test(l)&&setTimeout(()=>{this.isOpen()&&this.handlePageNavigated()},800)}},!0)}handlePageNavigated(){this.isOpen()&&(this.hide(),this.onAdvanceCallback?.())}isOpen(){return this.element!==null&&this.element.style.display!=="none"}show(e){this.currentPlan=e,this.element||this.createElement(),this.renderContent(),this.element&&(this.element.style.display="flex")}hide(){this.element&&(this.element.style.display="none")}minimize(){this.isMinimized=!0,this.element&&this.element.classList.add("minimized")}restore(){this.isMinimized=!1,this.element&&this.element.classList.remove("minimized")}createElement(){this.element=document.createElement("div"),this.element.className="eq-floating-hud",this.element.style.left=`${this.initialLeft}px`,this.element.style.top=`${this.initialTop}px`,this.element.innerHTML=`
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
    `,this.shadow.appendChild(this.element),this.element.querySelector("#eq-fah-pill").addEventListener("click",()=>this.restore()),this.element.querySelector("#eq-fah-min-btn").addEventListener("click",()=>this.minimize()),this.element.querySelector("#eq-fah-close-btn").addEventListener("click",()=>this.hide());let l=this.element.querySelector("#eq-fah-copy-md-btn");l.addEventListener("click",()=>this.copyMarkdownToClipboard(l));let n=this.element.querySelector("#eq-fah-copy-all-btn");n.addEventListener("click",()=>this.copyMarkdownToClipboard(n));let r=this.element.querySelector("#eq-fah-header");this.setupDraggable(r)}setupDraggable(e){let t=o=>{if(o.target.closest(".eq-fah-btn"))return;o.preventDefault(),this.isDragging=!0,this.dragStartX=o.clientX,this.dragStartY=o.clientY;let l=this.element.getBoundingClientRect();this.initialLeft=l.left,this.initialTop=l.top;let n=s=>{if(!this.isDragging||!this.element)return;let i=s.clientX-this.dragStartX,c=s.clientY-this.dragStartY,u=Math.max(10,window.innerWidth-this.element.offsetWidth-10),b=Math.max(10,window.innerHeight-this.element.offsetHeight-10),d=Math.min(Math.max(10,this.initialLeft+i),u),m=Math.min(Math.max(10,this.initialTop+c),b);this.element.style.left=`${d}px`,this.element.style.top=`${m}px`},r=()=>{this.isDragging=!1,window.removeEventListener("mousemove",n),window.removeEventListener("mouseup",r)};window.addEventListener("mousemove",n),window.addEventListener("mouseup",r)};e.addEventListener("mousedown",t)}renderContent(){if(!this.element||!this.currentPlan)return;let e=this.element.querySelector("#eq-fah-body"),t=this.element.querySelector("#eq-fah-pill-text"),o=this.element.querySelector("#eq-fah-pill-badge");e.innerHTML="";let l=this.currentPlan,n=l.actions.filter(m=>m.t==="drag"),r=l.actions.filter(m=>{if(m.t!=="val")return!1;let p=q(m.id||"").toLowerCase();return!/continu|avan[cç]|pr[oó]xim|submet|enviar|check|verific/i.test(p)}),s=l.actions.filter(m=>m.t==="clk"||m.t==="chk"),i=l.actions.filter(m=>m.t==="sel"),c=n.length||r.length||s.length||i.length,u=document.createElement("div");u.className="eq-fah-meta";let b=document.createElement("span");b.textContent=`Modo: ${l.mode.replace("_"," ")}`;let d=document.createElement("span");if(d.className="eq-fah-meta-badge",d.textContent=`${Math.round(l.confidence*100)}% Confian\xE7a`,u.append(b,d),e.appendChild(u),n.length>0||l.mode==="categorizacao"||l.mode==="arrastar_soltar"){t.textContent=`Categoriza\xE7\xE3o (${n.length} itens)`,o.textContent=String(n.length);let m={};for(let p of n){let f=q(p.to)||"Geral";m[f]||(m[f]=[]),m[f].push(q(p.from))}for(let[p,f]of Object.entries(m)){let y=document.createElement("div"),h=/fato|true|verdadeiro|sim/i.test(p),g=/opini[aã]o|false|falso|n[aã]o/i.test(p);y.className=`eq-fah-group ${h?"group-fato":g?"group-opiniao":""}`;let v=document.createElement("div");v.className="eq-fah-group-title",v.textContent=`\u{1F4C1} ${p} (${f.length})`,y.appendChild(v);let w=document.createElement("div");w.className="eq-fah-group-items";for(let C of f){let L=document.createElement("div");L.className="eq-fah-item";let S=document.createElement("span");S.className="eq-fah-item-text",S.textContent=C,L.appendChild(S);let x=document.createElement("button");x.className="eq-fah-copy-inline",x.textContent="Copiar",x.addEventListener("click",()=>{navigator.clipboard.writeText(C),x.textContent="\u2713 Copiado",setTimeout(()=>x.textContent="Copiar",1200)}),L.appendChild(x),w.appendChild(L)}y.appendChild(w),e.appendChild(y)}}else if(r.length>0){t.textContent=`Preenchimento (${r.length} campos)`,o.textContent=String(r.length);let m=document.createElement("div");m.className="eq-fah-group";let p=document.createElement("div");p.className="eq-fah-group-title",p.textContent="\u{1F4DD} Respostas para os Campos de Texto:",m.appendChild(p);let f=document.createElement("div");f.className="eq-fah-group-items";for(let y=0;y<r.length;y++){let h=r[y],g=document.createElement("div");g.className="eq-fah-item";let v=ke(h.id);(!v||/^[#\.\$]|input|mat-|cell|field|q[0-9]|eq-/i.test(v))&&(v=`Campo ${y+1}`);let w=String(h.v??""),C=document.createElement("div");C.className="eq-fah-field-box";let L=document.createElement("div");L.className="eq-fah-field-label",L.textContent=v,C.appendChild(L);let S=document.createElement("div");S.className="eq-fah-field-val",S.textContent=w,C.appendChild(S),g.appendChild(C);let x=document.createElement("button");x.className="eq-fah-copy-inline",x.textContent="Copiar",x.addEventListener("click",()=>{navigator.clipboard.writeText(w),x.textContent="\u2713 Copiado",setTimeout(()=>x.textContent="Copiar",1200)}),g.appendChild(x),f.appendChild(g)}m.appendChild(f),e.appendChild(m)}else if(s.length>0){t.textContent=`Op\xE7\xF5es (${s.length} marcadas)`,o.textContent=String(s.length);let m=document.createElement("div");m.className="eq-fah-group";let p=document.createElement("div");p.className="eq-fah-group-title",p.textContent="\u{1F3AF} Alternativa(s) Correta(s):",m.appendChild(p);let f=document.createElement("div");f.className="eq-fah-group-items";for(let y=0;y<s.length;y++){let h=s[y],g=document.createElement("div");g.className="eq-fah-item";let v=ke(h.id);(!v||/^(eq-|#|\$|\.|input_|mat-|choice_|radio_|chk_)/i.test(v))&&h.v&&(v=String(h.v)),v=q(v),/^(eq-|#|\$|\.|input_|mat-|choice_|radio_|chk_)/i.test(v)&&(v="");let w="",C=v.match(/^(\([A-Za-z0-9]\)|[A-Za-z0-9][\)\.\:\-])\s*(.*)$/);C?(w=C[1].replace(/[\(\)\.\:\-\s]/g,"").toUpperCase(),v=C[2].trim()||v):s.length>1&&(w=String.fromCharCode(65+y));let L=document.createElement("div");if(L.style.display="flex",L.style.alignItems="center",L.style.gap="8px",L.style.flex="1",w){let T=document.createElement("span");T.className="eq-fah-letter-badge",T.textContent=w,L.appendChild(T)}let S=document.createElement("span");S.className="eq-fah-item-text",S.textContent=v||(w?`Alternativa ${w}`:"Alternativa Selecionada"),L.appendChild(S),g.appendChild(L);let x=document.createElement("button");x.className="eq-fah-copy-inline",x.textContent="Copiar",x.addEventListener("click",()=>{navigator.clipboard.writeText(v||w),x.textContent="\u2713 Copiado",setTimeout(()=>x.textContent="Copiar",1200)}),g.appendChild(x),f.appendChild(g)}m.appendChild(f),e.appendChild(m)}else if(i.length>0){t.textContent=`Sele\xE7\xE3o (${i.length} listas)`,o.textContent=String(i.length);let m=document.createElement("div");m.className="eq-fah-group";let p=document.createElement("div");p.className="eq-fah-group-title",p.textContent="\u{1F4CB} Op\xE7\xF5es para Selecionar na Lista:",m.appendChild(p);let f=document.createElement("div");f.className="eq-fah-group-items";for(let y=0;y<i.length;y++){let h=i[y],g=document.createElement("div");g.className="eq-fah-item";let v=ke(h.id);(!v||/^[#\.\$]|select|input|mat-|cell|field|q[0-9]|eq-/i.test(v))&&(v=`Lista ${y+1}`);let L=(Array.isArray(h.v)?h.v:[String(h.v??"")]).map($=>{let E=I(h.id,void 0,!0)||I(q(h.id),void 0,!0),H=E instanceof HTMLSelectElement?E:E?.querySelector("select");if(H){let V=q($).toLowerCase();for(let _=0;_<H.options.length;_++){let O=H.options[_];if(O.value.toLowerCase()===V||q(O.textContent).toLowerCase()===V){let N=q(O.textContent);if(N&&!N.toLowerCase().includes("selecione"))return N}}}return $}).join(", "),S=document.createElement("div");S.className="eq-fah-field-box";let x=document.createElement("div");x.className="eq-fah-field-label",x.textContent=v,S.appendChild(x);let T=document.createElement("div");T.className="eq-fah-field-val",T.textContent=L,S.appendChild(T),g.appendChild(S);let M=document.createElement("button");M.className="eq-fah-copy-inline",M.textContent="Copiar",M.addEventListener("click",()=>{navigator.clipboard.writeText(L),M.textContent="\u2713 Copiado",setTimeout(()=>M.textContent="Copiar",1200)}),g.appendChild(M),f.appendChild(g)}m.appendChild(f),e.appendChild(m)}else{t.textContent="Gabarito",o.textContent="0";let m=document.createElement("div");m.style.padding="10px",m.style.color="#888",m.textContent="Nenhuma resposta direta para exibir.",e.appendChild(m)}if(l.rationale){let m=document.createElement("div");m.className="eq-fah-rationale",m.textContent=`\u{1F4A1} Racioc\xEDnio da IA: ${l.rationale}`,e.appendChild(m)}}generateMarkdown(){if(!this.currentPlan)return"";let e=this.currentPlan,t=[];t.push("# Gabarito da Quest\xE3o \u2014 EasyQuiz Pro"),t.push(`- **Modo:** ${e.mode}`),t.push(`- **Confian\xE7a:** ${(e.confidence*100).toFixed(0)}%`),t.push("");let o=e.actions.filter(s=>s.t==="drag"),l=e.actions.filter(s=>s.t==="val"),n=e.actions.filter(s=>s.t==="clk"||s.t==="chk"),r=e.actions.filter(s=>s.t==="sel");if(o.length>0){t.push("## \u{1F4C2} Categoriza\xE7\xE3o:");let s={};for(let i of o){let c=q(i.to)||"Geral";s[c]||(s[c]=[]),s[c].push(q(i.from))}for(let[i,c]of Object.entries(s)){t.push(`### Categoria: ${i}`);for(let u of c)t.push(`- ${u}`);t.push("")}}else if(l.length>0){t.push("## \u270F\uFE0F Respostas para Preenchimento:");for(let s of l){let i=q(s.id);t.push(`- **${i||"Campo"}:** \`${s.v}\``)}t.push("")}else if(n.length>0){t.push("## \u2705 Alternativas Corretas:");for(let s=0;s<n.length;s++){let i=n[s],c=ke(i.id);(!c||/^(eq-|#|\$|\.|input_|mat-|choice_|radio_|chk_)/i.test(c))&&i.v&&(c=String(i.v)),c=q(c),/^(eq-|#|\$|\.|input_|mat-|choice_|radio_|chk_)/i.test(c)&&(c="");let u=n.length>1?`${String.fromCharCode(65+s)}) `:"";t.push(`- [x] ${u}${c||"Alternativa "+String.fromCharCode(65+s)}`)}t.push("")}else if(r.length>0){t.push("## \u{1F4CB} Op\xE7\xF5es Selecionadas em Lista:");for(let s of r){let i=q(s.id)||"Lista",c=Array.isArray(s.v)?s.v.join(", "):String(s.v??"");t.push(`- **${i}:** \`${c}\``)}t.push("")}return e.rationale&&(t.push("---"),t.push(`**\u{1F4A1} Racioc\xEDnio:** ${e.rationale}`)),t.join(`
`)}copyMarkdownToClipboard(e){let t=this.generateMarkdown();t&&navigator.clipboard.writeText(t).then(()=>{let o=e.innerHTML;e.id==="eq-fah-copy-md-btn"?e.innerHTML='<span style="font-size:10px; color:#00ffcc; font-weight:bold;">\u2713</span>':e.innerHTML="\u2713 Copiado!",setTimeout(()=>{e.innerHTML=o},1500)})}};var Ft=`
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
`;var Gt=(()=>{try{if(typeof window.trustedTypes?.createPolicy=="function")return window.trustedTypes.createPolicy("easyquiz-ui#html",{createHTML:a=>a})}catch{}return null})();function Sa(a,e){try{if(Gt){a.innerHTML=Gt.createHTML(e);return}}catch{}try{if(typeof a.setHTMLUnsafe=="function"){a.setHTMLUnsafe(e);return}}catch{}a.innerHTML=e}var La=[{value:"",label:"Detec\xE7\xE3o Autom\xE1tica"},{value:"escolha_unica",label:"M\xFAltipla Escolha (\xDAnica)"},{value:"escolha_multipla",label:"M\xFAltipla Escolha (V\xE1rias)"},{value:"categorizacao",label:"Categoriza\xE7\xE3o / Grupos"},{value:"arrastar_soltar",label:"Arrastar e Soltar (Drag & Drop)"},{value:"ordenacao",label:"Ordena\xE7\xE3o / Sequ\xEAncia"},{value:"verdadeiro_falso",label:"Verdadeiro / Falso"},{value:"texto_livre",label:"Texto Livre / Dissertativa"},{value:"preenchimento",label:"Preenchimento de Lacunas"}],ka=[{value:"smart",label:"Inteligente (Auto-H\xEDbrido)"},{value:"command",label:"Apenas Comando (Seguro)"},{value:"javascript",label:"Apenas JS Nativo (Avan\xE7ado)"}],Fe=class{host;shadow;callbacks;autopilot;floatingAnswers;initialSettings;isCollapsed=!1;activeTab="resolver";isBusy=!1;stopwatchInterval=null;stopwatchStartTime=0;latestPlan=null;latestContext=null;latestImages=[];latestImageDescriptions=[];latestPromptText="";metricsLiveTime;metricsLiveStatus;metricsTotalBadge;metricTotalTime;metricAvgTime;metricTotalCount;metricsHistoryList;metricsHistoryCount;metricsCopyBtn;metricsResetBtn;currentQuestionStartTime=0;questionLiveTimerInterval=null;liveDebugTerminal;dbgModel;dbgLatency;dbgSplitTokens;dbgTotalTokens;dbgErrorCard;dbgErrorText;dbgPromptLen;dbgPromptView;dbgContextView;dbgRawRespView;dbgCountAll;dbgCountError;dbgCountAi;dbgCountDom;logEntries=[];activeLogFilter="all";autoScrollLogs=!0;lastErrorMsg=null;_autopilotAnalyzingShown=!1;progressContainer;progressBar;progressLabel;progressVal;contextTreeContainer;launcherBtn;launcherDot;dockToggleBtn;sidebarEl;apToggleBtn;apConsole;executionConsole;dotPulseAp;statusTextAp;stopwatchAp;dotPulseAdv;statusTextAdv;stopwatchAdv;inspModel;inspLatency;inspTokens;inspPrompt;inspRationale;inspActions;copyPromptBtn;apiKeyInput;keyContextMenu;keyMoreBtn;keysListEl;keysBadgeEl;modelSelect;modeSelect;engineSelect;dryRunCheckbox;autoApplyCheckbox;autoAdvanceCheckbox;hostDarkModeCheckbox;useVisionCheckbox;analyzeBtn;applyBtn;resultContainer;constructor(e,t){this.initialSettings=e,this.callbacks=t,this.autopilot=new je({onStatusChange:(s,i,c)=>{this.logToConsole(i,c),s==="analyzing"?this._autopilotAnalyzingShown||(this._autopilotAnalyzingShown=!0,this.setBusy(!0,"Autopilot: IA analisando...")):s==="advancing"||s==="waiting"?(this._autopilotAnalyzingShown=!1,this.setBusy(!1),this.updateAutopilotUi(!0)):s==="idle"?(this._autopilotAnalyzingShown=!1,this.setBusy(!1),this.updateAutopilotUi(!1),i.includes("conclus\xE3o")||i.includes("finalizada")||i.includes("Parab\xE9ns")?this.setStatus("Atividade conclu\xEDda com sucesso! Autopilot finalizado.","success"):this.setStatus("Autopilot desativado.","info")):s==="error"&&(this._autopilotAnalyzingShown=!1,this.setBusy(!1),this.updateAutopilotUi(!1),this.setStatus("Autopilot interrompido por erro.","error"))},onRequestAnalysis:async(s,i)=>{try{return await this.callbacks.onAnalyze(s,i,!0)||null}catch{return null}},isManualModeActive:()=>this.floatingAnswers?.isOpen()??!1,onPageAdvance:()=>{this.floatingAnswers?.hide()}}),this.host=document.createElement("div"),this.host.id="easyquiz-shadow-root",this.host.style.position="fixed",this.host.style.top="0",this.host.style.left="0",this.host.style.width="100vw",this.host.style.height="100vh",this.host.style.zIndex="2147483647",this.host.style.pointerEvents="none",this.shadow=this.host.attachShadow({mode:"open"}),Sa(this.shadow,`
      <style>${Ft}</style>

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
    `),this.launcherBtn=this.shadow.querySelector(".eq-launcher"),this.launcherDot=this.shadow.querySelector("#eq-launcher-dot"),this.dockToggleBtn=this.shadow.querySelector("#eq-dock-toggle"),this.sidebarEl=this.shadow.querySelector(".eq-sidebar"),this.apToggleBtn=this.shadow.querySelector("#eq-ap-toggle-btn"),this.apConsole=this.shadow.querySelector("#eq-ap-console"),this.executionConsole=this.shadow.querySelector("#eq-execution-console"),this.progressContainer=this.shadow.querySelector("#eq-progress-container"),this.progressBar=this.shadow.querySelector("#eq-progress-bar"),this.progressLabel=this.shadow.querySelector("#eq-progress-label"),this.progressVal=this.shadow.querySelector("#eq-progress-val"),this.contextTreeContainer=this.shadow.querySelector("#eq-tree-container"),this.dotPulseAp=this.shadow.querySelector("#eq-dot-ap"),this.statusTextAp=this.shadow.querySelector("#eq-status-text-ap"),this.stopwatchAp=this.shadow.querySelector("#eq-stopwatch-ap span"),this.dotPulseAdv=this.dotPulseAp,this.statusTextAdv=this.statusTextAp,this.stopwatchAdv=this.stopwatchAp,this.inspModel=this.shadow.querySelector("#eq-insp-model"),this.inspLatency=this.shadow.querySelector("#eq-insp-latency"),this.inspTokens=this.shadow.querySelector("#eq-insp-tokens"),this.inspPrompt=this.shadow.querySelector("#eq-insp-prompt"),this.inspRationale=this.shadow.querySelector("#eq-insp-rationale"),this.inspActions=this.shadow.querySelector("#eq-insp-actions"),this.copyPromptBtn=this.shadow.querySelector("#eq-copy-prompt-btn"),this.liveDebugTerminal=this.shadow.querySelector("#eq-live-debug-terminal"),this.dbgModel=this.shadow.querySelector("#eq-dbg-model"),this.dbgLatency=this.shadow.querySelector("#eq-dbg-latency"),this.dbgSplitTokens=this.shadow.querySelector("#eq-dbg-split-tokens"),this.dbgTotalTokens=this.shadow.querySelector("#eq-dbg-total-tokens"),this.dbgErrorCard=this.shadow.querySelector("#eq-dbg-error-card"),this.dbgErrorText=this.shadow.querySelector("#eq-dbg-error-text"),this.dbgPromptLen=this.shadow.querySelector("#eq-dbg-prompt-len"),this.dbgPromptView=this.shadow.querySelector("#eq-dbg-prompt-view"),this.dbgContextView=this.shadow.querySelector("#eq-dbg-context-view"),this.dbgRawRespView=this.shadow.querySelector("#eq-dbg-raw-resp-view"),this.dbgCountAll=this.shadow.querySelector("#eq-dbg-count-all"),this.dbgCountError=this.shadow.querySelector("#eq-dbg-count-error"),this.dbgCountAi=this.shadow.querySelector("#eq-dbg-count-ai"),this.dbgCountDom=this.shadow.querySelector("#eq-dbg-count-dom"),this.apiKeyInput=this.shadow.querySelector("#eq-api-key"),this.keyContextMenu=this.shadow.querySelector("#eq-key-context-menu"),this.keyMoreBtn=this.shadow.querySelector("#eq-key-more-btn"),this.keysListEl=this.shadow.querySelector("#eq-keys-list"),this.keysBadgeEl=this.shadow.querySelector("#eq-keys-badge"),this.modelSelect=this.shadow.querySelector("#eq-model-select"),this.modeSelect=this.shadow.querySelector("#eq-mode-select"),this.engineSelect=this.shadow.querySelector("#eq-engine-select"),this.dryRunCheckbox=this.shadow.querySelector("#eq-dry-run"),this.autoApplyCheckbox=this.shadow.querySelector("#eq-auto-apply"),this.autoAdvanceCheckbox=this.shadow.querySelector("#eq-auto-advance"),this.hostDarkModeCheckbox=this.shadow.querySelector("#eq-host-dark"),this.useVisionCheckbox=this.shadow.querySelector("#eq-use-vision"),this.analyzeBtn=this.shadow.querySelector("#eq-analyze-btn"),this.applyBtn=this.shadow.querySelector("#eq-apply-btn"),this.applyBtn.disabled=!0,this.resultContainer=this.shadow.querySelector("#eq-result"),this.floatingAnswers=new Ue(this.shadow,()=>{this.callbacks.onAnalyze(1)});let o=this.shadow.querySelector("#eq-open-hud-btn");o&&o.addEventListener("click",()=>{this.latestPlan&&this.floatingAnswers.show(this.latestPlan)}),fe.filter(s=>Q(s.id)).forEach(s=>this.modelSelect.add(new Option(s.name,s.id,!1,s.id===e.model))),La.forEach(s=>this.modeSelect.add(new Option(s.label,s.value,!1,s.value===e.modeHint))),ka.forEach(s=>this.engineSelect.add(new Option(s.label,s.value,!1,s.value===e.engine))),this.apiKeyInput.value=e.apiKey,this.dryRunCheckbox.checked=e.dryRun,this.autoApplyCheckbox.checked=e.autoApply,this.autoAdvanceCheckbox.checked=e.autoAdvance,this.hostDarkModeCheckbox.checked=e.hostDarkMode,this.useVisionCheckbox.checked=e.useVision,this.metricsLiveTime=this.shadow.querySelector("#eq-metrics-live-time"),this.metricsLiveStatus=this.shadow.querySelector("#eq-metrics-live-status"),this.metricsTotalBadge=this.shadow.querySelector("#eq-metrics-total-badge"),this.metricTotalTime=this.shadow.querySelector("#eq-metric-total-time"),this.metricAvgTime=this.shadow.querySelector("#eq-metric-avg-time"),this.metricTotalCount=this.shadow.querySelector("#eq-metric-total-count"),this.metricsHistoryList=this.shadow.querySelector("#eq-metrics-history-list"),this.metricsHistoryCount=this.shadow.querySelector("#eq-metrics-history-count"),this.metricsCopyBtn=this.shadow.querySelector("#eq-metrics-copy-btn"),this.metricsResetBtn=this.shadow.querySelector("#eq-metrics-reset-btn"),this.setupEventListeners(),this.updateTimingMetrics(),this.mountHost(),this.applyHostDarkMode(e.hostDarkMode);let l=Array.isArray(e.apiKeys)&&e.apiKeys.length>0?e.apiKeys:e.apiKey?[e.apiKey]:[];z.init(l),this.renderKeysList();let n=window.setInterval(()=>{this.activeTab==="settings"&&this.renderKeysList()},1e3);typeof n?.unref=="function"&&n.unref();let r=z.getBestKey()||e.apiKey;r&&ze(r).then(s=>{s&&s.length>0&&this.updateModelSelect(s,e.model)}).catch(()=>{})}switchTab(e){this.activeTab=e;let t=["resolver","brain","media","metrics","debug","settings"];for(let o of t){let l=this.shadow.querySelector(`#eq-tab-${o}`),n=this.shadow.querySelector(`#eq-view-${o}`);o===e?(l?.classList.add("active"),n&&(n.style.display="flex")):(l?.classList.remove("active"),n&&(n.style.display="none"))}e==="brain"?(this.renderContextTree(),this.refreshInspectorView()):e==="media"?this.renderMediaTab():e==="metrics"?this.updateTimingMetrics():e==="debug"&&(this.refreshDebugView(),this.renderTerminalEntries())}setupEventListeners(){this.shadow.querySelector("#eq-tab-resolver")?.addEventListener("click",()=>this.switchTab("resolver")),this.shadow.querySelector("#eq-tab-brain")?.addEventListener("click",()=>this.switchTab("brain")),this.shadow.querySelector("#eq-tab-media")?.addEventListener("click",()=>this.switchTab("media")),this.shadow.querySelector("#eq-tab-metrics")?.addEventListener("click",()=>this.switchTab("metrics")),this.shadow.querySelector("#eq-tab-debug")?.addEventListener("click",()=>this.switchTab("debug")),this.shadow.querySelector("#eq-tab-settings")?.addEventListener("click",()=>this.switchTab("settings")),this.metricsResetBtn?.addEventListener("click",()=>{Ce(),this.stopQuestionTimer(0),this.currentQuestionStartTime=0,this.metricsLiveTime&&(this.metricsLiveTime.textContent="00:00.00"),this.metricsLiveStatus&&(this.metricsLiveStatus.textContent="Em espera",this.metricsLiveStatus.classList.remove("active")),this.updateTimingMetrics(),this.logToConsole("> [SYS] M\xE9tricas e hist\xF3rico de tempo zerados com sucesso.","text-yellow")}),this.metricsCopyBtn?.addEventListener("click",()=>{this.copyMetricsReport()}),this.shadow.querySelector("#eq-dbg-filter-all")?.addEventListener("click",()=>this.setLogFilter("all")),this.shadow.querySelector("#eq-dbg-filter-error")?.addEventListener("click",()=>this.setLogFilter("error")),this.shadow.querySelector("#eq-dbg-filter-ai")?.addEventListener("click",()=>this.setLogFilter("ai")),this.shadow.querySelector("#eq-dbg-filter-dom")?.addEventListener("click",()=>this.setLogFilter("dom"));let e=this.shadow.querySelector("#eq-dbg-scroll-toggle");e?.addEventListener("click",()=>{this.autoScrollLogs=!this.autoScrollLogs,e&&(e.style.color=this.autoScrollLogs?"#00ffcc":"#858585",e.title=this.autoScrollLogs?"Auto-Scroll Ligado (Clique para desligar)":"Auto-Scroll Desligado (Clique para ligar)"),this.autoScrollLogs&&this.liveDebugTerminal&&(this.liveDebugTerminal.scrollTop=this.liveDebugTerminal.scrollHeight)});let t=this.shadow.querySelector("#eq-dbg-copy-logs");t?.addEventListener("click",()=>{let h=this.getFormattedLogs();navigator.clipboard.writeText(h).then(()=>{let g=t.innerHTML;t.innerHTML=A.check,setTimeout(()=>t.innerHTML=g,1800)})}),this.shadow.querySelector("#eq-dbg-clear-logs")?.addEventListener("click",()=>{this.clearLogs()});let o=this.shadow.querySelector("#eq-dbg-copy-prompt");o?.addEventListener("click",()=>{let h=this.latestPromptText||this.latestPlan?.promptSent||"";navigator.clipboard.writeText(h).then(()=>{let g=o.innerHTML;o.innerHTML=`${A.check} Copiado!`,setTimeout(()=>o.innerHTML=g,1800)})});let l=this.shadow.querySelector("#eq-dbg-copy-context");l?.addEventListener("click",()=>{let h=this.dbgContextView?.textContent||"";navigator.clipboard.writeText(h).then(()=>{let g=l.innerHTML;l.innerHTML=`${A.check} Copiado!`,setTimeout(()=>l.innerHTML=g,1800)})});let n=this.shadow.querySelector("#eq-dbg-copy-raw-resp");n?.addEventListener("click",()=>{let h=this.latestPlan?.rawResponse||this.dbgRawRespView?.textContent||"";navigator.clipboard.writeText(h).then(()=>{let g=n.innerHTML;n.innerHTML=`${A.check} Copiado!`,setTimeout(()=>n.innerHTML=g,1800)})});let r=this.shadow.querySelector("#eq-dbg-copy-error-btn");r?.addEventListener("click",()=>{let h=this.lastErrorMsg||"";navigator.clipboard.writeText(h).then(()=>{let g=r.innerHTML;r.innerHTML=A.check,setTimeout(()=>r.innerHTML=g,1800)})}),this.shadow.querySelector("#eq-refresh-context-btn")?.addEventListener("click",()=>{this.renderContextTree()}),this.launcherBtn.addEventListener("click",()=>this.toggle()),this.dockToggleBtn.addEventListener("click",()=>this.toggle()),this.shadow.querySelector("#eq-min-btn")?.addEventListener("click",()=>this.toggle(!1)),this.shadow.querySelector("#eq-close-btn")?.addEventListener("click",()=>this.toggle(!1)),window.addEventListener("keydown",h=>{h.altKey&&(h.key==="q"||h.key==="Q")&&(h.preventDefault(),this.toggle())},!0);let s=h=>{let g=h.composedPath();g.includes(this.shadow)||(g.includes(this.sidebarEl)||g.includes(this.host))&&h.stopImmediatePropagation()};window.addEventListener("keydown",s,!0),window.addEventListener("keyup",s,!0),window.addEventListener("keypress",s,!0),this.apiKeyInput.addEventListener("input",()=>{let h=this.apiKeyInput.value.trim().replace(/^["']|["']$/g,"");this.callbacks.onSettingsChange({apiKey:h})});let i=this.shadow.querySelector("#eq-keys-collapsible"),c=this.shadow.querySelector("#eq-keys-chevron"),u=this.shadow.querySelector("#eq-keys-section-header"),b=h=>{i&&(h?(i.style.display="none",c&&(c.style.transform="rotate(0deg)")):(i.style.display="block",i.style.maxHeight="none",i.style.overflow="visible",c&&(c.style.transform="rotate(90deg)")))},d=!1;try{d=localStorage.getItem("easyquiz_keys_collapsed")==="true"}catch{}b(d),u?.addEventListener("click",h=>{if(h.target?.closest("a"))return;let g=i?.style.display==="none";b(!g);try{localStorage.setItem("easyquiz_keys_collapsed",g?"false":"true")}catch{}}),this.shadow.querySelector("#eq-key-save").addEventListener("click",()=>{let h=this.apiKeyInput.value.trim().replace(/^["']|["']$/g,"");if(!h){this.setStatus("Insira o valor da chave antes de adicionar.","warning");return}let g=z.addKey(h);if(g.ok){let v=z.exportRawKeys();this.callbacks.onSettingsChange({apiKey:v[0],apiKeys:v}),this.apiKeyInput.value="",this.setStatus(`\u2713 Nova chave adicionada com sucesso! (${v.length} chaves ativas no pool)`,"success"),b(!1);try{localStorage.setItem("easyquiz_keys_collapsed","false")}catch{}this.renderKeysList(),this.keyContextMenu.hidden=!0,Pe(h).then(w=>{w.ok?(z.markSuccess(h,100),this.setStatus("\u2713 Nova chave validada com sucesso no Google AI Studio!","success")):(z.markInvalid(h,w.message),this.setStatus(`\u26A0\uFE0F Chave cadastrada, mas aviso retornado: ${w.message}`,"warning")),this.renderKeysList()}).catch(()=>{})}else this.setStatus(g.message,"warning")}),this.keyMoreBtn.addEventListener("click",h=>{h.stopPropagation(),this.keyContextMenu.hidden=!this.keyContextMenu.hidden}),this.shadow.addEventListener("click",h=>{let g=h.target;!g.closest("#eq-key-context-menu")&&!g.closest("#eq-key-more-btn")&&(this.keyContextMenu.hidden=!0)}),this.shadow.querySelector("#eq-menu-prompt")?.addEventListener("click",()=>{this.keyContextMenu.hidden=!0;let h=window.prompt("Adicionar Nova Chave API do Google Gemini (AI Studio):");if(h!==null&&h.trim()){let g=h.trim().replace(/^["']|["']$/g,""),v=z.addKey(g);if(v.ok){let w=z.exportRawKeys();this.callbacks.onSettingsChange({apiKey:w[0],apiKeys:w}),this.setStatus("Chave Gemini adicionada com sucesso!","success"),this.renderKeysList()}else this.setStatus(v.message,"warning")}}),this.shadow.querySelector("#eq-menu-paste")?.addEventListener("click",async()=>{this.keyContextMenu.hidden=!0;try{let h=await navigator.clipboard.readText();if(h){let g=h.trim().replace(/^["']|["']$/g,"");this.apiKeyInput.value=g,this.setStatus('Chave colada no campo. Clique no bot\xE3o "+" para adicionar ao pool.',"info")}}catch{let h=window.prompt("Adicionar Nova Chave API do Google Gemini:");if(h!==null&&h.trim()){let g=h.trim().replace(/^["']|["']$/g,"");if(z.addKey(g).ok){let w=z.exportRawKeys();this.callbacks.onSettingsChange({apiKey:w[0],apiKeys:w}),this.setStatus("Chave Gemini adicionada com sucesso!","success"),this.renderKeysList()}}}}),this.shadow.querySelector("#eq-menu-toggle-vis")?.addEventListener("click",()=>{this.keyContextMenu.hidden=!0;let h=this.apiKeyInput.type==="password";this.apiKeyInput.type=h?"text":"password";let g=this.shadow.querySelector("#eq-menu-vis-icon"),v=this.shadow.querySelector("#eq-menu-vis-text");g&&(g.innerHTML=h?A.eyeOff:A.eye),v&&(v.textContent=h?"Ocultar Campo":"Mostrar Campo")}),this.shadow.querySelector("#eq-menu-clear")?.addEventListener("click",()=>{this.keyContextMenu.hidden=!0,this.apiKeyInput.value="",this.setStatus("Campo de inser\xE7\xE3o limpo.","info"),this.apiKeyInput.focus()}),this.shadow.querySelector("#eq-menu-bulk")?.addEventListener("click",()=>{this.keyContextMenu.hidden=!0,this.shadow.querySelector("#eq-bulk-overlay")?.remove();let h=document.createElement("div");h.id="eq-bulk-overlay",h.style.cssText=["position:fixed","inset:0","z-index:2147483647","pointer-events:auto","background:rgba(0,0,0,0.78)","backdrop-filter:blur(4px)","-webkit-backdrop-filter:blur(4px)","display:flex","align-items:center","justify-content:center",'font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif',"user-select:text","-webkit-user-select:text"].join(";");let g=document.createElement("div");g.style.cssText=["background:#11151c","color:#e2e8f0","border:1px solid #283548","border-radius:12px","padding:20px","width:440px","max-width:92vw","font-size:13px","box-shadow:0 12px 40px rgba(0,0,0,0.85), 0 0 0 1px rgba(0,229,255,0.15)","display:flex","flex-direction:column","gap:10px","pointer-events:auto"].join(";"),g.innerHTML=`
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
      `,h.appendChild(g),this.shadow.appendChild(h);let v=g.querySelector("#eq-bulk-ta"),w=g.querySelector("#eq-bulk-status"),C=g.querySelector("#eq-bulk-import"),L=g.querySelector("#eq-bulk-paste-btn"),S=g.querySelector("#eq-bulk-clear-btn");requestAnimationFrame(()=>v?.focus());let x=()=>{h.remove()};["keydown","keyup","keypress","paste","copy","cut"].forEach(T=>{h.addEventListener(T,M=>{M.stopPropagation(),M.stopImmediatePropagation()},!0)}),h.addEventListener("keydown",T=>{T.key==="Escape"&&x()}),h.addEventListener("click",T=>{T.target===h&&x()}),g.querySelector("#eq-bulk-x")?.addEventListener("click",x),g.querySelector("#eq-bulk-cancel")?.addEventListener("click",x),S.addEventListener("click",()=>{v.value="",w.textContent="",v.focus()}),L.addEventListener("click",async()=>{try{let T=await navigator.clipboard?.readText();T?(v.value=T,v.focus(),w.style.color="#38bdf8",w.textContent="Conte\xFAdo colado da \xE1rea de transfer\xEAncia com sucesso!"):(w.style.color="#fbbf24",w.textContent="\xC1rea de transfer\xEAncia vazia ou sem permiss\xE3o de leitura.")}catch{w.style.color="#fbbf24",w.textContent="Permiss\xE3o de clipboard negada pelo navegador. Use Ctrl+V diretamente na caixa.",v.focus()}}),g.querySelector("#eq-bulk-import")?.addEventListener("click",async()=>{let T=v.value.trim();if(!T){w.style.color="#f87171",w.textContent="Insira pelo menos uma chave de API antes de importar.";return}let M=T.match(/AIza[0-9A-Za-z\-_]{35}/g),$=[];if(M&&M.length>0?$=Array.from(new Set(M)):$=Array.from(new Set(T.split(/[\n,;\s]+/).map(N=>N.trim().replace(/^["'`]|["'`]$/g,"")).filter(N=>N.length>=20))),$.length===0){w.style.color="#f87171",w.textContent="Nenhuma chave v\xE1lida encontrada (m\xEDnimo 20 caracteres).";return}w.style.color="#00e5ff",w.textContent=`Processando ${$.length} chave(s)...`,C.disabled=!0,C.style.opacity="0.6";let E=0,H=0;for(let N of $){let j=z.addKey(N);j.ok?E++:j.message.includes("j\xE1 est\xE1 cadastrada")&&H++}if(E>0){let N=z.exportRawKeys();this.callbacks.onSettingsChange({apiKey:N[0],apiKeys:N}),b(!1);try{localStorage.setItem("easyquiz_keys_collapsed","false")}catch{}}w.textContent=`${E} adicionada(s), ${H} duplicada(s). Validando modelo em paralelo...`;let V=z.exportRawKeys(),_=this.modelSelect?.value||"gemini-3.5-flash-lite",O=await et(_,V);O.ok?(z.markSuccess(O.key,200),w.style.color="#4ade80",w.textContent=`\u2713 ${E} adicionada(s), ${H} duplicada(s). Modelo '${O.model}' pronto!`):(w.style.color="#fbbf24",w.textContent=`${E} adicionada(s), ${H} duplicada(s). Aviso: ${O.message}`),this.renderKeysList(),C.disabled=!1,C.style.opacity="1",E>0&&(this.setStatus(`\u2713 Lote importado: ${E} chave(s) adicionada(s) ao pool!`,"success"),setTimeout(x,2200))})}),this.shadow.querySelector("#eq-menu-edit-text")?.addEventListener("click",()=>{this.keyContextMenu.hidden=!0,this.shadow.querySelector("#eq-text-editor-overlay")?.remove();let h=z.exportRawKeys(),g=document.createElement("div");g.id="eq-text-editor-overlay",g.style.cssText=["position:fixed","inset:0","z-index:2147483647","pointer-events:auto","background:rgba(0,0,0,0.82)","backdrop-filter:blur(4px)","-webkit-backdrop-filter:blur(4px)","display:flex","align-items:center","justify-content:center",'font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif'].join(";");let v=document.createElement("div");v.style.cssText=["background:#11151c","color:#e2e8f0","border:1px solid #283548","border-radius:12px","padding:20px","width:460px","max-width:94vw","font-size:13px","box-shadow:0 12px 40px rgba(0,0,0,0.85),0 0 0 1px rgba(0,229,255,0.15)","display:flex","flex-direction:column","gap:10px","pointer-events:auto"].join(";"),v.innerHTML=`
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
`),requestAnimationFrame(()=>{w.focus(),w.select()});let L=()=>g.remove();["keydown","keyup","keypress","paste","copy","cut"].forEach(S=>{g.addEventListener(S,x=>{x.stopPropagation(),x.stopImmediatePropagation()},!0)}),g.addEventListener("keydown",S=>{S.key==="Escape"&&L()}),g.addEventListener("click",S=>{S.target===g&&L()}),v.querySelector("#eq-edittext-x")?.addEventListener("click",L),v.querySelector("#eq-edittext-cancel")?.addEventListener("click",L),v.querySelector("#eq-edittext-clear")?.addEventListener("click",()=>{confirm("Apagar todas as chaves? Esta a\xE7\xE3o \xE9 irrevers\xEDvel.")&&(w.value="",C.style.color="#fbbf24",C.textContent="Campo limpo. Clique em Salvar para confirmar a remo\xE7\xE3o de todas as chaves.")}),v.querySelector("#eq-edittext-save")?.addEventListener("click",()=>{let S=w.value.split(/[\n\r]+/).map(M=>M.trim().replace(/^["']|["']$/g,"")).filter(M=>M.length>5),x=Array.from(new Set(S));z.init(x);let T=z.exportRawKeys();this.callbacks.onSettingsChange({apiKey:T[0]||"",apiKeys:T}),this.renderKeysList(),C.style.color="#4ade80",x.length===0?C.textContent="\u2713 Todas as chaves removidas.":C.textContent=`\u2713 ${x.length} chave(s) salva(s) com sucesso!`,this.setStatus(x.length>0?`\u2713 ${x.length} chave(s) salva(s)!`:"Todas as chaves foram removidas.",x.length>0?"success":"info"),setTimeout(L,1400)})}),this.shadow.querySelector("#eq-menu-delete-all")?.addEventListener("click",()=>{this.keyContextMenu.hidden=!0;let h=z.getAllKeys();if(h.length===0)return this.setStatus("Nenhuma chave para apagar.","info");confirm(`Apagar todas as ${h.length} chave(s) permanentemente?`)&&(z.init([]),this.callbacks.onSettingsChange({apiKey:"",apiKeys:[]}),this.renderKeysList(),this.setStatus("Todas as chaves foram removidas.","info"))}),this.shadow.querySelector("#eq-menu-test")?.addEventListener("click",async()=>{this.keyContextMenu.hidden=!0;let h=z.getAllKeys();if(h.length===0)return this.setStatus("Nenhuma chave cadastrada para testar.","error");this.setStatus(`\u26A1 Testando ${h.length} chave(s) em paralelo...`,"info");let g=this.modelSelect?.value||"gemini-3.5-flash-lite",v=h.map(C=>C.key),w=await et(g,v);if(w.ok)z.markSuccess(w.key,150),this.setStatus(`\u2713 Validado! Modelo '${w.model}' respondeu com sucesso!`,"success");else{let C=await Promise.allSettled(v.map(S=>Pe(S))),L=0;C.forEach((S,x)=>{if(S.status==="fulfilled"&&S.value.ok)L++,z.markSuccess(v[x],200);else{let T=S.status==="fulfilled"?S.value.message:String(S.reason);z.markInvalid(v[x],T)}}),this.setStatus(`Teste: ${L}/${h.length} chave(s) v\xE1lidas. ${w.message}`,L>0?"info":"error")}this.renderKeysList()});let p=()=>{this.keyContextMenu.hidden=!0,window.confirm("Deseja realmente resetar todos os dados, chaves e mem\xF3ria de sess\xE3o do EasyQuiz?")&&(this.autopilot.isActive()&&this.autopilot.stop(),this.updateAutopilotUi(!1),this.setBusy(!1),yt(),Ce(),this.stopQuestionTimer(0),this.currentQuestionStartTime=0,this.metricsLiveTime&&(this.metricsLiveTime.textContent="00:00.00"),this.metricsLiveStatus&&(this.metricsLiveStatus.textContent="Em espera",this.metricsLiveStatus.className="eq-live-stopwatch-status"),this.updateTimingMetrics(),this.apiKeyInput.value="",this.callbacks.onSettingsChange({apiKey:""}),this.setStatus("Todos os dados do EasyQuiz foram limpos.","info"),this.logToConsole("> [SYS] Armazenamento local resetado.","text-yellow"))};this.shadow.querySelector("#eq-menu-reset")?.addEventListener("click",p),this.shadow.querySelector("#eq-reset-all-btn")?.addEventListener("click",p),this.apToggleBtn.addEventListener("click",()=>{if(this.autopilot.isActive())this.autopilot.stop(),this.callbacks.onCancel?.(),this.setProgress(0),this.updateAutopilotUi(!1),this.setInterrupted("Autopilot interrompido imediatamente pelo usu\xE1rio.");else{if(!this.apiKeyInput.value.trim().replace(/^["']|["']$/g,"")){this.setStatus("Configure sua chave de API Gemini na aba Configura\xE7\xF5es antes de ligar o Autopilot.","error"),this.switchTab("settings"),this.apiKeyInput.focus();return}this.callbacks.onSettingsChange({autoApply:!0,autoAdvance:!0}),this.autoApplyCheckbox.checked=!0,this.autoAdvanceCheckbox.checked=!0,It(),this.autopilot.start(),this.updateAutopilotUi(!0),this.startStopwatch(),this.setStatus("Autopilot ativo. Monitorando exerc\xEDcios...","info")}}),this.shadow.querySelector("#eq-ap-clear-memory").addEventListener("click",()=>{We(),this.logToConsole("> [SYS] Mem\xF3ria contextual limpa com sucesso.","text-green"),this.setStatus("Mem\xF3ria contextual da sess\xE3o limpa.","success")});let y=this.shadow.querySelector("#eq-copy-console-btn");y?.addEventListener("click",()=>{let h=this.apConsole?.innerText||"";navigator.clipboard.writeText(h).then(()=>{let g=y.innerHTML;y.innerHTML=A.check,setTimeout(()=>y.innerHTML=g,1800)})}),this.copyPromptBtn.addEventListener("click",()=>{let h=this.inspPrompt.textContent||"";navigator.clipboard.writeText(h).then(()=>{let g=this.copyPromptBtn.innerHTML;this.copyPromptBtn.innerHTML=`${A.check} Copiado!`,setTimeout(()=>this.copyPromptBtn.innerHTML=g,2e3)})}),this.modelSelect.addEventListener("change",()=>this.callbacks.onSettingsChange({model:this.modelSelect.value})),this.modeSelect.addEventListener("change",()=>this.callbacks.onSettingsChange({modeHint:this.modeSelect.value})),this.engineSelect.addEventListener("change",()=>this.callbacks.onSettingsChange({engine:this.engineSelect.value})),this.dryRunCheckbox.addEventListener("change",()=>this.callbacks.onSettingsChange({dryRun:this.dryRunCheckbox.checked})),this.autoApplyCheckbox.addEventListener("change",()=>this.callbacks.onSettingsChange({autoApply:this.autoApplyCheckbox.checked})),this.autoAdvanceCheckbox.addEventListener("change",()=>this.callbacks.onSettingsChange({autoAdvance:this.autoAdvanceCheckbox.checked})),this.useVisionCheckbox.addEventListener("change",()=>{let h=this.useVisionCheckbox.checked;this.callbacks.onSettingsChange({useVision:h}),this.setStatus(h?"Vis\xE3o Computacional ativada (capturas habilitadas).":"Modo DOM R\xE1pido ativado (capturas desabilitadas).","info")}),this.hostDarkModeCheckbox.addEventListener("change",()=>{let h=this.hostDarkModeCheckbox.checked;this.callbacks.onSettingsChange({hostDarkMode:h}),this.applyHostDarkMode(h)}),this.analyzeBtn.addEventListener("click",async()=>{if(this.isBusy){this.callbacks.onCancel?.(),this.setInterrupted("An\xE1lise cancelada pelo usu\xE1rio. Pronto para nova tentativa.");return}await this.callbacks.onAnalyze()&&!this.dryRunCheckbox.checked&&!this.autoApplyCheckbox.checked&&this.callbacks.onApply()}),this.applyBtn.addEventListener("click",()=>this.callbacks.onApply())}startStopwatch(){this.stopStopwatch(),this.stopwatchStartTime=Date.now();let e=()=>{let t=((Date.now()-this.stopwatchStartTime)/1e3).toFixed(2)+"s";this.stopwatchAp.textContent=t,this.stopwatchAdv.textContent=t};e(),this.stopwatchInterval=setInterval(e,100)}stopStopwatch(e){if(this.stopwatchInterval&&(clearInterval(this.stopwatchInterval),this.stopwatchInterval=null),e!==void 0){let t=(e/1e3).toFixed(2)+"s";this.stopwatchAp.textContent=t,this.stopwatchAdv.textContent=t}}setLogFilter(e){this.activeLogFilter=e;let t=["all","error","ai","dom"];for(let o of t){let l=this.shadow.querySelector(`#eq-dbg-filter-${o}`);o===e?l?.classList.add("active"):l?.classList.remove("active")}this.renderTerminalEntries()}updateLogCounters(){let e=0,t=0,o=0;for(let l of this.logEntries)l.category==="error"?e++:l.category==="ai"?t++:l.category==="dom"&&o++;this.dbgCountAll&&(this.dbgCountAll.textContent=String(this.logEntries.length)),this.dbgCountError&&(this.dbgCountError.textContent=String(e)),this.dbgCountAi&&(this.dbgCountAi.textContent=String(t)),this.dbgCountDom&&(this.dbgCountDom.textContent=String(o))}renderTerminalEntries(){if(!this.liveDebugTerminal)return;this.liveDebugTerminal.replaceChildren();let e=this.activeLogFilter==="all"?this.logEntries:this.logEntries.filter(t=>t.category===this.activeLogFilter);if(e.length===0){let t=document.createElement("div");t.className="text-muted",t.textContent=`Nenhum log encontrado para o filtro "${this.activeLogFilter.toUpperCase()}".`,this.liveDebugTerminal.appendChild(t);return}for(let t of e){let o=document.createElement("div");o.textContent=t.message,t.colorClass&&(o.className=t.colorClass),this.liveDebugTerminal.appendChild(o)}this.autoScrollLogs&&(this.liveDebugTerminal.scrollTop=this.liveDebugTerminal.scrollHeight)}clearLogs(){if(this.logEntries=[],this.updateLogCounters(),this.liveDebugTerminal){this.liveDebugTerminal.replaceChildren();let e=document.createElement("div");e.className="text-blue",e.textContent="> [SYS] Console de logs limpo pelo usu\xE1rio.",this.liveDebugTerminal.appendChild(e)}this.apConsole&&this.apConsole.replaceChildren(),this.executionConsole&&this.executionConsole.replaceChildren()}getFormattedLogs(){return(this.activeLogFilter==="all"?this.logEntries:this.logEntries.filter(t=>t.category===this.activeLogFilter)).map(t=>t.message).join(`
`)}setLastError(e){this.lastErrorMsg=e,this.dbgErrorCard&&this.dbgErrorText&&(this.dbgErrorText.textContent=e,this.dbgErrorCard.style.display="flex")}setErrorDiagnostic(e,t){let o=t?`[${t}] ${e}`:e;this.setLastError(o)}refreshDebugView(){let e=this.latestPlan,t=this.latestContext,o=this.latestPromptText||e?.promptSent||"";if(this.dbgModel&&(this.dbgModel.textContent=e?.usedModel||this.initialSettings.model||"--"),this.dbgLatency&&(this.dbgLatency.textContent=e?.durationMs?`${e.durationMs}ms`:"--"),this.dbgSplitTokens){let l=e?.promptTokens!==void 0?String(e.promptTokens):"--",n=e?.candidatesTokens!==void 0?String(e.candidatesTokens):"--";this.dbgSplitTokens.textContent=`${l} / ${n}`,this.dbgSplitTokens.title=`Prompt: ${l} tokens | Resposta: ${n} tokens`}if(this.dbgTotalTokens){let l=e?.tokensUsed??(e?.promptTokens&&e?.candidatesTokens?e.promptTokens+e.candidatesTokens:void 0);this.dbgTotalTokens.textContent=l!==void 0?`${l}`:"--"}if(this.dbgPromptLen){let l=o.length,n=Math.round(l/4);this.dbgPromptLen.textContent=`${l} chars (~${n} tokens est.)`}if(this.dbgPromptView&&(this.dbgPromptView.textContent=o||"Nenhum prompt enviado at\xE9 o momento."),this.dbgContextView)if(t){let l={scope:`${t.scope.tagName.toLowerCase()}${t.scope.id?"#"+t.scope.id:""}${t.scope.className?"."+t.scope.className.split(" ").join("."):""}`,questionLength:t.questionText.length,questionSnippet:t.questionText.slice(0,150)+(t.questionText.length>150?"...":""),controlsCount:t.controls.length,controls:t.controls.map((n,r)=>({index:r+1,tag:n.tag,type:n.type,name:n.name||void 0,id:n.id||void 0,value:n.value||void 0,label:n.label||void 0,role:n.role}))};this.dbgContextView.textContent=JSON.stringify(l,null,2)}else this.dbgContextView.textContent="Aguardando captura de contexto pelo EasyQuiz...";this.dbgRawRespView&&(e?e.rawResponse?this.dbgRawRespView.textContent=e.rawResponse:this.dbgRawRespView.textContent=JSON.stringify({pageType:e.pageType,mode:e.mode,confidence:e.confidence,rationale:e.rationale,actions:e.actions},null,2):this.dbgRawRespView.textContent="Aguardando retorno da API Gemini..."),this.lastErrorMsg&&this.dbgErrorCard&&this.dbgErrorText&&(this.dbgErrorText.textContent=this.lastErrorMsg,this.dbgErrorCard.style.display="flex")}logToConsole(e,t){let o=new Date,l=`${String(o.getHours()).padStart(2,"0")}:${String(o.getMinutes()).padStart(2,"0")}:${String(o.getSeconds()).padStart(2,"0")}.${String(Math.floor(o.getMilliseconds()/100))}`,n=e;e.startsWith(">")?n=`> [${l}] ${e.slice(1).trim()}`:n=`[${l}] ${e}`;let r="all";t==="text-red"||n.includes("[ERRO]")||n.includes("Falha")||n.includes("Error")?r="error":n.includes("[IA]")||n.includes("[RAG]")||n.includes("Tokens")||n.includes("Gemini")||n.includes("Modelo:")?r="ai":(n.includes("[DOM]")||n.includes("[EXEC]")||n.includes("[VERIF]")||n.includes("[NAV]"))&&(r="dom");let s={id:Date.now()+Math.random(),timestamp:l,message:n,colorClass:t,category:r};for(this.logEntries.push(s);this.logEntries.length>250;)this.logEntries.shift();if(this.updateLogCounters(),r==="error"&&this.setLastError(n),this.liveDebugTerminal&&(this.activeLogFilter==="all"||this.activeLogFilter===r)){let i=document.createElement("div");for(i.textContent=n,t&&(i.className=t),this.liveDebugTerminal.appendChild(i);this.liveDebugTerminal.children.length>250;)this.liveDebugTerminal.removeChild(this.liveDebugTerminal.firstChild);this.autoScrollLogs&&(this.liveDebugTerminal.scrollTop=this.liveDebugTerminal.scrollHeight)}if(this.apConsole){let i=document.createElement("div");for(i.textContent=n,t&&(i.className=t),this.apConsole.appendChild(i),this.apConsole.scrollTop=this.apConsole.scrollHeight;this.apConsole.children.length>150;)this.apConsole.removeChild(this.apConsole.firstChild)}if(this.executionConsole){let i=document.createElement("div");for(i.textContent=n,t&&(i.className=t),this.executionConsole.appendChild(i),this.executionConsole.scrollTop=this.executionConsole.scrollHeight;this.executionConsole.children.length>150;)this.executionConsole.removeChild(this.executionConsole.firstChild)}}setProgress(e,t){if(!this.progressContainer||!this.progressBar)return;if(e<=0){this.progressContainer.style.display="none",this.progressBar.style.width="0%";return}this.progressContainer.style.display="flex";let o=Math.min(100,Math.max(0,Math.round(e)));this.progressBar.style.width=`${o}%`,this.progressVal&&(this.progressVal.textContent=`${o}%`),t&&this.progressLabel&&(this.progressLabel.textContent=t),o>=100&&setTimeout(()=>{this.progressContainer&&this.progressBar&&this.progressBar.style.width==="100%"&&(this.progressContainer.style.display="none")},1500)}updateContext(e,t){this.latestContext=e,t&&(this.latestPlan=t,t.imageDescriptions&&(this.latestImageDescriptions=t.imageDescriptions,this.renderMediaTab())),this.activeTab==="brain"?(this.renderContextTree(),t&&this.refreshInspectorView()):this.activeTab==="debug"&&this.refreshDebugView()}updateImages(e){this.latestImages=e,this.activeTab==="brain"&&this.renderContextTree(),(this.activeTab==="media"||e.length>0)&&this.renderMediaTab()}renderMediaTab(){let e=this.shadow?.querySelector("#eq-media-grid"),t=this.shadow?.querySelector("#eq-media-count-badge");if(!e)return;let o=this.latestImages,l=this.latestImageDescriptions;if(t&&(t.textContent=`${o.length} m\xEDdias`),o.length===0){e.innerHTML=`
        <div class="text-muted" style="padding: 16px 0; text-align: center;">
          Nenhuma imagem capturada ainda.<br>
          <span style="font-size: 10px; opacity: 0.6;">Ative \u201CVis\xE3o Computacional\u201D nas configura\xE7\xF5es e execute uma an\xE1lise.</span>
        </div>`;return}e.innerHTML="",o.forEach((n,r)=>{let s=l.find(h=>h.index===r),i=n.captureStatus==="captured"?"\u2705":n.captureStatus==="text_only"?"\u{1F4DD}":"\u274C",c=n.captureStatus==="captured"?"Visual":n.captureStatus==="text_only"?"Texto":"Falhou",u=s?.relevant??!0,b=s?.description??(n.textContext||"Aguardando an\xE1lise da IA..."),d=document.createElement("div");d.style.cssText=["background: rgba(255,255,255,0.04)","border: 1px solid rgba(255,255,255,0.08)","border-radius: 8px","overflow: hidden",`border-left: 3px solid ${u?"#5865f2":"#666"}`].join(";");let m=n.base64?`data:${n.mediaType||"image/jpeg"};base64,${n.base64}`:"",p="";m?p=`
          <div style="position: relative; background: #111; border-bottom: 1px solid rgba(255,255,255,0.06);">
            <img src="${m}" 
              style="width: 100%; max-height: 180px; object-fit: contain; display: block; cursor: pointer;"
              alt="Captura ${r+1}"
              title="Clique para ampliar"
              onclick="(function(el){ var ov=document.createElement('div'); ov.style='position:fixed;inset:0;z-index:2147483647;background:rgba(0,0,0,0.92);display:flex;align-items:center;justify-content:center;cursor:zoom-out;'; var img=document.createElement('img'); img.src=el.src; img.style='max-width:95vw;max-height:95vh;border-radius:6px;'; ov.appendChild(img); ov.onclick=function(){ov.remove();}; document.body.appendChild(ov); })(this)"
            >
            <div style="position:absolute;top:6px;right:6px;background:rgba(0,0,0,0.7);border-radius:4px;padding:2px 6px;font-size:10px;font-weight:700;color:#fff;">
              ${i} ${c}
            </div>
          </div>`:p=`
          <div style="background:#1a1a1a; padding:12px; text-align:center; color:#666; font-size:11px; border-bottom: 1px solid rgba(255,255,255,0.06);">
            ${i} ${c} \u2014 sem dados de imagem
          </div>`;let f=u?'<span style="font-size:9px;font-weight:700;padding:1px 5px;border-radius:3px;background:rgba(88,101,242,0.2);border:1px solid rgba(88,101,242,0.4);color:#7983f5;">RELEVANTE</span>':'<span style="font-size:9px;font-weight:700;padding:1px 5px;border-radius:3px;background:rgba(255,85,85,0.2);border:1px solid rgba(255,85,85,0.4);color:#ff5555;">IGNORADA</span>',y=`
        <div style="padding: 10px 12px; display: flex; flex-direction: column; gap: 6px;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size:11px;font-weight:700;color:#e0e0e0;">Imagem ${r+1}</span>
            ${f}
          </div>
          <div style="font-size:10px;color:#aaa;line-height:1.5;">${b}</div>
          ${n.textContext&&m?`<div style="font-size:9px;color:#666;margin-top:2px;">Contexto textual: ${n.textContext.slice(0,100)}${n.textContext.length>100?"...":""}</div>`:""}
        </div>`;d.innerHTML=p+y,e.appendChild(d)})}renderContextTree(){if(!this.contextTreeContainer)return;let e=this.latestContext,t=He(),o=this.latestPlan;this.contextTreeContainer.innerHTML="";let l=this.createTreeFolder("\u{1F4C4} P\xC1GINA & ESCOPO ATUAL",!0,[{label:"T\xEDtulo",value:document.title||"Sem t\xEDtulo"},{label:"URL",value:window.location.pathname||"/"},{label:"Escopo DOM",value:e?`${e.scope.tagName.toLowerCase()}${e.scope.className?"."+e.scope.className.split(" ").join("."):""}`:"Document"},{label:"Tamanho Texto",value:e?`${e.questionText.length} caracteres`:"N\xE3o analisado"},{label:"Trecho Enunciado",value:e?`"${e.questionText.slice(0,120)}..."`:"Nenhum"}]);this.contextTreeContainer.appendChild(l);let n=e?e.controls:[],r=n.map((p,f)=>{let y=p.role==="navigation"||p.type==="button",h=!y&&p.value?` [val: "${p.value}"]`:"";return{label:`[#${f+1}] ${p.type.toUpperCase()}`,value:`${p.label||p.id||p.name||"(Sem r\xF3tulo)"}${h}`.trim(),badge:y?"Navega\xE7\xE3o":p.role||p.type}}),s=this.createTreeFolder(`\u{1F39B}\uFE0F CONTROLES DETECTADOS (${n.length})`,n.length>0,r);this.contextTreeContainer.appendChild(s);let i=t.map((p,f)=>({label:`Mem\xF3ria #${f+1}`,value:p,badge:"RAG"})),c=this.createTreeFolder(`\u{1F9E0} MEM\xD3RIA RAG ACUMULADA (${t.length})`,t.length>0,i);if(this.contextTreeContainer.appendChild(c),o){let p=this.createTreeFolder(`\u{1F916} \xDALTIMO PLANO IA (${o.actions.length} a\xE7\xF5es)`,!0,[{label:"Tipo P\xE1gina",value:o.pageType,badge:`${(o.confidence*100).toFixed(0)}%`},{label:"Modo",value:o.mode},{label:"Racioc\xEDnio",value:o.rationale||"N/A"},...o.actions.map((f,y)=>({label:`A\xE7\xE3o #${y+1} (${f.t})`,value:JSON.stringify(f)}))]);this.contextTreeContainer.appendChild(p)}let u=this.latestImages,b=this.latestImageDescriptions,d=u.map((p,f)=>{let y=b.find(C=>C.index===f),h=p.captureStatus==="captured"?"\u2705":p.captureStatus==="text_only"?"\u{1F4DD}":"\u274C",g=p.captureStatus==="captured"?"Visual":p.captureStatus==="text_only"?"Texto":"Falhou",v=y?y.relevant?"\u{1F3AF} Relevante":"\u26A0\uFE0F Ignorada":"\u2014",w=y?y.description:p.textContext?p.textContext:"Aguardando an\xE1lise IA...";return{label:`${h} Img ${f+1} [${g}]`,value:`${w}`,badge:v,imgSrc:p.base64?`data:${p.mediaType||"image/jpeg"};base64,${p.base64}`:void 0}}),m=this.createTreeFolder(`\u{1F5BC}\uFE0F IMAGENS DETECTADAS (${u.length})`,!0,d);this.contextTreeContainer.appendChild(m)}createTreeFolder(e,t,o){let l=document.createElement("div");l.className="eq-tree-node";let n=document.createElement("div");n.className="eq-tree-header",n.innerHTML=`<span class="eq-tree-arrow">${t?"\u25BC":"\u25B6"}</span> <span>${e}</span>`;let r=document.createElement("div");if(r.className="eq-tree-content",r.style.display=t?"flex":"none",o.length===0)r.innerHTML='<div class="text-muted" style="padding: 2px 0;">Nenhum item registrado.</div>';else for(let s of o){let i=document.createElement("div");i.className="eq-tree-leaf";let c="";s.imgSrc&&s.imgSrc.startsWith("data:image")&&(c=`<div style="margin-top: 8px; margin-bottom: 4px;"><img src="${s.imgSrc}" style="max-width: 100%; max-height: 120px; border-radius: 4px; border: 1px solid #3c4043; background: #1e1f22;" alt="Captura"></div>`),i.innerHTML=`
          <div style="display: flex; align-items: flex-start; gap: 8px; width: 100%;">
            <strong style="color:#ffffff; min-width: 80px;">${s.label}:</strong>
            <div style="flex:1; display: flex; flex-direction: column;">
              <span style="word-break: break-word; color:#aaaaaa;">${s.value}</span>
              ${c}
            </div>
            ${s.badge?`<span class="eq-tree-badge" style="white-space: nowrap;">${s.badge}</span>`:""}
          </div>
        `,r.appendChild(i)}return n.addEventListener("click",()=>{let s=r.style.display==="none";r.style.display=s?"flex":"none";let i=n.querySelector(".eq-tree-arrow");i&&(i.textContent=s?"\u25BC":"\u25B6")}),l.appendChild(n),l.appendChild(r),l}toggle(e){e!==void 0?this.isCollapsed=!e:this.isCollapsed=!this.isCollapsed,this.isCollapsed?this.sidebarEl.classList.add("eq-collapsed"):(this.sidebarEl.classList.remove("eq-collapsed"),this.apiKeyInput.value||(this.switchTab("settings"),this.apiKeyInput.focus()))}updateAutopilotUi(e){e?(this.apToggleBtn.innerHTML=`${A.stop} PARAR AUTOPILOT`,this.apToggleBtn.classList.add("danger"),this.apToggleBtn.title="Interromper execu\xE7\xE3o cont\xEDnua do Autopilot"):(this.apToggleBtn.innerHTML=`${A.play} INICIAR AUTOPILOT`,this.apToggleBtn.classList.remove("danger"),this.apToggleBtn.title="Iniciar resolu\xE7\xE3o autom\xE1tica cont\xEDnua de quest\xF5es")}setOperationState(e,t){let o=this.shadow.querySelector("#eq-operation-state");o&&(o.textContent=e,o.className=`eq-operation-state is-${t}`)}setInterrupted(e="An\xE1lise interrompida pelo usu\xE1rio."){this.isBusy=!1,[this.modelSelect,this.modeSelect,this.engineSelect,this.dryRunCheckbox,this.autoApplyCheckbox,this.autoAdvanceCheckbox,this.useVisionCheckbox].forEach(t=>t.disabled=!1),this.analyzeBtn.disabled=!1,this.analyzeBtn.classList.remove("danger"),this.analyzeBtn.innerHTML=`${A.sparkles} Resolver com IA (Alt+R)`,this.analyzeBtn.title="Analisar e responder quest\xE3o ativa",this.applyBtn.disabled=!this.latestPlan||!this.latestPlan.actions.length,this.stopStopwatch(),this.stopQuestionTimer(),this.dotPulseAp.className="eq-dot-pulse stopped",this.dotPulseAdv.className="eq-dot-pulse stopped",this.launcherDot.className="eq-launcher-dot stopped",this.metricsLiveStatus&&(this.metricsLiveStatus.textContent="Interrompido",this.metricsLiveStatus.className="eq-live-stopwatch-status is-warning"),this.autopilot.isActive()||this.updateAutopilotUi(!1),this.setStatus(e,"warning")}setBusy(e,t){this.isBusy=e,[this.modelSelect,this.modeSelect,this.engineSelect,this.dryRunCheckbox,this.autoApplyCheckbox,this.autoAdvanceCheckbox,this.useVisionCheckbox].forEach(o=>o.disabled=e),e?(this.analyzeBtn.disabled=!1,this.analyzeBtn.classList.add("danger"),this.analyzeBtn.innerHTML=`${A.stop} Parar An\xE1lise`,this.analyzeBtn.title="Interromper e cancelar an\xE1lise em andamento",this.applyBtn.disabled=!0,this.startStopwatch(),this.startQuestionTimer(),this.dotPulseAp.className="eq-dot-pulse busy",this.dotPulseAdv.className="eq-dot-pulse busy",this.launcherDot.className="eq-launcher-dot busy",this.setOperationState("Analisando...","busy"),this.metricsLiveStatus&&(this.metricsLiveStatus.textContent="Calculando...",this.metricsLiveStatus.className="eq-live-stopwatch-status is-busy"),t&&this.setStatus(t,"info")):(this.analyzeBtn.disabled=!1,this.analyzeBtn.classList.remove("danger"),this.analyzeBtn.innerHTML=`${A.sparkles} Resolver com IA (Alt+R)`,this.analyzeBtn.title="Analisar e responder quest\xE3o ativa",this.applyBtn.disabled=!this.latestPlan||!this.latestPlan.actions.length,this.stopStopwatch(),this.stopQuestionTimer(),this.dotPulseAp.className="eq-dot-pulse",this.dotPulseAdv.className="eq-dot-pulse",this.launcherDot.className="eq-launcher-dot",this.setOperationState(this.autopilot.isActive()?"Monitorando":"Pronto","idle"),this.metricsLiveStatus&&this.metricsLiveStatus.textContent==="Calculando..."&&(this.metricsLiveStatus.textContent="Em espera",this.metricsLiveStatus.className="eq-live-stopwatch-status"))}setStatus(e,t="info"){this.statusTextAp.textContent=e,this.statusTextAdv.textContent=e,t==="error"?(this.setOperationState("Bloqueado","error"),this.dotPulseAp.className="eq-dot-pulse error",this.dotPulseAdv.className="eq-dot-pulse error",this.launcherDot.className="eq-launcher-dot error"):t==="warning"?(this.setOperationState("Interrompido","warning"),this.dotPulseAp.className="eq-dot-pulse stopped",this.dotPulseAdv.className="eq-dot-pulse stopped",this.launcherDot.className="eq-launcher-dot stopped"):t==="success"?(this.setOperationState("Confirmado","success"),this.dotPulseAp.className="eq-dot-pulse",this.dotPulseAdv.className="eq-dot-pulse",this.launcherDot.className="eq-launcher-dot"):this.isBusy?(this.setOperationState("Analisando...","busy"),this.dotPulseAp.className="eq-dot-pulse busy",this.dotPulseAdv.className="eq-dot-pulse busy",this.launcherDot.className="eq-launcher-dot busy"):(this.setOperationState(this.autopilot.isActive()?"Monitorando":"Pronto","info"),this.dotPulseAp.className="eq-dot-pulse",this.dotPulseAdv.className="eq-dot-pulse",this.launcherDot.className="eq-launcher-dot");let o=e.includes("Alternando")||e.includes("indispon\xEDvel")||e.includes("fallback")||e.includes("alternativo"),l=t==="error"?"> [ERRO] ":t==="success"?"> [SUCESSO] ":t==="warning"?"> [PARADO] ":o?"> [FALLBACK] ":"> [SYS] ",n=t==="error"?"text-red":t==="success"?"text-green":t==="warning"||o?"text-yellow":"text-blue";this.logToConsole(`${l}${e}`,n)}setPlan(e,t){if(this.latestPlan=e,this.resultContainer.style.display="flex",e.durationMs&&this.stopStopwatch(e.durationMs),e.usedModel){let i=this.shadow.querySelector("#eq-active-model-badge");if(i){let c=e.usedModel.replace("gemini-","").replace("-latest","");i.textContent=`\u25CF ${c}`,i.style.display="inline-block"}}let o=this.shadow.querySelector("#eq-badges");o.replaceChildren();let l=[e.mode.replace("_"," "),`${Math.round(e.confidence*100)}% Confian\xE7a`,`${e.actions.length} a\xE7\xF5es`,...e.usedModel?[e.usedModel]:[]];for(let i of l){let c=document.createElement("span");c.className="eq-brand-badge",c.textContent=i,o.appendChild(c)}let n=this.shadow.querySelector("#eq-rationale-text");n.textContent=e.rationale;let r=this.shadow.querySelector("#eq-actions-list");r.innerHTML="";for(let i of e.actions){let c=document.createElement("div");c.className="eq-action-item";let u="";i.t==="chk"?u=`chk ${i.id} (${i.c})`:i.t==="val"?u=`val "${i.v}" -> ${i.id}`:i.t==="sel"?u=`sel "${Array.isArray(i.v)?i.v.join(","):i.v}" -> ${i.id}`:i.t==="clk"?u=`clk ${i.id}`:i.t==="adv"?u="adv":i.t==="js"?u=`js: ${String(i.v).slice(0,40)}...`:i.t==="drag"&&(u=`drag "${i.from}" -> "${i.to}"`);let b=document.createElement("span");b.className="eq-action-badge",b.textContent=i.t.toUpperCase();let d=document.createElement("span");d.textContent=u,c.append(b,d),r.appendChild(c)}this.applyBtn.disabled=!t||!e.actions.length;let s=this.shadow.querySelector("#eq-execution-card");s&&(s.hidden=!0),this.refreshInspectorView(),this.refreshDebugView()}setExecutionReport(e){let t=this.shadow.querySelector("#eq-execution-card"),o=this.shadow.querySelector("#eq-execution-summary"),l=this.shadow.querySelector("#eq-execution-list");if(!t||!o||!l)return;t.hidden=!1,o.textContent=e.navigationVerified?`${e.verified}/${e.applied} a\xE7\xF5es verificadas. Navega\xE7\xE3o confirmada.`:`${e.verified}/${e.applied} a\xE7\xF5es verificadas. ${e.navigationEvidence}`,o.className=`eq-execution-summary ${e.success?"is-success":"is-warning"}`,l.replaceChildren();let n=this.shadow.querySelector("#eq-execution-placeholder");n&&(n.textContent=e.navigationVerified?"Fluxo conclu\xEDdo: aplica\xE7\xE3o e navega\xE7\xE3o confirmadas.":`Fluxo interrompido: ${e.navigationEvidence}`,n.className=`eq-execution-placeholder ${e.success?"is-success":"is-warning"}`);for(let r of e.reports){let s=document.createElement("div");s.className=`eq-execution-row ${r.verified?"is-success":"is-failed"}`;let i=document.createElement("span");i.className="eq-execution-state",i.textContent=r.verified?"OK":"FALHOU";let c=document.createElement("div");c.className="eq-execution-details";let u=document.createElement("strong");u.textContent=r.target;let b=document.createElement("span");if(b.textContent=`${r.strategy} | ${r.evidence}`,c.append(u,b),s.append(i,c),r.error){let d=document.createElement("small");d.textContent=r.error,s.appendChild(d)}l.appendChild(s)}}setInspectorPrompt(e,t){this.latestPromptText=e,this.inspPrompt&&(this.inspPrompt.textContent=e),t&&this.inspModel&&(this.inspModel.textContent=t),this.inspLatency&&(this.inspLatency.textContent="Aguardando IA..."),this.activeTab==="debug"&&this.refreshDebugView()}refreshInspectorView(){let e=this.latestPlan;if(e)if(this.inspModel.textContent=e.usedModel||this.initialSettings.model,this.inspLatency.textContent=e.durationMs?`${e.durationMs}ms`:"--",this.inspTokens.textContent=e.tokensUsed?`${e.tokensUsed}`:"--",this.inspPrompt.textContent=e.promptSent||this.latestPromptText||"Prompt n\xE3o registrado para esta requisi\xE7\xE3o.",this.inspRationale.textContent=e.rationale,this.inspActions.innerHTML="",e.actions.length>0)for(let t of e.actions){let o=document.createElement("div");o.className="eq-action-item",o.textContent=JSON.stringify(t),this.inspActions.appendChild(o)}else this.inspActions.innerHTML='<div class="text-muted" style="padding: 4px;">Nenhuma a\xE7\xE3o prescrita pela IA.</div>';else this.latestPromptText&&(this.inspPrompt.textContent=this.latestPromptText)}showFloatingAnswers(e){let t=e||this.latestPlan;t&&this.floatingAnswers.show(t)}hideFloatingAnswers(){this.floatingAnswers.hide()}renderKeysList(){if(!this.keysListEl)return;let e=z.getAllKeys();if(this.keysBadgeEl){let l=e.filter(s=>!s.isCooldown).length,n=e.reduce((s,i)=>s+(i.winCount||0),0),r=l>=3?" \u26A1 TURBO":"";this.keysBadgeEl.textContent=`${e.length} chave${e.length>1?"s":""} (${l} pronta${l!==1?"s":""})${r}`,this.keysBadgeEl.className=`eq-key-badge ${l>=3?"racing":l>0?"ready":"cooldown"}`}this.keysListEl.replaceChildren();let t=this.shadow?.querySelector("#eq-keys-collapsible");t&&t.style.display!=="none"&&(t.style.maxHeight="none",t.style.overflow="visible"),[...e].sort((l,n)=>{let r=l.winCount||0,s=n.winCount||0;if(r!==s)return s-r;let i=l.lastLatencyMs||99999,c=n.lastLatencyMs||99999;if(i!==c)return i-c;let u=l.isCooldown?1:0,b=n.isCooldown?1:0;return u-b}).forEach((l,n)=>{let r=e.findIndex(g=>g.id===l.id),s=r>=0?r:n,i=document.createElement("div");i.className="eq-key-item";let c=document.createElement("div");c.className="eq-key-info";let u=document.createElement("span");u.className="eq-key-label",u.textContent=l.label||`Chave ${s+1}`;let b=document.createElement("span");b.className="eq-key-masked",b.textContent=X.maskKey(l.key),b.title="Clique para copiar a chave",b.style.cursor="pointer",b.addEventListener("click",()=>{navigator.clipboard?.writeText(l.key),this.setStatus(`Chave ${s+1} copiada para a \xE1rea de transfer\xEAncia!`,"info")});let d=document.createElement("span");if(l.isCooldown){d.className="eq-key-badge cooldown";let g=Math.ceil(l.remainingCooldownMs/1e3);d.textContent=`\u23F1 Cooldown (${g}s)`}else l.lastError&&l.errorCount&&l.errorCount>3?(d.className="eq-key-badge invalid",d.textContent="Erro",d.title=l.lastError):l.lastLatencyMs?(d.className="eq-key-badge ready",d.textContent=`Pronta (${l.lastLatencyMs}ms)`):(d.className="eq-key-badge ready",d.textContent="Pronta");c.appendChild(u),c.appendChild(b),c.appendChild(d);let m=l.winCount||0;if(m>0){let g=document.createElement("span");g.className="eq-key-badge winner",g.textContent=`\u{1F3C6} ${m} vit\xF3ria${m>1?"s":""}`,g.title=`Esta chave foi a mais r\xE1pida ${m} vez${m>1?"es":""} nas corridas paralelas`,c.appendChild(g)}let p=document.createElement("div");p.className="eq-key-actions";let f=document.createElement("button");f.className="eq-icon-btn",f.type="button",f.title="Testar esta chave",f.innerHTML=A.sparkles,f.addEventListener("click",async()=>{this.setStatus(`Testando chave ${l.label||s+1}...`,"info");let g=await Pe(l.key);g.ok?(z.markSuccess(l.key,120),this.setStatus(`\u2713 ${l.label||`Chave ${s+1}`}: Conex\xE3o com Google Gemini aprovada!`,"success")):(z.markInvalid(l.key,g.message),this.setStatus(`\u26A0\uFE0F ${l.label||`Chave ${s+1}`}: ${g.message}`,"error")),this.renderKeysList()});let y=document.createElement("button");y.className="eq-icon-btn",y.type="button",y.title="Editar chave",y.innerHTML=A.edit,y.addEventListener("click",()=>{let g=window.prompt(`Editar ${l.label||`Chave ${s+1}`}:`,l.key);if(g!==null&&g.trim()){let v=z.updateKey(l.id,g.trim());if(v.ok){let w=z.exportRawKeys();this.callbacks.onSettingsChange({apiKey:w[0],apiKeys:w}),this.setStatus(`Chave ${s+1} atualizada com sucesso!`,"success"),this.renderKeysList()}else this.setStatus(v.message,"warning")}});let h=document.createElement("button");h.className="eq-icon-btn",h.type="button",h.title="Remover chave",h.innerHTML=A.trash,h.addEventListener("click",()=>{if(confirm(`Remover permanentemente a ${l.label||`Chave ${s+1}`}?`)){let g=z.removeKey(l.id);if(g.ok){let v=z.exportRawKeys();this.callbacks.onSettingsChange({apiKey:v[0]||"",apiKeys:v}),this.setStatus("Chave removida com sucesso.","info"),this.renderKeysList()}else this.setStatus(g.message,"warning")}}),p.appendChild(f),p.appendChild(y),p.appendChild(h),i.appendChild(c),i.appendChild(p),this.keysListEl.appendChild(i)})}updateModelSelect(e,t){let o=e.filter(r=>Q(r.id)),l=t&&Q(t)?t:Q(this.initialSettings.model)?this.initialSettings.model:"gemini-2.5-flash";this.modelSelect.innerHTML="";let n=!1;o.forEach(r=>{let s=r.id===l;s&&(n=!0),this.modelSelect.add(new Option(r.name,r.id,!1,s))}),!n&&l&&Q(l)&&this.modelSelect.add(new Option(`Gemini (${l})`,l,!1,!0)),this.modelSelect.value=l}updateSelectedModel(e){if(!Q(e))return;Array.from(this.modelSelect.options).some(o=>o.value===e)||this.modelSelect.add(new Option(`Gemini (${e})`,e,!1,!0)),this.modelSelect.value=e}mountHost(){let e=document.body||document.documentElement;if(!e){let t=()=>{let o=document.body||document.documentElement;o&&!this.host.isConnected&&o.appendChild(this.host)};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",t,{once:!0}):setTimeout(t,0);return}this.host.isConnected||e.appendChild(this.host)}applyHostDarkMode(e){document.getElementById("eq-host-dark-mode-style")?.remove(),this.host.classList.toggle("eq-dark-mode-active",e)}startQuestionTimer(){this.currentQuestionStartTime=Date.now(),this.questionLiveTimerInterval&&clearInterval(this.questionLiveTimerInterval),this.metricsLiveStatus&&(this.metricsLiveStatus.textContent="Calculando...",this.metricsLiveStatus.classList.add("active"));let e=()=>{if(!this.metricsLiveTime)return;let t=Date.now()-this.currentQuestionStartTime,o=Math.floor(t/6e4),l=Math.floor(t%6e4/1e3),n=Math.floor(t%1e3/10);this.metricsLiveTime.textContent=`${String(o).padStart(2,"0")}:${String(l).padStart(2,"0")}.${String(n).padStart(2,"0")}`};e(),this.questionLiveTimerInterval=setInterval(e,50)}stopQuestionTimer(e){if(this.questionLiveTimerInterval&&(clearInterval(this.questionLiveTimerInterval),this.questionLiveTimerInterval=null),this.metricsLiveStatus&&(this.metricsLiveStatus.textContent="Parado",this.metricsLiveStatus.classList.remove("active")),this.metricsLiveTime&&this.currentQuestionStartTime>0){let t=e!==void 0?e:Math.max(0,Date.now()-this.currentQuestionStartTime),o=Math.floor(t/6e4),l=Math.floor(t%6e4/1e3),n=Math.floor(t%1e3/10);this.metricsLiveTime.textContent=`${String(o).padStart(2,"0")}:${String(l).padStart(2,"0")}.${String(n).padStart(2,"0")}`}}updateTimingMetrics(e){let t=e||qe();if(!this.metricTotalTime)return;let o=Math.floor(t.totalElapsedMs/1e3),l=Math.floor(o/60),n=o%60;this.metricTotalTime.textContent=`${String(l).padStart(2,"0")}:${String(n).padStart(2,"0")}`;let r=(t.averageDurationMs/1e3).toFixed(1);this.metricAvgTime.textContent=`${r}s`,this.metricTotalCount.textContent=String(t.completedQuestionsCount),this.metricsTotalBadge&&(this.metricsTotalBadge.textContent=`${t.completedQuestionsCount} Quest\xE3o(\xF5es)`),this.metricsHistoryCount&&(this.metricsHistoryCount.textContent=`${t.records.length} registros`),this.renderMetricsHistory(t.records)}renderMetricsHistory(e){if(!this.metricsHistoryList)return;if(e.length===0){this.metricsHistoryList.innerHTML='<div class="eq-metrics-empty">Nenhuma quest\xE3o respondida nesta sess\xE3o ainda.</div>';return}this.metricsHistoryList.innerHTML="";let t=[...e].reverse();for(let o of t){let l=document.createElement("div");l.className="eq-metrics-item";let n=document.createElement("div");n.className="eq-metrics-item-left";let r=document.createElement("span");r.className="eq-metrics-badge",r.textContent=`Q${o.questionIndex}`;let s=document.createElement("div");s.className="eq-metrics-item-info";let i=document.createElement("div");i.className="eq-metrics-item-title",i.textContent=o.questionTitle||`Quest\xE3o ${o.questionIndex}`;let c=document.createElement("div");c.className="eq-metrics-item-meta";let u=new Date(o.timestamp).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit",second:"2-digit"}),b=o.mode?o.mode.replace("_"," "):"auto";c.textContent=`${u} \u2022 Modo: ${b}${o.actionsCount?` \u2022 ${o.actionsCount} a\xE7\xE3o(\xF5es)`:""}`,s.appendChild(i),s.appendChild(c),n.appendChild(r),n.appendChild(s);let d=document.createElement("div");d.className="eq-metrics-item-right";let m=document.createElement("span");m.className="eq-metrics-item-dur",m.textContent=`${(o.durationMs/1e3).toFixed(2)}s`;let p=document.createElement("span");p.className=`eq-metrics-item-status is-${o.status}`,p.textContent=o.status==="verified"||o.status==="answered"?"\u2713 Injetado":o.status==="manual"?"Gabarito":"Pendente",d.appendChild(m),d.appendChild(p),l.appendChild(n),l.appendChild(d),this.metricsHistoryList.appendChild(l)}}copyMetricsReport(){let e=qe(),t=[];t.push("# Relat\xF3rio de Desempenho e Tempo \u2014 EasyQuiz"),t.push(`- **Quest\xF5es Respondidas:** ${e.completedQuestionsCount}`),t.push(`- **Tempo Total:** ${(e.totalElapsedMs/1e3).toFixed(1)}s`),t.push(`- **Tempo M\xE9dio por Quest\xE3o:** ${(e.averageDurationMs/1e3).toFixed(2)}s`),t.push(""),t.push("### Hist\xF3rico:"),e.records.length===0?t.push("_Nenhum registro ainda._"):e.records.forEach((o,l)=>{t.push(`${l+1}. **${o.questionTitle||`Q${o.questionIndex}`}**: ${(o.durationMs/1e3).toFixed(2)}s (${o.status})`)}),navigator.clipboard.writeText(t.join(`
`)).then(()=>{if(this.metricsCopyBtn){let o=this.metricsCopyBtn.innerHTML;this.metricsCopyBtn.innerHTML="\u2713 Copiado!",setTimeout(()=>{this.metricsCopyBtn.innerHTML=o},1500)}})}destroy(){this.stopStopwatch(),this.stopQuestionTimer(),this.autopilot.stop(),this.applyHostDarkMode(!1),this.callbacks.onDestroy(),this.host.remove()}};function Ma(){try{if(typeof document>"u"||!document.head||document.querySelector("link[data-easyquiz-preconnect]"))return;let a=document.createElement("link");a.rel="preconnect",a.href="https://generativelanguage.googleapis.com",a.crossOrigin="anonymous",a.setAttribute("data-easyquiz-preconnect","true"),document.head.appendChild(a);let e=document.createElement("link");e.rel="dns-prefetch",e.href="https://generativelanguage.googleapis.com",e.setAttribute("data-easyquiz-preconnect","true"),document.head.appendChild(e)}catch{}}async function Ia(){let a=window;if(Ce(),Ma(),a.__easyquiz){try{a.__easyquiz.destroy()}catch{}try{document.getElementById("easyquiz-shadow-root")?.remove()}catch{}}let e=Qe(),t=null,o=null,l=0,n=new Fe(e,{onAnalyze:(c=1,u,b=!1)=>r(c,u,b),onApply:(c=1)=>void s(c),onDestroy:()=>{if(o){try{o.abort()}catch{}o=null}he(),delete a.__easyquiz},onCancel:()=>{if(o){try{o.abort()}catch{}o=null}he(),n.setProgress(0),n.setInterrupted("Opera\xE7\xE3o cancelada imediatamente pelo usu\xE1rio.")},onSettingsChange:c=>{e=xt(c)}});a.__easyquiz={toggle:()=>n.toggle(),destroy:()=>n.destroy(),analyze:async()=>{await r()}},window.addEventListener("keydown",c=>{if(c.altKey&&(c.key==="q"||c.key==="Q")){if(c.preventDefault(),!n)return;n.toggle(!0),r()}});async function r(c=1,u,b=!1){if(!e.apiKey){n.setStatus("Configure sua chave de API Gemini acima para come\xE7ar.","error"),n.toggle(!0);return}if(o)try{o.abort()}catch{}o=new AbortController;let d=o,m=()=>{try{d.abort()}catch{}};if(u&&(u.aborted?d.abort():u.addEventListener("abort",m,{once:!0})),d.signal.aborted){n.setBusy(!1),n.setProgress(0);return}l=Date.now(),n.setBusy(!0,"Identificando o bloco da quest\xE3o ativa na p\xE1gina..."),n.setProgress(20,"Varrendo escopo do DOM e controles..."),he(),n.hideFloatingAnswers();try{let p=ve(!1);p||(n.setStatus("Nenhum controle detectado. Tentando captura de tela inteira...","info"),p=pe()),pt(p.scope),n.updateContext(p),n.logToConsole(`> [DOM] Escopo: <${p.scope.tagName.toLowerCase()}> com ${p.controls.length} controle(s) e ${p.questionText.length} caracteres.`,"text-blue"),n.setStatus(`Quest\xE3o localizada (${p.controls.length} controles). Preparando an\xE1lise...`,"info"),n.setProgress(40,`Consultando Gemini (${e.model})...`);let f=await ft(p.scope,e.useVision);if(f.length>0){let C=f.map(L=>L.element).filter(Boolean);ut(C),n.updateImages(f)}if(d.signal.aborted)return;let y=e.model;n.setStatus(f.length>0?`Consultando Gemini (${y}) com ${f.length} imagem(ns) anexada(s)...`:`Consultando Gemini (${y}) via DOM nativo (modo r\xE1pido)...`,"info");let h=Te(p,f,e);n.setInspectorPrompt(h,e.model);let g=(C,L)=>{n.setStatus(C,L==="warning"?"info":L);let S=C.match(/Onda\s+\d+.*?\[([^\]]+)\]/);if(S){let x=S[1].split(",")[0].trim();n.setProgress(50,`Gemini ${x} respondendo...`)}},{plan:v,usedModel:w}=await Re(p,f,e,g,d.signal);if(d.signal.aborted)return;if(v.needsMoreContext){if(n.setProgress(55,"Ampliando escopo da quest\xE3o..."),n.setStatus("Enunciado ou contexto isolado detectado pela IA. Acionando Sele\xE7\xE3o Geral Expandida...","info"),n.logToConsole("> [DOM] Enunciado isolado. Ampliando escopo para sele\xE7\xE3o expandida...","text-blue"),p=ve(!0),p||(p=pe()),pt(p.scope),n.updateContext(p),f=await ft(p.scope,e.useVision),f.length>0){let S=f.map(x=>x.element).filter(Boolean);ut(S),n.updateImages(f)}n.setStatus(`Reconsultando IA com escopo ampliado (${p.controls.length} controles)...`,"info");let C=Te(p,f,e);n.setInspectorPrompt(C,e.model),v=(await Re(p,f,e,g,d.signal)).plan}if(d.signal.aborted)return;if(n.setProgress(70,"Resposta recebida da IA! Processando plano..."),n.logToConsole(`> [IA] Modelo: ${w||e.model} | Modo: ${v.mode} | Confian\xE7a: ${(v.confidence*100).toFixed(0)}%`,"text-green"),v.rationale&&n.logToConsole(`> [IA] Racioc\xEDnio: "${v.rationale}"`,"text-blue"),n.logToConsole(`> [IA] ${v.actions.length} a\xE7\xE3o(\xF5es) prescritas no plano.`,"text-blue"),v.memoryToStore&&(wt(v.memoryToStore),n.logToConsole(`> [RAG] \u{1F9E0} Nova mem\xF3ria te\xF3rica salva na sess\xE3o: "${v.memoryToStore}"`,"text-yellow")),v.imageDescriptions&&v.imageDescriptions.length>0){n.logToConsole(`> [VISION] \u{1F5BC}\uFE0F An\xE1lise de ${v.imageDescriptions.length} imagem(ns) pela IA:`,"text-blue");for(let C of v.imageDescriptions){let L=C.relevant?"\u2705":"\u26A0\uFE0F";n.logToConsole(`>   ${L} Imagem ${C.index+1} [${C.relevant?"RELEVANTE":"IGNORADA"}]: ${C.description}`,C.relevant?"text-blue":"text-yellow")}}return t=v,n.updateContext(p,v),Kt(v.actions,v.confidence),n.setPlan(v,!e.dryRun),v.pageType==="conclusion"?(n.setProgress(100,"Atividade conclu\xEDda!"),n.setStatus("Atividade conclu\xEDda ou tela final detectada pela IA.","success")):v.pageType==="info"?(n.setProgress(100,"Contexto absorvido na mem\xF3ria!"),n.setStatus("\u{1F4D8} Conte\xFAdo de contexto absorvido na mem\xF3ria RAG. Avan\xE7ando...","success")):v.pageType==="start"?(n.setProgress(100,"In\xEDcio detectado!"),n.setStatus("In\xEDcio de atividade detectado. Iniciando...","info")):(n.setProgress(80,"Plano de resolu\xE7\xE3o pronto!"),n.setStatus(e.dryRun?"Simula\xE7\xE3o conclu\xEDda. As respostas foram real\xE7adas na p\xE1gina sem altera\xE7\xE3o.":"Resolu\xE7\xE3o pronta! Verifique o realce na tela e aplique quando desejar.","success")),e.dryRun&&v.pageType==="question"&&n.showFloatingAnswers(v),d.signal.aborted?void 0:((b||e.autoApply)&&!e.dryRun&&await s(c,d.signal,b),v)}catch(p){if(d.signal.aborted||p instanceof Error&&(p.name==="AbortError"||p.message.includes("cancelada"))){he(),n.setProgress(0),n.setInterrupted("Opera\xE7\xE3o cancelada pelo usu\xE1rio.");return}he(),n.setProgress(0);let f=p instanceof Error?p.message:"Falha desconhecida na an\xE1lise.";n.setStatus(f,"error"),n.setErrorDiagnostic(f,"An\xE1lise da IA");return}finally{u?.removeEventListener("abort",m),o===d&&(o=null),d.signal.aborted||n.setBusy(!1)}}async function s(c=1,u,b=!1){if(u?.aborted)return;if(!t){n.setStatus("Nenhum plano dispon\xEDvel para aplicar. Execute a an\xE1lise primeiro.","error");return}if(e.dryRun){n.setStatus("O modo de simula\xE7\xE3o est\xE1 ativo. Desmarque para poder aplicar.","error");return}let d=t.pageType==="info"||t.pageType==="start",m=(b||e.autoAdvance||d)&&t.confidence>=e.confidenceThreshold&&!t.needsMoreContext;n.setBusy(!0,"Aplicando respostas no formul\xE1rio..."),n.setProgress(85,`Aplicando ${t.actions.length} a\xE7\xE3o(\xF5es) no formul\xE1rio...`),n.logToConsole(`> [EXEC] Iniciando aplica\xE7\xE3o com 6 vias de persist\xEAncia para ${t.actions.length} a\xE7\xE3o(\xF5es)...`,"text-blue");try{let p=await Me(t,m,c,ue(e));if(u?.aborted)return;if(n.setExecutionReport(p),p.failedActions&&p.failedActions.length>0){n.logToConsole(`> [REPLAN] \u26A0\uFE0F ${p.failedActions.length} a\xE7\xE3o(\xF5es) n\xE3o verificadas no DOM. Iniciando replanejamento...`,"text-yellow");for(let v of p.failedActions){let w=v.action,C=w.t==="drag"?`drag: "${w.from}" \u2192 "${w.to}"`:w.t==="clk"||w.t==="chk"?`${w.t}: "${w.id}"`:w.t==="val"?`val: "${w.id}" = "${w.v}"`:JSON.stringify(w).slice(0,80);n.logToConsole(`>   \u2717 [${w.t.toUpperCase()}] ${C} | ${v.evidence.slice(0,80)}`,"text-yellow")}await i(p.failedActions,u)}let f=l>0?Date.now()-l:1200,y=p.verified>0,h=p.applied>0;if(p.success||y&&h){n.setProgress(100,"Sucesso! Resposta preenchida."),n.logToConsole(`> [DOM] \u2713 ${p.applied} a\xE7\xE3o(\xF5es) aplicada(s) \u2014 ${p.verified} verificada(s) no DOM.`,"text-green"),p.advanced?n.logToConsole("> [NAV] \u2713 Bot\xE3o de confirma\xE7\xE3o/avan\xE7o acionado com sucesso!","text-green"):m&&n.logToConsole(`> [NAV] ${p.navigationEvidence}`,"text-blue"),n.setStatus(p.advanced?`Sucesso: ${p.applied} resposta(s) preenchida(s) e avan\xE7ando.`:`Resposta aplicada na p\xE1gina (${p.applied} a\xE7\xE3o(\xF5es)).`,"success"),n.hideFloatingAnswers();let v=qt({id:`q-${Date.now()}`,questionIndex:(qe().records.length||0)+1,questionTitle:t.rationale?t.rationale.slice(0,45)+"...":`Quest\xE3o ${t.mode||"Auto"}`,durationMs:f,status:"answered",mode:t.mode,actionsCount:p.applied});n.updateTimingMetrics(v)}else h?(n.setProgress(75,"Resposta aplicada (verifica\xE7\xE3o incerta)."),n.logToConsole(`> [DOM] \u26A0\uFE0F ${p.applied} a\xE7\xE3o(\xF5es) disparadas mas sem confirma\xE7\xE3o DOM clara. Pendentes: ${p.failed.join(", ")||"nenhuma"}`,"text-yellow"),n.setStatus(`Resposta preenchida (${p.applied} a\xE7\xE3o(\xF5es) aplicadas, verifica\xE7\xE3o incerta).`,"warning")):(n.setProgress(0,"Alvo de resposta n\xE3o localizado."),n.logToConsole(`> [DOM] Alerta: nenhum controle de resposta foi modificado no DOM. Pend\xEAncias: ${p.failed.join(", ")||"nenhuma a\xE7\xE3o"}.`,"text-yellow"),n.setStatus("Controle de resposta n\xE3o encontrado na p\xE1gina. Use o bot\xE3o Gabarito no painel se desejar.","warning"),e.dryRun&&n.showFloatingAnswers(t))}catch(p){n.setProgress(0);let f=p instanceof Error?p.message:"Falha ao aplicar plano.";n.setStatus(`Erro ao aplicar: ${f}`,"error"),n.logToConsole(`> [ERRO] ${f}`,"text-red")}finally{n.setBusy(!1)}}async function i(c,u){if(!t)return;let b=c.filter(m=>m.action.t==="drag");for(let m of b){if(u?.aborted)return;let p=m.action,f=String(p.from||""),y=String(p.to||""),h=Bt(f,y,f,y);n.logToConsole(`> [REPLAN] \u{1F527} Drag JS fallback: "${f}" \u2192 "${y}"`,"text-blue");let g={...t,actions:[{t:"js",v:h}],pageType:"question"},v=await Me(g,!1,1,ue(e));n.logToConsole(v.applied>0?"> [REPLAN] \u2705 Drag fallback aplicado!":"> [REPLAN] \u2717 Drag fallback sem efeito.",v.applied>0?"text-green":"text-yellow")}let d=c.filter(m=>m.action.t!=="drag");if(d.length!==0&&!u?.aborted){n.logToConsole(`> [REPLAN] \u{1F504} ${d.length} a\xE7\xE3o(\xF5es) pendente(s) \u2014 iniciando pipeline de recupera\xE7\xE3o multi-estrat\xE9gia...`,"text-blue");for(let m of d){if(u?.aborted)return;let p=m.action,f=p.t==="clk"||p.t==="chk"?`${p.t}: "${p.id}"`:p.t==="val"?`val: "${p.id}" = "${p.v}"`:p.t==="sel"?`sel: "${p.id}" = "${Array.isArray(p.v)?p.v[0]:p.v}"`:JSON.stringify(p).slice(0,60);n.logToConsole(`> [REPLAN] \u26A1 Recuperando: ${f}`,"text-blue");let y=String(p.id||p.name||p.selector||""),h=p.v!==void 0?String(p.v):"";n.logToConsole("> [REPLAN] Estrat\xE9gia 1: rota alternativa padr\xE3o...","text-blue");try{if(await _e(m.action),await new Promise(g=>setTimeout(g,250)),Z(m.action)){n.logToConsole(`> [REPLAN] \u2705 Estrat\xE9gia 1 OK: ${f}`,"text-green");continue}}catch{}if(p.t==="clk"||p.t==="chk"){n.logToConsole("> [REPLAN] Estrat\xE9gia 2: script injection (bypass isTrusted)...","text-blue");try{let g=I(y,h)||I(y.replace(/[^\w\s]/g," ").trim(),h);if(g&&(ct(g),await new Promise(v=>setTimeout(v,300)),Z(m.action))){n.logToConsole(`> [REPLAN] \u2705 Estrat\xE9gia 2 OK: ${f}`,"text-green");continue}}catch{}}if(p.t==="clk"||p.t==="chk"){n.logToConsole("> [REPLAN] Estrat\xE9gia 3: simula\xE7\xE3o de teclado (Tab+Space)...","text-blue");try{let g=I(y,h)||I(y.replace(/[^\w\s]/g," ").trim(),h);if(g&&(g.focus?.(),await new Promise(v=>setTimeout(v,50)),g.dispatchEvent(new KeyboardEvent("keydown",{key:" ",code:"Space",keyCode:32,bubbles:!0,cancelable:!0})),g.dispatchEvent(new KeyboardEvent("keyup",{key:" ",code:"Space",keyCode:32,bubbles:!0,cancelable:!0})),await new Promise(v=>setTimeout(v,80)),g.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0,cancelable:!0})),g.dispatchEvent(new KeyboardEvent("keyup",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0,cancelable:!0})),await new Promise(v=>setTimeout(v,200)),Z(m.action))){n.logToConsole(`> [REPLAN] \u2705 Estrat\xE9gia 3 OK: ${f}`,"text-green");continue}}catch{}}if(p.t==="clk"||p.t==="chk"||p.t==="val"){n.logToConsole("> [REPLAN] Estrat\xE9gia 4: internals Vue/React via script injection...","text-blue");try{let g=I(y,h)||I(y.replace(/[^\w\s]/g," ").trim(),h);if(g){let v=g.id,w=!!v;v||(v=`__eq_s4_${Math.random().toString(36).slice(2,8)}`,g.id=v);let C=String(p.v??""),L=p.t==="val",S=document.createElement("script");if(S.textContent=`(function(){
              var el=document.getElementById(${JSON.stringify(v)});
              if(!el)return;
              // Tenta Vue 3 update trigger
              try{if(el.__vueParentComponent){var ins=el.__vueParentComponent;var pr=ins.props||{};if(pr.modelValue!==undefined&&typeof ins.emit==='function'){ins.emit('update:modelValue',${L?JSON.stringify(C):"true"});}}}catch(e){}
              // Tenta React setState via fiber
              try{var fk=Object.keys(el).find(function(k){return k.startsWith('__reactFiber');});
              if(fk){var fb=el[fk];while(fb){var p=fb.memoizedProps||{};
              if(typeof p.onChange==='function')try{p.onChange({target:el,currentTarget:el,type:'change',bubbles:true,preventDefault:function(){},stopPropagation:function(){}});}catch(e){}
              if(typeof p.onInput==='function')try{p.onInput({target:el,currentTarget:el,type:'input',bubbles:true,preventDefault:function(){},stopPropagation:function(){}});}catch(e){}
              fb=fb.return;}}}catch(e){}
            })()`.replace(/\n\s+/g,""),document.head.appendChild(S),S.remove(),w||setTimeout(()=>{try{g.id===v&&g.removeAttribute("id")}catch{}},0),await new Promise(x=>setTimeout(x,300)),Z(m.action)){n.logToConsole(`> [REPLAN] \u2705 Estrat\xE9gia 4 OK: ${f}`,"text-green");continue}}}catch{}}if(u?.aborted)return;n.logToConsole("> [REPLAN] Estrat\xE9gia 5: re-consulta IA com diagn\xF3stico focado...","text-blue");try{let g="";try{let E=document.querySelector(`[data-easyquiz-id="${p.id}"]`)||document.getElementById(p.id||"")||Array.from(document.querySelectorAll('input, button, [role="radio"], [role="checkbox"], [role="option"]')).find(H=>(H.textContent||"").toLowerCase().includes(String(p.id||"").toLowerCase().slice(0,20)));E&&(g=E.outerHTML.slice(0,400))}catch{}let v=ve(!1)||pe(),w=`A\xE7\xE3o (${p.t}) alvo="${y}" valor="${p.v||p.c||""}" \u2014 Falha: "${m.evidence.slice(0,80)}"${g?`
HTML do alvo: ${g}`:""}`,C=m.strategiesAttempted?[m.strategiesAttempted].flat().concat(["alternative-path","injectScript","keyboard","vue-react-internals"]):["alternative-path","injectScript","keyboard","vue-react-internals"],L=`[REPLANEJAMENTO URGENTE \u2014 TENTATIVA FINAL]
A seguinte a\xE7\xE3o falhou ap\xF3s ${C.length} estrat\xE9gias autom\xE1ticas: ${C.join(", ")}.

${w}

Contexto atual da quest\xE3o:
${v?.questionText.slice(0,400)||"N/A"}

Controles dispon\xEDveis:
${JSON.stringify((v?.controls||[]).slice(0,6).map(E=>({id:E.id,type:E.type,label:E.label,options:E.options?.slice(0,3)})),null,2)}

TAREFA: Gere APENAS a\xE7\xF5es {t:"js"} com JavaScript criativo e robusto que consiga marcar/preencher/clicar o controle correto. 
Tente usar: document.querySelector, getComputedStyle, querySelectorAll com seletores diferentes, ou manipula\xE7\xE3o DOM direta.
Voc\xEA pode tentar m\xFAltiplas abordagens em um \xFAnico bloco JS. Seja criativo.
N\xC3O repita as estrat\xE9gias j\xE1 tentadas acima.`,S={...v,questionText:L},x=await Re(S,[],{...e},E=>n.logToConsole(`> [REPLAN-AI] ${E}`,"text-blue"),u);if(u?.aborted||!x?.plan){n.logToConsole("> [REPLAN] \u2717 Re-consulta n\xE3o retornou plano.","text-yellow");continue}let T=x.plan.actions.filter(E=>E.t==="js");if(T.length===0){n.logToConsole("> [REPLAN] \u2139\uFE0F IA n\xE3o gerou a\xE7\xF5es JS de fallback.","text-yellow");continue}n.logToConsole(`> [REPLAN] \u{1F916} IA gerou ${T.length} a\xE7\xE3o(\xF5es) JS custom. Executando...`,"text-blue");let M={...t,actions:T,pageType:"question"},$=await Me(M,!1,1,ue(e));$.applied>0?n.logToConsole(`> [REPLAN] \u2705 Estrat\xE9gia 5 OK: ${$.applied} a\xE7\xE3o(\xF5es) JS executada(s)!`,"text-green"):n.logToConsole("> [REPLAN] \u2717 Todas as estrat\xE9gias esgotadas para esta a\xE7\xE3o.","text-yellow")}catch(g){n.logToConsole(`> [REPLAN] Erro na re-consulta: ${g instanceof Error?g.message:String(g)}`,"text-yellow")}}}}n.toggle(!0)}Ia().catch(a=>{console.error("[EasyQuiz] Erro fatal na inicializa\xE7\xE3o:",a),window.alert(`EasyQuiz: falha ao iniciar: ${a instanceof Error?a.message:String(a)}`)});})();
