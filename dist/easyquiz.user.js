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
"use strict";(()=>{var N={apiKey:"",model:"gemini-3.8-flash",uiMode:"easy",modeHint:"",engine:"smart",dryRun:!1,autoApply:!0,autoAdvance:!1,hostDarkMode:!0,useVision:!1,confidenceThreshold:.8};var ge="easyquiz_settings_v2";function fe(){try{let o=localStorage.getItem(ge);if(!o){let n=localStorage.getItem("easyquiz_settings_v1");if(n){let i=JSON.parse(n);return{...N,apiKey:i.apiKey||""}}return{...N}}let e=JSON.parse(o),t=typeof e.model=="string"&&e.model?e.model:N.model;return{apiKey:typeof e.apiKey=="string"?e.apiKey.trim():N.apiKey,model:t,uiMode:e.uiMode==="easy"||e.uiMode==="advanced"?e.uiMode:N.uiMode,modeHint:e.modeHint??"",engine:e.engine??"smart",dryRun:!!e.dryRun,autoApply:e.autoApply!==void 0?!!e.autoApply:!0,autoAdvance:!!e.autoAdvance,hostDarkMode:e.hostDarkMode!==void 0?!!e.hostDarkMode:!0,useVision:!!e.useVision,confidenceThreshold:typeof e.confidenceThreshold=="number"?e.confidenceThreshold:N.confidenceThreshold}}catch{return{...N}}}function Oe(){try{localStorage.removeItem(ge),localStorage.removeItem("easyquiz_settings_v1");let o=[];for(let e=0;e<localStorage.length;e++){let t=localStorage.key(e);t&&(t.startsWith("eq_")||t.startsWith("easyquiz_"))&&o.push(t)}o.forEach(e=>localStorage.removeItem(e)),be()}catch(o){console.warn("[EasyQuiz] Erro ao resetar dados:",o)}}function K(o){try{let e=localStorage.getItem("eq_domain_cache_"+o);if(!e)return{};let t=JSON.parse(e);if(t.advanceSelector&&/inject|injetar/i.test(t.advanceSelector)){t.advanceSelector=void 0;try{localStorage.removeItem("eq_domain_cache_"+o)}catch{}}return t}catch{return{}}}function ve(o,e){if(e.advanceSelector&&/inject|injetar/i.test(e.advanceSelector))return;let n={...K(o),...e};try{localStorage.setItem("eq_domain_cache_"+o,JSON.stringify(n))}catch(i){console.warn("[EasyQuiz] Erro cache de dominio:",i)}}function Ve(o){let t={...fe(),...o};try{localStorage.setItem(ge,JSON.stringify(t))}catch(n){console.warn("[EasyQuiz] Falha ao persistir configura\xE7\xF5es no localStorage:",n)}return t}var O=[],Be=12,dt=1200;function _e(o){let e=o.trim().replace(/\s+/g," ").slice(0,dt);e&&!O.includes(e)&&(O.push(e),O.length>Be&&(O=O.slice(-Be)))}function oe(){return O}function be(){O=[]}var je=[{id:"native-value-events",widget:"text",label:"Setter nativo com input/change/blur",precondition:"Campo edit\xE1vel vis\xEDvel e n\xE3o desabilitado.",evidence:"value ou textContent coincide exatamente com o valor esperado.",risk:"low",cost:"fast"},{id:"native-choice-state",widget:"choice",label:"Estado nativo de radio/checkbox",precondition:"Input ou widget ARIA \xFAnico localizado.",evidence:"checked/aria-checked/data-state do alvo e grupo correspondem ao esperado.",risk:"low",cost:"fast"},{id:"native-select-events",widget:"select",label:"Sele\xE7\xE3o nativa por value/texto exato",precondition:"Select vis\xEDvel com op\xE7\xE3o correspondente.",evidence:"option.selected e selected value correspondem ao esperado.",risk:"low",cost:"fast"},{id:"aria-combobox-keyboard",widget:"combobox",label:"Combobox ARIA por foco e teclado",precondition:"Combobox vis\xEDvel com popup/op\xE7\xF5es acess\xEDveis.",evidence:"aria-expanded, aria-activedescendant ou op\xE7\xE3o selecionada mudam.",risk:"medium",cost:"normal"},{id:"click-to-place",widget:"drag",label:"Selecionar item e clicar no destino",precondition:"Cart\xE3o e dropzone vis\xEDveis com protocolo click-to-place.",evidence:"Item passa a ser filho do destino ou recebe estado de colocado.",risk:"medium",cost:"normal"},{id:"html5-drag-drop",widget:"drag",label:"HTML5 dragstart/dragover/drop",precondition:"Origem draggable e destino aceita drag/drop.",evidence:"Relocation, callback ou estado placed confirmado.",risk:"medium",cost:"normal"},{id:"keyboard-order",widget:"order",label:"Ordena\xE7\xE3o por foco e teclado",precondition:"Itens orden\xE1veis com foco/roles ou bot\xF5es de mover.",evidence:"Ordem dos itens no DOM corresponde \xE0 sequ\xEAncia esperada.",risk:"medium",cost:"normal"},{id:"navigation-feedback",widget:"navigation",label:"Verificar e confirmar feedback/transi\xE7\xE3o",precondition:"Bot\xE3o de verifica\xE7\xE3o/avan\xE7o \xFAnico e habilitado.",evidence:"Feedback esperado e assinatura espec\xEDfica da quest\xE3o mudam.",risk:"high",cost:"normal"},{id:"javascript-explicit",widget:"javascript",label:"JavaScript limitado via capability expl\xEDcita",precondition:"Engine javascript autorizada e a\xE7\xE3o declarativa insuficiente.",evidence:"Efeito DOM esperado confirmado por verificador.",risk:"high",cost:"last-resort"}];function ut(o){if(!o||o.length===0)return je.filter(t=>t.widget!=="javascript");let e=new Set(o);return je.filter(t=>e.has(t.widget))}function Ge(o){return ut(o).map(e=>`${e.id}: ${e.label} | pr\xE9: ${e.precondition} | prova: ${e.evidence} | risco: ${e.risk}`).join(`
`)}var Fe=`Voc\xEA \xE9 o motor operacional inteligente do EasyQuiz. Sa\xEDda EXCLUSIVA em JSON minificado, sem markdown ou conversa.

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
`;function Y(o,e,t){let n=o.htmlSnippet.includes("draggable")||o.htmlSnippet.includes("perseus")||o.htmlSnippet.includes("category")||o.htmlSnippet.includes("dropzone")||o.controls.some(l=>l.type==="draggable"||l.type==="dropzone"),i=new Set(["navigation"]);o.controls.some(l=>["text","number","textarea","contenteditable"].some(p=>l.type.includes(p)))&&i.add("text"),o.controls.some(l=>["radio","checkbox"].includes(l.type)||l.tag==="button")&&i.add("choice"),o.controls.some(l=>l.tag==="select")&&i.add("select"),o.controls.some(l=>/combobox|dropdown/i.test(l.type))&&i.add("combobox"),(o.controls.some(l=>["draggable","dropzone"].includes(l.type))||n)&&i.add("drag"),t.engine==="javascript"&&i.add("javascript");let a=/katex|latex|math|matrix|formula|frac|\$|\^|\_/i.test(o.htmlSnippet)||/calcular|calcule|resolva|matriz|equação|função|probabilidade|geometria|fórmula|coordenada|sistema/i.test(o.questionText),r=o.questionText.length<250||n||o.controls.length<4||a?`
[HTML]:
${o.htmlSnippet.slice(0,3500).replace(/\s+/g," ")}`:`
[HTML]: Omitido.`,c=oe(),d=c.length>0?`
[MEM\xD3RIA]:
${c.join(" | ")}
`:"",h=o.controls.filter(l=>l.role!=="navigation"),u=o.controls.filter(l=>l.role==="navigation");return`--- AN\xC1LISE ---
[MODO]: ${t.engine} | Dica: ${t.modeHint||"Auto"}
[URL]: ${o.sourceUrl}
[P\xC1GINA]: ${o.pageTitle}${d}
[ESTRAT\xC9GIAS]:
${Ge([...i])}
[DADOS]
[TEXTO]:
${o.questionText}${r}

[RESPOSTAS]:
${h.length>0?JSON.stringify(h.map(l=>({id:l.id,t:l.type,n:l.name||void 0,txt:l.label,v:l.value||void 0,opt:l.options.length?l.options:void 0}))):"Nenhuma"}

[NAVEGA\xC7\xC3O]:
${u.length>0?u.map(l=>`"${l.label||l.id}"[${l.type}]`).join(","):"Nenhuma"}

[IMAGENS]: ${e.length}
[/DADOS]
Sa\xEDda em JSON v\xE1lido.`}var pt=new Set(["question","info","start","conclusion"]),ht=new Set(["texto_livre","escolha_unica","escolha_multipla","verdadeiro_falso","preenchimento","acao_sem_resposta","categorizacao","ordenacao","arrastar_soltar"]),mt=new Set(["val","chk","sel","clk","adv","js","drag"]),gt=150,J=2e3;function z(o,e=""){return o==null?e:typeof o=="string"?o.trim().slice(0,J):typeof o=="number"||typeof o=="boolean"?String(o).trim().slice(0,J):e}function ft(o,e){if(!o||typeof o!="object")return null;let t=o,n=t.t;if(typeof n!="string"||!mt.has(n))return null;if(n==="adv"){let r=t.id??t.target??t.name??t.selector;return{t:"adv",...z(r)?{id:z(r,"").slice(0,500)}:{}}}if(n==="drag"){let r=z(t.from??t.source),c=z(t.to??t.target??t.destination);return!r||!c?null:{t:"drag",from:r.slice(0,500),to:c.slice(0,500)}}if(n==="js"){let r=z(t.v??t.code??t.script);return!r||r.length>8e3?null:{t:"js",v:r}}let i=t.id??t.target??t.name??t.selector??t.element;(i==null||i==="")&&n==="val"&&(i="1");let a=z(i).slice(0,500);if(!a)return null;if(n==="val"){let r=t.v!==void 0?t.v:t.value!==void 0?t.value:t.val!==void 0?t.val:t.text!==void 0?t.text:t.answer;return{t:"val",id:a,v:z(r).slice(0,J)}}if(n==="sel"){let r=t.v!==void 0?t.v:t.value!==void 0?t.value:t.val!==void 0?t.val:t.values,d=(Array.isArray(r)?r:[r]).map(h=>z(h).slice(0,500)).filter(Boolean);return{t:"sel",id:a,v:d}}if(n==="chk"){let r=t.c===!1||t.c==="false"||t.c===0||t.c==="0"||t.c==="off"||t.c==="unchecked"||t.c==="desmarcar",c={t:"chk",id:a,c:!r};return t.v!==void 0&&(c.v=z(t.v).slice(0,J)),c}let s={t:"clk",id:a};if(t.c!==void 0){let r=t.c===!1||t.c==="false"||t.c===0||t.c==="0"||t.c==="off"||t.c==="unchecked"||t.c==="desmarcar";s.c=!r}return t.v!==void 0&&(s.v=z(t.v).slice(0,J)),Array.isArray(t.co)&&t.co.length===2&&t.co.every(r=>typeof r=="number"&&Number.isFinite(r))&&(s.co=[t.co[0],t.co[1]]),s}function Ue(o){if(!o||typeof o!="object")return{pageType:"info",mode:"acao_sem_resposta",confidence:.5,rationale:"Resposta estruturada n\xE3o identificada; avan\xE7ando como informativo.",actions:[{t:"adv"}]};let e=o,t=e.pageType,n=e.mode;(typeof t!="string"||!pt.has(t))&&(t="question"),(typeof n!="string"||!ht.has(n))&&(n="escolha_unica");let i=Array.isArray(e.actions)?e.actions:[],a=[];for(let d=0;d<Math.min(i.length,gt);d++){let h=ft(i[d],d);h&&a.push(h)}let s=a.filter(d=>d.t!=="adv"),r=a.some(d=>d.t==="adv");t==="conclusion"?a.length=0:t==="info"||t==="start"?r||a.push({t:"adv"}):t==="question"&&!r&&a.push({t:"adv"});let c=typeof e.confidence=="number"&&Number.isFinite(e.confidence)?Math.min(1,Math.max(0,e.confidence)):.85;return{pageType:t,mode:n,confidence:c,rationale:z(e.rationale,"Plano validado e auto-recuperado."),actions:a,...z(e.memoryToStore)?{memoryToStore:z(e.memoryToStore)}:{},...e.needsMoreContext?{needsMoreContext:!!e.needsMoreContext}:{}}}var V=[{id:"gemini-2.0-flash",name:"Gemini 2.0 Flash (Mais R\xE1pido e Est\xE1vel)",description:"Modelo oficial de ultra-baixa lat\xEAncia do Google com suporte multimodal completo.",stable:!0},{id:"gemini-1.5-flash",name:"Gemini 1.5 Flash (Equilibrado e Confi\xE1vel)",description:"Modelo comprovado de alt\xEDssima disponibilidade e estabilidade.",stable:!0},{id:"gemini-2.5-flash",name:"Gemini 2.5 Flash (Racioc\xEDnio R\xE1pido)",description:"Modelo multimodal de racioc\xEDnio avan\xE7ado.",stable:!0},{id:"gemini-2.0-flash-lite-preview-02-05",name:"Gemini 2.0 Flash-Lite (Econ\xF4mico)",description:"Modelo leve e \xE1gil para respostas r\xE1pidas.",stable:!0},{id:"gemini-1.5-pro",name:"Gemini 1.5 Pro (Alta Precis\xE3o)",description:"Modelo de m\xE1xima precis\xE3o para problemas complexos.",stable:!0}],vt={type:"OBJECT",properties:{pageType:{type:"STRING",enum:["question","info","start","conclusion"]},mode:{type:"STRING",enum:["texto_livre","escolha_unica","escolha_multipla","verdadeiro_falso","preenchimento","acao_sem_resposta","categorizacao","ordenacao","arrastar_soltar"]},confidence:{type:"NUMBER"},rationale:{type:"STRING"},memoryToStore:{type:"STRING"},actions:{type:"ARRAY",items:{type:"OBJECT",properties:{t:{type:"STRING",enum:["val","chk","sel","clk","adv","js","drag"]},id:{type:"STRING"},v:{},c:{type:"BOOLEAN"},co:{type:"ARRAY",items:{type:"NUMBER"}},from:{type:"STRING"},to:{type:"STRING"}},required:["t"]}}},required:["pageType","mode","confidence","rationale","actions"]};function bt(o){return o.trim().replace(/^google\//,"").replace(/^models\//,"")||"gemini-2.0-flash"}function Qe(o,e){let t="";try{let n=JSON.parse(o);t=n.error?.message||n.message||""}catch{t=o.slice(0,160)}return/API_KEY_INVALID|API key not valid|key.*invalid|unregistered/i.test(t)?"Chave de API do Gemini inv\xE1lida ou n\xE3o autorizada no Google AI Studio.":/RESOURCE_EXHAUSTED|Quota exceeded/i.test(t)||e===429?"Limite tempor\xE1rio de cota do Gemini (HTTP 429) atingido. Aguardando recupera\xE7\xE3o...":e===404?`HTTP 404: ${t||"Modelo ou endpoint n\xE3o encontrado no Google AI Studio"}`:e===503||/overloaded/i.test(t)?`Servidores Google sobrecarregados (HTTP 503): ${t||"Aguardando"}`:t?`Erro Gemini (HTTP ${e}): ${t}`:`Falha na requisi\xE7\xE3o ao Gemini (HTTP ${e}).`}function yt(o){let e=o.trim(),t=e.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);if(t)try{return JSON.parse(t[1].trim())}catch{}try{return JSON.parse(e)}catch{}let n=e.match(/\{[\s\S]*\}/);if(n)try{return JSON.parse(n[0].trim())}catch{}throw new Error("Falha ao decodificar JSON da IA.")}var ne=(()=>{try{let o=typeof localStorage<"u"?localStorage.getItem("easyquiz_cached_models"):null;return o?JSON.parse(o):null}catch{return null}})(),ye=new Set;async function ae(o){let e=o.trim().replace(/^["']|["']$/g,"");if(!e)return V;let t=[`https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(e)}`,`https://generativelanguage.googleapis.com/v1/models?key=${encodeURIComponent(e)}`];for(let n of t)try{let i=await fetch(n,{headers:{"Content-Type":"application/json","x-goog-api-key":e}});if(!i.ok){let s=await i.text(),r=Qe(s,i.status);if(r.includes("inv\xE1lida")||r.includes("n\xE3o autorizada"))throw new Error(r);continue}let a=await i.json();if(Array.isArray(a.models)&&a.models.length>0){let s=a.models.filter(r=>{let c=r.supportedGenerationMethods||[],d=(r.name||"").includes("gemini"),h=c.includes("generateContent"),u=(r.name||"").includes("embedding")||(r.name||"").includes("tts")||(r.name||"").includes("imagen")||(r.name||"").includes("aqa")||(r.name||"").includes("computer-use");return d&&h&&!u}).map(r=>{let c=r.supportedGenerationMethods||[],d=r.name.replace(/^models\//,""),h=r.displayName||d;return{id:d,name:h.includes(d)?h:`${h} (${d})`,description:r.description||"",stable:!/-preview|-experimental|-latest/i.test(d),supportsVision:!/embedding|tts|transcribe|live|image/i.test(d),supportsStructuredOutput:c.includes("generateContent"),supportedGenerationMethods:c,discoveredAt:Date.now()}});if(s.length>0){s.sort((r,c)=>{let d=h=>h==="gemini-3.8-flash"?120:h==="gemini-3.5-flash-lite"?115:h==="gemini-2.5-flash"?100:h==="gemini-3.1-pro-preview"?90:h.includes("flash")?50:10;return d(c.id)-d(r.id)}),ne=s;try{typeof localStorage<"u"&&localStorage.setItem("easyquiz_cached_models",JSON.stringify(s))}catch{}return s}}}catch(i){if(i.message?.includes("Chave de API"))throw i}return V}async function Ke(o){let e=o.trim().replace(/^["']|["']$/g,"");if(!e)return{ok:!1,message:"Insira sua chave de API."};try{let n=await ae(e);if(n.length>0&&n!==V){let i=n[0];return{ok:!0,message:`Chave v\xE1lida! ${n.length} modelos Gemini dispon\xEDveis em sua conta. Recomendado: ${i.name}`,models:n}}}catch(n){return{ok:!1,message:n instanceof Error?n.message:String(n)}}let t=["gemini-3.8-flash","gemini-3.5-flash-lite","gemini-2.5-flash"];for(let n of t)for(let i of["v1beta","v1"]){let a=`https://generativelanguage.googleapis.com/${i}/models/${n}:generateContent?key=${encodeURIComponent(e)}`;try{if((await fetch(a,{method:"POST",headers:{"Content-Type":"application/json","x-goog-api-key":e},body:JSON.stringify({contents:[{role:"user",parts:[{text:"PING"}]}],generationConfig:{maxOutputTokens:5}})})).ok)return{ok:!0,message:`Chave validada com sucesso no ${n} (${i})!`,models:V}}catch{}}return{ok:!1,message:"Chave de API inv\xE1lida, sem cota ou sem permiss\xE3o para modelos Gemini."}}async function xe(o,e,t,n){let i=t.apiKey.trim().replace(/^["']|["']$/g,"");if(!i)throw new Error("Chave de API n\xE3o configurada.");let a=bt(t.model);if(!ne||ne.length===0)try{n?.("Verificando modelos autorizados na sua chave de API...","info"),await ae(i)}catch(p){let g=p instanceof Error?p.message:String(p);if(g.includes("inv\xE1lida")||g.includes("n\xE3o autorizada"))throw new Error(g)}let s=Date.now(),r=Y(o,e,t),c=[{text:r}];for(let p of e)c.push({inline_data:{mime_type:p.mediaType,data:p.base64}});let d={temperature:.05,maxOutputTokens:2500,response_mime_type:"application/json",response_schema:vt},h=[a,...ne?.map(p=>p.id)||[],"gemini-2.0-flash","gemini-1.5-flash","gemini-2.5-flash","gemini-2.0-flash-lite-preview-02-05","gemini-1.5-pro"],u=Array.from(new Set(h)).filter(p=>!ye.has(p));u.length===0&&(ye.clear(),u.push(...V.map(p=>p.id)));let l=new Error("Nenhum modelo tentado.");for(let p=0;p<u.length;p++){let g=u[p],b=u[p+1],y={system_instruction:{parts:[{text:Fe}]},contents:[{role:"user",parts:c}],generationConfig:d};n?.(`Consultando Gemini (${g})...`,"info");let m=["v1beta","v1"];for(let q of m){let T=`https://generativelanguage.googleapis.com/${q}/models/${g}:generateContent?key=${encodeURIComponent(i)}`,M=new AbortController,S=setTimeout(()=>{try{M.abort(new Error(`Timeout de 18s excedido na API Gemini (${g}). Servidor demorou a responder.`))}catch{M.abort()}},18e3);try{let H=await fetch(T,{method:"POST",headers:{"Content-Type":"application/json","x-goog-api-key":i},body:JSON.stringify(y),signal:M.signal});if(clearTimeout(S),!H.ok){let Ne=await H.text();if(H.status===400&&d.thinkingConfig&&/thinking/i.test(Ne)){delete d.thinkingConfig,y.generationConfig=d;continue}let ct=Qe(Ne,H.status);if(H.status===404&&q==="v1beta")continue;throw new Error(ct)}let Q=await H.json(),me=Q.candidates?.[0];if(!me||!me.content?.parts?.[0]?.text)throw new Error("A IA n\xE3o retornou uma resposta estruturada v\xE1lida.");let De=me.content.parts[0].text,D=Ue(yt(De));if(D.usedModel=g,D.durationMs=Date.now()-s,D.promptSent=r,D.tokensUsed=Q.usageMetadata?.totalTokenCount,D.promptTokens=Q.usageMetadata?.promptTokenCount,D.candidatesTokens=Q.usageMetadata?.candidatesTokenCount,D.rawResponse=De,g!==a){n?.(`Resolvido com sucesso pelo fallback '${g}' (${q})!`,"info");try{t.model=g}catch{}}return{plan:D,rawUsage:Q.usageMetadata,usedModel:g}}catch(H){if(clearTimeout(S),H instanceof Error&&(H.name==="AbortError"||H.message.includes("aborted")||H.message.includes("Timeout"))?l=new Error(`Timeout de 9s excedido na API Gemini (${g}). Sem resposta imediata.`):l=H,l.message.includes("inv\xE1lida")||l.message.includes("n\xE3o autorizada"))throw l;if(l.message.includes("Timeout")||l.message.includes("503")||l.message.includes("429"))break}}let v=l.message.includes("429")||l.message.includes("cota");if(l.message.includes("404")&&ye.add(g),b){let q=v?500:150,T=`Modelo '${g}' indispon\xEDvel (${l.message}). Alternando imediatamente para '${b}'...`;console.warn(`[EasyQuiz Fallback] ${T}`),n?.(T,"warning"),q>0&&await new Promise(M=>setTimeout(M,q))}else console.warn(`[EasyQuiz Fallback] Modelo '${g}' falhou: ${l.message}. Todos os modelos esgotados.`)}throw l}var xt=[/\bfetch\b/i,/\bXMLHttpRequest\b/i,/\bWebSocket\b/i,/\b(?:localStorage|sessionStorage|indexedDB)\b/i,/\b(?:eval|Function|AsyncFunction|GeneratorFunction)\b/i,/\bimport(?:Scripts)?\b/i,/\bnavigator\s*\.\s*credentials\b/i,/\b(?:cookie|location\s*=|history\s*\.)/i,/\bwindow\s*\[\s*['"](?:fetch|eval|Function|localStorage|sessionStorage)/i];function X(o){let e=o?.engine||"smart",t=new Set(["dom","framework","keyboard","drag"]);return o?.autoAdvance&&t.add("navigation"),e==="javascript"&&t.add("javascript"),{engine:e,capabilities:t,maxAttemptsPerAction:e==="command"?1:2,maxActionMs:e==="command"?1500:3e3,allowJavaScript:e==="javascript",allowNavigation:!!o?.autoAdvance}}function qe(o,e){if(o.t==="js"&&!e.allowJavaScript)throw new Error("A\xE7\xE3o JavaScript bloqueada pela engine atual. Use o motor JavaScript explicitamente.");if(o.t==="adv"&&!e.allowNavigation)throw new Error("Avan\xE7o autom\xE1tico bloqueado pela pol\xEDtica atual.")}function Ye(o){if(!o.trim())throw new Error("JavaScript recusado: c\xF3digo vazio.");if(o.length>8e3)throw new Error("JavaScript recusado: c\xF3digo acima do limite operacional.");if(xt.find(t=>t.test(o)))throw new Error("JavaScript recusado: acesso externo, persist\xEAncia ou avalia\xE7\xE3o din\xE2mica n\xE3o permitidos.");if(!/^\s*(?:\/\/[^\n]*\n|\/\*[\s\S]*?\*\/|[\s\S])*\$eq\./.test(o)&&!o.includes("$eq."))throw new Error("JavaScript recusado: use somente a API declarativa $eq.")}var j=['input:not([type="hidden"])',"textarea","select","button","a","label",'[role="button"]','[role="link"]','[role="radio"]','[role="checkbox"]','[role="option"]','[role="treeitem"]','[role="menuitemcheckbox"]','[role="menuitemradio"]','[contenteditable="true"]','[draggable="true"]',"[aria-grabbed]","[aria-dropeffect]","[data-widget-type]",".perseus-drag-item",".sortable-item",'[data-testid*="drag" i]','[data-testid*="card" i]','[data-testid*="option" i]','[data-testid*="choice" i]','[data-testid*="category" i]',"[data-choice]","[data-option]","[data-answer]","[data-value]",".quiz-option",".option-card",".choice-card",'[class*="option-card" i]','[class*="choice-card" i]','[class*="option-item" i]','[class*="choice-item" i]','[class*="answer-item" i]','[class*="alternative" i]','li[class*="choice" i]','li[class*="option" i]','li[class*="answer" i]','[data-role="dropzone"]',"[data-category]"].join(","),ie=/(verificar|checar|check|conferir|validar|próxim[oa]|next|continuar|continue|avançar|prosseguir|enviar|submit|concluir|finalizar|terminar|começar|iniciar|start|vamos lá|próxima tarefa|next task|próxima pergunta|next question|marcar como concluíd[oa]|mostrar resumo|entendi|compreendi|ok|leitura concluída|seguir|ir para o exercício|fazer o teste|próximo artigo|ir para a aula)/i,qt=0;function we(o){try{let e=o.closest('[hidden], [style*="display: none"], [style*="display:none"], [aria-hidden="true"]');if(e&&!Ee(e))return!1}catch{}try{let e=window.getComputedStyle?window.getComputedStyle(o):o.style;if(e&&(e.display==="none"||e.visibility==="hidden"))return!1}catch{}try{if(typeof o.getBoundingClientRect=="function"){let e=o.getBoundingClientRect();if(e.width>0||e.height>0)return!0}}catch{}return(o.textContent||"").trim().length>0}function k(o){try{if(typeof CSS<"u"&&typeof CSS.escape=="function")return CSS.escape(o)}catch{}return String(o).replace(/["\\]/g,"\\$&")}function C(o){let e=o;if(!e||typeof e.isConnected=="boolean"&&!e.isConnected||Ee(e))return!1;let t=e.tagName?.toLowerCase();if(["input","select","textarea","button"].includes(t)){let n=e.type?.toLowerCase();if(n==="checkbox"||n==="radio"){if(e.id)try{let a=e.ownerDocument?.querySelector(`label[for="${k(e.id)}"]`);if(a&&we(a))return!0}catch{}let i=e.closest('label, .option-card, .quiz-option, .choice, .answer, [role="radio"], [role="checkbox"], [class*="option" i], [class*="choice" i], [class*="item" i], li, tr');if(i&&i!==e&&we(i))return!0}try{if(!e.closest('[hidden], [style*="display: none"], [style*="display:none"], [aria-hidden="true"]')){let a=window.getComputedStyle?window.getComputedStyle(e):e.style;if(!a||a.display!=="none"&&a.visibility!=="hidden"){if(typeof e.getBoundingClientRect=="function"){let s=e.getBoundingClientRect();if(s.width>0||s.height>0)return!0}return!0}}}catch{}}return we(e)}function wt(o){if(o==null)return"";if(typeof o=="string")return o;if(typeof o=="number"||typeof o=="boolean")return String(o);if(o instanceof Node)return o.textContent||"";try{if(typeof o?.toString=="function"){let e=o.toString();if(typeof e=="string")return e}}catch{}return""}function A(o,e=500){return wt(o).replace(/\s+/g," ").trim().slice(0,e)}function Et(o){let e=o.dataset.easyquizId;if(e)return e;let t=`eq-${Date.now().toString(36)}-${(qt+=1).toString(36)}`;return o.dataset.easyquizId=t,t}function Ee(o){return o?!!(o.closest('#easyquiz-shadow-root, .eq-sidebar, .eq-launcher, [data-easyquiz-ignore="true"], .btn-inject-eq, #btn-inject-script')||o.getAttribute?.("data-easyquiz-ignore")==="true"):!1}function _(o){if(!o||!(o instanceof Element)||Ee(o)||o.closest("header, nav, aside"))return!1;let e=o instanceof HTMLInputElement||o instanceof HTMLButtonElement?o.value:"",t=A(o.getAttribute?.("aria-label")||o.textContent||o.getAttribute?.("value")||e),n=o.type,i=t.replace(/[\d\(\)\[\]→\>\•\-\/\\]+/g," ").trim(),a=String(o.getAttribute?.("data-testid")||o.getAttribute?.("data-test-id")||o.getAttribute?.("id")||o.getAttribute?.("href")||"").toLowerCase();return ie.test(i)||ie.test(t)||n==="submit"||a.includes("next")||a.includes("check")||a.includes("continue")||a.includes("proximo")||a.includes("forward")||!1}function Te(o){let e=o.closest("tr");if(e){let r=e.querySelector("th, td:first-child"),c=r&&r!==o.closest("td")?A(r.textContent,100):"",d=A(o.closest("label, td")?.textContent||"",50);if(c&&d)return`${c}: ${d}`}let t=o.getAttribute("aria-label");if(t)return A(t);let n=o.getAttribute("aria-labelledby");if(n){let r=n.split(/\s+/).map(c=>document.getElementById(c)?.textContent).filter(Boolean).join(" ");if(r.trim())return A(r)}if("labels"in o&&o.labels){let r=Array.from(o.labels??[]).map(c=>c.textContent).join(" ");if(r.trim())return A(r)}let i=o.closest('.docssharedWizToggleLabeledContainer, [role="listitem"], .answer, label, .quiz-option, .form-check, .option-card');if(i&&i!==o){let r=A(i.textContent);if(r)return r}let a=o instanceof HTMLInputElement||o instanceof HTMLButtonElement?o.value:"",s=o.getAttribute("placeholder")||o.getAttribute("title")||o.textContent||a||"";return A(s)}function Ce(o,e){let t=o instanceof HTMLSelectElement?o:null,n=o;o.dataset.easyquizRole=e;let i=o.tagName.toLowerCase(),a=["input","textarea","select","button"].includes(i)?i:"other",s=o.getAttribute("role")||"",r=(o.getAttribute("data-testid")||o.getAttribute("data-test-id")||"").toLowerCase(),c=(o.className&&typeof o.className=="string"?o.className:"").toLowerCase(),d=o.getAttribute("draggable")==="true"||o.classList.contains("perseus-drag-item")||o.classList.contains("sortable-item")||!!o.getAttribute("aria-grabbed")||/drag|card|option|item/i.test(r)||/drag|card-item|sortable/i.test(c),h=o.getAttribute("data-role")==="dropzone"||o.classList.contains("category-container")||o.hasAttribute("data-category")||!!o.getAttribute("aria-dropeffect")||/drop|category|bucket/i.test(r)||/dropzone|category-box|bucket|target-zone/i.test(c),l=A((d?"draggable":h?"dropzone":"")||n.type||s||a,40),p="";if(n.type==="checkbox"||n.type==="radio"||s==="radio"||s==="checkbox")p=n.checked||o.getAttribute("aria-checked")==="true"?"checked":"unchecked";else if(a==="button"||i==="a"||e==="navigation"||_(o))p="";else{let E=o instanceof HTMLInputElement||o instanceof HTMLTextAreaElement||o instanceof HTMLSelectElement?o.value:"";p=A(E||o.getAttribute("data-category")||"",2e3)}let g=[];if(t)for(let E of Array.from(t.options).slice(0,80))g.push({value:A(E.value),label:A(E.textContent)});let b=!!(n.required||o.getAttribute("aria-required")==="true"),y=!!(n.disabled||o.getAttribute("aria-disabled")==="true"),m=Et(o);return{id:o.id||m,tag:a,type:l,label:Te(o),name:A(n.name||o.getAttribute("name")||"",180),value:p,options:g,required:b,disabled:y,role:e}}var Je=['[data-test-id*="exercise" i]','[data-testid*="exercise" i]',".perseus-renderer",".framework-perseus",".Qr7Oae",".que",".question-holder",".quiz-question",".question_holder",".display_question",'[data-functional-selector*="question"]',".question-container","[data-question-id]",'[data-testid*="question" i]','[class*="question-container" i]','[class*="question" i]','[class*="pergunta" i]',"article","form","section","main"].join(",");function Xe(o){if(!C(o))return-1/0;let e=o.getBoundingClientRect(),t=Array.from(o.querySelectorAll(j)).filter(C),n=A(o.innerText,4e3).length;if(n<10||!t.length&&n<60)return-1/0;let i=Math.max(1,window.innerWidth*window.innerHeight),a=Math.max(1,e.width*e.height),s=Math.min(1,a/i),r=e.top+e.height/2,c=Math.abs(r-window.innerHeight/2)/Math.max(1,window.innerHeight),d=n>40?35:0,h=e.top>=0&&e.bottom<=window.innerHeight?25:0;return t.length*15+Math.min(60,n/20)+d+h-s*20-c*10}function Se(o){let e=o;for(;e.parentElement&&e.parentElement!==document.body&&e.parentElement!==document.documentElement;){let t=e.parentElement,n=t.tagName.toLowerCase();if(["header","footer","nav","aside"].includes(n))break;if(t.matches?.('article, section, form, [data-test-id*="exercise" i], [data-testid*="exercise" i], .perseus-renderer, .framework-perseus, [class*="question-container" i], .que, main')){e=t;break}let i=A(e.innerText,1e4),a=A(t.innerText,1e4),s=e.querySelectorAll(j).length,r=t.querySelectorAll(j).length;if(i.length<150&&a.length>i.length&&r<=s+4){e=t;continue}break}return e}function We(o){let e=o,t=e.closest('main, [role="main"], article, form, [data-test-id*="exercise" i], [data-testid*="exercise" i], .framework-perseus, section');if(t&&t!==document.body&&C(t))return t;let n=0;for(;e.parentElement&&e.parentElement!==document.body&&n<3;)e=e.parentElement,n++;return e||document.body}function P(){let o=document.activeElement;if(o&&o!==document.body){let i=o.closest(Je);if(i&&Xe(i)>0)return Se(i)}let t=Array.from(document.querySelectorAll(Je)).map(i=>({element:i,score:Xe(i)})).filter(i=>Number.isFinite(i.score)).sort((i,a)=>a.score-i.score);if(t.length>0&&t[0].score>0)return Se(t[0].element);let n=document.querySelector('form, main, [role="main"]');return n&&C(n)?n:document.body}function Ze(o){let e=o.cloneNode(!0);e.querySelectorAll("script, style, iframe, object, embed, svg, canvas, noscript, audio, video").forEach(n=>n.remove());let t=["type","name","value","role","aria-label","aria-labelledby","aria-checked","aria-required","required","disabled","data-easyquiz-id","draggable","class","id","data-widget-type","data-role","data-category","data-testid"];return e.querySelectorAll("*").forEach(n=>{for(let i of Array.from(n.attributes))t.includes(i.name)||n.removeAttribute(i.name)}),e.outerHTML.replace(/\s+/g," ").slice(0,2e4)}function se(o){let e=Array.from(o.querySelectorAll(j)),t=new Set,n=[];for(let i of e){if(!C(i)||_(i))continue;let a=i.tagName.toLowerCase();["input","textarea","select"].includes(a)&&(t.add(i),n.push(i))}for(let i of e){if(!C(i)||_(i))continue;let a=i.tagName.toLowerCase();if(["input","textarea","select"].includes(a))continue;let s=i.querySelector("input, textarea, select");if(!(s&&t.has(s))){if(i.hasAttribute("for")){let r=i.getAttribute("for"),c=r?i.ownerDocument.getElementById(r):null;if(c&&t.has(c))continue}if(a==="a"){let r=i.getAttribute("role");if(!(r==="button"||r==="radio"||r==="checkbox"||r==="option"||i.closest('[class*="choice" i], [class*="option" i], [class*="answer" i], [data-testid*="option" i]')))continue}n.push(i)}}return n.slice(0,100).map(i=>Ce(i,"answer"))}function Me(o){let e=[o,o.parentElement,o.parentElement?.parentElement,document.body].filter(Boolean),t=new Set,n=[];for(let i of e)for(let a of Array.from(i.querySelectorAll(j)))if(!(t.has(a)||!C(a)||!_(a))&&(t.add(a),n.push(Ce(a,"navigation")),n.length>=10))return n;return n}function W(o=!1){let e=P();e=Se(e),o&&(e=We(e));let t=se(e),n=Me(e);if(t.length===0){let r=se(document.body);r.length>0&&(e=We(e),t=se(e),t.length===0&&(t=r,e=document.querySelector('main, article, form, [role="main"]')||document.body))}n.length===0&&(n=Me(document.body));let i=e.innerText&&e.innerText.trim().length>0?e.innerText:e.textContent||"",a=A(i,16e3),s=[...t,...n].slice(0,120);return!a||s.length===0&&a.length<30?A(document.body.innerText||document.body.textContent||"",16e3).length>=30?G():null:{sourceUrl:window.location.href.slice(0,2e3),pageTitle:document.title.slice(0,500)||"P\xE1gina de Quest\xE3o",questionText:a,htmlSnippet:Ze(e),controls:s,scope:e}}function G(){let o=document.body.innerText||document.body.textContent||document.documentElement.textContent||"",e=A(o,16e3),t=se(document.body),n=Me(document.body),i=[...t,...n].slice(0,120),a=document.querySelector('main, article, form, [role="main"], [data-test-id*="content" i], [class*="content" i]')||document.body;return{sourceUrl:window.location.href.slice(0,2e3),pageTitle:document.title.slice(0,500)||"P\xE1gina de Quest\xE3o",questionText:e,htmlSnippet:Ze(a).slice(0,15e3),controls:i,scope:a}}function et(o){let e=o.controls.map(t=>`${t.role}:${t.id}:${t.type}:${t.value}:${t.disabled}`).join("|");return[window.location.href,o.pageTitle,o.questionText.slice(0,500),e].join("::")}function L(o){return o?!!(o.closest('#easyquiz-shadow-root, .eq-sidebar, .eq-launcher, [data-easyquiz-ignore="true"], .btn-inject-eq, #btn-inject-script')||o.getAttribute?.("data-easyquiz-ignore")==="true"):!1}function f(o){return o==null?"":(typeof o=="string"?o:String(o)).replace(/^(\([0-9a-zA-Z]{1,2}\)|[0-9]{1,3}|[a-zA-Z])[\.\)\-\:]\s+/,"").replace(/[\.\u2026]{2,}/g," ").replace(/['"“”«»]/g,"").replace(/\s+/g," ").trim()}function I(o){if(!o||o instanceof HTMLInputElement||o instanceof HTMLSelectElement||o instanceof HTMLTextAreaElement||o.getAttribute("draggable")==="true"||o.classList.contains("dnd-card")||o.hasAttribute("data-category")||o.hasAttribute("data-dropzone"))return o;if(o.hasAttribute("for")){let n=o.getAttribute("for");if(n){let i=o.ownerDocument.getElementById(n);if(i)return i}}let e=o.closest('label, .option-card, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, tr, li, .dnd-card, [class*="option-card" i], [class*="choice-card" i]');if(e&&!["article","section","main","form","body"].includes(e.tagName.toLowerCase())){let n=e.getAttribute("for"),a=(n?e.ownerDocument.getElementById(n):null)||e.querySelector('input:not([type="hidden"]), select, textarea');return a||e}let t=o.closest('button, a, [role="button"], [draggable="true"]');if(t)return t;if(["body","html","main","section","article","form"].includes(o.tagName.toLowerCase())){let n=o.querySelector('button, [role="button"], a, input:not([type="hidden"]), select, textarea, [role="radio"], [role="checkbox"], .option-card, label');if(n)return I(n)}return o}function tt(o){let e=o;if(!e||!document.contains(e))try{e=P()}catch{}e=e||document.body;let t=Array.from(e.querySelectorAll("tr")).filter(a=>C(a)&&a.querySelector('input[type="radio"], input[type="checkbox"]'));if(t.length>1)return t;let n=Array.from(e.querySelectorAll('input[type="checkbox"], input[type="radio"], [role="checkbox"], [role="radio"]')).filter(a=>C(a)&&!L(a));return n.length>0?n:Array.from(e.querySelectorAll('.option-card, [role="option"], [class*="choice-card" i], [class*="option-card" i], li[class*="choice" i], li[class*="option" i]')).filter(a=>C(a)&&!L(a)).filter(a=>!a.parentElement?.closest('.option-card, [role="option"], [class*="choice-card" i], [class*="option-card" i]'))}function w(o,e,t=!1){if(o==null)return null;let i=(typeof o=="string"?o:String(o)).trim().replace(/^["'“”«»]+|["'“”«»]+$/g,"");if(!i)return null;let a=k(i),s=document.querySelector(`[data-easyquiz-id="${a}"]`);if(s&&!L(s)&&C(s))return I(s);try{let l=document.getElementById(i);if(l&&!L(l)&&C(l))return l.hasAttribute("data-category")||l.hasAttribute("data-dropzone")||l.classList.contains("dnd-zone")?l:I(l)}catch{}let r=i.match(/^(?:item|opção|opcao|afirmação|afirmacao|alternativa|linha|afirmativa|questão|questao|campo|blank|lacuna|input|resposta)?\s*#?_?([0-9]+)$/i);if(r){let l=parseInt(r[1],10);if(t){let g=document.body;try{g=P()||document.body}catch{}let b=Array.from(g.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, select, [contenteditable="true"]')).filter(y=>C(y)&&!L(y));if(l>=1&&l-1<b.length)return b[l-1];if(l===0&&b.length>0)return b[0]}let p=l-1;if(p>=0){let g=tt();if(p<g.length){let m=g[p];if(m.tagName.toLowerCase()==="tr"){if(e){let E=m.querySelector(`input[value="${k(e)}" i], [data-value="${k(e)}" i]`);if(E)return E}let v=m.querySelector("input");if(v)return v}return I(m)}let b=document.body;try{b=P()||document.body}catch{}let y=Array.from(b.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, select, [contenteditable="true"]')).filter(m=>C(m)&&!L(m));if(p<y.length)return y[p]}}let c=i.match(/^(?:item|opção|opcao|afirmação|afirmacao|alternativa|linha|afirmativa|questão|questao)?\s*#?([a-eA-E])$/i);if(c){let l=c[1].toUpperCase().charCodeAt(0)-65;if(l>=0){let p=tt();if(l<p.length){let g=p[l];if(g.tagName.toLowerCase()==="tr"){if(e){let y=g.querySelector(`input[value="${k(e)}" i], [data-value="${k(e)}" i]`);if(y)return y}let b=g.querySelector("input");if(b)return b}return I(g)}}}if(/^[a-zA-Z0-9_-]{1,10}$/.test(i)){let p=Array.from(document.querySelectorAll(`[data-category="${a}" i], [data-dropzone="${a}" i], [data-role="dropzone"][data-category="${a}" i]`)).find(m=>C(m)&&!L(m));if(p)return p;let b=Array.from(document.querySelectorAll(`input[value="${a}" i], [data-value="${a}" i], input[id="${a}" i], input[placeholder="${a}" i], textarea[placeholder="${a}" i], [title="${a}" i]`)).find(m=>C(m)&&!L(m));if(b)return I(b);let y=Array.from(document.querySelectorAll('.option-badge, [class*="badge" i], [class*="letter" i], .option-card span, label span')).find(m=>{if(!C(m)||L(m))return!1;let v=f(m.textContent).toLowerCase();return v===i.toLowerCase()||v===i.toLowerCase()+")"});if(y)return I(y)}try{let p=Array.from(document.querySelectorAll(`[name="${a}"], [value="${a}"], [placeholder="${a}" i], [title="${a}" i], [data-category="${a}" i], [data-dropzone="${a}" i], [data-testid="${a}" i], [data-test-id="${a}" i], [aria-label="${a}" i]`)).find(g=>C(g)&&!L(g));if(p)return p.hasAttribute("data-category")||p.hasAttribute("data-dropzone")||p.classList.contains("dnd-zone")?p:I(p)}catch{}if(/^[.#\[]|\s|[>+~:]/.test(i))try{let p=Array.from(document.querySelectorAll(i)).find(g=>C(g)&&!L(g));if(p)return I(p)}catch{}try{let l=i.replace(/"/g,""),p=`//button[normalize-space(.)="${l}"] | //a[normalize-space(.)="${l}"] | //*[not(*) and normalize-space(.)="${l}"] | //*[@aria-label="${l}"] | //*[@data-category="${l}"] | //*[@data-testid="${l}"]`,g=document.evaluate(p,document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);for(let b=0;b<g.snapshotLength;b++){let y=g.snapshotItem(b);if(y&&C(y)&&!L(y)){if(["body","html"].includes(y.tagName.toLowerCase())){let v=y.querySelector('button, [role="button"], a, input, [role="radio"], [role="checkbox"], label');if(v&&C(v))return I(v)}return y.closest('[data-role="dropzone"], [class*="category" i], [class*="bucket" i], [class*="column" i], [class*="drop" i]')||I(y)}}}catch{}let h=f(i).toLowerCase(),u=Array.from(document.querySelectorAll('button, a, div, span, li, p, label, input, textarea, select, [draggable="true"], [data-testid], [class*="option" i], [class*="card" i], [class*="item" i], [class*="choice" i], [class*="category" i], [class*="bucket" i]'));for(let l of u){if(!C(l)||L(l)||l.closest("header, nav, .stepper, .step-item, .progress-bar-container")||!!(l.matches('article, section, form, main, [class*="container" i], [class*="grid" i], .dnd-pool, .dnd-zones')||l.querySelector('label, [role="radio"], [role="checkbox"], .dnd-card, [draggable="true"], .option-card, tr'))&&!l.matches(".dnd-zone, [data-category], [data-dropzone]"))continue;let g=f(l.textContent).toLowerCase(),b=f(l.getAttribute("aria-label")||"").toLowerCase(),y=f(l.getAttribute("placeholder")||"").toLowerCase(),m=f(l.getAttribute("title")||"").toLowerCase(),v=f(l.getAttribute("name")||"").toLowerCase(),E=f(l.getAttribute("data-category")||"").toLowerCase(),q=l instanceof HTMLInputElement||l instanceof HTMLButtonElement?l.value:"",T=f(q).toLowerCase(),M=g.startsWith(h+")")||g.startsWith(h+".")||g.startsWith(h+" -")||g.startsWith(h+":");if(g===h||b===h||y===h||m===h||v===h||E&&E===h||T&&T===h||M)return l.closest('[data-role="dropzone"], [class*="category" i], [class*="bucket" i], [class*="column" i], [class*="drop" i]')||I(l)}if(h.length>=3)for(let l of u){if(!C(l)||L(l)||l.closest("header, nav, .stepper, .step-item, .progress-bar-container")||!!(l.matches('article, section, form, main, [class*="container" i], [class*="grid" i], .dnd-pool, .dnd-zones')||l.querySelector('label, [role="radio"], [role="checkbox"], .dnd-card, [draggable="true"], .option-card, tr'))&&!l.matches(".dnd-zone, [data-category], [data-dropzone]"))continue;let g=f(l.textContent).toLowerCase(),b=f(l.getAttribute("aria-label")||"").toLowerCase(),y=f(l.getAttribute("placeholder")||"").toLowerCase(),m=f(l.getAttribute("title")||"").toLowerCase(),v=f(l.getAttribute("name")||"").toLowerCase();if(g.includes(h)||b.includes(h)||y.includes(h)||m.includes(h)||v.includes(h)){if(Array.from(l.children).some(M=>{let S=f(M.textContent).toLowerCase();return S&&S.includes(h)}))continue;return l.closest('[data-role="dropzone"], [class*="category" i], [class*="bucket" i], [class*="column" i], [class*="drop" i]')||I(l)}let E=h.split(/\s+/).filter(Boolean);if(E.length>=3){let q=E.slice(0,Math.min(5,E.length)).join(" ");if(g.includes(q)||b.includes(q)||y.includes(q))return I(l)}}return null}function nt(o,e){for(let t of e)o.dispatchEvent(new Event(t,{bubbles:!0,composed:!0}))}function $(o,e){if(!o)return;let t=o instanceof HTMLInputElement&&["checkbox","radio"].includes(o.type)?o:o.querySelector('input[type="checkbox"], input[type="radio"]')||(o.hasAttribute("for")?o.ownerDocument.getElementById(o.getAttribute("for")):null);if(t&&o!==t){if(t.type==="checkbox"){R(t,!0);return}if(t.type==="radio"){R(t,!0);return}}try{o.scrollIntoView({block:"center",inline:"center",behavior:"instant"})}catch{}try{o.focus?.()}catch{}if(o instanceof HTMLButtonElement||o instanceof HTMLAnchorElement||o instanceof HTMLInputElement&&!["checkbox","radio"].includes(o.type)){try{o.click()}catch{}return}let i=o.getBoundingClientRect(),a=e?e[0]:Math.round(i.left+Math.max(1,i.width/2)),s=e?e[1]:Math.round(i.top+Math.max(1,i.height/2)),r={bubbles:!0,cancelable:!0,composed:!0,view:window,clientX:a,clientY:s};try{o.dispatchEvent(new PointerEvent("pointerdown",{...r,button:0,buttons:1}))}catch{}try{o.dispatchEvent(new MouseEvent("mousedown",{...r,button:0,buttons:1}))}catch{}try{o.dispatchEvent(new PointerEvent("pointerup",{...r,button:0,buttons:0}))}catch{}try{o.dispatchEvent(new MouseEvent("mouseup",{...r,button:0,buttons:0}))}catch{}try{o.dispatchEvent(new MouseEvent("click",{...r,button:0,buttons:0}))}catch{}try{o.click()}catch{}}function re(o,e){let t=o;if(t.hasAttribute("for")){let r=t.getAttribute("for"),c=t.ownerDocument.getElementById(r);c&&(t=c)}if(!(t instanceof HTMLInputElement)&&!(t instanceof HTMLTextAreaElement)&&!(t instanceof HTMLSelectElement)&&!t.isContentEditable){let r=t.querySelector('input:not([type="hidden"]), textarea, select, [contenteditable="true"]');if(r)t=r;else{let d=t.closest('.form-group, .field, [class*="input" i], [class*="control" i], label, tr, td, li, p, div')?.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, select, [contenteditable="true"]');if(d)t=d;else{let h=t.nextElementSibling;for(;h;){if(h instanceof HTMLInputElement&&!["hidden","button","submit","checkbox","radio"].includes(h.type)||h instanceof HTMLTextAreaElement||h instanceof HTMLElement&&h.isContentEditable){t=h;break}let u=h.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(u){t=u;break}h=h.nextElementSibling}}}}if(t instanceof HTMLButtonElement||t.tagName.toLowerCase()==="a"||t.getAttribute("role")==="button"||t instanceof HTMLInputElement&&["button","submit","reset","image"].includes(t.type)){let r=t.parentElement?.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(r)t=r;else{let c=document.body;try{c=P()||document.body}catch{}let d=c.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(d)t=d;else{console.warn("[EasyQuiz] setNativeValue: Nenhum campo de texto encontrado para receber o valor.");return}}}if(!(t instanceof HTMLInputElement)&&!(t instanceof HTMLTextAreaElement)&&!(t instanceof HTMLSelectElement)&&!t.isContentEditable){let r=document.body;try{r=P()||document.body}catch{}let c=r.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(c)t=c;else{console.warn("[EasyQuiz] setNativeValue: Nenhum campo de texto encontrado para receber o valor.");return}}if(t instanceof HTMLSelectElement){Ie(t,[e]);return}if(t instanceof HTMLInputElement&&["checkbox","radio"].includes(t.type)){let r=["true","1","checked","yes","sim"].includes(e.toLowerCase())||e===t.value;R(t,r);return}let i=String(e??""),a=i;if(t instanceof HTMLInputElement&&t.type==="number"){let r=i.replace(",",".").replace(/[^0-9.-]/g,"");r&&!isNaN(Number(r))&&(a=r)}try{t.scrollIntoView?.({block:"center",inline:"center",behavior:"instant"}),t.focus?.()}catch{}let s=!1;try{if(t instanceof HTMLInputElement||t instanceof HTMLTextAreaElement){if(t.type!=="number"){try{t.select?.()}catch{}s=document.execCommand?.("insertText",!1,a)||!1}}else if(t.isContentEditable){try{document.execCommand?.("selectAll",!1,void 0)}catch{}s=document.execCommand?.("insertText",!1,a)||!1}}catch{}if(t instanceof HTMLInputElement||t instanceof HTMLTextAreaElement){try{let d=t._valueTracker;d&&d.setValue(a===""?" ":"")}catch{}let r=t instanceof HTMLTextAreaElement?HTMLTextAreaElement.prototype:HTMLInputElement.prototype,c=Object.getOwnPropertyDescriptor(r,"value")?.set;c?c.call(t,a):t.value=a;try{t.dispatchEvent(new KeyboardEvent("keydown",{bubbles:!0,cancelable:!0,key:a.slice(-1)||"a"}))}catch{}try{t.dispatchEvent(new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,composed:!0,data:a,inputType:"insertText"}))}catch{}try{t.dispatchEvent(new InputEvent("input",{bubbles:!0,cancelable:!0,composed:!0,data:a,inputType:"insertText"}))}catch{t.dispatchEvent(new Event("input",{bubbles:!0,cancelable:!0,composed:!0}))}try{t.dispatchEvent(new KeyboardEvent("keyup",{bubbles:!0,cancelable:!0,key:a.slice(-1)||"a"}))}catch{}try{t.dispatchEvent(new Event("change",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}try{t.dispatchEvent(new FocusEvent("blur",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}if(t.value!==a&&!(t instanceof HTMLInputElement&&t.type==="number"&&Number(t.value)===Number(a))){t.value=a;try{c?.call(t,a)}catch{}}return}if(t.isContentEditable){if(t.textContent?.trim()!==a.trim()){t.textContent=a;try{t.innerText=a}catch{}}try{t.dispatchEvent(new InputEvent("input",{bubbles:!0,cancelable:!0,composed:!0,data:a,inputType:"insertText"}))}catch{t.dispatchEvent(new Event("input",{bubbles:!0,cancelable:!0,composed:!0}))}try{t.dispatchEvent(new Event("change",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}try{t.dispatchEvent(new FocusEvent("blur",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}return}try{"value"in t&&(t.value=a),t.dispatchEvent(new Event("input",{bubbles:!0,cancelable:!0,composed:!0})),t.dispatchEvent(new Event("change",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}}function He(o,e=""){if(o==null)return e;let t=typeof o=="string"?o:String(o);if(!t)return e;let n=/^(eq-|#|\$|\.|input_|mat-|choice_|radio_|chk_)/i.test(t),i=f(t),a=w(t)||w(i);if(!a)return n?e:i||e;let s=a.closest('label, .option-card, [class*="choice" i], [class*="option" i], .quiz-option, tr, td, li');if(s){let u=f(s.textContent);if(u&&u.length>0&&u.length<150)return u}if(a.id){let u=document.querySelector(`label[for="${k(a.id)}"]`);if(u){let l=f(u.textContent);if(l&&l.length>0&&l.length<150)return l}}let r=a.getAttribute("aria-label");if(r)return f(r);let c=a.getAttribute("placeholder");if(c)return f(c);let d=f(a.textContent);if(d&&d.length>0&&d.length<120)return d;let h=a instanceof HTMLInputElement||a instanceof HTMLButtonElement?a.value:"";return h?f(h):n?e:i||e}function R(o,e){let t=o.closest('.option-card, label, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, [class*="option" i], [class*="choice" i], li')||o,n=o instanceof HTMLInputElement&&["checkbox","radio"].includes(o.type)?o:t.querySelector('input[type="checkbox"], input[type="radio"]');if(!n&&t.hasAttribute("for")&&(n=t.ownerDocument.getElementById(t.getAttribute("for"))),t){let i=e?"true":"false";t.setAttribute("aria-checked",i),t.setAttribute("aria-selected",i),t.classList.toggle("selected",e),t.classList.toggle("active",e),t.classList.toggle("checked",e)}if(n){if(n.checked===e)return;try{n.focus?.(),n.click()}catch{}if(n.checked!==e){try{let i=n._valueTracker;i&&i.setValue(!e)}catch{}try{Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"checked")?.set?.call(n,e)}catch{}n.checked=e,nt(n,["input","change"])}}else{try{t.focus?.()}catch{}try{t.click()}catch{$(t)}}}function Ie(o,e){let t=o instanceof HTMLSelectElement?o:o.querySelector("select");if(t){let i=e.map(s=>f(s).toLowerCase()),a=!1;for(let s=0;s<t.options.length;s++){let r=t.options[s],c=r.value.toLowerCase(),d=f(r.textContent).toLowerCase();if(i.some(u=>u===c||u===d)){if(r.selected=!0,t.selectedIndex=s,a=!0,!t.multiple)break}else t.multiple||(r.selected=!1)}if(!a)for(let s=0;s<t.options.length;s++){let r=t.options[s],c=r.value.toLowerCase(),d=f(r.textContent).toLowerCase();if(i.some(u=>c.includes(u)||d.includes(u)||u.length>3&&(u.includes(c)||u.includes(d)))&&(r.selected=!0,t.selectedIndex=s,a=!0,!t.multiple))break}if(a){nt(t,["input","change","blur"]);return}}let n=o.closest('[role="combobox"], [class*="select" i], [class*="dropdown" i]');if(n){$(n);for(let i of e){let a=w(i);if(a){$(a);return}}}}function Tt(o,e){try{let t=new DataTransfer;try{t.setData("text/plain",o)}catch{}try{t.setData("text/html",e)}catch{}return t}catch{return null}}function Le(o){try{o.click()}catch{let e=o.ownerDocument.defaultView||window;o.dispatchEvent(new e.MouseEvent("click",{bubbles:!0,cancelable:!0,composed:!0,view:e}))}}function B(o,e){let t=f(o).toLowerCase();if(!t)return null;let n=e==="source"?'.dnd-card, [draggable="true"]':'[data-dropzone], [data-category], [data-role="dropzone"]',i=Array.from(document.querySelectorAll(n)),a=e==="destination"?i.find(s=>[s.getAttribute("data-category"),s.getAttribute("data-dropzone")].some(r=>r?.trim().toLowerCase()===t)):null;return a&&C(a)&&!L(a)?a:i.find(s=>{if(!C(s)||L(s))return!1;let r=f(`${s.textContent||""} ${s.getAttribute("data-category")||""} ${s.getAttribute("data-dropzone")||""}`).toLowerCase();return r===t||r.includes(t)})||null}async function le(o,e,t=1){try{o.scrollIntoView({block:"center",inline:"center",behavior:"instant"})}catch{}let n=o.getBoundingClientRect(),i=e.getBoundingClientRect(),a=Math.round(n.left+Math.max(1,n.width/2)),s=Math.round(n.top+Math.max(1,n.height/2)),r=Math.round(i.left+Math.max(1,i.width/2)),c=Math.round(i.top+Math.max(1,i.height/2)),d=f(e.textContent).toLowerCase();if(d){let b=Array.from(o.querySelectorAll('button, [role="button"], input[type="radio"], input[type="checkbox"], option, .btn, [class*="tag" i]')).find(y=>{let m=f(y.textContent).toLowerCase(),v=y instanceof HTMLInputElement||y instanceof HTMLOptionElement?f(y.value).toLowerCase():"";return m&&(d.includes(m)||m.includes(d))||v&&(d.includes(v)||v.includes(d))});b&&($(b),await new Promise(y=>setTimeout(y,120)))}Le(o),await new Promise(g=>setTimeout(g,140)),Le(e);let h=e.querySelector('[data-role="dropzone"], [class*="bucket" i], [class*="slot" i], [class*="drop" i], [class*="target" i], [class*="items" i], ul, ol');if(h&&h!==e&&Le(h),await new Promise(g=>setTimeout(g,100)),!e.contains(o)&&o.matches('.dnd-card, [draggable="true"]')&&e.matches('.dnd-zone, [data-dropzone], [data-role="dropzone"]')&&e.appendChild(o),e.contains(o)&&o.matches('.dnd-card, [draggable="true"]'))return;let u={bubbles:!0,cancelable:!0,composed:!0,view:window,clientX:a,clientY:s,screenX:a,screenY:s,button:0,buttons:1};try{o.dispatchEvent(new PointerEvent("pointerdown",{...u,isPrimary:!0,pointerId:1,pointerType:"mouse",pressure:.5}))}catch{}o.dispatchEvent(new MouseEvent("mousedown",u));let l=4;for(let g=1;g<=l;g++){let b=Math.round(a+(r-a)*(g/l)),y=Math.round(s+(c-s)*(g/l)),m={...u,clientX:b,clientY:y,screenX:b,screenY:y};try{o.dispatchEvent(new PointerEvent("pointermove",{...m,isPrimary:!0,pointerId:1,pointerType:"mouse",pressure:.5}))}catch{}document.dispatchEvent(new MouseEvent("mousemove",m))}let p={bubbles:!0,cancelable:!0,composed:!0,view:window,clientX:r,clientY:c,screenX:r,screenY:c,button:0,buttons:0};try{e.dispatchEvent(new PointerEvent("pointerup",{...p,isPrimary:!0,pointerId:1,pointerType:"mouse",pressure:0}))}catch{}e.dispatchEvent(new MouseEvent("mouseup",p)),e.dispatchEvent(new MouseEvent("click",p));try{let g=Tt(A(o.textContent),o.outerHTML),b={...u},y={...p};g&&(b.dataTransfer=g,y.dataTransfer=g);let m=o.ownerDocument.defaultView?.DragEvent;if(!m)throw new Error("DragEvent n\xE3o dispon\xEDvel neste documento");o.dispatchEvent(new m("dragstart",b)),e.dispatchEvent(new m("dragenter",y)),e.dispatchEvent(new m("dragover",y)),e.dispatchEvent(new m("drop",y)),o.dispatchEvent(new m("dragend",b))}catch(g){console.warn("[EasyQuiz] DragEvent ignorado com seguran\xE7a:",g)}try{let g=new Touch({identifier:1,target:o,clientX:a,clientY:s}),b=new Touch({identifier:1,target:e,clientX:r,clientY:c});o.dispatchEvent(new TouchEvent("touchstart",{bubbles:!0,cancelable:!0,touches:[g]})),e.dispatchEvent(new TouchEvent("touchmove",{bubbles:!0,cancelable:!0,touches:[b]})),e.dispatchEvent(new TouchEvent("touchend",{bubbles:!0,cancelable:!0,touches:[]}))}catch{}if(t>=2&&!e.contains(o))try{o.focus?.(),o.dispatchEvent(new KeyboardEvent("keydown",{key:" ",code:"Space",bubbles:!0})),o.dispatchEvent(new KeyboardEvent("keyup",{key:" ",code:"Space",bubbles:!0})),await new Promise(g=>setTimeout(g,80)),e.focus?.(),e.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",bubbles:!0})),e.dispatchEvent(new KeyboardEvent("keyup",{key:"Enter",code:"Enter",bubbles:!0}))}catch{}}var at={fill:(o,e)=>{let t=w(o);t?re(t,e):console.warn(`$eq.fill: Elemento '${o}' n\xE3o encontrado`)},click:o=>{let e=w(o);e?!!(e.closest('.option-card, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, [class*="option" i], [class*="choice" i]')||e.querySelector('input[type="radio"], input[type="checkbox"]')||e instanceof HTMLInputElement&&["checkbox","radio"].includes(e.type))?R(e,!0):$(e):console.warn(`$eq.click: Elemento '${o}' n\xE3o encontrado`)},check:(o,e)=>{let t=w(o);t?R(t,e):console.warn(`$eq.check: Elemento '${o}' n\xE3o encontrado`)},find:(o,e)=>w(o,e),drag:(o,e)=>{let t=B(o,"source")||w(o),n=B(e,"destination")||w(e);t&&n?le(t,n):console.warn(`$eq.drag: Origem ou destino n\xE3o encontrado ('${o}' -> '${e}')`)},categorize:async(o,e)=>{let t=B(o,"source")||w(o),n=B(e,"destination")||w(e);if(!t||!n){console.warn(`$eq.categorize: Item ou categoria n\xE3o encontrados ('${o}' -> '${e}')`);return}await le(t,n)},execute:(o,e=!1,t=1)=>ze(o,e,t)};window.$eq=at;async function Ct(o,e=1,t=X()){if(qe(o,t),o.t==="js"){let r=String(o.v||"");Ye(r);try{new Function("$eq","document","window",r)(at,document,window)}catch(c){throw console.warn("[EasyQuiz JS Execution]",c),c}return}if(o.t==="drag"){let r=B(o.from,"source")||w(o.from),c=B(o.to,"destination")||w(o.to);!r&&o.from&&(r=w(f(o.from))),!c&&o.to&&(c=w(f(o.to))),r&&c?await le(r,c,e):console.warn(`[EasyQuiz] Drag: alvo n\xE3o encontrado ('${o.from}' -> '${o.to}')`);return}let n=o.id!==void 0&&o.id!==null?String(o.id):"";!n&&o.t==="val"&&(n=o.target??o.name??o.selector??"1");let i=o.v!==void 0?o.v:o.value!==void 0?o.value:o.val!==void 0?o.val:o.text,a=i!=null?String(i).trim():"",s=w(n,a,o.t==="val");if(!s&&n&&(s=w(f(n),a,o.t==="val")),s&&a){if(s instanceof HTMLInputElement&&s.type==="radio"&&s.name){if(f(s.value).toLowerCase()!==f(a).toLowerCase()){let r=document.querySelector(`input[type="radio"][name="${k(s.name)}"][value="${k(a)}" i]`);if(r)s=r;else{let d=Array.from(document.querySelectorAll(`input[type="radio"][name="${k(s.name)}"]`)).find(h=>{let u=h.closest("label, .vf-label, .option-card, tr, td, div");return u&&f(u.textContent).toLowerCase().includes(f(a).toLowerCase())});d&&(s=d)}}}else if(!(s instanceof HTMLInputElement)&&!(s instanceof HTMLSelectElement)&&!(s instanceof HTMLTextAreaElement)){let r=s.querySelector(`input[value="${k(a)}" i], [data-value="${k(a)}" i]`);if(r)s=r;else{let d=Array.from(s.querySelectorAll('input[type="radio"], input[type="checkbox"]')).find(h=>{let u=h.closest("label, .vf-label, .option-card, td, div");return u&&f(u.textContent).toLowerCase().includes(f(a).toLowerCase())});d&&(s=d)}}}if(!s&&o.t==="val"){let r=document.body;try{r=P()||document.body}catch{}let c=Array.from(r.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]')).filter(d=>C(d)&&!L(d));if(c.length===1)s=c[0];else if(c.length>1){let d=f(n).toLowerCase(),h=d.match(/^#?_?([0-9]+)$/);if(h){let u=parseInt(h[1],10);u>=1&&u<=c.length?s=c[u-1]:u>=0&&u<c.length&&(s=c[u])}s||(s=c.find(l=>{let p=(l.getAttribute("placeholder")||"").toLowerCase(),g=(l.name||"").toLowerCase(),b=(l.getAttribute("aria-label")||"").toLowerCase(),y=(l.id||"").toLowerCase(),m=f(Te(l)).toLowerCase(),v=f(l.closest('label, tr, td, .form-group, .field, [class*="row" i], div')?.textContent||"").toLowerCase();return p.includes(d)||g.includes(d)||b.includes(d)||y.includes(d)||m&&m.includes(d)||d.length>=2&&v.includes(d)})||c[0])}}if(!s&&o.t!=="adv"){console.warn(`[EasyQuiz] Alvo '${n}' n\xE3o encontrado para a\xE7\xE3o '${o.t}'. Prosseguindo...`);return}switch(o.t){case"val":if(s){let c=s instanceof HTMLInputElement||s instanceof HTMLTextAreaElement||s instanceof HTMLSelectElement||s.isContentEditable?s:s.querySelector('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]');if(!c){let l=s.closest('.form-group, .field, [class*="input" i], [class*="control" i], label, tr, td, li, p, div')?.querySelector('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]');l&&(c=l)}if(!c){let u=s.nextElementSibling;for(;u;){if(u instanceof HTMLInputElement&&!["hidden","button","submit","checkbox","radio"].includes(u.type)||u instanceof HTMLTextAreaElement||u instanceof HTMLElement&&u.isContentEditable){c=u;break}let l=u.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(l){c=l;break}u=u.nextElementSibling}}if(!c){let u=document.body;try{u=P()||document.body}catch{}let l=Array.from(u.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]')).filter(p=>C(p)&&!L(p));l.length>0&&(c=l[0])}let d=o.v!==void 0?o.v:o.value!==void 0?o.value:o.val!==void 0?o.val:o.text,h=d!=null?String(d):"";re(c||s,h)}break;case"chk":s&&R(s,!!o.c);break;case"sel":if(s){let c=Array.isArray(o.v)?o.v:[String(o.v)];Ie(s,c)}break;case"clk":if(s)if(!!(s.closest('.option-card, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice')||s.querySelector('input[type="radio"], input[type="checkbox"]')||s instanceof HTMLInputElement&&["checkbox","radio"].includes(s.type))){let d=o.c!==void 0?!!o.c:!0;R(s,d)}else $(s,o.co);break;case"adv":let r=Ae(o.id);if(r){await ke(r,1200);let c=o.id||r.textContent?.trim()||"";c&&ve(window.location.hostname,{advanceSelector:c}),$(r)}else console.warn("[EasyQuiz] Bot\xE3o de avan\xE7o n\xE3o localizado.");break}}function St(){let o=["button","a",'[role="button"]','input[type="submit"]','input[type="button"]','[data-testid*="check" i]','[data-test-id*="check" i]'].join(",");return Array.from(document.querySelectorAll(o)).find(t=>{if(!C(t)||L(t)||t.closest("header, nav, aside"))return!1;let n=t instanceof HTMLInputElement||t instanceof HTMLButtonElement?t.value:"",i=(t.textContent||n||t.getAttribute("aria-label")||"").trim();return/(verificar|checar|check|conferir|validar|enviar|responder)/i.test(i)})||null}function Ae(o){if(o){let a=w(o);if(a&&C(a)&&!L(a))return a}try{let a=K(window.location.hostname);if(a.advanceSelector){let s=w(a.advanceSelector);if(s&&C(s)&&!L(s))return s}}catch{}let e=["button","a",'[role="button"]','[role="link"]','input[type="button"]','input[type="submit"]','[data-testid*="next" i]','[data-testid*="continue" i]','[data-testid*="check" i]','[data-test-id*="next" i]','[data-test-id*="continue" i]','[data-test-id*="check" i]','[class*="next" i]','[class*="continue" i]','[class*="proximo" i]','[class*="avancar" i]'].join(","),n=Array.from(document.querySelectorAll(e)).filter(a=>C(a)&&!L(a)&&!a.closest("header, nav, aside"));for(let a of n)if(_(a))return a;for(let a of n){let s=a instanceof HTMLInputElement||a instanceof HTMLButtonElement?a.value:"",r=(a.textContent||s||a.getAttribute("aria-label")||"").trim();if(ie.test(r))return a}let i=document.querySelector('[data-test-id*="next" i], [data-testid*="next" i], [aria-label*="next" i], [aria-label*="pr\xF3xim" i], [aria-label*="avan\xE7ar" i], [aria-label*="continuar" i]');return i&&C(i)&&!L(i)?i:null}async function ke(o,e=1500){let t=Date.now();for(;Date.now()-t<e;){if(!(o.disabled===!0||o.getAttribute("aria-disabled")==="true"||o.classList.contains("disabled")||o.getAttribute("disabled")!==null))return;await new Promise(i=>setTimeout(i,100))}}function it(){let o=(document.body?.innerText||document.body?.textContent||"").replace(/\s+/g," ").trim(),e=document.querySelectorAll('input, textarea, select, button, [role="button"], [role="option"]').length;return`${window.location.href}|${document.title}|${o.slice(0,900)}|${e}`}async function Mt(o,e=1800){let t=Date.now();for(;Date.now()-t<e;){if(it()!==o)return{changed:!0,evidence:"URL, texto, t\xEDtulo ou conjunto de controles mudou ap\xF3s a a\xE7\xE3o."};await new Promise(i=>setTimeout(i,100))}return{changed:!1,evidence:"Nenhuma mudan\xE7a observ\xE1vel foi detectada dentro do tempo limite."}}async function ot(o){if(o.t==="js"||o.t==="adv")return;if(o.t==="drag"){let i=w(o.from)||w(f(o.from)),a=w(o.to)||w(f(o.to));i&&a&&await le(i,a,2);return}let e=o.id||"",t=o.v!==void 0?String(o.v).trim():"",n=w(e,t)||w(f(e),t);if(o.t==="clk"||o.t==="chk"){if(!n&&e){let a=Array.from(document.querySelectorAll('input, label, button, [role="radio"], [role="checkbox"], .option-card, [class*="option" i], [class*="choice" i]')),s=f(e).toLowerCase();n=a.find(r=>{let c=f(r.textContent).toLowerCase(),d=f(r.value||"").toLowerCase();return c.includes(s)||d===s||c.startsWith(s+")")||c.startsWith("("+s+")")})||null}let i=o.v!==void 0?String(o.v).trim():"";if(n&&i){if(n instanceof HTMLInputElement&&n.type==="radio"&&n.name){if(f(n.value).toLowerCase()!==f(i).toLowerCase()){let a=document.querySelector(`input[type="radio"][name="${k(n.name)}"][value="${k(i)}" i]`);if(a)n=a;else{let r=Array.from(document.querySelectorAll(`input[type="radio"][name="${k(n.name)}"]`)).find(c=>{let d=c.closest("label, .vf-label, .option-card, tr, td, div");return d&&f(d.textContent).toLowerCase().includes(f(i).toLowerCase())});r&&(n=r)}}}else if(!(n instanceof HTMLInputElement)&&!(n instanceof HTMLSelectElement)&&!(n instanceof HTMLTextAreaElement)){let a=n.querySelector(`input[value="${k(i)}" i], [data-value="${k(i)}" i]`);if(a)n=a;else{let r=Array.from(n.querySelectorAll('input[type="radio"], input[type="checkbox"]')).find(c=>{let d=c.closest("label, .vf-label, .option-card, td, div");return d&&f(d.textContent).toLowerCase().includes(f(i).toLowerCase())});r&&(n=r)}}}if(n){let a=n.closest('.option-card, label, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, li')||n,s=n instanceof HTMLInputElement&&["radio","checkbox"].includes(n.type)?n:a.querySelector('input[type="radio"], input[type="checkbox"]')||(a.getAttribute("for")?a.ownerDocument.getElementById(a.getAttribute("for")):null),r=o.t==="chk"||o.c!==void 0?!!o.c:!0;if(R(s||a,r),s&&s.checked!==r){try{let c=s._valueTracker;c&&c.setValue(!r)}catch{}try{Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"checked")?.set?.call(s,r)}catch{}s.checked=r,s.dispatchEvent(new Event("input",{bubbles:!0,composed:!0})),s.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}}return}if(o.t==="val"){let i=null;if(n&&(i=n instanceof HTMLInputElement||n instanceof HTMLTextAreaElement||n.isContentEditable?n:n.querySelector('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]')),!i){let a=document.body;try{a=P()||document.body}catch{}let s=Array.from(a.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]')),r=f(e).toLowerCase();i=s.find(c=>{let d=(c.getAttribute("placeholder")||"").toLowerCase(),h=(c.name||"").toLowerCase(),u=(c.id||"").toLowerCase(),l=(c.getAttribute("aria-label")||"").toLowerCase();return d.includes(r)||h.includes(r)||u.includes(r)||l.includes(r)})||(s.length>0?s[0]:null)}if(i){let a=String(o.v??"");try{if(i.focus?.(),i.type!=="number"){try{i.select?.()}catch{}document.execCommand?.("insertText",!1,a)}}catch{}re(i,a)}return}if(o.t==="sel"){if(!n&&e){let i=Array.from(document.querySelectorAll("select")),a=f(e).toLowerCase();n=i.find(s=>{let r=(s.name||"").toLowerCase(),c=(s.id||"").toLowerCase(),d=(s.getAttribute("aria-label")||"").toLowerCase();return r.includes(a)||c.includes(a)||d.includes(a)})||null}if(n){let i=Array.isArray(o.v)?o.v:[String(o.v)];Ie(n,i)}return}}function F(o){try{if(o.t==="val"){let e=o.v!==void 0?o.v:o.value!==void 0?o.value:o.val!==void 0?o.val:o.text,t=String(e??"").trim(),n=t,i=o.id!==void 0&&o.id!==null?String(o.id):"";i||(i=o.target??o.name??o.selector??"1");let a=w(i,n,!0)||w(f(i),n,!0);if(!a){let u=document.body;try{u=P()||document.body}catch{}let l=Array.from(u.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]')).filter(p=>C(p)&&!L(p));l.length>0&&(a=l[0])}if(!a)return!1;let s=a instanceof HTMLInputElement&&a.type==="radio"?a:a.querySelector('input[type="radio"]');if(s&&s.name){let u=document.querySelector(`input[type="radio"][name="${k(s.name)}"]:checked`);if(!u)return!1;let l=f(u.value).toLowerCase(),p=f(t).toLowerCase(),g=f(u.closest("label, .vf-label, .option-card, tr, td, div")?.textContent||"").toLowerCase();return l===p||g===p||g.includes(p)}let r=a instanceof HTMLInputElement||a instanceof HTMLTextAreaElement||a.isContentEditable?a:a.querySelector('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(!r){let l=a.closest('.form-group, .field, [class*="input" i], [class*="control" i], label, tr, td, li, p, div')?.querySelector('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]');l&&(r=l)}if(!r){let u=a.nextElementSibling;for(;u;){if(u instanceof HTMLInputElement&&!["hidden","button","submit","checkbox","radio"].includes(u.type)||u instanceof HTMLTextAreaElement||u instanceof HTMLElement&&u.isContentEditable){r=u;break}let l=u.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(l){r=l;break}u=u.nextElementSibling}}let c=(r instanceof HTMLInputElement||r instanceof HTMLTextAreaElement?r.value:r?.textContent??a.textContent??"").trim();if(!c&&!t)return!0;if(!c&&t)return!1;let d=c.replace(",",".").replace(/\s+/g,"").toLowerCase(),h=t.replace(",",".").replace(/\s+/g,"").toLowerCase();return d===h||d.includes(h)||h.includes(d)||c.toLowerCase()===t.toLowerCase()}if(o.t==="sel"){let e=w(o.id)||w(f(o.id));if(!e)return!1;let t=e instanceof HTMLSelectElement?e:e.querySelector("select");if(!t)return!1;let i=(Array.isArray(o.v)?o.v:[String(o.v)]).map(a=>f(a).toLowerCase());return Array.from(t.options).some(a=>{if(!a.selected)return!1;let s=a.value.toLowerCase(),r=f(a.textContent).toLowerCase();return i.some(c=>c===s||c===r||s.includes(c)||r.includes(c))})}if(o.t==="chk"||o.t==="clk"){let e=o.v!==void 0?String(o.v).trim():"",t=w(o.id,e)||w(f(o.id),e);if(!t)return!1;let n=t.closest('.option-card, label, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, li')||t,i=t instanceof HTMLInputElement&&["checkbox","radio"].includes(t.type)?t:n.querySelector('input[type="checkbox"], input[type="radio"]')||(n.getAttribute("for")?n.ownerDocument.getElementById(n.getAttribute("for")):null),a=o.t==="chk"||o.c!==void 0?!!o.c:!0;if(i&&i.type==="radio"&&o.v){let h=f(String(o.v)).toLowerCase();if(i.name){let u=document.querySelector(`input[type="radio"][name="${k(i.name)}"]:checked`);return u?f(u.value).toLowerCase()===h:!1}}if(i&&["checkbox","radio"].includes(i.type))return i.checked===a;let s=n.getAttribute("aria-checked")===String(a)||n.getAttribute("aria-selected")===String(a)||n.getAttribute("aria-pressed")===String(a),r=a?n.getAttribute("data-selected")==="true"||n.getAttribute("data-checked")==="true"||n.getAttribute("data-active")==="true"||n.getAttribute("data-state")==="checked"||n.getAttribute("data-state")==="on":n.getAttribute("data-selected")==="false"||n.getAttribute("data-checked")==="false"||n.getAttribute("data-state")==="unchecked",c=a?/active|selected|checked|picked|correct|is-selected|choice-selected|selected-option|is-checked|chosen|current|highlight|ring|border-primary/i.test(n.className||""):!/active|selected|checked|picked|correct|is-selected|choice-selected|selected-option|is-checked|chosen|current|highlight|ring|border-primary/i.test(n.className||"");return!!(s||r||c||(n instanceof HTMLButtonElement||n.getAttribute("role")==="button")&&o.t==="clk"||o.t==="clk"&&!i)}if(o.t==="drag"){let e=w(o.from)||w(f(o.from)),t=w(o.to)||w(f(o.to));return!e||!t?!1:t.contains(e)?!0:/placed|dropped|assigned|matched|done|selected/i.test(e.className||"")||e.getAttribute("data-placed")==="true"}}catch{}return!1}async function ze(o,e,t=1,n=X({engine:"smart",autoAdvance:e})){let i=o.actions.filter(m=>m.t!=="adv"),a=o.actions.filter(m=>m.t==="adv"),s=0,r=[],c=new Map,d=o.pageType==="question",h=i.filter(m=>m.t==="chk"||m.t==="clk"&&m.c!==void 0);if(d&&h.length>0){let m=document.body;try{m=P()||document.body}catch{}let v=Array.from(m.querySelectorAll('input[type="checkbox"], [role="checkbox"]')).filter(E=>C(E)&&!L(E));if(v.length>1){let E=new Set;for(let q of h){let T=q.t==="chk"?!!q.c:!!(q.c??!0),M="id"in q&&typeof q.id=="string"?q.id:"";if(T&&M){let S=w(M,q.v);if(S){let H=S instanceof HTMLInputElement&&S.type==="checkbox"?S:S.querySelector('input[type="checkbox"]');E.add(H||S)}}}if(E.size>0)for(let q of v)E.has(q)||(q instanceof HTMLInputElement&&q.checked||q.getAttribute("aria-checked")==="true"||q.closest(".option-card, label")?.classList.contains("selected"))&&R(q,!1)}}for(let m of i){try{await Ct(m,t,n),s++}catch(v){c.set(m,v instanceof Error?v.message:String(v)),console.warn("[EasyQuiz] A\xE7\xE3o declarativa prim\xE1ria falhou com seguran\xE7a:",m,v)}await new Promise(v=>setTimeout(v,m.t==="drag"?250:70))}await new Promise(m=>setTimeout(m,i.length>0?300:50));let u=0;for(let m of i){if(F(m)){u++;continue}console.warn(`[EasyQuiz Auto-Cura] A\xE7\xE3o '${m.t}' no alvo '${m.id||m.from||""}' n\xE3o verificada no DOM. Disparando Passagem 2 de conting\xEAncia...`);try{qe(m,n),await ot(m)}catch(v){c.set(m,v instanceof Error?v.message:String(v)),console.warn("[EasyQuiz Auto-Cura] Rota alternativa falhou:",v)}await new Promise(v=>setTimeout(v,180)),F(m)&&(console.log("[EasyQuiz Auto-Cura] \u2713 A\xE7\xE3o recuperada com sucesso pela rota de conting\xEAncia!"),u++)}if(u<i.length&&i.length>0){console.warn(`[EasyQuiz Auto-Cura] ${i.length-u} de ${i.length} a\xE7\xE3o(\xF5es) ainda n\xE3o verificadas. Disparando Passagem 3 final...`),await new Promise(m=>setTimeout(m,200));for(let m of i)if(!F(m))try{await ot(m)}catch(v){c.set(m,v instanceof Error?v.message:String(v))}await new Promise(m=>setTimeout(m,200)),u=0;for(let m of i)F(m)&&u++}for(let m of i)F(m)||r.push(m.t==="drag"?`${m.from} -> ${m.to}`:"id"in m?m.id:m.t);let l=i.map((m,v)=>{let E=m.t==="drag"?`${m.from} -> ${m.to}`:m.t==="js"?"$eq":m.id||m.t,q=m.t==="js"?!0:m.t==="drag"?!!(B(m.from,"source")&&B(m.to,"destination")):!!(w(m.id||"")||w(f(m.id||""))),T=F(m);return{index:v,action:m,target:E,located:q,applied:!c.has(m),verified:T,strategy:m.t==="drag"?"drag-adaptive":m.t==="js"?"javascript":"declarative-dom",evidence:T?"estado do controle confirmado no DOM":"nenhuma evid\xEAncia suficiente ap\xF3s as tentativas",...c.has(m)?{error:c.get(m)}:{}}}),p=!d||i.length===0?!0:s>0&&(s===i.length||u>0),g=!1,b=!1,y="Nenhuma a\xE7\xE3o de navega\xE7\xE3o solicitada.";if(e&&(p||!d)){await new Promise(T=>setTimeout(T,i.length>0?400:150));let m=!1;if(o.pageType!=="info"){let T=St();T&&C(T)&&(await ke(T,1200),$(T),m=!0,await new Promise(M=>setTimeout(M,800)))}let v=it(),E=a.length>0?a[0].id:void 0,q=Ae(E);if(!q&&m&&(await new Promise(T=>setTimeout(T,600)),q=Ae(E)),q){await ke(q,1500);let T=E||q.textContent?.trim()||"";T&&ve(window.location.hostname,{advanceSelector:T}),$(q);let M=await Mt(v,2500);b=M.changed,y=M.evidence,g=M.changed||m,!M.changed&&!m&&console.warn("[EasyQuiz] O bot\xE3o de avan\xE7o foi acionado, mas a navega\xE7\xE3o ainda n\xE3o concluiu.")}else m?(g=!0,b=!0,y="Resposta confirmada via bot\xE3o de verifica\xE7\xE3o/envio."):console.warn("[EasyQuiz] Nenhum bot\xE3o de avan\xE7o encontrado na p\xE1gina.")}return{applied:s,verified:u,success:p,advanced:g,failed:r,reports:l,navigationVerified:b,navigationEvidence:y}}var Z=null,U=[];function ee(){Z&&(Z.style.removeProperty("outline"),Z.style.removeProperty("outline-offset"),Z=null);for(let o of U)o.style.removeProperty("outline"),o.style.removeProperty("outline-offset"),o.style.removeProperty("background-color"),o.style.removeProperty("box-shadow"),o.removeAttribute("data-easyquiz-highlight");U=[]}function Pe(o){ee(),Z=o,o.style.outline="2px solid #00e5ff",o.style.outlineOffset="4px"}function st(o){for(let e of o){if(e.t==="adv"||e.t==="js")continue;if(e.t==="drag"){try{let a=w(e.from),s=w(e.to);a&&(a.style.outline="2px solid #00ff88",U.push(a)),s&&(s.style.outline="2px dashed #00e5ff",U.push(s))}catch{}continue}if(!e.id)continue;let t=w(e.id);if(!t)continue;let n=t.closest('label, .option-card, [role="radio"], [role="checkbox"], [role="listitem"], .answer, .quiz-option, .form-check, [class*="option" i], [class*="choice" i], tr, li')||t;n.style.outline="2px solid #00ff88",n.style.outlineOffset="2px",n.style.backgroundColor="rgba(0, 255, 136, 0.12)",n.setAttribute("data-easyquiz-highlight","true"),U.push(n);let i=t instanceof HTMLInputElement&&["checkbox","radio"].includes(t.type)?t:n.querySelector('input[type="checkbox"], input[type="radio"]');i&&i!==n&&(i.style.outline="2px solid #00ff88",i.style.outlineOffset="2px",i.style.boxShadow="0 0 10px rgba(0, 255, 136, 0.8)",i.setAttribute("data-easyquiz-highlight","true"),U.push(i))}}var te=4,Lt=1200,$e=12e5;function ce(o){return new Promise((e,t)=>{let n=new FileReader;n.onerror=()=>t(new Error("Falha ao converter blob para base64.")),n.onload=()=>{let i=String(n.result||"");e(i.split(",")[1]||"")},n.readAsDataURL(o)})}async function de(o){let e=0,t=0;if(o instanceof HTMLImageElement?(e=o.naturalWidth||o.width,t=o.naturalHeight||o.height):(e=o.width,t=o.height),e<=0||t<=0)throw new Error("Dimens\xF5es inv\xE1lidas.");let n=Math.min(1,Lt/Math.max(e,t)),i=Math.max(1,Math.round(e*n)),a=Math.max(1,Math.round(t*n)),s=document.createElement("canvas");s.width=i,s.height=a;let r=s.getContext("2d",{alpha:!1});if(!r)throw new Error("Sem suporte a Canvas 2D.");return r.fillStyle="#ffffff",r.fillRect(0,0,i,a),r.drawImage(o,0,0,i,a),new Promise((c,d)=>{s.toBlob(h=>h?c(h):d(new Error("Falha compress\xE3o.")),"image/jpeg",.8)})}async function rt(o){try{let e=o.cloneNode(!0),t=o.offsetWidth||500,n=o.offsetHeight||500,i=`
      <svg xmlns="http://www.w3.org/2000/svg" width="${t}" height="${n}">
        <foreignObject width="100%" height="100%">
          <div xmlns="http://www.w3.org/1999/xhtml" style="background:#fff;font-family:sans-serif;">
            ${e.innerHTML}
          </div>
        </foreignObject>
      </svg>
    `,a=new Blob([i],{type:"image/svg+xml;charset=utf-8"}),s=URL.createObjectURL(a),r=new Image;r.crossOrigin="anonymous",await new Promise((h,u)=>{r.onload=h,r.onerror=u,r.src=s});let c=await de(r),d=await ce(c);if(URL.revokeObjectURL(s),d&&d.length<=$e)return{mediaType:"image/jpeg",base64:d,alt:"Captura Suprema via rasteriza\xE7\xE3o DOM",source:"rasterized"}}catch(e){console.warn("Falha na rasteriza\xE7\xE3o suprema:",e)}return null}async function At(o){let e=o.currentSrc||o.src;if(!e)return null;let t=(o.alt||o.getAttribute("aria-label")||"Imagem da quest\xE3o").slice(0,500);if(o.complete&&o.naturalWidth>0)try{let n=await de(o),i=await ce(n);if(i&&i.length<=$e)return{mediaType:"image/jpeg",base64:i,alt:t,source:e.slice(0,2e3)}}catch{}try{let n=await fetch(e,{mode:"cors"});if(n.ok){let i=await n.blob();if(i.type.startsWith("image/")){let a=await createImageBitmap(i),s=await de(a);a.close();let r=await ce(s);if(r&&r.length<=$e)return{mediaType:"image/jpeg",base64:r,alt:t,source:e.slice(0,2e3)}}}}catch{return rt(o.parentElement||o)}return null}async function Re(o,e=!0){if(!e)return[];let t=[],n=0,i=Array.from(o.querySelectorAll("img")).filter(C).slice(0,te);for(let a of i)try{let s=await At(a);if(s&&n+s.base64.length<=25e5&&(t.push(s),n+=s.base64.length,t.length>=te))break}catch{}if(t.length<te){let a=Array.from(o.querySelectorAll("canvas")).filter(C).slice(0,te);for(let s of a)try{let r=await de(s),c=await ce(r);if(c&&n+c.length<=25e5&&(t.push({mediaType:"image/jpeg",base64:c,alt:"Canvas inline",source:"canvas"}),n+=c.length,t.length>=te))break}catch{let r=await rt(s.parentElement||s);r&&(t.push(r),n+=r.base64.length)}}return t}var ue=class{active=!1;timer=null;callbacks;lastRunTime=0;lastActionTime=0;isProcessing=!1;observer=null;mutationTimer=null;constructor(e){this.callbacks=e}isActive(){return this.active}start(){this.active||(this.active=!0,this.lastActionTime=Date.now(),this.callbacks.onStatusChange("waiting","> [SYS] Autopilot ENGAGED. Monitorando..."),typeof MutationObserver<"u"&&(this.observer=new MutationObserver(()=>{!this.active||this.isProcessing||(this.mutationTimer&&clearTimeout(this.mutationTimer),this.mutationTimer=window.setTimeout(()=>{this.mutationTimer=null,this.loop()},180))}),this.observer.observe(document.body,{subtree:!0,childList:!0,attributes:!0,characterData:!0})),this.loop())}stop(){this.active=!1,this.timer&&clearTimeout(this.timer),this.mutationTimer&&clearTimeout(this.mutationTimer),this.mutationTimer=null,this.observer?.disconnect(),this.observer=null,this.callbacks.onStatusChange("idle","> [SYS] Autopilot DESATIVADO.")}errorCount=0;lastPageSig="";samePageCount=0;async loop(){if(!this.active)return;let e=Date.now();if(e-this.lastRunTime<2500||this.isProcessing){this.timer=window.setTimeout(()=>this.loop(),500);return}this.lastRunTime=e;try{this.isProcessing=!0;let t=W(!1);if(t||(t=G()),t){let n=et(t);if(n===this.lastPageSig)this.samePageCount++;else{let s=this.samePageCount>1;this.lastPageSig=n,this.samePageCount=1,s&&(this.callbacks.onStatusChange("waiting","> [SYS] Avan\xE7o de p\xE1gina detectado! Retomando monitoramento autom\xE1tico...","text-green"),this.callbacks.onPageAdvance?.())}if(this.callbacks.isManualModeActive?.()){this.callbacks.onStatusChange("waiting","> [SYS] Gabarito manual ativo na tela. Aguardando voc\xEA posicionar as respostas e avan\xE7ar a p\xE1gina...","text-yellow"),this.lastRunTime=Date.now();return}this.samePageCount>1&&(this.callbacks.onStatusChange("waiting",`> [AUTOPILOT] Resolu\xE7\xE3o pendente (${this.samePageCount}\xAA verifica\xE7\xE3o). Conclua e avance para prosseguir...`,"text-yellow"),await new Promise(s=>setTimeout(s,4e3)));let i=t.controls.filter(s=>s.role==="answer"),a=K(window.location.hostname);if(i.length>0){this.callbacks.onStatusChange("analyzing","> [IA] Quest\xE3o/Exerc\xEDcio detectado. Consultando IA...","text-blue"),await new Promise(r=>setTimeout(r,600));let s=await this.callbacks.onRequestAnalysis(this.samePageCount);if(s){if(this.callbacks.onStatusChange("analyzing",`> [IA] (${s.usedModel||"gemini"}) Confian\xE7a: ${(s.confidence*100).toFixed(1)}% | Modo: ${s.mode}`,"text-blue"),this.callbacks.onStatusChange("analyzing",`> [IA] Racioc\xEDnio: ${s.rationale}`,"text-blue"),this.callbacks.onStatusChange("analyzing",`> [IA] A\xE7\xF5es geradas: ${s.actions.length}`,"text-blue"),this.errorCount=0,s.memoryToStore&&this.callbacks.onStatusChange("analyzing",`> [IA] \u{1F9E0} Mem\xF3ria RAG salva: "${s.memoryToStore}"`,"text-yellow"),s.pageType==="conclusion"){this.callbacks.onStatusChange("idle","> [SYS] Atividade conclu\xEDda! Desligando Autopilot.","text-green"),this.stop();return}}else{this.errorCount++;let r=this.errorCount===1?5e3:8e3;this.callbacks.onStatusChange("waiting",`> [AVISO] Falha na an\xE1lise (${this.errorCount}/3). Aguardando ${r/1e3}s para estabiliza\xE7\xE3o antes de tentar novamente...`,"text-yellow"),await new Promise(c=>setTimeout(c,r))}this.lastActionTime=Date.now()}else if(a.advanceSelector&&w(a.advanceSelector)&&t.questionText.length<50){let s=w(a.advanceSelector);s&&(this.callbacks.onStatusChange("advancing",`> [BRUTE] Avan\xE7ando via cache "${a.advanceSelector}"...`),await new Promise(r=>setTimeout(r,1e3)),$(s),this.lastActionTime=Date.now(),this.errorCount=0)}else{this.callbacks.onStatusChange("analyzing","> [IA] P\xE1gina informativa/contexto detectada. Lendo e consultando IA...","text-blue"),await new Promise(r=>setTimeout(r,600));let s=await this.callbacks.onRequestAnalysis(this.samePageCount);if(s){if(this.callbacks.onStatusChange("analyzing",`> [IA] (${s.usedModel||"gemini"}) Tipo: ${s.pageType} | Modo: ${s.mode}`,"text-blue"),this.callbacks.onStatusChange("analyzing",`> [IA] Racioc\xEDnio: ${s.rationale}`,"text-blue"),s.memoryToStore&&this.callbacks.onStatusChange("analyzing",`> [IA] \u{1F9E0} Conte\xFAdo absorvido na mem\xF3ria: "${s.memoryToStore}"`,"text-yellow"),s.pageType==="info")this.callbacks.onStatusChange("advancing","> [IA] \u{1F4D6} Leitura conclu\xEDda. Avan\xE7ando automaticamente...","text-green"),await new Promise(r=>setTimeout(r,1800));else if(s.pageType==="start")this.callbacks.onStatusChange("advancing","> [SYS] In\xEDcio de m\xF3dulo detectado. Iniciando...","text-blue"),await new Promise(r=>setTimeout(r,1800));else if(s.pageType==="conclusion"){this.callbacks.onStatusChange("idle","> [SYS] Atividade conclu\xEDda! Desligando Autopilot.","text-green"),this.stop();return}this.errorCount=0}else{this.errorCount++;let r=this.errorCount===1?5e3:8e3;this.callbacks.onStatusChange("waiting",`> [AVISO] Falha ao processar p\xE1gina (${this.errorCount}/3). Aguardando ${r/1e3}s para estabiliza\xE7\xE3o antes de tentar novamente...`,"text-yellow"),await new Promise(c=>setTimeout(c,r))}this.lastActionTime=Date.now()}if(this.errorCount>=3){this.callbacks.onStatusChange("error","> [ERRO] 3 falhas consecutivas. Abortando Autopilot para poupar sua cota e tokens.","text-red"),this.callbacks.onStatusChange("waiting","> [DICA] Verifique a mensagem vermelha de [ERRO DETALHADO] no console acima para saber o motivo exato.","text-yellow"),this.stop();return}}else this.callbacks.onStatusChange("waiting","> [SYS] Monitorando p\xE1gina... Aguardando carregamento dos elementos.")}catch(t){let n=t instanceof Error?t.message:String(t);console.warn("[EasyQuiz Autopilot]",t),this.callbacks.onStatusChange("error",`> [ERRO NO AUTOPILOT] ${n}`,"text-red")}finally{this.isProcessing=!1}this.active&&(this.timer=window.setTimeout(()=>this.loop(),1e3))}};var x={logo:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.8L19.2 8 12 11.2 4.8 8 12 4.8zM4 9.6l7 3.1v7.5l-7-3.5V9.6zm9 10.6v-7.5l7-3.1v7.1l-7 3.5z"/></svg>',rocket:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M13.13 2.81a.5.5 0 0 0-.46-.07c-.42.15-2.08.79-3.9 2.61-2.04 2.04-2.6 4.09-2.73 4.96l-.97.98a1 1 0 0 0-.29.71v2.12a1 1 0 0 0 .29.71l2.83 2.83a1 1 0 0 0 .71.29h2.12a1 1 0 0 0 .71-.29l.98-.97c.87-.13 2.92-.69 4.96-2.73 1.82-1.82 2.46-3.48 2.61-3.9a.5.5 0 0 0-.07-.46l-6.79-6.79zM4.5 16.5l-2.09 2.09a.5.5 0 0 0 .35.85h3.04l.35.35v3.04a.5.5 0 0 0 .85.35L9.09 21.1l-4.59-4.6z"/></svg>',play:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>',stop:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h12v12H6z"/></svg>',code:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>',terminal:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8h16v10zm-12-3l3-3-3-3 1.4-1.4L13.8 12l-4.4 4.4L8 15zm6 0h4v2h-4v-2z"/></svg>',inspector:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>',settings:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.49.49 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>',key:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M7 14c-2.76 0-5-2.24-5-5s2.24-5 5-5c2.42 0 4.44 1.72 4.9 4H22v4h-2v3h-3v-3h-2v3h-3v-3h-2.1c-.46 2.28-2.48 4-4.9 4zm0-7c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>',paste:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 2h-4.18C14.4 .84 13.3 0 12 0c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm7 18H5V4h2v3h10V4h2v16z"/></svg>',edit:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>',trash:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>',eraser:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M15.14 3c-.51 0-1.02.2-1.41.59L2.59 14.73c-.78.78-.78 2.05 0 2.83L6.44 21.4c.78.78 2.05.78 2.83 0l11.14-11.14c.78-.78.78-2.05 0-2.83l-3.86-3.84c-.39-.39-.9-.59-1.41-.59zm.71 2.71l3.15 3.15-3.15 3.15-3.15-3.15 3.15-3.15zm-4.57 4.57l3.15 3.15-4.57 4.57H6.71l-3-3 7.57-7.57z"/></svg>',save:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/></svg>',analyze:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L3 14h8l-2 8 12-12h-8l2-8z"/></svg>',apply:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>',close:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>',chevronRight:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>',chevronLeft:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>',eye:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>',eyeOff:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.44-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.17c0-1.66-1.34-3-3-3l-.17.02z"/></svg>',check:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>',clock:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>',copy:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>',refresh:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg>',chip:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4h12v16H6V4zm2 2v12h8V6H8zm-4 3h2v2H4V9zm0 4h2v2H4v-2zm16-4h2v2h-2V9zm0 4h2v2h-2v-2zM9 2h2v2H9V2zm4 0h2v2h-2V2zm-4 18h2v2H9v-2zm4 0h2v2h-2v-2z"/></svg>',moreVertical:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>',minimize:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M19 13H5v-2h14v2z"/></svg>',maximize:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/></svg>',dragHandle:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M10 9h4V6h-4v3zm0 5h4v-3h-4v3zm0 5h4v-3h-4v3zM4 9h4V6H4v3zm0 5h4v-3H4v3zm0 5h4v-3H4v3zm12-10V6h4v3h-4zm0 5h4v-3h-4v3zm0 5h4v-3h-4v3z"/></svg>',list:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/></svg>',folderTree:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6 10H6v-2h8v2zm4-4H6v-2h12v2z"/></svg>',folder:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/></svg>',file:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>'};var pe=class{element=null;shadow;isMinimized=!1;currentPlan=null;isDragging=!1;dragStartX=0;dragStartY=0;initialLeft=25;initialTop=25;onAdvanceCallback;constructor(e,t){this.shadow=e,this.onAdvanceCallback=t,this.initGlobalListeners()}initGlobalListeners(){window.addEventListener("popstate",()=>this.handlePageNavigated()),window.addEventListener("hashchange",()=>this.handlePageNavigated()),document.addEventListener("click",e=>{if(!this.isOpen())return;let t=e.target;if(!t||this.shadow.contains(t)||t.closest("#easyquiz-shadow-root"))return;let n=t.closest('button, [role="button"], a, input[type="submit"]');if(n){let i=(n.textContent||n.value||"").toLowerCase();/pr[oó]xim|avan[cç]|continu|verific|enviar|submit|confirm|checar|validar|next/i.test(i)&&setTimeout(()=>{this.isOpen()&&this.handlePageNavigated()},800)}},!0)}handlePageNavigated(){this.isOpen()&&(this.hide(),this.onAdvanceCallback?.())}isOpen(){return this.element!==null&&this.element.style.display!=="none"}show(e){this.currentPlan=e,this.element||this.createElement(),this.renderContent(),this.element&&(this.element.style.display="flex")}hide(){this.element&&(this.element.style.display="none")}minimize(){this.isMinimized=!0,this.element&&this.element.classList.add("minimized")}restore(){this.isMinimized=!1,this.element&&this.element.classList.remove("minimized")}createElement(){this.element=document.createElement("div"),this.element.className="eq-floating-hud",this.element.style.left=`${this.initialLeft}px`,this.element.style.top=`${this.initialTop}px`,this.element.innerHTML=`
      <!-- P\xEDlula compacta quando minimizado -->
      <div class="eq-fah-pill" id="eq-fah-pill" title="Clique para expandir gabarito interativo">
        <span class="eq-fah-pill-icon">${x.list}</span>
        <span id="eq-fah-pill-text">Gabarito Manual</span>
        <span class="eq-fah-pill-badge" id="eq-fah-pill-badge">0</span>
      </div>

      <!-- Cabe\xE7alho com barra de arraste -->
      <div class="eq-fah-header" id="eq-fah-header">
        <div class="eq-fah-title">
          <span style="display:flex; align-items:center;">${x.dragHandle}</span>
          <span>Gabarito Manual Interativo</span>
        </div>
        <div class="eq-fah-actions">
          <button class="eq-fah-btn" id="eq-fah-copy-md-btn" title="Copiar tudo formatado em Markdown">${x.copy}</button>
          <button class="eq-fah-btn" id="eq-fah-min-btn" title="Minimizar para p\xEDlula flutuante">${x.minimize}</button>
          <button class="eq-fah-btn" id="eq-fah-close-btn" title="Fechar gabarito">${x.close}</button>
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
    `,this.shadow.appendChild(this.element),this.element.querySelector("#eq-fah-pill").addEventListener("click",()=>this.restore()),this.element.querySelector("#eq-fah-min-btn").addEventListener("click",()=>this.minimize()),this.element.querySelector("#eq-fah-close-btn").addEventListener("click",()=>this.hide());let i=this.element.querySelector("#eq-fah-copy-md-btn");i.addEventListener("click",()=>this.copyMarkdownToClipboard(i));let a=this.element.querySelector("#eq-fah-copy-all-btn");a.addEventListener("click",()=>this.copyMarkdownToClipboard(a));let s=this.element.querySelector("#eq-fah-header");this.setupDraggable(s)}setupDraggable(e){let t=n=>{if(n.target.closest(".eq-fah-btn"))return;n.preventDefault(),this.isDragging=!0,this.dragStartX=n.clientX,this.dragStartY=n.clientY;let i=this.element.getBoundingClientRect();this.initialLeft=i.left,this.initialTop=i.top;let a=r=>{if(!this.isDragging||!this.element)return;let c=r.clientX-this.dragStartX,d=r.clientY-this.dragStartY,h=Math.max(10,window.innerWidth-this.element.offsetWidth-10),u=Math.max(10,window.innerHeight-this.element.offsetHeight-10),l=Math.min(Math.max(10,this.initialLeft+c),h),p=Math.min(Math.max(10,this.initialTop+d),u);this.element.style.left=`${l}px`,this.element.style.top=`${p}px`},s=()=>{this.isDragging=!1,window.removeEventListener("mousemove",a),window.removeEventListener("mouseup",s)};window.addEventListener("mousemove",a),window.addEventListener("mouseup",s)};e.addEventListener("mousedown",t)}renderContent(){if(!this.element||!this.currentPlan)return;let e=this.element.querySelector("#eq-fah-body"),t=this.element.querySelector("#eq-fah-pill-text"),n=this.element.querySelector("#eq-fah-pill-badge");e.innerHTML="";let i=this.currentPlan,a=i.actions.filter(l=>l.t==="drag"),s=i.actions.filter(l=>{if(l.t!=="val")return!1;let p=f(l.id||"").toLowerCase();return!/continu|avan[cç]|pr[oó]xim|submet|enviar|check|verific/i.test(p)}),r=i.actions.filter(l=>l.t==="clk"||l.t==="chk"),c=a.length||s.length||r.length,d=document.createElement("div");d.className="eq-fah-meta";let h=document.createElement("span");h.textContent=`Modo: ${i.mode.replace("_"," ")}`;let u=document.createElement("span");if(u.className="eq-fah-meta-badge",u.textContent=`${Math.round(i.confidence*100)}% Confian\xE7a`,d.append(h,u),e.appendChild(d),a.length>0||i.mode==="categorizacao"||i.mode==="arrastar_soltar"){t.textContent=`Categoriza\xE7\xE3o (${a.length} itens)`,n.textContent=String(a.length);let l={};for(let p of a){let g=f(p.to)||"Geral";l[g]||(l[g]=[]),l[g].push(f(p.from))}for(let[p,g]of Object.entries(l)){let b=document.createElement("div"),y=/fato|true|verdadeiro|sim/i.test(p),m=/opini[aã]o|false|falso|n[aã]o/i.test(p);b.className=`eq-fah-group ${y?"group-fato":m?"group-opiniao":""}`;let v=document.createElement("div");v.className="eq-fah-group-title",v.textContent=`\u{1F4C1} ${p} (${g.length})`,b.appendChild(v);let E=document.createElement("div");E.className="eq-fah-group-items";for(let q of g){let T=document.createElement("div");T.className="eq-fah-item";let M=document.createElement("span");M.className="eq-fah-item-text",M.textContent=q,T.appendChild(M);let S=document.createElement("button");S.className="eq-fah-copy-inline",S.textContent="Copiar",S.addEventListener("click",()=>{navigator.clipboard.writeText(q),S.textContent="\u2713 Copiado",setTimeout(()=>S.textContent="Copiar",1200)}),T.appendChild(S),E.appendChild(T)}b.appendChild(E),e.appendChild(b)}}else if(s.length>0){t.textContent=`Preenchimento (${s.length} campos)`,n.textContent=String(s.length);let l=document.createElement("div");l.className="eq-fah-group";let p=document.createElement("div");p.className="eq-fah-group-title",p.textContent="\u{1F4DD} Respostas para os Campos de Texto:",l.appendChild(p);let g=document.createElement("div");g.className="eq-fah-group-items";for(let b=0;b<s.length;b++){let y=s[b],m=document.createElement("div");m.className="eq-fah-item";let v=He(y.id);(!v||/^[#\.\$]|input|mat-|cell|field|q[0-9]|eq-/i.test(v))&&(v=`Campo ${b+1}`);let E=String(y.v??""),q=document.createElement("div");q.className="eq-fah-field-box";let T=document.createElement("div");T.className="eq-fah-field-label",T.textContent=v,q.appendChild(T);let M=document.createElement("div");M.className="eq-fah-field-val",M.textContent=E,q.appendChild(M),m.appendChild(q);let S=document.createElement("button");S.className="eq-fah-copy-inline",S.textContent="Copiar",S.addEventListener("click",()=>{navigator.clipboard.writeText(E),S.textContent="\u2713 Copiado",setTimeout(()=>S.textContent="Copiar",1200)}),m.appendChild(S),g.appendChild(m)}l.appendChild(g),e.appendChild(l)}else if(r.length>0){t.textContent=`Op\xE7\xF5es (${r.length} marcadas)`,n.textContent=String(r.length);let l=document.createElement("div");l.className="eq-fah-group";let p=document.createElement("div");p.className="eq-fah-group-title",p.textContent="\u{1F3AF} Alternativa(s) Correta(s):",l.appendChild(p);let g=document.createElement("div");g.className="eq-fah-group-items";for(let b=0;b<r.length;b++){let y=r[b],m=document.createElement("div");m.className="eq-fah-item";let v=He(y.id);(!v||/^(eq-|#|\$|\.|input_|mat-|choice_|radio_|chk_)/i.test(v))&&y.v&&(v=String(y.v)),v=f(v),/^(eq-|#|\$|\.|input_|mat-|choice_|radio_|chk_)/i.test(v)&&(v="");let E="",q=v.match(/^(\([A-Za-z0-9]\)|[A-Za-z0-9][\)\.\:\-])\s*(.*)$/);q?(E=q[1].replace(/[\(\)\.\:\-\s]/g,"").toUpperCase(),v=q[2].trim()||v):r.length>1&&(E=String.fromCharCode(65+b));let T=document.createElement("div");if(T.style.display="flex",T.style.alignItems="center",T.style.gap="8px",T.style.flex="1",E){let H=document.createElement("span");H.className="eq-fah-letter-badge",H.textContent=E,T.appendChild(H)}let M=document.createElement("span");M.className="eq-fah-item-text",M.textContent=v||(E?`Alternativa ${E}`:"Alternativa Selecionada"),T.appendChild(M),m.appendChild(T);let S=document.createElement("button");S.className="eq-fah-copy-inline",S.textContent="Copiar",S.addEventListener("click",()=>{navigator.clipboard.writeText(v||E),S.textContent="\u2713 Copiado",setTimeout(()=>S.textContent="Copiar",1200)}),m.appendChild(S),g.appendChild(m)}l.appendChild(g),e.appendChild(l)}else{t.textContent="Gabarito",n.textContent="0";let l=document.createElement("div");l.style.padding="10px",l.style.color="#888",l.textContent="Nenhuma resposta direta para exibir.",e.appendChild(l)}if(i.rationale){let l=document.createElement("div");l.className="eq-fah-rationale",l.textContent=`\u{1F4A1} Racioc\xEDnio da IA: ${i.rationale}`,e.appendChild(l)}}generateMarkdown(){if(!this.currentPlan)return"";let e=this.currentPlan,t=[];t.push("# Gabarito da Quest\xE3o \u2014 EasyQuiz Pro"),t.push(`- **Modo:** ${e.mode}`),t.push(`- **Confian\xE7a:** ${(e.confidence*100).toFixed(0)}%`),t.push("");let n=e.actions.filter(s=>s.t==="drag"),i=e.actions.filter(s=>s.t==="val"),a=e.actions.filter(s=>s.t==="clk"||s.t==="chk");if(n.length>0){t.push("## \u{1F4C2} Categoriza\xE7\xE3o:");let s={};for(let r of n){let c=f(r.to)||"Geral";s[c]||(s[c]=[]),s[c].push(f(r.from))}for(let[r,c]of Object.entries(s)){t.push(`### Categoria: ${r}`);for(let d of c)t.push(`- ${d}`);t.push("")}}else if(i.length>0){t.push("## \u270F\uFE0F Respostas para Preenchimento:");for(let s of i){let r=f(s.id);t.push(`- **${r||"Campo"}:** \`${s.v}\``)}t.push("")}else if(a.length>0){t.push("## \u2705 Alternativas Corretas:");for(let s of a)t.push(`- [x] ${f(s.id)}`);t.push("")}return e.rationale&&(t.push("---"),t.push(`**\u{1F4A1} Racioc\xEDnio:** ${e.rationale}`)),t.join(`
`)}copyMarkdownToClipboard(e){let t=this.generateMarkdown();t&&navigator.clipboard.writeText(t).then(()=>{let n=e.innerHTML;e.id==="eq-fah-copy-md-btn"?e.innerHTML='<span style="font-size:10px; color:#00ffcc; font-weight:bold;">\u2713</span>':e.innerHTML="\u2713 Copiado!",setTimeout(()=>{e.innerHTML=n},1500)})}};var lt=`
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
`;var kt=[{value:"",label:"Detec\xE7\xE3o Autom\xE1tica"},{value:"escolha_unica",label:"M\xFAltipla Escolha (\xDAnica)"},{value:"escolha_multipla",label:"M\xFAltipla Escolha (V\xE1rias)"},{value:"categorizacao",label:"Categoriza\xE7\xE3o / Grupos"},{value:"arrastar_soltar",label:"Arrastar e Soltar (Drag & Drop)"},{value:"ordenacao",label:"Ordena\xE7\xE3o / Sequ\xEAncia"},{value:"verdadeiro_falso",label:"Verdadeiro / Falso"},{value:"texto_livre",label:"Texto Livre / Dissertativa"},{value:"preenchimento",label:"Preenchimento de Lacunas"}],Ht=[{value:"smart",label:"Inteligente (Auto-H\xEDbrido)"},{value:"command",label:"Apenas Comando (Seguro)"},{value:"javascript",label:"Apenas JS Nativo (Avan\xE7ado)"}],he=class{host;shadow;callbacks;autopilot;floatingAnswers;initialSettings;isCollapsed=!1;activeTab="resolver";stopwatchInterval=null;stopwatchStartTime=0;latestPlan=null;latestContext=null;latestPromptText="";liveDebugTerminal;dbgModel;dbgLatency;dbgSplitTokens;dbgTotalTokens;dbgErrorCard;dbgErrorText;dbgPromptLen;dbgPromptView;dbgContextView;dbgRawRespView;dbgCountAll;dbgCountError;dbgCountAi;dbgCountDom;logEntries=[];activeLogFilter="all";autoScrollLogs=!0;lastErrorMsg=null;progressContainer;progressBar;progressLabel;progressVal;contextTreeContainer;launcherBtn;launcherDot;dockToggleBtn;sidebarEl;apToggleBtn;apConsole;executionConsole;dotPulseAp;statusTextAp;stopwatchAp;dotPulseAdv;statusTextAdv;stopwatchAdv;inspModel;inspLatency;inspTokens;inspPrompt;inspRationale;inspActions;copyPromptBtn;apiKeyInput;keyContextMenu;keyMoreBtn;modelSelect;modeSelect;engineSelect;dryRunCheckbox;autoApplyCheckbox;autoAdvanceCheckbox;hostDarkModeCheckbox;useVisionCheckbox;analyzeBtn;applyBtn;resultContainer;constructor(e,t){this.initialSettings=e,this.callbacks=t,this.autopilot=new ue({onStatusChange:(i,a,s)=>{this.logToConsole(a,s),i==="analyzing"?this.setBusy(!0,"Autopilot: IA analisando..."):(i==="advancing"||i==="waiting")&&this.setBusy(!1)},onRequestAnalysis:async i=>{try{return await this.callbacks.onAnalyze(i)||null}catch{return null}},isManualModeActive:()=>this.floatingAnswers?.isOpen()??!1,onPageAdvance:()=>{this.floatingAnswers?.hide()}}),this.host=document.createElement("div"),this.host.id="easyquiz-shadow-root",this.host.style.position="fixed",this.host.style.top="0",this.host.style.left="0",this.host.style.width="100vw",this.host.style.height="100vh",this.host.style.zIndex="2147483647",this.host.style.pointerEvents="none",this.shadow=this.host.attachShadow({mode:"open"}),this.shadow.innerHTML=`
      <style>${lt}</style>

      <!-- Bot\xE3o Flutuante Inferior Renovado (C\xE1psula com Status ao Vivo) -->
      <button class="eq-launcher" type="button" title="Abrir / Recolher EasyQuiz (Alt+Q)">
        <span class="eq-launcher-icon">${x.logo}</span>
        <span>EasyQuiz</span>
        <span class="eq-launcher-dot" id="eq-launcher-dot"></span>
      </button>

      <!-- Sidebar Fixa Lateral Direita Estilo VS Code -->
      <aside class="eq-sidebar" aria-label="EasyQuiz Sidebar">
        <!-- Aba Retr\xE1til na Borda Esquerda -->
        <button class="eq-dock-toggle" id="eq-dock-toggle" type="button" title="Recolher / Expandir Painel (Alt+Q)">
          <span class="eq-dock-toggle-icon">${x.chevronRight}</span>
          <span class="eq-dock-toggle-label">EQ</span>
        </button>
           <!-- Activity Bar Vertical na Esquerda (Estilo VS Code - Apenas \xCDcones) -->
          <nav class="eq-activity-bar" role="tablist" aria-label="Atalhos">
            <div class="eq-activity-top">
              <button class="eq-activity-btn active" id="eq-tab-resolver" role="tab" title="Resolver (Opera\xE7\xF5es Atuais)">
                <span class="eq-activity-indicator"></span>
                <span class="eq-activity-icon">${x.rocket}</span>
              </button>

              <button class="eq-activity-btn" id="eq-tab-brain" role="tab" title="C\xE9rebro da IA (Contexto e Inspe\xE7\xE3o)">
                <span class="eq-activity-indicator"></span>
                <span class="eq-activity-icon">${x.chip}</span>
              </button>

              <button class="eq-activity-btn" id="eq-tab-debug" role="tab" title="Terminal & Debug Output (Logs, Tokens, Prompts, Erros)">
                <span class="eq-activity-indicator"></span>
                <span class="eq-activity-icon">${x.terminal}</span>
              </button>
            </div>

            <div class="eq-activity-bottom">
              <button class="eq-activity-btn" id="eq-tab-settings" role="tab" title="Configura\xE7\xF5es e Ajustes Avan\xE7ados">
                <span class="eq-activity-indicator"></span>
                <span class="eq-activity-icon">${x.settings}</span>
              </button>
            </div>
          </nav>

          <!-- Corpo Principal da Sidebar -->
          <main class="eq-sidebar-body">
            <!-- Cabe\xE7alho VS Code -->
            <header class="eq-header">
              <div class="eq-brand">
                <span class="eq-brand-icon">${x.logo}</span>
                <span class="eq-brand-name">EasyQuiz</span>
                <span class="eq-brand-badge">2.0 SUPREME</span>
              </div>
              <div class="eq-header-tools">
                <button class="eq-icon-btn" id="eq-min-btn" type="button" title="Minimizar (Alt+Q)">${x.chevronRight}</button>
                <button class="eq-icon-btn" id="eq-close-btn" type="button" title="Fechar">${x.close}</button>
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
                  <button class="eq-btn-primary" id="eq-analyze-btn" type="button">${x.analyze} Analisar quest\xE3o</button>
                  <button class="eq-btn-secondary" id="eq-apply-btn" type="button">${x.apply} Aplicar respostas</button>
                </div>

                <div style="display: flex; gap: 8px; width: 100%; align-items: center;">
                  <button class="eq-btn-primary" id="eq-ap-toggle-btn" type="button" style="flex: 1;">
                    ${x.play} INICIAR AUTOPILOT
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
                  <button class="eq-btn-secondary" id="eq-open-hud-btn" type="button">${x.list} Abrir respostas dispon\xEDveis</button>
                </div>

                <!-- Status & Stopwatch Card -->
                <div class="eq-status-card">
                  <div class="eq-status-card-header">
                    <div class="eq-ai-indicator">
                      <span class="eq-dot-pulse" id="eq-dot-ap"></span>
                      <span>Status da IA</span>
                    </div>
                    <div class="eq-stopwatch" id="eq-stopwatch-ap">
                      ${x.clock} <span>0.00s</span>
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
                      ${x.refresh}
                    </button>
                    <button class="eq-icon-btn" id="eq-ap-clear-memory" type="button" title="Limpar Mem\xF3ria Contextual (RAG)" style="width: 28px; height: 28px; color: #ff5555;">
                      ${x.eraser}
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
                      ${x.copy} Copiar
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
                      ${x.copy}
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
                        ${x.copy}
                      </button>
                      <button class="eq-icon-btn" id="eq-dbg-clear-logs" type="button" title="Limpar Console" style="width: 26px; height: 26px; color: #ff5555;">
                        ${x.eraser}
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
                        ${x.copy} Copiar
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
                      ${x.copy} Copiar JSON
                    </button>
                  </div>
                  <div class="eq-code-block" id="eq-dbg-context-view" style="max-height: 110px;">Aguardando captura de contexto...</div>
                </div>

                <!-- Resposta Bruta da IA -->
                <div class="eq-field-group">
                  <div class="eq-section-title">
                    <span>Resposta Bruta da IA (Raw Output)</span>
                    <button class="eq-btn-secondary" id="eq-dbg-copy-raw-resp" type="button" style="height: 24px; padding: 0 6px; font-size: 10px;">
                      ${x.copy} Copiar Resposta
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
                      <span class="eq-input-prefix-icon">${x.key}</span>
                      <input id="eq-api-key" class="eq-input" type="password" placeholder="Cole sua chave AIzaSy..." autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" />
                      <button class="eq-icon-btn" id="eq-key-save" type="button" title="Salvar Chave">${x.save}</button>
                      <button class="eq-icon-btn" id="eq-key-more-btn" type="button" title="Mais Op\xE7\xF5es da Chave">${x.moreVertical}</button>
                    </div>

                    <!-- Context Menu Suspenso Din\xE2mico -->
                    <div class="eq-context-menu" id="eq-key-context-menu" hidden>
                      <button class="eq-context-item" id="eq-menu-prompt" type="button">
                        <span class="eq-item-icon">${x.edit}</span>
                        <span class="eq-item-text">Inserir via Janela Nativa</span>
                        <span class="eq-item-badge">Bypass</span>
                      </button>
                      <button class="eq-context-item" id="eq-menu-paste" type="button">
                        <span class="eq-item-icon">${x.paste}</span>
                        <span class="eq-item-text">Colar da \xC1rea de Transfer\xEAncia</span>
                      </button>
                      <button class="eq-context-item" id="eq-menu-toggle-vis" type="button">
                        <span class="eq-item-icon" id="eq-menu-vis-icon">${x.eye}</span>
                        <span class="eq-item-text" id="eq-menu-vis-text">Mostrar Chave</span>
                      </button>
                      <button class="eq-context-item" id="eq-menu-clear" type="button">
                        <span class="eq-item-icon">${x.eraser}</span>
                        <span class="eq-item-text">Limpar Campo</span>
                      </button>
                      <div class="eq-context-divider"></div>
                      <button class="eq-context-item" id="eq-menu-test" type="button">
                        <span class="eq-item-icon">${x.key}</span>
                        <span class="eq-item-text">Testar Conex\xE3o no Google</span>
                      </button>
                      <button class="eq-context-item danger" id="eq-menu-reset" type="button">
                        <span class="eq-item-icon">${x.trash}</span>
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
                    ${x.trash} Resetar Todos os Dados e Mem\xF3ria
                  </button>
                </div>

                <div class="eq-footer-note" style="margin-top: auto;">Configura\xE7\xF5es salvas localmente no navegador</div>
              </div>
            </div>
          </main>
        </aside>
    `,this.launcherBtn=this.shadow.querySelector(".eq-launcher"),this.launcherDot=this.shadow.querySelector("#eq-launcher-dot"),this.dockToggleBtn=this.shadow.querySelector("#eq-dock-toggle"),this.sidebarEl=this.shadow.querySelector(".eq-sidebar"),this.apToggleBtn=this.shadow.querySelector("#eq-ap-toggle-btn"),this.apConsole=this.shadow.querySelector("#eq-ap-console"),this.executionConsole=this.shadow.querySelector("#eq-execution-console"),this.progressContainer=this.shadow.querySelector("#eq-progress-container"),this.progressBar=this.shadow.querySelector("#eq-progress-bar"),this.progressLabel=this.shadow.querySelector("#eq-progress-label"),this.progressVal=this.shadow.querySelector("#eq-progress-val"),this.contextTreeContainer=this.shadow.querySelector("#eq-tree-container"),this.dotPulseAp=this.shadow.querySelector("#eq-dot-ap"),this.statusTextAp=this.shadow.querySelector("#eq-status-text-ap"),this.stopwatchAp=this.shadow.querySelector("#eq-stopwatch-ap span"),this.dotPulseAdv=this.dotPulseAp,this.statusTextAdv=this.statusTextAp,this.stopwatchAdv=this.stopwatchAp,this.inspModel=this.shadow.querySelector("#eq-insp-model"),this.inspLatency=this.shadow.querySelector("#eq-insp-latency"),this.inspTokens=this.shadow.querySelector("#eq-insp-tokens"),this.inspPrompt=this.shadow.querySelector("#eq-insp-prompt"),this.inspRationale=this.shadow.querySelector("#eq-insp-rationale"),this.inspActions=this.shadow.querySelector("#eq-insp-actions"),this.copyPromptBtn=this.shadow.querySelector("#eq-copy-prompt-btn"),this.liveDebugTerminal=this.shadow.querySelector("#eq-live-debug-terminal"),this.dbgModel=this.shadow.querySelector("#eq-dbg-model"),this.dbgLatency=this.shadow.querySelector("#eq-dbg-latency"),this.dbgSplitTokens=this.shadow.querySelector("#eq-dbg-split-tokens"),this.dbgTotalTokens=this.shadow.querySelector("#eq-dbg-total-tokens"),this.dbgErrorCard=this.shadow.querySelector("#eq-dbg-error-card"),this.dbgErrorText=this.shadow.querySelector("#eq-dbg-error-text"),this.dbgPromptLen=this.shadow.querySelector("#eq-dbg-prompt-len"),this.dbgPromptView=this.shadow.querySelector("#eq-dbg-prompt-view"),this.dbgContextView=this.shadow.querySelector("#eq-dbg-context-view"),this.dbgRawRespView=this.shadow.querySelector("#eq-dbg-raw-resp-view"),this.dbgCountAll=this.shadow.querySelector("#eq-dbg-count-all"),this.dbgCountError=this.shadow.querySelector("#eq-dbg-count-error"),this.dbgCountAi=this.shadow.querySelector("#eq-dbg-count-ai"),this.dbgCountDom=this.shadow.querySelector("#eq-dbg-count-dom"),this.apiKeyInput=this.shadow.querySelector("#eq-api-key"),this.keyContextMenu=this.shadow.querySelector("#eq-key-context-menu"),this.keyMoreBtn=this.shadow.querySelector("#eq-key-more-btn"),this.modelSelect=this.shadow.querySelector("#eq-model-select"),this.modeSelect=this.shadow.querySelector("#eq-mode-select"),this.engineSelect=this.shadow.querySelector("#eq-engine-select"),this.dryRunCheckbox=this.shadow.querySelector("#eq-dry-run"),this.autoApplyCheckbox=this.shadow.querySelector("#eq-auto-apply"),this.autoAdvanceCheckbox=this.shadow.querySelector("#eq-auto-advance"),this.hostDarkModeCheckbox=this.shadow.querySelector("#eq-host-dark"),this.useVisionCheckbox=this.shadow.querySelector("#eq-use-vision"),this.analyzeBtn=this.shadow.querySelector("#eq-analyze-btn"),this.applyBtn=this.shadow.querySelector("#eq-apply-btn"),this.resultContainer=this.shadow.querySelector("#eq-result"),this.floatingAnswers=new pe(this.shadow,()=>{this.callbacks.onAnalyze(1)});let n=this.shadow.querySelector("#eq-open-hud-btn");n&&n.addEventListener("click",()=>{this.latestPlan&&this.floatingAnswers.show(this.latestPlan)}),V.forEach(i=>this.modelSelect.add(new Option(i.name,i.id,!1,i.id===e.model))),kt.forEach(i=>this.modeSelect.add(new Option(i.label,i.value,!1,i.value===e.modeHint))),Ht.forEach(i=>this.engineSelect.add(new Option(i.label,i.value,!1,i.value===e.engine))),this.apiKeyInput.value=e.apiKey,this.dryRunCheckbox.checked=e.dryRun,this.autoApplyCheckbox.checked=e.autoApply,this.autoAdvanceCheckbox.checked=e.autoAdvance,this.hostDarkModeCheckbox.checked=e.hostDarkMode,this.useVisionCheckbox.checked=e.useVision,this.setupEventListeners(),document.body.appendChild(this.host),this.applyHostDarkMode(e.hostDarkMode),e.apiKey&&ae(e.apiKey).then(i=>{i&&i.length>0&&this.updateModelSelect(i,e.model)}).catch(()=>{})}switchTab(e){this.activeTab=e;let t=["resolver","brain","debug","settings"];for(let n of t){let i=this.shadow.querySelector(`#eq-tab-${n}`),a=this.shadow.querySelector(`#eq-view-${n}`);n===e?(i?.classList.add("active"),a&&(a.style.display="flex")):(i?.classList.remove("active"),a&&(a.style.display="none"))}e==="brain"?(this.renderContextTree(),this.refreshInspectorView()):e==="debug"&&(this.refreshDebugView(),this.renderTerminalEntries())}setupEventListeners(){this.shadow.querySelector("#eq-tab-resolver")?.addEventListener("click",()=>this.switchTab("resolver")),this.shadow.querySelector("#eq-tab-brain")?.addEventListener("click",()=>this.switchTab("brain")),this.shadow.querySelector("#eq-tab-debug")?.addEventListener("click",()=>this.switchTab("debug")),this.shadow.querySelector("#eq-tab-settings")?.addEventListener("click",()=>this.switchTab("settings")),this.shadow.querySelector("#eq-dbg-filter-all")?.addEventListener("click",()=>this.setLogFilter("all")),this.shadow.querySelector("#eq-dbg-filter-error")?.addEventListener("click",()=>this.setLogFilter("error")),this.shadow.querySelector("#eq-dbg-filter-ai")?.addEventListener("click",()=>this.setLogFilter("ai")),this.shadow.querySelector("#eq-dbg-filter-dom")?.addEventListener("click",()=>this.setLogFilter("dom"));let e=this.shadow.querySelector("#eq-dbg-scroll-toggle");e?.addEventListener("click",()=>{this.autoScrollLogs=!this.autoScrollLogs,e&&(e.style.color=this.autoScrollLogs?"#00ffcc":"#858585",e.title=this.autoScrollLogs?"Auto-Scroll Ligado (Clique para desligar)":"Auto-Scroll Desligado (Clique para ligar)"),this.autoScrollLogs&&this.liveDebugTerminal&&(this.liveDebugTerminal.scrollTop=this.liveDebugTerminal.scrollHeight)});let t=this.shadow.querySelector("#eq-dbg-copy-logs");t?.addEventListener("click",()=>{let l=this.getFormattedLogs();navigator.clipboard.writeText(l).then(()=>{let p=t.innerHTML;t.innerHTML=x.check,setTimeout(()=>t.innerHTML=p,1800)})}),this.shadow.querySelector("#eq-dbg-clear-logs")?.addEventListener("click",()=>{this.clearLogs()});let n=this.shadow.querySelector("#eq-dbg-copy-prompt");n?.addEventListener("click",()=>{let l=this.latestPromptText||this.latestPlan?.promptSent||"";navigator.clipboard.writeText(l).then(()=>{let p=n.innerHTML;n.innerHTML=`${x.check} Copiado!`,setTimeout(()=>n.innerHTML=p,1800)})});let i=this.shadow.querySelector("#eq-dbg-copy-context");i?.addEventListener("click",()=>{let l=this.dbgContextView?.textContent||"";navigator.clipboard.writeText(l).then(()=>{let p=i.innerHTML;i.innerHTML=`${x.check} Copiado!`,setTimeout(()=>i.innerHTML=p,1800)})});let a=this.shadow.querySelector("#eq-dbg-copy-raw-resp");a?.addEventListener("click",()=>{let l=this.latestPlan?.rawResponse||this.dbgRawRespView?.textContent||"";navigator.clipboard.writeText(l).then(()=>{let p=a.innerHTML;a.innerHTML=`${x.check} Copiado!`,setTimeout(()=>a.innerHTML=p,1800)})});let s=this.shadow.querySelector("#eq-dbg-copy-error-btn");s?.addEventListener("click",()=>{let l=this.lastErrorMsg||"";navigator.clipboard.writeText(l).then(()=>{let p=s.innerHTML;s.innerHTML=x.check,setTimeout(()=>s.innerHTML=p,1800)})}),this.shadow.querySelector("#eq-refresh-context-btn")?.addEventListener("click",()=>{this.renderContextTree()}),this.launcherBtn.addEventListener("click",()=>this.toggle()),this.dockToggleBtn.addEventListener("click",()=>this.toggle()),this.shadow.querySelector("#eq-min-btn")?.addEventListener("click",()=>this.toggle(!1)),this.shadow.querySelector("#eq-close-btn")?.addEventListener("click",()=>this.toggle(!1)),window.addEventListener("keydown",l=>{l.altKey&&(l.key==="q"||l.key==="Q")&&(l.preventDefault(),this.toggle())},!0);let r=l=>{let p=l.composedPath();(p.includes(this.sidebarEl)||p.includes(this.host))&&l.stopImmediatePropagation()};window.addEventListener("keydown",r,!0),window.addEventListener("keyup",r,!0),window.addEventListener("keypress",r,!0),this.apiKeyInput.addEventListener("input",()=>{let l=this.apiKeyInput.value.trim().replace(/^["']|["']$/g,"");this.callbacks.onSettingsChange({apiKey:l})}),this.shadow.querySelector("#eq-key-save").addEventListener("click",()=>{let l=this.apiKeyInput.value.trim().replace(/^["']|["']$/g,"");this.apiKeyInput.value=l,this.callbacks.onSettingsChange({apiKey:l}),this.setStatus("Chave Gemini salva com sucesso!","success"),this.keyContextMenu.hidden=!0}),this.keyMoreBtn.addEventListener("click",l=>{l.stopPropagation(),this.keyContextMenu.hidden=!this.keyContextMenu.hidden}),this.shadow.addEventListener("click",l=>{let p=l.target;!p.closest("#eq-key-context-menu")&&!p.closest("#eq-key-more-btn")&&(this.keyContextMenu.hidden=!0)}),this.shadow.querySelector("#eq-menu-prompt")?.addEventListener("click",()=>{this.keyContextMenu.hidden=!0;let l=this.apiKeyInput.value.trim(),p=window.prompt("Cole sua Chave API do Google Gemini (AI Studio):",l);if(p!==null){let g=p.trim().replace(/^["']|["']$/g,"");this.apiKeyInput.value=g,this.callbacks.onSettingsChange({apiKey:g}),this.setStatus("Chave Gemini inserida e salva com sucesso!","success")}}),this.shadow.querySelector("#eq-menu-paste")?.addEventListener("click",async()=>{this.keyContextMenu.hidden=!0;try{let l=await navigator.clipboard.readText();if(l){let p=l.trim().replace(/^["']|["']$/g,"");this.apiKeyInput.value=p,this.callbacks.onSettingsChange({apiKey:p}),this.setStatus("Chave colada e salva com sucesso!","success")}}catch{let l=this.apiKeyInput.value.trim(),p=window.prompt("Cole sua Chave API do Google Gemini (AI Studio):",l);if(p!==null){let g=p.trim().replace(/^["']|["']$/g,"");this.apiKeyInput.value=g,this.callbacks.onSettingsChange({apiKey:g}),this.setStatus("Chave Gemini inserida e salva com sucesso!","success")}}}),this.shadow.querySelector("#eq-menu-toggle-vis")?.addEventListener("click",()=>{this.keyContextMenu.hidden=!0;let l=this.apiKeyInput.type==="password";this.apiKeyInput.type=l?"text":"password";let p=this.shadow.querySelector("#eq-menu-vis-icon"),g=this.shadow.querySelector("#eq-menu-vis-text");p&&(p.innerHTML=l?x.eyeOff:x.eye),g&&(g.textContent=l?"Ocultar Chave":"Mostrar Chave")}),this.shadow.querySelector("#eq-menu-clear")?.addEventListener("click",()=>{this.keyContextMenu.hidden=!0,this.apiKeyInput.value="",this.callbacks.onSettingsChange({apiKey:""}),this.setStatus("Campo limpo. Cole a nova chave e clique em Salvar.","info"),this.apiKeyInput.focus()}),this.shadow.querySelector("#eq-menu-test")?.addEventListener("click",async()=>{this.keyContextMenu.hidden=!0;let l=this.apiKeyInput.value.trim().replace(/^["']|["']$/g,"");if(!l)return this.setStatus("Insira ou cole a chave de API.","error");this.setStatus("Testando chave e descobrindo modelos autorizados...","info");try{let p=await Ke(l);this.setStatus(p.message,p.ok?"success":"error"),p.ok&&p.models&&p.models.length>0&&this.updateModelSelect(p.models)}catch(p){this.setStatus("Erro ao validar chave: "+p.message,"error")}});let d=()=>{this.keyContextMenu.hidden=!0,window.confirm("Deseja realmente resetar todos os dados, chaves e mem\xF3ria de sess\xE3o do EasyQuiz?")&&(Oe(),this.apiKeyInput.value="",this.callbacks.onSettingsChange({apiKey:""}),this.setStatus("Todos os dados do EasyQuiz foram limpos.","info"),this.logToConsole("> [SYS] Armazenamento local resetado.","text-yellow"))};this.shadow.querySelector("#eq-menu-reset")?.addEventListener("click",d),this.shadow.querySelector("#eq-reset-all-btn")?.addEventListener("click",d),this.apToggleBtn.addEventListener("click",()=>{if(this.autopilot.isActive())this.autopilot.stop(),this.apToggleBtn.innerHTML=`${x.play} INICIAR AUTOPILOT`,this.apToggleBtn.classList.remove("danger"),this.stopStopwatch(),this.setStatus("Autopilot pausado pelo usu\xE1rio.","info");else{if(!this.apiKeyInput.value.trim().replace(/^["']|["']$/g,"")){this.setStatus("Configure sua chave de API Gemini na aba Configura\xE7\xF5es antes de ligar o Autopilot.","error"),this.switchTab("settings"),this.apiKeyInput.focus();return}this.callbacks.onSettingsChange({autoApply:!0,autoAdvance:!0}),this.autoApplyCheckbox.checked=!0,this.autoAdvanceCheckbox.checked=!0,this.autopilot.start(),this.apToggleBtn.innerHTML=`${x.stop} PARAR AUTOPILOT`,this.apToggleBtn.classList.add("danger"),this.startStopwatch(),this.setStatus("Autopilot ativo. Monitorando exerc\xEDcios...","info")}}),this.shadow.querySelector("#eq-ap-clear-memory").addEventListener("click",()=>{be(),this.logToConsole("> [SYS] Mem\xF3ria contextual limpa com sucesso.","text-green"),this.setStatus("Mem\xF3ria contextual da sess\xE3o limpa.","success")});let u=this.shadow.querySelector("#eq-copy-console-btn");u?.addEventListener("click",()=>{let l=this.apConsole?.innerText||"";navigator.clipboard.writeText(l).then(()=>{let p=u.innerHTML;u.innerHTML=x.check,setTimeout(()=>u.innerHTML=p,1800)})}),this.copyPromptBtn.addEventListener("click",()=>{let l=this.inspPrompt.textContent||"";navigator.clipboard.writeText(l).then(()=>{let p=this.copyPromptBtn.innerHTML;this.copyPromptBtn.innerHTML=`${x.check} Copiado!`,setTimeout(()=>this.copyPromptBtn.innerHTML=p,2e3)})}),this.modelSelect.addEventListener("change",()=>this.callbacks.onSettingsChange({model:this.modelSelect.value})),this.modeSelect.addEventListener("change",()=>this.callbacks.onSettingsChange({modeHint:this.modeSelect.value})),this.engineSelect.addEventListener("change",()=>this.callbacks.onSettingsChange({engine:this.engineSelect.value})),this.dryRunCheckbox.addEventListener("change",()=>this.callbacks.onSettingsChange({dryRun:this.dryRunCheckbox.checked})),this.autoApplyCheckbox.addEventListener("change",()=>this.callbacks.onSettingsChange({autoApply:this.autoApplyCheckbox.checked})),this.autoAdvanceCheckbox.addEventListener("change",()=>this.callbacks.onSettingsChange({autoAdvance:this.autoAdvanceCheckbox.checked})),this.useVisionCheckbox.addEventListener("change",()=>{let l=this.useVisionCheckbox.checked;this.callbacks.onSettingsChange({useVision:l}),this.setStatus(l?"Vis\xE3o Computacional ativada (capturas habilitadas).":"Modo DOM R\xE1pido ativado (capturas desabilitadas).","info")}),this.hostDarkModeCheckbox.addEventListener("change",()=>{let l=this.hostDarkModeCheckbox.checked;this.callbacks.onSettingsChange({hostDarkMode:l}),this.applyHostDarkMode(l)}),this.analyzeBtn.addEventListener("click",async()=>{await this.callbacks.onAnalyze()&&!this.dryRunCheckbox.checked&&!this.autoApplyCheckbox.checked&&this.callbacks.onApply()}),this.applyBtn.addEventListener("click",()=>this.callbacks.onApply())}startStopwatch(){this.stopStopwatch(),this.stopwatchStartTime=Date.now();let e=()=>{let t=((Date.now()-this.stopwatchStartTime)/1e3).toFixed(2)+"s";this.stopwatchAp.textContent=t,this.stopwatchAdv.textContent=t};e(),this.stopwatchInterval=setInterval(e,100)}stopStopwatch(e){if(this.stopwatchInterval&&(clearInterval(this.stopwatchInterval),this.stopwatchInterval=null),e!==void 0){let t=(e/1e3).toFixed(2)+"s";this.stopwatchAp.textContent=t,this.stopwatchAdv.textContent=t}}setLogFilter(e){this.activeLogFilter=e;let t=["all","error","ai","dom"];for(let n of t){let i=this.shadow.querySelector(`#eq-dbg-filter-${n}`);n===e?i?.classList.add("active"):i?.classList.remove("active")}this.renderTerminalEntries()}updateLogCounters(){let e=0,t=0,n=0;for(let i of this.logEntries)i.category==="error"?e++:i.category==="ai"?t++:i.category==="dom"&&n++;this.dbgCountAll&&(this.dbgCountAll.textContent=String(this.logEntries.length)),this.dbgCountError&&(this.dbgCountError.textContent=String(e)),this.dbgCountAi&&(this.dbgCountAi.textContent=String(t)),this.dbgCountDom&&(this.dbgCountDom.textContent=String(n))}renderTerminalEntries(){if(!this.liveDebugTerminal)return;this.liveDebugTerminal.replaceChildren();let e=this.activeLogFilter==="all"?this.logEntries:this.logEntries.filter(t=>t.category===this.activeLogFilter);if(e.length===0){let t=document.createElement("div");t.className="text-muted",t.textContent=`Nenhum log encontrado para o filtro "${this.activeLogFilter.toUpperCase()}".`,this.liveDebugTerminal.appendChild(t);return}for(let t of e){let n=document.createElement("div");n.textContent=t.message,t.colorClass&&(n.className=t.colorClass),this.liveDebugTerminal.appendChild(n)}this.autoScrollLogs&&(this.liveDebugTerminal.scrollTop=this.liveDebugTerminal.scrollHeight)}clearLogs(){if(this.logEntries=[],this.updateLogCounters(),this.liveDebugTerminal){this.liveDebugTerminal.replaceChildren();let e=document.createElement("div");e.className="text-blue",e.textContent="> [SYS] Console de logs limpo pelo usu\xE1rio.",this.liveDebugTerminal.appendChild(e)}this.apConsole&&this.apConsole.replaceChildren(),this.executionConsole&&this.executionConsole.replaceChildren()}getFormattedLogs(){return(this.activeLogFilter==="all"?this.logEntries:this.logEntries.filter(t=>t.category===this.activeLogFilter)).map(t=>t.message).join(`
`)}setLastError(e){this.lastErrorMsg=e,this.dbgErrorCard&&this.dbgErrorText&&(this.dbgErrorText.textContent=e,this.dbgErrorCard.style.display="flex")}setErrorDiagnostic(e,t){let n=t?`[${t}] ${e}`:e;this.setLastError(n)}refreshDebugView(){let e=this.latestPlan,t=this.latestContext,n=this.latestPromptText||e?.promptSent||"";if(this.dbgModel&&(this.dbgModel.textContent=e?.usedModel||this.initialSettings.model||"--"),this.dbgLatency&&(this.dbgLatency.textContent=e?.durationMs?`${e.durationMs}ms`:"--"),this.dbgSplitTokens){let i=e?.promptTokens!==void 0?String(e.promptTokens):"--",a=e?.candidatesTokens!==void 0?String(e.candidatesTokens):"--";this.dbgSplitTokens.textContent=`${i} / ${a}`,this.dbgSplitTokens.title=`Prompt: ${i} tokens | Resposta: ${a} tokens`}if(this.dbgTotalTokens){let i=e?.tokensUsed??(e?.promptTokens&&e?.candidatesTokens?e.promptTokens+e.candidatesTokens:void 0);this.dbgTotalTokens.textContent=i!==void 0?`${i}`:"--"}if(this.dbgPromptLen){let i=n.length,a=Math.round(i/4);this.dbgPromptLen.textContent=`${i} chars (~${a} tokens est.)`}if(this.dbgPromptView&&(this.dbgPromptView.textContent=n||"Nenhum prompt enviado at\xE9 o momento."),this.dbgContextView)if(t){let i={scope:`${t.scope.tagName.toLowerCase()}${t.scope.id?"#"+t.scope.id:""}${t.scope.className?"."+t.scope.className.split(" ").join("."):""}`,questionLength:t.questionText.length,questionSnippet:t.questionText.slice(0,150)+(t.questionText.length>150?"...":""),controlsCount:t.controls.length,controls:t.controls.map((a,s)=>({index:s+1,tag:a.tag,type:a.type,name:a.name||void 0,id:a.id||void 0,value:a.value||void 0,label:a.label||void 0,role:a.role}))};this.dbgContextView.textContent=JSON.stringify(i,null,2)}else this.dbgContextView.textContent="Aguardando captura de contexto pelo EasyQuiz...";this.dbgRawRespView&&(e?e.rawResponse?this.dbgRawRespView.textContent=e.rawResponse:this.dbgRawRespView.textContent=JSON.stringify({pageType:e.pageType,mode:e.mode,confidence:e.confidence,rationale:e.rationale,actions:e.actions},null,2):this.dbgRawRespView.textContent="Aguardando retorno da API Gemini..."),this.lastErrorMsg&&this.dbgErrorCard&&this.dbgErrorText&&(this.dbgErrorText.textContent=this.lastErrorMsg,this.dbgErrorCard.style.display="flex")}logToConsole(e,t){let n=new Date,i=`${String(n.getHours()).padStart(2,"0")}:${String(n.getMinutes()).padStart(2,"0")}:${String(n.getSeconds()).padStart(2,"0")}.${String(Math.floor(n.getMilliseconds()/100))}`,a=e;e.startsWith(">")?a=`> [${i}] ${e.slice(1).trim()}`:a=`[${i}] ${e}`;let s="all";t==="text-red"||a.includes("[ERRO]")||a.includes("Falha")||a.includes("Error")?s="error":a.includes("[IA]")||a.includes("[RAG]")||a.includes("Tokens")||a.includes("Gemini")||a.includes("Modelo:")?s="ai":(a.includes("[DOM]")||a.includes("[EXEC]")||a.includes("[VERIF]")||a.includes("[NAV]"))&&(s="dom");let r={id:Date.now()+Math.random(),timestamp:i,message:a,colorClass:t,category:s};for(this.logEntries.push(r);this.logEntries.length>250;)this.logEntries.shift();if(this.updateLogCounters(),s==="error"&&this.setLastError(a),this.liveDebugTerminal&&(this.activeLogFilter==="all"||this.activeLogFilter===s)){let c=document.createElement("div");for(c.textContent=a,t&&(c.className=t),this.liveDebugTerminal.appendChild(c);this.liveDebugTerminal.children.length>250;)this.liveDebugTerminal.removeChild(this.liveDebugTerminal.firstChild);this.autoScrollLogs&&(this.liveDebugTerminal.scrollTop=this.liveDebugTerminal.scrollHeight)}if(this.apConsole){let c=document.createElement("div");for(c.textContent=a,t&&(c.className=t),this.apConsole.appendChild(c),this.apConsole.scrollTop=this.apConsole.scrollHeight;this.apConsole.children.length>150;)this.apConsole.removeChild(this.apConsole.firstChild)}if(this.executionConsole){let c=document.createElement("div");for(c.textContent=a,t&&(c.className=t),this.executionConsole.appendChild(c),this.executionConsole.scrollTop=this.executionConsole.scrollHeight;this.executionConsole.children.length>150;)this.executionConsole.removeChild(this.executionConsole.firstChild)}}setProgress(e,t){if(!this.progressContainer||!this.progressBar)return;if(e<=0){this.progressContainer.style.display="none",this.progressBar.style.width="0%";return}this.progressContainer.style.display="flex";let n=Math.min(100,Math.max(0,Math.round(e)));this.progressBar.style.width=`${n}%`,this.progressVal&&(this.progressVal.textContent=`${n}%`),t&&this.progressLabel&&(this.progressLabel.textContent=t),n>=100&&setTimeout(()=>{this.progressContainer&&this.progressBar&&this.progressBar.style.width==="100%"&&(this.progressContainer.style.display="none")},1500)}updateContext(e,t){this.latestContext=e,t&&(this.latestPlan=t),this.activeTab==="brain"?(this.renderContextTree(),t&&this.refreshInspectorView()):this.activeTab==="debug"&&this.refreshDebugView()}renderContextTree(){if(!this.contextTreeContainer)return;let e=this.latestContext,t=oe(),n=this.latestPlan;this.contextTreeContainer.innerHTML="";let i=this.createTreeFolder("\u{1F4C4} P\xC1GINA & ESCOPO ATUAL",!0,[{label:"T\xEDtulo",value:document.title||"Sem t\xEDtulo"},{label:"URL",value:window.location.pathname||"/"},{label:"Escopo DOM",value:e?`${e.scope.tagName.toLowerCase()}${e.scope.className?"."+e.scope.className.split(" ").join("."):""}`:"Document"},{label:"Tamanho Texto",value:e?`${e.questionText.length} caracteres`:"N\xE3o analisado"},{label:"Trecho Enunciado",value:e?`"${e.questionText.slice(0,120)}..."`:"Nenhum"}]);this.contextTreeContainer.appendChild(i);let a=e?e.controls:[],s=a.map((h,u)=>{let l=h.role==="navigation"||h.type==="button",p=!l&&h.value?` [val: "${h.value}"]`:"";return{label:`[#${u+1}] ${h.type.toUpperCase()}`,value:`${h.label||h.id||h.name||"(Sem r\xF3tulo)"}${p}`.trim(),badge:l?"Navega\xE7\xE3o":h.role||h.type}}),r=this.createTreeFolder(`\u{1F39B}\uFE0F CONTROLES DETECTADOS (${a.length})`,a.length>0,s);this.contextTreeContainer.appendChild(r);let c=t.map((h,u)=>({label:`Mem\xF3ria #${u+1}`,value:h,badge:"RAG"})),d=this.createTreeFolder(`\u{1F9E0} MEM\xD3RIA RAG ACUMULADA (${t.length})`,t.length>0,c);if(this.contextTreeContainer.appendChild(d),n){let h=this.createTreeFolder(`\u{1F916} \xDALTIMO PLANO IA (${n.actions.length} a\xE7\xF5es)`,!0,[{label:"Tipo P\xE1gina",value:n.pageType,badge:`${(n.confidence*100).toFixed(0)}%`},{label:"Modo",value:n.mode},{label:"Racioc\xEDnio",value:n.rationale||"N/A"},...n.actions.map((u,l)=>({label:`A\xE7\xE3o #${l+1} (${u.t})`,value:JSON.stringify(u)}))]);this.contextTreeContainer.appendChild(h)}}createTreeFolder(e,t,n){let i=document.createElement("div");i.className="eq-tree-node";let a=document.createElement("div");a.className="eq-tree-header",a.innerHTML=`<span class="eq-tree-arrow">${t?"\u25BC":"\u25B6"}</span> <span>${e}</span>`;let s=document.createElement("div");if(s.className="eq-tree-content",s.style.display=t?"flex":"none",n.length===0)s.innerHTML='<div class="text-muted" style="padding: 2px 0;">Nenhum item registrado.</div>';else for(let r of n){let c=document.createElement("div");c.className="eq-tree-leaf",c.innerHTML=`
          <strong style="color:#ffffff; min-width: 80px;">${r.label}:</strong>
          <span style="flex:1; word-break: break-word; color:#aaaaaa;">${r.value}</span>
          ${r.badge?`<span class="eq-tree-badge">${r.badge}</span>`:""}
        `,s.appendChild(c)}return a.addEventListener("click",()=>{let r=s.style.display==="none";s.style.display=r?"flex":"none";let c=a.querySelector(".eq-tree-arrow");c&&(c.textContent=r?"\u25BC":"\u25B6")}),i.appendChild(a),i.appendChild(s),i}toggle(e){e!==void 0?this.isCollapsed=!e:this.isCollapsed=!this.isCollapsed,this.isCollapsed?this.sidebarEl.classList.add("eq-collapsed"):(this.sidebarEl.classList.remove("eq-collapsed"),this.apiKeyInput.value||(this.switchTab("settings"),this.apiKeyInput.focus()))}setBusy(e,t){this.analyzeBtn.disabled=e,[this.modelSelect,this.modeSelect,this.engineSelect,this.dryRunCheckbox,this.autoApplyCheckbox,this.autoAdvanceCheckbox,this.useVisionCheckbox].forEach(n=>n.disabled=e),e?(this.startStopwatch(),this.dotPulseAp.className="eq-dot-pulse busy",this.dotPulseAdv.className="eq-dot-pulse busy",this.launcherDot.className="eq-launcher-dot busy",t&&this.setStatus(t,"info")):(this.stopStopwatch(),this.dotPulseAp.className="eq-dot-pulse",this.dotPulseAdv.className="eq-dot-pulse",this.launcherDot.className="eq-launcher-dot")}setStatus(e,t="info"){this.statusTextAp.textContent=e,this.statusTextAdv.textContent=e;let n=this.shadow.querySelector("#eq-operation-state");n&&(n.textContent=t==="error"?"Bloqueado":t==="success"?"Confirmado":this.autopilot.isActive()?"Monitorando":"Pronto",n.className=`eq-operation-state is-${t}`),t==="error"?(this.dotPulseAp.className="eq-dot-pulse error",this.dotPulseAdv.className="eq-dot-pulse error",this.launcherDot.className="eq-launcher-dot error"):t==="success"&&(this.dotPulseAp.className="eq-dot-pulse",this.dotPulseAdv.className="eq-dot-pulse",this.launcherDot.className="eq-launcher-dot");let i=e.includes("Alternando")||e.includes("indispon\xEDvel")||e.includes("fallback")||e.includes("alternativo"),a=t==="error"?"> [ERRO] ":t==="success"?"> [SUCESSO] ":i?"> [FALLBACK] ":"> [SYS] ",s=t==="error"?"text-red":t==="success"?"text-green":i?"text-yellow":"text-blue";this.logToConsole(`${a}${e}`,s)}setPlan(e,t){this.latestPlan=e,this.resultContainer.style.display="flex",e.durationMs&&this.stopStopwatch(e.durationMs);let n=this.shadow.querySelector("#eq-badges");n.replaceChildren();let i=[e.mode.replace("_"," "),`${Math.round(e.confidence*100)}% Confian\xE7a`,`${e.actions.length} a\xE7\xF5es`,...e.usedModel?[e.usedModel]:[]];for(let c of i){let d=document.createElement("span");d.className="eq-brand-badge",d.textContent=c,n.appendChild(d)}let a=this.shadow.querySelector("#eq-rationale-text");a.textContent=e.rationale;let s=this.shadow.querySelector("#eq-actions-list");s.innerHTML="";for(let c of e.actions){let d=document.createElement("div");d.className="eq-action-item";let h="";c.t==="chk"?h=`chk ${c.id} (${c.c})`:c.t==="val"?h=`val "${c.v}" -> ${c.id}`:c.t==="sel"?h=`sel "${Array.isArray(c.v)?c.v.join(","):c.v}" -> ${c.id}`:c.t==="clk"?h=`clk ${c.id}`:c.t==="adv"?h="adv":c.t==="js"?h=`js: ${String(c.v).slice(0,40)}...`:c.t==="drag"&&(h=`drag "${c.from}" -> "${c.to}"`);let u=document.createElement("span");u.className="eq-action-badge",u.textContent=c.t.toUpperCase();let l=document.createElement("span");l.textContent=h,d.append(u,l),s.appendChild(d)}this.applyBtn.disabled=!t||!e.actions.length;let r=this.shadow.querySelector("#eq-execution-card");r&&(r.hidden=!0),this.refreshInspectorView(),this.refreshDebugView()}setExecutionReport(e){let t=this.shadow.querySelector("#eq-execution-card"),n=this.shadow.querySelector("#eq-execution-summary"),i=this.shadow.querySelector("#eq-execution-list");if(!t||!n||!i)return;t.hidden=!1,n.textContent=e.navigationVerified?`${e.verified}/${e.applied} a\xE7\xF5es verificadas. Navega\xE7\xE3o confirmada.`:`${e.verified}/${e.applied} a\xE7\xF5es verificadas. ${e.navigationEvidence}`,n.className=`eq-execution-summary ${e.success?"is-success":"is-warning"}`,i.replaceChildren();let a=this.shadow.querySelector("#eq-execution-placeholder");a&&(a.textContent=e.navigationVerified?"Fluxo conclu\xEDdo: aplica\xE7\xE3o e navega\xE7\xE3o confirmadas.":`Fluxo interrompido: ${e.navigationEvidence}`,a.className=`eq-execution-placeholder ${e.success?"is-success":"is-warning"}`);for(let s of e.reports){let r=document.createElement("div");r.className=`eq-execution-row ${s.verified?"is-success":"is-failed"}`;let c=document.createElement("span");c.className="eq-execution-state",c.textContent=s.verified?"OK":"FALHOU";let d=document.createElement("div");d.className="eq-execution-details";let h=document.createElement("strong");h.textContent=s.target;let u=document.createElement("span");if(u.textContent=`${s.strategy} | ${s.evidence}`,d.append(h,u),r.append(c,d),s.error){let l=document.createElement("small");l.textContent=s.error,r.appendChild(l)}i.appendChild(r)}}setInspectorPrompt(e,t){this.latestPromptText=e,this.inspPrompt&&(this.inspPrompt.textContent=e),t&&this.inspModel&&(this.inspModel.textContent=t),this.inspLatency&&(this.inspLatency.textContent="Aguardando IA..."),this.activeTab==="debug"&&this.refreshDebugView()}refreshInspectorView(){let e=this.latestPlan;if(e)if(this.inspModel.textContent=e.usedModel||this.initialSettings.model,this.inspLatency.textContent=e.durationMs?`${e.durationMs}ms`:"--",this.inspTokens.textContent=e.tokensUsed?`${e.tokensUsed}`:"--",this.inspPrompt.textContent=e.promptSent||this.latestPromptText||"Prompt n\xE3o registrado para esta requisi\xE7\xE3o.",this.inspRationale.textContent=e.rationale,this.inspActions.innerHTML="",e.actions.length>0)for(let t of e.actions){let n=document.createElement("div");n.className="eq-action-item",n.textContent=JSON.stringify(t),this.inspActions.appendChild(n)}else this.inspActions.innerHTML='<div class="text-muted" style="padding: 4px;">Nenhuma a\xE7\xE3o prescrita pela IA.</div>';else this.latestPromptText&&(this.inspPrompt.textContent=this.latestPromptText)}showFloatingAnswers(e){let t=e||this.latestPlan;t&&this.floatingAnswers.show(t)}hideFloatingAnswers(){this.floatingAnswers.hide()}isFloatingAnswersOpen(){return this.floatingAnswers.isOpen()}updateModelSelect(e,t){let n=t||this.initialSettings.model||this.modelSelect.value;this.modelSelect.innerHTML="";let i=!1;e.forEach(a=>{let s=a.id===n;s&&(i=!0),this.modelSelect.add(new Option(a.name,a.id,!1,s))}),!i&&n&&this.modelSelect.add(new Option(`Gemini (${n})`,n,!1,!0)),this.modelSelect.value=n}updateSelectedModel(e){Array.from(this.modelSelect.options).some(n=>n.value===e)||this.modelSelect.add(new Option(`Gemini (${e})`,e,!1,!0)),this.modelSelect.value=e}applyHostDarkMode(e){document.getElementById("eq-host-dark-mode-style")?.remove(),this.host.classList.toggle("eq-dark-mode-active",e)}destroy(){this.stopStopwatch(),this.autopilot.stop(),this.applyHostDarkMode(!1),this.callbacks.onDestroy(),this.host.remove()}};async function It(){let o=window;if(o.__easyquiz){o.__easyquiz.toggle();return}let e=fe(),t=null,n=new he(e,{onAnalyze:(s=1)=>i(s),onApply:(s=1)=>void a(s),onDestroy:()=>{ee(),delete o.__easyquiz},onSettingsChange:s=>{e=Ve(s)}});o.__easyquiz={toggle:()=>n.toggle(),destroy:()=>n.destroy(),analyze:async()=>{await i()}},window.addEventListener("keydown",s=>{if(s.altKey&&(s.key==="q"||s.key==="Q")){if(s.preventDefault(),!n)return;n.toggle(!0),i()}});async function i(s=1){if(!e.apiKey){n.setStatus("Configure sua chave de API Gemini acima para come\xE7ar.","error"),n.toggle(!0);return}n.setBusy(!0,"Identificando o bloco da quest\xE3o ativa na p\xE1gina..."),n.setProgress(20,"Varrendo escopo do DOM e controles..."),ee(),n.hideFloatingAnswers();try{let r=W(!1);r||(n.setStatus("Nenhum controle detectado. Tentando captura de tela inteira...","info"),r=G()),Pe(r.scope),n.updateContext(r),n.logToConsole(`> [DOM] Escopo: <${r.scope.tagName.toLowerCase()}> com ${r.controls.length} controle(s) e ${r.questionText.length} caracteres.`,"text-blue"),n.setStatus(`Quest\xE3o localizada (${r.controls.length} controles). Preparando an\xE1lise...`,"info"),n.setProgress(40,`Consultando Gemini (${e.model})...`);let c=await Re(r.scope,e.useVision);n.setStatus(c.length>0?`Consultando Gemini (${e.model}) com ${c.length} imagem(ns) anexada(s)...`:`Consultando Gemini (${e.model}) via DOM nativo (modo r\xE1pido)...`,"info");let d=Y(r,c,e);n.setInspectorPrompt(d,e.model);let h=(p,g)=>{n.setStatus(p,g==="warning"?"info":g);let b=g==="error"?"[ERRO]":g==="warning"?"[FALLBACK]":"[SYS]",y=g==="error"?"text-red":g==="warning"?"text-yellow":"text-muted";n.logToConsole(`> ${b} ${p}`,y)},{plan:u,usedModel:l}=await xe(r,c,e,h);if(u.needsMoreContext){n.setProgress(55,"Ampliando escopo da quest\xE3o..."),n.setStatus("Enunciado ou contexto isolado detectado pela IA. Acionando Sele\xE7\xE3o Geral Expandida...","info"),n.logToConsole("> [DOM] Enunciado isolado. Ampliando escopo para sele\xE7\xE3o expandida...","text-blue"),r=W(!0),r||(r=G()),Pe(r.scope),n.updateContext(r),c=await Re(r.scope,e.useVision),n.setStatus(`Reconsultando IA com escopo ampliado (${r.controls.length} controles)...`,"info");let p=Y(r,c,e);n.setInspectorPrompt(p,e.model),u=(await xe(r,c,e,h)).plan}return n.setProgress(70,"Resposta recebida da IA! Processando plano..."),n.logToConsole(`> [IA] Modelo: ${l||e.model} | Modo: ${u.mode} | Confian\xE7a: ${(u.confidence*100).toFixed(0)}%`,"text-green"),u.rationale&&n.logToConsole(`> [IA] Racioc\xEDnio: "${u.rationale}"`,"text-blue"),n.logToConsole(`> [IA] ${u.actions.length} a\xE7\xE3o(\xF5es) prescritas no plano.`,"text-blue"),u.memoryToStore&&(_e(u.memoryToStore),n.logToConsole(`> [RAG] \u{1F9E0} Nova mem\xF3ria te\xF3rica salva na sess\xE3o: "${u.memoryToStore}"`,"text-yellow")),t=u,n.updateContext(r,u),st(u.actions),n.setPlan(u,!e.dryRun),u.pageType==="conclusion"?(n.setProgress(100,"Atividade conclu\xEDda!"),n.setStatus("Atividade conclu\xEDda ou tela final detectada pela IA.","success")):u.pageType==="info"?(n.setProgress(100,"Contexto absorvido na mem\xF3ria!"),n.setStatus("\u{1F4D8} Conte\xFAdo de contexto absorvido na mem\xF3ria RAG. Avan\xE7ando...","success")):u.pageType==="start"?(n.setProgress(100,"In\xEDcio detectado!"),n.setStatus("In\xEDcio de atividade detectado. Iniciando...","info")):(n.setProgress(80,"Plano de resolu\xE7\xE3o pronto!"),n.setStatus(e.dryRun?"Simula\xE7\xE3o conclu\xEDda. As respostas foram real\xE7adas na p\xE1gina sem altera\xE7\xE3o.":"Resolu\xE7\xE3o pronta! Verifique o realce na tela e aplique quando desejar.","success")),e.dryRun&&u.pageType==="question"&&n.showFloatingAnswers(u),e.autoApply&&!e.dryRun&&await a(s),u}catch(r){ee(),n.setProgress(0);let c=r instanceof Error?r.message:"Falha desconhecida na an\xE1lise.";n.setStatus(c,"error"),n.logToConsole(`> [ERRO] ${c}`,"text-red"),n.setErrorDiagnostic(c,"An\xE1lise da IA");return}finally{n.setBusy(!1)}}async function a(s=1){if(!t){n.setStatus("Nenhum plano dispon\xEDvel para aplicar. Execute a an\xE1lise primeiro.","error");return}if(e.dryRun){n.setStatus("O modo de simula\xE7\xE3o est\xE1 ativo. Desmarque para poder aplicar.","error");return}let r=t.pageType==="info"||t.pageType==="start",c=(e.autoAdvance||r)&&t.confidence>=e.confidenceThreshold&&!t.needsMoreContext;n.setBusy(!0,"Aplicando respostas no formul\xE1rio..."),n.setProgress(85,`Aplicando ${t.actions.length} a\xE7\xE3o(\xF5es) no formul\xE1rio...`),n.logToConsole(`> [EXEC] Iniciando aplica\xE7\xE3o com 6 vias de persist\xEAncia para ${t.actions.length} a\xE7\xE3o(\xF5es)...`,"text-blue");try{let d=await ze(t,c,s,X(e));if(n.setExecutionReport(d),d.success||d.advanced)n.setProgress(100,"Sucesso! Respostas preenchidas e validadas!"),n.logToConsole(`> [VERIF] \u2713 Sucesso no DOM: ${d.verified}/${d.applied} a\xE7\xF5es validadas com sucesso!`,"text-green"),d.advanced?n.logToConsole("> [NAV] \u2713 Bot\xE3o de confirma\xE7\xE3o/avan\xE7o acionado com sucesso!","text-green"):c&&n.logToConsole(`> [NAV] \u26A0\uFE0F ${d.navigationEvidence}`,"text-yellow"),n.setStatus(d.advanced?`Sucesso: ${d.applied} resposta(s) preenchida(s) e pr\xF3xima quest\xE3o confirmada.`:`Respostas preenchidas e validadas. Avan\xE7o n\xE3o confirmado: ${d.navigationEvidence}`,d.advanced||!c?"success":"info"),n.hideFloatingAnswers();else{n.setProgress(0,"Aplica\xE7\xE3o parcial: verifica\xE7\xE3o incompleta.");let h=d.failed.length>0?d.failed.join(", "):"alvos pendentes";n.logToConsole(`> [VERIF] Alerta: ${d.verified}/${d.applied} a\xE7\xF5es verificadas. Pend\xEAncias: ${h}.`,"text-yellow"),n.setStatus(`Aplica\xE7\xE3o parcial (${d.applied} enviadas, ${d.verified} verificadas).`,"info"),n.hideFloatingAnswers()}}catch(d){n.setProgress(0);let h=d instanceof Error?d.message:"Falha ao aplicar plano.";n.setStatus(h,"error"),n.logToConsole(`> [ERRO] ${h}`,"text-red"),n.hideFloatingAnswers()}finally{n.setBusy(!1)}}n.toggle(!0)}It().catch(o=>{console.error("[EasyQuiz] Erro fatal na inicializa\xE7\xE3o:",o),window.alert(`EasyQuiz: falha ao iniciar: ${o instanceof Error?o.message:String(o)}`)});})();
