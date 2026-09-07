/* EasyQuiz v1.0.0 — Resolução inteligente de quizzes sem servidor
 * GitHub: https://github.com/minifoxie/EasyQuiz
 * 100% Client-side. Direct Google Gemini REST API.
 */
"use strict";(()=>{var X={apiKey:"",apiKeys:[],model:"gemini-2.5-flash",uiMode:"easy",modeHint:"",engine:"smart",dryRun:!1,autoApply:!0,autoAdvance:!1,hostDarkMode:!0,useVision:!1,confidenceThreshold:.8};function R(o){if(!o||typeof o!="string")return!1;let e=o.toLowerCase().trim().replace(/^models\//,"");if(!e.includes("gemini"))return!1;let t=["imagen","image","veo","omni","video","embedding","embed","tts","audio","speech","voice","sound","live","transcribe","bidi","aqa","learnlm","deep-research","computer-use","robotics","rt-1","rt-2","mediapipe","cyber","latest","-ultra","experimental"];for(let n of t)if(e.includes(n))return!1;return!(!e.includes("flash")&&!e.includes("pro"))}var _e="easyquiz_settings_v2",ne="easyquiz_activity_metrics";function Ke(){try{let o=localStorage.getItem(_e);if(!o){let r=localStorage.getItem("easyquiz_settings_v1");if(r){let s=JSON.parse(r);return{...X,apiKey:s.apiKey||""}}return{...X}}let e=JSON.parse(o),t=typeof e.model=="string"&&R(e.model)?e.model:X.model,n=Array.isArray(e.apiKeys)?e.apiKeys.map(r=>typeof r=="string"?r.trim().replace(/^["']|["']$/g,""):"").filter(r=>r.length>5):[],i=typeof e.apiKey=="string"?e.apiKey.trim().replace(/^["']|["']$/g,""):"";return n.length===0&&i&&(n=[i]),{apiKey:n[0]||i||X.apiKey,apiKeys:n,model:t,uiMode:e.uiMode==="easy"||e.uiMode==="advanced"?e.uiMode:X.uiMode,modeHint:e.modeHint??"",engine:e.engine??"smart",dryRun:!!e.dryRun,autoApply:e.autoApply!==void 0?!!e.autoApply:!0,autoAdvance:!!e.autoAdvance,hostDarkMode:e.hostDarkMode!==void 0?!!e.hostDarkMode:!0,useVision:!!e.useVision,confidenceThreshold:typeof e.confidenceThreshold=="number"?e.confidenceThreshold:X.confidenceThreshold}}catch{return{...X}}}function gt(){try{localStorage.removeItem(_e),localStorage.removeItem("easyquiz_settings_v1"),localStorage.removeItem(ne),sessionStorage.removeItem(ne);let o=[];for(let e=0;e<localStorage.length;e++){let t=localStorage.key(e);t&&(t.startsWith("eq_")||t.startsWith("easyquiz_"))&&o.push(t)}o.forEach(e=>localStorage.removeItem(e)),Ge()}catch(o){console.warn("[EasyQuiz] Erro ao resetar dados:",o)}}function be(o){try{let e=localStorage.getItem("eq_domain_cache_"+o);if(!e)return{};let t=JSON.parse(e);if(t.advanceSelector&&/inject|injetar/i.test(t.advanceSelector)){t.advanceSelector=void 0;try{localStorage.removeItem("eq_domain_cache_"+o)}catch{}}return t}catch{return{}}}function je(o,e){if(e.advanceSelector&&/inject|injetar/i.test(e.advanceSelector))return;let n={...be(o),...e};try{localStorage.setItem("eq_domain_cache_"+o,JSON.stringify(n))}catch(i){console.warn("[EasyQuiz] Erro cache de dominio:",i)}}function ft(o){let e=Ke(),t=Array.isArray(o.apiKeys)?o.apiKeys.map(a=>typeof a=="string"?a.trim().replace(/^["']|["']$/g,""):"").filter(a=>a.length>5):e.apiKeys,n;typeof o.apiKey=="string"?n=o.apiKey.trim().replace(/^["']|["']$/g,""):Array.isArray(o.apiKeys)&&o.apiKeys.length>0?n=t[0]||"":n=e.apiKey,n&&!t.includes(n)&&(t=[n,...t]),t.length>0&&(!n||!t.includes(n))&&(n=t[0]);let i={...e,...o,apiKey:n,apiKeys:t};try{localStorage.setItem(_e,JSON.stringify(i))}catch(a){console.warn("[EasyQuiz] Falha ao persistir configura\xE7\xF5es no localStorage:",a)}return i}var oe=[],mt=12,_t=1200;function bt(o){let e=o.trim().replace(/\s+/g," ").slice(0,_t);e&&!oe.includes(e)&&(oe.push(e),oe.length>mt&&(oe=oe.slice(-mt)))}function Me(){return oe}function Ge(){oe=[]}function vt(){return{startTime:Date.now(),totalElapsedMs:0,completedQuestionsCount:0,averageDurationMs:0,records:[]}}var fe=vt();function re(){try{localStorage.removeItem(ne)}catch{}return fe}function Kt(o){fe=o;try{let e=JSON.stringify(o);sessionStorage.setItem(ne,e),localStorage.removeItem(ne)}catch{}}function Fe(o){let e=fe,t=Date.now(),n=e.records[e.records.length-1];if(n&&n.id===o.id&&t-n.timestamp<3e3)return e;let i={...o,timestamp:t},a=[...e.records,i],r=a.filter(p=>p.status==="answered"||p.status==="verified").length,s=a.reduce((p,h)=>p+h.durationMs,0),l=r>0?Math.round(s/r):0,c={startTime:e.startTime||t,totalElapsedMs:Math.max(t-(e.startTime||t),s),completedQuestionsCount:r,averageDurationMs:l,records:a};return Kt(c),c}function ve(){fe=vt();try{sessionStorage.removeItem(ne),localStorage.removeItem(ne)}catch{}return fe}var yt=[{id:"native-value-events",widget:"text",label:"Setter nativo com input/change/blur",precondition:"Campo edit\xE1vel vis\xEDvel e n\xE3o desabilitado.",evidence:"value ou textContent coincide exatamente com o valor esperado.",risk:"low",cost:"fast"},{id:"native-choice-state",widget:"choice",label:"Estado nativo de radio/checkbox",precondition:"Input ou widget ARIA \xFAnico localizado.",evidence:"checked/aria-checked/data-state do alvo e grupo correspondem ao esperado.",risk:"low",cost:"fast"},{id:"native-select-events",widget:"select",label:"Sele\xE7\xE3o nativa por value/texto exato",precondition:"Select vis\xEDvel com op\xE7\xE3o correspondente.",evidence:"option.selected e selected value correspondem ao esperado.",risk:"low",cost:"fast"},{id:"aria-combobox-keyboard",widget:"combobox",label:"Combobox ARIA por foco e teclado",precondition:"Combobox vis\xEDvel com popup/op\xE7\xF5es acess\xEDveis.",evidence:"aria-expanded, aria-activedescendant ou op\xE7\xE3o selecionada mudam.",risk:"medium",cost:"normal"},{id:"click-to-place",widget:"drag",label:"Selecionar item e clicar no destino",precondition:"Cart\xE3o e dropzone vis\xEDveis com protocolo click-to-place.",evidence:"Item passa a ser filho do destino ou recebe estado de colocado.",risk:"medium",cost:"normal"},{id:"html5-drag-drop",widget:"drag",label:"HTML5 dragstart/dragover/drop",precondition:"Origem draggable e destino aceita drag/drop.",evidence:"Relocation, callback ou estado placed confirmado.",risk:"medium",cost:"normal"},{id:"keyboard-order",widget:"order",label:"Ordena\xE7\xE3o por foco e teclado",precondition:"Itens orden\xE1veis com foco/roles ou bot\xF5es de mover.",evidence:"Ordem dos itens no DOM corresponde \xE0 sequ\xEAncia esperada.",risk:"medium",cost:"normal"},{id:"navigation-feedback",widget:"navigation",label:"Verificar e confirmar feedback/transi\xE7\xE3o",precondition:"Bot\xE3o de verifica\xE7\xE3o/avan\xE7o \xFAnico e habilitado.",evidence:"Feedback esperado e assinatura espec\xEDfica da quest\xE3o mudam.",risk:"high",cost:"normal"},{id:"javascript-explicit",widget:"javascript",label:"JavaScript limitado via capability expl\xEDcita",precondition:"Engine javascript autorizada e a\xE7\xE3o declarativa insuficiente.",evidence:"Efeito DOM esperado confirmado por verificador.",risk:"high",cost:"last-resort"}];function jt(o){if(!o||o.length===0)return yt.filter(t=>t.widget!=="javascript");let e=new Set(o);return yt.filter(t=>e.has(t.widget))}function xt(o){return jt(o).map(e=>`${e.id}: ${e.label} | pr\xE9: ${e.precondition} | prova: ${e.evidence} | risco: ${e.risk}`).join(`
`)}var wt=`Voc\xEA \xE9 o motor operacional inteligente do EasyQuiz. Sa\xEDda EXCLUSIVA em JSON minificado, sem markdown ou conversa.

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
`;function Gt(o,e){return/khanacademy\.org/i.test(o)||e.includes("perseus")?"[PLATAFORMA: Khan Academy \u2014 widgets Perseus; use js via $eq para widgets interativos se necess\xE1rio]":/forms\.google|docs\.google.*forms/i.test(o)||e.includes("Qr7Oae")?"[PLATAFORMA: Google Forms \u2014 IDs via data-item-id, data-params]":/wayground|quizizz/i.test(o)||e.includes("data-functional-selector")?"[PLATAFORMA: Wayground/Quizizz \u2014 alternativas s\xE3o cards clic\xE1veis, use clk]":/moodle|ava\.|classroom\.google/i.test(o)?"[PLATAFORMA: Moodle/AVA/Classroom \u2014 formul\xE1rios padr\xE3o]":/duolingo/i.test(o)?"[PLATAFORMA: Duolingo \u2014 tiles clic\xE1veis, use clk por texto]":/blackboard|canvas\.instructure/i.test(o)?"[PLATAFORMA: Canvas/Blackboard \u2014 quiz-question padr\xE3o]":/socrative|kahoot/i.test(o)?"[PLATAFORMA: Socrative/Kahoot \u2014 alternativas s\xE3o bot\xF5es, use clk]":""}function ye(o,e,t){let n=o.htmlSnippet.includes("draggable")||o.htmlSnippet.includes("perseus")||o.htmlSnippet.includes("category")||o.htmlSnippet.includes("dropzone")||o.controls.some(g=>g.type==="draggable"||g.type==="dropzone"),i=new Set(["navigation"]);o.controls.some(g=>["text","number","textarea","contenteditable"].some(v=>g.type.includes(v)))&&i.add("text"),o.controls.some(g=>["radio","checkbox"].includes(g.type)||g.tag==="button")&&i.add("choice"),o.controls.some(g=>g.tag==="select")&&i.add("select"),o.controls.some(g=>/combobox|dropdown/i.test(g.type))&&i.add("combobox"),(o.controls.some(g=>["draggable","dropzone"].includes(g.type))||n)&&i.add("drag"),t.engine==="javascript"&&i.add("javascript");let a=/katex|latex|math|matrix|formula|frac|\$|\^|\_/i.test(o.htmlSnippet)||/calcular|calcule|resolva|matriz|equação|função|probabilidade|geometria|fórmula|coordenada|sistema/i.test(o.questionText),s=o.questionText.length<250||n||o.controls.length<4||a?`
[HTML]:
${o.htmlSnippet.slice(0,3500).replace(/\s+/g," ")}`:`
[HTML]: Omitido.`,l=Me(),c=l.length>0?`
[MEM\xD3RIA]:
${l.join(" | ")}
`:"",p=o.controls.filter(g=>g.role!=="navigation"),h=o.controls.filter(g=>g.role==="navigation"),d=Gt(o.sourceUrl,o.htmlSnippet),m=d?`
${d}
`:"";return`--- AN\xC1LISE ---
[MODO]: ${t.engine} | Dica: ${t.modeHint||"Auto"}
[URL]: ${o.sourceUrl}
[P\xC1GINA]: ${o.pageTitle}${c}${m}
[ESTRAT\xC9GIAS]:
${xt([...i])}
[DADOS]
[TEXTO]:
${o.questionText}${s}

[RESPOSTAS]:
${p.length>0?JSON.stringify(p.map(g=>({id:g.id,t:g.type,n:g.name||void 0,txt:g.label,v:g.value||void 0,opt:g.options.length?g.options:void 0}))):"Nenhuma"}

[NAVEGA\xC7\xC3O]:
${h.length>0?h.map(g=>`"${g.label||g.id}"[${g.type}]`).join(","):"Nenhuma"}

[IMAGENS E GR\xC1FICOS ANEXADOS (${e.length})]:
${e.length>0?e.map((g,v)=>`  - Imagem ${v+1}: ${g.associatedLabel||"Gr\xE1fico da Quest\xE3o"}${g.alt?` (Texto alt: "${g.alt}")`:""}`).join(`
`):"Nenhum anexo visual."}
[/DADOS]
Sa\xEDda em JSON v\xE1lido.`}var Ft=new Set(["question","info","start","conclusion"]),Ut=new Set(["texto_livre","escolha_unica","escolha_multipla","verdadeiro_falso","preenchimento","acao_sem_resposta","categorizacao","ordenacao","arrastar_soltar"]),Qt=new Set(["val","chk","sel","clk","adv","js","drag"]),Yt=150,xe=2e3;function V(o,e=""){return o==null?e:typeof o=="string"?o.trim().slice(0,xe):typeof o=="number"||typeof o=="boolean"?String(o).trim().slice(0,xe):e}function Jt(o,e){if(!o||typeof o!="object")return null;let t=o,n=t.t;if(typeof n!="string"||!Qt.has(n))return null;if(n==="adv"){let s=t.id??t.target??t.name??t.selector;return{t:"adv",...V(s)?{id:V(s,"").slice(0,500)}:{}}}if(n==="drag"){let s=V(t.from??t.source),l=V(t.to??t.target??t.destination);return!s||!l?null:{t:"drag",from:s.slice(0,500),to:l.slice(0,500)}}if(n==="js"){let s=V(t.v??t.code??t.script);return!s||s.length>8e3?null:{t:"js",v:s}}let i=t.id??t.target??t.name??t.selector??t.element;(i==null||i==="")&&n==="val"&&(i="1");let a=V(i).slice(0,500);if(!a)return null;if(n==="val"){let s=t.v!==void 0?t.v:t.value!==void 0?t.value:t.val!==void 0?t.val:t.text!==void 0?t.text:t.answer;return{t:"val",id:a,v:V(s).slice(0,xe)}}if(n==="sel"){let s=t.v!==void 0?t.v:t.value!==void 0?t.value:t.val!==void 0?t.val:t.values,c=(Array.isArray(s)?s:[s]).map(p=>V(p).slice(0,500)).filter(Boolean);return{t:"sel",id:a,v:c}}if(n==="chk"){let s=t.c===!1||t.c==="false"||t.c===0||t.c==="0"||t.c==="off"||t.c==="unchecked"||t.c==="desmarcar",l={t:"chk",id:a,c:!s};return t.v!==void 0&&(l.v=V(t.v).slice(0,xe)),l}let r={t:"clk",id:a};if(t.c!==void 0){let s=t.c===!1||t.c==="false"||t.c===0||t.c==="0"||t.c==="off"||t.c==="unchecked"||t.c==="desmarcar";r.c=!s}return t.v!==void 0&&(r.v=V(t.v).slice(0,xe)),Array.isArray(t.co)&&t.co.length===2&&t.co.every(s=>typeof s=="number"&&Number.isFinite(s))&&(r.co=[t.co[0],t.co[1]]),r}function Ue(o){if(!o||typeof o!="object")return{pageType:"info",mode:"acao_sem_resposta",confidence:.5,rationale:"Resposta estruturada n\xE3o identificada; avan\xE7ando como informativo.",actions:[{t:"adv"}]};let e=o,t=e.pageType,n=e.mode;(typeof t!="string"||!Ft.has(t))&&(t="question"),(typeof n!="string"||!Ut.has(n))&&(n="escolha_unica");let i=Array.isArray(e.actions)?e.actions:[],a=[];for(let c=0;c<Math.min(i.length,Yt);c++){let p=Jt(i[c],c);p&&a.push(p)}let r=a.filter(c=>c.t!=="adv"),s=a.some(c=>c.t==="adv");t==="conclusion"?a.length=0:t==="info"||t==="start"?s||a.push({t:"adv"}):t==="question"&&!s&&a.push({t:"adv"});let l=typeof e.confidence=="number"&&Number.isFinite(e.confidence)?Math.min(1,Math.max(0,e.confidence)):.85;return{pageType:t,mode:n,confidence:l,rationale:V(e.rationale,"Plano validado e auto-recuperado."),actions:a,...V(e.memoryToStore)?{memoryToStore:V(e.memoryToStore)}:{},...e.needsMoreContext?{needsMoreContext:!!e.needsMoreContext}:{}}}var j=class{keys=new Map;constructor(e=[]){this.init(e)}init(e){let t=new Map(this.keys);this.keys.clear(),Array.from(new Set(e.map(i=>i.trim().replace(/^["']|["']$/g,"")).filter(i=>i.length>5))).forEach((i,a)=>{let r=this.generateId(i),s=t.get(r)||t.get(i);this.keys.set(r,{id:r,key:i,label:s?.label||`Chave ${a+1}`,addedAt:s?.addedAt||Date.now(),lastUsedAt:s?.lastUsedAt,lastLatencyMs:s?.lastLatencyMs,cooldownUntil:s?.cooldownUntil,errorCount:s?.errorCount||0,lastError:s?.lastError,winCount:s?.winCount||0})})}generateId(e){let t=0;for(let n=0;n<e.length;n++)t=(t<<5)-t+e.charCodeAt(n),t|=0;return`key_${Math.abs(t).toString(36).slice(0,8)}`}static maskKey(e){let t=e.trim().replace(/^["']|["']$/g,"");return t.length<=10?"\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022":`${t.slice(0,6)}...${t.slice(-4)}`}getAllKeys(){let e=Date.now();return Array.from(this.keys.values()).map(t=>{let n=Math.max(0,(t.cooldownUntil||0)-e);return{...t,isCooldown:n>0,remainingCooldownMs:n}})}getHealthyKeys(){let e=Date.now();return Array.from(this.keys.values()).filter(t=>(t.cooldownUntil||0)<=e&&(t.errorCount||0)<5)}getBestKey(){let e=this.getHealthyKeys();if(e.length>0)return e.sort((n,i)=>{let a=n.lastLatencyMs??99999,r=i.lastLatencyMs??99999;return a-r}),e[0].key;let t=Array.from(this.keys.values());return t.length>0?(t.sort((n,i)=>(n.cooldownUntil||0)-(i.cooldownUntil||0)),t[0].key):""}getDiverseKeys(e){let t=this.getHealthyKeys();if(t.length===0){let i=this.getBestKey();return i?[i]:[]}t.sort((i,a)=>{let r=i.lastLatencyMs??99999,s=a.lastLatencyMs??99999;return r-s});let n=[];for(let i=0;i<e;i++){let a=t[i%t.length];n.push(a.key)}return n}markQuotaHit(e,t=5e3){let n=this.findKeyObj(e);n&&(n.cooldownUntil=Date.now()+t,n.errorCount=(n.errorCount||0)+1,n.lastError=`Cota tempor\xE1ria atingida (HTTP 429). Cooldown de ${t/1e3}s ativado.`)}markOverloaded(e,t=5e3){let n=this.findKeyObj(e);n&&(n.cooldownUntil=Date.now()+t,n.errorCount=(n.errorCount||0)+1,n.lastError=`Servidores sobrecarregados (HTTP 503). Cooldown de ${t/1e3}s ativado.`)}markSuccess(e,t){let n=this.findKeyObj(e);n&&(n.lastLatencyMs=t,n.lastUsedAt=Date.now(),n.errorCount=0,n.lastError=void 0,n.cooldownUntil=void 0)}markWinner(e){let t=this.findKeyObj(e);t&&(t.winCount=(t.winCount||0)+1)}markInvalid(e,t){let n=this.findKeyObj(e);n&&(n.errorCount=99,n.lastError=t)}addKey(e,t){let n=e.trim().replace(/^["']|["']$/g,"");if(!n)return{ok:!1,message:"Chave n\xE3o pode ser vazia."};if(n.length<15)return{ok:!1,message:"Chave de API inv\xE1lida ou muito curta."};let i=this.generateId(n);if(this.keys.has(i))return{ok:!1,message:"Esta chave de API j\xE1 est\xE1 cadastrada."};let a={id:i,key:n,label:t?.trim()||`Chave ${this.keys.size+1}`,addedAt:Date.now(),errorCount:0};return this.keys.set(i,a),{ok:!0,message:"Chave adicionada com sucesso!",keyItem:a}}updateKey(e,t,n){let i=this.keys.get(e);if(!i)return{ok:!1,message:"Chave n\xE3o encontrada."};let a=t.trim().replace(/^["']|["']$/g,"");return!a||a.length<15?{ok:!1,message:"Chave de API inv\xE1lida."}:(i.key=a,n!==void 0&&(i.label=n.trim()),i.errorCount=0,i.cooldownUntil=void 0,i.lastError=void 0,{ok:!0,message:"Chave atualizada com sucesso!"})}removeKey(e){if(this.keys.size<=1)return{ok:!1,message:"Voc\xEA precisa manter pelo menos 1 chave de API cadastrada."};let t=this.findKeyObj(e);return t?(this.keys.delete(t.id),{ok:!0,message:"Chave removida com sucesso."}):{ok:!1,message:"Chave n\xE3o encontrada."}}exportRawKeys(){return Array.from(this.keys.values()).map(e=>e.key)}size(){return this.keys.size}findKeyObj(e){if(this.keys.has(e))return this.keys.get(e);for(let t of this.keys.values())if(t.key===e)return t}},S=new j;var le=[{id:"gemini-3.8-flash",name:"Gemini 3.8 Flash (Mais Inteligente 2026)",description:"Modelo flagship Flash lan\xE7ado em Set/2026. Ultra-r\xE1pido e altamente capaz.",stable:!0},{id:"gemini-3.7-flash",name:"Gemini 3.7 Flash (Agentic)",description:"Alta capacidade para racioc\xEDnio multimodal e workflows ag\xEAnticos.",stable:!0},{id:"gemini-3.6-flash",name:"Gemini 3.6 Flash (Est\xE1vel)",description:"Modelo est\xE1vel e confi\xE1vel com excelente velocidade.",stable:!0},{id:"gemini-3.5-flash",name:"Gemini 3.5 Flash (R\xE1pido)",description:"Modelo de alta performance para tarefas r\xE1pidas.",stable:!0},{id:"gemini-3.5-flash-lite",name:"Gemini 3.5 Flash-Lite (Econ\xF4mico)",description:"Modelo econ\xF4mico de alta velocidade para volume elevado.",stable:!0},{id:"gemini-2.5-flash",name:"Gemini 2.5 Flash (Legacy R\xE1pido)",description:"Modelo legacy com zero-thinking suportado. Ultra-baixa lat\xEAncia.",stable:!0},{id:"gemini-2.5-pro",name:"Gemini 2.5 Pro (Legacy Avan\xE7ado)",description:"Modelo legacy avan\xE7ado para quest\xF5es de alta complexidade.",stable:!0}],qt=["gemini-3.8-flash","gemini-3.6-flash","gemini-3.5-flash"],Wt={"gemini-2.5-flash":"gemini-3.6-flash","gemini-2.0-flash":"gemini-3.5-flash","gemini-2.0-flash-lite":"gemini-3.5-flash-lite","gemini-1.5-flash":"gemini-3.5-flash","gemini-1.5-pro":"gemini-3.6-flash"};function Qe(o){return Wt[o]??o}var Se=null;function Xt(o){let e={temperature:0,maxOutputTokens:1200,response_mime_type:"application/json",response_schema:Zt};return/gemini-3\.[56]-flash/i.test(o)?e.thinkingConfig={thinkingLevel:"none"}:/gemini-3\.[789]|gemini-3\.[1-9][0-9]/i.test(o)?e.thinkingConfig={thinkingLevel:"low"}:/gemini-2\.5-flash/i.test(o)&&(e.thinkingConfig={thinkingBudget:0}),e}var Zt={type:"OBJECT",properties:{pageType:{type:"STRING",enum:["question","info","start","conclusion"]},mode:{type:"STRING",enum:["texto_livre","escolha_unica","escolha_multipla","verdadeiro_falso","preenchimento","acao_sem_resposta","categorizacao","ordenacao","arrastar_soltar"]},confidence:{type:"NUMBER"},rationale:{type:"STRING"},memoryToStore:{type:"STRING"},actions:{type:"ARRAY",items:{type:"OBJECT",properties:{t:{type:"STRING",enum:["val","chk","sel","clk","adv","js","drag"]},id:{type:"STRING"},v:{},c:{type:"BOOLEAN"},co:{type:"ARRAY",items:{type:"NUMBER"}},from:{type:"STRING"},to:{type:"STRING"}},required:["t"]}}},required:["pageType","mode","confidence","rationale","actions"]};function eo(o){let e=o.trim().replace(/^google\//,"").replace(/^models\//,"");return!e||!R(e)?"gemini-3.8-flash":e}function Tt(o,e){let t="";try{let n=JSON.parse(o);t=n.error?.message||n.message||""}catch{t=o.slice(0,160)}return/API_KEY_INVALID|API key not valid|key.*invalid|unregistered/i.test(t)?"Chave de API do Gemini inv\xE1lida ou n\xE3o autorizada no Google AI Studio.":/RESOURCE_EXHAUSTED|Quota exceeded/i.test(t)||e===429?"Limite tempor\xE1rio de cota do Gemini (HTTP 429) atingido. Aguardando recupera\xE7\xE3o...":e===404?`HTTP 404: ${t||"Modelo ou endpoint n\xE3o encontrado no Google AI Studio"}`:e===503||/overloaded/i.test(t)?`Servidores Google sobrecarregados (HTTP 503): ${t||"Aguardando"}`:t?`Erro Gemini (HTTP ${e}): ${t}`:`Falha na requisi\xE7\xE3o ao Gemini (HTTP ${e}).`}function Et(o){let e=o.trim(),t=e.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);if(t)try{return JSON.parse(t[1].trim())}catch{}try{return JSON.parse(e)}catch{}let n=e.match(/\{[\s\S]*\}/);if(n)try{return JSON.parse(n[0].trim())}catch{}throw new Error("Falha ao decodificar JSON da IA.")}var At=(()=>{try{let o=typeof localStorage<"u"?localStorage.getItem("easyquiz_cached_models"):null;if(!o)return null;let e=JSON.parse(o);if(Array.isArray(e)){let t=e.filter(n=>n&&typeof n.id=="string"&&R(n.id));return t.length>0?t:null}return null}catch{return null}})(),ke=new Set;async function He(o){let e=o.trim().replace(/^["']|["']$/g,"");if(!e)return le;let t=[`https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(e)}`,`https://generativelanguage.googleapis.com/v1/models?key=${encodeURIComponent(e)}`];for(let n of t)try{let i=await fetch(n,{headers:{"Content-Type":"application/json","x-goog-api-key":e}});if(!i.ok){let r=await i.text(),s=Tt(r,i.status);if(s.includes("inv\xE1lida")||s.includes("n\xE3o autorizada"))throw new Error(s);continue}let a=await i.json();if(Array.isArray(a.models)&&a.models.length>0){let r=a.models.filter(s=>{let l=s.supportedGenerationMethods||[],c=(s.name||"").replace(/^models\//,""),p=l.includes("generateContent");return R(c)&&p}).map(s=>{let l=s.supportedGenerationMethods||[],c=s.name.replace(/^models\//,""),p=s.displayName||c;return{id:c,name:p.includes(c)?p:`${p} (${c})`,description:s.description||"",stable:!/-preview|-experimental|-latest/i.test(c),supportsVision:!/embedding|tts|transcribe|live|image|sound|voice/i.test(c),supportsStructuredOutput:l.includes("generateContent"),supportedGenerationMethods:l,discoveredAt:Date.now()}});if(r.length>0){r.sort((s,l)=>{let c=p=>p==="gemini-3.8-flash"?200:p==="gemini-3.7-flash"?190:p==="gemini-3.6-flash"?180:p==="gemini-3.5-flash"?170:p==="gemini-3.5-flash-lite"?160:p==="gemini-2.5-flash"?130:p.includes("flash")?80:p==="gemini-2.5-pro"?60:p.includes("pro")?50:10;return c(l.id)-c(s.id)}),At=r;try{typeof localStorage<"u"&&localStorage.setItem("easyquiz_cached_models",JSON.stringify(r))}catch{}return r}}}catch(i){if(i.message?.includes("Chave de API"))throw i}return le}async function Ie(o){let e=o.trim().replace(/^["']|["']$/g,"");if(!e)return{ok:!1,message:"Insira sua chave de API."};try{let n=await He(e);if(n.length>0&&n!==le){let i=n[0];return{ok:!0,message:`Chave v\xE1lida! ${n.length} modelos Gemini dispon\xEDveis em sua conta. Recomendado: ${i.name}`,models:n}}}catch(n){return{ok:!1,message:n instanceof Error?n.message:String(n)}}let t=["gemini-3.8-flash","gemini-3.6-flash","gemini-3.5-flash"];for(let n of t)for(let i of["v1beta","v1"]){let a=`https://generativelanguage.googleapis.com/${i}/models/${n}:generateContent?key=${encodeURIComponent(e)}`;try{if((await fetch(a,{method:"POST",headers:{"Content-Type":"application/json","x-goog-api-key":e},body:JSON.stringify({contents:[{role:"user",parts:[{text:"PING"}]}],generationConfig:{maxOutputTokens:5}})})).ok)return{ok:!0,message:`Chave validada com sucesso no ${n} (${i})!`,models:le}}catch{}}return{ok:!1,message:"Chave de API inv\xE1lida, sem cota ou sem permiss\xE3o para modelos Gemini."}}async function Ct(o,e,t,n,i){let a=["v1beta","v1"],r=new Error(`Falha ao consultar modelo ${o}`),l={...Xt(o)};for(let c of a){if(i.aborted)throw new Error("Opera\xE7\xE3o cancelada pelo usu\xE1rio.");let p=`https://generativelanguage.googleapis.com/${c}/models/${o}:generateContent?key=${encodeURIComponent(e)}`,h=Date.now();try{let d=await fetch(p,{method:"POST",headers:{"Content-Type":"application/json","x-goog-api-key":e},body:JSON.stringify({...t,generationConfig:l}),signal:i,keepalive:n});if(!d.ok){let v=await d.text();if(d.status===400&&l.thinkingConfig&&/thinking/i.test(v)){delete l.thinkingConfig;let u=await fetch(p,{method:"POST",headers:{"Content-Type":"application/json","x-goog-api-key":e},body:JSON.stringify({...t,generationConfig:l}),signal:i,keepalive:n});if(u.ok){let b=await u.json(),x=b.candidates?.[0];if(x?.content?.parts?.[0]?.text)return S.markSuccess(e,Date.now()-h),{rawText:x.content.parts[0].text,data:b,usedModel:o,usedKey:e}}}let f=Tt(v,d.status);if(d.status===404&&c==="v1beta")continue;throw d.status===429?S.markQuotaHit(e,5e3):d.status===503||/no capacity|overloaded|unavailable/i.test(v)?(S.markOverloaded(e,5e3),ke.add(o)):d.status===403||/API_KEY_INVALID/i.test(v)?S.markInvalid(e,f):d.status===404&&ke.add(o),new Error(`[${o}|${j.maskKey(e)}] ${f}`)}let m=await d.json(),g=m.candidates?.[0];if(!g||!g.content?.parts?.[0]?.text)throw new Error(`[${o}|${j.maskKey(e)}] A IA n\xE3o retornou uma resposta estruturada v\xE1lida.`);return S.markSuccess(e,Date.now()-h),{rawText:g.content.parts[0].text,data:m,usedModel:o,usedKey:e}}catch(d){if(i.aborted)throw d;r=d;let m=r.message||"";if(m.includes("404")||/no longer available/i.test(m)){ke.add(o);break}}}throw r}var to=8;async function Ye(o,e,t,n,i){if(i?.aborted)throw new Error("Opera\xE7\xE3o cancelada pelo usu\xE1rio.");let a=Array.isArray(t.apiKeys)&&t.apiKeys.length>0?t.apiKeys:t.apiKey?[t.apiKey]:[];S.init(a);let r=t.apiKey.trim().replace(/^["']|["']$/g,""),s=S.getBestKey()||r;if(!s)throw new Error("Nenhuma chave de API do Gemini configurada ou dispon\xEDvel.");let l=eo(t.model);if(!At&&s&&He(s).catch(()=>{}),i?.aborted)throw new Error("Opera\xE7\xE3o cancelada pelo usu\xE1rio.");let c=Date.now(),p=ye(o,e,t),h=[{text:p}];for(let C=0;C<e.length;C++){let H=e[C],B=H.associatedLabel||(H.alt?`Imagem: ${H.alt}`:`Imagem ${C+1}`);h.push({text:`[ANEXO VISUAL ${C+1} - V\xCDNCULO: ${B}]:`}),h.push({inline_data:{mime_type:H.mediaType,data:H.base64}})}let d={system_instruction:{parts:[{text:wt}]},contents:[{role:"user",parts:h}]},m=!0;ke.clear();let g=Qe(l),v=Se?Qe(Se):null,f=[];v&&R(v)&&f.push(v),R(g)&&g!==v&&f.push(g);for(let C of qt)f.includes(C)||f.push(C);let u=f.map(C=>Qe(C)).filter(C=>R(C)).filter((C,H,B)=>B.indexOf(C)===H).slice(0,3);u.length<2&&u.push(...qt.filter(C=>!u.includes(C)));let b=S.getHealthyKeys(),x=S.getAllKeys(),w=b.sort((C,H)=>(C.lastLatencyMs??99999)-(H.lastLatencyMs??99999)),A=w.length>0?w:x.map(C=>({key:C.key,lastLatencyMs:C.lastLatencyMs,label:C.label})),M=Math.min(A.length,to),L=[];for(let C=0;C<M;C++){let H=A[C];L.push({model:u[C%u.length],key:H.key,label:H.label||`Chave ${C+1}`})}L.length===0&&L.push({model:u[0]||"gemini-3.6-flash",key:s,label:"Chave 1"});let k=L.length,G=new Set(L.map(C=>C.key)).size,Y=new Set(L.map(C=>C.model)).size;k>1&&n?.(`\u26A1 BLITZ: ${k} slots (${G} chave${G>1?"s":""} \xD7 ${Y} modelo${Y>1?"s":""})...`,"info");let se=L.map(()=>new AbortController),ee=()=>{se.forEach(C=>{try{C.abort(new Error("Opera\xE7\xE3o cancelada pelo usu\xE1rio."))}catch{C.abort()}})};if(i){if(i.aborted)throw new Error("Opera\xE7\xE3o cancelada pelo usu\xE1rio.");i.addEventListener("abort",ee,{once:!0})}try{let C=L.map(async(N,Ae)=>{let te=se[Ae],U=k>1?8e3:12e3,Le=setTimeout(()=>{try{te.abort(new Error(`Timeout ${U/1e3}s (${N.model}|${N.label})`))}catch{te.abort()}},U);try{let K=await Ct(N.model,N.key,d,m,te.signal);clearTimeout(Le);let W=Ue(Et(K.rawText));return W.usedModel=K.usedModel,W.durationMs=Date.now()-c,W.promptSent=p,W.tokensUsed=K.data.usageMetadata?.totalTokenCount,W.promptTokens=K.data.usageMetadata?.promptTokenCount,W.candidatesTokens=K.data.usageMetadata?.candidatesTokenCount,W.rawResponse=K.rawText,se.forEach((ht,Vt)=>{if(Vt!==Ae)try{ht.abort(new Error("Cancelado: slot vencedor respondeu."))}catch{ht.abort()}}),{plan:W,rawUsage:K.data.usageMetadata,usedModel:K.usedModel,usedKey:K.usedKey,slotLabel:N.label}}catch(K){throw clearTimeout(Le),K}}),H=await Promise.any(C);i?.removeEventListener("abort",ee),S.markWinner(H.usedKey),Se=H.usedModel;let B=j.maskKey(H.usedKey),F=H.plan.durationMs||Date.now()-c;return n?.(`\u26A1 ${F}ms via '${H.usedModel}' (${H.slotLabel}: ${B})`,"info"),H}catch(C){if(i?.removeEventListener("abort",ee),i?.aborted)throw new Error("Opera\xE7\xE3o cancelada pelo usu\xE1rio.");let H=S.getBestKey(),B="gemini-3.6-flash";if(H&&!i?.aborted)try{n?.(`Fallback: tentando ${B} com melhor chave dispon\xEDvel...`,"info");let N=new AbortController,Ae=setTimeout(()=>{try{N.abort()}catch{}},1e4),te=await Ct(B,H,d,m,N.signal);clearTimeout(Ae);let U=Ue(Et(te.rawText));U.usedModel=te.usedModel,U.durationMs=Date.now()-c,U.promptSent=p,U.rawResponse=te.rawText,S.markSuccess(H,U.durationMs),Se=B;let Le=j.maskKey(H);return n?.(`\u26A1 Fallback OK: ${U.durationMs}ms via '${B}' (${Le})`,"info"),{plan:U,rawUsage:void 0,usedModel:B,usedKey:H}}catch{}let F="";throw Array.isArray(C?.errors)&&C.errors.length>0?F=C.errors.map(N=>N?.message||String(N)).filter(Boolean).slice(0,3).join(" | "):C instanceof Error?F=C.message:F=String(C),new Error(F||"Nenhum modelo respondeu com sucesso.")}}var oo=[/\bfetch\b/i,/\bXMLHttpRequest\b/i,/\bWebSocket\b/i,/\b(?:localStorage|sessionStorage|indexedDB)\b/i,/\b(?:eval|Function|AsyncFunction|GeneratorFunction)\b/i,/\bimport(?:Scripts)?\b/i,/\bnavigator\s*\.\s*credentials\b/i,/\b(?:cookie|location\s*=|history\s*\.)/i,/\bwindow\s*\[\s*['"](?:fetch|eval|Function|localStorage|sessionStorage)/i];function we(o){let e=o?.engine||"smart",t=new Set(["dom","framework","keyboard","drag"]);return o?.autoAdvance&&t.add("navigation"),e==="javascript"&&t.add("javascript"),{engine:e,capabilities:t,maxAttemptsPerAction:e==="command"?1:2,maxActionMs:e==="command"?1500:3e3,allowJavaScript:e==="javascript",allowNavigation:!!o?.autoAdvance}}function Je(o,e){if(o.t==="js"&&!e.allowJavaScript)throw new Error("A\xE7\xE3o JavaScript bloqueada pela engine atual. Use o motor JavaScript explicitamente.");if(o.t==="adv"&&!e.allowNavigation)throw new Error("Avan\xE7o autom\xE1tico bloqueado pela pol\xEDtica atual.")}function Lt(o){if(!o.trim())throw new Error("JavaScript recusado: c\xF3digo vazio.");if(o.length>8e3)throw new Error("JavaScript recusado: c\xF3digo acima do limite operacional.");if(oo.find(t=>t.test(o)))throw new Error("JavaScript recusado: acesso externo, persist\xEAncia ou avalia\xE7\xE3o din\xE2mica n\xE3o permitidos.");if(!/^\s*(?:\/\/[^\n]*\n|\/\*[\s\S]*?\*\/|[\s\S])*\$eq\./.test(o)&&!o.includes("$eq."))throw new Error("JavaScript recusado: use somente a API declarativa $eq.")}var ce=['input:not([type="hidden"])',"textarea","select","button","a","label",'[role="button"]','[role="link"]','[role="radio"]','[role="checkbox"]','[role="option"]','[role="treeitem"]','[role="menuitemcheckbox"]','[role="menuitemradio"]','[contenteditable="true"]','[draggable="true"]',"[aria-grabbed]","[aria-dropeffect]","[data-widget-type]",".perseus-drag-item",".sortable-item",'[data-testid*="drag" i]','[data-testid*="card" i]','[data-testid*="option" i]','[data-testid*="choice" i]','[data-testid*="category" i]',"[data-choice]","[data-option]","[data-answer]","[data-value]",".quiz-option",".option-card",".choice-card",'[class*="option-card" i]','[class*="choice-card" i]','[class*="option-item" i]','[class*="choice-item" i]','[class*="answer-item" i]','[class*="alternative" i]','li[class*="choice" i]','li[class*="option" i]','li[class*="answer" i]','[data-role="dropzone"]',"[data-category]"].join(","),ze=/(verificar|checar|check|conferir|validar|próxim[oa]|next|continuar|continue|avançar|prosseguir|enviar|submit|concluir|finalizar|terminar|começar|iniciar|start|vamos lá|próxima tarefa|next task|próxima pergunta|next question|marcar como concluíd[oa]|mostrar resumo|entendi|compreendi|ok|leitura concluída|seguir|ir para o exercício|fazer o teste|próximo artigo|ir para a aula)/i,no=0;function We(o){try{let e=o.closest('[hidden], [style*="display: none"], [style*="display:none"], [aria-hidden="true"]');if(e&&!de(e))return!1}catch{}try{let e=window.getComputedStyle?window.getComputedStyle(o):o.style;if(e&&(e.display==="none"||e.visibility==="hidden"))return!1}catch{}try{if(typeof o.getBoundingClientRect=="function"){let e=o.getBoundingClientRect();if(e.width>0||e.height>0)return!0}}catch{}return(o.textContent||"").trim().length>0}function $(o){try{if(typeof CSS<"u"&&typeof CSS.escape=="function")return CSS.escape(o)}catch{}return String(o).replace(/["\\]/g,"\\$&")}function T(o){let e=o;if(!e||typeof e.isConnected=="boolean"&&!e.isConnected||de(e))return!1;let t=e.tagName?.toLowerCase();if(["input","select","textarea","button"].includes(t)){let n=e.type?.toLowerCase();if(n==="checkbox"||n==="radio"){if(e.id)try{let a=e.ownerDocument?.querySelector(`label[for="${$(e.id)}"]`);if(a&&We(a))return!0}catch{}let i=e.closest('label, .option-card, .quiz-option, .choice, .answer, [role="radio"], [role="checkbox"], [class*="option" i], [class*="choice" i], [class*="item" i], li, tr');if(i&&i!==e&&We(i))return!0}try{if(!e.closest('[hidden], [style*="display: none"], [style*="display:none"], [aria-hidden="true"]')){let a=window.getComputedStyle?window.getComputedStyle(e):e.style;if(!a||a.display!=="none"&&a.visibility!=="hidden"){if(typeof e.getBoundingClientRect=="function"){let r=e.getBoundingClientRect();if(r.width>0||r.height>0)return!0}return!0}}}catch{}}return We(e)}function ao(o){if(o==null)return"";if(typeof o=="string")return o;if(typeof o=="number"||typeof o=="boolean")return String(o);if(o instanceof Node)return o.textContent||"";try{if(typeof o?.toString=="function"){let e=o.toString();if(typeof e=="string")return e}}catch{}return""}function I(o,e=500){return ao(o).replace(/\s+/g," ").trim().slice(0,e)}function io(o){let e=o.dataset.easyquizId;if(e)return e;let t=`eq-${Date.now().toString(36)}-${(no+=1).toString(36)}`;return o.dataset.easyquizId=t,t}function de(o){return o?!!(o.closest('#easyquiz-shadow-root, .eq-sidebar, .eq-launcher, [data-easyquiz-ignore="true"], .btn-inject-eq, #btn-inject-script')||o.getAttribute?.("data-easyquiz-ignore")==="true"):!1}var qe=/(leaderboard|scoreboard|placar|ranking|trophy|pause|pausar|mute|mutar|audio|sound|som|música|music|configuraç|settings|theme|ajuda|help|report|denunciar|feedback|power-?up|streak|coins|fullscreen|full-screen|(?:audio|sound|som|media)[-_ ]*volume|volume[-_ ]*(?:slider|control|level|btn|button|icon|mute)|vol-slider)/i;function P(o){if(!o||typeof o.getAttribute!="function"||typeof Element<"u"&&!(o instanceof Element))return!1;if(de(o))return!0;let e=o.tagName?.toLowerCase();if(["select","textarea"].includes(e)||e==="input"&&!["button","submit","reset"].includes((o.type||"").toLowerCase()))return!1;let n=o.closest?.('button, a, [role="button"], [class*="leaderboard" i], [data-testid*="leaderboard" i], [class*="scoreboard" i], [class*="trophy" i]')||o,i=String(n.getAttribute?.("data-testid")||n.getAttribute?.("data-test-id")||n.getAttribute?.("id")||""),a=String(n.getAttribute?.("aria-label")||""),r=String(n.getAttribute?.("title")||""),s=typeof n.className=="string"?n.className:typeof n.className?.baseVal=="string"?n.className.baseVal:"",l=I(n.textContent,60);return!!(qe.test(i)||qe.test(a)||qe.test(r)||qe.test(s)||l.length>0&&l.length<=25&&qe.test(l))}function J(o){if(!o||typeof o.getAttribute!="function"||typeof Element<"u"&&!(o instanceof Element)||de(o)||P(o)||o.closest?.('.option-card, .choice-card, .quiz-option, [class*="option-card" i], [class*="choice-card" i], [class*="option-item" i], [class*="choice-item" i], [class*="answer-item" i], [data-testid*="option" i], [data-testid*="choice" i], [data-choice], [data-option], [data-answer], [role="radio"], [role="checkbox"], [role="option"]')||o.closest?.("header, nav, aside"))return!1;let e=typeof HTMLInputElement<"u"&&o instanceof HTMLInputElement||typeof HTMLButtonElement<"u"&&o instanceof HTMLButtonElement?o.value:"",t=I(o.getAttribute?.("aria-label")||o.textContent||o.getAttribute?.("value")||e),n=o.type,i=t.replace(/[\d\(\)\[\]→\>\•\-\/\\]+/g," ").trim(),a=String(o.getAttribute?.("data-testid")||o.getAttribute?.("data-test-id")||o.getAttribute?.("id")||o.getAttribute?.("href")||"").toLowerCase();return ze.test(i)||ze.test(t)||n==="submit"||a.includes("next")||a.includes("check")||a.includes("continue")||a.includes("proximo")||a.includes("forward")||!1}function Xe(o){let e=o.closest("tr");if(e){let l=e.querySelector("th, td:first-child"),c=l&&l!==o.closest("td")?I(l.textContent,100):"",p=I(o.closest("label, td")?.textContent||"",50);if(c&&p)return`${c}: ${p}`}let t=o.closest('.dropdown-row, [class*="dropdown-row" i], [class*="select-row" i]');if(t){let l=t.querySelector('.dropdown-label, [class*="label" i]'),c=l&&l!==o?I(l.textContent,150):"";if(c)return c}let n=o.getAttribute("aria-label");if(n)return I(n);let i=o.getAttribute("aria-labelledby");if(i){let l=i.split(/\s+/).map(c=>document.getElementById(c)?.textContent).filter(Boolean).join(" ");if(l.trim())return I(l)}if("labels"in o&&o.labels){let l=Array.from(o.labels??[]).map(c=>c.textContent).join(" ");if(l.trim())return I(l)}let a=o.closest('.docssharedWizToggleLabeledContainer, [role="listitem"], .answer, label, .quiz-option, .form-check, .option-card');if(a&&a!==o){let l=I(a.textContent);if(l)return l}let r=o instanceof HTMLInputElement||o instanceof HTMLButtonElement?o.value:"",s=o.getAttribute("placeholder")||o.getAttribute("title")||o.textContent||r||"";return I(s)}function Ze(o,e){let n=typeof HTMLSelectElement<"u"&&o instanceof HTMLSelectElement||o.tagName.toLowerCase()==="select"?o:null,i=o;o.dataset.easyquizRole=e;let a=o.tagName.toLowerCase(),r=["input","textarea","select","button"].includes(a)?a:"other",s=o.getAttribute("role")||"",l=(o.getAttribute("data-testid")||o.getAttribute("data-test-id")||"").toLowerCase(),c=(o.className&&typeof o.className=="string"?o.className:"").toLowerCase(),p=o.getAttribute("draggable")==="true"||o.classList.contains("perseus-drag-item")||o.classList.contains("sortable-item")||!!o.getAttribute("aria-grabbed")||/drag|card|option|item/i.test(l)||/drag|card-item|sortable/i.test(c),h=o.getAttribute("data-role")==="dropzone"||o.classList.contains("category-container")||o.hasAttribute("data-category")||!!o.getAttribute("aria-dropeffect")||/drop|category|bucket/i.test(l)||/dropzone|category-box|bucket|target-zone/i.test(c),m=I((p?"draggable":h?"dropzone":"")||i.type||s||r,40),g="";if(i.type==="checkbox"||i.type==="radio"||s==="radio"||s==="checkbox")g=i.checked||o.getAttribute("aria-checked")==="true"?"checked":"unchecked";else if(r==="button"||a==="a"||e==="navigation"||J(o))g="";else{let w=typeof o.value=="string"||typeof o.value=="number"?o.value:"";g=I(w||o.getAttribute("data-category")||"",2e3)}let v=[];if(n&&n.options)for(let w of Array.from(n.options).slice(0,80))v.push({value:I(w.value),label:I(w.textContent)});else if(s==="combobox"||s==="listbox"||c.includes("select")||c.includes("dropdown")){let w=o.getAttribute("aria-controls")||o.getAttribute("aria-owns"),A=w?document.getElementById(w):o;if(A){let M=A.querySelectorAll('[role="option"], li, .dropdown-item, .option');for(let L of Array.from(M).slice(0,80)){let k=I(L.textContent);k&&v.push({value:L.getAttribute("data-value")||L.getAttribute("value")||k,label:k})}}}let f=!!(i.required||o.getAttribute("aria-required")==="true"),u=!!(i.disabled||o.getAttribute("aria-disabled")==="true"),b=io(o);return{id:o.id||b,tag:r,type:m,label:Xe(o),name:I(i.name||o.getAttribute("name")||"",180),value:g,options:v,required:f,disabled:u,role:e}}var Mt=['[data-test-id*="exercise" i]','[data-testid*="exercise" i]',".perseus-renderer",".framework-perseus",".Qr7Oae",".que",".question-holder",".quiz-question",".question_holder",".display_question",'[data-functional-selector*="question"]',".question-container","[data-question-id]",'[data-testid*="question" i]','[class*="question-container" i]','[class*="question" i]','[class*="pergunta" i]',"article","form","section","main"].join(",");function St(o){if(!T(o))return-1/0;let e=o.getBoundingClientRect(),t=Array.from(o.querySelectorAll(ce)).filter(T),n=I(o.innerText||o.textContent||"",4e3).length;if(n<10||!t.length&&n<60)return-1/0;let i=Math.max(1,window.innerWidth*window.innerHeight),a=Math.max(1,e.width*e.height),r=Math.min(1,a/i),s=e.top+e.height/2,l=Math.abs(s-window.innerHeight/2)/Math.max(1,window.innerHeight),c=n>40?35:0,p=e.top>=0&&e.bottom<=window.innerHeight?25:0;return t.length*15+Math.min(60,n/20)+c+p-r*20-l*10}function $e(o){let e=o;if(e.matches?.('article, [data-test-id*="exercise" i], [data-testid*="exercise" i], .perseus-renderer, .framework-perseus, [class*="question-container" i], .que')&&e.tagName.toLowerCase()!=="main"&&e.tagName.toLowerCase()!=="body")return e;for(;e.parentElement&&e.parentElement!==document.body&&e.parentElement!==document.documentElement;){let t=e.parentElement,n=t.tagName.toLowerCase();if(["header","footer","nav","aside"].includes(n))break;if(t.matches?.('article, [data-test-id*="exercise" i], [data-testid*="exercise" i], .perseus-renderer, .framework-perseus, [class*="question-container" i], .que')&&n!=="main"&&n!=="body"){e=t;break}let i=I(e.innerText||e.textContent||"",1e4),a=I(t.innerText||t.textContent||"",1e4),r=e.querySelectorAll(ce).length,s=t.querySelectorAll(ce).length;if(i.length<150&&a.length>i.length&&s<=r+4&&n!=="main"&&n!=="body"){e=t;continue}break}return e}function kt(o){let e=o,t=e.closest('main, [role="main"], article, form, [data-test-id*="exercise" i], [data-testid*="exercise" i], .framework-perseus, section');if(t&&t!==document.body&&T(t))return t;let n=0;for(;e.parentElement&&e.parentElement!==document.body&&n<3;)e=e.parentElement,n++;return e||document.body}function D(){let o=document.activeElement;if(o&&o!==document.body){let a=o.closest(Mt);if(a&&St(a)>0)return $e(a)}let t=Array.from(document.querySelectorAll(Mt)).map(a=>({element:a,score:St(a)})).filter(a=>Number.isFinite(a.score)).sort((a,r)=>r.score-a.score),n=t.find(a=>{let r=a.element.tagName.toLowerCase();return r!=="main"&&r!=="body"&&a.score>0});if(n)return $e(n.element);if(t.length>0&&t[0].score>0)return $e(t[0].element);let i=document.querySelector('form, main, [role="main"]');return i&&T(i)?i:document.body}function Ht(o){let e=o.cloneNode(!0);e.querySelectorAll("script, style, iframe, object, embed, svg, canvas, noscript, audio, video").forEach(n=>n.remove());let t=["type","name","value","role","aria-label","aria-labelledby","aria-checked","aria-required","required","disabled","data-easyquiz-id","draggable","class","id","data-widget-type","data-role","data-category","data-testid"];return e.querySelectorAll("*").forEach(n=>{for(let i of Array.from(n.attributes))t.includes(i.name)||n.removeAttribute(i.name)}),e.outerHTML.replace(/\s+/g," ").slice(0,2e4)}function Pe(o){let e=Array.from(o.querySelectorAll(ce)),t=new Set,n=[];for(let i of e){if(!T(i)||J(i)||P(i))continue;let a=i.tagName.toLowerCase();["input","textarea","select"].includes(a)&&(t.add(i),n.push(i))}for(let i of e){if(!T(i)||J(i)||P(i))continue;let a=i.tagName.toLowerCase();if(["input","textarea","select"].includes(a))continue;let r=i.querySelector("input, textarea, select");if(!(r&&t.has(r))){if(i.hasAttribute("for")){let s=i.getAttribute("for"),l=s?i.ownerDocument.getElementById(s):null;if(l&&t.has(l))continue}if(a==="a"){let s=i.getAttribute("role");if(!(s==="button"||s==="radio"||s==="checkbox"||s==="option"||i.closest('[class*="choice" i], [class*="option" i], [class*="answer" i], [data-testid*="option" i]')))continue}n.push(i)}}return n.slice(0,100).map(i=>Ze(i,"answer"))}function et(o){let e=[o,o.parentElement,o.parentElement?.parentElement,document.body].filter(Boolean),t=new Set,n=[];for(let i of e)for(let a of Array.from(i.querySelectorAll(ce)))if(!(t.has(a)||!T(a)||!J(a)||P(a))&&(t.add(a),n.push(Ze(a,"navigation")),n.length>=10))return n;return n}function Ee(o=!1){let e=D();e=$e(e),o&&(e=kt(e));let t=Pe(e),n=et(e);if(t.length===0){let s=Pe(document.body);s.length>0&&(e=kt(e),t=Pe(e),t.length===0&&(t=s,e=document.querySelector('main, article, form, [role="main"]')||document.body))}n.length===0&&(n=et(document.body));let i=e.innerText&&e.innerText.trim().length>0?e.innerText:e.textContent||"",a=I(i,16e3),r=[...t,...n].slice(0,120);return!a||r.length===0&&a.length<30?I(document.body.innerText||document.body.textContent||"",16e3).length>=30?ue():null:{sourceUrl:window.location.href.slice(0,2e3),pageTitle:document.title.slice(0,500)||"P\xE1gina de Quest\xE3o",questionText:a,htmlSnippet:Ht(e),controls:r,scope:e}}function ue(){let o=document.body.innerText||document.body.textContent||document.documentElement.textContent||"",e=I(o,16e3),t=Pe(document.body),n=et(document.body),i=[...t,...n].slice(0,120),a=document.querySelector('main, article, form, [role="main"], [data-test-id*="content" i], [class*="content" i]')||document.body;return{sourceUrl:window.location.href.slice(0,2e3),pageTitle:document.title.slice(0,500)||"P\xE1gina de Quest\xE3o",questionText:e,htmlSnippet:Ht(a).slice(0,15e3),controls:i,scope:a}}function It(o){let e=o.controls.map(t=>`${t.role}:${t.id}:${t.type}`).join("|");return[window.location.href,o.pageTitle,o.questionText.slice(0,400),e].join("::")}function z(o){return o?!!(o.closest('#easyquiz-shadow-root, .eq-sidebar, .eq-launcher, [data-easyquiz-ignore="true"], .btn-inject-eq, #btn-inject-script')||o.getAttribute?.("data-easyquiz-ignore")==="true"):!1}function y(o){return o==null?"":(typeof o=="string"?o:String(o)).replace(/^(\([0-9a-zA-Z]{1,2}\)|[0-9]{1,3}|[a-zA-Z])[\.\)\-\:]\s+/,"").replace(/[\.\u2026]{2,}/g," ").replace(/['"“”«»]/g,"").replace(/\s+/g," ").trim()}function O(o){if(!o||o instanceof HTMLInputElement||o instanceof HTMLSelectElement||o instanceof HTMLTextAreaElement||o.getAttribute("draggable")==="true"||o.classList.contains("dnd-card")||o.hasAttribute("data-category")||o.hasAttribute("data-dropzone"))return o;if(o.hasAttribute("for")){let n=o.getAttribute("for");if(n){let i=o.ownerDocument.getElementById(n);if(i)return i}}let e=o.closest('label, .option-card, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, tr, li, .dnd-card, [class*="option-card" i], [class*="choice-card" i], .dropdown-row, [class*="dropdown" i], [class*="select-row" i]');if(e&&!["article","section","main","form","body"].includes(e.tagName.toLowerCase())){let n=e.getAttribute("for"),a=(n?e.ownerDocument.getElementById(n):null)||e.querySelector('input:not([type="hidden"]), select, textarea');return a||e}let t=o.closest('button, a, [role="button"], [draggable="true"]');if(t)return t;if(["body","html","main","section","article","form"].includes(o.tagName.toLowerCase())){let n=o.querySelector('button, [role="button"], a, input:not([type="hidden"]), select, textarea, [role="radio"], [role="checkbox"], .option-card, label');if(n)return O(n)}return o}function zt(o){let e=o;if(!e||!document.contains(e))try{e=D()}catch{}e=e||document.body;let t=Array.from(e.querySelectorAll("tr")).filter(a=>T(a)&&a.querySelector('input[type="radio"], input[type="checkbox"]'));if(t.length>1)return t;let n=Array.from(e.querySelectorAll('input[type="checkbox"], input[type="radio"], [role="checkbox"], [role="radio"]')).filter(a=>T(a)&&!z(a));return n.length>0?n:Array.from(e.querySelectorAll('.option-card, [role="option"], [class*="choice-card" i], [class*="option-card" i], li[class*="choice" i], li[class*="option" i]')).filter(a=>T(a)&&!z(a)).filter(a=>!a.parentElement?.closest('.option-card, [role="option"], [class*="choice-card" i], [class*="option-card" i]'))}function E(o,e,t=!1){if(o==null)return null;let i=(typeof o=="string"?o:String(o)).trim().replace(/^["'“”«»]+|["'“”«»]+$/g,"");if(!i)return null;let a=$(i),r=document.querySelector(`[data-easyquiz-id="${a}"]`);if(r&&!z(r)&&T(r))return O(r);try{let d=document.getElementById(i);if(d&&!z(d)&&T(d))return d.hasAttribute("data-category")||d.hasAttribute("data-dropzone")||d.classList.contains("dnd-zone")?d:O(d)}catch{}let s=i.match(/^(?:item|opção|opcao|afirmação|afirmacao|alternativa|linha|afirmativa|questão|questao|campo|blank|lacuna|input|resposta)?\s*#?_?([0-9]+)$/i);if(s){let d=parseInt(s[1],10);if(t){let g=document.body;try{g=D()||document.body}catch{}let v=Array.from(g.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, select, [contenteditable="true"]')).filter(f=>T(f)&&!z(f));if(d>=1&&d-1<v.length)return v[d-1];if(d===0&&v.length>0)return v[0]}let m=d-1;if(m>=0){let g=zt();if(m<g.length){let u=g[m];if(u.tagName.toLowerCase()==="tr"){if(e){let x=u.querySelector(`input[value="${$(e)}" i], [data-value="${$(e)}" i]`);if(x)return x}let b=u.querySelector("input");if(b)return b}return O(u)}let v=document.body;try{v=D()||document.body}catch{}let f=Array.from(v.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, select, [contenteditable="true"]')).filter(u=>T(u)&&!z(u));if(m<f.length)return f[m]}}let l=i.match(/^(?:item|opção|opcao|afirmação|afirmacao|alternativa|linha|afirmativa|questão|questao)?\s*#?([a-eA-E])$/i);if(l){let d=l[1].toUpperCase().charCodeAt(0)-65;if(d>=0){let m=zt();if(d<m.length){let g=m[d];if(g.tagName.toLowerCase()==="tr"){if(e){let f=g.querySelector(`input[value="${$(e)}" i], [data-value="${$(e)}" i]`);if(f)return f}let v=g.querySelector("input");if(v)return v}return O(g)}}}if(/^[a-zA-Z0-9_-]{1,10}$/.test(i)){let m=Array.from(document.querySelectorAll(`[data-category="${a}" i], [data-dropzone="${a}" i], [data-role="dropzone"][data-category="${a}" i]`)).find(u=>T(u)&&!z(u));if(m)return m;let v=Array.from(document.querySelectorAll(`input[value="${a}" i], [data-value="${a}" i], input[id="${a}" i], input[placeholder="${a}" i], textarea[placeholder="${a}" i], [title="${a}" i]`)).find(u=>T(u)&&!z(u));if(v)return O(v);let f=Array.from(document.querySelectorAll('.option-badge, [class*="badge" i], [class*="letter" i], .option-card span, label span')).find(u=>{if(!T(u)||z(u))return!1;let b=y(u.textContent).toLowerCase();return b===i.toLowerCase()||b===i.toLowerCase()+")"});if(f)return O(f)}try{let m=Array.from(document.querySelectorAll(`[name="${a}"], [value="${a}"], [placeholder="${a}" i], [title="${a}" i], [data-category="${a}" i], [data-dropzone="${a}" i], [data-testid="${a}" i], [data-test-id="${a}" i], [aria-label="${a}" i]`)).find(g=>T(g)&&!z(g));if(m)return m.hasAttribute("data-category")||m.hasAttribute("data-dropzone")||m.classList.contains("dnd-zone")?m:O(m)}catch{}if(/^[.#\[]|\s|[>+~:]/.test(i))try{let m=Array.from(document.querySelectorAll(i)).find(g=>T(g)&&!z(g));if(m)return O(m)}catch{}try{let d=i.replace(/"/g,""),m=`//button[normalize-space(.)="${d}"] | //a[normalize-space(.)="${d}"] | //*[not(*) and normalize-space(.)="${d}"] | //*[@aria-label="${d}"] | //*[@data-category="${d}"] | //*[@data-testid="${d}"]`,g=document.evaluate(m,document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);for(let v=0;v<g.snapshotLength;v++){let f=g.snapshotItem(v);if(f&&T(f)&&!z(f)){if(["body","html"].includes(f.tagName.toLowerCase())){let b=f.querySelector('button, [role="button"], a, input, [role="radio"], [role="checkbox"], label');if(b&&T(b))return O(b)}return f.closest('[data-role="dropzone"], [class*="category" i], [class*="bucket" i], [class*="column" i], [class*="drop" i]')||O(f)}}}catch{}let p=y(i).toLowerCase(),h=Array.from(document.querySelectorAll('button, a, div, span, li, p, label, input, textarea, select, [draggable="true"], [data-testid], [class*="option" i], [class*="card" i], [class*="item" i], [class*="choice" i], [class*="category" i], [class*="bucket" i]'));for(let d of h){if(!T(d)||z(d)||d.closest("header, nav, .stepper, .step-item, .progress-bar-container")||P(d)||!!(d.matches('article, section, form, main, [class*="container" i], [class*="grid" i], .dnd-pool, .dnd-zones')||d.querySelector('label, [role="radio"], [role="checkbox"], .dnd-card, [draggable="true"], .option-card, tr'))&&!d.matches(".dnd-zone, [data-category], [data-dropzone]"))continue;let g=y(d.textContent).toLowerCase(),v=y(d.getAttribute("aria-label")||"").toLowerCase(),f=y(d.getAttribute("placeholder")||"").toLowerCase(),u=y(d.getAttribute("title")||"").toLowerCase(),b=y(d.getAttribute("name")||"").toLowerCase(),x=y(d.getAttribute("data-category")||"").toLowerCase(),w=d instanceof HTMLInputElement||d instanceof HTMLButtonElement?d.value:"",A=y(w).toLowerCase(),M=g.startsWith(p+")")||g.startsWith(p+".")||g.startsWith(p+" -")||g.startsWith(p+":");if(g===p||v===p||f===p||u===p||b===p||x&&x===p||A&&A===p||M)return d.closest('[data-role="dropzone"], [class*="category" i], [class*="bucket" i], [class*="column" i], [class*="drop" i]')||O(d)}if(p.length>=3)for(let d of h){if(!T(d)||z(d)||d.closest("header, nav, .stepper, .step-item, .progress-bar-container")||P(d)||!!(d.matches('article, section, form, main, [class*="container" i], [class*="grid" i], .dnd-pool, .dnd-zones')||d.querySelector('label, [role="radio"], [role="checkbox"], .dnd-card, [draggable="true"], .option-card, tr'))&&!d.matches(".dnd-zone, [data-category], [data-dropzone]"))continue;let g=y(d.textContent).toLowerCase(),v=y(d.getAttribute("aria-label")||"").toLowerCase(),f=y(d.getAttribute("placeholder")||"").toLowerCase(),u=y(d.getAttribute("title")||"").toLowerCase(),b=y(d.getAttribute("name")||"").toLowerCase();if(g.includes(p)||v.includes(p)||f.includes(p)||u.includes(p)||b.includes(p)){if(Array.from(d.children).some(M=>{let L=y(M.textContent).toLowerCase();return L&&L.includes(p)}))continue;return d.closest('[data-role="dropzone"], [class*="category" i], [class*="bucket" i], [class*="column" i], [class*="drop" i]')||O(d)}let x=p.split(/\s+/).filter(Boolean);if(x.length>=3){let w=x.slice(0,Math.min(5,x.length)).join(" ");if(g.includes(w)||v.includes(w)||f.includes(w))return O(d)}}return null}function Pt(o,e){for(let t of e)o.dispatchEvent(new Event(t,{bubbles:!0,composed:!0}))}function _(o,e){if(!o)return;let t=o instanceof HTMLInputElement&&["checkbox","radio"].includes(o.type)?o:o.querySelector('input[type="checkbox"], input[type="radio"]')||(o.hasAttribute("for")?o.ownerDocument.getElementById(o.getAttribute("for")):null);if(t&&o!==t){if(t.type==="checkbox"){Q(t,!0);return}if(t.type==="radio"){Q(t,!0);return}}try{o.scrollIntoView({block:"center",inline:"center",behavior:"instant"})}catch{}try{o.focus?.()}catch{}if(typeof HTMLButtonElement<"u"&&o instanceof HTMLButtonElement||typeof HTMLAnchorElement<"u"&&o instanceof HTMLAnchorElement||o.tagName?.toLowerCase()==="a"||o.tagName?.toLowerCase()==="button"||typeof HTMLInputElement<"u"&&o instanceof HTMLInputElement&&!["checkbox","radio"].includes(o.type)){try{o.click()}catch{}return}let i=o.getBoundingClientRect(),a=e?e[0]:Math.round(i.left+Math.max(1,i.width/2)),r=e?e[1]:Math.round(i.top+Math.max(1,i.height/2)),s={bubbles:!0,cancelable:!0,composed:!0,view:window,clientX:a,clientY:r};try{o.dispatchEvent(new PointerEvent("pointerdown",{...s,button:0,buttons:1}))}catch{}try{o.dispatchEvent(new MouseEvent("mousedown",{...s,button:0,buttons:1}))}catch{}try{o.dispatchEvent(new PointerEvent("pointerup",{...s,button:0,buttons:0}))}catch{}try{o.dispatchEvent(new MouseEvent("mouseup",{...s,button:0,buttons:0}))}catch{}try{o.dispatchEvent(new MouseEvent("click",{...s,button:0,buttons:0}))}catch{}try{o.click()}catch{}}function Re(o,e){let t=o;if(t.hasAttribute("for")){let c=t.getAttribute("for"),p=t.ownerDocument.getElementById(c);p&&(t=p)}if(typeof HTMLSelectElement<"u"&&t instanceof HTMLSelectElement||t.tagName?.toLowerCase()==="select"||t.getAttribute("role")==="combobox"||t.getAttribute("role")==="listbox"||t.matches?.('[role="combobox"], [role="listbox"], [class*="select" i], [class*="dropdown" i]')){Be(t,[e]);return}let i=t.querySelector('select, [role="combobox"], [role="listbox"]');if(i){Be(i,[e]);return}if(!(t instanceof HTMLInputElement)&&!(t instanceof HTMLTextAreaElement)&&!(t instanceof HTMLSelectElement)&&!t.isContentEditable){let c=t.querySelector('input:not([type="hidden"]), textarea, select, [contenteditable="true"]');if(c)t=c;else{let h=t.closest('.form-group, .field, [class*="input" i], [class*="control" i], label, tr, td, li, p, div')?.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, select, [contenteditable="true"]');if(h)t=h;else{let d=t.nextElementSibling;for(;d;){if(d instanceof HTMLInputElement&&!["hidden","button","submit","checkbox","radio"].includes(d.type)||d instanceof HTMLTextAreaElement||d instanceof HTMLElement&&d.isContentEditable){t=d;break}let m=d.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(m){t=m;break}d=d.nextElementSibling}}}}if(t instanceof HTMLButtonElement||t.tagName.toLowerCase()==="a"||t.getAttribute("role")==="button"||t instanceof HTMLInputElement&&["button","submit","reset","image"].includes(t.type)){let c=t.parentElement?.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(c)t=c;else{let p=document.body;try{p=D()||document.body}catch{}let h=p.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(h)t=h;else{console.warn("[EasyQuiz] setNativeValue: Nenhum campo de texto encontrado para receber o valor.");return}}}if(!(t instanceof HTMLInputElement)&&!(t instanceof HTMLTextAreaElement)&&!(t instanceof HTMLSelectElement)&&!t.isContentEditable){let c=document.body;try{c=D()||document.body}catch{}let p=c.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(p)t=p;else{console.warn("[EasyQuiz] setNativeValue: Nenhum campo de texto encontrado para receber o valor.");return}}if(t instanceof HTMLInputElement&&["checkbox","radio"].includes(t.type)){let c=["true","1","checked","yes","sim"].includes(e.toLowerCase())||e===t.value;Q(t,c);return}let r=String(e??""),s=r;if(t instanceof HTMLInputElement&&t.type==="number"){let c=r.replace(",",".").replace(/[^0-9.-]/g,"");c&&!isNaN(Number(c))&&(s=c)}try{t.scrollIntoView?.({block:"center",inline:"center",behavior:"instant"}),t.focus?.()}catch{}let l=!1;try{if(t instanceof HTMLInputElement||t instanceof HTMLTextAreaElement){if(t.type!=="number"){try{t.select?.()}catch{}l=document.execCommand?.("insertText",!1,s)||!1}}else if(t.isContentEditable){try{document.execCommand?.("selectAll",!1,void 0)}catch{}l=document.execCommand?.("insertText",!1,s)||!1}}catch{}if(t instanceof HTMLInputElement||t instanceof HTMLTextAreaElement){try{let h=t._valueTracker;h&&h.setValue(s===""?" ":"")}catch{}let c=t instanceof HTMLTextAreaElement?HTMLTextAreaElement.prototype:HTMLInputElement.prototype,p=Object.getOwnPropertyDescriptor(c,"value")?.set;p?p.call(t,s):t.value=s;try{t.dispatchEvent(new KeyboardEvent("keydown",{bubbles:!0,cancelable:!0,key:s.slice(-1)||"a"}))}catch{}try{t.dispatchEvent(new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,composed:!0,data:s,inputType:"insertText"}))}catch{}try{t.dispatchEvent(new InputEvent("input",{bubbles:!0,cancelable:!0,composed:!0,data:s,inputType:"insertText"}))}catch{t.dispatchEvent(new Event("input",{bubbles:!0,cancelable:!0,composed:!0}))}try{t.dispatchEvent(new KeyboardEvent("keyup",{bubbles:!0,cancelable:!0,key:s.slice(-1)||"a"}))}catch{}try{t.dispatchEvent(new Event("change",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}try{t.dispatchEvent(new FocusEvent("blur",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}if(t.value!==s&&!(t instanceof HTMLInputElement&&t.type==="number"&&Number(t.value)===Number(s))){t.value=s;try{p?.call(t,s)}catch{}}return}if(t.isContentEditable){if(t.textContent?.trim()!==s.trim()){t.textContent=s;try{t.innerText=s}catch{}}try{t.dispatchEvent(new InputEvent("input",{bubbles:!0,cancelable:!0,composed:!0,data:s,inputType:"insertText"}))}catch{t.dispatchEvent(new Event("input",{bubbles:!0,cancelable:!0,composed:!0}))}try{t.dispatchEvent(new Event("change",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}try{t.dispatchEvent(new FocusEvent("blur",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}return}try{"value"in t&&(t.value=s),t.dispatchEvent(new Event("input",{bubbles:!0,cancelable:!0,composed:!0})),t.dispatchEvent(new Event("change",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}}function Ce(o,e=""){if(o==null)return e;let t=typeof o=="string"?o:String(o);if(!t)return e;let n=/^(eq-|#|\$|\.|input_|mat-|choice_|radio_|chk_)/i.test(t),i=y(t),a=E(t)||E(i);if(!a)return n?e:i||e;let r=a.closest('label, .option-card, [class*="choice" i], [class*="option" i], .quiz-option, tr, td, li');if(r){let h=y(r.textContent);if(h&&h.length>0&&h.length<150)return h}if(a.id){let h=document.querySelector(`label[for="${$(a.id)}"]`);if(h){let d=y(h.textContent);if(d&&d.length>0&&d.length<150)return d}}let s=a.getAttribute("aria-label");if(s)return y(s);let l=a.getAttribute("placeholder");if(l)return y(l);let c=y(a.textContent);if(c&&c.length>0&&c.length<120)return c;let p=a instanceof HTMLInputElement||a instanceof HTMLButtonElement?a.value:"";return p?y(p):n?e:i||e}function Q(o,e){let t=o.closest('.option-card, label, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, [class*="option" i], [class*="choice" i], li')||o,n=o instanceof HTMLInputElement&&["checkbox","radio"].includes(o.type)?o:t.querySelector('input[type="checkbox"], input[type="radio"]');if(!n&&t.hasAttribute("for")&&(n=t.ownerDocument.getElementById(t.getAttribute("for"))),t){let i=e?"true":"false";t.setAttribute("aria-checked",i),t.setAttribute("aria-selected",i),t.classList.toggle("selected",e),t.classList.toggle("active",e),t.classList.toggle("checked",e)}if(n){if(n.checked===e)return;try{n.focus?.(),n.click()}catch{}if(n.checked!==e){try{let i=n._valueTracker;i&&i.setValue(!e)}catch{}try{Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"checked")?.set?.call(n,e)}catch{}n.checked=e,Pt(n,["input","change"])}}else{try{t.focus?.()}catch{}try{t.click()}catch{_(t)}}}function Be(o,e){let t=typeof HTMLSelectElement<"u"&&o instanceof HTMLSelectElement||o.tagName?.toLowerCase()==="select"?o:o.querySelector("select");if(t){let r=e.map(c=>y(c).toLowerCase()),s=!1,l=(c,p)=>{c.selected=!0,t.selectedIndex=p;try{t.value=c.value}catch{}try{Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype,"value")?.set?.call(t,c.value)}catch{}try{let h=t._valueTracker;h&&h.setValue(c.value)}catch{}s=!0};for(let c=0;c<t.options.length;c++){let p=t.options[c],h=p.value.toLowerCase(),d=y(p.textContent).toLowerCase();if(r.some(g=>g===h||g===d)){if(l(p,c),!t.multiple)break}else t.multiple||(p.selected=!1)}if(!s)for(let c of r){let p=c.match(/^(?:item|opção|opcao|alternativa|linha|escolha|campo)?\s*#?_?([0-9]+)$/i);if(p){let h=parseInt(p[1],10),m=t.options[0]?.value===""||t.options[0]?.disabled?h:h>=1?h-1:0;if(m>=0&&m<t.options.length&&(l(t.options[m],m),!t.multiple))break}}if(!s){for(let c of r)if(/^[a-z]$/i.test(c)){let p=c.toUpperCase().charCodeAt(0)-65,d=t.options[0]?.value===""||t.options[0]?.disabled?p+1:p;if(d>=0&&d<t.options.length&&(l(t.options[d],d),!t.multiple))break}}if(!s){let c=p=>p.normalize("NFD").replace(/[\u0300-\u036f]/g,"");for(let p=0;p<t.options.length;p++){let h=t.options[p],d=c(h.value.toLowerCase()),m=c(y(h.textContent).toLowerCase());if(r.some(v=>{let f=c(v);return d.includes(f)||m.includes(f)||f.length>2&&(f.includes(d)||f.includes(m))})&&(l(h,p),!t.multiple))break}}if(s){Pt(t,["focus","input","change","blur"]);return}}let n=o.matches?.('[role="combobox"], [role="listbox"], [class*="select" i], [class*="dropdown" i]')?o:o.closest('[role="combobox"], [role="listbox"], [class*="select" i], [class*="dropdown" i]');n&&_(n);let i=e.map(r=>y(r).toLowerCase()),a=Array.from(document.querySelectorAll('[role="listbox"] [role="option"], [role="menu"] [role="menuitem"], .select-dropdown li, .dropdown-menu .dropdown-item, .ant-select-item-option, .MuiMenuItem-root, [class*="option-item"], li[data-value]')).filter(r=>T(r)&&!z(r));for(let r of i){let s=a.find(c=>{let p=y(c.textContent).toLowerCase(),h=y(c.getAttribute("data-value")||c.getAttribute("value")||"").toLowerCase();return p===r||h===r||p.includes(r)||r.length>2&&r.includes(p)});if(s){_(s);let c=s.querySelector('input[type="radio"], input[type="checkbox"]');c&&Q(c,!0);return}let l=E(r);if(l){_(l);return}}}function so(o,e){try{let t=new DataTransfer;try{t.setData("text/plain",o)}catch{}try{t.setData("text/html",e)}catch{}return t}catch{return null}}function tt(o){try{o.click()}catch{let e=o.ownerDocument.defaultView||window;o.dispatchEvent(new e.MouseEvent("click",{bubbles:!0,cancelable:!0,composed:!0,view:e}))}}function Z(o,e){let t=y(o).toLowerCase();if(!t)return null;let n=e==="source"?'.dnd-card, [draggable="true"]':'[data-dropzone], [data-category], [data-role="dropzone"]',i=Array.from(document.querySelectorAll(n)),a=e==="destination"?i.find(r=>[r.getAttribute("data-category"),r.getAttribute("data-dropzone")].some(s=>s?.trim().toLowerCase()===t)):null;return a&&T(a)&&!z(a)?a:i.find(r=>{if(!T(r)||z(r))return!1;let s=y(`${r.textContent||""} ${r.getAttribute("data-category")||""} ${r.getAttribute("data-dropzone")||""}`).toLowerCase();return s===t||s.includes(t)})||null}async function Ne(o,e,t=1){try{o.scrollIntoView({block:"center",inline:"center",behavior:"instant"})}catch{}let n=o.getBoundingClientRect(),i=e.getBoundingClientRect(),a=Math.round(n.left+Math.max(1,n.width/2)),r=Math.round(n.top+Math.max(1,n.height/2)),s=Math.round(i.left+Math.max(1,i.width/2)),l=Math.round(i.top+Math.max(1,i.height/2)),c=y(e.textContent).toLowerCase();if(c){let v=Array.from(o.querySelectorAll('button, [role="button"], input[type="radio"], input[type="checkbox"], option, .btn, [class*="tag" i]')).find(f=>{let u=y(f.textContent).toLowerCase(),b=f instanceof HTMLInputElement||f instanceof HTMLOptionElement?y(f.value).toLowerCase():"";return u&&(c.includes(u)||u.includes(c))||b&&(c.includes(b)||b.includes(c))});v&&(_(v),await new Promise(f=>setTimeout(f,120)))}tt(o),await new Promise(g=>setTimeout(g,140)),tt(e);let p=e.querySelector('[data-role="dropzone"], [class*="bucket" i], [class*="slot" i], [class*="drop" i], [class*="target" i], [class*="items" i], ul, ol');if(p&&p!==e&&tt(p),await new Promise(g=>setTimeout(g,100)),!e.contains(o)&&o.matches('.dnd-card, [draggable="true"]')&&e.matches('.dnd-zone, [data-dropzone], [data-role="dropzone"]')&&e.appendChild(o),e.contains(o)&&o.matches('.dnd-card, [draggable="true"]'))return;let h={bubbles:!0,cancelable:!0,composed:!0,view:window,clientX:a,clientY:r,screenX:a,screenY:r,button:0,buttons:1};try{o.dispatchEvent(new PointerEvent("pointerdown",{...h,isPrimary:!0,pointerId:1,pointerType:"mouse",pressure:.5}))}catch{}o.dispatchEvent(new MouseEvent("mousedown",h));let d=4;for(let g=1;g<=d;g++){let v=Math.round(a+(s-a)*(g/d)),f=Math.round(r+(l-r)*(g/d)),u={...h,clientX:v,clientY:f,screenX:v,screenY:f};try{o.dispatchEvent(new PointerEvent("pointermove",{...u,isPrimary:!0,pointerId:1,pointerType:"mouse",pressure:.5}))}catch{}document.dispatchEvent(new MouseEvent("mousemove",u))}let m={bubbles:!0,cancelable:!0,composed:!0,view:window,clientX:s,clientY:l,screenX:s,screenY:l,button:0,buttons:0};try{e.dispatchEvent(new PointerEvent("pointerup",{...m,isPrimary:!0,pointerId:1,pointerType:"mouse",pressure:0}))}catch{}e.dispatchEvent(new MouseEvent("mouseup",m)),e.dispatchEvent(new MouseEvent("click",m));try{let g=so(I(o.textContent),o.outerHTML),v={...h},f={...m};g&&(v.dataTransfer=g,f.dataTransfer=g);let u=o.ownerDocument.defaultView?.DragEvent;if(!u)throw new Error("DragEvent n\xE3o dispon\xEDvel neste documento");o.dispatchEvent(new u("dragstart",v)),e.dispatchEvent(new u("dragenter",f)),e.dispatchEvent(new u("dragover",f)),e.dispatchEvent(new u("drop",f)),o.dispatchEvent(new u("dragend",v))}catch(g){console.warn("[EasyQuiz] DragEvent ignorado com seguran\xE7a:",g)}try{let g=new Touch({identifier:1,target:o,clientX:a,clientY:r}),v=new Touch({identifier:1,target:e,clientX:s,clientY:l});o.dispatchEvent(new TouchEvent("touchstart",{bubbles:!0,cancelable:!0,touches:[g]})),e.dispatchEvent(new TouchEvent("touchmove",{bubbles:!0,cancelable:!0,touches:[v]})),e.dispatchEvent(new TouchEvent("touchend",{bubbles:!0,cancelable:!0,touches:[]}))}catch{}if(t>=2&&!e.contains(o))try{o.focus?.(),o.dispatchEvent(new KeyboardEvent("keydown",{key:" ",code:"Space",bubbles:!0})),o.dispatchEvent(new KeyboardEvent("keyup",{key:" ",code:"Space",bubbles:!0})),await new Promise(g=>setTimeout(g,80)),e.focus?.(),e.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",bubbles:!0})),e.dispatchEvent(new KeyboardEvent("keyup",{key:"Enter",code:"Enter",bubbles:!0}))}catch{}}var Rt={fill:(o,e)=>{let t=E(o);t?Re(t,e):console.warn(`$eq.fill: Elemento '${o}' n\xE3o encontrado`)},click:o=>{let e=E(o);e?!!(e.closest('.option-card, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, [class*="option" i], [class*="choice" i]')||e.querySelector('input[type="radio"], input[type="checkbox"]')||e instanceof HTMLInputElement&&["checkbox","radio"].includes(e.type))?Q(e,!0):_(e):console.warn(`$eq.click: Elemento '${o}' n\xE3o encontrado`)},check:(o,e)=>{let t=E(o);t?Q(t,e):console.warn(`$eq.check: Elemento '${o}' n\xE3o encontrado`)},find:(o,e)=>E(o,e),drag:(o,e)=>{let t=Z(o,"source")||E(o),n=Z(e,"destination")||E(e);t&&n?Ne(t,n):console.warn(`$eq.drag: Origem ou destino n\xE3o encontrado ('${o}' -> '${e}')`)},categorize:async(o,e)=>{let t=Z(o,"source")||E(o),n=Z(e,"destination")||E(e);if(!t||!n){console.warn(`$eq.categorize: Item ou categoria n\xE3o encontrados ('${o}' -> '${e}')`);return}await Ne(t,n)},execute:(o,e=!1,t=1)=>at(o,e,t)};typeof window<"u"&&(window.$eq=Rt);async function ro(o,e=1,t=we()){if(Je(o,t),o.t==="js"){let s=String(o.v||"");Lt(s);try{new Function("$eq","document","window",s)(Rt,document,window)}catch(l){throw console.warn("[EasyQuiz JS Execution]",l),l}return}if(o.t==="drag"){let s=Z(o.from,"source")||E(o.from),l=Z(o.to,"destination")||E(o.to);!s&&o.from&&(s=E(y(o.from))),!l&&o.to&&(l=E(y(o.to))),s&&l?await Ne(s,l,e):console.warn(`[EasyQuiz] Drag: alvo n\xE3o encontrado ('${o.from}' -> '${o.to}')`);return}let n=o.id!==void 0&&o.id!==null?String(o.id):"";!n&&o.t==="val"&&(n=o.target??o.name??o.selector??"1");let i=o.v!==void 0?o.v:o.value!==void 0?o.value:o.val!==void 0?o.val:o.text,a=i!=null?String(i).trim():"",r=E(n,a,o.t==="val"||o.t==="sel");if(!r&&n&&(r=E(y(n),a,o.t==="val"||o.t==="sel")),r&&a){if(r instanceof HTMLInputElement&&r.type==="radio"&&r.name){if(y(r.value).toLowerCase()!==y(a).toLowerCase()){let s=document.querySelector(`input[type="radio"][name="${$(r.name)}"][value="${$(a)}" i]`);if(s)r=s;else{let c=Array.from(document.querySelectorAll(`input[type="radio"][name="${$(r.name)}"]`)).find(p=>{let h=p.closest("label, .vf-label, .option-card, tr, td, div");return h&&y(h.textContent).toLowerCase().includes(y(a).toLowerCase())});c&&(r=c)}}}else if(!(r instanceof HTMLInputElement)&&!(r instanceof HTMLSelectElement)&&!(r instanceof HTMLTextAreaElement)){let s=r.querySelector(`input[value="${$(a)}" i], [data-value="${$(a)}" i]`);if(s)r=s;else{let c=Array.from(r.querySelectorAll('input[type="radio"], input[type="checkbox"]')).find(p=>{let h=p.closest("label, .vf-label, .option-card, td, div");return h&&y(h.textContent).toLowerCase().includes(y(a).toLowerCase())});c&&(r=c)}}}if(!r&&(o.t==="val"||o.t==="sel")){let s=document.body;try{s=D()||document.body}catch{}let l=Array.from(s.querySelectorAll(o.t==="sel"?'select, [role="combobox"], [role="listbox"]':'input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, select, [contenteditable="true"]')).filter(c=>T(c)&&!z(c));if(l.length===1)r=l[0];else if(l.length>1){let c=y(n).toLowerCase(),p=c.match(/^#?_?([0-9]+)$/);if(p){let h=parseInt(p[1],10);h>=1&&h<=l.length?r=l[h-1]:h>=0&&h<l.length&&(r=l[h])}r||(r=l.find(d=>{let m=(d.getAttribute("placeholder")||"").toLowerCase(),g=(d.name||"").toLowerCase(),v=(d.getAttribute("aria-label")||"").toLowerCase(),f=(d.id||"").toLowerCase(),u=y(Xe(d)).toLowerCase(),b=y(d.closest('label, tr, td, .form-group, .field, [class*="row" i], div')?.textContent||"").toLowerCase();return m.includes(c)||g.includes(c)||v.includes(c)||f.includes(c)||u&&u.includes(c)||c.length>=2&&b.includes(c)})||(l.length===1?l[0]:null))}}if(!r&&o.t!=="adv"){console.warn(`[EasyQuiz] Alvo '${n}' n\xE3o encontrado para a\xE7\xE3o '${o.t}'. Prosseguindo...`);return}switch(o.t){case"val":if(r){let l=r instanceof HTMLInputElement||r instanceof HTMLTextAreaElement||r instanceof HTMLSelectElement||r.isContentEditable?r:r.querySelector('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]');if(!l){let d=r.closest('.form-group, .field, [class*="input" i], [class*="control" i], label, tr, td, li, p, div')?.querySelector('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]');d&&(l=d)}if(!l){let h=r.nextElementSibling;for(;h;){if(h instanceof HTMLInputElement&&!["hidden","button","submit","checkbox","radio"].includes(h.type)||h instanceof HTMLTextAreaElement||h instanceof HTMLElement&&h.isContentEditable){l=h;break}let d=h.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(d){l=d;break}h=h.nextElementSibling}}if(!l){let h=document.body;try{h=D()||document.body}catch{}let d=Array.from(h.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]')).filter(m=>T(m)&&!z(m));d.length>0&&(l=d[0])}let c=o.v!==void 0?o.v:o.value!==void 0?o.value:o.val!==void 0?o.val:o.text,p=c!=null?String(c):"";Re(l||r,p)}break;case"chk":r&&Q(r,!!o.c);break;case"sel":if(r){let l=Array.isArray(o.v)?o.v:[String(o.v)];Be(r,l)}break;case"clk":if(r)if(!!(r.closest('.option-card, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice')||r.querySelector('input[type="radio"], input[type="checkbox"]')||r instanceof HTMLInputElement&&["checkbox","radio"].includes(r.type))){let c=o.c!==void 0?!!o.c:!0;Q(r,c)}else _(r,o.co);break;case"adv":let s=ot(o.id);if(s){await nt(s,1200);let l=o.id||s.textContent?.trim()||"";l&&je(window.location.hostname,{advanceSelector:l}),_(s)}else console.warn("[EasyQuiz] Bot\xE3o de avan\xE7o n\xE3o localizado.");break}}function lo(){let o=["button","a",'[role="button"]','input[type="submit"]','input[type="button"]','[data-testid*="check" i]','[data-test-id*="check" i]'].join(",");return Array.from(document.querySelectorAll(o)).find(t=>{if(!T(t)||z(t)||t.closest("header, nav, aside"))return!1;let n=t instanceof HTMLInputElement||t instanceof HTMLButtonElement?t.value:"",i=(t.textContent||n||t.getAttribute("aria-label")||"").trim();return/(verificar|checar|check|conferir|validar|enviar|responder)/i.test(i)})||null}function ot(o){if(o){let a=E(o);if(a&&T(a)&&!z(a)&&!P(a))return a}try{let a=be(window.location.hostname);if(a.advanceSelector){let r=E(a.advanceSelector);if(r&&T(r)&&!z(r)&&!P(r))return r}}catch{}let e=["button","a",'[role="button"]','[role="link"]','input[type="button"]','input[type="submit"]','[data-testid*="next" i]','[data-testid*="continue" i]','[data-testid*="check" i]','[data-test-id*="next" i]','[data-test-id*="continue" i]','[data-test-id*="check" i]','[class*="next" i]','[class*="continue" i]','[class*="proximo" i]','[class*="avancar" i]'].join(","),n=Array.from(document.querySelectorAll(e)).filter(a=>T(a)&&!z(a)&&!a.closest("header, nav, aside")&&!P(a));for(let a of n)if(J(a)&&!P(a))return a;for(let a of n){let r=a instanceof HTMLInputElement||a instanceof HTMLButtonElement?a.value:"",s=(a.textContent||r||a.getAttribute("aria-label")||"").trim();if(ze.test(s)&&!P(a))return a}let i=document.querySelector('[data-test-id*="next" i], [data-testid*="next" i], [aria-label*="next" i], [aria-label*="pr\xF3xim" i], [aria-label*="avan\xE7ar" i], [aria-label*="continuar" i]');return i&&T(i)&&!z(i)&&!P(i)?i:null}async function nt(o,e=1500){let t=Date.now();for(;Date.now()-t<e;){if(!(o.disabled===!0||o.getAttribute("aria-disabled")==="true"||o.classList.contains("disabled")||o.getAttribute("disabled")!==null))return;await new Promise(i=>setTimeout(i,100))}}function Bt(){let o=(document.body?.innerText||document.body?.textContent||"").replace(/\s+/g," ").trim(),e=document.querySelectorAll('input, textarea, select, button, [role="button"], [role="option"]').length;return`${window.location.href}|${document.title}|${o.slice(0,900)}|${e}`}async function co(o,e=1800){let t=Date.now();for(;Date.now()-t<e;){if(Bt()!==o)return{changed:!0,evidence:"URL, texto, t\xEDtulo ou conjunto de controles mudou ap\xF3s a a\xE7\xE3o."};await new Promise(i=>setTimeout(i,100))}return{changed:!1,evidence:"Nenhuma mudan\xE7a observ\xE1vel foi detectada dentro do tempo limite."}}async function $t(o){if(o.t==="js"||o.t==="adv")return;if(o.t==="drag"){let i=E(o.from)||E(y(o.from)),a=E(o.to)||E(y(o.to));i&&a&&await Ne(i,a,2);return}let e=o.id||"",t=o.v!==void 0?String(o.v).trim():"",n=E(e,t)||E(y(e),t);if(o.t==="clk"||o.t==="chk"){if(!n&&e){let a=Array.from(document.querySelectorAll('input, label, button, [role="radio"], [role="checkbox"], .option-card, [class*="option" i], [class*="choice" i]')),r=y(e).toLowerCase();n=a.find(s=>{let l=y(s.textContent).toLowerCase(),c=y(s.value||"").toLowerCase();return l.includes(r)||c===r||l.startsWith(r+")")||l.startsWith("("+r+")")})||null}let i=o.v!==void 0?String(o.v).trim():"";if(n&&i){if(n instanceof HTMLInputElement&&n.type==="radio"&&n.name){if(y(n.value).toLowerCase()!==y(i).toLowerCase()){let a=document.querySelector(`input[type="radio"][name="${$(n.name)}"][value="${$(i)}" i]`);if(a)n=a;else{let s=Array.from(document.querySelectorAll(`input[type="radio"][name="${$(n.name)}"]`)).find(l=>{let c=l.closest("label, .vf-label, .option-card, tr, td, div");return c&&y(c.textContent).toLowerCase().includes(y(i).toLowerCase())});s&&(n=s)}}}else if(!(n instanceof HTMLInputElement)&&!(n instanceof HTMLSelectElement)&&!(n instanceof HTMLTextAreaElement)){let a=n.querySelector(`input[value="${$(i)}" i], [data-value="${$(i)}" i]`);if(a)n=a;else{let s=Array.from(n.querySelectorAll('input[type="radio"], input[type="checkbox"]')).find(l=>{let c=l.closest("label, .vf-label, .option-card, td, div");return c&&y(c.textContent).toLowerCase().includes(y(i).toLowerCase())});s&&(n=s)}}}if(n){let a=n.closest('.option-card, label, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, li')||n,r=n instanceof HTMLInputElement&&["radio","checkbox"].includes(n.type)?n:a.querySelector('input[type="radio"], input[type="checkbox"]')||(a.getAttribute("for")?a.ownerDocument.getElementById(a.getAttribute("for")):null),s=o.t==="chk"||o.c!==void 0?!!o.c:!0;if(Q(r||a,s),r&&r.checked!==s){try{let l=r._valueTracker;l&&l.setValue(!s)}catch{}try{Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"checked")?.set?.call(r,s)}catch{}r.checked=s,r.dispatchEvent(new Event("input",{bubbles:!0,composed:!0})),r.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}}return}if(o.t==="val"){let i=null;if(n&&(i=n instanceof HTMLInputElement||n instanceof HTMLTextAreaElement||n.isContentEditable?n:n.querySelector('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]')),!i){let a=document.body;try{a=D()||document.body}catch{}let r=Array.from(a.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]')),s=y(e).toLowerCase();i=r.find(l=>{let c=(l.getAttribute("placeholder")||"").toLowerCase(),p=(l.name||"").toLowerCase(),h=(l.id||"").toLowerCase(),d=(l.getAttribute("aria-label")||"").toLowerCase();return c.includes(s)||p.includes(s)||h.includes(s)||d.includes(s)})||(r.length>0?r[0]:null)}if(i){let a=String(o.v??"");try{if(i.focus?.(),i.type!=="number"){try{i.select?.()}catch{}document.execCommand?.("insertText",!1,a)}}catch{}Re(i,a)}return}if(o.t==="sel"){if(!n&&e){let i=Array.from(document.querySelectorAll("select")),a=y(e).toLowerCase();n=i.find(r=>{let s=(r.name||"").toLowerCase(),l=(r.id||"").toLowerCase(),c=(r.getAttribute("aria-label")||"").toLowerCase();return s.includes(a)||l.includes(a)||c.includes(a)})||null}if(n){let i=Array.isArray(o.v)?o.v:[String(o.v)];Be(n,i)}return}}function pe(o){try{if(o.t==="val"){let e=o.v!==void 0?o.v:o.value!==void 0?o.value:o.val!==void 0?o.val:o.text,t=String(e??"").trim(),n=t,i=o.id!==void 0&&o.id!==null?String(o.id):"";i||(i=o.target??o.name??o.selector??"1");let a=E(i,n,!0)||E(y(i),n,!0);if(!a){let h=document.body;try{h=D()||document.body}catch{}let d=Array.from(h.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]')).filter(m=>T(m)&&!z(m));d.length>0&&(a=d[0])}if(!a)return!1;let r=a instanceof HTMLInputElement&&a.type==="radio"?a:a.querySelector('input[type="radio"]');if(r&&r.name){let h=document.querySelector(`input[type="radio"][name="${$(r.name)}"]:checked`);if(!h)return!1;let d=y(h.value).toLowerCase(),m=y(t).toLowerCase(),g=y(h.closest("label, .vf-label, .option-card, tr, td, div")?.textContent||"").toLowerCase();return d===m||g===m||g.includes(m)}let s=a instanceof HTMLInputElement||a instanceof HTMLTextAreaElement||a.isContentEditable?a:a.querySelector('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(!s){let d=a.closest('.form-group, .field, [class*="input" i], [class*="control" i], label, tr, td, li, p, div')?.querySelector('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]');d&&(s=d)}if(!s){let h=a.nextElementSibling;for(;h;){if(h instanceof HTMLInputElement&&!["hidden","button","submit","checkbox","radio"].includes(h.type)||h instanceof HTMLTextAreaElement||h instanceof HTMLElement&&h.isContentEditable){s=h;break}let d=h.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(d){s=d;break}h=h.nextElementSibling}}if(s instanceof HTMLSelectElement){let h=y(t).toLowerCase();return Array.from(s.options).some(d=>{if(!d.selected)return!1;let m=d.value.toLowerCase(),g=y(d.textContent).toLowerCase();return h===m||h===g||m.includes(h)||g.includes(h)})}let l=(s instanceof HTMLInputElement||s instanceof HTMLTextAreaElement?s.value:s?.textContent??a.textContent??"").trim();if(!l&&!t)return!0;if(!l&&t)return!1;let c=l.replace(",",".").replace(/\s+/g,"").toLowerCase(),p=t.replace(",",".").replace(/\s+/g,"").toLowerCase();return c===p||c.includes(p)||p.includes(c)||l.toLowerCase()===t.toLowerCase()}if(o.t==="sel"){let e=E(o.id,void 0,!0)||E(y(o.id),void 0,!0);if(!e){let a=document.body;try{a=D()||document.body}catch{}let r=Array.from(a.querySelectorAll('select, [role="combobox"], [role="listbox"]')).filter(c=>T(c)&&!z(c)),s=y(o.id).toLowerCase();e=r.find(c=>{let p=(c.id||"").toLowerCase(),h=(c.getAttribute("name")||"").toLowerCase(),d=(c.getAttribute("aria-label")||"").toLowerCase(),m=y(c.closest('.dropdown-row, [class*="dropdown" i], [class*="select" i], tr, label, div')?.textContent||"").toLowerCase();return p.includes(s)||h.includes(s)||d.includes(s)||s.length>=2&&m.includes(s)})||(r.length===1?r[0]:null)}if(!e)return!1;let t=e instanceof HTMLSelectElement?e:e.querySelector("select");if(!t){let a=e.matches?.('[role="combobox"], [role="listbox"], [class*="select" i], [class*="dropdown" i]')?e:e.closest('[role="combobox"], [role="listbox"], [class*="select" i], [class*="dropdown" i]');if(a){let s=(Array.isArray(o.v)?o.v:[String(o.v)]).map(c=>y(c).toLowerCase()),l=y(a.textContent).toLowerCase();return s.some(c=>l.includes(c)||c.includes(l))}return!1}let i=(Array.isArray(o.v)?o.v:[String(o.v)]).map(a=>y(a).toLowerCase());return Array.from(t.options).some(a=>{if(!a.selected)return!1;let r=a.value.toLowerCase(),s=y(a.textContent).toLowerCase();return i.some(l=>l===r||l===s||r.includes(l)||s.includes(l))})}if(o.t==="chk"||o.t==="clk"){let e=o.v!==void 0?String(o.v).trim():"",t=E(o.id,e)||E(y(o.id),e);if(!t)return!1;let n=t.closest('.option-card, label, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, li')||t,i=t instanceof HTMLInputElement&&["checkbox","radio"].includes(t.type)?t:n.querySelector('input[type="checkbox"], input[type="radio"]')||(n.getAttribute("for")?n.ownerDocument.getElementById(n.getAttribute("for")):null),a=o.t==="chk"||o.c!==void 0?!!o.c:!0;if(i&&i.type==="radio"){if(i.checked===a)return!0;if(o.v&&i.name){let p=y(String(o.v)).toLowerCase(),h=document.querySelector(`input[type="radio"][name="${$(i.name)}"]:checked`);if(!h)return!1;if(h===i)return!0;let d=y(h.value).toLowerCase(),m=y(h.closest("label, .vf-label, .option-card, tr, td, div")?.textContent||"").toLowerCase();return d===p||m.includes(p)||p.includes(d)}}if(i&&["checkbox","radio"].includes(i.type))return i.checked===a;let r=n.getAttribute("aria-checked")===String(a)||n.getAttribute("aria-selected")===String(a)||n.getAttribute("aria-pressed")===String(a),s=a?n.getAttribute("data-selected")==="true"||n.getAttribute("data-checked")==="true"||n.getAttribute("data-active")==="true"||n.getAttribute("data-state")==="checked"||n.getAttribute("data-state")==="on":n.getAttribute("data-selected")==="false"||n.getAttribute("data-checked")==="false"||n.getAttribute("data-state")==="unchecked",l=a?/active|selected|checked|picked|correct|is-selected|choice-selected|selected-option|is-checked|chosen|current|highlight|ring|border-primary/i.test(n.className||""):!/active|selected|checked|picked|correct|is-selected|choice-selected|selected-option|is-checked|chosen|current|highlight|ring|border-primary/i.test(n.className||"");return!!(r||s||l||(n instanceof HTMLButtonElement||n.getAttribute("role")==="button")&&o.t==="clk"||o.t==="clk"&&!i)}if(o.t==="drag"){let e=E(o.from)||E(y(o.from)),t=E(o.to)||E(y(o.to));return!e||!t?!1:t.contains(e)?!0:/placed|dropped|assigned|matched|done|selected/i.test(e.className||"")||e.getAttribute("data-placed")==="true"}}catch{}return!1}async function at(o,e,t=1,n=we({engine:"smart",autoAdvance:e})){let i=o.actions.filter(u=>u.t!=="adv"),a=o.actions.filter(u=>u.t==="adv"),r=0,s=[],l=new Map,c=o.pageType==="question",p=i.filter(u=>u.t==="chk"||u.t==="clk"&&u.c!==void 0);if(c&&p.length>0){let u=document.body;try{u=D()||document.body}catch{}let b=Array.from(u.querySelectorAll('input[type="checkbox"], [role="checkbox"]')).filter(x=>T(x)&&!z(x));if(b.length>1){let x=new Set;for(let w of p){let A=w.t==="chk"?!!w.c:!!(w.c??!0),M="id"in w&&typeof w.id=="string"?w.id:"";if(A&&M){let L=E(M,w.v);if(L){let k=L instanceof HTMLInputElement&&L.type==="checkbox"?L:L.querySelector('input[type="checkbox"]');x.add(k||L)}}}if(x.size>0)for(let w of b)x.has(w)||(w instanceof HTMLInputElement&&w.checked||w.getAttribute("aria-checked")==="true"||w.closest(".option-card, label")?.classList.contains("selected"))&&Q(w,!1)}}for(let u of i){try{await ro(u,t,n),r++}catch(b){l.set(u,b instanceof Error?b.message:String(b)),console.warn("[EasyQuiz] A\xE7\xE3o declarativa prim\xE1ria falhou com seguran\xE7a:",u,b)}await new Promise(b=>setTimeout(b,u.t==="drag"?250:70))}await new Promise(u=>setTimeout(u,i.length>0?300:50));let h=0;for(let u of i){if(pe(u)){h++;continue}console.warn(`[EasyQuiz Auto-Cura] A\xE7\xE3o '${u.t}' no alvo '${u.id||u.from||""}' n\xE3o verificada no DOM. Disparando Passagem 2 de conting\xEAncia...`);try{Je(u,n),await $t(u)}catch(b){l.set(u,b instanceof Error?b.message:String(b)),console.warn("[EasyQuiz Auto-Cura] Rota alternativa falhou:",b)}await new Promise(b=>setTimeout(b,180)),pe(u)&&(console.log("[EasyQuiz Auto-Cura] \u2713 A\xE7\xE3o recuperada com sucesso pela rota de conting\xEAncia!"),h++)}if(h<i.length&&i.length>0){console.warn(`[EasyQuiz Auto-Cura] ${i.length-h} de ${i.length} a\xE7\xE3o(\xF5es) ainda n\xE3o verificadas. Disparando Passagem 3 final...`),await new Promise(u=>setTimeout(u,200));for(let u of i)if(!pe(u))try{await $t(u)}catch(b){l.set(u,b instanceof Error?b.message:String(b))}await new Promise(u=>setTimeout(u,200)),h=0;for(let u of i)pe(u)&&h++}for(let u of i)pe(u)||s.push(u.t==="drag"?`${u.from} -> ${u.to}`:"id"in u?u.id:u.t);c&&i.length===0&&s.push("nenhuma a\xE7\xE3o de resposta prescrita");let d=i.map((u,b)=>{let x=u.t==="drag"?`${u.from} -> ${u.to}`:u.t==="js"?"$eq":u.id||u.t,w=u.t==="js"?!0:u.t==="drag"?!!(Z(u.from,"source")&&Z(u.to,"destination")):!!(E(u.id||"")||E(y(u.id||""))),A=pe(u);return{index:b,action:u,target:x,located:w,applied:!l.has(u),verified:A,strategy:u.t==="drag"?"drag-adaptive":u.t==="js"?"javascript":"declarative-dom",evidence:A?"estado do controle confirmado no DOM":"nenhuma evid\xEAncia suficiente ap\xF3s as tentativas",...l.has(u)?{error:l.get(u)}:{}}}),m=c?i.length>0&&s.length===0&&(h===i.length||r===i.length&&h>0):!0,g=!1,v=!1,f="Nenhuma a\xE7\xE3o de navega\xE7\xE3o solicitada.";if(e&&(m||!c)){await new Promise(A=>setTimeout(A,i.length>0?400:150));let u=!1;if(o.pageType!=="info"){let A=lo();A&&T(A)&&(await nt(A,1200),_(A),u=!0,await new Promise(M=>setTimeout(M,800)))}let b=Bt(),x=a.length>0?a[0].id:void 0,w=ot(x);if(!w&&u&&(await new Promise(A=>setTimeout(A,600)),w=ot(x)),w){await nt(w,1500);let A=x||w.textContent?.trim()||"";A&&je(window.location.hostname,{advanceSelector:A}),_(w);let M=await co(b,2500);v=M.changed,f=M.evidence,g=M.changed||u,!M.changed&&!u&&console.warn("[EasyQuiz] O bot\xE3o de avan\xE7o foi acionado, mas a navega\xE7\xE3o ainda n\xE3o concluiu.")}else u?(g=!0,v=!0,f="Resposta confirmada via bot\xE3o de verifica\xE7\xE3o/envio."):console.warn("[EasyQuiz] Nenhum bot\xE3o de avan\xE7o encontrado na p\xE1gina.")}return{applied:r,verified:h,success:m,advanced:g,failed:s,reports:d,navigationVerified:v,navigationEvidence:f}}var he=null,ae=[],it=[],st=[],me=null,uo=`
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
`;function Nt(){try{if(typeof document>"u"||!document.head)return;if(!document.getElementById("eq-image-pulse-style")){let o=document.createElement("style");o.id="eq-image-pulse-style",o.textContent=uo,document.head.appendChild(o)}}catch{}}function ie(){he&&(he.style.removeProperty("outline"),he.style.removeProperty("outline-offset"),he.style.removeProperty("position"),he=null);for(let o of ae)o.style.removeProperty("outline"),o.style.removeProperty("outline-offset"),o.style.removeProperty("background-color"),o.style.removeProperty("box-shadow"),o.removeAttribute("data-easyquiz-highlight");ae=[];for(let o of it)o.style.removeProperty("animation"),o.style.removeProperty("outline"),o.style.removeProperty("outline-offset"),o.style.removeProperty("box-shadow"),o.removeAttribute("data-easyquiz-image-highlight");it=[];for(let o of st)try{o.remove()}catch{}if(st=[],me){try{me.remove()}catch{}me=null}}function rt(o){Nt();for(let e of o){if(!e||!(e instanceof(typeof HTMLElement<"u"?HTMLElement:e.constructor)))continue;let t=e;t.style.outline="3px solid #ffd600",t.style.outlineOffset="3px",t.style.animation="eq-image-pulse-yellow-white 1.2s ease-in-out infinite",t.setAttribute("data-easyquiz-image-highlight","true"),it.push(t);try{let n=t.parentElement;if(n&&!n.querySelector("[data-easyquiz-capture-badge]")){window.getComputedStyle(n).position==="static"&&(n.style.position="relative");let a=document.createElement("div");a.setAttribute("data-easyquiz-capture-badge","true"),a.textContent="\u{1F4F7} Capturado pela IA",a.style.cssText=`
          position: absolute; top: 4px; left: 4px; z-index: 99999;
          background: rgba(0,0,0,0.75); color: #ffd600; font-size: 10px;
          font-weight: 700; padding: 2px 7px; border-radius: 4px;
          pointer-events: none; font-family: system-ui, sans-serif;
          animation: eq-badge-fade-in 0.3s ease-out;
          box-shadow: 0 1px 4px rgba(0,0,0,0.4);
          letter-spacing: 0.3px;
        `,n.appendChild(a),st.push(a)}}catch{}}}function lt(o){ie(),Nt(),he=o,o.style.outline="2px solid #00e5ff",o.style.outlineOffset="4px";try{window.getComputedStyle(o).position==="static"&&(o.style.position="relative");let t=document.createElement("div");t.style.cssText=`
      position: absolute; left: 0; right: 0; top: 0; height: 3px;
      background: linear-gradient(90deg, transparent, #00e5ff, #00ff88, #00e5ff, transparent);
      z-index: 99998; pointer-events: none; border-radius: 2px;
      animation: eq-scope-scan 0.8s ease-in-out forwards;
      box-shadow: 0 0 8px rgba(0, 229, 255, 0.6);
    `,o.appendChild(t),me=t,setTimeout(()=>{try{t.remove()}catch{}me===t&&(me=null)},900)}catch{}}function po(o){return!o||o>=.9?{outline:"#00ff88",bg:"rgba(0, 255, 136, 0.12)",glow:"rgba(0, 255, 136, 0.8)"}:o>=.7?{outline:"#00bfff",bg:"rgba(0, 191, 255, 0.10)",glow:"rgba(0, 191, 255, 0.7)"}:{outline:"#ffaa00",bg:"rgba(255, 170, 0, 0.10)",glow:"rgba(255, 170, 0, 0.7)"}}function Dt(o,e){let t=po(e);for(let n of o){if(n.t==="adv"||n.t==="js")continue;if(n.t==="drag"){try{let h=E(n.from),d=E(n.to);h&&(h.style.outline=`2px solid ${t.outline}`,ae.push(h)),d&&(d.style.outline="2px dashed #00e5ff",ae.push(d))}catch{}continue}if(!n.id)continue;let i=n.v!==void 0?Array.isArray(n.v)?n.v[0]:String(n.v):"",a=E(n.id,i,n.t==="val"||n.t==="sel")||E(y(n.id),i,n.t==="val"||n.t==="sel");if(!a&&n.t==="sel"){let h=document.body;try{h=D()||document.body}catch{}let d=Array.from(h.querySelectorAll('select, [role="combobox"], [role="listbox"]')).filter(v=>T(v)&&!de(v)),m=y(n.id).toLowerCase();a=d.find(v=>{let f=(v.id||"").toLowerCase(),u=(v.getAttribute("name")||"").toLowerCase(),b=(v.getAttribute("aria-label")||"").toLowerCase(),x=y(v.closest('.dropdown-row, [class*="dropdown" i], [class*="select" i], tr, label, div')?.textContent||"").toLowerCase();return f.includes(m)||u.includes(m)||b.includes(m)||m.length>=2&&x.includes(m)})||(d.length===1?d[0]:null)}if(!a)continue;let r=typeof HTMLSelectElement<"u"&&a instanceof HTMLSelectElement||a.tagName?.toLowerCase()==="select"||a.getAttribute("role")==="combobox"||a.getAttribute("role")==="listbox",l=a.parentElement?.closest('.dropdown-row, [class*="dropdown" i], [class*="select-row" i], .form-group, tr, li')||a.closest('label, .option-card, [role="radio"], [role="checkbox"], [role="listitem"], .answer, .quiz-option, .form-check, [class*="option" i], [class*="choice" i]')||a;l.style.outline=`2px solid ${t.outline}`,l.style.outlineOffset="2px",l.style.backgroundColor=t.bg,l.setAttribute("data-easyquiz-highlight","true"),ae.push(l);let c=r?a:l.querySelector('select, [role="combobox"], [role="listbox"]');c&&(c.style.outline=`2px solid ${t.outline}`,c.style.outlineOffset="2px",c.style.boxShadow=`0 0 10px ${t.glow}`,c.setAttribute("data-easyquiz-highlight","true"),ae.push(c));let p=a instanceof HTMLInputElement&&["checkbox","radio"].includes(a.type)?a:l.querySelector('input[type="checkbox"], input[type="radio"]');p&&p!==l&&(p.style.outline=`2px solid ${t.outline}`,p.style.outlineOffset="2px",p.style.boxShadow=`0 0 10px ${t.glow}`,p.setAttribute("data-easyquiz-highlight","true"),ae.push(p))}}var ct=10,ho=1400,dt=15e5;function ge(o){return new Promise((e,t)=>{let n=new FileReader;n.onerror=()=>t(new Error("Falha ao converter blob para base64.")),n.onload=()=>{let i=String(n.result||"");e(i.split(",")[1]||"")},n.readAsDataURL(o)})}async function Te(o){let e=0,t=0;if(o instanceof HTMLImageElement?(e=o.naturalWidth||o.width,t=o.naturalHeight||o.height):(e=o.width,t=o.height),e<=0||t<=0)throw new Error("Dimens\xF5es inv\xE1lidas.");let n=Math.min(1,ho/Math.max(e,t)),i=Math.max(1,Math.round(e*n)),a=Math.max(1,Math.round(t*n)),r=document.createElement("canvas");r.width=i,r.height=a;let s=r.getContext("2d",{alpha:!1});if(!s)throw new Error("Sem suporte a Canvas 2D.");return s.fillStyle="#ffffff",s.fillRect(0,0,i,a),s.drawImage(o,0,0,i,a),new Promise((l,c)=>{r.toBlob(p=>p?l(p):c(new Error("Falha na compress\xE3o.")),"image/jpeg",.88)})}async function mo(o){let e=typeof o.getBoundingClientRect=="function"?o.getBoundingClientRect():{width:0,height:0},t=e.width||parseFloat(o.getAttribute("width")||"0")||parseFloat(o.style.width||"0")||400,n=e.height||parseFloat(o.getAttribute("height")||"0")||parseFloat(o.style.height||"0")||300,i=2,a=Math.min(1800,Math.max(120,Math.round(t*i))),r=Math.min(1800,Math.max(100,Math.round(n*i))),s=o.cloneNode(!0);s.getAttribute("xmlns")||s.setAttribute("xmlns","http://www.w3.org/2000/svg"),s.setAttribute("width",String(a)),s.setAttribute("height",String(r)),!s.getAttribute("viewBox")&&t>0&&n>0&&s.setAttribute("viewBox",`0 0 ${t} ${n}`);let c=new XMLSerializer().serializeToString(s),p=new Blob([c],{type:"image/svg+xml;charset=utf-8"}),h=URL.createObjectURL(p);try{let d=new Image;d.crossOrigin="anonymous",await new Promise((v,f)=>{d.onload=()=>v(),d.onerror=()=>f(new Error("Falha ao renderizar SVG em Image.")),d.src=h});let m=document.createElement("canvas");m.width=a,m.height=r;let g=m.getContext("2d",{alpha:!1});if(!g)throw new Error("Sem suporte a Canvas 2D.");return g.fillStyle="#ffffff",g.fillRect(0,0,a,r),g.drawImage(d,0,0,a,r),new Promise((v,f)=>{m.toBlob(u=>u?v(u):f(new Error("Falha na compress\xE3o do SVG.")),"image/jpeg",.92)})}finally{URL.revokeObjectURL(h)}}async function ut(o){try{let e=o.cloneNode(!0),t=o.offsetWidth||500,n=o.offsetHeight||500,i=`
      <svg xmlns="http://www.w3.org/2000/svg" width="${t}" height="${n}">
        <foreignObject width="100%" height="100%">
          <div xmlns="http://www.w3.org/1999/xhtml" style="background:#fff;font-family:sans-serif;">
            ${e.innerHTML}
          </div>
        </foreignObject>
      </svg>
    `,a=new Blob([i],{type:"image/svg+xml;charset=utf-8"}),r=URL.createObjectURL(a),s=new Image;s.crossOrigin="anonymous",await new Promise((p,h)=>{s.onload=()=>p(),s.onerror=()=>h(new Error("Falha ao renderizar ForeignObject.")),s.src=r});let l=await Te(s),c=await ge(l);if(URL.revokeObjectURL(r),c&&c.length<=dt)return{mediaType:"image/jpeg",base64:c,alt:"Captura via rasteriza\xE7\xE3o DOM",source:"rasterized"}}catch(e){console.warn("Falha na rasteriza\xE7\xE3o do n\xF3:",e)}return null}function go(o,e){let t=o.closest('[data-easyquiz-id], button, [role="button"], [role="radio"], [role="checkbox"], [role="option"], label, .option-card, .quiz-option, .choice, .answer, [class*="option" i], [class*="choice" i], [class*="answer" i], li, tr');if(t&&t!==e&&T(t)&&!J(t)&&!P(t)){let a=t.dataset.easyquizId||t.id||void 0,r=I(t.innerText||t.textContent||"",120),s=t.getAttribute("aria-label")||t.getAttribute("title")||"",l=r||s,c=a?` [id: ${a}]`:"";if(l)return{associatedLabel:`Alternativa/Op\xE7\xE3o: "${l}"${c}`,targetControlId:a};if(a)return{associatedLabel:`Alternativa/Op\xE7\xE3o ${c}`,targetControlId:a}}let n=o.closest("figure")?.querySelector("figcaption")?.textContent?.trim();if(n)return{associatedLabel:`Figura do Enunciado: "${I(n,100)}"`};let i=o.closest('[class*="prompt" i], [class*="stimulus" i], [class*="question-text" i], [class*="statement" i], header, h1, h2, h3, h4, p');if(i){let a=I(i.textContent||"",80);if(a)return{associatedLabel:`Gr\xE1fico do Enunciado: "${a}"`}}return{associatedLabel:"Gr\xE1fico/Imagem do Enunciado Principal"}}async function fo(o){let e=o.currentSrc||o.src;if(!e)return null;let t=(o.alt||o.getAttribute("aria-label")||"Imagem da quest\xE3o").slice(0,500);if(o.complete&&o.naturalWidth>0)try{let n=await Te(o),i=await ge(n);if(i&&i.length<=dt)return{mediaType:"image/jpeg",base64:i,alt:t,source:e.slice(0,2e3)}}catch{}try{let n=await fetch(e,{mode:"cors"});if(n.ok){let i=await n.blob();if(i.type.startsWith("image/")){let a=await createImageBitmap(i),r=await Te(a);a.close();let s=await ge(r);if(s&&s.length<=dt)return{mediaType:"image/jpeg",base64:s,alt:t,source:e.slice(0,2e3)}}}}catch{return ut(o.parentElement||o)}return null}function bo(o){return o.querySelectorAll("path, line, polyline, polygon, circle, rect, text, image").length>0}function vo(o){try{let e=o.style.backgroundImage||(window.getComputedStyle?window.getComputedStyle(o).backgroundImage:"");if(e&&e.includes("url(")){let t=e.match(/url\(["']?([^"')]+)["']?\)/);if(t&&t[1]&&!t[1].startsWith("data:image/svg+xml"))return t[1]}}catch{}return null}async function pt(o,e=!0){if(!e)return[];let t=[],n=0,i=35e5,a=(l,c)=>{if(!l||!l.base64||n+l.base64.length>i)return!1;let p=go(c,o);return l.associatedLabel=p.associatedLabel,l.targetControlId=p.targetControlId,l.element=c,t.push(l),n+=l.base64.length,t.length>=ct},r=Array.from(o.querySelectorAll("img")).filter(l=>T(l)&&!P(l));for(let l of r)try{let c=await fo(l);if(a(c,l))return t}catch{}let s=Array.from(o.querySelectorAll("svg")).filter(l=>{if(!T(l)||P(l))return!1;let c=typeof l.getBoundingClientRect=="function"?l.getBoundingClientRect():{width:0,height:0},p=c.width||parseFloat(l.getAttribute("width")||"0"),h=c.height||parseFloat(l.getAttribute("height")||"0");return p<30||h<30?!1:bo(l)});for(let l of s)try{let c=await mo(l),p=await ge(c);if(p){let h={mediaType:"image/jpeg",base64:p,alt:l.getAttribute("aria-label")||"Gr\xE1fico/Diagrama vetorial da quest\xE3o",source:"svg"};if(a(h,l))return t}}catch{let c=await ut(l.parentElement||l);if(a(c,l))return t}if(t.length<ct){let l=Array.from(o.querySelectorAll("canvas")).filter(c=>T(c)&&!P(c));for(let c of l)try{let p=await Te(c),h=await ge(p);if(h){let d={mediaType:"image/jpeg",base64:h,alt:c.getAttribute("aria-label")||"Gr\xE1fico Canvas inline",source:"canvas"};if(a(d,c))return t}}catch{let p=await ut(c.parentElement||c);if(a(p,c))return t}}if(t.length<ct){let l=Array.from(o.querySelectorAll('[style*="background-image"], .option-image, .question-media')).filter(c=>T(c)&&!P(c));for(let c of l){let p=vo(c);if(p)try{let h=await fetch(p,{mode:"cors"});if(h.ok){let d=await h.blob();if(d.type.startsWith("image/")){let m=await createImageBitmap(d),g=await Te(m);m.close();let v=await ge(g);if(v){let f={mediaType:"image/jpeg",base64:v,alt:"Imagem de fundo da alternativa",source:p.slice(0,2e3)};if(a(f,c))return t}}}}catch{}}}return t}function yo(o,e=""){if(typeof document>"u")return!1;let t=o||document.body,n=(e+" "+(t.textContent||"")).toLowerCase();return!!t.querySelector('.celebration-icon, [class*="celebrat" i], [class*="conclu" i], [class*="finish" i], [class*="result" i], [class*="score-screen" i], [data-testid*="completion" i], [data-functional-selector*="game-over" i], .perseus-message-renderer, [data-congratulations]')&&(n.includes("parab\xE9ns")||n.includes("conclu")||n.includes("finaliz")||n.includes("resultado")||n.includes("pontua")||n.includes("sucesso")||n.includes("\u{1F3C6}")||n.includes("game over")||n.includes("great job"))?!0:["parab\xE9ns! lista de exerc\xEDcios conclu\xEDda","exerc\xEDcios conclu\xEDda","lista de exerc\xEDcios conclu\xEDda","atividade conclu\xEDda","atividade finalizada","finalizado com sucesso","finalizada com sucesso","simulado conclu\xEDdo","simulado finalizado","question\xE1rio conclu\xEDdo","question\xE1rio finalizado","voc\xEA concluiu a atividade","voc\xEA concluiu o question\xE1rio","sua resposta foi registrada","todas as perguntas foram respondidas","quiz completed","exercise completed","activity completed","all questions answered","view results","game over","leaderboard","scoreboard","awesome","great job","you got it right","mission complete","your response has been recorded","sua resposta foi registrada"].some(r=>n.includes(r))}var De=class{active=!1;callbacks;isProcessing=!1;observer=null;mutationTimer=null;heartbeatTimer=null;abortController=null;errorCount=0;resolvedSigs=new Set;lastContentSig="";constructor(e){this.callbacks=e}isActive(){return this.active}start(){this.active||(this.active=!0,this.callbacks.onStatusChange("waiting","> [SYS] Autopilot ENGAGED. Monitorando..."),typeof MutationObserver<"u"&&(this.observer=new MutationObserver(()=>{!this.active||this.isProcessing||(this.mutationTimer&&clearTimeout(this.mutationTimer),this.mutationTimer=window.setTimeout(()=>{this.mutationTimer=null,this.isProcessing||this.checkAndAnalyze()},120))}),this.observer.observe(document.body,{subtree:!0,childList:!0,characterData:!0,attributes:!0})),this.scheduleHeartbeat(),this.checkAndAnalyze())}stop(){if(this.active=!1,this.abortController){try{this.abortController.abort()}catch{}this.abortController=null}this.mutationTimer&&(clearTimeout(this.mutationTimer),this.mutationTimer=null),this.heartbeatTimer&&(clearTimeout(this.heartbeatTimer),this.heartbeatTimer=null),this.observer?.disconnect(),this.observer=null,this.isProcessing=!1,this.resolvedSigs.clear(),this.callbacks.onStatusChange("idle","> [SYS] Autopilot DESATIVADO pelo usu\xE1rio.","text-yellow")}scheduleHeartbeat(){this.heartbeatTimer&&clearTimeout(this.heartbeatTimer),this.heartbeatTimer=window.setTimeout(()=>{this.heartbeatTimer=null,this.active&&!this.isProcessing&&this.checkAndAnalyze(),this.active&&this.scheduleHeartbeat()},2e3)}sleep(e){return new Promise(t=>{if(!this.active)return t();let n=null,i=()=>{n&&clearTimeout(n),t()};n=window.setTimeout(t,e),this.abortController?.signal.addEventListener("abort",i,{once:!0})})}async checkAndAnalyze(){if(!(!this.active||this.isProcessing))try{this.isProcessing=!0;let e=Ee(!1);if(e||(e=ue()),!this.active)return;if(!e){this.callbacks.onStatusChange("waiting","> [SYS] Monitorando p\xE1gina... Aguardando elementos.");return}if(yo(e.scope,e.questionText)){this.callbacks.onStatusChange("idle","> [SYS] \u{1F3C6} Atividade conclu\xEDda! Autopilot finalizado.","text-green"),this.stop();return}if(this.callbacks.isManualModeActive?.()){this.callbacks.onStatusChange("waiting","> [SYS] Gabarito manual ativo. Aguardando voc\xEA avan\xE7ar...","text-yellow");return}let t=It(e);if(this.resolvedSigs.has(t)||t===this.lastContentSig&&this.resolvedSigs.size>0)return;t!==this.lastContentSig&&this.lastContentSig!==""&&(this.callbacks.onStatusChange("waiting","> [SYS] Nova quest\xE3o detectada! Analisando...","text-green"),this.callbacks.onPageAdvance?.()),this.lastContentSig=t;let i=e.controls.filter(r=>r.role==="answer"),a=be(window.location.hostname);if(i.length>0){if(this.callbacks.onStatusChange("analyzing","> [IA] Quest\xE3o detectada. Consultando IA...","text-blue"),!this.active)return;this.abortController=new AbortController;let r=await this.callbacks.onRequestAnalysis(1,this.abortController.signal);if(this.abortController=null,!this.active)return;if(r){if(this.callbacks.onStatusChange("analyzing",`> [IA] (${r.usedModel||"gemini"}) Confian\xE7a: ${(r.confidence*100).toFixed(1)}% | Modo: ${r.mode}`,"text-blue"),this.callbacks.onStatusChange("analyzing",`> [IA] Racioc\xEDnio: ${r.rationale}`,"text-blue"),this.callbacks.onStatusChange("analyzing",`> [IA] A\xE7\xF5es: ${r.actions.length}`,"text-blue"),this.errorCount=0,r.memoryToStore&&this.callbacks.onStatusChange("analyzing",`> [IA] \u{1F9E0} Mem\xF3ria RAG: "${r.memoryToStore}"`,"text-yellow"),r.pageType==="conclusion"){this.callbacks.onStatusChange("idle","> [SYS] Atividade conclu\xEDda! Desligando Autopilot.","text-green"),this.stop();return}this.resolvedSigs.add(t)}else{this.errorCount++;let s=this.errorCount===1?5e3:8e3;this.callbacks.onStatusChange("waiting",`> [AVISO] Falha na an\xE1lise (${this.errorCount}/3). Aguardando ${s/1e3}s...`,"text-yellow"),await this.sleep(s)}}else if(a.advanceSelector&&E(a.advanceSelector)&&e.questionText.length<50){let r=E(a.advanceSelector);if(r){if(this.callbacks.onStatusChange("advancing",`> [BRUTE] Avan\xE7ando via cache "${a.advanceSelector}"...`),await this.sleep(800),!this.active)return;_(r),this.resolvedSigs.add(t),this.errorCount=0}}else{if(this.callbacks.onStatusChange("analyzing","> [IA] P\xE1gina informativa detectada. Consultando IA...","text-blue"),!this.active)return;this.abortController=new AbortController;let r=await this.callbacks.onRequestAnalysis(1,this.abortController.signal);if(this.abortController=null,!this.active)return;if(r){if(this.callbacks.onStatusChange("analyzing",`> [IA] (${r.usedModel||"gemini"}) Tipo: ${r.pageType} | Modo: ${r.mode}`,"text-blue"),this.callbacks.onStatusChange("analyzing",`> [IA] Racioc\xEDnio: ${r.rationale}`,"text-blue"),r.memoryToStore&&this.callbacks.onStatusChange("analyzing",`> [IA] \u{1F9E0} Absorvido: "${r.memoryToStore}"`,"text-yellow"),r.pageType==="info")this.callbacks.onStatusChange("advancing","> [IA] \u{1F4D6} Leitura conclu\xEDda. Avan\xE7ando...","text-green"),await this.sleep(1200);else if(r.pageType==="start")this.callbacks.onStatusChange("advancing","> [SYS] In\xEDcio detectado. Iniciando...","text-blue"),await this.sleep(1200);else if(r.pageType==="conclusion"){this.callbacks.onStatusChange("idle","> [SYS] Atividade conclu\xEDda! Desligando Autopilot.","text-green"),this.stop();return}this.errorCount=0,this.resolvedSigs.add(t)}else{this.errorCount++;let s=this.errorCount===1?5e3:8e3;this.callbacks.onStatusChange("waiting",`> [AVISO] Falha ao processar p\xE1gina (${this.errorCount}/3). Aguardando ${s/1e3}s...`,"text-yellow"),await this.sleep(s)}}if(this.errorCount>=3){this.callbacks.onStatusChange("error","> [ERRO] 3 falhas consecutivas. Abortando Autopilot.","text-red"),this.callbacks.onStatusChange("waiting","> [DICA] Verifique o [ERRO DETALHADO] acima para o motivo exato.","text-yellow"),this.stop();return}}catch(e){if(!this.active)return;let t=e instanceof Error?e.message:String(e);if(t.includes("cancelada")||t.includes("aborted"))return;console.warn("[EasyQuiz Autopilot]",e),this.callbacks.onStatusChange("error",`> [ERRO NO AUTOPILOT] ${t}`,"text-red")}finally{this.abortController=null,this.isProcessing=!1,this.active&&window.setTimeout(()=>void this.checkAndAnalyze(),150)}}};var q={logo:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.8L19.2 8 12 11.2 4.8 8 12 4.8zM4 9.6l7 3.1v7.5l-7-3.5V9.6zm9 10.6v-7.5l7-3.1v7.1l-7 3.5z"/></svg>',rocket:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M13.13 2.81a.5.5 0 0 0-.46-.07c-.42.15-2.08.79-3.9 2.61-2.04 2.04-2.6 4.09-2.73 4.96l-.97.98a1 1 0 0 0-.29.71v2.12a1 1 0 0 0 .29.71l2.83 2.83a1 1 0 0 0 .71.29h2.12a1 1 0 0 0 .71-.29l.98-.97c.87-.13 2.92-.69 4.96-2.73 1.82-1.82 2.46-3.48 2.61-3.9a.5.5 0 0 0-.07-.46l-6.79-6.79zM4.5 16.5l-2.09 2.09a.5.5 0 0 0 .35.85h3.04l.35.35v3.04a.5.5 0 0 0 .85.35L9.09 21.1l-4.59-4.6z"/></svg>',play:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>',stop:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h12v12H6z"/></svg>',code:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>',terminal:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8h16v10zm-12-3l3-3-3-3 1.4-1.4L13.8 12l-4.4 4.4L8 15zm6 0h4v2h-4v-2z"/></svg>',inspector:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>',settings:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.49.49 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>',key:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M7 14c-2.76 0-5-2.24-5-5s2.24-5 5-5c2.42 0 4.44 1.72 4.9 4H22v4h-2v3h-3v-3h-2v3h-3v-3h-2.1c-.46 2.28-2.48 4-4.9 4zm0-7c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>',paste:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 2h-4.18C14.4 .84 13.3 0 12 0c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm7 18H5V4h2v3h10V4h2v16z"/></svg>',edit:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>',trash:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>',eraser:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M15.14 3c-.51 0-1.02.2-1.41.59L2.59 14.73c-.78.78-.78 2.05 0 2.83L6.44 21.4c.78.78 2.05.78 2.83 0l11.14-11.14c.78-.78.78-2.05 0-2.83l-3.86-3.84c-.39-.39-.9-.59-1.41-.59zm.71 2.71l3.15 3.15-3.15 3.15-3.15-3.15 3.15-3.15zm-4.57 4.57l3.15 3.15-4.57 4.57H6.71l-3-3 7.57-7.57z"/></svg>',save:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/></svg>',analyze:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L3 14h8l-2 8 12-12h-8l2-8z"/></svg>',apply:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>',close:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>',chevronRight:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>',chevronLeft:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>',eye:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>',eyeOff:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.44-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.17c0-1.66-1.34-3-3-3l-.17.02z"/></svg>',check:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>',clock:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>',copy:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>',refresh:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg>',chip:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4h12v16H6V4zm2 2v12h8V6H8zm-4 3h2v2H4V9zm0 4h2v2H4v-2zm16-4h2v2h-2V9zm0 4h2v2h-2v-2zM9 2h2v2H9V2zm4 0h2v2h-2V2zm-4 18h2v2H9v-2zm4 0h2v2h-2v-2z"/></svg>',moreVertical:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>',minimize:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M19 13H5v-2h14v2z"/></svg>',maximize:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/></svg>',dragHandle:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M10 9h4V6h-4v3zm0 5h4v-3h-4v3zm0 5h4v-3h-4v3zM4 9h4V6H4v3zm0 5h4v-3H4v3zm0 5h4v-3H4v3zm12-10V6h4v3h-4zm0 5h4v-3h-4v3zm0 5h4v-3h-4v3z"/></svg>',list:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/></svg>',folderTree:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6 10H6v-2h8v2zm4-4H6v-2h12v2z"/></svg>',folder:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/></svg>',file:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>',stopwatch:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M15 1H9v2h6V1zm-4 13h2V8h-2v6zm8.03-6.61l1.42-1.42c-.43-.51-.9-.99-1.41-1.41l-1.42 1.42A8.962 8.962 0 0 0 12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9a8.994 8.994 0 0 0 7.03-14.61zM12 20c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"/></svg>',plus:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>',sparkles:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M9 21l-2.5-5.5L1 13l5.5-2.5L9 5l2.5 5.5L17 13l-5.5 2.5L9 21zm9.5-12.5l-1.5-3.5-3.5-1.5 3.5-1.5 1.5-3.5 1.5 3.5 3.5 1.5-3.5 1.5-1.5 3.5z"/></svg>'};var Oe=class{element=null;shadow;isMinimized=!1;currentPlan=null;isDragging=!1;dragStartX=0;dragStartY=0;initialLeft=25;initialTop=25;onAdvanceCallback;constructor(e,t){this.shadow=e,this.onAdvanceCallback=t,this.initGlobalListeners()}initGlobalListeners(){window.addEventListener("popstate",()=>this.handlePageNavigated()),window.addEventListener("hashchange",()=>this.handlePageNavigated()),document.addEventListener("click",e=>{if(!this.isOpen())return;let t=e.target;if(!t||this.shadow.contains(t)||t.closest("#easyquiz-shadow-root"))return;let n=t.closest('button, [role="button"], a, input[type="submit"]');if(n){let i=(n.textContent||n.value||"").toLowerCase();/pr[oó]xim|avan[cç]|continu|verific|enviar|submit|confirm|checar|validar|next/i.test(i)&&setTimeout(()=>{this.isOpen()&&this.handlePageNavigated()},800)}},!0)}handlePageNavigated(){this.isOpen()&&(this.hide(),this.onAdvanceCallback?.())}isOpen(){return this.element!==null&&this.element.style.display!=="none"}show(e){this.currentPlan=e,this.element||this.createElement(),this.renderContent(),this.element&&(this.element.style.display="flex")}hide(){this.element&&(this.element.style.display="none")}minimize(){this.isMinimized=!0,this.element&&this.element.classList.add("minimized")}restore(){this.isMinimized=!1,this.element&&this.element.classList.remove("minimized")}createElement(){this.element=document.createElement("div"),this.element.className="eq-floating-hud",this.element.style.left=`${this.initialLeft}px`,this.element.style.top=`${this.initialTop}px`,this.element.innerHTML=`
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
    `,this.shadow.appendChild(this.element),this.element.querySelector("#eq-fah-pill").addEventListener("click",()=>this.restore()),this.element.querySelector("#eq-fah-min-btn").addEventListener("click",()=>this.minimize()),this.element.querySelector("#eq-fah-close-btn").addEventListener("click",()=>this.hide());let i=this.element.querySelector("#eq-fah-copy-md-btn");i.addEventListener("click",()=>this.copyMarkdownToClipboard(i));let a=this.element.querySelector("#eq-fah-copy-all-btn");a.addEventListener("click",()=>this.copyMarkdownToClipboard(a));let r=this.element.querySelector("#eq-fah-header");this.setupDraggable(r)}setupDraggable(e){let t=n=>{if(n.target.closest(".eq-fah-btn"))return;n.preventDefault(),this.isDragging=!0,this.dragStartX=n.clientX,this.dragStartY=n.clientY;let i=this.element.getBoundingClientRect();this.initialLeft=i.left,this.initialTop=i.top;let a=s=>{if(!this.isDragging||!this.element)return;let l=s.clientX-this.dragStartX,c=s.clientY-this.dragStartY,p=Math.max(10,window.innerWidth-this.element.offsetWidth-10),h=Math.max(10,window.innerHeight-this.element.offsetHeight-10),d=Math.min(Math.max(10,this.initialLeft+l),p),m=Math.min(Math.max(10,this.initialTop+c),h);this.element.style.left=`${d}px`,this.element.style.top=`${m}px`},r=()=>{this.isDragging=!1,window.removeEventListener("mousemove",a),window.removeEventListener("mouseup",r)};window.addEventListener("mousemove",a),window.addEventListener("mouseup",r)};e.addEventListener("mousedown",t)}renderContent(){if(!this.element||!this.currentPlan)return;let e=this.element.querySelector("#eq-fah-body"),t=this.element.querySelector("#eq-fah-pill-text"),n=this.element.querySelector("#eq-fah-pill-badge");e.innerHTML="";let i=this.currentPlan,a=i.actions.filter(m=>m.t==="drag"),r=i.actions.filter(m=>{if(m.t!=="val")return!1;let g=y(m.id||"").toLowerCase();return!/continu|avan[cç]|pr[oó]xim|submet|enviar|check|verific/i.test(g)}),s=i.actions.filter(m=>m.t==="clk"||m.t==="chk"),l=i.actions.filter(m=>m.t==="sel"),c=a.length||r.length||s.length||l.length,p=document.createElement("div");p.className="eq-fah-meta";let h=document.createElement("span");h.textContent=`Modo: ${i.mode.replace("_"," ")}`;let d=document.createElement("span");if(d.className="eq-fah-meta-badge",d.textContent=`${Math.round(i.confidence*100)}% Confian\xE7a`,p.append(h,d),e.appendChild(p),a.length>0||i.mode==="categorizacao"||i.mode==="arrastar_soltar"){t.textContent=`Categoriza\xE7\xE3o (${a.length} itens)`,n.textContent=String(a.length);let m={};for(let g of a){let v=y(g.to)||"Geral";m[v]||(m[v]=[]),m[v].push(y(g.from))}for(let[g,v]of Object.entries(m)){let f=document.createElement("div"),u=/fato|true|verdadeiro|sim/i.test(g),b=/opini[aã]o|false|falso|n[aã]o/i.test(g);f.className=`eq-fah-group ${u?"group-fato":b?"group-opiniao":""}`;let x=document.createElement("div");x.className="eq-fah-group-title",x.textContent=`\u{1F4C1} ${g} (${v.length})`,f.appendChild(x);let w=document.createElement("div");w.className="eq-fah-group-items";for(let A of v){let M=document.createElement("div");M.className="eq-fah-item";let L=document.createElement("span");L.className="eq-fah-item-text",L.textContent=A,M.appendChild(L);let k=document.createElement("button");k.className="eq-fah-copy-inline",k.textContent="Copiar",k.addEventListener("click",()=>{navigator.clipboard.writeText(A),k.textContent="\u2713 Copiado",setTimeout(()=>k.textContent="Copiar",1200)}),M.appendChild(k),w.appendChild(M)}f.appendChild(w),e.appendChild(f)}}else if(r.length>0){t.textContent=`Preenchimento (${r.length} campos)`,n.textContent=String(r.length);let m=document.createElement("div");m.className="eq-fah-group";let g=document.createElement("div");g.className="eq-fah-group-title",g.textContent="\u{1F4DD} Respostas para os Campos de Texto:",m.appendChild(g);let v=document.createElement("div");v.className="eq-fah-group-items";for(let f=0;f<r.length;f++){let u=r[f],b=document.createElement("div");b.className="eq-fah-item";let x=Ce(u.id);(!x||/^[#\.\$]|input|mat-|cell|field|q[0-9]|eq-/i.test(x))&&(x=`Campo ${f+1}`);let w=String(u.v??""),A=document.createElement("div");A.className="eq-fah-field-box";let M=document.createElement("div");M.className="eq-fah-field-label",M.textContent=x,A.appendChild(M);let L=document.createElement("div");L.className="eq-fah-field-val",L.textContent=w,A.appendChild(L),b.appendChild(A);let k=document.createElement("button");k.className="eq-fah-copy-inline",k.textContent="Copiar",k.addEventListener("click",()=>{navigator.clipboard.writeText(w),k.textContent="\u2713 Copiado",setTimeout(()=>k.textContent="Copiar",1200)}),b.appendChild(k),v.appendChild(b)}m.appendChild(v),e.appendChild(m)}else if(s.length>0){t.textContent=`Op\xE7\xF5es (${s.length} marcadas)`,n.textContent=String(s.length);let m=document.createElement("div");m.className="eq-fah-group";let g=document.createElement("div");g.className="eq-fah-group-title",g.textContent="\u{1F3AF} Alternativa(s) Correta(s):",m.appendChild(g);let v=document.createElement("div");v.className="eq-fah-group-items";for(let f=0;f<s.length;f++){let u=s[f],b=document.createElement("div");b.className="eq-fah-item";let x=Ce(u.id);(!x||/^(eq-|#|\$|\.|input_|mat-|choice_|radio_|chk_)/i.test(x))&&u.v&&(x=String(u.v)),x=y(x),/^(eq-|#|\$|\.|input_|mat-|choice_|radio_|chk_)/i.test(x)&&(x="");let w="",A=x.match(/^(\([A-Za-z0-9]\)|[A-Za-z0-9][\)\.\:\-])\s*(.*)$/);A?(w=A[1].replace(/[\(\)\.\:\-\s]/g,"").toUpperCase(),x=A[2].trim()||x):s.length>1&&(w=String.fromCharCode(65+f));let M=document.createElement("div");if(M.style.display="flex",M.style.alignItems="center",M.style.gap="8px",M.style.flex="1",w){let G=document.createElement("span");G.className="eq-fah-letter-badge",G.textContent=w,M.appendChild(G)}let L=document.createElement("span");L.className="eq-fah-item-text",L.textContent=x||(w?`Alternativa ${w}`:"Alternativa Selecionada"),M.appendChild(L),b.appendChild(M);let k=document.createElement("button");k.className="eq-fah-copy-inline",k.textContent="Copiar",k.addEventListener("click",()=>{navigator.clipboard.writeText(x||w),k.textContent="\u2713 Copiado",setTimeout(()=>k.textContent="Copiar",1200)}),b.appendChild(k),v.appendChild(b)}m.appendChild(v),e.appendChild(m)}else if(l.length>0){t.textContent=`Sele\xE7\xE3o (${l.length} listas)`,n.textContent=String(l.length);let m=document.createElement("div");m.className="eq-fah-group";let g=document.createElement("div");g.className="eq-fah-group-title",g.textContent="\u{1F4CB} Op\xE7\xF5es para Selecionar na Lista:",m.appendChild(g);let v=document.createElement("div");v.className="eq-fah-group-items";for(let f=0;f<l.length;f++){let u=l[f],b=document.createElement("div");b.className="eq-fah-item";let x=Ce(u.id);(!x||/^[#\.\$]|select|input|mat-|cell|field|q[0-9]|eq-/i.test(x))&&(x=`Lista ${f+1}`);let M=(Array.isArray(u.v)?u.v:[String(u.v??"")]).map(se=>{let ee=E(u.id,void 0,!0)||E(y(u.id),void 0,!0),C=ee instanceof HTMLSelectElement?ee:ee?.querySelector("select");if(C){let H=y(se).toLowerCase();for(let B=0;B<C.options.length;B++){let F=C.options[B];if(F.value.toLowerCase()===H||y(F.textContent).toLowerCase()===H){let N=y(F.textContent);if(N&&!N.toLowerCase().includes("selecione"))return N}}}return se}).join(", "),L=document.createElement("div");L.className="eq-fah-field-box";let k=document.createElement("div");k.className="eq-fah-field-label",k.textContent=x,L.appendChild(k);let G=document.createElement("div");G.className="eq-fah-field-val",G.textContent=M,L.appendChild(G),b.appendChild(L);let Y=document.createElement("button");Y.className="eq-fah-copy-inline",Y.textContent="Copiar",Y.addEventListener("click",()=>{navigator.clipboard.writeText(M),Y.textContent="\u2713 Copiado",setTimeout(()=>Y.textContent="Copiar",1200)}),b.appendChild(Y),v.appendChild(b)}m.appendChild(v),e.appendChild(m)}else{t.textContent="Gabarito",n.textContent="0";let m=document.createElement("div");m.style.padding="10px",m.style.color="#888",m.textContent="Nenhuma resposta direta para exibir.",e.appendChild(m)}if(i.rationale){let m=document.createElement("div");m.className="eq-fah-rationale",m.textContent=`\u{1F4A1} Racioc\xEDnio da IA: ${i.rationale}`,e.appendChild(m)}}generateMarkdown(){if(!this.currentPlan)return"";let e=this.currentPlan,t=[];t.push("# Gabarito da Quest\xE3o \u2014 EasyQuiz Pro"),t.push(`- **Modo:** ${e.mode}`),t.push(`- **Confian\xE7a:** ${(e.confidence*100).toFixed(0)}%`),t.push("");let n=e.actions.filter(s=>s.t==="drag"),i=e.actions.filter(s=>s.t==="val"),a=e.actions.filter(s=>s.t==="clk"||s.t==="chk"),r=e.actions.filter(s=>s.t==="sel");if(n.length>0){t.push("## \u{1F4C2} Categoriza\xE7\xE3o:");let s={};for(let l of n){let c=y(l.to)||"Geral";s[c]||(s[c]=[]),s[c].push(y(l.from))}for(let[l,c]of Object.entries(s)){t.push(`### Categoria: ${l}`);for(let p of c)t.push(`- ${p}`);t.push("")}}else if(i.length>0){t.push("## \u270F\uFE0F Respostas para Preenchimento:");for(let s of i){let l=y(s.id);t.push(`- **${l||"Campo"}:** \`${s.v}\``)}t.push("")}else if(a.length>0){t.push("## \u2705 Alternativas Corretas:");for(let s=0;s<a.length;s++){let l=a[s],c=Ce(l.id);(!c||/^(eq-|#|\$|\.|input_|mat-|choice_|radio_|chk_)/i.test(c))&&l.v&&(c=String(l.v)),c=y(c),/^(eq-|#|\$|\.|input_|mat-|choice_|radio_|chk_)/i.test(c)&&(c="");let p=a.length>1?`${String.fromCharCode(65+s)}) `:"";t.push(`- [x] ${p}${c||"Alternativa "+String.fromCharCode(65+s)}`)}t.push("")}else if(r.length>0){t.push("## \u{1F4CB} Op\xE7\xF5es Selecionadas em Lista:");for(let s of r){let l=y(s.id)||"Lista",c=Array.isArray(s.v)?s.v.join(", "):String(s.v??"");t.push(`- **${l}:** \`${c}\``)}t.push("")}return e.rationale&&(t.push("---"),t.push(`**\u{1F4A1} Racioc\xEDnio:** ${e.rationale}`)),t.join(`
`)}copyMarkdownToClipboard(e){let t=this.generateMarkdown();t&&navigator.clipboard.writeText(t).then(()=>{let n=e.innerHTML;e.id==="eq-fah-copy-md-btn"?e.innerHTML='<span style="font-size:10px; color:#00ffcc; font-weight:bold;">\u2713</span>':e.innerHTML="\u2713 Copiado!",setTimeout(()=>{e.innerHTML=n},1500)})}};var Ot=`
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
`;var xo=[{value:"",label:"Detec\xE7\xE3o Autom\xE1tica"},{value:"escolha_unica",label:"M\xFAltipla Escolha (\xDAnica)"},{value:"escolha_multipla",label:"M\xFAltipla Escolha (V\xE1rias)"},{value:"categorizacao",label:"Categoriza\xE7\xE3o / Grupos"},{value:"arrastar_soltar",label:"Arrastar e Soltar (Drag & Drop)"},{value:"ordenacao",label:"Ordena\xE7\xE3o / Sequ\xEAncia"},{value:"verdadeiro_falso",label:"Verdadeiro / Falso"},{value:"texto_livre",label:"Texto Livre / Dissertativa"},{value:"preenchimento",label:"Preenchimento de Lacunas"}],wo=[{value:"smart",label:"Inteligente (Auto-H\xEDbrido)"},{value:"command",label:"Apenas Comando (Seguro)"},{value:"javascript",label:"Apenas JS Nativo (Avan\xE7ado)"}],Ve=class{host;shadow;callbacks;autopilot;floatingAnswers;initialSettings;isCollapsed=!1;activeTab="resolver";isBusy=!1;stopwatchInterval=null;stopwatchStartTime=0;latestPlan=null;latestContext=null;latestPromptText="";metricsLiveTime;metricsLiveStatus;metricsTotalBadge;metricTotalTime;metricAvgTime;metricTotalCount;metricsHistoryList;metricsHistoryCount;metricsCopyBtn;metricsResetBtn;currentQuestionStartTime=0;questionLiveTimerInterval=null;liveDebugTerminal;dbgModel;dbgLatency;dbgSplitTokens;dbgTotalTokens;dbgErrorCard;dbgErrorText;dbgPromptLen;dbgPromptView;dbgContextView;dbgRawRespView;dbgCountAll;dbgCountError;dbgCountAi;dbgCountDom;logEntries=[];activeLogFilter="all";autoScrollLogs=!0;lastErrorMsg=null;_autopilotAnalyzingShown=!1;progressContainer;progressBar;progressLabel;progressVal;contextTreeContainer;launcherBtn;launcherDot;dockToggleBtn;sidebarEl;apToggleBtn;apConsole;executionConsole;dotPulseAp;statusTextAp;stopwatchAp;dotPulseAdv;statusTextAdv;stopwatchAdv;inspModel;inspLatency;inspTokens;inspPrompt;inspRationale;inspActions;copyPromptBtn;apiKeyInput;keyContextMenu;keyMoreBtn;keysListEl;keysBadgeEl;modelSelect;modeSelect;engineSelect;dryRunCheckbox;autoApplyCheckbox;autoAdvanceCheckbox;hostDarkModeCheckbox;useVisionCheckbox;analyzeBtn;applyBtn;resultContainer;constructor(e,t){this.initialSettings=e,this.callbacks=t,this.autopilot=new De({onStatusChange:(s,l,c)=>{this.logToConsole(l,c),s==="analyzing"?this._autopilotAnalyzingShown||(this._autopilotAnalyzingShown=!0,this.setBusy(!0,"Autopilot: IA analisando...")):s==="advancing"||s==="waiting"?(this._autopilotAnalyzingShown=!1,this.setBusy(!1),this.updateAutopilotUi(!0)):s==="idle"?(this._autopilotAnalyzingShown=!1,this.setBusy(!1),this.updateAutopilotUi(!1),l.includes("conclus\xE3o")||l.includes("finalizada")||l.includes("Parab\xE9ns")?this.setStatus("Atividade conclu\xEDda com sucesso! Autopilot finalizado.","success"):this.setStatus("Autopilot desativado.","info")):s==="error"&&(this._autopilotAnalyzingShown=!1,this.setBusy(!1),this.updateAutopilotUi(!1),this.setStatus("Autopilot interrompido por erro.","error"))},onRequestAnalysis:async(s,l)=>{try{return await this.callbacks.onAnalyze(s,l)||null}catch{return null}},isManualModeActive:()=>this.floatingAnswers?.isOpen()??!1,onPageAdvance:()=>{this.floatingAnswers?.hide()}}),this.host=document.createElement("div"),this.host.id="easyquiz-shadow-root",this.host.style.position="fixed",this.host.style.top="0",this.host.style.left="0",this.host.style.width="100vw",this.host.style.height="100vh",this.host.style.zIndex="2147483647",this.host.style.pointerEvents="none",this.shadow=this.host.attachShadow({mode:"open"}),this.shadow.innerHTML=`
      <style>${Ot}</style>

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
                <span class="eq-brand-badge">SUPREME</span>
                <span id="eq-active-model-badge" style="display:none; font-size:9px; font-weight:700; padding:1px 5px; border-radius:3px; background:rgba(88,101,242,0.2); border:1px solid rgba(88,101,242,0.4); color:#7983f5; letter-spacing:0.04em; white-space:nowrap;"></span>
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
                  <div class="eq-section-title" id="eq-keys-section-header">
                    <span style="display:flex;align-items:center;gap:6px;">
                      <span id="eq-keys-chevron" style="display:inline-flex;transition:transform 0.2s;">${q.chevronRight}</span>
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
    `,this.launcherBtn=this.shadow.querySelector(".eq-launcher"),this.launcherDot=this.shadow.querySelector("#eq-launcher-dot"),this.dockToggleBtn=this.shadow.querySelector("#eq-dock-toggle"),this.sidebarEl=this.shadow.querySelector(".eq-sidebar"),this.apToggleBtn=this.shadow.querySelector("#eq-ap-toggle-btn"),this.apConsole=this.shadow.querySelector("#eq-ap-console"),this.executionConsole=this.shadow.querySelector("#eq-execution-console"),this.progressContainer=this.shadow.querySelector("#eq-progress-container"),this.progressBar=this.shadow.querySelector("#eq-progress-bar"),this.progressLabel=this.shadow.querySelector("#eq-progress-label"),this.progressVal=this.shadow.querySelector("#eq-progress-val"),this.contextTreeContainer=this.shadow.querySelector("#eq-tree-container"),this.dotPulseAp=this.shadow.querySelector("#eq-dot-ap"),this.statusTextAp=this.shadow.querySelector("#eq-status-text-ap"),this.stopwatchAp=this.shadow.querySelector("#eq-stopwatch-ap span"),this.dotPulseAdv=this.dotPulseAp,this.statusTextAdv=this.statusTextAp,this.stopwatchAdv=this.stopwatchAp,this.inspModel=this.shadow.querySelector("#eq-insp-model"),this.inspLatency=this.shadow.querySelector("#eq-insp-latency"),this.inspTokens=this.shadow.querySelector("#eq-insp-tokens"),this.inspPrompt=this.shadow.querySelector("#eq-insp-prompt"),this.inspRationale=this.shadow.querySelector("#eq-insp-rationale"),this.inspActions=this.shadow.querySelector("#eq-insp-actions"),this.copyPromptBtn=this.shadow.querySelector("#eq-copy-prompt-btn"),this.liveDebugTerminal=this.shadow.querySelector("#eq-live-debug-terminal"),this.dbgModel=this.shadow.querySelector("#eq-dbg-model"),this.dbgLatency=this.shadow.querySelector("#eq-dbg-latency"),this.dbgSplitTokens=this.shadow.querySelector("#eq-dbg-split-tokens"),this.dbgTotalTokens=this.shadow.querySelector("#eq-dbg-total-tokens"),this.dbgErrorCard=this.shadow.querySelector("#eq-dbg-error-card"),this.dbgErrorText=this.shadow.querySelector("#eq-dbg-error-text"),this.dbgPromptLen=this.shadow.querySelector("#eq-dbg-prompt-len"),this.dbgPromptView=this.shadow.querySelector("#eq-dbg-prompt-view"),this.dbgContextView=this.shadow.querySelector("#eq-dbg-context-view"),this.dbgRawRespView=this.shadow.querySelector("#eq-dbg-raw-resp-view"),this.dbgCountAll=this.shadow.querySelector("#eq-dbg-count-all"),this.dbgCountError=this.shadow.querySelector("#eq-dbg-count-error"),this.dbgCountAi=this.shadow.querySelector("#eq-dbg-count-ai"),this.dbgCountDom=this.shadow.querySelector("#eq-dbg-count-dom"),this.apiKeyInput=this.shadow.querySelector("#eq-api-key"),this.keyContextMenu=this.shadow.querySelector("#eq-key-context-menu"),this.keyMoreBtn=this.shadow.querySelector("#eq-key-more-btn"),this.keysListEl=this.shadow.querySelector("#eq-keys-list"),this.keysBadgeEl=this.shadow.querySelector("#eq-keys-badge"),this.modelSelect=this.shadow.querySelector("#eq-model-select"),this.modeSelect=this.shadow.querySelector("#eq-mode-select"),this.engineSelect=this.shadow.querySelector("#eq-engine-select"),this.dryRunCheckbox=this.shadow.querySelector("#eq-dry-run"),this.autoApplyCheckbox=this.shadow.querySelector("#eq-auto-apply"),this.autoAdvanceCheckbox=this.shadow.querySelector("#eq-auto-advance"),this.hostDarkModeCheckbox=this.shadow.querySelector("#eq-host-dark"),this.useVisionCheckbox=this.shadow.querySelector("#eq-use-vision"),this.analyzeBtn=this.shadow.querySelector("#eq-analyze-btn"),this.applyBtn=this.shadow.querySelector("#eq-apply-btn"),this.applyBtn.disabled=!0,this.resultContainer=this.shadow.querySelector("#eq-result"),this.floatingAnswers=new Oe(this.shadow,()=>{this.callbacks.onAnalyze(1)});let n=this.shadow.querySelector("#eq-open-hud-btn");n&&n.addEventListener("click",()=>{this.latestPlan&&this.floatingAnswers.show(this.latestPlan)}),le.filter(s=>R(s.id)).forEach(s=>this.modelSelect.add(new Option(s.name,s.id,!1,s.id===e.model))),xo.forEach(s=>this.modeSelect.add(new Option(s.label,s.value,!1,s.value===e.modeHint))),wo.forEach(s=>this.engineSelect.add(new Option(s.label,s.value,!1,s.value===e.engine))),this.apiKeyInput.value=e.apiKey,this.dryRunCheckbox.checked=e.dryRun,this.autoApplyCheckbox.checked=e.autoApply,this.autoAdvanceCheckbox.checked=e.autoAdvance,this.hostDarkModeCheckbox.checked=e.hostDarkMode,this.useVisionCheckbox.checked=e.useVision,this.metricsLiveTime=this.shadow.querySelector("#eq-metrics-live-time"),this.metricsLiveStatus=this.shadow.querySelector("#eq-metrics-live-status"),this.metricsTotalBadge=this.shadow.querySelector("#eq-metrics-total-badge"),this.metricTotalTime=this.shadow.querySelector("#eq-metric-total-time"),this.metricAvgTime=this.shadow.querySelector("#eq-metric-avg-time"),this.metricTotalCount=this.shadow.querySelector("#eq-metric-total-count"),this.metricsHistoryList=this.shadow.querySelector("#eq-metrics-history-list"),this.metricsHistoryCount=this.shadow.querySelector("#eq-metrics-history-count"),this.metricsCopyBtn=this.shadow.querySelector("#eq-metrics-copy-btn"),this.metricsResetBtn=this.shadow.querySelector("#eq-metrics-reset-btn"),this.setupEventListeners(),this.updateTimingMetrics(),document.body.appendChild(this.host),this.applyHostDarkMode(e.hostDarkMode);let i=Array.isArray(e.apiKeys)&&e.apiKeys.length>0?e.apiKeys:e.apiKey?[e.apiKey]:[];S.init(i),this.renderKeysList();let a=window.setInterval(()=>{this.activeTab==="settings"&&this.renderKeysList()},1e3);typeof a?.unref=="function"&&a.unref();let r=S.getBestKey()||e.apiKey;r&&He(r).then(s=>{s&&s.length>0&&this.updateModelSelect(s,e.model)}).catch(()=>{})}switchTab(e){this.activeTab=e;let t=["resolver","brain","metrics","debug","settings"];for(let n of t){let i=this.shadow.querySelector(`#eq-tab-${n}`),a=this.shadow.querySelector(`#eq-view-${n}`);n===e?(i?.classList.add("active"),a&&(a.style.display="flex")):(i?.classList.remove("active"),a&&(a.style.display="none"))}e==="brain"?(this.renderContextTree(),this.refreshInspectorView()):e==="metrics"?this.updateTimingMetrics():e==="debug"&&(this.refreshDebugView(),this.renderTerminalEntries())}setupEventListeners(){this.shadow.querySelector("#eq-tab-resolver")?.addEventListener("click",()=>this.switchTab("resolver")),this.shadow.querySelector("#eq-tab-brain")?.addEventListener("click",()=>this.switchTab("brain")),this.shadow.querySelector("#eq-tab-metrics")?.addEventListener("click",()=>this.switchTab("metrics")),this.shadow.querySelector("#eq-tab-debug")?.addEventListener("click",()=>this.switchTab("debug")),this.shadow.querySelector("#eq-tab-settings")?.addEventListener("click",()=>this.switchTab("settings")),this.metricsResetBtn?.addEventListener("click",()=>{ve(),this.stopQuestionTimer(0),this.currentQuestionStartTime=0,this.metricsLiveTime&&(this.metricsLiveTime.textContent="00:00.00"),this.metricsLiveStatus&&(this.metricsLiveStatus.textContent="Em espera",this.metricsLiveStatus.classList.remove("active")),this.updateTimingMetrics(),this.logToConsole("> [SYS] M\xE9tricas e hist\xF3rico de tempo zerados com sucesso.","text-yellow")}),this.metricsCopyBtn?.addEventListener("click",()=>{this.copyMetricsReport()}),this.shadow.querySelector("#eq-dbg-filter-all")?.addEventListener("click",()=>this.setLogFilter("all")),this.shadow.querySelector("#eq-dbg-filter-error")?.addEventListener("click",()=>this.setLogFilter("error")),this.shadow.querySelector("#eq-dbg-filter-ai")?.addEventListener("click",()=>this.setLogFilter("ai")),this.shadow.querySelector("#eq-dbg-filter-dom")?.addEventListener("click",()=>this.setLogFilter("dom"));let e=this.shadow.querySelector("#eq-dbg-scroll-toggle");e?.addEventListener("click",()=>{this.autoScrollLogs=!this.autoScrollLogs,e&&(e.style.color=this.autoScrollLogs?"#00ffcc":"#858585",e.title=this.autoScrollLogs?"Auto-Scroll Ligado (Clique para desligar)":"Auto-Scroll Desligado (Clique para ligar)"),this.autoScrollLogs&&this.liveDebugTerminal&&(this.liveDebugTerminal.scrollTop=this.liveDebugTerminal.scrollHeight)});let t=this.shadow.querySelector("#eq-dbg-copy-logs");t?.addEventListener("click",()=>{let u=this.getFormattedLogs();navigator.clipboard.writeText(u).then(()=>{let b=t.innerHTML;t.innerHTML=q.check,setTimeout(()=>t.innerHTML=b,1800)})}),this.shadow.querySelector("#eq-dbg-clear-logs")?.addEventListener("click",()=>{this.clearLogs()});let n=this.shadow.querySelector("#eq-dbg-copy-prompt");n?.addEventListener("click",()=>{let u=this.latestPromptText||this.latestPlan?.promptSent||"";navigator.clipboard.writeText(u).then(()=>{let b=n.innerHTML;n.innerHTML=`${q.check} Copiado!`,setTimeout(()=>n.innerHTML=b,1800)})});let i=this.shadow.querySelector("#eq-dbg-copy-context");i?.addEventListener("click",()=>{let u=this.dbgContextView?.textContent||"";navigator.clipboard.writeText(u).then(()=>{let b=i.innerHTML;i.innerHTML=`${q.check} Copiado!`,setTimeout(()=>i.innerHTML=b,1800)})});let a=this.shadow.querySelector("#eq-dbg-copy-raw-resp");a?.addEventListener("click",()=>{let u=this.latestPlan?.rawResponse||this.dbgRawRespView?.textContent||"";navigator.clipboard.writeText(u).then(()=>{let b=a.innerHTML;a.innerHTML=`${q.check} Copiado!`,setTimeout(()=>a.innerHTML=b,1800)})});let r=this.shadow.querySelector("#eq-dbg-copy-error-btn");r?.addEventListener("click",()=>{let u=this.lastErrorMsg||"";navigator.clipboard.writeText(u).then(()=>{let b=r.innerHTML;r.innerHTML=q.check,setTimeout(()=>r.innerHTML=b,1800)})}),this.shadow.querySelector("#eq-refresh-context-btn")?.addEventListener("click",()=>{this.renderContextTree()}),this.launcherBtn.addEventListener("click",()=>this.toggle()),this.dockToggleBtn.addEventListener("click",()=>this.toggle()),this.shadow.querySelector("#eq-min-btn")?.addEventListener("click",()=>this.toggle(!1)),this.shadow.querySelector("#eq-close-btn")?.addEventListener("click",()=>this.toggle(!1)),window.addEventListener("keydown",u=>{u.altKey&&(u.key==="q"||u.key==="Q")&&(u.preventDefault(),this.toggle())},!0);let s=u=>{let b=u.composedPath();(b.includes(this.sidebarEl)||b.includes(this.host))&&u.stopImmediatePropagation()};window.addEventListener("keydown",s,!0),window.addEventListener("keyup",s,!0),window.addEventListener("keypress",s,!0),this.apiKeyInput.addEventListener("input",()=>{let u=this.apiKeyInput.value.trim().replace(/^["']|["']$/g,"");this.callbacks.onSettingsChange({apiKey:u})});let l=this.shadow.querySelector("#eq-keys-collapsible"),c=this.shadow.querySelector("#eq-keys-chevron"),p=this.shadow.querySelector("#eq-keys-section-header"),h=u=>{l&&(u?(l.style.maxHeight="0px",c&&(c.style.transform="rotate(0deg)")):(l.style.maxHeight=l.scrollHeight+50+"px",c&&(c.style.transform="rotate(90deg)")))},d=!1;try{d=localStorage.getItem("easyquiz_keys_collapsed")==="true"}catch{}l&&(l.style.transition="none"),h(d);try{requestAnimationFrame(()=>{l&&(l.style.transition="max-height 0.25s ease")})}catch{}p?.addEventListener("click",()=>{let u=l?.style.maxHeight==="0px";h(u);try{localStorage.setItem("easyquiz_keys_collapsed",u?"false":"true")}catch{}}),this.shadow.querySelector("#eq-key-save").addEventListener("click",()=>{let u=this.apiKeyInput.value.trim().replace(/^["']|["']$/g,"");if(!u){this.setStatus("Insira o valor da chave antes de adicionar.","warning");return}let b=S.addKey(u);if(b.ok){let x=S.exportRawKeys();this.callbacks.onSettingsChange({apiKey:x[0],apiKeys:x}),this.apiKeyInput.value="",this.setStatus(`\u2713 Nova chave adicionada com sucesso! (${x.length} chaves ativas no pool)`,"success"),this.renderKeysList(),this.keyContextMenu.hidden=!0,Ie(u).then(w=>{w.ok?(S.markSuccess(u,100),this.setStatus("\u2713 Nova chave validada com sucesso no Google AI Studio!","success")):(S.markInvalid(u,w.message),this.setStatus(`\u26A0\uFE0F Chave cadastrada, mas aviso retornado: ${w.message}`,"warning")),this.renderKeysList()}).catch(()=>{})}else this.setStatus(b.message,"warning")}),this.keyMoreBtn.addEventListener("click",u=>{u.stopPropagation(),this.keyContextMenu.hidden=!this.keyContextMenu.hidden}),this.shadow.addEventListener("click",u=>{let b=u.target;!b.closest("#eq-key-context-menu")&&!b.closest("#eq-key-more-btn")&&(this.keyContextMenu.hidden=!0)}),this.shadow.querySelector("#eq-menu-prompt")?.addEventListener("click",()=>{this.keyContextMenu.hidden=!0;let u=window.prompt("Adicionar Nova Chave API do Google Gemini (AI Studio):");if(u!==null&&u.trim()){let b=u.trim().replace(/^["']|["']$/g,""),x=S.addKey(b);if(x.ok){let w=S.exportRawKeys();this.callbacks.onSettingsChange({apiKey:w[0],apiKeys:w}),this.setStatus("Chave Gemini adicionada com sucesso!","success"),this.renderKeysList()}else this.setStatus(x.message,"warning")}}),this.shadow.querySelector("#eq-menu-paste")?.addEventListener("click",async()=>{this.keyContextMenu.hidden=!0;try{let u=await navigator.clipboard.readText();if(u){let b=u.trim().replace(/^["']|["']$/g,"");this.apiKeyInput.value=b,this.setStatus('Chave colada no campo. Clique no bot\xE3o "+" para adicionar ao pool.',"info")}}catch{let u=window.prompt("Adicionar Nova Chave API do Google Gemini:");if(u!==null&&u.trim()){let b=u.trim().replace(/^["']|["']$/g,"");if(S.addKey(b).ok){let w=S.exportRawKeys();this.callbacks.onSettingsChange({apiKey:w[0],apiKeys:w}),this.setStatus("Chave Gemini adicionada com sucesso!","success"),this.renderKeysList()}}}}),this.shadow.querySelector("#eq-menu-toggle-vis")?.addEventListener("click",()=>{this.keyContextMenu.hidden=!0;let u=this.apiKeyInput.type==="password";this.apiKeyInput.type=u?"text":"password";let b=this.shadow.querySelector("#eq-menu-vis-icon"),x=this.shadow.querySelector("#eq-menu-vis-text");b&&(b.innerHTML=u?q.eyeOff:q.eye),x&&(x.textContent=u?"Ocultar Campo":"Mostrar Campo")}),this.shadow.querySelector("#eq-menu-clear")?.addEventListener("click",()=>{this.keyContextMenu.hidden=!0,this.apiKeyInput.value="",this.setStatus("Campo de inser\xE7\xE3o limpo.","info"),this.apiKeyInput.focus()}),this.shadow.querySelector("#eq-menu-test")?.addEventListener("click",async()=>{this.keyContextMenu.hidden=!0;let u=S.getAllKeys();if(u.length===0)return this.setStatus("Nenhuma chave cadastrada para testar.","error");this.setStatus(`Testando ${u.length} chave(s) no Google AI Studio...`,"info");let b=0;for(let x of u){let w=await Ie(x.key);w.ok?(b++,S.markSuccess(x.key,100)):S.markInvalid(x.key,w.message)}this.renderKeysList(),this.setStatus(`Teste conclu\xEDdo: ${b}/${u.length} chave(s) operando com sucesso!`,b>0?"success":"error")});let g=()=>{this.keyContextMenu.hidden=!0,window.confirm("Deseja realmente resetar todos os dados, chaves e mem\xF3ria de sess\xE3o do EasyQuiz?")&&(this.autopilot.isActive()&&this.autopilot.stop(),this.updateAutopilotUi(!1),this.setBusy(!1),gt(),ve(),this.stopQuestionTimer(0),this.currentQuestionStartTime=0,this.metricsLiveTime&&(this.metricsLiveTime.textContent="00:00.00"),this.metricsLiveStatus&&(this.metricsLiveStatus.textContent="Em espera",this.metricsLiveStatus.className="eq-live-stopwatch-status"),this.updateTimingMetrics(),this.apiKeyInput.value="",this.callbacks.onSettingsChange({apiKey:""}),this.setStatus("Todos os dados do EasyQuiz foram limpos.","info"),this.logToConsole("> [SYS] Armazenamento local resetado.","text-yellow"))};this.shadow.querySelector("#eq-menu-reset")?.addEventListener("click",g),this.shadow.querySelector("#eq-reset-all-btn")?.addEventListener("click",g),this.apToggleBtn.addEventListener("click",()=>{if(this.autopilot.isActive())this.autopilot.stop(),this.callbacks.onCancel?.(),this.setProgress(0),this.updateAutopilotUi(!1),this.setInterrupted("Autopilot interrompido imediatamente pelo usu\xE1rio.");else{if(!this.apiKeyInput.value.trim().replace(/^["']|["']$/g,"")){this.setStatus("Configure sua chave de API Gemini na aba Configura\xE7\xF5es antes de ligar o Autopilot.","error"),this.switchTab("settings"),this.apiKeyInput.focus();return}this.callbacks.onSettingsChange({autoApply:!0,autoAdvance:!0}),this.autoApplyCheckbox.checked=!0,this.autoAdvanceCheckbox.checked=!0,this.autopilot.start(),this.updateAutopilotUi(!0),this.startStopwatch(),this.setStatus("Autopilot ativo. Monitorando exerc\xEDcios...","info")}}),this.shadow.querySelector("#eq-ap-clear-memory").addEventListener("click",()=>{Ge(),this.logToConsole("> [SYS] Mem\xF3ria contextual limpa com sucesso.","text-green"),this.setStatus("Mem\xF3ria contextual da sess\xE3o limpa.","success")});let f=this.shadow.querySelector("#eq-copy-console-btn");f?.addEventListener("click",()=>{let u=this.apConsole?.innerText||"";navigator.clipboard.writeText(u).then(()=>{let b=f.innerHTML;f.innerHTML=q.check,setTimeout(()=>f.innerHTML=b,1800)})}),this.copyPromptBtn.addEventListener("click",()=>{let u=this.inspPrompt.textContent||"";navigator.clipboard.writeText(u).then(()=>{let b=this.copyPromptBtn.innerHTML;this.copyPromptBtn.innerHTML=`${q.check} Copiado!`,setTimeout(()=>this.copyPromptBtn.innerHTML=b,2e3)})}),this.modelSelect.addEventListener("change",()=>this.callbacks.onSettingsChange({model:this.modelSelect.value})),this.modeSelect.addEventListener("change",()=>this.callbacks.onSettingsChange({modeHint:this.modeSelect.value})),this.engineSelect.addEventListener("change",()=>this.callbacks.onSettingsChange({engine:this.engineSelect.value})),this.dryRunCheckbox.addEventListener("change",()=>this.callbacks.onSettingsChange({dryRun:this.dryRunCheckbox.checked})),this.autoApplyCheckbox.addEventListener("change",()=>this.callbacks.onSettingsChange({autoApply:this.autoApplyCheckbox.checked})),this.autoAdvanceCheckbox.addEventListener("change",()=>this.callbacks.onSettingsChange({autoAdvance:this.autoAdvanceCheckbox.checked})),this.useVisionCheckbox.addEventListener("change",()=>{let u=this.useVisionCheckbox.checked;this.callbacks.onSettingsChange({useVision:u}),this.setStatus(u?"Vis\xE3o Computacional ativada (capturas habilitadas).":"Modo DOM R\xE1pido ativado (capturas desabilitadas).","info")}),this.hostDarkModeCheckbox.addEventListener("change",()=>{let u=this.hostDarkModeCheckbox.checked;this.callbacks.onSettingsChange({hostDarkMode:u}),this.applyHostDarkMode(u)}),this.analyzeBtn.addEventListener("click",async()=>{if(this.isBusy){this.callbacks.onCancel?.(),this.setInterrupted("An\xE1lise cancelada pelo usu\xE1rio. Pronto para nova tentativa.");return}await this.callbacks.onAnalyze()&&!this.dryRunCheckbox.checked&&!this.autoApplyCheckbox.checked&&this.callbacks.onApply()}),this.applyBtn.addEventListener("click",()=>this.callbacks.onApply())}startStopwatch(){this.stopStopwatch(),this.stopwatchStartTime=Date.now();let e=()=>{let t=((Date.now()-this.stopwatchStartTime)/1e3).toFixed(2)+"s";this.stopwatchAp.textContent=t,this.stopwatchAdv.textContent=t};e(),this.stopwatchInterval=setInterval(e,100)}stopStopwatch(e){if(this.stopwatchInterval&&(clearInterval(this.stopwatchInterval),this.stopwatchInterval=null),e!==void 0){let t=(e/1e3).toFixed(2)+"s";this.stopwatchAp.textContent=t,this.stopwatchAdv.textContent=t}}setLogFilter(e){this.activeLogFilter=e;let t=["all","error","ai","dom"];for(let n of t){let i=this.shadow.querySelector(`#eq-dbg-filter-${n}`);n===e?i?.classList.add("active"):i?.classList.remove("active")}this.renderTerminalEntries()}updateLogCounters(){let e=0,t=0,n=0;for(let i of this.logEntries)i.category==="error"?e++:i.category==="ai"?t++:i.category==="dom"&&n++;this.dbgCountAll&&(this.dbgCountAll.textContent=String(this.logEntries.length)),this.dbgCountError&&(this.dbgCountError.textContent=String(e)),this.dbgCountAi&&(this.dbgCountAi.textContent=String(t)),this.dbgCountDom&&(this.dbgCountDom.textContent=String(n))}renderTerminalEntries(){if(!this.liveDebugTerminal)return;this.liveDebugTerminal.replaceChildren();let e=this.activeLogFilter==="all"?this.logEntries:this.logEntries.filter(t=>t.category===this.activeLogFilter);if(e.length===0){let t=document.createElement("div");t.className="text-muted",t.textContent=`Nenhum log encontrado para o filtro "${this.activeLogFilter.toUpperCase()}".`,this.liveDebugTerminal.appendChild(t);return}for(let t of e){let n=document.createElement("div");n.textContent=t.message,t.colorClass&&(n.className=t.colorClass),this.liveDebugTerminal.appendChild(n)}this.autoScrollLogs&&(this.liveDebugTerminal.scrollTop=this.liveDebugTerminal.scrollHeight)}clearLogs(){if(this.logEntries=[],this.updateLogCounters(),this.liveDebugTerminal){this.liveDebugTerminal.replaceChildren();let e=document.createElement("div");e.className="text-blue",e.textContent="> [SYS] Console de logs limpo pelo usu\xE1rio.",this.liveDebugTerminal.appendChild(e)}this.apConsole&&this.apConsole.replaceChildren(),this.executionConsole&&this.executionConsole.replaceChildren()}getFormattedLogs(){return(this.activeLogFilter==="all"?this.logEntries:this.logEntries.filter(t=>t.category===this.activeLogFilter)).map(t=>t.message).join(`
`)}setLastError(e){this.lastErrorMsg=e,this.dbgErrorCard&&this.dbgErrorText&&(this.dbgErrorText.textContent=e,this.dbgErrorCard.style.display="flex")}setErrorDiagnostic(e,t){let n=t?`[${t}] ${e}`:e;this.setLastError(n)}refreshDebugView(){let e=this.latestPlan,t=this.latestContext,n=this.latestPromptText||e?.promptSent||"";if(this.dbgModel&&(this.dbgModel.textContent=e?.usedModel||this.initialSettings.model||"--"),this.dbgLatency&&(this.dbgLatency.textContent=e?.durationMs?`${e.durationMs}ms`:"--"),this.dbgSplitTokens){let i=e?.promptTokens!==void 0?String(e.promptTokens):"--",a=e?.candidatesTokens!==void 0?String(e.candidatesTokens):"--";this.dbgSplitTokens.textContent=`${i} / ${a}`,this.dbgSplitTokens.title=`Prompt: ${i} tokens | Resposta: ${a} tokens`}if(this.dbgTotalTokens){let i=e?.tokensUsed??(e?.promptTokens&&e?.candidatesTokens?e.promptTokens+e.candidatesTokens:void 0);this.dbgTotalTokens.textContent=i!==void 0?`${i}`:"--"}if(this.dbgPromptLen){let i=n.length,a=Math.round(i/4);this.dbgPromptLen.textContent=`${i} chars (~${a} tokens est.)`}if(this.dbgPromptView&&(this.dbgPromptView.textContent=n||"Nenhum prompt enviado at\xE9 o momento."),this.dbgContextView)if(t){let i={scope:`${t.scope.tagName.toLowerCase()}${t.scope.id?"#"+t.scope.id:""}${t.scope.className?"."+t.scope.className.split(" ").join("."):""}`,questionLength:t.questionText.length,questionSnippet:t.questionText.slice(0,150)+(t.questionText.length>150?"...":""),controlsCount:t.controls.length,controls:t.controls.map((a,r)=>({index:r+1,tag:a.tag,type:a.type,name:a.name||void 0,id:a.id||void 0,value:a.value||void 0,label:a.label||void 0,role:a.role}))};this.dbgContextView.textContent=JSON.stringify(i,null,2)}else this.dbgContextView.textContent="Aguardando captura de contexto pelo EasyQuiz...";this.dbgRawRespView&&(e?e.rawResponse?this.dbgRawRespView.textContent=e.rawResponse:this.dbgRawRespView.textContent=JSON.stringify({pageType:e.pageType,mode:e.mode,confidence:e.confidence,rationale:e.rationale,actions:e.actions},null,2):this.dbgRawRespView.textContent="Aguardando retorno da API Gemini..."),this.lastErrorMsg&&this.dbgErrorCard&&this.dbgErrorText&&(this.dbgErrorText.textContent=this.lastErrorMsg,this.dbgErrorCard.style.display="flex")}logToConsole(e,t){let n=new Date,i=`${String(n.getHours()).padStart(2,"0")}:${String(n.getMinutes()).padStart(2,"0")}:${String(n.getSeconds()).padStart(2,"0")}.${String(Math.floor(n.getMilliseconds()/100))}`,a=e;e.startsWith(">")?a=`> [${i}] ${e.slice(1).trim()}`:a=`[${i}] ${e}`;let r="all";t==="text-red"||a.includes("[ERRO]")||a.includes("Falha")||a.includes("Error")?r="error":a.includes("[IA]")||a.includes("[RAG]")||a.includes("Tokens")||a.includes("Gemini")||a.includes("Modelo:")?r="ai":(a.includes("[DOM]")||a.includes("[EXEC]")||a.includes("[VERIF]")||a.includes("[NAV]"))&&(r="dom");let s={id:Date.now()+Math.random(),timestamp:i,message:a,colorClass:t,category:r};for(this.logEntries.push(s);this.logEntries.length>250;)this.logEntries.shift();if(this.updateLogCounters(),r==="error"&&this.setLastError(a),this.liveDebugTerminal&&(this.activeLogFilter==="all"||this.activeLogFilter===r)){let l=document.createElement("div");for(l.textContent=a,t&&(l.className=t),this.liveDebugTerminal.appendChild(l);this.liveDebugTerminal.children.length>250;)this.liveDebugTerminal.removeChild(this.liveDebugTerminal.firstChild);this.autoScrollLogs&&(this.liveDebugTerminal.scrollTop=this.liveDebugTerminal.scrollHeight)}if(this.apConsole){let l=document.createElement("div");for(l.textContent=a,t&&(l.className=t),this.apConsole.appendChild(l),this.apConsole.scrollTop=this.apConsole.scrollHeight;this.apConsole.children.length>150;)this.apConsole.removeChild(this.apConsole.firstChild)}if(this.executionConsole){let l=document.createElement("div");for(l.textContent=a,t&&(l.className=t),this.executionConsole.appendChild(l),this.executionConsole.scrollTop=this.executionConsole.scrollHeight;this.executionConsole.children.length>150;)this.executionConsole.removeChild(this.executionConsole.firstChild)}}setProgress(e,t){if(!this.progressContainer||!this.progressBar)return;if(e<=0){this.progressContainer.style.display="none",this.progressBar.style.width="0%";return}this.progressContainer.style.display="flex";let n=Math.min(100,Math.max(0,Math.round(e)));this.progressBar.style.width=`${n}%`,this.progressVal&&(this.progressVal.textContent=`${n}%`),t&&this.progressLabel&&(this.progressLabel.textContent=t),n>=100&&setTimeout(()=>{this.progressContainer&&this.progressBar&&this.progressBar.style.width==="100%"&&(this.progressContainer.style.display="none")},1500)}updateContext(e,t){this.latestContext=e,t&&(this.latestPlan=t),this.activeTab==="brain"?(this.renderContextTree(),t&&this.refreshInspectorView()):this.activeTab==="debug"&&this.refreshDebugView()}renderContextTree(){if(!this.contextTreeContainer)return;let e=this.latestContext,t=Me(),n=this.latestPlan;this.contextTreeContainer.innerHTML="";let i=this.createTreeFolder("\u{1F4C4} P\xC1GINA & ESCOPO ATUAL",!0,[{label:"T\xEDtulo",value:document.title||"Sem t\xEDtulo"},{label:"URL",value:window.location.pathname||"/"},{label:"Escopo DOM",value:e?`${e.scope.tagName.toLowerCase()}${e.scope.className?"."+e.scope.className.split(" ").join("."):""}`:"Document"},{label:"Tamanho Texto",value:e?`${e.questionText.length} caracteres`:"N\xE3o analisado"},{label:"Trecho Enunciado",value:e?`"${e.questionText.slice(0,120)}..."`:"Nenhum"}]);this.contextTreeContainer.appendChild(i);let a=e?e.controls:[],r=a.map((p,h)=>{let d=p.role==="navigation"||p.type==="button",m=!d&&p.value?` [val: "${p.value}"]`:"";return{label:`[#${h+1}] ${p.type.toUpperCase()}`,value:`${p.label||p.id||p.name||"(Sem r\xF3tulo)"}${m}`.trim(),badge:d?"Navega\xE7\xE3o":p.role||p.type}}),s=this.createTreeFolder(`\u{1F39B}\uFE0F CONTROLES DETECTADOS (${a.length})`,a.length>0,r);this.contextTreeContainer.appendChild(s);let l=t.map((p,h)=>({label:`Mem\xF3ria #${h+1}`,value:p,badge:"RAG"})),c=this.createTreeFolder(`\u{1F9E0} MEM\xD3RIA RAG ACUMULADA (${t.length})`,t.length>0,l);if(this.contextTreeContainer.appendChild(c),n){let p=this.createTreeFolder(`\u{1F916} \xDALTIMO PLANO IA (${n.actions.length} a\xE7\xF5es)`,!0,[{label:"Tipo P\xE1gina",value:n.pageType,badge:`${(n.confidence*100).toFixed(0)}%`},{label:"Modo",value:n.mode},{label:"Racioc\xEDnio",value:n.rationale||"N/A"},...n.actions.map((h,d)=>({label:`A\xE7\xE3o #${d+1} (${h.t})`,value:JSON.stringify(h)}))]);this.contextTreeContainer.appendChild(p)}}createTreeFolder(e,t,n){let i=document.createElement("div");i.className="eq-tree-node";let a=document.createElement("div");a.className="eq-tree-header",a.innerHTML=`<span class="eq-tree-arrow">${t?"\u25BC":"\u25B6"}</span> <span>${e}</span>`;let r=document.createElement("div");if(r.className="eq-tree-content",r.style.display=t?"flex":"none",n.length===0)r.innerHTML='<div class="text-muted" style="padding: 2px 0;">Nenhum item registrado.</div>';else for(let s of n){let l=document.createElement("div");l.className="eq-tree-leaf",l.innerHTML=`
          <strong style="color:#ffffff; min-width: 80px;">${s.label}:</strong>
          <span style="flex:1; word-break: break-word; color:#aaaaaa;">${s.value}</span>
          ${s.badge?`<span class="eq-tree-badge">${s.badge}</span>`:""}
        `,r.appendChild(l)}return a.addEventListener("click",()=>{let s=r.style.display==="none";r.style.display=s?"flex":"none";let l=a.querySelector(".eq-tree-arrow");l&&(l.textContent=s?"\u25BC":"\u25B6")}),i.appendChild(a),i.appendChild(r),i}toggle(e){e!==void 0?this.isCollapsed=!e:this.isCollapsed=!this.isCollapsed,this.isCollapsed?this.sidebarEl.classList.add("eq-collapsed"):(this.sidebarEl.classList.remove("eq-collapsed"),this.apiKeyInput.value||(this.switchTab("settings"),this.apiKeyInput.focus()))}updateAutopilotUi(e){e?(this.apToggleBtn.innerHTML=`${q.stop} PARAR AUTOPILOT`,this.apToggleBtn.classList.add("danger"),this.apToggleBtn.title="Interromper execu\xE7\xE3o cont\xEDnua do Autopilot"):(this.apToggleBtn.innerHTML=`${q.play} INICIAR AUTOPILOT`,this.apToggleBtn.classList.remove("danger"),this.apToggleBtn.title="Iniciar resolu\xE7\xE3o autom\xE1tica cont\xEDnua de quest\xF5es")}setOperationState(e,t){let n=this.shadow.querySelector("#eq-operation-state");n&&(n.textContent=e,n.className=`eq-operation-state is-${t}`)}setInterrupted(e="An\xE1lise interrompida pelo usu\xE1rio."){this.isBusy=!1,[this.modelSelect,this.modeSelect,this.engineSelect,this.dryRunCheckbox,this.autoApplyCheckbox,this.autoAdvanceCheckbox,this.useVisionCheckbox].forEach(t=>t.disabled=!1),this.analyzeBtn.disabled=!1,this.analyzeBtn.classList.remove("danger"),this.analyzeBtn.innerHTML=`${q.sparkles} Resolver com IA (Alt+R)`,this.analyzeBtn.title="Analisar e responder quest\xE3o ativa",this.applyBtn.disabled=!this.latestPlan||!this.latestPlan.actions.length,this.stopStopwatch(),this.stopQuestionTimer(),this.dotPulseAp.className="eq-dot-pulse stopped",this.dotPulseAdv.className="eq-dot-pulse stopped",this.launcherDot.className="eq-launcher-dot stopped",this.metricsLiveStatus&&(this.metricsLiveStatus.textContent="Interrompido",this.metricsLiveStatus.className="eq-live-stopwatch-status is-warning"),this.autopilot.isActive()||this.updateAutopilotUi(!1),this.setStatus(e,"warning")}setBusy(e,t){this.isBusy=e,[this.modelSelect,this.modeSelect,this.engineSelect,this.dryRunCheckbox,this.autoApplyCheckbox,this.autoAdvanceCheckbox,this.useVisionCheckbox].forEach(n=>n.disabled=e),e?(this.analyzeBtn.disabled=!1,this.analyzeBtn.classList.add("danger"),this.analyzeBtn.innerHTML=`${q.stop} Parar An\xE1lise`,this.analyzeBtn.title="Interromper e cancelar an\xE1lise em andamento",this.applyBtn.disabled=!0,this.startStopwatch(),this.startQuestionTimer(),this.dotPulseAp.className="eq-dot-pulse busy",this.dotPulseAdv.className="eq-dot-pulse busy",this.launcherDot.className="eq-launcher-dot busy",this.setOperationState("Analisando...","busy"),this.metricsLiveStatus&&(this.metricsLiveStatus.textContent="Calculando...",this.metricsLiveStatus.className="eq-live-stopwatch-status is-busy"),t&&this.setStatus(t,"info")):(this.analyzeBtn.disabled=!1,this.analyzeBtn.classList.remove("danger"),this.analyzeBtn.innerHTML=`${q.sparkles} Resolver com IA (Alt+R)`,this.analyzeBtn.title="Analisar e responder quest\xE3o ativa",this.applyBtn.disabled=!this.latestPlan||!this.latestPlan.actions.length,this.stopStopwatch(),this.stopQuestionTimer(),this.dotPulseAp.className="eq-dot-pulse",this.dotPulseAdv.className="eq-dot-pulse",this.launcherDot.className="eq-launcher-dot",this.setOperationState(this.autopilot.isActive()?"Monitorando":"Pronto","idle"),this.metricsLiveStatus&&this.metricsLiveStatus.textContent==="Calculando..."&&(this.metricsLiveStatus.textContent="Em espera",this.metricsLiveStatus.className="eq-live-stopwatch-status"))}setStatus(e,t="info"){this.statusTextAp.textContent=e,this.statusTextAdv.textContent=e,t==="error"?(this.setOperationState("Bloqueado","error"),this.dotPulseAp.className="eq-dot-pulse error",this.dotPulseAdv.className="eq-dot-pulse error",this.launcherDot.className="eq-launcher-dot error"):t==="warning"?(this.setOperationState("Interrompido","warning"),this.dotPulseAp.className="eq-dot-pulse stopped",this.dotPulseAdv.className="eq-dot-pulse stopped",this.launcherDot.className="eq-launcher-dot stopped"):t==="success"?(this.setOperationState("Confirmado","success"),this.dotPulseAp.className="eq-dot-pulse",this.dotPulseAdv.className="eq-dot-pulse",this.launcherDot.className="eq-launcher-dot"):this.isBusy?(this.setOperationState("Analisando...","busy"),this.dotPulseAp.className="eq-dot-pulse busy",this.dotPulseAdv.className="eq-dot-pulse busy",this.launcherDot.className="eq-launcher-dot busy"):(this.setOperationState(this.autopilot.isActive()?"Monitorando":"Pronto","info"),this.dotPulseAp.className="eq-dot-pulse",this.dotPulseAdv.className="eq-dot-pulse",this.launcherDot.className="eq-launcher-dot");let n=e.includes("Alternando")||e.includes("indispon\xEDvel")||e.includes("fallback")||e.includes("alternativo"),i=t==="error"?"> [ERRO] ":t==="success"?"> [SUCESSO] ":t==="warning"?"> [PARADO] ":n?"> [FALLBACK] ":"> [SYS] ",a=t==="error"?"text-red":t==="success"?"text-green":t==="warning"||n?"text-yellow":"text-blue";this.logToConsole(`${i}${e}`,a)}setPlan(e,t){if(this.latestPlan=e,this.resultContainer.style.display="flex",e.durationMs&&this.stopStopwatch(e.durationMs),e.usedModel){let l=this.shadow.querySelector("#eq-active-model-badge");if(l){let c=e.usedModel.replace("gemini-","").replace("-latest","");l.textContent=`\u25CF ${c}`,l.style.display="inline-block"}}let n=this.shadow.querySelector("#eq-badges");n.replaceChildren();let i=[e.mode.replace("_"," "),`${Math.round(e.confidence*100)}% Confian\xE7a`,`${e.actions.length} a\xE7\xF5es`,...e.usedModel?[e.usedModel]:[]];for(let l of i){let c=document.createElement("span");c.className="eq-brand-badge",c.textContent=l,n.appendChild(c)}let a=this.shadow.querySelector("#eq-rationale-text");a.textContent=e.rationale;let r=this.shadow.querySelector("#eq-actions-list");r.innerHTML="";for(let l of e.actions){let c=document.createElement("div");c.className="eq-action-item";let p="";l.t==="chk"?p=`chk ${l.id} (${l.c})`:l.t==="val"?p=`val "${l.v}" -> ${l.id}`:l.t==="sel"?p=`sel "${Array.isArray(l.v)?l.v.join(","):l.v}" -> ${l.id}`:l.t==="clk"?p=`clk ${l.id}`:l.t==="adv"?p="adv":l.t==="js"?p=`js: ${String(l.v).slice(0,40)}...`:l.t==="drag"&&(p=`drag "${l.from}" -> "${l.to}"`);let h=document.createElement("span");h.className="eq-action-badge",h.textContent=l.t.toUpperCase();let d=document.createElement("span");d.textContent=p,c.append(h,d),r.appendChild(c)}this.applyBtn.disabled=!t||!e.actions.length;let s=this.shadow.querySelector("#eq-execution-card");s&&(s.hidden=!0),this.refreshInspectorView(),this.refreshDebugView()}setExecutionReport(e){let t=this.shadow.querySelector("#eq-execution-card"),n=this.shadow.querySelector("#eq-execution-summary"),i=this.shadow.querySelector("#eq-execution-list");if(!t||!n||!i)return;t.hidden=!1,n.textContent=e.navigationVerified?`${e.verified}/${e.applied} a\xE7\xF5es verificadas. Navega\xE7\xE3o confirmada.`:`${e.verified}/${e.applied} a\xE7\xF5es verificadas. ${e.navigationEvidence}`,n.className=`eq-execution-summary ${e.success?"is-success":"is-warning"}`,i.replaceChildren();let a=this.shadow.querySelector("#eq-execution-placeholder");a&&(a.textContent=e.navigationVerified?"Fluxo conclu\xEDdo: aplica\xE7\xE3o e navega\xE7\xE3o confirmadas.":`Fluxo interrompido: ${e.navigationEvidence}`,a.className=`eq-execution-placeholder ${e.success?"is-success":"is-warning"}`);for(let r of e.reports){let s=document.createElement("div");s.className=`eq-execution-row ${r.verified?"is-success":"is-failed"}`;let l=document.createElement("span");l.className="eq-execution-state",l.textContent=r.verified?"OK":"FALHOU";let c=document.createElement("div");c.className="eq-execution-details";let p=document.createElement("strong");p.textContent=r.target;let h=document.createElement("span");if(h.textContent=`${r.strategy} | ${r.evidence}`,c.append(p,h),s.append(l,c),r.error){let d=document.createElement("small");d.textContent=r.error,s.appendChild(d)}i.appendChild(s)}}setInspectorPrompt(e,t){this.latestPromptText=e,this.inspPrompt&&(this.inspPrompt.textContent=e),t&&this.inspModel&&(this.inspModel.textContent=t),this.inspLatency&&(this.inspLatency.textContent="Aguardando IA..."),this.activeTab==="debug"&&this.refreshDebugView()}refreshInspectorView(){let e=this.latestPlan;if(e)if(this.inspModel.textContent=e.usedModel||this.initialSettings.model,this.inspLatency.textContent=e.durationMs?`${e.durationMs}ms`:"--",this.inspTokens.textContent=e.tokensUsed?`${e.tokensUsed}`:"--",this.inspPrompt.textContent=e.promptSent||this.latestPromptText||"Prompt n\xE3o registrado para esta requisi\xE7\xE3o.",this.inspRationale.textContent=e.rationale,this.inspActions.innerHTML="",e.actions.length>0)for(let t of e.actions){let n=document.createElement("div");n.className="eq-action-item",n.textContent=JSON.stringify(t),this.inspActions.appendChild(n)}else this.inspActions.innerHTML='<div class="text-muted" style="padding: 4px;">Nenhuma a\xE7\xE3o prescrita pela IA.</div>';else this.latestPromptText&&(this.inspPrompt.textContent=this.latestPromptText)}showFloatingAnswers(e){let t=e||this.latestPlan;t&&this.floatingAnswers.show(t)}hideFloatingAnswers(){this.floatingAnswers.hide()}renderKeysList(){if(!this.keysListEl)return;let e=S.getAllKeys();if(this.keysBadgeEl){let n=e.filter(r=>!r.isCooldown).length,i=e.reduce((r,s)=>r+(s.winCount||0),0),a=n>=3?" \u26A1 TURBO":"";this.keysBadgeEl.textContent=`${e.length} chave${e.length>1?"s":""} (${n} pronta${n!==1?"s":""})${a}`,this.keysBadgeEl.className=`eq-key-badge ${n>=3?"racing":n>0?"ready":"cooldown"}`}this.keysListEl.replaceChildren();try{requestAnimationFrame(()=>{let n=this.shadow?.querySelector("#eq-keys-collapsible");n&&n.style.maxHeight!=="0px"&&(n.style.maxHeight=n.scrollHeight+50+"px")})}catch{}[...e].sort((n,i)=>{let a=n.winCount||0,r=i.winCount||0;if(a!==r)return r-a;let s=n.lastLatencyMs||99999,l=i.lastLatencyMs||99999;if(s!==l)return s-l;let c=n.isCooldown?1:0,p=i.isCooldown?1:0;return c-p}).forEach((n,i)=>{let a=e.findIndex(u=>u.id===n.id),r=a>=0?a:i,s=document.createElement("div");s.className="eq-key-item";let l=document.createElement("div");l.className="eq-key-info";let c=document.createElement("span");c.className="eq-key-label",c.textContent=n.label||`Chave ${r+1}`;let p=document.createElement("span");p.className="eq-key-masked",p.textContent=j.maskKey(n.key),p.title="Clique para copiar a chave",p.style.cursor="pointer",p.addEventListener("click",()=>{navigator.clipboard?.writeText(n.key),this.setStatus(`Chave ${r+1} copiada para a \xE1rea de transfer\xEAncia!`,"info")});let h=document.createElement("span");if(n.isCooldown){h.className="eq-key-badge cooldown";let u=Math.ceil(n.remainingCooldownMs/1e3);h.textContent=`\u23F1 Cooldown (${u}s)`}else n.lastError&&n.errorCount&&n.errorCount>3?(h.className="eq-key-badge invalid",h.textContent="Erro",h.title=n.lastError):n.lastLatencyMs?(h.className="eq-key-badge ready",h.textContent=`Pronta (${n.lastLatencyMs}ms)`):(h.className="eq-key-badge ready",h.textContent="Pronta");l.appendChild(c),l.appendChild(p),l.appendChild(h);let d=n.winCount||0;if(d>0){let u=document.createElement("span");u.className="eq-key-badge winner",u.textContent=`\u{1F3C6} ${d} vit\xF3ria${d>1?"s":""}`,u.title=`Esta chave foi a mais r\xE1pida ${d} vez${d>1?"es":""} nas corridas paralelas`,l.appendChild(u)}let m=document.createElement("div");m.className="eq-key-actions";let g=document.createElement("button");g.className="eq-icon-btn",g.type="button",g.title="Testar esta chave",g.innerHTML=q.sparkles,g.addEventListener("click",async()=>{this.setStatus(`Testando chave ${n.label||r+1}...`,"info");let u=await Ie(n.key);u.ok?(S.markSuccess(n.key,120),this.setStatus(`\u2713 ${n.label||`Chave ${r+1}`}: Conex\xE3o com Google Gemini aprovada!`,"success")):(S.markInvalid(n.key,u.message),this.setStatus(`\u26A0\uFE0F ${n.label||`Chave ${r+1}`}: ${u.message}`,"error")),this.renderKeysList()});let v=document.createElement("button");v.className="eq-icon-btn",v.type="button",v.title="Editar chave",v.innerHTML=q.edit,v.addEventListener("click",()=>{let u=window.prompt(`Editar ${n.label||`Chave ${r+1}`}:`,n.key);if(u!==null&&u.trim()){let b=S.updateKey(n.id,u.trim());if(b.ok){let x=S.exportRawKeys();this.callbacks.onSettingsChange({apiKey:x[0],apiKeys:x}),this.setStatus(`Chave ${r+1} atualizada com sucesso!`,"success"),this.renderKeysList()}else this.setStatus(b.message,"warning")}});let f=document.createElement("button");f.className="eq-icon-btn",f.type="button",f.title="Remover chave",f.innerHTML=q.trash,e.length<=1?(f.disabled=!0,f.style.opacity="0.3",f.title="Voc\xEA precisa manter pelo menos 1 chave cadastrada."):f.addEventListener("click",()=>{if(confirm(`Remover permanentemente a ${n.label||`Chave ${r+1}`}?`)){let u=S.removeKey(n.id);if(u.ok){let b=S.exportRawKeys();this.callbacks.onSettingsChange({apiKey:b[0],apiKeys:b}),this.setStatus("Chave removida com sucesso.","info"),this.renderKeysList()}else this.setStatus(u.message,"warning")}}),m.appendChild(g),m.appendChild(v),m.appendChild(f),s.appendChild(l),s.appendChild(m),this.keysListEl.appendChild(s)})}updateModelSelect(e,t){let n=e.filter(r=>R(r.id)),i=t&&R(t)?t:R(this.initialSettings.model)?this.initialSettings.model:"gemini-2.5-flash";this.modelSelect.innerHTML="";let a=!1;n.forEach(r=>{let s=r.id===i;s&&(a=!0),this.modelSelect.add(new Option(r.name,r.id,!1,s))}),!a&&i&&R(i)&&this.modelSelect.add(new Option(`Gemini (${i})`,i,!1,!0)),this.modelSelect.value=i}updateSelectedModel(e){if(!R(e))return;Array.from(this.modelSelect.options).some(n=>n.value===e)||this.modelSelect.add(new Option(`Gemini (${e})`,e,!1,!0)),this.modelSelect.value=e}applyHostDarkMode(e){document.getElementById("eq-host-dark-mode-style")?.remove(),this.host.classList.toggle("eq-dark-mode-active",e)}startQuestionTimer(){this.currentQuestionStartTime=Date.now(),this.questionLiveTimerInterval&&clearInterval(this.questionLiveTimerInterval),this.metricsLiveStatus&&(this.metricsLiveStatus.textContent="Calculando...",this.metricsLiveStatus.classList.add("active"));let e=()=>{if(!this.metricsLiveTime)return;let t=Date.now()-this.currentQuestionStartTime,n=Math.floor(t/6e4),i=Math.floor(t%6e4/1e3),a=Math.floor(t%1e3/10);this.metricsLiveTime.textContent=`${String(n).padStart(2,"0")}:${String(i).padStart(2,"0")}.${String(a).padStart(2,"0")}`};e(),this.questionLiveTimerInterval=setInterval(e,50)}stopQuestionTimer(e){if(this.questionLiveTimerInterval&&(clearInterval(this.questionLiveTimerInterval),this.questionLiveTimerInterval=null),this.metricsLiveStatus&&(this.metricsLiveStatus.textContent="Parado",this.metricsLiveStatus.classList.remove("active")),this.metricsLiveTime&&this.currentQuestionStartTime>0){let t=e!==void 0?e:Math.max(0,Date.now()-this.currentQuestionStartTime),n=Math.floor(t/6e4),i=Math.floor(t%6e4/1e3),a=Math.floor(t%1e3/10);this.metricsLiveTime.textContent=`${String(n).padStart(2,"0")}:${String(i).padStart(2,"0")}.${String(a).padStart(2,"0")}`}}updateTimingMetrics(e){let t=e||re();if(!this.metricTotalTime)return;let n=Math.floor(t.totalElapsedMs/1e3),i=Math.floor(n/60),a=n%60;this.metricTotalTime.textContent=`${String(i).padStart(2,"0")}:${String(a).padStart(2,"0")}`;let r=(t.averageDurationMs/1e3).toFixed(1);this.metricAvgTime.textContent=`${r}s`,this.metricTotalCount.textContent=String(t.completedQuestionsCount),this.metricsTotalBadge&&(this.metricsTotalBadge.textContent=`${t.completedQuestionsCount} Quest\xE3o(\xF5es)`),this.metricsHistoryCount&&(this.metricsHistoryCount.textContent=`${t.records.length} registros`),this.renderMetricsHistory(t.records)}renderMetricsHistory(e){if(!this.metricsHistoryList)return;if(e.length===0){this.metricsHistoryList.innerHTML='<div class="eq-metrics-empty">Nenhuma quest\xE3o respondida nesta sess\xE3o ainda.</div>';return}this.metricsHistoryList.innerHTML="";let t=[...e].reverse();for(let n of t){let i=document.createElement("div");i.className="eq-metrics-item";let a=document.createElement("div");a.className="eq-metrics-item-left";let r=document.createElement("span");r.className="eq-metrics-badge",r.textContent=`Q${n.questionIndex}`;let s=document.createElement("div");s.className="eq-metrics-item-info";let l=document.createElement("div");l.className="eq-metrics-item-title",l.textContent=n.questionTitle||`Quest\xE3o ${n.questionIndex}`;let c=document.createElement("div");c.className="eq-metrics-item-meta";let p=new Date(n.timestamp).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit",second:"2-digit"}),h=n.mode?n.mode.replace("_"," "):"auto";c.textContent=`${p} \u2022 Modo: ${h}${n.actionsCount?` \u2022 ${n.actionsCount} a\xE7\xE3o(\xF5es)`:""}`,s.appendChild(l),s.appendChild(c),a.appendChild(r),a.appendChild(s);let d=document.createElement("div");d.className="eq-metrics-item-right";let m=document.createElement("span");m.className="eq-metrics-item-dur",m.textContent=`${(n.durationMs/1e3).toFixed(2)}s`;let g=document.createElement("span");g.className=`eq-metrics-item-status is-${n.status}`,g.textContent=n.status==="verified"||n.status==="answered"?"\u2713 Injetado":n.status==="manual"?"Gabarito":"Pendente",d.appendChild(m),d.appendChild(g),i.appendChild(a),i.appendChild(d),this.metricsHistoryList.appendChild(i)}}copyMetricsReport(){let e=re(),t=[];t.push("# Relat\xF3rio de Desempenho e Tempo \u2014 EasyQuiz"),t.push(`- **Quest\xF5es Respondidas:** ${e.completedQuestionsCount}`),t.push(`- **Tempo Total:** ${(e.totalElapsedMs/1e3).toFixed(1)}s`),t.push(`- **Tempo M\xE9dio por Quest\xE3o:** ${(e.averageDurationMs/1e3).toFixed(2)}s`),t.push(""),t.push("### Hist\xF3rico:"),e.records.length===0?t.push("_Nenhum registro ainda._"):e.records.forEach((n,i)=>{t.push(`${i+1}. **${n.questionTitle||`Q${n.questionIndex}`}**: ${(n.durationMs/1e3).toFixed(2)}s (${n.status})`)}),navigator.clipboard.writeText(t.join(`
`)).then(()=>{if(this.metricsCopyBtn){let n=this.metricsCopyBtn.innerHTML;this.metricsCopyBtn.innerHTML="\u2713 Copiado!",setTimeout(()=>{this.metricsCopyBtn.innerHTML=n},1500)}})}destroy(){this.stopStopwatch(),this.stopQuestionTimer(),this.autopilot.stop(),this.applyHostDarkMode(!1),this.callbacks.onDestroy(),this.host.remove()}};function qo(){try{if(typeof document>"u"||!document.head||document.querySelector("link[data-easyquiz-preconnect]"))return;let o=document.createElement("link");o.rel="preconnect",o.href="https://generativelanguage.googleapis.com",o.crossOrigin="anonymous",o.setAttribute("data-easyquiz-preconnect","true"),document.head.appendChild(o);let e=document.createElement("link");e.rel="dns-prefetch",e.href="https://generativelanguage.googleapis.com",e.setAttribute("data-easyquiz-preconnect","true"),document.head.appendChild(e)}catch{}}async function Eo(){let o=window;if(ve(),qo(),o.__easyquiz){o.__easyquiz.toggle();return}let e=Ke(),t=null,n=null,i=0,a=new Ve(e,{onAnalyze:(l=1,c)=>r(l,c),onApply:(l=1)=>void s(l),onDestroy:()=>{if(n){try{n.abort()}catch{}n=null}ie(),delete o.__easyquiz},onCancel:()=>{if(n){try{n.abort()}catch{}n=null}ie(),a.setProgress(0),a.setInterrupted("Opera\xE7\xE3o cancelada imediatamente pelo usu\xE1rio.")},onSettingsChange:l=>{e=ft(l)}});o.__easyquiz={toggle:()=>a.toggle(),destroy:()=>a.destroy(),analyze:async()=>{await r()}},window.addEventListener("keydown",l=>{if(l.altKey&&(l.key==="q"||l.key==="Q")){if(l.preventDefault(),!a)return;a.toggle(!0),r()}});async function r(l=1,c){if(!e.apiKey){a.setStatus("Configure sua chave de API Gemini acima para come\xE7ar.","error"),a.toggle(!0);return}if(n)try{n.abort()}catch{}n=new AbortController;let p=n,h=()=>{try{p.abort()}catch{}};if(c&&(c.aborted?p.abort():c.addEventListener("abort",h,{once:!0})),p.signal.aborted){a.setBusy(!1),a.setProgress(0);return}i=Date.now(),a.setBusy(!0,"Identificando o bloco da quest\xE3o ativa na p\xE1gina..."),a.setProgress(20,"Varrendo escopo do DOM e controles..."),ie(),a.hideFloatingAnswers();try{let d=Ee(!1);d||(a.setStatus("Nenhum controle detectado. Tentando captura de tela inteira...","info"),d=ue()),lt(d.scope),a.updateContext(d),a.logToConsole(`> [DOM] Escopo: <${d.scope.tagName.toLowerCase()}> com ${d.controls.length} controle(s) e ${d.questionText.length} caracteres.`,"text-blue"),a.setStatus(`Quest\xE3o localizada (${d.controls.length} controles). Preparando an\xE1lise...`,"info"),a.setProgress(40,`Consultando Gemini (${e.model})...`);let m=await pt(d.scope,e.useVision);if(m.length>0){let b=m.map(x=>x.element).filter(Boolean);rt(b)}if(p.signal.aborted)return;a.setStatus(m.length>0?`Consultando Gemini (${e.model}) com ${m.length} imagem(ns) anexada(s)...`:`Consultando Gemini (${e.model}) via DOM nativo (modo r\xE1pido)...`,"info");let g=ye(d,m,e);a.setInspectorPrompt(g,e.model);let v=(b,x)=>{a.setStatus(b,x==="warning"?"info":x)},{plan:f,usedModel:u}=await Ye(d,m,e,v,p.signal);if(p.signal.aborted)return;if(f.needsMoreContext){if(a.setProgress(55,"Ampliando escopo da quest\xE3o..."),a.setStatus("Enunciado ou contexto isolado detectado pela IA. Acionando Sele\xE7\xE3o Geral Expandida...","info"),a.logToConsole("> [DOM] Enunciado isolado. Ampliando escopo para sele\xE7\xE3o expandida...","text-blue"),d=Ee(!0),d||(d=ue()),lt(d.scope),a.updateContext(d),m=await pt(d.scope,e.useVision),m.length>0){let w=m.map(A=>A.element).filter(Boolean);rt(w)}a.setStatus(`Reconsultando IA com escopo ampliado (${d.controls.length} controles)...`,"info");let b=ye(d,m,e);a.setInspectorPrompt(b,e.model),f=(await Ye(d,m,e,v,p.signal)).plan}return p.signal.aborted||(a.setProgress(70,"Resposta recebida da IA! Processando plano..."),a.logToConsole(`> [IA] Modelo: ${u||e.model} | Modo: ${f.mode} | Confian\xE7a: ${(f.confidence*100).toFixed(0)}%`,"text-green"),f.rationale&&a.logToConsole(`> [IA] Racioc\xEDnio: "${f.rationale}"`,"text-blue"),a.logToConsole(`> [IA] ${f.actions.length} a\xE7\xE3o(\xF5es) prescritas no plano.`,"text-blue"),f.memoryToStore&&(bt(f.memoryToStore),a.logToConsole(`> [RAG] \u{1F9E0} Nova mem\xF3ria te\xF3rica salva na sess\xE3o: "${f.memoryToStore}"`,"text-yellow")),t=f,a.updateContext(d,f),Dt(f.actions,f.confidence),a.setPlan(f,!e.dryRun),f.pageType==="conclusion"?(a.setProgress(100,"Atividade conclu\xEDda!"),a.setStatus("Atividade conclu\xEDda ou tela final detectada pela IA.","success")):f.pageType==="info"?(a.setProgress(100,"Contexto absorvido na mem\xF3ria!"),a.setStatus("\u{1F4D8} Conte\xFAdo de contexto absorvido na mem\xF3ria RAG. Avan\xE7ando...","success")):f.pageType==="start"?(a.setProgress(100,"In\xEDcio detectado!"),a.setStatus("In\xEDcio de atividade detectado. Iniciando...","info")):(a.setProgress(80,"Plano de resolu\xE7\xE3o pronto!"),a.setStatus(e.dryRun?"Simula\xE7\xE3o conclu\xEDda. As respostas foram real\xE7adas na p\xE1gina sem altera\xE7\xE3o.":"Resolu\xE7\xE3o pronta! Verifique o realce na tela e aplique quando desejar.","success")),e.dryRun&&f.pageType==="question"&&a.showFloatingAnswers(f),p.signal.aborted)?void 0:(e.autoApply&&!e.dryRun&&await s(l,p.signal),f)}catch(d){if(p.signal.aborted||d instanceof Error&&(d.name==="AbortError"||d.message.includes("cancelada"))){ie(),a.setProgress(0),a.setInterrupted("Opera\xE7\xE3o cancelada pelo usu\xE1rio.");return}ie(),a.setProgress(0);let m=d instanceof Error?d.message:"Falha desconhecida na an\xE1lise.";a.setStatus(m,"error"),a.setErrorDiagnostic(m,"An\xE1lise da IA");return}finally{c?.removeEventListener("abort",h),n===p&&(n=null),p.signal.aborted||a.setBusy(!1)}}async function s(l=1,c){if(c?.aborted)return;if(!t){a.setStatus("Nenhum plano dispon\xEDvel para aplicar. Execute a an\xE1lise primeiro.","error");return}if(e.dryRun){a.setStatus("O modo de simula\xE7\xE3o est\xE1 ativo. Desmarque para poder aplicar.","error");return}let p=t.pageType==="info"||t.pageType==="start",h=(e.autoAdvance||p)&&t.confidence>=e.confidenceThreshold&&!t.needsMoreContext;a.setBusy(!0,"Aplicando respostas no formul\xE1rio..."),a.setProgress(85,`Aplicando ${t.actions.length} a\xE7\xE3o(\xF5es) no formul\xE1rio...`),a.logToConsole(`> [EXEC] Iniciando aplica\xE7\xE3o com 6 vias de persist\xEAncia para ${t.actions.length} a\xE7\xE3o(\xF5es)...`,"text-blue");try{let d=await at(t,h,l,we(e));if(c?.aborted)return;a.setExecutionReport(d);let m=i>0?Date.now()-i:1200,g=t.actions.filter(u=>u.t!=="adv"&&u.t!=="js").length;if(t.pageType==="question"||g>0?d.success||d.applied>0&&d.failed.length===0:d.success||d.advanced){a.setProgress(100,"Sucesso! Respostas preenchidas e validadas!"),a.logToConsole(`> [VERIF] \u2713 Sucesso no DOM: ${d.verified}/${d.applied} a\xE7\xF5es validadas com sucesso!`,"text-green"),d.advanced?a.logToConsole("> [NAV] \u2713 Bot\xE3o de confirma\xE7\xE3o/avan\xE7o acionado com sucesso!","text-green"):h&&a.logToConsole(`> [NAV] \u26A0\uFE0F ${d.navigationEvidence}`,"text-yellow"),a.setStatus(d.advanced?`Sucesso: ${d.applied} resposta(s) preenchida(s) e pr\xF3xima quest\xE3o confirmada.`:`Respostas preenchidas e validadas. Avan\xE7o n\xE3o confirmado: ${d.navigationEvidence}`,d.advanced||!h?"success":"info"),a.hideFloatingAnswers();let u=Fe({id:`q-${Date.now()}`,questionIndex:(re().records.length||0)+1,questionTitle:t.rationale?t.rationale.slice(0,45)+"...":`Quest\xE3o ${t.mode||"Auto"}`,durationMs:m,status:"verified",mode:t.mode,actionsCount:d.applied});a.updateTimingMetrics(u)}else{a.setProgress(0,"Inje\xE7\xE3o direta restrita. Gabarito r\xE1pido exibido.");let u=d.failed.length>0?d.failed.join(", "):"alvos pendentes";a.logToConsole(`> [VERIF] Alerta: ${d.verified}/${d.applied} a\xE7\xF5es verificadas no DOM. Pend\xEAncias: ${u}.`,"text-yellow"),a.logToConsole("> [GABARITO] Inje\xE7\xE3o direta restrita pela p\xE1gina. Gabarito r\xE1pido exibido na tela; o Autopilot aguarda voc\xEA marcar e avan\xE7ar.","text-yellow"),a.setStatus("Inje\xE7\xE3o restrita pela p\xE1gina. Gabarito direto exibido na tela para voc\xEA avan\xE7ar.","info"),a.showFloatingAnswers(t);let b=Fe({id:`q-${Date.now()}`,questionIndex:(re().records.length||0)+1,questionTitle:t.rationale?t.rationale.slice(0,45)+"...":`Quest\xE3o ${t.mode||"Auto"}`,durationMs:m,status:"manual",mode:t.mode,actionsCount:0});a.updateTimingMetrics(b)}}catch(d){a.setProgress(0);let m=d instanceof Error?d.message:"Falha ao aplicar plano.";a.setStatus("Inje\xE7\xE3o restrita pela p\xE1gina. Gabarito direto exibido na tela para voc\xEA avan\xE7ar.","info"),a.logToConsole(`> [ERRO] ${m}`,"text-red"),t&&a.showFloatingAnswers(t)}finally{a.setBusy(!1)}}a.toggle(!0)}Eo().catch(o=>{console.error("[EasyQuiz] Erro fatal na inicializa\xE7\xE3o:",o),window.alert(`EasyQuiz: falha ao iniciar: ${o instanceof Error?o.message:String(o)}`)});})();
