/* EasyQuiz v1.0.0 — Resolução inteligente de quizzes sem servidor
 * GitHub: https://github.com/minifoxie/EasyQuiz
 * 100% Client-side. Direct Google Gemini REST API.
 */
"use strict";(()=>{var U={apiKey:"",model:"gemini-3.8-flash",uiMode:"easy",modeHint:"",engine:"smart",dryRun:!1,autoApply:!0,autoAdvance:!1,hostDarkMode:!0,useVision:!1,confidenceThreshold:.8};var Le="easyquiz_settings_v2";function Se(){try{let o=localStorage.getItem(Le);if(!o){let a=localStorage.getItem("easyquiz_settings_v1");if(a){let n=JSON.parse(a);return{...U,apiKey:n.apiKey||""}}return{...U}}let e=JSON.parse(o),t=typeof e.model=="string"&&e.model?e.model:U.model;return{apiKey:typeof e.apiKey=="string"?e.apiKey.trim():U.apiKey,model:t,uiMode:e.uiMode==="easy"||e.uiMode==="advanced"?e.uiMode:U.uiMode,modeHint:e.modeHint??"",engine:e.engine??"smart",dryRun:!!e.dryRun,autoApply:e.autoApply!==void 0?!!e.autoApply:!0,autoAdvance:!!e.autoAdvance,hostDarkMode:e.hostDarkMode!==void 0?!!e.hostDarkMode:!0,useVision:!!e.useVision,confidenceThreshold:typeof e.confidenceThreshold=="number"?e.confidenceThreshold:U.confidenceThreshold}}catch{return{...U}}}function We(){try{localStorage.removeItem(Le),localStorage.removeItem("easyquiz_settings_v1");let o=[];for(let e=0;e<localStorage.length;e++){let t=localStorage.key(e);t&&(t.startsWith("eq_")||t.startsWith("easyquiz_"))&&o.push(t)}o.forEach(e=>localStorage.removeItem(e)),Me()}catch(o){console.warn("[EasyQuiz] Erro ao resetar dados:",o)}}function ie(o){try{let e=localStorage.getItem("eq_domain_cache_"+o);if(!e)return{};let t=JSON.parse(e);if(t.advanceSelector&&/inject|injetar/i.test(t.advanceSelector)){t.advanceSelector=void 0;try{localStorage.removeItem("eq_domain_cache_"+o)}catch{}}return t}catch{return{}}}function Ae(o,e){if(e.advanceSelector&&/inject|injetar/i.test(e.advanceSelector))return;let a={...ie(o),...e};try{localStorage.setItem("eq_domain_cache_"+o,JSON.stringify(a))}catch(n){console.warn("[EasyQuiz] Erro cache de dominio:",n)}}function Ze(o){let t={...Se(),...o};try{localStorage.setItem(Le,JSON.stringify(t))}catch(a){console.warn("[EasyQuiz] Falha ao persistir configura\xE7\xF5es no localStorage:",a)}return t}var Y=[],Xe=12,xt=1200;function et(o){let e=o.trim().replace(/\s+/g," ").slice(0,xt);e&&!Y.includes(e)&&(Y.push(e),Y.length>Xe&&(Y=Y.slice(-Xe)))}function he(){return Y}function Me(){Y=[]}var tt=[{id:"native-value-events",widget:"text",label:"Setter nativo com input/change/blur",precondition:"Campo edit\xE1vel vis\xEDvel e n\xE3o desabilitado.",evidence:"value ou textContent coincide exatamente com o valor esperado.",risk:"low",cost:"fast"},{id:"native-choice-state",widget:"choice",label:"Estado nativo de radio/checkbox",precondition:"Input ou widget ARIA \xFAnico localizado.",evidence:"checked/aria-checked/data-state do alvo e grupo correspondem ao esperado.",risk:"low",cost:"fast"},{id:"native-select-events",widget:"select",label:"Sele\xE7\xE3o nativa por value/texto exato",precondition:"Select vis\xEDvel com op\xE7\xE3o correspondente.",evidence:"option.selected e selected value correspondem ao esperado.",risk:"low",cost:"fast"},{id:"aria-combobox-keyboard",widget:"combobox",label:"Combobox ARIA por foco e teclado",precondition:"Combobox vis\xEDvel com popup/op\xE7\xF5es acess\xEDveis.",evidence:"aria-expanded, aria-activedescendant ou op\xE7\xE3o selecionada mudam.",risk:"medium",cost:"normal"},{id:"click-to-place",widget:"drag",label:"Selecionar item e clicar no destino",precondition:"Cart\xE3o e dropzone vis\xEDveis com protocolo click-to-place.",evidence:"Item passa a ser filho do destino ou recebe estado de colocado.",risk:"medium",cost:"normal"},{id:"html5-drag-drop",widget:"drag",label:"HTML5 dragstart/dragover/drop",precondition:"Origem draggable e destino aceita drag/drop.",evidence:"Relocation, callback ou estado placed confirmado.",risk:"medium",cost:"normal"},{id:"keyboard-order",widget:"order",label:"Ordena\xE7\xE3o por foco e teclado",precondition:"Itens orden\xE1veis com foco/roles ou bot\xF5es de mover.",evidence:"Ordem dos itens no DOM corresponde \xE0 sequ\xEAncia esperada.",risk:"medium",cost:"normal"},{id:"navigation-feedback",widget:"navigation",label:"Verificar e confirmar feedback/transi\xE7\xE3o",precondition:"Bot\xE3o de verifica\xE7\xE3o/avan\xE7o \xFAnico e habilitado.",evidence:"Feedback esperado e assinatura espec\xEDfica da quest\xE3o mudam.",risk:"high",cost:"normal"},{id:"javascript-explicit",widget:"javascript",label:"JavaScript limitado via capability expl\xEDcita",precondition:"Engine javascript autorizada e a\xE7\xE3o declarativa insuficiente.",evidence:"Efeito DOM esperado confirmado por verificador.",risk:"high",cost:"last-resort"}];function wt(o){if(!o||o.length===0)return tt.filter(t=>t.widget!=="javascript");let e=new Set(o);return tt.filter(t=>e.has(t.widget))}function ot(o){return wt(o).map(e=>`${e.id}: ${e.label} | pr\xE9: ${e.precondition} | prova: ${e.evidence} | risco: ${e.risk}`).join(`
`)}var nt=`Voc\xEA \xE9 o motor operacional inteligente do EasyQuiz. Sa\xEDda EXCLUSIVA em JSON minificado, sem markdown ou conversa.

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
`;function se(o,e,t){let a=o.htmlSnippet.includes("draggable")||o.htmlSnippet.includes("perseus")||o.htmlSnippet.includes("category")||o.htmlSnippet.includes("dropzone")||o.controls.some(c=>c.type==="draggable"||c.type==="dropzone"),n=new Set(["navigation"]);o.controls.some(c=>["text","number","textarea","contenteditable"].some(h=>c.type.includes(h)))&&n.add("text"),o.controls.some(c=>["radio","checkbox"].includes(c.type)||c.tag==="button")&&n.add("choice"),o.controls.some(c=>c.tag==="select")&&n.add("select"),o.controls.some(c=>/combobox|dropdown/i.test(c.type))&&n.add("combobox"),(o.controls.some(c=>["draggable","dropzone"].includes(c.type))||a)&&n.add("drag"),t.engine==="javascript"&&n.add("javascript");let i=/katex|latex|math|matrix|formula|frac|\$|\^|\_/i.test(o.htmlSnippet)||/calcular|calcule|resolva|matriz|equação|função|probabilidade|geometria|fórmula|coordenada|sistema/i.test(o.questionText),s=o.questionText.length<250||a||o.controls.length<4||i?`
[HTML]:
${o.htmlSnippet.slice(0,3500).replace(/\s+/g," ")}`:`
[HTML]: Omitido.`,l=he(),d=l.length>0?`
[MEM\xD3RIA]:
${l.join(" | ")}
`:"",p=o.controls.filter(c=>c.role!=="navigation"),u=o.controls.filter(c=>c.role==="navigation");return`--- AN\xC1LISE ---
[MODO]: ${t.engine} | Dica: ${t.modeHint||"Auto"}
[URL]: ${o.sourceUrl}
[P\xC1GINA]: ${o.pageTitle}${d}
[ESTRAT\xC9GIAS]:
${ot([...n])}
[DADOS]
[TEXTO]:
${o.questionText}${s}

[RESPOSTAS]:
${p.length>0?JSON.stringify(p.map(c=>({id:c.id,t:c.type,n:c.name||void 0,txt:c.label,v:c.value||void 0,opt:c.options.length?c.options:void 0}))):"Nenhuma"}

[NAVEGA\xC7\xC3O]:
${u.length>0?u.map(c=>`"${c.label||c.id}"[${c.type}]`).join(","):"Nenhuma"}

[IMAGENS E GR\xC1FICOS ANEXADOS (${e.length})]:
${e.length>0?e.map((c,h)=>`  - Imagem ${h+1}: ${c.associatedLabel||"Gr\xE1fico da Quest\xE3o"}${c.alt?` (Texto alt: "${c.alt}")`:""}`).join(`
`):"Nenhum anexo visual."}
[/DADOS]
Sa\xEDda em JSON v\xE1lido.`}var Et=new Set(["question","info","start","conclusion"]),qt=new Set(["texto_livre","escolha_unica","escolha_multipla","verdadeiro_falso","preenchimento","acao_sem_resposta","categorizacao","ordenacao","arrastar_soltar"]),Tt=new Set(["val","chk","sel","clk","adv","js","drag"]),Ct=150,re=2e3;function D(o,e=""){return o==null?e:typeof o=="string"?o.trim().slice(0,re):typeof o=="number"||typeof o=="boolean"?String(o).trim().slice(0,re):e}function Lt(o,e){if(!o||typeof o!="object")return null;let t=o,a=t.t;if(typeof a!="string"||!Tt.has(a))return null;if(a==="adv"){let s=t.id??t.target??t.name??t.selector;return{t:"adv",...D(s)?{id:D(s,"").slice(0,500)}:{}}}if(a==="drag"){let s=D(t.from??t.source),l=D(t.to??t.target??t.destination);return!s||!l?null:{t:"drag",from:s.slice(0,500),to:l.slice(0,500)}}if(a==="js"){let s=D(t.v??t.code??t.script);return!s||s.length>8e3?null:{t:"js",v:s}}let n=t.id??t.target??t.name??t.selector??t.element;(n==null||n==="")&&a==="val"&&(n="1");let i=D(n).slice(0,500);if(!i)return null;if(a==="val"){let s=t.v!==void 0?t.v:t.value!==void 0?t.value:t.val!==void 0?t.val:t.text!==void 0?t.text:t.answer;return{t:"val",id:i,v:D(s).slice(0,re)}}if(a==="sel"){let s=t.v!==void 0?t.v:t.value!==void 0?t.value:t.val!==void 0?t.val:t.values,d=(Array.isArray(s)?s:[s]).map(p=>D(p).slice(0,500)).filter(Boolean);return{t:"sel",id:i,v:d}}if(a==="chk"){let s=t.c===!1||t.c==="false"||t.c===0||t.c==="0"||t.c==="off"||t.c==="unchecked"||t.c==="desmarcar",l={t:"chk",id:i,c:!s};return t.v!==void 0&&(l.v=D(t.v).slice(0,re)),l}let r={t:"clk",id:i};if(t.c!==void 0){let s=t.c===!1||t.c==="false"||t.c===0||t.c==="0"||t.c==="off"||t.c==="unchecked"||t.c==="desmarcar";r.c=!s}return t.v!==void 0&&(r.v=D(t.v).slice(0,re)),Array.isArray(t.co)&&t.co.length===2&&t.co.every(s=>typeof s=="number"&&Number.isFinite(s))&&(r.co=[t.co[0],t.co[1]]),r}function ke(o){if(!o||typeof o!="object")return{pageType:"info",mode:"acao_sem_resposta",confidence:.5,rationale:"Resposta estruturada n\xE3o identificada; avan\xE7ando como informativo.",actions:[{t:"adv"}]};let e=o,t=e.pageType,a=e.mode;(typeof t!="string"||!Et.has(t))&&(t="question"),(typeof a!="string"||!qt.has(a))&&(a="escolha_unica");let n=Array.isArray(e.actions)?e.actions:[],i=[];for(let d=0;d<Math.min(n.length,Ct);d++){let p=Lt(n[d],d);p&&i.push(p)}let r=i.filter(d=>d.t!=="adv"),s=i.some(d=>d.t==="adv");t==="conclusion"?i.length=0:t==="info"||t==="start"?s||i.push({t:"adv"}):t==="question"&&!s&&i.push({t:"adv"});let l=typeof e.confidence=="number"&&Number.isFinite(e.confidence)?Math.min(1,Math.max(0,e.confidence)):.85;return{pageType:t,mode:a,confidence:l,rationale:D(e.rationale,"Plano validado e auto-recuperado."),actions:i,...D(e.memoryToStore)?{memoryToStore:D(e.memoryToStore)}:{},...e.needsMoreContext?{needsMoreContext:!!e.needsMoreContext}:{}}}var J=[{id:"gemini-2.0-flash",name:"Gemini 2.0 Flash (Mais R\xE1pido e Est\xE1vel)",description:"Modelo oficial de ultra-baixa lat\xEAncia do Google com suporte multimodal completo.",stable:!0},{id:"gemini-1.5-flash",name:"Gemini 1.5 Flash (Equilibrado e Confi\xE1vel)",description:"Modelo comprovado de alt\xEDssima disponibilidade e estabilidade.",stable:!0},{id:"gemini-2.5-flash",name:"Gemini 2.5 Flash (Racioc\xEDnio R\xE1pido)",description:"Modelo multimodal de racioc\xEDnio avan\xE7ado.",stable:!0},{id:"gemini-2.0-flash-lite-preview-02-05",name:"Gemini 2.0 Flash-Lite (Econ\xF4mico)",description:"Modelo leve e \xE1gil para respostas r\xE1pidas.",stable:!0},{id:"gemini-1.5-pro",name:"Gemini 1.5 Pro (Alta Precis\xE3o)",description:"Modelo de m\xE1xima precis\xE3o para problemas complexos.",stable:!0}],St={type:"OBJECT",properties:{pageType:{type:"STRING",enum:["question","info","start","conclusion"]},mode:{type:"STRING",enum:["texto_livre","escolha_unica","escolha_multipla","verdadeiro_falso","preenchimento","acao_sem_resposta","categorizacao","ordenacao","arrastar_soltar"]},confidence:{type:"NUMBER"},rationale:{type:"STRING"},memoryToStore:{type:"STRING"},actions:{type:"ARRAY",items:{type:"OBJECT",properties:{t:{type:"STRING",enum:["val","chk","sel","clk","adv","js","drag"]},id:{type:"STRING"},v:{},c:{type:"BOOLEAN"},co:{type:"ARRAY",items:{type:"NUMBER"}},from:{type:"STRING"},to:{type:"STRING"}},required:["t"]}}},required:["pageType","mode","confidence","rationale","actions"]};function At(o){return o.trim().replace(/^google\//,"").replace(/^models\//,"")||"gemini-2.0-flash"}function Ie(o,e){let t="";try{let a=JSON.parse(o);t=a.error?.message||a.message||""}catch{t=o.slice(0,160)}return/API_KEY_INVALID|API key not valid|key.*invalid|unregistered/i.test(t)?"Chave de API do Gemini inv\xE1lida ou n\xE3o autorizada no Google AI Studio.":/RESOURCE_EXHAUSTED|Quota exceeded/i.test(t)||e===429?"Limite tempor\xE1rio de cota do Gemini (HTTP 429) atingido. Aguardando recupera\xE7\xE3o...":e===404?`HTTP 404: ${t||"Modelo ou endpoint n\xE3o encontrado no Google AI Studio"}`:e===503||/overloaded/i.test(t)?`Servidores Google sobrecarregados (HTTP 503): ${t||"Aguardando"}`:t?`Erro Gemini (HTTP ${e}): ${t}`:`Falha na requisi\xE7\xE3o ao Gemini (HTTP ${e}).`}function at(o){let e=o.trim(),t=e.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);if(t)try{return JSON.parse(t[1].trim())}catch{}try{return JSON.parse(e)}catch{}let a=e.match(/\{[\s\S]*\}/);if(a)try{return JSON.parse(a[0].trim())}catch{}throw new Error("Falha ao decodificar JSON da IA.")}var me=(()=>{try{let o=typeof localStorage<"u"?localStorage.getItem("easyquiz_cached_models"):null;return o?JSON.parse(o):null}catch{return null}})(),He=new Set;async function ge(o){let e=o.trim().replace(/^["']|["']$/g,"");if(!e)return J;let t=[`https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(e)}`,`https://generativelanguage.googleapis.com/v1/models?key=${encodeURIComponent(e)}`];for(let a of t)try{let n=await fetch(a,{headers:{"Content-Type":"application/json","x-goog-api-key":e}});if(!n.ok){let r=await n.text(),s=Ie(r,n.status);if(s.includes("inv\xE1lida")||s.includes("n\xE3o autorizada"))throw new Error(s);continue}let i=await n.json();if(Array.isArray(i.models)&&i.models.length>0){let r=i.models.filter(s=>{let l=s.supportedGenerationMethods||[],d=(s.name||"").includes("gemini"),p=l.includes("generateContent"),u=(s.name||"").includes("embedding")||(s.name||"").includes("tts")||(s.name||"").includes("imagen")||(s.name||"").includes("aqa")||(s.name||"").includes("computer-use");return d&&p&&!u}).map(s=>{let l=s.supportedGenerationMethods||[],d=s.name.replace(/^models\//,""),p=s.displayName||d;return{id:d,name:p.includes(d)?p:`${p} (${d})`,description:s.description||"",stable:!/-preview|-experimental|-latest/i.test(d),supportsVision:!/embedding|tts|transcribe|live|image/i.test(d),supportsStructuredOutput:l.includes("generateContent"),supportedGenerationMethods:l,discoveredAt:Date.now()}});if(r.length>0){r.sort((s,l)=>{let d=p=>p==="gemini-3.8-flash"?120:p==="gemini-3.5-flash-lite"?115:p==="gemini-2.5-flash"?100:p==="gemini-3.1-pro-preview"?90:p.includes("flash")?50:10;return d(l.id)-d(s.id)}),me=r;try{typeof localStorage<"u"&&localStorage.setItem("easyquiz_cached_models",JSON.stringify(r))}catch{}return r}}}catch(n){if(n.message?.includes("Chave de API"))throw n}return J}async function it(o){let e=o.trim().replace(/^["']|["']$/g,"");if(!e)return{ok:!1,message:"Insira sua chave de API."};try{let a=await ge(e);if(a.length>0&&a!==J){let n=a[0];return{ok:!0,message:`Chave v\xE1lida! ${a.length} modelos Gemini dispon\xEDveis em sua conta. Recomendado: ${n.name}`,models:a}}}catch(a){return{ok:!1,message:a instanceof Error?a.message:String(a)}}let t=["gemini-3.8-flash","gemini-3.5-flash-lite","gemini-2.5-flash"];for(let a of t)for(let n of["v1beta","v1"]){let i=`https://generativelanguage.googleapis.com/${n}/models/${a}:generateContent?key=${encodeURIComponent(e)}`;try{if((await fetch(i,{method:"POST",headers:{"Content-Type":"application/json","x-goog-api-key":e},body:JSON.stringify({contents:[{role:"user",parts:[{text:"PING"}]}],generationConfig:{maxOutputTokens:5}})})).ok)return{ok:!0,message:`Chave validada com sucesso no ${a} (${n})!`,models:J}}catch{}}return{ok:!1,message:"Chave de API inv\xE1lida, sem cota ou sem permiss\xE3o para modelos Gemini."}}async function Mt(o,e,t,a,n){let i=["v1beta","v1"],r=new Error(`Falha ao consultar modelo ${o}`);for(let s of i){if(n.aborted)throw new Error("Opera\xE7\xE3o cancelada pelo usu\xE1rio.");let l=`https://generativelanguage.googleapis.com/${s}/models/${o}:generateContent?key=${encodeURIComponent(e)}`;try{let d=await fetch(l,{method:"POST",headers:{"Content-Type":"application/json","x-goog-api-key":e},body:t,signal:n,keepalive:a});if(!d.ok){let c=await d.text(),h=Ie(c,d.status);if(d.status===404&&s==="v1beta")continue;throw new Error(h)}let p=await d.json(),u=p.candidates?.[0];if(!u||!u.content?.parts?.[0]?.text)throw new Error("A IA n\xE3o retornou uma resposta estruturada v\xE1lida.");return{rawText:u.content.parts[0].text,data:p,usedModel:o}}catch(d){if(n.aborted)throw d;if(r=d,!r.message.includes("404"))break}}throw r}async function ze(o,e,t,a,n){if(n?.aborted)throw new Error("Opera\xE7\xE3o cancelada pelo usu\xE1rio.");let i=t.apiKey.trim().replace(/^["']|["']$/g,"");if(!i)throw new Error("Chave de API n\xE3o configurada.");let r=At(t.model);if(!me||me.length===0)try{a?.("Verificando modelos autorizados na sua chave de API...","info"),await ge(i)}catch(b){let x=b instanceof Error?b.message:String(b);if(x.includes("inv\xE1lida")||x.includes("n\xE3o autorizada"))throw new Error(x)}if(n?.aborted)throw new Error("Opera\xE7\xE3o cancelada pelo usu\xE1rio.");let s=Date.now(),l=se(o,e,t),d=[{text:l}];for(let b=0;b<e.length;b++){let x=e[b],w=x.associatedLabel||(x.alt?`Imagem: ${x.alt}`:`Imagem ${b+1}`);d.push({text:`[ANEXO VISUAL ${b+1} - V\xCDNCULO: ${w}]:`}),d.push({inline_data:{mime_type:x.mediaType,data:x.base64}})}let p={temperature:0,maxOutputTokens:2500,response_mime_type:"application/json",response_schema:St},u=[r,...me?.map(b=>b.id)||[],"gemini-2.0-flash","gemini-1.5-flash","gemini-2.5-flash","gemini-2.0-flash-lite-preview-02-05","gemini-1.5-pro"],c=Array.from(new Set(u)).filter(b=>!He.has(b));c.length===0&&(He.clear(),c.push(...J.map(b=>b.id)));let h={system_instruction:{parts:[{text:nt}]},contents:[{role:"user",parts:d}],generationConfig:p},g=JSON.stringify(h),f=g.length<6e4,y=c.slice(0,3);if(y.length>1){a?.(`Velocidade M\xE1xima: consultando APIs em paralelo (${y.join(", ")})...`,"info");let b=y.map(()=>new AbortController),x=T=>{b.forEach((C,A)=>{if(A!==T)try{C.abort(new Error("Cancelado: outro modelo respondeu mais r\xE1pido."))}catch{C.abort()}})},w=()=>{b.forEach(T=>{try{T.abort(new Error("Opera\xE7\xE3o cancelada pelo usu\xE1rio."))}catch{T.abort()}})};if(n){if(n.aborted)throw new Error("Opera\xE7\xE3o cancelada pelo usu\xE1rio.");n.addEventListener("abort",w,{once:!0})}try{let T=y.map(async(A,S)=>{let P=b[S],z=setTimeout(()=>{try{P.abort(new Error(`Timeout de 15s na API Gemini (${A}).`))}catch{P.abort()}},15e3);try{let $=await Mt(A,i,g,f,P.signal);clearTimeout(z);let N=ke(at($.rawText));return N.usedModel=$.usedModel,N.durationMs=Date.now()-s,N.promptSent=l,N.tokensUsed=$.data.usageMetadata?.totalTokenCount,N.promptTokens=$.data.usageMetadata?.promptTokenCount,N.candidatesTokens=$.data.usageMetadata?.candidatesTokenCount,N.rawResponse=$.rawText,x(S),{plan:N,rawUsage:$.data.usageMetadata,usedModel:$.usedModel}}catch($){throw clearTimeout(z),$}}),C=await Promise.any(T);if(n?.removeEventListener("abort",w),C.usedModel!==r){a?.(`\u26A1 Velocidade m\xE1xima alcan\xE7ada com '${C.usedModel}' (${C.plan.durationMs}ms)!`,"info");try{t.model=C.usedModel}catch{}}else a?.(`\u26A1 Resposta mais r\xE1pida recebida em ${C.plan.durationMs}ms via '${C.usedModel}'!`,"info");return C}catch(T){if(n?.removeEventListener("abort",w),n?.aborted)throw new Error("Opera\xE7\xE3o cancelada pelo usu\xE1rio.");console.warn("[EasyQuiz Race] Corrida concorrente falhou ou esgotou pool inicial. Alternando para fallback sequencial...",T)}}let m=new Error("Nenhum modelo tentado.");for(let b=0;b<c.length;b++){if(n?.aborted)throw new Error("Opera\xE7\xE3o cancelada pelo usu\xE1rio.");let x=c[b],w=c[b+1];a?.(`Consultando Gemini (${x})...`,"info");let T=["v1beta","v1"];for(let S of T){if(n?.aborted)throw new Error("Opera\xE7\xE3o cancelada pelo usu\xE1rio.");let P=`https://generativelanguage.googleapis.com/${S}/models/${x}:generateContent?key=${encodeURIComponent(i)}`,z=new AbortController,$=()=>{try{z.abort(new Error("Opera\xE7\xE3o cancelada pelo usu\xE1rio."))}catch{z.abort()}};if(n){if(n.aborted)throw new Error("Opera\xE7\xE3o cancelada pelo usu\xE1rio.");n.addEventListener("abort",$,{once:!0})}let N=setTimeout(()=>{try{z.abort(new Error(`Timeout de 18s excedido na API Gemini (${x}). Servidor demorou a responder.`))}catch{z.abort()}},18e3);try{let R=await fetch(P,{method:"POST",headers:{"Content-Type":"application/json","x-goog-api-key":i},body:g,signal:z.signal,keepalive:f});if(clearTimeout(N),n?.removeEventListener("abort",$),!R.ok){let Je=await R.text();if(R.status===400&&p.thinkingConfig&&/thinking/i.test(Je)){delete p.thinkingConfig,h.generationConfig=p;continue}let yt=Ie(Je,R.status);if(R.status===404&&S==="v1beta")continue;throw new Error(yt)}let F=await R.json(),K=F.candidates?.[0];if(!K||!K.content?.parts?.[0]?.text)throw new Error("A IA n\xE3o retornou uma resposta estruturada v\xE1lida.");let Z=K.content.parts[0].text,V=ke(at(Z));if(V.usedModel=x,V.durationMs=Date.now()-s,V.promptSent=l,V.tokensUsed=F.usageMetadata?.totalTokenCount,V.promptTokens=F.usageMetadata?.promptTokenCount,V.candidatesTokens=F.usageMetadata?.candidatesTokenCount,V.rawResponse=Z,x!==r){a?.(`Resolvido com sucesso pelo fallback '${x}' (${S})!`,"info");try{t.model=x}catch{}}return{plan:V,rawUsage:F.usageMetadata,usedModel:x}}catch(R){if(clearTimeout(N),n?.removeEventListener("abort",$),n?.aborted)throw new Error("Opera\xE7\xE3o cancelada pelo usu\xE1rio.");if(R instanceof Error&&(R.name==="AbortError"||R.message.includes("aborted")||R.message.includes("Timeout"))?m=new Error(`Timeout de 18s excedido na API Gemini (${x}). Sem resposta imediata.`):m=R,m.message.includes("inv\xE1lida")||m.message.includes("n\xE3o autorizada"))throw m;if(m.message.includes("Timeout")||m.message.includes("503")||m.message.includes("429"))break}}if(n?.aborted)throw new Error("Opera\xE7\xE3o cancelada pelo usu\xE1rio.");let C=m.message.includes("429")||m.message.includes("cota");if(m.message.includes("404")&&He.add(x),w){let S=C?500:150,P=`Modelo '${x}' indispon\xEDvel (${m.message}). Alternando imediatamente para '${w}'...`;console.warn(`[EasyQuiz Fallback] ${P}`),a?.(P,"warning"),S>0&&await new Promise(z=>setTimeout(z,S))}else console.warn(`[EasyQuiz Fallback] Modelo '${x}' falhou: ${m.message}. Todos os modelos esgotados.`)}throw m}var kt=[/\bfetch\b/i,/\bXMLHttpRequest\b/i,/\bWebSocket\b/i,/\b(?:localStorage|sessionStorage|indexedDB)\b/i,/\b(?:eval|Function|AsyncFunction|GeneratorFunction)\b/i,/\bimport(?:Scripts)?\b/i,/\bnavigator\s*\.\s*credentials\b/i,/\b(?:cookie|location\s*=|history\s*\.)/i,/\bwindow\s*\[\s*['"](?:fetch|eval|Function|localStorage|sessionStorage)/i];function le(o){let e=o?.engine||"smart",t=new Set(["dom","framework","keyboard","drag"]);return o?.autoAdvance&&t.add("navigation"),e==="javascript"&&t.add("javascript"),{engine:e,capabilities:t,maxAttemptsPerAction:e==="command"?1:2,maxActionMs:e==="command"?1500:3e3,allowJavaScript:e==="javascript",allowNavigation:!!o?.autoAdvance}}function $e(o,e){if(o.t==="js"&&!e.allowJavaScript)throw new Error("A\xE7\xE3o JavaScript bloqueada pela engine atual. Use o motor JavaScript explicitamente.");if(o.t==="adv"&&!e.allowNavigation)throw new Error("Avan\xE7o autom\xE1tico bloqueado pela pol\xEDtica atual.")}function st(o){if(!o.trim())throw new Error("JavaScript recusado: c\xF3digo vazio.");if(o.length>8e3)throw new Error("JavaScript recusado: c\xF3digo acima do limite operacional.");if(kt.find(t=>t.test(o)))throw new Error("JavaScript recusado: acesso externo, persist\xEAncia ou avalia\xE7\xE3o din\xE2mica n\xE3o permitidos.");if(!/^\s*(?:\/\/[^\n]*\n|\/\*[\s\S]*?\*\/|[\s\S])*\$eq\./.test(o)&&!o.includes("$eq."))throw new Error("JavaScript recusado: use somente a API declarativa $eq.")}var ee=['input:not([type="hidden"])',"textarea","select","button","a","label",'[role="button"]','[role="link"]','[role="radio"]','[role="checkbox"]','[role="option"]','[role="treeitem"]','[role="menuitemcheckbox"]','[role="menuitemradio"]','[contenteditable="true"]','[draggable="true"]',"[aria-grabbed]","[aria-dropeffect]","[data-widget-type]",".perseus-drag-item",".sortable-item",'[data-testid*="drag" i]','[data-testid*="card" i]','[data-testid*="option" i]','[data-testid*="choice" i]','[data-testid*="category" i]',"[data-choice]","[data-option]","[data-answer]","[data-value]",".quiz-option",".option-card",".choice-card",'[class*="option-card" i]','[class*="choice-card" i]','[class*="option-item" i]','[class*="choice-item" i]','[class*="answer-item" i]','[class*="alternative" i]','li[class*="choice" i]','li[class*="option" i]','li[class*="answer" i]','[data-role="dropzone"]',"[data-category]"].join(","),fe=/(verificar|checar|check|conferir|validar|próxim[oa]|next|continuar|continue|avançar|prosseguir|enviar|submit|concluir|finalizar|terminar|começar|iniciar|start|vamos lá|próxima tarefa|next task|próxima pergunta|next question|marcar como concluíd[oa]|mostrar resumo|entendi|compreendi|ok|leitura concluída|seguir|ir para o exercício|fazer o teste|próximo artigo|ir para a aula)/i,Ht=0;function Pe(o){try{let e=o.closest('[hidden], [style*="display: none"], [style*="display:none"], [aria-hidden="true"]');if(e&&!te(e))return!1}catch{}try{let e=window.getComputedStyle?window.getComputedStyle(o):o.style;if(e&&(e.display==="none"||e.visibility==="hidden"))return!1}catch{}try{if(typeof o.getBoundingClientRect=="function"){let e=o.getBoundingClientRect();if(e.width>0||e.height>0)return!0}}catch{}return(o.textContent||"").trim().length>0}function H(o){try{if(typeof CSS<"u"&&typeof CSS.escape=="function")return CSS.escape(o)}catch{}return String(o).replace(/["\\]/g,"\\$&")}function L(o){let e=o;if(!e||typeof e.isConnected=="boolean"&&!e.isConnected||te(e))return!1;let t=e.tagName?.toLowerCase();if(["input","select","textarea","button"].includes(t)){let a=e.type?.toLowerCase();if(a==="checkbox"||a==="radio"){if(e.id)try{let i=e.ownerDocument?.querySelector(`label[for="${H(e.id)}"]`);if(i&&Pe(i))return!0}catch{}let n=e.closest('label, .option-card, .quiz-option, .choice, .answer, [role="radio"], [role="checkbox"], [class*="option" i], [class*="choice" i], [class*="item" i], li, tr');if(n&&n!==e&&Pe(n))return!0}try{if(!e.closest('[hidden], [style*="display: none"], [style*="display:none"], [aria-hidden="true"]')){let i=window.getComputedStyle?window.getComputedStyle(e):e.style;if(!i||i.display!=="none"&&i.visibility!=="hidden"){if(typeof e.getBoundingClientRect=="function"){let r=e.getBoundingClientRect();if(r.width>0||r.height>0)return!0}return!0}}}catch{}}return Pe(e)}function It(o){if(o==null)return"";if(typeof o=="string")return o;if(typeof o=="number"||typeof o=="boolean")return String(o);if(o instanceof Node)return o.textContent||"";try{if(typeof o?.toString=="function"){let e=o.toString();if(typeof e=="string")return e}}catch{}return""}function M(o,e=500){return It(o).replace(/\s+/g," ").trim().slice(0,e)}function zt(o){let e=o.dataset.easyquizId;if(e)return e;let t=`eq-${Date.now().toString(36)}-${(Ht+=1).toString(36)}`;return o.dataset.easyquizId=t,t}function te(o){return o?!!(o.closest('#easyquiz-shadow-root, .eq-sidebar, .eq-launcher, [data-easyquiz-ignore="true"], .btn-inject-eq, #btn-inject-script')||o.getAttribute?.("data-easyquiz-ignore")==="true"):!1}var ce=/(leaderboard|scoreboard|placar|ranking|trophy|pause|pausar|mute|mutar|audio|sound|som|música|music|configuraç|settings|theme|ajuda|help|report|denunciar|feedback|power-?up|streak|coins|fullscreen|full-screen|(?:audio|sound|som|media)[-_ ]*volume|volume[-_ ]*(?:slider|control|level|btn|button|icon|mute)|vol-slider)/i;function I(o){if(!o||typeof o.getAttribute!="function"||typeof Element<"u"&&!(o instanceof Element))return!1;if(te(o))return!0;let e=o.tagName?.toLowerCase();if(["select","textarea"].includes(e)||e==="input"&&!["button","submit","reset"].includes((o.type||"").toLowerCase()))return!1;let a=o.closest?.('button, a, [role="button"], [class*="leaderboard" i], [data-testid*="leaderboard" i], [class*="scoreboard" i], [class*="trophy" i]')||o,n=String(a.getAttribute?.("data-testid")||a.getAttribute?.("data-test-id")||a.getAttribute?.("id")||""),i=String(a.getAttribute?.("aria-label")||""),r=String(a.getAttribute?.("title")||""),s=typeof a.className=="string"?a.className:typeof a.className?.baseVal=="string"?a.className.baseVal:"",l=M(a.textContent,60);return!!(ce.test(n)||ce.test(i)||ce.test(r)||ce.test(s)||l.length>0&&l.length<=25&&ce.test(l))}function j(o){if(!o||typeof o.getAttribute!="function"||typeof Element<"u"&&!(o instanceof Element)||te(o)||I(o)||o.closest?.('.option-card, .choice-card, .quiz-option, [class*="option-card" i], [class*="choice-card" i], [class*="option-item" i], [class*="choice-item" i], [class*="answer-item" i], [data-testid*="option" i], [data-testid*="choice" i], [data-choice], [data-option], [data-answer], [role="radio"], [role="checkbox"], [role="option"]')||o.closest?.("header, nav, aside"))return!1;let e=typeof HTMLInputElement<"u"&&o instanceof HTMLInputElement||typeof HTMLButtonElement<"u"&&o instanceof HTMLButtonElement?o.value:"",t=M(o.getAttribute?.("aria-label")||o.textContent||o.getAttribute?.("value")||e),a=o.type,n=t.replace(/[\d\(\)\[\]→\>\•\-\/\\]+/g," ").trim(),i=String(o.getAttribute?.("data-testid")||o.getAttribute?.("data-test-id")||o.getAttribute?.("id")||o.getAttribute?.("href")||"").toLowerCase();return fe.test(n)||fe.test(t)||a==="submit"||i.includes("next")||i.includes("check")||i.includes("continue")||i.includes("proximo")||i.includes("forward")||!1}function Re(o){let e=o.closest("tr");if(e){let l=e.querySelector("th, td:first-child"),d=l&&l!==o.closest("td")?M(l.textContent,100):"",p=M(o.closest("label, td")?.textContent||"",50);if(d&&p)return`${d}: ${p}`}let t=o.closest('.dropdown-row, [class*="dropdown-row" i], [class*="select-row" i]');if(t){let l=t.querySelector('.dropdown-label, [class*="label" i]'),d=l&&l!==o?M(l.textContent,150):"";if(d)return d}let a=o.getAttribute("aria-label");if(a)return M(a);let n=o.getAttribute("aria-labelledby");if(n){let l=n.split(/\s+/).map(d=>document.getElementById(d)?.textContent).filter(Boolean).join(" ");if(l.trim())return M(l)}if("labels"in o&&o.labels){let l=Array.from(o.labels??[]).map(d=>d.textContent).join(" ");if(l.trim())return M(l)}let i=o.closest('.docssharedWizToggleLabeledContainer, [role="listitem"], .answer, label, .quiz-option, .form-check, .option-card');if(i&&i!==o){let l=M(i.textContent);if(l)return l}let r=o instanceof HTMLInputElement||o instanceof HTMLButtonElement?o.value:"",s=o.getAttribute("placeholder")||o.getAttribute("title")||o.textContent||r||"";return M(s)}function Ne(o,e){let a=typeof HTMLSelectElement<"u"&&o instanceof HTMLSelectElement||o.tagName.toLowerCase()==="select"?o:null,n=o;o.dataset.easyquizRole=e;let i=o.tagName.toLowerCase(),r=["input","textarea","select","button"].includes(i)?i:"other",s=o.getAttribute("role")||"",l=(o.getAttribute("data-testid")||o.getAttribute("data-test-id")||"").toLowerCase(),d=(o.className&&typeof o.className=="string"?o.className:"").toLowerCase(),p=o.getAttribute("draggable")==="true"||o.classList.contains("perseus-drag-item")||o.classList.contains("sortable-item")||!!o.getAttribute("aria-grabbed")||/drag|card|option|item/i.test(l)||/drag|card-item|sortable/i.test(d),u=o.getAttribute("data-role")==="dropzone"||o.classList.contains("category-container")||o.hasAttribute("data-category")||!!o.getAttribute("aria-dropeffect")||/drop|category|bucket/i.test(l)||/dropzone|category-box|bucket|target-zone/i.test(d),h=M((p?"draggable":u?"dropzone":"")||n.type||s||r,40),g="";if(n.type==="checkbox"||n.type==="radio"||s==="radio"||s==="checkbox")g=n.checked||o.getAttribute("aria-checked")==="true"?"checked":"unchecked";else if(r==="button"||i==="a"||e==="navigation"||j(o))g="";else{let w=typeof o.value=="string"||typeof o.value=="number"?o.value:"";g=M(w||o.getAttribute("data-category")||"",2e3)}let f=[];if(a&&a.options)for(let w of Array.from(a.options).slice(0,80))f.push({value:M(w.value),label:M(w.textContent)});else if(s==="combobox"||s==="listbox"||d.includes("select")||d.includes("dropdown")){let w=o.getAttribute("aria-controls")||o.getAttribute("aria-owns"),T=w?document.getElementById(w):o;if(T){let C=T.querySelectorAll('[role="option"], li, .dropdown-item, .option');for(let A of Array.from(C).slice(0,80)){let S=M(A.textContent);S&&f.push({value:A.getAttribute("data-value")||A.getAttribute("value")||S,label:S})}}}let y=!!(n.required||o.getAttribute("aria-required")==="true"),m=!!(n.disabled||o.getAttribute("aria-disabled")==="true"),b=zt(o);return{id:o.id||b,tag:r,type:h,label:Re(o),name:M(n.name||o.getAttribute("name")||"",180),value:g,options:f,required:y,disabled:m,role:e}}var rt=['[data-test-id*="exercise" i]','[data-testid*="exercise" i]',".perseus-renderer",".framework-perseus",".Qr7Oae",".que",".question-holder",".quiz-question",".question_holder",".display_question",'[data-functional-selector*="question"]',".question-container","[data-question-id]",'[data-testid*="question" i]','[class*="question-container" i]','[class*="question" i]','[class*="pergunta" i]',"article","form","section","main"].join(",");function lt(o){if(!L(o))return-1/0;let e=o.getBoundingClientRect(),t=Array.from(o.querySelectorAll(ee)).filter(L),a=M(o.innerText||o.textContent||"",4e3).length;if(a<10||!t.length&&a<60)return-1/0;let n=Math.max(1,window.innerWidth*window.innerHeight),i=Math.max(1,e.width*e.height),r=Math.min(1,i/n),s=e.top+e.height/2,l=Math.abs(s-window.innerHeight/2)/Math.max(1,window.innerHeight),d=a>40?35:0,p=e.top>=0&&e.bottom<=window.innerHeight?25:0;return t.length*15+Math.min(60,a/20)+d+p-r*20-l*10}function be(o){let e=o;if(e.matches?.('article, [data-test-id*="exercise" i], [data-testid*="exercise" i], .perseus-renderer, .framework-perseus, [class*="question-container" i], .que')&&e.tagName.toLowerCase()!=="main"&&e.tagName.toLowerCase()!=="body")return e;for(;e.parentElement&&e.parentElement!==document.body&&e.parentElement!==document.documentElement;){let t=e.parentElement,a=t.tagName.toLowerCase();if(["header","footer","nav","aside"].includes(a))break;if(t.matches?.('article, [data-test-id*="exercise" i], [data-testid*="exercise" i], .perseus-renderer, .framework-perseus, [class*="question-container" i], .que')&&a!=="main"&&a!=="body"){e=t;break}let n=M(e.innerText||e.textContent||"",1e4),i=M(t.innerText||t.textContent||"",1e4),r=e.querySelectorAll(ee).length,s=t.querySelectorAll(ee).length;if(n.length<150&&i.length>n.length&&s<=r+4&&a!=="main"&&a!=="body"){e=t;continue}break}return e}function ct(o){let e=o,t=e.closest('main, [role="main"], article, form, [data-test-id*="exercise" i], [data-testid*="exercise" i], .framework-perseus, section');if(t&&t!==document.body&&L(t))return t;let a=0;for(;e.parentElement&&e.parentElement!==document.body&&a<3;)e=e.parentElement,a++;return e||document.body}function O(){let o=document.activeElement;if(o&&o!==document.body){let i=o.closest(rt);if(i&&lt(i)>0)return be(i)}let t=Array.from(document.querySelectorAll(rt)).map(i=>({element:i,score:lt(i)})).filter(i=>Number.isFinite(i.score)).sort((i,r)=>r.score-i.score),a=t.find(i=>{let r=i.element.tagName.toLowerCase();return r!=="main"&&r!=="body"&&i.score>0});if(a)return be(a.element);if(t.length>0&&t[0].score>0)return be(t[0].element);let n=document.querySelector('form, main, [role="main"]');return n&&L(n)?n:document.body}function dt(o){let e=o.cloneNode(!0);e.querySelectorAll("script, style, iframe, object, embed, svg, canvas, noscript, audio, video").forEach(a=>a.remove());let t=["type","name","value","role","aria-label","aria-labelledby","aria-checked","aria-required","required","disabled","data-easyquiz-id","draggable","class","id","data-widget-type","data-role","data-category","data-testid"];return e.querySelectorAll("*").forEach(a=>{for(let n of Array.from(a.attributes))t.includes(n.name)||a.removeAttribute(n.name)}),e.outerHTML.replace(/\s+/g," ").slice(0,2e4)}function ve(o){let e=Array.from(o.querySelectorAll(ee)),t=new Set,a=[];for(let n of e){if(!L(n)||j(n)||I(n))continue;let i=n.tagName.toLowerCase();["input","textarea","select"].includes(i)&&(t.add(n),a.push(n))}for(let n of e){if(!L(n)||j(n)||I(n))continue;let i=n.tagName.toLowerCase();if(["input","textarea","select"].includes(i))continue;let r=n.querySelector("input, textarea, select");if(!(r&&t.has(r))){if(n.hasAttribute("for")){let s=n.getAttribute("for"),l=s?n.ownerDocument.getElementById(s):null;if(l&&t.has(l))continue}if(i==="a"){let s=n.getAttribute("role");if(!(s==="button"||s==="radio"||s==="checkbox"||s==="option"||n.closest('[class*="choice" i], [class*="option" i], [class*="answer" i], [data-testid*="option" i]')))continue}a.push(n)}}return a.slice(0,100).map(n=>Ne(n,"answer"))}function Oe(o){let e=[o,o.parentElement,o.parentElement?.parentElement,document.body].filter(Boolean),t=new Set,a=[];for(let n of e)for(let i of Array.from(n.querySelectorAll(ee)))if(!(t.has(i)||!L(i)||!j(i)||I(i))&&(t.add(i),a.push(Ne(i,"navigation")),a.length>=10))return a;return a}function de(o=!1){let e=O();e=be(e),o&&(e=ct(e));let t=ve(e),a=Oe(e);if(t.length===0){let s=ve(document.body);s.length>0&&(e=ct(e),t=ve(e),t.length===0&&(t=s,e=document.querySelector('main, article, form, [role="main"]')||document.body))}a.length===0&&(a=Oe(document.body));let n=e.innerText&&e.innerText.trim().length>0?e.innerText:e.textContent||"",i=M(n,16e3),r=[...t,...a].slice(0,120);return!i||r.length===0&&i.length<30?M(document.body.innerText||document.body.textContent||"",16e3).length>=30?oe():null:{sourceUrl:window.location.href.slice(0,2e3),pageTitle:document.title.slice(0,500)||"P\xE1gina de Quest\xE3o",questionText:i,htmlSnippet:dt(e),controls:r,scope:e}}function oe(){let o=document.body.innerText||document.body.textContent||document.documentElement.textContent||"",e=M(o,16e3),t=ve(document.body),a=Oe(document.body),n=[...t,...a].slice(0,120),i=document.querySelector('main, article, form, [role="main"], [data-test-id*="content" i], [class*="content" i]')||document.body;return{sourceUrl:window.location.href.slice(0,2e3),pageTitle:document.title.slice(0,500)||"P\xE1gina de Quest\xE3o",questionText:e,htmlSnippet:dt(i).slice(0,15e3),controls:n,scope:i}}function ut(o){let e=o.controls.map(t=>`${t.role}:${t.id}:${t.type}:${t.value}:${t.disabled}`).join("|");return[window.location.href,o.pageTitle,o.questionText.slice(0,500),e].join("::")}function k(o){return o?!!(o.closest('#easyquiz-shadow-root, .eq-sidebar, .eq-launcher, [data-easyquiz-ignore="true"], .btn-inject-eq, #btn-inject-script')||o.getAttribute?.("data-easyquiz-ignore")==="true"):!1}function v(o){return o==null?"":(typeof o=="string"?o:String(o)).replace(/^(\([0-9a-zA-Z]{1,2}\)|[0-9]{1,3}|[a-zA-Z])[\.\)\-\:]\s+/,"").replace(/[\.\u2026]{2,}/g," ").replace(/['"“”«»]/g,"").replace(/\s+/g," ").trim()}function B(o){if(!o||o instanceof HTMLInputElement||o instanceof HTMLSelectElement||o instanceof HTMLTextAreaElement||o.getAttribute("draggable")==="true"||o.classList.contains("dnd-card")||o.hasAttribute("data-category")||o.hasAttribute("data-dropzone"))return o;if(o.hasAttribute("for")){let a=o.getAttribute("for");if(a){let n=o.ownerDocument.getElementById(a);if(n)return n}}let e=o.closest('label, .option-card, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, tr, li, .dnd-card, [class*="option-card" i], [class*="choice-card" i], .dropdown-row, [class*="dropdown" i], [class*="select-row" i]');if(e&&!["article","section","main","form","body"].includes(e.tagName.toLowerCase())){let a=e.getAttribute("for"),i=(a?e.ownerDocument.getElementById(a):null)||e.querySelector('input:not([type="hidden"]), select, textarea');return i||e}let t=o.closest('button, a, [role="button"], [draggable="true"]');if(t)return t;if(["body","html","main","section","article","form"].includes(o.tagName.toLowerCase())){let a=o.querySelector('button, [role="button"], a, input:not([type="hidden"]), select, textarea, [role="radio"], [role="checkbox"], .option-card, label');if(a)return B(a)}return o}function pt(o){let e=o;if(!e||!document.contains(e))try{e=O()}catch{}e=e||document.body;let t=Array.from(e.querySelectorAll("tr")).filter(i=>L(i)&&i.querySelector('input[type="radio"], input[type="checkbox"]'));if(t.length>1)return t;let a=Array.from(e.querySelectorAll('input[type="checkbox"], input[type="radio"], [role="checkbox"], [role="radio"]')).filter(i=>L(i)&&!k(i));return a.length>0?a:Array.from(e.querySelectorAll('.option-card, [role="option"], [class*="choice-card" i], [class*="option-card" i], li[class*="choice" i], li[class*="option" i]')).filter(i=>L(i)&&!k(i)).filter(i=>!i.parentElement?.closest('.option-card, [role="option"], [class*="choice-card" i], [class*="option-card" i]'))}function q(o,e,t=!1){if(o==null)return null;let n=(typeof o=="string"?o:String(o)).trim().replace(/^["'“”«»]+|["'“”«»]+$/g,"");if(!n)return null;let i=H(n),r=document.querySelector(`[data-easyquiz-id="${i}"]`);if(r&&!k(r)&&L(r))return B(r);try{let c=document.getElementById(n);if(c&&!k(c)&&L(c))return c.hasAttribute("data-category")||c.hasAttribute("data-dropzone")||c.classList.contains("dnd-zone")?c:B(c)}catch{}let s=n.match(/^(?:item|opção|opcao|afirmação|afirmacao|alternativa|linha|afirmativa|questão|questao|campo|blank|lacuna|input|resposta)?\s*#?_?([0-9]+)$/i);if(s){let c=parseInt(s[1],10);if(t){let g=document.body;try{g=O()||document.body}catch{}let f=Array.from(g.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, select, [contenteditable="true"]')).filter(y=>L(y)&&!k(y));if(c>=1&&c-1<f.length)return f[c-1];if(c===0&&f.length>0)return f[0]}let h=c-1;if(h>=0){let g=pt();if(h<g.length){let m=g[h];if(m.tagName.toLowerCase()==="tr"){if(e){let x=m.querySelector(`input[value="${H(e)}" i], [data-value="${H(e)}" i]`);if(x)return x}let b=m.querySelector("input");if(b)return b}return B(m)}let f=document.body;try{f=O()||document.body}catch{}let y=Array.from(f.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, select, [contenteditable="true"]')).filter(m=>L(m)&&!k(m));if(h<y.length)return y[h]}}let l=n.match(/^(?:item|opção|opcao|afirmação|afirmacao|alternativa|linha|afirmativa|questão|questao)?\s*#?([a-eA-E])$/i);if(l){let c=l[1].toUpperCase().charCodeAt(0)-65;if(c>=0){let h=pt();if(c<h.length){let g=h[c];if(g.tagName.toLowerCase()==="tr"){if(e){let y=g.querySelector(`input[value="${H(e)}" i], [data-value="${H(e)}" i]`);if(y)return y}let f=g.querySelector("input");if(f)return f}return B(g)}}}if(/^[a-zA-Z0-9_-]{1,10}$/.test(n)){let h=Array.from(document.querySelectorAll(`[data-category="${i}" i], [data-dropzone="${i}" i], [data-role="dropzone"][data-category="${i}" i]`)).find(m=>L(m)&&!k(m));if(h)return h;let f=Array.from(document.querySelectorAll(`input[value="${i}" i], [data-value="${i}" i], input[id="${i}" i], input[placeholder="${i}" i], textarea[placeholder="${i}" i], [title="${i}" i]`)).find(m=>L(m)&&!k(m));if(f)return B(f);let y=Array.from(document.querySelectorAll('.option-badge, [class*="badge" i], [class*="letter" i], .option-card span, label span')).find(m=>{if(!L(m)||k(m))return!1;let b=v(m.textContent).toLowerCase();return b===n.toLowerCase()||b===n.toLowerCase()+")"});if(y)return B(y)}try{let h=Array.from(document.querySelectorAll(`[name="${i}"], [value="${i}"], [placeholder="${i}" i], [title="${i}" i], [data-category="${i}" i], [data-dropzone="${i}" i], [data-testid="${i}" i], [data-test-id="${i}" i], [aria-label="${i}" i]`)).find(g=>L(g)&&!k(g));if(h)return h.hasAttribute("data-category")||h.hasAttribute("data-dropzone")||h.classList.contains("dnd-zone")?h:B(h)}catch{}if(/^[.#\[]|\s|[>+~:]/.test(n))try{let h=Array.from(document.querySelectorAll(n)).find(g=>L(g)&&!k(g));if(h)return B(h)}catch{}try{let c=n.replace(/"/g,""),h=`//button[normalize-space(.)="${c}"] | //a[normalize-space(.)="${c}"] | //*[not(*) and normalize-space(.)="${c}"] | //*[@aria-label="${c}"] | //*[@data-category="${c}"] | //*[@data-testid="${c}"]`,g=document.evaluate(h,document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);for(let f=0;f<g.snapshotLength;f++){let y=g.snapshotItem(f);if(y&&L(y)&&!k(y)){if(["body","html"].includes(y.tagName.toLowerCase())){let b=y.querySelector('button, [role="button"], a, input, [role="radio"], [role="checkbox"], label');if(b&&L(b))return B(b)}return y.closest('[data-role="dropzone"], [class*="category" i], [class*="bucket" i], [class*="column" i], [class*="drop" i]')||B(y)}}}catch{}let p=v(n).toLowerCase(),u=Array.from(document.querySelectorAll('button, a, div, span, li, p, label, input, textarea, select, [draggable="true"], [data-testid], [class*="option" i], [class*="card" i], [class*="item" i], [class*="choice" i], [class*="category" i], [class*="bucket" i]'));for(let c of u){if(!L(c)||k(c)||c.closest("header, nav, .stepper, .step-item, .progress-bar-container")||I(c)||!!(c.matches('article, section, form, main, [class*="container" i], [class*="grid" i], .dnd-pool, .dnd-zones')||c.querySelector('label, [role="radio"], [role="checkbox"], .dnd-card, [draggable="true"], .option-card, tr'))&&!c.matches(".dnd-zone, [data-category], [data-dropzone]"))continue;let g=v(c.textContent).toLowerCase(),f=v(c.getAttribute("aria-label")||"").toLowerCase(),y=v(c.getAttribute("placeholder")||"").toLowerCase(),m=v(c.getAttribute("title")||"").toLowerCase(),b=v(c.getAttribute("name")||"").toLowerCase(),x=v(c.getAttribute("data-category")||"").toLowerCase(),w=c instanceof HTMLInputElement||c instanceof HTMLButtonElement?c.value:"",T=v(w).toLowerCase(),C=g.startsWith(p+")")||g.startsWith(p+".")||g.startsWith(p+" -")||g.startsWith(p+":");if(g===p||f===p||y===p||m===p||b===p||x&&x===p||T&&T===p||C)return c.closest('[data-role="dropzone"], [class*="category" i], [class*="bucket" i], [class*="column" i], [class*="drop" i]')||B(c)}if(p.length>=3)for(let c of u){if(!L(c)||k(c)||c.closest("header, nav, .stepper, .step-item, .progress-bar-container")||I(c)||!!(c.matches('article, section, form, main, [class*="container" i], [class*="grid" i], .dnd-pool, .dnd-zones')||c.querySelector('label, [role="radio"], [role="checkbox"], .dnd-card, [draggable="true"], .option-card, tr'))&&!c.matches(".dnd-zone, [data-category], [data-dropzone]"))continue;let g=v(c.textContent).toLowerCase(),f=v(c.getAttribute("aria-label")||"").toLowerCase(),y=v(c.getAttribute("placeholder")||"").toLowerCase(),m=v(c.getAttribute("title")||"").toLowerCase(),b=v(c.getAttribute("name")||"").toLowerCase();if(g.includes(p)||f.includes(p)||y.includes(p)||m.includes(p)||b.includes(p)){if(Array.from(c.children).some(C=>{let A=v(C.textContent).toLowerCase();return A&&A.includes(p)}))continue;return c.closest('[data-role="dropzone"], [class*="category" i], [class*="bucket" i], [class*="column" i], [class*="drop" i]')||B(c)}let x=p.split(/\s+/).filter(Boolean);if(x.length>=3){let w=x.slice(0,Math.min(5,x.length)).join(" ");if(g.includes(w)||f.includes(w)||y.includes(w))return B(c)}}return null}function mt(o,e){for(let t of e)o.dispatchEvent(new Event(t,{bubbles:!0,composed:!0}))}function _(o,e){if(!o)return;let t=o instanceof HTMLInputElement&&["checkbox","radio"].includes(o.type)?o:o.querySelector('input[type="checkbox"], input[type="radio"]')||(o.hasAttribute("for")?o.ownerDocument.getElementById(o.getAttribute("for")):null);if(t&&o!==t){if(t.type==="checkbox"){G(t,!0);return}if(t.type==="radio"){G(t,!0);return}}try{o.scrollIntoView({block:"center",inline:"center",behavior:"instant"})}catch{}try{o.focus?.()}catch{}if(typeof HTMLButtonElement<"u"&&o instanceof HTMLButtonElement||typeof HTMLAnchorElement<"u"&&o instanceof HTMLAnchorElement||o.tagName?.toLowerCase()==="a"||o.tagName?.toLowerCase()==="button"||typeof HTMLInputElement<"u"&&o instanceof HTMLInputElement&&!["checkbox","radio"].includes(o.type)){try{o.click()}catch{}return}let n=o.getBoundingClientRect(),i=e?e[0]:Math.round(n.left+Math.max(1,n.width/2)),r=e?e[1]:Math.round(n.top+Math.max(1,n.height/2)),s={bubbles:!0,cancelable:!0,composed:!0,view:window,clientX:i,clientY:r};try{o.dispatchEvent(new PointerEvent("pointerdown",{...s,button:0,buttons:1}))}catch{}try{o.dispatchEvent(new MouseEvent("mousedown",{...s,button:0,buttons:1}))}catch{}try{o.dispatchEvent(new PointerEvent("pointerup",{...s,button:0,buttons:0}))}catch{}try{o.dispatchEvent(new MouseEvent("mouseup",{...s,button:0,buttons:0}))}catch{}try{o.dispatchEvent(new MouseEvent("click",{...s,button:0,buttons:0}))}catch{}try{o.click()}catch{}}function ye(o,e){let t=o;if(t.hasAttribute("for")){let d=t.getAttribute("for"),p=t.ownerDocument.getElementById(d);p&&(t=p)}if(typeof HTMLSelectElement<"u"&&t instanceof HTMLSelectElement||t.tagName?.toLowerCase()==="select"||t.getAttribute("role")==="combobox"||t.getAttribute("role")==="listbox"||t.matches?.('[role="combobox"], [role="listbox"], [class*="select" i], [class*="dropdown" i]')){xe(t,[e]);return}let n=t.querySelector('select, [role="combobox"], [role="listbox"]');if(n){xe(n,[e]);return}if(!(t instanceof HTMLInputElement)&&!(t instanceof HTMLTextAreaElement)&&!(t instanceof HTMLSelectElement)&&!t.isContentEditable){let d=t.querySelector('input:not([type="hidden"]), textarea, select, [contenteditable="true"]');if(d)t=d;else{let u=t.closest('.form-group, .field, [class*="input" i], [class*="control" i], label, tr, td, li, p, div')?.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, select, [contenteditable="true"]');if(u)t=u;else{let c=t.nextElementSibling;for(;c;){if(c instanceof HTMLInputElement&&!["hidden","button","submit","checkbox","radio"].includes(c.type)||c instanceof HTMLTextAreaElement||c instanceof HTMLElement&&c.isContentEditable){t=c;break}let h=c.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(h){t=h;break}c=c.nextElementSibling}}}}if(t instanceof HTMLButtonElement||t.tagName.toLowerCase()==="a"||t.getAttribute("role")==="button"||t instanceof HTMLInputElement&&["button","submit","reset","image"].includes(t.type)){let d=t.parentElement?.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(d)t=d;else{let p=document.body;try{p=O()||document.body}catch{}let u=p.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(u)t=u;else{console.warn("[EasyQuiz] setNativeValue: Nenhum campo de texto encontrado para receber o valor.");return}}}if(!(t instanceof HTMLInputElement)&&!(t instanceof HTMLTextAreaElement)&&!(t instanceof HTMLSelectElement)&&!t.isContentEditable){let d=document.body;try{d=O()||document.body}catch{}let p=d.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(p)t=p;else{console.warn("[EasyQuiz] setNativeValue: Nenhum campo de texto encontrado para receber o valor.");return}}if(t instanceof HTMLInputElement&&["checkbox","radio"].includes(t.type)){let d=["true","1","checked","yes","sim"].includes(e.toLowerCase())||e===t.value;G(t,d);return}let r=String(e??""),s=r;if(t instanceof HTMLInputElement&&t.type==="number"){let d=r.replace(",",".").replace(/[^0-9.-]/g,"");d&&!isNaN(Number(d))&&(s=d)}try{t.scrollIntoView?.({block:"center",inline:"center",behavior:"instant"}),t.focus?.()}catch{}let l=!1;try{if(t instanceof HTMLInputElement||t instanceof HTMLTextAreaElement){if(t.type!=="number"){try{t.select?.()}catch{}l=document.execCommand?.("insertText",!1,s)||!1}}else if(t.isContentEditable){try{document.execCommand?.("selectAll",!1,void 0)}catch{}l=document.execCommand?.("insertText",!1,s)||!1}}catch{}if(t instanceof HTMLInputElement||t instanceof HTMLTextAreaElement){try{let u=t._valueTracker;u&&u.setValue(s===""?" ":"")}catch{}let d=t instanceof HTMLTextAreaElement?HTMLTextAreaElement.prototype:HTMLInputElement.prototype,p=Object.getOwnPropertyDescriptor(d,"value")?.set;p?p.call(t,s):t.value=s;try{t.dispatchEvent(new KeyboardEvent("keydown",{bubbles:!0,cancelable:!0,key:s.slice(-1)||"a"}))}catch{}try{t.dispatchEvent(new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,composed:!0,data:s,inputType:"insertText"}))}catch{}try{t.dispatchEvent(new InputEvent("input",{bubbles:!0,cancelable:!0,composed:!0,data:s,inputType:"insertText"}))}catch{t.dispatchEvent(new Event("input",{bubbles:!0,cancelable:!0,composed:!0}))}try{t.dispatchEvent(new KeyboardEvent("keyup",{bubbles:!0,cancelable:!0,key:s.slice(-1)||"a"}))}catch{}try{t.dispatchEvent(new Event("change",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}try{t.dispatchEvent(new FocusEvent("blur",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}if(t.value!==s&&!(t instanceof HTMLInputElement&&t.type==="number"&&Number(t.value)===Number(s))){t.value=s;try{p?.call(t,s)}catch{}}return}if(t.isContentEditable){if(t.textContent?.trim()!==s.trim()){t.textContent=s;try{t.innerText=s}catch{}}try{t.dispatchEvent(new InputEvent("input",{bubbles:!0,cancelable:!0,composed:!0,data:s,inputType:"insertText"}))}catch{t.dispatchEvent(new Event("input",{bubbles:!0,cancelable:!0,composed:!0}))}try{t.dispatchEvent(new Event("change",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}try{t.dispatchEvent(new FocusEvent("blur",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}return}try{"value"in t&&(t.value=s),t.dispatchEvent(new Event("input",{bubbles:!0,cancelable:!0,composed:!0})),t.dispatchEvent(new Event("change",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}}function Ee(o,e=""){if(o==null)return e;let t=typeof o=="string"?o:String(o);if(!t)return e;let a=/^(eq-|#|\$|\.|input_|mat-|choice_|radio_|chk_)/i.test(t),n=v(t),i=q(t)||q(n);if(!i)return a?e:n||e;let r=i.closest('label, .option-card, [class*="choice" i], [class*="option" i], .quiz-option, tr, td, li');if(r){let u=v(r.textContent);if(u&&u.length>0&&u.length<150)return u}if(i.id){let u=document.querySelector(`label[for="${H(i.id)}"]`);if(u){let c=v(u.textContent);if(c&&c.length>0&&c.length<150)return c}}let s=i.getAttribute("aria-label");if(s)return v(s);let l=i.getAttribute("placeholder");if(l)return v(l);let d=v(i.textContent);if(d&&d.length>0&&d.length<120)return d;let p=i instanceof HTMLInputElement||i instanceof HTMLButtonElement?i.value:"";return p?v(p):a?e:n||e}function G(o,e){let t=o.closest('.option-card, label, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, [class*="option" i], [class*="choice" i], li')||o,a=o instanceof HTMLInputElement&&["checkbox","radio"].includes(o.type)?o:t.querySelector('input[type="checkbox"], input[type="radio"]');if(!a&&t.hasAttribute("for")&&(a=t.ownerDocument.getElementById(t.getAttribute("for"))),t){let n=e?"true":"false";t.setAttribute("aria-checked",n),t.setAttribute("aria-selected",n),t.classList.toggle("selected",e),t.classList.toggle("active",e),t.classList.toggle("checked",e)}if(a){if(a.checked===e)return;try{a.focus?.(),a.click()}catch{}if(a.checked!==e){try{let n=a._valueTracker;n&&n.setValue(!e)}catch{}try{Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"checked")?.set?.call(a,e)}catch{}a.checked=e,mt(a,["input","change"])}}else{try{t.focus?.()}catch{}try{t.click()}catch{_(t)}}}function xe(o,e){let t=typeof HTMLSelectElement<"u"&&o instanceof HTMLSelectElement||o.tagName?.toLowerCase()==="select"?o:o.querySelector("select");if(t){let r=e.map(d=>v(d).toLowerCase()),s=!1,l=(d,p)=>{d.selected=!0,t.selectedIndex=p;try{t.value=d.value}catch{}try{Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype,"value")?.set?.call(t,d.value)}catch{}try{let u=t._valueTracker;u&&u.setValue(d.value)}catch{}s=!0};for(let d=0;d<t.options.length;d++){let p=t.options[d],u=p.value.toLowerCase(),c=v(p.textContent).toLowerCase();if(r.some(g=>g===u||g===c)){if(l(p,d),!t.multiple)break}else t.multiple||(p.selected=!1)}if(!s)for(let d of r){let p=d.match(/^(?:item|opção|opcao|alternativa|linha|escolha|campo)?\s*#?_?([0-9]+)$/i);if(p){let u=parseInt(p[1],10),h=t.options[0]?.value===""||t.options[0]?.disabled?u:u>=1?u-1:0;if(h>=0&&h<t.options.length&&(l(t.options[h],h),!t.multiple))break}}if(!s){for(let d of r)if(/^[a-z]$/i.test(d)){let p=d.toUpperCase().charCodeAt(0)-65,c=t.options[0]?.value===""||t.options[0]?.disabled?p+1:p;if(c>=0&&c<t.options.length&&(l(t.options[c],c),!t.multiple))break}}if(!s){let d=p=>p.normalize("NFD").replace(/[\u0300-\u036f]/g,"");for(let p=0;p<t.options.length;p++){let u=t.options[p],c=d(u.value.toLowerCase()),h=d(v(u.textContent).toLowerCase());if(r.some(f=>{let y=d(f);return c.includes(y)||h.includes(y)||y.length>2&&(y.includes(c)||y.includes(h))})&&(l(u,p),!t.multiple))break}}if(s){mt(t,["focus","input","change","blur"]);return}}let a=o.matches?.('[role="combobox"], [role="listbox"], [class*="select" i], [class*="dropdown" i]')?o:o.closest('[role="combobox"], [role="listbox"], [class*="select" i], [class*="dropdown" i]');a&&_(a);let n=e.map(r=>v(r).toLowerCase()),i=Array.from(document.querySelectorAll('[role="listbox"] [role="option"], [role="menu"] [role="menuitem"], .select-dropdown li, .dropdown-menu .dropdown-item, .ant-select-item-option, .MuiMenuItem-root, [class*="option-item"], li[data-value]')).filter(r=>L(r)&&!k(r));for(let r of n){let s=i.find(d=>{let p=v(d.textContent).toLowerCase(),u=v(d.getAttribute("data-value")||d.getAttribute("value")||"").toLowerCase();return p===r||u===r||p.includes(r)||r.length>2&&r.includes(p)});if(s){_(s);let d=s.querySelector('input[type="radio"], input[type="checkbox"]');d&&G(d,!0);return}let l=q(r);if(l){_(l);return}}}function $t(o,e){try{let t=new DataTransfer;try{t.setData("text/plain",o)}catch{}try{t.setData("text/html",e)}catch{}return t}catch{return null}}function Be(o){try{o.click()}catch{let e=o.ownerDocument.defaultView||window;o.dispatchEvent(new e.MouseEvent("click",{bubbles:!0,cancelable:!0,composed:!0,view:e}))}}function Q(o,e){let t=v(o).toLowerCase();if(!t)return null;let a=e==="source"?'.dnd-card, [draggable="true"]':'[data-dropzone], [data-category], [data-role="dropzone"]',n=Array.from(document.querySelectorAll(a)),i=e==="destination"?n.find(r=>[r.getAttribute("data-category"),r.getAttribute("data-dropzone")].some(s=>s?.trim().toLowerCase()===t)):null;return i&&L(i)&&!k(i)?i:n.find(r=>{if(!L(r)||k(r))return!1;let s=v(`${r.textContent||""} ${r.getAttribute("data-category")||""} ${r.getAttribute("data-dropzone")||""}`).toLowerCase();return s===t||s.includes(t)})||null}async function we(o,e,t=1){try{o.scrollIntoView({block:"center",inline:"center",behavior:"instant"})}catch{}let a=o.getBoundingClientRect(),n=e.getBoundingClientRect(),i=Math.round(a.left+Math.max(1,a.width/2)),r=Math.round(a.top+Math.max(1,a.height/2)),s=Math.round(n.left+Math.max(1,n.width/2)),l=Math.round(n.top+Math.max(1,n.height/2)),d=v(e.textContent).toLowerCase();if(d){let f=Array.from(o.querySelectorAll('button, [role="button"], input[type="radio"], input[type="checkbox"], option, .btn, [class*="tag" i]')).find(y=>{let m=v(y.textContent).toLowerCase(),b=y instanceof HTMLInputElement||y instanceof HTMLOptionElement?v(y.value).toLowerCase():"";return m&&(d.includes(m)||m.includes(d))||b&&(d.includes(b)||b.includes(d))});f&&(_(f),await new Promise(y=>setTimeout(y,120)))}Be(o),await new Promise(g=>setTimeout(g,140)),Be(e);let p=e.querySelector('[data-role="dropzone"], [class*="bucket" i], [class*="slot" i], [class*="drop" i], [class*="target" i], [class*="items" i], ul, ol');if(p&&p!==e&&Be(p),await new Promise(g=>setTimeout(g,100)),!e.contains(o)&&o.matches('.dnd-card, [draggable="true"]')&&e.matches('.dnd-zone, [data-dropzone], [data-role="dropzone"]')&&e.appendChild(o),e.contains(o)&&o.matches('.dnd-card, [draggable="true"]'))return;let u={bubbles:!0,cancelable:!0,composed:!0,view:window,clientX:i,clientY:r,screenX:i,screenY:r,button:0,buttons:1};try{o.dispatchEvent(new PointerEvent("pointerdown",{...u,isPrimary:!0,pointerId:1,pointerType:"mouse",pressure:.5}))}catch{}o.dispatchEvent(new MouseEvent("mousedown",u));let c=4;for(let g=1;g<=c;g++){let f=Math.round(i+(s-i)*(g/c)),y=Math.round(r+(l-r)*(g/c)),m={...u,clientX:f,clientY:y,screenX:f,screenY:y};try{o.dispatchEvent(new PointerEvent("pointermove",{...m,isPrimary:!0,pointerId:1,pointerType:"mouse",pressure:.5}))}catch{}document.dispatchEvent(new MouseEvent("mousemove",m))}let h={bubbles:!0,cancelable:!0,composed:!0,view:window,clientX:s,clientY:l,screenX:s,screenY:l,button:0,buttons:0};try{e.dispatchEvent(new PointerEvent("pointerup",{...h,isPrimary:!0,pointerId:1,pointerType:"mouse",pressure:0}))}catch{}e.dispatchEvent(new MouseEvent("mouseup",h)),e.dispatchEvent(new MouseEvent("click",h));try{let g=$t(M(o.textContent),o.outerHTML),f={...u},y={...h};g&&(f.dataTransfer=g,y.dataTransfer=g);let m=o.ownerDocument.defaultView?.DragEvent;if(!m)throw new Error("DragEvent n\xE3o dispon\xEDvel neste documento");o.dispatchEvent(new m("dragstart",f)),e.dispatchEvent(new m("dragenter",y)),e.dispatchEvent(new m("dragover",y)),e.dispatchEvent(new m("drop",y)),o.dispatchEvent(new m("dragend",f))}catch(g){console.warn("[EasyQuiz] DragEvent ignorado com seguran\xE7a:",g)}try{let g=new Touch({identifier:1,target:o,clientX:i,clientY:r}),f=new Touch({identifier:1,target:e,clientX:s,clientY:l});o.dispatchEvent(new TouchEvent("touchstart",{bubbles:!0,cancelable:!0,touches:[g]})),e.dispatchEvent(new TouchEvent("touchmove",{bubbles:!0,cancelable:!0,touches:[f]})),e.dispatchEvent(new TouchEvent("touchend",{bubbles:!0,cancelable:!0,touches:[]}))}catch{}if(t>=2&&!e.contains(o))try{o.focus?.(),o.dispatchEvent(new KeyboardEvent("keydown",{key:" ",code:"Space",bubbles:!0})),o.dispatchEvent(new KeyboardEvent("keyup",{key:" ",code:"Space",bubbles:!0})),await new Promise(g=>setTimeout(g,80)),e.focus?.(),e.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",bubbles:!0})),e.dispatchEvent(new KeyboardEvent("keyup",{key:"Enter",code:"Enter",bubbles:!0}))}catch{}}var gt={fill:(o,e)=>{let t=q(o);t?ye(t,e):console.warn(`$eq.fill: Elemento '${o}' n\xE3o encontrado`)},click:o=>{let e=q(o);e?!!(e.closest('.option-card, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, [class*="option" i], [class*="choice" i]')||e.querySelector('input[type="radio"], input[type="checkbox"]')||e instanceof HTMLInputElement&&["checkbox","radio"].includes(e.type))?G(e,!0):_(e):console.warn(`$eq.click: Elemento '${o}' n\xE3o encontrado`)},check:(o,e)=>{let t=q(o);t?G(t,e):console.warn(`$eq.check: Elemento '${o}' n\xE3o encontrado`)},find:(o,e)=>q(o,e),drag:(o,e)=>{let t=Q(o,"source")||q(o),a=Q(e,"destination")||q(e);t&&a?we(t,a):console.warn(`$eq.drag: Origem ou destino n\xE3o encontrado ('${o}' -> '${e}')`)},categorize:async(o,e)=>{let t=Q(o,"source")||q(o),a=Q(e,"destination")||q(e);if(!t||!a){console.warn(`$eq.categorize: Item ou categoria n\xE3o encontrados ('${o}' -> '${e}')`);return}await we(t,a)},execute:(o,e=!1,t=1)=>_e(o,e,t)};typeof window<"u"&&(window.$eq=gt);async function Pt(o,e=1,t=le()){if($e(o,t),o.t==="js"){let s=String(o.v||"");st(s);try{new Function("$eq","document","window",s)(gt,document,window)}catch(l){throw console.warn("[EasyQuiz JS Execution]",l),l}return}if(o.t==="drag"){let s=Q(o.from,"source")||q(o.from),l=Q(o.to,"destination")||q(o.to);!s&&o.from&&(s=q(v(o.from))),!l&&o.to&&(l=q(v(o.to))),s&&l?await we(s,l,e):console.warn(`[EasyQuiz] Drag: alvo n\xE3o encontrado ('${o.from}' -> '${o.to}')`);return}let a=o.id!==void 0&&o.id!==null?String(o.id):"";!a&&o.t==="val"&&(a=o.target??o.name??o.selector??"1");let n=o.v!==void 0?o.v:o.value!==void 0?o.value:o.val!==void 0?o.val:o.text,i=n!=null?String(n).trim():"",r=q(a,i,o.t==="val"||o.t==="sel");if(!r&&a&&(r=q(v(a),i,o.t==="val"||o.t==="sel")),r&&i){if(r instanceof HTMLInputElement&&r.type==="radio"&&r.name){if(v(r.value).toLowerCase()!==v(i).toLowerCase()){let s=document.querySelector(`input[type="radio"][name="${H(r.name)}"][value="${H(i)}" i]`);if(s)r=s;else{let d=Array.from(document.querySelectorAll(`input[type="radio"][name="${H(r.name)}"]`)).find(p=>{let u=p.closest("label, .vf-label, .option-card, tr, td, div");return u&&v(u.textContent).toLowerCase().includes(v(i).toLowerCase())});d&&(r=d)}}}else if(!(r instanceof HTMLInputElement)&&!(r instanceof HTMLSelectElement)&&!(r instanceof HTMLTextAreaElement)){let s=r.querySelector(`input[value="${H(i)}" i], [data-value="${H(i)}" i]`);if(s)r=s;else{let d=Array.from(r.querySelectorAll('input[type="radio"], input[type="checkbox"]')).find(p=>{let u=p.closest("label, .vf-label, .option-card, td, div");return u&&v(u.textContent).toLowerCase().includes(v(i).toLowerCase())});d&&(r=d)}}}if(!r&&(o.t==="val"||o.t==="sel")){let s=document.body;try{s=O()||document.body}catch{}let l=Array.from(s.querySelectorAll(o.t==="sel"?'select, [role="combobox"], [role="listbox"]':'input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, select, [contenteditable="true"]')).filter(d=>L(d)&&!k(d));if(l.length===1)r=l[0];else if(l.length>1){let d=v(a).toLowerCase(),p=d.match(/^#?_?([0-9]+)$/);if(p){let u=parseInt(p[1],10);u>=1&&u<=l.length?r=l[u-1]:u>=0&&u<l.length&&(r=l[u])}r||(r=l.find(c=>{let h=(c.getAttribute("placeholder")||"").toLowerCase(),g=(c.name||"").toLowerCase(),f=(c.getAttribute("aria-label")||"").toLowerCase(),y=(c.id||"").toLowerCase(),m=v(Re(c)).toLowerCase(),b=v(c.closest('label, tr, td, .form-group, .field, [class*="row" i], div')?.textContent||"").toLowerCase();return h.includes(d)||g.includes(d)||f.includes(d)||y.includes(d)||m&&m.includes(d)||d.length>=2&&b.includes(d)})||(l.length===1?l[0]:null))}}if(!r&&o.t!=="adv"){console.warn(`[EasyQuiz] Alvo '${a}' n\xE3o encontrado para a\xE7\xE3o '${o.t}'. Prosseguindo...`);return}switch(o.t){case"val":if(r){let l=r instanceof HTMLInputElement||r instanceof HTMLTextAreaElement||r instanceof HTMLSelectElement||r.isContentEditable?r:r.querySelector('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]');if(!l){let c=r.closest('.form-group, .field, [class*="input" i], [class*="control" i], label, tr, td, li, p, div')?.querySelector('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]');c&&(l=c)}if(!l){let u=r.nextElementSibling;for(;u;){if(u instanceof HTMLInputElement&&!["hidden","button","submit","checkbox","radio"].includes(u.type)||u instanceof HTMLTextAreaElement||u instanceof HTMLElement&&u.isContentEditable){l=u;break}let c=u.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(c){l=c;break}u=u.nextElementSibling}}if(!l){let u=document.body;try{u=O()||document.body}catch{}let c=Array.from(u.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]')).filter(h=>L(h)&&!k(h));c.length>0&&(l=c[0])}let d=o.v!==void 0?o.v:o.value!==void 0?o.value:o.val!==void 0?o.val:o.text,p=d!=null?String(d):"";ye(l||r,p)}break;case"chk":r&&G(r,!!o.c);break;case"sel":if(r){let l=Array.isArray(o.v)?o.v:[String(o.v)];xe(r,l)}break;case"clk":if(r)if(!!(r.closest('.option-card, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice')||r.querySelector('input[type="radio"], input[type="checkbox"]')||r instanceof HTMLInputElement&&["checkbox","radio"].includes(r.type))){let d=o.c!==void 0?!!o.c:!0;G(r,d)}else _(r,o.co);break;case"adv":let s=De(o.id);if(s){await Ve(s,1200);let l=o.id||s.textContent?.trim()||"";l&&Ae(window.location.hostname,{advanceSelector:l}),_(s)}else console.warn("[EasyQuiz] Bot\xE3o de avan\xE7o n\xE3o localizado.");break}}function Rt(){let o=["button","a",'[role="button"]','input[type="submit"]','input[type="button"]','[data-testid*="check" i]','[data-test-id*="check" i]'].join(",");return Array.from(document.querySelectorAll(o)).find(t=>{if(!L(t)||k(t)||t.closest("header, nav, aside"))return!1;let a=t instanceof HTMLInputElement||t instanceof HTMLButtonElement?t.value:"",n=(t.textContent||a||t.getAttribute("aria-label")||"").trim();return/(verificar|checar|check|conferir|validar|enviar|responder)/i.test(n)})||null}function De(o){if(o){let i=q(o);if(i&&L(i)&&!k(i)&&!I(i))return i}try{let i=ie(window.location.hostname);if(i.advanceSelector){let r=q(i.advanceSelector);if(r&&L(r)&&!k(r)&&!I(r))return r}}catch{}let e=["button","a",'[role="button"]','[role="link"]','input[type="button"]','input[type="submit"]','[data-testid*="next" i]','[data-testid*="continue" i]','[data-testid*="check" i]','[data-test-id*="next" i]','[data-test-id*="continue" i]','[data-test-id*="check" i]','[class*="next" i]','[class*="continue" i]','[class*="proximo" i]','[class*="avancar" i]'].join(","),a=Array.from(document.querySelectorAll(e)).filter(i=>L(i)&&!k(i)&&!i.closest("header, nav, aside")&&!I(i));for(let i of a)if(j(i)&&!I(i))return i;for(let i of a){let r=i instanceof HTMLInputElement||i instanceof HTMLButtonElement?i.value:"",s=(i.textContent||r||i.getAttribute("aria-label")||"").trim();if(fe.test(s)&&!I(i))return i}let n=document.querySelector('[data-test-id*="next" i], [data-testid*="next" i], [aria-label*="next" i], [aria-label*="pr\xF3xim" i], [aria-label*="avan\xE7ar" i], [aria-label*="continuar" i]');return n&&L(n)&&!k(n)&&!I(n)?n:null}async function Ve(o,e=1500){let t=Date.now();for(;Date.now()-t<e;){if(!(o.disabled===!0||o.getAttribute("aria-disabled")==="true"||o.classList.contains("disabled")||o.getAttribute("disabled")!==null))return;await new Promise(n=>setTimeout(n,100))}}function ft(){let o=(document.body?.innerText||document.body?.textContent||"").replace(/\s+/g," ").trim(),e=document.querySelectorAll('input, textarea, select, button, [role="button"], [role="option"]').length;return`${window.location.href}|${document.title}|${o.slice(0,900)}|${e}`}async function Nt(o,e=1800){let t=Date.now();for(;Date.now()-t<e;){if(ft()!==o)return{changed:!0,evidence:"URL, texto, t\xEDtulo ou conjunto de controles mudou ap\xF3s a a\xE7\xE3o."};await new Promise(n=>setTimeout(n,100))}return{changed:!1,evidence:"Nenhuma mudan\xE7a observ\xE1vel foi detectada dentro do tempo limite."}}async function ht(o){if(o.t==="js"||o.t==="adv")return;if(o.t==="drag"){let n=q(o.from)||q(v(o.from)),i=q(o.to)||q(v(o.to));n&&i&&await we(n,i,2);return}let e=o.id||"",t=o.v!==void 0?String(o.v).trim():"",a=q(e,t)||q(v(e),t);if(o.t==="clk"||o.t==="chk"){if(!a&&e){let i=Array.from(document.querySelectorAll('input, label, button, [role="radio"], [role="checkbox"], .option-card, [class*="option" i], [class*="choice" i]')),r=v(e).toLowerCase();a=i.find(s=>{let l=v(s.textContent).toLowerCase(),d=v(s.value||"").toLowerCase();return l.includes(r)||d===r||l.startsWith(r+")")||l.startsWith("("+r+")")})||null}let n=o.v!==void 0?String(o.v).trim():"";if(a&&n){if(a instanceof HTMLInputElement&&a.type==="radio"&&a.name){if(v(a.value).toLowerCase()!==v(n).toLowerCase()){let i=document.querySelector(`input[type="radio"][name="${H(a.name)}"][value="${H(n)}" i]`);if(i)a=i;else{let s=Array.from(document.querySelectorAll(`input[type="radio"][name="${H(a.name)}"]`)).find(l=>{let d=l.closest("label, .vf-label, .option-card, tr, td, div");return d&&v(d.textContent).toLowerCase().includes(v(n).toLowerCase())});s&&(a=s)}}}else if(!(a instanceof HTMLInputElement)&&!(a instanceof HTMLSelectElement)&&!(a instanceof HTMLTextAreaElement)){let i=a.querySelector(`input[value="${H(n)}" i], [data-value="${H(n)}" i]`);if(i)a=i;else{let s=Array.from(a.querySelectorAll('input[type="radio"], input[type="checkbox"]')).find(l=>{let d=l.closest("label, .vf-label, .option-card, td, div");return d&&v(d.textContent).toLowerCase().includes(v(n).toLowerCase())});s&&(a=s)}}}if(a){let i=a.closest('.option-card, label, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, li')||a,r=a instanceof HTMLInputElement&&["radio","checkbox"].includes(a.type)?a:i.querySelector('input[type="radio"], input[type="checkbox"]')||(i.getAttribute("for")?i.ownerDocument.getElementById(i.getAttribute("for")):null),s=o.t==="chk"||o.c!==void 0?!!o.c:!0;if(G(r||i,s),r&&r.checked!==s){try{let l=r._valueTracker;l&&l.setValue(!s)}catch{}try{Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"checked")?.set?.call(r,s)}catch{}r.checked=s,r.dispatchEvent(new Event("input",{bubbles:!0,composed:!0})),r.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}}return}if(o.t==="val"){let n=null;if(a&&(n=a instanceof HTMLInputElement||a instanceof HTMLTextAreaElement||a.isContentEditable?a:a.querySelector('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]')),!n){let i=document.body;try{i=O()||document.body}catch{}let r=Array.from(i.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]')),s=v(e).toLowerCase();n=r.find(l=>{let d=(l.getAttribute("placeholder")||"").toLowerCase(),p=(l.name||"").toLowerCase(),u=(l.id||"").toLowerCase(),c=(l.getAttribute("aria-label")||"").toLowerCase();return d.includes(s)||p.includes(s)||u.includes(s)||c.includes(s)})||(r.length>0?r[0]:null)}if(n){let i=String(o.v??"");try{if(n.focus?.(),n.type!=="number"){try{n.select?.()}catch{}document.execCommand?.("insertText",!1,i)}}catch{}ye(n,i)}return}if(o.t==="sel"){if(!a&&e){let n=Array.from(document.querySelectorAll("select")),i=v(e).toLowerCase();a=n.find(r=>{let s=(r.name||"").toLowerCase(),l=(r.id||"").toLowerCase(),d=(r.getAttribute("aria-label")||"").toLowerCase();return s.includes(i)||l.includes(i)||d.includes(i)})||null}if(a){let n=Array.isArray(o.v)?o.v:[String(o.v)];xe(a,n)}return}}function ne(o){try{if(o.t==="val"){let e=o.v!==void 0?o.v:o.value!==void 0?o.value:o.val!==void 0?o.val:o.text,t=String(e??"").trim(),a=t,n=o.id!==void 0&&o.id!==null?String(o.id):"";n||(n=o.target??o.name??o.selector??"1");let i=q(n,a,!0)||q(v(n),a,!0);if(!i){let u=document.body;try{u=O()||document.body}catch{}let c=Array.from(u.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]')).filter(h=>L(h)&&!k(h));c.length>0&&(i=c[0])}if(!i)return!1;let r=i instanceof HTMLInputElement&&i.type==="radio"?i:i.querySelector('input[type="radio"]');if(r&&r.name){let u=document.querySelector(`input[type="radio"][name="${H(r.name)}"]:checked`);if(!u)return!1;let c=v(u.value).toLowerCase(),h=v(t).toLowerCase(),g=v(u.closest("label, .vf-label, .option-card, tr, td, div")?.textContent||"").toLowerCase();return c===h||g===h||g.includes(h)}let s=i instanceof HTMLInputElement||i instanceof HTMLTextAreaElement||i.isContentEditable?i:i.querySelector('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(!s){let c=i.closest('.form-group, .field, [class*="input" i], [class*="control" i], label, tr, td, li, p, div')?.querySelector('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]');c&&(s=c)}if(!s){let u=i.nextElementSibling;for(;u;){if(u instanceof HTMLInputElement&&!["hidden","button","submit","checkbox","radio"].includes(u.type)||u instanceof HTMLTextAreaElement||u instanceof HTMLElement&&u.isContentEditable){s=u;break}let c=u.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(c){s=c;break}u=u.nextElementSibling}}if(s instanceof HTMLSelectElement){let u=v(t).toLowerCase();return Array.from(s.options).some(c=>{if(!c.selected)return!1;let h=c.value.toLowerCase(),g=v(c.textContent).toLowerCase();return u===h||u===g||h.includes(u)||g.includes(u)})}let l=(s instanceof HTMLInputElement||s instanceof HTMLTextAreaElement?s.value:s?.textContent??i.textContent??"").trim();if(!l&&!t)return!0;if(!l&&t)return!1;let d=l.replace(",",".").replace(/\s+/g,"").toLowerCase(),p=t.replace(",",".").replace(/\s+/g,"").toLowerCase();return d===p||d.includes(p)||p.includes(d)||l.toLowerCase()===t.toLowerCase()}if(o.t==="sel"){let e=q(o.id,void 0,!0)||q(v(o.id),void 0,!0);if(!e){let i=document.body;try{i=O()||document.body}catch{}let r=Array.from(i.querySelectorAll('select, [role="combobox"], [role="listbox"]')).filter(d=>L(d)&&!k(d)),s=v(o.id).toLowerCase();e=r.find(d=>{let p=(d.id||"").toLowerCase(),u=(d.getAttribute("name")||"").toLowerCase(),c=(d.getAttribute("aria-label")||"").toLowerCase(),h=v(d.closest('.dropdown-row, [class*="dropdown" i], [class*="select" i], tr, label, div')?.textContent||"").toLowerCase();return p.includes(s)||u.includes(s)||c.includes(s)||s.length>=2&&h.includes(s)})||(r.length===1?r[0]:null)}if(!e)return!1;let t=e instanceof HTMLSelectElement?e:e.querySelector("select");if(!t){let i=e.matches?.('[role="combobox"], [role="listbox"], [class*="select" i], [class*="dropdown" i]')?e:e.closest('[role="combobox"], [role="listbox"], [class*="select" i], [class*="dropdown" i]');if(i){let s=(Array.isArray(o.v)?o.v:[String(o.v)]).map(d=>v(d).toLowerCase()),l=v(i.textContent).toLowerCase();return s.some(d=>l.includes(d)||d.includes(l))}return!1}let n=(Array.isArray(o.v)?o.v:[String(o.v)]).map(i=>v(i).toLowerCase());return Array.from(t.options).some(i=>{if(!i.selected)return!1;let r=i.value.toLowerCase(),s=v(i.textContent).toLowerCase();return n.some(l=>l===r||l===s||r.includes(l)||s.includes(l))})}if(o.t==="chk"||o.t==="clk"){let e=o.v!==void 0?String(o.v).trim():"",t=q(o.id,e)||q(v(o.id),e);if(!t)return!1;let a=t.closest('.option-card, label, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, li')||t,n=t instanceof HTMLInputElement&&["checkbox","radio"].includes(t.type)?t:a.querySelector('input[type="checkbox"], input[type="radio"]')||(a.getAttribute("for")?a.ownerDocument.getElementById(a.getAttribute("for")):null),i=o.t==="chk"||o.c!==void 0?!!o.c:!0;if(n&&n.type==="radio"&&o.v){let p=v(String(o.v)).toLowerCase();if(n.name){let u=document.querySelector(`input[type="radio"][name="${H(n.name)}"]:checked`);return u?v(u.value).toLowerCase()===p:!1}}if(n&&["checkbox","radio"].includes(n.type))return n.checked===i;let r=a.getAttribute("aria-checked")===String(i)||a.getAttribute("aria-selected")===String(i)||a.getAttribute("aria-pressed")===String(i),s=i?a.getAttribute("data-selected")==="true"||a.getAttribute("data-checked")==="true"||a.getAttribute("data-active")==="true"||a.getAttribute("data-state")==="checked"||a.getAttribute("data-state")==="on":a.getAttribute("data-selected")==="false"||a.getAttribute("data-checked")==="false"||a.getAttribute("data-state")==="unchecked",l=i?/active|selected|checked|picked|correct|is-selected|choice-selected|selected-option|is-checked|chosen|current|highlight|ring|border-primary/i.test(a.className||""):!/active|selected|checked|picked|correct|is-selected|choice-selected|selected-option|is-checked|chosen|current|highlight|ring|border-primary/i.test(a.className||"");return!!(r||s||l||(a instanceof HTMLButtonElement||a.getAttribute("role")==="button")&&o.t==="clk"||o.t==="clk"&&!n)}if(o.t==="drag"){let e=q(o.from)||q(v(o.from)),t=q(o.to)||q(v(o.to));return!e||!t?!1:t.contains(e)?!0:/placed|dropped|assigned|matched|done|selected/i.test(e.className||"")||e.getAttribute("data-placed")==="true"}}catch{}return!1}async function _e(o,e,t=1,a=le({engine:"smart",autoAdvance:e})){let n=o.actions.filter(m=>m.t!=="adv"),i=o.actions.filter(m=>m.t==="adv"),r=0,s=[],l=new Map,d=o.pageType==="question",p=n.filter(m=>m.t==="chk"||m.t==="clk"&&m.c!==void 0);if(d&&p.length>0){let m=document.body;try{m=O()||document.body}catch{}let b=Array.from(m.querySelectorAll('input[type="checkbox"], [role="checkbox"]')).filter(x=>L(x)&&!k(x));if(b.length>1){let x=new Set;for(let w of p){let T=w.t==="chk"?!!w.c:!!(w.c??!0),C="id"in w&&typeof w.id=="string"?w.id:"";if(T&&C){let A=q(C,w.v);if(A){let S=A instanceof HTMLInputElement&&A.type==="checkbox"?A:A.querySelector('input[type="checkbox"]');x.add(S||A)}}}if(x.size>0)for(let w of b)x.has(w)||(w instanceof HTMLInputElement&&w.checked||w.getAttribute("aria-checked")==="true"||w.closest(".option-card, label")?.classList.contains("selected"))&&G(w,!1)}}for(let m of n){try{await Pt(m,t,a),r++}catch(b){l.set(m,b instanceof Error?b.message:String(b)),console.warn("[EasyQuiz] A\xE7\xE3o declarativa prim\xE1ria falhou com seguran\xE7a:",m,b)}await new Promise(b=>setTimeout(b,m.t==="drag"?250:70))}await new Promise(m=>setTimeout(m,n.length>0?300:50));let u=0;for(let m of n){if(ne(m)){u++;continue}console.warn(`[EasyQuiz Auto-Cura] A\xE7\xE3o '${m.t}' no alvo '${m.id||m.from||""}' n\xE3o verificada no DOM. Disparando Passagem 2 de conting\xEAncia...`);try{$e(m,a),await ht(m)}catch(b){l.set(m,b instanceof Error?b.message:String(b)),console.warn("[EasyQuiz Auto-Cura] Rota alternativa falhou:",b)}await new Promise(b=>setTimeout(b,180)),ne(m)&&(console.log("[EasyQuiz Auto-Cura] \u2713 A\xE7\xE3o recuperada com sucesso pela rota de conting\xEAncia!"),u++)}if(u<n.length&&n.length>0){console.warn(`[EasyQuiz Auto-Cura] ${n.length-u} de ${n.length} a\xE7\xE3o(\xF5es) ainda n\xE3o verificadas. Disparando Passagem 3 final...`),await new Promise(m=>setTimeout(m,200));for(let m of n)if(!ne(m))try{await ht(m)}catch(b){l.set(m,b instanceof Error?b.message:String(b))}await new Promise(m=>setTimeout(m,200)),u=0;for(let m of n)ne(m)&&u++}for(let m of n)ne(m)||s.push(m.t==="drag"?`${m.from} -> ${m.to}`:"id"in m?m.id:m.t);d&&n.length===0&&s.push("nenhuma a\xE7\xE3o de resposta prescrita");let c=n.map((m,b)=>{let x=m.t==="drag"?`${m.from} -> ${m.to}`:m.t==="js"?"$eq":m.id||m.t,w=m.t==="js"?!0:m.t==="drag"?!!(Q(m.from,"source")&&Q(m.to,"destination")):!!(q(m.id||"")||q(v(m.id||""))),T=ne(m);return{index:b,action:m,target:x,located:w,applied:!l.has(m),verified:T,strategy:m.t==="drag"?"drag-adaptive":m.t==="js"?"javascript":"declarative-dom",evidence:T?"estado do controle confirmado no DOM":"nenhuma evid\xEAncia suficiente ap\xF3s as tentativas",...l.has(m)?{error:l.get(m)}:{}}}),h=d?n.length>0&&s.length===0&&u===n.length:!0,g=!1,f=!1,y="Nenhuma a\xE7\xE3o de navega\xE7\xE3o solicitada.";if(e&&(h||!d)){await new Promise(T=>setTimeout(T,n.length>0?400:150));let m=!1;if(o.pageType!=="info"){let T=Rt();T&&L(T)&&(await Ve(T,1200),_(T),m=!0,await new Promise(C=>setTimeout(C,800)))}let b=ft(),x=i.length>0?i[0].id:void 0,w=De(x);if(!w&&m&&(await new Promise(T=>setTimeout(T,600)),w=De(x)),w){await Ve(w,1500);let T=x||w.textContent?.trim()||"";T&&Ae(window.location.hostname,{advanceSelector:T}),_(w);let C=await Nt(b,2500);f=C.changed,y=C.evidence,g=C.changed||m,!C.changed&&!m&&console.warn("[EasyQuiz] O bot\xE3o de avan\xE7o foi acionado, mas a navega\xE7\xE3o ainda n\xE3o concluiu.")}else m?(g=!0,f=!0,y="Resposta confirmada via bot\xE3o de verifica\xE7\xE3o/envio."):console.warn("[EasyQuiz] Nenhum bot\xE3o de avan\xE7o encontrado na p\xE1gina.")}return{applied:r,verified:u,success:h,advanced:g,failed:s,reports:c,navigationVerified:f,navigationEvidence:y}}var ue=null,X=[],Ge=[],Ot=`
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
`;function Bt(){try{if(typeof document>"u"||!document.head)return;if(!document.getElementById("eq-image-pulse-style")){let o=document.createElement("style");o.id="eq-image-pulse-style",o.textContent=Ot,document.head.appendChild(o)}}catch{}}function W(){ue&&(ue.style.removeProperty("outline"),ue.style.removeProperty("outline-offset"),ue=null);for(let o of X)o.style.removeProperty("outline"),o.style.removeProperty("outline-offset"),o.style.removeProperty("background-color"),o.style.removeProperty("box-shadow"),o.removeAttribute("data-easyquiz-highlight");X=[];for(let o of Ge)o.style.removeProperty("animation"),o.style.removeProperty("outline"),o.style.removeProperty("outline-offset"),o.style.removeProperty("box-shadow"),o.removeAttribute("data-easyquiz-image-highlight");Ge=[]}function je(o){Bt();for(let e of o){if(!e||!(e instanceof(typeof HTMLElement<"u"?HTMLElement:e.constructor)))continue;let t=e;t.style.outline="3px solid #ffd600",t.style.outlineOffset="3px",t.style.animation="eq-image-pulse-yellow-white 1.2s ease-in-out infinite",t.setAttribute("data-easyquiz-image-highlight","true"),Ge.push(t)}}function Fe(o){W(),ue=o,o.style.outline="2px solid #00e5ff",o.style.outlineOffset="4px"}function bt(o){for(let e of o){if(e.t==="adv"||e.t==="js")continue;if(e.t==="drag"){try{let d=q(e.from),p=q(e.to);d&&(d.style.outline="2px solid #00ff88",X.push(d)),p&&(p.style.outline="2px dashed #00e5ff",X.push(p))}catch{}continue}if(!e.id)continue;let t=e.v!==void 0?Array.isArray(e.v)?e.v[0]:String(e.v):"",a=q(e.id,t,e.t==="val"||e.t==="sel")||q(v(e.id),t,e.t==="val"||e.t==="sel");if(!a&&e.t==="sel"){let d=document.body;try{d=O()||document.body}catch{}let p=Array.from(d.querySelectorAll('select, [role="combobox"], [role="listbox"]')).filter(h=>L(h)&&!te(h)),u=v(e.id).toLowerCase();a=p.find(h=>{let g=(h.id||"").toLowerCase(),f=(h.getAttribute("name")||"").toLowerCase(),y=(h.getAttribute("aria-label")||"").toLowerCase(),m=v(h.closest('.dropdown-row, [class*="dropdown" i], [class*="select" i], tr, label, div')?.textContent||"").toLowerCase();return g.includes(u)||f.includes(u)||y.includes(u)||u.length>=2&&m.includes(u)})||(p.length===1?p[0]:null)}if(!a)continue;let n=typeof HTMLSelectElement<"u"&&a instanceof HTMLSelectElement||a.tagName?.toLowerCase()==="select"||a.getAttribute("role")==="combobox"||a.getAttribute("role")==="listbox",r=a.parentElement?.closest('.dropdown-row, [class*="dropdown" i], [class*="select-row" i], .form-group, tr, li')||a.closest('label, .option-card, [role="radio"], [role="checkbox"], [role="listitem"], .answer, .quiz-option, .form-check, [class*="option" i], [class*="choice" i]')||a;r.style.outline="2px solid #00ff88",r.style.outlineOffset="2px",r.style.backgroundColor="rgba(0, 255, 136, 0.12)",r.setAttribute("data-easyquiz-highlight","true"),X.push(r);let s=n?a:r.querySelector('select, [role="combobox"], [role="listbox"]');s&&(s.style.outline="2px solid #00ff88",s.style.outlineOffset="2px",s.style.boxShadow="0 0 10px rgba(0, 255, 136, 0.8)",s.setAttribute("data-easyquiz-highlight","true"),X.push(s));let l=a instanceof HTMLInputElement&&["checkbox","radio"].includes(a.type)?a:r.querySelector('input[type="checkbox"], input[type="radio"]');l&&l!==r&&(l.style.outline="2px solid #00ff88",l.style.outlineOffset="2px",l.style.boxShadow="0 0 10px rgba(0, 255, 136, 0.8)",l.setAttribute("data-easyquiz-highlight","true"),X.push(l))}}var Ue=10,Dt=1400,Qe=15e5;function ae(o){return new Promise((e,t)=>{let a=new FileReader;a.onerror=()=>t(new Error("Falha ao converter blob para base64.")),a.onload=()=>{let n=String(a.result||"");e(n.split(",")[1]||"")},a.readAsDataURL(o)})}async function pe(o){let e=0,t=0;if(o instanceof HTMLImageElement?(e=o.naturalWidth||o.width,t=o.naturalHeight||o.height):(e=o.width,t=o.height),e<=0||t<=0)throw new Error("Dimens\xF5es inv\xE1lidas.");let a=Math.min(1,Dt/Math.max(e,t)),n=Math.max(1,Math.round(e*a)),i=Math.max(1,Math.round(t*a)),r=document.createElement("canvas");r.width=n,r.height=i;let s=r.getContext("2d",{alpha:!1});if(!s)throw new Error("Sem suporte a Canvas 2D.");return s.fillStyle="#ffffff",s.fillRect(0,0,n,i),s.drawImage(o,0,0,n,i),new Promise((l,d)=>{r.toBlob(p=>p?l(p):d(new Error("Falha na compress\xE3o.")),"image/jpeg",.88)})}async function Vt(o){let e=typeof o.getBoundingClientRect=="function"?o.getBoundingClientRect():{width:0,height:0},t=e.width||parseFloat(o.getAttribute("width")||"0")||parseFloat(o.style.width||"0")||400,a=e.height||parseFloat(o.getAttribute("height")||"0")||parseFloat(o.style.height||"0")||300,n=2,i=Math.min(1800,Math.max(120,Math.round(t*n))),r=Math.min(1800,Math.max(100,Math.round(a*n))),s=o.cloneNode(!0);s.getAttribute("xmlns")||s.setAttribute("xmlns","http://www.w3.org/2000/svg"),s.setAttribute("width",String(i)),s.setAttribute("height",String(r)),!s.getAttribute("viewBox")&&t>0&&a>0&&s.setAttribute("viewBox",`0 0 ${t} ${a}`);let d=new XMLSerializer().serializeToString(s),p=new Blob([d],{type:"image/svg+xml;charset=utf-8"}),u=URL.createObjectURL(p);try{let c=new Image;c.crossOrigin="anonymous",await new Promise((f,y)=>{c.onload=()=>f(),c.onerror=()=>y(new Error("Falha ao renderizar SVG em Image.")),c.src=u});let h=document.createElement("canvas");h.width=i,h.height=r;let g=h.getContext("2d",{alpha:!1});if(!g)throw new Error("Sem suporte a Canvas 2D.");return g.fillStyle="#ffffff",g.fillRect(0,0,i,r),g.drawImage(c,0,0,i,r),new Promise((f,y)=>{h.toBlob(m=>m?f(m):y(new Error("Falha na compress\xE3o do SVG.")),"image/jpeg",.92)})}finally{URL.revokeObjectURL(u)}}async function Ke(o){try{let e=o.cloneNode(!0),t=o.offsetWidth||500,a=o.offsetHeight||500,n=`
      <svg xmlns="http://www.w3.org/2000/svg" width="${t}" height="${a}">
        <foreignObject width="100%" height="100%">
          <div xmlns="http://www.w3.org/1999/xhtml" style="background:#fff;font-family:sans-serif;">
            ${e.innerHTML}
          </div>
        </foreignObject>
      </svg>
    `,i=new Blob([n],{type:"image/svg+xml;charset=utf-8"}),r=URL.createObjectURL(i),s=new Image;s.crossOrigin="anonymous",await new Promise((p,u)=>{s.onload=()=>p(),s.onerror=()=>u(new Error("Falha ao renderizar ForeignObject.")),s.src=r});let l=await pe(s),d=await ae(l);if(URL.revokeObjectURL(r),d&&d.length<=Qe)return{mediaType:"image/jpeg",base64:d,alt:"Captura via rasteriza\xE7\xE3o DOM",source:"rasterized"}}catch(e){console.warn("Falha na rasteriza\xE7\xE3o do n\xF3:",e)}return null}function _t(o,e){let t=o.closest('[data-easyquiz-id], button, [role="button"], [role="radio"], [role="checkbox"], [role="option"], label, .option-card, .quiz-option, .choice, .answer, [class*="option" i], [class*="choice" i], [class*="answer" i], li, tr');if(t&&t!==e&&L(t)&&!j(t)&&!I(t)){let i=t.dataset.easyquizId||t.id||void 0,r=M(t.innerText||t.textContent||"",120),s=t.getAttribute("aria-label")||t.getAttribute("title")||"",l=r||s,d=i?` [id: ${i}]`:"";if(l)return{associatedLabel:`Alternativa/Op\xE7\xE3o: "${l}"${d}`,targetControlId:i};if(i)return{associatedLabel:`Alternativa/Op\xE7\xE3o ${d}`,targetControlId:i}}let a=o.closest("figure")?.querySelector("figcaption")?.textContent?.trim();if(a)return{associatedLabel:`Figura do Enunciado: "${M(a,100)}"`};let n=o.closest('[class*="prompt" i], [class*="stimulus" i], [class*="question-text" i], [class*="statement" i], header, h1, h2, h3, h4, p');if(n){let i=M(n.textContent||"",80);if(i)return{associatedLabel:`Gr\xE1fico do Enunciado: "${i}"`}}return{associatedLabel:"Gr\xE1fico/Imagem do Enunciado Principal"}}async function Gt(o){let e=o.currentSrc||o.src;if(!e)return null;let t=(o.alt||o.getAttribute("aria-label")||"Imagem da quest\xE3o").slice(0,500);if(o.complete&&o.naturalWidth>0)try{let a=await pe(o),n=await ae(a);if(n&&n.length<=Qe)return{mediaType:"image/jpeg",base64:n,alt:t,source:e.slice(0,2e3)}}catch{}try{let a=await fetch(e,{mode:"cors"});if(a.ok){let n=await a.blob();if(n.type.startsWith("image/")){let i=await createImageBitmap(n),r=await pe(i);i.close();let s=await ae(r);if(s&&s.length<=Qe)return{mediaType:"image/jpeg",base64:s,alt:t,source:e.slice(0,2e3)}}}}catch{return Ke(o.parentElement||o)}return null}function jt(o){return o.querySelectorAll("path, line, polyline, polygon, circle, rect, text, image").length>0}function Ft(o){try{let e=o.style.backgroundImage||(window.getComputedStyle?window.getComputedStyle(o).backgroundImage:"");if(e&&e.includes("url(")){let t=e.match(/url\(["']?([^"')]+)["']?\)/);if(t&&t[1]&&!t[1].startsWith("data:image/svg+xml"))return t[1]}}catch{}return null}async function Ye(o,e=!0){if(!e)return[];let t=[],a=0,n=35e5,i=(l,d)=>{if(!l||!l.base64||a+l.base64.length>n)return!1;let p=_t(d,o);return l.associatedLabel=p.associatedLabel,l.targetControlId=p.targetControlId,l.element=d,t.push(l),a+=l.base64.length,t.length>=Ue},r=Array.from(o.querySelectorAll("img")).filter(l=>L(l)&&!I(l));for(let l of r)try{let d=await Gt(l);if(i(d,l))return t}catch{}let s=Array.from(o.querySelectorAll("svg")).filter(l=>{if(!L(l)||I(l))return!1;let d=typeof l.getBoundingClientRect=="function"?l.getBoundingClientRect():{width:0,height:0},p=d.width||parseFloat(l.getAttribute("width")||"0"),u=d.height||parseFloat(l.getAttribute("height")||"0");return p<30||u<30?!1:jt(l)});for(let l of s)try{let d=await Vt(l),p=await ae(d);if(p){let u={mediaType:"image/jpeg",base64:p,alt:l.getAttribute("aria-label")||"Gr\xE1fico/Diagrama vetorial da quest\xE3o",source:"svg"};if(i(u,l))return t}}catch{let d=await Ke(l.parentElement||l);if(i(d,l))return t}if(t.length<Ue){let l=Array.from(o.querySelectorAll("canvas")).filter(d=>L(d)&&!I(d));for(let d of l)try{let p=await pe(d),u=await ae(p);if(u){let c={mediaType:"image/jpeg",base64:u,alt:d.getAttribute("aria-label")||"Gr\xE1fico Canvas inline",source:"canvas"};if(i(c,d))return t}}catch{let p=await Ke(d.parentElement||d);if(i(p,d))return t}}if(t.length<Ue){let l=Array.from(o.querySelectorAll('[style*="background-image"], .option-image, .question-media')).filter(d=>L(d)&&!I(d));for(let d of l){let p=Ft(d);if(p)try{let u=await fetch(p,{mode:"cors"});if(u.ok){let c=await u.blob();if(c.type.startsWith("image/")){let h=await createImageBitmap(c),g=await pe(h);h.close();let f=await ae(g);if(f){let y={mediaType:"image/jpeg",base64:f,alt:"Imagem de fundo da alternativa",source:p.slice(0,2e3)};if(i(y,d))return t}}}}catch{}}}return t}var qe=class{active=!1;timer=null;callbacks;lastRunTime=0;lastActionTime=0;isProcessing=!1;observer=null;mutationTimer=null;abortController=null;constructor(e){this.callbacks=e}isActive(){return this.active}start(){this.active||(this.active=!0,this.lastActionTime=Date.now(),this.callbacks.onStatusChange("waiting","> [SYS] Autopilot ENGAGED. Monitorando..."),typeof MutationObserver<"u"&&(this.observer=new MutationObserver(()=>{!this.active||this.isProcessing||(this.mutationTimer&&clearTimeout(this.mutationTimer),this.mutationTimer=window.setTimeout(()=>{this.mutationTimer=null,this.loop()},180))}),this.observer.observe(document.body,{subtree:!0,childList:!0,attributes:!0,characterData:!0})),this.loop())}stop(){if(this.active=!1,this.abortController){try{this.abortController.abort()}catch{}this.abortController=null}this.timer&&clearTimeout(this.timer),this.mutationTimer&&clearTimeout(this.mutationTimer),this.mutationTimer=null,this.observer?.disconnect(),this.observer=null,this.isProcessing=!1,this.callbacks.onStatusChange("idle","> [SYS] Autopilot DESATIVADO pelo usu\xE1rio.","text-yellow")}sleep(e){return new Promise(t=>{if(!this.active)return t();let a=null,n=()=>{a&&clearTimeout(a),t()};a=window.setTimeout(()=>{t()},e),this.abortController?.signal.addEventListener("abort",n,{once:!0})})}errorCount=0;lastPageSig="";samePageCount=0;async loop(){if(!this.active)return;let e=Date.now();if(e-this.lastRunTime<2500||this.isProcessing){this.timer=window.setTimeout(()=>this.loop(),500);return}this.lastRunTime=e;try{if(this.isProcessing=!0,!this.active)return;let t=de(!1);if(t||(t=oe()),!this.active)return;if(t){let a=ut(t);if(a===this.lastPageSig)this.samePageCount++;else{let r=this.samePageCount>1;this.lastPageSig=a,this.samePageCount=1,r&&(this.callbacks.onStatusChange("waiting","> [SYS] Avan\xE7o de p\xE1gina detectado! Retomando monitoramento autom\xE1tico...","text-green"),this.callbacks.onPageAdvance?.())}if(this.callbacks.isManualModeActive?.()){this.callbacks.onStatusChange("waiting","> [SYS] Gabarito manual ativo na tela. Aguardando voc\xEA posicionar as respostas e avan\xE7ar a p\xE1gina...","text-yellow"),this.lastRunTime=Date.now();return}if(this.samePageCount>1&&(this.callbacks.onStatusChange("waiting",`> [AUTOPILOT] Resolu\xE7\xE3o pendente (${this.samePageCount}\xAA verifica\xE7\xE3o). Conclua e avance para prosseguir...`,"text-yellow"),await this.sleep(4e3),!this.active))return;let n=t.controls.filter(r=>r.role==="answer"),i=ie(window.location.hostname);if(n.length>0){if(this.callbacks.onStatusChange("analyzing","> [IA] Quest\xE3o/Exerc\xEDcio detectado. Consultando IA...","text-blue"),await this.sleep(600),!this.active)return;this.abortController=new AbortController;let r=await this.callbacks.onRequestAnalysis(this.samePageCount,this.abortController.signal);if(this.abortController=null,!this.active)return;if(r){if(this.callbacks.onStatusChange("analyzing",`> [IA] (${r.usedModel||"gemini"}) Confian\xE7a: ${(r.confidence*100).toFixed(1)}% | Modo: ${r.mode}`,"text-blue"),this.callbacks.onStatusChange("analyzing",`> [IA] Racioc\xEDnio: ${r.rationale}`,"text-blue"),this.callbacks.onStatusChange("analyzing",`> [IA] A\xE7\xF5es geradas: ${r.actions.length}`,"text-blue"),this.errorCount=0,r.memoryToStore&&this.callbacks.onStatusChange("analyzing",`> [IA] \u{1F9E0} Mem\xF3ria RAG salva: "${r.memoryToStore}"`,"text-yellow"),r.pageType==="conclusion"){this.callbacks.onStatusChange("idle","> [SYS] Atividade conclu\xEDda! Desligando Autopilot.","text-green"),this.stop();return}}else{this.errorCount++;let s=this.errorCount===1?5e3:8e3;this.callbacks.onStatusChange("waiting",`> [AVISO] Falha na an\xE1lise (${this.errorCount}/3). Aguardando ${s/1e3}s para estabiliza\xE7\xE3o antes de tentar novamente...`,"text-yellow"),await this.sleep(s)}this.lastActionTime=Date.now()}else if(i.advanceSelector&&q(i.advanceSelector)&&t.questionText.length<50){let r=q(i.advanceSelector);if(r){if(this.callbacks.onStatusChange("advancing",`> [BRUTE] Avan\xE7ando via cache "${i.advanceSelector}"...`),await this.sleep(1e3),!this.active)return;_(r),this.lastActionTime=Date.now(),this.errorCount=0}}else{if(this.callbacks.onStatusChange("analyzing","> [IA] P\xE1gina informativa/contexto detectada. Lendo e consultando IA...","text-blue"),await this.sleep(600),!this.active)return;this.abortController=new AbortController;let r=await this.callbacks.onRequestAnalysis(this.samePageCount,this.abortController.signal);if(this.abortController=null,!this.active)return;if(r){if(this.callbacks.onStatusChange("analyzing",`> [IA] (${r.usedModel||"gemini"}) Tipo: ${r.pageType} | Modo: ${r.mode}`,"text-blue"),this.callbacks.onStatusChange("analyzing",`> [IA] Racioc\xEDnio: ${r.rationale}`,"text-blue"),r.memoryToStore&&this.callbacks.onStatusChange("analyzing",`> [IA] \u{1F9E0} Conte\xFAdo absorvido na mem\xF3ria: "${r.memoryToStore}"`,"text-yellow"),r.pageType==="info")this.callbacks.onStatusChange("advancing","> [IA] \u{1F4D6} Leitura conclu\xEDda. Avan\xE7ando automaticamente...","text-green"),await this.sleep(1800);else if(r.pageType==="start")this.callbacks.onStatusChange("advancing","> [SYS] In\xEDcio de m\xF3dulo detectado. Iniciando...","text-blue"),await this.sleep(1800);else if(r.pageType==="conclusion"){this.callbacks.onStatusChange("idle","> [SYS] Atividade conclu\xEDda! Desligando Autopilot.","text-green"),this.stop();return}this.errorCount=0}else{this.errorCount++;let s=this.errorCount===1?5e3:8e3;this.callbacks.onStatusChange("waiting",`> [AVISO] Falha ao processar p\xE1gina (${this.errorCount}/3). Aguardando ${s/1e3}s para estabiliza\xE7\xE3o antes de tentar novamente...`,"text-yellow"),await this.sleep(s)}this.lastActionTime=Date.now()}if(this.errorCount>=3){this.callbacks.onStatusChange("error","> [ERRO] 3 falhas consecutivas. Abortando Autopilot para poupar sua cota e tokens.","text-red"),this.callbacks.onStatusChange("waiting","> [DICA] Verifique a mensagem vermelha de [ERRO DETALHADO] no console acima para saber o motivo exato.","text-yellow"),this.stop();return}}else this.callbacks.onStatusChange("waiting","> [SYS] Monitorando p\xE1gina... Aguardando carregamento dos elementos.")}catch(t){if(!this.active)return;let a=t instanceof Error?t.message:String(t);if(a.includes("cancelada")||a.includes("aborted"))return;console.warn("[EasyQuiz Autopilot]",t),this.callbacks.onStatusChange("error",`> [ERRO NO AUTOPILOT] ${a}`,"text-red")}finally{this.abortController=null,this.isProcessing=!1}this.active&&(this.timer=window.setTimeout(()=>this.loop(),1e3))}};var E={logo:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.8L19.2 8 12 11.2 4.8 8 12 4.8zM4 9.6l7 3.1v7.5l-7-3.5V9.6zm9 10.6v-7.5l7-3.1v7.1l-7 3.5z"/></svg>',rocket:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M13.13 2.81a.5.5 0 0 0-.46-.07c-.42.15-2.08.79-3.9 2.61-2.04 2.04-2.6 4.09-2.73 4.96l-.97.98a1 1 0 0 0-.29.71v2.12a1 1 0 0 0 .29.71l2.83 2.83a1 1 0 0 0 .71.29h2.12a1 1 0 0 0 .71-.29l.98-.97c.87-.13 2.92-.69 4.96-2.73 1.82-1.82 2.46-3.48 2.61-3.9a.5.5 0 0 0-.07-.46l-6.79-6.79zM4.5 16.5l-2.09 2.09a.5.5 0 0 0 .35.85h3.04l.35.35v3.04a.5.5 0 0 0 .85.35L9.09 21.1l-4.59-4.6z"/></svg>',play:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>',stop:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h12v12H6z"/></svg>',code:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>',terminal:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8h16v10zm-12-3l3-3-3-3 1.4-1.4L13.8 12l-4.4 4.4L8 15zm6 0h4v2h-4v-2z"/></svg>',inspector:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>',settings:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.49.49 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>',key:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M7 14c-2.76 0-5-2.24-5-5s2.24-5 5-5c2.42 0 4.44 1.72 4.9 4H22v4h-2v3h-3v-3h-2v3h-3v-3h-2.1c-.46 2.28-2.48 4-4.9 4zm0-7c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>',paste:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 2h-4.18C14.4 .84 13.3 0 12 0c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm7 18H5V4h2v3h10V4h2v16z"/></svg>',edit:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>',trash:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>',eraser:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M15.14 3c-.51 0-1.02.2-1.41.59L2.59 14.73c-.78.78-.78 2.05 0 2.83L6.44 21.4c.78.78 2.05.78 2.83 0l11.14-11.14c.78-.78.78-2.05 0-2.83l-3.86-3.84c-.39-.39-.9-.59-1.41-.59zm.71 2.71l3.15 3.15-3.15 3.15-3.15-3.15 3.15-3.15zm-4.57 4.57l3.15 3.15-4.57 4.57H6.71l-3-3 7.57-7.57z"/></svg>',save:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/></svg>',analyze:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L3 14h8l-2 8 12-12h-8l2-8z"/></svg>',apply:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>',close:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>',chevronRight:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>',chevronLeft:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>',eye:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>',eyeOff:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.44-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.17c0-1.66-1.34-3-3-3l-.17.02z"/></svg>',check:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>',clock:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>',copy:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>',refresh:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg>',chip:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4h12v16H6V4zm2 2v12h8V6H8zm-4 3h2v2H4V9zm0 4h2v2H4v-2zm16-4h2v2h-2V9zm0 4h2v2h-2v-2zM9 2h2v2H9V2zm4 0h2v2h-2V2zm-4 18h2v2H9v-2zm4 0h2v2h-2v-2z"/></svg>',moreVertical:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>',minimize:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M19 13H5v-2h14v2z"/></svg>',maximize:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/></svg>',dragHandle:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M10 9h4V6h-4v3zm0 5h4v-3h-4v3zm0 5h4v-3h-4v3zM4 9h4V6H4v3zm0 5h4v-3H4v3zm0 5h4v-3H4v3zm12-10V6h4v3h-4zm0 5h4v-3h-4v3zm0 5h4v-3h-4v3z"/></svg>',list:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/></svg>',folderTree:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6 10H6v-2h8v2zm4-4H6v-2h12v2z"/></svg>',folder:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/></svg>',file:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>'};var Te=class{element=null;shadow;isMinimized=!1;currentPlan=null;isDragging=!1;dragStartX=0;dragStartY=0;initialLeft=25;initialTop=25;onAdvanceCallback;constructor(e,t){this.shadow=e,this.onAdvanceCallback=t,this.initGlobalListeners()}initGlobalListeners(){window.addEventListener("popstate",()=>this.handlePageNavigated()),window.addEventListener("hashchange",()=>this.handlePageNavigated()),document.addEventListener("click",e=>{if(!this.isOpen())return;let t=e.target;if(!t||this.shadow.contains(t)||t.closest("#easyquiz-shadow-root"))return;let a=t.closest('button, [role="button"], a, input[type="submit"]');if(a){let n=(a.textContent||a.value||"").toLowerCase();/pr[oó]xim|avan[cç]|continu|verific|enviar|submit|confirm|checar|validar|next/i.test(n)&&setTimeout(()=>{this.isOpen()&&this.handlePageNavigated()},800)}},!0)}handlePageNavigated(){this.isOpen()&&(this.hide(),this.onAdvanceCallback?.())}isOpen(){return this.element!==null&&this.element.style.display!=="none"}show(e){this.currentPlan=e,this.element||this.createElement(),this.renderContent(),this.element&&(this.element.style.display="flex")}hide(){this.element&&(this.element.style.display="none")}minimize(){this.isMinimized=!0,this.element&&this.element.classList.add("minimized")}restore(){this.isMinimized=!1,this.element&&this.element.classList.remove("minimized")}createElement(){this.element=document.createElement("div"),this.element.className="eq-floating-hud",this.element.style.left=`${this.initialLeft}px`,this.element.style.top=`${this.initialTop}px`,this.element.innerHTML=`
      <!-- P\xEDlula compacta quando minimizado -->
      <div class="eq-fah-pill" id="eq-fah-pill" title="Clique para expandir gabarito interativo">
        <span class="eq-fah-pill-icon">${E.list}</span>
        <span id="eq-fah-pill-text">Gabarito Manual</span>
        <span class="eq-fah-pill-badge" id="eq-fah-pill-badge">0</span>
      </div>

      <!-- Cabe\xE7alho com barra de arraste -->
      <div class="eq-fah-header" id="eq-fah-header">
        <div class="eq-fah-title">
          <span style="display:flex; align-items:center;">${E.dragHandle}</span>
          <span>Gabarito Manual Interativo</span>
        </div>
        <div class="eq-fah-actions">
          <button class="eq-fah-btn" id="eq-fah-copy-md-btn" title="Copiar tudo formatado em Markdown">${E.copy}</button>
          <button class="eq-fah-btn" id="eq-fah-min-btn" title="Minimizar para p\xEDlula flutuante">${E.minimize}</button>
          <button class="eq-fah-btn" id="eq-fah-close-btn" title="Fechar gabarito">${E.close}</button>
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
    `,this.shadow.appendChild(this.element),this.element.querySelector("#eq-fah-pill").addEventListener("click",()=>this.restore()),this.element.querySelector("#eq-fah-min-btn").addEventListener("click",()=>this.minimize()),this.element.querySelector("#eq-fah-close-btn").addEventListener("click",()=>this.hide());let n=this.element.querySelector("#eq-fah-copy-md-btn");n.addEventListener("click",()=>this.copyMarkdownToClipboard(n));let i=this.element.querySelector("#eq-fah-copy-all-btn");i.addEventListener("click",()=>this.copyMarkdownToClipboard(i));let r=this.element.querySelector("#eq-fah-header");this.setupDraggable(r)}setupDraggable(e){let t=a=>{if(a.target.closest(".eq-fah-btn"))return;a.preventDefault(),this.isDragging=!0,this.dragStartX=a.clientX,this.dragStartY=a.clientY;let n=this.element.getBoundingClientRect();this.initialLeft=n.left,this.initialTop=n.top;let i=s=>{if(!this.isDragging||!this.element)return;let l=s.clientX-this.dragStartX,d=s.clientY-this.dragStartY,p=Math.max(10,window.innerWidth-this.element.offsetWidth-10),u=Math.max(10,window.innerHeight-this.element.offsetHeight-10),c=Math.min(Math.max(10,this.initialLeft+l),p),h=Math.min(Math.max(10,this.initialTop+d),u);this.element.style.left=`${c}px`,this.element.style.top=`${h}px`},r=()=>{this.isDragging=!1,window.removeEventListener("mousemove",i),window.removeEventListener("mouseup",r)};window.addEventListener("mousemove",i),window.addEventListener("mouseup",r)};e.addEventListener("mousedown",t)}renderContent(){if(!this.element||!this.currentPlan)return;let e=this.element.querySelector("#eq-fah-body"),t=this.element.querySelector("#eq-fah-pill-text"),a=this.element.querySelector("#eq-fah-pill-badge");e.innerHTML="";let n=this.currentPlan,i=n.actions.filter(h=>h.t==="drag"),r=n.actions.filter(h=>{if(h.t!=="val")return!1;let g=v(h.id||"").toLowerCase();return!/continu|avan[cç]|pr[oó]xim|submet|enviar|check|verific/i.test(g)}),s=n.actions.filter(h=>h.t==="clk"||h.t==="chk"),l=n.actions.filter(h=>h.t==="sel"),d=i.length||r.length||s.length||l.length,p=document.createElement("div");p.className="eq-fah-meta";let u=document.createElement("span");u.textContent=`Modo: ${n.mode.replace("_"," ")}`;let c=document.createElement("span");if(c.className="eq-fah-meta-badge",c.textContent=`${Math.round(n.confidence*100)}% Confian\xE7a`,p.append(u,c),e.appendChild(p),i.length>0||n.mode==="categorizacao"||n.mode==="arrastar_soltar"){t.textContent=`Categoriza\xE7\xE3o (${i.length} itens)`,a.textContent=String(i.length);let h={};for(let g of i){let f=v(g.to)||"Geral";h[f]||(h[f]=[]),h[f].push(v(g.from))}for(let[g,f]of Object.entries(h)){let y=document.createElement("div"),m=/fato|true|verdadeiro|sim/i.test(g),b=/opini[aã]o|false|falso|n[aã]o/i.test(g);y.className=`eq-fah-group ${m?"group-fato":b?"group-opiniao":""}`;let x=document.createElement("div");x.className="eq-fah-group-title",x.textContent=`\u{1F4C1} ${g} (${f.length})`,y.appendChild(x);let w=document.createElement("div");w.className="eq-fah-group-items";for(let T of f){let C=document.createElement("div");C.className="eq-fah-item";let A=document.createElement("span");A.className="eq-fah-item-text",A.textContent=T,C.appendChild(A);let S=document.createElement("button");S.className="eq-fah-copy-inline",S.textContent="Copiar",S.addEventListener("click",()=>{navigator.clipboard.writeText(T),S.textContent="\u2713 Copiado",setTimeout(()=>S.textContent="Copiar",1200)}),C.appendChild(S),w.appendChild(C)}y.appendChild(w),e.appendChild(y)}}else if(r.length>0){t.textContent=`Preenchimento (${r.length} campos)`,a.textContent=String(r.length);let h=document.createElement("div");h.className="eq-fah-group";let g=document.createElement("div");g.className="eq-fah-group-title",g.textContent="\u{1F4DD} Respostas para os Campos de Texto:",h.appendChild(g);let f=document.createElement("div");f.className="eq-fah-group-items";for(let y=0;y<r.length;y++){let m=r[y],b=document.createElement("div");b.className="eq-fah-item";let x=Ee(m.id);(!x||/^[#\.\$]|input|mat-|cell|field|q[0-9]|eq-/i.test(x))&&(x=`Campo ${y+1}`);let w=String(m.v??""),T=document.createElement("div");T.className="eq-fah-field-box";let C=document.createElement("div");C.className="eq-fah-field-label",C.textContent=x,T.appendChild(C);let A=document.createElement("div");A.className="eq-fah-field-val",A.textContent=w,T.appendChild(A),b.appendChild(T);let S=document.createElement("button");S.className="eq-fah-copy-inline",S.textContent="Copiar",S.addEventListener("click",()=>{navigator.clipboard.writeText(w),S.textContent="\u2713 Copiado",setTimeout(()=>S.textContent="Copiar",1200)}),b.appendChild(S),f.appendChild(b)}h.appendChild(f),e.appendChild(h)}else if(s.length>0){t.textContent=`Op\xE7\xF5es (${s.length} marcadas)`,a.textContent=String(s.length);let h=document.createElement("div");h.className="eq-fah-group";let g=document.createElement("div");g.className="eq-fah-group-title",g.textContent="\u{1F3AF} Alternativa(s) Correta(s):",h.appendChild(g);let f=document.createElement("div");f.className="eq-fah-group-items";for(let y=0;y<s.length;y++){let m=s[y],b=document.createElement("div");b.className="eq-fah-item";let x=Ee(m.id);(!x||/^(eq-|#|\$|\.|input_|mat-|choice_|radio_|chk_)/i.test(x))&&m.v&&(x=String(m.v)),x=v(x),/^(eq-|#|\$|\.|input_|mat-|choice_|radio_|chk_)/i.test(x)&&(x="");let w="",T=x.match(/^(\([A-Za-z0-9]\)|[A-Za-z0-9][\)\.\:\-])\s*(.*)$/);T?(w=T[1].replace(/[\(\)\.\:\-\s]/g,"").toUpperCase(),x=T[2].trim()||x):s.length>1&&(w=String.fromCharCode(65+y));let C=document.createElement("div");if(C.style.display="flex",C.style.alignItems="center",C.style.gap="8px",C.style.flex="1",w){let P=document.createElement("span");P.className="eq-fah-letter-badge",P.textContent=w,C.appendChild(P)}let A=document.createElement("span");A.className="eq-fah-item-text",A.textContent=x||(w?`Alternativa ${w}`:"Alternativa Selecionada"),C.appendChild(A),b.appendChild(C);let S=document.createElement("button");S.className="eq-fah-copy-inline",S.textContent="Copiar",S.addEventListener("click",()=>{navigator.clipboard.writeText(x||w),S.textContent="\u2713 Copiado",setTimeout(()=>S.textContent="Copiar",1200)}),b.appendChild(S),f.appendChild(b)}h.appendChild(f),e.appendChild(h)}else if(l.length>0){t.textContent=`Sele\xE7\xE3o (${l.length} listas)`,a.textContent=String(l.length);let h=document.createElement("div");h.className="eq-fah-group";let g=document.createElement("div");g.className="eq-fah-group-title",g.textContent="\u{1F4CB} Op\xE7\xF5es para Selecionar na Lista:",h.appendChild(g);let f=document.createElement("div");f.className="eq-fah-group-items";for(let y=0;y<l.length;y++){let m=l[y],b=document.createElement("div");b.className="eq-fah-item";let x=Ee(m.id);(!x||/^[#\.\$]|select|input|mat-|cell|field|q[0-9]|eq-/i.test(x))&&(x=`Lista ${y+1}`);let C=(Array.isArray(m.v)?m.v:[String(m.v??"")]).map($=>{let N=q(m.id,void 0,!0)||q(v(m.id),void 0,!0),R=N instanceof HTMLSelectElement?N:N?.querySelector("select");if(R){let F=v($).toLowerCase();for(let K=0;K<R.options.length;K++){let Z=R.options[K];if(Z.value.toLowerCase()===F||v(Z.textContent).toLowerCase()===F){let V=v(Z.textContent);if(V&&!V.toLowerCase().includes("selecione"))return V}}}return $}).join(", "),A=document.createElement("div");A.className="eq-fah-field-box";let S=document.createElement("div");S.className="eq-fah-field-label",S.textContent=x,A.appendChild(S);let P=document.createElement("div");P.className="eq-fah-field-val",P.textContent=C,A.appendChild(P),b.appendChild(A);let z=document.createElement("button");z.className="eq-fah-copy-inline",z.textContent="Copiar",z.addEventListener("click",()=>{navigator.clipboard.writeText(C),z.textContent="\u2713 Copiado",setTimeout(()=>z.textContent="Copiar",1200)}),b.appendChild(z),f.appendChild(b)}h.appendChild(f),e.appendChild(h)}else{t.textContent="Gabarito",a.textContent="0";let h=document.createElement("div");h.style.padding="10px",h.style.color="#888",h.textContent="Nenhuma resposta direta para exibir.",e.appendChild(h)}if(n.rationale){let h=document.createElement("div");h.className="eq-fah-rationale",h.textContent=`\u{1F4A1} Racioc\xEDnio da IA: ${n.rationale}`,e.appendChild(h)}}generateMarkdown(){if(!this.currentPlan)return"";let e=this.currentPlan,t=[];t.push("# Gabarito da Quest\xE3o \u2014 EasyQuiz Pro"),t.push(`- **Modo:** ${e.mode}`),t.push(`- **Confian\xE7a:** ${(e.confidence*100).toFixed(0)}%`),t.push("");let a=e.actions.filter(s=>s.t==="drag"),n=e.actions.filter(s=>s.t==="val"),i=e.actions.filter(s=>s.t==="clk"||s.t==="chk"),r=e.actions.filter(s=>s.t==="sel");if(a.length>0){t.push("## \u{1F4C2} Categoriza\xE7\xE3o:");let s={};for(let l of a){let d=v(l.to)||"Geral";s[d]||(s[d]=[]),s[d].push(v(l.from))}for(let[l,d]of Object.entries(s)){t.push(`### Categoria: ${l}`);for(let p of d)t.push(`- ${p}`);t.push("")}}else if(n.length>0){t.push("## \u270F\uFE0F Respostas para Preenchimento:");for(let s of n){let l=v(s.id);t.push(`- **${l||"Campo"}:** \`${s.v}\``)}t.push("")}else if(i.length>0){t.push("## \u2705 Alternativas Corretas:");for(let s of i)t.push(`- [x] ${v(s.id)}`);t.push("")}else if(r.length>0){t.push("## \u{1F4CB} Op\xE7\xF5es Selecionadas em Lista:");for(let s of r){let l=v(s.id)||"Lista",d=Array.isArray(s.v)?s.v.join(", "):String(s.v??"");t.push(`- **${l}:** \`${d}\``)}t.push("")}return e.rationale&&(t.push("---"),t.push(`**\u{1F4A1} Racioc\xEDnio:** ${e.rationale}`)),t.join(`
`)}copyMarkdownToClipboard(e){let t=this.generateMarkdown();t&&navigator.clipboard.writeText(t).then(()=>{let a=e.innerHTML;e.id==="eq-fah-copy-md-btn"?e.innerHTML='<span style="font-size:10px; color:#00ffcc; font-weight:bold;">\u2713</span>':e.innerHTML="\u2713 Copiado!",setTimeout(()=>{e.innerHTML=a},1500)})}};var vt=`
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
`;var Ut=[{value:"",label:"Detec\xE7\xE3o Autom\xE1tica"},{value:"escolha_unica",label:"M\xFAltipla Escolha (\xDAnica)"},{value:"escolha_multipla",label:"M\xFAltipla Escolha (V\xE1rias)"},{value:"categorizacao",label:"Categoriza\xE7\xE3o / Grupos"},{value:"arrastar_soltar",label:"Arrastar e Soltar (Drag & Drop)"},{value:"ordenacao",label:"Ordena\xE7\xE3o / Sequ\xEAncia"},{value:"verdadeiro_falso",label:"Verdadeiro / Falso"},{value:"texto_livre",label:"Texto Livre / Dissertativa"},{value:"preenchimento",label:"Preenchimento de Lacunas"}],Qt=[{value:"smart",label:"Inteligente (Auto-H\xEDbrido)"},{value:"command",label:"Apenas Comando (Seguro)"},{value:"javascript",label:"Apenas JS Nativo (Avan\xE7ado)"}],Ce=class{host;shadow;callbacks;autopilot;floatingAnswers;initialSettings;isCollapsed=!1;activeTab="resolver";stopwatchInterval=null;stopwatchStartTime=0;latestPlan=null;latestContext=null;latestPromptText="";liveDebugTerminal;dbgModel;dbgLatency;dbgSplitTokens;dbgTotalTokens;dbgErrorCard;dbgErrorText;dbgPromptLen;dbgPromptView;dbgContextView;dbgRawRespView;dbgCountAll;dbgCountError;dbgCountAi;dbgCountDom;logEntries=[];activeLogFilter="all";autoScrollLogs=!0;lastErrorMsg=null;progressContainer;progressBar;progressLabel;progressVal;contextTreeContainer;launcherBtn;launcherDot;dockToggleBtn;sidebarEl;apToggleBtn;apConsole;executionConsole;dotPulseAp;statusTextAp;stopwatchAp;dotPulseAdv;statusTextAdv;stopwatchAdv;inspModel;inspLatency;inspTokens;inspPrompt;inspRationale;inspActions;copyPromptBtn;apiKeyInput;keyContextMenu;keyMoreBtn;modelSelect;modeSelect;engineSelect;dryRunCheckbox;autoApplyCheckbox;autoAdvanceCheckbox;hostDarkModeCheckbox;useVisionCheckbox;analyzeBtn;applyBtn;resultContainer;constructor(e,t){this.initialSettings=e,this.callbacks=t,this.autopilot=new qe({onStatusChange:(n,i,r)=>{this.logToConsole(i,r),n==="analyzing"?this.setBusy(!0,"Autopilot: IA analisando..."):(n==="advancing"||n==="waiting")&&this.setBusy(!1)},onRequestAnalysis:async(n,i)=>{try{return await this.callbacks.onAnalyze(n,i)||null}catch{return null}},isManualModeActive:()=>this.floatingAnswers?.isOpen()??!1,onPageAdvance:()=>{this.floatingAnswers?.hide()}}),this.host=document.createElement("div"),this.host.id="easyquiz-shadow-root",this.host.style.position="fixed",this.host.style.top="0",this.host.style.left="0",this.host.style.width="100vw",this.host.style.height="100vh",this.host.style.zIndex="2147483647",this.host.style.pointerEvents="none",this.shadow=this.host.attachShadow({mode:"open"}),this.shadow.innerHTML=`
      <style>${vt}</style>

      <!-- Bot\xE3o Flutuante Inferior Renovado (C\xE1psula com Status ao Vivo) -->
      <button class="eq-launcher" type="button" title="Abrir / Recolher EasyQuiz (Alt+Q)">
        <span class="eq-launcher-icon">${E.logo}</span>
        <span>EasyQuiz</span>
        <span class="eq-launcher-dot" id="eq-launcher-dot"></span>
      </button>

      <!-- Sidebar Fixa Lateral Direita Estilo VS Code -->
      <aside class="eq-sidebar" aria-label="EasyQuiz Sidebar">
        <!-- Aba Retr\xE1til na Borda Esquerda -->
        <button class="eq-dock-toggle" id="eq-dock-toggle" type="button" title="Recolher / Expandir Painel (Alt+Q)">
          <span class="eq-dock-toggle-icon">${E.chevronRight}</span>
          <span class="eq-dock-toggle-label">EQ</span>
        </button>
           <!-- Activity Bar Vertical na Esquerda (Estilo VS Code - Apenas \xCDcones) -->
          <nav class="eq-activity-bar" role="tablist" aria-label="Atalhos">
            <div class="eq-activity-top">
              <button class="eq-activity-btn active" id="eq-tab-resolver" role="tab" title="Resolver (Opera\xE7\xF5es Atuais)">
                <span class="eq-activity-indicator"></span>
                <span class="eq-activity-icon">${E.rocket}</span>
              </button>

              <button class="eq-activity-btn" id="eq-tab-brain" role="tab" title="C\xE9rebro da IA (Contexto e Inspe\xE7\xE3o)">
                <span class="eq-activity-indicator"></span>
                <span class="eq-activity-icon">${E.chip}</span>
              </button>

              <button class="eq-activity-btn" id="eq-tab-debug" role="tab" title="Terminal & Debug Output (Logs, Tokens, Prompts, Erros)">
                <span class="eq-activity-indicator"></span>
                <span class="eq-activity-icon">${E.terminal}</span>
              </button>
            </div>

            <div class="eq-activity-bottom">
              <button class="eq-activity-btn" id="eq-tab-settings" role="tab" title="Configura\xE7\xF5es e Ajustes Avan\xE7ados">
                <span class="eq-activity-indicator"></span>
                <span class="eq-activity-icon">${E.settings}</span>
              </button>
            </div>
          </nav>

          <!-- Corpo Principal da Sidebar -->
          <main class="eq-sidebar-body">
            <!-- Cabe\xE7alho VS Code -->
            <header class="eq-header">
              <div class="eq-brand">
                <span class="eq-brand-icon">${E.logo}</span>
                <span class="eq-brand-name">EasyQuiz</span>
                <span class="eq-brand-badge">2.0 SUPREME</span>
              </div>
              <div class="eq-header-tools">
                <button class="eq-icon-btn" id="eq-min-btn" type="button" title="Minimizar (Alt+Q)">${E.chevronRight}</button>
                <button class="eq-icon-btn" id="eq-close-btn" type="button" title="Fechar">${E.close}</button>
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
                  <button class="eq-btn-primary" id="eq-analyze-btn" type="button">${E.analyze} Analisar quest\xE3o</button>
                  <button class="eq-btn-secondary" id="eq-apply-btn" type="button">${E.apply} Aplicar respostas</button>
                </div>

                <div style="display: flex; gap: 8px; width: 100%; align-items: center;">
                  <button class="eq-btn-primary" id="eq-ap-toggle-btn" type="button" style="flex: 1;">
                    ${E.play} INICIAR AUTOPILOT
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
                  <button class="eq-btn-secondary" id="eq-open-hud-btn" type="button">${E.list} Abrir respostas dispon\xEDveis</button>
                </div>

                <!-- Status & Stopwatch Card -->
                <div class="eq-status-card">
                  <div class="eq-status-card-header">
                    <div class="eq-ai-indicator">
                      <span class="eq-dot-pulse" id="eq-dot-ap"></span>
                      <span>Status da IA</span>
                    </div>
                    <div class="eq-stopwatch" id="eq-stopwatch-ap">
                      ${E.clock} <span>0.00s</span>
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
                      ${E.refresh}
                    </button>
                    <button class="eq-icon-btn" id="eq-ap-clear-memory" type="button" title="Limpar Mem\xF3ria Contextual (RAG)" style="width: 28px; height: 28px; color: #ff5555;">
                      ${E.eraser}
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
                      ${E.copy} Copiar
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
                      ${E.copy}
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
                        ${E.copy}
                      </button>
                      <button class="eq-icon-btn" id="eq-dbg-clear-logs" type="button" title="Limpar Console" style="width: 26px; height: 26px; color: #ff5555;">
                        ${E.eraser}
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
                        ${E.copy} Copiar
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
                      ${E.copy} Copiar JSON
                    </button>
                  </div>
                  <div class="eq-code-block" id="eq-dbg-context-view" style="max-height: 110px;">Aguardando captura de contexto...</div>
                </div>

                <!-- Resposta Bruta da IA -->
                <div class="eq-field-group">
                  <div class="eq-section-title">
                    <span>Resposta Bruta da IA (Raw Output)</span>
                    <button class="eq-btn-secondary" id="eq-dbg-copy-raw-resp" type="button" style="height: 24px; padding: 0 6px; font-size: 10px;">
                      ${E.copy} Copiar Resposta
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
                      <span class="eq-input-prefix-icon">${E.key}</span>
                      <input id="eq-api-key" class="eq-input" type="password" placeholder="Cole sua chave AIzaSy..." autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" />
                      <button class="eq-icon-btn" id="eq-key-save" type="button" title="Salvar Chave">${E.save}</button>
                      <button class="eq-icon-btn" id="eq-key-more-btn" type="button" title="Mais Op\xE7\xF5es da Chave">${E.moreVertical}</button>
                    </div>

                    <!-- Context Menu Suspenso Din\xE2mico -->
                    <div class="eq-context-menu" id="eq-key-context-menu" hidden>
                      <button class="eq-context-item" id="eq-menu-prompt" type="button">
                        <span class="eq-item-icon">${E.edit}</span>
                        <span class="eq-item-text">Inserir via Janela Nativa</span>
                        <span class="eq-item-badge">Bypass</span>
                      </button>
                      <button class="eq-context-item" id="eq-menu-paste" type="button">
                        <span class="eq-item-icon">${E.paste}</span>
                        <span class="eq-item-text">Colar da \xC1rea de Transfer\xEAncia</span>
                      </button>
                      <button class="eq-context-item" id="eq-menu-toggle-vis" type="button">
                        <span class="eq-item-icon" id="eq-menu-vis-icon">${E.eye}</span>
                        <span class="eq-item-text" id="eq-menu-vis-text">Mostrar Chave</span>
                      </button>
                      <button class="eq-context-item" id="eq-menu-clear" type="button">
                        <span class="eq-item-icon">${E.eraser}</span>
                        <span class="eq-item-text">Limpar Campo</span>
                      </button>
                      <div class="eq-context-divider"></div>
                      <button class="eq-context-item" id="eq-menu-test" type="button">
                        <span class="eq-item-icon">${E.key}</span>
                        <span class="eq-item-text">Testar Conex\xE3o no Google</span>
                      </button>
                      <button class="eq-context-item danger" id="eq-menu-reset" type="button">
                        <span class="eq-item-icon">${E.trash}</span>
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
                    ${E.trash} Resetar Todos os Dados e Mem\xF3ria
                  </button>
                </div>

                <div class="eq-footer-note" style="margin-top: auto;">Configura\xE7\xF5es salvas localmente no navegador</div>
              </div>
            </div>
          </main>
        </aside>
    `,this.launcherBtn=this.shadow.querySelector(".eq-launcher"),this.launcherDot=this.shadow.querySelector("#eq-launcher-dot"),this.dockToggleBtn=this.shadow.querySelector("#eq-dock-toggle"),this.sidebarEl=this.shadow.querySelector(".eq-sidebar"),this.apToggleBtn=this.shadow.querySelector("#eq-ap-toggle-btn"),this.apConsole=this.shadow.querySelector("#eq-ap-console"),this.executionConsole=this.shadow.querySelector("#eq-execution-console"),this.progressContainer=this.shadow.querySelector("#eq-progress-container"),this.progressBar=this.shadow.querySelector("#eq-progress-bar"),this.progressLabel=this.shadow.querySelector("#eq-progress-label"),this.progressVal=this.shadow.querySelector("#eq-progress-val"),this.contextTreeContainer=this.shadow.querySelector("#eq-tree-container"),this.dotPulseAp=this.shadow.querySelector("#eq-dot-ap"),this.statusTextAp=this.shadow.querySelector("#eq-status-text-ap"),this.stopwatchAp=this.shadow.querySelector("#eq-stopwatch-ap span"),this.dotPulseAdv=this.dotPulseAp,this.statusTextAdv=this.statusTextAp,this.stopwatchAdv=this.stopwatchAp,this.inspModel=this.shadow.querySelector("#eq-insp-model"),this.inspLatency=this.shadow.querySelector("#eq-insp-latency"),this.inspTokens=this.shadow.querySelector("#eq-insp-tokens"),this.inspPrompt=this.shadow.querySelector("#eq-insp-prompt"),this.inspRationale=this.shadow.querySelector("#eq-insp-rationale"),this.inspActions=this.shadow.querySelector("#eq-insp-actions"),this.copyPromptBtn=this.shadow.querySelector("#eq-copy-prompt-btn"),this.liveDebugTerminal=this.shadow.querySelector("#eq-live-debug-terminal"),this.dbgModel=this.shadow.querySelector("#eq-dbg-model"),this.dbgLatency=this.shadow.querySelector("#eq-dbg-latency"),this.dbgSplitTokens=this.shadow.querySelector("#eq-dbg-split-tokens"),this.dbgTotalTokens=this.shadow.querySelector("#eq-dbg-total-tokens"),this.dbgErrorCard=this.shadow.querySelector("#eq-dbg-error-card"),this.dbgErrorText=this.shadow.querySelector("#eq-dbg-error-text"),this.dbgPromptLen=this.shadow.querySelector("#eq-dbg-prompt-len"),this.dbgPromptView=this.shadow.querySelector("#eq-dbg-prompt-view"),this.dbgContextView=this.shadow.querySelector("#eq-dbg-context-view"),this.dbgRawRespView=this.shadow.querySelector("#eq-dbg-raw-resp-view"),this.dbgCountAll=this.shadow.querySelector("#eq-dbg-count-all"),this.dbgCountError=this.shadow.querySelector("#eq-dbg-count-error"),this.dbgCountAi=this.shadow.querySelector("#eq-dbg-count-ai"),this.dbgCountDom=this.shadow.querySelector("#eq-dbg-count-dom"),this.apiKeyInput=this.shadow.querySelector("#eq-api-key"),this.keyContextMenu=this.shadow.querySelector("#eq-key-context-menu"),this.keyMoreBtn=this.shadow.querySelector("#eq-key-more-btn"),this.modelSelect=this.shadow.querySelector("#eq-model-select"),this.modeSelect=this.shadow.querySelector("#eq-mode-select"),this.engineSelect=this.shadow.querySelector("#eq-engine-select"),this.dryRunCheckbox=this.shadow.querySelector("#eq-dry-run"),this.autoApplyCheckbox=this.shadow.querySelector("#eq-auto-apply"),this.autoAdvanceCheckbox=this.shadow.querySelector("#eq-auto-advance"),this.hostDarkModeCheckbox=this.shadow.querySelector("#eq-host-dark"),this.useVisionCheckbox=this.shadow.querySelector("#eq-use-vision"),this.analyzeBtn=this.shadow.querySelector("#eq-analyze-btn"),this.applyBtn=this.shadow.querySelector("#eq-apply-btn"),this.resultContainer=this.shadow.querySelector("#eq-result"),this.floatingAnswers=new Te(this.shadow,()=>{this.callbacks.onAnalyze(1)});let a=this.shadow.querySelector("#eq-open-hud-btn");a&&a.addEventListener("click",()=>{this.latestPlan&&this.floatingAnswers.show(this.latestPlan)}),J.forEach(n=>this.modelSelect.add(new Option(n.name,n.id,!1,n.id===e.model))),Ut.forEach(n=>this.modeSelect.add(new Option(n.label,n.value,!1,n.value===e.modeHint))),Qt.forEach(n=>this.engineSelect.add(new Option(n.label,n.value,!1,n.value===e.engine))),this.apiKeyInput.value=e.apiKey,this.dryRunCheckbox.checked=e.dryRun,this.autoApplyCheckbox.checked=e.autoApply,this.autoAdvanceCheckbox.checked=e.autoAdvance,this.hostDarkModeCheckbox.checked=e.hostDarkMode,this.useVisionCheckbox.checked=e.useVision,this.setupEventListeners(),document.body.appendChild(this.host),this.applyHostDarkMode(e.hostDarkMode),e.apiKey&&ge(e.apiKey).then(n=>{n&&n.length>0&&this.updateModelSelect(n,e.model)}).catch(()=>{})}switchTab(e){this.activeTab=e;let t=["resolver","brain","debug","settings"];for(let a of t){let n=this.shadow.querySelector(`#eq-tab-${a}`),i=this.shadow.querySelector(`#eq-view-${a}`);a===e?(n?.classList.add("active"),i&&(i.style.display="flex")):(n?.classList.remove("active"),i&&(i.style.display="none"))}e==="brain"?(this.renderContextTree(),this.refreshInspectorView()):e==="debug"&&(this.refreshDebugView(),this.renderTerminalEntries())}setupEventListeners(){this.shadow.querySelector("#eq-tab-resolver")?.addEventListener("click",()=>this.switchTab("resolver")),this.shadow.querySelector("#eq-tab-brain")?.addEventListener("click",()=>this.switchTab("brain")),this.shadow.querySelector("#eq-tab-debug")?.addEventListener("click",()=>this.switchTab("debug")),this.shadow.querySelector("#eq-tab-settings")?.addEventListener("click",()=>this.switchTab("settings")),this.shadow.querySelector("#eq-dbg-filter-all")?.addEventListener("click",()=>this.setLogFilter("all")),this.shadow.querySelector("#eq-dbg-filter-error")?.addEventListener("click",()=>this.setLogFilter("error")),this.shadow.querySelector("#eq-dbg-filter-ai")?.addEventListener("click",()=>this.setLogFilter("ai")),this.shadow.querySelector("#eq-dbg-filter-dom")?.addEventListener("click",()=>this.setLogFilter("dom"));let e=this.shadow.querySelector("#eq-dbg-scroll-toggle");e?.addEventListener("click",()=>{this.autoScrollLogs=!this.autoScrollLogs,e&&(e.style.color=this.autoScrollLogs?"#00ffcc":"#858585",e.title=this.autoScrollLogs?"Auto-Scroll Ligado (Clique para desligar)":"Auto-Scroll Desligado (Clique para ligar)"),this.autoScrollLogs&&this.liveDebugTerminal&&(this.liveDebugTerminal.scrollTop=this.liveDebugTerminal.scrollHeight)});let t=this.shadow.querySelector("#eq-dbg-copy-logs");t?.addEventListener("click",()=>{let c=this.getFormattedLogs();navigator.clipboard.writeText(c).then(()=>{let h=t.innerHTML;t.innerHTML=E.check,setTimeout(()=>t.innerHTML=h,1800)})}),this.shadow.querySelector("#eq-dbg-clear-logs")?.addEventListener("click",()=>{this.clearLogs()});let a=this.shadow.querySelector("#eq-dbg-copy-prompt");a?.addEventListener("click",()=>{let c=this.latestPromptText||this.latestPlan?.promptSent||"";navigator.clipboard.writeText(c).then(()=>{let h=a.innerHTML;a.innerHTML=`${E.check} Copiado!`,setTimeout(()=>a.innerHTML=h,1800)})});let n=this.shadow.querySelector("#eq-dbg-copy-context");n?.addEventListener("click",()=>{let c=this.dbgContextView?.textContent||"";navigator.clipboard.writeText(c).then(()=>{let h=n.innerHTML;n.innerHTML=`${E.check} Copiado!`,setTimeout(()=>n.innerHTML=h,1800)})});let i=this.shadow.querySelector("#eq-dbg-copy-raw-resp");i?.addEventListener("click",()=>{let c=this.latestPlan?.rawResponse||this.dbgRawRespView?.textContent||"";navigator.clipboard.writeText(c).then(()=>{let h=i.innerHTML;i.innerHTML=`${E.check} Copiado!`,setTimeout(()=>i.innerHTML=h,1800)})});let r=this.shadow.querySelector("#eq-dbg-copy-error-btn");r?.addEventListener("click",()=>{let c=this.lastErrorMsg||"";navigator.clipboard.writeText(c).then(()=>{let h=r.innerHTML;r.innerHTML=E.check,setTimeout(()=>r.innerHTML=h,1800)})}),this.shadow.querySelector("#eq-refresh-context-btn")?.addEventListener("click",()=>{this.renderContextTree()}),this.launcherBtn.addEventListener("click",()=>this.toggle()),this.dockToggleBtn.addEventListener("click",()=>this.toggle()),this.shadow.querySelector("#eq-min-btn")?.addEventListener("click",()=>this.toggle(!1)),this.shadow.querySelector("#eq-close-btn")?.addEventListener("click",()=>this.toggle(!1)),window.addEventListener("keydown",c=>{c.altKey&&(c.key==="q"||c.key==="Q")&&(c.preventDefault(),this.toggle())},!0);let s=c=>{let h=c.composedPath();(h.includes(this.sidebarEl)||h.includes(this.host))&&c.stopImmediatePropagation()};window.addEventListener("keydown",s,!0),window.addEventListener("keyup",s,!0),window.addEventListener("keypress",s,!0),this.apiKeyInput.addEventListener("input",()=>{let c=this.apiKeyInput.value.trim().replace(/^["']|["']$/g,"");this.callbacks.onSettingsChange({apiKey:c})}),this.shadow.querySelector("#eq-key-save").addEventListener("click",()=>{let c=this.apiKeyInput.value.trim().replace(/^["']|["']$/g,"");this.apiKeyInput.value=c,this.callbacks.onSettingsChange({apiKey:c}),this.setStatus("Chave Gemini salva com sucesso!","success"),this.keyContextMenu.hidden=!0}),this.keyMoreBtn.addEventListener("click",c=>{c.stopPropagation(),this.keyContextMenu.hidden=!this.keyContextMenu.hidden}),this.shadow.addEventListener("click",c=>{let h=c.target;!h.closest("#eq-key-context-menu")&&!h.closest("#eq-key-more-btn")&&(this.keyContextMenu.hidden=!0)}),this.shadow.querySelector("#eq-menu-prompt")?.addEventListener("click",()=>{this.keyContextMenu.hidden=!0;let c=this.apiKeyInput.value.trim(),h=window.prompt("Cole sua Chave API do Google Gemini (AI Studio):",c);if(h!==null){let g=h.trim().replace(/^["']|["']$/g,"");this.apiKeyInput.value=g,this.callbacks.onSettingsChange({apiKey:g}),this.setStatus("Chave Gemini inserida e salva com sucesso!","success")}}),this.shadow.querySelector("#eq-menu-paste")?.addEventListener("click",async()=>{this.keyContextMenu.hidden=!0;try{let c=await navigator.clipboard.readText();if(c){let h=c.trim().replace(/^["']|["']$/g,"");this.apiKeyInput.value=h,this.callbacks.onSettingsChange({apiKey:h}),this.setStatus("Chave colada e salva com sucesso!","success")}}catch{let c=this.apiKeyInput.value.trim(),h=window.prompt("Cole sua Chave API do Google Gemini (AI Studio):",c);if(h!==null){let g=h.trim().replace(/^["']|["']$/g,"");this.apiKeyInput.value=g,this.callbacks.onSettingsChange({apiKey:g}),this.setStatus("Chave Gemini inserida e salva com sucesso!","success")}}}),this.shadow.querySelector("#eq-menu-toggle-vis")?.addEventListener("click",()=>{this.keyContextMenu.hidden=!0;let c=this.apiKeyInput.type==="password";this.apiKeyInput.type=c?"text":"password";let h=this.shadow.querySelector("#eq-menu-vis-icon"),g=this.shadow.querySelector("#eq-menu-vis-text");h&&(h.innerHTML=c?E.eyeOff:E.eye),g&&(g.textContent=c?"Ocultar Chave":"Mostrar Chave")}),this.shadow.querySelector("#eq-menu-clear")?.addEventListener("click",()=>{this.keyContextMenu.hidden=!0,this.apiKeyInput.value="",this.callbacks.onSettingsChange({apiKey:""}),this.setStatus("Campo limpo. Cole a nova chave e clique em Salvar.","info"),this.apiKeyInput.focus()}),this.shadow.querySelector("#eq-menu-test")?.addEventListener("click",async()=>{this.keyContextMenu.hidden=!0;let c=this.apiKeyInput.value.trim().replace(/^["']|["']$/g,"");if(!c)return this.setStatus("Insira ou cole a chave de API.","error");this.setStatus("Testando chave e descobrindo modelos autorizados...","info");try{let h=await it(c);this.setStatus(h.message,h.ok?"success":"error"),h.ok&&h.models&&h.models.length>0&&this.updateModelSelect(h.models)}catch(h){this.setStatus("Erro ao validar chave: "+h.message,"error")}});let d=()=>{this.keyContextMenu.hidden=!0,window.confirm("Deseja realmente resetar todos os dados, chaves e mem\xF3ria de sess\xE3o do EasyQuiz?")&&(We(),this.apiKeyInput.value="",this.callbacks.onSettingsChange({apiKey:""}),this.setStatus("Todos os dados do EasyQuiz foram limpos.","info"),this.logToConsole("> [SYS] Armazenamento local resetado.","text-yellow"))};this.shadow.querySelector("#eq-menu-reset")?.addEventListener("click",d),this.shadow.querySelector("#eq-reset-all-btn")?.addEventListener("click",d),this.apToggleBtn.addEventListener("click",()=>{if(this.autopilot.isActive())this.autopilot.stop(),this.callbacks.onCancel?.(),this.setBusy(!1),this.setProgress(0),this.apToggleBtn.innerHTML=`${E.play} INICIAR AUTOPILOT`,this.apToggleBtn.classList.remove("danger"),this.stopStopwatch(),this.setStatus("Autopilot interrompido imediatamente pelo usu\xE1rio.","info");else{if(!this.apiKeyInput.value.trim().replace(/^["']|["']$/g,"")){this.setStatus("Configure sua chave de API Gemini na aba Configura\xE7\xF5es antes de ligar o Autopilot.","error"),this.switchTab("settings"),this.apiKeyInput.focus();return}this.callbacks.onSettingsChange({autoApply:!0,autoAdvance:!0}),this.autoApplyCheckbox.checked=!0,this.autoAdvanceCheckbox.checked=!0,this.autopilot.start(),this.apToggleBtn.innerHTML=`${E.stop} PARAR AUTOPILOT`,this.apToggleBtn.classList.add("danger"),this.startStopwatch(),this.setStatus("Autopilot ativo. Monitorando exerc\xEDcios...","info")}}),this.shadow.querySelector("#eq-ap-clear-memory").addEventListener("click",()=>{Me(),this.logToConsole("> [SYS] Mem\xF3ria contextual limpa com sucesso.","text-green"),this.setStatus("Mem\xF3ria contextual da sess\xE3o limpa.","success")});let u=this.shadow.querySelector("#eq-copy-console-btn");u?.addEventListener("click",()=>{let c=this.apConsole?.innerText||"";navigator.clipboard.writeText(c).then(()=>{let h=u.innerHTML;u.innerHTML=E.check,setTimeout(()=>u.innerHTML=h,1800)})}),this.copyPromptBtn.addEventListener("click",()=>{let c=this.inspPrompt.textContent||"";navigator.clipboard.writeText(c).then(()=>{let h=this.copyPromptBtn.innerHTML;this.copyPromptBtn.innerHTML=`${E.check} Copiado!`,setTimeout(()=>this.copyPromptBtn.innerHTML=h,2e3)})}),this.modelSelect.addEventListener("change",()=>this.callbacks.onSettingsChange({model:this.modelSelect.value})),this.modeSelect.addEventListener("change",()=>this.callbacks.onSettingsChange({modeHint:this.modeSelect.value})),this.engineSelect.addEventListener("change",()=>this.callbacks.onSettingsChange({engine:this.engineSelect.value})),this.dryRunCheckbox.addEventListener("change",()=>this.callbacks.onSettingsChange({dryRun:this.dryRunCheckbox.checked})),this.autoApplyCheckbox.addEventListener("change",()=>this.callbacks.onSettingsChange({autoApply:this.autoApplyCheckbox.checked})),this.autoAdvanceCheckbox.addEventListener("change",()=>this.callbacks.onSettingsChange({autoAdvance:this.autoAdvanceCheckbox.checked})),this.useVisionCheckbox.addEventListener("change",()=>{let c=this.useVisionCheckbox.checked;this.callbacks.onSettingsChange({useVision:c}),this.setStatus(c?"Vis\xE3o Computacional ativada (capturas habilitadas).":"Modo DOM R\xE1pido ativado (capturas desabilitadas).","info")}),this.hostDarkModeCheckbox.addEventListener("change",()=>{let c=this.hostDarkModeCheckbox.checked;this.callbacks.onSettingsChange({hostDarkMode:c}),this.applyHostDarkMode(c)}),this.analyzeBtn.addEventListener("click",async()=>{await this.callbacks.onAnalyze()&&!this.dryRunCheckbox.checked&&!this.autoApplyCheckbox.checked&&this.callbacks.onApply()}),this.applyBtn.addEventListener("click",()=>this.callbacks.onApply())}startStopwatch(){this.stopStopwatch(),this.stopwatchStartTime=Date.now();let e=()=>{let t=((Date.now()-this.stopwatchStartTime)/1e3).toFixed(2)+"s";this.stopwatchAp.textContent=t,this.stopwatchAdv.textContent=t};e(),this.stopwatchInterval=setInterval(e,100)}stopStopwatch(e){if(this.stopwatchInterval&&(clearInterval(this.stopwatchInterval),this.stopwatchInterval=null),e!==void 0){let t=(e/1e3).toFixed(2)+"s";this.stopwatchAp.textContent=t,this.stopwatchAdv.textContent=t}}setLogFilter(e){this.activeLogFilter=e;let t=["all","error","ai","dom"];for(let a of t){let n=this.shadow.querySelector(`#eq-dbg-filter-${a}`);a===e?n?.classList.add("active"):n?.classList.remove("active")}this.renderTerminalEntries()}updateLogCounters(){let e=0,t=0,a=0;for(let n of this.logEntries)n.category==="error"?e++:n.category==="ai"?t++:n.category==="dom"&&a++;this.dbgCountAll&&(this.dbgCountAll.textContent=String(this.logEntries.length)),this.dbgCountError&&(this.dbgCountError.textContent=String(e)),this.dbgCountAi&&(this.dbgCountAi.textContent=String(t)),this.dbgCountDom&&(this.dbgCountDom.textContent=String(a))}renderTerminalEntries(){if(!this.liveDebugTerminal)return;this.liveDebugTerminal.replaceChildren();let e=this.activeLogFilter==="all"?this.logEntries:this.logEntries.filter(t=>t.category===this.activeLogFilter);if(e.length===0){let t=document.createElement("div");t.className="text-muted",t.textContent=`Nenhum log encontrado para o filtro "${this.activeLogFilter.toUpperCase()}".`,this.liveDebugTerminal.appendChild(t);return}for(let t of e){let a=document.createElement("div");a.textContent=t.message,t.colorClass&&(a.className=t.colorClass),this.liveDebugTerminal.appendChild(a)}this.autoScrollLogs&&(this.liveDebugTerminal.scrollTop=this.liveDebugTerminal.scrollHeight)}clearLogs(){if(this.logEntries=[],this.updateLogCounters(),this.liveDebugTerminal){this.liveDebugTerminal.replaceChildren();let e=document.createElement("div");e.className="text-blue",e.textContent="> [SYS] Console de logs limpo pelo usu\xE1rio.",this.liveDebugTerminal.appendChild(e)}this.apConsole&&this.apConsole.replaceChildren(),this.executionConsole&&this.executionConsole.replaceChildren()}getFormattedLogs(){return(this.activeLogFilter==="all"?this.logEntries:this.logEntries.filter(t=>t.category===this.activeLogFilter)).map(t=>t.message).join(`
`)}setLastError(e){this.lastErrorMsg=e,this.dbgErrorCard&&this.dbgErrorText&&(this.dbgErrorText.textContent=e,this.dbgErrorCard.style.display="flex")}setErrorDiagnostic(e,t){let a=t?`[${t}] ${e}`:e;this.setLastError(a)}refreshDebugView(){let e=this.latestPlan,t=this.latestContext,a=this.latestPromptText||e?.promptSent||"";if(this.dbgModel&&(this.dbgModel.textContent=e?.usedModel||this.initialSettings.model||"--"),this.dbgLatency&&(this.dbgLatency.textContent=e?.durationMs?`${e.durationMs}ms`:"--"),this.dbgSplitTokens){let n=e?.promptTokens!==void 0?String(e.promptTokens):"--",i=e?.candidatesTokens!==void 0?String(e.candidatesTokens):"--";this.dbgSplitTokens.textContent=`${n} / ${i}`,this.dbgSplitTokens.title=`Prompt: ${n} tokens | Resposta: ${i} tokens`}if(this.dbgTotalTokens){let n=e?.tokensUsed??(e?.promptTokens&&e?.candidatesTokens?e.promptTokens+e.candidatesTokens:void 0);this.dbgTotalTokens.textContent=n!==void 0?`${n}`:"--"}if(this.dbgPromptLen){let n=a.length,i=Math.round(n/4);this.dbgPromptLen.textContent=`${n} chars (~${i} tokens est.)`}if(this.dbgPromptView&&(this.dbgPromptView.textContent=a||"Nenhum prompt enviado at\xE9 o momento."),this.dbgContextView)if(t){let n={scope:`${t.scope.tagName.toLowerCase()}${t.scope.id?"#"+t.scope.id:""}${t.scope.className?"."+t.scope.className.split(" ").join("."):""}`,questionLength:t.questionText.length,questionSnippet:t.questionText.slice(0,150)+(t.questionText.length>150?"...":""),controlsCount:t.controls.length,controls:t.controls.map((i,r)=>({index:r+1,tag:i.tag,type:i.type,name:i.name||void 0,id:i.id||void 0,value:i.value||void 0,label:i.label||void 0,role:i.role}))};this.dbgContextView.textContent=JSON.stringify(n,null,2)}else this.dbgContextView.textContent="Aguardando captura de contexto pelo EasyQuiz...";this.dbgRawRespView&&(e?e.rawResponse?this.dbgRawRespView.textContent=e.rawResponse:this.dbgRawRespView.textContent=JSON.stringify({pageType:e.pageType,mode:e.mode,confidence:e.confidence,rationale:e.rationale,actions:e.actions},null,2):this.dbgRawRespView.textContent="Aguardando retorno da API Gemini..."),this.lastErrorMsg&&this.dbgErrorCard&&this.dbgErrorText&&(this.dbgErrorText.textContent=this.lastErrorMsg,this.dbgErrorCard.style.display="flex")}logToConsole(e,t){let a=new Date,n=`${String(a.getHours()).padStart(2,"0")}:${String(a.getMinutes()).padStart(2,"0")}:${String(a.getSeconds()).padStart(2,"0")}.${String(Math.floor(a.getMilliseconds()/100))}`,i=e;e.startsWith(">")?i=`> [${n}] ${e.slice(1).trim()}`:i=`[${n}] ${e}`;let r="all";t==="text-red"||i.includes("[ERRO]")||i.includes("Falha")||i.includes("Error")?r="error":i.includes("[IA]")||i.includes("[RAG]")||i.includes("Tokens")||i.includes("Gemini")||i.includes("Modelo:")?r="ai":(i.includes("[DOM]")||i.includes("[EXEC]")||i.includes("[VERIF]")||i.includes("[NAV]"))&&(r="dom");let s={id:Date.now()+Math.random(),timestamp:n,message:i,colorClass:t,category:r};for(this.logEntries.push(s);this.logEntries.length>250;)this.logEntries.shift();if(this.updateLogCounters(),r==="error"&&this.setLastError(i),this.liveDebugTerminal&&(this.activeLogFilter==="all"||this.activeLogFilter===r)){let l=document.createElement("div");for(l.textContent=i,t&&(l.className=t),this.liveDebugTerminal.appendChild(l);this.liveDebugTerminal.children.length>250;)this.liveDebugTerminal.removeChild(this.liveDebugTerminal.firstChild);this.autoScrollLogs&&(this.liveDebugTerminal.scrollTop=this.liveDebugTerminal.scrollHeight)}if(this.apConsole){let l=document.createElement("div");for(l.textContent=i,t&&(l.className=t),this.apConsole.appendChild(l),this.apConsole.scrollTop=this.apConsole.scrollHeight;this.apConsole.children.length>150;)this.apConsole.removeChild(this.apConsole.firstChild)}if(this.executionConsole){let l=document.createElement("div");for(l.textContent=i,t&&(l.className=t),this.executionConsole.appendChild(l),this.executionConsole.scrollTop=this.executionConsole.scrollHeight;this.executionConsole.children.length>150;)this.executionConsole.removeChild(this.executionConsole.firstChild)}}setProgress(e,t){if(!this.progressContainer||!this.progressBar)return;if(e<=0){this.progressContainer.style.display="none",this.progressBar.style.width="0%";return}this.progressContainer.style.display="flex";let a=Math.min(100,Math.max(0,Math.round(e)));this.progressBar.style.width=`${a}%`,this.progressVal&&(this.progressVal.textContent=`${a}%`),t&&this.progressLabel&&(this.progressLabel.textContent=t),a>=100&&setTimeout(()=>{this.progressContainer&&this.progressBar&&this.progressBar.style.width==="100%"&&(this.progressContainer.style.display="none")},1500)}updateContext(e,t){this.latestContext=e,t&&(this.latestPlan=t),this.activeTab==="brain"?(this.renderContextTree(),t&&this.refreshInspectorView()):this.activeTab==="debug"&&this.refreshDebugView()}renderContextTree(){if(!this.contextTreeContainer)return;let e=this.latestContext,t=he(),a=this.latestPlan;this.contextTreeContainer.innerHTML="";let n=this.createTreeFolder("\u{1F4C4} P\xC1GINA & ESCOPO ATUAL",!0,[{label:"T\xEDtulo",value:document.title||"Sem t\xEDtulo"},{label:"URL",value:window.location.pathname||"/"},{label:"Escopo DOM",value:e?`${e.scope.tagName.toLowerCase()}${e.scope.className?"."+e.scope.className.split(" ").join("."):""}`:"Document"},{label:"Tamanho Texto",value:e?`${e.questionText.length} caracteres`:"N\xE3o analisado"},{label:"Trecho Enunciado",value:e?`"${e.questionText.slice(0,120)}..."`:"Nenhum"}]);this.contextTreeContainer.appendChild(n);let i=e?e.controls:[],r=i.map((p,u)=>{let c=p.role==="navigation"||p.type==="button",h=!c&&p.value?` [val: "${p.value}"]`:"";return{label:`[#${u+1}] ${p.type.toUpperCase()}`,value:`${p.label||p.id||p.name||"(Sem r\xF3tulo)"}${h}`.trim(),badge:c?"Navega\xE7\xE3o":p.role||p.type}}),s=this.createTreeFolder(`\u{1F39B}\uFE0F CONTROLES DETECTADOS (${i.length})`,i.length>0,r);this.contextTreeContainer.appendChild(s);let l=t.map((p,u)=>({label:`Mem\xF3ria #${u+1}`,value:p,badge:"RAG"})),d=this.createTreeFolder(`\u{1F9E0} MEM\xD3RIA RAG ACUMULADA (${t.length})`,t.length>0,l);if(this.contextTreeContainer.appendChild(d),a){let p=this.createTreeFolder(`\u{1F916} \xDALTIMO PLANO IA (${a.actions.length} a\xE7\xF5es)`,!0,[{label:"Tipo P\xE1gina",value:a.pageType,badge:`${(a.confidence*100).toFixed(0)}%`},{label:"Modo",value:a.mode},{label:"Racioc\xEDnio",value:a.rationale||"N/A"},...a.actions.map((u,c)=>({label:`A\xE7\xE3o #${c+1} (${u.t})`,value:JSON.stringify(u)}))]);this.contextTreeContainer.appendChild(p)}}createTreeFolder(e,t,a){let n=document.createElement("div");n.className="eq-tree-node";let i=document.createElement("div");i.className="eq-tree-header",i.innerHTML=`<span class="eq-tree-arrow">${t?"\u25BC":"\u25B6"}</span> <span>${e}</span>`;let r=document.createElement("div");if(r.className="eq-tree-content",r.style.display=t?"flex":"none",a.length===0)r.innerHTML='<div class="text-muted" style="padding: 2px 0;">Nenhum item registrado.</div>';else for(let s of a){let l=document.createElement("div");l.className="eq-tree-leaf",l.innerHTML=`
          <strong style="color:#ffffff; min-width: 80px;">${s.label}:</strong>
          <span style="flex:1; word-break: break-word; color:#aaaaaa;">${s.value}</span>
          ${s.badge?`<span class="eq-tree-badge">${s.badge}</span>`:""}
        `,r.appendChild(l)}return i.addEventListener("click",()=>{let s=r.style.display==="none";r.style.display=s?"flex":"none";let l=i.querySelector(".eq-tree-arrow");l&&(l.textContent=s?"\u25BC":"\u25B6")}),n.appendChild(i),n.appendChild(r),n}toggle(e){e!==void 0?this.isCollapsed=!e:this.isCollapsed=!this.isCollapsed,this.isCollapsed?this.sidebarEl.classList.add("eq-collapsed"):(this.sidebarEl.classList.remove("eq-collapsed"),this.apiKeyInput.value||(this.switchTab("settings"),this.apiKeyInput.focus()))}setBusy(e,t){this.analyzeBtn.disabled=e,[this.modelSelect,this.modeSelect,this.engineSelect,this.dryRunCheckbox,this.autoApplyCheckbox,this.autoAdvanceCheckbox,this.useVisionCheckbox].forEach(a=>a.disabled=e),e?(this.startStopwatch(),this.dotPulseAp.className="eq-dot-pulse busy",this.dotPulseAdv.className="eq-dot-pulse busy",this.launcherDot.className="eq-launcher-dot busy",t&&this.setStatus(t,"info")):(this.stopStopwatch(),this.dotPulseAp.className="eq-dot-pulse",this.dotPulseAdv.className="eq-dot-pulse",this.launcherDot.className="eq-launcher-dot")}setStatus(e,t="info"){this.statusTextAp.textContent=e,this.statusTextAdv.textContent=e;let a=this.shadow.querySelector("#eq-operation-state");a&&(a.textContent=t==="error"?"Bloqueado":t==="success"?"Confirmado":this.autopilot.isActive()?"Monitorando":"Pronto",a.className=`eq-operation-state is-${t}`),t==="error"?(this.dotPulseAp.className="eq-dot-pulse error",this.dotPulseAdv.className="eq-dot-pulse error",this.launcherDot.className="eq-launcher-dot error"):t==="success"&&(this.dotPulseAp.className="eq-dot-pulse",this.dotPulseAdv.className="eq-dot-pulse",this.launcherDot.className="eq-launcher-dot");let n=e.includes("Alternando")||e.includes("indispon\xEDvel")||e.includes("fallback")||e.includes("alternativo"),i=t==="error"?"> [ERRO] ":t==="success"?"> [SUCESSO] ":n?"> [FALLBACK] ":"> [SYS] ",r=t==="error"?"text-red":t==="success"?"text-green":n?"text-yellow":"text-blue";this.logToConsole(`${i}${e}`,r)}setPlan(e,t){this.latestPlan=e,this.resultContainer.style.display="flex",e.durationMs&&this.stopStopwatch(e.durationMs);let a=this.shadow.querySelector("#eq-badges");a.replaceChildren();let n=[e.mode.replace("_"," "),`${Math.round(e.confidence*100)}% Confian\xE7a`,`${e.actions.length} a\xE7\xF5es`,...e.usedModel?[e.usedModel]:[]];for(let l of n){let d=document.createElement("span");d.className="eq-brand-badge",d.textContent=l,a.appendChild(d)}let i=this.shadow.querySelector("#eq-rationale-text");i.textContent=e.rationale;let r=this.shadow.querySelector("#eq-actions-list");r.innerHTML="";for(let l of e.actions){let d=document.createElement("div");d.className="eq-action-item";let p="";l.t==="chk"?p=`chk ${l.id} (${l.c})`:l.t==="val"?p=`val "${l.v}" -> ${l.id}`:l.t==="sel"?p=`sel "${Array.isArray(l.v)?l.v.join(","):l.v}" -> ${l.id}`:l.t==="clk"?p=`clk ${l.id}`:l.t==="adv"?p="adv":l.t==="js"?p=`js: ${String(l.v).slice(0,40)}...`:l.t==="drag"&&(p=`drag "${l.from}" -> "${l.to}"`);let u=document.createElement("span");u.className="eq-action-badge",u.textContent=l.t.toUpperCase();let c=document.createElement("span");c.textContent=p,d.append(u,c),r.appendChild(d)}this.applyBtn.disabled=!t||!e.actions.length;let s=this.shadow.querySelector("#eq-execution-card");s&&(s.hidden=!0),this.refreshInspectorView(),this.refreshDebugView()}setExecutionReport(e){let t=this.shadow.querySelector("#eq-execution-card"),a=this.shadow.querySelector("#eq-execution-summary"),n=this.shadow.querySelector("#eq-execution-list");if(!t||!a||!n)return;t.hidden=!1,a.textContent=e.navigationVerified?`${e.verified}/${e.applied} a\xE7\xF5es verificadas. Navega\xE7\xE3o confirmada.`:`${e.verified}/${e.applied} a\xE7\xF5es verificadas. ${e.navigationEvidence}`,a.className=`eq-execution-summary ${e.success?"is-success":"is-warning"}`,n.replaceChildren();let i=this.shadow.querySelector("#eq-execution-placeholder");i&&(i.textContent=e.navigationVerified?"Fluxo conclu\xEDdo: aplica\xE7\xE3o e navega\xE7\xE3o confirmadas.":`Fluxo interrompido: ${e.navigationEvidence}`,i.className=`eq-execution-placeholder ${e.success?"is-success":"is-warning"}`);for(let r of e.reports){let s=document.createElement("div");s.className=`eq-execution-row ${r.verified?"is-success":"is-failed"}`;let l=document.createElement("span");l.className="eq-execution-state",l.textContent=r.verified?"OK":"FALHOU";let d=document.createElement("div");d.className="eq-execution-details";let p=document.createElement("strong");p.textContent=r.target;let u=document.createElement("span");if(u.textContent=`${r.strategy} | ${r.evidence}`,d.append(p,u),s.append(l,d),r.error){let c=document.createElement("small");c.textContent=r.error,s.appendChild(c)}n.appendChild(s)}}setInspectorPrompt(e,t){this.latestPromptText=e,this.inspPrompt&&(this.inspPrompt.textContent=e),t&&this.inspModel&&(this.inspModel.textContent=t),this.inspLatency&&(this.inspLatency.textContent="Aguardando IA..."),this.activeTab==="debug"&&this.refreshDebugView()}refreshInspectorView(){let e=this.latestPlan;if(e)if(this.inspModel.textContent=e.usedModel||this.initialSettings.model,this.inspLatency.textContent=e.durationMs?`${e.durationMs}ms`:"--",this.inspTokens.textContent=e.tokensUsed?`${e.tokensUsed}`:"--",this.inspPrompt.textContent=e.promptSent||this.latestPromptText||"Prompt n\xE3o registrado para esta requisi\xE7\xE3o.",this.inspRationale.textContent=e.rationale,this.inspActions.innerHTML="",e.actions.length>0)for(let t of e.actions){let a=document.createElement("div");a.className="eq-action-item",a.textContent=JSON.stringify(t),this.inspActions.appendChild(a)}else this.inspActions.innerHTML='<div class="text-muted" style="padding: 4px;">Nenhuma a\xE7\xE3o prescrita pela IA.</div>';else this.latestPromptText&&(this.inspPrompt.textContent=this.latestPromptText)}showFloatingAnswers(e){let t=e||this.latestPlan;t&&this.floatingAnswers.show(t)}hideFloatingAnswers(){this.floatingAnswers.hide()}isFloatingAnswersOpen(){return this.floatingAnswers.isOpen()}updateModelSelect(e,t){let a=t||this.initialSettings.model||this.modelSelect.value;this.modelSelect.innerHTML="";let n=!1;e.forEach(i=>{let r=i.id===a;r&&(n=!0),this.modelSelect.add(new Option(i.name,i.id,!1,r))}),!n&&a&&this.modelSelect.add(new Option(`Gemini (${a})`,a,!1,!0)),this.modelSelect.value=a}updateSelectedModel(e){Array.from(this.modelSelect.options).some(a=>a.value===e)||this.modelSelect.add(new Option(`Gemini (${e})`,e,!1,!0)),this.modelSelect.value=e}applyHostDarkMode(e){document.getElementById("eq-host-dark-mode-style")?.remove(),this.host.classList.toggle("eq-dark-mode-active",e)}destroy(){this.stopStopwatch(),this.autopilot.stop(),this.applyHostDarkMode(!1),this.callbacks.onDestroy(),this.host.remove()}};function Kt(){try{if(typeof document>"u"||!document.head||document.querySelector("link[data-easyquiz-preconnect]"))return;let o=document.createElement("link");o.rel="preconnect",o.href="https://generativelanguage.googleapis.com",o.crossOrigin="anonymous",o.setAttribute("data-easyquiz-preconnect","true"),document.head.appendChild(o);let e=document.createElement("link");e.rel="dns-prefetch",e.href="https://generativelanguage.googleapis.com",e.setAttribute("data-easyquiz-preconnect","true"),document.head.appendChild(e)}catch{}}async function Yt(){let o=window;if(Kt(),o.__easyquiz){o.__easyquiz.toggle();return}let e=Se(),t=null,a=null,n=new Ce(e,{onAnalyze:(s=1,l)=>i(s,l),onApply:(s=1)=>void r(s),onDestroy:()=>{if(a){try{a.abort()}catch{}a=null}W(),delete o.__easyquiz},onCancel:()=>{if(a){try{a.abort()}catch{}a=null}W(),n.setBusy(!1),n.setProgress(0),n.logToConsole("> [SYS] Opera\xE7\xE3o cancelada imediatamente pelo usu\xE1rio.","text-yellow")},onSettingsChange:s=>{e=Ze(s)}});o.__easyquiz={toggle:()=>n.toggle(),destroy:()=>n.destroy(),analyze:async()=>{await i()}},window.addEventListener("keydown",s=>{if(s.altKey&&(s.key==="q"||s.key==="Q")){if(s.preventDefault(),!n)return;n.toggle(!0),i()}});async function i(s=1,l){if(!e.apiKey){n.setStatus("Configure sua chave de API Gemini acima para come\xE7ar.","error"),n.toggle(!0);return}if(a)try{a.abort()}catch{}a=new AbortController;let d=a,p=()=>{try{d.abort()}catch{}};if(l&&(l.aborted?d.abort():l.addEventListener("abort",p,{once:!0})),d.signal.aborted){n.setBusy(!1),n.setProgress(0);return}n.setBusy(!0,"Identificando o bloco da quest\xE3o ativa na p\xE1gina..."),n.setProgress(20,"Varrendo escopo do DOM e controles..."),W(),n.hideFloatingAnswers();try{let u=de(!1);u||(n.setStatus("Nenhum controle detectado. Tentando captura de tela inteira...","info"),u=oe()),Fe(u.scope),n.updateContext(u),n.logToConsole(`> [DOM] Escopo: <${u.scope.tagName.toLowerCase()}> com ${u.controls.length} controle(s) e ${u.questionText.length} caracteres.`,"text-blue"),n.setStatus(`Quest\xE3o localizada (${u.controls.length} controles). Preparando an\xE1lise...`,"info"),n.setProgress(40,`Consultando Gemini (${e.model})...`);let c=await Ye(u.scope,e.useVision);if(c.length>0){let m=c.map(b=>b.element).filter(Boolean);je(m)}if(d.signal.aborted)return;n.setStatus(c.length>0?`Consultando Gemini (${e.model}) com ${c.length} imagem(ns) anexada(s)...`:`Consultando Gemini (${e.model}) via DOM nativo (modo r\xE1pido)...`,"info");let h=se(u,c,e);n.setInspectorPrompt(h,e.model);let g=(m,b)=>{n.setStatus(m,b==="warning"?"info":b);let x=b==="error"?"[ERRO]":b==="warning"?"[FALLBACK]":"[SYS]",w=b==="error"?"text-red":b==="warning"?"text-yellow":"text-muted";n.logToConsole(`> ${x} ${m}`,w)},{plan:f,usedModel:y}=await ze(u,c,e,g,d.signal);if(d.signal.aborted)return;if(f.needsMoreContext){if(n.setProgress(55,"Ampliando escopo da quest\xE3o..."),n.setStatus("Enunciado ou contexto isolado detectado pela IA. Acionando Sele\xE7\xE3o Geral Expandida...","info"),n.logToConsole("> [DOM] Enunciado isolado. Ampliando escopo para sele\xE7\xE3o expandida...","text-blue"),u=de(!0),u||(u=oe()),Fe(u.scope),n.updateContext(u),c=await Ye(u.scope,e.useVision),c.length>0){let x=c.map(w=>w.element).filter(Boolean);je(x)}n.setStatus(`Reconsultando IA com escopo ampliado (${u.controls.length} controles)...`,"info");let m=se(u,c,e);n.setInspectorPrompt(m,e.model),f=(await ze(u,c,e,g,d.signal)).plan}return d.signal.aborted||(n.setProgress(70,"Resposta recebida da IA! Processando plano..."),n.logToConsole(`> [IA] Modelo: ${y||e.model} | Modo: ${f.mode} | Confian\xE7a: ${(f.confidence*100).toFixed(0)}%`,"text-green"),f.rationale&&n.logToConsole(`> [IA] Racioc\xEDnio: "${f.rationale}"`,"text-blue"),n.logToConsole(`> [IA] ${f.actions.length} a\xE7\xE3o(\xF5es) prescritas no plano.`,"text-blue"),f.memoryToStore&&(et(f.memoryToStore),n.logToConsole(`> [RAG] \u{1F9E0} Nova mem\xF3ria te\xF3rica salva na sess\xE3o: "${f.memoryToStore}"`,"text-yellow")),t=f,n.updateContext(u,f),bt(f.actions),n.setPlan(f,!e.dryRun),f.pageType==="conclusion"?(n.setProgress(100,"Atividade conclu\xEDda!"),n.setStatus("Atividade conclu\xEDda ou tela final detectada pela IA.","success")):f.pageType==="info"?(n.setProgress(100,"Contexto absorvido na mem\xF3ria!"),n.setStatus("\u{1F4D8} Conte\xFAdo de contexto absorvido na mem\xF3ria RAG. Avan\xE7ando...","success")):f.pageType==="start"?(n.setProgress(100,"In\xEDcio detectado!"),n.setStatus("In\xEDcio de atividade detectado. Iniciando...","info")):(n.setProgress(80,"Plano de resolu\xE7\xE3o pronto!"),n.setStatus(e.dryRun?"Simula\xE7\xE3o conclu\xEDda. As respostas foram real\xE7adas na p\xE1gina sem altera\xE7\xE3o.":"Resolu\xE7\xE3o pronta! Verifique o realce na tela e aplique quando desejar.","success")),e.dryRun&&f.pageType==="question"&&n.showFloatingAnswers(f),d.signal.aborted)?void 0:(e.autoApply&&!e.dryRun&&await r(s,d.signal),f)}catch(u){if(d.signal.aborted||u instanceof Error&&(u.name==="AbortError"||u.message.includes("cancelada"))){W(),n.setProgress(0),n.setBusy(!1),n.setStatus("Opera\xE7\xE3o cancelada pelo usu\xE1rio.","info");return}W(),n.setProgress(0);let c=u instanceof Error?u.message:"Falha desconhecida na an\xE1lise.";n.setStatus(c,"error"),n.logToConsole(`> [ERRO] ${c}`,"text-red"),n.setErrorDiagnostic(c,"An\xE1lise da IA");return}finally{l?.removeEventListener("abort",p),a===d&&(a=null),n.setBusy(!1)}}async function r(s=1,l){if(l?.aborted)return;if(!t){n.setStatus("Nenhum plano dispon\xEDvel para aplicar. Execute a an\xE1lise primeiro.","error");return}if(e.dryRun){n.setStatus("O modo de simula\xE7\xE3o est\xE1 ativo. Desmarque para poder aplicar.","error");return}let d=t.pageType==="info"||t.pageType==="start",p=(e.autoAdvance||d)&&t.confidence>=e.confidenceThreshold&&!t.needsMoreContext;n.setBusy(!0,"Aplicando respostas no formul\xE1rio..."),n.setProgress(85,`Aplicando ${t.actions.length} a\xE7\xE3o(\xF5es) no formul\xE1rio...`),n.logToConsole(`> [EXEC] Iniciando aplica\xE7\xE3o com 6 vias de persist\xEAncia para ${t.actions.length} a\xE7\xE3o(\xF5es)...`,"text-blue");try{let u=await _e(t,p,s,le(e));if(l?.aborted)return;n.setExecutionReport(u);let c=t.actions.filter(f=>f.t!=="adv"&&f.t!=="js").length;if(t.pageType==="question"||c>0?u.success&&u.verified===c&&u.failed.length===0:u.success||u.advanced)n.setProgress(100,"Sucesso! Respostas preenchidas e validadas!"),n.logToConsole(`> [VERIF] \u2713 Sucesso no DOM: ${u.verified}/${u.applied} a\xE7\xF5es validadas com sucesso!`,"text-green"),u.advanced?n.logToConsole("> [NAV] \u2713 Bot\xE3o de confirma\xE7\xE3o/avan\xE7o acionado com sucesso!","text-green"):p&&n.logToConsole(`> [NAV] \u26A0\uFE0F ${u.navigationEvidence}`,"text-yellow"),n.setStatus(u.advanced?`Sucesso: ${u.applied} resposta(s) preenchida(s) e pr\xF3xima quest\xE3o confirmada.`:`Respostas preenchidas e validadas. Avan\xE7o n\xE3o confirmado: ${u.navigationEvidence}`,u.advanced||!p?"success":"info"),n.hideFloatingAnswers();else{n.setProgress(0,"Inje\xE7\xE3o direta restrita. Gabarito r\xE1pido exibido.");let f=u.failed.length>0?u.failed.join(", "):"alvos pendentes";n.logToConsole(`> [VERIF] Alerta: ${u.verified}/${u.applied} a\xE7\xF5es verificadas no DOM. Pend\xEAncias: ${f}.`,"text-yellow"),n.logToConsole("> [GABARITO] Inje\xE7\xE3o direta restrita pela p\xE1gina. Gabarito r\xE1pido exibido na tela; o Autopilot aguarda voc\xEA marcar e avan\xE7ar.","text-yellow"),n.setStatus("Inje\xE7\xE3o restrita pela p\xE1gina. Gabarito direto exibido na tela para voc\xEA avan\xE7ar.","info"),n.showFloatingAnswers(t)}}catch(u){n.setProgress(0);let c=u instanceof Error?u.message:"Falha ao aplicar plano.";n.setStatus("Inje\xE7\xE3o restrita pela p\xE1gina. Gabarito direto exibido na tela para voc\xEA avan\xE7ar.","info"),n.logToConsole(`> [ERRO] ${c}`,"text-red"),t&&n.showFloatingAnswers(t)}finally{n.setBusy(!1)}}n.toggle(!0)}Yt().catch(o=>{console.error("[EasyQuiz] Erro fatal na inicializa\xE7\xE3o:",o),window.alert(`EasyQuiz: falha ao iniciar: ${o instanceof Error?o.message:String(o)}`)});})();
