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
"use strict";(()=>{var Q={apiKey:"",apiKeys:[],model:"gemini-2.5-flash",uiMode:"easy",modeHint:"",engine:"smart",dryRun:!1,autoApply:!0,autoAdvance:!1,hostDarkMode:!0,useVision:!1,confidenceThreshold:.8};function R(o){if(!o||typeof o!="string")return!1;let e=o.toLowerCase().trim().replace(/^models\//,"");if(!e.includes("gemini"))return!1;let t=["imagen","image","veo","omni","video","embedding","embed","tts","audio","speech","voice","sound","live","transcribe","bidi","aqa","learnlm","deep-research","computer-use","robotics","rt-1","rt-2","mediapipe","cyber","latest","-ultra","experimental"];for(let a of t)if(e.includes(a))return!1;return!(!e.includes("flash")&&!e.includes("pro"))}var Ne="easyquiz_settings_v2",Z="easyquiz_activity_metrics";function Oe(){try{let o=localStorage.getItem(Ne);if(!o){let r=localStorage.getItem("easyquiz_settings_v1");if(r){let s=JSON.parse(r);return{...Q,apiKey:s.apiKey||""}}return{...Q}}let e=JSON.parse(o),t=typeof e.model=="string"&&R(e.model)?e.model:Q.model,a=Array.isArray(e.apiKeys)?e.apiKeys.map(r=>typeof r=="string"?r.trim().replace(/^["']|["']$/g,""):"").filter(r=>r.length>5):[],i=typeof e.apiKey=="string"?e.apiKey.trim().replace(/^["']|["']$/g,""):"";return a.length===0&&i&&(a=[i]),{apiKey:a[0]||i||Q.apiKey,apiKeys:a,model:t,uiMode:e.uiMode==="easy"||e.uiMode==="advanced"?e.uiMode:Q.uiMode,modeHint:e.modeHint??"",engine:e.engine??"smart",dryRun:!!e.dryRun,autoApply:e.autoApply!==void 0?!!e.autoApply:!0,autoAdvance:!!e.autoAdvance,hostDarkMode:e.hostDarkMode!==void 0?!!e.hostDarkMode:!0,useVision:!!e.useVision,confidenceThreshold:typeof e.confidenceThreshold=="number"?e.confidenceThreshold:Q.confidenceThreshold}}catch{return{...Q}}}function ct(){try{localStorage.removeItem(Ne),localStorage.removeItem("easyquiz_settings_v1"),localStorage.removeItem(Z),sessionStorage.removeItem(Z);let o=[];for(let e=0;e<localStorage.length;e++){let t=localStorage.key(e);t&&(t.startsWith("eq_")||t.startsWith("easyquiz_"))&&o.push(t)}o.forEach(e=>localStorage.removeItem(e)),Ve()}catch(o){console.warn("[EasyQuiz] Erro ao resetar dados:",o)}}function fe(o){try{let e=localStorage.getItem("eq_domain_cache_"+o);if(!e)return{};let t=JSON.parse(e);if(t.advanceSelector&&/inject|injetar/i.test(t.advanceSelector)){t.advanceSelector=void 0;try{localStorage.removeItem("eq_domain_cache_"+o)}catch{}}return t}catch{return{}}}function De(o,e){if(e.advanceSelector&&/inject|injetar/i.test(e.advanceSelector))return;let a={...fe(o),...e};try{localStorage.setItem("eq_domain_cache_"+o,JSON.stringify(a))}catch(i){console.warn("[EasyQuiz] Erro cache de dominio:",i)}}function dt(o){let e=Oe(),t=Array.isArray(o.apiKeys)?o.apiKeys.map(n=>typeof n=="string"?n.trim().replace(/^["']|["']$/g,""):"").filter(n=>n.length>5):e.apiKeys,a;typeof o.apiKey=="string"?a=o.apiKey.trim().replace(/^["']|["']$/g,""):Array.isArray(o.apiKeys)&&o.apiKeys.length>0?a=t[0]||"":a=e.apiKey,a&&!t.includes(a)&&(t=[a,...t]),t.length>0&&(!a||!t.includes(a))&&(a=t[0]);let i={...e,...o,apiKey:a,apiKeys:t};try{localStorage.setItem(Ne,JSON.stringify(i))}catch(n){console.warn("[EasyQuiz] Falha ao persistir configura\xE7\xF5es no localStorage:",n)}return i}var X=[],lt=12,Pt=1200;function ut(o){let e=o.trim().replace(/\s+/g," ").slice(0,Pt);e&&!X.includes(e)&&(X.push(e),X.length>lt&&(X=X.slice(-lt)))}function Ae(){return X}function Ve(){X=[]}function pt(){return{startTime:Date.now(),totalElapsedMs:0,completedQuestionsCount:0,averageDurationMs:0,records:[]}}var ge=pt();function ie(){try{localStorage.removeItem(Z)}catch{}return ge}function Rt(o){ge=o;try{let e=JSON.stringify(o);sessionStorage.setItem(Z,e),localStorage.removeItem(Z)}catch{}}function Ke(o){let e=ge,t=Date.now(),a=e.records[e.records.length-1];if(a&&a.id===o.id&&t-a.timestamp<3e3)return e;let i={...o,timestamp:t},n=[...e.records,i],r=n.filter(u=>u.status==="answered"||u.status==="verified").length,s=n.reduce((u,m)=>u+m.durationMs,0),l=r>0?Math.round(s/r):0,d={startTime:e.startTime||t,totalElapsedMs:Math.max(t-(e.startTime||t),s),completedQuestionsCount:r,averageDurationMs:l,records:n};return Rt(d),d}function be(){ge=pt();try{sessionStorage.removeItem(Z),localStorage.removeItem(Z)}catch{}return ge}var mt=[{id:"native-value-events",widget:"text",label:"Setter nativo com input/change/blur",precondition:"Campo edit\xE1vel vis\xEDvel e n\xE3o desabilitado.",evidence:"value ou textContent coincide exatamente com o valor esperado.",risk:"low",cost:"fast"},{id:"native-choice-state",widget:"choice",label:"Estado nativo de radio/checkbox",precondition:"Input ou widget ARIA \xFAnico localizado.",evidence:"checked/aria-checked/data-state do alvo e grupo correspondem ao esperado.",risk:"low",cost:"fast"},{id:"native-select-events",widget:"select",label:"Sele\xE7\xE3o nativa por value/texto exato",precondition:"Select vis\xEDvel com op\xE7\xE3o correspondente.",evidence:"option.selected e selected value correspondem ao esperado.",risk:"low",cost:"fast"},{id:"aria-combobox-keyboard",widget:"combobox",label:"Combobox ARIA por foco e teclado",precondition:"Combobox vis\xEDvel com popup/op\xE7\xF5es acess\xEDveis.",evidence:"aria-expanded, aria-activedescendant ou op\xE7\xE3o selecionada mudam.",risk:"medium",cost:"normal"},{id:"click-to-place",widget:"drag",label:"Selecionar item e clicar no destino",precondition:"Cart\xE3o e dropzone vis\xEDveis com protocolo click-to-place.",evidence:"Item passa a ser filho do destino ou recebe estado de colocado.",risk:"medium",cost:"normal"},{id:"html5-drag-drop",widget:"drag",label:"HTML5 dragstart/dragover/drop",precondition:"Origem draggable e destino aceita drag/drop.",evidence:"Relocation, callback ou estado placed confirmado.",risk:"medium",cost:"normal"},{id:"keyboard-order",widget:"order",label:"Ordena\xE7\xE3o por foco e teclado",precondition:"Itens orden\xE1veis com foco/roles ou bot\xF5es de mover.",evidence:"Ordem dos itens no DOM corresponde \xE0 sequ\xEAncia esperada.",risk:"medium",cost:"normal"},{id:"navigation-feedback",widget:"navigation",label:"Verificar e confirmar feedback/transi\xE7\xE3o",precondition:"Bot\xE3o de verifica\xE7\xE3o/avan\xE7o \xFAnico e habilitado.",evidence:"Feedback esperado e assinatura espec\xEDfica da quest\xE3o mudam.",risk:"high",cost:"normal"},{id:"javascript-explicit",widget:"javascript",label:"JavaScript limitado via capability expl\xEDcita",precondition:"Engine javascript autorizada e a\xE7\xE3o declarativa insuficiente.",evidence:"Efeito DOM esperado confirmado por verificador.",risk:"high",cost:"last-resort"}];function Bt(o){if(!o||o.length===0)return mt.filter(t=>t.widget!=="javascript");let e=new Set(o);return mt.filter(t=>e.has(t.widget))}function ht(o){return Bt(o).map(e=>`${e.id}: ${e.label} | pr\xE9: ${e.precondition} | prova: ${e.evidence} | risco: ${e.risk}`).join(`
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

REDA\xC7\xC3O E DISSERTA\xC7\xC3O (texto_livre):
- Se o campo for uma textarea grande ou o enunciado pedir "escreva", "disserte", "redija", "elabore" ou "fa\xE7a uma reda\xE7\xE3o":
  - Gere texto completo com t\xEDtulo (se pedido), introdu\xE7\xE3o, desenvolvimento e conclus\xE3o.
  - Use no m\xEDnimo 15 linhas de conte\xFAdo relevante ao tema.
  - Em 'v', coloque o texto completo da reda\xE7\xE3o pronto para inser\xE7\xE3o.

VERDADEIRO/FALSO EM GRADE (tabela/coluna):
- Se houver uma tabela ou grid onde cada linha \xE9 uma afirma\xE7\xE3o com op\xE7\xF5es V/F ou Certo/Errado:
  - Avalie CADA LINHA individualmente e emita uma a\xE7\xE3o chk ou clk por linha.
  - O mode deve ser 'verdadeiro_falso'.

PLATAFORMAS ESPEC\xCDFICAS:
- Khan Academy (Perseus): Widgets interativos podem exigir 'js' via $eq como fallback.
- Google Forms: IDs de controle podem vir de data-item-id ou data-params. Use-os.
- Wayground/Quizizz: Alternativas s\xE3o cards/bot\xF5es sem inputs. Use 'clk' para selecion\xE1-las.
- Duolingo: Respostas s\xE3o tiles clic\xE1veis. Use 'clk' por texto do tile.
- Moodle/AVA: Formul\xE1rios padr\xE3o com radios e checkboxes. Use chk/clk normalmente.

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
`;function Nt(o,e){return/khanacademy\.org/i.test(o)||e.includes("perseus")?"[PLATAFORMA: Khan Academy \u2014 widgets Perseus; use js via $eq para widgets interativos se necess\xE1rio]":/forms\.google|docs\.google.*forms/i.test(o)||e.includes("Qr7Oae")?"[PLATAFORMA: Google Forms \u2014 IDs via data-item-id, data-params]":/wayground|quizizz/i.test(o)||e.includes("data-functional-selector")?"[PLATAFORMA: Wayground/Quizizz \u2014 alternativas s\xE3o cards clic\xE1veis, use clk]":/moodle|ava\.|classroom\.google/i.test(o)?"[PLATAFORMA: Moodle/AVA/Classroom \u2014 formul\xE1rios padr\xE3o]":/duolingo/i.test(o)?"[PLATAFORMA: Duolingo \u2014 tiles clic\xE1veis, use clk por texto]":/blackboard|canvas\.instructure/i.test(o)?"[PLATAFORMA: Canvas/Blackboard \u2014 quiz-question padr\xE3o]":/socrative|kahoot/i.test(o)?"[PLATAFORMA: Socrative/Kahoot \u2014 alternativas s\xE3o bot\xF5es, use clk]":""}function ve(o,e,t){let a=o.htmlSnippet.includes("draggable")||o.htmlSnippet.includes("perseus")||o.htmlSnippet.includes("category")||o.htmlSnippet.includes("dropzone")||o.controls.some(h=>h.type==="draggable"||h.type==="dropzone"),i=new Set(["navigation"]);o.controls.some(h=>["text","number","textarea","contenteditable"].some(b=>h.type.includes(b)))&&i.add("text"),o.controls.some(h=>["radio","checkbox"].includes(h.type)||h.tag==="button")&&i.add("choice"),o.controls.some(h=>h.tag==="select")&&i.add("select"),o.controls.some(h=>/combobox|dropdown/i.test(h.type))&&i.add("combobox"),(o.controls.some(h=>["draggable","dropzone"].includes(h.type))||a)&&i.add("drag"),t.engine==="javascript"&&i.add("javascript");let n=/katex|latex|math|matrix|formula|frac|\$|\^|\_/i.test(o.htmlSnippet)||/calcular|calcule|resolva|matriz|equação|função|probabilidade|geometria|fórmula|coordenada|sistema/i.test(o.questionText),s=o.questionText.length<250||a||o.controls.length<4||n?`
[HTML]:
${o.htmlSnippet.slice(0,3500).replace(/\s+/g," ")}`:`
[HTML]: Omitido.`,l=Ae(),d=l.length>0?`
[MEM\xD3RIA]:
${l.join(" | ")}
`:"",u=o.controls.filter(h=>h.role!=="navigation"),m=o.controls.filter(h=>h.role==="navigation"),c=Nt(o.sourceUrl,o.htmlSnippet),p=c?`
${c}
`:"";return`--- AN\xC1LISE ---
[MODO]: ${t.engine} | Dica: ${t.modeHint||"Auto"}
[URL]: ${o.sourceUrl}
[P\xC1GINA]: ${o.pageTitle}${d}${p}
[ESTRAT\xC9GIAS]:
${ht([...i])}
[DADOS]
[TEXTO]:
${o.questionText}${s}

[RESPOSTAS]:
${u.length>0?JSON.stringify(u.map(h=>({id:h.id,t:h.type,n:h.name||void 0,txt:h.label,v:h.value||void 0,opt:h.options.length?h.options:void 0}))):"Nenhuma"}

[NAVEGA\xC7\xC3O]:
${m.length>0?m.map(h=>`"${h.label||h.id}"[${h.type}]`).join(","):"Nenhuma"}

[IMAGENS E GR\xC1FICOS ANEXADOS (${e.length})]:
${e.length>0?e.map((h,b)=>`  - Imagem ${b+1}: ${h.associatedLabel||"Gr\xE1fico da Quest\xE3o"}${h.alt?` (Texto alt: "${h.alt}")`:""}`).join(`
`):"Nenhum anexo visual."}
[/DADOS]
Sa\xEDda em JSON v\xE1lido.`}var Ot=new Set(["question","info","start","conclusion"]),Dt=new Set(["texto_livre","escolha_unica","escolha_multipla","verdadeiro_falso","preenchimento","acao_sem_resposta","categorizacao","ordenacao","arrastar_soltar"]),Vt=new Set(["val","chk","sel","clk","adv","js","drag"]),Kt=150,ye=2e3;function O(o,e=""){return o==null?e:typeof o=="string"?o.trim().slice(0,ye):typeof o=="number"||typeof o=="boolean"?String(o).trim().slice(0,ye):e}function _t(o,e){if(!o||typeof o!="object")return null;let t=o,a=t.t;if(typeof a!="string"||!Vt.has(a))return null;if(a==="adv"){let s=t.id??t.target??t.name??t.selector;return{t:"adv",...O(s)?{id:O(s,"").slice(0,500)}:{}}}if(a==="drag"){let s=O(t.from??t.source),l=O(t.to??t.target??t.destination);return!s||!l?null:{t:"drag",from:s.slice(0,500),to:l.slice(0,500)}}if(a==="js"){let s=O(t.v??t.code??t.script);return!s||s.length>8e3?null:{t:"js",v:s}}let i=t.id??t.target??t.name??t.selector??t.element;(i==null||i==="")&&a==="val"&&(i="1");let n=O(i).slice(0,500);if(!n)return null;if(a==="val"){let s=t.v!==void 0?t.v:t.value!==void 0?t.value:t.val!==void 0?t.val:t.text!==void 0?t.text:t.answer;return{t:"val",id:n,v:O(s).slice(0,ye)}}if(a==="sel"){let s=t.v!==void 0?t.v:t.value!==void 0?t.value:t.val!==void 0?t.val:t.values,d=(Array.isArray(s)?s:[s]).map(u=>O(u).slice(0,500)).filter(Boolean);return{t:"sel",id:n,v:d}}if(a==="chk"){let s=t.c===!1||t.c==="false"||t.c===0||t.c==="0"||t.c==="off"||t.c==="unchecked"||t.c==="desmarcar",l={t:"chk",id:n,c:!s};return t.v!==void 0&&(l.v=O(t.v).slice(0,ye)),l}let r={t:"clk",id:n};if(t.c!==void 0){let s=t.c===!1||t.c==="false"||t.c===0||t.c==="0"||t.c==="off"||t.c==="unchecked"||t.c==="desmarcar";r.c=!s}return t.v!==void 0&&(r.v=O(t.v).slice(0,ye)),Array.isArray(t.co)&&t.co.length===2&&t.co.every(s=>typeof s=="number"&&Number.isFinite(s))&&(r.co=[t.co[0],t.co[1]]),r}function ft(o){if(!o||typeof o!="object")return{pageType:"info",mode:"acao_sem_resposta",confidence:.5,rationale:"Resposta estruturada n\xE3o identificada; avan\xE7ando como informativo.",actions:[{t:"adv"}]};let e=o,t=e.pageType,a=e.mode;(typeof t!="string"||!Ot.has(t))&&(t="question"),(typeof a!="string"||!Dt.has(a))&&(a="escolha_unica");let i=Array.isArray(e.actions)?e.actions:[],n=[];for(let d=0;d<Math.min(i.length,Kt);d++){let u=_t(i[d],d);u&&n.push(u)}let r=n.filter(d=>d.t!=="adv"),s=n.some(d=>d.t==="adv");t==="conclusion"?n.length=0:t==="info"||t==="start"?s||n.push({t:"adv"}):t==="question"&&!s&&n.push({t:"adv"});let l=typeof e.confidence=="number"&&Number.isFinite(e.confidence)?Math.min(1,Math.max(0,e.confidence)):.85;return{pageType:t,mode:a,confidence:l,rationale:O(e.rationale,"Plano validado e auto-recuperado."),actions:n,...O(e.memoryToStore)?{memoryToStore:O(e.memoryToStore)}:{},...e.needsMoreContext?{needsMoreContext:!!e.needsMoreContext}:{}}}var _=class{keys=new Map;constructor(e=[]){this.init(e)}init(e){let t=new Map(this.keys);this.keys.clear(),Array.from(new Set(e.map(i=>i.trim().replace(/^["']|["']$/g,"")).filter(i=>i.length>5))).forEach((i,n)=>{let r=this.generateId(i),s=t.get(r)||t.get(i);this.keys.set(r,{id:r,key:i,label:s?.label||`Chave ${n+1}`,addedAt:s?.addedAt||Date.now(),lastUsedAt:s?.lastUsedAt,lastLatencyMs:s?.lastLatencyMs,cooldownUntil:s?.cooldownUntil,errorCount:s?.errorCount||0,lastError:s?.lastError,winCount:s?.winCount||0})})}generateId(e){let t=0;for(let a=0;a<e.length;a++)t=(t<<5)-t+e.charCodeAt(a),t|=0;return`key_${Math.abs(t).toString(36).slice(0,8)}`}static maskKey(e){let t=e.trim().replace(/^["']|["']$/g,"");return t.length<=10?"\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022":`${t.slice(0,6)}...${t.slice(-4)}`}getAllKeys(){let e=Date.now();return Array.from(this.keys.values()).map(t=>{let a=Math.max(0,(t.cooldownUntil||0)-e);return{...t,isCooldown:a>0,remainingCooldownMs:a}})}getHealthyKeys(){let e=Date.now();return Array.from(this.keys.values()).filter(t=>(t.cooldownUntil||0)<=e&&(t.errorCount||0)<5)}getBestKey(){let e=this.getHealthyKeys();if(e.length>0)return e.sort((a,i)=>{let n=a.lastLatencyMs??99999,r=i.lastLatencyMs??99999;return n-r}),e[0].key;let t=Array.from(this.keys.values());return t.length>0?(t.sort((a,i)=>(a.cooldownUntil||0)-(i.cooldownUntil||0)),t[0].key):""}getDiverseKeys(e){let t=this.getHealthyKeys();if(t.length===0){let i=this.getBestKey();return i?[i]:[]}t.sort((i,n)=>{let r=i.lastLatencyMs??99999,s=n.lastLatencyMs??99999;return r-s});let a=[];for(let i=0;i<e;i++){let n=t[i%t.length];a.push(n.key)}return a}markQuotaHit(e,t=5e3){let a=this.findKeyObj(e);a&&(a.cooldownUntil=Date.now()+t,a.errorCount=(a.errorCount||0)+1,a.lastError=`Cota tempor\xE1ria atingida (HTTP 429). Cooldown de ${t/1e3}s ativado.`)}markOverloaded(e,t=5e3){let a=this.findKeyObj(e);a&&(a.cooldownUntil=Date.now()+t,a.errorCount=(a.errorCount||0)+1,a.lastError=`Servidores sobrecarregados (HTTP 503). Cooldown de ${t/1e3}s ativado.`)}markSuccess(e,t){let a=this.findKeyObj(e);a&&(a.lastLatencyMs=t,a.lastUsedAt=Date.now(),a.errorCount=0,a.lastError=void 0,a.cooldownUntil=void 0)}markWinner(e){let t=this.findKeyObj(e);t&&(t.winCount=(t.winCount||0)+1)}markInvalid(e,t){let a=this.findKeyObj(e);a&&(a.errorCount=99,a.lastError=t)}addKey(e,t){let a=e.trim().replace(/^["']|["']$/g,"");if(!a)return{ok:!1,message:"Chave n\xE3o pode ser vazia."};if(a.length<15)return{ok:!1,message:"Chave de API inv\xE1lida ou muito curta."};let i=this.generateId(a);if(this.keys.has(i))return{ok:!1,message:"Esta chave de API j\xE1 est\xE1 cadastrada."};let n={id:i,key:a,label:t?.trim()||`Chave ${this.keys.size+1}`,addedAt:Date.now(),errorCount:0};return this.keys.set(i,n),{ok:!0,message:"Chave adicionada com sucesso!",keyItem:n}}updateKey(e,t,a){let i=this.keys.get(e);if(!i)return{ok:!1,message:"Chave n\xE3o encontrada."};let n=t.trim().replace(/^["']|["']$/g,"");return!n||n.length<15?{ok:!1,message:"Chave de API inv\xE1lida."}:(i.key=n,a!==void 0&&(i.label=a.trim()),i.errorCount=0,i.cooldownUntil=void 0,i.lastError=void 0,{ok:!0,message:"Chave atualizada com sucesso!"})}removeKey(e){if(this.keys.size<=1)return{ok:!1,message:"Voc\xEA precisa manter pelo menos 1 chave de API cadastrada."};let t=this.findKeyObj(e);return t?(this.keys.delete(t.id),{ok:!0,message:"Chave removida com sucesso."}):{ok:!1,message:"Chave n\xE3o encontrada."}}exportRawKeys(){return Array.from(this.keys.values()).map(e=>e.key)}size(){return this.keys.size}findKeyObj(e){if(this.keys.has(e))return this.keys.get(e);for(let t of this.keys.values())if(t.key===e)return t}},k=new _;var se=[{id:"gemini-3.8-flash",name:"Gemini 3.8 Flash (Mais Inteligente 2026)",description:"Modelo flagship Flash lan\xE7ado em Set/2026. Ultra-r\xE1pido e altamente capaz.",stable:!0},{id:"gemini-3.7-flash",name:"Gemini 3.7 Flash (Agentic)",description:"Alta capacidade para racioc\xEDnio multimodal e workflows ag\xEAnticos.",stable:!0},{id:"gemini-3.6-flash",name:"Gemini 3.6 Flash (Est\xE1vel)",description:"Modelo est\xE1vel e confi\xE1vel com excelente velocidade.",stable:!0},{id:"gemini-3.5-flash",name:"Gemini 3.5 Flash (R\xE1pido)",description:"Modelo de alta performance para tarefas r\xE1pidas.",stable:!0},{id:"gemini-3.5-flash-lite",name:"Gemini 3.5 Flash-Lite (Econ\xF4mico)",description:"Modelo econ\xF4mico de alta velocidade para volume elevado.",stable:!0},{id:"gemini-2.5-flash",name:"Gemini 2.5 Flash (Legacy R\xE1pido)",description:"Modelo legacy com zero-thinking suportado. Ultra-baixa lat\xEAncia.",stable:!0},{id:"gemini-2.5-pro",name:"Gemini 2.5 Pro (Legacy Avan\xE7ado)",description:"Modelo legacy avan\xE7ado para quest\xF5es de alta complexidade.",stable:!0}],bt=["gemini-3.8-flash","gemini-3.5-flash","gemini-2.5-flash"],xe=null;function jt(o){let e={temperature:0,maxOutputTokens:1200,response_mime_type:"application/json",response_schema:Gt};return/gemini-3\./i.test(o)?e.thinkingConfig={thinkingLevel:"low"}:/gemini-2\.5-flash/i.test(o)&&(e.thinkingConfig={thinkingBudget:0}),e}var Gt={type:"OBJECT",properties:{pageType:{type:"STRING",enum:["question","info","start","conclusion"]},mode:{type:"STRING",enum:["texto_livre","escolha_unica","escolha_multipla","verdadeiro_falso","preenchimento","acao_sem_resposta","categorizacao","ordenacao","arrastar_soltar"]},confidence:{type:"NUMBER"},rationale:{type:"STRING"},memoryToStore:{type:"STRING"},actions:{type:"ARRAY",items:{type:"OBJECT",properties:{t:{type:"STRING",enum:["val","chk","sel","clk","adv","js","drag"]},id:{type:"STRING"},v:{},c:{type:"BOOLEAN"},co:{type:"ARRAY",items:{type:"NUMBER"}},from:{type:"STRING"},to:{type:"STRING"}},required:["t"]}}},required:["pageType","mode","confidence","rationale","actions"]};function Ft(o){let e=o.trim().replace(/^google\//,"").replace(/^models\//,"");return!e||!R(e)?"gemini-3.8-flash":e}function vt(o,e){let t="";try{let a=JSON.parse(o);t=a.error?.message||a.message||""}catch{t=o.slice(0,160)}return/API_KEY_INVALID|API key not valid|key.*invalid|unregistered/i.test(t)?"Chave de API do Gemini inv\xE1lida ou n\xE3o autorizada no Google AI Studio.":/RESOURCE_EXHAUSTED|Quota exceeded/i.test(t)||e===429?"Limite tempor\xE1rio de cota do Gemini (HTTP 429) atingido. Aguardando recupera\xE7\xE3o...":e===404?`HTTP 404: ${t||"Modelo ou endpoint n\xE3o encontrado no Google AI Studio"}`:e===503||/overloaded/i.test(t)?`Servidores Google sobrecarregados (HTTP 503): ${t||"Aguardando"}`:t?`Erro Gemini (HTTP ${e}): ${t}`:`Falha na requisi\xE7\xE3o ao Gemini (HTTP ${e}).`}function Ut(o){let e=o.trim(),t=e.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);if(t)try{return JSON.parse(t[1].trim())}catch{}try{return JSON.parse(e)}catch{}let a=e.match(/\{[\s\S]*\}/);if(a)try{return JSON.parse(a[0].trim())}catch{}throw new Error("Falha ao decodificar JSON da IA.")}var yt=(()=>{try{let o=typeof localStorage<"u"?localStorage.getItem("easyquiz_cached_models"):null;if(!o)return null;let e=JSON.parse(o);if(Array.isArray(e)){let t=e.filter(a=>a&&typeof a.id=="string"&&R(a.id));return t.length>0?t:null}return null}catch{return null}})(),ee=new Set;async function Le(o){let e=o.trim().replace(/^["']|["']$/g,"");if(!e)return se;let t=[`https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(e)}`,`https://generativelanguage.googleapis.com/v1/models?key=${encodeURIComponent(e)}`];for(let a of t)try{let i=await fetch(a,{headers:{"Content-Type":"application/json","x-goog-api-key":e}});if(!i.ok){let r=await i.text(),s=vt(r,i.status);if(s.includes("inv\xE1lida")||s.includes("n\xE3o autorizada"))throw new Error(s);continue}let n=await i.json();if(Array.isArray(n.models)&&n.models.length>0){let r=n.models.filter(s=>{let l=s.supportedGenerationMethods||[],d=(s.name||"").replace(/^models\//,""),u=l.includes("generateContent");return R(d)&&u}).map(s=>{let l=s.supportedGenerationMethods||[],d=s.name.replace(/^models\//,""),u=s.displayName||d;return{id:d,name:u.includes(d)?u:`${u} (${d})`,description:s.description||"",stable:!/-preview|-experimental|-latest/i.test(d),supportsVision:!/embedding|tts|transcribe|live|image|sound|voice/i.test(d),supportsStructuredOutput:l.includes("generateContent"),supportedGenerationMethods:l,discoveredAt:Date.now()}});if(r.length>0){r.sort((s,l)=>{let d=u=>u==="gemini-3.8-flash"?200:u==="gemini-3.7-flash"?190:u==="gemini-3.6-flash"?180:u==="gemini-3.5-flash"?170:u==="gemini-3.5-flash-lite"?160:u==="gemini-2.5-flash"?130:u.includes("flash")?80:u==="gemini-2.5-pro"?60:u.includes("pro")?50:10;return d(l.id)-d(s.id)}),yt=r;try{typeof localStorage<"u"&&localStorage.setItem("easyquiz_cached_models",JSON.stringify(r))}catch{}return r}}}catch(i){if(i.message?.includes("Chave de API"))throw i}return se}async function Me(o){let e=o.trim().replace(/^["']|["']$/g,"");if(!e)return{ok:!1,message:"Insira sua chave de API."};try{let a=await Le(e);if(a.length>0&&a!==se){let i=a[0];return{ok:!0,message:`Chave v\xE1lida! ${a.length} modelos Gemini dispon\xEDveis em sua conta. Recomendado: ${i.name}`,models:a}}}catch(a){return{ok:!1,message:a instanceof Error?a.message:String(a)}}let t=["gemini-3.8-flash","gemini-3.5-flash","gemini-2.5-flash"];for(let a of t)for(let i of["v1beta","v1"]){let n=`https://generativelanguage.googleapis.com/${i}/models/${a}:generateContent?key=${encodeURIComponent(e)}`;try{if((await fetch(n,{method:"POST",headers:{"Content-Type":"application/json","x-goog-api-key":e},body:JSON.stringify({contents:[{role:"user",parts:[{text:"PING"}]}],generationConfig:{maxOutputTokens:5}})})).ok)return{ok:!0,message:`Chave validada com sucesso no ${a} (${i})!`,models:se}}catch{}}return{ok:!1,message:"Chave de API inv\xE1lida, sem cota ou sem permiss\xE3o para modelos Gemini."}}async function Qt(o,e,t,a,i){let n=["v1beta","v1"],r=new Error(`Falha ao consultar modelo ${o}`),l={...jt(o)};for(let d of n){if(i.aborted)throw new Error("Opera\xE7\xE3o cancelada pelo usu\xE1rio.");let u=`https://generativelanguage.googleapis.com/${d}/models/${o}:generateContent?key=${encodeURIComponent(e)}`,m=Date.now();try{let c=await fetch(u,{method:"POST",headers:{"Content-Type":"application/json","x-goog-api-key":e},body:JSON.stringify({...t,generationConfig:l}),signal:i,keepalive:a});if(!c.ok){let b=await c.text();if(c.status===400&&l.thinkingConfig&&/thinking/i.test(b)){delete l.thinkingConfig;let g=await fetch(u,{method:"POST",headers:{"Content-Type":"application/json","x-goog-api-key":e},body:JSON.stringify({...t,generationConfig:l}),signal:i,keepalive:a});if(g.ok){let y=await g.json(),x=y.candidates?.[0];if(x?.content?.parts?.[0]?.text)return k.markSuccess(e,Date.now()-m),{rawText:x.content.parts[0].text,data:y,usedModel:o,usedKey:e}}}let f=vt(b,c.status);if(c.status===404&&d==="v1beta")continue;throw c.status===429?k.markQuotaHit(e,5e3):c.status===503||/no capacity|overloaded|unavailable/i.test(b)?(k.markOverloaded(e,5e3),ee.add(o)):c.status===403||/API_KEY_INVALID/i.test(b)?k.markInvalid(e,f):c.status===404&&ee.add(o),new Error(`[${o}|${_.maskKey(e)}] ${f}`)}let p=await c.json(),h=p.candidates?.[0];if(!h||!h.content?.parts?.[0]?.text)throw new Error(`[${o}|${_.maskKey(e)}] A IA n\xE3o retornou uma resposta estruturada v\xE1lida.`);return k.markSuccess(e,Date.now()-m),{rawText:h.content.parts[0].text,data:p,usedModel:o,usedKey:e}}catch(c){if(i.aborted)throw c;r=c;let p=r.message||"";if((p.includes("404")||p.includes("503")||p.includes("No capacity")||p.includes("overloaded"))&&ee.add(o),!p.includes("404"))break}}throw r}var Yt=25;async function _e(o,e,t,a,i){if(i?.aborted)throw new Error("Opera\xE7\xE3o cancelada pelo usu\xE1rio.");let n=Array.isArray(t.apiKeys)&&t.apiKeys.length>0?t.apiKeys:t.apiKey?[t.apiKey]:[];k.init(n);let r=t.apiKey.trim().replace(/^["']|["']$/g,""),s=k.getBestKey()||r;if(!s)throw new Error("Nenhuma chave de API do Gemini configurada ou dispon\xEDvel.");let l=Ft(t.model);if(!yt&&s&&Le(s).catch(()=>{}),i?.aborted)throw new Error("Opera\xE7\xE3o cancelada pelo usu\xE1rio.");let d=Date.now(),u=ve(o,e,t),m=[{text:u}];for(let A=0;A<e.length;A++){let H=e[A],V=H.associatedLabel||(H.alt?`Imagem: ${H.alt}`:`Imagem ${A+1}`);m.push({text:`[ANEXO VISUAL ${A+1} - V\xCDNCULO: ${V}]:`}),m.push({inline_data:{mime_type:H.mediaType,data:H.base64}})}let c={system_instruction:{parts:[{text:gt}]},contents:[{role:"user",parts:m}]},p=!0,h=[...xe&&R(xe)&&!ee.has(xe)?[xe]:[],...R(l)&&!ee.has(l)?[l]:[],...bt.filter(A=>!ee.has(A))],b=Array.from(new Set(h)).filter(A=>R(A));b.length===0&&(ee.clear(),b.push(...bt));let f=k.getHealthyKeys(),g=k.getAllKeys(),y=f.length>0?f.slice(0,Yt):g.slice(0,3).map(A=>({key:A.key})),x=[];for(let A=0;A<y.length;A++){let H=y[A],V=b[A%b.length],J=A+1;x.push({model:V,key:H.key,label:`Chave ${J}`})}x.length===0&&x.push({model:b[0]||"gemini-3.8-flash",key:s,label:"Chave 1"});let w=x.length,T=new Set(x.map(A=>A.key)).size,L=new Set(x.map(A=>A.model)).size;a?.(`\u26A1 TURBO BLITZ: ${w} requisi\xE7\xF5es simult\xE2neas (${T} chaves \xD7 ${L} modelos)...`,"info");let M=x.map(()=>new AbortController),S=()=>{M.forEach(A=>{try{A.abort(new Error("Opera\xE7\xE3o cancelada pelo usu\xE1rio."))}catch{A.abort()}})};if(i){if(i.aborted)throw new Error("Opera\xE7\xE3o cancelada pelo usu\xE1rio.");i.addEventListener("abort",S,{once:!0})}try{let A=x.map(async(G,he)=>{let W=M[he],ae=w>1?8e3:12e3,ne=setTimeout(()=>{try{W.abort(new Error(`Timeout de ${ae/1e3}s excedido (${G.model}|${G.label}).`))}catch{W.abort()}},ae);try{let K=await Qt(G.model,G.key,c,p,W.signal);clearTimeout(ne);let U=ft(Ut(K.rawText));return U.usedModel=K.usedModel,U.durationMs=Date.now()-d,U.promptSent=u,U.tokensUsed=K.data.usageMetadata?.totalTokenCount,U.promptTokens=K.data.usageMetadata?.promptTokenCount,U.candidatesTokens=K.data.usageMetadata?.candidatesTokenCount,U.rawResponse=K.rawText,M.forEach((rt,$t)=>{if($t!==he)try{rt.abort(new Error("Cancelado: outro slot respondeu mais r\xE1pido."))}catch{rt.abort()}}),{plan:U,rawUsage:K.data.usageMetadata,usedModel:K.usedModel,usedKey:K.usedKey,slotLabel:G.label}}catch(K){throw clearTimeout(ne),K}}),H=await Promise.any(A);i?.removeEventListener("abort",S),k.markWinner(H.usedKey),xe=H.usedModel;try{t.model=H.usedModel,H.usedKey&&(t.apiKey=H.usedKey)}catch{}let V=_.maskKey(H.usedKey),J=H.plan.durationMs||Date.now()-d;return a?.(`\u26A1 Resposta em ${J}ms via '${H.usedModel}' (${H.slotLabel}: ${V})!`,"info"),H}catch(A){if(i?.removeEventListener("abort",S),i?.aborted)throw new Error("Opera\xE7\xE3o cancelada pelo usu\xE1rio.");let H="";throw Array.isArray(A?.errors)&&A.errors.length>0?H=A.errors.map(V=>V?.message||String(V)).filter(Boolean).join(" | "):A instanceof Error?H=A.message:H=String(A),console.warn(`[EasyQuiz Turbo Blitz] Todas as ${w} requisi\xE7\xF5es falharam: ${H}`),new Error(H||"Nenhum modelo respondeu com sucesso.")}}var Jt=[/\bfetch\b/i,/\bXMLHttpRequest\b/i,/\bWebSocket\b/i,/\b(?:localStorage|sessionStorage|indexedDB)\b/i,/\b(?:eval|Function|AsyncFunction|GeneratorFunction)\b/i,/\bimport(?:Scripts)?\b/i,/\bnavigator\s*\.\s*credentials\b/i,/\b(?:cookie|location\s*=|history\s*\.)/i,/\bwindow\s*\[\s*['"](?:fetch|eval|Function|localStorage|sessionStorage)/i];function we(o){let e=o?.engine||"smart",t=new Set(["dom","framework","keyboard","drag"]);return o?.autoAdvance&&t.add("navigation"),e==="javascript"&&t.add("javascript"),{engine:e,capabilities:t,maxAttemptsPerAction:e==="command"?1:2,maxActionMs:e==="command"?1500:3e3,allowJavaScript:e==="javascript",allowNavigation:!!o?.autoAdvance}}function je(o,e){if(o.t==="js"&&!e.allowJavaScript)throw new Error("A\xE7\xE3o JavaScript bloqueada pela engine atual. Use o motor JavaScript explicitamente.");if(o.t==="adv"&&!e.allowNavigation)throw new Error("Avan\xE7o autom\xE1tico bloqueado pela pol\xEDtica atual.")}function xt(o){if(!o.trim())throw new Error("JavaScript recusado: c\xF3digo vazio.");if(o.length>8e3)throw new Error("JavaScript recusado: c\xF3digo acima do limite operacional.");if(Jt.find(t=>t.test(o)))throw new Error("JavaScript recusado: acesso externo, persist\xEAncia ou avalia\xE7\xE3o din\xE2mica n\xE3o permitidos.");if(!/^\s*(?:\/\/[^\n]*\n|\/\*[\s\S]*?\*\/|[\s\S])*\$eq\./.test(o)&&!o.includes("$eq."))throw new Error("JavaScript recusado: use somente a API declarativa $eq.")}var re=['input:not([type="hidden"])',"textarea","select","button","a","label",'[role="button"]','[role="link"]','[role="radio"]','[role="checkbox"]','[role="option"]','[role="treeitem"]','[role="menuitemcheckbox"]','[role="menuitemradio"]','[contenteditable="true"]','[draggable="true"]',"[aria-grabbed]","[aria-dropeffect]","[data-widget-type]",".perseus-drag-item",".sortable-item",'[data-testid*="drag" i]','[data-testid*="card" i]','[data-testid*="option" i]','[data-testid*="choice" i]','[data-testid*="category" i]',"[data-choice]","[data-option]","[data-answer]","[data-value]",".quiz-option",".option-card",".choice-card",'[class*="option-card" i]','[class*="choice-card" i]','[class*="option-item" i]','[class*="choice-item" i]','[class*="answer-item" i]','[class*="alternative" i]','li[class*="choice" i]','li[class*="option" i]','li[class*="answer" i]','[data-role="dropzone"]',"[data-category]"].join(","),Se=/(verificar|checar|check|conferir|validar|próxim[oa]|next|continuar|continue|avançar|prosseguir|enviar|submit|concluir|finalizar|terminar|começar|iniciar|start|vamos lá|próxima tarefa|next task|próxima pergunta|next question|marcar como concluíd[oa]|mostrar resumo|entendi|compreendi|ok|leitura concluída|seguir|ir para o exercício|fazer o teste|próximo artigo|ir para a aula)/i,Wt=0;function Ge(o){try{let e=o.closest('[hidden], [style*="display: none"], [style*="display:none"], [aria-hidden="true"]');if(e&&!le(e))return!1}catch{}try{let e=window.getComputedStyle?window.getComputedStyle(o):o.style;if(e&&(e.display==="none"||e.visibility==="hidden"))return!1}catch{}try{if(typeof o.getBoundingClientRect=="function"){let e=o.getBoundingClientRect();if(e.width>0||e.height>0)return!0}}catch{}return(o.textContent||"").trim().length>0}function $(o){try{if(typeof CSS<"u"&&typeof CSS.escape=="function")return CSS.escape(o)}catch{}return String(o).replace(/["\\]/g,"\\$&")}function C(o){let e=o;if(!e||typeof e.isConnected=="boolean"&&!e.isConnected||le(e))return!1;let t=e.tagName?.toLowerCase();if(["input","select","textarea","button"].includes(t)){let a=e.type?.toLowerCase();if(a==="checkbox"||a==="radio"){if(e.id)try{let n=e.ownerDocument?.querySelector(`label[for="${$(e.id)}"]`);if(n&&Ge(n))return!0}catch{}let i=e.closest('label, .option-card, .quiz-option, .choice, .answer, [role="radio"], [role="checkbox"], [class*="option" i], [class*="choice" i], [class*="item" i], li, tr');if(i&&i!==e&&Ge(i))return!0}try{if(!e.closest('[hidden], [style*="display: none"], [style*="display:none"], [aria-hidden="true"]')){let n=window.getComputedStyle?window.getComputedStyle(e):e.style;if(!n||n.display!=="none"&&n.visibility!=="hidden"){if(typeof e.getBoundingClientRect=="function"){let r=e.getBoundingClientRect();if(r.width>0||r.height>0)return!0}return!0}}}catch{}}return Ge(e)}function Xt(o){if(o==null)return"";if(typeof o=="string")return o;if(typeof o=="number"||typeof o=="boolean")return String(o);if(o instanceof Node)return o.textContent||"";try{if(typeof o?.toString=="function"){let e=o.toString();if(typeof e=="string")return e}}catch{}return""}function I(o,e=500){return Xt(o).replace(/\s+/g," ").trim().slice(0,e)}function Zt(o){let e=o.dataset.easyquizId;if(e)return e;let t=`eq-${Date.now().toString(36)}-${(Wt+=1).toString(36)}`;return o.dataset.easyquizId=t,t}function le(o){return o?!!(o.closest('#easyquiz-shadow-root, .eq-sidebar, .eq-launcher, [data-easyquiz-ignore="true"], .btn-inject-eq, #btn-inject-script')||o.getAttribute?.("data-easyquiz-ignore")==="true"):!1}var qe=/(leaderboard|scoreboard|placar|ranking|trophy|pause|pausar|mute|mutar|audio|sound|som|música|music|configuraç|settings|theme|ajuda|help|report|denunciar|feedback|power-?up|streak|coins|fullscreen|full-screen|(?:audio|sound|som|media)[-_ ]*volume|volume[-_ ]*(?:slider|control|level|btn|button|icon|mute)|vol-slider)/i;function P(o){if(!o||typeof o.getAttribute!="function"||typeof Element<"u"&&!(o instanceof Element))return!1;if(le(o))return!0;let e=o.tagName?.toLowerCase();if(["select","textarea"].includes(e)||e==="input"&&!["button","submit","reset"].includes((o.type||"").toLowerCase()))return!1;let a=o.closest?.('button, a, [role="button"], [class*="leaderboard" i], [data-testid*="leaderboard" i], [class*="scoreboard" i], [class*="trophy" i]')||o,i=String(a.getAttribute?.("data-testid")||a.getAttribute?.("data-test-id")||a.getAttribute?.("id")||""),n=String(a.getAttribute?.("aria-label")||""),r=String(a.getAttribute?.("title")||""),s=typeof a.className=="string"?a.className:typeof a.className?.baseVal=="string"?a.className.baseVal:"",l=I(a.textContent,60);return!!(qe.test(i)||qe.test(n)||qe.test(r)||qe.test(s)||l.length>0&&l.length<=25&&qe.test(l))}function F(o){if(!o||typeof o.getAttribute!="function"||typeof Element<"u"&&!(o instanceof Element)||le(o)||P(o)||o.closest?.('.option-card, .choice-card, .quiz-option, [class*="option-card" i], [class*="choice-card" i], [class*="option-item" i], [class*="choice-item" i], [class*="answer-item" i], [data-testid*="option" i], [data-testid*="choice" i], [data-choice], [data-option], [data-answer], [role="radio"], [role="checkbox"], [role="option"]')||o.closest?.("header, nav, aside"))return!1;let e=typeof HTMLInputElement<"u"&&o instanceof HTMLInputElement||typeof HTMLButtonElement<"u"&&o instanceof HTMLButtonElement?o.value:"",t=I(o.getAttribute?.("aria-label")||o.textContent||o.getAttribute?.("value")||e),a=o.type,i=t.replace(/[\d\(\)\[\]→\>\•\-\/\\]+/g," ").trim(),n=String(o.getAttribute?.("data-testid")||o.getAttribute?.("data-test-id")||o.getAttribute?.("id")||o.getAttribute?.("href")||"").toLowerCase();return Se.test(i)||Se.test(t)||a==="submit"||n.includes("next")||n.includes("check")||n.includes("continue")||n.includes("proximo")||n.includes("forward")||!1}function Fe(o){let e=o.closest("tr");if(e){let l=e.querySelector("th, td:first-child"),d=l&&l!==o.closest("td")?I(l.textContent,100):"",u=I(o.closest("label, td")?.textContent||"",50);if(d&&u)return`${d}: ${u}`}let t=o.closest('.dropdown-row, [class*="dropdown-row" i], [class*="select-row" i]');if(t){let l=t.querySelector('.dropdown-label, [class*="label" i]'),d=l&&l!==o?I(l.textContent,150):"";if(d)return d}let a=o.getAttribute("aria-label");if(a)return I(a);let i=o.getAttribute("aria-labelledby");if(i){let l=i.split(/\s+/).map(d=>document.getElementById(d)?.textContent).filter(Boolean).join(" ");if(l.trim())return I(l)}if("labels"in o&&o.labels){let l=Array.from(o.labels??[]).map(d=>d.textContent).join(" ");if(l.trim())return I(l)}let n=o.closest('.docssharedWizToggleLabeledContainer, [role="listitem"], .answer, label, .quiz-option, .form-check, .option-card');if(n&&n!==o){let l=I(n.textContent);if(l)return l}let r=o instanceof HTMLInputElement||o instanceof HTMLButtonElement?o.value:"",s=o.getAttribute("placeholder")||o.getAttribute("title")||o.textContent||r||"";return I(s)}function Ue(o,e){let a=typeof HTMLSelectElement<"u"&&o instanceof HTMLSelectElement||o.tagName.toLowerCase()==="select"?o:null,i=o;o.dataset.easyquizRole=e;let n=o.tagName.toLowerCase(),r=["input","textarea","select","button"].includes(n)?n:"other",s=o.getAttribute("role")||"",l=(o.getAttribute("data-testid")||o.getAttribute("data-test-id")||"").toLowerCase(),d=(o.className&&typeof o.className=="string"?o.className:"").toLowerCase(),u=o.getAttribute("draggable")==="true"||o.classList.contains("perseus-drag-item")||o.classList.contains("sortable-item")||!!o.getAttribute("aria-grabbed")||/drag|card|option|item/i.test(l)||/drag|card-item|sortable/i.test(d),m=o.getAttribute("data-role")==="dropzone"||o.classList.contains("category-container")||o.hasAttribute("data-category")||!!o.getAttribute("aria-dropeffect")||/drop|category|bucket/i.test(l)||/dropzone|category-box|bucket|target-zone/i.test(d),p=I((u?"draggable":m?"dropzone":"")||i.type||s||r,40),h="";if(i.type==="checkbox"||i.type==="radio"||s==="radio"||s==="checkbox")h=i.checked||o.getAttribute("aria-checked")==="true"?"checked":"unchecked";else if(r==="button"||n==="a"||e==="navigation"||F(o))h="";else{let w=typeof o.value=="string"||typeof o.value=="number"?o.value:"";h=I(w||o.getAttribute("data-category")||"",2e3)}let b=[];if(a&&a.options)for(let w of Array.from(a.options).slice(0,80))b.push({value:I(w.value),label:I(w.textContent)});else if(s==="combobox"||s==="listbox"||d.includes("select")||d.includes("dropdown")){let w=o.getAttribute("aria-controls")||o.getAttribute("aria-owns"),T=w?document.getElementById(w):o;if(T){let L=T.querySelectorAll('[role="option"], li, .dropdown-item, .option');for(let M of Array.from(L).slice(0,80)){let S=I(M.textContent);S&&b.push({value:M.getAttribute("data-value")||M.getAttribute("value")||S,label:S})}}}let f=!!(i.required||o.getAttribute("aria-required")==="true"),g=!!(i.disabled||o.getAttribute("aria-disabled")==="true"),y=Zt(o);return{id:o.id||y,tag:r,type:p,label:Fe(o),name:I(i.name||o.getAttribute("name")||"",180),value:h,options:b,required:f,disabled:g,role:e}}var wt=['[data-test-id*="exercise" i]','[data-testid*="exercise" i]',".perseus-renderer",".framework-perseus",".Qr7Oae",".que",".question-holder",".quiz-question",".question_holder",".display_question",'[data-functional-selector*="question"]',".question-container","[data-question-id]",'[data-testid*="question" i]','[class*="question-container" i]','[class*="question" i]','[class*="pergunta" i]',"article","form","section","main"].join(",");function qt(o){if(!C(o))return-1/0;let e=o.getBoundingClientRect(),t=Array.from(o.querySelectorAll(re)).filter(C),a=I(o.innerText||o.textContent||"",4e3).length;if(a<10||!t.length&&a<60)return-1/0;let i=Math.max(1,window.innerWidth*window.innerHeight),n=Math.max(1,e.width*e.height),r=Math.min(1,n/i),s=e.top+e.height/2,l=Math.abs(s-window.innerHeight/2)/Math.max(1,window.innerHeight),d=a>40?35:0,u=e.top>=0&&e.bottom<=window.innerHeight?25:0;return t.length*15+Math.min(60,a/20)+d+u-r*20-l*10}function ke(o){let e=o;if(e.matches?.('article, [data-test-id*="exercise" i], [data-testid*="exercise" i], .perseus-renderer, .framework-perseus, [class*="question-container" i], .que')&&e.tagName.toLowerCase()!=="main"&&e.tagName.toLowerCase()!=="body")return e;for(;e.parentElement&&e.parentElement!==document.body&&e.parentElement!==document.documentElement;){let t=e.parentElement,a=t.tagName.toLowerCase();if(["header","footer","nav","aside"].includes(a))break;if(t.matches?.('article, [data-test-id*="exercise" i], [data-testid*="exercise" i], .perseus-renderer, .framework-perseus, [class*="question-container" i], .que')&&a!=="main"&&a!=="body"){e=t;break}let i=I(e.innerText||e.textContent||"",1e4),n=I(t.innerText||t.textContent||"",1e4),r=e.querySelectorAll(re).length,s=t.querySelectorAll(re).length;if(i.length<150&&n.length>i.length&&s<=r+4&&a!=="main"&&a!=="body"){e=t;continue}break}return e}function Et(o){let e=o,t=e.closest('main, [role="main"], article, form, [data-test-id*="exercise" i], [data-testid*="exercise" i], .framework-perseus, section');if(t&&t!==document.body&&C(t))return t;let a=0;for(;e.parentElement&&e.parentElement!==document.body&&a<3;)e=e.parentElement,a++;return e||document.body}function B(){let o=document.activeElement;if(o&&o!==document.body){let n=o.closest(wt);if(n&&qt(n)>0)return ke(n)}let t=Array.from(document.querySelectorAll(wt)).map(n=>({element:n,score:qt(n)})).filter(n=>Number.isFinite(n.score)).sort((n,r)=>r.score-n.score),a=t.find(n=>{let r=n.element.tagName.toLowerCase();return r!=="main"&&r!=="body"&&n.score>0});if(a)return ke(a.element);if(t.length>0&&t[0].score>0)return ke(t[0].element);let i=document.querySelector('form, main, [role="main"]');return i&&C(i)?i:document.body}function Ct(o){let e=o.cloneNode(!0);e.querySelectorAll("script, style, iframe, object, embed, svg, canvas, noscript, audio, video").forEach(a=>a.remove());let t=["type","name","value","role","aria-label","aria-labelledby","aria-checked","aria-required","required","disabled","data-easyquiz-id","draggable","class","id","data-widget-type","data-role","data-category","data-testid"];return e.querySelectorAll("*").forEach(a=>{for(let i of Array.from(a.attributes))t.includes(i.name)||a.removeAttribute(i.name)}),e.outerHTML.replace(/\s+/g," ").slice(0,2e4)}function He(o){let e=Array.from(o.querySelectorAll(re)),t=new Set,a=[];for(let i of e){if(!C(i)||F(i)||P(i))continue;let n=i.tagName.toLowerCase();["input","textarea","select"].includes(n)&&(t.add(i),a.push(i))}for(let i of e){if(!C(i)||F(i)||P(i))continue;let n=i.tagName.toLowerCase();if(["input","textarea","select"].includes(n))continue;let r=i.querySelector("input, textarea, select");if(!(r&&t.has(r))){if(i.hasAttribute("for")){let s=i.getAttribute("for"),l=s?i.ownerDocument.getElementById(s):null;if(l&&t.has(l))continue}if(n==="a"){let s=i.getAttribute("role");if(!(s==="button"||s==="radio"||s==="checkbox"||s==="option"||i.closest('[class*="choice" i], [class*="option" i], [class*="answer" i], [data-testid*="option" i]')))continue}a.push(i)}}return a.slice(0,100).map(i=>Ue(i,"answer"))}function Qe(o){let e=[o,o.parentElement,o.parentElement?.parentElement,document.body].filter(Boolean),t=new Set,a=[];for(let i of e)for(let n of Array.from(i.querySelectorAll(re)))if(!(t.has(n)||!C(n)||!F(n)||P(n))&&(t.add(n),a.push(Ue(n,"navigation")),a.length>=10))return a;return a}function Ee(o=!1){let e=B();e=ke(e),o&&(e=Et(e));let t=He(e),a=Qe(e);if(t.length===0){let s=He(document.body);s.length>0&&(e=Et(e),t=He(e),t.length===0&&(t=s,e=document.querySelector('main, article, form, [role="main"]')||document.body))}a.length===0&&(a=Qe(document.body));let i=e.innerText&&e.innerText.trim().length>0?e.innerText:e.textContent||"",n=I(i,16e3),r=[...t,...a].slice(0,120);return!n||r.length===0&&n.length<30?I(document.body.innerText||document.body.textContent||"",16e3).length>=30?ce():null:{sourceUrl:window.location.href.slice(0,2e3),pageTitle:document.title.slice(0,500)||"P\xE1gina de Quest\xE3o",questionText:n,htmlSnippet:Ct(e),controls:r,scope:e}}function ce(){let o=document.body.innerText||document.body.textContent||document.documentElement.textContent||"",e=I(o,16e3),t=He(document.body),a=Qe(document.body),i=[...t,...a].slice(0,120),n=document.querySelector('main, article, form, [role="main"], [data-test-id*="content" i], [class*="content" i]')||document.body;return{sourceUrl:window.location.href.slice(0,2e3),pageTitle:document.title.slice(0,500)||"P\xE1gina de Quest\xE3o",questionText:e,htmlSnippet:Ct(n).slice(0,15e3),controls:i,scope:n}}function Tt(o){let e=o.controls.map(t=>`${t.role}:${t.id}:${t.type}:${t.value}:${t.disabled}`).join("|");return[window.location.href,o.pageTitle,o.questionText.slice(0,500),e].join("::")}function z(o){return o?!!(o.closest('#easyquiz-shadow-root, .eq-sidebar, .eq-launcher, [data-easyquiz-ignore="true"], .btn-inject-eq, #btn-inject-script')||o.getAttribute?.("data-easyquiz-ignore")==="true"):!1}function v(o){return o==null?"":(typeof o=="string"?o:String(o)).replace(/^(\([0-9a-zA-Z]{1,2}\)|[0-9]{1,3}|[a-zA-Z])[\.\)\-\:]\s+/,"").replace(/[\.\u2026]{2,}/g," ").replace(/['"“”«»]/g,"").replace(/\s+/g," ").trim()}function N(o){if(!o||o instanceof HTMLInputElement||o instanceof HTMLSelectElement||o instanceof HTMLTextAreaElement||o.getAttribute("draggable")==="true"||o.classList.contains("dnd-card")||o.hasAttribute("data-category")||o.hasAttribute("data-dropzone"))return o;if(o.hasAttribute("for")){let a=o.getAttribute("for");if(a){let i=o.ownerDocument.getElementById(a);if(i)return i}}let e=o.closest('label, .option-card, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, tr, li, .dnd-card, [class*="option-card" i], [class*="choice-card" i], .dropdown-row, [class*="dropdown" i], [class*="select-row" i]');if(e&&!["article","section","main","form","body"].includes(e.tagName.toLowerCase())){let a=e.getAttribute("for"),n=(a?e.ownerDocument.getElementById(a):null)||e.querySelector('input:not([type="hidden"]), select, textarea');return n||e}let t=o.closest('button, a, [role="button"], [draggable="true"]');if(t)return t;if(["body","html","main","section","article","form"].includes(o.tagName.toLowerCase())){let a=o.querySelector('button, [role="button"], a, input:not([type="hidden"]), select, textarea, [role="radio"], [role="checkbox"], .option-card, label');if(a)return N(a)}return o}function At(o){let e=o;if(!e||!document.contains(e))try{e=B()}catch{}e=e||document.body;let t=Array.from(e.querySelectorAll("tr")).filter(n=>C(n)&&n.querySelector('input[type="radio"], input[type="checkbox"]'));if(t.length>1)return t;let a=Array.from(e.querySelectorAll('input[type="checkbox"], input[type="radio"], [role="checkbox"], [role="radio"]')).filter(n=>C(n)&&!z(n));return a.length>0?a:Array.from(e.querySelectorAll('.option-card, [role="option"], [class*="choice-card" i], [class*="option-card" i], li[class*="choice" i], li[class*="option" i]')).filter(n=>C(n)&&!z(n)).filter(n=>!n.parentElement?.closest('.option-card, [role="option"], [class*="choice-card" i], [class*="option-card" i]'))}function E(o,e,t=!1){if(o==null)return null;let i=(typeof o=="string"?o:String(o)).trim().replace(/^["'“”«»]+|["'“”«»]+$/g,"");if(!i)return null;let n=$(i),r=document.querySelector(`[data-easyquiz-id="${n}"]`);if(r&&!z(r)&&C(r))return N(r);try{let c=document.getElementById(i);if(c&&!z(c)&&C(c))return c.hasAttribute("data-category")||c.hasAttribute("data-dropzone")||c.classList.contains("dnd-zone")?c:N(c)}catch{}let s=i.match(/^(?:item|opção|opcao|afirmação|afirmacao|alternativa|linha|afirmativa|questão|questao|campo|blank|lacuna|input|resposta)?\s*#?_?([0-9]+)$/i);if(s){let c=parseInt(s[1],10);if(t){let h=document.body;try{h=B()||document.body}catch{}let b=Array.from(h.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, select, [contenteditable="true"]')).filter(f=>C(f)&&!z(f));if(c>=1&&c-1<b.length)return b[c-1];if(c===0&&b.length>0)return b[0]}let p=c-1;if(p>=0){let h=At();if(p<h.length){let g=h[p];if(g.tagName.toLowerCase()==="tr"){if(e){let x=g.querySelector(`input[value="${$(e)}" i], [data-value="${$(e)}" i]`);if(x)return x}let y=g.querySelector("input");if(y)return y}return N(g)}let b=document.body;try{b=B()||document.body}catch{}let f=Array.from(b.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, select, [contenteditable="true"]')).filter(g=>C(g)&&!z(g));if(p<f.length)return f[p]}}let l=i.match(/^(?:item|opção|opcao|afirmação|afirmacao|alternativa|linha|afirmativa|questão|questao)?\s*#?([a-eA-E])$/i);if(l){let c=l[1].toUpperCase().charCodeAt(0)-65;if(c>=0){let p=At();if(c<p.length){let h=p[c];if(h.tagName.toLowerCase()==="tr"){if(e){let f=h.querySelector(`input[value="${$(e)}" i], [data-value="${$(e)}" i]`);if(f)return f}let b=h.querySelector("input");if(b)return b}return N(h)}}}if(/^[a-zA-Z0-9_-]{1,10}$/.test(i)){let p=Array.from(document.querySelectorAll(`[data-category="${n}" i], [data-dropzone="${n}" i], [data-role="dropzone"][data-category="${n}" i]`)).find(g=>C(g)&&!z(g));if(p)return p;let b=Array.from(document.querySelectorAll(`input[value="${n}" i], [data-value="${n}" i], input[id="${n}" i], input[placeholder="${n}" i], textarea[placeholder="${n}" i], [title="${n}" i]`)).find(g=>C(g)&&!z(g));if(b)return N(b);let f=Array.from(document.querySelectorAll('.option-badge, [class*="badge" i], [class*="letter" i], .option-card span, label span')).find(g=>{if(!C(g)||z(g))return!1;let y=v(g.textContent).toLowerCase();return y===i.toLowerCase()||y===i.toLowerCase()+")"});if(f)return N(f)}try{let p=Array.from(document.querySelectorAll(`[name="${n}"], [value="${n}"], [placeholder="${n}" i], [title="${n}" i], [data-category="${n}" i], [data-dropzone="${n}" i], [data-testid="${n}" i], [data-test-id="${n}" i], [aria-label="${n}" i]`)).find(h=>C(h)&&!z(h));if(p)return p.hasAttribute("data-category")||p.hasAttribute("data-dropzone")||p.classList.contains("dnd-zone")?p:N(p)}catch{}if(/^[.#\[]|\s|[>+~:]/.test(i))try{let p=Array.from(document.querySelectorAll(i)).find(h=>C(h)&&!z(h));if(p)return N(p)}catch{}try{let c=i.replace(/"/g,""),p=`//button[normalize-space(.)="${c}"] | //a[normalize-space(.)="${c}"] | //*[not(*) and normalize-space(.)="${c}"] | //*[@aria-label="${c}"] | //*[@data-category="${c}"] | //*[@data-testid="${c}"]`,h=document.evaluate(p,document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);for(let b=0;b<h.snapshotLength;b++){let f=h.snapshotItem(b);if(f&&C(f)&&!z(f)){if(["body","html"].includes(f.tagName.toLowerCase())){let y=f.querySelector('button, [role="button"], a, input, [role="radio"], [role="checkbox"], label');if(y&&C(y))return N(y)}return f.closest('[data-role="dropzone"], [class*="category" i], [class*="bucket" i], [class*="column" i], [class*="drop" i]')||N(f)}}}catch{}let u=v(i).toLowerCase(),m=Array.from(document.querySelectorAll('button, a, div, span, li, p, label, input, textarea, select, [draggable="true"], [data-testid], [class*="option" i], [class*="card" i], [class*="item" i], [class*="choice" i], [class*="category" i], [class*="bucket" i]'));for(let c of m){if(!C(c)||z(c)||c.closest("header, nav, .stepper, .step-item, .progress-bar-container")||P(c)||!!(c.matches('article, section, form, main, [class*="container" i], [class*="grid" i], .dnd-pool, .dnd-zones')||c.querySelector('label, [role="radio"], [role="checkbox"], .dnd-card, [draggable="true"], .option-card, tr'))&&!c.matches(".dnd-zone, [data-category], [data-dropzone]"))continue;let h=v(c.textContent).toLowerCase(),b=v(c.getAttribute("aria-label")||"").toLowerCase(),f=v(c.getAttribute("placeholder")||"").toLowerCase(),g=v(c.getAttribute("title")||"").toLowerCase(),y=v(c.getAttribute("name")||"").toLowerCase(),x=v(c.getAttribute("data-category")||"").toLowerCase(),w=c instanceof HTMLInputElement||c instanceof HTMLButtonElement?c.value:"",T=v(w).toLowerCase(),L=h.startsWith(u+")")||h.startsWith(u+".")||h.startsWith(u+" -")||h.startsWith(u+":");if(h===u||b===u||f===u||g===u||y===u||x&&x===u||T&&T===u||L)return c.closest('[data-role="dropzone"], [class*="category" i], [class*="bucket" i], [class*="column" i], [class*="drop" i]')||N(c)}if(u.length>=3)for(let c of m){if(!C(c)||z(c)||c.closest("header, nav, .stepper, .step-item, .progress-bar-container")||P(c)||!!(c.matches('article, section, form, main, [class*="container" i], [class*="grid" i], .dnd-pool, .dnd-zones')||c.querySelector('label, [role="radio"], [role="checkbox"], .dnd-card, [draggable="true"], .option-card, tr'))&&!c.matches(".dnd-zone, [data-category], [data-dropzone]"))continue;let h=v(c.textContent).toLowerCase(),b=v(c.getAttribute("aria-label")||"").toLowerCase(),f=v(c.getAttribute("placeholder")||"").toLowerCase(),g=v(c.getAttribute("title")||"").toLowerCase(),y=v(c.getAttribute("name")||"").toLowerCase();if(h.includes(u)||b.includes(u)||f.includes(u)||g.includes(u)||y.includes(u)){if(Array.from(c.children).some(L=>{let M=v(L.textContent).toLowerCase();return M&&M.includes(u)}))continue;return c.closest('[data-role="dropzone"], [class*="category" i], [class*="bucket" i], [class*="column" i], [class*="drop" i]')||N(c)}let x=u.split(/\s+/).filter(Boolean);if(x.length>=3){let w=x.slice(0,Math.min(5,x.length)).join(" ");if(h.includes(w)||b.includes(w)||f.includes(w))return N(c)}}return null}function Mt(o,e){for(let t of e)o.dispatchEvent(new Event(t,{bubbles:!0,composed:!0}))}function D(o,e){if(!o)return;let t=o instanceof HTMLInputElement&&["checkbox","radio"].includes(o.type)?o:o.querySelector('input[type="checkbox"], input[type="radio"]')||(o.hasAttribute("for")?o.ownerDocument.getElementById(o.getAttribute("for")):null);if(t&&o!==t){if(t.type==="checkbox"){j(t,!0);return}if(t.type==="radio"){j(t,!0);return}}try{o.scrollIntoView({block:"center",inline:"center",behavior:"instant"})}catch{}try{o.focus?.()}catch{}if(typeof HTMLButtonElement<"u"&&o instanceof HTMLButtonElement||typeof HTMLAnchorElement<"u"&&o instanceof HTMLAnchorElement||o.tagName?.toLowerCase()==="a"||o.tagName?.toLowerCase()==="button"||typeof HTMLInputElement<"u"&&o instanceof HTMLInputElement&&!["checkbox","radio"].includes(o.type)){try{o.click()}catch{}return}let i=o.getBoundingClientRect(),n=e?e[0]:Math.round(i.left+Math.max(1,i.width/2)),r=e?e[1]:Math.round(i.top+Math.max(1,i.height/2)),s={bubbles:!0,cancelable:!0,composed:!0,view:window,clientX:n,clientY:r};try{o.dispatchEvent(new PointerEvent("pointerdown",{...s,button:0,buttons:1}))}catch{}try{o.dispatchEvent(new MouseEvent("mousedown",{...s,button:0,buttons:1}))}catch{}try{o.dispatchEvent(new PointerEvent("pointerup",{...s,button:0,buttons:0}))}catch{}try{o.dispatchEvent(new MouseEvent("mouseup",{...s,button:0,buttons:0}))}catch{}try{o.dispatchEvent(new MouseEvent("click",{...s,button:0,buttons:0}))}catch{}try{o.click()}catch{}}function Ie(o,e){let t=o;if(t.hasAttribute("for")){let d=t.getAttribute("for"),u=t.ownerDocument.getElementById(d);u&&(t=u)}if(typeof HTMLSelectElement<"u"&&t instanceof HTMLSelectElement||t.tagName?.toLowerCase()==="select"||t.getAttribute("role")==="combobox"||t.getAttribute("role")==="listbox"||t.matches?.('[role="combobox"], [role="listbox"], [class*="select" i], [class*="dropdown" i]')){ze(t,[e]);return}let i=t.querySelector('select, [role="combobox"], [role="listbox"]');if(i){ze(i,[e]);return}if(!(t instanceof HTMLInputElement)&&!(t instanceof HTMLTextAreaElement)&&!(t instanceof HTMLSelectElement)&&!t.isContentEditable){let d=t.querySelector('input:not([type="hidden"]), textarea, select, [contenteditable="true"]');if(d)t=d;else{let m=t.closest('.form-group, .field, [class*="input" i], [class*="control" i], label, tr, td, li, p, div')?.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, select, [contenteditable="true"]');if(m)t=m;else{let c=t.nextElementSibling;for(;c;){if(c instanceof HTMLInputElement&&!["hidden","button","submit","checkbox","radio"].includes(c.type)||c instanceof HTMLTextAreaElement||c instanceof HTMLElement&&c.isContentEditable){t=c;break}let p=c.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(p){t=p;break}c=c.nextElementSibling}}}}if(t instanceof HTMLButtonElement||t.tagName.toLowerCase()==="a"||t.getAttribute("role")==="button"||t instanceof HTMLInputElement&&["button","submit","reset","image"].includes(t.type)){let d=t.parentElement?.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(d)t=d;else{let u=document.body;try{u=B()||document.body}catch{}let m=u.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(m)t=m;else{console.warn("[EasyQuiz] setNativeValue: Nenhum campo de texto encontrado para receber o valor.");return}}}if(!(t instanceof HTMLInputElement)&&!(t instanceof HTMLTextAreaElement)&&!(t instanceof HTMLSelectElement)&&!t.isContentEditable){let d=document.body;try{d=B()||document.body}catch{}let u=d.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(u)t=u;else{console.warn("[EasyQuiz] setNativeValue: Nenhum campo de texto encontrado para receber o valor.");return}}if(t instanceof HTMLInputElement&&["checkbox","radio"].includes(t.type)){let d=["true","1","checked","yes","sim"].includes(e.toLowerCase())||e===t.value;j(t,d);return}let r=String(e??""),s=r;if(t instanceof HTMLInputElement&&t.type==="number"){let d=r.replace(",",".").replace(/[^0-9.-]/g,"");d&&!isNaN(Number(d))&&(s=d)}try{t.scrollIntoView?.({block:"center",inline:"center",behavior:"instant"}),t.focus?.()}catch{}let l=!1;try{if(t instanceof HTMLInputElement||t instanceof HTMLTextAreaElement){if(t.type!=="number"){try{t.select?.()}catch{}l=document.execCommand?.("insertText",!1,s)||!1}}else if(t.isContentEditable){try{document.execCommand?.("selectAll",!1,void 0)}catch{}l=document.execCommand?.("insertText",!1,s)||!1}}catch{}if(t instanceof HTMLInputElement||t instanceof HTMLTextAreaElement){try{let m=t._valueTracker;m&&m.setValue(s===""?" ":"")}catch{}let d=t instanceof HTMLTextAreaElement?HTMLTextAreaElement.prototype:HTMLInputElement.prototype,u=Object.getOwnPropertyDescriptor(d,"value")?.set;u?u.call(t,s):t.value=s;try{t.dispatchEvent(new KeyboardEvent("keydown",{bubbles:!0,cancelable:!0,key:s.slice(-1)||"a"}))}catch{}try{t.dispatchEvent(new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,composed:!0,data:s,inputType:"insertText"}))}catch{}try{t.dispatchEvent(new InputEvent("input",{bubbles:!0,cancelable:!0,composed:!0,data:s,inputType:"insertText"}))}catch{t.dispatchEvent(new Event("input",{bubbles:!0,cancelable:!0,composed:!0}))}try{t.dispatchEvent(new KeyboardEvent("keyup",{bubbles:!0,cancelable:!0,key:s.slice(-1)||"a"}))}catch{}try{t.dispatchEvent(new Event("change",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}try{t.dispatchEvent(new FocusEvent("blur",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}if(t.value!==s&&!(t instanceof HTMLInputElement&&t.type==="number"&&Number(t.value)===Number(s))){t.value=s;try{u?.call(t,s)}catch{}}return}if(t.isContentEditable){if(t.textContent?.trim()!==s.trim()){t.textContent=s;try{t.innerText=s}catch{}}try{t.dispatchEvent(new InputEvent("input",{bubbles:!0,cancelable:!0,composed:!0,data:s,inputType:"insertText"}))}catch{t.dispatchEvent(new Event("input",{bubbles:!0,cancelable:!0,composed:!0}))}try{t.dispatchEvent(new Event("change",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}try{t.dispatchEvent(new FocusEvent("blur",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}return}try{"value"in t&&(t.value=s),t.dispatchEvent(new Event("input",{bubbles:!0,cancelable:!0,composed:!0})),t.dispatchEvent(new Event("change",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}}function Ce(o,e=""){if(o==null)return e;let t=typeof o=="string"?o:String(o);if(!t)return e;let a=/^(eq-|#|\$|\.|input_|mat-|choice_|radio_|chk_)/i.test(t),i=v(t),n=E(t)||E(i);if(!n)return a?e:i||e;let r=n.closest('label, .option-card, [class*="choice" i], [class*="option" i], .quiz-option, tr, td, li');if(r){let m=v(r.textContent);if(m&&m.length>0&&m.length<150)return m}if(n.id){let m=document.querySelector(`label[for="${$(n.id)}"]`);if(m){let c=v(m.textContent);if(c&&c.length>0&&c.length<150)return c}}let s=n.getAttribute("aria-label");if(s)return v(s);let l=n.getAttribute("placeholder");if(l)return v(l);let d=v(n.textContent);if(d&&d.length>0&&d.length<120)return d;let u=n instanceof HTMLInputElement||n instanceof HTMLButtonElement?n.value:"";return u?v(u):a?e:i||e}function j(o,e){let t=o.closest('.option-card, label, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, [class*="option" i], [class*="choice" i], li')||o,a=o instanceof HTMLInputElement&&["checkbox","radio"].includes(o.type)?o:t.querySelector('input[type="checkbox"], input[type="radio"]');if(!a&&t.hasAttribute("for")&&(a=t.ownerDocument.getElementById(t.getAttribute("for"))),t){let i=e?"true":"false";t.setAttribute("aria-checked",i),t.setAttribute("aria-selected",i),t.classList.toggle("selected",e),t.classList.toggle("active",e),t.classList.toggle("checked",e)}if(a){if(a.checked===e)return;try{a.focus?.(),a.click()}catch{}if(a.checked!==e){try{let i=a._valueTracker;i&&i.setValue(!e)}catch{}try{Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"checked")?.set?.call(a,e)}catch{}a.checked=e,Mt(a,["input","change"])}}else{try{t.focus?.()}catch{}try{t.click()}catch{D(t)}}}function ze(o,e){let t=typeof HTMLSelectElement<"u"&&o instanceof HTMLSelectElement||o.tagName?.toLowerCase()==="select"?o:o.querySelector("select");if(t){let r=e.map(d=>v(d).toLowerCase()),s=!1,l=(d,u)=>{d.selected=!0,t.selectedIndex=u;try{t.value=d.value}catch{}try{Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype,"value")?.set?.call(t,d.value)}catch{}try{let m=t._valueTracker;m&&m.setValue(d.value)}catch{}s=!0};for(let d=0;d<t.options.length;d++){let u=t.options[d],m=u.value.toLowerCase(),c=v(u.textContent).toLowerCase();if(r.some(h=>h===m||h===c)){if(l(u,d),!t.multiple)break}else t.multiple||(u.selected=!1)}if(!s)for(let d of r){let u=d.match(/^(?:item|opção|opcao|alternativa|linha|escolha|campo)?\s*#?_?([0-9]+)$/i);if(u){let m=parseInt(u[1],10),p=t.options[0]?.value===""||t.options[0]?.disabled?m:m>=1?m-1:0;if(p>=0&&p<t.options.length&&(l(t.options[p],p),!t.multiple))break}}if(!s){for(let d of r)if(/^[a-z]$/i.test(d)){let u=d.toUpperCase().charCodeAt(0)-65,c=t.options[0]?.value===""||t.options[0]?.disabled?u+1:u;if(c>=0&&c<t.options.length&&(l(t.options[c],c),!t.multiple))break}}if(!s){let d=u=>u.normalize("NFD").replace(/[\u0300-\u036f]/g,"");for(let u=0;u<t.options.length;u++){let m=t.options[u],c=d(m.value.toLowerCase()),p=d(v(m.textContent).toLowerCase());if(r.some(b=>{let f=d(b);return c.includes(f)||p.includes(f)||f.length>2&&(f.includes(c)||f.includes(p))})&&(l(m,u),!t.multiple))break}}if(s){Mt(t,["focus","input","change","blur"]);return}}let a=o.matches?.('[role="combobox"], [role="listbox"], [class*="select" i], [class*="dropdown" i]')?o:o.closest('[role="combobox"], [role="listbox"], [class*="select" i], [class*="dropdown" i]');a&&D(a);let i=e.map(r=>v(r).toLowerCase()),n=Array.from(document.querySelectorAll('[role="listbox"] [role="option"], [role="menu"] [role="menuitem"], .select-dropdown li, .dropdown-menu .dropdown-item, .ant-select-item-option, .MuiMenuItem-root, [class*="option-item"], li[data-value]')).filter(r=>C(r)&&!z(r));for(let r of i){let s=n.find(d=>{let u=v(d.textContent).toLowerCase(),m=v(d.getAttribute("data-value")||d.getAttribute("value")||"").toLowerCase();return u===r||m===r||u.includes(r)||r.length>2&&r.includes(u)});if(s){D(s);let d=s.querySelector('input[type="radio"], input[type="checkbox"]');d&&j(d,!0);return}let l=E(r);if(l){D(l);return}}}function eo(o,e){try{let t=new DataTransfer;try{t.setData("text/plain",o)}catch{}try{t.setData("text/html",e)}catch{}return t}catch{return null}}function Ye(o){try{o.click()}catch{let e=o.ownerDocument.defaultView||window;o.dispatchEvent(new e.MouseEvent("click",{bubbles:!0,cancelable:!0,composed:!0,view:e}))}}function Y(o,e){let t=v(o).toLowerCase();if(!t)return null;let a=e==="source"?'.dnd-card, [draggable="true"]':'[data-dropzone], [data-category], [data-role="dropzone"]',i=Array.from(document.querySelectorAll(a)),n=e==="destination"?i.find(r=>[r.getAttribute("data-category"),r.getAttribute("data-dropzone")].some(s=>s?.trim().toLowerCase()===t)):null;return n&&C(n)&&!z(n)?n:i.find(r=>{if(!C(r)||z(r))return!1;let s=v(`${r.textContent||""} ${r.getAttribute("data-category")||""} ${r.getAttribute("data-dropzone")||""}`).toLowerCase();return s===t||s.includes(t)})||null}async function $e(o,e,t=1){try{o.scrollIntoView({block:"center",inline:"center",behavior:"instant"})}catch{}let a=o.getBoundingClientRect(),i=e.getBoundingClientRect(),n=Math.round(a.left+Math.max(1,a.width/2)),r=Math.round(a.top+Math.max(1,a.height/2)),s=Math.round(i.left+Math.max(1,i.width/2)),l=Math.round(i.top+Math.max(1,i.height/2)),d=v(e.textContent).toLowerCase();if(d){let b=Array.from(o.querySelectorAll('button, [role="button"], input[type="radio"], input[type="checkbox"], option, .btn, [class*="tag" i]')).find(f=>{let g=v(f.textContent).toLowerCase(),y=f instanceof HTMLInputElement||f instanceof HTMLOptionElement?v(f.value).toLowerCase():"";return g&&(d.includes(g)||g.includes(d))||y&&(d.includes(y)||y.includes(d))});b&&(D(b),await new Promise(f=>setTimeout(f,120)))}Ye(o),await new Promise(h=>setTimeout(h,140)),Ye(e);let u=e.querySelector('[data-role="dropzone"], [class*="bucket" i], [class*="slot" i], [class*="drop" i], [class*="target" i], [class*="items" i], ul, ol');if(u&&u!==e&&Ye(u),await new Promise(h=>setTimeout(h,100)),!e.contains(o)&&o.matches('.dnd-card, [draggable="true"]')&&e.matches('.dnd-zone, [data-dropzone], [data-role="dropzone"]')&&e.appendChild(o),e.contains(o)&&o.matches('.dnd-card, [draggable="true"]'))return;let m={bubbles:!0,cancelable:!0,composed:!0,view:window,clientX:n,clientY:r,screenX:n,screenY:r,button:0,buttons:1};try{o.dispatchEvent(new PointerEvent("pointerdown",{...m,isPrimary:!0,pointerId:1,pointerType:"mouse",pressure:.5}))}catch{}o.dispatchEvent(new MouseEvent("mousedown",m));let c=4;for(let h=1;h<=c;h++){let b=Math.round(n+(s-n)*(h/c)),f=Math.round(r+(l-r)*(h/c)),g={...m,clientX:b,clientY:f,screenX:b,screenY:f};try{o.dispatchEvent(new PointerEvent("pointermove",{...g,isPrimary:!0,pointerId:1,pointerType:"mouse",pressure:.5}))}catch{}document.dispatchEvent(new MouseEvent("mousemove",g))}let p={bubbles:!0,cancelable:!0,composed:!0,view:window,clientX:s,clientY:l,screenX:s,screenY:l,button:0,buttons:0};try{e.dispatchEvent(new PointerEvent("pointerup",{...p,isPrimary:!0,pointerId:1,pointerType:"mouse",pressure:0}))}catch{}e.dispatchEvent(new MouseEvent("mouseup",p)),e.dispatchEvent(new MouseEvent("click",p));try{let h=eo(I(o.textContent),o.outerHTML),b={...m},f={...p};h&&(b.dataTransfer=h,f.dataTransfer=h);let g=o.ownerDocument.defaultView?.DragEvent;if(!g)throw new Error("DragEvent n\xE3o dispon\xEDvel neste documento");o.dispatchEvent(new g("dragstart",b)),e.dispatchEvent(new g("dragenter",f)),e.dispatchEvent(new g("dragover",f)),e.dispatchEvent(new g("drop",f)),o.dispatchEvent(new g("dragend",b))}catch(h){console.warn("[EasyQuiz] DragEvent ignorado com seguran\xE7a:",h)}try{let h=new Touch({identifier:1,target:o,clientX:n,clientY:r}),b=new Touch({identifier:1,target:e,clientX:s,clientY:l});o.dispatchEvent(new TouchEvent("touchstart",{bubbles:!0,cancelable:!0,touches:[h]})),e.dispatchEvent(new TouchEvent("touchmove",{bubbles:!0,cancelable:!0,touches:[b]})),e.dispatchEvent(new TouchEvent("touchend",{bubbles:!0,cancelable:!0,touches:[]}))}catch{}if(t>=2&&!e.contains(o))try{o.focus?.(),o.dispatchEvent(new KeyboardEvent("keydown",{key:" ",code:"Space",bubbles:!0})),o.dispatchEvent(new KeyboardEvent("keyup",{key:" ",code:"Space",bubbles:!0})),await new Promise(h=>setTimeout(h,80)),e.focus?.(),e.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",bubbles:!0})),e.dispatchEvent(new KeyboardEvent("keyup",{key:"Enter",code:"Enter",bubbles:!0}))}catch{}}var St={fill:(o,e)=>{let t=E(o);t?Ie(t,e):console.warn(`$eq.fill: Elemento '${o}' n\xE3o encontrado`)},click:o=>{let e=E(o);e?!!(e.closest('.option-card, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, [class*="option" i], [class*="choice" i]')||e.querySelector('input[type="radio"], input[type="checkbox"]')||e instanceof HTMLInputElement&&["checkbox","radio"].includes(e.type))?j(e,!0):D(e):console.warn(`$eq.click: Elemento '${o}' n\xE3o encontrado`)},check:(o,e)=>{let t=E(o);t?j(t,e):console.warn(`$eq.check: Elemento '${o}' n\xE3o encontrado`)},find:(o,e)=>E(o,e),drag:(o,e)=>{let t=Y(o,"source")||E(o),a=Y(e,"destination")||E(e);t&&a?$e(t,a):console.warn(`$eq.drag: Origem ou destino n\xE3o encontrado ('${o}' -> '${e}')`)},categorize:async(o,e)=>{let t=Y(o,"source")||E(o),a=Y(e,"destination")||E(e);if(!t||!a){console.warn(`$eq.categorize: Item ou categoria n\xE3o encontrados ('${o}' -> '${e}')`);return}await $e(t,a)},execute:(o,e=!1,t=1)=>Xe(o,e,t)};typeof window<"u"&&(window.$eq=St);async function to(o,e=1,t=we()){if(je(o,t),o.t==="js"){let s=String(o.v||"");xt(s);try{new Function("$eq","document","window",s)(St,document,window)}catch(l){throw console.warn("[EasyQuiz JS Execution]",l),l}return}if(o.t==="drag"){let s=Y(o.from,"source")||E(o.from),l=Y(o.to,"destination")||E(o.to);!s&&o.from&&(s=E(v(o.from))),!l&&o.to&&(l=E(v(o.to))),s&&l?await $e(s,l,e):console.warn(`[EasyQuiz] Drag: alvo n\xE3o encontrado ('${o.from}' -> '${o.to}')`);return}let a=o.id!==void 0&&o.id!==null?String(o.id):"";!a&&o.t==="val"&&(a=o.target??o.name??o.selector??"1");let i=o.v!==void 0?o.v:o.value!==void 0?o.value:o.val!==void 0?o.val:o.text,n=i!=null?String(i).trim():"",r=E(a,n,o.t==="val"||o.t==="sel");if(!r&&a&&(r=E(v(a),n,o.t==="val"||o.t==="sel")),r&&n){if(r instanceof HTMLInputElement&&r.type==="radio"&&r.name){if(v(r.value).toLowerCase()!==v(n).toLowerCase()){let s=document.querySelector(`input[type="radio"][name="${$(r.name)}"][value="${$(n)}" i]`);if(s)r=s;else{let d=Array.from(document.querySelectorAll(`input[type="radio"][name="${$(r.name)}"]`)).find(u=>{let m=u.closest("label, .vf-label, .option-card, tr, td, div");return m&&v(m.textContent).toLowerCase().includes(v(n).toLowerCase())});d&&(r=d)}}}else if(!(r instanceof HTMLInputElement)&&!(r instanceof HTMLSelectElement)&&!(r instanceof HTMLTextAreaElement)){let s=r.querySelector(`input[value="${$(n)}" i], [data-value="${$(n)}" i]`);if(s)r=s;else{let d=Array.from(r.querySelectorAll('input[type="radio"], input[type="checkbox"]')).find(u=>{let m=u.closest("label, .vf-label, .option-card, td, div");return m&&v(m.textContent).toLowerCase().includes(v(n).toLowerCase())});d&&(r=d)}}}if(!r&&(o.t==="val"||o.t==="sel")){let s=document.body;try{s=B()||document.body}catch{}let l=Array.from(s.querySelectorAll(o.t==="sel"?'select, [role="combobox"], [role="listbox"]':'input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, select, [contenteditable="true"]')).filter(d=>C(d)&&!z(d));if(l.length===1)r=l[0];else if(l.length>1){let d=v(a).toLowerCase(),u=d.match(/^#?_?([0-9]+)$/);if(u){let m=parseInt(u[1],10);m>=1&&m<=l.length?r=l[m-1]:m>=0&&m<l.length&&(r=l[m])}r||(r=l.find(c=>{let p=(c.getAttribute("placeholder")||"").toLowerCase(),h=(c.name||"").toLowerCase(),b=(c.getAttribute("aria-label")||"").toLowerCase(),f=(c.id||"").toLowerCase(),g=v(Fe(c)).toLowerCase(),y=v(c.closest('label, tr, td, .form-group, .field, [class*="row" i], div')?.textContent||"").toLowerCase();return p.includes(d)||h.includes(d)||b.includes(d)||f.includes(d)||g&&g.includes(d)||d.length>=2&&y.includes(d)})||(l.length===1?l[0]:null))}}if(!r&&o.t!=="adv"){console.warn(`[EasyQuiz] Alvo '${a}' n\xE3o encontrado para a\xE7\xE3o '${o.t}'. Prosseguindo...`);return}switch(o.t){case"val":if(r){let l=r instanceof HTMLInputElement||r instanceof HTMLTextAreaElement||r instanceof HTMLSelectElement||r.isContentEditable?r:r.querySelector('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]');if(!l){let c=r.closest('.form-group, .field, [class*="input" i], [class*="control" i], label, tr, td, li, p, div')?.querySelector('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]');c&&(l=c)}if(!l){let m=r.nextElementSibling;for(;m;){if(m instanceof HTMLInputElement&&!["hidden","button","submit","checkbox","radio"].includes(m.type)||m instanceof HTMLTextAreaElement||m instanceof HTMLElement&&m.isContentEditable){l=m;break}let c=m.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(c){l=c;break}m=m.nextElementSibling}}if(!l){let m=document.body;try{m=B()||document.body}catch{}let c=Array.from(m.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]')).filter(p=>C(p)&&!z(p));c.length>0&&(l=c[0])}let d=o.v!==void 0?o.v:o.value!==void 0?o.value:o.val!==void 0?o.val:o.text,u=d!=null?String(d):"";Ie(l||r,u)}break;case"chk":r&&j(r,!!o.c);break;case"sel":if(r){let l=Array.isArray(o.v)?o.v:[String(o.v)];ze(r,l)}break;case"clk":if(r)if(!!(r.closest('.option-card, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice')||r.querySelector('input[type="radio"], input[type="checkbox"]')||r instanceof HTMLInputElement&&["checkbox","radio"].includes(r.type))){let d=o.c!==void 0?!!o.c:!0;j(r,d)}else D(r,o.co);break;case"adv":let s=Je(o.id);if(s){await We(s,1200);let l=o.id||s.textContent?.trim()||"";l&&De(window.location.hostname,{advanceSelector:l}),D(s)}else console.warn("[EasyQuiz] Bot\xE3o de avan\xE7o n\xE3o localizado.");break}}function oo(){let o=["button","a",'[role="button"]','input[type="submit"]','input[type="button"]','[data-testid*="check" i]','[data-test-id*="check" i]'].join(",");return Array.from(document.querySelectorAll(o)).find(t=>{if(!C(t)||z(t)||t.closest("header, nav, aside"))return!1;let a=t instanceof HTMLInputElement||t instanceof HTMLButtonElement?t.value:"",i=(t.textContent||a||t.getAttribute("aria-label")||"").trim();return/(verificar|checar|check|conferir|validar|enviar|responder)/i.test(i)})||null}function Je(o){if(o){let n=E(o);if(n&&C(n)&&!z(n)&&!P(n))return n}try{let n=fe(window.location.hostname);if(n.advanceSelector){let r=E(n.advanceSelector);if(r&&C(r)&&!z(r)&&!P(r))return r}}catch{}let e=["button","a",'[role="button"]','[role="link"]','input[type="button"]','input[type="submit"]','[data-testid*="next" i]','[data-testid*="continue" i]','[data-testid*="check" i]','[data-test-id*="next" i]','[data-test-id*="continue" i]','[data-test-id*="check" i]','[class*="next" i]','[class*="continue" i]','[class*="proximo" i]','[class*="avancar" i]'].join(","),a=Array.from(document.querySelectorAll(e)).filter(n=>C(n)&&!z(n)&&!n.closest("header, nav, aside")&&!P(n));for(let n of a)if(F(n)&&!P(n))return n;for(let n of a){let r=n instanceof HTMLInputElement||n instanceof HTMLButtonElement?n.value:"",s=(n.textContent||r||n.getAttribute("aria-label")||"").trim();if(Se.test(s)&&!P(n))return n}let i=document.querySelector('[data-test-id*="next" i], [data-testid*="next" i], [aria-label*="next" i], [aria-label*="pr\xF3xim" i], [aria-label*="avan\xE7ar" i], [aria-label*="continuar" i]');return i&&C(i)&&!z(i)&&!P(i)?i:null}async function We(o,e=1500){let t=Date.now();for(;Date.now()-t<e;){if(!(o.disabled===!0||o.getAttribute("aria-disabled")==="true"||o.classList.contains("disabled")||o.getAttribute("disabled")!==null))return;await new Promise(i=>setTimeout(i,100))}}function kt(){let o=(document.body?.innerText||document.body?.textContent||"").replace(/\s+/g," ").trim(),e=document.querySelectorAll('input, textarea, select, button, [role="button"], [role="option"]').length;return`${window.location.href}|${document.title}|${o.slice(0,900)}|${e}`}async function ao(o,e=1800){let t=Date.now();for(;Date.now()-t<e;){if(kt()!==o)return{changed:!0,evidence:"URL, texto, t\xEDtulo ou conjunto de controles mudou ap\xF3s a a\xE7\xE3o."};await new Promise(i=>setTimeout(i,100))}return{changed:!1,evidence:"Nenhuma mudan\xE7a observ\xE1vel foi detectada dentro do tempo limite."}}async function Lt(o){if(o.t==="js"||o.t==="adv")return;if(o.t==="drag"){let i=E(o.from)||E(v(o.from)),n=E(o.to)||E(v(o.to));i&&n&&await $e(i,n,2);return}let e=o.id||"",t=o.v!==void 0?String(o.v).trim():"",a=E(e,t)||E(v(e),t);if(o.t==="clk"||o.t==="chk"){if(!a&&e){let n=Array.from(document.querySelectorAll('input, label, button, [role="radio"], [role="checkbox"], .option-card, [class*="option" i], [class*="choice" i]')),r=v(e).toLowerCase();a=n.find(s=>{let l=v(s.textContent).toLowerCase(),d=v(s.value||"").toLowerCase();return l.includes(r)||d===r||l.startsWith(r+")")||l.startsWith("("+r+")")})||null}let i=o.v!==void 0?String(o.v).trim():"";if(a&&i){if(a instanceof HTMLInputElement&&a.type==="radio"&&a.name){if(v(a.value).toLowerCase()!==v(i).toLowerCase()){let n=document.querySelector(`input[type="radio"][name="${$(a.name)}"][value="${$(i)}" i]`);if(n)a=n;else{let s=Array.from(document.querySelectorAll(`input[type="radio"][name="${$(a.name)}"]`)).find(l=>{let d=l.closest("label, .vf-label, .option-card, tr, td, div");return d&&v(d.textContent).toLowerCase().includes(v(i).toLowerCase())});s&&(a=s)}}}else if(!(a instanceof HTMLInputElement)&&!(a instanceof HTMLSelectElement)&&!(a instanceof HTMLTextAreaElement)){let n=a.querySelector(`input[value="${$(i)}" i], [data-value="${$(i)}" i]`);if(n)a=n;else{let s=Array.from(a.querySelectorAll('input[type="radio"], input[type="checkbox"]')).find(l=>{let d=l.closest("label, .vf-label, .option-card, td, div");return d&&v(d.textContent).toLowerCase().includes(v(i).toLowerCase())});s&&(a=s)}}}if(a){let n=a.closest('.option-card, label, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, li')||a,r=a instanceof HTMLInputElement&&["radio","checkbox"].includes(a.type)?a:n.querySelector('input[type="radio"], input[type="checkbox"]')||(n.getAttribute("for")?n.ownerDocument.getElementById(n.getAttribute("for")):null),s=o.t==="chk"||o.c!==void 0?!!o.c:!0;if(j(r||n,s),r&&r.checked!==s){try{let l=r._valueTracker;l&&l.setValue(!s)}catch{}try{Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"checked")?.set?.call(r,s)}catch{}r.checked=s,r.dispatchEvent(new Event("input",{bubbles:!0,composed:!0})),r.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}}return}if(o.t==="val"){let i=null;if(a&&(i=a instanceof HTMLInputElement||a instanceof HTMLTextAreaElement||a.isContentEditable?a:a.querySelector('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]')),!i){let n=document.body;try{n=B()||document.body}catch{}let r=Array.from(n.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]')),s=v(e).toLowerCase();i=r.find(l=>{let d=(l.getAttribute("placeholder")||"").toLowerCase(),u=(l.name||"").toLowerCase(),m=(l.id||"").toLowerCase(),c=(l.getAttribute("aria-label")||"").toLowerCase();return d.includes(s)||u.includes(s)||m.includes(s)||c.includes(s)})||(r.length>0?r[0]:null)}if(i){let n=String(o.v??"");try{if(i.focus?.(),i.type!=="number"){try{i.select?.()}catch{}document.execCommand?.("insertText",!1,n)}}catch{}Ie(i,n)}return}if(o.t==="sel"){if(!a&&e){let i=Array.from(document.querySelectorAll("select")),n=v(e).toLowerCase();a=i.find(r=>{let s=(r.name||"").toLowerCase(),l=(r.id||"").toLowerCase(),d=(r.getAttribute("aria-label")||"").toLowerCase();return s.includes(n)||l.includes(n)||d.includes(n)})||null}if(a){let i=Array.isArray(o.v)?o.v:[String(o.v)];ze(a,i)}return}}function de(o){try{if(o.t==="val"){let e=o.v!==void 0?o.v:o.value!==void 0?o.value:o.val!==void 0?o.val:o.text,t=String(e??"").trim(),a=t,i=o.id!==void 0&&o.id!==null?String(o.id):"";i||(i=o.target??o.name??o.selector??"1");let n=E(i,a,!0)||E(v(i),a,!0);if(!n){let m=document.body;try{m=B()||document.body}catch{}let c=Array.from(m.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]')).filter(p=>C(p)&&!z(p));c.length>0&&(n=c[0])}if(!n)return!1;let r=n instanceof HTMLInputElement&&n.type==="radio"?n:n.querySelector('input[type="radio"]');if(r&&r.name){let m=document.querySelector(`input[type="radio"][name="${$(r.name)}"]:checked`);if(!m)return!1;let c=v(m.value).toLowerCase(),p=v(t).toLowerCase(),h=v(m.closest("label, .vf-label, .option-card, tr, td, div")?.textContent||"").toLowerCase();return c===p||h===p||h.includes(p)}let s=n instanceof HTMLInputElement||n instanceof HTMLTextAreaElement||n.isContentEditable?n:n.querySelector('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(!s){let c=n.closest('.form-group, .field, [class*="input" i], [class*="control" i], label, tr, td, li, p, div')?.querySelector('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]');c&&(s=c)}if(!s){let m=n.nextElementSibling;for(;m;){if(m instanceof HTMLInputElement&&!["hidden","button","submit","checkbox","radio"].includes(m.type)||m instanceof HTMLTextAreaElement||m instanceof HTMLElement&&m.isContentEditable){s=m;break}let c=m.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(c){s=c;break}m=m.nextElementSibling}}if(s instanceof HTMLSelectElement){let m=v(t).toLowerCase();return Array.from(s.options).some(c=>{if(!c.selected)return!1;let p=c.value.toLowerCase(),h=v(c.textContent).toLowerCase();return m===p||m===h||p.includes(m)||h.includes(m)})}let l=(s instanceof HTMLInputElement||s instanceof HTMLTextAreaElement?s.value:s?.textContent??n.textContent??"").trim();if(!l&&!t)return!0;if(!l&&t)return!1;let d=l.replace(",",".").replace(/\s+/g,"").toLowerCase(),u=t.replace(",",".").replace(/\s+/g,"").toLowerCase();return d===u||d.includes(u)||u.includes(d)||l.toLowerCase()===t.toLowerCase()}if(o.t==="sel"){let e=E(o.id,void 0,!0)||E(v(o.id),void 0,!0);if(!e){let n=document.body;try{n=B()||document.body}catch{}let r=Array.from(n.querySelectorAll('select, [role="combobox"], [role="listbox"]')).filter(d=>C(d)&&!z(d)),s=v(o.id).toLowerCase();e=r.find(d=>{let u=(d.id||"").toLowerCase(),m=(d.getAttribute("name")||"").toLowerCase(),c=(d.getAttribute("aria-label")||"").toLowerCase(),p=v(d.closest('.dropdown-row, [class*="dropdown" i], [class*="select" i], tr, label, div')?.textContent||"").toLowerCase();return u.includes(s)||m.includes(s)||c.includes(s)||s.length>=2&&p.includes(s)})||(r.length===1?r[0]:null)}if(!e)return!1;let t=e instanceof HTMLSelectElement?e:e.querySelector("select");if(!t){let n=e.matches?.('[role="combobox"], [role="listbox"], [class*="select" i], [class*="dropdown" i]')?e:e.closest('[role="combobox"], [role="listbox"], [class*="select" i], [class*="dropdown" i]');if(n){let s=(Array.isArray(o.v)?o.v:[String(o.v)]).map(d=>v(d).toLowerCase()),l=v(n.textContent).toLowerCase();return s.some(d=>l.includes(d)||d.includes(l))}return!1}let i=(Array.isArray(o.v)?o.v:[String(o.v)]).map(n=>v(n).toLowerCase());return Array.from(t.options).some(n=>{if(!n.selected)return!1;let r=n.value.toLowerCase(),s=v(n.textContent).toLowerCase();return i.some(l=>l===r||l===s||r.includes(l)||s.includes(l))})}if(o.t==="chk"||o.t==="clk"){let e=o.v!==void 0?String(o.v).trim():"",t=E(o.id,e)||E(v(o.id),e);if(!t)return!1;let a=t.closest('.option-card, label, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, li')||t,i=t instanceof HTMLInputElement&&["checkbox","radio"].includes(t.type)?t:a.querySelector('input[type="checkbox"], input[type="radio"]')||(a.getAttribute("for")?a.ownerDocument.getElementById(a.getAttribute("for")):null),n=o.t==="chk"||o.c!==void 0?!!o.c:!0;if(i&&i.type==="radio"){if(i.checked===n)return!0;if(o.v&&i.name){let u=v(String(o.v)).toLowerCase(),m=document.querySelector(`input[type="radio"][name="${$(i.name)}"]:checked`);if(!m)return!1;if(m===i)return!0;let c=v(m.value).toLowerCase(),p=v(m.closest("label, .vf-label, .option-card, tr, td, div")?.textContent||"").toLowerCase();return c===u||p.includes(u)||u.includes(c)}}if(i&&["checkbox","radio"].includes(i.type))return i.checked===n;let r=a.getAttribute("aria-checked")===String(n)||a.getAttribute("aria-selected")===String(n)||a.getAttribute("aria-pressed")===String(n),s=n?a.getAttribute("data-selected")==="true"||a.getAttribute("data-checked")==="true"||a.getAttribute("data-active")==="true"||a.getAttribute("data-state")==="checked"||a.getAttribute("data-state")==="on":a.getAttribute("data-selected")==="false"||a.getAttribute("data-checked")==="false"||a.getAttribute("data-state")==="unchecked",l=n?/active|selected|checked|picked|correct|is-selected|choice-selected|selected-option|is-checked|chosen|current|highlight|ring|border-primary/i.test(a.className||""):!/active|selected|checked|picked|correct|is-selected|choice-selected|selected-option|is-checked|chosen|current|highlight|ring|border-primary/i.test(a.className||"");return!!(r||s||l||(a instanceof HTMLButtonElement||a.getAttribute("role")==="button")&&o.t==="clk"||o.t==="clk"&&!i)}if(o.t==="drag"){let e=E(o.from)||E(v(o.from)),t=E(o.to)||E(v(o.to));return!e||!t?!1:t.contains(e)?!0:/placed|dropped|assigned|matched|done|selected/i.test(e.className||"")||e.getAttribute("data-placed")==="true"}}catch{}return!1}async function Xe(o,e,t=1,a=we({engine:"smart",autoAdvance:e})){let i=o.actions.filter(g=>g.t!=="adv"),n=o.actions.filter(g=>g.t==="adv"),r=0,s=[],l=new Map,d=o.pageType==="question",u=i.filter(g=>g.t==="chk"||g.t==="clk"&&g.c!==void 0);if(d&&u.length>0){let g=document.body;try{g=B()||document.body}catch{}let y=Array.from(g.querySelectorAll('input[type="checkbox"], [role="checkbox"]')).filter(x=>C(x)&&!z(x));if(y.length>1){let x=new Set;for(let w of u){let T=w.t==="chk"?!!w.c:!!(w.c??!0),L="id"in w&&typeof w.id=="string"?w.id:"";if(T&&L){let M=E(L,w.v);if(M){let S=M instanceof HTMLInputElement&&M.type==="checkbox"?M:M.querySelector('input[type="checkbox"]');x.add(S||M)}}}if(x.size>0)for(let w of y)x.has(w)||(w instanceof HTMLInputElement&&w.checked||w.getAttribute("aria-checked")==="true"||w.closest(".option-card, label")?.classList.contains("selected"))&&j(w,!1)}}for(let g of i){try{await to(g,t,a),r++}catch(y){l.set(g,y instanceof Error?y.message:String(y)),console.warn("[EasyQuiz] A\xE7\xE3o declarativa prim\xE1ria falhou com seguran\xE7a:",g,y)}await new Promise(y=>setTimeout(y,g.t==="drag"?250:70))}await new Promise(g=>setTimeout(g,i.length>0?300:50));let m=0;for(let g of i){if(de(g)){m++;continue}console.warn(`[EasyQuiz Auto-Cura] A\xE7\xE3o '${g.t}' no alvo '${g.id||g.from||""}' n\xE3o verificada no DOM. Disparando Passagem 2 de conting\xEAncia...`);try{je(g,a),await Lt(g)}catch(y){l.set(g,y instanceof Error?y.message:String(y)),console.warn("[EasyQuiz Auto-Cura] Rota alternativa falhou:",y)}await new Promise(y=>setTimeout(y,180)),de(g)&&(console.log("[EasyQuiz Auto-Cura] \u2713 A\xE7\xE3o recuperada com sucesso pela rota de conting\xEAncia!"),m++)}if(m<i.length&&i.length>0){console.warn(`[EasyQuiz Auto-Cura] ${i.length-m} de ${i.length} a\xE7\xE3o(\xF5es) ainda n\xE3o verificadas. Disparando Passagem 3 final...`),await new Promise(g=>setTimeout(g,200));for(let g of i)if(!de(g))try{await Lt(g)}catch(y){l.set(g,y instanceof Error?y.message:String(y))}await new Promise(g=>setTimeout(g,200)),m=0;for(let g of i)de(g)&&m++}for(let g of i)de(g)||s.push(g.t==="drag"?`${g.from} -> ${g.to}`:"id"in g?g.id:g.t);d&&i.length===0&&s.push("nenhuma a\xE7\xE3o de resposta prescrita");let c=i.map((g,y)=>{let x=g.t==="drag"?`${g.from} -> ${g.to}`:g.t==="js"?"$eq":g.id||g.t,w=g.t==="js"?!0:g.t==="drag"?!!(Y(g.from,"source")&&Y(g.to,"destination")):!!(E(g.id||"")||E(v(g.id||""))),T=de(g);return{index:y,action:g,target:x,located:w,applied:!l.has(g),verified:T,strategy:g.t==="drag"?"drag-adaptive":g.t==="js"?"javascript":"declarative-dom",evidence:T?"estado do controle confirmado no DOM":"nenhuma evid\xEAncia suficiente ap\xF3s as tentativas",...l.has(g)?{error:l.get(g)}:{}}}),p=d?i.length>0&&s.length===0&&(m===i.length||r===i.length&&m>0):!0,h=!1,b=!1,f="Nenhuma a\xE7\xE3o de navega\xE7\xE3o solicitada.";if(e&&(p||!d)){await new Promise(T=>setTimeout(T,i.length>0?400:150));let g=!1;if(o.pageType!=="info"){let T=oo();T&&C(T)&&(await We(T,1200),D(T),g=!0,await new Promise(L=>setTimeout(L,800)))}let y=kt(),x=n.length>0?n[0].id:void 0,w=Je(x);if(!w&&g&&(await new Promise(T=>setTimeout(T,600)),w=Je(x)),w){await We(w,1500);let T=x||w.textContent?.trim()||"";T&&De(window.location.hostname,{advanceSelector:T}),D(w);let L=await ao(y,2500);b=L.changed,f=L.evidence,h=L.changed||g,!L.changed&&!g&&console.warn("[EasyQuiz] O bot\xE3o de avan\xE7o foi acionado, mas a navega\xE7\xE3o ainda n\xE3o concluiu.")}else g?(h=!0,b=!0,f="Resposta confirmada via bot\xE3o de verifica\xE7\xE3o/envio."):console.warn("[EasyQuiz] Nenhum bot\xE3o de avan\xE7o encontrado na p\xE1gina.")}return{applied:r,verified:m,success:p,advanced:h,failed:s,reports:c,navigationVerified:b,navigationEvidence:f}}var ue=null,te=[],Ze=[],et=[],pe=null,no=`
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
`;function Ht(){try{if(typeof document>"u"||!document.head)return;if(!document.getElementById("eq-image-pulse-style")){let o=document.createElement("style");o.id="eq-image-pulse-style",o.textContent=no,document.head.appendChild(o)}}catch{}}function oe(){ue&&(ue.style.removeProperty("outline"),ue.style.removeProperty("outline-offset"),ue.style.removeProperty("position"),ue=null);for(let o of te)o.style.removeProperty("outline"),o.style.removeProperty("outline-offset"),o.style.removeProperty("background-color"),o.style.removeProperty("box-shadow"),o.removeAttribute("data-easyquiz-highlight");te=[];for(let o of Ze)o.style.removeProperty("animation"),o.style.removeProperty("outline"),o.style.removeProperty("outline-offset"),o.style.removeProperty("box-shadow"),o.removeAttribute("data-easyquiz-image-highlight");Ze=[];for(let o of et)try{o.remove()}catch{}if(et=[],pe){try{pe.remove()}catch{}pe=null}}function tt(o){Ht();for(let e of o){if(!e||!(e instanceof(typeof HTMLElement<"u"?HTMLElement:e.constructor)))continue;let t=e;t.style.outline="3px solid #ffd600",t.style.outlineOffset="3px",t.style.animation="eq-image-pulse-yellow-white 1.2s ease-in-out infinite",t.setAttribute("data-easyquiz-image-highlight","true"),Ze.push(t);try{let a=t.parentElement;if(a&&!a.querySelector("[data-easyquiz-capture-badge]")){window.getComputedStyle(a).position==="static"&&(a.style.position="relative");let n=document.createElement("div");n.setAttribute("data-easyquiz-capture-badge","true"),n.textContent="\u{1F4F7} Capturado pela IA",n.style.cssText=`
          position: absolute; top: 4px; left: 4px; z-index: 99999;
          background: rgba(0,0,0,0.75); color: #ffd600; font-size: 10px;
          font-weight: 700; padding: 2px 7px; border-radius: 4px;
          pointer-events: none; font-family: system-ui, sans-serif;
          animation: eq-badge-fade-in 0.3s ease-out;
          box-shadow: 0 1px 4px rgba(0,0,0,0.4);
          letter-spacing: 0.3px;
        `,a.appendChild(n),et.push(n)}}catch{}}}function ot(o){oe(),Ht(),ue=o,o.style.outline="2px solid #00e5ff",o.style.outlineOffset="4px";try{window.getComputedStyle(o).position==="static"&&(o.style.position="relative");let t=document.createElement("div");t.style.cssText=`
      position: absolute; left: 0; right: 0; top: 0; height: 3px;
      background: linear-gradient(90deg, transparent, #00e5ff, #00ff88, #00e5ff, transparent);
      z-index: 99998; pointer-events: none; border-radius: 2px;
      animation: eq-scope-scan 0.8s ease-in-out forwards;
      box-shadow: 0 0 8px rgba(0, 229, 255, 0.6);
    `,o.appendChild(t),pe=t,setTimeout(()=>{try{t.remove()}catch{}pe===t&&(pe=null)},900)}catch{}}function io(o){return!o||o>=.9?{outline:"#00ff88",bg:"rgba(0, 255, 136, 0.12)",glow:"rgba(0, 255, 136, 0.8)"}:o>=.7?{outline:"#00bfff",bg:"rgba(0, 191, 255, 0.10)",glow:"rgba(0, 191, 255, 0.7)"}:{outline:"#ffaa00",bg:"rgba(255, 170, 0, 0.10)",glow:"rgba(255, 170, 0, 0.7)"}}function It(o,e){let t=io(e);for(let a of o){if(a.t==="adv"||a.t==="js")continue;if(a.t==="drag"){try{let m=E(a.from),c=E(a.to);m&&(m.style.outline=`2px solid ${t.outline}`,te.push(m)),c&&(c.style.outline="2px dashed #00e5ff",te.push(c))}catch{}continue}if(!a.id)continue;let i=a.v!==void 0?Array.isArray(a.v)?a.v[0]:String(a.v):"",n=E(a.id,i,a.t==="val"||a.t==="sel")||E(v(a.id),i,a.t==="val"||a.t==="sel");if(!n&&a.t==="sel"){let m=document.body;try{m=B()||document.body}catch{}let c=Array.from(m.querySelectorAll('select, [role="combobox"], [role="listbox"]')).filter(b=>C(b)&&!le(b)),p=v(a.id).toLowerCase();n=c.find(b=>{let f=(b.id||"").toLowerCase(),g=(b.getAttribute("name")||"").toLowerCase(),y=(b.getAttribute("aria-label")||"").toLowerCase(),x=v(b.closest('.dropdown-row, [class*="dropdown" i], [class*="select" i], tr, label, div')?.textContent||"").toLowerCase();return f.includes(p)||g.includes(p)||y.includes(p)||p.length>=2&&x.includes(p)})||(c.length===1?c[0]:null)}if(!n)continue;let r=typeof HTMLSelectElement<"u"&&n instanceof HTMLSelectElement||n.tagName?.toLowerCase()==="select"||n.getAttribute("role")==="combobox"||n.getAttribute("role")==="listbox",l=n.parentElement?.closest('.dropdown-row, [class*="dropdown" i], [class*="select-row" i], .form-group, tr, li')||n.closest('label, .option-card, [role="radio"], [role="checkbox"], [role="listitem"], .answer, .quiz-option, .form-check, [class*="option" i], [class*="choice" i]')||n;l.style.outline=`2px solid ${t.outline}`,l.style.outlineOffset="2px",l.style.backgroundColor=t.bg,l.setAttribute("data-easyquiz-highlight","true"),te.push(l);let d=r?n:l.querySelector('select, [role="combobox"], [role="listbox"]');d&&(d.style.outline=`2px solid ${t.outline}`,d.style.outlineOffset="2px",d.style.boxShadow=`0 0 10px ${t.glow}`,d.setAttribute("data-easyquiz-highlight","true"),te.push(d));let u=n instanceof HTMLInputElement&&["checkbox","radio"].includes(n.type)?n:l.querySelector('input[type="checkbox"], input[type="radio"]');u&&u!==l&&(u.style.outline=`2px solid ${t.outline}`,u.style.outlineOffset="2px",u.style.boxShadow=`0 0 10px ${t.glow}`,u.setAttribute("data-easyquiz-highlight","true"),te.push(u))}}var at=10,so=1400,nt=15e5;function me(o){return new Promise((e,t)=>{let a=new FileReader;a.onerror=()=>t(new Error("Falha ao converter blob para base64.")),a.onload=()=>{let i=String(a.result||"");e(i.split(",")[1]||"")},a.readAsDataURL(o)})}async function Te(o){let e=0,t=0;if(o instanceof HTMLImageElement?(e=o.naturalWidth||o.width,t=o.naturalHeight||o.height):(e=o.width,t=o.height),e<=0||t<=0)throw new Error("Dimens\xF5es inv\xE1lidas.");let a=Math.min(1,so/Math.max(e,t)),i=Math.max(1,Math.round(e*a)),n=Math.max(1,Math.round(t*a)),r=document.createElement("canvas");r.width=i,r.height=n;let s=r.getContext("2d",{alpha:!1});if(!s)throw new Error("Sem suporte a Canvas 2D.");return s.fillStyle="#ffffff",s.fillRect(0,0,i,n),s.drawImage(o,0,0,i,n),new Promise((l,d)=>{r.toBlob(u=>u?l(u):d(new Error("Falha na compress\xE3o.")),"image/jpeg",.88)})}async function ro(o){let e=typeof o.getBoundingClientRect=="function"?o.getBoundingClientRect():{width:0,height:0},t=e.width||parseFloat(o.getAttribute("width")||"0")||parseFloat(o.style.width||"0")||400,a=e.height||parseFloat(o.getAttribute("height")||"0")||parseFloat(o.style.height||"0")||300,i=2,n=Math.min(1800,Math.max(120,Math.round(t*i))),r=Math.min(1800,Math.max(100,Math.round(a*i))),s=o.cloneNode(!0);s.getAttribute("xmlns")||s.setAttribute("xmlns","http://www.w3.org/2000/svg"),s.setAttribute("width",String(n)),s.setAttribute("height",String(r)),!s.getAttribute("viewBox")&&t>0&&a>0&&s.setAttribute("viewBox",`0 0 ${t} ${a}`);let d=new XMLSerializer().serializeToString(s),u=new Blob([d],{type:"image/svg+xml;charset=utf-8"}),m=URL.createObjectURL(u);try{let c=new Image;c.crossOrigin="anonymous",await new Promise((b,f)=>{c.onload=()=>b(),c.onerror=()=>f(new Error("Falha ao renderizar SVG em Image.")),c.src=m});let p=document.createElement("canvas");p.width=n,p.height=r;let h=p.getContext("2d",{alpha:!1});if(!h)throw new Error("Sem suporte a Canvas 2D.");return h.fillStyle="#ffffff",h.fillRect(0,0,n,r),h.drawImage(c,0,0,n,r),new Promise((b,f)=>{p.toBlob(g=>g?b(g):f(new Error("Falha na compress\xE3o do SVG.")),"image/jpeg",.92)})}finally{URL.revokeObjectURL(m)}}async function it(o){try{let e=o.cloneNode(!0),t=o.offsetWidth||500,a=o.offsetHeight||500,i=`
      <svg xmlns="http://www.w3.org/2000/svg" width="${t}" height="${a}">
        <foreignObject width="100%" height="100%">
          <div xmlns="http://www.w3.org/1999/xhtml" style="background:#fff;font-family:sans-serif;">
            ${e.innerHTML}
          </div>
        </foreignObject>
      </svg>
    `,n=new Blob([i],{type:"image/svg+xml;charset=utf-8"}),r=URL.createObjectURL(n),s=new Image;s.crossOrigin="anonymous",await new Promise((u,m)=>{s.onload=()=>u(),s.onerror=()=>m(new Error("Falha ao renderizar ForeignObject.")),s.src=r});let l=await Te(s),d=await me(l);if(URL.revokeObjectURL(r),d&&d.length<=nt)return{mediaType:"image/jpeg",base64:d,alt:"Captura via rasteriza\xE7\xE3o DOM",source:"rasterized"}}catch(e){console.warn("Falha na rasteriza\xE7\xE3o do n\xF3:",e)}return null}function lo(o,e){let t=o.closest('[data-easyquiz-id], button, [role="button"], [role="radio"], [role="checkbox"], [role="option"], label, .option-card, .quiz-option, .choice, .answer, [class*="option" i], [class*="choice" i], [class*="answer" i], li, tr');if(t&&t!==e&&C(t)&&!F(t)&&!P(t)){let n=t.dataset.easyquizId||t.id||void 0,r=I(t.innerText||t.textContent||"",120),s=t.getAttribute("aria-label")||t.getAttribute("title")||"",l=r||s,d=n?` [id: ${n}]`:"";if(l)return{associatedLabel:`Alternativa/Op\xE7\xE3o: "${l}"${d}`,targetControlId:n};if(n)return{associatedLabel:`Alternativa/Op\xE7\xE3o ${d}`,targetControlId:n}}let a=o.closest("figure")?.querySelector("figcaption")?.textContent?.trim();if(a)return{associatedLabel:`Figura do Enunciado: "${I(a,100)}"`};let i=o.closest('[class*="prompt" i], [class*="stimulus" i], [class*="question-text" i], [class*="statement" i], header, h1, h2, h3, h4, p');if(i){let n=I(i.textContent||"",80);if(n)return{associatedLabel:`Gr\xE1fico do Enunciado: "${n}"`}}return{associatedLabel:"Gr\xE1fico/Imagem do Enunciado Principal"}}async function co(o){let e=o.currentSrc||o.src;if(!e)return null;let t=(o.alt||o.getAttribute("aria-label")||"Imagem da quest\xE3o").slice(0,500);if(o.complete&&o.naturalWidth>0)try{let a=await Te(o),i=await me(a);if(i&&i.length<=nt)return{mediaType:"image/jpeg",base64:i,alt:t,source:e.slice(0,2e3)}}catch{}try{let a=await fetch(e,{mode:"cors"});if(a.ok){let i=await a.blob();if(i.type.startsWith("image/")){let n=await createImageBitmap(i),r=await Te(n);n.close();let s=await me(r);if(s&&s.length<=nt)return{mediaType:"image/jpeg",base64:s,alt:t,source:e.slice(0,2e3)}}}}catch{return it(o.parentElement||o)}return null}function uo(o){return o.querySelectorAll("path, line, polyline, polygon, circle, rect, text, image").length>0}function po(o){try{let e=o.style.backgroundImage||(window.getComputedStyle?window.getComputedStyle(o).backgroundImage:"");if(e&&e.includes("url(")){let t=e.match(/url\(["']?([^"')]+)["']?\)/);if(t&&t[1]&&!t[1].startsWith("data:image/svg+xml"))return t[1]}}catch{}return null}async function st(o,e=!0){if(!e)return[];let t=[],a=0,i=35e5,n=(l,d)=>{if(!l||!l.base64||a+l.base64.length>i)return!1;let u=lo(d,o);return l.associatedLabel=u.associatedLabel,l.targetControlId=u.targetControlId,l.element=d,t.push(l),a+=l.base64.length,t.length>=at},r=Array.from(o.querySelectorAll("img")).filter(l=>C(l)&&!P(l));for(let l of r)try{let d=await co(l);if(n(d,l))return t}catch{}let s=Array.from(o.querySelectorAll("svg")).filter(l=>{if(!C(l)||P(l))return!1;let d=typeof l.getBoundingClientRect=="function"?l.getBoundingClientRect():{width:0,height:0},u=d.width||parseFloat(l.getAttribute("width")||"0"),m=d.height||parseFloat(l.getAttribute("height")||"0");return u<30||m<30?!1:uo(l)});for(let l of s)try{let d=await ro(l),u=await me(d);if(u){let m={mediaType:"image/jpeg",base64:u,alt:l.getAttribute("aria-label")||"Gr\xE1fico/Diagrama vetorial da quest\xE3o",source:"svg"};if(n(m,l))return t}}catch{let d=await it(l.parentElement||l);if(n(d,l))return t}if(t.length<at){let l=Array.from(o.querySelectorAll("canvas")).filter(d=>C(d)&&!P(d));for(let d of l)try{let u=await Te(d),m=await me(u);if(m){let c={mediaType:"image/jpeg",base64:m,alt:d.getAttribute("aria-label")||"Gr\xE1fico Canvas inline",source:"canvas"};if(n(c,d))return t}}catch{let u=await it(d.parentElement||d);if(n(u,d))return t}}if(t.length<at){let l=Array.from(o.querySelectorAll('[style*="background-image"], .option-image, .question-media')).filter(d=>C(d)&&!P(d));for(let d of l){let u=po(d);if(u)try{let m=await fetch(u,{mode:"cors"});if(m.ok){let c=await m.blob();if(c.type.startsWith("image/")){let p=await createImageBitmap(c),h=await Te(p);p.close();let b=await me(h);if(b){let f={mediaType:"image/jpeg",base64:b,alt:"Imagem de fundo da alternativa",source:u.slice(0,2e3)};if(n(f,d))return t}}}}catch{}}}return t}function mo(o,e=""){if(typeof document>"u")return!1;let t=o||document.body,a=(e+" "+(t.textContent||"")).toLowerCase();return!!t.querySelector('.celebration-icon, [class*="celebrat" i], [class*="conclu" i], [class*="finish" i], [class*="result" i], [class*="score-screen" i], [data-testid*="completion" i], [data-functional-selector*="game-over" i], .perseus-message-renderer, [data-congratulations]')&&(a.includes("parab\xE9ns")||a.includes("conclu")||a.includes("finaliz")||a.includes("resultado")||a.includes("pontua")||a.includes("sucesso")||a.includes("\u{1F3C6}")||a.includes("game over")||a.includes("great job"))?!0:["parab\xE9ns! lista de exerc\xEDcios conclu\xEDda","exerc\xEDcios conclu\xEDda","lista de exerc\xEDcios conclu\xEDda","atividade conclu\xEDda","atividade finalizada","finalizado com sucesso","finalizada com sucesso","simulado conclu\xEDdo","simulado finalizado","question\xE1rio conclu\xEDdo","question\xE1rio finalizado","voc\xEA concluiu a atividade","voc\xEA concluiu o question\xE1rio","sua resposta foi registrada","todas as perguntas foram respondidas","quiz completed","exercise completed","activity completed","all questions answered","view results","game over","leaderboard","scoreboard","awesome","great job","you got it right","mission complete","your response has been recorded","sua resposta foi registrada"].some(r=>a.includes(r))}var Pe=class{active=!1;timer=null;callbacks;lastRunTime=0;lastActionTime=0;isProcessing=!1;observer=null;mutationTimer=null;abortController=null;constructor(e){this.callbacks=e}isActive(){return this.active}start(){this.active||(this.active=!0,this.lastActionTime=Date.now(),this.callbacks.onStatusChange("waiting","> [SYS] Autopilot ENGAGED. Monitorando..."),typeof MutationObserver<"u"&&(this.observer=new MutationObserver(()=>{!this.active||this.isProcessing||(this.mutationTimer&&clearTimeout(this.mutationTimer),this.mutationTimer=window.setTimeout(()=>{this.mutationTimer=null,this.loop()},180))}),this.observer.observe(document.body,{subtree:!0,childList:!0,attributes:!0,characterData:!0})),this.loop())}stop(){if(this.active=!1,this.abortController){try{this.abortController.abort()}catch{}this.abortController=null}this.timer&&clearTimeout(this.timer),this.mutationTimer&&clearTimeout(this.mutationTimer),this.mutationTimer=null,this.observer?.disconnect(),this.observer=null,this.isProcessing=!1,this.callbacks.onStatusChange("idle","> [SYS] Autopilot DESATIVADO pelo usu\xE1rio.","text-yellow")}sleep(e){return new Promise(t=>{if(!this.active)return t();let a=null,i=()=>{a&&clearTimeout(a),t()};a=window.setTimeout(()=>{t()},e),this.abortController?.signal.addEventListener("abort",i,{once:!0})})}errorCount=0;lastPageSig="";samePageCount=0;async loop(){if(!this.active)return;let e=Date.now();if(e-this.lastRunTime<1500||this.isProcessing){this.timer=window.setTimeout(()=>this.loop(),300);return}this.lastRunTime=e;try{if(this.isProcessing=!0,!this.active)return;let t=Ee(!1);if(t||(t=ce()),!this.active)return;if(t){if(mo(t.scope,t.questionText)){this.callbacks.onStatusChange("idle","> [SYS] \u{1F3C6} Atividade conclu\xEDda detectada na p\xE1gina! Desligando Autopilot com sucesso.","text-green"),this.stop();return}let a=Tt(t);if(a===this.lastPageSig)this.samePageCount++;else{let r=this.samePageCount>1;this.lastPageSig=a,this.samePageCount=1,r&&(this.callbacks.onStatusChange("waiting","> [SYS] Avan\xE7o de p\xE1gina detectado! Retomando monitoramento autom\xE1tico...","text-green"),this.callbacks.onPageAdvance?.())}if(this.callbacks.isManualModeActive?.()){this.callbacks.onStatusChange("waiting","> [SYS] Gabarito manual ativo na tela. Aguardando voc\xEA posicionar as respostas e avan\xE7ar a p\xE1gina...","text-yellow"),this.lastRunTime=Date.now();return}if(this.samePageCount>1&&(this.callbacks.onStatusChange("waiting",`> [AUTOPILOT] Resolu\xE7\xE3o pendente (${this.samePageCount}\xAA verifica\xE7\xE3o). Conclua e avance para prosseguir...`,"text-yellow"),await this.sleep(4e3),!this.active))return;let i=t.controls.filter(r=>r.role==="answer"),n=fe(window.location.hostname);if(i.length>0){if(this.callbacks.onStatusChange("analyzing","> [IA] Quest\xE3o/Exerc\xEDcio detectado. Consultando IA...","text-blue"),!this.active)return;this.abortController=new AbortController;let r=await this.callbacks.onRequestAnalysis(this.samePageCount,this.abortController.signal);if(this.abortController=null,!this.active)return;if(r){if(this.callbacks.onStatusChange("analyzing",`> [IA] (${r.usedModel||"gemini"}) Confian\xE7a: ${(r.confidence*100).toFixed(1)}% | Modo: ${r.mode}`,"text-blue"),this.callbacks.onStatusChange("analyzing",`> [IA] Racioc\xEDnio: ${r.rationale}`,"text-blue"),this.callbacks.onStatusChange("analyzing",`> [IA] A\xE7\xF5es geradas: ${r.actions.length}`,"text-blue"),this.errorCount=0,r.memoryToStore&&this.callbacks.onStatusChange("analyzing",`> [IA] \u{1F9E0} Mem\xF3ria RAG salva: "${r.memoryToStore}"`,"text-yellow"),r.pageType==="conclusion"){this.callbacks.onStatusChange("idle","> [SYS] Atividade conclu\xEDda! Desligando Autopilot.","text-green"),this.stop();return}}else{this.errorCount++;let s=this.errorCount===1?5e3:8e3;this.callbacks.onStatusChange("waiting",`> [AVISO] Falha na an\xE1lise (${this.errorCount}/3). Aguardando ${s/1e3}s para estabiliza\xE7\xE3o antes de tentar novamente...`,"text-yellow"),await this.sleep(s)}this.lastActionTime=Date.now()}else if(n.advanceSelector&&E(n.advanceSelector)&&t.questionText.length<50){let r=E(n.advanceSelector);if(r){if(this.callbacks.onStatusChange("advancing",`> [BRUTE] Avan\xE7ando via cache "${n.advanceSelector}"...`),await this.sleep(1e3),!this.active)return;D(r),this.lastActionTime=Date.now(),this.errorCount=0}}else{if(this.callbacks.onStatusChange("analyzing","> [IA] P\xE1gina informativa/contexto detectada. Lendo e consultando IA...","text-blue"),!this.active)return;this.abortController=new AbortController;let r=await this.callbacks.onRequestAnalysis(this.samePageCount,this.abortController.signal);if(this.abortController=null,!this.active)return;if(r){if(this.callbacks.onStatusChange("analyzing",`> [IA] (${r.usedModel||"gemini"}) Tipo: ${r.pageType} | Modo: ${r.mode}`,"text-blue"),this.callbacks.onStatusChange("analyzing",`> [IA] Racioc\xEDnio: ${r.rationale}`,"text-blue"),r.memoryToStore&&this.callbacks.onStatusChange("analyzing",`> [IA] \u{1F9E0} Conte\xFAdo absorvido na mem\xF3ria: "${r.memoryToStore}"`,"text-yellow"),r.pageType==="info")this.callbacks.onStatusChange("advancing","> [IA] \u{1F4D6} Leitura conclu\xEDda. Avan\xE7ando automaticamente...","text-green"),await this.sleep(1800);else if(r.pageType==="start")this.callbacks.onStatusChange("advancing","> [SYS] In\xEDcio de m\xF3dulo detectado. Iniciando...","text-blue"),await this.sleep(1800);else if(r.pageType==="conclusion"){this.callbacks.onStatusChange("idle","> [SYS] Atividade conclu\xEDda! Desligando Autopilot.","text-green"),this.stop();return}this.errorCount=0}else{this.errorCount++;let s=this.errorCount===1?5e3:8e3;this.callbacks.onStatusChange("waiting",`> [AVISO] Falha ao processar p\xE1gina (${this.errorCount}/3). Aguardando ${s/1e3}s para estabiliza\xE7\xE3o antes de tentar novamente...`,"text-yellow"),await this.sleep(s)}this.lastActionTime=Date.now()}if(this.errorCount>=3){this.callbacks.onStatusChange("error","> [ERRO] 3 falhas consecutivas. Abortando Autopilot para poupar sua cota e tokens.","text-red"),this.callbacks.onStatusChange("waiting","> [DICA] Verifique a mensagem vermelha de [ERRO DETALHADO] no console acima para saber o motivo exato.","text-yellow"),this.stop();return}}else this.callbacks.onStatusChange("waiting","> [SYS] Monitorando p\xE1gina... Aguardando carregamento dos elementos.")}catch(t){if(!this.active)return;let a=t instanceof Error?t.message:String(t);if(a.includes("cancelada")||a.includes("aborted"))return;console.warn("[EasyQuiz Autopilot]",t),this.callbacks.onStatusChange("error",`> [ERRO NO AUTOPILOT] ${a}`,"text-red")}finally{this.abortController=null,this.isProcessing=!1}this.active&&(this.timer=window.setTimeout(()=>this.loop(),1e3))}};var q={logo:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.8L19.2 8 12 11.2 4.8 8 12 4.8zM4 9.6l7 3.1v7.5l-7-3.5V9.6zm9 10.6v-7.5l7-3.1v7.1l-7 3.5z"/></svg>',rocket:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M13.13 2.81a.5.5 0 0 0-.46-.07c-.42.15-2.08.79-3.9 2.61-2.04 2.04-2.6 4.09-2.73 4.96l-.97.98a1 1 0 0 0-.29.71v2.12a1 1 0 0 0 .29.71l2.83 2.83a1 1 0 0 0 .71.29h2.12a1 1 0 0 0 .71-.29l.98-.97c.87-.13 2.92-.69 4.96-2.73 1.82-1.82 2.46-3.48 2.61-3.9a.5.5 0 0 0-.07-.46l-6.79-6.79zM4.5 16.5l-2.09 2.09a.5.5 0 0 0 .35.85h3.04l.35.35v3.04a.5.5 0 0 0 .85.35L9.09 21.1l-4.59-4.6z"/></svg>',play:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>',stop:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h12v12H6z"/></svg>',code:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>',terminal:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8h16v10zm-12-3l3-3-3-3 1.4-1.4L13.8 12l-4.4 4.4L8 15zm6 0h4v2h-4v-2z"/></svg>',inspector:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>',settings:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.49.49 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>',key:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M7 14c-2.76 0-5-2.24-5-5s2.24-5 5-5c2.42 0 4.44 1.72 4.9 4H22v4h-2v3h-3v-3h-2v3h-3v-3h-2.1c-.46 2.28-2.48 4-4.9 4zm0-7c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>',paste:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 2h-4.18C14.4 .84 13.3 0 12 0c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm7 18H5V4h2v3h10V4h2v16z"/></svg>',edit:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>',trash:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>',eraser:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M15.14 3c-.51 0-1.02.2-1.41.59L2.59 14.73c-.78.78-.78 2.05 0 2.83L6.44 21.4c.78.78 2.05.78 2.83 0l11.14-11.14c.78-.78.78-2.05 0-2.83l-3.86-3.84c-.39-.39-.9-.59-1.41-.59zm.71 2.71l3.15 3.15-3.15 3.15-3.15-3.15 3.15-3.15zm-4.57 4.57l3.15 3.15-4.57 4.57H6.71l-3-3 7.57-7.57z"/></svg>',save:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/></svg>',analyze:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L3 14h8l-2 8 12-12h-8l2-8z"/></svg>',apply:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>',close:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>',chevronRight:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>',chevronLeft:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>',eye:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>',eyeOff:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.44-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.17c0-1.66-1.34-3-3-3l-.17.02z"/></svg>',check:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>',clock:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>',copy:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>',refresh:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg>',chip:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4h12v16H6V4zm2 2v12h8V6H8zm-4 3h2v2H4V9zm0 4h2v2H4v-2zm16-4h2v2h-2V9zm0 4h2v2h-2v-2zM9 2h2v2H9V2zm4 0h2v2h-2V2zm-4 18h2v2H9v-2zm4 0h2v2h-2v-2z"/></svg>',moreVertical:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>',minimize:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M19 13H5v-2h14v2z"/></svg>',maximize:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/></svg>',dragHandle:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M10 9h4V6h-4v3zm0 5h4v-3h-4v3zm0 5h4v-3h-4v3zM4 9h4V6H4v3zm0 5h4v-3H4v3zm0 5h4v-3H4v3zm12-10V6h4v3h-4zm0 5h4v-3h-4v3zm0 5h4v-3h-4v3z"/></svg>',list:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/></svg>',folderTree:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6 10H6v-2h8v2zm4-4H6v-2h12v2z"/></svg>',folder:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/></svg>',file:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>',stopwatch:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M15 1H9v2h6V1zm-4 13h2V8h-2v6zm8.03-6.61l1.42-1.42c-.43-.51-.9-.99-1.41-1.41l-1.42 1.42A8.962 8.962 0 0 0 12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9a8.994 8.994 0 0 0 7.03-14.61zM12 20c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"/></svg>',plus:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>',sparkles:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M9 21l-2.5-5.5L1 13l5.5-2.5L9 5l2.5 5.5L17 13l-5.5 2.5L9 21zm9.5-12.5l-1.5-3.5-3.5-1.5 3.5-1.5 1.5-3.5 1.5 3.5 3.5 1.5-3.5 1.5-1.5 3.5z"/></svg>'};var Re=class{element=null;shadow;isMinimized=!1;currentPlan=null;isDragging=!1;dragStartX=0;dragStartY=0;initialLeft=25;initialTop=25;onAdvanceCallback;constructor(e,t){this.shadow=e,this.onAdvanceCallback=t,this.initGlobalListeners()}initGlobalListeners(){window.addEventListener("popstate",()=>this.handlePageNavigated()),window.addEventListener("hashchange",()=>this.handlePageNavigated()),document.addEventListener("click",e=>{if(!this.isOpen())return;let t=e.target;if(!t||this.shadow.contains(t)||t.closest("#easyquiz-shadow-root"))return;let a=t.closest('button, [role="button"], a, input[type="submit"]');if(a){let i=(a.textContent||a.value||"").toLowerCase();/pr[oó]xim|avan[cç]|continu|verific|enviar|submit|confirm|checar|validar|next/i.test(i)&&setTimeout(()=>{this.isOpen()&&this.handlePageNavigated()},800)}},!0)}handlePageNavigated(){this.isOpen()&&(this.hide(),this.onAdvanceCallback?.())}isOpen(){return this.element!==null&&this.element.style.display!=="none"}show(e){this.currentPlan=e,this.element||this.createElement(),this.renderContent(),this.element&&(this.element.style.display="flex")}hide(){this.element&&(this.element.style.display="none")}minimize(){this.isMinimized=!0,this.element&&this.element.classList.add("minimized")}restore(){this.isMinimized=!1,this.element&&this.element.classList.remove("minimized")}createElement(){this.element=document.createElement("div"),this.element.className="eq-floating-hud",this.element.style.left=`${this.initialLeft}px`,this.element.style.top=`${this.initialTop}px`,this.element.innerHTML=`
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
    `,this.shadow.appendChild(this.element),this.element.querySelector("#eq-fah-pill").addEventListener("click",()=>this.restore()),this.element.querySelector("#eq-fah-min-btn").addEventListener("click",()=>this.minimize()),this.element.querySelector("#eq-fah-close-btn").addEventListener("click",()=>this.hide());let i=this.element.querySelector("#eq-fah-copy-md-btn");i.addEventListener("click",()=>this.copyMarkdownToClipboard(i));let n=this.element.querySelector("#eq-fah-copy-all-btn");n.addEventListener("click",()=>this.copyMarkdownToClipboard(n));let r=this.element.querySelector("#eq-fah-header");this.setupDraggable(r)}setupDraggable(e){let t=a=>{if(a.target.closest(".eq-fah-btn"))return;a.preventDefault(),this.isDragging=!0,this.dragStartX=a.clientX,this.dragStartY=a.clientY;let i=this.element.getBoundingClientRect();this.initialLeft=i.left,this.initialTop=i.top;let n=s=>{if(!this.isDragging||!this.element)return;let l=s.clientX-this.dragStartX,d=s.clientY-this.dragStartY,u=Math.max(10,window.innerWidth-this.element.offsetWidth-10),m=Math.max(10,window.innerHeight-this.element.offsetHeight-10),c=Math.min(Math.max(10,this.initialLeft+l),u),p=Math.min(Math.max(10,this.initialTop+d),m);this.element.style.left=`${c}px`,this.element.style.top=`${p}px`},r=()=>{this.isDragging=!1,window.removeEventListener("mousemove",n),window.removeEventListener("mouseup",r)};window.addEventListener("mousemove",n),window.addEventListener("mouseup",r)};e.addEventListener("mousedown",t)}renderContent(){if(!this.element||!this.currentPlan)return;let e=this.element.querySelector("#eq-fah-body"),t=this.element.querySelector("#eq-fah-pill-text"),a=this.element.querySelector("#eq-fah-pill-badge");e.innerHTML="";let i=this.currentPlan,n=i.actions.filter(p=>p.t==="drag"),r=i.actions.filter(p=>{if(p.t!=="val")return!1;let h=v(p.id||"").toLowerCase();return!/continu|avan[cç]|pr[oó]xim|submet|enviar|check|verific/i.test(h)}),s=i.actions.filter(p=>p.t==="clk"||p.t==="chk"),l=i.actions.filter(p=>p.t==="sel"),d=n.length||r.length||s.length||l.length,u=document.createElement("div");u.className="eq-fah-meta";let m=document.createElement("span");m.textContent=`Modo: ${i.mode.replace("_"," ")}`;let c=document.createElement("span");if(c.className="eq-fah-meta-badge",c.textContent=`${Math.round(i.confidence*100)}% Confian\xE7a`,u.append(m,c),e.appendChild(u),n.length>0||i.mode==="categorizacao"||i.mode==="arrastar_soltar"){t.textContent=`Categoriza\xE7\xE3o (${n.length} itens)`,a.textContent=String(n.length);let p={};for(let h of n){let b=v(h.to)||"Geral";p[b]||(p[b]=[]),p[b].push(v(h.from))}for(let[h,b]of Object.entries(p)){let f=document.createElement("div"),g=/fato|true|verdadeiro|sim/i.test(h),y=/opini[aã]o|false|falso|n[aã]o/i.test(h);f.className=`eq-fah-group ${g?"group-fato":y?"group-opiniao":""}`;let x=document.createElement("div");x.className="eq-fah-group-title",x.textContent=`\u{1F4C1} ${h} (${b.length})`,f.appendChild(x);let w=document.createElement("div");w.className="eq-fah-group-items";for(let T of b){let L=document.createElement("div");L.className="eq-fah-item";let M=document.createElement("span");M.className="eq-fah-item-text",M.textContent=T,L.appendChild(M);let S=document.createElement("button");S.className="eq-fah-copy-inline",S.textContent="Copiar",S.addEventListener("click",()=>{navigator.clipboard.writeText(T),S.textContent="\u2713 Copiado",setTimeout(()=>S.textContent="Copiar",1200)}),L.appendChild(S),w.appendChild(L)}f.appendChild(w),e.appendChild(f)}}else if(r.length>0){t.textContent=`Preenchimento (${r.length} campos)`,a.textContent=String(r.length);let p=document.createElement("div");p.className="eq-fah-group";let h=document.createElement("div");h.className="eq-fah-group-title",h.textContent="\u{1F4DD} Respostas para os Campos de Texto:",p.appendChild(h);let b=document.createElement("div");b.className="eq-fah-group-items";for(let f=0;f<r.length;f++){let g=r[f],y=document.createElement("div");y.className="eq-fah-item";let x=Ce(g.id);(!x||/^[#\.\$]|input|mat-|cell|field|q[0-9]|eq-/i.test(x))&&(x=`Campo ${f+1}`);let w=String(g.v??""),T=document.createElement("div");T.className="eq-fah-field-box";let L=document.createElement("div");L.className="eq-fah-field-label",L.textContent=x,T.appendChild(L);let M=document.createElement("div");M.className="eq-fah-field-val",M.textContent=w,T.appendChild(M),y.appendChild(T);let S=document.createElement("button");S.className="eq-fah-copy-inline",S.textContent="Copiar",S.addEventListener("click",()=>{navigator.clipboard.writeText(w),S.textContent="\u2713 Copiado",setTimeout(()=>S.textContent="Copiar",1200)}),y.appendChild(S),b.appendChild(y)}p.appendChild(b),e.appendChild(p)}else if(s.length>0){t.textContent=`Op\xE7\xF5es (${s.length} marcadas)`,a.textContent=String(s.length);let p=document.createElement("div");p.className="eq-fah-group";let h=document.createElement("div");h.className="eq-fah-group-title",h.textContent="\u{1F3AF} Alternativa(s) Correta(s):",p.appendChild(h);let b=document.createElement("div");b.className="eq-fah-group-items";for(let f=0;f<s.length;f++){let g=s[f],y=document.createElement("div");y.className="eq-fah-item";let x=Ce(g.id);(!x||/^(eq-|#|\$|\.|input_|mat-|choice_|radio_|chk_)/i.test(x))&&g.v&&(x=String(g.v)),x=v(x),/^(eq-|#|\$|\.|input_|mat-|choice_|radio_|chk_)/i.test(x)&&(x="");let w="",T=x.match(/^(\([A-Za-z0-9]\)|[A-Za-z0-9][\)\.\:\-])\s*(.*)$/);T?(w=T[1].replace(/[\(\)\.\:\-\s]/g,"").toUpperCase(),x=T[2].trim()||x):s.length>1&&(w=String.fromCharCode(65+f));let L=document.createElement("div");if(L.style.display="flex",L.style.alignItems="center",L.style.gap="8px",L.style.flex="1",w){let A=document.createElement("span");A.className="eq-fah-letter-badge",A.textContent=w,L.appendChild(A)}let M=document.createElement("span");M.className="eq-fah-item-text",M.textContent=x||(w?`Alternativa ${w}`:"Alternativa Selecionada"),L.appendChild(M),y.appendChild(L);let S=document.createElement("button");S.className="eq-fah-copy-inline",S.textContent="Copiar",S.addEventListener("click",()=>{navigator.clipboard.writeText(x||w),S.textContent="\u2713 Copiado",setTimeout(()=>S.textContent="Copiar",1200)}),y.appendChild(S),b.appendChild(y)}p.appendChild(b),e.appendChild(p)}else if(l.length>0){t.textContent=`Sele\xE7\xE3o (${l.length} listas)`,a.textContent=String(l.length);let p=document.createElement("div");p.className="eq-fah-group";let h=document.createElement("div");h.className="eq-fah-group-title",h.textContent="\u{1F4CB} Op\xE7\xF5es para Selecionar na Lista:",p.appendChild(h);let b=document.createElement("div");b.className="eq-fah-group-items";for(let f=0;f<l.length;f++){let g=l[f],y=document.createElement("div");y.className="eq-fah-item";let x=Ce(g.id);(!x||/^[#\.\$]|select|input|mat-|cell|field|q[0-9]|eq-/i.test(x))&&(x=`Lista ${f+1}`);let L=(Array.isArray(g.v)?g.v:[String(g.v??"")]).map(V=>{let J=E(g.id,void 0,!0)||E(v(g.id),void 0,!0),G=J instanceof HTMLSelectElement?J:J?.querySelector("select");if(G){let he=v(V).toLowerCase();for(let W=0;W<G.options.length;W++){let ae=G.options[W];if(ae.value.toLowerCase()===he||v(ae.textContent).toLowerCase()===he){let ne=v(ae.textContent);if(ne&&!ne.toLowerCase().includes("selecione"))return ne}}}return V}).join(", "),M=document.createElement("div");M.className="eq-fah-field-box";let S=document.createElement("div");S.className="eq-fah-field-label",S.textContent=x,M.appendChild(S);let A=document.createElement("div");A.className="eq-fah-field-val",A.textContent=L,M.appendChild(A),y.appendChild(M);let H=document.createElement("button");H.className="eq-fah-copy-inline",H.textContent="Copiar",H.addEventListener("click",()=>{navigator.clipboard.writeText(L),H.textContent="\u2713 Copiado",setTimeout(()=>H.textContent="Copiar",1200)}),y.appendChild(H),b.appendChild(y)}p.appendChild(b),e.appendChild(p)}else{t.textContent="Gabarito",a.textContent="0";let p=document.createElement("div");p.style.padding="10px",p.style.color="#888",p.textContent="Nenhuma resposta direta para exibir.",e.appendChild(p)}if(i.rationale){let p=document.createElement("div");p.className="eq-fah-rationale",p.textContent=`\u{1F4A1} Racioc\xEDnio da IA: ${i.rationale}`,e.appendChild(p)}}generateMarkdown(){if(!this.currentPlan)return"";let e=this.currentPlan,t=[];t.push("# Gabarito da Quest\xE3o \u2014 EasyQuiz Pro"),t.push(`- **Modo:** ${e.mode}`),t.push(`- **Confian\xE7a:** ${(e.confidence*100).toFixed(0)}%`),t.push("");let a=e.actions.filter(s=>s.t==="drag"),i=e.actions.filter(s=>s.t==="val"),n=e.actions.filter(s=>s.t==="clk"||s.t==="chk"),r=e.actions.filter(s=>s.t==="sel");if(a.length>0){t.push("## \u{1F4C2} Categoriza\xE7\xE3o:");let s={};for(let l of a){let d=v(l.to)||"Geral";s[d]||(s[d]=[]),s[d].push(v(l.from))}for(let[l,d]of Object.entries(s)){t.push(`### Categoria: ${l}`);for(let u of d)t.push(`- ${u}`);t.push("")}}else if(i.length>0){t.push("## \u270F\uFE0F Respostas para Preenchimento:");for(let s of i){let l=v(s.id);t.push(`- **${l||"Campo"}:** \`${s.v}\``)}t.push("")}else if(n.length>0){t.push("## \u2705 Alternativas Corretas:");for(let s=0;s<n.length;s++){let l=n[s],d=Ce(l.id);(!d||/^(eq-|#|\$|\.|input_|mat-|choice_|radio_|chk_)/i.test(d))&&l.v&&(d=String(l.v)),d=v(d),/^(eq-|#|\$|\.|input_|mat-|choice_|radio_|chk_)/i.test(d)&&(d="");let u=n.length>1?`${String.fromCharCode(65+s)}) `:"";t.push(`- [x] ${u}${d||"Alternativa "+String.fromCharCode(65+s)}`)}t.push("")}else if(r.length>0){t.push("## \u{1F4CB} Op\xE7\xF5es Selecionadas em Lista:");for(let s of r){let l=v(s.id)||"Lista",d=Array.isArray(s.v)?s.v.join(", "):String(s.v??"");t.push(`- **${l}:** \`${d}\``)}t.push("")}return e.rationale&&(t.push("---"),t.push(`**\u{1F4A1} Racioc\xEDnio:** ${e.rationale}`)),t.join(`
`)}copyMarkdownToClipboard(e){let t=this.generateMarkdown();t&&navigator.clipboard.writeText(t).then(()=>{let a=e.innerHTML;e.id==="eq-fah-copy-md-btn"?e.innerHTML='<span style="font-size:10px; color:#00ffcc; font-weight:bold;">\u2713</span>':e.innerHTML="\u2713 Copiado!",setTimeout(()=>{e.innerHTML=a},1500)})}};var zt=`
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
`;var ho=[{value:"",label:"Detec\xE7\xE3o Autom\xE1tica"},{value:"escolha_unica",label:"M\xFAltipla Escolha (\xDAnica)"},{value:"escolha_multipla",label:"M\xFAltipla Escolha (V\xE1rias)"},{value:"categorizacao",label:"Categoriza\xE7\xE3o / Grupos"},{value:"arrastar_soltar",label:"Arrastar e Soltar (Drag & Drop)"},{value:"ordenacao",label:"Ordena\xE7\xE3o / Sequ\xEAncia"},{value:"verdadeiro_falso",label:"Verdadeiro / Falso"},{value:"texto_livre",label:"Texto Livre / Dissertativa"},{value:"preenchimento",label:"Preenchimento de Lacunas"}],go=[{value:"smart",label:"Inteligente (Auto-H\xEDbrido)"},{value:"command",label:"Apenas Comando (Seguro)"},{value:"javascript",label:"Apenas JS Nativo (Avan\xE7ado)"}],Be=class{host;shadow;callbacks;autopilot;floatingAnswers;initialSettings;isCollapsed=!1;activeTab="resolver";isBusy=!1;stopwatchInterval=null;stopwatchStartTime=0;latestPlan=null;latestContext=null;latestPromptText="";metricsLiveTime;metricsLiveStatus;metricsTotalBadge;metricTotalTime;metricAvgTime;metricTotalCount;metricsHistoryList;metricsHistoryCount;metricsCopyBtn;metricsResetBtn;currentQuestionStartTime=0;questionLiveTimerInterval=null;liveDebugTerminal;dbgModel;dbgLatency;dbgSplitTokens;dbgTotalTokens;dbgErrorCard;dbgErrorText;dbgPromptLen;dbgPromptView;dbgContextView;dbgRawRespView;dbgCountAll;dbgCountError;dbgCountAi;dbgCountDom;logEntries=[];activeLogFilter="all";autoScrollLogs=!0;lastErrorMsg=null;progressContainer;progressBar;progressLabel;progressVal;contextTreeContainer;launcherBtn;launcherDot;dockToggleBtn;sidebarEl;apToggleBtn;apConsole;executionConsole;dotPulseAp;statusTextAp;stopwatchAp;dotPulseAdv;statusTextAdv;stopwatchAdv;inspModel;inspLatency;inspTokens;inspPrompt;inspRationale;inspActions;copyPromptBtn;apiKeyInput;keyContextMenu;keyMoreBtn;keysListEl;keysBadgeEl;modelSelect;modeSelect;engineSelect;dryRunCheckbox;autoApplyCheckbox;autoAdvanceCheckbox;hostDarkModeCheckbox;useVisionCheckbox;analyzeBtn;applyBtn;resultContainer;constructor(e,t){this.initialSettings=e,this.callbacks=t,this.autopilot=new Pe({onStatusChange:(s,l,d)=>{this.logToConsole(l,d),s==="analyzing"?this.setBusy(!0,"Autopilot: IA analisando..."):s==="advancing"||s==="waiting"?(this.setBusy(!1),this.updateAutopilotUi(!0)):s==="idle"?(this.setBusy(!1),this.updateAutopilotUi(!1),l.includes("conclus\xE3o")||l.includes("finalizada")||l.includes("Parab\xE9ns")?this.setStatus("Atividade conclu\xEDda com sucesso! Autopilot finalizado.","success"):this.setStatus("Autopilot desativado.","info")):s==="error"&&(this.setBusy(!1),this.updateAutopilotUi(!1),this.setStatus("Autopilot interrompido por erro.","error"))},onRequestAnalysis:async(s,l)=>{try{return await this.callbacks.onAnalyze(s,l)||null}catch{return null}},isManualModeActive:()=>this.floatingAnswers?.isOpen()??!1,onPageAdvance:()=>{this.floatingAnswers?.hide()}}),this.host=document.createElement("div"),this.host.id="easyquiz-shadow-root",this.host.style.position="fixed",this.host.style.top="0",this.host.style.left="0",this.host.style.width="100vw",this.host.style.height="100vh",this.host.style.zIndex="2147483647",this.host.style.pointerEvents="none",this.shadow=this.host.attachShadow({mode:"open"}),this.shadow.innerHTML=`
      <style>${zt}</style>

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
    `,this.launcherBtn=this.shadow.querySelector(".eq-launcher"),this.launcherDot=this.shadow.querySelector("#eq-launcher-dot"),this.dockToggleBtn=this.shadow.querySelector("#eq-dock-toggle"),this.sidebarEl=this.shadow.querySelector(".eq-sidebar"),this.apToggleBtn=this.shadow.querySelector("#eq-ap-toggle-btn"),this.apConsole=this.shadow.querySelector("#eq-ap-console"),this.executionConsole=this.shadow.querySelector("#eq-execution-console"),this.progressContainer=this.shadow.querySelector("#eq-progress-container"),this.progressBar=this.shadow.querySelector("#eq-progress-bar"),this.progressLabel=this.shadow.querySelector("#eq-progress-label"),this.progressVal=this.shadow.querySelector("#eq-progress-val"),this.contextTreeContainer=this.shadow.querySelector("#eq-tree-container"),this.dotPulseAp=this.shadow.querySelector("#eq-dot-ap"),this.statusTextAp=this.shadow.querySelector("#eq-status-text-ap"),this.stopwatchAp=this.shadow.querySelector("#eq-stopwatch-ap span"),this.dotPulseAdv=this.dotPulseAp,this.statusTextAdv=this.statusTextAp,this.stopwatchAdv=this.stopwatchAp,this.inspModel=this.shadow.querySelector("#eq-insp-model"),this.inspLatency=this.shadow.querySelector("#eq-insp-latency"),this.inspTokens=this.shadow.querySelector("#eq-insp-tokens"),this.inspPrompt=this.shadow.querySelector("#eq-insp-prompt"),this.inspRationale=this.shadow.querySelector("#eq-insp-rationale"),this.inspActions=this.shadow.querySelector("#eq-insp-actions"),this.copyPromptBtn=this.shadow.querySelector("#eq-copy-prompt-btn"),this.liveDebugTerminal=this.shadow.querySelector("#eq-live-debug-terminal"),this.dbgModel=this.shadow.querySelector("#eq-dbg-model"),this.dbgLatency=this.shadow.querySelector("#eq-dbg-latency"),this.dbgSplitTokens=this.shadow.querySelector("#eq-dbg-split-tokens"),this.dbgTotalTokens=this.shadow.querySelector("#eq-dbg-total-tokens"),this.dbgErrorCard=this.shadow.querySelector("#eq-dbg-error-card"),this.dbgErrorText=this.shadow.querySelector("#eq-dbg-error-text"),this.dbgPromptLen=this.shadow.querySelector("#eq-dbg-prompt-len"),this.dbgPromptView=this.shadow.querySelector("#eq-dbg-prompt-view"),this.dbgContextView=this.shadow.querySelector("#eq-dbg-context-view"),this.dbgRawRespView=this.shadow.querySelector("#eq-dbg-raw-resp-view"),this.dbgCountAll=this.shadow.querySelector("#eq-dbg-count-all"),this.dbgCountError=this.shadow.querySelector("#eq-dbg-count-error"),this.dbgCountAi=this.shadow.querySelector("#eq-dbg-count-ai"),this.dbgCountDom=this.shadow.querySelector("#eq-dbg-count-dom"),this.apiKeyInput=this.shadow.querySelector("#eq-api-key"),this.keyContextMenu=this.shadow.querySelector("#eq-key-context-menu"),this.keyMoreBtn=this.shadow.querySelector("#eq-key-more-btn"),this.keysListEl=this.shadow.querySelector("#eq-keys-list"),this.keysBadgeEl=this.shadow.querySelector("#eq-keys-badge"),this.modelSelect=this.shadow.querySelector("#eq-model-select"),this.modeSelect=this.shadow.querySelector("#eq-mode-select"),this.engineSelect=this.shadow.querySelector("#eq-engine-select"),this.dryRunCheckbox=this.shadow.querySelector("#eq-dry-run"),this.autoApplyCheckbox=this.shadow.querySelector("#eq-auto-apply"),this.autoAdvanceCheckbox=this.shadow.querySelector("#eq-auto-advance"),this.hostDarkModeCheckbox=this.shadow.querySelector("#eq-host-dark"),this.useVisionCheckbox=this.shadow.querySelector("#eq-use-vision"),this.analyzeBtn=this.shadow.querySelector("#eq-analyze-btn"),this.applyBtn=this.shadow.querySelector("#eq-apply-btn"),this.applyBtn.disabled=!0,this.resultContainer=this.shadow.querySelector("#eq-result"),this.floatingAnswers=new Re(this.shadow,()=>{this.callbacks.onAnalyze(1)});let a=this.shadow.querySelector("#eq-open-hud-btn");a&&a.addEventListener("click",()=>{this.latestPlan&&this.floatingAnswers.show(this.latestPlan)}),se.filter(s=>R(s.id)).forEach(s=>this.modelSelect.add(new Option(s.name,s.id,!1,s.id===e.model))),ho.forEach(s=>this.modeSelect.add(new Option(s.label,s.value,!1,s.value===e.modeHint))),go.forEach(s=>this.engineSelect.add(new Option(s.label,s.value,!1,s.value===e.engine))),this.apiKeyInput.value=e.apiKey,this.dryRunCheckbox.checked=e.dryRun,this.autoApplyCheckbox.checked=e.autoApply,this.autoAdvanceCheckbox.checked=e.autoAdvance,this.hostDarkModeCheckbox.checked=e.hostDarkMode,this.useVisionCheckbox.checked=e.useVision,this.metricsLiveTime=this.shadow.querySelector("#eq-metrics-live-time"),this.metricsLiveStatus=this.shadow.querySelector("#eq-metrics-live-status"),this.metricsTotalBadge=this.shadow.querySelector("#eq-metrics-total-badge"),this.metricTotalTime=this.shadow.querySelector("#eq-metric-total-time"),this.metricAvgTime=this.shadow.querySelector("#eq-metric-avg-time"),this.metricTotalCount=this.shadow.querySelector("#eq-metric-total-count"),this.metricsHistoryList=this.shadow.querySelector("#eq-metrics-history-list"),this.metricsHistoryCount=this.shadow.querySelector("#eq-metrics-history-count"),this.metricsCopyBtn=this.shadow.querySelector("#eq-metrics-copy-btn"),this.metricsResetBtn=this.shadow.querySelector("#eq-metrics-reset-btn"),this.setupEventListeners(),this.updateTimingMetrics(),document.body.appendChild(this.host),this.applyHostDarkMode(e.hostDarkMode);let i=Array.isArray(e.apiKeys)&&e.apiKeys.length>0?e.apiKeys:e.apiKey?[e.apiKey]:[];k.init(i),this.renderKeysList();let n=window.setInterval(()=>{this.activeTab==="settings"&&this.renderKeysList()},1e3);typeof n?.unref=="function"&&n.unref();let r=k.getBestKey()||e.apiKey;r&&Le(r).then(s=>{s&&s.length>0&&this.updateModelSelect(s,e.model)}).catch(()=>{})}switchTab(e){this.activeTab=e;let t=["resolver","brain","metrics","debug","settings"];for(let a of t){let i=this.shadow.querySelector(`#eq-tab-${a}`),n=this.shadow.querySelector(`#eq-view-${a}`);a===e?(i?.classList.add("active"),n&&(n.style.display="flex")):(i?.classList.remove("active"),n&&(n.style.display="none"))}e==="brain"?(this.renderContextTree(),this.refreshInspectorView()):e==="metrics"?this.updateTimingMetrics():e==="debug"&&(this.refreshDebugView(),this.renderTerminalEntries())}setupEventListeners(){this.shadow.querySelector("#eq-tab-resolver")?.addEventListener("click",()=>this.switchTab("resolver")),this.shadow.querySelector("#eq-tab-brain")?.addEventListener("click",()=>this.switchTab("brain")),this.shadow.querySelector("#eq-tab-metrics")?.addEventListener("click",()=>this.switchTab("metrics")),this.shadow.querySelector("#eq-tab-debug")?.addEventListener("click",()=>this.switchTab("debug")),this.shadow.querySelector("#eq-tab-settings")?.addEventListener("click",()=>this.switchTab("settings")),this.metricsResetBtn?.addEventListener("click",()=>{be(),this.stopQuestionTimer(0),this.currentQuestionStartTime=0,this.metricsLiveTime&&(this.metricsLiveTime.textContent="00:00.00"),this.metricsLiveStatus&&(this.metricsLiveStatus.textContent="Em espera",this.metricsLiveStatus.classList.remove("active")),this.updateTimingMetrics(),this.logToConsole("> [SYS] M\xE9tricas e hist\xF3rico de tempo zerados com sucesso.","text-yellow")}),this.metricsCopyBtn?.addEventListener("click",()=>{this.copyMetricsReport()}),this.shadow.querySelector("#eq-dbg-filter-all")?.addEventListener("click",()=>this.setLogFilter("all")),this.shadow.querySelector("#eq-dbg-filter-error")?.addEventListener("click",()=>this.setLogFilter("error")),this.shadow.querySelector("#eq-dbg-filter-ai")?.addEventListener("click",()=>this.setLogFilter("ai")),this.shadow.querySelector("#eq-dbg-filter-dom")?.addEventListener("click",()=>this.setLogFilter("dom"));let e=this.shadow.querySelector("#eq-dbg-scroll-toggle");e?.addEventListener("click",()=>{this.autoScrollLogs=!this.autoScrollLogs,e&&(e.style.color=this.autoScrollLogs?"#00ffcc":"#858585",e.title=this.autoScrollLogs?"Auto-Scroll Ligado (Clique para desligar)":"Auto-Scroll Desligado (Clique para ligar)"),this.autoScrollLogs&&this.liveDebugTerminal&&(this.liveDebugTerminal.scrollTop=this.liveDebugTerminal.scrollHeight)});let t=this.shadow.querySelector("#eq-dbg-copy-logs");t?.addEventListener("click",()=>{let c=this.getFormattedLogs();navigator.clipboard.writeText(c).then(()=>{let p=t.innerHTML;t.innerHTML=q.check,setTimeout(()=>t.innerHTML=p,1800)})}),this.shadow.querySelector("#eq-dbg-clear-logs")?.addEventListener("click",()=>{this.clearLogs()});let a=this.shadow.querySelector("#eq-dbg-copy-prompt");a?.addEventListener("click",()=>{let c=this.latestPromptText||this.latestPlan?.promptSent||"";navigator.clipboard.writeText(c).then(()=>{let p=a.innerHTML;a.innerHTML=`${q.check} Copiado!`,setTimeout(()=>a.innerHTML=p,1800)})});let i=this.shadow.querySelector("#eq-dbg-copy-context");i?.addEventListener("click",()=>{let c=this.dbgContextView?.textContent||"";navigator.clipboard.writeText(c).then(()=>{let p=i.innerHTML;i.innerHTML=`${q.check} Copiado!`,setTimeout(()=>i.innerHTML=p,1800)})});let n=this.shadow.querySelector("#eq-dbg-copy-raw-resp");n?.addEventListener("click",()=>{let c=this.latestPlan?.rawResponse||this.dbgRawRespView?.textContent||"";navigator.clipboard.writeText(c).then(()=>{let p=n.innerHTML;n.innerHTML=`${q.check} Copiado!`,setTimeout(()=>n.innerHTML=p,1800)})});let r=this.shadow.querySelector("#eq-dbg-copy-error-btn");r?.addEventListener("click",()=>{let c=this.lastErrorMsg||"";navigator.clipboard.writeText(c).then(()=>{let p=r.innerHTML;r.innerHTML=q.check,setTimeout(()=>r.innerHTML=p,1800)})}),this.shadow.querySelector("#eq-refresh-context-btn")?.addEventListener("click",()=>{this.renderContextTree()}),this.launcherBtn.addEventListener("click",()=>this.toggle()),this.dockToggleBtn.addEventListener("click",()=>this.toggle()),this.shadow.querySelector("#eq-min-btn")?.addEventListener("click",()=>this.toggle(!1)),this.shadow.querySelector("#eq-close-btn")?.addEventListener("click",()=>this.toggle(!1)),window.addEventListener("keydown",c=>{c.altKey&&(c.key==="q"||c.key==="Q")&&(c.preventDefault(),this.toggle())},!0);let s=c=>{let p=c.composedPath();(p.includes(this.sidebarEl)||p.includes(this.host))&&c.stopImmediatePropagation()};window.addEventListener("keydown",s,!0),window.addEventListener("keyup",s,!0),window.addEventListener("keypress",s,!0),this.apiKeyInput.addEventListener("input",()=>{let c=this.apiKeyInput.value.trim().replace(/^["']|["']$/g,"");this.callbacks.onSettingsChange({apiKey:c})}),this.shadow.querySelector("#eq-key-save").addEventListener("click",()=>{let c=this.apiKeyInput.value.trim().replace(/^["']|["']$/g,"");if(!c){this.setStatus("Insira o valor da chave antes de adicionar.","warning");return}let p=k.addKey(c);if(p.ok){let h=k.exportRawKeys();this.callbacks.onSettingsChange({apiKey:h[0],apiKeys:h}),this.apiKeyInput.value="",this.setStatus(`\u2713 Nova chave adicionada com sucesso! (${h.length} chaves ativas no pool)`,"success"),this.renderKeysList(),this.keyContextMenu.hidden=!0,Me(c).then(b=>{b.ok?(k.markSuccess(c,100),this.setStatus("\u2713 Nova chave validada com sucesso no Google AI Studio!","success")):(k.markInvalid(c,b.message),this.setStatus(`\u26A0\uFE0F Chave cadastrada, mas aviso retornado: ${b.message}`,"warning")),this.renderKeysList()}).catch(()=>{})}else this.setStatus(p.message,"warning")}),this.keyMoreBtn.addEventListener("click",c=>{c.stopPropagation(),this.keyContextMenu.hidden=!this.keyContextMenu.hidden}),this.shadow.addEventListener("click",c=>{let p=c.target;!p.closest("#eq-key-context-menu")&&!p.closest("#eq-key-more-btn")&&(this.keyContextMenu.hidden=!0)}),this.shadow.querySelector("#eq-menu-prompt")?.addEventListener("click",()=>{this.keyContextMenu.hidden=!0;let c=window.prompt("Adicionar Nova Chave API do Google Gemini (AI Studio):");if(c!==null&&c.trim()){let p=c.trim().replace(/^["']|["']$/g,""),h=k.addKey(p);if(h.ok){let b=k.exportRawKeys();this.callbacks.onSettingsChange({apiKey:b[0],apiKeys:b}),this.setStatus("Chave Gemini adicionada com sucesso!","success"),this.renderKeysList()}else this.setStatus(h.message,"warning")}}),this.shadow.querySelector("#eq-menu-paste")?.addEventListener("click",async()=>{this.keyContextMenu.hidden=!0;try{let c=await navigator.clipboard.readText();if(c){let p=c.trim().replace(/^["']|["']$/g,"");this.apiKeyInput.value=p,this.setStatus('Chave colada no campo. Clique no bot\xE3o "+" para adicionar ao pool.',"info")}}catch{let c=window.prompt("Adicionar Nova Chave API do Google Gemini:");if(c!==null&&c.trim()){let p=c.trim().replace(/^["']|["']$/g,"");if(k.addKey(p).ok){let b=k.exportRawKeys();this.callbacks.onSettingsChange({apiKey:b[0],apiKeys:b}),this.setStatus("Chave Gemini adicionada com sucesso!","success"),this.renderKeysList()}}}}),this.shadow.querySelector("#eq-menu-toggle-vis")?.addEventListener("click",()=>{this.keyContextMenu.hidden=!0;let c=this.apiKeyInput.type==="password";this.apiKeyInput.type=c?"text":"password";let p=this.shadow.querySelector("#eq-menu-vis-icon"),h=this.shadow.querySelector("#eq-menu-vis-text");p&&(p.innerHTML=c?q.eyeOff:q.eye),h&&(h.textContent=c?"Ocultar Campo":"Mostrar Campo")}),this.shadow.querySelector("#eq-menu-clear")?.addEventListener("click",()=>{this.keyContextMenu.hidden=!0,this.apiKeyInput.value="",this.setStatus("Campo de inser\xE7\xE3o limpo.","info"),this.apiKeyInput.focus()}),this.shadow.querySelector("#eq-menu-test")?.addEventListener("click",async()=>{this.keyContextMenu.hidden=!0;let c=k.getAllKeys();if(c.length===0)return this.setStatus("Nenhuma chave cadastrada para testar.","error");this.setStatus(`Testando ${c.length} chave(s) no Google AI Studio...`,"info");let p=0;for(let h of c){let b=await Me(h.key);b.ok?(p++,k.markSuccess(h.key,100)):k.markInvalid(h.key,b.message)}this.renderKeysList(),this.setStatus(`Teste conclu\xEDdo: ${p}/${c.length} chave(s) operando com sucesso!`,p>0?"success":"error")});let d=()=>{this.keyContextMenu.hidden=!0,window.confirm("Deseja realmente resetar todos os dados, chaves e mem\xF3ria de sess\xE3o do EasyQuiz?")&&(this.autopilot.isActive()&&this.autopilot.stop(),this.updateAutopilotUi(!1),this.setBusy(!1),ct(),be(),this.stopQuestionTimer(0),this.currentQuestionStartTime=0,this.metricsLiveTime&&(this.metricsLiveTime.textContent="00:00.00"),this.metricsLiveStatus&&(this.metricsLiveStatus.textContent="Em espera",this.metricsLiveStatus.className="eq-live-stopwatch-status"),this.updateTimingMetrics(),this.apiKeyInput.value="",this.callbacks.onSettingsChange({apiKey:""}),this.setStatus("Todos os dados do EasyQuiz foram limpos.","info"),this.logToConsole("> [SYS] Armazenamento local resetado.","text-yellow"))};this.shadow.querySelector("#eq-menu-reset")?.addEventListener("click",d),this.shadow.querySelector("#eq-reset-all-btn")?.addEventListener("click",d),this.apToggleBtn.addEventListener("click",()=>{if(this.autopilot.isActive())this.autopilot.stop(),this.callbacks.onCancel?.(),this.setProgress(0),this.updateAutopilotUi(!1),this.setInterrupted("Autopilot interrompido imediatamente pelo usu\xE1rio.");else{if(!this.apiKeyInput.value.trim().replace(/^["']|["']$/g,"")){this.setStatus("Configure sua chave de API Gemini na aba Configura\xE7\xF5es antes de ligar o Autopilot.","error"),this.switchTab("settings"),this.apiKeyInput.focus();return}this.callbacks.onSettingsChange({autoApply:!0,autoAdvance:!0}),this.autoApplyCheckbox.checked=!0,this.autoAdvanceCheckbox.checked=!0,this.autopilot.start(),this.updateAutopilotUi(!0),this.startStopwatch(),this.setStatus("Autopilot ativo. Monitorando exerc\xEDcios...","info")}}),this.shadow.querySelector("#eq-ap-clear-memory").addEventListener("click",()=>{Ve(),this.logToConsole("> [SYS] Mem\xF3ria contextual limpa com sucesso.","text-green"),this.setStatus("Mem\xF3ria contextual da sess\xE3o limpa.","success")});let m=this.shadow.querySelector("#eq-copy-console-btn");m?.addEventListener("click",()=>{let c=this.apConsole?.innerText||"";navigator.clipboard.writeText(c).then(()=>{let p=m.innerHTML;m.innerHTML=q.check,setTimeout(()=>m.innerHTML=p,1800)})}),this.copyPromptBtn.addEventListener("click",()=>{let c=this.inspPrompt.textContent||"";navigator.clipboard.writeText(c).then(()=>{let p=this.copyPromptBtn.innerHTML;this.copyPromptBtn.innerHTML=`${q.check} Copiado!`,setTimeout(()=>this.copyPromptBtn.innerHTML=p,2e3)})}),this.modelSelect.addEventListener("change",()=>this.callbacks.onSettingsChange({model:this.modelSelect.value})),this.modeSelect.addEventListener("change",()=>this.callbacks.onSettingsChange({modeHint:this.modeSelect.value})),this.engineSelect.addEventListener("change",()=>this.callbacks.onSettingsChange({engine:this.engineSelect.value})),this.dryRunCheckbox.addEventListener("change",()=>this.callbacks.onSettingsChange({dryRun:this.dryRunCheckbox.checked})),this.autoApplyCheckbox.addEventListener("change",()=>this.callbacks.onSettingsChange({autoApply:this.autoApplyCheckbox.checked})),this.autoAdvanceCheckbox.addEventListener("change",()=>this.callbacks.onSettingsChange({autoAdvance:this.autoAdvanceCheckbox.checked})),this.useVisionCheckbox.addEventListener("change",()=>{let c=this.useVisionCheckbox.checked;this.callbacks.onSettingsChange({useVision:c}),this.setStatus(c?"Vis\xE3o Computacional ativada (capturas habilitadas).":"Modo DOM R\xE1pido ativado (capturas desabilitadas).","info")}),this.hostDarkModeCheckbox.addEventListener("change",()=>{let c=this.hostDarkModeCheckbox.checked;this.callbacks.onSettingsChange({hostDarkMode:c}),this.applyHostDarkMode(c)}),this.analyzeBtn.addEventListener("click",async()=>{if(this.isBusy){this.callbacks.onCancel?.(),this.setInterrupted("An\xE1lise cancelada pelo usu\xE1rio. Pronto para nova tentativa.");return}await this.callbacks.onAnalyze()&&!this.dryRunCheckbox.checked&&!this.autoApplyCheckbox.checked&&this.callbacks.onApply()}),this.applyBtn.addEventListener("click",()=>this.callbacks.onApply())}startStopwatch(){this.stopStopwatch(),this.stopwatchStartTime=Date.now();let e=()=>{let t=((Date.now()-this.stopwatchStartTime)/1e3).toFixed(2)+"s";this.stopwatchAp.textContent=t,this.stopwatchAdv.textContent=t};e(),this.stopwatchInterval=setInterval(e,100)}stopStopwatch(e){if(this.stopwatchInterval&&(clearInterval(this.stopwatchInterval),this.stopwatchInterval=null),e!==void 0){let t=(e/1e3).toFixed(2)+"s";this.stopwatchAp.textContent=t,this.stopwatchAdv.textContent=t}}setLogFilter(e){this.activeLogFilter=e;let t=["all","error","ai","dom"];for(let a of t){let i=this.shadow.querySelector(`#eq-dbg-filter-${a}`);a===e?i?.classList.add("active"):i?.classList.remove("active")}this.renderTerminalEntries()}updateLogCounters(){let e=0,t=0,a=0;for(let i of this.logEntries)i.category==="error"?e++:i.category==="ai"?t++:i.category==="dom"&&a++;this.dbgCountAll&&(this.dbgCountAll.textContent=String(this.logEntries.length)),this.dbgCountError&&(this.dbgCountError.textContent=String(e)),this.dbgCountAi&&(this.dbgCountAi.textContent=String(t)),this.dbgCountDom&&(this.dbgCountDom.textContent=String(a))}renderTerminalEntries(){if(!this.liveDebugTerminal)return;this.liveDebugTerminal.replaceChildren();let e=this.activeLogFilter==="all"?this.logEntries:this.logEntries.filter(t=>t.category===this.activeLogFilter);if(e.length===0){let t=document.createElement("div");t.className="text-muted",t.textContent=`Nenhum log encontrado para o filtro "${this.activeLogFilter.toUpperCase()}".`,this.liveDebugTerminal.appendChild(t);return}for(let t of e){let a=document.createElement("div");a.textContent=t.message,t.colorClass&&(a.className=t.colorClass),this.liveDebugTerminal.appendChild(a)}this.autoScrollLogs&&(this.liveDebugTerminal.scrollTop=this.liveDebugTerminal.scrollHeight)}clearLogs(){if(this.logEntries=[],this.updateLogCounters(),this.liveDebugTerminal){this.liveDebugTerminal.replaceChildren();let e=document.createElement("div");e.className="text-blue",e.textContent="> [SYS] Console de logs limpo pelo usu\xE1rio.",this.liveDebugTerminal.appendChild(e)}this.apConsole&&this.apConsole.replaceChildren(),this.executionConsole&&this.executionConsole.replaceChildren()}getFormattedLogs(){return(this.activeLogFilter==="all"?this.logEntries:this.logEntries.filter(t=>t.category===this.activeLogFilter)).map(t=>t.message).join(`
`)}setLastError(e){this.lastErrorMsg=e,this.dbgErrorCard&&this.dbgErrorText&&(this.dbgErrorText.textContent=e,this.dbgErrorCard.style.display="flex")}setErrorDiagnostic(e,t){let a=t?`[${t}] ${e}`:e;this.setLastError(a)}refreshDebugView(){let e=this.latestPlan,t=this.latestContext,a=this.latestPromptText||e?.promptSent||"";if(this.dbgModel&&(this.dbgModel.textContent=e?.usedModel||this.initialSettings.model||"--"),this.dbgLatency&&(this.dbgLatency.textContent=e?.durationMs?`${e.durationMs}ms`:"--"),this.dbgSplitTokens){let i=e?.promptTokens!==void 0?String(e.promptTokens):"--",n=e?.candidatesTokens!==void 0?String(e.candidatesTokens):"--";this.dbgSplitTokens.textContent=`${i} / ${n}`,this.dbgSplitTokens.title=`Prompt: ${i} tokens | Resposta: ${n} tokens`}if(this.dbgTotalTokens){let i=e?.tokensUsed??(e?.promptTokens&&e?.candidatesTokens?e.promptTokens+e.candidatesTokens:void 0);this.dbgTotalTokens.textContent=i!==void 0?`${i}`:"--"}if(this.dbgPromptLen){let i=a.length,n=Math.round(i/4);this.dbgPromptLen.textContent=`${i} chars (~${n} tokens est.)`}if(this.dbgPromptView&&(this.dbgPromptView.textContent=a||"Nenhum prompt enviado at\xE9 o momento."),this.dbgContextView)if(t){let i={scope:`${t.scope.tagName.toLowerCase()}${t.scope.id?"#"+t.scope.id:""}${t.scope.className?"."+t.scope.className.split(" ").join("."):""}`,questionLength:t.questionText.length,questionSnippet:t.questionText.slice(0,150)+(t.questionText.length>150?"...":""),controlsCount:t.controls.length,controls:t.controls.map((n,r)=>({index:r+1,tag:n.tag,type:n.type,name:n.name||void 0,id:n.id||void 0,value:n.value||void 0,label:n.label||void 0,role:n.role}))};this.dbgContextView.textContent=JSON.stringify(i,null,2)}else this.dbgContextView.textContent="Aguardando captura de contexto pelo EasyQuiz...";this.dbgRawRespView&&(e?e.rawResponse?this.dbgRawRespView.textContent=e.rawResponse:this.dbgRawRespView.textContent=JSON.stringify({pageType:e.pageType,mode:e.mode,confidence:e.confidence,rationale:e.rationale,actions:e.actions},null,2):this.dbgRawRespView.textContent="Aguardando retorno da API Gemini..."),this.lastErrorMsg&&this.dbgErrorCard&&this.dbgErrorText&&(this.dbgErrorText.textContent=this.lastErrorMsg,this.dbgErrorCard.style.display="flex")}logToConsole(e,t){let a=new Date,i=`${String(a.getHours()).padStart(2,"0")}:${String(a.getMinutes()).padStart(2,"0")}:${String(a.getSeconds()).padStart(2,"0")}.${String(Math.floor(a.getMilliseconds()/100))}`,n=e;e.startsWith(">")?n=`> [${i}] ${e.slice(1).trim()}`:n=`[${i}] ${e}`;let r="all";t==="text-red"||n.includes("[ERRO]")||n.includes("Falha")||n.includes("Error")?r="error":n.includes("[IA]")||n.includes("[RAG]")||n.includes("Tokens")||n.includes("Gemini")||n.includes("Modelo:")?r="ai":(n.includes("[DOM]")||n.includes("[EXEC]")||n.includes("[VERIF]")||n.includes("[NAV]"))&&(r="dom");let s={id:Date.now()+Math.random(),timestamp:i,message:n,colorClass:t,category:r};for(this.logEntries.push(s);this.logEntries.length>250;)this.logEntries.shift();if(this.updateLogCounters(),r==="error"&&this.setLastError(n),this.liveDebugTerminal&&(this.activeLogFilter==="all"||this.activeLogFilter===r)){let l=document.createElement("div");for(l.textContent=n,t&&(l.className=t),this.liveDebugTerminal.appendChild(l);this.liveDebugTerminal.children.length>250;)this.liveDebugTerminal.removeChild(this.liveDebugTerminal.firstChild);this.autoScrollLogs&&(this.liveDebugTerminal.scrollTop=this.liveDebugTerminal.scrollHeight)}if(this.apConsole){let l=document.createElement("div");for(l.textContent=n,t&&(l.className=t),this.apConsole.appendChild(l),this.apConsole.scrollTop=this.apConsole.scrollHeight;this.apConsole.children.length>150;)this.apConsole.removeChild(this.apConsole.firstChild)}if(this.executionConsole){let l=document.createElement("div");for(l.textContent=n,t&&(l.className=t),this.executionConsole.appendChild(l),this.executionConsole.scrollTop=this.executionConsole.scrollHeight;this.executionConsole.children.length>150;)this.executionConsole.removeChild(this.executionConsole.firstChild)}}setProgress(e,t){if(!this.progressContainer||!this.progressBar)return;if(e<=0){this.progressContainer.style.display="none",this.progressBar.style.width="0%";return}this.progressContainer.style.display="flex";let a=Math.min(100,Math.max(0,Math.round(e)));this.progressBar.style.width=`${a}%`,this.progressVal&&(this.progressVal.textContent=`${a}%`),t&&this.progressLabel&&(this.progressLabel.textContent=t),a>=100&&setTimeout(()=>{this.progressContainer&&this.progressBar&&this.progressBar.style.width==="100%"&&(this.progressContainer.style.display="none")},1500)}updateContext(e,t){this.latestContext=e,t&&(this.latestPlan=t),this.activeTab==="brain"?(this.renderContextTree(),t&&this.refreshInspectorView()):this.activeTab==="debug"&&this.refreshDebugView()}renderContextTree(){if(!this.contextTreeContainer)return;let e=this.latestContext,t=Ae(),a=this.latestPlan;this.contextTreeContainer.innerHTML="";let i=this.createTreeFolder("\u{1F4C4} P\xC1GINA & ESCOPO ATUAL",!0,[{label:"T\xEDtulo",value:document.title||"Sem t\xEDtulo"},{label:"URL",value:window.location.pathname||"/"},{label:"Escopo DOM",value:e?`${e.scope.tagName.toLowerCase()}${e.scope.className?"."+e.scope.className.split(" ").join("."):""}`:"Document"},{label:"Tamanho Texto",value:e?`${e.questionText.length} caracteres`:"N\xE3o analisado"},{label:"Trecho Enunciado",value:e?`"${e.questionText.slice(0,120)}..."`:"Nenhum"}]);this.contextTreeContainer.appendChild(i);let n=e?e.controls:[],r=n.map((u,m)=>{let c=u.role==="navigation"||u.type==="button",p=!c&&u.value?` [val: "${u.value}"]`:"";return{label:`[#${m+1}] ${u.type.toUpperCase()}`,value:`${u.label||u.id||u.name||"(Sem r\xF3tulo)"}${p}`.trim(),badge:c?"Navega\xE7\xE3o":u.role||u.type}}),s=this.createTreeFolder(`\u{1F39B}\uFE0F CONTROLES DETECTADOS (${n.length})`,n.length>0,r);this.contextTreeContainer.appendChild(s);let l=t.map((u,m)=>({label:`Mem\xF3ria #${m+1}`,value:u,badge:"RAG"})),d=this.createTreeFolder(`\u{1F9E0} MEM\xD3RIA RAG ACUMULADA (${t.length})`,t.length>0,l);if(this.contextTreeContainer.appendChild(d),a){let u=this.createTreeFolder(`\u{1F916} \xDALTIMO PLANO IA (${a.actions.length} a\xE7\xF5es)`,!0,[{label:"Tipo P\xE1gina",value:a.pageType,badge:`${(a.confidence*100).toFixed(0)}%`},{label:"Modo",value:a.mode},{label:"Racioc\xEDnio",value:a.rationale||"N/A"},...a.actions.map((m,c)=>({label:`A\xE7\xE3o #${c+1} (${m.t})`,value:JSON.stringify(m)}))]);this.contextTreeContainer.appendChild(u)}}createTreeFolder(e,t,a){let i=document.createElement("div");i.className="eq-tree-node";let n=document.createElement("div");n.className="eq-tree-header",n.innerHTML=`<span class="eq-tree-arrow">${t?"\u25BC":"\u25B6"}</span> <span>${e}</span>`;let r=document.createElement("div");if(r.className="eq-tree-content",r.style.display=t?"flex":"none",a.length===0)r.innerHTML='<div class="text-muted" style="padding: 2px 0;">Nenhum item registrado.</div>';else for(let s of a){let l=document.createElement("div");l.className="eq-tree-leaf",l.innerHTML=`
          <strong style="color:#ffffff; min-width: 80px;">${s.label}:</strong>
          <span style="flex:1; word-break: break-word; color:#aaaaaa;">${s.value}</span>
          ${s.badge?`<span class="eq-tree-badge">${s.badge}</span>`:""}
        `,r.appendChild(l)}return n.addEventListener("click",()=>{let s=r.style.display==="none";r.style.display=s?"flex":"none";let l=n.querySelector(".eq-tree-arrow");l&&(l.textContent=s?"\u25BC":"\u25B6")}),i.appendChild(n),i.appendChild(r),i}toggle(e){e!==void 0?this.isCollapsed=!e:this.isCollapsed=!this.isCollapsed,this.isCollapsed?this.sidebarEl.classList.add("eq-collapsed"):(this.sidebarEl.classList.remove("eq-collapsed"),this.apiKeyInput.value||(this.switchTab("settings"),this.apiKeyInput.focus()))}updateAutopilotUi(e){e?(this.apToggleBtn.innerHTML=`${q.stop} PARAR AUTOPILOT`,this.apToggleBtn.classList.add("danger"),this.apToggleBtn.title="Interromper execu\xE7\xE3o cont\xEDnua do Autopilot"):(this.apToggleBtn.innerHTML=`${q.play} INICIAR AUTOPILOT`,this.apToggleBtn.classList.remove("danger"),this.apToggleBtn.title="Iniciar resolu\xE7\xE3o autom\xE1tica cont\xEDnua de quest\xF5es")}setOperationState(e,t){let a=this.shadow.querySelector("#eq-operation-state");a&&(a.textContent=e,a.className=`eq-operation-state is-${t}`)}setInterrupted(e="An\xE1lise interrompida pelo usu\xE1rio."){this.isBusy=!1,[this.modelSelect,this.modeSelect,this.engineSelect,this.dryRunCheckbox,this.autoApplyCheckbox,this.autoAdvanceCheckbox,this.useVisionCheckbox].forEach(t=>t.disabled=!1),this.analyzeBtn.disabled=!1,this.analyzeBtn.classList.remove("danger"),this.analyzeBtn.innerHTML=`${q.sparkles} Resolver com IA (Alt+R)`,this.analyzeBtn.title="Analisar e responder quest\xE3o ativa",this.applyBtn.disabled=!this.latestPlan||!this.latestPlan.actions.length,this.stopStopwatch(),this.stopQuestionTimer(),this.dotPulseAp.className="eq-dot-pulse stopped",this.dotPulseAdv.className="eq-dot-pulse stopped",this.launcherDot.className="eq-launcher-dot stopped",this.metricsLiveStatus&&(this.metricsLiveStatus.textContent="Interrompido",this.metricsLiveStatus.className="eq-live-stopwatch-status is-warning"),this.autopilot.isActive()||this.updateAutopilotUi(!1),this.setStatus(e,"warning")}setBusy(e,t){this.isBusy=e,[this.modelSelect,this.modeSelect,this.engineSelect,this.dryRunCheckbox,this.autoApplyCheckbox,this.autoAdvanceCheckbox,this.useVisionCheckbox].forEach(a=>a.disabled=e),e?(this.analyzeBtn.disabled=!1,this.analyzeBtn.classList.add("danger"),this.analyzeBtn.innerHTML=`${q.stop} Parar An\xE1lise`,this.analyzeBtn.title="Interromper e cancelar an\xE1lise em andamento",this.applyBtn.disabled=!0,this.startStopwatch(),this.startQuestionTimer(),this.dotPulseAp.className="eq-dot-pulse busy",this.dotPulseAdv.className="eq-dot-pulse busy",this.launcherDot.className="eq-launcher-dot busy",this.setOperationState("Analisando...","busy"),this.metricsLiveStatus&&(this.metricsLiveStatus.textContent="Calculando...",this.metricsLiveStatus.className="eq-live-stopwatch-status is-busy"),t&&this.setStatus(t,"info")):(this.analyzeBtn.disabled=!1,this.analyzeBtn.classList.remove("danger"),this.analyzeBtn.innerHTML=`${q.sparkles} Resolver com IA (Alt+R)`,this.analyzeBtn.title="Analisar e responder quest\xE3o ativa",this.applyBtn.disabled=!this.latestPlan||!this.latestPlan.actions.length,this.stopStopwatch(),this.stopQuestionTimer(),this.dotPulseAp.className="eq-dot-pulse",this.dotPulseAdv.className="eq-dot-pulse",this.launcherDot.className="eq-launcher-dot",this.setOperationState(this.autopilot.isActive()?"Monitorando":"Pronto","idle"),this.metricsLiveStatus&&this.metricsLiveStatus.textContent==="Calculando..."&&(this.metricsLiveStatus.textContent="Em espera",this.metricsLiveStatus.className="eq-live-stopwatch-status"))}setStatus(e,t="info"){this.statusTextAp.textContent=e,this.statusTextAdv.textContent=e,t==="error"?(this.setOperationState("Bloqueado","error"),this.dotPulseAp.className="eq-dot-pulse error",this.dotPulseAdv.className="eq-dot-pulse error",this.launcherDot.className="eq-launcher-dot error"):t==="warning"?(this.setOperationState("Interrompido","warning"),this.dotPulseAp.className="eq-dot-pulse stopped",this.dotPulseAdv.className="eq-dot-pulse stopped",this.launcherDot.className="eq-launcher-dot stopped"):t==="success"?(this.setOperationState("Confirmado","success"),this.dotPulseAp.className="eq-dot-pulse",this.dotPulseAdv.className="eq-dot-pulse",this.launcherDot.className="eq-launcher-dot"):this.isBusy?(this.setOperationState("Analisando...","busy"),this.dotPulseAp.className="eq-dot-pulse busy",this.dotPulseAdv.className="eq-dot-pulse busy",this.launcherDot.className="eq-launcher-dot busy"):(this.setOperationState(this.autopilot.isActive()?"Monitorando":"Pronto","info"),this.dotPulseAp.className="eq-dot-pulse",this.dotPulseAdv.className="eq-dot-pulse",this.launcherDot.className="eq-launcher-dot");let a=e.includes("Alternando")||e.includes("indispon\xEDvel")||e.includes("fallback")||e.includes("alternativo"),i=t==="error"?"> [ERRO] ":t==="success"?"> [SUCESSO] ":t==="warning"?"> [PARADO] ":a?"> [FALLBACK] ":"> [SYS] ",n=t==="error"?"text-red":t==="success"?"text-green":t==="warning"||a?"text-yellow":"text-blue";this.logToConsole(`${i}${e}`,n)}setPlan(e,t){this.latestPlan=e,this.resultContainer.style.display="flex",e.durationMs&&this.stopStopwatch(e.durationMs);let a=this.shadow.querySelector("#eq-badges");a.replaceChildren();let i=[e.mode.replace("_"," "),`${Math.round(e.confidence*100)}% Confian\xE7a`,`${e.actions.length} a\xE7\xF5es`,...e.usedModel?[e.usedModel]:[]];for(let l of i){let d=document.createElement("span");d.className="eq-brand-badge",d.textContent=l,a.appendChild(d)}let n=this.shadow.querySelector("#eq-rationale-text");n.textContent=e.rationale;let r=this.shadow.querySelector("#eq-actions-list");r.innerHTML="";for(let l of e.actions){let d=document.createElement("div");d.className="eq-action-item";let u="";l.t==="chk"?u=`chk ${l.id} (${l.c})`:l.t==="val"?u=`val "${l.v}" -> ${l.id}`:l.t==="sel"?u=`sel "${Array.isArray(l.v)?l.v.join(","):l.v}" -> ${l.id}`:l.t==="clk"?u=`clk ${l.id}`:l.t==="adv"?u="adv":l.t==="js"?u=`js: ${String(l.v).slice(0,40)}...`:l.t==="drag"&&(u=`drag "${l.from}" -> "${l.to}"`);let m=document.createElement("span");m.className="eq-action-badge",m.textContent=l.t.toUpperCase();let c=document.createElement("span");c.textContent=u,d.append(m,c),r.appendChild(d)}this.applyBtn.disabled=!t||!e.actions.length;let s=this.shadow.querySelector("#eq-execution-card");s&&(s.hidden=!0),this.refreshInspectorView(),this.refreshDebugView()}setExecutionReport(e){let t=this.shadow.querySelector("#eq-execution-card"),a=this.shadow.querySelector("#eq-execution-summary"),i=this.shadow.querySelector("#eq-execution-list");if(!t||!a||!i)return;t.hidden=!1,a.textContent=e.navigationVerified?`${e.verified}/${e.applied} a\xE7\xF5es verificadas. Navega\xE7\xE3o confirmada.`:`${e.verified}/${e.applied} a\xE7\xF5es verificadas. ${e.navigationEvidence}`,a.className=`eq-execution-summary ${e.success?"is-success":"is-warning"}`,i.replaceChildren();let n=this.shadow.querySelector("#eq-execution-placeholder");n&&(n.textContent=e.navigationVerified?"Fluxo conclu\xEDdo: aplica\xE7\xE3o e navega\xE7\xE3o confirmadas.":`Fluxo interrompido: ${e.navigationEvidence}`,n.className=`eq-execution-placeholder ${e.success?"is-success":"is-warning"}`);for(let r of e.reports){let s=document.createElement("div");s.className=`eq-execution-row ${r.verified?"is-success":"is-failed"}`;let l=document.createElement("span");l.className="eq-execution-state",l.textContent=r.verified?"OK":"FALHOU";let d=document.createElement("div");d.className="eq-execution-details";let u=document.createElement("strong");u.textContent=r.target;let m=document.createElement("span");if(m.textContent=`${r.strategy} | ${r.evidence}`,d.append(u,m),s.append(l,d),r.error){let c=document.createElement("small");c.textContent=r.error,s.appendChild(c)}i.appendChild(s)}}setInspectorPrompt(e,t){this.latestPromptText=e,this.inspPrompt&&(this.inspPrompt.textContent=e),t&&this.inspModel&&(this.inspModel.textContent=t),this.inspLatency&&(this.inspLatency.textContent="Aguardando IA..."),this.activeTab==="debug"&&this.refreshDebugView()}refreshInspectorView(){let e=this.latestPlan;if(e)if(this.inspModel.textContent=e.usedModel||this.initialSettings.model,this.inspLatency.textContent=e.durationMs?`${e.durationMs}ms`:"--",this.inspTokens.textContent=e.tokensUsed?`${e.tokensUsed}`:"--",this.inspPrompt.textContent=e.promptSent||this.latestPromptText||"Prompt n\xE3o registrado para esta requisi\xE7\xE3o.",this.inspRationale.textContent=e.rationale,this.inspActions.innerHTML="",e.actions.length>0)for(let t of e.actions){let a=document.createElement("div");a.className="eq-action-item",a.textContent=JSON.stringify(t),this.inspActions.appendChild(a)}else this.inspActions.innerHTML='<div class="text-muted" style="padding: 4px;">Nenhuma a\xE7\xE3o prescrita pela IA.</div>';else this.latestPromptText&&(this.inspPrompt.textContent=this.latestPromptText)}showFloatingAnswers(e){let t=e||this.latestPlan;t&&this.floatingAnswers.show(t)}hideFloatingAnswers(){this.floatingAnswers.hide()}renderKeysList(){if(!this.keysListEl)return;let e=k.getAllKeys();if(this.keysBadgeEl){let a=e.filter(r=>!r.isCooldown).length,i=e.reduce((r,s)=>r+(s.winCount||0),0),n=a>=3?" \u26A1 TURBO":"";this.keysBadgeEl.textContent=`${e.length} chave${e.length>1?"s":""} (${a} pronta${a!==1?"s":""})${n}`,this.keysBadgeEl.className=`eq-key-badge ${a>=3?"racing":a>0?"ready":"cooldown"}`}this.keysListEl.replaceChildren(),[...e].sort((a,i)=>{let n=a.winCount||0,r=i.winCount||0;if(n!==r)return r-n;let s=a.lastLatencyMs||99999,l=i.lastLatencyMs||99999;if(s!==l)return s-l;let d=a.isCooldown?1:0,u=i.isCooldown?1:0;return d-u}).forEach((a,i)=>{let n=e.findIndex(g=>g.id===a.id),r=n>=0?n:i,s=document.createElement("div");s.className="eq-key-item";let l=document.createElement("div");l.className="eq-key-info";let d=document.createElement("span");d.className="eq-key-label",d.textContent=a.label||`Chave ${r+1}`;let u=document.createElement("span");u.className="eq-key-masked",u.textContent=_.maskKey(a.key),u.title="Clique para copiar a chave",u.style.cursor="pointer",u.addEventListener("click",()=>{navigator.clipboard?.writeText(a.key),this.setStatus(`Chave ${r+1} copiada para a \xE1rea de transfer\xEAncia!`,"info")});let m=document.createElement("span");if(a.isCooldown){m.className="eq-key-badge cooldown";let g=Math.ceil(a.remainingCooldownMs/1e3);m.textContent=`\u23F1 Cooldown (${g}s)`}else a.lastError&&a.errorCount&&a.errorCount>3?(m.className="eq-key-badge invalid",m.textContent="Erro",m.title=a.lastError):a.lastLatencyMs?(m.className="eq-key-badge ready",m.textContent=`Pronta (${a.lastLatencyMs}ms)`):(m.className="eq-key-badge ready",m.textContent="Pronta");l.appendChild(d),l.appendChild(u),l.appendChild(m);let c=a.winCount||0;if(c>0){let g=document.createElement("span");g.className="eq-key-badge winner",g.textContent=`\u{1F3C6} ${c} vit\xF3ria${c>1?"s":""}`,g.title=`Esta chave foi a mais r\xE1pida ${c} vez${c>1?"es":""} nas corridas paralelas`,l.appendChild(g)}let p=document.createElement("div");p.className="eq-key-actions";let h=document.createElement("button");h.className="eq-icon-btn",h.type="button",h.title="Testar esta chave",h.innerHTML=q.sparkles,h.addEventListener("click",async()=>{this.setStatus(`Testando chave ${a.label||r+1}...`,"info");let g=await Me(a.key);g.ok?(k.markSuccess(a.key,120),this.setStatus(`\u2713 ${a.label||`Chave ${r+1}`}: Conex\xE3o com Google Gemini aprovada!`,"success")):(k.markInvalid(a.key,g.message),this.setStatus(`\u26A0\uFE0F ${a.label||`Chave ${r+1}`}: ${g.message}`,"error")),this.renderKeysList()});let b=document.createElement("button");b.className="eq-icon-btn",b.type="button",b.title="Editar chave",b.innerHTML=q.edit,b.addEventListener("click",()=>{let g=window.prompt(`Editar ${a.label||`Chave ${r+1}`}:`,a.key);if(g!==null&&g.trim()){let y=k.updateKey(a.id,g.trim());if(y.ok){let x=k.exportRawKeys();this.callbacks.onSettingsChange({apiKey:x[0],apiKeys:x}),this.setStatus(`Chave ${r+1} atualizada com sucesso!`,"success"),this.renderKeysList()}else this.setStatus(y.message,"warning")}});let f=document.createElement("button");f.className="eq-icon-btn",f.type="button",f.title="Remover chave",f.innerHTML=q.trash,e.length<=1?(f.disabled=!0,f.style.opacity="0.3",f.title="Voc\xEA precisa manter pelo menos 1 chave cadastrada."):f.addEventListener("click",()=>{if(confirm(`Remover permanentemente a ${a.label||`Chave ${r+1}`}?`)){let g=k.removeKey(a.id);if(g.ok){let y=k.exportRawKeys();this.callbacks.onSettingsChange({apiKey:y[0],apiKeys:y}),this.setStatus("Chave removida com sucesso.","info"),this.renderKeysList()}else this.setStatus(g.message,"warning")}}),p.appendChild(h),p.appendChild(b),p.appendChild(f),s.appendChild(l),s.appendChild(p),this.keysListEl.appendChild(s)})}updateModelSelect(e,t){let a=e.filter(r=>R(r.id)),i=t&&R(t)?t:R(this.initialSettings.model)?this.initialSettings.model:"gemini-2.5-flash";this.modelSelect.innerHTML="";let n=!1;a.forEach(r=>{let s=r.id===i;s&&(n=!0),this.modelSelect.add(new Option(r.name,r.id,!1,s))}),!n&&i&&R(i)&&this.modelSelect.add(new Option(`Gemini (${i})`,i,!1,!0)),this.modelSelect.value=i}updateSelectedModel(e){if(!R(e))return;Array.from(this.modelSelect.options).some(a=>a.value===e)||this.modelSelect.add(new Option(`Gemini (${e})`,e,!1,!0)),this.modelSelect.value=e}applyHostDarkMode(e){document.getElementById("eq-host-dark-mode-style")?.remove(),this.host.classList.toggle("eq-dark-mode-active",e)}startQuestionTimer(){this.currentQuestionStartTime=Date.now(),this.questionLiveTimerInterval&&clearInterval(this.questionLiveTimerInterval),this.metricsLiveStatus&&(this.metricsLiveStatus.textContent="Calculando...",this.metricsLiveStatus.classList.add("active"));let e=()=>{if(!this.metricsLiveTime)return;let t=Date.now()-this.currentQuestionStartTime,a=Math.floor(t/6e4),i=Math.floor(t%6e4/1e3),n=Math.floor(t%1e3/10);this.metricsLiveTime.textContent=`${String(a).padStart(2,"0")}:${String(i).padStart(2,"0")}.${String(n).padStart(2,"0")}`};e(),this.questionLiveTimerInterval=setInterval(e,50)}stopQuestionTimer(e){if(this.questionLiveTimerInterval&&(clearInterval(this.questionLiveTimerInterval),this.questionLiveTimerInterval=null),this.metricsLiveStatus&&(this.metricsLiveStatus.textContent="Parado",this.metricsLiveStatus.classList.remove("active")),this.metricsLiveTime&&this.currentQuestionStartTime>0){let t=e!==void 0?e:Math.max(0,Date.now()-this.currentQuestionStartTime),a=Math.floor(t/6e4),i=Math.floor(t%6e4/1e3),n=Math.floor(t%1e3/10);this.metricsLiveTime.textContent=`${String(a).padStart(2,"0")}:${String(i).padStart(2,"0")}.${String(n).padStart(2,"0")}`}}updateTimingMetrics(e){let t=e||ie();if(!this.metricTotalTime)return;let a=Math.floor(t.totalElapsedMs/1e3),i=Math.floor(a/60),n=a%60;this.metricTotalTime.textContent=`${String(i).padStart(2,"0")}:${String(n).padStart(2,"0")}`;let r=(t.averageDurationMs/1e3).toFixed(1);this.metricAvgTime.textContent=`${r}s`,this.metricTotalCount.textContent=String(t.completedQuestionsCount),this.metricsTotalBadge&&(this.metricsTotalBadge.textContent=`${t.completedQuestionsCount} Quest\xE3o(\xF5es)`),this.metricsHistoryCount&&(this.metricsHistoryCount.textContent=`${t.records.length} registros`),this.renderMetricsHistory(t.records)}renderMetricsHistory(e){if(!this.metricsHistoryList)return;if(e.length===0){this.metricsHistoryList.innerHTML='<div class="eq-metrics-empty">Nenhuma quest\xE3o respondida nesta sess\xE3o ainda.</div>';return}this.metricsHistoryList.innerHTML="";let t=[...e].reverse();for(let a of t){let i=document.createElement("div");i.className="eq-metrics-item";let n=document.createElement("div");n.className="eq-metrics-item-left";let r=document.createElement("span");r.className="eq-metrics-badge",r.textContent=`Q${a.questionIndex}`;let s=document.createElement("div");s.className="eq-metrics-item-info";let l=document.createElement("div");l.className="eq-metrics-item-title",l.textContent=a.questionTitle||`Quest\xE3o ${a.questionIndex}`;let d=document.createElement("div");d.className="eq-metrics-item-meta";let u=new Date(a.timestamp).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit",second:"2-digit"}),m=a.mode?a.mode.replace("_"," "):"auto";d.textContent=`${u} \u2022 Modo: ${m}${a.actionsCount?` \u2022 ${a.actionsCount} a\xE7\xE3o(\xF5es)`:""}`,s.appendChild(l),s.appendChild(d),n.appendChild(r),n.appendChild(s);let c=document.createElement("div");c.className="eq-metrics-item-right";let p=document.createElement("span");p.className="eq-metrics-item-dur",p.textContent=`${(a.durationMs/1e3).toFixed(2)}s`;let h=document.createElement("span");h.className=`eq-metrics-item-status is-${a.status}`,h.textContent=a.status==="verified"||a.status==="answered"?"\u2713 Injetado":a.status==="manual"?"Gabarito":"Pendente",c.appendChild(p),c.appendChild(h),i.appendChild(n),i.appendChild(c),this.metricsHistoryList.appendChild(i)}}copyMetricsReport(){let e=ie(),t=[];t.push("# Relat\xF3rio de Desempenho e Tempo \u2014 EasyQuiz"),t.push(`- **Quest\xF5es Respondidas:** ${e.completedQuestionsCount}`),t.push(`- **Tempo Total:** ${(e.totalElapsedMs/1e3).toFixed(1)}s`),t.push(`- **Tempo M\xE9dio por Quest\xE3o:** ${(e.averageDurationMs/1e3).toFixed(2)}s`),t.push(""),t.push("### Hist\xF3rico:"),e.records.length===0?t.push("_Nenhum registro ainda._"):e.records.forEach((a,i)=>{t.push(`${i+1}. **${a.questionTitle||`Q${a.questionIndex}`}**: ${(a.durationMs/1e3).toFixed(2)}s (${a.status})`)}),navigator.clipboard.writeText(t.join(`
`)).then(()=>{if(this.metricsCopyBtn){let a=this.metricsCopyBtn.innerHTML;this.metricsCopyBtn.innerHTML="\u2713 Copiado!",setTimeout(()=>{this.metricsCopyBtn.innerHTML=a},1500)}})}destroy(){this.stopStopwatch(),this.stopQuestionTimer(),this.autopilot.stop(),this.applyHostDarkMode(!1),this.callbacks.onDestroy(),this.host.remove()}};function fo(){try{if(typeof document>"u"||!document.head||document.querySelector("link[data-easyquiz-preconnect]"))return;let o=document.createElement("link");o.rel="preconnect",o.href="https://generativelanguage.googleapis.com",o.crossOrigin="anonymous",o.setAttribute("data-easyquiz-preconnect","true"),document.head.appendChild(o);let e=document.createElement("link");e.rel="dns-prefetch",e.href="https://generativelanguage.googleapis.com",e.setAttribute("data-easyquiz-preconnect","true"),document.head.appendChild(e)}catch{}}async function bo(){let o=window;if(be(),fo(),o.__easyquiz){o.__easyquiz.toggle();return}let e=Oe(),t=null,a=null,i=0,n=new Be(e,{onAnalyze:(l=1,d)=>r(l,d),onApply:(l=1)=>void s(l),onDestroy:()=>{if(a){try{a.abort()}catch{}a=null}oe(),delete o.__easyquiz},onCancel:()=>{if(a){try{a.abort()}catch{}a=null}oe(),n.setProgress(0),n.setInterrupted("Opera\xE7\xE3o cancelada imediatamente pelo usu\xE1rio.")},onSettingsChange:l=>{e=dt(l)}});o.__easyquiz={toggle:()=>n.toggle(),destroy:()=>n.destroy(),analyze:async()=>{await r()}},window.addEventListener("keydown",l=>{if(l.altKey&&(l.key==="q"||l.key==="Q")){if(l.preventDefault(),!n)return;n.toggle(!0),r()}});async function r(l=1,d){if(!e.apiKey){n.setStatus("Configure sua chave de API Gemini acima para come\xE7ar.","error"),n.toggle(!0);return}if(a)try{a.abort()}catch{}a=new AbortController;let u=a,m=()=>{try{u.abort()}catch{}};if(d&&(d.aborted?u.abort():d.addEventListener("abort",m,{once:!0})),u.signal.aborted){n.setBusy(!1),n.setProgress(0);return}i=Date.now(),n.setBusy(!0,"Identificando o bloco da quest\xE3o ativa na p\xE1gina..."),n.setProgress(20,"Varrendo escopo do DOM e controles..."),oe(),n.hideFloatingAnswers();try{let c=Ee(!1);c||(n.setStatus("Nenhum controle detectado. Tentando captura de tela inteira...","info"),c=ce()),ot(c.scope),n.updateContext(c),n.logToConsole(`> [DOM] Escopo: <${c.scope.tagName.toLowerCase()}> com ${c.controls.length} controle(s) e ${c.questionText.length} caracteres.`,"text-blue"),n.setStatus(`Quest\xE3o localizada (${c.controls.length} controles). Preparando an\xE1lise...`,"info"),n.setProgress(40,`Consultando Gemini (${e.model})...`);let p=await st(c.scope,e.useVision);if(p.length>0){let y=p.map(x=>x.element).filter(Boolean);tt(y)}if(u.signal.aborted)return;n.setStatus(p.length>0?`Consultando Gemini (${e.model}) com ${p.length} imagem(ns) anexada(s)...`:`Consultando Gemini (${e.model}) via DOM nativo (modo r\xE1pido)...`,"info");let h=ve(c,p,e);n.setInspectorPrompt(h,e.model);let b=(y,x)=>{n.setStatus(y,x==="warning"?"info":x)},{plan:f,usedModel:g}=await _e(c,p,e,b,u.signal);if(u.signal.aborted)return;if(f.needsMoreContext){if(n.setProgress(55,"Ampliando escopo da quest\xE3o..."),n.setStatus("Enunciado ou contexto isolado detectado pela IA. Acionando Sele\xE7\xE3o Geral Expandida...","info"),n.logToConsole("> [DOM] Enunciado isolado. Ampliando escopo para sele\xE7\xE3o expandida...","text-blue"),c=Ee(!0),c||(c=ce()),ot(c.scope),n.updateContext(c),p=await st(c.scope,e.useVision),p.length>0){let w=p.map(T=>T.element).filter(Boolean);tt(w)}n.setStatus(`Reconsultando IA com escopo ampliado (${c.controls.length} controles)...`,"info");let y=ve(c,p,e);n.setInspectorPrompt(y,e.model),f=(await _e(c,p,e,b,u.signal)).plan}return u.signal.aborted||(n.setProgress(70,"Resposta recebida da IA! Processando plano..."),n.logToConsole(`> [IA] Modelo: ${g||e.model} | Modo: ${f.mode} | Confian\xE7a: ${(f.confidence*100).toFixed(0)}%`,"text-green"),f.rationale&&n.logToConsole(`> [IA] Racioc\xEDnio: "${f.rationale}"`,"text-blue"),n.logToConsole(`> [IA] ${f.actions.length} a\xE7\xE3o(\xF5es) prescritas no plano.`,"text-blue"),f.memoryToStore&&(ut(f.memoryToStore),n.logToConsole(`> [RAG] \u{1F9E0} Nova mem\xF3ria te\xF3rica salva na sess\xE3o: "${f.memoryToStore}"`,"text-yellow")),t=f,n.updateContext(c,f),It(f.actions,f.confidence),n.setPlan(f,!e.dryRun),f.pageType==="conclusion"?(n.setProgress(100,"Atividade conclu\xEDda!"),n.setStatus("Atividade conclu\xEDda ou tela final detectada pela IA.","success")):f.pageType==="info"?(n.setProgress(100,"Contexto absorvido na mem\xF3ria!"),n.setStatus("\u{1F4D8} Conte\xFAdo de contexto absorvido na mem\xF3ria RAG. Avan\xE7ando...","success")):f.pageType==="start"?(n.setProgress(100,"In\xEDcio detectado!"),n.setStatus("In\xEDcio de atividade detectado. Iniciando...","info")):(n.setProgress(80,"Plano de resolu\xE7\xE3o pronto!"),n.setStatus(e.dryRun?"Simula\xE7\xE3o conclu\xEDda. As respostas foram real\xE7adas na p\xE1gina sem altera\xE7\xE3o.":"Resolu\xE7\xE3o pronta! Verifique o realce na tela e aplique quando desejar.","success")),e.dryRun&&f.pageType==="question"&&n.showFloatingAnswers(f),u.signal.aborted)?void 0:(e.autoApply&&!e.dryRun&&await s(l,u.signal),f)}catch(c){if(u.signal.aborted||c instanceof Error&&(c.name==="AbortError"||c.message.includes("cancelada"))){oe(),n.setProgress(0),n.setInterrupted("Opera\xE7\xE3o cancelada pelo usu\xE1rio.");return}oe(),n.setProgress(0);let p=c instanceof Error?c.message:"Falha desconhecida na an\xE1lise.";n.setStatus(p,"error"),n.setErrorDiagnostic(p,"An\xE1lise da IA");return}finally{d?.removeEventListener("abort",m),a===u&&(a=null),u.signal.aborted||n.setBusy(!1)}}async function s(l=1,d){if(d?.aborted)return;if(!t){n.setStatus("Nenhum plano dispon\xEDvel para aplicar. Execute a an\xE1lise primeiro.","error");return}if(e.dryRun){n.setStatus("O modo de simula\xE7\xE3o est\xE1 ativo. Desmarque para poder aplicar.","error");return}let u=t.pageType==="info"||t.pageType==="start",m=(e.autoAdvance||u)&&t.confidence>=e.confidenceThreshold&&!t.needsMoreContext;n.setBusy(!0,"Aplicando respostas no formul\xE1rio..."),n.setProgress(85,`Aplicando ${t.actions.length} a\xE7\xE3o(\xF5es) no formul\xE1rio...`),n.logToConsole(`> [EXEC] Iniciando aplica\xE7\xE3o com 6 vias de persist\xEAncia para ${t.actions.length} a\xE7\xE3o(\xF5es)...`,"text-blue");try{let c=await Xe(t,m,l,we(e));if(d?.aborted)return;n.setExecutionReport(c);let p=i>0?Date.now()-i:1200,h=t.actions.filter(g=>g.t!=="adv"&&g.t!=="js").length;if(t.pageType==="question"||h>0?c.success||c.applied>0&&c.failed.length===0:c.success||c.advanced){n.setProgress(100,"Sucesso! Respostas preenchidas e validadas!"),n.logToConsole(`> [VERIF] \u2713 Sucesso no DOM: ${c.verified}/${c.applied} a\xE7\xF5es validadas com sucesso!`,"text-green"),c.advanced?n.logToConsole("> [NAV] \u2713 Bot\xE3o de confirma\xE7\xE3o/avan\xE7o acionado com sucesso!","text-green"):m&&n.logToConsole(`> [NAV] \u26A0\uFE0F ${c.navigationEvidence}`,"text-yellow"),n.setStatus(c.advanced?`Sucesso: ${c.applied} resposta(s) preenchida(s) e pr\xF3xima quest\xE3o confirmada.`:`Respostas preenchidas e validadas. Avan\xE7o n\xE3o confirmado: ${c.navigationEvidence}`,c.advanced||!m?"success":"info"),n.hideFloatingAnswers();let g=Ke({id:`q-${Date.now()}`,questionIndex:(ie().records.length||0)+1,questionTitle:t.rationale?t.rationale.slice(0,45)+"...":`Quest\xE3o ${t.mode||"Auto"}`,durationMs:p,status:"verified",mode:t.mode,actionsCount:c.applied});n.updateTimingMetrics(g)}else{n.setProgress(0,"Inje\xE7\xE3o direta restrita. Gabarito r\xE1pido exibido.");let g=c.failed.length>0?c.failed.join(", "):"alvos pendentes";n.logToConsole(`> [VERIF] Alerta: ${c.verified}/${c.applied} a\xE7\xF5es verificadas no DOM. Pend\xEAncias: ${g}.`,"text-yellow"),n.logToConsole("> [GABARITO] Inje\xE7\xE3o direta restrita pela p\xE1gina. Gabarito r\xE1pido exibido na tela; o Autopilot aguarda voc\xEA marcar e avan\xE7ar.","text-yellow"),n.setStatus("Inje\xE7\xE3o restrita pela p\xE1gina. Gabarito direto exibido na tela para voc\xEA avan\xE7ar.","info"),n.showFloatingAnswers(t);let y=Ke({id:`q-${Date.now()}`,questionIndex:(ie().records.length||0)+1,questionTitle:t.rationale?t.rationale.slice(0,45)+"...":`Quest\xE3o ${t.mode||"Auto"}`,durationMs:p,status:"manual",mode:t.mode,actionsCount:0});n.updateTimingMetrics(y)}}catch(c){n.setProgress(0);let p=c instanceof Error?c.message:"Falha ao aplicar plano.";n.setStatus("Inje\xE7\xE3o restrita pela p\xE1gina. Gabarito direto exibido na tela para voc\xEA avan\xE7ar.","info"),n.logToConsole(`> [ERRO] ${p}`,"text-red"),t&&n.showFloatingAnswers(t)}finally{n.setBusy(!1)}}n.toggle(!0)}bo().catch(o=>{console.error("[EasyQuiz] Erro fatal na inicializa\xE7\xE3o:",o),window.alert(`EasyQuiz: falha ao iniciar: ${o instanceof Error?o.message:String(o)}`)});})();
