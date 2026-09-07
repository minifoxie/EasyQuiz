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
"use strict";(()=>{var oe={apiKey:"",apiKeys:[],model:"gemini-3.5-flash-lite",uiMode:"easy",modeHint:"",engine:"smart",dryRun:!1,autoApply:!0,autoAdvance:!1,hostDarkMode:!0,useVision:!1,confidenceThreshold:.8};function D(o){if(!o||typeof o!="string")return!1;let e=o.toLowerCase().trim().replace(/^models\//,"");if(!e.includes("gemini"))return!1;let t=["imagen","image","veo","omni","video","embedding","embed","tts","audio","speech","voice","sound","live","transcribe","bidi","aqa","learnlm","deep-research","computer-use","robotics","rt-1","rt-2","mediapipe","cyber","latest","-ultra","experimental"];for(let n of t)if(e.includes(n))return!1;return!(!e.includes("flash")&&!e.includes("pro"))}var Ge="easyquiz_settings_v2",se="easyquiz_activity_metrics";function Fe(){try{let o=localStorage.getItem(Ge);if(!o){let l=localStorage.getItem("easyquiz_settings_v1");if(l){let s=JSON.parse(l);return{...oe,apiKey:s.apiKey||""}}return{...oe}}let e=JSON.parse(o),t=typeof e.model=="string"&&D(e.model)?e.model:oe.model,n=Array.isArray(e.apiKeys)?e.apiKeys.map(l=>typeof l=="string"?l.trim().replace(/^["']|["']$/g,""):"").filter(l=>l.length>5):[],i=typeof e.apiKey=="string"?e.apiKey.trim().replace(/^["']|["']$/g,""):"";return n.length===0&&i&&(n=[i]),{apiKey:n[0]||i||oe.apiKey,apiKeys:n,model:t,uiMode:e.uiMode==="easy"||e.uiMode==="advanced"?e.uiMode:oe.uiMode,modeHint:e.modeHint??"",engine:e.engine??"smart",dryRun:!!e.dryRun,autoApply:e.autoApply!==void 0?!!e.autoApply:!0,autoAdvance:!!e.autoAdvance,hostDarkMode:e.hostDarkMode!==void 0?!!e.hostDarkMode:!0,useVision:!!e.useVision,confidenceThreshold:typeof e.confidenceThreshold=="number"?e.confidenceThreshold:oe.confidenceThreshold}}catch{return{...oe}}}function xt(){try{localStorage.removeItem(Ge),localStorage.removeItem("easyquiz_settings_v1"),localStorage.removeItem(se),sessionStorage.removeItem(se);let o=[];for(let e=0;e<localStorage.length;e++){let t=localStorage.key(e);t&&(t.startsWith("eq_")||t.startsWith("easyquiz_"))&&o.push(t)}o.forEach(e=>localStorage.removeItem(e)),Qe()}catch(o){console.warn("[EasyQuiz] Erro ao resetar dados:",o)}}function ye(o){try{let e=localStorage.getItem("eq_domain_cache_"+o);if(!e)return{};let t=JSON.parse(e);if(t.advanceSelector&&/inject|injetar/i.test(t.advanceSelector)){t.advanceSelector=void 0;try{localStorage.removeItem("eq_domain_cache_"+o)}catch{}}return t}catch{return{}}}function Ue(o,e){if(e.advanceSelector&&/inject|injetar/i.test(e.advanceSelector))return;let n={...ye(o),...e};try{localStorage.setItem("eq_domain_cache_"+o,JSON.stringify(n))}catch(i){console.warn("[EasyQuiz] Erro cache de dominio:",i)}}function wt(o){let e=Fe(),t=Array.isArray(o.apiKeys)?o.apiKeys.map(a=>typeof a=="string"?a.trim().replace(/^["']|["']$/g,""):"").filter(a=>a.length>5):e.apiKeys,n;typeof o.apiKey=="string"?n=o.apiKey.trim().replace(/^["']|["']$/g,""):Array.isArray(o.apiKeys)&&o.apiKeys.length>0?n=t[0]||"":n=e.apiKey,n&&!t.includes(n)&&(t=[n,...t]),t.length>0&&(!n||!t.includes(n))&&(n=t[0]);let i={...e,...o,apiKey:n,apiKeys:t};try{localStorage.setItem(Ge,JSON.stringify(i))}catch(a){console.warn("[EasyQuiz] Falha ao persistir configura\xE7\xF5es no localStorage:",a)}return i}var ie=[],yt=12,Ut=1200;function qt(o){let e=o.trim().replace(/\s+/g," ").slice(0,Ut);e&&!ie.includes(e)&&(ie.push(e),ie.length>yt&&(ie=ie.slice(-yt)))}function ke(){return ie}function Qe(){ie=[]}function Et(){return{startTime:Date.now(),totalElapsedMs:0,completedQuestionsCount:0,averageDurationMs:0,records:[]}}var ve=Et();function xe(){try{localStorage.removeItem(se)}catch{}return ve}function Qt(o){ve=o;try{let e=JSON.stringify(o);sessionStorage.setItem(se,e),localStorage.removeItem(se)}catch{}}function Ct(o){let e=ve,t=Date.now(),n=e.records[e.records.length-1];if(n&&n.id===o.id&&t-n.timestamp<3e3)return e;let i={...o,timestamp:t},a=[...e.records,i],l=a.filter(d=>d.status==="answered"||d.status==="verified").length,s=a.reduce((d,h)=>d+h.durationMs,0),r=l>0?Math.round(s/l):0,c={startTime:e.startTime||t,totalElapsedMs:Math.max(t-(e.startTime||t),s),completedQuestionsCount:l,averageDurationMs:r,records:a};return Qt(c),c}function we(){ve=Et();try{sessionStorage.removeItem(se),localStorage.removeItem(se)}catch{}return ve}var Tt=`Voc\xEA \xE9 o motor operacional inteligente do EasyQuiz. Sa\xEDda EXCLUSIVA em JSON minificado, sem markdown ou conversa.

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
- Para quest\xF5es de multi-sele\xE7\xE3o (escolha_multipla) ou quando [RESPOSTAS] tiver [MULTI-SELE\xC7\xC3O]:
  - OBRIGAT\xD3RIO: emita uma a\xE7\xE3o chk (c: true) para CADA op\xE7\xE3o comprovadamente correta.
  - Pode e DEVE haver 2, 3 ou mais a\xE7\xF5es chk corretas na mesma quest\xE3o.
  - Deixar de marcar uma op\xE7\xE3o correta \xE9 t\xE3o errado quanto marcar uma incorreta.
  - N\xC3O limite-se a 1 resposta s\xF3 porque parece mais segura \u2014 marque TODAS as corretas identificadas.
  - NUNCA emita a\xE7\xF5es com c: false para op\xE7\xF5es erradas; emita estritamente as a\xE7\xF5es das op\xE7\xF5es que DEVEM ser marcadas.
- Para escolha \xFAnica (r\xE1dio, [ESCOLHA-\xDAnica]):
  - Emita EXATAMENTE 1 a\xE7\xE3o de resposta para a alternativa correta (somente 1).
  - NUNCA emita mais de 1 a\xE7\xE3o de marca\xE7\xE3o/clique na mesma quest\xE3o de escolha \xFAnica.
  - NUNCA emita a\xE7\xF5es com c: false para tentar desmarcar outras alternativas.
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
`;function Yt(o,e){return/khanacademy\.org/i.test(o)||e.includes("perseus")?"[PLATAFORMA: Khan Academy \u2014 widgets Perseus; use js via $eq para widgets interativos se necess\xE1rio]":/forms\.google|docs\.google.*forms/i.test(o)||e.includes("Qr7Oae")?"[PLATAFORMA: Google Forms \u2014 IDs via data-item-id, data-params]":/wayground|quizizz/i.test(o)||e.includes("data-functional-selector")?"[PLATAFORMA: Wayground/Quizizz \u2014 alternativas s\xE3o cards clic\xE1veis, use clk]":/moodle|ava\.|classroom\.google/i.test(o)?"[PLATAFORMA: Moodle/AVA/Classroom \u2014 formul\xE1rios padr\xE3o]":/duolingo/i.test(o)?"[PLATAFORMA: Duolingo \u2014 tiles clic\xE1veis, use clk por texto]":/blackboard|canvas\.instructure/i.test(o)?"[PLATAFORMA: Canvas/Blackboard \u2014 quiz-question padr\xE3o]":/socrative|kahoot/i.test(o)?"[PLATAFORMA: Socrative/Kahoot \u2014 alternativas s\xE3o bot\xF5es, use clk]":""}function qe(o,e,t){let n=o.htmlSnippet.includes("draggable")||o.htmlSnippet.includes("perseus")||o.htmlSnippet.includes("category")||o.htmlSnippet.includes("dropzone")||o.controls.some(p=>p.type==="draggable"||p.type==="dropzone"),i=/katex|latex|math|matrix|formula|frac|\$|\^|\_/i.test(o.htmlSnippet)||/calcular|calcule|resolva|matriz|equação|função|probabilidade|geometria|fórmula|coordenada|sistema/i.test(o.questionText),l=o.questionText.length<150||n||i?`
[HTML]:
${o.htmlSnippet.slice(0,1800).replace(/\s+/g," ")}`:"",s=ke(),r=s.length>0?`
[MEM\xD3RIA]:
${s.join(" | ")}
`:"",c=o.controls.filter(p=>p.role!=="navigation"),d=o.controls.filter(p=>p.role==="navigation"),h=Yt(o.sourceUrl,o.htmlSnippet),u=h?`
${h}
`:"";return`--- AN\xC1LISE ---
[MODO]: ${t.engine} | Dica: ${t.modeHint||"Auto"}
[URL]: ${o.sourceUrl}
[P\xC1GINA]: ${o.pageTitle}${r}${u}
[DADOS]
[TEXTO]:
${o.questionText}${l}

[RESPOSTAS]:
${(()=>{if(c.length===0)return"Nenhuma";let p=c.filter(m=>m.type==="checkbox"||m.type==="chk"),f=new Set(c.filter(m=>m.type==="radio").map(m=>m.name).filter(Boolean)),v=p.filter(m=>!m.name||!f.has(m.name)).length>=2,g=c.every(m=>m.type==="radio"||m.type==="chk")&&f.size>=1&&!v;return(v?`[MULTI-SELE\xC7\xC3O: marque TODOS os corretos, pode ser 2 ou mais]
`:g?`[ESCOLHA-\xDAnica: marque APENAS 1 op\xE7\xE3o]
`:"")+JSON.stringify(c.map(m=>({id:m.id,t:m.type,n:m.name||void 0,txt:m.label,v:m.value||void 0,opt:m.options.length?m.options:void 0})))})()}

[NAVEGA\xC7\xC3O]:
${d.length>0?d.map(p=>`"${p.label||p.id}"[${p.type}]`).join(","):"Nenhuma"}

[IMAGENS E GR\xC1FICOS ANEXADOS (${e.length})]:
${e.length>0?e.map((p,f)=>`  - Imagem ${f+1}: ${p.associatedLabel||"Gr\xE1fico da Quest\xE3o"}${p.alt?` (Texto alt: "${p.alt}")`:""}`).join(`
`):"Nenhum anexo visual."}
[/DADOS]
Sa\xEDda em JSON v\xE1lido.`}var Jt=new Set(["question","info","start","conclusion"]),Xt=new Set(["texto_livre","escolha_unica","escolha_multipla","verdadeiro_falso","preenchimento","acao_sem_resposta","categorizacao","ordenacao","arrastar_soltar"]),Wt=new Set(["val","chk","sel","clk","adv","js","drag"]),Zt=150,Ee=2e3;function Y(o,e=""){return o==null?e:typeof o=="string"?o.trim().slice(0,Ee):typeof o=="number"||typeof o=="boolean"?String(o).trim().slice(0,Ee):e}function eo(o,e){if(!o||typeof o!="object")return null;let t=o,n=t.t;if(typeof n!="string"||!Wt.has(n))return null;if(n==="adv"){let s=t.id??t.target??t.name??t.selector;return{t:"adv",...Y(s)?{id:Y(s,"").slice(0,500)}:{}}}if(n==="drag"){let s=Y(t.from??t.source),r=Y(t.to??t.target??t.destination);return!s||!r?null:{t:"drag",from:s.slice(0,500),to:r.slice(0,500)}}if(n==="js"){let s=Y(t.v??t.code??t.script);return!s||s.length>8e3?null:{t:"js",v:s}}let i=t.id??t.target??t.name??t.selector??t.element;(i==null||i==="")&&n==="val"&&(i="1");let a=Y(i).slice(0,500);if(!a)return null;if(n==="val"){let s=t.v!==void 0?t.v:t.value!==void 0?t.value:t.val!==void 0?t.val:t.text!==void 0?t.text:t.answer;return{t:"val",id:a,v:Y(s).slice(0,Ee)}}if(n==="sel"){let s=t.v!==void 0?t.v:t.value!==void 0?t.value:t.val!==void 0?t.val:t.values,c=(Array.isArray(s)?s:[s]).map(d=>Y(d).slice(0,500)).filter(Boolean);return{t:"sel",id:a,v:c}}if(n==="chk"){let s=t.c===!1||t.c==="false"||t.c===0||t.c==="0"||t.c==="off"||t.c==="unchecked"||t.c==="desmarcar",r={t:"chk",id:a,c:!s};return t.v!==void 0&&(r.v=Y(t.v).slice(0,Ee)),r}let l={t:"clk",id:a};if(t.c!==void 0){let s=t.c===!1||t.c==="false"||t.c===0||t.c==="0"||t.c==="off"||t.c==="unchecked"||t.c==="desmarcar";l.c=!s}return t.v!==void 0&&(l.v=Y(t.v).slice(0,Ee)),Array.isArray(t.co)&&t.co.length===2&&t.co.every(s=>typeof s=="number"&&Number.isFinite(s))&&(l.co=[t.co[0],t.co[1]]),l}function to(o,e,t){if(t!=="question")return o;let n=o.filter(a=>a.t==="adv"),i=o.filter(a=>a.t!=="adv");if(e==="escolha_unica"){i=i.filter(l=>!(l.t==="chk"&&l.c===!1||l.t==="clk"&&l.c===!1));let a=i.filter(l=>l.t==="chk"||l.t==="clk");if(a.length>1){let l=i.filter(r=>r.t!=="chk"&&r.t!=="clk"),s=a[a.length-1];i=[...l,s]}}else if(e==="escolha_multipla"){i=i.filter(l=>!(l.t==="chk"&&l.c===!1||l.t==="clk"&&l.c===!1));let a=new Set;i=i.filter(l=>{let s="id"in l&&typeof l.id=="string"?l.id:"";return s?a.has(s)?!1:(a.add(s),!0):!0})}else if(e==="verdadeiro_falso"){let a=new Set,l=[...i].reverse(),s=[];for(let r of l){let c="id"in r&&typeof r.id=="string"?r.id:"";c?a.has(c)||(a.add(c),s.push(r)):s.push(r)}i=s.reverse()}return[...i,...n]}function At(o){if(!o||typeof o!="object")return{pageType:"info",mode:"acao_sem_resposta",confidence:.5,rationale:"Resposta estruturada n\xE3o identificada; avan\xE7ando como informativo.",actions:[{t:"adv"}]};let e=o,t=e.pageType,n=e.mode;(typeof t!="string"||!Jt.has(t))&&(t="question"),(typeof n!="string"||!Xt.has(n))&&(n="escolha_unica");let i=Array.isArray(e.actions)?e.actions:[],a=[];for(let r=0;r<Math.min(i.length,Zt);r++){let c=eo(i[r],r);c&&a.push(c)}a=to(a,n,t);let l=a.some(r=>r.t==="adv");t==="conclusion"?a.length=0:t==="info"||t==="start"?l||a.push({t:"adv"}):t==="question"&&!l&&a.push({t:"adv"});let s=typeof e.confidence=="number"&&Number.isFinite(e.confidence)?Math.min(1,Math.max(0,e.confidence)):.85;return{pageType:t,mode:n,confidence:s,rationale:Y(e.rationale,"Plano validado e auto-recuperado."),actions:a,...Y(e.memoryToStore)?{memoryToStore:Y(e.memoryToStore)}:{},...e.needsMoreContext?{needsMoreContext:!!e.needsMoreContext}:{}}}var ee=class{keys=new Map;constructor(e=[]){this.init(e)}init(e){let t=new Map(this.keys);this.keys.clear(),Array.from(new Set(e.map(i=>i.trim().replace(/^["']|["']$/g,"")).filter(i=>i.length>5))).forEach((i,a)=>{let l=this.generateId(i),s=t.get(l)||t.get(i);this.keys.set(l,{id:l,key:i,label:s?.label||`Chave ${a+1}`,addedAt:s?.addedAt||Date.now(),lastUsedAt:s?.lastUsedAt,lastLatencyMs:s?.lastLatencyMs,cooldownUntil:s?.cooldownUntil,errorCount:s?.errorCount||0,lastError:s?.lastError,winCount:s?.winCount||0})})}generateId(e){let t=0;for(let n=0;n<e.length;n++)t=(t<<5)-t+e.charCodeAt(n),t|=0;return`key_${Math.abs(t).toString(36).slice(0,8)}`}static maskKey(e){let t=e.trim().replace(/^["']|["']$/g,"");return t.length<=10?"\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022":`${t.slice(0,6)}...${t.slice(-4)}`}getAllKeys(){let e=Date.now();return Array.from(this.keys.values()).map(t=>{let n=Math.max(0,(t.cooldownUntil||0)-e);return{...t,isCooldown:n>0,remainingCooldownMs:n}})}getHealthyKeys(){let e=Date.now();return Array.from(this.keys.values()).filter(t=>(t.cooldownUntil||0)<=e&&(t.errorCount||0)<5)}getBestKey(){let e=this.getHealthyKeys();if(e.length>0)return e.sort((n,i)=>{let a=n.lastLatencyMs??99999,l=i.lastLatencyMs??99999;return a-l}),e[0].key;let t=Array.from(this.keys.values());return t.length>0?(t.sort((n,i)=>(n.cooldownUntil||0)-(i.cooldownUntil||0)),t[0].key):""}getDiverseKeys(e){let t=this.getHealthyKeys();if(t.length===0){let i=this.getBestKey();return i?[i]:[]}t.sort((i,a)=>{let l=i.lastLatencyMs??99999,s=a.lastLatencyMs??99999;return l-s});let n=[];for(let i=0;i<e;i++){let a=t[i%t.length];n.push(a.key)}return n}markQuotaHit(e,t=5e3){let n=this.findKeyObj(e);n&&(n.cooldownUntil=Date.now()+t,n.errorCount=(n.errorCount||0)+1,n.lastError=`Cota tempor\xE1ria atingida (HTTP 429). Cooldown de ${t/1e3}s ativado.`)}markOverloaded(e,t=5e3){let n=this.findKeyObj(e);n&&(n.cooldownUntil=Date.now()+t,n.errorCount=(n.errorCount||0)+1,n.lastError=`Servidores sobrecarregados (HTTP 503). Cooldown de ${t/1e3}s ativado.`)}markSuccess(e,t){let n=this.findKeyObj(e);n&&(n.lastLatencyMs=t,n.lastUsedAt=Date.now(),n.errorCount=0,n.lastError=void 0,n.cooldownUntil=void 0)}markWinner(e){let t=this.findKeyObj(e);t&&(t.winCount=(t.winCount||0)+1)}markInvalid(e,t){let n=this.findKeyObj(e);n&&(n.errorCount=99,n.lastError=t)}addKey(e,t){let n=e.trim().replace(/^["']|["']$/g,"");if(!n)return{ok:!1,message:"Chave n\xE3o pode ser vazia."};if(n.length<15)return{ok:!1,message:"Chave de API inv\xE1lida ou muito curta."};let i=this.generateId(n);if(this.keys.has(i))return{ok:!1,message:"Esta chave de API j\xE1 est\xE1 cadastrada."};let a={id:i,key:n,label:t?.trim()||`Chave ${this.keys.size+1}`,addedAt:Date.now(),errorCount:0};return this.keys.set(i,a),{ok:!0,message:"Chave adicionada com sucesso!",keyItem:a}}updateKey(e,t,n){let i=this.keys.get(e);if(!i)return{ok:!1,message:"Chave n\xE3o encontrada."};let a=t.trim().replace(/^["']|["']$/g,"");return!a||a.length<15?{ok:!1,message:"Chave de API inv\xE1lida."}:(i.key=a,n!==void 0&&(i.label=n.trim()),i.errorCount=0,i.cooldownUntil=void 0,i.lastError=void 0,{ok:!0,message:"Chave atualizada com sucesso!"})}removeKey(e){if(this.keys.size<=1)return{ok:!1,message:"Voc\xEA precisa manter pelo menos 1 chave de API cadastrada."};let t=this.findKeyObj(e);return t?(this.keys.delete(t.id),{ok:!0,message:"Chave removida com sucesso."}):{ok:!1,message:"Chave n\xE3o encontrada."}}exportRawKeys(){return Array.from(this.keys.values()).map(e=>e.key)}size(){return this.keys.size}findKeyObj(e){if(this.keys.has(e))return this.keys.get(e);for(let t of this.keys.values())if(t.key===e)return t}},k=new ee;var de=[{id:"gemini-3.8-flash",name:"Gemini 3.8 Flash (Mais Inteligente 2026)",description:"Modelo flagship Flash lan\xE7ado em Set/2026. Ultra-r\xE1pido e altamente capaz.",stable:!0},{id:"gemini-3.7-flash",name:"Gemini 3.7 Flash (Agentic)",description:"Alta capacidade para racioc\xEDnio multimodal e workflows ag\xEAnticos.",stable:!0},{id:"gemini-3.6-flash",name:"Gemini 3.6 Flash (Est\xE1vel)",description:"Modelo est\xE1vel e confi\xE1vel com excelente velocidade.",stable:!0},{id:"gemini-3.5-flash",name:"Gemini 3.5 Flash (R\xE1pido)",description:"Modelo de alta performance para tarefas r\xE1pidas.",stable:!0},{id:"gemini-3.5-flash-lite",name:"Gemini 3.5 Flash-Lite (Econ\xF4mico)",description:"Modelo econ\xF4mico de alta velocidade para volume elevado.",stable:!0},{id:"gemini-2.5-flash",name:"Gemini 2.5 Flash (Legacy R\xE1pido)",description:"Modelo legacy com zero-thinking suportado. Ultra-baixa lat\xEAncia.",stable:!0},{id:"gemini-2.5-pro",name:"Gemini 2.5 Pro (Legacy Avan\xE7ado)",description:"Modelo legacy avan\xE7ado para quest\xF5es de alta complexidade.",stable:!0}],Ye=["gemini-3.5-flash-lite","gemini-3.5-flash","gemini-3.6-flash","gemini-3.8-flash"],oo={"gemini-2.5-flash":"gemini-3.6-flash","gemini-2.0-flash":"gemini-3.5-flash","gemini-2.0-flash-lite":"gemini-3.5-flash-lite","gemini-1.5-flash":"gemini-3.5-flash","gemini-1.5-pro":"gemini-3.6-flash"};function Je(o){return oo[o]??o}var Ce=null;function no(o){let e={temperature:0,maxOutputTokens:700,responseMimeType:"application/json",responseSchema:Lt,response_mime_type:"application/json",response_schema:Lt};return/lite/i.test(o)||(/gemini-3\.[567]-flash/i.test(o)?e.thinkingConfig={thinkingLevel:"none"}:/gemini-3\.[89]|gemini-3\.[1-9][0-9]/i.test(o)?e.thinkingConfig={thinkingLevel:"low"}:/gemini-2\.5-flash/i.test(o)&&(e.thinkingConfig={thinkingBudget:0})),e}var Lt={type:"OBJECT",properties:{pageType:{type:"STRING",enum:["question","info","start","conclusion"]},mode:{type:"STRING",enum:["texto_livre","escolha_unica","escolha_multipla","verdadeiro_falso","preenchimento","acao_sem_resposta","categorizacao","ordenacao","arrastar_soltar"]},confidence:{type:"NUMBER"},rationale:{type:"STRING"},memoryToStore:{type:"STRING"},actions:{type:"ARRAY",items:{type:"OBJECT",properties:{t:{type:"STRING",enum:["val","chk","sel","clk","adv","js","drag"]},id:{type:"STRING"},v:{},c:{type:"BOOLEAN"},co:{type:"ARRAY",items:{type:"NUMBER"}},from:{type:"STRING"},to:{type:"STRING"}},required:["t"]}}},required:["pageType","mode","confidence","rationale","actions"]};function St(o){let e=o.trim().replace(/^google\//,"").replace(/^models\//,"");return!e||!D(e)?"gemini-3.5-flash-lite":e}function kt(o,e){let t="";try{let n=JSON.parse(o);t=n.error?.message||n.message||""}catch{t=o.slice(0,160)}return/API_KEY_INVALID|API key not valid|key.*invalid|unregistered/i.test(t)?"Chave de API do Gemini inv\xE1lida ou n\xE3o autorizada no Google AI Studio.":/RESOURCE_EXHAUSTED|Quota exceeded/i.test(t)||e===429?"Limite tempor\xE1rio de cota do Gemini (HTTP 429) atingido. Aguardando recupera\xE7\xE3o...":e===404?`HTTP 404: ${t||"Modelo ou endpoint n\xE3o encontrado no Google AI Studio"}`:e===503||/overloaded/i.test(t)?`Servidores Google sobrecarregados (HTTP 503): ${t||"Aguardando"}`:t?`Erro Gemini (HTTP ${e}): ${t}`:`Falha na requisi\xE7\xE3o ao Gemini (HTTP ${e}).`}function ao(o){let e=o.trim(),t=e.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);if(t)try{return JSON.parse(t[1].trim())}catch{}try{return JSON.parse(e)}catch{}let n=e.match(/\{[\s\S]*\}/);if(n)try{return JSON.parse(n[0].trim())}catch{}throw new Error("Falha ao decodificar JSON da IA.")}var Ht=(()=>{try{let o=typeof localStorage<"u"?localStorage.getItem("easyquiz_cached_models"):null;if(!o)return null;let e=JSON.parse(o);if(Array.isArray(e)){let t=e.filter(n=>n&&typeof n.id=="string"&&D(n.id));return t.length>0?t:null}return null}catch{return null}})(),He=new Set;async function ze(o){let e=o.trim().replace(/^["']|["']$/g,"");if(!e)return de;let t=[`https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(e)}`,`https://generativelanguage.googleapis.com/v1/models?key=${encodeURIComponent(e)}`];for(let n of t)try{let i=await fetch(n,{headers:{"Content-Type":"application/json","x-goog-api-key":e}});if(!i.ok){let l=await i.text(),s=kt(l,i.status);if(s.includes("inv\xE1lida")||s.includes("n\xE3o autorizada"))throw new Error(s);continue}let a=await i.json();if(Array.isArray(a.models)&&a.models.length>0){let l=a.models.filter(s=>{let r=s.supportedGenerationMethods||[],c=(s.name||"").replace(/^models\//,""),d=r.includes("generateContent");return D(c)&&d}).map(s=>{let r=s.supportedGenerationMethods||[],c=s.name.replace(/^models\//,""),d=s.displayName||c;return{id:c,name:d.includes(c)?d:`${d} (${c})`,description:s.description||"",stable:!/-preview|-experimental|-latest/i.test(c),supportsVision:!/embedding|tts|transcribe|live|image|sound|voice/i.test(c),supportsStructuredOutput:r.includes("generateContent"),supportedGenerationMethods:r,discoveredAt:Date.now()}});if(l.length>0){l.sort((s,r)=>{let c=d=>d==="gemini-3.8-flash"?200:d==="gemini-3.7-flash"?190:d==="gemini-3.6-flash"?180:d==="gemini-3.5-flash"?170:d==="gemini-3.5-flash-lite"?160:d==="gemini-2.5-flash"?130:d.includes("flash")?80:d==="gemini-2.5-pro"?60:d.includes("pro")?50:10;return c(r.id)-c(s.id)}),Ht=l;try{typeof localStorage<"u"&&localStorage.setItem("easyquiz_cached_models",JSON.stringify(l))}catch{}return l}}}catch(i){if(i.message?.includes("Chave de API"))throw i}return de}async function $e(o){let e=o.trim().replace(/^["']|["']$/g,"");if(!e)return{ok:!1,message:"Insira sua chave de API."};try{let n=await ze(e);if(n.length>0&&n!==de){let i=n[0];return{ok:!0,message:`Chave v\xE1lida! ${n.length} modelos Gemini dispon\xEDveis em sua conta. Recomendado: ${i.name}`,models:n}}}catch(n){return{ok:!1,message:n instanceof Error?n.message:String(n)}}let t=["gemini-3.8-flash","gemini-3.6-flash","gemini-3.5-flash"];for(let n of t)for(let i of["v1beta","v1"]){let a=`https://generativelanguage.googleapis.com/${i}/models/${n}:generateContent?key=${encodeURIComponent(e)}`;try{if((await fetch(a,{method:"POST",headers:{"Content-Type":"application/json","x-goog-api-key":e},body:JSON.stringify({contents:[{role:"user",parts:[{text:"PING"}]}],generationConfig:{maxOutputTokens:5}})})).ok)return{ok:!0,message:`Chave validada com sucesso no ${n} (${i})!`,models:de}}catch{}}return{ok:!1,message:"Chave de API inv\xE1lida, sem cota ou sem permiss\xE3o para modelos Gemini."}}async function Xe(o,e){let t=e.map(c=>c.trim().replace(/^["']|["']$/g,"")).filter(c=>c.length>5);if(t.length===0)return{ok:!1,model:o,key:"",message:"Nenhuma chave dispon\xEDvel."};let n=Je(St(o)),i=JSON.stringify({contents:[{role:"user",parts:[{text:"PING"}]}],generationConfig:{maxOutputTokens:5}}),a={"Content-Type":"application/json"};async function l(c,d,h){let u=new AbortController,p=setTimeout(()=>u.abort(),h);try{let f=`https://generativelanguage.googleapis.com/v1beta/models/${d}:generateContent?key=${encodeURIComponent(c)}`,y=await fetch(f,{method:"POST",headers:{...a,"x-goog-api-key":c},body:i,signal:u.signal});if(clearTimeout(p),y.ok)return{ok:!0,model:d,key:c,message:`Modelo '${d}' validado com sucesso!`};let v=await y.text().catch(()=>"");throw new Error(`HTTP ${y.status}: ${v.slice(0,80)}`)}catch(f){throw clearTimeout(p),f}}if(t.length>=2){let c=t.slice(0,6);try{return await Promise.any(c.map(h=>l(h,n,8e3)))}catch{}}let s=t[0],r=[n,...Ye.filter(c=>c!==n)];for(let c of r)try{let d=await l(s,c,4e3);return c!==n&&(d.message=`Modelo preferido indispon\xEDvel. Validado via fallback '${c}'.`),d}catch{}return{ok:!1,model:n,key:s,message:"Nenhum modelo Gemini respondeu. Verifique sua chave e cota."}}async function io(o,e,t,n,i){let a=["v1beta","v1"],l=new Error(`Falha ao consultar modelo ${o}`),r={...no(o)};for(let c of a){if(i.aborted)throw new Error("Opera\xE7\xE3o cancelada pelo usu\xE1rio.");let d=`https://generativelanguage.googleapis.com/${c}/models/${o}:generateContent?key=${encodeURIComponent(e)}`,h=Date.now();try{let u=await fetch(d,{method:"POST",headers:{"Content-Type":"application/json","x-goog-api-key":e},body:JSON.stringify({...t,generationConfig:r}),signal:i,keepalive:n});if(!u.ok){let y=await u.text();if(u.status===400&&r.thinkingConfig&&/thinking/i.test(y)){delete r.thinkingConfig;let g=await fetch(d,{method:"POST",headers:{"Content-Type":"application/json","x-goog-api-key":e},body:JSON.stringify({...t,generationConfig:r}),signal:i,keepalive:n});if(g.ok){let b=await g.json(),m=b.candidates?.[0];if(m?.content?.parts?.[0]?.text)return k.markSuccess(e,Date.now()-h),{rawText:m.content.parts[0].text,data:b,usedModel:o,usedKey:e}}}let v=kt(y,u.status);if(u.status===404&&c==="v1beta")continue;throw u.status===429?k.markQuotaHit(e,5e3):u.status===503||/no capacity|overloaded|unavailable/i.test(y)?(k.markOverloaded(e,5e3),He.add(o)):u.status===403||/API_KEY_INVALID/i.test(y)?k.markInvalid(e,v):u.status===404&&He.add(o),new Error(`[${o}|${ee.maskKey(e)}] ${v}`)}let p=await u.json(),f=p.candidates?.[0];if(!f||!f.content?.parts?.[0]?.text)throw new Error(`[${o}|${ee.maskKey(e)}] A IA n\xE3o retornou uma resposta estruturada v\xE1lida.`);return k.markSuccess(e,Date.now()-h),{rawText:f.content.parts[0].text,data:p,usedModel:o,usedKey:e}}catch(u){if(i.aborted)throw u;l=u;let p=l.message||"";if(p.includes("404")||/no longer available/i.test(p)){He.add(o);break}}}throw l}var Ie=new Map;function Mt(o){let e=Ie.get(o);return e===void 0?!1:Date.now()>e?(Ie.delete(o),!1):!0}function so(o,e=6e4){Ie.set(o,Date.now()+e)}function It(){Ie.clear()}async function We(o,e,t,n,i){if(i?.aborted)throw new Error("Opera\xE7\xE3o cancelada pelo usu\xE1rio.");let a=Array.isArray(t.apiKeys)&&t.apiKeys.length>0?t.apiKeys:t.apiKey?[t.apiKey]:[];k.init(a);let l=t.apiKey.trim().replace(/^[\"']|[\"']$/g,""),s=k.getBestKey()||l;if(!s)throw new Error("Nenhuma chave de API do Gemini configurada ou dispon\xEDvel.");let r=St(t.model);if(!Ht&&s&&ze(s).catch(()=>{}),i?.aborted)throw new Error("Opera\xE7\xE3o cancelada pelo usu\xE1rio.");let c=Date.now(),d=qe(o,e,t),h=[{text:d}];for(let S=0;S<e.length;S++){let I=e[S],$=I.associatedLabel||(I.alt?`Imagem: ${I.alt}`:`Imagem ${S+1}`);h.push({text:`[ANEXO VISUAL ${S+1} - V\xCDNCULO: ${$}]:`}),h.push({inline_data:{mime_type:I.mediaType,data:I.base64}})}let u={system_instruction:{parts:[{text:Tt}]},contents:[{role:"user",parts:h}]},p=!0;He.clear();let f=Je(r),y=Ce?Je(Ce):null,v=[];y&&D(y)&&y!==f&&v.push(y);for(let S of Ye)S!==f&&!v.includes(S)&&v.push(S);let g=[];D(f)&&g.push(f);for(let S of v)D(S)&&!g.includes(S)&&g.push(S);g.length<2&&g.push(...Ye.filter(S=>!g.includes(S)));let b=k.getHealthyKeys().filter(S=>!Mt(S.key)).sort((S,I)=>(S.lastLatencyMs??99999)-(I.lastLatencyMs??99999)),m=k.getAllKeys().filter(S=>!Mt(S.key)),x=b.length>0?b:m.map(S=>({key:S.key,lastLatencyMs:S.lastLatencyMs,label:S.label})),T=new Set;function A(S,I,$,F){let U=[];for(let Q of I){for(let X of S){let Z=`${X.key}::${Q}`;!T.has(Z)&&U.length<$&&(U.push({model:Q,key:X.key,label:X.label||"Chave",timeout:F}),T.add(Z))}if(U.length>=$)break}return U}let q=async(S,I)=>{if(I.length===0||i?.aborted)return null;let $=I.map(()=>new AbortController),F=()=>$.forEach(Q=>{try{Q.abort()}catch{}});i?.addEventListener("abort",F,{once:!0});let U=I.map(Q=>`${Q.model.replace("gemini-","")}/${Q.label}`).join(" | ");n?.(`\u26A1 ${S}: ${I.length} slot(s) [${U}]...`,"info");try{let Q=I.map(async(Z,ft)=>{let je=$[ft],bt=setTimeout(()=>{try{je.abort(new Error(`Timeout ${Z.timeout/1e3}s (${Z.model}|${Z.label})`))}catch{je.abort()}},Z.timeout);try{let j=await io(Z.model,Z.key,u,p,je.signal);clearTimeout(bt);let W=At(ao(j.rawText));return W.usedModel=j.usedModel,W.durationMs=Date.now()-c,W.promptSent=d,W.tokensUsed=j.data.usageMetadata?.totalTokenCount,W.promptTokens=j.data.usageMetadata?.promptTokenCount,W.candidatesTokens=j.data.usageMetadata?.candidatesTokenCount,W.rawResponse=j.rawText,$.forEach((vt,Ft)=>{if(Ft!==ft)try{vt.abort(new Error("Cancelado: vencedor respondeu."))}catch{vt.abort()}}),{plan:W,rawUsage:j.data.usageMetadata,usedModel:j.usedModel,usedKey:j.usedKey,slotLabel:Z.label}}catch(j){clearTimeout(bt);let W=j instanceof Error?j.message:String(j);throw(W.includes("429")||W.includes("Quota")||W.includes("RESOURCE_EXHAUSTED"))&&so(Z.key,6e4),j}}),X=await Promise.any(Q);return i?.removeEventListener("abort",F),k.markWinner(X.usedKey),X.usedModel!==f&&(Ce=X.usedModel),X}catch{return i?.removeEventListener("abort",F),null}},E=x.length,H=Math.min(Math.max(E,2)+(E>=2&&E<6?1:0),6),R=/pro/i.test(f),V=(S,I)=>{let $=I?/pro/i.test(I):R,F=I?/lite/i.test(I):/lite/i.test(f);return S===0?$?12e3:F?3800:4500:S===1?$?15e3:F?5e3:6500:$?18e3:8e3},B=6,_=0,ce="";for(;_<B;){if(i?.aborted)throw new Error("Opera\xE7\xE3o cancelada pelo usu\xE1rio.");let S=g.find(Q=>!Array.from(T).some(X=>X.startsWith(`${x[0]?.key}::${Q}`)))??g[0],I=V(_,S),$=A(x,g,H,I);if($.length===0)break;let F=_===0?"Onda 1":`Onda ${_+1}`,U=await q(F,$);if(U){let Q=U.plan.durationMs||Date.now()-c,X=ee.maskKey(U.usedKey);return n?.(`\u2705 ${Q}ms via '${U.usedModel}' (${U.slotLabel}: ${X})`,"info"),U}_++}throw new Error(ce||"Todas as ondas falharam. Verifique sua cota e conex\xE3o com a internet.")}var ro=[/\bfetch\b/i,/\bXMLHttpRequest\b/i,/\bWebSocket\b/i,/\b(?:localStorage|sessionStorage|indexedDB)\b/i,/\b(?:eval|Function|AsyncFunction|GeneratorFunction)\b/i,/\bimport(?:Scripts)?\b/i,/\bnavigator\s*\.\s*credentials\b/i,/\b(?:cookie|location\s*=|history\s*\.)/i,/\bwindow\s*\[\s*['"](?:fetch|eval|Function|localStorage|sessionStorage)/i];function Te(o){let e=o?.engine||"smart",t=new Set(["dom","framework","keyboard","drag"]);return o?.autoAdvance&&t.add("navigation"),e==="javascript"&&t.add("javascript"),{engine:e,capabilities:t,maxAttemptsPerAction:e==="command"?1:2,maxActionMs:e==="command"?1500:3e3,allowJavaScript:e==="javascript",allowNavigation:!!o?.autoAdvance}}function Ze(o,e){if(o.t==="js"&&!e.allowJavaScript)throw new Error("A\xE7\xE3o JavaScript bloqueada pela engine atual. Use o motor JavaScript explicitamente.");if(o.t==="adv"&&!e.allowNavigation)throw new Error("Avan\xE7o autom\xE1tico bloqueado pela pol\xEDtica atual.")}function zt(o){if(!o.trim())throw new Error("JavaScript recusado: c\xF3digo vazio.");if(o.length>8e3)throw new Error("JavaScript recusado: c\xF3digo acima do limite operacional.");if(ro.find(t=>t.test(o)))throw new Error("JavaScript recusado: acesso externo, persist\xEAncia ou avalia\xE7\xE3o din\xE2mica n\xE3o permitidos.");if(!/^\s*(?:\/\/[^\n]*\n|\/\*[\s\S]*?\*\/|[\s\S])*\$eq\./.test(o)&&!o.includes("$eq."))throw new Error("JavaScript recusado: use somente a API declarativa $eq.")}var ue=['input:not([type="hidden"])',"textarea","select","button","a","label",'[role="button"]','[role="link"]','[role="radio"]','[role="checkbox"]','[role="option"]','[role="treeitem"]','[role="menuitemcheckbox"]','[role="menuitemradio"]','[contenteditable="true"]','[draggable="true"]',"[aria-grabbed]","[aria-dropeffect]","[data-widget-type]",".perseus-drag-item",".sortable-item",'[data-testid*="drag" i]','[data-testid*="card" i]','[data-testid*="option" i]','[data-testid*="choice" i]','[data-testid*="category" i]',"[data-choice]","[data-option]","[data-answer]","[data-value]",".quiz-option",".option-card",".choice-card",'[class*="option-card" i]','[class*="choice-card" i]','[class*="option-item" i]','[class*="choice-item" i]','[class*="answer-item" i]','[class*="alternative" i]','li[class*="choice" i]','li[class*="option" i]','li[class*="answer" i]','[data-role="dropzone"]',"[data-category]"].join(","),Pe=/(verificar|checar|check|conferir|validar|próxim[oa]|next|continuar|continue|avançar|prosseguir|enviar|submit|concluir|finalizar|terminar|começar|iniciar|start|vamos lá|próxima tarefa|next task|próxima pergunta|next question|marcar como concluíd[oa]|mostrar resumo|entendi|compreendi|ok|leitura concluída|seguir|ir para o exercício|fazer o teste|próximo artigo|ir para a aula)/i,lo=0;function et(o){try{let e=o.closest('[hidden], [style*="display: none"], [style*="display:none"], [aria-hidden="true"]');if(e&&!pe(e))return!1}catch{}try{let e=window.getComputedStyle?window.getComputedStyle(o):o.style;if(e&&(e.display==="none"||e.visibility==="hidden"))return!1}catch{}try{if(typeof o.getBoundingClientRect=="function"){let e=o.getBoundingClientRect();if(e.width>0||e.height>0)return!0}}catch{}return(o.textContent||"").trim().length>0}function N(o){try{if(typeof CSS<"u"&&typeof CSS.escape=="function")return CSS.escape(o)}catch{}return String(o).replace(/["\\]/g,"\\$&")}function M(o){let e=o;if(!e||typeof e.isConnected=="boolean"&&!e.isConnected||pe(e))return!1;let t=e.tagName?.toLowerCase();if(["input","select","textarea","button"].includes(t)){let n=e.type?.toLowerCase();if(n==="checkbox"||n==="radio"){if(e.id)try{let a=e.ownerDocument?.querySelector(`label[for="${N(e.id)}"]`);if(a&&et(a))return!0}catch{}let i=e.closest('label, .option-card, .quiz-option, .choice, .answer, [role="radio"], [role="checkbox"], [class*="option" i], [class*="choice" i], [class*="item" i], li, tr');if(i&&i!==e&&et(i))return!0}try{if(!e.closest('[hidden], [style*="display: none"], [style*="display:none"], [aria-hidden="true"]')){let a=window.getComputedStyle?window.getComputedStyle(e):e.style;if(!a||a.display!=="none"&&a.visibility!=="hidden"){if(typeof e.getBoundingClientRect=="function"){let l=e.getBoundingClientRect();if(l.width>0||l.height>0)return!0}return!0}}}catch{}}return et(e)}function co(o){if(o==null)return"";if(typeof o=="string")return o;if(typeof o=="number"||typeof o=="boolean")return String(o);if(o instanceof Node)return o.textContent||"";try{if(typeof o?.toString=="function"){let e=o.toString();if(typeof e=="string")return e}}catch{}return""}function z(o,e=500){return co(o).replace(/\s+/g," ").trim().slice(0,e)}function uo(o){let e=o.dataset.easyquizId;if(e)return e;let t=`eq-${Date.now().toString(36)}-${(lo+=1).toString(36)}`;return o.dataset.easyquizId=t,t}function pe(o){return o?!!(o.closest('#easyquiz-shadow-root, .eq-sidebar, .eq-launcher, [data-easyquiz-ignore="true"], .btn-inject-eq, #btn-inject-script')||o.getAttribute?.("data-easyquiz-ignore")==="true"):!1}var Ae=/(leaderboard|scoreboard|placar|ranking|trophy|pause|pausar|mute|mutar|audio|sound|som|música|music|configuraç|settings|theme|ajuda|help|report|denunciar|feedback|power-?up|streak|coins|fullscreen|full-screen|(?:audio|sound|som|media)[-_ ]*volume|volume[-_ ]*(?:slider|control|level|btn|button|icon|mute)|vol-slider)/i;function O(o){if(!o||typeof o.getAttribute!="function"||typeof Element<"u"&&!(o instanceof Element))return!1;if(pe(o))return!0;let e=o.tagName?.toLowerCase();if(["select","textarea"].includes(e)||e==="input"&&!["button","submit","reset"].includes((o.type||"").toLowerCase()))return!1;let n=o.closest?.('button, a, [role="button"], [class*="leaderboard" i], [data-testid*="leaderboard" i], [class*="scoreboard" i], [class*="trophy" i]')||o,i=String(n.getAttribute?.("data-testid")||n.getAttribute?.("data-test-id")||n.getAttribute?.("id")||""),a=String(n.getAttribute?.("aria-label")||""),l=String(n.getAttribute?.("title")||""),s=typeof n.className=="string"?n.className:typeof n.className?.baseVal=="string"?n.className.baseVal:"",r=z(n.textContent,60);return!!(Ae.test(i)||Ae.test(a)||Ae.test(l)||Ae.test(s)||r.length>0&&r.length<=25&&Ae.test(r))}function te(o){if(!o||typeof o.getAttribute!="function"||typeof Element<"u"&&!(o instanceof Element)||pe(o)||O(o)||o.closest?.('.option-card, .choice-card, .quiz-option, [class*="option-card" i], [class*="choice-card" i], [class*="option-item" i], [class*="choice-item" i], [class*="answer-item" i], [data-testid*="option" i], [data-testid*="choice" i], [data-choice], [data-option], [data-answer], [role="radio"], [role="checkbox"], [role="option"]')||o.closest?.("header, nav, aside"))return!1;let e=typeof HTMLInputElement<"u"&&o instanceof HTMLInputElement||typeof HTMLButtonElement<"u"&&o instanceof HTMLButtonElement?o.value:"",t=z(o.getAttribute?.("aria-label")||o.textContent||o.getAttribute?.("value")||e),n=o.type,i=t.replace(/[\d\(\)\[\]→\>\•\-\/\\]+/g," ").trim(),a=String(o.getAttribute?.("data-testid")||o.getAttribute?.("data-test-id")||o.getAttribute?.("id")||o.getAttribute?.("href")||"").toLowerCase();return Pe.test(i)||Pe.test(t)||n==="submit"||a.includes("next")||a.includes("check")||a.includes("continue")||a.includes("proximo")||a.includes("forward")||!1}function tt(o){let e=o.closest("tr");if(e){let r=e.querySelector("th, td:first-child"),c=r&&r!==o.closest("td")?z(r.textContent,100):"",d=z(o.closest("label, td")?.textContent||"",50);if(c&&d)return`${c}: ${d}`}let t=o.closest('.dropdown-row, [class*="dropdown-row" i], [class*="select-row" i]');if(t){let r=t.querySelector('.dropdown-label, [class*="label" i]'),c=r&&r!==o?z(r.textContent,150):"";if(c)return c}let n=o.getAttribute("aria-label");if(n)return z(n);let i=o.getAttribute("aria-labelledby");if(i){let r=i.split(/\s+/).map(c=>document.getElementById(c)?.textContent).filter(Boolean).join(" ");if(r.trim())return z(r)}if("labels"in o&&o.labels){let r=Array.from(o.labels??[]).map(c=>c.textContent).join(" ");if(r.trim())return z(r)}let a=o.closest('.docssharedWizToggleLabeledContainer, [role="listitem"], .answer, label, .quiz-option, .form-check, .option-card');if(a&&a!==o){let r=z(a.textContent);if(r)return r}let l=o instanceof HTMLInputElement||o instanceof HTMLButtonElement?o.value:"",s=o.getAttribute("placeholder")||o.getAttribute("title")||o.textContent||l||"";return z(s)}function ot(o,e){let n=typeof HTMLSelectElement<"u"&&o instanceof HTMLSelectElement||o.tagName.toLowerCase()==="select"?o:null,i=o;o.dataset.easyquizRole=e;let a=o.tagName.toLowerCase(),l=["input","textarea","select","button"].includes(a)?a:"other",s=o.getAttribute("role")||"",r=(o.getAttribute("data-testid")||o.getAttribute("data-test-id")||"").toLowerCase(),c=(o.className&&typeof o.className=="string"?o.className:"").toLowerCase(),d=o.getAttribute("draggable")==="true"||o.classList.contains("perseus-drag-item")||o.classList.contains("sortable-item")||!!o.getAttribute("aria-grabbed")||/drag|card|option|item/i.test(r)||/drag|card-item|sortable/i.test(c),h=o.getAttribute("data-role")==="dropzone"||o.classList.contains("category-container")||o.hasAttribute("data-category")||!!o.getAttribute("aria-dropeffect")||/drop|category|bucket/i.test(r)||/dropzone|category-box|bucket|target-zone/i.test(c),p=z((d?"draggable":h?"dropzone":"")||i.type||s||l,40),f="";if(i.type==="checkbox"||i.type==="radio"||s==="radio"||s==="checkbox")f=i.checked||o.getAttribute("aria-checked")==="true"?"checked":"unchecked";else if(l==="button"||a==="a"||e==="navigation"||te(o))f="";else{let x=typeof o.value=="string"||typeof o.value=="number"?o.value:"";f=z(x||o.getAttribute("data-category")||"",2e3)}let y=[];if(n&&n.options)for(let x of Array.from(n.options).slice(0,80))y.push({value:z(x.value),label:z(x.textContent)});else if(s==="combobox"||s==="listbox"||c.includes("select")||c.includes("dropdown")){let x=o.getAttribute("aria-controls")||o.getAttribute("aria-owns"),T=x?document.getElementById(x):o;if(T){let A=T.querySelectorAll('[role="option"], li, .dropdown-item, .option');for(let q of Array.from(A).slice(0,80)){let E=z(q.textContent);E&&y.push({value:q.getAttribute("data-value")||q.getAttribute("value")||E,label:E})}}}let v=!!(i.required||o.getAttribute("aria-required")==="true"),g=!!(i.disabled||o.getAttribute("aria-disabled")==="true"),b=uo(o);return{id:o.id||b,tag:l,type:p,label:tt(o),name:z(i.name||o.getAttribute("name")||"",180),value:f,options:y,required:v,disabled:g,role:e}}var $t=['[data-test-id*="exercise" i]','[data-testid*="exercise" i]',".perseus-renderer",".framework-perseus",".Qr7Oae",".que",".question-holder",".quiz-question",".question_holder",".display_question",'[data-functional-selector*="question"]',".question-container","[data-question-id]",'[data-testid*="question" i]','[class*="question-container" i]','[class*="question" i]','[class*="pergunta" i]',"article","form","section","main"].join(",");function Pt(o){if(!M(o))return-1/0;let e=o.getBoundingClientRect(),t=Array.from(o.querySelectorAll(ue)).filter(M),n=z(o.innerText||o.textContent||"",4e3).length;if(n<10||!t.length&&n<60)return-1/0;let i=Math.max(1,window.innerWidth*window.innerHeight),a=Math.max(1,e.width*e.height),l=Math.min(1,a/i),s=e.top+e.height/2,r=Math.abs(s-window.innerHeight/2)/Math.max(1,window.innerHeight),c=n>40?35:0,d=e.top>=0&&e.bottom<=window.innerHeight?25:0;return t.length*15+Math.min(60,n/20)+c+d-l*20-r*10}function Re(o){let e=o;if(e.matches?.('article, [data-test-id*="exercise" i], [data-testid*="exercise" i], .perseus-renderer, .framework-perseus, [class*="question-container" i], .que')&&e.tagName.toLowerCase()!=="main"&&e.tagName.toLowerCase()!=="body")return e;for(;e.parentElement&&e.parentElement!==document.body&&e.parentElement!==document.documentElement;){let t=e.parentElement,n=t.tagName.toLowerCase();if(["header","footer","nav","aside"].includes(n))break;if(t.matches?.('article, [data-test-id*="exercise" i], [data-testid*="exercise" i], .perseus-renderer, .framework-perseus, [class*="question-container" i], .que')&&n!=="main"&&n!=="body"){e=t;break}let i=z(e.innerText||e.textContent||"",1e4),a=z(t.innerText||t.textContent||"",1e4),l=e.querySelectorAll(ue).length,s=t.querySelectorAll(ue).length;if(i.length<150&&a.length>i.length&&s<=l+4&&n!=="main"&&n!=="body"){e=t;continue}break}return e}function Rt(o){let e=o,t=e.closest('main, [role="main"], article, form, [data-test-id*="exercise" i], [data-testid*="exercise" i], .framework-perseus, section');if(t&&t!==document.body&&M(t))return t;let n=0;for(;e.parentElement&&e.parentElement!==document.body&&n<3;)e=e.parentElement,n++;return e||document.body}function K(){let o=document.activeElement;if(o&&o!==document.body){let a=o.closest($t);if(a&&Pt(a)>0)return Re(a)}let t=Array.from(document.querySelectorAll($t)).map(a=>({element:a,score:Pt(a)})).filter(a=>Number.isFinite(a.score)).sort((a,l)=>l.score-a.score),n=t.find(a=>{let l=a.element.tagName.toLowerCase();return l!=="main"&&l!=="body"&&a.score>0});if(n)return Re(n.element);if(t.length>0&&t[0].score>0)return Re(t[0].element);let i=document.querySelector('form, main, [role="main"]');return i&&M(i)?i:document.body}function Bt(o){let e=o.cloneNode(!0);e.querySelectorAll("script, style, iframe, object, embed, svg, canvas, noscript, audio, video").forEach(n=>n.remove());let t=["type","name","value","role","aria-label","aria-labelledby","aria-checked","aria-required","required","disabled","data-easyquiz-id","draggable","class","id","data-widget-type","data-role","data-category","data-testid"];return e.querySelectorAll("*").forEach(n=>{for(let i of Array.from(n.attributes))t.includes(i.name)||n.removeAttribute(i.name)}),e.outerHTML.replace(/\s+/g," ").slice(0,2e4)}function Be(o){let e=Array.from(o.querySelectorAll(ue)),t=new Set,n=[];for(let i of e){if(!M(i)||te(i)||O(i))continue;let a=i.tagName.toLowerCase();["input","textarea","select"].includes(a)&&(t.add(i),n.push(i))}for(let i of e){if(!M(i)||te(i)||O(i))continue;let a=i.tagName.toLowerCase();if(["input","textarea","select"].includes(a))continue;let l=i.querySelector("input, textarea, select");if(!(l&&t.has(l))){if(i.hasAttribute("for")){let s=i.getAttribute("for"),r=s?i.ownerDocument.getElementById(s):null;if(r&&t.has(r))continue}if(a==="a"){let s=i.getAttribute("role");if(!(s==="button"||s==="radio"||s==="checkbox"||s==="option"||i.closest('[class*="choice" i], [class*="option" i], [class*="answer" i], [data-testid*="option" i]')))continue}n.push(i)}}return n.slice(0,100).map(i=>ot(i,"answer"))}function nt(o){let e=[o,o.parentElement,o.parentElement?.parentElement,document.body].filter(Boolean),t=new Set,n=[];for(let i of e)for(let a of Array.from(i.querySelectorAll(ue)))if(!(t.has(a)||!M(a)||!te(a)||O(a))&&(t.add(a),n.push(ot(a,"navigation")),n.length>=10))return n;return n}function Le(o=!1){let e=K();e=Re(e),o&&(e=Rt(e));let t=Be(e),n=nt(e);if(t.length===0){let s=Be(document.body);s.length>0&&(e=Rt(e),t=Be(e),t.length===0&&(t=s,e=document.querySelector('main, article, form, [role="main"]')||document.body))}n.length===0&&(n=nt(document.body));let i=e.innerText&&e.innerText.trim().length>0?e.innerText:e.textContent||"",a=z(i,16e3),l=[...t,...n].slice(0,120);return!a||l.length===0&&a.length<30?z(document.body.innerText||document.body.textContent||"",16e3).length>=30?he():null:{sourceUrl:window.location.href.slice(0,2e3),pageTitle:document.title.slice(0,500)||"P\xE1gina de Quest\xE3o",questionText:a,htmlSnippet:Bt(e),controls:l,scope:e}}function he(){let o=document.body.innerText||document.body.textContent||document.documentElement.textContent||"",e=z(o,16e3),t=Be(document.body),n=nt(document.body),i=[...t,...n].slice(0,120),a=document.querySelector('main, article, form, [role="main"], [data-test-id*="content" i], [class*="content" i]')||document.body;return{sourceUrl:window.location.href.slice(0,2e3),pageTitle:document.title.slice(0,500)||"P\xE1gina de Quest\xE3o",questionText:e,htmlSnippet:Bt(a).slice(0,15e3),controls:i,scope:a}}function Nt(o){let e=o.controls.map(t=>`${t.role}:${t.id}:${t.type}`).join("|");return[window.location.href,o.pageTitle,o.questionText.slice(0,400),e].join("::")}function P(o){return o?!!(o.closest('#easyquiz-shadow-root, .eq-sidebar, .eq-launcher, [data-easyquiz-ignore="true"], .btn-inject-eq, #btn-inject-script')||o.getAttribute?.("data-easyquiz-ignore")==="true"):!1}function w(o){return o==null?"":(typeof o=="string"?o:String(o)).replace(/^(\([0-9a-zA-Z]{1,2}\)|[0-9]{1,3}|[a-zA-Z])[\.\)\-\:]\s+/,"").replace(/[\.\u2026]{2,}/g," ").replace(/['"“”«»]/g,"").replace(/\s+/g," ").trim()}function G(o){if(!o||o instanceof HTMLInputElement||o instanceof HTMLSelectElement||o instanceof HTMLTextAreaElement||o.getAttribute("draggable")==="true"||o.classList.contains("dnd-card")||o.hasAttribute("data-category")||o.hasAttribute("data-dropzone"))return o;if(o.hasAttribute("for")){let n=o.getAttribute("for");if(n){let i=o.ownerDocument.getElementById(n);if(i)return i}}let e=o.closest('label, .option-card, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, tr, li, .dnd-card, [class*="option-card" i], [class*="choice-card" i], .dropdown-row, [class*="dropdown" i], [class*="select-row" i]');if(e&&!["article","section","main","form","body"].includes(e.tagName.toLowerCase())){let n=e.getAttribute("for"),a=(n?e.ownerDocument.getElementById(n):null)||e.querySelector('input:not([type="hidden"]), select, textarea');return a||e}let t=o.closest('button, a, [role="button"], [draggable="true"]');if(t)return t;if(["body","html","main","section","article","form"].includes(o.tagName.toLowerCase())){let n=o.querySelector('button, [role="button"], a, input:not([type="hidden"]), select, textarea, [role="radio"], [role="checkbox"], .option-card, label');if(n)return G(n)}return o}function Ot(o){let e=o;if(!e||!document.contains(e))try{e=K()}catch{}e=e||document.body;let t=i=>{let a=Array.from(i.querySelectorAll("tr")).filter(r=>M(r)&&r.querySelector('input[type="radio"], input[type="checkbox"]'));if(a.length>1)return a;let l=Array.from(i.querySelectorAll('input[type="checkbox"], input[type="radio"], [role="checkbox"], [role="radio"]')).filter(r=>M(r)&&!P(r));return l.length>0?l:Array.from(i.querySelectorAll('.option-card, [role="option"], [class*="choice-card" i], [class*="option-card" i], li[class*="choice" i], li[class*="option" i]')).filter(r=>M(r)&&!P(r)).filter(r=>!r.parentElement?.closest('.option-card, [role="option"], [class*="choice-card" i], [class*="option-card" i]'))},n=t(e);return n.length>0?n:e!==document.body?t(document.body):[]}function L(o,e,t=!1){if(o==null)return null;let i=(typeof o=="string"?o:String(o)).trim().replace(/^["'“”«»]+|["'“”«»]+$/g,"");if(!i)return null;let a=N(i),l=document.querySelector(`[data-easyquiz-id="${a}"]`);if(l&&!P(l))return G(l);try{let u=document.getElementById(i);if(u&&!P(u))return u.hasAttribute("data-category")||u.hasAttribute("data-dropzone")||u.classList.contains("dnd-zone")?u:G(u)}catch{}let s=i.match(/^(?:item|opção|opcao|afirmação|afirmacao|alternativa|linha|afirmativa|questão|questao|campo|blank|lacuna|input|resposta)?\s*#?_?([0-9]+)$/i);if(s){let u=parseInt(s[1],10);if(t){let f=document.body;try{f=K()||document.body}catch{}let y=Array.from(f.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, select, [contenteditable="true"]')).filter(v=>M(v)&&!P(v));if(u>=1&&u-1<y.length)return y[u-1];if(u===0&&y.length>0)return y[0]}let p=u-1;if(p>=0){let f=Ot();if(p<f.length){let g=f[p];if(g.tagName.toLowerCase()==="tr"){if(e){let m=g.querySelector(`input[value="${N(e)}" i], [data-value="${N(e)}" i]`);if(m)return m}let b=g.querySelector("input");if(b)return b}return G(g)}let y=document.body;try{y=K()||document.body}catch{}let v=Array.from(y.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, select, [contenteditable="true"]')).filter(g=>M(g)&&!P(g));if(p<v.length)return v[p]}}let r=i.match(/^(?:item|opção|opcao|afirmação|afirmacao|alternativa|linha|afirmativa|questão|questao)?\s*#?([a-eA-E])$/i);if(r){let u=r[1].toUpperCase().charCodeAt(0)-65;if(u>=0){let p=Ot();if(u<p.length){let f=p[u];if(f.tagName.toLowerCase()==="tr"){if(e){let v=f.querySelector(`input[value="${N(e)}" i], [data-value="${N(e)}" i]`);if(v)return v}let y=f.querySelector("input");if(y)return y}return G(f)}}}if(/^[a-zA-Z0-9_-]{1,10}$/.test(i)){let p=Array.from(document.querySelectorAll(`[data-category="${a}" i], [data-dropzone="${a}" i], [data-role="dropzone"][data-category="${a}" i]`)).find(g=>M(g)&&!P(g));if(p)return p;let y=Array.from(document.querySelectorAll(`input[value="${a}" i], [data-value="${a}" i], input[id="${a}" i], input[placeholder="${a}" i], textarea[placeholder="${a}" i], [title="${a}" i]`)).find(g=>M(g)&&!P(g));if(y)return G(y);let v=Array.from(document.querySelectorAll('.option-badge, [class*="badge" i], [class*="letter" i], .option-card span, label span')).find(g=>{if(!M(g)||P(g))return!1;let b=w(g.textContent).toLowerCase();return b===i.toLowerCase()||b===i.toLowerCase()+")"});if(v)return G(v)}try{let p=Array.from(document.querySelectorAll(`[name="${a}"], [value="${a}"], [placeholder="${a}" i], [title="${a}" i], [data-category="${a}" i], [data-dropzone="${a}" i], [data-testid="${a}" i], [data-test-id="${a}" i], [aria-label="${a}" i]`)).find(f=>M(f)&&!P(f));if(p)return p.hasAttribute("data-category")||p.hasAttribute("data-dropzone")||p.classList.contains("dnd-zone")?p:G(p)}catch{}if(/^[.#\[]|\s|[>+~:]/.test(i))try{let p=Array.from(document.querySelectorAll(i)).find(f=>M(f)&&!P(f));if(p)return G(p)}catch{}try{let u=i.replace(/"/g,""),p=`//button[normalize-space(.)="${u}"] | //a[normalize-space(.)="${u}"] | //*[not(*) and normalize-space(.)="${u}"] | //*[@aria-label="${u}"] | //*[@data-category="${u}"] | //*[@data-testid="${u}"]`,f=document.evaluate(p,document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);for(let y=0;y<f.snapshotLength;y++){let v=f.snapshotItem(y);if(v&&M(v)&&!P(v)){if(["body","html"].includes(v.tagName.toLowerCase())){let b=v.querySelector('button, [role="button"], a, input, [role="radio"], [role="checkbox"], label');if(b&&M(b))return G(b)}return v.closest('[data-role="dropzone"], [class*="category" i], [class*="bucket" i], [class*="column" i], [class*="drop" i]')||G(v)}}}catch{}let d=w(i).toLowerCase(),h=Array.from(document.querySelectorAll('button, a, div, span, li, p, label, input, textarea, select, [draggable="true"], [data-testid], [class*="option" i], [class*="card" i], [class*="item" i], [class*="choice" i], [class*="category" i], [class*="bucket" i]'));for(let u of h){if(!M(u)||P(u)||u.closest("header, nav, .stepper, .step-item, .progress-bar-container")||O(u)||!!(u.matches('article, section, form, main, [class*="container" i], [class*="grid" i], .dnd-pool, .dnd-zones')||u.querySelector('label, [role="radio"], [role="checkbox"], .dnd-card, [draggable="true"], .option-card, tr'))&&!u.matches(".dnd-zone, [data-category], [data-dropzone]"))continue;let f=w(u.textContent).toLowerCase(),y=w(u.getAttribute("aria-label")||"").toLowerCase(),v=w(u.getAttribute("placeholder")||"").toLowerCase(),g=w(u.getAttribute("title")||"").toLowerCase(),b=w(u.getAttribute("name")||"").toLowerCase(),m=w(u.getAttribute("data-category")||"").toLowerCase(),x=u instanceof HTMLInputElement||u instanceof HTMLButtonElement?u.value:"",T=w(x).toLowerCase(),A=f.startsWith(d+")")||f.startsWith(d+".")||f.startsWith(d+" -")||f.startsWith(d+":");if(f===d||y===d||v===d||g===d||b===d||m&&m===d||T&&T===d||A)return u.closest('[data-role="dropzone"], [class*="category" i], [class*="bucket" i], [class*="column" i], [class*="drop" i]')||G(u)}if(d.length>=3)for(let u of h){if(!M(u)||P(u)||u.closest("header, nav, .stepper, .step-item, .progress-bar-container")||O(u)||!!(u.matches('article, section, form, main, [class*="container" i], [class*="grid" i], .dnd-pool, .dnd-zones')||u.querySelector('label, [role="radio"], [role="checkbox"], .dnd-card, [draggable="true"], .option-card, tr'))&&!u.matches(".dnd-zone, [data-category], [data-dropzone]"))continue;let f=w(u.textContent).toLowerCase(),y=w(u.getAttribute("aria-label")||"").toLowerCase(),v=w(u.getAttribute("placeholder")||"").toLowerCase(),g=w(u.getAttribute("title")||"").toLowerCase(),b=w(u.getAttribute("name")||"").toLowerCase();if(f.includes(d)||y.includes(d)||v.includes(d)||g.includes(d)||b.includes(d)){if(Array.from(u.children).some(A=>{let q=w(A.textContent).toLowerCase();return q&&q.includes(d)}))continue;return u.closest('[data-role="dropzone"], [class*="category" i], [class*="bucket" i], [class*="column" i], [class*="drop" i]')||G(u)}let m=d.split(/\s+/).filter(Boolean);if(m.length>=3){let x=m.slice(0,Math.min(5,m.length)).join(" ");if(f.includes(x)||y.includes(x)||v.includes(x))return G(u)}}return null}function Vt(o,e){for(let t of e)o.dispatchEvent(new Event(t,{bubbles:!0,composed:!0}))}function J(o,e){if(!o)return;try{o.scrollIntoView({block:"nearest",inline:"nearest",behavior:"instant"})}catch{}try{o.focus?.()}catch{}let t=typeof HTMLButtonElement<"u"&&o instanceof HTMLButtonElement||typeof HTMLAnchorElement<"u"&&o instanceof HTMLAnchorElement||o.tagName?.toLowerCase()==="a"||o.tagName?.toLowerCase()==="button"||typeof HTMLInputElement<"u"&&o instanceof HTMLInputElement&&!["checkbox","radio"].includes(o.type),n=o.getBoundingClientRect(),i=e?e[0]:Math.round(n.left+Math.max(1,n.width/2)),a=e?e[1]:Math.round(n.top+Math.max(1,n.height/2)),l={bubbles:!0,cancelable:!0,composed:!0,view:window,clientX:i,clientY:a};try{o.dispatchEvent(new PointerEvent("pointerover",{...l}))}catch{}try{o.dispatchEvent(new MouseEvent("mouseover",{...l}))}catch{}try{o.dispatchEvent(new PointerEvent("pointerdown",{...l,button:0,buttons:1}))}catch{}try{o.dispatchEvent(new MouseEvent("mousedown",{...l,button:0,buttons:1}))}catch{}try{o.dispatchEvent(new PointerEvent("pointerup",{...l,button:0,buttons:0}))}catch{}try{o.dispatchEvent(new MouseEvent("mouseup",{...l,button:0,buttons:0}))}catch{}try{o.dispatchEvent(new MouseEvent("click",{...l,button:0,buttons:0}))}catch{}try{o.click()}catch{}}function Ne(o,e){let t=o;if(t.hasAttribute("for")){let c=t.getAttribute("for"),d=t.ownerDocument.getElementById(c);d&&(t=d)}if(typeof HTMLSelectElement<"u"&&t instanceof HTMLSelectElement||t.tagName?.toLowerCase()==="select"||t.getAttribute("role")==="combobox"||t.getAttribute("role")==="listbox"||t.matches?.('[role="combobox"], [role="listbox"], [class*="select" i], [class*="dropdown" i]')){Oe(t,[e]);return}let i=t.querySelector('select, [role="combobox"], [role="listbox"]');if(i){Oe(i,[e]);return}if(!(t instanceof HTMLInputElement)&&!(t instanceof HTMLTextAreaElement)&&!(t instanceof HTMLSelectElement)&&!t.isContentEditable){let c=t.querySelector('input:not([type="hidden"]), textarea, select, [contenteditable="true"]');if(c)t=c;else{let h=t.closest('.form-group, .field, [class*="input" i], [class*="control" i], label, tr, td, li, p, div')?.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, select, [contenteditable="true"]');if(h)t=h;else{let u=t.nextElementSibling;for(;u;){if(u instanceof HTMLInputElement&&!["hidden","button","submit","checkbox","radio"].includes(u.type)||u instanceof HTMLTextAreaElement||u instanceof HTMLElement&&u.isContentEditable){t=u;break}let p=u.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(p){t=p;break}u=u.nextElementSibling}}}}if(t instanceof HTMLButtonElement||t.tagName.toLowerCase()==="a"||t.getAttribute("role")==="button"||t instanceof HTMLInputElement&&["button","submit","reset","image"].includes(t.type)){let c=t.parentElement?.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(c)t=c;else{let d=document.body;try{d=K()||document.body}catch{}let h=d.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(h)t=h;else{console.warn("[EasyQuiz] setNativeValue: Nenhum campo de texto encontrado para receber o valor.");return}}}if(!(t instanceof HTMLInputElement)&&!(t instanceof HTMLTextAreaElement)&&!(t instanceof HTMLSelectElement)&&!t.isContentEditable){let c=document.body;try{c=K()||document.body}catch{}let d=c.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(d)t=d;else{console.warn("[EasyQuiz] setNativeValue: Nenhum campo de texto encontrado para receber o valor.");return}}if(t instanceof HTMLInputElement&&["checkbox","radio"].includes(t.type)){let c=["true","1","checked","yes","sim"].includes(e.toLowerCase())||e===t.value;ae(t,c);return}let l=String(e??""),s=l;if(t instanceof HTMLInputElement&&t.type==="number"){let c=l.replace(",",".").replace(/[^0-9.-]/g,"");c&&!isNaN(Number(c))&&(s=c)}try{t.scrollIntoView?.({block:"center",inline:"center",behavior:"instant"}),t.focus?.()}catch{}let r=!1;try{if(t instanceof HTMLInputElement||t instanceof HTMLTextAreaElement){if(t.type!=="number"){try{t.select?.()}catch{}r=document.execCommand?.("insertText",!1,s)||!1}}else if(t.isContentEditable){try{document.execCommand?.("selectAll",!1,void 0)}catch{}r=document.execCommand?.("insertText",!1,s)||!1}}catch{}if(t instanceof HTMLInputElement||t instanceof HTMLTextAreaElement){try{let h=t._valueTracker;h&&h.setValue(s===""?" ":"")}catch{}let c=t instanceof HTMLTextAreaElement?HTMLTextAreaElement.prototype:HTMLInputElement.prototype,d=Object.getOwnPropertyDescriptor(c,"value")?.set;d?d.call(t,s):t.value=s;try{t.dispatchEvent(new KeyboardEvent("keydown",{bubbles:!0,cancelable:!0,key:s.slice(-1)||"a"}))}catch{}try{t.dispatchEvent(new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,composed:!0,data:s,inputType:"insertText"}))}catch{}try{t.dispatchEvent(new InputEvent("input",{bubbles:!0,cancelable:!0,composed:!0,data:s,inputType:"insertText"}))}catch{t.dispatchEvent(new Event("input",{bubbles:!0,cancelable:!0,composed:!0}))}try{t.dispatchEvent(new KeyboardEvent("keyup",{bubbles:!0,cancelable:!0,key:s.slice(-1)||"a"}))}catch{}try{t.dispatchEvent(new Event("change",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}try{t.dispatchEvent(new FocusEvent("blur",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}if(t.value!==s&&!(t instanceof HTMLInputElement&&t.type==="number"&&Number(t.value)===Number(s))){t.value=s;try{d?.call(t,s)}catch{}}return}if(t.isContentEditable){if(t.textContent?.trim()!==s.trim()){t.textContent=s;try{t.innerText=s}catch{}}try{t.dispatchEvent(new InputEvent("input",{bubbles:!0,cancelable:!0,composed:!0,data:s,inputType:"insertText"}))}catch{t.dispatchEvent(new Event("input",{bubbles:!0,cancelable:!0,composed:!0}))}try{t.dispatchEvent(new Event("change",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}try{t.dispatchEvent(new FocusEvent("blur",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}return}try{"value"in t&&(t.value=s),t.dispatchEvent(new Event("input",{bubbles:!0,cancelable:!0,composed:!0})),t.dispatchEvent(new Event("change",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}}function Me(o,e=""){if(o==null)return e;let t=typeof o=="string"?o:String(o);if(!t)return e;let n=/^(eq-|#|\$|\.|input_|mat-|choice_|radio_|chk_)/i.test(t),i=w(t),a=L(t)||L(i);if(!a)return n?e:i||e;let l=a.closest('label, .option-card, [class*="choice" i], [class*="option" i], .quiz-option, tr, td, li');if(l){let h=w(l.textContent);if(h&&h.length>0&&h.length<150)return h}if(a.id){let h=document.querySelector(`label[for="${N(a.id)}"]`);if(h){let u=w(h.textContent);if(u&&u.length>0&&u.length<150)return u}}let s=a.getAttribute("aria-label");if(s)return w(s);let r=a.getAttribute("placeholder");if(r)return w(r);let c=w(a.textContent);if(c&&c.length>0&&c.length<120)return c;let d=a instanceof HTMLInputElement||a instanceof HTMLButtonElement?a.value:"";return d?w(d):n?e:i||e}function ae(o,e){if(!o)return;let t=o.closest('.option-card, label, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, [class*="option" i], [class*="choice" i], li, tr')||o,n=o instanceof HTMLInputElement&&["checkbox","radio"].includes(o.type)?o:t.querySelector('input[type="checkbox"], input[type="radio"]');!n&&t.hasAttribute("for")&&(n=t.ownerDocument.getElementById(t.getAttribute("for")));let i=t&&M(t)?t:o;if(n){let a=n.type==="radio",l=n.type==="checkbox",s=!!n._valueTracker;if(n.checked===e){if(a&&e){t.setAttribute("aria-checked","true"),t.setAttribute("aria-selected","true"),t.classList.add("selected","active","checked");return}if(l){t.setAttribute("aria-checked",e?"true":"false"),t.setAttribute("aria-selected",e?"true":"false"),t.classList.toggle("selected",e),t.classList.toggle("active",e),t.classList.toggle("checked",e);return}}i&&i!==n&&J(i);try{n.focus?.(),n.click()}catch{}if(n.checked!==e){try{let c=n._valueTracker;c&&c.setValue(!e)}catch{}try{Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"checked")?.set?.call(n,e)}catch{}n.checked=e,Vt(n,["input","change"])}t.setAttribute("aria-checked",e?"true":"false"),t.setAttribute("aria-selected",e?"true":"false"),t.classList.toggle("selected",e),t.classList.toggle("active",e),t.classList.toggle("checked",e)}else{if((t.getAttribute("aria-checked")==="true"||t.getAttribute("aria-selected")==="true"||t.getAttribute("data-selected")==="true"||t.getAttribute("data-checked")==="true"||t.classList.contains("selected")||t.classList.contains("active")||t.classList.contains("checked"))===e&&e)return;J(i),t.setAttribute("aria-checked",e?"true":"false"),t.setAttribute("aria-selected",e?"true":"false"),t.classList.toggle("selected",e),t.classList.toggle("active",e),t.classList.toggle("checked",e)}}function Oe(o,e){let t=typeof HTMLSelectElement<"u"&&o instanceof HTMLSelectElement||o.tagName?.toLowerCase()==="select"?o:o.querySelector("select");if(t){let l=e.map(c=>w(c).toLowerCase()),s=!1,r=(c,d)=>{c.selected=!0,t.selectedIndex=d;try{t.value=c.value}catch{}try{Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype,"value")?.set?.call(t,c.value)}catch{}try{let h=t._valueTracker;h&&h.setValue(c.value)}catch{}s=!0};for(let c=0;c<t.options.length;c++){let d=t.options[c],h=d.value.toLowerCase(),u=w(d.textContent).toLowerCase();if(l.some(f=>f===h||f===u)){if(r(d,c),!t.multiple)break}else t.multiple||(d.selected=!1)}if(!s)for(let c of l){let d=c.match(/^(?:item|opção|opcao|alternativa|linha|escolha|campo)?\s*#?_?([0-9]+)$/i);if(d){let h=parseInt(d[1],10),p=t.options[0]?.value===""||t.options[0]?.disabled?h:h>=1?h-1:0;if(p>=0&&p<t.options.length&&(r(t.options[p],p),!t.multiple))break}}if(!s){for(let c of l)if(/^[a-z]$/i.test(c)){let d=c.toUpperCase().charCodeAt(0)-65,u=t.options[0]?.value===""||t.options[0]?.disabled?d+1:d;if(u>=0&&u<t.options.length&&(r(t.options[u],u),!t.multiple))break}}if(!s){let c=d=>d.normalize("NFD").replace(/[\u0300-\u036f]/g,"");for(let d=0;d<t.options.length;d++){let h=t.options[d],u=c(h.value.toLowerCase()),p=c(w(h.textContent).toLowerCase());if(l.some(y=>{let v=c(y);return u.includes(v)||p.includes(v)||v.length>2&&(v.includes(u)||v.includes(p))})&&(r(h,d),!t.multiple))break}}if(s){Vt(t,["focus","input","change","blur"]);return}}let n=o.matches?.('[role="combobox"], [role="listbox"], [class*="select" i], [class*="dropdown" i]')?o:o.closest('[role="combobox"], [role="listbox"], [class*="select" i], [class*="dropdown" i]');n&&J(n);let i=e.map(l=>w(l).toLowerCase()),a=Array.from(document.querySelectorAll('[role="listbox"] [role="option"], [role="menu"] [role="menuitem"], .select-dropdown li, .dropdown-menu .dropdown-item, .ant-select-item-option, .MuiMenuItem-root, [class*="option-item"], li[data-value]')).filter(l=>M(l)&&!P(l));for(let l of i){let s=a.find(c=>{let d=w(c.textContent).toLowerCase(),h=w(c.getAttribute("data-value")||c.getAttribute("value")||"").toLowerCase();return d===l||h===l||d.includes(l)||l.length>2&&l.includes(d)});if(s){J(s);let c=s.querySelector('input[type="radio"], input[type="checkbox"]');c&&ae(c,!0);return}let r=L(l);if(r){J(r);return}}}function po(o,e){try{let t=new DataTransfer;try{t.setData("text/plain",o)}catch{}try{t.setData("text/html",e)}catch{}return t}catch{return null}}function at(o){try{o.click()}catch{let e=o.ownerDocument.defaultView||window;o.dispatchEvent(new e.MouseEvent("click",{bubbles:!0,cancelable:!0,composed:!0,view:e}))}}function ne(o,e){let t=w(o).toLowerCase();if(!t)return null;let n=e==="source"?'.dnd-card, [draggable="true"]':'[data-dropzone], [data-category], [data-role="dropzone"]',i=Array.from(document.querySelectorAll(n)),a=e==="destination"?i.find(l=>[l.getAttribute("data-category"),l.getAttribute("data-dropzone")].some(s=>s?.trim().toLowerCase()===t)):null;return a&&M(a)&&!P(a)?a:i.find(l=>{if(!M(l)||P(l))return!1;let s=w(`${l.textContent||""} ${l.getAttribute("data-category")||""} ${l.getAttribute("data-dropzone")||""}`).toLowerCase();return s===t||s.includes(t)})||null}async function De(o,e,t=1){try{o.scrollIntoView({block:"center",inline:"center",behavior:"instant"})}catch{}let n=o.getBoundingClientRect(),i=e.getBoundingClientRect(),a=Math.round(n.left+Math.max(1,n.width/2)),l=Math.round(n.top+Math.max(1,n.height/2)),s=Math.round(i.left+Math.max(1,i.width/2)),r=Math.round(i.top+Math.max(1,i.height/2)),c=w(e.textContent).toLowerCase();if(c){let y=Array.from(o.querySelectorAll('button, [role="button"], input[type="radio"], input[type="checkbox"], option, .btn, [class*="tag" i]')).find(v=>{let g=w(v.textContent).toLowerCase(),b=v instanceof HTMLInputElement||v instanceof HTMLOptionElement?w(v.value).toLowerCase():"";return g&&(c.includes(g)||g.includes(c))||b&&(c.includes(b)||b.includes(c))});y&&(J(y),await new Promise(v=>setTimeout(v,120)))}at(o),await new Promise(f=>setTimeout(f,140)),at(e);let d=e.querySelector('[data-role="dropzone"], [class*="bucket" i], [class*="slot" i], [class*="drop" i], [class*="target" i], [class*="items" i], ul, ol');if(d&&d!==e&&at(d),await new Promise(f=>setTimeout(f,100)),!e.contains(o)&&o.matches('.dnd-card, [draggable="true"]')&&e.matches('.dnd-zone, [data-dropzone], [data-role="dropzone"]')&&e.appendChild(o),e.contains(o)&&o.matches('.dnd-card, [draggable="true"]'))return;let h={bubbles:!0,cancelable:!0,composed:!0,view:window,clientX:a,clientY:l,screenX:a,screenY:l,button:0,buttons:1};try{o.dispatchEvent(new PointerEvent("pointerdown",{...h,isPrimary:!0,pointerId:1,pointerType:"mouse",pressure:.5}))}catch{}o.dispatchEvent(new MouseEvent("mousedown",h));let u=4;for(let f=1;f<=u;f++){let y=Math.round(a+(s-a)*(f/u)),v=Math.round(l+(r-l)*(f/u)),g={...h,clientX:y,clientY:v,screenX:y,screenY:v};try{o.dispatchEvent(new PointerEvent("pointermove",{...g,isPrimary:!0,pointerId:1,pointerType:"mouse",pressure:.5}))}catch{}document.dispatchEvent(new MouseEvent("mousemove",g))}let p={bubbles:!0,cancelable:!0,composed:!0,view:window,clientX:s,clientY:r,screenX:s,screenY:r,button:0,buttons:0};try{e.dispatchEvent(new PointerEvent("pointerup",{...p,isPrimary:!0,pointerId:1,pointerType:"mouse",pressure:0}))}catch{}e.dispatchEvent(new MouseEvent("mouseup",p)),e.dispatchEvent(new MouseEvent("click",p));try{let f=po(z(o.textContent),o.outerHTML),y={...h},v={...p};f&&(y.dataTransfer=f,v.dataTransfer=f);let g=o.ownerDocument.defaultView?.DragEvent;if(!g)throw new Error("DragEvent n\xE3o dispon\xEDvel neste documento");o.dispatchEvent(new g("dragstart",y)),e.dispatchEvent(new g("dragenter",v)),e.dispatchEvent(new g("dragover",v)),e.dispatchEvent(new g("drop",v)),o.dispatchEvent(new g("dragend",y))}catch(f){console.warn("[EasyQuiz] DragEvent ignorado com seguran\xE7a:",f)}try{let f=new Touch({identifier:1,target:o,clientX:a,clientY:l}),y=new Touch({identifier:1,target:e,clientX:s,clientY:r});o.dispatchEvent(new TouchEvent("touchstart",{bubbles:!0,cancelable:!0,touches:[f]})),e.dispatchEvent(new TouchEvent("touchmove",{bubbles:!0,cancelable:!0,touches:[y]})),e.dispatchEvent(new TouchEvent("touchend",{bubbles:!0,cancelable:!0,touches:[]}))}catch{}if(t>=2&&!e.contains(o))try{o.focus?.(),o.dispatchEvent(new KeyboardEvent("keydown",{key:" ",code:"Space",bubbles:!0})),o.dispatchEvent(new KeyboardEvent("keyup",{key:" ",code:"Space",bubbles:!0})),await new Promise(f=>setTimeout(f,80)),e.focus?.(),e.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",bubbles:!0})),e.dispatchEvent(new KeyboardEvent("keyup",{key:"Enter",code:"Enter",bubbles:!0}))}catch{}}var _t={fill:(o,e)=>{let t=L(o);t?Ne(t,e):console.warn(`$eq.fill: Elemento '${o}' n\xE3o encontrado`)},click:o=>{let e=L(o);e?!!(e.closest('.option-card, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, [class*="option" i], [class*="choice" i]')||e.querySelector('input[type="radio"], input[type="checkbox"]')||e instanceof HTMLInputElement&&["checkbox","radio"].includes(e.type))?ae(e,!0):J(e):console.warn(`$eq.click: Elemento '${o}' n\xE3o encontrado`)},check:(o,e)=>{let t=L(o);t?ae(t,e):console.warn(`$eq.check: Elemento '${o}' n\xE3o encontrado`)},find:(o,e)=>L(o,e),drag:(o,e)=>{let t=ne(o,"source")||L(o),n=ne(e,"destination")||L(e);t&&n?De(t,n):console.warn(`$eq.drag: Origem ou destino n\xE3o encontrado ('${o}' -> '${e}')`)},categorize:async(o,e)=>{let t=ne(o,"source")||L(o),n=ne(e,"destination")||L(e);if(!t||!n){console.warn(`$eq.categorize: Item ou categoria n\xE3o encontrados ('${o}' -> '${e}')`);return}await De(t,n)},execute:(o,e=!1,t=1)=>rt(o,e,t)};typeof window<"u"&&(window.$eq=_t);async function ho(o,e=1,t=Te()){if(Ze(o,t),o.t==="js"){let s=String(o.v||"");zt(s);try{new Function("$eq","document","window",s)(_t,document,window)}catch(r){throw console.warn("[EasyQuiz JS Execution]",r),r}return}if(o.t==="drag"){let s=ne(o.from,"source")||L(o.from),r=ne(o.to,"destination")||L(o.to);!s&&o.from&&(s=L(w(o.from))),!r&&o.to&&(r=L(w(o.to))),s&&r?await De(s,r,e):console.warn(`[EasyQuiz] Drag: alvo n\xE3o encontrado ('${o.from}' -> '${o.to}')`);return}let n=o.id!==void 0&&o.id!==null?String(o.id):"";!n&&o.t==="val"&&(n=o.target??o.name??o.selector??"1");let i=o.v!==void 0?o.v:o.value!==void 0?o.value:o.val!==void 0?o.val:o.text,a=i!=null?String(i).trim():"",l=L(n,a,o.t==="val"||o.t==="sel");if(!l&&n&&(l=L(w(n),a,o.t==="val"||o.t==="sel")),l&&a){if(l instanceof HTMLInputElement&&l.type==="radio"&&l.name){if(w(l.value).toLowerCase()!==w(a).toLowerCase()){let s=document.querySelector(`input[type="radio"][name="${N(l.name)}"][value="${N(a)}" i]`);if(s)l=s;else{let c=Array.from(document.querySelectorAll(`input[type="radio"][name="${N(l.name)}"]`)).find(d=>{let h=d.closest("label, .vf-label, .option-card, tr, td, div");return h&&w(h.textContent).toLowerCase().includes(w(a).toLowerCase())});c&&(l=c)}}}else if(!(l instanceof HTMLInputElement)&&!(l instanceof HTMLSelectElement)&&!(l instanceof HTMLTextAreaElement)){let s=l.querySelector(`input[value="${N(a)}" i], [data-value="${N(a)}" i]`);if(s)l=s;else{let c=Array.from(l.querySelectorAll('input[type="radio"], input[type="checkbox"]')).find(d=>{let h=d.closest("label, .vf-label, .option-card, td, div");return h&&w(h.textContent).toLowerCase().includes(w(a).toLowerCase())});c&&(l=c)}}}if(!l&&(o.t==="val"||o.t==="sel")){let s=document.body;try{s=K()||document.body}catch{}let r=Array.from(s.querySelectorAll(o.t==="sel"?'select, [role="combobox"], [role="listbox"]':'input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, select, [contenteditable="true"]')).filter(c=>M(c)&&!P(c));if(r.length===1)l=r[0];else if(r.length>1){let c=w(n).toLowerCase(),d=c.match(/^#?_?([0-9]+)$/);if(d){let h=parseInt(d[1],10);h>=1&&h<=r.length?l=r[h-1]:h>=0&&h<r.length&&(l=r[h])}l||(l=r.find(u=>{let p=(u.getAttribute("placeholder")||"").toLowerCase(),f=(u.name||"").toLowerCase(),y=(u.getAttribute("aria-label")||"").toLowerCase(),v=(u.id||"").toLowerCase(),g=w(tt(u)).toLowerCase(),b=w(u.closest('label, tr, td, .form-group, .field, [class*="row" i], div')?.textContent||"").toLowerCase();return p.includes(c)||f.includes(c)||y.includes(c)||v.includes(c)||g&&g.includes(c)||c.length>=2&&b.includes(c)})||(r.length===1?r[0]:null))}}if(!l&&o.t!=="adv")throw new Error(`Alvo '${n}' n\xE3o encontrado no DOM para a\xE7\xE3o '${o.t}'.`);switch(o.t){case"val":if(l){let r=l instanceof HTMLInputElement||l instanceof HTMLTextAreaElement||l instanceof HTMLSelectElement||l.isContentEditable?l:l.querySelector('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]');if(!r){let u=l.closest('.form-group, .field, [class*="input" i], [class*="control" i], label, tr, td, li, p, div')?.querySelector('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]');u&&(r=u)}if(!r){let h=l.nextElementSibling;for(;h;){if(h instanceof HTMLInputElement&&!["hidden","button","submit","checkbox","radio"].includes(h.type)||h instanceof HTMLTextAreaElement||h instanceof HTMLElement&&h.isContentEditable){r=h;break}let u=h.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(u){r=u;break}h=h.nextElementSibling}}if(!r){let h=document.body;try{h=K()||document.body}catch{}let u=Array.from(h.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]')).filter(p=>M(p)&&!P(p));u.length>0&&(r=u[0])}let c=o.v!==void 0?o.v:o.value!==void 0?o.value:o.val!==void 0?o.val:o.text,d=c!=null?String(c):"";Ne(r||l,d)}break;case"chk":l&&ae(l,!!o.c);break;case"sel":if(l){let r=Array.isArray(o.v)?o.v:[String(o.v)];Oe(l,r)}break;case"clk":if(l)if(!!(l.closest('.option-card, label, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, [class*="option" i], [class*="choice" i], [class*="answer" i], li, tr')||l.querySelector('input[type="radio"], input[type="checkbox"]')||l instanceof HTMLInputElement&&["checkbox","radio"].includes(l.type))){let c=o.c!==void 0?!!o.c:!0;ae(l,c)}else J(l,o.co);break;case"adv":let s=it(o.id);if(s){await st(s,1200);let r=o.id||s.textContent?.trim()||"";r&&Ue(window.location.hostname,{advanceSelector:r}),J(s)}else console.warn("[EasyQuiz] Bot\xE3o de avan\xE7o n\xE3o localizado.");break}}function mo(){let o=["button","a",'[role="button"]','input[type="submit"]','input[type="button"]','[data-testid*="check" i]','[data-test-id*="check" i]'].join(",");return Array.from(document.querySelectorAll(o)).find(t=>{if(!M(t)||P(t)||t.closest("header, nav, aside"))return!1;let n=t instanceof HTMLInputElement||t instanceof HTMLButtonElement?t.value:"",i=(t.textContent||n||t.getAttribute("aria-label")||"").trim();return/(verificar|checar|check|conferir|validar|enviar|responder)/i.test(i)})||null}function it(o){if(o){let a=L(o);if(a&&M(a)&&!P(a)&&!O(a))return a}try{let a=ye(window.location.hostname);if(a.advanceSelector){let l=L(a.advanceSelector);if(l&&M(l)&&!P(l)&&!O(l))return l}}catch{}let e=["button","a",'[role="button"]','[role="link"]','input[type="button"]','input[type="submit"]','[data-testid*="next" i]','[data-testid*="continue" i]','[data-testid*="check" i]','[data-test-id*="next" i]','[data-test-id*="continue" i]','[data-test-id*="check" i]','[class*="next" i]','[class*="continue" i]','[class*="proximo" i]','[class*="avancar" i]'].join(","),n=Array.from(document.querySelectorAll(e)).filter(a=>M(a)&&!P(a)&&!a.closest("header, nav, aside")&&!O(a));for(let a of n)if(te(a)&&!O(a))return a;for(let a of n){let l=a instanceof HTMLInputElement||a instanceof HTMLButtonElement?a.value:"",s=(a.textContent||l||a.getAttribute("aria-label")||"").trim();if(Pe.test(s)&&!O(a))return a}let i=document.querySelector('[data-test-id*="next" i], [data-testid*="next" i], [aria-label*="next" i], [aria-label*="pr\xF3xim" i], [aria-label*="avan\xE7ar" i], [aria-label*="continuar" i]');return i&&M(i)&&!P(i)&&!O(i)?i:null}async function st(o,e=2500){let t=Date.now();for(;Date.now()-t<e;){if(!(o.disabled===!0||o.getAttribute("aria-disabled")==="true"||o.classList.contains("disabled")||o.getAttribute("disabled")!==null))return;await new Promise(i=>setTimeout(i,80))}}function go(){let o=window.location.href,e=document.title,t=document.querySelectorAll('input, textarea, select, button, [role="button"], [role="option"], [role="radio"], [role="checkbox"]').length,n=(document.body?.innerText||document.body?.textContent||"").length;return`${o}|${e}|${t}|${n}`}async function fo(o,e=3500){let[t,n,i,a]=o.split("|"),l=parseInt(a||"0",10),s=Date.now();for(;Date.now()-s<e;){let r=window.location.href,c=document.title,d=String(document.querySelectorAll('input, textarea, select, button, [role="button"], [role="option"], [role="radio"], [role="checkbox"]').length),h=(document.body?.innerText||document.body?.textContent||"").length;if(r!==t)return{changed:!0,evidence:`URL mudou: ${t} \u2192 ${r}`};if(c!==n)return{changed:!0,evidence:`T\xEDtulo da p\xE1gina mudou: "${n}" \u2192 "${c}"`};if(Math.abs(parseInt(d)-parseInt(i||"0"))>=2)return{changed:!0,evidence:`Controles interativos: ${i} \u2192 ${d}`};if(Math.abs(h-l)>50)return{changed:!0,evidence:`Conte\xFAdo da p\xE1gina mudou substancialmente (${Math.abs(h-l)} chars)`};await new Promise(u=>setTimeout(u,100))}return{changed:!1,evidence:"Nenhuma mudan\xE7a estrutural detectada dentro do tempo limite."}}async function Dt(o){if(o.t==="js"||o.t==="adv")return;if(o.t==="drag"){let i=L(o.from)||L(w(o.from)),a=L(o.to)||L(w(o.to));i&&a&&await De(i,a,2);return}let e=o.id||"",t=o.v!==void 0?String(o.v).trim():"",n=L(e,t)||L(w(e),t);if(o.t==="clk"||o.t==="chk"){if(!n&&e){let a=Array.from(document.querySelectorAll('input, label, button, [role="radio"], [role="checkbox"], .option-card, [class*="option" i], [class*="choice" i]')),l=w(e).toLowerCase();n=a.find(s=>{let r=w(s.textContent).toLowerCase();return!!(w(s.value||"").toLowerCase()===l||r===l||r.startsWith(l+")")||r.startsWith("("+l+")")||r.startsWith(l+".")||r.startsWith(l+" - ")||r.startsWith(l+":")||l.length>=3&&r.includes(l))})||null}let i=o.v!==void 0?String(o.v).trim():"";if(n&&i){if(n instanceof HTMLInputElement&&n.type==="radio"&&n.name){if(w(n.value).toLowerCase()!==w(i).toLowerCase()){let a=document.querySelector(`input[type="radio"][name="${N(n.name)}"][value="${N(i)}" i]`);if(a)n=a;else{let s=Array.from(document.querySelectorAll(`input[type="radio"][name="${N(n.name)}"]`)).find(r=>{let c=r.closest("label, .vf-label, .option-card, tr, td, div");return c&&w(c.textContent).toLowerCase().includes(w(i).toLowerCase())});s&&(n=s)}}}else if(!(n instanceof HTMLInputElement)&&!(n instanceof HTMLSelectElement)&&!(n instanceof HTMLTextAreaElement)){let a=n.querySelector(`input[value="${N(i)}" i], [data-value="${N(i)}" i]`);if(a)n=a;else{let s=Array.from(n.querySelectorAll('input[type="radio"], input[type="checkbox"]')).find(r=>{let c=r.closest("label, .vf-label, .option-card, td, div");return c&&w(c.textContent).toLowerCase().includes(w(i).toLowerCase())});s&&(n=s)}}}if(n){let a=n.closest('.option-card, label, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, li')||n,l=n instanceof HTMLInputElement&&["radio","checkbox"].includes(n.type)?n:a.querySelector('input[type="radio"], input[type="checkbox"]')||(a.getAttribute("for")?a.ownerDocument.getElementById(a.getAttribute("for")):null),s=o.t==="chk"||o.c!==void 0?!!o.c:!0;if(ae(l||a,s),l&&l.checked!==s){try{let r=l._valueTracker;r&&r.setValue(!s)}catch{}try{Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"checked")?.set?.call(l,s)}catch{}l.checked=s,l.dispatchEvent(new Event("input",{bubbles:!0,composed:!0})),l.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}}return}if(o.t==="val"){let i=null;if(n&&(i=n instanceof HTMLInputElement||n instanceof HTMLTextAreaElement||n.isContentEditable?n:n.querySelector('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]')),!i){let a=document.body;try{a=K()||document.body}catch{}let l=Array.from(a.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]')),s=w(e).toLowerCase();i=l.find(r=>{let c=(r.getAttribute("placeholder")||"").toLowerCase(),d=(r.name||"").toLowerCase(),h=(r.id||"").toLowerCase(),u=(r.getAttribute("aria-label")||"").toLowerCase();return c.includes(s)||d.includes(s)||h.includes(s)||u.includes(s)})||(l.length>0?l[0]:null)}if(i){let a=String(o.v??"");try{if(i.focus?.(),i.type!=="number"){try{i.select?.()}catch{}document.execCommand?.("insertText",!1,a)}}catch{}Ne(i,a)}return}if(o.t==="sel"){if(!n&&e){let i=Array.from(document.querySelectorAll("select")),a=w(e).toLowerCase();n=i.find(l=>{let s=(l.name||"").toLowerCase(),r=(l.id||"").toLowerCase(),c=(l.getAttribute("aria-label")||"").toLowerCase();return s.includes(a)||r.includes(a)||c.includes(a)})||null}if(n){let i=Array.isArray(o.v)?o.v:[String(o.v)];Oe(n,i)}return}}function me(o){try{if(o.t==="val"){let e=o.v!==void 0?o.v:o.value!==void 0?o.value:o.val!==void 0?o.val:o.text,t=String(e??"").trim(),n=t,i=o.id!==void 0&&o.id!==null?String(o.id):"";i||(i=o.target??o.name??o.selector??"1");let a=L(i,n,!0)||L(w(i),n,!0);if(!a){let h=document.body;try{h=K()||document.body}catch{}let u=Array.from(h.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]')).filter(p=>M(p)&&!P(p));u.length>0&&(a=u[0])}if(!a)return!1;let l=a instanceof HTMLInputElement&&a.type==="radio"?a:a.querySelector('input[type="radio"]');if(l&&l.name){let h=document.querySelector(`input[type="radio"][name="${N(l.name)}"]:checked`);if(!h)return!1;let u=w(h.value).toLowerCase(),p=w(t).toLowerCase(),f=w(h.closest("label, .vf-label, .option-card, tr, td, div")?.textContent||"").toLowerCase();return u===p||f===p||f.includes(p)}let s=a instanceof HTMLInputElement||a instanceof HTMLTextAreaElement||a.isContentEditable?a:a.querySelector('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(!s){let u=a.closest('.form-group, .field, [class*="input" i], [class*="control" i], label, tr, td, li, p, div')?.querySelector('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]');u&&(s=u)}if(!s){let h=a.nextElementSibling;for(;h;){if(h instanceof HTMLInputElement&&!["hidden","button","submit","checkbox","radio"].includes(h.type)||h instanceof HTMLTextAreaElement||h instanceof HTMLElement&&h.isContentEditable){s=h;break}let u=h.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(u){s=u;break}h=h.nextElementSibling}}if(s instanceof HTMLSelectElement){let h=w(t).toLowerCase();return Array.from(s.options).some(u=>{if(!u.selected)return!1;let p=u.value.toLowerCase(),f=w(u.textContent).toLowerCase();return h===p||h===f||p.includes(h)||f.includes(h)})}let r=(s instanceof HTMLInputElement||s instanceof HTMLTextAreaElement?s.value:s?.textContent??a.textContent??"").trim();if(!r&&!t)return!0;if(!r&&t)return!1;let c=r.replace(",",".").replace(/\s+/g,"").toLowerCase(),d=t.replace(",",".").replace(/\s+/g,"").toLowerCase();return c===d||c.includes(d)||d.includes(c)||r.toLowerCase()===t.toLowerCase()}if(o.t==="sel"){let e=L(o.id,void 0,!0)||L(w(o.id),void 0,!0);if(!e){let a=document.body;try{a=K()||document.body}catch{}let l=Array.from(a.querySelectorAll('select, [role="combobox"], [role="listbox"]')).filter(c=>M(c)&&!P(c)),s=w(o.id).toLowerCase();e=l.find(c=>{let d=(c.id||"").toLowerCase(),h=(c.getAttribute("name")||"").toLowerCase(),u=(c.getAttribute("aria-label")||"").toLowerCase(),p=w(c.closest('.dropdown-row, [class*="dropdown" i], [class*="select" i], tr, label, div')?.textContent||"").toLowerCase();return d.includes(s)||h.includes(s)||u.includes(s)||s.length>=2&&p.includes(s)})||(l.length===1?l[0]:null)}if(!e)return!1;let t=e instanceof HTMLSelectElement?e:e.querySelector("select");if(!t){let a=e.matches?.('[role="combobox"], [role="listbox"], [class*="select" i], [class*="dropdown" i]')?e:e.closest('[role="combobox"], [role="listbox"], [class*="select" i], [class*="dropdown" i]');if(a){let s=(Array.isArray(o.v)?o.v:[String(o.v)]).map(c=>w(c).toLowerCase()),r=w(a.textContent).toLowerCase();return s.some(c=>r.includes(c)||c.includes(r))}return!1}let i=(Array.isArray(o.v)?o.v:[String(o.v)]).map(a=>w(a).toLowerCase());return Array.from(t.options).some(a=>{if(!a.selected)return!1;let l=a.value.toLowerCase(),s=w(a.textContent).toLowerCase();return i.some(r=>r===l||r===s||l.includes(r)||s.includes(r))})}if(o.t==="chk"||o.t==="clk"){let e=o.v!==void 0?String(o.v).trim():"",t=L(o.id,e)||L(w(o.id),e);if(!t)return!1;let n=t.closest('.option-card, label, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, li')||t,i=t instanceof HTMLInputElement&&["checkbox","radio"].includes(t.type)?t:n.querySelector('input[type="checkbox"], input[type="radio"]')||(n.getAttribute("for")?n.ownerDocument.getElementById(n.getAttribute("for")):null),a=o.t==="chk"||o.c!==void 0?!!o.c:!0;if(i&&i.type==="radio"){if(i.checked===a)return!0;if(o.v&&i.name){let d=w(String(o.v)).toLowerCase(),h=document.querySelector(`input[type="radio"][name="${N(i.name)}"]:checked`);if(!h)return!1;if(h===i)return!0;let u=w(h.value).toLowerCase(),p=w(h.closest("label, .vf-label, .option-card, tr, td, div")?.textContent||"").toLowerCase();return u===d||p.includes(d)||d.includes(u)}}if(i&&["checkbox","radio"].includes(i.type))return i.checked===a;let l=n.getAttribute("aria-checked")===String(a)||n.getAttribute("aria-selected")===String(a)||n.getAttribute("aria-pressed")===String(a),s=a?n.getAttribute("data-selected")==="true"||n.getAttribute("data-checked")==="true"||n.getAttribute("data-active")==="true"||n.getAttribute("data-state")==="checked"||n.getAttribute("data-state")==="on":n.getAttribute("data-selected")==="false"||n.getAttribute("data-checked")==="false"||n.getAttribute("data-state")==="unchecked",r=a?/active|selected|checked|picked|correct|is-selected|choice-selected|selected-option|is-checked|chosen|current|highlight|ring|border-primary/i.test(n.className||""):!/active|selected|checked|picked|correct|is-selected|choice-selected|selected-option|is-checked|chosen|current|highlight|ring|border-primary/i.test(n.className||"");return!!(l||s||r||(n instanceof HTMLButtonElement||n.getAttribute("role")==="button")&&o.t==="clk"||o.t==="clk"&&!i)}if(o.t==="drag"){let e=L(o.from)||L(w(o.from)),t=L(o.to)||L(w(o.to));return!e||!t?!1:t.contains(e)?!0:/placed|dropped|assigned|matched|done|selected/i.test(e.className||"")||e.getAttribute("data-placed")==="true"}}catch{}return!1}async function rt(o,e,t=1,n=Te({engine:"smart",autoAdvance:e})){let i=o.actions.filter(m=>m.t!=="adv"),a=o.actions.filter(m=>m.t==="adv"),l=0,s=[],r=new Map,c=o.pageType==="question",d=i.filter(m=>m.t==="chk"||m.t==="clk"&&m.c!==void 0);for(let m of i){try{await ho(m,t,n),l++}catch(x){r.set(m,x instanceof Error?x.message:String(x)),console.warn("[EasyQuiz] A\xE7\xE3o declarativa prim\xE1ria falhou com seguran\xE7a:",m,x)}await new Promise(x=>setTimeout(x,m.t==="drag"?300:100))}if(c&&o.mode==="escolha_multipla"&&d.length>0){let m=document.body;try{m=K()||document.body}catch{}let x=Array.from(m.querySelectorAll('input[type="checkbox"], [role="checkbox"]')).filter(T=>M(T)&&!P(T));if(x.length>1){let A=function(q,E){if(q===E||q.contains(E)||E.contains(q))return!0;let H=q.closest('.option-card, label, [role="checkbox"], [role="option"], tr, li, [class*="option" i]'),R=E.closest('.option-card, label, [role="checkbox"], [role="option"], tr, li, [class*="option" i]');if(H&&R&&H===R)return!0;let V=q.getAttribute("for")||q.id,B=E.getAttribute("for")||E.id;return!!(V&&B&&V===B)};var b=A;let T=new Set;for(let q of d){let E=q.t==="chk"?!!q.c:!!(q.c??!0),H="id"in q&&typeof q.id=="string"?q.id:"";if(E&&H){let R=L(H,q.v);if(R){T.add(R);let V=R.querySelector('input[type="checkbox"]');V&&T.add(V);let B=R.closest('.option-card, label, [role="checkbox"], tr, li, [class*="option" i]');B&&(T.add(B),B.querySelectorAll('input[type="checkbox"]').forEach(_=>T.add(_)))}}}if(T.size>=d.length&&T.size>0){let q=Array.from(T);for(let E of x)q.some(R=>A(R,E))||(E instanceof HTMLInputElement&&E.checked||E.getAttribute("aria-checked")==="true"||E.closest(".option-card, label")?.classList.contains("selected"))&&ae(E,!1)}}}await new Promise(m=>setTimeout(m,i.length>0?450:80));let h=0;for(let m of i){if(me(m)){h++;continue}console.warn(`[EasyQuiz Auto-Cura] A\xE7\xE3o '${m.t}' no alvo '${m.id||m.from||""}' n\xE3o verificada no DOM. Disparando Passagem 2 de conting\xEAncia...`);try{Ze(m,n),await Dt(m)}catch(x){r.set(m,x instanceof Error?x.message:String(x)),console.warn("[EasyQuiz Auto-Cura] Rota alternativa falhou:",x)}await new Promise(x=>setTimeout(x,250)),me(m)&&(console.log("[EasyQuiz Auto-Cura] \u2713 A\xE7\xE3o recuperada com sucesso pela rota de conting\xEAncia!"),h++,r.has(m)&&(r.delete(m),l++))}if(h<i.length&&i.length>0){console.warn(`[EasyQuiz Auto-Cura] ${i.length-h} de ${i.length} a\xE7\xE3o(\xF5es) ainda n\xE3o verificadas. Disparando Passagem 3 final...`),await new Promise(m=>setTimeout(m,300));for(let m of i)if(!me(m))try{await Dt(m)}catch(x){r.set(m,x instanceof Error?x.message:String(x))}await new Promise(m=>setTimeout(m,300)),h=0;for(let m of i)me(m)&&(h++,r.has(m)&&(r.delete(m),l++))}for(let m of i)me(m)||s.push(m.t==="drag"?`${m.from} -> ${m.to}`:"id"in m?m.id:m.t);c&&i.length===0&&s.push("nenhuma a\xE7\xE3o de resposta prescrita");let u=i.map((m,x)=>{let T=m.t==="drag"?`${m.from} -> ${m.to}`:m.t==="js"?"$eq":m.id||m.t,A=m.t==="js"?!0:m.t==="drag"?!!(ne(m.from,"source")&&ne(m.to,"destination")):!!(L(m.id||"")||L(w(m.id||""))),q=me(m);return{index:x,action:m,target:T,located:A,applied:!r.has(m),verified:q,strategy:m.t==="drag"?"drag-adaptive":m.t==="js"?"javascript":"declarative-dom",evidence:q?"estado do controle confirmado no DOM":"nenhuma evid\xEAncia suficiente ap\xF3s as tentativas",...r.has(m)?{error:r.get(m)}:{}}}),p=c?i.length>0&&s.length===0&&(h===i.length||l===i.length&&h>0):!0,f=!1,y=!1,v="Nenhuma a\xE7\xE3o de navega\xE7\xE3o solicitada.",g=l>0&&l>=i.length/2;if(e&&(p||!c||g)){await new Promise(q=>setTimeout(q,i.length>0?600:200));let m=!1;if(o.pageType!=="info"){let q=mo();q&&M(q)&&(await st(q,1200),J(q),m=!0,await new Promise(E=>setTimeout(E,800)))}let x=go(),T=a.length>0?a[0].id:void 0,A=it(T);if(!A&&m&&(await new Promise(q=>setTimeout(q,600)),A=it(T)),A){await st(A,1500);let q=T||A.textContent?.trim()||"";q&&Ue(window.location.hostname,{advanceSelector:q}),J(A);let E=await fo(x,2500);y=E.changed,v=E.evidence,f=E.changed||m,!E.changed&&!m&&console.warn("[EasyQuiz] O bot\xE3o de avan\xE7o foi acionado, mas a navega\xE7\xE3o ainda n\xE3o concluiu.")}else m?(f=!0,y=!0,v="Resposta confirmada via bot\xE3o de verifica\xE7\xE3o/envio."):console.warn("[EasyQuiz] Nenhum bot\xE3o de avan\xE7o encontrado na p\xE1gina.")}return{applied:l,verified:h,success:p,advanced:f,failed:s,reports:u,navigationVerified:y,navigationEvidence:v}}var ge=null,re=[],lt=[],ct=[],fe=null,bo=`
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
`;function Kt(){try{if(typeof document>"u"||!document.head)return;if(!document.getElementById("eq-image-pulse-style")){let o=document.createElement("style");o.id="eq-image-pulse-style",o.textContent=bo,document.head.appendChild(o)}}catch{}}function le(){ge&&(ge.style.removeProperty("outline"),ge.style.removeProperty("outline-offset"),ge.style.removeProperty("position"),ge=null);for(let o of re)o.style.removeProperty("outline"),o.style.removeProperty("outline-offset"),o.style.removeProperty("background-color"),o.style.removeProperty("box-shadow"),o.removeAttribute("data-easyquiz-highlight");re=[];for(let o of lt)o.style.removeProperty("animation"),o.style.removeProperty("outline"),o.style.removeProperty("outline-offset"),o.style.removeProperty("box-shadow"),o.removeAttribute("data-easyquiz-image-highlight");lt=[];for(let o of ct)try{o.remove()}catch{}if(ct=[],fe){try{fe.remove()}catch{}fe=null}}function dt(o){Kt();for(let e of o){if(!e||!(e instanceof(typeof HTMLElement<"u"?HTMLElement:e.constructor)))continue;let t=e;t.style.outline="3px solid #ffd600",t.style.outlineOffset="3px",t.style.animation="eq-image-pulse-yellow-white 1.2s ease-in-out infinite",t.setAttribute("data-easyquiz-image-highlight","true"),lt.push(t);try{let n=t.parentElement;if(n&&!n.querySelector("[data-easyquiz-capture-badge]")){window.getComputedStyle(n).position==="static"&&(n.style.position="relative");let a=document.createElement("div");a.setAttribute("data-easyquiz-capture-badge","true"),a.textContent="\u{1F4F7} Capturado pela IA",a.style.cssText=`
          position: absolute; top: 4px; left: 4px; z-index: 99999;
          background: rgba(0,0,0,0.75); color: #ffd600; font-size: 10px;
          font-weight: 700; padding: 2px 7px; border-radius: 4px;
          pointer-events: none; font-family: system-ui, sans-serif;
          animation: eq-badge-fade-in 0.3s ease-out;
          box-shadow: 0 1px 4px rgba(0,0,0,0.4);
          letter-spacing: 0.3px;
        `,n.appendChild(a),ct.push(a)}}catch{}}}function ut(o){le(),Kt(),ge=o,o.style.outline="2px solid #00e5ff",o.style.outlineOffset="4px";try{window.getComputedStyle(o).position==="static"&&(o.style.position="relative");let t=document.createElement("div");t.style.cssText=`
      position: absolute; left: 0; right: 0; top: 0; height: 3px;
      background: linear-gradient(90deg, transparent, #00e5ff, #00ff88, #00e5ff, transparent);
      z-index: 99998; pointer-events: none; border-radius: 2px;
      animation: eq-scope-scan 0.8s ease-in-out forwards;
      box-shadow: 0 0 8px rgba(0, 229, 255, 0.6);
    `,o.appendChild(t),fe=t,setTimeout(()=>{try{t.remove()}catch{}fe===t&&(fe=null)},900)}catch{}}function vo(o){return!o||o>=.9?{outline:"#00ff88",bg:"rgba(0, 255, 136, 0.12)",glow:"rgba(0, 255, 136, 0.8)"}:o>=.7?{outline:"#00bfff",bg:"rgba(0, 191, 255, 0.10)",glow:"rgba(0, 191, 255, 0.7)"}:{outline:"#ffaa00",bg:"rgba(255, 170, 0, 0.10)",glow:"rgba(255, 170, 0, 0.7)"}}function jt(o,e){let t=vo(e);for(let n of o){if(n.t==="adv"||n.t==="js")continue;if(n.t==="drag"){try{let h=L(n.from),u=L(n.to);h&&(h.style.outline=`2px solid ${t.outline}`,re.push(h)),u&&(u.style.outline="2px dashed #00e5ff",re.push(u))}catch{}continue}if(!n.id)continue;let i=n.v!==void 0?Array.isArray(n.v)?n.v[0]:String(n.v):"",a=L(n.id,i,n.t==="val"||n.t==="sel")||L(w(n.id),i,n.t==="val"||n.t==="sel");if(!a&&n.t==="sel"){let h=document.body;try{h=K()||document.body}catch{}let u=Array.from(h.querySelectorAll('select, [role="combobox"], [role="listbox"]')).filter(y=>M(y)&&!pe(y)),p=w(n.id).toLowerCase();a=u.find(y=>{let v=(y.id||"").toLowerCase(),g=(y.getAttribute("name")||"").toLowerCase(),b=(y.getAttribute("aria-label")||"").toLowerCase(),m=w(y.closest('.dropdown-row, [class*="dropdown" i], [class*="select" i], tr, label, div')?.textContent||"").toLowerCase();return v.includes(p)||g.includes(p)||b.includes(p)||p.length>=2&&m.includes(p)})||(u.length===1?u[0]:null)}if(!a)continue;let l=typeof HTMLSelectElement<"u"&&a instanceof HTMLSelectElement||a.tagName?.toLowerCase()==="select"||a.getAttribute("role")==="combobox"||a.getAttribute("role")==="listbox",r=a.parentElement?.closest('.dropdown-row, [class*="dropdown" i], [class*="select-row" i], .form-group, tr, li')||a.closest('label, .option-card, [role="radio"], [role="checkbox"], [role="listitem"], .answer, .quiz-option, .form-check, [class*="option" i], [class*="choice" i]')||a;r.style.outline=`2px solid ${t.outline}`,r.style.outlineOffset="2px",r.style.backgroundColor=t.bg,r.setAttribute("data-easyquiz-highlight","true"),re.push(r);let c=l?a:r.querySelector('select, [role="combobox"], [role="listbox"]');c&&(c.style.outline=`2px solid ${t.outline}`,c.style.outlineOffset="2px",c.style.boxShadow=`0 0 10px ${t.glow}`,c.setAttribute("data-easyquiz-highlight","true"),re.push(c));let d=a instanceof HTMLInputElement&&["checkbox","radio"].includes(a.type)?a:r.querySelector('input[type="checkbox"], input[type="radio"]');d&&d!==r&&(d.style.outline=`2px solid ${t.outline}`,d.style.outlineOffset="2px",d.style.boxShadow=`0 0 10px ${t.glow}`,d.setAttribute("data-easyquiz-highlight","true"),re.push(d))}}var pt=10,yo=1400,ht=15e5;function be(o){return new Promise((e,t)=>{let n=new FileReader;n.onerror=()=>t(new Error("Falha ao converter blob para base64.")),n.onload=()=>{let i=String(n.result||"");e(i.split(",")[1]||"")},n.readAsDataURL(o)})}async function Se(o){let e=0,t=0;if(o instanceof HTMLImageElement?(e=o.naturalWidth||o.width,t=o.naturalHeight||o.height):(e=o.width,t=o.height),e<=0||t<=0)throw new Error("Dimens\xF5es inv\xE1lidas.");let n=Math.min(1,yo/Math.max(e,t)),i=Math.max(1,Math.round(e*n)),a=Math.max(1,Math.round(t*n)),l=document.createElement("canvas");l.width=i,l.height=a;let s=l.getContext("2d",{alpha:!1});if(!s)throw new Error("Sem suporte a Canvas 2D.");return s.fillStyle="#ffffff",s.fillRect(0,0,i,a),s.drawImage(o,0,0,i,a),new Promise((r,c)=>{l.toBlob(d=>d?r(d):c(new Error("Falha na compress\xE3o.")),"image/jpeg",.88)})}async function xo(o){let e=typeof o.getBoundingClientRect=="function"?o.getBoundingClientRect():{width:0,height:0},t=e.width||parseFloat(o.getAttribute("width")||"0")||parseFloat(o.style.width||"0")||400,n=e.height||parseFloat(o.getAttribute("height")||"0")||parseFloat(o.style.height||"0")||300,i=2,a=Math.min(1800,Math.max(120,Math.round(t*i))),l=Math.min(1800,Math.max(100,Math.round(n*i))),s=o.cloneNode(!0);s.getAttribute("xmlns")||s.setAttribute("xmlns","http://www.w3.org/2000/svg"),s.setAttribute("width",String(a)),s.setAttribute("height",String(l)),!s.getAttribute("viewBox")&&t>0&&n>0&&s.setAttribute("viewBox",`0 0 ${t} ${n}`);let c=new XMLSerializer().serializeToString(s),d=new Blob([c],{type:"image/svg+xml;charset=utf-8"}),h=URL.createObjectURL(d);try{let u=new Image;u.crossOrigin="anonymous",await new Promise((y,v)=>{u.onload=()=>y(),u.onerror=()=>v(new Error("Falha ao renderizar SVG em Image.")),u.src=h});let p=document.createElement("canvas");p.width=a,p.height=l;let f=p.getContext("2d",{alpha:!1});if(!f)throw new Error("Sem suporte a Canvas 2D.");return f.fillStyle="#ffffff",f.fillRect(0,0,a,l),f.drawImage(u,0,0,a,l),new Promise((y,v)=>{p.toBlob(g=>g?y(g):v(new Error("Falha na compress\xE3o do SVG.")),"image/jpeg",.92)})}finally{URL.revokeObjectURL(h)}}async function mt(o){try{let e=o.cloneNode(!0),t=o.offsetWidth||500,n=o.offsetHeight||500,i=`
      <svg xmlns="http://www.w3.org/2000/svg" width="${t}" height="${n}">
        <foreignObject width="100%" height="100%">
          <div xmlns="http://www.w3.org/1999/xhtml" style="background:#fff;font-family:sans-serif;">
            ${e.innerHTML}
          </div>
        </foreignObject>
      </svg>
    `,a=new Blob([i],{type:"image/svg+xml;charset=utf-8"}),l=URL.createObjectURL(a),s=new Image;s.crossOrigin="anonymous",await new Promise((d,h)=>{s.onload=()=>d(),s.onerror=()=>h(new Error("Falha ao renderizar ForeignObject.")),s.src=l});let r=await Se(s),c=await be(r);if(URL.revokeObjectURL(l),c&&c.length<=ht)return{mediaType:"image/jpeg",base64:c,alt:"Captura via rasteriza\xE7\xE3o DOM",source:"rasterized"}}catch(e){console.warn("Falha na rasteriza\xE7\xE3o do n\xF3:",e)}return null}function wo(o,e){let t=o.closest('[data-easyquiz-id], button, [role="button"], [role="radio"], [role="checkbox"], [role="option"], label, .option-card, .quiz-option, .choice, .answer, [class*="option" i], [class*="choice" i], [class*="answer" i], li, tr');if(t&&t!==e&&M(t)&&!te(t)&&!O(t)){let a=t.dataset.easyquizId||t.id||void 0,l=z(t.innerText||t.textContent||"",120),s=t.getAttribute("aria-label")||t.getAttribute("title")||"",r=l||s,c=a?` [id: ${a}]`:"";if(r)return{associatedLabel:`Alternativa/Op\xE7\xE3o: "${r}"${c}`,targetControlId:a};if(a)return{associatedLabel:`Alternativa/Op\xE7\xE3o ${c}`,targetControlId:a}}let n=o.closest("figure")?.querySelector("figcaption")?.textContent?.trim();if(n)return{associatedLabel:`Figura do Enunciado: "${z(n,100)}"`};let i=o.closest('[class*="prompt" i], [class*="stimulus" i], [class*="question-text" i], [class*="statement" i], header, h1, h2, h3, h4, p');if(i){let a=z(i.textContent||"",80);if(a)return{associatedLabel:`Gr\xE1fico do Enunciado: "${a}"`}}return{associatedLabel:"Gr\xE1fico/Imagem do Enunciado Principal"}}async function qo(o){let e=o.currentSrc||o.src;if(!e)return null;let t=(o.alt||o.getAttribute("aria-label")||"Imagem da quest\xE3o").slice(0,500);if(o.complete&&o.naturalWidth>0)try{let n=await Se(o),i=await be(n);if(i&&i.length<=ht)return{mediaType:"image/jpeg",base64:i,alt:t,source:e.slice(0,2e3)}}catch{}try{let n=await fetch(e,{mode:"cors"});if(n.ok){let i=await n.blob();if(i.type.startsWith("image/")){let a=await createImageBitmap(i),l=await Se(a);a.close();let s=await be(l);if(s&&s.length<=ht)return{mediaType:"image/jpeg",base64:s,alt:t,source:e.slice(0,2e3)}}}}catch{return mt(o.parentElement||o)}return null}function Eo(o){return o.querySelectorAll("path, line, polyline, polygon, circle, rect, text, image").length>0}function Co(o){try{let e=o.style.backgroundImage||(window.getComputedStyle?window.getComputedStyle(o).backgroundImage:"");if(e&&e.includes("url(")){let t=e.match(/url\(["']?([^"')]+)["']?\)/);if(t&&t[1]&&!t[1].startsWith("data:image/svg+xml"))return t[1]}}catch{}return null}async function gt(o,e=!0){if(!e)return[];let t=[],n=0,i=35e5,a=(r,c)=>{if(!r||!r.base64||n+r.base64.length>i)return!1;let d=wo(c,o);return r.associatedLabel=d.associatedLabel,r.targetControlId=d.targetControlId,r.element=c,t.push(r),n+=r.base64.length,t.length>=pt},l=Array.from(o.querySelectorAll("img")).filter(r=>M(r)&&!O(r));for(let r of l)try{let c=await qo(r);if(a(c,r))return t}catch{}let s=Array.from(o.querySelectorAll("svg")).filter(r=>{if(!M(r)||O(r))return!1;let c=typeof r.getBoundingClientRect=="function"?r.getBoundingClientRect():{width:0,height:0},d=c.width||parseFloat(r.getAttribute("width")||"0"),h=c.height||parseFloat(r.getAttribute("height")||"0");return d<30||h<30?!1:Eo(r)});for(let r of s)try{let c=await xo(r),d=await be(c);if(d){let h={mediaType:"image/jpeg",base64:d,alt:r.getAttribute("aria-label")||"Gr\xE1fico/Diagrama vetorial da quest\xE3o",source:"svg"};if(a(h,r))return t}}catch{let c=await mt(r.parentElement||r);if(a(c,r))return t}if(t.length<pt){let r=Array.from(o.querySelectorAll("canvas")).filter(c=>M(c)&&!O(c));for(let c of r)try{let d=await Se(c),h=await be(d);if(h){let u={mediaType:"image/jpeg",base64:h,alt:c.getAttribute("aria-label")||"Gr\xE1fico Canvas inline",source:"canvas"};if(a(u,c))return t}}catch{let d=await mt(c.parentElement||c);if(a(d,c))return t}}if(t.length<pt){let r=Array.from(o.querySelectorAll('[style*="background-image"], .option-image, .question-media')).filter(c=>M(c)&&!O(c));for(let c of r){let d=Co(c);if(d)try{let h=await fetch(d,{mode:"cors"});if(h.ok){let u=await h.blob();if(u.type.startsWith("image/")){let p=await createImageBitmap(u),f=await Se(p);p.close();let y=await be(f);if(y){let v={mediaType:"image/jpeg",base64:y,alt:"Imagem de fundo da alternativa",source:d.slice(0,2e3)};if(a(v,c))return t}}}}catch{}}}return t}function To(o,e=""){if(typeof document>"u")return!1;let t=o||document.body,n=(e+" "+(t.textContent||"")).toLowerCase();return!!t.querySelector('.celebration-icon, [class*="celebrat" i], [class*="conclu" i], [class*="finish" i], [class*="result" i], [class*="score-screen" i], [data-testid*="completion" i], [data-functional-selector*="game-over" i], .perseus-message-renderer, [data-congratulations]')&&(n.includes("parab\xE9ns")||n.includes("conclu")||n.includes("finaliz")||n.includes("resultado")||n.includes("pontua")||n.includes("sucesso")||n.includes("\u{1F3C6}")||n.includes("game over")||n.includes("great job"))?!0:["parab\xE9ns! lista de exerc\xEDcios conclu\xEDda","exerc\xEDcios conclu\xEDda","lista de exerc\xEDcios conclu\xEDda","atividade conclu\xEDda","atividade finalizada","finalizado com sucesso","finalizada com sucesso","simulado conclu\xEDdo","simulado finalizado","question\xE1rio conclu\xEDdo","question\xE1rio finalizado","voc\xEA concluiu a atividade","voc\xEA concluiu o question\xE1rio","sua resposta foi registrada","todas as perguntas foram respondidas","quiz completed","exercise completed","activity completed","all questions answered","view results","game over","leaderboard","scoreboard","awesome","great job","you got it right","mission complete","your response has been recorded","sua resposta foi registrada"].some(l=>n.includes(l))}var Ve=class{active=!1;callbacks;isProcessing=!1;observer=null;mutationTimer=null;heartbeatTimer=null;abortController=null;errorCount=0;resolvedSigs=new Set;lastContentSig="";lastAttemptSig="";lastAttemptTime=0;constructor(e){this.callbacks=e}isActive(){return this.active}start(){this.active||(this.active=!0,this.callbacks.onStatusChange("waiting","> [SYS] Autopilot ENGAGED. Monitorando..."),typeof MutationObserver<"u"&&(this.observer=new MutationObserver(()=>{!this.active||this.isProcessing||(this.mutationTimer&&clearTimeout(this.mutationTimer),this.mutationTimer=window.setTimeout(()=>{this.mutationTimer=null,this.isProcessing||this.checkAndAnalyze()},120))}),this.observer.observe(document.body,{subtree:!0,childList:!0,characterData:!0,attributes:!0})),this.scheduleHeartbeat(),this.checkAndAnalyze())}stop(){if(this.active=!1,this.abortController){try{this.abortController.abort()}catch{}this.abortController=null}this.mutationTimer&&(clearTimeout(this.mutationTimer),this.mutationTimer=null),this.heartbeatTimer&&(clearTimeout(this.heartbeatTimer),this.heartbeatTimer=null),this.observer?.disconnect(),this.observer=null,this.isProcessing=!1,this.resolvedSigs.clear(),this.callbacks.onStatusChange("idle","> [SYS] Autopilot DESATIVADO pelo usu\xE1rio.","text-yellow")}scheduleHeartbeat(){this.heartbeatTimer&&clearTimeout(this.heartbeatTimer),this.heartbeatTimer=window.setTimeout(()=>{this.heartbeatTimer=null,this.active&&!this.isProcessing&&this.checkAndAnalyze(),this.active&&this.scheduleHeartbeat()},2e3)}sleep(e){return new Promise(t=>{if(!this.active)return t();let n=null,i=()=>{n&&clearTimeout(n),t()};n=window.setTimeout(t,e),this.abortController?.signal.addEventListener("abort",i,{once:!0})})}async checkAndAnalyze(){if(!(!this.active||this.isProcessing))try{this.isProcessing=!0;let e=Le(!1);if(e||(e=he()),!this.active)return;if(!e){this.callbacks.onStatusChange("waiting","> [SYS] Monitorando p\xE1gina... Aguardando elementos.");return}if(To(e.scope,e.questionText)){this.callbacks.onStatusChange("idle","> [SYS] \u{1F3C6} Atividade conclu\xEDda! Autopilot finalizado.","text-green"),this.stop();return}if(this.callbacks.isManualModeActive?.()){this.callbacks.onStatusChange("waiting","> [SYS] Gabarito manual ativo. Aguardando voc\xEA avan\xE7ar...","text-yellow");return}let t=Nt(e);if(this.resolvedSigs.has(t))return;let n=Date.now();if(t===this.lastAttemptSig&&n-this.lastAttemptTime<3e3)return;t!==this.lastContentSig&&this.lastContentSig!==""&&(this.callbacks.onStatusChange("waiting","> [SYS] Nova quest\xE3o detectada! Analisando...","text-green"),this.callbacks.onPageAdvance?.(),this.errorCount=0),this.lastContentSig=t,this.lastAttemptSig=t,this.lastAttemptTime=n;let a=e.controls.filter(s=>s.role==="answer"),l=ye(window.location.hostname);if(a.length>0){if(this.callbacks.onStatusChange("analyzing","> [IA] Quest\xE3o detectada. Consultando IA...","text-blue"),!this.active)return;this.abortController=new AbortController;let s=await this.callbacks.onRequestAnalysis(1,this.abortController.signal);if(this.abortController=null,!this.active)return;if(s){if(this.callbacks.onStatusChange("analyzing",`> [IA] (${s.usedModel||"gemini"}) Confian\xE7a: ${(s.confidence*100).toFixed(1)}% | Modo: ${s.mode}`,"text-blue"),this.callbacks.onStatusChange("analyzing",`> [IA] Racioc\xEDnio: ${s.rationale}`,"text-blue"),this.callbacks.onStatusChange("analyzing",`> [IA] A\xE7\xF5es: ${s.actions.length}`,"text-blue"),this.errorCount=0,s.memoryToStore&&this.callbacks.onStatusChange("analyzing",`> [IA] \u{1F9E0} Mem\xF3ria RAG: "${s.memoryToStore}"`,"text-yellow"),s.pageType==="conclusion"){this.callbacks.onStatusChange("idle","> [SYS] Atividade conclu\xEDda! Desligando Autopilot.","text-green"),this.stop();return}this.resolvedSigs.add(t)}else{this.errorCount++;let r=this.errorCount===1?5e3:8e3;this.callbacks.onStatusChange("waiting",`> [AVISO] Falha na an\xE1lise (${this.errorCount}/3). Aguardando ${r/1e3}s...`,"text-yellow"),await this.sleep(r),this.lastAttemptTime=0}}else if(l.advanceSelector&&L(l.advanceSelector)&&e.questionText.length<50){let s=L(l.advanceSelector);if(s){if(this.callbacks.onStatusChange("advancing",`> [BRUTE] Avan\xE7ando via cache "${l.advanceSelector}"...`),await this.sleep(800),!this.active)return;J(s),this.resolvedSigs.add(t),this.errorCount=0}}else{if(this.callbacks.onStatusChange("analyzing","> [IA] P\xE1gina informativa detectada. Consultando IA...","text-blue"),!this.active)return;this.abortController=new AbortController;let s=await this.callbacks.onRequestAnalysis(1,this.abortController.signal);if(this.abortController=null,!this.active)return;if(s){if(this.callbacks.onStatusChange("analyzing",`> [IA] (${s.usedModel||"gemini"}) Tipo: ${s.pageType} | Modo: ${s.mode}`,"text-blue"),this.callbacks.onStatusChange("analyzing",`> [IA] Racioc\xEDnio: ${s.rationale}`,"text-blue"),s.memoryToStore&&this.callbacks.onStatusChange("analyzing",`> [IA] \u{1F9E0} Absorvido: "${s.memoryToStore}"`,"text-yellow"),s.pageType==="info")this.callbacks.onStatusChange("advancing","> [IA] \u{1F4D6} Leitura conclu\xEDda. Avan\xE7ando...","text-green"),await this.sleep(1200);else if(s.pageType==="start")this.callbacks.onStatusChange("advancing","> [SYS] In\xEDcio detectado. Iniciando...","text-blue"),await this.sleep(1200);else if(s.pageType==="conclusion"){this.callbacks.onStatusChange("idle","> [SYS] Atividade conclu\xEDda! Desligando Autopilot.","text-green"),this.stop();return}this.errorCount=0,this.resolvedSigs.add(t)}else{this.errorCount++;let r=this.errorCount===1?5e3:8e3;this.callbacks.onStatusChange("waiting",`> [AVISO] Falha ao processar p\xE1gina (${this.errorCount}/3). Aguardando ${r/1e3}s...`,"text-yellow"),await this.sleep(r)}}if(this.errorCount>=3){this.callbacks.onStatusChange("error","> [ERRO] 3 falhas consecutivas. Abortando Autopilot.","text-red"),this.callbacks.onStatusChange("waiting","> [DICA] Verifique o [ERRO DETALHADO] acima para o motivo exato.","text-yellow"),this.stop();return}}catch(e){if(!this.active)return;let t=e instanceof Error?e.message:String(e);if(t.includes("cancelada")||t.includes("aborted"))return;console.warn("[EasyQuiz Autopilot]",e),this.callbacks.onStatusChange("error",`> [ERRO NO AUTOPILOT] ${t}`,"text-red")}finally{this.abortController=null,this.isProcessing=!1,this.active&&window.setTimeout(()=>void this.checkAndAnalyze(),150)}}};var C={logo:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.8L19.2 8 12 11.2 4.8 8 12 4.8zM4 9.6l7 3.1v7.5l-7-3.5V9.6zm9 10.6v-7.5l7-3.1v7.1l-7 3.5z"/></svg>',rocket:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M13.13 2.81a.5.5 0 0 0-.46-.07c-.42.15-2.08.79-3.9 2.61-2.04 2.04-2.6 4.09-2.73 4.96l-.97.98a1 1 0 0 0-.29.71v2.12a1 1 0 0 0 .29.71l2.83 2.83a1 1 0 0 0 .71.29h2.12a1 1 0 0 0 .71-.29l.98-.97c.87-.13 2.92-.69 4.96-2.73 1.82-1.82 2.46-3.48 2.61-3.9a.5.5 0 0 0-.07-.46l-6.79-6.79zM4.5 16.5l-2.09 2.09a.5.5 0 0 0 .35.85h3.04l.35.35v3.04a.5.5 0 0 0 .85.35L9.09 21.1l-4.59-4.6z"/></svg>',play:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>',stop:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h12v12H6z"/></svg>',code:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>',terminal:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8h16v10zm-12-3l3-3-3-3 1.4-1.4L13.8 12l-4.4 4.4L8 15zm6 0h4v2h-4v-2z"/></svg>',inspector:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>',settings:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.49.49 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>',key:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M7 14c-2.76 0-5-2.24-5-5s2.24-5 5-5c2.42 0 4.44 1.72 4.9 4H22v4h-2v3h-3v-3h-2v3h-3v-3h-2.1c-.46 2.28-2.48 4-4.9 4zm0-7c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>',paste:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 2h-4.18C14.4 .84 13.3 0 12 0c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm7 18H5V4h2v3h10V4h2v16z"/></svg>',edit:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>',trash:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>',eraser:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M15.14 3c-.51 0-1.02.2-1.41.59L2.59 14.73c-.78.78-.78 2.05 0 2.83L6.44 21.4c.78.78 2.05.78 2.83 0l11.14-11.14c.78-.78.78-2.05 0-2.83l-3.86-3.84c-.39-.39-.9-.59-1.41-.59zm.71 2.71l3.15 3.15-3.15 3.15-3.15-3.15 3.15-3.15zm-4.57 4.57l3.15 3.15-4.57 4.57H6.71l-3-3 7.57-7.57z"/></svg>',save:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/></svg>',analyze:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L3 14h8l-2 8 12-12h-8l2-8z"/></svg>',apply:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>',close:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>',chevronRight:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>',chevronLeft:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>',eye:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>',eyeOff:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.44-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.17c0-1.66-1.34-3-3-3l-.17.02z"/></svg>',check:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>',clock:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>',copy:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>',refresh:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg>',chip:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4h12v16H6V4zm2 2v12h8V6H8zm-4 3h2v2H4V9zm0 4h2v2H4v-2zm16-4h2v2h-2V9zm0 4h2v2h-2v-2zM9 2h2v2H9V2zm4 0h2v2h-2V2zm-4 18h2v2H9v-2zm4 0h2v2h-2v-2z"/></svg>',moreVertical:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>',minimize:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M19 13H5v-2h14v2z"/></svg>',maximize:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/></svg>',dragHandle:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M10 9h4V6h-4v3zm0 5h4v-3h-4v3zm0 5h4v-3h-4v3zM4 9h4V6H4v3zm0 5h4v-3H4v3zm0 5h4v-3H4v3zm12-10V6h4v3h-4zm0 5h4v-3h-4v3zm0 5h4v-3h-4v3z"/></svg>',list:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/></svg>',folderTree:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6 10H6v-2h8v2zm4-4H6v-2h12v2z"/></svg>',folder:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/></svg>',file:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>',stopwatch:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M15 1H9v2h6V1zm-4 13h2V8h-2v6zm8.03-6.61l1.42-1.42c-.43-.51-.9-.99-1.41-1.41l-1.42 1.42A8.962 8.962 0 0 0 12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9a8.994 8.994 0 0 0 7.03-14.61zM12 20c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"/></svg>',plus:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>',listPlus:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h8v-2H7v2zm0 4h8v-2H7v2zM7 7v2h8V7H7zm11 6h-2v2h-2v2h2v2h2v-2h2v-2h-2v-2z"/></svg>',sparkles:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M9 21l-2.5-5.5L1 13l5.5-2.5L9 5l2.5 5.5L17 13l-5.5 2.5L9 21zm9.5-12.5l-1.5-3.5-3.5-1.5 3.5-1.5 1.5-3.5 1.5 3.5 3.5 1.5-3.5 1.5-1.5 3.5z"/></svg>'};var _e=class{element=null;shadow;isMinimized=!1;currentPlan=null;isDragging=!1;dragStartX=0;dragStartY=0;initialLeft=25;initialTop=25;onAdvanceCallback;constructor(e,t){this.shadow=e,this.onAdvanceCallback=t,this.initGlobalListeners()}initGlobalListeners(){window.addEventListener("popstate",()=>this.handlePageNavigated()),window.addEventListener("hashchange",()=>this.handlePageNavigated()),document.addEventListener("click",e=>{if(!this.isOpen())return;let t=e.target;if(!t||this.shadow.contains(t)||t.closest("#easyquiz-shadow-root"))return;let n=t.closest('button, [role="button"], a, input[type="submit"]');if(n){let i=(n.textContent||n.value||"").toLowerCase();/pr[oó]xim|avan[cç]|continu|verific|enviar|submit|confirm|checar|validar|next/i.test(i)&&setTimeout(()=>{this.isOpen()&&this.handlePageNavigated()},800)}},!0)}handlePageNavigated(){this.isOpen()&&(this.hide(),this.onAdvanceCallback?.())}isOpen(){return this.element!==null&&this.element.style.display!=="none"}show(e){this.currentPlan=e,this.element||this.createElement(),this.renderContent(),this.element&&(this.element.style.display="flex")}hide(){this.element&&(this.element.style.display="none")}minimize(){this.isMinimized=!0,this.element&&this.element.classList.add("minimized")}restore(){this.isMinimized=!1,this.element&&this.element.classList.remove("minimized")}createElement(){this.element=document.createElement("div"),this.element.className="eq-floating-hud",this.element.style.left=`${this.initialLeft}px`,this.element.style.top=`${this.initialTop}px`,this.element.innerHTML=`
      <!-- P\xEDlula compacta quando minimizado -->
      <div class="eq-fah-pill" id="eq-fah-pill" title="Clique para expandir gabarito interativo">
        <span class="eq-fah-pill-icon">${C.list}</span>
        <span id="eq-fah-pill-text">Gabarito Manual</span>
        <span class="eq-fah-pill-badge" id="eq-fah-pill-badge">0</span>
      </div>

      <!-- Cabe\xE7alho com barra de arraste -->
      <div class="eq-fah-header" id="eq-fah-header">
        <div class="eq-fah-title">
          <span style="display:flex; align-items:center;">${C.dragHandle}</span>
          <span>Gabarito Manual Interativo</span>
        </div>
        <div class="eq-fah-actions">
          <button class="eq-fah-btn" id="eq-fah-copy-md-btn" title="Copiar tudo formatado em Markdown">${C.copy}</button>
          <button class="eq-fah-btn" id="eq-fah-min-btn" title="Minimizar para p\xEDlula flutuante">${C.minimize}</button>
          <button class="eq-fah-btn" id="eq-fah-close-btn" title="Fechar gabarito">${C.close}</button>
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
    `,this.shadow.appendChild(this.element),this.element.querySelector("#eq-fah-pill").addEventListener("click",()=>this.restore()),this.element.querySelector("#eq-fah-min-btn").addEventListener("click",()=>this.minimize()),this.element.querySelector("#eq-fah-close-btn").addEventListener("click",()=>this.hide());let i=this.element.querySelector("#eq-fah-copy-md-btn");i.addEventListener("click",()=>this.copyMarkdownToClipboard(i));let a=this.element.querySelector("#eq-fah-copy-all-btn");a.addEventListener("click",()=>this.copyMarkdownToClipboard(a));let l=this.element.querySelector("#eq-fah-header");this.setupDraggable(l)}setupDraggable(e){let t=n=>{if(n.target.closest(".eq-fah-btn"))return;n.preventDefault(),this.isDragging=!0,this.dragStartX=n.clientX,this.dragStartY=n.clientY;let i=this.element.getBoundingClientRect();this.initialLeft=i.left,this.initialTop=i.top;let a=s=>{if(!this.isDragging||!this.element)return;let r=s.clientX-this.dragStartX,c=s.clientY-this.dragStartY,d=Math.max(10,window.innerWidth-this.element.offsetWidth-10),h=Math.max(10,window.innerHeight-this.element.offsetHeight-10),u=Math.min(Math.max(10,this.initialLeft+r),d),p=Math.min(Math.max(10,this.initialTop+c),h);this.element.style.left=`${u}px`,this.element.style.top=`${p}px`},l=()=>{this.isDragging=!1,window.removeEventListener("mousemove",a),window.removeEventListener("mouseup",l)};window.addEventListener("mousemove",a),window.addEventListener("mouseup",l)};e.addEventListener("mousedown",t)}renderContent(){if(!this.element||!this.currentPlan)return;let e=this.element.querySelector("#eq-fah-body"),t=this.element.querySelector("#eq-fah-pill-text"),n=this.element.querySelector("#eq-fah-pill-badge");e.innerHTML="";let i=this.currentPlan,a=i.actions.filter(p=>p.t==="drag"),l=i.actions.filter(p=>{if(p.t!=="val")return!1;let f=w(p.id||"").toLowerCase();return!/continu|avan[cç]|pr[oó]xim|submet|enviar|check|verific/i.test(f)}),s=i.actions.filter(p=>p.t==="clk"||p.t==="chk"),r=i.actions.filter(p=>p.t==="sel"),c=a.length||l.length||s.length||r.length,d=document.createElement("div");d.className="eq-fah-meta";let h=document.createElement("span");h.textContent=`Modo: ${i.mode.replace("_"," ")}`;let u=document.createElement("span");if(u.className="eq-fah-meta-badge",u.textContent=`${Math.round(i.confidence*100)}% Confian\xE7a`,d.append(h,u),e.appendChild(d),a.length>0||i.mode==="categorizacao"||i.mode==="arrastar_soltar"){t.textContent=`Categoriza\xE7\xE3o (${a.length} itens)`,n.textContent=String(a.length);let p={};for(let f of a){let y=w(f.to)||"Geral";p[y]||(p[y]=[]),p[y].push(w(f.from))}for(let[f,y]of Object.entries(p)){let v=document.createElement("div"),g=/fato|true|verdadeiro|sim/i.test(f),b=/opini[aã]o|false|falso|n[aã]o/i.test(f);v.className=`eq-fah-group ${g?"group-fato":b?"group-opiniao":""}`;let m=document.createElement("div");m.className="eq-fah-group-title",m.textContent=`\u{1F4C1} ${f} (${y.length})`,v.appendChild(m);let x=document.createElement("div");x.className="eq-fah-group-items";for(let T of y){let A=document.createElement("div");A.className="eq-fah-item";let q=document.createElement("span");q.className="eq-fah-item-text",q.textContent=T,A.appendChild(q);let E=document.createElement("button");E.className="eq-fah-copy-inline",E.textContent="Copiar",E.addEventListener("click",()=>{navigator.clipboard.writeText(T),E.textContent="\u2713 Copiado",setTimeout(()=>E.textContent="Copiar",1200)}),A.appendChild(E),x.appendChild(A)}v.appendChild(x),e.appendChild(v)}}else if(l.length>0){t.textContent=`Preenchimento (${l.length} campos)`,n.textContent=String(l.length);let p=document.createElement("div");p.className="eq-fah-group";let f=document.createElement("div");f.className="eq-fah-group-title",f.textContent="\u{1F4DD} Respostas para os Campos de Texto:",p.appendChild(f);let y=document.createElement("div");y.className="eq-fah-group-items";for(let v=0;v<l.length;v++){let g=l[v],b=document.createElement("div");b.className="eq-fah-item";let m=Me(g.id);(!m||/^[#\.\$]|input|mat-|cell|field|q[0-9]|eq-/i.test(m))&&(m=`Campo ${v+1}`);let x=String(g.v??""),T=document.createElement("div");T.className="eq-fah-field-box";let A=document.createElement("div");A.className="eq-fah-field-label",A.textContent=m,T.appendChild(A);let q=document.createElement("div");q.className="eq-fah-field-val",q.textContent=x,T.appendChild(q),b.appendChild(T);let E=document.createElement("button");E.className="eq-fah-copy-inline",E.textContent="Copiar",E.addEventListener("click",()=>{navigator.clipboard.writeText(x),E.textContent="\u2713 Copiado",setTimeout(()=>E.textContent="Copiar",1200)}),b.appendChild(E),y.appendChild(b)}p.appendChild(y),e.appendChild(p)}else if(s.length>0){t.textContent=`Op\xE7\xF5es (${s.length} marcadas)`,n.textContent=String(s.length);let p=document.createElement("div");p.className="eq-fah-group";let f=document.createElement("div");f.className="eq-fah-group-title",f.textContent="\u{1F3AF} Alternativa(s) Correta(s):",p.appendChild(f);let y=document.createElement("div");y.className="eq-fah-group-items";for(let v=0;v<s.length;v++){let g=s[v],b=document.createElement("div");b.className="eq-fah-item";let m=Me(g.id);(!m||/^(eq-|#|\$|\.|input_|mat-|choice_|radio_|chk_)/i.test(m))&&g.v&&(m=String(g.v)),m=w(m),/^(eq-|#|\$|\.|input_|mat-|choice_|radio_|chk_)/i.test(m)&&(m="");let x="",T=m.match(/^(\([A-Za-z0-9]\)|[A-Za-z0-9][\)\.\:\-])\s*(.*)$/);T?(x=T[1].replace(/[\(\)\.\:\-\s]/g,"").toUpperCase(),m=T[2].trim()||m):s.length>1&&(x=String.fromCharCode(65+v));let A=document.createElement("div");if(A.style.display="flex",A.style.alignItems="center",A.style.gap="8px",A.style.flex="1",x){let H=document.createElement("span");H.className="eq-fah-letter-badge",H.textContent=x,A.appendChild(H)}let q=document.createElement("span");q.className="eq-fah-item-text",q.textContent=m||(x?`Alternativa ${x}`:"Alternativa Selecionada"),A.appendChild(q),b.appendChild(A);let E=document.createElement("button");E.className="eq-fah-copy-inline",E.textContent="Copiar",E.addEventListener("click",()=>{navigator.clipboard.writeText(m||x),E.textContent="\u2713 Copiado",setTimeout(()=>E.textContent="Copiar",1200)}),b.appendChild(E),y.appendChild(b)}p.appendChild(y),e.appendChild(p)}else if(r.length>0){t.textContent=`Sele\xE7\xE3o (${r.length} listas)`,n.textContent=String(r.length);let p=document.createElement("div");p.className="eq-fah-group";let f=document.createElement("div");f.className="eq-fah-group-title",f.textContent="\u{1F4CB} Op\xE7\xF5es para Selecionar na Lista:",p.appendChild(f);let y=document.createElement("div");y.className="eq-fah-group-items";for(let v=0;v<r.length;v++){let g=r[v],b=document.createElement("div");b.className="eq-fah-item";let m=Me(g.id);(!m||/^[#\.\$]|select|input|mat-|cell|field|q[0-9]|eq-/i.test(m))&&(m=`Lista ${v+1}`);let A=(Array.isArray(g.v)?g.v:[String(g.v??"")]).map(V=>{let B=L(g.id,void 0,!0)||L(w(g.id),void 0,!0),_=B instanceof HTMLSelectElement?B:B?.querySelector("select");if(_){let ce=w(V).toLowerCase();for(let S=0;S<_.options.length;S++){let I=_.options[S];if(I.value.toLowerCase()===ce||w(I.textContent).toLowerCase()===ce){let $=w(I.textContent);if($&&!$.toLowerCase().includes("selecione"))return $}}}return V}).join(", "),q=document.createElement("div");q.className="eq-fah-field-box";let E=document.createElement("div");E.className="eq-fah-field-label",E.textContent=m,q.appendChild(E);let H=document.createElement("div");H.className="eq-fah-field-val",H.textContent=A,q.appendChild(H),b.appendChild(q);let R=document.createElement("button");R.className="eq-fah-copy-inline",R.textContent="Copiar",R.addEventListener("click",()=>{navigator.clipboard.writeText(A),R.textContent="\u2713 Copiado",setTimeout(()=>R.textContent="Copiar",1200)}),b.appendChild(R),y.appendChild(b)}p.appendChild(y),e.appendChild(p)}else{t.textContent="Gabarito",n.textContent="0";let p=document.createElement("div");p.style.padding="10px",p.style.color="#888",p.textContent="Nenhuma resposta direta para exibir.",e.appendChild(p)}if(i.rationale){let p=document.createElement("div");p.className="eq-fah-rationale",p.textContent=`\u{1F4A1} Racioc\xEDnio da IA: ${i.rationale}`,e.appendChild(p)}}generateMarkdown(){if(!this.currentPlan)return"";let e=this.currentPlan,t=[];t.push("# Gabarito da Quest\xE3o \u2014 EasyQuiz Pro"),t.push(`- **Modo:** ${e.mode}`),t.push(`- **Confian\xE7a:** ${(e.confidence*100).toFixed(0)}%`),t.push("");let n=e.actions.filter(s=>s.t==="drag"),i=e.actions.filter(s=>s.t==="val"),a=e.actions.filter(s=>s.t==="clk"||s.t==="chk"),l=e.actions.filter(s=>s.t==="sel");if(n.length>0){t.push("## \u{1F4C2} Categoriza\xE7\xE3o:");let s={};for(let r of n){let c=w(r.to)||"Geral";s[c]||(s[c]=[]),s[c].push(w(r.from))}for(let[r,c]of Object.entries(s)){t.push(`### Categoria: ${r}`);for(let d of c)t.push(`- ${d}`);t.push("")}}else if(i.length>0){t.push("## \u270F\uFE0F Respostas para Preenchimento:");for(let s of i){let r=w(s.id);t.push(`- **${r||"Campo"}:** \`${s.v}\``)}t.push("")}else if(a.length>0){t.push("## \u2705 Alternativas Corretas:");for(let s=0;s<a.length;s++){let r=a[s],c=Me(r.id);(!c||/^(eq-|#|\$|\.|input_|mat-|choice_|radio_|chk_)/i.test(c))&&r.v&&(c=String(r.v)),c=w(c),/^(eq-|#|\$|\.|input_|mat-|choice_|radio_|chk_)/i.test(c)&&(c="");let d=a.length>1?`${String.fromCharCode(65+s)}) `:"";t.push(`- [x] ${d}${c||"Alternativa "+String.fromCharCode(65+s)}`)}t.push("")}else if(l.length>0){t.push("## \u{1F4CB} Op\xE7\xF5es Selecionadas em Lista:");for(let s of l){let r=w(s.id)||"Lista",c=Array.isArray(s.v)?s.v.join(", "):String(s.v??"");t.push(`- **${r}:** \`${c}\``)}t.push("")}return e.rationale&&(t.push("---"),t.push(`**\u{1F4A1} Racioc\xEDnio:** ${e.rationale}`)),t.join(`
`)}copyMarkdownToClipboard(e){let t=this.generateMarkdown();t&&navigator.clipboard.writeText(t).then(()=>{let n=e.innerHTML;e.id==="eq-fah-copy-md-btn"?e.innerHTML='<span style="font-size:10px; color:#00ffcc; font-weight:bold;">\u2713</span>':e.innerHTML="\u2713 Copiado!",setTimeout(()=>{e.innerHTML=n},1500)})}};var Gt=`
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
`;var Ao=[{value:"",label:"Detec\xE7\xE3o Autom\xE1tica"},{value:"escolha_unica",label:"M\xFAltipla Escolha (\xDAnica)"},{value:"escolha_multipla",label:"M\xFAltipla Escolha (V\xE1rias)"},{value:"categorizacao",label:"Categoriza\xE7\xE3o / Grupos"},{value:"arrastar_soltar",label:"Arrastar e Soltar (Drag & Drop)"},{value:"ordenacao",label:"Ordena\xE7\xE3o / Sequ\xEAncia"},{value:"verdadeiro_falso",label:"Verdadeiro / Falso"},{value:"texto_livre",label:"Texto Livre / Dissertativa"},{value:"preenchimento",label:"Preenchimento de Lacunas"}],Lo=[{value:"smart",label:"Inteligente (Auto-H\xEDbrido)"},{value:"command",label:"Apenas Comando (Seguro)"},{value:"javascript",label:"Apenas JS Nativo (Avan\xE7ado)"}],Ke=class{host;shadow;callbacks;autopilot;floatingAnswers;initialSettings;isCollapsed=!1;activeTab="resolver";isBusy=!1;stopwatchInterval=null;stopwatchStartTime=0;latestPlan=null;latestContext=null;latestPromptText="";metricsLiveTime;metricsLiveStatus;metricsTotalBadge;metricTotalTime;metricAvgTime;metricTotalCount;metricsHistoryList;metricsHistoryCount;metricsCopyBtn;metricsResetBtn;currentQuestionStartTime=0;questionLiveTimerInterval=null;liveDebugTerminal;dbgModel;dbgLatency;dbgSplitTokens;dbgTotalTokens;dbgErrorCard;dbgErrorText;dbgPromptLen;dbgPromptView;dbgContextView;dbgRawRespView;dbgCountAll;dbgCountError;dbgCountAi;dbgCountDom;logEntries=[];activeLogFilter="all";autoScrollLogs=!0;lastErrorMsg=null;_autopilotAnalyzingShown=!1;progressContainer;progressBar;progressLabel;progressVal;contextTreeContainer;launcherBtn;launcherDot;dockToggleBtn;sidebarEl;apToggleBtn;apConsole;executionConsole;dotPulseAp;statusTextAp;stopwatchAp;dotPulseAdv;statusTextAdv;stopwatchAdv;inspModel;inspLatency;inspTokens;inspPrompt;inspRationale;inspActions;copyPromptBtn;apiKeyInput;keyContextMenu;keyMoreBtn;keysListEl;keysBadgeEl;modelSelect;modeSelect;engineSelect;dryRunCheckbox;autoApplyCheckbox;autoAdvanceCheckbox;hostDarkModeCheckbox;useVisionCheckbox;analyzeBtn;applyBtn;resultContainer;constructor(e,t){this.initialSettings=e,this.callbacks=t,this.autopilot=new Ve({onStatusChange:(s,r,c)=>{this.logToConsole(r,c),s==="analyzing"?this._autopilotAnalyzingShown||(this._autopilotAnalyzingShown=!0,this.setBusy(!0,"Autopilot: IA analisando...")):s==="advancing"||s==="waiting"?(this._autopilotAnalyzingShown=!1,this.setBusy(!1),this.updateAutopilotUi(!0)):s==="idle"?(this._autopilotAnalyzingShown=!1,this.setBusy(!1),this.updateAutopilotUi(!1),r.includes("conclus\xE3o")||r.includes("finalizada")||r.includes("Parab\xE9ns")?this.setStatus("Atividade conclu\xEDda com sucesso! Autopilot finalizado.","success"):this.setStatus("Autopilot desativado.","info")):s==="error"&&(this._autopilotAnalyzingShown=!1,this.setBusy(!1),this.updateAutopilotUi(!1),this.setStatus("Autopilot interrompido por erro.","error"))},onRequestAnalysis:async(s,r)=>{try{return await this.callbacks.onAnalyze(s,r,!0)||null}catch{return null}},isManualModeActive:()=>this.floatingAnswers?.isOpen()??!1,onPageAdvance:()=>{this.floatingAnswers?.hide()}}),this.host=document.createElement("div"),this.host.id="easyquiz-shadow-root",this.host.style.position="fixed",this.host.style.top="0",this.host.style.left="0",this.host.style.width="100vw",this.host.style.height="100vh",this.host.style.zIndex="2147483647",this.host.style.pointerEvents="none",this.shadow=this.host.attachShadow({mode:"open"}),this.shadow.innerHTML=`
      <style>${Gt}</style>

      <!-- Bot\xE3o Flutuante Inferior Renovado (C\xE1psula com Status ao Vivo) -->
      <button class="eq-launcher" type="button" title="Abrir / Recolher EasyQuiz (Alt+Q)">
        <span class="eq-launcher-icon">${C.logo}</span>
        <span>EasyQuiz</span>
        <span class="eq-launcher-dot" id="eq-launcher-dot"></span>
      </button>

      <!-- Sidebar Fixa Lateral Direita Estilo VS Code -->
      <aside class="eq-sidebar" aria-label="EasyQuiz Sidebar">
        <!-- Aba Retr\xE1til na Borda Esquerda -->
        <button class="eq-dock-toggle" id="eq-dock-toggle" type="button" title="Recolher / Expandir Painel (Alt+Q)">
          <span class="eq-dock-toggle-icon">${C.chevronRight}</span>
          <span class="eq-dock-toggle-label">EQ</span>
        </button>
           <!-- Activity Bar Vertical na Esquerda (Estilo VS Code - Apenas \xCDcones) -->
          <nav class="eq-activity-bar" role="tablist" aria-label="Atalhos">
            <div class="eq-activity-top">
              <button class="eq-activity-btn active" id="eq-tab-resolver" role="tab" title="Resolver (Opera\xE7\xF5es Atuais)">
                <span class="eq-activity-indicator"></span>
                <span class="eq-activity-icon">${C.rocket}</span>
              </button>

              <button class="eq-activity-btn" id="eq-tab-brain" role="tab" title="C\xE9rebro da IA (Contexto e Inspe\xE7\xE3o)">
                <span class="eq-activity-indicator"></span>
                <span class="eq-activity-icon">${C.chip}</span>
              </button>

              <button class="eq-activity-btn" id="eq-tab-metrics" role="tab" title="M\xE9tricas & Cron\xF4metro (Tempo por Quest\xE3o e Hist\xF3rico)">
                <span class="eq-activity-indicator"></span>
                <span class="eq-activity-icon">${C.stopwatch}</span>
              </button>

              <button class="eq-activity-btn" id="eq-tab-debug" role="tab" title="Terminal & Debug Output (Logs, Tokens, Prompts, Erros)">
                <span class="eq-activity-indicator"></span>
                <span class="eq-activity-icon">${C.terminal}</span>
              </button>
            </div>

            <div class="eq-activity-bottom">
              <button class="eq-activity-btn" id="eq-tab-settings" role="tab" title="Configura\xE7\xF5es e Ajustes Avan\xE7ados">
                <span class="eq-activity-indicator"></span>
                <span class="eq-activity-icon">${C.settings}</span>
              </button>
            </div>
          </nav>

          <!-- Corpo Principal da Sidebar -->
          <main class="eq-sidebar-body">
            <!-- Cabe\xE7alho VS Code -->
            <header class="eq-header">
              <div class="eq-brand">
                <span class="eq-brand-icon">${C.logo}</span>
                <span class="eq-brand-name">EasyQuiz</span>
                <span class="eq-brand-badge">SUPREME</span>
                <span id="eq-active-model-badge" style="display:none; font-size:9px; font-weight:700; padding:1px 5px; border-radius:3px; background:rgba(88,101,242,0.2); border:1px solid rgba(88,101,242,0.4); color:#7983f5; letter-spacing:0.04em; white-space:nowrap;"></span>
              </div>
              <div class="eq-header-tools">
                <button class="eq-icon-btn" id="eq-min-btn" type="button" title="Minimizar (Alt+Q)">${C.chevronRight}</button>
                <button class="eq-icon-btn" id="eq-close-btn" type="button" title="Fechar">${C.close}</button>
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
                  <button class="eq-btn-primary" id="eq-analyze-btn" type="button">${C.analyze} Analisar quest\xE3o</button>
                  <button class="eq-btn-secondary" id="eq-apply-btn" type="button">${C.apply} Aplicar respostas</button>
                </div>

                <div style="display: flex; gap: 8px; width: 100%; align-items: center;">
                  <button class="eq-btn-primary" id="eq-ap-toggle-btn" type="button" style="flex: 1;">
                    ${C.play} INICIAR AUTOPILOT
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
                  <button class="eq-btn-secondary" id="eq-open-hud-btn" type="button">${C.list} Abrir respostas dispon\xEDveis</button>
                </div>

                <!-- Status & Stopwatch Card -->
                <div class="eq-status-card">
                  <div class="eq-status-card-header">
                    <div class="eq-ai-indicator">
                      <span class="eq-dot-pulse" id="eq-dot-ap"></span>
                      <span>Status da IA</span>
                    </div>
                    <div class="eq-stopwatch" id="eq-stopwatch-ap">
                      ${C.clock} <span>0.00s</span>
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
                      ${C.refresh}
                    </button>
                    <button class="eq-icon-btn" id="eq-ap-clear-memory" type="button" title="Limpar Mem\xF3ria Contextual (RAG)" style="width: 28px; height: 28px; color: #ff5555;">
                      ${C.eraser}
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
                      ${C.copy} Copiar
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
                    ${C.copy} Copiar Relat\xF3rio
                  </button>
                  <button class="eq-btn-secondary danger" id="eq-metrics-reset-btn" type="button">
                    ${C.trash} Zerar M\xE9tricas
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
                      ${C.copy}
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
                        ${C.copy}
                      </button>
                      <button class="eq-icon-btn" id="eq-dbg-clear-logs" type="button" title="Limpar Console" style="width: 26px; height: 26px; color: #ff5555;">
                        ${C.eraser}
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
                        ${C.copy} Copiar
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
                      ${C.copy} Copiar JSON
                    </button>
                  </div>
                  <div class="eq-code-block" id="eq-dbg-context-view" style="max-height: 110px;">Aguardando captura de contexto...</div>
                </div>

                <!-- Resposta Bruta da IA -->
                <div class="eq-field-group">
                  <div class="eq-section-title">
                    <span>Resposta Bruta da IA (Raw Output)</span>
                    <button class="eq-btn-secondary" id="eq-dbg-copy-raw-resp" type="button" style="height: 24px; padding: 0 6px; font-size: 10px;">
                      ${C.copy} Copiar Resposta
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
                      <span id="eq-keys-chevron" style="display:inline-flex;transition:transform 0.2s;">${C.chevronRight}</span>
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
                      <span class="eq-input-prefix-icon">${C.key}</span>
                      <input id="eq-api-key" class="eq-input" type="password" placeholder="Adicionar nova chave AIzaSy..." autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" />
                      <button class="eq-icon-btn" id="eq-key-save" type="button" title="Adicionar Chave">${C.plus}</button>
                      <button class="eq-icon-btn" id="eq-key-more-btn" type="button" title="Mais Op\xE7\xF5es das Chaves">${C.moreVertical}</button>
                    </div>

                    <!-- Context Menu Suspenso Din\xE2mico -->
                    <div class="eq-context-menu" id="eq-key-context-menu" hidden>
                      <button class="eq-context-item" id="eq-menu-prompt" type="button">
                        <span class="eq-item-icon">${C.edit}</span>
                        <span class="eq-item-text">Inserir via Janela Nativa</span>
                        <span class="eq-item-badge">Bypass</span>
                      </button>
                      <button class="eq-context-item" id="eq-menu-paste" type="button">
                        <span class="eq-item-icon">${C.paste}</span>
                        <span class="eq-item-text">Colar da \xC1rea de Transfer\xEAncia</span>
                      </button>
                      <button class="eq-context-item" id="eq-menu-toggle-vis" type="button">
                        <span class="eq-item-icon" id="eq-menu-vis-icon">${C.eye}</span>
                        <span class="eq-item-text" id="eq-menu-vis-text">Mostrar/Ocultar Campo</span>
                      </button>
                      <button class="eq-context-item" id="eq-menu-clear" type="button">
                        <span class="eq-item-icon">${C.eraser}</span>
                        <span class="eq-item-text">Limpar Campo</span>
                      </button>
                      <div class="eq-context-divider"></div>
                      <button class="eq-context-item" id="eq-menu-bulk" type="button">
                        <span class="eq-item-icon">${C.listPlus}</span>
                        <span class="eq-item-text">Importar Chaves em Lote</span>
                        <span class="eq-item-badge">Novo</span>
                      </button>
                      <div class="eq-context-divider"></div>
                      <button class="eq-context-item" id="eq-menu-test" type="button">
                        <span class="eq-item-icon">${C.sparkles}</span>
                        <span class="eq-item-text">Testar Todas as Chaves</span>
                      </button>
                      <button class="eq-context-item danger" id="eq-menu-reset" type="button">
                        <span class="eq-item-icon">${C.trash}</span>
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
                    ${C.trash} Resetar Todos os Dados e Mem\xF3ria
                  </button>
                </div>

                <div class="eq-footer-note" style="margin-top: auto;">Configura\xE7\xF5es salvas localmente no navegador</div>
              </div>
            </div>
          </main>
        </aside>
    `,this.launcherBtn=this.shadow.querySelector(".eq-launcher"),this.launcherDot=this.shadow.querySelector("#eq-launcher-dot"),this.dockToggleBtn=this.shadow.querySelector("#eq-dock-toggle"),this.sidebarEl=this.shadow.querySelector(".eq-sidebar"),this.apToggleBtn=this.shadow.querySelector("#eq-ap-toggle-btn"),this.apConsole=this.shadow.querySelector("#eq-ap-console"),this.executionConsole=this.shadow.querySelector("#eq-execution-console"),this.progressContainer=this.shadow.querySelector("#eq-progress-container"),this.progressBar=this.shadow.querySelector("#eq-progress-bar"),this.progressLabel=this.shadow.querySelector("#eq-progress-label"),this.progressVal=this.shadow.querySelector("#eq-progress-val"),this.contextTreeContainer=this.shadow.querySelector("#eq-tree-container"),this.dotPulseAp=this.shadow.querySelector("#eq-dot-ap"),this.statusTextAp=this.shadow.querySelector("#eq-status-text-ap"),this.stopwatchAp=this.shadow.querySelector("#eq-stopwatch-ap span"),this.dotPulseAdv=this.dotPulseAp,this.statusTextAdv=this.statusTextAp,this.stopwatchAdv=this.stopwatchAp,this.inspModel=this.shadow.querySelector("#eq-insp-model"),this.inspLatency=this.shadow.querySelector("#eq-insp-latency"),this.inspTokens=this.shadow.querySelector("#eq-insp-tokens"),this.inspPrompt=this.shadow.querySelector("#eq-insp-prompt"),this.inspRationale=this.shadow.querySelector("#eq-insp-rationale"),this.inspActions=this.shadow.querySelector("#eq-insp-actions"),this.copyPromptBtn=this.shadow.querySelector("#eq-copy-prompt-btn"),this.liveDebugTerminal=this.shadow.querySelector("#eq-live-debug-terminal"),this.dbgModel=this.shadow.querySelector("#eq-dbg-model"),this.dbgLatency=this.shadow.querySelector("#eq-dbg-latency"),this.dbgSplitTokens=this.shadow.querySelector("#eq-dbg-split-tokens"),this.dbgTotalTokens=this.shadow.querySelector("#eq-dbg-total-tokens"),this.dbgErrorCard=this.shadow.querySelector("#eq-dbg-error-card"),this.dbgErrorText=this.shadow.querySelector("#eq-dbg-error-text"),this.dbgPromptLen=this.shadow.querySelector("#eq-dbg-prompt-len"),this.dbgPromptView=this.shadow.querySelector("#eq-dbg-prompt-view"),this.dbgContextView=this.shadow.querySelector("#eq-dbg-context-view"),this.dbgRawRespView=this.shadow.querySelector("#eq-dbg-raw-resp-view"),this.dbgCountAll=this.shadow.querySelector("#eq-dbg-count-all"),this.dbgCountError=this.shadow.querySelector("#eq-dbg-count-error"),this.dbgCountAi=this.shadow.querySelector("#eq-dbg-count-ai"),this.dbgCountDom=this.shadow.querySelector("#eq-dbg-count-dom"),this.apiKeyInput=this.shadow.querySelector("#eq-api-key"),this.keyContextMenu=this.shadow.querySelector("#eq-key-context-menu"),this.keyMoreBtn=this.shadow.querySelector("#eq-key-more-btn"),this.keysListEl=this.shadow.querySelector("#eq-keys-list"),this.keysBadgeEl=this.shadow.querySelector("#eq-keys-badge"),this.modelSelect=this.shadow.querySelector("#eq-model-select"),this.modeSelect=this.shadow.querySelector("#eq-mode-select"),this.engineSelect=this.shadow.querySelector("#eq-engine-select"),this.dryRunCheckbox=this.shadow.querySelector("#eq-dry-run"),this.autoApplyCheckbox=this.shadow.querySelector("#eq-auto-apply"),this.autoAdvanceCheckbox=this.shadow.querySelector("#eq-auto-advance"),this.hostDarkModeCheckbox=this.shadow.querySelector("#eq-host-dark"),this.useVisionCheckbox=this.shadow.querySelector("#eq-use-vision"),this.analyzeBtn=this.shadow.querySelector("#eq-analyze-btn"),this.applyBtn=this.shadow.querySelector("#eq-apply-btn"),this.applyBtn.disabled=!0,this.resultContainer=this.shadow.querySelector("#eq-result"),this.floatingAnswers=new _e(this.shadow,()=>{this.callbacks.onAnalyze(1)});let n=this.shadow.querySelector("#eq-open-hud-btn");n&&n.addEventListener("click",()=>{this.latestPlan&&this.floatingAnswers.show(this.latestPlan)}),de.filter(s=>D(s.id)).forEach(s=>this.modelSelect.add(new Option(s.name,s.id,!1,s.id===e.model))),Ao.forEach(s=>this.modeSelect.add(new Option(s.label,s.value,!1,s.value===e.modeHint))),Lo.forEach(s=>this.engineSelect.add(new Option(s.label,s.value,!1,s.value===e.engine))),this.apiKeyInput.value=e.apiKey,this.dryRunCheckbox.checked=e.dryRun,this.autoApplyCheckbox.checked=e.autoApply,this.autoAdvanceCheckbox.checked=e.autoAdvance,this.hostDarkModeCheckbox.checked=e.hostDarkMode,this.useVisionCheckbox.checked=e.useVision,this.metricsLiveTime=this.shadow.querySelector("#eq-metrics-live-time"),this.metricsLiveStatus=this.shadow.querySelector("#eq-metrics-live-status"),this.metricsTotalBadge=this.shadow.querySelector("#eq-metrics-total-badge"),this.metricTotalTime=this.shadow.querySelector("#eq-metric-total-time"),this.metricAvgTime=this.shadow.querySelector("#eq-metric-avg-time"),this.metricTotalCount=this.shadow.querySelector("#eq-metric-total-count"),this.metricsHistoryList=this.shadow.querySelector("#eq-metrics-history-list"),this.metricsHistoryCount=this.shadow.querySelector("#eq-metrics-history-count"),this.metricsCopyBtn=this.shadow.querySelector("#eq-metrics-copy-btn"),this.metricsResetBtn=this.shadow.querySelector("#eq-metrics-reset-btn"),this.setupEventListeners(),this.updateTimingMetrics(),document.body.appendChild(this.host),this.applyHostDarkMode(e.hostDarkMode);let i=Array.isArray(e.apiKeys)&&e.apiKeys.length>0?e.apiKeys:e.apiKey?[e.apiKey]:[];k.init(i),this.renderKeysList();let a=window.setInterval(()=>{this.activeTab==="settings"&&this.renderKeysList()},1e3);typeof a?.unref=="function"&&a.unref();let l=k.getBestKey()||e.apiKey;l&&ze(l).then(s=>{s&&s.length>0&&this.updateModelSelect(s,e.model)}).catch(()=>{})}switchTab(e){this.activeTab=e;let t=["resolver","brain","metrics","debug","settings"];for(let n of t){let i=this.shadow.querySelector(`#eq-tab-${n}`),a=this.shadow.querySelector(`#eq-view-${n}`);n===e?(i?.classList.add("active"),a&&(a.style.display="flex")):(i?.classList.remove("active"),a&&(a.style.display="none"))}e==="brain"?(this.renderContextTree(),this.refreshInspectorView()):e==="metrics"?this.updateTimingMetrics():e==="debug"&&(this.refreshDebugView(),this.renderTerminalEntries())}setupEventListeners(){this.shadow.querySelector("#eq-tab-resolver")?.addEventListener("click",()=>this.switchTab("resolver")),this.shadow.querySelector("#eq-tab-brain")?.addEventListener("click",()=>this.switchTab("brain")),this.shadow.querySelector("#eq-tab-metrics")?.addEventListener("click",()=>this.switchTab("metrics")),this.shadow.querySelector("#eq-tab-debug")?.addEventListener("click",()=>this.switchTab("debug")),this.shadow.querySelector("#eq-tab-settings")?.addEventListener("click",()=>this.switchTab("settings")),this.metricsResetBtn?.addEventListener("click",()=>{we(),this.stopQuestionTimer(0),this.currentQuestionStartTime=0,this.metricsLiveTime&&(this.metricsLiveTime.textContent="00:00.00"),this.metricsLiveStatus&&(this.metricsLiveStatus.textContent="Em espera",this.metricsLiveStatus.classList.remove("active")),this.updateTimingMetrics(),this.logToConsole("> [SYS] M\xE9tricas e hist\xF3rico de tempo zerados com sucesso.","text-yellow")}),this.metricsCopyBtn?.addEventListener("click",()=>{this.copyMetricsReport()}),this.shadow.querySelector("#eq-dbg-filter-all")?.addEventListener("click",()=>this.setLogFilter("all")),this.shadow.querySelector("#eq-dbg-filter-error")?.addEventListener("click",()=>this.setLogFilter("error")),this.shadow.querySelector("#eq-dbg-filter-ai")?.addEventListener("click",()=>this.setLogFilter("ai")),this.shadow.querySelector("#eq-dbg-filter-dom")?.addEventListener("click",()=>this.setLogFilter("dom"));let e=this.shadow.querySelector("#eq-dbg-scroll-toggle");e?.addEventListener("click",()=>{this.autoScrollLogs=!this.autoScrollLogs,e&&(e.style.color=this.autoScrollLogs?"#00ffcc":"#858585",e.title=this.autoScrollLogs?"Auto-Scroll Ligado (Clique para desligar)":"Auto-Scroll Desligado (Clique para ligar)"),this.autoScrollLogs&&this.liveDebugTerminal&&(this.liveDebugTerminal.scrollTop=this.liveDebugTerminal.scrollHeight)});let t=this.shadow.querySelector("#eq-dbg-copy-logs");t?.addEventListener("click",()=>{let g=this.getFormattedLogs();navigator.clipboard.writeText(g).then(()=>{let b=t.innerHTML;t.innerHTML=C.check,setTimeout(()=>t.innerHTML=b,1800)})}),this.shadow.querySelector("#eq-dbg-clear-logs")?.addEventListener("click",()=>{this.clearLogs()});let n=this.shadow.querySelector("#eq-dbg-copy-prompt");n?.addEventListener("click",()=>{let g=this.latestPromptText||this.latestPlan?.promptSent||"";navigator.clipboard.writeText(g).then(()=>{let b=n.innerHTML;n.innerHTML=`${C.check} Copiado!`,setTimeout(()=>n.innerHTML=b,1800)})});let i=this.shadow.querySelector("#eq-dbg-copy-context");i?.addEventListener("click",()=>{let g=this.dbgContextView?.textContent||"";navigator.clipboard.writeText(g).then(()=>{let b=i.innerHTML;i.innerHTML=`${C.check} Copiado!`,setTimeout(()=>i.innerHTML=b,1800)})});let a=this.shadow.querySelector("#eq-dbg-copy-raw-resp");a?.addEventListener("click",()=>{let g=this.latestPlan?.rawResponse||this.dbgRawRespView?.textContent||"";navigator.clipboard.writeText(g).then(()=>{let b=a.innerHTML;a.innerHTML=`${C.check} Copiado!`,setTimeout(()=>a.innerHTML=b,1800)})});let l=this.shadow.querySelector("#eq-dbg-copy-error-btn");l?.addEventListener("click",()=>{let g=this.lastErrorMsg||"";navigator.clipboard.writeText(g).then(()=>{let b=l.innerHTML;l.innerHTML=C.check,setTimeout(()=>l.innerHTML=b,1800)})}),this.shadow.querySelector("#eq-refresh-context-btn")?.addEventListener("click",()=>{this.renderContextTree()}),this.launcherBtn.addEventListener("click",()=>this.toggle()),this.dockToggleBtn.addEventListener("click",()=>this.toggle()),this.shadow.querySelector("#eq-min-btn")?.addEventListener("click",()=>this.toggle(!1)),this.shadow.querySelector("#eq-close-btn")?.addEventListener("click",()=>this.toggle(!1)),window.addEventListener("keydown",g=>{g.altKey&&(g.key==="q"||g.key==="Q")&&(g.preventDefault(),this.toggle())},!0);let s=g=>{let b=g.composedPath();(b.includes(this.sidebarEl)||b.includes(this.host))&&g.stopImmediatePropagation()};window.addEventListener("keydown",s,!0),window.addEventListener("keyup",s,!0),window.addEventListener("keypress",s,!0),this.apiKeyInput.addEventListener("input",()=>{let g=this.apiKeyInput.value.trim().replace(/^["']|["']$/g,"");this.callbacks.onSettingsChange({apiKey:g})});let r=this.shadow.querySelector("#eq-keys-collapsible"),c=this.shadow.querySelector("#eq-keys-chevron"),d=this.shadow.querySelector("#eq-keys-section-header"),h=g=>{r&&(g?(r.style.display="none",c&&(c.style.transform="rotate(0deg)")):(r.style.display="block",r.style.maxHeight="none",r.style.overflow="visible",c&&(c.style.transform="rotate(90deg)")))},u=!1;try{u=localStorage.getItem("easyquiz_keys_collapsed")==="true"}catch{}h(u),d?.addEventListener("click",g=>{if(g.target?.closest("a"))return;let b=r?.style.display==="none";h(!b);try{localStorage.setItem("easyquiz_keys_collapsed",b?"false":"true")}catch{}}),this.shadow.querySelector("#eq-key-save").addEventListener("click",()=>{let g=this.apiKeyInput.value.trim().replace(/^["']|["']$/g,"");if(!g){this.setStatus("Insira o valor da chave antes de adicionar.","warning");return}let b=k.addKey(g);if(b.ok){let m=k.exportRawKeys();this.callbacks.onSettingsChange({apiKey:m[0],apiKeys:m}),this.apiKeyInput.value="",this.setStatus(`\u2713 Nova chave adicionada com sucesso! (${m.length} chaves ativas no pool)`,"success"),h(!1);try{localStorage.setItem("easyquiz_keys_collapsed","false")}catch{}this.renderKeysList(),this.keyContextMenu.hidden=!0,$e(g).then(x=>{x.ok?(k.markSuccess(g,100),this.setStatus("\u2713 Nova chave validada com sucesso no Google AI Studio!","success")):(k.markInvalid(g,x.message),this.setStatus(`\u26A0\uFE0F Chave cadastrada, mas aviso retornado: ${x.message}`,"warning")),this.renderKeysList()}).catch(()=>{})}else this.setStatus(b.message,"warning")}),this.keyMoreBtn.addEventListener("click",g=>{g.stopPropagation(),this.keyContextMenu.hidden=!this.keyContextMenu.hidden}),this.shadow.addEventListener("click",g=>{let b=g.target;!b.closest("#eq-key-context-menu")&&!b.closest("#eq-key-more-btn")&&(this.keyContextMenu.hidden=!0)}),this.shadow.querySelector("#eq-menu-prompt")?.addEventListener("click",()=>{this.keyContextMenu.hidden=!0;let g=window.prompt("Adicionar Nova Chave API do Google Gemini (AI Studio):");if(g!==null&&g.trim()){let b=g.trim().replace(/^["']|["']$/g,""),m=k.addKey(b);if(m.ok){let x=k.exportRawKeys();this.callbacks.onSettingsChange({apiKey:x[0],apiKeys:x}),this.setStatus("Chave Gemini adicionada com sucesso!","success"),this.renderKeysList()}else this.setStatus(m.message,"warning")}}),this.shadow.querySelector("#eq-menu-paste")?.addEventListener("click",async()=>{this.keyContextMenu.hidden=!0;try{let g=await navigator.clipboard.readText();if(g){let b=g.trim().replace(/^["']|["']$/g,"");this.apiKeyInput.value=b,this.setStatus('Chave colada no campo. Clique no bot\xE3o "+" para adicionar ao pool.',"info")}}catch{let g=window.prompt("Adicionar Nova Chave API do Google Gemini:");if(g!==null&&g.trim()){let b=g.trim().replace(/^["']|["']$/g,"");if(k.addKey(b).ok){let x=k.exportRawKeys();this.callbacks.onSettingsChange({apiKey:x[0],apiKeys:x}),this.setStatus("Chave Gemini adicionada com sucesso!","success"),this.renderKeysList()}}}}),this.shadow.querySelector("#eq-menu-toggle-vis")?.addEventListener("click",()=>{this.keyContextMenu.hidden=!0;let g=this.apiKeyInput.type==="password";this.apiKeyInput.type=g?"text":"password";let b=this.shadow.querySelector("#eq-menu-vis-icon"),m=this.shadow.querySelector("#eq-menu-vis-text");b&&(b.innerHTML=g?C.eyeOff:C.eye),m&&(m.textContent=g?"Ocultar Campo":"Mostrar Campo")}),this.shadow.querySelector("#eq-menu-clear")?.addEventListener("click",()=>{this.keyContextMenu.hidden=!0,this.apiKeyInput.value="",this.setStatus("Campo de inser\xE7\xE3o limpo.","info"),this.apiKeyInput.focus()}),this.shadow.querySelector("#eq-menu-bulk")?.addEventListener("click",()=>{this.keyContextMenu.hidden=!0,this.shadow.querySelector("#eq-bulk-overlay")?.remove();let g=document.createElement("div");g.id="eq-bulk-overlay",g.style.cssText=["position:fixed","inset:0","z-index:2147483647","pointer-events:auto","background:rgba(0,0,0,0.78)","backdrop-filter:blur(4px)","-webkit-backdrop-filter:blur(4px)","display:flex","align-items:center","justify-content:center",'font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif',"user-select:text","-webkit-user-select:text"].join(";");let b=document.createElement("div");b.style.cssText=["background:#11151c","color:#e2e8f0","border:1px solid #283548","border-radius:12px","padding:20px","width:440px","max-width:92vw","font-size:13px","box-shadow:0 12px 40px rgba(0,0,0,0.85), 0 0 0 1px rgba(0,229,255,0.15)","display:flex","flex-direction:column","gap:10px","pointer-events:auto"].join(";"),b.innerHTML=`
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
      `,g.appendChild(b),this.shadow.appendChild(g);let m=b.querySelector("#eq-bulk-ta"),x=b.querySelector("#eq-bulk-status"),T=b.querySelector("#eq-bulk-import"),A=b.querySelector("#eq-bulk-paste-btn"),q=b.querySelector("#eq-bulk-clear-btn");requestAnimationFrame(()=>m?.focus());let E=()=>{g.remove()};["keydown","keyup","keypress","paste","copy","cut"].forEach(H=>{g.addEventListener(H,R=>R.stopPropagation())}),g.addEventListener("keydown",H=>{H.key==="Escape"&&E()}),g.addEventListener("click",H=>{H.target===g&&E()}),b.querySelector("#eq-bulk-x")?.addEventListener("click",E),b.querySelector("#eq-bulk-cancel")?.addEventListener("click",E),q.addEventListener("click",()=>{m.value="",x.textContent="",m.focus()}),A.addEventListener("click",async()=>{try{let H=await navigator.clipboard?.readText();H?(m.value=H,m.focus(),x.style.color="#38bdf8",x.textContent="Conte\xFAdo colado da \xE1rea de transfer\xEAncia com sucesso!"):(x.style.color="#fbbf24",x.textContent="\xC1rea de transfer\xEAncia vazia ou sem permiss\xE3o de leitura.")}catch{x.style.color="#fbbf24",x.textContent="Permiss\xE3o de clipboard negada pelo navegador. Use Ctrl+V diretamente na caixa.",m.focus()}}),b.querySelector("#eq-bulk-import")?.addEventListener("click",async()=>{let H=m.value.trim();if(!H){x.style.color="#f87171",x.textContent="Insira pelo menos uma chave de API antes de importar.";return}let R=H.match(/AIza[0-9A-Za-z\-_]{35}/g),V=[];if(R&&R.length>0?V=Array.from(new Set(R)):V=Array.from(new Set(H.split(/[\n,;\s]+/).map($=>$.trim().replace(/^["'`]|["'`]$/g,"")).filter($=>$.length>=20))),V.length===0){x.style.color="#f87171",x.textContent="Nenhuma chave v\xE1lida encontrada (m\xEDnimo 20 caracteres).";return}x.style.color="#00e5ff",x.textContent=`Processando ${V.length} chave(s)...`,T.disabled=!0,T.style.opacity="0.6";let B=0,_=0;for(let $ of V){let F=k.addKey($);F.ok?B++:F.message.includes("j\xE1 est\xE1 cadastrada")&&_++}if(B>0){let $=k.exportRawKeys();this.callbacks.onSettingsChange({apiKey:$[0],apiKeys:$}),h(!1);try{localStorage.setItem("easyquiz_keys_collapsed","false")}catch{}}x.textContent=`${B} adicionada(s), ${_} duplicada(s). Validando modelo em paralelo...`;let ce=k.exportRawKeys(),S=this.modelSelect?.value||"gemini-3.5-flash-lite",I=await Xe(S,ce);I.ok?(k.markSuccess(I.key,200),x.style.color="#4ade80",x.textContent=`\u2713 ${B} adicionada(s), ${_} duplicada(s). Modelo '${I.model}' pronto!`):(x.style.color="#fbbf24",x.textContent=`${B} adicionada(s), ${_} duplicada(s). Aviso: ${I.message}`),this.renderKeysList(),T.disabled=!1,T.style.opacity="1",B>0&&(this.setStatus(`\u2713 Lote importado: ${B} chave(s) adicionada(s) ao pool!`,"success"),setTimeout(E,2200))})}),this.shadow.querySelector("#eq-menu-test")?.addEventListener("click",async()=>{this.keyContextMenu.hidden=!0;let g=k.getAllKeys();if(g.length===0)return this.setStatus("Nenhuma chave cadastrada para testar.","error");this.setStatus(`\u26A1 Testando ${g.length} chave(s) em paralelo...`,"info");let b=this.modelSelect?.value||"gemini-3.5-flash-lite",m=g.map(T=>T.key),x=await Xe(b,m);if(x.ok)k.markSuccess(x.key,150),this.setStatus(`\u2713 Validado! Modelo '${x.model}' respondeu com sucesso!`,"success");else{let T=await Promise.allSettled(m.map(q=>$e(q))),A=0;T.forEach((q,E)=>{if(q.status==="fulfilled"&&q.value.ok)A++,k.markSuccess(m[E],200);else{let H=q.status==="fulfilled"?q.value.message:String(q.reason);k.markInvalid(m[E],H)}}),this.setStatus(`Teste: ${A}/${g.length} chave(s) v\xE1lidas. ${x.message}`,A>0?"info":"error")}this.renderKeysList()});let f=()=>{this.keyContextMenu.hidden=!0,window.confirm("Deseja realmente resetar todos os dados, chaves e mem\xF3ria de sess\xE3o do EasyQuiz?")&&(this.autopilot.isActive()&&this.autopilot.stop(),this.updateAutopilotUi(!1),this.setBusy(!1),xt(),we(),this.stopQuestionTimer(0),this.currentQuestionStartTime=0,this.metricsLiveTime&&(this.metricsLiveTime.textContent="00:00.00"),this.metricsLiveStatus&&(this.metricsLiveStatus.textContent="Em espera",this.metricsLiveStatus.className="eq-live-stopwatch-status"),this.updateTimingMetrics(),this.apiKeyInput.value="",this.callbacks.onSettingsChange({apiKey:""}),this.setStatus("Todos os dados do EasyQuiz foram limpos.","info"),this.logToConsole("> [SYS] Armazenamento local resetado.","text-yellow"))};this.shadow.querySelector("#eq-menu-reset")?.addEventListener("click",f),this.shadow.querySelector("#eq-reset-all-btn")?.addEventListener("click",f),this.apToggleBtn.addEventListener("click",()=>{if(this.autopilot.isActive())this.autopilot.stop(),this.callbacks.onCancel?.(),this.setProgress(0),this.updateAutopilotUi(!1),this.setInterrupted("Autopilot interrompido imediatamente pelo usu\xE1rio.");else{if(!this.apiKeyInput.value.trim().replace(/^["']|["']$/g,"")){this.setStatus("Configure sua chave de API Gemini na aba Configura\xE7\xF5es antes de ligar o Autopilot.","error"),this.switchTab("settings"),this.apiKeyInput.focus();return}this.callbacks.onSettingsChange({autoApply:!0,autoAdvance:!0}),this.autoApplyCheckbox.checked=!0,this.autoAdvanceCheckbox.checked=!0,It(),this.autopilot.start(),this.updateAutopilotUi(!0),this.startStopwatch(),this.setStatus("Autopilot ativo. Monitorando exerc\xEDcios...","info")}}),this.shadow.querySelector("#eq-ap-clear-memory").addEventListener("click",()=>{Qe(),this.logToConsole("> [SYS] Mem\xF3ria contextual limpa com sucesso.","text-green"),this.setStatus("Mem\xF3ria contextual da sess\xE3o limpa.","success")});let v=this.shadow.querySelector("#eq-copy-console-btn");v?.addEventListener("click",()=>{let g=this.apConsole?.innerText||"";navigator.clipboard.writeText(g).then(()=>{let b=v.innerHTML;v.innerHTML=C.check,setTimeout(()=>v.innerHTML=b,1800)})}),this.copyPromptBtn.addEventListener("click",()=>{let g=this.inspPrompt.textContent||"";navigator.clipboard.writeText(g).then(()=>{let b=this.copyPromptBtn.innerHTML;this.copyPromptBtn.innerHTML=`${C.check} Copiado!`,setTimeout(()=>this.copyPromptBtn.innerHTML=b,2e3)})}),this.modelSelect.addEventListener("change",()=>this.callbacks.onSettingsChange({model:this.modelSelect.value})),this.modeSelect.addEventListener("change",()=>this.callbacks.onSettingsChange({modeHint:this.modeSelect.value})),this.engineSelect.addEventListener("change",()=>this.callbacks.onSettingsChange({engine:this.engineSelect.value})),this.dryRunCheckbox.addEventListener("change",()=>this.callbacks.onSettingsChange({dryRun:this.dryRunCheckbox.checked})),this.autoApplyCheckbox.addEventListener("change",()=>this.callbacks.onSettingsChange({autoApply:this.autoApplyCheckbox.checked})),this.autoAdvanceCheckbox.addEventListener("change",()=>this.callbacks.onSettingsChange({autoAdvance:this.autoAdvanceCheckbox.checked})),this.useVisionCheckbox.addEventListener("change",()=>{let g=this.useVisionCheckbox.checked;this.callbacks.onSettingsChange({useVision:g}),this.setStatus(g?"Vis\xE3o Computacional ativada (capturas habilitadas).":"Modo DOM R\xE1pido ativado (capturas desabilitadas).","info")}),this.hostDarkModeCheckbox.addEventListener("change",()=>{let g=this.hostDarkModeCheckbox.checked;this.callbacks.onSettingsChange({hostDarkMode:g}),this.applyHostDarkMode(g)}),this.analyzeBtn.addEventListener("click",async()=>{if(this.isBusy){this.callbacks.onCancel?.(),this.setInterrupted("An\xE1lise cancelada pelo usu\xE1rio. Pronto para nova tentativa.");return}await this.callbacks.onAnalyze()&&!this.dryRunCheckbox.checked&&!this.autoApplyCheckbox.checked&&this.callbacks.onApply()}),this.applyBtn.addEventListener("click",()=>this.callbacks.onApply())}startStopwatch(){this.stopStopwatch(),this.stopwatchStartTime=Date.now();let e=()=>{let t=((Date.now()-this.stopwatchStartTime)/1e3).toFixed(2)+"s";this.stopwatchAp.textContent=t,this.stopwatchAdv.textContent=t};e(),this.stopwatchInterval=setInterval(e,100)}stopStopwatch(e){if(this.stopwatchInterval&&(clearInterval(this.stopwatchInterval),this.stopwatchInterval=null),e!==void 0){let t=(e/1e3).toFixed(2)+"s";this.stopwatchAp.textContent=t,this.stopwatchAdv.textContent=t}}setLogFilter(e){this.activeLogFilter=e;let t=["all","error","ai","dom"];for(let n of t){let i=this.shadow.querySelector(`#eq-dbg-filter-${n}`);n===e?i?.classList.add("active"):i?.classList.remove("active")}this.renderTerminalEntries()}updateLogCounters(){let e=0,t=0,n=0;for(let i of this.logEntries)i.category==="error"?e++:i.category==="ai"?t++:i.category==="dom"&&n++;this.dbgCountAll&&(this.dbgCountAll.textContent=String(this.logEntries.length)),this.dbgCountError&&(this.dbgCountError.textContent=String(e)),this.dbgCountAi&&(this.dbgCountAi.textContent=String(t)),this.dbgCountDom&&(this.dbgCountDom.textContent=String(n))}renderTerminalEntries(){if(!this.liveDebugTerminal)return;this.liveDebugTerminal.replaceChildren();let e=this.activeLogFilter==="all"?this.logEntries:this.logEntries.filter(t=>t.category===this.activeLogFilter);if(e.length===0){let t=document.createElement("div");t.className="text-muted",t.textContent=`Nenhum log encontrado para o filtro "${this.activeLogFilter.toUpperCase()}".`,this.liveDebugTerminal.appendChild(t);return}for(let t of e){let n=document.createElement("div");n.textContent=t.message,t.colorClass&&(n.className=t.colorClass),this.liveDebugTerminal.appendChild(n)}this.autoScrollLogs&&(this.liveDebugTerminal.scrollTop=this.liveDebugTerminal.scrollHeight)}clearLogs(){if(this.logEntries=[],this.updateLogCounters(),this.liveDebugTerminal){this.liveDebugTerminal.replaceChildren();let e=document.createElement("div");e.className="text-blue",e.textContent="> [SYS] Console de logs limpo pelo usu\xE1rio.",this.liveDebugTerminal.appendChild(e)}this.apConsole&&this.apConsole.replaceChildren(),this.executionConsole&&this.executionConsole.replaceChildren()}getFormattedLogs(){return(this.activeLogFilter==="all"?this.logEntries:this.logEntries.filter(t=>t.category===this.activeLogFilter)).map(t=>t.message).join(`
`)}setLastError(e){this.lastErrorMsg=e,this.dbgErrorCard&&this.dbgErrorText&&(this.dbgErrorText.textContent=e,this.dbgErrorCard.style.display="flex")}setErrorDiagnostic(e,t){let n=t?`[${t}] ${e}`:e;this.setLastError(n)}refreshDebugView(){let e=this.latestPlan,t=this.latestContext,n=this.latestPromptText||e?.promptSent||"";if(this.dbgModel&&(this.dbgModel.textContent=e?.usedModel||this.initialSettings.model||"--"),this.dbgLatency&&(this.dbgLatency.textContent=e?.durationMs?`${e.durationMs}ms`:"--"),this.dbgSplitTokens){let i=e?.promptTokens!==void 0?String(e.promptTokens):"--",a=e?.candidatesTokens!==void 0?String(e.candidatesTokens):"--";this.dbgSplitTokens.textContent=`${i} / ${a}`,this.dbgSplitTokens.title=`Prompt: ${i} tokens | Resposta: ${a} tokens`}if(this.dbgTotalTokens){let i=e?.tokensUsed??(e?.promptTokens&&e?.candidatesTokens?e.promptTokens+e.candidatesTokens:void 0);this.dbgTotalTokens.textContent=i!==void 0?`${i}`:"--"}if(this.dbgPromptLen){let i=n.length,a=Math.round(i/4);this.dbgPromptLen.textContent=`${i} chars (~${a} tokens est.)`}if(this.dbgPromptView&&(this.dbgPromptView.textContent=n||"Nenhum prompt enviado at\xE9 o momento."),this.dbgContextView)if(t){let i={scope:`${t.scope.tagName.toLowerCase()}${t.scope.id?"#"+t.scope.id:""}${t.scope.className?"."+t.scope.className.split(" ").join("."):""}`,questionLength:t.questionText.length,questionSnippet:t.questionText.slice(0,150)+(t.questionText.length>150?"...":""),controlsCount:t.controls.length,controls:t.controls.map((a,l)=>({index:l+1,tag:a.tag,type:a.type,name:a.name||void 0,id:a.id||void 0,value:a.value||void 0,label:a.label||void 0,role:a.role}))};this.dbgContextView.textContent=JSON.stringify(i,null,2)}else this.dbgContextView.textContent="Aguardando captura de contexto pelo EasyQuiz...";this.dbgRawRespView&&(e?e.rawResponse?this.dbgRawRespView.textContent=e.rawResponse:this.dbgRawRespView.textContent=JSON.stringify({pageType:e.pageType,mode:e.mode,confidence:e.confidence,rationale:e.rationale,actions:e.actions},null,2):this.dbgRawRespView.textContent="Aguardando retorno da API Gemini..."),this.lastErrorMsg&&this.dbgErrorCard&&this.dbgErrorText&&(this.dbgErrorText.textContent=this.lastErrorMsg,this.dbgErrorCard.style.display="flex")}logToConsole(e,t){let n=new Date,i=`${String(n.getHours()).padStart(2,"0")}:${String(n.getMinutes()).padStart(2,"0")}:${String(n.getSeconds()).padStart(2,"0")}.${String(Math.floor(n.getMilliseconds()/100))}`,a=e;e.startsWith(">")?a=`> [${i}] ${e.slice(1).trim()}`:a=`[${i}] ${e}`;let l="all";t==="text-red"||a.includes("[ERRO]")||a.includes("Falha")||a.includes("Error")?l="error":a.includes("[IA]")||a.includes("[RAG]")||a.includes("Tokens")||a.includes("Gemini")||a.includes("Modelo:")?l="ai":(a.includes("[DOM]")||a.includes("[EXEC]")||a.includes("[VERIF]")||a.includes("[NAV]"))&&(l="dom");let s={id:Date.now()+Math.random(),timestamp:i,message:a,colorClass:t,category:l};for(this.logEntries.push(s);this.logEntries.length>250;)this.logEntries.shift();if(this.updateLogCounters(),l==="error"&&this.setLastError(a),this.liveDebugTerminal&&(this.activeLogFilter==="all"||this.activeLogFilter===l)){let r=document.createElement("div");for(r.textContent=a,t&&(r.className=t),this.liveDebugTerminal.appendChild(r);this.liveDebugTerminal.children.length>250;)this.liveDebugTerminal.removeChild(this.liveDebugTerminal.firstChild);this.autoScrollLogs&&(this.liveDebugTerminal.scrollTop=this.liveDebugTerminal.scrollHeight)}if(this.apConsole){let r=document.createElement("div");for(r.textContent=a,t&&(r.className=t),this.apConsole.appendChild(r),this.apConsole.scrollTop=this.apConsole.scrollHeight;this.apConsole.children.length>150;)this.apConsole.removeChild(this.apConsole.firstChild)}if(this.executionConsole){let r=document.createElement("div");for(r.textContent=a,t&&(r.className=t),this.executionConsole.appendChild(r),this.executionConsole.scrollTop=this.executionConsole.scrollHeight;this.executionConsole.children.length>150;)this.executionConsole.removeChild(this.executionConsole.firstChild)}}setProgress(e,t){if(!this.progressContainer||!this.progressBar)return;if(e<=0){this.progressContainer.style.display="none",this.progressBar.style.width="0%";return}this.progressContainer.style.display="flex";let n=Math.min(100,Math.max(0,Math.round(e)));this.progressBar.style.width=`${n}%`,this.progressVal&&(this.progressVal.textContent=`${n}%`),t&&this.progressLabel&&(this.progressLabel.textContent=t),n>=100&&setTimeout(()=>{this.progressContainer&&this.progressBar&&this.progressBar.style.width==="100%"&&(this.progressContainer.style.display="none")},1500)}updateContext(e,t){this.latestContext=e,t&&(this.latestPlan=t),this.activeTab==="brain"?(this.renderContextTree(),t&&this.refreshInspectorView()):this.activeTab==="debug"&&this.refreshDebugView()}renderContextTree(){if(!this.contextTreeContainer)return;let e=this.latestContext,t=ke(),n=this.latestPlan;this.contextTreeContainer.innerHTML="";let i=this.createTreeFolder("\u{1F4C4} P\xC1GINA & ESCOPO ATUAL",!0,[{label:"T\xEDtulo",value:document.title||"Sem t\xEDtulo"},{label:"URL",value:window.location.pathname||"/"},{label:"Escopo DOM",value:e?`${e.scope.tagName.toLowerCase()}${e.scope.className?"."+e.scope.className.split(" ").join("."):""}`:"Document"},{label:"Tamanho Texto",value:e?`${e.questionText.length} caracteres`:"N\xE3o analisado"},{label:"Trecho Enunciado",value:e?`"${e.questionText.slice(0,120)}..."`:"Nenhum"}]);this.contextTreeContainer.appendChild(i);let a=e?e.controls:[],l=a.map((d,h)=>{let u=d.role==="navigation"||d.type==="button",p=!u&&d.value?` [val: "${d.value}"]`:"";return{label:`[#${h+1}] ${d.type.toUpperCase()}`,value:`${d.label||d.id||d.name||"(Sem r\xF3tulo)"}${p}`.trim(),badge:u?"Navega\xE7\xE3o":d.role||d.type}}),s=this.createTreeFolder(`\u{1F39B}\uFE0F CONTROLES DETECTADOS (${a.length})`,a.length>0,l);this.contextTreeContainer.appendChild(s);let r=t.map((d,h)=>({label:`Mem\xF3ria #${h+1}`,value:d,badge:"RAG"})),c=this.createTreeFolder(`\u{1F9E0} MEM\xD3RIA RAG ACUMULADA (${t.length})`,t.length>0,r);if(this.contextTreeContainer.appendChild(c),n){let d=this.createTreeFolder(`\u{1F916} \xDALTIMO PLANO IA (${n.actions.length} a\xE7\xF5es)`,!0,[{label:"Tipo P\xE1gina",value:n.pageType,badge:`${(n.confidence*100).toFixed(0)}%`},{label:"Modo",value:n.mode},{label:"Racioc\xEDnio",value:n.rationale||"N/A"},...n.actions.map((h,u)=>({label:`A\xE7\xE3o #${u+1} (${h.t})`,value:JSON.stringify(h)}))]);this.contextTreeContainer.appendChild(d)}}createTreeFolder(e,t,n){let i=document.createElement("div");i.className="eq-tree-node";let a=document.createElement("div");a.className="eq-tree-header",a.innerHTML=`<span class="eq-tree-arrow">${t?"\u25BC":"\u25B6"}</span> <span>${e}</span>`;let l=document.createElement("div");if(l.className="eq-tree-content",l.style.display=t?"flex":"none",n.length===0)l.innerHTML='<div class="text-muted" style="padding: 2px 0;">Nenhum item registrado.</div>';else for(let s of n){let r=document.createElement("div");r.className="eq-tree-leaf",r.innerHTML=`
          <strong style="color:#ffffff; min-width: 80px;">${s.label}:</strong>
          <span style="flex:1; word-break: break-word; color:#aaaaaa;">${s.value}</span>
          ${s.badge?`<span class="eq-tree-badge">${s.badge}</span>`:""}
        `,l.appendChild(r)}return a.addEventListener("click",()=>{let s=l.style.display==="none";l.style.display=s?"flex":"none";let r=a.querySelector(".eq-tree-arrow");r&&(r.textContent=s?"\u25BC":"\u25B6")}),i.appendChild(a),i.appendChild(l),i}toggle(e){e!==void 0?this.isCollapsed=!e:this.isCollapsed=!this.isCollapsed,this.isCollapsed?this.sidebarEl.classList.add("eq-collapsed"):(this.sidebarEl.classList.remove("eq-collapsed"),this.apiKeyInput.value||(this.switchTab("settings"),this.apiKeyInput.focus()))}updateAutopilotUi(e){e?(this.apToggleBtn.innerHTML=`${C.stop} PARAR AUTOPILOT`,this.apToggleBtn.classList.add("danger"),this.apToggleBtn.title="Interromper execu\xE7\xE3o cont\xEDnua do Autopilot"):(this.apToggleBtn.innerHTML=`${C.play} INICIAR AUTOPILOT`,this.apToggleBtn.classList.remove("danger"),this.apToggleBtn.title="Iniciar resolu\xE7\xE3o autom\xE1tica cont\xEDnua de quest\xF5es")}setOperationState(e,t){let n=this.shadow.querySelector("#eq-operation-state");n&&(n.textContent=e,n.className=`eq-operation-state is-${t}`)}setInterrupted(e="An\xE1lise interrompida pelo usu\xE1rio."){this.isBusy=!1,[this.modelSelect,this.modeSelect,this.engineSelect,this.dryRunCheckbox,this.autoApplyCheckbox,this.autoAdvanceCheckbox,this.useVisionCheckbox].forEach(t=>t.disabled=!1),this.analyzeBtn.disabled=!1,this.analyzeBtn.classList.remove("danger"),this.analyzeBtn.innerHTML=`${C.sparkles} Resolver com IA (Alt+R)`,this.analyzeBtn.title="Analisar e responder quest\xE3o ativa",this.applyBtn.disabled=!this.latestPlan||!this.latestPlan.actions.length,this.stopStopwatch(),this.stopQuestionTimer(),this.dotPulseAp.className="eq-dot-pulse stopped",this.dotPulseAdv.className="eq-dot-pulse stopped",this.launcherDot.className="eq-launcher-dot stopped",this.metricsLiveStatus&&(this.metricsLiveStatus.textContent="Interrompido",this.metricsLiveStatus.className="eq-live-stopwatch-status is-warning"),this.autopilot.isActive()||this.updateAutopilotUi(!1),this.setStatus(e,"warning")}setBusy(e,t){this.isBusy=e,[this.modelSelect,this.modeSelect,this.engineSelect,this.dryRunCheckbox,this.autoApplyCheckbox,this.autoAdvanceCheckbox,this.useVisionCheckbox].forEach(n=>n.disabled=e),e?(this.analyzeBtn.disabled=!1,this.analyzeBtn.classList.add("danger"),this.analyzeBtn.innerHTML=`${C.stop} Parar An\xE1lise`,this.analyzeBtn.title="Interromper e cancelar an\xE1lise em andamento",this.applyBtn.disabled=!0,this.startStopwatch(),this.startQuestionTimer(),this.dotPulseAp.className="eq-dot-pulse busy",this.dotPulseAdv.className="eq-dot-pulse busy",this.launcherDot.className="eq-launcher-dot busy",this.setOperationState("Analisando...","busy"),this.metricsLiveStatus&&(this.metricsLiveStatus.textContent="Calculando...",this.metricsLiveStatus.className="eq-live-stopwatch-status is-busy"),t&&this.setStatus(t,"info")):(this.analyzeBtn.disabled=!1,this.analyzeBtn.classList.remove("danger"),this.analyzeBtn.innerHTML=`${C.sparkles} Resolver com IA (Alt+R)`,this.analyzeBtn.title="Analisar e responder quest\xE3o ativa",this.applyBtn.disabled=!this.latestPlan||!this.latestPlan.actions.length,this.stopStopwatch(),this.stopQuestionTimer(),this.dotPulseAp.className="eq-dot-pulse",this.dotPulseAdv.className="eq-dot-pulse",this.launcherDot.className="eq-launcher-dot",this.setOperationState(this.autopilot.isActive()?"Monitorando":"Pronto","idle"),this.metricsLiveStatus&&this.metricsLiveStatus.textContent==="Calculando..."&&(this.metricsLiveStatus.textContent="Em espera",this.metricsLiveStatus.className="eq-live-stopwatch-status"))}setStatus(e,t="info"){this.statusTextAp.textContent=e,this.statusTextAdv.textContent=e,t==="error"?(this.setOperationState("Bloqueado","error"),this.dotPulseAp.className="eq-dot-pulse error",this.dotPulseAdv.className="eq-dot-pulse error",this.launcherDot.className="eq-launcher-dot error"):t==="warning"?(this.setOperationState("Interrompido","warning"),this.dotPulseAp.className="eq-dot-pulse stopped",this.dotPulseAdv.className="eq-dot-pulse stopped",this.launcherDot.className="eq-launcher-dot stopped"):t==="success"?(this.setOperationState("Confirmado","success"),this.dotPulseAp.className="eq-dot-pulse",this.dotPulseAdv.className="eq-dot-pulse",this.launcherDot.className="eq-launcher-dot"):this.isBusy?(this.setOperationState("Analisando...","busy"),this.dotPulseAp.className="eq-dot-pulse busy",this.dotPulseAdv.className="eq-dot-pulse busy",this.launcherDot.className="eq-launcher-dot busy"):(this.setOperationState(this.autopilot.isActive()?"Monitorando":"Pronto","info"),this.dotPulseAp.className="eq-dot-pulse",this.dotPulseAdv.className="eq-dot-pulse",this.launcherDot.className="eq-launcher-dot");let n=e.includes("Alternando")||e.includes("indispon\xEDvel")||e.includes("fallback")||e.includes("alternativo"),i=t==="error"?"> [ERRO] ":t==="success"?"> [SUCESSO] ":t==="warning"?"> [PARADO] ":n?"> [FALLBACK] ":"> [SYS] ",a=t==="error"?"text-red":t==="success"?"text-green":t==="warning"||n?"text-yellow":"text-blue";this.logToConsole(`${i}${e}`,a)}setPlan(e,t){if(this.latestPlan=e,this.resultContainer.style.display="flex",e.durationMs&&this.stopStopwatch(e.durationMs),e.usedModel){let r=this.shadow.querySelector("#eq-active-model-badge");if(r){let c=e.usedModel.replace("gemini-","").replace("-latest","");r.textContent=`\u25CF ${c}`,r.style.display="inline-block"}}let n=this.shadow.querySelector("#eq-badges");n.replaceChildren();let i=[e.mode.replace("_"," "),`${Math.round(e.confidence*100)}% Confian\xE7a`,`${e.actions.length} a\xE7\xF5es`,...e.usedModel?[e.usedModel]:[]];for(let r of i){let c=document.createElement("span");c.className="eq-brand-badge",c.textContent=r,n.appendChild(c)}let a=this.shadow.querySelector("#eq-rationale-text");a.textContent=e.rationale;let l=this.shadow.querySelector("#eq-actions-list");l.innerHTML="";for(let r of e.actions){let c=document.createElement("div");c.className="eq-action-item";let d="";r.t==="chk"?d=`chk ${r.id} (${r.c})`:r.t==="val"?d=`val "${r.v}" -> ${r.id}`:r.t==="sel"?d=`sel "${Array.isArray(r.v)?r.v.join(","):r.v}" -> ${r.id}`:r.t==="clk"?d=`clk ${r.id}`:r.t==="adv"?d="adv":r.t==="js"?d=`js: ${String(r.v).slice(0,40)}...`:r.t==="drag"&&(d=`drag "${r.from}" -> "${r.to}"`);let h=document.createElement("span");h.className="eq-action-badge",h.textContent=r.t.toUpperCase();let u=document.createElement("span");u.textContent=d,c.append(h,u),l.appendChild(c)}this.applyBtn.disabled=!t||!e.actions.length;let s=this.shadow.querySelector("#eq-execution-card");s&&(s.hidden=!0),this.refreshInspectorView(),this.refreshDebugView()}setExecutionReport(e){let t=this.shadow.querySelector("#eq-execution-card"),n=this.shadow.querySelector("#eq-execution-summary"),i=this.shadow.querySelector("#eq-execution-list");if(!t||!n||!i)return;t.hidden=!1,n.textContent=e.navigationVerified?`${e.verified}/${e.applied} a\xE7\xF5es verificadas. Navega\xE7\xE3o confirmada.`:`${e.verified}/${e.applied} a\xE7\xF5es verificadas. ${e.navigationEvidence}`,n.className=`eq-execution-summary ${e.success?"is-success":"is-warning"}`,i.replaceChildren();let a=this.shadow.querySelector("#eq-execution-placeholder");a&&(a.textContent=e.navigationVerified?"Fluxo conclu\xEDdo: aplica\xE7\xE3o e navega\xE7\xE3o confirmadas.":`Fluxo interrompido: ${e.navigationEvidence}`,a.className=`eq-execution-placeholder ${e.success?"is-success":"is-warning"}`);for(let l of e.reports){let s=document.createElement("div");s.className=`eq-execution-row ${l.verified?"is-success":"is-failed"}`;let r=document.createElement("span");r.className="eq-execution-state",r.textContent=l.verified?"OK":"FALHOU";let c=document.createElement("div");c.className="eq-execution-details";let d=document.createElement("strong");d.textContent=l.target;let h=document.createElement("span");if(h.textContent=`${l.strategy} | ${l.evidence}`,c.append(d,h),s.append(r,c),l.error){let u=document.createElement("small");u.textContent=l.error,s.appendChild(u)}i.appendChild(s)}}setInspectorPrompt(e,t){this.latestPromptText=e,this.inspPrompt&&(this.inspPrompt.textContent=e),t&&this.inspModel&&(this.inspModel.textContent=t),this.inspLatency&&(this.inspLatency.textContent="Aguardando IA..."),this.activeTab==="debug"&&this.refreshDebugView()}refreshInspectorView(){let e=this.latestPlan;if(e)if(this.inspModel.textContent=e.usedModel||this.initialSettings.model,this.inspLatency.textContent=e.durationMs?`${e.durationMs}ms`:"--",this.inspTokens.textContent=e.tokensUsed?`${e.tokensUsed}`:"--",this.inspPrompt.textContent=e.promptSent||this.latestPromptText||"Prompt n\xE3o registrado para esta requisi\xE7\xE3o.",this.inspRationale.textContent=e.rationale,this.inspActions.innerHTML="",e.actions.length>0)for(let t of e.actions){let n=document.createElement("div");n.className="eq-action-item",n.textContent=JSON.stringify(t),this.inspActions.appendChild(n)}else this.inspActions.innerHTML='<div class="text-muted" style="padding: 4px;">Nenhuma a\xE7\xE3o prescrita pela IA.</div>';else this.latestPromptText&&(this.inspPrompt.textContent=this.latestPromptText)}showFloatingAnswers(e){let t=e||this.latestPlan;t&&this.floatingAnswers.show(t)}hideFloatingAnswers(){this.floatingAnswers.hide()}renderKeysList(){if(!this.keysListEl)return;let e=k.getAllKeys();if(this.keysBadgeEl){let i=e.filter(s=>!s.isCooldown).length,a=e.reduce((s,r)=>s+(r.winCount||0),0),l=i>=3?" \u26A1 TURBO":"";this.keysBadgeEl.textContent=`${e.length} chave${e.length>1?"s":""} (${i} pronta${i!==1?"s":""})${l}`,this.keysBadgeEl.className=`eq-key-badge ${i>=3?"racing":i>0?"ready":"cooldown"}`}this.keysListEl.replaceChildren();let t=this.shadow?.querySelector("#eq-keys-collapsible");t&&t.style.display!=="none"&&(t.style.maxHeight="none",t.style.overflow="visible"),[...e].sort((i,a)=>{let l=i.winCount||0,s=a.winCount||0;if(l!==s)return s-l;let r=i.lastLatencyMs||99999,c=a.lastLatencyMs||99999;if(r!==c)return r-c;let d=i.isCooldown?1:0,h=a.isCooldown?1:0;return d-h}).forEach((i,a)=>{let l=e.findIndex(b=>b.id===i.id),s=l>=0?l:a,r=document.createElement("div");r.className="eq-key-item";let c=document.createElement("div");c.className="eq-key-info";let d=document.createElement("span");d.className="eq-key-label",d.textContent=i.label||`Chave ${s+1}`;let h=document.createElement("span");h.className="eq-key-masked",h.textContent=ee.maskKey(i.key),h.title="Clique para copiar a chave",h.style.cursor="pointer",h.addEventListener("click",()=>{navigator.clipboard?.writeText(i.key),this.setStatus(`Chave ${s+1} copiada para a \xE1rea de transfer\xEAncia!`,"info")});let u=document.createElement("span");if(i.isCooldown){u.className="eq-key-badge cooldown";let b=Math.ceil(i.remainingCooldownMs/1e3);u.textContent=`\u23F1 Cooldown (${b}s)`}else i.lastError&&i.errorCount&&i.errorCount>3?(u.className="eq-key-badge invalid",u.textContent="Erro",u.title=i.lastError):i.lastLatencyMs?(u.className="eq-key-badge ready",u.textContent=`Pronta (${i.lastLatencyMs}ms)`):(u.className="eq-key-badge ready",u.textContent="Pronta");c.appendChild(d),c.appendChild(h),c.appendChild(u);let p=i.winCount||0;if(p>0){let b=document.createElement("span");b.className="eq-key-badge winner",b.textContent=`\u{1F3C6} ${p} vit\xF3ria${p>1?"s":""}`,b.title=`Esta chave foi a mais r\xE1pida ${p} vez${p>1?"es":""} nas corridas paralelas`,c.appendChild(b)}let f=document.createElement("div");f.className="eq-key-actions";let y=document.createElement("button");y.className="eq-icon-btn",y.type="button",y.title="Testar esta chave",y.innerHTML=C.sparkles,y.addEventListener("click",async()=>{this.setStatus(`Testando chave ${i.label||s+1}...`,"info");let b=await $e(i.key);b.ok?(k.markSuccess(i.key,120),this.setStatus(`\u2713 ${i.label||`Chave ${s+1}`}: Conex\xE3o com Google Gemini aprovada!`,"success")):(k.markInvalid(i.key,b.message),this.setStatus(`\u26A0\uFE0F ${i.label||`Chave ${s+1}`}: ${b.message}`,"error")),this.renderKeysList()});let v=document.createElement("button");v.className="eq-icon-btn",v.type="button",v.title="Editar chave",v.innerHTML=C.edit,v.addEventListener("click",()=>{let b=window.prompt(`Editar ${i.label||`Chave ${s+1}`}:`,i.key);if(b!==null&&b.trim()){let m=k.updateKey(i.id,b.trim());if(m.ok){let x=k.exportRawKeys();this.callbacks.onSettingsChange({apiKey:x[0],apiKeys:x}),this.setStatus(`Chave ${s+1} atualizada com sucesso!`,"success"),this.renderKeysList()}else this.setStatus(m.message,"warning")}});let g=document.createElement("button");g.className="eq-icon-btn",g.type="button",g.title="Remover chave",g.innerHTML=C.trash,e.length<=1?(g.disabled=!0,g.style.opacity="0.3",g.title="Voc\xEA precisa manter pelo menos 1 chave cadastrada."):g.addEventListener("click",()=>{if(confirm(`Remover permanentemente a ${i.label||`Chave ${s+1}`}?`)){let b=k.removeKey(i.id);if(b.ok){let m=k.exportRawKeys();this.callbacks.onSettingsChange({apiKey:m[0],apiKeys:m}),this.setStatus("Chave removida com sucesso.","info"),this.renderKeysList()}else this.setStatus(b.message,"warning")}}),f.appendChild(y),f.appendChild(v),f.appendChild(g),r.appendChild(c),r.appendChild(f),this.keysListEl.appendChild(r)})}updateModelSelect(e,t){let n=e.filter(l=>D(l.id)),i=t&&D(t)?t:D(this.initialSettings.model)?this.initialSettings.model:"gemini-2.5-flash";this.modelSelect.innerHTML="";let a=!1;n.forEach(l=>{let s=l.id===i;s&&(a=!0),this.modelSelect.add(new Option(l.name,l.id,!1,s))}),!a&&i&&D(i)&&this.modelSelect.add(new Option(`Gemini (${i})`,i,!1,!0)),this.modelSelect.value=i}updateSelectedModel(e){if(!D(e))return;Array.from(this.modelSelect.options).some(n=>n.value===e)||this.modelSelect.add(new Option(`Gemini (${e})`,e,!1,!0)),this.modelSelect.value=e}applyHostDarkMode(e){document.getElementById("eq-host-dark-mode-style")?.remove(),this.host.classList.toggle("eq-dark-mode-active",e)}startQuestionTimer(){this.currentQuestionStartTime=Date.now(),this.questionLiveTimerInterval&&clearInterval(this.questionLiveTimerInterval),this.metricsLiveStatus&&(this.metricsLiveStatus.textContent="Calculando...",this.metricsLiveStatus.classList.add("active"));let e=()=>{if(!this.metricsLiveTime)return;let t=Date.now()-this.currentQuestionStartTime,n=Math.floor(t/6e4),i=Math.floor(t%6e4/1e3),a=Math.floor(t%1e3/10);this.metricsLiveTime.textContent=`${String(n).padStart(2,"0")}:${String(i).padStart(2,"0")}.${String(a).padStart(2,"0")}`};e(),this.questionLiveTimerInterval=setInterval(e,50)}stopQuestionTimer(e){if(this.questionLiveTimerInterval&&(clearInterval(this.questionLiveTimerInterval),this.questionLiveTimerInterval=null),this.metricsLiveStatus&&(this.metricsLiveStatus.textContent="Parado",this.metricsLiveStatus.classList.remove("active")),this.metricsLiveTime&&this.currentQuestionStartTime>0){let t=e!==void 0?e:Math.max(0,Date.now()-this.currentQuestionStartTime),n=Math.floor(t/6e4),i=Math.floor(t%6e4/1e3),a=Math.floor(t%1e3/10);this.metricsLiveTime.textContent=`${String(n).padStart(2,"0")}:${String(i).padStart(2,"0")}.${String(a).padStart(2,"0")}`}}updateTimingMetrics(e){let t=e||xe();if(!this.metricTotalTime)return;let n=Math.floor(t.totalElapsedMs/1e3),i=Math.floor(n/60),a=n%60;this.metricTotalTime.textContent=`${String(i).padStart(2,"0")}:${String(a).padStart(2,"0")}`;let l=(t.averageDurationMs/1e3).toFixed(1);this.metricAvgTime.textContent=`${l}s`,this.metricTotalCount.textContent=String(t.completedQuestionsCount),this.metricsTotalBadge&&(this.metricsTotalBadge.textContent=`${t.completedQuestionsCount} Quest\xE3o(\xF5es)`),this.metricsHistoryCount&&(this.metricsHistoryCount.textContent=`${t.records.length} registros`),this.renderMetricsHistory(t.records)}renderMetricsHistory(e){if(!this.metricsHistoryList)return;if(e.length===0){this.metricsHistoryList.innerHTML='<div class="eq-metrics-empty">Nenhuma quest\xE3o respondida nesta sess\xE3o ainda.</div>';return}this.metricsHistoryList.innerHTML="";let t=[...e].reverse();for(let n of t){let i=document.createElement("div");i.className="eq-metrics-item";let a=document.createElement("div");a.className="eq-metrics-item-left";let l=document.createElement("span");l.className="eq-metrics-badge",l.textContent=`Q${n.questionIndex}`;let s=document.createElement("div");s.className="eq-metrics-item-info";let r=document.createElement("div");r.className="eq-metrics-item-title",r.textContent=n.questionTitle||`Quest\xE3o ${n.questionIndex}`;let c=document.createElement("div");c.className="eq-metrics-item-meta";let d=new Date(n.timestamp).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit",second:"2-digit"}),h=n.mode?n.mode.replace("_"," "):"auto";c.textContent=`${d} \u2022 Modo: ${h}${n.actionsCount?` \u2022 ${n.actionsCount} a\xE7\xE3o(\xF5es)`:""}`,s.appendChild(r),s.appendChild(c),a.appendChild(l),a.appendChild(s);let u=document.createElement("div");u.className="eq-metrics-item-right";let p=document.createElement("span");p.className="eq-metrics-item-dur",p.textContent=`${(n.durationMs/1e3).toFixed(2)}s`;let f=document.createElement("span");f.className=`eq-metrics-item-status is-${n.status}`,f.textContent=n.status==="verified"||n.status==="answered"?"\u2713 Injetado":n.status==="manual"?"Gabarito":"Pendente",u.appendChild(p),u.appendChild(f),i.appendChild(a),i.appendChild(u),this.metricsHistoryList.appendChild(i)}}copyMetricsReport(){let e=xe(),t=[];t.push("# Relat\xF3rio de Desempenho e Tempo \u2014 EasyQuiz"),t.push(`- **Quest\xF5es Respondidas:** ${e.completedQuestionsCount}`),t.push(`- **Tempo Total:** ${(e.totalElapsedMs/1e3).toFixed(1)}s`),t.push(`- **Tempo M\xE9dio por Quest\xE3o:** ${(e.averageDurationMs/1e3).toFixed(2)}s`),t.push(""),t.push("### Hist\xF3rico:"),e.records.length===0?t.push("_Nenhum registro ainda._"):e.records.forEach((n,i)=>{t.push(`${i+1}. **${n.questionTitle||`Q${n.questionIndex}`}**: ${(n.durationMs/1e3).toFixed(2)}s (${n.status})`)}),navigator.clipboard.writeText(t.join(`
`)).then(()=>{if(this.metricsCopyBtn){let n=this.metricsCopyBtn.innerHTML;this.metricsCopyBtn.innerHTML="\u2713 Copiado!",setTimeout(()=>{this.metricsCopyBtn.innerHTML=n},1500)}})}destroy(){this.stopStopwatch(),this.stopQuestionTimer(),this.autopilot.stop(),this.applyHostDarkMode(!1),this.callbacks.onDestroy(),this.host.remove()}};function Mo(){try{if(typeof document>"u"||!document.head||document.querySelector("link[data-easyquiz-preconnect]"))return;let o=document.createElement("link");o.rel="preconnect",o.href="https://generativelanguage.googleapis.com",o.crossOrigin="anonymous",o.setAttribute("data-easyquiz-preconnect","true"),document.head.appendChild(o);let e=document.createElement("link");e.rel="dns-prefetch",e.href="https://generativelanguage.googleapis.com",e.setAttribute("data-easyquiz-preconnect","true"),document.head.appendChild(e)}catch{}}async function So(){let o=window;if(we(),Mo(),o.__easyquiz){o.__easyquiz.toggle();return}let e=Fe(),t=null,n=null,i=0,a=new Ke(e,{onAnalyze:(r=1,c,d=!1)=>l(r,c,d),onApply:(r=1)=>void s(r),onDestroy:()=>{if(n){try{n.abort()}catch{}n=null}le(),delete o.__easyquiz},onCancel:()=>{if(n){try{n.abort()}catch{}n=null}le(),a.setProgress(0),a.setInterrupted("Opera\xE7\xE3o cancelada imediatamente pelo usu\xE1rio.")},onSettingsChange:r=>{e=wt(r)}});o.__easyquiz={toggle:()=>a.toggle(),destroy:()=>a.destroy(),analyze:async()=>{await l()}},window.addEventListener("keydown",r=>{if(r.altKey&&(r.key==="q"||r.key==="Q")){if(r.preventDefault(),!a)return;a.toggle(!0),l()}});async function l(r=1,c,d=!1){if(!e.apiKey){a.setStatus("Configure sua chave de API Gemini acima para come\xE7ar.","error"),a.toggle(!0);return}if(n)try{n.abort()}catch{}n=new AbortController;let h=n,u=()=>{try{h.abort()}catch{}};if(c&&(c.aborted?h.abort():c.addEventListener("abort",u,{once:!0})),h.signal.aborted){a.setBusy(!1),a.setProgress(0);return}i=Date.now(),a.setBusy(!0,"Identificando o bloco da quest\xE3o ativa na p\xE1gina..."),a.setProgress(20,"Varrendo escopo do DOM e controles..."),le(),a.hideFloatingAnswers();try{let p=Le(!1);p||(a.setStatus("Nenhum controle detectado. Tentando captura de tela inteira...","info"),p=he()),ut(p.scope),a.updateContext(p),a.logToConsole(`> [DOM] Escopo: <${p.scope.tagName.toLowerCase()}> com ${p.controls.length} controle(s) e ${p.questionText.length} caracteres.`,"text-blue"),a.setStatus(`Quest\xE3o localizada (${p.controls.length} controles). Preparando an\xE1lise...`,"info"),a.setProgress(40,`Consultando Gemini (${e.model})...`);let f=await gt(p.scope,e.useVision);if(f.length>0){let x=f.map(T=>T.element).filter(Boolean);dt(x)}if(h.signal.aborted)return;let y=Ce||e.model;a.setStatus(f.length>0?`Consultando Gemini (${y}) com ${f.length} imagem(ns) anexada(s)...`:`Consultando Gemini (${y}) via DOM nativo (modo r\xE1pido)...`,"info");let v=qe(p,f,e);a.setInspectorPrompt(v,e.model);let g=(x,T)=>{a.setStatus(x,T==="warning"?"info":T);let A=x.match(/Onda\s+\d+.*?\[([^\]]+)\]/);if(A){let q=A[1].split(",")[0].trim();a.setProgress(50,`Gemini ${q} respondendo...`)}},{plan:b,usedModel:m}=await We(p,f,e,g,h.signal);if(h.signal.aborted)return;if(b.needsMoreContext){if(a.setProgress(55,"Ampliando escopo da quest\xE3o..."),a.setStatus("Enunciado ou contexto isolado detectado pela IA. Acionando Sele\xE7\xE3o Geral Expandida...","info"),a.logToConsole("> [DOM] Enunciado isolado. Ampliando escopo para sele\xE7\xE3o expandida...","text-blue"),p=Le(!0),p||(p=he()),ut(p.scope),a.updateContext(p),f=await gt(p.scope,e.useVision),f.length>0){let A=f.map(q=>q.element).filter(Boolean);dt(A)}a.setStatus(`Reconsultando IA com escopo ampliado (${p.controls.length} controles)...`,"info");let x=qe(p,f,e);a.setInspectorPrompt(x,e.model),b=(await We(p,f,e,g,h.signal)).plan}return h.signal.aborted||(a.setProgress(70,"Resposta recebida da IA! Processando plano..."),a.logToConsole(`> [IA] Modelo: ${m||e.model} | Modo: ${b.mode} | Confian\xE7a: ${(b.confidence*100).toFixed(0)}%`,"text-green"),b.rationale&&a.logToConsole(`> [IA] Racioc\xEDnio: "${b.rationale}"`,"text-blue"),a.logToConsole(`> [IA] ${b.actions.length} a\xE7\xE3o(\xF5es) prescritas no plano.`,"text-blue"),b.memoryToStore&&(qt(b.memoryToStore),a.logToConsole(`> [RAG] \u{1F9E0} Nova mem\xF3ria te\xF3rica salva na sess\xE3o: "${b.memoryToStore}"`,"text-yellow")),t=b,a.updateContext(p,b),jt(b.actions,b.confidence),a.setPlan(b,!e.dryRun),b.pageType==="conclusion"?(a.setProgress(100,"Atividade conclu\xEDda!"),a.setStatus("Atividade conclu\xEDda ou tela final detectada pela IA.","success")):b.pageType==="info"?(a.setProgress(100,"Contexto absorvido na mem\xF3ria!"),a.setStatus("\u{1F4D8} Conte\xFAdo de contexto absorvido na mem\xF3ria RAG. Avan\xE7ando...","success")):b.pageType==="start"?(a.setProgress(100,"In\xEDcio detectado!"),a.setStatus("In\xEDcio de atividade detectado. Iniciando...","info")):(a.setProgress(80,"Plano de resolu\xE7\xE3o pronto!"),a.setStatus(e.dryRun?"Simula\xE7\xE3o conclu\xEDda. As respostas foram real\xE7adas na p\xE1gina sem altera\xE7\xE3o.":"Resolu\xE7\xE3o pronta! Verifique o realce na tela e aplique quando desejar.","success")),e.dryRun&&b.pageType==="question"&&a.showFloatingAnswers(b),h.signal.aborted)?void 0:((d||e.autoApply)&&!e.dryRun&&await s(r,h.signal,d),b)}catch(p){if(h.signal.aborted||p instanceof Error&&(p.name==="AbortError"||p.message.includes("cancelada"))){le(),a.setProgress(0),a.setInterrupted("Opera\xE7\xE3o cancelada pelo usu\xE1rio.");return}le(),a.setProgress(0);let f=p instanceof Error?p.message:"Falha desconhecida na an\xE1lise.";a.setStatus(f,"error"),a.setErrorDiagnostic(f,"An\xE1lise da IA");return}finally{c?.removeEventListener("abort",u),n===h&&(n=null),h.signal.aborted||a.setBusy(!1)}}async function s(r=1,c,d=!1){if(c?.aborted)return;if(!t){a.setStatus("Nenhum plano dispon\xEDvel para aplicar. Execute a an\xE1lise primeiro.","error");return}if(e.dryRun){a.setStatus("O modo de simula\xE7\xE3o est\xE1 ativo. Desmarque para poder aplicar.","error");return}let h=t.pageType==="info"||t.pageType==="start",u=(d||e.autoAdvance||h)&&t.confidence>=e.confidenceThreshold&&!t.needsMoreContext;a.setBusy(!0,"Aplicando respostas no formul\xE1rio..."),a.setProgress(85,`Aplicando ${t.actions.length} a\xE7\xE3o(\xF5es) no formul\xE1rio...`),a.logToConsole(`> [EXEC] Iniciando aplica\xE7\xE3o com 6 vias de persist\xEAncia para ${t.actions.length} a\xE7\xE3o(\xF5es)...`,"text-blue");try{let p=await rt(t,u,r,Te(e));if(c?.aborted)return;a.setExecutionReport(p);let f=i>0?Date.now()-i:1200,y=t.actions.filter(m=>m.t!=="adv"&&m.t!=="js").length,v=t.pageType==="question"||y>0,g=p.applied>0;if((v?p.success||g:p.success||p.advanced)||g){a.setProgress(100,"Sucesso! Resposta preenchida."),a.logToConsole(`> [DOM] \u2713 ${p.applied} a\xE7\xE3o(\xF5es) aplicada(s) com sucesso na p\xE1gina!`,"text-green"),p.advanced?a.logToConsole("> [NAV] \u2713 Bot\xE3o de confirma\xE7\xE3o/avan\xE7o acionado com sucesso!","text-green"):u&&a.logToConsole(`> [NAV] ${p.navigationEvidence}`,"text-blue"),a.setStatus(p.advanced?`Sucesso: ${p.applied} resposta(s) preenchida(s) e avan\xE7ando.`:`Resposta aplicada na p\xE1gina (${p.applied} a\xE7\xE3o(\xF5es)).`,"success"),a.hideFloatingAnswers();let m=Ct({id:`q-${Date.now()}`,questionIndex:(xe().records.length||0)+1,questionTitle:t.rationale?t.rationale.slice(0,45)+"...":`Quest\xE3o ${t.mode||"Auto"}`,durationMs:f,status:"answered",mode:t.mode,actionsCount:p.applied});a.updateTimingMetrics(m)}else a.setProgress(0,"Alvo de resposta n\xE3o localizado."),a.logToConsole(`> [DOM] Alerta: nenhum controle de resposta foi modificado no DOM. Pend\xEAncias: ${p.failed.join(", ")||"nenhuma a\xE7\xE3o"}.`,"text-yellow"),a.setStatus("Controle de resposta n\xE3o encontrado na p\xE1gina. Use o bot\xE3o Gabarito no painel se desejar.","warning"),e.dryRun&&a.showFloatingAnswers(t)}catch(p){a.setProgress(0);let f=p instanceof Error?p.message:"Falha ao aplicar plano.";a.setStatus(`Erro ao aplicar: ${f}`,"error"),a.logToConsole(`> [ERRO] ${f}`,"text-red")}finally{a.setBusy(!1)}}a.toggle(!0)}So().catch(o=>{console.error("[EasyQuiz] Erro fatal na inicializa\xE7\xE3o:",o),window.alert(`EasyQuiz: falha ao iniciar: ${o instanceof Error?o.message:String(o)}`)});})();
