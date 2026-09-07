/* EasyQuiz v1.0.0 — Resolução inteligente de quizzes sem servidor
 * GitHub: https://github.com/minifoxie/EasyQuiz
 * 100% Client-side. Direct Google Gemini REST API.
 */
"use strict";(()=>{var U={apiKey:"",apiKeys:[],model:"gemini-2.5-flash",uiMode:"easy",modeHint:"",engine:"smart",dryRun:!1,autoApply:!0,autoAdvance:!1,hostDarkMode:!0,useVision:!1,confidenceThreshold:.8};function R(o){if(!o||typeof o!="string")return!1;let e=o.toLowerCase().trim().replace(/^models\//,"");if(!e.includes("gemini"))return!1;let t=["imagen","image","veo","omni","video","embedding","embed","tts","audio","speech","voice","sound","live","transcribe","bidi","aqa","learnlm","deep-research","computer-use","robotics","rt-1","rt-2","mediapipe","latest","-high","-ultra","experimental"];for(let a of t)if(e.includes(a))return!1;return!(!e.includes("flash")&&!e.includes("pro")||/gemini-[3-9]\./i.test(e))}var Ne="easyquiz_settings_v2",ee="easyquiz_activity_metrics";function Be(){try{let o=localStorage.getItem(Ne);if(!o){let l=localStorage.getItem("easyquiz_settings_v1");if(l){let s=JSON.parse(l);return{...U,apiKey:s.apiKey||""}}return{...U}}let e=JSON.parse(o),t=typeof e.model=="string"&&R(e.model)?e.model:U.model,a=Array.isArray(e.apiKeys)?e.apiKeys.map(l=>typeof l=="string"?l.trim().replace(/^["']|["']$/g,""):"").filter(l=>l.length>5):[],i=typeof e.apiKey=="string"?e.apiKey.trim().replace(/^["']|["']$/g,""):"";return a.length===0&&i&&(a=[i]),{apiKey:a[0]||i||U.apiKey,apiKeys:a,model:t,uiMode:e.uiMode==="easy"||e.uiMode==="advanced"?e.uiMode:U.uiMode,modeHint:e.modeHint??"",engine:e.engine??"smart",dryRun:!!e.dryRun,autoApply:e.autoApply!==void 0?!!e.autoApply:!0,autoAdvance:!!e.autoAdvance,hostDarkMode:e.hostDarkMode!==void 0?!!e.hostDarkMode:!0,useVision:!!e.useVision,confidenceThreshold:typeof e.confidenceThreshold=="number"?e.confidenceThreshold:U.confidenceThreshold}}catch{return{...U}}}function ct(){try{localStorage.removeItem(Ne),localStorage.removeItem("easyquiz_settings_v1"),localStorage.removeItem(ee),sessionStorage.removeItem(ee);let o=[];for(let e=0;e<localStorage.length;e++){let t=localStorage.key(e);t&&(t.startsWith("eq_")||t.startsWith("easyquiz_"))&&o.push(t)}o.forEach(e=>localStorage.removeItem(e)),Oe()}catch(o){console.warn("[EasyQuiz] Erro ao resetar dados:",o)}}function me(o){try{let e=localStorage.getItem("eq_domain_cache_"+o);if(!e)return{};let t=JSON.parse(e);if(t.advanceSelector&&/inject|injetar/i.test(t.advanceSelector)){t.advanceSelector=void 0;try{localStorage.removeItem("eq_domain_cache_"+o)}catch{}}return t}catch{return{}}}function De(o,e){if(e.advanceSelector&&/inject|injetar/i.test(e.advanceSelector))return;let a={...me(o),...e};try{localStorage.setItem("eq_domain_cache_"+o,JSON.stringify(a))}catch(i){console.warn("[EasyQuiz] Erro cache de dominio:",i)}}function dt(o){let e=Be(),t=Array.isArray(o.apiKeys)?o.apiKeys.map(n=>typeof n=="string"?n.trim().replace(/^["']|["']$/g,""):"").filter(n=>n.length>5):e.apiKeys,a;typeof o.apiKey=="string"?a=o.apiKey.trim().replace(/^["']|["']$/g,""):Array.isArray(o.apiKeys)&&o.apiKeys.length>0?a=t[0]||"":a=e.apiKey,a&&!t.includes(a)&&(t=[a,...t]),t.length>0&&(!a||!t.includes(a))&&(a=t[0]);let i={...e,...o,apiKey:a,apiKeys:t};try{localStorage.setItem(Ne,JSON.stringify(i))}catch(n){console.warn("[EasyQuiz] Falha ao persistir configura\xE7\xF5es no localStorage:",n)}return i}var Z=[],lt=12,It=1200;function ut(o){let e=o.trim().replace(/\s+/g," ").slice(0,It);e&&!Z.includes(e)&&(Z.push(e),Z.length>lt&&(Z=Z.slice(-lt)))}function Ce(){return Z}function Oe(){Z=[]}function pt(){return{startTime:Date.now(),totalElapsedMs:0,completedQuestionsCount:0,averageDurationMs:0,records:[]}}var he=pt();function se(){try{localStorage.removeItem(ee)}catch{}return he}function zt(o){he=o;try{let e=JSON.stringify(o);sessionStorage.setItem(ee,e),localStorage.removeItem(ee)}catch{}}function Ve(o){let e=he,t=Date.now(),a=e.records[e.records.length-1];if(a&&a.id===o.id&&t-a.timestamp<3e3)return e;let i={...o,timestamp:t},n=[...e.records,i],l=n.filter(u=>u.status==="answered"||u.status==="verified").length,s=n.reduce((u,h)=>u+h.durationMs,0),c=l>0?Math.round(s/l):0,d={startTime:e.startTime||t,totalElapsedMs:Math.max(t-(e.startTime||t),s),completedQuestionsCount:l,averageDurationMs:c,records:n};return zt(d),d}function ge(){he=pt();try{sessionStorage.removeItem(ee),localStorage.removeItem(ee)}catch{}return he}var ht=[{id:"native-value-events",widget:"text",label:"Setter nativo com input/change/blur",precondition:"Campo edit\xE1vel vis\xEDvel e n\xE3o desabilitado.",evidence:"value ou textContent coincide exatamente com o valor esperado.",risk:"low",cost:"fast"},{id:"native-choice-state",widget:"choice",label:"Estado nativo de radio/checkbox",precondition:"Input ou widget ARIA \xFAnico localizado.",evidence:"checked/aria-checked/data-state do alvo e grupo correspondem ao esperado.",risk:"low",cost:"fast"},{id:"native-select-events",widget:"select",label:"Sele\xE7\xE3o nativa por value/texto exato",precondition:"Select vis\xEDvel com op\xE7\xE3o correspondente.",evidence:"option.selected e selected value correspondem ao esperado.",risk:"low",cost:"fast"},{id:"aria-combobox-keyboard",widget:"combobox",label:"Combobox ARIA por foco e teclado",precondition:"Combobox vis\xEDvel com popup/op\xE7\xF5es acess\xEDveis.",evidence:"aria-expanded, aria-activedescendant ou op\xE7\xE3o selecionada mudam.",risk:"medium",cost:"normal"},{id:"click-to-place",widget:"drag",label:"Selecionar item e clicar no destino",precondition:"Cart\xE3o e dropzone vis\xEDveis com protocolo click-to-place.",evidence:"Item passa a ser filho do destino ou recebe estado de colocado.",risk:"medium",cost:"normal"},{id:"html5-drag-drop",widget:"drag",label:"HTML5 dragstart/dragover/drop",precondition:"Origem draggable e destino aceita drag/drop.",evidence:"Relocation, callback ou estado placed confirmado.",risk:"medium",cost:"normal"},{id:"keyboard-order",widget:"order",label:"Ordena\xE7\xE3o por foco e teclado",precondition:"Itens orden\xE1veis com foco/roles ou bot\xF5es de mover.",evidence:"Ordem dos itens no DOM corresponde \xE0 sequ\xEAncia esperada.",risk:"medium",cost:"normal"},{id:"navigation-feedback",widget:"navigation",label:"Verificar e confirmar feedback/transi\xE7\xE3o",precondition:"Bot\xE3o de verifica\xE7\xE3o/avan\xE7o \xFAnico e habilitado.",evidence:"Feedback esperado e assinatura espec\xEDfica da quest\xE3o mudam.",risk:"high",cost:"normal"},{id:"javascript-explicit",widget:"javascript",label:"JavaScript limitado via capability expl\xEDcita",precondition:"Engine javascript autorizada e a\xE7\xE3o declarativa insuficiente.",evidence:"Efeito DOM esperado confirmado por verificador.",risk:"high",cost:"last-resort"}];function $t(o){if(!o||o.length===0)return ht.filter(t=>t.widget!=="javascript");let e=new Set(o);return ht.filter(t=>e.has(t.widget))}function mt(o){return $t(o).map(e=>`${e.id}: ${e.label} | pr\xE9: ${e.precondition} | prova: ${e.evidence} | risco: ${e.risk}`).join(`
`)}var gt=`Voc\xEA \xE9 o motor operacional inteligente do EasyQuiz. Sa\xEDda EXCLUSIVA em JSON minificado, sem markdown ou conversa.

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

RACIOC\xCDNIO E C\xC1LCULO DIRETO (rationale):
- Em 'rationale', forne\xE7a resolu\xE7\xE3o DIRETA, ultra-objetiva e r\xE1pida em no m\xE1ximo 1 a 2 frases curtas com a dedu\xE7\xE3o/c\xE1lculo matem\xE1tico final. NUNCA gere introdu\xE7\xF5es, pre\xE2mbulos ou textos longos.
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
rationale: justificativa ultra-curta (1 a 2 frases diretas).
`;function fe(o,e,t){let a=o.htmlSnippet.includes("draggable")||o.htmlSnippet.includes("perseus")||o.htmlSnippet.includes("category")||o.htmlSnippet.includes("dropzone")||o.controls.some(r=>r.type==="draggable"||r.type==="dropzone"),i=new Set(["navigation"]);o.controls.some(r=>["text","number","textarea","contenteditable"].some(p=>r.type.includes(p)))&&i.add("text"),o.controls.some(r=>["radio","checkbox"].includes(r.type)||r.tag==="button")&&i.add("choice"),o.controls.some(r=>r.tag==="select")&&i.add("select"),o.controls.some(r=>/combobox|dropdown/i.test(r.type))&&i.add("combobox"),(o.controls.some(r=>["draggable","dropzone"].includes(r.type))||a)&&i.add("drag"),t.engine==="javascript"&&i.add("javascript");let n=/katex|latex|math|matrix|formula|frac|\$|\^|\_/i.test(o.htmlSnippet)||/calcular|calcule|resolva|matriz|equação|função|probabilidade|geometria|fórmula|coordenada|sistema/i.test(o.questionText),s=o.questionText.length<250||a||o.controls.length<4||n?`
[HTML]:
${o.htmlSnippet.slice(0,3500).replace(/\s+/g," ")}`:`
[HTML]: Omitido.`,c=Ce(),d=c.length>0?`
[MEM\xD3RIA]:
${c.join(" | ")}
`:"",u=o.controls.filter(r=>r.role!=="navigation"),h=o.controls.filter(r=>r.role==="navigation");return`--- AN\xC1LISE ---
[MODO]: ${t.engine} | Dica: ${t.modeHint||"Auto"}
[URL]: ${o.sourceUrl}
[P\xC1GINA]: ${o.pageTitle}${d}
[ESTRAT\xC9GIAS]:
${mt([...i])}
[DADOS]
[TEXTO]:
${o.questionText}${s}

[RESPOSTAS]:
${u.length>0?JSON.stringify(u.map(r=>({id:r.id,t:r.type,n:r.name||void 0,txt:r.label,v:r.value||void 0,opt:r.options.length?r.options:void 0}))):"Nenhuma"}

[NAVEGA\xC7\xC3O]:
${h.length>0?h.map(r=>`"${r.label||r.id}"[${r.type}]`).join(","):"Nenhuma"}

[IMAGENS E GR\xC1FICOS ANEXADOS (${e.length})]:
${e.length>0?e.map((r,p)=>`  - Imagem ${p+1}: ${r.associatedLabel||"Gr\xE1fico da Quest\xE3o"}${r.alt?` (Texto alt: "${r.alt}")`:""}`).join(`
`):"Nenhum anexo visual."}
[/DADOS]
Sa\xEDda em JSON v\xE1lido.`}var Pt=new Set(["question","info","start","conclusion"]),Rt=new Set(["texto_livre","escolha_unica","escolha_multipla","verdadeiro_falso","preenchimento","acao_sem_resposta","categorizacao","ordenacao","arrastar_soltar"]),Nt=new Set(["val","chk","sel","clk","adv","js","drag"]),Bt=150,ve=2e3;function D(o,e=""){return o==null?e:typeof o=="string"?o.trim().slice(0,ve):typeof o=="number"||typeof o=="boolean"?String(o).trim().slice(0,ve):e}function Dt(o,e){if(!o||typeof o!="object")return null;let t=o,a=t.t;if(typeof a!="string"||!Nt.has(a))return null;if(a==="adv"){let s=t.id??t.target??t.name??t.selector;return{t:"adv",...D(s)?{id:D(s,"").slice(0,500)}:{}}}if(a==="drag"){let s=D(t.from??t.source),c=D(t.to??t.target??t.destination);return!s||!c?null:{t:"drag",from:s.slice(0,500),to:c.slice(0,500)}}if(a==="js"){let s=D(t.v??t.code??t.script);return!s||s.length>8e3?null:{t:"js",v:s}}let i=t.id??t.target??t.name??t.selector??t.element;(i==null||i==="")&&a==="val"&&(i="1");let n=D(i).slice(0,500);if(!n)return null;if(a==="val"){let s=t.v!==void 0?t.v:t.value!==void 0?t.value:t.val!==void 0?t.val:t.text!==void 0?t.text:t.answer;return{t:"val",id:n,v:D(s).slice(0,ve)}}if(a==="sel"){let s=t.v!==void 0?t.v:t.value!==void 0?t.value:t.val!==void 0?t.val:t.values,d=(Array.isArray(s)?s:[s]).map(u=>D(u).slice(0,500)).filter(Boolean);return{t:"sel",id:n,v:d}}if(a==="chk"){let s=t.c===!1||t.c==="false"||t.c===0||t.c==="0"||t.c==="off"||t.c==="unchecked"||t.c==="desmarcar",c={t:"chk",id:n,c:!s};return t.v!==void 0&&(c.v=D(t.v).slice(0,ve)),c}let l={t:"clk",id:n};if(t.c!==void 0){let s=t.c===!1||t.c==="false"||t.c===0||t.c==="0"||t.c==="off"||t.c==="unchecked"||t.c==="desmarcar";l.c=!s}return t.v!==void 0&&(l.v=D(t.v).slice(0,ve)),Array.isArray(t.co)&&t.co.length===2&&t.co.every(s=>typeof s=="number"&&Number.isFinite(s))&&(l.co=[t.co[0],t.co[1]]),l}function ft(o){if(!o||typeof o!="object")return{pageType:"info",mode:"acao_sem_resposta",confidence:.5,rationale:"Resposta estruturada n\xE3o identificada; avan\xE7ando como informativo.",actions:[{t:"adv"}]};let e=o,t=e.pageType,a=e.mode;(typeof t!="string"||!Pt.has(t))&&(t="question"),(typeof a!="string"||!Rt.has(a))&&(a="escolha_unica");let i=Array.isArray(e.actions)?e.actions:[],n=[];for(let d=0;d<Math.min(i.length,Bt);d++){let u=Dt(i[d],d);u&&n.push(u)}let l=n.filter(d=>d.t!=="adv"),s=n.some(d=>d.t==="adv");t==="conclusion"?n.length=0:t==="info"||t==="start"?s||n.push({t:"adv"}):t==="question"&&!s&&n.push({t:"adv"});let c=typeof e.confidence=="number"&&Number.isFinite(e.confidence)?Math.min(1,Math.max(0,e.confidence)):.85;return{pageType:t,mode:a,confidence:c,rationale:D(e.rationale,"Plano validado e auto-recuperado."),actions:n,...D(e.memoryToStore)?{memoryToStore:D(e.memoryToStore)}:{},...e.needsMoreContext?{needsMoreContext:!!e.needsMoreContext}:{}}}var Y=class{keys=new Map;constructor(e=[]){this.init(e)}init(e){let t=new Map(this.keys);this.keys.clear(),Array.from(new Set(e.map(i=>i.trim().replace(/^["']|["']$/g,"")).filter(i=>i.length>5))).forEach((i,n)=>{let l=this.generateId(i),s=t.get(l)||t.get(i);this.keys.set(l,{id:l,key:i,label:s?.label||`Chave ${n+1}`,addedAt:s?.addedAt||Date.now(),lastUsedAt:s?.lastUsedAt,lastLatencyMs:s?.lastLatencyMs,cooldownUntil:s?.cooldownUntil,errorCount:s?.errorCount||0,lastError:s?.lastError})})}generateId(e){let t=0;for(let a=0;a<e.length;a++)t=(t<<5)-t+e.charCodeAt(a),t|=0;return`key_${Math.abs(t).toString(36).slice(0,8)}`}static maskKey(e){let t=e.trim().replace(/^["']|["']$/g,"");return t.length<=10?"\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022":`${t.slice(0,6)}...${t.slice(-4)}`}getAllKeys(){let e=Date.now();return Array.from(this.keys.values()).map(t=>{let a=Math.max(0,(t.cooldownUntil||0)-e);return{...t,isCooldown:a>0,remainingCooldownMs:a}})}getHealthyKeys(){let e=Date.now();return Array.from(this.keys.values()).filter(t=>(t.cooldownUntil||0)<=e&&(t.errorCount||0)<5)}getBestKey(){let e=this.getHealthyKeys();if(e.length>0)return e.sort((a,i)=>{let n=a.lastLatencyMs??99999,l=i.lastLatencyMs??99999;return n-l}),e[0].key;let t=Array.from(this.keys.values());return t.length>0?(t.sort((a,i)=>(a.cooldownUntil||0)-(i.cooldownUntil||0)),t[0].key):""}getDiverseKeys(e){let t=this.getHealthyKeys();if(t.length===0){let i=this.getBestKey();return i?[i]:[]}t.sort((i,n)=>{let l=i.lastLatencyMs??99999,s=n.lastLatencyMs??99999;return l-s});let a=[];for(let i=0;i<e;i++){let n=t[i%t.length];a.push(n.key)}return a}markQuotaHit(e,t=5e3){let a=this.findKeyObj(e);a&&(a.cooldownUntil=Date.now()+t,a.errorCount=(a.errorCount||0)+1,a.lastError=`Cota tempor\xE1ria atingida (HTTP 429). Cooldown de ${t/1e3}s ativado.`)}markOverloaded(e,t=5e3){let a=this.findKeyObj(e);a&&(a.cooldownUntil=Date.now()+t,a.errorCount=(a.errorCount||0)+1,a.lastError=`Servidores sobrecarregados (HTTP 503). Cooldown de ${t/1e3}s ativado.`)}markSuccess(e,t){let a=this.findKeyObj(e);a&&(a.lastLatencyMs=t,a.lastUsedAt=Date.now(),a.errorCount=0,a.lastError=void 0,a.cooldownUntil=void 0)}markInvalid(e,t){let a=this.findKeyObj(e);a&&(a.errorCount=99,a.lastError=t)}addKey(e,t){let a=e.trim().replace(/^["']|["']$/g,"");if(!a)return{ok:!1,message:"Chave n\xE3o pode ser vazia."};if(a.length<15)return{ok:!1,message:"Chave de API inv\xE1lida ou muito curta."};let i=this.generateId(a);if(this.keys.has(i))return{ok:!1,message:"Esta chave de API j\xE1 est\xE1 cadastrada."};let n={id:i,key:a,label:t?.trim()||`Chave ${this.keys.size+1}`,addedAt:Date.now(),errorCount:0};return this.keys.set(i,n),{ok:!0,message:"Chave adicionada com sucesso!",keyItem:n}}updateKey(e,t,a){let i=this.keys.get(e);if(!i)return{ok:!1,message:"Chave n\xE3o encontrada."};let n=t.trim().replace(/^["']|["']$/g,"");return!n||n.length<15?{ok:!1,message:"Chave de API inv\xE1lida."}:(i.key=n,a!==void 0&&(i.label=a.trim()),i.errorCount=0,i.cooldownUntil=void 0,i.lastError=void 0,{ok:!0,message:"Chave atualizada com sucesso!"})}removeKey(e){if(this.keys.size<=1)return{ok:!1,message:"Voc\xEA precisa manter pelo menos 1 chave de API cadastrada."};let t=this.findKeyObj(e);return t?(this.keys.delete(t.id),{ok:!0,message:"Chave removida com sucesso."}):{ok:!1,message:"Chave n\xE3o encontrada."}}exportRawKeys(){return Array.from(this.keys.values()).map(e=>e.key)}size(){return this.keys.size}findKeyObj(e){if(this.keys.has(e))return this.keys.get(e);for(let t of this.keys.values())if(t.key===e)return t}},S=new Y;var re=[{id:"gemini-2.5-flash",name:"Gemini 2.5 Flash (Ultra R\xE1pido - 0 Thinking)",description:"Modelo de ultrabaixa lat\xEAncia com zero thinking overhead para respostas imediatas.",stable:!0},{id:"gemini-2.0-flash",name:"Gemini 2.0 Flash (M\xE1xima Disponibilidade)",description:"Ultra-baixa lat\xEAncia comprovada com suporte multimodal nativo.",stable:!0},{id:"gemini-1.5-flash",name:"Gemini 1.5 Flash (Reserva Global)",description:"Modelo de alt\xEDssima estabilidade e ampla cota gratuita.",stable:!0},{id:"gemini-2.0-flash-lite-preview-02-05",name:"Gemini 2.0 Flash-Lite (Econ\xF4mico)",description:"Modelo leve para respostas ultrarr\xE1pidas.",stable:!0},{id:"gemini-1.5-flash-8b",name:"Gemini 1.5 Flash-8B (Super Leve)",description:"Modelo ultraleve e veloz com alta cota de requisi\xE7\xF5es.",stable:!0},{id:"gemini-2.5-pro",name:"Gemini 2.5 Pro (Racioc\xEDnio Profundo)",description:"Modelo avan\xE7ado para quest\xF5es de alta complexidade.",stable:!0},{id:"gemini-1.5-pro",name:"Gemini 1.5 Pro (Alta Precis\xE3o)",description:"Modelo confi\xE1vel para problemas dif\xEDceis.",stable:!0}],Te=null;function Ot(o){let e={temperature:0,maxOutputTokens:1200,response_mime_type:"application/json",response_schema:Vt};return/gemini-2\.5/i.test(o)&&(e.thinkingConfig={thinkingBudget:0}),e}var Vt={type:"OBJECT",properties:{pageType:{type:"STRING",enum:["question","info","start","conclusion"]},mode:{type:"STRING",enum:["texto_livre","escolha_unica","escolha_multipla","verdadeiro_falso","preenchimento","acao_sem_resposta","categorizacao","ordenacao","arrastar_soltar"]},confidence:{type:"NUMBER"},rationale:{type:"STRING"},memoryToStore:{type:"STRING"},actions:{type:"ARRAY",items:{type:"OBJECT",properties:{t:{type:"STRING",enum:["val","chk","sel","clk","adv","js","drag"]},id:{type:"STRING"},v:{},c:{type:"BOOLEAN"},co:{type:"ARRAY",items:{type:"NUMBER"}},from:{type:"STRING"},to:{type:"STRING"}},required:["t"]}}},required:["pageType","mode","confidence","rationale","actions"]};function _t(o){let e=o.trim().replace(/^google\//,"").replace(/^models\//,"");return!e||!R(e)?"gemini-2.5-flash":e}function vt(o,e){let t="";try{let a=JSON.parse(o);t=a.error?.message||a.message||""}catch{t=o.slice(0,160)}return/API_KEY_INVALID|API key not valid|key.*invalid|unregistered/i.test(t)?"Chave de API do Gemini inv\xE1lida ou n\xE3o autorizada no Google AI Studio.":/RESOURCE_EXHAUSTED|Quota exceeded/i.test(t)||e===429?"Limite tempor\xE1rio de cota do Gemini (HTTP 429) atingido. Aguardando recupera\xE7\xE3o...":e===404?`HTTP 404: ${t||"Modelo ou endpoint n\xE3o encontrado no Google AI Studio"}`:e===503||/overloaded/i.test(t)?`Servidores Google sobrecarregados (HTTP 503): ${t||"Aguardando"}`:t?`Erro Gemini (HTTP ${e}): ${t}`:`Falha na requisi\xE7\xE3o ao Gemini (HTTP ${e}).`}function Kt(o){let e=o.trim(),t=e.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);if(t)try{return JSON.parse(t[1].trim())}catch{}try{return JSON.parse(e)}catch{}let a=e.match(/\{[\s\S]*\}/);if(a)try{return JSON.parse(a[0].trim())}catch{}throw new Error("Falha ao decodificar JSON da IA.")}var _e=(()=>{try{let o=typeof localStorage<"u"?localStorage.getItem("easyquiz_cached_models"):null;if(!o)return null;let e=JSON.parse(o);if(Array.isArray(e)){let t=e.filter(a=>a&&typeof a.id=="string"&&R(a.id));return t.length>0?t:null}return null}catch{return null}})(),te=new Set;async function Le(o){let e=o.trim().replace(/^["']|["']$/g,"");if(!e)return re;let t=[`https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(e)}`,`https://generativelanguage.googleapis.com/v1/models?key=${encodeURIComponent(e)}`];for(let a of t)try{let i=await fetch(a,{headers:{"Content-Type":"application/json","x-goog-api-key":e}});if(!i.ok){let l=await i.text(),s=vt(l,i.status);if(s.includes("inv\xE1lida")||s.includes("n\xE3o autorizada"))throw new Error(s);continue}let n=await i.json();if(Array.isArray(n.models)&&n.models.length>0){let l=n.models.filter(s=>{let c=s.supportedGenerationMethods||[],d=(s.name||"").replace(/^models\//,""),u=c.includes("generateContent");return R(d)&&u}).map(s=>{let c=s.supportedGenerationMethods||[],d=s.name.replace(/^models\//,""),u=s.displayName||d;return{id:d,name:u.includes(d)?u:`${u} (${d})`,description:s.description||"",stable:!/-preview|-experimental|-latest/i.test(d),supportsVision:!/embedding|tts|transcribe|live|image|sound|voice/i.test(d),supportsStructuredOutput:c.includes("generateContent"),supportedGenerationMethods:c,discoveredAt:Date.now()}});if(l.length>0){l.sort((s,c)=>{let d=u=>u==="gemini-2.5-flash"?130:u==="gemini-2.0-flash"?125:u==="gemini-1.5-flash"?110:u==="gemini-2.0-flash-lite-preview-02-05"?105:u==="gemini-1.5-flash-8b"?100:u.includes("flash")?80:u==="gemini-2.5-pro"?60:u==="gemini-1.5-pro"?50:10;return d(c.id)-d(s.id)}),_e=l;try{typeof localStorage<"u"&&localStorage.setItem("easyquiz_cached_models",JSON.stringify(l))}catch{}return l}}}catch(i){if(i.message?.includes("Chave de API"))throw i}return re}async function Me(o){let e=o.trim().replace(/^["']|["']$/g,"");if(!e)return{ok:!1,message:"Insira sua chave de API."};try{let a=await Le(e);if(a.length>0&&a!==re){let i=a[0];return{ok:!0,message:`Chave v\xE1lida! ${a.length} modelos Gemini dispon\xEDveis em sua conta. Recomendado: ${i.name}`,models:a}}}catch(a){return{ok:!1,message:a instanceof Error?a.message:String(a)}}let t=["gemini-2.5-flash","gemini-2.0-flash","gemini-1.5-flash"];for(let a of t)for(let i of["v1beta","v1"]){let n=`https://generativelanguage.googleapis.com/${i}/models/${a}:generateContent?key=${encodeURIComponent(e)}`;try{if((await fetch(n,{method:"POST",headers:{"Content-Type":"application/json","x-goog-api-key":e},body:JSON.stringify({contents:[{role:"user",parts:[{text:"PING"}]}],generationConfig:{maxOutputTokens:5}})})).ok)return{ok:!0,message:`Chave validada com sucesso no ${a} (${i})!`,models:re}}catch{}}return{ok:!1,message:"Chave de API inv\xE1lida, sem cota ou sem permiss\xE3o para modelos Gemini."}}async function jt(o,e,t,a,i){let n=["v1beta","v1"],l=new Error(`Falha ao consultar modelo ${o}`),c={...Ot(o)};for(let d of n){if(i.aborted)throw new Error("Opera\xE7\xE3o cancelada pelo usu\xE1rio.");let u=`https://generativelanguage.googleapis.com/${d}/models/${o}:generateContent?key=${encodeURIComponent(e)}`,h=Date.now();try{let r=await fetch(u,{method:"POST",headers:{"Content-Type":"application/json","x-goog-api-key":e},body:JSON.stringify({...t,generationConfig:c}),signal:i,keepalive:a});if(!r.ok){let v=await r.text();if(r.status===400&&c.thinkingConfig&&/thinking/i.test(v)){delete c.thinkingConfig;let m=await fetch(u,{method:"POST",headers:{"Content-Type":"application/json","x-goog-api-key":e},body:JSON.stringify({...t,generationConfig:c}),signal:i,keepalive:a});if(m.ok){let x=await m.json(),w=x.candidates?.[0];if(w?.content?.parts?.[0]?.text)return S.markSuccess(e,Date.now()-h),{rawText:w.content.parts[0].text,data:x,usedModel:o,usedKey:e}}}let f=vt(v,r.status);if(r.status===404&&d==="v1beta")continue;throw r.status===429?S.markQuotaHit(e,5e3):r.status===503||/no capacity|overloaded|unavailable/i.test(v)?(S.markOverloaded(e,5e3),te.add(o)):r.status===403||/API_KEY_INVALID/i.test(v)?(S.markInvalid(e,f),te.add(o)):r.status===404&&te.add(o),new Error(`[${o}] ${f}`)}let p=await r.json(),g=p.candidates?.[0];if(!g||!g.content?.parts?.[0]?.text)throw new Error(`[${o}] A IA n\xE3o retornou uma resposta estruturada v\xE1lida.`);return S.markSuccess(e,Date.now()-h),{rawText:g.content.parts[0].text,data:p,usedModel:o,usedKey:e}}catch(r){if(i.aborted)throw r;l=r;let p=l.message||"";if((p.includes("404")||p.includes("503")||p.includes("No capacity")||p.includes("overloaded"))&&te.add(o),!p.includes("404"))break}}throw l}async function Ke(o,e,t,a,i){if(i?.aborted)throw new Error("Opera\xE7\xE3o cancelada pelo usu\xE1rio.");let n=Array.isArray(t.apiKeys)&&t.apiKeys.length>0?t.apiKeys:t.apiKey?[t.apiKey]:[];S.init(n);let l=S.getBestKey()||t.apiKey.trim().replace(/^["']|["']$/g,"");if(!l)throw new Error("Nenhuma chave de API do Gemini configurada ou dispon\xEDvel.");let s=_t(t.model);if(!_e&&l&&Le(l).catch(()=>{}),i?.aborted)throw new Error("Opera\xE7\xE3o cancelada pelo usu\xE1rio.");let c=Date.now(),d=fe(o,e,t),u=[{text:d}];for(let y=0;y<e.length;y++){let E=e[y],L=E.associatedLabel||(E.alt?`Imagem: ${E.alt}`:`Imagem ${y+1}`);u.push({text:`[ANEXO VISUAL ${y+1} - V\xCDNCULO: ${L}]:`}),u.push({inline_data:{mime_type:E.mediaType,data:E.base64}})}let h={system_instruction:{parts:[{text:gt}]},contents:[{role:"user",parts:u}]},r=!0,p=["gemini-2.5-flash","gemini-2.0-flash","gemini-1.5-flash","gemini-2.0-flash-lite-preview-02-05","gemini-1.5-flash-8b","gemini-2.5-pro","gemini-1.5-pro"],g=[...Te&&R(Te)?[Te]:[],...R(s)?[s]:[],...p,..._e?.filter(y=>R(y.id)).map(y=>y.id)||[],"gemini-2.5-pro","gemini-1.5-pro"],v=Array.from(new Set(g)).filter(y=>R(y)),f=v.filter(y=>!te.has(y));f.length===0&&(te.clear(),f=v),f=f.slice(0,6);let m=3,x=[];for(let y=0;y<f.length;y+=m)x.push(f.slice(y,y+m));let w=new Error("Nenhum modelo dispon\xEDvel para an\xE1lise.");for(let y=0;y<x.length;y++){if(i?.aborted)throw new Error("Opera\xE7\xE3o cancelada pelo usu\xE1rio.");let E=x[y].filter(P=>!te.has(P));if(E.length===0)continue;let L=S.size(),M=L>1?` \u2022 ${L} chaves ativas`:"";y===0?a?.(`\u26A1 Velocidade M\xE1xima: consultando APIs em paralelo (${E.join(", ")})${M}...`,"info"):a?.(`\u26A1 Alternando onda de fallback em paralelo (${E.join(", ")})${M}...`,"warning");let A=E.map(()=>new AbortController),K=S.getDiverseKeys(E.length),F=P=>{A.forEach((I,j)=>{if(j!==P)try{I.abort(new Error("Cancelado: outro modelo respondeu mais r\xE1pido."))}catch{I.abort()}})},ne=()=>{A.forEach(P=>{try{P.abort(new Error("Opera\xE7\xE3o cancelada pelo usu\xE1rio."))}catch{P.abort()}})};if(i){if(i.aborted)throw new Error("Opera\xE7\xE3o cancelada pelo usu\xE1rio.");i.addEventListener("abort",ne,{once:!0})}try{let P=E.map(async(ie,X)=>{let W=A[X],Ht=K[X]||l,st=E.length>1?8e3:12e3,rt=setTimeout(()=>{try{W.abort(new Error(`Timeout de ${st/1e3}s excedido na API Gemini (${ie}).`))}catch{W.abort()}},st);try{let V=await jt(ie,Ht,h,r,W.signal);clearTimeout(rt);let Q=ft(Kt(V.rawText));return Q.usedModel=V.usedModel,Q.durationMs=Date.now()-c,Q.promptSent=d,Q.tokensUsed=V.data.usageMetadata?.totalTokenCount,Q.promptTokens=V.data.usageMetadata?.promptTokenCount,Q.candidatesTokens=V.data.usageMetadata?.candidatesTokenCount,Q.rawResponse=V.rawText,F(X),{plan:Q,rawUsage:V.data.usageMetadata,usedModel:V.usedModel,usedKey:V.usedKey}}catch(V){throw clearTimeout(rt),V}}),I=await Promise.any(P);i?.removeEventListener("abort",ne),Te=I.usedModel;try{t.model=I.usedModel,I.usedKey&&(t.apiKey=I.usedKey)}catch{}let j=Y.maskKey(I.usedKey);return a?.(`\u26A1 Resposta mais r\xE1pida recebida em ${I.plan.durationMs}ms via '${I.usedModel}' (${j})!`,"info"),I}catch(P){if(i?.removeEventListener("abort",ne),i?.aborted)throw new Error("Opera\xE7\xE3o cancelada pelo usu\xE1rio.");let I="";Array.isArray(P?.errors)&&P.errors.length>0?I=P.errors.map(j=>j?.message||String(j)).filter(Boolean).join(" | "):P instanceof Error?I=P.message:I=String(P),w=new Error(I||"Nenhum modelo respondeu com sucesso."),console.warn(`[EasyQuiz Wave Race] Onda ${y+1} (${E.join(", ")}) falhou: ${I}`)}}throw w}var Gt=[/\bfetch\b/i,/\bXMLHttpRequest\b/i,/\bWebSocket\b/i,/\b(?:localStorage|sessionStorage|indexedDB)\b/i,/\b(?:eval|Function|AsyncFunction|GeneratorFunction)\b/i,/\bimport(?:Scripts)?\b/i,/\bnavigator\s*\.\s*credentials\b/i,/\b(?:cookie|location\s*=|history\s*\.)/i,/\bwindow\s*\[\s*['"](?:fetch|eval|Function|localStorage|sessionStorage)/i];function be(o){let e=o?.engine||"smart",t=new Set(["dom","framework","keyboard","drag"]);return o?.autoAdvance&&t.add("navigation"),e==="javascript"&&t.add("javascript"),{engine:e,capabilities:t,maxAttemptsPerAction:e==="command"?1:2,maxActionMs:e==="command"?1500:3e3,allowJavaScript:e==="javascript",allowNavigation:!!o?.autoAdvance}}function je(o,e){if(o.t==="js"&&!e.allowJavaScript)throw new Error("A\xE7\xE3o JavaScript bloqueada pela engine atual. Use o motor JavaScript explicitamente.");if(o.t==="adv"&&!e.allowNavigation)throw new Error("Avan\xE7o autom\xE1tico bloqueado pela pol\xEDtica atual.")}function bt(o){if(!o.trim())throw new Error("JavaScript recusado: c\xF3digo vazio.");if(o.length>8e3)throw new Error("JavaScript recusado: c\xF3digo acima do limite operacional.");if(Gt.find(t=>t.test(o)))throw new Error("JavaScript recusado: acesso externo, persist\xEAncia ou avalia\xE7\xE3o din\xE2mica n\xE3o permitidos.");if(!/^\s*(?:\/\/[^\n]*\n|\/\*[\s\S]*?\*\/|[\s\S])*\$eq\./.test(o)&&!o.includes("$eq."))throw new Error("JavaScript recusado: use somente a API declarativa $eq.")}var le=['input:not([type="hidden"])',"textarea","select","button","a","label",'[role="button"]','[role="link"]','[role="radio"]','[role="checkbox"]','[role="option"]','[role="treeitem"]','[role="menuitemcheckbox"]','[role="menuitemradio"]','[contenteditable="true"]','[draggable="true"]',"[aria-grabbed]","[aria-dropeffect]","[data-widget-type]",".perseus-drag-item",".sortable-item",'[data-testid*="drag" i]','[data-testid*="card" i]','[data-testid*="option" i]','[data-testid*="choice" i]','[data-testid*="category" i]',"[data-choice]","[data-option]","[data-answer]","[data-value]",".quiz-option",".option-card",".choice-card",'[class*="option-card" i]','[class*="choice-card" i]','[class*="option-item" i]','[class*="choice-item" i]','[class*="answer-item" i]','[class*="alternative" i]','li[class*="choice" i]','li[class*="option" i]','li[class*="answer" i]','[data-role="dropzone"]',"[data-category]"].join(","),Ae=/(verificar|checar|check|conferir|validar|próxim[oa]|next|continuar|continue|avançar|prosseguir|enviar|submit|concluir|finalizar|terminar|começar|iniciar|start|vamos lá|próxima tarefa|next task|próxima pergunta|next question|marcar como concluíd[oa]|mostrar resumo|entendi|compreendi|ok|leitura concluída|seguir|ir para o exercício|fazer o teste|próximo artigo|ir para a aula)/i,Ft=0;function Ge(o){try{let e=o.closest('[hidden], [style*="display: none"], [style*="display:none"], [aria-hidden="true"]');if(e&&!ce(e))return!1}catch{}try{let e=window.getComputedStyle?window.getComputedStyle(o):o.style;if(e&&(e.display==="none"||e.visibility==="hidden"))return!1}catch{}try{if(typeof o.getBoundingClientRect=="function"){let e=o.getBoundingClientRect();if(e.width>0||e.height>0)return!0}}catch{}return(o.textContent||"").trim().length>0}function z(o){try{if(typeof CSS<"u"&&typeof CSS.escape=="function")return CSS.escape(o)}catch{}return String(o).replace(/["\\]/g,"\\$&")}function T(o){let e=o;if(!e||typeof e.isConnected=="boolean"&&!e.isConnected||ce(e))return!1;let t=e.tagName?.toLowerCase();if(["input","select","textarea","button"].includes(t)){let a=e.type?.toLowerCase();if(a==="checkbox"||a==="radio"){if(e.id)try{let n=e.ownerDocument?.querySelector(`label[for="${z(e.id)}"]`);if(n&&Ge(n))return!0}catch{}let i=e.closest('label, .option-card, .quiz-option, .choice, .answer, [role="radio"], [role="checkbox"], [class*="option" i], [class*="choice" i], [class*="item" i], li, tr');if(i&&i!==e&&Ge(i))return!0}try{if(!e.closest('[hidden], [style*="display: none"], [style*="display:none"], [aria-hidden="true"]')){let n=window.getComputedStyle?window.getComputedStyle(e):e.style;if(!n||n.display!=="none"&&n.visibility!=="hidden"){if(typeof e.getBoundingClientRect=="function"){let l=e.getBoundingClientRect();if(l.width>0||l.height>0)return!0}return!0}}}catch{}}return Ge(e)}function Qt(o){if(o==null)return"";if(typeof o=="string")return o;if(typeof o=="number"||typeof o=="boolean")return String(o);if(o instanceof Node)return o.textContent||"";try{if(typeof o?.toString=="function"){let e=o.toString();if(typeof e=="string")return e}}catch{}return""}function k(o,e=500){return Qt(o).replace(/\s+/g," ").trim().slice(0,e)}function Ut(o){let e=o.dataset.easyquizId;if(e)return e;let t=`eq-${Date.now().toString(36)}-${(Ft+=1).toString(36)}`;return o.dataset.easyquizId=t,t}function ce(o){return o?!!(o.closest('#easyquiz-shadow-root, .eq-sidebar, .eq-launcher, [data-easyquiz-ignore="true"], .btn-inject-eq, #btn-inject-script')||o.getAttribute?.("data-easyquiz-ignore")==="true"):!1}var ye=/(leaderboard|scoreboard|placar|ranking|trophy|pause|pausar|mute|mutar|audio|sound|som|música|music|configuraç|settings|theme|ajuda|help|report|denunciar|feedback|power-?up|streak|coins|fullscreen|full-screen|(?:audio|sound|som|media)[-_ ]*volume|volume[-_ ]*(?:slider|control|level|btn|button|icon|mute)|vol-slider)/i;function $(o){if(!o||typeof o.getAttribute!="function"||typeof Element<"u"&&!(o instanceof Element))return!1;if(ce(o))return!0;let e=o.tagName?.toLowerCase();if(["select","textarea"].includes(e)||e==="input"&&!["button","submit","reset"].includes((o.type||"").toLowerCase()))return!1;let a=o.closest?.('button, a, [role="button"], [class*="leaderboard" i], [data-testid*="leaderboard" i], [class*="scoreboard" i], [class*="trophy" i]')||o,i=String(a.getAttribute?.("data-testid")||a.getAttribute?.("data-test-id")||a.getAttribute?.("id")||""),n=String(a.getAttribute?.("aria-label")||""),l=String(a.getAttribute?.("title")||""),s=typeof a.className=="string"?a.className:typeof a.className?.baseVal=="string"?a.className.baseVal:"",c=k(a.textContent,60);return!!(ye.test(i)||ye.test(n)||ye.test(l)||ye.test(s)||c.length>0&&c.length<=25&&ye.test(c))}function G(o){if(!o||typeof o.getAttribute!="function"||typeof Element<"u"&&!(o instanceof Element)||ce(o)||$(o)||o.closest?.('.option-card, .choice-card, .quiz-option, [class*="option-card" i], [class*="choice-card" i], [class*="option-item" i], [class*="choice-item" i], [class*="answer-item" i], [data-testid*="option" i], [data-testid*="choice" i], [data-choice], [data-option], [data-answer], [role="radio"], [role="checkbox"], [role="option"]')||o.closest?.("header, nav, aside"))return!1;let e=typeof HTMLInputElement<"u"&&o instanceof HTMLInputElement||typeof HTMLButtonElement<"u"&&o instanceof HTMLButtonElement?o.value:"",t=k(o.getAttribute?.("aria-label")||o.textContent||o.getAttribute?.("value")||e),a=o.type,i=t.replace(/[\d\(\)\[\]→\>\•\-\/\\]+/g," ").trim(),n=String(o.getAttribute?.("data-testid")||o.getAttribute?.("data-test-id")||o.getAttribute?.("id")||o.getAttribute?.("href")||"").toLowerCase();return Ae.test(i)||Ae.test(t)||a==="submit"||n.includes("next")||n.includes("check")||n.includes("continue")||n.includes("proximo")||n.includes("forward")||!1}function Fe(o){let e=o.closest("tr");if(e){let c=e.querySelector("th, td:first-child"),d=c&&c!==o.closest("td")?k(c.textContent,100):"",u=k(o.closest("label, td")?.textContent||"",50);if(d&&u)return`${d}: ${u}`}let t=o.closest('.dropdown-row, [class*="dropdown-row" i], [class*="select-row" i]');if(t){let c=t.querySelector('.dropdown-label, [class*="label" i]'),d=c&&c!==o?k(c.textContent,150):"";if(d)return d}let a=o.getAttribute("aria-label");if(a)return k(a);let i=o.getAttribute("aria-labelledby");if(i){let c=i.split(/\s+/).map(d=>document.getElementById(d)?.textContent).filter(Boolean).join(" ");if(c.trim())return k(c)}if("labels"in o&&o.labels){let c=Array.from(o.labels??[]).map(d=>d.textContent).join(" ");if(c.trim())return k(c)}let n=o.closest('.docssharedWizToggleLabeledContainer, [role="listitem"], .answer, label, .quiz-option, .form-check, .option-card');if(n&&n!==o){let c=k(n.textContent);if(c)return c}let l=o instanceof HTMLInputElement||o instanceof HTMLButtonElement?o.value:"",s=o.getAttribute("placeholder")||o.getAttribute("title")||o.textContent||l||"";return k(s)}function Qe(o,e){let a=typeof HTMLSelectElement<"u"&&o instanceof HTMLSelectElement||o.tagName.toLowerCase()==="select"?o:null,i=o;o.dataset.easyquizRole=e;let n=o.tagName.toLowerCase(),l=["input","textarea","select","button"].includes(n)?n:"other",s=o.getAttribute("role")||"",c=(o.getAttribute("data-testid")||o.getAttribute("data-test-id")||"").toLowerCase(),d=(o.className&&typeof o.className=="string"?o.className:"").toLowerCase(),u=o.getAttribute("draggable")==="true"||o.classList.contains("perseus-drag-item")||o.classList.contains("sortable-item")||!!o.getAttribute("aria-grabbed")||/drag|card|option|item/i.test(c)||/drag|card-item|sortable/i.test(d),h=o.getAttribute("data-role")==="dropzone"||o.classList.contains("category-container")||o.hasAttribute("data-category")||!!o.getAttribute("aria-dropeffect")||/drop|category|bucket/i.test(c)||/dropzone|category-box|bucket|target-zone/i.test(d),p=k((u?"draggable":h?"dropzone":"")||i.type||s||l,40),g="";if(i.type==="checkbox"||i.type==="radio"||s==="radio"||s==="checkbox")g=i.checked||o.getAttribute("aria-checked")==="true"?"checked":"unchecked";else if(l==="button"||n==="a"||e==="navigation"||G(o))g="";else{let y=typeof o.value=="string"||typeof o.value=="number"?o.value:"";g=k(y||o.getAttribute("data-category")||"",2e3)}let v=[];if(a&&a.options)for(let y of Array.from(a.options).slice(0,80))v.push({value:k(y.value),label:k(y.textContent)});else if(s==="combobox"||s==="listbox"||d.includes("select")||d.includes("dropdown")){let y=o.getAttribute("aria-controls")||o.getAttribute("aria-owns"),E=y?document.getElementById(y):o;if(E){let L=E.querySelectorAll('[role="option"], li, .dropdown-item, .option');for(let M of Array.from(L).slice(0,80)){let A=k(M.textContent);A&&v.push({value:M.getAttribute("data-value")||M.getAttribute("value")||A,label:A})}}}let f=!!(i.required||o.getAttribute("aria-required")==="true"),m=!!(i.disabled||o.getAttribute("aria-disabled")==="true"),x=Ut(o);return{id:o.id||x,tag:l,type:p,label:Fe(o),name:k(i.name||o.getAttribute("name")||"",180),value:g,options:v,required:f,disabled:m,role:e}}var yt=['[data-test-id*="exercise" i]','[data-testid*="exercise" i]',".perseus-renderer",".framework-perseus",".Qr7Oae",".que",".question-holder",".quiz-question",".question_holder",".display_question",'[data-functional-selector*="question"]',".question-container","[data-question-id]",'[data-testid*="question" i]','[class*="question-container" i]','[class*="question" i]','[class*="pergunta" i]',"article","form","section","main"].join(",");function xt(o){if(!T(o))return-1/0;let e=o.getBoundingClientRect(),t=Array.from(o.querySelectorAll(le)).filter(T),a=k(o.innerText||o.textContent||"",4e3).length;if(a<10||!t.length&&a<60)return-1/0;let i=Math.max(1,window.innerWidth*window.innerHeight),n=Math.max(1,e.width*e.height),l=Math.min(1,n/i),s=e.top+e.height/2,c=Math.abs(s-window.innerHeight/2)/Math.max(1,window.innerHeight),d=a>40?35:0,u=e.top>=0&&e.bottom<=window.innerHeight?25:0;return t.length*15+Math.min(60,a/20)+d+u-l*20-c*10}function Se(o){let e=o;if(e.matches?.('article, [data-test-id*="exercise" i], [data-testid*="exercise" i], .perseus-renderer, .framework-perseus, [class*="question-container" i], .que')&&e.tagName.toLowerCase()!=="main"&&e.tagName.toLowerCase()!=="body")return e;for(;e.parentElement&&e.parentElement!==document.body&&e.parentElement!==document.documentElement;){let t=e.parentElement,a=t.tagName.toLowerCase();if(["header","footer","nav","aside"].includes(a))break;if(t.matches?.('article, [data-test-id*="exercise" i], [data-testid*="exercise" i], .perseus-renderer, .framework-perseus, [class*="question-container" i], .que')&&a!=="main"&&a!=="body"){e=t;break}let i=k(e.innerText||e.textContent||"",1e4),n=k(t.innerText||t.textContent||"",1e4),l=e.querySelectorAll(le).length,s=t.querySelectorAll(le).length;if(i.length<150&&n.length>i.length&&s<=l+4&&a!=="main"&&a!=="body"){e=t;continue}break}return e}function wt(o){let e=o,t=e.closest('main, [role="main"], article, form, [data-test-id*="exercise" i], [data-testid*="exercise" i], .framework-perseus, section');if(t&&t!==document.body&&T(t))return t;let a=0;for(;e.parentElement&&e.parentElement!==document.body&&a<3;)e=e.parentElement,a++;return e||document.body}function N(){let o=document.activeElement;if(o&&o!==document.body){let n=o.closest(yt);if(n&&xt(n)>0)return Se(n)}let t=Array.from(document.querySelectorAll(yt)).map(n=>({element:n,score:xt(n)})).filter(n=>Number.isFinite(n.score)).sort((n,l)=>l.score-n.score),a=t.find(n=>{let l=n.element.tagName.toLowerCase();return l!=="main"&&l!=="body"&&n.score>0});if(a)return Se(a.element);if(t.length>0&&t[0].score>0)return Se(t[0].element);let i=document.querySelector('form, main, [role="main"]');return i&&T(i)?i:document.body}function qt(o){let e=o.cloneNode(!0);e.querySelectorAll("script, style, iframe, object, embed, svg, canvas, noscript, audio, video").forEach(a=>a.remove());let t=["type","name","value","role","aria-label","aria-labelledby","aria-checked","aria-required","required","disabled","data-easyquiz-id","draggable","class","id","data-widget-type","data-role","data-category","data-testid"];return e.querySelectorAll("*").forEach(a=>{for(let i of Array.from(a.attributes))t.includes(i.name)||a.removeAttribute(i.name)}),e.outerHTML.replace(/\s+/g," ").slice(0,2e4)}function ke(o){let e=Array.from(o.querySelectorAll(le)),t=new Set,a=[];for(let i of e){if(!T(i)||G(i)||$(i))continue;let n=i.tagName.toLowerCase();["input","textarea","select"].includes(n)&&(t.add(i),a.push(i))}for(let i of e){if(!T(i)||G(i)||$(i))continue;let n=i.tagName.toLowerCase();if(["input","textarea","select"].includes(n))continue;let l=i.querySelector("input, textarea, select");if(!(l&&t.has(l))){if(i.hasAttribute("for")){let s=i.getAttribute("for"),c=s?i.ownerDocument.getElementById(s):null;if(c&&t.has(c))continue}if(n==="a"){let s=i.getAttribute("role");if(!(s==="button"||s==="radio"||s==="checkbox"||s==="option"||i.closest('[class*="choice" i], [class*="option" i], [class*="answer" i], [data-testid*="option" i]')))continue}a.push(i)}}return a.slice(0,100).map(i=>Qe(i,"answer"))}function Ue(o){let e=[o,o.parentElement,o.parentElement?.parentElement,document.body].filter(Boolean),t=new Set,a=[];for(let i of e)for(let n of Array.from(i.querySelectorAll(le)))if(!(t.has(n)||!T(n)||!G(n)||$(n))&&(t.add(n),a.push(Qe(n,"navigation")),a.length>=10))return a;return a}function xe(o=!1){let e=N();e=Se(e),o&&(e=wt(e));let t=ke(e),a=Ue(e);if(t.length===0){let s=ke(document.body);s.length>0&&(e=wt(e),t=ke(e),t.length===0&&(t=s,e=document.querySelector('main, article, form, [role="main"]')||document.body))}a.length===0&&(a=Ue(document.body));let i=e.innerText&&e.innerText.trim().length>0?e.innerText:e.textContent||"",n=k(i,16e3),l=[...t,...a].slice(0,120);return!n||l.length===0&&n.length<30?k(document.body.innerText||document.body.textContent||"",16e3).length>=30?de():null:{sourceUrl:window.location.href.slice(0,2e3),pageTitle:document.title.slice(0,500)||"P\xE1gina de Quest\xE3o",questionText:n,htmlSnippet:qt(e),controls:l,scope:e}}function de(){let o=document.body.innerText||document.body.textContent||document.documentElement.textContent||"",e=k(o,16e3),t=ke(document.body),a=Ue(document.body),i=[...t,...a].slice(0,120),n=document.querySelector('main, article, form, [role="main"], [data-test-id*="content" i], [class*="content" i]')||document.body;return{sourceUrl:window.location.href.slice(0,2e3),pageTitle:document.title.slice(0,500)||"P\xE1gina de Quest\xE3o",questionText:e,htmlSnippet:qt(n).slice(0,15e3),controls:i,scope:n}}function Et(o){let e=o.controls.map(t=>`${t.role}:${t.id}:${t.type}:${t.value}:${t.disabled}`).join("|");return[window.location.href,o.pageTitle,o.questionText.slice(0,500),e].join("::")}function H(o){return o?!!(o.closest('#easyquiz-shadow-root, .eq-sidebar, .eq-launcher, [data-easyquiz-ignore="true"], .btn-inject-eq, #btn-inject-script')||o.getAttribute?.("data-easyquiz-ignore")==="true"):!1}function b(o){return o==null?"":(typeof o=="string"?o:String(o)).replace(/^(\([0-9a-zA-Z]{1,2}\)|[0-9]{1,3}|[a-zA-Z])[\.\)\-\:]\s+/,"").replace(/[\.\u2026]{2,}/g," ").replace(/['"“”«»]/g,"").replace(/\s+/g," ").trim()}function B(o){if(!o||o instanceof HTMLInputElement||o instanceof HTMLSelectElement||o instanceof HTMLTextAreaElement||o.getAttribute("draggable")==="true"||o.classList.contains("dnd-card")||o.hasAttribute("data-category")||o.hasAttribute("data-dropzone"))return o;if(o.hasAttribute("for")){let a=o.getAttribute("for");if(a){let i=o.ownerDocument.getElementById(a);if(i)return i}}let e=o.closest('label, .option-card, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, tr, li, .dnd-card, [class*="option-card" i], [class*="choice-card" i], .dropdown-row, [class*="dropdown" i], [class*="select-row" i]');if(e&&!["article","section","main","form","body"].includes(e.tagName.toLowerCase())){let a=e.getAttribute("for"),n=(a?e.ownerDocument.getElementById(a):null)||e.querySelector('input:not([type="hidden"]), select, textarea');return n||e}let t=o.closest('button, a, [role="button"], [draggable="true"]');if(t)return t;if(["body","html","main","section","article","form"].includes(o.tagName.toLowerCase())){let a=o.querySelector('button, [role="button"], a, input:not([type="hidden"]), select, textarea, [role="radio"], [role="checkbox"], .option-card, label');if(a)return B(a)}return o}function Ct(o){let e=o;if(!e||!document.contains(e))try{e=N()}catch{}e=e||document.body;let t=Array.from(e.querySelectorAll("tr")).filter(n=>T(n)&&n.querySelector('input[type="radio"], input[type="checkbox"]'));if(t.length>1)return t;let a=Array.from(e.querySelectorAll('input[type="checkbox"], input[type="radio"], [role="checkbox"], [role="radio"]')).filter(n=>T(n)&&!H(n));return a.length>0?a:Array.from(e.querySelectorAll('.option-card, [role="option"], [class*="choice-card" i], [class*="option-card" i], li[class*="choice" i], li[class*="option" i]')).filter(n=>T(n)&&!H(n)).filter(n=>!n.parentElement?.closest('.option-card, [role="option"], [class*="choice-card" i], [class*="option-card" i]'))}function C(o,e,t=!1){if(o==null)return null;let i=(typeof o=="string"?o:String(o)).trim().replace(/^["'“”«»]+|["'“”«»]+$/g,"");if(!i)return null;let n=z(i),l=document.querySelector(`[data-easyquiz-id="${n}"]`);if(l&&!H(l)&&T(l))return B(l);try{let r=document.getElementById(i);if(r&&!H(r)&&T(r))return r.hasAttribute("data-category")||r.hasAttribute("data-dropzone")||r.classList.contains("dnd-zone")?r:B(r)}catch{}let s=i.match(/^(?:item|opção|opcao|afirmação|afirmacao|alternativa|linha|afirmativa|questão|questao|campo|blank|lacuna|input|resposta)?\s*#?_?([0-9]+)$/i);if(s){let r=parseInt(s[1],10);if(t){let g=document.body;try{g=N()||document.body}catch{}let v=Array.from(g.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, select, [contenteditable="true"]')).filter(f=>T(f)&&!H(f));if(r>=1&&r-1<v.length)return v[r-1];if(r===0&&v.length>0)return v[0]}let p=r-1;if(p>=0){let g=Ct();if(p<g.length){let m=g[p];if(m.tagName.toLowerCase()==="tr"){if(e){let w=m.querySelector(`input[value="${z(e)}" i], [data-value="${z(e)}" i]`);if(w)return w}let x=m.querySelector("input");if(x)return x}return B(m)}let v=document.body;try{v=N()||document.body}catch{}let f=Array.from(v.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, select, [contenteditable="true"]')).filter(m=>T(m)&&!H(m));if(p<f.length)return f[p]}}let c=i.match(/^(?:item|opção|opcao|afirmação|afirmacao|alternativa|linha|afirmativa|questão|questao)?\s*#?([a-eA-E])$/i);if(c){let r=c[1].toUpperCase().charCodeAt(0)-65;if(r>=0){let p=Ct();if(r<p.length){let g=p[r];if(g.tagName.toLowerCase()==="tr"){if(e){let f=g.querySelector(`input[value="${z(e)}" i], [data-value="${z(e)}" i]`);if(f)return f}let v=g.querySelector("input");if(v)return v}return B(g)}}}if(/^[a-zA-Z0-9_-]{1,10}$/.test(i)){let p=Array.from(document.querySelectorAll(`[data-category="${n}" i], [data-dropzone="${n}" i], [data-role="dropzone"][data-category="${n}" i]`)).find(m=>T(m)&&!H(m));if(p)return p;let v=Array.from(document.querySelectorAll(`input[value="${n}" i], [data-value="${n}" i], input[id="${n}" i], input[placeholder="${n}" i], textarea[placeholder="${n}" i], [title="${n}" i]`)).find(m=>T(m)&&!H(m));if(v)return B(v);let f=Array.from(document.querySelectorAll('.option-badge, [class*="badge" i], [class*="letter" i], .option-card span, label span')).find(m=>{if(!T(m)||H(m))return!1;let x=b(m.textContent).toLowerCase();return x===i.toLowerCase()||x===i.toLowerCase()+")"});if(f)return B(f)}try{let p=Array.from(document.querySelectorAll(`[name="${n}"], [value="${n}"], [placeholder="${n}" i], [title="${n}" i], [data-category="${n}" i], [data-dropzone="${n}" i], [data-testid="${n}" i], [data-test-id="${n}" i], [aria-label="${n}" i]`)).find(g=>T(g)&&!H(g));if(p)return p.hasAttribute("data-category")||p.hasAttribute("data-dropzone")||p.classList.contains("dnd-zone")?p:B(p)}catch{}if(/^[.#\[]|\s|[>+~:]/.test(i))try{let p=Array.from(document.querySelectorAll(i)).find(g=>T(g)&&!H(g));if(p)return B(p)}catch{}try{let r=i.replace(/"/g,""),p=`//button[normalize-space(.)="${r}"] | //a[normalize-space(.)="${r}"] | //*[not(*) and normalize-space(.)="${r}"] | //*[@aria-label="${r}"] | //*[@data-category="${r}"] | //*[@data-testid="${r}"]`,g=document.evaluate(p,document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);for(let v=0;v<g.snapshotLength;v++){let f=g.snapshotItem(v);if(f&&T(f)&&!H(f)){if(["body","html"].includes(f.tagName.toLowerCase())){let x=f.querySelector('button, [role="button"], a, input, [role="radio"], [role="checkbox"], label');if(x&&T(x))return B(x)}return f.closest('[data-role="dropzone"], [class*="category" i], [class*="bucket" i], [class*="column" i], [class*="drop" i]')||B(f)}}}catch{}let u=b(i).toLowerCase(),h=Array.from(document.querySelectorAll('button, a, div, span, li, p, label, input, textarea, select, [draggable="true"], [data-testid], [class*="option" i], [class*="card" i], [class*="item" i], [class*="choice" i], [class*="category" i], [class*="bucket" i]'));for(let r of h){if(!T(r)||H(r)||r.closest("header, nav, .stepper, .step-item, .progress-bar-container")||$(r)||!!(r.matches('article, section, form, main, [class*="container" i], [class*="grid" i], .dnd-pool, .dnd-zones')||r.querySelector('label, [role="radio"], [role="checkbox"], .dnd-card, [draggable="true"], .option-card, tr'))&&!r.matches(".dnd-zone, [data-category], [data-dropzone]"))continue;let g=b(r.textContent).toLowerCase(),v=b(r.getAttribute("aria-label")||"").toLowerCase(),f=b(r.getAttribute("placeholder")||"").toLowerCase(),m=b(r.getAttribute("title")||"").toLowerCase(),x=b(r.getAttribute("name")||"").toLowerCase(),w=b(r.getAttribute("data-category")||"").toLowerCase(),y=r instanceof HTMLInputElement||r instanceof HTMLButtonElement?r.value:"",E=b(y).toLowerCase(),L=g.startsWith(u+")")||g.startsWith(u+".")||g.startsWith(u+" -")||g.startsWith(u+":");if(g===u||v===u||f===u||m===u||x===u||w&&w===u||E&&E===u||L)return r.closest('[data-role="dropzone"], [class*="category" i], [class*="bucket" i], [class*="column" i], [class*="drop" i]')||B(r)}if(u.length>=3)for(let r of h){if(!T(r)||H(r)||r.closest("header, nav, .stepper, .step-item, .progress-bar-container")||$(r)||!!(r.matches('article, section, form, main, [class*="container" i], [class*="grid" i], .dnd-pool, .dnd-zones')||r.querySelector('label, [role="radio"], [role="checkbox"], .dnd-card, [draggable="true"], .option-card, tr'))&&!r.matches(".dnd-zone, [data-category], [data-dropzone]"))continue;let g=b(r.textContent).toLowerCase(),v=b(r.getAttribute("aria-label")||"").toLowerCase(),f=b(r.getAttribute("placeholder")||"").toLowerCase(),m=b(r.getAttribute("title")||"").toLowerCase(),x=b(r.getAttribute("name")||"").toLowerCase();if(g.includes(u)||v.includes(u)||f.includes(u)||m.includes(u)||x.includes(u)){if(Array.from(r.children).some(L=>{let M=b(L.textContent).toLowerCase();return M&&M.includes(u)}))continue;return r.closest('[data-role="dropzone"], [class*="category" i], [class*="bucket" i], [class*="column" i], [class*="drop" i]')||B(r)}let w=u.split(/\s+/).filter(Boolean);if(w.length>=3){let y=w.slice(0,Math.min(5,w.length)).join(" ");if(g.includes(y)||v.includes(y)||f.includes(y))return B(r)}}return null}function Lt(o,e){for(let t of e)o.dispatchEvent(new Event(t,{bubbles:!0,composed:!0}))}function O(o,e){if(!o)return;let t=o instanceof HTMLInputElement&&["checkbox","radio"].includes(o.type)?o:o.querySelector('input[type="checkbox"], input[type="radio"]')||(o.hasAttribute("for")?o.ownerDocument.getElementById(o.getAttribute("for")):null);if(t&&o!==t){if(t.type==="checkbox"){_(t,!0);return}if(t.type==="radio"){_(t,!0);return}}try{o.scrollIntoView({block:"center",inline:"center",behavior:"instant"})}catch{}try{o.focus?.()}catch{}if(typeof HTMLButtonElement<"u"&&o instanceof HTMLButtonElement||typeof HTMLAnchorElement<"u"&&o instanceof HTMLAnchorElement||o.tagName?.toLowerCase()==="a"||o.tagName?.toLowerCase()==="button"||typeof HTMLInputElement<"u"&&o instanceof HTMLInputElement&&!["checkbox","radio"].includes(o.type)){try{o.click()}catch{}return}let i=o.getBoundingClientRect(),n=e?e[0]:Math.round(i.left+Math.max(1,i.width/2)),l=e?e[1]:Math.round(i.top+Math.max(1,i.height/2)),s={bubbles:!0,cancelable:!0,composed:!0,view:window,clientX:n,clientY:l};try{o.dispatchEvent(new PointerEvent("pointerdown",{...s,button:0,buttons:1}))}catch{}try{o.dispatchEvent(new MouseEvent("mousedown",{...s,button:0,buttons:1}))}catch{}try{o.dispatchEvent(new PointerEvent("pointerup",{...s,button:0,buttons:0}))}catch{}try{o.dispatchEvent(new MouseEvent("mouseup",{...s,button:0,buttons:0}))}catch{}try{o.dispatchEvent(new MouseEvent("click",{...s,button:0,buttons:0}))}catch{}try{o.click()}catch{}}function He(o,e){let t=o;if(t.hasAttribute("for")){let d=t.getAttribute("for"),u=t.ownerDocument.getElementById(d);u&&(t=u)}if(typeof HTMLSelectElement<"u"&&t instanceof HTMLSelectElement||t.tagName?.toLowerCase()==="select"||t.getAttribute("role")==="combobox"||t.getAttribute("role")==="listbox"||t.matches?.('[role="combobox"], [role="listbox"], [class*="select" i], [class*="dropdown" i]')){Ie(t,[e]);return}let i=t.querySelector('select, [role="combobox"], [role="listbox"]');if(i){Ie(i,[e]);return}if(!(t instanceof HTMLInputElement)&&!(t instanceof HTMLTextAreaElement)&&!(t instanceof HTMLSelectElement)&&!t.isContentEditable){let d=t.querySelector('input:not([type="hidden"]), textarea, select, [contenteditable="true"]');if(d)t=d;else{let h=t.closest('.form-group, .field, [class*="input" i], [class*="control" i], label, tr, td, li, p, div')?.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, select, [contenteditable="true"]');if(h)t=h;else{let r=t.nextElementSibling;for(;r;){if(r instanceof HTMLInputElement&&!["hidden","button","submit","checkbox","radio"].includes(r.type)||r instanceof HTMLTextAreaElement||r instanceof HTMLElement&&r.isContentEditable){t=r;break}let p=r.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(p){t=p;break}r=r.nextElementSibling}}}}if(t instanceof HTMLButtonElement||t.tagName.toLowerCase()==="a"||t.getAttribute("role")==="button"||t instanceof HTMLInputElement&&["button","submit","reset","image"].includes(t.type)){let d=t.parentElement?.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(d)t=d;else{let u=document.body;try{u=N()||document.body}catch{}let h=u.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(h)t=h;else{console.warn("[EasyQuiz] setNativeValue: Nenhum campo de texto encontrado para receber o valor.");return}}}if(!(t instanceof HTMLInputElement)&&!(t instanceof HTMLTextAreaElement)&&!(t instanceof HTMLSelectElement)&&!t.isContentEditable){let d=document.body;try{d=N()||document.body}catch{}let u=d.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(u)t=u;else{console.warn("[EasyQuiz] setNativeValue: Nenhum campo de texto encontrado para receber o valor.");return}}if(t instanceof HTMLInputElement&&["checkbox","radio"].includes(t.type)){let d=["true","1","checked","yes","sim"].includes(e.toLowerCase())||e===t.value;_(t,d);return}let l=String(e??""),s=l;if(t instanceof HTMLInputElement&&t.type==="number"){let d=l.replace(",",".").replace(/[^0-9.-]/g,"");d&&!isNaN(Number(d))&&(s=d)}try{t.scrollIntoView?.({block:"center",inline:"center",behavior:"instant"}),t.focus?.()}catch{}let c=!1;try{if(t instanceof HTMLInputElement||t instanceof HTMLTextAreaElement){if(t.type!=="number"){try{t.select?.()}catch{}c=document.execCommand?.("insertText",!1,s)||!1}}else if(t.isContentEditable){try{document.execCommand?.("selectAll",!1,void 0)}catch{}c=document.execCommand?.("insertText",!1,s)||!1}}catch{}if(t instanceof HTMLInputElement||t instanceof HTMLTextAreaElement){try{let h=t._valueTracker;h&&h.setValue(s===""?" ":"")}catch{}let d=t instanceof HTMLTextAreaElement?HTMLTextAreaElement.prototype:HTMLInputElement.prototype,u=Object.getOwnPropertyDescriptor(d,"value")?.set;u?u.call(t,s):t.value=s;try{t.dispatchEvent(new KeyboardEvent("keydown",{bubbles:!0,cancelable:!0,key:s.slice(-1)||"a"}))}catch{}try{t.dispatchEvent(new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,composed:!0,data:s,inputType:"insertText"}))}catch{}try{t.dispatchEvent(new InputEvent("input",{bubbles:!0,cancelable:!0,composed:!0,data:s,inputType:"insertText"}))}catch{t.dispatchEvent(new Event("input",{bubbles:!0,cancelable:!0,composed:!0}))}try{t.dispatchEvent(new KeyboardEvent("keyup",{bubbles:!0,cancelable:!0,key:s.slice(-1)||"a"}))}catch{}try{t.dispatchEvent(new Event("change",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}try{t.dispatchEvent(new FocusEvent("blur",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}if(t.value!==s&&!(t instanceof HTMLInputElement&&t.type==="number"&&Number(t.value)===Number(s))){t.value=s;try{u?.call(t,s)}catch{}}return}if(t.isContentEditable){if(t.textContent?.trim()!==s.trim()){t.textContent=s;try{t.innerText=s}catch{}}try{t.dispatchEvent(new InputEvent("input",{bubbles:!0,cancelable:!0,composed:!0,data:s,inputType:"insertText"}))}catch{t.dispatchEvent(new Event("input",{bubbles:!0,cancelable:!0,composed:!0}))}try{t.dispatchEvent(new Event("change",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}try{t.dispatchEvent(new FocusEvent("blur",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}return}try{"value"in t&&(t.value=s),t.dispatchEvent(new Event("input",{bubbles:!0,cancelable:!0,composed:!0})),t.dispatchEvent(new Event("change",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}}function we(o,e=""){if(o==null)return e;let t=typeof o=="string"?o:String(o);if(!t)return e;let a=/^(eq-|#|\$|\.|input_|mat-|choice_|radio_|chk_)/i.test(t),i=b(t),n=C(t)||C(i);if(!n)return a?e:i||e;let l=n.closest('label, .option-card, [class*="choice" i], [class*="option" i], .quiz-option, tr, td, li');if(l){let h=b(l.textContent);if(h&&h.length>0&&h.length<150)return h}if(n.id){let h=document.querySelector(`label[for="${z(n.id)}"]`);if(h){let r=b(h.textContent);if(r&&r.length>0&&r.length<150)return r}}let s=n.getAttribute("aria-label");if(s)return b(s);let c=n.getAttribute("placeholder");if(c)return b(c);let d=b(n.textContent);if(d&&d.length>0&&d.length<120)return d;let u=n instanceof HTMLInputElement||n instanceof HTMLButtonElement?n.value:"";return u?b(u):a?e:i||e}function _(o,e){let t=o.closest('.option-card, label, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, [class*="option" i], [class*="choice" i], li')||o,a=o instanceof HTMLInputElement&&["checkbox","radio"].includes(o.type)?o:t.querySelector('input[type="checkbox"], input[type="radio"]');if(!a&&t.hasAttribute("for")&&(a=t.ownerDocument.getElementById(t.getAttribute("for"))),t){let i=e?"true":"false";t.setAttribute("aria-checked",i),t.setAttribute("aria-selected",i),t.classList.toggle("selected",e),t.classList.toggle("active",e),t.classList.toggle("checked",e)}if(a){if(a.checked===e)return;try{a.focus?.(),a.click()}catch{}if(a.checked!==e){try{let i=a._valueTracker;i&&i.setValue(!e)}catch{}try{Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"checked")?.set?.call(a,e)}catch{}a.checked=e,Lt(a,["input","change"])}}else{try{t.focus?.()}catch{}try{t.click()}catch{O(t)}}}function Ie(o,e){let t=typeof HTMLSelectElement<"u"&&o instanceof HTMLSelectElement||o.tagName?.toLowerCase()==="select"?o:o.querySelector("select");if(t){let l=e.map(d=>b(d).toLowerCase()),s=!1,c=(d,u)=>{d.selected=!0,t.selectedIndex=u;try{t.value=d.value}catch{}try{Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype,"value")?.set?.call(t,d.value)}catch{}try{let h=t._valueTracker;h&&h.setValue(d.value)}catch{}s=!0};for(let d=0;d<t.options.length;d++){let u=t.options[d],h=u.value.toLowerCase(),r=b(u.textContent).toLowerCase();if(l.some(g=>g===h||g===r)){if(c(u,d),!t.multiple)break}else t.multiple||(u.selected=!1)}if(!s)for(let d of l){let u=d.match(/^(?:item|opção|opcao|alternativa|linha|escolha|campo)?\s*#?_?([0-9]+)$/i);if(u){let h=parseInt(u[1],10),p=t.options[0]?.value===""||t.options[0]?.disabled?h:h>=1?h-1:0;if(p>=0&&p<t.options.length&&(c(t.options[p],p),!t.multiple))break}}if(!s){for(let d of l)if(/^[a-z]$/i.test(d)){let u=d.toUpperCase().charCodeAt(0)-65,r=t.options[0]?.value===""||t.options[0]?.disabled?u+1:u;if(r>=0&&r<t.options.length&&(c(t.options[r],r),!t.multiple))break}}if(!s){let d=u=>u.normalize("NFD").replace(/[\u0300-\u036f]/g,"");for(let u=0;u<t.options.length;u++){let h=t.options[u],r=d(h.value.toLowerCase()),p=d(b(h.textContent).toLowerCase());if(l.some(v=>{let f=d(v);return r.includes(f)||p.includes(f)||f.length>2&&(f.includes(r)||f.includes(p))})&&(c(h,u),!t.multiple))break}}if(s){Lt(t,["focus","input","change","blur"]);return}}let a=o.matches?.('[role="combobox"], [role="listbox"], [class*="select" i], [class*="dropdown" i]')?o:o.closest('[role="combobox"], [role="listbox"], [class*="select" i], [class*="dropdown" i]');a&&O(a);let i=e.map(l=>b(l).toLowerCase()),n=Array.from(document.querySelectorAll('[role="listbox"] [role="option"], [role="menu"] [role="menuitem"], .select-dropdown li, .dropdown-menu .dropdown-item, .ant-select-item-option, .MuiMenuItem-root, [class*="option-item"], li[data-value]')).filter(l=>T(l)&&!H(l));for(let l of i){let s=n.find(d=>{let u=b(d.textContent).toLowerCase(),h=b(d.getAttribute("data-value")||d.getAttribute("value")||"").toLowerCase();return u===l||h===l||u.includes(l)||l.length>2&&l.includes(u)});if(s){O(s);let d=s.querySelector('input[type="radio"], input[type="checkbox"]');d&&_(d,!0);return}let c=C(l);if(c){O(c);return}}}function Yt(o,e){try{let t=new DataTransfer;try{t.setData("text/plain",o)}catch{}try{t.setData("text/html",e)}catch{}return t}catch{return null}}function Ye(o){try{o.click()}catch{let e=o.ownerDocument.defaultView||window;o.dispatchEvent(new e.MouseEvent("click",{bubbles:!0,cancelable:!0,composed:!0,view:e}))}}function J(o,e){let t=b(o).toLowerCase();if(!t)return null;let a=e==="source"?'.dnd-card, [draggable="true"]':'[data-dropzone], [data-category], [data-role="dropzone"]',i=Array.from(document.querySelectorAll(a)),n=e==="destination"?i.find(l=>[l.getAttribute("data-category"),l.getAttribute("data-dropzone")].some(s=>s?.trim().toLowerCase()===t)):null;return n&&T(n)&&!H(n)?n:i.find(l=>{if(!T(l)||H(l))return!1;let s=b(`${l.textContent||""} ${l.getAttribute("data-category")||""} ${l.getAttribute("data-dropzone")||""}`).toLowerCase();return s===t||s.includes(t)})||null}async function ze(o,e,t=1){try{o.scrollIntoView({block:"center",inline:"center",behavior:"instant"})}catch{}let a=o.getBoundingClientRect(),i=e.getBoundingClientRect(),n=Math.round(a.left+Math.max(1,a.width/2)),l=Math.round(a.top+Math.max(1,a.height/2)),s=Math.round(i.left+Math.max(1,i.width/2)),c=Math.round(i.top+Math.max(1,i.height/2)),d=b(e.textContent).toLowerCase();if(d){let v=Array.from(o.querySelectorAll('button, [role="button"], input[type="radio"], input[type="checkbox"], option, .btn, [class*="tag" i]')).find(f=>{let m=b(f.textContent).toLowerCase(),x=f instanceof HTMLInputElement||f instanceof HTMLOptionElement?b(f.value).toLowerCase():"";return m&&(d.includes(m)||m.includes(d))||x&&(d.includes(x)||x.includes(d))});v&&(O(v),await new Promise(f=>setTimeout(f,120)))}Ye(o),await new Promise(g=>setTimeout(g,140)),Ye(e);let u=e.querySelector('[data-role="dropzone"], [class*="bucket" i], [class*="slot" i], [class*="drop" i], [class*="target" i], [class*="items" i], ul, ol');if(u&&u!==e&&Ye(u),await new Promise(g=>setTimeout(g,100)),!e.contains(o)&&o.matches('.dnd-card, [draggable="true"]')&&e.matches('.dnd-zone, [data-dropzone], [data-role="dropzone"]')&&e.appendChild(o),e.contains(o)&&o.matches('.dnd-card, [draggable="true"]'))return;let h={bubbles:!0,cancelable:!0,composed:!0,view:window,clientX:n,clientY:l,screenX:n,screenY:l,button:0,buttons:1};try{o.dispatchEvent(new PointerEvent("pointerdown",{...h,isPrimary:!0,pointerId:1,pointerType:"mouse",pressure:.5}))}catch{}o.dispatchEvent(new MouseEvent("mousedown",h));let r=4;for(let g=1;g<=r;g++){let v=Math.round(n+(s-n)*(g/r)),f=Math.round(l+(c-l)*(g/r)),m={...h,clientX:v,clientY:f,screenX:v,screenY:f};try{o.dispatchEvent(new PointerEvent("pointermove",{...m,isPrimary:!0,pointerId:1,pointerType:"mouse",pressure:.5}))}catch{}document.dispatchEvent(new MouseEvent("mousemove",m))}let p={bubbles:!0,cancelable:!0,composed:!0,view:window,clientX:s,clientY:c,screenX:s,screenY:c,button:0,buttons:0};try{e.dispatchEvent(new PointerEvent("pointerup",{...p,isPrimary:!0,pointerId:1,pointerType:"mouse",pressure:0}))}catch{}e.dispatchEvent(new MouseEvent("mouseup",p)),e.dispatchEvent(new MouseEvent("click",p));try{let g=Yt(k(o.textContent),o.outerHTML),v={...h},f={...p};g&&(v.dataTransfer=g,f.dataTransfer=g);let m=o.ownerDocument.defaultView?.DragEvent;if(!m)throw new Error("DragEvent n\xE3o dispon\xEDvel neste documento");o.dispatchEvent(new m("dragstart",v)),e.dispatchEvent(new m("dragenter",f)),e.dispatchEvent(new m("dragover",f)),e.dispatchEvent(new m("drop",f)),o.dispatchEvent(new m("dragend",v))}catch(g){console.warn("[EasyQuiz] DragEvent ignorado com seguran\xE7a:",g)}try{let g=new Touch({identifier:1,target:o,clientX:n,clientY:l}),v=new Touch({identifier:1,target:e,clientX:s,clientY:c});o.dispatchEvent(new TouchEvent("touchstart",{bubbles:!0,cancelable:!0,touches:[g]})),e.dispatchEvent(new TouchEvent("touchmove",{bubbles:!0,cancelable:!0,touches:[v]})),e.dispatchEvent(new TouchEvent("touchend",{bubbles:!0,cancelable:!0,touches:[]}))}catch{}if(t>=2&&!e.contains(o))try{o.focus?.(),o.dispatchEvent(new KeyboardEvent("keydown",{key:" ",code:"Space",bubbles:!0})),o.dispatchEvent(new KeyboardEvent("keyup",{key:" ",code:"Space",bubbles:!0})),await new Promise(g=>setTimeout(g,80)),e.focus?.(),e.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",bubbles:!0})),e.dispatchEvent(new KeyboardEvent("keyup",{key:"Enter",code:"Enter",bubbles:!0}))}catch{}}var Mt={fill:(o,e)=>{let t=C(o);t?He(t,e):console.warn(`$eq.fill: Elemento '${o}' n\xE3o encontrado`)},click:o=>{let e=C(o);e?!!(e.closest('.option-card, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, [class*="option" i], [class*="choice" i]')||e.querySelector('input[type="radio"], input[type="checkbox"]')||e instanceof HTMLInputElement&&["checkbox","radio"].includes(e.type))?_(e,!0):O(e):console.warn(`$eq.click: Elemento '${o}' n\xE3o encontrado`)},check:(o,e)=>{let t=C(o);t?_(t,e):console.warn(`$eq.check: Elemento '${o}' n\xE3o encontrado`)},find:(o,e)=>C(o,e),drag:(o,e)=>{let t=J(o,"source")||C(o),a=J(e,"destination")||C(e);t&&a?ze(t,a):console.warn(`$eq.drag: Origem ou destino n\xE3o encontrado ('${o}' -> '${e}')`)},categorize:async(o,e)=>{let t=J(o,"source")||C(o),a=J(e,"destination")||C(e);if(!t||!a){console.warn(`$eq.categorize: Item ou categoria n\xE3o encontrados ('${o}' -> '${e}')`);return}await ze(t,a)},execute:(o,e=!1,t=1)=>We(o,e,t)};typeof window<"u"&&(window.$eq=Mt);async function Jt(o,e=1,t=be()){if(je(o,t),o.t==="js"){let s=String(o.v||"");bt(s);try{new Function("$eq","document","window",s)(Mt,document,window)}catch(c){throw console.warn("[EasyQuiz JS Execution]",c),c}return}if(o.t==="drag"){let s=J(o.from,"source")||C(o.from),c=J(o.to,"destination")||C(o.to);!s&&o.from&&(s=C(b(o.from))),!c&&o.to&&(c=C(b(o.to))),s&&c?await ze(s,c,e):console.warn(`[EasyQuiz] Drag: alvo n\xE3o encontrado ('${o.from}' -> '${o.to}')`);return}let a=o.id!==void 0&&o.id!==null?String(o.id):"";!a&&o.t==="val"&&(a=o.target??o.name??o.selector??"1");let i=o.v!==void 0?o.v:o.value!==void 0?o.value:o.val!==void 0?o.val:o.text,n=i!=null?String(i).trim():"",l=C(a,n,o.t==="val"||o.t==="sel");if(!l&&a&&(l=C(b(a),n,o.t==="val"||o.t==="sel")),l&&n){if(l instanceof HTMLInputElement&&l.type==="radio"&&l.name){if(b(l.value).toLowerCase()!==b(n).toLowerCase()){let s=document.querySelector(`input[type="radio"][name="${z(l.name)}"][value="${z(n)}" i]`);if(s)l=s;else{let d=Array.from(document.querySelectorAll(`input[type="radio"][name="${z(l.name)}"]`)).find(u=>{let h=u.closest("label, .vf-label, .option-card, tr, td, div");return h&&b(h.textContent).toLowerCase().includes(b(n).toLowerCase())});d&&(l=d)}}}else if(!(l instanceof HTMLInputElement)&&!(l instanceof HTMLSelectElement)&&!(l instanceof HTMLTextAreaElement)){let s=l.querySelector(`input[value="${z(n)}" i], [data-value="${z(n)}" i]`);if(s)l=s;else{let d=Array.from(l.querySelectorAll('input[type="radio"], input[type="checkbox"]')).find(u=>{let h=u.closest("label, .vf-label, .option-card, td, div");return h&&b(h.textContent).toLowerCase().includes(b(n).toLowerCase())});d&&(l=d)}}}if(!l&&(o.t==="val"||o.t==="sel")){let s=document.body;try{s=N()||document.body}catch{}let c=Array.from(s.querySelectorAll(o.t==="sel"?'select, [role="combobox"], [role="listbox"]':'input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, select, [contenteditable="true"]')).filter(d=>T(d)&&!H(d));if(c.length===1)l=c[0];else if(c.length>1){let d=b(a).toLowerCase(),u=d.match(/^#?_?([0-9]+)$/);if(u){let h=parseInt(u[1],10);h>=1&&h<=c.length?l=c[h-1]:h>=0&&h<c.length&&(l=c[h])}l||(l=c.find(r=>{let p=(r.getAttribute("placeholder")||"").toLowerCase(),g=(r.name||"").toLowerCase(),v=(r.getAttribute("aria-label")||"").toLowerCase(),f=(r.id||"").toLowerCase(),m=b(Fe(r)).toLowerCase(),x=b(r.closest('label, tr, td, .form-group, .field, [class*="row" i], div')?.textContent||"").toLowerCase();return p.includes(d)||g.includes(d)||v.includes(d)||f.includes(d)||m&&m.includes(d)||d.length>=2&&x.includes(d)})||(c.length===1?c[0]:null))}}if(!l&&o.t!=="adv"){console.warn(`[EasyQuiz] Alvo '${a}' n\xE3o encontrado para a\xE7\xE3o '${o.t}'. Prosseguindo...`);return}switch(o.t){case"val":if(l){let c=l instanceof HTMLInputElement||l instanceof HTMLTextAreaElement||l instanceof HTMLSelectElement||l.isContentEditable?l:l.querySelector('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]');if(!c){let r=l.closest('.form-group, .field, [class*="input" i], [class*="control" i], label, tr, td, li, p, div')?.querySelector('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]');r&&(c=r)}if(!c){let h=l.nextElementSibling;for(;h;){if(h instanceof HTMLInputElement&&!["hidden","button","submit","checkbox","radio"].includes(h.type)||h instanceof HTMLTextAreaElement||h instanceof HTMLElement&&h.isContentEditable){c=h;break}let r=h.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(r){c=r;break}h=h.nextElementSibling}}if(!c){let h=document.body;try{h=N()||document.body}catch{}let r=Array.from(h.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]')).filter(p=>T(p)&&!H(p));r.length>0&&(c=r[0])}let d=o.v!==void 0?o.v:o.value!==void 0?o.value:o.val!==void 0?o.val:o.text,u=d!=null?String(d):"";He(c||l,u)}break;case"chk":l&&_(l,!!o.c);break;case"sel":if(l){let c=Array.isArray(o.v)?o.v:[String(o.v)];Ie(l,c)}break;case"clk":if(l)if(!!(l.closest('.option-card, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice')||l.querySelector('input[type="radio"], input[type="checkbox"]')||l instanceof HTMLInputElement&&["checkbox","radio"].includes(l.type))){let d=o.c!==void 0?!!o.c:!0;_(l,d)}else O(l,o.co);break;case"adv":let s=Je(o.id);if(s){await Xe(s,1200);let c=o.id||s.textContent?.trim()||"";c&&De(window.location.hostname,{advanceSelector:c}),O(s)}else console.warn("[EasyQuiz] Bot\xE3o de avan\xE7o n\xE3o localizado.");break}}function Xt(){let o=["button","a",'[role="button"]','input[type="submit"]','input[type="button"]','[data-testid*="check" i]','[data-test-id*="check" i]'].join(",");return Array.from(document.querySelectorAll(o)).find(t=>{if(!T(t)||H(t)||t.closest("header, nav, aside"))return!1;let a=t instanceof HTMLInputElement||t instanceof HTMLButtonElement?t.value:"",i=(t.textContent||a||t.getAttribute("aria-label")||"").trim();return/(verificar|checar|check|conferir|validar|enviar|responder)/i.test(i)})||null}function Je(o){if(o){let n=C(o);if(n&&T(n)&&!H(n)&&!$(n))return n}try{let n=me(window.location.hostname);if(n.advanceSelector){let l=C(n.advanceSelector);if(l&&T(l)&&!H(l)&&!$(l))return l}}catch{}let e=["button","a",'[role="button"]','[role="link"]','input[type="button"]','input[type="submit"]','[data-testid*="next" i]','[data-testid*="continue" i]','[data-testid*="check" i]','[data-test-id*="next" i]','[data-test-id*="continue" i]','[data-test-id*="check" i]','[class*="next" i]','[class*="continue" i]','[class*="proximo" i]','[class*="avancar" i]'].join(","),a=Array.from(document.querySelectorAll(e)).filter(n=>T(n)&&!H(n)&&!n.closest("header, nav, aside")&&!$(n));for(let n of a)if(G(n)&&!$(n))return n;for(let n of a){let l=n instanceof HTMLInputElement||n instanceof HTMLButtonElement?n.value:"",s=(n.textContent||l||n.getAttribute("aria-label")||"").trim();if(Ae.test(s)&&!$(n))return n}let i=document.querySelector('[data-test-id*="next" i], [data-testid*="next" i], [aria-label*="next" i], [aria-label*="pr\xF3xim" i], [aria-label*="avan\xE7ar" i], [aria-label*="continuar" i]');return i&&T(i)&&!H(i)&&!$(i)?i:null}async function Xe(o,e=1500){let t=Date.now();for(;Date.now()-t<e;){if(!(o.disabled===!0||o.getAttribute("aria-disabled")==="true"||o.classList.contains("disabled")||o.getAttribute("disabled")!==null))return;await new Promise(i=>setTimeout(i,100))}}function At(){let o=(document.body?.innerText||document.body?.textContent||"").replace(/\s+/g," ").trim(),e=document.querySelectorAll('input, textarea, select, button, [role="button"], [role="option"]').length;return`${window.location.href}|${document.title}|${o.slice(0,900)}|${e}`}async function Wt(o,e=1800){let t=Date.now();for(;Date.now()-t<e;){if(At()!==o)return{changed:!0,evidence:"URL, texto, t\xEDtulo ou conjunto de controles mudou ap\xF3s a a\xE7\xE3o."};await new Promise(i=>setTimeout(i,100))}return{changed:!1,evidence:"Nenhuma mudan\xE7a observ\xE1vel foi detectada dentro do tempo limite."}}async function Tt(o){if(o.t==="js"||o.t==="adv")return;if(o.t==="drag"){let i=C(o.from)||C(b(o.from)),n=C(o.to)||C(b(o.to));i&&n&&await ze(i,n,2);return}let e=o.id||"",t=o.v!==void 0?String(o.v).trim():"",a=C(e,t)||C(b(e),t);if(o.t==="clk"||o.t==="chk"){if(!a&&e){let n=Array.from(document.querySelectorAll('input, label, button, [role="radio"], [role="checkbox"], .option-card, [class*="option" i], [class*="choice" i]')),l=b(e).toLowerCase();a=n.find(s=>{let c=b(s.textContent).toLowerCase(),d=b(s.value||"").toLowerCase();return c.includes(l)||d===l||c.startsWith(l+")")||c.startsWith("("+l+")")})||null}let i=o.v!==void 0?String(o.v).trim():"";if(a&&i){if(a instanceof HTMLInputElement&&a.type==="radio"&&a.name){if(b(a.value).toLowerCase()!==b(i).toLowerCase()){let n=document.querySelector(`input[type="radio"][name="${z(a.name)}"][value="${z(i)}" i]`);if(n)a=n;else{let s=Array.from(document.querySelectorAll(`input[type="radio"][name="${z(a.name)}"]`)).find(c=>{let d=c.closest("label, .vf-label, .option-card, tr, td, div");return d&&b(d.textContent).toLowerCase().includes(b(i).toLowerCase())});s&&(a=s)}}}else if(!(a instanceof HTMLInputElement)&&!(a instanceof HTMLSelectElement)&&!(a instanceof HTMLTextAreaElement)){let n=a.querySelector(`input[value="${z(i)}" i], [data-value="${z(i)}" i]`);if(n)a=n;else{let s=Array.from(a.querySelectorAll('input[type="radio"], input[type="checkbox"]')).find(c=>{let d=c.closest("label, .vf-label, .option-card, td, div");return d&&b(d.textContent).toLowerCase().includes(b(i).toLowerCase())});s&&(a=s)}}}if(a){let n=a.closest('.option-card, label, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, li')||a,l=a instanceof HTMLInputElement&&["radio","checkbox"].includes(a.type)?a:n.querySelector('input[type="radio"], input[type="checkbox"]')||(n.getAttribute("for")?n.ownerDocument.getElementById(n.getAttribute("for")):null),s=o.t==="chk"||o.c!==void 0?!!o.c:!0;if(_(l||n,s),l&&l.checked!==s){try{let c=l._valueTracker;c&&c.setValue(!s)}catch{}try{Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"checked")?.set?.call(l,s)}catch{}l.checked=s,l.dispatchEvent(new Event("input",{bubbles:!0,composed:!0})),l.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}}return}if(o.t==="val"){let i=null;if(a&&(i=a instanceof HTMLInputElement||a instanceof HTMLTextAreaElement||a.isContentEditable?a:a.querySelector('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]')),!i){let n=document.body;try{n=N()||document.body}catch{}let l=Array.from(n.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]')),s=b(e).toLowerCase();i=l.find(c=>{let d=(c.getAttribute("placeholder")||"").toLowerCase(),u=(c.name||"").toLowerCase(),h=(c.id||"").toLowerCase(),r=(c.getAttribute("aria-label")||"").toLowerCase();return d.includes(s)||u.includes(s)||h.includes(s)||r.includes(s)})||(l.length>0?l[0]:null)}if(i){let n=String(o.v??"");try{if(i.focus?.(),i.type!=="number"){try{i.select?.()}catch{}document.execCommand?.("insertText",!1,n)}}catch{}He(i,n)}return}if(o.t==="sel"){if(!a&&e){let i=Array.from(document.querySelectorAll("select")),n=b(e).toLowerCase();a=i.find(l=>{let s=(l.name||"").toLowerCase(),c=(l.id||"").toLowerCase(),d=(l.getAttribute("aria-label")||"").toLowerCase();return s.includes(n)||c.includes(n)||d.includes(n)})||null}if(a){let i=Array.isArray(o.v)?o.v:[String(o.v)];Ie(a,i)}return}}function ue(o){try{if(o.t==="val"){let e=o.v!==void 0?o.v:o.value!==void 0?o.value:o.val!==void 0?o.val:o.text,t=String(e??"").trim(),a=t,i=o.id!==void 0&&o.id!==null?String(o.id):"";i||(i=o.target??o.name??o.selector??"1");let n=C(i,a,!0)||C(b(i),a,!0);if(!n){let h=document.body;try{h=N()||document.body}catch{}let r=Array.from(h.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]')).filter(p=>T(p)&&!H(p));r.length>0&&(n=r[0])}if(!n)return!1;let l=n instanceof HTMLInputElement&&n.type==="radio"?n:n.querySelector('input[type="radio"]');if(l&&l.name){let h=document.querySelector(`input[type="radio"][name="${z(l.name)}"]:checked`);if(!h)return!1;let r=b(h.value).toLowerCase(),p=b(t).toLowerCase(),g=b(h.closest("label, .vf-label, .option-card, tr, td, div")?.textContent||"").toLowerCase();return r===p||g===p||g.includes(p)}let s=n instanceof HTMLInputElement||n instanceof HTMLTextAreaElement||n.isContentEditable?n:n.querySelector('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(!s){let r=n.closest('.form-group, .field, [class*="input" i], [class*="control" i], label, tr, td, li, p, div')?.querySelector('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]');r&&(s=r)}if(!s){let h=n.nextElementSibling;for(;h;){if(h instanceof HTMLInputElement&&!["hidden","button","submit","checkbox","radio"].includes(h.type)||h instanceof HTMLTextAreaElement||h instanceof HTMLElement&&h.isContentEditable){s=h;break}let r=h.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(r){s=r;break}h=h.nextElementSibling}}if(s instanceof HTMLSelectElement){let h=b(t).toLowerCase();return Array.from(s.options).some(r=>{if(!r.selected)return!1;let p=r.value.toLowerCase(),g=b(r.textContent).toLowerCase();return h===p||h===g||p.includes(h)||g.includes(h)})}let c=(s instanceof HTMLInputElement||s instanceof HTMLTextAreaElement?s.value:s?.textContent??n.textContent??"").trim();if(!c&&!t)return!0;if(!c&&t)return!1;let d=c.replace(",",".").replace(/\s+/g,"").toLowerCase(),u=t.replace(",",".").replace(/\s+/g,"").toLowerCase();return d===u||d.includes(u)||u.includes(d)||c.toLowerCase()===t.toLowerCase()}if(o.t==="sel"){let e=C(o.id,void 0,!0)||C(b(o.id),void 0,!0);if(!e){let n=document.body;try{n=N()||document.body}catch{}let l=Array.from(n.querySelectorAll('select, [role="combobox"], [role="listbox"]')).filter(d=>T(d)&&!H(d)),s=b(o.id).toLowerCase();e=l.find(d=>{let u=(d.id||"").toLowerCase(),h=(d.getAttribute("name")||"").toLowerCase(),r=(d.getAttribute("aria-label")||"").toLowerCase(),p=b(d.closest('.dropdown-row, [class*="dropdown" i], [class*="select" i], tr, label, div')?.textContent||"").toLowerCase();return u.includes(s)||h.includes(s)||r.includes(s)||s.length>=2&&p.includes(s)})||(l.length===1?l[0]:null)}if(!e)return!1;let t=e instanceof HTMLSelectElement?e:e.querySelector("select");if(!t){let n=e.matches?.('[role="combobox"], [role="listbox"], [class*="select" i], [class*="dropdown" i]')?e:e.closest('[role="combobox"], [role="listbox"], [class*="select" i], [class*="dropdown" i]');if(n){let s=(Array.isArray(o.v)?o.v:[String(o.v)]).map(d=>b(d).toLowerCase()),c=b(n.textContent).toLowerCase();return s.some(d=>c.includes(d)||d.includes(c))}return!1}let i=(Array.isArray(o.v)?o.v:[String(o.v)]).map(n=>b(n).toLowerCase());return Array.from(t.options).some(n=>{if(!n.selected)return!1;let l=n.value.toLowerCase(),s=b(n.textContent).toLowerCase();return i.some(c=>c===l||c===s||l.includes(c)||s.includes(c))})}if(o.t==="chk"||o.t==="clk"){let e=o.v!==void 0?String(o.v).trim():"",t=C(o.id,e)||C(b(o.id),e);if(!t)return!1;let a=t.closest('.option-card, label, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, li')||t,i=t instanceof HTMLInputElement&&["checkbox","radio"].includes(t.type)?t:a.querySelector('input[type="checkbox"], input[type="radio"]')||(a.getAttribute("for")?a.ownerDocument.getElementById(a.getAttribute("for")):null),n=o.t==="chk"||o.c!==void 0?!!o.c:!0;if(i&&i.type==="radio"){if(i.checked===n)return!0;if(o.v&&i.name){let u=b(String(o.v)).toLowerCase(),h=document.querySelector(`input[type="radio"][name="${z(i.name)}"]:checked`);if(!h)return!1;if(h===i)return!0;let r=b(h.value).toLowerCase(),p=b(h.closest("label, .vf-label, .option-card, tr, td, div")?.textContent||"").toLowerCase();return r===u||p.includes(u)||u.includes(r)}}if(i&&["checkbox","radio"].includes(i.type))return i.checked===n;let l=a.getAttribute("aria-checked")===String(n)||a.getAttribute("aria-selected")===String(n)||a.getAttribute("aria-pressed")===String(n),s=n?a.getAttribute("data-selected")==="true"||a.getAttribute("data-checked")==="true"||a.getAttribute("data-active")==="true"||a.getAttribute("data-state")==="checked"||a.getAttribute("data-state")==="on":a.getAttribute("data-selected")==="false"||a.getAttribute("data-checked")==="false"||a.getAttribute("data-state")==="unchecked",c=n?/active|selected|checked|picked|correct|is-selected|choice-selected|selected-option|is-checked|chosen|current|highlight|ring|border-primary/i.test(a.className||""):!/active|selected|checked|picked|correct|is-selected|choice-selected|selected-option|is-checked|chosen|current|highlight|ring|border-primary/i.test(a.className||"");return!!(l||s||c||(a instanceof HTMLButtonElement||a.getAttribute("role")==="button")&&o.t==="clk"||o.t==="clk"&&!i)}if(o.t==="drag"){let e=C(o.from)||C(b(o.from)),t=C(o.to)||C(b(o.to));return!e||!t?!1:t.contains(e)?!0:/placed|dropped|assigned|matched|done|selected/i.test(e.className||"")||e.getAttribute("data-placed")==="true"}}catch{}return!1}async function We(o,e,t=1,a=be({engine:"smart",autoAdvance:e})){let i=o.actions.filter(m=>m.t!=="adv"),n=o.actions.filter(m=>m.t==="adv"),l=0,s=[],c=new Map,d=o.pageType==="question",u=i.filter(m=>m.t==="chk"||m.t==="clk"&&m.c!==void 0);if(d&&u.length>0){let m=document.body;try{m=N()||document.body}catch{}let x=Array.from(m.querySelectorAll('input[type="checkbox"], [role="checkbox"]')).filter(w=>T(w)&&!H(w));if(x.length>1){let w=new Set;for(let y of u){let E=y.t==="chk"?!!y.c:!!(y.c??!0),L="id"in y&&typeof y.id=="string"?y.id:"";if(E&&L){let M=C(L,y.v);if(M){let A=M instanceof HTMLInputElement&&M.type==="checkbox"?M:M.querySelector('input[type="checkbox"]');w.add(A||M)}}}if(w.size>0)for(let y of x)w.has(y)||(y instanceof HTMLInputElement&&y.checked||y.getAttribute("aria-checked")==="true"||y.closest(".option-card, label")?.classList.contains("selected"))&&_(y,!1)}}for(let m of i){try{await Jt(m,t,a),l++}catch(x){c.set(m,x instanceof Error?x.message:String(x)),console.warn("[EasyQuiz] A\xE7\xE3o declarativa prim\xE1ria falhou com seguran\xE7a:",m,x)}await new Promise(x=>setTimeout(x,m.t==="drag"?250:70))}await new Promise(m=>setTimeout(m,i.length>0?300:50));let h=0;for(let m of i){if(ue(m)){h++;continue}console.warn(`[EasyQuiz Auto-Cura] A\xE7\xE3o '${m.t}' no alvo '${m.id||m.from||""}' n\xE3o verificada no DOM. Disparando Passagem 2 de conting\xEAncia...`);try{je(m,a),await Tt(m)}catch(x){c.set(m,x instanceof Error?x.message:String(x)),console.warn("[EasyQuiz Auto-Cura] Rota alternativa falhou:",x)}await new Promise(x=>setTimeout(x,180)),ue(m)&&(console.log("[EasyQuiz Auto-Cura] \u2713 A\xE7\xE3o recuperada com sucesso pela rota de conting\xEAncia!"),h++)}if(h<i.length&&i.length>0){console.warn(`[EasyQuiz Auto-Cura] ${i.length-h} de ${i.length} a\xE7\xE3o(\xF5es) ainda n\xE3o verificadas. Disparando Passagem 3 final...`),await new Promise(m=>setTimeout(m,200));for(let m of i)if(!ue(m))try{await Tt(m)}catch(x){c.set(m,x instanceof Error?x.message:String(x))}await new Promise(m=>setTimeout(m,200)),h=0;for(let m of i)ue(m)&&h++}for(let m of i)ue(m)||s.push(m.t==="drag"?`${m.from} -> ${m.to}`:"id"in m?m.id:m.t);d&&i.length===0&&s.push("nenhuma a\xE7\xE3o de resposta prescrita");let r=i.map((m,x)=>{let w=m.t==="drag"?`${m.from} -> ${m.to}`:m.t==="js"?"$eq":m.id||m.t,y=m.t==="js"?!0:m.t==="drag"?!!(J(m.from,"source")&&J(m.to,"destination")):!!(C(m.id||"")||C(b(m.id||""))),E=ue(m);return{index:x,action:m,target:w,located:y,applied:!c.has(m),verified:E,strategy:m.t==="drag"?"drag-adaptive":m.t==="js"?"javascript":"declarative-dom",evidence:E?"estado do controle confirmado no DOM":"nenhuma evid\xEAncia suficiente ap\xF3s as tentativas",...c.has(m)?{error:c.get(m)}:{}}}),p=d?i.length>0&&s.length===0&&(h===i.length||l===i.length&&h>0):!0,g=!1,v=!1,f="Nenhuma a\xE7\xE3o de navega\xE7\xE3o solicitada.";if(e&&(p||!d)){await new Promise(E=>setTimeout(E,i.length>0?400:150));let m=!1;if(o.pageType!=="info"){let E=Xt();E&&T(E)&&(await Xe(E,1200),O(E),m=!0,await new Promise(L=>setTimeout(L,800)))}let x=At(),w=n.length>0?n[0].id:void 0,y=Je(w);if(!y&&m&&(await new Promise(E=>setTimeout(E,600)),y=Je(w)),y){await Xe(y,1500);let E=w||y.textContent?.trim()||"";E&&De(window.location.hostname,{advanceSelector:E}),O(y);let L=await Wt(x,2500);v=L.changed,f=L.evidence,g=L.changed||m,!L.changed&&!m&&console.warn("[EasyQuiz] O bot\xE3o de avan\xE7o foi acionado, mas a navega\xE7\xE3o ainda n\xE3o concluiu.")}else m?(g=!0,v=!0,f="Resposta confirmada via bot\xE3o de verifica\xE7\xE3o/envio."):console.warn("[EasyQuiz] Nenhum bot\xE3o de avan\xE7o encontrado na p\xE1gina.")}return{applied:l,verified:h,success:p,advanced:g,failed:s,reports:r,navigationVerified:v,navigationEvidence:f}}var qe=null,oe=[],Ze=[],Zt=`
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
`;function eo(){try{if(typeof document>"u"||!document.head)return;if(!document.getElementById("eq-image-pulse-style")){let o=document.createElement("style");o.id="eq-image-pulse-style",o.textContent=Zt,document.head.appendChild(o)}}catch{}}function ae(){qe&&(qe.style.removeProperty("outline"),qe.style.removeProperty("outline-offset"),qe=null);for(let o of oe)o.style.removeProperty("outline"),o.style.removeProperty("outline-offset"),o.style.removeProperty("background-color"),o.style.removeProperty("box-shadow"),o.removeAttribute("data-easyquiz-highlight");oe=[];for(let o of Ze)o.style.removeProperty("animation"),o.style.removeProperty("outline"),o.style.removeProperty("outline-offset"),o.style.removeProperty("box-shadow"),o.removeAttribute("data-easyquiz-image-highlight");Ze=[]}function et(o){eo();for(let e of o){if(!e||!(e instanceof(typeof HTMLElement<"u"?HTMLElement:e.constructor)))continue;let t=e;t.style.outline="3px solid #ffd600",t.style.outlineOffset="3px",t.style.animation="eq-image-pulse-yellow-white 1.2s ease-in-out infinite",t.setAttribute("data-easyquiz-image-highlight","true"),Ze.push(t)}}function tt(o){ae(),qe=o,o.style.outline="2px solid #00e5ff",o.style.outlineOffset="4px"}function St(o){for(let e of o){if(e.t==="adv"||e.t==="js")continue;if(e.t==="drag"){try{let d=C(e.from),u=C(e.to);d&&(d.style.outline="2px solid #00ff88",oe.push(d)),u&&(u.style.outline="2px dashed #00e5ff",oe.push(u))}catch{}continue}if(!e.id)continue;let t=e.v!==void 0?Array.isArray(e.v)?e.v[0]:String(e.v):"",a=C(e.id,t,e.t==="val"||e.t==="sel")||C(b(e.id),t,e.t==="val"||e.t==="sel");if(!a&&e.t==="sel"){let d=document.body;try{d=N()||document.body}catch{}let u=Array.from(d.querySelectorAll('select, [role="combobox"], [role="listbox"]')).filter(p=>T(p)&&!ce(p)),h=b(e.id).toLowerCase();a=u.find(p=>{let g=(p.id||"").toLowerCase(),v=(p.getAttribute("name")||"").toLowerCase(),f=(p.getAttribute("aria-label")||"").toLowerCase(),m=b(p.closest('.dropdown-row, [class*="dropdown" i], [class*="select" i], tr, label, div')?.textContent||"").toLowerCase();return g.includes(h)||v.includes(h)||f.includes(h)||h.length>=2&&m.includes(h)})||(u.length===1?u[0]:null)}if(!a)continue;let i=typeof HTMLSelectElement<"u"&&a instanceof HTMLSelectElement||a.tagName?.toLowerCase()==="select"||a.getAttribute("role")==="combobox"||a.getAttribute("role")==="listbox",l=a.parentElement?.closest('.dropdown-row, [class*="dropdown" i], [class*="select-row" i], .form-group, tr, li')||a.closest('label, .option-card, [role="radio"], [role="checkbox"], [role="listitem"], .answer, .quiz-option, .form-check, [class*="option" i], [class*="choice" i]')||a;l.style.outline="2px solid #00ff88",l.style.outlineOffset="2px",l.style.backgroundColor="rgba(0, 255, 136, 0.12)",l.setAttribute("data-easyquiz-highlight","true"),oe.push(l);let s=i?a:l.querySelector('select, [role="combobox"], [role="listbox"]');s&&(s.style.outline="2px solid #00ff88",s.style.outlineOffset="2px",s.style.boxShadow="0 0 10px rgba(0, 255, 136, 0.8)",s.setAttribute("data-easyquiz-highlight","true"),oe.push(s));let c=a instanceof HTMLInputElement&&["checkbox","radio"].includes(a.type)?a:l.querySelector('input[type="checkbox"], input[type="radio"]');c&&c!==l&&(c.style.outline="2px solid #00ff88",c.style.outlineOffset="2px",c.style.boxShadow="0 0 10px rgba(0, 255, 136, 0.8)",c.setAttribute("data-easyquiz-highlight","true"),oe.push(c))}}var ot=10,to=1400,at=15e5;function pe(o){return new Promise((e,t)=>{let a=new FileReader;a.onerror=()=>t(new Error("Falha ao converter blob para base64.")),a.onload=()=>{let i=String(a.result||"");e(i.split(",")[1]||"")},a.readAsDataURL(o)})}async function Ee(o){let e=0,t=0;if(o instanceof HTMLImageElement?(e=o.naturalWidth||o.width,t=o.naturalHeight||o.height):(e=o.width,t=o.height),e<=0||t<=0)throw new Error("Dimens\xF5es inv\xE1lidas.");let a=Math.min(1,to/Math.max(e,t)),i=Math.max(1,Math.round(e*a)),n=Math.max(1,Math.round(t*a)),l=document.createElement("canvas");l.width=i,l.height=n;let s=l.getContext("2d",{alpha:!1});if(!s)throw new Error("Sem suporte a Canvas 2D.");return s.fillStyle="#ffffff",s.fillRect(0,0,i,n),s.drawImage(o,0,0,i,n),new Promise((c,d)=>{l.toBlob(u=>u?c(u):d(new Error("Falha na compress\xE3o.")),"image/jpeg",.88)})}async function oo(o){let e=typeof o.getBoundingClientRect=="function"?o.getBoundingClientRect():{width:0,height:0},t=e.width||parseFloat(o.getAttribute("width")||"0")||parseFloat(o.style.width||"0")||400,a=e.height||parseFloat(o.getAttribute("height")||"0")||parseFloat(o.style.height||"0")||300,i=2,n=Math.min(1800,Math.max(120,Math.round(t*i))),l=Math.min(1800,Math.max(100,Math.round(a*i))),s=o.cloneNode(!0);s.getAttribute("xmlns")||s.setAttribute("xmlns","http://www.w3.org/2000/svg"),s.setAttribute("width",String(n)),s.setAttribute("height",String(l)),!s.getAttribute("viewBox")&&t>0&&a>0&&s.setAttribute("viewBox",`0 0 ${t} ${a}`);let d=new XMLSerializer().serializeToString(s),u=new Blob([d],{type:"image/svg+xml;charset=utf-8"}),h=URL.createObjectURL(u);try{let r=new Image;r.crossOrigin="anonymous",await new Promise((v,f)=>{r.onload=()=>v(),r.onerror=()=>f(new Error("Falha ao renderizar SVG em Image.")),r.src=h});let p=document.createElement("canvas");p.width=n,p.height=l;let g=p.getContext("2d",{alpha:!1});if(!g)throw new Error("Sem suporte a Canvas 2D.");return g.fillStyle="#ffffff",g.fillRect(0,0,n,l),g.drawImage(r,0,0,n,l),new Promise((v,f)=>{p.toBlob(m=>m?v(m):f(new Error("Falha na compress\xE3o do SVG.")),"image/jpeg",.92)})}finally{URL.revokeObjectURL(h)}}async function nt(o){try{let e=o.cloneNode(!0),t=o.offsetWidth||500,a=o.offsetHeight||500,i=`
      <svg xmlns="http://www.w3.org/2000/svg" width="${t}" height="${a}">
        <foreignObject width="100%" height="100%">
          <div xmlns="http://www.w3.org/1999/xhtml" style="background:#fff;font-family:sans-serif;">
            ${e.innerHTML}
          </div>
        </foreignObject>
      </svg>
    `,n=new Blob([i],{type:"image/svg+xml;charset=utf-8"}),l=URL.createObjectURL(n),s=new Image;s.crossOrigin="anonymous",await new Promise((u,h)=>{s.onload=()=>u(),s.onerror=()=>h(new Error("Falha ao renderizar ForeignObject.")),s.src=l});let c=await Ee(s),d=await pe(c);if(URL.revokeObjectURL(l),d&&d.length<=at)return{mediaType:"image/jpeg",base64:d,alt:"Captura via rasteriza\xE7\xE3o DOM",source:"rasterized"}}catch(e){console.warn("Falha na rasteriza\xE7\xE3o do n\xF3:",e)}return null}function ao(o,e){let t=o.closest('[data-easyquiz-id], button, [role="button"], [role="radio"], [role="checkbox"], [role="option"], label, .option-card, .quiz-option, .choice, .answer, [class*="option" i], [class*="choice" i], [class*="answer" i], li, tr');if(t&&t!==e&&T(t)&&!G(t)&&!$(t)){let n=t.dataset.easyquizId||t.id||void 0,l=k(t.innerText||t.textContent||"",120),s=t.getAttribute("aria-label")||t.getAttribute("title")||"",c=l||s,d=n?` [id: ${n}]`:"";if(c)return{associatedLabel:`Alternativa/Op\xE7\xE3o: "${c}"${d}`,targetControlId:n};if(n)return{associatedLabel:`Alternativa/Op\xE7\xE3o ${d}`,targetControlId:n}}let a=o.closest("figure")?.querySelector("figcaption")?.textContent?.trim();if(a)return{associatedLabel:`Figura do Enunciado: "${k(a,100)}"`};let i=o.closest('[class*="prompt" i], [class*="stimulus" i], [class*="question-text" i], [class*="statement" i], header, h1, h2, h3, h4, p');if(i){let n=k(i.textContent||"",80);if(n)return{associatedLabel:`Gr\xE1fico do Enunciado: "${n}"`}}return{associatedLabel:"Gr\xE1fico/Imagem do Enunciado Principal"}}async function no(o){let e=o.currentSrc||o.src;if(!e)return null;let t=(o.alt||o.getAttribute("aria-label")||"Imagem da quest\xE3o").slice(0,500);if(o.complete&&o.naturalWidth>0)try{let a=await Ee(o),i=await pe(a);if(i&&i.length<=at)return{mediaType:"image/jpeg",base64:i,alt:t,source:e.slice(0,2e3)}}catch{}try{let a=await fetch(e,{mode:"cors"});if(a.ok){let i=await a.blob();if(i.type.startsWith("image/")){let n=await createImageBitmap(i),l=await Ee(n);n.close();let s=await pe(l);if(s&&s.length<=at)return{mediaType:"image/jpeg",base64:s,alt:t,source:e.slice(0,2e3)}}}}catch{return nt(o.parentElement||o)}return null}function io(o){return o.querySelectorAll("path, line, polyline, polygon, circle, rect, text, image").length>0}function so(o){try{let e=o.style.backgroundImage||(window.getComputedStyle?window.getComputedStyle(o).backgroundImage:"");if(e&&e.includes("url(")){let t=e.match(/url\(["']?([^"')]+)["']?\)/);if(t&&t[1]&&!t[1].startsWith("data:image/svg+xml"))return t[1]}}catch{}return null}async function it(o,e=!0){if(!e)return[];let t=[],a=0,i=35e5,n=(c,d)=>{if(!c||!c.base64||a+c.base64.length>i)return!1;let u=ao(d,o);return c.associatedLabel=u.associatedLabel,c.targetControlId=u.targetControlId,c.element=d,t.push(c),a+=c.base64.length,t.length>=ot},l=Array.from(o.querySelectorAll("img")).filter(c=>T(c)&&!$(c));for(let c of l)try{let d=await no(c);if(n(d,c))return t}catch{}let s=Array.from(o.querySelectorAll("svg")).filter(c=>{if(!T(c)||$(c))return!1;let d=typeof c.getBoundingClientRect=="function"?c.getBoundingClientRect():{width:0,height:0},u=d.width||parseFloat(c.getAttribute("width")||"0"),h=d.height||parseFloat(c.getAttribute("height")||"0");return u<30||h<30?!1:io(c)});for(let c of s)try{let d=await oo(c),u=await pe(d);if(u){let h={mediaType:"image/jpeg",base64:u,alt:c.getAttribute("aria-label")||"Gr\xE1fico/Diagrama vetorial da quest\xE3o",source:"svg"};if(n(h,c))return t}}catch{let d=await nt(c.parentElement||c);if(n(d,c))return t}if(t.length<ot){let c=Array.from(o.querySelectorAll("canvas")).filter(d=>T(d)&&!$(d));for(let d of c)try{let u=await Ee(d),h=await pe(u);if(h){let r={mediaType:"image/jpeg",base64:h,alt:d.getAttribute("aria-label")||"Gr\xE1fico Canvas inline",source:"canvas"};if(n(r,d))return t}}catch{let u=await nt(d.parentElement||d);if(n(u,d))return t}}if(t.length<ot){let c=Array.from(o.querySelectorAll('[style*="background-image"], .option-image, .question-media')).filter(d=>T(d)&&!$(d));for(let d of c){let u=so(d);if(u)try{let h=await fetch(u,{mode:"cors"});if(h.ok){let r=await h.blob();if(r.type.startsWith("image/")){let p=await createImageBitmap(r),g=await Ee(p);p.close();let v=await pe(g);if(v){let f={mediaType:"image/jpeg",base64:v,alt:"Imagem de fundo da alternativa",source:u.slice(0,2e3)};if(n(f,d))return t}}}}catch{}}}return t}function ro(o,e=""){if(typeof document>"u")return!1;let t=o||document.body,a=(e+" "+(t.textContent||"")).toLowerCase();return!!t.querySelector('.celebration-icon, [class*="celebrat" i], [class*="conclu" i], [class*="finish" i], [class*="result" i], [class*="score-screen" i], [data-testid*="completion" i]')&&(a.includes("parab\xE9ns")||a.includes("conclu")||a.includes("finaliz")||a.includes("resultado")||a.includes("pontua")||a.includes("sucesso")||a.includes("\u{1F3C6}"))?!0:["parab\xE9ns! lista de exerc\xEDcios conclu\xEDda","exerc\xEDcios conclu\xEDda","lista de exerc\xEDcios conclu\xEDda","atividade conclu\xEDda","atividade finalizada","finalizado com sucesso","finalizada com sucesso","simulado conclu\xEDdo","simulado finalizado","question\xE1rio conclu\xEDdo","question\xE1rio finalizado","voc\xEA concluiu a atividade","voc\xEA concluiu o question\xE1rio","sua resposta foi registrada","todas as perguntas foram respondidas","quiz completed","exercise completed","activity completed","all questions answered","view results"].some(l=>a.includes(l))}var $e=class{active=!1;timer=null;callbacks;lastRunTime=0;lastActionTime=0;isProcessing=!1;observer=null;mutationTimer=null;abortController=null;constructor(e){this.callbacks=e}isActive(){return this.active}start(){this.active||(this.active=!0,this.lastActionTime=Date.now(),this.callbacks.onStatusChange("waiting","> [SYS] Autopilot ENGAGED. Monitorando..."),typeof MutationObserver<"u"&&(this.observer=new MutationObserver(()=>{!this.active||this.isProcessing||(this.mutationTimer&&clearTimeout(this.mutationTimer),this.mutationTimer=window.setTimeout(()=>{this.mutationTimer=null,this.loop()},180))}),this.observer.observe(document.body,{subtree:!0,childList:!0,attributes:!0,characterData:!0})),this.loop())}stop(){if(this.active=!1,this.abortController){try{this.abortController.abort()}catch{}this.abortController=null}this.timer&&clearTimeout(this.timer),this.mutationTimer&&clearTimeout(this.mutationTimer),this.mutationTimer=null,this.observer?.disconnect(),this.observer=null,this.isProcessing=!1,this.callbacks.onStatusChange("idle","> [SYS] Autopilot DESATIVADO pelo usu\xE1rio.","text-yellow")}sleep(e){return new Promise(t=>{if(!this.active)return t();let a=null,i=()=>{a&&clearTimeout(a),t()};a=window.setTimeout(()=>{t()},e),this.abortController?.signal.addEventListener("abort",i,{once:!0})})}errorCount=0;lastPageSig="";samePageCount=0;async loop(){if(!this.active)return;let e=Date.now();if(e-this.lastRunTime<2500||this.isProcessing){this.timer=window.setTimeout(()=>this.loop(),500);return}this.lastRunTime=e;try{if(this.isProcessing=!0,!this.active)return;let t=xe(!1);if(t||(t=de()),!this.active)return;if(t){if(ro(t.scope,t.questionText)){this.callbacks.onStatusChange("idle","> [SYS] \u{1F3C6} Atividade conclu\xEDda detectada na p\xE1gina! Desligando Autopilot com sucesso.","text-green"),this.stop();return}let a=Et(t);if(a===this.lastPageSig)this.samePageCount++;else{let l=this.samePageCount>1;this.lastPageSig=a,this.samePageCount=1,l&&(this.callbacks.onStatusChange("waiting","> [SYS] Avan\xE7o de p\xE1gina detectado! Retomando monitoramento autom\xE1tico...","text-green"),this.callbacks.onPageAdvance?.())}if(this.callbacks.isManualModeActive?.()){this.callbacks.onStatusChange("waiting","> [SYS] Gabarito manual ativo na tela. Aguardando voc\xEA posicionar as respostas e avan\xE7ar a p\xE1gina...","text-yellow"),this.lastRunTime=Date.now();return}if(this.samePageCount>1&&(this.callbacks.onStatusChange("waiting",`> [AUTOPILOT] Resolu\xE7\xE3o pendente (${this.samePageCount}\xAA verifica\xE7\xE3o). Conclua e avance para prosseguir...`,"text-yellow"),await this.sleep(4e3),!this.active))return;let i=t.controls.filter(l=>l.role==="answer"),n=me(window.location.hostname);if(i.length>0){if(this.callbacks.onStatusChange("analyzing","> [IA] Quest\xE3o/Exerc\xEDcio detectado. Consultando IA...","text-blue"),await this.sleep(600),!this.active)return;this.abortController=new AbortController;let l=await this.callbacks.onRequestAnalysis(this.samePageCount,this.abortController.signal);if(this.abortController=null,!this.active)return;if(l){if(this.callbacks.onStatusChange("analyzing",`> [IA] (${l.usedModel||"gemini"}) Confian\xE7a: ${(l.confidence*100).toFixed(1)}% | Modo: ${l.mode}`,"text-blue"),this.callbacks.onStatusChange("analyzing",`> [IA] Racioc\xEDnio: ${l.rationale}`,"text-blue"),this.callbacks.onStatusChange("analyzing",`> [IA] A\xE7\xF5es geradas: ${l.actions.length}`,"text-blue"),this.errorCount=0,l.memoryToStore&&this.callbacks.onStatusChange("analyzing",`> [IA] \u{1F9E0} Mem\xF3ria RAG salva: "${l.memoryToStore}"`,"text-yellow"),l.pageType==="conclusion"){this.callbacks.onStatusChange("idle","> [SYS] Atividade conclu\xEDda! Desligando Autopilot.","text-green"),this.stop();return}}else{this.errorCount++;let s=this.errorCount===1?5e3:8e3;this.callbacks.onStatusChange("waiting",`> [AVISO] Falha na an\xE1lise (${this.errorCount}/3). Aguardando ${s/1e3}s para estabiliza\xE7\xE3o antes de tentar novamente...`,"text-yellow"),await this.sleep(s)}this.lastActionTime=Date.now()}else if(n.advanceSelector&&C(n.advanceSelector)&&t.questionText.length<50){let l=C(n.advanceSelector);if(l){if(this.callbacks.onStatusChange("advancing",`> [BRUTE] Avan\xE7ando via cache "${n.advanceSelector}"...`),await this.sleep(1e3),!this.active)return;O(l),this.lastActionTime=Date.now(),this.errorCount=0}}else{if(this.callbacks.onStatusChange("analyzing","> [IA] P\xE1gina informativa/contexto detectada. Lendo e consultando IA...","text-blue"),await this.sleep(600),!this.active)return;this.abortController=new AbortController;let l=await this.callbacks.onRequestAnalysis(this.samePageCount,this.abortController.signal);if(this.abortController=null,!this.active)return;if(l){if(this.callbacks.onStatusChange("analyzing",`> [IA] (${l.usedModel||"gemini"}) Tipo: ${l.pageType} | Modo: ${l.mode}`,"text-blue"),this.callbacks.onStatusChange("analyzing",`> [IA] Racioc\xEDnio: ${l.rationale}`,"text-blue"),l.memoryToStore&&this.callbacks.onStatusChange("analyzing",`> [IA] \u{1F9E0} Conte\xFAdo absorvido na mem\xF3ria: "${l.memoryToStore}"`,"text-yellow"),l.pageType==="info")this.callbacks.onStatusChange("advancing","> [IA] \u{1F4D6} Leitura conclu\xEDda. Avan\xE7ando automaticamente...","text-green"),await this.sleep(1800);else if(l.pageType==="start")this.callbacks.onStatusChange("advancing","> [SYS] In\xEDcio de m\xF3dulo detectado. Iniciando...","text-blue"),await this.sleep(1800);else if(l.pageType==="conclusion"){this.callbacks.onStatusChange("idle","> [SYS] Atividade conclu\xEDda! Desligando Autopilot.","text-green"),this.stop();return}this.errorCount=0}else{this.errorCount++;let s=this.errorCount===1?5e3:8e3;this.callbacks.onStatusChange("waiting",`> [AVISO] Falha ao processar p\xE1gina (${this.errorCount}/3). Aguardando ${s/1e3}s para estabiliza\xE7\xE3o antes de tentar novamente...`,"text-yellow"),await this.sleep(s)}this.lastActionTime=Date.now()}if(this.errorCount>=3){this.callbacks.onStatusChange("error","> [ERRO] 3 falhas consecutivas. Abortando Autopilot para poupar sua cota e tokens.","text-red"),this.callbacks.onStatusChange("waiting","> [DICA] Verifique a mensagem vermelha de [ERRO DETALHADO] no console acima para saber o motivo exato.","text-yellow"),this.stop();return}}else this.callbacks.onStatusChange("waiting","> [SYS] Monitorando p\xE1gina... Aguardando carregamento dos elementos.")}catch(t){if(!this.active)return;let a=t instanceof Error?t.message:String(t);if(a.includes("cancelada")||a.includes("aborted"))return;console.warn("[EasyQuiz Autopilot]",t),this.callbacks.onStatusChange("error",`> [ERRO NO AUTOPILOT] ${a}`,"text-red")}finally{this.abortController=null,this.isProcessing=!1}this.active&&(this.timer=window.setTimeout(()=>this.loop(),1e3))}};var q={logo:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.8L19.2 8 12 11.2 4.8 8 12 4.8zM4 9.6l7 3.1v7.5l-7-3.5V9.6zm9 10.6v-7.5l7-3.1v7.1l-7 3.5z"/></svg>',rocket:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M13.13 2.81a.5.5 0 0 0-.46-.07c-.42.15-2.08.79-3.9 2.61-2.04 2.04-2.6 4.09-2.73 4.96l-.97.98a1 1 0 0 0-.29.71v2.12a1 1 0 0 0 .29.71l2.83 2.83a1 1 0 0 0 .71.29h2.12a1 1 0 0 0 .71-.29l.98-.97c.87-.13 2.92-.69 4.96-2.73 1.82-1.82 2.46-3.48 2.61-3.9a.5.5 0 0 0-.07-.46l-6.79-6.79zM4.5 16.5l-2.09 2.09a.5.5 0 0 0 .35.85h3.04l.35.35v3.04a.5.5 0 0 0 .85.35L9.09 21.1l-4.59-4.6z"/></svg>',play:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>',stop:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h12v12H6z"/></svg>',code:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>',terminal:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8h16v10zm-12-3l3-3-3-3 1.4-1.4L13.8 12l-4.4 4.4L8 15zm6 0h4v2h-4v-2z"/></svg>',inspector:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>',settings:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.49.49 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>',key:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M7 14c-2.76 0-5-2.24-5-5s2.24-5 5-5c2.42 0 4.44 1.72 4.9 4H22v4h-2v3h-3v-3h-2v3h-3v-3h-2.1c-.46 2.28-2.48 4-4.9 4zm0-7c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>',paste:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 2h-4.18C14.4 .84 13.3 0 12 0c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm7 18H5V4h2v3h10V4h2v16z"/></svg>',edit:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>',trash:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>',eraser:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M15.14 3c-.51 0-1.02.2-1.41.59L2.59 14.73c-.78.78-.78 2.05 0 2.83L6.44 21.4c.78.78 2.05.78 2.83 0l11.14-11.14c.78-.78.78-2.05 0-2.83l-3.86-3.84c-.39-.39-.9-.59-1.41-.59zm.71 2.71l3.15 3.15-3.15 3.15-3.15-3.15 3.15-3.15zm-4.57 4.57l3.15 3.15-4.57 4.57H6.71l-3-3 7.57-7.57z"/></svg>',save:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/></svg>',analyze:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L3 14h8l-2 8 12-12h-8l2-8z"/></svg>',apply:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>',close:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>',chevronRight:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>',chevronLeft:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>',eye:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>',eyeOff:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.44-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.17c0-1.66-1.34-3-3-3l-.17.02z"/></svg>',check:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>',clock:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>',copy:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>',refresh:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg>',chip:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4h12v16H6V4zm2 2v12h8V6H8zm-4 3h2v2H4V9zm0 4h2v2H4v-2zm16-4h2v2h-2V9zm0 4h2v2h-2v-2zM9 2h2v2H9V2zm4 0h2v2h-2V2zm-4 18h2v2H9v-2zm4 0h2v2h-2v-2z"/></svg>',moreVertical:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>',minimize:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M19 13H5v-2h14v2z"/></svg>',maximize:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/></svg>',dragHandle:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M10 9h4V6h-4v3zm0 5h4v-3h-4v3zm0 5h4v-3h-4v3zM4 9h4V6H4v3zm0 5h4v-3H4v3zm0 5h4v-3H4v3zm12-10V6h4v3h-4zm0 5h4v-3h-4v3zm0 5h4v-3h-4v3z"/></svg>',list:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/></svg>',folderTree:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6 10H6v-2h8v2zm4-4H6v-2h12v2z"/></svg>',folder:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/></svg>',file:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>',stopwatch:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M15 1H9v2h6V1zm-4 13h2V8h-2v6zm8.03-6.61l1.42-1.42c-.43-.51-.9-.99-1.41-1.41l-1.42 1.42A8.962 8.962 0 0 0 12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9a8.994 8.994 0 0 0 7.03-14.61zM12 20c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"/></svg>',plus:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>',sparkles:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M9 21l-2.5-5.5L1 13l5.5-2.5L9 5l2.5 5.5L17 13l-5.5 2.5L9 21zm9.5-12.5l-1.5-3.5-3.5-1.5 3.5-1.5 1.5-3.5 1.5 3.5 3.5 1.5-3.5 1.5-1.5 3.5z"/></svg>'};var Pe=class{element=null;shadow;isMinimized=!1;currentPlan=null;isDragging=!1;dragStartX=0;dragStartY=0;initialLeft=25;initialTop=25;onAdvanceCallback;constructor(e,t){this.shadow=e,this.onAdvanceCallback=t,this.initGlobalListeners()}initGlobalListeners(){window.addEventListener("popstate",()=>this.handlePageNavigated()),window.addEventListener("hashchange",()=>this.handlePageNavigated()),document.addEventListener("click",e=>{if(!this.isOpen())return;let t=e.target;if(!t||this.shadow.contains(t)||t.closest("#easyquiz-shadow-root"))return;let a=t.closest('button, [role="button"], a, input[type="submit"]');if(a){let i=(a.textContent||a.value||"").toLowerCase();/pr[oó]xim|avan[cç]|continu|verific|enviar|submit|confirm|checar|validar|next/i.test(i)&&setTimeout(()=>{this.isOpen()&&this.handlePageNavigated()},800)}},!0)}handlePageNavigated(){this.isOpen()&&(this.hide(),this.onAdvanceCallback?.())}isOpen(){return this.element!==null&&this.element.style.display!=="none"}show(e){this.currentPlan=e,this.element||this.createElement(),this.renderContent(),this.element&&(this.element.style.display="flex")}hide(){this.element&&(this.element.style.display="none")}minimize(){this.isMinimized=!0,this.element&&this.element.classList.add("minimized")}restore(){this.isMinimized=!1,this.element&&this.element.classList.remove("minimized")}createElement(){this.element=document.createElement("div"),this.element.className="eq-floating-hud",this.element.style.left=`${this.initialLeft}px`,this.element.style.top=`${this.initialTop}px`,this.element.innerHTML=`
      <!-- P\xEDlula compacta quando minimizado -->
      <div class="eq-fah-pill" id="eq-fah-pill" title="Clique para expandir gabarito interativo">
        <span class="eq-fah-pill-icon">${q.list}</span>
        <span id="eq-fah-pill-text">Gabarito Manual</span>
        <span class="eq-fah-pill-badge" id="eq-fah-pill-badge">0</span>
      </div>

      <!-- Cabe\xE7alho com barra de arraste -->
      <div class="eq-fah-header" id="eq-fah-header">
        <div class="eq-fah-title">
          <span style="display:flex; align-items:center;">${q.dragHandle}</span>
          <span>Gabarito Manual Interativo</span>
        </div>
        <div class="eq-fah-actions">
          <button class="eq-fah-btn" id="eq-fah-copy-md-btn" title="Copiar tudo formatado em Markdown">${q.copy}</button>
          <button class="eq-fah-btn" id="eq-fah-min-btn" title="Minimizar para p\xEDlula flutuante">${q.minimize}</button>
          <button class="eq-fah-btn" id="eq-fah-close-btn" title="Fechar gabarito">${q.close}</button>
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
    `,this.shadow.appendChild(this.element),this.element.querySelector("#eq-fah-pill").addEventListener("click",()=>this.restore()),this.element.querySelector("#eq-fah-min-btn").addEventListener("click",()=>this.minimize()),this.element.querySelector("#eq-fah-close-btn").addEventListener("click",()=>this.hide());let i=this.element.querySelector("#eq-fah-copy-md-btn");i.addEventListener("click",()=>this.copyMarkdownToClipboard(i));let n=this.element.querySelector("#eq-fah-copy-all-btn");n.addEventListener("click",()=>this.copyMarkdownToClipboard(n));let l=this.element.querySelector("#eq-fah-header");this.setupDraggable(l)}setupDraggable(e){let t=a=>{if(a.target.closest(".eq-fah-btn"))return;a.preventDefault(),this.isDragging=!0,this.dragStartX=a.clientX,this.dragStartY=a.clientY;let i=this.element.getBoundingClientRect();this.initialLeft=i.left,this.initialTop=i.top;let n=s=>{if(!this.isDragging||!this.element)return;let c=s.clientX-this.dragStartX,d=s.clientY-this.dragStartY,u=Math.max(10,window.innerWidth-this.element.offsetWidth-10),h=Math.max(10,window.innerHeight-this.element.offsetHeight-10),r=Math.min(Math.max(10,this.initialLeft+c),u),p=Math.min(Math.max(10,this.initialTop+d),h);this.element.style.left=`${r}px`,this.element.style.top=`${p}px`},l=()=>{this.isDragging=!1,window.removeEventListener("mousemove",n),window.removeEventListener("mouseup",l)};window.addEventListener("mousemove",n),window.addEventListener("mouseup",l)};e.addEventListener("mousedown",t)}renderContent(){if(!this.element||!this.currentPlan)return;let e=this.element.querySelector("#eq-fah-body"),t=this.element.querySelector("#eq-fah-pill-text"),a=this.element.querySelector("#eq-fah-pill-badge");e.innerHTML="";let i=this.currentPlan,n=i.actions.filter(p=>p.t==="drag"),l=i.actions.filter(p=>{if(p.t!=="val")return!1;let g=b(p.id||"").toLowerCase();return!/continu|avan[cç]|pr[oó]xim|submet|enviar|check|verific/i.test(g)}),s=i.actions.filter(p=>p.t==="clk"||p.t==="chk"),c=i.actions.filter(p=>p.t==="sel"),d=n.length||l.length||s.length||c.length,u=document.createElement("div");u.className="eq-fah-meta";let h=document.createElement("span");h.textContent=`Modo: ${i.mode.replace("_"," ")}`;let r=document.createElement("span");if(r.className="eq-fah-meta-badge",r.textContent=`${Math.round(i.confidence*100)}% Confian\xE7a`,u.append(h,r),e.appendChild(u),n.length>0||i.mode==="categorizacao"||i.mode==="arrastar_soltar"){t.textContent=`Categoriza\xE7\xE3o (${n.length} itens)`,a.textContent=String(n.length);let p={};for(let g of n){let v=b(g.to)||"Geral";p[v]||(p[v]=[]),p[v].push(b(g.from))}for(let[g,v]of Object.entries(p)){let f=document.createElement("div"),m=/fato|true|verdadeiro|sim/i.test(g),x=/opini[aã]o|false|falso|n[aã]o/i.test(g);f.className=`eq-fah-group ${m?"group-fato":x?"group-opiniao":""}`;let w=document.createElement("div");w.className="eq-fah-group-title",w.textContent=`\u{1F4C1} ${g} (${v.length})`,f.appendChild(w);let y=document.createElement("div");y.className="eq-fah-group-items";for(let E of v){let L=document.createElement("div");L.className="eq-fah-item";let M=document.createElement("span");M.className="eq-fah-item-text",M.textContent=E,L.appendChild(M);let A=document.createElement("button");A.className="eq-fah-copy-inline",A.textContent="Copiar",A.addEventListener("click",()=>{navigator.clipboard.writeText(E),A.textContent="\u2713 Copiado",setTimeout(()=>A.textContent="Copiar",1200)}),L.appendChild(A),y.appendChild(L)}f.appendChild(y),e.appendChild(f)}}else if(l.length>0){t.textContent=`Preenchimento (${l.length} campos)`,a.textContent=String(l.length);let p=document.createElement("div");p.className="eq-fah-group";let g=document.createElement("div");g.className="eq-fah-group-title",g.textContent="\u{1F4DD} Respostas para os Campos de Texto:",p.appendChild(g);let v=document.createElement("div");v.className="eq-fah-group-items";for(let f=0;f<l.length;f++){let m=l[f],x=document.createElement("div");x.className="eq-fah-item";let w=we(m.id);(!w||/^[#\.\$]|input|mat-|cell|field|q[0-9]|eq-/i.test(w))&&(w=`Campo ${f+1}`);let y=String(m.v??""),E=document.createElement("div");E.className="eq-fah-field-box";let L=document.createElement("div");L.className="eq-fah-field-label",L.textContent=w,E.appendChild(L);let M=document.createElement("div");M.className="eq-fah-field-val",M.textContent=y,E.appendChild(M),x.appendChild(E);let A=document.createElement("button");A.className="eq-fah-copy-inline",A.textContent="Copiar",A.addEventListener("click",()=>{navigator.clipboard.writeText(y),A.textContent="\u2713 Copiado",setTimeout(()=>A.textContent="Copiar",1200)}),x.appendChild(A),v.appendChild(x)}p.appendChild(v),e.appendChild(p)}else if(s.length>0){t.textContent=`Op\xE7\xF5es (${s.length} marcadas)`,a.textContent=String(s.length);let p=document.createElement("div");p.className="eq-fah-group";let g=document.createElement("div");g.className="eq-fah-group-title",g.textContent="\u{1F3AF} Alternativa(s) Correta(s):",p.appendChild(g);let v=document.createElement("div");v.className="eq-fah-group-items";for(let f=0;f<s.length;f++){let m=s[f],x=document.createElement("div");x.className="eq-fah-item";let w=we(m.id);(!w||/^(eq-|#|\$|\.|input_|mat-|choice_|radio_|chk_)/i.test(w))&&m.v&&(w=String(m.v)),w=b(w),/^(eq-|#|\$|\.|input_|mat-|choice_|radio_|chk_)/i.test(w)&&(w="");let y="",E=w.match(/^(\([A-Za-z0-9]\)|[A-Za-z0-9][\)\.\:\-])\s*(.*)$/);E?(y=E[1].replace(/[\(\)\.\:\-\s]/g,"").toUpperCase(),w=E[2].trim()||w):s.length>1&&(y=String.fromCharCode(65+f));let L=document.createElement("div");if(L.style.display="flex",L.style.alignItems="center",L.style.gap="8px",L.style.flex="1",y){let K=document.createElement("span");K.className="eq-fah-letter-badge",K.textContent=y,L.appendChild(K)}let M=document.createElement("span");M.className="eq-fah-item-text",M.textContent=w||(y?`Alternativa ${y}`:"Alternativa Selecionada"),L.appendChild(M),x.appendChild(L);let A=document.createElement("button");A.className="eq-fah-copy-inline",A.textContent="Copiar",A.addEventListener("click",()=>{navigator.clipboard.writeText(w||y),A.textContent="\u2713 Copiado",setTimeout(()=>A.textContent="Copiar",1200)}),x.appendChild(A),v.appendChild(x)}p.appendChild(v),e.appendChild(p)}else if(c.length>0){t.textContent=`Sele\xE7\xE3o (${c.length} listas)`,a.textContent=String(c.length);let p=document.createElement("div");p.className="eq-fah-group";let g=document.createElement("div");g.className="eq-fah-group-title",g.textContent="\u{1F4CB} Op\xE7\xF5es para Selecionar na Lista:",p.appendChild(g);let v=document.createElement("div");v.className="eq-fah-group-items";for(let f=0;f<c.length;f++){let m=c[f],x=document.createElement("div");x.className="eq-fah-item";let w=we(m.id);(!w||/^[#\.\$]|select|input|mat-|cell|field|q[0-9]|eq-/i.test(w))&&(w=`Lista ${f+1}`);let L=(Array.isArray(m.v)?m.v:[String(m.v??"")]).map(ne=>{let P=C(m.id,void 0,!0)||C(b(m.id),void 0,!0),I=P instanceof HTMLSelectElement?P:P?.querySelector("select");if(I){let j=b(ne).toLowerCase();for(let ie=0;ie<I.options.length;ie++){let X=I.options[ie];if(X.value.toLowerCase()===j||b(X.textContent).toLowerCase()===j){let W=b(X.textContent);if(W&&!W.toLowerCase().includes("selecione"))return W}}}return ne}).join(", "),M=document.createElement("div");M.className="eq-fah-field-box";let A=document.createElement("div");A.className="eq-fah-field-label",A.textContent=w,M.appendChild(A);let K=document.createElement("div");K.className="eq-fah-field-val",K.textContent=L,M.appendChild(K),x.appendChild(M);let F=document.createElement("button");F.className="eq-fah-copy-inline",F.textContent="Copiar",F.addEventListener("click",()=>{navigator.clipboard.writeText(L),F.textContent="\u2713 Copiado",setTimeout(()=>F.textContent="Copiar",1200)}),x.appendChild(F),v.appendChild(x)}p.appendChild(v),e.appendChild(p)}else{t.textContent="Gabarito",a.textContent="0";let p=document.createElement("div");p.style.padding="10px",p.style.color="#888",p.textContent="Nenhuma resposta direta para exibir.",e.appendChild(p)}if(i.rationale){let p=document.createElement("div");p.className="eq-fah-rationale",p.textContent=`\u{1F4A1} Racioc\xEDnio da IA: ${i.rationale}`,e.appendChild(p)}}generateMarkdown(){if(!this.currentPlan)return"";let e=this.currentPlan,t=[];t.push("# Gabarito da Quest\xE3o \u2014 EasyQuiz Pro"),t.push(`- **Modo:** ${e.mode}`),t.push(`- **Confian\xE7a:** ${(e.confidence*100).toFixed(0)}%`),t.push("");let a=e.actions.filter(s=>s.t==="drag"),i=e.actions.filter(s=>s.t==="val"),n=e.actions.filter(s=>s.t==="clk"||s.t==="chk"),l=e.actions.filter(s=>s.t==="sel");if(a.length>0){t.push("## \u{1F4C2} Categoriza\xE7\xE3o:");let s={};for(let c of a){let d=b(c.to)||"Geral";s[d]||(s[d]=[]),s[d].push(b(c.from))}for(let[c,d]of Object.entries(s)){t.push(`### Categoria: ${c}`);for(let u of d)t.push(`- ${u}`);t.push("")}}else if(i.length>0){t.push("## \u270F\uFE0F Respostas para Preenchimento:");for(let s of i){let c=b(s.id);t.push(`- **${c||"Campo"}:** \`${s.v}\``)}t.push("")}else if(n.length>0){t.push("## \u2705 Alternativas Corretas:");for(let s=0;s<n.length;s++){let c=n[s],d=we(c.id);(!d||/^(eq-|#|\$|\.|input_|mat-|choice_|radio_|chk_)/i.test(d))&&c.v&&(d=String(c.v)),d=b(d),/^(eq-|#|\$|\.|input_|mat-|choice_|radio_|chk_)/i.test(d)&&(d="");let u=n.length>1?`${String.fromCharCode(65+s)}) `:"";t.push(`- [x] ${u}${d||"Alternativa "+String.fromCharCode(65+s)}`)}t.push("")}else if(l.length>0){t.push("## \u{1F4CB} Op\xE7\xF5es Selecionadas em Lista:");for(let s of l){let c=b(s.id)||"Lista",d=Array.isArray(s.v)?s.v.join(", "):String(s.v??"");t.push(`- **${c}:** \`${d}\``)}t.push("")}return e.rationale&&(t.push("---"),t.push(`**\u{1F4A1} Racioc\xEDnio:** ${e.rationale}`)),t.join(`
`)}copyMarkdownToClipboard(e){let t=this.generateMarkdown();t&&navigator.clipboard.writeText(t).then(()=>{let a=e.innerHTML;e.id==="eq-fah-copy-md-btn"?e.innerHTML='<span style="font-size:10px; color:#00ffcc; font-weight:bold;">\u2713</span>':e.innerHTML="\u2713 Copiado!",setTimeout(()=>{e.innerHTML=a},1500)})}};var kt=`
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
    border-radius: 6px;
    padding: 6px 10px;
    gap: 8px;
    transition: border-color 0.15s, background 0.15s;
  }

  .eq-key-item:hover {
    border-color: rgba(0, 255, 204, 0.4);
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
    font-family: monospace;
    font-size: 12px;
    color: var(--eq-muted);
    letter-spacing: 0.5px;
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
    background: rgba(0, 255, 136, 0.12);
    color: #00ff88;
    border: 1px solid rgba(0, 255, 136, 0.3);
  }

  .eq-key-badge.cooldown {
    background: rgba(255, 204, 0, 0.15);
    color: #ffcc00;
    border: 1px solid rgba(255, 204, 0, 0.4);
  }

  .eq-key-badge.invalid {
    background: rgba(255, 68, 68, 0.12);
    color: #ff4444;
    border: 1px solid rgba(255, 68, 68, 0.3);
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
`;var lo=[{value:"",label:"Detec\xE7\xE3o Autom\xE1tica"},{value:"escolha_unica",label:"M\xFAltipla Escolha (\xDAnica)"},{value:"escolha_multipla",label:"M\xFAltipla Escolha (V\xE1rias)"},{value:"categorizacao",label:"Categoriza\xE7\xE3o / Grupos"},{value:"arrastar_soltar",label:"Arrastar e Soltar (Drag & Drop)"},{value:"ordenacao",label:"Ordena\xE7\xE3o / Sequ\xEAncia"},{value:"verdadeiro_falso",label:"Verdadeiro / Falso"},{value:"texto_livre",label:"Texto Livre / Dissertativa"},{value:"preenchimento",label:"Preenchimento de Lacunas"}],co=[{value:"smart",label:"Inteligente (Auto-H\xEDbrido)"},{value:"command",label:"Apenas Comando (Seguro)"},{value:"javascript",label:"Apenas JS Nativo (Avan\xE7ado)"}],Re=class{host;shadow;callbacks;autopilot;floatingAnswers;initialSettings;isCollapsed=!1;activeTab="resolver";isBusy=!1;stopwatchInterval=null;stopwatchStartTime=0;latestPlan=null;latestContext=null;latestPromptText="";metricsLiveTime;metricsLiveStatus;metricsTotalBadge;metricTotalTime;metricAvgTime;metricTotalCount;metricsHistoryList;metricsHistoryCount;metricsCopyBtn;metricsResetBtn;currentQuestionStartTime=0;questionLiveTimerInterval=null;liveDebugTerminal;dbgModel;dbgLatency;dbgSplitTokens;dbgTotalTokens;dbgErrorCard;dbgErrorText;dbgPromptLen;dbgPromptView;dbgContextView;dbgRawRespView;dbgCountAll;dbgCountError;dbgCountAi;dbgCountDom;logEntries=[];activeLogFilter="all";autoScrollLogs=!0;lastErrorMsg=null;progressContainer;progressBar;progressLabel;progressVal;contextTreeContainer;launcherBtn;launcherDot;dockToggleBtn;sidebarEl;apToggleBtn;apConsole;executionConsole;dotPulseAp;statusTextAp;stopwatchAp;dotPulseAdv;statusTextAdv;stopwatchAdv;inspModel;inspLatency;inspTokens;inspPrompt;inspRationale;inspActions;copyPromptBtn;apiKeyInput;keyContextMenu;keyMoreBtn;keysListEl;keysBadgeEl;modelSelect;modeSelect;engineSelect;dryRunCheckbox;autoApplyCheckbox;autoAdvanceCheckbox;hostDarkModeCheckbox;useVisionCheckbox;analyzeBtn;applyBtn;resultContainer;constructor(e,t){this.initialSettings=e,this.callbacks=t,this.autopilot=new $e({onStatusChange:(s,c,d)=>{this.logToConsole(c,d),s==="analyzing"?this.setBusy(!0,"Autopilot: IA analisando..."):s==="advancing"||s==="waiting"?(this.setBusy(!1),this.updateAutopilotUi(!0)):s==="idle"?(this.setBusy(!1),this.updateAutopilotUi(!1),c.includes("conclus\xE3o")||c.includes("finalizada")||c.includes("Parab\xE9ns")?this.setStatus("Atividade conclu\xEDda com sucesso! Autopilot finalizado.","success"):this.setStatus("Autopilot desativado.","info")):s==="error"&&(this.setBusy(!1),this.updateAutopilotUi(!1),this.setStatus("Autopilot interrompido por erro.","error"))},onRequestAnalysis:async(s,c)=>{try{return await this.callbacks.onAnalyze(s,c)||null}catch{return null}},isManualModeActive:()=>this.floatingAnswers?.isOpen()??!1,onPageAdvance:()=>{this.floatingAnswers?.hide()}}),this.host=document.createElement("div"),this.host.id="easyquiz-shadow-root",this.host.style.position="fixed",this.host.style.top="0",this.host.style.left="0",this.host.style.width="100vw",this.host.style.height="100vh",this.host.style.zIndex="2147483647",this.host.style.pointerEvents="none",this.shadow=this.host.attachShadow({mode:"open"}),this.shadow.innerHTML=`
      <style>${kt}</style>

      <!-- Bot\xE3o Flutuante Inferior Renovado (C\xE1psula com Status ao Vivo) -->
      <button class="eq-launcher" type="button" title="Abrir / Recolher EasyQuiz (Alt+Q)">
        <span class="eq-launcher-icon">${q.logo}</span>
        <span>EasyQuiz</span>
        <span class="eq-launcher-dot" id="eq-launcher-dot"></span>
      </button>

      <!-- Sidebar Fixa Lateral Direita Estilo VS Code -->
      <aside class="eq-sidebar" aria-label="EasyQuiz Sidebar">
        <!-- Aba Retr\xE1til na Borda Esquerda -->
        <button class="eq-dock-toggle" id="eq-dock-toggle" type="button" title="Recolher / Expandir Painel (Alt+Q)">
          <span class="eq-dock-toggle-icon">${q.chevronRight}</span>
          <span class="eq-dock-toggle-label">EQ</span>
        </button>
           <!-- Activity Bar Vertical na Esquerda (Estilo VS Code - Apenas \xCDcones) -->
          <nav class="eq-activity-bar" role="tablist" aria-label="Atalhos">
            <div class="eq-activity-top">
              <button class="eq-activity-btn active" id="eq-tab-resolver" role="tab" title="Resolver (Opera\xE7\xF5es Atuais)">
                <span class="eq-activity-indicator"></span>
                <span class="eq-activity-icon">${q.rocket}</span>
              </button>

              <button class="eq-activity-btn" id="eq-tab-brain" role="tab" title="C\xE9rebro da IA (Contexto e Inspe\xE7\xE3o)">
                <span class="eq-activity-indicator"></span>
                <span class="eq-activity-icon">${q.chip}</span>
              </button>

              <button class="eq-activity-btn" id="eq-tab-metrics" role="tab" title="M\xE9tricas & Cron\xF4metro (Tempo por Quest\xE3o e Hist\xF3rico)">
                <span class="eq-activity-indicator"></span>
                <span class="eq-activity-icon">${q.stopwatch}</span>
              </button>

              <button class="eq-activity-btn" id="eq-tab-debug" role="tab" title="Terminal & Debug Output (Logs, Tokens, Prompts, Erros)">
                <span class="eq-activity-indicator"></span>
                <span class="eq-activity-icon">${q.terminal}</span>
              </button>
            </div>

            <div class="eq-activity-bottom">
              <button class="eq-activity-btn" id="eq-tab-settings" role="tab" title="Configura\xE7\xF5es e Ajustes Avan\xE7ados">
                <span class="eq-activity-indicator"></span>
                <span class="eq-activity-icon">${q.settings}</span>
              </button>
            </div>
          </nav>

          <!-- Corpo Principal da Sidebar -->
          <main class="eq-sidebar-body">
            <!-- Cabe\xE7alho VS Code -->
            <header class="eq-header">
              <div class="eq-brand">
                <span class="eq-brand-icon">${q.logo}</span>
                <span class="eq-brand-name">EasyQuiz</span>
                <span class="eq-brand-badge">2.0 SUPREME</span>
              </div>
              <div class="eq-header-tools">
                <button class="eq-icon-btn" id="eq-min-btn" type="button" title="Minimizar (Alt+Q)">${q.chevronRight}</button>
                <button class="eq-icon-btn" id="eq-close-btn" type="button" title="Fechar">${q.close}</button>
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
                  <button class="eq-btn-primary" id="eq-analyze-btn" type="button">${q.analyze} Analisar quest\xE3o</button>
                  <button class="eq-btn-secondary" id="eq-apply-btn" type="button">${q.apply} Aplicar respostas</button>
                </div>

                <div style="display: flex; gap: 8px; width: 100%; align-items: center;">
                  <button class="eq-btn-primary" id="eq-ap-toggle-btn" type="button" style="flex: 1;">
                    ${q.play} INICIAR AUTOPILOT
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
                  <button class="eq-btn-secondary" id="eq-open-hud-btn" type="button">${q.list} Abrir respostas dispon\xEDveis</button>
                </div>

                <!-- Status & Stopwatch Card -->
                <div class="eq-status-card">
                  <div class="eq-status-card-header">
                    <div class="eq-ai-indicator">
                      <span class="eq-dot-pulse" id="eq-dot-ap"></span>
                      <span>Status da IA</span>
                    </div>
                    <div class="eq-stopwatch" id="eq-stopwatch-ap">
                      ${q.clock} <span>0.00s</span>
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
                      ${q.refresh}
                    </button>
                    <button class="eq-icon-btn" id="eq-ap-clear-memory" type="button" title="Limpar Mem\xF3ria Contextual (RAG)" style="width: 28px; height: 28px; color: #ff5555;">
                      ${q.eraser}
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
                      ${q.copy} Copiar
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
                    ${q.copy} Copiar Relat\xF3rio
                  </button>
                  <button class="eq-btn-secondary danger" id="eq-metrics-reset-btn" type="button">
                    ${q.trash} Zerar M\xE9tricas
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
                      ${q.copy}
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
                        ${q.copy}
                      </button>
                      <button class="eq-icon-btn" id="eq-dbg-clear-logs" type="button" title="Limpar Console" style="width: 26px; height: 26px; color: #ff5555;">
                        ${q.eraser}
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
                        ${q.copy} Copiar
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
                      ${q.copy} Copiar JSON
                    </button>
                  </div>
                  <div class="eq-code-block" id="eq-dbg-context-view" style="max-height: 110px;">Aguardando captura de contexto...</div>
                </div>

                <!-- Resposta Bruta da IA -->
                <div class="eq-field-group">
                  <div class="eq-section-title">
                    <span>Resposta Bruta da IA (Raw Output)</span>
                    <button class="eq-btn-secondary" id="eq-dbg-copy-raw-resp" type="button" style="height: 24px; padding: 0 6px; font-size: 10px;">
                      ${q.copy} Copiar Resposta
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
                  <div class="eq-section-title">
                    <span>Chaves Gemini (Multi-Key Inteligente)</span>
                    <div style="display: flex; gap: 8px; align-items: center;">
                      <span id="eq-keys-badge" class="eq-key-badge ready">1 ativa</span>
                      <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" style="color: #00ffcc; text-decoration: none; font-size: 11px; font-weight: 700;">
                        Obter Gr\xE1tis \u2197
                      </a>
                    </div>
                  </div>

                  <!-- Lista Din\xE2mica de Chaves Cadastradas -->
                  <div id="eq-keys-list" class="eq-keys-list"></div>

                  <!-- Formul\xE1rio de Adi\xE7\xE3o de Nova Chave -->
                  <div class="eq-key-input-container">
                    <div class="eq-input-wrap">
                      <span class="eq-input-prefix-icon">${q.key}</span>
                      <input id="eq-api-key" class="eq-input" type="password" placeholder="Adicionar nova chave AIzaSy..." autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" />
                      <button class="eq-icon-btn" id="eq-key-save" type="button" title="Adicionar Chave">${q.plus}</button>
                      <button class="eq-icon-btn" id="eq-key-more-btn" type="button" title="Mais Op\xE7\xF5es das Chaves">${q.moreVertical}</button>
                    </div>

                    <!-- Context Menu Suspenso Din\xE2mico -->
                    <div class="eq-context-menu" id="eq-key-context-menu" hidden>
                      <button class="eq-context-item" id="eq-menu-prompt" type="button">
                        <span class="eq-item-icon">${q.edit}</span>
                        <span class="eq-item-text">Inserir via Janela Nativa</span>
                        <span class="eq-item-badge">Bypass</span>
                      </button>
                      <button class="eq-context-item" id="eq-menu-paste" type="button">
                        <span class="eq-item-icon">${q.paste}</span>
                        <span class="eq-item-text">Colar da \xC1rea de Transfer\xEAncia</span>
                      </button>
                      <button class="eq-context-item" id="eq-menu-toggle-vis" type="button">
                        <span class="eq-item-icon" id="eq-menu-vis-icon">${q.eye}</span>
                        <span class="eq-item-text" id="eq-menu-vis-text">Mostrar/Ocultar Campo</span>
                      </button>
                      <button class="eq-context-item" id="eq-menu-clear" type="button">
                        <span class="eq-item-icon">${q.eraser}</span>
                        <span class="eq-item-text">Limpar Campo</span>
                      </button>
                      <div class="eq-context-divider"></div>
                      <button class="eq-context-item" id="eq-menu-test" type="button">
                        <span class="eq-item-icon">${q.sparkles}</span>
                        <span class="eq-item-text">Testar Todas as Chaves</span>
                      </button>
                      <button class="eq-context-item danger" id="eq-menu-reset" type="button">
                        <span class="eq-item-icon">${q.trash}</span>
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
                    ${q.trash} Resetar Todos os Dados e Mem\xF3ria
                  </button>
                </div>

                <div class="eq-footer-note" style="margin-top: auto;">Configura\xE7\xF5es salvas localmente no navegador</div>
              </div>
            </div>
          </main>
        </aside>
    `,this.launcherBtn=this.shadow.querySelector(".eq-launcher"),this.launcherDot=this.shadow.querySelector("#eq-launcher-dot"),this.dockToggleBtn=this.shadow.querySelector("#eq-dock-toggle"),this.sidebarEl=this.shadow.querySelector(".eq-sidebar"),this.apToggleBtn=this.shadow.querySelector("#eq-ap-toggle-btn"),this.apConsole=this.shadow.querySelector("#eq-ap-console"),this.executionConsole=this.shadow.querySelector("#eq-execution-console"),this.progressContainer=this.shadow.querySelector("#eq-progress-container"),this.progressBar=this.shadow.querySelector("#eq-progress-bar"),this.progressLabel=this.shadow.querySelector("#eq-progress-label"),this.progressVal=this.shadow.querySelector("#eq-progress-val"),this.contextTreeContainer=this.shadow.querySelector("#eq-tree-container"),this.dotPulseAp=this.shadow.querySelector("#eq-dot-ap"),this.statusTextAp=this.shadow.querySelector("#eq-status-text-ap"),this.stopwatchAp=this.shadow.querySelector("#eq-stopwatch-ap span"),this.dotPulseAdv=this.dotPulseAp,this.statusTextAdv=this.statusTextAp,this.stopwatchAdv=this.stopwatchAp,this.inspModel=this.shadow.querySelector("#eq-insp-model"),this.inspLatency=this.shadow.querySelector("#eq-insp-latency"),this.inspTokens=this.shadow.querySelector("#eq-insp-tokens"),this.inspPrompt=this.shadow.querySelector("#eq-insp-prompt"),this.inspRationale=this.shadow.querySelector("#eq-insp-rationale"),this.inspActions=this.shadow.querySelector("#eq-insp-actions"),this.copyPromptBtn=this.shadow.querySelector("#eq-copy-prompt-btn"),this.liveDebugTerminal=this.shadow.querySelector("#eq-live-debug-terminal"),this.dbgModel=this.shadow.querySelector("#eq-dbg-model"),this.dbgLatency=this.shadow.querySelector("#eq-dbg-latency"),this.dbgSplitTokens=this.shadow.querySelector("#eq-dbg-split-tokens"),this.dbgTotalTokens=this.shadow.querySelector("#eq-dbg-total-tokens"),this.dbgErrorCard=this.shadow.querySelector("#eq-dbg-error-card"),this.dbgErrorText=this.shadow.querySelector("#eq-dbg-error-text"),this.dbgPromptLen=this.shadow.querySelector("#eq-dbg-prompt-len"),this.dbgPromptView=this.shadow.querySelector("#eq-dbg-prompt-view"),this.dbgContextView=this.shadow.querySelector("#eq-dbg-context-view"),this.dbgRawRespView=this.shadow.querySelector("#eq-dbg-raw-resp-view"),this.dbgCountAll=this.shadow.querySelector("#eq-dbg-count-all"),this.dbgCountError=this.shadow.querySelector("#eq-dbg-count-error"),this.dbgCountAi=this.shadow.querySelector("#eq-dbg-count-ai"),this.dbgCountDom=this.shadow.querySelector("#eq-dbg-count-dom"),this.apiKeyInput=this.shadow.querySelector("#eq-api-key"),this.keyContextMenu=this.shadow.querySelector("#eq-key-context-menu"),this.keyMoreBtn=this.shadow.querySelector("#eq-key-more-btn"),this.keysListEl=this.shadow.querySelector("#eq-keys-list"),this.keysBadgeEl=this.shadow.querySelector("#eq-keys-badge"),this.modelSelect=this.shadow.querySelector("#eq-model-select"),this.modeSelect=this.shadow.querySelector("#eq-mode-select"),this.engineSelect=this.shadow.querySelector("#eq-engine-select"),this.dryRunCheckbox=this.shadow.querySelector("#eq-dry-run"),this.autoApplyCheckbox=this.shadow.querySelector("#eq-auto-apply"),this.autoAdvanceCheckbox=this.shadow.querySelector("#eq-auto-advance"),this.hostDarkModeCheckbox=this.shadow.querySelector("#eq-host-dark"),this.useVisionCheckbox=this.shadow.querySelector("#eq-use-vision"),this.analyzeBtn=this.shadow.querySelector("#eq-analyze-btn"),this.applyBtn=this.shadow.querySelector("#eq-apply-btn"),this.applyBtn.disabled=!0,this.resultContainer=this.shadow.querySelector("#eq-result"),this.floatingAnswers=new Pe(this.shadow,()=>{this.callbacks.onAnalyze(1)});let a=this.shadow.querySelector("#eq-open-hud-btn");a&&a.addEventListener("click",()=>{this.latestPlan&&this.floatingAnswers.show(this.latestPlan)}),re.filter(s=>R(s.id)).forEach(s=>this.modelSelect.add(new Option(s.name,s.id,!1,s.id===e.model))),lo.forEach(s=>this.modeSelect.add(new Option(s.label,s.value,!1,s.value===e.modeHint))),co.forEach(s=>this.engineSelect.add(new Option(s.label,s.value,!1,s.value===e.engine))),this.apiKeyInput.value=e.apiKey,this.dryRunCheckbox.checked=e.dryRun,this.autoApplyCheckbox.checked=e.autoApply,this.autoAdvanceCheckbox.checked=e.autoAdvance,this.hostDarkModeCheckbox.checked=e.hostDarkMode,this.useVisionCheckbox.checked=e.useVision,this.metricsLiveTime=this.shadow.querySelector("#eq-metrics-live-time"),this.metricsLiveStatus=this.shadow.querySelector("#eq-metrics-live-status"),this.metricsTotalBadge=this.shadow.querySelector("#eq-metrics-total-badge"),this.metricTotalTime=this.shadow.querySelector("#eq-metric-total-time"),this.metricAvgTime=this.shadow.querySelector("#eq-metric-avg-time"),this.metricTotalCount=this.shadow.querySelector("#eq-metric-total-count"),this.metricsHistoryList=this.shadow.querySelector("#eq-metrics-history-list"),this.metricsHistoryCount=this.shadow.querySelector("#eq-metrics-history-count"),this.metricsCopyBtn=this.shadow.querySelector("#eq-metrics-copy-btn"),this.metricsResetBtn=this.shadow.querySelector("#eq-metrics-reset-btn"),this.setupEventListeners(),this.updateTimingMetrics(),document.body.appendChild(this.host),this.applyHostDarkMode(e.hostDarkMode);let i=Array.isArray(e.apiKeys)&&e.apiKeys.length>0?e.apiKeys:e.apiKey?[e.apiKey]:[];S.init(i),this.renderKeysList();let n=window.setInterval(()=>{this.activeTab==="settings"&&this.renderKeysList()},1e3);typeof n?.unref=="function"&&n.unref();let l=S.getBestKey()||e.apiKey;l&&Le(l).then(s=>{s&&s.length>0&&this.updateModelSelect(s,e.model)}).catch(()=>{})}switchTab(e){this.activeTab=e;let t=["resolver","brain","metrics","debug","settings"];for(let a of t){let i=this.shadow.querySelector(`#eq-tab-${a}`),n=this.shadow.querySelector(`#eq-view-${a}`);a===e?(i?.classList.add("active"),n&&(n.style.display="flex")):(i?.classList.remove("active"),n&&(n.style.display="none"))}e==="brain"?(this.renderContextTree(),this.refreshInspectorView()):e==="metrics"?this.updateTimingMetrics():e==="debug"&&(this.refreshDebugView(),this.renderTerminalEntries())}setupEventListeners(){this.shadow.querySelector("#eq-tab-resolver")?.addEventListener("click",()=>this.switchTab("resolver")),this.shadow.querySelector("#eq-tab-brain")?.addEventListener("click",()=>this.switchTab("brain")),this.shadow.querySelector("#eq-tab-metrics")?.addEventListener("click",()=>this.switchTab("metrics")),this.shadow.querySelector("#eq-tab-debug")?.addEventListener("click",()=>this.switchTab("debug")),this.shadow.querySelector("#eq-tab-settings")?.addEventListener("click",()=>this.switchTab("settings")),this.metricsResetBtn?.addEventListener("click",()=>{ge(),this.stopQuestionTimer(0),this.currentQuestionStartTime=0,this.metricsLiveTime&&(this.metricsLiveTime.textContent="00:00.00"),this.metricsLiveStatus&&(this.metricsLiveStatus.textContent="Em espera",this.metricsLiveStatus.classList.remove("active")),this.updateTimingMetrics(),this.logToConsole("> [SYS] M\xE9tricas e hist\xF3rico de tempo zerados com sucesso.","text-yellow")}),this.metricsCopyBtn?.addEventListener("click",()=>{this.copyMetricsReport()}),this.shadow.querySelector("#eq-dbg-filter-all")?.addEventListener("click",()=>this.setLogFilter("all")),this.shadow.querySelector("#eq-dbg-filter-error")?.addEventListener("click",()=>this.setLogFilter("error")),this.shadow.querySelector("#eq-dbg-filter-ai")?.addEventListener("click",()=>this.setLogFilter("ai")),this.shadow.querySelector("#eq-dbg-filter-dom")?.addEventListener("click",()=>this.setLogFilter("dom"));let e=this.shadow.querySelector("#eq-dbg-scroll-toggle");e?.addEventListener("click",()=>{this.autoScrollLogs=!this.autoScrollLogs,e&&(e.style.color=this.autoScrollLogs?"#00ffcc":"#858585",e.title=this.autoScrollLogs?"Auto-Scroll Ligado (Clique para desligar)":"Auto-Scroll Desligado (Clique para ligar)"),this.autoScrollLogs&&this.liveDebugTerminal&&(this.liveDebugTerminal.scrollTop=this.liveDebugTerminal.scrollHeight)});let t=this.shadow.querySelector("#eq-dbg-copy-logs");t?.addEventListener("click",()=>{let r=this.getFormattedLogs();navigator.clipboard.writeText(r).then(()=>{let p=t.innerHTML;t.innerHTML=q.check,setTimeout(()=>t.innerHTML=p,1800)})}),this.shadow.querySelector("#eq-dbg-clear-logs")?.addEventListener("click",()=>{this.clearLogs()});let a=this.shadow.querySelector("#eq-dbg-copy-prompt");a?.addEventListener("click",()=>{let r=this.latestPromptText||this.latestPlan?.promptSent||"";navigator.clipboard.writeText(r).then(()=>{let p=a.innerHTML;a.innerHTML=`${q.check} Copiado!`,setTimeout(()=>a.innerHTML=p,1800)})});let i=this.shadow.querySelector("#eq-dbg-copy-context");i?.addEventListener("click",()=>{let r=this.dbgContextView?.textContent||"";navigator.clipboard.writeText(r).then(()=>{let p=i.innerHTML;i.innerHTML=`${q.check} Copiado!`,setTimeout(()=>i.innerHTML=p,1800)})});let n=this.shadow.querySelector("#eq-dbg-copy-raw-resp");n?.addEventListener("click",()=>{let r=this.latestPlan?.rawResponse||this.dbgRawRespView?.textContent||"";navigator.clipboard.writeText(r).then(()=>{let p=n.innerHTML;n.innerHTML=`${q.check} Copiado!`,setTimeout(()=>n.innerHTML=p,1800)})});let l=this.shadow.querySelector("#eq-dbg-copy-error-btn");l?.addEventListener("click",()=>{let r=this.lastErrorMsg||"";navigator.clipboard.writeText(r).then(()=>{let p=l.innerHTML;l.innerHTML=q.check,setTimeout(()=>l.innerHTML=p,1800)})}),this.shadow.querySelector("#eq-refresh-context-btn")?.addEventListener("click",()=>{this.renderContextTree()}),this.launcherBtn.addEventListener("click",()=>this.toggle()),this.dockToggleBtn.addEventListener("click",()=>this.toggle()),this.shadow.querySelector("#eq-min-btn")?.addEventListener("click",()=>this.toggle(!1)),this.shadow.querySelector("#eq-close-btn")?.addEventListener("click",()=>this.toggle(!1)),window.addEventListener("keydown",r=>{r.altKey&&(r.key==="q"||r.key==="Q")&&(r.preventDefault(),this.toggle())},!0);let s=r=>{let p=r.composedPath();(p.includes(this.sidebarEl)||p.includes(this.host))&&r.stopImmediatePropagation()};window.addEventListener("keydown",s,!0),window.addEventListener("keyup",s,!0),window.addEventListener("keypress",s,!0),this.apiKeyInput.addEventListener("input",()=>{let r=this.apiKeyInput.value.trim().replace(/^["']|["']$/g,"");this.callbacks.onSettingsChange({apiKey:r})}),this.shadow.querySelector("#eq-key-save").addEventListener("click",()=>{let r=this.apiKeyInput.value.trim().replace(/^["']|["']$/g,"");if(!r){this.setStatus("Insira o valor da chave antes de adicionar.","warning");return}let p=S.addKey(r);if(p.ok){let g=S.exportRawKeys();this.callbacks.onSettingsChange({apiKey:g[0],apiKeys:g}),this.apiKeyInput.value="",this.setStatus(`\u2713 Nova chave adicionada com sucesso! (${g.length} chaves ativas no pool)`,"success"),this.renderKeysList(),this.keyContextMenu.hidden=!0,Me(r).then(v=>{v.ok?(S.markSuccess(r,100),this.setStatus("\u2713 Nova chave validada com sucesso no Google AI Studio!","success")):(S.markInvalid(r,v.message),this.setStatus(`\u26A0\uFE0F Chave cadastrada, mas aviso retornado: ${v.message}`,"warning")),this.renderKeysList()}).catch(()=>{})}else this.setStatus(p.message,"warning")}),this.keyMoreBtn.addEventListener("click",r=>{r.stopPropagation(),this.keyContextMenu.hidden=!this.keyContextMenu.hidden}),this.shadow.addEventListener("click",r=>{let p=r.target;!p.closest("#eq-key-context-menu")&&!p.closest("#eq-key-more-btn")&&(this.keyContextMenu.hidden=!0)}),this.shadow.querySelector("#eq-menu-prompt")?.addEventListener("click",()=>{this.keyContextMenu.hidden=!0;let r=window.prompt("Adicionar Nova Chave API do Google Gemini (AI Studio):");if(r!==null&&r.trim()){let p=r.trim().replace(/^["']|["']$/g,""),g=S.addKey(p);if(g.ok){let v=S.exportRawKeys();this.callbacks.onSettingsChange({apiKey:v[0],apiKeys:v}),this.setStatus("Chave Gemini adicionada com sucesso!","success"),this.renderKeysList()}else this.setStatus(g.message,"warning")}}),this.shadow.querySelector("#eq-menu-paste")?.addEventListener("click",async()=>{this.keyContextMenu.hidden=!0;try{let r=await navigator.clipboard.readText();if(r){let p=r.trim().replace(/^["']|["']$/g,"");this.apiKeyInput.value=p,this.setStatus('Chave colada no campo. Clique no bot\xE3o "+" para adicionar ao pool.',"info")}}catch{let r=window.prompt("Adicionar Nova Chave API do Google Gemini:");if(r!==null&&r.trim()){let p=r.trim().replace(/^["']|["']$/g,"");if(S.addKey(p).ok){let v=S.exportRawKeys();this.callbacks.onSettingsChange({apiKey:v[0],apiKeys:v}),this.setStatus("Chave Gemini adicionada com sucesso!","success"),this.renderKeysList()}}}}),this.shadow.querySelector("#eq-menu-toggle-vis")?.addEventListener("click",()=>{this.keyContextMenu.hidden=!0;let r=this.apiKeyInput.type==="password";this.apiKeyInput.type=r?"text":"password";let p=this.shadow.querySelector("#eq-menu-vis-icon"),g=this.shadow.querySelector("#eq-menu-vis-text");p&&(p.innerHTML=r?q.eyeOff:q.eye),g&&(g.textContent=r?"Ocultar Campo":"Mostrar Campo")}),this.shadow.querySelector("#eq-menu-clear")?.addEventListener("click",()=>{this.keyContextMenu.hidden=!0,this.apiKeyInput.value="",this.setStatus("Campo de inser\xE7\xE3o limpo.","info"),this.apiKeyInput.focus()}),this.shadow.querySelector("#eq-menu-test")?.addEventListener("click",async()=>{this.keyContextMenu.hidden=!0;let r=S.getAllKeys();if(r.length===0)return this.setStatus("Nenhuma chave cadastrada para testar.","error");this.setStatus(`Testando ${r.length} chave(s) no Google AI Studio...`,"info");let p=0;for(let g of r){let v=await Me(g.key);v.ok?(p++,S.markSuccess(g.key,100)):S.markInvalid(g.key,v.message)}this.renderKeysList(),this.setStatus(`Teste conclu\xEDdo: ${p}/${r.length} chave(s) operando com sucesso!`,p>0?"success":"error")});let d=()=>{this.keyContextMenu.hidden=!0,window.confirm("Deseja realmente resetar todos os dados, chaves e mem\xF3ria de sess\xE3o do EasyQuiz?")&&(this.autopilot.isActive()&&this.autopilot.stop(),this.updateAutopilotUi(!1),this.setBusy(!1),ct(),ge(),this.stopQuestionTimer(0),this.currentQuestionStartTime=0,this.metricsLiveTime&&(this.metricsLiveTime.textContent="00:00.00"),this.metricsLiveStatus&&(this.metricsLiveStatus.textContent="Em espera",this.metricsLiveStatus.className="eq-live-stopwatch-status"),this.updateTimingMetrics(),this.apiKeyInput.value="",this.callbacks.onSettingsChange({apiKey:""}),this.setStatus("Todos os dados do EasyQuiz foram limpos.","info"),this.logToConsole("> [SYS] Armazenamento local resetado.","text-yellow"))};this.shadow.querySelector("#eq-menu-reset")?.addEventListener("click",d),this.shadow.querySelector("#eq-reset-all-btn")?.addEventListener("click",d),this.apToggleBtn.addEventListener("click",()=>{if(this.autopilot.isActive())this.autopilot.stop(),this.callbacks.onCancel?.(),this.setProgress(0),this.updateAutopilotUi(!1),this.setInterrupted("Autopilot interrompido imediatamente pelo usu\xE1rio.");else{if(!this.apiKeyInput.value.trim().replace(/^["']|["']$/g,"")){this.setStatus("Configure sua chave de API Gemini na aba Configura\xE7\xF5es antes de ligar o Autopilot.","error"),this.switchTab("settings"),this.apiKeyInput.focus();return}this.callbacks.onSettingsChange({autoApply:!0,autoAdvance:!0}),this.autoApplyCheckbox.checked=!0,this.autoAdvanceCheckbox.checked=!0,this.autopilot.start(),this.updateAutopilotUi(!0),this.startStopwatch(),this.setStatus("Autopilot ativo. Monitorando exerc\xEDcios...","info")}}),this.shadow.querySelector("#eq-ap-clear-memory").addEventListener("click",()=>{Oe(),this.logToConsole("> [SYS] Mem\xF3ria contextual limpa com sucesso.","text-green"),this.setStatus("Mem\xF3ria contextual da sess\xE3o limpa.","success")});let h=this.shadow.querySelector("#eq-copy-console-btn");h?.addEventListener("click",()=>{let r=this.apConsole?.innerText||"";navigator.clipboard.writeText(r).then(()=>{let p=h.innerHTML;h.innerHTML=q.check,setTimeout(()=>h.innerHTML=p,1800)})}),this.copyPromptBtn.addEventListener("click",()=>{let r=this.inspPrompt.textContent||"";navigator.clipboard.writeText(r).then(()=>{let p=this.copyPromptBtn.innerHTML;this.copyPromptBtn.innerHTML=`${q.check} Copiado!`,setTimeout(()=>this.copyPromptBtn.innerHTML=p,2e3)})}),this.modelSelect.addEventListener("change",()=>this.callbacks.onSettingsChange({model:this.modelSelect.value})),this.modeSelect.addEventListener("change",()=>this.callbacks.onSettingsChange({modeHint:this.modeSelect.value})),this.engineSelect.addEventListener("change",()=>this.callbacks.onSettingsChange({engine:this.engineSelect.value})),this.dryRunCheckbox.addEventListener("change",()=>this.callbacks.onSettingsChange({dryRun:this.dryRunCheckbox.checked})),this.autoApplyCheckbox.addEventListener("change",()=>this.callbacks.onSettingsChange({autoApply:this.autoApplyCheckbox.checked})),this.autoAdvanceCheckbox.addEventListener("change",()=>this.callbacks.onSettingsChange({autoAdvance:this.autoAdvanceCheckbox.checked})),this.useVisionCheckbox.addEventListener("change",()=>{let r=this.useVisionCheckbox.checked;this.callbacks.onSettingsChange({useVision:r}),this.setStatus(r?"Vis\xE3o Computacional ativada (capturas habilitadas).":"Modo DOM R\xE1pido ativado (capturas desabilitadas).","info")}),this.hostDarkModeCheckbox.addEventListener("change",()=>{let r=this.hostDarkModeCheckbox.checked;this.callbacks.onSettingsChange({hostDarkMode:r}),this.applyHostDarkMode(r)}),this.analyzeBtn.addEventListener("click",async()=>{if(this.isBusy){this.callbacks.onCancel?.(),this.setInterrupted("An\xE1lise cancelada pelo usu\xE1rio. Pronto para nova tentativa.");return}await this.callbacks.onAnalyze()&&!this.dryRunCheckbox.checked&&!this.autoApplyCheckbox.checked&&this.callbacks.onApply()}),this.applyBtn.addEventListener("click",()=>this.callbacks.onApply())}startStopwatch(){this.stopStopwatch(),this.stopwatchStartTime=Date.now();let e=()=>{let t=((Date.now()-this.stopwatchStartTime)/1e3).toFixed(2)+"s";this.stopwatchAp.textContent=t,this.stopwatchAdv.textContent=t};e(),this.stopwatchInterval=setInterval(e,100)}stopStopwatch(e){if(this.stopwatchInterval&&(clearInterval(this.stopwatchInterval),this.stopwatchInterval=null),e!==void 0){let t=(e/1e3).toFixed(2)+"s";this.stopwatchAp.textContent=t,this.stopwatchAdv.textContent=t}}setLogFilter(e){this.activeLogFilter=e;let t=["all","error","ai","dom"];for(let a of t){let i=this.shadow.querySelector(`#eq-dbg-filter-${a}`);a===e?i?.classList.add("active"):i?.classList.remove("active")}this.renderTerminalEntries()}updateLogCounters(){let e=0,t=0,a=0;for(let i of this.logEntries)i.category==="error"?e++:i.category==="ai"?t++:i.category==="dom"&&a++;this.dbgCountAll&&(this.dbgCountAll.textContent=String(this.logEntries.length)),this.dbgCountError&&(this.dbgCountError.textContent=String(e)),this.dbgCountAi&&(this.dbgCountAi.textContent=String(t)),this.dbgCountDom&&(this.dbgCountDom.textContent=String(a))}renderTerminalEntries(){if(!this.liveDebugTerminal)return;this.liveDebugTerminal.replaceChildren();let e=this.activeLogFilter==="all"?this.logEntries:this.logEntries.filter(t=>t.category===this.activeLogFilter);if(e.length===0){let t=document.createElement("div");t.className="text-muted",t.textContent=`Nenhum log encontrado para o filtro "${this.activeLogFilter.toUpperCase()}".`,this.liveDebugTerminal.appendChild(t);return}for(let t of e){let a=document.createElement("div");a.textContent=t.message,t.colorClass&&(a.className=t.colorClass),this.liveDebugTerminal.appendChild(a)}this.autoScrollLogs&&(this.liveDebugTerminal.scrollTop=this.liveDebugTerminal.scrollHeight)}clearLogs(){if(this.logEntries=[],this.updateLogCounters(),this.liveDebugTerminal){this.liveDebugTerminal.replaceChildren();let e=document.createElement("div");e.className="text-blue",e.textContent="> [SYS] Console de logs limpo pelo usu\xE1rio.",this.liveDebugTerminal.appendChild(e)}this.apConsole&&this.apConsole.replaceChildren(),this.executionConsole&&this.executionConsole.replaceChildren()}getFormattedLogs(){return(this.activeLogFilter==="all"?this.logEntries:this.logEntries.filter(t=>t.category===this.activeLogFilter)).map(t=>t.message).join(`
`)}setLastError(e){this.lastErrorMsg=e,this.dbgErrorCard&&this.dbgErrorText&&(this.dbgErrorText.textContent=e,this.dbgErrorCard.style.display="flex")}setErrorDiagnostic(e,t){let a=t?`[${t}] ${e}`:e;this.setLastError(a)}refreshDebugView(){let e=this.latestPlan,t=this.latestContext,a=this.latestPromptText||e?.promptSent||"";if(this.dbgModel&&(this.dbgModel.textContent=e?.usedModel||this.initialSettings.model||"--"),this.dbgLatency&&(this.dbgLatency.textContent=e?.durationMs?`${e.durationMs}ms`:"--"),this.dbgSplitTokens){let i=e?.promptTokens!==void 0?String(e.promptTokens):"--",n=e?.candidatesTokens!==void 0?String(e.candidatesTokens):"--";this.dbgSplitTokens.textContent=`${i} / ${n}`,this.dbgSplitTokens.title=`Prompt: ${i} tokens | Resposta: ${n} tokens`}if(this.dbgTotalTokens){let i=e?.tokensUsed??(e?.promptTokens&&e?.candidatesTokens?e.promptTokens+e.candidatesTokens:void 0);this.dbgTotalTokens.textContent=i!==void 0?`${i}`:"--"}if(this.dbgPromptLen){let i=a.length,n=Math.round(i/4);this.dbgPromptLen.textContent=`${i} chars (~${n} tokens est.)`}if(this.dbgPromptView&&(this.dbgPromptView.textContent=a||"Nenhum prompt enviado at\xE9 o momento."),this.dbgContextView)if(t){let i={scope:`${t.scope.tagName.toLowerCase()}${t.scope.id?"#"+t.scope.id:""}${t.scope.className?"."+t.scope.className.split(" ").join("."):""}`,questionLength:t.questionText.length,questionSnippet:t.questionText.slice(0,150)+(t.questionText.length>150?"...":""),controlsCount:t.controls.length,controls:t.controls.map((n,l)=>({index:l+1,tag:n.tag,type:n.type,name:n.name||void 0,id:n.id||void 0,value:n.value||void 0,label:n.label||void 0,role:n.role}))};this.dbgContextView.textContent=JSON.stringify(i,null,2)}else this.dbgContextView.textContent="Aguardando captura de contexto pelo EasyQuiz...";this.dbgRawRespView&&(e?e.rawResponse?this.dbgRawRespView.textContent=e.rawResponse:this.dbgRawRespView.textContent=JSON.stringify({pageType:e.pageType,mode:e.mode,confidence:e.confidence,rationale:e.rationale,actions:e.actions},null,2):this.dbgRawRespView.textContent="Aguardando retorno da API Gemini..."),this.lastErrorMsg&&this.dbgErrorCard&&this.dbgErrorText&&(this.dbgErrorText.textContent=this.lastErrorMsg,this.dbgErrorCard.style.display="flex")}logToConsole(e,t){let a=new Date,i=`${String(a.getHours()).padStart(2,"0")}:${String(a.getMinutes()).padStart(2,"0")}:${String(a.getSeconds()).padStart(2,"0")}.${String(Math.floor(a.getMilliseconds()/100))}`,n=e;e.startsWith(">")?n=`> [${i}] ${e.slice(1).trim()}`:n=`[${i}] ${e}`;let l="all";t==="text-red"||n.includes("[ERRO]")||n.includes("Falha")||n.includes("Error")?l="error":n.includes("[IA]")||n.includes("[RAG]")||n.includes("Tokens")||n.includes("Gemini")||n.includes("Modelo:")?l="ai":(n.includes("[DOM]")||n.includes("[EXEC]")||n.includes("[VERIF]")||n.includes("[NAV]"))&&(l="dom");let s={id:Date.now()+Math.random(),timestamp:i,message:n,colorClass:t,category:l};for(this.logEntries.push(s);this.logEntries.length>250;)this.logEntries.shift();if(this.updateLogCounters(),l==="error"&&this.setLastError(n),this.liveDebugTerminal&&(this.activeLogFilter==="all"||this.activeLogFilter===l)){let c=document.createElement("div");for(c.textContent=n,t&&(c.className=t),this.liveDebugTerminal.appendChild(c);this.liveDebugTerminal.children.length>250;)this.liveDebugTerminal.removeChild(this.liveDebugTerminal.firstChild);this.autoScrollLogs&&(this.liveDebugTerminal.scrollTop=this.liveDebugTerminal.scrollHeight)}if(this.apConsole){let c=document.createElement("div");for(c.textContent=n,t&&(c.className=t),this.apConsole.appendChild(c),this.apConsole.scrollTop=this.apConsole.scrollHeight;this.apConsole.children.length>150;)this.apConsole.removeChild(this.apConsole.firstChild)}if(this.executionConsole){let c=document.createElement("div");for(c.textContent=n,t&&(c.className=t),this.executionConsole.appendChild(c),this.executionConsole.scrollTop=this.executionConsole.scrollHeight;this.executionConsole.children.length>150;)this.executionConsole.removeChild(this.executionConsole.firstChild)}}setProgress(e,t){if(!this.progressContainer||!this.progressBar)return;if(e<=0){this.progressContainer.style.display="none",this.progressBar.style.width="0%";return}this.progressContainer.style.display="flex";let a=Math.min(100,Math.max(0,Math.round(e)));this.progressBar.style.width=`${a}%`,this.progressVal&&(this.progressVal.textContent=`${a}%`),t&&this.progressLabel&&(this.progressLabel.textContent=t),a>=100&&setTimeout(()=>{this.progressContainer&&this.progressBar&&this.progressBar.style.width==="100%"&&(this.progressContainer.style.display="none")},1500)}updateContext(e,t){this.latestContext=e,t&&(this.latestPlan=t),this.activeTab==="brain"?(this.renderContextTree(),t&&this.refreshInspectorView()):this.activeTab==="debug"&&this.refreshDebugView()}renderContextTree(){if(!this.contextTreeContainer)return;let e=this.latestContext,t=Ce(),a=this.latestPlan;this.contextTreeContainer.innerHTML="";let i=this.createTreeFolder("\u{1F4C4} P\xC1GINA & ESCOPO ATUAL",!0,[{label:"T\xEDtulo",value:document.title||"Sem t\xEDtulo"},{label:"URL",value:window.location.pathname||"/"},{label:"Escopo DOM",value:e?`${e.scope.tagName.toLowerCase()}${e.scope.className?"."+e.scope.className.split(" ").join("."):""}`:"Document"},{label:"Tamanho Texto",value:e?`${e.questionText.length} caracteres`:"N\xE3o analisado"},{label:"Trecho Enunciado",value:e?`"${e.questionText.slice(0,120)}..."`:"Nenhum"}]);this.contextTreeContainer.appendChild(i);let n=e?e.controls:[],l=n.map((u,h)=>{let r=u.role==="navigation"||u.type==="button",p=!r&&u.value?` [val: "${u.value}"]`:"";return{label:`[#${h+1}] ${u.type.toUpperCase()}`,value:`${u.label||u.id||u.name||"(Sem r\xF3tulo)"}${p}`.trim(),badge:r?"Navega\xE7\xE3o":u.role||u.type}}),s=this.createTreeFolder(`\u{1F39B}\uFE0F CONTROLES DETECTADOS (${n.length})`,n.length>0,l);this.contextTreeContainer.appendChild(s);let c=t.map((u,h)=>({label:`Mem\xF3ria #${h+1}`,value:u,badge:"RAG"})),d=this.createTreeFolder(`\u{1F9E0} MEM\xD3RIA RAG ACUMULADA (${t.length})`,t.length>0,c);if(this.contextTreeContainer.appendChild(d),a){let u=this.createTreeFolder(`\u{1F916} \xDALTIMO PLANO IA (${a.actions.length} a\xE7\xF5es)`,!0,[{label:"Tipo P\xE1gina",value:a.pageType,badge:`${(a.confidence*100).toFixed(0)}%`},{label:"Modo",value:a.mode},{label:"Racioc\xEDnio",value:a.rationale||"N/A"},...a.actions.map((h,r)=>({label:`A\xE7\xE3o #${r+1} (${h.t})`,value:JSON.stringify(h)}))]);this.contextTreeContainer.appendChild(u)}}createTreeFolder(e,t,a){let i=document.createElement("div");i.className="eq-tree-node";let n=document.createElement("div");n.className="eq-tree-header",n.innerHTML=`<span class="eq-tree-arrow">${t?"\u25BC":"\u25B6"}</span> <span>${e}</span>`;let l=document.createElement("div");if(l.className="eq-tree-content",l.style.display=t?"flex":"none",a.length===0)l.innerHTML='<div class="text-muted" style="padding: 2px 0;">Nenhum item registrado.</div>';else for(let s of a){let c=document.createElement("div");c.className="eq-tree-leaf",c.innerHTML=`
          <strong style="color:#ffffff; min-width: 80px;">${s.label}:</strong>
          <span style="flex:1; word-break: break-word; color:#aaaaaa;">${s.value}</span>
          ${s.badge?`<span class="eq-tree-badge">${s.badge}</span>`:""}
        `,l.appendChild(c)}return n.addEventListener("click",()=>{let s=l.style.display==="none";l.style.display=s?"flex":"none";let c=n.querySelector(".eq-tree-arrow");c&&(c.textContent=s?"\u25BC":"\u25B6")}),i.appendChild(n),i.appendChild(l),i}toggle(e){e!==void 0?this.isCollapsed=!e:this.isCollapsed=!this.isCollapsed,this.isCollapsed?this.sidebarEl.classList.add("eq-collapsed"):(this.sidebarEl.classList.remove("eq-collapsed"),this.apiKeyInput.value||(this.switchTab("settings"),this.apiKeyInput.focus()))}updateAutopilotUi(e){e?(this.apToggleBtn.innerHTML=`${q.stop} PARAR AUTOPILOT`,this.apToggleBtn.classList.add("danger"),this.apToggleBtn.title="Interromper execu\xE7\xE3o cont\xEDnua do Autopilot"):(this.apToggleBtn.innerHTML=`${q.play} INICIAR AUTOPILOT`,this.apToggleBtn.classList.remove("danger"),this.apToggleBtn.title="Iniciar resolu\xE7\xE3o autom\xE1tica cont\xEDnua de quest\xF5es")}setOperationState(e,t){let a=this.shadow.querySelector("#eq-operation-state");a&&(a.textContent=e,a.className=`eq-operation-state is-${t}`)}setInterrupted(e="An\xE1lise interrompida pelo usu\xE1rio."){this.isBusy=!1,[this.modelSelect,this.modeSelect,this.engineSelect,this.dryRunCheckbox,this.autoApplyCheckbox,this.autoAdvanceCheckbox,this.useVisionCheckbox].forEach(t=>t.disabled=!1),this.analyzeBtn.disabled=!1,this.analyzeBtn.classList.remove("danger"),this.analyzeBtn.innerHTML=`${q.sparkles} Resolver com IA (Alt+R)`,this.analyzeBtn.title="Analisar e responder quest\xE3o ativa",this.applyBtn.disabled=!this.latestPlan||!this.latestPlan.actions.length,this.stopStopwatch(),this.stopQuestionTimer(),this.dotPulseAp.className="eq-dot-pulse stopped",this.dotPulseAdv.className="eq-dot-pulse stopped",this.launcherDot.className="eq-launcher-dot stopped",this.metricsLiveStatus&&(this.metricsLiveStatus.textContent="Interrompido",this.metricsLiveStatus.className="eq-live-stopwatch-status is-warning"),this.autopilot.isActive()||this.updateAutopilotUi(!1),this.setStatus(e,"warning")}setBusy(e,t){this.isBusy=e,[this.modelSelect,this.modeSelect,this.engineSelect,this.dryRunCheckbox,this.autoApplyCheckbox,this.autoAdvanceCheckbox,this.useVisionCheckbox].forEach(a=>a.disabled=e),e?(this.analyzeBtn.disabled=!1,this.analyzeBtn.classList.add("danger"),this.analyzeBtn.innerHTML=`${q.stop} Parar An\xE1lise`,this.analyzeBtn.title="Interromper e cancelar an\xE1lise em andamento",this.applyBtn.disabled=!0,this.startStopwatch(),this.startQuestionTimer(),this.dotPulseAp.className="eq-dot-pulse busy",this.dotPulseAdv.className="eq-dot-pulse busy",this.launcherDot.className="eq-launcher-dot busy",this.setOperationState("Analisando...","busy"),this.metricsLiveStatus&&(this.metricsLiveStatus.textContent="Calculando...",this.metricsLiveStatus.className="eq-live-stopwatch-status is-busy"),t&&this.setStatus(t,"info")):(this.analyzeBtn.disabled=!1,this.analyzeBtn.classList.remove("danger"),this.analyzeBtn.innerHTML=`${q.sparkles} Resolver com IA (Alt+R)`,this.analyzeBtn.title="Analisar e responder quest\xE3o ativa",this.applyBtn.disabled=!this.latestPlan||!this.latestPlan.actions.length,this.stopStopwatch(),this.stopQuestionTimer(),this.dotPulseAp.className="eq-dot-pulse",this.dotPulseAdv.className="eq-dot-pulse",this.launcherDot.className="eq-launcher-dot",this.setOperationState(this.autopilot.isActive()?"Monitorando":"Pronto","idle"),this.metricsLiveStatus&&this.metricsLiveStatus.textContent==="Calculando..."&&(this.metricsLiveStatus.textContent="Em espera",this.metricsLiveStatus.className="eq-live-stopwatch-status"))}setStatus(e,t="info"){this.statusTextAp.textContent=e,this.statusTextAdv.textContent=e,t==="error"?(this.setOperationState("Bloqueado","error"),this.dotPulseAp.className="eq-dot-pulse error",this.dotPulseAdv.className="eq-dot-pulse error",this.launcherDot.className="eq-launcher-dot error"):t==="warning"?(this.setOperationState("Interrompido","warning"),this.dotPulseAp.className="eq-dot-pulse stopped",this.dotPulseAdv.className="eq-dot-pulse stopped",this.launcherDot.className="eq-launcher-dot stopped"):t==="success"?(this.setOperationState("Confirmado","success"),this.dotPulseAp.className="eq-dot-pulse",this.dotPulseAdv.className="eq-dot-pulse",this.launcherDot.className="eq-launcher-dot"):this.isBusy?(this.setOperationState("Analisando...","busy"),this.dotPulseAp.className="eq-dot-pulse busy",this.dotPulseAdv.className="eq-dot-pulse busy",this.launcherDot.className="eq-launcher-dot busy"):(this.setOperationState(this.autopilot.isActive()?"Monitorando":"Pronto","info"),this.dotPulseAp.className="eq-dot-pulse",this.dotPulseAdv.className="eq-dot-pulse",this.launcherDot.className="eq-launcher-dot");let a=e.includes("Alternando")||e.includes("indispon\xEDvel")||e.includes("fallback")||e.includes("alternativo"),i=t==="error"?"> [ERRO] ":t==="success"?"> [SUCESSO] ":t==="warning"?"> [PARADO] ":a?"> [FALLBACK] ":"> [SYS] ",n=t==="error"?"text-red":t==="success"?"text-green":t==="warning"||a?"text-yellow":"text-blue";this.logToConsole(`${i}${e}`,n)}setPlan(e,t){this.latestPlan=e,this.resultContainer.style.display="flex",e.durationMs&&this.stopStopwatch(e.durationMs);let a=this.shadow.querySelector("#eq-badges");a.replaceChildren();let i=[e.mode.replace("_"," "),`${Math.round(e.confidence*100)}% Confian\xE7a`,`${e.actions.length} a\xE7\xF5es`,...e.usedModel?[e.usedModel]:[]];for(let c of i){let d=document.createElement("span");d.className="eq-brand-badge",d.textContent=c,a.appendChild(d)}let n=this.shadow.querySelector("#eq-rationale-text");n.textContent=e.rationale;let l=this.shadow.querySelector("#eq-actions-list");l.innerHTML="";for(let c of e.actions){let d=document.createElement("div");d.className="eq-action-item";let u="";c.t==="chk"?u=`chk ${c.id} (${c.c})`:c.t==="val"?u=`val "${c.v}" -> ${c.id}`:c.t==="sel"?u=`sel "${Array.isArray(c.v)?c.v.join(","):c.v}" -> ${c.id}`:c.t==="clk"?u=`clk ${c.id}`:c.t==="adv"?u="adv":c.t==="js"?u=`js: ${String(c.v).slice(0,40)}...`:c.t==="drag"&&(u=`drag "${c.from}" -> "${c.to}"`);let h=document.createElement("span");h.className="eq-action-badge",h.textContent=c.t.toUpperCase();let r=document.createElement("span");r.textContent=u,d.append(h,r),l.appendChild(d)}this.applyBtn.disabled=!t||!e.actions.length;let s=this.shadow.querySelector("#eq-execution-card");s&&(s.hidden=!0),this.refreshInspectorView(),this.refreshDebugView()}setExecutionReport(e){let t=this.shadow.querySelector("#eq-execution-card"),a=this.shadow.querySelector("#eq-execution-summary"),i=this.shadow.querySelector("#eq-execution-list");if(!t||!a||!i)return;t.hidden=!1,a.textContent=e.navigationVerified?`${e.verified}/${e.applied} a\xE7\xF5es verificadas. Navega\xE7\xE3o confirmada.`:`${e.verified}/${e.applied} a\xE7\xF5es verificadas. ${e.navigationEvidence}`,a.className=`eq-execution-summary ${e.success?"is-success":"is-warning"}`,i.replaceChildren();let n=this.shadow.querySelector("#eq-execution-placeholder");n&&(n.textContent=e.navigationVerified?"Fluxo conclu\xEDdo: aplica\xE7\xE3o e navega\xE7\xE3o confirmadas.":`Fluxo interrompido: ${e.navigationEvidence}`,n.className=`eq-execution-placeholder ${e.success?"is-success":"is-warning"}`);for(let l of e.reports){let s=document.createElement("div");s.className=`eq-execution-row ${l.verified?"is-success":"is-failed"}`;let c=document.createElement("span");c.className="eq-execution-state",c.textContent=l.verified?"OK":"FALHOU";let d=document.createElement("div");d.className="eq-execution-details";let u=document.createElement("strong");u.textContent=l.target;let h=document.createElement("span");if(h.textContent=`${l.strategy} | ${l.evidence}`,d.append(u,h),s.append(c,d),l.error){let r=document.createElement("small");r.textContent=l.error,s.appendChild(r)}i.appendChild(s)}}setInspectorPrompt(e,t){this.latestPromptText=e,this.inspPrompt&&(this.inspPrompt.textContent=e),t&&this.inspModel&&(this.inspModel.textContent=t),this.inspLatency&&(this.inspLatency.textContent="Aguardando IA..."),this.activeTab==="debug"&&this.refreshDebugView()}refreshInspectorView(){let e=this.latestPlan;if(e)if(this.inspModel.textContent=e.usedModel||this.initialSettings.model,this.inspLatency.textContent=e.durationMs?`${e.durationMs}ms`:"--",this.inspTokens.textContent=e.tokensUsed?`${e.tokensUsed}`:"--",this.inspPrompt.textContent=e.promptSent||this.latestPromptText||"Prompt n\xE3o registrado para esta requisi\xE7\xE3o.",this.inspRationale.textContent=e.rationale,this.inspActions.innerHTML="",e.actions.length>0)for(let t of e.actions){let a=document.createElement("div");a.className="eq-action-item",a.textContent=JSON.stringify(t),this.inspActions.appendChild(a)}else this.inspActions.innerHTML='<div class="text-muted" style="padding: 4px;">Nenhuma a\xE7\xE3o prescrita pela IA.</div>';else this.latestPromptText&&(this.inspPrompt.textContent=this.latestPromptText)}showFloatingAnswers(e){let t=e||this.latestPlan;t&&this.floatingAnswers.show(t)}hideFloatingAnswers(){this.floatingAnswers.hide()}renderKeysList(){if(!this.keysListEl)return;let e=S.getAllKeys();if(this.keysBadgeEl){let t=e.filter(a=>!a.isCooldown).length;this.keysBadgeEl.textContent=`${e.length} chave${e.length>1?"s":""} (${t} pronta${t!==1?"s":""})`,this.keysBadgeEl.className=`eq-key-badge ${t>0?"ready":"cooldown"}`}this.keysListEl.replaceChildren(),e.forEach((t,a)=>{let i=document.createElement("div");i.className="eq-key-item";let n=document.createElement("div");n.className="eq-key-info";let l=document.createElement("span");l.className="eq-key-label",l.textContent=t.label||`Chave ${a+1}`;let s=document.createElement("span");s.className="eq-key-masked",s.textContent=Y.maskKey(t.key),s.title="Clique para copiar a chave",s.style.cursor="pointer",s.addEventListener("click",()=>{navigator.clipboard?.writeText(t.key),this.setStatus(`Chave ${a+1} copiada para a \xE1rea de transfer\xEAncia!`,"info")});let c=document.createElement("span");if(t.isCooldown){c.className="eq-key-badge cooldown";let p=Math.ceil(t.remainingCooldownMs/1e3);c.textContent=`\u23F1 Cooldown (${p}s)`}else t.lastError&&t.errorCount&&t.errorCount>3?(c.className="eq-key-badge invalid",c.textContent="Erro",c.title=t.lastError):t.lastLatencyMs?(c.className="eq-key-badge ready",c.textContent=`Pronta (${t.lastLatencyMs}ms)`):(c.className="eq-key-badge ready",c.textContent="Pronta");n.appendChild(l),n.appendChild(s),n.appendChild(c);let d=document.createElement("div");d.className="eq-key-actions";let u=document.createElement("button");u.className="eq-icon-btn",u.type="button",u.title="Testar esta chave",u.innerHTML=q.sparkles,u.addEventListener("click",async()=>{this.setStatus(`Testando chave ${t.label||a+1}...`,"info");let p=await Me(t.key);p.ok?(S.markSuccess(t.key,120),this.setStatus(`\u2713 ${t.label||`Chave ${a+1}`}: Conex\xE3o com Google Gemini aprovada!`,"success")):(S.markInvalid(t.key,p.message),this.setStatus(`\u26A0\uFE0F ${t.label||`Chave ${a+1}`}: ${p.message}`,"error")),this.renderKeysList()});let h=document.createElement("button");h.className="eq-icon-btn",h.type="button",h.title="Editar chave",h.innerHTML=q.edit,h.addEventListener("click",()=>{let p=window.prompt(`Editar ${t.label||`Chave ${a+1}`}:`,t.key);if(p!==null&&p.trim()){let g=S.updateKey(t.id,p.trim());if(g.ok){let v=S.exportRawKeys();this.callbacks.onSettingsChange({apiKey:v[0],apiKeys:v}),this.setStatus(`Chave ${a+1} atualizada com sucesso!`,"success"),this.renderKeysList()}else this.setStatus(g.message,"warning")}});let r=document.createElement("button");r.className="eq-icon-btn",r.type="button",r.title="Remover chave",r.innerHTML=q.trash,e.length<=1?(r.disabled=!0,r.style.opacity="0.3",r.title="Voc\xEA precisa manter pelo menos 1 chave cadastrada."):r.addEventListener("click",()=>{if(confirm(`Remover permanentemente a ${t.label||`Chave ${a+1}`}?`)){let p=S.removeKey(t.id);if(p.ok){let g=S.exportRawKeys();this.callbacks.onSettingsChange({apiKey:g[0],apiKeys:g}),this.setStatus("Chave removida com sucesso.","info"),this.renderKeysList()}else this.setStatus(p.message,"warning")}}),d.appendChild(u),d.appendChild(h),d.appendChild(r),i.appendChild(n),i.appendChild(d),this.keysListEl.appendChild(i)})}updateModelSelect(e,t){let a=e.filter(l=>R(l.id)),i=t&&R(t)?t:R(this.initialSettings.model)?this.initialSettings.model:"gemini-2.5-flash";this.modelSelect.innerHTML="";let n=!1;a.forEach(l=>{let s=l.id===i;s&&(n=!0),this.modelSelect.add(new Option(l.name,l.id,!1,s))}),!n&&i&&R(i)&&this.modelSelect.add(new Option(`Gemini (${i})`,i,!1,!0)),this.modelSelect.value=i}updateSelectedModel(e){if(!R(e))return;Array.from(this.modelSelect.options).some(a=>a.value===e)||this.modelSelect.add(new Option(`Gemini (${e})`,e,!1,!0)),this.modelSelect.value=e}applyHostDarkMode(e){document.getElementById("eq-host-dark-mode-style")?.remove(),this.host.classList.toggle("eq-dark-mode-active",e)}startQuestionTimer(){this.currentQuestionStartTime=Date.now(),this.questionLiveTimerInterval&&clearInterval(this.questionLiveTimerInterval),this.metricsLiveStatus&&(this.metricsLiveStatus.textContent="Calculando...",this.metricsLiveStatus.classList.add("active"));let e=()=>{if(!this.metricsLiveTime)return;let t=Date.now()-this.currentQuestionStartTime,a=Math.floor(t/6e4),i=Math.floor(t%6e4/1e3),n=Math.floor(t%1e3/10);this.metricsLiveTime.textContent=`${String(a).padStart(2,"0")}:${String(i).padStart(2,"0")}.${String(n).padStart(2,"0")}`};e(),this.questionLiveTimerInterval=setInterval(e,50)}stopQuestionTimer(e){if(this.questionLiveTimerInterval&&(clearInterval(this.questionLiveTimerInterval),this.questionLiveTimerInterval=null),this.metricsLiveStatus&&(this.metricsLiveStatus.textContent="Parado",this.metricsLiveStatus.classList.remove("active")),this.metricsLiveTime&&this.currentQuestionStartTime>0){let t=e!==void 0?e:Math.max(0,Date.now()-this.currentQuestionStartTime),a=Math.floor(t/6e4),i=Math.floor(t%6e4/1e3),n=Math.floor(t%1e3/10);this.metricsLiveTime.textContent=`${String(a).padStart(2,"0")}:${String(i).padStart(2,"0")}.${String(n).padStart(2,"0")}`}}updateTimingMetrics(e){let t=e||se();if(!this.metricTotalTime)return;let a=Math.floor(t.totalElapsedMs/1e3),i=Math.floor(a/60),n=a%60;this.metricTotalTime.textContent=`${String(i).padStart(2,"0")}:${String(n).padStart(2,"0")}`;let l=(t.averageDurationMs/1e3).toFixed(1);this.metricAvgTime.textContent=`${l}s`,this.metricTotalCount.textContent=String(t.completedQuestionsCount),this.metricsTotalBadge&&(this.metricsTotalBadge.textContent=`${t.completedQuestionsCount} Quest\xE3o(\xF5es)`),this.metricsHistoryCount&&(this.metricsHistoryCount.textContent=`${t.records.length} registros`),this.renderMetricsHistory(t.records)}renderMetricsHistory(e){if(!this.metricsHistoryList)return;if(e.length===0){this.metricsHistoryList.innerHTML='<div class="eq-metrics-empty">Nenhuma quest\xE3o respondida nesta sess\xE3o ainda.</div>';return}this.metricsHistoryList.innerHTML="";let t=[...e].reverse();for(let a of t){let i=document.createElement("div");i.className="eq-metrics-item";let n=document.createElement("div");n.className="eq-metrics-item-left";let l=document.createElement("span");l.className="eq-metrics-badge",l.textContent=`Q${a.questionIndex}`;let s=document.createElement("div");s.className="eq-metrics-item-info";let c=document.createElement("div");c.className="eq-metrics-item-title",c.textContent=a.questionTitle||`Quest\xE3o ${a.questionIndex}`;let d=document.createElement("div");d.className="eq-metrics-item-meta";let u=new Date(a.timestamp).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit",second:"2-digit"}),h=a.mode?a.mode.replace("_"," "):"auto";d.textContent=`${u} \u2022 Modo: ${h}${a.actionsCount?` \u2022 ${a.actionsCount} a\xE7\xE3o(\xF5es)`:""}`,s.appendChild(c),s.appendChild(d),n.appendChild(l),n.appendChild(s);let r=document.createElement("div");r.className="eq-metrics-item-right";let p=document.createElement("span");p.className="eq-metrics-item-dur",p.textContent=`${(a.durationMs/1e3).toFixed(2)}s`;let g=document.createElement("span");g.className=`eq-metrics-item-status is-${a.status}`,g.textContent=a.status==="verified"||a.status==="answered"?"\u2713 Injetado":a.status==="manual"?"Gabarito":"Pendente",r.appendChild(p),r.appendChild(g),i.appendChild(n),i.appendChild(r),this.metricsHistoryList.appendChild(i)}}copyMetricsReport(){let e=se(),t=[];t.push("# Relat\xF3rio de Desempenho e Tempo \u2014 EasyQuiz"),t.push(`- **Quest\xF5es Respondidas:** ${e.completedQuestionsCount}`),t.push(`- **Tempo Total:** ${(e.totalElapsedMs/1e3).toFixed(1)}s`),t.push(`- **Tempo M\xE9dio por Quest\xE3o:** ${(e.averageDurationMs/1e3).toFixed(2)}s`),t.push(""),t.push("### Hist\xF3rico:"),e.records.length===0?t.push("_Nenhum registro ainda._"):e.records.forEach((a,i)=>{t.push(`${i+1}. **${a.questionTitle||`Q${a.questionIndex}`}**: ${(a.durationMs/1e3).toFixed(2)}s (${a.status})`)}),navigator.clipboard.writeText(t.join(`
`)).then(()=>{if(this.metricsCopyBtn){let a=this.metricsCopyBtn.innerHTML;this.metricsCopyBtn.innerHTML="\u2713 Copiado!",setTimeout(()=>{this.metricsCopyBtn.innerHTML=a},1500)}})}destroy(){this.stopStopwatch(),this.stopQuestionTimer(),this.autopilot.stop(),this.applyHostDarkMode(!1),this.callbacks.onDestroy(),this.host.remove()}};function uo(){try{if(typeof document>"u"||!document.head||document.querySelector("link[data-easyquiz-preconnect]"))return;let o=document.createElement("link");o.rel="preconnect",o.href="https://generativelanguage.googleapis.com",o.crossOrigin="anonymous",o.setAttribute("data-easyquiz-preconnect","true"),document.head.appendChild(o);let e=document.createElement("link");e.rel="dns-prefetch",e.href="https://generativelanguage.googleapis.com",e.setAttribute("data-easyquiz-preconnect","true"),document.head.appendChild(e)}catch{}}async function po(){let o=window;if(ge(),uo(),o.__easyquiz){o.__easyquiz.toggle();return}let e=Be(),t=null,a=null,i=0,n=new Re(e,{onAnalyze:(c=1,d)=>l(c,d),onApply:(c=1)=>void s(c),onDestroy:()=>{if(a){try{a.abort()}catch{}a=null}ae(),delete o.__easyquiz},onCancel:()=>{if(a){try{a.abort()}catch{}a=null}ae(),n.setProgress(0),n.setInterrupted("Opera\xE7\xE3o cancelada imediatamente pelo usu\xE1rio.")},onSettingsChange:c=>{e=dt(c)}});o.__easyquiz={toggle:()=>n.toggle(),destroy:()=>n.destroy(),analyze:async()=>{await l()}},window.addEventListener("keydown",c=>{if(c.altKey&&(c.key==="q"||c.key==="Q")){if(c.preventDefault(),!n)return;n.toggle(!0),l()}});async function l(c=1,d){if(!e.apiKey){n.setStatus("Configure sua chave de API Gemini acima para come\xE7ar.","error"),n.toggle(!0);return}if(a)try{a.abort()}catch{}a=new AbortController;let u=a,h=()=>{try{u.abort()}catch{}};if(d&&(d.aborted?u.abort():d.addEventListener("abort",h,{once:!0})),u.signal.aborted){n.setBusy(!1),n.setProgress(0);return}i=Date.now(),n.setBusy(!0,"Identificando o bloco da quest\xE3o ativa na p\xE1gina..."),n.setProgress(20,"Varrendo escopo do DOM e controles..."),ae(),n.hideFloatingAnswers();try{let r=xe(!1);r||(n.setStatus("Nenhum controle detectado. Tentando captura de tela inteira...","info"),r=de()),tt(r.scope),n.updateContext(r),n.logToConsole(`> [DOM] Escopo: <${r.scope.tagName.toLowerCase()}> com ${r.controls.length} controle(s) e ${r.questionText.length} caracteres.`,"text-blue"),n.setStatus(`Quest\xE3o localizada (${r.controls.length} controles). Preparando an\xE1lise...`,"info"),n.setProgress(40,`Consultando Gemini (${e.model})...`);let p=await it(r.scope,e.useVision);if(p.length>0){let x=p.map(w=>w.element).filter(Boolean);et(x)}if(u.signal.aborted)return;n.setStatus(p.length>0?`Consultando Gemini (${e.model}) com ${p.length} imagem(ns) anexada(s)...`:`Consultando Gemini (${e.model}) via DOM nativo (modo r\xE1pido)...`,"info");let g=fe(r,p,e);n.setInspectorPrompt(g,e.model);let v=(x,w)=>{n.setStatus(x,w==="warning"?"info":w)},{plan:f,usedModel:m}=await Ke(r,p,e,v,u.signal);if(u.signal.aborted)return;if(f.needsMoreContext){if(n.setProgress(55,"Ampliando escopo da quest\xE3o..."),n.setStatus("Enunciado ou contexto isolado detectado pela IA. Acionando Sele\xE7\xE3o Geral Expandida...","info"),n.logToConsole("> [DOM] Enunciado isolado. Ampliando escopo para sele\xE7\xE3o expandida...","text-blue"),r=xe(!0),r||(r=de()),tt(r.scope),n.updateContext(r),p=await it(r.scope,e.useVision),p.length>0){let y=p.map(E=>E.element).filter(Boolean);et(y)}n.setStatus(`Reconsultando IA com escopo ampliado (${r.controls.length} controles)...`,"info");let x=fe(r,p,e);n.setInspectorPrompt(x,e.model),f=(await Ke(r,p,e,v,u.signal)).plan}return u.signal.aborted||(n.setProgress(70,"Resposta recebida da IA! Processando plano..."),n.logToConsole(`> [IA] Modelo: ${m||e.model} | Modo: ${f.mode} | Confian\xE7a: ${(f.confidence*100).toFixed(0)}%`,"text-green"),f.rationale&&n.logToConsole(`> [IA] Racioc\xEDnio: "${f.rationale}"`,"text-blue"),n.logToConsole(`> [IA] ${f.actions.length} a\xE7\xE3o(\xF5es) prescritas no plano.`,"text-blue"),f.memoryToStore&&(ut(f.memoryToStore),n.logToConsole(`> [RAG] \u{1F9E0} Nova mem\xF3ria te\xF3rica salva na sess\xE3o: "${f.memoryToStore}"`,"text-yellow")),t=f,n.updateContext(r,f),St(f.actions),n.setPlan(f,!e.dryRun),f.pageType==="conclusion"?(n.setProgress(100,"Atividade conclu\xEDda!"),n.setStatus("Atividade conclu\xEDda ou tela final detectada pela IA.","success")):f.pageType==="info"?(n.setProgress(100,"Contexto absorvido na mem\xF3ria!"),n.setStatus("\u{1F4D8} Conte\xFAdo de contexto absorvido na mem\xF3ria RAG. Avan\xE7ando...","success")):f.pageType==="start"?(n.setProgress(100,"In\xEDcio detectado!"),n.setStatus("In\xEDcio de atividade detectado. Iniciando...","info")):(n.setProgress(80,"Plano de resolu\xE7\xE3o pronto!"),n.setStatus(e.dryRun?"Simula\xE7\xE3o conclu\xEDda. As respostas foram real\xE7adas na p\xE1gina sem altera\xE7\xE3o.":"Resolu\xE7\xE3o pronta! Verifique o realce na tela e aplique quando desejar.","success")),e.dryRun&&f.pageType==="question"&&n.showFloatingAnswers(f),u.signal.aborted)?void 0:(e.autoApply&&!e.dryRun&&await s(c,u.signal),f)}catch(r){if(u.signal.aborted||r instanceof Error&&(r.name==="AbortError"||r.message.includes("cancelada"))){ae(),n.setProgress(0),n.setInterrupted("Opera\xE7\xE3o cancelada pelo usu\xE1rio.");return}ae(),n.setProgress(0);let p=r instanceof Error?r.message:"Falha desconhecida na an\xE1lise.";n.setStatus(p,"error"),n.setErrorDiagnostic(p,"An\xE1lise da IA");return}finally{d?.removeEventListener("abort",h),a===u&&(a=null),u.signal.aborted||n.setBusy(!1)}}async function s(c=1,d){if(d?.aborted)return;if(!t){n.setStatus("Nenhum plano dispon\xEDvel para aplicar. Execute a an\xE1lise primeiro.","error");return}if(e.dryRun){n.setStatus("O modo de simula\xE7\xE3o est\xE1 ativo. Desmarque para poder aplicar.","error");return}let u=t.pageType==="info"||t.pageType==="start",h=(e.autoAdvance||u)&&t.confidence>=e.confidenceThreshold&&!t.needsMoreContext;n.setBusy(!0,"Aplicando respostas no formul\xE1rio..."),n.setProgress(85,`Aplicando ${t.actions.length} a\xE7\xE3o(\xF5es) no formul\xE1rio...`),n.logToConsole(`> [EXEC] Iniciando aplica\xE7\xE3o com 6 vias de persist\xEAncia para ${t.actions.length} a\xE7\xE3o(\xF5es)...`,"text-blue");try{let r=await We(t,h,c,be(e));if(d?.aborted)return;n.setExecutionReport(r);let p=i>0?Date.now()-i:1200,g=t.actions.filter(m=>m.t!=="adv"&&m.t!=="js").length;if(t.pageType==="question"||g>0?r.success||r.applied>0&&r.failed.length===0:r.success||r.advanced){n.setProgress(100,"Sucesso! Respostas preenchidas e validadas!"),n.logToConsole(`> [VERIF] \u2713 Sucesso no DOM: ${r.verified}/${r.applied} a\xE7\xF5es validadas com sucesso!`,"text-green"),r.advanced?n.logToConsole("> [NAV] \u2713 Bot\xE3o de confirma\xE7\xE3o/avan\xE7o acionado com sucesso!","text-green"):h&&n.logToConsole(`> [NAV] \u26A0\uFE0F ${r.navigationEvidence}`,"text-yellow"),n.setStatus(r.advanced?`Sucesso: ${r.applied} resposta(s) preenchida(s) e pr\xF3xima quest\xE3o confirmada.`:`Respostas preenchidas e validadas. Avan\xE7o n\xE3o confirmado: ${r.navigationEvidence}`,r.advanced||!h?"success":"info"),n.hideFloatingAnswers();let m=Ve({id:`q-${Date.now()}`,questionIndex:(se().records.length||0)+1,questionTitle:t.rationale?t.rationale.slice(0,45)+"...":`Quest\xE3o ${t.mode||"Auto"}`,durationMs:p,status:"verified",mode:t.mode,actionsCount:r.applied});n.updateTimingMetrics(m)}else{n.setProgress(0,"Inje\xE7\xE3o direta restrita. Gabarito r\xE1pido exibido.");let m=r.failed.length>0?r.failed.join(", "):"alvos pendentes";n.logToConsole(`> [VERIF] Alerta: ${r.verified}/${r.applied} a\xE7\xF5es verificadas no DOM. Pend\xEAncias: ${m}.`,"text-yellow"),n.logToConsole("> [GABARITO] Inje\xE7\xE3o direta restrita pela p\xE1gina. Gabarito r\xE1pido exibido na tela; o Autopilot aguarda voc\xEA marcar e avan\xE7ar.","text-yellow"),n.setStatus("Inje\xE7\xE3o restrita pela p\xE1gina. Gabarito direto exibido na tela para voc\xEA avan\xE7ar.","info"),n.showFloatingAnswers(t);let x=Ve({id:`q-${Date.now()}`,questionIndex:(se().records.length||0)+1,questionTitle:t.rationale?t.rationale.slice(0,45)+"...":`Quest\xE3o ${t.mode||"Auto"}`,durationMs:p,status:"manual",mode:t.mode,actionsCount:0});n.updateTimingMetrics(x)}}catch(r){n.setProgress(0);let p=r instanceof Error?r.message:"Falha ao aplicar plano.";n.setStatus("Inje\xE7\xE3o restrita pela p\xE1gina. Gabarito direto exibido na tela para voc\xEA avan\xE7ar.","info"),n.logToConsole(`> [ERRO] ${p}`,"text-red"),t&&n.showFloatingAnswers(t)}finally{n.setBusy(!1)}}n.toggle(!0)}po().catch(o=>{console.error("[EasyQuiz] Erro fatal na inicializa\xE7\xE3o:",o),window.alert(`EasyQuiz: falha ao iniciar: ${o instanceof Error?o.message:String(o)}`)});})();
