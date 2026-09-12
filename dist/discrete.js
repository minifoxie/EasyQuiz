/* EasyQuiz Discreto v1.0.0 — Modo Stealth sem interface
 * 100% Client-side. Direct Google Gemini REST API.
 */
"use strict";(()=>{var ae={apiKey:"",apiKeys:[],model:"gemini-3.5-flash-lite",uiMode:"easy",modeHint:"",engine:"smart",dryRun:!1,autoApply:!0,autoAdvance:!1,hostDarkMode:!0,useVision:!0,confidenceThreshold:.8};function le(t){if(!t||typeof t!="string")return!1;let e=t.toLowerCase().trim().replace(/^models\//,"");if(!e.includes("gemini"))return!1;let n=["imagen","image","veo","omni","video","embedding","embed","tts","audio","speech","voice","sound","live","transcribe","bidi","aqa","learnlm","deep-research","computer-use","robotics","rt-1","rt-2","mediapipe","cyber","latest","-ultra","experimental"];for(let o of n)if(e.includes(o))return!1;return!(!e.includes("flash")&&!e.includes("pro"))}var lt="easyquiz_settings_v2",rt="easyquiz_activity_metrics";function te(){try{let t=localStorage.getItem(lt);if(!t){let s=localStorage.getItem("easyquiz_settings_v1");if(s){let r=JSON.parse(s);return{...ae,apiKey:r.apiKey||""}}return{...ae}}let e=JSON.parse(t),n=typeof e.model=="string"&&le(e.model)?e.model:ae.model,o=Array.isArray(e.apiKeys)?e.apiKeys.map(s=>typeof s=="string"?s.trim().replace(/^["']|["']$/g,""):"").filter(s=>s.length>5):[],i=typeof e.apiKey=="string"?e.apiKey.trim().replace(/^["']|["']$/g,""):"";return o.length===0&&i&&(o=[i]),{apiKey:o[0]||i||ae.apiKey,apiKeys:o,model:n,uiMode:e.uiMode==="easy"||e.uiMode==="advanced"?e.uiMode:ae.uiMode,modeHint:e.modeHint??"",engine:e.engine??"smart",dryRun:!!e.dryRun,autoApply:e.autoApply!==void 0?!!e.autoApply:!0,autoAdvance:!!e.autoAdvance,hostDarkMode:e.hostDarkMode!==void 0?!!e.hostDarkMode:!0,useVision:e.useVision!==void 0?!!e.useVision:ae.useVision,confidenceThreshold:typeof e.confidenceThreshold=="number"?e.confidenceThreshold:ae.confidenceThreshold}}catch{return{...ae}}}function Ne(t){try{let e=localStorage.getItem("eq_domain_cache_"+t);if(!e)return{};let n=JSON.parse(e);if(n.advanceSelector&&/inject|injetar/i.test(n.advanceSelector)){n.advanceSelector=void 0;try{localStorage.removeItem("eq_domain_cache_"+t)}catch{}}return n}catch{return{}}}function ze(t,e){if(e.advanceSelector&&/inject|injetar/i.test(e.advanceSelector))return;let o={...Ne(t),...e};try{localStorage.setItem("eq_domain_cache_"+t,JSON.stringify(o))}catch(i){console.warn("[EasyQuiz] Erro cache de dominio:",i)}}function ge(t){let e=te(),n=Array.isArray(t.apiKeys)?t.apiKeys.map(a=>typeof a=="string"?a.trim().replace(/^["']|["']$/g,""):"").filter(a=>a.length>5):e.apiKeys,o;typeof t.apiKey=="string"?o=t.apiKey.trim().replace(/^["']|["']$/g,""):Array.isArray(t.apiKeys)&&t.apiKeys.length>0?o=n[0]||"":o=e.apiKey,o&&!n.includes(o)&&(n=[o,...n]),n.length>0&&(!o||!n.includes(o))&&(o=n[0]);let i={...e,...t,apiKey:o,apiKeys:n};try{localStorage.setItem(lt,JSON.stringify(i))}catch(a){console.warn("[EasyQuiz] Falha ao persistir configura\xE7\xF5es no localStorage:",a)}return i}var ue=[],st=12,Ft=1200;function dt(t){let e=t.trim().replace(/\s+/g," ").slice(0,Ft);e&&!ue.includes(e)&&(ue.push(e),ue.length>st&&(ue=ue.slice(-st)))}function ut(){return ue}function pt(){return{startTime:Date.now(),totalElapsedMs:0,completedQuestionsCount:0,averageDurationMs:0,records:[]}}var ct=pt();function mt(){ct=pt();try{sessionStorage.removeItem(rt),localStorage.removeItem(rt)}catch{}return ct}var xe=`Voc\xEA \xE9 o motor operacional inteligente do EasyQuiz. Sa\xEDda EXCLUSIVA em JSON minificado, sem markdown, sem coment\xE1rios, sem texto fora do JSON.

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
`;function Bt(t,e){return/forms\.(google|gle)\.com|docs\.google\.com\/forms/i.test(t)||e.includes("Qr7Oae")||e.includes("freebirdFormviewer")||e.includes("data-item-id")?"[PLATAFORMA: Google Forms \u2014 use clk nos containers de alternativa; IDs via data-item-id ou texto da op\xE7\xE3o]":/wayground|quizizz/i.test(t)||e.includes("data-functional-selector")?e.includes("classification")||e.toLowerCase().includes("fato")||e.toLowerCase().includes("opini")?`[PLATAFORMA: Wayground/Quizizz CLASSIFICA\xC7\xC3O drag-and-drop]
[RESPOSTAS] ter\xE1 items com t="draggable" e id hexadecimal (ex: 695fa5b6...).
Use EXCLUSIVAMENTE: {t:"drag", from:"ID_hexadecimal_do_card", to:"NOME_DA_CATEGORIA"}
Exemplo: {t:"drag",from:"695fa5b69885555d8155a5ac",to:"FATO"}
Classifique TODOS os items (1 drag por item) antes de emitir adv.
mode: "arrastar_soltar"`:"[PLATAFORMA: Wayground/Quizizz \u2014 alternativas s\xE3o cards clic\xE1veis, use clk]":/khanacademy\.org/i.test(t)||e.includes("perseus")?"[PLATAFORMA: Khan Academy \u2014 widgets Perseus; use js via $eq para widgets interativos se necess\xE1rio]":/moodle|ava\.|classroom\.google/i.test(t)?"[PLATAFORMA: Moodle/AVA/Classroom \u2014 formul\xE1rios padr\xE3o]":/duolingo/i.test(t)?"[PLATAFORMA: Duolingo \u2014 tiles clic\xE1veis, use clk por texto]":/blackboard|canvas\.instructure/i.test(t)?"[PLATAFORMA: Canvas/Blackboard \u2014 quiz-question padr\xE3o]":/socrative|kahoot/i.test(t)?"[PLATAFORMA: Socrative/Kahoot \u2014 alternativas s\xE3o bot\xF5es, use clk]":""}function Fe(t,e,n){let o=t.htmlSnippet.includes("draggable")||t.htmlSnippet.includes("perseus")||t.htmlSnippet.includes("category")||t.htmlSnippet.includes("dropzone")||t.controls.some(y=>y.type==="draggable"||y.type==="dropzone"),i=/katex|latex|\\frac|\\sqrt/i.test(t.htmlSnippet),a=/forms\.(google|gle)\.com|docs\.google\.com\/forms/i.test(t.sourceUrl)||t.htmlSnippet.includes("Qr7Oae")||t.htmlSnippet.includes("data-item-id")||t.htmlSnippet.includes("freebirdFormviewer"),s=(/wayground|quizizz/i.test(t.sourceUrl)||t.htmlSnippet.includes("data-functional-selector"))&&(t.htmlSnippet.includes("classification")||t.controls.filter(y=>y.role==="answer").length===0),r=t.controls.filter(y=>y.role!=="navigation").length===0,l=r||o||a||s||i&&t.questionText.length<60,d=r?4500:s?6e3:1800,u=l?`
[HTML]:
${t.htmlSnippet.slice(0,d).replace(/\s+/g," ")}`:"",f="";if(r&&typeof document<"u")try{let y=Array.from(document.querySelectorAll('input:not([type=hidden]), textarea, select, button, [role="button"], [role="radio"], [role="checkbox"], [role="option"], [onclick], [data-action], a[href]:not([href="#"]), [tabindex]:not([tabindex="-1"])')).filter(_=>{let E=_,x=E.getBoundingClientRect?.()||{width:0,height:0};return x.width>0&&x.height>0&&!E.closest("#easyquiz-shadow-root, .eq-sidebar")}).slice(0,40).map(_=>{let E=_,x=E.tagName.toLowerCase(),A=E.id?`#${E.id}`:"",$=E.className&&typeof E.className=="string"?`.${E.className.trim().split(/\s+/).slice(0,2).join(".")}`:"",z=(E.textContent||E.value||E.getAttribute("aria-label")||"").trim().slice(0,60),v=E.getAttribute("type")||E.getAttribute("role")||"";return`${x}${A}${$}[${v}] txt="${z}"`});y.length>0&&(f=`
[DOM-INTERATIVO]:
${y.join(`
`)}`)}catch{}let c=ut(),p=c.length>0?`
[MEM\xD3RIA]:
${c.join(" | ")}
`:"",m=t.controls.filter(y=>y.role!=="navigation"),g=t.controls.filter(y=>y.role==="navigation"),h=Bt(t.sourceUrl,t.htmlSnippet),b=h?`
${h}
`:"";return`--- AN\xC1LISE ---
[MODO]: ${n.engine} | Dica: ${n.modeHint||"Auto"}
[URL]: ${t.sourceUrl}
[P\xC1GINA]: ${t.pageTitle}${p}${b}
[DADOS]
[TEXTO]:
${t.questionText}${u}${f}

[RESPOSTAS]:
${(()=>{if(m.length===0)return"Nenhuma";let y=m.filter(S=>S.type==="checkbox"||S.type==="chk"),_=new Set(m.filter(S=>S.type==="radio").map(S=>S.name).filter(Boolean)),E=y.filter(S=>!S.name||!_.has(S.name)),x=/selecione as|assinale as|quais das|todas as|marque as|escolha as|quais dessas|quais dos/i.test(t.questionText),A=E.length>=2||x,$=_.size>1||/verdadeir|fals[oa]|\bv\s*\/\s*f\b|julgue|itens/i.test(t.questionText)&&_.size>=1,z=m.every(S=>S.type==="radio"||S.type==="chk")&&_.size===1&&!A&&!$,v=m.filter(S=>S.type==="text"||S.type==="number"||S.type==="val"||S.tag==="input"||S.tag==="textarea"),k=v.length>=2;return($?`[GRADE VERDADEIRO/FALSO (${_.size||"m\xFAltiplas"} afirma\xE7\xF5es): voc\xEA DEVE julgar e marcar exatamente 1 op\xE7\xE3o (V ou F) para CADA uma das ${_.size} afirma\xE7\xF5es \u2014 emita ${_.size} a\xE7\xF5es chk separadas + adv]
`:A?`[MULTI-SELE\xC7\xC3O: marque TODOS os corretos, pode ser 2 ou mais]
`:z?`[ESCOLHA-\xDAnica: marque APENAS 1 op\xE7\xE3o]
`:k?`[M\xDALTIPLOS CAMPOS DE PREENCHIMENTO (${v.length} campos): emita uma a\xE7\xE3o val para CADA um dos ${v.length} campos abaixo com seu id exato]
`:"")+JSON.stringify(m.map(S=>({id:S.id,t:S.type,n:S.name||void 0,txt:S.label?S.label.length>160?S.label.slice(0,160)+"...":S.label:void 0,v:S.value||void 0,opt:S.options&&S.options.length?S.options.slice(0,20).map(M=>M.label||M.value):void 0})))})()}

[NAVEGA\xC7\xC3O]:
${g.length>0?g.map(y=>`"${y.label||y.id}"[${y.type}]`).join(","):"Nenhuma"}

[IMAGENS E GR\xC1FICOS ANEXADOS (${e.length})]:
${e.length===0?"Nenhum anexo visual.":e.map((y,_)=>{let E=y.associatedLabel||"Gr\xE1fico da Quest\xE3o",x=y.alt?` | alt: "${y.alt}"`:"";if(y.captureStatus==="text_only")return`  - Imagem ${_+1} [CONTEXTO_TEXTUAL]: ${E}${x} | ${y.textContext||"sem contexto adicional"}`;if(y.captureStatus==="captured"||y.base64){let A=y.textContext?` | Textos e r\xF3tulos do gr\xE1fico: "${y.textContext}"`:"";return`  - Imagem ${_+1} [VISUAL_INLINE]: ${E}${x}${A}`}return`  - Imagem ${_+1} [FALHOU]: ${E}${x}`}).join(`
`)}
[/DADOS]
Sa\xEDda em JSON v\xE1lido.`}var Ut=new Set(["question","info","start","conclusion"]),Kt=new Set(["texto_livre","escolha_unica","escolha_multipla","verdadeiro_falso","preenchimento","acao_sem_resposta","categorizacao","ordenacao","arrastar_soltar"]),jt=new Set(["val","chk","sel","clk","adv","js","drag"]),Vt=150,he=2e3;function Q(t,e=""){return t==null?e:typeof t=="string"?t.trim().slice(0,he):typeof t=="number"||typeof t=="boolean"?String(t).trim().slice(0,he):e}function Gt(t,e){if(!t||typeof t!="object")return null;let n=t,o=n.t;if(typeof o!="string"||!jt.has(o))return null;if(o==="adv"){let r=n.id??n.target??n.name??n.selector;return{t:"adv",...Q(r)?{id:Q(r,"").slice(0,500)}:{}}}if(o==="drag"){let r=Q(n.from??n.source),l=Q(n.to??n.target??n.destination);return!r||!l?null:{t:"drag",from:r.slice(0,500),to:l.slice(0,500)}}if(o==="js"){let r=Q(n.v??n.code??n.script);return!r||r.length>8e3?null:{t:"js",v:r}}let i=n.id??n.target??n.name??n.selector??n.element;(i==null||i==="")&&o==="val"&&(i="1");let a=Q(i).slice(0,500);if(!a)return null;if(o==="val"){let r=n.v!==void 0?n.v:n.value!==void 0?n.value:n.val!==void 0?n.val:n.text!==void 0?n.text:n.answer;return{t:"val",id:a,v:Q(r).slice(0,he)}}if(o==="sel"){let r=n.v!==void 0?n.v:n.value!==void 0?n.value:n.val!==void 0?n.val:n.values,d=(Array.isArray(r)?r:[r]).map(u=>Q(u).slice(0,500)).filter(Boolean);return{t:"sel",id:a,v:d}}if(o==="chk"){let r=n.c===!1||n.c==="false"||n.c===0||n.c==="0"||n.c==="off"||n.c==="unchecked"||n.c==="desmarcar",l={t:"chk",id:a,c:!r};return n.v!==void 0&&(l.v=Q(n.v).slice(0,he)),l}let s={t:"clk",id:a};if(n.c!==void 0){let r=n.c===!1||n.c==="false"||n.c===0||n.c==="0"||n.c==="off"||n.c==="unchecked"||n.c==="desmarcar";s.c=!r}return n.v!==void 0&&(s.v=Q(n.v).slice(0,he)),Array.isArray(n.co)&&n.co.length===2&&n.co.every(r=>typeof r=="number"&&Number.isFinite(r))&&(s.co=[n.co[0],n.co[1]]),s}function Wt(t,e,n){if(n!=="question")return t;let o=t.filter(a=>a.t==="adv"),i=t.filter(a=>a.t!=="adv");if(e==="escolha_unica"){i=i.filter(s=>!(s.t==="chk"&&s.c===!1||s.t==="clk"&&s.c===!1));let a=i.filter(s=>s.t==="chk"||s.t==="clk");if(a.length>1){let s=i.filter(l=>l.t!=="chk"&&l.t!=="clk"),r=a[a.length-1];i=[...s,r]}}else if(e==="escolha_multipla"){i=i.filter(s=>!(s.t==="chk"&&s.c===!1||s.t==="clk"&&s.c===!1));let a=new Set;i=i.filter(s=>{let r="id"in s&&typeof s.id=="string"?s.id:"";return r?a.has(r)?!1:(a.add(r),!0):!0})}else if(e==="verdadeiro_falso"){let a=new Set,s=[...i].reverse(),r=[];for(let l of s){let d="id"in l&&typeof l.id=="string"?l.id:"";d?a.has(d)||(a.add(d),r.push(l)):r.push(l)}i=r.reverse()}return[...i,...o]}function ft(t){if(!t||typeof t!="object")return{pageType:"info",mode:"acao_sem_resposta",confidence:.5,rationale:"Resposta estruturada n\xE3o identificada; avan\xE7ando como informativo.",actions:[{t:"adv"}]};let e=t,n=e.pageType,o=e.mode;(typeof n!="string"||!Ut.has(n))&&(n="question"),(typeof o!="string"||!Kt.has(o))&&(o="escolha_unica");let i=Array.isArray(e.actions)?e.actions:[],a=[];for(let l=0;l<Math.min(i.length,Vt);l++){let d=Gt(i[l],l);d&&a.push(d)}a.some(l=>l.t==="val")&&(o==="escolha_unica"||!e.mode)&&(o="preenchimento"),a.some(l=>l.t==="drag")&&!["categorizacao","arrastar_soltar","ordenacao"].includes(o)&&(o="arrastar_soltar"),a=Wt(a,o,n);let s=a.some(l=>l.t==="adv");n==="conclusion"?a.length=0:n==="info"||n==="start"?s||a.push({t:"adv"}):n==="question"&&!s&&a.push({t:"adv"});let r=typeof e.confidence=="number"&&Number.isFinite(e.confidence)?Math.min(1,Math.max(0,e.confidence)):.85;return{pageType:n,mode:o,confidence:r,rationale:Q(e.rationale,"Plano validado e auto-recuperado."),actions:a,...Q(e.memoryToStore)?{memoryToStore:Q(e.memoryToStore)}:{},...e.needsMoreContext?{needsMoreContext:!!e.needsMoreContext}:{}}}var ne=class{keys=new Map;constructor(e=[]){this.init(e)}init(e){let n=new Map(this.keys);this.keys.clear();let o=e.flatMap(a=>a.split(/[\n\r]+/));Array.from(new Set(o.map(a=>a.trim().replace(/^["']|["']$/g,"")).filter(a=>a.length>5))).forEach((a,s)=>{let r=this.generateId(a),l=n.get(r)||n.get(a);this.keys.set(r,{id:r,key:a,label:l?.label||`Chave ${s+1}`,addedAt:l?.addedAt||Date.now(),lastUsedAt:l?.lastUsedAt,lastLatencyMs:l?.lastLatencyMs,cooldownUntil:l?.cooldownUntil,errorCount:l?.errorCount||0,lastError:l?.lastError,winCount:l?.winCount||0})})}generateId(e){let n=0;for(let i=0;i<e.length;i++)n=(n<<5)-n+e.charCodeAt(i),n|=0;let o=e.slice(-12).replace(/[^a-zA-Z0-9]/g,"").slice(0,6);return`key_${Math.abs(n).toString(36).slice(0,6)}${o}`}static maskKey(e){let n=e.trim().replace(/^["']|["']$/g,"");return n.length<=10?"\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022":`${n.slice(0,6)}...${n.slice(-4)}`}getAllKeys(){let e=Date.now();return Array.from(this.keys.values()).map(n=>{let o=Math.max(0,(n.cooldownUntil||0)-e);return{...n,isCooldown:o>0,remainingCooldownMs:o}})}getHealthyKeys(){let e=Date.now();return Array.from(this.keys.values()).filter(n=>(n.cooldownUntil||0)<=e&&(n.errorCount||0)<50)}getRoundRobinKeys(e=2){let n=Date.now(),o=Array.from(this.keys.values()).filter(a=>(a.errorCount||0)<50);if(o.length===0)return Array.from(this.keys.values()).slice(0,e);let i=o.filter(a=>(a.cooldownUntil||0)<=n);return i.length>0?(i.sort((a,s)=>{let r=a.lastLatencyMs!==void 0?a.lastLatencyMs:99999,l=s.lastLatencyMs!==void 0?s.lastLatencyMs:99999;if(r!==l)return r-l;let d=(a.lastUsedAt||0)-(s.lastUsedAt||0);return d!==0?d:a.addedAt-s.addedAt}),i.slice(0,e)):(o.sort((a,s)=>(a.cooldownUntil||0)-(s.cooldownUntil||0)),o.slice(0,e))}getBestKey(){return this.getRoundRobinKeys(1)[0]?.key||""}getDiverseKeys(e){return this.getRoundRobinKeys(e).map(n=>n.key)}markQuotaHit(e,n=8e3){let o=this.findKeyObj(e);o&&(o.cooldownUntil=Date.now()+n,o.lastError=`Cota tempor\xE1ria atingida (HTTP 429). Cooldown de ${Math.round(n/1e3)}s ativado.`)}markOverloaded(e,n=5e3){let o=this.findKeyObj(e);o&&(o.cooldownUntil=Date.now()+n,o.lastError=`Servidores sobrecarregados (HTTP 503). Cooldown de ${Math.round(n/1e3)}s ativado.`)}markSuccess(e,n){let o=this.findKeyObj(e);o&&(o.lastLatencyMs=n,o.lastUsedAt=Date.now(),o.errorCount=0,o.lastError=void 0,o.cooldownUntil=void 0)}markWinner(e){let n=this.findKeyObj(e);n&&(n.winCount=(n.winCount||0)+1)}markInvalid(e,n){let o=this.findKeyObj(e);o&&(o.errorCount=99,o.lastError=n)}addKey(e,n){let o=e.trim().replace(/^["']|["']$/g,"");if(!o)return{ok:!1,message:"Chave n\xE3o pode ser vazia."};if(o.length<15)return{ok:!1,message:"Chave de API inv\xE1lida ou muito curta."};let i=this.generateId(o);if(this.keys.has(i)||Array.from(this.keys.values()).some(r=>r.key===o))return{ok:!1,message:"Esta chave de API j\xE1 est\xE1 cadastrada."};let s={id:i,key:o,label:n?.trim()||`Chave ${this.keys.size+1}`,addedAt:Date.now(),errorCount:0};return this.keys.set(i,s),{ok:!0,message:"Chave adicionada com sucesso!",keyItem:s}}updateKey(e,n,o){let i=this.keys.get(e);if(!i)return{ok:!1,message:"Chave n\xE3o encontrada."};let a=n.trim().replace(/^["']|["']$/g,"");return!a||a.length<15?{ok:!1,message:"Chave de API inv\xE1lida."}:(i.key=a,o!==void 0&&(i.label=o.trim()),i.errorCount=0,i.cooldownUntil=void 0,i.lastError=void 0,{ok:!0,message:"Chave atualizada com sucesso!"})}removeKey(e){if(this.keys.size<=1)return{ok:!1,message:"Voc\xEA precisa manter pelo menos 1 chave de API cadastrada."};let n=this.findKeyObj(e);return n?(this.keys.delete(n.id),{ok:!0,message:"Chave removida com sucesso."}):{ok:!1,message:"Chave n\xE3o encontrada."}}exportRawKeys(){return Array.from(this.keys.values()).map(e=>e.key)}size(){return this.keys.size}findKeyObj(e){if(this.keys.has(e))return this.keys.get(e);for(let n of this.keys.values())if(n.key===e)return n}},Y=new ne;var Ee=[{id:"gemini-3.8-flash",name:"Gemini 3.8 Flash (Mais Inteligente 2026)",description:"Modelo flagship Flash lan\xE7ado em Set/2026. Ultra-r\xE1pido e altamente capaz.",stable:!0},{id:"gemini-3.7-flash",name:"Gemini 3.7 Flash (Agentic)",description:"Alta capacidade para racioc\xEDnio multimodal e workflows ag\xEAnticos.",stable:!0},{id:"gemini-3.6-flash",name:"Gemini 3.6 Flash (Est\xE1vel)",description:"Modelo est\xE1vel e confi\xE1vel com excelente velocidade.",stable:!0},{id:"gemini-3.5-flash",name:"Gemini 3.5 Flash (R\xE1pido)",description:"Modelo de alta performance para tarefas r\xE1pidas.",stable:!0},{id:"gemini-3.5-flash-lite",name:"Gemini 3.5 Flash-Lite (Cota Alta 30 RPM)",description:"Modelo econ\xF4mico de ultra-alta velocidade e maior limite de RPM.",stable:!0},{id:"gemini-3.1-pro",name:"Gemini 3.1 Pro (Racioc\xEDnio Profundo)",description:"Modelo topo de linha para racioc\xEDnio complexo, exatas e matem\xE1tica.",stable:!0},{id:"gemini-2.5-flash",name:"Gemini 2.5 Flash (Ultra R\xE1pido)",description:"Modelo comprovado de baix\xEDssima lat\xEAncia e alta disponibilidade.",stable:!0},{id:"gemini-2.5-pro",name:"Gemini 2.5 Pro (Avan\xE7ado)",description:"Modelo avan\xE7ado para quest\xF5es de alta complexidade.",stable:!0}],ht=["gemini-3.5-flash-lite","gemini-3.5-flash","gemini-3.6-flash","gemini-3.8-flash","gemini-2.5-flash"],Qt={"gemini-2.0-flash":"gemini-3.5-flash","gemini-2.0-flash-lite":"gemini-3.5-flash-lite","gemini-1.5-flash":"gemini-3.5-flash","gemini-1.5-pro":"gemini-3.6-flash","gemini-1.0-pro":"gemini-2.5-flash"};function je(t){return Qt[t]??t}function Yt(t,e){let o={temperature:0,maxOutputTokens:1350,responseMimeType:"application/json",responseSchema:e??Xt};return/lite/i.test(t)||(/gemini-3\.[0-9]+-?flash/i.test(t)?o.thinkingConfig={thinkingBudget:0}:/gemini-2\.5-flash/i.test(t)&&(o.thinkingConfig={thinkingBudget:0})),o}var Xt={type:"OBJECT",properties:{pageType:{type:"STRING",enum:["question","info","start","conclusion"]},mode:{type:"STRING",enum:["texto_livre","escolha_unica","escolha_multipla","verdadeiro_falso","preenchimento","acao_sem_resposta","categorizacao","ordenacao","arrastar_soltar"]},confidence:{type:"NUMBER"},rationale:{type:"STRING"},thinking:{type:"STRING"},memoryToStore:{type:"STRING"},imageDescriptions:{type:"ARRAY",items:{type:"OBJECT",properties:{index:{type:"NUMBER"},description:{type:"STRING"},relevant:{type:"BOOLEAN"},associatedLabel:{type:"STRING"}}}},actions:{type:"ARRAY",items:{type:"OBJECT",properties:{t:{type:"STRING",enum:["val","chk","sel","clk","adv","js","drag"]},id:{type:"STRING"},name:{type:"STRING"},label:{type:"STRING"},v:{type:"STRING"},c:{type:"BOOLEAN"},co:{type:"ARRAY",items:{type:"NUMBER"}},from:{type:"STRING"},to:{type:"STRING"}},required:["t"]}}},required:["pageType","mode","confidence","rationale","actions"]};function bt(t){let e=t.trim().replace(/^google\//,"").replace(/^models\//,"");if(!e)return"gemini-3.5-flash-lite";let n=je(e);return le(n)?n:(console.warn(`[EasyQuiz] Modelo desconhecido ou inv\xE1lido: "${e}". Verifique se o modelo est\xE1 dispon\xEDvel no Google AI Studio.`),"gemini-3.5-flash-lite")}function Ue(t,e){let n="";try{let o=JSON.parse(t);n=o.error?.message||o.message||""}catch{n=t.slice(0,160)}return/API_KEY_INVALID|API key not valid|key.*invalid|unregistered/i.test(n)?"Chave de API do Gemini inv\xE1lida ou n\xE3o autorizada no Google AI Studio.":/RESOURCE_EXHAUSTED|Quota exceeded|rate limit|quota/i.test(n)||e===429?`Cota do Gemini excedida (HTTP 429): ${n||"Aguarde"}`:e===404?`HTTP 404: ${n||"Modelo ou endpoint n\xE3o encontrado no Google AI Studio"}`:e===503||/overloaded/i.test(n)?`Servidores Google sobrecarregados (HTTP 503): ${n||"Aguardando"}`:n?`Erro Gemini (HTTP ${e}): ${n}`:`Falha na requisi\xE7\xE3o ao Gemini (HTTP ${e}).`}function Jt(t){let e=t.trim(),n=e.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);if(n)try{return JSON.parse(n[1].trim())}catch{}try{return JSON.parse(e)}catch{}let o=e.match(/\{[\s\S]*\}/);if(o)try{return JSON.parse(o[0].trim())}catch{}try{let i=e.indexOf("{");if(i!==-1){let a=e.slice(i).trim();a=a.replace(/,\s*\{[^}]*$/,""),a=a.replace(/,\s*$/,"");let s=0,r=0,l=!1,d=!1;for(let f=0;f<a.length;f++){let c=a[f];if(d){d=!1;continue}if(c==="\\"){d=!0;continue}if(c==='"'){l=!l;continue}l||(c==="{"?s++:c==="}"?s=Math.max(0,s-1):c==="["?r++:c==="]"&&(r=Math.max(0,r-1)))}for(l&&(a+='"');r>0;)a+="]",r--;for(;s>0;)a+="}",s--;let u=JSON.parse(a);if(u&&typeof u=="object")return u}}catch{}throw new Error("Falha ao decodificar JSON da IA.")}var we=(()=>{try{let t=typeof localStorage<"u"?localStorage.getItem("easyquiz_cached_models"):null;if(!t)return null;let e=JSON.parse(t);if(Array.isArray(e)){let n=e.filter(o=>o&&typeof o.id=="string"&&le(o.id));return n.length>0?n:null}return null}catch{return null}})(),Be=new Set;async function Ve(t){let e=t.trim().replace(/^["']|["']$/g,"");if(!e)return Ee;let n=[`https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(e)}`,`https://generativelanguage.googleapis.com/v1/models?key=${encodeURIComponent(e)}`];for(let o of n)try{let i=await fetch(o,{headers:{"Content-Type":"application/json","x-goog-api-key":e}});if(!i.ok){let s=await i.text(),r=Ue(s,i.status);if(r.includes("inv\xE1lida")||r.includes("n\xE3o autorizada"))throw new Error(r);continue}let a=await i.json();if(Array.isArray(a.models)&&a.models.length>0){let s=a.models.filter(r=>{let l=r.supportedGenerationMethods||[],d=(r.name||"").replace(/^models\//,""),u=l.includes("generateContent");return le(d)&&u}).map(r=>{let l=r.supportedGenerationMethods||[],d=r.name.replace(/^models\//,""),u=r.displayName||d;return{id:d,name:u.includes(d)?u:`${u} (${d})`,description:r.description||"",stable:!/-preview|-experimental|-latest/i.test(d),supportsVision:!/embedding|tts|transcribe|live|image|sound|voice/i.test(d),supportsStructuredOutput:l.includes("generateContent"),supportedGenerationMethods:l,discoveredAt:Date.now()}});if(s.length>0){s.sort((r,l)=>{let d=u=>u==="gemini-3.8-flash"?200:u==="gemini-3.7-flash"?190:u==="gemini-3.6-flash"?180:u==="gemini-3.5-flash"?170:u==="gemini-3.5-flash-lite"?160:u==="gemini-2.5-flash"?130:u.includes("flash")?80:u==="gemini-2.5-pro"?60:u.includes("pro")?50:10;return d(l.id)-d(r.id)}),we=s;try{typeof localStorage<"u"&&localStorage.setItem("easyquiz_cached_models",JSON.stringify(s))}catch{}return s}}}catch(i){if(i.message?.includes("Chave de API"))throw i}return Ee}async function yt(t,e){let n=e.map(d=>d.trim().replace(/^["']|["']$/g,"")).filter(d=>d.length>5);if(n.length===0)return{ok:!1,model:t,key:"",message:"Nenhuma chave dispon\xEDvel."};let o=je(bt(t)),i=JSON.stringify({contents:[{role:"user",parts:[{text:"PING"}]}],generationConfig:{maxOutputTokens:5}}),a={"Content-Type":"application/json"};async function s(d,u,f){let c=new AbortController,p=setTimeout(()=>c.abort(),f);try{let m=`https://generativelanguage.googleapis.com/v1beta/models/${u}:generateContent?key=${encodeURIComponent(d)}`,g=await fetch(m,{method:"POST",headers:{...a,"x-goog-api-key":d},body:i,signal:c.signal});if(clearTimeout(p),g.ok)return{ok:!0,model:u,key:d,message:`Modelo '${u}' validado com sucesso!`};let h=await g.text().catch(()=>"");throw new Error(`HTTP ${g.status}: ${h.slice(0,80)}`)}catch(m){throw clearTimeout(p),m}}if(n.length>=2){let d=n.slice(0,6);try{return await Promise.any(d.map(f=>s(f,o,8e3)))}catch{}}let r=n[0],l=[o,...ht.filter(d=>d!==o)];for(let d of l)try{let u=await s(r,d,4e3);return d!==o&&(u.message=`Modelo preferido indispon\xEDvel. Validado via fallback '${d}'.`),u}catch{}return{ok:!1,model:o,key:r,message:"Nenhum modelo Gemini respondeu. Verifique sua chave e cota."}}async function Zt(t,e,n,o,i){let a=["v1beta","v1"],s=new Error(`Falha ao consultar modelo ${t}`),l={...Yt(t,i)};for(let d of a){if(o.aborted)throw new Error("Opera\xE7\xE3o cancelada pelo usu\xE1rio.");let u=`https://generativelanguage.googleapis.com/${d}/models/${t}:generateContent?key=${encodeURIComponent(e)}`,f=Date.now();try{let c=await fetch(u,{method:"POST",headers:{"Content-Type":"application/json","x-goog-api-key":e},body:JSON.stringify({...n,generationConfig:l}),signal:o});if(!c.ok){let g=await c.text();if(c.status===400){let b=/thinking/i.test(g),y=/response_schema|responseSchema|Repeated map key|PROTO payload/i.test(g);if((b||y)&&(l.thinkingConfig||l.responseSchema)){let _={...l};b&&delete _.thinkingConfig,y&&(delete _.responseSchema,delete _.responseMimeType),l=_;let E=await fetch(u,{method:"POST",headers:{"Content-Type":"application/json","x-goog-api-key":e},body:JSON.stringify({...n,generationConfig:l}),signal:o});if(E.ok){let $=await E.json(),z=$.candidates?.[0];if(z?.content?.parts?.[0]?.text)return Y.markSuccess(e,Date.now()-f),{rawText:z.content.parts[0].text,data:$,usedModel:t,usedKey:e}}let x=await E?.text?.().catch(()=>"")??g,A=Ue(x,c.status);throw new Error(`[${t}|${ne.maskKey(e)}] ${A}`)}}let h=Ue(g,c.status);if(c.status===404&&d==="v1beta")continue;throw c.status===429?(Y.markQuotaHit(e,8e3),_t(e,t,1e4),new Error(`[${t}|${ne.maskKey(e)}] ${h}`)):(c.status===503||/no capacity|overloaded|unavailable/i.test(g)?(Y.markOverloaded(e,5e3),Be.add(t)):c.status===403||/API_KEY_INVALID/i.test(g)?Y.markInvalid(e,h):c.status===404&&Be.add(t),new Error(`[${t}|${ne.maskKey(e)}] ${h}`))}let p=await c.json(),m=p.candidates?.[0];if(!m||!m.content?.parts?.[0]?.text)throw new Error(`[${t}|${ne.maskKey(e)}] A IA n\xE3o retornou uma resposta estruturada v\xE1lida.`);return Y.markSuccess(e,Date.now()-f),{rawText:m.content.parts[0].text,data:p,usedModel:t,usedKey:e}}catch(c){if(o.aborted)throw c;s=c;let p=s.message||"";if(p.includes("404")||/no longer available/i.test(p)){Be.add(t);break}if(p.includes("429")||p.includes("Quota"))break}}throw s}var Ke=new Map;function gt(t,e){let n=`${t}::${e}`,o=Ke.get(n);return o===void 0?!1:Date.now()>o?(Ke.delete(n),!1):!0}function _t(t,e,n=1e4){Ke.set(`${t}::${e}`,Date.now()+n)}async function vt(t,e,n,o,i,a){if(i?.aborted)throw new Error("Opera\xE7\xE3o cancelada pelo usu\xE1rio.");let s=Array.isArray(n.apiKeys)&&n.apiKeys.length>0?n.apiKeys:n.apiKey?[n.apiKey]:[];Y.init(s);let r=n.apiKey.trim().replace(/^["']|["']$/g,""),l=Y.getBestKey()||r;if(!l)throw new Error("Nenhuma chave de API do Gemini configurada ou dispon\xEDvel.");let d=bt(n.model);if(!we&&l&&Ve(l).catch(()=>{}),i?.aborted)throw new Error("Opera\xE7\xE3o cancelada pelo usu\xE1rio.");let u=Date.now(),f=Fe(t,e,n),c=[{text:f}];for(let T=0;T<e.length;T++){let S=e[T],M=S.associatedLabel||(S.alt?`Imagem: ${S.alt}`:`Imagem ${T+1}`);if(S.captureStatus==="text_only"||!S.base64){let q=S.textContext||S.alt||"";c.push({text:`[CONTEXTO_IMAGEM_${T+1} - V\xCDNCULO: ${M}]: ${q}`})}else c.push({text:`[ANEXO VISUAL ${T+1} - V\xCDNCULO: ${M}]:`}),c.push({inline_data:{mime_type:S.mediaType,data:S.base64}})}let p={system_instruction:{parts:[{text:a?.systemPromptOverride??xe}]},contents:[{role:"user",parts:c}]},m=je(d),g=ht.filter(T=>T!==m),b=Y.getAllKeys().length,y=T=>b<=1||T===0?1:2,_=new Set,E=(T,S)=>{let M=/pro/i.test(T),q=/lite/i.test(T);return M?S===0?18e3:S===1?24e3:3e4:q?S===0?1e4:S===1?14e3:18e3:S===0?16e3:S===1?2e4:25e3},x=async(T,S)=>{if(S.length===0||i?.aborted)return null;let M=S.map(()=>new AbortController),q=()=>M.forEach(I=>{try{I.abort()}catch{}});i?.addEventListener("abort",q,{once:!0});let H=S.map(I=>`${I.model.replace("gemini-","")}/${I.label}`).join(" | ");o?.(`\u26A1 ${T}: ${S.length} slot(s) [${H}]...`,"info");try{let I=S.map(async(B,D)=>{let F=M[D],ce=setTimeout(()=>{try{F.abort(new Error(`Timeout ${B.timeout/1e3}s (${B.model}|${B.label})`))}catch{F.abort()}},B.timeout);try{let U=await Zt(B.model,B.key,p,F.signal,a?.generationSchemaOverride);clearTimeout(ce);let Z=ft(Jt(U.rawText));return Z.usedModel=U.usedModel,Z.durationMs=Date.now()-u,Z.promptSent=f,Z.tokensUsed=U.data.usageMetadata?.totalTokenCount,Z.promptTokens=U.data.usageMetadata?.promptTokenCount,Z.candidatesTokens=U.data.usageMetadata?.candidatesTokenCount,Z.rawResponse=U.rawText,M.forEach((it,zt)=>{if(zt!==D)try{it.abort(new Error("Cancelado: vencedor respondeu."))}catch{it.abort()}}),{plan:Z,rawUsage:U.data.usageMetadata,usedModel:U.usedModel,usedKey:U.usedKey,slotLabel:B.label}}catch(U){clearTimeout(ce);let Z=U instanceof Error?U.message:String(U);throw(Z.includes("429")||Z.includes("Quota")||Z.includes("RESOURCE_EXHAUSTED"))&&(_t(B.key,B.model,1e4),Y.markQuotaHit(B.key,8e3)),U}}),K=await Promise.any(I);return i?.removeEventListener("abort",q),Y.markWinner(K.usedKey),K}catch(I){return i?.removeEventListener("abort",q),I instanceof AggregateError&&I.errors.length>0?v=I.errors.map(K=>K instanceof Error?K.message:String(K)).join(" | "):I instanceof Error&&(v=I.message),console.warn(`[EasyQuiz ${T}] Falha na onda:`,v),null}},$=(b<=1?1:1+Math.ceil((b-1)/2))+4,z=0,v="",k=0;for(;z<$;){if(i?.aborted)throw new Error("Opera\xE7\xE3o cancelada pelo usu\xE1rio.");let T=Y.getRoundRobinKeys(b),S=T.filter(F=>!_.has(`${F.key}::${m}`)&&!gt(F.key,m)),M,q;if(S.length>0)M=m,q=S;else{let F=g;M=F[k%F.length]||m,k++;let ce=T.filter(U=>!_.has(`${U.key}::${M}`)&&!gt(U.key,M));q=ce.length>0?ce:T.filter(U=>!_.has(`${U.key}::${M}`))}if(q.length===0){if(k<g.length)continue;break}let H=q.slice(0,y(z));if(H.length===0)break;let I=E(M,z),K=H.map(F=>(_.add(`${F.key}::${M}`),{model:M,key:F.key,label:F.label||"Chave",timeout:I})),B=z===0?"Onda 1":`Onda ${z+1}`,D=await x(B,K);if(D){let F=D.plan.durationMs||Date.now()-u,ce=ne.maskKey(D.usedKey);return o?.(`\u2705 ${F}ms via '${D.usedModel}' (${D.slotLabel}: ${ce})`,"info"),D}z++}throw new Error(v||"Todas as tentativas falharam. Verifique suas chaves de API e cotas.")}var pe=['input:not([type="hidden"])',"textarea","select","button","a","label",'[role="button"]','[role="link"]','[role="radio"]','[role="checkbox"]','[role="option"]','[role="treeitem"]','[role="menuitemcheckbox"]','[role="menuitemradio"]','[contenteditable="true"]','[draggable="true"]',"[aria-grabbed]","[aria-dropeffect]","[data-widget-type]",".perseus-drag-item",".sortable-item",'[data-testid*="drag" i]','[data-testid*="card" i]','[data-testid*="option" i]','[data-testid*="choice" i]','[data-testid*="category" i]',"[data-choice]","[data-option]","[data-answer]","[data-value]",".quiz-option",".option-card",".choice-card",'[class*="option-card" i]','[class*="choice-card" i]','[class*="option-item" i]','[class*="choice-item" i]','[class*="answer-item" i]','[class*="alternative" i]','li[class*="choice" i]','li[class*="option" i]','li[class*="answer" i]','[data-role="dropzone"]',"[data-category]","[data-item-id]","[data-params][jsmodel]",'[class*="draggable-item" i]','[class*="drag-item" i]','[class*="sortable-card" i]','[class*="card-option" i]','[class*="tile" i][class*="option" i]'].join(","),ye=/(verificar|checar|check|conferir|validar|próxim[oa]|next|continuar|continue|avançar|prosseguir|enviar|submit|concluir|finalizar|terminar|começar|iniciar|start|vamos lá|próxima tarefa|next task|próxima pergunta|next question|marcar como concluíd[oa]|mostrar resumo|entendi|compreendi|ok|leitura concluída|seguir|ir para o exercício|fazer o teste|próximo artigo|ir para a aula)/i,ie=/(\banterior\b|\bvoltar\b|\bback\b|\bprev\b|\bprevious\b|recomeçar|\brestart\b|\breplay\b|\bretornar\b)/i,en=0;function Ge(t){try{let e=t.closest('[hidden], [style*="display: none"], [style*="display:none"], [aria-hidden="true"]');if(e&&!me(e))return!1}catch{}try{let e=window.getComputedStyle?window.getComputedStyle(t):t.style;if(e&&(e.display==="none"||e.visibility==="hidden"))return!1}catch{}try{if(typeof t.getBoundingClientRect=="function"){let e=t.getBoundingClientRect();if(e.width>0||e.height>0)return!0}}catch{}return(t.textContent||"").trim().length>0}function R(t){try{if(typeof CSS<"u"&&typeof CSS.escape=="function")return CSS.escape(t)}catch{}return String(t).replace(/["\\]/g,"\\$&")}function C(t){let e=t;if(!e||typeof e.isConnected=="boolean"&&!e.isConnected||me(e))return!1;let n=e.tagName?.toLowerCase();if(["input","select","textarea","button"].includes(n)){let o=e.type?.toLowerCase();if(o==="checkbox"||o==="radio"){if(e.id)try{let a=e.ownerDocument?.querySelector(`label[for="${R(e.id)}"]`);if(a&&Ge(a))return!0}catch{}let i=e.closest('label, .option-card, .quiz-option, .choice, .answer, [role="radio"], [role="checkbox"], [class*="option" i], [class*="choice" i], [class*="item" i], li, tr');if(i&&i!==e&&Ge(i))return!0}try{if(!e.closest('[hidden], [style*="display: none"], [style*="display:none"], [aria-hidden="true"]')){let a=window.getComputedStyle?window.getComputedStyle(e):e.style;if(!a||a.display!=="none"&&a.visibility!=="hidden"){if(typeof e.getBoundingClientRect=="function"){let s=e.getBoundingClientRect();if(s.width>0||s.height>0)return!0}return!0}}}catch{}}return Ge(e)}function tn(t){if(t==null)return"";if(typeof t=="string")return t;if(typeof t=="number"||typeof t=="boolean")return String(t);if(t instanceof Node)return t.textContent||"";try{if(typeof t?.toString=="function"){let e=t.toString();if(typeof e=="string")return e}}catch{}return""}function P(t,e=500){return tn(t).replace(/\s+/g," ").trim().slice(0,e)}function nn(t){let e=t.dataset.easyquizId;if(e)return e;let n=`eq-${Date.now().toString(36)}-${(en+=1).toString(36)}`;return t.dataset.easyquizId=n,n}function me(t){return t?!!(t.closest('#easyquiz-shadow-root, .eq-sidebar, .eq-launcher, [data-easyquiz-ignore="true"], .btn-inject-eq, #btn-inject-script')||t.getAttribute?.("data-easyquiz-ignore")==="true"):!1}var be=/(leaderboard|scoreboard|placar|ranking|trophy|pause|pausar|mute|mutar|audio|sound|som|música|music|configuraç|settings|theme|ajuda|help|report|denunciar|feedback|power-?up|streak|coins|fullscreen|full-screen|read-?aloud|audio-?player|(?:audio|sound|som|media)[-_ ]*volume|volume[-_ ]*(?:slider|control|level|btn|button|icon|mute)|vol-slider)/i;function N(t){if(!t||typeof t.getAttribute!="function"||typeof Element<"u"&&!(t instanceof Element))return!1;if(me(t))return!0;let e=t.tagName?.toLowerCase();if(["select","textarea"].includes(e)||e==="input"&&!["button","submit","reset"].includes((t.type||"").toLowerCase()))return!1;let o=t.closest?.('button, a, [role="button"], [class*="leaderboard" i], [data-testid*="leaderboard" i], [class*="scoreboard" i], [class*="trophy" i]')||t,i=String(o.getAttribute?.("data-testid")||o.getAttribute?.("data-test-id")||o.getAttribute?.("id")||""),a=String(o.getAttribute?.("aria-label")||""),s=String(o.getAttribute?.("title")||""),r=typeof o.className=="string"?o.className:typeof o.className?.baseVal=="string"?o.className.baseVal:"",l=P(o.textContent,60);return!!(be.test(i)||be.test(a)||be.test(s)||be.test(r)||l.length>0&&l.length<=25&&be.test(l))}function X(t){if(!t||typeof t.getAttribute!="function"||typeof Element<"u"&&!(t instanceof Element)||me(t)||N(t)||t.closest?.('.option-card, .choice-card, .quiz-option, [class*="option-card" i], [class*="choice-card" i], [class*="option-item" i], [class*="choice-item" i], [class*="answer-item" i], [data-testid*="option" i], [data-testid*="choice" i], [data-choice], [data-option], [data-answer], [role="radio"], [role="checkbox"], [role="option"]')||t.closest?.("header, nav, aside"))return!1;let e=typeof HTMLInputElement<"u"&&t instanceof HTMLInputElement||typeof HTMLButtonElement<"u"&&t instanceof HTMLButtonElement?t.value:"",n=P(t.getAttribute?.("aria-label")||t.textContent||t.getAttribute?.("value")||e),o=t.type,i=n.replace(/[\d\(\)\[\]\u2192>\u2022\-\/\\]+/g," ").trim(),a=String(t.getAttribute?.("data-testid")||t.getAttribute?.("data-test-id")||t.getAttribute?.("id")||t.getAttribute?.("href")||"").toLowerCase();return ie.test(i)||ie.test(n)?!1:ye.test(i)||ye.test(n)||a.includes("next")||a.includes("check")||a.includes("continue")||a.includes("proximo")||a.includes("forward")?!0:/^\d{1,3}$/.test(n.trim())?!!t.closest?.('[class*="pagination" i], [class*="pager" i], [class*="page-nav" i], [class*="step-indicator" i], [class*="breadcrumb" i], [aria-label*="p\xE1gina" i], [aria-label*="page" i], [role="navigation"], nav, [class*="steps" i]'):!1}function We(t){let e=t.closest("tr");if(e){let l=e.querySelector("th, td:first-child"),d=l&&l!==t.closest("td")?P(l.textContent,100):"",u=P(t.closest("label, td")?.textContent||"",50);if(d&&u)return`${d}: ${u}`}let n=t.closest('.dropdown-row, [class*="dropdown-row" i], [class*="select-row" i]');if(n){let l=n.querySelector('.dropdown-label, [class*="label" i]'),d=l&&l!==t?P(l.textContent,150):"";if(d)return d}let o=t.getAttribute("aria-label");if(o)return P(o);let i=t.getAttribute("aria-labelledby");if(i){let l=i.split(/\s+/).map(d=>document.getElementById(d)?.textContent).filter(Boolean).join(" ");if(l.trim())return P(l)}if("labels"in t&&t.labels){let l=Array.from(t.labels??[]).map(d=>d.textContent).join(" ");if(l.trim())return P(l)}let a=t.closest('.docssharedWizToggleLabeledContainer, [role="listitem"], .answer, label, .quiz-option, .form-check, .option-card');if(a&&a!==t){let l=P(a.textContent);if(l)return l}let s=t instanceof HTMLInputElement||t instanceof HTMLButtonElement?t.value:"",r=t.getAttribute("placeholder")||t.getAttribute("title")||t.textContent||s||"";return P(r)}function Qe(t,e){let o=typeof HTMLSelectElement<"u"&&t instanceof HTMLSelectElement||t.tagName.toLowerCase()==="select"?t:null,i=t;t.dataset.easyquizRole=e;let a=t.tagName.toLowerCase(),s=["input","textarea","select","button"].includes(a)?a:"other",r=t.getAttribute("role")||"",l=(t.getAttribute("data-testid")||t.getAttribute("data-test-id")||"").toLowerCase(),d=(t.className&&typeof t.className=="string"?t.className:"").toLowerCase(),u=t.getAttribute("draggable")==="true"||t.classList.contains("perseus-drag-item")||t.classList.contains("sortable-item")||d.includes("cursor-grab")||!!t.getAttribute("aria-grabbed")||/drag|card|option|item/i.test(l)||/drag|card-item|sortable/i.test(d),f=t.getAttribute("data-role")==="dropzone"||t.classList.contains("category-container")||t.hasAttribute("data-category")||!!t.getAttribute("aria-dropeffect")||/drop|category|bucket/i.test(l)||/dropzone|category-box|bucket|target-zone/i.test(d),p=P((u?"draggable":f?"dropzone":"")||i.type||r||s,40),m="";if(i.type==="checkbox"||i.type==="radio"||r==="radio"||r==="checkbox"){let E=i.checked||t.getAttribute("aria-checked")==="true",x=i.value&&i.value!=="on"?i.value:t.getAttribute("data-value")||"";m=E?x?`checked:${x}`:"checked":x||"unchecked"}else if(s==="button"||a==="a"||e==="navigation"||X(t))m="";else{let E=typeof t.value=="string"||typeof t.value=="number"?t.value:"";m=P(E||t.getAttribute("data-category")||"",2e3)}let g=[];if(o&&o.options)for(let E of Array.from(o.options).slice(0,80))g.push({value:P(E.value),label:P(E.textContent)});else if(r==="combobox"||r==="listbox"||d.includes("select")||d.includes("dropdown")){let E=t.getAttribute("aria-controls")||t.getAttribute("aria-owns"),x=E?document.getElementById(E):t;if(x){let A=x.querySelectorAll('[role="option"], li, .dropdown-item, .option');for(let $ of Array.from(A).slice(0,80)){let z=P($.textContent);z&&g.push({value:$.getAttribute("data-value")||$.getAttribute("value")||z,label:z})}}}let h=!!(i.required||t.getAttribute("aria-required")==="true"),b=!!(i.disabled||t.getAttribute("aria-disabled")==="true"),y=nn(t);return{id:t.id||y,tag:s,type:p,label:We(t),name:P(i.name||t.getAttribute("name")||"",180),value:m,options:g,required:h,disabled:b,role:e}}var xt=['[data-test-id*="exercise" i]','[data-testid*="exercise" i]',".perseus-renderer",".framework-perseus",".Qr7Oae","[data-item-id]",".freebirdFormviewerViewItemsItemItem",".que",".question-holder",".quiz-question",".question_holder",".display_question",'[data-functional-selector*="question"]',".question-container",'[class*="classification-layout" i]','[class*="quiz-container" i]','[data-cy="quiz-container"]',"[data-question-id]",'[data-testid*="question" i]','[class*="question-container" i]','[class*="question" i]','[class*="pergunta" i]','[class*="categoriz" i]',"article","form","section","main"].join(",");function Et(t){if(!C(t))return-1/0;let e=t.getBoundingClientRect(),n=Array.from(t.querySelectorAll(pe)).filter(C),o=P(t.innerText||t.textContent||"",4e3).length;if(o<10||!n.length&&o<60)return-1/0;let i=Math.max(1,window.innerWidth*window.innerHeight),a=Math.max(1,e.width*e.height),s=Math.min(1,a/i),r=e.top+e.height/2,l=Math.abs(r-window.innerHeight/2)/Math.max(1,window.innerHeight),d=o>40?35:0,u=e.top>=0&&e.bottom<=window.innerHeight?25:0;return n.length*15+Math.min(60,o/20)+d+u-s*20-l*10}function Se(t){let e=t;if(e.matches?.('article, [data-test-id*="exercise" i], [data-testid*="exercise" i], .perseus-renderer, .framework-perseus, [class*="question-container" i], .que')&&e.tagName.toLowerCase()!=="main"&&e.tagName.toLowerCase()!=="body")return e;for(;e.parentElement&&e.parentElement!==document.body&&e.parentElement!==document.documentElement;){let n=e.parentElement,o=n.tagName.toLowerCase();if(["header","footer","nav","aside"].includes(o))break;if(n.matches?.('article, [data-test-id*="exercise" i], [data-testid*="exercise" i], .perseus-renderer, .framework-perseus, [class*="question-container" i], .que')&&o!=="main"&&o!=="body"){e=n;break}let i=P(e.innerText||e.textContent||"",1e4),a=P(n.innerText||n.textContent||"",1e4),s=e.querySelectorAll(pe).length,r=n.querySelectorAll(pe).length;if(i.length<150&&a.length>i.length&&r<=s+4&&o!=="main"&&o!=="body"){e=n;continue}break}return e}function wt(t){let e=t,n=e.closest('main, [role="main"], article, form, [data-test-id*="exercise" i], [data-testid*="exercise" i], .framework-perseus, section');if(n&&n!==document.body&&C(n))return n;let o=0;for(;e.parentElement&&e.parentElement!==document.body&&o<3;)e=e.parentElement,o++;return e||document.body}function J(){let t=document.querySelector('[class*="classification-layout" i], [class*="quiz-container" i][class*="classification" i]');if(t&&C(t))return t;let e=document.activeElement;if(e&&e!==document.body){let s=e.closest(xt);if(s&&Et(s)>0)return Se(s)}let o=Array.from(document.querySelectorAll(xt)).map(s=>({element:s,score:Et(s)})).filter(s=>Number.isFinite(s.score)).sort((s,r)=>r.score-s.score),i=o.find(s=>{let r=s.element.tagName.toLowerCase();return r!=="main"&&r!=="body"&&s.score>0});if(i)return Se(i.element);if(o.length>0&&o[0].score>0)return Se(o[0].element);let a=document.querySelector('form, main, [role="main"]');return a&&C(a)?a:document.body}function St(t){let e=t.cloneNode(!0);e.querySelectorAll("script, style, iframe, object, embed, svg, canvas, noscript, audio, video").forEach(o=>o.remove());let n=["type","name","value","role","aria-label","aria-labelledby","aria-checked","aria-required","required","disabled","data-easyquiz-id","draggable","class","id","data-widget-type","data-role","data-category","data-testid"];return e.querySelectorAll("*").forEach(o=>{for(let i of Array.from(o.attributes))n.includes(i.name)||o.removeAttribute(i.name)}),e.outerHTML.replace(/\s+/g," ").slice(0,2e4)}function Te(t){let e=Array.from(t.querySelectorAll(pe)),n=new Set,o=[];for(let d of e){if(!C(d)||X(d)||N(d))continue;let u=(d.value||d.textContent||"").trim();if(ie.test(u))continue;let f=d.tagName.toLowerCase();["input","textarea","select"].includes(f)&&(n.add(d),o.push(d))}for(let d of e){if(!C(d)||X(d)||N(d))continue;let u=(d.value||d.textContent||"").trim();if(ie.test(u))continue;let f=d.tagName.toLowerCase();if(["input","textarea","select"].includes(f))continue;let c=d.querySelector("input, textarea, select");if(!(c&&n.has(c))){if(d.hasAttribute("for")){let p=d.getAttribute("for"),m=p?d.ownerDocument.getElementById(p):null;if(m&&n.has(m))continue}if(f==="a"){let p=d.getAttribute("role"),m=d.getAttribute("class")||"",g=d.getAttribute("data-testid")||"",h=d.getAttribute("draggable")==="true"||d.classList.contains("perseus-drag-item")||d.classList.contains("sortable-item")||m.includes("cursor-grab")||!!d.getAttribute("aria-grabbed")||/drag|card|option|item/i.test(g)||/drag|card-item|sortable/i.test(m);if(!(p==="button"||p==="radio"||p==="checkbox"||p==="option"||h||d.closest('[class*="choice" i], [class*="option" i], [class*="answer" i], [data-testid*="option" i]')))continue}o.push(d)}}let i=o.length>0&&o.every(d=>N(d)||/read-?aloud|audio/i.test(d.getAttribute("data-testid")||d.getAttribute("aria-label")||"")),a=document.body.querySelector('[class*="classification-layout" i]')||document.body.querySelector('[class*="classification" i]')||t,s=document.body.querySelector('[class*="classification" i]')!==null||t.querySelector('[class*="classification" i]')!==null||t.querySelector('[data-cy*="quiz" i]')!==null||t.querySelector('[class*="draggable-item" i]')!==null||t.querySelector('[class*="drag-item" i]')!==null||t.querySelector('[class*="sortable-card" i]')!==null||t.matches?.('[class*="classification" i]');if((o.length===0||i)&&s){i&&(o.length=0);let d=Array.from(a.querySelectorAll('[class*="cursor-grab"][id], [draggable="true"][id], .dnd-card[id]'));if(d.length>0){for(let u of d)if(!(!C(u)||N(u))&&(o.push(u),o.length>=50))break}else{let u=Array.from(a.querySelectorAll("button, div[class], span[class], p, li"));for(let f of u){if(!C(f)||X(f)||N(f)||ie.test((f.textContent||"").trim()))continue;let c=(f.textContent||"").trim();if(c.length<2||c.length>300)continue;if(Array.from(f.children).some(m=>m.className&&m.textContent?.trim())||o.push(f),o.length>=50)break}}}let l=!o.some(d=>["input","select","textarea"].includes(d.tagName.toLowerCase()))&&o.length>0&&o.every(d=>{let u=d.tagName.toLowerCase();if(["input","select","textarea","button"].includes(u))return!1;let f=(d.textContent||"").trim();return!d.id||f.length<10||/^\d+\s*\/\s*\d+$/.test(f)||/^question text/i.test(f)});if(o.length===0||l){l&&(o.length=0);let d=Array.from(document.body.querySelectorAll('[class*="cursor-pointer"][id]'));if(d.length>0)for(let u of d){if(!C(u)||me(u)||X(u)||N(u)||ie.test((u.textContent||"").trim()))continue;let f=(u.textContent||"").trim();if(!(f.length<10||f.length>500)&&!/^\d+\s*\/\s*\d+$/.test(f)&&(o.push(u),o.length>=20))break}}return o.slice(0,100).map(d=>Qe(d,"answer"))}function Ye(t){let e=[t,t.parentElement,t.parentElement?.parentElement,document.body].filter(Boolean),n=new Set,o=[];for(let i of e)for(let a of Array.from(i.querySelectorAll(pe)))if(!(n.has(a)||!C(a)||!X(a)||N(a))&&(n.add(a),o.push(Qe(a,"navigation")),o.length>=10))return o;return o}function Ae(t=!1){let e=J();e=Se(e),t&&(e=wt(e));let n=Te(e),o=Ye(e);if(n.length===0){let r=Te(document.body);r.length>0&&(e=wt(e),n=Te(e),n.length===0&&(n=r,e=document.querySelector('main, article, form, [role="main"]')||document.body))}o.length===0&&(o=Ye(document.body));let i=e.innerText&&e.innerText.trim().length>0?e.innerText:e.textContent||"",a=i.length>4e4?P(i.slice(0,8e3),8e3)+`
[...conte\xFAdo extenso truncado...]
`+P(i.slice(-2e3),2e3):P(i,16e3),s=[...n,...o].slice(0,120);return!a||s.length===0&&a.length<30?P(document.body.innerText||document.body.textContent||"",16e3).length>=30?_e():null:{sourceUrl:window.location.href.slice(0,2e3),pageTitle:document.title.slice(0,500)||"P\xE1gina de Quest\xE3o",questionText:a,htmlSnippet:St(e),controls:s,scope:e}}function _e(){let t=document.body.innerText||document.body.textContent||document.documentElement.textContent||"",e=P(t,16e3),n=Te(document.body),o=Ye(document.body),i=[...n,...o].slice(0,120),a=document.querySelector('main, article, form, [role="main"], [data-test-id*="content" i], [class*="content" i]')||document.body;return{sourceUrl:window.location.href.slice(0,2e3),pageTitle:document.title.slice(0,500)||"P\xE1gina de Quest\xE3o",questionText:e,htmlSnippet:St(a).slice(0,15e3),controls:i,scope:a}}function Tt(t){let e=t.controls.map(n=>`${n.role}:${n.id}:${n.type}`).join("|");return[window.location.href,t.pageTitle,t.questionText.slice(0,400),e].join("::")}var Xe=10,on=1400,ve=15e5;function re(t){return new Promise((e,n)=>{let o=new FileReader;o.onerror=()=>n(new Error("Falha ao converter blob para base64.")),o.onload=()=>{let i=String(o.result||"");e(i.split(",")[1]||"")},o.readAsDataURL(t)})}async function de(t){let e=0,n=0;if(t instanceof HTMLImageElement?(e=t.naturalWidth||t.width,n=t.naturalHeight||t.height):(e=t.width,n=t.height),e<=0||n<=0)throw new Error("Dimens\xF5es inv\xE1lidas.");let o=Math.min(1,on/Math.max(e,n)),i=Math.max(1,Math.round(e*o)),a=Math.max(1,Math.round(n*o)),s=document.createElement("canvas");s.width=i,s.height=a;let r=s.getContext("2d",{alpha:!1});if(!r)throw new Error("Sem suporte a Canvas 2D.");return r.fillStyle="#ffffff",r.fillRect(0,0,i,a),r.drawImage(t,0,0,i,a),new Promise((l,d)=>{s.toBlob(u=>u?l(u):d(new Error("Falha na compress\xE3o.")),"image/jpeg",.88)})}async function kt(t){let e=typeof t.getBoundingClientRect=="function"?t.getBoundingClientRect():{width:0,height:0},n=e.width||parseFloat(t.getAttribute("width")||"0")||parseFloat(t.style.width||"0")||400,o=e.height||parseFloat(t.getAttribute("height")||"0")||parseFloat(t.style.height||"0")||300,i=2,a=Math.min(1800,Math.max(120,Math.round(n*i))),s=Math.min(1800,Math.max(100,Math.round(o*i))),r=t.cloneNode(!0);r.getAttribute("xmlns")||r.setAttribute("xmlns","http://www.w3.org/2000/svg"),r.getAttribute("xmlns:xlink")||r.setAttribute("xmlns:xlink","http://www.w3.org/1999/xlink"),r.setAttribute("width",String(a)),r.setAttribute("height",String(s)),!r.getAttribute("viewBox")&&n>0&&o>0&&r.setAttribute("viewBox",`0 0 ${n} ${o}`);try{let c=Array.from(t.querySelectorAll("*")),p=Array.from(r.querySelectorAll("*"));for(let m=0;m<Math.min(c.length,p.length);m++){let g=c[m],h=p[m];if(!g||!h||!h.style)continue;let b=window.getComputedStyle?window.getComputedStyle(g):null;b&&(b.fill&&b.fill!=="none"&&(h.style.fill=b.fill),b.stroke&&b.stroke!=="none"&&(h.style.stroke=b.stroke),b.strokeWidth&&(h.style.strokeWidth=b.strokeWidth),b.fontFamily&&(h.style.fontFamily=b.fontFamily),b.fontSize&&(h.style.fontSize=b.fontSize),b.fontWeight&&(h.style.fontWeight=b.fontWeight),b.color&&(h.style.color=b.color))}}catch{}let l="#ffffff";try{let c=t.parentElement||t;for(;c&&c!==document.documentElement;){let m=(window.getComputedStyle?window.getComputedStyle(c):null)?.backgroundColor;if(m&&m!=="transparent"&&m!=="rgba(0, 0, 0, 0)"){l=m;break}c=c.parentElement}}catch{}let u=new XMLSerializer().serializeToString(r),f="";try{f=btoa(unescape(encodeURIComponent(u)))}catch{}try{let c=h=>new Promise((b,y)=>{let _=new Image,E=setTimeout(()=>y(new Error("Timeout render SVG")),1200);_.onload=()=>{clearTimeout(E),b(_)},_.onerror=()=>{clearTimeout(E),y(new Error("Falha ao renderizar SVG em Image."))},_.src=h}),p=null;if(f)try{p=await c(`data:image/svg+xml;base64,${f}`)}catch{}if(!p){let h=new Blob([u],{type:"image/svg+xml;charset=utf-8"}),b=URL.createObjectURL(h);try{p=await c(b)}finally{URL.revokeObjectURL(b)}}let m=document.createElement("canvas");m.width=a,m.height=s;let g=m.getContext("2d",{alpha:!1});if(g&&p){g.fillStyle=l,g.fillRect(0,0,a,s),g.drawImage(p,0,0,a,s);let h=await new Promise(b=>{m.toBlob(b,"image/jpeg",.92)});if(h){let b=await re(h);if(b)return{blob:h,base64:b,mediaType:"image/jpeg"}}}}catch{}return{base64:f,mediaType:"image/svg+xml"}}async function Je(t){try{let e=t.getBoundingClientRect(),n=Math.round(e.width)||t.offsetWidth||400,o=Math.round(e.height)||t.offsetHeight||300;if(n<30||o<30)return null;let i=t.tagName.toLowerCase()==="svg"?t:t.querySelector("svg");if(i&&t.querySelectorAll("input, select, textarea").length===0)try{let g=await kt(i);if(g.base64&&g.base64.length<=ve)return{mediaType:g.mediaType,base64:g.base64,alt:t.getAttribute("aria-label")||i.getAttribute("aria-label")||"Captura de diagrama/gr\xE1fico",source:"visual_snapshot",captureStatus:"captured",textContext:se(i)}}catch{}if(t instanceof HTMLCanvasElement)try{let g=await de(t),h=await re(g);if(h)return{mediaType:"image/jpeg",base64:h,alt:t.getAttribute("aria-label")||"Captura de canvas visual",source:"canvas_snapshot",captureStatus:"captured"}}catch{}let a="#ffffff";try{let g=t;for(;g&&g!==document.documentElement;){let b=(window.getComputedStyle?window.getComputedStyle(g):null)?.backgroundColor;if(b&&b!=="transparent"&&b!=="rgba(0, 0, 0, 0)"){a=b;break}g=g.parentElement}}catch{}let s=t.cloneNode(!0),r=Array.from(t.querySelectorAll("*")),l=Array.from(s.querySelectorAll("*"));for(let g=0;g<Math.min(r.length,l.length);g++){let h=r[g],b=l[g];if(!(!h||!b||!b.style))try{let y=window.getComputedStyle(h);b.style.color=y.color,b.style.backgroundColor=y.backgroundColor,b.style.borderColor=y.borderColor,b.style.borderWidth=y.borderWidth,b.style.borderStyle=y.borderStyle,b.style.fontSize=y.fontSize,b.style.fontFamily=y.fontFamily,b.style.fontWeight=y.fontWeight,b.style.lineHeight=y.lineHeight,b.style.letterSpacing=y.letterSpacing,b.style.textAlign=y.textAlign}catch{}}let d=Math.min(2,Math.max(1,1200/Math.max(n,o))),u=Math.round(n*d),f=Math.round(o*d),c=`
      <svg xmlns="http://www.w3.org/2000/svg" width="${u}" height="${f}" viewBox="0 0 ${n} ${o}">
        <foreignObject width="${n}" height="${o}">
          <div xmlns="http://www.w3.org/1999/xhtml" style="background:${a};width:100%;height:100%;overflow:hidden;box-sizing:border-box;">
            ${s.outerHTML}
          </div>
        </foreignObject>
      </svg>
    `,p=new Blob([c],{type:"image/svg+xml;charset=utf-8"}),m=URL.createObjectURL(p);try{let g=new Image;await new Promise((y,_)=>{let E=setTimeout(()=>_(new Error("Timeout render ForeignObject")),2500);g.onload=()=>{clearTimeout(E),y()},g.onerror=()=>{clearTimeout(E),_(new Error("Falha ao carregar ForeignObject"))},g.src=m});let h=document.createElement("canvas");h.width=u,h.height=f;let b=h.getContext("2d",{alpha:!1});if(b){b.fillStyle=a,b.fillRect(0,0,u,f),b.drawImage(g,0,0,u,f);let y=await new Promise(_=>h.toBlob(_,"image/jpeg",.9));if(y){let _=await re(y);if(_&&_.length<=ve)return{mediaType:"image/jpeg",base64:_,alt:t.getAttribute("aria-label")||"Captura visual da \xE1rea (print-like)",source:"element_snapshot",captureStatus:"captured",textContext:se(t)}}}}finally{URL.revokeObjectURL(m)}}catch(e){console.warn("[EasyQuiz] Snapshot visual do n\xF3:",e)}return null}function At(t,e,n,o){if(n<=0||o<=0){let c=typeof t.getBoundingClientRect=="function"?t.getBoundingClientRect():{width:0,height:0};if(n=c.width||n,o=c.height||o,n<=0||o<=0){if(e&&/\b(icon|logo|avatar|badge|emoji|spinner|loading)\b/i.test(e))return!1;let m=t instanceof HTMLImageElement&&t.src||"";return m&&/\/icons?\/|\/logos?\/|\/avatars?\/|\/badges?\//i.test(m)?!1:!!(m||e)}}if(n<48||o<48||Math.max(n,o)/Math.max(1,Math.min(n,o))>15)return!1;let a=t.getAttribute("class")||"",s=t.getAttribute("aria-hidden"),r=t.getAttribute("role"),l=t instanceof HTMLImageElement&&t.src||"";if(s==="true"||r==="presentation"||r==="none")return!1;let d=/\b(icon|logo|avatar|badge|emoji|decoration|ornament|spinner|loading|thumbnail|profile|photo)\b/i;if(d.test(a)||e&&d.test(e)||l&&/\/icons?\/|\/logos?\/|\/avatars?\/|\/badges?\/|\/emojis?\//i.test(l)||e===""||e===" "||e==="-")return!1;let u=/\b(graph|chart|diagram|table|map|formula|equation|figure|plot|curve|histogram|scatter|matrix|image|foto|imagem|gráfico|tabela|mapa|fórmula|questão|enunciado|stimulus)\b/i;return u.test(e)||u.test(a)||t.closest('[data-question], [class*="question" i], [class*="prompt" i], [class*="stimulus" i], [class*="enunciado" i], [class*="statement" i], article, .problem, .exercise')?!0:n>=80&&o>=80}function se(t){let e=[],n=t.getAttribute("alt")||t.getAttribute("aria-label")||t.getAttribute("title")||"";n&&n.length>2&&e.push(`Alt: "${n}"`);let a=t.closest("figure")?.querySelector("figcaption")?.textContent?.trim();a&&a.length>2&&e.push(`Legenda: "${a}"`);let s=t.getAttribute("aria-describedby");if(s){let u=document.getElementById(s)?.textContent?.trim();u&&e.push(`Descri\xE7\xE3o: "${u.slice(0,200)}"`)}let r=t.parentElement;if(r){let d=P(r.textContent||"",300);d&&d.length>5&&d!==n&&e.push(`Contexto: "${d.slice(0,200)}"`)}if(t.tagName.toLowerCase()==="svg"){let d=Array.from(t.querySelectorAll("text, tspan")).map(u=>u.textContent?.trim()).filter(Boolean);d.length>0&&e.push(`R\xF3tulos/Textos do Gr\xE1fico: "${d.join(" | ")}"`)}let l=t.getAttribute("data-alt")||t.getAttribute("data-description")||"";return l&&e.push(`Data: "${l}"`),e.length===0?"":e.join(" | ")}async function an(t){let e=t.currentSrc||t.src;if(!e)return null;let n=(t.alt||t.getAttribute("aria-label")||"Imagem da quest\xE3o").slice(0,500);if(t.complete&&t.naturalWidth>0)try{let s=await de(t),r=await re(s);if(r&&r.length<=ve)return{mediaType:"image/jpeg",base64:r,alt:n,source:e.slice(0,2e3),captureStatus:"captured",textContext:se(t)}}catch{}try{let s=await fetch(e,{mode:"cors"});if(s.ok){let r=await s.blob();if(r.type.startsWith("image/")){let l=await createImageBitmap(r),d=await de(l);l.close();let u=await re(d);if(u&&u.length<=ve)return{mediaType:"image/jpeg",base64:u,alt:n,source:e.slice(0,2e3),captureStatus:"captured",textContext:se(t)}}}}catch{}if(e.startsWith("http")){let s=[`https://corsproxy.io/?${encodeURIComponent(e)}`,`https://api.allorigins.win/raw?url=${encodeURIComponent(e)}`],r=async l=>{let d=new AbortController,u=setTimeout(()=>d.abort(),1500);try{let f=await fetch(l,{signal:d.signal});if(clearTimeout(u),f.ok)return f;throw new Error("Proxy status "+f.status)}catch(f){throw clearTimeout(u),f}};try{let d=await(await Promise.any(s.map(r))).blob();if(d.type.startsWith("image/")||d.size>200){let u=await createImageBitmap(d),f=await de(u);u.close();let c=await re(f);if(c&&c.length<=ve)return{mediaType:"image/jpeg",base64:c,alt:n,source:e.slice(0,2e3),captureStatus:"captured",textContext:se(t)}}}catch{}}let o=t.parentElement||t,i=await Je(o);if(i)return i;let a=se(t);return a||n?{mediaType:"image/jpeg",base64:"",alt:n,source:e.slice(0,2e3),captureStatus:"text_only",textContext:a||`Imagem da quest\xE3o (src: ${e.slice(0,100)})`}:null}function rn(t){return t.querySelectorAll("path, line, polyline, polygon, circle, rect, text, image").length>0}function sn(t){try{let e=t.style.backgroundImage||(window.getComputedStyle?window.getComputedStyle(t).backgroundImage:"");if(e&&e.includes("url(")){let n=e.match(/url\(["']?([^"')]+)["']?\)/);if(n&&n[1]&&!n[1].startsWith("data:image/svg+xml"))return n[1]}}catch{}return null}function cn(t,e){let n=t.closest('[data-easyquiz-id], button, [role="button"], [role="radio"], [role="checkbox"], [role="option"], label, .option-card, .quiz-option, .choice, .answer, [class*="option" i], [class*="choice" i], [class*="answer" i], li, tr');if(n&&n!==e&&C(n)&&!X(n)&&!N(n)){let a=n.dataset.easyquizId||n.id||void 0,s=P(n.innerText||n.textContent||"",120),r=n.getAttribute("aria-label")||n.getAttribute("title")||"",l=s||r,d=a?` [id: ${a}]`:"";if(l)return{associatedLabel:`Alternativa/Op\xE7\xE3o: "${l}"${d}`,targetControlId:a};if(a)return{associatedLabel:`Alternativa/Op\xE7\xE3o ${d}`,targetControlId:a}}let o=t.closest("figure")?.querySelector("figcaption")?.textContent?.trim();if(o)return{associatedLabel:`Figura do Enunciado: "${P(o,100)}"`};let i=t.closest('[class*="prompt" i], [class*="stimulus" i], [class*="question-text" i], [class*="statement" i], header, h1, h2, h3, h4, p');if(i){let a=P(i.textContent||"",80);if(a)return{associatedLabel:`Gr\xE1fico do Enunciado: "${a}"`}}return{associatedLabel:"Gr\xE1fico/Imagem do Enunciado Principal"}}async function Ct(t,e=!0){if(!e)return[];let n=[],o=0,i=35e5,a=(u,f)=>{if(!u)return!1;let c=u.base64?u.base64.length:0;if(c>0&&o+c>i)return!1;let p=cn(f,t);return u.associatedLabel=p.associatedLabel,u.targetControlId=p.targetControlId,u.element=f,n.push(u),o+=c,n.filter(g=>g.captureStatus==="captured").length>=Xe},s=[t],r=t.closest('article, .card, [class*="question" i], [class*="exercise" i], form, [data-test-id*="exercise" i], [data-testid*="exercise" i]');r&&r!==t&&r!==document.body&&C(r)&&s.push(r);let l=new Set;for(let u of s){let f=Array.from(u.querySelectorAll("img")).filter(c=>C(c)&&!N(c)&&!l.has(c));for(let c of f){l.add(c);try{let p=c.getBoundingClientRect(),m=c.naturalWidth||p.width||c.width||0,g=c.naturalHeight||p.height||c.height||0,h=c.alt||"";if(!At(c,h,m,g))continue;let b=await an(c);if(a(b,c))return n}catch{}}}let d=new Set;for(let u of s){let f=Array.from(u.querySelectorAll("svg")).filter(c=>{if(!C(c)||N(c)||d.has(c))return!1;let p=typeof c.getBoundingClientRect=="function"?c.getBoundingClientRect():{width:0,height:0},m=p.width||parseFloat(c.getAttribute("width")||"0"),g=p.height||parseFloat(c.getAttribute("height")||"0");return m<30||g<30?!1:rn(c)});for(let c of f){d.add(c);try{let p=await kt(c);if(p.base64){let m=se(c),g={mediaType:p.mediaType,base64:p.base64,alt:c.getAttribute("aria-label")||"Gr\xE1fico/Diagrama vetorial da quest\xE3o",source:"svg",captureStatus:"captured",textContext:m};if(a(g,c))return n}}catch{let p=c.closest('.trig-diagram-container, [class*="diagram" i], [class*="graph" i], figure')||c.parentElement||c,m=await Je(p);if(m){if(a(m,c))return n}else{let g=se(c);if(g){let h={mediaType:"image/jpeg",base64:"",alt:c.getAttribute("aria-label")||"Gr\xE1fico vetorial",source:"svg",captureStatus:"text_only",textContext:g};a(h,c)}}}}}if(n.filter(u=>u.captureStatus==="captured").length<Xe){let u=Array.from(t.querySelectorAll("canvas")).filter(f=>C(f)&&!N(f));for(let f of u)try{let c=await de(f),p=await re(c);if(p){let m={mediaType:"image/jpeg",base64:p,alt:f.getAttribute("aria-label")||"Gr\xE1fico Canvas inline",source:"canvas",captureStatus:"captured"};if(a(m,f))return n}}catch{let c=await Je(f.parentElement||f);if(a(c,f))return n}}if(n.filter(u=>u.captureStatus==="captured").length<Xe){let u=Array.from(t.querySelectorAll('[style*="background-image"], .option-image, .question-media')).filter(f=>C(f)&&!N(f));for(let f of u){let c=sn(f);if(!c)continue;let p=f.getBoundingClientRect();if(At(f,f.getAttribute("aria-label")||"",p.width,p.height))try{let m=await fetch(c,{mode:"cors"});if(m.ok){let g=await m.blob();if(g.type.startsWith("image/")){let h=await createImageBitmap(g),b=await de(h);h.close();let y=await re(b);if(y){let _={mediaType:"image/jpeg",base64:y,alt:"Imagem de fundo da alternativa",source:c.slice(0,2e3),captureStatus:"captured"};if(a(_,f))return n}}}}catch{try{let g=await(await fetch(c,{mode:"no-cors"})).blob();if(g.size>100){let h=await createImageBitmap(g),b=await de(h);h.close();let y=await re(b);if(y&&y.length>100){let _={mediaType:"image/jpeg",base64:y,alt:"Imagem CSS background",source:c.slice(0,2e3),captureStatus:"captured"};if(a(_,f))return n}}}catch{}}}}return n}var ln=[/\bfetch\b/i,/\bXMLHttpRequest\b/i,/\bWebSocket\b/i,/\b(?:localStorage|sessionStorage|indexedDB)\b/i,/\b(?:eval|Function|AsyncFunction|GeneratorFunction)\b/i,/\bimport(?:Scripts)?\b/i,/\bnavigator\s*\.\s*credentials\b/i,/\b(?:cookie|location\s*=|history\s*\.)/i,/\bwindow\s*\[\s*['"](?:fetch|eval|Function|localStorage|sessionStorage)/i];function Ze(t){let e=t?.engine||"smart",n=new Set(["dom","framework","keyboard","drag"]);return t?.autoAdvance&&n.add("navigation"),e==="javascript"&&n.add("javascript"),{engine:e,capabilities:n,maxAttemptsPerAction:e==="command"?1:2,maxActionMs:e==="command"?1500:3e3,allowJavaScript:e==="javascript",allowNavigation:!!t?.autoAdvance}}function et(t,e){if(t.t==="js"&&!e.allowJavaScript)throw new Error("A\xE7\xE3o JavaScript bloqueada pela engine atual. Use o motor JavaScript explicitamente.");if(t.t==="adv"&&!e.allowNavigation)throw new Error("Avan\xE7o autom\xE1tico bloqueado pela pol\xEDtica atual.")}function Mt(t){if(!t.trim())throw new Error("JavaScript recusado: c\xF3digo vazio.");if(t.length>8e3)throw new Error("JavaScript recusado: c\xF3digo acima do limite operacional.");if(ln.find(n=>n.test(t)))throw new Error("JavaScript recusado: acesso externo, persist\xEAncia ou avalia\xE7\xE3o din\xE2mica n\xE3o permitidos.");if(!/^\s*(?:\/\/[^\n]*\n|\/\*[\s\S]*?\*\/|[\s\S])*\$eq\./.test(t)&&!t.includes("$eq."))throw new Error("JavaScript recusado: use somente a API declarativa $eq.")}function O(t){return t?!!(t.closest('#easyquiz-shadow-root, .eq-sidebar, .eq-launcher, [data-easyquiz-ignore="true"], .btn-inject-eq, #btn-inject-script')||t.getAttribute?.("data-easyquiz-ignore")==="true"):!1}function w(t){return t==null?"":(typeof t=="string"?t:String(t)).replace(/^(\([0-9a-zA-Z]{1,2}\)|[0-9]{1,3}|[a-zA-Z])[\.\)\-\:]\s+/,"").replace(/[\.\u2026]{2,}/g," ").replace(/['"“”«»]/g,"").replace(/\s+/g," ").trim()}function j(t){if(!t||t instanceof HTMLInputElement||t instanceof HTMLSelectElement||t instanceof HTMLTextAreaElement||t.getAttribute("draggable")==="true"||t.classList.contains("dnd-card")||t.hasAttribute("data-category")||t.hasAttribute("data-dropzone"))return t;if(t.hasAttribute("for")){let o=t.getAttribute("for");if(o){let i=t.ownerDocument.getElementById(o);if(i)return i}}let e=t.closest('label, .option-card, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, td, li, .dnd-card, [class*="option-card" i], [class*="choice-card" i], .dropdown-row, [class*="dropdown" i], [class*="select-row" i]');if(e&&!["article","section","main","form","body"].includes(e.tagName.toLowerCase())){let o=e.getAttribute("for"),a=(o?e.ownerDocument.getElementById(o):null)||e.querySelector('input:not([type="hidden"]), select, textarea');return a||e}let n=t.closest('button, a, [role="button"], [draggable="true"]');if(n)return n;if(["body","html","main","section","article","form"].includes(t.tagName.toLowerCase())){let o=t.querySelector('button, [role="button"], a, input:not([type="hidden"]), select, textarea, [role="radio"], [role="checkbox"], .option-card, label');if(o)return j(o)}return t}function Lt(t){let e=t;if(!e||!document.contains(e))try{e=J()}catch{}e=e||document.body;let n=i=>{let a=Array.from(i.querySelectorAll("tr")).filter(u=>C(u)&&u.querySelector('input[type="radio"], input[type="checkbox"]'));if(a.length>1)return a;let s=Array.from(i.querySelectorAll('input[type="checkbox"], input[type="radio"], [role="checkbox"], [role="radio"]')).filter(u=>C(u)&&!O(u));if(s.length>0)return s;let l=Array.from(i.querySelectorAll('.option-card, [role="option"], [class*="choice-card" i], [class*="option-card" i], li[class*="choice" i], li[class*="option" i]')).filter(u=>C(u)&&!O(u)).filter(u=>!u.parentElement?.closest('.option-card, [role="option"], [class*="choice-card" i], [class*="option-card" i]'));return l.length>0?l:Array.from(i.querySelectorAll('[class*="classification" i] [class], [class*="draggable-item" i], [class*="drag-item" i], [class*="sortable-card" i]')).filter(u=>{let f=u;return C(f)&&!O(f)&&(f.textContent||"").trim().length>2&&!X(f)&&!N(f)&&!f.querySelector("[class]")})},o=n(e);return o.length>0?o:e!==document.body?n(document.body):[]}function L(t,e,n=!1){if(t==null)return null;let i=(typeof t=="string"?t:String(t)).trim().replace(/^["'“”«»]+|["'“”«»]+$/g,"");if(!i)return null;let a=R(i),s=document.querySelector(`[data-easyquiz-id="${a}"]`);if(s&&!O(s))return j(s);try{let c=document.getElementById(i);if(c&&C(c)&&!O(c))return c.hasAttribute("data-category")||c.hasAttribute("data-dropzone")||c.classList.contains("dnd-zone")?c:j(c)}catch{}try{let c=document.querySelector(`[data-item-id="${a}"]`);if(c&&C(c)&&!O(c))return j(c)}catch{}let r=i.match(/^(?:item|opção|opcao|afirmação|afirmacao|alternativa|linha|afirmativa|questão|questao|campo|blank|lacuna|input|resposta)?\s*#?_?([0-9]+)$/i);if(r){let c=parseInt(r[1],10);if(n){let m=document.body;try{m=J()||document.body}catch{}let g=Array.from(m.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, select, [contenteditable="true"]')).filter(h=>C(h)&&!O(h));if(c>=1&&c-1<g.length)return g[c-1];if(c===0&&g.length>0)return g[0]}let p=c-1;if(p>=0){let m=Lt();if(p<m.length){let b=m[p];if(b.tagName.toLowerCase()==="tr"){if(e){let _=b.querySelector(`input[value="${R(e)}" i], [data-value="${R(e)}" i]`);if(_)return _}let y=b.querySelector("input");if(y)return y}return j(b)}let g=document.body;try{g=J()||document.body}catch{}let h=Array.from(g.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, select, [contenteditable="true"]')).filter(b=>C(b)&&!O(b));if(p<h.length)return h[p]}}let l=i.match(/^(?:item|opção|opcao|afirmação|afirmacao|alternativa|linha|afirmativa|questão|questao)?\s*#?([a-eA-E])$/i);if(l){let c=l[1].toUpperCase(),p=c.charCodeAt(0)-65,m=Array.from(document.querySelectorAll(`input[type="radio"][value="${c}" i], input[type="checkbox"][value="${c}" i]`)).find(h=>C(h)&&!O(h));if(m)return j(m);let g=Array.from(document.querySelectorAll('.option-card, .choice, .answer, label, [role="radio"], [role="checkbox"]')).find(h=>{if(!C(h)||O(h))return!1;let y=(h.querySelector('.option-badge, .badge, [class*="badge" i], [class*="letter" i]')?.textContent||"").trim().toUpperCase();if(y===c||y===`${c})`||y===`(${c})`||y===`${c}.`||y===`${c}:`)return!0;let _=(h.textContent||"").trim().toUpperCase();return _.startsWith(`${c})`)||_.startsWith(`(${c})`)||_.startsWith(`${c}.`)||_.startsWith(`${c}:`)});if(g)return j(g);if(p>=0){let h=Lt();if(p<h.length){let b=h[p];if(b.tagName.toLowerCase()==="tr"){if(e){let _=b.querySelector(`input[value="${R(e)}" i], [data-value="${R(e)}" i]`);if(_)return _}let y=b.querySelector("input");if(y)return y}return j(b)}}}if(/^[a-zA-Z0-9_-]{1,10}$/.test(i)){let p=Array.from(document.querySelectorAll(`[data-category="${a}" i], [data-dropzone="${a}" i], [data-role="dropzone"][data-category="${a}" i]`)).find(b=>C(b)&&!O(b));if(p)return p;let g=Array.from(document.querySelectorAll(`input[value="${a}" i], [data-value="${a}" i], input[id="${a}" i], input[placeholder="${a}" i], textarea[placeholder="${a}" i], [title="${a}" i]`)).find(b=>C(b)&&!O(b));if(g)return j(g);let h=Array.from(document.querySelectorAll('.option-badge, [class*="badge" i], [class*="letter" i], .option-card span, label span')).find(b=>{if(!C(b)||O(b))return!1;let y=w(b.textContent).toLowerCase();return y===i.toLowerCase()||y===i.toLowerCase()+")"});if(h)return j(h)}try{let c=Array.from(document.querySelectorAll(`[name="${a}"], [value="${a}"], [placeholder="${a}" i], [title="${a}" i], [data-category="${a}" i], [data-dropzone="${a}" i], [data-testid="${a}" i], [data-test-id="${a}" i], [aria-label="${a}" i]`));if(e){let m=c.find(g=>{if(!C(g)||O(g))return!1;if(g instanceof HTMLInputElement&&g.value.toLowerCase()===e.toLowerCase())return!0;let h=g.closest("label, .vf-label, td, div");return h&&w(h.textContent).toLowerCase().includes(w(e).toLowerCase())});if(m)return j(m)}let p=c.find(m=>C(m)&&!O(m));if(p)return p.hasAttribute("data-category")||p.hasAttribute("data-dropzone")||p.classList.contains("dnd-zone")?p:j(p)}catch{}if(/^[.#\[]|\s|[>+~:]/.test(i))try{let p=Array.from(document.querySelectorAll(i)).find(m=>C(m)&&!O(m));if(p)return j(p)}catch{}try{let c=i.replace(/"/g,""),p=`//button[normalize-space(.)="${c}"] | //a[normalize-space(.)="${c}"] | //*[not(*) and normalize-space(.)="${c}"] | //*[@aria-label="${c}"] | //*[@data-category="${c}"] | //*[@data-testid="${c}"]`,m=document.evaluate(p,document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);for(let g=0;g<m.snapshotLength;g++){let h=m.snapshotItem(g);if(h&&C(h)&&!O(h)){if(["body","html"].includes(h.tagName.toLowerCase())){let y=h.querySelector('button, [role="button"], a, input, [role="radio"], [role="checkbox"], label');if(y&&C(y))return j(y)}return h.closest('[data-role="dropzone"], [class*="category" i], [class*="bucket" i], [class*="column" i], [class*="drop" i]')||j(h)}}}catch{}let u=w(i).toLowerCase(),f=Array.from(document.querySelectorAll('button, a, div, span, li, p, label, input, textarea, select, [draggable="true"], [data-testid], [class*="option" i], [class*="card" i], [class*="item" i], [class*="choice" i], [class*="category" i], [class*="bucket" i]'));for(let c of f){if(!C(c)||O(c)||c.closest("header, nav, .stepper, .step-item, .progress-bar-container")||N(c)||!!(c.matches('article, section, form, main, [class*="container" i], [class*="grid" i], .dnd-pool, .dnd-zones')||c.querySelector('label, [role="radio"], [role="checkbox"], .dnd-card, [draggable="true"], .option-card, tr'))&&!c.matches(".dnd-zone, [data-category], [data-dropzone]"))continue;let m=w(c.textContent).toLowerCase(),g=w(c.getAttribute("aria-label")||"").toLowerCase(),h=w(c.getAttribute("placeholder")||"").toLowerCase(),b=w(c.getAttribute("title")||"").toLowerCase(),y=w(c.getAttribute("name")||"").toLowerCase(),_=w(c.getAttribute("data-category")||"").toLowerCase(),E=c instanceof HTMLInputElement||c instanceof HTMLButtonElement?c.value:"",x=w(E).toLowerCase(),A=m.startsWith(u+")")||m.startsWith(u+".")||m.startsWith(u+" -")||m.startsWith(u+":");if(m===u||g===u||h===u||b===u||y===u||_&&_===u||x&&x===u||A)return c.closest('[data-role="dropzone"], [class*="category" i], [class*="bucket" i], [class*="column" i], [class*="drop" i]')||j(c)}if(u.length>=3)for(let c of f){if(!C(c)||O(c)||c.closest("header, nav, .stepper, .step-item, .progress-bar-container")||N(c)||!!(c.matches('article, section, form, main, [class*="container" i], [class*="grid" i], .dnd-pool, .dnd-zones')||c.querySelector('label, [role="radio"], [role="checkbox"], .dnd-card, [draggable="true"], .option-card, tr'))&&!c.matches(".dnd-zone, [data-category], [data-dropzone]"))continue;let m=w(c.textContent).toLowerCase(),g=w(c.getAttribute("aria-label")||"").toLowerCase(),h=w(c.getAttribute("placeholder")||"").toLowerCase(),b=w(c.getAttribute("title")||"").toLowerCase(),y=w(c.getAttribute("name")||"").toLowerCase();if(m.includes(u)||g.includes(u)||h.includes(u)||b.includes(u)||y.includes(u)){if(Array.from(c.children).some(A=>{let $=w(A.textContent).toLowerCase();return $&&$.includes(u)}))continue;return c.closest('[data-role="dropzone"], [class*="category" i], [class*="bucket" i], [class*="column" i], [class*="drop" i]')||j(c)}let _=u.split(/\s+/).filter(Boolean);if(_.length>=3){let E=_.slice(0,Math.min(5,_.length)).join(" ");if(m.includes(E)||g.includes(E)||h.includes(E))return j(c)}}return null}function It(t,e){for(let n of e)t.dispatchEvent(new Event(n,{bubbles:!0,composed:!0}))}function V(t,e){if(!t)return;try{t.scrollIntoView({block:"nearest",inline:"nearest",behavior:"instant"})}catch{}try{t.focus?.()}catch{}let n=t.getBoundingClientRect(),o=e?e[0]:Math.round(n.left+Math.max(1,n.width/2)),i=e?e[1]:Math.round(n.top+Math.max(1,n.height/2)),a={bubbles:!0,cancelable:!0,composed:!0,view:window,clientX:o,clientY:i};try{t.dispatchEvent(new PointerEvent("pointerover",{...a}))}catch{}try{t.dispatchEvent(new MouseEvent("mouseover",{...a}))}catch{}try{t.dispatchEvent(new PointerEvent("pointerdown",{...a,button:0,buttons:1}))}catch{}try{t.dispatchEvent(new MouseEvent("mousedown",{...a,button:0,buttons:1}))}catch{}try{t.dispatchEvent(new PointerEvent("pointerup",{...a,button:0,buttons:0}))}catch{}try{t.dispatchEvent(new MouseEvent("mouseup",{...a,button:0,buttons:0}))}catch{}if(typeof t.click=="function")try{t.click()}catch{try{t.dispatchEvent(new MouseEvent("click",{...a,button:0,buttons:0}))}catch{}}else try{t.dispatchEvent(new MouseEvent("click",{...a,button:0,buttons:0}))}catch{}try{let s=Object.keys(t).find(r=>r.startsWith("__reactFiber")||r.startsWith("__reactInternalInstance"));if(s){let r=t[s];for(;r;){let l=r.memoizedProps||r.pendingProps;if(l?.onClick){l.onClick({type:"click",target:t,currentTarget:t,bubbles:!0,cancelable:!0,preventDefault:()=>{},stopPropagation:()=>{}});break}r=r.return}}}catch{}try{let s=Object.keys(t).find(r=>r.startsWith("__reactProps"));if(s){let r=t[s];r?.onClick&&r.onClick({type:"click",target:t,currentTarget:t,bubbles:!0,cancelable:!0,preventDefault:()=>{},stopPropagation:()=>{}})}}catch{}try{let s=t._vei;s?.onClick&&(Array.isArray(s.onClick.value)?s.onClick.value:[s.onClick.value]).forEach(l=>{try{l({type:"click",target:t})}catch{}})}catch{}try{t.$onclick&&t.$onclick({type:"click",target:t,preventDefault:()=>{},stopPropagation:()=>{}})}catch{}try{if(!!(document.querySelector('meta[content*="google.com/forms"], form[action*="formResponse"]')||t.closest("[data-item-id], [jsmodel], [jsaction], .freebirdFormviewerComponentsQuestionBaseRoot"))){let r=t.querySelector('input[type="radio"], input[type="checkbox"]');r&&(r.focus?.(),r.click(),Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"checked")?.set?.call(r,!0),r.dispatchEvent(new Event("change",{bubbles:!0})));let l=t.closest("[jsaction]");if(l&&l!==t)try{l.dispatchEvent(new MouseEvent("click",{bubbles:!0,cancelable:!0,view:window,clientX:o,clientY:i}))}catch{}}}catch{}if(t.getAttribute("role")==="button"||t.getAttribute("tabindex")!==null)try{t.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0,cancelable:!0})),t.dispatchEvent(new KeyboardEvent("keyup",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0,cancelable:!0}))}catch{}}function Me(t){try{let e=t.id,n=!!e;e||(e=`__eq_tmp_${Math.random().toString(36).slice(2,8)}`,t.id=e);let o=document.createElement("script");return o.textContent=`(function(){var el=document.getElementById(${JSON.stringify(e)});if(el){el.dispatchEvent(new MouseEvent('click',{bubbles:true,cancelable:true,composed:true,view:window}));if(typeof el.click==='function')el.click();var fk=Object.keys(el).find(function(k){return k.startsWith('__reactFiber')||k.startsWith('__reactInternalInstance');});if(fk){var fb=el[fk];while(fb){var mp=fb.memoizedProps||fb.pendingProps;if(mp&&typeof mp.onClick==='function'){try{mp.onClick({type:'click',target:el,currentTarget:el,bubbles:true,cancelable:true,preventDefault:function(){},stopPropagation:function(){}});}catch(e){}break;}fb=fb.return;}}var pk=Object.keys(el).find(function(k){return k.startsWith('__reactProps');});if(pk&&el[pk]&&typeof el[pk].onClick==='function'){try{el[pk].onClick({type:'click',target:el,currentTarget:el,bubbles:true,cancelable:true,preventDefault:function(){},stopPropagation:function(){}});}catch(e){}}if(el._vei&&el._vei.onClick){var h=el._vei.onClick.value;var hs=Array.isArray(h)?h:[h];hs.forEach(function(fn){try{fn({type:'click',target:el});}catch(e){}});}}})()`,document.head.appendChild(o),o.remove(),n||setTimeout(()=>{try{t.id===e&&t.removeAttribute("id")}catch{}},0),!0}catch{return!1}}function ke(t,e){let n=t;if(n.hasAttribute("for")){let d=n.getAttribute("for"),u=n.ownerDocument.getElementById(d);u&&(n=u)}if(typeof HTMLSelectElement<"u"&&n instanceof HTMLSelectElement||n.tagName?.toLowerCase()==="select"||n.getAttribute("role")==="combobox"||n.getAttribute("role")==="listbox"||n.matches?.('[role="combobox"], [role="listbox"], [class*="select" i], [class*="dropdown" i]')){Ce(n,[e]);return}let i=n.querySelector('select, [role="combobox"], [role="listbox"]');if(i){Ce(i,[e]);return}if(!(n instanceof HTMLInputElement)&&!(n instanceof HTMLTextAreaElement)&&!(n instanceof HTMLSelectElement)&&!n.isContentEditable){let d=n.querySelector('input:not([type="hidden"]), textarea, select, [contenteditable="true"]');if(d)n=d;else{let f=n.closest('.form-group, .field, [class*="input" i], [class*="control" i], label, tr, td, li, p, div')?.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, select, [contenteditable="true"]');if(f)n=f;else{let c=n.nextElementSibling;for(;c;){if(c instanceof HTMLInputElement&&!["hidden","button","submit","checkbox","radio"].includes(c.type)||c instanceof HTMLTextAreaElement||c instanceof HTMLElement&&c.isContentEditable){n=c;break}let p=c.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(p){n=p;break}c=c.nextElementSibling}}}}if(n instanceof HTMLButtonElement||n.tagName.toLowerCase()==="a"||n.getAttribute("role")==="button"||n instanceof HTMLInputElement&&["button","submit","reset","image"].includes(n.type)){let d=n.parentElement?.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(d)n=d;else{let u=document.body;try{u=J()||document.body}catch{}let f=u.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(f)n=f;else{console.warn("[EasyQuiz] setNativeValue: Nenhum campo de texto encontrado para receber o valor.");return}}}if(!(n instanceof HTMLInputElement)&&!(n instanceof HTMLTextAreaElement)&&!(n instanceof HTMLSelectElement)&&!n.isContentEditable){let d=document.body;try{d=J()||document.body}catch{}let u=d.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(u)n=u;else{console.warn("[EasyQuiz] setNativeValue: Nenhum campo de texto encontrado para receber o valor.");return}}if(n instanceof HTMLInputElement&&["checkbox","radio"].includes(n.type)){let d=["true","1","checked","yes","sim"].includes(e.toLowerCase())||e===n.value;oe(n,d);return}let s=String(e??""),r=s;if(n instanceof HTMLInputElement&&n.type==="number"){let d=s.replace(",",".").replace(/[^0-9.-]/g,"");d&&!isNaN(Number(d))&&(r=d)}try{n.scrollIntoView?.({block:"center",inline:"center",behavior:"instant"}),n.focus?.()}catch{}try{if(n instanceof HTMLInputElement||n instanceof HTMLTextAreaElement){let d=n instanceof HTMLTextAreaElement?HTMLTextAreaElement.prototype:HTMLInputElement.prototype,u=Object.getOwnPropertyDescriptor(d,"value")?.set;u?u.call(n,""):n.value="";try{n.select?.()}catch{}}else if(n.isContentEditable){n.textContent="";try{document.execCommand?.("selectAll",!1,void 0)}catch{}}}catch{}let l=!1;try{n instanceof HTMLInputElement||n instanceof HTMLTextAreaElement?n.type!=="number"&&n.type!=="range"&&(l=document.execCommand?.("insertText",!1,r)||!1):n.isContentEditable&&(l=document.execCommand?.("insertText",!1,r)||!1)}catch{}if(n instanceof HTMLInputElement||n instanceof HTMLTextAreaElement){try{let f=n._valueTracker;f&&f.setValue(r===""?" ":"")}catch{}let d=n instanceof HTMLTextAreaElement?HTMLTextAreaElement.prototype:HTMLInputElement.prototype,u=Object.getOwnPropertyDescriptor(d,"value")?.set;u?u.call(n,r):n.value=r;try{n.dispatchEvent(new KeyboardEvent("keydown",{bubbles:!0,cancelable:!0,key:r.slice(-1)||"a"}))}catch{}try{n.dispatchEvent(new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,composed:!0,data:r,inputType:"insertText"}))}catch{}try{n.dispatchEvent(new InputEvent("input",{bubbles:!0,cancelable:!0,composed:!0,data:r,inputType:"insertText"}))}catch{n.dispatchEvent(new Event("input",{bubbles:!0,cancelable:!0,composed:!0}))}try{n.dispatchEvent(new KeyboardEvent("keyup",{bubbles:!0,cancelable:!0,key:r.slice(-1)||"a"}))}catch{}try{n.dispatchEvent(new Event("change",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}try{n.dispatchEvent(new FocusEvent("blur",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}if(n.value!==r&&!(n instanceof HTMLInputElement&&n.type==="number"&&Number(n.value)===Number(r))){n.value=r;try{u?.call(n,r)}catch{}}return}if(n.isContentEditable){if(n.textContent?.trim()!==r.trim()){n.textContent=r;try{n.innerText=r}catch{}}try{n.dispatchEvent(new InputEvent("input",{bubbles:!0,cancelable:!0,composed:!0,data:r,inputType:"insertText"}))}catch{n.dispatchEvent(new Event("input",{bubbles:!0,cancelable:!0,composed:!0}))}try{n.dispatchEvent(new Event("change",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}try{n.dispatchEvent(new FocusEvent("blur",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}return}try{"value"in n&&(n.value=r),n.dispatchEvent(new Event("input",{bubbles:!0,cancelable:!0,composed:!0})),n.dispatchEvent(new Event("change",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}}function oe(t,e){if(!t)return;let n=t.closest('label, td, .option-card, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, [class*="option" i], [class*="choice" i], li')||t,o=t instanceof HTMLInputElement&&["checkbox","radio"].includes(t.type)?t:n.querySelector('input[type="checkbox"], input[type="radio"]');!o&&n.hasAttribute("for")&&(o=n.ownerDocument.getElementById(n.getAttribute("for")));let i=t instanceof HTMLInputElement?t.closest("label")||(t.id?n.ownerDocument.getElementById(n.getAttribute("for")):null)||t:n&&C(n)?n:t;if(o){let a=o.type==="radio",s=o.type==="checkbox",r=!!o._valueTracker;if(o.checked===e){if(a&&e){n.setAttribute("aria-checked","true"),n.setAttribute("aria-selected","true"),n.classList.add("selected","active","checked");return}if(s){n.setAttribute("aria-checked",e?"true":"false"),n.setAttribute("aria-selected",e?"true":"false"),n.classList.toggle("selected",e),n.classList.toggle("active",e),n.classList.toggle("checked",e);return}}if(i&&i!==o&&V(i),o.checked!==e)try{o.focus?.(),o.click()}catch{}if(o.checked!==e){try{let d=o._valueTracker;d&&d.setValue(!e)}catch{}try{Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"checked")?.set?.call(o,e)}catch{}o.checked=e,It(o,["input","change"])}n.setAttribute("aria-checked",e?"true":"false"),n.setAttribute("aria-selected",e?"true":"false"),n.classList.toggle("selected",e),n.classList.toggle("active",e),n.classList.toggle("checked",e)}else{if((n.getAttribute("aria-checked")==="true"||n.getAttribute("aria-selected")==="true"||n.getAttribute("data-selected")==="true"||n.getAttribute("data-checked")==="true"||n.classList.contains("selected")||n.classList.contains("active")||n.classList.contains("checked"))===e&&e)return;V(i),n.setAttribute("aria-checked",e?"true":"false"),n.setAttribute("aria-selected",e?"true":"false"),n.classList.toggle("selected",e),n.classList.toggle("active",e),n.classList.toggle("checked",e)}}function Ce(t,e){let n=typeof HTMLSelectElement<"u"&&t instanceof HTMLSelectElement||t.tagName?.toLowerCase()==="select"?t:t.querySelector("select");if(n){let s=e.map(d=>w(d).toLowerCase()),r=!1,l=(d,u)=>{d.selected=!0,n.selectedIndex=u;try{n.value=d.value}catch{}try{Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype,"value")?.set?.call(n,d.value)}catch{}try{let f=n._valueTracker;f&&f.setValue(d.value)}catch{}r=!0};for(let d=0;d<n.options.length;d++){let u=n.options[d],f=u.value.toLowerCase(),c=w(u.textContent).toLowerCase();if(s.some(m=>m===f||m===c)){if(l(u,d),!n.multiple)break}else n.multiple||(u.selected=!1)}if(!r)for(let d of s){let u=d.match(/^(?:item|opção|opcao|alternativa|linha|escolha|campo)?\s*#?_?([0-9]+)$/i);if(u){let f=parseInt(u[1],10),p=n.options[0]?.value===""||n.options[0]?.disabled?f:f>=1?f-1:0;if(p>=0&&p<n.options.length&&(l(n.options[p],p),!n.multiple))break}}if(!r){for(let d of s)if(/^[a-z]$/i.test(d)){let u=d.toUpperCase().charCodeAt(0)-65,c=n.options[0]?.value===""||n.options[0]?.disabled?u+1:u;if(c>=0&&c<n.options.length&&(l(n.options[c],c),!n.multiple))break}}if(!r){let d=u=>u.normalize("NFD").replace(/[\u0300-\u036f]/g,"");for(let u=0;u<n.options.length;u++){let f=n.options[u],c=d(f.value.toLowerCase()),p=d(w(f.textContent).toLowerCase());if(s.some(g=>{let h=d(g);return c.includes(h)||p.includes(h)||h.length>2&&(h.includes(c)||h.includes(p))})&&(l(f,u),!n.multiple))break}}if(r){It(n,["focus","input","change","blur"]);return}}let o=t.matches?.('[role="combobox"], [role="listbox"], [class*="select" i], [class*="dropdown" i]')?t:t.closest('[role="combobox"], [role="listbox"], [class*="select" i], [class*="dropdown" i]');o&&V(o);let i=e.map(s=>w(s).toLowerCase()),a=Array.from(document.querySelectorAll('[role="listbox"] [role="option"], [role="menu"] [role="menuitem"], .select-dropdown li, .dropdown-menu .dropdown-item, .ant-select-item-option, .MuiMenuItem-root, [class*="option-item"], li[data-value]')).filter(s=>C(s)&&!O(s));for(let s of i){let r=a.find(d=>{let u=w(d.textContent).toLowerCase(),f=w(d.getAttribute("data-value")||d.getAttribute("value")||"").toLowerCase();return u===s||f===s||u.includes(s)||s.length>2&&s.includes(u)});if(r){V(r);let d=r.querySelector('input[type="radio"], input[type="checkbox"]');d&&oe(d,!0);return}let l=L(s);if(l){V(l);return}}}function dn(t,e){try{let n=new DataTransfer;try{n.setData("text/plain",t)}catch{}try{n.setData("text/html",e)}catch{}return n}catch{return null}}function tt(t){try{t.click()}catch{let e=t.ownerDocument.defaultView||window;t.dispatchEvent(new e.MouseEvent("click",{bubbles:!0,cancelable:!0,composed:!0,view:e}))}}function un(t,e,n){try{if(e.contains(t))return{success:!0,evidence:"origin is child of dest (DOM move confirmed)"};if(!document.body.contains(t))return{success:!0,evidence:"origin removed from DOM (consumed by framework)"};let o=e.children.length;if(n!==void 0&&o>n)return{success:!0,evidence:`dest child count increased: ${n} \u2192 ${o}`};if([t.getAttribute("data-placed")==="true",t.getAttribute("data-assigned")==="true",t.getAttribute("data-matched")==="true",t.getAttribute("aria-grabbed")==="false",/placed|dropped|assigned|matched|done|sorted|categorized/i.test(t.className||"")].some(Boolean))return{success:!0,evidence:"origin has placement indicator: class/attr"};let a=(t.textContent||"").trim().toLowerCase();return a.length>2&&Array.from(e.querySelectorAll("*")).some(l=>l!==e&&(l.textContent||"").trim().toLowerCase()===a)?{success:!0,evidence:"origin text found inside dest children (clone or DOM move)"}:e.getAttribute("data-count")&&parseInt(e.getAttribute("data-count")||"0")>0?{success:!0,evidence:"dest data-count > 0, categorization likely succeeded"}:t.getAttribute("aria-hidden")==="true"||t.style.display==="none"||t.style.visibility==="hidden"?{success:!0,evidence:"origin hidden after drop (framework confirmed placement)"}:{success:!1,evidence:"no DOM evidence of successful drag/categorization"}}catch{return{success:!1,evidence:"verification threw exception"}}}function G(t,e){let n=w(t).toLowerCase();if(!n)return null;if(e==="source"){if(/^[0-9a-f]{10,}$/.test(t.trim())){let r=document.getElementById(t.trim());if(r&&C(r)&&!O(r))return r}let s=['[class*="cursor-grab"][id]',".dnd-card",'[draggable="true"]'];for(let r of s){let d=Array.from(document.querySelectorAll(r)).find(u=>{if(!C(u)||O(u))return!1;let f=w(`${u.id} ${u.textContent||""} ${u.getAttribute("data-id")||""}`).toLowerCase();return f===n||f.includes(n)||u.id===t.trim()});if(d)return d}return null}let o=["[data-dropzone]","[data-category]",'[data-role="dropzone"]','[class*="dropzone" i]','[class*="list-group" i]','[class*="classification-group" i]'].join(","),i=Array.from(document.querySelectorAll(o)),a=i.find(s=>[s.getAttribute("data-category"),s.getAttribute("data-dropzone")].some(r=>r?.trim().toLowerCase()===n));return a&&C(a)&&!O(a)?a:i.find(s=>{if(!C(s)||O(s)||/unclassified/i.test(s.className))return!1;let r=s.querySelector('.font-bold, h1, h2, h3, h4, [class*="header" i], [class*="title" i], [class*="label" i]'),l=w(r?.textContent||s.textContent||"").toLowerCase();return l.includes("op")&&(l.includes("es")||l.includes("\xF5es"))?!1:l===n||l.startsWith(n)||l.includes(n)})||null}async function fe(t,e,n=1){try{t.scrollIntoView({block:"center",inline:"center",behavior:"instant"})}catch{}let o=t.getBoundingClientRect(),i=e.getBoundingClientRect(),a=Math.round(o.left+Math.max(1,o.width/2)),s=Math.round(o.top+Math.max(1,o.height/2)),r=Math.round(i.left+Math.max(1,i.width/2)),l=Math.round(i.top+Math.max(1,i.height/2)),d=w(e.textContent).toLowerCase();if(d){let g=Array.from(t.querySelectorAll('button, [role="button"], input[type="radio"], input[type="checkbox"], option, .btn, [class*="tag" i]')).find(h=>{let b=w(h.textContent).toLowerCase(),y=h instanceof HTMLInputElement||h instanceof HTMLOptionElement?w(h.value).toLowerCase():"";return b&&(d.includes(b)||b.includes(d))||y&&(d.includes(y)||y.includes(d))});g&&(V(g),await new Promise(h=>setTimeout(h,120)))}tt(t),await new Promise(m=>setTimeout(m,140)),tt(e);let u=e.querySelector('[data-role="dropzone"], [class*="bucket" i], [class*="slot" i], [class*="drop" i], [class*="target" i], [class*="items" i], ul, ol');if(u&&u!==e&&tt(u),await new Promise(m=>setTimeout(m,100)),!e.contains(t)&&t.matches('.dnd-card, [draggable="true"]')&&e.matches('.dnd-zone, [data-dropzone], [data-role="dropzone"]')&&e.appendChild(t),e.contains(t)&&t.matches('.dnd-card, [draggable="true"]'))return;let f={bubbles:!0,cancelable:!0,composed:!0,view:window,clientX:a,clientY:s,screenX:a,screenY:s,button:0,buttons:1};try{t.dispatchEvent(new PointerEvent("pointerdown",{...f,isPrimary:!0,pointerId:1,pointerType:"mouse",pressure:.5}))}catch{}t.dispatchEvent(new MouseEvent("mousedown",f));let c=4;for(let m=1;m<=c;m++){let g=Math.round(a+(r-a)*(m/c)),h=Math.round(s+(l-s)*(m/c)),b={...f,clientX:g,clientY:h,screenX:g,screenY:h};try{t.dispatchEvent(new PointerEvent("pointermove",{...b,isPrimary:!0,pointerId:1,pointerType:"mouse",pressure:.5}))}catch{}document.dispatchEvent(new MouseEvent("mousemove",b))}let p={bubbles:!0,cancelable:!0,composed:!0,view:window,clientX:r,clientY:l,screenX:r,screenY:l,button:0,buttons:0};try{e.dispatchEvent(new PointerEvent("pointerup",{...p,isPrimary:!0,pointerId:1,pointerType:"mouse",pressure:0}))}catch{}e.dispatchEvent(new MouseEvent("mouseup",p)),e.dispatchEvent(new MouseEvent("click",p));try{let m=dn(P(t.textContent),t.outerHTML),g={...f},h={...p};m&&(g.dataTransfer=m,h.dataTransfer=m);let b=t.ownerDocument.defaultView?.DragEvent;if(!b)throw new Error("DragEvent n\xE3o dispon\xEDvel neste documento");t.dispatchEvent(new b("dragstart",g)),e.dispatchEvent(new b("dragenter",h)),e.dispatchEvent(new b("dragover",h)),e.dispatchEvent(new b("drop",h)),t.dispatchEvent(new b("dragend",g))}catch(m){console.warn("[EasyQuiz] DragEvent ignorado com seguran\xE7a:",m)}try{let m=new Touch({identifier:1,target:t,clientX:a,clientY:s}),g=new Touch({identifier:1,target:e,clientX:r,clientY:l});t.dispatchEvent(new TouchEvent("touchstart",{bubbles:!0,cancelable:!0,touches:[m]})),e.dispatchEvent(new TouchEvent("touchmove",{bubbles:!0,cancelable:!0,touches:[g]})),e.dispatchEvent(new TouchEvent("touchend",{bubbles:!0,cancelable:!0,touches:[]}))}catch{}if(n>=2&&!e.contains(t))try{t.focus?.(),t.dispatchEvent(new KeyboardEvent("keydown",{key:" ",code:"Space",bubbles:!0})),t.dispatchEvent(new KeyboardEvent("keyup",{key:" ",code:"Space",bubbles:!0})),await new Promise(m=>setTimeout(m,80)),e.focus?.(),e.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",bubbles:!0})),e.dispatchEvent(new KeyboardEvent("keyup",{key:"Enter",code:"Enter",bubbles:!0}))}catch{}if(!e.contains(t))try{let m=b=>{let y=Object.keys(b).find(E=>E.startsWith("__reactFiber")||E.startsWith("__reactInternalInstance"));if(!y)return null;let _=b[y];for(let E=0;E<10&&_;E++){if(_.memoizedProps)return _.memoizedProps;_=_.return}return null},g=m(t),h=m(e);if(g){let b=g.onMouseDown||g.onPointerDown||g.onDragStart;if(typeof b=="function")try{b({type:"mousedown",button:0,buttons:1,clientX:a,clientY:s,bubbles:!0,preventDefault:()=>{},stopPropagation:()=>{},currentTarget:t,target:t}),await new Promise(y=>setTimeout(y,100))}catch{}}if(h){let b=h.onMouseUp||h.onPointerUp||h.onDrop;if(typeof b=="function")try{b({type:"mouseup",button:0,buttons:0,clientX:r,clientY:l,bubbles:!0,preventDefault:()=>{},stopPropagation:()=>{},currentTarget:e,target:e})}catch{}}try{t.focus?.(),t.dispatchEvent(new KeyboardEvent("keydown",{key:" ",code:"Space",keyCode:32,bubbles:!0,cancelable:!0})),await new Promise(y=>setTimeout(y,200));let b=l>s?"ArrowDown":"ArrowUp";for(let y=0;y<3;y++)document.dispatchEvent(new KeyboardEvent("keydown",{key:b,bubbles:!0,cancelable:!0})),await new Promise(_=>setTimeout(_,60));document.dispatchEvent(new KeyboardEvent("keydown",{key:" ",code:"Space",keyCode:32,bubbles:!0,cancelable:!0})),await new Promise(y=>setTimeout(y,80))}catch{}try{!!document.querySelector("[data-rbd-draggable-id], [data-rbd-droppable-id], [data-dnd-kit-sortable]")&&(t.dispatchEvent(new CustomEvent("dndkitdragstart",{bubbles:!0,cancelable:!0,detail:{id:t.id||t.getAttribute("data-id")}})),await new Promise(y=>setTimeout(y,100)),e.dispatchEvent(new CustomEvent("dndkitdrop",{bubbles:!0,cancelable:!0,detail:{overId:e.id||e.getAttribute("data-id")}})))}catch{}}catch(m){console.warn("[EasyQuiz] Estrat\xE9gia G (React DnD internals) falhou:",m)}}var Ot={fill:(t,e)=>{let n=L(t);n?ke(n,e):console.warn(`$eq.fill: Elemento '${t}' n\xE3o encontrado`)},click:t=>{let e=L(t);e?!!(e.closest('.option-card, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, [class*="option" i], [class*="choice" i]')||e.querySelector('input[type="radio"], input[type="checkbox"]')||e instanceof HTMLInputElement&&["checkbox","radio"].includes(e.type))?oe(e,!0):V(e):console.warn(`$eq.click: Elemento '${t}' n\xE3o encontrado`)},check:(t,e)=>{let n=L(t);n?oe(n,e):console.warn(`$eq.check: Elemento '${t}' n\xE3o encontrado`)},find:(t,e)=>L(t,e),drag:(t,e)=>{let n=G(t,"source")||L(t),o=G(e,"destination")||L(e);n&&o?fe(n,o):console.warn(`$eq.drag: Origem ou destino n\xE3o encontrado ('${t}' -> '${e}')`)},categorize:async(t,e)=>{let n=G(t,"source")||L(t),o=G(e,"destination")||L(e);if(!n||!o){console.warn(`$eq.categorize: Item ou categoria n\xE3o encontrados ('${t}' -> '${e}')`);return}await fe(n,o)},execute:(t,e=!1,n=1)=>hn(t,e,n)};typeof window<"u"&&(window.$eq=Ot);async function pn(t,e=1,n=Ze()){if(et(t,n),t.t==="js"){let l=String(t.v||"");Mt(l);try{new Function("$eq","document","window",l)(Ot,document,window)}catch(d){throw console.warn("[EasyQuiz JS Execution]",d),d}return}if(t.t==="drag"){let l=G(t.from,"source")||L(t.from),d=G(t.to,"destination")||L(t.to);!l&&t.from&&(l=L(w(t.from))),!d&&t.to&&(d=L(w(t.to))),l&&d?await fe(l,d,e):console.warn(`[EasyQuiz] Drag: alvo n\xE3o encontrado ('${t.from}' -> '${t.to}')`);return}let o=t.id!==void 0&&t.id!==null?String(t.id):"";!o&&t.t==="val"&&(o=t.target??t.name??t.selector??"1");let i=t.v!==void 0?t.v:t.value!==void 0?t.value:t.val!==void 0?t.val:t.text,a=i!=null?String(i).trim():"",s=null,r=String(t.name??t.n??"").trim();if(!r&&o&&document.querySelector(`input[type="radio"][name="${R(o)}"]`)&&(r=o),(t.t==="chk"||t.t==="clk")&&r){let l=Array.from(document.querySelectorAll(`input[name="${R(r)}"]`));if(a&&(s=l.find(d=>d.value?.toLowerCase()===a.toLowerCase())??null),!s&&a){let d=/^(v|verdadeiro|true|1|t|sim|correto)$/i.test(a),u=/^(f|falso|false|0|nao|não|incorreto|errado)$/i.test(a);if(d||u){let f=d?["v","verdadeiro","true","1","t","sim","correto"]:["f","falso","false","0","nao","n\xE3o","incorreto","errado"];s=l.find(c=>{let p=c.value?.toLowerCase()??"";if(f.includes(p))return!0;let g=(c.closest('label, td, [class*="option" i]')?.textContent??"").trim().toLowerCase();return f.some(h=>g===h||g.startsWith(h+" ")||g.startsWith("("+h+")"))})??null}}!s&&l.length>0&&(s=l[0])}if(s||(s=L(o,a,t.t==="val"||t.t==="sel")),!s&&o&&(s=L(w(o),a,t.t==="val"||t.t==="sel")),s&&a){if(s instanceof HTMLInputElement&&s.type==="radio"&&s.name){if(w(s.value).toLowerCase()!==w(a).toLowerCase()){let l=document.querySelector(`input[type="radio"][name="${R(s.name)}"][value="${R(a)}" i]`);if(l)s=l;else{let u=Array.from(document.querySelectorAll(`input[type="radio"][name="${R(s.name)}"]`)).find(f=>{let c=f.closest("label, .vf-label, .option-card, tr, td, div");return c&&w(c.textContent).toLowerCase().includes(w(a).toLowerCase())});u&&(s=u)}}}else if(!(s instanceof HTMLInputElement)&&!(s instanceof HTMLSelectElement)&&!(s instanceof HTMLTextAreaElement)){let l=s.querySelector(`input[value="${R(a)}" i], [data-value="${R(a)}" i]`);if(l)s=l;else{let u=Array.from(s.querySelectorAll('input[type="radio"], input[type="checkbox"]')).find(f=>{let c=f.closest("label, .vf-label, .option-card, td, div");return c&&w(c.textContent).toLowerCase().includes(w(a).toLowerCase())});u&&(s=u)}}}if(!s&&(t.t==="val"||t.t==="sel")){let l=document.body;try{l=J()||document.body}catch{}let d=Array.from(l.querySelectorAll(t.t==="sel"?'select, [role="combobox"], [role="listbox"]':'input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, select, [contenteditable="true"]')).filter(u=>C(u)&&!O(u));if(d.length===1)s=d[0];else if(d.length>1){let u=w(o).toLowerCase(),f=u.match(/^#?_?([0-9]+)$/);if(f){let c=parseInt(f[1],10);c>=1&&c<=d.length?s=d[c-1]:c>=0&&c<d.length&&(s=d[c])}s||(s=d.find(p=>{let m=(p.getAttribute("placeholder")||"").toLowerCase(),g=(p.name||"").toLowerCase(),h=(p.getAttribute("aria-label")||"").toLowerCase(),b=(p.id||"").toLowerCase(),y=w(We(p)).toLowerCase(),_=w(p.closest('label, tr, td, .form-group, .field, [class*="row" i], div')?.textContent||"").toLowerCase();return m.includes(u)||g.includes(u)||h.includes(u)||b.includes(u)||y&&y.includes(u)||u.length>=2&&_.includes(u)})||(d.length===1?d[0]:null))}}if(!s&&t.t!=="adv")throw new Error(`Alvo '${o}' n\xE3o encontrado no DOM para a\xE7\xE3o '${t.t}'.`);switch(t.t){case"val":if(s){let u=s instanceof HTMLInputElement||s instanceof HTMLTextAreaElement||s instanceof HTMLSelectElement||s.isContentEditable?s:s.querySelector('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]');if(!u){let m=s.closest('.form-group, .field, [class*="input" i], [class*="control" i], label, tr, td, li, p, div')?.querySelector('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]');m&&(u=m)}if(!u){let p=s.nextElementSibling;for(;p;){if(p instanceof HTMLInputElement&&!["hidden","button","submit","checkbox","radio"].includes(p.type)||p instanceof HTMLTextAreaElement||p instanceof HTMLElement&&p.isContentEditable){u=p;break}let m=p.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(m){u=m;break}p=p.nextElementSibling}}if(!u){let p=document.body;try{p=J()||document.body}catch{}let m=Array.from(p.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]')).filter(g=>C(g)&&!O(g));m.length>0&&(u=m[0])}let f=t.v!==void 0?t.v:t.value!==void 0?t.value:t.val!==void 0?t.val:t.text,c=f!=null?String(f):"";ke(u||s,c)}break;case"chk":let l=t.c!==void 0?!!t.c:!0;s&&oe(s,l);break;case"sel":if(s){let u=Array.isArray(t.v)?t.v:[String(t.v)];Ce(s,u)}break;case"clk":if(s)if(!!(s.closest('.option-card, label, .vf-label, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, [class*="option" i], [class*="choice" i], [class*="answer" i], li, tr')||s.querySelector('input[type="radio"], input[type="checkbox"]')||s instanceof HTMLInputElement&&["checkbox","radio"].includes(s.type))){let f=t.c!==void 0?!!t.c:!0;oe(s,f)}else V(s,t.co);break;case"adv":let d=Ht(t.id);if(d){await nt(d,1200);let u=t.id||d.textContent?.trim()||"";u&&ze(window.location.hostname,{advanceSelector:u}),V(d)}else console.warn("[EasyQuiz] Bot\xE3o de avan\xE7o n\xE3o localizado.");break}}function mn(){let t=["button","a",'[role="button"]','input[type="submit"]','input[type="button"]','[data-testid*="check" i]','[data-test-id*="check" i]'].join(",");return Array.from(document.querySelectorAll(t)).find(n=>{if(!C(n)||O(n)||n.closest("header, nav, aside"))return!1;let o=n instanceof HTMLInputElement||n instanceof HTMLButtonElement?n.value:"",i=(n.textContent||o||n.getAttribute("aria-label")||"").trim();return/(verificar|checar|check|conferir|validar|enviar|responder)/i.test(i)})||null}function Ht(t){let e=c=>{let p=(c.getAttribute("aria-label")||c.textContent||(c instanceof HTMLInputElement||c instanceof HTMLButtonElement?c.value:"")||"").trim();return ie.test(p)};if(t){let c=L(t);if(c&&C(c)&&!O(c)&&!N(c)&&!e(c))return c}try{let c=Ne(window.location.hostname);if(c.advanceSelector){let p=L(c.advanceSelector);if(p&&C(p)&&!O(p)&&!N(p)&&!e(p))return p}}catch{}let n=["button","a",'[role="button"]','[role="link"]','input[type="button"]','input[type="submit"]','[data-testid*="next" i]','[data-testid*="continue" i]','[data-testid*="check" i]','[data-test-id*="next" i]','[data-test-id*="continue" i]','[data-test-id*="check" i]','[class*="next" i]','[class*="continue" i]','[class*="proximo" i]','[class*="avancar" i]'].join(","),o=Array.from(document.querySelectorAll(n)),i=c=>{let p=c instanceof HTMLInputElement||c instanceof HTMLButtonElement?c.value:"";return(c.getAttribute("aria-label")||c.textContent||p||"").trim()},a=c=>{let p=i(c).trim();return/^\d{1,3}$/.test(p)?!!c.closest('[class*="pagination" i], [class*="pager" i], [class*="page-nav" i], [class*="step-indicator" i], [class*="breadcrumb" i], [class*="steps" i], [aria-label*="p\xE1gina" i], [aria-label*="page" i], [role="navigation"], nav'):!1},s=o.filter(c=>C(c)&&!O(c)&&!c.closest("header, aside")&&!N(c)&&!e(c));for(let c of s){let p=i(c),m=p.replace(/[\d\(\)\[\]\u2192>\u2022\-\/\\]+/g," ").trim();if((ye.test(p)||ye.test(m))&&!a(c)&&!N(c))return c}for(let c of s)if(X(c)&&!N(c)&&!a(c))return c;let r=document.querySelector('[data-test-id*="next" i], [data-testid*="next" i], [aria-label*="next" i], [aria-label*="pr\xF3xim" i], [aria-label*="avan\xE7ar" i], [aria-label*="continuar" i]');if(r&&C(r)&&!O(r)&&!N(r)&&!e(r))return r;let l=Array.from(document.querySelectorAll('input[type="submit"], button[type="submit"]'));for(let c of l)if(C(c)&&!O(c)&&!e(c)&&!N(c)&&!a(c))return c;let d=Array.from(document.querySelectorAll('button, [role="button"]')),u=window.innerHeight,f=d.filter(c=>{if(!C(c)||O(c)||e(c)||N(c)||c.closest("header, nav, aside, .eq-sidebar")||a(c))return!1;let p=c.getBoundingClientRect();return p.top>u*.45&&p.height>=24&&p.width>=24});if(f.length>0)return f.sort((c,p)=>{let m=c.getBoundingClientRect(),g=p.getBoundingClientRect(),h=m.left+m.top;return g.left+g.top-h}),f[0];for(let c of s)if(X(c)&&!N(c))return c;return null}async function nt(t,e=2500){let n=Date.now();for(;Date.now()-n<e;){if(!(t.disabled===!0||t.getAttribute("aria-disabled")==="true"||t.classList.contains("disabled")||t.getAttribute("disabled")!==null))return;await new Promise(i=>setTimeout(i,80))}}function fn(){let t=window.location.href,e=document.title,n=document.querySelectorAll('input, textarea, select, button, [role="button"], [role="option"], [role="radio"], [role="checkbox"]').length,o=(document.body?.innerText||document.body?.textContent||"").length;return`${t}|${e}|${n}|${o}`}async function gn(t,e=3500){let[n,o,i,a]=t.split("|"),s=parseInt(a||"0",10),r=Date.now();for(;Date.now()-r<e;){let l=window.location.href,d=document.title,u=String(document.querySelectorAll('input, textarea, select, button, [role="button"], [role="option"], [role="radio"], [role="checkbox"]').length),f=(document.body?.innerText||document.body?.textContent||"").length;if(l!==n)return{changed:!0,evidence:`URL mudou: ${n} \u2192 ${l}`};if(d!==o)return{changed:!0,evidence:`T\xEDtulo da p\xE1gina mudou: "${o}" \u2192 "${d}"`};if(Math.abs(parseInt(u)-parseInt(i||"0"))>=2)return{changed:!0,evidence:`Controles interativos: ${i} \u2192 ${u}`};if(Math.abs(f-s)>50)return{changed:!0,evidence:`Conte\xFAdo da p\xE1gina mudou substancialmente (${Math.abs(f-s)} chars)`};await new Promise(c=>setTimeout(c,100))}return{changed:!1,evidence:"Nenhuma mudan\xE7a estrutural detectada dentro do tempo limite."}}async function qt(t){if(t.t==="js"||t.t==="adv")return;if(t.t==="drag"){let a=L(t.from)||L(w(t.from)),s=L(t.to)||L(w(t.to));a&&s&&await fe(a,s,2);return}let e=t.id||"",n=t.v!==void 0?String(t.v).trim():"",o=L(e,n)||L(w(e),n),i=String(t.name??t.n??"").trim();if(!i&&e&&document.querySelector(`input[type="radio"][name="${R(e)}"]`)&&(i=e),!o&&i){let a=Array.from(document.querySelectorAll(`input[name="${R(i)}"]`));if(n&&(o=a.find(s=>s.value?.toLowerCase()===n.toLowerCase())??null),!o&&n){let s=/^(v|verdadeiro|true|1|t|sim|correto)$/i.test(n),r=/^(f|falso|false|0|nao|não|incorreto|errado)$/i.test(n);if(s||r){let l=s?["v","verdadeiro","true","1","t","sim","correto"]:["f","falso","false","0","nao","n\xE3o","incorreto","errado"];o=a.find(d=>{let u=d.value?.toLowerCase()??"";if(l.includes(u))return!0;let c=(d.closest('label, td, [class*="option" i]')?.textContent??"").trim().toLowerCase();return l.some(p=>c===p||c.startsWith(p+" ")||c.startsWith("("+p+")"))})??null}}!o&&a.length>0&&(o=a[0])}if(t.t==="clk"||t.t==="chk"){if(!o&&e){let s=Array.from(document.querySelectorAll('input, label, button, [role="radio"], [role="checkbox"], .option-card, [class*="option" i], [class*="choice" i]')),r=w(e).toLowerCase();o=s.find(l=>{let d=w(l.textContent).toLowerCase();return!!(w(l.value||"").toLowerCase()===r||d===r||d.startsWith(r+")")||d.startsWith("("+r+")")||d.startsWith(r+".")||d.startsWith(r+" - ")||d.startsWith(r+":")||r.length>=3&&d.includes(r))})||null}let a=t.v!==void 0?String(t.v).trim():"";if(o&&a){if(o instanceof HTMLInputElement&&o.type==="radio"&&o.name){if(w(o.value).toLowerCase()!==w(a).toLowerCase()){let s=document.querySelector(`input[type="radio"][name="${R(o.name)}"][value="${R(a)}" i]`);if(s)o=s;else{let l=Array.from(document.querySelectorAll(`input[type="radio"][name="${R(o.name)}"]`)).find(d=>{let u=d.closest("label, .vf-label, .option-card, tr, td, div");return u&&w(u.textContent).toLowerCase().includes(w(a).toLowerCase())});l&&(o=l)}}}else if(!(o instanceof HTMLInputElement)&&!(o instanceof HTMLSelectElement)&&!(o instanceof HTMLTextAreaElement)){let s=o.querySelector(`input[value="${R(a)}" i], [data-value="${R(a)}" i]`);if(s)o=s;else{let l=Array.from(o.querySelectorAll('input[type="radio"], input[type="checkbox"]')).find(d=>{let u=d.closest("label, .vf-label, .option-card, td, div");return u&&w(u.textContent).toLowerCase().includes(w(a).toLowerCase())});l&&(o=l)}}}if(o){let s=o.closest('.option-card, label, .vf-label, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, li')||o,r=o instanceof HTMLInputElement&&["radio","checkbox"].includes(o.type)?o:s.querySelector('input[type="radio"], input[type="checkbox"]')||(s.getAttribute("for")?s.ownerDocument.getElementById(s.getAttribute("for")):null),l=t.c!==void 0?!!t.c:!0;if(oe(r||s,l),r&&r.checked!==l){try{let d=r._valueTracker;d&&d.setValue(!l)}catch{}try{Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"checked")?.set?.call(r,l)}catch{}r.checked=l,r.dispatchEvent(new Event("input",{bubbles:!0,composed:!0})),r.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}}return}if(t.t==="val"){let a=null;if(o&&(a=o instanceof HTMLInputElement||o instanceof HTMLTextAreaElement||o.isContentEditable?o:o.querySelector('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]')),!a){let s=document.body;try{s=J()||document.body}catch{}let r=Array.from(s.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]')),l=w(e).toLowerCase();a=r.find(d=>{let u=(d.getAttribute("placeholder")||"").toLowerCase(),f=(d.name||"").toLowerCase(),c=(d.id||"").toLowerCase(),p=(d.getAttribute("aria-label")||"").toLowerCase();return u.includes(l)||f.includes(l)||c.includes(l)||p.includes(l)})||(r.length>0?r[0]:null)}if(a){let s=String(t.v??"");try{if(a.focus?.(),a.type!=="number"){try{a.select?.()}catch{}document.execCommand?.("insertText",!1,s)}}catch{}ke(a,s)}return}if(t.t==="sel"){if(!o&&e){let a=Array.from(document.querySelectorAll("select")),s=w(e).toLowerCase();o=a.find(r=>{let l=(r.name||"").toLowerCase(),d=(r.id||"").toLowerCase(),u=(r.getAttribute("aria-label")||"").toLowerCase();return l.includes(s)||d.includes(s)||u.includes(s)})||null}if(o){let a=Array.isArray(t.v)?t.v:[String(t.v)];Ce(o,a)}return}}function ee(t){try{if(t.t==="val"){let e=t.v!==void 0?t.v:t.value!==void 0?t.value:t.val!==void 0?t.val:t.text,n=String(e??"").trim(),o=n,i=t.id!==void 0&&t.id!==null?String(t.id):"";i||(i=t.target??t.name??t.selector??"1");let a=L(i,o,!0)||L(w(i),o,!0);if(!a){let p=document.body;try{p=J()||document.body}catch{}let m=Array.from(p.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]')).filter(g=>C(g)&&!O(g));m.length>0&&(a=m[0])}if(!a)return!1;let s=a instanceof HTMLInputElement&&a.type==="radio"?a:a.querySelector('input[type="radio"]');if(s&&s.name){let p=document.querySelector(`input[type="radio"][name="${R(s.name)}"]:checked`);if(!p)return!1;let m=w(p.value).toLowerCase(),g=w(n).toLowerCase(),h=w(p.closest("label, .vf-label, .option-card, tr, td, div")?.textContent||"").toLowerCase();return m===g||h===g||h.includes(g)}let r=a instanceof HTMLInputElement||a instanceof HTMLTextAreaElement||a.isContentEditable?a:a.querySelector('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(!r){let m=a.closest('.form-group, .field, [class*="input" i], [class*="control" i], label, tr, td, li, p, div')?.querySelector('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]');m&&(r=m)}if(!r){let p=a.nextElementSibling;for(;p;){if(p instanceof HTMLInputElement&&!["hidden","button","submit","checkbox","radio"].includes(p.type)||p instanceof HTMLTextAreaElement||p instanceof HTMLElement&&p.isContentEditable){r=p;break}let m=p.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(m){r=m;break}p=p.nextElementSibling}}if(r instanceof HTMLSelectElement){let p=w(n).toLowerCase();return Array.from(r.options).some(m=>{if(!m.selected)return!1;let g=m.value.toLowerCase(),h=w(m.textContent).toLowerCase();return p===g||p===h||g.includes(p)||h.includes(p)})}let l=(r instanceof HTMLInputElement||r instanceof HTMLTextAreaElement?r.value:r?.textContent??a.textContent??"").trim();if(!l&&!n)return!0;if(!l&&n)return!1;let d=l.replace(",",".").replace(/\s+/g,"").toLowerCase(),u=n.replace(",",".").replace(/\s+/g,"").toLowerCase(),f=parseFloat(d),c=parseFloat(u);return!isNaN(f)&&!isNaN(c)&&d.match(/^-?[\d.,]+$/)&&u.match(/^-?[\d.,]+$/)?Math.abs(f-c)<1e-4:d===u||l.toLowerCase()===n.toLowerCase()||u.length>=3&&d===u}if(t.t==="sel"){let e=L(t.id,void 0,!0)||L(w(t.id),void 0,!0);if(!e){let a=document.body;try{a=J()||document.body}catch{}let s=Array.from(a.querySelectorAll('select, [role="combobox"], [role="listbox"]')).filter(d=>C(d)&&!O(d)),r=w(t.id).toLowerCase();e=s.find(d=>{let u=(d.id||"").toLowerCase(),f=(d.getAttribute("name")||"").toLowerCase(),c=(d.getAttribute("aria-label")||"").toLowerCase(),p=w(d.closest('.dropdown-row, [class*="dropdown" i], [class*="select" i], tr, label, div')?.textContent||"").toLowerCase();return u.includes(r)||f.includes(r)||c.includes(r)||r.length>=2&&p.includes(r)})||(s.length===1?s[0]:null)}if(!e)return!1;let n=e instanceof HTMLSelectElement?e:e.querySelector("select");if(!n){let a=e.matches?.('[role="combobox"], [role="listbox"], [class*="select" i], [class*="dropdown" i]')?e:e.closest('[role="combobox"], [role="listbox"], [class*="select" i], [class*="dropdown" i]');if(a){let r=(Array.isArray(t.v)?t.v:[String(t.v)]).map(d=>w(d).toLowerCase()),l=w(a.textContent).toLowerCase();return r.some(d=>l.includes(d)||d.includes(l))}return!1}let i=(Array.isArray(t.v)?t.v:[String(t.v)]).map(a=>w(a).toLowerCase());return Array.from(n.options).some(a=>{if(!a.selected)return!1;let s=a.value.toLowerCase(),r=w(a.textContent).toLowerCase();return i.some(l=>l===s||l===r||s.includes(l)||r.includes(l))})}if(t.t==="chk"||t.t==="clk"){let e=t.v!==void 0?String(t.v).trim():"",n=String(t.name??t.n??"").trim();if(n&&!t.id){let c=Array.from(document.querySelectorAll(`input[name="${R(n)}"]`));if(c.length>0){let p=c.find(y=>y.checked);if(!p)return!1;if(!e)return!0;let m=p.value?.toLowerCase()??"",g=e.toLowerCase();if(m===g)return!0;let h=/^(v|verdadeiro|true|1|t|sim|correto)$/i.test(e),b=/^(f|falso|false|0|nao|não|incorreto|errado)$/i.test(e);return h?/^(v|verdadeiro|true|1|t|sim|correto)$/i.test(m):b?/^(f|falso|false|0|nao|não|incorreto|errado)$/i.test(m):!1}}let o=L(t.id,e)||L(w(t.id),e);if(!o&&n){let c=document.querySelector(`input[name="${R(n)}"]`);c&&(o=c)}if(!o)return!1;let i=o.closest('.option-card, label, .vf-label, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, li')||o,a=o instanceof HTMLInputElement&&["checkbox","radio"].includes(o.type)?o:i.querySelector('input[type="checkbox"], input[type="radio"]')||(i.getAttribute("for")?i.ownerDocument.getElementById(i.getAttribute("for")):null),s=t.t==="chk"||t.c!==void 0?!!t.c:!0;if(a&&a.type==="radio"){if(a.checked===s)return!0;if(t.v&&a.name){let c=w(String(t.v)).toLowerCase(),p=document.querySelector(`input[type="radio"][name="${R(a.name)}"]:checked`);if(!p)return!1;if(p===a)return!0;let m=w(p.value).toLowerCase(),g=w(p.closest("label, .vf-label, .option-card, tr, td, div")?.textContent||"").toLowerCase();return m===c||g.includes(c)||c.includes(m)}}if(a&&["checkbox","radio"].includes(a.type))return a.checked===s;let r=i.getAttribute("aria-checked")===String(s)||i.getAttribute("aria-selected")===String(s)||i.getAttribute("aria-pressed")===String(s),l=s?i.getAttribute("data-selected")==="true"||i.getAttribute("data-checked")==="true"||i.getAttribute("data-active")==="true"||i.getAttribute("data-state")==="checked"||i.getAttribute("data-state")==="on":i.getAttribute("data-selected")==="false"||i.getAttribute("data-checked")==="false"||i.getAttribute("data-state")==="unchecked",d=i.className||"",u=s?/\b(active|selected|checked|picked|is-selected|choice-selected|selected-option|is-checked|chosen|current)\b/i.test(d):!/\b(active|selected|checked|picked|is-selected|choice-selected|selected-option|is-checked|chosen|current)\b/i.test(d);if(r||l||u)return!0;let f=!!i.closest('[role="radiogroup"], [role="listbox"], .options, .choices, [class*="option" i], [class*="choice" i], [class*="answer" i], [class*="quiz" i]');return t.t==="clk"&&!a&&!f||i.getAttribute("aria-expanded")!==null||i.getAttribute("aria-pressed")!==null}if(t.t==="drag"){let e=G(t.from,"source")||L(t.from)||L(w(t.from)),n=G(t.to,"destination")||L(t.to)||L(w(t.to));return!e||!n?!1:un(e,n).success}}catch{}return!1}async function hn(t,e,n=1,o=Ze({engine:"smart",autoAdvance:e})){let i=t.actions.filter(v=>v.t!=="adv"),a=t.actions.filter(v=>v.t==="adv"),s=0,r=[],l=new Map,d=new Map,u=new Map,f=new Set,c=t.pageType==="question"||i.length>0,p=i.filter(v=>v.t==="chk"||v.t==="clk"&&v.c!==void 0),m=new Map;for(let v of i){let k=[];d.set(v,k);try{if(v.t==="drag"){k.push("declarative-A-F");try{let T=G(v.from,"source")||L(v.from),S=G(v.to,"destination")||L(v.to);T&&u.set(v,T.parentElement?.outerHTML?.slice(0,500)||""),S&&m.set(v,S.children.length)}catch{}}else k.push("declarative-primary");await pn(v,n,o),s++,f.add(v)}catch(T){l.set(v,T instanceof Error?T.message:String(T)),console.warn("[EasyQuiz] A\xE7\xE3o declarativa prim\xE1ria falhou com seguran\xE7a:",v,T)}await new Promise(T=>setTimeout(T,v.t==="drag"?180:35))}if(c&&t.mode==="escolha_multipla"&&p.length>0){let v=document.body;try{v=J()||document.body}catch{}let k=Array.from(v.querySelectorAll('input[type="checkbox"], [role="checkbox"]')).filter(T=>C(T)&&!O(T));if(k.length>1){let S=function(M,q){if(M===q||M.contains(q)||q.contains(M))return!0;let H=M.closest('.option-card, label, [role="checkbox"], [role="option"], tr, li, [class*="option" i]'),I=q.closest('.option-card, label, [role="checkbox"], [role="option"], tr, li, [class*="option" i]');if(H&&I&&H===I)return!0;let K=M.getAttribute("for")||M.id,B=q.getAttribute("for")||q.id;return!!(K&&B&&K===B)};var z=S;let T=new Set;for(let M of p){let q=M.t==="chk"?!!M.c:!!(M.c??!0),H="id"in M&&typeof M.id=="string"?M.id:"";if(q&&H){let I=L(H,M.v);if(I){T.add(I);let K=I.querySelector('input[type="checkbox"]');K&&T.add(K);let B=I.closest('.option-card, label, [role="checkbox"], tr, li, [class*="option" i]');B&&(T.add(B),B.querySelectorAll('input[type="checkbox"]').forEach(D=>T.add(D)))}}}if(T.size>=p.length&&T.size>0){let M=Array.from(T);for(let q of k)M.some(I=>S(I,q))||(q instanceof HTMLInputElement&&q.checked||q.getAttribute("aria-checked")==="true"||q.closest(".option-card, label")?.classList.contains("selected"))&&oe(q,!1)}}}await new Promise(v=>setTimeout(v,i.length>0?100:25));let g=0;for(let v of i){if(ee(v)){g++;continue}console.warn(`[EasyQuiz Auto-Cura] A\xE7\xE3o '${v.t}' no alvo '${v.id||v.from||""}' n\xE3o verificada no DOM. Disparando Passagem 2 de conting\xEAncia...`);try{et(v,o),d.get(v)?.push("alternative-path"),await qt(v)}catch(k){l.set(v,k instanceof Error?k.message:String(k)),console.warn("[EasyQuiz Auto-Cura] Rota alternativa falhou:",k)}await new Promise(k=>setTimeout(k,250)),ee(v)&&(console.log("[EasyQuiz Auto-Cura] \u2713 A\xE7\xE3o recuperada com sucesso pela rota de conting\xEAncia!"),g++,f.has(v)?l.has(v)&&l.delete(v):(l.delete(v),s++,f.add(v)))}if(g<i.length&&i.length>0){console.warn(`[EasyQuiz Auto-Cura] ${i.length-g} de ${i.length} a\xE7\xE3o(\xF5es) ainda n\xE3o verificadas. Disparando Passagem 3 final...`),await new Promise(v=>setTimeout(v,200));for(let v of i)if(!ee(v))try{if(await qt(v),await new Promise(k=>setTimeout(k,80)),!ee(v)&&(v.t==="clk"||v.t==="chk"))try{let k="id"in v?String(v.id||""):"",T=v.v!==void 0?String(v.v).trim():"",S=L(k,T)||L(w(k),T);S&&(Me(S),await new Promise(M=>setTimeout(M,120)))}catch{}}catch(k){l.set(v,k instanceof Error?k.message:String(k))}await new Promise(v=>setTimeout(v,200)),g=0;for(let v of i)ee(v)&&(g++,f.has(v)?l.has(v)&&l.delete(v):(l.delete(v),s++,f.add(v)))}let h=[];for(let[v,k]of i.entries())if(!ee(k)){let T=k.t==="drag"?`${k.from} -> ${k.to}`:"id"in k&&k.id?k.id:k.t;r.push(T),h.push({actionIndex:v,action:k,strategiesAttempted:d.get(k)||[],evidence:l.get(k)||"sem evid\xEAncia de aplica\xE7\xE3o no DOM",domSnapshot:u.get(k)}),k.t==="drag"&&console.warn(`[EasyQuiz Drag] FALHA CONFIRMADA: "${k.from}" -> "${k.to}"`,`
  Estrat\xE9gias: ${(d.get(k)||[]).join(", ")}`,`
  Snapshot DOM: ${u.get(k)?.slice(0,200)||"n/a"}`)}c&&i.length===0&&r.push("nenhuma a\xE7\xE3o de resposta prescrita");let b=i.map((v,k)=>{let T=v.t==="drag"?`${v.from} -> ${v.to}`:v.t==="js"?"$eq":v.id||v.t,S=v.t==="js"?!0:v.t==="drag"?!!(G(v.from,"source")&&G(v.to,"destination")):!!(L(v.id||"")||L(w(v.id||""))),M=ee(v);return{index:k,action:v,target:T,located:S,applied:!l.has(v),verified:M,strategy:v.t==="drag"?"drag-adaptive":v.t==="js"?"javascript":"declarative-dom",evidence:M?"estado do controle confirmado no DOM":"nenhuma evid\xEAncia suficiente ap\xF3s as tentativas",...l.has(v)?{error:l.get(v)}:{}}}),y=c?i.length>0&&r.length===0&&(g===i.length||s===i.length&&g>0):!0,_=!1,E=!1,x="Nenhuma a\xE7\xE3o de navega\xE7\xE3o solicitada.",A=c?g>0&&g>=Math.ceil(i.length/2):s>0&&s>=i.length/2,$=c?g>0&&(y||A):y||i.length===0||A;if(e&&$){await new Promise(T=>setTimeout(T,i.length>0?120:40));let v=!1,k=null;if(t.pageType!=="info"){let T=mn();if(T&&C(T)){await nt(T,1200),V(T),v=!0,k=T,await new Promise(q=>setTimeout(q,350));let S=document.querySelector('.feedback-message.error, [class*="feedback"][class*="error" i], [role="alert"][class*="error" i]');S&&C(S)&&(S.textContent||"").trim().length>0?(_=!1,E=!1,x=`Aviso do formul\xE1rio ap\xF3s checagem: ${S.textContent?.trim().slice(0,100)}`):(_=!0,E=!0,x="Resposta confirmada via bot\xE3o de verifica\xE7\xE3o/envio.")}}if(!v){let T=fn(),S=a.length>0&&"id"in a[0]?a[0].id:void 0,M=Ht(S);if(M){await nt(M,1500);let q=S||M.textContent?.trim()||"";q&&ze(window.location.hostname,{advanceSelector:q}),V(M);let H=await gn(T,1800);E=H.changed,x=H.evidence,_=H.changed||!0,H.changed||console.warn("[EasyQuiz] O bot\xE3o de avan\xE7o foi acionado, mas a navega\xE7\xE3o ainda n\xE3o concluiu.")}else console.warn("[EasyQuiz] Nenhum bot\xE3o de avan\xE7o encontrado na p\xE1gina.")}}return{applied:s,verified:g,success:y,advanced:_,failed:r,reports:b,navigationVerified:E,navigationEvidence:x,failedActions:h}}var Le=class{el=null;state="idle";mouseX=-300;mouseY=-300;displayX=-300;displayY=-300;rafId=null;flashTimer=null;boundMove;constructor(){this.boundMove=e=>{this.mouseX=e.clientX,this.mouseY=e.clientY,this.displayX===-300&&(this.displayX=e.clientX,this.displayY=e.clientY)},window.addEventListener("mousemove",this.boundMove,{passive:!0}),this.injectStyle(),this.createEl(),this.startRaf()}injectStyle(){if(document.getElementById("__eqdc_style__"))return;let e=document.createElement("style");e.id="__eqdc_style__",e.textContent=`
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
        </svg>`)}}getState(){return this.state}flashOk(e=2e3){this.flashTimer&&clearTimeout(this.flashTimer),this.setState("ok"),this.flashTimer=window.setTimeout(()=>{this.state==="ok"&&this.setState("idle")},e)}flashError(e=2500){this.flashTimer&&clearTimeout(this.flashTimer),this.setState("error"),this.flashTimer=window.setTimeout(()=>{this.state==="error"&&this.setState("idle")},e)}destroy(){window.removeEventListener("mousemove",this.boundMove),this.rafId!==null&&cancelAnimationFrame(this.rafId),this.flashTimer&&clearTimeout(this.flashTimer),this.el?.remove(),this.el=null,document.getElementById("__eqdc_style__")?.remove()}};var qe=class{container=null;currentEl=null;currentTimer=null;currentPersistId=null;lastText="";constructor(){this.injectStyle(),this.createContainer()}injectStyle(){if(document.getElementById("__eqdt_style__"))return;let e=document.createElement("style");e.id="__eqdt_style__",e.textContent=`
      @keyframes __eqdt_in__  { from{opacity:0} to{opacity:1} }
      @keyframes __eqdt_out__ { from{opacity:1} to{opacity:0} }
      .__eqdt_in__  { animation: __eqdt_in__  0.1s ease forwards; }
      .__eqdt_out__ { animation: __eqdt_out__ 0.18s ease forwards; }
    `,document.documentElement.appendChild(e)}createContainer(){this.container=document.createElement("div"),this.container.id="__eqdiscrete_toasts__",Object.assign(this.container.style,{position:"fixed",bottom:"0",right:"0",zIndex:"2147483645",pointerEvents:"none"}),document.documentElement.appendChild(this.container)}makeEl(e){let n=document.createElement("div");return n.className="__eqdt_in__",Object.assign(n.style,{background:"rgba(30,30,30,0.96)",color:"#ffffff",borderRadius:"0",borderTopLeftRadius:"3px",padding:"2px 6px",fontSize:"9.5px",fontFamily:'system-ui,-apple-system,"Segoe UI",sans-serif',fontWeight:"400",lineHeight:"1.4",whiteSpace:"nowrap",maxWidth:"170px",overflow:"hidden",textOverflow:"ellipsis",userSelect:"none",display:"block",boxShadow:"none"}),n.textContent=e,n}show(e,n=3e3,o=!1){if(this.lastText=e,this.clearCurrent(!0),!this.container)return"";let i=this.makeEl(e);this.container.appendChild(i),this.currentEl=i;let a=`t_${Date.now()}`;return i.setAttribute("data-tid",a),o?this.currentPersistId=a:(this.currentTimer=window.setTimeout(()=>this.clearCurrent(!1),n),this.currentPersistId=null),a}flash(e,n=3e3){this.show(e,n)}persist(e){return this.show(e,0,!0)}dismiss(e){this.currentPersistId===e&&(this.clearCurrent(!1),this.currentPersistId=null)}dismissAll(){this.clearCurrent(!0)}replace(e,n){return this.dismiss(e),this.persist(n)}reshow(){this.lastText&&this.show(this.lastText,2e3)}clearCurrent(e){this.currentTimer!==null&&(clearTimeout(this.currentTimer),this.currentTimer=null);let n=this.currentEl;n&&(this.currentEl=null,this.currentPersistId=null,e?n.remove():(n.className="__eqdt_out__",setTimeout(()=>n.remove(),200)))}destroy(){this.clearCurrent(!0),this.container?.remove(),this.container=null,document.getElementById("__eqdt_style__")?.remove()}};var Ie=class{el=null;lastMouseX=0;lastMouseY=0;onModelChange;boundMouseMove;boundOutside;autoTimer=null;constructor(e){this.onModelChange=e.onModelChange,this.boundMouseMove=n=>{this.lastMouseX=n.clientX,this.lastMouseY=n.clientY},this.boundOutside=n=>{n instanceof KeyboardEvent&&n.key!=="Escape"||n instanceof MouseEvent&&this.el?.contains(n.target)||this.close()},window.addEventListener("mousemove",this.boundMouseMove,{passive:!0}),this.injectStyle()}injectStyle(){if(document.getElementById("__eqdm_style__"))return;let e=document.createElement("style");e.id="__eqdm_style__",e.textContent=`
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
    `,document.documentElement.appendChild(e)}open(){this.close();let n=te().model,o=[...Ee],i=(we||[]).filter(g=>!o.some(h=>h.id===g.id)),a=document.createElement("div");a.id="__eqdm_menu__",a.setAttribute("role","menu"),a.tabIndex=-1;let s=document.createElement("div");s.className="__eqdm_section__",s.textContent="Modelo Gemini",a.appendChild(s);let r=document.createElement("div");r.className="__eqdm_sep__",a.appendChild(r);let l=(g,h,b)=>{let y=g===n,_=document.createElement("div");_.className="__eqdm_item__",_.setAttribute("role","menuitemradio"),_.setAttribute("aria-checked",y?"true":"false"),_.tabIndex=0;let E=document.createElement("span");E.className="__eqdm_check__",y&&(E.innerHTML=`<svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
          <path d="M1.5 6.5L4.5 9.5L10.5 2.5" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`),_.appendChild(E);let x=document.createElement("span");if(x.className="__eqdm_name__",x.textContent=h,y&&(x.style.fontWeight="500"),_.appendChild(x),b){let A=document.createElement("span");A.className="__eqdm_badge__",A.textContent=b,_.appendChild(A)}_.addEventListener("click",()=>{ge({model:g}),this.onModelChange?.(g),this.close()}),_.addEventListener("keydown",A=>{(A.key==="Enter"||A.key===" ")&&(A.preventDefault(),ge({model:g}),this.onModelChange?.(g),this.close())}),a.appendChild(_)};for(let g of o){let h;g.id.includes("3.8")||g.id.includes("3.7")?h="Novo":g.id.includes("flash-lite")?h="Eco":g.id.includes("pro")&&(h="Pro");let b=g.name.replace(/\s*\(.*?\)\s*/g,"").trim();l(g.id,b,h)}if(i.length>0){let g=document.createElement("div");g.className="__eqdm_sep__",a.appendChild(g);let h=document.createElement("div");h.className="__eqdm_section__",h.textContent="Modelos da conta",a.appendChild(h);for(let b of i)l(b.id,b.name.replace(/\s*\(.*?\)\s*/g,"").trim())}document.documentElement.appendChild(a),this.el=a;let{offsetWidth:d,offsetHeight:u}=a,f=this.lastMouseX,c=this.lastMouseY,p=window.innerWidth,m=window.innerHeight;f+d+8>p&&(f=p-d-8),c+u+8>m&&(c=m-u-8),f<4&&(f=4),c<4&&(c=4),a.style.left=`${f}px`,a.style.top=`${c}px`,a.focus(),setTimeout(()=>{window.addEventListener("click",this.boundOutside,{capture:!0}),window.addEventListener("keydown",this.boundOutside,{capture:!0})},50),this.autoTimer=window.setTimeout(()=>this.close(),8e3)}close(){this.autoTimer&&(clearTimeout(this.autoTimer),this.autoTimer=null),window.removeEventListener("click",this.boundOutside,{capture:!0}),window.removeEventListener("keydown",this.boundOutside,{capture:!0}),this.el?.remove(),this.el=null}isOpen(){return this.el!==null}destroy(){this.close(),window.removeEventListener("mousemove",this.boundMouseMove),document.getElementById("__eqdm_style__")?.remove()}};var Oe=class{el=null;coin;toast;boundEsc;constructor(e,n){this.coin=e,this.toast=n,this.boundEsc=o=>{o.key==="Escape"&&this.isOpen()&&(o.stopPropagation(),o.preventDefault(),this.close())},this.injectStyle()}injectStyle(){if(document.getElementById("__eqkm_style__"))return;let e=document.createElement("style");e.id="__eqkm_style__",e.textContent=`
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
    `,o.appendChild(i),document.documentElement.appendChild(o),this.el=o;let a=i.querySelector("#__eqkm_ta__"),s=i.querySelector("#__eqkm_count__"),r=i.querySelector("#__eqkm_status__");a.value=n,this.updateCount(a.value,s),a.addEventListener("input",()=>this.updateCount(a.value,s)),i.querySelector("#__eqkm_close__").addEventListener("click",()=>this.close()),i.querySelector("#__eqkm_cancel__").addEventListener("click",()=>this.close()),i.querySelector("#__eqkm_save__").addEventListener("click",()=>{let l=this.parseKeys(a.value);ge({apiKey:l[0]||"",apiKeys:l}),this.toast.flash("Config Saved"),this.coin.flashOk(1200),this.close()}),i.querySelector("#__eqkm_verify__").addEventListener("click",async()=>{let l=this.parseKeys(a.value);if(!l.length){r.style.color="#c5221f",r.textContent="Insira ao menos uma chave.";return}r.style.color="#70757a",r.textContent="Verificando\u2026",this.coin.setState("loading");try{let d=te().model,u=await yt(d,l);u.ok?(r.style.color="#137333",r.textContent=`\u2713 Acesso v\xE1lido \u2014 ${u.model}`,this.coin.flashOk(),this.toast.flash("Access OK")):(r.style.color="#c5221f",r.textContent=`\u2717 ${u.message.slice(0,55)}`,this.coin.flashError(),this.toast.flash("Access Denied"))}catch{r.style.color="#c5221f",r.textContent="\u2717 Erro ao verificar.",this.coin.flashError()}}),o.addEventListener("click",l=>{l.target===o&&this.close()}),window.addEventListener("keydown",this.boundEsc,{capture:!0}),requestAnimationFrame(()=>a.focus())}parseKeys(e){return e.split(/[\n\r,]+/).map(n=>n.trim().replace(/^["']|["']$/g,"")).filter(n=>n.length>5)}updateCount(e,n){let o=this.parseKeys(e).length;n.textContent=o===0?"":`${o} chave${o!==1?"s":""} cadastrada${o!==1?"s":""}`}close(){window.removeEventListener("keydown",this.boundEsc,{capture:!0}),this.el?.remove(),this.el=null}isOpen(){return this.el!==null}destroy(){this.close()}};var He=class{active=[];constructor(){this.injectStyle()}injectStyle(){if(document.getElementById("__eqsh_style__"))return;let e=document.createElement("style");e.id="__eqsh_style__",e.textContent=`
      @keyframes __eqsh_p__ {
        0%,100% { outline-color: rgba(0,120,212,0.15); }
        50%     { outline-color: rgba(0,120,212,0.26); }
      }
      .__eqsh__ {
        outline: 1px solid rgba(0,120,212,0.17) !important;
        outline-offset: 2px !important;
        animation: __eqsh_p__ 2.5s ease-in-out infinite !important;
      }
    `,document.documentElement.appendChild(e)}highlightTarget(e){this.clearAll();for(let n of e)!n||this.active.some(o=>o.el===n)||(this.active.push({el:n,orig:n.style.outline,origOffset:n.style.outlineOffset}),n.classList.add("__eqsh__"))}clearAll(){for(let{el:e,orig:n,origOffset:o}of this.active)e.classList.remove("__eqsh__"),e.style.outline=n,e.style.outlineOffset=o;this.active=[]}destroy(){this.clearAll(),document.getElementById("__eqsh_style__")?.remove()}};var $e=class{opts;lastSignature="";pollTimer=null;debounceTimer=null;cooldownUntil=0;POLL_MS=180;DEBOUNCE_MS=60;COOLDOWN_MS=150;origPush=typeof history<"u"?history.pushState.bind(history):null;origReplace=typeof history<"u"?history.replaceState.bind(history):null;constructor(e){this.opts=e}start(){this.lastSignature=this.getSignature(),this.patchHistory(),window.addEventListener("popstate",this.onUrlChange,{capture:!0,passive:!0}),this.pollTimer=window.setInterval(this.poll,this.POLL_MS)}stop(){this.unpatchHistory(),window.removeEventListener("popstate",this.onUrlChange,{capture:!0}),this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null),this.debounceTimer&&(clearTimeout(this.debounceTimer),this.debounceTimer=null)}resetHash(){this.lastSignature=this.getSignature(),this.cooldownUntil=Date.now()+this.COOLDOWN_MS}patchHistory(){if(typeof history>"u")return;let e=this;history.pushState=function(...n){e.origPush?.(...n),e.onUrlChange()},history.replaceState=function(...n){e.origReplace?.(...n),e.onUrlChange()}}unpatchHistory(){typeof history>"u"||!this.origPush||!this.origReplace||(history.pushState=this.origPush,history.replaceState=this.origReplace)}onUrlChange=()=>{let e=this.getSignature();e&&e!==this.lastSignature&&this.debounce()};poll=()=>{let e=this.getSignature();e&&e!==this.lastSignature&&this.debounce()};getSignature(){try{let e=Ae(!1)||_e();return e&&e.questionText?Tt(e):`${location.href}|${document.title}|${(document.body?.innerText||"").slice(0,300)}`}catch{return""}}debounce(){this.debounceTimer&&clearTimeout(this.debounceTimer);let e=Date.now(),n=e<this.cooldownUntil?Math.max(this.cooldownUntil-e+80,this.DEBOUNCE_MS):this.DEBOUNCE_MS;this.debounceTimer=window.setTimeout(()=>{let o=this.getSignature();o&&o!==this.lastSignature&&this.opts.onPageAdvance()!==!1&&(this.lastSignature=o,this.cooldownUntil=Date.now()+this.COOLDOWN_MS)},n)}};var ot=new Set(["Control","Alt","Meta","Shift","CapsLock","Tab","Escape","F1","F2","F3","F4","F5","F6","F7","F8","F9","F10","F11","F12","PrintScreen","ScrollLock","Pause","Insert","Home","End","PageUp","PageDown","ArrowLeft","ArrowRight","ArrowUp","ArrowDown","ContextMenu","NumLock"]),at=t=>t.altKey||t.shiftKey&&"QAMZRHIC".includes(t.key.toUpperCase()),$t=typeof HTMLInputElement<"u"?Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"value")?.set:void 0,Pt=typeof HTMLTextAreaElement<"u"?Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype,"value")?.set:void 0,Pe=class{flow=[];stepIdx=0;state="idle";isExecuting=!1;stepping=!1;pendingClick=!1;lastClickTs=0;coin;toast;highlight;debugOutput;stepTimer=null;charsInserted=new Map;failedSteps=new Set;boundKey;boundKeypress;boundBeforeInput;boundKeyup;boundClick;constructor(e,n,o,i){this.coin=e,this.toast=n,this.highlight=o,this.debugOutput=i,this.boundKey=this.onKey.bind(this),this.boundKeypress=this.onKeypress.bind(this),this.boundBeforeInput=this.onBeforeInput.bind(this),this.boundKeyup=this.onKeyup.bind(this),this.boundClick=this.onClick.bind(this)}setDebugOutput(e){this.debugOutput=e}start(e){this.abort(),e?.length&&(this.flow=e,this.stepIdx=0,this.charsInserted.clear(),this.failedSteps.clear(),this.state="idle",this.isExecuting=!1,this.stepping=!1,this.pendingClick=!1,this.debugOutput?.setFlow(e),this.attach(),this.gotoStep(0))}abort(){this.unlockAllInputs();let e=this.isActive();this.state="aborted",this.isExecuting=!1,this.stepping=!1,this.pendingClick=!1,this.detach(),this.clearTimer(),this.highlight.clearAll(),e&&(this.coin.flashError(800),this.toast.flash("Abortado"),this.debugOutput?.log("FLOW","Fluxo abortado pelo usu\xE1rio"))}isActive(){return this.state==="waiting_key"||this.state==="waiting_click"}getState(){return this.state}getCurrentStep(){return this.stepIdx}getTotalSteps(){return this.flow.length}lockedInputs=new Set;lockInput(e,n){try{e.readOnly=!0}catch{}let o=()=>{if(e.value!==""&&e.value!==n){let i=e instanceof HTMLInputElement?HTMLInputElement.prototype:HTMLTextAreaElement.prototype,a=(e instanceof HTMLInputElement?$t:Pt)||Object.getOwnPropertyDescriptor(i,"value")?.set;a?a.call(e,n):e.value=n}};e.addEventListener("input",o,{capture:!0}),this.lockedInputs.add({el:e,sanitizer:o})}unlockAllInputs(){for(let e of this.lockedInputs){try{e.el.readOnly=!1}catch{}e.el.removeEventListener("input",e.sanitizer,{capture:!0})}this.lockedInputs.clear()}attach(){for(let e of[window,document])e.addEventListener("keydown",this.boundKey,{capture:!0}),e.addEventListener("keypress",this.boundKeypress,{capture:!0}),e.addEventListener("beforeinput",this.boundBeforeInput,{capture:!0}),e.addEventListener("keyup",this.boundKeyup,{capture:!0}),e.addEventListener("click",this.boundClick,{capture:!0})}detach(){for(let e of[window,document])e.removeEventListener("keydown",this.boundKey,{capture:!0}),e.removeEventListener("keypress",this.boundKeypress,{capture:!0}),e.removeEventListener("beforeinput",this.boundBeforeInput,{capture:!0}),e.removeEventListener("keyup",this.boundKeyup,{capture:!0}),e.removeEventListener("click",this.boundClick,{capture:!0})}gotoStep(e){this.isExecuting=!1,this.stepping=!1,this.pendingClick=!1,this.clearTimer(),this.highlight.clearAll();try{(document.activeElement instanceof HTMLInputElement||document.activeElement instanceof HTMLTextAreaElement)&&document.activeElement.blur()}catch{}if(e>=this.flow.length){this.complete();return}this.stepIdx=e;let n=this.flow[e];this.state=n.trigger==="key"?"waiting_key":"waiting_click",this.debugOutput?.setStepIndex(e);let o=n.action;if(o.id||o.label||o.from||o.v||o.name||o.n){let a=this.resolveEl(o);if(a&&(this.highlight.highlightTarget([a]),n.trigger==="key")){let s=this.resolveInput(a);(s instanceof HTMLInputElement||s instanceof HTMLTextAreaElement)&&this.lockInput(s,String(o.v??""));try{s?.focus?.()}catch{}}}if(n.trigger==="key"&&this.lockedInputs.size===0){let a=document.activeElement;if(a instanceof HTMLInputElement||a instanceof HTMLTextAreaElement)this.lockInput(a,String(o.v??""));else{let s=document.querySelector("input:not([type=hidden]):not([type=submit]):not([type=button]):not([type=radio]):not([type=checkbox]),textarea,[contenteditable=true]");s&&this.lockInput(s,String(o.v??""))}}let i=n.hint||(n.trigger==="key"?"Keyboard Interact":"Mouse Interact");this.toast.flash(i),n.customMsg&&setTimeout(()=>{this.stepIdx===e&&this.isActive()&&this.toast.flash(n.customMsg)},500),this.stepTimer=window.setTimeout(()=>{this.stepIdx===e&&this.isActive()&&this.toast.flash(i)},9e4)}clearTimer(){this.stepTimer!==null&&(clearTimeout(this.stepTimer),this.stepTimer=null)}onKeypress(e){(this.isActive()||this.stepping)&&!at(e)&&e.key!=="Escape"&&(e.preventDefault(),e.stopPropagation(),e.stopImmediatePropagation())}onBeforeInput(e){(this.isActive()||this.stepping)&&e.isTrusted&&(e.preventDefault(),e.stopPropagation(),e.stopImmediatePropagation())}onKeyup(e){(this.isActive()||this.stepping)&&!at(e)&&e.key!=="Escape"&&!ot.has(e.key)&&(e.preventDefault(),e.stopPropagation(),e.stopImmediatePropagation())}onKey(e){if(at(e)||e.key==="Escape")return;if(this.state==="waiting_click"){ot.has(e.key)||(e.preventDefault(),e.stopPropagation(),e.stopImmediatePropagation()),this.toast.flash("Mouse Interact");return}if(this.state!=="waiting_key")return;if(this.stepping){e.preventDefault(),e.stopPropagation(),e.stopImmediatePropagation();return}if(ot.has(e.key))return;e.preventDefault(),e.stopPropagation(),e.stopImmediatePropagation(),this.debugOutput?.log("KEY",`Gatilho de teclado: "${e.key}" (Passo ${this.stepIdx+1})`);let o=this.flow[this.stepIdx].action;if(o.t!=="val")return;let i=String(o.v??"");if(i.length===0){this.stepping=!0,this.clearTimer(),this.highlight.clearAll(),this.debugOutput?.markStepSuccess(this.stepIdx,"Texto vazio \u2014 avan\xE7o autom\xE1tico"),setTimeout(()=>this.gotoStep(this.stepIdx+1),40);return}this.insertChars(this.stepIdx,o,i)&&(this.stepping=!0,this.clearTimer(),this.highlight.clearAll(),this.coin.flashOk(800),this.debugOutput?.markStepSuccess(this.stepIdx,`"${i}" inserido com sucesso`),setTimeout(()=>this.gotoStep(this.stepIdx+1),60))}onClick(e){if(!e.isTrusted)return;let n=e.target;if(!n||n.closest("#__eqdm_menu__,#__eqkm_overlay__,#__eqcm_menu__,#__eqdiscrete_coin__,#__eqdiscrete_toasts__,#__eq_dbg_window__,#__eq_dbg_pill__"))return;if(this.state==="waiting_key"){this.toast.flash("Keyboard Interact");return}if(this.state!=="waiting_click")return;let o=Date.now();if(this.isExecuting){o-this.lastClickTs>80&&(this.pendingClick=!0,this.debugOutput?.log("CLICK",`Clique r\xE1pido enfileirado (Passo ${this.stepIdx+1})`));return}this.lastClickTs=o,this.debugOutput?.log("CLICK",`Gatilho de mouse em <${n.tagName.toLowerCase()}> (Passo ${this.stepIdx+1})`);let i=this.flow[this.stepIdx],a=i.action;if(String(a.t??"")==="adv"){this.clearTimer(),this.highlight.clearAll(),this.debugOutput?.markStepSuccess(this.stepIdx,"Avan\xE7o natural do usu\xE1rio"),setTimeout(()=>this.gotoStep(this.stepIdx+1),80);return}e.preventDefault(),e.stopImmediatePropagation(),this.isExecuting=!0,this.pendingClick=!1,this.execClickAction(a,i).then(r=>{this.clearTimer(),this.highlight.clearAll(),this.isExecuting=!1;let l=this.pendingClick;this.pendingClick=!1,r?this.coin.flashOk(700):(this.failedSteps.add(this.stepIdx),this.coin.flashError(600)),setTimeout(()=>this.gotoStep(this.stepIdx+1),l?20:r?60:30)}).catch(r=>{this.isExecuting=!1,this.pendingClick=!1,this.failedSteps.add(this.stepIdx),this.debugOutput?.markStepFailed(this.stepIdx,`Exce\xE7\xE3o: ${r instanceof Error?r.message:String(r)}`),setTimeout(()=>this.gotoStep(this.stepIdx+1),30)})}async execClickAction(e,n){let o=String(e.t??"");try{if(o==="chk"||o==="clk"){let i=this.resolveEl(e);if(!i)return this.toast.flash("Alvo n\xE3o achado"),this.debugOutput?.markStepFailed(this.stepIdx,`Alvo n\xE3o encontrado: ${JSON.stringify(e)}`),!1;let a=i instanceof HTMLInputElement&&["radio","checkbox"].includes(i.type);if(a||i.getAttribute("role")==="radio"||i.getAttribute("role")==="checkbox"||i.closest('.option-card, [role="radio"], [role="checkbox"], [role="option"], .vf-radio-group, .vf-label')!==null||o==="chk"){let r=a?i:i.querySelector('input[type="radio"], input[type="checkbox"]')||(i.getAttribute("for")?i.ownerDocument.getElementById(i.getAttribute("for")):null),l=r||i,d=l.closest("label"),u=l.id?document.querySelector(`label[for="${R(l.id)}"]`):null,f=d||u||l.closest("td")||l,c=e.c!==void 0?!!e.c:!0;if(oe(l,c),r&&r.checked!==c){try{let m=r._valueTracker;m&&m.setValue(!c)}catch{}try{Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"checked")?.set?.call(r,c)}catch{}r.dispatchEvent(new Event("input",{bubbles:!0,composed:!0})),r.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}if(r&&r.checked!==c&&f&&f!==r&&(V(f),await new Promise(m=>setTimeout(m,16))),r&&r.checked!==c)try{let m=l.getBoundingClientRect(),g=m.left+m.width/2,h=m.top+m.height/2;for(let b of["pointerdown","mousedown","pointerup","mouseup","click"])l.dispatchEvent(new PointerEvent(b,{bubbles:!0,cancelable:!0,composed:!0,clientX:g,clientY:h,pointerId:1,isPrimary:!0}));await new Promise(b=>setTimeout(b,16))}catch{}if(r&&r.checked!==c){try{r.checked=c}catch{}try{r.click()}catch{}await new Promise(m=>setTimeout(m,8)),r.dispatchEvent(new Event("change",{bubbles:!0}))}if(r){if(r.checked===c)this.debugOutput?.markStepSuccess(this.stepIdx,`[name="${r.name}"] marcado checked=${c}`);else return r.type==="radio"&&r.name&&document.querySelector(`input[name="${R(r.name)}"]:checked`)?(this.debugOutput?.markStepSuccess(this.stepIdx,`Grupo de r\xE1dio [name="${r.name}"] tem sele\xE7\xE3o`),!0):(this.debugOutput?.markStepFailed(this.stepIdx,`[name="${r.name}"] resistiu ap\xF3s 5 estrat\xE9gias`),!1);return!0}return f&&V(f),await new Promise(m=>setTimeout(m,80)),ee({t:e.t,id:String(e.id??e.label??""),c:e.c,v:e.v})?this.debugOutput?.markStepSuccess(this.stepIdx,"Op\xE7\xE3o customizada ativada e verificada no DOM"):(f&&(Me(f),await new Promise(m=>setTimeout(m,120))),this.debugOutput?.log("WARN","Card custom: DOM n\xE3o confirmou sele\xE7\xE3o \u2014 tentativa via script injection")),!0}return V(i),this.debugOutput?.markStepSuccess(this.stepIdx,`<${i.tagName.toLowerCase()}> ativado`),!0}if(o==="sel"){let i=this.resolveEl(e);if(!i)return this.toast.flash("Alvo n\xE3o achado"),this.debugOutput?.markStepFailed(this.stepIdx,`Select n\xE3o encontrado: ${JSON.stringify(e)}`),!1;let a=i instanceof HTMLSelectElement?i:i.querySelector("select");if(a){let s=String(Array.isArray(e.v)?e.v[0]:e.v??"");for(let l=0;l<a.options.length;l++)if(a.options[l].value===s||a.options[l].text.trim()===s)return a.selectedIndex=l,a.dispatchEvent(new Event("change",{bubbles:!0})),this.debugOutput?.markStepSuccess(this.stepIdx,`Select atualizado para "${s}"`),!0;let r=parseInt(s,10);if(!isNaN(r)&&r>=0&&r<a.options.length)return a.selectedIndex=r,a.dispatchEvent(new Event("change",{bubbles:!0})),this.debugOutput?.markStepSuccess(this.stepIdx,`Select atualizado por \xEDndice ${r}`),!0}return i&&V(i),!!i}if(o==="drag"){let i=String(e.from??e.id??""),a=String(e.to??e.label??""),s=G(i,"source")||L(i),r=G(a,"destination")||L(a);return s&&r?(await fe(s,r),this.debugOutput?.markStepSuccess(this.stepIdx,`Arrasto conclu\xEDdo de "${i}" para "${a}"`),!0):(this.toast.flash("Alvo n\xE3o achado"),this.debugOutput?.markStepFailed(this.stepIdx,`Alvo de arrasto n\xE3o achado: from="${i}", to="${a}"`),!1)}if(o==="adv")return this.debugOutput?.markStepSuccess(this.stepIdx,"Avan\xE7o de etapa"),!0}catch(i){return this.toast.flash("Erro exec"),this.debugOutput?.markStepFailed(this.stepIdx,`Erro de execu\xE7\xE3o: ${i instanceof Error?i.message:String(i)}`),!1}return!0}insertChars(e,n,o){let i=this.resolveEl(n);if(!i)return this.toast.flash("Campo n\xE3o achado"),this.debugOutput?.markStepFailed(e,`Campo de texto n\xE3o encontrado: ${JSON.stringify(n)}`),this.charsInserted.set(e,o.length),!0;let a=this.resolveInput(i);if(!a)return this.charsInserted.set(e,o.length),!0;let s=o;if(a instanceof HTMLInputElement&&(a.type==="number"||a.type==="range")){let l=o.replace(",",".").replace(/[^0-9.-]/g,"");l&&!isNaN(Number(l))&&(s=l)}this.applyValueSlice(a,s),this.charsInserted.set(e,o.length);try{a.blur?.()}catch{}return!0}applyValueSlice(e,n){if(e instanceof HTMLInputElement||e instanceof HTMLTextAreaElement){try{let a=e._valueTracker;a&&a.setValue("")}catch{}let o=e instanceof HTMLInputElement?HTMLInputElement.prototype:HTMLTextAreaElement.prototype,i=(e instanceof HTMLInputElement?$t:Pt)||Object.getOwnPropertyDescriptor(o,"value")?.set;i?(i.call(e,""),i.call(e,n)):(e.value="",e.value=n);try{e.dispatchEvent(new Event("input",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}try{e.dispatchEvent(new Event("change",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}try{e.setSelectionRange(n.length,n.length)}catch{}if(e.value!==n&&!(e instanceof HTMLInputElement&&e.type==="number"&&Number(e.value)===Number(n))){e.value=n;try{i?.call(e,n)}catch{}}}else if(e.isContentEditable){let o=e;o.textContent=n;try{o.dispatchEvent(new InputEvent("input",{bubbles:!0,cancelable:!0,composed:!0,data:n,inputType:"insertText"}))}catch{o.dispatchEvent(new Event("input",{bubbles:!0,cancelable:!0,composed:!0}))}try{o.dispatchEvent(new Event("change",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}try{let i=document.createRange();i.selectNodeContents(o),i.collapse(!1);let a=window.getSelection();a?.removeAllRanges(),a?.addRange(i)}catch{}}}resolveEl(e){let n=String(e.id??"").trim(),o=String(e.v??"").trim(),i=String(e.label??"").trim(),a=String(e.from??"").trim(),s=String(e.name??e.n??"").trim(),l=(n||i||o).trim().match(/^(?:item|opção|opcao|afirmação|afirmacao|alternativa|linha|afirmativa|questão|questao)?\s*#?([a-eA-E])$/i);if(l&&(e.t==="chk"||e.t==="clk")){let b=l[1].toUpperCase(),y=Array.from(document.querySelectorAll(`input[type="radio"][value="${b}" i], input[type="checkbox"][value="${b}" i]`)).find(_=>!_.closest("#__eqdm_menu__,#__eqkm_overlay__,#__eqcm_menu__,#__eqdiscrete_coin__,#__eqdiscrete_toasts__,#__eq_dbg_window__,#__eq_dbg_pill__"));if(y)return y}let u=(o||(i.match(/:\s*(verdadeiro|falso|v|f)\b/i)?.[1]??"")||(n.match(/_(v|f|verdadeiro|falso)$/i)?.[1]??"")).toLowerCase().trim(),f=/^(v|verdadeiro|true|t|1|sim|yes|correto)$/i.test(u)||u.includes("verdadeir"),c=/^(f|falso|false|0|nao|não|no|incorreto|errado)$/i.test(u)||u.includes("fals"),p=f||c,m=f?["v","verdadeiro","true","1","t","sim","correto"]:["f","falso","false","0","n\xE3o","nao","incorreto","errado"];if(s){let b=Array.from(document.querySelectorAll(`input[name="${R(s)}"]`));if(o){let y=b.find(_=>_.value?.toLowerCase()===o.toLowerCase());if(y)return y}if(p){let y=b.find(_=>this.isVfMatch(_,m));if(y)return y}if(b.length>0)return b[0]}let g=null;if(n&&(g=L(n,o,e.t==="val")),!g&&i&&(g=L(i,o,e.t==="val")),!g&&a&&(g=L(a,o,e.t==="val")),p){if(g){if(g instanceof HTMLInputElement&&g.type==="radio"&&g.name){if(this.isVfMatch(g,m))return g;let A=Array.from(document.querySelectorAll(`input[type="radio"][name="${R(g.name)}"]`)).find($=>this.isVfMatch($,m));if(A)return A}let y=g.closest('tr, [role="row"], [role="radiogroup"], .vf-row, [class*="row" i], fieldset, td, div')||g,E=Array.from(y.querySelectorAll('input[type="radio"], input[type="checkbox"], [role="radio"], label, td, [class*="choice" i], [class*="option" i]')).find(x=>this.isVfMatch(x,m));if(E)return(E instanceof HTMLInputElement?E:E.querySelector('input[type="radio"]'))||E}let b=(i||n).replace(/:\s*(verdadeiro|falso|v|f)\b/i,"").toLowerCase();if(b){let y=Array.from(document.querySelectorAll('tr, [role="row"], [role="radiogroup"], .vf-row, [class*="row" i], li')),_=w(b).toLowerCase(),E=y.find(x=>{let A=w(x.textContent||"").toLowerCase();return _.length>=3&&A.includes(_)||n&&x.id===n});if(E){let A=Array.from(E.querySelectorAll('input[type="radio"], [role="radio"], label, td')).find($=>this.isVfMatch($,m));if(A)return(A instanceof HTMLInputElement?A:A.querySelector('input[type="radio"]'))||A}}}let h=(n||i||o).trim().toLowerCase();if(h){let y=Array.from(document.querySelectorAll('input, label, button, [role="radio"], [role="checkbox"], .option-card, [class*="option" i], [class*="choice" i]')).find(_=>{let E=(_.textContent||"").trim().toLowerCase();return(_.value?String(_.value).trim().toLowerCase():"")===h||E===h||E.startsWith(h+")")||E.startsWith("("+h+")")||h.length>=3&&E.includes(h)});if(y)return y}return g}isVfMatch(e,n){if(!e)return!1;let o=e.value?String(e.value).trim().toLowerCase():"",i=(e.getAttribute("aria-label")||"").trim().toLowerCase(),a=(e.getAttribute("data-value")||"").trim().toLowerCase();if(o&&n.includes(o)||a&&n.includes(a)||i&&n.includes(i))return!0;let s=e.closest('label, td, [class*="option" i], [class*="choice" i]'),r=((e.className||"")+" "+(s?.className||"")).toLowerCase();if(n.includes("v")&&(r.includes("vf-true")||r.includes("true")||r.includes("verdadeiro"))||n.includes("f")&&(r.includes("vf-false")||r.includes("false")||r.includes("falso")))return!0;if(s){let l=w(s.textContent||"").trim().toLowerCase();for(let d of n)if(l===d||l.startsWith(d+" ")||l.endsWith(" "+d)||l.startsWith("("+d+")")||l.startsWith(d+")")||d.length>=4&&l.includes(d))return!0}if(e.id){let l=document.querySelector(`label[for="${R(e.id)}"]`);if(l){let d=w(l.textContent||"").trim().toLowerCase();for(let u of n)if(d===u||d.startsWith(u+" ")||d.endsWith(" "+u)||d.startsWith("("+u+")")||d.startsWith(u+")")||u.length>=4&&d.includes(u))return!0}}return!1}resolveInput(e){return e instanceof HTMLInputElement||e instanceof HTMLTextAreaElement||e.isContentEditable?e:e.querySelector("input:not([type=hidden]):not([type=submit]):not([type=button]):not([type=radio]):not([type=checkbox]),textarea,[contenteditable=true]")??e}async forceStep(e){if(e<0||e>=this.flow.length)return!1;let n=this.flow[e],o=n.action,i=String(o.t??""),a=!1;if(i==="val"){let s=String(o.v??""),r=this.resolveEl(o);if(!r)return!1;let l=this.resolveInput(r);if(!l)return!1;this.applyValueSlice(l,s),this.charsInserted.set(e,s.length),this.debugOutput?.markStepSuccess(e,`Texto "${s}" injetado`),a=!0}else a=await this.execClickAction(o,n);return a&&e===this.stepIdx&&(this.clearTimer(),this.highlight.clearAll(),this.gotoStep(e+1)),a}async forceAll(){this.toast.flash("Injetando respostas...");let e=0,n=0;for(let o=0;o<this.flow.length;o++){let a=this.flow[o].action;if(a.t==="adv")continue;let s=await this.forceStep(o);await new Promise(d=>setTimeout(d,80));let r={t:a.t,id:String(a.id??a.label??""),c:a.c,v:a.v,name:a.name,from:a.from,to:a.to},l=!1;if(a.t!=="drag"&&a.t!=="val"&&a.t!=="adv")try{l=ee(r)}catch{}else l=s;if(!l&&s&&(a.t==="chk"||a.t==="clk")){let d=this.resolveEl(a);if(d){Me(d),await new Promise(u=>setTimeout(u,150));try{l=ee(r)}catch{}}if(l)this.debugOutput?.log("FLOW",`Step ${o+1}: recuperado via script injection`);else{this.debugOutput?.markStepFailed(o,"DOM n\xE3o confirmou ap\xF3s script injection"),n++;continue}}l||s?e++:n++}this.debugOutput?.log("FLOW",`forceAll: ${e} sucesso(s), ${n} falha(s)`),this.complete()}complete(){this.unlockAllInputs(),this.state="done",this.isExecuting=!1,this.detach(),this.clearTimer(),this.highlight.clearAll(),this.failedSteps.size>0?(this.coin.flashError(2200),this.toast.flash("Conclu\xEDdo c/ erros"),this.debugOutput?.log("WARN",`Fluxo finalizado com ${this.failedSteps.size} passos que falharam!`)):(this.coin.flashOk(1800),this.toast.flash("Conclu\xEDdo"),this.debugOutput?.log("FLOW","Fluxo finalizado com 100% de sucesso!"))}destroy(){this.isActive()?this.abort():(this.detach(),this.clearTimer())}};var Re=class{el=null;lastMouseX=0;lastMouseY=0;boundOutside;boundMouseMove;commands=[];constructor(){this.boundMouseMove=e=>{this.lastMouseX=e.clientX,this.lastMouseY=e.clientY},this.boundOutside=e=>{e instanceof KeyboardEvent&&e.key!=="Escape"||e instanceof MouseEvent&&this.el?.contains(e.target)||this.close()},window.addEventListener("mousemove",this.boundMouseMove,{passive:!0}),this.injectStyle()}setCommands(e){this.commands=e}injectStyle(){if(document.getElementById("__eqcm_style__"))return;let e=document.createElement("style");e.id="__eqcm_style__",e.textContent=`
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
    `,document.documentElement.appendChild(e)}open(){this.close();let e=document.createElement("div");e.id="__eqcm_menu__",e.setAttribute("role","menu"),e.tabIndex=-1;let n=document.createElement("div");n.className="__eqcm_section__",n.textContent="Comandos dispon\xEDveis",e.appendChild(n);let o=document.createElement("div");o.className="__eqcm_sep__",e.appendChild(o);for(let u of this.commands){let f=document.createElement("div");f.className="__eqcm_item__",f.setAttribute("role","menuitem"),f.tabIndex=0;let c=document.createElement("span");c.className="__eqcm_kbd__",c.textContent=u.keys;let p=document.createElement("span");p.className="__eqcm_lbl__",p.textContent=u.label,f.appendChild(c),f.appendChild(p);let m=()=>{this.close(),setTimeout(()=>u.action(),60)};f.addEventListener("click",m),f.addEventListener("keydown",g=>{(g.key==="Enter"||g.key===" ")&&(g.preventDefault(),m())}),e.appendChild(f)}document.documentElement.appendChild(e),this.el=e;let i=240,a=this.commands.length*28+50,s=this.lastMouseX,r=this.lastMouseY,l=window.innerWidth,d=window.innerHeight;s+i+8>l&&(s=l-i-8),r+a+8>d&&(r=d-a-8),s<4&&(s=4),r<4&&(r=4),e.style.left=`${s}px`,e.style.top=`${r}px`,e.focus(),setTimeout(()=>{window.addEventListener("click",this.boundOutside,{capture:!0}),window.addEventListener("keydown",this.boundOutside,{capture:!0})},50)}close(){window.removeEventListener("click",this.boundOutside,{capture:!0}),window.removeEventListener("keydown",this.boundOutside,{capture:!0}),this.el?.remove(),this.el=null}isOpen(){return this.el!==null}destroy(){this.close(),window.removeEventListener("mousemove",this.boundMouseMove),document.getElementById("__eqcm_style__")?.remove()}};var De=class{el=null;pillEl=null;activeTab="console";activeFilter="all";autoScroll=!0;capturedImages=[];logs=[];logSeq=0;currentPlan=null;currentFlow=[];currentStepIdx=0;stepStatuses=new Map;stepErrors=new Map;modelName="--";latencyMs=0;questionSummary="";promptTokens=0;responseTokens=0;isDragging=!1;dragStartX=0;dragStartY=0;initialLeft=0;initialTop=0;isMinimized=!1;isVisible=!1;boundMouseMove;boundMouseUp;options;constructor(e={}){this.options=e,this.boundMouseMove=this.onMouseMove.bind(this),this.boundMouseUp=this.onMouseUp.bind(this),this.injectStyle(),this.createDom(),window.addEventListener("mousemove",this.boundMouseMove),window.addEventListener("mouseup",this.boundMouseUp),this.log("SYS","Debug Output Discreto pronto (Shift+H para alternar)")}open(){this.isVisible=!0,this.isMinimized&&(this.isMinimized=!1),this.el&&(this.el.style.display="flex",this.clampPosition()),this.pillEl&&(this.pillEl.style.display="none"),this.render()}openTab(e){this.activeTab=e,this.open(),this.el&&this.el.querySelectorAll(".__eq_dbg_tab__").forEach(n=>{let o=n.getAttribute("data-tab")===e;n.classList.toggle("active",o)}),this.render()}close(){this.isVisible=!1,this.isMinimized=!1,this.el&&(this.el.style.display="none"),this.pillEl&&(this.pillEl.style.display="none")}toggle(){!this.isVisible||this.isMinimized?this.open():this.close()}minimize(){this.isVisible&&(this.isMinimized=!0,this.el&&(this.el.style.display="none"),this.pillEl&&(this.pillEl.style.display="flex",this.updatePill()))}restore(){this.isMinimized=!1,this.pillEl&&(this.pillEl.style.display="none"),this.el&&(this.el.style.display="flex",this.clampPosition()),this.render()}isOpen(){return this.isVisible&&!this.isMinimized}log(e,n,o){let i=new Date,a=`${i.getHours().toString().padStart(2,"0")}:${i.getMinutes().toString().padStart(2,"0")}:${i.getSeconds().toString().padStart(2,"0")}.${i.getMilliseconds().toString().padStart(3,"0").slice(0,2)}`,s={id:++this.logSeq,time:a,category:e,msg:n,detail:o};this.logs.push(s),this.logs.length>300&&this.logs.shift(),this.updatePill(),this.isOpen()&&(this.activeTab==="console"&&this.renderConsoleLogs(),this.updateTabCounters())}setImages(e){this.capturedImages=e||[],this.updateTabCounters(),this.isOpen()&&this.activeTab==="media"&&this.renderMedia()}setPlan(e,n="",o=0,i="--",a){this.currentPlan=e,this.questionSummary=(n||"").slice(0,300),this.latencyMs=o,this.modelName=i,a&&(this.capturedImages=a),this.stepStatuses.clear(),this.stepErrors.clear();let s=Array.isArray(e?.actions)?e.actions.length:0;this.log("AI",`Plano recebido: ${s} a\xE7\xF5es planejadas`,JSON.stringify(e?.actions||[],null,2)),(e?.thinking||e?.rationale)&&this.log("AI",`Racioc\xEDnio: ${(e.thinking||e.rationale).slice(0,150)}...`),this.isOpen()&&this.render()}setFlow(e){this.currentFlow=e||[],this.currentStepIdx=0,this.stepStatuses.clear(),this.stepErrors.clear(),e.forEach((n,o)=>{this.stepStatuses.set(o,o===0?"active":"pending")}),this.log("FLOW",`Fluxo carregado com ${e.length} passos de intera\xE7\xE3o`),this.updatePill(),this.isOpen()&&this.render()}setStepIndex(e){this.currentStepIdx=e,this.currentFlow.forEach((o,i)=>{i<e?this.stepStatuses.get(i)!=="failed"&&this.stepStatuses.set(i,"done"):i===e?this.stepStatuses.set(i,"active"):this.stepStatuses.get(i)!=="failed"&&this.stepStatuses.set(i,"pending")});let n=this.currentFlow[e];if(n){let o=n.action,i=o.id||o.name||o.label||o.from||"alvo";this.log("FLOW",`Passo ${e+1}/${this.currentFlow.length} (${n.trigger}): ${o.t??"a\xE7\xE3o"} em "${i}"`)}this.updatePill(),this.isOpen()&&(this.activeTab==="flow"&&this.renderFlow(),this.updateTabCounters())}markStepSuccess(e,n){this.stepStatuses.set(e,"done"),this.log("ACTION",`\u2713 Passo ${e+1} executado com sucesso`,n),this.updatePill(),this.isOpen()&&this.activeTab==="flow"&&this.renderFlow()}markStepFailed(e,n){this.stepStatuses.set(e,"failed"),this.stepErrors.set(e,n),this.log("ERROR",`\u2715 Falha no Passo ${e+1}: ${n}`),this.updatePill(),this.isOpen()&&this.activeTab==="flow"&&this.renderFlow()}onHeaderMouseDown(e){if(!e.target.closest(".__eq_dbg_btn__, .__eq_dbg_tab__")&&(e.preventDefault(),this.isDragging=!0,this.dragStartX=e.clientX,this.dragStartY=e.clientY,this.el)){let n=this.el.getBoundingClientRect();this.initialLeft=n.left,this.initialTop=n.top}}onMouseMove(e){if(!this.isDragging||!this.el)return;let n=e.clientX-this.dragStartX,o=e.clientY-this.dragStartY,i=Math.max(10,window.innerWidth-this.el.offsetWidth-10),a=Math.max(10,window.innerHeight-this.el.offsetHeight-10),s=Math.min(Math.max(10,this.initialLeft+n),i),r=Math.min(Math.max(10,this.initialTop+o),a);this.el.style.left=`${s}px`,this.el.style.top=`${r}px`,this.el.style.right="auto",this.el.style.bottom="auto"}onMouseUp(){this.isDragging=!1}clampPosition(){if(!this.el)return;let e=this.el.getBoundingClientRect(),n=Math.max(10,window.innerWidth-e.width-10),o=Math.max(10,window.innerHeight-e.height-10),i=e.left,a=e.top;(i>n||a>o||i<10||a<10)&&(this.el.style.left=`${Math.min(Math.max(10,i),n)}px`,this.el.style.top=`${Math.min(Math.max(10,a),o)}px`,this.el.style.right="auto",this.el.style.bottom="auto")}render(){if(!this.el)return;this.updateTabCounters();let e=this.el.querySelector(".__eq_dbg_body__");e&&(this.activeTab==="console"?(e.innerHTML=`
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
      `,this.renderConsoleLogs(),this.wireConsoleEvents()):this.activeTab==="flow"?this.renderFlow():this.activeTab==="plan"?this.renderPlan():this.activeTab==="media"?this.renderMedia():this.activeTab==="audit"&&this.renderAudit())}renderConsoleLogs(){let e=this.el?.querySelector("#__eq_dbg_terminal__");if(!e)return;e.innerHTML="";let n=this.logs.filter(o=>this.activeFilter==="all"?!0:this.activeFilter==="error"?o.category==="ERROR"||o.category==="WARN":this.activeFilter==="flow"?o.category==="FLOW"||o.category==="KEY"||o.category==="CLICK":this.activeFilter==="dom"?o.category==="DOM"||o.category==="ACTION":this.activeFilter==="ai"?o.category==="AI":!0);if(n.length===0){e.innerHTML='<div class="__eq_dbg_empty__">Nenhum log correspondente ao filtro.</div>';return}n.forEach(o=>{let i=document.createElement("div");i.className=`__eq_dbg_line__ __eq_cat_${o.category.toLowerCase()}__`;let a=document.createElement("span");a.className=`__eq_dbg_badge__ __eq_bg_${o.category.toLowerCase()}__`,a.textContent=o.category;let s=document.createElement("span");s.className="__eq_dbg_time__",s.textContent=o.time;let r=document.createElement("span");if(r.className="__eq_dbg_msg__",r.textContent=o.msg,i.appendChild(s),i.appendChild(a),i.appendChild(r),o.detail){let l=document.createElement("span");l.className="__eq_dbg_detail_btn__",l.textContent=" [detalhes]",l.onclick=()=>{let d=i.querySelector("pre");if(d)d.remove();else{let u=document.createElement("pre");u.className="__eq_dbg_detail_pre__",u.textContent=o.detail,i.appendChild(u)}},i.appendChild(l)}e.appendChild(i)}),this.autoScroll&&(e.scrollTop=e.scrollHeight)}wireConsoleEvents(){if(!this.el)return;this.el.querySelectorAll(".__eq_dbg_chip__").forEach(i=>{i.addEventListener("click",a=>{let s=a.currentTarget.getAttribute("data-filter");this.activeFilter=s||"all",this.el?.querySelectorAll(".__eq_dbg_chip__").forEach(r=>r.classList.remove("active")),a.currentTarget.classList.add("active"),this.renderConsoleLogs()})});let e=this.el.querySelector("#__eq_dbg_btn_scroll__");e?.addEventListener("click",()=>{this.autoScroll=!this.autoScroll,e.classList.toggle("active",this.autoScroll)});let n=this.el.querySelector("#__eq_dbg_btn_copy__");n?.addEventListener("click",()=>{let i=this.logs.map(a=>`[${a.time}] [${a.category}] ${a.msg}${a.detail?`
${a.detail}`:""}`).join(`
`);navigator.clipboard.writeText(i).then(()=>{n.textContent="\u2713",setTimeout(()=>n.textContent="\u{1F4CB}",1e3)})}),this.el.querySelector("#__eq_dbg_btn_clear__")?.addEventListener("click",()=>{this.logs=[],this.renderConsoleLogs(),this.updateTabCounters()})}renderFlow(){let e=this.el?.querySelector(".__eq_dbg_body__");if(!e)return;if(!this.currentFlow||this.currentFlow.length===0){e.innerHTML=`
        <div class="__eq_dbg_empty__" style="padding:40px 20px;text-align:center;">
          <div style="font-size:24px;margin-bottom:8px;">\u23F8\uFE0F</div>
          <div>Nenhum fluxo de intera\xE7\xE3o ativo no momento.</div>
          <div style="font-size:11px;color:#9aa0a6;margin-top:6px;">Pressione Shift+Q para analisar a p\xE1gina ou aguarde o avan\xE7o autom\xE1tico.</div>
        </div>
      `;return}let n=this.currentFlow.map((i,a)=>{let s=i.action,r=this.stepStatuses.get(a)||(a===this.currentStepIdx?"active":a<this.currentStepIdx?"done":"pending"),l=r==="done"?'<span class="__eq_status_done__">\u2713 Conclu\xEDdo</span>':r==="active"?'<span class="__eq_status_active__">\u25B6 Em Andamento</span>':r==="failed"?'<span class="__eq_status_failed__">\u2715 Falhou</span>':'<span class="__eq_status_pending__">Pendente</span>',d=i.trigger==="key"?"\u2328\uFE0F Tecla":"\u{1F5B1}\uFE0F Clique",u=String(s.t||"act").toUpperCase(),f=s.id?`#${s.id}`:s.name?`[name="${s.name}"]`:s.label||s.from||"alvo",c=s.v!==void 0?` = "${s.v}"`:s.c!==void 0?` (check: ${s.c})`:"";return`
        <div class="__eq_flow_card__ ${r==="active"?"__eq_flow_active__":""}">
          <div class="__eq_flow_header__">
            <span class="__eq_flow_num__">Passo ${a+1}</span>
            <span class="__eq_flow_trigger__">${d}</span>
            <span class="__eq_flow_type__">${u}</span>
            <span class="__eq_flow_status__">${l}</span>
          </div>
          <div class="__eq_flow_content__">
            <div class="__eq_flow_target__">${W(String(f))}<span style="color:#8ab4f8;">${W(String(c))}</span></div>
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
    `,e.querySelectorAll(".__eq_btn_exec_step__").forEach(i=>{i.addEventListener("click",async a=>{let s=parseInt(a.currentTarget.getAttribute("data-step")||"0",10);if(this.options.onForceStep){i.textContent="Executando...";let r=await this.options.onForceStep(s);i.textContent=r?"\u2713 Sucesso":"\u2715 Falhou",setTimeout(()=>i.textContent="For\xE7ar Passo",1500)}})});let o=e.querySelector("#__eq_btn_force_all__");o?.addEventListener("click",async()=>{this.options.onForceAllSteps&&(o.textContent="Injetando...",await this.options.onForceAllSteps(),o.textContent="\u2713 Conclu\xEDdo",setTimeout(()=>o.textContent="\u26A1 Injetar Todas as Respostas",1500))})}renderPlan(){let e=this.el?.querySelector(".__eq_dbg_body__");if(!e)return;if(!this.currentPlan){e.innerHTML='<div class="__eq_dbg_empty__">Nenhum plano de IA capturado ainda. Pressione Shift+Q.</div>';return}let n=Math.round((this.currentPlan.confidence||1)*100),o=this.currentPlan.thinking||this.currentPlan.rationale||"Nenhum racioc\xEDnio textual retornado.",i=JSON.stringify(this.currentPlan,null,2);e.innerHTML=`
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
      `;return}let n=this.currentPlan?.imageDescriptions||[],o="";this.capturedImages.forEach((i,a)=>{let s=n.find(m=>m.index===a),r=s?.relevant??!0,l=s?.description??(i.textContext||"Aguardando an\xE1lise da IA..."),d=i.captureStatus==="captured"?"\u2705":i.captureStatus==="text_only"?"\u{1F4DD}":"\u26A0\uFE0F",u=i.captureStatus==="captured"?"Visual":i.captureStatus==="text_only"?"Texto":"Falhou",f=i.base64?`data:${i.mediaType||"image/jpeg"};base64,${i.base64}`:"",c="";f?c=`
          <div style="position:relative;background:#111;border-bottom:1px solid #3c4043;height:120px;display:flex;align-items:center;justify-content:center;overflow:hidden;">
            <img src="${f}"
              style="max-width:100%;max-height:100%;object-fit:contain;cursor:pointer;"
              alt="M\xEDdia ${a+1}"
              title="Clique para ampliar"
              onclick="(function(el){ var ov=document.createElement('div'); ov.style='position:fixed;inset:0;z-index:2147483647;background:rgba(0,0,0,0.92);display:flex;align-items:center;justify-content:center;cursor:zoom-out;'; var img=document.createElement('img'); img.src=el.src; img.style='max-width:95vw;max-height:95vh;border-radius:6px;box-shadow:0 8px 32px rgba(0,0,0,0.8);'; ov.appendChild(img); ov.onclick=function(){ov.remove();}; document.body.appendChild(ov); })(this)"
            >
            <div style="position:absolute;top:6px;right:6px;background:rgba(0,0,0,0.75);border-radius:4px;padding:2px 6px;font-size:10px;font-weight:700;color:#fff;">
              ${d} ${u}
            </div>
          </div>
        `:c=`
          <div style="background:#1e1f22;padding:20px;text-align:center;color:#9aa0a6;font-size:11px;border-bottom:1px solid #3c4043;">
            ${d} ${u} \u2014 sem dados visuais
          </div>
        `;let p=r?'<span style="font-size:9.5px;font-weight:700;padding:1px 6px;border-radius:3px;background:rgba(129,201,149,0.2);border:1px solid rgba(129,201,149,0.4);color:#81c995;">RELEVANTE</span>':'<span style="font-size:9.5px;font-weight:700;padding:1px 6px;border-radius:3px;background:rgba(242,139,130,0.2);border:1px solid rgba(242,139,130,0.4);color:#f28b82;">IGNORADA</span>';o+=`
        <div style="background:#292a2d;border:1px solid #3c4043;border-radius:6px;overflow:hidden;border-left:3px solid ${r?"#81c995":"#5f6368"};">
          ${c}
          <div style="padding:10px 12px;display:flex;flex-direction:column;gap:6px;">
            <div style="display:flex;justify-content:space-between;align-items:center;">
              <span style="font-size:11.5px;font-weight:700;color:#e8eaed;">Imagem ${a+1} (${W(i.source||"inline")})</span>
              ${p}
            </div>
            ${i.associatedLabel?`<div style="font-size:10.5px;color:#8ab4f8;font-weight:500;">${W(i.associatedLabel)}</div>`:""}
            <div style="font-size:11px;color:#bdc1c6;line-height:1.45;background:#1e1f22;padding:6px 8px;border-radius:4px;">
              <strong style="color:#9aa0a6;display:block;font-size:10px;text-transform:uppercase;margin-bottom:2px;">Interpreta\xE7\xE3o da IA:</strong>
              ${W(l)}
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
    `)}updateTabCounters(){if(!this.el)return;let e=this.el.querySelector("#__eq_cnt_all"),n=this.el.querySelector("#__eq_cnt_err"),o=this.el.querySelector("#__eq_cnt_flow"),i=this.el.querySelector("#__eq_cnt_dom"),a=this.el.querySelector("#__eq_cnt_ai");e&&(e.textContent=String(this.logs.length)),n&&(n.textContent=String(this.logs.filter(l=>l.category==="ERROR"||l.category==="WARN"||l.category==="REPLAN").length)),o&&(o.textContent=String(this.logs.filter(l=>l.category==="FLOW"||l.category==="KEY"||l.category==="CLICK").length)),i&&(i.textContent=String(this.logs.filter(l=>l.category==="DOM"||l.category==="ACTION").length)),a&&(a.textContent=String(this.logs.filter(l=>l.category==="AI").length));let s=this.el.querySelector("#__eq_tab_badge_flow__");s&&(s.textContent=this.currentFlow.length>0?`${this.currentStepIdx+1}/${this.currentFlow.length}`:"0");let r=this.el.querySelector("#__eq_tab_badge_media__");r&&(r.textContent=String(this.capturedImages.length))}updatePill(){if(!this.pillEl)return;let e=this.logs.filter(a=>a.category==="ERROR").length,n=this.currentFlow.length,o=n>0?`${this.currentStepIdx+1}/${n}`:"Idle",i=this.pillEl.querySelector(".__eq_pill_text__");i&&(i.textContent=`EQ Debug: ${o} ${e>0?`(${e} err)`:"\u2022 OK"}`)}createDom(){this.el=document.createElement("div"),this.el.id="__eq_dbg_window__",this.el.style.display="none",this.el.innerHTML=`
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
    `,document.documentElement.appendChild(e)}destroy(){window.removeEventListener("mousemove",this.boundMouseMove),window.removeEventListener("mouseup",this.boundMouseUp),this.el?.remove(),this.pillEl?.remove(),document.getElementById("__eq_dbg_style__")?.remove()}};function W(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}var Dt=`

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
`;function Rt(t){let e=[],n=1;for(let o of t){let i=o.t;i==="val"?e.push({step:n++,trigger:"key",action:o,hint:"Keyboard Interact",customMsg:null}):i==="chk"||i==="clk"?e.push({step:n++,trigger:"click",action:o,hint:"Mouse Interact",customMsg:null}):i==="sel"?(e.push({step:n++,trigger:"click",action:o,hint:"Mouse Interact",customMsg:"Opening..."}),e.push({step:n++,trigger:"click",action:o,hint:"Option Selected",customMsg:null})):i==="drag"?e.push({step:n++,trigger:"click",action:o,hint:"Mover Item",customMsg:null}):i==="adv"&&e.push({step:n++,trigger:"click",action:o,hint:"Next Page Loading",customMsg:null})}return e}function Nt(t,e){if(!Array.isArray(t)||t.length===0)return Rt(e);let n=[];for(let o of t){if(!o||typeof o!="object")continue;let i=o,a=i.trigger==="key"?"key":"click",s=i.action||{},r=a==="key"?1:void 0;n.push({step:typeof i.step=="number"?i.step:n.length+1,trigger:a,action:s,chars:r,hint:typeof i.hint=="string"?i.hint.slice(0,30):a==="key"?"Keyboard Interact":"Mouse Interact",customMsg:typeof i.customMsg=="string"?i.customMsg.slice(0,22):null})}return n.length===0?Rt(e):bn(n,e)}function bn(t,e){let n=[];for(let o=0;o<t.length;o++){let i=t[o],a=i.action;if(!a.t&&e[o]&&(i.action=e[o]),a.t==="chk"&&!a.name&&a.id){let r=String(a.id);if(r.startsWith("eq-")||r.match(/^[a-z0-9]+-[a-z0-9]+-[a-z0-9]+$/))try{let l=document.querySelector(`[data-easyquiz-id="${r}"], #${r}`);l?.name&&(i.action.name=l.name,l.value&&l.value!=="on"&&(i.action.v=l.value))}catch{}}if(a.t==="val"){let r=e.find(l=>l.t==="val"&&(a.id&&l.id===a.id||a.name&&l.name===a.name));r&&r.v!==void 0&&String(r.v).length>String(a.v??"").length&&(i.action.v=r.v)}let s=n[n.length-1];if(s){let r=s.action;if(r.t==="val"&&a.t==="val"&&(!!a.id&&!!r.id&&a.id===r.id||!!a.name&&!!r.name&&a.name===r.name||!a.id&&!a.name&&!r.id&&!r.name)){let f=e.find(c=>c.t==="val"&&(a.id&&c.id===a.id||a.name&&c.name===a.name))?.v??(String(r.v||"").length>=String(a.v||"").length?r.v:a.v);r.v=f;continue}if(s.trigger===i.trigger&&r.t===a.t&&r.name===a.name&&r.v===a.v&&r.id===a.id||r.t==="adv"&&a.t==="adv")continue}i.step=n.length+1,n.push(i)}return n.length>0?n:t}if(window.__eqdiscrete)try{window.__eqdiscrete.destroy()}catch{}vn();function yn(){try{if(document.querySelector("link[data-eqdiscrete-preconnect]"))return;let t=document.createElement("link");t.rel="preconnect",t.href="https://generativelanguage.googleapis.com",t.crossOrigin="anonymous",t.setAttribute("data-eqdiscrete-preconnect","true"),document.head?.appendChild(t)}catch{}}var _n=xe+Dt;async function vn(){yn(),mt();let t=new Le,e=new qe,n=new He,o=new Pe(t,e,n),i=new De({onForceStep:x=>o.forceStep(x),onForceAllSteps:()=>o.forceAll()});o.setDebugOutput(i);let a=new Ie({onModelChange:()=>e.flash("Modelo OK")}),s=new Oe(t,e),r=new Re,l=null,d=!1,u=null,f=0;window.addEventListener("click",x=>{if(d&&x.isTrusted){let A=x.target;A&&!A.closest("#__eqdm_menu__,#__eqkm_overlay__,#__eqcm_menu__,#__eqdiscrete_coin__,#__eqdiscrete_toasts__,#__eq_dbg_window__,#__eq_dbg_pill__")&&(f=Date.now(),i.log("CLICK","Clique antecipado registrado durante an\xE1lise"))}},{capture:!0});let c=new $e({onPageAdvance:()=>o.isActive()||d?!1:(h(!0),!0)});c.start();let p=te();p.apiKey&&Ve(p.apiKey).catch(()=>{}),e.flash("EQ Ativo");let m=0,g=[1500,3e3,5e3,8e3];async function h(x=!1,A=0){if(u&&(clearTimeout(u),u=null),d&&x){i.log("SYS","An\xE1lise j\xE1 em andamento \u2014 preservando requisi\xE7\xE3o ativa");return}if(x&&o.isActive())return;if(l){try{l.abort()}catch{}l=null}o.isActive()&&o.abort();let $=te();if(!$.apiKey){e.flash("Config: Shift+A"),t.flashError(2e3);return}d=!0,m=A,l=new AbortController;let z=l.signal;c.resetHash(),t.setState("loading"),(!x||A>0)&&e.flash(A>0?`Tentativa ${A+1}`:"Analisando"),i.log("SYS",`Iniciando an\xE1lise (proativo: ${x}, retry: ${A})`);function v(){let k=g[Math.min(A,g.length-1)];i.log("WARN",`Agendando retry em ${k}ms`),u=window.setTimeout(()=>{o.isActive()||h(!1,A+1)},k)}try{if(x&&await new Promise(D=>setTimeout(D,60)),z.aborted)return;let k=Ae(!1);if(k||(k=_e()),!k||!k.questionText?.trim()){t.setState("idle"),A===0&&!x&&e.flash("Sem conte\xFAdo"),i.log("WARN","Nenhum conte\xFAdo ou quest\xE3o detectada na p\xE1gina"),v();return}i.log("DOM",`Contexto detectado: ${k.controls.length} controles, ${k.questionText.length} chars`,k.questionText);let T=await Ct(k.scope,$.useVision);if(z.aborted)return;i.setImages(T);let S=performance.now(),M=await vt(k,T,$,(D,F)=>i.log(F==="error"?"ERROR":F==="warning"?"WARN":"SYS",`[IA] ${D}`),z,{systemPromptOverride:_n}),q=Math.round(performance.now()-S);if(z.aborted)return;t.setState("idle");let H=M.plan;if(i.log("SYS",`An\xE1lise conclu\xEDda em ${q}ms via ${M.usedModel??$.model} \u2014 pageType: ${H.pageType} | mode: ${H.mode} | ${H.actions?.length??0} a\xE7\xE3o(\xF5es)`),i.setPlan(H,k.questionText,q,$.model,T),H.memoryToStore&&dt(H.memoryToStore),H.imageDescriptions&&H.imageDescriptions.length>0){i.log("AI",`\u{1F5BC}\uFE0F ${H.imageDescriptions.length} imagem(ns) analisadas:`);for(let D of H.imageDescriptions){let F=D.relevant?"\u2705":"\u26A0\uFE0F";i.log(D.relevant?"AI":"WARN",`  ${F} Imagem ${D.index+1} [${D.relevant?"RELEVANTE":"IGNORADA"}]: ${D.description}`)}}if(H.pageType==="conclusion"){e.flash("Sess\xE3o encerrada"),i.log("SYS","P\xE1gina de conclus\xE3o detectada");return}let I=Nt(H.interactionFlow,H.actions||[]);if(i.log("SYS",`Fluxo gerado: ${I.length} step(s) \u2014 ${I.map(D=>`${D.trigger}[${D.action?.t}]`).join(", ")}`),H.pageType==="info"||H.pageType==="start"){if(t.flashOk(1e3),e.flash("Avan\xE7ar \u2192"),i.log("SYS",`P\xE1gina informativa (${H.pageType}) \u2014 aguardando clique do usu\xE1rio para avan\xE7ar`),I.length>0)o.start(I);else{let D=[{step:1,trigger:"click",action:{t:"adv",label:"continuar"},hint:"Clique para avan\xE7ar",customMsg:null}];i.log("SYS","Fluxo adv gerado automaticamente para p\xE1gina informativa"),o.start(D)}return}if(!I.length){i.log("WARN","Plano da IA retornou sem a\xE7\xF5es ou fluxo de intera\xE7\xE3o"),v();return}m=0,t.flashOk(500);let K=I[0];e.flash(K.hint||"Pronto"),K.customMsg&&setTimeout(()=>e.flash(K.customMsg),1400);let B=I.filter(D=>D.action?.t==="drag");if(B.length>0){i.log("FLOW",`\u{1F504} ${B.length} step(s) de drag/categoriza\xE7\xE3o no fluxo. Estrat\xE9gias A-G ser\xE3o tentadas.`);for(let D of B){let F=D.action;i.log("FLOW",`  Drag: "${F.from}" \u2192 "${F.to}"`,JSON.stringify(F))}}o.start(I),I.length>0&&I[0].trigger==="click"&&Date.now()-f<4e3&&(f=0,i.log("FLOW","Aplicando clique antecipado no primeiro step"),setTimeout(()=>void o.forceStep(0),40))}catch(k){if(z.aborted)return;t.setState("idle");let T=k instanceof Error?k.message:String(k);if(i.log("ERROR",`Erro na an\xE1lise: ${T}`),T.includes("403")||T.includes("API key")||T.includes("inv\xE1lida")){e.flash("Acesso negado"),t.flashError();return}if(T.includes("429")||T.includes("Quota")||T.includes("RESOURCE_EXHAUSTED")||T.includes("Todas as tentativas")){T.includes("Todas as tentativas")||A>=4?(e.flash("Limite \u2014 aguarde"),t.flashError(),v()):(e.flash("Chave rotacionando"),t.flashError(300),h(!1,A+1));return}t.flashError(800),v()}finally{l?.signal===z&&(l=null),d=!1}}function b(){if(d){e.flash("Analisando...");return}if(o.isActive()){let x=o.getCurrentStep()+1,A=o.getTotalSteps(),$=o.getState()==="waiting_key"?"Tecla":"Mouse";e.flash(`${x}/${A} ${$}`)}else{let A=te().model.replace("gemini-","").replace("-flash","F").replace("-lite","L").replace("-preview","P");e.flash(`OK \u2014 ${A}`)}}function y(){a.isOpen()&&a.close(),s.isOpen()&&s.close(),r.isOpen()&&r.close(),i.isOpen()&&i.close()}let _=[{keys:"Shift+Q",label:"Analisar p\xE1gina",action:()=>void h()},{keys:"Shift+V",label:"M\xEDdias IA (Vision)",action:()=>{i.openTab("media"),e.flash("M\xEDdias IA")}},{keys:"Shift+M",label:"Trocar modelo",action:()=>a.isOpen()?a.close():a.open()},{keys:"Shift+A",label:"Config API keys",action:()=>s.isOpen()?s.close():s.open()},{keys:"Shift+Z",label:"Abortar fluxo",action:()=>o.isActive()?o.abort():e.flash("Nada ativo")},{keys:"Shift+R",label:"Re-analisar",action:()=>void h()},{keys:"Shift+H",label:"Debug Output",action:()=>i.toggle()},{keys:"Shift+I",label:"\xDAltimo aviso",action:()=>e.reshow()},{keys:"Shift+C",label:"Comandos",action:()=>r.isOpen()?r.close():r.open()},{keys:"Escape",label:"Fechar menus",action:y}];r.setCommands(_);function E(x){let A=x.key;if(x.altKey&&(A==="q"||A==="Q")||x.shiftKey&&A==="Q"){x.preventDefault(),x.stopPropagation(),h();return}if(x.shiftKey&&A==="M"){x.preventDefault(),x.stopPropagation(),a.isOpen()?a.close():a.open();return}if(x.shiftKey&&A==="A"){x.preventDefault(),x.stopPropagation(),s.isOpen()?s.close():s.open();return}if(x.shiftKey&&A==="Z"){if(x.preventDefault(),x.stopPropagation(),l){try{l.abort()}catch{}l=null}u&&(clearTimeout(u),u=null),o.isActive()?o.abort():e.flash("Abortado"),d=!1,t.setState("idle");return}if(x.shiftKey&&A==="R"){x.preventDefault(),x.stopPropagation(),h();return}if(x.shiftKey&&A==="H"){x.preventDefault(),x.stopPropagation(),i.toggle();return}if(x.shiftKey&&(A==="V"||A==="v")){x.preventDefault(),x.stopPropagation(),i.openTab("media"),e.flash("M\xEDdias IA");return}if(x.shiftKey&&A==="I"){x.preventDefault(),x.stopPropagation(),e.reshow();return}if(x.shiftKey&&A==="C"){x.preventDefault(),x.stopPropagation(),r.isOpen()?r.close():r.open();return}A==="Escape"&&(a.isOpen()||s.isOpen()||r.isOpen()||i.isOpen())&&(x.stopPropagation(),x.preventDefault(),y())}window.addEventListener("keydown",E,{capture:!0}),window.__eqdiscrete={analyze:()=>h(),destroy:()=>{window.removeEventListener("keydown",E,{capture:!0}),u&&clearTimeout(u),o.destroy(),i.destroy(),a.destroy(),s.destroy(),r.destroy(),c.stop(),t.destroy(),e.destroy(),n.clearAll(),delete window.__eqdiscrete}},h(!0)}})();
