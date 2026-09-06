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
"use strict";(()=>{var V={apiKey:"",model:"gemini-3.8-flash",uiMode:"easy",modeHint:"",engine:"smart",dryRun:!1,autoApply:!0,autoAdvance:!1,hostDarkMode:!0,useVision:!1,confidenceThreshold:.8};var xe="easyquiz_settings_v2";function we(){try{let o=localStorage.getItem(xe);if(!o){let i=localStorage.getItem("easyquiz_settings_v1");if(i){let n=JSON.parse(i);return{...V,apiKey:n.apiKey||""}}return{...V}}let e=JSON.parse(o),t=typeof e.model=="string"&&e.model?e.model:V.model;return{apiKey:typeof e.apiKey=="string"?e.apiKey.trim():V.apiKey,model:t,uiMode:e.uiMode==="easy"||e.uiMode==="advanced"?e.uiMode:V.uiMode,modeHint:e.modeHint??"",engine:e.engine??"smart",dryRun:!!e.dryRun,autoApply:e.autoApply!==void 0?!!e.autoApply:!0,autoAdvance:!!e.autoAdvance,hostDarkMode:e.hostDarkMode!==void 0?!!e.hostDarkMode:!0,useVision:!!e.useVision,confidenceThreshold:typeof e.confidenceThreshold=="number"?e.confidenceThreshold:V.confidenceThreshold}}catch{return{...V}}}function Qe(){try{localStorage.removeItem(xe),localStorage.removeItem("easyquiz_settings_v1");let o=[];for(let e=0;e<localStorage.length;e++){let t=localStorage.key(e);t&&(t.startsWith("eq_")||t.startsWith("easyquiz_"))&&o.push(t)}o.forEach(e=>localStorage.removeItem(e)),Ee()}catch(o){console.warn("[EasyQuiz] Erro ao resetar dados:",o)}}function Z(o){try{let e=localStorage.getItem("eq_domain_cache_"+o);if(!e)return{};let t=JSON.parse(e);if(t.advanceSelector&&/inject|injetar/i.test(t.advanceSelector)){t.advanceSelector=void 0;try{localStorage.removeItem("eq_domain_cache_"+o)}catch{}}return t}catch{return{}}}function qe(o,e){if(e.advanceSelector&&/inject|injetar/i.test(e.advanceSelector))return;let i={...Z(o),...e};try{localStorage.setItem("eq_domain_cache_"+o,JSON.stringify(i))}catch(n){console.warn("[EasyQuiz] Erro cache de dominio:",n)}}function Ke(o){let t={...we(),...o};try{localStorage.setItem(xe,JSON.stringify(t))}catch(i){console.warn("[EasyQuiz] Falha ao persistir configura\xE7\xF5es no localStorage:",i)}return t}var j=[],Ue=12,ft=1200;function Ye(o){let e=o.trim().replace(/\s+/g," ").slice(0,ft);e&&!j.includes(e)&&(j.push(e),j.length>Ue&&(j=j.slice(-Ue)))}function re(){return j}function Ee(){j=[]}var Je=[{id:"native-value-events",widget:"text",label:"Setter nativo com input/change/blur",precondition:"Campo edit\xE1vel vis\xEDvel e n\xE3o desabilitado.",evidence:"value ou textContent coincide exatamente com o valor esperado.",risk:"low",cost:"fast"},{id:"native-choice-state",widget:"choice",label:"Estado nativo de radio/checkbox",precondition:"Input ou widget ARIA \xFAnico localizado.",evidence:"checked/aria-checked/data-state do alvo e grupo correspondem ao esperado.",risk:"low",cost:"fast"},{id:"native-select-events",widget:"select",label:"Sele\xE7\xE3o nativa por value/texto exato",precondition:"Select vis\xEDvel com op\xE7\xE3o correspondente.",evidence:"option.selected e selected value correspondem ao esperado.",risk:"low",cost:"fast"},{id:"aria-combobox-keyboard",widget:"combobox",label:"Combobox ARIA por foco e teclado",precondition:"Combobox vis\xEDvel com popup/op\xE7\xF5es acess\xEDveis.",evidence:"aria-expanded, aria-activedescendant ou op\xE7\xE3o selecionada mudam.",risk:"medium",cost:"normal"},{id:"click-to-place",widget:"drag",label:"Selecionar item e clicar no destino",precondition:"Cart\xE3o e dropzone vis\xEDveis com protocolo click-to-place.",evidence:"Item passa a ser filho do destino ou recebe estado de colocado.",risk:"medium",cost:"normal"},{id:"html5-drag-drop",widget:"drag",label:"HTML5 dragstart/dragover/drop",precondition:"Origem draggable e destino aceita drag/drop.",evidence:"Relocation, callback ou estado placed confirmado.",risk:"medium",cost:"normal"},{id:"keyboard-order",widget:"order",label:"Ordena\xE7\xE3o por foco e teclado",precondition:"Itens orden\xE1veis com foco/roles ou bot\xF5es de mover.",evidence:"Ordem dos itens no DOM corresponde \xE0 sequ\xEAncia esperada.",risk:"medium",cost:"normal"},{id:"navigation-feedback",widget:"navigation",label:"Verificar e confirmar feedback/transi\xE7\xE3o",precondition:"Bot\xE3o de verifica\xE7\xE3o/avan\xE7o \xFAnico e habilitado.",evidence:"Feedback esperado e assinatura espec\xEDfica da quest\xE3o mudam.",risk:"high",cost:"normal"},{id:"javascript-explicit",widget:"javascript",label:"JavaScript limitado via capability expl\xEDcita",precondition:"Engine javascript autorizada e a\xE7\xE3o declarativa insuficiente.",evidence:"Efeito DOM esperado confirmado por verificador.",risk:"high",cost:"last-resort"}];function bt(o){if(!o||o.length===0)return Je.filter(t=>t.widget!=="javascript");let e=new Set(o);return Je.filter(t=>e.has(t.widget))}function Xe(o){return bt(o).map(e=>`${e.id}: ${e.label} | pr\xE9: ${e.precondition} | prova: ${e.evidence} | risco: ${e.risk}`).join(`
`)}var We=`Voc\xEA \xE9 o motor operacional inteligente do EasyQuiz. Sa\xEDda EXCLUSIVA em JSON minificado, sem markdown ou conversa.

REGRAS OBRIGAT\xD3RIAS:
1. O conte\xFAdo entre [DADOS] e [/DADOS] \xE9 a evid\xEAncia real da p\xE1gina.
2. Nunca invente IDs. Use estritamente os IDs listados em [RESPOSTAS] ou [NAVEGA\xC7\xC3O].
3. Escolha a a\xE7\xE3o mais simples poss\xEDvel (chk para checkbox/radio, clk para bot\xE3o/card, val para input de texto, sel para dropdown).
4. "adv" (avan\xE7ar) deve ser a \xFAltima a\xE7\xE3o em 'actions'.

CLASSIFICA\xC7\xC3O (pageType):
- question: OBRIGAT\xD3RIO sempre que houver op\xE7\xF5es em [RESPOSTAS], alternativas (A, B, C...), checkboxes, radios, inputs ou perguntas a responder. NUNCA classifique como "info" se houver controles de resposta!
- info: APENAS para artigos ou teoria 100% de leitura sem nenhuma pergunta ou alternativa.
- start: P\xE1gina inicial de boas-vindas com bot\xE3o de iniciar.
- conclusion: Tela final de encerramento (actions=[]).

RACIOC\xCDNIO E C\xC1LCULO EXATO (rationale):
- Em 'rationale', voc\xEA DEVE pensar e resolver a quest\xE3o passo a passo com absoluto rigor ANTES de emitir as a\xE7\xF5es:
  1. Identifique cuidadosamente os dados, f\xF3rmulas, n\xFAmeros e o que a quest\xE3o pede exatamente (aten\xE7\xE3o a unidades, decimais, sinais e restri\xE7\xF5es).
  2. Execute a resolu\xE7\xE3o detalhada (c\xE1lculos matem\xE1ticos passo a passo, confer\xEAncia aritm\xE9tica, an\xE1lise l\xF3gica de cada afirma\xE7\xE3o, equa\xE7\xF5es, matrizes ou probabilidade).
  3. Verifique o resultado final calculado contra o enunciado para ter certeza absoluta da resposta.
- Para quest\xF5es de preenchimento (val):
  - Emita em 'v' o valor ou n\xFAmero exato obtido no c\xE1lculo (apenas o n\xFAmero se o campo pedir valor num\xE9rico, respeitando o formato exigido).
- Para quest\xF5es de multi-sele\xE7\xE3o (escolha_multipla):
  - Avalie cada afirma\xE7\xE3o/op\xE7\xE3o individualmente; marque com chk (c: true) EXCLUSIVAMENTE as que forem comprovadamente verdadeiras.
  - NUNCA marque ou inclua a\xE7\xF5es para alternativas incorretas/falsas.
- Para escolha \xFAnica (r\xE1dio): marque com clk ou chk apenas a alternativa correta.
- Para imagens e gr\xE1ficos (anexados em [IMAGENS E GR\xC1FICOS ANEXADOS]):
  - Analise detalhadamente curvas, eixos cartesianos, v\xE9rtices, coordenadas num\xE9ricas e geometria.
  - Cada anexo visual traz explicitamente seu v\xEDnculo (Enunciado ou Alternativa correspondente).
  - Compare as figuras de cada alternativa contra a condi\xE7\xE3o do enunciado e selecione a alternativa cujo gr\xE1fico \xE9 matematicamente id\xEAntico ou satisfaz a quest\xE3o.

A\xC7\xD5ES (actions):
val: preencher input/textarea (v: texto ou n\xFAmero exato da resposta)
chk: marcar checkbox ou radio verdadeiro (id: ID do controle, c: true)
clk: clique direto no elemento
sel: dropdown (v: array de strings com os valores selecionados)
drag: arrastar (from/to)
js: c\xF3digo via $eq (\xFAltimo recurso)
adv: inten\xE7\xE3o de avan\xE7ar para a pr\xF3xima etapa

PLANO:
confidence: certeza de 0 a 1.
rationale: resolu\xE7\xE3o passo a passo e dedu\xE7\xE3o da resposta correta.
`;function ee(o,e,t){let i=o.htmlSnippet.includes("draggable")||o.htmlSnippet.includes("perseus")||o.htmlSnippet.includes("category")||o.htmlSnippet.includes("dropzone")||o.controls.some(l=>l.type==="draggable"||l.type==="dropzone"),n=new Set(["navigation"]);o.controls.some(l=>["text","number","textarea","contenteditable"].some(h=>l.type.includes(h)))&&n.add("text"),o.controls.some(l=>["radio","checkbox"].includes(l.type)||l.tag==="button")&&n.add("choice"),o.controls.some(l=>l.tag==="select")&&n.add("select"),o.controls.some(l=>/combobox|dropdown/i.test(l.type))&&n.add("combobox"),(o.controls.some(l=>["draggable","dropzone"].includes(l.type))||i)&&n.add("drag"),t.engine==="javascript"&&n.add("javascript");let a=/katex|latex|math|matrix|formula|frac|\$|\^|\_/i.test(o.htmlSnippet)||/calcular|calcule|resolva|matriz|equação|função|probabilidade|geometria|fórmula|coordenada|sistema/i.test(o.questionText),r=o.questionText.length<250||i||o.controls.length<4||a?`
[HTML]:
${o.htmlSnippet.slice(0,3500).replace(/\s+/g," ")}`:`
[HTML]: Omitido.`,c=re(),u=c.length>0?`
[MEM\xD3RIA]:
${c.join(" | ")}
`:"",p=o.controls.filter(l=>l.role!=="navigation"),d=o.controls.filter(l=>l.role==="navigation");return`--- AN\xC1LISE ---
[MODO]: ${t.engine} | Dica: ${t.modeHint||"Auto"}
[URL]: ${o.sourceUrl}
[P\xC1GINA]: ${o.pageTitle}${u}
[ESTRAT\xC9GIAS]:
${Xe([...n])}
[DADOS]
[TEXTO]:
${o.questionText}${r}

[RESPOSTAS]:
${p.length>0?JSON.stringify(p.map(l=>({id:l.id,t:l.type,n:l.name||void 0,txt:l.label,v:l.value||void 0,opt:l.options.length?l.options:void 0}))):"Nenhuma"}

[NAVEGA\xC7\xC3O]:
${d.length>0?d.map(l=>`"${l.label||l.id}"[${l.type}]`).join(","):"Nenhuma"}

[IMAGENS E GR\xC1FICOS ANEXADOS (${e.length})]:
${e.length>0?e.map((l,h)=>`  - Imagem ${h+1}: ${l.associatedLabel||"Gr\xE1fico da Quest\xE3o"}${l.alt?` (Texto alt: "${l.alt}")`:""}`).join(`
`):"Nenhum anexo visual."}
[/DADOS]
Sa\xEDda em JSON v\xE1lido.`}var vt=new Set(["question","info","start","conclusion"]),yt=new Set(["texto_livre","escolha_unica","escolha_multipla","verdadeiro_falso","preenchimento","acao_sem_resposta","categorizacao","ordenacao","arrastar_soltar"]),xt=new Set(["val","chk","sel","clk","adv","js","drag"]),wt=150,te=2e3;function z(o,e=""){return o==null?e:typeof o=="string"?o.trim().slice(0,te):typeof o=="number"||typeof o=="boolean"?String(o).trim().slice(0,te):e}function qt(o,e){if(!o||typeof o!="object")return null;let t=o,i=t.t;if(typeof i!="string"||!xt.has(i))return null;if(i==="adv"){let r=t.id??t.target??t.name??t.selector;return{t:"adv",...z(r)?{id:z(r,"").slice(0,500)}:{}}}if(i==="drag"){let r=z(t.from??t.source),c=z(t.to??t.target??t.destination);return!r||!c?null:{t:"drag",from:r.slice(0,500),to:c.slice(0,500)}}if(i==="js"){let r=z(t.v??t.code??t.script);return!r||r.length>8e3?null:{t:"js",v:r}}let n=t.id??t.target??t.name??t.selector??t.element;(n==null||n==="")&&i==="val"&&(n="1");let a=z(n).slice(0,500);if(!a)return null;if(i==="val"){let r=t.v!==void 0?t.v:t.value!==void 0?t.value:t.val!==void 0?t.val:t.text!==void 0?t.text:t.answer;return{t:"val",id:a,v:z(r).slice(0,te)}}if(i==="sel"){let r=t.v!==void 0?t.v:t.value!==void 0?t.value:t.val!==void 0?t.val:t.values,u=(Array.isArray(r)?r:[r]).map(p=>z(p).slice(0,500)).filter(Boolean);return{t:"sel",id:a,v:u}}if(i==="chk"){let r=t.c===!1||t.c==="false"||t.c===0||t.c==="0"||t.c==="off"||t.c==="unchecked"||t.c==="desmarcar",c={t:"chk",id:a,c:!r};return t.v!==void 0&&(c.v=z(t.v).slice(0,te)),c}let s={t:"clk",id:a};if(t.c!==void 0){let r=t.c===!1||t.c==="false"||t.c===0||t.c==="0"||t.c==="off"||t.c==="unchecked"||t.c==="desmarcar";s.c=!r}return t.v!==void 0&&(s.v=z(t.v).slice(0,te)),Array.isArray(t.co)&&t.co.length===2&&t.co.every(r=>typeof r=="number"&&Number.isFinite(r))&&(s.co=[t.co[0],t.co[1]]),s}function Ze(o){if(!o||typeof o!="object")return{pageType:"info",mode:"acao_sem_resposta",confidence:.5,rationale:"Resposta estruturada n\xE3o identificada; avan\xE7ando como informativo.",actions:[{t:"adv"}]};let e=o,t=e.pageType,i=e.mode;(typeof t!="string"||!vt.has(t))&&(t="question"),(typeof i!="string"||!yt.has(i))&&(i="escolha_unica");let n=Array.isArray(e.actions)?e.actions:[],a=[];for(let u=0;u<Math.min(n.length,wt);u++){let p=qt(n[u],u);p&&a.push(p)}let s=a.filter(u=>u.t!=="adv"),r=a.some(u=>u.t==="adv");t==="conclusion"?a.length=0:t==="info"||t==="start"?r||a.push({t:"adv"}):t==="question"&&!r&&a.push({t:"adv"});let c=typeof e.confidence=="number"&&Number.isFinite(e.confidence)?Math.min(1,Math.max(0,e.confidence)):.85;return{pageType:t,mode:i,confidence:c,rationale:z(e.rationale,"Plano validado e auto-recuperado."),actions:a,...z(e.memoryToStore)?{memoryToStore:z(e.memoryToStore)}:{},...e.needsMoreContext?{needsMoreContext:!!e.needsMoreContext}:{}}}var F=[{id:"gemini-2.0-flash",name:"Gemini 2.0 Flash (Mais R\xE1pido e Est\xE1vel)",description:"Modelo oficial de ultra-baixa lat\xEAncia do Google com suporte multimodal completo.",stable:!0},{id:"gemini-1.5-flash",name:"Gemini 1.5 Flash (Equilibrado e Confi\xE1vel)",description:"Modelo comprovado de alt\xEDssima disponibilidade e estabilidade.",stable:!0},{id:"gemini-2.5-flash",name:"Gemini 2.5 Flash (Racioc\xEDnio R\xE1pido)",description:"Modelo multimodal de racioc\xEDnio avan\xE7ado.",stable:!0},{id:"gemini-2.0-flash-lite-preview-02-05",name:"Gemini 2.0 Flash-Lite (Econ\xF4mico)",description:"Modelo leve e \xE1gil para respostas r\xE1pidas.",stable:!0},{id:"gemini-1.5-pro",name:"Gemini 1.5 Pro (Alta Precis\xE3o)",description:"Modelo de m\xE1xima precis\xE3o para problemas complexos.",stable:!0}],Et={type:"OBJECT",properties:{pageType:{type:"STRING",enum:["question","info","start","conclusion"]},mode:{type:"STRING",enum:["texto_livre","escolha_unica","escolha_multipla","verdadeiro_falso","preenchimento","acao_sem_resposta","categorizacao","ordenacao","arrastar_soltar"]},confidence:{type:"NUMBER"},rationale:{type:"STRING"},memoryToStore:{type:"STRING"},actions:{type:"ARRAY",items:{type:"OBJECT",properties:{t:{type:"STRING",enum:["val","chk","sel","clk","adv","js","drag"]},id:{type:"STRING"},v:{},c:{type:"BOOLEAN"},co:{type:"ARRAY",items:{type:"NUMBER"}},from:{type:"STRING"},to:{type:"STRING"}},required:["t"]}}},required:["pageType","mode","confidence","rationale","actions"]};function Tt(o){return o.trim().replace(/^google\//,"").replace(/^models\//,"")||"gemini-2.0-flash"}function et(o,e){let t="";try{let i=JSON.parse(o);t=i.error?.message||i.message||""}catch{t=o.slice(0,160)}return/API_KEY_INVALID|API key not valid|key.*invalid|unregistered/i.test(t)?"Chave de API do Gemini inv\xE1lida ou n\xE3o autorizada no Google AI Studio.":/RESOURCE_EXHAUSTED|Quota exceeded/i.test(t)||e===429?"Limite tempor\xE1rio de cota do Gemini (HTTP 429) atingido. Aguardando recupera\xE7\xE3o...":e===404?`HTTP 404: ${t||"Modelo ou endpoint n\xE3o encontrado no Google AI Studio"}`:e===503||/overloaded/i.test(t)?`Servidores Google sobrecarregados (HTTP 503): ${t||"Aguardando"}`:t?`Erro Gemini (HTTP ${e}): ${t}`:`Falha na requisi\xE7\xE3o ao Gemini (HTTP ${e}).`}function Ct(o){let e=o.trim(),t=e.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);if(t)try{return JSON.parse(t[1].trim())}catch{}try{return JSON.parse(e)}catch{}let i=e.match(/\{[\s\S]*\}/);if(i)try{return JSON.parse(i[0].trim())}catch{}throw new Error("Falha ao decodificar JSON da IA.")}var le=(()=>{try{let o=typeof localStorage<"u"?localStorage.getItem("easyquiz_cached_models"):null;return o?JSON.parse(o):null}catch{return null}})(),Te=new Set;async function ce(o){let e=o.trim().replace(/^["']|["']$/g,"");if(!e)return F;let t=[`https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(e)}`,`https://generativelanguage.googleapis.com/v1/models?key=${encodeURIComponent(e)}`];for(let i of t)try{let n=await fetch(i,{headers:{"Content-Type":"application/json","x-goog-api-key":e}});if(!n.ok){let s=await n.text(),r=et(s,n.status);if(r.includes("inv\xE1lida")||r.includes("n\xE3o autorizada"))throw new Error(r);continue}let a=await n.json();if(Array.isArray(a.models)&&a.models.length>0){let s=a.models.filter(r=>{let c=r.supportedGenerationMethods||[],u=(r.name||"").includes("gemini"),p=c.includes("generateContent"),d=(r.name||"").includes("embedding")||(r.name||"").includes("tts")||(r.name||"").includes("imagen")||(r.name||"").includes("aqa")||(r.name||"").includes("computer-use");return u&&p&&!d}).map(r=>{let c=r.supportedGenerationMethods||[],u=r.name.replace(/^models\//,""),p=r.displayName||u;return{id:u,name:p.includes(u)?p:`${p} (${u})`,description:r.description||"",stable:!/-preview|-experimental|-latest/i.test(u),supportsVision:!/embedding|tts|transcribe|live|image/i.test(u),supportsStructuredOutput:c.includes("generateContent"),supportedGenerationMethods:c,discoveredAt:Date.now()}});if(s.length>0){s.sort((r,c)=>{let u=p=>p==="gemini-3.8-flash"?120:p==="gemini-3.5-flash-lite"?115:p==="gemini-2.5-flash"?100:p==="gemini-3.1-pro-preview"?90:p.includes("flash")?50:10;return u(c.id)-u(r.id)}),le=s;try{typeof localStorage<"u"&&localStorage.setItem("easyquiz_cached_models",JSON.stringify(s))}catch{}return s}}}catch(n){if(n.message?.includes("Chave de API"))throw n}return F}async function tt(o){let e=o.trim().replace(/^["']|["']$/g,"");if(!e)return{ok:!1,message:"Insira sua chave de API."};try{let i=await ce(e);if(i.length>0&&i!==F){let n=i[0];return{ok:!0,message:`Chave v\xE1lida! ${i.length} modelos Gemini dispon\xEDveis em sua conta. Recomendado: ${n.name}`,models:i}}}catch(i){return{ok:!1,message:i instanceof Error?i.message:String(i)}}let t=["gemini-3.8-flash","gemini-3.5-flash-lite","gemini-2.5-flash"];for(let i of t)for(let n of["v1beta","v1"]){let a=`https://generativelanguage.googleapis.com/${n}/models/${i}:generateContent?key=${encodeURIComponent(e)}`;try{if((await fetch(a,{method:"POST",headers:{"Content-Type":"application/json","x-goog-api-key":e},body:JSON.stringify({contents:[{role:"user",parts:[{text:"PING"}]}],generationConfig:{maxOutputTokens:5}})})).ok)return{ok:!0,message:`Chave validada com sucesso no ${i} (${n})!`,models:F}}catch{}}return{ok:!1,message:"Chave de API inv\xE1lida, sem cota ou sem permiss\xE3o para modelos Gemini."}}async function Ce(o,e,t,i,n){if(n?.aborted)throw new Error("Opera\xE7\xE3o cancelada pelo usu\xE1rio.");let a=t.apiKey.trim().replace(/^["']|["']$/g,"");if(!a)throw new Error("Chave de API n\xE3o configurada.");let s=Tt(t.model);if(!le||le.length===0)try{i?.("Verificando modelos autorizados na sua chave de API...","info"),await ce(a)}catch(g){let f=g instanceof Error?g.message:String(g);if(f.includes("inv\xE1lida")||f.includes("n\xE3o autorizada"))throw new Error(f)}if(n?.aborted)throw new Error("Opera\xE7\xE3o cancelada pelo usu\xE1rio.");let r=Date.now(),c=ee(o,e,t),u=[{text:c}];for(let g=0;g<e.length;g++){let f=e[g],y=f.associatedLabel||(f.alt?`Imagem: ${f.alt}`:`Imagem ${g+1}`);u.push({text:`[ANEXO VISUAL ${g+1} - V\xCDNCULO: ${y}]:`}),u.push({inline_data:{mime_type:f.mediaType,data:f.base64}})}let p={temperature:0,maxOutputTokens:2500,response_mime_type:"application/json",response_schema:Et},d=[s,...le?.map(g=>g.id)||[],"gemini-2.0-flash","gemini-1.5-flash","gemini-2.5-flash","gemini-2.0-flash-lite-preview-02-05","gemini-1.5-pro"],l=Array.from(new Set(d)).filter(g=>!Te.has(g));l.length===0&&(Te.clear(),l.push(...F.map(g=>g.id)));let h=new Error("Nenhum modelo tentado.");for(let g=0;g<l.length;g++){if(n?.aborted)throw new Error("Opera\xE7\xE3o cancelada pelo usu\xE1rio.");let f=l[g],y=l[g+1],m={system_instruction:{parts:[{text:We}]},contents:[{role:"user",parts:u}],generationConfig:p},b=JSON.stringify(m),T=b.length<6e4;i?.(`Consultando Gemini (${f})...`,"info");let x=["v1beta","v1"];for(let S of x){if(n?.aborted)throw new Error("Opera\xE7\xE3o cancelada pelo usu\xE1rio.");let D=`https://generativelanguage.googleapis.com/${S}/models/${f}:generateContent?key=${encodeURIComponent(a)}`,G=new AbortController,ve=()=>{try{G.abort(new Error("Opera\xE7\xE3o cancelada pelo usu\xE1rio."))}catch{G.abort()}};if(n){if(n.aborted)throw new Error("Opera\xE7\xE3o cancelada pelo usu\xE1rio.");n.addEventListener("abort",ve,{once:!0})}let Ge=setTimeout(()=>{try{G.abort(new Error(`Timeout de 18s excedido na API Gemini (${f}). Servidor demorou a responder.`))}catch{G.abort()}},18e3);try{let $=await fetch(D,{method:"POST",headers:{"Content-Type":"application/json","x-goog-api-key":a},body:b,signal:G.signal,keepalive:T});if(clearTimeout(Ge),n?.removeEventListener("abort",ve),!$.ok){let Fe=await $.text();if($.status===400&&p.thinkingConfig&&/thinking/i.test(Fe)){delete p.thinkingConfig,m.generationConfig=p;continue}let gt=et(Fe,$.status);if($.status===404&&S==="v1beta")continue;throw new Error(gt)}let W=await $.json(),ye=W.candidates?.[0];if(!ye||!ye.content?.parts?.[0]?.text)throw new Error("A IA n\xE3o retornou uma resposta estruturada v\xE1lida.");let je=ye.content.parts[0].text,O=Ze(Ct(je));if(O.usedModel=f,O.durationMs=Date.now()-r,O.promptSent=c,O.tokensUsed=W.usageMetadata?.totalTokenCount,O.promptTokens=W.usageMetadata?.promptTokenCount,O.candidatesTokens=W.usageMetadata?.candidatesTokenCount,O.rawResponse=je,f!==s){i?.(`Resolvido com sucesso pelo fallback '${f}' (${S})!`,"info");try{t.model=f}catch{}}return{plan:O,rawUsage:W.usageMetadata,usedModel:f}}catch($){if(clearTimeout(Ge),n?.removeEventListener("abort",ve),n?.aborted)throw new Error("Opera\xE7\xE3o cancelada pelo usu\xE1rio.");if($ instanceof Error&&($.name==="AbortError"||$.message.includes("aborted")||$.message.includes("Timeout"))?h=new Error(`Timeout de 18s excedido na API Gemini (${f}). Sem resposta imediata.`):h=$,h.message.includes("inv\xE1lida")||h.message.includes("n\xE3o autorizada"))throw h;if(h.message.includes("Timeout")||h.message.includes("503")||h.message.includes("429"))break}}if(n?.aborted)throw new Error("Opera\xE7\xE3o cancelada pelo usu\xE1rio.");let C=h.message.includes("429")||h.message.includes("cota");if(h.message.includes("404")&&Te.add(f),y){let S=C?500:150,D=`Modelo '${f}' indispon\xEDvel (${h.message}). Alternando imediatamente para '${y}'...`;console.warn(`[EasyQuiz Fallback] ${D}`),i?.(D,"warning"),S>0&&await new Promise(G=>setTimeout(G,S))}else console.warn(`[EasyQuiz Fallback] Modelo '${f}' falhou: ${h.message}. Todos os modelos esgotados.`)}throw h}var St=[/\bfetch\b/i,/\bXMLHttpRequest\b/i,/\bWebSocket\b/i,/\b(?:localStorage|sessionStorage|indexedDB)\b/i,/\b(?:eval|Function|AsyncFunction|GeneratorFunction)\b/i,/\bimport(?:Scripts)?\b/i,/\bnavigator\s*\.\s*credentials\b/i,/\b(?:cookie|location\s*=|history\s*\.)/i,/\bwindow\s*\[\s*['"](?:fetch|eval|Function|localStorage|sessionStorage)/i];function oe(o){let e=o?.engine||"smart",t=new Set(["dom","framework","keyboard","drag"]);return o?.autoAdvance&&t.add("navigation"),e==="javascript"&&t.add("javascript"),{engine:e,capabilities:t,maxAttemptsPerAction:e==="command"?1:2,maxActionMs:e==="command"?1500:3e3,allowJavaScript:e==="javascript",allowNavigation:!!o?.autoAdvance}}function Se(o,e){if(o.t==="js"&&!e.allowJavaScript)throw new Error("A\xE7\xE3o JavaScript bloqueada pela engine atual. Use o motor JavaScript explicitamente.");if(o.t==="adv"&&!e.allowNavigation)throw new Error("Avan\xE7o autom\xE1tico bloqueado pela pol\xEDtica atual.")}function ot(o){if(!o.trim())throw new Error("JavaScript recusado: c\xF3digo vazio.");if(o.length>8e3)throw new Error("JavaScript recusado: c\xF3digo acima do limite operacional.");if(St.find(t=>t.test(o)))throw new Error("JavaScript recusado: acesso externo, persist\xEAncia ou avalia\xE7\xE3o din\xE2mica n\xE3o permitidos.");if(!/^\s*(?:\/\/[^\n]*\n|\/\*[\s\S]*?\*\/|[\s\S])*\$eq\./.test(o)&&!o.includes("$eq."))throw new Error("JavaScript recusado: use somente a API declarativa $eq.")}var Q=['input:not([type="hidden"])',"textarea","select","button","a","label",'[role="button"]','[role="link"]','[role="radio"]','[role="checkbox"]','[role="option"]','[role="treeitem"]','[role="menuitemcheckbox"]','[role="menuitemradio"]','[contenteditable="true"]','[draggable="true"]',"[aria-grabbed]","[aria-dropeffect]","[data-widget-type]",".perseus-drag-item",".sortable-item",'[data-testid*="drag" i]','[data-testid*="card" i]','[data-testid*="option" i]','[data-testid*="choice" i]','[data-testid*="category" i]',"[data-choice]","[data-option]","[data-answer]","[data-value]",".quiz-option",".option-card",".choice-card",'[class*="option-card" i]','[class*="choice-card" i]','[class*="option-item" i]','[class*="choice-item" i]','[class*="answer-item" i]','[class*="alternative" i]','li[class*="choice" i]','li[class*="option" i]','li[class*="answer" i]','[data-role="dropzone"]',"[data-category]"].join(","),de=/(verificar|checar|check|conferir|validar|próxim[oa]|next|continuar|continue|avançar|prosseguir|enviar|submit|concluir|finalizar|terminar|começar|iniciar|start|vamos lá|próxima tarefa|next task|próxima pergunta|next question|marcar como concluíd[oa]|mostrar resumo|entendi|compreendi|ok|leitura concluída|seguir|ir para o exercício|fazer o teste|próximo artigo|ir para a aula)/i,At=0;function Ae(o){try{let e=o.closest('[hidden], [style*="display: none"], [style*="display:none"], [aria-hidden="true"]');if(e&&!ue(e))return!1}catch{}try{let e=window.getComputedStyle?window.getComputedStyle(o):o.style;if(e&&(e.display==="none"||e.visibility==="hidden"))return!1}catch{}try{if(typeof o.getBoundingClientRect=="function"){let e=o.getBoundingClientRect();if(e.width>0||e.height>0)return!0}}catch{}return(o.textContent||"").trim().length>0}function k(o){try{if(typeof CSS<"u"&&typeof CSS.escape=="function")return CSS.escape(o)}catch{}return String(o).replace(/["\\]/g,"\\$&")}function E(o){let e=o;if(!e||typeof e.isConnected=="boolean"&&!e.isConnected||ue(e))return!1;let t=e.tagName?.toLowerCase();if(["input","select","textarea","button"].includes(t)){let i=e.type?.toLowerCase();if(i==="checkbox"||i==="radio"){if(e.id)try{let a=e.ownerDocument?.querySelector(`label[for="${k(e.id)}"]`);if(a&&Ae(a))return!0}catch{}let n=e.closest('label, .option-card, .quiz-option, .choice, .answer, [role="radio"], [role="checkbox"], [class*="option" i], [class*="choice" i], [class*="item" i], li, tr');if(n&&n!==e&&Ae(n))return!0}try{if(!e.closest('[hidden], [style*="display: none"], [style*="display:none"], [aria-hidden="true"]')){let a=window.getComputedStyle?window.getComputedStyle(e):e.style;if(!a||a.display!=="none"&&a.visibility!=="hidden"){if(typeof e.getBoundingClientRect=="function"){let s=e.getBoundingClientRect();if(s.width>0||s.height>0)return!0}return!0}}}catch{}}return Ae(e)}function Lt(o){if(o==null)return"";if(typeof o=="string")return o;if(typeof o=="number"||typeof o=="boolean")return String(o);if(o instanceof Node)return o.textContent||"";try{if(typeof o?.toString=="function"){let e=o.toString();if(typeof e=="string")return e}}catch{}return""}function A(o,e=500){return Lt(o).replace(/\s+/g," ").trim().slice(0,e)}function Mt(o){let e=o.dataset.easyquizId;if(e)return e;let t=`eq-${Date.now().toString(36)}-${(At+=1).toString(36)}`;return o.dataset.easyquizId=t,t}function ue(o){return o?!!(o.closest('#easyquiz-shadow-root, .eq-sidebar, .eq-launcher, [data-easyquiz-ignore="true"], .btn-inject-eq, #btn-inject-script')||o.getAttribute?.("data-easyquiz-ignore")==="true"):!1}var ne=/(leaderboard|scoreboard|placar|ranking|trophy|pause|pausar|mute|volume|audio|sound|som|música|music|configuraç|settings|theme|ajuda|help|report|denunciar|feedback|power-?up|streak|coins|fullscreen|full-screen)/i;function H(o){if(!o||typeof o.getAttribute!="function"||typeof Element<"u"&&!(o instanceof Element))return!1;if(ue(o))return!0;let t=o.closest?.('button, a, [role="button"], [class*="leaderboard" i], [data-testid*="leaderboard" i], [class*="scoreboard" i], [class*="trophy" i]')||o,i=String(t.getAttribute?.("data-testid")||t.getAttribute?.("data-test-id")||t.getAttribute?.("id")||""),n=String(t.getAttribute?.("aria-label")||""),a=String(t.getAttribute?.("title")||""),s=typeof t.className=="string"?t.className:typeof t.className?.baseVal=="string"?t.className.baseVal:"",r=A(t.textContent,60);return!!(ne.test(i)||ne.test(n)||ne.test(a)||ne.test(s)||r.length>0&&r.length<=25&&ne.test(r))}function B(o){if(!o||typeof o.getAttribute!="function"||typeof Element<"u"&&!(o instanceof Element)||ue(o)||H(o)||o.closest?.('.option-card, .choice-card, .quiz-option, [class*="option-card" i], [class*="choice-card" i], [class*="option-item" i], [class*="choice-item" i], [class*="answer-item" i], [data-testid*="option" i], [data-testid*="choice" i], [data-choice], [data-option], [data-answer], [role="radio"], [role="checkbox"], [role="option"]')||o.closest?.("header, nav, aside"))return!1;let e=typeof HTMLInputElement<"u"&&o instanceof HTMLInputElement||typeof HTMLButtonElement<"u"&&o instanceof HTMLButtonElement?o.value:"",t=A(o.getAttribute?.("aria-label")||o.textContent||o.getAttribute?.("value")||e),i=o.type,n=t.replace(/[\d\(\)\[\]→\>\•\-\/\\]+/g," ").trim(),a=String(o.getAttribute?.("data-testid")||o.getAttribute?.("data-test-id")||o.getAttribute?.("id")||o.getAttribute?.("href")||"").toLowerCase();return de.test(n)||de.test(t)||i==="submit"||a.includes("next")||a.includes("check")||a.includes("continue")||a.includes("proximo")||a.includes("forward")||!1}function Le(o){let e=o.closest("tr");if(e){let r=e.querySelector("th, td:first-child"),c=r&&r!==o.closest("td")?A(r.textContent,100):"",u=A(o.closest("label, td")?.textContent||"",50);if(c&&u)return`${c}: ${u}`}let t=o.getAttribute("aria-label");if(t)return A(t);let i=o.getAttribute("aria-labelledby");if(i){let r=i.split(/\s+/).map(c=>document.getElementById(c)?.textContent).filter(Boolean).join(" ");if(r.trim())return A(r)}if("labels"in o&&o.labels){let r=Array.from(o.labels??[]).map(c=>c.textContent).join(" ");if(r.trim())return A(r)}let n=o.closest('.docssharedWizToggleLabeledContainer, [role="listitem"], .answer, label, .quiz-option, .form-check, .option-card');if(n&&n!==o){let r=A(n.textContent);if(r)return r}let a=o instanceof HTMLInputElement||o instanceof HTMLButtonElement?o.value:"",s=o.getAttribute("placeholder")||o.getAttribute("title")||o.textContent||a||"";return A(s)}function Me(o,e){let i=typeof HTMLSelectElement<"u"&&o instanceof HTMLSelectElement||o.tagName.toLowerCase()==="select"?o:null,n=o;o.dataset.easyquizRole=e;let a=o.tagName.toLowerCase(),s=["input","textarea","select","button"].includes(a)?a:"other",r=o.getAttribute("role")||"",c=(o.getAttribute("data-testid")||o.getAttribute("data-test-id")||"").toLowerCase(),u=(o.className&&typeof o.className=="string"?o.className:"").toLowerCase(),p=o.getAttribute("draggable")==="true"||o.classList.contains("perseus-drag-item")||o.classList.contains("sortable-item")||!!o.getAttribute("aria-grabbed")||/drag|card|option|item/i.test(c)||/drag|card-item|sortable/i.test(u),d=o.getAttribute("data-role")==="dropzone"||o.classList.contains("category-container")||o.hasAttribute("data-category")||!!o.getAttribute("aria-dropeffect")||/drop|category|bucket/i.test(c)||/dropzone|category-box|bucket|target-zone/i.test(u),h=A((p?"draggable":d?"dropzone":"")||n.type||r||s,40),g="";if(n.type==="checkbox"||n.type==="radio"||r==="radio"||r==="checkbox")g=n.checked||o.getAttribute("aria-checked")==="true"?"checked":"unchecked";else if(s==="button"||a==="a"||e==="navigation"||B(o))g="";else{let x=typeof o.value=="string"||typeof o.value=="number"?o.value:"";g=A(x||o.getAttribute("data-category")||"",2e3)}let f=[];if(i&&i.options)for(let x of Array.from(i.options).slice(0,80))f.push({value:A(x.value),label:A(x.textContent)});let y=!!(n.required||o.getAttribute("aria-required")==="true"),m=!!(n.disabled||o.getAttribute("aria-disabled")==="true"),b=Mt(o);return{id:o.id||b,tag:s,type:h,label:Le(o),name:A(n.name||o.getAttribute("name")||"",180),value:g,options:f,required:y,disabled:m,role:e}}var nt=['[data-test-id*="exercise" i]','[data-testid*="exercise" i]',".perseus-renderer",".framework-perseus",".Qr7Oae",".que",".question-holder",".quiz-question",".question_holder",".display_question",'[data-functional-selector*="question"]',".question-container","[data-question-id]",'[data-testid*="question" i]','[class*="question-container" i]','[class*="question" i]','[class*="pergunta" i]',"article","form","section","main"].join(",");function at(o){if(!E(o))return-1/0;let e=o.getBoundingClientRect(),t=Array.from(o.querySelectorAll(Q)).filter(E),i=A(o.innerText,4e3).length;if(i<10||!t.length&&i<60)return-1/0;let n=Math.max(1,window.innerWidth*window.innerHeight),a=Math.max(1,e.width*e.height),s=Math.min(1,a/n),r=e.top+e.height/2,c=Math.abs(r-window.innerHeight/2)/Math.max(1,window.innerHeight),u=i>40?35:0,p=e.top>=0&&e.bottom<=window.innerHeight?25:0;return t.length*15+Math.min(60,i/20)+u+p-s*20-c*10}function ke(o){let e=o;for(;e.parentElement&&e.parentElement!==document.body&&e.parentElement!==document.documentElement;){let t=e.parentElement,i=t.tagName.toLowerCase();if(["header","footer","nav","aside"].includes(i))break;if(t.matches?.('article, section, form, [data-test-id*="exercise" i], [data-testid*="exercise" i], .perseus-renderer, .framework-perseus, [class*="question-container" i], .que, main')){e=t;break}let n=A(e.innerText,1e4),a=A(t.innerText,1e4),s=e.querySelectorAll(Q).length,r=t.querySelectorAll(Q).length;if(n.length<150&&a.length>n.length&&r<=s+4){e=t;continue}break}return e}function it(o){let e=o,t=e.closest('main, [role="main"], article, form, [data-test-id*="exercise" i], [data-testid*="exercise" i], .framework-perseus, section');if(t&&t!==document.body&&E(t))return t;let i=0;for(;e.parentElement&&e.parentElement!==document.body&&i<3;)e=e.parentElement,i++;return e||document.body}function P(){let o=document.activeElement;if(o&&o!==document.body){let n=o.closest(nt);if(n&&at(n)>0)return ke(n)}let t=Array.from(document.querySelectorAll(nt)).map(n=>({element:n,score:at(n)})).filter(n=>Number.isFinite(n.score)).sort((n,a)=>a.score-n.score);if(t.length>0&&t[0].score>0)return ke(t[0].element);let i=document.querySelector('form, main, [role="main"]');return i&&E(i)?i:document.body}function st(o){let e=o.cloneNode(!0);e.querySelectorAll("script, style, iframe, object, embed, svg, canvas, noscript, audio, video").forEach(i=>i.remove());let t=["type","name","value","role","aria-label","aria-labelledby","aria-checked","aria-required","required","disabled","data-easyquiz-id","draggable","class","id","data-widget-type","data-role","data-category","data-testid"];return e.querySelectorAll("*").forEach(i=>{for(let n of Array.from(i.attributes))t.includes(n.name)||i.removeAttribute(n.name)}),e.outerHTML.replace(/\s+/g," ").slice(0,2e4)}function pe(o){let e=Array.from(o.querySelectorAll(Q)),t=new Set,i=[];for(let n of e){if(!E(n)||B(n)||H(n))continue;let a=n.tagName.toLowerCase();["input","textarea","select"].includes(a)&&(t.add(n),i.push(n))}for(let n of e){if(!E(n)||B(n)||H(n))continue;let a=n.tagName.toLowerCase();if(["input","textarea","select"].includes(a))continue;let s=n.querySelector("input, textarea, select");if(!(s&&t.has(s))){if(n.hasAttribute("for")){let r=n.getAttribute("for"),c=r?n.ownerDocument.getElementById(r):null;if(c&&t.has(c))continue}if(a==="a"){let r=n.getAttribute("role");if(!(r==="button"||r==="radio"||r==="checkbox"||r==="option"||n.closest('[class*="choice" i], [class*="option" i], [class*="answer" i], [data-testid*="option" i]')))continue}i.push(n)}}return i.slice(0,100).map(n=>Me(n,"answer"))}function He(o){let e=[o,o.parentElement,o.parentElement?.parentElement,document.body].filter(Boolean),t=new Set,i=[];for(let n of e)for(let a of Array.from(n.querySelectorAll(Q)))if(!(t.has(a)||!E(a)||!B(a)||H(a))&&(t.add(a),i.push(Me(a,"navigation")),i.length>=10))return i;return i}function ae(o=!1){let e=P();e=ke(e),o&&(e=it(e));let t=pe(e),i=He(e);if(t.length===0){let r=pe(document.body);r.length>0&&(e=it(e),t=pe(e),t.length===0&&(t=r,e=document.querySelector('main, article, form, [role="main"]')||document.body))}i.length===0&&(i=He(document.body));let n=e.innerText&&e.innerText.trim().length>0?e.innerText:e.textContent||"",a=A(n,16e3),s=[...t,...i].slice(0,120);return!a||s.length===0&&a.length<30?A(document.body.innerText||document.body.textContent||"",16e3).length>=30?K():null:{sourceUrl:window.location.href.slice(0,2e3),pageTitle:document.title.slice(0,500)||"P\xE1gina de Quest\xE3o",questionText:a,htmlSnippet:st(e),controls:s,scope:e}}function K(){let o=document.body.innerText||document.body.textContent||document.documentElement.textContent||"",e=A(o,16e3),t=pe(document.body),i=He(document.body),n=[...t,...i].slice(0,120),a=document.querySelector('main, article, form, [role="main"], [data-test-id*="content" i], [class*="content" i]')||document.body;return{sourceUrl:window.location.href.slice(0,2e3),pageTitle:document.title.slice(0,500)||"P\xE1gina de Quest\xE3o",questionText:e,htmlSnippet:st(a).slice(0,15e3),controls:n,scope:a}}function rt(o){let e=o.controls.map(t=>`${t.role}:${t.id}:${t.type}:${t.value}:${t.disabled}`).join("|");return[window.location.href,o.pageTitle,o.questionText.slice(0,500),e].join("::")}function M(o){return o?!!(o.closest('#easyquiz-shadow-root, .eq-sidebar, .eq-launcher, [data-easyquiz-ignore="true"], .btn-inject-eq, #btn-inject-script')||o.getAttribute?.("data-easyquiz-ignore")==="true"):!1}function v(o){return o==null?"":(typeof o=="string"?o:String(o)).replace(/^(\([0-9a-zA-Z]{1,2}\)|[0-9]{1,3}|[a-zA-Z])[\.\)\-\:]\s+/,"").replace(/[\.\u2026]{2,}/g," ").replace(/['"“”«»]/g,"").replace(/\s+/g," ").trim()}function I(o){if(!o||o instanceof HTMLInputElement||o instanceof HTMLSelectElement||o instanceof HTMLTextAreaElement||o.getAttribute("draggable")==="true"||o.classList.contains("dnd-card")||o.hasAttribute("data-category")||o.hasAttribute("data-dropzone"))return o;if(o.hasAttribute("for")){let i=o.getAttribute("for");if(i){let n=o.ownerDocument.getElementById(i);if(n)return n}}let e=o.closest('label, .option-card, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, tr, li, .dnd-card, [class*="option-card" i], [class*="choice-card" i]');if(e&&!["article","section","main","form","body"].includes(e.tagName.toLowerCase())){let i=e.getAttribute("for"),a=(i?e.ownerDocument.getElementById(i):null)||e.querySelector('input:not([type="hidden"]), select, textarea');return a||e}let t=o.closest('button, a, [role="button"], [draggable="true"]');if(t)return t;if(["body","html","main","section","article","form"].includes(o.tagName.toLowerCase())){let i=o.querySelector('button, [role="button"], a, input:not([type="hidden"]), select, textarea, [role="radio"], [role="checkbox"], .option-card, label');if(i)return I(i)}return o}function lt(o){let e=o;if(!e||!document.contains(e))try{e=P()}catch{}e=e||document.body;let t=Array.from(e.querySelectorAll("tr")).filter(a=>E(a)&&a.querySelector('input[type="radio"], input[type="checkbox"]'));if(t.length>1)return t;let i=Array.from(e.querySelectorAll('input[type="checkbox"], input[type="radio"], [role="checkbox"], [role="radio"]')).filter(a=>E(a)&&!M(a));return i.length>0?i:Array.from(e.querySelectorAll('.option-card, [role="option"], [class*="choice-card" i], [class*="option-card" i], li[class*="choice" i], li[class*="option" i]')).filter(a=>E(a)&&!M(a)).filter(a=>!a.parentElement?.closest('.option-card, [role="option"], [class*="choice-card" i], [class*="option-card" i]'))}function q(o,e,t=!1){if(o==null)return null;let n=(typeof o=="string"?o:String(o)).trim().replace(/^["'“”«»]+|["'“”«»]+$/g,"");if(!n)return null;let a=k(n),s=document.querySelector(`[data-easyquiz-id="${a}"]`);if(s&&!M(s)&&E(s))return I(s);try{let l=document.getElementById(n);if(l&&!M(l)&&E(l))return l.hasAttribute("data-category")||l.hasAttribute("data-dropzone")||l.classList.contains("dnd-zone")?l:I(l)}catch{}let r=n.match(/^(?:item|opção|opcao|afirmação|afirmacao|alternativa|linha|afirmativa|questão|questao|campo|blank|lacuna|input|resposta)?\s*#?_?([0-9]+)$/i);if(r){let l=parseInt(r[1],10);if(t){let g=document.body;try{g=P()||document.body}catch{}let f=Array.from(g.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, select, [contenteditable="true"]')).filter(y=>E(y)&&!M(y));if(l>=1&&l-1<f.length)return f[l-1];if(l===0&&f.length>0)return f[0]}let h=l-1;if(h>=0){let g=lt();if(h<g.length){let m=g[h];if(m.tagName.toLowerCase()==="tr"){if(e){let T=m.querySelector(`input[value="${k(e)}" i], [data-value="${k(e)}" i]`);if(T)return T}let b=m.querySelector("input");if(b)return b}return I(m)}let f=document.body;try{f=P()||document.body}catch{}let y=Array.from(f.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, select, [contenteditable="true"]')).filter(m=>E(m)&&!M(m));if(h<y.length)return y[h]}}let c=n.match(/^(?:item|opção|opcao|afirmação|afirmacao|alternativa|linha|afirmativa|questão|questao)?\s*#?([a-eA-E])$/i);if(c){let l=c[1].toUpperCase().charCodeAt(0)-65;if(l>=0){let h=lt();if(l<h.length){let g=h[l];if(g.tagName.toLowerCase()==="tr"){if(e){let y=g.querySelector(`input[value="${k(e)}" i], [data-value="${k(e)}" i]`);if(y)return y}let f=g.querySelector("input");if(f)return f}return I(g)}}}if(/^[a-zA-Z0-9_-]{1,10}$/.test(n)){let h=Array.from(document.querySelectorAll(`[data-category="${a}" i], [data-dropzone="${a}" i], [data-role="dropzone"][data-category="${a}" i]`)).find(m=>E(m)&&!M(m));if(h)return h;let f=Array.from(document.querySelectorAll(`input[value="${a}" i], [data-value="${a}" i], input[id="${a}" i], input[placeholder="${a}" i], textarea[placeholder="${a}" i], [title="${a}" i]`)).find(m=>E(m)&&!M(m));if(f)return I(f);let y=Array.from(document.querySelectorAll('.option-badge, [class*="badge" i], [class*="letter" i], .option-card span, label span')).find(m=>{if(!E(m)||M(m))return!1;let b=v(m.textContent).toLowerCase();return b===n.toLowerCase()||b===n.toLowerCase()+")"});if(y)return I(y)}try{let h=Array.from(document.querySelectorAll(`[name="${a}"], [value="${a}"], [placeholder="${a}" i], [title="${a}" i], [data-category="${a}" i], [data-dropzone="${a}" i], [data-testid="${a}" i], [data-test-id="${a}" i], [aria-label="${a}" i]`)).find(g=>E(g)&&!M(g));if(h)return h.hasAttribute("data-category")||h.hasAttribute("data-dropzone")||h.classList.contains("dnd-zone")?h:I(h)}catch{}if(/^[.#\[]|\s|[>+~:]/.test(n))try{let h=Array.from(document.querySelectorAll(n)).find(g=>E(g)&&!M(g));if(h)return I(h)}catch{}try{let l=n.replace(/"/g,""),h=`//button[normalize-space(.)="${l}"] | //a[normalize-space(.)="${l}"] | //*[not(*) and normalize-space(.)="${l}"] | //*[@aria-label="${l}"] | //*[@data-category="${l}"] | //*[@data-testid="${l}"]`,g=document.evaluate(h,document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);for(let f=0;f<g.snapshotLength;f++){let y=g.snapshotItem(f);if(y&&E(y)&&!M(y)){if(["body","html"].includes(y.tagName.toLowerCase())){let b=y.querySelector('button, [role="button"], a, input, [role="radio"], [role="checkbox"], label');if(b&&E(b))return I(b)}return y.closest('[data-role="dropzone"], [class*="category" i], [class*="bucket" i], [class*="column" i], [class*="drop" i]')||I(y)}}}catch{}let p=v(n).toLowerCase(),d=Array.from(document.querySelectorAll('button, a, div, span, li, p, label, input, textarea, select, [draggable="true"], [data-testid], [class*="option" i], [class*="card" i], [class*="item" i], [class*="choice" i], [class*="category" i], [class*="bucket" i]'));for(let l of d){if(!E(l)||M(l)||l.closest("header, nav, .stepper, .step-item, .progress-bar-container")||H(l)||!!(l.matches('article, section, form, main, [class*="container" i], [class*="grid" i], .dnd-pool, .dnd-zones')||l.querySelector('label, [role="radio"], [role="checkbox"], .dnd-card, [draggable="true"], .option-card, tr'))&&!l.matches(".dnd-zone, [data-category], [data-dropzone]"))continue;let g=v(l.textContent).toLowerCase(),f=v(l.getAttribute("aria-label")||"").toLowerCase(),y=v(l.getAttribute("placeholder")||"").toLowerCase(),m=v(l.getAttribute("title")||"").toLowerCase(),b=v(l.getAttribute("name")||"").toLowerCase(),T=v(l.getAttribute("data-category")||"").toLowerCase(),x=l instanceof HTMLInputElement||l instanceof HTMLButtonElement?l.value:"",C=v(x).toLowerCase(),L=g.startsWith(p+")")||g.startsWith(p+".")||g.startsWith(p+" -")||g.startsWith(p+":");if(g===p||f===p||y===p||m===p||b===p||T&&T===p||C&&C===p||L)return l.closest('[data-role="dropzone"], [class*="category" i], [class*="bucket" i], [class*="column" i], [class*="drop" i]')||I(l)}if(p.length>=3)for(let l of d){if(!E(l)||M(l)||l.closest("header, nav, .stepper, .step-item, .progress-bar-container")||H(l)||!!(l.matches('article, section, form, main, [class*="container" i], [class*="grid" i], .dnd-pool, .dnd-zones')||l.querySelector('label, [role="radio"], [role="checkbox"], .dnd-card, [draggable="true"], .option-card, tr'))&&!l.matches(".dnd-zone, [data-category], [data-dropzone]"))continue;let g=v(l.textContent).toLowerCase(),f=v(l.getAttribute("aria-label")||"").toLowerCase(),y=v(l.getAttribute("placeholder")||"").toLowerCase(),m=v(l.getAttribute("title")||"").toLowerCase(),b=v(l.getAttribute("name")||"").toLowerCase();if(g.includes(p)||f.includes(p)||y.includes(p)||m.includes(p)||b.includes(p)){if(Array.from(l.children).some(L=>{let S=v(L.textContent).toLowerCase();return S&&S.includes(p)}))continue;return l.closest('[data-role="dropzone"], [class*="category" i], [class*="bucket" i], [class*="column" i], [class*="drop" i]')||I(l)}let T=p.split(/\s+/).filter(Boolean);if(T.length>=3){let x=T.slice(0,Math.min(5,T.length)).join(" ");if(g.includes(x)||f.includes(x)||y.includes(x))return I(l)}}return null}function dt(o,e){for(let t of e)o.dispatchEvent(new Event(t,{bubbles:!0,composed:!0}))}function R(o,e){if(!o)return;let t=o instanceof HTMLInputElement&&["checkbox","radio"].includes(o.type)?o:o.querySelector('input[type="checkbox"], input[type="radio"]')||(o.hasAttribute("for")?o.ownerDocument.getElementById(o.getAttribute("for")):null);if(t&&o!==t){if(t.type==="checkbox"){N(t,!0);return}if(t.type==="radio"){N(t,!0);return}}try{o.scrollIntoView({block:"center",inline:"center",behavior:"instant"})}catch{}try{o.focus?.()}catch{}if(o instanceof HTMLButtonElement||o instanceof HTMLAnchorElement||o instanceof HTMLInputElement&&!["checkbox","radio"].includes(o.type)){try{o.click()}catch{}return}let n=o.getBoundingClientRect(),a=e?e[0]:Math.round(n.left+Math.max(1,n.width/2)),s=e?e[1]:Math.round(n.top+Math.max(1,n.height/2)),r={bubbles:!0,cancelable:!0,composed:!0,view:window,clientX:a,clientY:s};try{o.dispatchEvent(new PointerEvent("pointerdown",{...r,button:0,buttons:1}))}catch{}try{o.dispatchEvent(new MouseEvent("mousedown",{...r,button:0,buttons:1}))}catch{}try{o.dispatchEvent(new PointerEvent("pointerup",{...r,button:0,buttons:0}))}catch{}try{o.dispatchEvent(new MouseEvent("mouseup",{...r,button:0,buttons:0}))}catch{}try{o.dispatchEvent(new MouseEvent("click",{...r,button:0,buttons:0}))}catch{}try{o.click()}catch{}}function he(o,e){let t=o;if(t.hasAttribute("for")){let r=t.getAttribute("for"),c=t.ownerDocument.getElementById(r);c&&(t=c)}if(!(t instanceof HTMLInputElement)&&!(t instanceof HTMLTextAreaElement)&&!(t instanceof HTMLSelectElement)&&!t.isContentEditable){let r=t.querySelector('input:not([type="hidden"]), textarea, select, [contenteditable="true"]');if(r)t=r;else{let u=t.closest('.form-group, .field, [class*="input" i], [class*="control" i], label, tr, td, li, p, div')?.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, select, [contenteditable="true"]');if(u)t=u;else{let p=t.nextElementSibling;for(;p;){if(p instanceof HTMLInputElement&&!["hidden","button","submit","checkbox","radio"].includes(p.type)||p instanceof HTMLTextAreaElement||p instanceof HTMLElement&&p.isContentEditable){t=p;break}let d=p.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(d){t=d;break}p=p.nextElementSibling}}}}if(t instanceof HTMLButtonElement||t.tagName.toLowerCase()==="a"||t.getAttribute("role")==="button"||t instanceof HTMLInputElement&&["button","submit","reset","image"].includes(t.type)){let r=t.parentElement?.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(r)t=r;else{let c=document.body;try{c=P()||document.body}catch{}let u=c.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(u)t=u;else{console.warn("[EasyQuiz] setNativeValue: Nenhum campo de texto encontrado para receber o valor.");return}}}if(!(t instanceof HTMLInputElement)&&!(t instanceof HTMLTextAreaElement)&&!(t instanceof HTMLSelectElement)&&!t.isContentEditable){let r=document.body;try{r=P()||document.body}catch{}let c=r.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(c)t=c;else{console.warn("[EasyQuiz] setNativeValue: Nenhum campo de texto encontrado para receber o valor.");return}}if(t instanceof HTMLSelectElement){Re(t,[e]);return}if(t instanceof HTMLInputElement&&["checkbox","radio"].includes(t.type)){let r=["true","1","checked","yes","sim"].includes(e.toLowerCase())||e===t.value;N(t,r);return}let n=String(e??""),a=n;if(t instanceof HTMLInputElement&&t.type==="number"){let r=n.replace(",",".").replace(/[^0-9.-]/g,"");r&&!isNaN(Number(r))&&(a=r)}try{t.scrollIntoView?.({block:"center",inline:"center",behavior:"instant"}),t.focus?.()}catch{}let s=!1;try{if(t instanceof HTMLInputElement||t instanceof HTMLTextAreaElement){if(t.type!=="number"){try{t.select?.()}catch{}s=document.execCommand?.("insertText",!1,a)||!1}}else if(t.isContentEditable){try{document.execCommand?.("selectAll",!1,void 0)}catch{}s=document.execCommand?.("insertText",!1,a)||!1}}catch{}if(t instanceof HTMLInputElement||t instanceof HTMLTextAreaElement){try{let u=t._valueTracker;u&&u.setValue(a===""?" ":"")}catch{}let r=t instanceof HTMLTextAreaElement?HTMLTextAreaElement.prototype:HTMLInputElement.prototype,c=Object.getOwnPropertyDescriptor(r,"value")?.set;c?c.call(t,a):t.value=a;try{t.dispatchEvent(new KeyboardEvent("keydown",{bubbles:!0,cancelable:!0,key:a.slice(-1)||"a"}))}catch{}try{t.dispatchEvent(new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,composed:!0,data:a,inputType:"insertText"}))}catch{}try{t.dispatchEvent(new InputEvent("input",{bubbles:!0,cancelable:!0,composed:!0,data:a,inputType:"insertText"}))}catch{t.dispatchEvent(new Event("input",{bubbles:!0,cancelable:!0,composed:!0}))}try{t.dispatchEvent(new KeyboardEvent("keyup",{bubbles:!0,cancelable:!0,key:a.slice(-1)||"a"}))}catch{}try{t.dispatchEvent(new Event("change",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}try{t.dispatchEvent(new FocusEvent("blur",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}if(t.value!==a&&!(t instanceof HTMLInputElement&&t.type==="number"&&Number(t.value)===Number(a))){t.value=a;try{c?.call(t,a)}catch{}}return}if(t.isContentEditable){if(t.textContent?.trim()!==a.trim()){t.textContent=a;try{t.innerText=a}catch{}}try{t.dispatchEvent(new InputEvent("input",{bubbles:!0,cancelable:!0,composed:!0,data:a,inputType:"insertText"}))}catch{t.dispatchEvent(new Event("input",{bubbles:!0,cancelable:!0,composed:!0}))}try{t.dispatchEvent(new Event("change",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}try{t.dispatchEvent(new FocusEvent("blur",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}return}try{"value"in t&&(t.value=a),t.dispatchEvent(new Event("input",{bubbles:!0,cancelable:!0,composed:!0})),t.dispatchEvent(new Event("change",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}}function Pe(o,e=""){if(o==null)return e;let t=typeof o=="string"?o:String(o);if(!t)return e;let i=/^(eq-|#|\$|\.|input_|mat-|choice_|radio_|chk_)/i.test(t),n=v(t),a=q(t)||q(n);if(!a)return i?e:n||e;let s=a.closest('label, .option-card, [class*="choice" i], [class*="option" i], .quiz-option, tr, td, li');if(s){let d=v(s.textContent);if(d&&d.length>0&&d.length<150)return d}if(a.id){let d=document.querySelector(`label[for="${k(a.id)}"]`);if(d){let l=v(d.textContent);if(l&&l.length>0&&l.length<150)return l}}let r=a.getAttribute("aria-label");if(r)return v(r);let c=a.getAttribute("placeholder");if(c)return v(c);let u=v(a.textContent);if(u&&u.length>0&&u.length<120)return u;let p=a instanceof HTMLInputElement||a instanceof HTMLButtonElement?a.value:"";return p?v(p):i?e:n||e}function N(o,e){let t=o.closest('.option-card, label, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, [class*="option" i], [class*="choice" i], li')||o,i=o instanceof HTMLInputElement&&["checkbox","radio"].includes(o.type)?o:t.querySelector('input[type="checkbox"], input[type="radio"]');if(!i&&t.hasAttribute("for")&&(i=t.ownerDocument.getElementById(t.getAttribute("for"))),t){let n=e?"true":"false";t.setAttribute("aria-checked",n),t.setAttribute("aria-selected",n),t.classList.toggle("selected",e),t.classList.toggle("active",e),t.classList.toggle("checked",e)}if(i){if(i.checked===e)return;try{i.focus?.(),i.click()}catch{}if(i.checked!==e){try{let n=i._valueTracker;n&&n.setValue(!e)}catch{}try{Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"checked")?.set?.call(i,e)}catch{}i.checked=e,dt(i,["input","change"])}}else{try{t.focus?.()}catch{}try{t.click()}catch{R(t)}}}function Re(o,e){let t=o instanceof HTMLSelectElement?o:o.querySelector("select");if(t){let n=e.map(s=>v(s).toLowerCase()),a=!1;for(let s=0;s<t.options.length;s++){let r=t.options[s],c=r.value.toLowerCase(),u=v(r.textContent).toLowerCase();if(n.some(d=>d===c||d===u)){if(r.selected=!0,t.selectedIndex=s,a=!0,!t.multiple)break}else t.multiple||(r.selected=!1)}if(!a)for(let s=0;s<t.options.length;s++){let r=t.options[s],c=r.value.toLowerCase(),u=v(r.textContent).toLowerCase();if(n.some(d=>c.includes(d)||u.includes(d)||d.length>3&&(d.includes(c)||d.includes(u)))&&(r.selected=!0,t.selectedIndex=s,a=!0,!t.multiple))break}if(a){dt(t,["input","change","blur"]);return}}let i=o.closest('[role="combobox"], [class*="select" i], [class*="dropdown" i]');if(i){R(i);for(let n of e){let a=q(n);if(a){R(a);return}}}}function kt(o,e){try{let t=new DataTransfer;try{t.setData("text/plain",o)}catch{}try{t.setData("text/html",e)}catch{}return t}catch{return null}}function Ie(o){try{o.click()}catch{let e=o.ownerDocument.defaultView||window;o.dispatchEvent(new e.MouseEvent("click",{bubbles:!0,cancelable:!0,composed:!0,view:e}))}}function _(o,e){let t=v(o).toLowerCase();if(!t)return null;let i=e==="source"?'.dnd-card, [draggable="true"]':'[data-dropzone], [data-category], [data-role="dropzone"]',n=Array.from(document.querySelectorAll(i)),a=e==="destination"?n.find(s=>[s.getAttribute("data-category"),s.getAttribute("data-dropzone")].some(r=>r?.trim().toLowerCase()===t)):null;return a&&E(a)&&!M(a)?a:n.find(s=>{if(!E(s)||M(s))return!1;let r=v(`${s.textContent||""} ${s.getAttribute("data-category")||""} ${s.getAttribute("data-dropzone")||""}`).toLowerCase();return r===t||r.includes(t)})||null}async function me(o,e,t=1){try{o.scrollIntoView({block:"center",inline:"center",behavior:"instant"})}catch{}let i=o.getBoundingClientRect(),n=e.getBoundingClientRect(),a=Math.round(i.left+Math.max(1,i.width/2)),s=Math.round(i.top+Math.max(1,i.height/2)),r=Math.round(n.left+Math.max(1,n.width/2)),c=Math.round(n.top+Math.max(1,n.height/2)),u=v(e.textContent).toLowerCase();if(u){let f=Array.from(o.querySelectorAll('button, [role="button"], input[type="radio"], input[type="checkbox"], option, .btn, [class*="tag" i]')).find(y=>{let m=v(y.textContent).toLowerCase(),b=y instanceof HTMLInputElement||y instanceof HTMLOptionElement?v(y.value).toLowerCase():"";return m&&(u.includes(m)||m.includes(u))||b&&(u.includes(b)||b.includes(u))});f&&(R(f),await new Promise(y=>setTimeout(y,120)))}Ie(o),await new Promise(g=>setTimeout(g,140)),Ie(e);let p=e.querySelector('[data-role="dropzone"], [class*="bucket" i], [class*="slot" i], [class*="drop" i], [class*="target" i], [class*="items" i], ul, ol');if(p&&p!==e&&Ie(p),await new Promise(g=>setTimeout(g,100)),!e.contains(o)&&o.matches('.dnd-card, [draggable="true"]')&&e.matches('.dnd-zone, [data-dropzone], [data-role="dropzone"]')&&e.appendChild(o),e.contains(o)&&o.matches('.dnd-card, [draggable="true"]'))return;let d={bubbles:!0,cancelable:!0,composed:!0,view:window,clientX:a,clientY:s,screenX:a,screenY:s,button:0,buttons:1};try{o.dispatchEvent(new PointerEvent("pointerdown",{...d,isPrimary:!0,pointerId:1,pointerType:"mouse",pressure:.5}))}catch{}o.dispatchEvent(new MouseEvent("mousedown",d));let l=4;for(let g=1;g<=l;g++){let f=Math.round(a+(r-a)*(g/l)),y=Math.round(s+(c-s)*(g/l)),m={...d,clientX:f,clientY:y,screenX:f,screenY:y};try{o.dispatchEvent(new PointerEvent("pointermove",{...m,isPrimary:!0,pointerId:1,pointerType:"mouse",pressure:.5}))}catch{}document.dispatchEvent(new MouseEvent("mousemove",m))}let h={bubbles:!0,cancelable:!0,composed:!0,view:window,clientX:r,clientY:c,screenX:r,screenY:c,button:0,buttons:0};try{e.dispatchEvent(new PointerEvent("pointerup",{...h,isPrimary:!0,pointerId:1,pointerType:"mouse",pressure:0}))}catch{}e.dispatchEvent(new MouseEvent("mouseup",h)),e.dispatchEvent(new MouseEvent("click",h));try{let g=kt(A(o.textContent),o.outerHTML),f={...d},y={...h};g&&(f.dataTransfer=g,y.dataTransfer=g);let m=o.ownerDocument.defaultView?.DragEvent;if(!m)throw new Error("DragEvent n\xE3o dispon\xEDvel neste documento");o.dispatchEvent(new m("dragstart",f)),e.dispatchEvent(new m("dragenter",y)),e.dispatchEvent(new m("dragover",y)),e.dispatchEvent(new m("drop",y)),o.dispatchEvent(new m("dragend",f))}catch(g){console.warn("[EasyQuiz] DragEvent ignorado com seguran\xE7a:",g)}try{let g=new Touch({identifier:1,target:o,clientX:a,clientY:s}),f=new Touch({identifier:1,target:e,clientX:r,clientY:c});o.dispatchEvent(new TouchEvent("touchstart",{bubbles:!0,cancelable:!0,touches:[g]})),e.dispatchEvent(new TouchEvent("touchmove",{bubbles:!0,cancelable:!0,touches:[f]})),e.dispatchEvent(new TouchEvent("touchend",{bubbles:!0,cancelable:!0,touches:[]}))}catch{}if(t>=2&&!e.contains(o))try{o.focus?.(),o.dispatchEvent(new KeyboardEvent("keydown",{key:" ",code:"Space",bubbles:!0})),o.dispatchEvent(new KeyboardEvent("keyup",{key:" ",code:"Space",bubbles:!0})),await new Promise(g=>setTimeout(g,80)),e.focus?.(),e.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",bubbles:!0})),e.dispatchEvent(new KeyboardEvent("keyup",{key:"Enter",code:"Enter",bubbles:!0}))}catch{}}var ut={fill:(o,e)=>{let t=q(o);t?he(t,e):console.warn(`$eq.fill: Elemento '${o}' n\xE3o encontrado`)},click:o=>{let e=q(o);e?!!(e.closest('.option-card, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, [class*="option" i], [class*="choice" i]')||e.querySelector('input[type="radio"], input[type="checkbox"]')||e instanceof HTMLInputElement&&["checkbox","radio"].includes(e.type))?N(e,!0):R(e):console.warn(`$eq.click: Elemento '${o}' n\xE3o encontrado`)},check:(o,e)=>{let t=q(o);t?N(t,e):console.warn(`$eq.check: Elemento '${o}' n\xE3o encontrado`)},find:(o,e)=>q(o,e),drag:(o,e)=>{let t=_(o,"source")||q(o),i=_(e,"destination")||q(e);t&&i?me(t,i):console.warn(`$eq.drag: Origem ou destino n\xE3o encontrado ('${o}' -> '${e}')`)},categorize:async(o,e)=>{let t=_(o,"source")||q(o),i=_(e,"destination")||q(e);if(!t||!i){console.warn(`$eq.categorize: Item ou categoria n\xE3o encontrados ('${o}' -> '${e}')`);return}await me(t,i)},execute:(o,e=!1,t=1)=>De(o,e,t)};typeof window<"u"&&(window.$eq=ut);async function Ht(o,e=1,t=oe()){if(Se(o,t),o.t==="js"){let r=String(o.v||"");ot(r);try{new Function("$eq","document","window",r)(ut,document,window)}catch(c){throw console.warn("[EasyQuiz JS Execution]",c),c}return}if(o.t==="drag"){let r=_(o.from,"source")||q(o.from),c=_(o.to,"destination")||q(o.to);!r&&o.from&&(r=q(v(o.from))),!c&&o.to&&(c=q(v(o.to))),r&&c?await me(r,c,e):console.warn(`[EasyQuiz] Drag: alvo n\xE3o encontrado ('${o.from}' -> '${o.to}')`);return}let i=o.id!==void 0&&o.id!==null?String(o.id):"";!i&&o.t==="val"&&(i=o.target??o.name??o.selector??"1");let n=o.v!==void 0?o.v:o.value!==void 0?o.value:o.val!==void 0?o.val:o.text,a=n!=null?String(n).trim():"",s=q(i,a,o.t==="val");if(!s&&i&&(s=q(v(i),a,o.t==="val")),s&&a){if(s instanceof HTMLInputElement&&s.type==="radio"&&s.name){if(v(s.value).toLowerCase()!==v(a).toLowerCase()){let r=document.querySelector(`input[type="radio"][name="${k(s.name)}"][value="${k(a)}" i]`);if(r)s=r;else{let u=Array.from(document.querySelectorAll(`input[type="radio"][name="${k(s.name)}"]`)).find(p=>{let d=p.closest("label, .vf-label, .option-card, tr, td, div");return d&&v(d.textContent).toLowerCase().includes(v(a).toLowerCase())});u&&(s=u)}}}else if(!(s instanceof HTMLInputElement)&&!(s instanceof HTMLSelectElement)&&!(s instanceof HTMLTextAreaElement)){let r=s.querySelector(`input[value="${k(a)}" i], [data-value="${k(a)}" i]`);if(r)s=r;else{let u=Array.from(s.querySelectorAll('input[type="radio"], input[type="checkbox"]')).find(p=>{let d=p.closest("label, .vf-label, .option-card, td, div");return d&&v(d.textContent).toLowerCase().includes(v(a).toLowerCase())});u&&(s=u)}}}if(!s&&o.t==="val"){let r=document.body;try{r=P()||document.body}catch{}let c=Array.from(r.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]')).filter(u=>E(u)&&!M(u));if(c.length===1)s=c[0];else if(c.length>1){let u=v(i).toLowerCase(),p=u.match(/^#?_?([0-9]+)$/);if(p){let d=parseInt(p[1],10);d>=1&&d<=c.length?s=c[d-1]:d>=0&&d<c.length&&(s=c[d])}s||(s=c.find(l=>{let h=(l.getAttribute("placeholder")||"").toLowerCase(),g=(l.name||"").toLowerCase(),f=(l.getAttribute("aria-label")||"").toLowerCase(),y=(l.id||"").toLowerCase(),m=v(Le(l)).toLowerCase(),b=v(l.closest('label, tr, td, .form-group, .field, [class*="row" i], div')?.textContent||"").toLowerCase();return h.includes(u)||g.includes(u)||f.includes(u)||y.includes(u)||m&&m.includes(u)||u.length>=2&&b.includes(u)})||c[0])}}if(!s&&o.t!=="adv"){console.warn(`[EasyQuiz] Alvo '${i}' n\xE3o encontrado para a\xE7\xE3o '${o.t}'. Prosseguindo...`);return}switch(o.t){case"val":if(s){let c=s instanceof HTMLInputElement||s instanceof HTMLTextAreaElement||s instanceof HTMLSelectElement||s.isContentEditable?s:s.querySelector('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]');if(!c){let l=s.closest('.form-group, .field, [class*="input" i], [class*="control" i], label, tr, td, li, p, div')?.querySelector('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]');l&&(c=l)}if(!c){let d=s.nextElementSibling;for(;d;){if(d instanceof HTMLInputElement&&!["hidden","button","submit","checkbox","radio"].includes(d.type)||d instanceof HTMLTextAreaElement||d instanceof HTMLElement&&d.isContentEditable){c=d;break}let l=d.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(l){c=l;break}d=d.nextElementSibling}}if(!c){let d=document.body;try{d=P()||document.body}catch{}let l=Array.from(d.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]')).filter(h=>E(h)&&!M(h));l.length>0&&(c=l[0])}let u=o.v!==void 0?o.v:o.value!==void 0?o.value:o.val!==void 0?o.val:o.text,p=u!=null?String(u):"";he(c||s,p)}break;case"chk":s&&N(s,!!o.c);break;case"sel":if(s){let c=Array.isArray(o.v)?o.v:[String(o.v)];Re(s,c)}break;case"clk":if(s)if(!!(s.closest('.option-card, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice')||s.querySelector('input[type="radio"], input[type="checkbox"]')||s instanceof HTMLInputElement&&["checkbox","radio"].includes(s.type))){let u=o.c!==void 0?!!o.c:!0;N(s,u)}else R(s,o.co);break;case"adv":let r=ze(o.id);if(r){await $e(r,1200);let c=o.id||r.textContent?.trim()||"";c&&qe(window.location.hostname,{advanceSelector:c}),R(r)}else console.warn("[EasyQuiz] Bot\xE3o de avan\xE7o n\xE3o localizado.");break}}function It(){let o=["button","a",'[role="button"]','input[type="submit"]','input[type="button"]','[data-testid*="check" i]','[data-test-id*="check" i]'].join(",");return Array.from(document.querySelectorAll(o)).find(t=>{if(!E(t)||M(t)||t.closest("header, nav, aside"))return!1;let i=t instanceof HTMLInputElement||t instanceof HTMLButtonElement?t.value:"",n=(t.textContent||i||t.getAttribute("aria-label")||"").trim();return/(verificar|checar|check|conferir|validar|enviar|responder)/i.test(n)})||null}function ze(o){if(o){let a=q(o);if(a&&E(a)&&!M(a)&&!H(a))return a}try{let a=Z(window.location.hostname);if(a.advanceSelector){let s=q(a.advanceSelector);if(s&&E(s)&&!M(s)&&!H(s))return s}}catch{}let e=["button","a",'[role="button"]','[role="link"]','input[type="button"]','input[type="submit"]','[data-testid*="next" i]','[data-testid*="continue" i]','[data-testid*="check" i]','[data-test-id*="next" i]','[data-test-id*="continue" i]','[data-test-id*="check" i]','[class*="next" i]','[class*="continue" i]','[class*="proximo" i]','[class*="avancar" i]'].join(","),i=Array.from(document.querySelectorAll(e)).filter(a=>E(a)&&!M(a)&&!a.closest("header, nav, aside")&&!H(a));for(let a of i)if(B(a)&&!H(a))return a;for(let a of i){let s=a instanceof HTMLInputElement||a instanceof HTMLButtonElement?a.value:"",r=(a.textContent||s||a.getAttribute("aria-label")||"").trim();if(de.test(r)&&!H(a))return a}let n=document.querySelector('[data-test-id*="next" i], [data-testid*="next" i], [aria-label*="next" i], [aria-label*="pr\xF3xim" i], [aria-label*="avan\xE7ar" i], [aria-label*="continuar" i]');return n&&E(n)&&!M(n)&&!H(n)?n:null}async function $e(o,e=1500){let t=Date.now();for(;Date.now()-t<e;){if(!(o.disabled===!0||o.getAttribute("aria-disabled")==="true"||o.classList.contains("disabled")||o.getAttribute("disabled")!==null))return;await new Promise(n=>setTimeout(n,100))}}function pt(){let o=(document.body?.innerText||document.body?.textContent||"").replace(/\s+/g," ").trim(),e=document.querySelectorAll('input, textarea, select, button, [role="button"], [role="option"]').length;return`${window.location.href}|${document.title}|${o.slice(0,900)}|${e}`}async function zt(o,e=1800){let t=Date.now();for(;Date.now()-t<e;){if(pt()!==o)return{changed:!0,evidence:"URL, texto, t\xEDtulo ou conjunto de controles mudou ap\xF3s a a\xE7\xE3o."};await new Promise(n=>setTimeout(n,100))}return{changed:!1,evidence:"Nenhuma mudan\xE7a observ\xE1vel foi detectada dentro do tempo limite."}}async function ct(o){if(o.t==="js"||o.t==="adv")return;if(o.t==="drag"){let n=q(o.from)||q(v(o.from)),a=q(o.to)||q(v(o.to));n&&a&&await me(n,a,2);return}let e=o.id||"",t=o.v!==void 0?String(o.v).trim():"",i=q(e,t)||q(v(e),t);if(o.t==="clk"||o.t==="chk"){if(!i&&e){let a=Array.from(document.querySelectorAll('input, label, button, [role="radio"], [role="checkbox"], .option-card, [class*="option" i], [class*="choice" i]')),s=v(e).toLowerCase();i=a.find(r=>{let c=v(r.textContent).toLowerCase(),u=v(r.value||"").toLowerCase();return c.includes(s)||u===s||c.startsWith(s+")")||c.startsWith("("+s+")")})||null}let n=o.v!==void 0?String(o.v).trim():"";if(i&&n){if(i instanceof HTMLInputElement&&i.type==="radio"&&i.name){if(v(i.value).toLowerCase()!==v(n).toLowerCase()){let a=document.querySelector(`input[type="radio"][name="${k(i.name)}"][value="${k(n)}" i]`);if(a)i=a;else{let r=Array.from(document.querySelectorAll(`input[type="radio"][name="${k(i.name)}"]`)).find(c=>{let u=c.closest("label, .vf-label, .option-card, tr, td, div");return u&&v(u.textContent).toLowerCase().includes(v(n).toLowerCase())});r&&(i=r)}}}else if(!(i instanceof HTMLInputElement)&&!(i instanceof HTMLSelectElement)&&!(i instanceof HTMLTextAreaElement)){let a=i.querySelector(`input[value="${k(n)}" i], [data-value="${k(n)}" i]`);if(a)i=a;else{let r=Array.from(i.querySelectorAll('input[type="radio"], input[type="checkbox"]')).find(c=>{let u=c.closest("label, .vf-label, .option-card, td, div");return u&&v(u.textContent).toLowerCase().includes(v(n).toLowerCase())});r&&(i=r)}}}if(i){let a=i.closest('.option-card, label, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, li')||i,s=i instanceof HTMLInputElement&&["radio","checkbox"].includes(i.type)?i:a.querySelector('input[type="radio"], input[type="checkbox"]')||(a.getAttribute("for")?a.ownerDocument.getElementById(a.getAttribute("for")):null),r=o.t==="chk"||o.c!==void 0?!!o.c:!0;if(N(s||a,r),s&&s.checked!==r){try{let c=s._valueTracker;c&&c.setValue(!r)}catch{}try{Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"checked")?.set?.call(s,r)}catch{}s.checked=r,s.dispatchEvent(new Event("input",{bubbles:!0,composed:!0})),s.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}}return}if(o.t==="val"){let n=null;if(i&&(n=i instanceof HTMLInputElement||i instanceof HTMLTextAreaElement||i.isContentEditable?i:i.querySelector('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]')),!n){let a=document.body;try{a=P()||document.body}catch{}let s=Array.from(a.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]')),r=v(e).toLowerCase();n=s.find(c=>{let u=(c.getAttribute("placeholder")||"").toLowerCase(),p=(c.name||"").toLowerCase(),d=(c.id||"").toLowerCase(),l=(c.getAttribute("aria-label")||"").toLowerCase();return u.includes(r)||p.includes(r)||d.includes(r)||l.includes(r)})||(s.length>0?s[0]:null)}if(n){let a=String(o.v??"");try{if(n.focus?.(),n.type!=="number"){try{n.select?.()}catch{}document.execCommand?.("insertText",!1,a)}}catch{}he(n,a)}return}if(o.t==="sel"){if(!i&&e){let n=Array.from(document.querySelectorAll("select")),a=v(e).toLowerCase();i=n.find(s=>{let r=(s.name||"").toLowerCase(),c=(s.id||"").toLowerCase(),u=(s.getAttribute("aria-label")||"").toLowerCase();return r.includes(a)||c.includes(a)||u.includes(a)})||null}if(i){let n=Array.isArray(o.v)?o.v:[String(o.v)];Re(i,n)}return}}function Y(o){try{if(o.t==="val"){let e=o.v!==void 0?o.v:o.value!==void 0?o.value:o.val!==void 0?o.val:o.text,t=String(e??"").trim(),i=t,n=o.id!==void 0&&o.id!==null?String(o.id):"";n||(n=o.target??o.name??o.selector??"1");let a=q(n,i,!0)||q(v(n),i,!0);if(!a){let d=document.body;try{d=P()||document.body}catch{}let l=Array.from(d.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]')).filter(h=>E(h)&&!M(h));l.length>0&&(a=l[0])}if(!a)return!1;let s=a instanceof HTMLInputElement&&a.type==="radio"?a:a.querySelector('input[type="radio"]');if(s&&s.name){let d=document.querySelector(`input[type="radio"][name="${k(s.name)}"]:checked`);if(!d)return!1;let l=v(d.value).toLowerCase(),h=v(t).toLowerCase(),g=v(d.closest("label, .vf-label, .option-card, tr, td, div")?.textContent||"").toLowerCase();return l===h||g===h||g.includes(h)}let r=a instanceof HTMLInputElement||a instanceof HTMLTextAreaElement||a.isContentEditable?a:a.querySelector('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(!r){let l=a.closest('.form-group, .field, [class*="input" i], [class*="control" i], label, tr, td, li, p, div')?.querySelector('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]');l&&(r=l)}if(!r){let d=a.nextElementSibling;for(;d;){if(d instanceof HTMLInputElement&&!["hidden","button","submit","checkbox","radio"].includes(d.type)||d instanceof HTMLTextAreaElement||d instanceof HTMLElement&&d.isContentEditable){r=d;break}let l=d.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(l){r=l;break}d=d.nextElementSibling}}let c=(r instanceof HTMLInputElement||r instanceof HTMLTextAreaElement?r.value:r?.textContent??a.textContent??"").trim();if(!c&&!t)return!0;if(!c&&t)return!1;let u=c.replace(",",".").replace(/\s+/g,"").toLowerCase(),p=t.replace(",",".").replace(/\s+/g,"").toLowerCase();return u===p||u.includes(p)||p.includes(u)||c.toLowerCase()===t.toLowerCase()}if(o.t==="sel"){let e=q(o.id)||q(v(o.id));if(!e)return!1;let t=e instanceof HTMLSelectElement?e:e.querySelector("select");if(!t)return!1;let n=(Array.isArray(o.v)?o.v:[String(o.v)]).map(a=>v(a).toLowerCase());return Array.from(t.options).some(a=>{if(!a.selected)return!1;let s=a.value.toLowerCase(),r=v(a.textContent).toLowerCase();return n.some(c=>c===s||c===r||s.includes(c)||r.includes(c))})}if(o.t==="chk"||o.t==="clk"){let e=o.v!==void 0?String(o.v).trim():"",t=q(o.id,e)||q(v(o.id),e);if(!t)return!1;let i=t.closest('.option-card, label, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, li')||t,n=t instanceof HTMLInputElement&&["checkbox","radio"].includes(t.type)?t:i.querySelector('input[type="checkbox"], input[type="radio"]')||(i.getAttribute("for")?i.ownerDocument.getElementById(i.getAttribute("for")):null),a=o.t==="chk"||o.c!==void 0?!!o.c:!0;if(n&&n.type==="radio"&&o.v){let p=v(String(o.v)).toLowerCase();if(n.name){let d=document.querySelector(`input[type="radio"][name="${k(n.name)}"]:checked`);return d?v(d.value).toLowerCase()===p:!1}}if(n&&["checkbox","radio"].includes(n.type))return n.checked===a;let s=i.getAttribute("aria-checked")===String(a)||i.getAttribute("aria-selected")===String(a)||i.getAttribute("aria-pressed")===String(a),r=a?i.getAttribute("data-selected")==="true"||i.getAttribute("data-checked")==="true"||i.getAttribute("data-active")==="true"||i.getAttribute("data-state")==="checked"||i.getAttribute("data-state")==="on":i.getAttribute("data-selected")==="false"||i.getAttribute("data-checked")==="false"||i.getAttribute("data-state")==="unchecked",c=a?/active|selected|checked|picked|correct|is-selected|choice-selected|selected-option|is-checked|chosen|current|highlight|ring|border-primary/i.test(i.className||""):!/active|selected|checked|picked|correct|is-selected|choice-selected|selected-option|is-checked|chosen|current|highlight|ring|border-primary/i.test(i.className||"");return!!(s||r||c||(i instanceof HTMLButtonElement||i.getAttribute("role")==="button")&&o.t==="clk"||o.t==="clk"&&!n)}if(o.t==="drag"){let e=q(o.from)||q(v(o.from)),t=q(o.to)||q(v(o.to));return!e||!t?!1:t.contains(e)?!0:/placed|dropped|assigned|matched|done|selected/i.test(e.className||"")||e.getAttribute("data-placed")==="true"}}catch{}return!1}async function De(o,e,t=1,i=oe({engine:"smart",autoAdvance:e})){let n=o.actions.filter(m=>m.t!=="adv"),a=o.actions.filter(m=>m.t==="adv"),s=0,r=[],c=new Map,u=o.pageType==="question",p=n.filter(m=>m.t==="chk"||m.t==="clk"&&m.c!==void 0);if(u&&p.length>0){let m=document.body;try{m=P()||document.body}catch{}let b=Array.from(m.querySelectorAll('input[type="checkbox"], [role="checkbox"]')).filter(T=>E(T)&&!M(T));if(b.length>1){let T=new Set;for(let x of p){let C=x.t==="chk"?!!x.c:!!(x.c??!0),L="id"in x&&typeof x.id=="string"?x.id:"";if(C&&L){let S=q(L,x.v);if(S){let D=S instanceof HTMLInputElement&&S.type==="checkbox"?S:S.querySelector('input[type="checkbox"]');T.add(D||S)}}}if(T.size>0)for(let x of b)T.has(x)||(x instanceof HTMLInputElement&&x.checked||x.getAttribute("aria-checked")==="true"||x.closest(".option-card, label")?.classList.contains("selected"))&&N(x,!1)}}for(let m of n){try{await Ht(m,t,i),s++}catch(b){c.set(m,b instanceof Error?b.message:String(b)),console.warn("[EasyQuiz] A\xE7\xE3o declarativa prim\xE1ria falhou com seguran\xE7a:",m,b)}await new Promise(b=>setTimeout(b,m.t==="drag"?250:70))}await new Promise(m=>setTimeout(m,n.length>0?300:50));let d=0;for(let m of n){if(Y(m)){d++;continue}console.warn(`[EasyQuiz Auto-Cura] A\xE7\xE3o '${m.t}' no alvo '${m.id||m.from||""}' n\xE3o verificada no DOM. Disparando Passagem 2 de conting\xEAncia...`);try{Se(m,i),await ct(m)}catch(b){c.set(m,b instanceof Error?b.message:String(b)),console.warn("[EasyQuiz Auto-Cura] Rota alternativa falhou:",b)}await new Promise(b=>setTimeout(b,180)),Y(m)&&(console.log("[EasyQuiz Auto-Cura] \u2713 A\xE7\xE3o recuperada com sucesso pela rota de conting\xEAncia!"),d++)}if(d<n.length&&n.length>0){console.warn(`[EasyQuiz Auto-Cura] ${n.length-d} de ${n.length} a\xE7\xE3o(\xF5es) ainda n\xE3o verificadas. Disparando Passagem 3 final...`),await new Promise(m=>setTimeout(m,200));for(let m of n)if(!Y(m))try{await ct(m)}catch(b){c.set(m,b instanceof Error?b.message:String(b))}await new Promise(m=>setTimeout(m,200)),d=0;for(let m of n)Y(m)&&d++}for(let m of n)Y(m)||r.push(m.t==="drag"?`${m.from} -> ${m.to}`:"id"in m?m.id:m.t);let l=n.map((m,b)=>{let T=m.t==="drag"?`${m.from} -> ${m.to}`:m.t==="js"?"$eq":m.id||m.t,x=m.t==="js"?!0:m.t==="drag"?!!(_(m.from,"source")&&_(m.to,"destination")):!!(q(m.id||"")||q(v(m.id||""))),C=Y(m);return{index:b,action:m,target:T,located:x,applied:!c.has(m),verified:C,strategy:m.t==="drag"?"drag-adaptive":m.t==="js"?"javascript":"declarative-dom",evidence:C?"estado do controle confirmado no DOM":"nenhuma evid\xEAncia suficiente ap\xF3s as tentativas",...c.has(m)?{error:c.get(m)}:{}}}),h=!u||n.length===0?!0:s>0&&(s===n.length||d>0),g=!1,f=!1,y="Nenhuma a\xE7\xE3o de navega\xE7\xE3o solicitada.";if(e&&(h||!u)){await new Promise(C=>setTimeout(C,n.length>0?400:150));let m=!1;if(o.pageType!=="info"){let C=It();C&&E(C)&&(await $e(C,1200),R(C),m=!0,await new Promise(L=>setTimeout(L,800)))}let b=pt(),T=a.length>0?a[0].id:void 0,x=ze(T);if(!x&&m&&(await new Promise(C=>setTimeout(C,600)),x=ze(T)),x){await $e(x,1500);let C=T||x.textContent?.trim()||"";C&&qe(window.location.hostname,{advanceSelector:C}),R(x);let L=await zt(b,2500);f=L.changed,y=L.evidence,g=L.changed||m,!L.changed&&!m&&console.warn("[EasyQuiz] O bot\xE3o de avan\xE7o foi acionado, mas a navega\xE7\xE3o ainda n\xE3o concluiu.")}else m?(g=!0,f=!0,y="Resposta confirmada via bot\xE3o de verifica\xE7\xE3o/envio."):console.warn("[EasyQuiz] Nenhum bot\xE3o de avan\xE7o encontrado na p\xE1gina.")}return{applied:s,verified:d,success:h,advanced:g,failed:r,reports:l,navigationVerified:f,navigationEvidence:y}}var ie=null,J=[];function U(){ie&&(ie.style.removeProperty("outline"),ie.style.removeProperty("outline-offset"),ie=null);for(let o of J)o.style.removeProperty("outline"),o.style.removeProperty("outline-offset"),o.style.removeProperty("background-color"),o.style.removeProperty("box-shadow"),o.removeAttribute("data-easyquiz-highlight");J=[]}function Be(o){U(),ie=o,o.style.outline="2px solid #00e5ff",o.style.outlineOffset="4px"}function ht(o){for(let e of o){if(e.t==="adv"||e.t==="js")continue;if(e.t==="drag"){try{let a=q(e.from),s=q(e.to);a&&(a.style.outline="2px solid #00ff88",J.push(a)),s&&(s.style.outline="2px dashed #00e5ff",J.push(s))}catch{}continue}if(!e.id)continue;let t=q(e.id);if(!t)continue;let i=t.closest('label, .option-card, [role="radio"], [role="checkbox"], [role="listitem"], .answer, .quiz-option, .form-check, [class*="option" i], [class*="choice" i], tr, li')||t;i.style.outline="2px solid #00ff88",i.style.outlineOffset="2px",i.style.backgroundColor="rgba(0, 255, 136, 0.12)",i.setAttribute("data-easyquiz-highlight","true"),J.push(i);let n=t instanceof HTMLInputElement&&["checkbox","radio"].includes(t.type)?t:i.querySelector('input[type="checkbox"], input[type="radio"]');n&&n!==i&&(n.style.outline="2px solid #00ff88",n.style.outlineOffset="2px",n.style.boxShadow="0 0 10px rgba(0, 255, 136, 0.8)",n.setAttribute("data-easyquiz-highlight","true"),J.push(n))}}var Ne=10,$t=1400,Oe=15e5;function X(o){return new Promise((e,t)=>{let i=new FileReader;i.onerror=()=>t(new Error("Falha ao converter blob para base64.")),i.onload=()=>{let n=String(i.result||"");e(n.split(",")[1]||"")},i.readAsDataURL(o)})}async function se(o){let e=0,t=0;if(o instanceof HTMLImageElement?(e=o.naturalWidth||o.width,t=o.naturalHeight||o.height):(e=o.width,t=o.height),e<=0||t<=0)throw new Error("Dimens\xF5es inv\xE1lidas.");let i=Math.min(1,$t/Math.max(e,t)),n=Math.max(1,Math.round(e*i)),a=Math.max(1,Math.round(t*i)),s=document.createElement("canvas");s.width=n,s.height=a;let r=s.getContext("2d",{alpha:!1});if(!r)throw new Error("Sem suporte a Canvas 2D.");return r.fillStyle="#ffffff",r.fillRect(0,0,n,a),r.drawImage(o,0,0,n,a),new Promise((c,u)=>{s.toBlob(p=>p?c(p):u(new Error("Falha na compress\xE3o.")),"image/jpeg",.88)})}async function Pt(o){let e=typeof o.getBoundingClientRect=="function"?o.getBoundingClientRect():{width:0,height:0},t=e.width||parseFloat(o.getAttribute("width")||"0")||parseFloat(o.style.width||"0")||400,i=e.height||parseFloat(o.getAttribute("height")||"0")||parseFloat(o.style.height||"0")||300,n=2,a=Math.min(1800,Math.max(120,Math.round(t*n))),s=Math.min(1800,Math.max(100,Math.round(i*n))),r=o.cloneNode(!0);r.getAttribute("xmlns")||r.setAttribute("xmlns","http://www.w3.org/2000/svg"),r.setAttribute("width",String(a)),r.setAttribute("height",String(s)),!r.getAttribute("viewBox")&&t>0&&i>0&&r.setAttribute("viewBox",`0 0 ${t} ${i}`);let u=new XMLSerializer().serializeToString(r),p=new Blob([u],{type:"image/svg+xml;charset=utf-8"}),d=URL.createObjectURL(p);try{let l=new Image;l.crossOrigin="anonymous",await new Promise((f,y)=>{l.onload=()=>f(),l.onerror=()=>y(new Error("Falha ao renderizar SVG em Image.")),l.src=d});let h=document.createElement("canvas");h.width=a,h.height=s;let g=h.getContext("2d",{alpha:!1});if(!g)throw new Error("Sem suporte a Canvas 2D.");return g.fillStyle="#ffffff",g.fillRect(0,0,a,s),g.drawImage(l,0,0,a,s),new Promise((f,y)=>{h.toBlob(m=>m?f(m):y(new Error("Falha na compress\xE3o do SVG.")),"image/jpeg",.92)})}finally{URL.revokeObjectURL(d)}}async function Ve(o){try{let e=o.cloneNode(!0),t=o.offsetWidth||500,i=o.offsetHeight||500,n=`
      <svg xmlns="http://www.w3.org/2000/svg" width="${t}" height="${i}">
        <foreignObject width="100%" height="100%">
          <div xmlns="http://www.w3.org/1999/xhtml" style="background:#fff;font-family:sans-serif;">
            ${e.innerHTML}
          </div>
        </foreignObject>
      </svg>
    `,a=new Blob([n],{type:"image/svg+xml;charset=utf-8"}),s=URL.createObjectURL(a),r=new Image;r.crossOrigin="anonymous",await new Promise((p,d)=>{r.onload=()=>p(),r.onerror=()=>d(new Error("Falha ao renderizar ForeignObject.")),r.src=s});let c=await se(r),u=await X(c);if(URL.revokeObjectURL(s),u&&u.length<=Oe)return{mediaType:"image/jpeg",base64:u,alt:"Captura via rasteriza\xE7\xE3o DOM",source:"rasterized"}}catch(e){console.warn("Falha na rasteriza\xE7\xE3o do n\xF3:",e)}return null}function Rt(o,e){let t=o.closest('[data-easyquiz-id], button, [role="button"], [role="radio"], [role="checkbox"], [role="option"], label, .option-card, .quiz-option, .choice, .answer, [class*="option" i], [class*="choice" i], [class*="answer" i], li, tr');if(t&&t!==e&&E(t)&&!B(t)&&!H(t)){let a=t.dataset.easyquizId||t.id||void 0,s=A(t.innerText||t.textContent||"",120),r=t.getAttribute("aria-label")||t.getAttribute("title")||"",c=s||r,u=a?` [id: ${a}]`:"";if(c)return{associatedLabel:`Alternativa/Op\xE7\xE3o: "${c}"${u}`,targetControlId:a};if(a)return{associatedLabel:`Alternativa/Op\xE7\xE3o ${u}`,targetControlId:a}}let i=o.closest("figure")?.querySelector("figcaption")?.textContent?.trim();if(i)return{associatedLabel:`Figura do Enunciado: "${A(i,100)}"`};let n=o.closest('[class*="prompt" i], [class*="stimulus" i], [class*="question-text" i], [class*="statement" i], header, h1, h2, h3, h4, p');if(n){let a=A(n.textContent||"",80);if(a)return{associatedLabel:`Gr\xE1fico do Enunciado: "${a}"`}}return{associatedLabel:"Gr\xE1fico/Imagem do Enunciado Principal"}}async function Dt(o){let e=o.currentSrc||o.src;if(!e)return null;let t=(o.alt||o.getAttribute("aria-label")||"Imagem da quest\xE3o").slice(0,500);if(o.complete&&o.naturalWidth>0)try{let i=await se(o),n=await X(i);if(n&&n.length<=Oe)return{mediaType:"image/jpeg",base64:n,alt:t,source:e.slice(0,2e3)}}catch{}try{let i=await fetch(e,{mode:"cors"});if(i.ok){let n=await i.blob();if(n.type.startsWith("image/")){let a=await createImageBitmap(n),s=await se(a);a.close();let r=await X(s);if(r&&r.length<=Oe)return{mediaType:"image/jpeg",base64:r,alt:t,source:e.slice(0,2e3)}}}}catch{return Ve(o.parentElement||o)}return null}function Bt(o){return o.querySelectorAll("path, line, polyline, polygon, circle, rect, text, image").length>0}function Nt(o){try{let e=o.style.backgroundImage||(window.getComputedStyle?window.getComputedStyle(o).backgroundImage:"");if(e&&e.includes("url(")){let t=e.match(/url\(["']?([^"')]+)["']?\)/);if(t&&t[1]&&!t[1].startsWith("data:image/svg+xml"))return t[1]}}catch{}return null}async function _e(o,e=!0){if(!e)return[];let t=[],i=0,n=35e5,a=(c,u)=>{if(!c||!c.base64||i+c.base64.length>n)return!1;let p=Rt(u,o);return c.associatedLabel=p.associatedLabel,c.targetControlId=p.targetControlId,t.push(c),i+=c.base64.length,t.length>=Ne},s=Array.from(o.querySelectorAll("img")).filter(c=>E(c)&&!H(c));for(let c of s)try{let u=await Dt(c);if(a(u,c))return t}catch{}let r=Array.from(o.querySelectorAll("svg")).filter(c=>{if(!E(c)||H(c))return!1;let u=typeof c.getBoundingClientRect=="function"?c.getBoundingClientRect():{width:0,height:0},p=u.width||parseFloat(c.getAttribute("width")||"0"),d=u.height||parseFloat(c.getAttribute("height")||"0");return p<30||d<30?!1:Bt(c)});for(let c of r)try{let u=await Pt(c),p=await X(u);if(p){let d={mediaType:"image/jpeg",base64:p,alt:c.getAttribute("aria-label")||"Gr\xE1fico/Diagrama vetorial da quest\xE3o",source:"svg"};if(a(d,c))return t}}catch{let u=await Ve(c.parentElement||c);if(a(u,c))return t}if(t.length<Ne){let c=Array.from(o.querySelectorAll("canvas")).filter(u=>E(u)&&!H(u));for(let u of c)try{let p=await se(u),d=await X(p);if(d){let l={mediaType:"image/jpeg",base64:d,alt:u.getAttribute("aria-label")||"Gr\xE1fico Canvas inline",source:"canvas"};if(a(l,u))return t}}catch{let p=await Ve(u.parentElement||u);if(a(p,u))return t}}if(t.length<Ne){let c=Array.from(o.querySelectorAll('[style*="background-image"], .option-image, .question-media')).filter(u=>E(u)&&!H(u));for(let u of c){let p=Nt(u);if(p)try{let d=await fetch(p,{mode:"cors"});if(d.ok){let l=await d.blob();if(l.type.startsWith("image/")){let h=await createImageBitmap(l),g=await se(h);h.close();let f=await X(g);if(f){let y={mediaType:"image/jpeg",base64:f,alt:"Imagem de fundo da alternativa",source:p.slice(0,2e3)};if(a(y,u))return t}}}}catch{}}}return t}var ge=class{active=!1;timer=null;callbacks;lastRunTime=0;lastActionTime=0;isProcessing=!1;observer=null;mutationTimer=null;abortController=null;constructor(e){this.callbacks=e}isActive(){return this.active}start(){this.active||(this.active=!0,this.lastActionTime=Date.now(),this.callbacks.onStatusChange("waiting","> [SYS] Autopilot ENGAGED. Monitorando..."),typeof MutationObserver<"u"&&(this.observer=new MutationObserver(()=>{!this.active||this.isProcessing||(this.mutationTimer&&clearTimeout(this.mutationTimer),this.mutationTimer=window.setTimeout(()=>{this.mutationTimer=null,this.loop()},180))}),this.observer.observe(document.body,{subtree:!0,childList:!0,attributes:!0,characterData:!0})),this.loop())}stop(){if(this.active=!1,this.abortController){try{this.abortController.abort()}catch{}this.abortController=null}this.timer&&clearTimeout(this.timer),this.mutationTimer&&clearTimeout(this.mutationTimer),this.mutationTimer=null,this.observer?.disconnect(),this.observer=null,this.isProcessing=!1,this.callbacks.onStatusChange("idle","> [SYS] Autopilot DESATIVADO pelo usu\xE1rio.","text-yellow")}sleep(e){return new Promise(t=>{if(!this.active)return t();let i=null,n=()=>{i&&clearTimeout(i),t()};i=window.setTimeout(()=>{t()},e),this.abortController?.signal.addEventListener("abort",n,{once:!0})})}errorCount=0;lastPageSig="";samePageCount=0;async loop(){if(!this.active)return;let e=Date.now();if(e-this.lastRunTime<2500||this.isProcessing){this.timer=window.setTimeout(()=>this.loop(),500);return}this.lastRunTime=e;try{if(this.isProcessing=!0,!this.active)return;let t=ae(!1);if(t||(t=K()),!this.active)return;if(t){let i=rt(t);if(i===this.lastPageSig)this.samePageCount++;else{let s=this.samePageCount>1;this.lastPageSig=i,this.samePageCount=1,s&&(this.callbacks.onStatusChange("waiting","> [SYS] Avan\xE7o de p\xE1gina detectado! Retomando monitoramento autom\xE1tico...","text-green"),this.callbacks.onPageAdvance?.())}if(this.callbacks.isManualModeActive?.()){this.callbacks.onStatusChange("waiting","> [SYS] Gabarito manual ativo na tela. Aguardando voc\xEA posicionar as respostas e avan\xE7ar a p\xE1gina...","text-yellow"),this.lastRunTime=Date.now();return}if(this.samePageCount>1&&(this.callbacks.onStatusChange("waiting",`> [AUTOPILOT] Resolu\xE7\xE3o pendente (${this.samePageCount}\xAA verifica\xE7\xE3o). Conclua e avance para prosseguir...`,"text-yellow"),await this.sleep(4e3),!this.active))return;let n=t.controls.filter(s=>s.role==="answer"),a=Z(window.location.hostname);if(n.length>0){if(this.callbacks.onStatusChange("analyzing","> [IA] Quest\xE3o/Exerc\xEDcio detectado. Consultando IA...","text-blue"),await this.sleep(600),!this.active)return;this.abortController=new AbortController;let s=await this.callbacks.onRequestAnalysis(this.samePageCount,this.abortController.signal);if(this.abortController=null,!this.active)return;if(s){if(this.callbacks.onStatusChange("analyzing",`> [IA] (${s.usedModel||"gemini"}) Confian\xE7a: ${(s.confidence*100).toFixed(1)}% | Modo: ${s.mode}`,"text-blue"),this.callbacks.onStatusChange("analyzing",`> [IA] Racioc\xEDnio: ${s.rationale}`,"text-blue"),this.callbacks.onStatusChange("analyzing",`> [IA] A\xE7\xF5es geradas: ${s.actions.length}`,"text-blue"),this.errorCount=0,s.memoryToStore&&this.callbacks.onStatusChange("analyzing",`> [IA] \u{1F9E0} Mem\xF3ria RAG salva: "${s.memoryToStore}"`,"text-yellow"),s.pageType==="conclusion"){this.callbacks.onStatusChange("idle","> [SYS] Atividade conclu\xEDda! Desligando Autopilot.","text-green"),this.stop();return}}else{this.errorCount++;let r=this.errorCount===1?5e3:8e3;this.callbacks.onStatusChange("waiting",`> [AVISO] Falha na an\xE1lise (${this.errorCount}/3). Aguardando ${r/1e3}s para estabiliza\xE7\xE3o antes de tentar novamente...`,"text-yellow"),await this.sleep(r)}this.lastActionTime=Date.now()}else if(a.advanceSelector&&q(a.advanceSelector)&&t.questionText.length<50){let s=q(a.advanceSelector);if(s){if(this.callbacks.onStatusChange("advancing",`> [BRUTE] Avan\xE7ando via cache "${a.advanceSelector}"...`),await this.sleep(1e3),!this.active)return;R(s),this.lastActionTime=Date.now(),this.errorCount=0}}else{if(this.callbacks.onStatusChange("analyzing","> [IA] P\xE1gina informativa/contexto detectada. Lendo e consultando IA...","text-blue"),await this.sleep(600),!this.active)return;this.abortController=new AbortController;let s=await this.callbacks.onRequestAnalysis(this.samePageCount,this.abortController.signal);if(this.abortController=null,!this.active)return;if(s){if(this.callbacks.onStatusChange("analyzing",`> [IA] (${s.usedModel||"gemini"}) Tipo: ${s.pageType} | Modo: ${s.mode}`,"text-blue"),this.callbacks.onStatusChange("analyzing",`> [IA] Racioc\xEDnio: ${s.rationale}`,"text-blue"),s.memoryToStore&&this.callbacks.onStatusChange("analyzing",`> [IA] \u{1F9E0} Conte\xFAdo absorvido na mem\xF3ria: "${s.memoryToStore}"`,"text-yellow"),s.pageType==="info")this.callbacks.onStatusChange("advancing","> [IA] \u{1F4D6} Leitura conclu\xEDda. Avan\xE7ando automaticamente...","text-green"),await this.sleep(1800);else if(s.pageType==="start")this.callbacks.onStatusChange("advancing","> [SYS] In\xEDcio de m\xF3dulo detectado. Iniciando...","text-blue"),await this.sleep(1800);else if(s.pageType==="conclusion"){this.callbacks.onStatusChange("idle","> [SYS] Atividade conclu\xEDda! Desligando Autopilot.","text-green"),this.stop();return}this.errorCount=0}else{this.errorCount++;let r=this.errorCount===1?5e3:8e3;this.callbacks.onStatusChange("waiting",`> [AVISO] Falha ao processar p\xE1gina (${this.errorCount}/3). Aguardando ${r/1e3}s para estabiliza\xE7\xE3o antes de tentar novamente...`,"text-yellow"),await this.sleep(r)}this.lastActionTime=Date.now()}if(this.errorCount>=3){this.callbacks.onStatusChange("error","> [ERRO] 3 falhas consecutivas. Abortando Autopilot para poupar sua cota e tokens.","text-red"),this.callbacks.onStatusChange("waiting","> [DICA] Verifique a mensagem vermelha de [ERRO DETALHADO] no console acima para saber o motivo exato.","text-yellow"),this.stop();return}}else this.callbacks.onStatusChange("waiting","> [SYS] Monitorando p\xE1gina... Aguardando carregamento dos elementos.")}catch(t){if(!this.active)return;let i=t instanceof Error?t.message:String(t);if(i.includes("cancelada")||i.includes("aborted"))return;console.warn("[EasyQuiz Autopilot]",t),this.callbacks.onStatusChange("error",`> [ERRO NO AUTOPILOT] ${i}`,"text-red")}finally{this.abortController=null,this.isProcessing=!1}this.active&&(this.timer=window.setTimeout(()=>this.loop(),1e3))}};var w={logo:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.8L19.2 8 12 11.2 4.8 8 12 4.8zM4 9.6l7 3.1v7.5l-7-3.5V9.6zm9 10.6v-7.5l7-3.1v7.1l-7 3.5z"/></svg>',rocket:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M13.13 2.81a.5.5 0 0 0-.46-.07c-.42.15-2.08.79-3.9 2.61-2.04 2.04-2.6 4.09-2.73 4.96l-.97.98a1 1 0 0 0-.29.71v2.12a1 1 0 0 0 .29.71l2.83 2.83a1 1 0 0 0 .71.29h2.12a1 1 0 0 0 .71-.29l.98-.97c.87-.13 2.92-.69 4.96-2.73 1.82-1.82 2.46-3.48 2.61-3.9a.5.5 0 0 0-.07-.46l-6.79-6.79zM4.5 16.5l-2.09 2.09a.5.5 0 0 0 .35.85h3.04l.35.35v3.04a.5.5 0 0 0 .85.35L9.09 21.1l-4.59-4.6z"/></svg>',play:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>',stop:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h12v12H6z"/></svg>',code:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>',terminal:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8h16v10zm-12-3l3-3-3-3 1.4-1.4L13.8 12l-4.4 4.4L8 15zm6 0h4v2h-4v-2z"/></svg>',inspector:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>',settings:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.49.49 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>',key:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M7 14c-2.76 0-5-2.24-5-5s2.24-5 5-5c2.42 0 4.44 1.72 4.9 4H22v4h-2v3h-3v-3h-2v3h-3v-3h-2.1c-.46 2.28-2.48 4-4.9 4zm0-7c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>',paste:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 2h-4.18C14.4 .84 13.3 0 12 0c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm7 18H5V4h2v3h10V4h2v16z"/></svg>',edit:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>',trash:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>',eraser:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M15.14 3c-.51 0-1.02.2-1.41.59L2.59 14.73c-.78.78-.78 2.05 0 2.83L6.44 21.4c.78.78 2.05.78 2.83 0l11.14-11.14c.78-.78.78-2.05 0-2.83l-3.86-3.84c-.39-.39-.9-.59-1.41-.59zm.71 2.71l3.15 3.15-3.15 3.15-3.15-3.15 3.15-3.15zm-4.57 4.57l3.15 3.15-4.57 4.57H6.71l-3-3 7.57-7.57z"/></svg>',save:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/></svg>',analyze:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L3 14h8l-2 8 12-12h-8l2-8z"/></svg>',apply:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>',close:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>',chevronRight:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>',chevronLeft:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>',eye:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>',eyeOff:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.44-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.17c0-1.66-1.34-3-3-3l-.17.02z"/></svg>',check:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>',clock:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>',copy:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>',refresh:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg>',chip:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4h12v16H6V4zm2 2v12h8V6H8zm-4 3h2v2H4V9zm0 4h2v2H4v-2zm16-4h2v2h-2V9zm0 4h2v2h-2v-2zM9 2h2v2H9V2zm4 0h2v2h-2V2zm-4 18h2v2H9v-2zm4 0h2v2h-2v-2z"/></svg>',moreVertical:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>',minimize:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M19 13H5v-2h14v2z"/></svg>',maximize:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/></svg>',dragHandle:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M10 9h4V6h-4v3zm0 5h4v-3h-4v3zm0 5h4v-3h-4v3zM4 9h4V6H4v3zm0 5h4v-3H4v3zm0 5h4v-3H4v3zm12-10V6h4v3h-4zm0 5h4v-3h-4v3zm0 5h4v-3h-4v3z"/></svg>',list:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/></svg>',folderTree:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6 10H6v-2h8v2zm4-4H6v-2h12v2z"/></svg>',folder:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/></svg>',file:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>'};var fe=class{element=null;shadow;isMinimized=!1;currentPlan=null;isDragging=!1;dragStartX=0;dragStartY=0;initialLeft=25;initialTop=25;onAdvanceCallback;constructor(e,t){this.shadow=e,this.onAdvanceCallback=t,this.initGlobalListeners()}initGlobalListeners(){window.addEventListener("popstate",()=>this.handlePageNavigated()),window.addEventListener("hashchange",()=>this.handlePageNavigated()),document.addEventListener("click",e=>{if(!this.isOpen())return;let t=e.target;if(!t||this.shadow.contains(t)||t.closest("#easyquiz-shadow-root"))return;let i=t.closest('button, [role="button"], a, input[type="submit"]');if(i){let n=(i.textContent||i.value||"").toLowerCase();/pr[oó]xim|avan[cç]|continu|verific|enviar|submit|confirm|checar|validar|next/i.test(n)&&setTimeout(()=>{this.isOpen()&&this.handlePageNavigated()},800)}},!0)}handlePageNavigated(){this.isOpen()&&(this.hide(),this.onAdvanceCallback?.())}isOpen(){return this.element!==null&&this.element.style.display!=="none"}show(e){this.currentPlan=e,this.element||this.createElement(),this.renderContent(),this.element&&(this.element.style.display="flex")}hide(){this.element&&(this.element.style.display="none")}minimize(){this.isMinimized=!0,this.element&&this.element.classList.add("minimized")}restore(){this.isMinimized=!1,this.element&&this.element.classList.remove("minimized")}createElement(){this.element=document.createElement("div"),this.element.className="eq-floating-hud",this.element.style.left=`${this.initialLeft}px`,this.element.style.top=`${this.initialTop}px`,this.element.innerHTML=`
      <!-- P\xEDlula compacta quando minimizado -->
      <div class="eq-fah-pill" id="eq-fah-pill" title="Clique para expandir gabarito interativo">
        <span class="eq-fah-pill-icon">${w.list}</span>
        <span id="eq-fah-pill-text">Gabarito Manual</span>
        <span class="eq-fah-pill-badge" id="eq-fah-pill-badge">0</span>
      </div>

      <!-- Cabe\xE7alho com barra de arraste -->
      <div class="eq-fah-header" id="eq-fah-header">
        <div class="eq-fah-title">
          <span style="display:flex; align-items:center;">${w.dragHandle}</span>
          <span>Gabarito Manual Interativo</span>
        </div>
        <div class="eq-fah-actions">
          <button class="eq-fah-btn" id="eq-fah-copy-md-btn" title="Copiar tudo formatado em Markdown">${w.copy}</button>
          <button class="eq-fah-btn" id="eq-fah-min-btn" title="Minimizar para p\xEDlula flutuante">${w.minimize}</button>
          <button class="eq-fah-btn" id="eq-fah-close-btn" title="Fechar gabarito">${w.close}</button>
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
    `,this.shadow.appendChild(this.element),this.element.querySelector("#eq-fah-pill").addEventListener("click",()=>this.restore()),this.element.querySelector("#eq-fah-min-btn").addEventListener("click",()=>this.minimize()),this.element.querySelector("#eq-fah-close-btn").addEventListener("click",()=>this.hide());let n=this.element.querySelector("#eq-fah-copy-md-btn");n.addEventListener("click",()=>this.copyMarkdownToClipboard(n));let a=this.element.querySelector("#eq-fah-copy-all-btn");a.addEventListener("click",()=>this.copyMarkdownToClipboard(a));let s=this.element.querySelector("#eq-fah-header");this.setupDraggable(s)}setupDraggable(e){let t=i=>{if(i.target.closest(".eq-fah-btn"))return;i.preventDefault(),this.isDragging=!0,this.dragStartX=i.clientX,this.dragStartY=i.clientY;let n=this.element.getBoundingClientRect();this.initialLeft=n.left,this.initialTop=n.top;let a=r=>{if(!this.isDragging||!this.element)return;let c=r.clientX-this.dragStartX,u=r.clientY-this.dragStartY,p=Math.max(10,window.innerWidth-this.element.offsetWidth-10),d=Math.max(10,window.innerHeight-this.element.offsetHeight-10),l=Math.min(Math.max(10,this.initialLeft+c),p),h=Math.min(Math.max(10,this.initialTop+u),d);this.element.style.left=`${l}px`,this.element.style.top=`${h}px`},s=()=>{this.isDragging=!1,window.removeEventListener("mousemove",a),window.removeEventListener("mouseup",s)};window.addEventListener("mousemove",a),window.addEventListener("mouseup",s)};e.addEventListener("mousedown",t)}renderContent(){if(!this.element||!this.currentPlan)return;let e=this.element.querySelector("#eq-fah-body"),t=this.element.querySelector("#eq-fah-pill-text"),i=this.element.querySelector("#eq-fah-pill-badge");e.innerHTML="";let n=this.currentPlan,a=n.actions.filter(l=>l.t==="drag"),s=n.actions.filter(l=>{if(l.t!=="val")return!1;let h=v(l.id||"").toLowerCase();return!/continu|avan[cç]|pr[oó]xim|submet|enviar|check|verific/i.test(h)}),r=n.actions.filter(l=>l.t==="clk"||l.t==="chk"),c=a.length||s.length||r.length,u=document.createElement("div");u.className="eq-fah-meta";let p=document.createElement("span");p.textContent=`Modo: ${n.mode.replace("_"," ")}`;let d=document.createElement("span");if(d.className="eq-fah-meta-badge",d.textContent=`${Math.round(n.confidence*100)}% Confian\xE7a`,u.append(p,d),e.appendChild(u),a.length>0||n.mode==="categorizacao"||n.mode==="arrastar_soltar"){t.textContent=`Categoriza\xE7\xE3o (${a.length} itens)`,i.textContent=String(a.length);let l={};for(let h of a){let g=v(h.to)||"Geral";l[g]||(l[g]=[]),l[g].push(v(h.from))}for(let[h,g]of Object.entries(l)){let f=document.createElement("div"),y=/fato|true|verdadeiro|sim/i.test(h),m=/opini[aã]o|false|falso|n[aã]o/i.test(h);f.className=`eq-fah-group ${y?"group-fato":m?"group-opiniao":""}`;let b=document.createElement("div");b.className="eq-fah-group-title",b.textContent=`\u{1F4C1} ${h} (${g.length})`,f.appendChild(b);let T=document.createElement("div");T.className="eq-fah-group-items";for(let x of g){let C=document.createElement("div");C.className="eq-fah-item";let L=document.createElement("span");L.className="eq-fah-item-text",L.textContent=x,C.appendChild(L);let S=document.createElement("button");S.className="eq-fah-copy-inline",S.textContent="Copiar",S.addEventListener("click",()=>{navigator.clipboard.writeText(x),S.textContent="\u2713 Copiado",setTimeout(()=>S.textContent="Copiar",1200)}),C.appendChild(S),T.appendChild(C)}f.appendChild(T),e.appendChild(f)}}else if(s.length>0){t.textContent=`Preenchimento (${s.length} campos)`,i.textContent=String(s.length);let l=document.createElement("div");l.className="eq-fah-group";let h=document.createElement("div");h.className="eq-fah-group-title",h.textContent="\u{1F4DD} Respostas para os Campos de Texto:",l.appendChild(h);let g=document.createElement("div");g.className="eq-fah-group-items";for(let f=0;f<s.length;f++){let y=s[f],m=document.createElement("div");m.className="eq-fah-item";let b=Pe(y.id);(!b||/^[#\.\$]|input|mat-|cell|field|q[0-9]|eq-/i.test(b))&&(b=`Campo ${f+1}`);let T=String(y.v??""),x=document.createElement("div");x.className="eq-fah-field-box";let C=document.createElement("div");C.className="eq-fah-field-label",C.textContent=b,x.appendChild(C);let L=document.createElement("div");L.className="eq-fah-field-val",L.textContent=T,x.appendChild(L),m.appendChild(x);let S=document.createElement("button");S.className="eq-fah-copy-inline",S.textContent="Copiar",S.addEventListener("click",()=>{navigator.clipboard.writeText(T),S.textContent="\u2713 Copiado",setTimeout(()=>S.textContent="Copiar",1200)}),m.appendChild(S),g.appendChild(m)}l.appendChild(g),e.appendChild(l)}else if(r.length>0){t.textContent=`Op\xE7\xF5es (${r.length} marcadas)`,i.textContent=String(r.length);let l=document.createElement("div");l.className="eq-fah-group";let h=document.createElement("div");h.className="eq-fah-group-title",h.textContent="\u{1F3AF} Alternativa(s) Correta(s):",l.appendChild(h);let g=document.createElement("div");g.className="eq-fah-group-items";for(let f=0;f<r.length;f++){let y=r[f],m=document.createElement("div");m.className="eq-fah-item";let b=Pe(y.id);(!b||/^(eq-|#|\$|\.|input_|mat-|choice_|radio_|chk_)/i.test(b))&&y.v&&(b=String(y.v)),b=v(b),/^(eq-|#|\$|\.|input_|mat-|choice_|radio_|chk_)/i.test(b)&&(b="");let T="",x=b.match(/^(\([A-Za-z0-9]\)|[A-Za-z0-9][\)\.\:\-])\s*(.*)$/);x?(T=x[1].replace(/[\(\)\.\:\-\s]/g,"").toUpperCase(),b=x[2].trim()||b):r.length>1&&(T=String.fromCharCode(65+f));let C=document.createElement("div");if(C.style.display="flex",C.style.alignItems="center",C.style.gap="8px",C.style.flex="1",T){let D=document.createElement("span");D.className="eq-fah-letter-badge",D.textContent=T,C.appendChild(D)}let L=document.createElement("span");L.className="eq-fah-item-text",L.textContent=b||(T?`Alternativa ${T}`:"Alternativa Selecionada"),C.appendChild(L),m.appendChild(C);let S=document.createElement("button");S.className="eq-fah-copy-inline",S.textContent="Copiar",S.addEventListener("click",()=>{navigator.clipboard.writeText(b||T),S.textContent="\u2713 Copiado",setTimeout(()=>S.textContent="Copiar",1200)}),m.appendChild(S),g.appendChild(m)}l.appendChild(g),e.appendChild(l)}else{t.textContent="Gabarito",i.textContent="0";let l=document.createElement("div");l.style.padding="10px",l.style.color="#888",l.textContent="Nenhuma resposta direta para exibir.",e.appendChild(l)}if(n.rationale){let l=document.createElement("div");l.className="eq-fah-rationale",l.textContent=`\u{1F4A1} Racioc\xEDnio da IA: ${n.rationale}`,e.appendChild(l)}}generateMarkdown(){if(!this.currentPlan)return"";let e=this.currentPlan,t=[];t.push("# Gabarito da Quest\xE3o \u2014 EasyQuiz Pro"),t.push(`- **Modo:** ${e.mode}`),t.push(`- **Confian\xE7a:** ${(e.confidence*100).toFixed(0)}%`),t.push("");let i=e.actions.filter(s=>s.t==="drag"),n=e.actions.filter(s=>s.t==="val"),a=e.actions.filter(s=>s.t==="clk"||s.t==="chk");if(i.length>0){t.push("## \u{1F4C2} Categoriza\xE7\xE3o:");let s={};for(let r of i){let c=v(r.to)||"Geral";s[c]||(s[c]=[]),s[c].push(v(r.from))}for(let[r,c]of Object.entries(s)){t.push(`### Categoria: ${r}`);for(let u of c)t.push(`- ${u}`);t.push("")}}else if(n.length>0){t.push("## \u270F\uFE0F Respostas para Preenchimento:");for(let s of n){let r=v(s.id);t.push(`- **${r||"Campo"}:** \`${s.v}\``)}t.push("")}else if(a.length>0){t.push("## \u2705 Alternativas Corretas:");for(let s of a)t.push(`- [x] ${v(s.id)}`);t.push("")}return e.rationale&&(t.push("---"),t.push(`**\u{1F4A1} Racioc\xEDnio:** ${e.rationale}`)),t.join(`
`)}copyMarkdownToClipboard(e){let t=this.generateMarkdown();t&&navigator.clipboard.writeText(t).then(()=>{let i=e.innerHTML;e.id==="eq-fah-copy-md-btn"?e.innerHTML='<span style="font-size:10px; color:#00ffcc; font-weight:bold;">\u2713</span>':e.innerHTML="\u2713 Copiado!",setTimeout(()=>{e.innerHTML=i},1500)})}};var mt=`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap');

  :host {
    all: initial;
    color-scheme: dark;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    font-size: 13px;
    line-height: 1.5;

    /* Vari\xE1veis do Tema Humanizado (Estilo VS Code Professional) */
    --eq-bg: #1e1e1e;
    --eq-surface: #252526;
    --eq-surface-raised: #2d2d2d;
    --eq-surface-hover: #37373d;
    --eq-border: #3c3c3c;
    --eq-text: #cccccc;
    --eq-text-bright: #ffffff;
    --eq-muted: #858585;
    --eq-accent: #007acc;       /* Azul profissional padr\xE3o */
    --eq-accent-hover: #0098ff;
    --eq-success: #4ec9b0;      /* Verde menta suave */
    --eq-warning: #d7ba7d;      /* Amarelo dourado suave */
    --eq-danger: #f14c4c;       /* Vermelho suave */
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
    border-radius: 6px;
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
    background: rgba(0, 122, 204, 0.15);
    border: 1px solid rgba(0, 122, 204, 0.4);
    color: var(--eq-accent);
    font-size: 10px;
    font-weight: 600;
    padding: 2px 6px;
    border-radius: 4px;
    text-transform: uppercase;
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
    width: 8px;
  }
  .eq-views-wrapper::-webkit-scrollbar-track {
    background: var(--eq-bg);
  }
  .eq-views-wrapper::-webkit-scrollbar-thumb {
    background: var(--eq-surface-raised);
    border-radius: 4px;
  }
  .eq-views-wrapper::-webkit-scrollbar-thumb:hover {
    background: var(--eq-muted);
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
  .eq-section-title {
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: var(--eq-text-bright);
    display: flex;
    align-items: center;
    justify-content: space-between;
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
    border-radius: 6px;
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

  /* Selects & Inputs */
  .eq-select {
    width: 100%;
    height: 34px;
    background: var(--eq-surface);
    border: 1px solid var(--eq-border);
    border-radius: 6px;
    color: var(--eq-text-bright);
    padding: 0 10px;
    font-family: inherit;
    font-size: 13px;
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
    border: 1px solid var(--eq-accent);
    border-radius: 6px;
    color: var(--eq-text-bright);
    font-family: inherit;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: background 0.15s, transform 0.1s;
    user-select: none;
  }

  .eq-btn-primary:hover {
    background: var(--eq-accent-hover);
    transform: translateY(-1px);
  }

  .eq-btn-primary:active {
    transform: translateY(0);
  }

  .eq-btn-primary.danger {
    background: var(--eq-danger);
    border-color: var(--eq-danger);
  }

  .eq-btn-primary.danger:hover {
    background: #d13b3b;
  }

  .eq-btn-primary:disabled {
    background: var(--eq-surface-raised);
    border-color: var(--eq-border);
    color: var(--eq-muted);
    cursor: not-allowed;
    transform: none;
  }

  .eq-btn-secondary {
    height: 34px;
    background: transparent;
    border: 1px solid var(--eq-border);
    border-radius: 6px;
    color: var(--eq-text-bright);
    font-family: inherit;
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: all 0.15s;
  }

  .eq-btn-secondary:hover {
    background: var(--eq-surface-hover);
    border-color: var(--eq-muted);
  }

  .eq-btn-secondary:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* ===== TERMINAL CONSOLE ESTILO VS CODE ===== */
  .eq-terminal {
    width: 100%;
    background: var(--eq-bg);
    border: 1px solid var(--eq-border);
    border-radius: 6px;
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
  .eq-operation-state { flex: none; padding: 4px 8px; border: 1px solid var(--eq-border); border-radius: 4px; color: var(--eq-muted); font: 600 11px/1 inherit; text-transform: uppercase; }
  .eq-operation-state.is-success { color: var(--eq-success); border-color: rgba(78, 201, 176, 0.4); }
  .eq-operation-state.is-error { color: var(--eq-danger); border-color: rgba(241, 76, 76, 0.4); }
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
\`rflow-wrap: anywhere; }
`;var Ot=[{value:"",label:"Detec\xE7\xE3o Autom\xE1tica"},{value:"escolha_unica",label:"M\xFAltipla Escolha (\xDAnica)"},{value:"escolha_multipla",label:"M\xFAltipla Escolha (V\xE1rias)"},{value:"categorizacao",label:"Categoriza\xE7\xE3o / Grupos"},{value:"arrastar_soltar",label:"Arrastar e Soltar (Drag & Drop)"},{value:"ordenacao",label:"Ordena\xE7\xE3o / Sequ\xEAncia"},{value:"verdadeiro_falso",label:"Verdadeiro / Falso"},{value:"texto_livre",label:"Texto Livre / Dissertativa"},{value:"preenchimento",label:"Preenchimento de Lacunas"}],Vt=[{value:"smart",label:"Inteligente (Auto-H\xEDbrido)"},{value:"command",label:"Apenas Comando (Seguro)"},{value:"javascript",label:"Apenas JS Nativo (Avan\xE7ado)"}],be=class{host;shadow;callbacks;autopilot;floatingAnswers;initialSettings;isCollapsed=!1;activeTab="resolver";stopwatchInterval=null;stopwatchStartTime=0;latestPlan=null;latestContext=null;latestPromptText="";liveDebugTerminal;dbgModel;dbgLatency;dbgSplitTokens;dbgTotalTokens;dbgErrorCard;dbgErrorText;dbgPromptLen;dbgPromptView;dbgContextView;dbgRawRespView;dbgCountAll;dbgCountError;dbgCountAi;dbgCountDom;logEntries=[];activeLogFilter="all";autoScrollLogs=!0;lastErrorMsg=null;progressContainer;progressBar;progressLabel;progressVal;contextTreeContainer;launcherBtn;launcherDot;dockToggleBtn;sidebarEl;apToggleBtn;apConsole;executionConsole;dotPulseAp;statusTextAp;stopwatchAp;dotPulseAdv;statusTextAdv;stopwatchAdv;inspModel;inspLatency;inspTokens;inspPrompt;inspRationale;inspActions;copyPromptBtn;apiKeyInput;keyContextMenu;keyMoreBtn;modelSelect;modeSelect;engineSelect;dryRunCheckbox;autoApplyCheckbox;autoAdvanceCheckbox;hostDarkModeCheckbox;useVisionCheckbox;analyzeBtn;applyBtn;resultContainer;constructor(e,t){this.initialSettings=e,this.callbacks=t,this.autopilot=new ge({onStatusChange:(n,a,s)=>{this.logToConsole(a,s),n==="analyzing"?this.setBusy(!0,"Autopilot: IA analisando..."):(n==="advancing"||n==="waiting")&&this.setBusy(!1)},onRequestAnalysis:async(n,a)=>{try{return await this.callbacks.onAnalyze(n,a)||null}catch{return null}},isManualModeActive:()=>this.floatingAnswers?.isOpen()??!1,onPageAdvance:()=>{this.floatingAnswers?.hide()}}),this.host=document.createElement("div"),this.host.id="easyquiz-shadow-root",this.host.style.position="fixed",this.host.style.top="0",this.host.style.left="0",this.host.style.width="100vw",this.host.style.height="100vh",this.host.style.zIndex="2147483647",this.host.style.pointerEvents="none",this.shadow=this.host.attachShadow({mode:"open"}),this.shadow.innerHTML=`
      <style>${mt}</style>

      <!-- Bot\xE3o Flutuante Inferior Renovado (C\xE1psula com Status ao Vivo) -->
      <button class="eq-launcher" type="button" title="Abrir / Recolher EasyQuiz (Alt+Q)">
        <span class="eq-launcher-icon">${w.logo}</span>
        <span>EasyQuiz</span>
        <span class="eq-launcher-dot" id="eq-launcher-dot"></span>
      </button>

      <!-- Sidebar Fixa Lateral Direita Estilo VS Code -->
      <aside class="eq-sidebar" aria-label="EasyQuiz Sidebar">
        <!-- Aba Retr\xE1til na Borda Esquerda -->
        <button class="eq-dock-toggle" id="eq-dock-toggle" type="button" title="Recolher / Expandir Painel (Alt+Q)">
          <span class="eq-dock-toggle-icon">${w.chevronRight}</span>
          <span class="eq-dock-toggle-label">EQ</span>
        </button>
           <!-- Activity Bar Vertical na Esquerda (Estilo VS Code - Apenas \xCDcones) -->
          <nav class="eq-activity-bar" role="tablist" aria-label="Atalhos">
            <div class="eq-activity-top">
              <button class="eq-activity-btn active" id="eq-tab-resolver" role="tab" title="Resolver (Opera\xE7\xF5es Atuais)">
                <span class="eq-activity-indicator"></span>
                <span class="eq-activity-icon">${w.rocket}</span>
              </button>

              <button class="eq-activity-btn" id="eq-tab-brain" role="tab" title="C\xE9rebro da IA (Contexto e Inspe\xE7\xE3o)">
                <span class="eq-activity-indicator"></span>
                <span class="eq-activity-icon">${w.chip}</span>
              </button>

              <button class="eq-activity-btn" id="eq-tab-debug" role="tab" title="Terminal & Debug Output (Logs, Tokens, Prompts, Erros)">
                <span class="eq-activity-indicator"></span>
                <span class="eq-activity-icon">${w.terminal}</span>
              </button>
            </div>

            <div class="eq-activity-bottom">
              <button class="eq-activity-btn" id="eq-tab-settings" role="tab" title="Configura\xE7\xF5es e Ajustes Avan\xE7ados">
                <span class="eq-activity-indicator"></span>
                <span class="eq-activity-icon">${w.settings}</span>
              </button>
            </div>
          </nav>

          <!-- Corpo Principal da Sidebar -->
          <main class="eq-sidebar-body">
            <!-- Cabe\xE7alho VS Code -->
            <header class="eq-header">
              <div class="eq-brand">
                <span class="eq-brand-icon">${w.logo}</span>
                <span class="eq-brand-name">EasyQuiz</span>
                <span class="eq-brand-badge">2.0 SUPREME</span>
              </div>
              <div class="eq-header-tools">
                <button class="eq-icon-btn" id="eq-min-btn" type="button" title="Minimizar (Alt+Q)">${w.chevronRight}</button>
                <button class="eq-icon-btn" id="eq-close-btn" type="button" title="Fechar">${w.close}</button>
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
                  <button class="eq-btn-primary" id="eq-analyze-btn" type="button">${w.analyze} Analisar quest\xE3o</button>
                  <button class="eq-btn-secondary" id="eq-apply-btn" type="button">${w.apply} Aplicar respostas</button>
                </div>

                <div style="display: flex; gap: 8px; width: 100%; align-items: center;">
                  <button class="eq-btn-primary" id="eq-ap-toggle-btn" type="button" style="flex: 1;">
                    ${w.play} INICIAR AUTOPILOT
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
                  <button class="eq-btn-secondary" id="eq-open-hud-btn" type="button">${w.list} Abrir respostas dispon\xEDveis</button>
                </div>

                <!-- Status & Stopwatch Card -->
                <div class="eq-status-card">
                  <div class="eq-status-card-header">
                    <div class="eq-ai-indicator">
                      <span class="eq-dot-pulse" id="eq-dot-ap"></span>
                      <span>Status da IA</span>
                    </div>
                    <div class="eq-stopwatch" id="eq-stopwatch-ap">
                      ${w.clock} <span>0.00s</span>
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
                      ${w.refresh}
                    </button>
                    <button class="eq-icon-btn" id="eq-ap-clear-memory" type="button" title="Limpar Mem\xF3ria Contextual (RAG)" style="width: 28px; height: 28px; color: #ff5555;">
                      ${w.eraser}
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
                      ${w.copy} Copiar
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

              <!-- TAB 3: DEBUG OUTPUT & TERMINAL -->
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
                      ${w.copy}
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
                        ${w.copy}
                      </button>
                      <button class="eq-icon-btn" id="eq-dbg-clear-logs" type="button" title="Limpar Console" style="width: 26px; height: 26px; color: #ff5555;">
                        ${w.eraser}
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
                        ${w.copy} Copiar
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
                      ${w.copy} Copiar JSON
                    </button>
                  </div>
                  <div class="eq-code-block" id="eq-dbg-context-view" style="max-height: 110px;">Aguardando captura de contexto...</div>
                </div>

                <!-- Resposta Bruta da IA -->
                <div class="eq-field-group">
                  <div class="eq-section-title">
                    <span>Resposta Bruta da IA (Raw Output)</span>
                    <button class="eq-btn-secondary" id="eq-dbg-copy-raw-resp" type="button" style="height: 24px; padding: 0 6px; font-size: 10px;">
                      ${w.copy} Copiar Resposta
                    </button>
                  </div>
                  <div class="eq-code-block" id="eq-dbg-raw-resp-view" style="max-height: 110px;">Aguardando retorno da API...</div>
                </div>

                <div class="eq-footer-note" style="margin-top: auto;">Debug Live Output \u2022 Auditoria Completa de Tokens e Payloads</div>
              </div>

              <!-- TAB 4: CONFIGURA\xC7\xD5ES -->
              <div class="eq-view-pane" id="eq-view-settings" style="display: none;">
                <!-- Se\xE7\xE3o da Chave de API com Menu de 3 Pontinhos (\u22EE) -->
                <div class="eq-field-group">
                  <div class="eq-section-title">
                    <span>Chave Gemini (Google AI Studio)</span>
                    <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" style="color: #00ffcc; text-decoration: none; font-size: 11px; font-weight: 700;">
                      Obter Gr\xE1tis \u2197
                    </a>
                  </div>

                  <div class="eq-key-input-container">
                    <div class="eq-input-wrap">
                      <span class="eq-input-prefix-icon">${w.key}</span>
                      <input id="eq-api-key" class="eq-input" type="password" placeholder="Cole sua chave AIzaSy..." autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" />
                      <button class="eq-icon-btn" id="eq-key-save" type="button" title="Salvar Chave">${w.save}</button>
                      <button class="eq-icon-btn" id="eq-key-more-btn" type="button" title="Mais Op\xE7\xF5es da Chave">${w.moreVertical}</button>
                    </div>

                    <!-- Context Menu Suspenso Din\xE2mico -->
                    <div class="eq-context-menu" id="eq-key-context-menu" hidden>
                      <button class="eq-context-item" id="eq-menu-prompt" type="button">
                        <span class="eq-item-icon">${w.edit}</span>
                        <span class="eq-item-text">Inserir via Janela Nativa</span>
                        <span class="eq-item-badge">Bypass</span>
                      </button>
                      <button class="eq-context-item" id="eq-menu-paste" type="button">
                        <span class="eq-item-icon">${w.paste}</span>
                        <span class="eq-item-text">Colar da \xC1rea de Transfer\xEAncia</span>
                      </button>
                      <button class="eq-context-item" id="eq-menu-toggle-vis" type="button">
                        <span class="eq-item-icon" id="eq-menu-vis-icon">${w.eye}</span>
                        <span class="eq-item-text" id="eq-menu-vis-text">Mostrar Chave</span>
                      </button>
                      <button class="eq-context-item" id="eq-menu-clear" type="button">
                        <span class="eq-item-icon">${w.eraser}</span>
                        <span class="eq-item-text">Limpar Campo</span>
                      </button>
                      <div class="eq-context-divider"></div>
                      <button class="eq-context-item" id="eq-menu-test" type="button">
                        <span class="eq-item-icon">${w.key}</span>
                        <span class="eq-item-text">Testar Conex\xE3o no Google</span>
                      </button>
                      <button class="eq-context-item danger" id="eq-menu-reset" type="button">
                        <span class="eq-item-icon">${w.trash}</span>
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
                    ${w.trash} Resetar Todos os Dados e Mem\xF3ria
                  </button>
                </div>

                <div class="eq-footer-note" style="margin-top: auto;">Configura\xE7\xF5es salvas localmente no navegador</div>
              </div>
            </div>
          </main>
        </aside>
    `,this.launcherBtn=this.shadow.querySelector(".eq-launcher"),this.launcherDot=this.shadow.querySelector("#eq-launcher-dot"),this.dockToggleBtn=this.shadow.querySelector("#eq-dock-toggle"),this.sidebarEl=this.shadow.querySelector(".eq-sidebar"),this.apToggleBtn=this.shadow.querySelector("#eq-ap-toggle-btn"),this.apConsole=this.shadow.querySelector("#eq-ap-console"),this.executionConsole=this.shadow.querySelector("#eq-execution-console"),this.progressContainer=this.shadow.querySelector("#eq-progress-container"),this.progressBar=this.shadow.querySelector("#eq-progress-bar"),this.progressLabel=this.shadow.querySelector("#eq-progress-label"),this.progressVal=this.shadow.querySelector("#eq-progress-val"),this.contextTreeContainer=this.shadow.querySelector("#eq-tree-container"),this.dotPulseAp=this.shadow.querySelector("#eq-dot-ap"),this.statusTextAp=this.shadow.querySelector("#eq-status-text-ap"),this.stopwatchAp=this.shadow.querySelector("#eq-stopwatch-ap span"),this.dotPulseAdv=this.dotPulseAp,this.statusTextAdv=this.statusTextAp,this.stopwatchAdv=this.stopwatchAp,this.inspModel=this.shadow.querySelector("#eq-insp-model"),this.inspLatency=this.shadow.querySelector("#eq-insp-latency"),this.inspTokens=this.shadow.querySelector("#eq-insp-tokens"),this.inspPrompt=this.shadow.querySelector("#eq-insp-prompt"),this.inspRationale=this.shadow.querySelector("#eq-insp-rationale"),this.inspActions=this.shadow.querySelector("#eq-insp-actions"),this.copyPromptBtn=this.shadow.querySelector("#eq-copy-prompt-btn"),this.liveDebugTerminal=this.shadow.querySelector("#eq-live-debug-terminal"),this.dbgModel=this.shadow.querySelector("#eq-dbg-model"),this.dbgLatency=this.shadow.querySelector("#eq-dbg-latency"),this.dbgSplitTokens=this.shadow.querySelector("#eq-dbg-split-tokens"),this.dbgTotalTokens=this.shadow.querySelector("#eq-dbg-total-tokens"),this.dbgErrorCard=this.shadow.querySelector("#eq-dbg-error-card"),this.dbgErrorText=this.shadow.querySelector("#eq-dbg-error-text"),this.dbgPromptLen=this.shadow.querySelector("#eq-dbg-prompt-len"),this.dbgPromptView=this.shadow.querySelector("#eq-dbg-prompt-view"),this.dbgContextView=this.shadow.querySelector("#eq-dbg-context-view"),this.dbgRawRespView=this.shadow.querySelector("#eq-dbg-raw-resp-view"),this.dbgCountAll=this.shadow.querySelector("#eq-dbg-count-all"),this.dbgCountError=this.shadow.querySelector("#eq-dbg-count-error"),this.dbgCountAi=this.shadow.querySelector("#eq-dbg-count-ai"),this.dbgCountDom=this.shadow.querySelector("#eq-dbg-count-dom"),this.apiKeyInput=this.shadow.querySelector("#eq-api-key"),this.keyContextMenu=this.shadow.querySelector("#eq-key-context-menu"),this.keyMoreBtn=this.shadow.querySelector("#eq-key-more-btn"),this.modelSelect=this.shadow.querySelector("#eq-model-select"),this.modeSelect=this.shadow.querySelector("#eq-mode-select"),this.engineSelect=this.shadow.querySelector("#eq-engine-select"),this.dryRunCheckbox=this.shadow.querySelector("#eq-dry-run"),this.autoApplyCheckbox=this.shadow.querySelector("#eq-auto-apply"),this.autoAdvanceCheckbox=this.shadow.querySelector("#eq-auto-advance"),this.hostDarkModeCheckbox=this.shadow.querySelector("#eq-host-dark"),this.useVisionCheckbox=this.shadow.querySelector("#eq-use-vision"),this.analyzeBtn=this.shadow.querySelector("#eq-analyze-btn"),this.applyBtn=this.shadow.querySelector("#eq-apply-btn"),this.resultContainer=this.shadow.querySelector("#eq-result"),this.floatingAnswers=new fe(this.shadow,()=>{this.callbacks.onAnalyze(1)});let i=this.shadow.querySelector("#eq-open-hud-btn");i&&i.addEventListener("click",()=>{this.latestPlan&&this.floatingAnswers.show(this.latestPlan)}),F.forEach(n=>this.modelSelect.add(new Option(n.name,n.id,!1,n.id===e.model))),Ot.forEach(n=>this.modeSelect.add(new Option(n.label,n.value,!1,n.value===e.modeHint))),Vt.forEach(n=>this.engineSelect.add(new Option(n.label,n.value,!1,n.value===e.engine))),this.apiKeyInput.value=e.apiKey,this.dryRunCheckbox.checked=e.dryRun,this.autoApplyCheckbox.checked=e.autoApply,this.autoAdvanceCheckbox.checked=e.autoAdvance,this.hostDarkModeCheckbox.checked=e.hostDarkMode,this.useVisionCheckbox.checked=e.useVision,this.setupEventListeners(),document.body.appendChild(this.host),this.applyHostDarkMode(e.hostDarkMode),e.apiKey&&ce(e.apiKey).then(n=>{n&&n.length>0&&this.updateModelSelect(n,e.model)}).catch(()=>{})}switchTab(e){this.activeTab=e;let t=["resolver","brain","debug","settings"];for(let i of t){let n=this.shadow.querySelector(`#eq-tab-${i}`),a=this.shadow.querySelector(`#eq-view-${i}`);i===e?(n?.classList.add("active"),a&&(a.style.display="flex")):(n?.classList.remove("active"),a&&(a.style.display="none"))}e==="brain"?(this.renderContextTree(),this.refreshInspectorView()):e==="debug"&&(this.refreshDebugView(),this.renderTerminalEntries())}setupEventListeners(){this.shadow.querySelector("#eq-tab-resolver")?.addEventListener("click",()=>this.switchTab("resolver")),this.shadow.querySelector("#eq-tab-brain")?.addEventListener("click",()=>this.switchTab("brain")),this.shadow.querySelector("#eq-tab-debug")?.addEventListener("click",()=>this.switchTab("debug")),this.shadow.querySelector("#eq-tab-settings")?.addEventListener("click",()=>this.switchTab("settings")),this.shadow.querySelector("#eq-dbg-filter-all")?.addEventListener("click",()=>this.setLogFilter("all")),this.shadow.querySelector("#eq-dbg-filter-error")?.addEventListener("click",()=>this.setLogFilter("error")),this.shadow.querySelector("#eq-dbg-filter-ai")?.addEventListener("click",()=>this.setLogFilter("ai")),this.shadow.querySelector("#eq-dbg-filter-dom")?.addEventListener("click",()=>this.setLogFilter("dom"));let e=this.shadow.querySelector("#eq-dbg-scroll-toggle");e?.addEventListener("click",()=>{this.autoScrollLogs=!this.autoScrollLogs,e&&(e.style.color=this.autoScrollLogs?"#00ffcc":"#858585",e.title=this.autoScrollLogs?"Auto-Scroll Ligado (Clique para desligar)":"Auto-Scroll Desligado (Clique para ligar)"),this.autoScrollLogs&&this.liveDebugTerminal&&(this.liveDebugTerminal.scrollTop=this.liveDebugTerminal.scrollHeight)});let t=this.shadow.querySelector("#eq-dbg-copy-logs");t?.addEventListener("click",()=>{let l=this.getFormattedLogs();navigator.clipboard.writeText(l).then(()=>{let h=t.innerHTML;t.innerHTML=w.check,setTimeout(()=>t.innerHTML=h,1800)})}),this.shadow.querySelector("#eq-dbg-clear-logs")?.addEventListener("click",()=>{this.clearLogs()});let i=this.shadow.querySelector("#eq-dbg-copy-prompt");i?.addEventListener("click",()=>{let l=this.latestPromptText||this.latestPlan?.promptSent||"";navigator.clipboard.writeText(l).then(()=>{let h=i.innerHTML;i.innerHTML=`${w.check} Copiado!`,setTimeout(()=>i.innerHTML=h,1800)})});let n=this.shadow.querySelector("#eq-dbg-copy-context");n?.addEventListener("click",()=>{let l=this.dbgContextView?.textContent||"";navigator.clipboard.writeText(l).then(()=>{let h=n.innerHTML;n.innerHTML=`${w.check} Copiado!`,setTimeout(()=>n.innerHTML=h,1800)})});let a=this.shadow.querySelector("#eq-dbg-copy-raw-resp");a?.addEventListener("click",()=>{let l=this.latestPlan?.rawResponse||this.dbgRawRespView?.textContent||"";navigator.clipboard.writeText(l).then(()=>{let h=a.innerHTML;a.innerHTML=`${w.check} Copiado!`,setTimeout(()=>a.innerHTML=h,1800)})});let s=this.shadow.querySelector("#eq-dbg-copy-error-btn");s?.addEventListener("click",()=>{let l=this.lastErrorMsg||"";navigator.clipboard.writeText(l).then(()=>{let h=s.innerHTML;s.innerHTML=w.check,setTimeout(()=>s.innerHTML=h,1800)})}),this.shadow.querySelector("#eq-refresh-context-btn")?.addEventListener("click",()=>{this.renderContextTree()}),this.launcherBtn.addEventListener("click",()=>this.toggle()),this.dockToggleBtn.addEventListener("click",()=>this.toggle()),this.shadow.querySelector("#eq-min-btn")?.addEventListener("click",()=>this.toggle(!1)),this.shadow.querySelector("#eq-close-btn")?.addEventListener("click",()=>this.toggle(!1)),window.addEventListener("keydown",l=>{l.altKey&&(l.key==="q"||l.key==="Q")&&(l.preventDefault(),this.toggle())},!0);let r=l=>{let h=l.composedPath();(h.includes(this.sidebarEl)||h.includes(this.host))&&l.stopImmediatePropagation()};window.addEventListener("keydown",r,!0),window.addEventListener("keyup",r,!0),window.addEventListener("keypress",r,!0),this.apiKeyInput.addEventListener("input",()=>{let l=this.apiKeyInput.value.trim().replace(/^["']|["']$/g,"");this.callbacks.onSettingsChange({apiKey:l})}),this.shadow.querySelector("#eq-key-save").addEventListener("click",()=>{let l=this.apiKeyInput.value.trim().replace(/^["']|["']$/g,"");this.apiKeyInput.value=l,this.callbacks.onSettingsChange({apiKey:l}),this.setStatus("Chave Gemini salva com sucesso!","success"),this.keyContextMenu.hidden=!0}),this.keyMoreBtn.addEventListener("click",l=>{l.stopPropagation(),this.keyContextMenu.hidden=!this.keyContextMenu.hidden}),this.shadow.addEventListener("click",l=>{let h=l.target;!h.closest("#eq-key-context-menu")&&!h.closest("#eq-key-more-btn")&&(this.keyContextMenu.hidden=!0)}),this.shadow.querySelector("#eq-menu-prompt")?.addEventListener("click",()=>{this.keyContextMenu.hidden=!0;let l=this.apiKeyInput.value.trim(),h=window.prompt("Cole sua Chave API do Google Gemini (AI Studio):",l);if(h!==null){let g=h.trim().replace(/^["']|["']$/g,"");this.apiKeyInput.value=g,this.callbacks.onSettingsChange({apiKey:g}),this.setStatus("Chave Gemini inserida e salva com sucesso!","success")}}),this.shadow.querySelector("#eq-menu-paste")?.addEventListener("click",async()=>{this.keyContextMenu.hidden=!0;try{let l=await navigator.clipboard.readText();if(l){let h=l.trim().replace(/^["']|["']$/g,"");this.apiKeyInput.value=h,this.callbacks.onSettingsChange({apiKey:h}),this.setStatus("Chave colada e salva com sucesso!","success")}}catch{let l=this.apiKeyInput.value.trim(),h=window.prompt("Cole sua Chave API do Google Gemini (AI Studio):",l);if(h!==null){let g=h.trim().replace(/^["']|["']$/g,"");this.apiKeyInput.value=g,this.callbacks.onSettingsChange({apiKey:g}),this.setStatus("Chave Gemini inserida e salva com sucesso!","success")}}}),this.shadow.querySelector("#eq-menu-toggle-vis")?.addEventListener("click",()=>{this.keyContextMenu.hidden=!0;let l=this.apiKeyInput.type==="password";this.apiKeyInput.type=l?"text":"password";let h=this.shadow.querySelector("#eq-menu-vis-icon"),g=this.shadow.querySelector("#eq-menu-vis-text");h&&(h.innerHTML=l?w.eyeOff:w.eye),g&&(g.textContent=l?"Ocultar Chave":"Mostrar Chave")}),this.shadow.querySelector("#eq-menu-clear")?.addEventListener("click",()=>{this.keyContextMenu.hidden=!0,this.apiKeyInput.value="",this.callbacks.onSettingsChange({apiKey:""}),this.setStatus("Campo limpo. Cole a nova chave e clique em Salvar.","info"),this.apiKeyInput.focus()}),this.shadow.querySelector("#eq-menu-test")?.addEventListener("click",async()=>{this.keyContextMenu.hidden=!0;let l=this.apiKeyInput.value.trim().replace(/^["']|["']$/g,"");if(!l)return this.setStatus("Insira ou cole a chave de API.","error");this.setStatus("Testando chave e descobrindo modelos autorizados...","info");try{let h=await tt(l);this.setStatus(h.message,h.ok?"success":"error"),h.ok&&h.models&&h.models.length>0&&this.updateModelSelect(h.models)}catch(h){this.setStatus("Erro ao validar chave: "+h.message,"error")}});let u=()=>{this.keyContextMenu.hidden=!0,window.confirm("Deseja realmente resetar todos os dados, chaves e mem\xF3ria de sess\xE3o do EasyQuiz?")&&(Qe(),this.apiKeyInput.value="",this.callbacks.onSettingsChange({apiKey:""}),this.setStatus("Todos os dados do EasyQuiz foram limpos.","info"),this.logToConsole("> [SYS] Armazenamento local resetado.","text-yellow"))};this.shadow.querySelector("#eq-menu-reset")?.addEventListener("click",u),this.shadow.querySelector("#eq-reset-all-btn")?.addEventListener("click",u),this.apToggleBtn.addEventListener("click",()=>{if(this.autopilot.isActive())this.autopilot.stop(),this.callbacks.onCancel?.(),this.setBusy(!1),this.setProgress(0),this.apToggleBtn.innerHTML=`${w.play} INICIAR AUTOPILOT`,this.apToggleBtn.classList.remove("danger"),this.stopStopwatch(),this.setStatus("Autopilot interrompido imediatamente pelo usu\xE1rio.","info");else{if(!this.apiKeyInput.value.trim().replace(/^["']|["']$/g,"")){this.setStatus("Configure sua chave de API Gemini na aba Configura\xE7\xF5es antes de ligar o Autopilot.","error"),this.switchTab("settings"),this.apiKeyInput.focus();return}this.callbacks.onSettingsChange({autoApply:!0,autoAdvance:!0}),this.autoApplyCheckbox.checked=!0,this.autoAdvanceCheckbox.checked=!0,this.autopilot.start(),this.apToggleBtn.innerHTML=`${w.stop} PARAR AUTOPILOT`,this.apToggleBtn.classList.add("danger"),this.startStopwatch(),this.setStatus("Autopilot ativo. Monitorando exerc\xEDcios...","info")}}),this.shadow.querySelector("#eq-ap-clear-memory").addEventListener("click",()=>{Ee(),this.logToConsole("> [SYS] Mem\xF3ria contextual limpa com sucesso.","text-green"),this.setStatus("Mem\xF3ria contextual da sess\xE3o limpa.","success")});let d=this.shadow.querySelector("#eq-copy-console-btn");d?.addEventListener("click",()=>{let l=this.apConsole?.innerText||"";navigator.clipboard.writeText(l).then(()=>{let h=d.innerHTML;d.innerHTML=w.check,setTimeout(()=>d.innerHTML=h,1800)})}),this.copyPromptBtn.addEventListener("click",()=>{let l=this.inspPrompt.textContent||"";navigator.clipboard.writeText(l).then(()=>{let h=this.copyPromptBtn.innerHTML;this.copyPromptBtn.innerHTML=`${w.check} Copiado!`,setTimeout(()=>this.copyPromptBtn.innerHTML=h,2e3)})}),this.modelSelect.addEventListener("change",()=>this.callbacks.onSettingsChange({model:this.modelSelect.value})),this.modeSelect.addEventListener("change",()=>this.callbacks.onSettingsChange({modeHint:this.modeSelect.value})),this.engineSelect.addEventListener("change",()=>this.callbacks.onSettingsChange({engine:this.engineSelect.value})),this.dryRunCheckbox.addEventListener("change",()=>this.callbacks.onSettingsChange({dryRun:this.dryRunCheckbox.checked})),this.autoApplyCheckbox.addEventListener("change",()=>this.callbacks.onSettingsChange({autoApply:this.autoApplyCheckbox.checked})),this.autoAdvanceCheckbox.addEventListener("change",()=>this.callbacks.onSettingsChange({autoAdvance:this.autoAdvanceCheckbox.checked})),this.useVisionCheckbox.addEventListener("change",()=>{let l=this.useVisionCheckbox.checked;this.callbacks.onSettingsChange({useVision:l}),this.setStatus(l?"Vis\xE3o Computacional ativada (capturas habilitadas).":"Modo DOM R\xE1pido ativado (capturas desabilitadas).","info")}),this.hostDarkModeCheckbox.addEventListener("change",()=>{let l=this.hostDarkModeCheckbox.checked;this.callbacks.onSettingsChange({hostDarkMode:l}),this.applyHostDarkMode(l)}),this.analyzeBtn.addEventListener("click",async()=>{await this.callbacks.onAnalyze()&&!this.dryRunCheckbox.checked&&!this.autoApplyCheckbox.checked&&this.callbacks.onApply()}),this.applyBtn.addEventListener("click",()=>this.callbacks.onApply())}startStopwatch(){this.stopStopwatch(),this.stopwatchStartTime=Date.now();let e=()=>{let t=((Date.now()-this.stopwatchStartTime)/1e3).toFixed(2)+"s";this.stopwatchAp.textContent=t,this.stopwatchAdv.textContent=t};e(),this.stopwatchInterval=setInterval(e,100)}stopStopwatch(e){if(this.stopwatchInterval&&(clearInterval(this.stopwatchInterval),this.stopwatchInterval=null),e!==void 0){let t=(e/1e3).toFixed(2)+"s";this.stopwatchAp.textContent=t,this.stopwatchAdv.textContent=t}}setLogFilter(e){this.activeLogFilter=e;let t=["all","error","ai","dom"];for(let i of t){let n=this.shadow.querySelector(`#eq-dbg-filter-${i}`);i===e?n?.classList.add("active"):n?.classList.remove("active")}this.renderTerminalEntries()}updateLogCounters(){let e=0,t=0,i=0;for(let n of this.logEntries)n.category==="error"?e++:n.category==="ai"?t++:n.category==="dom"&&i++;this.dbgCountAll&&(this.dbgCountAll.textContent=String(this.logEntries.length)),this.dbgCountError&&(this.dbgCountError.textContent=String(e)),this.dbgCountAi&&(this.dbgCountAi.textContent=String(t)),this.dbgCountDom&&(this.dbgCountDom.textContent=String(i))}renderTerminalEntries(){if(!this.liveDebugTerminal)return;this.liveDebugTerminal.replaceChildren();let e=this.activeLogFilter==="all"?this.logEntries:this.logEntries.filter(t=>t.category===this.activeLogFilter);if(e.length===0){let t=document.createElement("div");t.className="text-muted",t.textContent=`Nenhum log encontrado para o filtro "${this.activeLogFilter.toUpperCase()}".`,this.liveDebugTerminal.appendChild(t);return}for(let t of e){let i=document.createElement("div");i.textContent=t.message,t.colorClass&&(i.className=t.colorClass),this.liveDebugTerminal.appendChild(i)}this.autoScrollLogs&&(this.liveDebugTerminal.scrollTop=this.liveDebugTerminal.scrollHeight)}clearLogs(){if(this.logEntries=[],this.updateLogCounters(),this.liveDebugTerminal){this.liveDebugTerminal.replaceChildren();let e=document.createElement("div");e.className="text-blue",e.textContent="> [SYS] Console de logs limpo pelo usu\xE1rio.",this.liveDebugTerminal.appendChild(e)}this.apConsole&&this.apConsole.replaceChildren(),this.executionConsole&&this.executionConsole.replaceChildren()}getFormattedLogs(){return(this.activeLogFilter==="all"?this.logEntries:this.logEntries.filter(t=>t.category===this.activeLogFilter)).map(t=>t.message).join(`
`)}setLastError(e){this.lastErrorMsg=e,this.dbgErrorCard&&this.dbgErrorText&&(this.dbgErrorText.textContent=e,this.dbgErrorCard.style.display="flex")}setErrorDiagnostic(e,t){let i=t?`[${t}] ${e}`:e;this.setLastError(i)}refreshDebugView(){let e=this.latestPlan,t=this.latestContext,i=this.latestPromptText||e?.promptSent||"";if(this.dbgModel&&(this.dbgModel.textContent=e?.usedModel||this.initialSettings.model||"--"),this.dbgLatency&&(this.dbgLatency.textContent=e?.durationMs?`${e.durationMs}ms`:"--"),this.dbgSplitTokens){let n=e?.promptTokens!==void 0?String(e.promptTokens):"--",a=e?.candidatesTokens!==void 0?String(e.candidatesTokens):"--";this.dbgSplitTokens.textContent=`${n} / ${a}`,this.dbgSplitTokens.title=`Prompt: ${n} tokens | Resposta: ${a} tokens`}if(this.dbgTotalTokens){let n=e?.tokensUsed??(e?.promptTokens&&e?.candidatesTokens?e.promptTokens+e.candidatesTokens:void 0);this.dbgTotalTokens.textContent=n!==void 0?`${n}`:"--"}if(this.dbgPromptLen){let n=i.length,a=Math.round(n/4);this.dbgPromptLen.textContent=`${n} chars (~${a} tokens est.)`}if(this.dbgPromptView&&(this.dbgPromptView.textContent=i||"Nenhum prompt enviado at\xE9 o momento."),this.dbgContextView)if(t){let n={scope:`${t.scope.tagName.toLowerCase()}${t.scope.id?"#"+t.scope.id:""}${t.scope.className?"."+t.scope.className.split(" ").join("."):""}`,questionLength:t.questionText.length,questionSnippet:t.questionText.slice(0,150)+(t.questionText.length>150?"...":""),controlsCount:t.controls.length,controls:t.controls.map((a,s)=>({index:s+1,tag:a.tag,type:a.type,name:a.name||void 0,id:a.id||void 0,value:a.value||void 0,label:a.label||void 0,role:a.role}))};this.dbgContextView.textContent=JSON.stringify(n,null,2)}else this.dbgContextView.textContent="Aguardando captura de contexto pelo EasyQuiz...";this.dbgRawRespView&&(e?e.rawResponse?this.dbgRawRespView.textContent=e.rawResponse:this.dbgRawRespView.textContent=JSON.stringify({pageType:e.pageType,mode:e.mode,confidence:e.confidence,rationale:e.rationale,actions:e.actions},null,2):this.dbgRawRespView.textContent="Aguardando retorno da API Gemini..."),this.lastErrorMsg&&this.dbgErrorCard&&this.dbgErrorText&&(this.dbgErrorText.textContent=this.lastErrorMsg,this.dbgErrorCard.style.display="flex")}logToConsole(e,t){let i=new Date,n=`${String(i.getHours()).padStart(2,"0")}:${String(i.getMinutes()).padStart(2,"0")}:${String(i.getSeconds()).padStart(2,"0")}.${String(Math.floor(i.getMilliseconds()/100))}`,a=e;e.startsWith(">")?a=`> [${n}] ${e.slice(1).trim()}`:a=`[${n}] ${e}`;let s="all";t==="text-red"||a.includes("[ERRO]")||a.includes("Falha")||a.includes("Error")?s="error":a.includes("[IA]")||a.includes("[RAG]")||a.includes("Tokens")||a.includes("Gemini")||a.includes("Modelo:")?s="ai":(a.includes("[DOM]")||a.includes("[EXEC]")||a.includes("[VERIF]")||a.includes("[NAV]"))&&(s="dom");let r={id:Date.now()+Math.random(),timestamp:n,message:a,colorClass:t,category:s};for(this.logEntries.push(r);this.logEntries.length>250;)this.logEntries.shift();if(this.updateLogCounters(),s==="error"&&this.setLastError(a),this.liveDebugTerminal&&(this.activeLogFilter==="all"||this.activeLogFilter===s)){let c=document.createElement("div");for(c.textContent=a,t&&(c.className=t),this.liveDebugTerminal.appendChild(c);this.liveDebugTerminal.children.length>250;)this.liveDebugTerminal.removeChild(this.liveDebugTerminal.firstChild);this.autoScrollLogs&&(this.liveDebugTerminal.scrollTop=this.liveDebugTerminal.scrollHeight)}if(this.apConsole){let c=document.createElement("div");for(c.textContent=a,t&&(c.className=t),this.apConsole.appendChild(c),this.apConsole.scrollTop=this.apConsole.scrollHeight;this.apConsole.children.length>150;)this.apConsole.removeChild(this.apConsole.firstChild)}if(this.executionConsole){let c=document.createElement("div");for(c.textContent=a,t&&(c.className=t),this.executionConsole.appendChild(c),this.executionConsole.scrollTop=this.executionConsole.scrollHeight;this.executionConsole.children.length>150;)this.executionConsole.removeChild(this.executionConsole.firstChild)}}setProgress(e,t){if(!this.progressContainer||!this.progressBar)return;if(e<=0){this.progressContainer.style.display="none",this.progressBar.style.width="0%";return}this.progressContainer.style.display="flex";let i=Math.min(100,Math.max(0,Math.round(e)));this.progressBar.style.width=`${i}%`,this.progressVal&&(this.progressVal.textContent=`${i}%`),t&&this.progressLabel&&(this.progressLabel.textContent=t),i>=100&&setTimeout(()=>{this.progressContainer&&this.progressBar&&this.progressBar.style.width==="100%"&&(this.progressContainer.style.display="none")},1500)}updateContext(e,t){this.latestContext=e,t&&(this.latestPlan=t),this.activeTab==="brain"?(this.renderContextTree(),t&&this.refreshInspectorView()):this.activeTab==="debug"&&this.refreshDebugView()}renderContextTree(){if(!this.contextTreeContainer)return;let e=this.latestContext,t=re(),i=this.latestPlan;this.contextTreeContainer.innerHTML="";let n=this.createTreeFolder("\u{1F4C4} P\xC1GINA & ESCOPO ATUAL",!0,[{label:"T\xEDtulo",value:document.title||"Sem t\xEDtulo"},{label:"URL",value:window.location.pathname||"/"},{label:"Escopo DOM",value:e?`${e.scope.tagName.toLowerCase()}${e.scope.className?"."+e.scope.className.split(" ").join("."):""}`:"Document"},{label:"Tamanho Texto",value:e?`${e.questionText.length} caracteres`:"N\xE3o analisado"},{label:"Trecho Enunciado",value:e?`"${e.questionText.slice(0,120)}..."`:"Nenhum"}]);this.contextTreeContainer.appendChild(n);let a=e?e.controls:[],s=a.map((p,d)=>{let l=p.role==="navigation"||p.type==="button",h=!l&&p.value?` [val: "${p.value}"]`:"";return{label:`[#${d+1}] ${p.type.toUpperCase()}`,value:`${p.label||p.id||p.name||"(Sem r\xF3tulo)"}${h}`.trim(),badge:l?"Navega\xE7\xE3o":p.role||p.type}}),r=this.createTreeFolder(`\u{1F39B}\uFE0F CONTROLES DETECTADOS (${a.length})`,a.length>0,s);this.contextTreeContainer.appendChild(r);let c=t.map((p,d)=>({label:`Mem\xF3ria #${d+1}`,value:p,badge:"RAG"})),u=this.createTreeFolder(`\u{1F9E0} MEM\xD3RIA RAG ACUMULADA (${t.length})`,t.length>0,c);if(this.contextTreeContainer.appendChild(u),i){let p=this.createTreeFolder(`\u{1F916} \xDALTIMO PLANO IA (${i.actions.length} a\xE7\xF5es)`,!0,[{label:"Tipo P\xE1gina",value:i.pageType,badge:`${(i.confidence*100).toFixed(0)}%`},{label:"Modo",value:i.mode},{label:"Racioc\xEDnio",value:i.rationale||"N/A"},...i.actions.map((d,l)=>({label:`A\xE7\xE3o #${l+1} (${d.t})`,value:JSON.stringify(d)}))]);this.contextTreeContainer.appendChild(p)}}createTreeFolder(e,t,i){let n=document.createElement("div");n.className="eq-tree-node";let a=document.createElement("div");a.className="eq-tree-header",a.innerHTML=`<span class="eq-tree-arrow">${t?"\u25BC":"\u25B6"}</span> <span>${e}</span>`;let s=document.createElement("div");if(s.className="eq-tree-content",s.style.display=t?"flex":"none",i.length===0)s.innerHTML='<div class="text-muted" style="padding: 2px 0;">Nenhum item registrado.</div>';else for(let r of i){let c=document.createElement("div");c.className="eq-tree-leaf",c.innerHTML=`
          <strong style="color:#ffffff; min-width: 80px;">${r.label}:</strong>
          <span style="flex:1; word-break: break-word; color:#aaaaaa;">${r.value}</span>
          ${r.badge?`<span class="eq-tree-badge">${r.badge}</span>`:""}
        `,s.appendChild(c)}return a.addEventListener("click",()=>{let r=s.style.display==="none";s.style.display=r?"flex":"none";let c=a.querySelector(".eq-tree-arrow");c&&(c.textContent=r?"\u25BC":"\u25B6")}),n.appendChild(a),n.appendChild(s),n}toggle(e){e!==void 0?this.isCollapsed=!e:this.isCollapsed=!this.isCollapsed,this.isCollapsed?this.sidebarEl.classList.add("eq-collapsed"):(this.sidebarEl.classList.remove("eq-collapsed"),this.apiKeyInput.value||(this.switchTab("settings"),this.apiKeyInput.focus()))}setBusy(e,t){this.analyzeBtn.disabled=e,[this.modelSelect,this.modeSelect,this.engineSelect,this.dryRunCheckbox,this.autoApplyCheckbox,this.autoAdvanceCheckbox,this.useVisionCheckbox].forEach(i=>i.disabled=e),e?(this.startStopwatch(),this.dotPulseAp.className="eq-dot-pulse busy",this.dotPulseAdv.className="eq-dot-pulse busy",this.launcherDot.className="eq-launcher-dot busy",t&&this.setStatus(t,"info")):(this.stopStopwatch(),this.dotPulseAp.className="eq-dot-pulse",this.dotPulseAdv.className="eq-dot-pulse",this.launcherDot.className="eq-launcher-dot")}setStatus(e,t="info"){this.statusTextAp.textContent=e,this.statusTextAdv.textContent=e;let i=this.shadow.querySelector("#eq-operation-state");i&&(i.textContent=t==="error"?"Bloqueado":t==="success"?"Confirmado":this.autopilot.isActive()?"Monitorando":"Pronto",i.className=`eq-operation-state is-${t}`),t==="error"?(this.dotPulseAp.className="eq-dot-pulse error",this.dotPulseAdv.className="eq-dot-pulse error",this.launcherDot.className="eq-launcher-dot error"):t==="success"&&(this.dotPulseAp.className="eq-dot-pulse",this.dotPulseAdv.className="eq-dot-pulse",this.launcherDot.className="eq-launcher-dot");let n=e.includes("Alternando")||e.includes("indispon\xEDvel")||e.includes("fallback")||e.includes("alternativo"),a=t==="error"?"> [ERRO] ":t==="success"?"> [SUCESSO] ":n?"> [FALLBACK] ":"> [SYS] ",s=t==="error"?"text-red":t==="success"?"text-green":n?"text-yellow":"text-blue";this.logToConsole(`${a}${e}`,s)}setPlan(e,t){this.latestPlan=e,this.resultContainer.style.display="flex",e.durationMs&&this.stopStopwatch(e.durationMs);let i=this.shadow.querySelector("#eq-badges");i.replaceChildren();let n=[e.mode.replace("_"," "),`${Math.round(e.confidence*100)}% Confian\xE7a`,`${e.actions.length} a\xE7\xF5es`,...e.usedModel?[e.usedModel]:[]];for(let c of n){let u=document.createElement("span");u.className="eq-brand-badge",u.textContent=c,i.appendChild(u)}let a=this.shadow.querySelector("#eq-rationale-text");a.textContent=e.rationale;let s=this.shadow.querySelector("#eq-actions-list");s.innerHTML="";for(let c of e.actions){let u=document.createElement("div");u.className="eq-action-item";let p="";c.t==="chk"?p=`chk ${c.id} (${c.c})`:c.t==="val"?p=`val "${c.v}" -> ${c.id}`:c.t==="sel"?p=`sel "${Array.isArray(c.v)?c.v.join(","):c.v}" -> ${c.id}`:c.t==="clk"?p=`clk ${c.id}`:c.t==="adv"?p="adv":c.t==="js"?p=`js: ${String(c.v).slice(0,40)}...`:c.t==="drag"&&(p=`drag "${c.from}" -> "${c.to}"`);let d=document.createElement("span");d.className="eq-action-badge",d.textContent=c.t.toUpperCase();let l=document.createElement("span");l.textContent=p,u.append(d,l),s.appendChild(u)}this.applyBtn.disabled=!t||!e.actions.length;let r=this.shadow.querySelector("#eq-execution-card");r&&(r.hidden=!0),this.refreshInspectorView(),this.refreshDebugView()}setExecutionReport(e){let t=this.shadow.querySelector("#eq-execution-card"),i=this.shadow.querySelector("#eq-execution-summary"),n=this.shadow.querySelector("#eq-execution-list");if(!t||!i||!n)return;t.hidden=!1,i.textContent=e.navigationVerified?`${e.verified}/${e.applied} a\xE7\xF5es verificadas. Navega\xE7\xE3o confirmada.`:`${e.verified}/${e.applied} a\xE7\xF5es verificadas. ${e.navigationEvidence}`,i.className=`eq-execution-summary ${e.success?"is-success":"is-warning"}`,n.replaceChildren();let a=this.shadow.querySelector("#eq-execution-placeholder");a&&(a.textContent=e.navigationVerified?"Fluxo conclu\xEDdo: aplica\xE7\xE3o e navega\xE7\xE3o confirmadas.":`Fluxo interrompido: ${e.navigationEvidence}`,a.className=`eq-execution-placeholder ${e.success?"is-success":"is-warning"}`);for(let s of e.reports){let r=document.createElement("div");r.className=`eq-execution-row ${s.verified?"is-success":"is-failed"}`;let c=document.createElement("span");c.className="eq-execution-state",c.textContent=s.verified?"OK":"FALHOU";let u=document.createElement("div");u.className="eq-execution-details";let p=document.createElement("strong");p.textContent=s.target;let d=document.createElement("span");if(d.textContent=`${s.strategy} | ${s.evidence}`,u.append(p,d),r.append(c,u),s.error){let l=document.createElement("small");l.textContent=s.error,r.appendChild(l)}n.appendChild(r)}}setInspectorPrompt(e,t){this.latestPromptText=e,this.inspPrompt&&(this.inspPrompt.textContent=e),t&&this.inspModel&&(this.inspModel.textContent=t),this.inspLatency&&(this.inspLatency.textContent="Aguardando IA..."),this.activeTab==="debug"&&this.refreshDebugView()}refreshInspectorView(){let e=this.latestPlan;if(e)if(this.inspModel.textContent=e.usedModel||this.initialSettings.model,this.inspLatency.textContent=e.durationMs?`${e.durationMs}ms`:"--",this.inspTokens.textContent=e.tokensUsed?`${e.tokensUsed}`:"--",this.inspPrompt.textContent=e.promptSent||this.latestPromptText||"Prompt n\xE3o registrado para esta requisi\xE7\xE3o.",this.inspRationale.textContent=e.rationale,this.inspActions.innerHTML="",e.actions.length>0)for(let t of e.actions){let i=document.createElement("div");i.className="eq-action-item",i.textContent=JSON.stringify(t),this.inspActions.appendChild(i)}else this.inspActions.innerHTML='<div class="text-muted" style="padding: 4px;">Nenhuma a\xE7\xE3o prescrita pela IA.</div>';else this.latestPromptText&&(this.inspPrompt.textContent=this.latestPromptText)}showFloatingAnswers(e){let t=e||this.latestPlan;t&&this.floatingAnswers.show(t)}hideFloatingAnswers(){this.floatingAnswers.hide()}isFloatingAnswersOpen(){return this.floatingAnswers.isOpen()}updateModelSelect(e,t){let i=t||this.initialSettings.model||this.modelSelect.value;this.modelSelect.innerHTML="";let n=!1;e.forEach(a=>{let s=a.id===i;s&&(n=!0),this.modelSelect.add(new Option(a.name,a.id,!1,s))}),!n&&i&&this.modelSelect.add(new Option(`Gemini (${i})`,i,!1,!0)),this.modelSelect.value=i}updateSelectedModel(e){Array.from(this.modelSelect.options).some(i=>i.value===e)||this.modelSelect.add(new Option(`Gemini (${e})`,e,!1,!0)),this.modelSelect.value=e}applyHostDarkMode(e){document.getElementById("eq-host-dark-mode-style")?.remove(),this.host.classList.toggle("eq-dark-mode-active",e)}destroy(){this.stopStopwatch(),this.autopilot.stop(),this.applyHostDarkMode(!1),this.callbacks.onDestroy(),this.host.remove()}};function _t(){try{if(typeof document>"u"||!document.head||document.querySelector("link[data-easyquiz-preconnect]"))return;let o=document.createElement("link");o.rel="preconnect",o.href="https://generativelanguage.googleapis.com",o.crossOrigin="anonymous",o.setAttribute("data-easyquiz-preconnect","true"),document.head.appendChild(o);let e=document.createElement("link");e.rel="dns-prefetch",e.href="https://generativelanguage.googleapis.com",e.setAttribute("data-easyquiz-preconnect","true"),document.head.appendChild(e)}catch{}}async function Gt(){let o=window;if(_t(),o.__easyquiz){o.__easyquiz.toggle();return}let e=we(),t=null,i=null,n=new be(e,{onAnalyze:(r=1,c)=>a(r,c),onApply:(r=1)=>void s(r),onDestroy:()=>{if(i){try{i.abort()}catch{}i=null}U(),delete o.__easyquiz},onCancel:()=>{if(i){try{i.abort()}catch{}i=null}U(),n.setBusy(!1),n.setProgress(0),n.logToConsole("> [SYS] Opera\xE7\xE3o cancelada imediatamente pelo usu\xE1rio.","text-yellow")},onSettingsChange:r=>{e=Ke(r)}});o.__easyquiz={toggle:()=>n.toggle(),destroy:()=>n.destroy(),analyze:async()=>{await a()}},window.addEventListener("keydown",r=>{if(r.altKey&&(r.key==="q"||r.key==="Q")){if(r.preventDefault(),!n)return;n.toggle(!0),a()}});async function a(r=1,c){if(!e.apiKey){n.setStatus("Configure sua chave de API Gemini acima para come\xE7ar.","error"),n.toggle(!0);return}if(i)try{i.abort()}catch{}i=new AbortController;let u=i,p=()=>{try{u.abort()}catch{}};if(c&&(c.aborted?u.abort():c.addEventListener("abort",p,{once:!0})),u.signal.aborted){n.setBusy(!1),n.setProgress(0);return}n.setBusy(!0,"Identificando o bloco da quest\xE3o ativa na p\xE1gina..."),n.setProgress(20,"Varrendo escopo do DOM e controles..."),U(),n.hideFloatingAnswers();try{let d=ae(!1);d||(n.setStatus("Nenhum controle detectado. Tentando captura de tela inteira...","info"),d=K()),Be(d.scope),n.updateContext(d),n.logToConsole(`> [DOM] Escopo: <${d.scope.tagName.toLowerCase()}> com ${d.controls.length} controle(s) e ${d.questionText.length} caracteres.`,"text-blue"),n.setStatus(`Quest\xE3o localizada (${d.controls.length} controles). Preparando an\xE1lise...`,"info"),n.setProgress(40,`Consultando Gemini (${e.model})...`);let l=await _e(d.scope,e.useVision);if(u.signal.aborted)return;n.setStatus(l.length>0?`Consultando Gemini (${e.model}) com ${l.length} imagem(ns) anexada(s)...`:`Consultando Gemini (${e.model}) via DOM nativo (modo r\xE1pido)...`,"info");let h=ee(d,l,e);n.setInspectorPrompt(h,e.model);let g=(m,b)=>{n.setStatus(m,b==="warning"?"info":b);let T=b==="error"?"[ERRO]":b==="warning"?"[FALLBACK]":"[SYS]",x=b==="error"?"text-red":b==="warning"?"text-yellow":"text-muted";n.logToConsole(`> ${T} ${m}`,x)},{plan:f,usedModel:y}=await Ce(d,l,e,g,u.signal);if(u.signal.aborted)return;if(f.needsMoreContext){n.setProgress(55,"Ampliando escopo da quest\xE3o..."),n.setStatus("Enunciado ou contexto isolado detectado pela IA. Acionando Sele\xE7\xE3o Geral Expandida...","info"),n.logToConsole("> [DOM] Enunciado isolado. Ampliando escopo para sele\xE7\xE3o expandida...","text-blue"),d=ae(!0),d||(d=K()),Be(d.scope),n.updateContext(d),l=await _e(d.scope,e.useVision),n.setStatus(`Reconsultando IA com escopo ampliado (${d.controls.length} controles)...`,"info");let m=ee(d,l,e);n.setInspectorPrompt(m,e.model),f=(await Ce(d,l,e,g,u.signal)).plan}return u.signal.aborted||(n.setProgress(70,"Resposta recebida da IA! Processando plano..."),n.logToConsole(`> [IA] Modelo: ${y||e.model} | Modo: ${f.mode} | Confian\xE7a: ${(f.confidence*100).toFixed(0)}%`,"text-green"),f.rationale&&n.logToConsole(`> [IA] Racioc\xEDnio: "${f.rationale}"`,"text-blue"),n.logToConsole(`> [IA] ${f.actions.length} a\xE7\xE3o(\xF5es) prescritas no plano.`,"text-blue"),f.memoryToStore&&(Ye(f.memoryToStore),n.logToConsole(`> [RAG] \u{1F9E0} Nova mem\xF3ria te\xF3rica salva na sess\xE3o: "${f.memoryToStore}"`,"text-yellow")),t=f,n.updateContext(d,f),ht(f.actions),n.setPlan(f,!e.dryRun),f.pageType==="conclusion"?(n.setProgress(100,"Atividade conclu\xEDda!"),n.setStatus("Atividade conclu\xEDda ou tela final detectada pela IA.","success")):f.pageType==="info"?(n.setProgress(100,"Contexto absorvido na mem\xF3ria!"),n.setStatus("\u{1F4D8} Conte\xFAdo de contexto absorvido na mem\xF3ria RAG. Avan\xE7ando...","success")):f.pageType==="start"?(n.setProgress(100,"In\xEDcio detectado!"),n.setStatus("In\xEDcio de atividade detectado. Iniciando...","info")):(n.setProgress(80,"Plano de resolu\xE7\xE3o pronto!"),n.setStatus(e.dryRun?"Simula\xE7\xE3o conclu\xEDda. As respostas foram real\xE7adas na p\xE1gina sem altera\xE7\xE3o.":"Resolu\xE7\xE3o pronta! Verifique o realce na tela e aplique quando desejar.","success")),e.dryRun&&f.pageType==="question"&&n.showFloatingAnswers(f),u.signal.aborted)?void 0:(e.autoApply&&!e.dryRun&&await s(r,u.signal),f)}catch(d){if(u.signal.aborted||d instanceof Error&&(d.name==="AbortError"||d.message.includes("cancelada"))){U(),n.setProgress(0),n.setBusy(!1),n.setStatus("Opera\xE7\xE3o cancelada pelo usu\xE1rio.","info");return}U(),n.setProgress(0);let l=d instanceof Error?d.message:"Falha desconhecida na an\xE1lise.";n.setStatus(l,"error"),n.logToConsole(`> [ERRO] ${l}`,"text-red"),n.setErrorDiagnostic(l,"An\xE1lise da IA");return}finally{c?.removeEventListener("abort",p),i===u&&(i=null),n.setBusy(!1)}}async function s(r=1,c){if(c?.aborted)return;if(!t){n.setStatus("Nenhum plano dispon\xEDvel para aplicar. Execute a an\xE1lise primeiro.","error");return}if(e.dryRun){n.setStatus("O modo de simula\xE7\xE3o est\xE1 ativo. Desmarque para poder aplicar.","error");return}let u=t.pageType==="info"||t.pageType==="start",p=(e.autoAdvance||u)&&t.confidence>=e.confidenceThreshold&&!t.needsMoreContext;n.setBusy(!0,"Aplicando respostas no formul\xE1rio..."),n.setProgress(85,`Aplicando ${t.actions.length} a\xE7\xE3o(\xF5es) no formul\xE1rio...`),n.logToConsole(`> [EXEC] Iniciando aplica\xE7\xE3o com 6 vias de persist\xEAncia para ${t.actions.length} a\xE7\xE3o(\xF5es)...`,"text-blue");try{let d=await De(t,p,r,oe(e));if(c?.aborted)return;if(n.setExecutionReport(d),d.success||d.advanced)n.setProgress(100,"Sucesso! Respostas preenchidas e validadas!"),n.logToConsole(`> [VERIF] \u2713 Sucesso no DOM: ${d.verified}/${d.applied} a\xE7\xF5es validadas com sucesso!`,"text-green"),d.advanced?n.logToConsole("> [NAV] \u2713 Bot\xE3o de confirma\xE7\xE3o/avan\xE7o acionado com sucesso!","text-green"):p&&n.logToConsole(`> [NAV] \u26A0\uFE0F ${d.navigationEvidence}`,"text-yellow"),n.setStatus(d.advanced?`Sucesso: ${d.applied} resposta(s) preenchida(s) e pr\xF3xima quest\xE3o confirmada.`:`Respostas preenchidas e validadas. Avan\xE7o n\xE3o confirmado: ${d.navigationEvidence}`,d.advanced||!p?"success":"info"),n.hideFloatingAnswers();else{n.setProgress(0,"Aplica\xE7\xE3o parcial: verifica\xE7\xE3o incompleta.");let l=d.failed.length>0?d.failed.join(", "):"alvos pendentes";n.logToConsole(`> [VERIF] Alerta: ${d.verified}/${d.applied} a\xE7\xF5es verificadas. Pend\xEAncias: ${l}.`,"text-yellow"),n.setStatus(`Aplica\xE7\xE3o parcial (${d.applied} enviadas, ${d.verified} verificadas).`,"info"),n.hideFloatingAnswers()}}catch(d){n.setProgress(0);let l=d instanceof Error?d.message:"Falha ao aplicar plano.";n.setStatus(l,"error"),n.logToConsole(`> [ERRO] ${l}`,"text-red"),n.hideFloatingAnswers()}finally{n.setBusy(!1)}}n.toggle(!0)}Gt().catch(o=>{console.error("[EasyQuiz] Erro fatal na inicializa\xE7\xE3o:",o),window.alert(`EasyQuiz: falha ao iniciar: ${o instanceof Error?o.message:String(o)}`)});})();
