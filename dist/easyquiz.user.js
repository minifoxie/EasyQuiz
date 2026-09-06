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
"use strict";(()=>{var D={apiKey:"",model:"gemini-3.8-flash",uiMode:"easy",modeHint:"",engine:"smart",dryRun:!1,autoApply:!0,autoAdvance:!1,hostDarkMode:!0,useVision:!1,confidenceThreshold:.8};var me="easyquiz_settings_v2";function ge(){try{let o=localStorage.getItem(me);if(!o){let n=localStorage.getItem("easyquiz_settings_v1");if(n){let a=JSON.parse(n);return{...D,apiKey:a.apiKey||""}}return{...D}}let e=JSON.parse(o),t=typeof e.model=="string"&&e.model?e.model:D.model;return{apiKey:typeof e.apiKey=="string"?e.apiKey.trim():D.apiKey,model:t,uiMode:e.uiMode==="easy"||e.uiMode==="advanced"?e.uiMode:D.uiMode,modeHint:e.modeHint??"",engine:e.engine??"smart",dryRun:!!e.dryRun,autoApply:e.autoApply!==void 0?!!e.autoApply:!0,autoAdvance:!!e.autoAdvance,hostDarkMode:e.hostDarkMode!==void 0?!!e.hostDarkMode:!0,useVision:!!e.useVision,confidenceThreshold:typeof e.confidenceThreshold=="number"?e.confidenceThreshold:D.confidenceThreshold}}catch{return{...D}}}function Be(){try{localStorage.removeItem(me),localStorage.removeItem("easyquiz_settings_v1");let o=[];for(let e=0;e<localStorage.length;e++){let t=localStorage.key(e);t&&(t.startsWith("eq_")||t.startsWith("easyquiz_"))&&o.push(t)}o.forEach(e=>localStorage.removeItem(e)),ve()}catch(o){console.warn("[EasyQuiz] Erro ao resetar dados:",o)}}function Q(o){try{let e=localStorage.getItem("eq_domain_cache_"+o);if(!e)return{};let t=JSON.parse(e);if(t.advanceSelector&&/inject|injetar/i.test(t.advanceSelector)){t.advanceSelector=void 0;try{localStorage.removeItem("eq_domain_cache_"+o)}catch{}}return t}catch{return{}}}function fe(o,e){if(e.advanceSelector&&/inject|injetar/i.test(e.advanceSelector))return;let n={...Q(o),...e};try{localStorage.setItem("eq_domain_cache_"+o,JSON.stringify(n))}catch(a){console.warn("[EasyQuiz] Erro cache de dominio:",a)}}function Ne(o){let t={...ge(),...o};try{localStorage.setItem(me,JSON.stringify(t))}catch(n){console.warn("[EasyQuiz] Falha ao persistir configura\xE7\xF5es no localStorage:",n)}return t}var N=[],De=12,lt=1200;function Oe(o){let e=o.trim().replace(/\s+/g," ").slice(0,lt);e&&!N.includes(e)&&(N.push(e),N.length>De&&(N=N.slice(-De)))}function ee(){return N}function ve(){N=[]}var Ve=[{id:"native-value-events",widget:"text",label:"Setter nativo com input/change/blur",precondition:"Campo edit\xE1vel vis\xEDvel e n\xE3o desabilitado.",evidence:"value ou textContent coincide exatamente com o valor esperado.",risk:"low",cost:"fast"},{id:"native-choice-state",widget:"choice",label:"Estado nativo de radio/checkbox",precondition:"Input ou widget ARIA \xFAnico localizado.",evidence:"checked/aria-checked/data-state do alvo e grupo correspondem ao esperado.",risk:"low",cost:"fast"},{id:"native-select-events",widget:"select",label:"Sele\xE7\xE3o nativa por value/texto exato",precondition:"Select vis\xEDvel com op\xE7\xE3o correspondente.",evidence:"option.selected e selected value correspondem ao esperado.",risk:"low",cost:"fast"},{id:"aria-combobox-keyboard",widget:"combobox",label:"Combobox ARIA por foco e teclado",precondition:"Combobox vis\xEDvel com popup/op\xE7\xF5es acess\xEDveis.",evidence:"aria-expanded, aria-activedescendant ou op\xE7\xE3o selecionada mudam.",risk:"medium",cost:"normal"},{id:"click-to-place",widget:"drag",label:"Selecionar item e clicar no destino",precondition:"Cart\xE3o e dropzone vis\xEDveis com protocolo click-to-place.",evidence:"Item passa a ser filho do destino ou recebe estado de colocado.",risk:"medium",cost:"normal"},{id:"html5-drag-drop",widget:"drag",label:"HTML5 dragstart/dragover/drop",precondition:"Origem draggable e destino aceita drag/drop.",evidence:"Relocation, callback ou estado placed confirmado.",risk:"medium",cost:"normal"},{id:"keyboard-order",widget:"order",label:"Ordena\xE7\xE3o por foco e teclado",precondition:"Itens orden\xE1veis com foco/roles ou bot\xF5es de mover.",evidence:"Ordem dos itens no DOM corresponde \xE0 sequ\xEAncia esperada.",risk:"medium",cost:"normal"},{id:"navigation-feedback",widget:"navigation",label:"Verificar e confirmar feedback/transi\xE7\xE3o",precondition:"Bot\xE3o de verifica\xE7\xE3o/avan\xE7o \xFAnico e habilitado.",evidence:"Feedback esperado e assinatura espec\xEDfica da quest\xE3o mudam.",risk:"high",cost:"normal"},{id:"javascript-explicit",widget:"javascript",label:"JavaScript limitado via capability expl\xEDcita",precondition:"Engine javascript autorizada e a\xE7\xE3o declarativa insuficiente.",evidence:"Efeito DOM esperado confirmado por verificador.",risk:"high",cost:"last-resort"}];function ct(o){if(!o||o.length===0)return Ve.filter(t=>t.widget!=="javascript");let e=new Set(o);return Ve.filter(t=>e.has(t.widget))}function _e(o){return ct(o).map(e=>`${e.id}: ${e.label} | pr\xE9: ${e.precondition} | prova: ${e.evidence} | risco: ${e.risk}`).join(`
`)}var Ge=`Voc\xEA \xE9 o motor operacional inteligente do EasyQuiz. Sa\xEDda EXCLUSIVA em JSON minificado, sem markdown ou conversa.

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
`;function K(o,e,t){let n=o.htmlSnippet.includes("draggable")||o.htmlSnippet.includes("perseus")||o.htmlSnippet.includes("category")||o.htmlSnippet.includes("dropzone")||o.controls.some(c=>c.type==="draggable"||c.type==="dropzone"),a=new Set(["navigation"]);o.controls.some(c=>["text","number","textarea","contenteditable"].some(h=>c.type.includes(h)))&&a.add("text"),o.controls.some(c=>["radio","checkbox"].includes(c.type)||c.tag==="button")&&a.add("choice"),o.controls.some(c=>c.tag==="select")&&a.add("select"),o.controls.some(c=>/combobox|dropdown/i.test(c.type))&&a.add("combobox"),(o.controls.some(c=>["draggable","dropzone"].includes(c.type))||n)&&a.add("drag"),t.engine==="javascript"&&a.add("javascript");let i=/katex|latex|math|matrix|formula|frac|\$|\^|\_/i.test(o.htmlSnippet)||/calcular|calcule|resolva|matriz|equação|função|probabilidade|geometria|fórmula|coordenada|sistema/i.test(o.questionText),r=o.questionText.length<250||n||o.controls.length<4||i?`
[HTML]:
${o.htmlSnippet.slice(0,3500).replace(/\s+/g," ")}`:`
[HTML]: Omitido.`,l=ee(),u=l.length>0?`
[MEM\xD3RIA]:
${l.join(" | ")}
`:"",d=o.controls.filter(c=>c.role!=="navigation"),p=o.controls.filter(c=>c.role==="navigation");return`--- AN\xC1LISE ---
[MODO]: ${t.engine} | Dica: ${t.modeHint||"Auto"}
[URL]: ${o.sourceUrl}
[P\xC1GINA]: ${o.pageTitle}${u}
[ESTRAT\xC9GIAS]:
${_e([...a])}
[DADOS]
[TEXTO]:
${o.questionText}${r}

[RESPOSTAS]:
${d.length>0?JSON.stringify(d.map(c=>({id:c.id,t:c.type,n:c.name||void 0,txt:c.label,v:c.value||void 0,opt:c.options.length?c.options:void 0}))):"Nenhuma"}

[NAVEGA\xC7\xC3O]:
${p.length>0?p.map(c=>`"${c.label||c.id}"[${c.type}]`).join(","):"Nenhuma"}

[IMAGENS]: ${e.length}
[/DADOS]
Sa\xEDda em JSON v\xE1lido.`}var dt=new Set(["question","info","start","conclusion"]),ut=new Set(["texto_livre","escolha_unica","escolha_multipla","verdadeiro_falso","preenchimento","acao_sem_resposta","categorizacao","ordenacao","arrastar_soltar"]),pt=new Set(["val","chk","sel","clk","adv","js","drag"]),ht=150,te=2e3;function I(o,e=""){return typeof o=="string"?o.trim().slice(0,te):e}function mt(o,e){if(!o||typeof o!="object")return null;let t=o,n=t.t;if(typeof n!="string"||!pt.has(n))return null;if(n==="adv")return{t:"adv",...I(t.id)?{id:I(t.id,"").slice(0,500)}:{}};if(n==="drag"){let s=I(t.from),r=I(t.to);return!s||!r?null:{t:"drag",from:s.slice(0,500),to:r.slice(0,500)}}if(n==="js"){let s=I(t.v);return!s||s.length>8e3?null:{t:"js",v:s}}let a=I(t.id).slice(0,500);if(!a)return null;if(n==="val")return{t:"val",id:a,v:I(t.v).slice(0,te)};if(n==="sel"){let r=(Array.isArray(t.v)?t.v:[t.v]).map(l=>I(l).slice(0,500)).filter(Boolean);return{t:"sel",id:a,v:r}}if(n==="chk"){let s=t.c===!1||t.c==="false"||t.c===0||t.c==="0"||t.c==="off"||t.c==="unchecked"||t.c==="desmarcar",r={t:"chk",id:a,c:!s};return t.v!==void 0&&(r.v=I(t.v).slice(0,te)),r}let i={t:"clk",id:a};if(t.c!==void 0){let s=t.c===!1||t.c==="false"||t.c===0||t.c==="0"||t.c==="off"||t.c==="unchecked"||t.c==="desmarcar";i.c=!s}return t.v!==void 0&&(i.v=I(t.v).slice(0,te)),Array.isArray(t.co)&&t.co.length===2&&t.co.every(s=>typeof s=="number"&&Number.isFinite(s))&&(i.co=[t.co[0],t.co[1]]),i}function je(o){if(!o||typeof o!="object")return{pageType:"info",mode:"acao_sem_resposta",confidence:.5,rationale:"Resposta estruturada n\xE3o identificada; avan\xE7ando como informativo.",actions:[{t:"adv"}]};let e=o,t=e.pageType,n=e.mode;(typeof t!="string"||!dt.has(t))&&(t="question"),(typeof n!="string"||!ut.has(n))&&(n="escolha_unica");let a=Array.isArray(e.actions)?e.actions:[],i=[];for(let u=0;u<Math.min(a.length,ht);u++){let d=mt(a[u],u);d&&i.push(d)}let s=i.filter(u=>u.t!=="adv"),r=i.some(u=>u.t==="adv");t==="conclusion"?i.length=0:t==="info"||t==="start"?r||i.push({t:"adv"}):t==="question"&&!r&&i.push({t:"adv"});let l=typeof e.confidence=="number"&&Number.isFinite(e.confidence)?Math.min(1,Math.max(0,e.confidence)):.85;return{pageType:t,mode:n,confidence:l,rationale:I(e.rationale,"Plano validado e auto-recuperado."),actions:i,...I(e.memoryToStore)?{memoryToStore:I(e.memoryToStore)}:{},...e.needsMoreContext?{needsMoreContext:!!e.needsMoreContext}:{}}}var O=[{id:"gemini-3.8-flash",name:"Gemini 3.8 Flash (R\xE1pido e atual)",description:"Modelo est\xE1vel multimodal para baixa lat\xEAncia e tarefas agentivas.",stable:!0},{id:"gemini-3.6-flash",name:"Gemini 3.6 Flash (Recomendado Google)",description:"Modelo recomendado oficial do Google AI Studio com alt\xEDssima disponibilidade.",stable:!0},{id:"gemini-3.5-flash-lite",name:"Gemini 3.5 Flash-Lite (Econ\xF4mico e r\xE1pido)",description:"Modelo est\xE1vel de menor custo e menor taxa de fila.",stable:!0},{id:"gemini-3.5-flash",name:"Gemini 3.5 Flash (Equilibrado)",description:"Modelo balanceado para resolu\xE7\xE3o de exerc\xEDcios.",stable:!0},{id:"gemini-2.0-flash",name:"Gemini 2.0 Flash (Alta Disponibilidade)",description:"Modelo consolidado para conting\xEAncia.",stable:!0},{id:"gemini-2.5-flash",name:"Gemini 2.5 Flash (Legado)",description:"Modelo da gera\xE7\xE3o anterior para contas existentes.",stable:!0}],gt={type:"OBJECT",properties:{pageType:{type:"STRING",enum:["question","info","start","conclusion"]},mode:{type:"STRING",enum:["texto_livre","escolha_unica","escolha_multipla","verdadeiro_falso","preenchimento","acao_sem_resposta","categorizacao","ordenacao","arrastar_soltar"]},confidence:{type:"NUMBER"},rationale:{type:"STRING"},memoryToStore:{type:"STRING"},actions:{type:"ARRAY",items:{type:"OBJECT",properties:{t:{type:"STRING",enum:["val","chk","sel","clk","adv","js","drag"]},id:{type:"STRING"},v:{},c:{type:"BOOLEAN"},co:{type:"ARRAY",items:{type:"NUMBER"}},from:{type:"STRING"},to:{type:"STRING"}},required:["t"]}}},required:["pageType","mode","confidence","rationale","actions"]};function ft(o){return o.trim().replace(/^google\//,"").replace(/^models\//,"")||"gemini-2.5-flash"}function Fe(o,e){let t="";try{let n=JSON.parse(o);t=n.error?.message||n.message||""}catch{t=o.slice(0,160)}return/API_KEY_INVALID|API key not valid|key.*invalid|unregistered/i.test(t)?"Chave de API do Gemini inv\xE1lida ou n\xE3o autorizada no Google AI Studio.":/RESOURCE_EXHAUSTED|Quota exceeded/i.test(t)||e===429?"Limite tempor\xE1rio de cota do Gemini (HTTP 429) atingido. Aguardando recupera\xE7\xE3o...":e===404?`HTTP 404: ${t||"Modelo ou endpoint n\xE3o encontrado no Google AI Studio"}`:e===503||/overloaded/i.test(t)?`Servidores Google sobrecarregados (HTTP 503): ${t||"Aguardando"}`:t?`Erro Gemini (HTTP ${e}): ${t}`:`Falha na requisi\xE7\xE3o ao Gemini (HTTP ${e}).`}function vt(o){try{return JSON.parse(o)}catch(e){throw new Error(`Falha ao decodificar JSON da IA (${e instanceof Error?e.message:"incompleto"})`)}}var oe=(()=>{try{let o=typeof localStorage<"u"?localStorage.getItem("easyquiz_cached_models"):null;return o?JSON.parse(o):null}catch{return null}})(),be=new Set;async function ne(o){let e=o.trim().replace(/^["']|["']$/g,"");if(!e)return O;let t=[`https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(e)}`,`https://generativelanguage.googleapis.com/v1/models?key=${encodeURIComponent(e)}`];for(let n of t)try{let a=await fetch(n,{headers:{"Content-Type":"application/json","x-goog-api-key":e}});if(!a.ok){let s=await a.text(),r=Fe(s,a.status);if(r.includes("inv\xE1lida")||r.includes("n\xE3o autorizada"))throw new Error(r);continue}let i=await a.json();if(Array.isArray(i.models)&&i.models.length>0){let s=i.models.filter(r=>{let l=r.supportedGenerationMethods||[],u=(r.name||"").includes("gemini"),d=l.includes("generateContent"),p=(r.name||"").includes("embedding")||(r.name||"").includes("tts")||(r.name||"").includes("imagen")||(r.name||"").includes("aqa")||(r.name||"").includes("computer-use");return u&&d&&!p}).map(r=>{let l=r.supportedGenerationMethods||[],u=r.name.replace(/^models\//,""),d=r.displayName||u;return{id:u,name:d.includes(u)?d:`${d} (${u})`,description:r.description||"",stable:!/-preview|-experimental|-latest/i.test(u),supportsVision:!/embedding|tts|transcribe|live|image/i.test(u),supportsStructuredOutput:l.includes("generateContent"),supportedGenerationMethods:l,discoveredAt:Date.now()}});if(s.length>0){s.sort((r,l)=>{let u=d=>d==="gemini-3.8-flash"?120:d==="gemini-3.5-flash-lite"?115:d==="gemini-2.5-flash"?100:d==="gemini-3.1-pro-preview"?90:d.includes("flash")?50:10;return u(l.id)-u(r.id)}),oe=s;try{typeof localStorage<"u"&&localStorage.setItem("easyquiz_cached_models",JSON.stringify(s))}catch{}return s}}}catch(a){if(a.message?.includes("Chave de API"))throw a}return O}async function Ue(o){let e=o.trim().replace(/^["']|["']$/g,"");if(!e)return{ok:!1,message:"Insira sua chave de API."};try{let n=await ne(e);if(n.length>0&&n!==O){let a=n[0];return{ok:!0,message:`Chave v\xE1lida! ${n.length} modelos Gemini dispon\xEDveis em sua conta. Recomendado: ${a.name}`,models:n}}}catch(n){return{ok:!1,message:n instanceof Error?n.message:String(n)}}let t=["gemini-3.8-flash","gemini-3.5-flash-lite","gemini-2.5-flash"];for(let n of t)for(let a of["v1beta","v1"]){let i=`https://generativelanguage.googleapis.com/${a}/models/${n}:generateContent?key=${encodeURIComponent(e)}`;try{if((await fetch(i,{method:"POST",headers:{"Content-Type":"application/json","x-goog-api-key":e},body:JSON.stringify({contents:[{role:"user",parts:[{text:"PING"}]}],generationConfig:{maxOutputTokens:5}})})).ok)return{ok:!0,message:`Chave validada com sucesso no ${n} (${a})!`,models:O}}catch{}}return{ok:!1,message:"Chave de API inv\xE1lida, sem cota ou sem permiss\xE3o para modelos Gemini."}}async function ye(o,e,t,n){let a=t.apiKey.trim().replace(/^["']|["']$/g,"");if(!a)throw new Error("Chave de API n\xE3o configurada.");let i=ft(t.model);if(!oe||oe.length===0)try{n?.("Verificando modelos autorizados na sua chave de API...","info"),await ne(a)}catch(h){let g=h instanceof Error?h.message:String(h);if(g.includes("inv\xE1lida")||g.includes("n\xE3o autorizada"))throw new Error(g)}let s=Date.now(),r=K(o,e,t),l=[{text:r}];for(let h of e)l.push({inline_data:{mime_type:h.mediaType,data:h.base64}});let u={temperature:.05,maxOutputTokens:2500,response_mime_type:"application/json",response_schema:gt},d=[i,...oe?.map(h=>h.id)||[],"gemini-3.8-flash","gemini-3.5-flash-lite","gemini-3.6-flash","gemini-2.5-flash","gemini-3.5-flash","gemini-2.0-flash"],p=Array.from(new Set(d)).filter(h=>!be.has(h));p.length===0&&(be.clear(),p.push(...O.map(h=>h.id)));let c=new Error("Nenhum modelo tentado.");for(let h=0;h<p.length;h++){let g=p[h],b=p[h+1];u.thinkingConfig={thinkingBudget:0};let x={system_instruction:{parts:[{text:Ge}]},contents:[{role:"user",parts:l}],generationConfig:u};n?.(`Consultando Gemini (${g})...`,"info");let m=["v1beta","v1"];for(let q of m){let E=`https://generativelanguage.googleapis.com/${q}/models/${g}:generateContent?key=${encodeURIComponent(a)}`,A=new AbortController,S=setTimeout(()=>{try{A.abort(new Error(`Timeout de 9s excedido na API Gemini (${g}). Servidor demorou a responder.`))}catch{A.abort()}},9e3);try{let k=await fetch(E,{method:"POST",headers:{"Content-Type":"application/json","x-goog-api-key":a},body:JSON.stringify(x),signal:A.signal});if(clearTimeout(S),!k.ok){let Re=await k.text();if(k.status===400&&u.thinkingConfig&&/thinking/i.test(Re)){delete u.thinkingConfig,x.generationConfig=u;continue}let rt=Fe(Re,k.status);if(k.status===404&&q==="v1beta")continue;throw new Error(rt)}let U=await k.json(),he=U.candidates?.[0];if(!he||!he.content?.parts?.[0]?.text)throw new Error("A IA n\xE3o retornou uma resposta estruturada v\xE1lida.");let Pe=he.content.parts[0].text,R=je(vt(Pe));if(R.usedModel=g,R.durationMs=Date.now()-s,R.promptSent=r,R.tokensUsed=U.usageMetadata?.totalTokenCount,R.promptTokens=U.usageMetadata?.promptTokenCount,R.candidatesTokens=U.usageMetadata?.candidatesTokenCount,R.rawResponse=Pe,g!==i){n?.(`Resolvido com sucesso pelo fallback '${g}' (${q})!`,"info");try{t.model=g}catch{}}return{plan:R,rawUsage:U.usageMetadata,usedModel:g}}catch(k){if(clearTimeout(S),k instanceof Error&&(k.name==="AbortError"||k.message.includes("aborted")||k.message.includes("Timeout"))?c=new Error(`Timeout de 9s excedido na API Gemini (${g}). Sem resposta imediata.`):c=k,c.message.includes("inv\xE1lida")||c.message.includes("n\xE3o autorizada"))throw c;if(c.message.includes("Timeout")||c.message.includes("503")||c.message.includes("429"))break}}let v=c.message.includes("429")||c.message.includes("cota");if(c.message.includes("404")&&be.add(g),b){let q=v?500:150,E=`Modelo '${g}' indispon\xEDvel (${c.message}). Alternando imediatamente para '${b}'...`;console.warn(`[EasyQuiz Fallback] ${E}`),n?.(E,"warning"),q>0&&await new Promise(A=>setTimeout(A,q))}else console.warn(`[EasyQuiz Fallback] Modelo '${g}' falhou: ${c.message}. Todos os modelos esgotados.`)}throw c}var bt=[/\bfetch\b/i,/\bXMLHttpRequest\b/i,/\bWebSocket\b/i,/\b(?:localStorage|sessionStorage|indexedDB)\b/i,/\b(?:eval|Function|AsyncFunction|GeneratorFunction)\b/i,/\bimport(?:Scripts)?\b/i,/\bnavigator\s*\.\s*credentials\b/i,/\b(?:cookie|location\s*=|history\s*\.)/i,/\bwindow\s*\[\s*['"](?:fetch|eval|Function|localStorage|sessionStorage)/i];function Y(o){let e=o?.engine||"smart",t=new Set(["dom","framework","keyboard","drag"]);return o?.autoAdvance&&t.add("navigation"),e==="javascript"&&t.add("javascript"),{engine:e,capabilities:t,maxAttemptsPerAction:e==="command"?1:2,maxActionMs:e==="command"?1500:3e3,allowJavaScript:e==="javascript",allowNavigation:!!o?.autoAdvance}}function xe(o,e){if(o.t==="js"&&!e.allowJavaScript)throw new Error("A\xE7\xE3o JavaScript bloqueada pela engine atual. Use o motor JavaScript explicitamente.");if(o.t==="adv"&&!e.allowNavigation)throw new Error("Avan\xE7o autom\xE1tico bloqueado pela pol\xEDtica atual.")}function Qe(o){if(!o.trim())throw new Error("JavaScript recusado: c\xF3digo vazio.");if(o.length>8e3)throw new Error("JavaScript recusado: c\xF3digo acima do limite operacional.");if(bt.find(t=>t.test(o)))throw new Error("JavaScript recusado: acesso externo, persist\xEAncia ou avalia\xE7\xE3o din\xE2mica n\xE3o permitidos.");if(!/^\s*(?:\/\/[^\n]*\n|\/\*[\s\S]*?\*\/|[\s\S])*\$eq\./.test(o)&&!o.includes("$eq."))throw new Error("JavaScript recusado: use somente a API declarativa $eq.")}var _=['input:not([type="hidden"])',"textarea","select","button","a","label",'[role="button"]','[role="link"]','[role="radio"]','[role="checkbox"]','[role="option"]','[role="treeitem"]','[role="menuitemcheckbox"]','[role="menuitemradio"]','[contenteditable="true"]','[draggable="true"]',"[aria-grabbed]","[aria-dropeffect]","[data-widget-type]",".perseus-drag-item",".sortable-item",'[data-testid*="drag" i]','[data-testid*="card" i]','[data-testid*="option" i]','[data-testid*="choice" i]','[data-testid*="category" i]',"[data-choice]","[data-option]","[data-answer]","[data-value]",".quiz-option",".option-card",".choice-card",'[class*="option-card" i]','[class*="choice-card" i]','[class*="option-item" i]','[class*="choice-item" i]','[class*="answer-item" i]','[class*="alternative" i]','li[class*="choice" i]','li[class*="option" i]','li[class*="answer" i]','[data-role="dropzone"]',"[data-category]"].join(","),ae=/(verificar|checar|check|conferir|validar|próxim[oa]|next|continuar|continue|avançar|prosseguir|enviar|submit|concluir|finalizar|terminar|começar|iniciar|start|vamos lá|próxima tarefa|next task|próxima pergunta|next question|marcar como concluíd[oa]|mostrar resumo|entendi|compreendi|ok|leitura concluída|seguir|ir para o exercício|fazer o teste|próximo artigo|ir para a aula)/i,yt=0;function qe(o){try{let e=o.closest('[hidden], [style*="display: none"], [style*="display:none"], [aria-hidden="true"]');if(e&&!we(e))return!1}catch{}try{let e=window.getComputedStyle?window.getComputedStyle(o):o.style;if(e&&(e.display==="none"||e.visibility==="hidden"))return!1}catch{}try{if(typeof o.getBoundingClientRect=="function"){let e=o.getBoundingClientRect();if(e.width>0||e.height>0)return!0}}catch{}return(o.textContent||"").trim().length>0}function T(o){let e=o;if(!e||typeof e.isConnected=="boolean"&&!e.isConnected||we(e))return!1;let t=e.tagName?.toLowerCase();if(["input","select","textarea","button"].includes(t)){let n=e.type?.toLowerCase();if(n==="checkbox"||n==="radio"){if(e.id)try{let i=e.ownerDocument?.querySelector(`label[for="${CSS.escape(e.id)}"]`);if(i&&qe(i))return!0}catch{}let a=e.closest('label, .option-card, .quiz-option, .choice, .answer, [role="radio"], [role="checkbox"], [class*="option" i], [class*="choice" i], [class*="item" i], li, tr');if(a&&a!==e&&qe(a))return!0}try{if(!e.closest('[hidden], [style*="display: none"], [style*="display:none"], [aria-hidden="true"]')){let i=window.getComputedStyle?window.getComputedStyle(e):e.style;if(!i||i.display!=="none"&&i.visibility!=="hidden"){if(typeof e.getBoundingClientRect=="function"){let s=e.getBoundingClientRect();if(s.width>0||s.height>0)return!0}return!0}}}catch{}}return qe(e)}function xt(o){if(o==null)return"";if(typeof o=="string")return o;if(typeof o=="number"||typeof o=="boolean")return String(o);if(o instanceof Node)return o.textContent||"";try{if(typeof o?.toString=="function"){let e=o.toString();if(typeof e=="string")return e}}catch{}return""}function M(o,e=500){return xt(o).replace(/\s+/g," ").trim().slice(0,e)}function qt(o){let e=o.dataset.easyquizId;if(e)return e;let t=`eq-${Date.now().toString(36)}-${(yt+=1).toString(36)}`;return o.dataset.easyquizId=t,t}function we(o){return o?!!(o.closest('#easyquiz-shadow-root, .eq-sidebar, .eq-launcher, [data-easyquiz-ignore="true"], .btn-inject-eq, #btn-inject-script')||o.getAttribute?.("data-easyquiz-ignore")==="true"):!1}function V(o){if(!o||!(o instanceof Element)||we(o)||o.closest("header, nav, aside"))return!1;let e=o instanceof HTMLInputElement||o instanceof HTMLButtonElement?o.value:"",t=M(o.getAttribute?.("aria-label")||o.textContent||o.getAttribute?.("value")||e),n=o.type,a=t.replace(/[\d\(\)\[\]→\>\•\-\/\\]+/g," ").trim(),i=String(o.getAttribute?.("data-testid")||o.getAttribute?.("data-test-id")||o.getAttribute?.("id")||o.getAttribute?.("href")||"").toLowerCase();return ae.test(a)||ae.test(t)||n==="submit"||i.includes("next")||i.includes("check")||i.includes("continue")||i.includes("proximo")||i.includes("forward")||!1}function wt(o){let e=o.closest("tr");if(e){let r=e.querySelector("th, td:first-child"),l=r&&r!==o.closest("td")?M(r.textContent,100):"",u=M(o.closest("label, td")?.textContent||"",50);if(l&&u)return`${l}: ${u}`}let t=o.getAttribute("aria-label");if(t)return M(t);let n=o.getAttribute("aria-labelledby");if(n){let r=n.split(/\s+/).map(l=>document.getElementById(l)?.textContent).filter(Boolean).join(" ");if(r.trim())return M(r)}if("labels"in o&&o.labels){let r=Array.from(o.labels??[]).map(l=>l.textContent).join(" ");if(r.trim())return M(r)}let a=o.closest('.docssharedWizToggleLabeledContainer, [role="listitem"], .answer, label, .quiz-option, .form-check, .option-card');if(a&&a!==o){let r=M(a.textContent);if(r)return r}let i=o instanceof HTMLInputElement||o instanceof HTMLButtonElement?o.value:"",s=o.getAttribute("placeholder")||o.getAttribute("title")||o.textContent||i||"";return M(s)}function Ee(o,e){let t=o instanceof HTMLSelectElement?o:null,n=o;o.dataset.easyquizRole=e;let a=o.tagName.toLowerCase(),i=["input","textarea","select","button"].includes(a)?a:"other",s=o.getAttribute("role")||"",r=(o.getAttribute("data-testid")||o.getAttribute("data-test-id")||"").toLowerCase(),l=(o.className&&typeof o.className=="string"?o.className:"").toLowerCase(),u=o.getAttribute("draggable")==="true"||o.classList.contains("perseus-drag-item")||o.classList.contains("sortable-item")||!!o.getAttribute("aria-grabbed")||/drag|card|option|item/i.test(r)||/drag|card-item|sortable/i.test(l),d=o.getAttribute("data-role")==="dropzone"||o.classList.contains("category-container")||o.hasAttribute("data-category")||!!o.getAttribute("aria-dropeffect")||/drop|category|bucket/i.test(r)||/dropzone|category-box|bucket|target-zone/i.test(l),c=M((u?"draggable":d?"dropzone":"")||n.type||s||i,40),h="";if(n.type==="checkbox"||n.type==="radio"||s==="radio"||s==="checkbox")h=n.checked||o.getAttribute("aria-checked")==="true"?"checked":"unchecked";else if(i==="button"||a==="a"||e==="navigation"||V(o))h="";else{let C=o instanceof HTMLInputElement||o instanceof HTMLTextAreaElement||o instanceof HTMLSelectElement?o.value:"";h=M(C||o.getAttribute("data-category")||"",2e3)}let g=[];if(t)for(let C of Array.from(t.options).slice(0,80))g.push({value:M(C.value),label:M(C.textContent)});let b=!!(n.required||o.getAttribute("aria-required")==="true"),x=!!(n.disabled||o.getAttribute("aria-disabled")==="true"),m=qt(o);return{id:o.id||m,tag:i,type:c,label:wt(o),name:M(n.name||o.getAttribute("name")||"",180),value:h,options:g,required:b,disabled:x,role:e}}var Ke=['[data-test-id*="exercise" i]','[data-testid*="exercise" i]',".perseus-renderer",".framework-perseus",".Qr7Oae",".que",".question-holder",".quiz-question",".question_holder",".display_question",'[data-functional-selector*="question"]',".question-container","[data-question-id]",'[data-testid*="question" i]','[class*="question-container" i]','[class*="question" i]','[class*="pergunta" i]',"article","form","section","main"].join(",");function Ye(o){if(!T(o))return-1/0;let e=o.getBoundingClientRect(),t=Array.from(o.querySelectorAll(_)).filter(T),n=M(o.innerText,4e3).length;if(n<10||!t.length&&n<60)return-1/0;let a=Math.max(1,window.innerWidth*window.innerHeight),i=Math.max(1,e.width*e.height),s=Math.min(1,i/a),r=e.top+e.height/2,l=Math.abs(r-window.innerHeight/2)/Math.max(1,window.innerHeight),u=n>40?35:0,d=e.top>=0&&e.bottom<=window.innerHeight?25:0;return t.length*15+Math.min(60,n/20)+u+d-s*20-l*10}function Te(o){let e=o;for(;e.parentElement&&e.parentElement!==document.body&&e.parentElement!==document.documentElement;){let t=e.parentElement,n=t.tagName.toLowerCase();if(["header","footer","nav","aside"].includes(n))break;if(t.matches?.('article, section, form, [data-test-id*="exercise" i], [data-testid*="exercise" i], .perseus-renderer, .framework-perseus, [class*="question-container" i], .que, main')){e=t;break}let a=M(e.innerText,1e4),i=M(t.innerText,1e4),s=e.querySelectorAll(_).length,r=t.querySelectorAll(_).length;if(a.length<150&&i.length>a.length&&r<=s+4){e=t;continue}break}return e}function Je(o){let e=o,t=e.closest('main, [role="main"], article, form, [data-test-id*="exercise" i], [data-testid*="exercise" i], .framework-perseus, section');if(t&&t!==document.body&&T(t))return t;let n=0;for(;e.parentElement&&e.parentElement!==document.body&&n<3;)e=e.parentElement,n++;return e||document.body}function $(){let o=document.activeElement;if(o&&o!==document.body){let a=o.closest(Ke);if(a&&Ye(a)>0)return Te(a)}let t=Array.from(document.querySelectorAll(Ke)).map(a=>({element:a,score:Ye(a)})).filter(a=>Number.isFinite(a.score)).sort((a,i)=>i.score-a.score);if(t.length>0&&t[0].score>0)return Te(t[0].element);let n=document.querySelector('form, main, [role="main"]');return n&&T(n)?n:document.body}function Xe(o){let e=o.cloneNode(!0);e.querySelectorAll("script, style, iframe, object, embed, svg, canvas, noscript, audio, video").forEach(n=>n.remove());let t=["type","name","value","role","aria-label","aria-labelledby","aria-checked","aria-required","required","disabled","data-easyquiz-id","draggable","class","id","data-widget-type","data-role","data-category","data-testid"];return e.querySelectorAll("*").forEach(n=>{for(let a of Array.from(n.attributes))t.includes(a.name)||n.removeAttribute(a.name)}),e.outerHTML.replace(/\s+/g," ").slice(0,2e4)}function ie(o){let e=Array.from(o.querySelectorAll(_)),t=new Set,n=[];for(let a of e){if(!T(a)||V(a))continue;let i=a.tagName.toLowerCase();["input","textarea","select"].includes(i)&&(t.add(a),n.push(a))}for(let a of e){if(!T(a)||V(a))continue;let i=a.tagName.toLowerCase();if(["input","textarea","select"].includes(i))continue;let s=a.querySelector("input, textarea, select");if(!(s&&t.has(s))){if(a.hasAttribute("for")){let r=a.getAttribute("for"),l=r?a.ownerDocument.getElementById(r):null;if(l&&t.has(l))continue}if(i==="a"){let r=a.getAttribute("role");if(!(r==="button"||r==="radio"||r==="checkbox"||r==="option"||a.closest('[class*="choice" i], [class*="option" i], [class*="answer" i], [data-testid*="option" i]')))continue}n.push(a)}}return n.slice(0,100).map(a=>Ee(a,"answer"))}function Ce(o){let e=[o,o.parentElement,o.parentElement?.parentElement,document.body].filter(Boolean),t=new Set,n=[];for(let a of e)for(let i of Array.from(a.querySelectorAll(_)))if(!(t.has(i)||!T(i)||!V(i))&&(t.add(i),n.push(Ee(i,"navigation")),n.length>=10))return n;return n}function J(o=!1){let e=$();e=Te(e),o&&(e=Je(e));let t=ie(e),n=Ce(e);if(t.length===0){let r=ie(document.body);r.length>0&&(e=Je(e),t=ie(e),t.length===0&&(t=r,e=document.querySelector('main, article, form, [role="main"]')||document.body))}n.length===0&&(n=Ce(document.body));let a=e.innerText&&e.innerText.trim().length>0?e.innerText:e.textContent||"",i=M(a,16e3),s=[...t,...n].slice(0,120);return!i||s.length===0&&i.length<30?M(document.body.innerText||document.body.textContent||"",16e3).length>=30?G():null:{sourceUrl:window.location.href.slice(0,2e3),pageTitle:document.title.slice(0,500)||"P\xE1gina de Quest\xE3o",questionText:i,htmlSnippet:Xe(e),controls:s,scope:e}}function G(){let o=document.body.innerText||document.body.textContent||document.documentElement.textContent||"",e=M(o,16e3),t=ie(document.body),n=Ce(document.body),a=[...t,...n].slice(0,120),i=document.querySelector('main, article, form, [role="main"], [data-test-id*="content" i], [class*="content" i]')||document.body;return{sourceUrl:window.location.href.slice(0,2e3),pageTitle:document.title.slice(0,500)||"P\xE1gina de Quest\xE3o",questionText:e,htmlSnippet:Xe(i).slice(0,15e3),controls:a,scope:i}}function We(o){let e=o.controls.map(t=>`${t.role}:${t.id}:${t.type}:${t.value}:${t.disabled}`).join("|");return[window.location.href,o.pageTitle,o.questionText.slice(0,500),e].join("::")}function L(o){return o?!!(o.closest('#easyquiz-shadow-root, .eq-sidebar, .eq-launcher, [data-easyquiz-ignore="true"], .btn-inject-eq, #btn-inject-script')||o.getAttribute?.("data-easyquiz-ignore")==="true"):!1}function f(o){return o?o.replace(/^(\([0-9a-zA-Z]{1,2}\)|[0-9]{1,3}|[a-zA-Z])[\.\)\-\:]\s+/,"").replace(/[\.\u2026]{2,}/g," ").replace(/['"“”«»]/g,"").replace(/\s+/g," ").trim():""}function H(o){if(!o||o instanceof HTMLInputElement||o instanceof HTMLSelectElement||o instanceof HTMLTextAreaElement||o.getAttribute("draggable")==="true"||o.classList.contains("dnd-card")||o.hasAttribute("data-category")||o.hasAttribute("data-dropzone"))return o;if(o.hasAttribute("for")){let n=o.getAttribute("for");if(n){let a=o.ownerDocument.getElementById(n);if(a)return a}}let e=o.closest('label, .option-card, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, tr, li, .dnd-card, [class*="option-card" i], [class*="choice-card" i]');if(e&&!["article","section","main","form","body"].includes(e.tagName.toLowerCase())){let n=e.getAttribute("for"),i=(n?e.ownerDocument.getElementById(n):null)||e.querySelector('input:not([type="hidden"]), select, textarea');return i||e}let t=o.closest('button, a, [role="button"], [draggable="true"]');if(t)return t;if(["body","html","main","section","article","form"].includes(o.tagName.toLowerCase())){let n=o.querySelector('button, [role="button"], a, input:not([type="hidden"]), select, textarea, [role="radio"], [role="checkbox"], .option-card, label');if(n)return H(n)}return o}function Ze(o){let e=o;if(!e||!document.contains(e))try{e=$()}catch{}e=e||document.body;let t=Array.from(e.querySelectorAll("tr")).filter(i=>T(i)&&i.querySelector('input[type="radio"], input[type="checkbox"]'));if(t.length>1)return t;let n=Array.from(e.querySelectorAll('input[type="checkbox"], input[type="radio"], [role="checkbox"], [role="radio"]')).filter(i=>T(i)&&!L(i));return n.length>0?n:Array.from(e.querySelectorAll('.option-card, [role="option"], [class*="choice-card" i], [class*="option-card" i], li[class*="choice" i], li[class*="option" i]')).filter(i=>T(i)&&!L(i)).filter(i=>!i.parentElement?.closest('.option-card, [role="option"], [class*="choice-card" i], [class*="option-card" i]'))}function w(o,e){if(!o)return null;let t=o.trim().replace(/^["'“”«»]+|["'“”«»]+$/g,"");if(!t)return null;let n=CSS.escape(t),a=document.querySelector(`[data-easyquiz-id="${n}"]`);if(a&&!L(a)&&T(a))return H(a);try{let d=document.getElementById(t);if(d&&!L(d)&&T(d))return d.hasAttribute("data-category")||d.hasAttribute("data-dropzone")||d.classList.contains("dnd-zone")?d:H(d)}catch{}let i=t.match(/^(?:item|opção|opcao|afirmação|afirmacao|alternativa|linha|afirmativa|questão|questao|campo|blank|lacuna|input|resposta)?\s*#?([0-9]+)$/i);if(i){let d=parseInt(i[1],10)-1;if(d>=0){let p=Ze();if(d<p.length){let g=p[d];if(g.tagName.toLowerCase()==="tr"){if(e){let x=g.querySelector(`input[value="${CSS.escape(e)}" i], [data-value="${CSS.escape(e)}" i]`);if(x)return x}let b=g.querySelector("input");if(b)return b}return H(g)}let c=document.body;try{c=$()||document.body}catch{}let h=Array.from(c.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]), textarea, select, [contenteditable="true"]')).filter(g=>T(g)&&!L(g));if(d<h.length)return h[d]}}let s=t.match(/^(?:item|opção|opcao|afirmação|afirmacao|alternativa|linha|afirmativa|questão|questao)?\s*#?([a-eA-E])$/i);if(s){let d=s[1].toUpperCase().charCodeAt(0)-65;if(d>=0){let p=Ze();if(d<p.length){let c=p[d];if(c.tagName.toLowerCase()==="tr"){if(e){let g=c.querySelector(`input[value="${CSS.escape(e)}" i], [data-value="${CSS.escape(e)}" i]`);if(g)return g}let h=c.querySelector("input");if(h)return h}return H(c)}}}if(/^[a-zA-Z0-9_-]{1,10}$/.test(t)){let p=Array.from(document.querySelectorAll(`[data-category="${n}" i], [data-dropzone="${n}" i], [data-role="dropzone"][data-category="${n}" i]`)).find(b=>T(b)&&!L(b));if(p)return p;let h=Array.from(document.querySelectorAll(`input[value="${n}" i], [data-value="${n}" i], input[id="${n}" i], input[placeholder="${n}" i], textarea[placeholder="${n}" i], [title="${n}" i]`)).find(b=>T(b)&&!L(b));if(h)return H(h);let g=Array.from(document.querySelectorAll('.option-badge, [class*="badge" i], [class*="letter" i], .option-card span, label span')).find(b=>{if(!T(b)||L(b))return!1;let x=f(b.textContent).toLowerCase();return x===t.toLowerCase()||x===t.toLowerCase()+")"});if(g)return H(g)}try{let p=Array.from(document.querySelectorAll(`[name="${n}"], [value="${n}"], [placeholder="${n}" i], [title="${n}" i], [data-category="${n}" i], [data-dropzone="${n}" i], [data-testid="${n}" i], [data-test-id="${n}" i], [aria-label="${n}" i]`)).find(c=>T(c)&&!L(c));if(p)return p.hasAttribute("data-category")||p.hasAttribute("data-dropzone")||p.classList.contains("dnd-zone")?p:H(p)}catch{}if(/^[.#\[]|\s|[>+~:]/.test(t))try{let p=Array.from(document.querySelectorAll(t)).find(c=>T(c)&&!L(c));if(p)return H(p)}catch{}try{let d=t.replace(/"/g,""),p=`//button[normalize-space(.)="${d}"] | //a[normalize-space(.)="${d}"] | //*[not(*) and normalize-space(.)="${d}"] | //*[@aria-label="${d}"] | //*[@data-category="${d}"] | //*[@data-testid="${d}"]`,c=document.evaluate(p,document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);for(let h=0;h<c.snapshotLength;h++){let g=c.snapshotItem(h);if(g&&T(g)&&!L(g)){if(["body","html"].includes(g.tagName.toLowerCase())){let x=g.querySelector('button, [role="button"], a, input, [role="radio"], [role="checkbox"], label');if(x&&T(x))return H(x)}return g.closest('[data-role="dropzone"], [class*="category" i], [class*="bucket" i], [class*="column" i], [class*="drop" i]')||H(g)}}}catch{}let l=f(t).toLowerCase(),u=Array.from(document.querySelectorAll('button, a, div, span, li, p, label, input, textarea, select, [draggable="true"], [data-testid], [class*="option" i], [class*="card" i], [class*="item" i], [class*="choice" i], [class*="category" i], [class*="bucket" i]'));for(let d of u){if(!T(d)||L(d)||d.closest("header, nav, .stepper, .step-item, .progress-bar-container")||!!(d.matches('article, section, form, main, [class*="container" i], [class*="grid" i], .dnd-pool, .dnd-zones')||d.querySelector('label, [role="radio"], [role="checkbox"], .dnd-card, [draggable="true"], .option-card, tr'))&&!d.matches(".dnd-zone, [data-category], [data-dropzone]"))continue;let c=f(d.textContent).toLowerCase(),h=f(d.getAttribute("aria-label")||"").toLowerCase(),g=f(d.getAttribute("placeholder")||"").toLowerCase(),b=f(d.getAttribute("title")||"").toLowerCase(),x=f(d.getAttribute("name")||"").toLowerCase(),m=f(d.getAttribute("data-category")||"").toLowerCase(),v=d instanceof HTMLInputElement||d instanceof HTMLButtonElement?d.value:"",C=f(v).toLowerCase(),q=c.startsWith(l+")")||c.startsWith(l+".")||c.startsWith(l+" -")||c.startsWith(l+":");if(c===l||h===l||g===l||b===l||x===l||m&&m===l||C&&C===l||q)return d.closest('[data-role="dropzone"], [class*="category" i], [class*="bucket" i], [class*="column" i], [class*="drop" i]')||H(d)}if(l.length>=3)for(let d of u){if(!T(d)||L(d)||d.closest("header, nav, .stepper, .step-item, .progress-bar-container")||!!(d.matches('article, section, form, main, [class*="container" i], [class*="grid" i], .dnd-pool, .dnd-zones')||d.querySelector('label, [role="radio"], [role="checkbox"], .dnd-card, [draggable="true"], .option-card, tr'))&&!d.matches(".dnd-zone, [data-category], [data-dropzone]"))continue;let c=f(d.textContent).toLowerCase(),h=f(d.getAttribute("aria-label")||"").toLowerCase(),g=f(d.getAttribute("placeholder")||"").toLowerCase(),b=f(d.getAttribute("title")||"").toLowerCase(),x=f(d.getAttribute("name")||"").toLowerCase();if(c.includes(l)||h.includes(l)||g.includes(l)||b.includes(l)||x.includes(l)){if(Array.from(d.children).some(q=>{let E=f(q.textContent).toLowerCase();return E&&E.includes(l)}))continue;return d.closest('[data-role="dropzone"], [class*="category" i], [class*="bucket" i], [class*="column" i], [class*="drop" i]')||H(d)}let m=l.split(/\s+/).filter(Boolean);if(m.length>=3){let v=m.slice(0,Math.min(5,m.length)).join(" ");if(c.includes(v)||h.includes(v)||g.includes(v))return H(d)}}return null}function tt(o,e){for(let t of e)o.dispatchEvent(new Event(t,{bubbles:!0,composed:!0}))}function z(o,e){if(!o)return;let t=o instanceof HTMLInputElement&&["checkbox","radio"].includes(o.type)?o:o.querySelector('input[type="checkbox"], input[type="radio"]')||(o.hasAttribute("for")?o.ownerDocument.getElementById(o.getAttribute("for")):null);if(t&&o!==t){if(t.type==="checkbox"){P(t,!0);return}if(t.type==="radio"){P(t,!0);return}}try{o.scrollIntoView({block:"center",inline:"center",behavior:"instant"})}catch{}try{o.focus?.()}catch{}if(o instanceof HTMLButtonElement||o instanceof HTMLAnchorElement||o instanceof HTMLInputElement&&!["checkbox","radio"].includes(o.type)){try{o.click()}catch{}return}let a=o.getBoundingClientRect(),i=e?e[0]:Math.round(a.left+Math.max(1,a.width/2)),s=e?e[1]:Math.round(a.top+Math.max(1,a.height/2)),r={bubbles:!0,cancelable:!0,composed:!0,view:window,clientX:i,clientY:s};try{o.dispatchEvent(new PointerEvent("pointerdown",{...r,button:0,buttons:1}))}catch{}try{o.dispatchEvent(new MouseEvent("mousedown",{...r,button:0,buttons:1}))}catch{}try{o.dispatchEvent(new PointerEvent("pointerup",{...r,button:0,buttons:0}))}catch{}try{o.dispatchEvent(new MouseEvent("mouseup",{...r,button:0,buttons:0}))}catch{}try{o.dispatchEvent(new MouseEvent("click",{...r,button:0,buttons:0}))}catch{}try{o.click()}catch{}}function se(o,e){let t=o;if(t.hasAttribute("for")){let s=t.getAttribute("for"),r=t.ownerDocument.getElementById(s);r&&(t=r)}if(!(t instanceof HTMLInputElement)&&!(t instanceof HTMLTextAreaElement)&&!(t instanceof HTMLSelectElement)&&!t.isContentEditable){let s=t.querySelector('input:not([type="hidden"]), textarea, select, [contenteditable="true"]');s&&(t=s)}if(t instanceof HTMLButtonElement||t.tagName.toLowerCase()==="a"||t.getAttribute("role")==="button"||t instanceof HTMLInputElement&&["button","submit","reset","image"].includes(t.type)){let s=t.parentElement?.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(s)t=s;else{let r=document.body;try{r=$()||document.body}catch{}let l=r.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(l)t=l;else{console.warn("[EasyQuiz] setNativeValue: Nenhum campo de texto encontrado para receber o valor.");return}}}if(t instanceof HTMLSelectElement){ke(t,[e]);return}if(t instanceof HTMLInputElement&&["checkbox","radio"].includes(t.type)){let s=["true","1","checked","yes","sim"].includes(e.toLowerCase())||e===t.value;P(t,s);return}let a=String(e??"");try{t.scrollIntoView?.({block:"center",inline:"center",behavior:"instant"}),t.focus?.()}catch{}let i=!1;try{if(t instanceof HTMLInputElement||t instanceof HTMLTextAreaElement){if(t.type!=="number"){try{t.select?.()}catch{}i=document.execCommand?.("insertText",!1,a)||!1}}else if(t.isContentEditable){try{document.execCommand?.("selectAll",!1,void 0)}catch{}i=document.execCommand?.("insertText",!1,a)||!1}}catch{}if(t instanceof HTMLInputElement||t instanceof HTMLTextAreaElement){try{let l=t._valueTracker;l&&l.setValue(a===""?" ":"")}catch{}let s=t instanceof HTMLTextAreaElement?HTMLTextAreaElement.prototype:HTMLInputElement.prototype,r=Object.getOwnPropertyDescriptor(s,"value")?.set;r?r.call(t,a):t.value=a;try{t.dispatchEvent(new KeyboardEvent("keydown",{bubbles:!0,cancelable:!0,key:a.slice(-1)||"a"}))}catch{}try{t.dispatchEvent(new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,composed:!0,data:a,inputType:"insertText"}))}catch{}try{t.dispatchEvent(new InputEvent("input",{bubbles:!0,cancelable:!0,composed:!0,data:a,inputType:"insertText"}))}catch{t.dispatchEvent(new Event("input",{bubbles:!0,cancelable:!0,composed:!0}))}try{t.dispatchEvent(new KeyboardEvent("keyup",{bubbles:!0,cancelable:!0,key:a.slice(-1)||"a"}))}catch{}try{t.dispatchEvent(new Event("change",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}try{t.dispatchEvent(new FocusEvent("blur",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}if(t.value!==a){t.value=a;try{r?.call(t,a)}catch{}}return}if(t.isContentEditable){if(t.textContent?.trim()!==a.trim()){t.textContent=a;try{t.innerText=a}catch{}}try{t.dispatchEvent(new InputEvent("input",{bubbles:!0,cancelable:!0,composed:!0,data:a,inputType:"insertText"}))}catch{t.dispatchEvent(new Event("input",{bubbles:!0,cancelable:!0,composed:!0}))}try{t.dispatchEvent(new Event("change",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}try{t.dispatchEvent(new FocusEvent("blur",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}return}try{t.value=a,t.textContent=a,t.dispatchEvent(new Event("input",{bubbles:!0,cancelable:!0,composed:!0})),t.dispatchEvent(new Event("change",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}}function Me(o,e=""){if(!o)return e;let t=/^(eq-|#|\$|\.|input_|mat-|choice_|radio_|chk_)/i.test(o),n=f(o),a=w(o)||w(n);if(!a)return t?e:n||e;let i=a.closest('label, .option-card, [class*="choice" i], [class*="option" i], .quiz-option, tr, td, li');if(i){let d=f(i.textContent);if(d&&d.length>0&&d.length<150)return d}if(a.id){let d=document.querySelector(`label[for="${CSS.escape(a.id)}"]`);if(d){let p=f(d.textContent);if(p&&p.length>0&&p.length<150)return p}}let s=a.getAttribute("aria-label");if(s)return f(s);let r=a.getAttribute("placeholder");if(r)return f(r);let l=f(a.textContent);if(l&&l.length>0&&l.length<120)return l;let u=a instanceof HTMLInputElement||a instanceof HTMLButtonElement?a.value:"";return u?f(u):t?e:n||e}function P(o,e){let t=o.closest('.option-card, label, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, [class*="option" i], [class*="choice" i], li')||o,n=o instanceof HTMLInputElement&&["checkbox","radio"].includes(o.type)?o:t.querySelector('input[type="checkbox"], input[type="radio"]');if(!n&&t.hasAttribute("for")&&(n=t.ownerDocument.getElementById(t.getAttribute("for"))),t){let a=e?"true":"false";t.setAttribute("aria-checked",a),t.setAttribute("aria-selected",a),t.classList.toggle("selected",e),t.classList.toggle("active",e),t.classList.toggle("checked",e)}if(n){if(n.checked===e)return;try{n.focus?.(),n.click()}catch{}if(n.checked!==e){try{let a=n._valueTracker;a&&a.setValue(!e)}catch{}try{Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"checked")?.set?.call(n,e)}catch{}n.checked=e,tt(n,["input","change"])}}else{try{t.focus?.()}catch{}try{t.click()}catch{z(t)}}}function ke(o,e){let t=o instanceof HTMLSelectElement?o:o.querySelector("select");if(t){let a=e.map(s=>f(s).toLowerCase()),i=!1;for(let s=0;s<t.options.length;s++){let r=t.options[s],l=r.value.toLowerCase(),u=f(r.textContent).toLowerCase();if(a.some(p=>p===l||p===u)){if(r.selected=!0,t.selectedIndex=s,i=!0,!t.multiple)break}else t.multiple||(r.selected=!1)}if(!i)for(let s=0;s<t.options.length;s++){let r=t.options[s],l=r.value.toLowerCase(),u=f(r.textContent).toLowerCase();if(a.some(p=>l.includes(p)||u.includes(p)||p.length>3&&(p.includes(l)||p.includes(u)))&&(r.selected=!0,t.selectedIndex=s,i=!0,!t.multiple))break}if(i){tt(t,["input","change","blur"]);return}}let n=o.closest('[role="combobox"], [class*="select" i], [class*="dropdown" i]');if(n){z(n);for(let a of e){let i=w(a);if(i){z(i);return}}}}function Et(o,e){try{let t=new DataTransfer;try{t.setData("text/plain",o)}catch{}try{t.setData("text/html",e)}catch{}return t}catch{return null}}function Se(o){try{o.click()}catch{let e=o.ownerDocument.defaultView||window;o.dispatchEvent(new e.MouseEvent("click",{bubbles:!0,cancelable:!0,composed:!0,view:e}))}}function B(o,e){let t=f(o).toLowerCase();if(!t)return null;let n=e==="source"?'.dnd-card, [draggable="true"]':'[data-dropzone], [data-category], [data-role="dropzone"]',a=Array.from(document.querySelectorAll(n)),i=e==="destination"?a.find(s=>[s.getAttribute("data-category"),s.getAttribute("data-dropzone")].some(r=>r?.trim().toLowerCase()===t)):null;return i&&T(i)&&!L(i)?i:a.find(s=>{if(!T(s)||L(s))return!1;let r=f(`${s.textContent||""} ${s.getAttribute("data-category")||""} ${s.getAttribute("data-dropzone")||""}`).toLowerCase();return r===t||r.includes(t)})||null}async function re(o,e,t=1){try{o.scrollIntoView({block:"center",inline:"center",behavior:"instant"})}catch{}let n=o.getBoundingClientRect(),a=e.getBoundingClientRect(),i=Math.round(n.left+Math.max(1,n.width/2)),s=Math.round(n.top+Math.max(1,n.height/2)),r=Math.round(a.left+Math.max(1,a.width/2)),l=Math.round(a.top+Math.max(1,a.height/2)),u=f(e.textContent).toLowerCase();if(u){let b=Array.from(o.querySelectorAll('button, [role="button"], input[type="radio"], input[type="checkbox"], option, .btn, [class*="tag" i]')).find(x=>{let m=f(x.textContent).toLowerCase(),v=x instanceof HTMLInputElement||x instanceof HTMLOptionElement?f(x.value).toLowerCase():"";return m&&(u.includes(m)||m.includes(u))||v&&(u.includes(v)||v.includes(u))});b&&(z(b),await new Promise(x=>setTimeout(x,120)))}Se(o),await new Promise(g=>setTimeout(g,140)),Se(e);let d=e.querySelector('[data-role="dropzone"], [class*="bucket" i], [class*="slot" i], [class*="drop" i], [class*="target" i], [class*="items" i], ul, ol');if(d&&d!==e&&Se(d),await new Promise(g=>setTimeout(g,100)),!e.contains(o)&&o.matches('.dnd-card, [draggable="true"]')&&e.matches('.dnd-zone, [data-dropzone], [data-role="dropzone"]')&&e.appendChild(o),e.contains(o)&&o.matches('.dnd-card, [draggable="true"]'))return;let p={bubbles:!0,cancelable:!0,composed:!0,view:window,clientX:i,clientY:s,screenX:i,screenY:s,button:0,buttons:1};try{o.dispatchEvent(new PointerEvent("pointerdown",{...p,isPrimary:!0,pointerId:1,pointerType:"mouse",pressure:.5}))}catch{}o.dispatchEvent(new MouseEvent("mousedown",p));let c=4;for(let g=1;g<=c;g++){let b=Math.round(i+(r-i)*(g/c)),x=Math.round(s+(l-s)*(g/c)),m={...p,clientX:b,clientY:x,screenX:b,screenY:x};try{o.dispatchEvent(new PointerEvent("pointermove",{...m,isPrimary:!0,pointerId:1,pointerType:"mouse",pressure:.5}))}catch{}document.dispatchEvent(new MouseEvent("mousemove",m))}let h={bubbles:!0,cancelable:!0,composed:!0,view:window,clientX:r,clientY:l,screenX:r,screenY:l,button:0,buttons:0};try{e.dispatchEvent(new PointerEvent("pointerup",{...h,isPrimary:!0,pointerId:1,pointerType:"mouse",pressure:0}))}catch{}e.dispatchEvent(new MouseEvent("mouseup",h)),e.dispatchEvent(new MouseEvent("click",h));try{let g=Et(M(o.textContent),o.outerHTML),b={...p},x={...h};g&&(b.dataTransfer=g,x.dataTransfer=g);let m=o.ownerDocument.defaultView?.DragEvent;if(!m)throw new Error("DragEvent n\xE3o dispon\xEDvel neste documento");o.dispatchEvent(new m("dragstart",b)),e.dispatchEvent(new m("dragenter",x)),e.dispatchEvent(new m("dragover",x)),e.dispatchEvent(new m("drop",x)),o.dispatchEvent(new m("dragend",b))}catch(g){console.warn("[EasyQuiz] DragEvent ignorado com seguran\xE7a:",g)}try{let g=new Touch({identifier:1,target:o,clientX:i,clientY:s}),b=new Touch({identifier:1,target:e,clientX:r,clientY:l});o.dispatchEvent(new TouchEvent("touchstart",{bubbles:!0,cancelable:!0,touches:[g]})),e.dispatchEvent(new TouchEvent("touchmove",{bubbles:!0,cancelable:!0,touches:[b]})),e.dispatchEvent(new TouchEvent("touchend",{bubbles:!0,cancelable:!0,touches:[]}))}catch{}if(t>=2&&!e.contains(o))try{o.focus?.(),o.dispatchEvent(new KeyboardEvent("keydown",{key:" ",code:"Space",bubbles:!0})),o.dispatchEvent(new KeyboardEvent("keyup",{key:" ",code:"Space",bubbles:!0})),await new Promise(g=>setTimeout(g,80)),e.focus?.(),e.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",bubbles:!0})),e.dispatchEvent(new KeyboardEvent("keyup",{key:"Enter",code:"Enter",bubbles:!0}))}catch{}}var ot={fill:(o,e)=>{let t=w(o);t?se(t,e):console.warn(`$eq.fill: Elemento '${o}' n\xE3o encontrado`)},click:o=>{let e=w(o);e?!!(e.closest('.option-card, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, [class*="option" i], [class*="choice" i]')||e.querySelector('input[type="radio"], input[type="checkbox"]')||e instanceof HTMLInputElement&&["checkbox","radio"].includes(e.type))?P(e,!0):z(e):console.warn(`$eq.click: Elemento '${o}' n\xE3o encontrado`)},check:(o,e)=>{let t=w(o);t?P(t,e):console.warn(`$eq.check: Elemento '${o}' n\xE3o encontrado`)},find:(o,e)=>w(o,e),drag:(o,e)=>{let t=B(o,"source")||w(o),n=B(e,"destination")||w(e);t&&n?re(t,n):console.warn(`$eq.drag: Origem ou destino n\xE3o encontrado ('${o}' -> '${e}')`)},categorize:async(o,e)=>{let t=B(o,"source")||w(o),n=B(e,"destination")||w(e);if(!t||!n){console.warn(`$eq.categorize: Item ou categoria n\xE3o encontrados ('${o}' -> '${e}')`);return}await re(t,n)},execute:(o,e=!1,t=1)=>He(o,e,t)};window.$eq=ot;async function Tt(o,e=1,t=Y()){if(xe(o,t),o.t==="js"){let s=String(o.v||"");Qe(s);try{new Function("$eq","document","window",s)(ot,document,window)}catch(r){throw console.warn("[EasyQuiz JS Execution]",r),r}return}if(o.t==="drag"){let s=B(o.from,"source")||w(o.from),r=B(o.to,"destination")||w(o.to);!s&&o.from&&(s=w(f(o.from))),!r&&o.to&&(r=w(f(o.to))),s&&r?await re(s,r,e):console.warn(`[EasyQuiz] Drag: alvo n\xE3o encontrado ('${o.from}' -> '${o.to}')`);return}let n=o.id||"",a=o.v!==void 0?String(o.v).trim():"",i=w(n,a);if(!i&&n&&(i=w(f(n),a)),i&&a){if(i instanceof HTMLInputElement&&i.type==="radio"&&i.name){if(f(i.value).toLowerCase()!==f(a).toLowerCase()){let s=document.querySelector(`input[type="radio"][name="${CSS.escape(i.name)}"][value="${CSS.escape(a)}" i]`);if(s)i=s;else{let l=Array.from(document.querySelectorAll(`input[type="radio"][name="${CSS.escape(i.name)}"]`)).find(u=>{let d=u.closest("label, .vf-label, .option-card, tr, td, div");return d&&f(d.textContent).toLowerCase().includes(f(a).toLowerCase())});l&&(i=l)}}}else if(!(i instanceof HTMLInputElement)&&!(i instanceof HTMLSelectElement)&&!(i instanceof HTMLTextAreaElement)){let s=i.querySelector(`input[value="${CSS.escape(a)}" i], [data-value="${CSS.escape(a)}" i]`);if(s)i=s;else{let l=Array.from(i.querySelectorAll('input[type="radio"], input[type="checkbox"]')).find(u=>{let d=u.closest("label, .vf-label, .option-card, td, div");return d&&f(d.textContent).toLowerCase().includes(f(a).toLowerCase())});l&&(i=l)}}}if(!i&&o.t==="val"){let s=Array.from(document.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]')).filter(r=>T(r)&&!L(r));if(s.length===1)i=s[0];else if(s.length>1){let r=f(n).toLowerCase();i=s.find(u=>{let d=(u.getAttribute("placeholder")||"").toLowerCase(),p=(u.name||"").toLowerCase(),c=(u.getAttribute("aria-label")||"").toLowerCase(),h=(u.id||"").toLowerCase();return d.includes(r)||p.includes(r)||c.includes(r)||h.includes(r)})||s[0]}}if(!i&&o.t!=="adv"){console.warn(`[EasyQuiz] Alvo '${n}' n\xE3o encontrado para a\xE7\xE3o '${o.t}'. Prosseguindo...`);return}switch(o.t){case"val":if(i){let r=i instanceof HTMLInputElement||i instanceof HTMLTextAreaElement||i instanceof HTMLSelectElement||i.isContentEditable?i:i.querySelector('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]');if(!r){let l=document.body;try{l=$()||document.body}catch{}let u=Array.from(l.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]')).filter(d=>T(d)&&!L(d));u.length>0&&(r=u[0])}se(r||i,String(o.v))}break;case"chk":i&&P(i,!!o.c);break;case"sel":if(i){let r=Array.isArray(o.v)?o.v:[String(o.v)];ke(i,r)}break;case"clk":if(i)if(!!(i.closest('.option-card, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice')||i.querySelector('input[type="radio"], input[type="checkbox"]')||i instanceof HTMLInputElement&&["checkbox","radio"].includes(i.type))){let l=o.c!==void 0?!!o.c:!0;P(i,l)}else z(i,o.co);break;case"adv":let s=Ae(o.id);if(s){await Le(s,1200);let r=o.id||s.textContent?.trim()||"";r&&fe(window.location.hostname,{advanceSelector:r}),z(s)}else console.warn("[EasyQuiz] Bot\xE3o de avan\xE7o n\xE3o localizado.");break}}function Ct(){let o=["button","a",'[role="button"]','input[type="submit"]','input[type="button"]','[data-testid*="check" i]','[data-test-id*="check" i]'].join(",");return Array.from(document.querySelectorAll(o)).find(t=>{if(!T(t)||L(t)||t.closest("header, nav, aside"))return!1;let n=t instanceof HTMLInputElement||t instanceof HTMLButtonElement?t.value:"",a=(t.textContent||n||t.getAttribute("aria-label")||"").trim();return/(verificar|checar|check|conferir|validar|enviar|responder)/i.test(a)})||null}function Ae(o){if(o){let i=w(o);if(i&&T(i)&&!L(i))return i}try{let i=Q(window.location.hostname);if(i.advanceSelector){let s=w(i.advanceSelector);if(s&&T(s)&&!L(s))return s}}catch{}let e=["button","a",'[role="button"]','[role="link"]','input[type="button"]','input[type="submit"]','[data-testid*="next" i]','[data-testid*="continue" i]','[data-testid*="check" i]','[data-test-id*="next" i]','[data-test-id*="continue" i]','[data-test-id*="check" i]','[class*="next" i]','[class*="continue" i]','[class*="proximo" i]','[class*="avancar" i]'].join(","),n=Array.from(document.querySelectorAll(e)).filter(i=>T(i)&&!L(i)&&!i.closest("header, nav, aside"));for(let i of n)if(V(i))return i;for(let i of n){let s=i instanceof HTMLInputElement||i instanceof HTMLButtonElement?i.value:"",r=(i.textContent||s||i.getAttribute("aria-label")||"").trim();if(ae.test(r))return i}let a=document.querySelector('[data-test-id*="next" i], [data-testid*="next" i], [aria-label*="next" i], [aria-label*="pr\xF3xim" i], [aria-label*="avan\xE7ar" i], [aria-label*="continuar" i]');return a&&T(a)&&!L(a)?a:null}async function Le(o,e=1500){let t=Date.now();for(;Date.now()-t<e;){if(!(o.disabled===!0||o.getAttribute("aria-disabled")==="true"||o.classList.contains("disabled")||o.getAttribute("disabled")!==null))return;await new Promise(a=>setTimeout(a,100))}}function nt(){let o=(document.body?.innerText||document.body?.textContent||"").replace(/\s+/g," ").trim(),e=document.querySelectorAll('input, textarea, select, button, [role="button"], [role="option"]').length;return`${window.location.href}|${document.title}|${o.slice(0,900)}|${e}`}async function St(o,e=1800){let t=Date.now();for(;Date.now()-t<e;){if(nt()!==o)return{changed:!0,evidence:"URL, texto, t\xEDtulo ou conjunto de controles mudou ap\xF3s a a\xE7\xE3o."};await new Promise(a=>setTimeout(a,100))}return{changed:!1,evidence:"Nenhuma mudan\xE7a observ\xE1vel foi detectada dentro do tempo limite."}}async function et(o){if(o.t==="js"||o.t==="adv")return;if(o.t==="drag"){let a=w(o.from)||w(f(o.from)),i=w(o.to)||w(f(o.to));a&&i&&await re(a,i,2);return}let e=o.id||"",t=o.v!==void 0?String(o.v).trim():"",n=w(e,t)||w(f(e),t);if(o.t==="clk"||o.t==="chk"){if(!n&&e){let i=Array.from(document.querySelectorAll('input, label, button, [role="radio"], [role="checkbox"], .option-card, [class*="option" i], [class*="choice" i]')),s=f(e).toLowerCase();n=i.find(r=>{let l=f(r.textContent).toLowerCase(),u=f(r.value||"").toLowerCase();return l.includes(s)||u===s||l.startsWith(s+")")||l.startsWith("("+s+")")})||null}let a=o.v!==void 0?String(o.v).trim():"";if(n&&a){if(n instanceof HTMLInputElement&&n.type==="radio"&&n.name){if(f(n.value).toLowerCase()!==f(a).toLowerCase()){let i=document.querySelector(`input[type="radio"][name="${CSS.escape(n.name)}"][value="${CSS.escape(a)}" i]`);if(i)n=i;else{let r=Array.from(document.querySelectorAll(`input[type="radio"][name="${CSS.escape(n.name)}"]`)).find(l=>{let u=l.closest("label, .vf-label, .option-card, tr, td, div");return u&&f(u.textContent).toLowerCase().includes(f(a).toLowerCase())});r&&(n=r)}}}else if(!(n instanceof HTMLInputElement)&&!(n instanceof HTMLSelectElement)&&!(n instanceof HTMLTextAreaElement)){let i=n.querySelector(`input[value="${CSS.escape(a)}" i], [data-value="${CSS.escape(a)}" i]`);if(i)n=i;else{let r=Array.from(n.querySelectorAll('input[type="radio"], input[type="checkbox"]')).find(l=>{let u=l.closest("label, .vf-label, .option-card, td, div");return u&&f(u.textContent).toLowerCase().includes(f(a).toLowerCase())});r&&(n=r)}}}if(n){let i=n.closest('.option-card, label, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, li')||n,s=n instanceof HTMLInputElement&&["radio","checkbox"].includes(n.type)?n:i.querySelector('input[type="radio"], input[type="checkbox"]')||(i.getAttribute("for")?i.ownerDocument.getElementById(i.getAttribute("for")):null),r=o.t==="chk"||o.c!==void 0?!!o.c:!0;if(P(s||i,r),s&&s.checked!==r){try{let l=s._valueTracker;l&&l.setValue(!r)}catch{}try{Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"checked")?.set?.call(s,r)}catch{}s.checked=r,s.dispatchEvent(new Event("input",{bubbles:!0,composed:!0})),s.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}}return}if(o.t==="val"){let a=null;if(n&&(a=n instanceof HTMLInputElement||n instanceof HTMLTextAreaElement||n.isContentEditable?n:n.querySelector('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]')),!a){let i=document.body;try{i=$()||document.body}catch{}let s=Array.from(i.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]')),r=f(e).toLowerCase();a=s.find(l=>{let u=(l.getAttribute("placeholder")||"").toLowerCase(),d=(l.name||"").toLowerCase(),p=(l.id||"").toLowerCase(),c=(l.getAttribute("aria-label")||"").toLowerCase();return u.includes(r)||d.includes(r)||p.includes(r)||c.includes(r)})||(s.length>0?s[0]:null)}if(a){let i=String(o.v??"");try{if(a.focus?.(),a.type!=="number"){try{a.select?.()}catch{}document.execCommand?.("insertText",!1,i)}}catch{}se(a,i)}return}if(o.t==="sel"){if(!n&&e){let a=Array.from(document.querySelectorAll("select")),i=f(e).toLowerCase();n=a.find(s=>{let r=(s.name||"").toLowerCase(),l=(s.id||"").toLowerCase(),u=(s.getAttribute("aria-label")||"").toLowerCase();return r.includes(i)||l.includes(i)||u.includes(i)})||null}if(n){let a=Array.isArray(o.v)?o.v:[String(o.v)];ke(n,a)}return}}function j(o){try{if(o.t==="val"){let e=o.v!==void 0?String(o.v).trim():"",t=w(o.id,e)||w(f(o.id),e);if(!t){let u=document.body;try{u=$()||document.body}catch{}let d=Array.from(u.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]')).filter(p=>T(p)&&!L(p));d.length>0&&(t=d[0])}if(!t)return!1;let n=String(o.v??"").trim(),a=t instanceof HTMLInputElement&&t.type==="radio"?t:t.querySelector('input[type="radio"]');if(a&&a.name){let u=document.querySelector(`input[type="radio"][name="${CSS.escape(a.name)}"]:checked`);if(!u)return!1;let d=f(u.value).toLowerCase(),p=f(n).toLowerCase(),c=f(u.closest("label, .vf-label, .option-card, tr, td, div")?.textContent||"").toLowerCase();return d===p||c===p||c.includes(p)}let i=t instanceof HTMLInputElement||t instanceof HTMLTextAreaElement?t:t.querySelector('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]'),s=(i?i.value??i.textContent??"":t.textContent??"").trim();if(!s&&!n)return!0;if(!s&&n)return!1;let r=s.replace(",",".").replace(/\s+/g,"").toLowerCase(),l=n.replace(",",".").replace(/\s+/g,"").toLowerCase();return r===l||r.includes(l)||l.includes(r)||s.toLowerCase()===n.toLowerCase()}if(o.t==="sel"){let e=w(o.id)||w(f(o.id));if(!e)return!1;let t=e instanceof HTMLSelectElement?e:e.querySelector("select");if(!t)return!1;let a=(Array.isArray(o.v)?o.v:[String(o.v)]).map(i=>f(i).toLowerCase());return Array.from(t.options).some(i=>{if(!i.selected)return!1;let s=i.value.toLowerCase(),r=f(i.textContent).toLowerCase();return a.some(l=>l===s||l===r||s.includes(l)||r.includes(l))})}if(o.t==="chk"||o.t==="clk"){let e=o.v!==void 0?String(o.v).trim():"",t=w(o.id,e)||w(f(o.id),e);if(!t)return!1;let n=t.closest('.option-card, label, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, li')||t,a=t instanceof HTMLInputElement&&["checkbox","radio"].includes(t.type)?t:n.querySelector('input[type="checkbox"], input[type="radio"]')||(n.getAttribute("for")?n.ownerDocument.getElementById(n.getAttribute("for")):null),i=o.t==="chk"||o.c!==void 0?!!o.c:!0;if(a&&a.type==="radio"&&o.v){let d=f(String(o.v)).toLowerCase();if(a.name){let p=document.querySelector(`input[type="radio"][name="${CSS.escape(a.name)}"]:checked`);return p?f(p.value).toLowerCase()===d:!1}}if(a&&["checkbox","radio"].includes(a.type))return a.checked===i;let s=n.getAttribute("aria-checked")===String(i)||n.getAttribute("aria-selected")===String(i)||n.getAttribute("aria-pressed")===String(i),r=i?n.getAttribute("data-selected")==="true"||n.getAttribute("data-checked")==="true"||n.getAttribute("data-active")==="true"||n.getAttribute("data-state")==="checked"||n.getAttribute("data-state")==="on":n.getAttribute("data-selected")==="false"||n.getAttribute("data-checked")==="false"||n.getAttribute("data-state")==="unchecked",l=i?/active|selected|checked|picked|correct|is-selected|choice-selected|selected-option|is-checked|chosen|current|highlight|ring|border-primary/i.test(n.className||""):!/active|selected|checked|picked|correct|is-selected|choice-selected|selected-option|is-checked|chosen|current|highlight|ring|border-primary/i.test(n.className||"");return!!(s||r||l||(n instanceof HTMLButtonElement||n.getAttribute("role")==="button")&&o.t==="clk"||o.t==="clk"&&!a)}if(o.t==="drag"){let e=w(o.from)||w(f(o.from)),t=w(o.to)||w(f(o.to));return!e||!t?!1:t.contains(e)?!0:/placed|dropped|assigned|matched|done|selected/i.test(e.className||"")||e.getAttribute("data-placed")==="true"}}catch{}return!1}async function He(o,e,t=1,n=Y({engine:"smart",autoAdvance:e})){let a=o.actions.filter(m=>m.t!=="adv"),i=o.actions.filter(m=>m.t==="adv"),s=0,r=[],l=new Map,u=o.pageType==="question",d=a.filter(m=>m.t==="chk"||m.t==="clk"&&m.c!==void 0);if(u&&d.length>0){let m=document.body;try{m=$()||document.body}catch{}let v=Array.from(m.querySelectorAll('input[type="checkbox"], [role="checkbox"]')).filter(C=>T(C)&&!L(C));if(v.length>1){let C=new Set;for(let q of d){let E=q.t==="chk"?!!q.c:!!(q.c??!0),A="id"in q&&typeof q.id=="string"?q.id:"";if(E&&A){let S=w(A,q.v);if(S){let k=S instanceof HTMLInputElement&&S.type==="checkbox"?S:S.querySelector('input[type="checkbox"]');C.add(k||S)}}}if(C.size>0)for(let q of v)C.has(q)||(q instanceof HTMLInputElement&&q.checked||q.getAttribute("aria-checked")==="true"||q.closest(".option-card, label")?.classList.contains("selected"))&&P(q,!1)}}for(let m of a){try{await Tt(m,t,n),s++}catch(v){l.set(m,v instanceof Error?v.message:String(v)),console.warn("[EasyQuiz] A\xE7\xE3o declarativa prim\xE1ria falhou com seguran\xE7a:",m,v)}await new Promise(v=>setTimeout(v,m.t==="drag"?250:70))}await new Promise(m=>setTimeout(m,a.length>0?300:50));let p=0;for(let m of a){if(j(m)){p++;continue}console.warn(`[EasyQuiz Auto-Cura] A\xE7\xE3o '${m.t}' no alvo '${m.id||m.from||""}' n\xE3o verificada no DOM. Disparando Passagem 2 de conting\xEAncia...`);try{xe(m,n),await et(m)}catch(v){l.set(m,v instanceof Error?v.message:String(v)),console.warn("[EasyQuiz Auto-Cura] Rota alternativa falhou:",v)}await new Promise(v=>setTimeout(v,180)),j(m)&&(console.log("[EasyQuiz Auto-Cura] \u2713 A\xE7\xE3o recuperada com sucesso pela rota de conting\xEAncia!"),p++)}if(p<a.length&&a.length>0){console.warn(`[EasyQuiz Auto-Cura] ${a.length-p} de ${a.length} a\xE7\xE3o(\xF5es) ainda n\xE3o verificadas. Disparando Passagem 3 final...`),await new Promise(m=>setTimeout(m,200));for(let m of a)if(!j(m))try{await et(m)}catch(v){l.set(m,v instanceof Error?v.message:String(v))}await new Promise(m=>setTimeout(m,200)),p=0;for(let m of a)j(m)&&p++}for(let m of a)j(m)||r.push(m.t==="drag"?`${m.from} -> ${m.to}`:"id"in m?m.id:m.t);let c=a.map((m,v)=>{let C=m.t==="drag"?`${m.from} -> ${m.to}`:m.t==="js"?"$eq":m.id||m.t,q=m.t==="js"?!0:m.t==="drag"?!!(B(m.from,"source")&&B(m.to,"destination")):!!(w(m.id||"")||w(f(m.id||""))),E=j(m);return{index:v,action:m,target:C,located:q,applied:!l.has(m),verified:E,strategy:m.t==="drag"?"drag-adaptive":m.t==="js"?"javascript":"declarative-dom",evidence:E?"estado do controle confirmado no DOM":"nenhuma evid\xEAncia suficiente ap\xF3s as tentativas",...l.has(m)?{error:l.get(m)}:{}}}),h=!u||a.length===0?!0:s>0&&(s===a.length||p>0),g=!1,b=!1,x="Nenhuma a\xE7\xE3o de navega\xE7\xE3o solicitada.";if(e&&(h||!u)){await new Promise(E=>setTimeout(E,a.length>0?400:150));let m=!1;if(o.pageType!=="info"){let E=Ct();E&&T(E)&&(await Le(E,1200),z(E),m=!0,await new Promise(A=>setTimeout(A,800)))}let v=nt(),C=i.length>0?i[0].id:void 0,q=Ae(C);if(!q&&m&&(await new Promise(E=>setTimeout(E,600)),q=Ae(C)),q){await Le(q,1500);let E=C||q.textContent?.trim()||"";E&&fe(window.location.hostname,{advanceSelector:E}),z(q);let A=await St(v,2500);b=A.changed,x=A.evidence,g=A.changed||m,!A.changed&&!m&&console.warn("[EasyQuiz] O bot\xE3o de avan\xE7o foi acionado, mas a navega\xE7\xE3o ainda n\xE3o concluiu.")}else m?(g=!0,b=!0,x="Resposta confirmada via bot\xE3o de verifica\xE7\xE3o/envio."):console.warn("[EasyQuiz] Nenhum bot\xE3o de avan\xE7o encontrado na p\xE1gina.")}return{applied:s,verified:p,success:h,advanced:g,failed:r,reports:c,navigationVerified:b,navigationEvidence:x}}var X=null,F=[];function W(){X&&(X.style.removeProperty("outline"),X.style.removeProperty("outline-offset"),X=null);for(let o of F)o.style.removeProperty("outline"),o.style.removeProperty("outline-offset"),o.style.removeProperty("background-color"),o.style.removeProperty("box-shadow"),o.removeAttribute("data-easyquiz-highlight");F=[]}function Ie(o){W(),X=o,o.style.outline="2px solid #00e5ff",o.style.outlineOffset="4px"}function at(o){for(let e of o){if(e.t==="adv"||e.t==="js")continue;if(e.t==="drag"){try{let i=w(e.from),s=w(e.to);i&&(i.style.outline="2px solid #00ff88",F.push(i)),s&&(s.style.outline="2px dashed #00e5ff",F.push(s))}catch{}continue}if(!e.id)continue;let t=w(e.id);if(!t)continue;let n=t.closest('label, .option-card, [role="radio"], [role="checkbox"], [role="listitem"], .answer, .quiz-option, .form-check, [class*="option" i], [class*="choice" i], tr, li')||t;n.style.outline="2px solid #00ff88",n.style.outlineOffset="2px",n.style.backgroundColor="rgba(0, 255, 136, 0.12)",n.setAttribute("data-easyquiz-highlight","true"),F.push(n);let a=t instanceof HTMLInputElement&&["checkbox","radio"].includes(t.type)?t:n.querySelector('input[type="checkbox"], input[type="radio"]');a&&a!==n&&(a.style.outline="2px solid #00ff88",a.style.outlineOffset="2px",a.style.boxShadow="0 0 10px rgba(0, 255, 136, 0.8)",a.setAttribute("data-easyquiz-highlight","true"),F.push(a))}}var Z=4,At=1200,ze=12e5;function le(o){return new Promise((e,t)=>{let n=new FileReader;n.onerror=()=>t(new Error("Falha ao converter blob para base64.")),n.onload=()=>{let a=String(n.result||"");e(a.split(",")[1]||"")},n.readAsDataURL(o)})}async function ce(o){let e=0,t=0;if(o instanceof HTMLImageElement?(e=o.naturalWidth||o.width,t=o.naturalHeight||o.height):(e=o.width,t=o.height),e<=0||t<=0)throw new Error("Dimens\xF5es inv\xE1lidas.");let n=Math.min(1,At/Math.max(e,t)),a=Math.max(1,Math.round(e*n)),i=Math.max(1,Math.round(t*n)),s=document.createElement("canvas");s.width=a,s.height=i;let r=s.getContext("2d",{alpha:!1});if(!r)throw new Error("Sem suporte a Canvas 2D.");return r.fillStyle="#ffffff",r.fillRect(0,0,a,i),r.drawImage(o,0,0,a,i),new Promise((l,u)=>{s.toBlob(d=>d?l(d):u(new Error("Falha compress\xE3o.")),"image/jpeg",.8)})}async function it(o){try{let e=o.cloneNode(!0),t=o.offsetWidth||500,n=o.offsetHeight||500,a=`
      <svg xmlns="http://www.w3.org/2000/svg" width="${t}" height="${n}">
        <foreignObject width="100%" height="100%">
          <div xmlns="http://www.w3.org/1999/xhtml" style="background:#fff;font-family:sans-serif;">
            ${e.innerHTML}
          </div>
        </foreignObject>
      </svg>
    `,i=new Blob([a],{type:"image/svg+xml;charset=utf-8"}),s=URL.createObjectURL(i),r=new Image;r.crossOrigin="anonymous",await new Promise((d,p)=>{r.onload=d,r.onerror=p,r.src=s});let l=await ce(r),u=await le(l);if(URL.revokeObjectURL(s),u&&u.length<=ze)return{mediaType:"image/jpeg",base64:u,alt:"Captura Suprema via rasteriza\xE7\xE3o DOM",source:"rasterized"}}catch(e){console.warn("Falha na rasteriza\xE7\xE3o suprema:",e)}return null}async function Lt(o){let e=o.currentSrc||o.src;if(!e)return null;let t=(o.alt||o.getAttribute("aria-label")||"Imagem da quest\xE3o").slice(0,500);if(o.complete&&o.naturalWidth>0)try{let n=await ce(o),a=await le(n);if(a&&a.length<=ze)return{mediaType:"image/jpeg",base64:a,alt:t,source:e.slice(0,2e3)}}catch{}try{let n=await fetch(e,{mode:"cors"});if(n.ok){let a=await n.blob();if(a.type.startsWith("image/")){let i=await createImageBitmap(a),s=await ce(i);i.close();let r=await le(s);if(r&&r.length<=ze)return{mediaType:"image/jpeg",base64:r,alt:t,source:e.slice(0,2e3)}}}}catch{return it(o.parentElement||o)}return null}async function $e(o,e=!0){if(!e)return[];let t=[],n=0,a=Array.from(o.querySelectorAll("img")).filter(T).slice(0,Z);for(let i of a)try{let s=await Lt(i);if(s&&n+s.base64.length<=25e5&&(t.push(s),n+=s.base64.length,t.length>=Z))break}catch{}if(t.length<Z){let i=Array.from(o.querySelectorAll("canvas")).filter(T).slice(0,Z);for(let s of i)try{let r=await ce(s),l=await le(r);if(l&&n+l.length<=25e5&&(t.push({mediaType:"image/jpeg",base64:l,alt:"Canvas inline",source:"canvas"}),n+=l.length,t.length>=Z))break}catch{let r=await it(s.parentElement||s);r&&(t.push(r),n+=r.base64.length)}}return t}var de=class{active=!1;timer=null;callbacks;lastRunTime=0;lastActionTime=0;isProcessing=!1;observer=null;mutationTimer=null;constructor(e){this.callbacks=e}isActive(){return this.active}start(){this.active||(this.active=!0,this.lastActionTime=Date.now(),this.callbacks.onStatusChange("waiting","> [SYS] Autopilot ENGAGED. Monitorando..."),typeof MutationObserver<"u"&&(this.observer=new MutationObserver(()=>{!this.active||this.isProcessing||(this.mutationTimer&&clearTimeout(this.mutationTimer),this.mutationTimer=window.setTimeout(()=>{this.mutationTimer=null,this.loop()},180))}),this.observer.observe(document.body,{subtree:!0,childList:!0,attributes:!0,characterData:!0})),this.loop())}stop(){this.active=!1,this.timer&&clearTimeout(this.timer),this.mutationTimer&&clearTimeout(this.mutationTimer),this.mutationTimer=null,this.observer?.disconnect(),this.observer=null,this.callbacks.onStatusChange("idle","> [SYS] Autopilot DESATIVADO.")}errorCount=0;lastPageSig="";samePageCount=0;async loop(){if(!this.active)return;let e=Date.now();if(e-this.lastRunTime<2500||this.isProcessing){this.timer=window.setTimeout(()=>this.loop(),500);return}this.lastRunTime=e;try{this.isProcessing=!0;let t=J(!1);if(t||(t=G()),t){let n=We(t);if(n===this.lastPageSig)this.samePageCount++;else{let s=this.samePageCount>1;this.lastPageSig=n,this.samePageCount=1,s&&(this.callbacks.onStatusChange("waiting","> [SYS] Avan\xE7o de p\xE1gina detectado! Retomando monitoramento autom\xE1tico...","text-green"),this.callbacks.onPageAdvance?.())}if(this.callbacks.isManualModeActive?.()){this.callbacks.onStatusChange("waiting","> [SYS] Gabarito manual ativo na tela. Aguardando voc\xEA posicionar as respostas e avan\xE7ar a p\xE1gina...","text-yellow"),this.lastRunTime=Date.now();return}this.samePageCount>1&&(this.callbacks.onStatusChange("waiting",`> [AUTOPILOT] Resolu\xE7\xE3o pendente (${this.samePageCount}\xAA verifica\xE7\xE3o). Conclua e avance para prosseguir...`,"text-yellow"),await new Promise(s=>setTimeout(s,4e3)));let a=t.controls.filter(s=>s.role==="answer"),i=Q(window.location.hostname);if(a.length>0){this.callbacks.onStatusChange("analyzing","> [IA] Quest\xE3o/Exerc\xEDcio detectado. Consultando IA...","text-blue"),await new Promise(r=>setTimeout(r,600));let s=await this.callbacks.onRequestAnalysis(this.samePageCount);if(s){if(this.callbacks.onStatusChange("analyzing",`> [IA] (${s.usedModel||"gemini"}) Confian\xE7a: ${(s.confidence*100).toFixed(1)}% | Modo: ${s.mode}`,"text-blue"),this.callbacks.onStatusChange("analyzing",`> [IA] Racioc\xEDnio: ${s.rationale}`,"text-blue"),this.callbacks.onStatusChange("analyzing",`> [IA] A\xE7\xF5es geradas: ${s.actions.length}`,"text-blue"),this.errorCount=0,s.memoryToStore&&this.callbacks.onStatusChange("analyzing",`> [IA] \u{1F9E0} Mem\xF3ria RAG salva: "${s.memoryToStore}"`,"text-yellow"),s.pageType==="conclusion"){this.callbacks.onStatusChange("idle","> [SYS] Atividade conclu\xEDda! Desligando Autopilot.","text-green"),this.stop();return}}else{this.errorCount++;let r=this.errorCount===1?5e3:8e3;this.callbacks.onStatusChange("waiting",`> [AVISO] Falha na an\xE1lise (${this.errorCount}/3). Aguardando ${r/1e3}s para estabiliza\xE7\xE3o antes de tentar novamente...`,"text-yellow"),await new Promise(l=>setTimeout(l,r))}this.lastActionTime=Date.now()}else if(i.advanceSelector&&w(i.advanceSelector)&&t.questionText.length<50){let s=w(i.advanceSelector);s&&(this.callbacks.onStatusChange("advancing",`> [BRUTE] Avan\xE7ando via cache "${i.advanceSelector}"...`),await new Promise(r=>setTimeout(r,1e3)),z(s),this.lastActionTime=Date.now(),this.errorCount=0)}else{this.callbacks.onStatusChange("analyzing","> [IA] P\xE1gina informativa/contexto detectada. Lendo e consultando IA...","text-blue"),await new Promise(r=>setTimeout(r,600));let s=await this.callbacks.onRequestAnalysis(this.samePageCount);if(s){if(this.callbacks.onStatusChange("analyzing",`> [IA] (${s.usedModel||"gemini"}) Tipo: ${s.pageType} | Modo: ${s.mode}`,"text-blue"),this.callbacks.onStatusChange("analyzing",`> [IA] Racioc\xEDnio: ${s.rationale}`,"text-blue"),s.memoryToStore&&this.callbacks.onStatusChange("analyzing",`> [IA] \u{1F9E0} Conte\xFAdo absorvido na mem\xF3ria: "${s.memoryToStore}"`,"text-yellow"),s.pageType==="info")this.callbacks.onStatusChange("advancing","> [IA] \u{1F4D6} Leitura conclu\xEDda. Avan\xE7ando automaticamente...","text-green"),await new Promise(r=>setTimeout(r,1800));else if(s.pageType==="start")this.callbacks.onStatusChange("advancing","> [SYS] In\xEDcio de m\xF3dulo detectado. Iniciando...","text-blue"),await new Promise(r=>setTimeout(r,1800));else if(s.pageType==="conclusion"){this.callbacks.onStatusChange("idle","> [SYS] Atividade conclu\xEDda! Desligando Autopilot.","text-green"),this.stop();return}this.errorCount=0}else{this.errorCount++;let r=this.errorCount===1?5e3:8e3;this.callbacks.onStatusChange("waiting",`> [AVISO] Falha ao processar p\xE1gina (${this.errorCount}/3). Aguardando ${r/1e3}s para estabiliza\xE7\xE3o antes de tentar novamente...`,"text-yellow"),await new Promise(l=>setTimeout(l,r))}this.lastActionTime=Date.now()}if(this.errorCount>=3){this.callbacks.onStatusChange("error","> [ERRO] 3 falhas consecutivas. Abortando Autopilot para poupar sua cota e tokens.","text-red"),this.callbacks.onStatusChange("waiting","> [DICA] Verifique a mensagem vermelha de [ERRO DETALHADO] no console acima para saber o motivo exato.","text-yellow"),this.stop();return}}else this.callbacks.onStatusChange("waiting","> [SYS] Monitorando p\xE1gina... Aguardando carregamento dos elementos.")}catch(t){let n=t instanceof Error?t.message:String(t);console.warn("[EasyQuiz Autopilot]",t),this.callbacks.onStatusChange("error",`> [ERRO NO AUTOPILOT] ${n}`,"text-red")}finally{this.isProcessing=!1}this.active&&(this.timer=window.setTimeout(()=>this.loop(),1e3))}};var y={logo:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.8L19.2 8 12 11.2 4.8 8 12 4.8zM4 9.6l7 3.1v7.5l-7-3.5V9.6zm9 10.6v-7.5l7-3.1v7.1l-7 3.5z"/></svg>',rocket:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M13.13 2.81a.5.5 0 0 0-.46-.07c-.42.15-2.08.79-3.9 2.61-2.04 2.04-2.6 4.09-2.73 4.96l-.97.98a1 1 0 0 0-.29.71v2.12a1 1 0 0 0 .29.71l2.83 2.83a1 1 0 0 0 .71.29h2.12a1 1 0 0 0 .71-.29l.98-.97c.87-.13 2.92-.69 4.96-2.73 1.82-1.82 2.46-3.48 2.61-3.9a.5.5 0 0 0-.07-.46l-6.79-6.79zM4.5 16.5l-2.09 2.09a.5.5 0 0 0 .35.85h3.04l.35.35v3.04a.5.5 0 0 0 .85.35L9.09 21.1l-4.59-4.6z"/></svg>',play:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>',stop:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h12v12H6z"/></svg>',code:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>',terminal:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8h16v10zm-12-3l3-3-3-3 1.4-1.4L13.8 12l-4.4 4.4L8 15zm6 0h4v2h-4v-2z"/></svg>',inspector:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>',settings:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.49.49 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>',key:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M7 14c-2.76 0-5-2.24-5-5s2.24-5 5-5c2.42 0 4.44 1.72 4.9 4H22v4h-2v3h-3v-3h-2v3h-3v-3h-2.1c-.46 2.28-2.48 4-4.9 4zm0-7c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>',paste:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 2h-4.18C14.4 .84 13.3 0 12 0c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm7 18H5V4h2v3h10V4h2v16z"/></svg>',edit:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>',trash:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>',eraser:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M15.14 3c-.51 0-1.02.2-1.41.59L2.59 14.73c-.78.78-.78 2.05 0 2.83L6.44 21.4c.78.78 2.05.78 2.83 0l11.14-11.14c.78-.78.78-2.05 0-2.83l-3.86-3.84c-.39-.39-.9-.59-1.41-.59zm.71 2.71l3.15 3.15-3.15 3.15-3.15-3.15 3.15-3.15zm-4.57 4.57l3.15 3.15-4.57 4.57H6.71l-3-3 7.57-7.57z"/></svg>',save:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/></svg>',analyze:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L3 14h8l-2 8 12-12h-8l2-8z"/></svg>',apply:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>',close:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>',chevronRight:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>',chevronLeft:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>',eye:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>',eyeOff:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.44-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.17c0-1.66-1.34-3-3-3l-.17.02z"/></svg>',check:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>',clock:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>',copy:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>',refresh:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg>',chip:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4h12v16H6V4zm2 2v12h8V6H8zm-4 3h2v2H4V9zm0 4h2v2H4v-2zm16-4h2v2h-2V9zm0 4h2v2h-2v-2zM9 2h2v2H9V2zm4 0h2v2h-2V2zm-4 18h2v2H9v-2zm4 0h2v2h-2v-2z"/></svg>',moreVertical:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>',minimize:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M19 13H5v-2h14v2z"/></svg>',maximize:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/></svg>',dragHandle:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M10 9h4V6h-4v3zm0 5h4v-3h-4v3zm0 5h4v-3h-4v3zM4 9h4V6H4v3zm0 5h4v-3H4v3zm0 5h4v-3H4v3zm12-10V6h4v3h-4zm0 5h4v-3h-4v3zm0 5h4v-3h-4v3z"/></svg>',list:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/></svg>',folderTree:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6 10H6v-2h8v2zm4-4H6v-2h12v2z"/></svg>',folder:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/></svg>',file:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>'};var ue=class{element=null;shadow;isMinimized=!1;currentPlan=null;isDragging=!1;dragStartX=0;dragStartY=0;initialLeft=25;initialTop=25;onAdvanceCallback;constructor(e,t){this.shadow=e,this.onAdvanceCallback=t,this.initGlobalListeners()}initGlobalListeners(){window.addEventListener("popstate",()=>this.handlePageNavigated()),window.addEventListener("hashchange",()=>this.handlePageNavigated()),document.addEventListener("click",e=>{if(!this.isOpen())return;let t=e.target;if(!t||this.shadow.contains(t)||t.closest("#easyquiz-shadow-root"))return;let n=t.closest('button, [role="button"], a, input[type="submit"]');if(n){let a=(n.textContent||n.value||"").toLowerCase();/pr[oó]xim|avan[cç]|continu|verific|enviar|submit|confirm|checar|validar|next/i.test(a)&&setTimeout(()=>{this.isOpen()&&this.handlePageNavigated()},800)}},!0)}handlePageNavigated(){this.isOpen()&&(this.hide(),this.onAdvanceCallback?.())}isOpen(){return this.element!==null&&this.element.style.display!=="none"}show(e){this.currentPlan=e,this.element||this.createElement(),this.renderContent(),this.element&&(this.element.style.display="flex")}hide(){this.element&&(this.element.style.display="none")}minimize(){this.isMinimized=!0,this.element&&this.element.classList.add("minimized")}restore(){this.isMinimized=!1,this.element&&this.element.classList.remove("minimized")}createElement(){this.element=document.createElement("div"),this.element.className="eq-floating-hud",this.element.style.left=`${this.initialLeft}px`,this.element.style.top=`${this.initialTop}px`,this.element.innerHTML=`
      <!-- P\xEDlula compacta quando minimizado -->
      <div class="eq-fah-pill" id="eq-fah-pill" title="Clique para expandir gabarito interativo">
        <span class="eq-fah-pill-icon">${y.list}</span>
        <span id="eq-fah-pill-text">Gabarito Manual</span>
        <span class="eq-fah-pill-badge" id="eq-fah-pill-badge">0</span>
      </div>

      <!-- Cabe\xE7alho com barra de arraste -->
      <div class="eq-fah-header" id="eq-fah-header">
        <div class="eq-fah-title">
          <span style="display:flex; align-items:center;">${y.dragHandle}</span>
          <span>Gabarito Manual Interativo</span>
        </div>
        <div class="eq-fah-actions">
          <button class="eq-fah-btn" id="eq-fah-copy-md-btn" title="Copiar tudo formatado em Markdown">${y.copy}</button>
          <button class="eq-fah-btn" id="eq-fah-min-btn" title="Minimizar para p\xEDlula flutuante">${y.minimize}</button>
          <button class="eq-fah-btn" id="eq-fah-close-btn" title="Fechar gabarito">${y.close}</button>
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
    `,this.shadow.appendChild(this.element),this.element.querySelector("#eq-fah-pill").addEventListener("click",()=>this.restore()),this.element.querySelector("#eq-fah-min-btn").addEventListener("click",()=>this.minimize()),this.element.querySelector("#eq-fah-close-btn").addEventListener("click",()=>this.hide());let a=this.element.querySelector("#eq-fah-copy-md-btn");a.addEventListener("click",()=>this.copyMarkdownToClipboard(a));let i=this.element.querySelector("#eq-fah-copy-all-btn");i.addEventListener("click",()=>this.copyMarkdownToClipboard(i));let s=this.element.querySelector("#eq-fah-header");this.setupDraggable(s)}setupDraggable(e){let t=n=>{if(n.target.closest(".eq-fah-btn"))return;n.preventDefault(),this.isDragging=!0,this.dragStartX=n.clientX,this.dragStartY=n.clientY;let a=this.element.getBoundingClientRect();this.initialLeft=a.left,this.initialTop=a.top;let i=r=>{if(!this.isDragging||!this.element)return;let l=r.clientX-this.dragStartX,u=r.clientY-this.dragStartY,d=Math.max(10,window.innerWidth-this.element.offsetWidth-10),p=Math.max(10,window.innerHeight-this.element.offsetHeight-10),c=Math.min(Math.max(10,this.initialLeft+l),d),h=Math.min(Math.max(10,this.initialTop+u),p);this.element.style.left=`${c}px`,this.element.style.top=`${h}px`},s=()=>{this.isDragging=!1,window.removeEventListener("mousemove",i),window.removeEventListener("mouseup",s)};window.addEventListener("mousemove",i),window.addEventListener("mouseup",s)};e.addEventListener("mousedown",t)}renderContent(){if(!this.element||!this.currentPlan)return;let e=this.element.querySelector("#eq-fah-body"),t=this.element.querySelector("#eq-fah-pill-text"),n=this.element.querySelector("#eq-fah-pill-badge");e.innerHTML="";let a=this.currentPlan,i=a.actions.filter(c=>c.t==="drag"),s=a.actions.filter(c=>{if(c.t!=="val")return!1;let h=f(c.id||"").toLowerCase();return!/continu|avan[cç]|pr[oó]xim|submet|enviar|check|verific/i.test(h)}),r=a.actions.filter(c=>c.t==="clk"||c.t==="chk"),l=i.length||s.length||r.length,u=document.createElement("div");u.className="eq-fah-meta";let d=document.createElement("span");d.textContent=`Modo: ${a.mode.replace("_"," ")}`;let p=document.createElement("span");if(p.className="eq-fah-meta-badge",p.textContent=`${Math.round(a.confidence*100)}% Confian\xE7a`,u.append(d,p),e.appendChild(u),i.length>0||a.mode==="categorizacao"||a.mode==="arrastar_soltar"){t.textContent=`Categoriza\xE7\xE3o (${i.length} itens)`,n.textContent=String(i.length);let c={};for(let h of i){let g=f(h.to)||"Geral";c[g]||(c[g]=[]),c[g].push(f(h.from))}for(let[h,g]of Object.entries(c)){let b=document.createElement("div"),x=/fato|true|verdadeiro|sim/i.test(h),m=/opini[aã]o|false|falso|n[aã]o/i.test(h);b.className=`eq-fah-group ${x?"group-fato":m?"group-opiniao":""}`;let v=document.createElement("div");v.className="eq-fah-group-title",v.textContent=`\u{1F4C1} ${h} (${g.length})`,b.appendChild(v);let C=document.createElement("div");C.className="eq-fah-group-items";for(let q of g){let E=document.createElement("div");E.className="eq-fah-item";let A=document.createElement("span");A.className="eq-fah-item-text",A.textContent=q,E.appendChild(A);let S=document.createElement("button");S.className="eq-fah-copy-inline",S.textContent="Copiar",S.addEventListener("click",()=>{navigator.clipboard.writeText(q),S.textContent="\u2713 Copiado",setTimeout(()=>S.textContent="Copiar",1200)}),E.appendChild(S),C.appendChild(E)}b.appendChild(C),e.appendChild(b)}}else if(s.length>0){t.textContent=`Preenchimento (${s.length} campos)`,n.textContent=String(s.length);let c=document.createElement("div");c.className="eq-fah-group";let h=document.createElement("div");h.className="eq-fah-group-title",h.textContent="\u{1F4DD} Respostas para os Campos de Texto:",c.appendChild(h);let g=document.createElement("div");g.className="eq-fah-group-items";for(let b=0;b<s.length;b++){let x=s[b],m=document.createElement("div");m.className="eq-fah-item";let v=Me(x.id);(!v||/^[#\.\$]|input|mat-|cell|field|q[0-9]|eq-/i.test(v))&&(v=`Campo ${b+1}`);let C=String(x.v??""),q=document.createElement("div");q.className="eq-fah-field-box";let E=document.createElement("div");E.className="eq-fah-field-label",E.textContent=v,q.appendChild(E);let A=document.createElement("div");A.className="eq-fah-field-val",A.textContent=C,q.appendChild(A),m.appendChild(q);let S=document.createElement("button");S.className="eq-fah-copy-inline",S.textContent="Copiar",S.addEventListener("click",()=>{navigator.clipboard.writeText(C),S.textContent="\u2713 Copiado",setTimeout(()=>S.textContent="Copiar",1200)}),m.appendChild(S),g.appendChild(m)}c.appendChild(g),e.appendChild(c)}else if(r.length>0){t.textContent=`Op\xE7\xF5es (${r.length} marcadas)`,n.textContent=String(r.length);let c=document.createElement("div");c.className="eq-fah-group";let h=document.createElement("div");h.className="eq-fah-group-title",h.textContent="\u{1F3AF} Alternativa(s) Correta(s):",c.appendChild(h);let g=document.createElement("div");g.className="eq-fah-group-items";for(let b=0;b<r.length;b++){let x=r[b],m=document.createElement("div");m.className="eq-fah-item";let v=Me(x.id);(!v||/^(eq-|#|\$|\.|input_|mat-|choice_|radio_|chk_)/i.test(v))&&x.v&&(v=String(x.v)),v=f(v),/^(eq-|#|\$|\.|input_|mat-|choice_|radio_|chk_)/i.test(v)&&(v="");let C="",q=v.match(/^(\([A-Za-z0-9]\)|[A-Za-z0-9][\)\.\:\-])\s*(.*)$/);q?(C=q[1].replace(/[\(\)\.\:\-\s]/g,"").toUpperCase(),v=q[2].trim()||v):r.length>1&&(C=String.fromCharCode(65+b));let E=document.createElement("div");if(E.style.display="flex",E.style.alignItems="center",E.style.gap="8px",E.style.flex="1",C){let k=document.createElement("span");k.className="eq-fah-letter-badge",k.textContent=C,E.appendChild(k)}let A=document.createElement("span");A.className="eq-fah-item-text",A.textContent=v||(C?`Alternativa ${C}`:"Alternativa Selecionada"),E.appendChild(A),m.appendChild(E);let S=document.createElement("button");S.className="eq-fah-copy-inline",S.textContent="Copiar",S.addEventListener("click",()=>{navigator.clipboard.writeText(v||C),S.textContent="\u2713 Copiado",setTimeout(()=>S.textContent="Copiar",1200)}),m.appendChild(S),g.appendChild(m)}c.appendChild(g),e.appendChild(c)}else{t.textContent="Gabarito",n.textContent="0";let c=document.createElement("div");c.style.padding="10px",c.style.color="#888",c.textContent="Nenhuma resposta direta para exibir.",e.appendChild(c)}if(a.rationale){let c=document.createElement("div");c.className="eq-fah-rationale",c.textContent=`\u{1F4A1} Racioc\xEDnio da IA: ${a.rationale}`,e.appendChild(c)}}generateMarkdown(){if(!this.currentPlan)return"";let e=this.currentPlan,t=[];t.push("# Gabarito da Quest\xE3o \u2014 EasyQuiz Pro"),t.push(`- **Modo:** ${e.mode}`),t.push(`- **Confian\xE7a:** ${(e.confidence*100).toFixed(0)}%`),t.push("");let n=e.actions.filter(s=>s.t==="drag"),a=e.actions.filter(s=>s.t==="val"),i=e.actions.filter(s=>s.t==="clk"||s.t==="chk");if(n.length>0){t.push("## \u{1F4C2} Categoriza\xE7\xE3o:");let s={};for(let r of n){let l=f(r.to)||"Geral";s[l]||(s[l]=[]),s[l].push(f(r.from))}for(let[r,l]of Object.entries(s)){t.push(`### Categoria: ${r}`);for(let u of l)t.push(`- ${u}`);t.push("")}}else if(a.length>0){t.push("## \u270F\uFE0F Respostas para Preenchimento:");for(let s of a){let r=f(s.id);t.push(`- **${r||"Campo"}:** \`${s.v}\``)}t.push("")}else if(i.length>0){t.push("## \u2705 Alternativas Corretas:");for(let s of i)t.push(`- [x] ${f(s.id)}`);t.push("")}return e.rationale&&(t.push("---"),t.push(`**\u{1F4A1} Racioc\xEDnio:** ${e.rationale}`)),t.join(`
`)}copyMarkdownToClipboard(e){let t=this.generateMarkdown();t&&navigator.clipboard.writeText(t).then(()=>{let n=e.innerHTML;e.id==="eq-fah-copy-md-btn"?e.innerHTML='<span style="font-size:10px; color:#00ffcc; font-weight:bold;">\u2713</span>':e.innerHTML="\u2713 Copiado!",setTimeout(()=>{e.innerHTML=n},1500)})}};var st=`
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
`;var Mt=[{value:"",label:"Detec\xE7\xE3o Autom\xE1tica"},{value:"escolha_unica",label:"M\xFAltipla Escolha (\xDAnica)"},{value:"escolha_multipla",label:"M\xFAltipla Escolha (V\xE1rias)"},{value:"categorizacao",label:"Categoriza\xE7\xE3o / Grupos"},{value:"arrastar_soltar",label:"Arrastar e Soltar (Drag & Drop)"},{value:"ordenacao",label:"Ordena\xE7\xE3o / Sequ\xEAncia"},{value:"verdadeiro_falso",label:"Verdadeiro / Falso"},{value:"texto_livre",label:"Texto Livre / Dissertativa"},{value:"preenchimento",label:"Preenchimento de Lacunas"}],kt=[{value:"smart",label:"Inteligente (Auto-H\xEDbrido)"},{value:"command",label:"Apenas Comando (Seguro)"},{value:"javascript",label:"Apenas JS Nativo (Avan\xE7ado)"}],pe=class{host;shadow;callbacks;autopilot;floatingAnswers;initialSettings;isCollapsed=!1;activeTab="resolver";stopwatchInterval=null;stopwatchStartTime=0;latestPlan=null;latestContext=null;latestPromptText="";liveDebugTerminal;dbgModel;dbgLatency;dbgSplitTokens;dbgTotalTokens;dbgErrorCard;dbgErrorText;dbgPromptLen;dbgPromptView;dbgContextView;dbgRawRespView;dbgCountAll;dbgCountError;dbgCountAi;dbgCountDom;logEntries=[];activeLogFilter="all";autoScrollLogs=!0;lastErrorMsg=null;progressContainer;progressBar;progressLabel;progressVal;contextTreeContainer;launcherBtn;launcherDot;dockToggleBtn;sidebarEl;apToggleBtn;apConsole;executionConsole;dotPulseAp;statusTextAp;stopwatchAp;dotPulseAdv;statusTextAdv;stopwatchAdv;inspModel;inspLatency;inspTokens;inspPrompt;inspRationale;inspActions;copyPromptBtn;apiKeyInput;keyContextMenu;keyMoreBtn;modelSelect;modeSelect;engineSelect;dryRunCheckbox;autoApplyCheckbox;autoAdvanceCheckbox;hostDarkModeCheckbox;useVisionCheckbox;analyzeBtn;applyBtn;resultContainer;constructor(e,t){this.initialSettings=e,this.callbacks=t,this.autopilot=new de({onStatusChange:(a,i,s)=>{this.logToConsole(i,s),a==="analyzing"?this.setBusy(!0,"Autopilot: IA analisando..."):(a==="advancing"||a==="waiting")&&this.setBusy(!1)},onRequestAnalysis:async a=>{try{return await this.callbacks.onAnalyze(a)||null}catch{return null}},isManualModeActive:()=>this.floatingAnswers?.isOpen()??!1,onPageAdvance:()=>{this.floatingAnswers?.hide()}}),this.host=document.createElement("div"),this.host.id="easyquiz-shadow-root",this.host.style.position="fixed",this.host.style.top="0",this.host.style.left="0",this.host.style.width="100vw",this.host.style.height="100vh",this.host.style.zIndex="2147483647",this.host.style.pointerEvents="none",this.shadow=this.host.attachShadow({mode:"open"}),this.shadow.innerHTML=`
      <style>${st}</style>

      <!-- Bot\xE3o Flutuante Inferior Renovado (C\xE1psula com Status ao Vivo) -->
      <button class="eq-launcher" type="button" title="Abrir / Recolher EasyQuiz (Alt+Q)">
        <span class="eq-launcher-icon">${y.logo}</span>
        <span>EasyQuiz</span>
        <span class="eq-launcher-dot" id="eq-launcher-dot"></span>
      </button>

      <!-- Sidebar Fixa Lateral Direita Estilo VS Code -->
      <aside class="eq-sidebar" aria-label="EasyQuiz Sidebar">
        <!-- Aba Retr\xE1til na Borda Esquerda -->
        <button class="eq-dock-toggle" id="eq-dock-toggle" type="button" title="Recolher / Expandir Painel (Alt+Q)">
          <span class="eq-dock-toggle-icon">${y.chevronRight}</span>
          <span class="eq-dock-toggle-label">EQ</span>
        </button>
           <!-- Activity Bar Vertical na Esquerda (Estilo VS Code - Apenas \xCDcones) -->
          <nav class="eq-activity-bar" role="tablist" aria-label="Atalhos">
            <div class="eq-activity-top">
              <button class="eq-activity-btn active" id="eq-tab-resolver" role="tab" title="Resolver (Opera\xE7\xF5es Atuais)">
                <span class="eq-activity-indicator"></span>
                <span class="eq-activity-icon">${y.rocket}</span>
              </button>

              <button class="eq-activity-btn" id="eq-tab-brain" role="tab" title="C\xE9rebro da IA (Contexto e Inspe\xE7\xE3o)">
                <span class="eq-activity-indicator"></span>
                <span class="eq-activity-icon">${y.chip}</span>
              </button>

              <button class="eq-activity-btn" id="eq-tab-debug" role="tab" title="Terminal & Debug Output (Logs, Tokens, Prompts, Erros)">
                <span class="eq-activity-indicator"></span>
                <span class="eq-activity-icon">${y.terminal}</span>
              </button>
            </div>

            <div class="eq-activity-bottom">
              <button class="eq-activity-btn" id="eq-tab-settings" role="tab" title="Configura\xE7\xF5es e Ajustes Avan\xE7ados">
                <span class="eq-activity-indicator"></span>
                <span class="eq-activity-icon">${y.settings}</span>
              </button>
            </div>
          </nav>

          <!-- Corpo Principal da Sidebar -->
          <main class="eq-sidebar-body">
            <!-- Cabe\xE7alho VS Code -->
            <header class="eq-header">
              <div class="eq-brand">
                <span class="eq-brand-icon">${y.logo}</span>
                <span class="eq-brand-name">EasyQuiz</span>
                <span class="eq-brand-badge">2.0 SUPREME</span>
              </div>
              <div class="eq-header-tools">
                <button class="eq-icon-btn" id="eq-min-btn" type="button" title="Minimizar (Alt+Q)">${y.chevronRight}</button>
                <button class="eq-icon-btn" id="eq-close-btn" type="button" title="Fechar">${y.close}</button>
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
                  <button class="eq-btn-primary" id="eq-analyze-btn" type="button">${y.analyze} Analisar quest\xE3o</button>
                  <button class="eq-btn-secondary" id="eq-apply-btn" type="button">${y.apply} Aplicar respostas</button>
                </div>

                <div style="display: flex; gap: 8px; width: 100%; align-items: center;">
                  <button class="eq-btn-primary" id="eq-ap-toggle-btn" type="button" style="flex: 1;">
                    ${y.play} INICIAR AUTOPILOT
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
                  <button class="eq-btn-secondary" id="eq-open-hud-btn" type="button">${y.list} Abrir respostas dispon\xEDveis</button>
                </div>

                <!-- Status & Stopwatch Card -->
                <div class="eq-status-card">
                  <div class="eq-status-card-header">
                    <div class="eq-ai-indicator">
                      <span class="eq-dot-pulse" id="eq-dot-ap"></span>
                      <span>Status da IA</span>
                    </div>
                    <div class="eq-stopwatch" id="eq-stopwatch-ap">
                      ${y.clock} <span>0.00s</span>
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
                      ${y.refresh}
                    </button>
                    <button class="eq-icon-btn" id="eq-ap-clear-memory" type="button" title="Limpar Mem\xF3ria Contextual (RAG)" style="width: 28px; height: 28px; color: #ff5555;">
                      ${y.eraser}
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
                      ${y.copy} Copiar
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
                      ${y.copy}
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
                        ${y.copy}
                      </button>
                      <button class="eq-icon-btn" id="eq-dbg-clear-logs" type="button" title="Limpar Console" style="width: 26px; height: 26px; color: #ff5555;">
                        ${y.eraser}
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
                        ${y.copy} Copiar
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
                      ${y.copy} Copiar JSON
                    </button>
                  </div>
                  <div class="eq-code-block" id="eq-dbg-context-view" style="max-height: 110px;">Aguardando captura de contexto...</div>
                </div>

                <!-- Resposta Bruta da IA -->
                <div class="eq-field-group">
                  <div class="eq-section-title">
                    <span>Resposta Bruta da IA (Raw Output)</span>
                    <button class="eq-btn-secondary" id="eq-dbg-copy-raw-resp" type="button" style="height: 24px; padding: 0 6px; font-size: 10px;">
                      ${y.copy} Copiar Resposta
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
                      <span class="eq-input-prefix-icon">${y.key}</span>
                      <input id="eq-api-key" class="eq-input" type="password" placeholder="Cole sua chave AIzaSy..." autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" />
                      <button class="eq-icon-btn" id="eq-key-save" type="button" title="Salvar Chave">${y.save}</button>
                      <button class="eq-icon-btn" id="eq-key-more-btn" type="button" title="Mais Op\xE7\xF5es da Chave">${y.moreVertical}</button>
                    </div>

                    <!-- Context Menu Suspenso Din\xE2mico -->
                    <div class="eq-context-menu" id="eq-key-context-menu" hidden>
                      <button class="eq-context-item" id="eq-menu-prompt" type="button">
                        <span class="eq-item-icon">${y.edit}</span>
                        <span class="eq-item-text">Inserir via Janela Nativa</span>
                        <span class="eq-item-badge">Bypass</span>
                      </button>
                      <button class="eq-context-item" id="eq-menu-paste" type="button">
                        <span class="eq-item-icon">${y.paste}</span>
                        <span class="eq-item-text">Colar da \xC1rea de Transfer\xEAncia</span>
                      </button>
                      <button class="eq-context-item" id="eq-menu-toggle-vis" type="button">
                        <span class="eq-item-icon" id="eq-menu-vis-icon">${y.eye}</span>
                        <span class="eq-item-text" id="eq-menu-vis-text">Mostrar Chave</span>
                      </button>
                      <button class="eq-context-item" id="eq-menu-clear" type="button">
                        <span class="eq-item-icon">${y.eraser}</span>
                        <span class="eq-item-text">Limpar Campo</span>
                      </button>
                      <div class="eq-context-divider"></div>
                      <button class="eq-context-item" id="eq-menu-test" type="button">
                        <span class="eq-item-icon">${y.key}</span>
                        <span class="eq-item-text">Testar Conex\xE3o no Google</span>
                      </button>
                      <button class="eq-context-item danger" id="eq-menu-reset" type="button">
                        <span class="eq-item-icon">${y.trash}</span>
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
                    ${y.trash} Resetar Todos os Dados e Mem\xF3ria
                  </button>
                </div>

                <div class="eq-footer-note" style="margin-top: auto;">Configura\xE7\xF5es salvas localmente no navegador</div>
              </div>
            </div>
          </main>
        </aside>
    `,this.launcherBtn=this.shadow.querySelector(".eq-launcher"),this.launcherDot=this.shadow.querySelector("#eq-launcher-dot"),this.dockToggleBtn=this.shadow.querySelector("#eq-dock-toggle"),this.sidebarEl=this.shadow.querySelector(".eq-sidebar"),this.apToggleBtn=this.shadow.querySelector("#eq-ap-toggle-btn"),this.apConsole=this.shadow.querySelector("#eq-ap-console"),this.executionConsole=this.shadow.querySelector("#eq-execution-console"),this.progressContainer=this.shadow.querySelector("#eq-progress-container"),this.progressBar=this.shadow.querySelector("#eq-progress-bar"),this.progressLabel=this.shadow.querySelector("#eq-progress-label"),this.progressVal=this.shadow.querySelector("#eq-progress-val"),this.contextTreeContainer=this.shadow.querySelector("#eq-tree-container"),this.dotPulseAp=this.shadow.querySelector("#eq-dot-ap"),this.statusTextAp=this.shadow.querySelector("#eq-status-text-ap"),this.stopwatchAp=this.shadow.querySelector("#eq-stopwatch-ap span"),this.dotPulseAdv=this.dotPulseAp,this.statusTextAdv=this.statusTextAp,this.stopwatchAdv=this.stopwatchAp,this.inspModel=this.shadow.querySelector("#eq-insp-model"),this.inspLatency=this.shadow.querySelector("#eq-insp-latency"),this.inspTokens=this.shadow.querySelector("#eq-insp-tokens"),this.inspPrompt=this.shadow.querySelector("#eq-insp-prompt"),this.inspRationale=this.shadow.querySelector("#eq-insp-rationale"),this.inspActions=this.shadow.querySelector("#eq-insp-actions"),this.copyPromptBtn=this.shadow.querySelector("#eq-copy-prompt-btn"),this.liveDebugTerminal=this.shadow.querySelector("#eq-live-debug-terminal"),this.dbgModel=this.shadow.querySelector("#eq-dbg-model"),this.dbgLatency=this.shadow.querySelector("#eq-dbg-latency"),this.dbgSplitTokens=this.shadow.querySelector("#eq-dbg-split-tokens"),this.dbgTotalTokens=this.shadow.querySelector("#eq-dbg-total-tokens"),this.dbgErrorCard=this.shadow.querySelector("#eq-dbg-error-card"),this.dbgErrorText=this.shadow.querySelector("#eq-dbg-error-text"),this.dbgPromptLen=this.shadow.querySelector("#eq-dbg-prompt-len"),this.dbgPromptView=this.shadow.querySelector("#eq-dbg-prompt-view"),this.dbgContextView=this.shadow.querySelector("#eq-dbg-context-view"),this.dbgRawRespView=this.shadow.querySelector("#eq-dbg-raw-resp-view"),this.dbgCountAll=this.shadow.querySelector("#eq-dbg-count-all"),this.dbgCountError=this.shadow.querySelector("#eq-dbg-count-error"),this.dbgCountAi=this.shadow.querySelector("#eq-dbg-count-ai"),this.dbgCountDom=this.shadow.querySelector("#eq-dbg-count-dom"),this.apiKeyInput=this.shadow.querySelector("#eq-api-key"),this.keyContextMenu=this.shadow.querySelector("#eq-key-context-menu"),this.keyMoreBtn=this.shadow.querySelector("#eq-key-more-btn"),this.modelSelect=this.shadow.querySelector("#eq-model-select"),this.modeSelect=this.shadow.querySelector("#eq-mode-select"),this.engineSelect=this.shadow.querySelector("#eq-engine-select"),this.dryRunCheckbox=this.shadow.querySelector("#eq-dry-run"),this.autoApplyCheckbox=this.shadow.querySelector("#eq-auto-apply"),this.autoAdvanceCheckbox=this.shadow.querySelector("#eq-auto-advance"),this.hostDarkModeCheckbox=this.shadow.querySelector("#eq-host-dark"),this.useVisionCheckbox=this.shadow.querySelector("#eq-use-vision"),this.analyzeBtn=this.shadow.querySelector("#eq-analyze-btn"),this.applyBtn=this.shadow.querySelector("#eq-apply-btn"),this.resultContainer=this.shadow.querySelector("#eq-result"),this.floatingAnswers=new ue(this.shadow,()=>{this.callbacks.onAnalyze(1)});let n=this.shadow.querySelector("#eq-open-hud-btn");n&&n.addEventListener("click",()=>{this.latestPlan&&this.floatingAnswers.show(this.latestPlan)}),O.forEach(a=>this.modelSelect.add(new Option(a.name,a.id,!1,a.id===e.model))),Mt.forEach(a=>this.modeSelect.add(new Option(a.label,a.value,!1,a.value===e.modeHint))),kt.forEach(a=>this.engineSelect.add(new Option(a.label,a.value,!1,a.value===e.engine))),this.apiKeyInput.value=e.apiKey,this.dryRunCheckbox.checked=e.dryRun,this.autoApplyCheckbox.checked=e.autoApply,this.autoAdvanceCheckbox.checked=e.autoAdvance,this.hostDarkModeCheckbox.checked=e.hostDarkMode,this.useVisionCheckbox.checked=e.useVision,this.setupEventListeners(),document.body.appendChild(this.host),this.applyHostDarkMode(e.hostDarkMode),e.apiKey&&ne(e.apiKey).then(a=>{a&&a.length>0&&this.updateModelSelect(a,e.model)}).catch(()=>{})}switchTab(e){this.activeTab=e;let t=["resolver","brain","debug","settings"];for(let n of t){let a=this.shadow.querySelector(`#eq-tab-${n}`),i=this.shadow.querySelector(`#eq-view-${n}`);n===e?(a?.classList.add("active"),i&&(i.style.display="flex")):(a?.classList.remove("active"),i&&(i.style.display="none"))}e==="brain"?(this.renderContextTree(),this.refreshInspectorView()):e==="debug"&&(this.refreshDebugView(),this.renderTerminalEntries())}setupEventListeners(){this.shadow.querySelector("#eq-tab-resolver")?.addEventListener("click",()=>this.switchTab("resolver")),this.shadow.querySelector("#eq-tab-brain")?.addEventListener("click",()=>this.switchTab("brain")),this.shadow.querySelector("#eq-tab-debug")?.addEventListener("click",()=>this.switchTab("debug")),this.shadow.querySelector("#eq-tab-settings")?.addEventListener("click",()=>this.switchTab("settings")),this.shadow.querySelector("#eq-dbg-filter-all")?.addEventListener("click",()=>this.setLogFilter("all")),this.shadow.querySelector("#eq-dbg-filter-error")?.addEventListener("click",()=>this.setLogFilter("error")),this.shadow.querySelector("#eq-dbg-filter-ai")?.addEventListener("click",()=>this.setLogFilter("ai")),this.shadow.querySelector("#eq-dbg-filter-dom")?.addEventListener("click",()=>this.setLogFilter("dom"));let e=this.shadow.querySelector("#eq-dbg-scroll-toggle");e?.addEventListener("click",()=>{this.autoScrollLogs=!this.autoScrollLogs,e&&(e.style.color=this.autoScrollLogs?"#00ffcc":"#858585",e.title=this.autoScrollLogs?"Auto-Scroll Ligado (Clique para desligar)":"Auto-Scroll Desligado (Clique para ligar)"),this.autoScrollLogs&&this.liveDebugTerminal&&(this.liveDebugTerminal.scrollTop=this.liveDebugTerminal.scrollHeight)});let t=this.shadow.querySelector("#eq-dbg-copy-logs");t?.addEventListener("click",()=>{let c=this.getFormattedLogs();navigator.clipboard.writeText(c).then(()=>{let h=t.innerHTML;t.innerHTML=y.check,setTimeout(()=>t.innerHTML=h,1800)})}),this.shadow.querySelector("#eq-dbg-clear-logs")?.addEventListener("click",()=>{this.clearLogs()});let n=this.shadow.querySelector("#eq-dbg-copy-prompt");n?.addEventListener("click",()=>{let c=this.latestPromptText||this.latestPlan?.promptSent||"";navigator.clipboard.writeText(c).then(()=>{let h=n.innerHTML;n.innerHTML=`${y.check} Copiado!`,setTimeout(()=>n.innerHTML=h,1800)})});let a=this.shadow.querySelector("#eq-dbg-copy-context");a?.addEventListener("click",()=>{let c=this.dbgContextView?.textContent||"";navigator.clipboard.writeText(c).then(()=>{let h=a.innerHTML;a.innerHTML=`${y.check} Copiado!`,setTimeout(()=>a.innerHTML=h,1800)})});let i=this.shadow.querySelector("#eq-dbg-copy-raw-resp");i?.addEventListener("click",()=>{let c=this.latestPlan?.rawResponse||this.dbgRawRespView?.textContent||"";navigator.clipboard.writeText(c).then(()=>{let h=i.innerHTML;i.innerHTML=`${y.check} Copiado!`,setTimeout(()=>i.innerHTML=h,1800)})});let s=this.shadow.querySelector("#eq-dbg-copy-error-btn");s?.addEventListener("click",()=>{let c=this.lastErrorMsg||"";navigator.clipboard.writeText(c).then(()=>{let h=s.innerHTML;s.innerHTML=y.check,setTimeout(()=>s.innerHTML=h,1800)})}),this.shadow.querySelector("#eq-refresh-context-btn")?.addEventListener("click",()=>{this.renderContextTree()}),this.launcherBtn.addEventListener("click",()=>this.toggle()),this.dockToggleBtn.addEventListener("click",()=>this.toggle()),this.shadow.querySelector("#eq-min-btn")?.addEventListener("click",()=>this.toggle(!1)),this.shadow.querySelector("#eq-close-btn")?.addEventListener("click",()=>this.toggle(!1)),window.addEventListener("keydown",c=>{c.altKey&&(c.key==="q"||c.key==="Q")&&(c.preventDefault(),this.toggle())},!0);let r=c=>{let h=c.composedPath();(h.includes(this.sidebarEl)||h.includes(this.host))&&c.stopImmediatePropagation()};window.addEventListener("keydown",r,!0),window.addEventListener("keyup",r,!0),window.addEventListener("keypress",r,!0),this.apiKeyInput.addEventListener("input",()=>{let c=this.apiKeyInput.value.trim().replace(/^["']|["']$/g,"");this.callbacks.onSettingsChange({apiKey:c})}),this.shadow.querySelector("#eq-key-save").addEventListener("click",()=>{let c=this.apiKeyInput.value.trim().replace(/^["']|["']$/g,"");this.apiKeyInput.value=c,this.callbacks.onSettingsChange({apiKey:c}),this.setStatus("Chave Gemini salva com sucesso!","success"),this.keyContextMenu.hidden=!0}),this.keyMoreBtn.addEventListener("click",c=>{c.stopPropagation(),this.keyContextMenu.hidden=!this.keyContextMenu.hidden}),this.shadow.addEventListener("click",c=>{let h=c.target;!h.closest("#eq-key-context-menu")&&!h.closest("#eq-key-more-btn")&&(this.keyContextMenu.hidden=!0)}),this.shadow.querySelector("#eq-menu-prompt")?.addEventListener("click",()=>{this.keyContextMenu.hidden=!0;let c=this.apiKeyInput.value.trim(),h=window.prompt("Cole sua Chave API do Google Gemini (AI Studio):",c);if(h!==null){let g=h.trim().replace(/^["']|["']$/g,"");this.apiKeyInput.value=g,this.callbacks.onSettingsChange({apiKey:g}),this.setStatus("Chave Gemini inserida e salva com sucesso!","success")}}),this.shadow.querySelector("#eq-menu-paste")?.addEventListener("click",async()=>{this.keyContextMenu.hidden=!0;try{let c=await navigator.clipboard.readText();if(c){let h=c.trim().replace(/^["']|["']$/g,"");this.apiKeyInput.value=h,this.callbacks.onSettingsChange({apiKey:h}),this.setStatus("Chave colada e salva com sucesso!","success")}}catch{let c=this.apiKeyInput.value.trim(),h=window.prompt("Cole sua Chave API do Google Gemini (AI Studio):",c);if(h!==null){let g=h.trim().replace(/^["']|["']$/g,"");this.apiKeyInput.value=g,this.callbacks.onSettingsChange({apiKey:g}),this.setStatus("Chave Gemini inserida e salva com sucesso!","success")}}}),this.shadow.querySelector("#eq-menu-toggle-vis")?.addEventListener("click",()=>{this.keyContextMenu.hidden=!0;let c=this.apiKeyInput.type==="password";this.apiKeyInput.type=c?"text":"password";let h=this.shadow.querySelector("#eq-menu-vis-icon"),g=this.shadow.querySelector("#eq-menu-vis-text");h&&(h.innerHTML=c?y.eyeOff:y.eye),g&&(g.textContent=c?"Ocultar Chave":"Mostrar Chave")}),this.shadow.querySelector("#eq-menu-clear")?.addEventListener("click",()=>{this.keyContextMenu.hidden=!0,this.apiKeyInput.value="",this.callbacks.onSettingsChange({apiKey:""}),this.setStatus("Campo limpo. Cole a nova chave e clique em Salvar.","info"),this.apiKeyInput.focus()}),this.shadow.querySelector("#eq-menu-test")?.addEventListener("click",async()=>{this.keyContextMenu.hidden=!0;let c=this.apiKeyInput.value.trim().replace(/^["']|["']$/g,"");if(!c)return this.setStatus("Insira ou cole a chave de API.","error");this.setStatus("Testando chave e descobrindo modelos autorizados...","info");try{let h=await Ue(c);this.setStatus(h.message,h.ok?"success":"error"),h.ok&&h.models&&h.models.length>0&&this.updateModelSelect(h.models)}catch(h){this.setStatus("Erro ao validar chave: "+h.message,"error")}});let u=()=>{this.keyContextMenu.hidden=!0,window.confirm("Deseja realmente resetar todos os dados, chaves e mem\xF3ria de sess\xE3o do EasyQuiz?")&&(Be(),this.apiKeyInput.value="",this.callbacks.onSettingsChange({apiKey:""}),this.setStatus("Todos os dados do EasyQuiz foram limpos.","info"),this.logToConsole("> [SYS] Armazenamento local resetado.","text-yellow"))};this.shadow.querySelector("#eq-menu-reset")?.addEventListener("click",u),this.shadow.querySelector("#eq-reset-all-btn")?.addEventListener("click",u),this.apToggleBtn.addEventListener("click",()=>{if(this.autopilot.isActive())this.autopilot.stop(),this.apToggleBtn.innerHTML=`${y.play} INICIAR AUTOPILOT`,this.apToggleBtn.classList.remove("danger"),this.stopStopwatch(),this.setStatus("Autopilot pausado pelo usu\xE1rio.","info");else{if(!this.apiKeyInput.value.trim().replace(/^["']|["']$/g,"")){this.setStatus("Configure sua chave de API Gemini na aba Configura\xE7\xF5es antes de ligar o Autopilot.","error"),this.switchTab("settings"),this.apiKeyInput.focus();return}this.callbacks.onSettingsChange({autoApply:!0,autoAdvance:!0}),this.autoApplyCheckbox.checked=!0,this.autoAdvanceCheckbox.checked=!0,this.autopilot.start(),this.apToggleBtn.innerHTML=`${y.stop} PARAR AUTOPILOT`,this.apToggleBtn.classList.add("danger"),this.startStopwatch(),this.setStatus("Autopilot ativo. Monitorando exerc\xEDcios...","info")}}),this.shadow.querySelector("#eq-ap-clear-memory").addEventListener("click",()=>{ve(),this.logToConsole("> [SYS] Mem\xF3ria contextual limpa com sucesso.","text-green"),this.setStatus("Mem\xF3ria contextual da sess\xE3o limpa.","success")});let p=this.shadow.querySelector("#eq-copy-console-btn");p?.addEventListener("click",()=>{let c=this.apConsole?.innerText||"";navigator.clipboard.writeText(c).then(()=>{let h=p.innerHTML;p.innerHTML=y.check,setTimeout(()=>p.innerHTML=h,1800)})}),this.copyPromptBtn.addEventListener("click",()=>{let c=this.inspPrompt.textContent||"";navigator.clipboard.writeText(c).then(()=>{let h=this.copyPromptBtn.innerHTML;this.copyPromptBtn.innerHTML=`${y.check} Copiado!`,setTimeout(()=>this.copyPromptBtn.innerHTML=h,2e3)})}),this.modelSelect.addEventListener("change",()=>this.callbacks.onSettingsChange({model:this.modelSelect.value})),this.modeSelect.addEventListener("change",()=>this.callbacks.onSettingsChange({modeHint:this.modeSelect.value})),this.engineSelect.addEventListener("change",()=>this.callbacks.onSettingsChange({engine:this.engineSelect.value})),this.dryRunCheckbox.addEventListener("change",()=>this.callbacks.onSettingsChange({dryRun:this.dryRunCheckbox.checked})),this.autoApplyCheckbox.addEventListener("change",()=>this.callbacks.onSettingsChange({autoApply:this.autoApplyCheckbox.checked})),this.autoAdvanceCheckbox.addEventListener("change",()=>this.callbacks.onSettingsChange({autoAdvance:this.autoAdvanceCheckbox.checked})),this.useVisionCheckbox.addEventListener("change",()=>{let c=this.useVisionCheckbox.checked;this.callbacks.onSettingsChange({useVision:c}),this.setStatus(c?"Vis\xE3o Computacional ativada (capturas habilitadas).":"Modo DOM R\xE1pido ativado (capturas desabilitadas).","info")}),this.hostDarkModeCheckbox.addEventListener("change",()=>{let c=this.hostDarkModeCheckbox.checked;this.callbacks.onSettingsChange({hostDarkMode:c}),this.applyHostDarkMode(c)}),this.analyzeBtn.addEventListener("click",async()=>{await this.callbacks.onAnalyze()&&!this.dryRunCheckbox.checked&&!this.autoApplyCheckbox.checked&&this.callbacks.onApply()}),this.applyBtn.addEventListener("click",()=>this.callbacks.onApply())}startStopwatch(){this.stopStopwatch(),this.stopwatchStartTime=Date.now();let e=()=>{let t=((Date.now()-this.stopwatchStartTime)/1e3).toFixed(2)+"s";this.stopwatchAp.textContent=t,this.stopwatchAdv.textContent=t};e(),this.stopwatchInterval=setInterval(e,100)}stopStopwatch(e){if(this.stopwatchInterval&&(clearInterval(this.stopwatchInterval),this.stopwatchInterval=null),e!==void 0){let t=(e/1e3).toFixed(2)+"s";this.stopwatchAp.textContent=t,this.stopwatchAdv.textContent=t}}setLogFilter(e){this.activeLogFilter=e;let t=["all","error","ai","dom"];for(let n of t){let a=this.shadow.querySelector(`#eq-dbg-filter-${n}`);n===e?a?.classList.add("active"):a?.classList.remove("active")}this.renderTerminalEntries()}updateLogCounters(){let e=0,t=0,n=0;for(let a of this.logEntries)a.category==="error"?e++:a.category==="ai"?t++:a.category==="dom"&&n++;this.dbgCountAll&&(this.dbgCountAll.textContent=String(this.logEntries.length)),this.dbgCountError&&(this.dbgCountError.textContent=String(e)),this.dbgCountAi&&(this.dbgCountAi.textContent=String(t)),this.dbgCountDom&&(this.dbgCountDom.textContent=String(n))}renderTerminalEntries(){if(!this.liveDebugTerminal)return;this.liveDebugTerminal.replaceChildren();let e=this.activeLogFilter==="all"?this.logEntries:this.logEntries.filter(t=>t.category===this.activeLogFilter);if(e.length===0){let t=document.createElement("div");t.className="text-muted",t.textContent=`Nenhum log encontrado para o filtro "${this.activeLogFilter.toUpperCase()}".`,this.liveDebugTerminal.appendChild(t);return}for(let t of e){let n=document.createElement("div");n.textContent=t.message,t.colorClass&&(n.className=t.colorClass),this.liveDebugTerminal.appendChild(n)}this.autoScrollLogs&&(this.liveDebugTerminal.scrollTop=this.liveDebugTerminal.scrollHeight)}clearLogs(){if(this.logEntries=[],this.updateLogCounters(),this.liveDebugTerminal){this.liveDebugTerminal.replaceChildren();let e=document.createElement("div");e.className="text-blue",e.textContent="> [SYS] Console de logs limpo pelo usu\xE1rio.",this.liveDebugTerminal.appendChild(e)}this.apConsole&&this.apConsole.replaceChildren(),this.executionConsole&&this.executionConsole.replaceChildren()}getFormattedLogs(){return(this.activeLogFilter==="all"?this.logEntries:this.logEntries.filter(t=>t.category===this.activeLogFilter)).map(t=>t.message).join(`
`)}setLastError(e){this.lastErrorMsg=e,this.dbgErrorCard&&this.dbgErrorText&&(this.dbgErrorText.textContent=e,this.dbgErrorCard.style.display="flex")}setErrorDiagnostic(e,t){let n=t?`[${t}] ${e}`:e;this.setLastError(n)}refreshDebugView(){let e=this.latestPlan,t=this.latestContext,n=this.latestPromptText||e?.promptSent||"";if(this.dbgModel&&(this.dbgModel.textContent=e?.usedModel||this.initialSettings.model||"--"),this.dbgLatency&&(this.dbgLatency.textContent=e?.durationMs?`${e.durationMs}ms`:"--"),this.dbgSplitTokens){let a=e?.promptTokens!==void 0?String(e.promptTokens):"--",i=e?.candidatesTokens!==void 0?String(e.candidatesTokens):"--";this.dbgSplitTokens.textContent=`${a} / ${i}`,this.dbgSplitTokens.title=`Prompt: ${a} tokens | Resposta: ${i} tokens`}if(this.dbgTotalTokens){let a=e?.tokensUsed??(e?.promptTokens&&e?.candidatesTokens?e.promptTokens+e.candidatesTokens:void 0);this.dbgTotalTokens.textContent=a!==void 0?`${a}`:"--"}if(this.dbgPromptLen){let a=n.length,i=Math.round(a/4);this.dbgPromptLen.textContent=`${a} chars (~${i} tokens est.)`}if(this.dbgPromptView&&(this.dbgPromptView.textContent=n||"Nenhum prompt enviado at\xE9 o momento."),this.dbgContextView)if(t){let a={scope:`${t.scope.tagName.toLowerCase()}${t.scope.id?"#"+t.scope.id:""}${t.scope.className?"."+t.scope.className.split(" ").join("."):""}`,questionLength:t.questionText.length,questionSnippet:t.questionText.slice(0,150)+(t.questionText.length>150?"...":""),controlsCount:t.controls.length,controls:t.controls.map((i,s)=>({index:s+1,tag:i.tag,type:i.type,name:i.name||void 0,id:i.id||void 0,value:i.value||void 0,label:i.label||void 0,role:i.role}))};this.dbgContextView.textContent=JSON.stringify(a,null,2)}else this.dbgContextView.textContent="Aguardando captura de contexto pelo EasyQuiz...";this.dbgRawRespView&&(e?e.rawResponse?this.dbgRawRespView.textContent=e.rawResponse:this.dbgRawRespView.textContent=JSON.stringify({pageType:e.pageType,mode:e.mode,confidence:e.confidence,rationale:e.rationale,actions:e.actions},null,2):this.dbgRawRespView.textContent="Aguardando retorno da API Gemini..."),this.lastErrorMsg&&this.dbgErrorCard&&this.dbgErrorText&&(this.dbgErrorText.textContent=this.lastErrorMsg,this.dbgErrorCard.style.display="flex")}logToConsole(e,t){let n=new Date,a=`${String(n.getHours()).padStart(2,"0")}:${String(n.getMinutes()).padStart(2,"0")}:${String(n.getSeconds()).padStart(2,"0")}.${String(Math.floor(n.getMilliseconds()/100))}`,i=e;e.startsWith(">")?i=`> [${a}] ${e.slice(1).trim()}`:i=`[${a}] ${e}`;let s="all";t==="text-red"||i.includes("[ERRO]")||i.includes("Falha")||i.includes("Error")?s="error":i.includes("[IA]")||i.includes("[RAG]")||i.includes("Tokens")||i.includes("Gemini")||i.includes("Modelo:")?s="ai":(i.includes("[DOM]")||i.includes("[EXEC]")||i.includes("[VERIF]")||i.includes("[NAV]"))&&(s="dom");let r={id:Date.now()+Math.random(),timestamp:a,message:i,colorClass:t,category:s};for(this.logEntries.push(r);this.logEntries.length>250;)this.logEntries.shift();if(this.updateLogCounters(),s==="error"&&this.setLastError(i),this.liveDebugTerminal&&(this.activeLogFilter==="all"||this.activeLogFilter===s)){let l=document.createElement("div");for(l.textContent=i,t&&(l.className=t),this.liveDebugTerminal.appendChild(l);this.liveDebugTerminal.children.length>250;)this.liveDebugTerminal.removeChild(this.liveDebugTerminal.firstChild);this.autoScrollLogs&&(this.liveDebugTerminal.scrollTop=this.liveDebugTerminal.scrollHeight)}if(this.apConsole){let l=document.createElement("div");for(l.textContent=i,t&&(l.className=t),this.apConsole.appendChild(l),this.apConsole.scrollTop=this.apConsole.scrollHeight;this.apConsole.children.length>150;)this.apConsole.removeChild(this.apConsole.firstChild)}if(this.executionConsole){let l=document.createElement("div");for(l.textContent=i,t&&(l.className=t),this.executionConsole.appendChild(l),this.executionConsole.scrollTop=this.executionConsole.scrollHeight;this.executionConsole.children.length>150;)this.executionConsole.removeChild(this.executionConsole.firstChild)}}setProgress(e,t){if(!this.progressContainer||!this.progressBar)return;if(e<=0){this.progressContainer.style.display="none",this.progressBar.style.width="0%";return}this.progressContainer.style.display="flex";let n=Math.min(100,Math.max(0,Math.round(e)));this.progressBar.style.width=`${n}%`,this.progressVal&&(this.progressVal.textContent=`${n}%`),t&&this.progressLabel&&(this.progressLabel.textContent=t),n>=100&&setTimeout(()=>{this.progressContainer&&this.progressBar&&this.progressBar.style.width==="100%"&&(this.progressContainer.style.display="none")},1500)}updateContext(e,t){this.latestContext=e,t&&(this.latestPlan=t),this.activeTab==="brain"?(this.renderContextTree(),t&&this.refreshInspectorView()):this.activeTab==="debug"&&this.refreshDebugView()}renderContextTree(){if(!this.contextTreeContainer)return;let e=this.latestContext,t=ee(),n=this.latestPlan;this.contextTreeContainer.innerHTML="";let a=this.createTreeFolder("\u{1F4C4} P\xC1GINA & ESCOPO ATUAL",!0,[{label:"T\xEDtulo",value:document.title||"Sem t\xEDtulo"},{label:"URL",value:window.location.pathname||"/"},{label:"Escopo DOM",value:e?`${e.scope.tagName.toLowerCase()}${e.scope.className?"."+e.scope.className.split(" ").join("."):""}`:"Document"},{label:"Tamanho Texto",value:e?`${e.questionText.length} caracteres`:"N\xE3o analisado"},{label:"Trecho Enunciado",value:e?`"${e.questionText.slice(0,120)}..."`:"Nenhum"}]);this.contextTreeContainer.appendChild(a);let i=e?e.controls:[],s=i.map((d,p)=>{let c=d.role==="navigation"||d.type==="button",h=!c&&d.value?` [val: "${d.value}"]`:"";return{label:`[#${p+1}] ${d.type.toUpperCase()}`,value:`${d.label||d.id||d.name||"(Sem r\xF3tulo)"}${h}`.trim(),badge:c?"Navega\xE7\xE3o":d.role||d.type}}),r=this.createTreeFolder(`\u{1F39B}\uFE0F CONTROLES DETECTADOS (${i.length})`,i.length>0,s);this.contextTreeContainer.appendChild(r);let l=t.map((d,p)=>({label:`Mem\xF3ria #${p+1}`,value:d,badge:"RAG"})),u=this.createTreeFolder(`\u{1F9E0} MEM\xD3RIA RAG ACUMULADA (${t.length})`,t.length>0,l);if(this.contextTreeContainer.appendChild(u),n){let d=this.createTreeFolder(`\u{1F916} \xDALTIMO PLANO IA (${n.actions.length} a\xE7\xF5es)`,!0,[{label:"Tipo P\xE1gina",value:n.pageType,badge:`${(n.confidence*100).toFixed(0)}%`},{label:"Modo",value:n.mode},{label:"Racioc\xEDnio",value:n.rationale||"N/A"},...n.actions.map((p,c)=>({label:`A\xE7\xE3o #${c+1} (${p.t})`,value:JSON.stringify(p)}))]);this.contextTreeContainer.appendChild(d)}}createTreeFolder(e,t,n){let a=document.createElement("div");a.className="eq-tree-node";let i=document.createElement("div");i.className="eq-tree-header",i.innerHTML=`<span class="eq-tree-arrow">${t?"\u25BC":"\u25B6"}</span> <span>${e}</span>`;let s=document.createElement("div");if(s.className="eq-tree-content",s.style.display=t?"flex":"none",n.length===0)s.innerHTML='<div class="text-muted" style="padding: 2px 0;">Nenhum item registrado.</div>';else for(let r of n){let l=document.createElement("div");l.className="eq-tree-leaf",l.innerHTML=`
          <strong style="color:#ffffff; min-width: 80px;">${r.label}:</strong>
          <span style="flex:1; word-break: break-word; color:#aaaaaa;">${r.value}</span>
          ${r.badge?`<span class="eq-tree-badge">${r.badge}</span>`:""}
        `,s.appendChild(l)}return i.addEventListener("click",()=>{let r=s.style.display==="none";s.style.display=r?"flex":"none";let l=i.querySelector(".eq-tree-arrow");l&&(l.textContent=r?"\u25BC":"\u25B6")}),a.appendChild(i),a.appendChild(s),a}toggle(e){e!==void 0?this.isCollapsed=!e:this.isCollapsed=!this.isCollapsed,this.isCollapsed?this.sidebarEl.classList.add("eq-collapsed"):(this.sidebarEl.classList.remove("eq-collapsed"),this.apiKeyInput.value||(this.switchTab("settings"),this.apiKeyInput.focus()))}setBusy(e,t){this.analyzeBtn.disabled=e,[this.modelSelect,this.modeSelect,this.engineSelect,this.dryRunCheckbox,this.autoApplyCheckbox,this.autoAdvanceCheckbox,this.useVisionCheckbox].forEach(n=>n.disabled=e),e?(this.startStopwatch(),this.dotPulseAp.className="eq-dot-pulse busy",this.dotPulseAdv.className="eq-dot-pulse busy",this.launcherDot.className="eq-launcher-dot busy",t&&this.setStatus(t,"info")):(this.stopStopwatch(),this.dotPulseAp.className="eq-dot-pulse",this.dotPulseAdv.className="eq-dot-pulse",this.launcherDot.className="eq-launcher-dot")}setStatus(e,t="info"){this.statusTextAp.textContent=e,this.statusTextAdv.textContent=e;let n=this.shadow.querySelector("#eq-operation-state");n&&(n.textContent=t==="error"?"Bloqueado":t==="success"?"Confirmado":this.autopilot.isActive()?"Monitorando":"Pronto",n.className=`eq-operation-state is-${t}`),t==="error"?(this.dotPulseAp.className="eq-dot-pulse error",this.dotPulseAdv.className="eq-dot-pulse error",this.launcherDot.className="eq-launcher-dot error"):t==="success"&&(this.dotPulseAp.className="eq-dot-pulse",this.dotPulseAdv.className="eq-dot-pulse",this.launcherDot.className="eq-launcher-dot");let a=e.includes("Alternando")||e.includes("indispon\xEDvel")||e.includes("fallback")||e.includes("alternativo"),i=t==="error"?"> [ERRO] ":t==="success"?"> [SUCESSO] ":a?"> [FALLBACK] ":"> [SYS] ",s=t==="error"?"text-red":t==="success"?"text-green":a?"text-yellow":"text-blue";this.logToConsole(`${i}${e}`,s)}setPlan(e,t){this.latestPlan=e,this.resultContainer.style.display="flex",e.durationMs&&this.stopStopwatch(e.durationMs);let n=this.shadow.querySelector("#eq-badges");n.replaceChildren();let a=[e.mode.replace("_"," "),`${Math.round(e.confidence*100)}% Confian\xE7a`,`${e.actions.length} a\xE7\xF5es`,...e.usedModel?[e.usedModel]:[]];for(let l of a){let u=document.createElement("span");u.className="eq-brand-badge",u.textContent=l,n.appendChild(u)}let i=this.shadow.querySelector("#eq-rationale-text");i.textContent=e.rationale;let s=this.shadow.querySelector("#eq-actions-list");s.innerHTML="";for(let l of e.actions){let u=document.createElement("div");u.className="eq-action-item";let d="";l.t==="chk"?d=`chk ${l.id} (${l.c})`:l.t==="val"?d=`val "${l.v}" -> ${l.id}`:l.t==="sel"?d=`sel "${Array.isArray(l.v)?l.v.join(","):l.v}" -> ${l.id}`:l.t==="clk"?d=`clk ${l.id}`:l.t==="adv"?d="adv":l.t==="js"?d=`js: ${String(l.v).slice(0,40)}...`:l.t==="drag"&&(d=`drag "${l.from}" -> "${l.to}"`);let p=document.createElement("span");p.className="eq-action-badge",p.textContent=l.t.toUpperCase();let c=document.createElement("span");c.textContent=d,u.append(p,c),s.appendChild(u)}this.applyBtn.disabled=!t||!e.actions.length;let r=this.shadow.querySelector("#eq-execution-card");r&&(r.hidden=!0),this.refreshInspectorView(),this.refreshDebugView()}setExecutionReport(e){let t=this.shadow.querySelector("#eq-execution-card"),n=this.shadow.querySelector("#eq-execution-summary"),a=this.shadow.querySelector("#eq-execution-list");if(!t||!n||!a)return;t.hidden=!1,n.textContent=e.navigationVerified?`${e.verified}/${e.applied} a\xE7\xF5es verificadas. Navega\xE7\xE3o confirmada.`:`${e.verified}/${e.applied} a\xE7\xF5es verificadas. ${e.navigationEvidence}`,n.className=`eq-execution-summary ${e.success?"is-success":"is-warning"}`,a.replaceChildren();let i=this.shadow.querySelector("#eq-execution-placeholder");i&&(i.textContent=e.navigationVerified?"Fluxo conclu\xEDdo: aplica\xE7\xE3o e navega\xE7\xE3o confirmadas.":`Fluxo interrompido: ${e.navigationEvidence}`,i.className=`eq-execution-placeholder ${e.success?"is-success":"is-warning"}`);for(let s of e.reports){let r=document.createElement("div");r.className=`eq-execution-row ${s.verified?"is-success":"is-failed"}`;let l=document.createElement("span");l.className="eq-execution-state",l.textContent=s.verified?"OK":"FALHOU";let u=document.createElement("div");u.className="eq-execution-details";let d=document.createElement("strong");d.textContent=s.target;let p=document.createElement("span");if(p.textContent=`${s.strategy} | ${s.evidence}`,u.append(d,p),r.append(l,u),s.error){let c=document.createElement("small");c.textContent=s.error,r.appendChild(c)}a.appendChild(r)}}setInspectorPrompt(e,t){this.latestPromptText=e,this.inspPrompt&&(this.inspPrompt.textContent=e),t&&this.inspModel&&(this.inspModel.textContent=t),this.inspLatency&&(this.inspLatency.textContent="Aguardando IA..."),this.activeTab==="debug"&&this.refreshDebugView()}refreshInspectorView(){let e=this.latestPlan;if(e)if(this.inspModel.textContent=e.usedModel||this.initialSettings.model,this.inspLatency.textContent=e.durationMs?`${e.durationMs}ms`:"--",this.inspTokens.textContent=e.tokensUsed?`${e.tokensUsed}`:"--",this.inspPrompt.textContent=e.promptSent||this.latestPromptText||"Prompt n\xE3o registrado para esta requisi\xE7\xE3o.",this.inspRationale.textContent=e.rationale,this.inspActions.innerHTML="",e.actions.length>0)for(let t of e.actions){let n=document.createElement("div");n.className="eq-action-item",n.textContent=JSON.stringify(t),this.inspActions.appendChild(n)}else this.inspActions.innerHTML='<div class="text-muted" style="padding: 4px;">Nenhuma a\xE7\xE3o prescrita pela IA.</div>';else this.latestPromptText&&(this.inspPrompt.textContent=this.latestPromptText)}showFloatingAnswers(e){let t=e||this.latestPlan;t&&this.floatingAnswers.show(t)}hideFloatingAnswers(){this.floatingAnswers.hide()}isFloatingAnswersOpen(){return this.floatingAnswers.isOpen()}updateModelSelect(e,t){let n=t||this.initialSettings.model||this.modelSelect.value;this.modelSelect.innerHTML="";let a=!1;e.forEach(i=>{let s=i.id===n;s&&(a=!0),this.modelSelect.add(new Option(i.name,i.id,!1,s))}),!a&&n&&this.modelSelect.add(new Option(`Gemini (${n})`,n,!1,!0)),this.modelSelect.value=n}updateSelectedModel(e){Array.from(this.modelSelect.options).some(n=>n.value===e)||this.modelSelect.add(new Option(`Gemini (${e})`,e,!1,!0)),this.modelSelect.value=e}applyHostDarkMode(e){document.getElementById("eq-host-dark-mode-style")?.remove(),this.host.classList.toggle("eq-dark-mode-active",e)}destroy(){this.stopStopwatch(),this.autopilot.stop(),this.applyHostDarkMode(!1),this.callbacks.onDestroy(),this.host.remove()}};async function Ht(){let o=window;if(o.__easyquiz){o.__easyquiz.toggle();return}let e=ge(),t=null,n=new pe(e,{onAnalyze:(s=1)=>a(s),onApply:(s=1)=>void i(s),onDestroy:()=>{W(),delete o.__easyquiz},onSettingsChange:s=>{e=Ne(s)}});o.__easyquiz={toggle:()=>n.toggle(),destroy:()=>n.destroy(),analyze:async()=>{await a()}},window.addEventListener("keydown",s=>{if(s.altKey&&(s.key==="q"||s.key==="Q")){if(s.preventDefault(),!n)return;n.toggle(!0),a()}});async function a(s=1){if(!e.apiKey){n.setStatus("Configure sua chave de API Gemini acima para come\xE7ar.","error"),n.toggle(!0);return}n.setBusy(!0,"Identificando o bloco da quest\xE3o ativa na p\xE1gina..."),n.setProgress(20,"Varrendo escopo do DOM e controles..."),W(),n.hideFloatingAnswers();try{let r=J(!1);r||(n.setStatus("Nenhum controle detectado. Tentando captura de tela inteira...","info"),r=G()),Ie(r.scope),n.updateContext(r),n.logToConsole(`> [DOM] Escopo: <${r.scope.tagName.toLowerCase()}> com ${r.controls.length} controle(s) e ${r.questionText.length} caracteres.`,"text-blue"),n.setStatus(`Quest\xE3o localizada (${r.controls.length} controles). Preparando an\xE1lise...`,"info"),n.setProgress(40,`Consultando Gemini (${e.model})...`);let l=await $e(r.scope,e.useVision);n.setStatus(l.length>0?`Consultando Gemini (${e.model}) com ${l.length} imagem(ns) anexada(s)...`:`Consultando Gemini (${e.model}) via DOM nativo (modo r\xE1pido)...`,"info");let u=K(r,l,e);n.setInspectorPrompt(u,e.model);let d=(h,g)=>{n.setStatus(h,g==="warning"?"info":g);let b=g==="error"?"[ERRO]":g==="warning"?"[FALLBACK]":"[SYS]",x=g==="error"?"text-red":g==="warning"?"text-yellow":"text-muted";n.logToConsole(`> ${b} ${h}`,x)},{plan:p,usedModel:c}=await ye(r,l,e,d);if(p.needsMoreContext){n.setProgress(55,"Ampliando escopo da quest\xE3o..."),n.setStatus("Enunciado ou contexto isolado detectado pela IA. Acionando Sele\xE7\xE3o Geral Expandida...","info"),n.logToConsole("> [DOM] Enunciado isolado. Ampliando escopo para sele\xE7\xE3o expandida...","text-blue"),r=J(!0),r||(r=G()),Ie(r.scope),n.updateContext(r),l=await $e(r.scope,e.useVision),n.setStatus(`Reconsultando IA com escopo ampliado (${r.controls.length} controles)...`,"info");let h=K(r,l,e);n.setInspectorPrompt(h,e.model),p=(await ye(r,l,e,d)).plan}return n.setProgress(70,"Resposta recebida da IA! Processando plano..."),n.logToConsole(`> [IA] Modelo: ${c||e.model} | Modo: ${p.mode} | Confian\xE7a: ${(p.confidence*100).toFixed(0)}%`,"text-green"),p.rationale&&n.logToConsole(`> [IA] Racioc\xEDnio: "${p.rationale}"`,"text-blue"),n.logToConsole(`> [IA] ${p.actions.length} a\xE7\xE3o(\xF5es) prescritas no plano.`,"text-blue"),p.memoryToStore&&(Oe(p.memoryToStore),n.logToConsole(`> [RAG] \u{1F9E0} Nova mem\xF3ria te\xF3rica salva na sess\xE3o: "${p.memoryToStore}"`,"text-yellow")),t=p,n.updateContext(r,p),at(p.actions),n.setPlan(p,!e.dryRun),p.pageType==="conclusion"?(n.setProgress(100,"Atividade conclu\xEDda!"),n.setStatus("Atividade conclu\xEDda ou tela final detectada pela IA.","success")):p.pageType==="info"?(n.setProgress(100,"Contexto absorvido na mem\xF3ria!"),n.setStatus("\u{1F4D8} Conte\xFAdo de contexto absorvido na mem\xF3ria RAG. Avan\xE7ando...","success")):p.pageType==="start"?(n.setProgress(100,"In\xEDcio detectado!"),n.setStatus("In\xEDcio de atividade detectado. Iniciando...","info")):(n.setProgress(80,"Plano de resolu\xE7\xE3o pronto!"),n.setStatus(e.dryRun?"Simula\xE7\xE3o conclu\xEDda. As respostas foram real\xE7adas na p\xE1gina sem altera\xE7\xE3o.":"Resolu\xE7\xE3o pronta! Verifique o realce na tela e aplique quando desejar.","success")),e.dryRun&&p.pageType==="question"&&n.showFloatingAnswers(p),e.autoApply&&!e.dryRun&&await i(s),p}catch(r){W(),n.setProgress(0);let l=r instanceof Error?r.message:"Falha desconhecida na an\xE1lise.";n.setStatus(l,"error"),n.logToConsole(`> [ERRO] ${l}`,"text-red"),n.setErrorDiagnostic(l,"An\xE1lise da IA");return}finally{n.setBusy(!1)}}async function i(s=1){if(!t){n.setStatus("Nenhum plano dispon\xEDvel para aplicar. Execute a an\xE1lise primeiro.","error");return}if(e.dryRun){n.setStatus("O modo de simula\xE7\xE3o est\xE1 ativo. Desmarque para poder aplicar.","error");return}let r=t.pageType==="info"||t.pageType==="start",l=(e.autoAdvance||r)&&t.confidence>=e.confidenceThreshold&&!t.needsMoreContext;n.setBusy(!0,"Aplicando respostas no formul\xE1rio..."),n.setProgress(85,`Aplicando ${t.actions.length} a\xE7\xE3o(\xF5es) no formul\xE1rio...`),n.logToConsole(`> [EXEC] Iniciando aplica\xE7\xE3o com 6 vias de persist\xEAncia para ${t.actions.length} a\xE7\xE3o(\xF5es)...`,"text-blue");try{let u=await He(t,l,s,Y(e));if(n.setExecutionReport(u),u.success||u.advanced)n.setProgress(100,"Sucesso! Respostas preenchidas e validadas!"),n.logToConsole(`> [VERIF] \u2713 Sucesso no DOM: ${u.verified}/${u.applied} a\xE7\xF5es validadas com sucesso!`,"text-green"),u.advanced?n.logToConsole("> [NAV] \u2713 Bot\xE3o de confirma\xE7\xE3o/avan\xE7o acionado com sucesso!","text-green"):l&&n.logToConsole(`> [NAV] \u26A0\uFE0F ${u.navigationEvidence}`,"text-yellow"),n.setStatus(u.advanced?`Sucesso: ${u.applied} resposta(s) preenchida(s) e pr\xF3xima quest\xE3o confirmada.`:`Respostas preenchidas e validadas. Avan\xE7o n\xE3o confirmado: ${u.navigationEvidence}`,u.advanced||!l?"success":"info"),n.hideFloatingAnswers();else{n.setProgress(0,"Aplica\xE7\xE3o parcial: verifica\xE7\xE3o incompleta.");let d=u.failed.length>0?u.failed.join(", "):"alvos pendentes";n.logToConsole(`> [VERIF] Alerta: ${u.verified}/${u.applied} a\xE7\xF5es verificadas. Pend\xEAncias: ${d}.`,"text-yellow"),n.setStatus(`Aplica\xE7\xE3o parcial (${u.applied} enviadas, ${u.verified} verificadas).`,"info"),n.hideFloatingAnswers()}}catch(u){n.setProgress(0);let d=u instanceof Error?u.message:"Falha ao aplicar plano.";n.setStatus(d,"error"),n.logToConsole(`> [ERRO] ${d}`,"text-red"),n.hideFloatingAnswers()}finally{n.setBusy(!1)}}n.toggle(!0)}Ht().catch(o=>{console.error("[EasyQuiz] Erro fatal na inicializa\xE7\xE3o:",o),window.alert(`EasyQuiz: falha ao iniciar: ${o instanceof Error?o.message:String(o)}`)});})();
