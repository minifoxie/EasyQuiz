// ==UserScript==
// @name         EasyQuiz Pro
// @namespace    https://github.com/minifoxie/EasyQuiz
// @version      3.8.8
// @description  Resolução inteligente e preenchimento de questões e formulários com IA
// @author       minifoxie
// @match        *://*/*
// @updateURL    https://raw.githubusercontent.com/minifoxie/EasyQuiz/main/dist/easyquiz.user.js
// @downloadURL  https://raw.githubusercontent.com/minifoxie/EasyQuiz/main/dist/easyquiz.user.js
// @grant        none
// @run-at       document-idle
// ==/UserScript==

/* EasyQuiz v3.8.8 (873b6bc) — Resolução inteligente de quizzes sem servidor
 * GitHub: https://github.com/minifoxie/EasyQuiz
 * 100% Client-side. Direct Google Gemini REST API.
 */
"use strict";(()=>{var ae={apiKey:"",apiKeys:[],model:"gemini-3.8-flash",uiMode:"easy",modeHint:"",engine:"smart",dryRun:!1,autoApply:!0,autoAdvance:!1,hostDarkMode:!0,useVision:!0,confidenceThreshold:.8,toastStacking:!0,theme:"mega-black",panelOpacity:.65,borderRadius:"none",glowEffects:!1,highlightColor:"#ffd600",languageHint:"auto",maxRetries:2,showTokenUsage:!0,autoScrollLogs:!0,compactMode:!1,enableSoundFeedback:!1};function ce(o){if(!o||typeof o!="string")return!1;let e=o.toLowerCase().trim().replace(/^models\//,"");if(!e.includes("gemini"))return!1;let t=["imagen","image","veo","omni","video","embedding","embed","tts","audio","speech","voice","sound","live","transcribe","bidi","aqa","learnlm","deep-research","computer-use","robotics","rt-1","rt-2","mediapipe","cyber","-ultra","experimental"];if(e==="gemini-flash-latest")return!0;for(let a of t)if(e.includes(a))return!1;return!(!e.includes("flash")&&!e.includes("pro"))}var Pt="easyquiz_settings_v2",Re="easyquiz_activity_metrics";function zt(){try{let o=localStorage.getItem(Pt);if(!o){let r=localStorage.getItem("easyquiz_settings_v1");if(r){let n=JSON.parse(r);return{...ae,apiKey:n.apiKey||""}}return{...ae}}let e=JSON.parse(o),t=typeof e.model=="string"&&ce(e.model)?e.model:ae.model,a=Array.isArray(e.apiKeys)?e.apiKeys.map(r=>typeof r=="string"?r.trim().replace(/^["']|["']$/g,""):"").filter(r=>r.length>5):[],i=typeof e.apiKey=="string"?e.apiKey.trim().replace(/^["']|["']$/g,""):"";if(a.length===0&&i&&(a=[i]),a.length===0)try{let r=localStorage.getItem("easyquiz_api_keys");if(r){let n=JSON.parse(r);Array.isArray(n)&&(a=n.filter(d=>typeof d=="string"&&d.trim().length>5))}}catch{}return{apiKey:a[0]||i||ae.apiKey,apiKeys:a,model:t,uiMode:e.uiMode==="easy"||e.uiMode==="advanced"?e.uiMode:ae.uiMode,modeHint:e.modeHint??"",engine:e.engine??"smart",dryRun:!!e.dryRun,autoApply:e.autoApply!==void 0?!!e.autoApply:!0,autoAdvance:!!e.autoAdvance,hostDarkMode:e.hostDarkMode!==void 0?!!e.hostDarkMode:!0,useVision:e.useVision!==void 0?!!e.useVision:ae.useVision,confidenceThreshold:typeof e.confidenceThreshold=="number"?e.confidenceThreshold:ae.confidenceThreshold,toastStacking:e.toastStacking!==void 0?!!e.toastStacking:ae.toastStacking,theme:["mega-black","dark","purple-neon","gray-blue","light"].includes(e.theme)?e.theme:ae.theme,panelOpacity:typeof e.panelOpacity=="number"?e.panelOpacity:ae.panelOpacity,borderRadius:["none","soft","rounded"].includes(e.borderRadius)?e.borderRadius:ae.borderRadius,glowEffects:e.glowEffects!==void 0?!!e.glowEffects:ae.glowEffects,highlightColor:typeof e.highlightColor=="string"?e.highlightColor:ae.highlightColor,languageHint:typeof e.languageHint=="string"?e.languageHint:ae.languageHint,maxRetries:typeof e.maxRetries=="number"?e.maxRetries:ae.maxRetries,showTokenUsage:e.showTokenUsage!==void 0?!!e.showTokenUsage:ae.showTokenUsage,autoScrollLogs:e.autoScrollLogs!==void 0?!!e.autoScrollLogs:ae.autoScrollLogs,compactMode:e.compactMode!==void 0?!!e.compactMode:ae.compactMode,enableSoundFeedback:e.enableSoundFeedback!==void 0?!!e.enableSoundFeedback:ae.enableSoundFeedback}}catch{return{...ae}}}function io(){try{localStorage.removeItem(Pt),localStorage.removeItem("easyquiz_settings_v1"),localStorage.removeItem(Re),sessionStorage.removeItem(Re);let o=[];for(let e=0;e<localStorage.length;e++){let t=localStorage.key(e);t&&(t.startsWith("eq_")||t.startsWith("easyquiz_"))&&o.push(t)}o.forEach(e=>localStorage.removeItem(e)),dt()}catch(o){console.warn("[EasyQuiz] Erro ao resetar dados:",o)}}function Ot(o){try{let e=localStorage.getItem("eq_domain_cache_"+o);if(!e)return{};let t=JSON.parse(e);if(t.advanceSelector&&/inject|injetar/i.test(t.advanceSelector)){t.advanceSelector=void 0;try{localStorage.removeItem("eq_domain_cache_"+o)}catch{}}return t}catch{return{}}}function Dt(o,e){if(e.advanceSelector&&/inject|injetar/i.test(e.advanceSelector))return;let a={...Ot(o),...e};try{localStorage.setItem("eq_domain_cache_"+o,JSON.stringify(a))}catch(i){console.warn("[EasyQuiz] Erro cache de dominio:",i)}}function so(o){let e=zt(),t=Array.isArray(o.apiKeys)?o.apiKeys.map(s=>typeof s=="string"?s.trim().replace(/^["']|["']$/g,""):"").filter(s=>s.length>5):e.apiKeys,a;typeof o.apiKey=="string"?a=o.apiKey.trim().replace(/^["']|["']$/g,""):Array.isArray(o.apiKeys)&&o.apiKeys.length>0?a=t[0]||"":a=e.apiKey,a&&!t.includes(a)&&(t=[a,...t]),t.length>0&&(!a||!t.includes(a))&&(a=t[0]);let i={...e,...o,apiKey:a,apiKeys:t};try{localStorage.setItem(Pt,JSON.stringify(i)),localStorage.setItem("easyquiz_api_keys",JSON.stringify(t))}catch(s){console.warn("[EasyQuiz] Falha ao persistir configura\xE7\xF5es no localStorage:",s)}return i}var De=[],no=12,Yo=1200;function ro(o){let e=o.trim().replace(/\s+/g," ").slice(0,Yo);e&&!De.includes(e)&&(De.push(e),De.length>no&&(De=De.slice(-no)))}function ct(){return De}function dt(){De=[]}function lo(){return{startTime:Date.now(),totalElapsedMs:0,completedQuestionsCount:0,averageDurationMs:0,records:[]}}var Je=lo();function We(){try{localStorage.removeItem(Re)}catch{}return Je}function Zo(o){Je=o;try{let e=JSON.stringify(o);sessionStorage.setItem(Re,e),localStorage.removeItem(Re)}catch{}}function co(o){let e=Je,t=Date.now(),a=e.records[e.records.length-1];if(a&&a.id===o.id&&t-a.timestamp<3e3)return e;let i={...o,timestamp:t},s=[...e.records,i],r=s.filter(u=>u.status==="answered"||u.status==="verified").length,n=s.reduce((u,m)=>u+m.durationMs,0),d=r>0?Math.round(n/r):0,c={startTime:e.startTime||t,totalElapsedMs:Math.max(t-(e.startTime||t),n),completedQuestionsCount:r,averageDurationMs:d,records:s};return Zo(c),c}function $e(){Je=lo();try{sessionStorage.removeItem(Re),localStorage.removeItem(Re)}catch{}return Je}var _o=new Set;function ea(o){for(let e of _o)try{e(o)}catch(t){console.warn("[EasyQuiz Skills] Erro em listener:",t)}}function ta(o){try{let e=o||(typeof window<"u"?window.location.href:"");return e&&new URL(e).hostname.replace(/^www\./,"").toLowerCase()||"global"}catch{return"global"}}var ho="eq_skills_profile_",uo=20,po=15,Ye=new Map;function oa(o){let e=Date.now();return o.includes("khanacademy.org")?[{id:"khan_mathquill_val",name:"Khan Perseus MathQuill",description:'Inputs matem\xE1ticos com data-testid="perseus-expression-input" requerem foco seguido de insertText ou disparo de input/change.',rule:'Use val no controle eq-ctrl-X ou JS com document.execCommand("insertText", false, valor).',selectorPattern:'[data-testid*="expression-input"], .mq-editable-field',successCount:1,lastUsedAt:e,source:"heuristic"},{id:"khan_radio_choice",name:"Khan Perseus Escolha \xDAnica",description:'Alternativas de r\xE1dio no Khan Academy usam containers choice-radio-btn ou data-testid="choice-N".',rule:"Use chk com o ID do controle. Em caso de overlay, acione o label pai.",selectorPattern:'[data-testid*="choice-"], .choice-radio-btn',successCount:1,lastUsedAt:e,source:"heuristic"},{id:"khan_advance_btn",name:"Khan Avan\xE7o Perseus",description:"Bot\xE3o de verifica\xE7\xE3o/pr\xF3xima quest\xE3o Perseus fica no rodap\xE9 da tarefa.",rule:'Use {t:"adv"}. O sistema localiza o bot\xE3o de verifica\xE7\xE3o automaticamente.',selectorPattern:'[data-testid*="exercise-check-answer"], [data-testid*="exercise-next-question"]',successCount:1,lastUsedAt:e,source:"heuristic"}]:o.includes("google.com")||o.includes("forms.gle")?[{id:"gforms_container_clk",name:"Google Forms Container Click",description:"Em formul\xE1rios Google, radios e checkboxes s\xE3o encapsulados em divs com classe .Qr7Oae.",rule:"Clique no container de op\xE7\xE3o ou dispare eventos no radio nativo e seu wrapper.",selectorPattern:'.Qr7Oae, [data-item-id], [role="radio"]',successCount:1,lastUsedAt:e,source:"heuristic"}]:o.includes("wayground")||o.includes("quizizz")?[{id:"wayground_tile_clk",name:"Wayground Cards Clic\xE1veis",description:"As alternativas s\xE3o bot\xF5es/cards clic\xE1veis com id hexadecimal ou atributos data-functional-selector.",rule:"Use clk direto no ID do card ou no texto exato da alternativa.",selectorPattern:'[class*="cursor-pointer"][id], [data-functional-selector*="option"]',successCount:1,lastUsedAt:e,source:"heuristic"}]:[]}function Te(o){let e=ta(o);if(Ye.has(e))return Ye.get(e);try{let a=typeof localStorage<"u"?localStorage.getItem(ho+e):null;if(a){let i=JSON.parse(a);if(i&&Array.isArray(i.skills))return Ye.set(e,i),i}}catch(a){console.warn("[EasyQuiz Skills] Erro ao carregar perfil de skills:",a)}let t={domain:e,skills:oa(e),failedPatterns:[],flowNotes:[],lastUpdated:Date.now()};return Ye.set(e,t),t}function Rt(o){let e=o.domain||"global";o.lastUpdated=Date.now(),Ye.set(e,o);try{typeof localStorage<"u"&&localStorage.setItem(ho+e,JSON.stringify(o))}catch(t){console.warn("[EasyQuiz Skills] Falha ao persistir perfil de skills:",t)}ea(o)}function Nt(o,e){let t=Te(e),a=o.id||`skill_${o.name.toLowerCase().replace(/[^a-z0-9]/g,"_").slice(0,30)}`,i=Date.now(),s=t.skills.findIndex(n=>n.id===a||n.name===o.name),r;if(s!==-1){let n=t.skills[s];r={...n,description:o.description||n.description,rule:o.rule||n.rule,selectorPattern:o.selectorPattern||n.selectorPattern,successCount:n.successCount+1,lastUsedAt:i,source:o.source||n.source},t.skills[s]=r}else r={id:a,name:o.name,description:o.description,rule:o.rule,selectorPattern:o.selectorPattern,successCount:1,lastUsedAt:i,source:o.source||"ai_synthesized"},t.skills.push(r),t.skills.length>uo&&(t.skills.sort((n,d)=>d.successCount*2+(d.lastUsedAt>n.lastUsedAt?1:-1)-n.successCount*2),t.skills=t.skills.slice(0,uo));return Rt(t),r}function mo(o,e,t){let a=Te(t),i=o.id||o.from||o.name||"action",s=o.v!==void 0?String(o.v):void 0,r=`${o.t}:${i}:${s||""}`.slice(0,80),n=Date.now(),d=`Evite a a\xE7\xE3o (${o.t}) com alvo "${i}".`;e.includes("n\xE3o encontrado")||e.includes("desabilitado")?d=`O elemento "${i}" n\xE3o est\xE1 acess\xEDvel ou est\xE1 oculto. Use seletor alternativo ou c\xF3digo JS via $eq.`:(e.includes("n\xE3o marcou")||e.includes("inalterado"))&&(d=`Disparo padr\xE3o DOM em "${i}" n\xE3o alterou o estado. Necess\xE1rio evento sint\xE9tico no label pai ou bypass via script.`);let c=a.failedPatterns.findIndex(m=>m.id===r),u={id:r,actionType:o.t,target:String(i),attemptedValue:s,reason:e.slice(0,150),timestamp:n,retryAvoidanceHint:d};return c!==-1?a.failedPatterns[c]=u:(a.failedPatterns.unshift(u),a.failedPatterns.length>po&&(a.failedPatterns=a.failedPatterns.slice(0,po))),Rt(a),u}function Se(o,e,t){let a=o.id||o.name||"";a&&(e.includes("Estrat\xE9gia")||e.includes("script")||e.includes("keyboard"))&&Nt({id:`auto_repaired_${o.t}_${e.slice(0,20)}`,name:`Recupera\xE7\xE3o: ${e}`,description:`Na plataforma ativa, a\xE7\xF5es (${o.t}) em "${a}" foram bem-sucedidas via ${e}.`,rule:"Utilize preferencialmente inje\xE7\xE3o ou estrat\xE9gia equivalente quando interagir com controles similares nesta p\xE1gina.",source:"auto_repaired"},t)}function go(o,e){let t=Te(e),a=o.trim().slice(0,200);a&&!t.flowNotes.includes(a)&&(t.flowNotes.push(a),t.flowNotes.length>8&&(t.flowNotes=t.flowNotes.slice(-8)),Rt(t))}function fo(o){let e=Te(o),t="";if(e.skills.length>0){t+=`
[BIBLIOTECA DE MINI-SKILLS DA P\xC1GINA (APRENDIZADOS REUTILIZ\xC1VEIS)]:
`,t+=`A IA acumulou as seguintes regras e habilidades verificadas para esta p\xE1gina/dom\xEDnio:
`;for(let a of e.skills.slice(0,8))t+=`\u2022 [SKILL: ${a.name}] ${a.description} Regra: ${a.rule||"Aplicar sempre que aplic\xE1vel."}
`}if(e.failedPatterns.length>0){t+=`
[MEM\xD3RIA DE ANTI-PATTERNS & ERROS DA P\xC1GINA \u2014 N\xC3O REPETIR!]:
`,t+=`\u26A0\uFE0F As seguintes a\xE7\xF5es J\xC1 FALHARAM anteriormente nesta p\xE1gina. N\xC3O insista no mesmo erro:
`;for(let a of e.failedPatterns.slice(0,6))t+=`\u2022 FALHA ANTERIOR (${a.actionType} em "${a.target}"): "${a.reason}" \u2192 DICA ANTI-ERRO: ${a.retryAvoidanceHint}
`;t+=`Raciocine no campo "thinking" como sua decis\xE3o atual desvia dessas falhas conhecidas.
`}return e.flowNotes.length>0&&(t+=`
[FLUXO DA P\xC1GINA]:
`,t+=e.flowNotes.map(a=>`\u2022 ${a}`).join(`
`)+`
`),t}var bo=`Voc\xEA \xE9 o motor operacional inteligente do EasyQuiz \u2014 um agente aut\xF4nomo de alta precis\xE3o que opera como uma pessoa real: olha, l\xEA, raciocina, decide e age com consci\xEAncia total do contexto e das ferramentas dispon\xEDveis. Sa\xEDda EXCLUSIVA em JSON minificado, sem markdown, sem coment\xE1rios, sem texto fora do JSON.

\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
CONSCI\xCANCIA DE EXECU\xC7\xC3O \u2014 SELF-AWARENESS OPERACIONAL
\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
Voc\xEA tem mem\xF3ria ativa de:
- O que j\xE1 foi tentado e FALHOU nesta p\xE1gina ([MEM\xD3RIA DE ANTI-PATTERNS])
- Quais m\xE9todos de intera\xE7\xE3o funcionaram antes ([BIBLIOTECA DE MINI-SKILLS])
- O fluxo atual do quiz ([FLUXO DA P\xC1GINA])

REGRA DE OURO \u2014 NUNCA REPITA O QUE FALHOU:
Se [MEM\xD3RIA DE ANTI-PATTERNS] registrar que uma a\xE7\xE3o espec\xEDfica falhou, voc\xEA OBRIGATORIAMENTE muda de estrat\xE9gia. N\xE3o \xE9 opcional. N\xE3o \xE9 sugest\xE3o. \xC9 lei de execu\xE7\xE3o.

REGRA DE OURO \u2014 RESPOSTA BLOQUEADA = RESPOSTA ERRADA:
Se o sistema sinalizar que a resposta n\xE3o pode ser enviada (bot\xE3o de envio desabilitado, mensagem de erro, valida\xE7\xE3o falhou), significa que a resposta escolhida est\xE1 ERRADA. Voc\xEA DEVE:
1. Reconsiderar qual alternativa \xE9 a correta.
2. Mudar sua resposta.
3. Nunca tentar enviar a mesma resposta errada duas vezes.

\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
RACIOC\xCDNIO OBRIGAT\xD3RIO \u2014 PENSE ANTES DE AGIR
\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
Use o campo "thinking" para raciocinar ANTES de decidir as actions:

  PASSO 1 \u2014 Leia [TEXTO] completo. Identifique: tipo de quest\xE3o, enunciado, contexto, idioma, formato (compra, conta, gr\xE1fico, mapa, matriz, diagrama), f\xF3rmulas matem\xE1ticas e imagens.
  PASSO 2 \u2014 Leia [RESPOSTAS]. Anote: quantos itens, IDs, tipos (t), textos (txt), estado atual (v). Identifique o FORMATO da quest\xE3o (ver se\xE7\xF5es abaixo).
  PASSO 2.5 \u2014 COMPARA\xC7\xC3O CR\xCDTICA: Compare cada op\xE7\xE3o contra as demais. Isole pegadinhas. Justifique POR QUE a resposta escolhida supera as outras.
  PASSO 3 \u2014 Raciocine a resposta correta usando conhecimento. Resolva matematicamente se necess\xE1rio. N\xE3o adivinhe.
  PASSO 3.5 \u2014 VERIFICA\xC7\xC3O DE SKILLS & ANTI-PATTERNS: Verifique [BIBLIOTECA DE MINI-SKILLS] e [MEM\xD3RIA DE ANTI-PATTERNS]. Se um padr\xE3o est\xE1 na mem\xF3ria de falhas, use outra abordagem.
  PASSO 4 \u2014 Escolha a ferramenta (clk/chk/val/sel/drag/js) certa para o tipo de controle.
  PASSO 5 \u2014 Verifique: o ID usado existe em [RESPOSTAS]? O tipo da a\xE7\xE3o bate com o tipo do elemento? Todos os campos obrigat\xF3rios foram preenchidos?
  PASSO 6 \u2014 Emita as actions. Confirme: adv \xE9 a \xDALTIMA a\xE7\xE3o se necess\xE1rio.

O campo thinking \xE9 leve (1-5 linhas). Seja telegr\xE1fico e preciso.

\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
AN\xC1LISE DE P\xC1GINA \u2014 INTERPRETA\xC7\xC3O INTELIGENTE DA INTERFACE
\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
Ao receber [DADOS], analise:

1. [TEXTO] \u2014 Conte\xFAdo textual principal: enunciado, contexto, alternativas, instru\xE7\xF5es, tabelas, valores num\xE9ricos.
2. [RESPOSTAS] \u2014 Controles interativos classificados como resposta. CADA um tem id, tipo (t), texto (txt), nome (n), valor atual (v) e op\xE7\xF5es (opt). Use EXCLUSIVAMENTE os IDs listados aqui.
3. [NAVEGA\xC7\xC3O] \u2014 Bot\xF5es/links de avan\xE7o. Use quando precisar avan\xE7ar.
4. [IMAGENS E GR\xC1FICOS] \u2014 Visuais inline (inline_data) ou contexto textual. Instru\xE7\xE3o K abaixo.
5. [MEM\xD3RIA] \u2014 Fatos aprendidos de quest\xF5es anteriores desta sess\xE3o.
6. [PLATAFORMA] \u2014 Hint do sistema sobre como interagir com essa plataforma.
7. [BIBLIOTECA DE MINI-SKILLS DA P\xC1GINA] \u2014 Padr\xF5es comprovados para este dom\xEDnio. PRIORIZE!
8. [MEM\xD3RIA DE ANTI-PATTERNS & ERROS \u2014 N\xC3O REPETIR!] \u2014 O que falhou. JAMAIS repita.
9. [FLUXO DA P\xC1GINA] \u2014 Notas sobre progress\xE3o sequencial do quiz.

CLASSIFICA\xC7\xC3O OBRIGAT\xD3RIA (pageType):
- "question"   \u2192 h\xE1 [RESPOSTAS] n\xE3o-vazia OU o enunciado tem pergunta/alternativa.
- "info"       \u2192 p\xE1gina 100% informativa: artigo, teoria, instru\xE7\xE3o de leitura, sem controles de resposta.
- "start"      \u2192 tela de boas-vindas com bot\xE3o de iniciar (actions=[{t:"adv"}]).
- "conclusion" \u2192 tela final de encerramento/resultado/pontua\xE7\xE3o (actions=[]).

NUNCA classifique como "info" se [RESPOSTAS] tiver controles \u2014 isso descarta a quest\xE3o silenciosamente.

\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
FERRAMENTAS DISPON\xCDVEIS \u2014 A\xC7\xD5ES (actions[])
\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
Cada a\xE7\xE3o tem um campo "t" (tipo) e par\xE2metros espec\xEDficos.

\u250C\u2500\u2500\u2500\u2500\u2500\u2500\u252C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510
\u2502 "t"  \u2502 QUANDO USAR                                                   \u2502
\u251C\u2500\u2500\u2500\u2500\u2500\u2500\u253C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2524
\u2502 chk  \u2502 Marcar checkbox ou radio.                                     \u2502
\u2502      \u2502 Par\xE2metros: id (ID do controle), c: true.                     \u2502
\u2502      \u2502 NUNCA emita c:false \u2014 o sistema resolve desmarca\xE7\xF5es.         \u2502
\u2502      \u2502 QUANDO: tipo "radio", "checkbox", "chk" em [RESPOSTAS].       \u2502
\u251C\u2500\u2500\u2500\u2500\u2500\u2500\u253C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2524
\u2502 clk  \u2502 Clique direto em card, bot\xE3o de op\xE7\xE3o, tile, link ou canvas.  \u2502
\u2502      \u2502 Par\xE2metros: id (ID ou texto do elemento).                     \u2502
\u2502      \u2502 Par\xE2metros opcionais: co:[x,y] para clique em coordenada      \u2502
\u2502      \u2502 espec\xEDfica (gr\xE1ficos, canvas interativos, mapas, sliders).    \u2502
\u2502      \u2502 QUANDO: tipo "submit", "button", cards/tiles sem input nativo, \u2502
\u2502      \u2502 op\xE7\xF5es do Wayground/Quizizz/Duolingo, gr\xE1ficos interativos.   \u2502
\u251C\u2500\u2500\u2500\u2500\u2500\u2500\u253C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2524
\u2502 val  \u2502 Preencher input de texto, textarea ou campo num\xE9rico.         \u2502
\u2502      \u2502 Par\xE2metros: id, v (valor exato como string).                  \u2502
\u2502      \u2502 Para cada campo = uma a\xE7\xE3o val separada com seu id exato.     \u2502
\u2502      \u2502 QUANDO: tipo "text", "number", "textarea", "val" em           \u2502
\u2502      \u2502 [RESPOSTAS]. M\xFAltiplos campos = m\xFAltiplas a\xE7\xF5es val.          \u2502
\u251C\u2500\u2500\u2500\u2500\u2500\u2500\u253C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2524
\u2502 sel  \u2502 Selecionar op\xE7\xE3o em dropdown/select nativo.                   \u2502
\u2502      \u2502 Par\xE2metros: id, v (array de strings).                         \u2502
\u2502      \u2502 QUANDO: tipo "select", "combobox", "listbox" em [RESPOSTAS].  \u2502
\u251C\u2500\u2500\u2500\u2500\u2500\u2500\u253C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2524
\u2502 drag \u2502 Arrastar item para zona/categoria.                            \u2502
\u2502      \u2502 Par\xE2metros: from (ID ou texto do item), to (ID ou nome da    \u2502
\u2502      \u2502 zona/categoria de destino).                                   \u2502
\u2502      \u2502 QUANDO: quest\xE3o de arrastar/soltar, ordena\xE7\xE3o, categoriza\xE7\xE3o. \u2502
\u2502      \u2502 Se o widget tem bot\xF5es clic\xE1veis por categoria, prefira clk.  \u2502
\u251C\u2500\u2500\u2500\u2500\u2500\u2500\u253C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2524
\u2502 js   \u2502 C\xF3digo JavaScript executado via $eq (API interna).            \u2502
\u2502      \u2502 Par\xE2metros: v (string de c\xF3digo JS \u2014 use "v", N\xC3O "code").    \u2502
\u2502      \u2502 API dispon\xEDvel: $eq.clk(sel), $eq.val(sel, val), $eq.chk(sel) \u2502
\u2502      \u2502 $eq.find(sel), $eq.drag(from, to), $eq.categorize(item, cat)  \u2502
\u2502      \u2502 QUANDO: widget interativo que n\xE3o responde a eventos DOM       \u2502
\u2502      \u2502 convencionais, canvas interativo, gr\xE1fico clic\xE1vel com        \u2502
\u2502      \u2502 coordenadas exatas, sliders, widgets Perseus/Khan.            \u2502
\u2502      \u2502 TAMB\xC9M: quando [ANTI-PATTERNS] mostra que clk/chk falharam.   \u2502
\u2502      \u2502 N\xC3O use js se os IDs de [RESPOSTAS] j\xE1 resolvem o problema.  \u2502
\u251C\u2500\u2500\u2500\u2500\u2500\u2500\u253C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2524
\u2502 adv  \u2502 AVAN\xC7O AUT\xD4NOMO para a pr\xF3xima etapa/quest\xE3o.                 \u2502
\u2502      \u2502 Forma: {t:"adv"} \u2014 SEM outros par\xE2metros.                    \u2502
\u2502      \u2502 O SISTEMA encontra e clica o bot\xE3o de avan\xE7o automaticamente. \u2502
\u2502      \u2502 NUNCA use clk para "Pr\xF3xima", "Next", "Check", "Enviar".     \u2502
\u2502      \u2502 SEMPRE use {t:"adv"} para avan\xE7ar \u2014 nunca clk em nav.        \u2502
\u2502      \u2502 QUANDO: ap\xF3s responder OU em pageType "info"/"start".         \u2502
\u2502      \u2502 DEVE ser a \xDALTIMA a\xE7\xE3o. N\xC3O emita antes das respostas.       \u2502
\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2534\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518

REGRA FUNDAMENTAL \u2014 UM M\xC9TODO POR ELEMENTO:
- Se [RESPOSTAS] tem controles: use EXCLUSIVAMENTE os IDs de [RESPOSTAS].
- clk com seletor CSS e js s\xE3o EXCLUSIVOS para quando [RESPOSTAS] est\xE1 vazia.
- N\xC3O combine m\xE9todos: ou IDs de [RESPOSTAS] OU CSS/js. Nunca ambos.

\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
REGRAS DE SELE\xC7\xC3O DE FERRAMENTA \u2014 HEUR\xCDSTICAS DE INTERFACE
\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550

A. ESCOLHA \xDANICA (radio, escolha_unica):
   \u2192 Detectado por: [ESCOLHA-\xDAnica] no cabe\xE7alho de [RESPOSTAS], tipo "radio", apenas 1 resposta poss\xEDvel.
   \u2192 Use: exatamente 1 a\xE7\xE3o chk com c:true no ID correto + adv.
   \u2192 NUNCA emita 2 a\xE7\xF5es de marca\xE7\xE3o em escolha \xFAnica.

B. M\xDALTIPLA ESCOLHA (checkboxes, escolha_multipla):
   \u2192 Detectado por: [MULTI-SELE\xC7\xC3O] no cabe\xE7alho de [RESPOSTAS], tipo "checkbox".
   \u2192 Use: 1 a\xE7\xE3o chk para CADA op\xE7\xE3o correta + adv.
   \u2192 Pode e DEVE haver 2, 3 ou mais a\xE7\xF5es chk. Omitir uma correta \xE9 erro.

C. PREENCHIMENTO \xDANICO (1 input/textarea):
   \u2192 Use: 1 a\xE7\xE3o val com o valor exato + adv.
   \u2192 Em quest\xF5es num\xE9ricas, use o n\xFAmero sem unidade (ex: "5" n\xE3o "5 cm").
   \u2192 Para contas/c\xE1lculos: resolva a opera\xE7\xE3o matem\xE1tica e insira o resultado.

D. M\xDALTIPLOS CAMPOS (matrizes, tabelas, grade, compras, contas):
   \u2192 Detectado por: [M\xDALTIPLOS CAMPOS] no cabe\xE7alho, 2+ controles tipo text/number.
   \u2192 Use: 1 a\xE7\xE3o val por campo com seu id exato + adv.
   \u2192 NUNCA agrupe v\xE1rios valores em 1 a\xE7\xE3o val.
   \u2192 Para tabelas de compras: cada linha/campo recebe um val separado.
   \u2192 Para matrizes num\xE9ricas: resolva CADA c\xE9lula matematicamente e emita um val por c\xE9lula.

E. CARDS/TILES CLIC\xC1VEIS (Wayground, Quizizz, Duolingo):
   \u2192 Detectado por: tipo "submit" ou "button" em [RESPOSTAS] com txt sendo o texto da alternativa.
   \u2192 Use: clk no ID do card correto + adv.
   \u2192 N\xC3O use chk para cards \u2014 eles n\xE3o s\xE3o inputs de formul\xE1rio.

E2. OP\xC7\xD5ES NUMERADAS ("1", "2", "3", "4" como alternativas):
   \u2192 Se [RESPOSTAS] lista elementos com txt="1", txt="2", etc. \u2014 s\xE3o alternativas de quiz.
   \u2192 Use: clk no ID da op\xE7\xE3o correta + adv.
   \u2192 N\xC3O confunda com pagina\xE7\xE3o \u2014 alternativas NUNCA est\xE3o em [NAVEGA\xC7\xC3O].

F. DROPDOWN/SELECT:
   \u2192 Detectado por: tipo "select"/"combobox" com campo opt listando op\xE7\xF5es.
   \u2192 Use: sel com v:[array dos valores corretos] + adv.

G. CATEGORIZA\xC7\xC3O / CLASSIFICA\xC7\xC3O (FATO/OPINI\xC3O, SIM/N\xC3O, grupos):
   \u2192 Se cards t\xEAm bot\xF5es internos de categoria: clk no bot\xE3o da categoria correta dentro de cada card.
   \u2192 Se \xE9 drag-and-drop real: drag de cada item para sua categoria.
   \u2192 Classifique TODOS os itens vis\xEDveis antes de emitir adv.
   \u2192 mode: "categorizacao" ou "arrastar_soltar".

H. VERDADEIRO/FALSO EM GRADE OU TABELA (MATRIZ V/F):
   \u2192 Avalie CADA afirma\xE7\xE3o/linha individualmente.
   \u2192 Para N afirma\xE7\xF5es, emita EXATAMENTE N a\xE7\xF5es separadas (uma por linha) + adv.
   \u2192 NUNCA marque apenas uma afirma\xE7\xE3o e deixe as outras em branco.
   \u2192 Formatos suportados:
     - Com name do radio: {t:"chk", name:"vf_row_1", v:"V", c:true}
     - Com ID do controle em [RESPOSTAS]: {t:"chk", id:"eq-ctrl-XX", v:"V", c:true}
     - Com texto da afirma\xE7\xE3o: {t:"clk", id:"1. Todo sistema linear...", v:"V"}
   \u2192 mode: "verdadeiro_falso".

I. ORDENA\xC7\xC3O DE ITENS (DRAG & DROP):
   \u2192 O contexto mostrar\xE1 [RESPOSTAS] com type="sortable".
   \u2192 Use drag sequencialmente: do item (from) para a posi\xE7\xE3o desejada (to).
   \u2192 Ex: {t:"drag",from:"Passo B",to:"Posi\xE7\xE3o 1"}
   \u2192 mode: "ordenacao".

I2. REDA\xC7\xC3O / DISSERTA\xC7\xC3O:
   \u2192 Detectado por: textarea grande OU enunciado com "escreva", "disserte", "redija", "elabore".
   \u2192 Use: 1 a\xE7\xE3o val com texto completo: introdu\xE7\xE3o + desenvolvimento + conclus\xE3o.
   \u2192 M\xEDnimo 15 linhas de conte\xFAdo relevante ao tema.
   \u2192 mode: "texto_livre".

J. P\xC1GINA INFORMATIVA / ARTIGO:
   \u2192 [RESPOSTAS] vazia, apenas texto para ler.
   \u2192 Use: actions=[{t:"adv"}] para avan\xE7ar. N\xE3o invente respostas.

K. IMAGENS E GR\xC1FICOS \u2014 REGRAS OBRIGAT\xD3RIAS:
   \u2192 Imagens inline (inline_data): analise visualmente curvas, eixos, v\xE9rtices, coordenadas, geometria, propor\xE7\xF5es.
   \u2192 Contexto textual [CONTEXTO_IMAGEM_N]: use o texto descritivo como se fosse a imagem.
   \u2192 FILTRO DE RELEV\xC2NCIA: Se descreve \xEDcone/logo/avatar \u2192 IGNORE. Se descreve gr\xE1fico/tabela/f\xF3rmula/mapa \u2192 USE ATIVAMENTE.
   \u2192 CAMPO imageDescriptions (OBRIGAT\xD3RIO quando h\xE1 imagens):
     Para CADA imagem, emita uma entrada:
     { "index": N, "description": "O que vejo/entendo (max 60 palavras)", "relevant": true/false, "associatedLabel": "label" }

L. GR\xC1FICOS INTERATIVOS / CANVAS CLIC\xC1VEL:
   \u2192 Quando a quest\xE3o exige clicar em um ponto espec\xEDfico de um gr\xE1fico ou canvas:
   \u2192 Analise as coordenadas do sistema de eixos (X, Y) e a resposta que voc\xEA identificou.
   \u2192 Calcule as coordenadas em pixels dentro do elemento canvas/svg.
   \u2192 Use: {t:"clk", id:"[seletor do canvas ou ID do elemento]", co:[x_pixel, y_pixel]}
   \u2192 Ou use js: {t:"js", v:"const c=$eq.find('[data-canvas]'); const r=c.getBoundingClientRect(); const x=r.left+r.width*0.45; const y=r.top+r.height*0.30; c.dispatchEvent(new MouseEvent('click',{bubbles:true,clientX:x,clientY:y}));"}
   \u2192 A propor\xE7\xE3o do canvas determina as coordenadas. Se o gr\xE1fico vai de -10 a 10, o ponto 0 est\xE1 no centro.

M. IMAGEM AUSENTE MAS REFERENCIADA NO ENUNCIADO:
   \u2192 Se [TEXTO] menciona "observe", "analise a imagem", "a figura mostra", etc. MAS [IMAGENS] est\xE1 vazio:
   \u2192 NUNCA adivinhe. Emita confidence: 0.15 m\xE1ximo.
   \u2192 rationale deve indicar: "Imagem do enunciado n\xE3o dispon\xEDvel \u2014 resposta com baixa confian\xE7a"
   \u2192 Ainda assim emita a MELHOR estimativa poss\xEDvel usando o contexto textual.
   \u2192 memoryToStore: "Quest\xE3o dependia de imagem n\xE3o capturada"

\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
PLATAFORMAS ESPEC\xCDFICAS \u2014 REGRAS OBRIGAT\xD3RIAS
\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550

GOOGLE FORMS:
  \u2192 Controles s\xE3o [role="radio"] ou [role="checkbox"] com data-value.
  \u2192 Use chk com c:true para radio/checkbox. Ex: {t:"chk",id:"eq-xxx-1",c:true}
  \u2192 Para texto livre: use val. Para dropdown: use sel.
  \u2192 Ap\xF3s responder TODAS as perguntas, use {t:"adv"} para enviar.

WAYGROUND / QUIZIZZ \u2014 ESCOLHA M\xDALTIPLA:
  \u2192 Alternativas s\xE3o cards clic\xE1veis com cursor-pointer e ID hexadecimal.
  \u2192 Use clk no ID do card. Ex: {t:"clk",id:"6abc123"}
  \u2192 NUNCA use chk em Wayground \u2014 cards s\xE3o divs, n\xE3o inputs.
  \u2192 NUNCA tente adivinhar o ID hexadecimal \u2014 use EXATAMENTE o id listado em [RESPOSTAS].

WAYGROUND / QUIZIZZ \u2014 CLASSIFICA\xC7\xC3O:
  \u2192 Items s\xE3o cards com cursor-grab e ID hexadecimal.
  \u2192 Categorias s\xE3o containers com texto vis\xEDvel (ex: "FATO", "OPINI\xC3O").
  \u2192 Use drag: {t:"drag",from:"ID_hex_do_item",to:"NOME_DA_CATEGORIA"}
  \u2192 Ex: {t:"drag",from:"6abc","to":"FATO"}
  \u2192 Ap\xF3s classificar TODOS os items, use {t:"adv"}.

KHAN ACADEMY / PERSEUS:
  \u2192 Campos de matem\xE1tica (.mq-editable-field) exigem nota\xE7\xE3o LaTeX.
  \u2192 Use val para campos de texto/matem\xE1tica. Fra\xE7\xF5es: \\frac{1}{2}. Ra\xEDzes: \\sqrt{3}.
  \u2192 Use sel para dropdowns e chk/clk para multipla escolha.
  \u2192 O motor far\xE1 fallback autom\xE1tico para React/Perseus \u2014 n\xE3o emita js a menos que explicitamente exigido.
  \u2192 BOT\xC3O CHECK/VERIFICAR: Use {t:"adv"} \u2014 o sistema localiza automaticamente o bot\xE3o.

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
  \u2192 Se nenhum controle \xF3bvio: use fallback CSS: {t:"clk",id:"[seletor CSS]"}
  \u2192 Ex: {t:"clk",id:"[data-value='Paris']"} ou {t:"clk",id:"button.answer-card:first-child"}

REGRA UNIVERSAL DE AVAN\xC7O:
  \u2192 Se pageType="info" ou "start": actions=[{t:"adv"}] \u2014 apenas avan\xE7ar.
  \u2192 Se pageType="question" SEM controles ([RESPOSTAS] vazia): tente {t:"adv"} como \xFAltimo recurso.

\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
REGRAS ABSOLUTAS
\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
1. Sa\xEDda APENAS JSON minificado \u2014 sem markdown, sem texto livre, sem coment\xE1rios.
2. NUNCA invente IDs. Use exclusivamente os listados em [RESPOSTAS] ou [NAVEGA\xC7\xC3O].
3. adv deve ser SEMPRE a \xFAltima a\xE7\xE3o do array.
4. rationale: m\xE1ximo 15 palavras (telegr\xE1fico).
5. NUNCA emita c:false \u2014 nunca desmarque explicitamente.
6. NUNCA emita adv se ainda h\xE1 itens de categoriza\xE7\xE3o/classifica\xE7\xE3o n\xE3o resolvidos.
7. Se [RESPOSTAS] tiver controles mas voc\xEA n\xE3o souber a resposta, emita a a\xE7\xE3o com melhor estimativa \u2014 nunca retorne actions:[].
8. Se [ANTI-PATTERNS] registrar falha de uma estrat\xE9gia, use estrat\xE9gia DIFERENTE.
9. Para quest\xF5es com m\xFAltiplos campos (tabelas, compras, matrizes): resolva CADA campo matematicamente antes de emitir a\xE7\xF5es.
10. NUNCA repita exatamente a mesma action que est\xE1 em [ANTI-PATTERNS] \u2014 sempre mude o approach.

PLANO JSON (campos obrigat\xF3rios e opcionais):
{ "pageType": "question|info|start|conclusion", "mode": "...", "confidence": 0.0-1.0, "rationale": "...", "thinking": "...", "actions": [...], "memoryToStore": "...", "imageDescriptions": [], "learnedSkill": { "name": "...", "description": "...", "targetRule": "..." }, "flowState": { "stepDescription": "...", "expectedActionNext": "..." }, "wrongAnswerDetected": false, "suggestStrategyChange": false }

wrongAnswerDetected: true quando a plataforma claramente sinalizou que a resposta est\xE1 errada (ex: valida\xE7\xE3o falhou, mensagem de erro, bot\xE3o de envio bloqueado pela resposta errada).
suggestStrategyChange: true quando o m\xE9todo atual de intera\xE7\xE3o claramente n\xE3o funciona e outro deve ser tentado.
memoryToStore: fato conceitual \xFAtil para quest\xF5es futuras desta sess\xE3o.
learnedSkill: emita quando descobrir um padr\xE3o de intera\xE7\xE3o singular desta plataforma.
flowState: descri\xE7\xE3o da etapa de progresso no quiz/prova.
`;function aa(o,e){if(/forms\.(google|gle)\.com|docs\.google\.com\/forms/i.test(o)||e.includes("Qr7Oae")||e.includes("freebirdFormviewer")||e.includes("data-item-id"))return"[PLATAFORMA: Google Forms \u2014 use chk nos containers de alternativa; IDs via data-item-id ou texto da op\xE7\xE3o]";if(/wayground|quizizz/i.test(o)||e.includes("data-functional-selector"))return e.includes("classification")||e.toLowerCase().includes("fato")||e.toLowerCase().includes("opini")?`[PLATAFORMA: Wayground/Quizizz CLASSIFICA\xC7\xC3O drag-and-drop]
[RESPOSTAS] ter\xE1 items com t="draggable" e id hexadecimal (ex: 695fa5b6...).
Use EXCLUSIVAMENTE: {t:"drag", from:"ID_hexadecimal_do_card", to:"NOME_DA_CATEGORIA"}
Exemplo: {t:"drag",from:"695fa5b69885555d8155a5ac",to:"FATO"}
Classifique TODOS os items (1 drag por item) antes de emitir adv.
mode: "arrastar_soltar"`:"[PLATAFORMA: Wayground/Quizizz \u2014 alternativas s\xE3o cards clic\xE1veis com IDs hexadecimais, use clk com o id EXATO de [RESPOSTAS]]";if(/khanacademy\.org/i.test(o)||e.includes("perseus")){let t=e.includes("perseus-expression-input")||e.includes("perseus-math-input"),a=e.includes("perseus-radio")||e.includes("perseus-checkbox")||e.includes("choice-radio")||e.includes("choice_"),i=e.includes("perseus-dropdown")||e.includes("perseus-select"),s=e.includes("perseus-input-number")||e.includes("unit-input")||e.includes("numerator")||e.includes("denominator"),r=e.includes("interactive-graph")||e.includes("graphie")||e.includes("perseus-graph"),n=`[PLATAFORMA: Khan Academy / Perseus]
`;return n+=`REGRAS CR\xCDTICAS PARA KHAN ACADEMY:
`,a&&(n+='\u2022 M\xDALTIPLA ESCOLHA: Alternativas s\xE3o radio buttons com classe "choice-radio-btn" ou data-testid contendo "choice". ',n+=`Use chk com o ID do controle listado em [RESPOSTAS]. Fallback: {t:"js",v:"$eq.clk('[data-testid*=choice]:nth-child(N)')"}\\n`),t&&(n+="\u2022 EXPRESS\xC3O MATEM\xC1TICA: Input Perseus .mq-editable-field. ",n+=`Use val com o ID do controle. Fallback JS: {t:"js",v:"const el=$eq.find('[data-testid=perseus-expression-input] .mq-editable-field'); el.focus(); document.execCommand('selectAll'); document.execCommand('insertText',false,'VALOR')"}\\n`),s&&(n+="\u2022 INPUT NUM\xC9RICO: Use val com o ID do controle. ",n+=`Fallback: {t:"js",v:"const i=$eq.find('input[data-testid*=input]'); i.value='42'; i.dispatchEvent(new Event('input',{bubbles:true})); i.dispatchEvent(new Event('change',{bubbles:true}))"}\\n`),i&&(n+="\u2022 DROPDOWN PERSEUS: Use sel com o ID.\\n"),r&&(n+="\u2022 GR\xC1FICO INTERATIVO: Clique em coordenadas espec\xEDficas do canvas/svg. ",n+=`Use {t:"js",v:"const g=$eq.find('.graphie, .interactive-graph, canvas'); const r=g.getBoundingClientRect(); const cx=r.left+r.width*(0.5+(X/RANGE)); const cy=r.top+r.height*(0.5-(Y/RANGE)); g.dispatchEvent(new MouseEvent('click',{bubbles:true,clientX:cx,clientY:cy}));"}\\n`,n+="  Onde X e Y s\xE3o as coordenadas matem\xE1ticas do ponto a clicar e RANGE \xE9 o raio do eixo (ex: 10 para eixo -10 a 10).\\n"),n+=`\u2022 BOT\xC3O CHECK/VERIFICAR: Use {t:"adv"} \u2014 o sistema localiza automaticamente o bot\xE3o de verifica\xE7\xE3o Perseus.
`,n+="\u2022 SEMPRE prefira os IDs de [RESPOSTAS] antes de tentar JS. JS \xE9 \xDALTIMO RECURSO para widgets que n\xE3o respondem a eventos DOM.",n}return/moodle|ava\.|classroom\.google/i.test(o)?"[PLATAFORMA: Moodle/AVA/Classroom \u2014 formul\xE1rios padr\xE3o]":/duolingo/i.test(o)?"[PLATAFORMA: Duolingo \u2014 tiles clic\xE1veis, use clk por texto exato]":/blackboard|canvas\.instructure/i.test(o)?"[PLATAFORMA: Canvas/Blackboard \u2014 quiz-question padr\xE3o]":/socrative|kahoot/i.test(o)?"[PLATAFORMA: Socrative/Kahoot \u2014 alternativas s\xE3o bot\xF5es, use clk]":""}function Ze(o,e,t){let a=o.htmlSnippet.includes("draggable")||o.htmlSnippet.includes("perseus")||o.htmlSnippet.includes("category")||o.htmlSnippet.includes("dropzone")||o.controls.some(y=>y.type==="draggable"||y.type==="dropzone"),i=/katex|latex|\\frac|\\sqrt/i.test(o.htmlSnippet),s=/interactive-graph|graphie|\.graphie|data-canvas|<canvas|<svg.*interactiv/i.test(o.htmlSnippet)||o.htmlSnippet.includes("perseus-graph"),r=/forms\.(google|gle)\.com|docs\.google\.com\/forms/i.test(o.sourceUrl)||o.htmlSnippet.includes("Qr7Oae")||o.htmlSnippet.includes("data-item-id")||o.htmlSnippet.includes("freebirdFormviewer"),n=(/wayground|quizizz/i.test(o.sourceUrl)||o.htmlSnippet.includes("data-functional-selector"))&&(o.htmlSnippet.includes("classification")||o.controls.filter(y=>y.role==="answer").length===0),d=o.controls.filter(y=>y.role!=="navigation").length===0,c=d||a||r||n||s||i&&o.questionText.length<60,u=d?5e3:n?6e3:s?4e3:2e3,m=c?`
[HTML]:
${o.htmlSnippet.slice(0,u).replace(/\s+/g," ")}`:"",l="";if(d&&typeof document<"u")try{let y=Array.from(document.querySelectorAll('input:not([type=hidden]), textarea, select, button, [role="button"], [role="radio"], [role="checkbox"], [role="option"], [onclick], [data-action], a[href]:not([href="#"]), [tabindex]:not([tabindex="-1"]), canvas, svg, [class*="interactive" i], [class*="graph" i]')).filter(E=>{let T=E,C=T.getBoundingClientRect?.()||{width:0,height:0};return C.width>0&&C.height>0&&!T.closest("#easyquiz-shadow-root, .eq-sidebar")}).slice(0,50).map(E=>{let T=E,C=T.tagName.toLowerCase(),I=T.id?`#${T.id}`:"",A=T.className&&typeof T.className=="string"?`.${T.className.trim().split(/\s+/).slice(0,2).join(".")}`:"",S=(T.textContent||T.value||T.getAttribute("aria-label")||"").trim().slice(0,60),z=T.getAttribute("type")||T.getAttribute("role")||"",D=T.getBoundingClientRect(),q=C==="canvas"||C==="svg"?` size:${Math.round(D.width)}x${Math.round(D.height)}`:"";return`${C}${I}${A}[${z}]${q} txt="${S}"`});y.length>0&&(l=`
[DOM-INTERATIVO]:
${y.join(`
`)}`)}catch{}let p="";if(s&&typeof document<"u")try{let y=Array.from(document.querySelectorAll('canvas, .graphie, .interactive-graph, [class*="graph" i]')).filter(E=>{let T=E,C=T.getBoundingClientRect();return C.width>50&&C.height>50&&!T.closest("#easyquiz-shadow-root")}).slice(0,3);y.length>0&&(p=`
[GR\xC1FICOS INTERATIVOS DETECTADOS \u2014 use estas dimens\xF5es para calcular coordenadas de clique]:
${y.map(T=>{let C=T,I=C.getBoundingClientRect(),A=C.id||C.className?.toString()?.slice(0,30)||"unknown";return`${C.tagName.toLowerCase()}[id/class:"${A}"] rect:left=${Math.round(I.left)},top=${Math.round(I.top)},w=${Math.round(I.width)},h=${Math.round(I.height)}`}).join(`
`)}`)}catch{}let h=ct(),f=h.length>0?`
[MEM\xD3RIA]:
${h.join(" | ")}
`:"",g=o.controls.filter(y=>y.role!=="navigation"),b=o.controls.filter(y=>y.role==="navigation"),v=aa(o.sourceUrl,o.htmlSnippet),x=v?`
${v}
`:"",w=fo(o.sourceUrl);return`--- AN\xC1LISE ---
[MODO]: ${t.engine} | Dica: ${t.modeHint||"Auto"}
[URL]: ${o.sourceUrl}
[P\xC1GINA]: ${o.pageTitle}${f}${x}${w}
[DADOS]
[TEXTO]:
${o.questionText}${m}${l}${p}

[RESPOSTAS]:
${(()=>{if(g.length===0)return"Nenhuma";let y=g.filter(M=>M.type==="checkbox"||M.type==="chk"),E=new Set(g.filter(M=>M.type==="radio").map(M=>M.name).filter(Boolean)),T=y.filter(M=>!M.name||!E.has(M.name)),C=/selecione as|assinale as|quais das|todas as|marque as|escolha as|quais dessas|quais dos/i.test(o.questionText),I=T.length>=2||C,A=E.size>1||/verdadeir|fals[oa]|\bv\s*\/\s*f\b|julgue|itens/i.test(o.questionText)&&E.size>=1,S=g.every(M=>M.type==="radio"||M.type==="chk")&&E.size===1&&!I&&!A,z=g.filter(M=>M.type==="text"||M.type==="number"||M.type==="val"||M.tag==="input"||M.tag==="textarea"),D=z.length>=2,q=D&&/compra|preço|valor|total|quantidade|produto|item|custo|desconto|parcela|troco|pagou|recebeu|gastou/i.test(o.questionText);return(A?`[GRADE VERDADEIRO/FALSO (${E.size||"m\xFAltiplas"} afirma\xE7\xF5es): voc\xEA DEVE julgar e marcar exatamente 1 op\xE7\xE3o (V ou F) para CADA uma das ${E.size} afirma\xE7\xF5es \u2014 emita ${E.size} a\xE7\xF5es chk separadas + adv]
`:I?`[MULTI-SELE\xC7\xC3O: marque TODOS os corretos, pode ser 2 ou mais]
`:S?`[ESCOLHA-\xDAnica: marque APENAS 1 op\xE7\xE3o \u2014 compare criticamente todas as alternativas antes de escolher]
`:q?`[TABELA DE COMPRAS/C\xC1LCULO (${z.length} campos): resolva matematicamente CADA campo e emita uma a\xE7\xE3o val por campo com seu id exato \u2014 N\xC3O agrupe valores]
`:D?`[M\xDALTIPLOS CAMPOS DE PREENCHIMENTO (${z.length} campos): emita uma a\xE7\xE3o val para CADA um dos ${z.length} campos abaixo com seu id exato]
`:"")+JSON.stringify(g.map((M,B)=>{let X=M.label&&/^[A-Ea-e][\)\.\:\-\s]/.test(M.label.trim())?M.label.trim().charAt(0).toUpperCase():String.fromCharCode(65+B%26);return{id:M.id,t:M.type,item:X,n:M.name||void 0,txt:M.label?M.label.length>220?M.label.slice(0,220)+"...":M.label:void 0,v:M.value||void 0,opt:M.options&&M.options.length?M.options.slice(0,20).map(W=>W.label||W.value):void 0}}))})()}

[NAVEGA\xC7\xC3O]:
${b.length>0?b.map(y=>`"${y.label||y.id}"[${y.type}]`).join(","):"Nenhuma"}

[IMAGENS E GR\xC1FICOS ANEXADOS (${e.length})]:
${(()=>{if(e.length===0)return/\b(observ[ea]|analis[ea]|figur[a]|gráfic[o]|diagram[a]|image[mn]|mapa|tabela|veja|conforme|de acordo com|pela|ilustra|representa|mostr[a]|exib[ea]|consider[ea]\s+(a|o)\s+(image|figur|gráfic|diagram|tabela|mapa))\b/i.test(o.questionText)?"[AVISO CR\xCDTICO]: O enunciado referencia conte\xFAdo visual (gr\xE1fico/imagem/figura/diagrama) mas NENHUMA imagem foi capturada. Sua confian\xE7a DEVE ser \u22640.15. N\xC3O adivinhe \u2014 use apenas o contexto textual dispon\xEDvel.":"Nenhum anexo visual.";let y=e.filter(A=>A.captureStatus==="failed_relevant"),T=/\b(observ[ea]|analis[ea]|figur[a]|gráfic[o]|diagram[a]|image[mn]|mapa|tabela|veja|conforme|de acordo com|pela|ilustra|representa|mostr[a])\b/i.test(o.questionText),C=e.every(A=>A.captureStatus!=="captured"),I="";return(y.length>0||T&&C)&&(I=`
  [AVISO]: Imagem(s) relevante(s) do enunciado N\xC3O puderam ser capturadas visualmente. Use o contexto textual abaixo como substituto. Confian\xE7a deve ser reduzida.
`),I+e.map((A,S)=>{let z=A.associatedLabel||"Gr\xE1fico da Quest\xE3o",D=A.alt?` | alt: "${A.alt}"`:"";if(A.captureStatus==="failed_relevant")return`  - Imagem ${S+1} [IMAGEM_RELEVANTE_N\xC3O_CAPTURADA]: ${z}${D} | ${A.textContext||"sem contexto adicional"} | src: ${(A.source||"").slice(0,100)}`;if(A.captureStatus==="text_only")return`  - Imagem ${S+1} [CONTEXTO_TEXTUAL]: ${z}${D} | ${A.textContext||"sem contexto adicional"}`;if(A.captureStatus==="captured"||A.base64){let q=A.textContext?` | Textos e r\xF3tulos do gr\xE1fico: "${A.textContext}"`:"";return`  - Imagem ${S+1} [VISUAL_INLINE]: ${z}${D}${q}`}return`  - Imagem ${S+1} [FALHOU]: ${z}${D}`}).join(`
`)})()}
[/DADOS]
Sa\xEDda em JSON v\xE1lido.`}var na=new Set(["question","info","start","conclusion"]),ia=new Set(["texto_livre","escolha_unica","escolha_multipla","verdadeiro_falso","preenchimento","acao_sem_resposta","categorizacao","ordenacao","arrastar_soltar"]),sa=new Set(["val","chk","sel","clk","adv","js","drag"]),ra=150,_e=2e3;function pe(o,e=""){return o==null?e:typeof o=="string"?o.trim().slice(0,_e):typeof o=="number"||typeof o=="boolean"?String(o).trim().slice(0,_e):e}function la(o,e){if(!o||typeof o!="object")return null;let t=o,a=t.t;if(typeof a!="string"||!sa.has(a))return null;if(a==="adv"){let n=t.id??t.target??t.name??t.selector;return{t:"adv",...pe(n)?{id:pe(n,"").slice(0,500)}:{}}}if(a==="drag"){let n=pe(t.from??t.source),d=pe(t.to??t.target??t.destination);return!n||!d?null:{t:"drag",from:n.slice(0,500),to:d.slice(0,500)}}if(a==="js"){let n=pe(t.v??t.code??t.script);return!n||n.length>8e3?null:{t:"js",v:n}}let i=t.id??t.target??t.name??t.selector??t.element;(i==null||i==="")&&a==="val"&&(i="1");let s=pe(i).slice(0,500);if(!s)return null;if(a==="val"){let n=t.v!==void 0?t.v:t.value!==void 0?t.value:t.val!==void 0?t.val:t.text!==void 0?t.text:t.answer;return{t:"val",id:s,v:pe(n).slice(0,_e)}}if(a==="sel"){let n=t.v!==void 0?t.v:t.value!==void 0?t.value:t.val!==void 0?t.val:t.values,c=(Array.isArray(n)?n:[n]).map(u=>pe(u).slice(0,500)).filter(Boolean);return{t:"sel",id:s,v:c}}if(a==="chk"){let n=t.c===!1||t.c==="false"||t.c===0||t.c==="0"||t.c==="off"||t.c==="unchecked"||t.c==="desmarcar",d={t:"chk",id:s,c:!n};return t.v!==void 0&&(d.v=pe(t.v).slice(0,_e)),d}let r={t:"clk",id:s};if(t.c!==void 0){let n=t.c===!1||t.c==="false"||t.c===0||t.c==="0"||t.c==="off"||t.c==="unchecked"||t.c==="desmarcar";r.c=!n}return t.v!==void 0&&(r.v=pe(t.v).slice(0,_e)),Array.isArray(t.co)&&t.co.length===2&&t.co.every(n=>typeof n=="number"&&Number.isFinite(n))&&(r.co=[t.co[0],t.co[1]]),r}function ca(o,e,t){if(t!=="question")return o;let a=o.filter(s=>s.t==="adv"),i=o.filter(s=>s.t!=="adv");if(e==="escolha_unica"){i=i.filter(r=>!(r.t==="chk"&&r.c===!1||r.t==="clk"&&r.c===!1));let s=i.filter(r=>r.t==="chk"||r.t==="clk");if(s.length>1){let r=i.filter(d=>d.t!=="chk"&&d.t!=="clk"),n=s[s.length-1];i=[...r,n]}}else if(e==="escolha_multipla"){i=i.filter(r=>!(r.t==="chk"&&r.c===!1||r.t==="clk"&&r.c===!1));let s=new Set;i=i.filter(r=>{let n="id"in r&&typeof r.id=="string"?r.id:"";return n?s.has(n)?!1:(s.add(n),!0):!0})}else if(e==="verdadeiro_falso"){let s=new Set,r=[...i].reverse(),n=[];for(let d of r){let c="id"in d&&typeof d.id=="string"?d.id:"";c?s.has(c)||(s.add(c),n.push(d)):n.push(d)}i=n.reverse()}return[...i,...a]}function vo(o){if(!o||typeof o!="object")return{pageType:"info",mode:"acao_sem_resposta",confidence:.5,rationale:"Resposta estruturada n\xE3o identificada; avan\xE7ando como informativo.",actions:[{t:"adv"}]};let e=o,t=e.pageType,a=e.mode;(typeof t!="string"||!na.has(t))&&(t="question"),(typeof a!="string"||!ia.has(a))&&(a="escolha_unica");let i=Array.isArray(e.actions)?e.actions:[],s=[];for(let d=0;d<Math.min(i.length,ra);d++){let c=la(i[d],d);c&&s.push(c)}s.some(d=>d.t==="val")&&(a==="escolha_unica"||!e.mode)&&(a="preenchimento"),s.some(d=>d.t==="drag")&&!["categorizacao","arrastar_soltar","ordenacao"].includes(a)&&(a="arrastar_soltar"),s=ca(s,a,t);let r=s.some(d=>d.t==="adv");t==="conclusion"?s.length=0:t==="info"||t==="start"?r||s.push({t:"adv"}):t==="question"&&!r&&s.push({t:"adv"});let n=typeof e.confidence=="number"&&Number.isFinite(e.confidence)?Math.min(1,Math.max(0,e.confidence)):.85;return{pageType:t,mode:a,confidence:n,rationale:pe(e.rationale,"Plano validado e auto-recuperado."),actions:s,...pe(e.memoryToStore)?{memoryToStore:pe(e.memoryToStore)}:{},...e.needsMoreContext?{needsMoreContext:!!e.needsMoreContext}:{}}}var me=class{keys=new Map;constructor(e=[]){this.init(e)}init(e){let t=new Map(this.keys);this.keys.clear();let a=e.flatMap(s=>s.split(/[\n\r]+/));Array.from(new Set(a.map(s=>s.trim().replace(/^["']|["']$/g,"")).filter(s=>s.length>5))).forEach((s,r)=>{let n=this.generateId(s),d=t.get(n)||t.get(s);this.keys.set(n,{id:n,key:s,label:d?.label||`Chave ${r+1}`,addedAt:d?.addedAt||Date.now(),lastUsedAt:d?.lastUsedAt,lastLatencyMs:d?.lastLatencyMs,cooldownUntil:d?.cooldownUntil,errorCount:d?.errorCount||0,lastError:d?.lastError,winCount:d?.winCount||0})})}generateId(e){let t=0;for(let i=0;i<e.length;i++)t=(t<<5)-t+e.charCodeAt(i),t|=0;let a=e.slice(-12).replace(/[^a-zA-Z0-9]/g,"").slice(0,6);return`key_${Math.abs(t).toString(36).slice(0,6)}${a}`}static maskKey(e){let t=e.trim().replace(/^["']|["']$/g,"");return t.length<=10?"\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022":`${t.slice(0,6)}...${t.slice(-4)}`}getAllKeys(){let e=Date.now();return Array.from(this.keys.values()).map(t=>{let a=Math.max(0,(t.cooldownUntil||0)-e);return{...t,isCooldown:a>0,remainingCooldownMs:a}})}getHealthyKeys(){let e=Date.now();return Array.from(this.keys.values()).filter(t=>(t.cooldownUntil||0)<=e&&(t.errorCount||0)<50)}getRoundRobinKeys(e=2){let t=Date.now(),a=Array.from(this.keys.values()).filter(s=>(s.errorCount||0)<50);if(a.length===0)return Array.from(this.keys.values()).slice(0,e);let i=a.filter(s=>(s.cooldownUntil||0)<=t);return i.length>0?(i.sort((s,r)=>{let n=s.lastLatencyMs!==void 0?s.lastLatencyMs:99999,d=r.lastLatencyMs!==void 0?r.lastLatencyMs:99999;if(n!==d)return n-d;let c=(s.lastUsedAt||0)-(r.lastUsedAt||0);return c!==0?c:s.addedAt-r.addedAt}),i.slice(0,e)):(a.sort((s,r)=>(s.cooldownUntil||0)-(r.cooldownUntil||0)),a.slice(0,e))}getBestKey(){return this.getRoundRobinKeys(1)[0]?.key||""}getDiverseKeys(e){return this.getRoundRobinKeys(e).map(t=>t.key)}markQuotaHit(e,t=8e3){let a=this.findKeyObj(e);a&&(a.cooldownUntil=Date.now()+t,a.lastError=`Cota tempor\xE1ria atingida (HTTP 429). Cooldown de ${Math.round(t/1e3)}s ativado.`)}markOverloaded(e,t=5e3){let a=this.findKeyObj(e);a&&(a.cooldownUntil=Date.now()+t,a.lastError=`Servidores sobrecarregados (HTTP 503). Cooldown de ${Math.round(t/1e3)}s ativado.`)}markSuccess(e,t){let a=this.findKeyObj(e);a&&(a.lastLatencyMs=t,a.lastUsedAt=Date.now(),a.errorCount=0,a.lastError=void 0,a.cooldownUntil=void 0)}markWinner(e){let t=this.findKeyObj(e);t&&(t.winCount=(t.winCount||0)+1)}markInvalid(e,t){let a=this.findKeyObj(e);a&&(a.errorCount=99,a.lastError=t)}addKey(e,t){let a=e.trim().replace(/^["']|["']$/g,"");if(!a)return{ok:!1,message:"Chave n\xE3o pode ser vazia."};if(a.length<15)return{ok:!1,message:"Chave de API inv\xE1lida ou muito curta."};let i=this.generateId(a);if(this.keys.has(i)||Array.from(this.keys.values()).some(n=>n.key===a))return{ok:!1,message:"Esta chave de API j\xE1 est\xE1 cadastrada."};let r={id:i,key:a,label:t?.trim()||`Chave ${this.keys.size+1}`,addedAt:Date.now(),errorCount:0};return this.keys.set(i,r),{ok:!0,message:"Chave adicionada com sucesso!",keyItem:r}}updateKey(e,t,a){let i=this.keys.get(e);if(!i)return{ok:!1,message:"Chave n\xE3o encontrada."};let s=t.trim().replace(/^["']|["']$/g,"");return!s||s.length<15?{ok:!1,message:"Chave de API inv\xE1lida."}:(i.key=s,a!==void 0&&(i.label=a.trim()),i.errorCount=0,i.cooldownUntil=void 0,i.lastError=void 0,{ok:!0,message:"Chave atualizada com sucesso!"})}removeKey(e){if(this.keys.size<=1)return{ok:!1,message:"Voc\xEA precisa manter pelo menos 1 chave de API cadastrada."};let t=this.findKeyObj(e);return t?(this.keys.delete(t.id),{ok:!0,message:"Chave removida com sucesso."}):{ok:!1,message:"Chave n\xE3o encontrada."}}exportRawKeys(){return Array.from(this.keys.values()).map(e=>e.key)}size(){return this.keys.size}findKeyObj(e){if(this.keys.has(e))return this.keys.get(e);for(let t of this.keys.values())if(t.key===e)return t}},V=new me;var Fe=[{id:"gemini-3.8-flash",name:"Gemini 3.8 Flash (Flagship 2026)",description:"Modelo Flash topo de linha Set/2026. Agente, multimodal, thinking adaptativo. Recomendado para a maioria das quest\xF5es.",stable:!0},{id:"gemini-3.5-flash",name:"Gemini 3.5 Flash (R\xE1pido e Capaz)",description:"Alta performance multimodal. Excelente para quest\xF5es complexas com velocidade.",stable:!0},{id:"gemini-3.5-flash-lite",name:"Gemini 3.5 Flash-Lite (Cota Alta)",description:"Ultra-leve e econ\xF4mico. Maior RPM, ideal para alto volume de quest\xF5es simples.",stable:!0},{id:"gemini-3.1-pro",name:"Gemini 3.1 Pro (Racioc\xEDnio Profundo)",description:"Modelo pro de \xFAltima gera\xE7\xE3o: matem\xE1tica avan\xE7ada, l\xF3gica, exatas e quest\xF5es de alta complexidade.",stable:!0},{id:"gemini-2.5-flash",name:"Gemini 2.5 Flash (Est\xE1vel)",description:"Modelo comprovado de alt\xEDssima disponibilidade. Boa op\xE7\xE3o de fallback est\xE1vel.",stable:!0},{id:"gemini-2.5-pro",name:"Gemini 2.5 Pro (Avan\xE7ado)",description:"Alternativa pro de alta confiabilidade para quest\xF5es de racioc\xEDnio profundo.",stable:!0}],yo=["gemini-3.5-flash-lite","gemini-3.5-flash","gemini-3.8-flash","gemini-2.5-flash"],da={"gemini-3.7-flash":"gemini-3.8-flash","gemini-3.6-flash":"gemini-3.5-flash","gemini-2.0-flash":"gemini-2.5-flash","gemini-2.0-flash-lite":"gemini-3.5-flash-lite","gemini-1.5-flash":"gemini-3.5-flash","gemini-1.5-pro":"gemini-3.1-pro","gemini-1.0-pro":"gemini-2.5-flash","gemini-flash-latest":"gemini-3.8-flash"};function Qt(o){return da[o]??o}function ua(o,e){let a={temperature:0,maxOutputTokens:2e3,responseMimeType:"application/json",responseSchema:e??pa};return/lite/i.test(o)||(/gemini-3\.[0-9]+-?flash/i.test(o)?a.thinkingConfig={thinkingBudget:512}:/gemini-2\.[5-9]-?flash/i.test(o)&&(a.thinkingConfig={thinkingBudget:256})),a}var pa={type:"OBJECT",properties:{pageType:{type:"STRING",enum:["question","info","start","conclusion"]},mode:{type:"STRING",enum:["texto_livre","escolha_unica","escolha_multipla","verdadeiro_falso","preenchimento","acao_sem_resposta","categorizacao","ordenacao","arrastar_soltar"]},confidence:{type:"NUMBER"},rationale:{type:"STRING"},thinking:{type:"STRING"},memoryToStore:{type:"STRING"},learnedSkill:{type:"OBJECT",properties:{name:{type:"STRING"},description:{type:"STRING"},targetRule:{type:"STRING"}}},flowState:{type:"OBJECT",properties:{stepDescription:{type:"STRING"},expectedActionNext:{type:"STRING"}}},imageDescriptions:{type:"ARRAY",items:{type:"OBJECT",properties:{index:{type:"NUMBER"},description:{type:"STRING"},relevant:{type:"BOOLEAN"},associatedLabel:{type:"STRING"}}}},actions:{type:"ARRAY",items:{type:"OBJECT",properties:{t:{type:"STRING",enum:["val","chk","sel","clk","adv","js","drag"]},id:{type:"STRING"},name:{type:"STRING"},label:{type:"STRING"},v:{type:"STRING"},c:{type:"BOOLEAN"},co:{type:"ARRAY",items:{type:"NUMBER"}},from:{type:"STRING"},to:{type:"STRING"}},required:["t"]}},wrongAnswerDetected:{type:"BOOLEAN"},suggestStrategyChange:{type:"BOOLEAN"}},required:["pageType","mode","confidence","rationale","actions"]};function Ao(o){let e=o.trim().replace(/^google\//,"").replace(/^models\//,"");if(!e)return"gemini-3.8-flash";let t=Qt(e);return ce(t)?t:(console.warn(`[EasyQuiz] Modelo n\xE3o reconhecido: "${e}" \u2014 mantido como-est\xE1 (pode ser modelo novo da sua conta).`),e)}function jt(o,e){let t="";try{let a=JSON.parse(o);t=a.error?.message||a.message||""}catch{t=o.slice(0,160)}return/API_KEY_INVALID|API key not valid|key.*invalid|unregistered/i.test(t)?"Chave de API do Gemini inv\xE1lida ou n\xE3o autorizada no Google AI Studio.":/RESOURCE_EXHAUSTED|Quota exceeded|rate limit|quota/i.test(t)||e===429?`Cota do Gemini excedida (HTTP 429): ${t||"Aguarde"}`:e===404?`HTTP 404: ${t||"Modelo ou endpoint n\xE3o encontrado no Google AI Studio"}`:e===503||/overloaded/i.test(t)?`Servidores Google sobrecarregados (HTTP 503): ${t||"Aguardando"}`:t?`Erro Gemini (HTTP ${e}): ${t}`:`Falha na requisi\xE7\xE3o ao Gemini (HTTP ${e}).`}function ha(o){let e=o.trim(),t=e.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);if(t)try{return JSON.parse(t[1].trim())}catch{}try{return JSON.parse(e)}catch{}let a=e.match(/\{[\s\S]*\}/);if(a)try{return JSON.parse(a[0].trim())}catch{}try{let i=e.indexOf("{");if(i!==-1){let s=e.slice(i).trim();s=s.replace(/,\s*\{[^}]*$/,""),s=s.replace(/,\s*$/,"");let r=0,n=0,d=!1,c=!1;for(let m=0;m<s.length;m++){let l=s[m];if(c){c=!1;continue}if(l==="\\"){c=!0;continue}if(l==='"'){d=!d;continue}d||(l==="{"?r++:l==="}"?r=Math.max(0,r-1):l==="["?n++:l==="]"&&(n=Math.max(0,n-1)))}for(d&&(s+='"');n>0;)s+="]",n--;for(;r>0;)s+="}",r--;let u=JSON.parse(s);if(u&&typeof u=="object")return u}}catch{}throw new Error("Falha ao decodificar JSON da IA.")}var wo=(()=>{try{let o=typeof localStorage<"u"?localStorage.getItem("easyquiz_cached_models"):null;if(!o)return null;let e=JSON.parse(o);if(Array.isArray(e)){let t=e.filter(a=>a&&typeof a.id=="string"&&ce(a.id));return t.length>0?t:null}return null}catch{return null}})(),Bt=new Set;async function pt(o){let e=o.trim().replace(/^["']|["']$/g,"");if(!e)return Fe;let t=[`https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(e)}`,`https://generativelanguage.googleapis.com/v1/models?key=${encodeURIComponent(e)}`];for(let a of t)try{let i=await fetch(a,{headers:{"Content-Type":"application/json","x-goog-api-key":e}});if(!i.ok){let r=await i.text(),n=jt(r,i.status);if(n.includes("inv\xE1lida")||n.includes("n\xE3o autorizada"))throw new Error(n);continue}let s=await i.json();if(Array.isArray(s.models)&&s.models.length>0){let r=s.models.filter(n=>{let d=n.supportedGenerationMethods||[],c=(n.name||"").replace(/^models\//,""),u=d.includes("generateContent");return ce(c)&&u}).map(n=>{let d=n.supportedGenerationMethods||[],c=n.name.replace(/^models\//,""),u=n.displayName||c;return{id:c,name:u.includes(c)?u:`${u} (${c})`,description:n.description||"",stable:!/-preview|-experimental|-latest/i.test(c),supportsVision:!/embedding|tts|transcribe|live|image|sound|voice/i.test(c),supportsStructuredOutput:d.includes("generateContent"),supportedGenerationMethods:d,discoveredAt:Date.now()}});if(r.length>0){r.sort((n,d)=>{let c=u=>u==="gemini-3.8-flash"?200:u==="gemini-3.5-flash"?180:u==="gemini-3.5-flash-lite"?170:u==="gemini-3.1-pro"?160:u==="gemini-2.5-flash"?130:u==="gemini-2.5-pro"?120:u.includes("flash")?80:u.includes("pro")?50:10;return c(d.id)-c(n.id)}),wo=r;try{typeof localStorage<"u"&&localStorage.setItem("easyquiz_cached_models",JSON.stringify(r))}catch{}return r}}}catch(i){if(i.message?.includes("Chave de API"))throw i}return Fe}async function ht(o){let e=o.trim().replace(/^["']|["']$/g,"");if(!e)return{ok:!1,message:"Insira sua chave de API."};try{let a=await pt(e);if(a.length>0&&a!==Fe){let i=a[0];return{ok:!0,message:`Chave v\xE1lida! ${a.length} modelos Gemini dispon\xEDveis em sua conta. Recomendado: ${i.name}`,models:a}}}catch(a){return{ok:!1,message:a instanceof Error?a.message:String(a)}}let t=["gemini-3.8-flash","gemini-3.5-flash","gemini-2.5-flash"];for(let a of t)for(let i of["v1beta","v1"]){let s=`https://generativelanguage.googleapis.com/${i}/models/${a}:generateContent?key=${encodeURIComponent(e)}`;try{if((await fetch(s,{method:"POST",headers:{"Content-Type":"application/json","x-goog-api-key":e},body:JSON.stringify({contents:[{role:"user",parts:[{text:"PING"}]}],generationConfig:{maxOutputTokens:5}})})).ok)return{ok:!0,message:`Chave validada com sucesso no ${a} (${i})!`,models:Fe}}catch{}}return{ok:!1,message:"Chave de API inv\xE1lida, sem cota ou sem permiss\xE3o para modelos Gemini."}}async function Ft(o,e){let t=e.map(c=>c.trim().replace(/^["']|["']$/g,"")).filter(c=>c.length>5);if(t.length===0)return{ok:!1,model:o,key:"",message:"Nenhuma chave dispon\xEDvel."};let a=Qt(Ao(o)),i=JSON.stringify({contents:[{role:"user",parts:[{text:"PING"}]}],generationConfig:{maxOutputTokens:5}}),s={"Content-Type":"application/json"};async function r(c,u,m){let l=new AbortController,p=setTimeout(()=>l.abort(),m);try{let h=`https://generativelanguage.googleapis.com/v1beta/models/${u}:generateContent?key=${encodeURIComponent(c)}`,f=await fetch(h,{method:"POST",headers:{...s,"x-goog-api-key":c},body:i,signal:l.signal});if(clearTimeout(p),f.ok)return{ok:!0,model:u,key:c,message:`Modelo '${u}' validado com sucesso!`};let g=await f.text().catch(()=>"");throw new Error(`HTTP ${f.status}: ${g.slice(0,80)}`)}catch(h){throw clearTimeout(p),h}}if(t.length>=2){let c=t.slice(0,6);try{return await Promise.any(c.map(m=>r(m,a,8e3)))}catch{}}let n=t[0],d=[a,...yo.filter(c=>c!==a)];for(let c of d)try{let u=await r(n,c,4e3);return c!==a&&(u.message=`Modelo preferido indispon\xEDvel. Validado via fallback '${c}'.`),u}catch{}return{ok:!1,model:a,key:n,message:"Nenhum modelo Gemini respondeu. Verifique sua chave e cota."}}async function ma(o,e,t,a,i){let s=["v1beta","v1"],r=new Error(`Falha ao consultar modelo ${o}`),d={...ua(o,i)};for(let c of s){if(a.aborted)throw new Error("Opera\xE7\xE3o cancelada pelo usu\xE1rio.");let u=`https://generativelanguage.googleapis.com/${c}/models/${o}:generateContent?key=${encodeURIComponent(e)}`,m=Date.now();try{let l=await fetch(u,{method:"POST",headers:{"Content-Type":"application/json","x-goog-api-key":e},body:JSON.stringify({...t,generationConfig:d}),signal:a});if(!l.ok){let f=await l.text();if(l.status===400){let b=/thinking/i.test(f),v=/response_schema|responseSchema|Repeated map key|PROTO payload/i.test(f);if((b||v)&&(d.thinkingConfig||d.responseSchema)){let x={...d};b&&delete x.thinkingConfig,v&&(delete x.responseSchema,delete x.responseMimeType),d=x;let w=await fetch(u,{method:"POST",headers:{"Content-Type":"application/json","x-goog-api-key":e},body:JSON.stringify({...t,generationConfig:d}),signal:a});if(w.ok){let T=await w.json(),C=T.candidates?.[0];if(C?.content?.parts?.[0]?.text)return V.markSuccess(e,Date.now()-m),{rawText:C.content.parts[0].text,data:T,usedModel:o,usedKey:e}}let y=await w?.text?.().catch(()=>"")??f,E=jt(y,l.status);throw new Error(`[${o}|${me.maskKey(e)}] ${E}`)}}let g=jt(f,l.status);if(l.status===404&&c==="v1beta")continue;throw l.status===429?(V.markQuotaHit(e,8e3),Eo(e,o,1e4),new Error(`[${o}|${me.maskKey(e)}] ${g}`)):(l.status===503||/no capacity|overloaded|unavailable/i.test(f)?(V.markOverloaded(e,5e3),Bt.add(o)):l.status===403||/API_KEY_INVALID/i.test(f)?V.markInvalid(e,g):l.status===404&&Bt.add(o),new Error(`[${o}|${me.maskKey(e)}] ${g}`))}let p=await l.json(),h=p.candidates?.[0];if(!h||!h.content?.parts?.[0]?.text)throw new Error(`[${o}|${me.maskKey(e)}] A IA n\xE3o retornou uma resposta estruturada v\xE1lida.`);return V.markSuccess(e,Date.now()-m),{rawText:h.content.parts[0].text,data:p,usedModel:o,usedKey:e}}catch(l){if(a.aborted)throw l;r=l;let p=r.message||"";if(p.includes("404")||/no longer available/i.test(p)){Bt.add(o);break}if(p.includes("429")||p.includes("Quota"))break}}throw r}var ut=new Map;function xo(o,e){let t=`${o}::${e}`,a=ut.get(t);return a===void 0?!1:Date.now()>a?(ut.delete(t),!1):!0}function Eo(o,e,t=1e4){ut.set(`${o}::${e}`,Date.now()+t)}function Ut(){ut.clear()}async function mt(o,e,t,a,i,s){if(i?.aborted)throw new Error("Opera\xE7\xE3o cancelada pelo usu\xE1rio.");let r=Array.isArray(t.apiKeys)&&t.apiKeys.length>0?t.apiKeys:t.apiKey?[t.apiKey]:[];V.init(r);let n=t.apiKey.trim().replace(/^["']|["']$/g,""),d=V.getBestKey()||n;if(!d)throw new Error("Nenhuma chave de API do Gemini configurada ou dispon\xEDvel.");let c=Ao(t.model);if(!wo&&d&&pt(d).catch(()=>{}),i?.aborted)throw new Error("Opera\xE7\xE3o cancelada pelo usu\xE1rio.");let u=Date.now(),m=Ze(o,e,t),l=[{text:m}];for(let S=0;S<e.length;S++){let z=e[S],D=z.associatedLabel||(z.alt?`Imagem: ${z.alt}`:`Imagem ${S+1}`);if(z.captureStatus==="text_only"||!z.base64){let q=z.textContext||z.alt||"";l.push({text:`[CONTEXTO_IMAGEM_${S+1} - V\xCDNCULO: ${D}]: ${q}`})}else l.push({text:`[ANEXO VISUAL ${S+1} - V\xCDNCULO: ${D}]:`}),l.push({inline_data:{mime_type:z.mediaType,data:z.base64}})}let p={system_instruction:{parts:[{text:s?.systemPromptOverride??bo}]},contents:[{role:"user",parts:l}]},h=Qt(c),f=yo.filter(S=>S!==h),b=V.getAllKeys().length,v=S=>b<=1?1:b>=5&&S>0?3:2,x=new Set,w=(S,z)=>{let D=/pro/i.test(S),q=/lite/i.test(S);return D?z===0?15e3:z===1?2e4:25e3:q?z===0?7e3:z===1?1e4:14e3:z===0?9e3:z===1?14e3:2e4},y=async(S,z)=>{if(z.length===0||i?.aborted)return null;let D=z.map(()=>new AbortController),q=()=>D.forEach(M=>{try{M.abort()}catch{}});i?.addEventListener("abort",q,{once:!0});let k=z.map(M=>`${M.model.replace("gemini-","")}/${M.label}`).join(" | ");a?.(`\u26A1 ${S}: ${z.length} slot(s) [${k}]...`,"info");try{let M=z.map(async(X,W)=>{let J=D[W],Z=setTimeout(()=>{try{J.abort(new Error(`Timeout ${X.timeout/1e3}s (${X.model}|${X.label})`))}catch{J.abort()}},X.timeout);try{let G=await ma(X.model,X.key,p,J.signal,s?.generationSchemaOverride);clearTimeout(Z);let oe=vo(ha(G.rawText));return oe.usedModel=G.usedModel,oe.durationMs=Date.now()-u,oe.promptSent=m,oe.tokensUsed=G.data.usageMetadata?.totalTokenCount,oe.promptTokens=G.data.usageMetadata?.promptTokenCount,oe.candidatesTokens=G.data.usageMetadata?.candidatesTokenCount,oe.rawResponse=G.rawText,D.forEach((fe,be)=>{if(be!==W)try{fe.abort(new Error("Cancelado: vencedor respondeu."))}catch{fe.abort()}}),{plan:oe,rawUsage:G.data.usageMetadata,usedModel:G.usedModel,usedKey:G.usedKey,slotLabel:X.label}}catch(G){clearTimeout(Z);let oe=G instanceof Error?G.message:String(G);throw(oe.includes("429")||oe.includes("Quota")||oe.includes("RESOURCE_EXHAUSTED"))&&(Eo(X.key,X.model,1e4),V.markQuotaHit(X.key,8e3)),G}}),B=await Promise.any(M);return i?.removeEventListener("abort",q),V.markWinner(B.usedKey),B}catch(M){return i?.removeEventListener("abort",q),M instanceof AggregateError&&M.errors.length>0?I=M.errors.map(B=>B instanceof Error?B.message:String(B)).join(" | "):M instanceof Error&&(I=M.message),console.warn(`[EasyQuiz ${S}] Falha na onda:`,I),null}},T=(b<=1?1:1+Math.ceil((b-1)/2))+4,C=0,I="",A=0;for(;C<T;){if(i?.aborted)throw new Error("Opera\xE7\xE3o cancelada pelo usu\xE1rio.");let S=V.getRoundRobinKeys(b),z=S.filter(J=>!x.has(`${J.key}::${h}`)&&!xo(J.key,h)),D,q;if(z.length>0)D=h,q=z;else{let J=f;D=J[A%J.length]||h,A++;let Z=S.filter(G=>!x.has(`${G.key}::${D}`)&&!xo(G.key,D));q=Z.length>0?Z:S.filter(G=>!x.has(`${G.key}::${D}`))}if(q.length===0){if(A<f.length)continue;break}let k=q.slice(0,v(C));if(k.length===0)break;let M=w(D,C),B=k.map(J=>(x.add(`${J.key}::${D}`),{model:D,key:J.key,label:J.label||"Chave",timeout:M})),X=C===0?"Onda 1":`Onda ${C+1}`,W=await y(X,B);if(W){let J=W.plan.durationMs||Date.now()-u,Z=me.maskKey(W.usedKey);return a?.(`\u2705 ${J}ms via '${W.usedModel}' (${W.slotLabel}: ${Z})`,"info"),W}C++}throw new Error(I||"Todas as tentativas falharam. Verifique suas chaves de API e cotas.")}var ga=[/\bfetch\b/i,/\bXMLHttpRequest\b/i,/\bWebSocket\b/i,/\b(?:localStorage|sessionStorage|indexedDB)\b/i,/\b(?:eval|Function|AsyncFunction|GeneratorFunction)\b/i,/\bimport(?:Scripts)?\b/i,/\bnavigator\s*\.\s*credentials\b/i,/\b(?:cookie|location\s*=|history\s*\.)/i,/\bwindow\s*\[\s*['"](?:fetch|eval|Function|localStorage|sessionStorage)/i];function Ne(o){let e=o?.engine||"smart",t=new Set(["dom","framework","keyboard","drag"]);return o?.autoAdvance&&t.add("navigation"),e==="javascript"&&t.add("javascript"),{engine:e,capabilities:t,maxAttemptsPerAction:e==="command"?1:2,maxActionMs:e==="command"?1500:3e3,allowJavaScript:e==="javascript",allowNavigation:!!o?.autoAdvance}}function Xt(o,e){if(o.t==="js"&&!e.allowJavaScript)throw new Error("A\xE7\xE3o JavaScript bloqueada pela engine atual. Use o motor JavaScript explicitamente.");if(o.t==="adv"&&!e.allowNavigation)throw new Error("Avan\xE7o autom\xE1tico bloqueado pela pol\xEDtica atual.")}function qo(o){if(!o.trim())throw new Error("JavaScript recusado: c\xF3digo vazio.");if(o.length>8e3)throw new Error("JavaScript recusado: c\xF3digo acima do limite operacional.");if(ga.find(t=>t.test(o)))throw new Error("JavaScript recusado: acesso externo, persist\xEAncia ou avalia\xE7\xE3o din\xE2mica n\xE3o permitidos.");if(!/^\s*(?:\/\/[^\n]*\n|\/\*[\s\S]*?\*\/|[\s\S])*\$eq\./.test(o)&&!o.includes("$eq."))throw new Error("JavaScript recusado: use somente a API declarativa $eq.")}var Co="__eq_layout_cache__";var gt=null;function ko(){if(gt)return gt;try{let o=sessionStorage.getItem(Co);if(!o)return null;let e=JSON.parse(o);return e.hostname!==location.hostname||Date.now()-e.createdAt>18e5?null:(gt=e,e)}catch{return null}}function fa(o){gt=o;try{sessionStorage.setItem(Co,JSON.stringify(o))}catch{}}function To(){let o=ko();if(o)return o;let e=[],t=null,a=["nav","aside","header","footer",'[role="navigation"]','[role="banner"]','[role="complementary"]','[class*="sidebar" i]','[class*="lesson-list" i]','[class*="task-list" i]','[class*="mission" i]','[class*="progress-list" i]','[class*="_ka-drawer_" i]','[class*="breadcrumb" i]','[class*="game-sidebar" i]','[class*="leaderboard" i]','[class*="side-panel" i]'];for(let r of a)try{let n=document.querySelector(r);if(!n)continue;let d=n.getBoundingClientRect();if(d.width<10||d.height<10)continue;e.push(r)}catch{}let i=['[role="main"]',"main",".perseus-renderer",".framework-perseus",'[data-test-id="exercise-content"]',".main-content","#main-content",'[class*="exercise-content" i]','[class*="question-area" i]'];for(let r of i)try{let n=document.querySelector(r);if(!n)continue;let d=n.getBoundingClientRect();if(d.width>window.innerWidth*.3&&d.height>100){t=r;break}}catch{}let s={knownSidebarSelectors:e,mainContentSelector:t,createdAt:Date.now(),hostname:location.hostname};return fa(s),console.log(`[EasyQuiz LayoutCache] Snapshot criado: ${e.length} sidebars, main: ${t||"N/A"}`),s}function ba(){return ko()?.knownSidebarSelectors??[]}function So(o){let e=ba();if(e.length===0)return!1;try{for(let t of e)if(o.closest(t))return!0}catch{}return!1}var Ue=['input:not([type="hidden"])',"textarea","select","button","a","label",'[role="button"]','[role="link"]','[role="radio"]','[role="checkbox"]','[role="option"]','[role="treeitem"]','[role="menuitemcheckbox"]','[role="menuitemradio"]','[contenteditable="true"]','[draggable="true"]',"[aria-grabbed]","[aria-dropeffect]","[data-widget-type]",".perseus-drag-item",".sortable-item",'[data-testid*="drag" i]','[data-testid*="card" i]','[data-testid*="option" i]','[data-testid*="choice" i]','[data-testid*="category" i]',"[data-choice]","[data-option]","[data-answer]","[data-value]",".quiz-option",".option-card",".choice-card",'[class*="option-card" i]','[class*="choice-card" i]','[class*="option-item" i]','[class*="choice-item" i]','[class*="answer-item" i]','[class*="alternative" i]','li[class*="choice" i]','li[class*="option" i]','li[class*="answer" i]','[data-role="dropzone"]',"[data-category]","[data-item-id]","[data-params][jsmodel]",'[class*="draggable-item" i]','[class*="drag-item" i]','[class*="sortable-card" i]','[class*="card-option" i]','[class*="tile" i][class*="option" i]','[data-testid="perseus-expression-input"]','[data-testid="perseus-math-input"]','[data-testid*="perseus-input" i]',".mq-editable-field",".mq-root-block",".choice-radio-btn",'[class*="choice_" i]','[class*="perseus-radio" i]','[class*="perseus-checkbox" i]','[class*="expression-editor" i]','[class*="math-input" i]','[class*="perseus-dropdown" i]','[class*="perseus"] [role="listbox"]','[class*="perseus"] [role="radio"]','[class*="perseus"] [role="combobox"]','.perseus-widget-container [role="button"]',".perseus-widget-container input",".perseus-widget-container select",'.number-line [role="slider"]','[class*="interactive-graph" i]',".interactive-component"].join(","),tt=/(verificar|checar|check|conferir|validar|próxim[oa]|next|continuar|continue|avançar|prosseguir|enviar|submit|concluir|finalizar|terminar|começar|iniciar|start|vamos lá|próxima tarefa|next task|próxima pergunta|next question|marcar como concluíd[oa]|mostrar resumo|entendi|compreendi|ok|leitura concluída|seguir|ir para o exercício|fazer o teste|próximo artigo|ir para a aula)/i,qe=/(\banterior\b|\bvoltar\b|\bback\b|\bprev\b|\bprevious\b|recomeçar|\brestart\b|\breplay\b|\bretornar\b)/i,va=0;function Vt(o){try{let e=o.closest('[hidden], [style*="display: none"], [style*="display:none"], [aria-hidden="true"]');if(e&&!he(e))return!1}catch{}try{let e=window.getComputedStyle?window.getComputedStyle(o):o.style;if(e&&(e.display==="none"||e.visibility==="hidden"))return!1}catch{}try{if(typeof o.getBoundingClientRect=="function"){let e=o.getBoundingClientRect();if(e.width>0||e.height>0)return!0}}catch{}return(o.textContent||"").trim().length>0}function te(o){try{if(typeof CSS<"u"&&typeof CSS.escape=="function")return CSS.escape(o)}catch{}return String(o).replace(/["\\]/g,"\\$&")}function Q(o){let e=o;if(!e||typeof e.isConnected=="boolean"&&!e.isConnected||he(e))return!1;let t=e.tagName?.toLowerCase();if(["input","select","textarea","button"].includes(t)){let a=e.type?.toLowerCase();if(a==="checkbox"||a==="radio"){if(e.id)try{let s=e.ownerDocument?.querySelector(`label[for="${te(e.id)}"]`);if(s&&Vt(s))return!0}catch{}let i=e.closest('label, .option-card, .quiz-option, .choice, .answer, [role="radio"], [role="checkbox"], [class*="option" i], [class*="choice" i], [class*="item" i], li, tr');if(i&&i!==e&&Vt(i))return!0}try{if(!e.closest('[hidden], [style*="display: none"], [style*="display:none"], [aria-hidden="true"]')){let s=window.getComputedStyle?window.getComputedStyle(e):e.style;if(!s||s.display!=="none"&&s.visibility!=="hidden"){if(typeof e.getBoundingClientRect=="function"){let r=e.getBoundingClientRect();if(r.width>0||r.height>0)return!0}return!0}}}catch{}}return Vt(e)}function xa(o){if(o==null)return"";if(typeof o=="string")return o;if(typeof o=="number"||typeof o=="boolean")return String(o);if(o instanceof Node)return o.textContent||"";try{if(typeof o?.toString=="function"){let e=o.toString();if(typeof e=="string")return e}}catch{}return""}function Y(o,e=500){return xa(o).replace(/\s+/g," ").trim().slice(0,e)}function ya(o){let e=o.dataset.easyquizId;if(e)return e;let t=`eq-${Date.now().toString(36)}-${(va+=1).toString(36)}`;return o.dataset.easyquizId=t,t}function he(o){return o?!!(o.closest('#easyquiz-shadow-root, .eq-sidebar, .eq-launcher, [data-easyquiz-ignore="true"], .btn-inject-eq, #btn-inject-script')||o.getAttribute?.("data-easyquiz-ignore")==="true"):!1}function Ce(o){if(!o)return!1;if(So(o))return!0;let e=o.closest('aside, nav, [class*="task-list" i], [class*="lesson-list" i], [class*="mastery" i], [class*="sidebar" i], [class*="side-bar" i], [class*="side_bar" i], [class*="unit-nav" i], [class*="course-nav" i], [data-testid*="sidebar" i], [data-testid*="task-list" i], [class*="practice-tab" i], [class*="progress-nav" i], [role="navigation"], [role="complementary"]');if(e&&!e.querySelector('.perseus-renderer, .framework-perseus, [data-test-id*="exercise" i]'))return!0;if(Xe())try{let t=o.getBoundingClientRect();if(!!document.querySelector(".perseus-renderer, .framework-perseus")&&t.width>0&&t.left>=0&&t.right<window.innerWidth*.32)return!0}catch{}return!1}function Xe(){try{if(/khanacademy\.org/i.test(window.location.href)||document.querySelector(".perseus-renderer, .framework-perseus"))return!0}catch{}return!1}var et=/(leaderboard|scoreboard|placar|ranking|trophy|pause|pausar|mute|mutar|audio|sound|som|música|music|configuraç|settings|theme|ajuda|help|report|denunciar|feedback|power-?up|streak|coins|fullscreen|full-screen|read-?aloud|audio-?player|(?:audio|sound|som|media)[-_ ]*volume|volume[-_ ]*(?:slider|control|level|btn|button|icon|mute)|vol-slider)/i;function _(o){if(!o||typeof o.getAttribute!="function"||typeof Element<"u"&&!(o instanceof Element))return!1;if(he(o))return!0;let e=o.tagName?.toLowerCase();if(["select","textarea"].includes(e)||e==="input"&&!["button","submit","reset"].includes((o.type||"").toLowerCase()))return!1;let a=o.closest?.('button, a, [role="button"], [class*="leaderboard" i], [data-testid*="leaderboard" i], [class*="scoreboard" i], [class*="trophy" i]')||o,i=String(a.getAttribute?.("data-testid")||a.getAttribute?.("data-test-id")||a.getAttribute?.("id")||""),s=String(a.getAttribute?.("aria-label")||""),r=String(a.getAttribute?.("title")||""),n=typeof a.className=="string"?a.className:typeof a.className?.baseVal=="string"?a.className.baseVal:"",d=Y(a.textContent,60);return!!(et.test(i)||et.test(s)||et.test(r)||et.test(n)||d.length>0&&d.length<=25&&et.test(d))}function re(o){if(!o||typeof o.getAttribute!="function"||typeof Element<"u"&&!(o instanceof Element)||he(o)||_(o)||o.closest?.('.option-card, .choice-card, .quiz-option, [class*="option-card" i], [class*="choice-card" i], [class*="option-item" i], [class*="choice-item" i], [class*="answer-item" i], [data-testid*="option" i], [data-testid*="choice" i], [data-choice], [data-option], [data-answer], [role="radio"], [role="checkbox"], [role="option"]')||o.closest?.("header, nav, aside"))return!1;let e=typeof HTMLInputElement<"u"&&o instanceof HTMLInputElement||typeof HTMLButtonElement<"u"&&o instanceof HTMLButtonElement?o.value:"",t=Y(o.getAttribute?.("aria-label")||o.textContent||o.getAttribute?.("value")||e),a=o.type,i=t.replace(/[\d\(\)\[\]\u2192>\u2022\-\/\\]+/g," ").trim(),s=String(o.getAttribute?.("data-testid")||o.getAttribute?.("data-test-id")||o.getAttribute?.("id")||o.getAttribute?.("href")||"").toLowerCase();return qe.test(i)||qe.test(t)?!1:tt.test(i)||tt.test(t)||s.includes("next")||s.includes("check")||s.includes("continue")||s.includes("proximo")||s.includes("forward")?!0:/^\d{1,3}$/.test(t.trim())?!!o.closest?.('[class*="pagination" i], [class*="pager" i], [class*="page-nav" i], [class*="step-indicator" i], [class*="breadcrumb" i], [aria-label*="p\xE1gina" i], [aria-label*="page" i], [role="navigation"], nav, [class*="steps" i]'):!1}function Kt(o){let e=[];try{let t=o.querySelectorAll('annotation[encoding*="tex"], [data-tex], [data-latex], math');for(let i of Array.from(t).slice(0,3)){let r=(i.getAttribute("data-tex")||i.getAttribute("data-latex")||i.textContent||"").trim().replace(/\s+/g," ");r&&r.length>1&&r.length<200&&e.push(`[Math: ${r}]`)}let a=o.querySelectorAll("img, svg");for(let i of Array.from(a).slice(0,2)){let s=(i.getAttribute("alt")||i.getAttribute("aria-label")||"").trim();if(s)e.push(`[Img: ${s}]`);else if(i.tagName.toLowerCase()==="svg"){let r=i.querySelector("title")?.textContent?.trim();r&&e.push(`[SVG: ${r}]`)}}}catch{}return e.length>0?" "+e.join(" "):""}function Gt(o){let e=o.closest("tr");if(e){let c=e.querySelector("th, td:first-child"),u=c&&c!==o.closest("td")?Y(c.textContent,100):"",m=Y(o.closest("label, td")?.textContent||"",50);if(u&&m)return`${u}: ${m}`}let t=o.closest('.dropdown-row, [class*="dropdown-row" i], [class*="select-row" i]');if(t){let c=t.querySelector('.dropdown-label, [class*="label" i]'),u=c&&c!==o?Y(c.textContent,150):"";if(u)return u}let a=o.getAttribute("aria-label");if(a)return Y(a);let i=o.getAttribute("aria-labelledby");if(i){let c=i.split(/\s+/).map(u=>document.getElementById(u)?.textContent).filter(Boolean).join(" ");if(c.trim())return Y(c)}if("labels"in o&&o.labels){let c=Array.from(o.labels??[]).map(u=>u.textContent).join(" ");if(c.trim()){let u=Kt(o.parentElement||o);return Y(c+u)}}let s=o.closest('.docssharedWizToggleLabeledContainer, [role="listitem"], .answer, label, .quiz-option, .form-check, .option-card, .choice-radio-btn, [data-testid*="choice"]');if(s&&s!==o){let c=Y(s.textContent);if(c){let u=Kt(s);return Y(c+u)}}let r=o instanceof HTMLInputElement||o instanceof HTMLButtonElement?o.value:"",n=o.getAttribute("placeholder")||o.getAttribute("title")||o.textContent||r||"",d=Kt(o);return Y(n+d)}function Jt(o,e){let a=typeof HTMLSelectElement<"u"&&o instanceof HTMLSelectElement||o.tagName.toLowerCase()==="select"?o:null,i=o;o.dataset.easyquizRole=e;let s=o.tagName.toLowerCase(),r=["input","textarea","select","button"].includes(s)?s:"other",n=o.getAttribute("role")||"",d=(o.getAttribute("data-testid")||o.getAttribute("data-test-id")||"").toLowerCase(),c=(o.className&&typeof o.className=="string"?o.className:"").toLowerCase(),u=o.getAttribute("draggable")==="true"||o.classList.contains("perseus-drag-item")||o.classList.contains("sortable-item")||c.includes("cursor-grab")||!!o.getAttribute("aria-grabbed")||/drag|card|option|item/i.test(d)||/drag|card-item|sortable/i.test(c),m=o.getAttribute("data-role")==="dropzone"||o.classList.contains("category-container")||o.hasAttribute("data-category")||!!o.getAttribute("aria-dropeffect")||/drop|category|bucket/i.test(d)||/dropzone|category-box|bucket|target-zone/i.test(c),p=Y((u?"draggable":m?"dropzone":"")||i.type||n||r,40),h="";if(i.type==="checkbox"||i.type==="radio"||n==="radio"||n==="checkbox"){let w=i.checked||o.getAttribute("aria-checked")==="true",y=i.value&&i.value!=="on"?i.value:o.getAttribute("data-value")||"";h=w?y?`checked:${y}`:"checked":y||"unchecked"}else if(r==="button"||s==="a"||e==="navigation"||re(o))h="";else{let w=typeof o.value=="string"||typeof o.value=="number"?o.value:"";h=Y(w||o.getAttribute("data-category")||"",2e3)}let f=[];if(a&&a.options)for(let w of Array.from(a.options).slice(0,80))f.push({value:Y(w.value),label:Y(w.textContent)});else if(n==="combobox"||n==="listbox"||c.includes("select")||c.includes("dropdown")){let w=o.getAttribute("aria-controls")||o.getAttribute("aria-owns"),y=w?document.getElementById(w):o;if(y){let E=y.querySelectorAll('[role="option"], li, .dropdown-item, .option');for(let T of Array.from(E).slice(0,80)){let C=Y(T.textContent);C&&f.push({value:T.getAttribute("data-value")||T.getAttribute("value")||C,label:C})}}}let g=!!(i.required||o.getAttribute("aria-required")==="true"),b=!!(i.disabled||o.getAttribute("aria-disabled")==="true"),v=ya(o);return{id:o.id||v,tag:r,type:p,label:Gt(o),name:Y(i.name||o.getAttribute("name")||"",180),value:h,options:f,required:g,disabled:b,role:e}}var Lo=['[data-testid="exercise-question-number"]','[data-testid="perseus-expression-input"]','[data-testid="perseus-math-input"]','[data-testid="exercise-header"]','[class*="ExerciseWrapper"]','[class*="exercise-wrapper" i]','[class*="task-challenge" i]','[class*="task-body" i]',".perseus-renderer",".framework-perseus",'[data-test-id*="exercise" i]','[data-testid*="exercise" i]',".Qr7Oae","[data-item-id]",".freebirdFormviewerViewItemsItemItem",".que",".question-holder",".quiz-question",".question_holder",".display_question",'[data-functional-selector*="question"]',".question-container",'[class*="classification-layout" i]','[class*="quiz-container" i]','[data-cy="quiz-container"]',"[data-question-id]",'[data-testid*="question" i]','[class*="question-container" i]','[class*="question" i]','[class*="pergunta" i]','[class*="categoriz" i]','[role="group"]',"article","form","section","main"].join(",");function ft(o){if(!Q(o)||Ce(o))return-1/0;let e=o.getBoundingClientRect(),t=Array.from(o.querySelectorAll(Ue)).filter(g=>Q(g)&&!Ce(g)),a=Y(o.innerText||o.textContent||"",4e3).length;if(a<10||!t.length&&a<60)return-1/0;let i=Math.max(1,window.innerWidth*window.innerHeight),s=Math.max(1,e.width*e.height),r=Math.min(1,s/i);if(r>.8)return-1/0;let n=e.top+e.height/2,d=e.left+e.width/2,c=Math.abs(n-window.innerHeight/2)/Math.max(1,window.innerHeight),u=Math.abs(d-window.innerWidth/2)/Math.max(1,window.innerWidth),m=a>40?35:0,l=e.top>=0&&e.bottom<=window.innerHeight?25:0,p=o.matches?.('.perseus-renderer, .framework-perseus, [class*="ExerciseWrapper"], [class*="exercise-wrapper" i], [class*="task-challenge" i], [class*="task-body" i], [data-test-id*="exercise" i]')?50:0,h=u>.35?150:0,f=r>.85?100:0;return Math.min(10,t.length)*15+Math.min(60,a/20)+m+l+p-r*30-c*20-h-f}function Ve(o){let e=o,t=e.closest('.perseus-renderer, .framework-perseus, [class*="ExerciseWrapper"], [class*="exercise-wrapper" i], [class*="task-challenge" i], [class*="task-body" i], [data-testid="exercise-header"]');if(t&&t!==document.body)return t;if(e.matches?.('article, [data-test-id*="exercise" i], [data-testid*="exercise" i], .perseus-renderer, .framework-perseus, [class*="question-container" i], .que')&&e.tagName.toLowerCase()!=="main"&&e.tagName.toLowerCase()!=="body")return e;for(;e.parentElement&&e.parentElement!==document.body&&e.parentElement!==document.documentElement;){let a=e.parentElement,i=a.tagName.toLowerCase();if(["header","footer","nav","aside"].includes(i))break;if(a.matches?.('article, [data-test-id*="exercise" i], [data-testid*="exercise" i], .perseus-renderer, .framework-perseus, [class*="question-container" i], .que')&&i!=="main"&&i!=="body"){e=a;break}let s=Y(e.innerText||e.textContent||"",1e4),r=Y(a.innerText||a.textContent||"",1e4),n=e.querySelectorAll(Ue).length,d=a.querySelectorAll(Ue).length;if(s.length<150&&r.length>s.length&&d<=n+4&&i!=="main"&&i!=="body"){e=a;continue}break}return e}function Aa(o,e=16e3){let t=o.cloneNode(!0);t.querySelectorAll('nav, aside, [class*="sidebar" i], [class*="lesson" i], [class*="_ka-drawer_" i], [class*="navigation" i], [role="navigation"]').forEach(m=>m.remove());let a=Array.from(t.querySelectorAll(".katex"));for(let m of a){let l=m.querySelector('annotation[encoding="application/x-tex"]');if(l&&l.textContent){let p=` $${l.textContent.trim()}$ `,h=document.createTextNode(p);m.replaceWith(h)}}let i=Array.from(t.querySelectorAll("math"));for(let m of i)try{let l=wa(m);if(l){let p=document.createTextNode(` ${l} `);m.replaceWith(p)}}catch{}let s=Array.from(t.querySelectorAll(".mq-root-block, .mq-editable-field"));for(let m of s){let l=m.textContent?.trim();l&&(m.textContent=` [math: ${l}] `)}let r=Array.from(t.querySelectorAll("sup"));for(let m of r)m.textContent=`^{${m.textContent?.trim()||""}}`;let n=Array.from(t.querySelectorAll("sub"));for(let m of n)m.textContent=`_{${m.textContent?.trim()||""}}`;let d="";t.querySelectorAll(".sr-only, .visuallyhidden, .visually-hidden, [aria-label], [aria-describedby]").forEach(m=>{let l=m.getAttribute("aria-label")||m.getAttribute("aria-describedby")||"",p=m.textContent?.trim()||"";m.closest("button, input, a")||(l&&!d.includes(l)&&(d+=`
[Dado do Gr\xE1fico/Imagem: ${l}]`),p&&!l&&p.length>5&&!d.includes(p)&&(d+=`
[Tabela Oculta do Gr\xE1fico: ${p}]`))});let u=(t.innerText&&t.innerText.trim().length>0?t.innerText:t.textContent||"")+(d?`

--- DADOS OCULTOS DA QUEST\xC3O ---
${d}`:"");return Y(u,e)}function wa(o){let e=[];function t(a){let i=a.tagName?.toLowerCase();if(i==="mfrac"){let s=Array.from(a.children),r=s[0]?.textContent?.trim()||"?",n=s[1]?.textContent?.trim()||"?";e.push(`(${r}/${n})`);return}if(i==="msqrt"){e.push(`sqrt(${a.textContent?.trim()||"?"})`);return}if(i==="msup"){let s=Array.from(a.children),r=s[0]?.textContent?.trim()||"?",n=s[1]?.textContent?.trim()||"?";e.push(`${r}^{${n}}`);return}if(i==="msub"){let s=Array.from(a.children),r=s[0]?.textContent?.trim()||"?",n=s[1]?.textContent?.trim()||"?";e.push(`${r}_{${n}}`);return}if(i==="mn"||i==="mi"||i==="mo"||i==="mtext"){e.push(a.textContent?.trim()||"");return}for(let s of Array.from(a.children))t(s)}return t(o),e.join(" ")}function Mo(o){let e=o,t=e.closest('main, [role="main"], article, form, [data-test-id*="exercise" i], [data-testid*="exercise" i], .framework-perseus, section');if(t&&t!==document.body&&Q(t))return t;let a=0;for(;e.parentElement&&e.parentElement!==document.body&&a<3;)e=e.parentElement,a++;return e||document.body}var vt=new Map,Ea=3e4,Io=8;function qa(){let o=window.location.href,e=vt.get(o);return e?Date.now()-e.timestamp>Ea?(vt.delete(o),null):e.selector:null}function ot(o){try{if(ft(o)<Io)return;let e=o.tagName.toLowerCase(),t=o.id?`#${o.id}`:"",a=o.dataset.easyquizId?`[data-easyquiz-id="${o.dataset.easyquizId}"]`:"",i=Array.from(o.classList).slice(0,3).map(r=>`.${r}`).join(""),s=`${e}${t}${a}${i}`;s&&s!=="body"&&s!=="html"&&vt.set(window.location.href,{selector:s,timestamp:Date.now()})}catch{}}function le(){let o=qa();if(o){try{let n=document.querySelector(o);if(n&&Q(n)&&!Ce(n)&&ft(n)>=Io)return Ve(n)}catch{}vt.delete(window.location.href)}let e=document.querySelector('[class*="classification-layout" i], [class*="quiz-container" i][class*="classification" i]');if(e&&Q(e))return ot(e),e;if(Xe()){let d=Array.from(document.querySelectorAll(".perseus-renderer, .framework-perseus")).filter(c=>{if(!Q(c)||Ce(c))return!1;let u=c.getBoundingClientRect();return u.width>100&&u.height>50&&u.bottom>0&&u.top<window.innerHeight});if(d.length>0){d.sort((u,m)=>{let l=u.getBoundingClientRect(),p=m.getBoundingClientRect();return p.width*p.height-l.width*l.height});let c=Ve(d[0]);return ot(c),c}}let t=document.activeElement;if(t&&t!==document.body){let n=t.closest(Lo);if(n&&!Ce(n)&&ft(n)>0){let d=Ve(n);return ot(d),d}}let i=Array.from(document.querySelectorAll(Lo)).filter(n=>!Ce(n)).map(n=>({element:n,score:ft(n)})).filter(n=>Number.isFinite(n.score)).sort((n,d)=>d.score-n.score),s=i.find(n=>{let d=n.element.tagName.toLowerCase();return d!=="main"&&d!=="body"&&n.score>0});if(s){let n=Ve(s.element);return ot(n),n}if(i.length>0&&i[0].score>0){let n=Ve(i[0].element);return ot(n),n}let r=document.querySelector('form, main, [role="main"]');return r&&Q(r)?r:document.body}function Ho(o){let e=o.cloneNode(!0);e.querySelectorAll("script, style, iframe, object, embed, svg, canvas, noscript, audio, video").forEach(a=>a.remove());let t=["type","name","value","role","aria-label","aria-labelledby","aria-checked","aria-required","required","disabled","data-easyquiz-id","draggable","class","id","data-widget-type","data-role","data-category","data-testid"];return e.querySelectorAll("*").forEach(a=>{for(let i of Array.from(a.attributes))t.includes(i.name)||a.removeAttribute(i.name)}),e.outerHTML.replace(/\s+/g," ").slice(0,2e4)}function bt(o){let e=Array.from(o.querySelectorAll(Ue)),t=new Set,a=[],i=Xe();for(let u of e){if(!Q(u)||re(u)||_(u)||i&&Ce(u))continue;let m=(u.value||u.textContent||"").trim();if(qe.test(m))continue;let l=u.tagName.toLowerCase();["input","textarea","select"].includes(l)&&(t.add(u),a.push(u))}for(let u of e){if(!Q(u)||re(u)||_(u)||i&&Ce(u))continue;let m=(u.value||u.textContent||"").trim();if(qe.test(m))continue;let l=u.tagName.toLowerCase();if(["input","textarea","select"].includes(l))continue;let p=u.querySelector("input, textarea, select");if(!(p&&t.has(p))){if(u.hasAttribute("for")){let h=u.getAttribute("for"),f=h?u.ownerDocument.getElementById(h):null;if(f&&t.has(f))continue}if(l==="a"){let h=u.getAttribute("role"),f=u.getAttribute("class")||"",g=u.getAttribute("data-testid")||"",b=u.getAttribute("draggable")==="true"||u.classList.contains("perseus-drag-item")||u.classList.contains("sortable-item")||f.includes("cursor-grab")||!!u.getAttribute("aria-grabbed")||/drag|card|option|item/i.test(g)||/drag|card-item|sortable/i.test(f);if(!(h==="button"||h==="radio"||h==="checkbox"||h==="option"||b||u.closest('[class*="choice" i], [class*="option" i], [class*="answer" i], [data-testid*="option" i]')))continue}a.push(u)}}let s=a.length>0&&a.every(u=>_(u)||/read-?aloud|audio/i.test(u.getAttribute("data-testid")||u.getAttribute("aria-label")||"")),r=document.body.querySelector('[class*="classification-layout" i]')||document.body.querySelector('[class*="classification" i]')||o,n=document.body.querySelector('[class*="classification" i]')!==null||o.querySelector('[class*="classification" i]')!==null||o.querySelector('[data-cy*="quiz" i]')!==null||o.querySelector('[class*="draggable-item" i]')!==null||o.querySelector('[class*="drag-item" i]')!==null||o.querySelector('[class*="sortable-card" i]')!==null||o.matches?.('[class*="classification" i]');if((a.length===0||s)&&n){s&&(a.length=0);let u=Array.from(r.querySelectorAll('[class*="cursor-grab"][id], [draggable="true"][id], .dnd-card[id]'));if(u.length>0){for(let m of u)if(!(!Q(m)||_(m))&&(a.push(m),a.length>=50))break}else{let m=Array.from(r.querySelectorAll("button, div[class], span[class], p, li"));for(let l of m){if(!Q(l)||re(l)||_(l)||qe.test((l.textContent||"").trim()))continue;let p=(l.textContent||"").trim();if(p.length<2||p.length>300)continue;if(Array.from(l.children).some(f=>f.className&&f.textContent?.trim())||a.push(l),a.length>=50)break}}}let d=a.some(u=>["input","select","textarea"].includes(u.tagName.toLowerCase())),c=!d&&a.length>0&&a.every(u=>{let m=u.tagName.toLowerCase();if(["input","select","textarea","button"].includes(m))return!1;let l=(u.textContent||"").trim();return!u.id||l.length<10||/^\d+\s*\/\s*\d+$/.test(l)||/^question text/i.test(l)});if(a.length===0||c){c&&(a.length=0);let u=Array.from(document.body.querySelectorAll('[class*="cursor-pointer"][id]'));if(u.length>0)for(let m of u){if(!Q(m)||he(m)||re(m)||_(m)||qe.test((m.textContent||"").trim()))continue;let l=(m.textContent||"").trim();if(!(l.length<10||l.length>500)&&!/^\d+\s*\/\s*\d+$/.test(l)&&(a.push(m),a.length>=20))break}}if(a.length===0||a.length>0&&!d&&!a.some(u=>u.getAttribute("role")==="radio"||u.getAttribute("role")==="checkbox"||u.classList.contains("mq-editable-field")||u.closest(".perseus-widget-container"))){let m=document.querySelector(".perseus-renderer, .framework-perseus")||o,l=Array.from(m.querySelectorAll('.mq-editable-field, .mq-root-block, [class*="expression-editor" i], [class*="math-input" i]'));for(let b of l)!Q(b)||he(b)||a.includes(b)||a.push(b);let p=Array.from(m.querySelectorAll('[class*="perseus-dropdown" i], .perseus-widget-container select, .perseus-widget-container [role="combobox"], .perseus-widget-container [role="listbox"]'));for(let b of p)!Q(b)||he(b)||a.includes(b)||a.push(b);let h=Array.from(m.querySelectorAll('[class*="perseus-radio" i] [role="radio"], .perseus-widget-container [role="radio"], .perseus-widget-container [role="checkbox"]'));for(let b of h)!Q(b)||he(b)||b.querySelector('input[type="radio"], input[type="checkbox"]')||a.includes(b)||a.push(b);let f=Array.from(m.querySelectorAll('.perseus-widget-container [role="button"], .number-line [role="slider"], [class*="interactive-graph" i] [role="button"]'));for(let b of f)!Q(b)||he(b)||re(b)||a.includes(b)||a.push(b);let g=Array.from(m.querySelectorAll('.perseus-widget-container input:not([type="hidden"]), .perseus-widget-container textarea, .perseus-widget-container select'));for(let b of g)!Q(b)||he(b)||t.has(b)||a.includes(b)||a.push(b)}return a.slice(0,100).map(u=>Jt(u,"answer"))}function Wt(o){let e=[o,o.parentElement,o.parentElement?.parentElement,document.body].filter(Boolean),t=new Set,a=[];for(let i of e)for(let s of Array.from(i.querySelectorAll(Ue)))if(!(t.has(s)||!Q(s)||!re(s)||_(s))&&(t.add(s),a.push(Jt(s,"navigation")),a.length>=10))return a;return a}function Le(o=!1){let e=le();e=Ve(e),o&&(e=Mo(e));let t=bt(e),a=Wt(e);if(t.length===0){let n=bt(document.body);n.length>0&&(e=Mo(e),t=bt(e),t.length===0&&(t=n,e=document.querySelector('main, article, form, [role="main"]')||document.body))}a.length===0&&(a=Wt(document.body));let i=e.querySelector(".katex, math, .mq-root-block, .mq-editable-field"),s;if(i)s=Aa(e,16e3);else{let n=e.innerText&&e.innerText.trim().length>0?e.innerText:e.textContent||"";s=n.length>4e4?Y(n.slice(0,8e3),8e3)+`
[...conte\xFAdo extenso truncado...]
`+Y(n.slice(-2e3),2e3):Y(n,16e3)}let r=[...t,...a].slice(0,120);return!s||r.length===0&&s.length<30?Y(document.body.innerText||document.body.textContent||"",16e3).length>=30?ke():null:{sourceUrl:window.location.href.slice(0,2e3),pageTitle:document.title.slice(0,500)||"P\xE1gina de Quest\xE3o",questionText:s,htmlSnippet:Ho(e),controls:r,scope:e}}function ke(){let o=document.body.innerText||document.body.textContent||document.documentElement.textContent||"",e=Y(o,16e3),t=bt(document.body),a=Wt(document.body),i=[...t,...a].slice(0,120),s=document.querySelector('main, article, form, [role="main"], [data-test-id*="content" i], [class*="content" i]')||document.body;return{sourceUrl:window.location.href.slice(0,2e3),pageTitle:document.title.slice(0,500)||"P\xE1gina de Quest\xE3o",questionText:e,htmlSnippet:Ho(s).slice(0,15e3),controls:i,scope:s}}function $t(o){let e=o.controls.map(t=>{let a=t.options?t.options.length:0;return`${t.role}:${t.id}:${t.type}:${a}`}).join("|");return[window.location.href,o.pageTitle,o.questionText.slice(0,400),e].join("::")}function xt(o){if(!o)return!1;let e=o.toLowerCase();return["?","quest\xE3o","questao","pergunta","exerc\xEDcio","exercicio","assinale","calcule","determine","qual \xE9","qual o","quais","indique","selecione","escolha","responda","julgue","verdadeiro ou falso","complete","resolva","encontre","alternativa","correta","incorreta","m\xB3","cm\xB2","volume","probabilidade","matriz","valor de","resultado de","considere","dada a","sabendo que","quanto vale","obtenha"].some(a=>e.includes(a))}function $(o){return o?!!(o.closest('#easyquiz-shadow-root, .eq-sidebar, .eq-launcher, [data-easyquiz-ignore="true"], .btn-inject-eq, #btn-inject-script')||o.getAttribute?.("data-easyquiz-ignore")==="true"):!1}function O(o){return o==null?"":(typeof o=="string"?o:String(o)).replace(/^(\([0-9a-zA-Z]{1,2}\)|[0-9]{1,3}|[a-zA-Z])[\.\)\-\:]\s+/,"").replace(/[\.\u2026]{2,}/g," ").replace(/['"“”«»]/g,"").replace(/\s+/g," ").trim()}function se(o){if(!o||o instanceof HTMLInputElement||o instanceof HTMLSelectElement||o instanceof HTMLTextAreaElement||o.getAttribute("draggable")==="true"||o.classList.contains("dnd-card")||o.hasAttribute("data-category")||o.hasAttribute("data-dropzone"))return o;if(o.hasAttribute("for")){let a=o.getAttribute("for");if(a){let i=o.ownerDocument.getElementById(a);if(i)return i}}let e=o.closest('label, .option-card, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, td, li, .dnd-card, [class*="option-card" i], [class*="choice-card" i], .dropdown-row, [class*="dropdown" i], [class*="select-row" i]');if(e&&!["article","section","main","form","body"].includes(e.tagName.toLowerCase())){let a=e.getAttribute("for"),s=(a?e.ownerDocument.getElementById(a):null)||e.querySelector('input:not([type="hidden"]), select, textarea');return s||e}let t=o.closest('button, a, [role="button"], [draggable="true"]');if(t)return t;if(["body","html","main","section","article","form"].includes(o.tagName.toLowerCase())){let a=o.querySelector('button, [role="button"], a, input:not([type="hidden"]), select, textarea, [role="radio"], [role="checkbox"], .option-card, label');if(a)return se(a)}return o}function Po(o){let e=o;if(!e||!document.contains(e))try{e=le()}catch{}e=e||document.body;let t=i=>{let s=Array.from(i.querySelectorAll("tr")).filter(u=>Q(u)&&u.querySelector('input[type="radio"], input[type="checkbox"]'));if(s.length>1)return s;let r=Array.from(i.querySelectorAll('input[type="checkbox"], input[type="radio"], [role="checkbox"], [role="radio"]')).filter(u=>Q(u)&&!$(u));if(r.length>0)return r;let d=Array.from(i.querySelectorAll('.option-card, [role="option"], [class*="choice-card" i], [class*="option-card" i], li[class*="choice" i], li[class*="option" i]')).filter(u=>Q(u)&&!$(u)).filter(u=>!u.parentElement?.closest('.option-card, [role="option"], [class*="choice-card" i], [class*="option-card" i]'));return d.length>0?d:Array.from(i.querySelectorAll('[class*="classification" i] [class], [class*="draggable-item" i], [class*="drag-item" i], [class*="sortable-card" i]')).filter(u=>{let m=u;return Q(m)&&!$(m)&&(m.textContent||"").trim().length>2&&!re(m)&&!_(m)&&!m.querySelector("[class]")})},a=t(e);return a.length>0?a:e!==document.body?t(document.body):[]}function F(o,e,t=!1){if(o==null)return null;let i=(typeof o=="string"?o:String(o)).trim().replace(/^["'“”«»]+|["'“”«»]+$/g,"");if(!i)return null;let s=te(i),r=document.querySelector(`[data-easyquiz-id="${s}"]`);if(r&&!$(r))return se(r);try{let l=document.getElementById(i);if(l&&Q(l)&&!$(l))return l.hasAttribute("data-category")||l.hasAttribute("data-dropzone")||l.classList.contains("dnd-zone")?l:se(l)}catch{}try{let l=document.querySelector(`[data-item-id="${s}"]`);if(l&&Q(l)&&!$(l))return se(l)}catch{}let n=i.match(/^(?:item|opção|opcao|afirmação|afirmacao|alternativa|linha|afirmativa|questão|questao|campo|blank|lacuna|input|resposta)?\s*#?_?([0-9]+)$/i);if(n){let l=parseInt(n[1],10);if(t){let h=document.body;try{h=le()||document.body}catch{}let f=Array.from(h.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, select, [contenteditable="true"]')).filter(g=>Q(g)&&!$(g));if(l>=1&&l-1<f.length)return f[l-1];if(l===0&&f.length>0)return f[0]}let p=l-1;if(p>=0){let h=Po();if(p<h.length){let b=h[p];if(b.tagName.toLowerCase()==="tr"){if(e){let x=b.querySelector(`input[value="${te(e)}" i], [data-value="${te(e)}" i]`);if(x)return x}let v=b.querySelector("input");if(v)return v}return se(b)}let f=document.body;try{f=le()||document.body}catch{}let g=Array.from(f.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, select, [contenteditable="true"]')).filter(b=>Q(b)&&!$(b));if(p<g.length)return g[p]}}let d=i.match(/^(?:item|opção|opcao|afirmação|afirmacao|alternativa|linha|afirmativa|questão|questao)?\s*#?([a-eA-E])$/i);if(d){let l=d[1].toUpperCase(),p=l.charCodeAt(0)-65,h=Array.from(document.querySelectorAll(`input[type="radio"][value="${l}" i], input[type="checkbox"][value="${l}" i]`)).find(g=>Q(g)&&!$(g));if(h)return se(h);let f=Array.from(document.querySelectorAll('.option-card, .choice, .answer, label, [role="radio"], [role="checkbox"]')).find(g=>{if(!Q(g)||$(g))return!1;let v=(g.querySelector('.option-badge, .badge, [class*="badge" i], [class*="letter" i]')?.textContent||"").trim().toUpperCase();if(v===l||v===`${l})`||v===`(${l})`||v===`${l}.`||v===`${l}:`)return!0;let x=(g.textContent||"").trim().toUpperCase();return x.startsWith(`${l})`)||x.startsWith(`(${l})`)||x.startsWith(`${l}.`)||x.startsWith(`${l}:`)});if(f)return se(f);if(p>=0){let g=Po();if(p<g.length){let b=g[p];if(b.tagName.toLowerCase()==="tr"){if(e){let x=b.querySelector(`input[value="${te(e)}" i], [data-value="${te(e)}" i]`);if(x)return x}let v=b.querySelector("input");if(v)return v}return se(b)}}}if(/^[a-zA-Z0-9_-]{1,10}$/.test(i)){let p=Array.from(document.querySelectorAll(`[data-category="${s}" i], [data-dropzone="${s}" i], [data-role="dropzone"][data-category="${s}" i]`)).find(b=>Q(b)&&!$(b));if(p)return p;let f=Array.from(document.querySelectorAll(`input[value="${s}" i], [data-value="${s}" i], input[id="${s}" i], input[placeholder="${s}" i], textarea[placeholder="${s}" i], [title="${s}" i]`)).find(b=>Q(b)&&!$(b));if(f)return se(f);let g=Array.from(document.querySelectorAll('.option-badge, [class*="badge" i], [class*="letter" i], .option-card span, label span')).find(b=>{if(!Q(b)||$(b))return!1;let v=O(b.textContent).toLowerCase();return v===i.toLowerCase()||v===i.toLowerCase()+")"});if(g)return se(g)}try{let l=Array.from(document.querySelectorAll(`[name="${s}"], [value="${s}"], [placeholder="${s}" i], [title="${s}" i], [data-category="${s}" i], [data-dropzone="${s}" i], [data-testid="${s}" i], [data-test-id="${s}" i], [aria-label="${s}" i]`));if(e){let h=l.find(f=>{if(!Q(f)||$(f))return!1;if(f instanceof HTMLInputElement&&f.value.toLowerCase()===e.toLowerCase())return!0;let g=f.closest("label, .vf-label, td, div");return g&&O(g.textContent).toLowerCase().includes(O(e).toLowerCase())});if(h)return se(h)}let p=l.find(h=>Q(h)&&!$(h));if(p)return p.hasAttribute("data-category")||p.hasAttribute("data-dropzone")||p.classList.contains("dnd-zone")?p:se(p)}catch{}if(/^[.#\[]|\s|[>+~:]/.test(i))try{let p=Array.from(document.querySelectorAll(i)).find(h=>Q(h)&&!$(h));if(p)return se(p)}catch{}try{let l=i.replace(/"/g,""),p=`//button[normalize-space(.)="${l}"] | //a[normalize-space(.)="${l}"] | //*[not(*) and normalize-space(.)="${l}"] | //*[@aria-label="${l}"] | //*[@data-category="${l}"] | //*[@data-testid="${l}"]`,h=document.evaluate(p,document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);for(let f=0;f<h.snapshotLength;f++){let g=h.snapshotItem(f);if(g&&Q(g)&&!$(g)){if(["body","html"].includes(g.tagName.toLowerCase())){let v=g.querySelector('button, [role="button"], a, input, [role="radio"], [role="checkbox"], label');if(v&&Q(v))return se(v)}return g.closest('[data-role="dropzone"], [class*="category" i], [class*="bucket" i], [class*="column" i], [class*="drop" i]')||se(g)}}}catch{}let u=O(i).toLowerCase(),m=Array.from(document.querySelectorAll('button, a, div, span, li, p, label, input, textarea, select, [draggable="true"], [data-testid], [class*="option" i], [class*="card" i], [class*="item" i], [class*="choice" i], [class*="category" i], [class*="bucket" i]'));for(let l of m){if(!Q(l)||$(l)||l.closest("header, nav, .stepper, .step-item, .progress-bar-container")||_(l)||!!(l.matches('article, section, form, main, [class*="container" i], [class*="grid" i], .dnd-pool, .dnd-zones')||l.querySelector('label, [role="radio"], [role="checkbox"], .dnd-card, [draggable="true"], .option-card, tr'))&&!l.matches(".dnd-zone, [data-category], [data-dropzone]"))continue;let h=O(l.textContent).toLowerCase(),f=O(l.getAttribute("aria-label")||"").toLowerCase(),g=O(l.getAttribute("placeholder")||"").toLowerCase(),b=O(l.getAttribute("title")||"").toLowerCase(),v=O(l.getAttribute("name")||"").toLowerCase(),x=O(l.getAttribute("data-category")||"").toLowerCase(),w=l instanceof HTMLInputElement||l instanceof HTMLButtonElement?l.value:"",y=O(w).toLowerCase(),E=h.startsWith(u+")")||h.startsWith(u+".")||h.startsWith(u+" -")||h.startsWith(u+":");if(h===u||f===u||g===u||b===u||v===u||x&&x===u||y&&y===u||E)return l.closest('[data-role="dropzone"], [class*="category" i], [class*="bucket" i], [class*="column" i], [class*="drop" i]')||se(l)}if(u.length>=3)for(let l of m){if(!Q(l)||$(l)||l.closest("header, nav, .stepper, .step-item, .progress-bar-container")||_(l)||!!(l.matches('article, section, form, main, [class*="container" i], [class*="grid" i], .dnd-pool, .dnd-zones')||l.querySelector('label, [role="radio"], [role="checkbox"], .dnd-card, [draggable="true"], .option-card, tr'))&&!l.matches(".dnd-zone, [data-category], [data-dropzone]"))continue;let h=O(l.textContent).toLowerCase(),f=O(l.getAttribute("aria-label")||"").toLowerCase(),g=O(l.getAttribute("placeholder")||"").toLowerCase(),b=O(l.getAttribute("title")||"").toLowerCase(),v=O(l.getAttribute("name")||"").toLowerCase();if(h.includes(u)||f.includes(u)||g.includes(u)||b.includes(u)||v.includes(u)){if(Array.from(l.children).some(E=>{let T=O(E.textContent).toLowerCase();return T&&T.includes(u)}))continue;return l.closest('[data-role="dropzone"], [class*="category" i], [class*="bucket" i], [class*="column" i], [class*="drop" i]')||se(l)}let x=u.split(/\s+/).filter(Boolean);if(x.length>=3){let w=x.slice(0,Math.min(5,x.length)).join(" ");if(h.includes(w)||f.includes(w)||g.includes(w))return se(l)}}return null}function zo(o,e){for(let t of e)o.dispatchEvent(new Event(t,{bubbles:!0,composed:!0}))}function ie(o,e){if(!o)return;try{o.scrollIntoView({block:"nearest",inline:"nearest",behavior:"instant"})}catch{}try{o.focus?.()}catch{}let t=o.getBoundingClientRect(),a=e?e[0]:Math.round(t.left+Math.max(1,t.width/2)),i=e?e[1]:Math.round(t.top+Math.max(1,t.height/2)),s={bubbles:!0,cancelable:!0,composed:!0,view:window,clientX:a,clientY:i};try{o.dispatchEvent(new PointerEvent("pointerover",{...s}))}catch{}try{o.dispatchEvent(new MouseEvent("mouseover",{...s}))}catch{}try{o.dispatchEvent(new PointerEvent("pointerdown",{...s,button:0,buttons:1}))}catch{}try{o.dispatchEvent(new MouseEvent("mousedown",{...s,button:0,buttons:1}))}catch{}try{o.dispatchEvent(new PointerEvent("pointerup",{...s,button:0,buttons:0}))}catch{}try{o.dispatchEvent(new MouseEvent("mouseup",{...s,button:0,buttons:0}))}catch{}if(typeof o.click=="function")try{o.click()}catch{try{o.dispatchEvent(new MouseEvent("click",{...s,button:0,buttons:0}))}catch{}}else try{o.dispatchEvent(new MouseEvent("click",{...s,button:0,buttons:0}))}catch{}try{let r=Object.keys(o).find(n=>n.startsWith("__reactFiber")||n.startsWith("__reactInternalInstance"));if(r){let n=o[r];for(;n;){let d=n.memoizedProps||n.pendingProps;if(d?.onClick){d.onClick({type:"click",target:o,currentTarget:o,bubbles:!0,cancelable:!0,preventDefault:()=>{},stopPropagation:()=>{}});break}n=n.return}}}catch{}try{let r=Object.keys(o).find(n=>n.startsWith("__reactProps"));if(r){let n=o[r];n?.onClick&&n.onClick({type:"click",target:o,currentTarget:o,bubbles:!0,cancelable:!0,preventDefault:()=>{},stopPropagation:()=>{}})}}catch{}try{let r=o._vei;r?.onClick&&(Array.isArray(r.onClick.value)?r.onClick.value:[r.onClick.value]).forEach(d=>{try{d({type:"click",target:o})}catch{}})}catch{}try{o.$onclick&&o.$onclick({type:"click",target:o,preventDefault:()=>{},stopPropagation:()=>{}})}catch{}try{if(!!(document.querySelector('meta[content*="google.com/forms"], form[action*="formResponse"]')||o.closest("[data-item-id], [jsmodel], [jsaction], .freebirdFormviewerComponentsQuestionBaseRoot"))){let n=o.querySelector('input[type="radio"], input[type="checkbox"]');n&&(n.focus?.(),n.click(),Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"checked")?.set?.call(n,!0),n.dispatchEvent(new Event("change",{bubbles:!0})));let d=o.closest("[jsaction]");if(d&&d!==o)try{d.dispatchEvent(new MouseEvent("click",{bubbles:!0,cancelable:!0,view:window,clientX:a,clientY:i}))}catch{}}}catch{}if(o.getAttribute("role")==="button"||o.getAttribute("tabindex")!==null)try{o.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0,cancelable:!0})),o.dispatchEvent(new KeyboardEvent("keyup",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0,cancelable:!0}))}catch{}}function _t(o){try{let e=o.id,t=!!e;e||(e=`__eq_tmp_${Math.random().toString(36).slice(2,8)}`,o.id=e);let a=document.createElement("script");return a.textContent=`(function(){var el=document.getElementById(${JSON.stringify(e)});if(el){el.dispatchEvent(new MouseEvent('click',{bubbles:true,cancelable:true,composed:true,view:window}));if(typeof el.click==='function')el.click();var fk=Object.keys(el).find(function(k){return k.startsWith('__reactFiber')||k.startsWith('__reactInternalInstance');});if(fk){var fb=el[fk];while(fb){var mp=fb.memoizedProps||fb.pendingProps;if(mp&&typeof mp.onClick==='function'){try{mp.onClick({type:'click',target:el,currentTarget:el,bubbles:true,cancelable:true,preventDefault:function(){},stopPropagation:function(){}});}catch(e){}break;}fb=fb.return;}}var pk=Object.keys(el).find(function(k){return k.startsWith('__reactProps');});if(pk&&el[pk]&&typeof el[pk].onClick==='function'){try{el[pk].onClick({type:'click',target:el,currentTarget:el,bubbles:true,cancelable:true,preventDefault:function(){},stopPropagation:function(){}});}catch(e){}}if(el._vei&&el._vei.onClick){var h=el._vei.onClick.value;var hs=Array.isArray(h)?h:[h];hs.forEach(function(fn){try{fn({type:'click',target:el});}catch(e){}});}}})()`,document.head.appendChild(a),a.remove(),t||setTimeout(()=>{try{o.id===e&&o.removeAttribute("id")}catch{}},0),!0}catch{return!1}}function yt(o,e){let t=o;if(t.hasAttribute("for")){let m=t.getAttribute("for"),l=t.ownerDocument.getElementById(m);l&&(t=l)}let a=t.classList?.contains("mq-editable-field")||t.classList?.contains("mq-root-block")?t:t.querySelector(".mq-editable-field, .mq-root-block");if(a)try{let m=a.__mathquill||a.mathquill;if(m&&typeof m.latex=="function"){m.latex(e),a.dispatchEvent(new Event("input",{bubbles:!0,composed:!0})),a.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}));return}let l=window.MathQuill?.getInterface?.(2)||window.MathQuill?.getInterface?.(1);if(l){let p=l(a);if(p&&typeof p.latex=="function"){p.latex(e),a.dispatchEvent(new Event("input",{bubbles:!0,composed:!0}));return}}a.focus?.(),a.dispatchEvent(new KeyboardEvent("keydown",{key:"a",code:"KeyA",ctrlKey:!0,bubbles:!0})),a.dispatchEvent(new KeyboardEvent("keydown",{key:"Backspace",code:"Backspace",bubbles:!0}));for(let p of e)a.dispatchEvent(new KeyboardEvent("keydown",{key:p,code:`Key${p.toUpperCase()}`,bubbles:!0,cancelable:!0})),a.dispatchEvent(new KeyboardEvent("keypress",{key:p,code:`Key${p.toUpperCase()}`,bubbles:!0,cancelable:!0})),a.dispatchEvent(new InputEvent("input",{data:p,inputType:"insertText",bubbles:!0,cancelable:!0,composed:!0})),a.dispatchEvent(new KeyboardEvent("keyup",{key:p,code:`Key${p.toUpperCase()}`,bubbles:!0,cancelable:!0}));a.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}));return}catch(m){console.warn("[EasyQuiz] MathQuill fill falhou, continuando com fallback padr\xE3o:",m)}let i=t.matches?.('[class*="perseus-dropdown" i], [class*="perseus"] [role="combobox"]')?t:t.querySelector('[class*="perseus-dropdown" i], [class*="perseus"] [role="combobox"]');if(i)try{ie(i),setTimeout(()=>{let m=e.trim().toLowerCase(),l=Array.from(document.querySelectorAll('[role="option"], [role="listbox"] [role="option"], [class*="dropdown"] [role="option"], [class*="perseus"] [class*="option"], .dropdown-option, [class*="select-option"]')).filter(p=>{let h=p;if(!Q(h)||$(h))return!1;let f=(h.textContent||"").trim().toLowerCase(),g=h.getAttribute("data-value")?.toLowerCase()||"";return f===m||g===m||f.includes(m)||m.length>2&&m.includes(f)});l.length>0&&ie(l[0])},250);return}catch(m){console.warn("[EasyQuiz] Perseus dropdown fill falhou:",m)}if(typeof HTMLSelectElement<"u"&&t instanceof HTMLSelectElement||t.tagName?.toLowerCase()==="select"||t.getAttribute("role")==="combobox"||t.getAttribute("role")==="listbox"||t.matches?.('[role="combobox"], [role="listbox"], [class*="select" i], [class*="dropdown" i]')){At(t,[e]);return}let r=t.querySelector('select, [role="combobox"], [role="listbox"]');if(r){At(r,[e]);return}if(!(t instanceof HTMLInputElement)&&!(t instanceof HTMLTextAreaElement)&&!(t instanceof HTMLSelectElement)&&!t.isContentEditable){let m=t.querySelector('input:not([type="hidden"]), textarea, select, [contenteditable="true"]');if(m)t=m;else{let p=t.closest('.form-group, .field, [class*="input" i], [class*="control" i], label, tr, td, li, p, div')?.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, select, [contenteditable="true"]');if(p)t=p;else{let h=t.nextElementSibling;for(;h;){if(h instanceof HTMLInputElement&&!["hidden","button","submit","checkbox","radio"].includes(h.type)||h instanceof HTMLTextAreaElement||h instanceof HTMLElement&&h.isContentEditable){t=h;break}let f=h.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(f){t=f;break}h=h.nextElementSibling}}}}if(t instanceof HTMLButtonElement||t.tagName.toLowerCase()==="a"||t.getAttribute("role")==="button"||t instanceof HTMLInputElement&&["button","submit","reset","image"].includes(t.type)){let m=t.parentElement?.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(m)t=m;else{let l=document.body;try{l=le()||document.body}catch{}let p=l.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(p)t=p;else{console.warn("[EasyQuiz] setNativeValue: Nenhum campo de texto encontrado para receber o valor.");return}}}if(!(t instanceof HTMLInputElement)&&!(t instanceof HTMLTextAreaElement)&&!(t instanceof HTMLSelectElement)&&!t.isContentEditable){let m=document.body;try{m=le()||document.body}catch{}let l=m.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(l)t=l;else{console.warn("[EasyQuiz] setNativeValue: Nenhum campo de texto encontrado para receber o valor.");return}}if(t instanceof HTMLInputElement&&["checkbox","radio"].includes(t.type)){let m=["true","1","checked","yes","sim"].includes(e.toLowerCase())||e===t.value;Me(t,m);return}let d=String(e??""),c=d;if(t instanceof HTMLInputElement&&t.type==="number"){let m=d.replace(",",".").replace(/[^0-9.-]/g,"");m&&!isNaN(Number(m))&&(c=m)}try{t.scrollIntoView?.({block:"center",inline:"center",behavior:"instant"}),t.focus?.()}catch{}try{if(t instanceof HTMLInputElement||t instanceof HTMLTextAreaElement){let m=t instanceof HTMLTextAreaElement?HTMLTextAreaElement.prototype:HTMLInputElement.prototype,l=Object.getOwnPropertyDescriptor(m,"value")?.set;l?l.call(t,""):t.value="";try{t.select?.()}catch{}}else if(t.isContentEditable){t.textContent="";try{document.execCommand?.("selectAll",!1,void 0)}catch{}}}catch{}let u=!1;try{t instanceof HTMLInputElement||t instanceof HTMLTextAreaElement?t.type!=="number"&&t.type!=="range"&&(u=document.execCommand?.("insertText",!1,c)||!1):t.isContentEditable&&(u=document.execCommand?.("insertText",!1,c)||!1)}catch{}if(t instanceof HTMLInputElement||t instanceof HTMLTextAreaElement){try{let p=t._valueTracker;p&&p.setValue(c===""?" ":"")}catch{}let m=t instanceof HTMLTextAreaElement?HTMLTextAreaElement.prototype:HTMLInputElement.prototype,l=Object.getOwnPropertyDescriptor(m,"value")?.set;l?l.call(t,c):t.value=c;try{t.dispatchEvent(new KeyboardEvent("keydown",{bubbles:!0,cancelable:!0,key:c.slice(-1)||"a"}))}catch{}try{t.dispatchEvent(new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,composed:!0,data:c,inputType:"insertText"}))}catch{}try{t.dispatchEvent(new InputEvent("input",{bubbles:!0,cancelable:!0,composed:!0,data:c,inputType:"insertText"}))}catch{t.dispatchEvent(new Event("input",{bubbles:!0,cancelable:!0,composed:!0}))}try{t.dispatchEvent(new KeyboardEvent("keyup",{bubbles:!0,cancelable:!0,key:c.slice(-1)||"a"}))}catch{}try{t.dispatchEvent(new Event("change",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}try{t.dispatchEvent(new FocusEvent("blur",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}if(t.value!==c&&!(t instanceof HTMLInputElement&&t.type==="number"&&Number(t.value)===Number(c))){t.value=c;try{l?.call(t,c)}catch{}}return}if(t.isContentEditable){if(t.textContent?.trim()!==c.trim()){t.textContent=c;try{t.innerText=c}catch{}}try{t.dispatchEvent(new InputEvent("input",{bubbles:!0,cancelable:!0,composed:!0,data:c,inputType:"insertText"}))}catch{t.dispatchEvent(new Event("input",{bubbles:!0,cancelable:!0,composed:!0}))}try{t.dispatchEvent(new Event("change",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}try{t.dispatchEvent(new FocusEvent("blur",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}return}try{"value"in t&&(t.value=c),t.dispatchEvent(new Event("input",{bubbles:!0,cancelable:!0,composed:!0})),t.dispatchEvent(new Event("change",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}}function at(o,e=""){if(o==null)return e;let t=typeof o=="string"?o:String(o);if(!t)return e;let a=/^(eq-|#|\$|\.|input_|mat-|choice_|radio_|chk_)/i.test(t),i=O(t),s=F(t)||F(i);if(!s)return a?e:i||e;let r=s.closest('label, .option-card, [class*="choice" i], [class*="option" i], .quiz-option, tr, td, li');if(r){let m=O(r.textContent);if(m&&m.length>0&&m.length<150)return m}if(s.id){let m=document.querySelector(`label[for="${te(s.id)}"]`);if(m){let l=O(m.textContent);if(l&&l.length>0&&l.length<150)return l}}let n=s.getAttribute("aria-label");if(n)return O(n);let d=s.getAttribute("placeholder");if(d)return O(d);let c=O(s.textContent);if(c&&c.length>0&&c.length<120)return c;let u=s instanceof HTMLInputElement||s instanceof HTMLButtonElement?s.value:"";return u?O(u):a?e:i||e}function Me(o,e){if(!o)return;let t=o.closest('label, td, .option-card, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, [class*="option" i], [class*="choice" i], li')||o,a=o instanceof HTMLInputElement&&["checkbox","radio"].includes(o.type)?o:t.querySelector('input[type="checkbox"], input[type="radio"]');!a&&t.hasAttribute("for")&&(a=t.ownerDocument.getElementById(t.getAttribute("for")));let i=o instanceof HTMLInputElement?o.closest("label")||(o.id?t.ownerDocument.getElementById(t.getAttribute("for")):null)||o:t&&Q(t)?t:o;if(a){let s=a.type==="radio",r=a.type==="checkbox",n=!!a._valueTracker;if(a.checked===e){if(s&&e){t.setAttribute("aria-checked","true"),t.setAttribute("aria-selected","true"),t.classList.add("selected","active","checked");return}if(r){t.setAttribute("aria-checked",e?"true":"false"),t.setAttribute("aria-selected",e?"true":"false"),t.classList.toggle("selected",e),t.classList.toggle("active",e),t.classList.toggle("checked",e);return}}if(i&&i!==a&&ie(i),a.checked!==e)try{a.focus?.(),a.click()}catch{}if(a.checked!==e){try{let c=a._valueTracker;c&&c.setValue(!e)}catch{}try{Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"checked")?.set?.call(a,e)}catch{}a.checked=e,zo(a,["input","change"])}t.setAttribute("aria-checked",e?"true":"false"),t.setAttribute("aria-selected",e?"true":"false"),t.classList.toggle("selected",e),t.classList.toggle("active",e),t.classList.toggle("checked",e)}else{if((t.getAttribute("aria-checked")==="true"||t.getAttribute("aria-selected")==="true"||t.getAttribute("data-selected")==="true"||t.getAttribute("data-checked")==="true"||t.classList.contains("selected")||t.classList.contains("active")||t.classList.contains("checked"))===e&&e)return;ie(i),t.setAttribute("aria-checked",e?"true":"false"),t.setAttribute("aria-selected",e?"true":"false"),t.classList.toggle("selected",e),t.classList.toggle("active",e),t.classList.toggle("checked",e)}}function At(o,e){let t=typeof HTMLSelectElement<"u"&&o instanceof HTMLSelectElement||o.tagName?.toLowerCase()==="select"?o:o.querySelector("select");if(t){let r=e.map(c=>O(c).toLowerCase()),n=!1,d=(c,u)=>{c.selected=!0,t.selectedIndex=u;try{t.value=c.value}catch{}try{Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype,"value")?.set?.call(t,c.value)}catch{}try{let m=t._valueTracker;m&&m.setValue(c.value)}catch{}n=!0};for(let c=0;c<t.options.length;c++){let u=t.options[c],m=u.value.toLowerCase(),l=O(u.textContent).toLowerCase();if(r.some(h=>h===m||h===l)){if(d(u,c),!t.multiple)break}else t.multiple||(u.selected=!1)}if(!n)for(let c of r){let u=c.match(/^(?:item|opção|opcao|alternativa|linha|escolha|campo)?\s*#?_?([0-9]+)$/i);if(u){let m=parseInt(u[1],10),p=t.options[0]?.value===""||t.options[0]?.disabled?m:m>=1?m-1:0;if(p>=0&&p<t.options.length&&(d(t.options[p],p),!t.multiple))break}}if(!n){for(let c of r)if(/^[a-z]$/i.test(c)){let u=c.toUpperCase().charCodeAt(0)-65,l=t.options[0]?.value===""||t.options[0]?.disabled?u+1:u;if(l>=0&&l<t.options.length&&(d(t.options[l],l),!t.multiple))break}}if(!n){let c=u=>u.normalize("NFD").replace(/[\u0300-\u036f]/g,"");for(let u=0;u<t.options.length;u++){let m=t.options[u],l=c(m.value.toLowerCase()),p=c(O(m.textContent).toLowerCase());if(r.some(f=>{let g=c(f);return l.includes(g)||p.includes(g)||g.length>2&&(g.includes(l)||g.includes(p))})&&(d(m,u),!t.multiple))break}}if(n){zo(t,["focus","input","change","blur"]);return}}let a=o.matches?.('[role="combobox"], [role="listbox"], [class*="select" i], [class*="dropdown" i]')?o:o.closest('[role="combobox"], [role="listbox"], [class*="select" i], [class*="dropdown" i]');a&&ie(a);let i=e.map(r=>O(r).toLowerCase()),s=Array.from(document.querySelectorAll('[role="listbox"] [role="option"], [role="menu"] [role="menuitem"], .select-dropdown li, .dropdown-menu .dropdown-item, .ant-select-item-option, .MuiMenuItem-root, [class*="option-item"], li[data-value]')).filter(r=>Q(r)&&!$(r));for(let r of i){let n=s.find(c=>{let u=O(c.textContent).toLowerCase(),m=O(c.getAttribute("data-value")||c.getAttribute("value")||"").toLowerCase();return u===r||m===r||u.includes(r)||r.length>2&&r.includes(u)});if(n){ie(n);let c=n.querySelector('input[type="radio"], input[type="checkbox"]');c&&Me(c,!0);return}let d=F(r);if(d){ie(d);return}}}function Ca(o,e){try{let t=new DataTransfer;try{t.setData("text/plain",o)}catch{}try{t.setData("text/html",e)}catch{}return t}catch{return null}}function Yt(o){try{o.click()}catch{let e=o.ownerDocument.defaultView||window;o.dispatchEvent(new e.MouseEvent("click",{bubbles:!0,cancelable:!0,composed:!0,view:e}))}}function Oo(o,e,t){try{if(e.contains(o))return{success:!0,evidence:"origin is child of dest (DOM move confirmed)"};if(!document.body.contains(o))return{success:!0,evidence:"origin removed from DOM (consumed by framework)"};let a=e.children.length;if(t!==void 0&&a>t)return{success:!0,evidence:`dest child count increased: ${t} \u2192 ${a}`};if([o.getAttribute("data-placed")==="true",o.getAttribute("data-assigned")==="true",o.getAttribute("data-matched")==="true",o.getAttribute("aria-grabbed")==="false",/placed|dropped|assigned|matched|done|sorted|categorized/i.test(o.className||"")].some(Boolean))return{success:!0,evidence:"origin has placement indicator: class/attr"};let s=(o.textContent||"").trim().toLowerCase();return s.length>2&&Array.from(e.querySelectorAll("*")).some(d=>d!==e&&(d.textContent||"").trim().toLowerCase()===s)?{success:!0,evidence:"origin text found inside dest children (clone or DOM move)"}:e.getAttribute("data-count")&&parseInt(e.getAttribute("data-count")||"0")>0?{success:!0,evidence:"dest data-count > 0, categorization likely succeeded"}:o.getAttribute("aria-hidden")==="true"||o.style.display==="none"||o.style.visibility==="hidden"?{success:!0,evidence:"origin hidden after drop (framework confirmed placement)"}:{success:!1,evidence:"no DOM evidence of successful drag/categorization"}}catch{return{success:!1,evidence:"verification threw exception"}}}function ue(o,e){let t=O(o).toLowerCase();if(!t)return null;if(e==="source"){if(/^[0-9a-f]{10,}$/.test(o.trim())){let n=document.getElementById(o.trim());if(n&&Q(n)&&!$(n))return n}let r=['[class*="cursor-grab"][id]',".dnd-card",'[draggable="true"]'];for(let n of r){let c=Array.from(document.querySelectorAll(n)).find(u=>{if(!Q(u)||$(u))return!1;let m=O(`${u.id} ${u.textContent||""} ${u.getAttribute("data-id")||""}`).toLowerCase();return m===t||m.includes(t)||u.id===o.trim()});if(c)return c}return null}let a=["[data-dropzone]","[data-category]",'[data-role="dropzone"]','[class*="dropzone" i]','[class*="list-group" i]','[class*="classification-group" i]'].join(","),i=Array.from(document.querySelectorAll(a)),s=i.find(r=>[r.getAttribute("data-category"),r.getAttribute("data-dropzone")].some(n=>n?.trim().toLowerCase()===t));return s&&Q(s)&&!$(s)?s:i.find(r=>{if(!Q(r)||$(r)||/unclassified/i.test(r.className))return!1;let n=r.querySelector('.font-bold, h1, h2, h3, h4, [class*="header" i], [class*="title" i], [class*="label" i]'),d=O(n?.textContent||r.textContent||"").toLowerCase();return d.includes("op")&&(d.includes("es")||d.includes("\xF5es"))?!1:d===t||d.startsWith(t)||d.includes(t)})||null}async function wt(o,e,t=1){try{o.scrollIntoView({block:"center",inline:"center",behavior:"instant"})}catch{}let a=o.getBoundingClientRect(),i=e.getBoundingClientRect(),s=Math.round(a.left+Math.max(1,a.width/2)),r=Math.round(a.top+Math.max(1,a.height/2)),n=Math.round(i.left+Math.max(1,i.width/2)),d=Math.round(i.top+Math.max(1,i.height/2)),c=O(e.textContent).toLowerCase();if(c){let f=Array.from(o.querySelectorAll('button, [role="button"], input[type="radio"], input[type="checkbox"], option, .btn, [class*="tag" i]')).find(g=>{let b=O(g.textContent).toLowerCase(),v=g instanceof HTMLInputElement||g instanceof HTMLOptionElement?O(g.value).toLowerCase():"";return b&&(c.includes(b)||b.includes(c))||v&&(c.includes(v)||v.includes(c))});f&&(ie(f),await new Promise(g=>setTimeout(g,120)))}Yt(o),await new Promise(h=>setTimeout(h,140)),Yt(e);let u=e.querySelector('[data-role="dropzone"], [class*="bucket" i], [class*="slot" i], [class*="drop" i], [class*="target" i], [class*="items" i], ul, ol');if(u&&u!==e&&Yt(u),await new Promise(h=>setTimeout(h,100)),!e.contains(o)&&o.matches('.dnd-card, [draggable="true"]')&&e.matches('.dnd-zone, [data-dropzone], [data-role="dropzone"]')&&e.appendChild(o),e.contains(o)&&o.matches('.dnd-card, [draggable="true"]'))return;let m={bubbles:!0,cancelable:!0,composed:!0,view:window,clientX:s,clientY:r,screenX:s,screenY:r,button:0,buttons:1};try{o.dispatchEvent(new PointerEvent("pointerdown",{...m,isPrimary:!0,pointerId:1,pointerType:"mouse",pressure:.5}))}catch{}o.dispatchEvent(new MouseEvent("mousedown",m));let l=4;for(let h=1;h<=l;h++){let f=Math.round(s+(n-s)*(h/l)),g=Math.round(r+(d-r)*(h/l)),b={...m,clientX:f,clientY:g,screenX:f,screenY:g};try{o.dispatchEvent(new PointerEvent("pointermove",{...b,isPrimary:!0,pointerId:1,pointerType:"mouse",pressure:.5}))}catch{}document.dispatchEvent(new MouseEvent("mousemove",b))}let p={bubbles:!0,cancelable:!0,composed:!0,view:window,clientX:n,clientY:d,screenX:n,screenY:d,button:0,buttons:0};try{e.dispatchEvent(new PointerEvent("pointerup",{...p,isPrimary:!0,pointerId:1,pointerType:"mouse",pressure:0}))}catch{}e.dispatchEvent(new MouseEvent("mouseup",p)),e.dispatchEvent(new MouseEvent("click",p));try{let h=Ca(Y(o.textContent),o.outerHTML),f={...m},g={...p};h&&(f.dataTransfer=h,g.dataTransfer=h);let b=o.ownerDocument.defaultView?.DragEvent;if(!b)throw new Error("DragEvent n\xE3o dispon\xEDvel neste documento");o.dispatchEvent(new b("dragstart",f)),e.dispatchEvent(new b("dragenter",g)),e.dispatchEvent(new b("dragover",g)),e.dispatchEvent(new b("drop",g)),o.dispatchEvent(new b("dragend",f))}catch(h){console.warn("[EasyQuiz] DragEvent ignorado com seguran\xE7a:",h)}try{let h=new Touch({identifier:1,target:o,clientX:s,clientY:r}),f=new Touch({identifier:1,target:e,clientX:n,clientY:d});o.dispatchEvent(new TouchEvent("touchstart",{bubbles:!0,cancelable:!0,touches:[h]})),e.dispatchEvent(new TouchEvent("touchmove",{bubbles:!0,cancelable:!0,touches:[f]})),e.dispatchEvent(new TouchEvent("touchend",{bubbles:!0,cancelable:!0,touches:[]}))}catch{}if(t>=2&&!e.contains(o))try{o.focus?.(),o.dispatchEvent(new KeyboardEvent("keydown",{key:" ",code:"Space",bubbles:!0})),o.dispatchEvent(new KeyboardEvent("keyup",{key:" ",code:"Space",bubbles:!0})),await new Promise(h=>setTimeout(h,80)),e.focus?.(),e.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",bubbles:!0})),e.dispatchEvent(new KeyboardEvent("keyup",{key:"Enter",code:"Enter",bubbles:!0}))}catch{}if(!e.contains(o))try{let h=b=>{let v=Object.keys(b).find(w=>w.startsWith("__reactFiber")||w.startsWith("__reactInternalInstance"));if(!v)return null;let x=b[v];for(let w=0;w<10&&x;w++){if(x.memoizedProps)return x.memoizedProps;x=x.return}return null},f=h(o),g=h(e);if(f){let b=f.onMouseDown||f.onPointerDown||f.onDragStart;if(typeof b=="function")try{b({type:"mousedown",button:0,buttons:1,clientX:s,clientY:r,bubbles:!0,preventDefault:()=>{},stopPropagation:()=>{},currentTarget:o,target:o}),await new Promise(v=>setTimeout(v,100))}catch{}}if(g){let b=g.onMouseUp||g.onPointerUp||g.onDrop;if(typeof b=="function")try{b({type:"mouseup",button:0,buttons:0,clientX:n,clientY:d,bubbles:!0,preventDefault:()=>{},stopPropagation:()=>{},currentTarget:e,target:e})}catch{}}try{o.focus?.(),o.dispatchEvent(new KeyboardEvent("keydown",{key:" ",code:"Space",keyCode:32,bubbles:!0,cancelable:!0})),await new Promise(v=>setTimeout(v,200));let b=d>r?"ArrowDown":"ArrowUp";for(let v=0;v<3;v++)document.dispatchEvent(new KeyboardEvent("keydown",{key:b,bubbles:!0,cancelable:!0})),await new Promise(x=>setTimeout(x,60));document.dispatchEvent(new KeyboardEvent("keydown",{key:" ",code:"Space",keyCode:32,bubbles:!0,cancelable:!0})),await new Promise(v=>setTimeout(v,80))}catch{}try{!!document.querySelector("[data-rbd-draggable-id], [data-rbd-droppable-id], [data-dnd-kit-sortable]")&&(o.dispatchEvent(new CustomEvent("dndkitdragstart",{bubbles:!0,cancelable:!0,detail:{id:o.id||o.getAttribute("data-id")}})),await new Promise(v=>setTimeout(v,100)),e.dispatchEvent(new CustomEvent("dndkitdrop",{bubbles:!0,cancelable:!0,detail:{overId:e.id||e.getAttribute("data-id")}})))}catch{}}catch(h){console.warn("[EasyQuiz] Estrat\xE9gia G (React DnD internals) falhou:",h)}if(!e.contains(o))try{let h=o.closest("[data-rbd-draggable-id]"),f=e.closest("[data-rbd-droppable-id]");if(h&&f){let g=h.getBoundingClientRect(),b=f.getBoundingClientRect(),v=g.left+g.width/2,x=g.top+g.height/2,w=b.left+b.width/2,y=b.top+b.height/2,E=(C,I,A,S)=>new PointerEvent(C,{bubbles:!0,cancelable:!0,composed:!0,clientX:I,clientY:A,screenX:I,screenY:A,isPrimary:!0,pointerId:1,pointerType:"mouse",pressure:C==="pointerup"?0:.5,...S});h.dispatchEvent(E("pointerdown",v,x)),await new Promise(C=>setTimeout(C,80));let T=8;for(let C=1;C<=T;C++){let I=v+(w-v)*(C/T),A=x+(y-x)*(C/T);window.dispatchEvent(E("pointermove",I,A)),document.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:I,clientY:A})),await new Promise(S=>setTimeout(S,20))}f.dispatchEvent(E("pointerup",w,y,{pressure:0})),f.dispatchEvent(new MouseEvent("mouseup",{bubbles:!0,clientX:w,clientY:y,button:0})),await new Promise(C=>setTimeout(C,120)),console.log("[EasyQuiz] Estrat\xE9gia H (Quizizz RBD) executada")}}catch(h){console.warn("[EasyQuiz] Estrat\xE9gia H (Quizizz RBD) falhou:",h)}}function Do(o,e,t,a){let i=d=>d.replace(/\\/g,"\\\\").replace(/'/g,"\\'").replace(/"/g,'\\"').slice(0,100),s=i(o.toLowerCase()),r=i(e.toLowerCase());return`var src=$eq.find('${i(t)}')||Array.from(document.querySelectorAll('[data-rbd-draggable-id],[draggable],[class*="cursor-grab"],[class*="dnd-card"]')).find(function(e){return (e.textContent||'').toLowerCase().includes('${s}');});var dst=Array.from(document.querySelectorAll('[data-rbd-droppable-id],[class*="list-group"],[class*="dropzone"],[data-category]')).find(function(e){var h=e.querySelector('.font-bold,h1,h2,h3,h4,[class*="header"]');var t=(h||e);return (t.textContent||'').toLowerCase().includes('${r}');});if(src&&dst){try{src.focus();src.dispatchEvent(new KeyboardEvent('keydown',{key:' ',code:'Space',keyCode:32,bubbles:true}));setTimeout(function(){dst.dispatchEvent(new KeyboardEvent('keydown',{key:'Enter',code:'Enter',bubbles:true}));},200);}catch(e){}try{dst.appendChild(src);}catch(e){}[src,dst].forEach(function(el){try{el.dispatchEvent(new Event('change',{bubbles:true}));}catch(e){}try{el.dispatchEvent(new CustomEvent('dndkitdrop',{bubbles:true,detail:{}}));}catch(e){}});}else{console.warn('[EQ-drag-fallback] nao localizado: ${s} -> ${r}');}`}var Ro={fill:(o,e)=>{let t=F(o);t?yt(t,e):console.warn(`$eq.fill: Elemento '${o}' n\xE3o encontrado`)},click:o=>{let e=F(o);e?!!(e.closest('.option-card, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, [class*="option" i], [class*="choice" i]')||e.querySelector('input[type="radio"], input[type="checkbox"]')||e instanceof HTMLInputElement&&["checkbox","radio"].includes(e.type))?Me(e,!0):ie(e):console.warn(`$eq.click: Elemento '${o}' n\xE3o encontrado`)},check:(o,e)=>{let t=F(o);t?Me(t,e):console.warn(`$eq.check: Elemento '${o}' n\xE3o encontrado`)},find:(o,e)=>F(o,e),drag:(o,e)=>{let t=ue(o,"source")||F(o),a=ue(e,"destination")||F(e);t&&a?wt(t,a):console.warn(`$eq.drag: Origem ou destino n\xE3o encontrado ('${o}' -> '${e}')`)},categorize:async(o,e)=>{let t=ue(o,"source")||F(o),a=ue(e,"destination")||F(e);if(!t||!a){console.warn(`$eq.categorize: Item ou categoria n\xE3o encontrados ('${o}' -> '${e}')`);return}await wt(t,a)},execute:(o,e=!1,t=1)=>nt(o,e,t)};typeof window<"u"&&(window.$eq=Ro);async function ka(o,e,t){if(!e)return!1;if(o.t==="val"&&(e.classList.contains("mq-editable-field")||e.closest(".mq-editable-field"))){let a=e.classList.contains("mq-editable-field")?e:e.closest(".mq-editable-field");if(a){try{let i=a.__controller||a.__mathquill_controller;if(i&&i.API)return i.API.latex(t),!0}catch{}try{a.focus();for(let i of t){let s={key:i,bubbles:!0,cancelable:!0};a.dispatchEvent(new KeyboardEvent("keydown",s)),a.dispatchEvent(new KeyboardEvent("keypress",s)),document.execCommand?.("insertText",!1,i),a.dispatchEvent(new KeyboardEvent("keyup",s))}return!0}catch{}}}if(o.t==="sel"&&e.closest(".perseus-widget-container")){let a=e.tagName==="BUTTON"?e:e.querySelector("button")||e.closest("button");if(a)try{ie(a),await new Promise(s=>setTimeout(s,150));let i=Array.from(document.querySelectorAll('[data-reach-popover], [role="listbox"], .perseus-dropdown'));for(let s of i){let n=Array.from(s.querySelectorAll('[role="option"], li, button')).find(d=>O(d.textContent).toLowerCase().includes(O(t).toLowerCase()));if(n)return ie(n),!0}ie(a)}catch{}}if((o.t==="clk"||o.t==="chk")&&e.closest(".perseus-widget-container"))try{let a=Object.keys(e).find(s=>s.startsWith("__reactFiber$")),i=Object.keys(e).find(s=>s.startsWith("__reactProps$"));if(i&&e[i]){let s=e[i];if(typeof s.onClick=="function")return s.onClick({preventDefault:()=>{},stopPropagation:()=>{}}),!0;if(typeof s.onChange=="function")return s.onChange({target:{checked:!0,value:t},preventDefault:()=>{}}),!0}}catch{}return!1}async function Ta(o,e=1,t=Ne()){if(Xt(o,t),o.t==="js"){let d=String(o.v||"");qo(d);try{new Function("$eq","document","window",d)(Ro,document,window)}catch(c){throw console.warn("[EasyQuiz JS Execution]",c),c}return}if(o.t==="drag"){let d=ue(o.from,"source")||F(o.from),c=ue(o.to,"destination")||F(o.to);!d&&o.from&&(d=F(O(o.from))),!c&&o.to&&(c=F(O(o.to))),d&&c?await wt(d,c,e):console.warn(`[EasyQuiz] Drag: alvo n\xE3o encontrado ('${o.from}' -> '${o.to}')`);return}let a=o.id!==void 0&&o.id!==null?String(o.id):"";!a&&o.t==="val"&&(a=o.target??o.name??o.selector??"1");let i=o.v!==void 0?o.v:o.value!==void 0?o.value:o.val!==void 0?o.val:o.text,s=i!=null?String(i).trim():"",r=null,n=String(o.name??o.n??"").trim();if(!n&&a&&document.querySelector(`input[type="radio"][name="${te(a)}"]`)&&(n=a),(o.t==="chk"||o.t==="clk")&&n){let d=Array.from(document.querySelectorAll(`input[name="${te(n)}"]`));if(s&&(r=d.find(c=>c.value?.toLowerCase()===s.toLowerCase())??null),!r&&s){let c=/^(v|verdadeiro|true|1|t|sim|correto)$/i.test(s),u=/^(f|falso|false|0|nao|não|incorreto|errado)$/i.test(s);if(c||u){let m=c?["v","verdadeiro","true","1","t","sim","correto"]:["f","falso","false","0","nao","n\xE3o","incorreto","errado"];r=d.find(l=>{let p=l.value?.toLowerCase()??"";if(m.includes(p))return!0;let f=(l.closest('label, td, [class*="option" i]')?.textContent??"").trim().toLowerCase();return m.some(g=>f===g||f.startsWith(g+" ")||f.startsWith("("+g+")"))})??null}}!r&&d.length>0&&(r=d[0])}if(r||(r=F(a,s,o.t==="val"||o.t==="sel")),!r&&a&&(r=F(O(a),s,o.t==="val"||o.t==="sel")),r&&s){if(r instanceof HTMLInputElement&&r.type==="radio"&&r.name){if(O(r.value).toLowerCase()!==O(s).toLowerCase()){let d=document.querySelector(`input[type="radio"][name="${te(r.name)}"][value="${te(s)}" i]`);if(d)r=d;else{let u=Array.from(document.querySelectorAll(`input[type="radio"][name="${te(r.name)}"]`)).find(m=>{let l=m.closest("label, .vf-label, .option-card, tr, td, div");return l&&O(l.textContent).toLowerCase().includes(O(s).toLowerCase())});u&&(r=u)}}}else if(!(r instanceof HTMLInputElement)&&!(r instanceof HTMLSelectElement)&&!(r instanceof HTMLTextAreaElement)){let d=r.querySelector(`input[value="${te(s)}" i], [data-value="${te(s)}" i]`);if(d)r=d;else{let u=Array.from(r.querySelectorAll('input[type="radio"], input[type="checkbox"]')).find(m=>{let l=m.closest("label, .vf-label, .option-card, td, div");return l&&O(l.textContent).toLowerCase().includes(O(s).toLowerCase())});u&&(r=u)}}}if(!r&&(o.t==="val"||o.t==="sel")){let d=document.body;try{d=le()||document.body}catch{}let c=Array.from(d.querySelectorAll(o.t==="sel"?'select, [role="combobox"], [role="listbox"]':'input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, select, [contenteditable="true"]')).filter(u=>Q(u)&&!$(u));if(c.length===1)r=c[0];else if(c.length>1){let u=O(a).toLowerCase(),m=u.match(/^#?_?([0-9]+)$/);if(m){let l=parseInt(m[1],10);l>=1&&l<=c.length?r=c[l-1]:l>=0&&l<c.length&&(r=c[l])}r||(r=c.find(p=>{let h=(p.getAttribute("placeholder")||"").toLowerCase(),f=(p.name||"").toLowerCase(),g=(p.getAttribute("aria-label")||"").toLowerCase(),b=(p.id||"").toLowerCase(),v=O(Gt(p)).toLowerCase(),x=O(p.closest('label, tr, td, .form-group, .field, [class*="row" i], div')?.textContent||"").toLowerCase();return h.includes(u)||f.includes(u)||g.includes(u)||b.includes(u)||v&&v.includes(u)||u.length>=2&&x.includes(u)})||(c.length===1?c[0]:null))}}if(!r&&o.t!=="adv"){let d=document.querySelector(".perseus-renderer, .framework-perseus, .perseus-widget-container");if(d){let c=O(a).toLowerCase(),u=Array.from(d.querySelectorAll('.mq-editable-field, [role="radio"], [role="checkbox"], [role="combobox"], input:not([type="hidden"]), textarea, select, [role="button"], [role="option"]')).filter(m=>Q(m)&&!$(m));if(r=u.find(m=>{let l=(m.textContent||"").trim().toLowerCase(),p=(m.id||"").toLowerCase(),h=(m.getAttribute("aria-label")||"").toLowerCase(),f=(m.value||m.getAttribute("data-value")||"").toLowerCase();return p===c||l===c||h===c||f===c||c.length>=3&&(l.includes(c)||h.includes(c))})||null,!r&&o.t==="val"&&u.length>0){let m=u.filter(l=>l instanceof HTMLInputElement||l instanceof HTMLTextAreaElement||l.classList.contains("mq-editable-field")||l.classList.contains("mq-root-block")||l.isContentEditable);if(m.length>0){let l=c.match(/^#?_?([0-9]+)$/);if(l){let p=parseInt(l[1],10);r=m[Math.min(p-1,m.length-1)]||m[0]}else r=m[0]}}}}if(!r&&o.t!=="adv")throw new Error(`Alvo '${a}' n\xE3o encontrado no DOM para a\xE7\xE3o '${o.t}'.`);if(!(Xe()&&r&&o.t!=="adv"&&await ka(o,r,s)))switch(o.t){case"val":if(r){let u=r instanceof HTMLInputElement||r instanceof HTMLTextAreaElement||r instanceof HTMLSelectElement||r.isContentEditable?r:r.querySelector('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]');if(!u){let f=r.closest('.form-group, .field, [class*="input" i], [class*="control" i], label, tr, td, li, p, div')?.querySelector('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]');f&&(u=f)}if(!u){let h=r.nextElementSibling;for(;h;){if(h instanceof HTMLInputElement&&!["hidden","button","submit","checkbox","radio"].includes(h.type)||h instanceof HTMLTextAreaElement||h instanceof HTMLElement&&h.isContentEditable){u=h;break}let f=h.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(f){u=f;break}h=h.nextElementSibling}}if(!u){let h=document.body;try{h=le()||document.body}catch{}let f=Array.from(h.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]')).filter(g=>Q(g)&&!$(g));f.length>0&&(u=f[0])}let m=o.v!==void 0?o.v:o.value!==void 0?o.value:o.val!==void 0?o.val:o.text,l=m!=null?String(m):"",p=u||r;if(p instanceof HTMLInputElement){let h=p.type.toLowerCase(),f=p.maxLength,g=p.min,b=p.max,v=p.step,x=p.pattern;if(f>0&&l.length>f&&(l=l.slice(0,f)),h==="number"||h==="range"){let w=parseFloat(l);if(!isNaN(w)){let y=w;if(g!==""&&!isNaN(parseFloat(g))&&(y=Math.max(y,parseFloat(g))),b!==""&&!isNaN(parseFloat(b))&&(y=Math.min(y,parseFloat(b))),v!==""&&v!=="any"&&!isNaN(parseFloat(v))){let E=parseFloat(v),T=g!==""?parseFloat(g):0;y=T+Math.round((y-T)/E)*E,g!==""&&!isNaN(parseFloat(g))&&(y=Math.max(y,parseFloat(g))),b!==""&&!isNaN(parseFloat(b))&&(y=Math.min(y,parseFloat(b)))}l=Number.isInteger(y)?String(y):String(parseFloat(y.toFixed(6)))}}if(x)try{let w=new RegExp(`^(?:${x})$`);if(!w.test(l)){let y=l.match(/-?\d+\.?\d*/);y&&w.test(y[0])&&(l=y[0])}}catch{}}yt(u||r,l)}break;case"chk":let d=o.c!==void 0?!!o.c:!0;r&&Me(r,d);break;case"sel":if(r){let u=Array.isArray(o.v)?o.v:[String(o.v)];At(r,u)}break;case"clk":if(r)if(!!(r.closest('.option-card, label, .vf-label, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, [class*="option" i], [class*="choice" i], [class*="answer" i], li, tr')||r.querySelector('input[type="radio"], input[type="checkbox"]')||r instanceof HTMLInputElement&&["checkbox","radio"].includes(r.type))){let m=o.c!==void 0?!!o.c:!0;Me(r,m)}else ie(r,o.co);break;case"adv":let c=qt(o.id);if(c){await Zt(c,1200);let u=o.id||c.textContent?.trim()||"";u&&Dt(window.location.hostname,{advanceSelector:u}),ie(c)}else console.warn("[EasyQuiz] Bot\xE3o de avan\xE7o n\xE3o localizado.");break}}function Sa(){let o=["button","a",'[role="button"]','input[type="submit"]','input[type="button"]','[data-testid*="check" i]','[data-test-id*="check" i]'].join(",");return Array.from(document.querySelectorAll(o)).find(t=>{if(!Q(t)||$(t)||t.closest("header, nav, aside"))return!1;let a=t instanceof HTMLInputElement||t instanceof HTMLButtonElement?t.value:"",i=(t.textContent||a||t.getAttribute("aria-label")||"").trim();return/(verificar|checar|check|conferir|validar|enviar|responder)/i.test(i)})||null}function qt(o){let e=l=>{let p=(l.getAttribute("aria-label")||l.textContent||(l instanceof HTMLInputElement||l instanceof HTMLButtonElement?l.value:"")||"").trim();return qe.test(p)};if(o){let l=F(o);if(l&&Q(l)&&!$(l)&&!_(l)&&!e(l))return l}try{let l=Ot(window.location.hostname);if(l.advanceSelector){let p=F(l.advanceSelector);if(p&&Q(p)&&!$(p)&&!_(p)&&!e(p))return p}}catch{}let t=["button","a",'[role="button"]','[role="link"]','input[type="button"]','input[type="submit"]','[data-testid*="next" i]','[data-testid*="continue" i]','[data-testid*="check" i]','[data-test-id*="next" i]','[data-test-id*="continue" i]','[data-test-id*="check" i]','[class*="next" i]','[class*="continue" i]','[class*="proximo" i]','[class*="avancar" i]'].join(","),a=Array.from(document.querySelectorAll(t)),i=l=>{let p=l instanceof HTMLInputElement||l instanceof HTMLButtonElement?l.value:"";return(l.getAttribute("aria-label")||l.textContent||p||"").trim()},s=l=>{let p=i(l).trim();return/^\d{1,3}$/.test(p)?!!l.closest('[class*="pagination" i], [class*="pager" i], [class*="page-nav" i], [class*="step-indicator" i], [class*="breadcrumb" i], [class*="steps" i], [aria-label*="p\xE1gina" i], [aria-label*="page" i], [role="navigation"], nav'):!1},r=a.filter(l=>Q(l)&&!$(l)&&!l.closest("header, aside")&&!_(l)&&!e(l));for(let l of r){let p=i(l),h=p.replace(/[\d\(\)\[\]\u2192>\u2022\-\/\\]+/g," ").trim();if((tt.test(p)||tt.test(h))&&!s(l)&&!_(l))return l}for(let l of r)if(re(l)&&!_(l)&&!s(l))return l;let n=document.querySelector('[data-test-id*="next" i], [data-testid*="next" i], [aria-label*="next" i], [aria-label*="pr\xF3xim" i], [aria-label*="avan\xE7ar" i], [aria-label*="continuar" i]');if(n&&Q(n)&&!$(n)&&!_(n)&&!e(n))return n;let d=Array.from(document.querySelectorAll('input[type="submit"], button[type="submit"]'));for(let l of d)if(Q(l)&&!$(l)&&!e(l)&&!_(l)&&!s(l))return l;let c=Array.from(document.querySelectorAll('button, [role="button"]')),u=window.innerHeight,m=c.filter(l=>{if(!Q(l)||$(l)||e(l)||_(l)||l.closest("header, nav, aside, .eq-sidebar")||s(l))return!1;let p=l.getBoundingClientRect();return p.top>u*.45&&p.height>=24&&p.width>=24});if(m.length>0)return m.sort((l,p)=>{let h=l.getBoundingClientRect(),f=p.getBoundingClientRect(),g=h.left+h.top;return f.left+f.top-g}),m[0];for(let l of r)if(re(l)&&!_(l))return l;return null}async function Zt(o,e=2500){let t=Date.now();for(;Date.now()-t<e;){if(!(o.disabled===!0||o.getAttribute("aria-disabled")==="true"||o.classList.contains("disabled")||o.getAttribute("disabled")!==null))return;await new Promise(i=>setTimeout(i,80))}}function La(){let o=window.location.href,e=document.title,t=document.querySelectorAll('input, textarea, select, button, [role="button"], [role="option"], [role="radio"], [role="checkbox"]').length,a=(document.body?.innerText||document.body?.textContent||"").length;return`${o}|${e}|${t}|${a}`}async function Ma(o,e=3500){let[t,a,i,s]=o.split("|"),r=parseInt(s||"0",10),n=Date.now();for(;Date.now()-n<e;){let d=window.location.href,c=document.title,u=String(document.querySelectorAll('input, textarea, select, button, [role="button"], [role="option"], [role="radio"], [role="checkbox"]').length),m=(document.body?.innerText||document.body?.textContent||"").length;if(d!==t)return{changed:!0,evidence:`URL mudou: ${t} \u2192 ${d}`};if(c!==a)return{changed:!0,evidence:`T\xEDtulo da p\xE1gina mudou: "${a}" \u2192 "${c}"`};if(Math.abs(parseInt(u)-parseInt(i||"0"))>=2)return{changed:!0,evidence:`Controles interativos: ${i} \u2192 ${u}`};if(Math.abs(m-r)>50)return{changed:!0,evidence:`Conte\xFAdo da p\xE1gina mudou substancialmente (${Math.abs(m-r)} chars)`};await new Promise(l=>setTimeout(l,100))}return{changed:!1,evidence:"Nenhuma mudan\xE7a estrutural detectada dentro do tempo limite."}}async function Et(o){if(o.t==="js"||o.t==="adv")return;if(o.t==="drag"){let s=F(o.from)||F(O(o.from)),r=F(o.to)||F(O(o.to));s&&r&&await wt(s,r,2);return}let e=o.id||"",t=o.v!==void 0?String(o.v).trim():"",a=F(e,t)||F(O(e),t),i=String(o.name??o.n??"").trim();if(!i&&e&&document.querySelector(`input[type="radio"][name="${te(e)}"]`)&&(i=e),!a&&i){let s=Array.from(document.querySelectorAll(`input[name="${te(i)}"]`));if(t&&(a=s.find(r=>r.value?.toLowerCase()===t.toLowerCase())??null),!a&&t){let r=/^(v|verdadeiro|true|1|t|sim|correto)$/i.test(t),n=/^(f|falso|false|0|nao|não|incorreto|errado)$/i.test(t);if(r||n){let d=r?["v","verdadeiro","true","1","t","sim","correto"]:["f","falso","false","0","nao","n\xE3o","incorreto","errado"];a=s.find(c=>{let u=c.value?.toLowerCase()??"";if(d.includes(u))return!0;let l=(c.closest('label, td, [class*="option" i]')?.textContent??"").trim().toLowerCase();return d.some(p=>l===p||l.startsWith(p+" ")||l.startsWith("("+p+")"))})??null}}!a&&s.length>0&&(a=s[0])}if(o.t==="clk"||o.t==="chk"){if(!a&&e){let r=Array.from(document.querySelectorAll('input, label, button, [role="radio"], [role="checkbox"], .option-card, [class*="option" i], [class*="choice" i]')),n=O(e).toLowerCase();a=r.find(d=>{let c=O(d.textContent).toLowerCase();return!!(O(d.value||"").toLowerCase()===n||c===n||c.startsWith(n+")")||c.startsWith("("+n+")")||c.startsWith(n+".")||c.startsWith(n+" - ")||c.startsWith(n+":")||n.length>=3&&c.includes(n))})||null}let s=o.v!==void 0?String(o.v).trim():"";if(a&&s){if(a instanceof HTMLInputElement&&a.type==="radio"&&a.name){if(O(a.value).toLowerCase()!==O(s).toLowerCase()){let r=document.querySelector(`input[type="radio"][name="${te(a.name)}"][value="${te(s)}" i]`);if(r)a=r;else{let d=Array.from(document.querySelectorAll(`input[type="radio"][name="${te(a.name)}"]`)).find(c=>{let u=c.closest("label, .vf-label, .option-card, tr, td, div");return u&&O(u.textContent).toLowerCase().includes(O(s).toLowerCase())});d&&(a=d)}}}else if(!(a instanceof HTMLInputElement)&&!(a instanceof HTMLSelectElement)&&!(a instanceof HTMLTextAreaElement)){let r=a.querySelector(`input[value="${te(s)}" i], [data-value="${te(s)}" i]`);if(r)a=r;else{let d=Array.from(a.querySelectorAll('input[type="radio"], input[type="checkbox"]')).find(c=>{let u=c.closest("label, .vf-label, .option-card, td, div");return u&&O(u.textContent).toLowerCase().includes(O(s).toLowerCase())});d&&(a=d)}}}if(a){let r=a.closest('.option-card, label, .vf-label, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, li')||a,n=a instanceof HTMLInputElement&&["radio","checkbox"].includes(a.type)?a:r.querySelector('input[type="radio"], input[type="checkbox"]')||(r.getAttribute("for")?r.ownerDocument.getElementById(r.getAttribute("for")):null),d=o.c!==void 0?!!o.c:!0;if(Me(n||r,d),n&&n.checked!==d){try{let c=n._valueTracker;c&&c.setValue(!d)}catch{}try{Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"checked")?.set?.call(n,d)}catch{}n.checked=d,n.dispatchEvent(new Event("input",{bubbles:!0,composed:!0})),n.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}}return}if(o.t==="val"){let s=null;if(a&&(s=a instanceof HTMLInputElement||a instanceof HTMLTextAreaElement||a.isContentEditable?a:a.querySelector('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]')),!s){let r=document.body;try{r=le()||document.body}catch{}let n=Array.from(r.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]')),d=O(e).toLowerCase();s=n.find(c=>{let u=(c.getAttribute("placeholder")||"").toLowerCase(),m=(c.name||"").toLowerCase(),l=(c.id||"").toLowerCase(),p=(c.getAttribute("aria-label")||"").toLowerCase();return u.includes(d)||m.includes(d)||l.includes(d)||p.includes(d)})||(n.length>0?n[0]:null)}if(s){let r=String(o.v??"");try{if(s.focus?.(),s.type!=="number"){try{s.select?.()}catch{}document.execCommand?.("insertText",!1,r)}}catch{}yt(s,r)}return}if(o.t==="sel"){if(!a&&e){let s=Array.from(document.querySelectorAll("select")),r=O(e).toLowerCase();a=s.find(n=>{let d=(n.name||"").toLowerCase(),c=(n.id||"").toLowerCase(),u=(n.getAttribute("aria-label")||"").toLowerCase();return d.includes(r)||c.includes(r)||u.includes(r)})||null}if(a){let s=Array.isArray(o.v)?o.v:[String(o.v)];At(a,s)}return}}function de(o){try{if(o.t==="val"){let e=o.v!==void 0?o.v:o.value!==void 0?o.value:o.val!==void 0?o.val:o.text,t=String(e??"").trim(),a=t,i=o.id!==void 0&&o.id!==null?String(o.id):"";i||(i=o.target??o.name??o.selector??"1");let s=F(i,a,!0)||F(O(i),a,!0);if(!s){let p=document.body;try{p=le()||document.body}catch{}let h=Array.from(p.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]')).filter(f=>Q(f)&&!$(f));h.length>0&&(s=h[0])}if(!s)return!1;let r=s instanceof HTMLInputElement&&s.type==="radio"?s:s.querySelector('input[type="radio"]');if(r&&r.name){let p=document.querySelector(`input[type="radio"][name="${te(r.name)}"]:checked`);if(!p)return!1;let h=O(p.value).toLowerCase(),f=O(t).toLowerCase(),g=O(p.closest("label, .vf-label, .option-card, tr, td, div")?.textContent||"").toLowerCase();return h===f||g===f||g.includes(f)}let n=s instanceof HTMLInputElement||s instanceof HTMLTextAreaElement||s.isContentEditable?s:s.querySelector('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(!n){let h=s.closest('.form-group, .field, [class*="input" i], [class*="control" i], label, tr, td, li, p, div')?.querySelector('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]');h&&(n=h)}if(!n){let p=s.nextElementSibling;for(;p;){if(p instanceof HTMLInputElement&&!["hidden","button","submit","checkbox","radio"].includes(p.type)||p instanceof HTMLTextAreaElement||p instanceof HTMLElement&&p.isContentEditable){n=p;break}let h=p.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(h){n=h;break}p=p.nextElementSibling}}if(n instanceof HTMLSelectElement){let p=O(t).toLowerCase();return Array.from(n.options).some(h=>{if(!h.selected)return!1;let f=h.value.toLowerCase(),g=O(h.textContent).toLowerCase();return p===f||p===g||f.includes(p)||g.includes(p)})}let d=(n instanceof HTMLInputElement||n instanceof HTMLTextAreaElement?n.value:n?.textContent??s.textContent??"").trim();if(!d&&!t)return!0;if(!d&&t)return!1;let c=d.replace(",",".").replace(/\s+/g,"").toLowerCase(),u=t.replace(",",".").replace(/\s+/g,"").toLowerCase(),m=parseFloat(c),l=parseFloat(u);return!isNaN(m)&&!isNaN(l)&&c.match(/^-?[\d.,]+$/)&&u.match(/^-?[\d.,]+$/)?Math.abs(m-l)<1e-4:c===u||d.toLowerCase()===t.toLowerCase()||u.length>=3&&c===u}if(o.t==="sel"){let e=F(o.id,void 0,!0)||F(O(o.id),void 0,!0);if(!e){let s=document.body;try{s=le()||document.body}catch{}let r=Array.from(s.querySelectorAll('select, [role="combobox"], [role="listbox"]')).filter(c=>Q(c)&&!$(c)),n=O(o.id).toLowerCase();e=r.find(c=>{let u=(c.id||"").toLowerCase(),m=(c.getAttribute("name")||"").toLowerCase(),l=(c.getAttribute("aria-label")||"").toLowerCase(),p=O(c.closest('.dropdown-row, [class*="dropdown" i], [class*="select" i], tr, label, div')?.textContent||"").toLowerCase();return u.includes(n)||m.includes(n)||l.includes(n)||n.length>=2&&p.includes(n)})||(r.length===1?r[0]:null)}if(!e)return!1;let t=e instanceof HTMLSelectElement?e:e.querySelector("select");if(!t){let s=e.matches?.('[role="combobox"], [role="listbox"], [class*="select" i], [class*="dropdown" i]')?e:e.closest('[role="combobox"], [role="listbox"], [class*="select" i], [class*="dropdown" i]');if(s){let n=(Array.isArray(o.v)?o.v:[String(o.v)]).map(c=>O(c).toLowerCase()),d=O(s.textContent).toLowerCase();return n.some(c=>d.includes(c)||c.includes(d))}return!1}let i=(Array.isArray(o.v)?o.v:[String(o.v)]).map(s=>O(s).toLowerCase());return Array.from(t.options).some(s=>{if(!s.selected)return!1;let r=s.value.toLowerCase(),n=O(s.textContent).toLowerCase();return i.some(d=>d===r||d===n||r.includes(d)||n.includes(d))})}if(o.t==="chk"||o.t==="clk"){let e=o.v!==void 0?String(o.v).trim():"",t=String(o.name??o.n??"").trim();if(t&&!o.id){let p=Array.from(document.querySelectorAll(`input[name="${te(t)}"]`));if(p.length>0){let h=p.find(x=>x.checked);if(!h)return!1;if(!e)return!0;let f=h.value?.toLowerCase()??"",g=e.toLowerCase();if(f===g)return!0;let b=/^(v|verdadeiro|true|1|t|sim|correto)$/i.test(e),v=/^(f|falso|false|0|nao|não|incorreto|errado)$/i.test(e);return b?/^(v|verdadeiro|true|1|t|sim|correto)$/i.test(f):v?/^(f|falso|false|0|nao|não|incorreto|errado)$/i.test(f):!1}}let a=F(o.id,e)||F(O(o.id),e);if(!a&&t){let p=document.querySelector(`input[name="${te(t)}"]`);p&&(a=p)}if(!a)return!1;let i=a.closest('.option-card, label, .vf-label, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, li')||a,s=a instanceof HTMLInputElement&&["checkbox","radio"].includes(a.type)?a:i.querySelector('input[type="checkbox"], input[type="radio"]')||(i.getAttribute("for")?i.ownerDocument.getElementById(i.getAttribute("for")):null),r=o.t==="chk"||o.c!==void 0?!!o.c:!0;if(s&&s.type==="radio"){if(s.checked===r)return!0;if(o.v&&s.name){let p=O(String(o.v)).toLowerCase(),h=document.querySelector(`input[type="radio"][name="${te(s.name)}"]:checked`);if(!h)return!1;if(h===s)return!0;let f=O(h.value).toLowerCase(),g=O(h.closest("label, .vf-label, .option-card, tr, td, div")?.textContent||"").toLowerCase();return f===p||g.includes(p)||p.includes(f)}}if(s&&["checkbox","radio"].includes(s.type))return s.checked===r;let n=i.getAttribute("aria-checked")===String(r)||i.getAttribute("aria-selected")===String(r)||i.getAttribute("aria-pressed")===String(r),d=r?i.getAttribute("data-selected")==="true"||i.getAttribute("data-checked")==="true"||i.getAttribute("data-active")==="true"||i.getAttribute("data-state")==="checked"||i.getAttribute("data-state")==="on":i.getAttribute("data-selected")==="false"||i.getAttribute("data-checked")==="false"||i.getAttribute("data-state")==="unchecked",c=i.className||"",u=r?/\b(active|selected|checked|picked|is-selected|choice-selected|selected-option|is-checked|chosen|current)\b/i.test(c):!/\b(active|selected|checked|picked|is-selected|choice-selected|selected-option|is-checked|chosen|current)\b/i.test(c);if(n||d||u)return!0;let m=!!i.closest('[role="radiogroup"], [role="listbox"], .options, .choices, [class*="option" i], [class*="choice" i], [class*="answer" i], [class*="quiz" i]');if(o.t==="clk"&&!s&&!m)return i.hasAttribute("aria-selected")||i.hasAttribute("data-selected")||i.hasAttribute("data-checked")||i.hasAttribute("data-state")||i.hasAttribute("aria-checked")||i.hasAttribute("aria-pressed")?i.getAttribute("aria-selected")==="true"||i.getAttribute("data-selected")==="true"||i.getAttribute("data-checked")==="true"||/^(checked|on|selected|active)$/i.test(i.getAttribute("data-state")||"")||i.getAttribute("aria-checked")==="true"||i.getAttribute("aria-pressed")==="true":!0;if(i.getAttribute("aria-expanded")!==null||i.getAttribute("aria-pressed")!==null)return!0;let l=/\b(selected|active|correct|chosen|is-selected|is-active)\b/i;return l.test(i.className||"")||l.test(a.className||"")?!0:(i.disabled||i.getAttribute("aria-disabled")==="true",!1)}if(o.t==="drag"){let e=ue(o.from,"source")||F(o.from)||F(O(o.from)),t=ue(o.to,"destination")||F(o.to)||F(O(o.to));return!e||!t?!1:Oo(e,t).success}}catch{}return!1}async function nt(o,e,t=1,a=Ne({engine:"smart",autoAdvance:e})){let i=o.actions.filter(A=>A.t!=="adv"),s=o.actions.filter(A=>A.t==="adv"),r=0,n=[],d=new Map,c=new Map,u=new Map,m=new Set,l=new Map,p=o.pageType==="question"||i.length>0,h=i.filter(A=>A.t==="chk"||A.t==="clk"&&A.c!==void 0),f=new Map;for(let A of i){let S=[];c.set(A,S),l.set(A,new Set);try{if(A.t==="drag"){S.push("declarative-A-F");try{let z=ue(A.from,"source")||F(A.from),D=ue(A.to,"destination")||F(A.to);z&&u.set(A,z.parentElement?.outerHTML?.slice(0,500)||""),D&&f.set(A,D.children.length)}catch{}}else S.push("declarative-primary");await Ta(A,t,a),m.add(A)}catch(z){let D=z instanceof Error?z.message:String(z);d.set(A,D),l.get(A)?.add("declarative-primary"),console.warn("[EasyQuiz] A\xE7\xE3o declarativa prim\xE1ria falhou com seguran\xE7a:",A,z)}await new Promise(z=>setTimeout(z,A.t==="drag"?180:35))}await new Promise(A=>setTimeout(A,i.length>0?120:25));for(let A of i)if(m.has(A)&&!d.has(A)){if(A.t==="js"){r++;continue}if(A.t==="drag"){let S=ue(A.from,"source")||F(A.from),z=ue(A.to,"destination")||F(A.to),D=f.get(A);S&&z&&Oo(S,z,D).success&&r++;continue}de(A)&&r++}if(p&&o.mode==="escolha_multipla"&&h.length>0){let A=document.body;try{A=le()||document.body}catch{}let S=Array.from(A.querySelectorAll('input[type="checkbox"], [role="checkbox"]')).filter(z=>Q(z)&&!$(z));if(S.length>1){let D=function(q,k){if(q===k||q.contains(k)||k.contains(q))return!0;let M=q.closest('.option-card, label, [role="checkbox"], [role="option"], tr, li, [class*="option" i]'),B=k.closest('.option-card, label, [role="checkbox"], [role="option"], tr, li, [class*="option" i]');if(M&&B&&M===B)return!0;let X=q.getAttribute("for")||q.id,W=k.getAttribute("for")||k.id;return!!(X&&W&&X===W)};var I=D;let z=new Set;for(let q of h){let k=q.t==="chk"?!!q.c:!!(q.c??!0),M="id"in q&&typeof q.id=="string"?q.id:"";if(k&&M){let B=F(M,q.v);if(B){z.add(B);let X=B.querySelector('input[type="checkbox"]');X&&z.add(X);let W=B.closest('.option-card, label, [role="checkbox"], tr, li, [class*="option" i]');W&&(z.add(W),W.querySelectorAll('input[type="checkbox"]').forEach(J=>z.add(J)))}}}if(z.size>=h.length&&z.size>0){let q=Array.from(z);for(let k of S)q.some(B=>D(B,k))||(k instanceof HTMLInputElement&&k.checked||k.getAttribute("aria-checked")==="true"||k.closest(".option-card, label")?.classList.contains("selected"))&&Me(k,!1)}}}await new Promise(A=>setTimeout(A,i.length>0?100:25));let g=0;for(let A of i){if(de(A)){g++;continue}console.warn(`[EasyQuiz Auto-Cura] A\xE7\xE3o '${A.t}' no alvo '${A.id||A.from||""}' n\xE3o verificada no DOM. Disparando Passagem 2 de conting\xEAncia...`);try{Xt(A,a),c.get(A)?.push("alternative-path"),await Et(A)}catch(S){d.set(A,S instanceof Error?S.message:String(S)),console.warn("[EasyQuiz Auto-Cura] Rota alternativa falhou:",S)}await new Promise(S=>setTimeout(S,250)),de(A)&&(console.log("[EasyQuiz Auto-Cura] \u2713 A\xE7\xE3o recuperada com sucesso pela rota de conting\xEAncia!"),g++,m.has(A)?d.has(A)&&d.delete(A):(d.delete(A),r++,m.add(A)))}if(g<i.length&&i.length>0){console.warn(`[EasyQuiz Auto-Cura] ${i.length-g} de ${i.length} a\xE7\xE3o(\xF5es) ainda n\xE3o verificadas. Disparando Passagem 3 final...`),await new Promise(A=>setTimeout(A,200));for(let A of i)if(!de(A))try{if(await Et(A),await new Promise(S=>setTimeout(S,80)),!de(A)&&(A.t==="clk"||A.t==="chk"))try{let S="id"in A?String(A.id||""):"",z=A.v!==void 0?String(A.v).trim():"",D=F(S,z)||F(O(S),z);D&&(_t(D),await new Promise(q=>setTimeout(q,120)))}catch{}}catch(S){d.set(A,S instanceof Error?S.message:String(S))}await new Promise(A=>setTimeout(A,200)),g=0;for(let A of i)de(A)&&(g++,m.has(A)?d.has(A)&&d.delete(A):(d.delete(A),r++,m.add(A)))}let b=[];for(let[A,S]of i.entries())if(!de(S)){let z=S.t==="drag"?`${S.from} -> ${S.to}`:"id"in S&&S.id?S.id:S.t;n.push(z),b.push({actionIndex:A,action:S,strategiesAttempted:c.get(S)||[],evidence:d.get(S)||"sem evid\xEAncia de aplica\xE7\xE3o no DOM",domSnapshot:u.get(S)}),S.t==="drag"&&console.warn(`[EasyQuiz Drag] FALHA CONFIRMADA: "${S.from}" -> "${S.to}"`,`
  Estrat\xE9gias: ${(c.get(S)||[]).join(", ")}`,`
  Snapshot DOM: ${u.get(S)?.slice(0,200)||"n/a"}`)}p&&i.length===0&&n.push("nenhuma a\xE7\xE3o de resposta prescrita");let v=i.map((A,S)=>{let z=A.t==="drag"?`${A.from} -> ${A.to}`:A.t==="js"?"$eq":A.id||A.t,D=A.t==="js"?!0:A.t==="drag"?!!(ue(A.from,"source")&&ue(A.to,"destination")):!!(F(A.id||"")||F(O(A.id||""))),q=de(A);return{index:S,action:A,target:z,located:D,applied:!d.has(A),verified:q,strategy:A.t==="drag"?"drag-adaptive":A.t==="js"?"javascript":"declarative-dom",evidence:q?"estado do controle confirmado no DOM":"nenhuma evid\xEAncia suficiente ap\xF3s as tentativas",...d.has(A)?{error:d.get(A)}:{}}}),x=p?i.length>0&&n.length===0&&(g===i.length||r===i.length&&g>0):!0,w=!1,y=!1,E="Nenhuma a\xE7\xE3o de navega\xE7\xE3o solicitada.",T=p?g>0&&g>=Math.ceil(i.length/2):r>0&&r>=i.length/2,C=p?g>0&&(x||T):x||i.length===0||T;if(e&&C){await new Promise(z=>setTimeout(z,i.length>0?120:40));let A=!1,S=null;if(o.pageType!=="info"){let z=Sa();if(z&&Q(z)){await Zt(z,1200),ie(z),A=!0,S=z,await new Promise(k=>setTimeout(k,350));let D=document.querySelector('.feedback-message.error, [class*="feedback"][class*="error" i], [role="alert"][class*="error" i]');D&&Q(D)&&(D.textContent||"").trim().length>0?(w=!1,y=!1,E=`Aviso do formul\xE1rio ap\xF3s checagem: ${D.textContent?.trim().slice(0,100)}`):(w=!0,y=!0,E="Resposta confirmada via bot\xE3o de verifica\xE7\xE3o/envio.")}}if(!A){let z=La(),D=s.length>0&&"id"in s[0]?s[0].id:void 0,q=qt(D);if(q){await Zt(q,1500);let k=D||q.textContent?.trim()||"";k&&Dt(window.location.hostname,{advanceSelector:k}),ie(q);let M=await Ma(z,1800);y=M.changed,E=M.evidence,w=M.changed||!0,M.changed||console.warn("[EasyQuiz] O bot\xE3o de avan\xE7o foi acionado, mas a navega\xE7\xE3o ainda n\xE3o concluiu.")}else console.warn("[EasyQuiz] Nenhum bot\xE3o de avan\xE7o encontrado na p\xE1gina.")}}return{applied:r,verified:g,success:x,advanced:w,failed:n,reports:v,navigationVerified:y,navigationEvidence:E,failedActions:b}}var xe=null,Be=[],eo=[],it=[],to=[],ye=null,ge=null,No=40,Ia=`
@keyframes eq-image-pulse-yellow-white {
  0%, 100% {
    border-color: #ffd600;
    outline-color: #ffd600;
    box-shadow: 0 0 16px rgba(255, 214, 0, 0.95), 0 0 32px rgba(255, 214, 0, 0.5), inset 0 0 12px rgba(255, 214, 0, 0.25);
  }
  50% {
    border-color: #ffffff;
    outline-color: #ffffff;
    box-shadow: 0 0 22px rgba(255, 255, 255, 0.95), 0 0 40px rgba(255, 214, 0, 0.8), inset 0 0 16px rgba(255, 255, 255, 0.35);
  }
}
@keyframes eq-scope-scan-loop {
  0% { top: 0%; opacity: 0.95; }
  50% { top: 96%; opacity: 0.75; }
  100% { top: 0%; opacity: 0.95; }
}
@keyframes eq-badge-fade-in {
  0% { opacity: 0; transform: scale(0.8) translateY(-4px); }
  100% { opacity: 1; transform: scale(1) translateY(0); }
}
`;function Bo(){try{if(typeof document>"u"||!document.head)return;if(!document.getElementById("eq-image-pulse-style")){let o=document.createElement("style");o.id="eq-image-pulse-style",o.textContent=Ia,document.head.appendChild(o)}}catch{}}function Ie(){xe&&(xe.style.removeProperty("outline"),xe.style.removeProperty("outline-offset"),xe.style.removeProperty("position"),xe=null);for(let o of Be)o.style.removeProperty("outline"),o.style.removeProperty("outline-offset"),o.style.removeProperty("background-color"),o.style.removeProperty("box-shadow"),o.removeAttribute("data-easyquiz-highlight");Be=[];for(let o of eo)o.style.removeProperty("animation"),o.style.removeProperty("outline"),o.style.removeProperty("outline-offset"),o.style.removeProperty("box-shadow"),o.style.removeProperty("filter"),o.removeAttribute("data-easyquiz-image-highlight");eo=[];for(let o of it)try{o.remove()}catch{}it=[],ge&&typeof window<"u"&&(window.removeEventListener("scroll",ge),window.removeEventListener("resize",ge),ge=null);for(let o of to)try{o.remove()}catch{}if(to=[],ye){try{ye.remove()}catch{}ye=null}try{document.querySelectorAll("[data-easyquiz-image-frame]").forEach(o=>{try{o.remove()}catch{}}),document.querySelectorAll("[data-easyquiz-capture-badge]").forEach(o=>{try{o.remove()}catch{}}),document.querySelectorAll("[data-easyquiz-image-highlight]").forEach(o=>{try{let e=o;e.style.removeProperty("animation"),e.style.removeProperty("outline"),e.style.removeProperty("outline-offset"),e.style.removeProperty("box-shadow"),e.style.removeProperty("filter"),e.removeAttribute("data-easyquiz-image-highlight")}catch{}})}catch{}}function oo(o){Bo();let e=[];for(let t of o){if(!t||typeof t.setAttribute!="function")continue;let a=t;try{let i=t.getBoundingClientRect(),s=i.width||a.offsetWidth||0,r=i.height||a.offsetHeight||0;if(s>=No&&r>=No){try{a.style&&(a.style.outline="3px solid #ffd600",a.style.outlineOffset="4px",a.style.animation="eq-image-pulse-yellow-white 1.2s ease-in-out infinite",a.style.boxShadow="0 0 16px rgba(255, 214, 0, 0.7)",a.style.filter="drop-shadow(0 0 8px rgba(255, 214, 0, 0.8))"),a.setAttribute("data-easyquiz-image-highlight","true"),eo.push(a)}catch{}let n=document.createElement("div");n.setAttribute("data-easyquiz-image-frame","true"),n.style.cssText=`
          position: absolute;
          top: ${i.top+window.scrollY-3}px;
          left: ${i.left+window.scrollX-3}px;
          width: ${s+6}px;
          height: ${r+6}px;
          border: 3px solid #ffd600;
          border-radius: 8px;
          pointer-events: none;
          z-index: 2147483640;
          box-sizing: border-box;
          animation: eq-image-pulse-yellow-white 1.2s ease-in-out infinite;
          box-shadow: 0 0 16px rgba(255, 214, 0, 0.95), 0 0 32px rgba(255, 214, 0, 0.5), inset 0 0 12px rgba(255, 214, 0, 0.25);
        `;let d=document.createElement("div");d.setAttribute("data-easyquiz-capture-badge","true"),d.textContent="\u{1F4F7} Imagem / Gr\xE1fico Analisado pela IA",d.style.cssText=`
          position: absolute;
          top: -14px;
          left: 8px;
          background: rgba(12, 14, 20, 0.95);
          color: #ffd600;
          font-size: 11px;
          font-weight: 800;
          padding: 2px 8px;
          border-radius: 6px;
          border: 1px solid rgba(255, 214, 0, 0.85);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.8);
          letter-spacing: 0.3px;
          white-space: nowrap;
          pointer-events: none;
          font-family: system-ui, -apple-system, sans-serif;
          animation: eq-badge-fade-in 0.3s ease-out;
        `,n.appendChild(d),document.body.appendChild(n),it.push(n),to.push(d),e.push({element:t,frame:n})}}catch{}}e.length>0&&!ge&&typeof window<"u"&&(ge=()=>{for(let t=e.length-1;t>=0;t--){let a=e[t];try{if(!document.contains(a.element)){try{a.frame.remove()}catch{}let s=it.indexOf(a.frame);s!==-1&&it.splice(s,1),e.splice(t,1);continue}let i=a.element.getBoundingClientRect();i.width>0&&i.height>0?(a.frame.style.top=`${i.top+window.scrollY-3}px`,a.frame.style.left=`${i.left+window.scrollX-3}px`,a.frame.style.width=`${i.width+6}px`,a.frame.style.height=`${i.height+6}px`):a.frame.style.display="none"}catch{}}e.length===0&&ge&&(window.removeEventListener("scroll",ge),window.removeEventListener("resize",ge),ge=null)},window.addEventListener("scroll",ge,{passive:!0}),window.addEventListener("resize",ge,{passive:!0}))}function st(o){xe&&xe!==o&&(xe.style.removeProperty("outline"),xe.style.removeProperty("outline-offset")),Bo(),xe=o,o.style.outline="2px solid #00e5ff",o.style.outlineOffset="4px";try{if(ye){try{ye.remove()}catch{}ye=null}window.getComputedStyle(o).position==="static"&&(o.style.position="relative");let t=document.createElement("div");t.style.cssText=`
      position: absolute; left: 0; right: 0; top: 0; height: 3px;
      background: linear-gradient(90deg, transparent, #00e5ff, #00ff88, #00e5ff, transparent);
      z-index: 99998; pointer-events: none; border-radius: 2px;
      animation: eq-scope-scan-loop 1.4s ease-in-out infinite;
      box-shadow: 0 0 14px rgba(0, 229, 255, 0.85), 0 0 6px #00ff88;
    `,o.appendChild(t),ye=t}catch{}}function Ha(o){return!o||o>=.9?{outline:"#00ff88",bg:"rgba(0, 255, 136, 0.12)",glow:"rgba(0, 255, 136, 0.8)"}:o>=.7?{outline:"#00bfff",bg:"rgba(0, 191, 255, 0.10)",glow:"rgba(0, 191, 255, 0.7)"}:{outline:"#ffaa00",bg:"rgba(255, 170, 0, 0.10)",glow:"rgba(255, 170, 0, 0.7)"}}function jo(o,e){if(ye){try{ye.remove()}catch{}ye=null}let t=Ha(e);for(let a of o){if(a.t==="adv"||a.t==="js")continue;if(a.t==="drag"){try{let p=F(a.from),h=F(a.to);p&&(p.style.outline=`2px solid ${t.outline}`,Be.push(p)),h&&(h.style.outline="2px dashed #00e5ff",Be.push(h))}catch{}continue}let i=a.v!==void 0?Array.isArray(a.v)?a.v[0]:String(a.v):"",s=String(a.name??a.n??"").trim(),r=null;if(s){let p=Array.from(document.querySelectorAll(`input[name="${te(s)}"]`));if(i&&(r=p.find(h=>h.value?.toLowerCase()===i.toLowerCase())??null,!r)){let h=/^(v|verdadeiro|true|1|t|sim|correto)$/i.test(i),f=/^(f|falso|false|0|nao|não|incorreto|errado)$/i.test(i);if(h||f){let g=h?["v","verdadeiro","true","1","t","sim","correto"]:["f","falso","false","0","nao","n\xE3o","incorreto","errado"];r=p.find(b=>{let v=b.value?.toLowerCase()??"";if(g.includes(v))return!0;let w=(b.closest('label, .vf-label, td, [class*="option" i]')?.textContent??"").trim().toLowerCase();return g.some(y=>w===y||w.startsWith(y+" ")||w.startsWith("("+y+")"))})??null}}!r&&p.length>0&&(r=p[0])}if(!r&&a.id&&(r=F(a.id,i,a.t==="val"||a.t==="sel")||F(O(a.id),i,a.t==="val"||a.t==="sel")),!r&&a.t==="sel"){let p=document.body;try{p=le()||document.body}catch{}let h=Array.from(p.querySelectorAll('select, [role="combobox"], [role="listbox"]')).filter(b=>Q(b)&&!he(b)),f=O(a.id).toLowerCase();r=h.find(b=>{let v=(b.id||"").toLowerCase(),x=(b.getAttribute("name")||"").toLowerCase(),w=(b.getAttribute("aria-label")||"").toLowerCase(),y=O(b.closest('.dropdown-row, [class*="dropdown" i], [class*="select" i], tr, label, div')?.textContent||"").toLowerCase();return v.includes(f)||x.includes(f)||w.includes(f)||f.length>=2&&y.includes(f)})||(h.length===1?h[0]:null)}if(!r)continue;let n=typeof HTMLSelectElement<"u"&&r instanceof HTMLSelectElement||r.tagName?.toLowerCase()==="select"||r.getAttribute("role")==="combobox"||r.getAttribute("role")==="listbox",d=r.closest('label, .vf-label, .option-card, [role="radio"], [role="checkbox"], [role="option"], [role="listitem"], .answer, .quiz-option, .form-check, [class*="option" i], [class*="choice" i]'),c=n?r.parentElement?.closest('.dropdown-row, [class*="dropdown" i], [class*="select-row" i], .form-group, tr, li'):null,u=d||c||r;u.style.outline=`2px solid ${t.outline}`,u.style.outlineOffset="2px",u.style.backgroundColor=t.bg,u.setAttribute("data-easyquiz-highlight","true"),Be.push(u);let m=n?r:u.querySelector('select, [role="combobox"], [role="listbox"]');m&&(m.style.outline=`2px solid ${t.outline}`,m.style.outlineOffset="2px",m.style.boxShadow=`0 0 10px ${t.glow}`,m.setAttribute("data-easyquiz-highlight","true"),Be.push(m));let l=r instanceof HTMLInputElement&&["checkbox","radio"].includes(r.type)?r:u.querySelector('input[type="checkbox"], input[type="radio"]');l&&l!==u&&(l.style.outline=`2px solid ${t.outline}`,l.style.outlineOffset="2px",l.style.boxShadow=`0 0 10px ${t.glow}`,l.setAttribute("data-easyquiz-highlight","true"),Be.push(l))}}var Ct=10,Pa=1400,rt=15e5;function we(o){return new Promise((e,t)=>{let a=new FileReader;a.onerror=()=>t(new Error("Falha ao converter blob para base64.")),a.onload=()=>{let i=String(a.result||"");e(i.split(",")[1]||"")},a.readAsDataURL(o)})}function Qo(o){try{let e=o.getContext("2d");if(!e)return!0;let t=o.width,a=o.height;if(t<=0||a<=0)return!0;let i=Math.min(40,Math.floor(t/3),Math.floor(a/3));if(i<=0)return!0;let s=[[0,0],[Math.floor(t/2)-Math.floor(i/2),Math.floor(a/2)-Math.floor(i/2)],[Math.floor(t/3),Math.floor(a*2/3)]],r=0,n=0,d=-1,c=-1,u=-1;for(let[m,l]of s){let p=Math.max(0,Math.min(m,t-i)),h=Math.max(0,Math.min(l,a-i)),f=e.getImageData(p,h,i,i).data;for(let g=0;g<f.length;g+=4){r++;let b=f[g],v=f[g+1],x=f[g+2];if(f[g+3]===0){n++;continue}d===-1&&(d=b,c=v,u=x),Math.abs(b-d)<8&&Math.abs(v-c)<8&&Math.abs(x-u)<8&&n++}}return r>0&&n/r>.97}catch{return!1}}function Fo(o){try{let e=o.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);if(e){let[t,a,i]=[parseInt(e[1]),parseInt(e[2]),parseInt(e[3])];if((.299*t+.587*a+.114*i)/255<.15)return"#ffffff"}if(o==="transparent"||o==="rgba(0, 0, 0, 0)")return"#ffffff"}catch{}return o}async function He(o){let e=0,t=0;if(o instanceof HTMLImageElement?(e=o.naturalWidth||o.width,t=o.naturalHeight||o.height):(e=o.width,t=o.height),e<=0||t<=0)throw new Error("Dimens\xF5es inv\xE1lidas.");let a=Math.min(1,Pa/Math.max(e,t)),i=Math.max(1,Math.round(e*a)),s=Math.max(1,Math.round(t*a)),r=document.createElement("canvas");r.width=i,r.height=s;let n=r.getContext("2d",{alpha:!1});if(!n)throw new Error("Sem suporte a Canvas 2D.");return n.fillStyle="#ffffff",n.fillRect(0,0,i,s),n.drawImage(o,0,0,i,s),new Promise((d,c)=>{r.toBlob(u=>u?d(u):c(new Error("Falha na compress\xE3o.")),"image/jpeg",.88)})}async function Uo(o){let e=typeof o.getBoundingClientRect=="function"?o.getBoundingClientRect():{width:0,height:0},t=e.width||parseFloat(o.getAttribute("width")||"0")||parseFloat(o.style.width||"0")||400,a=e.height||parseFloat(o.getAttribute("height")||"0")||parseFloat(o.style.height||"0")||300,i=2,s=Math.min(1800,Math.max(120,Math.round(t*i))),r=Math.min(1800,Math.max(100,Math.round(a*i))),n=o.cloneNode(!0);n.getAttribute("xmlns")||n.setAttribute("xmlns","http://www.w3.org/2000/svg"),n.getAttribute("xmlns:xlink")||n.setAttribute("xmlns:xlink","http://www.w3.org/1999/xlink"),n.setAttribute("width",String(s)),n.setAttribute("height",String(r)),!n.getAttribute("viewBox")&&t>0&&a>0&&n.setAttribute("viewBox",`0 0 ${t} ${a}`);try{let l=[o,...Array.from(o.querySelectorAll("*"))],p=[n,...Array.from(n.querySelectorAll("*"))];for(let h=0;h<Math.min(l.length,p.length);h++){let f=l[h],g=p[h];if(!f||!g||!g.style)continue;let b=window.getComputedStyle?window.getComputedStyle(f):null;b&&["fill","stroke","stroke-width","stroke-dasharray","stroke-linecap","stroke-linejoin","opacity","font-family","font-size","font-weight","color","transform","display","visibility"].forEach(x=>{let w=b.getPropertyValue(x);w&&w!=="none"&&w!=="normal"&&w!=="auto"&&g.style.setProperty(x,w,"important")})}}catch{}let d="#ffffff";try{let l=o.parentElement||o;for(;l&&l!==document.documentElement;){let h=(window.getComputedStyle?window.getComputedStyle(l):null)?.backgroundColor;if(h&&h!=="transparent"&&h!=="rgba(0, 0, 0, 0)"){d=h;break}l=l.parentElement}}catch{}d=Fo(d),n.getAttribute("xmlns")||n.setAttribute("xmlns","http://www.w3.org/2000/svg");let u=new XMLSerializer().serializeToString(n),m="";try{m=btoa(unescape(encodeURIComponent(u)))}catch{}try{let l=g=>new Promise((b,v)=>{let x=new Image,w=setTimeout(()=>v(new Error("Timeout render SVG")),1200);x.onload=()=>{clearTimeout(w),b(x)},x.onerror=()=>{clearTimeout(w),v(new Error("Falha ao renderizar SVG em Image."))},x.src=g}),p=null;if(m)try{p=await l(`data:image/svg+xml;base64,${m}`)}catch{}if(!p){let g=new Blob([u],{type:"image/svg+xml;charset=utf-8"}),b=URL.createObjectURL(g);try{p=await l(b)}finally{URL.revokeObjectURL(b)}}let h=document.createElement("canvas");h.width=s,h.height=r;let f=h.getContext("2d",{alpha:!1});if(f&&p){if(f.fillStyle="#ffffff",f.fillRect(0,0,s,r),f.drawImage(p,0,0,s,r),Qo(h))return{base64:m,mediaType:"image/svg+xml"};let g=await new Promise(b=>{h.toBlob(b,"image/jpeg",.92)});if(g){let b=await we(g);if(b)return{blob:g,base64:b,mediaType:"image/jpeg"}}}}catch{}return{base64:m,mediaType:"image/svg+xml"}}async function kt(o){try{let e=o.getBoundingClientRect(),t=Math.round(e.width)||o.offsetWidth||400,a=Math.round(e.height)||o.offsetHeight||300;if(t<30||a<30)return null;let i=o.tagName.toLowerCase()==="svg"?o:o.querySelector("svg");if(i&&o.querySelectorAll("input, select, textarea").length===0)try{let f=await Uo(i);if(f.base64&&f.base64.length<=rt)return{mediaType:f.mediaType,base64:f.base64,alt:o.getAttribute("aria-label")||i.getAttribute("aria-label")||"Captura de diagrama/gr\xE1fico",source:"visual_snapshot",captureStatus:"captured",textContext:Ae(i)}}catch{}if(o instanceof HTMLCanvasElement)try{let f=await He(o),g=await we(f);if(g)return{mediaType:"image/jpeg",base64:g,alt:o.getAttribute("aria-label")||"Captura de canvas visual",source:"canvas_snapshot",captureStatus:"captured"}}catch{}let s="#ffffff";try{let f=o;for(;f&&f!==document.documentElement;){let b=(window.getComputedStyle?window.getComputedStyle(f):null)?.backgroundColor;if(b&&b!=="transparent"&&b!=="rgba(0, 0, 0, 0)"){s=b;break}f=f.parentElement}}catch{}s=Fo(s);let r=o.cloneNode(!0),n=Array.from(o.querySelectorAll("*")),d=Array.from(r.querySelectorAll("*"));for(let f=0;f<Math.min(n.length,d.length);f++){let g=n[f],b=d[f];if(!(!g||!b||!b.style))try{let v=window.getComputedStyle(g);b.style.color=v.color,b.style.backgroundColor=v.backgroundColor,b.style.borderColor=v.borderColor,b.style.borderWidth=v.borderWidth,b.style.borderStyle=v.borderStyle,b.style.fontSize=v.fontSize,b.style.fontFamily=v.fontFamily,b.style.fontWeight=v.fontWeight,b.style.lineHeight=v.lineHeight,b.style.letterSpacing=v.letterSpacing,b.style.textAlign=v.textAlign}catch{}}let c=Math.min(2,Math.max(1,1200/Math.max(t,a))),u=Math.round(t*c),m=Math.round(a*c),l=`
      <svg xmlns="http://www.w3.org/2000/svg" width="${u}" height="${m}" viewBox="0 0 ${t} ${a}">
        <foreignObject width="${t}" height="${a}">
          <div xmlns="http://www.w3.org/1999/xhtml" style="background:${s};width:100%;height:100%;overflow:hidden;box-sizing:border-box;">
            ${r.outerHTML}
          </div>
        </foreignObject>
      </svg>
    `,p=new Blob([l],{type:"image/svg+xml;charset=utf-8"}),h=URL.createObjectURL(p);try{let f=new Image;await new Promise((v,x)=>{let w=setTimeout(()=>x(new Error("Timeout render ForeignObject")),2500);f.onload=()=>{clearTimeout(w),v()},f.onerror=()=>{clearTimeout(w),x(new Error("Falha ao carregar ForeignObject"))},f.src=h});let g=document.createElement("canvas");g.width=u,g.height=m;let b=g.getContext("2d",{alpha:!1});if(b){if(b.fillStyle=s,b.fillRect(0,0,u,m),b.drawImage(f,0,0,u,m),Qo(g))throw new Error("ForeignObject gerou canvas em branco");let v=await new Promise(x=>g.toBlob(x,"image/jpeg",.9));if(v){let x=await we(v);if(x&&x.length<=rt)return{mediaType:"image/jpeg",base64:x,alt:o.getAttribute("aria-label")||"Captura visual da \xE1rea (print-like)",source:"element_snapshot",captureStatus:"captured",textContext:Ae(o)}}}}finally{URL.revokeObjectURL(h)}}catch(e){console.warn("[EasyQuiz] Snapshot visual do n\xF3:",e)}return null}function Tt(o,e,t,a){if(t<=0||a<=0){let p=typeof o.getBoundingClientRect=="function"?o.getBoundingClientRect():{width:0,height:0};if(t=p.width||t,a=p.height||a,t<=0||a<=0){if(e&&/\b(icon|logo|avatar|badge|emoji|spinner|loading)\b/i.test(e))return!1;let f=o instanceof HTMLImageElement&&o.src||"";return f&&/\/icons?\/|\/logos?\/|\/avatars?\/|\/badges?\//i.test(f)?!1:!!(f||e)}}if(t<48||a<48||Math.max(t,a)/Math.max(1,Math.min(t,a))>15)return!1;let s=o.getAttribute("class")||"",r=o.getAttribute("aria-hidden"),n=o.getAttribute("role"),d=o instanceof HTMLImageElement&&o.src||"",c=!!o.closest('.perseus-renderer, .framework-perseus, [data-test-id*="exercise" i], [data-testid*="exercise" i], .perseus-widget-container, [class*="problem" i], [class*="exercise" i], [data-question], [class*="question-content" i], [class*="stimulus" i], [class*="enunciado" i], [class*="statement" i], figure, .problem, .exercise');if(c&&t>=60&&a>=60)return!0;if(r==="true"&&!c||(n==="presentation"||n==="none")&&!c)return!1;let u=/\b(icon|logo|avatar|badge|emoji|decoration|ornament|spinner|loading|thumbnail|profile|photo)\b/i;if(u.test(s)||e&&u.test(e)||d&&/\/icons?\/|\/logos?\/|\/avatars?\/|\/badges?\/|\/emojis?\//i.test(d)||(e===""||e===" "||e==="-")&&!c)return!1;let m=/\b(graph|chart|diagram|table|map|formula|equation|figure|plot|curve|histogram|scatter|matrix|image|foto|imagem|gráfico|tabela|mapa|fórmula|questão|enunciado|stimulus)\b/i;if(m.test(e)||m.test(s)||o.closest('[data-question], [class*="question" i], [class*="prompt" i], [class*="stimulus" i], [class*="enunciado" i], [class*="statement" i], article, .problem, .exercise'))return!0;try{let p=o.parentElement;if(p){let h=(p.textContent||"").toLowerCase();if(/\?|calcul|determin|observ|analis|image|figur|gráfic|diagram/i.test(h)&&t>=60&&a>=60)return!0}}catch{}return t>=80&&a>=80}function Ae(o){let e=[],t=o.getAttribute("alt")||o.getAttribute("aria-label")||o.getAttribute("title")||"";t&&t.length>2&&e.push(`Alt: "${t}"`);let s=o.closest("figure")?.querySelector("figcaption")?.textContent?.trim();s&&s.length>2&&e.push(`Legenda: "${s}"`);let r=o.getAttribute("aria-describedby");if(r){let u=document.getElementById(r)?.textContent?.trim();u&&e.push(`Descri\xE7\xE3o: "${u.slice(0,200)}"`)}let n=o.parentElement;if(n){let c=Y(n.textContent||"",300);c&&c.length>5&&c!==t&&e.push(`Contexto: "${c.slice(0,200)}"`)}if(o.tagName.toLowerCase()==="svg"){let c=Array.from(o.querySelectorAll("text, tspan")).map(u=>u.textContent?.trim()).filter(Boolean);c.length>0&&e.push(`R\xF3tulos/Textos do Gr\xE1fico: "${c.join(" | ")}"`)}let d=o.getAttribute("data-alt")||o.getAttribute("data-description")||"";return d&&e.push(`Data: "${d}"`),e.length===0?"":e.join(" | ")}async function za(o){let e=o.currentSrc||o.src;if(!e)return null;let t=(o.alt||o.getAttribute("aria-label")||"Imagem da quest\xE3o").slice(0,500),a=o.getBoundingClientRect(),i=o.naturalWidth||a.width||o.width||0,s=o.naturalHeight||a.height||o.height||0,r=Tt(o,t,i,s);if(o.complete&&o.naturalWidth>0)try{let u=await He(o),m=await we(u);if(m&&m.length<=rt)return{mediaType:"image/jpeg",base64:m,alt:t,source:e.slice(0,2e3),captureStatus:"captured",textContext:Ae(o)}}catch{}try{let u=new AbortController,m=setTimeout(()=>u.abort(),1500),l=await fetch(e,{mode:"cors",signal:u.signal});if(clearTimeout(m),l.ok){let p=await l.blob();if(p.type.startsWith("image/")){let h=await createImageBitmap(p),f=await He(h);h.close();let g=await we(f);if(g&&g.length<=rt)return{mediaType:"image/jpeg",base64:g,alt:t,source:e.slice(0,2e3),captureStatus:"captured",textContext:Ae(o)}}}}catch{}if(e.startsWith("http")){let u=encodeURIComponent(e),m=[`https://corsproxy.io/?${u}`,`https://api.allorigins.win/raw?url=${u}`,`https://api.codetabs.com/v1/proxy?quest=${u}`],l=async p=>{let h=new AbortController,f=setTimeout(()=>h.abort(),800);try{let g=await fetch(p,{signal:h.signal});if(clearTimeout(f),g.ok)return g;throw new Error("Proxy status "+g.status)}catch(g){throw clearTimeout(f),g}};try{let h=await(await Promise.any(m.map(l))).blob();if(h.type.startsWith("image/")||h.size>200){let f=await createImageBitmap(h),g=await He(f);f.close();let b=await we(g);if(b&&b.length<=rt)return{mediaType:"image/jpeg",base64:b,alt:t,source:e.slice(0,2e3),captureStatus:"captured",textContext:Ae(o)}}}catch{}}let n=o.parentElement||o,d=await kt(n);if(d)return d;let c=Ae(o);return c||t?{mediaType:"image/jpeg",base64:"",alt:t,source:e.slice(0,2e3),captureStatus:r?"failed_relevant":"text_only",textContext:c||`Imagem da quest\xE3o (src: ${e.slice(0,100)})`}:r&&e?{mediaType:"image/jpeg",base64:"",alt:t||"Imagem relevante n\xE3o capturada",source:e.slice(0,2e3),captureStatus:"failed_relevant",textContext:`IMAGEM RELEVANTE N\xC3O CAPTURADA. Src: ${e.slice(0,200)}. ${Ae(o)}`}:null}function Oa(o){return o.querySelectorAll("path, line, polyline, polygon, circle, rect, text, image").length>0}function Da(o){try{let e=o.style.backgroundImage||(window.getComputedStyle?window.getComputedStyle(o).backgroundImage:"");if(e&&e.includes("url(")){let t=e.match(/url\(["']?([^"')]+)["']?\)/);if(t&&t[1]&&!t[1].startsWith("data:image/svg+xml"))return t[1]}}catch{}return null}function Ra(o,e){let t=o.closest('[data-easyquiz-id], button, [role="button"], [role="radio"], [role="checkbox"], [role="option"], label, .option-card, .quiz-option, .choice, .answer, [class*="option" i], [class*="choice" i], [class*="answer" i], li, tr');if(t&&t!==e&&Q(t)&&!re(t)&&!_(t)){let s=t.dataset.easyquizId||t.id||void 0,r=Y(t.innerText||t.textContent||"",120),n=t.getAttribute("aria-label")||t.getAttribute("title")||"",d="";try{let m=Array.from(e.querySelectorAll('[data-easyquiz-id], [role="radio"], [role="checkbox"], [role="option"], .option-card, .quiz-option, .choice, .answer, [class*="option" i], [class*="choice" i]')).filter(p=>Q(p)&&!re(p)),l=m.indexOf(t);l>=0&&(d=` (op\xE7\xE3o ${l+1} de ${m.length})`)}catch{}let c=r||n,u=s?` [id: ${s}]`:"";if(c)return{associatedLabel:`Alternativa/Op\xE7\xE3o: "${c}"${u}${d}`,targetControlId:s};if(s)return{associatedLabel:`Alternativa/Op\xE7\xE3o${u}${d}`,targetControlId:s};if(d)return{associatedLabel:`Imagem da Alternativa${d}`,targetControlId:s}}let a=o.closest("figure")?.querySelector("figcaption")?.textContent?.trim();if(a)return{associatedLabel:`Figura do Enunciado: "${Y(a,100)}"`};let i=o.closest('[class*="prompt" i], [class*="stimulus" i], [class*="question-text" i], [class*="statement" i], header, h1, h2, h3, h4, p');if(i){let s=Y(i.textContent||"",80);if(s)return{associatedLabel:`Gr\xE1fico do Enunciado: "${s}"`}}try{let s=Array.from(e.querySelectorAll('img, svg, canvas, [style*="background-image"]')).filter(r=>Q(r));if(s.length>1){let r=s.indexOf(o);if(r>=0)return{associatedLabel:`Imagem ${r+1} de ${s.length} do Enunciado`}}}catch{}return{associatedLabel:"Gr\xE1fico/Imagem do Enunciado Principal"}}async function ao(o,e=!0){if(!e)return[];let t=[],a=0,i=35e5,s=(c,u)=>{if(!c)return!1;let m=c.base64?c.base64.length:0;if(m>0&&a+m>i)return!1;let l=Ra(u,o);return c.associatedLabel=l.associatedLabel,c.targetControlId=l.targetControlId,c.element=u,t.push(c),a+=m,t.filter(h=>h.captureStatus==="captured").length>=Ct},r=[o],n=new Set;for(let c of r){let m=Array.from(c.querySelectorAll("img")).filter(p=>Q(p)&&!_(p)&&!n.has(p)&&!p.closest('footer, nav, aside, [class*="sidebar" i], [class*="lesson" i]')).filter(p=>{n.add(p);let h=p.getBoundingClientRect(),f=p.naturalWidth||h.width||p.width||0,g=p.naturalHeight||h.height||p.height||0,b=p.alt||"";return Tt(p,b,f,g)}),l=await Promise.allSettled(m.map(async p=>({cap:await za(p),img:p})));for(let p of l)if(p.status==="fulfilled"&&p.value.cap&&s(p.value.cap,p.value.img))return t}let d=new Set;for(let c of r){let u=Array.from(c.querySelectorAll("svg")).filter(l=>{if(l.closest(".katex")||l.classList.contains("katex-mathml")||l.closest('footer, nav, aside, [class*="sidebar" i], [class*="lesson" i]')||!Q(l)||_(l)||d.has(l))return!1;let p=typeof l.getBoundingClientRect=="function"?l.getBoundingClientRect():{width:0,height:0},h=p.width||parseFloat(l.getAttribute("width")||"0"),f=p.height||parseFloat(l.getAttribute("height")||"0");return h<30||f<30?!1:Oa(l)}),m=await Promise.allSettled(u.map(async l=>{d.add(l);try{let p=await Uo(l);if(p.base64){let h=Ae(l);return{cap:{mediaType:p.mediaType,base64:p.base64,alt:l.getAttribute("aria-label")||"Gr\xE1fico/Diagrama vetorial da quest\xE3o",source:"svg",captureStatus:"captured",textContext:h},svg:l}}}catch{let p=l.closest('.trig-diagram-container, [class*="diagram" i], [class*="graph" i], figure')||l.parentElement||l,h=await kt(p);if(h)return{cap:h,svg:l};{let f=Ae(l);if(f)return{cap:{mediaType:"image/jpeg",base64:"",alt:l.getAttribute("aria-label")||"Gr\xE1fico vetorial",source:"svg",captureStatus:"text_only",textContext:f},svg:l}}}return null}));for(let l of m)if(l.status==="fulfilled"&&l.value?.cap&&s(l.value.cap,l.value.svg))return t}if(t.filter(c=>c.captureStatus==="captured").length<Ct){let c=Array.from(o.querySelectorAll("canvas")).filter(u=>Q(u)&&!_(u));for(let u of c)try{let m=await He(u),l=await we(m);if(l){let p={mediaType:"image/jpeg",base64:l,alt:u.getAttribute("aria-label")||"Gr\xE1fico Canvas inline",source:"canvas",captureStatus:"captured"};if(s(p,u))return t}}catch{let m=await kt(u.parentElement||u);if(s(m,u))return t}}if(t.filter(c=>c.captureStatus==="captured").length<Ct){let c=Array.from(o.querySelectorAll('[style*="background-image"], .option-image, .question-media')).filter(u=>Q(u)&&!_(u));for(let u of c){let m=Da(u);if(!m)continue;let l=u.getBoundingClientRect();if(Tt(u,u.getAttribute("aria-label")||"",l.width,l.height))try{let p=await fetch(m,{mode:"cors"});if(p.ok){let h=await p.blob();if(h.type.startsWith("image/")){let f=await createImageBitmap(h),g=await He(f);f.close();let b=await we(g);if(b){let v={mediaType:"image/jpeg",base64:b,alt:"Imagem de fundo da alternativa",source:m.slice(0,2e3),captureStatus:"captured"};if(s(v,u))return t}}}}catch{try{let h=await(await fetch(m,{mode:"no-cors"})).blob();if(h.size>100){let f=await createImageBitmap(h),g=await He(f);f.close();let b=await we(g);if(b&&b.length>100){let v={mediaType:"image/jpeg",base64:b,alt:"Imagem CSS background",source:m.slice(0,2e3),captureStatus:"captured"};if(s(v,u))return t}}}catch{}}}}if(t.filter(c=>c.captureStatus==="captured").length<Ct){let c=new Set;for(let u of r){let m=Array.from(u.querySelectorAll('div, span, section, figure, [class*="image" i], [class*="media" i], [class*="visual" i], [class*="graph" i], [class*="diagram" i], [class*="figure" i]')).filter(l=>{if(c.has(l)||!Q(l)||_(l))return!1;let p=l.getBoundingClientRect();return p.width>=80&&p.height>=60});for(let l of m){c.add(l);try{let p=window.getComputedStyle?window.getComputedStyle(l).backgroundImage:"";if(!p||p==="none"||!p.includes("url(")||l.style.backgroundImage&&l.style.backgroundImage.includes("url("))continue;let h=p.match(/url\(["']?([^"')]+)["']?\)/);if(!h||!h[1]||h[1].startsWith("data:image/svg+xml"))continue;let f=h[1],g=l.getBoundingClientRect();if(!Tt(l,l.getAttribute("aria-label")||"",g.width,g.height))continue;try{let b=await fetch(f,{mode:"cors"});if(b.ok){let v=await b.blob();if(v.type.startsWith("image/")||v.size>200){let x=await createImageBitmap(v),w=await He(x);x.close();let y=await we(w);if(y){let E={mediaType:"image/jpeg",base64:y,alt:l.getAttribute("aria-label")||"Imagem CSS computada da quest\xE3o",source:f.slice(0,2e3),captureStatus:"captured",textContext:Ae(l)};if(s(E,l))return t}}}}catch{let b=await kt(l);if(b&&s(b,l))return t}}catch{}}}}return t}function Na(o,e=""){if(typeof document>"u")return!1;let t=o||document.body,a=(e+" "+(t.textContent||"")).toLowerCase();return!!t.querySelector('.celebration-icon, [class*="celebrat" i], [class*="conclu" i], [class*="finish" i], [class*="result" i], [class*="score-screen" i], [data-testid*="completion" i], [data-functional-selector*="game-over" i], .perseus-message-renderer, [data-congratulations]')&&(a.includes("parab\xE9ns")||a.includes("conclu")||a.includes("finaliz")||a.includes("resultado")||a.includes("pontua")||a.includes("sucesso")||a.includes("\u{1F3C6}")||a.includes("game over")||a.includes("great job"))?!0:["parab\xE9ns! lista de exerc\xEDcios conclu\xEDda","exerc\xEDcios conclu\xEDda","lista de exerc\xEDcios conclu\xEDda","atividade conclu\xEDda","atividade finalizada","finalizado com sucesso","finalizada com sucesso","simulado conclu\xEDdo","simulado finalizado","question\xE1rio conclu\xEDdo","question\xE1rio finalizado","voc\xEA concluiu a atividade","voc\xEA concluiu o question\xE1rio","sua resposta foi registrada","todas as perguntas foram respondidas","quiz completed","exercise completed","activity completed","all questions answered","view results","game over","leaderboard","scoreboard","awesome","great job","you got it right","mission complete","your response has been recorded","sua resposta foi registrada"].some(r=>a.includes(r))}var St=class{active=!1;callbacks;isProcessing=!1;observer=null;mutationTimer=null;heartbeatTimer=null;abortController=null;errorCount=0;resolvedSigs=new Set;advancedSigs=new Set;hasPendingMutationDuringProcessing=!1;lastContentSig="";lastAttemptSig="";lastAttemptTime=0;replanCount=new Map;questionPhase="unanswered";answerSubmittedAt=0;analysisStallTimer=null;stallCount=0;constructor(e){this.callbacks=e}isActive(){return this.active}start(){this.active||(this.active=!0,this.advancedSigs.clear(),this.hasPendingMutationDuringProcessing=!1,this.callbacks.onStatusChange("waiting","> [SYS] Autopilot ENGAGED. Monitorando..."),typeof MutationObserver<"u"&&(this.observer=new MutationObserver(()=>{if(this.active){if(this.isProcessing){this.hasPendingMutationDuringProcessing=!0;return}this.mutationTimer&&clearTimeout(this.mutationTimer),this.mutationTimer=window.setTimeout(()=>{this.mutationTimer=null,this.isProcessing||this.checkAndAnalyze()},120)}}),this.observer.observe(document.body,{subtree:!0,childList:!0,characterData:!0,attributes:!0})),this.scheduleHeartbeat(),this.checkAndAnalyze())}stop(){if(this.active=!1,this.analysisStallTimer&&(clearTimeout(this.analysisStallTimer),this.analysisStallTimer=null),this.abortController){try{this.abortController.abort()}catch{}this.abortController=null}this.mutationTimer&&(clearTimeout(this.mutationTimer),this.mutationTimer=null),this.heartbeatTimer&&(clearTimeout(this.heartbeatTimer),this.heartbeatTimer=null),this.observer?.disconnect(),this.observer=null,this.isProcessing=!1,this.resolvedSigs.clear(),this.advancedSigs.clear(),this.hasPendingMutationDuringProcessing=!1,this.replanCount.clear(),this.questionPhase="unanswered",this.answerSubmittedAt=0,this.stallCount=0,this.callbacks.onStatusChange("idle","> [SYS] Autopilot DESATIVADO pelo usu\xE1rio.","text-yellow")}scheduleHeartbeat(){this.heartbeatTimer&&clearTimeout(this.heartbeatTimer),this.heartbeatTimer=window.setTimeout(()=>{this.heartbeatTimer=null,this.active&&!this.isProcessing&&this.checkAndAnalyze(),this.active&&this.scheduleHeartbeat()},3e3)}sleep(e){return new Promise(t=>{if(!this.active)return t();let a=null,i=()=>{a&&clearTimeout(a),t()};a=window.setTimeout(t,e),this.abortController?.signal.addEventListener("abort",i,{once:!0})})}async checkAndAnalyze(){if(!(!this.active||this.isProcessing))try{this.isProcessing=!0;let e=Le(!1);if(e||(e=ke()),!this.active)return;if(!e){this.callbacks.onStatusChange("waiting","> [SYS] Monitorando p\xE1gina... Aguardando elementos.");return}if(Na(e.scope,e.questionText)){this.callbacks.onStatusChange("idle","> [SYS] \u{1F3C6} Atividade conclu\xEDda! Autopilot finalizado.","text-green"),this.stop();return}if(this.callbacks.isManualModeActive?.()){this.callbacks.onStatusChange("waiting","> [SYS] Gabarito manual ativo. Aguardando voc\xEA avan\xE7ar...","text-yellow");return}let t=$t(e);if(this.resolvedSigs.has(t))if(this.questionPhase==="answered"||this.questionPhase==="feedback"){if(this.detectFeedbackOverlay()){this.questionPhase="feedback",this.callbacks.onStatusChange("advancing","> [SYS] Feedback detectado. Procurando bot\xE3o de avan\xE7o...","text-green"),await this.handleFeedbackPhase();return}if(Date.now()-this.answerSubmittedAt>5e3)this.resolvedSigs.delete(t),this.lastAttemptTime=0,this.questionPhase="unanswered";else return}else return;let a=Date.now();if(t===this.lastAttemptSig&&a-this.lastAttemptTime<1500)return;if(t!==this.lastContentSig){if(this.questionPhase="unanswered",this.answerSubmittedAt=0,this.callbacks.onStatusChange("waiting","> [SYS] Aguardando estabiliza\xE7\xE3o da p\xE1gina...","text-yellow"),await this.sleep(600),!this.active)return;let n=Le(!1)||ke();n&&(e=n,t=$t(e)),this.lastContentSig!==""&&(this.callbacks.onStatusChange("waiting","> [SYS] Nova quest\xE3o detectada! Analisando...","text-green"),this.callbacks.onPageAdvance?.(),this.errorCount=0)}this.lastContentSig=t,this.lastAttemptSig=t,this.lastAttemptTime=a;let s=e.controls.filter(n=>n.role==="answer"),r=xt(e.questionText);if(s.length===0&&r){this.callbacks.onStatusChange("waiting","> [DOM] Quest\xE3o identificada. Aguardando renderiza\xE7\xE3o dos controles...","text-yellow");for(let n=0;n<14;n++){if(await this.sleep(250),!this.active)return;let d=Le(!1)||ke();if(d&&d.controls.filter(c=>c.role==="answer").length>0){e=d,s=e.controls.filter(c=>c.role==="answer");break}}}if(s.length>0||r){if(this.callbacks.onStatusChange("analyzing","> [IA] Quest\xE3o detectada. Consultando IA...","text-blue"),Ie(),e?.scope&&st(e.scope),!this.active)return;this.abortController=new AbortController,this.stallCount=this.stallCount||0,this.analysisStallTimer&&clearTimeout(this.analysisStallTimer),this.analysisStallTimer=window.setTimeout(()=>{this.stallCount++,this.callbacks.onStatusChange("waiting",`> [AVISO] An\xE1lise travada (stall #${this.stallCount}). Abortando e reiniciando automaticamente...`,"text-yellow");try{this.abortController?.abort()}catch{}this.abortController=null,this.isProcessing=!1,this.lastAttemptTime=0,this.stallCount>=3?(this.callbacks.onStatusChange("waiting","> [AVISO] Muitos stalls consecutivos. Aguardando 15s antes de tentar novamente...","text-yellow"),this.stallCount=0,window.setTimeout(()=>{this.active&&this.checkAndAnalyze()},15e3)):window.setTimeout(()=>{this.active&&this.checkAndAnalyze()},2e3)},45e3);let n=await this.callbacks.onRequestAnalysis(1,this.abortController.signal);if(this.analysisStallTimer&&(clearTimeout(this.analysisStallTimer),this.analysisStallTimer=null),this.abortController=null,!this.active)return;if(n){if(this.callbacks.onStatusChange("analyzing",`> [IA] (${n.usedModel||"gemini"}) Confian\xE7a: ${(n.confidence*100).toFixed(1)}% | Modo: ${n.mode}`,"text-blue"),this.callbacks.onStatusChange("analyzing",`> [IA] Racioc\xEDnio: ${n.rationale}`,"text-blue"),this.callbacks.onStatusChange("analyzing",`> [IA] A\xE7\xF5es: ${n.actions.length}`,"text-blue"),this.errorCount=0,this.stallCount=0,n.memoryToStore&&this.callbacks.onStatusChange("analyzing",`> [IA] \u{1F9E0} Mem\xF3ria RAG: "${n.memoryToStore}"`,"text-yellow"),n.pageType==="conclusion"){this.callbacks.onStatusChange("idle","> [SYS] Atividade conclu\xEDda! Desligando Autopilot.","text-green"),this.stop();return}if(n.actions.length===0){let c=(this.replanCount.get(t)||0)+1;if(this.replanCount.set(t,c),c<3){this.callbacks.onStatusChange("waiting",`> [AVISO] Nenhuma resposta formulada para esta quest\xE3o. Retentando (${c}/3)...`,"text-yellow"),await this.sleep(1200),this.lastAttemptTime=0;return}}let d=(this.replanCount.get(t)||0)+1;if(this.replanCount.set(t,d),(n.actions.length>0||d>=3)&&(this.resolvedSigs.add(t),this.questionPhase="answered",this.answerSubmittedAt=Date.now(),this.active)){if(await this.sleep(1200),!this.active)return;await this.handleFeedbackPhase()}}else{this.errorCount++;let d=this.errorCount===1?3e3:5e3;this.callbacks.onStatusChange("waiting",`> [AVISO] Falha na an\xE1lise (${this.errorCount}). Retentando em ${d/1e3}s...`,"text-yellow"),await this.sleep(d),this.lastAttemptTime=0}}else{if(this.advancedSigs.has(t)||(this.callbacks.onStatusChange("analyzing","> [IA] P\xE1gina informativa ou texto de leitura. Consultando IA...","text-blue"),!this.active))return;this.abortController=new AbortController;let n=await this.callbacks.onRequestAnalysis(1,this.abortController.signal);if(this.abortController=null,!this.active)return;if(n){if(this.callbacks.onStatusChange("analyzing",`> [IA] (${n.usedModel||"gemini"}) Tipo: ${n.pageType} | Modo: ${n.mode}`,"text-blue"),this.callbacks.onStatusChange("analyzing",`> [IA] Racioc\xEDnio: ${n.rationale}`,"text-blue"),n.memoryToStore&&this.callbacks.onStatusChange("analyzing",`> [IA] \u{1F9E0} Absorvido: "${n.memoryToStore}"`,"text-yellow"),n.pageType==="conclusion"){this.callbacks.onStatusChange("idle","> [SYS] Atividade conclu\xEDda! Desligando Autopilot.","text-green"),this.stop();return}n.pageType==="info"?(this.callbacks.onStatusChange("advancing","> [IA] \u{1F4D6} Leitura conclu\xEDda. Avan\xE7ando com seguran\xE7a...","text-green"),await this.sleep(500)):n.pageType==="start"&&(this.callbacks.onStatusChange("advancing","> [SYS] In\xEDcio detectado. Iniciando...","text-blue"),await this.sleep(500)),this.errorCount=0,this.resolvedSigs.add(t),this.advancedSigs.add(t)}else{this.errorCount++;let d=this.errorCount===1?3e3:5e3;this.callbacks.onStatusChange("waiting",`> [AVISO] Falha ao processar p\xE1gina (${this.errorCount}). Retentando em ${d/1e3}s...`,"text-yellow"),await this.sleep(d),this.lastAttemptTime=0}}this.errorCount>=5&&(this.callbacks.onStatusChange("waiting","> [AVISO] Muitas falhas. Reiniciando contadores e aguardando 10s...","text-yellow"),this.errorCount=0,this.lastAttemptTime=0,await this.sleep(1e4))}catch(e){if(!this.active)return;let t=e instanceof Error?e.message:String(e);if(t.includes("cancelada")||t.includes("aborted"))return;/timeout|aborted|network|failed to fetch|cancelad/i.test(t)||this.errorCount++,console.warn("[EasyQuiz Autopilot]",e),this.callbacks.onStatusChange("error",`> [ERRO NO AUTOPILOT] ${t}`,"text-red")}finally{this.abortController=null,this.isProcessing=!1;let e=this.hasPendingMutationDuringProcessing;this.hasPendingMutationDuringProcessing=!1,this.active&&window.setTimeout(()=>void this.checkAndAnalyze(),e?300:750)}}detectFeedbackOverlay(){if(typeof document>"u")return!1;let e=[".correct",".incorrect",".perseus-message-renderer",'[class*="feedback" i]','[class*="resultado" i]','[class*="result" i]','[role="alert"]','[class*="check-answer" i][class*="result" i]','[class*="banner" i][class*="correct" i]','[class*="banner" i][class*="incorrect" i]'].join(", "),t=document.querySelector(e);if(!t)return!1;try{let a=t.getBoundingClientRect();if(a.width<=0||a.height<=0)return!1;let i=window.getComputedStyle(t);if(i.display==="none"||i.visibility==="hidden")return!1}catch{return!1}return!0}async handleFeedbackPhase(){if(this.active){for(let e=0;e<16;e++){if(!this.active)return;let t=this.detectFeedbackOverlay();t&&(this.questionPhase="feedback",this.callbacks.onStatusChange("advancing","> [SYS] \u2705 Feedback do quiz detectado. Buscando bot\xE3o de avan\xE7o...","text-green"));let a=qt();if(a){let i=(a.textContent||a.getAttribute("aria-label")||"").trim().toLowerCase();if(/(próxim|next|continuar|continue|avançar|prosseguir|próxima tarefa|next task|próxima pergunta|seguir)/i.test(i)||t&&!/(verificar|checar|check|conferir|responder)/i.test(i)){if(this.callbacks.onStatusChange("advancing",`> [SYS] \u2705 Avan\xE7ando: "${i.slice(0,40)}"`,"text-green"),ie(a),this.questionPhase="advanced",await this.sleep(800),!this.active)return;this.questionPhase="unanswered",this.lastContentSig="",this.lastAttemptSig="",this.lastAttemptTime=0,this.answerSubmittedAt=0,this.callbacks.onPageAdvance?.();return}}await this.sleep(250)}this.questionPhase="unanswered",this.resolvedSigs.delete(this.lastContentSig),this.lastAttemptTime=0,this.callbacks.onStatusChange("waiting","> [SYS] Feedback n\xE3o detectado ou sem bot\xE3o de avan\xE7o. Re-analisando...","text-yellow")}}};var L={canvasLogo:"data:image/png;base64,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dR/4337uYwwdXhTSKDB5oWAsGwgYGodS2wpYM8gEplWlTok0HWlElUTRdKKJ6My0nSYVScooVdtkmrZMOpkyk6JpQwKhDQEaJSkwBGPj2BiDjS+Xa7DMNROLJBBnwNg8z54/7Avn3vuctc/Lfln7tz8fCSH57LPPPmvte/f53v1b5zRt27YFAACApbu1aZpXTH0QS3Yw9QEAAAAAAjoAAACkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACh1MfAFTgM03TXDn1QQAAAPPmDjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAIC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",logo:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.8L19.2 8 12 11.2 4.8 8 12 4.8zM4 9.6l7 3.1v7.5l-7-3.5V9.6zm9 10.6v-7.5l7-3.1v7.1l-7 3.5z"/></svg>',rocket:`
<svg
  class="lucide lucide-rocket"
  xmlns="http://www.w3.org/2000/svg"
  width="16"
  height="16"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09" />
  <path d="M9 12a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.4 22.4 0 0 1-4 2z" />
  <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 .05 5 .05" />
</svg>
`,play:`
<svg
  class="lucide lucide-play"
  xmlns="http://www.w3.org/2000/svg"
  width="16"
  height="16"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" />
</svg>
`,stop:`
<svg
  class="lucide lucide-square"
  xmlns="http://www.w3.org/2000/svg"
  width="16"
  height="16"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <rect width="18" height="18" x="3" y="3" rx="2" />
</svg>
`,code:`
<svg
  class="lucide lucide-code"
  xmlns="http://www.w3.org/2000/svg"
  width="16"
  height="16"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="m16 18 6-6-6-6" />
  <path d="m8 6-6 6 6 6" />
</svg>
`,terminal:`
<svg
  class="lucide lucide-terminal"
  xmlns="http://www.w3.org/2000/svg"
  width="16"
  height="16"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M12 19h8" />
  <path d="m4 17 6-6-6-6" />
</svg>
`,inspector:`
<svg
  class="lucide lucide-scan-search"
  xmlns="http://www.w3.org/2000/svg"
  width="16"
  height="16"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M3 7V5a2 2 0 0 1 2-2h2" />
  <path d="M17 3h2a2 2 0 0 1 2 2v2" />
  <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
  <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
  <circle cx="12" cy="12" r="3" />
  <path d="m16 16-1.9-1.9" />
</svg>
`,settings:`
<svg
  class="lucide lucide-settings"
  xmlns="http://www.w3.org/2000/svg"
  width="16"
  height="16"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915" />
  <circle cx="12" cy="12" r="3" />
</svg>
`,key:`
<svg
  class="lucide lucide-key"
  xmlns="http://www.w3.org/2000/svg"
  width="16"
  height="16"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="m2 21 9.6-9.6" />
  <path d="m7.5 15.5 2.3 2.3a1 1 0 0 1 0 1.4l-2.1 2.1a1 1 0 0 1-1.4 0L4 19" />
  <circle cx="15.5" cy="7.5" r="5.5" />
</svg>
`,paste:`
<svg
  class="lucide lucide-clipboard-paste"
  xmlns="http://www.w3.org/2000/svg"
  width="16"
  height="16"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M11 14h10" />
  <path d="M16 4h2a2 2 0 0 1 2 2v1.344" />
  <path d="m17 18 4-4-4-4" />
  <path d="M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 1.793-1.113" />
  <rect x="8" y="2" width="8" height="4" rx="1" />
</svg>
`,edit:`
<svg
  class="lucide lucide-pencil"
  xmlns="http://www.w3.org/2000/svg"
  width="16"
  height="16"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
  <path d="m15 5 4 4" />
</svg>
`,trash:`
<svg
  class="lucide lucide-trash"
  xmlns="http://www.w3.org/2000/svg"
  width="16"
  height="16"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M10 11v6" />
  <path d="M14 11v6" />
  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
  <path d="M3 6h18" />
  <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
</svg>
`,eraser:`
<svg
  class="lucide lucide-eraser"
  xmlns="http://www.w3.org/2000/svg"
  width="16"
  height="16"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M21 21H8a2 2 0 0 1-1.42-.587l-3.994-3.999a2 2 0 0 1 0-2.828l10-10a2 2 0 0 1 2.829 0l5.999 6a2 2 0 0 1 0 2.828L12.834 21" />
  <path d="m5.082 11.09 8.828 8.828" />
</svg>
`,save:`
<svg
  class="lucide lucide-save"
  xmlns="http://www.w3.org/2000/svg"
  width="16"
  height="16"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
  <path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7" />
  <path d="M7 3v4a1 1 0 0 0 1 1h7" />
</svg>
`,analyze:`
<svg
  class="lucide lucide-scan-line"
  xmlns="http://www.w3.org/2000/svg"
  width="16"
  height="16"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M3 7V5a2 2 0 0 1 2-2h2" />
  <path d="M17 3h2a2 2 0 0 1 2 2v2" />
  <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
  <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
  <path d="M7 12h10" />
</svg>
`,apply:`
<svg
  class="lucide lucide-circle-check-big"
  xmlns="http://www.w3.org/2000/svg"
  width="16"
  height="16"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M21.801 10A10 10 0 1 1 17 3.335" />
  <path d="m9 11 3 3L22 4" />
</svg>
`,close:`
<svg
  class="lucide lucide-x"
  xmlns="http://www.w3.org/2000/svg"
  width="16"
  height="16"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M18 6 6 18" />
  <path d="m6 6 12 12" />
</svg>
`,chevronRight:`
<svg
  class="lucide lucide-chevron-right"
  xmlns="http://www.w3.org/2000/svg"
  width="16"
  height="16"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="m9 18 6-6-6-6" />
</svg>
`,chevronDown:`
<svg
  class="lucide lucide-chevron-down"
  xmlns="http://www.w3.org/2000/svg"
  width="16"
  height="16"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="m6 9 6 6 6-6" />
</svg>
`,chevronLeft:`
<svg
  class="lucide lucide-chevron-left"
  xmlns="http://www.w3.org/2000/svg"
  width="16"
  height="16"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="m15 18-6-6 6-6" />
</svg>
`,eye:`
<svg
  class="lucide lucide-eye"
  xmlns="http://www.w3.org/2000/svg"
  width="16"
  height="16"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
  <circle cx="12" cy="12" r="3" />
</svg>
`,eyeOff:`
<svg
  class="lucide lucide-eye-off"
  xmlns="http://www.w3.org/2000/svg"
  width="16"
  height="16"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" />
  <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />
  <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" />
  <path d="m2 2 20 20" />
</svg>
`,check:`
<svg
  class="lucide lucide-check"
  xmlns="http://www.w3.org/2000/svg"
  width="16"
  height="16"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M20 6 9 17l-5-5" />
</svg>
`,info:`
<svg
  class="lucide lucide-info"
  xmlns="http://www.w3.org/2000/svg"
  width="16"
  height="16"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <circle cx="12" cy="12" r="10" />
  <path d="M12 16v-4" />
  <path d="M12 8h.01" />
</svg>
`,clock:`
<svg
  class="lucide lucide-clock"
  xmlns="http://www.w3.org/2000/svg"
  width="16"
  height="16"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <circle cx="12" cy="12" r="10" />
  <path d="M12 6v6l4 2" />
</svg>
`,copy:`
<svg
  class="lucide lucide-copy"
  xmlns="http://www.w3.org/2000/svg"
  width="16"
  height="16"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
  <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
</svg>
`,refresh:`
<svg
  class="lucide lucide-refresh-cw"
  xmlns="http://www.w3.org/2000/svg"
  width="16"
  height="16"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
  <path d="M21 3v5h-5" />
  <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
  <path d="M8 16H3v5" />
</svg>
`,chip:`
<svg
  class="lucide lucide-cpu"
  xmlns="http://www.w3.org/2000/svg"
  width="16"
  height="16"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M12 20v2" />
  <path d="M12 2v2" />
  <path d="M17 20v2" />
  <path d="M17 2v2" />
  <path d="M2 12h2" />
  <path d="M2 17h2" />
  <path d="M2 7h2" />
  <path d="M20 12h2" />
  <path d="M20 17h2" />
  <path d="M20 7h2" />
  <path d="M7 20v2" />
  <path d="M7 2v2" />
  <rect x="4" y="4" width="16" height="16" rx="2" />
  <rect x="8" y="8" width="8" height="8" rx="1" />
</svg>
`,moreVertical:`
<svg
  class="lucide lucide-ellipsis-vertical"
  xmlns="http://www.w3.org/2000/svg"
  width="16"
  height="16"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <circle cx="12" cy="12" r="1" />
  <circle cx="12" cy="5" r="1" />
  <circle cx="12" cy="19" r="1" />
</svg>
`,minimize:`
<svg
  class="lucide lucide-minus"
  xmlns="http://www.w3.org/2000/svg"
  width="16"
  height="16"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M5 12h14" />
</svg>
`,maximize:`
<svg
  class="lucide lucide-maximize-2"
  xmlns="http://www.w3.org/2000/svg"
  width="16"
  height="16"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M15 3h6v6" />
  <path d="m21 3-7 7" />
  <path d="m3 21 7-7" />
  <path d="M9 21H3v-6" />
</svg>
`,dragHandle:`
<svg
  class="lucide lucide-grip-vertical"
  xmlns="http://www.w3.org/2000/svg"
  width="16"
  height="16"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <circle cx="9" cy="12" r="1" />
  <circle cx="9" cy="5" r="1" />
  <circle cx="9" cy="19" r="1" />
  <circle cx="15" cy="12" r="1" />
  <circle cx="15" cy="5" r="1" />
  <circle cx="15" cy="19" r="1" />
</svg>
`,list:`
<svg
  class="lucide lucide-list"
  xmlns="http://www.w3.org/2000/svg"
  width="16"
  height="16"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M3 5h.01" />
  <path d="M3 12h.01" />
  <path d="M3 19h.01" />
  <path d="M8 5h13" />
  <path d="M8 12h13" />
  <path d="M8 19h13" />
</svg>
`,folderTree:`
<svg
  class="lucide lucide-folder-tree"
  xmlns="http://www.w3.org/2000/svg"
  width="16"
  height="16"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M20 10a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-2.5a1 1 0 0 1-.8-.4l-.9-1.2A1 1 0 0 0 15 3h-2a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1Z" />
  <path d="M20 21a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-2.9a1 1 0 0 1-.88-.55l-.42-.85a1 1 0 0 0-.92-.6H13a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1Z" />
  <path d="M3 5a2 2 0 0 0 2 2h3" />
  <path d="M3 3v13a2 2 0 0 0 2 2h3" />
</svg>
`,folder:`
<svg
  class="lucide lucide-folder"
  xmlns="http://www.w3.org/2000/svg"
  width="16"
  height="16"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
</svg>
`,file:`
<svg
  class="lucide lucide-file"
  xmlns="http://www.w3.org/2000/svg"
  width="16"
  height="16"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
  <path d="M14 2v5a1 1 0 0 0 1 1h5" />
</svg>
`,stopwatch:`
<svg
  class="lucide lucide-timer"
  xmlns="http://www.w3.org/2000/svg"
  width="16"
  height="16"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <line x1="10" x2="14" y1="2" y2="2" />
  <line x1="12" x2="15" y1="14" y2="11" />
  <circle cx="12" cy="14" r="8" />
</svg>
`,plus:`
<svg
  class="lucide lucide-plus"
  xmlns="http://www.w3.org/2000/svg"
  width="16"
  height="16"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M5 12h14" />
  <path d="M12 5v14" />
</svg>
`,listPlus:`
<svg
  class="lucide lucide-list-plus"
  xmlns="http://www.w3.org/2000/svg"
  width="16"
  height="16"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M16 5H3" />
  <path d="M11 12H3" />
  <path d="M16 19H3" />
  <path d="M18 9v6" />
  <path d="M21 12h-6" />
</svg>
`,sparkles:`
<svg
  class="lucide lucide-sparkles"
  xmlns="http://www.w3.org/2000/svg"
  width="16"
  height="16"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" />
  <path d="M20 2v4" />
  <path d="M22 4h-4" />
  <circle cx="4" cy="20" r="2" />
</svg>
`,image:`
<svg
  class="lucide lucide-image"
  xmlns="http://www.w3.org/2000/svg"
  width="16"
  height="16"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
  <circle cx="9" cy="9" r="2" />
  <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
</svg>
`,refreshCw:`
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
  <path d="M3 3v5h5"/>
</svg>
`,zap:`
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
</svg>
`,upload:`
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
  <polyline points="17 8 12 3 7 8"/>
  <line x1="12" y1="3" x2="12" y2="15"/>
</svg>
`,download:`
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
  <polyline points="7 10 12 15 17 10"/>
  <line x1="12" y1="15" x2="12" y2="3"/>
</svg>
`,bell:`
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
  <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
</svg>
`,barChart:`
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <line x1="18" y1="20" x2="18" y2="10"/>
  <line x1="12" y1="20" x2="12" y2="4"/>
  <line x1="6" y1="20" x2="6" y2="14"/>
</svg>
`,moon:`
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
</svg>
`,volume:`
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
  <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
  <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
</svg>
`,flask:`
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M9 3h6l3 9H6L9 3z"/>
  <path d="M6 12a6 6 0 1 0 12 0"/>
  <line x1="12" y1="3" x2="12" y2="12"/>
</svg>
`,checkCircle:`
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
  <polyline points="22 4 12 14.01 9 11.01"/>
</svg>
`,palette:`
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/>
  <circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/>
  <circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/>
  <circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/>
  <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>
</svg>
`,github:`
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
  <path d="M9 18c-4.51 2-5-2-7-2"/>
</svg>
`,cpu:`
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <rect x="4" y="4" width="16" height="16" rx="2"/>
  <rect x="9" y="9" width="6" height="6"/>
  <path d="M15 2v2M15 20v2M9 2v2M9 20v2M2 15h2M2 9h2M20 15h2M20 9h2"/>
</svg>
`};var Lt=class{element=null;shadow;isMinimized=!1;currentPlan=null;isDragging=!1;dragStartX=0;dragStartY=0;initialLeft=25;initialTop=25;onAdvanceCallback;constructor(e,t){this.shadow=e,this.onAdvanceCallback=t,this.initGlobalListeners()}initGlobalListeners(){window.addEventListener("popstate",()=>this.handlePageNavigated()),window.addEventListener("hashchange",()=>this.handlePageNavigated()),document.addEventListener("click",e=>{if(!this.isOpen())return;let t=e.target;if(!t||this.shadow.contains(t)||t.closest("#easyquiz-shadow-root"))return;let a=t.closest('button, [role="button"], a, input[type="submit"]');if(a){let i=(a.textContent||a.value||"").toLowerCase();/pr[oó]xim|avan[cç]|continu|verific|enviar|submit|confirm|checar|validar|next/i.test(i)&&setTimeout(()=>{this.isOpen()&&this.handlePageNavigated()},800)}},!0)}handlePageNavigated(){this.isOpen()&&(this.hide(),this.onAdvanceCallback?.())}isOpen(){return this.element!==null&&this.element.style.display!=="none"}show(e){this.currentPlan=e,this.element||this.createElement(),this.renderContent(),this.element&&(this.element.style.display="flex")}hide(){this.element&&(this.element.style.display="none")}minimize(){this.isMinimized=!0,this.element&&this.element.classList.add("minimized")}restore(){this.isMinimized=!1,this.element&&this.element.classList.remove("minimized")}createElement(){this.element=document.createElement("div"),this.element.className="eq-floating-hud",this.element.style.left=`${this.initialLeft}px`,this.element.style.top=`${this.initialTop}px`,this.element.innerHTML=`
      <!-- P\xEDlula compacta quando minimizado -->
      <div class="eq-fah-pill" id="eq-fah-pill" title="Clique para expandir gabarito interativo">
        <span class="eq-fah-pill-icon">${L.list}</span>
        <span id="eq-fah-pill-text">Gabarito Manual</span>
        <span class="eq-fah-pill-badge" id="eq-fah-pill-badge">0</span>
      </div>

      <!-- Cabe\xE7alho com barra de arraste -->
      <div class="eq-fah-header" id="eq-fah-header">
        <div class="eq-fah-title">
          <span style="display:flex; align-items:center;">${L.dragHandle}</span>
          <span>Gabarito Manual Interativo</span>
        </div>
        <div class="eq-fah-actions">
          <button class="eq-fah-btn" id="eq-fah-copy-md-btn" title="Copiar tudo formatado em Markdown">${L.copy}</button>
          <button class="eq-fah-btn" id="eq-fah-min-btn" title="Minimizar para p\xEDlula flutuante">${L.minimize}</button>
          <button class="eq-fah-btn" id="eq-fah-close-btn" title="Fechar gabarito">${L.close}</button>
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
    `,this.shadow.appendChild(this.element),this.element.querySelector("#eq-fah-pill").addEventListener("click",()=>this.restore()),this.element.querySelector("#eq-fah-min-btn").addEventListener("click",()=>this.minimize()),this.element.querySelector("#eq-fah-close-btn").addEventListener("click",()=>this.hide());let i=this.element.querySelector("#eq-fah-copy-md-btn");i.addEventListener("click",()=>this.copyMarkdownToClipboard(i));let s=this.element.querySelector("#eq-fah-copy-all-btn");s.addEventListener("click",()=>this.copyMarkdownToClipboard(s));let r=this.element.querySelector("#eq-fah-header");this.setupDraggable(r)}setupDraggable(e){let t=a=>{if(a.target.closest(".eq-fah-btn"))return;a.preventDefault(),this.isDragging=!0,this.dragStartX=a.clientX,this.dragStartY=a.clientY;let i=this.element.getBoundingClientRect();this.initialLeft=i.left,this.initialTop=i.top;let s=n=>{if(!this.isDragging||!this.element)return;let d=n.clientX-this.dragStartX,c=n.clientY-this.dragStartY,u=Math.max(10,window.innerWidth-this.element.offsetWidth-10),m=Math.max(10,window.innerHeight-this.element.offsetHeight-10),l=Math.min(Math.max(10,this.initialLeft+d),u),p=Math.min(Math.max(10,this.initialTop+c),m);this.element.style.left=`${l}px`,this.element.style.top=`${p}px`},r=()=>{this.isDragging=!1,window.removeEventListener("mousemove",s),window.removeEventListener("mouseup",r)};window.addEventListener("mousemove",s),window.addEventListener("mouseup",r)};e.addEventListener("mousedown",t)}renderContent(){if(!this.element||!this.currentPlan)return;let e=this.element.querySelector("#eq-fah-body"),t=this.element.querySelector("#eq-fah-pill-text"),a=this.element.querySelector("#eq-fah-pill-badge");e.innerHTML="";let i=this.currentPlan,s=i.actions.filter(p=>p.t==="drag"),r=i.actions.filter(p=>{if(p.t!=="val")return!1;let h=O(p.id||"").toLowerCase();return!/continu|avan[cç]|pr[oó]xim|submet|enviar|check|verific/i.test(h)}),n=i.actions.filter(p=>p.t==="clk"||p.t==="chk"),d=i.actions.filter(p=>p.t==="sel"),c=s.length||r.length||n.length||d.length,u=document.createElement("div");u.className="eq-fah-meta";let m=document.createElement("span");m.textContent=`Modo: ${i.mode.replace("_"," ")}`;let l=document.createElement("span");if(l.className="eq-fah-meta-badge",l.textContent=`${Math.round(i.confidence*100)}% Confian\xE7a`,u.append(m,l),e.appendChild(u),i.rationale){let p=document.createElement("div");p.style.cssText="padding:6px 10px;margin:6px 0 8px;border-radius:6px;background:rgba(0,255,204,0.06);border:1px solid rgba(0,255,204,0.18);font-size:11px;color:#a7f3d0;line-height:1.4;",p.innerHTML=`<span style="color:#00ffcc;font-weight:700;">\u{1F4A1} IA:</span> ${i.rationale}`,e.appendChild(p)}if(i.learnedSkill){let p=document.createElement("div");p.style.cssText="padding:4px 8px;margin-bottom:8px;border-radius:5px;background:rgba(168,85,247,0.08);border:1px solid rgba(168,85,247,0.25);font-size:10px;color:#e9d5ff;",p.innerHTML=`<span style="color:#c084fc;font-weight:700;">\u{1F4DA} Skill Registrada:</span> ${i.learnedSkill.name}`,e.appendChild(p)}if(s.length>0||i.mode==="categorizacao"||i.mode==="arrastar_soltar"){t.textContent=`Categoriza\xE7\xE3o (${s.length} itens)`,a.textContent=String(s.length);let p={};for(let h of s){let f=O(h.to)||"Geral";p[f]||(p[f]=[]),p[f].push(O(h.from))}for(let[h,f]of Object.entries(p)){let g=document.createElement("div"),b=/fato|true|verdadeiro|sim/i.test(h),v=/opini[aã]o|false|falso|n[aã]o/i.test(h);g.className=`eq-fah-group ${b?"group-fato":v?"group-opiniao":""}`;let x=document.createElement("div");x.className="eq-fah-group-title",x.textContent=`\u{1F4C1} ${h} (${f.length})`,g.appendChild(x);let w=document.createElement("div");w.className="eq-fah-group-items";for(let y of f){let E=document.createElement("div");E.className="eq-fah-item";let T=document.createElement("span");T.className="eq-fah-item-text",T.textContent=y,E.appendChild(T);let C=document.createElement("button");C.className="eq-fah-copy-inline",C.textContent="Copiar",C.addEventListener("click",()=>{navigator.clipboard.writeText(y),C.textContent="\u2713 Copiado",setTimeout(()=>C.textContent="Copiar",1200)}),E.appendChild(C),w.appendChild(E)}g.appendChild(w),e.appendChild(g)}}else if(r.length>0){t.textContent=`Preenchimento (${r.length} campos)`,a.textContent=String(r.length);let p=document.createElement("div");p.className="eq-fah-group";let h=document.createElement("div");h.className="eq-fah-group-title",h.textContent="\u{1F4DD} Respostas para os Campos de Texto:",p.appendChild(h);let f=document.createElement("div");f.className="eq-fah-group-items";for(let g=0;g<r.length;g++){let b=r[g],v=document.createElement("div");v.className="eq-fah-item";let x=at(b.id);(!x||/^[#\.\$]|input|mat-|cell|field|q[0-9]|eq-/i.test(x))&&(x=`Campo ${g+1}`);let w=String(b.v??""),y=document.createElement("div");y.className="eq-fah-field-box";let E=document.createElement("div");E.className="eq-fah-field-label",E.textContent=x,y.appendChild(E);let T=document.createElement("div");T.className="eq-fah-field-val",T.textContent=w,y.appendChild(T),v.appendChild(y);let C=document.createElement("button");C.className="eq-fah-copy-inline",C.textContent="Copiar",C.addEventListener("click",()=>{navigator.clipboard.writeText(w),C.textContent="\u2713 Copiado",setTimeout(()=>C.textContent="Copiar",1200)}),v.appendChild(C),f.appendChild(v)}p.appendChild(f),e.appendChild(p)}else if(n.length>0){t.textContent=`Op\xE7\xF5es (${n.length} marcadas)`,a.textContent=String(n.length);let p=document.createElement("div");p.className="eq-fah-group";let h=document.createElement("div");h.className="eq-fah-group-title",h.textContent="\u{1F3AF} Alternativa(s) Correta(s):",p.appendChild(h);let f=document.createElement("div");f.className="eq-fah-group-items";for(let g=0;g<n.length;g++){let b=n[g],v=document.createElement("div");v.className="eq-fah-item";let x=at(b.id);(!x||/^(eq-|#|\$|\.|input_|mat-|choice_|radio_|chk_)/i.test(x))&&b.v&&(x=String(b.v)),x=O(x),/^(eq-|#|\$|\.|input_|mat-|choice_|radio_|chk_)/i.test(x)&&(x="");let w="",y=x.match(/^(\([A-Za-z0-9]\)|[A-Za-z0-9][\)\.\:\-])\s*(.*)$/);y?(w=y[1].replace(/[\(\)\.\:\-\s]/g,"").toUpperCase(),x=y[2].trim()||x):n.length>1&&(w=String.fromCharCode(65+g));let E=document.createElement("div");if(E.style.display="flex",E.style.alignItems="center",E.style.gap="8px",E.style.flex="1",w){let I=document.createElement("span");I.className="eq-fah-letter-badge",I.textContent=w,E.appendChild(I)}let T=document.createElement("span");T.className="eq-fah-item-text",T.textContent=x||(w?`Alternativa ${w}`:"Alternativa Selecionada"),E.appendChild(T),v.appendChild(E);let C=document.createElement("button");C.className="eq-fah-copy-inline",C.textContent="Copiar",C.addEventListener("click",()=>{navigator.clipboard.writeText(x||w),C.textContent="\u2713 Copiado",setTimeout(()=>C.textContent="Copiar",1200)}),v.appendChild(C),f.appendChild(v)}p.appendChild(f),e.appendChild(p)}else if(d.length>0){t.textContent=`Sele\xE7\xE3o (${d.length} listas)`,a.textContent=String(d.length);let p=document.createElement("div");p.className="eq-fah-group";let h=document.createElement("div");h.className="eq-fah-group-title",h.textContent="\u{1F4CB} Op\xE7\xF5es para Selecionar na Lista:",p.appendChild(h);let f=document.createElement("div");f.className="eq-fah-group-items";for(let g=0;g<d.length;g++){let b=d[g],v=document.createElement("div");v.className="eq-fah-item";let x=at(b.id);(!x||/^[#\.\$]|select|input|mat-|cell|field|q[0-9]|eq-/i.test(x))&&(x=`Lista ${g+1}`);let E=(Array.isArray(b.v)?b.v:[String(b.v??"")]).map(S=>{let z=F(b.id,void 0,!0)||F(O(b.id),void 0,!0),D=z instanceof HTMLSelectElement?z:z?.querySelector("select");if(D){let q=O(S).toLowerCase();for(let k=0;k<D.options.length;k++){let M=D.options[k];if(M.value.toLowerCase()===q||O(M.textContent).toLowerCase()===q){let B=O(M.textContent);if(B&&!B.toLowerCase().includes("selecione"))return B}}}return S}).join(", "),T=document.createElement("div");T.className="eq-fah-field-box";let C=document.createElement("div");C.className="eq-fah-field-label",C.textContent=x,T.appendChild(C);let I=document.createElement("div");I.className="eq-fah-field-val",I.textContent=E,T.appendChild(I),v.appendChild(T);let A=document.createElement("button");A.className="eq-fah-copy-inline",A.textContent="Copiar",A.addEventListener("click",()=>{navigator.clipboard.writeText(E),A.textContent="\u2713 Copiado",setTimeout(()=>A.textContent="Copiar",1200)}),v.appendChild(A),f.appendChild(v)}p.appendChild(f),e.appendChild(p)}else{t.textContent="Gabarito",a.textContent="0";let p=document.createElement("div");p.style.padding="10px",p.style.color="#888",p.textContent="Nenhuma resposta direta para exibir.",e.appendChild(p)}if(i.rationale){let p=document.createElement("div");p.className="eq-fah-rationale",p.textContent=`\u{1F4A1} Racioc\xEDnio da IA: ${i.rationale}`,e.appendChild(p)}}generateMarkdown(){if(!this.currentPlan)return"";let e=this.currentPlan,t=[];t.push("# Gabarito da Quest\xE3o \u2014 EasyQuiz Pro"),t.push(`- **Modo:** ${e.mode}`),t.push(`- **Confian\xE7a:** ${(e.confidence*100).toFixed(0)}%`),t.push("");let a=e.actions.filter(n=>n.t==="drag"),i=e.actions.filter(n=>n.t==="val"),s=e.actions.filter(n=>n.t==="clk"||n.t==="chk"),r=e.actions.filter(n=>n.t==="sel");if(a.length>0){t.push("## \u{1F4C2} Categoriza\xE7\xE3o:");let n={};for(let d of a){let c=O(d.to)||"Geral";n[c]||(n[c]=[]),n[c].push(O(d.from))}for(let[d,c]of Object.entries(n)){t.push(`### Categoria: ${d}`);for(let u of c)t.push(`- ${u}`);t.push("")}}else if(i.length>0){t.push("## \u270F\uFE0F Respostas para Preenchimento:");for(let n of i){let d=O(n.id);t.push(`- **${d||"Campo"}:** \`${n.v}\``)}t.push("")}else if(s.length>0){t.push("## \u2705 Alternativas Corretas:");for(let n=0;n<s.length;n++){let d=s[n],c=at(d.id);(!c||/^(eq-|#|\$|\.|input_|mat-|choice_|radio_|chk_)/i.test(c))&&d.v&&(c=String(d.v)),c=O(c),/^(eq-|#|\$|\.|input_|mat-|choice_|radio_|chk_)/i.test(c)&&(c="");let u=s.length>1?`${String.fromCharCode(65+n)}) `:"";t.push(`- [x] ${u}${c||"Alternativa "+String.fromCharCode(65+n)}`)}t.push("")}else if(r.length>0){t.push("## \u{1F4CB} Op\xE7\xF5es Selecionadas em Lista:");for(let n of r){let d=O(n.id)||"Lista",c=Array.isArray(n.v)?n.v.join(", "):String(n.v??"");t.push(`- **${d}:** \`${c}\``)}t.push("")}return e.rationale&&(t.push("---"),t.push(`**\u{1F4A1} Racioc\xEDnio:** ${e.rationale}`)),t.join(`
`)}copyMarkdownToClipboard(e){let t=this.generateMarkdown();t&&navigator.clipboard.writeText(t).then(()=>{let a=e.innerHTML;e.id==="eq-fah-copy-md-btn"?e.innerHTML='<span style="font-size:10px; color:#00ffcc; font-weight:bold;">\u2713</span>':e.innerHTML="\u2713 Copiado!",setTimeout(()=>{e.innerHTML=a},1500)})}};var Xo=`
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&display=swap');

  :host {
    all: initial;
    color-scheme: dark;
    font-family: 'Nunito', 'gg sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-size: 13px;
    line-height: 1.5;

    /* === Tema Legacy: preto, branco e acento dourado do modo === */
    --eq-bg:             transparent;
    --eq-surface:        transparent;
    --eq-surface-raised: transparent;
    --eq-surface-hover:  color-mix(in srgb, var(--eq-text-bright) 6%, transparent);
    --eq-border:         color-mix(in srgb, var(--eq-text-bright) 14%, transparent);
    --eq-text:           #bdbdbd;
    --eq-text-bright:    #ffffff;
    --eq-muted:          #777777;
    --eq-accent:         #ffffff;
    --eq-accent-hover:   #e5e5e5;
    --eq-icon-accent:    #fbbf24;
    --eq-success:        #4ade80;
    --eq-warning:        #fbbf24;
    --eq-danger:         #f87171;
  }

  /* Themes */
  :host([data-eq-theme="mega-black"]) {
    --eq-bg: rgba(0,0,0,0.85);
    --eq-surface: rgba(10,10,10,0.6);
    --eq-surface-raised: rgba(0,0,0,0.15);
    --eq-surface-hover: color-mix(in srgb, var(--eq-text-bright) 6%, transparent);
    --eq-border: color-mix(in srgb, var(--eq-text-bright) 14%, transparent);
    --eq-text: #bdbdbd;
    --eq-text-bright: #ffffff;
    --eq-muted: #777777;
    --eq-accent: #ffffff;
    --eq-accent-hover: #e5e5e5;
    --eq-icon-accent: #fbbf24;
    --eq-success: #4ade80;
    --eq-warning: #fbbf24;
    --eq-danger: #f87171;
  }

  :host([data-eq-theme="dark"]) {
    --eq-bg: rgba(28,28,34,0.82);
    --eq-surface: rgba(38,38,46,0.55);
    --eq-surface-raised: rgba(45,45,55,0.7);
    --eq-surface-hover: color-mix(in srgb, var(--eq-text-bright) 8%, transparent);
    --eq-border: color-mix(in srgb, var(--eq-text-bright) 10%, transparent);
    --eq-text: #a8b2c8;
    --eq-text-bright: #e8ecf8;
    --eq-muted: #6b7280;
    --eq-accent: #818cf8;
    --eq-accent-hover: #6d77e8;
    --eq-icon-accent: #818cf8;
    --eq-success: #34d399;
    --eq-warning: #f59e0b;
    --eq-danger: #f87171;
  }
  
  :host([data-eq-theme="purple-neon"]) {
    --eq-bg: rgba(18,8,36,0.90);
    --eq-surface: rgba(32,12,60,0.55);
    --eq-surface-raised: rgba(40,16,80,0.7);
    --eq-surface-hover: rgba(160,80,255,0.12);
    --eq-border: rgba(160,80,255,0.30);
    --eq-text: #c8a8f8;
    --eq-text-bright: #f0e0ff;
    --eq-muted: #8060a8;
    --eq-accent: #bf7fff;
    --eq-accent-hover: #aa6aee;
    --eq-icon-accent: #bf7fff;
    --eq-success: #4ade80;
    --eq-warning: #fbbf24;
    --eq-danger: #ff6090;
  }

  :host([data-eq-theme="gray-blue"]) {
    --eq-bg: rgba(40,43,48,0.88);
    --eq-surface: rgba(50,54,60,0.55);
    --eq-surface-raised: rgba(58,62,68,0.7);
    --eq-surface-hover: rgba(100,130,200,0.12);
    --eq-border: rgba(88,101,242,0.22);
    --eq-text: #b9bbbe;
    --eq-text-bright: #dcddde;
    --eq-muted: #72767d;
    --eq-accent: #5865f2;
    --eq-accent-hover: #4752c4;
    --eq-icon-accent: #5865f2;
    --eq-success: #3ba55c;
    --eq-warning: #faa61a;
    --eq-danger: #ed4245;
  }

  :host([data-eq-theme="light"]) {
    color-scheme: light;
    --eq-bg: rgba(255,255,255,0.96);
    --eq-surface: rgba(245,245,250,0.8);
    --eq-surface-raised: rgba(235,235,242,0.9);
    --eq-surface-hover: rgba(0,0,0,0.06);
    --eq-border: rgba(0,0,0,0.1);
    --eq-text: #4e5568;
    --eq-text-bright: #1a1c23;
    --eq-muted: #9ba3af;
    --eq-accent: #5865f2;
    --eq-accent-hover: #4752c4;
    --eq-icon-accent: #5865f2;
    --eq-success: #3ba55c;
    --eq-warning: #d97706;
    --eq-danger: #da3633;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  /* Aplica border-radius se n\xE3o for mega-black */
  :host([data-eq-theme="mega-black"]), :host([data-eq-theme="mega-black"]) * {
    border-radius: 0 !important;
  }
  :host([data-eq-theme="dark"]) * { border-radius: 4px; }
  :host([data-eq-theme="purple-neon"]) * { border-radius: 8px; }
  :host([data-eq-theme="gray-blue"]) * { border-radius: 6px; }
  :host([data-eq-theme="light"]) * { border-radius: 6px; }


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
    border-radius: 0;
    color: var(--eq-text-bright);
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
    width: 44px;
    height: 44px;
    padding: 0;
    justify-content: center;
    background: rgba(17,17,17,0.92);
    border: 1px solid var(--eq-border);
    border-radius: 0;
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
    backdrop-filter: blur(18px) saturate(140%);
    -webkit-backdrop-filter: blur(18px) saturate(140%);
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
    color: var(--eq-icon-accent);
  }

  .eq-launcher-icon img {
    width: 24px;
    height: 24px;
    object-fit: contain;
    filter: sepia(1) saturate(5) hue-rotate(355deg) brightness(1.2);
  }

  .eq-launcher-icon svg,
  .eq-dock-toggle-icon svg {
    width: 22px;
    height: 22px;
    color: var(--eq-icon-accent);
    display: block;
  }

  .eq-launcher-dot {
    display: none;
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
    background-color: #0d1117; /* Fallback de seguran\xE7a para garantir opacidade/dimens\xF5es */
    background: var(--eq-bg);
    border-left: 1px solid var(--eq-border);
    color: var(--eq-text);
    display: flex;
    flex-direction: row;
    box-shadow: -12px 0 40px rgba(0, 0, 0, 0.45);
    transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), background 0.2s ease;
    transform: translateX(0);
    overflow: visible;
    /* Backdrop filters por tema definidos via vari\xE1veis ou overrides */
    backdrop-filter: blur(20px) saturate(200%) brightness(0.85);
    -webkit-backdrop-filter: blur(20px) saturate(200%) brightness(0.85);
  }

  /* Tema mega-black (legacy): sem backdrop-filter para manter transpar\xEAncia total */
  :host([data-eq-theme="mega-black"]) .eq-sidebar {
    backdrop-filter: blur(12px) saturate(180%);
    -webkit-backdrop-filter: blur(12px) saturate(180%);
    box-shadow: -12px 0 40px rgba(0, 0, 0, 0.8);
    border-left: 1px solid color-mix(in srgb, var(--eq-text-bright) 10%, transparent);
  }

  :host([data-eq-theme="dark"]) .eq-sidebar {
    backdrop-filter: blur(16px) saturate(180%);
    -webkit-backdrop-filter: blur(16px) saturate(180%);
  }
  :host([data-eq-theme="purple-neon"]) .eq-sidebar {
    backdrop-filter: blur(18px) saturate(220%) hue-rotate(10deg);
    -webkit-backdrop-filter: blur(18px) saturate(220%) hue-rotate(10deg);
  }
  :host([data-eq-theme="gray-blue"]) .eq-sidebar {
    backdrop-filter: blur(16px) saturate(160%);
    -webkit-backdrop-filter: blur(16px) saturate(160%);
  }
  :host([data-eq-theme="light"]) .eq-sidebar {
    backdrop-filter: blur(12px) saturate(120%) brightness(1.05);
    -webkit-backdrop-filter: blur(12px) saturate(120%) brightness(1.05);
  }

  .eq-sidebar.eq-collapsed {
    transform: translateX(100%);
  }

  .eq-sidebar.eq-collapsed .eq-dock-toggle-icon {
    transform: rotate(180deg);
  }

  /* ===== ACTIVITY BAR VERTICAL (COLUNA EM P\xC9 ESTILO VS CODE) ===== */
  .eq-activity-bar {
    width: 52px;
    min-width: 52px;
    background: transparent;
    border-right: none;
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
    border: 1px solid transparent;
    border-radius: 12px;
    color: color-mix(in srgb, var(--eq-text-bright) 72%, transparent);
    cursor: pointer;
    transition: transform 0.2s ease, border-color 0.2s ease, background 0.2s ease, color 0.2s ease;
    box-shadow: none;
  }

  .eq-activity-btn:hover {
    color: var(--eq-text-bright);
    background: color-mix(in srgb, var(--eq-text-bright) 4%, transparent);
    border-color: color-mix(in srgb, var(--eq-text-bright) 8%, transparent);
    transform: translateX(2px);
  }

  .eq-activity-btn.active {
    color: #000000;
    background: var(--eq-text-bright);
    border-color: color-mix(in srgb, var(--eq-text-bright) 28%, transparent);
    box-shadow: 0 2px 8px rgba(0,0,0,0.22);
    animation: eq-activity-in 0.35s cubic-bezier(0.16,1,0.3,1);
  }

  @keyframes eq-activity-in {
    0% { opacity: 0.35; transform: translateX(-5px) scale(0.92); }
    100% { opacity: 1; transform: translateX(0) scale(1); }
  }

  .eq-activity-indicator {
    position: absolute;
    left: -2px;
    top: 6px;
    bottom: 6px;
    width: 3px;
    background: transparent;
    border-radius: 0;
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
  .eq-activity-icon svg { width: 20px; height: 20px; display: block; flex-shrink: 0; }

  /* ===== CORPO DA SIDEBAR (PAINEL DIREITO) ===== */
  .eq-sidebar-body {
    flex: 1;
    display: flex;
    flex-direction: column;
    background: transparent;
    overflow: hidden;
    min-width: 0;
  }

  .eq-view-pane {
    background: transparent;
  }

  /* Cabe\xE7alho */
  .eq-header {
    background: transparent;
    border-bottom: 1px solid var(--eq-border);
    height: 58px;
    min-height: 58px;
    padding: 0 18px;
    backdrop-filter: blur(18px) saturate(140%);
    -webkit-backdrop-filter: blur(18px) saturate(140%);
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
    width: 30px;
    height: 30px;
    flex: 0 0 30px;
    overflow: hidden;
    border: none;
    background: transparent;
    padding: 0;
    color: var(--eq-icon-accent);
    display: flex;
    align-items: center;
  }

  .eq-brand-icon img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    filter: none;
    opacity: 1;
  }

  #eq-view-resolver {
    background: transparent;
    color: #f4f7fb;
    padding: 18px;
    border: none;
    border-radius: 18px;
    box-shadow: none;
    animation: eq-resolver-entry 0.35s cubic-bezier(0.16,1,0.3,1);
  }

  @keyframes eq-resolver-entry {
    0% { opacity: 0; transform: translateY(12px); filter: blur(8px); }
    100% { opacity: 1; transform: translateY(0); filter: blur(0); }
  }

  .eq-resolver-hero {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 18px;
  }

  .eq-resolver-brand {
    display: flex;
    align-items: center;
    gap: 14px;
    min-width: 0;
  }

  .eq-brand-mark {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 78px;
    height: 78px;
    background: transparent;
    border: none;
    box-shadow: none;
    flex-shrink: 0;
  }

  .eq-brand-mark img {
    width: 52px;
    height: 52px;
    object-fit: contain;
    filter: none;
    opacity: 0.96;
  }

  .eq-brand-copy {
    min-width: 0;
  }

  .eq-brand-title {
    color: #f4f7fb;
    font-size: 28px;
    font-weight: 900;
    line-height: 1;
    letter-spacing: 0.02em;
  }

  .eq-brand-subline {
    margin-top: 7px;
    color: rgba(223, 231, 243, 0.7);
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .eq-resolver-tools {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .eq-more-btn,
  .eq-more-btn-inline {
    width: 38px;
    height: 38px;
    min-width: 38px;
    background: var(--eq-text-bright);
    border: 1px solid rgba(15,15,15,0.12);
    color: #111111;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .eq-more-btn:hover,
  .eq-more-btn-inline:hover {
    background: #f5f5f5;
    border-color: rgba(15,15,15,0.2);
    transform: translateY(-1px);
  }


  /* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
     CTA WRAPPER  (two separate standalone buttons)
  \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
  .eq-cta-wrapper {
    display: flex;
    gap: 8px;
    margin: 0 0 10px;
    align-items: stretch;
    position: relative;
  }

  /* \u2500\u2500 PRIMARY AUTOPILOT BUTTON \u2500\u2500 */
  .eq-resolve-primary {
    flex: 1;
    min-height: 50px;
    background: #f0e6c8;
    border: none;
    border-radius: 4px;
    color: #3a2e18;
    font-weight: 800;
    font-size: 13px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 9px;
    padding: 0 16px;
    position: relative;
    overflow: hidden;
    outline: none;
    transition: background 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
    box-shadow: 0 2px 8px rgba(200,160,80,0.2);
  }

  .eq-resolve-primary:hover {
    background: #e8dab8;
    box-shadow: 0 4px 14px rgba(200,160,80,0.3);
  }

  /* Icon inside autopilot button \u2014 absolutely positioned, fixed left */
  .eq-resolve-primary {
    padding: 0 16px 0 48px; /* left padding makes room for abs icon */
  }

  .eq-resolve-primary .eq-btn-icon {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    width: 22px;
    height: 22px;
    filter: none;
    z-index: 2;
    flex-shrink: 0;
  }

  .eq-resolve-primary .eq-btn-icon svg {
    fill: url(#geminiGradient) !important;
    width: 100%;
    height: 100%;
    display: block;
  }

  /* \u2500\u2500 Apple/Google-quality icon glow ring when processing \u2500\u2500 */
  .eq-resolve-primary.danger .eq-btn-icon {
    /* orbit halo via ::before, inner pulse via ::after */
  }

  .eq-resolve-primary.danger .eq-btn-icon::before {
    content: '';
    position: absolute;
    inset: -6px;
    border-radius: 50%;
    background: conic-gradient(
      from var(--eq-orbit-angle, 0deg),
      transparent 0deg,
      rgba(66,133,244,0.8) 60deg,
      rgba(155,114,203,0.9) 120deg,
      rgba(217,101,112,0.8) 180deg,
      transparent 230deg,
      transparent 360deg
    );
    animation: eq-icon-orbit 2s linear infinite;
    z-index: -1;
    mask-image: radial-gradient(transparent 60%, black 62%);
    -webkit-mask-image: radial-gradient(transparent 60%, black 62%);
  }

  .eq-resolve-primary.danger .eq-btn-icon::after {
    content: '';
    position: absolute;
    inset: -3px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(155,114,203,0.4) 0%, transparent 70%);
    animation: eq-icon-pulse 1.8s ease-in-out infinite alternate;
    z-index: -1;
  }

  @keyframes eq-icon-orbit {
    0%   { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  @keyframes eq-icon-pulse {
    0%   { opacity: 0.5; transform: scale(0.9); }
    100% { opacity: 1;   transform: scale(1.2); }
  }

  .eq-btn-label {
    display: inline-block;
    white-space: nowrap;
    position: relative;
    z-index: 2;
  }

  /* RUNNING STATE: transparent bg + shimmer */
  .eq-resolve-primary.danger {
    background: transparent !important;
    color: #edf3ff;
    box-shadow: none;
    border: 1px solid color-mix(in srgb, var(--eq-text-bright) 10%, transparent);
  }

  /* Shimmer + radial glow overlay */
  .eq-btn-shimmer {
    display: none;
    position: absolute;
    inset: 0;
    background: linear-gradient(
      110deg,
      rgba(66,133,244,0.0) 10%,
      rgba(155,114,203,0.35) 45%,
      rgba(217,101,112,0.25) 65%,
      rgba(66,133,244,0.0) 90%
    );
    background-size: 250% 100%;
    animation: eq-shimmer-move 2s linear infinite;
    pointer-events: none;
    border-radius: inherit;
  }

  /* Radial glow that breathes while processing */
  .eq-btn-shimmer::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at 50% 120%, rgba(155,114,203,0.25) 0%, transparent 70%);
    animation: eq-glow-breathe 2.2s ease-in-out infinite alternate;
    border-radius: inherit;
  }

  @keyframes eq-glow-breathe {
    0%   { opacity: 0.4; transform: scaleX(0.85); }
    100% { opacity: 1;   transform: scaleX(1.1); }
  }

  .eq-resolve-primary.danger .eq-btn-shimmer {
    display: block;
  }

  @keyframes eq-shimmer-move {
    0%   { background-position: 250% 0; }
    100% { background-position: -250% 0; }
  }

  /* \u2500\u2500 PING-PONG LINE: smooth translateX-based, no abrupt jumps \u2500\u2500 */
  .eq-cta-progress-line {
    position: absolute;
    bottom: -5px;
    left: 0;
    right: 58px;
    height: 2px;
    background: color-mix(in srgb, var(--eq-text-bright) 6%, transparent);
    overflow: hidden;
    border-radius: 2px;
    pointer-events: none;
  }

  /* Track segment using translateX \u2014 guaranteed smooth, no position jumps */
  .eq-cta-progress-line::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 35%;
    background: linear-gradient(90deg, transparent 0%, rgba(155,114,203,0.35) 50%, transparent 100%);
    border-radius: 2px;
    /* translateX(0) \u2192 translateX(186%): 186 = (100/35)*65 \u2248 moves width across track */
    animation: eq-slide-idle 4s cubic-bezier(0.37, 0, 0.63, 1) infinite alternate;
  }

  .eq-cta-wrapper.is-running .eq-cta-progress-line {
    background: color-mix(in srgb, var(--eq-text-bright) 4%, transparent);
  }

  .eq-cta-wrapper.is-running .eq-cta-progress-line::after {
    background: linear-gradient(90deg, transparent 0%, #9B72CB 40%, #4285F4 70%, transparent 100%);
    animation: eq-slide-run 1.6s cubic-bezier(0.37, 0, 0.63, 1) infinite alternate;
  }

  @keyframes eq-slide-idle {
    0%   { transform: translateX(0%); opacity: 0.45; }
    50%  { opacity: 0.65; }
    100% { transform: translateX(186%); opacity: 0.45; }
  }

  @keyframes eq-slide-run {
    0%   { transform: translateX(0%); opacity: 0.8; }
    100% { transform: translateX(186%); opacity: 1; }
  }

  /* \u2500\u2500 3-DOT SHELL (wrapper: button + floating menu as siblings) \u2500\u2500 */
  .eq-menu-shell {
    position: relative;
    display: flex;
    flex-shrink: 0;
    overflow: visible;
  }

  /* \u2500\u2500 3-DOT MENU BUTTON (white bg, standalone) \u2500\u2500 */
  .eq-resolve-menu {
    width: 50px;
    min-width: 50px;
    min-height: 50px;
    background: var(--eq-text-bright);
    border: none;
    border-radius: 4px;
    color: #1a1a1a;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: relative;
    outline: none;
    flex-shrink: 0;
    box-shadow: 0 2px 8px rgba(0,0,0,0.12);
    transition: background 0.2s ease, box-shadow 0.2s ease;
  }

  .eq-resolve-menu:hover,
  .eq-resolve-menu.is-open {
    background: #f0f0f0;
    box-shadow: 0 4px 14px rgba(0,0,0,0.18);
  }
  .eq-resolve-menu svg { width: 18px; height: 18px; display: block; }

  /* \u2500\u2500 CONTEXT MENU (transparent + backdrop blur) \u2500\u2500 */
  /* .eq-resolver-context-menu \u2192 replaced by .eq-ctx */

  .eq-resolver-context-menu[hidden] { display: none !important; }

  /* Smooth open */
  @keyframes eq-menu-appear {
    0%   { opacity: 0; transform: translateY(-8px) scale(0.94); }
    60%  { opacity: 1; transform: translateY(2px)  scale(1.01); }
    100% { opacity: 1; transform: translateY(0)    scale(1);    }
  }

  /* .eq-menu-item \u2192 replaced by .eq-ctx-item */

  .eq-btn-icon, .eq-menu-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    flex-shrink: 0;
    filter: brightness(1.2);
    transition: transform 0.25s ease;
  }
  .eq-btn-icon svg, .eq-menu-icon svg { width: 14px; height: 14px; display: block; }

  /* \u2500\u2500 STATUS BAR (always-minimal single line) \u2500\u2500 */
  .eq-status-bar {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 10px;
    background: color-mix(in srgb, var(--eq-text-bright) 3%, transparent);
    border: 1px solid color-mix(in srgb, var(--eq-text-bright) 6%, transparent);
    border-radius: 4px;
    margin-bottom: 10px;
    min-height: 32px;
  }

  .eq-status-bar-text {
    flex: 1;
    font-size: 11px;
    color: rgba(234,240,248,0.7);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.3;
  }

  .eq-status-bar-timer {
    font-style: normal;
    font-size: 10px;
    color: rgba(234,240,248,0.4);
    font-weight: 600;
    flex-shrink: 0;
  }

  /* \u2500\u2500 RESULT SECTION (collapsible) \u2500\u2500 */
  .eq-result-toggle {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
    background: color-mix(in srgb, var(--eq-text-bright) 4%, transparent);
    border: 1px solid color-mix(in srgb, var(--eq-text-bright) 7%, transparent);
    border-radius: 4px;
    color: #c2ccd8;
    font-size: 11px;
    font-weight: 700;
    padding: 7px 12px;
    cursor: pointer;
    text-align: left;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    outline: none;
    transition: background 0.2s ease;
    margin-bottom: 4px;
  }

  .eq-result-toggle:hover { background: color-mix(in srgb, var(--eq-text-bright) 7%, transparent); }

  .eq-result-toggle-icon {
    display: inline-flex;
    align-items: center;
    width: 13px;
    height: 13px;
    transition: transform 0.2s ease;
    flex-shrink: 0;
    color: #93c5fd;
  }
  .eq-result-toggle-icon svg { width: 13px; height: 13px; display: block; }

  .eq-result-toggle.is-open .eq-result-toggle-icon {
    transform: rotate(90deg);
  }

  .eq-result-body {
    padding: 4px 0 0;
    overflow: hidden;
    max-height: 2000px;
    transition: max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1),
                opacity 0.25s ease,
                padding 0.25s ease;
    opacity: 1;
  }

  .eq-result-body.is-collapsed {
    max-height: 0;
    opacity: 0;
    padding: 0;
  }

  /* \u2500\u2500 DOT PULSE (in status bar) \u2500\u2500 */
  .eq-dot-pulse {
    width: 7px;
    height: 7px;
    border-radius: 999px;
    background: #5ad88b;
    flex-shrink: 0;
    box-shadow: 0 0 0 3px rgba(90,216,139,0.15);
    animation: eq-status-dot-pulse 1.8s ease-in-out infinite;
  }

  .eq-dot-pulse.busy  { background: #7bb5ff; box-shadow: 0 0 0 3px rgba(123,181,255,0.18); }
  .eq-dot-pulse.error { background: #ff7d7d; box-shadow: 0 0 0 3px rgba(255,125,125,0.18); }
  .eq-dot-pulse.stopped { background: #ffd166; box-shadow: 0 0 0 3px rgba(255,209,102,0.18); }

  @keyframes eq-status-dot-pulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50%       { transform: scale(1.3); opacity: 0.7; }
  }

  /* \u2500\u2500 OPERATION STATE PILL \u2500\u2500 */
  #eq-view-resolver .eq-operation-state {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    border: 1px solid color-mix(in srgb, var(--eq-text-bright) 10%, transparent);
    background: color-mix(in srgb, var(--eq-text-bright) 4%, transparent);
    color: #edf3ff;
    border-radius: 999px;
    padding: 3px 9px;
    min-height: 20px;
    font-size: 9px;
    font-weight: 800;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    transition: all 0.2s ease;
    flex-shrink: 0;
    white-space: nowrap;
  }

  #eq-view-resolver .eq-operation-state.is-busy    { color: #b9d4ff; background: rgba(123,181,255,0.12); border-color: rgba(123,181,255,0.22); }
  #eq-view-resolver .eq-operation-state.is-success { color: #baf7cf; background: rgba(90,216,139,0.10);  border-color: rgba(90,216,139,0.20);  }
  #eq-view-resolver .eq-operation-state.is-error   { color: #ffb1b1; background: rgba(255,125,125,0.10); border-color: rgba(255,125,125,0.20); }
  #eq-view-resolver .eq-operation-state.is-warning { color: #ffd977; background: rgba(255,209,102,0.10); border-color: rgba(255,209,102,0.20); }
  #eq-view-resolver .eq-operation-state.is-info    { color: #9dd1ff; background: rgba(147,197,253,0.10); border-color: rgba(147,197,253,0.20); }


  

  

  .eq-brand-name {
    font-size: 13px;
    font-weight: 900;
    color: var(--eq-text-bright);
    letter-spacing: 0.02em;
  }

  .eq-brand-badge {
    background: rgba(255,255,255,0.88);
    border: 1px solid rgba(255,255,255,0.6);
    color: #111111;
    font-size: 9px;
    font-weight: 800;
    padding: 2px 6px;
    border-radius: 3px;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  .eq-brand-version {
    color: var(--eq-accent);
    font-family: 'JetBrains Mono', Consolas, monospace;
    font-size: 10px;
    font-weight: 800;
    letter-spacing: 0.04em;
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
  .eq-icon-btn svg { width: 16px; height: 16px; display: block; }

  .eq-icon-btn:hover {
    background: var(--eq-surface-hover);
    color: var(--eq-text-bright);
    border-color: var(--eq-border);
  }

  /* \xC1rea Scroll\xE1vel das Visualiza\xE7\xF5es */
  .eq-views-wrapper {
    flex: 1;
    overflow: hidden; /* n\xE3o scrolla o wrapper \u2014 o pane interno \xE9 que scrolla */
    display: flex;
    flex-direction: column;
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

  /* cada pane preenche 100% do wrapper e tem scroll pr\xF3prio */
  .eq-view-pane {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 16px;
    overflow-y: auto;
    overflow-x: hidden;
    min-height: 0;
  }

  /* scrollbar fina no pane (mesmo estilo do wrapper antigo) */
  .eq-view-pane::-webkit-scrollbar { width: 3px; }
  .eq-view-pane::-webkit-scrollbar-track { background: rgba(0,0,0,0.5);
    backdrop-filter: blur(28px) saturate(250%);
    -webkit-backdrop-filter: blur(28px) saturate(250%); }
  .eq-view-pane::-webkit-scrollbar-thumb { background: var(--eq-surface-hover); border-radius: 2px; }



  /* ===== SE\xC7\xD5ES E COMPONENTES ===== */
  
  /* Topbar de Configura\xE7\xF5es */
  .eq-settings-topbar {
    display: flex;
    overflow-x: auto;
    gap: 8px;
    padding: 0 4px 12px 4px;
    border-bottom: 1px solid var(--eq-border);
    margin-bottom: 12px;
  }
  .eq-settings-topbar::-webkit-scrollbar {
    width: 0px;
    height: 0px;
    background: transparent;
  }
  .eq-settings-cat-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 8px 16px;
    background: transparent;
    border: none;
    border-radius: 4px;
    color: var(--eq-muted);
    font-size: 11px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    min-width: 64px;
  }
  .eq-settings-cat-btn svg {
    width: 18px;
    height: 18px;
    opacity: 0.8;
  }
  .eq-settings-cat-btn:hover {
    color: var(--eq-text-bright);
    background: var(--eq-surface-hover);
  }
  .eq-settings-cat-btn.active {
    color: #000;
    background: var(--eq-text-bright);
  }
  :host([data-eq-theme="mega-black"]) .eq-settings-cat-btn {
    border-radius: 0;
  }
  :host([data-eq-theme="mega-black"]) .eq-settings-cat-btn.active {
    background: var(--eq-text-bright);
    color: #000;
  }
  
  /* Configuration Rows */
  .eq-cfg-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 9px 0;
    border-bottom: 1px solid color-mix(in srgb, var(--eq-text-bright) 5%, transparent);
    gap: 12px;
  }
  :host([data-eq-theme="light"]) .eq-cfg-row {
    border-bottom: 1px solid rgba(0,0,0,0.05);
  }
  .eq-cfg-row:last-child { border-bottom: none; }
  
  .eq-cfg-label {
    display: flex;
    flex-direction: column;
    gap: 2px;
    flex: 1;
  }
  .eq-cfg-label-title {
    font-size: 12px;
    font-weight: 600;
    color: var(--eq-text-bright);
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .eq-cfg-label-desc {
    font-size: 10px;
    color: var(--eq-muted);
    line-height: 1.4;
  }
  
  /* Toggle Switch */
  .eq-toggle {
    position: relative;
    width: 36px;
    height: 20px;
    flex-shrink: 0;
  }
  .eq-toggle input { opacity: 0; width: 0; height: 0; position: absolute; }
  .eq-toggle-track {
    position: absolute;
    inset: 0;
    background: color-mix(in srgb, var(--eq-text-bright) 12%, transparent);
    cursor: pointer;
    transition: background 0.2s cubic-bezier(0.16,1,0.3,1);
  }
  :host([data-eq-theme="light"]) .eq-toggle-track {
    background: rgba(0,0,0,0.12);
  }
  :host([data-eq-theme="dark"]) .eq-toggle-track,
  :host([data-eq-theme="purple-neon"]) .eq-toggle-track,
  :host([data-eq-theme="gray-blue"]) .eq-toggle-track,
  :host([data-eq-theme="light"]) .eq-toggle-track {
    border-radius: 10px !important;
  }
  .eq-toggle-knob {
    position: absolute;
    top: 3px;
    left: 3px;
    width: 14px;
    height: 14px;
    background: color-mix(in srgb, var(--eq-text-bright) 50%, transparent);
    transition: transform 0.2s cubic-bezier(0.16,1,0.3,1), background 0.2s ease;
    pointer-events: none;
  }
  :host([data-eq-theme="light"]) .eq-toggle-knob {
    background: var(--eq-text-bright);
    box-shadow: 0 1px 3px rgba(0,0,0,0.2);
  }
  :host([data-eq-theme="dark"]) .eq-toggle-knob,
  :host([data-eq-theme="purple-neon"]) .eq-toggle-knob,
  :host([data-eq-theme="gray-blue"]) .eq-toggle-knob,
  :host([data-eq-theme="light"]) .eq-toggle-knob {
    border-radius: 50% !important;
  }
  .eq-toggle input:checked ~ .eq-toggle-track {
    background: var(--eq-accent);
  }
  .eq-toggle input:checked ~ .eq-toggle-track .eq-toggle-knob {
    transform: translateX(16px);
    background: var(--eq-text-bright);
  }
  :host([data-eq-theme="mega-black"]) .eq-toggle input:checked ~ .eq-toggle-track .eq-toggle-knob {
    background: #000;
  }
  
  /* Theme Cards */
  .eq-theme-cards-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    margin-top: 8px;
  }
  .eq-theme-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    background: var(--eq-surface);
    border: 1px solid var(--eq-border);
    padding: 8px;
    cursor: pointer;
    transition: all 0.2s;
  }
  .eq-theme-card:hover {
    border-color: var(--eq-text);
  }
  .eq-theme-card.active {
    border-color: var(--eq-accent);
    background: var(--eq-surface-raised);
  }
  .eq-theme-card-preview {
    width: 100%;
    height: 36px;
    display: flex;
    border: 1px solid color-mix(in srgb, var(--eq-text-bright) 10%, transparent);
  }
  :host([data-eq-theme="light"]) .eq-theme-card-preview {
    border-color: rgba(0,0,0,0.1);
  }
  .eq-theme-card-preview-bar {
    width: 12px;
    height: 100%;
    background: rgba(0,0,0,0.3);
  }
  .eq-theme-card-preview-main {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 4px;
  }
  .eq-theme-card-preview-line {
    height: 4px;
    background: color-mix(in srgb, var(--eq-text-bright) 20%, transparent);
    border-radius: 2px;
  }
  .eq-theme-card-label {
    font-size: 10px;
    font-weight: 700;
    color: var(--eq-text);
    text-transform: uppercase;
    display: flex;
    align-items: center;
    gap: 4px;
  }
  .eq-theme-card.active .eq-theme-card-label {
    color: var(--eq-accent);
  }

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
  /* .eq-context-menu \u2192 replaced by .eq-ctx */

  .eq-context-menu[hidden] {
    display: none !important;
  }

  /* .eq-context-item \u2192 replaced by .eq-ctx-item */

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
    color: var(--eq-text-bright);
    background: transparent;
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
    background: transparent;
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
    background: transparent;
    border: none;
    border-radius: 4px;
    color: var(--eq-text-bright);
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
    background: transparent;
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
    background: transparent;
    border: 1px solid #050505;
    border-radius: 4px;
    color: var(--eq-text-bright);
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
    background: transparent;
    border-color: #252525;
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


  /* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
     VS CODE BRAIN EXPLORER \u2014 v4
  \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */

  .eq-brain-pane {
    flex-direction: column;
    padding: 0 !important;
    gap: 0 !important;
    overflow: hidden !important;
    min-height: 0;
  }

  /* Brain pane fills the entire wrapper when active */
  .eq-views-wrapper.is-brain-active {
    overflow: hidden !important;
  }

  .eq-views-wrapper.is-brain-active > .eq-brain-pane {
    flex: 1;
    height: 100%;
    display: flex !important;
  }

  .eq-brain-toolbar {
    display:flex; align-items:center; justify-content:space-between;
    padding:5px 8px; border-bottom:1px solid color-mix(in srgb, var(--eq-text-bright) 6%, transparent);
    flex-shrink:0; min-height:34px;
  }

  .eq-brain-toolbar-title {
    font-size:10px; font-weight:700; letter-spacing:0.1em;
    color:rgba(234,240,248,0.38); text-transform:uppercase;
  }

  .eq-brain-toolbar-actions { display:flex; gap:2px; }

  .eq-brain-layout { display:flex; flex-direction:column; flex:1; min-height:0; overflow:hidden; }

  /* \u2500\u2500 CANVAS (fixed height, resizable, toggleable) \u2500\u2500 */
  .eq-brain-canvas {
    height: 280px;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border-bottom: 1px solid color-mix(in srgb, var(--eq-text-bright) 7%, transparent);
    transition: opacity 0.25s ease;
  }

  .eq-brain-canvas.is-hidden {
    height: 0 !important;
    opacity: 0;
    pointer-events: none;
    border-bottom: none;
  }

  /* Tab bar */
  .eq-brain-tabbar {
    display:flex; align-items:stretch;
    border-bottom:1px solid color-mix(in srgb, var(--eq-text-bright) 6%, transparent);
    background:rgba(0,0,0,0.12);
    overflow-x:auto; overflow-y:hidden;
    flex-shrink:0; min-height:30px;
    scrollbar-width:thin; scrollbar-color:color-mix(in srgb, var(--eq-text-bright) 10%, transparent) transparent;
  }
  .eq-brain-tabbar::-webkit-scrollbar { height:2px; position:absolute; }
  .eq-brain-tabbar::-webkit-scrollbar-track { background:transparent; }
  .eq-brain-tabbar::-webkit-scrollbar-thumb { background:color-mix(in srgb, var(--eq-text-bright) 14%, transparent); border-radius:1px; }
  .eq-brain-tabbar::-webkit-scrollbar-thumb:hover { background:color-mix(in srgb, var(--eq-text-bright) 26%, transparent); }

  .eq-brain-tab {
    display:flex; align-items:center; gap:5px; padding:0 10px;
    border-right:1px solid color-mix(in srgb, var(--eq-text-bright) 5%, transparent); cursor:pointer;
    font-size:11.5px; color:rgba(234,240,248,0.42);
    white-space:nowrap; user-select:none;
    transition:background 0.12s,color 0.12s;
    min-width:90px; max-width:150px; flex-shrink:0;
  }
  .eq-brain-tab:hover { background:color-mix(in srgb, var(--eq-text-bright) 4%, transparent); color:rgba(234,240,248,0.82); }
  .eq-brain-tab.is-active { background:color-mix(in srgb, var(--eq-text-bright) 6%, transparent); color:rgba(234,240,248,0.96); border-bottom:2px solid #4285F4; }
  .eq-brain-tab-icon { display:inline-flex; align-items:center; flex-shrink:0; opacity:0.45; width:13px; height:13px; }
  .eq-brain-tab-icon svg { width:13px; height:13px; display:block; }
  .eq-brain-tab-label { overflow:hidden; text-overflow:ellipsis; flex:1; }
  .eq-brain-tab-close {
    background:none; border:none; color:inherit;
    display:inline-flex; align-items:center; padding:0 2px;
    cursor:pointer; opacity:0; transition:opacity 0.12s; flex-shrink:0;
  }
  .eq-brain-tab:hover .eq-brain-tab-close,
  .eq-brain-tab.is-active .eq-brain-tab-close { opacity:0.5; }
  .eq-brain-tab-close:hover { opacity:1!important; }

  /* Content */
  .eq-brain-content {
    flex:1; overflow-y:auto; overflow-x:hidden;
    background: transparent;
    scrollbar-width:thin; scrollbar-color:color-mix(in srgb, var(--eq-text-bright) 10%, transparent) transparent;
  }
  .eq-brain-content::-webkit-scrollbar { width:3px; }
  .eq-brain-content::-webkit-scrollbar-track { background:transparent; }
  .eq-brain-content::-webkit-scrollbar-thumb { background:color-mix(in srgb, var(--eq-text-bright) 13%, transparent); border-radius:2px; }

  .eq-brain-empty-canvas {
    display:flex; flex-direction:column; align-items:center; justify-content:center;
    height:100%; min-height:55px; gap:5px;
    color:rgba(234,240,248,0.18); font-size:12px; text-align:center; padding:12px;
  }
  .eq-brain-empty-sub { font-size:10px; color:rgba(234,240,248,0.12); }

  /* Resize handle */
  .eq-brain-resize-handle {
    height:5px; flex-shrink:0; cursor:ns-resize;
    background:linear-gradient(to bottom,color-mix(in srgb, var(--eq-text-bright) 5%, transparent) 0%,transparent 100%);
    transition:background 0.15s; position:relative;
  }
  .eq-brain-resize-handle:hover { background:rgba(66,133,244,0.25); }
  .eq-brain-resize-handle::after {
    content:''; position:absolute; left:50%; top:50%;
    transform:translate(-50%,-50%);
    width:28px; height:2px; border-radius:1px;
    background:color-mix(in srgb, var(--eq-text-bright) 18%, transparent);
  }

  /* File view */
  .eq-brain-file-view { display:flex; flex-direction:column; height:100%; }
  .eq-brain-file-header {
    display:flex; align-items:center; padding:3px 12px;
    border-bottom:1px solid color-mix(in srgb, var(--eq-text-bright) 4%, transparent);
    background: transparent; flex-shrink:0;
  }
  .eq-brain-file-lang {
    font-size:9px; font-weight:700; color:rgba(234,240,248,0.22);
    text-transform:uppercase; letter-spacing:0.08em;
  }

  /* Code (raw) */
  .eq-brain-code {
    margin:0; padding:10px 14px;
    font-family:'JetBrains Mono',Consolas,monospace;
    font-size:11.5px; line-height:1.65; color:rgba(220,235,255,0.88);
    overflow:visible; white-space:pre-wrap; word-break:break-word;
    flex:1; background:transparent; border:none; tab-size:2;
  }

  /* Markdown */
  .eq-brain-markdown { padding:12px 16px; font-size:12px; line-height:1.7; color:rgba(234,240,248,0.88); flex:1; }
  .eq-md-h1 { font-size:15px; font-weight:700; color:rgba(234,240,248,0.96); margin:12px 0 6px; padding-bottom:4px; border-bottom:1px solid color-mix(in srgb, var(--eq-text-bright) 8%, transparent); }
  .eq-md-h2 { font-size:13.5px; font-weight:700; color:rgba(234,240,248,0.9); margin:10px 0 4px; }
  .eq-md-h3 { font-size:12.5px; font-weight:600; color:rgba(234,240,248,0.85); margin:8px 0 3px; }
  .eq-md-p  { margin:3px 0; }
  .eq-md-gap { height:6px; }
  .eq-md-inline {
    font-family:'JetBrains Mono',Consolas,monospace; font-size:10.5px;
    background:color-mix(in srgb, var(--eq-text-bright) 8%, transparent); padding:1px 5px; border-radius:3px; color:#93c5fd;
  }
  .eq-md-codeblock { background: transparent; border-radius:5px; margin:6px 0; overflow:hidden; border:1px solid color-mix(in srgb, var(--eq-text-bright) 6%, transparent); }
  .eq-md-codelang {
    font-size:9px; font-weight:700; color:rgba(234,240,248,0.28); text-transform:uppercase;
    letter-spacing:0.06em; padding:3px 10px; border-bottom:1px solid color-mix(in srgb, var(--eq-text-bright) 5%, transparent);
    background:rgba(0,0,0,0.15);
  }
  .eq-md-codeblock pre {
    margin:0; padding:8px 10px;
    font-family:'JetBrains Mono',Consolas,monospace; font-size:11px;
    line-height:1.6; color:rgba(220,235,255,0.88); white-space:pre-wrap; word-break:break-word;
  }
  .eq-md-bq { border-left:3px solid rgba(66,133,244,0.5); padding:3px 10px; margin:4px 0; color:rgba(234,240,248,0.6); font-style:italic; }
  .eq-md-hr { border:none; height:1px; background:color-mix(in srgb, var(--eq-text-bright) 8%, transparent); margin:8px 0; }
  .eq-md-li { display:flex; gap:6px; margin:2px 0; padding-left:4px; }
  .eq-md-bullet { color:rgba(66,133,244,0.8); flex-shrink:0; }

  /* Folder overview */
  .eq-folder-view { padding:8px 10px; }
  .eq-folder-view-header {
    display:flex; align-items:center; gap:6px;
    font-size:12.5px; font-weight:600; color:rgba(234,240,248,0.72);
    padding-bottom:7px; border-bottom:1px solid color-mix(in srgb, var(--eq-text-bright) 5%, transparent); margin-bottom:5px;
  }
  .eq-folder-view-row {
    display:flex; align-items:center; gap:8px; padding:5px 8px;
    border-radius:4px; cursor:pointer; font-size:12px; color:rgba(234,240,248,0.58);
    transition:background 0.1s,color 0.1s; user-select:none;
  }
  .eq-folder-view-row:hover { background:color-mix(in srgb, var(--eq-text-bright) 6%, transparent); color:rgba(234,240,248,0.9); }

  /* \u2500\u2500 EXPLORER (adaptive height with scroll) \u2500\u2500 */
  .eq-brain-explorer {
    flex: 1;
    min-height: 80px;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 3px 0;
    background: transparent;
    scrollbar-width: thin;
    scrollbar-color: color-mix(in srgb, var(--eq-text-bright) 8%, transparent) transparent;
  }
  .eq-brain-explorer::-webkit-scrollbar { width:2px; }
  .eq-brain-explorer::-webkit-scrollbar-track { background:transparent; }
  .eq-brain-explorer::-webkit-scrollbar-thumb { background:color-mix(in srgb, var(--eq-text-bright) 12%, transparent); border-radius:1px; }

  .eq-brain-empty-tree { padding:10px; font-size:11.5px; color:rgba(234,240,248,0.26); font-style:italic; }

  /* Global node */
  .eq-tree-global { padding-left:8px!important; color:rgba(156,210,255,0.7)!important; font-weight:600; border-bottom:1px solid color-mix(in srgb, var(--eq-text-bright) 4%, transparent); margin-bottom:1px; }
  .eq-tree-global:hover { color:rgba(156,210,255,0.95)!important; background:rgba(66,133,244,0.08)!important; }
  .eq-tree-global.is-selected { color:#89c8ff!important; border-left-color:#60a5fa!important; background:rgba(66,133,244,0.14)!important; }

  .eq-tree-sep { height:1px; background:color-mix(in srgb, var(--eq-text-bright) 5%, transparent); margin:2px 0; }

  .eq-tree-folder {
    display:flex; align-items:center; gap:3px; padding:4px 6px;
    font-size:12.5px; color:rgba(234,240,248,0.76);
    user-select:none; white-space:nowrap; overflow:hidden;
    cursor:default; transition:background 0.1s;
  }
  .eq-tree-folder:hover { background:color-mix(in srgb, var(--eq-text-bright) 4%, transparent); }
  .eq-tree-folder.is-folder-sel { background:color-mix(in srgb, var(--eq-text-bright) 7%, transparent); }

  .eq-tree-arrow {
    width:16px; flex-shrink:0; display:inline-flex; align-items:center;
    cursor:pointer; color:rgba(234,240,248,0.36); padding:2px; border-radius:2px;
    transition:background 0.1s,color 0.1s;
  }
  .eq-tree-arrow:hover { background:color-mix(in srgb, var(--eq-text-bright) 10%, transparent); color:rgba(234,240,248,0.7); }

  .eq-tree-ficon { display:inline-flex; align-items:center; flex-shrink:0; width:16px; height:16px; transition:color 0.1s; }
  .eq-tree-ficon svg { display:block; width:14px; height:14px; }

  /* Smooth collapse */
  .eq-tree-children {
    overflow:hidden; max-height:0; opacity:0;
    transition:max-height 0.24s cubic-bezier(0.4,0,0.2,1), opacity 0.2s cubic-bezier(0.4,0,0.2,1);
  }
  .eq-tree-children.is-open { max-height:calc(var(--child-count,6)*27px + 6px); opacity:1; }

  .eq-tree-file {
    display:flex; align-items:center; gap:5px; padding:3px 6px 3px 30px;
    cursor:pointer; font-size:12px; color:rgba(234,240,248,0.54);
    user-select:none; transition:background 0.1s,color 0.1s; white-space:nowrap; overflow:hidden;
  }
  .eq-tree-file:hover { background:color-mix(in srgb, var(--eq-text-bright) 5%, transparent); color:rgba(234,240,248,0.9); }
  .eq-tree-file.is-selected { background:rgba(66,133,244,0.18); color:#b9d4ff; border-left:2px solid #4285F4; padding-left:28px; }

  .eq-tree-label { overflow:hidden; text-overflow:ellipsis; flex:1; }

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
    background: var(--eq-bg);
    backdrop-filter: blur(20px) saturate(160%);
    -webkit-backdrop-filter: blur(20px) saturate(160%);
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
    color: var(--eq-text-bright);
  }

  .eq-fah-letter-badge {
    background: var(--eq-accent);
    color: var(--eq-text-bright);
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
    .eq-activity-bar {
      width: 46px;
      min-width: 46px;
    }
    .eq-header {
      padding: 0 12px;
    }
    .eq-brand-name {
      font-size: 12px;
    }
    .eq-brand-version {
      font-size: 9px;
    }
    .eq-views-wrapper {
      padding: 12px;
      gap: 12px;
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
  .eq-operation-state.is-busy { color: #aaa; border-color: color-mix(in srgb, var(--eq-text-bright) 15%, transparent); background: color-mix(in srgb, var(--eq-text-bright) 5%, transparent); }
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
    background: transparent;
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
    background: transparent;
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
    color: var(--eq-text-bright) !important;
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
    background: transparent;
    border: 1px solid color-mix(in srgb, var(--eq-text-bright) 8%, transparent);
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
    color: #555;
    text-transform: uppercase;
  }
  .eq-live-stopwatch-status {
    font-size: 11px;
    font-weight: 600;
    color: var(--eq-muted);
    padding: 2px 6px;
    background: color-mix(in srgb, var(--eq-text-bright) 5%, transparent);
    border-radius: 4px;
  }
  .eq-live-stopwatch-status.active {
    color: #ccc;
    background: color-mix(in srgb, var(--eq-text-bright) 8%, transparent);
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
    color: var(--eq-text-bright);
    letter-spacing: 0.05em;
    text-shadow: none;
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
    background: transparent;
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
    background: transparent;
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
    color: #888;
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

  /* \u2500\u2500 Terminal block cursor \u2500\u2500 */
  .eq-term-cursor {
    display: inline-block;
    width: 0.6em;
    height: 2px;
    background: transparent;
    animation: eq-term-blink 1.1s step-end infinite;
    vertical-align: text-bottom;
    margin-left: 1px;
  }
  @keyframes eq-term-blink {
    0%, 100% { opacity: 1 }
    50% { opacity: 0 }
  }
  #eq-term-output.eq-term-unfocused .eq-term-cursor {
    opacity: 0.25;
    animation-play-state: paused;
  }
  #eq-term-output { scrollbar-width: thin; scrollbar-color: #1e1e1e #0a0a0a; }
  #eq-live-debug-terminal { scrollbar-width: thin; scrollbar-color: #1e1e1e #0a0a0a; }


  /* eq-item-icon: used in list items and context items */
  .eq-item-icon { display:inline-flex; align-items:center; flex-shrink:0; width:15px; height:15px; }
  .eq-item-icon svg { width:14px; height:14px; display:block; }


  /* \u2550\u2550\u2550 UNIFIED CONTEXT MENU \u2014 .eq-ctx / .eq-ctx-item \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
     Both the resolver menu and the settings menu use THESE classes only.
     position:fixed is set by JS on open so backdrop-filter blur always works.
  \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */
  .eq-ctx {
    display: flex;
    flex-direction: column;
    gap: 1px;
    padding: 4px;
    min-width: 200px;
    /* Very transparent so blurred content behind is clearly visible */
    background: rgba(10,12,20,0.22);
    backdrop-filter: blur(28px) saturate(250%) brightness(0.95);
    -webkit-backdrop-filter: blur(28px) saturate(250%) brightness(0.95);
    border: 1px solid color-mix(in srgb, var(--eq-text-bright) 10%, transparent);
    border-radius: 0;
    box-shadow: 0 18px 56px rgba(0,0,0,0.96), 0 0 0 0.5px color-mix(in srgb, var(--eq-text-bright) 6%, transparent);
    /* isolation:isolate creates own stacking context for backdrop-filter */
    isolation: isolate;
  }
  .eq-ctx[hidden] { display: none !important; }

  .eq-ctx-item {
    display: flex;
    align-items: center;
    gap: 9px;
    width: 100%;
    height: 30px;
    padding: 0 10px;
    background: transparent;
    border: none;
    border-radius: 1px;
    color: #aaa;
    font-family: inherit;
    font-size: 12px;
    font-weight: 600;
    text-align: left;
    cursor: pointer;
    transition: background 0.08s, color 0.08s;
  }
  .eq-ctx-item:hover { background: color-mix(in srgb, var(--eq-text-bright) 9%, transparent); color: #fff; }
  .eq-ctx-item.danger { color: #f87171; }
  .eq-ctx-item.danger:hover { background: rgba(255,80,80,0.12); color: #fca5a5; }

  .eq-ctx-icon {
    display: inline-flex;
    width: 14px;
    height: 14px;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    opacity: 0.75;
  }
  .eq-ctx-icon svg { width: 13px; height: 13px; }
  .eq-ctx-item:hover .eq-ctx-icon { opacity: 1; }
  .eq-ctx-divider { height: 1px; background: color-mix(in srgb, var(--eq-text-bright) 6%, transparent); margin: 3px 6px; }
  .eq-ctx-badge {
    font-size: 9px; font-weight: 700; padding: 2px 6px;
    background: color-mix(in srgb, var(--eq-text-bright) 7%, transparent); color: #555; border-radius: 2px;
    letter-spacing: 0.06em; margin-left: auto;
  }

  /* Terminal wallpaper canvas \u2014 injected by JS in initTerminalWallpaper() */
  #eq-wallpaper-canvas { display:block; }

  
  /* \u2500\u2500 Icon Sizing \u2014 all icons 16x16 consistent \u2500\u2500 */
  .eq-btn-icon, .eq-menu-icon, .eq-item-icon,
  .eq-brain-tab-icon, .eq-dock-toggle-icon,
  .eq-result-toggle-icon {
    display:inline-flex; align-items:center; justify-content:center;
    width:16px; height:16px; flex-shrink:0;
  }
  .eq-activity-icon {
    display:inline-flex; align-items:center; justify-content:center;
    width:18px; height:18px; flex-shrink:0;
  }
  .eq-launcher-icon {
    display:inline-flex; align-items:center; justify-content:center;
    width:13px; height:13px; flex-shrink:0;
  }
  .eq-icon-btn > svg { width:14px; height:14px; display:block; }
  .eq-btn-icon > svg { width:15px; height:15px; display:block; }
  .eq-activity-icon > svg { width:18px; height:18px; display:block; }
  .eq-menu-icon > svg, .eq-item-icon > svg { width:13px; height:13px; display:block; }
  .eq-brand-icon img, .eq-brand-mark img { width:20px; height:20px; display:block; }
  .eq-resolver-brand .eq-brand-mark img { width:60px; height:auto; }
  #eq-term-output ::selection,
  #eq-live-debug-terminal ::selection {
    background: rgba(255,255,255,0.85);
    color: #0a0a0a;
  }

  /* \u2500\u2500 Resolver + Output context menus \u2014 glassmorphism \u2500\u2500 */
  .eq-resolver-context-menu {
    background: transparent !important;
    backdrop-filter: blur(16px) saturate(140%) !important;
    -webkit-backdrop-filter: blur(16px) saturate(140%) !important;
    border: 1px solid color-mix(in srgb, var(--eq-text-bright) 8%, transparent) !important;
    border-radius: 8px !important;
    box-shadow: 0 12px 36px rgba(0,0,0,0.75) !important;
  }

  /* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
     SISTEMA DE GLOW EFFECTS
     Ativado via atributo data-eq-glow="true" no host.
     Aplica brilho vibrante em bot\xF5es, controles e elementos
     interativos \u2014 intensidade calibrada para n\xE3o ofuscar.
  \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */
  :host([data-eq-glow="true"]) .eq-btn,
  :host([data-eq-glow="true"]) .eq-primary-btn,
  :host([data-eq-glow="true"]) .eq-resolve-primary,
  :host([data-eq-glow="true"]) .eq-resolve-menu,
  :host([data-eq-glow="true"]) .eq-launcher,
  :host([data-eq-glow="true"]) .eq-activity-btn.active {
    box-shadow: 0 0 10px var(--eq-accent), 0 0 22px color-mix(in srgb, var(--eq-accent) 35%, transparent);
    filter: brightness(1.15);
    transition: box-shadow 0.25s ease, filter 0.25s ease;
  }

  :host([data-eq-glow="true"]) .eq-btn:hover,
  :host([data-eq-glow="true"]) .eq-primary-btn:hover,
  :host([data-eq-glow="true"]) .eq-resolve-primary:hover,
  :host([data-eq-glow="true"]) .eq-resolve-menu:hover,
  :host([data-eq-glow="true"]) .eq-launcher:hover {
    box-shadow: 0 0 16px var(--eq-accent), 0 0 36px color-mix(in srgb, var(--eq-accent) 50%, transparent);
    filter: brightness(1.3);
  }

  :host([data-eq-glow="true"]) .eq-activity-btn:hover {
    box-shadow: 0 0 8px var(--eq-icon-accent), 0 0 16px color-mix(in srgb, var(--eq-icon-accent) 30%, transparent);
    filter: brightness(1.2);
  }

  :host([data-eq-glow="true"]) .eq-brand-icon,
  :host([data-eq-glow="true"]) .eq-launcher-icon {
    filter: drop-shadow(0 0 6px var(--eq-icon-accent)) brightness(1.25);
  }

  /* \xCDcones de ac\xE7\xE3o dentro de bot\xF5es ficam mais vibrantes */
  :host([data-eq-glow="true"]) .eq-btn-icon,
  :host([data-eq-glow="true"]) .eq-menu-icon {
    filter: brightness(1.4) drop-shadow(0 0 3px currentColor);
  }

  /* Indicador de aba activa pulsa suavemente com glow */
  :host([data-eq-glow="true"]) .eq-activity-indicator {
    background: var(--eq-accent);
    box-shadow: 0 0 8px var(--eq-accent);
    animation: eq-glow-pulse 2s ease-in-out infinite alternate;
  }

  @keyframes eq-glow-pulse {
    from { opacity: 0.7; box-shadow: 0 0 4px var(--eq-accent); }
    to   { opacity: 1;   box-shadow: 0 0 14px var(--eq-accent); }
  }

`;var Pe=typeof process<"u"&&"v3.8.8"||"v3.8.7";var Vo=(()=>{try{if(typeof window.trustedTypes?.createPolicy=="function")return window.trustedTypes.createPolicy("easyquiz-ui#html",{createHTML:o=>o})}catch{}return null})();function Ba(o,e){try{if(Vo){o.innerHTML=Vo.createHTML(e);return}}catch{}try{if(typeof o.setHTMLUnsafe=="function"){o.setHTMLUnsafe(e);return}}catch{}o.innerHTML=e}var ja=[{value:"",label:"Detec\xE7\xE3o Autom\xE1tica"},{value:"escolha_unica",label:"M\xFAltipla Escolha (\xDAnica)"},{value:"escolha_multipla",label:"M\xFAltipla Escolha (V\xE1rias)"},{value:"categorizacao",label:"Categoriza\xE7\xE3o / Grupos"},{value:"arrastar_soltar",label:"Arrastar e Soltar (Drag & Drop)"},{value:"ordenacao",label:"Ordena\xE7\xE3o / Sequ\xEAncia"},{value:"verdadeiro_falso",label:"Verdadeiro / Falso"},{value:"texto_livre",label:"Texto Livre / Dissertativa"},{value:"preenchimento",label:"Preenchimento de Lacunas"}],Qa=[{value:"smart",label:"Inteligente (Auto-H\xEDbrido)"},{value:"command",label:"Apenas Comando (Seguro)"},{value:"javascript",label:"Apenas JS Nativo (Avan\xE7ado)"}],Mt=class{host;shadow;callbacks;autopilot;floatingAnswers;initialSettings;isCollapsed=!1;activeTab="resolver";isBusy=!1;stopwatchInterval=null;stopwatchStartTime=0;latestPlan=null;latestContext=null;latestImages=[];latestImageDescriptions=[];latestPromptText="";metricsLiveTime;metricsLiveStatus;metricsTotalBadge;metricTotalTime;metricAvgTime;metricTotalCount;metricsHistoryList;metricsHistoryCount;metricsCopyBtn;metricsResetBtn;currentQuestionStartTime=0;questionLiveTimerInterval=null;liveDebugTerminal;dbgModel;dbgLatency;dbgSplitTokens;dbgTotalTokens;dbgErrorCard;dbgErrorText;dbgPromptLen;dbgPromptView;dbgContextView;dbgRawRespView;dbgCountAll;dbgCountError;dbgCountAi;dbgCountDom;logEntries=[];activeLogFilter="all";autoScrollLogs=!0;lastErrorMsg=null;terminalCmdHistory=[];terminalCmdHistoryIdx=-1;terminalMode="terminal";_wallpaperRAF=0;_wlpWhiteLogo=null;_terminalInited=!1;liveTerminalOutput=null;terminalInputEl=null;outputSearchQuery="";outputSortNewest=!0;_reconnectContextbarBtns=()=>{};_autopilotAnalyzingShown=!1;progressContainer;progressBar;progressLabel;progressVal;contextTreeContainer;launcherBtn;launcherDot;dockToggleBtn;sidebarEl;apToggleBtn;apConsole;executionConsole;dotPulseAp;statusTextAp;stopwatchAp;dotPulseAdv;statusTextAdv;stopwatchAdv;inspModel;inspLatency;inspTokens;inspPrompt;inspRationale;inspActions;copyPromptBtn=null;apiKeyInput;_ctxPopup=null;_ctxCloseH=null;keyMoreBtn;keysListEl;keysBadgeEl;modelSelect;modeSelect;engineSelect;dryRunCheckbox;autoApplyCheckbox;autoAdvanceCheckbox;hostDarkModeCheckbox;useVisionCheckbox;toastStackingCheckbox;showTokensCheckbox;soundFeedbackCheckbox;compactModeCheckbox;glowEffectsCheckbox;languageHintSelect;autoScrollLogsCheckbox;analyzeBtn;applyBtn=null;resultContainer;constructor(e,t){this.initialSettings=e,this.callbacks=t,this.autopilot=new St({onStatusChange:(c,u,m)=>{this.logToConsole(u,m),c==="analyzing"?this._autopilotAnalyzingShown||(this._autopilotAnalyzingShown=!0,this.setBusy(!0,"Autopilot: IA analisando...")):c==="advancing"||c==="waiting"?(this._autopilotAnalyzingShown=!1,this.setBusy(!1),this.updateAutopilotUi(!0)):c==="idle"?(this._autopilotAnalyzingShown=!1,this.setBusy(!1),this.updateAutopilotUi(!1),u.includes("conclus\xE3o")||u.includes("finalizada")||u.includes("Parab\xE9ns")?this.setStatus("Atividade conclu\xEDda. Resolver Autopilot finalizado com sucesso.","success"):this.setStatus("Resolver Autopilot pausado e aguardando nova a\xE7\xE3o.","info")):c==="error"&&(this._autopilotAnalyzingShown=!1,this.setBusy(!1),this.updateAutopilotUi(!1),this.setStatus("Resolver Autopilot interrompido por erro.","error"))},onRequestAnalysis:async(c,u)=>{try{return await this.callbacks.onAnalyze(c,u,!0)||null}catch{return null}},isManualModeActive:()=>this.floatingAnswers?.isOpen()??!1,onPageAdvance:()=>{this.floatingAnswers?.hide()}}),this.host=document.createElement("div"),this.host.id="easyquiz-shadow-root",this.host.style.setProperty("position","fixed","important"),this.host.style.setProperty("top","15px","important"),this.host.style.setProperty("right","15px","important"),this.host.style.setProperty("z-index","2147483647","important"),this.host.style.setProperty("display","block","important"),this.host.style.setProperty("pointer-events","none","important"),this.shadow=this.host.attachShadow({mode:"open"}),Ba(this.shadow,`
      <svg width="0" height="0" style="position:absolute;">
        <defs>
          <linearGradient id="geminiGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#4285F4"/>
            <stop offset="50%" stop-color="#9B72CB"/>
            <stop offset="100%" stop-color="#D96570"/>
          </linearGradient>
        </defs>
      </svg>
      <style>${Xo}</style>

      <!-- Launcher m\xEDnimo: apenas o controle para abrir/recolher o painel. -->
      <button class="eq-launcher" type="button" title="Abrir / Recolher painel EasyQuiz (Alt+Q)" aria-label="Abrir ou esconder painel EasyQuiz">
        <span class="eq-launcher-icon">${L.chevronRight}</span>
        <span class="eq-launcher-dot" id="eq-launcher-dot" aria-hidden="true"></span>
      </button>

      <!-- Sidebar Fixa Lateral Direita Estilo VS Code -->
      <aside class="eq-sidebar" aria-label="EasyQuiz Sidebar">
        <!-- Aba Retr\xE1til na Borda Esquerda -->
        <button class="eq-dock-toggle" id="eq-dock-toggle" type="button" title="Recolher / Expandir Painel (Alt+Q)">
          <span class="eq-dock-toggle-icon">${L.chevronRight}</span>
        </button>
           <!-- Activity Bar Vertical na Esquerda (Estilo VS Code - Apenas \xCDcones) -->
          <nav class="eq-activity-bar" role="tablist" aria-label="Atalhos">
            <div class="eq-activity-top">
              <button class="eq-activity-btn active" id="eq-tab-resolver" role="tab" title="Resolver (Opera\xE7\xF5es Atuais)">
                <span class="eq-activity-indicator"></span>
                <span class="eq-activity-icon">${L.sparkles}</span>
              </button>

              <button class="eq-activity-btn" id="eq-tab-brain" role="tab" title="C\xE9rebro da IA (Contexto e Inspe\xE7\xE3o)">
                <span class="eq-activity-indicator"></span>
                <span class="eq-activity-icon">${L.inspector}</span>
              </button>

              <button class="eq-activity-btn" id="eq-tab-metrics" role="tab" title="M\xE9tricas & Cron\xF4metro (Tempo por Quest\xE3o e Hist\xF3rico)">
                <span class="eq-activity-indicator"></span>
                <span class="eq-activity-icon">${L.clock}</span>
              </button>

              <button class="eq-activity-btn" id="eq-tab-debug" role="tab" title="Terminal & Debug Output (Logs, Tokens, Prompts, Erros)">
                <span class="eq-activity-indicator"></span>
                <span class="eq-activity-icon">${L.code}</span>
              </button>
            </div>

            <div class="eq-activity-bottom">
              <button class="eq-activity-btn" id="eq-tab-settings" role="tab" title="Configura\xE7\xF5es e Ajustes Avan\xE7ados">
                <span class="eq-activity-indicator"></span>
                <span class="eq-activity-icon">${L.settings}</span>
              </button>
            </div>
          </nav>

          <!-- Corpo Principal da Sidebar -->
          <main class="eq-sidebar-body">
            <!-- Cabe\xE7alho do painel Legacy -->
            <header class="eq-header">
              <div class="eq-brand">
                <span class="eq-brand-icon"><img src="${L.canvasLogo}" alt="EasyQuiz" /></span>
                <span class="eq-brand-name">EasyQuiz</span>
                <span class="eq-brand-badge">BETA</span>
                <span class="eq-brand-version">${Pe}</span>
                <span id="eq-active-model-badge" style="display:none; font-size:9px; font-weight:700; padding:1px 5px; border-radius:3px; background:rgba(251,191,36,0.14); border:1px solid rgba(251,191,36,0.4); color:#fbbf24; letter-spacing:0.04em; white-space:nowrap;"></span>
              </div>
              <div class="eq-header-tools">
                <button class="eq-icon-btn" id="eq-min-btn" type="button" title="Minimizar (Alt+Q)">${L.chevronRight}</button>
                <button class="eq-icon-btn" id="eq-close-btn" type="button" title="Fechar">${L.close}</button>
              </div>
            </header>

            <!-- Context Topbar: padronizado em todas as abas -->
            <div id="eq-tab-contextbar" style="display:flex;align-items:center;justify-content:space-between;padding:7px 12px;background:rgba(255,255,255,0.025);border-bottom:1px solid rgba(255,255,255,0.06);flex-shrink:0;min-height:30px;">
              <div style="display:flex;align-items:center;gap:8px;">
                <span id="eq-ctxbar-icon" style="display:inline-flex;color:#aaa;opacity:0.7;"></span>
                <span id="eq-ctxbar-name" style="font-size:11px;font-weight:700;color:var(--eq-text);letter-spacing:0.02em;"></span>
                <span id="eq-ctxbar-sub" style="font-size:9px;color:#444;font-weight:500;"></span>
              </div>
              <div id="eq-ctxbar-actions" style="display:flex;align-items:center;gap:4px;"></div>
            </div>

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

                <div class="eq-resolver-hero">
                  <div class="eq-resolver-brand">
                    <span class="eq-brand-mark"><img src="${L.canvasLogo}" alt="EQ Legacy" /></span>
                    <div class="eq-brand-copy">
                      <div class="eq-brand-title">EQ Legacy</div>
                      <div class="eq-brand-subline">BETA \u2022 ${Pe}</div>
                    </div>
                  </div>
                </div>

                <!-- CTA: Autopilot + 3-dot as SEPARATE standalone buttons -->
                <div class="eq-cta-wrapper">
                  <button class="eq-resolve-primary" id="eq-analyze-btn" type="button">
                    <span class="eq-btn-icon">${L.sparkles}</span>
                    <span class="eq-btn-label">Resolver Autopilot</span>
                    <span class="eq-btn-shimmer" aria-hidden="true"></span>
                  </button>
                  <!-- 3-dot shell: button + floating menu as siblings -->
                  <div class="eq-menu-shell">
                    <button class="eq-resolve-menu" id="eq-auto-menu-btn" type="button" aria-label="Mais op\xE7\xF5es" title="Mais op\xE7\xF5es">
                      <span class="eq-btn-icon">${L.moreVertical}</span>
                    </button>
                    <div class="eq-ctx" id="eq-auto-menu" hidden>
                      <button type="button" class="eq-ctx-item" data-auto-action="toggle">
                        <span class="eq-ctx-icon">${L.sparkles}</span>
                        <span>Resolver Autopilot</span>
                      </button>
                      <button type="button" class="eq-ctx-item" data-auto-action="memory">
                        <span class="eq-ctx-icon">${L.eraser}</span>
                        <span>Limpar mem\xF3ria</span>
                      </button>
                      <button type="button" class="eq-ctx-item" data-auto-action="status">
                        <span class="eq-ctx-icon">${L.info}</span>
                        <span>Mostrar status</span>
                      </button>
                    </div>
                  </div>
                  <!-- Animated ping-pong line (visible only when running) -->
                  <div class="eq-cta-progress-line" id="eq-cta-progress-line" aria-hidden="true"></div>
                </div>

                <!-- STATUS BAR: always minimal single line -->
                <div class="eq-status-bar" id="eq-status-card">
                  <span class="eq-dot-pulse" id="eq-dot-ap"></span>
                  <span class="eq-status-bar-text" id="eq-status-summary">Sistema aguardando.</span>
                  <span class="eq-operation-state" id="eq-operation-state">Pronto</span>
                  <em class="eq-status-bar-timer" id="eq-stopwatch-ap"><span>--</span></em>
                </div>

                <!-- RESULTS: collapsible -->
                <div id="eq-result" class="eq-operation-result" style="display: none; flex-direction: column; gap: 0;">
                  <button class="eq-result-toggle" id="eq-result-toggle" type="button">
                    <span class="eq-result-toggle-icon">${L.chevronRight}</span>
                    <span>Plano e respostas</span>
                    <div class="eq-badges" id="eq-badges" style="margin-left:auto;"></div>
                  </button>
                  <div class="eq-result-body" id="eq-result-body">
                    <div class="eq-rationale-card" id="eq-rationale-text"></div>
                    <div class="eq-action-list" id="eq-actions-list"></div>
                    <div class="eq-execution-card" id="eq-execution-card" hidden>
                      <div class="eq-section-title">Execu\xE7\xE3o e evid\xEAncias</div>
                      <div class="eq-execution-placeholder" id="eq-execution-placeholder" style="display: none;"></div>
                      <div class="eq-execution-summary" id="eq-execution-summary"></div>
                      <div class="eq-execution-list" id="eq-execution-list"></div>
                    </div>
                    <button class="eq-btn-secondary" id="eq-open-hud-btn" type="button">${L.list} Abrir respostas dispon\xEDveis</button>
                  </div>
                </div>

                <!-- Console Terminal Oculto (Apenas para Autopilot Interno) -->
                <div class="eq-terminal" id="eq-ap-console" style="display: none;"></div>
                <div class="eq-terminal eq-terminal-execution" id="eq-execution-console" style="display: none;"></div>
                
                <div class="eq-footer-note" style="margin-top: auto;">${Pe} \u2022 H\xEDbrido 4.0 (RAG + AST + Vision)</div>
              </div>

              <!-- TAB 2: C\xC9REBRO DA IA \u2014 VS Code Explorer -->
              <div class="eq-view-pane eq-brain-pane" id="eq-view-brain" style="display: none;">
                <!-- Toolbar -->
                <!-- Toolbar buttons hidden -->
                <div style="display:none"><button id="eq-brain-canvas-toggle"></button><button id="eq-copy-prompt-btn"></button></div>
                <!-- Main layout: canvas top, explorer bottom -->
                <div class="eq-brain-layout">
                  <!-- TOP: Tab Canvas -->
                  <div class="eq-brain-canvas">
                    <div class="eq-brain-tabbar" id="eq-brain-tabbar"></div>
                    <div class="eq-brain-content" id="eq-brain-content">
                      <div class="eq-brain-empty-canvas">
                        <div class="eq-brain-empty-icon"></div>
                        <div>Nada selecionado</div>
                        <div class="eq-brain-empty-sub">Clique em um item no explorador abaixo</div>
                      </div>
                    </div>
                  </div>
                  <!-- Resize handle -->
                  <div class="eq-brain-resize-handle" id="eq-brain-resize-handle" title="Arrastar para redimensionar"></div>
                  <!-- BOTTOM: File Tree -->
                  <div class="eq-brain-explorer" id="eq-brain-explorer">
                    <div class="eq-brain-empty-tree">Aguardando an\xE1lise...</div>
                  </div>
                </div>
                <!-- Hidden compat holders -->
                <span id="eq-insp-model" style="display:none;"></span>
                <span id="eq-insp-latency" style="display:none;"></span>
                <span id="eq-insp-tokens" style="display:none;"></span>
                <span id="eq-insp-prompt" style="display:none;"></span>
                <span id="eq-insp-rationale" style="display:none;"></span>
                <div id="eq-insp-actions" style="display:none;"></div>
              </div><!-- FIX: FECHAMENTO eq-view-brain -->


              <!-- TAB 3: M\xC9TRICAS & CRON\xD4METRO -->
              <div class="eq-view-pane" id="eq-view-metrics" style="display: none; gap:0; padding: 0;">

                <span id="eq-metrics-total-badge" style="display:none">0 QUEST\xD5ES</span>
                <!-- Cron\xF4metro ao vivo -->
                <div style="padding:14px 14px 10px;border-bottom:1px solid rgba(255,255,255,0.05);flex-shrink:0;background:transparent;">
                  <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;">
                    <span style="font-size:9px;font-weight:700;letter-spacing:0.12em;color:#555;">QUEST\xC3O ATUAL</span>
                    <span id="eq-metrics-live-status" style="font-size:9px;padding:2px 8px;border-radius:8px;background:rgba(255,255,255,0.06);color:#666;font-weight:600;">Em espera</span>
                  </div>
                  <div id="eq-metrics-live-time" style="font-size:36px;font-weight:800;letter-spacing:-0.02em;color:#fff;font-variant-numeric:tabular-nums;line-height:1;font-family:monospace;">00:00.00</div>
                  <div style="font-size:9px;color:#444;margin-top:5px;">Cron\xF4metro em tempo real \xB7 zero tokens consumidos</div>
                </div>

                <!-- Cards de resumo (3 col) -->
                <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:rgba(255,255,255,0.05);flex-shrink:0;">
                  <div style="background:transparent;padding:10px 12px;display:flex;flex-direction:column;gap:3px;">
                    <div style="font-size:9px;color:#555;font-weight:600;letter-spacing:0.06em;">TEMPO TOTAL</div>
                    <div id="eq-metric-total-time" style="font-size:20px;font-weight:800;color:var(--eq-text-bright);font-variant-numeric:tabular-nums;font-family:monospace;">00:00</div>
                    <div style="font-size:9px;color:#444;">Sess\xE3o atual</div>
                  </div>
                  <div style="background:transparent;padding:10px 12px;display:flex;flex-direction:column;gap:3px;">
                    <div style="font-size:9px;color:#555;font-weight:600;letter-spacing:0.06em;">M\xC9DIA / Q.</div>
                    <div id="eq-metric-avg-time" style="font-size:20px;font-weight:800;color:#4ade80;font-variant-numeric:tabular-nums;font-family:monospace;">0.0s</div>
                    <div style="font-size:9px;color:#444;">Ritmo m\xE9dio</div>
                  </div>
                  <div style="background:transparent;padding:10px 12px;display:flex;flex-direction:column;gap:3px;">
                    <div style="font-size:9px;color:#555;font-weight:600;letter-spacing:0.06em;">RESPONDIDAS</div>
                    <div id="eq-metric-total-count" style="font-size:20px;font-weight:800;color:#fbbf24;font-variant-numeric:tabular-nums;font-family:monospace;">0</div>
                    <div style="font-size:9px;color:#444;">Quest\xF5es OK</div>
                  </div>
                </div>

                <div style="display:none"><button id="eq-metrics-copy-btn" type="button"></button><button id="eq-metrics-reset-btn" type="button"></button></div>

                <!-- Hist\xF3rico -->
                <div style="display:flex;align-items:center;justify-content:space-between;padding:7px 12px 5px;flex-shrink:0;">
                  <span style="font-size:9px;font-weight:700;letter-spacing:0.08em;color:#555;">HIST\xD3RICO POR QUEST\xC3O</span>
                  <span id="eq-metrics-history-count" style="font-size:9px;color:#444;">0 registros</span>
                </div>
                <div id="eq-metrics-history-list" style="flex:1;overflow-y:auto;padding:0 10px 10px;">
                  <div class="eq-metrics-empty">Nenhuma quest\xE3o respondida nesta sess\xE3o ainda.</div>
                </div>

              </div>

              <!-- TAB 4: DEBUG OUTPUT & TERMINAL -->
              <div class="eq-view-pane" id="eq-view-debug" style="display:none;flex-direction:column;">
                <span id="eq-debug-badge" style="display:none">ATIVO</span>

                <!-- Output toolbar \u2014 only in Output mode (mode pill is in contextbar) -->
                <div id="eq-output-toolbar" style="display:none;align-items:center;gap:5px;padding:5px 10px;background:#080808;border-bottom:1px solid #161616;flex-shrink:0;">
                  <div style="position:relative;display:inline-flex;">
                    <button id="eq-output-filter-btn" type="button" style="display:inline-flex;align-items:center;gap:4px;height:24px;font-size:9.5px;font-weight:600;padding:0 9px;border-radius:5px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);color:#777;cursor:pointer;font-family:'Cascadia Code','Fira Code',monospace;white-space:nowrap;"><span id="eq-output-filter-label">Filtro: Todos</span><span style="display:inline-flex;width:10px;height:10px;color:#444;transform:rotate(90deg);">${L.chevronRight}</span></button>
                    <div id="eq-output-filter-menu" style="display:none;position:absolute;top:calc(100% + 5px);left:0;z-index:9999;background:rgba(8,8,14,0.72);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:5px;min-width:172px;box-shadow:0 12px 32px rgba(0,0,0,0.75);">
                      <div style="padding:3px 8px 4px;font-size:8px;font-weight:700;letter-spacing:0.1em;color:#333;font-family:monospace;">CATEGORIAS</div>
                      <label class="eq-filter-lbl" id="eq-filter-opt-all"   style="display:flex;align-items:center;gap:7px;padding:5px 10px;cursor:pointer;border-radius:5px;transition:background 0.08s;" onmouseover="this.style.background='rgba(255,255,255,0.05)'" onmouseout="this.style.background='transparent'"><input type="checkbox" id="eq-fchk-all"   checked style="accent-color:#aaa;cursor:pointer;"> <span style="display:inline-flex;width:12px;height:12px;color:#777;">${L.list}</span>     <span style="font-size:10px;color:#aaa;font-family:monospace;">Todos</span>    <span id="eq-dbg-count-all"   style="margin-left:auto;color:#333;font-size:8px;font-family:monospace;">0</span></label>
                      <label class="eq-filter-lbl" id="eq-filter-opt-error" style="display:flex;align-items:center;gap:7px;padding:5px 10px;cursor:pointer;border-radius:5px;transition:background 0.08s;" onmouseover="this.style.background='rgba(255,85,85,0.08)'"   onmouseout="this.style.background='transparent'"><input type="checkbox" id="eq-fchk-error"         style="accent-color:#ff5555;cursor:pointer;"> <span style="display:inline-flex;width:12px;height:12px;color:#ff5555;">${L.info}</span>    <span style="font-size:10px;color:#aaa;font-family:monospace;">Erros</span>    <span id="eq-dbg-count-error" style="margin-left:auto;color:#333;font-size:8px;font-family:monospace;">0</span></label>
                      <label class="eq-filter-lbl" id="eq-filter-opt-ai"    style="display:flex;align-items:center;gap:7px;padding:5px 10px;cursor:pointer;border-radius:5px;transition:background 0.08s;" onmouseover="this.style.background='rgba(96,165,250,0.08)'"  onmouseout="this.style.background='transparent'"><input type="checkbox" id="eq-fchk-ai"           style="accent-color:#60a5fa;cursor:pointer;"> <span style="display:inline-flex;width:12px;height:12px;color:#60a5fa;">${L.sparkles}</span> <span style="font-size:10px;color:#aaa;font-family:monospace;">IA</span>       <span id="eq-dbg-count-ai"    style="margin-left:auto;color:#333;font-size:8px;font-family:monospace;">0</span></label>
                      <label class="eq-filter-lbl" id="eq-filter-opt-dom"   style="display:flex;align-items:center;gap:7px;padding:5px 10px;cursor:pointer;border-radius:5px;transition:background 0.08s;" onmouseover="this.style.background='rgba(74,222,128,0.06)'"  onmouseout="this.style.background='transparent'"><input type="checkbox" id="eq-fchk-dom"          style="accent-color:#4ade80;cursor:pointer;"> <span style="display:inline-flex;width:12px;height:12px;color:#4ade80;">${L.code}</span>    <span style="font-size:10px;color:#aaa;font-family:monospace;">DOM/Exec</span> <span id="eq-dbg-count-dom"   style="margin-left:auto;color:#333;font-size:8px;font-family:monospace;">0</span></label>
                    </div>
                  </div>
                  <button id="eq-output-sort-btn" type="button" title="Ordenar" style="display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);border-radius:5px;color:#aaa;cursor:pointer;flex-shrink:0;transition:color 0.12s;"><span id="eq-sort-arrow" style="display:inline-flex;width:13px;height:13px;transform:rotate(270deg);transition:transform 0.2s;">${L.chevronRight}</span></button>
                  <div style="flex:1;display:flex;align-items:center;gap:5px;background:#0d0d0d;border:1px solid #1a1a1a;border-radius:5px;padding:0 8px;height:24px;"><input id="eq-output-search" type="text" placeholder="buscar logs..." autocomplete="off" style="flex:1;background:transparent;border:none;outline:none;color:#777;font-size:9.5px;font-family:'Cascadia Code','Fira Code',monospace;caret-color:#555;" /><button id="eq-output-search-clear" type="button" style="display:none;background:transparent;border:none;color:#333;cursor:pointer;font-size:9px;padding:0;line-height:1;">\u2715</button></div>
                  <button id="eq-dbg-scroll-toggle" type="button" title="Auto-scroll: ativo" style="display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.18);border-radius:5px;color:var(--eq-text-bright);cursor:pointer;flex-shrink:0;font-size:12px;font-weight:700;">\u2913</button>
                </div>

                <!-- TERMINAL MODE \u2014 True terminal, no input bar -->
                <div id="eq-term-panel-terminal" style="flex:1;display:flex;flex-direction:column;overflow:hidden;min-height:0;position:relative;">
                  <!-- Click position cursor -->
                  <div id="eq-click-cursor" style="position:absolute;pointer-events:none;display:none;z-index:10;background:rgba(255,255,255,0.75);mix-blend-mode:difference;"></div>
                  <canvas id="eq-term-sel-canvas" style="position:absolute;top:0;left:0;pointer-events:none;z-index:8;mix-blend-mode:difference;opacity:1;"></canvas>
                  <!-- Hidden textarea captures keyboard input -->
                  <textarea id="eq-term-capture" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" style="position:absolute;left:-9999px;top:-9999px;width:1px;height:1px;opacity:0;pointer-events:none;resize:none;border:none;outline:none;"></textarea>
                  <!-- Output area: all lines + current prompt at bottom -->
                  <div id="eq-term-output" style="flex:1;overflow-y:auto;overflow-x:hidden;padding:10px 14px 6px;font-family:'Cascadia Code','Fira Code','Courier New',monospace;font-size:11.5px;line-height:1.65;background:transparent;color:var(--eq-text-bright);user-select:text;-webkit-user-select:text;cursor:text;outline:none;caret-color:transparent;position:relative;z-index:9;">
                    


                                        <div data-perm="1" style="display:inline-block;user-select:none;margin-bottom:8px;max-width:100%;">
                      <div style="display:inline-flex;align-items:center;gap:14px;padding:12px 18px;outline:1px solid #1e1e1e;outline-offset:-1px;border-radius:3px;">
                        <img src="${L.canvasLogo}" alt="EQ" style="width:48px;height:auto;opacity:0.5;filter:brightness(0) invert(1);" />
                        <div>
                          <div style="font-family:'Cascadia Code','Fira Code','Courier New',monospace;font-size:15px;font-weight:800;color:#3a3a3a;letter-spacing:0.14em;line-height:1;">EASYQUIZ</div>
                          <div style="font-family:'Cascadia Code','Fira Code','Courier New',monospace;font-size:10px;color:#555;font-weight:600;letter-spacing:0.06em;margin-top:4px;">Terminal \xB7 Motor H\xEDbrido 4.0</div>
                          <div style="font-family:'Cascadia Code','Fira Code','Courier New',monospace;font-size:9px;color:#2a2a2a;margin-top:5px;letter-spacing:0.04em;">${Pe} &nbsp;\xB7&nbsp; RAG &middot; AST &middot; VISION &middot; MULTIMODAL</div>
                        </div>
                      </div>
                    </div>
                    <div data-perm="1" style="font-family:'Cascadia Code','Fira Code','Courier New',monospace;font-size:10px;color:#2a2a2a;padding:2px 0 8px;">Digite <span style="color:#555;font-weight:700;">help</span> <span style="color:#222;">para listar comandos dispon\xEDveis</span></div>
                    <!-- Current input line \u2014 always last -->
                    <div id="eq-term-current-line" style="display:flex;align-items:baseline;overflow:hidden;flex-shrink:0;"><span style="color:#fff;font-weight:700;user-select:none;">EasyQuiz_Legacy:&nbsp;</span><span id="eq-term-typed" style="color:var(--eq-text-bright);"></span><span class="eq-term-cursor"></span></div>
                  </div>
                </div>

                <!-- OUTPUT MODE -->
                <div id="eq-term-panel-output" style="flex:1;display:none;flex-direction:column;overflow:hidden;min-height:0;">
                  <div class="eq-terminal" id="eq-live-debug-terminal" style="flex:1;font-family:'Cascadia Code','Fira Code','Courier New',monospace;font-size:10.5px;background:transparent;overflow-y:auto;position:relative;z-index:1;padding:8px 14px;line-height:1.55;user-select:text;-webkit-user-select:text;color:#bbb;">
                    <div style="color:#333;">&gt; [SYS] Output de auditoria pronto.</div>
                  </div>
                </div>

                <!-- Error card -->
                <div class="eq-debug-error-card" id="eq-dbg-error-card" style="display:none;flex-shrink:0;">
                  <div class="eq-debug-error-header">
                    <span>\xDAltimo Erro</span>
                    <button class="eq-icon-btn" id="eq-dbg-copy-error-btn" type="button" title="Copiar" style="width:20px;height:20px;">${L.copy}</button>
                  </div>
                  <div class="eq-debug-error-msg" id="eq-dbg-error-text"></div>
                </div>

                <!-- Hidden API info elements -->
                <div style="display:none;">
                  <span id="eq-dbg-model">--</span>
                  <span id="eq-dbg-latency">--</span>
                  <span id="eq-dbg-total-tokens">--</span>
                  <span id="eq-dbg-split-tokens">--/--</span>
                  <span id="eq-dbg-prompt-len">--</span>
                </div>

              </div>

              <!-- TAB 4: CONFIGURA\xC7\xD5ES -->
              <div class="eq-view-pane" id="eq-view-settings" style="display: none; padding-top: 12px;">
                <!-- Topbar de Categorias -->
                <div class="eq-settings-topbar" id="eq-settings-topbar">
                  <button type="button" class="eq-settings-cat-btn active" data-cat="general" title="Geral">
                    ${L.settings}<span>Geral</span>
                  </button>
                  <button type="button" class="eq-settings-cat-btn" data-cat="tokens" title="Tokens API">
                    ${L.key}<span>Tokens</span>
                  </button>
                  <button type="button" class="eq-settings-cat-btn" data-cat="visual" title="Visual e Temas">
                    ${L.palette}<span>Visual</span>
                  </button>
                  <button type="button" class="eq-settings-cat-btn" data-cat="ai" title="IA e Modelos">
                    ${L.sparkles}<span>IA</span>
                  </button>
                  <button type="button" class="eq-settings-cat-btn" data-cat="system" title="Sistema e Motor">
                    ${L.cpu}<span>Sistema</span>
                  </button>
                  <button type="button" class="eq-settings-cat-btn" data-cat="about" title="Sobre">
                    ${L.info}<span>Sobre</span>
                  </button>
                </div>

                <!-- CATEGORIA: GERAL -->
                <div class="eq-settings-cat-content" id="eq-cat-general" style="display: flex; flex-direction: column;">
                  <div class="eq-cfg-row">
                    <div class="eq-cfg-label">
                      <span class="eq-cfg-label-title">${L.checkCircle} Auto Aplicar</span>
                      <span class="eq-cfg-label-desc">Aplica respostas automaticamente ap\xF3s a an\xE1lise.</span>
                    </div>
                    <label class="eq-toggle">
                      <input id="eq-auto-apply" type="checkbox" />
                      <div class="eq-toggle-track"><div class="eq-toggle-knob"></div></div>
                    </label>
                  </div>
                  
                  <div class="eq-cfg-row">
                    <div class="eq-cfg-label">
                      <span class="eq-cfg-label-title">${L.chevronRight} Auto Avan\xE7ar</span>
                      <span class="eq-cfg-label-desc">Clica em "Pr\xF3ximo" ou "Verificar" automaticamente ap\xF3s injetar.</span>
                    </div>
                    <label class="eq-toggle">
                      <input id="eq-auto-advance" type="checkbox" />
                      <div class="eq-toggle-track"><div class="eq-toggle-knob"></div></div>
                    </label>
                  </div>
                  
                  <div class="eq-cfg-row">
                    <div class="eq-cfg-label">
                      <span class="eq-cfg-label-title" style="color: var(--eq-warning);">${L.flask} Modo Dry-Run (Simula\xE7\xE3o)</span>
                      <span class="eq-cfg-label-desc">Analisa a quest\xE3o mas N\xC3O aplica a resposta no DOM.</span>
                    </div>
                    <label class="eq-toggle">
                      <input id="eq-dry-run" type="checkbox" />
                      <div class="eq-toggle-track"><div class="eq-toggle-knob"></div></div>
                    </label>
                  </div>
                  
                  <div class="eq-cfg-row">
                    <div class="eq-cfg-label">
                      <span class="eq-cfg-label-title">${L.moon} Dark Mode no Site Host</span>
                      <span class="eq-cfg-label-desc">For\xE7a inje\xE7\xE3o de CSS para escurecer o site hospedeiro (ex: Moodle).</span>
                    </div>
                    <label class="eq-toggle">
                      <input id="eq-host-dark" type="checkbox" />
                      <div class="eq-toggle-track"><div class="eq-toggle-knob"></div></div>
                    </label>
                  </div>
                  
                  <div class="eq-cfg-row">
                    <div class="eq-cfg-label">
                      <span class="eq-cfg-label-title">${L.bell} Notifica\xE7\xF5es Empilhadas</span>
                      <span class="eq-cfg-label-desc">Acumula hist\xF3rico de toasts (mensagens).</span>
                    </div>
                    <label class="eq-toggle">
                      <input id="eq-toast-stacking" type="checkbox" />
                      <div class="eq-toggle-track"><div class="eq-toggle-knob"></div></div>
                    </label>
                  </div>
                  
                  <div class="eq-cfg-row">
                    <div class="eq-cfg-label">
                      <span class="eq-cfg-label-title">${L.barChart} Exibir Uso de Tokens</span>
                      <span class="eq-cfg-label-desc">Mostra tokens consumidos da API no terminal.</span>
                    </div>
                    <label class="eq-toggle">
                      <input id="eq-show-tokens" type="checkbox" />
                      <div class="eq-toggle-track"><div class="eq-toggle-knob"></div></div>
                    </label>
                  </div>
                  
                  <div class="eq-cfg-row">
                    <div class="eq-cfg-label">
                      <span class="eq-cfg-label-title">${L.volume} Feedback Sonoro</span>
                      <span class="eq-cfg-label-desc">Emite um bip curto ao completar a an\xE1lise.</span>
                    </div>
                    <label class="eq-toggle">
                      <input id="eq-sound-feedback" type="checkbox" />
                      <div class="eq-toggle-track"><div class="eq-toggle-knob"></div></div>
                    </label>
                  </div>
                  
                  <div class="eq-cfg-row">
                    <div class="eq-cfg-label">
                      <span class="eq-cfg-label-title">${L.minimize} Modo Compacto</span>
                      <span class="eq-cfg-label-desc">Reduz paddings e tamanho de fontes do painel.</span>
                    </div>
                    <label class="eq-toggle">
                      <input id="eq-compact-mode" type="checkbox" />
                      <div class="eq-toggle-track"><div class="eq-toggle-knob"></div></div>
                    </label>
                  </div>
                </div>

                <!-- CATEGORIA: TOKENS -->
                <div class="eq-settings-cat-content" id="eq-cat-tokens" style="display: none; flex-direction: column; gap: 12px;">
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-size: 12px; font-weight: 600;">Chaves de API (Gemini)</span>
                    <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" style="color: var(--eq-accent); text-decoration: none; font-size: 10px; font-weight: 800; letter-spacing: 0.05em; text-transform: uppercase;">+ Obter Chave \u2197</a>
                  </div>
                  
                  <!-- Formul\xE1rio de Adi\xE7\xE3o de Nova Chave -->
                  <div class="eq-key-input-container">
                    <div class="eq-input-wrap">
                      <span class="eq-input-prefix-icon">${L.key}</span>
                      <input id="eq-api-key" class="eq-input" type="password" placeholder="AIzaSy..." autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" />
                      <button class="eq-icon-btn" id="eq-key-save" type="button" title="Adicionar Chave">${L.plus}</button>
                      <button class="eq-icon-btn" id="eq-key-more-btn" type="button" title="Mais Op\xE7\xF5es das Chaves">${L.moreVertical}</button>
                    </div>
                  </div>

                  <!-- Lista Din\xE2mica de Chaves Cadastradas -->
                  <div id="eq-keys-list" class="eq-keys-list"></div>
                </div>

                <!-- CATEGORIA: VISUAL -->
                <div class="eq-settings-cat-content" id="eq-cat-visual" style="display: none; flex-direction: column;">
                  <div class="eq-section-title" style="margin-bottom: 4px;">Tema do Painel</div>
                  <div class="eq-theme-cards-grid" id="eq-theme-grid">
                    <!-- Themes will be generated by JS -->
                  </div>
                  
                  <div class="eq-section-title" style="margin-top: 16px;">Op\xE7\xF5es Visuais</div>
                  
                  <div class="eq-cfg-row">
                    <div class="eq-cfg-label">
                      <span class="eq-cfg-label-title">Efeitos de Brilho (Glow)</span>
                      <span class="eq-cfg-label-desc">Sombra colorida nos bot\xF5es principais.</span>
                    </div>
                    <label class="eq-toggle">
                      <input id="eq-glow-effects" type="checkbox" />
                      <div class="eq-toggle-track"><div class="eq-toggle-knob"></div></div>
                    </label>
                  </div>
                </div>

                <!-- CATEGORIA: IA -->
                <div class="eq-settings-cat-content" id="eq-cat-ai" style="display: none; flex-direction: column; gap: 12px;">
                  <div class="eq-field-group">
                    <div class="eq-section-title">Modelo de Intelig\xEAncia Artificial</div>
                    <select id="eq-model-select" class="eq-select">
                      <option value="gemini-3.5-flash-lite">Gemini 3.5 Flash Lite</option>
                      <option value="gemini-3.5-flash">Gemini 3.5 Flash</option>
                      <option value="gemini-3.5-pro">Gemini 3.5 Pro</option>
                    </select>
                  </div>
                  
                  <div class="eq-field-group">
                    <div class="eq-section-title">Dica do Modo de Quest\xE3o</div>
                    <select id="eq-mode-select" class="eq-select"></select>
                  </div>
                  
                  <div class="eq-field-group">
                    <div class="eq-section-title">Dica de Idioma da Resposta</div>
                    <select id="eq-language-hint" class="eq-select">
                      <option value="auto">Auto-Detectar</option>
                      <option value="pt">Portugu\xEAs</option>
                      <option value="en">English</option>
                      <option value="es">Espa\xF1ol</option>
                      <option value="fr">Fran\xE7ais</option>
                    </select>
                  </div>
                  
                  <div class="eq-cfg-row" style="margin-top: 8px;">
                    <div class="eq-cfg-label">
                      <span class="eq-cfg-label-title">${L.image} Vis\xE3o Computacional</span>
                      <span class="eq-cfg-label-desc">Permite a IA capturar e analisar imagens e gr\xE1ficos da quest\xE3o na tela.</span>
                    </div>
                    <label class="eq-toggle">
                      <input id="eq-use-vision" type="checkbox" />
                      <div class="eq-toggle-track"><div class="eq-toggle-knob"></div></div>
                    </label>
                  </div>
                </div>

                <!-- CATEGORIA: SISTEMA -->
                <div class="eq-settings-cat-content" id="eq-cat-system" style="display: none; flex-direction: column; gap: 12px;">
                  <div class="eq-field-group">
                    <div class="eq-section-title">Motor de Execu\xE7\xE3o (DOM)</div>
                    <select id="eq-engine-select" class="eq-select"></select>
                  </div>
                  
                  <div class="eq-cfg-row">
                    <div class="eq-cfg-label">
                      <span class="eq-cfg-label-title">${L.list} Auto Scroll nos Logs</span>
                      <span class="eq-cfg-label-desc">Rola o terminal para o final automaticamente.</span>
                    </div>
                    <label class="eq-toggle">
                      <input id="eq-auto-scroll-logs" type="checkbox" />
                      <div class="eq-toggle-track"><div class="eq-toggle-knob"></div></div>
                    </label>
                  </div>
                  
                  <div class="eq-section-title" style="margin-top: 12px;">Dados Locais</div>
                  <div style="display: flex; gap: 8px;">
                    <button type="button" class="eq-btn-secondary" id="eq-export-config-btn" style="flex: 1;">${L.download} Exportar</button>
                    <button type="button" class="eq-btn-secondary" id="eq-import-config-btn" style="flex: 1;">${L.upload} Importar</button>
                  </div>
                  <input type="file" id="eq-import-file" accept=".json" style="display: none;" />
                  
                  <div class="eq-section-title" style="color: #ff5555; margin-top: 12px;">Zona de Risco</div>
                  <button class="eq-btn-secondary" id="eq-reset-all-btn" type="button" style="border-color: rgba(255,85,85,0.3); color: #ff8888; background: rgba(255,85,85,0.05);">
                    ${L.trash} Resetar Todos os Dados e Mem\xF3ria
                  </button>
                </div>
                
                <!-- CATEGORIA: SOBRE -->
                <div class="eq-settings-cat-content" id="eq-cat-about" style="display: none; flex-direction: column; gap: 16px; align-items: center; justify-content: center; padding-top: 20px;">
                  <div style="text-align: center;">
                    <div style="font-size: 24px; font-weight: 800; color: var(--eq-text-bright); letter-spacing: -0.5px;">EasyQuiz <span style="color: var(--eq-accent);">Legacy</span></div>
                    <div style="font-size: 11px; color: var(--eq-muted); margin-top: 2px;">Vers\xE3o: ${Pe}</div>
                  </div>
                  
                  <div style="display: flex; flex-direction: column; gap: 8px; width: 100%;">
                    <a href="https://github.com/minifoxie/EasyQuiz" target="_blank" class="eq-btn-secondary" style="text-decoration: none; display: flex; justify-content: center; border: 1px solid var(--eq-border);">${L.github} Reposit\xF3rio Oficial \u2197</a>
                  </div>
                  
                  <div style="font-size: 10px; color: var(--eq-muted); text-align: center; margin-top: 20px; opacity: 0.6;">
                    MIT License &copy; minifoxie<br/>
                    Constru\xEDdo com TypeScript & Web Components
                  </div>
                </div>

                <div class="eq-footer-note" style="margin-top: auto; padding-top: 16px; border-top: 1px solid var(--eq-border);">Configura\xE7\xF5es salvas localmente no navegador</div>
              </div>
            </div>
          </main>
        </aside>
    `),this.launcherBtn=this.shadow.querySelector(".eq-launcher"),this.launcherDot=this.shadow.querySelector("#eq-launcher-dot"),this.dockToggleBtn=this.shadow.querySelector("#eq-dock-toggle"),this.sidebarEl=this.shadow.querySelector(".eq-sidebar"),this.apToggleBtn=this.shadow.querySelector("#eq-ap-toggle-btn"),this.apConsole=this.shadow.querySelector("#eq-ap-console"),this.executionConsole=this.shadow.querySelector("#eq-execution-console"),this.progressContainer=this.shadow.querySelector("#eq-progress-container"),this.progressBar=this.shadow.querySelector("#eq-progress-bar"),this.progressLabel=this.shadow.querySelector("#eq-progress-label"),this.progressVal=this.shadow.querySelector("#eq-progress-val"),this.contextTreeContainer=this.shadow.querySelector("#eq-tree-container"),this.dotPulseAp=this.shadow.querySelector("#eq-dot-ap"),this.statusTextAp=this.shadow.querySelector("#eq-status-text-ap")||this.shadow.querySelector("#eq-status-summary")||this.dotPulseAp,this.stopwatchAp=this.shadow.querySelector("#eq-stopwatch-ap span"),this.dotPulseAdv=this.dotPulseAp,this.statusTextAdv=this.statusTextAp,this.stopwatchAdv=this.stopwatchAp,this.inspModel=this.shadow.querySelector("#eq-insp-model"),this.inspLatency=this.shadow.querySelector("#eq-insp-latency"),this.inspTokens=this.shadow.querySelector("#eq-insp-tokens"),this.inspPrompt=this.shadow.querySelector("#eq-insp-prompt"),this.inspRationale=this.shadow.querySelector("#eq-insp-rationale"),this.inspActions=this.shadow.querySelector("#eq-insp-actions"),this.copyPromptBtn=this.shadow.querySelector("#eq-copy-prompt-btn"),this.liveDebugTerminal=this.shadow.querySelector("#eq-live-debug-terminal"),this.dbgModel=this.shadow.querySelector("#eq-dbg-model"),this.dbgLatency=this.shadow.querySelector("#eq-dbg-latency"),this.dbgSplitTokens=this.shadow.querySelector("#eq-dbg-split-tokens"),this.dbgTotalTokens=this.shadow.querySelector("#eq-dbg-total-tokens"),this.dbgErrorCard=this.shadow.querySelector("#eq-dbg-error-card"),this.dbgErrorText=this.shadow.querySelector("#eq-dbg-error-text"),this.dbgPromptLen=this.shadow.querySelector("#eq-dbg-prompt-len"),this.dbgPromptView=this.shadow.querySelector("#eq-dbg-prompt-view"),this.dbgContextView=this.shadow.querySelector("#eq-dbg-context-view"),this.dbgRawRespView=this.shadow.querySelector("#eq-dbg-raw-resp-view"),this.dbgCountAll=this.shadow.querySelector("#eq-dbg-count-all"),this.dbgCountError=this.shadow.querySelector("#eq-dbg-count-error"),this.dbgCountAi=this.shadow.querySelector("#eq-dbg-count-ai"),this.dbgCountDom=this.shadow.querySelector("#eq-dbg-count-dom"),this.apiKeyInput=this.shadow.querySelector("#eq-api-key"),this.keyMoreBtn=this.shadow.querySelector("#eq-key-more-btn"),this.keysListEl=this.shadow.querySelector("#eq-keys-list"),this.keysBadgeEl=this.shadow.querySelector("#eq-keys-badge"),this.modelSelect=this.shadow.querySelector("#eq-model-select"),this.modeSelect=this.shadow.querySelector("#eq-mode-select"),this.engineSelect=this.shadow.querySelector("#eq-engine-select"),this.dryRunCheckbox=this.shadow.querySelector("#eq-dry-run"),this.autoApplyCheckbox=this.shadow.querySelector("#eq-auto-apply"),this.autoAdvanceCheckbox=this.shadow.querySelector("#eq-auto-advance"),this.hostDarkModeCheckbox=this.shadow.querySelector("#eq-host-dark"),this.useVisionCheckbox=this.shadow.querySelector("#eq-use-vision"),this.toastStackingCheckbox=this.shadow.querySelector("#eq-toast-stacking"),this.showTokensCheckbox=this.shadow.querySelector("#eq-show-tokens"),this.soundFeedbackCheckbox=this.shadow.querySelector("#eq-sound-feedback"),this.compactModeCheckbox=this.shadow.querySelector("#eq-compact-mode"),this.glowEffectsCheckbox=this.shadow.querySelector("#eq-glow-effects"),this.languageHintSelect=this.shadow.querySelector("#eq-language-hint"),this.autoScrollLogsCheckbox=this.shadow.querySelector("#eq-auto-scroll-logs"),this.analyzeBtn=this.shadow.querySelector("#eq-analyze-btn"),this.applyBtn=this.shadow.querySelector("#eq-apply-btn"),this.applyBtn&&(this.applyBtn.disabled=!0),this.resultContainer=this.shadow.querySelector("#eq-result"),this.floatingAnswers=new Lt(this.shadow,()=>{this.callbacks.onAnalyze(1)});let a=this.shadow.querySelector("#eq-open-hud-btn");a&&a.addEventListener("click",()=>{this.latestPlan&&this.floatingAnswers.show(this.latestPlan)}),Fe.filter(c=>ce(c.id)).forEach(c=>this.modelSelect.add(new Option(c.name,c.id,!1,c.id===e.model))),ja.forEach(c=>this.modeSelect.add(new Option(c.label,c.value,!1,c.value===e.modeHint))),Qa.forEach(c=>this.engineSelect.add(new Option(c.label,c.value,!1,c.value===e.engine))),this.apiKeyInput.value=e.apiKey,this.dryRunCheckbox.checked=e.dryRun,this.autoApplyCheckbox.checked=e.autoApply,this.autoAdvanceCheckbox.checked=e.autoAdvance,this.hostDarkModeCheckbox.checked=e.hostDarkMode,this.useVisionCheckbox.checked=e.useVision,this.toastStackingCheckbox.checked=e.toastStacking??!0,this.showTokensCheckbox&&(this.showTokensCheckbox.checked=e.showTokenUsage??!0),this.soundFeedbackCheckbox&&(this.soundFeedbackCheckbox.checked=e.enableSoundFeedback??!1),this.compactModeCheckbox&&(this.compactModeCheckbox.checked=e.compactMode??!1),this.glowEffectsCheckbox&&(this.glowEffectsCheckbox.checked=e.glowEffects??!1),this.languageHintSelect&&(this.languageHintSelect.value=e.languageHint??"auto"),this.autoScrollLogsCheckbox&&(this.autoScrollLogsCheckbox.checked=e.autoScrollLogs??!0),this.metricsLiveTime=this.shadow.querySelector("#eq-metrics-live-time"),this.metricsLiveStatus=this.shadow.querySelector("#eq-metrics-live-status"),this.metricsTotalBadge=this.shadow.querySelector("#eq-metrics-total-badge"),this.metricTotalTime=this.shadow.querySelector("#eq-metric-total-time"),this.metricAvgTime=this.shadow.querySelector("#eq-metric-avg-time"),this.metricTotalCount=this.shadow.querySelector("#eq-metric-total-count"),this.metricsHistoryList=this.shadow.querySelector("#eq-metrics-history-list"),this.metricsHistoryCount=this.shadow.querySelector("#eq-metrics-history-count"),this.metricsCopyBtn=this.shadow.querySelector("#eq-metrics-copy-btn"),this.metricsResetBtn=this.shadow.querySelector("#eq-metrics-reset-btn"),this.setupEventListeners(),this.updateTimingMetrics(),this.mountHost(),this.applyHostDarkMode(e.hostDarkMode);let s=(()=>{try{return localStorage.getItem("easyquiz_theme")||""}catch{return""}})()||e.theme||"mega-black";this.shadow.host.setAttribute("data-eq-theme",s),this.shadow.host.setAttribute("data-eq-glow",String(e.glowEffects??!1));let r=Array.isArray(e.apiKeys)&&e.apiKeys.length>0?e.apiKeys:e.apiKey?[e.apiKey]:[];V.init(r),this.apiKeyInput.value=V.getBestKey()||e.apiKey||"",this.renderKeysList();let n=window.setInterval(()=>{this.activeTab==="settings"&&this.renderKeysList()},1e3);typeof n?.unref=="function"&&n.unref();let d=V.getBestKey()||e.apiKey;d&&pt(d).then(c=>{c&&c.length>0&&this.updateModelSelect(c,e.model)}).catch(()=>{})}switchTab(e){this.activeTab=e;let t=["resolver","brain","media","metrics","debug","settings"];this.shadow.querySelector(".eq-views-wrapper")?.classList.toggle("is-brain-active",e==="brain");for(let i of t){let s=this.shadow.querySelector(`#eq-tab-${i}`),r=this.shadow.querySelector(`#eq-view-${i}`),n=i===e;s?.classList.toggle("active",n),r&&(r.style.display=n?"flex":"none")}switch(this.updateContextBar(e),e){case"brain":this.initBrainControls(),this.renderContextTree(),this.refreshInspectorView();break;case"metrics":try{this.updateTimingMetrics()}catch{}break;case"debug":this.terminalMode="terminal";try{this.refreshDebugView(),this.renderTerminalEntries(),this.initTerminalREPL(),this.initTerminalWallpaper()}catch{}break;case"settings":try{this.renderThemeGrid()}catch{}break}}updateContextBar(e){let t=this.shadow.querySelector("#eq-ctxbar-icon"),a=this.shadow.querySelector("#eq-ctxbar-name"),i=this.shadow.querySelector("#eq-ctxbar-sub"),s=this.shadow.querySelector("#eq-ctxbar-actions");if(!t||!a||!i||!s)return;s.innerHTML="";let n={resolver:{icon:L.sparkles,label:"Resolver",sub:"Autopilot & opera\xE7\xF5es",color:"#a78bfa",actions:()=>{let d=document.createElement("span");return d.id="eq-ctxbar-status",d.style.cssText="font-size:9px;font-weight:700;padding:2px 7px;border-radius:10px;background:rgba(167,139,250,0.13);border:1px solid rgba(167,139,250,0.25);color:#a78bfa;letter-spacing:0.04em;",d.textContent="PRONTO",[d]}},brain:{icon:L.inspector,label:"C\xE9rebro da IA",sub:"Contexto & inspe\xE7\xE3o",color:"#60a5fa",actions:()=>{let d=this.shadow.querySelector("#eq-brain-canvas-toggle"),c=document.createElement("button");c.style.cssText="display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);border-radius:4px;cursor:pointer;color:#888;",c.innerHTML=this.brainCanvasHidden?L.eyeOff:L.eye,c.title="Mostrar/Ocultar canvas",c.addEventListener("click",()=>{d?.click(),c.innerHTML=this.brainCanvasHidden?L.eyeOff:L.eye});let u=document.createElement("button");return u.style.cssText="display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);border-radius:4px;cursor:pointer;color:#888;",u.innerHTML=L.copy,u.title="Copiar conte\xFAdo selecionado",u.addEventListener("click",()=>this.smartCopy()),[c,u]}},metrics:{icon:L.clock,label:"M\xE9tricas",sub:"Cron\xF4metro & hist\xF3rico",color:"#4ade80",actions:()=>{let d=document.createElement("button");d.style.cssText="display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);border-radius:4px;cursor:pointer;color:#888;",d.innerHTML=L.copy,d.title="Copiar relat\xF3rio",d.addEventListener("click",()=>this.copyMetricsReport());let c=document.createElement("button");return c.style.cssText="display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;background:rgba(255,85,85,0.07);border:1px solid rgba(255,85,85,0.13);border-radius:4px;cursor:pointer;color:#ff5555;",c.innerHTML=L.trash,c.title="Zerar m\xE9tricas",c.addEventListener("click",()=>{this.shadow.querySelector("#eq-metrics-reset-btn")?.click()}),[d,c]}},debug:{icon:L.code,label:"Terminal",sub:"Comandos & logs",color:"#0098ff",actions:()=>{let d=document.createElement("div");d.style.cssText="display:inline-flex;align-items:center;gap:1px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:4px;padding:2px;";let c=(l,p,h)=>{let f=document.createElement("button");return f.id=l,f.type="button",f.textContent=p,f.style.cssText="font-size:9px;font-weight:600;padding:2px 8px;border-radius:3px;cursor:pointer;transition:all 0.1s;background:"+(h?"#1a1a1a":"transparent")+";border:1px solid "+(h?"#333":"transparent")+";color:"+(h?"var(--eq-text-bright)":"#555")+";",f};d.appendChild(c("eq-term-mode-terminal","Terminal",!0)),d.appendChild(c("eq-term-mode-output","Output",!1));let u=document.createElement("button");u.id="eq-term-copy-btn",u.type="button",u.title="Copiar",u.style.cssText="display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:4px;cursor:pointer;color:#888;",u.innerHTML=L.copy;let m=document.createElement("button");return m.id="eq-term-clear-btn",m.type="button",m.title="Limpar",m.style.cssText="display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;background:rgba(255,85,85,0.07);border:1px solid rgba(255,85,85,0.13);border-radius:4px;cursor:pointer;color:#ff5555;",m.innerHTML=L.trash,[d,u,m]}},settings:{icon:L.settings,label:"Configura\xE7\xF5es",sub:"Ajustes & prefer\xEAncias",color:"#fbbf24"}}[e];if(n&&(t.innerHTML=n.icon,t.style.color=n.color,a.textContent=n.label,a.style.color=n.color==="#a78bfa"?"var(--eq-text)":"var(--eq-text-bright)",i.textContent=n.sub,n.actions))for(let d of n.actions())s.appendChild(d)}setupSettingsTabs(){let e=this.shadow.querySelectorAll(".eq-settings-cat-btn"),t=this.shadow.querySelectorAll(".eq-settings-cat-content");e.forEach(a=>{a.addEventListener("click",i=>{let s=i.currentTarget,r=s.dataset.cat;if(!r)return;e.forEach(d=>d.classList.remove("active")),t.forEach(d=>d.style.display="none"),s.classList.add("active");let n=this.shadow.querySelector(`#eq-cat-${r}`);n&&(n.style.display="flex")})}),this.renderThemeGrid()}renderThemeGrid(){let e=this.shadow.querySelector("#eq-theme-grid");if(!e)return;let t=[{id:"mega-black",name:"Mega Black",color:"#000000",border:"rgba(255,255,255,0.14)"},{id:"dark",name:"Dark",color:"#1c1c22",border:"rgba(255,255,255,0.1)"},{id:"purple-neon",name:"Purple Neon",color:"#120824",border:"rgba(160,80,255,0.3)"},{id:"gray-blue",name:"Gray Blue",color:"#282b30",border:"rgba(88,101,242,0.22)"},{id:"light",name:"Light",color:"var(--eq-text-bright)",border:"rgba(0,0,0,0.1)"}],a=localStorage.getItem("easyquiz_theme")||"mega-black";this.shadow.host.setAttribute("data-eq-theme",a),e.innerHTML=t.map(i=>`
      <div class="eq-theme-card ${i.id===a?"active":""}" data-theme-id="${i.id}">
        <div class="eq-theme-card-preview" style="background:${i.color};border-color:${i.border}">
          <div class="eq-theme-card-preview-bar" style="border-right:1px solid ${i.border}"></div>
          <div class="eq-theme-card-preview-main">
            <div class="eq-theme-card-preview-line" style="width:80%;"></div>
            <div class="eq-theme-card-preview-line" style="width:40%;"></div>
          </div>
        </div>
        <div class="eq-theme-card-label">${i.name}</div>
      </div>
    `).join(""),e.querySelectorAll(".eq-theme-card").forEach(i=>{i.addEventListener("click",s=>{let r=s.currentTarget,n=r.dataset.themeId;n&&(localStorage.setItem("easyquiz_theme",n),this.shadow.host.setAttribute("data-eq-theme",n),e.querySelectorAll(".eq-theme-card").forEach(d=>d.classList.remove("active")),r.classList.add("active"),this.setStatus(`Tema atualizado para ${n}`,"info"))})})}setupEventListeners(){this.shadow.querySelector("#eq-tab-resolver")?.addEventListener("click",()=>this.switchTab("resolver")),setTimeout(()=>this.updateContextBar(this.activeTab||"resolver"),0),this.shadow.querySelector("#eq-tab-brain")?.addEventListener("click",()=>this.switchTab("brain")),this.shadow.querySelector("#eq-tab-metrics")?.addEventListener("click",()=>this.switchTab("metrics")),this.shadow.querySelector("#eq-tab-debug")?.addEventListener("click",()=>this.switchTab("debug")),this.shadow.querySelector("#eq-tab-settings")?.addEventListener("click",()=>this.switchTab("settings")),this.setupSettingsTabs();let e=this.shadow.querySelector("#eq-status-card");e?.addEventListener("click",()=>{let q=e.classList.toggle("is-collapsed");e.setAttribute("aria-expanded",String(!q))}),this.metricsResetBtn?.addEventListener("click",()=>{$e(),this.stopQuestionTimer(0),this.currentQuestionStartTime=0,this.metricsLiveTime&&(this.metricsLiveTime.textContent="00:00.00"),this.metricsLiveStatus&&(this.metricsLiveStatus.textContent="Em espera",this.metricsLiveStatus.classList.remove("active")),this.updateTimingMetrics(),this.logToConsole("> [SYS] M\xE9tricas e hist\xF3rico de tempo zerados com sucesso.","text-yellow")}),this.metricsCopyBtn?.addEventListener("click",()=>{this.copyMetricsReport()}),this.shadow.querySelector("#eq-dbg-filter-all")?.addEventListener("click",()=>this.setLogFilter("all")),this.shadow.querySelector("#eq-dbg-filter-error")?.addEventListener("click",()=>this.setLogFilter("error")),this.shadow.querySelector("#eq-dbg-filter-ai")?.addEventListener("click",()=>this.setLogFilter("ai")),this.shadow.querySelector("#eq-dbg-filter-dom")?.addEventListener("click",()=>this.setLogFilter("dom"));let t=this.shadow.querySelector("#eq-dbg-copy-logs");t?.addEventListener("click",()=>{let q=this.getFormattedLogs();navigator.clipboard.writeText(q).then(()=>{let k=t.innerHTML;t.innerHTML=L.check,setTimeout(()=>t.innerHTML=k,1800)})}),this.shadow.querySelector("#eq-dbg-clear-logs")?.addEventListener("click",()=>{this.clearLogs()});let a=this.shadow.querySelector("#eq-dbg-copy-prompt");a?.addEventListener("click",()=>{let q=this.latestPromptText||this.latestPlan?.promptSent||"";navigator.clipboard.writeText(q).then(()=>{let k=a.innerHTML;a.innerHTML=`${L.check} Copiado!`,setTimeout(()=>a.innerHTML=k,1800)})});let i=this.shadow.querySelector("#eq-dbg-copy-context");i?.addEventListener("click",()=>{let q=this.dbgContextView?.textContent||"";navigator.clipboard.writeText(q).then(()=>{let k=i.innerHTML;i.innerHTML=`${L.check} Copiado!`,setTimeout(()=>i.innerHTML=k,1800)})});let s=this.shadow.querySelector("#eq-dbg-copy-raw-resp");s?.addEventListener("click",()=>{let q=this.latestPlan?.rawResponse||this.dbgRawRespView?.textContent||"";navigator.clipboard.writeText(q).then(()=>{let k=s.innerHTML;s.innerHTML=`${L.check} Copiado!`,setTimeout(()=>s.innerHTML=k,1800)})});let r=this.shadow.querySelector("#eq-dbg-copy-error-btn");r?.addEventListener("click",()=>{let q=this.lastErrorMsg||"";navigator.clipboard.writeText(q).then(()=>{let k=r.innerHTML;r.innerHTML=L.check,setTimeout(()=>r.innerHTML=k,1800)})}),this.shadow.querySelector("#eq-refresh-context-btn")?.addEventListener("click",()=>{this.renderContextTree()}),this.launcherBtn.addEventListener("click",()=>this.toggle()),this.dockToggleBtn.addEventListener("click",()=>this.toggle()),window.addEventListener("keydown",q=>{q.altKey&&(q.key==="q"||q.key==="Q"||q.key==="a"||q.key==="A")&&(q.preventDefault(),this.toggle())},!0);let n=q=>{let k=q.composedPath();k.includes(this.shadow)||(k.includes(this.sidebarEl)||k.includes(this.host))&&q.stopImmediatePropagation()};window.addEventListener("keydown",n,!0),window.addEventListener("keyup",n,!0),window.addEventListener("keypress",n,!0);let d=q=>q.stopPropagation();this.shadow.addEventListener("keydown",d),this.shadow.addEventListener("keyup",d),this.shadow.addEventListener("keypress",d),this.shadow.addEventListener("paste",d),this.shadow.addEventListener("copy",d),this.shadow.addEventListener("cut",d),this.apiKeyInput.addEventListener("input",()=>{let q=this.apiKeyInput.value.trim().replace(/^["']|["']$/g,"");this.callbacks.onSettingsChange({apiKey:q})});let c=this.shadow.querySelector("#eq-keys-collapsible"),u=this.shadow.querySelector("#eq-keys-chevron"),m=this.shadow.querySelector("#eq-keys-section-header"),l=q=>{c&&(q?(c.style.display="none",u&&(u.style.transform="rotate(0deg)")):(c.style.display="block",c.style.maxHeight="none",c.style.overflow="visible",u&&(u.style.transform="rotate(90deg)")))},p=!1;try{p=localStorage.getItem("easyquiz_keys_collapsed")==="true"}catch{}l(p),m?.addEventListener("click",q=>{if(q.target?.closest("a"))return;let k=c?.style.display==="none";l(!k);try{localStorage.setItem("easyquiz_keys_collapsed",k?"false":"true")}catch{}});let h=this.shadow.querySelector("#eq-auto-menu-btn"),f=this.shadow.querySelector("#eq-auto-menu");f&&(f.hidden=!0),h?.classList.remove("is-open"),h?.addEventListener("click",q=>{if(q.stopPropagation(),!!f){if(this._ctxPopup){this.closeCtxPopup(),h.classList.remove("is-open");return}h.classList.add("is-open"),this.showCtxPopup(h,[{ic:"sparkles",label:"Resolver Autopilot",onClick:()=>{h.classList.remove("is-open"),f.querySelector('[data-auto-action="toggle"]')?.click()}},{ic:"eraser",label:"Limpar mem\xF3ria",onClick:()=>{h.classList.remove("is-open"),f.querySelector('[data-auto-action="memory"]')?.click()}},{ic:"info",label:"Mostrar status",onClick:()=>{h.classList.remove("is-open"),f.querySelector('[data-auto-action="status"]')?.click()}}])}}),f?.querySelectorAll("[data-auto-action]").forEach(q=>{q.addEventListener("click",k=>{k.stopPropagation();let M=q.dataset.autoAction;M==="toggle"?this.analyzeBtn?.click():M==="memory"?(dt(),this.logToConsole("> [SYS] Mem\xF3ria contextual limpa com sucesso.","text-green"),this.setStatus("Mem\xF3ria contextual da sess\xE3o limpa.","success")):M==="status"&&this.shadow.querySelector("#eq-status-card")?.scrollIntoView({behavior:"smooth",block:"nearest"}),f&&(f.hidden=!0),h?.classList.remove("is-open")})}),this.shadow.addEventListener("click",q=>{q.target.closest(".eq-menu-shell")||(f&&(f.hidden=!0),h?.classList.remove("is-open"))});let g=this.shadow.querySelector("#eq-result-toggle"),b=this.shadow.querySelector("#eq-result-body");g&&b&&(b.classList.add("is-collapsed"),g.classList.remove("is-open"),g.addEventListener("click",()=>{let q=g.classList.toggle("is-open");b.classList.toggle("is-collapsed",!q)})),this.shadow.querySelector("#eq-key-save")?.addEventListener("click",()=>{let q=this.apiKeyInput.value.trim().replace(/^["']|["']$/g,"");if(!q){this.setStatus("Insira o valor da chave antes de adicionar.","warning");return}let k=V.addKey(q);if(k.ok){let M=V.exportRawKeys();this.callbacks.onSettingsChange({apiKey:M[0],apiKeys:M}),this.apiKeyInput.value="",this.setStatus(` Nova chave adicionada com sucesso! (${M.length} chaves ativas no pool)`,"success"),l(!1);try{localStorage.setItem("easyquiz_keys_collapsed","false")}catch{}this.renderKeysList(),ht(q).then(B=>{B.ok?(V.markSuccess(q,100),this.setStatus(" Nova chave validada com sucesso no Google AI Studio!","success")):(V.markInvalid(q,B.message),this.setStatus(`\uFE0F Chave cadastrada, mas aviso retornado: ${B.message}`,"warning")),this.renderKeysList()}).catch(()=>{})}else this.setStatus(k.message,"warning")}),this.shadow.addEventListener("click",q=>{let k=q.target;!k.closest("#eq-key-context-menu")&&k.closest("#eq-key-more-btn")});let x=()=>{let q=window.prompt("Adicionar Nova Chave API do Google Gemini (AI Studio):");if(q!==null&&q.trim()){let k=q.trim().replace(/^["']|["']$/g,""),M=V.addKey(k);if(M.ok){let B=V.exportRawKeys();this.callbacks.onSettingsChange({apiKey:B[0],apiKeys:B}),this.setStatus("Chave Gemini adicionada com sucesso!","success"),this.renderKeysList()}else this.setStatus(M.message,"warning")}},w=async()=>{try{let q=await navigator.clipboard.readText();if(q){let k=q.trim().replace(/^["']|["']$/g,"");this.apiKeyInput.value=k,this.setStatus('Chave colada no campo. Clique no bot\xE3o "+" para adicionar ao pool.',"info")}}catch{let q=window.prompt("Adicionar Nova Chave API do Google Gemini:");if(q!==null&&q.trim()){let k=q.trim().replace(/^["']|["']$/g,"");if(V.addKey(k).ok){let B=V.exportRawKeys();this.callbacks.onSettingsChange({apiKey:B[0],apiKeys:B}),this.setStatus("Chave Gemini adicionada com sucesso!","success"),this.renderKeysList()}}}},y=()=>{let q=this.apiKeyInput.type==="password";this.apiKeyInput.type=q?"text":"password";let k=this.shadow.querySelector("#eq-menu-vis-icon"),M=this.shadow.querySelector("#eq-menu-vis-text");k&&(k.innerHTML=q?L.eyeOff:L.eye),M&&(M.textContent=q?"Ocultar Campo":"Mostrar Campo")},E=()=>{this.apiKeyInput.value="",this.setStatus("Campo de inser\xE7\xE3o limpo.","info"),this.apiKeyInput.focus()},T=()=>{this.shadow.querySelector("#eq-bulk-overlay")?.remove();let q=document.createElement("div");q.id="eq-bulk-overlay",q.style.cssText=["position:fixed","inset:0","z-index:2147483647","pointer-events:auto","background:rgba(0,0,0,0.78)","backdrop-filter:blur(4px)","-webkit-backdrop-filter:blur(4px)","display:flex","align-items:center","justify-content:center",'font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif',"user-select:text","-webkit-user-select:text"].join(";");let k=document.createElement("div");k.style.cssText=["background:#11151c","color:#e2e8f0","border:1px solid #283548","border-radius:12px","padding:20px","width:440px","max-width:92vw","font-size:13px","box-shadow:0 12px 40px rgba(0,0,0,0.85), 0 0 0 1px rgba(0,229,255,0.15)","display:flex","flex-direction:column","gap:10px","pointer-events:auto"].join(";"),k.innerHTML=`
        <div style="display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #1f2937;padding-bottom:10px;">
          <div style="display:flex;align-items:center;gap:8px;">
            <span style="font-size:16px;"></span>
            <h3 style="margin:0;font-size:14px;color:#00e5ff;font-weight:700;letter-spacing:0.02em;">Importar Chaves em Lote</h3>
          </div>
          <button id="eq-bulk-x" style="background:none;border:none;color:#94a3b8;font-size:20px;cursor:pointer;padding:0 4px;line-height:1;border-radius:4px;pointer-events:auto;" title="Fechar (Esc)"></button>
        </div>
        <p style="margin:0;font-size:11px;color:#94a3b8;line-height:1.4;">
          Cole suas chaves Gemini abaixo (uma por linha ou qualquer texto contendo chaves). O EasyQuiz extrai, adiciona e valida tudo automaticamente.
        </p>
        <div style="display:flex;gap:8px;">
          <button id="eq-bulk-paste-btn" type="button" style="background:#1e293b;color:#38bdf8;border:1px solid #0284c7;border-radius:6px;padding:5px 12px;font-size:11px;font-weight:600;cursor:pointer;display:inline-flex;align-items:center;gap:5px;pointer-events:auto;">
             Colar do Clipboard
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
          <button id="eq-bulk-import" type="button" style="background:#00e5ff;color:#031326;border:none;border-radius:6px;padding:7px 18px;cursor:pointer;font-size:12px;font-weight:700;box-shadow:0 0 12px rgba(0,229,255,0.25);pointer-events:auto;"> Importar e Validar</button>
        </div>
      `,q.appendChild(k),this.shadow.appendChild(q);let M=k.querySelector("#eq-bulk-ta"),B=k.querySelector("#eq-bulk-status"),X=k.querySelector("#eq-bulk-import"),W=k.querySelector("#eq-bulk-paste-btn"),J=k.querySelector("#eq-bulk-clear-btn");requestAnimationFrame(()=>M?.focus());let Z=()=>{q.remove()};["keydown","keyup","keypress","paste","copy","cut"].forEach(G=>{q.addEventListener(G,oe=>{oe.stopPropagation()})}),q.addEventListener("keydown",G=>{G.key==="Escape"&&Z()}),q.addEventListener("click",G=>{G.target===q&&Z()}),k.querySelector("#eq-bulk-x")?.addEventListener("click",Z),k.querySelector("#eq-bulk-cancel")?.addEventListener("click",Z),J.addEventListener("click",()=>{M.value="",B.textContent="",M.focus()}),W.addEventListener("click",async()=>{try{let G=await navigator.clipboard?.readText();G?(M.value=G,M.focus(),B.style.color="#38bdf8",B.textContent="Conte\xFAdo colado da \xE1rea de transfer\xEAncia com sucesso!"):(B.style.color="#fbbf24",B.textContent="\xC1rea de transfer\xEAncia vazia ou sem permiss\xE3o de leitura.")}catch{B.style.color="#fbbf24",B.textContent="Permiss\xE3o de clipboard negada pelo navegador. Use Ctrl+V diretamente na caixa.",M.focus()}}),k.querySelector("#eq-bulk-import")?.addEventListener("click",async()=>{let G=M.value.trim();if(!G){B.style.color="#f87171",B.textContent="Insira pelo menos uma chave de API antes de importar.";return}let oe=G.match(/AIza[0-9A-Za-z\-_]{35}|AQ\.[0-9A-Za-z\-_]{20,}/g),fe=[];if(oe&&oe.length>0?fe=Array.from(new Set(oe)):fe=Array.from(new Set(G.split(/[\n,;\s]+/).map(ve=>ve.trim().replace(/^["'`]|["'`]$/g,"")).filter(ve=>ve.length>=20))),fe.length===0){B.style.color="#f87171",B.textContent="Nenhuma chave v\xE1lida encontrada (m\xEDnimo 20 caracteres).";return}B.style.color="#00e5ff",B.textContent=`Processando ${fe.length} chave(s)...`,X.disabled=!0,X.style.opacity="0.6";let be=0,ze=0;for(let ve of fe){let Qe=V.addKey(ve);Qe.ok?be++:Qe.message.includes("j\xE1 est\xE1 cadastrada")&&ze++}if(be>0){let ve=V.exportRawKeys();this.callbacks.onSettingsChange({apiKey:ve[0],apiKeys:ve}),l(!1);try{localStorage.setItem("easyquiz_keys_collapsed","false")}catch{}}B.textContent=`${be} adicionada(s), ${ze} duplicada(s). Validando modelo em paralelo...`;let Ee=V.exportRawKeys(),It=this.modelSelect?.value||"gemini-3.5-flash-lite",je=await Ft(It,Ee);je.ok?(V.markSuccess(je.key,200),B.style.color="#4ade80",B.textContent=` ${be} adicionada(s), ${ze} duplicada(s). Modelo '${je.model}' pronto!`):(B.style.color="#fbbf24",B.textContent=`${be} adicionada(s), ${ze} duplicada(s). Aviso: ${je.message}`),this.renderKeysList(),X.disabled=!1,X.style.opacity="1",be>0&&(this.setStatus(` Lote importado: ${be} chave(s) adicionada(s) ao pool!`,"success"),setTimeout(Z,2200))})},C=()=>{this.shadow.querySelector("#eq-text-editor-overlay")?.remove();let q=V.exportRawKeys(),k=document.createElement("div");k.id="eq-text-editor-overlay",k.style.cssText=["position:fixed","inset:0","z-index:2147483647","pointer-events:auto","background:rgba(0,0,0,0.82)","backdrop-filter:blur(4px)","-webkit-backdrop-filter:blur(4px)","display:flex","align-items:center","justify-content:center",'font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif'].join(";");let M=document.createElement("div");M.style.cssText=["background:#11151c","color:#e2e8f0","border:1px solid #283548","border-radius:12px","padding:20px","width:460px","max-width:94vw","font-size:13px","box-shadow:0 12px 40px rgba(0,0,0,0.85),0 0 0 1px rgba(0,229,255,0.15)","display:flex","flex-direction:column","gap:10px","pointer-events:auto"].join(";"),M.innerHTML=`
        <div style="display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #1f2937;padding-bottom:10px;">
          <div style="display:flex;align-items:center;gap:8px;">
            <span style="font-size:16px;">\uFE0F</span>
            <h3 style="margin:0;font-size:14px;color:#00e5ff;font-weight:700;">Ver / Editar Chaves como Texto</h3>
          </div>
          <button id="eq-edittext-x" style="background:none;border:none;color:#94a3b8;font-size:20px;cursor:pointer;padding:0 4px;line-height:1;border-radius:4px;" title="Fechar (Esc)"></button>
        </div>
        <p style="margin:0;font-size:11px;color:#94a3b8;line-height:1.5;">
          Cada linha = uma chave. Edite, apague linhas ou cole novas. Clique <b style="color:#e2e8f0;">Salvar</b> para substituir todas as chaves atuais pelas do texto.
        </p>
        <textarea id="eq-edittext-ta"
          style="width:100%;height:180px;background:#0b0f17;color:#4ade80;border:1px solid #334155;border-radius:8px;padding:10px;font-family:'JetBrains Mono',Consolas,monospace;font-size:11.5px;box-sizing:border-box;resize:vertical;outline:none;line-height:1.6;pointer-events:auto;user-select:text;-webkit-user-select:text;letter-spacing:0.02em;"
          placeholder="Cole ou edite suas chaves aqui (uma por linha)"></textarea>
        <div id="eq-edittext-status" style="min-height:16px;font-size:11px;color:#94a3b8;"></div>
        <div style="display:flex;gap:8px;justify-content:space-between;margin-top:2px;align-items:center;">
          <button id="eq-edittext-clear" type="button" style="background:#1e293b;color:#f87171;border:1px solid #7f1d1d;border-radius:6px;padding:6px 14px;cursor:pointer;font-size:11px;font-weight:600;"> Apagar Tudo</button>
          <div style="display:flex;gap:8px;">
            <button id="eq-edittext-cancel" type="button" style="background:#1e293b;color:#cbd5e1;border:1px solid #334155;border-radius:6px;padding:7px 16px;cursor:pointer;font-size:12px;font-weight:600;">Cancelar</button>
            <button id="eq-edittext-save" type="button" style="background:#00e5ff;color:#031326;border:none;border-radius:6px;padding:7px 18px;cursor:pointer;font-size:12px;font-weight:700;box-shadow:0 0 12px rgba(0,229,255,0.25);"> Salvar</button>
          </div>
        </div>
      `,k.appendChild(M),this.shadow.appendChild(k);let B=M.querySelector("#eq-edittext-ta"),X=M.querySelector("#eq-edittext-status");B.value=q.join(`
`),requestAnimationFrame(()=>{B.focus(),B.select()});let W=()=>k.remove();["keydown","keyup","keypress","paste","copy","cut"].forEach(J=>{k.addEventListener(J,Z=>{Z.stopPropagation(),Z.stopImmediatePropagation()},!0)}),k.addEventListener("keydown",J=>{J.key==="Escape"&&W()}),k.addEventListener("click",J=>{J.target===k&&W()}),M.querySelector("#eq-edittext-x")?.addEventListener("click",W),M.querySelector("#eq-edittext-cancel")?.addEventListener("click",W),M.querySelector("#eq-edittext-clear")?.addEventListener("click",()=>{confirm("Apagar todas as chaves? Esta a\xE7\xE3o \xE9 irrevers\xEDvel.")&&(B.value="",X.style.color="#fbbf24",X.textContent="Campo limpo. Clique em Salvar para confirmar a remo\xE7\xE3o de todas as chaves.")}),M.querySelector("#eq-edittext-save")?.addEventListener("click",()=>{let J=B.value.split(/[\n\r]+/).map(oe=>oe.trim().replace(/^["']|["']$/g,"")).filter(oe=>oe.length>5),Z=Array.from(new Set(J));V.init(Z);let G=V.exportRawKeys();this.callbacks.onSettingsChange({apiKey:G[0]||"",apiKeys:G}),this.renderKeysList(),X.style.color="#4ade80",Z.length===0?X.textContent=" Todas as chaves removidas.":X.textContent=` ${Z.length} chave(s) salva(s) com sucesso!`,this.setStatus(Z.length>0?` ${Z.length} chave(s) salva(s)!`:"Todas as chaves foram removidas.",Z.length>0?"success":"info"),setTimeout(W,1400)})},I=()=>{let q=V.getAllKeys();if(q.length===0)return this.setStatus("Nenhuma chave para apagar.","info");confirm(`Apagar todas as ${q.length} chave(s) permanentemente?`)&&(V.init([]),this.callbacks.onSettingsChange({apiKey:"",apiKeys:[]}),this.renderKeysList(),this.setStatus("Todas as chaves foram removidas.","info"))},A=async()=>{let q=V.getAllKeys();if(q.length===0)return this.setStatus("Nenhuma chave cadastrada para testar.","error");this.setStatus(` Testando ${q.length} chave(s) em paralelo...`,"info");let k=this.modelSelect?.value||"gemini-3.5-flash-lite",M=q.map(X=>X.key),B=await Ft(k,M);if(B.ok)V.markSuccess(B.key,150),this.setStatus(` Validado! Modelo '${B.model}' respondeu com sucesso!`,"success");else{let X=await Promise.allSettled(M.map(J=>ht(J))),W=0;X.forEach((J,Z)=>{if(J.status==="fulfilled"&&J.value.ok)W++,V.markSuccess(M[Z],200);else{let G=J.status==="fulfilled"?J.value.message:String(J.reason);V.markInvalid(M[Z],G)}}),this.setStatus(`Teste: ${W}/${q.length} chave(s) v\xE1lidas. ${B.message}`,W>0?"info":"error")}this.renderKeysList()},S=()=>{window.confirm("Deseja realmente resetar todos os dados, chaves e mem\xF3ria de sess\xE3o do EasyQuiz?")&&(this.autopilot.isActive()&&this.autopilot.stop(),this.updateAutopilotUi(!1),this.setBusy(!1),io(),$e(),this.stopQuestionTimer(0),this.currentQuestionStartTime=0,this.metricsLiveTime&&(this.metricsLiveTime.textContent="00:00.00"),this.metricsLiveStatus&&(this.metricsLiveStatus.textContent="Em espera",this.metricsLiveStatus.className="eq-live-stopwatch-status"),this.updateTimingMetrics(),this.apiKeyInput.value="",this.callbacks.onSettingsChange({apiKey:""}),this.setStatus("Todos os dados do EasyQuiz foram limpos.","info"),this.logToConsole("> [SYS] Armazenamento local resetado.","text-yellow"))};this.shadow.querySelector("#eq-reset-all-btn")?.addEventListener("click",S),this.keyMoreBtn.addEventListener("click",q=>{if(q.stopPropagation(),this._ctxPopup){this.closeCtxPopup();return}this.showCtxPopup(this.keyMoreBtn,[{ic:"edit",label:"Inserir via Janela Nativa",badge:"Bypass",onClick:()=>x()},{ic:"paste",label:"Colar da \xC1rea de Transfer\xEAncia",onClick:()=>w()},{ic:"eye",label:"Mostrar/Ocultar Campo",onClick:()=>y()},{ic:"eraser",label:"Limpar Campo",onClick:()=>E()},{ic:"upload",label:"Importar Chaves em Lote",onClick:()=>T()},{ic:"code",label:"Ver/Editar Chaves como Texto",onClick:()=>C()},{ic:"zap",label:"Testar Todas as Chaves",onClick:()=>A()},{divider:!0,label:"",onClick:()=>{}},{ic:"trash",label:"Apagar Todas as Chaves",danger:!0,onClick:()=>I()},{ic:"refreshCw",label:"Resetar Todos os Dados",danger:!0,onClick:()=>S()}])}),this.apToggleBtn?.addEventListener("click",()=>{if(this.autopilot.isActive())this.autopilot.stop(),this.callbacks.onCancel?.(),this.setProgress(0),this.updateAutopilotUi(!1),this.setInterrupted("Autopilot interrompido imediatamente pelo usu\xE1rio.");else{if(!this.apiKeyInput.value.trim().replace(/^["']|["']$/g,"")){this.setStatus("Configure sua chave de API Gemini na aba Configura\xE7\xF5es antes de ligar o Autopilot.","error"),this.switchTab("settings"),this.apiKeyInput.focus();return}this.callbacks.onSettingsChange({autoApply:!0,autoAdvance:!0}),this.autoApplyCheckbox.checked=!0,this.autoAdvanceCheckbox.checked=!0,Ut(),this.autopilot.start(),this.updateAutopilotUi(!0),this.startStopwatch(),this.setStatus("Autopilot ativo. Monitorando exerc\xEDcios...","info")}}),this.shadow.querySelector("#eq-ap-clear-memory")?.addEventListener("click",()=>{dt(),this.logToConsole("> [SYS] Mem\xF3ria contextual limpa com sucesso.","text-green"),this.setStatus("Mem\xF3ria contextual da sess\xE3o limpa.","success")});let D=this.shadow.querySelector("#eq-copy-console-btn");D?.addEventListener("click",()=>{let q=this.apConsole?.innerText||"";navigator.clipboard.writeText(q).then(()=>{let k=D.innerHTML;D.innerHTML=L.check,setTimeout(()=>D.innerHTML=k,1800)})}),this.copyPromptBtn?.addEventListener("click",()=>{let q=this.inspPrompt.textContent||"";navigator.clipboard.writeText(q).then(()=>{if(!this.copyPromptBtn)return;let k=this.copyPromptBtn.innerHTML;this.copyPromptBtn.innerHTML=`${L.check} Copiado!`,setTimeout(()=>{this.copyPromptBtn&&(this.copyPromptBtn.innerHTML=k)},2e3)})}),this.modelSelect.addEventListener("change",()=>this.callbacks.onSettingsChange({model:this.modelSelect.value})),this.modeSelect.addEventListener("change",()=>this.callbacks.onSettingsChange({modeHint:this.modeSelect.value})),this.engineSelect.addEventListener("change",()=>this.callbacks.onSettingsChange({engine:this.engineSelect.value})),this.dryRunCheckbox.addEventListener("change",()=>this.callbacks.onSettingsChange({dryRun:this.dryRunCheckbox.checked})),this.autoApplyCheckbox.addEventListener("change",()=>this.callbacks.onSettingsChange({autoApply:this.autoApplyCheckbox.checked})),this.autoAdvanceCheckbox.addEventListener("change",()=>this.callbacks.onSettingsChange({autoAdvance:this.autoAdvanceCheckbox.checked})),this.useVisionCheckbox.addEventListener("change",()=>{let q=this.useVisionCheckbox.checked;this.callbacks.onSettingsChange({useVision:q}),this.setStatus(q?"Vis\xE3o Computacional ativada (capturas habilitadas).":"Modo DOM R\xE1pido ativado (capturas desabilitadas).","info")}),this.hostDarkModeCheckbox.addEventListener("change",()=>{let q=this.hostDarkModeCheckbox.checked;this.callbacks.onSettingsChange({hostDarkMode:q}),this.applyHostDarkMode(q)}),this.toastStackingCheckbox?.addEventListener("change",()=>this.callbacks.onSettingsChange({toastStacking:this.toastStackingCheckbox.checked})),this.showTokensCheckbox?.addEventListener("change",()=>this.callbacks.onSettingsChange({showTokenUsage:this.showTokensCheckbox.checked})),this.soundFeedbackCheckbox?.addEventListener("change",()=>this.callbacks.onSettingsChange({enableSoundFeedback:this.soundFeedbackCheckbox.checked})),this.compactModeCheckbox?.addEventListener("change",()=>this.callbacks.onSettingsChange({compactMode:this.compactModeCheckbox.checked})),this.glowEffectsCheckbox?.addEventListener("change",()=>{let q=this.glowEffectsCheckbox.checked;this.shadow.host.setAttribute("data-eq-glow",String(q)),this.callbacks.onSettingsChange({glowEffects:q})}),this.languageHintSelect?.addEventListener("change",()=>this.callbacks.onSettingsChange({languageHint:this.languageHintSelect.value})),this.autoScrollLogsCheckbox?.addEventListener("change",()=>this.callbacks.onSettingsChange({autoScrollLogs:this.autoScrollLogsCheckbox.checked})),this.analyzeBtn?.addEventListener("click",async()=>{if(this.analyzeBtn.classList.contains("danger")){this.autopilot.stop(),this.callbacks.onCancel?.(),this.setProgress(0),this.updateAutopilotUi(!1),this.setBusy(!1),this.setInterrupted("Resolver Autopilot interrompido pelo usu\xE1rio.");return}if(!(V.getBestKey()||this.apiKeyInput.value.trim().replace(/^['"]|['"]$/g,""))){this.setStatus("Configure sua chave de API Gemini antes de ativar o Resolver Autopilot.","error"),this.switchTab("settings"),this.apiKeyInput.focus();return}this.callbacks.onSettingsChange({autoApply:!0,autoAdvance:!0}),this.autoApplyCheckbox.checked=!0,this.autoAdvanceCheckbox.checked=!0,Ut(),this.autopilot.start(),this.updateAutopilotUi(!0),this.startStopwatch(),this.setStatus("Resolver Autopilot ativo. Monitorando e respondendo...","info")}),this.applyBtn&&this.applyBtn.addEventListener("click",()=>this.callbacks.onApply())}startStopwatch(){this.stopStopwatch(),this.stopwatchStartTime=Date.now();let e=()=>{let t=((Date.now()-this.stopwatchStartTime)/1e3).toFixed(2)+"s";this.stopwatchAp&&(this.stopwatchAp.textContent=t),this.stopwatchAdv&&(this.stopwatchAdv.textContent=t)};e(),this.stopwatchInterval=setInterval(e,100)}stopStopwatch(e){if(this.stopwatchInterval&&(clearInterval(this.stopwatchInterval),this.stopwatchInterval=null),e!==void 0){let t=(e/1e3).toFixed(2)+"s";this.stopwatchAp&&(this.stopwatchAp.textContent=t),this.stopwatchAdv&&(this.stopwatchAdv.textContent=t)}}setLogFilter(e){this.activeLogFilter=e;let t=["all","error","ai","dom"];for(let a of t){let i=this.shadow.querySelector(`#eq-dbg-filter-${a}`);a===e?i?.classList.add("active"):i?.classList.remove("active")}this.renderTerminalEntries()}updateLogCounters(){let e=0,t=0,a=0;for(let i of this.logEntries)i.category==="error"?e++:i.category==="ai"?t++:i.category==="dom"&&a++;this.dbgCountAll&&(this.dbgCountAll.textContent=String(this.logEntries.length)),this.dbgCountError&&(this.dbgCountError.textContent=String(e)),this.dbgCountAi&&(this.dbgCountAi.textContent=String(t)),this.dbgCountDom&&(this.dbgCountDom.textContent=String(a))}renderTerminalEntries(){if(!this.liveDebugTerminal)return;this.liveDebugTerminal.replaceChildren();let e=this.activeLogFilter==="all"?[...this.logEntries]:this.logEntries.filter(t=>t.category===this.activeLogFilter);if(this.outputSearchQuery){let t=this.outputSearchQuery.toLowerCase();e=e.filter(a=>a.message.toLowerCase().includes(t))}if(this.outputSortNewest||(e=e.reverse()),e.length===0){let t=document.createElement("div");t.style.cssText="color:#333;font-style:italic;white-space:pre-wrap;",t.textContent=this.outputSearchQuery?'Nenhum resultado para "'+this.outputSearchQuery+'".':'Nenhum log para o filtro "'+this.activeLogFilter.toUpperCase()+'".',this.liveDebugTerminal.appendChild(t);return}for(let t of e){let a=document.createElement("div");a.style.cssText="padding:1px 0;white-space:pre-wrap;overflow-wrap:break-word;word-break:break-word;max-width:100%;",a.textContent=t.message,t.colorClass&&(a.className=t.colorClass),this.liveDebugTerminal.appendChild(a)}this.autoScrollLogs&&(this.liveDebugTerminal.scrollTop=this.liveDebugTerminal.scrollHeight)}appendTerminalLine(e,t){if(!this.liveTerminalOutput)return;let a=this.shadow.querySelector("#eq-term-current-line"),i=document.createElement("div");i.style.cssText="padding:0;white-space:pre-wrap;overflow-wrap:break-word;",i.textContent=e;let s=t==="text-red"?"#ff4444":t==="text-blue"?"#888":t==="text-green"?"#aaa":t==="text-yellow"?"#888":"var(--eq-text)";for(i.style.color=s,a?this.liveTerminalOutput.insertBefore(i,a):this.liveTerminalOutput.appendChild(i);this.liveTerminalOutput.children.length>600;){let r=this.liveTerminalOutput.firstChild;if(r&&r!==a)this.liveTerminalOutput.removeChild(r);else break}this.liveTerminalOutput.scrollTop=this.liveTerminalOutput.scrollHeight}initTerminalREPL(){if(this.liveTerminalOutput=this.shadow.querySelector("#eq-term-output"),this._terminalInited){this._reconnectContextbarBtns();return}this._terminalInited=!0;let e=this.shadow.querySelector("#eq-term-capture"),t=this.shadow.querySelector("#eq-term-output"),a=this.shadow.querySelector("#eq-term-typed"),i=this.shadow.querySelector("#eq-term-current-line"),s=this.shadow.querySelector("#eq-term-panel-terminal"),r=this.shadow.querySelector("#eq-term-panel-output"),n=this.shadow.querySelector("#eq-output-toolbar"),d=this.shadow.querySelector("#eq-output-search"),c=this.shadow.querySelector("#eq-output-search-clear"),u=this.shadow.querySelector("#eq-output-filter-btn"),m=this.shadow.querySelector("#eq-output-filter-menu"),l=this.shadow.querySelector("#eq-fchk-apply"),p=(P,j="#888",N=13)=>`<span data-icon="1" aria-hidden="true" style="display:inline-flex;vertical-align:middle;width:${N}px;height:${N}px;color:${j};flex-shrink:0;isolation:isolate;">${L[P]||""}</span>`,h=(P,j="")=>{if(!t||!i)return;let N=document.createElement("div");N.style.cssText="padding:0;white-space:pre-wrap;overflow-wrap:break-word;word-break:break-word;max-width:100%;line-height:1.65;"+j,N.innerHTML=P,t.insertBefore(N,i)},f=(P,j="var(--eq-text)ccc")=>h(`<span style="color:${j};">${P}</span>`),g=()=>f("","#000"),b=(P=52)=>f("  "+"\u2500".repeat(P),"#222"),v=(P,j,N)=>{let H=P.map((U,K)=>U.padEnd(j[K]||0)),R=N?H.map((U,K)=>`<span style="color:${N[K]||"#aaa"}">${U}</span>`):H.map(U=>`<span style="color:#aaa">${U}</span>`);h("  "+R.join("  ")+"  ")},x=P=>{let j="";return P.childNodes.forEach(N=>{if(N.nodeType===Node.TEXT_NODE)j+=N.textContent||"";else if(N.nodeType===Node.ELEMENT_NODE){let H=N;H.dataset?.icon||(j+=x(H))}}),j},w=(P,j="#1a1a1a",N=2)=>{if(!t||!i){P();return}let H=i.previousSibling;P();let R=[],U=H?H.nextSibling:t.firstChild;for(;U&&U!==i;)R.push(U),U=U.nextSibling;if(!R.length)return;let K=document.createElement("div");K.style.cssText=`margin:${N}px 4px;outline:1px solid ${j};outline-offset:-1px;border-radius:3px;overflow:hidden;`,t.insertBefore(K,i),R.forEach(ee=>K.appendChild(ee))},y=P=>{let j=P.trim().replace(/\s+/g," ").split(" "),N=j[0].toLowerCase().replace(/[^a-z0-9\-]/g,"");switch(N){case"help":w(()=>{g(),h("  "+p("terminal","#555",14)+' <span style="color:#888;font-weight:700;letter-spacing:0.1em;font-size:10px;"> COMANDOS DO TERMINAL</span>'),g(),[["help","lista todos os comandos","list","#555"],["status","estado atual do sistema","sparkles","#555"],["version","vers\xE3o e info do build","info","#555"],["info-api","dados da \xFAltima requisi\xE7\xE3o \xE0 API","chip","#555"],["tokens","tokens consumidos (detalhado)","code","#555"],["context","contexto da quest\xE3o atual","eye","#555"],["controls","controles detectados (tabela)","list","#555"],["errors","erros recentes registrados","info","#555"],["logs [n]","\xFAltimas N entradas do output","file","#555"],["history","hist\xF3rico de quest\xF5es respondidas","clock","#555"],["reset","limpa logs e m\xE9tricas","eraser","#555"],["clear","limpa o terminal","trash","#555"],["copy","copia terminal para clipboard","copy","#555"]].forEach(([R,U,K,ee])=>{h(`    ${p(K,ee,11)} <span style="color:#aaa;font-weight:700;min-width:72px;display:inline-block;">${R}</span>  <span style="color:#444;">${U}</span>`)}),g(),f("  Dica: \u2191 \u2193 para hist\xF3rico de comandos","#1e1e1e"),g()},"#1a1a1a");break;case"clear":t&&i&&[...t.children].forEach(R=>{R!==i&&R.dataset?.perm!=="1"&&R.remove()});return;case"info-api":{let H=this.latestPlan;if(!H){g(),f("  Nenhuma requisi\xE7\xE3o \xE0 API ainda.","#333"),g();break}w(()=>{g(),h("  "+p("chip","#444",14)+' <span style="color:#777;font-weight:700;letter-spacing:0.08em;font-size:10px;"> API \u2014 \xDALTIMA REQUISI\xC7\xC3O</span>'),b(44);let R=(U,K,ee,ne,Ke="#888")=>h(`  ${p(U,K,11)}  <span style="color:#444;">${ee.padEnd(16)}</span><span style="color:${Ke};font-weight:600;">${ne||"--"}</span>`);R("sparkles","#555","Modelo",H?.usedModel||this.initialSettings?.model||"--","#bbb"),R("clock","#444","Lat\xEAncia",H?.durationMs?H.durationMs+"ms":"--","#888"),R("code","#444","Prompt tokens",String(H?.promptTokens??"--"),"#777"),R("code","#444","Resp. tokens",String(H?.candidatesTokens??"--"),"#777"),R("chip","#555","Total tokens",String(H?.tokensUsed??"--"),"#aaa"),R("file","#444","Prompt chars",this.latestPromptText?.length?this.latestPromptText.length+" chars":"--","#777"),g()},"#1a1a1a");break}case"version":w(()=>{g(),h("  "+p("sparkles","#555",14)+` <span style="color:#bbb;font-weight:700;letter-spacing:0.04em;"> EasyQuiz ${typeof Pe<"u"?Pe:"?"}</span>`),f("  Motor H\xEDbrido 4.0  \xB7  RAG \xB7 AST \xB7 Vision \xB7 Multimodal","#444"),f("  Build: "+new Date().toLocaleDateString("pt-BR"),"#2a2a2a"),g()},"#1a1a1a");break;case"status":{let H=this.latestPlan,R=this.latestContext;w(()=>{g(),h("  "+p("inspector","#444",14)+' <span style="color:#777;font-weight:700;letter-spacing:0.08em;font-size:10px;"> STATUS DO SISTEMA</span>'),b(44);let U=(Ko,Go,Jo,Wo,$o="#aaa")=>h(`  ${p(Ko,Go,11)}  <span style="color:#444;">${Jo.padEnd(14)}</span><span style="color:${$o};font-weight:600;">${Wo||"--"}</span>`);U("sparkles","#666","Modelo",H?.usedModel||this.initialSettings?.model||"--","var(--eq-text)");let K=H?.mode||"aguardando",ee=K==="aguardando"?"#444":K.includes("error")?"#7a3333":"#4a6a4a";U("play","#555","Modo",K,ee);let ne=H?.durationMs,Ke=ne?ne<1e3?"#4a6a4a":ne<3e3?"#888":"#7a5533":"#333";U("clock","#555","Lat\xEAncia",ne?ne+"ms":"--",Ke),U("chip","#555","Tokens",H?.tokensUsed?String(H.tokensUsed):"--","#aaa");let Oe=H?Math.round((H.confidence||0)*100):null,Ge=Oe?Oe>=80?"#4a6a4a":Oe>=50?"#888":"#7a5533":"#333";U("analyze","#555","Confian\xE7a",Oe!==null?Oe+"%":"--",Ge),U("eye","#555","Controles",R?String(R.controls.length):"--","#888"),R&&(b(44),f("  "+R.questionText.slice(0,56)+(R.questionText.length>56?"\u2026":""),"#333")),g()},"#1a1a1a");break}case"tokens":{let H=this.latestPlan;if(!H){g(),f("  Nenhuma requisi\xE7\xE3o ainda.","#333"),g();break}w(()=>{g(),h("  "+p("code","#444",14)+' <span style="color:#777;font-weight:700;letter-spacing:0.08em;font-size:10px;"> TOKENS \u2014 \xDALTIMA REQUISI\xC7\xC3O</span>'),b(38);let R=H.promptTokens||0,U=H.candidatesTokens||0,K=R+U||1,ee=Math.round(R/K*20),ne=20-ee;f(`  Prompt tokens    ${String(R).padStart(8)}   [${"\u2588".repeat(ee)}${"\u2591".repeat(ne)}]`,"#555"),f(`  Response tokens  ${String(U).padStart(8)}   [${"\u2591".repeat(ee)}${"\u2588".repeat(ne)}]`,"#555"),f("  "+"\u2508".repeat(46),"#1e1e1e"),f(`  Total            ${String(H.tokensUsed??"--").padStart(8)}`,"#aaa"),f(`  Lat\xEAncia         ${(H.durationMs?H.durationMs+"ms":"--").padStart(8)}`,"#444"),g()},"#1a1a1a");break}case"context":{let H=this.latestContext;if(!H){g(),f("  Contexto n\xE3o dispon\xEDvel.","#333"),g();break}w(()=>{g(),h("  "+p("eye","#444",14)+' <span style="color:#777;font-weight:700;letter-spacing:0.08em;font-size:10px;"> CONTEXTO ATUAL</span>'),b(44),f("  Escopo     "+H.scope.tagName.toLowerCase()+(H.scope.id?"#"+H.scope.id:""),"#666"),f("  Controles  "+H.controls.length,"#555"),b(44),f("  "+H.questionText.slice(0,58)+(H.questionText.length>58?"\u2026":""),"#444"),g()},"#1a1a1a");break}case"controls":{let H=this.latestContext;if(!H?.controls.length){g(),f("  Nenhum controle detectado.","#333"),g();break}w(()=>{g(),h("  "+p("list","#444",14)+` <span style="color:#777;font-weight:700;letter-spacing:0.08em;font-size:10px;"> CONTROLES (${H.controls.length})</span>`),b(55),v(["#","Tipo","Label / ID","Valor"],[3,10,27,10],["#444","#555","#888","#666"]),f("  "+"\u2508".repeat(53),"#1a1a1a"),H.controls.forEach((R,U)=>v([String(U+1),(R.type||R.tag||"?").toUpperCase().slice(0,9),(R.label||R.id||R.name||"\u2014").slice(0,26),(R.value||"\u2014").slice(0,9)],[3,10,27,10],["#444","#555","#999","#777"])),g()},"#1a1a1a");break}case"errors":{let H=this.logEntries.filter(R=>R.category==="error");if(!H.length){g(),h("  "+p("check","#4a6a4a",13)+' <span style="color:#4a6a4a;font-weight:600;"> Nenhum erro</span><span style="color:#2a3a2a;"> nesta sess\xE3o \u2014 tudo ok.</span>'),g();break}w(()=>{g(),h("  "+p("info","#7a3333",14)+` <span style="color:#777;font-weight:700;letter-spacing:0.08em;font-size:10px;"> ERROS (${H.length})</span>`),b(44),H.slice(-15).forEach(R=>f("  "+R.message,"#666")),g()},"#2a1a1a");break}case"logs":{let H=Math.min(parseInt(j[1]||"10",10)||10,50),R=this.logEntries.slice(-H);if(!R.length){g(),f("  Nenhum log registrado.","#333"),g();break}w(()=>{g(),h("  "+p("file","#444",14)+` <span style="color:#777;font-weight:700;letter-spacing:0.08em;font-size:10px;"> \xDALTIMAS ${H} ENTRADAS</span>`),b(44),R.forEach(U=>f("  "+U.message,"#555")),g()},"#1a1a1a");break}case"history":{let H=this.metricsHistory;if(!H?.length){g(),f("  Nenhuma quest\xE3o respondida ainda.","#333"),g();break}w(()=>{g(),h("  "+p("clock","#444",14)+` <span style="color:#777;font-weight:700;letter-spacing:0.08em;font-size:10px;"> HIST\xD3RICO (${H.length})</span>`),b(58),v(["#","Quest\xE3o","Tempo","Modelo"],[3,38,7,10],["#444","#666","#555","#555"]),f("  "+"\u2508".repeat(58),"#1a1a1a"),H.slice(-15).forEach((R,U)=>v([String(U+1),(R.questionTitle||"Quest\xE3o").slice(0,37),R.durationMs?(R.durationMs/1e3).toFixed(1)+"s":"--",(R.model||"--").slice(0,9)],[3,38,7,10],["#444","#aaa","#777","#666"])),g()},"#1a1a1a");break}case"reset":this.clearLogs(),g(),h("  "+p("check","#4a6a4a",13)+' <span style="color:#4a6a4a;font-weight:600;"> Resetado</span><span style="color:#444;">  \u2014 logs e m\xE9tricas zerados.</span>'),g();break;case"copy":{if(!t)break;let H=Array.from(t.children).filter(R=>R!==i&&R.id!=="eq-click-cursor"&&R.id!=="eq-term-sel-canvas").map(R=>x(R).trimEnd());navigator.clipboard.writeText(H.join(`
`)).then(()=>{h("  "+p("copy","#888",11)+' <span style="color:#666;"> Conte\xFAdo copiado para a \xE1rea de transfer\xEAncia.</span>'),this.showToast("Terminal copiado","success",2e3)});break}case"":break;default:g(),h(`  <span style="color:#555;">Comando desconhecido: </span><span style="color:#777;font-weight:600;">${N||"(vazio)"}</span>`),f("  Digite help para ver os comandos.","#2a2a2a"),g()}t&&(t.scrollTop=t.scrollHeight)},E=P=>{this.terminalMode=P;let j=P==="terminal";s&&(s.style.display=j?"flex":"none"),r&&(r.style.display=j?"none":"flex"),n&&(n.style.display=j?"none":"flex");let N=this.shadow.querySelector("#eq-term-mode-terminal"),H=this.shadow.querySelector("#eq-term-mode-output");N&&(N.style.background=j?"#181818":"transparent",N.style.borderColor=j?"#2a2a2a":"transparent",N.style.color=j?"var(--eq-text-bright)":"#555"),H&&(H.style.background=j?"transparent":"#181818",H.style.borderColor=j?"transparent":"#2a2a2a",H.style.color=j?"#555":"var(--eq-text-bright)"),j||this.renderTerminalEntries()};this._reconnectContextbarBtns=()=>{let P=this.shadow.querySelector("#eq-term-mode-terminal"),j=this.shadow.querySelector("#eq-term-mode-output");P?.addEventListener("click",()=>E("terminal")),j?.addEventListener("click",()=>E("output"));let N=this.shadow.querySelector("#eq-term-copy-btn"),H=this.shadow.querySelector("#eq-term-clear-btn");N?.addEventListener("click",()=>{let R=ee=>{let ne=ee.style.color;ee.style.color="#4ade80",setTimeout(()=>ee.style.color=ne,400)},U=this._getCustomSel?.();if(U&&U.trim().length>0){this._clearCustomSel?.(),navigator.clipboard.writeText(U).then(()=>{this.showToast("Sele\xE7\xE3o copiada","success",2e3),N&&R(N)});return}let K=window.getSelection()?.toString()?.trim()||"";if(this.terminalMode==="terminal"){if(K)navigator.clipboard.writeText(K).then(()=>{this.showToast("Sele\xE7\xE3o copiada","success",2e3),N&&R(N)});else if(t){let ee=Array.from(t.children).filter(ne=>ne!==i&&ne.id!=="eq-click-cursor"&&ne.id!=="eq-term-sel-canvas").map(ne=>x(ne).trimEnd());navigator.clipboard.writeText(ee.join(`
`)).then(()=>{this.showToast("Terminal copiado","success",2e3),N&&R(N)})}}else K?navigator.clipboard.writeText(K).then(()=>{this.showToast("Sele\xE7\xE3o copiada","success",2e3),N&&R(N)}):navigator.clipboard.writeText(this.getFormattedLogs()).then(()=>{this.showToast("Output copiado","success",2e3),N&&R(N)})}),H?.addEventListener("click",()=>{this.terminalMode==="terminal"?(t&&i&&[...t.children].forEach(R=>{R!==i&&R.dataset?.perm!=="1"&&R.remove()}),a&&(a.textContent="")):this.clearLogs()})},this._reconnectContextbarBtns();let T=()=>{e?.focus(),t?.classList.remove("eq-term-unfocused")},I=(()=>{try{let j=document.createElement("canvas").getContext("2d");return j?(j.font='11.5px "Cascadia Code","Fira Code","Courier New",monospace',j.measureText("X").width):6.9}catch{return 6.9}})(),A=()=>parseFloat(getComputedStyle(t).lineHeight)||19,S=14,z=10,D=this.shadow.querySelector("#eq-click-cursor");t&&(t.style.position="relative"),D&&(t?.appendChild(D),D.style.position="absolute",D.style.width=I+"px",D.style.height=A()+"px",D.style.animation="eq-term-blink 0.9s step-end infinite");let q=(P,j)=>{if(!D||!t)return;let N=A(),H=Math.max(0,Math.floor((P-S)/I)),R=Math.max(0,Math.floor((j-z)/N)),U=H*I+S,K=R*N+z;D.style.left=U+"px",D.style.top=K+"px",D.style.width=I+"px",D.style.height=N+"px",D.style.animation="eq-term-blink 0.9s step-end infinite",D.style.display="block"},k=this.shadow.querySelector("#eq-term-sel-canvas"),M=null;k&&(M=k.getContext("2d"));let B=null,X=null,W=!1,J=0,Z=0,G=()=>{if(!k||!t)return;let P=t.scrollWidth,j=Math.max(t.scrollHeight,t.clientHeight);(k.width!==P||k.height!==j)&&(k.width=P,k.height=j,k.style.width=P+"px",k.style.height=j+"px")},oe=()=>{if(!M||!k||(G(),M.clearRect(0,0,k.width,k.height),!B||!X))return;let P=A(),j=k.width,N=B.row,H=B.col,R=X.row,U=X.col;if((N>R||N===R&&H>U)&&([N,H,R,U]=[R,U,N,H]),M.fillStyle="white",N===R)M.fillRect(S+H*I,z+N*P,(U-H+1)*I,P);else{M.fillRect(S+H*I,z+N*P,j-S-H*I,P);for(let K=N+1;K<R;K++)M.fillRect(S,z+K*P,j-S,P);M.fillRect(S,z+R*P,(U+1)*I,P)}},fe=(P,j)=>({row:Math.max(0,Math.floor((j-z)/A())),col:Math.max(0,Math.floor((P-S)/I))}),be=()=>{if(!B||!X||!t)return"";let P=B.row,j=B.col,N=X.row,H=X.col;(P>N||P===N&&j>H)&&([P,j,N,H]=[N,H,P,j]);let R=Array.from(t.children).filter(K=>{let ee=K.id;return ee!=="eq-click-cursor"&&ee!=="eq-term-sel-canvas"&&ee!=="eq-term-current-line"}).map(K=>x(K).replace(/\n/g,"")),U=[];for(let K=P;K<=N;K++){let ee=K<R.length?R[K]:"";P===N?U.push(ee.padEnd(H+1," ").slice(j,H+1)):K===P?U.push(ee.slice(j)):K===N?U.push(ee.padEnd(H+1," ").slice(0,H+1)):U.push(ee)}return U.join(`
`).replace(/\n+$/,"")};if(this._getCustomSel=be,this._clearCustomSel=()=>{B=null,X=null,M&&k&&M.clearRect(0,0,k.width,k.height)},k&&t)try{new ResizeObserver(()=>{G(),B&&X&&oe()}).observe(t)}catch{}t?.addEventListener("mousedown",P=>{if(P.button!==0)return;J=P.clientX,Z=P.clientY,W=!1,B=null,X=null,M&&k&&M.clearRect(0,0,k.width,k.height),D&&(D.style.display="none");let j=t.getBoundingClientRect(),N=P.clientX-j.left+t.scrollLeft,H=P.clientY-j.top+t.scrollTop;q(N,H),setTimeout(()=>{W||T()},80)}),t?.addEventListener("mousemove",P=>{if(P.buttons!==1)return;let j=Math.abs(P.clientX-J),N=Math.abs(P.clientY-Z);if(j>2||N>2){if(!W){W=!0,D&&(D.style.display="none");let R=t.getBoundingClientRect();B=fe(J-R.left+t.scrollLeft,Z-R.top+t.scrollTop)}let H=t.getBoundingClientRect();X=fe(P.clientX-H.left+t.scrollLeft,P.clientY-H.top+t.scrollTop),oe()}}),t?.addEventListener("mouseup",()=>{W&&(W=!1,(!B||!X)&&T())}),e?.addEventListener("keydown",()=>{D&&(D.style.display="none")},{passive:!0}),t?.addEventListener("focus",()=>t.classList.remove("eq-term-unfocused")),e?.addEventListener("blur",()=>t?.classList.add("eq-term-unfocused")),e?.addEventListener("focus",()=>t?.classList.remove("eq-term-unfocused")),e?.addEventListener("keydown",P=>{if(!a)return;let j=a.textContent||"";if(P.key==="Enter"){P.preventDefault();let N=j.trim();if(a.textContent="",this.terminalCmdHistoryIdx=-1,N&&(this.terminalCmdHistory.unshift(N),this.terminalCmdHistory.length>50&&this.terminalCmdHistory.pop()),i){let H=document.createElement("div");H.style.cssText="white-space:pre-wrap;overflow-wrap:break-word;",H.innerHTML=`<span style="color:#fff;font-weight:700;">EasyQuiz_Legacy:&nbsp;</span><span style="color:#888;">${N}</span>`,t?.insertBefore(H,i)}N&&y(N),t&&(t.scrollTop=t.scrollHeight)}else if(P.key==="Backspace")P.preventDefault(),a.textContent=j.slice(0,-1);else if(P.key==="ArrowUp")P.preventDefault(),this.terminalCmdHistoryIdx=Math.min(this.terminalCmdHistoryIdx+1,this.terminalCmdHistory.length-1),this.terminalCmdHistoryIdx>=0&&(a.textContent=this.terminalCmdHistory[this.terminalCmdHistoryIdx]);else if(P.key==="ArrowDown")P.preventDefault(),this.terminalCmdHistoryIdx=Math.max(this.terminalCmdHistoryIdx-1,-1),a.textContent=this.terminalCmdHistoryIdx>=0?this.terminalCmdHistory[this.terminalCmdHistoryIdx]:"";else if(P.key==="c"&&P.ctrlKey){let N=this._getCustomSel?.();if(N&&N.trim().length>0)this._clearCustomSel?.(),navigator.clipboard.writeText(N);else{let R=window.getSelection()?.toString()||"";R?navigator.clipboard.writeText(R):a?.textContent&&navigator.clipboard.writeText(a.textContent)}let H=this.shadow.querySelector("#eq-term-copy-btn");if(H){let R=H.style.color;H.style.color="#4ade80",setTimeout(()=>H.style.color=R,400)}}else P.key==="v"&&P.ctrlKey?(P.preventDefault(),navigator.clipboard.readText().then(N=>{a&&(a.textContent=(a.textContent||"")+N.replace(/\n/g," ")),t&&(t.scrollTop=t.scrollHeight)})):P.key==="l"&&P.ctrlKey?(P.preventDefault(),t&&i&&[...t.children].forEach(N=>{N!==i&&N.dataset?.perm!=="1"&&N.remove()}),a.textContent=""):P.key.length===1&&!P.ctrlKey&&!P.metaKey&&(P.preventDefault(),a.textContent=j+P.key,t&&(t.scrollTop=t.scrollHeight))}),e?.addEventListener("paste",P=>{P.preventDefault();let j=P.clipboardData?.getData("text")||"",N=/\n/g;a&&(a.textContent=(a.textContent||"")+j.replace(N," "))});let ze=()=>{let P=this.shadow.querySelector("#eq-fchk-all")?.checked,j=this.shadow.querySelector("#eq-fchk-error")?.checked,N=this.shadow.querySelector("#eq-fchk-ai")?.checked,H=this.shadow.querySelector("#eq-fchk-dom")?.checked;P?this.activeLogFilter="all":j&&!N&&!H?this.activeLogFilter="error":N&&!j&&!H?this.activeLogFilter="ai":H&&!j&&!N?this.activeLogFilter="dom":this.activeLogFilter="all";let R=this.shadow.querySelector("#eq-output-filter-label"),U={all:"Todos",error:"Erros",ai:"IA",dom:"DOM"};if(R){let K={all:"Todos",error:"Erros",ai:"IA",dom:"DOM"},ee=this.shadow.querySelector("#eq-fchk-error")?.checked,ne=this.shadow.querySelector("#eq-fchk-ai")?.checked,Ke=this.shadow.querySelector("#eq-fchk-dom")?.checked,Oe=this.shadow.querySelector("#eq-fchk-all")?.checked,Ge=[ee,ne,Ke].filter(Boolean).length;Oe||Ge===0?R.textContent="Todos":Ge===1?R.textContent=K[this.activeLogFilter]||this.activeLogFilter:R.textContent="\u22EF ("+Ge+")"}this.renderTerminalEntries()};u?.addEventListener("click",P=>{if(P.stopPropagation(),!m)return;let j=m.style.display!=="none";m.style.display=j?"none":"block"}),m?.addEventListener("mousedown",P=>P.stopPropagation());let Ee=this.shadow.querySelector("#eq-fchk-all"),It=this.shadow.querySelector("#eq-fchk-error"),je=this.shadow.querySelector("#eq-fchk-ai"),ve=this.shadow.querySelector("#eq-fchk-dom"),Qe=[It,je,ve].filter(Boolean);Ee?.addEventListener("change",()=>{Ee.checked?Qe.forEach(P=>{P.checked=!1}):Ee.checked=!0,ze()}),Qe.forEach(P=>{P.addEventListener("change",()=>{P.checked&&Ee&&(Ee.checked=!1),!Qe.some(N=>N.checked)&&Ee&&(Ee.checked=!0),ze()})}),document.addEventListener("mousedown",P=>{m&&m.style.display!=="none"&&(m.style.display="none"),t&&!t.contains(P.target)&&this._clearCustomSel?.()});let Ht=this.shadow.querySelector("#eq-output-sort-btn"),lt=this.shadow.querySelector("#eq-sort-arrow");if(lt&&(lt.style.transform="rotate(270deg)"),Ht?.addEventListener("click",()=>{this.outputSortNewest=!this.outputSortNewest,lt&&(lt.style.transform=this.outputSortNewest?"rotate(270deg)":"rotate(90deg)"),Ht&&(Ht.style.color=this.outputSortNewest?"#aaa":"#60a5fa"),this.renderTerminalEntries()}),d?.addEventListener("input",()=>{this.outputSearchQuery=d.value,c&&(c.style.display=d.value?"inline":"none"),this.renderTerminalEntries()}),c?.addEventListener("click",()=>{d&&(d.value=""),this.outputSearchQuery="",c&&(c.style.display="none"),this.renderTerminalEntries()}),this.liveDebugTerminal){let P=null;this.liveDebugTerminal.addEventListener("scroll",()=>{P&&clearTimeout(P),P=setTimeout(()=>{if(!this.liveDebugTerminal)return;let j=this.liveDebugTerminal,N=j.scrollHeight-j.scrollTop-j.clientHeight,H=this.shadow.querySelector("#eq-dbg-scroll-toggle");N>40?(this.autoScrollLogs=!1,H&&(H.style.color="#333",H.style.borderColor="rgba(255,255,255,0.07)",H.title="Auto-scroll: desativado")):N<10&&(this.autoScrollLogs=!0,H&&(H.style.color="var(--eq-text-bright)",H.style.borderColor="rgba(255,255,255,0.18)",H.title="Auto-scroll: ativo"))},150)})}this.shadow.querySelector("#eq-dbg-scroll-toggle")?.addEventListener("click",P=>{this.autoScrollLogs=!this.autoScrollLogs;let j=P.currentTarget;j.style.color=this.autoScrollLogs?"var(--eq-text-bright)":"#333",j.style.borderColor=this.autoScrollLogs?"rgba(255,255,255,0.18)":"rgba(255,255,255,0.07)",j.title=this.autoScrollLogs?"Auto-scroll: ativo":"Auto-scroll: desativado"}),E("terminal"),setTimeout(()=>T(),80)}clearLogs(){if(this.logEntries=[],this.updateLogCounters(),this.liveDebugTerminal){this.liveDebugTerminal.replaceChildren();let e=document.createElement("div");e.style.cssText="color:#333;",e.textContent="> [SYS] Output limpo.",this.liveDebugTerminal.appendChild(e)}this.apConsole&&this.apConsole.replaceChildren(),this.executionConsole&&this.executionConsole.replaceChildren()}termBorder(e,t="#1e1e1e",a=3){return e.style.outline=`1px solid ${t}`,e.style.outlineOffset="-1px",e.style.borderRadius=a+"px",e}getFormattedLogs(){return(this.activeLogFilter==="all"?this.logEntries:this.logEntries.filter(t=>t.category===this.activeLogFilter)).map(t=>t.message).join(`
`)}setLastError(e){this.lastErrorMsg=e,this.dbgErrorCard&&this.dbgErrorText&&(this.dbgErrorText.textContent=e,this.dbgErrorCard.style.display="flex")}setErrorDiagnostic(e,t){let a=t?`[${t}] ${e}`:e;this.setLastError(a)}refreshDebugView(){let e=this.latestPlan,t=this.latestContext,a=this.latestPromptText||e?.promptSent||"";if(this.dbgModel&&(this.dbgModel.textContent=e?.usedModel||this.initialSettings.model||"--"),this.dbgLatency&&(this.dbgLatency.textContent=e?.durationMs?`${e.durationMs}ms`:"--"),this.dbgSplitTokens){let i=e?.promptTokens!==void 0?String(e.promptTokens):"--",s=e?.candidatesTokens!==void 0?String(e.candidatesTokens):"--";this.dbgSplitTokens.textContent=`${i} / ${s}`,this.dbgSplitTokens.title=`Prompt: ${i} tokens | Resposta: ${s} tokens`}if(this.dbgTotalTokens){let i=e?.tokensUsed??(e?.promptTokens&&e?.candidatesTokens?e.promptTokens+e.candidatesTokens:void 0);this.dbgTotalTokens.textContent=i!==void 0?`${i}`:"--"}if(this.dbgPromptLen){let i=a.length,s=Math.round(i/4);this.dbgPromptLen.textContent=`${i}c (~${s}tok)`}this.dbgRawRespView&&(e?e.rawResponse?this.dbgRawRespView.textContent=e.rawResponse:this.dbgRawRespView.textContent=JSON.stringify({pageType:e.pageType,mode:e.mode,confidence:e.confidence,rationale:e.rationale,actions:e.actions},null,2):this.dbgRawRespView.textContent="Aguardando retorno da API Gemini..."),this.lastErrorMsg&&this.dbgErrorCard&&this.dbgErrorText&&(this.dbgErrorText.textContent=this.lastErrorMsg,this.dbgErrorCard.style.display="flex")}logToConsole(e,t){let a=new Date,i=`${String(a.getHours()).padStart(2,"0")}:${String(a.getMinutes()).padStart(2,"0")}:${String(a.getSeconds()).padStart(2,"0")}.${String(Math.floor(a.getMilliseconds()/100))}`,s=e;e.startsWith(">")?s=`> [${i}] ${e.slice(1).trim()}`:s=`[${i}] ${e}`;let r="all";t==="text-red"||s.includes("[ERRO]")||s.includes("Falha")||s.includes("Error")?r="error":s.includes("[IA]")||s.includes("[RAG]")||s.includes("Tokens")||s.includes("Gemini")||s.includes("Modelo:")?r="ai":(s.includes("[DOM]")||s.includes("[EXEC]")||s.includes("[VERIF]")||s.includes("[NAV]"))&&(r="dom");let n={id:Date.now()+Math.random(),timestamp:i,message:s,colorClass:t,category:r};for(this.logEntries.push(n);this.logEntries.length>250;)this.logEntries.shift();if(this.updateLogCounters(),r==="error"&&this.setLastError(s),this.liveDebugTerminal&&(this.activeLogFilter==="all"||this.activeLogFilter===r)){let d=document.createElement("div");d.style.cssText="padding:1px 0;",d.textContent=s,t&&(d.className=t),this.liveDebugTerminal.appendChild(d)}if(this.liveTerminalOutput&&(r==="dom"||r==="all"||r==="error")){for(this.appendTerminalLine(s,t);this.liveDebugTerminal.children.length>300;)this.liveDebugTerminal.removeChild(this.liveDebugTerminal.firstChild);this.autoScrollLogs&&(this.liveDebugTerminal.scrollTop=this.liveDebugTerminal.scrollHeight)}if(this.apConsole){let d=document.createElement("div");for(d.textContent=s,t&&(d.className=t),this.apConsole.appendChild(d),this.apConsole.scrollTop=this.apConsole.scrollHeight;this.apConsole.children.length>150;)this.apConsole.removeChild(this.apConsole.firstChild)}if(this.executionConsole){let d=document.createElement("div");for(d.textContent=s,t&&(d.className=t),this.executionConsole.appendChild(d),this.executionConsole.scrollTop=this.executionConsole.scrollHeight;this.executionConsole.children.length>150;)this.executionConsole.removeChild(this.executionConsole.firstChild)}}setProgress(e,t){if(!this.progressContainer||!this.progressBar)return;if(e<=0){this.progressContainer.style.display="none",this.progressBar.style.width="0%";return}this.progressContainer.style.display="flex";let a=Math.min(100,Math.max(0,Math.round(e)));this.progressBar.style.width=`${a}%`,this.progressVal&&(this.progressVal.textContent=`${a}%`),t&&this.progressLabel&&(this.progressLabel.textContent=t),a>=100&&setTimeout(()=>{this.progressContainer&&this.progressBar&&this.progressBar.style.width==="100%"&&(this.progressContainer.style.display="none")},1500)}updateContext(e,t){this.latestContext=e,t&&(this.latestPlan=t,t.imageDescriptions&&(this.latestImageDescriptions=t.imageDescriptions)),this.activeTab==="brain"?(this.renderContextTree(),this.refreshBrainCanvas(),t&&this.refreshInspectorView()):this.activeTab==="debug"&&this.refreshDebugView()}updateImages(e){this.latestImages=e,this.activeTab==="brain"&&(this.renderContextTree(),this.refreshBrainCanvas()),this.activeTab==="brain"&&(this.brainSelectedFolder==="media-images"||(this.brainActiveTab||"").startsWith("img-"))&&this.refreshBrainCanvas()}renderContextTree(){if(!this.contextTreeContainer)return;let e=this.latestContext,t=ct(),a=this.latestPlan,i=!!(this.latestPromptText||a?.promptSent),s=!!e,r=!!a;this.contextTreeContainer.innerHTML="";let n=this.createTreeFolder(" P\xC1GINA & ESCOPO ATUAL",!0,[{label:"T\xEDtulo",value:document.title||"Sem t\xEDtulo"},{label:"URL",value:window.location.pathname||"/"},{label:"Escopo DOM",value:e?`${e.scope.tagName.toLowerCase()}${e.scope.className?"."+e.scope.className.split(" ").join("."):""}`:"Document"},{label:"Tamanho Texto",value:e?`${e.questionText.length} caracteres`:"N\xE3o analisado"},{label:"Trecho Enunciado",value:e?`"${e.questionText.slice(0,120)}..."`:"Nenhum"}]);this.contextTreeContainer.appendChild(n);let d=e?e.controls:[],c=d.map((v,x)=>{let w=v.role==="navigation"||v.type==="button",y=!w&&v.value?` [val: "${v.value}"]`:"";return{label:`[#${x+1}] ${v.type.toUpperCase()}`,value:`${v.label||v.id||v.name||"(Sem r\xF3tulo)"}${y}`.trim(),badge:w?"Navega\xE7\xE3o":v.role||v.type}}),u=this.createTreeFolder(`\uFE0F CONTROLES DETECTADOS (${d.length})`,d.length>0,c);this.contextTreeContainer.appendChild(u);let m=t.map((v,x)=>({label:`Mem\xF3ria #${x+1}`,value:v,badge:"RAG"})),l=this.createTreeFolder(` MEM\xD3RIA RAG ACUMULADA (${t.length})`,t.length>0,m);this.contextTreeContainer.appendChild(l);let p=Te(window.location.href);if(p.skills.length>0){let v=p.skills.map(w=>({label:w.name,value:`${w.description}${w.rule?` [Regra: ${w.rule}]`:""}`,badge:`${w.successCount}x OK`})),x=this.createTreeFolder(`\u{1F4DA} MINI-SKILLS DA P\xC1GINA (${p.skills.length})`,!0,v);this.contextTreeContainer.appendChild(x)}if(p.failedPatterns.length>0){let v=p.failedPatterns.map(w=>({label:`[ANTI-ERRO] ${w.actionType.toUpperCase()} em "${w.target.slice(0,35)}"`,value:`${w.reason} \u2192 Evitar: ${w.retryAvoidanceHint}`,badge:"Evitado"})),x=this.createTreeFolder(`\u{1F6E1}\uFE0F ERROS EVITADOS (ANTI-PATTERNS) (${p.failedPatterns.length})`,!0,v);this.contextTreeContainer.appendChild(x)}if(p.flowNotes.length>0){let v=p.flowNotes.map((w,y)=>({label:`Etapa #${y+1}`,value:w,badge:"Fluxo"})),x=this.createTreeFolder(`\u{1F5FA}\uFE0F FLUXO REGISTRADO (${p.flowNotes.length})`,!0,v);this.contextTreeContainer.appendChild(x)}if(a){let v=this.createTreeFolder(` \xDALTIMO PLANO IA (${a.actions.length} a\xE7\xF5es)`,!0,[{label:"Tipo P\xE1gina",value:a.pageType,badge:`${(a.confidence*100).toFixed(0)}%`},{label:"Modo",value:a.mode},{label:"Racioc\xEDnio",value:a.rationale||"N/A"},...a.actions.map((x,w)=>({label:`A\xE7\xE3o #${w+1} (${x.t})`,value:JSON.stringify(x)}))]);this.contextTreeContainer.appendChild(v)}{let v=document.createElement("div");v.style.cssText="border-bottom:1px solid rgba(255,255,255,0.04);";let x=document.createElement("div");x.style.cssText="display:flex;align-items:center;gap:6px;padding:5px 10px;cursor:pointer;font-size:10px;font-weight:600;color:#fbbf24;letter-spacing:0.04em;user-select:none;",x.innerHTML='<span style="display:inline-flex;width:12px;height:12px;color:#fbbf24;">'+L.inspector+"</span> IA ARTIFACTS";let w=document.createElement("div");w.style.cssText="padding-left:16px;overflow:hidden;";let y=(T,C,I,A)=>{let S=document.createElement("div");return S.style.cssText="display:flex;align-items:center;gap:6px;padding:4px 10px 4px 4px;cursor:pointer;border-radius:4px;transition:background 0.1s;"+(this.brainActiveTab===T?"background:rgba(251,191,36,0.1);":""),S.innerHTML='<span style="font-size:9px;color:'+(A?"#fbbf24":"#444")+';">'+L.code+'</span><span style="font-size:10px;color:'+(A?"var(--eq-text-bright)":"#444")+';flex:1;">'+C+'</span><span style="font-size:8px;color:#333;">'+I+"</span>",S.addEventListener("click",()=>{this.brainSelectedFolder=null,this.brainActiveTab=T;let z=this.getBrainFileText(T),D=this.shadow.querySelector("#eq-brain-content");if(D){D.innerHTML="";let q=document.createElement("pre");q.className="eq-brain-code",q.style.cssText='padding:12px;font-size:10.5px;line-height:1.55;white-space:pre-wrap;word-break:break-word;color:var(--eq-text-bright);font-family:"Cascadia Code","Fira Code","Courier New",monospace;',q.textContent=z,D.appendChild(q)}this.renderBrainExplorer(),this.renderBrainTabs()}),S};w.appendChild(y("ai-prompt","prompt.txt",i?"pronto":"aguardando",i)),w.appendChild(y("ai-context","context.json",s?"pronto":"aguardando",s)),w.appendChild(y("ai-response","response.txt",r?"pronto":"aguardando",!!a));let E=!1;x.addEventListener("click",()=>{E=!E,w.style.display=E?"block":"none"}),w.style.display="none",v.appendChild(x),v.appendChild(w),this.contextTreeContainer.appendChild(v)}let h=this.latestImages,f=this.latestImageDescriptions,g=h.map((v,x)=>{let w=f.find(I=>I.index===x),y=(v.captureStatus==="captured"||v.captureStatus==="text_only",""),E=v.captureStatus==="captured"?"Visual":v.captureStatus==="text_only"?"Texto":"Falhou",T=w?w.relevant?" Relevante":"\uFE0F Ignorada":"\u2014",C=w?w.description:v.textContext?v.textContext:"Aguardando an\xE1lise IA...";return{label:`${y} Img ${x+1} [${E}]`,value:`${C}`,badge:T,imgSrc:v.base64?`data:${v.mediaType||"image/jpeg"};base64,${v.base64}`:void 0}}),b=this.createTreeFolder(`\uFE0F IMAGENS DETECTADAS (${h.length})`,!0,g);this.contextTreeContainer.appendChild(b)}createTreeFolder(e,t,a){let i=document.createElement("div");i.className="eq-tree-node";let s=document.createElement("div");s.className="eq-tree-header",s.innerHTML=`<span class="eq-tree-arrow">${t?"\u25BC":"\u25B6"}</span> <span>${e}</span>`;let r=document.createElement("div");if(r.className="eq-tree-content",r.style.display=t?"flex":"none",a.length===0)r.innerHTML='<div class="text-muted" style="padding: 2px 0;">Nenhum item registrado.</div>';else for(let n of a){let d=document.createElement("div");d.className="eq-tree-leaf";let c="";n.imgSrc&&n.imgSrc.startsWith("data:image")&&(c=`<div style="margin-top: 8px; margin-bottom: 4px;"><img src="${n.imgSrc}" style="max-width: 100%; max-height: 120px; border-radius: 4px; border: 1px solid #3c4043; background: #1e1f22;" alt="Captura"></div>`),d.innerHTML=`
          <div style="display: flex; align-items: flex-start; gap: 8px; width: 100%;">
            <strong style="color:var(--eq-text-bright); min-width: 80px;">${n.label}:</strong>
            <div style="flex:1; display: flex; flex-direction: column;">
              <span style="word-break: break-word; color:var(--eq-text);">${n.value}</span>
              ${c}
            </div>
            ${n.badge?`<span class="eq-tree-badge" style="white-space: nowrap;">${n.badge}</span>`:""}
          </div>
        `,r.appendChild(d)}return s.addEventListener("click",()=>{let n=r.style.display==="none";r.style.display=n?"flex":"none";let d=s.querySelector(".eq-tree-arrow");d&&(d.textContent=n?"\u25BC":"\u25B6")}),i.appendChild(s),i.appendChild(r),i}toggle(e){e!==void 0?this.isCollapsed=!e:this.isCollapsed=!this.isCollapsed,this.isCollapsed?this.sidebarEl.classList.add("eq-collapsed"):(this.sidebarEl.classList.remove("eq-collapsed"),V.getAllKeys().length===0&&(this.switchTab("settings"),this.apiKeyInput.focus()))}updateAutopilotUi(e){let t=this.analyzeBtn;if(t){let a=t.closest(".eq-cta-wrapper"),i=e?"Parar Autopilot":"Resolver Autopilot",s=e?L.stop:L.sparkles;a&&(a.classList.toggle("is-running",e),a.classList.toggle("is-idle",!e)),t.classList.toggle("is-running",e),t.classList.toggle("is-idle",!e),t.classList.toggle("danger",e),t.innerHTML=`<span class="eq-btn-icon">${s}</span><span class="eq-btn-label">${i}</span>`,t.title=e?"Interromper o Resolver Autopilot":"Ligar o Resolver Autopilot"}this.apToggleBtn&&(this.apToggleBtn.innerHTML=`${e?L.stop:L.sparkles} ${e?"Parar Autopilot":"Resolver Autopilot"}`,this.apToggleBtn.classList.toggle("danger",e),this.apToggleBtn.title=e?"Interromper o Resolver Autopilot":"Ligar o Resolver Autopilot")}setOperationState(e,t){let a=this.shadow.querySelector("#eq-operation-state"),i=this.shadow.querySelector("#eq-status-card");a&&(a.innerHTML=`${L.info} <span>${e}</span>`,a.className=`eq-operation-state is-${t}`),i&&(i.classList.remove("is-busy","is-success","is-error","is-warning","is-info"),i.classList.add(`is-${t}`));let s=this.analyzeBtn;if(s){let r=s.closest(".eq-cta-wrapper");r&&(r.classList.remove("status-busy","status-success","status-error","status-warning","status-info"),r.classList.add(`status-${t}`)),s.classList.remove("status-busy","status-success","status-error","status-warning","status-info"),s.classList.add(`status-${t}`)}}setInterrupted(e="An\xE1lise interrompida pelo usu\xE1rio."){this.isBusy=!1,[this.modelSelect,this.modeSelect,this.engineSelect,this.dryRunCheckbox,this.autoApplyCheckbox,this.autoAdvanceCheckbox,this.useVisionCheckbox,this.toastStackingCheckbox].forEach(a=>a.disabled=!1);let t=this.analyzeBtn.closest(".eq-cta-wrapper");t&&t.classList.remove("is-running"),this.analyzeBtn.disabled=!1,this.analyzeBtn.classList.remove("danger"),this.analyzeBtn.innerHTML=`<span class="eq-btn-icon">${L.sparkles}</span><span class="eq-btn-label">Resolver Autopilot</span>`,this.analyzeBtn.title="Ligar o Resolver Autopilot",this.applyBtn&&(this.applyBtn.disabled=!this.latestPlan||!this.latestPlan.actions.length),this.stopStopwatch(),this.stopQuestionTimer(),this.dotPulseAp&&(this.dotPulseAp.className="eq-dot-pulse stopped"),this.dotPulseAdv&&(this.dotPulseAdv.className="eq-dot-pulse stopped"),this.launcherDot&&(this.launcherDot.className="eq-launcher-dot stopped"),this.metricsLiveStatus&&(this.metricsLiveStatus.textContent="Interrompido",this.metricsLiveStatus.className="eq-live-stopwatch-status is-warning"),this.autopilot.isActive()||this.updateAutopilotUi(!1),this.setStatus(e,"warning")}setBusy(e,t){this.isBusy=e,[this.modelSelect,this.modeSelect,this.engineSelect,this.dryRunCheckbox,this.autoApplyCheckbox,this.autoAdvanceCheckbox,this.useVisionCheckbox,this.toastStackingCheckbox].forEach(i=>i.disabled=e);let a=this.analyzeBtn?.closest(".eq-cta-wrapper");e?(a&&a.classList.add("is-running"),this.analyzeBtn&&(this.analyzeBtn.disabled=!1,this.analyzeBtn.classList.add("danger"),this.analyzeBtn.innerHTML=`<span class="eq-btn-icon">${L.stop}</span><span class="eq-btn-label">Parar Autopilot</span>`,this.analyzeBtn.title="Interromper o Resolver Autopilot"),this.applyBtn&&(this.applyBtn.disabled=!0),this.startStopwatch(),this.startQuestionTimer(),this.dotPulseAp&&(this.dotPulseAp.className="eq-dot-pulse busy"),this.dotPulseAdv&&(this.dotPulseAdv.className="eq-dot-pulse busy"),this.launcherDot&&(this.launcherDot.className="eq-launcher-dot busy"),this.setOperationState("Analisando...","busy"),this.metricsLiveStatus&&(this.metricsLiveStatus.textContent="Calculando...",this.metricsLiveStatus.className="eq-live-stopwatch-status is-busy"),t&&this.setStatus(t,"info")):(this.analyzeBtn&&(this.analyzeBtn.disabled=!1,this.analyzeBtn.classList.remove("danger"),this.analyzeBtn.innerHTML=`<span class="eq-btn-icon">${L.sparkles}</span><span class="eq-btn-label">Resolver Autopilot</span>`,this.analyzeBtn.title="Ligar o Resolver Autopilot"),this.applyBtn&&(this.applyBtn.disabled=!this.latestPlan||!this.latestPlan.actions.length),this.stopStopwatch(),this.stopQuestionTimer(),this.dotPulseAp&&(this.dotPulseAp.className="eq-dot-pulse"),this.dotPulseAdv&&(this.dotPulseAdv.className="eq-dot-pulse"),this.launcherDot&&(this.launcherDot.className="eq-launcher-dot"),this.setOperationState(this.autopilot.isActive()?"Monitorando":"Pronto","idle"),this.metricsLiveStatus&&this.metricsLiveStatus.textContent==="Calculando..."&&(this.metricsLiveStatus.textContent="Em espera",this.metricsLiveStatus.className="eq-live-stopwatch-status"))}_lastToastMsg="";_lastToastTime=0;_toastQueue=[];_toastVisible=[];_toastOverflowBtn=null;showToast(e,t="info",a=3500,i=!1){let s=Date.now(),r=t+":"+e;if(!i&&r===this._lastToastMsg&&s-this._lastToastTime<1500)return;this._lastToastMsg=r,this._lastToastTime=s;let n={success:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>',error:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>',warning:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>',info:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>'},d={success:"#22c55e",error:"#ef4444",warning:"#f59e0b",info:"#60a5fa"},c=d[t]||d.info,u=n[t]||n.info,m=this.initialSettings.toastStacking??!0,l={message:e,type:t,col:c,iconHtml:u,expiresAt:Date.now()+a};m&&this._toastQueue.push(l);let p=this.shadow.querySelector("#eq-toast-container");p||(p=document.createElement("div"),p.id="eq-toast-container",p.style.cssText="position:fixed;bottom:8px;left:12px;z-index:2147483647;display:flex;flex-direction:column-reverse;gap:5px;pointer-events:none;max-width:300px;",this.shadow.appendChild(p));let h=5,f=(w,y,E,T)=>{let C=document.createElement("div");C.style.cssText="display:flex;align-items:center;gap:8px;background:rgba(10,10,18,0.98);border:1px solid rgba(255,255,255,0.09);border-left:3px solid "+y+";padding:7px 12px 7px 10px;border-radius:7px;font-size:11px;color:rgba(235,240,248,0.92);font-family:inherit;box-shadow:0 4px 20px rgba(0,0,0,0.65),0 1px 4px rgba(0,0,0,0.4);pointer-events:all;max-width:296px;word-break:break-word;transform:translateX(-10px);opacity:0;transition:transform 0.22s cubic-bezier(0.34,1.5,0.64,1),opacity 0.16s ease;cursor:pointer;";let I=document.createElement("span");I.style.cssText="color:"+y+";display:inline-flex;flex-shrink:0;width:14px;height:14px;",I.innerHTML=E;let A=document.createElement("span");return A.textContent=w,A.style.flex="1",C.appendChild(I),C.appendChild(A),C};this._toastVisible=this._toastVisible.filter(w=>w.isConnected);let g=m?Math.max(0,this._toastQueue.filter(w=>w.expiresAt>Date.now()).length-h):0;if(m&&this._toastVisible.length>=h){this._updateToastOverflow(p,g);return}let b=f(e,c,u,a);p.appendChild(b),m&&this._toastVisible.push(b),requestAnimationFrame(()=>requestAnimationFrame(()=>{b.style.transform="translateX(0)",b.style.opacity="1"}));let v=()=>{b.style.transform="translateX(-10px)",b.style.opacity="0",setTimeout(()=>{b.remove(),m&&(this._toastVisible=this._toastVisible.filter(w=>w!==b),this._toastQueue=this._toastQueue.filter(w=>w.expiresAt>Date.now()),this._updateToastOverflow(p,Math.max(0,this._toastQueue.length-this._toastVisible.filter(w=>w.isConnected).length)))},200)},x=setTimeout(v,a);b.addEventListener("click",()=>{clearTimeout(x),v()},{once:!0}),m&&this._updateToastOverflow(p,g)}_updateToastOverflow(e,t){if(this._toastOverflowBtn&&(this._toastOverflowBtn.remove(),this._toastOverflowBtn=null),t<=0)return;let a=document.createElement("button");a.style.cssText="display:flex;align-items:center;gap:5px;background:rgba(14,14,20,0.92);border:1px solid rgba(255,255,255,0.1);border-radius:5px;font-size:10px;color:rgba(200,210,225,0.8);padding:4px 8px;cursor:pointer;pointer-events:all;font-family:inherit;",a.innerHTML=`<svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/></svg><span>+${t} notif.</span>`,a.addEventListener("click",()=>this._showToastHistory()),this._toastOverflowBtn=a,e.appendChild(a)}_showToastHistory(){let e=Date.now(),t=this._toastQueue.filter(s=>s.expiresAt>e);if(t.length===0)return;let a=this.shadow.querySelector("#eq-toast-container");if(!a)return;this._toastOverflowBtn&&(this._toastOverflowBtn.remove(),this._toastOverflowBtn=null);let i={success:"#22c55e",error:"#ef4444",warning:"#f59e0b",info:"#60a5fa"};for(let s of t){if(a.querySelectorAll(".eq-toast-hist").length>20)break;let r=document.createElement("div");r.className="eq-toast-hist",r.style.cssText=`display:flex;align-items:center;gap:7px;background:rgba(14,14,20,0.95);border:1px solid rgba(255,255,255,0.07);border-left:3px solid ${s.col};padding:5px 9px 5px 8px;border-radius:5px;font-size:10.5px;color:rgba(200,210,225,0.82);font-family:inherit;box-shadow:0 2px 10px rgba(0,0,0,0.4);pointer-events:all;max-width:288px;word-break:break-word;`;let n=document.createElement("span");n.style.cssText=`color:${s.col};display:inline-flex;flex-shrink:0;`,n.innerHTML=s.iconHtml;let d=document.createElement("span");d.textContent=s.message,d.style.flex="1";let c=document.createElement("span"),u=Math.ceil((s.expiresAt-e)/1e3);c.textContent=`${u}s`,c.style.cssText="color:rgba(150,160,180,0.5);font-size:9px;flex-shrink:0;",r.appendChild(n),r.appendChild(d),r.appendChild(c),r.addEventListener("click",()=>r.remove(),{once:!0}),a.appendChild(r),setTimeout(()=>r.remove(),Math.max(500,s.expiresAt-e))}}setStatus(e,t="info"){e&&e.length>4&&(t==="success"||t==="error")?this.showToast(e,t,3500):t==="warning"&&e.length>8?this.showToast(e,t,4e3):t==="info"&&e.length>10&&this.showToast(e,t,2400);let a=this.shadow.querySelector("#eq-status-summary");a&&(a.textContent=e),this.statusTextAp&&this.statusTextAp&&(this.statusTextAp.textContent=e),this.statusTextAdv&&this.statusTextAdv&&(this.statusTextAdv.textContent=e),t==="error"?(this.setOperationState("Bloqueado","error"),this.dotPulseAp&&(this.dotPulseAp.className="eq-dot-pulse error"),this.dotPulseAdv&&(this.dotPulseAdv.className="eq-dot-pulse error"),this.launcherDot&&(this.launcherDot.className="eq-launcher-dot error")):t==="warning"?(this.setOperationState("Interrompido","warning"),this.dotPulseAp&&(this.dotPulseAp.className="eq-dot-pulse stopped"),this.dotPulseAdv&&(this.dotPulseAdv.className="eq-dot-pulse stopped"),this.launcherDot&&(this.launcherDot.className="eq-launcher-dot stopped")):t==="success"?(this.setOperationState("Confirmado","success"),this.dotPulseAp&&(this.dotPulseAp.className="eq-dot-pulse"),this.dotPulseAdv&&(this.dotPulseAdv.className="eq-dot-pulse"),this.launcherDot&&(this.launcherDot.className="eq-launcher-dot")):this.isBusy?(this.setOperationState("Analisando...","busy"),this.dotPulseAp&&(this.dotPulseAp.className="eq-dot-pulse busy"),this.dotPulseAdv&&(this.dotPulseAdv.className="eq-dot-pulse busy"),this.launcherDot&&(this.launcherDot.className="eq-launcher-dot busy")):(this.setOperationState(this.autopilot.isActive()?"Monitorando":"Pronto","info"),this.dotPulseAp&&(this.dotPulseAp.className="eq-dot-pulse"),this.dotPulseAdv&&(this.dotPulseAdv.className="eq-dot-pulse"),this.launcherDot&&(this.launcherDot.className="eq-launcher-dot"));let i=e.includes("Alternando")||e.includes("indispon\xEDvel")||e.includes("fallback")||e.includes("alternativo"),s=t==="error"?"> [ERRO] ":t==="success"?"> [SUCESSO] ":t==="warning"?"> [PARADO] ":i?"> [FALLBACK] ":"> [SYS] ",r=t==="error"?"text-red":t==="success"?"text-green":t==="warning"||i?"text-yellow":"text-blue";this.logToConsole(`${s}${e}`,r)}setPlan(e,t){if(this.latestPlan=e,this.resultContainer.style.display="flex",e.durationMs&&this.stopStopwatch(e.durationMs),e.usedModel){let n=this.shadow.querySelector("#eq-active-model-badge");if(n){let d=e.usedModel.replace("gemini-","").replace("-latest","");n.textContent=`\u25CF ${d}`,n.style.display="inline-block"}}let a=this.shadow.querySelector("#eq-badges");if(a){a.replaceChildren();let n=document.createElement("span");n.className="eq-count-badge",n.textContent=String(e.actions.length),n.title=`${e.actions.length} a\xE7\xF5es \xB7 ${Math.round(e.confidence*100)}% confian\xE7a`,a.appendChild(n)}let i=this.shadow.querySelector("#eq-rationale-text");i.textContent=e.rationale;let s=this.shadow.querySelector("#eq-actions-list");s.innerHTML="";for(let n of e.actions){let d=document.createElement("div");d.className="eq-action-item";let c="";n.t==="chk"?c=`chk ${n.id} (${n.c})`:n.t==="val"?c=`val "${n.v}" -> ${n.id}`:n.t==="sel"?c=`sel "${Array.isArray(n.v)?n.v.join(","):n.v}" -> ${n.id}`:n.t==="clk"?c=`clk ${n.id}`:n.t==="adv"?c="adv":n.t==="js"?c=`js: ${String(n.v).slice(0,40)}...`:n.t==="drag"&&(c=`drag "${n.from}" -> "${n.to}"`);let u=document.createElement("span");u.className=`eq-action-badge t-${n.t}`,u.textContent=n.t.toUpperCase();let m=document.createElement("span");m.textContent=c,d.append(u,m),s.appendChild(d)}this.applyBtn&&(this.applyBtn.disabled=!t||!e.actions.length);let r=this.shadow.querySelector("#eq-execution-card");r&&(r.hidden=!0),e.imageDescriptions&&e.imageDescriptions.length>0&&(this.latestImageDescriptions=e.imageDescriptions),this.refreshInspectorView(),this.refreshDebugView()}setExecutionReport(e){let t=this.shadow.querySelector("#eq-execution-card"),a=this.shadow.querySelector("#eq-execution-summary"),i=this.shadow.querySelector("#eq-execution-list");if(!t||!a||!i)return;t.hidden=!1,a.textContent=e.navigationVerified?`${e.verified}/${e.applied} a\xE7\xF5es verificadas. Navega\xE7\xE3o confirmada.`:`${e.verified}/${e.applied} a\xE7\xF5es verificadas. ${e.navigationEvidence}`,a.className=`eq-execution-summary ${e.success?"is-success":"is-warning"}`,i.replaceChildren();let s=this.shadow.querySelector("#eq-execution-placeholder");s&&(s.textContent=e.navigationVerified?"Fluxo conclu\xEDdo: aplica\xE7\xE3o e navega\xE7\xE3o confirmadas.":`Fluxo interrompido: ${e.navigationEvidence}`,s.className=`eq-execution-placeholder ${e.success?"is-success":"is-warning"}`);for(let r of e.reports){let n=document.createElement("div");n.className=`eq-execution-row ${r.verified?"is-success":"is-failed"}`;let d=document.createElement("span");d.className="eq-execution-state",d.textContent=r.verified?"OK":"FALHOU";let c=document.createElement("div");c.className="eq-execution-details";let u=document.createElement("strong");u.textContent=r.target;let m=document.createElement("span");if(m.textContent=`${r.strategy} | ${r.evidence}`,c.append(u,m),n.append(d,c),r.error){let l=document.createElement("small");l.textContent=r.error,n.appendChild(l)}i.appendChild(n)}}setInspectorPrompt(e,t){this.latestPromptText=e,this.inspPrompt&&(this.inspPrompt.textContent=e),t&&this.inspModel&&(this.inspModel.textContent=t),this.inspLatency&&(this.inspLatency.textContent="Aguardando IA..."),this.activeTab==="debug"&&this.refreshDebugView()}refreshInspectorView(){let e=this.latestPlan;this.inspModel&&(this.inspModel.textContent=e?.usedModel||this.initialSettings.model),this.inspLatency&&(this.inspLatency.textContent=e?.durationMs?`${e.durationMs}ms`:"--"),this.inspTokens&&(this.inspTokens.textContent=e?.tokensUsed?`${e.tokensUsed}`:"--"),this.inspPrompt&&(this.inspPrompt.textContent=e?.promptSent||this.latestPromptText||""),this.inspRationale&&(this.inspRationale.textContent=e?.rationale||""),this.renderBrainExplorer(),this.brainActiveTab&&this.renderBrainFileContent(this.brainActiveTab)}brainOpenTabs=[];brainActiveTab=null;brainSelectedFolder=null;brainOpenFolders=new Set(["folder-ia","folder-ctx","folder-meta"]);brainCanvasHidden=!1;brainCanvasHeight=280;GLOBAL_ID="__global__";GLOBAL_LABEL="Contexto Global";getBrainFileColor(e){return{file:"#7eb8f7",code:"#f4c96a",list:"#a5d6a7",chip:"#80cbc4",sparkles:"#ce93d8",clock:"#ffcc80",info:"#81deea"}[e]||"#9e9e9e"}renderMarkdown(e){let t=u=>u.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"),a="",i=e.split(`
`),s=!1,r="",n=[],d=()=>{if(!s)return"";s=!1;let u=n.join(`
`);return n=[],`<div class="eq-md-codeblock"><div class="eq-md-codelang">${t(r)}</div><pre><code>${t(u)}</code></pre></div>`},c=u=>u.replace(/`([^`]+)`/g,(m,l)=>`<code class="eq-md-inline">${t(l)}</code>`).replace(/\*\*\*([^*]+)\*\*\*/g,(m,l)=>`<strong><em>${t(l)}</em></strong>`).replace(/\*\*([^*]+)\*\*/g,(m,l)=>`<strong>${t(l)}</strong>`).replace(/\*([^*]+)\*/g,(m,l)=>`<em>${t(l)}</em>`).replace(/~~([^~]+)~~/g,(m,l)=>`<del>${t(l)}</del>`);for(let u of i){if(/^```/.test(u)){s?a+=d():(s=!0,r=u.slice(3).trim()||"text",n=[]);continue}if(s){n.push(u);continue}let m=u.match(/^#s+(.+)/),l=u.match(/^##s+(.+)/),p=u.match(/^###s+(.+)/);if(p){a+=`<h3 class="eq-md-h3">${c(p[1])}</h3>`;continue}if(l){a+=`<h2 class="eq-md-h2">${c(l[1])}</h2>`;continue}if(m){a+=`<h1 class="eq-md-h1">${c(m[1])}</h1>`;continue}let h=u.match(/^>s*(.*)/);if(h){a+=`<blockquote class="eq-md-bq">${c(h[1])}</blockquote>`;continue}if(/^---+$/.test(u)){a+='<hr class="eq-md-hr">';continue}let f=u.match(/^[-*+]s+(.+)/);if(f){a+=`<div class="eq-md-li"><span class="eq-md-bullet">\xB7</span><span>${c(f[1])}</span></div>`;continue}if(u.trim()===""){a+='<div class="eq-md-gap"></div>';continue}a+=`<div class="eq-md-p">${c(t(u))}</div>`}return a+=d(),a}getBrainFolders(){let e=this.latestPlan,t=this.latestImages.map((i,s)=>({id:"img-"+s,label:"img-"+(s+1)+"."+(i.mediaType?.split("/")?.[1]||"jpg"),icon:"image"})),a=[{id:"folder-ia",label:"Resposta da IA",files:[{id:"rationale",label:"rationale.md",icon:"file"},{id:"actions",label:"actions.json",icon:"code"},{id:"summary",label:"resumo.txt",icon:"list"}]},{id:"folder-ctx",label:"Contexto & Prompt",files:[{id:"prompt",label:"prompt-enviado.txt",icon:"file"},{id:"rag",label:"rag-context.txt",icon:"chip"}]},{id:"folder-meta",label:"Metadados",files:[{id:"meta-model",label:"modelo.info",icon:"sparkles"},{id:"meta-latency",label:"latencia.info",icon:"clock"},{id:"meta-tokens",label:"tokens.info",icon:"info"}]}];return e?.executionResult&&a.push({id:"folder-exec",label:"Execu\xE7\xE3o",files:[{id:"exec-steps",label:"steps.log",icon:"list"},{id:"exec-result",label:"resultado.log",icon:"file"}]}),a.push({id:"folder-media",label:"M\xEDdia",files:[],subfolders:[{id:"media-images",label:"Imagens",icon:"image",files:t}]}),a}getActiveFolder(){if(!this.brainActiveTab)return null;for(let e of this.getBrainFolders()){if(e.files.some(t=>t.id===this.brainActiveTab))return e.id;for(let t of e.subfolders||[])if(t.files.some(a=>a.id===this.brainActiveTab))return t.id}return null}smartCopy(){let e=this.shadow.querySelector("#eq-brain-content");if(this.brainActiveTab&&this.brainActiveTab.startsWith("img-")){let a=parseInt(this.brainActiveTab.slice(4),10),i=this.latestImages[a];if(i?.base64){let s="data:"+(i.mediaType||"image/jpeg")+";base64,"+i.base64,r=this.latestImageDescriptions.find(d=>d.index===a),n=["[EasyQuiz] Imagem "+(a+1)+" de "+this.latestImages.length,"Status: "+(i.captureStatus||"desconhecido"),"Tipo: "+(i.mediaType||"--"),i.alt?"Alt: "+i.alt:"",i.source?"Fonte: "+i.source:"",r?.description?"Analise IA: "+r.description:"",i.textContext?"Contexto: "+i.textContext:"","Data URI: "+s.slice(0,80)+"..."].filter(Boolean).join(`
`);navigator.clipboard.writeText(n).then(()=>this.showToast("Imagem copiada (URI + metadados)","success",2500));return}}if(this.brainSelectedFolder==="media-images"){let a=["[EasyQuiz] Imagens capturadas: "+this.latestImages.length];this.latestImages.forEach((i,s)=>{let r=this.latestImageDescriptions.find(n=>n.index===s);a.push(s+1+". "+(i.captureStatus||"?")+(r?.description?" \u2014 "+r.description.slice(0,80):""))}),navigator.clipboard.writeText(a.join(`
`)).then(()=>this.showToast("Lista de imagens copiada","success",2500));return}if(this.brainActiveTab){let a=this.getBrainFileText(this.brainActiveTab);if(a){navigator.clipboard.writeText(a).then(()=>this.showToast("Conte\xFAdo copiado","success",2200));return}}if(this.brainSelectedFolder){let a=e?.innerText?.trim()||"";if(a){navigator.clipboard.writeText(a).then(()=>this.showToast("Estrutura copiada","success",2200));return}}let t=e?.innerText?.trim()||"";t?navigator.clipboard.writeText(t).then(()=>this.showToast("Conte\xFAdo copiado","success",2200)):this.showToast("Nada selecionado para copiar","warning",2e3)}initBrainControls(){let e=this.shadow.querySelector("#eq-brain-resize-handle"),t=this.shadow.querySelector(".eq-brain-canvas"),a=this.shadow.querySelector("#eq-brain-canvas-toggle"),i=this.shadow.querySelector("#eq-copy-prompt-btn");if(a&&(a.innerHTML=this.brainCanvasHidden?L.eyeOff:L.eye,a.title=this.brainCanvasHidden?"Mostrar visualizador":"Ocultar visualizador"),!this._brainControlsInited){if(this._brainControlsInited=!0,e&&t){let s=0,r=0;e.addEventListener("mousedown",n=>{n.preventDefault(),s=n.clientY,r=t.getBoundingClientRect().height;let d=u=>{let m=Math.max(100,Math.min(520,r+u.clientY-s));t.style.height=m+"px",this.brainCanvasHeight=m},c=()=>{window.removeEventListener("mousemove",d),window.removeEventListener("mouseup",c)};window.addEventListener("mousemove",d),window.addEventListener("mouseup",c)})}a&&t&&a.addEventListener("click",()=>{this.brainCanvasHidden=!this.brainCanvasHidden;let s=this.shadow.querySelector("#eq-brain-resize-handle");this.brainCanvasHidden?(t.classList.add("is-hidden"),a.innerHTML=L.eyeOff,a.title="Mostrar visualizador",s&&(s.style.display="none")):(t.classList.remove("is-hidden"),a.innerHTML=L.eye,a.title="Ocultar visualizador",s&&(s.style.display=""))}),i&&i.addEventListener("click",()=>this.smartCopy())}}copyCurrentContent(){this.smartCopy()}getBrainFileText(e){if(e===this.GLOBAL_ID)return this.buildGlobalContext();if(e==="ai-prompt")return this.latestPromptText||this.latestPlan?.promptSent||""||"// Nenhum prompt enviado ainda. Execute o Autopilot para gerar.";if(e==="ai-context"){let i=this.latestContext;if(!i)return"// Aguardando captura de contexto pelo EasyQuiz...";let s={scope:i.scope.tagName.toLowerCase()+(i.scope.id?"#"+i.scope.id:"")+(i.scope.className?"."+i.scope.className.split(" ").join("."):""),questionLength:i.questionText.length,questionSnippet:i.questionText.slice(0,200)+(i.questionText.length>200?"...":""),controlsCount:i.controls.length,controls:i.controls.map((r,n)=>({index:n+1,tag:r.tag,type:r.type,name:r.name||void 0,id:r.id||void 0,value:r.value||void 0,label:r.label||void 0,role:r.role}))};return JSON.stringify(s,null,2)}if(e==="ai-response"){let i=this.latestPlan;return i?i.rawResponse||JSON.stringify({pageType:i.pageType,mode:i.mode,confidence:i.confidence,rationale:i.rationale,actions:i.actions},null,2):"// Aguardando retorno da API..."}if(e.startsWith("img-")){let i=parseInt(e.slice(4),10),s=this.latestImages[i];if(!s)return"Imagem n\xE3o encontrada.";let r=this.latestImageDescriptions.find(n=>n.index===i);return[`Imagem ${i+1} de ${this.latestImages.length}`,`Status: ${s.captureStatus||"desconhecido"}`,`Relev\xE2ncia: ${r?.relevant??!0?"Relevante":"Ignorada"}`,`Tipo: ${s.mediaType||"--"}`,s.alt?`Alt: ${s.alt}`:"",s.source?`Fonte: ${s.source}`:"",s.associatedLabel?`R\xF3tulo: ${s.associatedLabel}`:"",r?.description?`
An\xE1lise IA: ${r.description}`:"",s.textContext?`
Contexto textual: ${s.textContext}`:""].filter(Boolean).join(`
`)}let t=this.latestPlan;return{rationale:t?.rationale||"Aguardando racioc\xEDnio da IA (ou extra\xE7\xE3o em andamento)...",actions:t?.actions?.length?JSON.stringify(t.actions,null,2):"// Nenhuma a\xE7\xE3o planejada no momento.",summary:t?`Modo: ${t.mode||"auto"}
Confian\xE7a: ${Math.round((t.confidence||0)*100)}%
A\xE7\xF5es: ${t.actions?.length||0}
Modelo: ${t.usedModel||"--"}`:"Aguardando primeira an\xE1lise completa...",prompt:t?.promptSent||this.latestPromptText||"Nenhum prompt em mem\xF3ria. A IA ainda n\xE3o foi acionada.",rag:t?.ragContext||"Nenhuma mem\xF3ria estendida usada ou capturada.","meta-model":`Modelo Ativo: ${t?.usedModel||this.initialSettings.model||"--"}`,"meta-latency":t?.durationMs?`Lat\xEAncia: ${t.durationMs}ms`:"Lat\xEAncia: --","meta-tokens":t?.tokensUsed?`Tokens: ${t.tokensUsed}`:"Tokens: --","exec-steps":t?.executionResult?.steps?.map(i=>JSON.stringify(i)).join(`
`)||"Passos de execu\xE7\xE3o ainda n\xE3o iniciados.","exec-result":t?.executionResult?JSON.stringify(t.executionResult,null,2):"Aguardando resultado de execu\xE7\xE3o..."}[e]??"Conte\xFAdo n\xE3o dispon\xEDvel para este arquivo."}buildGlobalContext(){let e=this.latestPlan,t=this.latestContext,a=this.latestImages,i=r=>String(r??"-- sem dados --"),s=["# Vis\xE3o Global \u2014 EasyQuiz","",`**URL:** ${window.location.href}`,`**T\xEDtulo:** ${document.title}`,`**M\xEDdias Capturadas:** ${a.length} imagem(ns)`,"","---","","## Status da Extra\xE7\xE3o Local","","### Texto do Enunciado Detectado",t?t.questionText:"Aguardando captura do DOM...","","### Controles (Alternativas/Bot\xF5es)",t&&t.controls.length>0?t.controls.map(r=>`- [${r.type}] ${r.label||r.id||r.name||r.value||"Sem r\xF3tulo"}`).join(`
`):"Nenhum controle capturado ainda.","","---","","## Resposta da IA","","### Racioc\xEDnio (Rationale)",i(e?.rationale||"Aguardando an\xE1lise da IA..."),"","### A\xE7\xF5es a Executar",e?.actions?.length?JSON.stringify(e.actions,null,2):"// Nenhuma a\xE7\xE3o planejada no momento.","","### Resumo",e?`- Modo: ${e.mode||"auto"}
- Confian\xE7a: ${Math.round((e.confidence||0)*100)}%
- Total de a\xE7\xF5es: ${e.actions?.length||0}
- Modelo: ${e.usedModel||"--"}`:"Aguardando primeira an\xE1lise...","","---","","## Inje\xE7\xE3o & Metadados","","### Prompt Enviado (Raw)",i(e?.promptSent||this.latestPromptText||"Nenhum prompt em mem\xF3ria."),"","### Contexto RAG Acumulado",i(e?.ragContext||"Nenhuma mem\xF3ria estendida usada."),"",`- **Modelo Configurado:** ${e?.usedModel||this.initialSettings.model||"--"}`,`- **Lat\xEAncia \xDAltimo Call:** ${e?.durationMs?e.durationMs+"ms":"--"}`,`- **Tokens Consumidos:** ${e?.tokensUsed??"--"}`,""];return e?.executionResult&&(s.push("---","","## Execu\xE7\xE3o Autom\xE1tica (Autopilot)",""),s.push("### Steps (Passo a Passo)"),s.push(e.executionResult?.steps?.map(r=>JSON.stringify(r)).join(`
`)||"Sem passos."),s.push("","### Resultado Final"),s.push(JSON.stringify(e.executionResult,null,2))),s.join(`
`)}renderBrainExplorer(){let e=this.shadow.querySelector("#eq-brain-explorer");if(!e)return;e.innerHTML="";let t=this.getActiveFolder(),a=document.createElement("div");a.className="eq-tree-file eq-tree-global"+(this.brainActiveTab===this.GLOBAL_ID?" is-selected":""),a.innerHTML=`<span class="eq-tree-ficon" style="color:#60a5fa">${L.folderTree}</span><span class="eq-tree-label">${this.GLOBAL_LABEL}</span>`,a.addEventListener("click",()=>{this.brainSelectedFolder=null,this.openBrainFile(this.GLOBAL_ID,this.GLOBAL_LABEL)}),e.appendChild(a);let i=document.createElement("div");i.className="eq-tree-sep",e.appendChild(i);for(let s of this.getBrainFolders()){let r=this.brainOpenFolders.has(s.id),n=this.brainSelectedFolder===s.id||t===s.id,d=document.createElement("div");d.className="eq-tree-folder"+(n?" is-folder-sel":"");let c=document.createElement("span");c.className="eq-tree-arrow",c.innerHTML=r?L.chevronDown:L.chevronRight,c.addEventListener("click",h=>{h.stopPropagation(),this.brainOpenFolders.has(s.id)?this.brainOpenFolders.delete(s.id):this.brainOpenFolders.add(s.id),this.renderBrainExplorer()}),d.appendChild(c);let u=document.createElement("span");u.className="eq-tree-ficon",u.style.color="#fbbf24",u.innerHTML=L.folder;let m=document.createElement("span");m.className="eq-tree-label",m.textContent=s.label,d.appendChild(u),d.appendChild(m),d.addEventListener("click",()=>{this.brainSelectedFolder=s.id,this.brainActiveTab=null,this.showFolderContent(s),this.renderBrainExplorer(),this.renderBrainTabs()}),e.appendChild(d);let l=document.createElement("div"),p=s.files.length+(s.subfolders?.reduce((h,f)=>h+f.files.length+1,0)??0);l.className="eq-tree-children"+(r?" is-open":""),l.style.setProperty("--child-count",String(p));for(let h of s.files){let f=this.getBrainFileColor(h.icon),g=document.createElement("div");g.className="eq-tree-file"+(this.brainActiveTab===h.id?" is-selected":""),g.innerHTML=`<span class="eq-tree-ficon" style="color:${f}">${L[h.icon]||L.file}</span><span class="eq-tree-label">${h.label}</span>`,g.addEventListener("click",b=>{b.stopPropagation(),this.brainSelectedFolder=null,this.openBrainFile(h.id,h.label)}),l.appendChild(g)}for(let h of s.subfolders||[]){let f=this.brainOpenFolders.has(h.id),g=this.brainSelectedFolder===h.id,b=document.createElement("div");b.className="eq-tree-folder eq-tree-subfolder"+(g?" is-folder-sel":""),b.style.paddingLeft="18px";let v=document.createElement("span");v.className="eq-tree-arrow",v.innerHTML=f?L.chevronDown:L.chevronRight,v.addEventListener("click",T=>{T.stopPropagation(),this.brainOpenFolders.has(h.id)?this.brainOpenFolders.delete(h.id):this.brainOpenFolders.add(h.id),this.renderBrainExplorer()}),b.appendChild(v);let x=document.createElement("span");x.className="eq-tree-ficon",x.style.color="#60a5fa",x.innerHTML=L[h.icon]||L.folder;let w=document.createElement("span");w.className="eq-tree-label",w.textContent=h.label;let y=document.createElement("span");y.style.cssText="font-size:9px;color:#666;margin-left:4px;flex-shrink:0;",y.textContent=String(h.files.length),b.appendChild(x),b.appendChild(w),b.appendChild(y),b.addEventListener("click",()=>{this.brainSelectedFolder=h.id,this.brainActiveTab=null,this.brainOpenFolders.add(h.id),this.showSubfolderContent(h),this.renderBrainExplorer(),this.renderBrainTabs()}),l.appendChild(b);let E=document.createElement("div");E.className="eq-tree-children"+(f?" is-open":""),E.style.setProperty("--child-count",String(h.files.length));for(let T of h.files){let C=this.getBrainFileColor(T.icon),I=document.createElement("div");I.className="eq-tree-file"+(this.brainActiveTab===T.id?" is-selected":""),I.style.paddingLeft="32px",I.innerHTML=`<span class="eq-tree-ficon" style="color:${C}">${L[T.icon]||L.file}</span><span class="eq-tree-label">${T.label}</span>`,I.addEventListener("click",A=>{A.stopPropagation(),this.brainSelectedFolder=null,this.openBrainFile(T.id,T.label)}),E.appendChild(I)}l.appendChild(E)}e.appendChild(l)}}showFolderContent(e){let t=this.shadow.querySelector("#eq-brain-content");if(!t)return;t.innerHTML="";let a=n=>String(n??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"),i=document.createElement("div");i.className="eq-folder-view";let s=document.createElement("div");s.className="eq-folder-view-header",s.innerHTML=`<span class="eq-tree-ficon" style="color:#fbbf24">${L.folder}</span><span>${a(e.label)}</span>`,i.appendChild(s);let r=document.createElement("div");r.className="eq-folder-view-files";for(let n of e.files){let d=this.getBrainFileColor(n.icon),c=document.createElement("div");c.className="eq-folder-view-row",c.innerHTML=`<span class="eq-tree-ficon" style="color:${d}">${L[n.icon]||L.file}</span><span>${a(n.label)}</span>`,c.addEventListener("click",()=>this.openBrainFile(n.id,n.label)),r.appendChild(c)}for(let n of e.subfolders||[]){let d=document.createElement("div");d.className="eq-folder-view-row",d.style.cssText="display:flex;align-items:center;gap:6px;padding:7px 10px;cursor:pointer;border-radius:5px;";let c=n.id==="media-images"?this.latestImages.length:n.files.length;d.innerHTML=`<span class="eq-tree-ficon" style="color:#60a5fa">${L[n.icon]||L.folder}</span><span style="flex:1">${a(n.label)}</span><span style="font-size:9px;color:#555;">${c} item${c!==1?"s":""}</span>`,d.addEventListener("mouseenter",()=>{d.style.background="rgba(255,255,255,0.04)"}),d.addEventListener("mouseleave",()=>{d.style.background=""}),d.addEventListener("click",()=>{this.brainSelectedFolder=n.id,this.brainActiveTab=null,this.brainOpenFolders.add(n.id),this.showSubfolderContent(n),this.renderBrainExplorer(),this.renderBrainTabs()}),r.appendChild(d)}i.appendChild(r),t.appendChild(i)}openBrainFile(e,t){if(this.brainOpenTabs.find(a=>a.id===e)||this.brainOpenTabs.push({id:e,label:t}),this.brainActiveTab=e,this.brainCanvasHidden){let a=this.shadow.querySelector(".eq-brain-canvas"),i=this.shadow.querySelector("#eq-brain-canvas-toggle");a?.classList.remove("is-hidden"),i&&(i.innerHTML=L.eye,i.title="Ocultar visualizador"),this.brainCanvasHidden=!1}this.renderBrainExplorer(),this.renderBrainTabs(),this.renderBrainFileContent(e)}showSubfolderContent(e){e.id==="media-images"?this.showMediaGrid():this.showFolderContent(e)}showMediaGrid(){let e=this.shadow.querySelector("#eq-brain-content");if(!e)return;e.innerHTML="";let t=this.latestImages,a=this.latestImageDescriptions,i=document.createElement("div");i.style.cssText="display:flex;flex-direction:column;height:100%;overflow:hidden;";let s=document.createElement("div");s.style.cssText="padding:8px 12px;font-size:10px;color:#666;border-bottom:1px solid rgba(255,255,255,0.06);display:flex;justify-content:space-between;flex-shrink:0;",s.innerHTML=`<span style="color:#60a5fa;font-weight:600;">Imagens</span><span>${t.length} captura${t.length!==1?"s":""}</span>`,i.appendChild(s);let r=document.createElement("div");if(r.style.cssText="flex:1;overflow-y:auto;padding:10px;",t.length===0)r.innerHTML='<div style="text-align:center;padding:32px 0;color:#555;font-size:11px;">Nenhuma imagem capturada.<br><span style="opacity:0.6;font-size:10px;">Ative "Vis\xE3o Computacional" nas configura\xE7\xF5es e execute uma an\xE1lise.</span></div>';else{let n=document.createElement("div");n.style.cssText="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;",t.forEach((d,c)=>{let m=a.find(f=>f.index===c)?.relevant??!0,l=d.base64?`data:${d.mediaType||"image/jpeg"};base64,${d.base64}`:"",p=document.createElement("div");if(p.style.cssText=`position:relative;aspect-ratio:1;border-radius:5px;overflow:hidden;cursor:pointer;background:#111;border:2px solid ${m?"rgba(96,165,250,0.3)":"rgba(255,255,255,0.06)"};transition:border-color 0.15s,transform 0.12s;`,l){let f=document.createElement("img");f.src=l,f.style.cssText="width:100%;height:100%;object-fit:cover;display:block;",p.appendChild(f)}else{let f=document.createElement("div");f.style.cssText="width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:#555;font-size:10px;",f.textContent="Texto",p.appendChild(f)}let h=document.createElement("div");h.style.cssText="position:absolute;bottom:3px;right:3px;background:rgba(0,0,0,0.75);border-radius:3px;padding:1px 4px;font-size:9px;color:#aaa;",h.textContent=String(c+1),p.appendChild(h),p.addEventListener("mouseenter",()=>{p.style.transform="scale(1.03)",p.style.borderColor="#60a5fa"}),p.addEventListener("mouseleave",()=>{p.style.transform="",p.style.borderColor=m?"rgba(96,165,250,0.3)":"rgba(255,255,255,0.06)"}),p.addEventListener("click",()=>{this.brainSelectedFolder=null,this.openBrainFile("img-"+c,"img-"+(c+1)+"."+(d.mediaType?.split("/")?.[1]||"jpg"))}),n.appendChild(p)}),r.appendChild(n)}i.appendChild(r),e.appendChild(i)}showImageFile(e){let t=this.shadow.querySelector("#eq-brain-content");if(!t)return;t.innerHTML="";let a=this.latestImages[e];if(!a){t.innerHTML='<div style="padding:16px;color:#666;font-size:11px;">Imagem n\xE3o encontrada.</div>';return}let i=this.latestImageDescriptions.find(p=>p.index===e),s=a.base64?`data:${a.mediaType||"image/jpeg"};base64,${a.base64}`:"",r=i?.relevant??!0,n=a.captureStatus==="captured"?"Visual":a.captureStatus==="text_only"?"Texto":"Falhou",d=a.captureStatus==="captured"?"#4ade80":a.captureStatus==="text_only"?"#fbbf24":"#ef4444",c=document.createElement("div");c.style.cssText="display:flex;flex-direction:column;height:100%;overflow:hidden;";let u=document.createElement("div");if(u.style.cssText="flex:0 0 auto;background:#0a0a0f;display:flex;align-items:center;justify-content:center;padding:10px;min-height:140px;max-height:55%;cursor:zoom-in;border-bottom:1px solid rgba(255,255,255,0.06);position:relative;overflow:hidden;",s){let p=document.createElement("img");p.src=s,p.alt=a.alt||`Imagem ${e+1}`,p.style.cssText="max-width:100%;max-height:100%;object-fit:contain;border-radius:4px;transform-origin:center center;transition:transform 0.12s ease;user-select:none;",u.appendChild(p);let h=1,f=.5,g=4;u.addEventListener("wheel",x=>{x.preventDefault(),x.stopPropagation();let w=x.deltaY>0?-.15:.15;h=Math.min(g,Math.max(f,h+w)),p.style.transform=h===1?"":`scale(${h.toFixed(2)})`,u.style.cursor=h>1?"grab":"zoom-in";let y=u.querySelector(".eq-zoom-hint");y&&(y.textContent=h!==1?`${Math.round(h*100)}% \xB7 scroll para zoom \xB7 clique para ampliar`:"scroll para zoom \xB7 clique para ampliar")},{passive:!1}),u.addEventListener("click",()=>this.openImageLightbox(e));let b=document.createElement("div");b.className="eq-zoom-hint",b.style.cssText="position:absolute;bottom:6px;right:8px;font-size:9px;color:rgba(255,255,255,0.3);pointer-events:none;",b.textContent="scroll para zoom \xB7 clique para ampliar",u.appendChild(b);let v=this.latestImages.length;if(v>1){let x=w=>{let y=document.createElement("button");return y.style.cssText=`position:absolute;${w==="prev"?"left:6px":"right:6px"};top:50%;transform:translateY(-50%);background:rgba(0,0,0,0.55);border:1px solid rgba(255,255,255,0.12);color:var(--eq-text);width:24px;height:24px;border-radius:50%;cursor:pointer;font-size:13px;z-index:5;display:flex;align-items:center;justify-content:center;transition:background 0.12s;`,y.innerHTML=w==="prev"?"\u2039":"\u203A",y.title=w==="prev"?"Imagem anterior":"Pr\xF3xima imagem",y.style.display=w==="prev"&&e===0||w==="next"&&e===v-1?"none":"flex",y.addEventListener("mouseenter",()=>{y.style.background="rgba(96,165,250,0.3)"}),y.addEventListener("mouseleave",()=>{y.style.background="rgba(0,0,0,0.55)"}),y.addEventListener("click",E=>{E.stopPropagation();let T=w==="prev"?e-1:e+1;if(T>=0&&T<v){this.brainActiveTab="img-"+T;let C=this.latestImages[T],I="img-"+(T+1)+"."+(C?.mediaType?.split("/")?.[1]||"jpg");this.brainOpenTabs.find(A=>A.id==="img-"+T)||this.brainOpenTabs.push({id:"img-"+T,label:I}),this.renderBrainExplorer(),this.renderBrainTabs(),this.showImageFile(T)}}),y};u.appendChild(x("prev")),u.appendChild(x("next"))}}else u.style.cssText+="color:#555;font-size:11px;",u.textContent="Sem dados visuais \u2014 captura em modo texto";c.appendChild(u);let m=document.createElement("div");m.style.cssText="flex:1;overflow-y:auto;padding:10px 12px;display:flex;flex-direction:column;gap:7px;";let l=(p,h,f="#aaa")=>{let g=document.createElement("div");return g.style.cssText="display:flex;gap:8px;font-size:10.5px;",g.innerHTML=`<span style="color:#555;min-width:72px;flex-shrink:0;">${p}</span><span style="color:${f};word-break:break-word;">${h}</span>`,g};if(m.appendChild(l("\xCDndice",`Imagem ${e+1} de ${this.latestImages.length}`)),m.appendChild(l("Status",n,d)),m.appendChild(l("Relev\xE2ncia",r?"Relevante":"Ignorada",r?"#60a5fa":"#666")),m.appendChild(l("Tipo",a.mediaType||"--")),a.alt&&m.appendChild(l("Alt text",a.alt)),a.source&&m.appendChild(l("Fonte",a.source)),a.associatedLabel&&m.appendChild(l("R\xF3tulo",a.associatedLabel)),i?.description){let p=document.createElement("div");p.style.cssText="background:rgba(96,165,250,0.06);border:1px solid rgba(96,165,250,0.15);border-radius:5px;padding:8px;",p.innerHTML=`<div style="font-size:9px;color:#60a5fa;font-weight:600;margin-bottom:4px;">AN\xC1LISE DA IA</div><div style="font-size:10.5px;color:var(--eq-text);line-height:1.55;">${i.description}</div>`,m.appendChild(p)}if(a.textContext){let p=document.createElement("div");p.style.cssText="background:rgba(251,191,36,0.05);border:1px solid rgba(251,191,36,0.12);border-radius:5px;padding:8px;",p.innerHTML=`<div style="font-size:9px;color:#fbbf24;font-weight:600;margin-bottom:4px;">CONTEXTO TEXTUAL</div><div style="font-size:10.5px;color:var(--eq-text);line-height:1.55;">${a.textContext}</div>`,m.appendChild(p)}c.appendChild(m),t.appendChild(c)}openImageLightbox(e){let t=this.latestImages[e];if(!t)return;let a=this.latestImageDescriptions.find(y=>y.index===e),i=t.base64?`data:${t.mediaType||"image/jpeg"};base64,${t.base64}`:"";this.shadow.querySelector("#eq-img-lightbox")?.remove();let s=document.createElement("div");s.id="eq-img-lightbox",s.style.cssText="position:fixed;inset:0;z-index:2147483647;background:rgba(0,0,0,0.92);display:flex;align-items:center;justify-content:center;padding:20px;box-sizing:border-box;";let r=document.createElement("div");r.style.cssText="display:flex;width:min(90vw,1100px);max-height:90vh;border-radius:10px;background:#0f0f17;border:1px solid rgba(255,255,255,0.1);box-shadow:0 24px 64px rgba(0,0,0,0.8);position:relative;overflow:hidden;";let n=document.createElement("div");n.style.cssText="position:absolute;top:0;left:0;right:0;z-index:20;display:flex;align-items:center;justify-content:space-between;padding:7px 12px;background:rgba(0,0,0,0.6);backdrop-filter:blur(4px);border-bottom:1px solid rgba(255,255,255,0.07);border-radius:10px 10px 0 0;";let d=document.createElement("span");d.style.cssText="font-size:11px;color:rgba(234,240,248,0.45);font-weight:600;letter-spacing:0.04em;user-select:none;",d.textContent="Imagem "+(e+1)+" de "+this.latestImages.length;let c=document.createElement("button");c.style.cssText="background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.14);color:rgba(234,240,248,0.65);width:26px;height:26px;border-radius:6px;cursor:pointer;font-size:16px;display:flex;align-items:center;justify-content:center;line-height:1;transition:background 0.15s,color 0.15s;flex-shrink:0;",c.textContent="\xD7",c.title="Fechar (ESC)",c.addEventListener("mouseenter",()=>{c.style.background="rgba(239,68,68,0.32)",c.style.color="#fff"}),c.addEventListener("mouseleave",()=>{c.style.background="rgba(255,255,255,0.08)",c.style.color="rgba(234,240,248,0.65)"}),n.appendChild(d),n.appendChild(c);let u=document.createElement("div");if(u.style.cssText="flex:0 0 65%;display:flex;align-items:center;justify-content:center;background:#050508;padding:16px;min-width:0;overflow:hidden;position:relative;",i){let y=document.createElement("img");y.src=i,y.style.cssText="max-width:100%;max-height:82vh;object-fit:contain;border-radius:4px;transform-origin:center center;transition:transform 0.1s ease;user-select:none;display:block;";let E=1,T=.3,C=6;u.addEventListener("wheel",A=>{A.preventDefault(),A.stopPropagation();let S=A.deltaY<0?.18:-.18;E=Math.min(C,Math.max(T,E+S)),y.style.transform=`scale(${E.toFixed(3)})`,y.style.cursor=E>1?"grab":"default",I.textContent=`${Math.round(E*100)}%`,I.style.opacity="1",clearTimeout(u._zt),u._zt=setTimeout(()=>{I.style.opacity="0"},1200)},{passive:!1}),y.addEventListener("dblclick",()=>{E=1,y.style.transform="",y.style.cursor="default",I.textContent="100%",I.style.opacity="1",setTimeout(()=>{I.style.opacity="0"},800)});let I=document.createElement("div");I.style.cssText="position:absolute;bottom:10px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,0.7);color:#aaa;font-size:10px;padding:2px 8px;border-radius:10px;pointer-events:none;opacity:0;transition:opacity 0.3s;",I.textContent="100%",u.appendChild(y),u.appendChild(I)}else u.innerHTML='<div style="color:#555;font-size:12px;text-align:center;width:100%;">Sem dados visuais</div>';u.style.paddingTop="44px",r.appendChild(u);let m=document.createElement("div");m.style.cssText="flex:0 0 35%;overflow-y:auto;padding:20px 16px 20px;border-left:1px solid rgba(255,255,255,0.06);display:flex;flex-direction:column;gap:8px;min-width:0;";let l=document.createElement("div");l.style.cssText="font-size:13px;font-weight:700;color:var(--eq-text-bright);margin-bottom:6px;",l.textContent=`Imagem ${e+1} de ${this.latestImages.length}`,m.appendChild(l);let p=t.captureStatus==="captured"?"#4ade80":t.captureStatus==="text_only"?"#fbbf24":"#ef4444",h=t.captureStatus==="captured"?"Visual":t.captureStatus==="text_only"?"Texto":"Falhou",f=(y,E,T="#aaa")=>{let C=document.createElement("div");return C.style.cssText="display:flex;gap:6px;font-size:10px;",C.innerHTML=`<span style="color:#555;min-width:64px;flex-shrink:0;">${y}</span><span style="color:${T};word-break:break-word;">${E}</span>`,C};m.appendChild(f("Status",h,p)),m.appendChild(f("Relev\xE2ncia",a?.relevant??!0?"Relevante":"Ignorada",a?.relevant??!0?"#60a5fa":"#666")),m.appendChild(f("Tipo",t.mediaType||"--")),t.alt&&m.appendChild(f("Alt",t.alt)),t.source&&m.appendChild(f("Fonte",t.source)),t.associatedLabel&&m.appendChild(f("R\xF3tulo",t.associatedLabel));let g=document.createElement("div");if(g.style.cssText="font-size:9px;color:#444;margin-top:4px;",g.textContent="Scroll na imagem para zoom \xB7 Duplo-clique para resetar",m.appendChild(g),a?.description){let y=document.createElement("div");y.style.cssText="background:rgba(96,165,250,0.07);border:1px solid rgba(96,165,250,0.18);border-radius:5px;padding:8px;margin-top:4px;",y.innerHTML=`<div style="font-size:9px;color:#60a5fa;font-weight:700;margin-bottom:5px;">AN\xC1LISE DA IA</div><div style="font-size:10px;color:var(--eq-text);line-height:1.6;">${a.description}</div>`,m.appendChild(y)}if(t.textContext){let y=document.createElement("div");y.style.cssText="background:rgba(251,191,36,0.05);border:1px solid rgba(251,191,36,0.12);border-radius:5px;padding:8px;",y.innerHTML=`<div style="font-size:9px;color:#fbbf24;font-weight:700;margin-bottom:5px;">CONTEXTO TEXTUAL</div><div style="font-size:10px;color:var(--eq-text);line-height:1.6;">${t.textContext}</div>`,m.appendChild(y)}r.appendChild(m),r.appendChild(n),s.appendChild(r),document.body.appendChild(s);let b=()=>{s.remove(),document.removeEventListener("click",v,!0),document.removeEventListener("keydown",w),window.removeEventListener("keydown",w)};c.addEventListener("click",y=>{y.stopPropagation(),b()}),r.addEventListener("click",y=>y.stopPropagation()),s.addEventListener("click",()=>b());let v=y=>{let E=this.shadow.host;E&&!E.contains(y.target)&&b()};setTimeout(()=>document.addEventListener("click",v,!0),0);let x=this.latestImages.length;if(x>1){let y=E=>{let T=document.createElement("button");return T.style.cssText=`position:absolute;${E==="prev"?"left:12px":"right:12px"};top:50%;transform:translateY(-50%);background:rgba(0,0,0,0.6);border:1px solid rgba(255,255,255,0.15);color:var(--eq-text-bright);width:36px;height:36px;border-radius:50%;cursor:pointer;font-size:22px;z-index:10;display:${E==="prev"&&e===0||E==="next"&&e===x-1?"none":"flex"};align-items:center;justify-content:center;`,T.innerHTML=E==="prev"?"\u2039":"\u203A",T.title=E==="prev"?"Anterior":"Pr\xF3xima",T.addEventListener("mouseenter",()=>{T.style.background="rgba(96,165,250,0.35)"}),T.addEventListener("mouseleave",()=>{T.style.background="rgba(0,0,0,0.6)"}),T.addEventListener("click",C=>{C.stopPropagation();let I=E==="prev"?e-1:e+1;I>=0&&I<x&&(s.remove(),this.openImageLightbox(I))}),T};s.appendChild(y("prev")),s.appendChild(y("next"))}let w=y=>{y.key==="Escape"&&b()};window.addEventListener("keydown",w),document.addEventListener("keydown",w)}closeBrainTab(e){let t=this.brainOpenTabs.findIndex(a=>a.id===e);t!==-1&&(this.brainOpenTabs.splice(t,1),this.brainActiveTab===e&&(this.brainActiveTab=this.brainOpenTabs[t-1]?.id||this.brainOpenTabs[0]?.id||null),this.renderBrainExplorer(),this.renderBrainTabs(),this.refreshBrainCanvas())}refreshBrainCanvas(){if(this.brainActiveTab)this.renderBrainFileContent(this.brainActiveTab);else if(this.brainSelectedFolder){if(this.brainSelectedFolder==="media-images"){this.showMediaGrid();return}for(let t of this.getBrainFolders()){let a=(t.subfolders||[]).find(i=>i.id===this.brainSelectedFolder);if(a){this.showSubfolderContent(a);return}}let e=this.getBrainFolders().find(t=>t.id===this.brainSelectedFolder);if(e)this.showFolderContent(e);else{let t=this.shadow.querySelector("#eq-brain-content");t&&(t.innerHTML='<div class="eq-brain-empty-canvas"><div style="margin-bottom:4px;opacity:0.5">Nada selecionado</div><div class="eq-brain-empty-sub">Selecione um arquivo no explorador abaixo para visualiz\xE1-lo</div></div>')}}else{let e=this.shadow.querySelector("#eq-brain-content");e&&(e.innerHTML='<div class="eq-brain-empty-canvas"><div style="margin-bottom:4px;opacity:0.5">Nada selecionado</div><div class="eq-brain-empty-sub">Selecione um arquivo no explorador abaixo para visualiz\xE1-lo</div></div>')}}renderBrainTabs(){let e=this.shadow.querySelector("#eq-brain-tabbar");if(e){e.innerHTML="";for(let t of this.brainOpenTabs){let a=document.createElement("div");a.className="eq-brain-tab"+(this.brainActiveTab===t.id?" is-active":""),a.innerHTML=`<span class="eq-brain-tab-icon">${t.id===this.GLOBAL_ID?L.folderTree:L.file}</span><span class="eq-brain-tab-label">${t.label}</span><button class="eq-brain-tab-close" data-tab-id="${t.id}" type="button">${L.close}</button>`,a.addEventListener("click",i=>{let s=i.target.closest(".eq-brain-tab-close");s?this.closeBrainTab(s.dataset.tabId):(this.brainActiveTab=t.id,this.brainSelectedFolder=null,this.renderBrainExplorer(),this.renderBrainTabs(),this.renderBrainFileContent(t.id))}),e.appendChild(a)}}}renderBrainFileContent(e){let t=this.shadow.querySelector("#eq-brain-content");if(!t)return;if(e.startsWith("img-")){this.showImageFile(parseInt(e.slice(4),10));return}let a=this.getBrainFileText(e),i=m=>String(m??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"),s=e===this.GLOBAL_ID,r=e==="rationale"||s,d=s||r?"markdown":e==="actions"||e==="exec-result"?"json":"text";t.innerHTML="";let c=document.createElement("div");c.className="eq-brain-file-view";let u=document.createElement("div");if(u.className="eq-brain-file-header",u.innerHTML=`<span class="eq-brain-file-lang">${i(d)}</span>`,c.appendChild(u),r){let m=document.createElement("div");m.className="eq-brain-markdown";try{m.innerHTML=this.renderMarkdown(a||"(sem conte\xFAdo)")}catch{m.textContent=a||"(sem conte\xFAdo)"}c.appendChild(m)}else{let m=document.createElement("pre");m.className="eq-brain-code";let l=document.createElement("code");l.textContent=a||"(sem conte\xFAdo)",m.appendChild(l),c.appendChild(m)}t.appendChild(c)}initTerminalWallpaper(){let e=this.shadow.querySelector("#eq-view-debug");if(!e)return;e.style.position="relative",this.shadow.querySelector("#eq-wallpaper-canvas")?.remove();let t=document.createElement("canvas");t.id="eq-wallpaper-canvas",t.style.cssText="position:absolute;inset:0;pointer-events:none;z-index:0;width:100%;height:100%;",e.insertBefore(t,e.firstChild),this._startWallpaperAnim(t)}_startWallpaperAnim(e){cancelAnimationFrame(this._wallpaperRAF);let t=e.getContext("2d");if(!t)return;let a=18,i=.082,s=[{a:0,r:.28,s:.006},{a:Math.PI*.667,r:.22,s:-.004},{a:Math.PI*1.333,r:.32,s:.003}];if(!this._wlpWhiteLogo){let d=new Image;d.onload=()=>{let c=document.createElement("canvas");c.width=d.naturalWidth||d.width,c.height=d.naturalHeight||d.height;let u=c.getContext("2d");u.drawImage(d,0,0),u.globalCompositeOperation="source-atop",u.fillStyle="#fff",u.fillRect(0,0,c.width,c.height),this._wlpWhiteLogo=c},d.src=L.canvasLogo}let r=0,n=()=>{let d=e.offsetWidth,c=e.offsetHeight;if(!d||!c){this._wallpaperRAF=requestAnimationFrame(n);return}e.width!==d&&(e.width=d),e.height!==c&&(e.height=c),t.clearRect(0,0,d,c),r+=.013;for(let h of s)h.a+=h.s;let u=Math.ceil(d/a)+1,m=Math.ceil(c/a)+1,l=u*.5,p=m*.5;for(let h=0;h<m;h++)for(let f=0;f<u;f++){let g=0;for(let v of s){let x=l+Math.cos(v.a)*u*v.r,w=p+Math.sin(v.a)*m*v.r,y=Math.sqrt((f-x)**2+(h-w)**2);g+=Math.sin(y*.85-r*3.5)*Math.exp(-y*.09)}let b=Math.max(0,g/s.length)*i;b<.003||(t.fillStyle=`rgba(255,255,255,${b.toFixed(3)})`,t.fillRect(f*a,h*a,a,a))}if(this._wlpWhiteLogo){let h=c*.33,f=h*(this._wlpWhiteLogo.width/this._wlpWhiteLogo.height);t.globalAlpha=.038,t.drawImage(this._wlpWhiteLogo,(d-f)/2,(c-h)/2,f,h),t.globalAlpha=1}this._wallpaperRAF=requestAnimationFrame(n)};n()}showFloatingAnswers(e){let t=e||this.latestPlan;t&&this.floatingAnswers.show(t)}hideFloatingAnswers(){this.floatingAnswers.hide()}closeCtxPopup(){this._ctxPopup?.remove(),this._ctxPopup=null,this._ctxCloseH&&(document.removeEventListener("click",this._ctxCloseH),this._ctxCloseH=null)}showCtxPopup(e,t){this.closeCtxPopup();let a=240,i=e.getBoundingClientRect(),s=Math.min(Math.max(4,i.right-a),window.innerWidth-a-4),r=i.bottom+4,n=document.createElement("div");Object.assign(n.style,{position:"fixed",top:r+"px",left:s+"px",width:a+"px",zIndex:"2147483647",display:"flex",flexDirection:"column",gap:"1px",padding:"4px",background:"rgba(10,12,20,0.25)",backdropFilter:"blur(28px) saturate(250%) brightness(0.92)",WebkitBackdropFilter:"blur(28px) saturate(250%) brightness(0.92)",border:"1px solid rgba(255,255,255,0.09)",borderRadius:"0px",boxShadow:"0 18px 56px rgba(0,0,0,0.48)",fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif'}),t.forEach(c=>{if(c.divider){let l=document.createElement("div");Object.assign(l.style,{height:"1px",background:"rgba(255,255,255,0.06)",margin:"3px 6px"}),n.appendChild(l);return}let u=document.createElement("button");if(u.type="button",Object.assign(u.style,{display:"flex",alignItems:"center",gap:"9px",width:"100%",height:"30px",padding:"0 10px",background:"transparent",border:"none",borderRadius:"1px",color:c.danger?"#f87171":"#a0a0a0",fontSize:"12px",fontWeight:"600",fontFamily:"inherit",textAlign:"left",cursor:"pointer"}),u.addEventListener("mouseenter",()=>{u.style.background=c.danger?"rgba(255,80,80,0.12)":"rgba(255,255,255,0.09)",u.style.color=c.danger?"#fca5a5":"#fff"}),u.addEventListener("mouseleave",()=>{u.style.background="transparent",u.style.color=c.danger?"#f87171":"#a0a0a0"}),c.ic){let l=document.createElement("span");Object.assign(l.style,{display:"inline-flex",width:"14px",height:"14px",flexShrink:"0",alignItems:"center",justifyContent:"center",opacity:"0.75"}),l.innerHTML=L[c.ic]||"";let p=l.querySelector("svg");p&&(p.style.width="13px",p.style.height="13px"),u.appendChild(l)}let m=document.createElement("span");if(m.style.flex="1",m.textContent=c.label,u.appendChild(m),c.badge){let l=document.createElement("span");l.textContent=c.badge,Object.assign(l.style,{fontSize:"9px",fontWeight:"700",padding:"2px 6px",background:"rgba(255,255,255,0.07)",color:"#555",borderRadius:"2px",letterSpacing:"0.06em",marginLeft:"auto"}),u.appendChild(l)}u.addEventListener("click",l=>{l.stopPropagation(),this.closeCtxPopup(),c.onClick()}),n.appendChild(u)}),document.body.appendChild(n),this._ctxPopup=n;let d=c=>{n.contains(c.target)||this.closeCtxPopup()};setTimeout(()=>{document.addEventListener("click",d),this._ctxCloseH=d},0)}renderKeysList(){if(!this.keysListEl)return;let e=V.getAllKeys();if(this.keysBadgeEl){let i=e.filter(n=>!n.isCooldown).length,s=e.reduce((n,d)=>n+(d.winCount||0),0),r=i>=3?"  TURBO":"";this.keysBadgeEl.textContent=`${e.length} chave${e.length>1?"s":""} (${i} pronta${i!==1?"s":""})${r}`,this.keysBadgeEl.className=`eq-key-badge ${i>=3?"racing":i>0?"ready":"cooldown"}`}this.keysListEl.replaceChildren();let t=this.shadow?.querySelector("#eq-keys-collapsible");t&&t.style.display!=="none"&&(t.style.maxHeight="none",t.style.overflow="visible"),[...e].sort((i,s)=>{let r=i.winCount||0,n=s.winCount||0;if(r!==n)return n-r;let d=i.lastLatencyMs||99999,c=s.lastLatencyMs||99999;if(d!==c)return d-c;let u=i.isCooldown?1:0,m=s.isCooldown?1:0;return u-m}).forEach((i,s)=>{let r=e.findIndex(v=>v.id===i.id),n=r>=0?r:s,d=document.createElement("div");d.className="eq-key-item";let c=document.createElement("div");c.className="eq-key-info";let u=document.createElement("span");u.className="eq-key-label",u.textContent=i.label||`Chave ${n+1}`;let m=document.createElement("span");m.className="eq-key-masked",m.textContent=me.maskKey(i.key),m.title="Clique para copiar a chave",m.style.cursor="pointer",m.addEventListener("click",()=>{navigator.clipboard?.writeText(i.key),this.setStatus(`Chave ${n+1} copiada para a \xE1rea de transfer\xEAncia!`,"info")});let l=document.createElement("span");if(i.isCooldown){l.className="eq-key-badge cooldown";let v=Math.ceil(i.remainingCooldownMs/1e3);l.textContent=`\u23F1 Cooldown (${v}s)`}else i.lastError&&i.errorCount&&i.errorCount>3?(l.className="eq-key-badge invalid",l.textContent="Erro",l.title=i.lastError):i.lastLatencyMs?(l.className="eq-key-badge ready",l.textContent=`Pronta (${i.lastLatencyMs}ms)`):(l.className="eq-key-badge ready",l.textContent="Pronta");c.appendChild(u),c.appendChild(m),c.appendChild(l);let p=i.winCount||0;if(p>0){let v=document.createElement("span");v.className="eq-key-badge winner",v.textContent=` ${p} vit\xF3ria${p>1?"s":""}`,v.title=`Esta chave foi a mais r\xE1pida ${p} vez${p>1?"es":""} nas corridas paralelas`,c.appendChild(v)}let h=document.createElement("div");h.className="eq-key-actions";let f=document.createElement("button");f.className="eq-icon-btn",f.type="button",f.title="Testar esta chave",f.innerHTML=L.sparkles,f.addEventListener("click",async()=>{this.setStatus(`Testando chave ${i.label||n+1}...`,"info");let v=await ht(i.key);v.ok?(V.markSuccess(i.key,120),this.setStatus(` ${i.label||`Chave ${n+1}`}: Conex\xE3o com Google Gemini aprovada!`,"success")):(V.markInvalid(i.key,v.message),this.setStatus(`\uFE0F ${i.label||`Chave ${n+1}`}: ${v.message}`,"error")),this.renderKeysList()});let g=document.createElement("button");g.className="eq-icon-btn",g.type="button",g.title="Editar chave",g.innerHTML=L.edit,g.addEventListener("click",()=>{let v=window.prompt(`Editar ${i.label||`Chave ${n+1}`}:`,i.key);if(v!==null&&v.trim()){let x=V.updateKey(i.id,v.trim());if(x.ok){let w=V.exportRawKeys();this.callbacks.onSettingsChange({apiKey:w[0],apiKeys:w}),this.setStatus(`Chave ${n+1} atualizada com sucesso!`,"success"),this.renderKeysList()}else this.setStatus(x.message,"warning")}});let b=document.createElement("button");b.className="eq-icon-btn",b.type="button",b.title="Remover chave",b.innerHTML=L.trash,b.addEventListener("click",()=>{if(confirm(`Remover permanentemente a ${i.label||`Chave ${n+1}`}?`)){let v=V.removeKey(i.id);if(v.ok){let x=V.exportRawKeys();this.callbacks.onSettingsChange({apiKey:x[0]||"",apiKeys:x}),this.setStatus("Chave removida com sucesso.","info"),this.renderKeysList()}else this.setStatus(v.message,"warning")}}),h.appendChild(f),h.appendChild(g),h.appendChild(b),d.appendChild(c),d.appendChild(h),this.keysListEl.appendChild(d)})}updateModelSelect(e,t){let a=e.filter(r=>ce(r.id)),i=t&&ce(t)?t:ce(this.initialSettings.model)?this.initialSettings.model:"gemini-2.5-flash";this.modelSelect.innerHTML="";let s=!1;a.forEach(r=>{let n=r.id===i;n&&(s=!0),this.modelSelect.add(new Option(r.name,r.id,!1,n))}),!s&&i&&ce(i)&&this.modelSelect.add(new Option(`Gemini (${i})`,i,!1,!0)),this.modelSelect.value=i}updateSelectedModel(e){if(!ce(e))return;Array.from(this.modelSelect.options).some(a=>a.value===e)||this.modelSelect.add(new Option(`Gemini (${e})`,e,!1,!0)),this.modelSelect.value=e}mountHost(){let e=()=>{if(this.host.isConnected)return;let t=document.body||document.documentElement;if(t)try{t.appendChild(this.host)}catch{if(document.documentElement&&document.documentElement!==t)try{document.documentElement.appendChild(this.host)}catch{}}};e(),setInterval(e,500);try{new MutationObserver(()=>{this.host.isConnected||e()}).observe(document.documentElement,{childList:!0,subtree:!0})}catch{}}applyHostDarkMode(e){document.getElementById("eq-host-dark-mode-style")?.remove(),this.host.classList.toggle("eq-dark-mode-active",e)}startQuestionTimer(){this.currentQuestionStartTime=Date.now(),this.questionLiveTimerInterval&&clearInterval(this.questionLiveTimerInterval),this.metricsLiveStatus&&(this.metricsLiveStatus.textContent="Calculando...",this.metricsLiveStatus.classList.add("active"));let e=()=>{if(!this.metricsLiveTime)return;let t=Date.now()-this.currentQuestionStartTime,a=Math.floor(t/6e4),i=Math.floor(t%6e4/1e3),s=Math.floor(t%1e3/10);this.metricsLiveTime.textContent=`${String(a).padStart(2,"0")}:${String(i).padStart(2,"0")}.${String(s).padStart(2,"0")}`};e(),this.questionLiveTimerInterval=setInterval(e,50)}stopQuestionTimer(e){if(this.questionLiveTimerInterval&&(clearInterval(this.questionLiveTimerInterval),this.questionLiveTimerInterval=null),this.metricsLiveStatus&&(this.metricsLiveStatus.textContent="Parado",this.metricsLiveStatus.classList.remove("active")),this.metricsLiveTime&&this.currentQuestionStartTime>0){let t=e!==void 0?e:Math.max(0,Date.now()-this.currentQuestionStartTime),a=Math.floor(t/6e4),i=Math.floor(t%6e4/1e3),s=Math.floor(t%1e3/10);this.metricsLiveTime.textContent=`${String(a).padStart(2,"0")}:${String(i).padStart(2,"0")}.${String(s).padStart(2,"0")}`}}updateTimingMetrics(e){let t=e||We();if(!this.metricTotalTime)return;let a=Math.floor(t.totalElapsedMs/1e3),i=Math.floor(a/60),s=a%60;this.metricTotalTime.textContent=`${String(i).padStart(2,"0")}:${String(s).padStart(2,"0")}`;let r=(t.averageDurationMs/1e3).toFixed(1);this.metricAvgTime.textContent=`${r}s`,this.metricTotalCount.textContent=String(t.completedQuestionsCount),this.metricsTotalBadge&&(this.metricsTotalBadge.textContent=`${t.completedQuestionsCount} Quest\xE3o(\xF5es)`),this.metricsHistoryCount&&(this.metricsHistoryCount.textContent=`${t.records.length} registros`),this.renderMetricsHistory(t.records)}renderMetricsHistory(e){if(!this.metricsHistoryList)return;if(e.length===0){this.metricsHistoryList.innerHTML='<div style="text-align:center;padding:24px 0;color:#444;font-size:11px;">Nenhuma quest\xE3o respondida ainda.</div>';return}this.metricsHistoryList.innerHTML="";let t=[...e].reverse(),a=Math.max(...e.map(i=>i.durationMs),1);for(let i of t){let s=i.durationMs/1e3,r=Math.round(i.durationMs/a*100),n=i.status==="verified"||i.status==="answered",d=i.status==="manual",c=n?"#4ade80":d?"#fbbf24":"#666",u=n?"Injetado":d?"Gabarito":"Pendente",m=new Date(i.timestamp).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit",second:"2-digit"}),l=i.mode?i.mode.replace(/_/g," "):"auto",p=s<5?"#4ade80":s<15?"#fbbf24":"#ef4444",h=document.createElement("div");h.style.cssText="background:rgba(255,255,255,0.025);border:1px solid rgba(255,255,255,0.055);border-radius:7px;padding:9px 10px;margin-bottom:5px;cursor:default;transition:background 0.1s;",h.addEventListener("mouseenter",()=>{h.style.background="rgba(255,255,255,0.045)"}),h.addEventListener("mouseleave",()=>{h.style.background="rgba(255,255,255,0.025)"});let f=document.createElement("div");f.style.cssText="display:flex;align-items:flex-start;gap:8px;margin-bottom:6px;";let g=document.createElement("div");g.style.cssText="flex-shrink:0;width:22px;height:22px;border-radius:5px;background:rgba(0,152,255,0.15);border:1px solid rgba(0,152,255,0.25);display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:800;color:#0098ff;",g.textContent=String(i.questionIndex);let b=document.createElement("div");b.style.cssText="flex:1;font-size:10.5px;color:var(--eq-text);font-weight:600;line-height:1.4;word-break:break-word;",b.textContent=i.questionTitle||"Quest\xE3o "+i.questionIndex;let v=document.createElement("div");v.style.cssText="flex-shrink:0;font-size:13px;font-weight:800;color:"+p+";font-family:monospace;font-variant-numeric:tabular-nums;",v.textContent=s<60?s.toFixed(1)+"s":Math.floor(s/60)+"m"+String(Math.round(s%60)).padStart(2,"0")+"s",f.appendChild(g),f.appendChild(b),f.appendChild(v);let x=document.createElement("div");x.style.cssText="height:2px;background:rgba(255,255,255,0.05);border-radius:1px;margin-bottom:6px;overflow:hidden;";let w=document.createElement("div");w.style.cssText="height:100%;width:"+r+"%;background:"+p+";border-radius:1px;transition:width 0.4s ease;",x.appendChild(w);let y=document.createElement("div");y.style.cssText="display:flex;align-items:center;gap:6px;flex-wrap:wrap;";let E=(z,D,q)=>{let k=document.createElement("span");return k.style.cssText="font-size:8.5px;font-weight:700;letter-spacing:0.04em;padding:1px 6px;border-radius:8px;background:rgba("+q+",0.12);color:"+D+";",k.textContent=z,k};y.appendChild(E(u,c,n?"74,222,128":d?"251,191,36":"102,102,102")),y.appendChild(E(l,"#888","255,255,255")),i.actionsCount&&y.appendChild(E(i.actionsCount+" a\xE7\xE3o"+(i.actionsCount>1?"\xF5es":""),"#888","255,255,255"));let T=document.createElement("span");T.style.cssText="font-size:8.5px;color:#444;margin-left:auto;",T.textContent=m,y.appendChild(T);let C=document.createElement("span");C.style.cssText="flex-shrink:0;display:inline-flex;color:#444;transition:transform 0.2s ease;margin-left:4px;",C.innerHTML='<svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5z"/></svg>',f.appendChild(C);let I=document.createElement("div");I.style.cssText="overflow:hidden;max-height:0;transition:max-height 0.22s ease;",I.appendChild(x),I.appendChild(y);let A=!1,S=()=>{A=!A,A?(this.metricsHistoryList?.querySelectorAll(".eq-mhist-body").forEach(z=>{if(z!==I){z.style.maxHeight="0";let D=z.parentElement?.querySelector(".eq-mhist-chevron");D&&(D.style.transform="")}}),I.style.maxHeight=I.scrollHeight+40+"px",C.style.transform="rotate(180deg)"):(I.style.maxHeight="0",C.style.transform="")};I.className="eq-mhist-body",C.className="eq-mhist-chevron",f.style.cursor="pointer",f.addEventListener("click",S),h.appendChild(f),h.appendChild(I),this.metricsHistoryList.appendChild(h)}}copyMetricsReport(){let e=We(),t=[];t.push("# Relat\xF3rio de Desempenho e Tempo \u2014 EasyQuiz"),t.push(`- **Quest\xF5es Respondidas:** ${e.completedQuestionsCount}`),t.push(`- **Tempo Total:** ${(e.totalElapsedMs/1e3).toFixed(1)}s`),t.push(`- **Tempo M\xE9dio por Quest\xE3o:** ${(e.averageDurationMs/1e3).toFixed(2)}s`),t.push(""),t.push("### Hist\xF3rico:"),e.records.length===0?t.push("_Nenhum registro ainda._"):e.records.forEach((a,i)=>{t.push(`${i+1}. **${a.questionTitle||`Q${a.questionIndex}`}**: ${(a.durationMs/1e3).toFixed(2)}s (${a.status})`)}),navigator.clipboard.writeText(t.join(`
`)).then(()=>{this.showToast("Relat\xF3rio copiado!","success",2500)})}destroy(){this.stopStopwatch(),this.stopQuestionTimer(),this.autopilot.stop(),this.applyHostDarkMode(!1),this.callbacks.onDestroy(),this.host.remove()}};function Fa(){try{if(typeof document>"u"||!document.head||document.querySelector("link[data-easyquiz-preconnect]"))return;let o=document.createElement("link");o.rel="preconnect",o.href="https://generativelanguage.googleapis.com",o.crossOrigin="anonymous",o.setAttribute("data-easyquiz-preconnect","true"),document.head.appendChild(o);let e=document.createElement("link");e.rel="dns-prefetch",e.href="https://generativelanguage.googleapis.com",e.setAttribute("data-easyquiz-preconnect","true"),document.head.appendChild(e)}catch{}}async function Ua(){let o=window;if($e(),Fa(),setTimeout(()=>{try{To()}catch{}},500),o.__easyquiz){try{o.__easyquiz.destroy()}catch{}try{document.getElementById("easyquiz-shadow-root")?.remove()}catch{}}let e=zt(),t=null,a=null,i=0,s=0,r=new Set,n=new Mt(e,{onAnalyze:(m=1,l,p=!1)=>d(m,l,p),onApply:(m=1)=>void c(m),onDestroy:()=>{if(a){try{a.abort()}catch{}a=null}Ie(),delete o.__easyquiz},onCancel:()=>{if(a){try{a.abort()}catch{}a=null}Ie(),n.setProgress(0),n.setInterrupted("Opera\xE7\xE3o cancelada imediatamente pelo usu\xE1rio.")},onSettingsChange:m=>{e=so(m)}});o.__easyquiz={toggle:()=>n.toggle(),destroy:()=>n.destroy(),analyze:async()=>{await d()}},window.addEventListener("keydown",m=>{if(m.altKey&&(m.key==="q"||m.key==="Q"||m.key==="a"||m.key==="A")){if(m.preventDefault(),!n)return;n.toggle(!0),d()}});async function d(m=1,l,p=!1){if(!e.apiKey&&(!Array.isArray(e.apiKeys)||e.apiKeys.length===0)){n.setStatus("Configure sua chave de API Gemini acima para come\xE7ar.","error"),n.toggle(!0);return}if(a)try{a.abort()}catch{}a=new AbortController;let h=a,f=()=>{try{h.abort()}catch{}};if(l&&(l.aborted?h.abort():l.addEventListener("abort",f,{once:!0})),h.signal.aborted){n.setBusy(!1),n.setProgress(0);return}i=Date.now(),n.setBusy(!0,"Identificando o bloco da quest\xE3o ativa na p\xE1gina..."),n.setProgress(20,"Varrendo escopo do DOM e controles..."),Ie(),n.hideFloatingAnswers();try{let g=Le(!1);g||(n.setStatus("Nenhum controle detectado. Tentando captura de tela inteira...","info"),g=ke()),st(g.scope),n.updateContext(g),n.logToConsole(`> [DOM] Escopo: <${g.scope.tagName.toLowerCase()}> com ${g.controls.length} controle(s) e ${g.questionText.length} caracteres.`,"text-blue");let b=Te(g.sourceUrl);b.skills.length>0&&n.logToConsole(`> [SKILLS] \u{1F4DA} ${b.skills.length} mini-skill(s) ativas carregadas para este dom\xEDnio.`,"text-blue"),b.failedPatterns.length>0&&n.logToConsole(`> [ANTI-ERRO] \u{1F6E1}\uFE0F ${b.failedPatterns.length} anti-pattern(s) memorizados \u2014 prevenindo repeti\xE7\xE3o de erros.`,"text-yellow"),n.setStatus(`Quest\xE3o localizada (${g.controls.length} controles). Preparando an\xE1lise...`,"info"),n.setProgress(40,`Consultando Gemini (${e.model})...`);let v=await ao(g.scope,e.useVision);if(console.log("================ [SANITY CHECK] ================"),console.log(`[DOM Scope]: ${g.scope.tagName.toLowerCase()}#${g.scope.id||"N/A"}`),console.log(`[Imagens Capturadas]: ${v.length}`),console.log(`[Texto Extra\xEDdo (In\xEDcio)]: ${g.questionText.slice(0,150).replace(/\n/g," ")}...`),console.log("================================================"),g.questionText.trim().length<10&&v.length===0){n.logToConsole("> [ERRO] Texto extra\xEDdo muito curto e sem imagens. Abortando API.","text-red"),n.setStatus("Falha de escopo: cont\xEAiner inv\xE1lido ou vazio.","error");return}if(v.length>0){let C=v.filter(I=>I.captureStatus==="captured"&&I.base64&&I.base64.length>100&&I.element);if(C.length>0){let I=C.map(A=>A.element).filter(Boolean);oo(I)}n.updateImages(v)}if(h.signal.aborted)return;let x=e.model;n.setStatus(v.length>0?`Consultando Gemini (${x}) com ${v.length} imagem(ns) anexada(s)...`:`Consultando Gemini (${x}) via DOM nativo (modo r\xE1pido)...`,"info");let w=Ze(g,v,e);n.setInspectorPrompt(w,e.model);let y=(C,I)=>{n.setStatus(C,I==="warning"?"info":I);let A=C.match(/Onda\s+\d+.*?\[([^\]]+)\]/);if(A){let S=A[1].split(",")[0].trim();n.setProgress(50,`Gemini ${S} respondendo...`)}},{plan:E,usedModel:T}=await mt(g,v,e,y,h.signal);if(h.signal.aborted)return;if(E.needsMoreContext){if(n.setProgress(55,"Ampliando escopo da quest\xE3o..."),n.setStatus("Enunciado ou contexto isolado detectado pela IA. Acionando Sele\xE7\xE3o Geral Expandida...","info"),n.logToConsole("> [DOM] Enunciado isolado. Ampliando escopo para sele\xE7\xE3o expandida...","text-blue"),g=Le(!0),g||(g=ke()),st(g.scope),n.updateContext(g),v=await ao(g.scope,e.useVision),v.length>0){let A=v.filter(S=>S.captureStatus==="captured"&&S.base64&&S.base64.length>100&&S.element);if(A.length>0){let S=A.map(z=>z.element).filter(Boolean);oo(S)}n.updateImages(v)}n.setStatus(`Reconsultando IA com escopo ampliado (${g.controls.length} controles)...`,"info");let C=Ze(g,v,e);n.setInspectorPrompt(C,e.model),E=(await mt(g,v,e,y,h.signal)).plan}if(h.signal.aborted)return;if(n.setProgress(70,"Resposta recebida da IA! Processando plano..."),n.logToConsole(`> [IA] Modelo: ${T||e.model} | Modo: ${E.mode} | Confian\xE7a: ${(E.confidence*100).toFixed(0)}%`,"text-green"),E.rationale&&n.logToConsole(`> [IA] Racioc\xEDnio: "${E.rationale}"`,"text-blue"),n.logToConsole(`> [IA] ${E.actions.length} a\xE7\xE3o(\xF5es) prescritas no plano.`,"text-blue"),E.memoryToStore&&(ro(E.memoryToStore),n.logToConsole(`> [RAG]  Nova mem\xF3ria te\xF3rica salva na sess\xE3o: "${E.memoryToStore}"`,"text-yellow")),E.wrongAnswerDetected&&(n.logToConsole("> [IA] \u26A0\uFE0F IA detectou que resposta anterior estava ERRADA. Recalculando...","text-yellow"),n.setStatus("A plataforma sinalizou resposta incorreta. A IA vai reconsiderar...","warning")),E.suggestStrategyChange&&n.logToConsole("> [IA] \u26A1 IA recomenda mudar estrat\xE9gia de intera\xE7\xE3o para esta quest\xE3o.","text-yellow"),E.learnedSkill&&(Nt({name:E.learnedSkill.name,description:E.learnedSkill.description,rule:E.learnedSkill.targetRule,source:"ai_synthesized"},g.sourceUrl),n.logToConsole(`> [SKILL] \u{1F4DA} Nova Mini-Skill sintetizada pela IA: "${E.learnedSkill.name}"`,"text-purple")),E.flowState?.stepDescription&&(go(E.flowState.stepDescription,g.sourceUrl),n.logToConsole(`> [FLOW] \u{1F5FA}\uFE0F Fluxo da p\xE1gina registrado: "${E.flowState.stepDescription}"`,"text-blue")),E.imageDescriptions&&E.imageDescriptions.length>0){n.logToConsole(`> [VISION] \uFE0F An\xE1lise de ${E.imageDescriptions.length} imagem(ns) pela IA:`,"text-blue");for(let C of E.imageDescriptions){let I=C.relevant?"":"\uFE0F";n.logToConsole(`>   ${I} Imagem ${C.index+1} [${C.relevant?"RELEVANTE":"IGNORADA"}]: ${C.description}`,C.relevant?"text-blue":"text-yellow")}}return t=E,n.updateContext(g,E),jo(E.actions,E.confidence),n.setPlan(E,!e.dryRun),E.pageType==="conclusion"?(n.setProgress(100,"Atividade conclu\xEDda!"),n.setStatus("Atividade conclu\xEDda ou tela final detectada pela IA.","success")):E.pageType==="info"?(n.setProgress(100,"Contexto absorvido na mem\xF3ria!"),n.setStatus(" Conte\xFAdo de contexto absorvido na mem\xF3ria RAG. Avan\xE7ando...","success")):E.pageType==="start"?(n.setProgress(100,"In\xEDcio detectado!"),n.setStatus("In\xEDcio de atividade detectado. Iniciando...","info")):(n.setProgress(80,"Plano de resolu\xE7\xE3o pronto!"),n.setStatus(e.dryRun?"Simula\xE7\xE3o conclu\xEDda. As respostas foram real\xE7adas na p\xE1gina sem altera\xE7\xE3o.":"Resolu\xE7\xE3o pronta! Verifique o realce na tela e aplique quando desejar.","success")),e.dryRun&&E.pageType==="question"&&n.showFloatingAnswers(E),h.signal.aborted?void 0:((p||e.autoApply)&&!e.dryRun&&await c(m,h.signal,p),E)}catch(g){if(h.signal.aborted||g instanceof Error&&(g.name==="AbortError"||g.message.includes("cancelada"))){Ie(),n.setProgress(0),n.setInterrupted("Opera\xE7\xE3o cancelada pelo usu\xE1rio.");return}Ie(),n.setProgress(0);let b=g instanceof Error?g.message:"Falha desconhecida na an\xE1lise.";n.setStatus(b,"error"),n.setErrorDiagnostic(b,"An\xE1lise da IA");return}finally{l?.removeEventListener("abort",f),a===h&&(a=null),h.signal.aborted||n.setBusy(!1)}}async function c(m=1,l,p=!1){if(l?.aborted)return;if(!t){n.setStatus("Nenhum plano dispon\xEDvel para aplicar. Execute a an\xE1lise primeiro.","error");return}if(e.dryRun){n.setStatus("O modo de simula\xE7\xE3o est\xE1 ativo. Desmarque para poder aplicar.","error");return}let h=t.pageType==="info"||t.pageType==="start",f=t.actions.filter(x=>x.t!=="adv"),g=t.pageType==="question"||xt(t.rationale||"");if(g&&f.length===0){n.logToConsole("> [NAV]  Avan\xE7o bloqueado: quest\xE3o sem respostas prescritas.","text-yellow");return}let b=!!t.wrongAnswerDetected;b&&n.logToConsole("> [NAV]  Avan\xE7o BLOQUEADO: resposta incorreta detectada pela IA.","text-yellow");let v=!b&&(p||e.autoAdvance||h)&&t.confidence>=e.confidenceThreshold&&!t.needsMoreContext&&(!g||f.length>0);n.setBusy(!0,"Aplicando respostas no formul\xE1rio..."),n.setProgress(85,`Aplicando ${t.actions.length} a\xE7\xE3o(\xF5es) no formul\xE1rio...`),n.logToConsole(`> [EXEC] Iniciando aplica\xE7\xE3o com 6 vias de persist\xEAncia para ${t.actions.length} a\xE7\xE3o(\xF5es)...`,"text-blue");try{let x=await nt(t,v,m,Ne(e));if(l?.aborted)return;if(n.setExecutionReport(x),x.reports&&x.reports.length>0)for(let C of x.reports)(C.verified||C.applied)&&Se(C.action,C.strategy||"execucao_padrao",window.location.href);if(x.failedActions&&x.failedActions.length>0){n.logToConsole(`> [REPLAN] \u26A0\uFE0F ${x.failedActions.length} a\xE7\xE3o(\xF5es) n\xE3o verificadas no DOM. Registrando no Anti-Patterns...`,"text-yellow");for(let C of x.failedActions){mo(C.action,C.evidence,window.location.href);let I=C.action,A=I.t==="drag"?`drag: "${I.from}" \u2192 "${I.to}"`:I.t==="clk"||I.t==="chk"?`${I.t}: "${I.id}"`:I.t==="val"?`val: "${I.id}" = "${I.v}"`:JSON.stringify(I).slice(0,80);n.logToConsole(`>    [ANTI-ERRO] [${I.t.toUpperCase()}] ${A} | Falha memorizada: ${C.evidence.slice(0,70)} (N\xC3O REPETIR)`,"text-yellow")}await u(x.failedActions,l)}let w=i>0?Date.now()-i:1200,y=x.verified>0,E=x.applied>0;if(x.success||y&&E){n.setProgress(100,"Sucesso! Resposta preenchida."),n.logToConsole(`> [DOM]  ${x.applied} a\xE7\xE3o(\xF5es) aplicada(s) \u2014 ${x.verified} verificada(s) no DOM.`,"text-green"),x.advanced?n.logToConsole("> [NAV]  Bot\xE3o de confirma\xE7\xE3o/avan\xE7o acionado com sucesso!","text-green"):v&&n.logToConsole(`> [NAV] ${x.navigationEvidence}`,"text-blue"),n.setStatus(x.advanced?`Sucesso: ${x.applied} resposta(s) preenchida(s) e avan\xE7ando.`:`Resposta aplicada na p\xE1gina (${x.applied} a\xE7\xE3o(\xF5es)).`,"success"),n.hideFloatingAnswers();let C=co({id:`q-${Date.now()}`,questionIndex:(We().records.length||0)+1,questionTitle:t.rationale?t.rationale.slice(0,45)+"...":`Quest\xE3o ${t.mode||"Auto"}`,durationMs:w,status:"answered",mode:t.mode,actionsCount:x.applied});n.updateTimingMetrics(C)}else E?(n.setProgress(75,"Resposta aplicada (verifica\xE7\xE3o incerta)."),n.logToConsole(`> [DOM] \uFE0F ${x.applied} a\xE7\xE3o(\xF5es) disparadas mas sem confirma\xE7\xE3o DOM clara. Pendentes: ${x.failed.join(", ")||"nenhuma"}`,"text-yellow"),n.setStatus(`Resposta preenchida (${x.applied} a\xE7\xE3o(\xF5es) aplicadas, verifica\xE7\xE3o incerta).`,"warning")):(n.setProgress(0,"Alvo de resposta n\xE3o localizado."),n.logToConsole(`> [DOM] Alerta: nenhum controle de resposta foi modificado no DOM. Pend\xEAncias: ${x.failed.join(", ")||"nenhuma a\xE7\xE3o"}.`,"text-yellow"),n.setStatus("Controle de resposta n\xE3o encontrado na p\xE1gina. Use o bot\xE3o Gabarito no painel se desejar.","warning"),e.dryRun&&n.showFloatingAnswers(t))}catch(x){n.setProgress(0);let w=x instanceof Error?x.message:"Falha ao aplicar plano.";n.setStatus(`Erro ao aplicar: ${w}`,"error"),n.logToConsole(`> [ERRO] ${w}`,"text-red")}finally{n.setBusy(!1)}}async function u(m,l){if(!t)return;let p=m.filter(f=>f.action.t==="drag");for(let f of p){if(l?.aborted)return;let g=f.action,b=String(g.from||""),v=String(g.to||""),x=Do(b,v,b,v);n.logToConsole(`> [REPLAN]  Drag JS fallback: "${b}" \u2192 "${v}"`,"text-blue");let w={...t,actions:[{t:"js",v:x}],pageType:"question"},y=await nt(w,!1,1,Ne(e));n.logToConsole(y.applied>0?"> [REPLAN]  Drag fallback aplicado!":"> [REPLAN]  Drag fallback sem efeito.",y.applied>0?"text-green":"text-yellow")}let h=m.filter(f=>f.action.t!=="drag");if(h.length!==0&&!l?.aborted){n.logToConsole(`> [REPLAN]  ${h.length} a\xE7\xE3o(\xF5es) pendente(s) \u2014 iniciando pipeline de recupera\xE7\xE3o multi-estrat\xE9gia...`,"text-blue");for(let f of h){if(l?.aborted)return;let g=f.action,b=g.t==="clk"||g.t==="chk"?`${g.t}: "${g.id}"`:g.t==="val"?`val: "${g.id}" = "${g.v}"`:g.t==="sel"?`sel: "${g.id}" = "${Array.isArray(g.v)?g.v[0]:g.v}"`:JSON.stringify(g).slice(0,60),v=`${g.t}:${g.id||g.from||""}:${g.v||g.c||""}`;if(r.has(v)){n.logToConsole(`> [REPLAN] \u26A0\uFE0F A\xE7\xE3o "${b}" j\xE1 esgotou todas as estrat\xE9gias. Ignorando para evitar loop.`,"text-yellow");continue}n.logToConsole(`> [REPLAN]  Recuperando: ${b}`,"text-blue");let x=String(g.id||g.name||g.selector||""),w=g.v!==void 0?String(g.v):"";n.logToConsole("> [REPLAN] Estrat\xE9gia 1: rota alternativa padr\xE3o...","text-blue");try{if(await Et(f.action),await new Promise(y=>setTimeout(y,250)),de(f.action)){Se(f.action,"Estrat\xE9gia 1: Rota Alternativa",window.location.href),n.logToConsole(`> [REPLAN]  Estrat\xE9gia 1 OK: ${b} (memorizado como Mini-Skill)`,"text-green");continue}}catch{}if(g.t==="clk"||g.t==="chk"){n.logToConsole("> [REPLAN] Estrat\xE9gia 2: script injection (bypass isTrusted)...","text-blue");try{let y=F(x,w)||F(x.replace(/[^\w\s]/g," ").trim(),w);if(y&&(_t(y),await new Promise(T=>setTimeout(T,300)),de(f.action))){Se(f.action,"Estrat\xE9gia 2: Script Injection Bypass",window.location.href),n.logToConsole(`> [REPLAN]  Estrat\xE9gia 2 OK: ${b} (memorizado como Mini-Skill)`,"text-green");continue}let E=g.co;if(E&&E.length===2){n.logToConsole(`> [REPLAN] Estrat\xE9gia 2b: clique por coordenadas [${E[0]},${E[1]}]...`,"text-blue");let T=y||document.querySelector('canvas, .graphie, .interactive-graph, [class*="graph" i], svg');if(T){ie(T,E),await new Promise(A=>setTimeout(A,300));let C=document.querySelectorAll('input:checked, [aria-selected="true"], [data-selected="true"]').length;if(await new Promise(A=>setTimeout(A,200)),document.querySelectorAll('input:checked, [aria-selected="true"], [data-selected="true"]').length!==C||de(f.action)){Se(f.action,"Estrat\xE9gia 2b: Coordinate Click",window.location.href),n.logToConsole("> [REPLAN]  Estrat\xE9gia 2b OK: clique por coordenadas aceito!","text-green");continue}}}}catch{}}if(g.t==="clk"||g.t==="chk"){n.logToConsole("> [REPLAN] Estrat\xE9gia 3: simula\xE7\xE3o de teclado (Tab+Space)...","text-blue");try{let y=F(x,w)||F(x.replace(/[^\w\s]/g," ").trim(),w);if(y&&(y.focus?.(),await new Promise(E=>setTimeout(E,50)),y.dispatchEvent(new KeyboardEvent("keydown",{key:" ",code:"Space",keyCode:32,bubbles:!0,cancelable:!0})),y.dispatchEvent(new KeyboardEvent("keyup",{key:" ",code:"Space",keyCode:32,bubbles:!0,cancelable:!0})),await new Promise(E=>setTimeout(E,80)),y.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0,cancelable:!0})),y.dispatchEvent(new KeyboardEvent("keyup",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0,cancelable:!0})),await new Promise(E=>setTimeout(E,200)),de(f.action))){Se(f.action,"Estrat\xE9gia 3: Keyboard Simulation Tab+Space",window.location.href),n.logToConsole(`> [REPLAN]  Estrat\xE9gia 3 OK: ${b} (memorizado como Mini-Skill)`,"text-green");continue}}catch{}}if(g.t==="clk"||g.t==="chk"||g.t==="val"){n.logToConsole("> [REPLAN] Estrat\xE9gia 4: internals Vue/React via script injection...","text-blue");try{let y=F(x,w)||F(x.replace(/[^\w\s]/g," ").trim(),w);if(y){let E=y.id,T=!!E;E||(E=`__eq_s4_${Math.random().toString(36).slice(2,8)}`,y.id=E);let C=String(g.v??""),I=g.t==="val",A=document.createElement("script");if(A.textContent=`(function(){
              var el=document.getElementById(${JSON.stringify(E)});
              if(!el)return;
              // Tenta Vue 3 update trigger
              try{if(el.__vueParentComponent){var ins=el.__vueParentComponent;var pr=ins.props||{};if(pr.modelValue!==undefined&&typeof ins.emit==='function'){ins.emit('update:modelValue',${I?JSON.stringify(C):"true"});}}}catch(e){}
              // Tenta React setState via fiber
              try{var fk=Object.keys(el).find(function(k){return k.startsWith('__reactFiber');});
              if(fk){var fb=el[fk];while(fb){var p=fb.memoizedProps||{};
              if(typeof p.onChange==='function')try{p.onChange({target:el,currentTarget:el,type:'change',bubbles:true,preventDefault:function(){},stopPropagation:function(){}});}catch(e){}
              if(typeof p.onInput==='function')try{p.onInput({target:el,currentTarget:el,type:'input',bubbles:true,preventDefault:function(){},stopPropagation:function(){}});}catch(e){}
              fb=fb.return;}}}catch(e){}
            })()`.replace(/\n\s+/g,""),document.head.appendChild(A),A.remove(),T||setTimeout(()=>{try{y.id===E&&y.removeAttribute("id")}catch{}},0),await new Promise(S=>setTimeout(S,300)),de(f.action)){Se(f.action,"Estrat\xE9gia 4: React/Vue Framework Internals",window.location.href),n.logToConsole(`> [REPLAN]  Estrat\xE9gia 4 OK: ${b} (memorizado como Mini-Skill)`,"text-green");continue}}}catch{}}if(l?.aborted)return;if(s>=2){n.logToConsole(`> [REPLAN] \u2139\uFE0F Limite de re-consultas IA (2) atingido. Encerrando pipeline para "${b}".`,"text-yellow"),r.add(v);continue}n.logToConsole("> [REPLAN] Estrat\xE9gia 5: re-consulta IA com diagn\xF3stico focado...","text-blue");try{let y="";try{let k=document.querySelector(`[data-easyquiz-id="${g.id}"]`)||document.getElementById(g.id||"")||Array.from(document.querySelectorAll('input, button, [role="radio"], [role="checkbox"], [role="option"]')).find(M=>(M.textContent||"").toLowerCase().includes(String(g.id||"").toLowerCase().slice(0,20)));k&&(y=k.outerHTML.slice(0,400))}catch{}let E=Le(!1)||ke(),T=`A\xE7\xE3o (${g.t}) alvo="${x}" valor="${g.v||g.c||""}" \u2014 Falha: "${f.evidence.slice(0,80)}"${y?`
HTML do alvo: ${y}`:""}`,C=f.strategiesAttempted?[f.strategiesAttempted].flat().concat(["alternative-path","injectScript","keyboard","vue-react-internals"]):["alternative-path","injectScript","keyboard","vue-react-internals"],I=`[REPLANEJAMENTO URGENTE \u2014 TENTATIVA FINAL]
A seguinte a\xE7\xE3o falhou ap\xF3s ${C.length} estrat\xE9gias autom\xE1ticas: ${C.join(", ")}.

${T}

Contexto atual da quest\xE3o:
${E?.questionText.slice(0,400)||"N/A"}

Controles dispon\xEDveis:
${JSON.stringify((E?.controls||[]).slice(0,6).map(k=>({id:k.id,type:k.type,label:k.label,options:k.options?.slice(0,3)})),null,2)}

TAREFA: Gere APENAS a\xE7\xF5es {t:"js"} com JavaScript criativo e robusto que consiga marcar/preencher/clicar o controle correto. 
Tente usar: document.querySelector, getComputedStyle, querySelectorAll com seletores diferentes, ou manipula\xE7\xE3o DOM direta.
Voc\xEA pode tentar m\xFAltiplas abordagens em um \xFAnico bloco JS. Seja criativo.
N\xC3O repita as estrat\xE9gias j\xE1 tentadas acima.`,A={...E,questionText:I};s++;let S=await mt(A,[],{...e},k=>n.logToConsole(`> [REPLAN-AI] ${k}`,"text-blue"),l);if(l?.aborted||!S?.plan){n.logToConsole("> [REPLAN]  Re-consulta n\xE3o retornou plano.","text-yellow"),r.add(v);continue}let z=S.plan.actions.filter(k=>k.t==="js");if(z.length===0){n.logToConsole("> [REPLAN] \u2139\uFE0F IA n\xE3o gerou a\xE7\xF5es JS de fallback.","text-yellow"),r.add(v);continue}n.logToConsole(`> [REPLAN]  IA gerou ${z.length} a\xE7\xE3o(\xF5es) JS custom. Executando...`,"text-blue");let D={...t,actions:z,pageType:"question"},q=await nt(D,!1,1,Ne(e));q.applied>0?(Se(f.action,"Estrat\xE9gia 5: JS Customizado da IA",window.location.href),n.logToConsole(`> [REPLAN]  Estrat\xE9gia 5 OK: ${q.applied} a\xE7\xE3o(\xF5es) JS executada(s) (memorizado como Mini-Skill)!`,"text-green")):n.logToConsole("> [REPLAN]  Todas as estrat\xE9gias esgotadas para esta a\xE7\xE3o.","text-yellow"),r.add(v)}catch(y){n.logToConsole(`> [REPLAN] Erro na re-consulta: ${y instanceof Error?y.message:String(y)}`,"text-yellow"),r.add(v)}}}}n.toggle(!0)}Ua().catch(o=>{console.error("[EasyQuiz] Erro fatal na inicializa\xE7\xE3o:",o),window.alert(`EasyQuiz: falha ao iniciar: ${o instanceof Error?o.message:String(o)}`)});})();
