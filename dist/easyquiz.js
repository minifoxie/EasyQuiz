/* EasyQuiz v1.0.0 — Resolução inteligente de quizzes sem servidor
 * GitHub: https://github.com/minifoxie/EasyQuiz
 * 100% Client-side. Direct Google Gemini REST API.
 */
"use strict";(()=>{var F={apiKey:"",model:"gemini-3.8-flash",uiMode:"easy",modeHint:"",engine:"smart",dryRun:!1,autoApply:!0,autoAdvance:!1,hostDarkMode:!0,useVision:!1,confidenceThreshold:.8};var Te="easyquiz_settings_v2";function Ce(){try{let o=localStorage.getItem(Te);if(!o){let a=localStorage.getItem("easyquiz_settings_v1");if(a){let n=JSON.parse(a);return{...F,apiKey:n.apiKey||""}}return{...F}}let e=JSON.parse(o),t=typeof e.model=="string"&&e.model?e.model:F.model;return{apiKey:typeof e.apiKey=="string"?e.apiKey.trim():F.apiKey,model:t,uiMode:e.uiMode==="easy"||e.uiMode==="advanced"?e.uiMode:F.uiMode,modeHint:e.modeHint??"",engine:e.engine??"smart",dryRun:!!e.dryRun,autoApply:e.autoApply!==void 0?!!e.autoApply:!0,autoAdvance:!!e.autoAdvance,hostDarkMode:e.hostDarkMode!==void 0?!!e.hostDarkMode:!0,useVision:!!e.useVision,confidenceThreshold:typeof e.confidenceThreshold=="number"?e.confidenceThreshold:F.confidenceThreshold}}catch{return{...F}}}function We(){try{localStorage.removeItem(Te),localStorage.removeItem("easyquiz_settings_v1");let o=[];for(let e=0;e<localStorage.length;e++){let t=localStorage.key(e);t&&(t.startsWith("eq_")||t.startsWith("easyquiz_"))&&o.push(t)}o.forEach(e=>localStorage.removeItem(e)),Ae()}catch(o){console.warn("[EasyQuiz] Erro ao resetar dados:",o)}}function oe(o){try{let e=localStorage.getItem("eq_domain_cache_"+o);if(!e)return{};let t=JSON.parse(e);if(t.advanceSelector&&/inject|injetar/i.test(t.advanceSelector)){t.advanceSelector=void 0;try{localStorage.removeItem("eq_domain_cache_"+o)}catch{}}return t}catch{return{}}}function Le(o,e){if(e.advanceSelector&&/inject|injetar/i.test(e.advanceSelector))return;let a={...oe(o),...e};try{localStorage.setItem("eq_domain_cache_"+o,JSON.stringify(a))}catch(n){console.warn("[EasyQuiz] Erro cache de dominio:",n)}}function Ze(o){let t={...Ce(),...o};try{localStorage.setItem(Te,JSON.stringify(t))}catch(a){console.warn("[EasyQuiz] Falha ao persistir configura\xE7\xF5es no localStorage:",a)}return t}var Q=[],Xe=12,xt=1200;function et(o){let e=o.trim().replace(/\s+/g," ").slice(0,xt);e&&!Q.includes(e)&&(Q.push(e),Q.length>Xe&&(Q=Q.slice(-Xe)))}function de(){return Q}function Ae(){Q=[]}var tt=[{id:"native-value-events",widget:"text",label:"Setter nativo com input/change/blur",precondition:"Campo edit\xE1vel vis\xEDvel e n\xE3o desabilitado.",evidence:"value ou textContent coincide exatamente com o valor esperado.",risk:"low",cost:"fast"},{id:"native-choice-state",widget:"choice",label:"Estado nativo de radio/checkbox",precondition:"Input ou widget ARIA \xFAnico localizado.",evidence:"checked/aria-checked/data-state do alvo e grupo correspondem ao esperado.",risk:"low",cost:"fast"},{id:"native-select-events",widget:"select",label:"Sele\xE7\xE3o nativa por value/texto exato",precondition:"Select vis\xEDvel com op\xE7\xE3o correspondente.",evidence:"option.selected e selected value correspondem ao esperado.",risk:"low",cost:"fast"},{id:"aria-combobox-keyboard",widget:"combobox",label:"Combobox ARIA por foco e teclado",precondition:"Combobox vis\xEDvel com popup/op\xE7\xF5es acess\xEDveis.",evidence:"aria-expanded, aria-activedescendant ou op\xE7\xE3o selecionada mudam.",risk:"medium",cost:"normal"},{id:"click-to-place",widget:"drag",label:"Selecionar item e clicar no destino",precondition:"Cart\xE3o e dropzone vis\xEDveis com protocolo click-to-place.",evidence:"Item passa a ser filho do destino ou recebe estado de colocado.",risk:"medium",cost:"normal"},{id:"html5-drag-drop",widget:"drag",label:"HTML5 dragstart/dragover/drop",precondition:"Origem draggable e destino aceita drag/drop.",evidence:"Relocation, callback ou estado placed confirmado.",risk:"medium",cost:"normal"},{id:"keyboard-order",widget:"order",label:"Ordena\xE7\xE3o por foco e teclado",precondition:"Itens orden\xE1veis com foco/roles ou bot\xF5es de mover.",evidence:"Ordem dos itens no DOM corresponde \xE0 sequ\xEAncia esperada.",risk:"medium",cost:"normal"},{id:"navigation-feedback",widget:"navigation",label:"Verificar e confirmar feedback/transi\xE7\xE3o",precondition:"Bot\xE3o de verifica\xE7\xE3o/avan\xE7o \xFAnico e habilitado.",evidence:"Feedback esperado e assinatura espec\xEDfica da quest\xE3o mudam.",risk:"high",cost:"normal"},{id:"javascript-explicit",widget:"javascript",label:"JavaScript limitado via capability expl\xEDcita",precondition:"Engine javascript autorizada e a\xE7\xE3o declarativa insuficiente.",evidence:"Efeito DOM esperado confirmado por verificador.",risk:"high",cost:"last-resort"}];function wt(o){if(!o||o.length===0)return tt.filter(t=>t.widget!=="javascript");let e=new Set(o);return tt.filter(t=>e.has(t.widget))}function ot(o){return wt(o).map(e=>`${e.id}: ${e.label} | pr\xE9: ${e.precondition} | prova: ${e.evidence} | risco: ${e.risk}`).join(`
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
`;function ne(o,e,t){let a=o.htmlSnippet.includes("draggable")||o.htmlSnippet.includes("perseus")||o.htmlSnippet.includes("category")||o.htmlSnippet.includes("dropzone")||o.controls.some(l=>l.type==="draggable"||l.type==="dropzone"),n=new Set(["navigation"]);o.controls.some(l=>["text","number","textarea","contenteditable"].some(h=>l.type.includes(h)))&&n.add("text"),o.controls.some(l=>["radio","checkbox"].includes(l.type)||l.tag==="button")&&n.add("choice"),o.controls.some(l=>l.tag==="select")&&n.add("select"),o.controls.some(l=>/combobox|dropdown/i.test(l.type))&&n.add("combobox"),(o.controls.some(l=>["draggable","dropzone"].includes(l.type))||a)&&n.add("drag"),t.engine==="javascript"&&n.add("javascript");let i=/katex|latex|math|matrix|formula|frac|\$|\^|\_/i.test(o.htmlSnippet)||/calcular|calcule|resolva|matriz|equação|função|probabilidade|geometria|fórmula|coordenada|sistema/i.test(o.questionText),r=o.questionText.length<250||a||o.controls.length<4||i?`
[HTML]:
${o.htmlSnippet.slice(0,3500).replace(/\s+/g," ")}`:`
[HTML]: Omitido.`,c=de(),d=c.length>0?`
[MEM\xD3RIA]:
${c.join(" | ")}
`:"",p=o.controls.filter(l=>l.role!=="navigation"),u=o.controls.filter(l=>l.role==="navigation");return`--- AN\xC1LISE ---
[MODO]: ${t.engine} | Dica: ${t.modeHint||"Auto"}
[URL]: ${o.sourceUrl}
[P\xC1GINA]: ${o.pageTitle}${d}
[ESTRAT\xC9GIAS]:
${ot([...n])}
[DADOS]
[TEXTO]:
${o.questionText}${r}

[RESPOSTAS]:
${p.length>0?JSON.stringify(p.map(l=>({id:l.id,t:l.type,n:l.name||void 0,txt:l.label,v:l.value||void 0,opt:l.options.length?l.options:void 0}))):"Nenhuma"}

[NAVEGA\xC7\xC3O]:
${u.length>0?u.map(l=>`"${l.label||l.id}"[${l.type}]`).join(","):"Nenhuma"}

[IMAGENS E GR\xC1FICOS ANEXADOS (${e.length})]:
${e.length>0?e.map((l,h)=>`  - Imagem ${h+1}: ${l.associatedLabel||"Gr\xE1fico da Quest\xE3o"}${l.alt?` (Texto alt: "${l.alt}")`:""}`).join(`
`):"Nenhum anexo visual."}
[/DADOS]
Sa\xEDda em JSON v\xE1lido.`}var qt=new Set(["question","info","start","conclusion"]),Et=new Set(["texto_livre","escolha_unica","escolha_multipla","verdadeiro_falso","preenchimento","acao_sem_resposta","categorizacao","ordenacao","arrastar_soltar"]),Tt=new Set(["val","chk","sel","clk","adv","js","drag"]),Ct=150,ae=2e3;function P(o,e=""){return o==null?e:typeof o=="string"?o.trim().slice(0,ae):typeof o=="number"||typeof o=="boolean"?String(o).trim().slice(0,ae):e}function Lt(o,e){if(!o||typeof o!="object")return null;let t=o,a=t.t;if(typeof a!="string"||!Tt.has(a))return null;if(a==="adv"){let r=t.id??t.target??t.name??t.selector;return{t:"adv",...P(r)?{id:P(r,"").slice(0,500)}:{}}}if(a==="drag"){let r=P(t.from??t.source),c=P(t.to??t.target??t.destination);return!r||!c?null:{t:"drag",from:r.slice(0,500),to:c.slice(0,500)}}if(a==="js"){let r=P(t.v??t.code??t.script);return!r||r.length>8e3?null:{t:"js",v:r}}let n=t.id??t.target??t.name??t.selector??t.element;(n==null||n==="")&&a==="val"&&(n="1");let i=P(n).slice(0,500);if(!i)return null;if(a==="val"){let r=t.v!==void 0?t.v:t.value!==void 0?t.value:t.val!==void 0?t.val:t.text!==void 0?t.text:t.answer;return{t:"val",id:i,v:P(r).slice(0,ae)}}if(a==="sel"){let r=t.v!==void 0?t.v:t.value!==void 0?t.value:t.val!==void 0?t.val:t.values,d=(Array.isArray(r)?r:[r]).map(p=>P(p).slice(0,500)).filter(Boolean);return{t:"sel",id:i,v:d}}if(a==="chk"){let r=t.c===!1||t.c==="false"||t.c===0||t.c==="0"||t.c==="off"||t.c==="unchecked"||t.c==="desmarcar",c={t:"chk",id:i,c:!r};return t.v!==void 0&&(c.v=P(t.v).slice(0,ae)),c}let s={t:"clk",id:i};if(t.c!==void 0){let r=t.c===!1||t.c==="false"||t.c===0||t.c==="0"||t.c==="off"||t.c==="unchecked"||t.c==="desmarcar";s.c=!r}return t.v!==void 0&&(s.v=P(t.v).slice(0,ae)),Array.isArray(t.co)&&t.co.length===2&&t.co.every(r=>typeof r=="number"&&Number.isFinite(r))&&(s.co=[t.co[0],t.co[1]]),s}function Se(o){if(!o||typeof o!="object")return{pageType:"info",mode:"acao_sem_resposta",confidence:.5,rationale:"Resposta estruturada n\xE3o identificada; avan\xE7ando como informativo.",actions:[{t:"adv"}]};let e=o,t=e.pageType,a=e.mode;(typeof t!="string"||!qt.has(t))&&(t="question"),(typeof a!="string"||!Et.has(a))&&(a="escolha_unica");let n=Array.isArray(e.actions)?e.actions:[],i=[];for(let d=0;d<Math.min(n.length,Ct);d++){let p=Lt(n[d],d);p&&i.push(p)}let s=i.filter(d=>d.t!=="adv"),r=i.some(d=>d.t==="adv");t==="conclusion"?i.length=0:t==="info"||t==="start"?r||i.push({t:"adv"}):t==="question"&&!r&&i.push({t:"adv"});let c=typeof e.confidence=="number"&&Number.isFinite(e.confidence)?Math.min(1,Math.max(0,e.confidence)):.85;return{pageType:t,mode:a,confidence:c,rationale:P(e.rationale,"Plano validado e auto-recuperado."),actions:i,...P(e.memoryToStore)?{memoryToStore:P(e.memoryToStore)}:{},...e.needsMoreContext?{needsMoreContext:!!e.needsMoreContext}:{}}}var K=[{id:"gemini-2.0-flash",name:"Gemini 2.0 Flash (Mais R\xE1pido e Est\xE1vel)",description:"Modelo oficial de ultra-baixa lat\xEAncia do Google com suporte multimodal completo.",stable:!0},{id:"gemini-1.5-flash",name:"Gemini 1.5 Flash (Equilibrado e Confi\xE1vel)",description:"Modelo comprovado de alt\xEDssima disponibilidade e estabilidade.",stable:!0},{id:"gemini-2.5-flash",name:"Gemini 2.5 Flash (Racioc\xEDnio R\xE1pido)",description:"Modelo multimodal de racioc\xEDnio avan\xE7ado.",stable:!0},{id:"gemini-2.0-flash-lite-preview-02-05",name:"Gemini 2.0 Flash-Lite (Econ\xF4mico)",description:"Modelo leve e \xE1gil para respostas r\xE1pidas.",stable:!0},{id:"gemini-1.5-pro",name:"Gemini 1.5 Pro (Alta Precis\xE3o)",description:"Modelo de m\xE1xima precis\xE3o para problemas complexos.",stable:!0}],At={type:"OBJECT",properties:{pageType:{type:"STRING",enum:["question","info","start","conclusion"]},mode:{type:"STRING",enum:["texto_livre","escolha_unica","escolha_multipla","verdadeiro_falso","preenchimento","acao_sem_resposta","categorizacao","ordenacao","arrastar_soltar"]},confidence:{type:"NUMBER"},rationale:{type:"STRING"},memoryToStore:{type:"STRING"},actions:{type:"ARRAY",items:{type:"OBJECT",properties:{t:{type:"STRING",enum:["val","chk","sel","clk","adv","js","drag"]},id:{type:"STRING"},v:{},c:{type:"BOOLEAN"},co:{type:"ARRAY",items:{type:"NUMBER"}},from:{type:"STRING"},to:{type:"STRING"}},required:["t"]}}},required:["pageType","mode","confidence","rationale","actions"]};function St(o){return o.trim().replace(/^google\//,"").replace(/^models\//,"")||"gemini-2.0-flash"}function ke(o,e){let t="";try{let a=JSON.parse(o);t=a.error?.message||a.message||""}catch{t=o.slice(0,160)}return/API_KEY_INVALID|API key not valid|key.*invalid|unregistered/i.test(t)?"Chave de API do Gemini inv\xE1lida ou n\xE3o autorizada no Google AI Studio.":/RESOURCE_EXHAUSTED|Quota exceeded/i.test(t)||e===429?"Limite tempor\xE1rio de cota do Gemini (HTTP 429) atingido. Aguardando recupera\xE7\xE3o...":e===404?`HTTP 404: ${t||"Modelo ou endpoint n\xE3o encontrado no Google AI Studio"}`:e===503||/overloaded/i.test(t)?`Servidores Google sobrecarregados (HTTP 503): ${t||"Aguardando"}`:t?`Erro Gemini (HTTP ${e}): ${t}`:`Falha na requisi\xE7\xE3o ao Gemini (HTTP ${e}).`}function at(o){let e=o.trim(),t=e.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);if(t)try{return JSON.parse(t[1].trim())}catch{}try{return JSON.parse(e)}catch{}let a=e.match(/\{[\s\S]*\}/);if(a)try{return JSON.parse(a[0].trim())}catch{}throw new Error("Falha ao decodificar JSON da IA.")}var ue=(()=>{try{let o=typeof localStorage<"u"?localStorage.getItem("easyquiz_cached_models"):null;return o?JSON.parse(o):null}catch{return null}})(),Me=new Set;async function pe(o){let e=o.trim().replace(/^["']|["']$/g,"");if(!e)return K;let t=[`https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(e)}`,`https://generativelanguage.googleapis.com/v1/models?key=${encodeURIComponent(e)}`];for(let a of t)try{let n=await fetch(a,{headers:{"Content-Type":"application/json","x-goog-api-key":e}});if(!n.ok){let s=await n.text(),r=ke(s,n.status);if(r.includes("inv\xE1lida")||r.includes("n\xE3o autorizada"))throw new Error(r);continue}let i=await n.json();if(Array.isArray(i.models)&&i.models.length>0){let s=i.models.filter(r=>{let c=r.supportedGenerationMethods||[],d=(r.name||"").includes("gemini"),p=c.includes("generateContent"),u=(r.name||"").includes("embedding")||(r.name||"").includes("tts")||(r.name||"").includes("imagen")||(r.name||"").includes("aqa")||(r.name||"").includes("computer-use");return d&&p&&!u}).map(r=>{let c=r.supportedGenerationMethods||[],d=r.name.replace(/^models\//,""),p=r.displayName||d;return{id:d,name:p.includes(d)?p:`${p} (${d})`,description:r.description||"",stable:!/-preview|-experimental|-latest/i.test(d),supportsVision:!/embedding|tts|transcribe|live|image/i.test(d),supportsStructuredOutput:c.includes("generateContent"),supportedGenerationMethods:c,discoveredAt:Date.now()}});if(s.length>0){s.sort((r,c)=>{let d=p=>p==="gemini-3.8-flash"?120:p==="gemini-3.5-flash-lite"?115:p==="gemini-2.5-flash"?100:p==="gemini-3.1-pro-preview"?90:p.includes("flash")?50:10;return d(c.id)-d(r.id)}),ue=s;try{typeof localStorage<"u"&&localStorage.setItem("easyquiz_cached_models",JSON.stringify(s))}catch{}return s}}}catch(n){if(n.message?.includes("Chave de API"))throw n}return K}async function it(o){let e=o.trim().replace(/^["']|["']$/g,"");if(!e)return{ok:!1,message:"Insira sua chave de API."};try{let a=await pe(e);if(a.length>0&&a!==K){let n=a[0];return{ok:!0,message:`Chave v\xE1lida! ${a.length} modelos Gemini dispon\xEDveis em sua conta. Recomendado: ${n.name}`,models:a}}}catch(a){return{ok:!1,message:a instanceof Error?a.message:String(a)}}let t=["gemini-3.8-flash","gemini-3.5-flash-lite","gemini-2.5-flash"];for(let a of t)for(let n of["v1beta","v1"]){let i=`https://generativelanguage.googleapis.com/${n}/models/${a}:generateContent?key=${encodeURIComponent(e)}`;try{if((await fetch(i,{method:"POST",headers:{"Content-Type":"application/json","x-goog-api-key":e},body:JSON.stringify({contents:[{role:"user",parts:[{text:"PING"}]}],generationConfig:{maxOutputTokens:5}})})).ok)return{ok:!0,message:`Chave validada com sucesso no ${a} (${n})!`,models:K}}catch{}}return{ok:!1,message:"Chave de API inv\xE1lida, sem cota ou sem permiss\xE3o para modelos Gemini."}}async function Mt(o,e,t,a,n){let i=["v1beta","v1"],s=new Error(`Falha ao consultar modelo ${o}`);for(let r of i){if(n.aborted)throw new Error("Opera\xE7\xE3o cancelada pelo usu\xE1rio.");let c=`https://generativelanguage.googleapis.com/${r}/models/${o}:generateContent?key=${encodeURIComponent(e)}`;try{let d=await fetch(c,{method:"POST",headers:{"Content-Type":"application/json","x-goog-api-key":e},body:t,signal:n,keepalive:a});if(!d.ok){let l=await d.text(),h=ke(l,d.status);if(d.status===404&&r==="v1beta")continue;throw new Error(h)}let p=await d.json(),u=p.candidates?.[0];if(!u||!u.content?.parts?.[0]?.text)throw new Error("A IA n\xE3o retornou uma resposta estruturada v\xE1lida.");return{rawText:u.content.parts[0].text,data:p,usedModel:o}}catch(d){if(n.aborted)throw d;if(s=d,!s.message.includes("404"))break}}throw s}async function He(o,e,t,a,n){if(n?.aborted)throw new Error("Opera\xE7\xE3o cancelada pelo usu\xE1rio.");let i=t.apiKey.trim().replace(/^["']|["']$/g,"");if(!i)throw new Error("Chave de API n\xE3o configurada.");let s=St(t.model);if(!ue||ue.length===0)try{a?.("Verificando modelos autorizados na sua chave de API...","info"),await pe(i)}catch(f){let x=f instanceof Error?f.message:String(f);if(x.includes("inv\xE1lida")||x.includes("n\xE3o autorizada"))throw new Error(x)}if(n?.aborted)throw new Error("Opera\xE7\xE3o cancelada pelo usu\xE1rio.");let r=Date.now(),c=ne(o,e,t),d=[{text:c}];for(let f=0;f<e.length;f++){let x=e[f],w=x.associatedLabel||(x.alt?`Imagem: ${x.alt}`:`Imagem ${f+1}`);d.push({text:`[ANEXO VISUAL ${f+1} - V\xCDNCULO: ${w}]:`}),d.push({inline_data:{mime_type:x.mediaType,data:x.base64}})}let p={temperature:0,maxOutputTokens:2500,response_mime_type:"application/json",response_schema:At},u=[s,...ue?.map(f=>f.id)||[],"gemini-2.0-flash","gemini-1.5-flash","gemini-2.5-flash","gemini-2.0-flash-lite-preview-02-05","gemini-1.5-pro"],l=Array.from(new Set(u)).filter(f=>!Me.has(f));l.length===0&&(Me.clear(),l.push(...K.map(f=>f.id)));let h={system_instruction:{parts:[{text:nt}]},contents:[{role:"user",parts:d}],generationConfig:p},g=JSON.stringify(h),b=g.length<6e4,v=l.slice(0,3);if(v.length>1){a?.(`Velocidade M\xE1xima: consultando APIs em paralelo (${v.join(", ")})...`,"info");let f=v.map(()=>new AbortController),x=q=>{f.forEach((T,S)=>{if(S!==q)try{T.abort(new Error("Cancelado: outro modelo respondeu mais r\xE1pido."))}catch{T.abort()}})},w=()=>{f.forEach(q=>{try{q.abort(new Error("Opera\xE7\xE3o cancelada pelo usu\xE1rio."))}catch{q.abort()}})};if(n){if(n.aborted)throw new Error("Opera\xE7\xE3o cancelada pelo usu\xE1rio.");n.addEventListener("abort",w,{once:!0})}try{let q=v.map(async(S,A)=>{let R=f[A],V=setTimeout(()=>{try{R.abort(new Error(`Timeout de 15s na API Gemini (${S}).`))}catch{R.abort()}},15e3);try{let z=await Mt(S,i,g,b,R.signal);clearTimeout(V);let D=Se(at(z.rawText));return D.usedModel=z.usedModel,D.durationMs=Date.now()-r,D.promptSent=c,D.tokensUsed=z.data.usageMetadata?.totalTokenCount,D.promptTokens=z.data.usageMetadata?.promptTokenCount,D.candidatesTokens=z.data.usageMetadata?.candidatesTokenCount,D.rawResponse=z.rawText,x(A),{plan:D,rawUsage:z.data.usageMetadata,usedModel:z.usedModel}}catch(z){throw clearTimeout(V),z}}),T=await Promise.any(q);if(n?.removeEventListener("abort",w),T.usedModel!==s){a?.(`\u26A1 Velocidade m\xE1xima alcan\xE7ada com '${T.usedModel}' (${T.plan.durationMs}ms)!`,"info");try{t.model=T.usedModel}catch{}}else a?.(`\u26A1 Resposta mais r\xE1pida recebida em ${T.plan.durationMs}ms via '${T.usedModel}'!`,"info");return T}catch(q){if(n?.removeEventListener("abort",w),n?.aborted)throw new Error("Opera\xE7\xE3o cancelada pelo usu\xE1rio.");console.warn("[EasyQuiz Race] Corrida concorrente falhou ou esgotou pool inicial. Alternando para fallback sequencial...",q)}}let m=new Error("Nenhum modelo tentado.");for(let f=0;f<l.length;f++){if(n?.aborted)throw new Error("Opera\xE7\xE3o cancelada pelo usu\xE1rio.");let x=l[f],w=l[f+1];a?.(`Consultando Gemini (${x})...`,"info");let q=["v1beta","v1"];for(let A of q){if(n?.aborted)throw new Error("Opera\xE7\xE3o cancelada pelo usu\xE1rio.");let R=`https://generativelanguage.googleapis.com/${A}/models/${x}:generateContent?key=${encodeURIComponent(i)}`,V=new AbortController,z=()=>{try{V.abort(new Error("Opera\xE7\xE3o cancelada pelo usu\xE1rio."))}catch{V.abort()}};if(n){if(n.aborted)throw new Error("Opera\xE7\xE3o cancelada pelo usu\xE1rio.");n.addEventListener("abort",z,{once:!0})}let D=setTimeout(()=>{try{V.abort(new Error(`Timeout de 18s excedido na API Gemini (${x}). Servidor demorou a responder.`))}catch{V.abort()}},18e3);try{let O=await fetch(R,{method:"POST",headers:{"Content-Type":"application/json","x-goog-api-key":i},body:g,signal:V.signal,keepalive:b});if(clearTimeout(D),n?.removeEventListener("abort",z),!O.ok){let Je=await O.text();if(O.status===400&&p.thinkingConfig&&/thinking/i.test(Je)){delete p.thinkingConfig,h.generationConfig=p;continue}let yt=ke(Je,O.status);if(O.status===404&&A==="v1beta")continue;throw new Error(yt)}let te=await O.json(),Ee=te.candidates?.[0];if(!Ee||!Ee.content?.parts?.[0]?.text)throw new Error("A IA n\xE3o retornou uma resposta estruturada v\xE1lida.");let Ye=Ee.content.parts[0].text,j=Se(at(Ye));if(j.usedModel=x,j.durationMs=Date.now()-r,j.promptSent=c,j.tokensUsed=te.usageMetadata?.totalTokenCount,j.promptTokens=te.usageMetadata?.promptTokenCount,j.candidatesTokens=te.usageMetadata?.candidatesTokenCount,j.rawResponse=Ye,x!==s){a?.(`Resolvido com sucesso pelo fallback '${x}' (${A})!`,"info");try{t.model=x}catch{}}return{plan:j,rawUsage:te.usageMetadata,usedModel:x}}catch(O){if(clearTimeout(D),n?.removeEventListener("abort",z),n?.aborted)throw new Error("Opera\xE7\xE3o cancelada pelo usu\xE1rio.");if(O instanceof Error&&(O.name==="AbortError"||O.message.includes("aborted")||O.message.includes("Timeout"))?m=new Error(`Timeout de 18s excedido na API Gemini (${x}). Sem resposta imediata.`):m=O,m.message.includes("inv\xE1lida")||m.message.includes("n\xE3o autorizada"))throw m;if(m.message.includes("Timeout")||m.message.includes("503")||m.message.includes("429"))break}}if(n?.aborted)throw new Error("Opera\xE7\xE3o cancelada pelo usu\xE1rio.");let T=m.message.includes("429")||m.message.includes("cota");if(m.message.includes("404")&&Me.add(x),w){let A=T?500:150,R=`Modelo '${x}' indispon\xEDvel (${m.message}). Alternando imediatamente para '${w}'...`;console.warn(`[EasyQuiz Fallback] ${R}`),a?.(R,"warning"),A>0&&await new Promise(V=>setTimeout(V,A))}else console.warn(`[EasyQuiz Fallback] Modelo '${x}' falhou: ${m.message}. Todos os modelos esgotados.`)}throw m}var kt=[/\bfetch\b/i,/\bXMLHttpRequest\b/i,/\bWebSocket\b/i,/\b(?:localStorage|sessionStorage|indexedDB)\b/i,/\b(?:eval|Function|AsyncFunction|GeneratorFunction)\b/i,/\bimport(?:Scripts)?\b/i,/\bnavigator\s*\.\s*credentials\b/i,/\b(?:cookie|location\s*=|history\s*\.)/i,/\bwindow\s*\[\s*['"](?:fetch|eval|Function|localStorage|sessionStorage)/i];function ie(o){let e=o?.engine||"smart",t=new Set(["dom","framework","keyboard","drag"]);return o?.autoAdvance&&t.add("navigation"),e==="javascript"&&t.add("javascript"),{engine:e,capabilities:t,maxAttemptsPerAction:e==="command"?1:2,maxActionMs:e==="command"?1500:3e3,allowJavaScript:e==="javascript",allowNavigation:!!o?.autoAdvance}}function Ie(o,e){if(o.t==="js"&&!e.allowJavaScript)throw new Error("A\xE7\xE3o JavaScript bloqueada pela engine atual. Use o motor JavaScript explicitamente.");if(o.t==="adv"&&!e.allowNavigation)throw new Error("Avan\xE7o autom\xE1tico bloqueado pela pol\xEDtica atual.")}function rt(o){if(!o.trim())throw new Error("JavaScript recusado: c\xF3digo vazio.");if(o.length>8e3)throw new Error("JavaScript recusado: c\xF3digo acima do limite operacional.");if(kt.find(t=>t.test(o)))throw new Error("JavaScript recusado: acesso externo, persist\xEAncia ou avalia\xE7\xE3o din\xE2mica n\xE3o permitidos.");if(!/^\s*(?:\/\/[^\n]*\n|\/\*[\s\S]*?\*\/|[\s\S])*\$eq\./.test(o)&&!o.includes("$eq."))throw new Error("JavaScript recusado: use somente a API declarativa $eq.")}var J=['input:not([type="hidden"])',"textarea","select","button","a","label",'[role="button"]','[role="link"]','[role="radio"]','[role="checkbox"]','[role="option"]','[role="treeitem"]','[role="menuitemcheckbox"]','[role="menuitemradio"]','[contenteditable="true"]','[draggable="true"]',"[aria-grabbed]","[aria-dropeffect]","[data-widget-type]",".perseus-drag-item",".sortable-item",'[data-testid*="drag" i]','[data-testid*="card" i]','[data-testid*="option" i]','[data-testid*="choice" i]','[data-testid*="category" i]',"[data-choice]","[data-option]","[data-answer]","[data-value]",".quiz-option",".option-card",".choice-card",'[class*="option-card" i]','[class*="choice-card" i]','[class*="option-item" i]','[class*="choice-item" i]','[class*="answer-item" i]','[class*="alternative" i]','li[class*="choice" i]','li[class*="option" i]','li[class*="answer" i]','[data-role="dropzone"]',"[data-category]"].join(","),he=/(verificar|checar|check|conferir|validar|próxim[oa]|next|continuar|continue|avançar|prosseguir|enviar|submit|concluir|finalizar|terminar|começar|iniciar|start|vamos lá|próxima tarefa|next task|próxima pergunta|next question|marcar como concluíd[oa]|mostrar resumo|entendi|compreendi|ok|leitura concluída|seguir|ir para o exercício|fazer o teste|próximo artigo|ir para a aula)/i,Ht=0;function ze(o){try{let e=o.closest('[hidden], [style*="display: none"], [style*="display:none"], [aria-hidden="true"]');if(e&&!me(e))return!1}catch{}try{let e=window.getComputedStyle?window.getComputedStyle(o):o.style;if(e&&(e.display==="none"||e.visibility==="hidden"))return!1}catch{}try{if(typeof o.getBoundingClientRect=="function"){let e=o.getBoundingClientRect();if(e.width>0||e.height>0)return!0}}catch{}return(o.textContent||"").trim().length>0}function H(o){try{if(typeof CSS<"u"&&typeof CSS.escape=="function")return CSS.escape(o)}catch{}return String(o).replace(/["\\]/g,"\\$&")}function L(o){let e=o;if(!e||typeof e.isConnected=="boolean"&&!e.isConnected||me(e))return!1;let t=e.tagName?.toLowerCase();if(["input","select","textarea","button"].includes(t)){let a=e.type?.toLowerCase();if(a==="checkbox"||a==="radio"){if(e.id)try{let i=e.ownerDocument?.querySelector(`label[for="${H(e.id)}"]`);if(i&&ze(i))return!0}catch{}let n=e.closest('label, .option-card, .quiz-option, .choice, .answer, [role="radio"], [role="checkbox"], [class*="option" i], [class*="choice" i], [class*="item" i], li, tr');if(n&&n!==e&&ze(n))return!0}try{if(!e.closest('[hidden], [style*="display: none"], [style*="display:none"], [aria-hidden="true"]')){let i=window.getComputedStyle?window.getComputedStyle(e):e.style;if(!i||i.display!=="none"&&i.visibility!=="hidden"){if(typeof e.getBoundingClientRect=="function"){let s=e.getBoundingClientRect();if(s.width>0||s.height>0)return!0}return!0}}}catch{}}return ze(e)}function It(o){if(o==null)return"";if(typeof o=="string")return o;if(typeof o=="number"||typeof o=="boolean")return String(o);if(o instanceof Node)return o.textContent||"";try{if(typeof o?.toString=="function"){let e=o.toString();if(typeof e=="string")return e}}catch{}return""}function M(o,e=500){return It(o).replace(/\s+/g," ").trim().slice(0,e)}function zt(o){let e=o.dataset.easyquizId;if(e)return e;let t=`eq-${Date.now().toString(36)}-${(Ht+=1).toString(36)}`;return o.dataset.easyquizId=t,t}function me(o){return o?!!(o.closest('#easyquiz-shadow-root, .eq-sidebar, .eq-launcher, [data-easyquiz-ignore="true"], .btn-inject-eq, #btn-inject-script')||o.getAttribute?.("data-easyquiz-ignore")==="true"):!1}var re=/(leaderboard|scoreboard|placar|ranking|trophy|pause|pausar|mute|volume|audio|sound|som|música|music|configuraç|settings|theme|ajuda|help|report|denunciar|feedback|power-?up|streak|coins|fullscreen|full-screen)/i;function I(o){if(!o||typeof o.getAttribute!="function"||typeof Element<"u"&&!(o instanceof Element))return!1;if(me(o))return!0;let t=o.closest?.('button, a, [role="button"], [class*="leaderboard" i], [data-testid*="leaderboard" i], [class*="scoreboard" i], [class*="trophy" i]')||o,a=String(t.getAttribute?.("data-testid")||t.getAttribute?.("data-test-id")||t.getAttribute?.("id")||""),n=String(t.getAttribute?.("aria-label")||""),i=String(t.getAttribute?.("title")||""),s=typeof t.className=="string"?t.className:typeof t.className?.baseVal=="string"?t.className.baseVal:"",r=M(t.textContent,60);return!!(re.test(a)||re.test(n)||re.test(i)||re.test(s)||r.length>0&&r.length<=25&&re.test(r))}function G(o){if(!o||typeof o.getAttribute!="function"||typeof Element<"u"&&!(o instanceof Element)||me(o)||I(o)||o.closest?.('.option-card, .choice-card, .quiz-option, [class*="option-card" i], [class*="choice-card" i], [class*="option-item" i], [class*="choice-item" i], [class*="answer-item" i], [data-testid*="option" i], [data-testid*="choice" i], [data-choice], [data-option], [data-answer], [role="radio"], [role="checkbox"], [role="option"]')||o.closest?.("header, nav, aside"))return!1;let e=typeof HTMLInputElement<"u"&&o instanceof HTMLInputElement||typeof HTMLButtonElement<"u"&&o instanceof HTMLButtonElement?o.value:"",t=M(o.getAttribute?.("aria-label")||o.textContent||o.getAttribute?.("value")||e),a=o.type,n=t.replace(/[\d\(\)\[\]→\>\•\-\/\\]+/g," ").trim(),i=String(o.getAttribute?.("data-testid")||o.getAttribute?.("data-test-id")||o.getAttribute?.("id")||o.getAttribute?.("href")||"").toLowerCase();return he.test(n)||he.test(t)||a==="submit"||i.includes("next")||i.includes("check")||i.includes("continue")||i.includes("proximo")||i.includes("forward")||!1}function $e(o){let e=o.closest("tr");if(e){let r=e.querySelector("th, td:first-child"),c=r&&r!==o.closest("td")?M(r.textContent,100):"",d=M(o.closest("label, td")?.textContent||"",50);if(c&&d)return`${c}: ${d}`}let t=o.getAttribute("aria-label");if(t)return M(t);let a=o.getAttribute("aria-labelledby");if(a){let r=a.split(/\s+/).map(c=>document.getElementById(c)?.textContent).filter(Boolean).join(" ");if(r.trim())return M(r)}if("labels"in o&&o.labels){let r=Array.from(o.labels??[]).map(c=>c.textContent).join(" ");if(r.trim())return M(r)}let n=o.closest('.docssharedWizToggleLabeledContainer, [role="listitem"], .answer, label, .quiz-option, .form-check, .option-card');if(n&&n!==o){let r=M(n.textContent);if(r)return r}let i=o instanceof HTMLInputElement||o instanceof HTMLButtonElement?o.value:"",s=o.getAttribute("placeholder")||o.getAttribute("title")||o.textContent||i||"";return M(s)}function Pe(o,e){let a=typeof HTMLSelectElement<"u"&&o instanceof HTMLSelectElement||o.tagName.toLowerCase()==="select"?o:null,n=o;o.dataset.easyquizRole=e;let i=o.tagName.toLowerCase(),s=["input","textarea","select","button"].includes(i)?i:"other",r=o.getAttribute("role")||"",c=(o.getAttribute("data-testid")||o.getAttribute("data-test-id")||"").toLowerCase(),d=(o.className&&typeof o.className=="string"?o.className:"").toLowerCase(),p=o.getAttribute("draggable")==="true"||o.classList.contains("perseus-drag-item")||o.classList.contains("sortable-item")||!!o.getAttribute("aria-grabbed")||/drag|card|option|item/i.test(c)||/drag|card-item|sortable/i.test(d),u=o.getAttribute("data-role")==="dropzone"||o.classList.contains("category-container")||o.hasAttribute("data-category")||!!o.getAttribute("aria-dropeffect")||/drop|category|bucket/i.test(c)||/dropzone|category-box|bucket|target-zone/i.test(d),h=M((p?"draggable":u?"dropzone":"")||n.type||r||s,40),g="";if(n.type==="checkbox"||n.type==="radio"||r==="radio"||r==="checkbox")g=n.checked||o.getAttribute("aria-checked")==="true"?"checked":"unchecked";else if(s==="button"||i==="a"||e==="navigation"||G(o))g="";else{let w=typeof o.value=="string"||typeof o.value=="number"?o.value:"";g=M(w||o.getAttribute("data-category")||"",2e3)}let b=[];if(a&&a.options)for(let w of Array.from(a.options).slice(0,80))b.push({value:M(w.value),label:M(w.textContent)});else if(r==="combobox"||r==="listbox"||d.includes("select")||d.includes("dropdown")){let w=o.getAttribute("aria-controls")||o.getAttribute("aria-owns"),q=w?document.getElementById(w):o;if(q){let T=q.querySelectorAll('[role="option"], li, .dropdown-item, .option');for(let S of Array.from(T).slice(0,80)){let A=M(S.textContent);A&&b.push({value:S.getAttribute("data-value")||S.getAttribute("value")||A,label:A})}}}let v=!!(n.required||o.getAttribute("aria-required")==="true"),m=!!(n.disabled||o.getAttribute("aria-disabled")==="true"),f=zt(o);return{id:o.id||f,tag:s,type:h,label:$e(o),name:M(n.name||o.getAttribute("name")||"",180),value:g,options:b,required:v,disabled:m,role:e}}var st=['[data-test-id*="exercise" i]','[data-testid*="exercise" i]',".perseus-renderer",".framework-perseus",".Qr7Oae",".que",".question-holder",".quiz-question",".question_holder",".display_question",'[data-functional-selector*="question"]',".question-container","[data-question-id]",'[data-testid*="question" i]','[class*="question-container" i]','[class*="question" i]','[class*="pergunta" i]',"article","form","section","main"].join(",");function lt(o){if(!L(o))return-1/0;let e=o.getBoundingClientRect(),t=Array.from(o.querySelectorAll(J)).filter(L),a=M(o.innerText,4e3).length;if(a<10||!t.length&&a<60)return-1/0;let n=Math.max(1,window.innerWidth*window.innerHeight),i=Math.max(1,e.width*e.height),s=Math.min(1,i/n),r=e.top+e.height/2,c=Math.abs(r-window.innerHeight/2)/Math.max(1,window.innerHeight),d=a>40?35:0,p=e.top>=0&&e.bottom<=window.innerHeight?25:0;return t.length*15+Math.min(60,a/20)+d+p-s*20-c*10}function Re(o){let e=o;for(;e.parentElement&&e.parentElement!==document.body&&e.parentElement!==document.documentElement;){let t=e.parentElement,a=t.tagName.toLowerCase();if(["header","footer","nav","aside"].includes(a))break;if(t.matches?.('article, section, form, [data-test-id*="exercise" i], [data-testid*="exercise" i], .perseus-renderer, .framework-perseus, [class*="question-container" i], .que, main')){e=t;break}let n=M(e.innerText,1e4),i=M(t.innerText,1e4),s=e.querySelectorAll(J).length,r=t.querySelectorAll(J).length;if(n.length<150&&i.length>n.length&&r<=s+4){e=t;continue}break}return e}function ct(o){let e=o,t=e.closest('main, [role="main"], article, form, [data-test-id*="exercise" i], [data-testid*="exercise" i], .framework-perseus, section');if(t&&t!==document.body&&L(t))return t;let a=0;for(;e.parentElement&&e.parentElement!==document.body&&a<3;)e=e.parentElement,a++;return e||document.body}function N(){let o=document.activeElement;if(o&&o!==document.body){let n=o.closest(st);if(n&&lt(n)>0)return Re(n)}let t=Array.from(document.querySelectorAll(st)).map(n=>({element:n,score:lt(n)})).filter(n=>Number.isFinite(n.score)).sort((n,i)=>i.score-n.score);if(t.length>0&&t[0].score>0)return Re(t[0].element);let a=document.querySelector('form, main, [role="main"]');return a&&L(a)?a:document.body}function dt(o){let e=o.cloneNode(!0);e.querySelectorAll("script, style, iframe, object, embed, svg, canvas, noscript, audio, video").forEach(a=>a.remove());let t=["type","name","value","role","aria-label","aria-labelledby","aria-checked","aria-required","required","disabled","data-easyquiz-id","draggable","class","id","data-widget-type","data-role","data-category","data-testid"];return e.querySelectorAll("*").forEach(a=>{for(let n of Array.from(a.attributes))t.includes(n.name)||a.removeAttribute(n.name)}),e.outerHTML.replace(/\s+/g," ").slice(0,2e4)}function ge(o){let e=Array.from(o.querySelectorAll(J)),t=new Set,a=[];for(let n of e){if(!L(n)||G(n)||I(n))continue;let i=n.tagName.toLowerCase();["input","textarea","select"].includes(i)&&(t.add(n),a.push(n))}for(let n of e){if(!L(n)||G(n)||I(n))continue;let i=n.tagName.toLowerCase();if(["input","textarea","select"].includes(i))continue;let s=n.querySelector("input, textarea, select");if(!(s&&t.has(s))){if(n.hasAttribute("for")){let r=n.getAttribute("for"),c=r?n.ownerDocument.getElementById(r):null;if(c&&t.has(c))continue}if(i==="a"){let r=n.getAttribute("role");if(!(r==="button"||r==="radio"||r==="checkbox"||r==="option"||n.closest('[class*="choice" i], [class*="option" i], [class*="answer" i], [data-testid*="option" i]')))continue}a.push(n)}}return a.slice(0,100).map(n=>Pe(n,"answer"))}function Oe(o){let e=[o,o.parentElement,o.parentElement?.parentElement,document.body].filter(Boolean),t=new Set,a=[];for(let n of e)for(let i of Array.from(n.querySelectorAll(J)))if(!(t.has(i)||!L(i)||!G(i)||I(i))&&(t.add(i),a.push(Pe(i,"navigation")),a.length>=10))return a;return a}function se(o=!1){let e=N();e=Re(e),o&&(e=ct(e));let t=ge(e),a=Oe(e);if(t.length===0){let r=ge(document.body);r.length>0&&(e=ct(e),t=ge(e),t.length===0&&(t=r,e=document.querySelector('main, article, form, [role="main"]')||document.body))}a.length===0&&(a=Oe(document.body));let n=e.innerText&&e.innerText.trim().length>0?e.innerText:e.textContent||"",i=M(n,16e3),s=[...t,...a].slice(0,120);return!i||s.length===0&&i.length<30?M(document.body.innerText||document.body.textContent||"",16e3).length>=30?X():null:{sourceUrl:window.location.href.slice(0,2e3),pageTitle:document.title.slice(0,500)||"P\xE1gina de Quest\xE3o",questionText:i,htmlSnippet:dt(e),controls:s,scope:e}}function X(){let o=document.body.innerText||document.body.textContent||document.documentElement.textContent||"",e=M(o,16e3),t=ge(document.body),a=Oe(document.body),n=[...t,...a].slice(0,120),i=document.querySelector('main, article, form, [role="main"], [data-test-id*="content" i], [class*="content" i]')||document.body;return{sourceUrl:window.location.href.slice(0,2e3),pageTitle:document.title.slice(0,500)||"P\xE1gina de Quest\xE3o",questionText:e,htmlSnippet:dt(i).slice(0,15e3),controls:n,scope:i}}function ut(o){let e=o.controls.map(t=>`${t.role}:${t.id}:${t.type}:${t.value}:${t.disabled}`).join("|");return[window.location.href,o.pageTitle,o.questionText.slice(0,500),e].join("::")}function k(o){return o?!!(o.closest('#easyquiz-shadow-root, .eq-sidebar, .eq-launcher, [data-easyquiz-ignore="true"], .btn-inject-eq, #btn-inject-script')||o.getAttribute?.("data-easyquiz-ignore")==="true"):!1}function y(o){return o==null?"":(typeof o=="string"?o:String(o)).replace(/^(\([0-9a-zA-Z]{1,2}\)|[0-9]{1,3}|[a-zA-Z])[\.\)\-\:]\s+/,"").replace(/[\.\u2026]{2,}/g," ").replace(/['"“”«»]/g,"").replace(/\s+/g," ").trim()}function $(o){if(!o||o instanceof HTMLInputElement||o instanceof HTMLSelectElement||o instanceof HTMLTextAreaElement||o.getAttribute("draggable")==="true"||o.classList.contains("dnd-card")||o.hasAttribute("data-category")||o.hasAttribute("data-dropzone"))return o;if(o.hasAttribute("for")){let a=o.getAttribute("for");if(a){let n=o.ownerDocument.getElementById(a);if(n)return n}}let e=o.closest('label, .option-card, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, tr, li, .dnd-card, [class*="option-card" i], [class*="choice-card" i]');if(e&&!["article","section","main","form","body"].includes(e.tagName.toLowerCase())){let a=e.getAttribute("for"),i=(a?e.ownerDocument.getElementById(a):null)||e.querySelector('input:not([type="hidden"]), select, textarea');return i||e}let t=o.closest('button, a, [role="button"], [draggable="true"]');if(t)return t;if(["body","html","main","section","article","form"].includes(o.tagName.toLowerCase())){let a=o.querySelector('button, [role="button"], a, input:not([type="hidden"]), select, textarea, [role="radio"], [role="checkbox"], .option-card, label');if(a)return $(a)}return o}function pt(o){let e=o;if(!e||!document.contains(e))try{e=N()}catch{}e=e||document.body;let t=Array.from(e.querySelectorAll("tr")).filter(i=>L(i)&&i.querySelector('input[type="radio"], input[type="checkbox"]'));if(t.length>1)return t;let a=Array.from(e.querySelectorAll('input[type="checkbox"], input[type="radio"], [role="checkbox"], [role="radio"]')).filter(i=>L(i)&&!k(i));return a.length>0?a:Array.from(e.querySelectorAll('.option-card, [role="option"], [class*="choice-card" i], [class*="option-card" i], li[class*="choice" i], li[class*="option" i]')).filter(i=>L(i)&&!k(i)).filter(i=>!i.parentElement?.closest('.option-card, [role="option"], [class*="choice-card" i], [class*="option-card" i]'))}function C(o,e,t=!1){if(o==null)return null;let n=(typeof o=="string"?o:String(o)).trim().replace(/^["'“”«»]+|["'“”«»]+$/g,"");if(!n)return null;let i=H(n),s=document.querySelector(`[data-easyquiz-id="${i}"]`);if(s&&!k(s)&&L(s))return $(s);try{let l=document.getElementById(n);if(l&&!k(l)&&L(l))return l.hasAttribute("data-category")||l.hasAttribute("data-dropzone")||l.classList.contains("dnd-zone")?l:$(l)}catch{}let r=n.match(/^(?:item|opção|opcao|afirmação|afirmacao|alternativa|linha|afirmativa|questão|questao|campo|blank|lacuna|input|resposta)?\s*#?_?([0-9]+)$/i);if(r){let l=parseInt(r[1],10);if(t){let g=document.body;try{g=N()||document.body}catch{}let b=Array.from(g.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, select, [contenteditable="true"]')).filter(v=>L(v)&&!k(v));if(l>=1&&l-1<b.length)return b[l-1];if(l===0&&b.length>0)return b[0]}let h=l-1;if(h>=0){let g=pt();if(h<g.length){let m=g[h];if(m.tagName.toLowerCase()==="tr"){if(e){let x=m.querySelector(`input[value="${H(e)}" i], [data-value="${H(e)}" i]`);if(x)return x}let f=m.querySelector("input");if(f)return f}return $(m)}let b=document.body;try{b=N()||document.body}catch{}let v=Array.from(b.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, select, [contenteditable="true"]')).filter(m=>L(m)&&!k(m));if(h<v.length)return v[h]}}let c=n.match(/^(?:item|opção|opcao|afirmação|afirmacao|alternativa|linha|afirmativa|questão|questao)?\s*#?([a-eA-E])$/i);if(c){let l=c[1].toUpperCase().charCodeAt(0)-65;if(l>=0){let h=pt();if(l<h.length){let g=h[l];if(g.tagName.toLowerCase()==="tr"){if(e){let v=g.querySelector(`input[value="${H(e)}" i], [data-value="${H(e)}" i]`);if(v)return v}let b=g.querySelector("input");if(b)return b}return $(g)}}}if(/^[a-zA-Z0-9_-]{1,10}$/.test(n)){let h=Array.from(document.querySelectorAll(`[data-category="${i}" i], [data-dropzone="${i}" i], [data-role="dropzone"][data-category="${i}" i]`)).find(m=>L(m)&&!k(m));if(h)return h;let b=Array.from(document.querySelectorAll(`input[value="${i}" i], [data-value="${i}" i], input[id="${i}" i], input[placeholder="${i}" i], textarea[placeholder="${i}" i], [title="${i}" i]`)).find(m=>L(m)&&!k(m));if(b)return $(b);let v=Array.from(document.querySelectorAll('.option-badge, [class*="badge" i], [class*="letter" i], .option-card span, label span')).find(m=>{if(!L(m)||k(m))return!1;let f=y(m.textContent).toLowerCase();return f===n.toLowerCase()||f===n.toLowerCase()+")"});if(v)return $(v)}try{let h=Array.from(document.querySelectorAll(`[name="${i}"], [value="${i}"], [placeholder="${i}" i], [title="${i}" i], [data-category="${i}" i], [data-dropzone="${i}" i], [data-testid="${i}" i], [data-test-id="${i}" i], [aria-label="${i}" i]`)).find(g=>L(g)&&!k(g));if(h)return h.hasAttribute("data-category")||h.hasAttribute("data-dropzone")||h.classList.contains("dnd-zone")?h:$(h)}catch{}if(/^[.#\[]|\s|[>+~:]/.test(n))try{let h=Array.from(document.querySelectorAll(n)).find(g=>L(g)&&!k(g));if(h)return $(h)}catch{}try{let l=n.replace(/"/g,""),h=`//button[normalize-space(.)="${l}"] | //a[normalize-space(.)="${l}"] | //*[not(*) and normalize-space(.)="${l}"] | //*[@aria-label="${l}"] | //*[@data-category="${l}"] | //*[@data-testid="${l}"]`,g=document.evaluate(h,document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);for(let b=0;b<g.snapshotLength;b++){let v=g.snapshotItem(b);if(v&&L(v)&&!k(v)){if(["body","html"].includes(v.tagName.toLowerCase())){let f=v.querySelector('button, [role="button"], a, input, [role="radio"], [role="checkbox"], label');if(f&&L(f))return $(f)}return v.closest('[data-role="dropzone"], [class*="category" i], [class*="bucket" i], [class*="column" i], [class*="drop" i]')||$(v)}}}catch{}let p=y(n).toLowerCase(),u=Array.from(document.querySelectorAll('button, a, div, span, li, p, label, input, textarea, select, [draggable="true"], [data-testid], [class*="option" i], [class*="card" i], [class*="item" i], [class*="choice" i], [class*="category" i], [class*="bucket" i]'));for(let l of u){if(!L(l)||k(l)||l.closest("header, nav, .stepper, .step-item, .progress-bar-container")||I(l)||!!(l.matches('article, section, form, main, [class*="container" i], [class*="grid" i], .dnd-pool, .dnd-zones')||l.querySelector('label, [role="radio"], [role="checkbox"], .dnd-card, [draggable="true"], .option-card, tr'))&&!l.matches(".dnd-zone, [data-category], [data-dropzone]"))continue;let g=y(l.textContent).toLowerCase(),b=y(l.getAttribute("aria-label")||"").toLowerCase(),v=y(l.getAttribute("placeholder")||"").toLowerCase(),m=y(l.getAttribute("title")||"").toLowerCase(),f=y(l.getAttribute("name")||"").toLowerCase(),x=y(l.getAttribute("data-category")||"").toLowerCase(),w=l instanceof HTMLInputElement||l instanceof HTMLButtonElement?l.value:"",q=y(w).toLowerCase(),T=g.startsWith(p+")")||g.startsWith(p+".")||g.startsWith(p+" -")||g.startsWith(p+":");if(g===p||b===p||v===p||m===p||f===p||x&&x===p||q&&q===p||T)return l.closest('[data-role="dropzone"], [class*="category" i], [class*="bucket" i], [class*="column" i], [class*="drop" i]')||$(l)}if(p.length>=3)for(let l of u){if(!L(l)||k(l)||l.closest("header, nav, .stepper, .step-item, .progress-bar-container")||I(l)||!!(l.matches('article, section, form, main, [class*="container" i], [class*="grid" i], .dnd-pool, .dnd-zones')||l.querySelector('label, [role="radio"], [role="checkbox"], .dnd-card, [draggable="true"], .option-card, tr'))&&!l.matches(".dnd-zone, [data-category], [data-dropzone]"))continue;let g=y(l.textContent).toLowerCase(),b=y(l.getAttribute("aria-label")||"").toLowerCase(),v=y(l.getAttribute("placeholder")||"").toLowerCase(),m=y(l.getAttribute("title")||"").toLowerCase(),f=y(l.getAttribute("name")||"").toLowerCase();if(g.includes(p)||b.includes(p)||v.includes(p)||m.includes(p)||f.includes(p)){if(Array.from(l.children).some(T=>{let S=y(T.textContent).toLowerCase();return S&&S.includes(p)}))continue;return l.closest('[data-role="dropzone"], [class*="category" i], [class*="bucket" i], [class*="column" i], [class*="drop" i]')||$(l)}let x=p.split(/\s+/).filter(Boolean);if(x.length>=3){let w=x.slice(0,Math.min(5,x.length)).join(" ");if(g.includes(w)||b.includes(w)||v.includes(w))return $(l)}}return null}function mt(o,e){for(let t of e)o.dispatchEvent(new Event(t,{bubbles:!0,composed:!0}))}function B(o,e){if(!o)return;let t=o instanceof HTMLInputElement&&["checkbox","radio"].includes(o.type)?o:o.querySelector('input[type="checkbox"], input[type="radio"]')||(o.hasAttribute("for")?o.ownerDocument.getElementById(o.getAttribute("for")):null);if(t&&o!==t){if(t.type==="checkbox"){_(t,!0);return}if(t.type==="radio"){_(t,!0);return}}try{o.scrollIntoView({block:"center",inline:"center",behavior:"instant"})}catch{}try{o.focus?.()}catch{}if(typeof HTMLButtonElement<"u"&&o instanceof HTMLButtonElement||typeof HTMLAnchorElement<"u"&&o instanceof HTMLAnchorElement||o.tagName?.toLowerCase()==="a"||o.tagName?.toLowerCase()==="button"||typeof HTMLInputElement<"u"&&o instanceof HTMLInputElement&&!["checkbox","radio"].includes(o.type)){try{o.click()}catch{}return}let n=o.getBoundingClientRect(),i=e?e[0]:Math.round(n.left+Math.max(1,n.width/2)),s=e?e[1]:Math.round(n.top+Math.max(1,n.height/2)),r={bubbles:!0,cancelable:!0,composed:!0,view:window,clientX:i,clientY:s};try{o.dispatchEvent(new PointerEvent("pointerdown",{...r,button:0,buttons:1}))}catch{}try{o.dispatchEvent(new MouseEvent("mousedown",{...r,button:0,buttons:1}))}catch{}try{o.dispatchEvent(new PointerEvent("pointerup",{...r,button:0,buttons:0}))}catch{}try{o.dispatchEvent(new MouseEvent("mouseup",{...r,button:0,buttons:0}))}catch{}try{o.dispatchEvent(new MouseEvent("click",{...r,button:0,buttons:0}))}catch{}try{o.click()}catch{}}function fe(o,e){let t=o;if(t.hasAttribute("for")){let d=t.getAttribute("for"),p=t.ownerDocument.getElementById(d);p&&(t=p)}if(typeof HTMLSelectElement<"u"&&t instanceof HTMLSelectElement||t.tagName?.toLowerCase()==="select"||t.getAttribute("role")==="combobox"||t.getAttribute("role")==="listbox"||t.matches?.('[role="combobox"], [role="listbox"], [class*="select" i], [class*="dropdown" i]')){be(t,[e]);return}let n=t.querySelector('select, [role="combobox"], [role="listbox"]');if(n){be(n,[e]);return}if(!(t instanceof HTMLInputElement)&&!(t instanceof HTMLTextAreaElement)&&!(t instanceof HTMLSelectElement)&&!t.isContentEditable){let d=t.querySelector('input:not([type="hidden"]), textarea, select, [contenteditable="true"]');if(d)t=d;else{let u=t.closest('.form-group, .field, [class*="input" i], [class*="control" i], label, tr, td, li, p, div')?.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, select, [contenteditable="true"]');if(u)t=u;else{let l=t.nextElementSibling;for(;l;){if(l instanceof HTMLInputElement&&!["hidden","button","submit","checkbox","radio"].includes(l.type)||l instanceof HTMLTextAreaElement||l instanceof HTMLElement&&l.isContentEditable){t=l;break}let h=l.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(h){t=h;break}l=l.nextElementSibling}}}}if(t instanceof HTMLButtonElement||t.tagName.toLowerCase()==="a"||t.getAttribute("role")==="button"||t instanceof HTMLInputElement&&["button","submit","reset","image"].includes(t.type)){let d=t.parentElement?.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(d)t=d;else{let p=document.body;try{p=N()||document.body}catch{}let u=p.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(u)t=u;else{console.warn("[EasyQuiz] setNativeValue: Nenhum campo de texto encontrado para receber o valor.");return}}}if(!(t instanceof HTMLInputElement)&&!(t instanceof HTMLTextAreaElement)&&!(t instanceof HTMLSelectElement)&&!t.isContentEditable){let d=document.body;try{d=N()||document.body}catch{}let p=d.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(p)t=p;else{console.warn("[EasyQuiz] setNativeValue: Nenhum campo de texto encontrado para receber o valor.");return}}if(t instanceof HTMLInputElement&&["checkbox","radio"].includes(t.type)){let d=["true","1","checked","yes","sim"].includes(e.toLowerCase())||e===t.value;_(t,d);return}let s=String(e??""),r=s;if(t instanceof HTMLInputElement&&t.type==="number"){let d=s.replace(",",".").replace(/[^0-9.-]/g,"");d&&!isNaN(Number(d))&&(r=d)}try{t.scrollIntoView?.({block:"center",inline:"center",behavior:"instant"}),t.focus?.()}catch{}let c=!1;try{if(t instanceof HTMLInputElement||t instanceof HTMLTextAreaElement){if(t.type!=="number"){try{t.select?.()}catch{}c=document.execCommand?.("insertText",!1,r)||!1}}else if(t.isContentEditable){try{document.execCommand?.("selectAll",!1,void 0)}catch{}c=document.execCommand?.("insertText",!1,r)||!1}}catch{}if(t instanceof HTMLInputElement||t instanceof HTMLTextAreaElement){try{let u=t._valueTracker;u&&u.setValue(r===""?" ":"")}catch{}let d=t instanceof HTMLTextAreaElement?HTMLTextAreaElement.prototype:HTMLInputElement.prototype,p=Object.getOwnPropertyDescriptor(d,"value")?.set;p?p.call(t,r):t.value=r;try{t.dispatchEvent(new KeyboardEvent("keydown",{bubbles:!0,cancelable:!0,key:r.slice(-1)||"a"}))}catch{}try{t.dispatchEvent(new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,composed:!0,data:r,inputType:"insertText"}))}catch{}try{t.dispatchEvent(new InputEvent("input",{bubbles:!0,cancelable:!0,composed:!0,data:r,inputType:"insertText"}))}catch{t.dispatchEvent(new Event("input",{bubbles:!0,cancelable:!0,composed:!0}))}try{t.dispatchEvent(new KeyboardEvent("keyup",{bubbles:!0,cancelable:!0,key:r.slice(-1)||"a"}))}catch{}try{t.dispatchEvent(new Event("change",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}try{t.dispatchEvent(new FocusEvent("blur",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}if(t.value!==r&&!(t instanceof HTMLInputElement&&t.type==="number"&&Number(t.value)===Number(r))){t.value=r;try{p?.call(t,r)}catch{}}return}if(t.isContentEditable){if(t.textContent?.trim()!==r.trim()){t.textContent=r;try{t.innerText=r}catch{}}try{t.dispatchEvent(new InputEvent("input",{bubbles:!0,cancelable:!0,composed:!0,data:r,inputType:"insertText"}))}catch{t.dispatchEvent(new Event("input",{bubbles:!0,cancelable:!0,composed:!0}))}try{t.dispatchEvent(new Event("change",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}try{t.dispatchEvent(new FocusEvent("blur",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}return}try{"value"in t&&(t.value=r),t.dispatchEvent(new Event("input",{bubbles:!0,cancelable:!0,composed:!0})),t.dispatchEvent(new Event("change",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}}function ye(o,e=""){if(o==null)return e;let t=typeof o=="string"?o:String(o);if(!t)return e;let a=/^(eq-|#|\$|\.|input_|mat-|choice_|radio_|chk_)/i.test(t),n=y(t),i=C(t)||C(n);if(!i)return a?e:n||e;let s=i.closest('label, .option-card, [class*="choice" i], [class*="option" i], .quiz-option, tr, td, li');if(s){let u=y(s.textContent);if(u&&u.length>0&&u.length<150)return u}if(i.id){let u=document.querySelector(`label[for="${H(i.id)}"]`);if(u){let l=y(u.textContent);if(l&&l.length>0&&l.length<150)return l}}let r=i.getAttribute("aria-label");if(r)return y(r);let c=i.getAttribute("placeholder");if(c)return y(c);let d=y(i.textContent);if(d&&d.length>0&&d.length<120)return d;let p=i instanceof HTMLInputElement||i instanceof HTMLButtonElement?i.value:"";return p?y(p):a?e:n||e}function _(o,e){let t=o.closest('.option-card, label, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, [class*="option" i], [class*="choice" i], li')||o,a=o instanceof HTMLInputElement&&["checkbox","radio"].includes(o.type)?o:t.querySelector('input[type="checkbox"], input[type="radio"]');if(!a&&t.hasAttribute("for")&&(a=t.ownerDocument.getElementById(t.getAttribute("for"))),t){let n=e?"true":"false";t.setAttribute("aria-checked",n),t.setAttribute("aria-selected",n),t.classList.toggle("selected",e),t.classList.toggle("active",e),t.classList.toggle("checked",e)}if(a){if(a.checked===e)return;try{a.focus?.(),a.click()}catch{}if(a.checked!==e){try{let n=a._valueTracker;n&&n.setValue(!e)}catch{}try{Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"checked")?.set?.call(a,e)}catch{}a.checked=e,mt(a,["input","change"])}}else{try{t.focus?.()}catch{}try{t.click()}catch{B(t)}}}function be(o,e){let t=typeof HTMLSelectElement<"u"&&o instanceof HTMLSelectElement||o.tagName?.toLowerCase()==="select"?o:o.querySelector("select");if(t){let s=e.map(d=>y(d).toLowerCase()),r=!1,c=(d,p)=>{d.selected=!0,t.selectedIndex=p;try{Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype,"value")?.set?.call(t,d.value)}catch{}try{let u=t._valueTracker;u&&u.setValue(d.value)}catch{}r=!0};for(let d=0;d<t.options.length;d++){let p=t.options[d],u=p.value.toLowerCase(),l=y(p.textContent).toLowerCase();if(s.some(g=>g===u||g===l)){if(c(p,d),!t.multiple)break}else t.multiple||(p.selected=!1)}if(!r)for(let d of s){let p=d.match(/^(?:item|opção|opcao|alternativa|linha|escolha|campo)?\s*#?_?([0-9]+)$/i);if(p){let u=parseInt(p[1],10),h=t.options[0]?.value===""||t.options[0]?.disabled?u:u>=1?u-1:0;if(h>=0&&h<t.options.length&&(c(t.options[h],h),!t.multiple))break}}if(!r){for(let d of s)if(/^[a-z]$/i.test(d)){let p=d.toUpperCase().charCodeAt(0)-65,l=t.options[0]?.value===""||t.options[0]?.disabled?p+1:p;if(l>=0&&l<t.options.length&&(c(t.options[l],l),!t.multiple))break}}if(!r){let d=p=>p.normalize("NFD").replace(/[\u0300-\u036f]/g,"");for(let p=0;p<t.options.length;p++){let u=t.options[p],l=d(u.value.toLowerCase()),h=d(y(u.textContent).toLowerCase());if(s.some(b=>{let v=d(b);return l.includes(v)||h.includes(v)||v.length>2&&(v.includes(l)||v.includes(h))})&&(c(u,p),!t.multiple))break}}if(r){mt(t,["focus","input","change","blur"]);return}}let a=o.matches?.('[role="combobox"], [role="listbox"], [class*="select" i], [class*="dropdown" i]')?o:o.closest('[role="combobox"], [role="listbox"], [class*="select" i], [class*="dropdown" i]');a&&B(a);let n=e.map(s=>y(s).toLowerCase()),i=Array.from(document.querySelectorAll('[role="listbox"] [role="option"], [role="menu"] [role="menuitem"], .select-dropdown li, .dropdown-menu .dropdown-item, .ant-select-item-option, .MuiMenuItem-root, [class*="option-item"], li[data-value]')).filter(s=>L(s)&&!k(s));for(let s of n){let r=i.find(d=>{let p=y(d.textContent).toLowerCase(),u=y(d.getAttribute("data-value")||d.getAttribute("value")||"").toLowerCase();return p===s||u===s||p.includes(s)||s.length>2&&s.includes(p)});if(r){B(r);let d=r.querySelector('input[type="radio"], input[type="checkbox"]');d&&_(d,!0);return}let c=C(s);if(c){B(c);return}}}function $t(o,e){try{let t=new DataTransfer;try{t.setData("text/plain",o)}catch{}try{t.setData("text/html",e)}catch{}return t}catch{return null}}function Ne(o){try{o.click()}catch{let e=o.ownerDocument.defaultView||window;o.dispatchEvent(new e.MouseEvent("click",{bubbles:!0,cancelable:!0,composed:!0,view:e}))}}function U(o,e){let t=y(o).toLowerCase();if(!t)return null;let a=e==="source"?'.dnd-card, [draggable="true"]':'[data-dropzone], [data-category], [data-role="dropzone"]',n=Array.from(document.querySelectorAll(a)),i=e==="destination"?n.find(s=>[s.getAttribute("data-category"),s.getAttribute("data-dropzone")].some(r=>r?.trim().toLowerCase()===t)):null;return i&&L(i)&&!k(i)?i:n.find(s=>{if(!L(s)||k(s))return!1;let r=y(`${s.textContent||""} ${s.getAttribute("data-category")||""} ${s.getAttribute("data-dropzone")||""}`).toLowerCase();return r===t||r.includes(t)})||null}async function ve(o,e,t=1){try{o.scrollIntoView({block:"center",inline:"center",behavior:"instant"})}catch{}let a=o.getBoundingClientRect(),n=e.getBoundingClientRect(),i=Math.round(a.left+Math.max(1,a.width/2)),s=Math.round(a.top+Math.max(1,a.height/2)),r=Math.round(n.left+Math.max(1,n.width/2)),c=Math.round(n.top+Math.max(1,n.height/2)),d=y(e.textContent).toLowerCase();if(d){let b=Array.from(o.querySelectorAll('button, [role="button"], input[type="radio"], input[type="checkbox"], option, .btn, [class*="tag" i]')).find(v=>{let m=y(v.textContent).toLowerCase(),f=v instanceof HTMLInputElement||v instanceof HTMLOptionElement?y(v.value).toLowerCase():"";return m&&(d.includes(m)||m.includes(d))||f&&(d.includes(f)||f.includes(d))});b&&(B(b),await new Promise(v=>setTimeout(v,120)))}Ne(o),await new Promise(g=>setTimeout(g,140)),Ne(e);let p=e.querySelector('[data-role="dropzone"], [class*="bucket" i], [class*="slot" i], [class*="drop" i], [class*="target" i], [class*="items" i], ul, ol');if(p&&p!==e&&Ne(p),await new Promise(g=>setTimeout(g,100)),!e.contains(o)&&o.matches('.dnd-card, [draggable="true"]')&&e.matches('.dnd-zone, [data-dropzone], [data-role="dropzone"]')&&e.appendChild(o),e.contains(o)&&o.matches('.dnd-card, [draggable="true"]'))return;let u={bubbles:!0,cancelable:!0,composed:!0,view:window,clientX:i,clientY:s,screenX:i,screenY:s,button:0,buttons:1};try{o.dispatchEvent(new PointerEvent("pointerdown",{...u,isPrimary:!0,pointerId:1,pointerType:"mouse",pressure:.5}))}catch{}o.dispatchEvent(new MouseEvent("mousedown",u));let l=4;for(let g=1;g<=l;g++){let b=Math.round(i+(r-i)*(g/l)),v=Math.round(s+(c-s)*(g/l)),m={...u,clientX:b,clientY:v,screenX:b,screenY:v};try{o.dispatchEvent(new PointerEvent("pointermove",{...m,isPrimary:!0,pointerId:1,pointerType:"mouse",pressure:.5}))}catch{}document.dispatchEvent(new MouseEvent("mousemove",m))}let h={bubbles:!0,cancelable:!0,composed:!0,view:window,clientX:r,clientY:c,screenX:r,screenY:c,button:0,buttons:0};try{e.dispatchEvent(new PointerEvent("pointerup",{...h,isPrimary:!0,pointerId:1,pointerType:"mouse",pressure:0}))}catch{}e.dispatchEvent(new MouseEvent("mouseup",h)),e.dispatchEvent(new MouseEvent("click",h));try{let g=$t(M(o.textContent),o.outerHTML),b={...u},v={...h};g&&(b.dataTransfer=g,v.dataTransfer=g);let m=o.ownerDocument.defaultView?.DragEvent;if(!m)throw new Error("DragEvent n\xE3o dispon\xEDvel neste documento");o.dispatchEvent(new m("dragstart",b)),e.dispatchEvent(new m("dragenter",v)),e.dispatchEvent(new m("dragover",v)),e.dispatchEvent(new m("drop",v)),o.dispatchEvent(new m("dragend",b))}catch(g){console.warn("[EasyQuiz] DragEvent ignorado com seguran\xE7a:",g)}try{let g=new Touch({identifier:1,target:o,clientX:i,clientY:s}),b=new Touch({identifier:1,target:e,clientX:r,clientY:c});o.dispatchEvent(new TouchEvent("touchstart",{bubbles:!0,cancelable:!0,touches:[g]})),e.dispatchEvent(new TouchEvent("touchmove",{bubbles:!0,cancelable:!0,touches:[b]})),e.dispatchEvent(new TouchEvent("touchend",{bubbles:!0,cancelable:!0,touches:[]}))}catch{}if(t>=2&&!e.contains(o))try{o.focus?.(),o.dispatchEvent(new KeyboardEvent("keydown",{key:" ",code:"Space",bubbles:!0})),o.dispatchEvent(new KeyboardEvent("keyup",{key:" ",code:"Space",bubbles:!0})),await new Promise(g=>setTimeout(g,80)),e.focus?.(),e.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",bubbles:!0})),e.dispatchEvent(new KeyboardEvent("keyup",{key:"Enter",code:"Enter",bubbles:!0}))}catch{}}var gt={fill:(o,e)=>{let t=C(o);t?fe(t,e):console.warn(`$eq.fill: Elemento '${o}' n\xE3o encontrado`)},click:o=>{let e=C(o);e?!!(e.closest('.option-card, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, [class*="option" i], [class*="choice" i]')||e.querySelector('input[type="radio"], input[type="checkbox"]')||e instanceof HTMLInputElement&&["checkbox","radio"].includes(e.type))?_(e,!0):B(e):console.warn(`$eq.click: Elemento '${o}' n\xE3o encontrado`)},check:(o,e)=>{let t=C(o);t?_(t,e):console.warn(`$eq.check: Elemento '${o}' n\xE3o encontrado`)},find:(o,e)=>C(o,e),drag:(o,e)=>{let t=U(o,"source")||C(o),a=U(e,"destination")||C(e);t&&a?ve(t,a):console.warn(`$eq.drag: Origem ou destino n\xE3o encontrado ('${o}' -> '${e}')`)},categorize:async(o,e)=>{let t=U(o,"source")||C(o),a=U(e,"destination")||C(e);if(!t||!a){console.warn(`$eq.categorize: Item ou categoria n\xE3o encontrados ('${o}' -> '${e}')`);return}await ve(t,a)},execute:(o,e=!1,t=1)=>Ve(o,e,t)};typeof window<"u"&&(window.$eq=gt);async function Pt(o,e=1,t=ie()){if(Ie(o,t),o.t==="js"){let r=String(o.v||"");rt(r);try{new Function("$eq","document","window",r)(gt,document,window)}catch(c){throw console.warn("[EasyQuiz JS Execution]",c),c}return}if(o.t==="drag"){let r=U(o.from,"source")||C(o.from),c=U(o.to,"destination")||C(o.to);!r&&o.from&&(r=C(y(o.from))),!c&&o.to&&(c=C(y(o.to))),r&&c?await ve(r,c,e):console.warn(`[EasyQuiz] Drag: alvo n\xE3o encontrado ('${o.from}' -> '${o.to}')`);return}let a=o.id!==void 0&&o.id!==null?String(o.id):"";!a&&o.t==="val"&&(a=o.target??o.name??o.selector??"1");let n=o.v!==void 0?o.v:o.value!==void 0?o.value:o.val!==void 0?o.val:o.text,i=n!=null?String(n).trim():"",s=C(a,i,o.t==="val");if(!s&&a&&(s=C(y(a),i,o.t==="val")),s&&i){if(s instanceof HTMLInputElement&&s.type==="radio"&&s.name){if(y(s.value).toLowerCase()!==y(i).toLowerCase()){let r=document.querySelector(`input[type="radio"][name="${H(s.name)}"][value="${H(i)}" i]`);if(r)s=r;else{let d=Array.from(document.querySelectorAll(`input[type="radio"][name="${H(s.name)}"]`)).find(p=>{let u=p.closest("label, .vf-label, .option-card, tr, td, div");return u&&y(u.textContent).toLowerCase().includes(y(i).toLowerCase())});d&&(s=d)}}}else if(!(s instanceof HTMLInputElement)&&!(s instanceof HTMLSelectElement)&&!(s instanceof HTMLTextAreaElement)){let r=s.querySelector(`input[value="${H(i)}" i], [data-value="${H(i)}" i]`);if(r)s=r;else{let d=Array.from(s.querySelectorAll('input[type="radio"], input[type="checkbox"]')).find(p=>{let u=p.closest("label, .vf-label, .option-card, td, div");return u&&y(u.textContent).toLowerCase().includes(y(i).toLowerCase())});d&&(s=d)}}}if(!s&&o.t==="val"){let r=document.body;try{r=N()||document.body}catch{}let c=Array.from(r.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]')).filter(d=>L(d)&&!k(d));if(c.length===1)s=c[0];else if(c.length>1){let d=y(a).toLowerCase(),p=d.match(/^#?_?([0-9]+)$/);if(p){let u=parseInt(p[1],10);u>=1&&u<=c.length?s=c[u-1]:u>=0&&u<c.length&&(s=c[u])}s||(s=c.find(l=>{let h=(l.getAttribute("placeholder")||"").toLowerCase(),g=(l.name||"").toLowerCase(),b=(l.getAttribute("aria-label")||"").toLowerCase(),v=(l.id||"").toLowerCase(),m=y($e(l)).toLowerCase(),f=y(l.closest('label, tr, td, .form-group, .field, [class*="row" i], div')?.textContent||"").toLowerCase();return h.includes(d)||g.includes(d)||b.includes(d)||v.includes(d)||m&&m.includes(d)||d.length>=2&&f.includes(d)})||c[0])}}if(!s&&o.t!=="adv"){console.warn(`[EasyQuiz] Alvo '${a}' n\xE3o encontrado para a\xE7\xE3o '${o.t}'. Prosseguindo...`);return}switch(o.t){case"val":if(s){let c=s instanceof HTMLInputElement||s instanceof HTMLTextAreaElement||s instanceof HTMLSelectElement||s.isContentEditable?s:s.querySelector('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]');if(!c){let l=s.closest('.form-group, .field, [class*="input" i], [class*="control" i], label, tr, td, li, p, div')?.querySelector('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]');l&&(c=l)}if(!c){let u=s.nextElementSibling;for(;u;){if(u instanceof HTMLInputElement&&!["hidden","button","submit","checkbox","radio"].includes(u.type)||u instanceof HTMLTextAreaElement||u instanceof HTMLElement&&u.isContentEditable){c=u;break}let l=u.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(l){c=l;break}u=u.nextElementSibling}}if(!c){let u=document.body;try{u=N()||document.body}catch{}let l=Array.from(u.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]')).filter(h=>L(h)&&!k(h));l.length>0&&(c=l[0])}let d=o.v!==void 0?o.v:o.value!==void 0?o.value:o.val!==void 0?o.val:o.text,p=d!=null?String(d):"";fe(c||s,p)}break;case"chk":s&&_(s,!!o.c);break;case"sel":if(s){let c=Array.isArray(o.v)?o.v:[String(o.v)];be(s,c)}break;case"clk":if(s)if(!!(s.closest('.option-card, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice')||s.querySelector('input[type="radio"], input[type="checkbox"]')||s instanceof HTMLInputElement&&["checkbox","radio"].includes(s.type))){let d=o.c!==void 0?!!o.c:!0;_(s,d)}else B(s,o.co);break;case"adv":let r=Be(o.id);if(r){await De(r,1200);let c=o.id||r.textContent?.trim()||"";c&&Le(window.location.hostname,{advanceSelector:c}),B(r)}else console.warn("[EasyQuiz] Bot\xE3o de avan\xE7o n\xE3o localizado.");break}}function Rt(){let o=["button","a",'[role="button"]','input[type="submit"]','input[type="button"]','[data-testid*="check" i]','[data-test-id*="check" i]'].join(",");return Array.from(document.querySelectorAll(o)).find(t=>{if(!L(t)||k(t)||t.closest("header, nav, aside"))return!1;let a=t instanceof HTMLInputElement||t instanceof HTMLButtonElement?t.value:"",n=(t.textContent||a||t.getAttribute("aria-label")||"").trim();return/(verificar|checar|check|conferir|validar|enviar|responder)/i.test(n)})||null}function Be(o){if(o){let i=C(o);if(i&&L(i)&&!k(i)&&!I(i))return i}try{let i=oe(window.location.hostname);if(i.advanceSelector){let s=C(i.advanceSelector);if(s&&L(s)&&!k(s)&&!I(s))return s}}catch{}let e=["button","a",'[role="button"]','[role="link"]','input[type="button"]','input[type="submit"]','[data-testid*="next" i]','[data-testid*="continue" i]','[data-testid*="check" i]','[data-test-id*="next" i]','[data-test-id*="continue" i]','[data-test-id*="check" i]','[class*="next" i]','[class*="continue" i]','[class*="proximo" i]','[class*="avancar" i]'].join(","),a=Array.from(document.querySelectorAll(e)).filter(i=>L(i)&&!k(i)&&!i.closest("header, nav, aside")&&!I(i));for(let i of a)if(G(i)&&!I(i))return i;for(let i of a){let s=i instanceof HTMLInputElement||i instanceof HTMLButtonElement?i.value:"",r=(i.textContent||s||i.getAttribute("aria-label")||"").trim();if(he.test(r)&&!I(i))return i}let n=document.querySelector('[data-test-id*="next" i], [data-testid*="next" i], [aria-label*="next" i], [aria-label*="pr\xF3xim" i], [aria-label*="avan\xE7ar" i], [aria-label*="continuar" i]');return n&&L(n)&&!k(n)&&!I(n)?n:null}async function De(o,e=1500){let t=Date.now();for(;Date.now()-t<e;){if(!(o.disabled===!0||o.getAttribute("aria-disabled")==="true"||o.classList.contains("disabled")||o.getAttribute("disabled")!==null))return;await new Promise(n=>setTimeout(n,100))}}function ft(){let o=(document.body?.innerText||document.body?.textContent||"").replace(/\s+/g," ").trim(),e=document.querySelectorAll('input, textarea, select, button, [role="button"], [role="option"]').length;return`${window.location.href}|${document.title}|${o.slice(0,900)}|${e}`}async function Ot(o,e=1800){let t=Date.now();for(;Date.now()-t<e;){if(ft()!==o)return{changed:!0,evidence:"URL, texto, t\xEDtulo ou conjunto de controles mudou ap\xF3s a a\xE7\xE3o."};await new Promise(n=>setTimeout(n,100))}return{changed:!1,evidence:"Nenhuma mudan\xE7a observ\xE1vel foi detectada dentro do tempo limite."}}async function ht(o){if(o.t==="js"||o.t==="adv")return;if(o.t==="drag"){let n=C(o.from)||C(y(o.from)),i=C(o.to)||C(y(o.to));n&&i&&await ve(n,i,2);return}let e=o.id||"",t=o.v!==void 0?String(o.v).trim():"",a=C(e,t)||C(y(e),t);if(o.t==="clk"||o.t==="chk"){if(!a&&e){let i=Array.from(document.querySelectorAll('input, label, button, [role="radio"], [role="checkbox"], .option-card, [class*="option" i], [class*="choice" i]')),s=y(e).toLowerCase();a=i.find(r=>{let c=y(r.textContent).toLowerCase(),d=y(r.value||"").toLowerCase();return c.includes(s)||d===s||c.startsWith(s+")")||c.startsWith("("+s+")")})||null}let n=o.v!==void 0?String(o.v).trim():"";if(a&&n){if(a instanceof HTMLInputElement&&a.type==="radio"&&a.name){if(y(a.value).toLowerCase()!==y(n).toLowerCase()){let i=document.querySelector(`input[type="radio"][name="${H(a.name)}"][value="${H(n)}" i]`);if(i)a=i;else{let r=Array.from(document.querySelectorAll(`input[type="radio"][name="${H(a.name)}"]`)).find(c=>{let d=c.closest("label, .vf-label, .option-card, tr, td, div");return d&&y(d.textContent).toLowerCase().includes(y(n).toLowerCase())});r&&(a=r)}}}else if(!(a instanceof HTMLInputElement)&&!(a instanceof HTMLSelectElement)&&!(a instanceof HTMLTextAreaElement)){let i=a.querySelector(`input[value="${H(n)}" i], [data-value="${H(n)}" i]`);if(i)a=i;else{let r=Array.from(a.querySelectorAll('input[type="radio"], input[type="checkbox"]')).find(c=>{let d=c.closest("label, .vf-label, .option-card, td, div");return d&&y(d.textContent).toLowerCase().includes(y(n).toLowerCase())});r&&(a=r)}}}if(a){let i=a.closest('.option-card, label, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, li')||a,s=a instanceof HTMLInputElement&&["radio","checkbox"].includes(a.type)?a:i.querySelector('input[type="radio"], input[type="checkbox"]')||(i.getAttribute("for")?i.ownerDocument.getElementById(i.getAttribute("for")):null),r=o.t==="chk"||o.c!==void 0?!!o.c:!0;if(_(s||i,r),s&&s.checked!==r){try{let c=s._valueTracker;c&&c.setValue(!r)}catch{}try{Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"checked")?.set?.call(s,r)}catch{}s.checked=r,s.dispatchEvent(new Event("input",{bubbles:!0,composed:!0})),s.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}}return}if(o.t==="val"){let n=null;if(a&&(n=a instanceof HTMLInputElement||a instanceof HTMLTextAreaElement||a.isContentEditable?a:a.querySelector('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]')),!n){let i=document.body;try{i=N()||document.body}catch{}let s=Array.from(i.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]')),r=y(e).toLowerCase();n=s.find(c=>{let d=(c.getAttribute("placeholder")||"").toLowerCase(),p=(c.name||"").toLowerCase(),u=(c.id||"").toLowerCase(),l=(c.getAttribute("aria-label")||"").toLowerCase();return d.includes(r)||p.includes(r)||u.includes(r)||l.includes(r)})||(s.length>0?s[0]:null)}if(n){let i=String(o.v??"");try{if(n.focus?.(),n.type!=="number"){try{n.select?.()}catch{}document.execCommand?.("insertText",!1,i)}}catch{}fe(n,i)}return}if(o.t==="sel"){if(!a&&e){let n=Array.from(document.querySelectorAll("select")),i=y(e).toLowerCase();a=n.find(s=>{let r=(s.name||"").toLowerCase(),c=(s.id||"").toLowerCase(),d=(s.getAttribute("aria-label")||"").toLowerCase();return r.includes(i)||c.includes(i)||d.includes(i)})||null}if(a){let n=Array.isArray(o.v)?o.v:[String(o.v)];be(a,n)}return}}function W(o){try{if(o.t==="val"){let e=o.v!==void 0?o.v:o.value!==void 0?o.value:o.val!==void 0?o.val:o.text,t=String(e??"").trim(),a=t,n=o.id!==void 0&&o.id!==null?String(o.id):"";n||(n=o.target??o.name??o.selector??"1");let i=C(n,a,!0)||C(y(n),a,!0);if(!i){let u=document.body;try{u=N()||document.body}catch{}let l=Array.from(u.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]')).filter(h=>L(h)&&!k(h));l.length>0&&(i=l[0])}if(!i)return!1;let s=i instanceof HTMLInputElement&&i.type==="radio"?i:i.querySelector('input[type="radio"]');if(s&&s.name){let u=document.querySelector(`input[type="radio"][name="${H(s.name)}"]:checked`);if(!u)return!1;let l=y(u.value).toLowerCase(),h=y(t).toLowerCase(),g=y(u.closest("label, .vf-label, .option-card, tr, td, div")?.textContent||"").toLowerCase();return l===h||g===h||g.includes(h)}let r=i instanceof HTMLInputElement||i instanceof HTMLTextAreaElement||i.isContentEditable?i:i.querySelector('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(!r){let l=i.closest('.form-group, .field, [class*="input" i], [class*="control" i], label, tr, td, li, p, div')?.querySelector('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]');l&&(r=l)}if(!r){let u=i.nextElementSibling;for(;u;){if(u instanceof HTMLInputElement&&!["hidden","button","submit","checkbox","radio"].includes(u.type)||u instanceof HTMLTextAreaElement||u instanceof HTMLElement&&u.isContentEditable){r=u;break}let l=u.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(l){r=l;break}u=u.nextElementSibling}}if(r instanceof HTMLSelectElement){let u=y(t).toLowerCase();return Array.from(r.options).some(l=>{if(!l.selected)return!1;let h=l.value.toLowerCase(),g=y(l.textContent).toLowerCase();return u===h||u===g||h.includes(u)||g.includes(u)})}let c=(r instanceof HTMLInputElement||r instanceof HTMLTextAreaElement?r.value:r?.textContent??i.textContent??"").trim();if(!c&&!t)return!0;if(!c&&t)return!1;let d=c.replace(",",".").replace(/\s+/g,"").toLowerCase(),p=t.replace(",",".").replace(/\s+/g,"").toLowerCase();return d===p||d.includes(p)||p.includes(d)||c.toLowerCase()===t.toLowerCase()}if(o.t==="sel"){let e=C(o.id)||C(y(o.id));if(!e)return!1;let t=e instanceof HTMLSelectElement?e:e.querySelector("select");if(!t){let i=e.matches?.('[role="combobox"], [role="listbox"], [class*="select" i], [class*="dropdown" i]')?e:e.closest('[role="combobox"], [role="listbox"], [class*="select" i], [class*="dropdown" i]');if(i){let r=(Array.isArray(o.v)?o.v:[String(o.v)]).map(d=>y(d).toLowerCase()),c=y(i.textContent).toLowerCase();return r.some(d=>c.includes(d)||d.includes(c))}return!1}let n=(Array.isArray(o.v)?o.v:[String(o.v)]).map(i=>y(i).toLowerCase());return Array.from(t.options).some(i=>{if(!i.selected)return!1;let s=i.value.toLowerCase(),r=y(i.textContent).toLowerCase();return n.some(c=>c===s||c===r||s.includes(c)||r.includes(c))})}if(o.t==="chk"||o.t==="clk"){let e=o.v!==void 0?String(o.v).trim():"",t=C(o.id,e)||C(y(o.id),e);if(!t)return!1;let a=t.closest('.option-card, label, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, li')||t,n=t instanceof HTMLInputElement&&["checkbox","radio"].includes(t.type)?t:a.querySelector('input[type="checkbox"], input[type="radio"]')||(a.getAttribute("for")?a.ownerDocument.getElementById(a.getAttribute("for")):null),i=o.t==="chk"||o.c!==void 0?!!o.c:!0;if(n&&n.type==="radio"&&o.v){let p=y(String(o.v)).toLowerCase();if(n.name){let u=document.querySelector(`input[type="radio"][name="${H(n.name)}"]:checked`);return u?y(u.value).toLowerCase()===p:!1}}if(n&&["checkbox","radio"].includes(n.type))return n.checked===i;let s=a.getAttribute("aria-checked")===String(i)||a.getAttribute("aria-selected")===String(i)||a.getAttribute("aria-pressed")===String(i),r=i?a.getAttribute("data-selected")==="true"||a.getAttribute("data-checked")==="true"||a.getAttribute("data-active")==="true"||a.getAttribute("data-state")==="checked"||a.getAttribute("data-state")==="on":a.getAttribute("data-selected")==="false"||a.getAttribute("data-checked")==="false"||a.getAttribute("data-state")==="unchecked",c=i?/active|selected|checked|picked|correct|is-selected|choice-selected|selected-option|is-checked|chosen|current|highlight|ring|border-primary/i.test(a.className||""):!/active|selected|checked|picked|correct|is-selected|choice-selected|selected-option|is-checked|chosen|current|highlight|ring|border-primary/i.test(a.className||"");return!!(s||r||c||(a instanceof HTMLButtonElement||a.getAttribute("role")==="button")&&o.t==="clk"||o.t==="clk"&&!n)}if(o.t==="drag"){let e=C(o.from)||C(y(o.from)),t=C(o.to)||C(y(o.to));return!e||!t?!1:t.contains(e)?!0:/placed|dropped|assigned|matched|done|selected/i.test(e.className||"")||e.getAttribute("data-placed")==="true"}}catch{}return!1}async function Ve(o,e,t=1,a=ie({engine:"smart",autoAdvance:e})){let n=o.actions.filter(m=>m.t!=="adv"),i=o.actions.filter(m=>m.t==="adv"),s=0,r=[],c=new Map,d=o.pageType==="question",p=n.filter(m=>m.t==="chk"||m.t==="clk"&&m.c!==void 0);if(d&&p.length>0){let m=document.body;try{m=N()||document.body}catch{}let f=Array.from(m.querySelectorAll('input[type="checkbox"], [role="checkbox"]')).filter(x=>L(x)&&!k(x));if(f.length>1){let x=new Set;for(let w of p){let q=w.t==="chk"?!!w.c:!!(w.c??!0),T="id"in w&&typeof w.id=="string"?w.id:"";if(q&&T){let S=C(T,w.v);if(S){let A=S instanceof HTMLInputElement&&S.type==="checkbox"?S:S.querySelector('input[type="checkbox"]');x.add(A||S)}}}if(x.size>0)for(let w of f)x.has(w)||(w instanceof HTMLInputElement&&w.checked||w.getAttribute("aria-checked")==="true"||w.closest(".option-card, label")?.classList.contains("selected"))&&_(w,!1)}}for(let m of n){try{await Pt(m,t,a),s++}catch(f){c.set(m,f instanceof Error?f.message:String(f)),console.warn("[EasyQuiz] A\xE7\xE3o declarativa prim\xE1ria falhou com seguran\xE7a:",m,f)}await new Promise(f=>setTimeout(f,m.t==="drag"?250:70))}await new Promise(m=>setTimeout(m,n.length>0?300:50));let u=0;for(let m of n){if(W(m)){u++;continue}console.warn(`[EasyQuiz Auto-Cura] A\xE7\xE3o '${m.t}' no alvo '${m.id||m.from||""}' n\xE3o verificada no DOM. Disparando Passagem 2 de conting\xEAncia...`);try{Ie(m,a),await ht(m)}catch(f){c.set(m,f instanceof Error?f.message:String(f)),console.warn("[EasyQuiz Auto-Cura] Rota alternativa falhou:",f)}await new Promise(f=>setTimeout(f,180)),W(m)&&(console.log("[EasyQuiz Auto-Cura] \u2713 A\xE7\xE3o recuperada com sucesso pela rota de conting\xEAncia!"),u++)}if(u<n.length&&n.length>0){console.warn(`[EasyQuiz Auto-Cura] ${n.length-u} de ${n.length} a\xE7\xE3o(\xF5es) ainda n\xE3o verificadas. Disparando Passagem 3 final...`),await new Promise(m=>setTimeout(m,200));for(let m of n)if(!W(m))try{await ht(m)}catch(f){c.set(m,f instanceof Error?f.message:String(f))}await new Promise(m=>setTimeout(m,200)),u=0;for(let m of n)W(m)&&u++}for(let m of n)W(m)||r.push(m.t==="drag"?`${m.from} -> ${m.to}`:"id"in m?m.id:m.t);let l=n.map((m,f)=>{let x=m.t==="drag"?`${m.from} -> ${m.to}`:m.t==="js"?"$eq":m.id||m.t,w=m.t==="js"?!0:m.t==="drag"?!!(U(m.from,"source")&&U(m.to,"destination")):!!(C(m.id||"")||C(y(m.id||""))),q=W(m);return{index:f,action:m,target:x,located:w,applied:!c.has(m),verified:q,strategy:m.t==="drag"?"drag-adaptive":m.t==="js"?"javascript":"declarative-dom",evidence:q?"estado do controle confirmado no DOM":"nenhuma evid\xEAncia suficiente ap\xF3s as tentativas",...c.has(m)?{error:c.get(m)}:{}}}),h=!d||n.length===0?!0:s>0&&(s===n.length||u>0),g=!1,b=!1,v="Nenhuma a\xE7\xE3o de navega\xE7\xE3o solicitada.";if(e&&(h||!d)){await new Promise(q=>setTimeout(q,n.length>0?400:150));let m=!1;if(o.pageType!=="info"){let q=Rt();q&&L(q)&&(await De(q,1200),B(q),m=!0,await new Promise(T=>setTimeout(T,800)))}let f=ft(),x=i.length>0?i[0].id:void 0,w=Be(x);if(!w&&m&&(await new Promise(q=>setTimeout(q,600)),w=Be(x)),w){await De(w,1500);let q=x||w.textContent?.trim()||"";q&&Le(window.location.hostname,{advanceSelector:q}),B(w);let T=await Ot(f,2500);b=T.changed,v=T.evidence,g=T.changed||m,!T.changed&&!m&&console.warn("[EasyQuiz] O bot\xE3o de avan\xE7o foi acionado, mas a navega\xE7\xE3o ainda n\xE3o concluiu.")}else m?(g=!0,b=!0,v="Resposta confirmada via bot\xE3o de verifica\xE7\xE3o/envio."):console.warn("[EasyQuiz] Nenhum bot\xE3o de avan\xE7o encontrado na p\xE1gina.")}return{applied:s,verified:u,success:h,advanced:g,failed:r,reports:l,navigationVerified:b,navigationEvidence:v}}var le=null,Z=[],_e=[],Nt=`
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
`;function Bt(){try{if(typeof document>"u"||!document.head)return;if(!document.getElementById("eq-image-pulse-style")){let o=document.createElement("style");o.id="eq-image-pulse-style",o.textContent=Nt,document.head.appendChild(o)}}catch{}}function Y(){le&&(le.style.removeProperty("outline"),le.style.removeProperty("outline-offset"),le=null);for(let o of Z)o.style.removeProperty("outline"),o.style.removeProperty("outline-offset"),o.style.removeProperty("background-color"),o.style.removeProperty("box-shadow"),o.removeAttribute("data-easyquiz-highlight");Z=[];for(let o of _e)o.style.removeProperty("animation"),o.style.removeProperty("outline"),o.style.removeProperty("outline-offset"),o.style.removeProperty("box-shadow"),o.removeAttribute("data-easyquiz-image-highlight");_e=[]}function Ge(o){Bt();for(let e of o){if(!e||!(e instanceof(typeof HTMLElement<"u"?HTMLElement:e.constructor)))continue;let t=e;t.style.outline="3px solid #ffd600",t.style.outlineOffset="3px",t.style.animation="eq-image-pulse-yellow-white 1.2s ease-in-out infinite",t.setAttribute("data-easyquiz-image-highlight","true"),_e.push(t)}}function je(o){Y(),le=o,o.style.outline="2px solid #00e5ff",o.style.outlineOffset="4px"}function bt(o){for(let e of o){if(e.t==="adv"||e.t==="js")continue;if(e.t==="drag"){try{let i=C(e.from),s=C(e.to);i&&(i.style.outline="2px solid #00ff88",Z.push(i)),s&&(s.style.outline="2px dashed #00e5ff",Z.push(s))}catch{}continue}if(!e.id)continue;let t=C(e.id);if(!t)continue;let a=t.closest('label, .option-card, [role="radio"], [role="checkbox"], [role="listitem"], .answer, .quiz-option, .form-check, [class*="option" i], [class*="choice" i], tr, li')||t;a.style.outline="2px solid #00ff88",a.style.outlineOffset="2px",a.style.backgroundColor="rgba(0, 255, 136, 0.12)",a.setAttribute("data-easyquiz-highlight","true"),Z.push(a);let n=t instanceof HTMLInputElement&&["checkbox","radio"].includes(t.type)?t:a.querySelector('input[type="checkbox"], input[type="radio"]');n&&n!==a&&(n.style.outline="2px solid #00ff88",n.style.outlineOffset="2px",n.style.boxShadow="0 0 10px rgba(0, 255, 136, 0.8)",n.setAttribute("data-easyquiz-highlight","true"),Z.push(n))}}var Fe=10,Dt=1400,Ue=15e5;function ee(o){return new Promise((e,t)=>{let a=new FileReader;a.onerror=()=>t(new Error("Falha ao converter blob para base64.")),a.onload=()=>{let n=String(a.result||"");e(n.split(",")[1]||"")},a.readAsDataURL(o)})}async function ce(o){let e=0,t=0;if(o instanceof HTMLImageElement?(e=o.naturalWidth||o.width,t=o.naturalHeight||o.height):(e=o.width,t=o.height),e<=0||t<=0)throw new Error("Dimens\xF5es inv\xE1lidas.");let a=Math.min(1,Dt/Math.max(e,t)),n=Math.max(1,Math.round(e*a)),i=Math.max(1,Math.round(t*a)),s=document.createElement("canvas");s.width=n,s.height=i;let r=s.getContext("2d",{alpha:!1});if(!r)throw new Error("Sem suporte a Canvas 2D.");return r.fillStyle="#ffffff",r.fillRect(0,0,n,i),r.drawImage(o,0,0,n,i),new Promise((c,d)=>{s.toBlob(p=>p?c(p):d(new Error("Falha na compress\xE3o.")),"image/jpeg",.88)})}async function Vt(o){let e=typeof o.getBoundingClientRect=="function"?o.getBoundingClientRect():{width:0,height:0},t=e.width||parseFloat(o.getAttribute("width")||"0")||parseFloat(o.style.width||"0")||400,a=e.height||parseFloat(o.getAttribute("height")||"0")||parseFloat(o.style.height||"0")||300,n=2,i=Math.min(1800,Math.max(120,Math.round(t*n))),s=Math.min(1800,Math.max(100,Math.round(a*n))),r=o.cloneNode(!0);r.getAttribute("xmlns")||r.setAttribute("xmlns","http://www.w3.org/2000/svg"),r.setAttribute("width",String(i)),r.setAttribute("height",String(s)),!r.getAttribute("viewBox")&&t>0&&a>0&&r.setAttribute("viewBox",`0 0 ${t} ${a}`);let d=new XMLSerializer().serializeToString(r),p=new Blob([d],{type:"image/svg+xml;charset=utf-8"}),u=URL.createObjectURL(p);try{let l=new Image;l.crossOrigin="anonymous",await new Promise((b,v)=>{l.onload=()=>b(),l.onerror=()=>v(new Error("Falha ao renderizar SVG em Image.")),l.src=u});let h=document.createElement("canvas");h.width=i,h.height=s;let g=h.getContext("2d",{alpha:!1});if(!g)throw new Error("Sem suporte a Canvas 2D.");return g.fillStyle="#ffffff",g.fillRect(0,0,i,s),g.drawImage(l,0,0,i,s),new Promise((b,v)=>{h.toBlob(m=>m?b(m):v(new Error("Falha na compress\xE3o do SVG.")),"image/jpeg",.92)})}finally{URL.revokeObjectURL(u)}}async function Qe(o){try{let e=o.cloneNode(!0),t=o.offsetWidth||500,a=o.offsetHeight||500,n=`
      <svg xmlns="http://www.w3.org/2000/svg" width="${t}" height="${a}">
        <foreignObject width="100%" height="100%">
          <div xmlns="http://www.w3.org/1999/xhtml" style="background:#fff;font-family:sans-serif;">
            ${e.innerHTML}
          </div>
        </foreignObject>
      </svg>
    `,i=new Blob([n],{type:"image/svg+xml;charset=utf-8"}),s=URL.createObjectURL(i),r=new Image;r.crossOrigin="anonymous",await new Promise((p,u)=>{r.onload=()=>p(),r.onerror=()=>u(new Error("Falha ao renderizar ForeignObject.")),r.src=s});let c=await ce(r),d=await ee(c);if(URL.revokeObjectURL(s),d&&d.length<=Ue)return{mediaType:"image/jpeg",base64:d,alt:"Captura via rasteriza\xE7\xE3o DOM",source:"rasterized"}}catch(e){console.warn("Falha na rasteriza\xE7\xE3o do n\xF3:",e)}return null}function _t(o,e){let t=o.closest('[data-easyquiz-id], button, [role="button"], [role="radio"], [role="checkbox"], [role="option"], label, .option-card, .quiz-option, .choice, .answer, [class*="option" i], [class*="choice" i], [class*="answer" i], li, tr');if(t&&t!==e&&L(t)&&!G(t)&&!I(t)){let i=t.dataset.easyquizId||t.id||void 0,s=M(t.innerText||t.textContent||"",120),r=t.getAttribute("aria-label")||t.getAttribute("title")||"",c=s||r,d=i?` [id: ${i}]`:"";if(c)return{associatedLabel:`Alternativa/Op\xE7\xE3o: "${c}"${d}`,targetControlId:i};if(i)return{associatedLabel:`Alternativa/Op\xE7\xE3o ${d}`,targetControlId:i}}let a=o.closest("figure")?.querySelector("figcaption")?.textContent?.trim();if(a)return{associatedLabel:`Figura do Enunciado: "${M(a,100)}"`};let n=o.closest('[class*="prompt" i], [class*="stimulus" i], [class*="question-text" i], [class*="statement" i], header, h1, h2, h3, h4, p');if(n){let i=M(n.textContent||"",80);if(i)return{associatedLabel:`Gr\xE1fico do Enunciado: "${i}"`}}return{associatedLabel:"Gr\xE1fico/Imagem do Enunciado Principal"}}async function Gt(o){let e=o.currentSrc||o.src;if(!e)return null;let t=(o.alt||o.getAttribute("aria-label")||"Imagem da quest\xE3o").slice(0,500);if(o.complete&&o.naturalWidth>0)try{let a=await ce(o),n=await ee(a);if(n&&n.length<=Ue)return{mediaType:"image/jpeg",base64:n,alt:t,source:e.slice(0,2e3)}}catch{}try{let a=await fetch(e,{mode:"cors"});if(a.ok){let n=await a.blob();if(n.type.startsWith("image/")){let i=await createImageBitmap(n),s=await ce(i);i.close();let r=await ee(s);if(r&&r.length<=Ue)return{mediaType:"image/jpeg",base64:r,alt:t,source:e.slice(0,2e3)}}}}catch{return Qe(o.parentElement||o)}return null}function jt(o){return o.querySelectorAll("path, line, polyline, polygon, circle, rect, text, image").length>0}function Ft(o){try{let e=o.style.backgroundImage||(window.getComputedStyle?window.getComputedStyle(o).backgroundImage:"");if(e&&e.includes("url(")){let t=e.match(/url\(["']?([^"')]+)["']?\)/);if(t&&t[1]&&!t[1].startsWith("data:image/svg+xml"))return t[1]}}catch{}return null}async function Ke(o,e=!0){if(!e)return[];let t=[],a=0,n=35e5,i=(c,d)=>{if(!c||!c.base64||a+c.base64.length>n)return!1;let p=_t(d,o);return c.associatedLabel=p.associatedLabel,c.targetControlId=p.targetControlId,c.element=d,t.push(c),a+=c.base64.length,t.length>=Fe},s=Array.from(o.querySelectorAll("img")).filter(c=>L(c)&&!I(c));for(let c of s)try{let d=await Gt(c);if(i(d,c))return t}catch{}let r=Array.from(o.querySelectorAll("svg")).filter(c=>{if(!L(c)||I(c))return!1;let d=typeof c.getBoundingClientRect=="function"?c.getBoundingClientRect():{width:0,height:0},p=d.width||parseFloat(c.getAttribute("width")||"0"),u=d.height||parseFloat(c.getAttribute("height")||"0");return p<30||u<30?!1:jt(c)});for(let c of r)try{let d=await Vt(c),p=await ee(d);if(p){let u={mediaType:"image/jpeg",base64:p,alt:c.getAttribute("aria-label")||"Gr\xE1fico/Diagrama vetorial da quest\xE3o",source:"svg"};if(i(u,c))return t}}catch{let d=await Qe(c.parentElement||c);if(i(d,c))return t}if(t.length<Fe){let c=Array.from(o.querySelectorAll("canvas")).filter(d=>L(d)&&!I(d));for(let d of c)try{let p=await ce(d),u=await ee(p);if(u){let l={mediaType:"image/jpeg",base64:u,alt:d.getAttribute("aria-label")||"Gr\xE1fico Canvas inline",source:"canvas"};if(i(l,d))return t}}catch{let p=await Qe(d.parentElement||d);if(i(p,d))return t}}if(t.length<Fe){let c=Array.from(o.querySelectorAll('[style*="background-image"], .option-image, .question-media')).filter(d=>L(d)&&!I(d));for(let d of c){let p=Ft(d);if(p)try{let u=await fetch(p,{mode:"cors"});if(u.ok){let l=await u.blob();if(l.type.startsWith("image/")){let h=await createImageBitmap(l),g=await ce(h);h.close();let b=await ee(g);if(b){let v={mediaType:"image/jpeg",base64:b,alt:"Imagem de fundo da alternativa",source:p.slice(0,2e3)};if(i(v,d))return t}}}}catch{}}}return t}var xe=class{active=!1;timer=null;callbacks;lastRunTime=0;lastActionTime=0;isProcessing=!1;observer=null;mutationTimer=null;abortController=null;constructor(e){this.callbacks=e}isActive(){return this.active}start(){this.active||(this.active=!0,this.lastActionTime=Date.now(),this.callbacks.onStatusChange("waiting","> [SYS] Autopilot ENGAGED. Monitorando..."),typeof MutationObserver<"u"&&(this.observer=new MutationObserver(()=>{!this.active||this.isProcessing||(this.mutationTimer&&clearTimeout(this.mutationTimer),this.mutationTimer=window.setTimeout(()=>{this.mutationTimer=null,this.loop()},180))}),this.observer.observe(document.body,{subtree:!0,childList:!0,attributes:!0,characterData:!0})),this.loop())}stop(){if(this.active=!1,this.abortController){try{this.abortController.abort()}catch{}this.abortController=null}this.timer&&clearTimeout(this.timer),this.mutationTimer&&clearTimeout(this.mutationTimer),this.mutationTimer=null,this.observer?.disconnect(),this.observer=null,this.isProcessing=!1,this.callbacks.onStatusChange("idle","> [SYS] Autopilot DESATIVADO pelo usu\xE1rio.","text-yellow")}sleep(e){return new Promise(t=>{if(!this.active)return t();let a=null,n=()=>{a&&clearTimeout(a),t()};a=window.setTimeout(()=>{t()},e),this.abortController?.signal.addEventListener("abort",n,{once:!0})})}errorCount=0;lastPageSig="";samePageCount=0;async loop(){if(!this.active)return;let e=Date.now();if(e-this.lastRunTime<2500||this.isProcessing){this.timer=window.setTimeout(()=>this.loop(),500);return}this.lastRunTime=e;try{if(this.isProcessing=!0,!this.active)return;let t=se(!1);if(t||(t=X()),!this.active)return;if(t){let a=ut(t);if(a===this.lastPageSig)this.samePageCount++;else{let s=this.samePageCount>1;this.lastPageSig=a,this.samePageCount=1,s&&(this.callbacks.onStatusChange("waiting","> [SYS] Avan\xE7o de p\xE1gina detectado! Retomando monitoramento autom\xE1tico...","text-green"),this.callbacks.onPageAdvance?.())}if(this.callbacks.isManualModeActive?.()){this.callbacks.onStatusChange("waiting","> [SYS] Gabarito manual ativo na tela. Aguardando voc\xEA posicionar as respostas e avan\xE7ar a p\xE1gina...","text-yellow"),this.lastRunTime=Date.now();return}if(this.samePageCount>1&&(this.callbacks.onStatusChange("waiting",`> [AUTOPILOT] Resolu\xE7\xE3o pendente (${this.samePageCount}\xAA verifica\xE7\xE3o). Conclua e avance para prosseguir...`,"text-yellow"),await this.sleep(4e3),!this.active))return;let n=t.controls.filter(s=>s.role==="answer"),i=oe(window.location.hostname);if(n.length>0){if(this.callbacks.onStatusChange("analyzing","> [IA] Quest\xE3o/Exerc\xEDcio detectado. Consultando IA...","text-blue"),await this.sleep(600),!this.active)return;this.abortController=new AbortController;let s=await this.callbacks.onRequestAnalysis(this.samePageCount,this.abortController.signal);if(this.abortController=null,!this.active)return;if(s){if(this.callbacks.onStatusChange("analyzing",`> [IA] (${s.usedModel||"gemini"}) Confian\xE7a: ${(s.confidence*100).toFixed(1)}% | Modo: ${s.mode}`,"text-blue"),this.callbacks.onStatusChange("analyzing",`> [IA] Racioc\xEDnio: ${s.rationale}`,"text-blue"),this.callbacks.onStatusChange("analyzing",`> [IA] A\xE7\xF5es geradas: ${s.actions.length}`,"text-blue"),this.errorCount=0,s.memoryToStore&&this.callbacks.onStatusChange("analyzing",`> [IA] \u{1F9E0} Mem\xF3ria RAG salva: "${s.memoryToStore}"`,"text-yellow"),s.pageType==="conclusion"){this.callbacks.onStatusChange("idle","> [SYS] Atividade conclu\xEDda! Desligando Autopilot.","text-green"),this.stop();return}}else{this.errorCount++;let r=this.errorCount===1?5e3:8e3;this.callbacks.onStatusChange("waiting",`> [AVISO] Falha na an\xE1lise (${this.errorCount}/3). Aguardando ${r/1e3}s para estabiliza\xE7\xE3o antes de tentar novamente...`,"text-yellow"),await this.sleep(r)}this.lastActionTime=Date.now()}else if(i.advanceSelector&&C(i.advanceSelector)&&t.questionText.length<50){let s=C(i.advanceSelector);if(s){if(this.callbacks.onStatusChange("advancing",`> [BRUTE] Avan\xE7ando via cache "${i.advanceSelector}"...`),await this.sleep(1e3),!this.active)return;B(s),this.lastActionTime=Date.now(),this.errorCount=0}}else{if(this.callbacks.onStatusChange("analyzing","> [IA] P\xE1gina informativa/contexto detectada. Lendo e consultando IA...","text-blue"),await this.sleep(600),!this.active)return;this.abortController=new AbortController;let s=await this.callbacks.onRequestAnalysis(this.samePageCount,this.abortController.signal);if(this.abortController=null,!this.active)return;if(s){if(this.callbacks.onStatusChange("analyzing",`> [IA] (${s.usedModel||"gemini"}) Tipo: ${s.pageType} | Modo: ${s.mode}`,"text-blue"),this.callbacks.onStatusChange("analyzing",`> [IA] Racioc\xEDnio: ${s.rationale}`,"text-blue"),s.memoryToStore&&this.callbacks.onStatusChange("analyzing",`> [IA] \u{1F9E0} Conte\xFAdo absorvido na mem\xF3ria: "${s.memoryToStore}"`,"text-yellow"),s.pageType==="info")this.callbacks.onStatusChange("advancing","> [IA] \u{1F4D6} Leitura conclu\xEDda. Avan\xE7ando automaticamente...","text-green"),await this.sleep(1800);else if(s.pageType==="start")this.callbacks.onStatusChange("advancing","> [SYS] In\xEDcio de m\xF3dulo detectado. Iniciando...","text-blue"),await this.sleep(1800);else if(s.pageType==="conclusion"){this.callbacks.onStatusChange("idle","> [SYS] Atividade conclu\xEDda! Desligando Autopilot.","text-green"),this.stop();return}this.errorCount=0}else{this.errorCount++;let r=this.errorCount===1?5e3:8e3;this.callbacks.onStatusChange("waiting",`> [AVISO] Falha ao processar p\xE1gina (${this.errorCount}/3). Aguardando ${r/1e3}s para estabiliza\xE7\xE3o antes de tentar novamente...`,"text-yellow"),await this.sleep(r)}this.lastActionTime=Date.now()}if(this.errorCount>=3){this.callbacks.onStatusChange("error","> [ERRO] 3 falhas consecutivas. Abortando Autopilot para poupar sua cota e tokens.","text-red"),this.callbacks.onStatusChange("waiting","> [DICA] Verifique a mensagem vermelha de [ERRO DETALHADO] no console acima para saber o motivo exato.","text-yellow"),this.stop();return}}else this.callbacks.onStatusChange("waiting","> [SYS] Monitorando p\xE1gina... Aguardando carregamento dos elementos.")}catch(t){if(!this.active)return;let a=t instanceof Error?t.message:String(t);if(a.includes("cancelada")||a.includes("aborted"))return;console.warn("[EasyQuiz Autopilot]",t),this.callbacks.onStatusChange("error",`> [ERRO NO AUTOPILOT] ${a}`,"text-red")}finally{this.abortController=null,this.isProcessing=!1}this.active&&(this.timer=window.setTimeout(()=>this.loop(),1e3))}};var E={logo:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.8L19.2 8 12 11.2 4.8 8 12 4.8zM4 9.6l7 3.1v7.5l-7-3.5V9.6zm9 10.6v-7.5l7-3.1v7.1l-7 3.5z"/></svg>',rocket:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M13.13 2.81a.5.5 0 0 0-.46-.07c-.42.15-2.08.79-3.9 2.61-2.04 2.04-2.6 4.09-2.73 4.96l-.97.98a1 1 0 0 0-.29.71v2.12a1 1 0 0 0 .29.71l2.83 2.83a1 1 0 0 0 .71.29h2.12a1 1 0 0 0 .71-.29l.98-.97c.87-.13 2.92-.69 4.96-2.73 1.82-1.82 2.46-3.48 2.61-3.9a.5.5 0 0 0-.07-.46l-6.79-6.79zM4.5 16.5l-2.09 2.09a.5.5 0 0 0 .35.85h3.04l.35.35v3.04a.5.5 0 0 0 .85.35L9.09 21.1l-4.59-4.6z"/></svg>',play:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>',stop:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h12v12H6z"/></svg>',code:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>',terminal:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8h16v10zm-12-3l3-3-3-3 1.4-1.4L13.8 12l-4.4 4.4L8 15zm6 0h4v2h-4v-2z"/></svg>',inspector:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>',settings:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.49.49 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>',key:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M7 14c-2.76 0-5-2.24-5-5s2.24-5 5-5c2.42 0 4.44 1.72 4.9 4H22v4h-2v3h-3v-3h-2v3h-3v-3h-2.1c-.46 2.28-2.48 4-4.9 4zm0-7c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>',paste:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 2h-4.18C14.4 .84 13.3 0 12 0c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm7 18H5V4h2v3h10V4h2v16z"/></svg>',edit:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>',trash:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>',eraser:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M15.14 3c-.51 0-1.02.2-1.41.59L2.59 14.73c-.78.78-.78 2.05 0 2.83L6.44 21.4c.78.78 2.05.78 2.83 0l11.14-11.14c.78-.78.78-2.05 0-2.83l-3.86-3.84c-.39-.39-.9-.59-1.41-.59zm.71 2.71l3.15 3.15-3.15 3.15-3.15-3.15 3.15-3.15zm-4.57 4.57l3.15 3.15-4.57 4.57H6.71l-3-3 7.57-7.57z"/></svg>',save:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/></svg>',analyze:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L3 14h8l-2 8 12-12h-8l2-8z"/></svg>',apply:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>',close:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>',chevronRight:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>',chevronLeft:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>',eye:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>',eyeOff:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.44-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.17c0-1.66-1.34-3-3-3l-.17.02z"/></svg>',check:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>',clock:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>',copy:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>',refresh:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg>',chip:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4h12v16H6V4zm2 2v12h8V6H8zm-4 3h2v2H4V9zm0 4h2v2H4v-2zm16-4h2v2h-2V9zm0 4h2v2h-2v-2zM9 2h2v2H9V2zm4 0h2v2h-2V2zm-4 18h2v2H9v-2zm4 0h2v2h-2v-2z"/></svg>',moreVertical:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>',minimize:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M19 13H5v-2h14v2z"/></svg>',maximize:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/></svg>',dragHandle:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M10 9h4V6h-4v3zm0 5h4v-3h-4v3zm0 5h4v-3h-4v3zM4 9h4V6H4v3zm0 5h4v-3H4v3zm0 5h4v-3H4v3zm12-10V6h4v3h-4zm0 5h4v-3h-4v3zm0 5h4v-3h-4v3z"/></svg>',list:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/></svg>',folderTree:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6 10H6v-2h8v2zm4-4H6v-2h12v2z"/></svg>',folder:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/></svg>',file:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>'};var we=class{element=null;shadow;isMinimized=!1;currentPlan=null;isDragging=!1;dragStartX=0;dragStartY=0;initialLeft=25;initialTop=25;onAdvanceCallback;constructor(e,t){this.shadow=e,this.onAdvanceCallback=t,this.initGlobalListeners()}initGlobalListeners(){window.addEventListener("popstate",()=>this.handlePageNavigated()),window.addEventListener("hashchange",()=>this.handlePageNavigated()),document.addEventListener("click",e=>{if(!this.isOpen())return;let t=e.target;if(!t||this.shadow.contains(t)||t.closest("#easyquiz-shadow-root"))return;let a=t.closest('button, [role="button"], a, input[type="submit"]');if(a){let n=(a.textContent||a.value||"").toLowerCase();/pr[oó]xim|avan[cç]|continu|verific|enviar|submit|confirm|checar|validar|next/i.test(n)&&setTimeout(()=>{this.isOpen()&&this.handlePageNavigated()},800)}},!0)}handlePageNavigated(){this.isOpen()&&(this.hide(),this.onAdvanceCallback?.())}isOpen(){return this.element!==null&&this.element.style.display!=="none"}show(e){this.currentPlan=e,this.element||this.createElement(),this.renderContent(),this.element&&(this.element.style.display="flex")}hide(){this.element&&(this.element.style.display="none")}minimize(){this.isMinimized=!0,this.element&&this.element.classList.add("minimized")}restore(){this.isMinimized=!1,this.element&&this.element.classList.remove("minimized")}createElement(){this.element=document.createElement("div"),this.element.className="eq-floating-hud",this.element.style.left=`${this.initialLeft}px`,this.element.style.top=`${this.initialTop}px`,this.element.innerHTML=`
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
    `,this.shadow.appendChild(this.element),this.element.querySelector("#eq-fah-pill").addEventListener("click",()=>this.restore()),this.element.querySelector("#eq-fah-min-btn").addEventListener("click",()=>this.minimize()),this.element.querySelector("#eq-fah-close-btn").addEventListener("click",()=>this.hide());let n=this.element.querySelector("#eq-fah-copy-md-btn");n.addEventListener("click",()=>this.copyMarkdownToClipboard(n));let i=this.element.querySelector("#eq-fah-copy-all-btn");i.addEventListener("click",()=>this.copyMarkdownToClipboard(i));let s=this.element.querySelector("#eq-fah-header");this.setupDraggable(s)}setupDraggable(e){let t=a=>{if(a.target.closest(".eq-fah-btn"))return;a.preventDefault(),this.isDragging=!0,this.dragStartX=a.clientX,this.dragStartY=a.clientY;let n=this.element.getBoundingClientRect();this.initialLeft=n.left,this.initialTop=n.top;let i=r=>{if(!this.isDragging||!this.element)return;let c=r.clientX-this.dragStartX,d=r.clientY-this.dragStartY,p=Math.max(10,window.innerWidth-this.element.offsetWidth-10),u=Math.max(10,window.innerHeight-this.element.offsetHeight-10),l=Math.min(Math.max(10,this.initialLeft+c),p),h=Math.min(Math.max(10,this.initialTop+d),u);this.element.style.left=`${l}px`,this.element.style.top=`${h}px`},s=()=>{this.isDragging=!1,window.removeEventListener("mousemove",i),window.removeEventListener("mouseup",s)};window.addEventListener("mousemove",i),window.addEventListener("mouseup",s)};e.addEventListener("mousedown",t)}renderContent(){if(!this.element||!this.currentPlan)return;let e=this.element.querySelector("#eq-fah-body"),t=this.element.querySelector("#eq-fah-pill-text"),a=this.element.querySelector("#eq-fah-pill-badge");e.innerHTML="";let n=this.currentPlan,i=n.actions.filter(h=>h.t==="drag"),s=n.actions.filter(h=>{if(h.t!=="val")return!1;let g=y(h.id||"").toLowerCase();return!/continu|avan[cç]|pr[oó]xim|submet|enviar|check|verific/i.test(g)}),r=n.actions.filter(h=>h.t==="clk"||h.t==="chk"),c=n.actions.filter(h=>h.t==="sel"),d=i.length||s.length||r.length||c.length,p=document.createElement("div");p.className="eq-fah-meta";let u=document.createElement("span");u.textContent=`Modo: ${n.mode.replace("_"," ")}`;let l=document.createElement("span");if(l.className="eq-fah-meta-badge",l.textContent=`${Math.round(n.confidence*100)}% Confian\xE7a`,p.append(u,l),e.appendChild(p),i.length>0||n.mode==="categorizacao"||n.mode==="arrastar_soltar"){t.textContent=`Categoriza\xE7\xE3o (${i.length} itens)`,a.textContent=String(i.length);let h={};for(let g of i){let b=y(g.to)||"Geral";h[b]||(h[b]=[]),h[b].push(y(g.from))}for(let[g,b]of Object.entries(h)){let v=document.createElement("div"),m=/fato|true|verdadeiro|sim/i.test(g),f=/opini[aã]o|false|falso|n[aã]o/i.test(g);v.className=`eq-fah-group ${m?"group-fato":f?"group-opiniao":""}`;let x=document.createElement("div");x.className="eq-fah-group-title",x.textContent=`\u{1F4C1} ${g} (${b.length})`,v.appendChild(x);let w=document.createElement("div");w.className="eq-fah-group-items";for(let q of b){let T=document.createElement("div");T.className="eq-fah-item";let S=document.createElement("span");S.className="eq-fah-item-text",S.textContent=q,T.appendChild(S);let A=document.createElement("button");A.className="eq-fah-copy-inline",A.textContent="Copiar",A.addEventListener("click",()=>{navigator.clipboard.writeText(q),A.textContent="\u2713 Copiado",setTimeout(()=>A.textContent="Copiar",1200)}),T.appendChild(A),w.appendChild(T)}v.appendChild(w),e.appendChild(v)}}else if(s.length>0){t.textContent=`Preenchimento (${s.length} campos)`,a.textContent=String(s.length);let h=document.createElement("div");h.className="eq-fah-group";let g=document.createElement("div");g.className="eq-fah-group-title",g.textContent="\u{1F4DD} Respostas para os Campos de Texto:",h.appendChild(g);let b=document.createElement("div");b.className="eq-fah-group-items";for(let v=0;v<s.length;v++){let m=s[v],f=document.createElement("div");f.className="eq-fah-item";let x=ye(m.id);(!x||/^[#\.\$]|input|mat-|cell|field|q[0-9]|eq-/i.test(x))&&(x=`Campo ${v+1}`);let w=String(m.v??""),q=document.createElement("div");q.className="eq-fah-field-box";let T=document.createElement("div");T.className="eq-fah-field-label",T.textContent=x,q.appendChild(T);let S=document.createElement("div");S.className="eq-fah-field-val",S.textContent=w,q.appendChild(S),f.appendChild(q);let A=document.createElement("button");A.className="eq-fah-copy-inline",A.textContent="Copiar",A.addEventListener("click",()=>{navigator.clipboard.writeText(w),A.textContent="\u2713 Copiado",setTimeout(()=>A.textContent="Copiar",1200)}),f.appendChild(A),b.appendChild(f)}h.appendChild(b),e.appendChild(h)}else if(r.length>0){t.textContent=`Op\xE7\xF5es (${r.length} marcadas)`,a.textContent=String(r.length);let h=document.createElement("div");h.className="eq-fah-group";let g=document.createElement("div");g.className="eq-fah-group-title",g.textContent="\u{1F3AF} Alternativa(s) Correta(s):",h.appendChild(g);let b=document.createElement("div");b.className="eq-fah-group-items";for(let v=0;v<r.length;v++){let m=r[v],f=document.createElement("div");f.className="eq-fah-item";let x=ye(m.id);(!x||/^(eq-|#|\$|\.|input_|mat-|choice_|radio_|chk_)/i.test(x))&&m.v&&(x=String(m.v)),x=y(x),/^(eq-|#|\$|\.|input_|mat-|choice_|radio_|chk_)/i.test(x)&&(x="");let w="",q=x.match(/^(\([A-Za-z0-9]\)|[A-Za-z0-9][\)\.\:\-])\s*(.*)$/);q?(w=q[1].replace(/[\(\)\.\:\-\s]/g,"").toUpperCase(),x=q[2].trim()||x):r.length>1&&(w=String.fromCharCode(65+v));let T=document.createElement("div");if(T.style.display="flex",T.style.alignItems="center",T.style.gap="8px",T.style.flex="1",w){let R=document.createElement("span");R.className="eq-fah-letter-badge",R.textContent=w,T.appendChild(R)}let S=document.createElement("span");S.className="eq-fah-item-text",S.textContent=x||(w?`Alternativa ${w}`:"Alternativa Selecionada"),T.appendChild(S),f.appendChild(T);let A=document.createElement("button");A.className="eq-fah-copy-inline",A.textContent="Copiar",A.addEventListener("click",()=>{navigator.clipboard.writeText(x||w),A.textContent="\u2713 Copiado",setTimeout(()=>A.textContent="Copiar",1200)}),f.appendChild(A),b.appendChild(f)}h.appendChild(b),e.appendChild(h)}else if(c.length>0){t.textContent=`Sele\xE7\xE3o (${c.length} listas)`,a.textContent=String(c.length);let h=document.createElement("div");h.className="eq-fah-group";let g=document.createElement("div");g.className="eq-fah-group-title",g.textContent="\u{1F4CB} Op\xE7\xF5es para Selecionar na Lista:",h.appendChild(g);let b=document.createElement("div");b.className="eq-fah-group-items";for(let v=0;v<c.length;v++){let m=c[v],f=document.createElement("div");f.className="eq-fah-item";let x=ye(m.id);(!x||/^[#\.\$]|select|input|mat-|cell|field|q[0-9]|eq-/i.test(x))&&(x=`Lista ${v+1}`);let w=Array.isArray(m.v)?m.v.join(", "):String(m.v??""),q=document.createElement("div");q.className="eq-fah-field-box";let T=document.createElement("div");T.className="eq-fah-field-label",T.textContent=x,q.appendChild(T);let S=document.createElement("div");S.className="eq-fah-field-val",S.textContent=w,q.appendChild(S),f.appendChild(q);let A=document.createElement("button");A.className="eq-fah-copy-inline",A.textContent="Copiar",A.addEventListener("click",()=>{navigator.clipboard.writeText(w),A.textContent="\u2713 Copiado",setTimeout(()=>A.textContent="Copiar",1200)}),f.appendChild(A),b.appendChild(f)}h.appendChild(b),e.appendChild(h)}else{t.textContent="Gabarito",a.textContent="0";let h=document.createElement("div");h.style.padding="10px",h.style.color="#888",h.textContent="Nenhuma resposta direta para exibir.",e.appendChild(h)}if(n.rationale){let h=document.createElement("div");h.className="eq-fah-rationale",h.textContent=`\u{1F4A1} Racioc\xEDnio da IA: ${n.rationale}`,e.appendChild(h)}}generateMarkdown(){if(!this.currentPlan)return"";let e=this.currentPlan,t=[];t.push("# Gabarito da Quest\xE3o \u2014 EasyQuiz Pro"),t.push(`- **Modo:** ${e.mode}`),t.push(`- **Confian\xE7a:** ${(e.confidence*100).toFixed(0)}%`),t.push("");let a=e.actions.filter(r=>r.t==="drag"),n=e.actions.filter(r=>r.t==="val"),i=e.actions.filter(r=>r.t==="clk"||r.t==="chk"),s=e.actions.filter(r=>r.t==="sel");if(a.length>0){t.push("## \u{1F4C2} Categoriza\xE7\xE3o:");let r={};for(let c of a){let d=y(c.to)||"Geral";r[d]||(r[d]=[]),r[d].push(y(c.from))}for(let[c,d]of Object.entries(r)){t.push(`### Categoria: ${c}`);for(let p of d)t.push(`- ${p}`);t.push("")}}else if(n.length>0){t.push("## \u270F\uFE0F Respostas para Preenchimento:");for(let r of n){let c=y(r.id);t.push(`- **${c||"Campo"}:** \`${r.v}\``)}t.push("")}else if(i.length>0){t.push("## \u2705 Alternativas Corretas:");for(let r of i)t.push(`- [x] ${y(r.id)}`);t.push("")}else if(s.length>0){t.push("## \u{1F4CB} Op\xE7\xF5es Selecionadas em Lista:");for(let r of s){let c=y(r.id)||"Lista",d=Array.isArray(r.v)?r.v.join(", "):String(r.v??"");t.push(`- **${c}:** \`${d}\``)}t.push("")}return e.rationale&&(t.push("---"),t.push(`**\u{1F4A1} Racioc\xEDnio:** ${e.rationale}`)),t.join(`
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
`;var Ut=[{value:"",label:"Detec\xE7\xE3o Autom\xE1tica"},{value:"escolha_unica",label:"M\xFAltipla Escolha (\xDAnica)"},{value:"escolha_multipla",label:"M\xFAltipla Escolha (V\xE1rias)"},{value:"categorizacao",label:"Categoriza\xE7\xE3o / Grupos"},{value:"arrastar_soltar",label:"Arrastar e Soltar (Drag & Drop)"},{value:"ordenacao",label:"Ordena\xE7\xE3o / Sequ\xEAncia"},{value:"verdadeiro_falso",label:"Verdadeiro / Falso"},{value:"texto_livre",label:"Texto Livre / Dissertativa"},{value:"preenchimento",label:"Preenchimento de Lacunas"}],Qt=[{value:"smart",label:"Inteligente (Auto-H\xEDbrido)"},{value:"command",label:"Apenas Comando (Seguro)"},{value:"javascript",label:"Apenas JS Nativo (Avan\xE7ado)"}],qe=class{host;shadow;callbacks;autopilot;floatingAnswers;initialSettings;isCollapsed=!1;activeTab="resolver";stopwatchInterval=null;stopwatchStartTime=0;latestPlan=null;latestContext=null;latestPromptText="";liveDebugTerminal;dbgModel;dbgLatency;dbgSplitTokens;dbgTotalTokens;dbgErrorCard;dbgErrorText;dbgPromptLen;dbgPromptView;dbgContextView;dbgRawRespView;dbgCountAll;dbgCountError;dbgCountAi;dbgCountDom;logEntries=[];activeLogFilter="all";autoScrollLogs=!0;lastErrorMsg=null;progressContainer;progressBar;progressLabel;progressVal;contextTreeContainer;launcherBtn;launcherDot;dockToggleBtn;sidebarEl;apToggleBtn;apConsole;executionConsole;dotPulseAp;statusTextAp;stopwatchAp;dotPulseAdv;statusTextAdv;stopwatchAdv;inspModel;inspLatency;inspTokens;inspPrompt;inspRationale;inspActions;copyPromptBtn;apiKeyInput;keyContextMenu;keyMoreBtn;modelSelect;modeSelect;engineSelect;dryRunCheckbox;autoApplyCheckbox;autoAdvanceCheckbox;hostDarkModeCheckbox;useVisionCheckbox;analyzeBtn;applyBtn;resultContainer;constructor(e,t){this.initialSettings=e,this.callbacks=t,this.autopilot=new xe({onStatusChange:(n,i,s)=>{this.logToConsole(i,s),n==="analyzing"?this.setBusy(!0,"Autopilot: IA analisando..."):(n==="advancing"||n==="waiting")&&this.setBusy(!1)},onRequestAnalysis:async(n,i)=>{try{return await this.callbacks.onAnalyze(n,i)||null}catch{return null}},isManualModeActive:()=>this.floatingAnswers?.isOpen()??!1,onPageAdvance:()=>{this.floatingAnswers?.hide()}}),this.host=document.createElement("div"),this.host.id="easyquiz-shadow-root",this.host.style.position="fixed",this.host.style.top="0",this.host.style.left="0",this.host.style.width="100vw",this.host.style.height="100vh",this.host.style.zIndex="2147483647",this.host.style.pointerEvents="none",this.shadow=this.host.attachShadow({mode:"open"}),this.shadow.innerHTML=`
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
    `,this.launcherBtn=this.shadow.querySelector(".eq-launcher"),this.launcherDot=this.shadow.querySelector("#eq-launcher-dot"),this.dockToggleBtn=this.shadow.querySelector("#eq-dock-toggle"),this.sidebarEl=this.shadow.querySelector(".eq-sidebar"),this.apToggleBtn=this.shadow.querySelector("#eq-ap-toggle-btn"),this.apConsole=this.shadow.querySelector("#eq-ap-console"),this.executionConsole=this.shadow.querySelector("#eq-execution-console"),this.progressContainer=this.shadow.querySelector("#eq-progress-container"),this.progressBar=this.shadow.querySelector("#eq-progress-bar"),this.progressLabel=this.shadow.querySelector("#eq-progress-label"),this.progressVal=this.shadow.querySelector("#eq-progress-val"),this.contextTreeContainer=this.shadow.querySelector("#eq-tree-container"),this.dotPulseAp=this.shadow.querySelector("#eq-dot-ap"),this.statusTextAp=this.shadow.querySelector("#eq-status-text-ap"),this.stopwatchAp=this.shadow.querySelector("#eq-stopwatch-ap span"),this.dotPulseAdv=this.dotPulseAp,this.statusTextAdv=this.statusTextAp,this.stopwatchAdv=this.stopwatchAp,this.inspModel=this.shadow.querySelector("#eq-insp-model"),this.inspLatency=this.shadow.querySelector("#eq-insp-latency"),this.inspTokens=this.shadow.querySelector("#eq-insp-tokens"),this.inspPrompt=this.shadow.querySelector("#eq-insp-prompt"),this.inspRationale=this.shadow.querySelector("#eq-insp-rationale"),this.inspActions=this.shadow.querySelector("#eq-insp-actions"),this.copyPromptBtn=this.shadow.querySelector("#eq-copy-prompt-btn"),this.liveDebugTerminal=this.shadow.querySelector("#eq-live-debug-terminal"),this.dbgModel=this.shadow.querySelector("#eq-dbg-model"),this.dbgLatency=this.shadow.querySelector("#eq-dbg-latency"),this.dbgSplitTokens=this.shadow.querySelector("#eq-dbg-split-tokens"),this.dbgTotalTokens=this.shadow.querySelector("#eq-dbg-total-tokens"),this.dbgErrorCard=this.shadow.querySelector("#eq-dbg-error-card"),this.dbgErrorText=this.shadow.querySelector("#eq-dbg-error-text"),this.dbgPromptLen=this.shadow.querySelector("#eq-dbg-prompt-len"),this.dbgPromptView=this.shadow.querySelector("#eq-dbg-prompt-view"),this.dbgContextView=this.shadow.querySelector("#eq-dbg-context-view"),this.dbgRawRespView=this.shadow.querySelector("#eq-dbg-raw-resp-view"),this.dbgCountAll=this.shadow.querySelector("#eq-dbg-count-all"),this.dbgCountError=this.shadow.querySelector("#eq-dbg-count-error"),this.dbgCountAi=this.shadow.querySelector("#eq-dbg-count-ai"),this.dbgCountDom=this.shadow.querySelector("#eq-dbg-count-dom"),this.apiKeyInput=this.shadow.querySelector("#eq-api-key"),this.keyContextMenu=this.shadow.querySelector("#eq-key-context-menu"),this.keyMoreBtn=this.shadow.querySelector("#eq-key-more-btn"),this.modelSelect=this.shadow.querySelector("#eq-model-select"),this.modeSelect=this.shadow.querySelector("#eq-mode-select"),this.engineSelect=this.shadow.querySelector("#eq-engine-select"),this.dryRunCheckbox=this.shadow.querySelector("#eq-dry-run"),this.autoApplyCheckbox=this.shadow.querySelector("#eq-auto-apply"),this.autoAdvanceCheckbox=this.shadow.querySelector("#eq-auto-advance"),this.hostDarkModeCheckbox=this.shadow.querySelector("#eq-host-dark"),this.useVisionCheckbox=this.shadow.querySelector("#eq-use-vision"),this.analyzeBtn=this.shadow.querySelector("#eq-analyze-btn"),this.applyBtn=this.shadow.querySelector("#eq-apply-btn"),this.resultContainer=this.shadow.querySelector("#eq-result"),this.floatingAnswers=new we(this.shadow,()=>{this.callbacks.onAnalyze(1)});let a=this.shadow.querySelector("#eq-open-hud-btn");a&&a.addEventListener("click",()=>{this.latestPlan&&this.floatingAnswers.show(this.latestPlan)}),K.forEach(n=>this.modelSelect.add(new Option(n.name,n.id,!1,n.id===e.model))),Ut.forEach(n=>this.modeSelect.add(new Option(n.label,n.value,!1,n.value===e.modeHint))),Qt.forEach(n=>this.engineSelect.add(new Option(n.label,n.value,!1,n.value===e.engine))),this.apiKeyInput.value=e.apiKey,this.dryRunCheckbox.checked=e.dryRun,this.autoApplyCheckbox.checked=e.autoApply,this.autoAdvanceCheckbox.checked=e.autoAdvance,this.hostDarkModeCheckbox.checked=e.hostDarkMode,this.useVisionCheckbox.checked=e.useVision,this.setupEventListeners(),document.body.appendChild(this.host),this.applyHostDarkMode(e.hostDarkMode),e.apiKey&&pe(e.apiKey).then(n=>{n&&n.length>0&&this.updateModelSelect(n,e.model)}).catch(()=>{})}switchTab(e){this.activeTab=e;let t=["resolver","brain","debug","settings"];for(let a of t){let n=this.shadow.querySelector(`#eq-tab-${a}`),i=this.shadow.querySelector(`#eq-view-${a}`);a===e?(n?.classList.add("active"),i&&(i.style.display="flex")):(n?.classList.remove("active"),i&&(i.style.display="none"))}e==="brain"?(this.renderContextTree(),this.refreshInspectorView()):e==="debug"&&(this.refreshDebugView(),this.renderTerminalEntries())}setupEventListeners(){this.shadow.querySelector("#eq-tab-resolver")?.addEventListener("click",()=>this.switchTab("resolver")),this.shadow.querySelector("#eq-tab-brain")?.addEventListener("click",()=>this.switchTab("brain")),this.shadow.querySelector("#eq-tab-debug")?.addEventListener("click",()=>this.switchTab("debug")),this.shadow.querySelector("#eq-tab-settings")?.addEventListener("click",()=>this.switchTab("settings")),this.shadow.querySelector("#eq-dbg-filter-all")?.addEventListener("click",()=>this.setLogFilter("all")),this.shadow.querySelector("#eq-dbg-filter-error")?.addEventListener("click",()=>this.setLogFilter("error")),this.shadow.querySelector("#eq-dbg-filter-ai")?.addEventListener("click",()=>this.setLogFilter("ai")),this.shadow.querySelector("#eq-dbg-filter-dom")?.addEventListener("click",()=>this.setLogFilter("dom"));let e=this.shadow.querySelector("#eq-dbg-scroll-toggle");e?.addEventListener("click",()=>{this.autoScrollLogs=!this.autoScrollLogs,e&&(e.style.color=this.autoScrollLogs?"#00ffcc":"#858585",e.title=this.autoScrollLogs?"Auto-Scroll Ligado (Clique para desligar)":"Auto-Scroll Desligado (Clique para ligar)"),this.autoScrollLogs&&this.liveDebugTerminal&&(this.liveDebugTerminal.scrollTop=this.liveDebugTerminal.scrollHeight)});let t=this.shadow.querySelector("#eq-dbg-copy-logs");t?.addEventListener("click",()=>{let l=this.getFormattedLogs();navigator.clipboard.writeText(l).then(()=>{let h=t.innerHTML;t.innerHTML=E.check,setTimeout(()=>t.innerHTML=h,1800)})}),this.shadow.querySelector("#eq-dbg-clear-logs")?.addEventListener("click",()=>{this.clearLogs()});let a=this.shadow.querySelector("#eq-dbg-copy-prompt");a?.addEventListener("click",()=>{let l=this.latestPromptText||this.latestPlan?.promptSent||"";navigator.clipboard.writeText(l).then(()=>{let h=a.innerHTML;a.innerHTML=`${E.check} Copiado!`,setTimeout(()=>a.innerHTML=h,1800)})});let n=this.shadow.querySelector("#eq-dbg-copy-context");n?.addEventListener("click",()=>{let l=this.dbgContextView?.textContent||"";navigator.clipboard.writeText(l).then(()=>{let h=n.innerHTML;n.innerHTML=`${E.check} Copiado!`,setTimeout(()=>n.innerHTML=h,1800)})});let i=this.shadow.querySelector("#eq-dbg-copy-raw-resp");i?.addEventListener("click",()=>{let l=this.latestPlan?.rawResponse||this.dbgRawRespView?.textContent||"";navigator.clipboard.writeText(l).then(()=>{let h=i.innerHTML;i.innerHTML=`${E.check} Copiado!`,setTimeout(()=>i.innerHTML=h,1800)})});let s=this.shadow.querySelector("#eq-dbg-copy-error-btn");s?.addEventListener("click",()=>{let l=this.lastErrorMsg||"";navigator.clipboard.writeText(l).then(()=>{let h=s.innerHTML;s.innerHTML=E.check,setTimeout(()=>s.innerHTML=h,1800)})}),this.shadow.querySelector("#eq-refresh-context-btn")?.addEventListener("click",()=>{this.renderContextTree()}),this.launcherBtn.addEventListener("click",()=>this.toggle()),this.dockToggleBtn.addEventListener("click",()=>this.toggle()),this.shadow.querySelector("#eq-min-btn")?.addEventListener("click",()=>this.toggle(!1)),this.shadow.querySelector("#eq-close-btn")?.addEventListener("click",()=>this.toggle(!1)),window.addEventListener("keydown",l=>{l.altKey&&(l.key==="q"||l.key==="Q")&&(l.preventDefault(),this.toggle())},!0);let r=l=>{let h=l.composedPath();(h.includes(this.sidebarEl)||h.includes(this.host))&&l.stopImmediatePropagation()};window.addEventListener("keydown",r,!0),window.addEventListener("keyup",r,!0),window.addEventListener("keypress",r,!0),this.apiKeyInput.addEventListener("input",()=>{let l=this.apiKeyInput.value.trim().replace(/^["']|["']$/g,"");this.callbacks.onSettingsChange({apiKey:l})}),this.shadow.querySelector("#eq-key-save").addEventListener("click",()=>{let l=this.apiKeyInput.value.trim().replace(/^["']|["']$/g,"");this.apiKeyInput.value=l,this.callbacks.onSettingsChange({apiKey:l}),this.setStatus("Chave Gemini salva com sucesso!","success"),this.keyContextMenu.hidden=!0}),this.keyMoreBtn.addEventListener("click",l=>{l.stopPropagation(),this.keyContextMenu.hidden=!this.keyContextMenu.hidden}),this.shadow.addEventListener("click",l=>{let h=l.target;!h.closest("#eq-key-context-menu")&&!h.closest("#eq-key-more-btn")&&(this.keyContextMenu.hidden=!0)}),this.shadow.querySelector("#eq-menu-prompt")?.addEventListener("click",()=>{this.keyContextMenu.hidden=!0;let l=this.apiKeyInput.value.trim(),h=window.prompt("Cole sua Chave API do Google Gemini (AI Studio):",l);if(h!==null){let g=h.trim().replace(/^["']|["']$/g,"");this.apiKeyInput.value=g,this.callbacks.onSettingsChange({apiKey:g}),this.setStatus("Chave Gemini inserida e salva com sucesso!","success")}}),this.shadow.querySelector("#eq-menu-paste")?.addEventListener("click",async()=>{this.keyContextMenu.hidden=!0;try{let l=await navigator.clipboard.readText();if(l){let h=l.trim().replace(/^["']|["']$/g,"");this.apiKeyInput.value=h,this.callbacks.onSettingsChange({apiKey:h}),this.setStatus("Chave colada e salva com sucesso!","success")}}catch{let l=this.apiKeyInput.value.trim(),h=window.prompt("Cole sua Chave API do Google Gemini (AI Studio):",l);if(h!==null){let g=h.trim().replace(/^["']|["']$/g,"");this.apiKeyInput.value=g,this.callbacks.onSettingsChange({apiKey:g}),this.setStatus("Chave Gemini inserida e salva com sucesso!","success")}}}),this.shadow.querySelector("#eq-menu-toggle-vis")?.addEventListener("click",()=>{this.keyContextMenu.hidden=!0;let l=this.apiKeyInput.type==="password";this.apiKeyInput.type=l?"text":"password";let h=this.shadow.querySelector("#eq-menu-vis-icon"),g=this.shadow.querySelector("#eq-menu-vis-text");h&&(h.innerHTML=l?E.eyeOff:E.eye),g&&(g.textContent=l?"Ocultar Chave":"Mostrar Chave")}),this.shadow.querySelector("#eq-menu-clear")?.addEventListener("click",()=>{this.keyContextMenu.hidden=!0,this.apiKeyInput.value="",this.callbacks.onSettingsChange({apiKey:""}),this.setStatus("Campo limpo. Cole a nova chave e clique em Salvar.","info"),this.apiKeyInput.focus()}),this.shadow.querySelector("#eq-menu-test")?.addEventListener("click",async()=>{this.keyContextMenu.hidden=!0;let l=this.apiKeyInput.value.trim().replace(/^["']|["']$/g,"");if(!l)return this.setStatus("Insira ou cole a chave de API.","error");this.setStatus("Testando chave e descobrindo modelos autorizados...","info");try{let h=await it(l);this.setStatus(h.message,h.ok?"success":"error"),h.ok&&h.models&&h.models.length>0&&this.updateModelSelect(h.models)}catch(h){this.setStatus("Erro ao validar chave: "+h.message,"error")}});let d=()=>{this.keyContextMenu.hidden=!0,window.confirm("Deseja realmente resetar todos os dados, chaves e mem\xF3ria de sess\xE3o do EasyQuiz?")&&(We(),this.apiKeyInput.value="",this.callbacks.onSettingsChange({apiKey:""}),this.setStatus("Todos os dados do EasyQuiz foram limpos.","info"),this.logToConsole("> [SYS] Armazenamento local resetado.","text-yellow"))};this.shadow.querySelector("#eq-menu-reset")?.addEventListener("click",d),this.shadow.querySelector("#eq-reset-all-btn")?.addEventListener("click",d),this.apToggleBtn.addEventListener("click",()=>{if(this.autopilot.isActive())this.autopilot.stop(),this.callbacks.onCancel?.(),this.setBusy(!1),this.setProgress(0),this.apToggleBtn.innerHTML=`${E.play} INICIAR AUTOPILOT`,this.apToggleBtn.classList.remove("danger"),this.stopStopwatch(),this.setStatus("Autopilot interrompido imediatamente pelo usu\xE1rio.","info");else{if(!this.apiKeyInput.value.trim().replace(/^["']|["']$/g,"")){this.setStatus("Configure sua chave de API Gemini na aba Configura\xE7\xF5es antes de ligar o Autopilot.","error"),this.switchTab("settings"),this.apiKeyInput.focus();return}this.callbacks.onSettingsChange({autoApply:!0,autoAdvance:!0}),this.autoApplyCheckbox.checked=!0,this.autoAdvanceCheckbox.checked=!0,this.autopilot.start(),this.apToggleBtn.innerHTML=`${E.stop} PARAR AUTOPILOT`,this.apToggleBtn.classList.add("danger"),this.startStopwatch(),this.setStatus("Autopilot ativo. Monitorando exerc\xEDcios...","info")}}),this.shadow.querySelector("#eq-ap-clear-memory").addEventListener("click",()=>{Ae(),this.logToConsole("> [SYS] Mem\xF3ria contextual limpa com sucesso.","text-green"),this.setStatus("Mem\xF3ria contextual da sess\xE3o limpa.","success")});let u=this.shadow.querySelector("#eq-copy-console-btn");u?.addEventListener("click",()=>{let l=this.apConsole?.innerText||"";navigator.clipboard.writeText(l).then(()=>{let h=u.innerHTML;u.innerHTML=E.check,setTimeout(()=>u.innerHTML=h,1800)})}),this.copyPromptBtn.addEventListener("click",()=>{let l=this.inspPrompt.textContent||"";navigator.clipboard.writeText(l).then(()=>{let h=this.copyPromptBtn.innerHTML;this.copyPromptBtn.innerHTML=`${E.check} Copiado!`,setTimeout(()=>this.copyPromptBtn.innerHTML=h,2e3)})}),this.modelSelect.addEventListener("change",()=>this.callbacks.onSettingsChange({model:this.modelSelect.value})),this.modeSelect.addEventListener("change",()=>this.callbacks.onSettingsChange({modeHint:this.modeSelect.value})),this.engineSelect.addEventListener("change",()=>this.callbacks.onSettingsChange({engine:this.engineSelect.value})),this.dryRunCheckbox.addEventListener("change",()=>this.callbacks.onSettingsChange({dryRun:this.dryRunCheckbox.checked})),this.autoApplyCheckbox.addEventListener("change",()=>this.callbacks.onSettingsChange({autoApply:this.autoApplyCheckbox.checked})),this.autoAdvanceCheckbox.addEventListener("change",()=>this.callbacks.onSettingsChange({autoAdvance:this.autoAdvanceCheckbox.checked})),this.useVisionCheckbox.addEventListener("change",()=>{let l=this.useVisionCheckbox.checked;this.callbacks.onSettingsChange({useVision:l}),this.setStatus(l?"Vis\xE3o Computacional ativada (capturas habilitadas).":"Modo DOM R\xE1pido ativado (capturas desabilitadas).","info")}),this.hostDarkModeCheckbox.addEventListener("change",()=>{let l=this.hostDarkModeCheckbox.checked;this.callbacks.onSettingsChange({hostDarkMode:l}),this.applyHostDarkMode(l)}),this.analyzeBtn.addEventListener("click",async()=>{await this.callbacks.onAnalyze()&&!this.dryRunCheckbox.checked&&!this.autoApplyCheckbox.checked&&this.callbacks.onApply()}),this.applyBtn.addEventListener("click",()=>this.callbacks.onApply())}startStopwatch(){this.stopStopwatch(),this.stopwatchStartTime=Date.now();let e=()=>{let t=((Date.now()-this.stopwatchStartTime)/1e3).toFixed(2)+"s";this.stopwatchAp.textContent=t,this.stopwatchAdv.textContent=t};e(),this.stopwatchInterval=setInterval(e,100)}stopStopwatch(e){if(this.stopwatchInterval&&(clearInterval(this.stopwatchInterval),this.stopwatchInterval=null),e!==void 0){let t=(e/1e3).toFixed(2)+"s";this.stopwatchAp.textContent=t,this.stopwatchAdv.textContent=t}}setLogFilter(e){this.activeLogFilter=e;let t=["all","error","ai","dom"];for(let a of t){let n=this.shadow.querySelector(`#eq-dbg-filter-${a}`);a===e?n?.classList.add("active"):n?.classList.remove("active")}this.renderTerminalEntries()}updateLogCounters(){let e=0,t=0,a=0;for(let n of this.logEntries)n.category==="error"?e++:n.category==="ai"?t++:n.category==="dom"&&a++;this.dbgCountAll&&(this.dbgCountAll.textContent=String(this.logEntries.length)),this.dbgCountError&&(this.dbgCountError.textContent=String(e)),this.dbgCountAi&&(this.dbgCountAi.textContent=String(t)),this.dbgCountDom&&(this.dbgCountDom.textContent=String(a))}renderTerminalEntries(){if(!this.liveDebugTerminal)return;this.liveDebugTerminal.replaceChildren();let e=this.activeLogFilter==="all"?this.logEntries:this.logEntries.filter(t=>t.category===this.activeLogFilter);if(e.length===0){let t=document.createElement("div");t.className="text-muted",t.textContent=`Nenhum log encontrado para o filtro "${this.activeLogFilter.toUpperCase()}".`,this.liveDebugTerminal.appendChild(t);return}for(let t of e){let a=document.createElement("div");a.textContent=t.message,t.colorClass&&(a.className=t.colorClass),this.liveDebugTerminal.appendChild(a)}this.autoScrollLogs&&(this.liveDebugTerminal.scrollTop=this.liveDebugTerminal.scrollHeight)}clearLogs(){if(this.logEntries=[],this.updateLogCounters(),this.liveDebugTerminal){this.liveDebugTerminal.replaceChildren();let e=document.createElement("div");e.className="text-blue",e.textContent="> [SYS] Console de logs limpo pelo usu\xE1rio.",this.liveDebugTerminal.appendChild(e)}this.apConsole&&this.apConsole.replaceChildren(),this.executionConsole&&this.executionConsole.replaceChildren()}getFormattedLogs(){return(this.activeLogFilter==="all"?this.logEntries:this.logEntries.filter(t=>t.category===this.activeLogFilter)).map(t=>t.message).join(`
`)}setLastError(e){this.lastErrorMsg=e,this.dbgErrorCard&&this.dbgErrorText&&(this.dbgErrorText.textContent=e,this.dbgErrorCard.style.display="flex")}setErrorDiagnostic(e,t){let a=t?`[${t}] ${e}`:e;this.setLastError(a)}refreshDebugView(){let e=this.latestPlan,t=this.latestContext,a=this.latestPromptText||e?.promptSent||"";if(this.dbgModel&&(this.dbgModel.textContent=e?.usedModel||this.initialSettings.model||"--"),this.dbgLatency&&(this.dbgLatency.textContent=e?.durationMs?`${e.durationMs}ms`:"--"),this.dbgSplitTokens){let n=e?.promptTokens!==void 0?String(e.promptTokens):"--",i=e?.candidatesTokens!==void 0?String(e.candidatesTokens):"--";this.dbgSplitTokens.textContent=`${n} / ${i}`,this.dbgSplitTokens.title=`Prompt: ${n} tokens | Resposta: ${i} tokens`}if(this.dbgTotalTokens){let n=e?.tokensUsed??(e?.promptTokens&&e?.candidatesTokens?e.promptTokens+e.candidatesTokens:void 0);this.dbgTotalTokens.textContent=n!==void 0?`${n}`:"--"}if(this.dbgPromptLen){let n=a.length,i=Math.round(n/4);this.dbgPromptLen.textContent=`${n} chars (~${i} tokens est.)`}if(this.dbgPromptView&&(this.dbgPromptView.textContent=a||"Nenhum prompt enviado at\xE9 o momento."),this.dbgContextView)if(t){let n={scope:`${t.scope.tagName.toLowerCase()}${t.scope.id?"#"+t.scope.id:""}${t.scope.className?"."+t.scope.className.split(" ").join("."):""}`,questionLength:t.questionText.length,questionSnippet:t.questionText.slice(0,150)+(t.questionText.length>150?"...":""),controlsCount:t.controls.length,controls:t.controls.map((i,s)=>({index:s+1,tag:i.tag,type:i.type,name:i.name||void 0,id:i.id||void 0,value:i.value||void 0,label:i.label||void 0,role:i.role}))};this.dbgContextView.textContent=JSON.stringify(n,null,2)}else this.dbgContextView.textContent="Aguardando captura de contexto pelo EasyQuiz...";this.dbgRawRespView&&(e?e.rawResponse?this.dbgRawRespView.textContent=e.rawResponse:this.dbgRawRespView.textContent=JSON.stringify({pageType:e.pageType,mode:e.mode,confidence:e.confidence,rationale:e.rationale,actions:e.actions},null,2):this.dbgRawRespView.textContent="Aguardando retorno da API Gemini..."),this.lastErrorMsg&&this.dbgErrorCard&&this.dbgErrorText&&(this.dbgErrorText.textContent=this.lastErrorMsg,this.dbgErrorCard.style.display="flex")}logToConsole(e,t){let a=new Date,n=`${String(a.getHours()).padStart(2,"0")}:${String(a.getMinutes()).padStart(2,"0")}:${String(a.getSeconds()).padStart(2,"0")}.${String(Math.floor(a.getMilliseconds()/100))}`,i=e;e.startsWith(">")?i=`> [${n}] ${e.slice(1).trim()}`:i=`[${n}] ${e}`;let s="all";t==="text-red"||i.includes("[ERRO]")||i.includes("Falha")||i.includes("Error")?s="error":i.includes("[IA]")||i.includes("[RAG]")||i.includes("Tokens")||i.includes("Gemini")||i.includes("Modelo:")?s="ai":(i.includes("[DOM]")||i.includes("[EXEC]")||i.includes("[VERIF]")||i.includes("[NAV]"))&&(s="dom");let r={id:Date.now()+Math.random(),timestamp:n,message:i,colorClass:t,category:s};for(this.logEntries.push(r);this.logEntries.length>250;)this.logEntries.shift();if(this.updateLogCounters(),s==="error"&&this.setLastError(i),this.liveDebugTerminal&&(this.activeLogFilter==="all"||this.activeLogFilter===s)){let c=document.createElement("div");for(c.textContent=i,t&&(c.className=t),this.liveDebugTerminal.appendChild(c);this.liveDebugTerminal.children.length>250;)this.liveDebugTerminal.removeChild(this.liveDebugTerminal.firstChild);this.autoScrollLogs&&(this.liveDebugTerminal.scrollTop=this.liveDebugTerminal.scrollHeight)}if(this.apConsole){let c=document.createElement("div");for(c.textContent=i,t&&(c.className=t),this.apConsole.appendChild(c),this.apConsole.scrollTop=this.apConsole.scrollHeight;this.apConsole.children.length>150;)this.apConsole.removeChild(this.apConsole.firstChild)}if(this.executionConsole){let c=document.createElement("div");for(c.textContent=i,t&&(c.className=t),this.executionConsole.appendChild(c),this.executionConsole.scrollTop=this.executionConsole.scrollHeight;this.executionConsole.children.length>150;)this.executionConsole.removeChild(this.executionConsole.firstChild)}}setProgress(e,t){if(!this.progressContainer||!this.progressBar)return;if(e<=0){this.progressContainer.style.display="none",this.progressBar.style.width="0%";return}this.progressContainer.style.display="flex";let a=Math.min(100,Math.max(0,Math.round(e)));this.progressBar.style.width=`${a}%`,this.progressVal&&(this.progressVal.textContent=`${a}%`),t&&this.progressLabel&&(this.progressLabel.textContent=t),a>=100&&setTimeout(()=>{this.progressContainer&&this.progressBar&&this.progressBar.style.width==="100%"&&(this.progressContainer.style.display="none")},1500)}updateContext(e,t){this.latestContext=e,t&&(this.latestPlan=t),this.activeTab==="brain"?(this.renderContextTree(),t&&this.refreshInspectorView()):this.activeTab==="debug"&&this.refreshDebugView()}renderContextTree(){if(!this.contextTreeContainer)return;let e=this.latestContext,t=de(),a=this.latestPlan;this.contextTreeContainer.innerHTML="";let n=this.createTreeFolder("\u{1F4C4} P\xC1GINA & ESCOPO ATUAL",!0,[{label:"T\xEDtulo",value:document.title||"Sem t\xEDtulo"},{label:"URL",value:window.location.pathname||"/"},{label:"Escopo DOM",value:e?`${e.scope.tagName.toLowerCase()}${e.scope.className?"."+e.scope.className.split(" ").join("."):""}`:"Document"},{label:"Tamanho Texto",value:e?`${e.questionText.length} caracteres`:"N\xE3o analisado"},{label:"Trecho Enunciado",value:e?`"${e.questionText.slice(0,120)}..."`:"Nenhum"}]);this.contextTreeContainer.appendChild(n);let i=e?e.controls:[],s=i.map((p,u)=>{let l=p.role==="navigation"||p.type==="button",h=!l&&p.value?` [val: "${p.value}"]`:"";return{label:`[#${u+1}] ${p.type.toUpperCase()}`,value:`${p.label||p.id||p.name||"(Sem r\xF3tulo)"}${h}`.trim(),badge:l?"Navega\xE7\xE3o":p.role||p.type}}),r=this.createTreeFolder(`\u{1F39B}\uFE0F CONTROLES DETECTADOS (${i.length})`,i.length>0,s);this.contextTreeContainer.appendChild(r);let c=t.map((p,u)=>({label:`Mem\xF3ria #${u+1}`,value:p,badge:"RAG"})),d=this.createTreeFolder(`\u{1F9E0} MEM\xD3RIA RAG ACUMULADA (${t.length})`,t.length>0,c);if(this.contextTreeContainer.appendChild(d),a){let p=this.createTreeFolder(`\u{1F916} \xDALTIMO PLANO IA (${a.actions.length} a\xE7\xF5es)`,!0,[{label:"Tipo P\xE1gina",value:a.pageType,badge:`${(a.confidence*100).toFixed(0)}%`},{label:"Modo",value:a.mode},{label:"Racioc\xEDnio",value:a.rationale||"N/A"},...a.actions.map((u,l)=>({label:`A\xE7\xE3o #${l+1} (${u.t})`,value:JSON.stringify(u)}))]);this.contextTreeContainer.appendChild(p)}}createTreeFolder(e,t,a){let n=document.createElement("div");n.className="eq-tree-node";let i=document.createElement("div");i.className="eq-tree-header",i.innerHTML=`<span class="eq-tree-arrow">${t?"\u25BC":"\u25B6"}</span> <span>${e}</span>`;let s=document.createElement("div");if(s.className="eq-tree-content",s.style.display=t?"flex":"none",a.length===0)s.innerHTML='<div class="text-muted" style="padding: 2px 0;">Nenhum item registrado.</div>';else for(let r of a){let c=document.createElement("div");c.className="eq-tree-leaf",c.innerHTML=`
          <strong style="color:#ffffff; min-width: 80px;">${r.label}:</strong>
          <span style="flex:1; word-break: break-word; color:#aaaaaa;">${r.value}</span>
          ${r.badge?`<span class="eq-tree-badge">${r.badge}</span>`:""}
        `,s.appendChild(c)}return i.addEventListener("click",()=>{let r=s.style.display==="none";s.style.display=r?"flex":"none";let c=i.querySelector(".eq-tree-arrow");c&&(c.textContent=r?"\u25BC":"\u25B6")}),n.appendChild(i),n.appendChild(s),n}toggle(e){e!==void 0?this.isCollapsed=!e:this.isCollapsed=!this.isCollapsed,this.isCollapsed?this.sidebarEl.classList.add("eq-collapsed"):(this.sidebarEl.classList.remove("eq-collapsed"),this.apiKeyInput.value||(this.switchTab("settings"),this.apiKeyInput.focus()))}setBusy(e,t){this.analyzeBtn.disabled=e,[this.modelSelect,this.modeSelect,this.engineSelect,this.dryRunCheckbox,this.autoApplyCheckbox,this.autoAdvanceCheckbox,this.useVisionCheckbox].forEach(a=>a.disabled=e),e?(this.startStopwatch(),this.dotPulseAp.className="eq-dot-pulse busy",this.dotPulseAdv.className="eq-dot-pulse busy",this.launcherDot.className="eq-launcher-dot busy",t&&this.setStatus(t,"info")):(this.stopStopwatch(),this.dotPulseAp.className="eq-dot-pulse",this.dotPulseAdv.className="eq-dot-pulse",this.launcherDot.className="eq-launcher-dot")}setStatus(e,t="info"){this.statusTextAp.textContent=e,this.statusTextAdv.textContent=e;let a=this.shadow.querySelector("#eq-operation-state");a&&(a.textContent=t==="error"?"Bloqueado":t==="success"?"Confirmado":this.autopilot.isActive()?"Monitorando":"Pronto",a.className=`eq-operation-state is-${t}`),t==="error"?(this.dotPulseAp.className="eq-dot-pulse error",this.dotPulseAdv.className="eq-dot-pulse error",this.launcherDot.className="eq-launcher-dot error"):t==="success"&&(this.dotPulseAp.className="eq-dot-pulse",this.dotPulseAdv.className="eq-dot-pulse",this.launcherDot.className="eq-launcher-dot");let n=e.includes("Alternando")||e.includes("indispon\xEDvel")||e.includes("fallback")||e.includes("alternativo"),i=t==="error"?"> [ERRO] ":t==="success"?"> [SUCESSO] ":n?"> [FALLBACK] ":"> [SYS] ",s=t==="error"?"text-red":t==="success"?"text-green":n?"text-yellow":"text-blue";this.logToConsole(`${i}${e}`,s)}setPlan(e,t){this.latestPlan=e,this.resultContainer.style.display="flex",e.durationMs&&this.stopStopwatch(e.durationMs);let a=this.shadow.querySelector("#eq-badges");a.replaceChildren();let n=[e.mode.replace("_"," "),`${Math.round(e.confidence*100)}% Confian\xE7a`,`${e.actions.length} a\xE7\xF5es`,...e.usedModel?[e.usedModel]:[]];for(let c of n){let d=document.createElement("span");d.className="eq-brand-badge",d.textContent=c,a.appendChild(d)}let i=this.shadow.querySelector("#eq-rationale-text");i.textContent=e.rationale;let s=this.shadow.querySelector("#eq-actions-list");s.innerHTML="";for(let c of e.actions){let d=document.createElement("div");d.className="eq-action-item";let p="";c.t==="chk"?p=`chk ${c.id} (${c.c})`:c.t==="val"?p=`val "${c.v}" -> ${c.id}`:c.t==="sel"?p=`sel "${Array.isArray(c.v)?c.v.join(","):c.v}" -> ${c.id}`:c.t==="clk"?p=`clk ${c.id}`:c.t==="adv"?p="adv":c.t==="js"?p=`js: ${String(c.v).slice(0,40)}...`:c.t==="drag"&&(p=`drag "${c.from}" -> "${c.to}"`);let u=document.createElement("span");u.className="eq-action-badge",u.textContent=c.t.toUpperCase();let l=document.createElement("span");l.textContent=p,d.append(u,l),s.appendChild(d)}this.applyBtn.disabled=!t||!e.actions.length;let r=this.shadow.querySelector("#eq-execution-card");r&&(r.hidden=!0),this.refreshInspectorView(),this.refreshDebugView()}setExecutionReport(e){let t=this.shadow.querySelector("#eq-execution-card"),a=this.shadow.querySelector("#eq-execution-summary"),n=this.shadow.querySelector("#eq-execution-list");if(!t||!a||!n)return;t.hidden=!1,a.textContent=e.navigationVerified?`${e.verified}/${e.applied} a\xE7\xF5es verificadas. Navega\xE7\xE3o confirmada.`:`${e.verified}/${e.applied} a\xE7\xF5es verificadas. ${e.navigationEvidence}`,a.className=`eq-execution-summary ${e.success?"is-success":"is-warning"}`,n.replaceChildren();let i=this.shadow.querySelector("#eq-execution-placeholder");i&&(i.textContent=e.navigationVerified?"Fluxo conclu\xEDdo: aplica\xE7\xE3o e navega\xE7\xE3o confirmadas.":`Fluxo interrompido: ${e.navigationEvidence}`,i.className=`eq-execution-placeholder ${e.success?"is-success":"is-warning"}`);for(let s of e.reports){let r=document.createElement("div");r.className=`eq-execution-row ${s.verified?"is-success":"is-failed"}`;let c=document.createElement("span");c.className="eq-execution-state",c.textContent=s.verified?"OK":"FALHOU";let d=document.createElement("div");d.className="eq-execution-details";let p=document.createElement("strong");p.textContent=s.target;let u=document.createElement("span");if(u.textContent=`${s.strategy} | ${s.evidence}`,d.append(p,u),r.append(c,d),s.error){let l=document.createElement("small");l.textContent=s.error,r.appendChild(l)}n.appendChild(r)}}setInspectorPrompt(e,t){this.latestPromptText=e,this.inspPrompt&&(this.inspPrompt.textContent=e),t&&this.inspModel&&(this.inspModel.textContent=t),this.inspLatency&&(this.inspLatency.textContent="Aguardando IA..."),this.activeTab==="debug"&&this.refreshDebugView()}refreshInspectorView(){let e=this.latestPlan;if(e)if(this.inspModel.textContent=e.usedModel||this.initialSettings.model,this.inspLatency.textContent=e.durationMs?`${e.durationMs}ms`:"--",this.inspTokens.textContent=e.tokensUsed?`${e.tokensUsed}`:"--",this.inspPrompt.textContent=e.promptSent||this.latestPromptText||"Prompt n\xE3o registrado para esta requisi\xE7\xE3o.",this.inspRationale.textContent=e.rationale,this.inspActions.innerHTML="",e.actions.length>0)for(let t of e.actions){let a=document.createElement("div");a.className="eq-action-item",a.textContent=JSON.stringify(t),this.inspActions.appendChild(a)}else this.inspActions.innerHTML='<div class="text-muted" style="padding: 4px;">Nenhuma a\xE7\xE3o prescrita pela IA.</div>';else this.latestPromptText&&(this.inspPrompt.textContent=this.latestPromptText)}showFloatingAnswers(e){let t=e||this.latestPlan;t&&this.floatingAnswers.show(t)}hideFloatingAnswers(){this.floatingAnswers.hide()}isFloatingAnswersOpen(){return this.floatingAnswers.isOpen()}updateModelSelect(e,t){let a=t||this.initialSettings.model||this.modelSelect.value;this.modelSelect.innerHTML="";let n=!1;e.forEach(i=>{let s=i.id===a;s&&(n=!0),this.modelSelect.add(new Option(i.name,i.id,!1,s))}),!n&&a&&this.modelSelect.add(new Option(`Gemini (${a})`,a,!1,!0)),this.modelSelect.value=a}updateSelectedModel(e){Array.from(this.modelSelect.options).some(a=>a.value===e)||this.modelSelect.add(new Option(`Gemini (${e})`,e,!1,!0)),this.modelSelect.value=e}applyHostDarkMode(e){document.getElementById("eq-host-dark-mode-style")?.remove(),this.host.classList.toggle("eq-dark-mode-active",e)}destroy(){this.stopStopwatch(),this.autopilot.stop(),this.applyHostDarkMode(!1),this.callbacks.onDestroy(),this.host.remove()}};function Kt(){try{if(typeof document>"u"||!document.head||document.querySelector("link[data-easyquiz-preconnect]"))return;let o=document.createElement("link");o.rel="preconnect",o.href="https://generativelanguage.googleapis.com",o.crossOrigin="anonymous",o.setAttribute("data-easyquiz-preconnect","true"),document.head.appendChild(o);let e=document.createElement("link");e.rel="dns-prefetch",e.href="https://generativelanguage.googleapis.com",e.setAttribute("data-easyquiz-preconnect","true"),document.head.appendChild(e)}catch{}}async function Yt(){let o=window;if(Kt(),o.__easyquiz){o.__easyquiz.toggle();return}let e=Ce(),t=null,a=null,n=new qe(e,{onAnalyze:(r=1,c)=>i(r,c),onApply:(r=1)=>void s(r),onDestroy:()=>{if(a){try{a.abort()}catch{}a=null}Y(),delete o.__easyquiz},onCancel:()=>{if(a){try{a.abort()}catch{}a=null}Y(),n.setBusy(!1),n.setProgress(0),n.logToConsole("> [SYS] Opera\xE7\xE3o cancelada imediatamente pelo usu\xE1rio.","text-yellow")},onSettingsChange:r=>{e=Ze(r)}});o.__easyquiz={toggle:()=>n.toggle(),destroy:()=>n.destroy(),analyze:async()=>{await i()}},window.addEventListener("keydown",r=>{if(r.altKey&&(r.key==="q"||r.key==="Q")){if(r.preventDefault(),!n)return;n.toggle(!0),i()}});async function i(r=1,c){if(!e.apiKey){n.setStatus("Configure sua chave de API Gemini acima para come\xE7ar.","error"),n.toggle(!0);return}if(a)try{a.abort()}catch{}a=new AbortController;let d=a,p=()=>{try{d.abort()}catch{}};if(c&&(c.aborted?d.abort():c.addEventListener("abort",p,{once:!0})),d.signal.aborted){n.setBusy(!1),n.setProgress(0);return}n.setBusy(!0,"Identificando o bloco da quest\xE3o ativa na p\xE1gina..."),n.setProgress(20,"Varrendo escopo do DOM e controles..."),Y(),n.hideFloatingAnswers();try{let u=se(!1);u||(n.setStatus("Nenhum controle detectado. Tentando captura de tela inteira...","info"),u=X()),je(u.scope),n.updateContext(u),n.logToConsole(`> [DOM] Escopo: <${u.scope.tagName.toLowerCase()}> com ${u.controls.length} controle(s) e ${u.questionText.length} caracteres.`,"text-blue"),n.setStatus(`Quest\xE3o localizada (${u.controls.length} controles). Preparando an\xE1lise...`,"info"),n.setProgress(40,`Consultando Gemini (${e.model})...`);let l=await Ke(u.scope,e.useVision);if(l.length>0){let m=l.map(f=>f.element).filter(Boolean);Ge(m)}if(d.signal.aborted)return;n.setStatus(l.length>0?`Consultando Gemini (${e.model}) com ${l.length} imagem(ns) anexada(s)...`:`Consultando Gemini (${e.model}) via DOM nativo (modo r\xE1pido)...`,"info");let h=ne(u,l,e);n.setInspectorPrompt(h,e.model);let g=(m,f)=>{n.setStatus(m,f==="warning"?"info":f);let x=f==="error"?"[ERRO]":f==="warning"?"[FALLBACK]":"[SYS]",w=f==="error"?"text-red":f==="warning"?"text-yellow":"text-muted";n.logToConsole(`> ${x} ${m}`,w)},{plan:b,usedModel:v}=await He(u,l,e,g,d.signal);if(d.signal.aborted)return;if(b.needsMoreContext){if(n.setProgress(55,"Ampliando escopo da quest\xE3o..."),n.setStatus("Enunciado ou contexto isolado detectado pela IA. Acionando Sele\xE7\xE3o Geral Expandida...","info"),n.logToConsole("> [DOM] Enunciado isolado. Ampliando escopo para sele\xE7\xE3o expandida...","text-blue"),u=se(!0),u||(u=X()),je(u.scope),n.updateContext(u),l=await Ke(u.scope,e.useVision),l.length>0){let x=l.map(w=>w.element).filter(Boolean);Ge(x)}n.setStatus(`Reconsultando IA com escopo ampliado (${u.controls.length} controles)...`,"info");let m=ne(u,l,e);n.setInspectorPrompt(m,e.model),b=(await He(u,l,e,g,d.signal)).plan}return d.signal.aborted||(n.setProgress(70,"Resposta recebida da IA! Processando plano..."),n.logToConsole(`> [IA] Modelo: ${v||e.model} | Modo: ${b.mode} | Confian\xE7a: ${(b.confidence*100).toFixed(0)}%`,"text-green"),b.rationale&&n.logToConsole(`> [IA] Racioc\xEDnio: "${b.rationale}"`,"text-blue"),n.logToConsole(`> [IA] ${b.actions.length} a\xE7\xE3o(\xF5es) prescritas no plano.`,"text-blue"),b.memoryToStore&&(et(b.memoryToStore),n.logToConsole(`> [RAG] \u{1F9E0} Nova mem\xF3ria te\xF3rica salva na sess\xE3o: "${b.memoryToStore}"`,"text-yellow")),t=b,n.updateContext(u,b),bt(b.actions),n.setPlan(b,!e.dryRun),b.pageType==="conclusion"?(n.setProgress(100,"Atividade conclu\xEDda!"),n.setStatus("Atividade conclu\xEDda ou tela final detectada pela IA.","success")):b.pageType==="info"?(n.setProgress(100,"Contexto absorvido na mem\xF3ria!"),n.setStatus("\u{1F4D8} Conte\xFAdo de contexto absorvido na mem\xF3ria RAG. Avan\xE7ando...","success")):b.pageType==="start"?(n.setProgress(100,"In\xEDcio detectado!"),n.setStatus("In\xEDcio de atividade detectado. Iniciando...","info")):(n.setProgress(80,"Plano de resolu\xE7\xE3o pronto!"),n.setStatus(e.dryRun?"Simula\xE7\xE3o conclu\xEDda. As respostas foram real\xE7adas na p\xE1gina sem altera\xE7\xE3o.":"Resolu\xE7\xE3o pronta! Verifique o realce na tela e aplique quando desejar.","success")),e.dryRun&&b.pageType==="question"&&n.showFloatingAnswers(b),d.signal.aborted)?void 0:(e.autoApply&&!e.dryRun&&await s(r,d.signal),b)}catch(u){if(d.signal.aborted||u instanceof Error&&(u.name==="AbortError"||u.message.includes("cancelada"))){Y(),n.setProgress(0),n.setBusy(!1),n.setStatus("Opera\xE7\xE3o cancelada pelo usu\xE1rio.","info");return}Y(),n.setProgress(0);let l=u instanceof Error?u.message:"Falha desconhecida na an\xE1lise.";n.setStatus(l,"error"),n.logToConsole(`> [ERRO] ${l}`,"text-red"),n.setErrorDiagnostic(l,"An\xE1lise da IA");return}finally{c?.removeEventListener("abort",p),a===d&&(a=null),n.setBusy(!1)}}async function s(r=1,c){if(c?.aborted)return;if(!t){n.setStatus("Nenhum plano dispon\xEDvel para aplicar. Execute a an\xE1lise primeiro.","error");return}if(e.dryRun){n.setStatus("O modo de simula\xE7\xE3o est\xE1 ativo. Desmarque para poder aplicar.","error");return}let d=t.pageType==="info"||t.pageType==="start",p=(e.autoAdvance||d)&&t.confidence>=e.confidenceThreshold&&!t.needsMoreContext;n.setBusy(!0,"Aplicando respostas no formul\xE1rio..."),n.setProgress(85,`Aplicando ${t.actions.length} a\xE7\xE3o(\xF5es) no formul\xE1rio...`),n.logToConsole(`> [EXEC] Iniciando aplica\xE7\xE3o com 6 vias de persist\xEAncia para ${t.actions.length} a\xE7\xE3o(\xF5es)...`,"text-blue");try{let u=await Ve(t,p,r,ie(e));if(c?.aborted)return;if(n.setExecutionReport(u),u.success||u.advanced)n.setProgress(100,"Sucesso! Respostas preenchidas e validadas!"),n.logToConsole(`> [VERIF] \u2713 Sucesso no DOM: ${u.verified}/${u.applied} a\xE7\xF5es validadas com sucesso!`,"text-green"),u.advanced?n.logToConsole("> [NAV] \u2713 Bot\xE3o de confirma\xE7\xE3o/avan\xE7o acionado com sucesso!","text-green"):p&&n.logToConsole(`> [NAV] \u26A0\uFE0F ${u.navigationEvidence}`,"text-yellow"),n.setStatus(u.advanced?`Sucesso: ${u.applied} resposta(s) preenchida(s) e pr\xF3xima quest\xE3o confirmada.`:`Respostas preenchidas e validadas. Avan\xE7o n\xE3o confirmado: ${u.navigationEvidence}`,u.advanced||!p?"success":"info"),n.hideFloatingAnswers();else{n.setProgress(0,"Inje\xE7\xE3o direta restrita. Gabarito r\xE1pido exibido.");let l=u.failed.length>0?u.failed.join(", "):"alvos pendentes";n.logToConsole(`> [VERIF] Alerta: ${u.verified}/${u.applied} a\xE7\xF5es verificadas no DOM. Pend\xEAncias: ${l}.`,"text-yellow"),n.logToConsole("> [GABARITO] Inje\xE7\xE3o direta restrita pela p\xE1gina. Gabarito r\xE1pido exibido na tela; o Autopilot aguarda voc\xEA marcar e avan\xE7ar.","text-yellow"),n.setStatus("Inje\xE7\xE3o restrita pela p\xE1gina. Gabarito direto exibido na tela para voc\xEA avan\xE7ar.","info"),n.showFloatingAnswers(t)}}catch(u){n.setProgress(0);let l=u instanceof Error?u.message:"Falha ao aplicar plano.";n.setStatus("Inje\xE7\xE3o restrita pela p\xE1gina. Gabarito direto exibido na tela para voc\xEA avan\xE7ar.","info"),n.logToConsole(`> [ERRO] ${l}`,"text-red"),t&&n.showFloatingAnswers(t)}finally{n.setBusy(!1)}}n.toggle(!0)}Yt().catch(o=>{console.error("[EasyQuiz] Erro fatal na inicializa\xE7\xE3o:",o),window.alert(`EasyQuiz: falha ao iniciar: ${o instanceof Error?o.message:String(o)}`)});})();
