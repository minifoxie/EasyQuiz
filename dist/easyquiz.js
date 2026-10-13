/* EasyQuiz v3.8.7 (0e2befb) — Resolução inteligente de quizzes sem servidor
 * GitHub: https://github.com/minifoxie/EasyQuiz
 * 100% Client-side. Direct Google Gemini REST API.
 */
"use strict";(()=>{var ae={apiKey:"",apiKeys:[],model:"gemini-3.8-flash",uiMode:"easy",modeHint:"",engine:"smart",dryRun:!1,autoApply:!0,autoAdvance:!1,hostDarkMode:!0,useVision:!0,confidenceThreshold:.8,toastStacking:!0,theme:"mega-black",panelOpacity:.65,borderRadius:"none",glowEffects:!1,highlightColor:"#ffd600",languageHint:"auto",maxRetries:2,showTokenUsage:!0,autoScrollLogs:!0,compactMode:!1,enableSoundFeedback:!1};function ce(o){if(!o||typeof o!="string")return!1;let e=o.toLowerCase().trim().replace(/^models\//,"");if(!e.includes("gemini"))return!1;let t=["imagen","image","veo","omni","video","embedding","embed","tts","audio","speech","voice","sound","live","transcribe","bidi","aqa","learnlm","deep-research","computer-use","robotics","rt-1","rt-2","mediapipe","cyber","-ultra","experimental"];if(e==="gemini-flash-latest")return!0;for(let a of t)if(e.includes(a))return!1;return!(!e.includes("flash")&&!e.includes("pro"))}var Pt="easyquiz_settings_v2",De="easyquiz_activity_metrics";function zt(){try{let o=localStorage.getItem(Pt);if(!o){let s=localStorage.getItem("easyquiz_settings_v1");if(s){let r=JSON.parse(s);return{...ae,apiKey:r.apiKey||""}}return{...ae}}let e=JSON.parse(o),t=typeof e.model=="string"&&ce(e.model)?e.model:ae.model,a=Array.isArray(e.apiKeys)?e.apiKeys.map(s=>typeof s=="string"?s.trim().replace(/^["']|["']$/g,""):"").filter(s=>s.length>5):[],i=typeof e.apiKey=="string"?e.apiKey.trim().replace(/^["']|["']$/g,""):"";if(a.length===0&&i&&(a=[i]),a.length===0)try{let s=localStorage.getItem("easyquiz_api_keys");if(s){let r=JSON.parse(s);Array.isArray(r)&&(a=r.filter(u=>typeof u=="string"&&u.trim().length>5))}}catch{}return{apiKey:a[0]||i||ae.apiKey,apiKeys:a,model:t,uiMode:e.uiMode==="easy"||e.uiMode==="advanced"?e.uiMode:ae.uiMode,modeHint:e.modeHint??"",engine:e.engine??"smart",dryRun:!!e.dryRun,autoApply:e.autoApply!==void 0?!!e.autoApply:!0,autoAdvance:!!e.autoAdvance,hostDarkMode:e.hostDarkMode!==void 0?!!e.hostDarkMode:!0,useVision:e.useVision!==void 0?!!e.useVision:ae.useVision,confidenceThreshold:typeof e.confidenceThreshold=="number"?e.confidenceThreshold:ae.confidenceThreshold,toastStacking:e.toastStacking!==void 0?!!e.toastStacking:ae.toastStacking,theme:["mega-black","dark","purple-neon","gray-blue","light"].includes(e.theme)?e.theme:ae.theme,panelOpacity:typeof e.panelOpacity=="number"?e.panelOpacity:ae.panelOpacity,borderRadius:["none","soft","rounded"].includes(e.borderRadius)?e.borderRadius:ae.borderRadius,glowEffects:e.glowEffects!==void 0?!!e.glowEffects:ae.glowEffects,highlightColor:typeof e.highlightColor=="string"?e.highlightColor:ae.highlightColor,languageHint:typeof e.languageHint=="string"?e.languageHint:ae.languageHint,maxRetries:typeof e.maxRetries=="number"?e.maxRetries:ae.maxRetries,showTokenUsage:e.showTokenUsage!==void 0?!!e.showTokenUsage:ae.showTokenUsage,autoScrollLogs:e.autoScrollLogs!==void 0?!!e.autoScrollLogs:ae.autoScrollLogs,compactMode:e.compactMode!==void 0?!!e.compactMode:ae.compactMode,enableSoundFeedback:e.enableSoundFeedback!==void 0?!!e.enableSoundFeedback:ae.enableSoundFeedback}}catch{return{...ae}}}function io(){try{localStorage.removeItem(Pt),localStorage.removeItem("easyquiz_settings_v1"),localStorage.removeItem(De),sessionStorage.removeItem(De);let o=[];for(let e=0;e<localStorage.length;e++){let t=localStorage.key(e);t&&(t.startsWith("eq_")||t.startsWith("easyquiz_"))&&o.push(t)}o.forEach(e=>localStorage.removeItem(e)),dt()}catch(o){console.warn("[EasyQuiz] Erro ao resetar dados:",o)}}function Ot(o){try{let e=localStorage.getItem("eq_domain_cache_"+o);if(!e)return{};let t=JSON.parse(e);if(t.advanceSelector&&/inject|injetar/i.test(t.advanceSelector)){t.advanceSelector=void 0;try{localStorage.removeItem("eq_domain_cache_"+o)}catch{}}return t}catch{return{}}}function Dt(o,e){if(e.advanceSelector&&/inject|injetar/i.test(e.advanceSelector))return;let a={...Ot(o),...e};try{localStorage.setItem("eq_domain_cache_"+o,JSON.stringify(a))}catch(i){console.warn("[EasyQuiz] Erro cache de dominio:",i)}}function so(o){let e=zt(),t=Array.isArray(o.apiKeys)?o.apiKeys.map(n=>typeof n=="string"?n.trim().replace(/^["']|["']$/g,""):"").filter(n=>n.length>5):e.apiKeys,a;typeof o.apiKey=="string"?a=o.apiKey.trim().replace(/^["']|["']$/g,""):Array.isArray(o.apiKeys)&&o.apiKeys.length>0?a=t[0]||"":a=e.apiKey,a&&!t.includes(a)&&(t=[a,...t]),t.length>0&&(!a||!t.includes(a))&&(a=t[0]);let i={...e,...o,apiKey:a,apiKeys:t};try{localStorage.setItem(Pt,JSON.stringify(i)),localStorage.setItem("easyquiz_api_keys",JSON.stringify(t))}catch(n){console.warn("[EasyQuiz] Falha ao persistir configura\xE7\xF5es no localStorage:",n)}return i}var Oe=[],no=12,$o=1200;function ro(o){let e=o.trim().replace(/\s+/g," ").slice(0,$o);e&&!Oe.includes(e)&&(Oe.push(e),Oe.length>no&&(Oe=Oe.slice(-no)))}function ct(){return Oe}function dt(){Oe=[]}function lo(){return{startTime:Date.now(),totalElapsedMs:0,completedQuestionsCount:0,averageDurationMs:0,records:[]}}var Je=lo();function We(){try{localStorage.removeItem(De)}catch{}return Je}function Yo(o){Je=o;try{let e=JSON.stringify(o);sessionStorage.setItem(De,e),localStorage.removeItem(De)}catch{}}function co(o){let e=Je,t=Date.now(),a=e.records[e.records.length-1];if(a&&a.id===o.id&&t-a.timestamp<3e3)return e;let i={...o,timestamp:t},n=[...e.records,i],s=n.filter(d=>d.status==="answered"||d.status==="verified").length,r=n.reduce((d,m)=>d+m.durationMs,0),u=s>0?Math.round(r/s):0,l={startTime:e.startTime||t,totalElapsedMs:Math.max(t-(e.startTime||t),r),completedQuestionsCount:s,averageDurationMs:u,records:n};return Yo(l),l}function $e(){Je=lo();try{sessionStorage.removeItem(De),localStorage.removeItem(De)}catch{}return Je}var Zo=new Set;function _o(o){for(let e of Zo)try{e(o)}catch(t){console.warn("[EasyQuiz Skills] Erro em listener:",t)}}function ea(o){try{let e=o||(typeof window<"u"?window.location.href:"");return e&&new URL(e).hostname.replace(/^www\./,"").toLowerCase()||"global"}catch{return"global"}}var ho="eq_skills_profile_",uo=20,po=15,Ye=new Map;function ta(o){let e=Date.now();return o.includes("khanacademy.org")?[{id:"khan_mathquill_val",name:"Khan Perseus MathQuill",description:'Inputs matem\xE1ticos com data-testid="perseus-expression-input" requerem foco seguido de insertText ou disparo de input/change.',rule:'Use val no controle eq-ctrl-X ou JS com document.execCommand("insertText", false, valor).',selectorPattern:'[data-testid*="expression-input"], .mq-editable-field',successCount:1,lastUsedAt:e,source:"heuristic"},{id:"khan_radio_choice",name:"Khan Perseus Escolha \xDAnica",description:'Alternativas de r\xE1dio no Khan Academy usam containers choice-radio-btn ou data-testid="choice-N".',rule:"Use chk com o ID do controle. Em caso de overlay, acione o label pai.",selectorPattern:'[data-testid*="choice-"], .choice-radio-btn',successCount:1,lastUsedAt:e,source:"heuristic"},{id:"khan_advance_btn",name:"Khan Avan\xE7o Perseus",description:"Bot\xE3o de verifica\xE7\xE3o/pr\xF3xima quest\xE3o Perseus fica no rodap\xE9 da tarefa.",rule:'Use {t:"adv"}. O sistema localiza o bot\xE3o de verifica\xE7\xE3o automaticamente.',selectorPattern:'[data-testid*="exercise-check-answer"], [data-testid*="exercise-next-question"]',successCount:1,lastUsedAt:e,source:"heuristic"}]:o.includes("google.com")||o.includes("forms.gle")?[{id:"gforms_container_clk",name:"Google Forms Container Click",description:"Em formul\xE1rios Google, radios e checkboxes s\xE3o encapsulados em divs com classe .Qr7Oae.",rule:"Clique no container de op\xE7\xE3o ou dispare eventos no radio nativo e seu wrapper.",selectorPattern:'.Qr7Oae, [data-item-id], [role="radio"]',successCount:1,lastUsedAt:e,source:"heuristic"}]:o.includes("wayground")||o.includes("quizizz")?[{id:"wayground_tile_clk",name:"Wayground Cards Clic\xE1veis",description:"As alternativas s\xE3o bot\xF5es/cards clic\xE1veis com id hexadecimal ou atributos data-functional-selector.",rule:"Use clk direto no ID do card ou no texto exato da alternativa.",selectorPattern:'[class*="cursor-pointer"][id], [data-functional-selector*="option"]',successCount:1,lastUsedAt:e,source:"heuristic"}]:[]}function Te(o){let e=ea(o);if(Ye.has(e))return Ye.get(e);try{let a=typeof localStorage<"u"?localStorage.getItem(ho+e):null;if(a){let i=JSON.parse(a);if(i&&Array.isArray(i.skills))return Ye.set(e,i),i}}catch(a){console.warn("[EasyQuiz Skills] Erro ao carregar perfil de skills:",a)}let t={domain:e,skills:ta(e),failedPatterns:[],flowNotes:[],lastUpdated:Date.now()};return Ye.set(e,t),t}function Rt(o){let e=o.domain||"global";o.lastUpdated=Date.now(),Ye.set(e,o);try{typeof localStorage<"u"&&localStorage.setItem(ho+e,JSON.stringify(o))}catch(t){console.warn("[EasyQuiz Skills] Falha ao persistir perfil de skills:",t)}_o(o)}function Nt(o,e){let t=Te(e),a=o.id||`skill_${o.name.toLowerCase().replace(/[^a-z0-9]/g,"_").slice(0,30)}`,i=Date.now(),n=t.skills.findIndex(r=>r.id===a||r.name===o.name),s;if(n!==-1){let r=t.skills[n];s={...r,description:o.description||r.description,rule:o.rule||r.rule,selectorPattern:o.selectorPattern||r.selectorPattern,successCount:r.successCount+1,lastUsedAt:i,source:o.source||r.source},t.skills[n]=s}else s={id:a,name:o.name,description:o.description,rule:o.rule,selectorPattern:o.selectorPattern,successCount:1,lastUsedAt:i,source:o.source||"ai_synthesized"},t.skills.push(s),t.skills.length>uo&&(t.skills.sort((r,u)=>u.successCount*2+(u.lastUsedAt>r.lastUsedAt?1:-1)-r.successCount*2),t.skills=t.skills.slice(0,uo));return Rt(t),s}function mo(o,e,t){let a=Te(t),i=o.id||o.from||o.name||"action",n=o.v!==void 0?String(o.v):void 0,s=`${o.t}:${i}:${n||""}`.slice(0,80),r=Date.now(),u=`Evite a a\xE7\xE3o (${o.t}) com alvo "${i}".`;e.includes("n\xE3o encontrado")||e.includes("desabilitado")?u=`O elemento "${i}" n\xE3o est\xE1 acess\xEDvel ou est\xE1 oculto. Use seletor alternativo ou c\xF3digo JS via $eq.`:(e.includes("n\xE3o marcou")||e.includes("inalterado"))&&(u=`Disparo padr\xE3o DOM em "${i}" n\xE3o alterou o estado. Necess\xE1rio evento sint\xE9tico no label pai ou bypass via script.`);let l=a.failedPatterns.findIndex(m=>m.id===s),d={id:s,actionType:o.t,target:String(i),attemptedValue:n,reason:e.slice(0,150),timestamp:r,retryAvoidanceHint:u};return l!==-1?a.failedPatterns[l]=d:(a.failedPatterns.unshift(d),a.failedPatterns.length>po&&(a.failedPatterns=a.failedPatterns.slice(0,po))),Rt(a),d}function Re(o,e,t){let a=o.id||o.name||"";a&&(e.includes("Estrat\xE9gia")||e.includes("script")||e.includes("keyboard"))&&Nt({id:`auto_repaired_${o.t}_${e.slice(0,20)}`,name:`Recupera\xE7\xE3o: ${e}`,description:`Na plataforma ativa, a\xE7\xF5es (${o.t}) em "${a}" foram bem-sucedidas via ${e}.`,rule:"Utilize preferencialmente inje\xE7\xE3o ou estrat\xE9gia equivalente quando interagir com controles similares nesta p\xE1gina.",source:"auto_repaired"},t)}function go(o,e){let t=Te(e),a=o.trim().slice(0,200);a&&!t.flowNotes.includes(a)&&(t.flowNotes.push(a),t.flowNotes.length>8&&(t.flowNotes=t.flowNotes.slice(-8)),Rt(t))}function fo(o){let e=Te(o),t="";if(e.skills.length>0){t+=`
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
`),t}var bo=`Voc\xEA \xE9 o motor operacional inteligente do EasyQuiz. Sa\xEDda EXCLUSIVA em JSON minificado, sem markdown, sem coment\xE1rios, sem texto fora do JSON.

\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
RACIOC\xCDNIO OBRIGAT\xD3RIO \u2014 PENSE ANTES DE AGIR
\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
Use o campo "thinking" do JSON para raciocinar de forma CALMA, CR\xCDTICA e ESTRUTURADA antes de decidir as actions.
O campo "thinking" \xE9 escrito ANTES das "actions". Siga esta ordem mental:

  PASSO 1 \u2014 Leia [TEXTO] completo. Identifique: tipo de quest\xE3o, enunciado, contexto, idioma, f\xF3rmulas matem\xE1ticas e imagens anexadas.
  PASSO 2 \u2014 Leia [RESPOSTAS]. Anote: quantos itens, IDs, tipos (t), textos (txt), estado atual (v).
  PASSO 2.5 \u2014 COMPARA\xC7\xC3O CR\xCDTICA ENTRE ALTERNATIVAS: Compare cada op\xE7\xE3o contra as demais. Isole pegadinhas e distratores. Justifique no "thinking" por que a alternativa escolhida supera as outras.
  PASSO 3 \u2014 Raciocine a resposta correta usando seu conhecimento. Seja preciso \u2014 n\xE3o adivinhe.
  PASSO 3.5 \u2014 VERIFICA\xC7\xC3O DE SKILLS & ANTI-PATTERNS: Verifique [BIBLIOTECA DE MINI-SKILLS] para usar padr\xF5es que j\xE1 funcionaram. Verifique [MEM\xD3RIA DE ANTI-PATTERNS (N\xC3O REPETIR)] para NUNCA cometer um erro registrado anteriormente nesta p\xE1gina.
  PASSO 4 \u2014 Escolha a ferramenta (clk/chk/val/sel/drag) certa para o tipo de controle.
  PASSO 5 \u2014 Verifique: o ID usado existe em [RESPOSTAS]? O tipo da a\xE7\xE3o bate com o tipo do elemento?
  PASSO 6 \u2014 Emita as actions. Confirme: adv \xE9 a \xDALTIMA a\xE7\xE3o se necess\xE1rio.

Exemplo de uso do campo thinking:
  "thinking": "Quest\xE3o de geometria. Op\xE7\xE3o B ('12 cm') resulta do teorema de Pit\xE1goras; op\xE7\xF5es A e C s\xE3o distratores comuns. Nenhuma falha pr\xE9via registrada para eq-ctrl-2. Uso chk."

N\xC3O produza sa\xEDda impulsiva. Racioc\xEDnio calmo evita erros e respostas trocadas.
O campo thinking \xE9 leve (1-4 linhas). N\xC3O escreva essays \u2014 seja telegr\xE1fico e preciso.

\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
AN\xC1LISE DE P\xC1GINA \u2014 INTERPRETA\xC7\xC3O INTELIGENTE DA INTERFACE
\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
Ao receber [DADOS], analise:

1. [TEXTO] \u2014 Conte\xFAdo textual principal: enunciado, contexto, alternativas, instru\xE7\xF5es.
2. [RESPOSTAS] \u2014 Controles interativos classificados como resposta: inputs, radios, checkboxes, selects, cards, bot\xF5es de op\xE7\xE3o. CADA um tem id, tipo (t), texto (txt), nome (n), valor atual (v) e op\xE7\xF5es (opt). Use EXCLUSIVAMENTE os IDs listados aqui.
3. [NAVEGA\xC7\xC3O] \u2014 Bot\xF5es/links de avan\xE7o (Pr\xF3xima, Check, Submit, Enviar, n\xFAmeros de p\xE1gina). Use quando precisar avan\xE7ar.
4. [IMAGENS E GR\xC1FICOS] \u2014 Visuais inline (inline_data) OU contexto textual [CONTEXTO_IMAGEM_N]. Veja instru\xE7\xE3o K abaixo.
5. [MEM\xD3RIA] \u2014 Fatos aprendidos de quest\xF5es anteriores desta sess\xE3o (use para contexto).
6. [PLATAFORMA] \u2014 Hint do sistema sobre como interagir com essa plataforma espec\xEDfica.
7. [BIBLIOTECA DE MINI-SKILLS DA P\xC1GINA] \u2014 Regras e habilidades comprovadas para este dom\xEDnio. Priorize estes m\xE9todos!
8. [MEM\xD3RIA DE ANTI-PATTERNS & ERROS DA P\xC1GINA \u2014 N\xC3O REPETIR!] \u2014 A\xE7\xF5es que falharam anteriormente. JAMAIS repita estas a\xE7\xF5es.
9. [FLUXO DA P\xC1GINA] \u2014 Notas sobre a progress\xE3o sequencial do quiz.

CLASSIFICA\xC7\xC3O OBRIGAT\xD3RIA (pageType):
- "question"  \u2192 h\xE1 [RESPOSTAS] n\xE3o-vazia OU o enunciado tem pergunta/alternativa. SEMPRE que houver controles de resposta.
- "info"      \u2192 p\xE1gina 100% informativa: artigo, teoria, instru\xE7\xE3o de leitura, sem nenhum controle de resposta.
- "start"     \u2192 tela de boas-vindas com bot\xE3o de iniciar a atividade (actions=[{t:"adv"}]).
- "conclusion"\u2192 tela final de encerramento/resultado/pontua\xE7\xE3o (actions=[]).

NUNCA classifique como "info" se [RESPOSTAS] tiver controles \u2014 isso descarta a quest\xE3o silenciosamente.

\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
FERRAMENTAS DISPON\xCDVEIS \u2014 A\xC7\xD5ES (actions[])
\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
Cada a\xE7\xE3o tem um campo "t" (tipo) e par\xE2metros espec\xEDficos.

\u250C\u2500\u2500\u2500\u2500\u2500\u252C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510
\u2502 "t" \u2502 QUANDO USAR                                               \u2502
\u251C\u2500\u2500\u2500\u2500\u2500\u253C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2524
\u2502 chk \u2502 Marcar checkbox ou radio. Par\xE2metros: id (ID do controle),\u2502
\u2502     \u2502 c: true. NUNCA emita c:false para desmarcar \u2014 o sistema   \u2502
\u2502     \u2502 resolve desmarca\xE7\xF5es automaticamente.                      \u2502
\u2502     \u2502 QUANDO: tipo "radio", "checkbox", "chk" em [RESPOSTAS].   \u2502
\u251C\u2500\u2500\u2500\u2500\u2500\u253C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2524
\u2502 clk \u2502 Clique direto em card, bot\xE3o de op\xE7\xE3o, tile, link.        \u2502
\u2502     \u2502 Par\xE2metros: id (ID ou texto do elemento).                  \u2502
\u2502     \u2502 QUANDO: tipo "submit", "button", cards/tiles sem input     \u2502
\u2502     \u2502 nativo, op\xE7\xF5es do Wayground/Quizizz/Duolingo.              \u2502
\u251C\u2500\u2500\u2500\u2500\u2500\u253C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2524
\u2502 val \u2502 Preencher input de texto, textarea ou campo num\xE9rico.      \u2502
\u2502     \u2502 Par\xE2metros: id, v (valor exato como string).               \u2502
\u2502     \u2502 QUANDO: tipo "text", "number", "textarea", "val" em        \u2502
\u2502     \u2502 [RESPOSTAS]. Para cada campo = uma a\xE7\xE3o val separada.      \u2502
\u251C\u2500\u2500\u2500\u2500\u2500\u253C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2524
\u2502 sel \u2502 Selecionar op\xE7\xE3o em dropdown/select nativo.                \u2502
\u2502     \u2502 Par\xE2metros: id, v (array de strings).                      \u2502
\u2502     \u2502 QUANDO: tipo "select", "combobox", "listbox" em            \u2502
\u2502     \u2502 [RESPOSTAS] com campo opt listando as op\xE7\xF5es dispon\xEDveis.  \u2502
\u251C\u2500\u2500\u2500\u2500\u2500\u253C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2524
\u2502 drag\u2502 Arrastar item para zona/categoria.                         \u2502
\u2502     \u2502 Par\xE2metros: from (ID ou texto do item), to (ID ou nome da  \u2502
\u2502     \u2502 zona/categoria de destino).                                 \u2502
\u2502     \u2502 QUANDO: quest\xE3o de arrastar/soltar, ordena\xE7\xE3o, ou          \u2502
\u2502     \u2502 categoriza\xE7\xE3o com drag-and-drop real. Se o widget tem       \u2502
\u2502     \u2502 bot\xF5es de categoria clic\xE1veis, prefira clk.                \u2502
\u251C\u2500\u2500\u2500\u2500\u2500\u253C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2524
\u2502 js  \u2502 C\xF3digo JavaScript executado via $eq (API interna).         \u2502
\u2502     \u2502 Par\xE2metros: code (string de c\xF3digo JS).                    \u2502
\u2502     \u2502 QUANDO: widget interativo que n\xE3o responde a eventos DOM    \u2502
\u2502     \u2502 convencionais (ex: Perseus/Khan Academy, sliders,           \u2502
\u2502     \u2502 canvas interativo). \xDALTIMO RECURSO.                         \u2502
\u251C\u2500\u2500\u2500\u2500\u2500\u253C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2524
\u2502 adv \u2502 AVAN\xC7O AUT\xD4NOMO para a pr\xF3xima etapa/quest\xE3o.              \u2502
\u2502     \u2502 Forma: {t:"adv"} \u2014 SEM outros par\xE2metros.                  \u2502
\u2502     \u2502 O SISTEMA encontra e clica o bot\xE3o de avan\xE7o sozinho.       \u2502
\u2502     \u2502 VOC\xCA N\xC3O deve tentar identificar nem clicar bot\xF5es de nav.  \u2502
\u2502     \u2502 NUNCA use clk para "Pr\xF3xima", "Next", "Check", "Enviar".   \u2502
\u2502     \u2502 SEMPRE use {t:"adv"} para avan\xE7ar \u2014 nunca clk em nav.      \u2502
\u2502     \u2502 QUANDO: ap\xF3s responder OU em page_type "info"/"start".      \u2502
\u2502     \u2502 DEVE ser a \xDALTIMA a\xE7\xE3o. N\xC3O emita antes das respostas.     \u2502
\u2514\u2500\u2500\u2500\u2500\u2500\u2534\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518


REGRA FUNDAMENTAL \u2014 UM M\xC9TODO POR ELEMENTO:
- Se [RESPOSTAS] tem controles listados: use EXCLUSIVAMENTE os IDs de [RESPOSTAS].
- N\xC3O use seletor CSS, N\xC3O use js, N\xC3O tente outros caminhos enquanto houver IDs em [RESPOSTAS].
- clk com seletor CSS e js s\xE3o EXCLUSIVOS para quando [RESPOSTAS] est\xE1 vazia.
- N\xC3O combine m\xE9todos: ou voc\xEA usa IDs de [RESPOSTAS] OU usa CSS/js. Nunca ambos.

\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
REGRAS DE SELE\xC7\xC3O DE FERRAMENTA \u2014 HEUR\xCDSTICAS DE INTERFACE
\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550

A. ESCOLHA \xDANICA (radio, escolha_unica):
   \u2192 Detectado por: [ESCOLHA-\xDAnica] no cabe\xE7alho de [RESPOSTAS], tipo "radio", ou apenas 1 resposta poss\xEDvel.
   \u2192 Use: exatamente 1 a\xE7\xE3o chk com c:true no ID correto + adv.
   \u2192 NUNCA emita 2 a\xE7\xF5es de marca\xE7\xE3o em escolha \xFAnica.

B. M\xDALTIPLA ESCOLHA (checkboxes, escolha_multipla):
   \u2192 Detectado por: [MULTI-SELE\xC7\xC3O] no cabe\xE7alho de [RESPOSTAS], tipo "checkbox".
   \u2192 Use: 1 a\xE7\xE3o chk para CADA op\xE7\xE3o correta identificada + adv.
   \u2192 Pode e DEVE haver 2, 3 ou mais a\xE7\xF5es chk. Omitir uma correta \xE9 erro.

C. PREENCHIMENTO \xDANICO (1 input/textarea):
   \u2192 Use: 1 a\xE7\xE3o val com o valor exato + adv.
   \u2192 Em quest\xF5es num\xE9ricas, use o n\xFAmero sem unidade (ex: "5" n\xE3o "5 cm").

D. M\xDALTIPLOS CAMPOS (matrizes, tabelas, grade):
   \u2192 Detectado por: [M\xDALTIPLOS CAMPOS] no cabe\xE7alho, 2+ controles tipo text/number.
   \u2192 Use: 1 a\xE7\xE3o val por campo com seu id exato + adv.
   \u2192 NUNCA agrupe v\xE1rios valores em 1 a\xE7\xE3o val.

E. CARDS/TILES CLIC\xC1VEIS (Wayground, Quizizz, Duolingo):
   \u2192 Detectado por: tipo "submit" ou "button" em [RESPOSTAS] com txt sendo o texto da alternativa.
   \u2192 Use: clk no ID do card correto + adv.
   \u2192 N\xC3O use chk para cards \u2014 eles n\xE3o s\xE3o inputs de formul\xE1rio.

E2. OP\xC7\xD5ES NUMERADAS ("1", "2", "3", "4" como alternativas):
   \u2192 Se [RESPOSTAS] lista elementos com txt="1", txt="2", txt="3", txt="4" \u2014 s\xE3o alternativas de quiz.
   \u2192 Use: clk no ID da op\xE7\xE3o correta (ex: a quest\xE3o pede "3" \u2192 {t:"clk",id:"[id do card 3]"}) + adv.
   \u2192 N\xC3O confunda com pagina\xE7\xE3o \u2014 alternativas NUNCA est\xE3o em [NAVEGA\xC7\xC3O], s\xF3 em [RESPOSTAS].

F. DROPDOWN/SELECT:
   \u2192 Detectado por: tipo "select"/"combobox" com campo opt listando op\xE7\xF5es.
   \u2192 Use: sel com v:[array dos valores corretos] + adv.

G. CATEGORIZA\xC7\xC3O / CLASSIFICA\xC7\xC3O (FATO/OPINI\xC3O, SIM/N\xC3O, grupos):
   \u2192 Se cards t\xEAm bot\xF5es internos de categoria: clk no bot\xE3o da categoria correta dentro de cada card.
   \u2192 Se \xE9 drag-and-drop real: drag de cada item para sua categoria.
   \u2192 Classifique TODOS os itens vis\xEDveis antes de emitir adv.
   \u2192 mode: "categorizacao" (categorias fixas) ou "arrastar_soltar" (arraste).

H. VERDADEIRO/FALSO EM GRADE OU TABELA (MATRIZ V/F):
   \u2192 Avalie CADA afirma\xE7\xE3o/linha individualmente.
   \u2192 Para N afirma\xE7\xF5es/linhas, emita EXATAMENTE N a\xE7\xF5es separadas (uma para cada linha/afirma\xE7\xE3o) + adv para verificar.
   \u2192 NUNCA marque apenas uma afirma\xE7\xE3o e deixe as outras em branco.
   \u2192 Formatos suportados e recomendados:
     - Com name do radio: {t:"chk", name:"vf_row_1", v:"V", c:true} ou {t:"clk", name:"vf_row_1", v:"V"}
     - Com ID do controle em [RESPOSTAS]: {t:"chk", id:"eq-ctrl-XX", v:"V", c:true} ou {t:"clk", id:"eq-ctrl-XX"}
     - Com texto da afirma\xE7\xE3o/linha: {t:"clk", id:"1. Todo sistema linear...", v:"V"}
   \u2192 mode: "verdadeiro_falso" (ou "matriz_vf").

I. ORDENA\xC7\xC3O DE ITENS (DRAG & DROP):
   \u2192 O contexto mostrar\xE1 [RESPOSTAS] com type="sortable".
   \u2192 Use drag sequencialmente: do item (from) para a posi\xE7\xE3o desejada (to).
   \u2192 Ex: {t:"drag",from:"Passo B",to:"Posi\xE7\xE3o 1"}
   \u2192 mode: "ordenacao".

I. REDA\xC7\xC3O / DISSERTA\xC7\xC3O:
   \u2192 Detectado por: textarea grande OU enunciado com "escreva", "disserte", "redija", "elabore", "reda\xE7\xE3o".
   \u2192 Use: 1 a\xE7\xE3o val com texto completo: t\xEDtulo (se pedido) + introdu\xE7\xE3o + desenvolvimento + conclus\xE3o.
   \u2192 M\xEDnimo 15 linhas de conte\xFAdo relevante ao tema.
   \u2192 mode: "texto_livre".

J. P\xC1GINA INFORMATIVA / ARTIGO:
   \u2192 [RESPOSTAS] vazia, apenas texto para ler.
   \u2192 Use: actions=[{t:"adv"}] para avan\xE7ar. N\xE3o invente respostas.

K. IMAGENS E GR\xC1FICOS \u2014 REGRAS OBRIGAT\xD3RIAS:
   \u2192 Imagens inline (inline_data): analise visualmente curvas, eixos, v\xE9rtices, coordenadas, geometria, propor\xE7\xF5es.
   \u2192 Contexto textual [CONTEXTO_IMAGEM_N]: use o texto descritivo como se fosse a imagem. Extraia informa\xE7\xF5es num\xE9ricas, rela\xE7\xF5es e elementos relevantes.
   \u2192 FILTRO DE RELEV\xC2NCIA: Se [CONTEXTO_IMAGEM_N] descreve um \xEDcone, logo, avatar ou elemento decorativo \u2192 IGNORE.
     Se descreve gr\xE1fico, tabela, f\xF3rmula, mapa, diagrama ou figura do enunciado \u2192 USE ATIVAMENTE para resolver.
   \u2192 CAMPO imageDescriptions (OBRIGAT\xD3RIO quando h\xE1 imagens):
     Para CADA imagem/contexto visual recebido, emita uma entrada em imageDescriptions[]:
     { "index": N, "description": "O que vejo/entendo (max 60 palavras)", "relevant": true/false, "associatedLabel": "label da imagem" }
     - Se relevant=false: descri\xE7\xE3o breve ("\xEDcone decorativo" / "logo do site")
     - Se relevant=true: descri\xE7\xE3o do conte\xFAdo \xFAtil para a quest\xE3o
   \u2192 Selecione a alternativa cujo gr\xE1fico/dados satisfaz matematicamente a quest\xE3o.

  M. IMAGEM AUSENTE MAS REFERENCIADA NO ENUNCIADO:
    \u2192 Se [TEXTO] menciona "observe", "analise a imagem", "a figura mostra", "de acordo com o gr\xE1fico",
      "veja o diagrama", "considere a imagem", "pela tabela", "no mapa" etc.
      MAS [IMAGENS] est\xE1 vazio, com status "FALHOU" ou "CONTEXTO_TEXTUAL" insuficiente:
    \u2192 NUNCA adivinhe a resposta. Emita confidence: 0.15 m\xE1ximo.
    \u2192 rationale deve indicar: "Imagem do enunciado n\xE3o dispon\xEDvel \u2014 resposta com baixa confian\xE7a"
    \u2192 Ainda assim emita a MELHOR estimativa poss\xEDvel usando o contexto textual e mem\xF3ria.
    \u2192 Se [IMAGEM_RELEVANTE_N\xC3O_CAPTURADA] aparece nas imagens, use todo o contexto textual associado.
    \u2192 memoryToStore: "Quest\xE3o dependia de imagem n\xE3o capturada"
    \u2192 Quando h\xE1 imagem com status FALHOU mas com textContext rico, use esse textContext como substituto.

\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
PLATAFORMAS ESPEC\xCDFICAS \u2014 REGRAS OBRIGAT\xD3RIAS
\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550

GOOGLE FORMS:
  \u2192 Controles s\xE3o [role="radio"] ou [role="checkbox"] com data-value.
  \u2192 IDs dos controles v\xEAm de data-item-id no container pai.
  \u2192 Use chk com c:true para radio/checkbox. Ex: {t:"chk",id:"eq-xxx-1",c:true}
  \u2192 Para texto livre (resposta curta/par\xE1grafo): use val com o texto. Ex: {t:"val",id:"eq-xxx-2",v:"resposta"}
  \u2192 Para dropdown (role="listbox"/"combobox"): use sel com o valor. Ex: {t:"sel",id:"eq-xxx-3",v:"op\xE7\xE3o"}
  \u2192 Ap\xF3s responder TODAS as perguntas do formul\xE1rio, use {t:"adv"} para enviar.
  \u2192 Se pageType="conclusion" (obrigado/enviado): actions=[{t:"adv"}] apenas.

WAYGROUND / QUIZIZZ \u2014 ESCOLHA M\xDALTIPLA:
  \u2192 Alternativas s\xE3o cards clic\xE1veis com cursor-pointer e ID hexadecimal.
  \u2192 Use clk no ID do card. Ex: {t:"clk",id:"6abc123"}
  \u2192 NUNCA use chk em Wayground \u2014 cards s\xE3o divs, n\xE3o inputs.

WAYGROUND / QUIZIZZ \u2014 CLASSIFICA\xC7\xC3O:
  \u2192 Items s\xE3o cards com cursor-grab e ID hexadecimal.
  \u2192 Categorias s\xE3o containers com texto vis\xEDvel (ex: "FATO", "OPINI\xC3O").
  \u2192 Use drag: {t:"drag",from:"ID_hex_do_item",to:"NOME_DA_CATEGORIA"}
  \u2192 Ex: {t:"drag",from:"6abc","to":"FATO"}
  \u2192 Ap\xF3s classificar TODOS os items, use {t:"adv"}.

KHAN ACADEMY / PERSEUS:
  \u2192 Campos de matem\xE1tica (.mq-editable-field) exigem nota\xE7\xE3o LaTeX. Exemplo: fra\xE7\xF5es como \\frac{1}{2}, ra\xEDzes como \\sqrt{3}.
  \u2192 Use \`val\` para campos de texto/matem\xE1tica. O sistema injeta via MathQuill automaticamente.
  \u2192 Use \`sel\` para dropdowns e \`chk\` ou \`clk\` para multipla escolha/checkbox.
  \u2192 O motor far\xE1 o fallback autom\xE1tico para a API do React/Perseus, n\xE3o emita a\xE7\xF5es \`js\` a menos que explicitamente exigido.

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
  \u2192 Se nenhum controle \xF3bvio: use o fallback CSS: {t:"clk",id:"[seletor CSS]"}
  \u2192 Ex: {t:"clk",id:"[data-value='Paris']"} ou {t:"clk",id:"button.answer-card:first-child"}

REGRA UNIVERSAL DE AVAN\xC7O:
  \u2192 Se pageType="info" ou "start": actions=[{t:"adv"}] \u2014 apenas avan\xE7ar.
  \u2192 Se pageType="question" SEM controles ([RESPOSTAS] vazia): tente {t:"adv"} como \xFAltimo recurso.
  \u2192 [NAVEGA\xC7\xC3O] lista os bot\xF5es de avan\xE7ar dispon\xEDveis \u2014 use o ID do bot\xE3o de avan\xE7o se dispon\xEDvel.


\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
REGRAS ABSOLUTAS
\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
1. Sa\xEDda APENAS JSON minificado \u2014 sem markdown, sem texto livre, sem coment\xE1rios.
2. NUNCA invente IDs. Use exclusivamente os listados em [RESPOSTAS] ou [NAVEGA\xC7\xC3O].
3. adv deve ser SEMPRE a \xFAltima a\xE7\xE3o do array.
4. rationale: m\xE1ximo 15 palavras (telegr\xE1fico: "Alternativas B e D corretas" ou "x=5 pela equa\xE7\xE3o").
5. NUNCA emita c:false \u2014 nunca desmarque explicitamente.
6. NUNCA emita adv se ainda h\xE1 itens de categoriza\xE7\xE3o/classifica\xE7\xE3o n\xE3o resolvidos.
7. Se [RESPOSTAS] tiver controles mas voc\xEA n\xE3o souber a resposta, ainda assim emita a a\xE7\xE3o com melhor estimativa \u2014 nunca retorne actions:[].

PLANO JSON (campos obrigat\xF3rios e opcionais):
{ "pageType": "question|info|start|conclusion", "mode": "...", "confidence": 0.0-1.0, "rationale": "...", "thinking": "...", "actions": [...], "memoryToStore": "...", "imageDescriptions": [], "learnedSkill": { "name": "...", "description": "...", "targetRule": "..." }, "flowState": { "stepDescription": "...", "expectedActionNext": "..." } }
imageDescriptions: array descrevendo cada imagem/contexto visual recebido. Array vazio [] quando n\xE3o h\xE1 imagens.
memoryToStore: fato conceitual \xFAtil para quest\xF5es futuras desta sess\xE3o (omitir se n\xE3o houver nada relevante).
learnedSkill: emita quando descobrir um padr\xE3o de intera\xE7\xE3o singular desta plataforma que deva ser guardado na biblioteca de mini-skills.
flowState: descri\xE7\xE3o da etapa de progresso no quiz/prova.

\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
L. SEM CONTROLES / INSPE\xC7\xC3O AUT\xD4NOMA DE P\xC1GINA
\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
Se [RESPOSTAS] mostrar "Nenhuma" ou lista vazia, o sistema inclui:
- [HTML]: HTML bruto da \xE1rea ativa da p\xE1gina \u2014 inspecione para encontrar elementos interativos.
- [DOM-INTERATIVO]: lista simplificada de elementos clic\xE1veis/interativos detectados na p\xE1gina.

Voc\xEA tem autoridade total para agir sobre qualquer elemento que encontrar nesses blocos.
Hierarquia de decis\xE3o aut\xF4noma (execute na ordem):

  1\xBA PRIORIDADE \u2014 Tente clk com texto exato ou ID do elemento:
     Ex: {t:"clk", id:"x = 5"}  ou  {t:"clk", id:"btn-next"}
     O sistema resolve o elemento por ID nativo, texto visi\xEDvel ou aria-label.

  2\xBA PRIORIDADE \u2014 Tente clk com seletor CSS:
     Ex: {t:"clk", id:"input[type='submit'][value='x = 5']"}
         {t:"clk", id:"button.option-card:nth-child(2)"}
         {t:"clk", id:"[data-answer='true']"}
     O id pode ser qualquer seletor CSS v\xE1lido \u2014 o sistema tenta document.querySelector(id).

  3\xBA PRIORIDADE \u2014 Use val com seletor CSS para preencher input/textarea que n\xE3o apareceu em [RESPOSTAS]:
     Ex: {t:"val", id:"#answer-input", v:"42"}
         {t:"val", id:"textarea.response-field", v:"Texto da resposta"}

  4\xBA PRIORIDADE \u2014 Use js para inje\xE7\xE3o direta e completa quando nada mais funciona:
     Ex: {t:"js", code:"document.querySelector('.option[data-idx="1"]').click()"}
         {t:"js", code:"$eq.val('#resp', '5'); $eq.clk('#btn-check')"}
     API $eq dispon\xEDvel: $eq.clk(selector), $eq.val(selector, value), $eq.chk(selector, true)

  5\xBA \u2014 S\xF3 classifique como pageType:"info" e emita adv se tiver CERTEZA absoluta de que
     n\xE3o h\xE1 NENHUM elemento interativo de resposta na p\xE1gina. Na d\xFAvida, tente 1\xBA ou 4\xBA.

REGRA CR\xCDTICA: Mesmo sem [RESPOSTAS], se o [TEXTO] contiver uma pergunta ou alternativas, a
p\xE1gina \xC9 uma quest\xE3o. Analise o [HTML] e [DOM-INTERATIVO] para encontrar como responder.
`;function oa(o,e){if(/forms\.(google|gle)\.com|docs\.google\.com\/forms/i.test(o)||e.includes("Qr7Oae")||e.includes("freebirdFormviewer")||e.includes("data-item-id"))return"[PLATAFORMA: Google Forms \u2014 use clk nos containers de alternativa; IDs via data-item-id ou texto da op\xE7\xE3o]";if(/wayground|quizizz/i.test(o)||e.includes("data-functional-selector"))return e.includes("classification")||e.toLowerCase().includes("fato")||e.toLowerCase().includes("opini")?`[PLATAFORMA: Wayground/Quizizz CLASSIFICA\xC7\xC3O drag-and-drop]
[RESPOSTAS] ter\xE1 items com t="draggable" e id hexadecimal (ex: 695fa5b6...).
Use EXCLUSIVAMENTE: {t:"drag", from:"ID_hexadecimal_do_card", to:"NOME_DA_CATEGORIA"}
Exemplo: {t:"drag",from:"695fa5b69885555d8155a5ac",to:"FATO"}
Classifique TODOS os items (1 drag por item) antes de emitir adv.
mode: "arrastar_soltar"`:"[PLATAFORMA: Wayground/Quizizz \u2014 alternativas s\xE3o cards clic\xE1veis, use clk]";if(/khanacademy\.org/i.test(o)||e.includes("perseus")){let t=e.includes("perseus-expression-input")||e.includes("perseus-math-input"),a=e.includes("perseus-radio")||e.includes("perseus-checkbox")||e.includes("choice-radio")||e.includes("choice_"),i=e.includes("perseus-dropdown")||e.includes("perseus-select"),n=e.includes("perseus-input-number")||e.includes("unit-input")||e.includes("numerator")||e.includes("denominator"),s=`[PLATAFORMA: Khan Academy / Perseus]
`;return s+=`REGRAS CR\xCDTICAS PARA KHAN ACADEMY:
`,a&&(s+='\u2022 M\xDALTIPLA ESCOLHA: As alternativas s\xE3o radio buttons com classe "choice-radio-btn" ou data-testid contendo "choice". ',s+=`Use chk com o ID do controle listado em [RESPOSTAS]. Se n\xE3o funcionar, use {t:"js",v:"$eq('[data-testid*=choice]:nth-child(N)').click()"}
`),t&&(s+="\u2022 EXPRESS\xC3O MATEM\xC1TICA: Input Perseus [data-testid=perseus-expression-input] ou .mq-editable-field. ",s+=`Use val com o ID do controle. Se o input n\xE3o aceitar val, use {t:"js",v:"const el=$eq('[data-testid=perseus-expression-input] .mq-editable-field'); el.focus(); document.execCommand('selectAll'); document.execCommand('insertText',false,'VALOR')"}
`),n&&(s+='\u2022 INPUT NUM\xC9RICO: Use val com o ID do controle (ex: {t:"val",id:"eq-ctrl-X",v:"42"}). ',s+=`Se recusar, use {t:"js",v:"const i=$eq('input[data-testid*=input]'); i.value='42'; i.dispatchEvent(new Event('input',{bubbles:true})); i.dispatchEvent(new Event('change',{bubbles:true}))"}
`),i&&(s+=`\u2022 DROPDOWN PERSEUS: Use sel com o ID. Fallback: {t:"js",v:"$eq('select').value='OPCAO'; $eq('select').dispatchEvent(new Event('change',{bubbles:true}))"}
`),s+=`\u2022 BOT\xC3O CHECK/VERIFICAR: Use {t:"adv"} \u2014 o sistema localiza automaticamente o bot\xE3o de verifica\xE7\xE3o Perseus.
`,s+="\u2022 SEMPRE prefira os IDs de [RESPOSTAS] antes de tentar JS. JS \xE9 \xDALTIMO RECURSO para widgets que n\xE3o respondem a eventos DOM.",s}return/moodle|ava\.|classroom\.google/i.test(o)?"[PLATAFORMA: Moodle/AVA/Classroom \u2014 formul\xE1rios padr\xE3o]":/duolingo/i.test(o)?"[PLATAFORMA: Duolingo \u2014 tiles clic\xE1veis, use clk por texto]":/blackboard|canvas\.instructure/i.test(o)?"[PLATAFORMA: Canvas/Blackboard \u2014 quiz-question padr\xE3o]":/socrative|kahoot/i.test(o)?"[PLATAFORMA: Socrative/Kahoot \u2014 alternativas s\xE3o bot\xF5es, use clk]":""}function Ze(o,e,t){let a=o.htmlSnippet.includes("draggable")||o.htmlSnippet.includes("perseus")||o.htmlSnippet.includes("category")||o.htmlSnippet.includes("dropzone")||o.controls.some(y=>y.type==="draggable"||y.type==="dropzone"),i=/katex|latex|\\frac|\\sqrt/i.test(o.htmlSnippet),n=/forms\.(google|gle)\.com|docs\.google\.com\/forms/i.test(o.sourceUrl)||o.htmlSnippet.includes("Qr7Oae")||o.htmlSnippet.includes("data-item-id")||o.htmlSnippet.includes("freebirdFormviewer"),s=(/wayground|quizizz/i.test(o.sourceUrl)||o.htmlSnippet.includes("data-functional-selector"))&&(o.htmlSnippet.includes("classification")||o.controls.filter(y=>y.role==="answer").length===0),r=o.controls.filter(y=>y.role!=="navigation").length===0,u=r||a||n||s||i&&o.questionText.length<60,l=r?4500:s?6e3:1800,d=u?`
[HTML]:
${o.htmlSnippet.slice(0,l).replace(/\s+/g," ")}`:"",m="";if(r&&typeof document<"u")try{let y=Array.from(document.querySelectorAll('input:not([type=hidden]), textarea, select, button, [role="button"], [role="radio"], [role="checkbox"], [role="option"], [onclick], [data-action], a[href]:not([href="#"]), [tabindex]:not([tabindex="-1"])')).filter(x=>{let w=x,q=w.getBoundingClientRect?.()||{width:0,height:0};return q.width>0&&q.height>0&&!w.closest("#easyquiz-shadow-root, .eq-sidebar")}).slice(0,40).map(x=>{let w=x,q=w.tagName.toLowerCase(),S=w.id?`#${w.id}`:"",T=w.className&&typeof w.className=="string"?`.${w.className.trim().split(/\s+/).slice(0,2).join(".")}`:"",A=(w.textContent||w.value||w.getAttribute("aria-label")||"").trim().slice(0,60),P=w.getAttribute("type")||w.getAttribute("role")||"";return`${q}${S}${T}[${P}] txt="${A}"`});y.length>0&&(m=`
[DOM-INTERATIVO]:
${y.join(`
`)}`)}catch{}let c=ct(),h=c.length>0?`
[MEM\xD3RIA]:
${c.join(" | ")}
`:"",p=o.controls.filter(y=>y.role!=="navigation"),g=o.controls.filter(y=>y.role==="navigation"),f=oa(o.sourceUrl,o.htmlSnippet),b=f?`
${f}
`:"",v=fo(o.sourceUrl);return`--- AN\xC1LISE ---
[MODO]: ${t.engine} | Dica: ${t.modeHint||"Auto"}
[URL]: ${o.sourceUrl}
[P\xC1GINA]: ${o.pageTitle}${h}${b}${v}
[DADOS]
[TEXTO]:
${o.questionText}${d}${m}

[RESPOSTAS]:
${(()=>{if(p.length===0)return"Nenhuma";let y=p.filter(k=>k.type==="checkbox"||k.type==="chk"),x=new Set(p.filter(k=>k.type==="radio").map(k=>k.name).filter(Boolean)),w=y.filter(k=>!k.name||!x.has(k.name)),q=/selecione as|assinale as|quais das|todas as|marque as|escolha as|quais dessas|quais dos/i.test(o.questionText),S=w.length>=2||q,T=x.size>1||/verdadeir|fals[oa]|\bv\s*\/\s*f\b|julgue|itens/i.test(o.questionText)&&x.size>=1,A=p.every(k=>k.type==="radio"||k.type==="chk")&&x.size===1&&!S&&!T,P=p.filter(k=>k.type==="text"||k.type==="number"||k.type==="val"||k.tag==="input"||k.tag==="textarea"),z=P.length>=2;return(T?`[GRADE VERDADEIRO/FALSO (${x.size||"m\xFAltiplas"} afirma\xE7\xF5es): voc\xEA DEVE julgar e marcar exatamente 1 op\xE7\xE3o (V ou F) para CADA uma das ${x.size} afirma\xE7\xF5es \u2014 emita ${x.size} a\xE7\xF5es chk separadas + adv]
`:S?`[MULTI-SELE\xC7\xC3O: marque TODOS os corretos, pode ser 2 ou mais]
`:A?`[ESCOLHA-\xDAnica: marque APENAS 1 op\xE7\xE3o \u2014 compare criticamente todas as alternativas antes de escolher]
`:z?`[M\xDALTIPLOS CAMPOS DE PREENCHIMENTO (${P.length} campos): emita uma a\xE7\xE3o val para CADA um dos ${P.length} campos abaixo com seu id exato]
`:"")+JSON.stringify(p.map((k,E)=>{let L=k.label&&/^[A-Ea-e][\)\.\:\-\s]/.test(k.label.trim())?k.label.trim().charAt(0).toUpperCase():String.fromCharCode(65+E%26);return{id:k.id,t:k.type,item:L,n:k.name||void 0,txt:k.label?k.label.length>220?k.label.slice(0,220)+"...":k.label:void 0,v:k.value||void 0,opt:k.options&&k.options.length?k.options.slice(0,20).map(R=>R.label||R.value):void 0}}))})()}

[NAVEGA\xC7\xC3O]:
${g.length>0?g.map(y=>`"${y.label||y.id}"[${y.type}]`).join(","):"Nenhuma"}

[IMAGENS E GR\xC1FICOS ANEXADOS (${e.length})]:
${(()=>{if(e.length===0)return/\b(observ[ea]|analis[ea]|figur[a]|gráfic[o]|diagram[a]|image[mn]|mapa|tabela|veja|conforme|de acordo com|pela|ilustra|representa|mostr[a]|exib[ea]|consider[ea]\s+(a|o)\s+(image|figur|gráfic|diagram|tabela|mapa))\b/i.test(o.questionText)?"[AVISO CR\xCDTICO]: O enunciado referencia conte\xFAdo visual (gr\xE1fico/imagem/figura/diagrama) mas NENHUMA imagem foi capturada. Sua confian\xE7a DEVE ser \u22640.15. N\xC3O adivinhe \u2014 use apenas o contexto textual dispon\xEDvel.":"Nenhum anexo visual.";let y=e.filter(T=>T.captureStatus==="failed_relevant"),w=/\b(observ[ea]|analis[ea]|figur[a]|gráfic[o]|diagram[a]|image[mn]|mapa|tabela|veja|conforme|de acordo com|pela|ilustra|representa|mostr[a])\b/i.test(o.questionText),q=e.every(T=>T.captureStatus!=="captured"),S="";return(y.length>0||w&&q)&&(S=`
  [AVISO]: Imagem(s) relevante(s) do enunciado N\xC3O puderam ser capturadas visualmente. Use o contexto textual abaixo como substituto. Confian\xE7a deve ser reduzida.
`),S+e.map((T,A)=>{let P=T.associatedLabel||"Gr\xE1fico da Quest\xE3o",z=T.alt?` | alt: "${T.alt}"`:"";if(T.captureStatus==="failed_relevant")return`  - Imagem ${A+1} [IMAGEM_RELEVANTE_N\xC3O_CAPTURADA]: ${P}${z} | ${T.textContext||"sem contexto adicional"} | src: ${(T.source||"").slice(0,100)}`;if(T.captureStatus==="text_only")return`  - Imagem ${A+1} [CONTEXTO_TEXTUAL]: ${P}${z} | ${T.textContext||"sem contexto adicional"}`;if(T.captureStatus==="captured"||T.base64){let N=T.textContext?` | Textos e r\xF3tulos do gr\xE1fico: "${T.textContext}"`:"";return`  - Imagem ${A+1} [VISUAL_INLINE]: ${P}${z}${N}`}return`  - Imagem ${A+1} [FALHOU]: ${P}${z}`}).join(`
`)})()}
[/DADOS]
Sa\xEDda em JSON v\xE1lido.`}var aa=new Set(["question","info","start","conclusion"]),na=new Set(["texto_livre","escolha_unica","escolha_multipla","verdadeiro_falso","preenchimento","acao_sem_resposta","categorizacao","ordenacao","arrastar_soltar"]),ia=new Set(["val","chk","sel","clk","adv","js","drag"]),sa=150,_e=2e3;function de(o,e=""){return o==null?e:typeof o=="string"?o.trim().slice(0,_e):typeof o=="number"||typeof o=="boolean"?String(o).trim().slice(0,_e):e}function ra(o,e){if(!o||typeof o!="object")return null;let t=o,a=t.t;if(typeof a!="string"||!ia.has(a))return null;if(a==="adv"){let r=t.id??t.target??t.name??t.selector;return{t:"adv",...de(r)?{id:de(r,"").slice(0,500)}:{}}}if(a==="drag"){let r=de(t.from??t.source),u=de(t.to??t.target??t.destination);return!r||!u?null:{t:"drag",from:r.slice(0,500),to:u.slice(0,500)}}if(a==="js"){let r=de(t.v??t.code??t.script);return!r||r.length>8e3?null:{t:"js",v:r}}let i=t.id??t.target??t.name??t.selector??t.element;(i==null||i==="")&&a==="val"&&(i="1");let n=de(i).slice(0,500);if(!n)return null;if(a==="val"){let r=t.v!==void 0?t.v:t.value!==void 0?t.value:t.val!==void 0?t.val:t.text!==void 0?t.text:t.answer;return{t:"val",id:n,v:de(r).slice(0,_e)}}if(a==="sel"){let r=t.v!==void 0?t.v:t.value!==void 0?t.value:t.val!==void 0?t.val:t.values,l=(Array.isArray(r)?r:[r]).map(d=>de(d).slice(0,500)).filter(Boolean);return{t:"sel",id:n,v:l}}if(a==="chk"){let r=t.c===!1||t.c==="false"||t.c===0||t.c==="0"||t.c==="off"||t.c==="unchecked"||t.c==="desmarcar",u={t:"chk",id:n,c:!r};return t.v!==void 0&&(u.v=de(t.v).slice(0,_e)),u}let s={t:"clk",id:n};if(t.c!==void 0){let r=t.c===!1||t.c==="false"||t.c===0||t.c==="0"||t.c==="off"||t.c==="unchecked"||t.c==="desmarcar";s.c=!r}return t.v!==void 0&&(s.v=de(t.v).slice(0,_e)),Array.isArray(t.co)&&t.co.length===2&&t.co.every(r=>typeof r=="number"&&Number.isFinite(r))&&(s.co=[t.co[0],t.co[1]]),s}function la(o,e,t){if(t!=="question")return o;let a=o.filter(n=>n.t==="adv"),i=o.filter(n=>n.t!=="adv");if(e==="escolha_unica"){i=i.filter(s=>!(s.t==="chk"&&s.c===!1||s.t==="clk"&&s.c===!1));let n=i.filter(s=>s.t==="chk"||s.t==="clk");if(n.length>1){let s=i.filter(u=>u.t!=="chk"&&u.t!=="clk"),r=n[n.length-1];i=[...s,r]}}else if(e==="escolha_multipla"){i=i.filter(s=>!(s.t==="chk"&&s.c===!1||s.t==="clk"&&s.c===!1));let n=new Set;i=i.filter(s=>{let r="id"in s&&typeof s.id=="string"?s.id:"";return r?n.has(r)?!1:(n.add(r),!0):!0})}else if(e==="verdadeiro_falso"){let n=new Set,s=[...i].reverse(),r=[];for(let u of s){let l="id"in u&&typeof u.id=="string"?u.id:"";l?n.has(l)||(n.add(l),r.push(u)):r.push(u)}i=r.reverse()}return[...i,...a]}function vo(o){if(!o||typeof o!="object")return{pageType:"info",mode:"acao_sem_resposta",confidence:.5,rationale:"Resposta estruturada n\xE3o identificada; avan\xE7ando como informativo.",actions:[{t:"adv"}]};let e=o,t=e.pageType,a=e.mode;(typeof t!="string"||!aa.has(t))&&(t="question"),(typeof a!="string"||!na.has(a))&&(a="escolha_unica");let i=Array.isArray(e.actions)?e.actions:[],n=[];for(let u=0;u<Math.min(i.length,sa);u++){let l=ra(i[u],u);l&&n.push(l)}n.some(u=>u.t==="val")&&(a==="escolha_unica"||!e.mode)&&(a="preenchimento"),n.some(u=>u.t==="drag")&&!["categorizacao","arrastar_soltar","ordenacao"].includes(a)&&(a="arrastar_soltar"),n=la(n,a,t);let s=n.some(u=>u.t==="adv");t==="conclusion"?n.length=0:t==="info"||t==="start"?s||n.push({t:"adv"}):t==="question"&&!s&&n.push({t:"adv"});let r=typeof e.confidence=="number"&&Number.isFinite(e.confidence)?Math.min(1,Math.max(0,e.confidence)):.85;return{pageType:t,mode:a,confidence:r,rationale:de(e.rationale,"Plano validado e auto-recuperado."),actions:n,...de(e.memoryToStore)?{memoryToStore:de(e.memoryToStore)}:{},...e.needsMoreContext?{needsMoreContext:!!e.needsMoreContext}:{}}}var pe=class{keys=new Map;constructor(e=[]){this.init(e)}init(e){let t=new Map(this.keys);this.keys.clear();let a=e.flatMap(n=>n.split(/[\n\r]+/));Array.from(new Set(a.map(n=>n.trim().replace(/^["']|["']$/g,"")).filter(n=>n.length>5))).forEach((n,s)=>{let r=this.generateId(n),u=t.get(r)||t.get(n);this.keys.set(r,{id:r,key:n,label:u?.label||`Chave ${s+1}`,addedAt:u?.addedAt||Date.now(),lastUsedAt:u?.lastUsedAt,lastLatencyMs:u?.lastLatencyMs,cooldownUntil:u?.cooldownUntil,errorCount:u?.errorCount||0,lastError:u?.lastError,winCount:u?.winCount||0})})}generateId(e){let t=0;for(let i=0;i<e.length;i++)t=(t<<5)-t+e.charCodeAt(i),t|=0;let a=e.slice(-12).replace(/[^a-zA-Z0-9]/g,"").slice(0,6);return`key_${Math.abs(t).toString(36).slice(0,6)}${a}`}static maskKey(e){let t=e.trim().replace(/^["']|["']$/g,"");return t.length<=10?"\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022":`${t.slice(0,6)}...${t.slice(-4)}`}getAllKeys(){let e=Date.now();return Array.from(this.keys.values()).map(t=>{let a=Math.max(0,(t.cooldownUntil||0)-e);return{...t,isCooldown:a>0,remainingCooldownMs:a}})}getHealthyKeys(){let e=Date.now();return Array.from(this.keys.values()).filter(t=>(t.cooldownUntil||0)<=e&&(t.errorCount||0)<50)}getRoundRobinKeys(e=2){let t=Date.now(),a=Array.from(this.keys.values()).filter(n=>(n.errorCount||0)<50);if(a.length===0)return Array.from(this.keys.values()).slice(0,e);let i=a.filter(n=>(n.cooldownUntil||0)<=t);return i.length>0?(i.sort((n,s)=>{let r=n.lastLatencyMs!==void 0?n.lastLatencyMs:99999,u=s.lastLatencyMs!==void 0?s.lastLatencyMs:99999;if(r!==u)return r-u;let l=(n.lastUsedAt||0)-(s.lastUsedAt||0);return l!==0?l:n.addedAt-s.addedAt}),i.slice(0,e)):(a.sort((n,s)=>(n.cooldownUntil||0)-(s.cooldownUntil||0)),a.slice(0,e))}getBestKey(){return this.getRoundRobinKeys(1)[0]?.key||""}getDiverseKeys(e){return this.getRoundRobinKeys(e).map(t=>t.key)}markQuotaHit(e,t=8e3){let a=this.findKeyObj(e);a&&(a.cooldownUntil=Date.now()+t,a.lastError=`Cota tempor\xE1ria atingida (HTTP 429). Cooldown de ${Math.round(t/1e3)}s ativado.`)}markOverloaded(e,t=5e3){let a=this.findKeyObj(e);a&&(a.cooldownUntil=Date.now()+t,a.lastError=`Servidores sobrecarregados (HTTP 503). Cooldown de ${Math.round(t/1e3)}s ativado.`)}markSuccess(e,t){let a=this.findKeyObj(e);a&&(a.lastLatencyMs=t,a.lastUsedAt=Date.now(),a.errorCount=0,a.lastError=void 0,a.cooldownUntil=void 0)}markWinner(e){let t=this.findKeyObj(e);t&&(t.winCount=(t.winCount||0)+1)}markInvalid(e,t){let a=this.findKeyObj(e);a&&(a.errorCount=99,a.lastError=t)}addKey(e,t){let a=e.trim().replace(/^["']|["']$/g,"");if(!a)return{ok:!1,message:"Chave n\xE3o pode ser vazia."};if(a.length<15)return{ok:!1,message:"Chave de API inv\xE1lida ou muito curta."};let i=this.generateId(a);if(this.keys.has(i)||Array.from(this.keys.values()).some(r=>r.key===a))return{ok:!1,message:"Esta chave de API j\xE1 est\xE1 cadastrada."};let s={id:i,key:a,label:t?.trim()||`Chave ${this.keys.size+1}`,addedAt:Date.now(),errorCount:0};return this.keys.set(i,s),{ok:!0,message:"Chave adicionada com sucesso!",keyItem:s}}updateKey(e,t,a){let i=this.keys.get(e);if(!i)return{ok:!1,message:"Chave n\xE3o encontrada."};let n=t.trim().replace(/^["']|["']$/g,"");return!n||n.length<15?{ok:!1,message:"Chave de API inv\xE1lida."}:(i.key=n,a!==void 0&&(i.label=a.trim()),i.errorCount=0,i.cooldownUntil=void 0,i.lastError=void 0,{ok:!0,message:"Chave atualizada com sucesso!"})}removeKey(e){if(this.keys.size<=1)return{ok:!1,message:"Voc\xEA precisa manter pelo menos 1 chave de API cadastrada."};let t=this.findKeyObj(e);return t?(this.keys.delete(t.id),{ok:!0,message:"Chave removida com sucesso."}):{ok:!1,message:"Chave n\xE3o encontrada."}}exportRawKeys(){return Array.from(this.keys.values()).map(e=>e.key)}size(){return this.keys.size}findKeyObj(e){if(this.keys.has(e))return this.keys.get(e);for(let t of this.keys.values())if(t.key===e)return t}},X=new pe;var Fe=[{id:"gemini-3.8-flash",name:"Gemini 3.8 Flash (Flagship 2026)",description:"Modelo Flash topo de linha Set/2026. Agente, multimodal, thinking adaptativo. Recomendado para a maioria das quest\xF5es.",stable:!0},{id:"gemini-3.5-flash",name:"Gemini 3.5 Flash (R\xE1pido e Capaz)",description:"Alta performance multimodal. Excelente para quest\xF5es complexas com velocidade.",stable:!0},{id:"gemini-3.5-flash-lite",name:"Gemini 3.5 Flash-Lite (Cota Alta)",description:"Ultra-leve e econ\xF4mico. Maior RPM, ideal para alto volume de quest\xF5es simples.",stable:!0},{id:"gemini-3.1-pro",name:"Gemini 3.1 Pro (Racioc\xEDnio Profundo)",description:"Modelo pro de \xFAltima gera\xE7\xE3o: matem\xE1tica avan\xE7ada, l\xF3gica, exatas e quest\xF5es de alta complexidade.",stable:!0},{id:"gemini-2.5-flash",name:"Gemini 2.5 Flash (Est\xE1vel)",description:"Modelo comprovado de alt\xEDssima disponibilidade. Boa op\xE7\xE3o de fallback est\xE1vel.",stable:!0},{id:"gemini-2.5-pro",name:"Gemini 2.5 Pro (Avan\xE7ado)",description:"Alternativa pro de alta confiabilidade para quest\xF5es de racioc\xEDnio profundo.",stable:!0}],yo=["gemini-3.5-flash-lite","gemini-3.5-flash","gemini-3.8-flash","gemini-2.5-flash"],ca={"gemini-3.7-flash":"gemini-3.8-flash","gemini-3.6-flash":"gemini-3.5-flash","gemini-2.0-flash":"gemini-2.5-flash","gemini-2.0-flash-lite":"gemini-3.5-flash-lite","gemini-1.5-flash":"gemini-3.5-flash","gemini-1.5-pro":"gemini-3.1-pro","gemini-1.0-pro":"gemini-2.5-flash","gemini-flash-latest":"gemini-3.8-flash"};function Qt(o){return ca[o]??o}function da(o,e){let a={temperature:0,maxOutputTokens:1350,responseMimeType:"application/json",responseSchema:e??ua};return/lite/i.test(o)||(/gemini-3\.[0-9]+-?flash/i.test(o)?a.thinkingConfig={thinkingBudget:0}:/gemini-2\.[5-9]-?flash/i.test(o)&&(a.thinkingConfig={thinkingBudget:0})),a}var ua={type:"OBJECT",properties:{pageType:{type:"STRING",enum:["question","info","start","conclusion"]},mode:{type:"STRING",enum:["texto_livre","escolha_unica","escolha_multipla","verdadeiro_falso","preenchimento","acao_sem_resposta","categorizacao","ordenacao","arrastar_soltar"]},confidence:{type:"NUMBER"},rationale:{type:"STRING"},thinking:{type:"STRING"},memoryToStore:{type:"STRING"},learnedSkill:{type:"OBJECT",properties:{name:{type:"STRING"},description:{type:"STRING"},targetRule:{type:"STRING"}}},flowState:{type:"OBJECT",properties:{stepDescription:{type:"STRING"},expectedActionNext:{type:"STRING"}}},imageDescriptions:{type:"ARRAY",items:{type:"OBJECT",properties:{index:{type:"NUMBER"},description:{type:"STRING"},relevant:{type:"BOOLEAN"},associatedLabel:{type:"STRING"}}}},actions:{type:"ARRAY",items:{type:"OBJECT",properties:{t:{type:"STRING",enum:["val","chk","sel","clk","adv","js","drag"]},id:{type:"STRING"},name:{type:"STRING"},label:{type:"STRING"},v:{type:"STRING"},c:{type:"BOOLEAN"},co:{type:"ARRAY",items:{type:"NUMBER"}},from:{type:"STRING"},to:{type:"STRING"}},required:["t"]}}},required:["pageType","mode","confidence","rationale","actions"]};function Ao(o){let e=o.trim().replace(/^google\//,"").replace(/^models\//,"");if(!e)return"gemini-3.8-flash";let t=Qt(e);return ce(t)?t:(console.warn(`[EasyQuiz] Modelo n\xE3o reconhecido: "${e}" \u2014 mantido como-est\xE1 (pode ser modelo novo da sua conta).`),e)}function jt(o,e){let t="";try{let a=JSON.parse(o);t=a.error?.message||a.message||""}catch{t=o.slice(0,160)}return/API_KEY_INVALID|API key not valid|key.*invalid|unregistered/i.test(t)?"Chave de API do Gemini inv\xE1lida ou n\xE3o autorizada no Google AI Studio.":/RESOURCE_EXHAUSTED|Quota exceeded|rate limit|quota/i.test(t)||e===429?`Cota do Gemini excedida (HTTP 429): ${t||"Aguarde"}`:e===404?`HTTP 404: ${t||"Modelo ou endpoint n\xE3o encontrado no Google AI Studio"}`:e===503||/overloaded/i.test(t)?`Servidores Google sobrecarregados (HTTP 503): ${t||"Aguardando"}`:t?`Erro Gemini (HTTP ${e}): ${t}`:`Falha na requisi\xE7\xE3o ao Gemini (HTTP ${e}).`}function pa(o){let e=o.trim(),t=e.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);if(t)try{return JSON.parse(t[1].trim())}catch{}try{return JSON.parse(e)}catch{}let a=e.match(/\{[\s\S]*\}/);if(a)try{return JSON.parse(a[0].trim())}catch{}try{let i=e.indexOf("{");if(i!==-1){let n=e.slice(i).trim();n=n.replace(/,\s*\{[^}]*$/,""),n=n.replace(/,\s*$/,"");let s=0,r=0,u=!1,l=!1;for(let m=0;m<n.length;m++){let c=n[m];if(l){l=!1;continue}if(c==="\\"){l=!0;continue}if(c==='"'){u=!u;continue}u||(c==="{"?s++:c==="}"?s=Math.max(0,s-1):c==="["?r++:c==="]"&&(r=Math.max(0,r-1)))}for(u&&(n+='"');r>0;)n+="]",r--;for(;s>0;)n+="}",s--;let d=JSON.parse(n);if(d&&typeof d=="object")return d}}catch{}throw new Error("Falha ao decodificar JSON da IA.")}var wo=(()=>{try{let o=typeof localStorage<"u"?localStorage.getItem("easyquiz_cached_models"):null;if(!o)return null;let e=JSON.parse(o);if(Array.isArray(e)){let t=e.filter(a=>a&&typeof a.id=="string"&&ce(a.id));return t.length>0?t:null}return null}catch{return null}})(),Bt=new Set;async function pt(o){let e=o.trim().replace(/^["']|["']$/g,"");if(!e)return Fe;let t=[`https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(e)}`,`https://generativelanguage.googleapis.com/v1/models?key=${encodeURIComponent(e)}`];for(let a of t)try{let i=await fetch(a,{headers:{"Content-Type":"application/json","x-goog-api-key":e}});if(!i.ok){let s=await i.text(),r=jt(s,i.status);if(r.includes("inv\xE1lida")||r.includes("n\xE3o autorizada"))throw new Error(r);continue}let n=await i.json();if(Array.isArray(n.models)&&n.models.length>0){let s=n.models.filter(r=>{let u=r.supportedGenerationMethods||[],l=(r.name||"").replace(/^models\//,""),d=u.includes("generateContent");return ce(l)&&d}).map(r=>{let u=r.supportedGenerationMethods||[],l=r.name.replace(/^models\//,""),d=r.displayName||l;return{id:l,name:d.includes(l)?d:`${d} (${l})`,description:r.description||"",stable:!/-preview|-experimental|-latest/i.test(l),supportsVision:!/embedding|tts|transcribe|live|image|sound|voice/i.test(l),supportsStructuredOutput:u.includes("generateContent"),supportedGenerationMethods:u,discoveredAt:Date.now()}});if(s.length>0){s.sort((r,u)=>{let l=d=>d==="gemini-3.8-flash"?200:d==="gemini-3.5-flash"?180:d==="gemini-3.5-flash-lite"?170:d==="gemini-3.1-pro"?160:d==="gemini-2.5-flash"?130:d==="gemini-2.5-pro"?120:d.includes("flash")?80:d.includes("pro")?50:10;return l(u.id)-l(r.id)}),wo=s;try{typeof localStorage<"u"&&localStorage.setItem("easyquiz_cached_models",JSON.stringify(s))}catch{}return s}}}catch(i){if(i.message?.includes("Chave de API"))throw i}return Fe}async function ht(o){let e=o.trim().replace(/^["']|["']$/g,"");if(!e)return{ok:!1,message:"Insira sua chave de API."};try{let a=await pt(e);if(a.length>0&&a!==Fe){let i=a[0];return{ok:!0,message:`Chave v\xE1lida! ${a.length} modelos Gemini dispon\xEDveis em sua conta. Recomendado: ${i.name}`,models:a}}}catch(a){return{ok:!1,message:a instanceof Error?a.message:String(a)}}let t=["gemini-3.8-flash","gemini-3.5-flash","gemini-2.5-flash"];for(let a of t)for(let i of["v1beta","v1"]){let n=`https://generativelanguage.googleapis.com/${i}/models/${a}:generateContent?key=${encodeURIComponent(e)}`;try{if((await fetch(n,{method:"POST",headers:{"Content-Type":"application/json","x-goog-api-key":e},body:JSON.stringify({contents:[{role:"user",parts:[{text:"PING"}]}],generationConfig:{maxOutputTokens:5}})})).ok)return{ok:!0,message:`Chave validada com sucesso no ${a} (${i})!`,models:Fe}}catch{}}return{ok:!1,message:"Chave de API inv\xE1lida, sem cota ou sem permiss\xE3o para modelos Gemini."}}async function Ft(o,e){let t=e.map(l=>l.trim().replace(/^["']|["']$/g,"")).filter(l=>l.length>5);if(t.length===0)return{ok:!1,model:o,key:"",message:"Nenhuma chave dispon\xEDvel."};let a=Qt(Ao(o)),i=JSON.stringify({contents:[{role:"user",parts:[{text:"PING"}]}],generationConfig:{maxOutputTokens:5}}),n={"Content-Type":"application/json"};async function s(l,d,m){let c=new AbortController,h=setTimeout(()=>c.abort(),m);try{let p=`https://generativelanguage.googleapis.com/v1beta/models/${d}:generateContent?key=${encodeURIComponent(l)}`,g=await fetch(p,{method:"POST",headers:{...n,"x-goog-api-key":l},body:i,signal:c.signal});if(clearTimeout(h),g.ok)return{ok:!0,model:d,key:l,message:`Modelo '${d}' validado com sucesso!`};let f=await g.text().catch(()=>"");throw new Error(`HTTP ${g.status}: ${f.slice(0,80)}`)}catch(p){throw clearTimeout(h),p}}if(t.length>=2){let l=t.slice(0,6);try{return await Promise.any(l.map(m=>s(m,a,8e3)))}catch{}}let r=t[0],u=[a,...yo.filter(l=>l!==a)];for(let l of u)try{let d=await s(r,l,4e3);return l!==a&&(d.message=`Modelo preferido indispon\xEDvel. Validado via fallback '${l}'.`),d}catch{}return{ok:!1,model:a,key:r,message:"Nenhum modelo Gemini respondeu. Verifique sua chave e cota."}}async function ha(o,e,t,a,i){let n=["v1beta","v1"],s=new Error(`Falha ao consultar modelo ${o}`),u={...da(o,i)};for(let l of n){if(a.aborted)throw new Error("Opera\xE7\xE3o cancelada pelo usu\xE1rio.");let d=`https://generativelanguage.googleapis.com/${l}/models/${o}:generateContent?key=${encodeURIComponent(e)}`,m=Date.now();try{let c=await fetch(d,{method:"POST",headers:{"Content-Type":"application/json","x-goog-api-key":e},body:JSON.stringify({...t,generationConfig:u}),signal:a});if(!c.ok){let g=await c.text();if(c.status===400){let b=/thinking/i.test(g),v=/response_schema|responseSchema|Repeated map key|PROTO payload/i.test(g);if((b||v)&&(u.thinkingConfig||u.responseSchema)){let y={...u};b&&delete y.thinkingConfig,v&&(delete y.responseSchema,delete y.responseMimeType),u=y;let x=await fetch(d,{method:"POST",headers:{"Content-Type":"application/json","x-goog-api-key":e},body:JSON.stringify({...t,generationConfig:u}),signal:a});if(x.ok){let S=await x.json(),T=S.candidates?.[0];if(T?.content?.parts?.[0]?.text)return X.markSuccess(e,Date.now()-m),{rawText:T.content.parts[0].text,data:S,usedModel:o,usedKey:e}}let w=await x?.text?.().catch(()=>"")??g,q=jt(w,c.status);throw new Error(`[${o}|${pe.maskKey(e)}] ${q}`)}}let f=jt(g,c.status);if(c.status===404&&l==="v1beta")continue;throw c.status===429?(X.markQuotaHit(e,8e3),Eo(e,o,1e4),new Error(`[${o}|${pe.maskKey(e)}] ${f}`)):(c.status===503||/no capacity|overloaded|unavailable/i.test(g)?(X.markOverloaded(e,5e3),Bt.add(o)):c.status===403||/API_KEY_INVALID/i.test(g)?X.markInvalid(e,f):c.status===404&&Bt.add(o),new Error(`[${o}|${pe.maskKey(e)}] ${f}`))}let h=await c.json(),p=h.candidates?.[0];if(!p||!p.content?.parts?.[0]?.text)throw new Error(`[${o}|${pe.maskKey(e)}] A IA n\xE3o retornou uma resposta estruturada v\xE1lida.`);return X.markSuccess(e,Date.now()-m),{rawText:p.content.parts[0].text,data:h,usedModel:o,usedKey:e}}catch(c){if(a.aborted)throw c;s=c;let h=s.message||"";if(h.includes("404")||/no longer available/i.test(h)){Bt.add(o);break}if(h.includes("429")||h.includes("Quota"))break}}throw s}var ut=new Map;function xo(o,e){let t=`${o}::${e}`,a=ut.get(t);return a===void 0?!1:Date.now()>a?(ut.delete(t),!1):!0}function Eo(o,e,t=1e4){ut.set(`${o}::${e}`,Date.now()+t)}function Ut(){ut.clear()}async function mt(o,e,t,a,i,n){if(i?.aborted)throw new Error("Opera\xE7\xE3o cancelada pelo usu\xE1rio.");let s=Array.isArray(t.apiKeys)&&t.apiKeys.length>0?t.apiKeys:t.apiKey?[t.apiKey]:[];X.init(s);let r=t.apiKey.trim().replace(/^["']|["']$/g,""),u=X.getBestKey()||r;if(!u)throw new Error("Nenhuma chave de API do Gemini configurada ou dispon\xEDvel.");let l=Ao(t.model);if(!wo&&u&&pt(u).catch(()=>{}),i?.aborted)throw new Error("Opera\xE7\xE3o cancelada pelo usu\xE1rio.");let d=Date.now(),m=Ze(o,e,t),c=[{text:m}];for(let z=0;z<e.length;z++){let N=e[z],k=N.associatedLabel||(N.alt?`Imagem: ${N.alt}`:`Imagem ${z+1}`);if(N.captureStatus==="text_only"||!N.base64){let E=N.textContext||N.alt||"";c.push({text:`[CONTEXTO_IMAGEM_${z+1} - V\xCDNCULO: ${k}]: ${E}`})}else c.push({text:`[ANEXO VISUAL ${z+1} - V\xCDNCULO: ${k}]:`}),c.push({inline_data:{mime_type:N.mediaType,data:N.base64}})}let h={system_instruction:{parts:[{text:n?.systemPromptOverride??bo}]},contents:[{role:"user",parts:c}]},p=Qt(l),g=yo.filter(z=>z!==p),b=X.getAllKeys().length,v=z=>b<=1||z===0?1:2,y=new Set,x=(z,N)=>{let k=/pro/i.test(z),E=/lite/i.test(z);return k?N===0?18e3:N===1?24e3:3e4:E?N===0?1e4:N===1?14e3:18e3:N===0?16e3:N===1?2e4:25e3},w=async(z,N)=>{if(N.length===0||i?.aborted)return null;let k=N.map(()=>new AbortController),E=()=>k.forEach(R=>{try{R.abort()}catch{}});i?.addEventListener("abort",E,{once:!0});let L=N.map(R=>`${R.model.replace("gemini-","")}/${R.label}`).join(" | ");a?.(`\u26A1 ${z}: ${N.length} slot(s) [${L}]...`,"info");try{let R=N.map(async(V,Y)=>{let W=k[Y],Z=setTimeout(()=>{try{W.abort(new Error(`Timeout ${V.timeout/1e3}s (${V.model}|${V.label})`))}catch{W.abort()}},V.timeout);try{let G=await ha(V.model,V.key,h,W.signal,n?.generationSchemaOverride);clearTimeout(Z);let oe=vo(pa(G.rawText));return oe.usedModel=G.usedModel,oe.durationMs=Date.now()-d,oe.promptSent=m,oe.tokensUsed=G.data.usageMetadata?.totalTokenCount,oe.promptTokens=G.data.usageMetadata?.promptTokenCount,oe.candidatesTokens=G.data.usageMetadata?.candidatesTokenCount,oe.rawResponse=G.rawText,k.forEach((fe,be)=>{if(be!==Y)try{fe.abort(new Error("Cancelado: vencedor respondeu."))}catch{fe.abort()}}),{plan:oe,rawUsage:G.data.usageMetadata,usedModel:G.usedModel,usedKey:G.usedKey,slotLabel:V.label}}catch(G){clearTimeout(Z);let oe=G instanceof Error?G.message:String(G);throw(oe.includes("429")||oe.includes("Quota")||oe.includes("RESOURCE_EXHAUSTED"))&&(Eo(V.key,V.model,1e4),X.markQuotaHit(V.key,8e3)),G}}),Q=await Promise.any(R);return i?.removeEventListener("abort",E),X.markWinner(Q.usedKey),Q}catch(R){return i?.removeEventListener("abort",E),R instanceof AggregateError&&R.errors.length>0?A=R.errors.map(Q=>Q instanceof Error?Q.message:String(Q)).join(" | "):R instanceof Error&&(A=R.message),console.warn(`[EasyQuiz ${z}] Falha na onda:`,A),null}},S=(b<=1?1:1+Math.ceil((b-1)/2))+4,T=0,A="",P=0;for(;T<S;){if(i?.aborted)throw new Error("Opera\xE7\xE3o cancelada pelo usu\xE1rio.");let z=X.getRoundRobinKeys(b),N=z.filter(W=>!y.has(`${W.key}::${p}`)&&!xo(W.key,p)),k,E;if(N.length>0)k=p,E=N;else{let W=g;k=W[P%W.length]||p,P++;let Z=z.filter(G=>!y.has(`${G.key}::${k}`)&&!xo(G.key,k));E=Z.length>0?Z:z.filter(G=>!y.has(`${G.key}::${k}`))}if(E.length===0){if(P<g.length)continue;break}let L=E.slice(0,v(T));if(L.length===0)break;let R=x(k,T),Q=L.map(W=>(y.add(`${W.key}::${k}`),{model:k,key:W.key,label:W.label||"Chave",timeout:R})),V=T===0?"Onda 1":`Onda ${T+1}`,Y=await w(V,Q);if(Y){let W=Y.plan.durationMs||Date.now()-d,Z=pe.maskKey(Y.usedKey);return a?.(`\u2705 ${W}ms via '${Y.usedModel}' (${Y.slotLabel}: ${Z})`,"info"),Y}T++}throw new Error(A||"Todas as tentativas falharam. Verifique suas chaves de API e cotas.")}var ma=[/\bfetch\b/i,/\bXMLHttpRequest\b/i,/\bWebSocket\b/i,/\b(?:localStorage|sessionStorage|indexedDB)\b/i,/\b(?:eval|Function|AsyncFunction|GeneratorFunction)\b/i,/\bimport(?:Scripts)?\b/i,/\bnavigator\s*\.\s*credentials\b/i,/\b(?:cookie|location\s*=|history\s*\.)/i,/\bwindow\s*\[\s*['"](?:fetch|eval|Function|localStorage|sessionStorage)/i];function Ne(o){let e=o?.engine||"smart",t=new Set(["dom","framework","keyboard","drag"]);return o?.autoAdvance&&t.add("navigation"),e==="javascript"&&t.add("javascript"),{engine:e,capabilities:t,maxAttemptsPerAction:e==="command"?1:2,maxActionMs:e==="command"?1500:3e3,allowJavaScript:e==="javascript",allowNavigation:!!o?.autoAdvance}}function Xt(o,e){if(o.t==="js"&&!e.allowJavaScript)throw new Error("A\xE7\xE3o JavaScript bloqueada pela engine atual. Use o motor JavaScript explicitamente.");if(o.t==="adv"&&!e.allowNavigation)throw new Error("Avan\xE7o autom\xE1tico bloqueado pela pol\xEDtica atual.")}function qo(o){if(!o.trim())throw new Error("JavaScript recusado: c\xF3digo vazio.");if(o.length>8e3)throw new Error("JavaScript recusado: c\xF3digo acima do limite operacional.");if(ma.find(t=>t.test(o)))throw new Error("JavaScript recusado: acesso externo, persist\xEAncia ou avalia\xE7\xE3o din\xE2mica n\xE3o permitidos.");if(!/^\s*(?:\/\/[^\n]*\n|\/\*[\s\S]*?\*\/|[\s\S])*\$eq\./.test(o)&&!o.includes("$eq."))throw new Error("JavaScript recusado: use somente a API declarativa $eq.")}var Co="__eq_layout_cache__";var gt=null;function ko(){if(gt)return gt;try{let o=sessionStorage.getItem(Co);if(!o)return null;let e=JSON.parse(o);return e.hostname!==location.hostname||Date.now()-e.createdAt>18e5?null:(gt=e,e)}catch{return null}}function ga(o){gt=o;try{sessionStorage.setItem(Co,JSON.stringify(o))}catch{}}function To(){let o=ko();if(o)return o;let e=[],t=null,a=["nav","aside","header","footer",'[role="navigation"]','[role="banner"]','[role="complementary"]','[class*="sidebar" i]','[class*="lesson-list" i]','[class*="task-list" i]','[class*="mission" i]','[class*="progress-list" i]','[class*="_ka-drawer_" i]','[class*="breadcrumb" i]','[class*="game-sidebar" i]','[class*="leaderboard" i]','[class*="side-panel" i]'];for(let s of a)try{let r=document.querySelector(s);if(!r)continue;let u=r.getBoundingClientRect();if(u.width<10||u.height<10)continue;e.push(s)}catch{}let i=['[role="main"]',"main",".perseus-renderer",".framework-perseus",'[data-test-id="exercise-content"]',".main-content","#main-content",'[class*="exercise-content" i]','[class*="question-area" i]'];for(let s of i)try{let r=document.querySelector(s);if(!r)continue;let u=r.getBoundingClientRect();if(u.width>window.innerWidth*.3&&u.height>100){t=s;break}}catch{}let n={knownSidebarSelectors:e,mainContentSelector:t,createdAt:Date.now(),hostname:location.hostname};return ga(n),console.log(`[EasyQuiz LayoutCache] Snapshot criado: ${e.length} sidebars, main: ${t||"N/A"}`),n}function fa(){return ko()?.knownSidebarSelectors??[]}function So(o){let e=fa();if(e.length===0)return!1;try{for(let t of e)if(o.closest(t))return!0}catch{}return!1}var Ue=['input:not([type="hidden"])',"textarea","select","button","a","label",'[role="button"]','[role="link"]','[role="radio"]','[role="checkbox"]','[role="option"]','[role="treeitem"]','[role="menuitemcheckbox"]','[role="menuitemradio"]','[contenteditable="true"]','[draggable="true"]',"[aria-grabbed]","[aria-dropeffect]","[data-widget-type]",".perseus-drag-item",".sortable-item",'[data-testid*="drag" i]','[data-testid*="card" i]','[data-testid*="option" i]','[data-testid*="choice" i]','[data-testid*="category" i]',"[data-choice]","[data-option]","[data-answer]","[data-value]",".quiz-option",".option-card",".choice-card",'[class*="option-card" i]','[class*="choice-card" i]','[class*="option-item" i]','[class*="choice-item" i]','[class*="answer-item" i]','[class*="alternative" i]','li[class*="choice" i]','li[class*="option" i]','li[class*="answer" i]','[data-role="dropzone"]',"[data-category]","[data-item-id]","[data-params][jsmodel]",'[class*="draggable-item" i]','[class*="drag-item" i]','[class*="sortable-card" i]','[class*="card-option" i]','[class*="tile" i][class*="option" i]','[data-testid="perseus-expression-input"]','[data-testid="perseus-math-input"]','[data-testid*="perseus-input" i]',".mq-editable-field",".mq-root-block",".choice-radio-btn",'[class*="choice_" i]','[class*="perseus-radio" i]','[class*="perseus-checkbox" i]','[class*="expression-editor" i]','[class*="math-input" i]','[class*="perseus-dropdown" i]','[class*="perseus"] [role="listbox"]','[class*="perseus"] [role="radio"]','[class*="perseus"] [role="combobox"]','.perseus-widget-container [role="button"]',".perseus-widget-container input",".perseus-widget-container select",'.number-line [role="slider"]','[class*="interactive-graph" i]',".interactive-component"].join(","),tt=/(verificar|checar|check|conferir|validar|próxim[oa]|next|continuar|continue|avançar|prosseguir|enviar|submit|concluir|finalizar|terminar|começar|iniciar|start|vamos lá|próxima tarefa|next task|próxima pergunta|next question|marcar como concluíd[oa]|mostrar resumo|entendi|compreendi|ok|leitura concluída|seguir|ir para o exercício|fazer o teste|próximo artigo|ir para a aula)/i,qe=/(\banterior\b|\bvoltar\b|\bback\b|\bprev\b|\bprevious\b|recomeçar|\brestart\b|\breplay\b|\bretornar\b)/i,ba=0;function Vt(o){try{let e=o.closest('[hidden], [style*="display: none"], [style*="display:none"], [aria-hidden="true"]');if(e&&!ue(e))return!1}catch{}try{let e=window.getComputedStyle?window.getComputedStyle(o):o.style;if(e&&(e.display==="none"||e.visibility==="hidden"))return!1}catch{}try{if(typeof o.getBoundingClientRect=="function"){let e=o.getBoundingClientRect();if(e.width>0||e.height>0)return!0}}catch{}return(o.textContent||"").trim().length>0}function te(o){try{if(typeof CSS<"u"&&typeof CSS.escape=="function")return CSS.escape(o)}catch{}return String(o).replace(/["\\]/g,"\\$&")}function j(o){let e=o;if(!e||typeof e.isConnected=="boolean"&&!e.isConnected||ue(e))return!1;let t=e.tagName?.toLowerCase();if(["input","select","textarea","button"].includes(t)){let a=e.type?.toLowerCase();if(a==="checkbox"||a==="radio"){if(e.id)try{let n=e.ownerDocument?.querySelector(`label[for="${te(e.id)}"]`);if(n&&Vt(n))return!0}catch{}let i=e.closest('label, .option-card, .quiz-option, .choice, .answer, [role="radio"], [role="checkbox"], [class*="option" i], [class*="choice" i], [class*="item" i], li, tr');if(i&&i!==e&&Vt(i))return!0}try{if(!e.closest('[hidden], [style*="display: none"], [style*="display:none"], [aria-hidden="true"]')){let n=window.getComputedStyle?window.getComputedStyle(e):e.style;if(!n||n.display!=="none"&&n.visibility!=="hidden"){if(typeof e.getBoundingClientRect=="function"){let s=e.getBoundingClientRect();if(s.width>0||s.height>0)return!0}return!0}}}catch{}}return Vt(e)}function va(o){if(o==null)return"";if(typeof o=="string")return o;if(typeof o=="number"||typeof o=="boolean")return String(o);if(o instanceof Node)return o.textContent||"";try{if(typeof o?.toString=="function"){let e=o.toString();if(typeof e=="string")return e}}catch{}return""}function $(o,e=500){return va(o).replace(/\s+/g," ").trim().slice(0,e)}function xa(o){let e=o.dataset.easyquizId;if(e)return e;let t=`eq-${Date.now().toString(36)}-${(ba+=1).toString(36)}`;return o.dataset.easyquizId=t,t}function ue(o){return o?!!(o.closest('#easyquiz-shadow-root, .eq-sidebar, .eq-launcher, [data-easyquiz-ignore="true"], .btn-inject-eq, #btn-inject-script')||o.getAttribute?.("data-easyquiz-ignore")==="true"):!1}function Ce(o){if(!o)return!1;if(So(o))return!0;let e=o.closest('aside, nav, [class*="task-list" i], [class*="lesson-list" i], [class*="mastery" i], [class*="sidebar" i], [class*="side-bar" i], [class*="side_bar" i], [class*="unit-nav" i], [class*="course-nav" i], [data-testid*="sidebar" i], [data-testid*="task-list" i], [class*="practice-tab" i], [class*="progress-nav" i], [role="navigation"], [role="complementary"]');if(e&&!e.querySelector('.perseus-renderer, .framework-perseus, [data-test-id*="exercise" i]'))return!0;if(Xe())try{let t=o.getBoundingClientRect();if(!!document.querySelector(".perseus-renderer, .framework-perseus")&&t.width>0&&t.left>=0&&t.right<window.innerWidth*.32)return!0}catch{}return!1}function Xe(){try{if(/khanacademy\.org/i.test(window.location.href)||document.querySelector(".perseus-renderer, .framework-perseus"))return!0}catch{}return!1}var et=/(leaderboard|scoreboard|placar|ranking|trophy|pause|pausar|mute|mutar|audio|sound|som|música|music|configuraç|settings|theme|ajuda|help|report|denunciar|feedback|power-?up|streak|coins|fullscreen|full-screen|read-?aloud|audio-?player|(?:audio|sound|som|media)[-_ ]*volume|volume[-_ ]*(?:slider|control|level|btn|button|icon|mute)|vol-slider)/i;function _(o){if(!o||typeof o.getAttribute!="function"||typeof Element<"u"&&!(o instanceof Element))return!1;if(ue(o))return!0;let e=o.tagName?.toLowerCase();if(["select","textarea"].includes(e)||e==="input"&&!["button","submit","reset"].includes((o.type||"").toLowerCase()))return!1;let a=o.closest?.('button, a, [role="button"], [class*="leaderboard" i], [data-testid*="leaderboard" i], [class*="scoreboard" i], [class*="trophy" i]')||o,i=String(a.getAttribute?.("data-testid")||a.getAttribute?.("data-test-id")||a.getAttribute?.("id")||""),n=String(a.getAttribute?.("aria-label")||""),s=String(a.getAttribute?.("title")||""),r=typeof a.className=="string"?a.className:typeof a.className?.baseVal=="string"?a.className.baseVal:"",u=$(a.textContent,60);return!!(et.test(i)||et.test(n)||et.test(s)||et.test(r)||u.length>0&&u.length<=25&&et.test(u))}function re(o){if(!o||typeof o.getAttribute!="function"||typeof Element<"u"&&!(o instanceof Element)||ue(o)||_(o)||o.closest?.('.option-card, .choice-card, .quiz-option, [class*="option-card" i], [class*="choice-card" i], [class*="option-item" i], [class*="choice-item" i], [class*="answer-item" i], [data-testid*="option" i], [data-testid*="choice" i], [data-choice], [data-option], [data-answer], [role="radio"], [role="checkbox"], [role="option"]')||o.closest?.("header, nav, aside"))return!1;let e=typeof HTMLInputElement<"u"&&o instanceof HTMLInputElement||typeof HTMLButtonElement<"u"&&o instanceof HTMLButtonElement?o.value:"",t=$(o.getAttribute?.("aria-label")||o.textContent||o.getAttribute?.("value")||e),a=o.type,i=t.replace(/[\d\(\)\[\]\u2192>\u2022\-\/\\]+/g," ").trim(),n=String(o.getAttribute?.("data-testid")||o.getAttribute?.("data-test-id")||o.getAttribute?.("id")||o.getAttribute?.("href")||"").toLowerCase();return qe.test(i)||qe.test(t)?!1:tt.test(i)||tt.test(t)||n.includes("next")||n.includes("check")||n.includes("continue")||n.includes("proximo")||n.includes("forward")?!0:/^\d{1,3}$/.test(t.trim())?!!o.closest?.('[class*="pagination" i], [class*="pager" i], [class*="page-nav" i], [class*="step-indicator" i], [class*="breadcrumb" i], [aria-label*="p\xE1gina" i], [aria-label*="page" i], [role="navigation"], nav, [class*="steps" i]'):!1}function Kt(o){let e=[];try{let t=o.querySelectorAll('annotation[encoding*="tex"], [data-tex], [data-latex], math');for(let i of Array.from(t).slice(0,3)){let s=(i.getAttribute("data-tex")||i.getAttribute("data-latex")||i.textContent||"").trim().replace(/\s+/g," ");s&&s.length>1&&s.length<200&&e.push(`[Math: ${s}]`)}let a=o.querySelectorAll("img, svg");for(let i of Array.from(a).slice(0,2)){let n=(i.getAttribute("alt")||i.getAttribute("aria-label")||"").trim();if(n)e.push(`[Img: ${n}]`);else if(i.tagName.toLowerCase()==="svg"){let s=i.querySelector("title")?.textContent?.trim();s&&e.push(`[SVG: ${s}]`)}}}catch{}return e.length>0?" "+e.join(" "):""}function Gt(o){let e=o.closest("tr");if(e){let l=e.querySelector("th, td:first-child"),d=l&&l!==o.closest("td")?$(l.textContent,100):"",m=$(o.closest("label, td")?.textContent||"",50);if(d&&m)return`${d}: ${m}`}let t=o.closest('.dropdown-row, [class*="dropdown-row" i], [class*="select-row" i]');if(t){let l=t.querySelector('.dropdown-label, [class*="label" i]'),d=l&&l!==o?$(l.textContent,150):"";if(d)return d}let a=o.getAttribute("aria-label");if(a)return $(a);let i=o.getAttribute("aria-labelledby");if(i){let l=i.split(/\s+/).map(d=>document.getElementById(d)?.textContent).filter(Boolean).join(" ");if(l.trim())return $(l)}if("labels"in o&&o.labels){let l=Array.from(o.labels??[]).map(d=>d.textContent).join(" ");if(l.trim()){let d=Kt(o.parentElement||o);return $(l+d)}}let n=o.closest('.docssharedWizToggleLabeledContainer, [role="listitem"], .answer, label, .quiz-option, .form-check, .option-card, .choice-radio-btn, [data-testid*="choice"]');if(n&&n!==o){let l=$(n.textContent);if(l){let d=Kt(n);return $(l+d)}}let s=o instanceof HTMLInputElement||o instanceof HTMLButtonElement?o.value:"",r=o.getAttribute("placeholder")||o.getAttribute("title")||o.textContent||s||"",u=Kt(o);return $(r+u)}function Jt(o,e){let a=typeof HTMLSelectElement<"u"&&o instanceof HTMLSelectElement||o.tagName.toLowerCase()==="select"?o:null,i=o;o.dataset.easyquizRole=e;let n=o.tagName.toLowerCase(),s=["input","textarea","select","button"].includes(n)?n:"other",r=o.getAttribute("role")||"",u=(o.getAttribute("data-testid")||o.getAttribute("data-test-id")||"").toLowerCase(),l=(o.className&&typeof o.className=="string"?o.className:"").toLowerCase(),d=o.getAttribute("draggable")==="true"||o.classList.contains("perseus-drag-item")||o.classList.contains("sortable-item")||l.includes("cursor-grab")||!!o.getAttribute("aria-grabbed")||/drag|card|option|item/i.test(u)||/drag|card-item|sortable/i.test(l),m=o.getAttribute("data-role")==="dropzone"||o.classList.contains("category-container")||o.hasAttribute("data-category")||!!o.getAttribute("aria-dropeffect")||/drop|category|bucket/i.test(u)||/dropzone|category-box|bucket|target-zone/i.test(l),h=$((d?"draggable":m?"dropzone":"")||i.type||r||s,40),p="";if(i.type==="checkbox"||i.type==="radio"||r==="radio"||r==="checkbox"){let x=i.checked||o.getAttribute("aria-checked")==="true",w=i.value&&i.value!=="on"?i.value:o.getAttribute("data-value")||"";p=x?w?`checked:${w}`:"checked":w||"unchecked"}else if(s==="button"||n==="a"||e==="navigation"||re(o))p="";else{let x=typeof o.value=="string"||typeof o.value=="number"?o.value:"";p=$(x||o.getAttribute("data-category")||"",2e3)}let g=[];if(a&&a.options)for(let x of Array.from(a.options).slice(0,80))g.push({value:$(x.value),label:$(x.textContent)});else if(r==="combobox"||r==="listbox"||l.includes("select")||l.includes("dropdown")){let x=o.getAttribute("aria-controls")||o.getAttribute("aria-owns"),w=x?document.getElementById(x):o;if(w){let q=w.querySelectorAll('[role="option"], li, .dropdown-item, .option');for(let S of Array.from(q).slice(0,80)){let T=$(S.textContent);T&&g.push({value:S.getAttribute("data-value")||S.getAttribute("value")||T,label:T})}}}let f=!!(i.required||o.getAttribute("aria-required")==="true"),b=!!(i.disabled||o.getAttribute("aria-disabled")==="true"),v=xa(o);return{id:o.id||v,tag:s,type:h,label:Gt(o),name:$(i.name||o.getAttribute("name")||"",180),value:p,options:g,required:f,disabled:b,role:e}}var Lo=['[data-testid="exercise-question-number"]','[data-testid="perseus-expression-input"]','[data-testid="perseus-math-input"]','[data-testid="exercise-header"]','[class*="ExerciseWrapper"]','[class*="exercise-wrapper" i]','[class*="task-challenge" i]','[class*="task-body" i]',".perseus-renderer",".framework-perseus",'[data-test-id*="exercise" i]','[data-testid*="exercise" i]',".Qr7Oae","[data-item-id]",".freebirdFormviewerViewItemsItemItem",".que",".question-holder",".quiz-question",".question_holder",".display_question",'[data-functional-selector*="question"]',".question-container",'[class*="classification-layout" i]','[class*="quiz-container" i]','[data-cy="quiz-container"]',"[data-question-id]",'[data-testid*="question" i]','[class*="question-container" i]','[class*="question" i]','[class*="pergunta" i]','[class*="categoriz" i]','[role="group"]',"article","form","section","main"].join(",");function ft(o){if(!j(o)||Ce(o))return-1/0;let e=o.getBoundingClientRect(),t=Array.from(o.querySelectorAll(Ue)).filter(f=>j(f)&&!Ce(f)),a=$(o.innerText||o.textContent||"",4e3).length;if(a<10||!t.length&&a<60)return-1/0;let i=Math.max(1,window.innerWidth*window.innerHeight),n=Math.max(1,e.width*e.height),s=Math.min(1,n/i);if(s>.8)return-1/0;let r=e.top+e.height/2,u=e.left+e.width/2,l=Math.abs(r-window.innerHeight/2)/Math.max(1,window.innerHeight),d=Math.abs(u-window.innerWidth/2)/Math.max(1,window.innerWidth),m=a>40?35:0,c=e.top>=0&&e.bottom<=window.innerHeight?25:0,h=o.matches?.('.perseus-renderer, .framework-perseus, [class*="ExerciseWrapper"], [class*="exercise-wrapper" i], [class*="task-challenge" i], [class*="task-body" i], [data-test-id*="exercise" i]')?50:0,p=d>.35?150:0,g=s>.85?100:0;return Math.min(10,t.length)*15+Math.min(60,a/20)+m+c+h-s*30-l*20-p-g}function Ve(o){let e=o,t=e.closest('.perseus-renderer, .framework-perseus, [class*="ExerciseWrapper"], [class*="exercise-wrapper" i], [class*="task-challenge" i], [class*="task-body" i], [data-testid="exercise-header"]');if(t&&t!==document.body)return t;if(e.matches?.('article, [data-test-id*="exercise" i], [data-testid*="exercise" i], .perseus-renderer, .framework-perseus, [class*="question-container" i], .que')&&e.tagName.toLowerCase()!=="main"&&e.tagName.toLowerCase()!=="body")return e;for(;e.parentElement&&e.parentElement!==document.body&&e.parentElement!==document.documentElement;){let a=e.parentElement,i=a.tagName.toLowerCase();if(["header","footer","nav","aside"].includes(i))break;if(a.matches?.('article, [data-test-id*="exercise" i], [data-testid*="exercise" i], .perseus-renderer, .framework-perseus, [class*="question-container" i], .que')&&i!=="main"&&i!=="body"){e=a;break}let n=$(e.innerText||e.textContent||"",1e4),s=$(a.innerText||a.textContent||"",1e4),r=e.querySelectorAll(Ue).length,u=a.querySelectorAll(Ue).length;if(n.length<150&&s.length>n.length&&u<=r+4&&i!=="main"&&i!=="body"){e=a;continue}break}return e}function ya(o,e=16e3){let t=o.cloneNode(!0);t.querySelectorAll('nav, aside, [class*="sidebar" i], [class*="lesson" i], [class*="_ka-drawer_" i], [class*="navigation" i], [role="navigation"]').forEach(m=>m.remove());let a=Array.from(t.querySelectorAll(".katex"));for(let m of a){let c=m.querySelector('annotation[encoding="application/x-tex"]');if(c&&c.textContent){let h=` $${c.textContent.trim()}$ `,p=document.createTextNode(h);m.replaceWith(p)}}let i=Array.from(t.querySelectorAll("math"));for(let m of i)try{let c=Aa(m);if(c){let h=document.createTextNode(` ${c} `);m.replaceWith(h)}}catch{}let n=Array.from(t.querySelectorAll(".mq-root-block, .mq-editable-field"));for(let m of n){let c=m.textContent?.trim();c&&(m.textContent=` [math: ${c}] `)}let s=Array.from(t.querySelectorAll("sup"));for(let m of s)m.textContent=`^{${m.textContent?.trim()||""}}`;let r=Array.from(t.querySelectorAll("sub"));for(let m of r)m.textContent=`_{${m.textContent?.trim()||""}}`;let u="";t.querySelectorAll(".sr-only, .visuallyhidden, .visually-hidden, [aria-label], [aria-describedby]").forEach(m=>{let c=m.getAttribute("aria-label")||m.getAttribute("aria-describedby")||"",h=m.textContent?.trim()||"";m.closest("button, input, a")||(c&&!u.includes(c)&&(u+=`
[Dado do Gr\xE1fico/Imagem: ${c}]`),h&&!c&&h.length>5&&!u.includes(h)&&(u+=`
[Tabela Oculta do Gr\xE1fico: ${h}]`))});let d=(t.innerText&&t.innerText.trim().length>0?t.innerText:t.textContent||"")+(u?`

--- DADOS OCULTOS DA QUEST\xC3O ---
${u}`:"");return $(d,e)}function Aa(o){let e=[];function t(a){let i=a.tagName?.toLowerCase();if(i==="mfrac"){let n=Array.from(a.children),s=n[0]?.textContent?.trim()||"?",r=n[1]?.textContent?.trim()||"?";e.push(`(${s}/${r})`);return}if(i==="msqrt"){e.push(`sqrt(${a.textContent?.trim()||"?"})`);return}if(i==="msup"){let n=Array.from(a.children),s=n[0]?.textContent?.trim()||"?",r=n[1]?.textContent?.trim()||"?";e.push(`${s}^{${r}}`);return}if(i==="msub"){let n=Array.from(a.children),s=n[0]?.textContent?.trim()||"?",r=n[1]?.textContent?.trim()||"?";e.push(`${s}_{${r}}`);return}if(i==="mn"||i==="mi"||i==="mo"||i==="mtext"){e.push(a.textContent?.trim()||"");return}for(let n of Array.from(a.children))t(n)}return t(o),e.join(" ")}function Mo(o){let e=o,t=e.closest('main, [role="main"], article, form, [data-test-id*="exercise" i], [data-testid*="exercise" i], .framework-perseus, section');if(t&&t!==document.body&&j(t))return t;let a=0;for(;e.parentElement&&e.parentElement!==document.body&&a<3;)e=e.parentElement,a++;return e||document.body}var vt=new Map,wa=3e4,Io=8;function Ea(){let o=window.location.href,e=vt.get(o);return e?Date.now()-e.timestamp>wa?(vt.delete(o),null):e.selector:null}function ot(o){try{if(ft(o)<Io)return;let e=o.tagName.toLowerCase(),t=o.id?`#${o.id}`:"",a=o.dataset.easyquizId?`[data-easyquiz-id="${o.dataset.easyquizId}"]`:"",i=Array.from(o.classList).slice(0,3).map(s=>`.${s}`).join(""),n=`${e}${t}${a}${i}`;n&&n!=="body"&&n!=="html"&&vt.set(window.location.href,{selector:n,timestamp:Date.now()})}catch{}}function le(){let o=Ea();if(o){try{let r=document.querySelector(o);if(r&&j(r)&&!Ce(r)&&ft(r)>=Io)return Ve(r)}catch{}vt.delete(window.location.href)}let e=document.querySelector('[class*="classification-layout" i], [class*="quiz-container" i][class*="classification" i]');if(e&&j(e))return ot(e),e;if(Xe()){let u=Array.from(document.querySelectorAll(".perseus-renderer, .framework-perseus")).filter(l=>{if(!j(l)||Ce(l))return!1;let d=l.getBoundingClientRect();return d.width>100&&d.height>50&&d.bottom>0&&d.top<window.innerHeight});if(u.length>0){u.sort((d,m)=>{let c=d.getBoundingClientRect(),h=m.getBoundingClientRect();return h.width*h.height-c.width*c.height});let l=Ve(u[0]);return ot(l),l}}let t=document.activeElement;if(t&&t!==document.body){let r=t.closest(Lo);if(r&&!Ce(r)&&ft(r)>0){let u=Ve(r);return ot(u),u}}let i=Array.from(document.querySelectorAll(Lo)).filter(r=>!Ce(r)).map(r=>({element:r,score:ft(r)})).filter(r=>Number.isFinite(r.score)).sort((r,u)=>u.score-r.score),n=i.find(r=>{let u=r.element.tagName.toLowerCase();return u!=="main"&&u!=="body"&&r.score>0});if(n){let r=Ve(n.element);return ot(r),r}if(i.length>0&&i[0].score>0){let r=Ve(i[0].element);return ot(r),r}let s=document.querySelector('form, main, [role="main"]');return s&&j(s)?s:document.body}function Ho(o){let e=o.cloneNode(!0);e.querySelectorAll("script, style, iframe, object, embed, svg, canvas, noscript, audio, video").forEach(a=>a.remove());let t=["type","name","value","role","aria-label","aria-labelledby","aria-checked","aria-required","required","disabled","data-easyquiz-id","draggable","class","id","data-widget-type","data-role","data-category","data-testid"];return e.querySelectorAll("*").forEach(a=>{for(let i of Array.from(a.attributes))t.includes(i.name)||a.removeAttribute(i.name)}),e.outerHTML.replace(/\s+/g," ").slice(0,2e4)}function bt(o){let e=Array.from(o.querySelectorAll(Ue)),t=new Set,a=[],i=Xe();for(let d of e){if(!j(d)||re(d)||_(d)||i&&Ce(d))continue;let m=(d.value||d.textContent||"").trim();if(qe.test(m))continue;let c=d.tagName.toLowerCase();["input","textarea","select"].includes(c)&&(t.add(d),a.push(d))}for(let d of e){if(!j(d)||re(d)||_(d)||i&&Ce(d))continue;let m=(d.value||d.textContent||"").trim();if(qe.test(m))continue;let c=d.tagName.toLowerCase();if(["input","textarea","select"].includes(c))continue;let h=d.querySelector("input, textarea, select");if(!(h&&t.has(h))){if(d.hasAttribute("for")){let p=d.getAttribute("for"),g=p?d.ownerDocument.getElementById(p):null;if(g&&t.has(g))continue}if(c==="a"){let p=d.getAttribute("role"),g=d.getAttribute("class")||"",f=d.getAttribute("data-testid")||"",b=d.getAttribute("draggable")==="true"||d.classList.contains("perseus-drag-item")||d.classList.contains("sortable-item")||g.includes("cursor-grab")||!!d.getAttribute("aria-grabbed")||/drag|card|option|item/i.test(f)||/drag|card-item|sortable/i.test(g);if(!(p==="button"||p==="radio"||p==="checkbox"||p==="option"||b||d.closest('[class*="choice" i], [class*="option" i], [class*="answer" i], [data-testid*="option" i]')))continue}a.push(d)}}let n=a.length>0&&a.every(d=>_(d)||/read-?aloud|audio/i.test(d.getAttribute("data-testid")||d.getAttribute("aria-label")||"")),s=document.body.querySelector('[class*="classification-layout" i]')||document.body.querySelector('[class*="classification" i]')||o,r=document.body.querySelector('[class*="classification" i]')!==null||o.querySelector('[class*="classification" i]')!==null||o.querySelector('[data-cy*="quiz" i]')!==null||o.querySelector('[class*="draggable-item" i]')!==null||o.querySelector('[class*="drag-item" i]')!==null||o.querySelector('[class*="sortable-card" i]')!==null||o.matches?.('[class*="classification" i]');if((a.length===0||n)&&r){n&&(a.length=0);let d=Array.from(s.querySelectorAll('[class*="cursor-grab"][id], [draggable="true"][id], .dnd-card[id]'));if(d.length>0){for(let m of d)if(!(!j(m)||_(m))&&(a.push(m),a.length>=50))break}else{let m=Array.from(s.querySelectorAll("button, div[class], span[class], p, li"));for(let c of m){if(!j(c)||re(c)||_(c)||qe.test((c.textContent||"").trim()))continue;let h=(c.textContent||"").trim();if(h.length<2||h.length>300)continue;if(Array.from(c.children).some(g=>g.className&&g.textContent?.trim())||a.push(c),a.length>=50)break}}}let u=a.some(d=>["input","select","textarea"].includes(d.tagName.toLowerCase())),l=!u&&a.length>0&&a.every(d=>{let m=d.tagName.toLowerCase();if(["input","select","textarea","button"].includes(m))return!1;let c=(d.textContent||"").trim();return!d.id||c.length<10||/^\d+\s*\/\s*\d+$/.test(c)||/^question text/i.test(c)});if(a.length===0||l){l&&(a.length=0);let d=Array.from(document.body.querySelectorAll('[class*="cursor-pointer"][id]'));if(d.length>0)for(let m of d){if(!j(m)||ue(m)||re(m)||_(m)||qe.test((m.textContent||"").trim()))continue;let c=(m.textContent||"").trim();if(!(c.length<10||c.length>500)&&!/^\d+\s*\/\s*\d+$/.test(c)&&(a.push(m),a.length>=20))break}}if(a.length===0||a.length>0&&!u&&!a.some(d=>d.getAttribute("role")==="radio"||d.getAttribute("role")==="checkbox"||d.classList.contains("mq-editable-field")||d.closest(".perseus-widget-container"))){let m=document.querySelector(".perseus-renderer, .framework-perseus")||o,c=Array.from(m.querySelectorAll('.mq-editable-field, .mq-root-block, [class*="expression-editor" i], [class*="math-input" i]'));for(let b of c)!j(b)||ue(b)||a.includes(b)||a.push(b);let h=Array.from(m.querySelectorAll('[class*="perseus-dropdown" i], .perseus-widget-container select, .perseus-widget-container [role="combobox"], .perseus-widget-container [role="listbox"]'));for(let b of h)!j(b)||ue(b)||a.includes(b)||a.push(b);let p=Array.from(m.querySelectorAll('[class*="perseus-radio" i] [role="radio"], .perseus-widget-container [role="radio"], .perseus-widget-container [role="checkbox"]'));for(let b of p)!j(b)||ue(b)||b.querySelector('input[type="radio"], input[type="checkbox"]')||a.includes(b)||a.push(b);let g=Array.from(m.querySelectorAll('.perseus-widget-container [role="button"], .number-line [role="slider"], [class*="interactive-graph" i] [role="button"]'));for(let b of g)!j(b)||ue(b)||re(b)||a.includes(b)||a.push(b);let f=Array.from(m.querySelectorAll('.perseus-widget-container input:not([type="hidden"]), .perseus-widget-container textarea, .perseus-widget-container select'));for(let b of f)!j(b)||ue(b)||t.has(b)||a.includes(b)||a.push(b)}return a.slice(0,100).map(d=>Jt(d,"answer"))}function Wt(o){let e=[o,o.parentElement,o.parentElement?.parentElement,document.body].filter(Boolean),t=new Set,a=[];for(let i of e)for(let n of Array.from(i.querySelectorAll(Ue)))if(!(t.has(n)||!j(n)||!re(n)||_(n))&&(t.add(n),a.push(Jt(n,"navigation")),a.length>=10))return a;return a}function Se(o=!1){let e=le();e=Ve(e),o&&(e=Mo(e));let t=bt(e),a=Wt(e);if(t.length===0){let r=bt(document.body);r.length>0&&(e=Mo(e),t=bt(e),t.length===0&&(t=r,e=document.querySelector('main, article, form, [role="main"]')||document.body))}a.length===0&&(a=Wt(document.body));let i=e.querySelector(".katex, math, .mq-root-block, .mq-editable-field"),n;if(i)n=ya(e,16e3);else{let r=e.innerText&&e.innerText.trim().length>0?e.innerText:e.textContent||"";n=r.length>4e4?$(r.slice(0,8e3),8e3)+`
[...conte\xFAdo extenso truncado...]
`+$(r.slice(-2e3),2e3):$(r,16e3)}let s=[...t,...a].slice(0,120);return!n||s.length===0&&n.length<30?$(document.body.innerText||document.body.textContent||"",16e3).length>=30?ke():null:{sourceUrl:window.location.href.slice(0,2e3),pageTitle:document.title.slice(0,500)||"P\xE1gina de Quest\xE3o",questionText:n,htmlSnippet:Ho(e),controls:s,scope:e}}function ke(){let o=document.body.innerText||document.body.textContent||document.documentElement.textContent||"",e=$(o,16e3),t=bt(document.body),a=Wt(document.body),i=[...t,...a].slice(0,120),n=document.querySelector('main, article, form, [role="main"], [data-test-id*="content" i], [class*="content" i]')||document.body;return{sourceUrl:window.location.href.slice(0,2e3),pageTitle:document.title.slice(0,500)||"P\xE1gina de Quest\xE3o",questionText:e,htmlSnippet:Ho(n).slice(0,15e3),controls:i,scope:n}}function $t(o){let e=o.controls.map(t=>{let a=t.options?t.options.length:0;return`${t.role}:${t.id}:${t.type}:${a}`}).join("|");return[window.location.href,o.pageTitle,o.questionText.slice(0,400),e].join("::")}function xt(o){if(!o)return!1;let e=o.toLowerCase();return["?","quest\xE3o","questao","pergunta","exerc\xEDcio","exercicio","assinale","calcule","determine","qual \xE9","qual o","quais","indique","selecione","escolha","responda","julgue","verdadeiro ou falso","complete","resolva","encontre","alternativa","correta","incorreta","m\xB3","cm\xB2","volume","probabilidade","matriz","valor de","resultado de","considere","dada a","sabendo que","quanto vale","obtenha"].some(a=>e.includes(a))}function J(o){return o?!!(o.closest('#easyquiz-shadow-root, .eq-sidebar, .eq-launcher, [data-easyquiz-ignore="true"], .btn-inject-eq, #btn-inject-script')||o.getAttribute?.("data-easyquiz-ignore")==="true"):!1}function H(o){return o==null?"":(typeof o=="string"?o:String(o)).replace(/^(\([0-9a-zA-Z]{1,2}\)|[0-9]{1,3}|[a-zA-Z])[\.\)\-\:]\s+/,"").replace(/[\.\u2026]{2,}/g," ").replace(/['"“”«»]/g,"").replace(/\s+/g," ").trim()}function ie(o){if(!o||o instanceof HTMLInputElement||o instanceof HTMLSelectElement||o instanceof HTMLTextAreaElement||o.getAttribute("draggable")==="true"||o.classList.contains("dnd-card")||o.hasAttribute("data-category")||o.hasAttribute("data-dropzone"))return o;if(o.hasAttribute("for")){let a=o.getAttribute("for");if(a){let i=o.ownerDocument.getElementById(a);if(i)return i}}let e=o.closest('label, .option-card, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, td, li, .dnd-card, [class*="option-card" i], [class*="choice-card" i], .dropdown-row, [class*="dropdown" i], [class*="select-row" i]');if(e&&!["article","section","main","form","body"].includes(e.tagName.toLowerCase())){let a=e.getAttribute("for"),n=(a?e.ownerDocument.getElementById(a):null)||e.querySelector('input:not([type="hidden"]), select, textarea');return n||e}let t=o.closest('button, a, [role="button"], [draggable="true"]');if(t)return t;if(["body","html","main","section","article","form"].includes(o.tagName.toLowerCase())){let a=o.querySelector('button, [role="button"], a, input:not([type="hidden"]), select, textarea, [role="radio"], [role="checkbox"], .option-card, label');if(a)return ie(a)}return o}function Po(o){let e=o;if(!e||!document.contains(e))try{e=le()}catch{}e=e||document.body;let t=i=>{let n=Array.from(i.querySelectorAll("tr")).filter(d=>j(d)&&d.querySelector('input[type="radio"], input[type="checkbox"]'));if(n.length>1)return n;let s=Array.from(i.querySelectorAll('input[type="checkbox"], input[type="radio"], [role="checkbox"], [role="radio"]')).filter(d=>j(d)&&!J(d));if(s.length>0)return s;let u=Array.from(i.querySelectorAll('.option-card, [role="option"], [class*="choice-card" i], [class*="option-card" i], li[class*="choice" i], li[class*="option" i]')).filter(d=>j(d)&&!J(d)).filter(d=>!d.parentElement?.closest('.option-card, [role="option"], [class*="choice-card" i], [class*="option-card" i]'));return u.length>0?u:Array.from(i.querySelectorAll('[class*="classification" i] [class], [class*="draggable-item" i], [class*="drag-item" i], [class*="sortable-card" i]')).filter(d=>{let m=d;return j(m)&&!J(m)&&(m.textContent||"").trim().length>2&&!re(m)&&!_(m)&&!m.querySelector("[class]")})},a=t(e);return a.length>0?a:e!==document.body?t(document.body):[]}function F(o,e,t=!1){if(o==null)return null;let i=(typeof o=="string"?o:String(o)).trim().replace(/^["'“”«»]+|["'“”«»]+$/g,"");if(!i)return null;let n=te(i),s=document.querySelector(`[data-easyquiz-id="${n}"]`);if(s&&!J(s))return ie(s);try{let c=document.getElementById(i);if(c&&j(c)&&!J(c))return c.hasAttribute("data-category")||c.hasAttribute("data-dropzone")||c.classList.contains("dnd-zone")?c:ie(c)}catch{}try{let c=document.querySelector(`[data-item-id="${n}"]`);if(c&&j(c)&&!J(c))return ie(c)}catch{}let r=i.match(/^(?:item|opção|opcao|afirmação|afirmacao|alternativa|linha|afirmativa|questão|questao|campo|blank|lacuna|input|resposta)?\s*#?_?([0-9]+)$/i);if(r){let c=parseInt(r[1],10);if(t){let p=document.body;try{p=le()||document.body}catch{}let g=Array.from(p.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, select, [contenteditable="true"]')).filter(f=>j(f)&&!J(f));if(c>=1&&c-1<g.length)return g[c-1];if(c===0&&g.length>0)return g[0]}let h=c-1;if(h>=0){let p=Po();if(h<p.length){let b=p[h];if(b.tagName.toLowerCase()==="tr"){if(e){let y=b.querySelector(`input[value="${te(e)}" i], [data-value="${te(e)}" i]`);if(y)return y}let v=b.querySelector("input");if(v)return v}return ie(b)}let g=document.body;try{g=le()||document.body}catch{}let f=Array.from(g.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, select, [contenteditable="true"]')).filter(b=>j(b)&&!J(b));if(h<f.length)return f[h]}}let u=i.match(/^(?:item|opção|opcao|afirmação|afirmacao|alternativa|linha|afirmativa|questão|questao)?\s*#?([a-eA-E])$/i);if(u){let c=u[1].toUpperCase(),h=c.charCodeAt(0)-65,p=Array.from(document.querySelectorAll(`input[type="radio"][value="${c}" i], input[type="checkbox"][value="${c}" i]`)).find(f=>j(f)&&!J(f));if(p)return ie(p);let g=Array.from(document.querySelectorAll('.option-card, .choice, .answer, label, [role="radio"], [role="checkbox"]')).find(f=>{if(!j(f)||J(f))return!1;let v=(f.querySelector('.option-badge, .badge, [class*="badge" i], [class*="letter" i]')?.textContent||"").trim().toUpperCase();if(v===c||v===`${c})`||v===`(${c})`||v===`${c}.`||v===`${c}:`)return!0;let y=(f.textContent||"").trim().toUpperCase();return y.startsWith(`${c})`)||y.startsWith(`(${c})`)||y.startsWith(`${c}.`)||y.startsWith(`${c}:`)});if(g)return ie(g);if(h>=0){let f=Po();if(h<f.length){let b=f[h];if(b.tagName.toLowerCase()==="tr"){if(e){let y=b.querySelector(`input[value="${te(e)}" i], [data-value="${te(e)}" i]`);if(y)return y}let v=b.querySelector("input");if(v)return v}return ie(b)}}}if(/^[a-zA-Z0-9_-]{1,10}$/.test(i)){let h=Array.from(document.querySelectorAll(`[data-category="${n}" i], [data-dropzone="${n}" i], [data-role="dropzone"][data-category="${n}" i]`)).find(b=>j(b)&&!J(b));if(h)return h;let g=Array.from(document.querySelectorAll(`input[value="${n}" i], [data-value="${n}" i], input[id="${n}" i], input[placeholder="${n}" i], textarea[placeholder="${n}" i], [title="${n}" i]`)).find(b=>j(b)&&!J(b));if(g)return ie(g);let f=Array.from(document.querySelectorAll('.option-badge, [class*="badge" i], [class*="letter" i], .option-card span, label span')).find(b=>{if(!j(b)||J(b))return!1;let v=H(b.textContent).toLowerCase();return v===i.toLowerCase()||v===i.toLowerCase()+")"});if(f)return ie(f)}try{let c=Array.from(document.querySelectorAll(`[name="${n}"], [value="${n}"], [placeholder="${n}" i], [title="${n}" i], [data-category="${n}" i], [data-dropzone="${n}" i], [data-testid="${n}" i], [data-test-id="${n}" i], [aria-label="${n}" i]`));if(e){let p=c.find(g=>{if(!j(g)||J(g))return!1;if(g instanceof HTMLInputElement&&g.value.toLowerCase()===e.toLowerCase())return!0;let f=g.closest("label, .vf-label, td, div");return f&&H(f.textContent).toLowerCase().includes(H(e).toLowerCase())});if(p)return ie(p)}let h=c.find(p=>j(p)&&!J(p));if(h)return h.hasAttribute("data-category")||h.hasAttribute("data-dropzone")||h.classList.contains("dnd-zone")?h:ie(h)}catch{}if(/^[.#\[]|\s|[>+~:]/.test(i))try{let h=Array.from(document.querySelectorAll(i)).find(p=>j(p)&&!J(p));if(h)return ie(h)}catch{}try{let c=i.replace(/"/g,""),h=`//button[normalize-space(.)="${c}"] | //a[normalize-space(.)="${c}"] | //*[not(*) and normalize-space(.)="${c}"] | //*[@aria-label="${c}"] | //*[@data-category="${c}"] | //*[@data-testid="${c}"]`,p=document.evaluate(h,document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);for(let g=0;g<p.snapshotLength;g++){let f=p.snapshotItem(g);if(f&&j(f)&&!J(f)){if(["body","html"].includes(f.tagName.toLowerCase())){let v=f.querySelector('button, [role="button"], a, input, [role="radio"], [role="checkbox"], label');if(v&&j(v))return ie(v)}return f.closest('[data-role="dropzone"], [class*="category" i], [class*="bucket" i], [class*="column" i], [class*="drop" i]')||ie(f)}}}catch{}let d=H(i).toLowerCase(),m=Array.from(document.querySelectorAll('button, a, div, span, li, p, label, input, textarea, select, [draggable="true"], [data-testid], [class*="option" i], [class*="card" i], [class*="item" i], [class*="choice" i], [class*="category" i], [class*="bucket" i]'));for(let c of m){if(!j(c)||J(c)||c.closest("header, nav, .stepper, .step-item, .progress-bar-container")||_(c)||!!(c.matches('article, section, form, main, [class*="container" i], [class*="grid" i], .dnd-pool, .dnd-zones')||c.querySelector('label, [role="radio"], [role="checkbox"], .dnd-card, [draggable="true"], .option-card, tr'))&&!c.matches(".dnd-zone, [data-category], [data-dropzone]"))continue;let p=H(c.textContent).toLowerCase(),g=H(c.getAttribute("aria-label")||"").toLowerCase(),f=H(c.getAttribute("placeholder")||"").toLowerCase(),b=H(c.getAttribute("title")||"").toLowerCase(),v=H(c.getAttribute("name")||"").toLowerCase(),y=H(c.getAttribute("data-category")||"").toLowerCase(),x=c instanceof HTMLInputElement||c instanceof HTMLButtonElement?c.value:"",w=H(x).toLowerCase(),q=p.startsWith(d+")")||p.startsWith(d+".")||p.startsWith(d+" -")||p.startsWith(d+":");if(p===d||g===d||f===d||b===d||v===d||y&&y===d||w&&w===d||q)return c.closest('[data-role="dropzone"], [class*="category" i], [class*="bucket" i], [class*="column" i], [class*="drop" i]')||ie(c)}if(d.length>=3)for(let c of m){if(!j(c)||J(c)||c.closest("header, nav, .stepper, .step-item, .progress-bar-container")||_(c)||!!(c.matches('article, section, form, main, [class*="container" i], [class*="grid" i], .dnd-pool, .dnd-zones')||c.querySelector('label, [role="radio"], [role="checkbox"], .dnd-card, [draggable="true"], .option-card, tr'))&&!c.matches(".dnd-zone, [data-category], [data-dropzone]"))continue;let p=H(c.textContent).toLowerCase(),g=H(c.getAttribute("aria-label")||"").toLowerCase(),f=H(c.getAttribute("placeholder")||"").toLowerCase(),b=H(c.getAttribute("title")||"").toLowerCase(),v=H(c.getAttribute("name")||"").toLowerCase();if(p.includes(d)||g.includes(d)||f.includes(d)||b.includes(d)||v.includes(d)){if(Array.from(c.children).some(q=>{let S=H(q.textContent).toLowerCase();return S&&S.includes(d)}))continue;return c.closest('[data-role="dropzone"], [class*="category" i], [class*="bucket" i], [class*="column" i], [class*="drop" i]')||ie(c)}let y=d.split(/\s+/).filter(Boolean);if(y.length>=3){let x=y.slice(0,Math.min(5,y.length)).join(" ");if(p.includes(x)||g.includes(x)||f.includes(x))return ie(c)}}return null}function zo(o,e){for(let t of e)o.dispatchEvent(new Event(t,{bubbles:!0,composed:!0}))}function se(o,e){if(!o)return;try{o.scrollIntoView({block:"nearest",inline:"nearest",behavior:"instant"})}catch{}try{o.focus?.()}catch{}let t=o.getBoundingClientRect(),a=e?e[0]:Math.round(t.left+Math.max(1,t.width/2)),i=e?e[1]:Math.round(t.top+Math.max(1,t.height/2)),n={bubbles:!0,cancelable:!0,composed:!0,view:window,clientX:a,clientY:i};try{o.dispatchEvent(new PointerEvent("pointerover",{...n}))}catch{}try{o.dispatchEvent(new MouseEvent("mouseover",{...n}))}catch{}try{o.dispatchEvent(new PointerEvent("pointerdown",{...n,button:0,buttons:1}))}catch{}try{o.dispatchEvent(new MouseEvent("mousedown",{...n,button:0,buttons:1}))}catch{}try{o.dispatchEvent(new PointerEvent("pointerup",{...n,button:0,buttons:0}))}catch{}try{o.dispatchEvent(new MouseEvent("mouseup",{...n,button:0,buttons:0}))}catch{}if(typeof o.click=="function")try{o.click()}catch{try{o.dispatchEvent(new MouseEvent("click",{...n,button:0,buttons:0}))}catch{}}else try{o.dispatchEvent(new MouseEvent("click",{...n,button:0,buttons:0}))}catch{}try{let s=Object.keys(o).find(r=>r.startsWith("__reactFiber")||r.startsWith("__reactInternalInstance"));if(s){let r=o[s];for(;r;){let u=r.memoizedProps||r.pendingProps;if(u?.onClick){u.onClick({type:"click",target:o,currentTarget:o,bubbles:!0,cancelable:!0,preventDefault:()=>{},stopPropagation:()=>{}});break}r=r.return}}}catch{}try{let s=Object.keys(o).find(r=>r.startsWith("__reactProps"));if(s){let r=o[s];r?.onClick&&r.onClick({type:"click",target:o,currentTarget:o,bubbles:!0,cancelable:!0,preventDefault:()=>{},stopPropagation:()=>{}})}}catch{}try{let s=o._vei;s?.onClick&&(Array.isArray(s.onClick.value)?s.onClick.value:[s.onClick.value]).forEach(u=>{try{u({type:"click",target:o})}catch{}})}catch{}try{o.$onclick&&o.$onclick({type:"click",target:o,preventDefault:()=>{},stopPropagation:()=>{}})}catch{}try{if(!!(document.querySelector('meta[content*="google.com/forms"], form[action*="formResponse"]')||o.closest("[data-item-id], [jsmodel], [jsaction], .freebirdFormviewerComponentsQuestionBaseRoot"))){let r=o.querySelector('input[type="radio"], input[type="checkbox"]');r&&(r.focus?.(),r.click(),Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"checked")?.set?.call(r,!0),r.dispatchEvent(new Event("change",{bubbles:!0})));let u=o.closest("[jsaction]");if(u&&u!==o)try{u.dispatchEvent(new MouseEvent("click",{bubbles:!0,cancelable:!0,view:window,clientX:a,clientY:i}))}catch{}}}catch{}if(o.getAttribute("role")==="button"||o.getAttribute("tabindex")!==null)try{o.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0,cancelable:!0})),o.dispatchEvent(new KeyboardEvent("keyup",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0,cancelable:!0}))}catch{}}function _t(o){try{let e=o.id,t=!!e;e||(e=`__eq_tmp_${Math.random().toString(36).slice(2,8)}`,o.id=e);let a=document.createElement("script");return a.textContent=`(function(){var el=document.getElementById(${JSON.stringify(e)});if(el){el.dispatchEvent(new MouseEvent('click',{bubbles:true,cancelable:true,composed:true,view:window}));if(typeof el.click==='function')el.click();var fk=Object.keys(el).find(function(k){return k.startsWith('__reactFiber')||k.startsWith('__reactInternalInstance');});if(fk){var fb=el[fk];while(fb){var mp=fb.memoizedProps||fb.pendingProps;if(mp&&typeof mp.onClick==='function'){try{mp.onClick({type:'click',target:el,currentTarget:el,bubbles:true,cancelable:true,preventDefault:function(){},stopPropagation:function(){}});}catch(e){}break;}fb=fb.return;}}var pk=Object.keys(el).find(function(k){return k.startsWith('__reactProps');});if(pk&&el[pk]&&typeof el[pk].onClick==='function'){try{el[pk].onClick({type:'click',target:el,currentTarget:el,bubbles:true,cancelable:true,preventDefault:function(){},stopPropagation:function(){}});}catch(e){}}if(el._vei&&el._vei.onClick){var h=el._vei.onClick.value;var hs=Array.isArray(h)?h:[h];hs.forEach(function(fn){try{fn({type:'click',target:el});}catch(e){}});}}})()`,document.head.appendChild(a),a.remove(),t||setTimeout(()=>{try{o.id===e&&o.removeAttribute("id")}catch{}},0),!0}catch{return!1}}function yt(o,e){let t=o;if(t.hasAttribute("for")){let m=t.getAttribute("for"),c=t.ownerDocument.getElementById(m);c&&(t=c)}let a=t.classList?.contains("mq-editable-field")||t.classList?.contains("mq-root-block")?t:t.querySelector(".mq-editable-field, .mq-root-block");if(a)try{let m=a.__mathquill||a.mathquill;if(m&&typeof m.latex=="function"){m.latex(e),a.dispatchEvent(new Event("input",{bubbles:!0,composed:!0})),a.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}));return}let c=window.MathQuill?.getInterface?.(2)||window.MathQuill?.getInterface?.(1);if(c){let h=c(a);if(h&&typeof h.latex=="function"){h.latex(e),a.dispatchEvent(new Event("input",{bubbles:!0,composed:!0}));return}}a.focus?.(),a.dispatchEvent(new KeyboardEvent("keydown",{key:"a",code:"KeyA",ctrlKey:!0,bubbles:!0})),a.dispatchEvent(new KeyboardEvent("keydown",{key:"Backspace",code:"Backspace",bubbles:!0}));for(let h of e)a.dispatchEvent(new KeyboardEvent("keydown",{key:h,code:`Key${h.toUpperCase()}`,bubbles:!0,cancelable:!0})),a.dispatchEvent(new KeyboardEvent("keypress",{key:h,code:`Key${h.toUpperCase()}`,bubbles:!0,cancelable:!0})),a.dispatchEvent(new InputEvent("input",{data:h,inputType:"insertText",bubbles:!0,cancelable:!0,composed:!0})),a.dispatchEvent(new KeyboardEvent("keyup",{key:h,code:`Key${h.toUpperCase()}`,bubbles:!0,cancelable:!0}));a.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}));return}catch(m){console.warn("[EasyQuiz] MathQuill fill falhou, continuando com fallback padr\xE3o:",m)}let i=t.matches?.('[class*="perseus-dropdown" i], [class*="perseus"] [role="combobox"]')?t:t.querySelector('[class*="perseus-dropdown" i], [class*="perseus"] [role="combobox"]');if(i)try{se(i),setTimeout(()=>{let m=e.trim().toLowerCase(),c=Array.from(document.querySelectorAll('[role="option"], [role="listbox"] [role="option"], [class*="dropdown"] [role="option"], [class*="perseus"] [class*="option"], .dropdown-option, [class*="select-option"]')).filter(h=>{let p=h;if(!j(p)||J(p))return!1;let g=(p.textContent||"").trim().toLowerCase(),f=p.getAttribute("data-value")?.toLowerCase()||"";return g===m||f===m||g.includes(m)||m.length>2&&m.includes(g)});c.length>0&&se(c[0])},250);return}catch(m){console.warn("[EasyQuiz] Perseus dropdown fill falhou:",m)}if(typeof HTMLSelectElement<"u"&&t instanceof HTMLSelectElement||t.tagName?.toLowerCase()==="select"||t.getAttribute("role")==="combobox"||t.getAttribute("role")==="listbox"||t.matches?.('[role="combobox"], [role="listbox"], [class*="select" i], [class*="dropdown" i]')){At(t,[e]);return}let s=t.querySelector('select, [role="combobox"], [role="listbox"]');if(s){At(s,[e]);return}if(!(t instanceof HTMLInputElement)&&!(t instanceof HTMLTextAreaElement)&&!(t instanceof HTMLSelectElement)&&!t.isContentEditable){let m=t.querySelector('input:not([type="hidden"]), textarea, select, [contenteditable="true"]');if(m)t=m;else{let h=t.closest('.form-group, .field, [class*="input" i], [class*="control" i], label, tr, td, li, p, div')?.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, select, [contenteditable="true"]');if(h)t=h;else{let p=t.nextElementSibling;for(;p;){if(p instanceof HTMLInputElement&&!["hidden","button","submit","checkbox","radio"].includes(p.type)||p instanceof HTMLTextAreaElement||p instanceof HTMLElement&&p.isContentEditable){t=p;break}let g=p.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(g){t=g;break}p=p.nextElementSibling}}}}if(t instanceof HTMLButtonElement||t.tagName.toLowerCase()==="a"||t.getAttribute("role")==="button"||t instanceof HTMLInputElement&&["button","submit","reset","image"].includes(t.type)){let m=t.parentElement?.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(m)t=m;else{let c=document.body;try{c=le()||document.body}catch{}let h=c.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(h)t=h;else{console.warn("[EasyQuiz] setNativeValue: Nenhum campo de texto encontrado para receber o valor.");return}}}if(!(t instanceof HTMLInputElement)&&!(t instanceof HTMLTextAreaElement)&&!(t instanceof HTMLSelectElement)&&!t.isContentEditable){let m=document.body;try{m=le()||document.body}catch{}let c=m.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(c)t=c;else{console.warn("[EasyQuiz] setNativeValue: Nenhum campo de texto encontrado para receber o valor.");return}}if(t instanceof HTMLInputElement&&["checkbox","radio"].includes(t.type)){let m=["true","1","checked","yes","sim"].includes(e.toLowerCase())||e===t.value;Le(t,m);return}let u=String(e??""),l=u;if(t instanceof HTMLInputElement&&t.type==="number"){let m=u.replace(",",".").replace(/[^0-9.-]/g,"");m&&!isNaN(Number(m))&&(l=m)}try{t.scrollIntoView?.({block:"center",inline:"center",behavior:"instant"}),t.focus?.()}catch{}try{if(t instanceof HTMLInputElement||t instanceof HTMLTextAreaElement){let m=t instanceof HTMLTextAreaElement?HTMLTextAreaElement.prototype:HTMLInputElement.prototype,c=Object.getOwnPropertyDescriptor(m,"value")?.set;c?c.call(t,""):t.value="";try{t.select?.()}catch{}}else if(t.isContentEditable){t.textContent="";try{document.execCommand?.("selectAll",!1,void 0)}catch{}}}catch{}let d=!1;try{t instanceof HTMLInputElement||t instanceof HTMLTextAreaElement?t.type!=="number"&&t.type!=="range"&&(d=document.execCommand?.("insertText",!1,l)||!1):t.isContentEditable&&(d=document.execCommand?.("insertText",!1,l)||!1)}catch{}if(t instanceof HTMLInputElement||t instanceof HTMLTextAreaElement){try{let h=t._valueTracker;h&&h.setValue(l===""?" ":"")}catch{}let m=t instanceof HTMLTextAreaElement?HTMLTextAreaElement.prototype:HTMLInputElement.prototype,c=Object.getOwnPropertyDescriptor(m,"value")?.set;c?c.call(t,l):t.value=l;try{t.dispatchEvent(new KeyboardEvent("keydown",{bubbles:!0,cancelable:!0,key:l.slice(-1)||"a"}))}catch{}try{t.dispatchEvent(new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,composed:!0,data:l,inputType:"insertText"}))}catch{}try{t.dispatchEvent(new InputEvent("input",{bubbles:!0,cancelable:!0,composed:!0,data:l,inputType:"insertText"}))}catch{t.dispatchEvent(new Event("input",{bubbles:!0,cancelable:!0,composed:!0}))}try{t.dispatchEvent(new KeyboardEvent("keyup",{bubbles:!0,cancelable:!0,key:l.slice(-1)||"a"}))}catch{}try{t.dispatchEvent(new Event("change",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}try{t.dispatchEvent(new FocusEvent("blur",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}if(t.value!==l&&!(t instanceof HTMLInputElement&&t.type==="number"&&Number(t.value)===Number(l))){t.value=l;try{c?.call(t,l)}catch{}}return}if(t.isContentEditable){if(t.textContent?.trim()!==l.trim()){t.textContent=l;try{t.innerText=l}catch{}}try{t.dispatchEvent(new InputEvent("input",{bubbles:!0,cancelable:!0,composed:!0,data:l,inputType:"insertText"}))}catch{t.dispatchEvent(new Event("input",{bubbles:!0,cancelable:!0,composed:!0}))}try{t.dispatchEvent(new Event("change",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}try{t.dispatchEvent(new FocusEvent("blur",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}return}try{"value"in t&&(t.value=l),t.dispatchEvent(new Event("input",{bubbles:!0,cancelable:!0,composed:!0})),t.dispatchEvent(new Event("change",{bubbles:!0,cancelable:!0,composed:!0}))}catch{}}function at(o,e=""){if(o==null)return e;let t=typeof o=="string"?o:String(o);if(!t)return e;let a=/^(eq-|#|\$|\.|input_|mat-|choice_|radio_|chk_)/i.test(t),i=H(t),n=F(t)||F(i);if(!n)return a?e:i||e;let s=n.closest('label, .option-card, [class*="choice" i], [class*="option" i], .quiz-option, tr, td, li');if(s){let m=H(s.textContent);if(m&&m.length>0&&m.length<150)return m}if(n.id){let m=document.querySelector(`label[for="${te(n.id)}"]`);if(m){let c=H(m.textContent);if(c&&c.length>0&&c.length<150)return c}}let r=n.getAttribute("aria-label");if(r)return H(r);let u=n.getAttribute("placeholder");if(u)return H(u);let l=H(n.textContent);if(l&&l.length>0&&l.length<120)return l;let d=n instanceof HTMLInputElement||n instanceof HTMLButtonElement?n.value:"";return d?H(d):a?e:i||e}function Le(o,e){if(!o)return;let t=o.closest('label, td, .option-card, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, [class*="option" i], [class*="choice" i], li')||o,a=o instanceof HTMLInputElement&&["checkbox","radio"].includes(o.type)?o:t.querySelector('input[type="checkbox"], input[type="radio"]');!a&&t.hasAttribute("for")&&(a=t.ownerDocument.getElementById(t.getAttribute("for")));let i=o instanceof HTMLInputElement?o.closest("label")||(o.id?t.ownerDocument.getElementById(t.getAttribute("for")):null)||o:t&&j(t)?t:o;if(a){let n=a.type==="radio",s=a.type==="checkbox",r=!!a._valueTracker;if(a.checked===e){if(n&&e){t.setAttribute("aria-checked","true"),t.setAttribute("aria-selected","true"),t.classList.add("selected","active","checked");return}if(s){t.setAttribute("aria-checked",e?"true":"false"),t.setAttribute("aria-selected",e?"true":"false"),t.classList.toggle("selected",e),t.classList.toggle("active",e),t.classList.toggle("checked",e);return}}if(i&&i!==a&&se(i),a.checked!==e)try{a.focus?.(),a.click()}catch{}if(a.checked!==e){try{let l=a._valueTracker;l&&l.setValue(!e)}catch{}try{Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"checked")?.set?.call(a,e)}catch{}a.checked=e,zo(a,["input","change"])}t.setAttribute("aria-checked",e?"true":"false"),t.setAttribute("aria-selected",e?"true":"false"),t.classList.toggle("selected",e),t.classList.toggle("active",e),t.classList.toggle("checked",e)}else{if((t.getAttribute("aria-checked")==="true"||t.getAttribute("aria-selected")==="true"||t.getAttribute("data-selected")==="true"||t.getAttribute("data-checked")==="true"||t.classList.contains("selected")||t.classList.contains("active")||t.classList.contains("checked"))===e&&e)return;se(i),t.setAttribute("aria-checked",e?"true":"false"),t.setAttribute("aria-selected",e?"true":"false"),t.classList.toggle("selected",e),t.classList.toggle("active",e),t.classList.toggle("checked",e)}}function At(o,e){let t=typeof HTMLSelectElement<"u"&&o instanceof HTMLSelectElement||o.tagName?.toLowerCase()==="select"?o:o.querySelector("select");if(t){let s=e.map(l=>H(l).toLowerCase()),r=!1,u=(l,d)=>{l.selected=!0,t.selectedIndex=d;try{t.value=l.value}catch{}try{Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype,"value")?.set?.call(t,l.value)}catch{}try{let m=t._valueTracker;m&&m.setValue(l.value)}catch{}r=!0};for(let l=0;l<t.options.length;l++){let d=t.options[l],m=d.value.toLowerCase(),c=H(d.textContent).toLowerCase();if(s.some(p=>p===m||p===c)){if(u(d,l),!t.multiple)break}else t.multiple||(d.selected=!1)}if(!r)for(let l of s){let d=l.match(/^(?:item|opção|opcao|alternativa|linha|escolha|campo)?\s*#?_?([0-9]+)$/i);if(d){let m=parseInt(d[1],10),h=t.options[0]?.value===""||t.options[0]?.disabled?m:m>=1?m-1:0;if(h>=0&&h<t.options.length&&(u(t.options[h],h),!t.multiple))break}}if(!r){for(let l of s)if(/^[a-z]$/i.test(l)){let d=l.toUpperCase().charCodeAt(0)-65,c=t.options[0]?.value===""||t.options[0]?.disabled?d+1:d;if(c>=0&&c<t.options.length&&(u(t.options[c],c),!t.multiple))break}}if(!r){let l=d=>d.normalize("NFD").replace(/[\u0300-\u036f]/g,"");for(let d=0;d<t.options.length;d++){let m=t.options[d],c=l(m.value.toLowerCase()),h=l(H(m.textContent).toLowerCase());if(s.some(g=>{let f=l(g);return c.includes(f)||h.includes(f)||f.length>2&&(f.includes(c)||f.includes(h))})&&(u(m,d),!t.multiple))break}}if(r){zo(t,["focus","input","change","blur"]);return}}let a=o.matches?.('[role="combobox"], [role="listbox"], [class*="select" i], [class*="dropdown" i]')?o:o.closest('[role="combobox"], [role="listbox"], [class*="select" i], [class*="dropdown" i]');a&&se(a);let i=e.map(s=>H(s).toLowerCase()),n=Array.from(document.querySelectorAll('[role="listbox"] [role="option"], [role="menu"] [role="menuitem"], .select-dropdown li, .dropdown-menu .dropdown-item, .ant-select-item-option, .MuiMenuItem-root, [class*="option-item"], li[data-value]')).filter(s=>j(s)&&!J(s));for(let s of i){let r=n.find(l=>{let d=H(l.textContent).toLowerCase(),m=H(l.getAttribute("data-value")||l.getAttribute("value")||"").toLowerCase();return d===s||m===s||d.includes(s)||s.length>2&&s.includes(d)});if(r){se(r);let l=r.querySelector('input[type="radio"], input[type="checkbox"]');l&&Le(l,!0);return}let u=F(s);if(u){se(u);return}}}function qa(o,e){try{let t=new DataTransfer;try{t.setData("text/plain",o)}catch{}try{t.setData("text/html",e)}catch{}return t}catch{return null}}function Yt(o){try{o.click()}catch{let e=o.ownerDocument.defaultView||window;o.dispatchEvent(new e.MouseEvent("click",{bubbles:!0,cancelable:!0,composed:!0,view:e}))}}function Ca(o,e,t){try{if(e.contains(o))return{success:!0,evidence:"origin is child of dest (DOM move confirmed)"};if(!document.body.contains(o))return{success:!0,evidence:"origin removed from DOM (consumed by framework)"};let a=e.children.length;if(t!==void 0&&a>t)return{success:!0,evidence:`dest child count increased: ${t} \u2192 ${a}`};if([o.getAttribute("data-placed")==="true",o.getAttribute("data-assigned")==="true",o.getAttribute("data-matched")==="true",o.getAttribute("aria-grabbed")==="false",/placed|dropped|assigned|matched|done|sorted|categorized/i.test(o.className||"")].some(Boolean))return{success:!0,evidence:"origin has placement indicator: class/attr"};let n=(o.textContent||"").trim().toLowerCase();return n.length>2&&Array.from(e.querySelectorAll("*")).some(u=>u!==e&&(u.textContent||"").trim().toLowerCase()===n)?{success:!0,evidence:"origin text found inside dest children (clone or DOM move)"}:e.getAttribute("data-count")&&parseInt(e.getAttribute("data-count")||"0")>0?{success:!0,evidence:"dest data-count > 0, categorization likely succeeded"}:o.getAttribute("aria-hidden")==="true"||o.style.display==="none"||o.style.visibility==="hidden"?{success:!0,evidence:"origin hidden after drop (framework confirmed placement)"}:{success:!1,evidence:"no DOM evidence of successful drag/categorization"}}catch{return{success:!1,evidence:"verification threw exception"}}}function me(o,e){let t=H(o).toLowerCase();if(!t)return null;if(e==="source"){if(/^[0-9a-f]{10,}$/.test(o.trim())){let r=document.getElementById(o.trim());if(r&&j(r)&&!J(r))return r}let s=['[class*="cursor-grab"][id]',".dnd-card",'[draggable="true"]'];for(let r of s){let l=Array.from(document.querySelectorAll(r)).find(d=>{if(!j(d)||J(d))return!1;let m=H(`${d.id} ${d.textContent||""} ${d.getAttribute("data-id")||""}`).toLowerCase();return m===t||m.includes(t)||d.id===o.trim()});if(l)return l}return null}let a=["[data-dropzone]","[data-category]",'[data-role="dropzone"]','[class*="dropzone" i]','[class*="list-group" i]','[class*="classification-group" i]'].join(","),i=Array.from(document.querySelectorAll(a)),n=i.find(s=>[s.getAttribute("data-category"),s.getAttribute("data-dropzone")].some(r=>r?.trim().toLowerCase()===t));return n&&j(n)&&!J(n)?n:i.find(s=>{if(!j(s)||J(s)||/unclassified/i.test(s.className))return!1;let r=s.querySelector('.font-bold, h1, h2, h3, h4, [class*="header" i], [class*="title" i], [class*="label" i]'),u=H(r?.textContent||s.textContent||"").toLowerCase();return u.includes("op")&&(u.includes("es")||u.includes("\xF5es"))?!1:u===t||u.startsWith(t)||u.includes(t)})||null}async function wt(o,e,t=1){try{o.scrollIntoView({block:"center",inline:"center",behavior:"instant"})}catch{}let a=o.getBoundingClientRect(),i=e.getBoundingClientRect(),n=Math.round(a.left+Math.max(1,a.width/2)),s=Math.round(a.top+Math.max(1,a.height/2)),r=Math.round(i.left+Math.max(1,i.width/2)),u=Math.round(i.top+Math.max(1,i.height/2)),l=H(e.textContent).toLowerCase();if(l){let g=Array.from(o.querySelectorAll('button, [role="button"], input[type="radio"], input[type="checkbox"], option, .btn, [class*="tag" i]')).find(f=>{let b=H(f.textContent).toLowerCase(),v=f instanceof HTMLInputElement||f instanceof HTMLOptionElement?H(f.value).toLowerCase():"";return b&&(l.includes(b)||b.includes(l))||v&&(l.includes(v)||v.includes(l))});g&&(se(g),await new Promise(f=>setTimeout(f,120)))}Yt(o),await new Promise(p=>setTimeout(p,140)),Yt(e);let d=e.querySelector('[data-role="dropzone"], [class*="bucket" i], [class*="slot" i], [class*="drop" i], [class*="target" i], [class*="items" i], ul, ol');if(d&&d!==e&&Yt(d),await new Promise(p=>setTimeout(p,100)),!e.contains(o)&&o.matches('.dnd-card, [draggable="true"]')&&e.matches('.dnd-zone, [data-dropzone], [data-role="dropzone"]')&&e.appendChild(o),e.contains(o)&&o.matches('.dnd-card, [draggable="true"]'))return;let m={bubbles:!0,cancelable:!0,composed:!0,view:window,clientX:n,clientY:s,screenX:n,screenY:s,button:0,buttons:1};try{o.dispatchEvent(new PointerEvent("pointerdown",{...m,isPrimary:!0,pointerId:1,pointerType:"mouse",pressure:.5}))}catch{}o.dispatchEvent(new MouseEvent("mousedown",m));let c=4;for(let p=1;p<=c;p++){let g=Math.round(n+(r-n)*(p/c)),f=Math.round(s+(u-s)*(p/c)),b={...m,clientX:g,clientY:f,screenX:g,screenY:f};try{o.dispatchEvent(new PointerEvent("pointermove",{...b,isPrimary:!0,pointerId:1,pointerType:"mouse",pressure:.5}))}catch{}document.dispatchEvent(new MouseEvent("mousemove",b))}let h={bubbles:!0,cancelable:!0,composed:!0,view:window,clientX:r,clientY:u,screenX:r,screenY:u,button:0,buttons:0};try{e.dispatchEvent(new PointerEvent("pointerup",{...h,isPrimary:!0,pointerId:1,pointerType:"mouse",pressure:0}))}catch{}e.dispatchEvent(new MouseEvent("mouseup",h)),e.dispatchEvent(new MouseEvent("click",h));try{let p=qa($(o.textContent),o.outerHTML),g={...m},f={...h};p&&(g.dataTransfer=p,f.dataTransfer=p);let b=o.ownerDocument.defaultView?.DragEvent;if(!b)throw new Error("DragEvent n\xE3o dispon\xEDvel neste documento");o.dispatchEvent(new b("dragstart",g)),e.dispatchEvent(new b("dragenter",f)),e.dispatchEvent(new b("dragover",f)),e.dispatchEvent(new b("drop",f)),o.dispatchEvent(new b("dragend",g))}catch(p){console.warn("[EasyQuiz] DragEvent ignorado com seguran\xE7a:",p)}try{let p=new Touch({identifier:1,target:o,clientX:n,clientY:s}),g=new Touch({identifier:1,target:e,clientX:r,clientY:u});o.dispatchEvent(new TouchEvent("touchstart",{bubbles:!0,cancelable:!0,touches:[p]})),e.dispatchEvent(new TouchEvent("touchmove",{bubbles:!0,cancelable:!0,touches:[g]})),e.dispatchEvent(new TouchEvent("touchend",{bubbles:!0,cancelable:!0,touches:[]}))}catch{}if(t>=2&&!e.contains(o))try{o.focus?.(),o.dispatchEvent(new KeyboardEvent("keydown",{key:" ",code:"Space",bubbles:!0})),o.dispatchEvent(new KeyboardEvent("keyup",{key:" ",code:"Space",bubbles:!0})),await new Promise(p=>setTimeout(p,80)),e.focus?.(),e.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",bubbles:!0})),e.dispatchEvent(new KeyboardEvent("keyup",{key:"Enter",code:"Enter",bubbles:!0}))}catch{}if(!e.contains(o))try{let p=b=>{let v=Object.keys(b).find(x=>x.startsWith("__reactFiber")||x.startsWith("__reactInternalInstance"));if(!v)return null;let y=b[v];for(let x=0;x<10&&y;x++){if(y.memoizedProps)return y.memoizedProps;y=y.return}return null},g=p(o),f=p(e);if(g){let b=g.onMouseDown||g.onPointerDown||g.onDragStart;if(typeof b=="function")try{b({type:"mousedown",button:0,buttons:1,clientX:n,clientY:s,bubbles:!0,preventDefault:()=>{},stopPropagation:()=>{},currentTarget:o,target:o}),await new Promise(v=>setTimeout(v,100))}catch{}}if(f){let b=f.onMouseUp||f.onPointerUp||f.onDrop;if(typeof b=="function")try{b({type:"mouseup",button:0,buttons:0,clientX:r,clientY:u,bubbles:!0,preventDefault:()=>{},stopPropagation:()=>{},currentTarget:e,target:e})}catch{}}try{o.focus?.(),o.dispatchEvent(new KeyboardEvent("keydown",{key:" ",code:"Space",keyCode:32,bubbles:!0,cancelable:!0})),await new Promise(v=>setTimeout(v,200));let b=u>s?"ArrowDown":"ArrowUp";for(let v=0;v<3;v++)document.dispatchEvent(new KeyboardEvent("keydown",{key:b,bubbles:!0,cancelable:!0})),await new Promise(y=>setTimeout(y,60));document.dispatchEvent(new KeyboardEvent("keydown",{key:" ",code:"Space",keyCode:32,bubbles:!0,cancelable:!0})),await new Promise(v=>setTimeout(v,80))}catch{}try{!!document.querySelector("[data-rbd-draggable-id], [data-rbd-droppable-id], [data-dnd-kit-sortable]")&&(o.dispatchEvent(new CustomEvent("dndkitdragstart",{bubbles:!0,cancelable:!0,detail:{id:o.id||o.getAttribute("data-id")}})),await new Promise(v=>setTimeout(v,100)),e.dispatchEvent(new CustomEvent("dndkitdrop",{bubbles:!0,cancelable:!0,detail:{overId:e.id||e.getAttribute("data-id")}})))}catch{}}catch(p){console.warn("[EasyQuiz] Estrat\xE9gia G (React DnD internals) falhou:",p)}if(!e.contains(o))try{let p=o.closest("[data-rbd-draggable-id]"),g=e.closest("[data-rbd-droppable-id]");if(p&&g){let f=p.getBoundingClientRect(),b=g.getBoundingClientRect(),v=f.left+f.width/2,y=f.top+f.height/2,x=b.left+b.width/2,w=b.top+b.height/2,q=(T,A,P,z)=>new PointerEvent(T,{bubbles:!0,cancelable:!0,composed:!0,clientX:A,clientY:P,screenX:A,screenY:P,isPrimary:!0,pointerId:1,pointerType:"mouse",pressure:T==="pointerup"?0:.5,...z});p.dispatchEvent(q("pointerdown",v,y)),await new Promise(T=>setTimeout(T,80));let S=8;for(let T=1;T<=S;T++){let A=v+(x-v)*(T/S),P=y+(w-y)*(T/S);window.dispatchEvent(q("pointermove",A,P)),document.dispatchEvent(new MouseEvent("mousemove",{bubbles:!0,clientX:A,clientY:P})),await new Promise(z=>setTimeout(z,20))}g.dispatchEvent(q("pointerup",x,w,{pressure:0})),g.dispatchEvent(new MouseEvent("mouseup",{bubbles:!0,clientX:x,clientY:w,button:0})),await new Promise(T=>setTimeout(T,120)),console.log("[EasyQuiz] Estrat\xE9gia H (Quizizz RBD) executada")}}catch(p){console.warn("[EasyQuiz] Estrat\xE9gia H (Quizizz RBD) falhou:",p)}}function Oo(o,e,t,a){let i=u=>u.replace(/\\/g,"\\\\").replace(/'/g,"\\'").replace(/"/g,'\\"').slice(0,100),n=i(o.toLowerCase()),s=i(e.toLowerCase());return`var src=$eq.find('${i(t)}')||Array.from(document.querySelectorAll('[data-rbd-draggable-id],[draggable],[class*="cursor-grab"],[class*="dnd-card"]')).find(function(e){return (e.textContent||'').toLowerCase().includes('${n}');});var dst=Array.from(document.querySelectorAll('[data-rbd-droppable-id],[class*="list-group"],[class*="dropzone"],[data-category]')).find(function(e){var h=e.querySelector('.font-bold,h1,h2,h3,h4,[class*="header"]');var t=(h||e);return (t.textContent||'').toLowerCase().includes('${s}');});if(src&&dst){try{src.focus();src.dispatchEvent(new KeyboardEvent('keydown',{key:' ',code:'Space',keyCode:32,bubbles:true}));setTimeout(function(){dst.dispatchEvent(new KeyboardEvent('keydown',{key:'Enter',code:'Enter',bubbles:true}));},200);}catch(e){}try{dst.appendChild(src);}catch(e){}[src,dst].forEach(function(el){try{el.dispatchEvent(new Event('change',{bubbles:true}));}catch(e){}try{el.dispatchEvent(new CustomEvent('dndkitdrop',{bubbles:true,detail:{}}));}catch(e){}});}else{console.warn('[EQ-drag-fallback] nao localizado: ${n} -> ${s}');}`}var Do={fill:(o,e)=>{let t=F(o);t?yt(t,e):console.warn(`$eq.fill: Elemento '${o}' n\xE3o encontrado`)},click:o=>{let e=F(o);e?!!(e.closest('.option-card, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, [class*="option" i], [class*="choice" i]')||e.querySelector('input[type="radio"], input[type="checkbox"]')||e instanceof HTMLInputElement&&["checkbox","radio"].includes(e.type))?Le(e,!0):se(e):console.warn(`$eq.click: Elemento '${o}' n\xE3o encontrado`)},check:(o,e)=>{let t=F(o);t?Le(t,e):console.warn(`$eq.check: Elemento '${o}' n\xE3o encontrado`)},find:(o,e)=>F(o,e),drag:(o,e)=>{let t=me(o,"source")||F(o),a=me(e,"destination")||F(e);t&&a?wt(t,a):console.warn(`$eq.drag: Origem ou destino n\xE3o encontrado ('${o}' -> '${e}')`)},categorize:async(o,e)=>{let t=me(o,"source")||F(o),a=me(e,"destination")||F(e);if(!t||!a){console.warn(`$eq.categorize: Item ou categoria n\xE3o encontrados ('${o}' -> '${e}')`);return}await wt(t,a)},execute:(o,e=!1,t=1)=>nt(o,e,t)};typeof window<"u"&&(window.$eq=Do);async function ka(o,e,t){if(!e)return!1;if(o.t==="val"&&(e.classList.contains("mq-editable-field")||e.closest(".mq-editable-field"))){let a=e.classList.contains("mq-editable-field")?e:e.closest(".mq-editable-field");if(a){try{let i=a.__controller||a.__mathquill_controller;if(i&&i.API)return i.API.latex(t),!0}catch{}try{a.focus();for(let i of t){let n={key:i,bubbles:!0,cancelable:!0};a.dispatchEvent(new KeyboardEvent("keydown",n)),a.dispatchEvent(new KeyboardEvent("keypress",n)),document.execCommand?.("insertText",!1,i),a.dispatchEvent(new KeyboardEvent("keyup",n))}return!0}catch{}}}if(o.t==="sel"&&e.closest(".perseus-widget-container")){let a=e.tagName==="BUTTON"?e:e.querySelector("button")||e.closest("button");if(a)try{se(a),await new Promise(n=>setTimeout(n,150));let i=Array.from(document.querySelectorAll('[data-reach-popover], [role="listbox"], .perseus-dropdown'));for(let n of i){let r=Array.from(n.querySelectorAll('[role="option"], li, button')).find(u=>H(u.textContent).toLowerCase().includes(H(t).toLowerCase()));if(r)return se(r),!0}se(a)}catch{}}if((o.t==="clk"||o.t==="chk")&&e.closest(".perseus-widget-container"))try{let a=Object.keys(e).find(n=>n.startsWith("__reactFiber$")),i=Object.keys(e).find(n=>n.startsWith("__reactProps$"));if(i&&e[i]){let n=e[i];if(typeof n.onClick=="function")return n.onClick({preventDefault:()=>{},stopPropagation:()=>{}}),!0;if(typeof n.onChange=="function")return n.onChange({target:{checked:!0,value:t},preventDefault:()=>{}}),!0}}catch{}return!1}async function Ta(o,e=1,t=Ne()){if(Xt(o,t),o.t==="js"){let u=String(o.v||"");qo(u);try{new Function("$eq","document","window",u)(Do,document,window)}catch(l){throw console.warn("[EasyQuiz JS Execution]",l),l}return}if(o.t==="drag"){let u=me(o.from,"source")||F(o.from),l=me(o.to,"destination")||F(o.to);!u&&o.from&&(u=F(H(o.from))),!l&&o.to&&(l=F(H(o.to))),u&&l?await wt(u,l,e):console.warn(`[EasyQuiz] Drag: alvo n\xE3o encontrado ('${o.from}' -> '${o.to}')`);return}let a=o.id!==void 0&&o.id!==null?String(o.id):"";!a&&o.t==="val"&&(a=o.target??o.name??o.selector??"1");let i=o.v!==void 0?o.v:o.value!==void 0?o.value:o.val!==void 0?o.val:o.text,n=i!=null?String(i).trim():"",s=null,r=String(o.name??o.n??"").trim();if(!r&&a&&document.querySelector(`input[type="radio"][name="${te(a)}"]`)&&(r=a),(o.t==="chk"||o.t==="clk")&&r){let u=Array.from(document.querySelectorAll(`input[name="${te(r)}"]`));if(n&&(s=u.find(l=>l.value?.toLowerCase()===n.toLowerCase())??null),!s&&n){let l=/^(v|verdadeiro|true|1|t|sim|correto)$/i.test(n),d=/^(f|falso|false|0|nao|não|incorreto|errado)$/i.test(n);if(l||d){let m=l?["v","verdadeiro","true","1","t","sim","correto"]:["f","falso","false","0","nao","n\xE3o","incorreto","errado"];s=u.find(c=>{let h=c.value?.toLowerCase()??"";if(m.includes(h))return!0;let g=(c.closest('label, td, [class*="option" i]')?.textContent??"").trim().toLowerCase();return m.some(f=>g===f||g.startsWith(f+" ")||g.startsWith("("+f+")"))})??null}}!s&&u.length>0&&(s=u[0])}if(s||(s=F(a,n,o.t==="val"||o.t==="sel")),!s&&a&&(s=F(H(a),n,o.t==="val"||o.t==="sel")),s&&n){if(s instanceof HTMLInputElement&&s.type==="radio"&&s.name){if(H(s.value).toLowerCase()!==H(n).toLowerCase()){let u=document.querySelector(`input[type="radio"][name="${te(s.name)}"][value="${te(n)}" i]`);if(u)s=u;else{let d=Array.from(document.querySelectorAll(`input[type="radio"][name="${te(s.name)}"]`)).find(m=>{let c=m.closest("label, .vf-label, .option-card, tr, td, div");return c&&H(c.textContent).toLowerCase().includes(H(n).toLowerCase())});d&&(s=d)}}}else if(!(s instanceof HTMLInputElement)&&!(s instanceof HTMLSelectElement)&&!(s instanceof HTMLTextAreaElement)){let u=s.querySelector(`input[value="${te(n)}" i], [data-value="${te(n)}" i]`);if(u)s=u;else{let d=Array.from(s.querySelectorAll('input[type="radio"], input[type="checkbox"]')).find(m=>{let c=m.closest("label, .vf-label, .option-card, td, div");return c&&H(c.textContent).toLowerCase().includes(H(n).toLowerCase())});d&&(s=d)}}}if(!s&&(o.t==="val"||o.t==="sel")){let u=document.body;try{u=le()||document.body}catch{}let l=Array.from(u.querySelectorAll(o.t==="sel"?'select, [role="combobox"], [role="listbox"]':'input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, select, [contenteditable="true"]')).filter(d=>j(d)&&!J(d));if(l.length===1)s=l[0];else if(l.length>1){let d=H(a).toLowerCase(),m=d.match(/^#?_?([0-9]+)$/);if(m){let c=parseInt(m[1],10);c>=1&&c<=l.length?s=l[c-1]:c>=0&&c<l.length&&(s=l[c])}s||(s=l.find(h=>{let p=(h.getAttribute("placeholder")||"").toLowerCase(),g=(h.name||"").toLowerCase(),f=(h.getAttribute("aria-label")||"").toLowerCase(),b=(h.id||"").toLowerCase(),v=H(Gt(h)).toLowerCase(),y=H(h.closest('label, tr, td, .form-group, .field, [class*="row" i], div')?.textContent||"").toLowerCase();return p.includes(d)||g.includes(d)||f.includes(d)||b.includes(d)||v&&v.includes(d)||d.length>=2&&y.includes(d)})||(l.length===1?l[0]:null))}}if(!s&&o.t!=="adv"){let u=document.querySelector(".perseus-renderer, .framework-perseus, .perseus-widget-container");if(u){let l=H(a).toLowerCase(),d=Array.from(u.querySelectorAll('.mq-editable-field, [role="radio"], [role="checkbox"], [role="combobox"], input:not([type="hidden"]), textarea, select, [role="button"], [role="option"]')).filter(m=>j(m)&&!J(m));if(s=d.find(m=>{let c=(m.textContent||"").trim().toLowerCase(),h=(m.id||"").toLowerCase(),p=(m.getAttribute("aria-label")||"").toLowerCase(),g=(m.value||m.getAttribute("data-value")||"").toLowerCase();return h===l||c===l||p===l||g===l||l.length>=3&&(c.includes(l)||p.includes(l))})||null,!s&&o.t==="val"&&d.length>0){let m=d.filter(c=>c instanceof HTMLInputElement||c instanceof HTMLTextAreaElement||c.classList.contains("mq-editable-field")||c.classList.contains("mq-root-block")||c.isContentEditable);if(m.length>0){let c=l.match(/^#?_?([0-9]+)$/);if(c){let h=parseInt(c[1],10);s=m[Math.min(h-1,m.length-1)]||m[0]}else s=m[0]}}}}if(!s&&o.t!=="adv")throw new Error(`Alvo '${a}' n\xE3o encontrado no DOM para a\xE7\xE3o '${o.t}'.`);if(!(Xe()&&s&&o.t!=="adv"&&await ka(o,s,n)))switch(o.t){case"val":if(s){let d=s instanceof HTMLInputElement||s instanceof HTMLTextAreaElement||s instanceof HTMLSelectElement||s.isContentEditable?s:s.querySelector('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]');if(!d){let g=s.closest('.form-group, .field, [class*="input" i], [class*="control" i], label, tr, td, li, p, div')?.querySelector('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]');g&&(d=g)}if(!d){let p=s.nextElementSibling;for(;p;){if(p instanceof HTMLInputElement&&!["hidden","button","submit","checkbox","radio"].includes(p.type)||p instanceof HTMLTextAreaElement||p instanceof HTMLElement&&p.isContentEditable){d=p;break}let g=p.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(g){d=g;break}p=p.nextElementSibling}}if(!d){let p=document.body;try{p=le()||document.body}catch{}let g=Array.from(p.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]')).filter(f=>j(f)&&!J(f));g.length>0&&(d=g[0])}let m=o.v!==void 0?o.v:o.value!==void 0?o.value:o.val!==void 0?o.val:o.text,c=m!=null?String(m):"",h=d||s;if(h instanceof HTMLInputElement){let p=h.type.toLowerCase(),g=h.maxLength,f=h.min,b=h.max,v=h.step,y=h.pattern;if(g>0&&c.length>g&&(c=c.slice(0,g)),p==="number"||p==="range"){let x=parseFloat(c);if(!isNaN(x)){let w=x;if(f!==""&&!isNaN(parseFloat(f))&&(w=Math.max(w,parseFloat(f))),b!==""&&!isNaN(parseFloat(b))&&(w=Math.min(w,parseFloat(b))),v!==""&&v!=="any"&&!isNaN(parseFloat(v))){let q=parseFloat(v),S=f!==""?parseFloat(f):0;w=S+Math.round((w-S)/q)*q,f!==""&&!isNaN(parseFloat(f))&&(w=Math.max(w,parseFloat(f))),b!==""&&!isNaN(parseFloat(b))&&(w=Math.min(w,parseFloat(b)))}c=Number.isInteger(w)?String(w):String(parseFloat(w.toFixed(6)))}}if(y)try{let x=new RegExp(`^(?:${y})$`);if(!x.test(c)){let w=c.match(/-?\d+\.?\d*/);w&&x.test(w[0])&&(c=w[0])}}catch{}}yt(d||s,c)}break;case"chk":let u=o.c!==void 0?!!o.c:!0;s&&Le(s,u);break;case"sel":if(s){let d=Array.isArray(o.v)?o.v:[String(o.v)];At(s,d)}break;case"clk":if(s)if(!!(s.closest('.option-card, label, .vf-label, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, [class*="option" i], [class*="choice" i], [class*="answer" i], li, tr')||s.querySelector('input[type="radio"], input[type="checkbox"]')||s instanceof HTMLInputElement&&["checkbox","radio"].includes(s.type))){let m=o.c!==void 0?!!o.c:!0;Le(s,m)}else se(s,o.co);break;case"adv":let l=qt(o.id);if(l){await Zt(l,1200);let d=o.id||l.textContent?.trim()||"";d&&Dt(window.location.hostname,{advanceSelector:d}),se(l)}else console.warn("[EasyQuiz] Bot\xE3o de avan\xE7o n\xE3o localizado.");break}}function Sa(){let o=["button","a",'[role="button"]','input[type="submit"]','input[type="button"]','[data-testid*="check" i]','[data-test-id*="check" i]'].join(",");return Array.from(document.querySelectorAll(o)).find(t=>{if(!j(t)||J(t)||t.closest("header, nav, aside"))return!1;let a=t instanceof HTMLInputElement||t instanceof HTMLButtonElement?t.value:"",i=(t.textContent||a||t.getAttribute("aria-label")||"").trim();return/(verificar|checar|check|conferir|validar|enviar|responder)/i.test(i)})||null}function qt(o){let e=c=>{let h=(c.getAttribute("aria-label")||c.textContent||(c instanceof HTMLInputElement||c instanceof HTMLButtonElement?c.value:"")||"").trim();return qe.test(h)};if(o){let c=F(o);if(c&&j(c)&&!J(c)&&!_(c)&&!e(c))return c}try{let c=Ot(window.location.hostname);if(c.advanceSelector){let h=F(c.advanceSelector);if(h&&j(h)&&!J(h)&&!_(h)&&!e(h))return h}}catch{}let t=["button","a",'[role="button"]','[role="link"]','input[type="button"]','input[type="submit"]','[data-testid*="next" i]','[data-testid*="continue" i]','[data-testid*="check" i]','[data-test-id*="next" i]','[data-test-id*="continue" i]','[data-test-id*="check" i]','[class*="next" i]','[class*="continue" i]','[class*="proximo" i]','[class*="avancar" i]'].join(","),a=Array.from(document.querySelectorAll(t)),i=c=>{let h=c instanceof HTMLInputElement||c instanceof HTMLButtonElement?c.value:"";return(c.getAttribute("aria-label")||c.textContent||h||"").trim()},n=c=>{let h=i(c).trim();return/^\d{1,3}$/.test(h)?!!c.closest('[class*="pagination" i], [class*="pager" i], [class*="page-nav" i], [class*="step-indicator" i], [class*="breadcrumb" i], [class*="steps" i], [aria-label*="p\xE1gina" i], [aria-label*="page" i], [role="navigation"], nav'):!1},s=a.filter(c=>j(c)&&!J(c)&&!c.closest("header, aside")&&!_(c)&&!e(c));for(let c of s){let h=i(c),p=h.replace(/[\d\(\)\[\]\u2192>\u2022\-\/\\]+/g," ").trim();if((tt.test(h)||tt.test(p))&&!n(c)&&!_(c))return c}for(let c of s)if(re(c)&&!_(c)&&!n(c))return c;let r=document.querySelector('[data-test-id*="next" i], [data-testid*="next" i], [aria-label*="next" i], [aria-label*="pr\xF3xim" i], [aria-label*="avan\xE7ar" i], [aria-label*="continuar" i]');if(r&&j(r)&&!J(r)&&!_(r)&&!e(r))return r;let u=Array.from(document.querySelectorAll('input[type="submit"], button[type="submit"]'));for(let c of u)if(j(c)&&!J(c)&&!e(c)&&!_(c)&&!n(c))return c;let l=Array.from(document.querySelectorAll('button, [role="button"]')),d=window.innerHeight,m=l.filter(c=>{if(!j(c)||J(c)||e(c)||_(c)||c.closest("header, nav, aside, .eq-sidebar")||n(c))return!1;let h=c.getBoundingClientRect();return h.top>d*.45&&h.height>=24&&h.width>=24});if(m.length>0)return m.sort((c,h)=>{let p=c.getBoundingClientRect(),g=h.getBoundingClientRect(),f=p.left+p.top;return g.left+g.top-f}),m[0];for(let c of s)if(re(c)&&!_(c))return c;return null}async function Zt(o,e=2500){let t=Date.now();for(;Date.now()-t<e;){if(!(o.disabled===!0||o.getAttribute("aria-disabled")==="true"||o.classList.contains("disabled")||o.getAttribute("disabled")!==null))return;await new Promise(i=>setTimeout(i,80))}}function La(){let o=window.location.href,e=document.title,t=document.querySelectorAll('input, textarea, select, button, [role="button"], [role="option"], [role="radio"], [role="checkbox"]').length,a=(document.body?.innerText||document.body?.textContent||"").length;return`${o}|${e}|${t}|${a}`}async function Ma(o,e=3500){let[t,a,i,n]=o.split("|"),s=parseInt(n||"0",10),r=Date.now();for(;Date.now()-r<e;){let u=window.location.href,l=document.title,d=String(document.querySelectorAll('input, textarea, select, button, [role="button"], [role="option"], [role="radio"], [role="checkbox"]').length),m=(document.body?.innerText||document.body?.textContent||"").length;if(u!==t)return{changed:!0,evidence:`URL mudou: ${t} \u2192 ${u}`};if(l!==a)return{changed:!0,evidence:`T\xEDtulo da p\xE1gina mudou: "${a}" \u2192 "${l}"`};if(Math.abs(parseInt(d)-parseInt(i||"0"))>=2)return{changed:!0,evidence:`Controles interativos: ${i} \u2192 ${d}`};if(Math.abs(m-s)>50)return{changed:!0,evidence:`Conte\xFAdo da p\xE1gina mudou substancialmente (${Math.abs(m-s)} chars)`};await new Promise(c=>setTimeout(c,100))}return{changed:!1,evidence:"Nenhuma mudan\xE7a estrutural detectada dentro do tempo limite."}}async function Et(o){if(o.t==="js"||o.t==="adv")return;if(o.t==="drag"){let n=F(o.from)||F(H(o.from)),s=F(o.to)||F(H(o.to));n&&s&&await wt(n,s,2);return}let e=o.id||"",t=o.v!==void 0?String(o.v).trim():"",a=F(e,t)||F(H(e),t),i=String(o.name??o.n??"").trim();if(!i&&e&&document.querySelector(`input[type="radio"][name="${te(e)}"]`)&&(i=e),!a&&i){let n=Array.from(document.querySelectorAll(`input[name="${te(i)}"]`));if(t&&(a=n.find(s=>s.value?.toLowerCase()===t.toLowerCase())??null),!a&&t){let s=/^(v|verdadeiro|true|1|t|sim|correto)$/i.test(t),r=/^(f|falso|false|0|nao|não|incorreto|errado)$/i.test(t);if(s||r){let u=s?["v","verdadeiro","true","1","t","sim","correto"]:["f","falso","false","0","nao","n\xE3o","incorreto","errado"];a=n.find(l=>{let d=l.value?.toLowerCase()??"";if(u.includes(d))return!0;let c=(l.closest('label, td, [class*="option" i]')?.textContent??"").trim().toLowerCase();return u.some(h=>c===h||c.startsWith(h+" ")||c.startsWith("("+h+")"))})??null}}!a&&n.length>0&&(a=n[0])}if(o.t==="clk"||o.t==="chk"){if(!a&&e){let s=Array.from(document.querySelectorAll('input, label, button, [role="radio"], [role="checkbox"], .option-card, [class*="option" i], [class*="choice" i]')),r=H(e).toLowerCase();a=s.find(u=>{let l=H(u.textContent).toLowerCase();return!!(H(u.value||"").toLowerCase()===r||l===r||l.startsWith(r+")")||l.startsWith("("+r+")")||l.startsWith(r+".")||l.startsWith(r+" - ")||l.startsWith(r+":")||r.length>=3&&l.includes(r))})||null}let n=o.v!==void 0?String(o.v).trim():"";if(a&&n){if(a instanceof HTMLInputElement&&a.type==="radio"&&a.name){if(H(a.value).toLowerCase()!==H(n).toLowerCase()){let s=document.querySelector(`input[type="radio"][name="${te(a.name)}"][value="${te(n)}" i]`);if(s)a=s;else{let u=Array.from(document.querySelectorAll(`input[type="radio"][name="${te(a.name)}"]`)).find(l=>{let d=l.closest("label, .vf-label, .option-card, tr, td, div");return d&&H(d.textContent).toLowerCase().includes(H(n).toLowerCase())});u&&(a=u)}}}else if(!(a instanceof HTMLInputElement)&&!(a instanceof HTMLSelectElement)&&!(a instanceof HTMLTextAreaElement)){let s=a.querySelector(`input[value="${te(n)}" i], [data-value="${te(n)}" i]`);if(s)a=s;else{let u=Array.from(a.querySelectorAll('input[type="radio"], input[type="checkbox"]')).find(l=>{let d=l.closest("label, .vf-label, .option-card, td, div");return d&&H(d.textContent).toLowerCase().includes(H(n).toLowerCase())});u&&(a=u)}}}if(a){let s=a.closest('.option-card, label, .vf-label, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, li')||a,r=a instanceof HTMLInputElement&&["radio","checkbox"].includes(a.type)?a:s.querySelector('input[type="radio"], input[type="checkbox"]')||(s.getAttribute("for")?s.ownerDocument.getElementById(s.getAttribute("for")):null),u=o.c!==void 0?!!o.c:!0;if(Le(r||s,u),r&&r.checked!==u){try{let l=r._valueTracker;l&&l.setValue(!u)}catch{}try{Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"checked")?.set?.call(r,u)}catch{}r.checked=u,r.dispatchEvent(new Event("input",{bubbles:!0,composed:!0})),r.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))}}return}if(o.t==="val"){let n=null;if(a&&(n=a instanceof HTMLInputElement||a instanceof HTMLTextAreaElement||a.isContentEditable?a:a.querySelector('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]')),!n){let s=document.body;try{s=le()||document.body}catch{}let r=Array.from(s.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]')),u=H(e).toLowerCase();n=r.find(l=>{let d=(l.getAttribute("placeholder")||"").toLowerCase(),m=(l.name||"").toLowerCase(),c=(l.id||"").toLowerCase(),h=(l.getAttribute("aria-label")||"").toLowerCase();return d.includes(u)||m.includes(u)||c.includes(u)||h.includes(u)})||(r.length>0?r[0]:null)}if(n){let s=String(o.v??"");try{if(n.focus?.(),n.type!=="number"){try{n.select?.()}catch{}document.execCommand?.("insertText",!1,s)}}catch{}yt(n,s)}return}if(o.t==="sel"){if(!a&&e){let n=Array.from(document.querySelectorAll("select")),s=H(e).toLowerCase();a=n.find(r=>{let u=(r.name||"").toLowerCase(),l=(r.id||"").toLowerCase(),d=(r.getAttribute("aria-label")||"").toLowerCase();return u.includes(s)||l.includes(s)||d.includes(s)})||null}if(a){let n=Array.isArray(o.v)?o.v:[String(o.v)];At(a,n)}return}}function he(o){try{if(o.t==="val"){let e=o.v!==void 0?o.v:o.value!==void 0?o.value:o.val!==void 0?o.val:o.text,t=String(e??"").trim(),a=t,i=o.id!==void 0&&o.id!==null?String(o.id):"";i||(i=o.target??o.name??o.selector??"1");let n=F(i,a,!0)||F(H(i),a,!0);if(!n){let h=document.body;try{h=le()||document.body}catch{}let p=Array.from(h.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]')).filter(g=>j(g)&&!J(g));p.length>0&&(n=p[0])}if(!n)return!1;let s=n instanceof HTMLInputElement&&n.type==="radio"?n:n.querySelector('input[type="radio"]');if(s&&s.name){let h=document.querySelector(`input[type="radio"][name="${te(s.name)}"]:checked`);if(!h)return!1;let p=H(h.value).toLowerCase(),g=H(t).toLowerCase(),f=H(h.closest("label, .vf-label, .option-card, tr, td, div")?.textContent||"").toLowerCase();return p===g||f===g||f.includes(g)}let r=n instanceof HTMLInputElement||n instanceof HTMLTextAreaElement||n.isContentEditable?n:n.querySelector('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(!r){let p=n.closest('.form-group, .field, [class*="input" i], [class*="control" i], label, tr, td, li, p, div')?.querySelector('input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]), textarea, [contenteditable="true"]');p&&(r=p)}if(!r){let h=n.nextElementSibling;for(;h;){if(h instanceof HTMLInputElement&&!["hidden","button","submit","checkbox","radio"].includes(h.type)||h instanceof HTMLTextAreaElement||h instanceof HTMLElement&&h.isContentEditable){r=h;break}let p=h.querySelector('input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]');if(p){r=p;break}h=h.nextElementSibling}}if(r instanceof HTMLSelectElement){let h=H(t).toLowerCase();return Array.from(r.options).some(p=>{if(!p.selected)return!1;let g=p.value.toLowerCase(),f=H(p.textContent).toLowerCase();return h===g||h===f||g.includes(h)||f.includes(h)})}let u=(r instanceof HTMLInputElement||r instanceof HTMLTextAreaElement?r.value:r?.textContent??n.textContent??"").trim();if(!u&&!t)return!0;if(!u&&t)return!1;let l=u.replace(",",".").replace(/\s+/g,"").toLowerCase(),d=t.replace(",",".").replace(/\s+/g,"").toLowerCase(),m=parseFloat(l),c=parseFloat(d);return!isNaN(m)&&!isNaN(c)&&l.match(/^-?[\d.,]+$/)&&d.match(/^-?[\d.,]+$/)?Math.abs(m-c)<1e-4:l===d||u.toLowerCase()===t.toLowerCase()||d.length>=3&&l===d}if(o.t==="sel"){let e=F(o.id,void 0,!0)||F(H(o.id),void 0,!0);if(!e){let n=document.body;try{n=le()||document.body}catch{}let s=Array.from(n.querySelectorAll('select, [role="combobox"], [role="listbox"]')).filter(l=>j(l)&&!J(l)),r=H(o.id).toLowerCase();e=s.find(l=>{let d=(l.id||"").toLowerCase(),m=(l.getAttribute("name")||"").toLowerCase(),c=(l.getAttribute("aria-label")||"").toLowerCase(),h=H(l.closest('.dropdown-row, [class*="dropdown" i], [class*="select" i], tr, label, div')?.textContent||"").toLowerCase();return d.includes(r)||m.includes(r)||c.includes(r)||r.length>=2&&h.includes(r)})||(s.length===1?s[0]:null)}if(!e)return!1;let t=e instanceof HTMLSelectElement?e:e.querySelector("select");if(!t){let n=e.matches?.('[role="combobox"], [role="listbox"], [class*="select" i], [class*="dropdown" i]')?e:e.closest('[role="combobox"], [role="listbox"], [class*="select" i], [class*="dropdown" i]');if(n){let r=(Array.isArray(o.v)?o.v:[String(o.v)]).map(l=>H(l).toLowerCase()),u=H(n.textContent).toLowerCase();return r.some(l=>u.includes(l)||l.includes(u))}return!1}let i=(Array.isArray(o.v)?o.v:[String(o.v)]).map(n=>H(n).toLowerCase());return Array.from(t.options).some(n=>{if(!n.selected)return!1;let s=n.value.toLowerCase(),r=H(n.textContent).toLowerCase();return i.some(u=>u===s||u===r||s.includes(u)||r.includes(u))})}if(o.t==="chk"||o.t==="clk"){let e=o.v!==void 0?String(o.v).trim():"",t=String(o.name??o.n??"").trim();if(t&&!o.id){let c=Array.from(document.querySelectorAll(`input[name="${te(t)}"]`));if(c.length>0){let h=c.find(v=>v.checked);if(!h)return!1;if(!e)return!0;let p=h.value?.toLowerCase()??"",g=e.toLowerCase();if(p===g)return!0;let f=/^(v|verdadeiro|true|1|t|sim|correto)$/i.test(e),b=/^(f|falso|false|0|nao|não|incorreto|errado)$/i.test(e);return f?/^(v|verdadeiro|true|1|t|sim|correto)$/i.test(p):b?/^(f|falso|false|0|nao|não|incorreto|errado)$/i.test(p):!1}}let a=F(o.id,e)||F(H(o.id),e);if(!a&&t){let c=document.querySelector(`input[name="${te(t)}"]`);c&&(a=c)}if(!a)return!1;let i=a.closest('.option-card, label, .vf-label, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, li')||a,n=a instanceof HTMLInputElement&&["checkbox","radio"].includes(a.type)?a:i.querySelector('input[type="checkbox"], input[type="radio"]')||(i.getAttribute("for")?i.ownerDocument.getElementById(i.getAttribute("for")):null),s=o.t==="chk"||o.c!==void 0?!!o.c:!0;if(n&&n.type==="radio"){if(n.checked===s)return!0;if(o.v&&n.name){let c=H(String(o.v)).toLowerCase(),h=document.querySelector(`input[type="radio"][name="${te(n.name)}"]:checked`);if(!h)return!1;if(h===n)return!0;let p=H(h.value).toLowerCase(),g=H(h.closest("label, .vf-label, .option-card, tr, td, div")?.textContent||"").toLowerCase();return p===c||g.includes(c)||c.includes(p)}}if(n&&["checkbox","radio"].includes(n.type))return n.checked===s;let r=i.getAttribute("aria-checked")===String(s)||i.getAttribute("aria-selected")===String(s)||i.getAttribute("aria-pressed")===String(s),u=s?i.getAttribute("data-selected")==="true"||i.getAttribute("data-checked")==="true"||i.getAttribute("data-active")==="true"||i.getAttribute("data-state")==="checked"||i.getAttribute("data-state")==="on":i.getAttribute("data-selected")==="false"||i.getAttribute("data-checked")==="false"||i.getAttribute("data-state")==="unchecked",l=i.className||"",d=s?/\b(active|selected|checked|picked|is-selected|choice-selected|selected-option|is-checked|chosen|current)\b/i.test(l):!/\b(active|selected|checked|picked|is-selected|choice-selected|selected-option|is-checked|chosen|current)\b/i.test(l);if(r||u||d)return!0;let m=!!i.closest('[role="radiogroup"], [role="listbox"], .options, .choices, [class*="option" i], [class*="choice" i], [class*="answer" i], [class*="quiz" i]');return o.t==="clk"&&!n&&!m||i.getAttribute("aria-expanded")!==null||i.getAttribute("aria-pressed")!==null}if(o.t==="drag"){let e=me(o.from,"source")||F(o.from)||F(H(o.from)),t=me(o.to,"destination")||F(o.to)||F(H(o.to));return!e||!t?!1:Ca(e,t).success}}catch{}return!1}async function nt(o,e,t=1,a=Ne({engine:"smart",autoAdvance:e})){let i=o.actions.filter(A=>A.t!=="adv"),n=o.actions.filter(A=>A.t==="adv"),s=0,r=[],u=new Map,l=new Map,d=new Map,m=new Set,c=o.pageType==="question"||i.length>0,h=i.filter(A=>A.t==="chk"||A.t==="clk"&&A.c!==void 0),p=new Map;for(let A of i){let P=[];l.set(A,P);try{if(A.t==="drag"){P.push("declarative-A-F");try{let z=me(A.from,"source")||F(A.from),N=me(A.to,"destination")||F(A.to);z&&d.set(A,z.parentElement?.outerHTML?.slice(0,500)||""),N&&p.set(A,N.children.length)}catch{}}else P.push("declarative-primary");await Ta(A,t,a),s++,m.add(A)}catch(z){u.set(A,z instanceof Error?z.message:String(z)),console.warn("[EasyQuiz] A\xE7\xE3o declarativa prim\xE1ria falhou com seguran\xE7a:",A,z)}await new Promise(z=>setTimeout(z,A.t==="drag"?180:35))}if(c&&o.mode==="escolha_multipla"&&h.length>0){let A=document.body;try{A=le()||document.body}catch{}let P=Array.from(A.querySelectorAll('input[type="checkbox"], [role="checkbox"]')).filter(z=>j(z)&&!J(z));if(P.length>1){let N=function(k,E){if(k===E||k.contains(E)||E.contains(k))return!0;let L=k.closest('.option-card, label, [role="checkbox"], [role="option"], tr, li, [class*="option" i]'),R=E.closest('.option-card, label, [role="checkbox"], [role="option"], tr, li, [class*="option" i]');if(L&&R&&L===R)return!0;let Q=k.getAttribute("for")||k.id,V=E.getAttribute("for")||E.id;return!!(Q&&V&&Q===V)};var T=N;let z=new Set;for(let k of h){let E=k.t==="chk"?!!k.c:!!(k.c??!0),L="id"in k&&typeof k.id=="string"?k.id:"";if(E&&L){let R=F(L,k.v);if(R){z.add(R);let Q=R.querySelector('input[type="checkbox"]');Q&&z.add(Q);let V=R.closest('.option-card, label, [role="checkbox"], tr, li, [class*="option" i]');V&&(z.add(V),V.querySelectorAll('input[type="checkbox"]').forEach(Y=>z.add(Y)))}}}if(z.size>=h.length&&z.size>0){let k=Array.from(z);for(let E of P)k.some(R=>N(R,E))||(E instanceof HTMLInputElement&&E.checked||E.getAttribute("aria-checked")==="true"||E.closest(".option-card, label")?.classList.contains("selected"))&&Le(E,!1)}}}await new Promise(A=>setTimeout(A,i.length>0?100:25));let g=0;for(let A of i){if(he(A)){g++;continue}console.warn(`[EasyQuiz Auto-Cura] A\xE7\xE3o '${A.t}' no alvo '${A.id||A.from||""}' n\xE3o verificada no DOM. Disparando Passagem 2 de conting\xEAncia...`);try{Xt(A,a),l.get(A)?.push("alternative-path"),await Et(A)}catch(P){u.set(A,P instanceof Error?P.message:String(P)),console.warn("[EasyQuiz Auto-Cura] Rota alternativa falhou:",P)}await new Promise(P=>setTimeout(P,250)),he(A)&&(console.log("[EasyQuiz Auto-Cura] \u2713 A\xE7\xE3o recuperada com sucesso pela rota de conting\xEAncia!"),g++,m.has(A)?u.has(A)&&u.delete(A):(u.delete(A),s++,m.add(A)))}if(g<i.length&&i.length>0){console.warn(`[EasyQuiz Auto-Cura] ${i.length-g} de ${i.length} a\xE7\xE3o(\xF5es) ainda n\xE3o verificadas. Disparando Passagem 3 final...`),await new Promise(A=>setTimeout(A,200));for(let A of i)if(!he(A))try{if(await Et(A),await new Promise(P=>setTimeout(P,80)),!he(A)&&(A.t==="clk"||A.t==="chk"))try{let P="id"in A?String(A.id||""):"",z=A.v!==void 0?String(A.v).trim():"",N=F(P,z)||F(H(P),z);N&&(_t(N),await new Promise(k=>setTimeout(k,120)))}catch{}}catch(P){u.set(A,P instanceof Error?P.message:String(P))}await new Promise(A=>setTimeout(A,200)),g=0;for(let A of i)he(A)&&(g++,m.has(A)?u.has(A)&&u.delete(A):(u.delete(A),s++,m.add(A)))}let f=[];for(let[A,P]of i.entries())if(!he(P)){let z=P.t==="drag"?`${P.from} -> ${P.to}`:"id"in P&&P.id?P.id:P.t;r.push(z),f.push({actionIndex:A,action:P,strategiesAttempted:l.get(P)||[],evidence:u.get(P)||"sem evid\xEAncia de aplica\xE7\xE3o no DOM",domSnapshot:d.get(P)}),P.t==="drag"&&console.warn(`[EasyQuiz Drag] FALHA CONFIRMADA: "${P.from}" -> "${P.to}"`,`
  Estrat\xE9gias: ${(l.get(P)||[]).join(", ")}`,`
  Snapshot DOM: ${d.get(P)?.slice(0,200)||"n/a"}`)}c&&i.length===0&&r.push("nenhuma a\xE7\xE3o de resposta prescrita");let b=i.map((A,P)=>{let z=A.t==="drag"?`${A.from} -> ${A.to}`:A.t==="js"?"$eq":A.id||A.t,N=A.t==="js"?!0:A.t==="drag"?!!(me(A.from,"source")&&me(A.to,"destination")):!!(F(A.id||"")||F(H(A.id||""))),k=he(A);return{index:P,action:A,target:z,located:N,applied:!u.has(A),verified:k,strategy:A.t==="drag"?"drag-adaptive":A.t==="js"?"javascript":"declarative-dom",evidence:k?"estado do controle confirmado no DOM":"nenhuma evid\xEAncia suficiente ap\xF3s as tentativas",...u.has(A)?{error:u.get(A)}:{}}}),v=c?i.length>0&&r.length===0&&(g===i.length||s===i.length&&g>0):!0,y=!1,x=!1,w="Nenhuma a\xE7\xE3o de navega\xE7\xE3o solicitada.",q=c?g>0&&g>=Math.ceil(i.length/2):s>0&&s>=i.length/2,S=c?g>0&&(v||q):v||i.length===0||q;if(e&&S){await new Promise(z=>setTimeout(z,i.length>0?120:40));let A=!1,P=null;if(o.pageType!=="info"){let z=Sa();if(z&&j(z)){await Zt(z,1200),se(z),A=!0,P=z,await new Promise(E=>setTimeout(E,350));let N=document.querySelector('.feedback-message.error, [class*="feedback"][class*="error" i], [role="alert"][class*="error" i]');N&&j(N)&&(N.textContent||"").trim().length>0?(y=!1,x=!1,w=`Aviso do formul\xE1rio ap\xF3s checagem: ${N.textContent?.trim().slice(0,100)}`):(y=!0,x=!0,w="Resposta confirmada via bot\xE3o de verifica\xE7\xE3o/envio.")}}if(!A){let z=La(),N=n.length>0&&"id"in n[0]?n[0].id:void 0,k=qt(N);if(k){await Zt(k,1500);let E=N||k.textContent?.trim()||"";E&&Dt(window.location.hostname,{advanceSelector:E}),se(k);let L=await Ma(z,1800);x=L.changed,w=L.evidence,y=L.changed||!0,L.changed||console.warn("[EasyQuiz] O bot\xE3o de avan\xE7o foi acionado, mas a navega\xE7\xE3o ainda n\xE3o concluiu.")}else console.warn("[EasyQuiz] Nenhum bot\xE3o de avan\xE7o encontrado na p\xE1gina.")}}return{applied:s,verified:g,success:v,advanced:y,failed:r,reports:b,navigationVerified:x,navigationEvidence:w,failedActions:f}}var xe=null,Be=[],eo=[],it=[],to=[],ye=null,ge=null,Ro=40,Ia=`
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
`;function No(){try{if(typeof document>"u"||!document.head)return;if(!document.getElementById("eq-image-pulse-style")){let o=document.createElement("style");o.id="eq-image-pulse-style",o.textContent=Ia,document.head.appendChild(o)}}catch{}}function Me(){xe&&(xe.style.removeProperty("outline"),xe.style.removeProperty("outline-offset"),xe.style.removeProperty("position"),xe=null);for(let o of Be)o.style.removeProperty("outline"),o.style.removeProperty("outline-offset"),o.style.removeProperty("background-color"),o.style.removeProperty("box-shadow"),o.removeAttribute("data-easyquiz-highlight");Be=[];for(let o of eo)o.style.removeProperty("animation"),o.style.removeProperty("outline"),o.style.removeProperty("outline-offset"),o.style.removeProperty("box-shadow"),o.style.removeProperty("filter"),o.removeAttribute("data-easyquiz-image-highlight");eo=[];for(let o of it)try{o.remove()}catch{}it=[],ge&&typeof window<"u"&&(window.removeEventListener("scroll",ge),window.removeEventListener("resize",ge),ge=null);for(let o of to)try{o.remove()}catch{}if(to=[],ye){try{ye.remove()}catch{}ye=null}try{document.querySelectorAll("[data-easyquiz-image-frame]").forEach(o=>{try{o.remove()}catch{}}),document.querySelectorAll("[data-easyquiz-capture-badge]").forEach(o=>{try{o.remove()}catch{}}),document.querySelectorAll("[data-easyquiz-image-highlight]").forEach(o=>{try{let e=o;e.style.removeProperty("animation"),e.style.removeProperty("outline"),e.style.removeProperty("outline-offset"),e.style.removeProperty("box-shadow"),e.style.removeProperty("filter"),e.removeAttribute("data-easyquiz-image-highlight")}catch{}})}catch{}}function oo(o){No();let e=[];for(let t of o){if(!t||typeof t.setAttribute!="function")continue;let a=t;try{let i=t.getBoundingClientRect(),n=i.width||a.offsetWidth||0,s=i.height||a.offsetHeight||0;if(n>=Ro&&s>=Ro){try{a.style&&(a.style.outline="3px solid #ffd600",a.style.outlineOffset="4px",a.style.animation="eq-image-pulse-yellow-white 1.2s ease-in-out infinite",a.style.boxShadow="0 0 16px rgba(255, 214, 0, 0.7)",a.style.filter="drop-shadow(0 0 8px rgba(255, 214, 0, 0.8))"),a.setAttribute("data-easyquiz-image-highlight","true"),eo.push(a)}catch{}let r=document.createElement("div");r.setAttribute("data-easyquiz-image-frame","true"),r.style.cssText=`
          position: absolute;
          top: ${i.top+window.scrollY-3}px;
          left: ${i.left+window.scrollX-3}px;
          width: ${n+6}px;
          height: ${s+6}px;
          border: 3px solid #ffd600;
          border-radius: 8px;
          pointer-events: none;
          z-index: 2147483640;
          box-sizing: border-box;
          animation: eq-image-pulse-yellow-white 1.2s ease-in-out infinite;
          box-shadow: 0 0 16px rgba(255, 214, 0, 0.95), 0 0 32px rgba(255, 214, 0, 0.5), inset 0 0 12px rgba(255, 214, 0, 0.25);
        `;let u=document.createElement("div");u.setAttribute("data-easyquiz-capture-badge","true"),u.textContent="\u{1F4F7} Imagem / Gr\xE1fico Analisado pela IA",u.style.cssText=`
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
        `,r.appendChild(u),document.body.appendChild(r),it.push(r),to.push(u),e.push({element:t,frame:r})}}catch{}}e.length>0&&!ge&&typeof window<"u"&&(ge=()=>{for(let t=e.length-1;t>=0;t--){let a=e[t];try{if(!document.contains(a.element)){try{a.frame.remove()}catch{}let n=it.indexOf(a.frame);n!==-1&&it.splice(n,1),e.splice(t,1);continue}let i=a.element.getBoundingClientRect();i.width>0&&i.height>0?(a.frame.style.top=`${i.top+window.scrollY-3}px`,a.frame.style.left=`${i.left+window.scrollX-3}px`,a.frame.style.width=`${i.width+6}px`,a.frame.style.height=`${i.height+6}px`):a.frame.style.display="none"}catch{}}e.length===0&&ge&&(window.removeEventListener("scroll",ge),window.removeEventListener("resize",ge),ge=null)},window.addEventListener("scroll",ge,{passive:!0}),window.addEventListener("resize",ge,{passive:!0}))}function st(o){xe&&xe!==o&&(xe.style.removeProperty("outline"),xe.style.removeProperty("outline-offset")),No(),xe=o,o.style.outline="2px solid #00e5ff",o.style.outlineOffset="4px";try{if(ye){try{ye.remove()}catch{}ye=null}window.getComputedStyle(o).position==="static"&&(o.style.position="relative");let t=document.createElement("div");t.style.cssText=`
      position: absolute; left: 0; right: 0; top: 0; height: 3px;
      background: linear-gradient(90deg, transparent, #00e5ff, #00ff88, #00e5ff, transparent);
      z-index: 99998; pointer-events: none; border-radius: 2px;
      animation: eq-scope-scan-loop 1.4s ease-in-out infinite;
      box-shadow: 0 0 14px rgba(0, 229, 255, 0.85), 0 0 6px #00ff88;
    `,o.appendChild(t),ye=t}catch{}}function Ha(o){return!o||o>=.9?{outline:"#00ff88",bg:"rgba(0, 255, 136, 0.12)",glow:"rgba(0, 255, 136, 0.8)"}:o>=.7?{outline:"#00bfff",bg:"rgba(0, 191, 255, 0.10)",glow:"rgba(0, 191, 255, 0.7)"}:{outline:"#ffaa00",bg:"rgba(255, 170, 0, 0.10)",glow:"rgba(255, 170, 0, 0.7)"}}function Bo(o,e){if(ye){try{ye.remove()}catch{}ye=null}let t=Ha(e);for(let a of o){if(a.t==="adv"||a.t==="js")continue;if(a.t==="drag"){try{let h=F(a.from),p=F(a.to);h&&(h.style.outline=`2px solid ${t.outline}`,Be.push(h)),p&&(p.style.outline="2px dashed #00e5ff",Be.push(p))}catch{}continue}let i=a.v!==void 0?Array.isArray(a.v)?a.v[0]:String(a.v):"",n=String(a.name??a.n??"").trim(),s=null;if(n){let h=Array.from(document.querySelectorAll(`input[name="${te(n)}"]`));if(i&&(s=h.find(p=>p.value?.toLowerCase()===i.toLowerCase())??null,!s)){let p=/^(v|verdadeiro|true|1|t|sim|correto)$/i.test(i),g=/^(f|falso|false|0|nao|não|incorreto|errado)$/i.test(i);if(p||g){let f=p?["v","verdadeiro","true","1","t","sim","correto"]:["f","falso","false","0","nao","n\xE3o","incorreto","errado"];s=h.find(b=>{let v=b.value?.toLowerCase()??"";if(f.includes(v))return!0;let x=(b.closest('label, .vf-label, td, [class*="option" i]')?.textContent??"").trim().toLowerCase();return f.some(w=>x===w||x.startsWith(w+" ")||x.startsWith("("+w+")"))})??null}}!s&&h.length>0&&(s=h[0])}if(!s&&a.id&&(s=F(a.id,i,a.t==="val"||a.t==="sel")||F(H(a.id),i,a.t==="val"||a.t==="sel")),!s&&a.t==="sel"){let h=document.body;try{h=le()||document.body}catch{}let p=Array.from(h.querySelectorAll('select, [role="combobox"], [role="listbox"]')).filter(b=>j(b)&&!ue(b)),g=H(a.id).toLowerCase();s=p.find(b=>{let v=(b.id||"").toLowerCase(),y=(b.getAttribute("name")||"").toLowerCase(),x=(b.getAttribute("aria-label")||"").toLowerCase(),w=H(b.closest('.dropdown-row, [class*="dropdown" i], [class*="select" i], tr, label, div')?.textContent||"").toLowerCase();return v.includes(g)||y.includes(g)||x.includes(g)||g.length>=2&&w.includes(g)})||(p.length===1?p[0]:null)}if(!s)continue;let r=typeof HTMLSelectElement<"u"&&s instanceof HTMLSelectElement||s.tagName?.toLowerCase()==="select"||s.getAttribute("role")==="combobox"||s.getAttribute("role")==="listbox",u=s.closest('label, .vf-label, .option-card, [role="radio"], [role="checkbox"], [role="option"], [role="listitem"], .answer, .quiz-option, .form-check, [class*="option" i], [class*="choice" i]'),l=r?s.parentElement?.closest('.dropdown-row, [class*="dropdown" i], [class*="select-row" i], .form-group, tr, li'):null,d=u||l||s;d.style.outline=`2px solid ${t.outline}`,d.style.outlineOffset="2px",d.style.backgroundColor=t.bg,d.setAttribute("data-easyquiz-highlight","true"),Be.push(d);let m=r?s:d.querySelector('select, [role="combobox"], [role="listbox"]');m&&(m.style.outline=`2px solid ${t.outline}`,m.style.outlineOffset="2px",m.style.boxShadow=`0 0 10px ${t.glow}`,m.setAttribute("data-easyquiz-highlight","true"),Be.push(m));let c=s instanceof HTMLInputElement&&["checkbox","radio"].includes(s.type)?s:d.querySelector('input[type="checkbox"], input[type="radio"]');c&&c!==d&&(c.style.outline=`2px solid ${t.outline}`,c.style.outlineOffset="2px",c.style.boxShadow=`0 0 10px ${t.glow}`,c.setAttribute("data-easyquiz-highlight","true"),Be.push(c))}}var Ct=10,Pa=1400,rt=15e5;function we(o){return new Promise((e,t)=>{let a=new FileReader;a.onerror=()=>t(new Error("Falha ao converter blob para base64.")),a.onload=()=>{let i=String(a.result||"");e(i.split(",")[1]||"")},a.readAsDataURL(o)})}function jo(o){try{let e=o.getContext("2d");if(!e)return!0;let t=o.width,a=o.height;if(t<=0||a<=0)return!0;let i=Math.min(40,Math.floor(t/3),Math.floor(a/3));if(i<=0)return!0;let n=[[0,0],[Math.floor(t/2)-Math.floor(i/2),Math.floor(a/2)-Math.floor(i/2)],[Math.floor(t/3),Math.floor(a*2/3)]],s=0,r=0,u=-1,l=-1,d=-1;for(let[m,c]of n){let h=Math.max(0,Math.min(m,t-i)),p=Math.max(0,Math.min(c,a-i)),g=e.getImageData(h,p,i,i).data;for(let f=0;f<g.length;f+=4){s++;let b=g[f],v=g[f+1],y=g[f+2];if(g[f+3]===0){r++;continue}u===-1&&(u=b,l=v,d=y),Math.abs(b-u)<8&&Math.abs(v-l)<8&&Math.abs(y-d)<8&&r++}}return s>0&&r/s>.97}catch{return!1}}function Qo(o){try{let e=o.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);if(e){let[t,a,i]=[parseInt(e[1]),parseInt(e[2]),parseInt(e[3])];if((.299*t+.587*a+.114*i)/255<.15)return"#ffffff"}if(o==="transparent"||o==="rgba(0, 0, 0, 0)")return"#ffffff"}catch{}return o}async function Ie(o){let e=0,t=0;if(o instanceof HTMLImageElement?(e=o.naturalWidth||o.width,t=o.naturalHeight||o.height):(e=o.width,t=o.height),e<=0||t<=0)throw new Error("Dimens\xF5es inv\xE1lidas.");let a=Math.min(1,Pa/Math.max(e,t)),i=Math.max(1,Math.round(e*a)),n=Math.max(1,Math.round(t*a)),s=document.createElement("canvas");s.width=i,s.height=n;let r=s.getContext("2d",{alpha:!1});if(!r)throw new Error("Sem suporte a Canvas 2D.");return r.fillStyle="#ffffff",r.fillRect(0,0,i,n),r.drawImage(o,0,0,i,n),new Promise((u,l)=>{s.toBlob(d=>d?u(d):l(new Error("Falha na compress\xE3o.")),"image/jpeg",.88)})}async function Fo(o){let e=typeof o.getBoundingClientRect=="function"?o.getBoundingClientRect():{width:0,height:0},t=e.width||parseFloat(o.getAttribute("width")||"0")||parseFloat(o.style.width||"0")||400,a=e.height||parseFloat(o.getAttribute("height")||"0")||parseFloat(o.style.height||"0")||300,i=2,n=Math.min(1800,Math.max(120,Math.round(t*i))),s=Math.min(1800,Math.max(100,Math.round(a*i))),r=o.cloneNode(!0);r.getAttribute("xmlns")||r.setAttribute("xmlns","http://www.w3.org/2000/svg"),r.getAttribute("xmlns:xlink")||r.setAttribute("xmlns:xlink","http://www.w3.org/1999/xlink"),r.setAttribute("width",String(n)),r.setAttribute("height",String(s)),!r.getAttribute("viewBox")&&t>0&&a>0&&r.setAttribute("viewBox",`0 0 ${t} ${a}`);try{let c=[o,...Array.from(o.querySelectorAll("*"))],h=[r,...Array.from(r.querySelectorAll("*"))];for(let p=0;p<Math.min(c.length,h.length);p++){let g=c[p],f=h[p];if(!g||!f||!f.style)continue;let b=window.getComputedStyle?window.getComputedStyle(g):null;b&&["fill","stroke","stroke-width","stroke-dasharray","stroke-linecap","stroke-linejoin","opacity","font-family","font-size","font-weight","color","transform","display","visibility"].forEach(y=>{let x=b.getPropertyValue(y);x&&x!=="none"&&x!=="normal"&&x!=="auto"&&f.style.setProperty(y,x,"important")})}}catch{}let u="#ffffff";try{let c=o.parentElement||o;for(;c&&c!==document.documentElement;){let p=(window.getComputedStyle?window.getComputedStyle(c):null)?.backgroundColor;if(p&&p!=="transparent"&&p!=="rgba(0, 0, 0, 0)"){u=p;break}c=c.parentElement}}catch{}u=Qo(u),r.getAttribute("xmlns")||r.setAttribute("xmlns","http://www.w3.org/2000/svg");let d=new XMLSerializer().serializeToString(r),m="";try{m=btoa(unescape(encodeURIComponent(d)))}catch{}try{let c=f=>new Promise((b,v)=>{let y=new Image,x=setTimeout(()=>v(new Error("Timeout render SVG")),1200);y.onload=()=>{clearTimeout(x),b(y)},y.onerror=()=>{clearTimeout(x),v(new Error("Falha ao renderizar SVG em Image."))},y.src=f}),h=null;if(m)try{h=await c(`data:image/svg+xml;base64,${m}`)}catch{}if(!h){let f=new Blob([d],{type:"image/svg+xml;charset=utf-8"}),b=URL.createObjectURL(f);try{h=await c(b)}finally{URL.revokeObjectURL(b)}}let p=document.createElement("canvas");p.width=n,p.height=s;let g=p.getContext("2d",{alpha:!1});if(g&&h){if(g.fillStyle="#ffffff",g.fillRect(0,0,n,s),g.drawImage(h,0,0,n,s),jo(p))return{base64:m,mediaType:"image/svg+xml"};let f=await new Promise(b=>{p.toBlob(b,"image/jpeg",.92)});if(f){let b=await we(f);if(b)return{blob:f,base64:b,mediaType:"image/jpeg"}}}}catch{}return{base64:m,mediaType:"image/svg+xml"}}async function kt(o){try{let e=o.getBoundingClientRect(),t=Math.round(e.width)||o.offsetWidth||400,a=Math.round(e.height)||o.offsetHeight||300;if(t<30||a<30)return null;let i=o.tagName.toLowerCase()==="svg"?o:o.querySelector("svg");if(i&&o.querySelectorAll("input, select, textarea").length===0)try{let g=await Fo(i);if(g.base64&&g.base64.length<=rt)return{mediaType:g.mediaType,base64:g.base64,alt:o.getAttribute("aria-label")||i.getAttribute("aria-label")||"Captura de diagrama/gr\xE1fico",source:"visual_snapshot",captureStatus:"captured",textContext:Ae(i)}}catch{}if(o instanceof HTMLCanvasElement)try{let g=await Ie(o),f=await we(g);if(f)return{mediaType:"image/jpeg",base64:f,alt:o.getAttribute("aria-label")||"Captura de canvas visual",source:"canvas_snapshot",captureStatus:"captured"}}catch{}let n="#ffffff";try{let g=o;for(;g&&g!==document.documentElement;){let b=(window.getComputedStyle?window.getComputedStyle(g):null)?.backgroundColor;if(b&&b!=="transparent"&&b!=="rgba(0, 0, 0, 0)"){n=b;break}g=g.parentElement}}catch{}n=Qo(n);let s=o.cloneNode(!0),r=Array.from(o.querySelectorAll("*")),u=Array.from(s.querySelectorAll("*"));for(let g=0;g<Math.min(r.length,u.length);g++){let f=r[g],b=u[g];if(!(!f||!b||!b.style))try{let v=window.getComputedStyle(f);b.style.color=v.color,b.style.backgroundColor=v.backgroundColor,b.style.borderColor=v.borderColor,b.style.borderWidth=v.borderWidth,b.style.borderStyle=v.borderStyle,b.style.fontSize=v.fontSize,b.style.fontFamily=v.fontFamily,b.style.fontWeight=v.fontWeight,b.style.lineHeight=v.lineHeight,b.style.letterSpacing=v.letterSpacing,b.style.textAlign=v.textAlign}catch{}}let l=Math.min(2,Math.max(1,1200/Math.max(t,a))),d=Math.round(t*l),m=Math.round(a*l),c=`
      <svg xmlns="http://www.w3.org/2000/svg" width="${d}" height="${m}" viewBox="0 0 ${t} ${a}">
        <foreignObject width="${t}" height="${a}">
          <div xmlns="http://www.w3.org/1999/xhtml" style="background:${n};width:100%;height:100%;overflow:hidden;box-sizing:border-box;">
            ${s.outerHTML}
          </div>
        </foreignObject>
      </svg>
    `,h=new Blob([c],{type:"image/svg+xml;charset=utf-8"}),p=URL.createObjectURL(h);try{let g=new Image;await new Promise((v,y)=>{let x=setTimeout(()=>y(new Error("Timeout render ForeignObject")),2500);g.onload=()=>{clearTimeout(x),v()},g.onerror=()=>{clearTimeout(x),y(new Error("Falha ao carregar ForeignObject"))},g.src=p});let f=document.createElement("canvas");f.width=d,f.height=m;let b=f.getContext("2d",{alpha:!1});if(b){if(b.fillStyle=n,b.fillRect(0,0,d,m),b.drawImage(g,0,0,d,m),jo(f))throw new Error("ForeignObject gerou canvas em branco");let v=await new Promise(y=>f.toBlob(y,"image/jpeg",.9));if(v){let y=await we(v);if(y&&y.length<=rt)return{mediaType:"image/jpeg",base64:y,alt:o.getAttribute("aria-label")||"Captura visual da \xE1rea (print-like)",source:"element_snapshot",captureStatus:"captured",textContext:Ae(o)}}}}finally{URL.revokeObjectURL(p)}}catch(e){console.warn("[EasyQuiz] Snapshot visual do n\xF3:",e)}return null}function Tt(o,e,t,a){if(t<=0||a<=0){let h=typeof o.getBoundingClientRect=="function"?o.getBoundingClientRect():{width:0,height:0};if(t=h.width||t,a=h.height||a,t<=0||a<=0){if(e&&/\b(icon|logo|avatar|badge|emoji|spinner|loading)\b/i.test(e))return!1;let g=o instanceof HTMLImageElement&&o.src||"";return g&&/\/icons?\/|\/logos?\/|\/avatars?\/|\/badges?\//i.test(g)?!1:!!(g||e)}}if(t<48||a<48||Math.max(t,a)/Math.max(1,Math.min(t,a))>15)return!1;let n=o.getAttribute("class")||"",s=o.getAttribute("aria-hidden"),r=o.getAttribute("role"),u=o instanceof HTMLImageElement&&o.src||"",l=!!o.closest('.perseus-renderer, .framework-perseus, [data-test-id*="exercise" i], [data-testid*="exercise" i], .perseus-widget-container, [class*="problem" i], [class*="exercise" i], [data-question], [class*="question-content" i], [class*="stimulus" i], [class*="enunciado" i], [class*="statement" i], figure, .problem, .exercise');if(l&&t>=60&&a>=60)return!0;if(s==="true"&&!l||(r==="presentation"||r==="none")&&!l)return!1;let d=/\b(icon|logo|avatar|badge|emoji|decoration|ornament|spinner|loading|thumbnail|profile|photo)\b/i;if(d.test(n)||e&&d.test(e)||u&&/\/icons?\/|\/logos?\/|\/avatars?\/|\/badges?\/|\/emojis?\//i.test(u)||(e===""||e===" "||e==="-")&&!l)return!1;let m=/\b(graph|chart|diagram|table|map|formula|equation|figure|plot|curve|histogram|scatter|matrix|image|foto|imagem|gráfico|tabela|mapa|fórmula|questão|enunciado|stimulus)\b/i;if(m.test(e)||m.test(n)||o.closest('[data-question], [class*="question" i], [class*="prompt" i], [class*="stimulus" i], [class*="enunciado" i], [class*="statement" i], article, .problem, .exercise'))return!0;try{let h=o.parentElement;if(h){let p=(h.textContent||"").toLowerCase();if(/\?|calcul|determin|observ|analis|image|figur|gráfic|diagram/i.test(p)&&t>=60&&a>=60)return!0}}catch{}return t>=80&&a>=80}function Ae(o){let e=[],t=o.getAttribute("alt")||o.getAttribute("aria-label")||o.getAttribute("title")||"";t&&t.length>2&&e.push(`Alt: "${t}"`);let n=o.closest("figure")?.querySelector("figcaption")?.textContent?.trim();n&&n.length>2&&e.push(`Legenda: "${n}"`);let s=o.getAttribute("aria-describedby");if(s){let d=document.getElementById(s)?.textContent?.trim();d&&e.push(`Descri\xE7\xE3o: "${d.slice(0,200)}"`)}let r=o.parentElement;if(r){let l=$(r.textContent||"",300);l&&l.length>5&&l!==t&&e.push(`Contexto: "${l.slice(0,200)}"`)}if(o.tagName.toLowerCase()==="svg"){let l=Array.from(o.querySelectorAll("text, tspan")).map(d=>d.textContent?.trim()).filter(Boolean);l.length>0&&e.push(`R\xF3tulos/Textos do Gr\xE1fico: "${l.join(" | ")}"`)}let u=o.getAttribute("data-alt")||o.getAttribute("data-description")||"";return u&&e.push(`Data: "${u}"`),e.length===0?"":e.join(" | ")}async function za(o){let e=o.currentSrc||o.src;if(!e)return null;let t=(o.alt||o.getAttribute("aria-label")||"Imagem da quest\xE3o").slice(0,500),a=o.getBoundingClientRect(),i=o.naturalWidth||a.width||o.width||0,n=o.naturalHeight||a.height||o.height||0,s=Tt(o,t,i,n);if(o.complete&&o.naturalWidth>0)try{let d=await Ie(o),m=await we(d);if(m&&m.length<=rt)return{mediaType:"image/jpeg",base64:m,alt:t,source:e.slice(0,2e3),captureStatus:"captured",textContext:Ae(o)}}catch{}try{let d=await fetch(e,{mode:"cors"});if(d.ok){let m=await d.blob();if(m.type.startsWith("image/")){let c=await createImageBitmap(m),h=await Ie(c);c.close();let p=await we(h);if(p&&p.length<=rt)return{mediaType:"image/jpeg",base64:p,alt:t,source:e.slice(0,2e3),captureStatus:"captured",textContext:Ae(o)}}}}catch{}if(e.startsWith("http")){let d=encodeURIComponent(e),m=[`https://corsproxy.io/?${d}`,`https://api.allorigins.win/raw?url=${d}`,`https://api.codetabs.com/v1/proxy?quest=${d}`],c=async h=>{let p=new AbortController,g=setTimeout(()=>p.abort(),800);try{let f=await fetch(h,{signal:p.signal});if(clearTimeout(g),f.ok)return f;throw new Error("Proxy status "+f.status)}catch(f){throw clearTimeout(g),f}};try{let p=await(await Promise.any(m.map(c))).blob();if(p.type.startsWith("image/")||p.size>200){let g=await createImageBitmap(p),f=await Ie(g);g.close();let b=await we(f);if(b&&b.length<=rt)return{mediaType:"image/jpeg",base64:b,alt:t,source:e.slice(0,2e3),captureStatus:"captured",textContext:Ae(o)}}}catch{}}let r=o.parentElement||o,u=await kt(r);if(u)return u;let l=Ae(o);return l||t?{mediaType:"image/jpeg",base64:"",alt:t,source:e.slice(0,2e3),captureStatus:s?"failed_relevant":"text_only",textContext:l||`Imagem da quest\xE3o (src: ${e.slice(0,100)})`}:s&&e?{mediaType:"image/jpeg",base64:"",alt:t||"Imagem relevante n\xE3o capturada",source:e.slice(0,2e3),captureStatus:"failed_relevant",textContext:`IMAGEM RELEVANTE N\xC3O CAPTURADA. Src: ${e.slice(0,200)}. ${Ae(o)}`}:null}function Oa(o){return o.querySelectorAll("path, line, polyline, polygon, circle, rect, text, image").length>0}function Da(o){try{let e=o.style.backgroundImage||(window.getComputedStyle?window.getComputedStyle(o).backgroundImage:"");if(e&&e.includes("url(")){let t=e.match(/url\(["']?([^"')]+)["']?\)/);if(t&&t[1]&&!t[1].startsWith("data:image/svg+xml"))return t[1]}}catch{}return null}function Ra(o,e){let t=o.closest('[data-easyquiz-id], button, [role="button"], [role="radio"], [role="checkbox"], [role="option"], label, .option-card, .quiz-option, .choice, .answer, [class*="option" i], [class*="choice" i], [class*="answer" i], li, tr');if(t&&t!==e&&j(t)&&!re(t)&&!_(t)){let n=t.dataset.easyquizId||t.id||void 0,s=$(t.innerText||t.textContent||"",120),r=t.getAttribute("aria-label")||t.getAttribute("title")||"",u="";try{let m=Array.from(e.querySelectorAll('[data-easyquiz-id], [role="radio"], [role="checkbox"], [role="option"], .option-card, .quiz-option, .choice, .answer, [class*="option" i], [class*="choice" i]')).filter(h=>j(h)&&!re(h)),c=m.indexOf(t);c>=0&&(u=` (op\xE7\xE3o ${c+1} de ${m.length})`)}catch{}let l=s||r,d=n?` [id: ${n}]`:"";if(l)return{associatedLabel:`Alternativa/Op\xE7\xE3o: "${l}"${d}${u}`,targetControlId:n};if(n)return{associatedLabel:`Alternativa/Op\xE7\xE3o${d}${u}`,targetControlId:n};if(u)return{associatedLabel:`Imagem da Alternativa${u}`,targetControlId:n}}let a=o.closest("figure")?.querySelector("figcaption")?.textContent?.trim();if(a)return{associatedLabel:`Figura do Enunciado: "${$(a,100)}"`};let i=o.closest('[class*="prompt" i], [class*="stimulus" i], [class*="question-text" i], [class*="statement" i], header, h1, h2, h3, h4, p');if(i){let n=$(i.textContent||"",80);if(n)return{associatedLabel:`Gr\xE1fico do Enunciado: "${n}"`}}try{let n=Array.from(e.querySelectorAll('img, svg, canvas, [style*="background-image"]')).filter(s=>j(s));if(n.length>1){let s=n.indexOf(o);if(s>=0)return{associatedLabel:`Imagem ${s+1} de ${n.length} do Enunciado`}}}catch{}return{associatedLabel:"Gr\xE1fico/Imagem do Enunciado Principal"}}async function ao(o,e=!0){if(!e)return[];let t=[],a=0,i=35e5,n=(l,d)=>{if(!l)return!1;let m=l.base64?l.base64.length:0;if(m>0&&a+m>i)return!1;let c=Ra(d,o);return l.associatedLabel=c.associatedLabel,l.targetControlId=c.targetControlId,l.element=d,t.push(l),a+=m,t.filter(p=>p.captureStatus==="captured").length>=Ct},s=[o],r=new Set;for(let l of s){let d=Array.from(l.querySelectorAll("img")).filter(m=>j(m)&&!_(m)&&!r.has(m)&&!m.closest('footer, nav, aside, [class*="sidebar" i], [class*="lesson" i]'));for(let m of d){r.add(m);try{let c=m.getBoundingClientRect(),h=m.naturalWidth||c.width||m.width||0,p=m.naturalHeight||c.height||m.height||0,g=m.alt||"";if(!Tt(m,g,h,p))continue;let f=await za(m);if(n(f,m))return t}catch{}}}let u=new Set;for(let l of s){let d=Array.from(l.querySelectorAll("svg")).filter(m=>{if(m.closest(".katex")||m.classList.contains("katex-mathml")||m.closest('footer, nav, aside, [class*="sidebar" i], [class*="lesson" i]')||!j(m)||_(m)||u.has(m))return!1;let c=typeof m.getBoundingClientRect=="function"?m.getBoundingClientRect():{width:0,height:0},h=c.width||parseFloat(m.getAttribute("width")||"0"),p=c.height||parseFloat(m.getAttribute("height")||"0");return h<30||p<30?!1:Oa(m)});for(let m of d){u.add(m);try{let c=await Fo(m);if(c.base64){let h=Ae(m),p={mediaType:c.mediaType,base64:c.base64,alt:m.getAttribute("aria-label")||"Gr\xE1fico/Diagrama vetorial da quest\xE3o",source:"svg",captureStatus:"captured",textContext:h};if(n(p,m))return t}}catch{let c=m.closest('.trig-diagram-container, [class*="diagram" i], [class*="graph" i], figure')||m.parentElement||m,h=await kt(c);if(h){if(n(h,m))return t}else{let p=Ae(m);if(p){let g={mediaType:"image/jpeg",base64:"",alt:m.getAttribute("aria-label")||"Gr\xE1fico vetorial",source:"svg",captureStatus:"text_only",textContext:p};n(g,m)}}}}}if(t.filter(l=>l.captureStatus==="captured").length<Ct){let l=Array.from(o.querySelectorAll("canvas")).filter(d=>j(d)&&!_(d));for(let d of l)try{let m=await Ie(d),c=await we(m);if(c){let h={mediaType:"image/jpeg",base64:c,alt:d.getAttribute("aria-label")||"Gr\xE1fico Canvas inline",source:"canvas",captureStatus:"captured"};if(n(h,d))return t}}catch{let m=await kt(d.parentElement||d);if(n(m,d))return t}}if(t.filter(l=>l.captureStatus==="captured").length<Ct){let l=Array.from(o.querySelectorAll('[style*="background-image"], .option-image, .question-media')).filter(d=>j(d)&&!_(d));for(let d of l){let m=Da(d);if(!m)continue;let c=d.getBoundingClientRect();if(Tt(d,d.getAttribute("aria-label")||"",c.width,c.height))try{let h=await fetch(m,{mode:"cors"});if(h.ok){let p=await h.blob();if(p.type.startsWith("image/")){let g=await createImageBitmap(p),f=await Ie(g);g.close();let b=await we(f);if(b){let v={mediaType:"image/jpeg",base64:b,alt:"Imagem de fundo da alternativa",source:m.slice(0,2e3),captureStatus:"captured"};if(n(v,d))return t}}}}catch{try{let p=await(await fetch(m,{mode:"no-cors"})).blob();if(p.size>100){let g=await createImageBitmap(p),f=await Ie(g);g.close();let b=await we(f);if(b&&b.length>100){let v={mediaType:"image/jpeg",base64:b,alt:"Imagem CSS background",source:m.slice(0,2e3),captureStatus:"captured"};if(n(v,d))return t}}}catch{}}}}if(t.filter(l=>l.captureStatus==="captured").length<Ct){let l=new Set;for(let d of s){let m=Array.from(d.querySelectorAll('div, span, section, figure, [class*="image" i], [class*="media" i], [class*="visual" i], [class*="graph" i], [class*="diagram" i], [class*="figure" i]')).filter(c=>{if(l.has(c)||!j(c)||_(c))return!1;let h=c.getBoundingClientRect();return h.width>=80&&h.height>=60});for(let c of m){l.add(c);try{let h=window.getComputedStyle?window.getComputedStyle(c).backgroundImage:"";if(!h||h==="none"||!h.includes("url(")||c.style.backgroundImage&&c.style.backgroundImage.includes("url("))continue;let p=h.match(/url\(["']?([^"')]+)["']?\)/);if(!p||!p[1]||p[1].startsWith("data:image/svg+xml"))continue;let g=p[1],f=c.getBoundingClientRect();if(!Tt(c,c.getAttribute("aria-label")||"",f.width,f.height))continue;try{let b=await fetch(g,{mode:"cors"});if(b.ok){let v=await b.blob();if(v.type.startsWith("image/")||v.size>200){let y=await createImageBitmap(v),x=await Ie(y);y.close();let w=await we(x);if(w){let q={mediaType:"image/jpeg",base64:w,alt:c.getAttribute("aria-label")||"Imagem CSS computada da quest\xE3o",source:g.slice(0,2e3),captureStatus:"captured",textContext:Ae(c)};if(n(q,c))return t}}}}catch{let b=await kt(c);if(b&&n(b,c))return t}}catch{}}}}return t}function Na(o,e=""){if(typeof document>"u")return!1;let t=o||document.body,a=(e+" "+(t.textContent||"")).toLowerCase();return!!t.querySelector('.celebration-icon, [class*="celebrat" i], [class*="conclu" i], [class*="finish" i], [class*="result" i], [class*="score-screen" i], [data-testid*="completion" i], [data-functional-selector*="game-over" i], .perseus-message-renderer, [data-congratulations]')&&(a.includes("parab\xE9ns")||a.includes("conclu")||a.includes("finaliz")||a.includes("resultado")||a.includes("pontua")||a.includes("sucesso")||a.includes("\u{1F3C6}")||a.includes("game over")||a.includes("great job"))?!0:["parab\xE9ns! lista de exerc\xEDcios conclu\xEDda","exerc\xEDcios conclu\xEDda","lista de exerc\xEDcios conclu\xEDda","atividade conclu\xEDda","atividade finalizada","finalizado com sucesso","finalizada com sucesso","simulado conclu\xEDdo","simulado finalizado","question\xE1rio conclu\xEDdo","question\xE1rio finalizado","voc\xEA concluiu a atividade","voc\xEA concluiu o question\xE1rio","sua resposta foi registrada","todas as perguntas foram respondidas","quiz completed","exercise completed","activity completed","all questions answered","view results","game over","leaderboard","scoreboard","awesome","great job","you got it right","mission complete","your response has been recorded","sua resposta foi registrada"].some(s=>a.includes(s))}var St=class{active=!1;callbacks;isProcessing=!1;observer=null;mutationTimer=null;heartbeatTimer=null;abortController=null;errorCount=0;resolvedSigs=new Set;advancedSigs=new Set;hasPendingMutationDuringProcessing=!1;lastContentSig="";lastAttemptSig="";lastAttemptTime=0;replanCount=new Map;questionPhase="unanswered";answerSubmittedAt=0;analysisStallTimer=null;stallCount=0;constructor(e){this.callbacks=e}isActive(){return this.active}start(){this.active||(this.active=!0,this.advancedSigs.clear(),this.hasPendingMutationDuringProcessing=!1,this.callbacks.onStatusChange("waiting","> [SYS] Autopilot ENGAGED. Monitorando..."),typeof MutationObserver<"u"&&(this.observer=new MutationObserver(()=>{if(this.active){if(this.isProcessing){this.hasPendingMutationDuringProcessing=!0;return}this.mutationTimer&&clearTimeout(this.mutationTimer),this.mutationTimer=window.setTimeout(()=>{this.mutationTimer=null,this.isProcessing||this.checkAndAnalyze()},120)}}),this.observer.observe(document.body,{subtree:!0,childList:!0,characterData:!0,attributes:!0})),this.scheduleHeartbeat(),this.checkAndAnalyze())}stop(){if(this.active=!1,this.analysisStallTimer&&(clearTimeout(this.analysisStallTimer),this.analysisStallTimer=null),this.abortController){try{this.abortController.abort()}catch{}this.abortController=null}this.mutationTimer&&(clearTimeout(this.mutationTimer),this.mutationTimer=null),this.heartbeatTimer&&(clearTimeout(this.heartbeatTimer),this.heartbeatTimer=null),this.observer?.disconnect(),this.observer=null,this.isProcessing=!1,this.resolvedSigs.clear(),this.advancedSigs.clear(),this.hasPendingMutationDuringProcessing=!1,this.replanCount.clear(),this.questionPhase="unanswered",this.answerSubmittedAt=0,this.stallCount=0,this.callbacks.onStatusChange("idle","> [SYS] Autopilot DESATIVADO pelo usu\xE1rio.","text-yellow")}scheduleHeartbeat(){this.heartbeatTimer&&clearTimeout(this.heartbeatTimer),this.heartbeatTimer=window.setTimeout(()=>{this.heartbeatTimer=null,this.active&&!this.isProcessing&&this.checkAndAnalyze(),this.active&&this.scheduleHeartbeat()},3e3)}sleep(e){return new Promise(t=>{if(!this.active)return t();let a=null,i=()=>{a&&clearTimeout(a),t()};a=window.setTimeout(t,e),this.abortController?.signal.addEventListener("abort",i,{once:!0})})}async checkAndAnalyze(){if(!(!this.active||this.isProcessing))try{this.isProcessing=!0;let e=Se(!1);if(e||(e=ke()),!this.active)return;if(!e){this.callbacks.onStatusChange("waiting","> [SYS] Monitorando p\xE1gina... Aguardando elementos.");return}if(Na(e.scope,e.questionText)){this.callbacks.onStatusChange("idle","> [SYS] \u{1F3C6} Atividade conclu\xEDda! Autopilot finalizado.","text-green"),this.stop();return}if(this.callbacks.isManualModeActive?.()){this.callbacks.onStatusChange("waiting","> [SYS] Gabarito manual ativo. Aguardando voc\xEA avan\xE7ar...","text-yellow");return}let t=$t(e);if(this.resolvedSigs.has(t))if(this.questionPhase==="answered"||this.questionPhase==="feedback"){if(this.detectFeedbackOverlay()){this.questionPhase="feedback",this.callbacks.onStatusChange("advancing","> [SYS] Feedback detectado. Procurando bot\xE3o de avan\xE7o...","text-green"),await this.handleFeedbackPhase();return}if(Date.now()-this.answerSubmittedAt>5e3)this.resolvedSigs.delete(t),this.lastAttemptTime=0,this.questionPhase="unanswered";else return}else return;let a=Date.now();if(t===this.lastAttemptSig&&a-this.lastAttemptTime<1500)return;if(t!==this.lastContentSig){if(this.questionPhase="unanswered",this.answerSubmittedAt=0,this.callbacks.onStatusChange("waiting","> [SYS] Aguardando estabiliza\xE7\xE3o da p\xE1gina...","text-yellow"),await this.sleep(600),!this.active)return;let r=Se(!1)||ke();r&&(e=r,t=$t(e)),this.lastContentSig!==""&&(this.callbacks.onStatusChange("waiting","> [SYS] Nova quest\xE3o detectada! Analisando...","text-green"),this.callbacks.onPageAdvance?.(),this.errorCount=0)}this.lastContentSig=t,this.lastAttemptSig=t,this.lastAttemptTime=a;let n=e.controls.filter(r=>r.role==="answer"),s=xt(e.questionText);if(n.length===0&&s){this.callbacks.onStatusChange("waiting","> [DOM] Quest\xE3o identificada. Aguardando renderiza\xE7\xE3o dos controles...","text-yellow");for(let r=0;r<14;r++){if(await this.sleep(250),!this.active)return;let u=Se(!1)||ke();if(u&&u.controls.filter(l=>l.role==="answer").length>0){e=u,n=e.controls.filter(l=>l.role==="answer");break}}}if(n.length>0||s){if(this.callbacks.onStatusChange("analyzing","> [IA] Quest\xE3o detectada. Consultando IA...","text-blue"),Me(),e?.scope&&st(e.scope),!this.active)return;this.abortController=new AbortController,this.stallCount=this.stallCount||0,this.analysisStallTimer&&clearTimeout(this.analysisStallTimer),this.analysisStallTimer=window.setTimeout(()=>{this.stallCount++,this.callbacks.onStatusChange("waiting",`> [AVISO] An\xE1lise travada (stall #${this.stallCount}). Abortando e reiniciando automaticamente...`,"text-yellow");try{this.abortController?.abort()}catch{}this.abortController=null,this.isProcessing=!1,this.lastAttemptTime=0,this.stallCount>=3?(this.callbacks.onStatusChange("waiting","> [AVISO] Muitos stalls consecutivos. Aguardando 15s antes de tentar novamente...","text-yellow"),this.stallCount=0,window.setTimeout(()=>{this.active&&this.checkAndAnalyze()},15e3)):window.setTimeout(()=>{this.active&&this.checkAndAnalyze()},2e3)},45e3);let r=await this.callbacks.onRequestAnalysis(1,this.abortController.signal);if(this.analysisStallTimer&&(clearTimeout(this.analysisStallTimer),this.analysisStallTimer=null),this.abortController=null,!this.active)return;if(r){if(this.callbacks.onStatusChange("analyzing",`> [IA] (${r.usedModel||"gemini"}) Confian\xE7a: ${(r.confidence*100).toFixed(1)}% | Modo: ${r.mode}`,"text-blue"),this.callbacks.onStatusChange("analyzing",`> [IA] Racioc\xEDnio: ${r.rationale}`,"text-blue"),this.callbacks.onStatusChange("analyzing",`> [IA] A\xE7\xF5es: ${r.actions.length}`,"text-blue"),this.errorCount=0,this.stallCount=0,r.memoryToStore&&this.callbacks.onStatusChange("analyzing",`> [IA] \u{1F9E0} Mem\xF3ria RAG: "${r.memoryToStore}"`,"text-yellow"),r.pageType==="conclusion"){this.callbacks.onStatusChange("idle","> [SYS] Atividade conclu\xEDda! Desligando Autopilot.","text-green"),this.stop();return}if(r.actions.length===0){let l=(this.replanCount.get(t)||0)+1;if(this.replanCount.set(t,l),l<3){this.callbacks.onStatusChange("waiting",`> [AVISO] Nenhuma resposta formulada para esta quest\xE3o. Retentando (${l}/3)...`,"text-yellow"),await this.sleep(1200),this.lastAttemptTime=0;return}}let u=(this.replanCount.get(t)||0)+1;if(this.replanCount.set(t,u),(r.actions.length>0||u>=3)&&(this.resolvedSigs.add(t),this.questionPhase="answered",this.answerSubmittedAt=Date.now(),this.active)){if(await this.sleep(1200),!this.active)return;await this.handleFeedbackPhase()}}else{this.errorCount++;let u=this.errorCount===1?3e3:5e3;this.callbacks.onStatusChange("waiting",`> [AVISO] Falha na an\xE1lise (${this.errorCount}). Retentando em ${u/1e3}s...`,"text-yellow"),await this.sleep(u),this.lastAttemptTime=0}}else{if(this.advancedSigs.has(t)||(this.callbacks.onStatusChange("analyzing","> [IA] P\xE1gina informativa ou texto de leitura. Consultando IA...","text-blue"),!this.active))return;this.abortController=new AbortController;let r=await this.callbacks.onRequestAnalysis(1,this.abortController.signal);if(this.abortController=null,!this.active)return;if(r){if(this.callbacks.onStatusChange("analyzing",`> [IA] (${r.usedModel||"gemini"}) Tipo: ${r.pageType} | Modo: ${r.mode}`,"text-blue"),this.callbacks.onStatusChange("analyzing",`> [IA] Racioc\xEDnio: ${r.rationale}`,"text-blue"),r.memoryToStore&&this.callbacks.onStatusChange("analyzing",`> [IA] \u{1F9E0} Absorvido: "${r.memoryToStore}"`,"text-yellow"),r.pageType==="conclusion"){this.callbacks.onStatusChange("idle","> [SYS] Atividade conclu\xEDda! Desligando Autopilot.","text-green"),this.stop();return}r.pageType==="info"?(this.callbacks.onStatusChange("advancing","> [IA] \u{1F4D6} Leitura conclu\xEDda. Avan\xE7ando com seguran\xE7a...","text-green"),await this.sleep(500)):r.pageType==="start"&&(this.callbacks.onStatusChange("advancing","> [SYS] In\xEDcio detectado. Iniciando...","text-blue"),await this.sleep(500)),this.errorCount=0,this.resolvedSigs.add(t),this.advancedSigs.add(t)}else{this.errorCount++;let u=this.errorCount===1?3e3:5e3;this.callbacks.onStatusChange("waiting",`> [AVISO] Falha ao processar p\xE1gina (${this.errorCount}). Retentando em ${u/1e3}s...`,"text-yellow"),await this.sleep(u),this.lastAttemptTime=0}}this.errorCount>=5&&(this.callbacks.onStatusChange("waiting","> [AVISO] Muitas falhas. Reiniciando contadores e aguardando 10s...","text-yellow"),this.errorCount=0,this.lastAttemptTime=0,await this.sleep(1e4))}catch(e){if(!this.active)return;let t=e instanceof Error?e.message:String(e);if(t.includes("cancelada")||t.includes("aborted"))return;/timeout|aborted|network|failed to fetch|cancelad/i.test(t)||this.errorCount++,console.warn("[EasyQuiz Autopilot]",e),this.callbacks.onStatusChange("error",`> [ERRO NO AUTOPILOT] ${t}`,"text-red")}finally{this.abortController=null,this.isProcessing=!1;let e=this.hasPendingMutationDuringProcessing;this.hasPendingMutationDuringProcessing=!1,this.active&&window.setTimeout(()=>void this.checkAndAnalyze(),e?300:750)}}detectFeedbackOverlay(){if(typeof document>"u")return!1;let e=[".correct",".incorrect",".perseus-message-renderer",'[class*="feedback" i]','[class*="resultado" i]','[class*="result" i]','[role="alert"]','[class*="check-answer" i][class*="result" i]','[class*="banner" i][class*="correct" i]','[class*="banner" i][class*="incorrect" i]'].join(", "),t=document.querySelector(e);if(!t)return!1;try{let a=t.getBoundingClientRect();if(a.width<=0||a.height<=0)return!1;let i=window.getComputedStyle(t);if(i.display==="none"||i.visibility==="hidden")return!1}catch{return!1}return!0}async handleFeedbackPhase(){if(this.active){for(let e=0;e<16;e++){if(!this.active)return;let t=this.detectFeedbackOverlay();t&&(this.questionPhase="feedback",this.callbacks.onStatusChange("advancing","> [SYS] \u2705 Feedback do quiz detectado. Buscando bot\xE3o de avan\xE7o...","text-green"));let a=qt();if(a){let i=(a.textContent||a.getAttribute("aria-label")||"").trim().toLowerCase();if(/(próxim|next|continuar|continue|avançar|prosseguir|próxima tarefa|next task|próxima pergunta|seguir)/i.test(i)||t&&!/(verificar|checar|check|conferir|responder)/i.test(i)){if(this.callbacks.onStatusChange("advancing",`> [SYS] \u2705 Avan\xE7ando: "${i.slice(0,40)}"`,"text-green"),se(a),this.questionPhase="advanced",await this.sleep(800),!this.active)return;this.questionPhase="unanswered",this.lastContentSig="",this.lastAttemptSig="",this.lastAttemptTime=0,this.answerSubmittedAt=0,this.callbacks.onPageAdvance?.();return}}await this.sleep(250)}this.questionPhase="unanswered",this.resolvedSigs.delete(this.lastContentSig),this.lastAttemptTime=0,this.callbacks.onStatusChange("waiting","> [SYS] Feedback n\xE3o detectado ou sem bot\xE3o de avan\xE7o. Re-analisando...","text-yellow")}}};var C={canvasLogo:"data:image/png;base64,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dR/4337uYwwdXhTSKDB5oWAsGwgYGodS2wpYM8gEplWlTok0HWlElUTRdKKJ6My0nSYVScooVdtkmrZMOpkyk6JpQwKhDQEaJSkwBGPj2BiDjS+Xa7DMNROLJBBnwNg8z54/7Avn3vuctc/Lfln7tz8fCSH57LPPPmvte/f53v1b5zRt27YFAACApbu1aZpXTH0QS3Yw9QEAAAAAAjoAAACkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACh1MfAFTgM03TXDn1QQAAAPPmDjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAICOgAAACQgoAMAAEACAjoAAAAkIKADAABAAgI6AAAAJCCgAwAAQAIC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",logo:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.8L19.2 8 12 11.2 4.8 8 12 4.8zM4 9.6l7 3.1v7.5l-7-3.5V9.6zm9 10.6v-7.5l7-3.1v7.1l-7 3.5z"/></svg>',rocket:`
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
    `,this.shadow.appendChild(this.element),this.element.querySelector("#eq-fah-pill").addEventListener("click",()=>this.restore()),this.element.querySelector("#eq-fah-min-btn").addEventListener("click",()=>this.minimize()),this.element.querySelector("#eq-fah-close-btn").addEventListener("click",()=>this.hide());let i=this.element.querySelector("#eq-fah-copy-md-btn");i.addEventListener("click",()=>this.copyMarkdownToClipboard(i));let n=this.element.querySelector("#eq-fah-copy-all-btn");n.addEventListener("click",()=>this.copyMarkdownToClipboard(n));let s=this.element.querySelector("#eq-fah-header");this.setupDraggable(s)}setupDraggable(e){let t=a=>{if(a.target.closest(".eq-fah-btn"))return;a.preventDefault(),this.isDragging=!0,this.dragStartX=a.clientX,this.dragStartY=a.clientY;let i=this.element.getBoundingClientRect();this.initialLeft=i.left,this.initialTop=i.top;let n=r=>{if(!this.isDragging||!this.element)return;let u=r.clientX-this.dragStartX,l=r.clientY-this.dragStartY,d=Math.max(10,window.innerWidth-this.element.offsetWidth-10),m=Math.max(10,window.innerHeight-this.element.offsetHeight-10),c=Math.min(Math.max(10,this.initialLeft+u),d),h=Math.min(Math.max(10,this.initialTop+l),m);this.element.style.left=`${c}px`,this.element.style.top=`${h}px`},s=()=>{this.isDragging=!1,window.removeEventListener("mousemove",n),window.removeEventListener("mouseup",s)};window.addEventListener("mousemove",n),window.addEventListener("mouseup",s)};e.addEventListener("mousedown",t)}renderContent(){if(!this.element||!this.currentPlan)return;let e=this.element.querySelector("#eq-fah-body"),t=this.element.querySelector("#eq-fah-pill-text"),a=this.element.querySelector("#eq-fah-pill-badge");e.innerHTML="";let i=this.currentPlan,n=i.actions.filter(h=>h.t==="drag"),s=i.actions.filter(h=>{if(h.t!=="val")return!1;let p=H(h.id||"").toLowerCase();return!/continu|avan[cç]|pr[oó]xim|submet|enviar|check|verific/i.test(p)}),r=i.actions.filter(h=>h.t==="clk"||h.t==="chk"),u=i.actions.filter(h=>h.t==="sel"),l=n.length||s.length||r.length||u.length,d=document.createElement("div");d.className="eq-fah-meta";let m=document.createElement("span");m.textContent=`Modo: ${i.mode.replace("_"," ")}`;let c=document.createElement("span");if(c.className="eq-fah-meta-badge",c.textContent=`${Math.round(i.confidence*100)}% Confian\xE7a`,d.append(m,c),e.appendChild(d),i.rationale){let h=document.createElement("div");h.style.cssText="padding:6px 10px;margin:6px 0 8px;border-radius:6px;background:rgba(0,255,204,0.06);border:1px solid rgba(0,255,204,0.18);font-size:11px;color:#a7f3d0;line-height:1.4;",h.innerHTML=`<span style="color:#00ffcc;font-weight:700;">\u{1F4A1} IA:</span> ${i.rationale}`,e.appendChild(h)}if(i.learnedSkill){let h=document.createElement("div");h.style.cssText="padding:4px 8px;margin-bottom:8px;border-radius:5px;background:rgba(168,85,247,0.08);border:1px solid rgba(168,85,247,0.25);font-size:10px;color:#e9d5ff;",h.innerHTML=`<span style="color:#c084fc;font-weight:700;">\u{1F4DA} Skill Registrada:</span> ${i.learnedSkill.name}`,e.appendChild(h)}if(n.length>0||i.mode==="categorizacao"||i.mode==="arrastar_soltar"){t.textContent=`Categoriza\xE7\xE3o (${n.length} itens)`,a.textContent=String(n.length);let h={};for(let p of n){let g=H(p.to)||"Geral";h[g]||(h[g]=[]),h[g].push(H(p.from))}for(let[p,g]of Object.entries(h)){let f=document.createElement("div"),b=/fato|true|verdadeiro|sim/i.test(p),v=/opini[aã]o|false|falso|n[aã]o/i.test(p);f.className=`eq-fah-group ${b?"group-fato":v?"group-opiniao":""}`;let y=document.createElement("div");y.className="eq-fah-group-title",y.textContent=`\u{1F4C1} ${p} (${g.length})`,f.appendChild(y);let x=document.createElement("div");x.className="eq-fah-group-items";for(let w of g){let q=document.createElement("div");q.className="eq-fah-item";let S=document.createElement("span");S.className="eq-fah-item-text",S.textContent=w,q.appendChild(S);let T=document.createElement("button");T.className="eq-fah-copy-inline",T.textContent="Copiar",T.addEventListener("click",()=>{navigator.clipboard.writeText(w),T.textContent="\u2713 Copiado",setTimeout(()=>T.textContent="Copiar",1200)}),q.appendChild(T),x.appendChild(q)}f.appendChild(x),e.appendChild(f)}}else if(s.length>0){t.textContent=`Preenchimento (${s.length} campos)`,a.textContent=String(s.length);let h=document.createElement("div");h.className="eq-fah-group";let p=document.createElement("div");p.className="eq-fah-group-title",p.textContent="\u{1F4DD} Respostas para os Campos de Texto:",h.appendChild(p);let g=document.createElement("div");g.className="eq-fah-group-items";for(let f=0;f<s.length;f++){let b=s[f],v=document.createElement("div");v.className="eq-fah-item";let y=at(b.id);(!y||/^[#\.\$]|input|mat-|cell|field|q[0-9]|eq-/i.test(y))&&(y=`Campo ${f+1}`);let x=String(b.v??""),w=document.createElement("div");w.className="eq-fah-field-box";let q=document.createElement("div");q.className="eq-fah-field-label",q.textContent=y,w.appendChild(q);let S=document.createElement("div");S.className="eq-fah-field-val",S.textContent=x,w.appendChild(S),v.appendChild(w);let T=document.createElement("button");T.className="eq-fah-copy-inline",T.textContent="Copiar",T.addEventListener("click",()=>{navigator.clipboard.writeText(x),T.textContent="\u2713 Copiado",setTimeout(()=>T.textContent="Copiar",1200)}),v.appendChild(T),g.appendChild(v)}h.appendChild(g),e.appendChild(h)}else if(r.length>0){t.textContent=`Op\xE7\xF5es (${r.length} marcadas)`,a.textContent=String(r.length);let h=document.createElement("div");h.className="eq-fah-group";let p=document.createElement("div");p.className="eq-fah-group-title",p.textContent="\u{1F3AF} Alternativa(s) Correta(s):",h.appendChild(p);let g=document.createElement("div");g.className="eq-fah-group-items";for(let f=0;f<r.length;f++){let b=r[f],v=document.createElement("div");v.className="eq-fah-item";let y=at(b.id);(!y||/^(eq-|#|\$|\.|input_|mat-|choice_|radio_|chk_)/i.test(y))&&b.v&&(y=String(b.v)),y=H(y),/^(eq-|#|\$|\.|input_|mat-|choice_|radio_|chk_)/i.test(y)&&(y="");let x="",w=y.match(/^(\([A-Za-z0-9]\)|[A-Za-z0-9][\)\.\:\-])\s*(.*)$/);w?(x=w[1].replace(/[\(\)\.\:\-\s]/g,"").toUpperCase(),y=w[2].trim()||y):r.length>1&&(x=String.fromCharCode(65+f));let q=document.createElement("div");if(q.style.display="flex",q.style.alignItems="center",q.style.gap="8px",q.style.flex="1",x){let A=document.createElement("span");A.className="eq-fah-letter-badge",A.textContent=x,q.appendChild(A)}let S=document.createElement("span");S.className="eq-fah-item-text",S.textContent=y||(x?`Alternativa ${x}`:"Alternativa Selecionada"),q.appendChild(S),v.appendChild(q);let T=document.createElement("button");T.className="eq-fah-copy-inline",T.textContent="Copiar",T.addEventListener("click",()=>{navigator.clipboard.writeText(y||x),T.textContent="\u2713 Copiado",setTimeout(()=>T.textContent="Copiar",1200)}),v.appendChild(T),g.appendChild(v)}h.appendChild(g),e.appendChild(h)}else if(u.length>0){t.textContent=`Sele\xE7\xE3o (${u.length} listas)`,a.textContent=String(u.length);let h=document.createElement("div");h.className="eq-fah-group";let p=document.createElement("div");p.className="eq-fah-group-title",p.textContent="\u{1F4CB} Op\xE7\xF5es para Selecionar na Lista:",h.appendChild(p);let g=document.createElement("div");g.className="eq-fah-group-items";for(let f=0;f<u.length;f++){let b=u[f],v=document.createElement("div");v.className="eq-fah-item";let y=at(b.id);(!y||/^[#\.\$]|select|input|mat-|cell|field|q[0-9]|eq-/i.test(y))&&(y=`Lista ${f+1}`);let q=(Array.isArray(b.v)?b.v:[String(b.v??"")]).map(z=>{let N=F(b.id,void 0,!0)||F(H(b.id),void 0,!0),k=N instanceof HTMLSelectElement?N:N?.querySelector("select");if(k){let E=H(z).toLowerCase();for(let L=0;L<k.options.length;L++){let R=k.options[L];if(R.value.toLowerCase()===E||H(R.textContent).toLowerCase()===E){let Q=H(R.textContent);if(Q&&!Q.toLowerCase().includes("selecione"))return Q}}}return z}).join(", "),S=document.createElement("div");S.className="eq-fah-field-box";let T=document.createElement("div");T.className="eq-fah-field-label",T.textContent=y,S.appendChild(T);let A=document.createElement("div");A.className="eq-fah-field-val",A.textContent=q,S.appendChild(A),v.appendChild(S);let P=document.createElement("button");P.className="eq-fah-copy-inline",P.textContent="Copiar",P.addEventListener("click",()=>{navigator.clipboard.writeText(q),P.textContent="\u2713 Copiado",setTimeout(()=>P.textContent="Copiar",1200)}),v.appendChild(P),g.appendChild(v)}h.appendChild(g),e.appendChild(h)}else{t.textContent="Gabarito",a.textContent="0";let h=document.createElement("div");h.style.padding="10px",h.style.color="#888",h.textContent="Nenhuma resposta direta para exibir.",e.appendChild(h)}if(i.rationale){let h=document.createElement("div");h.className="eq-fah-rationale",h.textContent=`\u{1F4A1} Racioc\xEDnio da IA: ${i.rationale}`,e.appendChild(h)}}generateMarkdown(){if(!this.currentPlan)return"";let e=this.currentPlan,t=[];t.push("# Gabarito da Quest\xE3o \u2014 EasyQuiz Pro"),t.push(`- **Modo:** ${e.mode}`),t.push(`- **Confian\xE7a:** ${(e.confidence*100).toFixed(0)}%`),t.push("");let a=e.actions.filter(r=>r.t==="drag"),i=e.actions.filter(r=>r.t==="val"),n=e.actions.filter(r=>r.t==="clk"||r.t==="chk"),s=e.actions.filter(r=>r.t==="sel");if(a.length>0){t.push("## \u{1F4C2} Categoriza\xE7\xE3o:");let r={};for(let u of a){let l=H(u.to)||"Geral";r[l]||(r[l]=[]),r[l].push(H(u.from))}for(let[u,l]of Object.entries(r)){t.push(`### Categoria: ${u}`);for(let d of l)t.push(`- ${d}`);t.push("")}}else if(i.length>0){t.push("## \u270F\uFE0F Respostas para Preenchimento:");for(let r of i){let u=H(r.id);t.push(`- **${u||"Campo"}:** \`${r.v}\``)}t.push("")}else if(n.length>0){t.push("## \u2705 Alternativas Corretas:");for(let r=0;r<n.length;r++){let u=n[r],l=at(u.id);(!l||/^(eq-|#|\$|\.|input_|mat-|choice_|radio_|chk_)/i.test(l))&&u.v&&(l=String(u.v)),l=H(l),/^(eq-|#|\$|\.|input_|mat-|choice_|radio_|chk_)/i.test(l)&&(l="");let d=n.length>1?`${String.fromCharCode(65+r)}) `:"";t.push(`- [x] ${d}${l||"Alternativa "+String.fromCharCode(65+r)}`)}t.push("")}else if(s.length>0){t.push("## \u{1F4CB} Op\xE7\xF5es Selecionadas em Lista:");for(let r of s){let u=H(r.id)||"Lista",l=Array.isArray(r.v)?r.v.join(", "):String(r.v??"");t.push(`- **${u}:** \`${l}\``)}t.push("")}return e.rationale&&(t.push("---"),t.push(`**\u{1F4A1} Racioc\xEDnio:** ${e.rationale}`)),t.join(`
`)}copyMarkdownToClipboard(e){let t=this.generateMarkdown();t&&navigator.clipboard.writeText(t).then(()=>{let a=e.innerHTML;e.id==="eq-fah-copy-md-btn"?e.innerHTML='<span style="font-size:10px; color:#00ffcc; font-weight:bold;">\u2713</span>':e.innerHTML="\u2713 Copiado!",setTimeout(()=>{e.innerHTML=a},1500)})}};var Uo=`
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

`;var He=typeof process<"u"&&"v3.8.7"||"v3.8.7";var Xo=(()=>{try{if(typeof window.trustedTypes?.createPolicy=="function")return window.trustedTypes.createPolicy("easyquiz-ui#html",{createHTML:o=>o})}catch{}return null})();function Ba(o,e){try{if(Xo){o.innerHTML=Xo.createHTML(e);return}}catch{}try{if(typeof o.setHTMLUnsafe=="function"){o.setHTMLUnsafe(e);return}}catch{}o.innerHTML=e}var ja=[{value:"",label:"Detec\xE7\xE3o Autom\xE1tica"},{value:"escolha_unica",label:"M\xFAltipla Escolha (\xDAnica)"},{value:"escolha_multipla",label:"M\xFAltipla Escolha (V\xE1rias)"},{value:"categorizacao",label:"Categoriza\xE7\xE3o / Grupos"},{value:"arrastar_soltar",label:"Arrastar e Soltar (Drag & Drop)"},{value:"ordenacao",label:"Ordena\xE7\xE3o / Sequ\xEAncia"},{value:"verdadeiro_falso",label:"Verdadeiro / Falso"},{value:"texto_livre",label:"Texto Livre / Dissertativa"},{value:"preenchimento",label:"Preenchimento de Lacunas"}],Qa=[{value:"smart",label:"Inteligente (Auto-H\xEDbrido)"},{value:"command",label:"Apenas Comando (Seguro)"},{value:"javascript",label:"Apenas JS Nativo (Avan\xE7ado)"}],Mt=class{host;shadow;callbacks;autopilot;floatingAnswers;initialSettings;isCollapsed=!1;activeTab="resolver";isBusy=!1;stopwatchInterval=null;stopwatchStartTime=0;latestPlan=null;latestContext=null;latestImages=[];latestImageDescriptions=[];latestPromptText="";metricsLiveTime;metricsLiveStatus;metricsTotalBadge;metricTotalTime;metricAvgTime;metricTotalCount;metricsHistoryList;metricsHistoryCount;metricsCopyBtn;metricsResetBtn;currentQuestionStartTime=0;questionLiveTimerInterval=null;liveDebugTerminal;dbgModel;dbgLatency;dbgSplitTokens;dbgTotalTokens;dbgErrorCard;dbgErrorText;dbgPromptLen;dbgPromptView;dbgContextView;dbgRawRespView;dbgCountAll;dbgCountError;dbgCountAi;dbgCountDom;logEntries=[];activeLogFilter="all";autoScrollLogs=!0;lastErrorMsg=null;terminalCmdHistory=[];terminalCmdHistoryIdx=-1;terminalMode="terminal";_wallpaperRAF=0;_wlpWhiteLogo=null;_terminalInited=!1;liveTerminalOutput=null;terminalInputEl=null;outputSearchQuery="";outputSortNewest=!0;_reconnectContextbarBtns=()=>{};_autopilotAnalyzingShown=!1;progressContainer;progressBar;progressLabel;progressVal;contextTreeContainer;launcherBtn;launcherDot;dockToggleBtn;sidebarEl;apToggleBtn;apConsole;executionConsole;dotPulseAp;statusTextAp;stopwatchAp;dotPulseAdv;statusTextAdv;stopwatchAdv;inspModel;inspLatency;inspTokens;inspPrompt;inspRationale;inspActions;copyPromptBtn=null;apiKeyInput;_ctxPopup=null;_ctxCloseH=null;keyMoreBtn;keysListEl;keysBadgeEl;modelSelect;modeSelect;engineSelect;dryRunCheckbox;autoApplyCheckbox;autoAdvanceCheckbox;hostDarkModeCheckbox;useVisionCheckbox;toastStackingCheckbox;showTokensCheckbox;soundFeedbackCheckbox;compactModeCheckbox;glowEffectsCheckbox;languageHintSelect;autoScrollLogsCheckbox;analyzeBtn;applyBtn=null;resultContainer;constructor(e,t){this.initialSettings=e,this.callbacks=t,this.autopilot=new St({onStatusChange:(l,d,m)=>{this.logToConsole(d,m),l==="analyzing"?this._autopilotAnalyzingShown||(this._autopilotAnalyzingShown=!0,this.setBusy(!0,"Autopilot: IA analisando...")):l==="advancing"||l==="waiting"?(this._autopilotAnalyzingShown=!1,this.setBusy(!1),this.updateAutopilotUi(!0)):l==="idle"?(this._autopilotAnalyzingShown=!1,this.setBusy(!1),this.updateAutopilotUi(!1),d.includes("conclus\xE3o")||d.includes("finalizada")||d.includes("Parab\xE9ns")?this.setStatus("Atividade conclu\xEDda. Resolver Autopilot finalizado com sucesso.","success"):this.setStatus("Resolver Autopilot pausado e aguardando nova a\xE7\xE3o.","info")):l==="error"&&(this._autopilotAnalyzingShown=!1,this.setBusy(!1),this.updateAutopilotUi(!1),this.setStatus("Resolver Autopilot interrompido por erro.","error"))},onRequestAnalysis:async(l,d)=>{try{return await this.callbacks.onAnalyze(l,d,!0)||null}catch{return null}},isManualModeActive:()=>this.floatingAnswers?.isOpen()??!1,onPageAdvance:()=>{this.floatingAnswers?.hide()}}),this.host=document.createElement("div"),this.host.id="easyquiz-shadow-root",this.host.style.setProperty("position","fixed","important"),this.host.style.setProperty("top","15px","important"),this.host.style.setProperty("right","15px","important"),this.host.style.setProperty("z-index","2147483647","important"),this.host.style.setProperty("display","block","important"),this.host.style.setProperty("pointer-events","none","important"),this.shadow=this.host.attachShadow({mode:"open"}),Ba(this.shadow,`
      <svg width="0" height="0" style="position:absolute;">
        <defs>
          <linearGradient id="geminiGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#4285F4"/>
            <stop offset="50%" stop-color="#9B72CB"/>
            <stop offset="100%" stop-color="#D96570"/>
          </linearGradient>
        </defs>
      </svg>
      <style>${Uo}</style>

      <!-- Launcher m\xEDnimo: apenas o controle para abrir/recolher o painel. -->
      <button class="eq-launcher" type="button" title="Abrir / Recolher painel EasyQuiz (Alt+Q)" aria-label="Abrir ou esconder painel EasyQuiz">
        <span class="eq-launcher-icon">${C.chevronRight}</span>
        <span class="eq-launcher-dot" id="eq-launcher-dot" aria-hidden="true"></span>
      </button>

      <!-- Sidebar Fixa Lateral Direita Estilo VS Code -->
      <aside class="eq-sidebar" aria-label="EasyQuiz Sidebar">
        <!-- Aba Retr\xE1til na Borda Esquerda -->
        <button class="eq-dock-toggle" id="eq-dock-toggle" type="button" title="Recolher / Expandir Painel (Alt+Q)">
          <span class="eq-dock-toggle-icon">${C.chevronRight}</span>
        </button>
           <!-- Activity Bar Vertical na Esquerda (Estilo VS Code - Apenas \xCDcones) -->
          <nav class="eq-activity-bar" role="tablist" aria-label="Atalhos">
            <div class="eq-activity-top">
              <button class="eq-activity-btn active" id="eq-tab-resolver" role="tab" title="Resolver (Opera\xE7\xF5es Atuais)">
                <span class="eq-activity-indicator"></span>
                <span class="eq-activity-icon">${C.sparkles}</span>
              </button>

              <button class="eq-activity-btn" id="eq-tab-brain" role="tab" title="C\xE9rebro da IA (Contexto e Inspe\xE7\xE3o)">
                <span class="eq-activity-indicator"></span>
                <span class="eq-activity-icon">${C.inspector}</span>
              </button>

              <button class="eq-activity-btn" id="eq-tab-metrics" role="tab" title="M\xE9tricas & Cron\xF4metro (Tempo por Quest\xE3o e Hist\xF3rico)">
                <span class="eq-activity-indicator"></span>
                <span class="eq-activity-icon">${C.clock}</span>
              </button>

              <button class="eq-activity-btn" id="eq-tab-debug" role="tab" title="Terminal & Debug Output (Logs, Tokens, Prompts, Erros)">
                <span class="eq-activity-indicator"></span>
                <span class="eq-activity-icon">${C.code}</span>
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
            <!-- Cabe\xE7alho do painel Legacy -->
            <header class="eq-header">
              <div class="eq-brand">
                <span class="eq-brand-icon"><img src="${C.canvasLogo}" alt="EasyQuiz" /></span>
                <span class="eq-brand-name">EasyQuiz</span>
                <span class="eq-brand-badge">BETA</span>
                <span class="eq-brand-version">${He}</span>
                <span id="eq-active-model-badge" style="display:none; font-size:9px; font-weight:700; padding:1px 5px; border-radius:3px; background:rgba(251,191,36,0.14); border:1px solid rgba(251,191,36,0.4); color:#fbbf24; letter-spacing:0.04em; white-space:nowrap;"></span>
              </div>
              <div class="eq-header-tools">
                <button class="eq-icon-btn" id="eq-min-btn" type="button" title="Minimizar (Alt+Q)">${C.chevronRight}</button>
                <button class="eq-icon-btn" id="eq-close-btn" type="button" title="Fechar">${C.close}</button>
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
                    <span class="eq-brand-mark"><img src="${C.canvasLogo}" alt="EQ Legacy" /></span>
                    <div class="eq-brand-copy">
                      <div class="eq-brand-title">EQ Legacy</div>
                      <div class="eq-brand-subline">BETA \u2022 ${He}</div>
                    </div>
                  </div>
                </div>

                <!-- CTA: Autopilot + 3-dot as SEPARATE standalone buttons -->
                <div class="eq-cta-wrapper">
                  <button class="eq-resolve-primary" id="eq-analyze-btn" type="button">
                    <span class="eq-btn-icon">${C.sparkles}</span>
                    <span class="eq-btn-label">Resolver Autopilot</span>
                    <span class="eq-btn-shimmer" aria-hidden="true"></span>
                  </button>
                  <!-- 3-dot shell: button + floating menu as siblings -->
                  <div class="eq-menu-shell">
                    <button class="eq-resolve-menu" id="eq-auto-menu-btn" type="button" aria-label="Mais op\xE7\xF5es" title="Mais op\xE7\xF5es">
                      <span class="eq-btn-icon">${C.moreVertical}</span>
                    </button>
                    <div class="eq-ctx" id="eq-auto-menu" hidden>
                      <button type="button" class="eq-ctx-item" data-auto-action="toggle">
                        <span class="eq-ctx-icon">${C.sparkles}</span>
                        <span>Resolver Autopilot</span>
                      </button>
                      <button type="button" class="eq-ctx-item" data-auto-action="memory">
                        <span class="eq-ctx-icon">${C.eraser}</span>
                        <span>Limpar mem\xF3ria</span>
                      </button>
                      <button type="button" class="eq-ctx-item" data-auto-action="status">
                        <span class="eq-ctx-icon">${C.info}</span>
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
                    <span class="eq-result-toggle-icon">${C.chevronRight}</span>
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
                    <button class="eq-btn-secondary" id="eq-open-hud-btn" type="button">${C.list} Abrir respostas dispon\xEDveis</button>
                  </div>
                </div>

                <!-- Console Terminal Oculto (Apenas para Autopilot Interno) -->
                <div class="eq-terminal" id="eq-ap-console" style="display: none;"></div>
                <div class="eq-terminal eq-terminal-execution" id="eq-execution-console" style="display: none;"></div>
                
                <div class="eq-footer-note" style="margin-top: auto;">${He} \u2022 H\xEDbrido 4.0 (RAG + AST + Vision)</div>
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
                    <button id="eq-output-filter-btn" type="button" style="display:inline-flex;align-items:center;gap:4px;height:24px;font-size:9.5px;font-weight:600;padding:0 9px;border-radius:5px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);color:#777;cursor:pointer;font-family:'Cascadia Code','Fira Code',monospace;white-space:nowrap;"><span id="eq-output-filter-label">Filtro: Todos</span><span style="display:inline-flex;width:10px;height:10px;color:#444;transform:rotate(90deg);">${C.chevronRight}</span></button>
                    <div id="eq-output-filter-menu" style="display:none;position:absolute;top:calc(100% + 5px);left:0;z-index:9999;background:rgba(8,8,14,0.72);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:5px;min-width:172px;box-shadow:0 12px 32px rgba(0,0,0,0.75);">
                      <div style="padding:3px 8px 4px;font-size:8px;font-weight:700;letter-spacing:0.1em;color:#333;font-family:monospace;">CATEGORIAS</div>
                      <label class="eq-filter-lbl" id="eq-filter-opt-all"   style="display:flex;align-items:center;gap:7px;padding:5px 10px;cursor:pointer;border-radius:5px;transition:background 0.08s;" onmouseover="this.style.background='rgba(255,255,255,0.05)'" onmouseout="this.style.background='transparent'"><input type="checkbox" id="eq-fchk-all"   checked style="accent-color:#aaa;cursor:pointer;"> <span style="display:inline-flex;width:12px;height:12px;color:#777;">${C.list}</span>     <span style="font-size:10px;color:#aaa;font-family:monospace;">Todos</span>    <span id="eq-dbg-count-all"   style="margin-left:auto;color:#333;font-size:8px;font-family:monospace;">0</span></label>
                      <label class="eq-filter-lbl" id="eq-filter-opt-error" style="display:flex;align-items:center;gap:7px;padding:5px 10px;cursor:pointer;border-radius:5px;transition:background 0.08s;" onmouseover="this.style.background='rgba(255,85,85,0.08)'"   onmouseout="this.style.background='transparent'"><input type="checkbox" id="eq-fchk-error"         style="accent-color:#ff5555;cursor:pointer;"> <span style="display:inline-flex;width:12px;height:12px;color:#ff5555;">${C.info}</span>    <span style="font-size:10px;color:#aaa;font-family:monospace;">Erros</span>    <span id="eq-dbg-count-error" style="margin-left:auto;color:#333;font-size:8px;font-family:monospace;">0</span></label>
                      <label class="eq-filter-lbl" id="eq-filter-opt-ai"    style="display:flex;align-items:center;gap:7px;padding:5px 10px;cursor:pointer;border-radius:5px;transition:background 0.08s;" onmouseover="this.style.background='rgba(96,165,250,0.08)'"  onmouseout="this.style.background='transparent'"><input type="checkbox" id="eq-fchk-ai"           style="accent-color:#60a5fa;cursor:pointer;"> <span style="display:inline-flex;width:12px;height:12px;color:#60a5fa;">${C.sparkles}</span> <span style="font-size:10px;color:#aaa;font-family:monospace;">IA</span>       <span id="eq-dbg-count-ai"    style="margin-left:auto;color:#333;font-size:8px;font-family:monospace;">0</span></label>
                      <label class="eq-filter-lbl" id="eq-filter-opt-dom"   style="display:flex;align-items:center;gap:7px;padding:5px 10px;cursor:pointer;border-radius:5px;transition:background 0.08s;" onmouseover="this.style.background='rgba(74,222,128,0.06)'"  onmouseout="this.style.background='transparent'"><input type="checkbox" id="eq-fchk-dom"          style="accent-color:#4ade80;cursor:pointer;"> <span style="display:inline-flex;width:12px;height:12px;color:#4ade80;">${C.code}</span>    <span style="font-size:10px;color:#aaa;font-family:monospace;">DOM/Exec</span> <span id="eq-dbg-count-dom"   style="margin-left:auto;color:#333;font-size:8px;font-family:monospace;">0</span></label>
                    </div>
                  </div>
                  <button id="eq-output-sort-btn" type="button" title="Ordenar" style="display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);border-radius:5px;color:#aaa;cursor:pointer;flex-shrink:0;transition:color 0.12s;"><span id="eq-sort-arrow" style="display:inline-flex;width:13px;height:13px;transform:rotate(270deg);transition:transform 0.2s;">${C.chevronRight}</span></button>
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
                        <img src="${C.canvasLogo}" alt="EQ" style="width:48px;height:auto;opacity:0.5;filter:brightness(0) invert(1);" />
                        <div>
                          <div style="font-family:'Cascadia Code','Fira Code','Courier New',monospace;font-size:15px;font-weight:800;color:#3a3a3a;letter-spacing:0.14em;line-height:1;">EASYQUIZ</div>
                          <div style="font-family:'Cascadia Code','Fira Code','Courier New',monospace;font-size:10px;color:#555;font-weight:600;letter-spacing:0.06em;margin-top:4px;">Terminal \xB7 Motor H\xEDbrido 4.0</div>
                          <div style="font-family:'Cascadia Code','Fira Code','Courier New',monospace;font-size:9px;color:#2a2a2a;margin-top:5px;letter-spacing:0.04em;">${He} &nbsp;\xB7&nbsp; RAG &middot; AST &middot; VISION &middot; MULTIMODAL</div>
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
                    <button class="eq-icon-btn" id="eq-dbg-copy-error-btn" type="button" title="Copiar" style="width:20px;height:20px;">${C.copy}</button>
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
                    ${C.settings}<span>Geral</span>
                  </button>
                  <button type="button" class="eq-settings-cat-btn" data-cat="tokens" title="Tokens API">
                    ${C.key}<span>Tokens</span>
                  </button>
                  <button type="button" class="eq-settings-cat-btn" data-cat="visual" title="Visual e Temas">
                    ${C.palette}<span>Visual</span>
                  </button>
                  <button type="button" class="eq-settings-cat-btn" data-cat="ai" title="IA e Modelos">
                    ${C.sparkles}<span>IA</span>
                  </button>
                  <button type="button" class="eq-settings-cat-btn" data-cat="system" title="Sistema e Motor">
                    ${C.cpu}<span>Sistema</span>
                  </button>
                  <button type="button" class="eq-settings-cat-btn" data-cat="about" title="Sobre">
                    ${C.info}<span>Sobre</span>
                  </button>
                </div>

                <!-- CATEGORIA: GERAL -->
                <div class="eq-settings-cat-content" id="eq-cat-general" style="display: flex; flex-direction: column;">
                  <div class="eq-cfg-row">
                    <div class="eq-cfg-label">
                      <span class="eq-cfg-label-title">${C.checkCircle} Auto Aplicar</span>
                      <span class="eq-cfg-label-desc">Aplica respostas automaticamente ap\xF3s a an\xE1lise.</span>
                    </div>
                    <label class="eq-toggle">
                      <input id="eq-auto-apply" type="checkbox" />
                      <div class="eq-toggle-track"><div class="eq-toggle-knob"></div></div>
                    </label>
                  </div>
                  
                  <div class="eq-cfg-row">
                    <div class="eq-cfg-label">
                      <span class="eq-cfg-label-title">${C.chevronRight} Auto Avan\xE7ar</span>
                      <span class="eq-cfg-label-desc">Clica em "Pr\xF3ximo" ou "Verificar" automaticamente ap\xF3s injetar.</span>
                    </div>
                    <label class="eq-toggle">
                      <input id="eq-auto-advance" type="checkbox" />
                      <div class="eq-toggle-track"><div class="eq-toggle-knob"></div></div>
                    </label>
                  </div>
                  
                  <div class="eq-cfg-row">
                    <div class="eq-cfg-label">
                      <span class="eq-cfg-label-title" style="color: var(--eq-warning);">${C.flask} Modo Dry-Run (Simula\xE7\xE3o)</span>
                      <span class="eq-cfg-label-desc">Analisa a quest\xE3o mas N\xC3O aplica a resposta no DOM.</span>
                    </div>
                    <label class="eq-toggle">
                      <input id="eq-dry-run" type="checkbox" />
                      <div class="eq-toggle-track"><div class="eq-toggle-knob"></div></div>
                    </label>
                  </div>
                  
                  <div class="eq-cfg-row">
                    <div class="eq-cfg-label">
                      <span class="eq-cfg-label-title">${C.moon} Dark Mode no Site Host</span>
                      <span class="eq-cfg-label-desc">For\xE7a inje\xE7\xE3o de CSS para escurecer o site hospedeiro (ex: Moodle).</span>
                    </div>
                    <label class="eq-toggle">
                      <input id="eq-host-dark" type="checkbox" />
                      <div class="eq-toggle-track"><div class="eq-toggle-knob"></div></div>
                    </label>
                  </div>
                  
                  <div class="eq-cfg-row">
                    <div class="eq-cfg-label">
                      <span class="eq-cfg-label-title">${C.bell} Notifica\xE7\xF5es Empilhadas</span>
                      <span class="eq-cfg-label-desc">Acumula hist\xF3rico de toasts (mensagens).</span>
                    </div>
                    <label class="eq-toggle">
                      <input id="eq-toast-stacking" type="checkbox" />
                      <div class="eq-toggle-track"><div class="eq-toggle-knob"></div></div>
                    </label>
                  </div>
                  
                  <div class="eq-cfg-row">
                    <div class="eq-cfg-label">
                      <span class="eq-cfg-label-title">${C.barChart} Exibir Uso de Tokens</span>
                      <span class="eq-cfg-label-desc">Mostra tokens consumidos da API no terminal.</span>
                    </div>
                    <label class="eq-toggle">
                      <input id="eq-show-tokens" type="checkbox" />
                      <div class="eq-toggle-track"><div class="eq-toggle-knob"></div></div>
                    </label>
                  </div>
                  
                  <div class="eq-cfg-row">
                    <div class="eq-cfg-label">
                      <span class="eq-cfg-label-title">${C.volume} Feedback Sonoro</span>
                      <span class="eq-cfg-label-desc">Emite um bip curto ao completar a an\xE1lise.</span>
                    </div>
                    <label class="eq-toggle">
                      <input id="eq-sound-feedback" type="checkbox" />
                      <div class="eq-toggle-track"><div class="eq-toggle-knob"></div></div>
                    </label>
                  </div>
                  
                  <div class="eq-cfg-row">
                    <div class="eq-cfg-label">
                      <span class="eq-cfg-label-title">${C.minimize} Modo Compacto</span>
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
                      <span class="eq-input-prefix-icon">${C.key}</span>
                      <input id="eq-api-key" class="eq-input" type="password" placeholder="AIzaSy..." autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" />
                      <button class="eq-icon-btn" id="eq-key-save" type="button" title="Adicionar Chave">${C.plus}</button>
                      <button class="eq-icon-btn" id="eq-key-more-btn" type="button" title="Mais Op\xE7\xF5es das Chaves">${C.moreVertical}</button>
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
                      <span class="eq-cfg-label-title">${C.image} Vis\xE3o Computacional</span>
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
                      <span class="eq-cfg-label-title">${C.list} Auto Scroll nos Logs</span>
                      <span class="eq-cfg-label-desc">Rola o terminal para o final automaticamente.</span>
                    </div>
                    <label class="eq-toggle">
                      <input id="eq-auto-scroll-logs" type="checkbox" />
                      <div class="eq-toggle-track"><div class="eq-toggle-knob"></div></div>
                    </label>
                  </div>
                  
                  <div class="eq-section-title" style="margin-top: 12px;">Dados Locais</div>
                  <div style="display: flex; gap: 8px;">
                    <button type="button" class="eq-btn-secondary" id="eq-export-config-btn" style="flex: 1;">${C.download} Exportar</button>
                    <button type="button" class="eq-btn-secondary" id="eq-import-config-btn" style="flex: 1;">${C.upload} Importar</button>
                  </div>
                  <input type="file" id="eq-import-file" accept=".json" style="display: none;" />
                  
                  <div class="eq-section-title" style="color: #ff5555; margin-top: 12px;">Zona de Risco</div>
                  <button class="eq-btn-secondary" id="eq-reset-all-btn" type="button" style="border-color: rgba(255,85,85,0.3); color: #ff8888; background: rgba(255,85,85,0.05);">
                    ${C.trash} Resetar Todos os Dados e Mem\xF3ria
                  </button>
                </div>
                
                <!-- CATEGORIA: SOBRE -->
                <div class="eq-settings-cat-content" id="eq-cat-about" style="display: none; flex-direction: column; gap: 16px; align-items: center; justify-content: center; padding-top: 20px;">
                  <div style="text-align: center;">
                    <div style="font-size: 24px; font-weight: 800; color: var(--eq-text-bright); letter-spacing: -0.5px;">EasyQuiz <span style="color: var(--eq-accent);">Legacy</span></div>
                    <div style="font-size: 11px; color: var(--eq-muted); margin-top: 2px;">Vers\xE3o: ${He}</div>
                  </div>
                  
                  <div style="display: flex; flex-direction: column; gap: 8px; width: 100%;">
                    <a href="https://github.com/minifoxie/EasyQuiz" target="_blank" class="eq-btn-secondary" style="text-decoration: none; display: flex; justify-content: center; border: 1px solid var(--eq-border);">${C.github} Reposit\xF3rio Oficial \u2197</a>
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
    `),this.launcherBtn=this.shadow.querySelector(".eq-launcher"),this.launcherDot=this.shadow.querySelector("#eq-launcher-dot"),this.dockToggleBtn=this.shadow.querySelector("#eq-dock-toggle"),this.sidebarEl=this.shadow.querySelector(".eq-sidebar"),this.apToggleBtn=this.shadow.querySelector("#eq-ap-toggle-btn"),this.apConsole=this.shadow.querySelector("#eq-ap-console"),this.executionConsole=this.shadow.querySelector("#eq-execution-console"),this.progressContainer=this.shadow.querySelector("#eq-progress-container"),this.progressBar=this.shadow.querySelector("#eq-progress-bar"),this.progressLabel=this.shadow.querySelector("#eq-progress-label"),this.progressVal=this.shadow.querySelector("#eq-progress-val"),this.contextTreeContainer=this.shadow.querySelector("#eq-tree-container"),this.dotPulseAp=this.shadow.querySelector("#eq-dot-ap"),this.statusTextAp=this.shadow.querySelector("#eq-status-text-ap")||this.shadow.querySelector("#eq-status-summary")||this.dotPulseAp,this.stopwatchAp=this.shadow.querySelector("#eq-stopwatch-ap span"),this.dotPulseAdv=this.dotPulseAp,this.statusTextAdv=this.statusTextAp,this.stopwatchAdv=this.stopwatchAp,this.inspModel=this.shadow.querySelector("#eq-insp-model"),this.inspLatency=this.shadow.querySelector("#eq-insp-latency"),this.inspTokens=this.shadow.querySelector("#eq-insp-tokens"),this.inspPrompt=this.shadow.querySelector("#eq-insp-prompt"),this.inspRationale=this.shadow.querySelector("#eq-insp-rationale"),this.inspActions=this.shadow.querySelector("#eq-insp-actions"),this.copyPromptBtn=this.shadow.querySelector("#eq-copy-prompt-btn"),this.liveDebugTerminal=this.shadow.querySelector("#eq-live-debug-terminal"),this.dbgModel=this.shadow.querySelector("#eq-dbg-model"),this.dbgLatency=this.shadow.querySelector("#eq-dbg-latency"),this.dbgSplitTokens=this.shadow.querySelector("#eq-dbg-split-tokens"),this.dbgTotalTokens=this.shadow.querySelector("#eq-dbg-total-tokens"),this.dbgErrorCard=this.shadow.querySelector("#eq-dbg-error-card"),this.dbgErrorText=this.shadow.querySelector("#eq-dbg-error-text"),this.dbgPromptLen=this.shadow.querySelector("#eq-dbg-prompt-len"),this.dbgPromptView=this.shadow.querySelector("#eq-dbg-prompt-view"),this.dbgContextView=this.shadow.querySelector("#eq-dbg-context-view"),this.dbgRawRespView=this.shadow.querySelector("#eq-dbg-raw-resp-view"),this.dbgCountAll=this.shadow.querySelector("#eq-dbg-count-all"),this.dbgCountError=this.shadow.querySelector("#eq-dbg-count-error"),this.dbgCountAi=this.shadow.querySelector("#eq-dbg-count-ai"),this.dbgCountDom=this.shadow.querySelector("#eq-dbg-count-dom"),this.apiKeyInput=this.shadow.querySelector("#eq-api-key"),this.keyMoreBtn=this.shadow.querySelector("#eq-key-more-btn"),this.keysListEl=this.shadow.querySelector("#eq-keys-list"),this.keysBadgeEl=this.shadow.querySelector("#eq-keys-badge"),this.modelSelect=this.shadow.querySelector("#eq-model-select"),this.modeSelect=this.shadow.querySelector("#eq-mode-select"),this.engineSelect=this.shadow.querySelector("#eq-engine-select"),this.dryRunCheckbox=this.shadow.querySelector("#eq-dry-run"),this.autoApplyCheckbox=this.shadow.querySelector("#eq-auto-apply"),this.autoAdvanceCheckbox=this.shadow.querySelector("#eq-auto-advance"),this.hostDarkModeCheckbox=this.shadow.querySelector("#eq-host-dark"),this.useVisionCheckbox=this.shadow.querySelector("#eq-use-vision"),this.toastStackingCheckbox=this.shadow.querySelector("#eq-toast-stacking"),this.showTokensCheckbox=this.shadow.querySelector("#eq-show-tokens"),this.soundFeedbackCheckbox=this.shadow.querySelector("#eq-sound-feedback"),this.compactModeCheckbox=this.shadow.querySelector("#eq-compact-mode"),this.glowEffectsCheckbox=this.shadow.querySelector("#eq-glow-effects"),this.languageHintSelect=this.shadow.querySelector("#eq-language-hint"),this.autoScrollLogsCheckbox=this.shadow.querySelector("#eq-auto-scroll-logs"),this.analyzeBtn=this.shadow.querySelector("#eq-analyze-btn"),this.applyBtn=this.shadow.querySelector("#eq-apply-btn"),this.applyBtn&&(this.applyBtn.disabled=!0),this.resultContainer=this.shadow.querySelector("#eq-result"),this.floatingAnswers=new Lt(this.shadow,()=>{this.callbacks.onAnalyze(1)});let a=this.shadow.querySelector("#eq-open-hud-btn");a&&a.addEventListener("click",()=>{this.latestPlan&&this.floatingAnswers.show(this.latestPlan)}),Fe.filter(l=>ce(l.id)).forEach(l=>this.modelSelect.add(new Option(l.name,l.id,!1,l.id===e.model))),ja.forEach(l=>this.modeSelect.add(new Option(l.label,l.value,!1,l.value===e.modeHint))),Qa.forEach(l=>this.engineSelect.add(new Option(l.label,l.value,!1,l.value===e.engine))),this.apiKeyInput.value=e.apiKey,this.dryRunCheckbox.checked=e.dryRun,this.autoApplyCheckbox.checked=e.autoApply,this.autoAdvanceCheckbox.checked=e.autoAdvance,this.hostDarkModeCheckbox.checked=e.hostDarkMode,this.useVisionCheckbox.checked=e.useVision,this.toastStackingCheckbox.checked=e.toastStacking??!0,this.showTokensCheckbox&&(this.showTokensCheckbox.checked=e.showTokenUsage??!0),this.soundFeedbackCheckbox&&(this.soundFeedbackCheckbox.checked=e.enableSoundFeedback??!1),this.compactModeCheckbox&&(this.compactModeCheckbox.checked=e.compactMode??!1),this.glowEffectsCheckbox&&(this.glowEffectsCheckbox.checked=e.glowEffects??!1),this.languageHintSelect&&(this.languageHintSelect.value=e.languageHint??"auto"),this.autoScrollLogsCheckbox&&(this.autoScrollLogsCheckbox.checked=e.autoScrollLogs??!0),this.metricsLiveTime=this.shadow.querySelector("#eq-metrics-live-time"),this.metricsLiveStatus=this.shadow.querySelector("#eq-metrics-live-status"),this.metricsTotalBadge=this.shadow.querySelector("#eq-metrics-total-badge"),this.metricTotalTime=this.shadow.querySelector("#eq-metric-total-time"),this.metricAvgTime=this.shadow.querySelector("#eq-metric-avg-time"),this.metricTotalCount=this.shadow.querySelector("#eq-metric-total-count"),this.metricsHistoryList=this.shadow.querySelector("#eq-metrics-history-list"),this.metricsHistoryCount=this.shadow.querySelector("#eq-metrics-history-count"),this.metricsCopyBtn=this.shadow.querySelector("#eq-metrics-copy-btn"),this.metricsResetBtn=this.shadow.querySelector("#eq-metrics-reset-btn"),this.setupEventListeners(),this.updateTimingMetrics(),this.mountHost(),this.applyHostDarkMode(e.hostDarkMode);let n=(()=>{try{return localStorage.getItem("easyquiz_theme")||""}catch{return""}})()||e.theme||"mega-black";this.shadow.host.setAttribute("data-eq-theme",n),this.shadow.host.setAttribute("data-eq-glow",String(e.glowEffects??!1));let s=Array.isArray(e.apiKeys)&&e.apiKeys.length>0?e.apiKeys:e.apiKey?[e.apiKey]:[];X.init(s),this.apiKeyInput.value=X.getBestKey()||e.apiKey||"",this.renderKeysList();let r=window.setInterval(()=>{this.activeTab==="settings"&&this.renderKeysList()},1e3);typeof r?.unref=="function"&&r.unref();let u=X.getBestKey()||e.apiKey;u&&pt(u).then(l=>{l&&l.length>0&&this.updateModelSelect(l,e.model)}).catch(()=>{})}switchTab(e){this.activeTab=e;let t=["resolver","brain","media","metrics","debug","settings"];this.shadow.querySelector(".eq-views-wrapper")?.classList.toggle("is-brain-active",e==="brain");for(let i of t){let n=this.shadow.querySelector(`#eq-tab-${i}`),s=this.shadow.querySelector(`#eq-view-${i}`),r=i===e;n?.classList.toggle("active",r),s&&(s.style.display=r?"flex":"none")}switch(this.updateContextBar(e),e){case"brain":this.initBrainControls(),this.renderContextTree(),this.refreshInspectorView();break;case"metrics":try{this.updateTimingMetrics()}catch{}break;case"debug":this.terminalMode="terminal";try{this.refreshDebugView(),this.renderTerminalEntries(),this.initTerminalREPL(),this.initTerminalWallpaper()}catch{}break;case"settings":try{this.renderThemeGrid()}catch{}break}}updateContextBar(e){let t=this.shadow.querySelector("#eq-ctxbar-icon"),a=this.shadow.querySelector("#eq-ctxbar-name"),i=this.shadow.querySelector("#eq-ctxbar-sub"),n=this.shadow.querySelector("#eq-ctxbar-actions");if(!t||!a||!i||!n)return;n.innerHTML="";let r={resolver:{icon:C.sparkles,label:"Resolver",sub:"Autopilot & opera\xE7\xF5es",color:"#a78bfa",actions:()=>{let u=document.createElement("span");return u.id="eq-ctxbar-status",u.style.cssText="font-size:9px;font-weight:700;padding:2px 7px;border-radius:10px;background:rgba(167,139,250,0.13);border:1px solid rgba(167,139,250,0.25);color:#a78bfa;letter-spacing:0.04em;",u.textContent="PRONTO",[u]}},brain:{icon:C.inspector,label:"C\xE9rebro da IA",sub:"Contexto & inspe\xE7\xE3o",color:"#60a5fa",actions:()=>{let u=this.shadow.querySelector("#eq-brain-canvas-toggle"),l=document.createElement("button");l.style.cssText="display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);border-radius:4px;cursor:pointer;color:#888;",l.innerHTML=this.brainCanvasHidden?C.eyeOff:C.eye,l.title="Mostrar/Ocultar canvas",l.addEventListener("click",()=>{u?.click(),l.innerHTML=this.brainCanvasHidden?C.eyeOff:C.eye});let d=document.createElement("button");return d.style.cssText="display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);border-radius:4px;cursor:pointer;color:#888;",d.innerHTML=C.copy,d.title="Copiar conte\xFAdo selecionado",d.addEventListener("click",()=>this.smartCopy()),[l,d]}},metrics:{icon:C.clock,label:"M\xE9tricas",sub:"Cron\xF4metro & hist\xF3rico",color:"#4ade80",actions:()=>{let u=document.createElement("button");u.style.cssText="display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);border-radius:4px;cursor:pointer;color:#888;",u.innerHTML=C.copy,u.title="Copiar relat\xF3rio",u.addEventListener("click",()=>this.copyMetricsReport());let l=document.createElement("button");return l.style.cssText="display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;background:rgba(255,85,85,0.07);border:1px solid rgba(255,85,85,0.13);border-radius:4px;cursor:pointer;color:#ff5555;",l.innerHTML=C.trash,l.title="Zerar m\xE9tricas",l.addEventListener("click",()=>{this.shadow.querySelector("#eq-metrics-reset-btn")?.click()}),[u,l]}},debug:{icon:C.code,label:"Terminal",sub:"Comandos & logs",color:"#0098ff",actions:()=>{let u=document.createElement("div");u.style.cssText="display:inline-flex;align-items:center;gap:1px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:4px;padding:2px;";let l=(c,h,p)=>{let g=document.createElement("button");return g.id=c,g.type="button",g.textContent=h,g.style.cssText="font-size:9px;font-weight:600;padding:2px 8px;border-radius:3px;cursor:pointer;transition:all 0.1s;background:"+(p?"#1a1a1a":"transparent")+";border:1px solid "+(p?"#333":"transparent")+";color:"+(p?"var(--eq-text-bright)":"#555")+";",g};u.appendChild(l("eq-term-mode-terminal","Terminal",!0)),u.appendChild(l("eq-term-mode-output","Output",!1));let d=document.createElement("button");d.id="eq-term-copy-btn",d.type="button",d.title="Copiar",d.style.cssText="display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:4px;cursor:pointer;color:#888;",d.innerHTML=C.copy;let m=document.createElement("button");return m.id="eq-term-clear-btn",m.type="button",m.title="Limpar",m.style.cssText="display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;background:rgba(255,85,85,0.07);border:1px solid rgba(255,85,85,0.13);border-radius:4px;cursor:pointer;color:#ff5555;",m.innerHTML=C.trash,[u,d,m]}},settings:{icon:C.settings,label:"Configura\xE7\xF5es",sub:"Ajustes & prefer\xEAncias",color:"#fbbf24"}}[e];if(r&&(t.innerHTML=r.icon,t.style.color=r.color,a.textContent=r.label,a.style.color=r.color==="#a78bfa"?"var(--eq-text)":"var(--eq-text-bright)",i.textContent=r.sub,r.actions))for(let u of r.actions())n.appendChild(u)}setupSettingsTabs(){let e=this.shadow.querySelectorAll(".eq-settings-cat-btn"),t=this.shadow.querySelectorAll(".eq-settings-cat-content");e.forEach(a=>{a.addEventListener("click",i=>{let n=i.currentTarget,s=n.dataset.cat;if(!s)return;e.forEach(u=>u.classList.remove("active")),t.forEach(u=>u.style.display="none"),n.classList.add("active");let r=this.shadow.querySelector(`#eq-cat-${s}`);r&&(r.style.display="flex")})}),this.renderThemeGrid()}renderThemeGrid(){let e=this.shadow.querySelector("#eq-theme-grid");if(!e)return;let t=[{id:"mega-black",name:"Mega Black",color:"#000000",border:"rgba(255,255,255,0.14)"},{id:"dark",name:"Dark",color:"#1c1c22",border:"rgba(255,255,255,0.1)"},{id:"purple-neon",name:"Purple Neon",color:"#120824",border:"rgba(160,80,255,0.3)"},{id:"gray-blue",name:"Gray Blue",color:"#282b30",border:"rgba(88,101,242,0.22)"},{id:"light",name:"Light",color:"var(--eq-text-bright)",border:"rgba(0,0,0,0.1)"}],a=localStorage.getItem("easyquiz_theme")||"mega-black";this.shadow.host.setAttribute("data-eq-theme",a),e.innerHTML=t.map(i=>`
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
    `).join(""),e.querySelectorAll(".eq-theme-card").forEach(i=>{i.addEventListener("click",n=>{let s=n.currentTarget,r=s.dataset.themeId;r&&(localStorage.setItem("easyquiz_theme",r),this.shadow.host.setAttribute("data-eq-theme",r),e.querySelectorAll(".eq-theme-card").forEach(u=>u.classList.remove("active")),s.classList.add("active"),this.setStatus(`Tema atualizado para ${r}`,"info"))})})}setupEventListeners(){this.shadow.querySelector("#eq-tab-resolver")?.addEventListener("click",()=>this.switchTab("resolver")),setTimeout(()=>this.updateContextBar(this.activeTab||"resolver"),0),this.shadow.querySelector("#eq-tab-brain")?.addEventListener("click",()=>this.switchTab("brain")),this.shadow.querySelector("#eq-tab-metrics")?.addEventListener("click",()=>this.switchTab("metrics")),this.shadow.querySelector("#eq-tab-debug")?.addEventListener("click",()=>this.switchTab("debug")),this.shadow.querySelector("#eq-tab-settings")?.addEventListener("click",()=>this.switchTab("settings")),this.setupSettingsTabs();let e=this.shadow.querySelector("#eq-status-card");e?.addEventListener("click",()=>{let E=e.classList.toggle("is-collapsed");e.setAttribute("aria-expanded",String(!E))}),this.metricsResetBtn?.addEventListener("click",()=>{$e(),this.stopQuestionTimer(0),this.currentQuestionStartTime=0,this.metricsLiveTime&&(this.metricsLiveTime.textContent="00:00.00"),this.metricsLiveStatus&&(this.metricsLiveStatus.textContent="Em espera",this.metricsLiveStatus.classList.remove("active")),this.updateTimingMetrics(),this.logToConsole("> [SYS] M\xE9tricas e hist\xF3rico de tempo zerados com sucesso.","text-yellow")}),this.metricsCopyBtn?.addEventListener("click",()=>{this.copyMetricsReport()}),this.shadow.querySelector("#eq-dbg-filter-all")?.addEventListener("click",()=>this.setLogFilter("all")),this.shadow.querySelector("#eq-dbg-filter-error")?.addEventListener("click",()=>this.setLogFilter("error")),this.shadow.querySelector("#eq-dbg-filter-ai")?.addEventListener("click",()=>this.setLogFilter("ai")),this.shadow.querySelector("#eq-dbg-filter-dom")?.addEventListener("click",()=>this.setLogFilter("dom"));let t=this.shadow.querySelector("#eq-dbg-copy-logs");t?.addEventListener("click",()=>{let E=this.getFormattedLogs();navigator.clipboard.writeText(E).then(()=>{let L=t.innerHTML;t.innerHTML=C.check,setTimeout(()=>t.innerHTML=L,1800)})}),this.shadow.querySelector("#eq-dbg-clear-logs")?.addEventListener("click",()=>{this.clearLogs()});let a=this.shadow.querySelector("#eq-dbg-copy-prompt");a?.addEventListener("click",()=>{let E=this.latestPromptText||this.latestPlan?.promptSent||"";navigator.clipboard.writeText(E).then(()=>{let L=a.innerHTML;a.innerHTML=`${C.check} Copiado!`,setTimeout(()=>a.innerHTML=L,1800)})});let i=this.shadow.querySelector("#eq-dbg-copy-context");i?.addEventListener("click",()=>{let E=this.dbgContextView?.textContent||"";navigator.clipboard.writeText(E).then(()=>{let L=i.innerHTML;i.innerHTML=`${C.check} Copiado!`,setTimeout(()=>i.innerHTML=L,1800)})});let n=this.shadow.querySelector("#eq-dbg-copy-raw-resp");n?.addEventListener("click",()=>{let E=this.latestPlan?.rawResponse||this.dbgRawRespView?.textContent||"";navigator.clipboard.writeText(E).then(()=>{let L=n.innerHTML;n.innerHTML=`${C.check} Copiado!`,setTimeout(()=>n.innerHTML=L,1800)})});let s=this.shadow.querySelector("#eq-dbg-copy-error-btn");s?.addEventListener("click",()=>{let E=this.lastErrorMsg||"";navigator.clipboard.writeText(E).then(()=>{let L=s.innerHTML;s.innerHTML=C.check,setTimeout(()=>s.innerHTML=L,1800)})}),this.shadow.querySelector("#eq-refresh-context-btn")?.addEventListener("click",()=>{this.renderContextTree()}),this.launcherBtn.addEventListener("click",()=>this.toggle()),this.dockToggleBtn.addEventListener("click",()=>this.toggle()),window.addEventListener("keydown",E=>{E.altKey&&(E.key==="q"||E.key==="Q"||E.key==="a"||E.key==="A")&&(E.preventDefault(),this.toggle())},!0);let r=E=>{let L=E.composedPath();L.includes(this.shadow)||(L.includes(this.sidebarEl)||L.includes(this.host))&&E.stopImmediatePropagation()};window.addEventListener("keydown",r,!0),window.addEventListener("keyup",r,!0),window.addEventListener("keypress",r,!0);let u=E=>E.stopPropagation();this.shadow.addEventListener("keydown",u),this.shadow.addEventListener("keyup",u),this.shadow.addEventListener("keypress",u),this.shadow.addEventListener("paste",u),this.shadow.addEventListener("copy",u),this.shadow.addEventListener("cut",u),this.apiKeyInput.addEventListener("input",()=>{let E=this.apiKeyInput.value.trim().replace(/^["']|["']$/g,"");this.callbacks.onSettingsChange({apiKey:E})});let l=this.shadow.querySelector("#eq-keys-collapsible"),d=this.shadow.querySelector("#eq-keys-chevron"),m=this.shadow.querySelector("#eq-keys-section-header"),c=E=>{l&&(E?(l.style.display="none",d&&(d.style.transform="rotate(0deg)")):(l.style.display="block",l.style.maxHeight="none",l.style.overflow="visible",d&&(d.style.transform="rotate(90deg)")))},h=!1;try{h=localStorage.getItem("easyquiz_keys_collapsed")==="true"}catch{}c(h),m?.addEventListener("click",E=>{if(E.target?.closest("a"))return;let L=l?.style.display==="none";c(!L);try{localStorage.setItem("easyquiz_keys_collapsed",L?"false":"true")}catch{}});let p=this.shadow.querySelector("#eq-auto-menu-btn"),g=this.shadow.querySelector("#eq-auto-menu");g&&(g.hidden=!0),p?.classList.remove("is-open"),p?.addEventListener("click",E=>{if(E.stopPropagation(),!!g){if(this._ctxPopup){this.closeCtxPopup(),p.classList.remove("is-open");return}p.classList.add("is-open"),this.showCtxPopup(p,[{ic:"sparkles",label:"Resolver Autopilot",onClick:()=>{p.classList.remove("is-open"),g.querySelector('[data-auto-action="toggle"]')?.click()}},{ic:"eraser",label:"Limpar mem\xF3ria",onClick:()=>{p.classList.remove("is-open"),g.querySelector('[data-auto-action="memory"]')?.click()}},{ic:"info",label:"Mostrar status",onClick:()=>{p.classList.remove("is-open"),g.querySelector('[data-auto-action="status"]')?.click()}}])}}),g?.querySelectorAll("[data-auto-action]").forEach(E=>{E.addEventListener("click",L=>{L.stopPropagation();let R=E.dataset.autoAction;R==="toggle"?this.analyzeBtn?.click():R==="memory"?(dt(),this.logToConsole("> [SYS] Mem\xF3ria contextual limpa com sucesso.","text-green"),this.setStatus("Mem\xF3ria contextual da sess\xE3o limpa.","success")):R==="status"&&this.shadow.querySelector("#eq-status-card")?.scrollIntoView({behavior:"smooth",block:"nearest"}),g&&(g.hidden=!0),p?.classList.remove("is-open")})}),this.shadow.addEventListener("click",E=>{E.target.closest(".eq-menu-shell")||(g&&(g.hidden=!0),p?.classList.remove("is-open"))});let f=this.shadow.querySelector("#eq-result-toggle"),b=this.shadow.querySelector("#eq-result-body");f&&b&&(b.classList.add("is-collapsed"),f.classList.remove("is-open"),f.addEventListener("click",()=>{let E=f.classList.toggle("is-open");b.classList.toggle("is-collapsed",!E)})),this.shadow.querySelector("#eq-key-save")?.addEventListener("click",()=>{let E=this.apiKeyInput.value.trim().replace(/^["']|["']$/g,"");if(!E){this.setStatus("Insira o valor da chave antes de adicionar.","warning");return}let L=X.addKey(E);if(L.ok){let R=X.exportRawKeys();this.callbacks.onSettingsChange({apiKey:R[0],apiKeys:R}),this.apiKeyInput.value="",this.setStatus(` Nova chave adicionada com sucesso! (${R.length} chaves ativas no pool)`,"success"),c(!1);try{localStorage.setItem("easyquiz_keys_collapsed","false")}catch{}this.renderKeysList(),ht(E).then(Q=>{Q.ok?(X.markSuccess(E,100),this.setStatus(" Nova chave validada com sucesso no Google AI Studio!","success")):(X.markInvalid(E,Q.message),this.setStatus(`\uFE0F Chave cadastrada, mas aviso retornado: ${Q.message}`,"warning")),this.renderKeysList()}).catch(()=>{})}else this.setStatus(L.message,"warning")}),this.shadow.addEventListener("click",E=>{let L=E.target;!L.closest("#eq-key-context-menu")&&L.closest("#eq-key-more-btn")});let y=()=>{let E=window.prompt("Adicionar Nova Chave API do Google Gemini (AI Studio):");if(E!==null&&E.trim()){let L=E.trim().replace(/^["']|["']$/g,""),R=X.addKey(L);if(R.ok){let Q=X.exportRawKeys();this.callbacks.onSettingsChange({apiKey:Q[0],apiKeys:Q}),this.setStatus("Chave Gemini adicionada com sucesso!","success"),this.renderKeysList()}else this.setStatus(R.message,"warning")}},x=async()=>{try{let E=await navigator.clipboard.readText();if(E){let L=E.trim().replace(/^["']|["']$/g,"");this.apiKeyInput.value=L,this.setStatus('Chave colada no campo. Clique no bot\xE3o "+" para adicionar ao pool.',"info")}}catch{let E=window.prompt("Adicionar Nova Chave API do Google Gemini:");if(E!==null&&E.trim()){let L=E.trim().replace(/^["']|["']$/g,"");if(X.addKey(L).ok){let Q=X.exportRawKeys();this.callbacks.onSettingsChange({apiKey:Q[0],apiKeys:Q}),this.setStatus("Chave Gemini adicionada com sucesso!","success"),this.renderKeysList()}}}},w=()=>{let E=this.apiKeyInput.type==="password";this.apiKeyInput.type=E?"text":"password";let L=this.shadow.querySelector("#eq-menu-vis-icon"),R=this.shadow.querySelector("#eq-menu-vis-text");L&&(L.innerHTML=E?C.eyeOff:C.eye),R&&(R.textContent=E?"Ocultar Campo":"Mostrar Campo")},q=()=>{this.apiKeyInput.value="",this.setStatus("Campo de inser\xE7\xE3o limpo.","info"),this.apiKeyInput.focus()},S=()=>{this.shadow.querySelector("#eq-bulk-overlay")?.remove();let E=document.createElement("div");E.id="eq-bulk-overlay",E.style.cssText=["position:fixed","inset:0","z-index:2147483647","pointer-events:auto","background:rgba(0,0,0,0.78)","backdrop-filter:blur(4px)","-webkit-backdrop-filter:blur(4px)","display:flex","align-items:center","justify-content:center",'font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif',"user-select:text","-webkit-user-select:text"].join(";");let L=document.createElement("div");L.style.cssText=["background:#11151c","color:#e2e8f0","border:1px solid #283548","border-radius:12px","padding:20px","width:440px","max-width:92vw","font-size:13px","box-shadow:0 12px 40px rgba(0,0,0,0.85), 0 0 0 1px rgba(0,229,255,0.15)","display:flex","flex-direction:column","gap:10px","pointer-events:auto"].join(";"),L.innerHTML=`
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
      `,E.appendChild(L),this.shadow.appendChild(E);let R=L.querySelector("#eq-bulk-ta"),Q=L.querySelector("#eq-bulk-status"),V=L.querySelector("#eq-bulk-import"),Y=L.querySelector("#eq-bulk-paste-btn"),W=L.querySelector("#eq-bulk-clear-btn");requestAnimationFrame(()=>R?.focus());let Z=()=>{E.remove()};["keydown","keyup","keypress","paste","copy","cut"].forEach(G=>{E.addEventListener(G,oe=>{oe.stopPropagation()})}),E.addEventListener("keydown",G=>{G.key==="Escape"&&Z()}),E.addEventListener("click",G=>{G.target===E&&Z()}),L.querySelector("#eq-bulk-x")?.addEventListener("click",Z),L.querySelector("#eq-bulk-cancel")?.addEventListener("click",Z),W.addEventListener("click",()=>{R.value="",Q.textContent="",R.focus()}),Y.addEventListener("click",async()=>{try{let G=await navigator.clipboard?.readText();G?(R.value=G,R.focus(),Q.style.color="#38bdf8",Q.textContent="Conte\xFAdo colado da \xE1rea de transfer\xEAncia com sucesso!"):(Q.style.color="#fbbf24",Q.textContent="\xC1rea de transfer\xEAncia vazia ou sem permiss\xE3o de leitura.")}catch{Q.style.color="#fbbf24",Q.textContent="Permiss\xE3o de clipboard negada pelo navegador. Use Ctrl+V diretamente na caixa.",R.focus()}}),L.querySelector("#eq-bulk-import")?.addEventListener("click",async()=>{let G=R.value.trim();if(!G){Q.style.color="#f87171",Q.textContent="Insira pelo menos uma chave de API antes de importar.";return}let oe=G.match(/AIza[0-9A-Za-z\-_]{35}|AQ\.[0-9A-Za-z\-_]{20,}/g),fe=[];if(oe&&oe.length>0?fe=Array.from(new Set(oe)):fe=Array.from(new Set(G.split(/[\n,;\s]+/).map(ve=>ve.trim().replace(/^["'`]|["'`]$/g,"")).filter(ve=>ve.length>=20))),fe.length===0){Q.style.color="#f87171",Q.textContent="Nenhuma chave v\xE1lida encontrada (m\xEDnimo 20 caracteres).";return}Q.style.color="#00e5ff",Q.textContent=`Processando ${fe.length} chave(s)...`,V.disabled=!0,V.style.opacity="0.6";let be=0,Pe=0;for(let ve of fe){let Qe=X.addKey(ve);Qe.ok?be++:Qe.message.includes("j\xE1 est\xE1 cadastrada")&&Pe++}if(be>0){let ve=X.exportRawKeys();this.callbacks.onSettingsChange({apiKey:ve[0],apiKeys:ve}),c(!1);try{localStorage.setItem("easyquiz_keys_collapsed","false")}catch{}}Q.textContent=`${be} adicionada(s), ${Pe} duplicada(s). Validando modelo em paralelo...`;let Ee=X.exportRawKeys(),It=this.modelSelect?.value||"gemini-3.5-flash-lite",je=await Ft(It,Ee);je.ok?(X.markSuccess(je.key,200),Q.style.color="#4ade80",Q.textContent=` ${be} adicionada(s), ${Pe} duplicada(s). Modelo '${je.model}' pronto!`):(Q.style.color="#fbbf24",Q.textContent=`${be} adicionada(s), ${Pe} duplicada(s). Aviso: ${je.message}`),this.renderKeysList(),V.disabled=!1,V.style.opacity="1",be>0&&(this.setStatus(` Lote importado: ${be} chave(s) adicionada(s) ao pool!`,"success"),setTimeout(Z,2200))})},T=()=>{this.shadow.querySelector("#eq-text-editor-overlay")?.remove();let E=X.exportRawKeys(),L=document.createElement("div");L.id="eq-text-editor-overlay",L.style.cssText=["position:fixed","inset:0","z-index:2147483647","pointer-events:auto","background:rgba(0,0,0,0.82)","backdrop-filter:blur(4px)","-webkit-backdrop-filter:blur(4px)","display:flex","align-items:center","justify-content:center",'font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif'].join(";");let R=document.createElement("div");R.style.cssText=["background:#11151c","color:#e2e8f0","border:1px solid #283548","border-radius:12px","padding:20px","width:460px","max-width:94vw","font-size:13px","box-shadow:0 12px 40px rgba(0,0,0,0.85),0 0 0 1px rgba(0,229,255,0.15)","display:flex","flex-direction:column","gap:10px","pointer-events:auto"].join(";"),R.innerHTML=`
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
      `,L.appendChild(R),this.shadow.appendChild(L);let Q=R.querySelector("#eq-edittext-ta"),V=R.querySelector("#eq-edittext-status");Q.value=E.join(`
`),requestAnimationFrame(()=>{Q.focus(),Q.select()});let Y=()=>L.remove();["keydown","keyup","keypress","paste","copy","cut"].forEach(W=>{L.addEventListener(W,Z=>{Z.stopPropagation(),Z.stopImmediatePropagation()},!0)}),L.addEventListener("keydown",W=>{W.key==="Escape"&&Y()}),L.addEventListener("click",W=>{W.target===L&&Y()}),R.querySelector("#eq-edittext-x")?.addEventListener("click",Y),R.querySelector("#eq-edittext-cancel")?.addEventListener("click",Y),R.querySelector("#eq-edittext-clear")?.addEventListener("click",()=>{confirm("Apagar todas as chaves? Esta a\xE7\xE3o \xE9 irrevers\xEDvel.")&&(Q.value="",V.style.color="#fbbf24",V.textContent="Campo limpo. Clique em Salvar para confirmar a remo\xE7\xE3o de todas as chaves.")}),R.querySelector("#eq-edittext-save")?.addEventListener("click",()=>{let W=Q.value.split(/[\n\r]+/).map(oe=>oe.trim().replace(/^["']|["']$/g,"")).filter(oe=>oe.length>5),Z=Array.from(new Set(W));X.init(Z);let G=X.exportRawKeys();this.callbacks.onSettingsChange({apiKey:G[0]||"",apiKeys:G}),this.renderKeysList(),V.style.color="#4ade80",Z.length===0?V.textContent=" Todas as chaves removidas.":V.textContent=` ${Z.length} chave(s) salva(s) com sucesso!`,this.setStatus(Z.length>0?` ${Z.length} chave(s) salva(s)!`:"Todas as chaves foram removidas.",Z.length>0?"success":"info"),setTimeout(Y,1400)})},A=()=>{let E=X.getAllKeys();if(E.length===0)return this.setStatus("Nenhuma chave para apagar.","info");confirm(`Apagar todas as ${E.length} chave(s) permanentemente?`)&&(X.init([]),this.callbacks.onSettingsChange({apiKey:"",apiKeys:[]}),this.renderKeysList(),this.setStatus("Todas as chaves foram removidas.","info"))},P=async()=>{let E=X.getAllKeys();if(E.length===0)return this.setStatus("Nenhuma chave cadastrada para testar.","error");this.setStatus(` Testando ${E.length} chave(s) em paralelo...`,"info");let L=this.modelSelect?.value||"gemini-3.5-flash-lite",R=E.map(V=>V.key),Q=await Ft(L,R);if(Q.ok)X.markSuccess(Q.key,150),this.setStatus(` Validado! Modelo '${Q.model}' respondeu com sucesso!`,"success");else{let V=await Promise.allSettled(R.map(W=>ht(W))),Y=0;V.forEach((W,Z)=>{if(W.status==="fulfilled"&&W.value.ok)Y++,X.markSuccess(R[Z],200);else{let G=W.status==="fulfilled"?W.value.message:String(W.reason);X.markInvalid(R[Z],G)}}),this.setStatus(`Teste: ${Y}/${E.length} chave(s) v\xE1lidas. ${Q.message}`,Y>0?"info":"error")}this.renderKeysList()},z=()=>{window.confirm("Deseja realmente resetar todos os dados, chaves e mem\xF3ria de sess\xE3o do EasyQuiz?")&&(this.autopilot.isActive()&&this.autopilot.stop(),this.updateAutopilotUi(!1),this.setBusy(!1),io(),$e(),this.stopQuestionTimer(0),this.currentQuestionStartTime=0,this.metricsLiveTime&&(this.metricsLiveTime.textContent="00:00.00"),this.metricsLiveStatus&&(this.metricsLiveStatus.textContent="Em espera",this.metricsLiveStatus.className="eq-live-stopwatch-status"),this.updateTimingMetrics(),this.apiKeyInput.value="",this.callbacks.onSettingsChange({apiKey:""}),this.setStatus("Todos os dados do EasyQuiz foram limpos.","info"),this.logToConsole("> [SYS] Armazenamento local resetado.","text-yellow"))};this.shadow.querySelector("#eq-reset-all-btn")?.addEventListener("click",z),this.keyMoreBtn.addEventListener("click",E=>{if(E.stopPropagation(),this._ctxPopup){this.closeCtxPopup();return}this.showCtxPopup(this.keyMoreBtn,[{ic:"edit",label:"Inserir via Janela Nativa",badge:"Bypass",onClick:()=>y()},{ic:"paste",label:"Colar da \xC1rea de Transfer\xEAncia",onClick:()=>x()},{ic:"eye",label:"Mostrar/Ocultar Campo",onClick:()=>w()},{ic:"eraser",label:"Limpar Campo",onClick:()=>q()},{ic:"upload",label:"Importar Chaves em Lote",onClick:()=>S()},{ic:"code",label:"Ver/Editar Chaves como Texto",onClick:()=>T()},{ic:"zap",label:"Testar Todas as Chaves",onClick:()=>P()},{divider:!0,label:"",onClick:()=>{}},{ic:"trash",label:"Apagar Todas as Chaves",danger:!0,onClick:()=>A()},{ic:"refreshCw",label:"Resetar Todos os Dados",danger:!0,onClick:()=>z()}])}),this.apToggleBtn?.addEventListener("click",()=>{if(this.autopilot.isActive())this.autopilot.stop(),this.callbacks.onCancel?.(),this.setProgress(0),this.updateAutopilotUi(!1),this.setInterrupted("Autopilot interrompido imediatamente pelo usu\xE1rio.");else{if(!this.apiKeyInput.value.trim().replace(/^["']|["']$/g,"")){this.setStatus("Configure sua chave de API Gemini na aba Configura\xE7\xF5es antes de ligar o Autopilot.","error"),this.switchTab("settings"),this.apiKeyInput.focus();return}this.callbacks.onSettingsChange({autoApply:!0,autoAdvance:!0}),this.autoApplyCheckbox.checked=!0,this.autoAdvanceCheckbox.checked=!0,Ut(),this.autopilot.start(),this.updateAutopilotUi(!0),this.startStopwatch(),this.setStatus("Autopilot ativo. Monitorando exerc\xEDcios...","info")}}),this.shadow.querySelector("#eq-ap-clear-memory")?.addEventListener("click",()=>{dt(),this.logToConsole("> [SYS] Mem\xF3ria contextual limpa com sucesso.","text-green"),this.setStatus("Mem\xF3ria contextual da sess\xE3o limpa.","success")});let k=this.shadow.querySelector("#eq-copy-console-btn");k?.addEventListener("click",()=>{let E=this.apConsole?.innerText||"";navigator.clipboard.writeText(E).then(()=>{let L=k.innerHTML;k.innerHTML=C.check,setTimeout(()=>k.innerHTML=L,1800)})}),this.copyPromptBtn?.addEventListener("click",()=>{let E=this.inspPrompt.textContent||"";navigator.clipboard.writeText(E).then(()=>{if(!this.copyPromptBtn)return;let L=this.copyPromptBtn.innerHTML;this.copyPromptBtn.innerHTML=`${C.check} Copiado!`,setTimeout(()=>{this.copyPromptBtn&&(this.copyPromptBtn.innerHTML=L)},2e3)})}),this.modelSelect.addEventListener("change",()=>this.callbacks.onSettingsChange({model:this.modelSelect.value})),this.modeSelect.addEventListener("change",()=>this.callbacks.onSettingsChange({modeHint:this.modeSelect.value})),this.engineSelect.addEventListener("change",()=>this.callbacks.onSettingsChange({engine:this.engineSelect.value})),this.dryRunCheckbox.addEventListener("change",()=>this.callbacks.onSettingsChange({dryRun:this.dryRunCheckbox.checked})),this.autoApplyCheckbox.addEventListener("change",()=>this.callbacks.onSettingsChange({autoApply:this.autoApplyCheckbox.checked})),this.autoAdvanceCheckbox.addEventListener("change",()=>this.callbacks.onSettingsChange({autoAdvance:this.autoAdvanceCheckbox.checked})),this.useVisionCheckbox.addEventListener("change",()=>{let E=this.useVisionCheckbox.checked;this.callbacks.onSettingsChange({useVision:E}),this.setStatus(E?"Vis\xE3o Computacional ativada (capturas habilitadas).":"Modo DOM R\xE1pido ativado (capturas desabilitadas).","info")}),this.hostDarkModeCheckbox.addEventListener("change",()=>{let E=this.hostDarkModeCheckbox.checked;this.callbacks.onSettingsChange({hostDarkMode:E}),this.applyHostDarkMode(E)}),this.toastStackingCheckbox?.addEventListener("change",()=>this.callbacks.onSettingsChange({toastStacking:this.toastStackingCheckbox.checked})),this.showTokensCheckbox?.addEventListener("change",()=>this.callbacks.onSettingsChange({showTokenUsage:this.showTokensCheckbox.checked})),this.soundFeedbackCheckbox?.addEventListener("change",()=>this.callbacks.onSettingsChange({enableSoundFeedback:this.soundFeedbackCheckbox.checked})),this.compactModeCheckbox?.addEventListener("change",()=>this.callbacks.onSettingsChange({compactMode:this.compactModeCheckbox.checked})),this.glowEffectsCheckbox?.addEventListener("change",()=>{let E=this.glowEffectsCheckbox.checked;this.shadow.host.setAttribute("data-eq-glow",String(E)),this.callbacks.onSettingsChange({glowEffects:E})}),this.languageHintSelect?.addEventListener("change",()=>this.callbacks.onSettingsChange({languageHint:this.languageHintSelect.value})),this.autoScrollLogsCheckbox?.addEventListener("change",()=>this.callbacks.onSettingsChange({autoScrollLogs:this.autoScrollLogsCheckbox.checked})),this.analyzeBtn?.addEventListener("click",async()=>{if(this.analyzeBtn.classList.contains("danger")){this.autopilot.stop(),this.callbacks.onCancel?.(),this.setProgress(0),this.updateAutopilotUi(!1),this.setBusy(!1),this.setInterrupted("Resolver Autopilot interrompido pelo usu\xE1rio.");return}if(!(X.getBestKey()||this.apiKeyInput.value.trim().replace(/^['"]|['"]$/g,""))){this.setStatus("Configure sua chave de API Gemini antes de ativar o Resolver Autopilot.","error"),this.switchTab("settings"),this.apiKeyInput.focus();return}this.callbacks.onSettingsChange({autoApply:!0,autoAdvance:!0}),this.autoApplyCheckbox.checked=!0,this.autoAdvanceCheckbox.checked=!0,Ut(),this.autopilot.start(),this.updateAutopilotUi(!0),this.startStopwatch(),this.setStatus("Resolver Autopilot ativo. Monitorando e respondendo...","info")}),this.applyBtn&&this.applyBtn.addEventListener("click",()=>this.callbacks.onApply())}startStopwatch(){this.stopStopwatch(),this.stopwatchStartTime=Date.now();let e=()=>{let t=((Date.now()-this.stopwatchStartTime)/1e3).toFixed(2)+"s";this.stopwatchAp&&(this.stopwatchAp.textContent=t),this.stopwatchAdv&&(this.stopwatchAdv.textContent=t)};e(),this.stopwatchInterval=setInterval(e,100)}stopStopwatch(e){if(this.stopwatchInterval&&(clearInterval(this.stopwatchInterval),this.stopwatchInterval=null),e!==void 0){let t=(e/1e3).toFixed(2)+"s";this.stopwatchAp&&(this.stopwatchAp.textContent=t),this.stopwatchAdv&&(this.stopwatchAdv.textContent=t)}}setLogFilter(e){this.activeLogFilter=e;let t=["all","error","ai","dom"];for(let a of t){let i=this.shadow.querySelector(`#eq-dbg-filter-${a}`);a===e?i?.classList.add("active"):i?.classList.remove("active")}this.renderTerminalEntries()}updateLogCounters(){let e=0,t=0,a=0;for(let i of this.logEntries)i.category==="error"?e++:i.category==="ai"?t++:i.category==="dom"&&a++;this.dbgCountAll&&(this.dbgCountAll.textContent=String(this.logEntries.length)),this.dbgCountError&&(this.dbgCountError.textContent=String(e)),this.dbgCountAi&&(this.dbgCountAi.textContent=String(t)),this.dbgCountDom&&(this.dbgCountDom.textContent=String(a))}renderTerminalEntries(){if(!this.liveDebugTerminal)return;this.liveDebugTerminal.replaceChildren();let e=this.activeLogFilter==="all"?[...this.logEntries]:this.logEntries.filter(t=>t.category===this.activeLogFilter);if(this.outputSearchQuery){let t=this.outputSearchQuery.toLowerCase();e=e.filter(a=>a.message.toLowerCase().includes(t))}if(this.outputSortNewest||(e=e.reverse()),e.length===0){let t=document.createElement("div");t.style.cssText="color:#333;font-style:italic;white-space:pre-wrap;",t.textContent=this.outputSearchQuery?'Nenhum resultado para "'+this.outputSearchQuery+'".':'Nenhum log para o filtro "'+this.activeLogFilter.toUpperCase()+'".',this.liveDebugTerminal.appendChild(t);return}for(let t of e){let a=document.createElement("div");a.style.cssText="padding:1px 0;white-space:pre-wrap;overflow-wrap:break-word;word-break:break-word;max-width:100%;",a.textContent=t.message,t.colorClass&&(a.className=t.colorClass),this.liveDebugTerminal.appendChild(a)}this.autoScrollLogs&&(this.liveDebugTerminal.scrollTop=this.liveDebugTerminal.scrollHeight)}appendTerminalLine(e,t){if(!this.liveTerminalOutput)return;let a=this.shadow.querySelector("#eq-term-current-line"),i=document.createElement("div");i.style.cssText="padding:0;white-space:pre-wrap;overflow-wrap:break-word;",i.textContent=e;let n=t==="text-red"?"#ff4444":t==="text-blue"?"#888":t==="text-green"?"#aaa":t==="text-yellow"?"#888":"var(--eq-text)";for(i.style.color=n,a?this.liveTerminalOutput.insertBefore(i,a):this.liveTerminalOutput.appendChild(i);this.liveTerminalOutput.children.length>600;){let s=this.liveTerminalOutput.firstChild;if(s&&s!==a)this.liveTerminalOutput.removeChild(s);else break}this.liveTerminalOutput.scrollTop=this.liveTerminalOutput.scrollHeight}initTerminalREPL(){if(this.liveTerminalOutput=this.shadow.querySelector("#eq-term-output"),this._terminalInited){this._reconnectContextbarBtns();return}this._terminalInited=!0;let e=this.shadow.querySelector("#eq-term-capture"),t=this.shadow.querySelector("#eq-term-output"),a=this.shadow.querySelector("#eq-term-typed"),i=this.shadow.querySelector("#eq-term-current-line"),n=this.shadow.querySelector("#eq-term-panel-terminal"),s=this.shadow.querySelector("#eq-term-panel-output"),r=this.shadow.querySelector("#eq-output-toolbar"),u=this.shadow.querySelector("#eq-output-search"),l=this.shadow.querySelector("#eq-output-search-clear"),d=this.shadow.querySelector("#eq-output-filter-btn"),m=this.shadow.querySelector("#eq-output-filter-menu"),c=this.shadow.querySelector("#eq-fchk-apply"),h=(I,B="#888",D=13)=>`<span data-icon="1" aria-hidden="true" style="display:inline-flex;vertical-align:middle;width:${D}px;height:${D}px;color:${B};flex-shrink:0;isolation:isolate;">${C[I]||""}</span>`,p=(I,B="")=>{if(!t||!i)return;let D=document.createElement("div");D.style.cssText="padding:0;white-space:pre-wrap;overflow-wrap:break-word;word-break:break-word;max-width:100%;line-height:1.65;"+B,D.innerHTML=I,t.insertBefore(D,i)},g=(I,B="var(--eq-text)ccc")=>p(`<span style="color:${B};">${I}</span>`),f=()=>g("","#000"),b=(I=52)=>g("  "+"\u2500".repeat(I),"#222"),v=(I,B,D)=>{let M=I.map((U,K)=>U.padEnd(B[K]||0)),O=D?M.map((U,K)=>`<span style="color:${D[K]||"#aaa"}">${U}</span>`):M.map(U=>`<span style="color:#aaa">${U}</span>`);p("  "+O.join("  ")+"  ")},y=I=>{let B="";return I.childNodes.forEach(D=>{if(D.nodeType===Node.TEXT_NODE)B+=D.textContent||"";else if(D.nodeType===Node.ELEMENT_NODE){let M=D;M.dataset?.icon||(B+=y(M))}}),B},x=(I,B="#1a1a1a",D=2)=>{if(!t||!i){I();return}let M=i.previousSibling;I();let O=[],U=M?M.nextSibling:t.firstChild;for(;U&&U!==i;)O.push(U),U=U.nextSibling;if(!O.length)return;let K=document.createElement("div");K.style.cssText=`margin:${D}px 4px;outline:1px solid ${B};outline-offset:-1px;border-radius:3px;overflow:hidden;`,t.insertBefore(K,i),O.forEach(ee=>K.appendChild(ee))},w=I=>{let B=I.trim().replace(/\s+/g," ").split(" "),D=B[0].toLowerCase().replace(/[^a-z0-9\-]/g,"");switch(D){case"help":x(()=>{f(),p("  "+h("terminal","#555",14)+' <span style="color:#888;font-weight:700;letter-spacing:0.1em;font-size:10px;"> COMANDOS DO TERMINAL</span>'),f(),[["help","lista todos os comandos","list","#555"],["status","estado atual do sistema","sparkles","#555"],["version","vers\xE3o e info do build","info","#555"],["info-api","dados da \xFAltima requisi\xE7\xE3o \xE0 API","chip","#555"],["tokens","tokens consumidos (detalhado)","code","#555"],["context","contexto da quest\xE3o atual","eye","#555"],["controls","controles detectados (tabela)","list","#555"],["errors","erros recentes registrados","info","#555"],["logs [n]","\xFAltimas N entradas do output","file","#555"],["history","hist\xF3rico de quest\xF5es respondidas","clock","#555"],["reset","limpa logs e m\xE9tricas","eraser","#555"],["clear","limpa o terminal","trash","#555"],["copy","copia terminal para clipboard","copy","#555"]].forEach(([O,U,K,ee])=>{p(`    ${h(K,ee,11)} <span style="color:#aaa;font-weight:700;min-width:72px;display:inline-block;">${O}</span>  <span style="color:#444;">${U}</span>`)}),f(),g("  Dica: \u2191 \u2193 para hist\xF3rico de comandos","#1e1e1e"),f()},"#1a1a1a");break;case"clear":t&&i&&[...t.children].forEach(O=>{O!==i&&O.dataset?.perm!=="1"&&O.remove()});return;case"info-api":{let M=this.latestPlan;if(!M){f(),g("  Nenhuma requisi\xE7\xE3o \xE0 API ainda.","#333"),f();break}x(()=>{f(),p("  "+h("chip","#444",14)+' <span style="color:#777;font-weight:700;letter-spacing:0.08em;font-size:10px;"> API \u2014 \xDALTIMA REQUISI\xC7\xC3O</span>'),b(44);let O=(U,K,ee,ne,Ke="#888")=>p(`  ${h(U,K,11)}  <span style="color:#444;">${ee.padEnd(16)}</span><span style="color:${Ke};font-weight:600;">${ne||"--"}</span>`);O("sparkles","#555","Modelo",M?.usedModel||this.initialSettings?.model||"--","#bbb"),O("clock","#444","Lat\xEAncia",M?.durationMs?M.durationMs+"ms":"--","#888"),O("code","#444","Prompt tokens",String(M?.promptTokens??"--"),"#777"),O("code","#444","Resp. tokens",String(M?.candidatesTokens??"--"),"#777"),O("chip","#555","Total tokens",String(M?.tokensUsed??"--"),"#aaa"),O("file","#444","Prompt chars",this.latestPromptText?.length?this.latestPromptText.length+" chars":"--","#777"),f()},"#1a1a1a");break}case"version":x(()=>{f(),p("  "+h("sparkles","#555",14)+` <span style="color:#bbb;font-weight:700;letter-spacing:0.04em;"> EasyQuiz ${typeof He<"u"?He:"?"}</span>`),g("  Motor H\xEDbrido 4.0  \xB7  RAG \xB7 AST \xB7 Vision \xB7 Multimodal","#444"),g("  Build: "+new Date().toLocaleDateString("pt-BR"),"#2a2a2a"),f()},"#1a1a1a");break;case"status":{let M=this.latestPlan,O=this.latestContext;x(()=>{f(),p("  "+h("inspector","#444",14)+' <span style="color:#777;font-weight:700;letter-spacing:0.08em;font-size:10px;"> STATUS DO SISTEMA</span>'),b(44);let U=(Vo,Ko,Go,Jo,Wo="#aaa")=>p(`  ${h(Vo,Ko,11)}  <span style="color:#444;">${Go.padEnd(14)}</span><span style="color:${Wo};font-weight:600;">${Jo||"--"}</span>`);U("sparkles","#666","Modelo",M?.usedModel||this.initialSettings?.model||"--","var(--eq-text)");let K=M?.mode||"aguardando",ee=K==="aguardando"?"#444":K.includes("error")?"#7a3333":"#4a6a4a";U("play","#555","Modo",K,ee);let ne=M?.durationMs,Ke=ne?ne<1e3?"#4a6a4a":ne<3e3?"#888":"#7a5533":"#333";U("clock","#555","Lat\xEAncia",ne?ne+"ms":"--",Ke),U("chip","#555","Tokens",M?.tokensUsed?String(M.tokensUsed):"--","#aaa");let ze=M?Math.round((M.confidence||0)*100):null,Ge=ze?ze>=80?"#4a6a4a":ze>=50?"#888":"#7a5533":"#333";U("analyze","#555","Confian\xE7a",ze!==null?ze+"%":"--",Ge),U("eye","#555","Controles",O?String(O.controls.length):"--","#888"),O&&(b(44),g("  "+O.questionText.slice(0,56)+(O.questionText.length>56?"\u2026":""),"#333")),f()},"#1a1a1a");break}case"tokens":{let M=this.latestPlan;if(!M){f(),g("  Nenhuma requisi\xE7\xE3o ainda.","#333"),f();break}x(()=>{f(),p("  "+h("code","#444",14)+' <span style="color:#777;font-weight:700;letter-spacing:0.08em;font-size:10px;"> TOKENS \u2014 \xDALTIMA REQUISI\xC7\xC3O</span>'),b(38);let O=M.promptTokens||0,U=M.candidatesTokens||0,K=O+U||1,ee=Math.round(O/K*20),ne=20-ee;g(`  Prompt tokens    ${String(O).padStart(8)}   [${"\u2588".repeat(ee)}${"\u2591".repeat(ne)}]`,"#555"),g(`  Response tokens  ${String(U).padStart(8)}   [${"\u2591".repeat(ee)}${"\u2588".repeat(ne)}]`,"#555"),g("  "+"\u2508".repeat(46),"#1e1e1e"),g(`  Total            ${String(M.tokensUsed??"--").padStart(8)}`,"#aaa"),g(`  Lat\xEAncia         ${(M.durationMs?M.durationMs+"ms":"--").padStart(8)}`,"#444"),f()},"#1a1a1a");break}case"context":{let M=this.latestContext;if(!M){f(),g("  Contexto n\xE3o dispon\xEDvel.","#333"),f();break}x(()=>{f(),p("  "+h("eye","#444",14)+' <span style="color:#777;font-weight:700;letter-spacing:0.08em;font-size:10px;"> CONTEXTO ATUAL</span>'),b(44),g("  Escopo     "+M.scope.tagName.toLowerCase()+(M.scope.id?"#"+M.scope.id:""),"#666"),g("  Controles  "+M.controls.length,"#555"),b(44),g("  "+M.questionText.slice(0,58)+(M.questionText.length>58?"\u2026":""),"#444"),f()},"#1a1a1a");break}case"controls":{let M=this.latestContext;if(!M?.controls.length){f(),g("  Nenhum controle detectado.","#333"),f();break}x(()=>{f(),p("  "+h("list","#444",14)+` <span style="color:#777;font-weight:700;letter-spacing:0.08em;font-size:10px;"> CONTROLES (${M.controls.length})</span>`),b(55),v(["#","Tipo","Label / ID","Valor"],[3,10,27,10],["#444","#555","#888","#666"]),g("  "+"\u2508".repeat(53),"#1a1a1a"),M.controls.forEach((O,U)=>v([String(U+1),(O.type||O.tag||"?").toUpperCase().slice(0,9),(O.label||O.id||O.name||"\u2014").slice(0,26),(O.value||"\u2014").slice(0,9)],[3,10,27,10],["#444","#555","#999","#777"])),f()},"#1a1a1a");break}case"errors":{let M=this.logEntries.filter(O=>O.category==="error");if(!M.length){f(),p("  "+h("check","#4a6a4a",13)+' <span style="color:#4a6a4a;font-weight:600;"> Nenhum erro</span><span style="color:#2a3a2a;"> nesta sess\xE3o \u2014 tudo ok.</span>'),f();break}x(()=>{f(),p("  "+h("info","#7a3333",14)+` <span style="color:#777;font-weight:700;letter-spacing:0.08em;font-size:10px;"> ERROS (${M.length})</span>`),b(44),M.slice(-15).forEach(O=>g("  "+O.message,"#666")),f()},"#2a1a1a");break}case"logs":{let M=Math.min(parseInt(B[1]||"10",10)||10,50),O=this.logEntries.slice(-M);if(!O.length){f(),g("  Nenhum log registrado.","#333"),f();break}x(()=>{f(),p("  "+h("file","#444",14)+` <span style="color:#777;font-weight:700;letter-spacing:0.08em;font-size:10px;"> \xDALTIMAS ${M} ENTRADAS</span>`),b(44),O.forEach(U=>g("  "+U.message,"#555")),f()},"#1a1a1a");break}case"history":{let M=this.metricsHistory;if(!M?.length){f(),g("  Nenhuma quest\xE3o respondida ainda.","#333"),f();break}x(()=>{f(),p("  "+h("clock","#444",14)+` <span style="color:#777;font-weight:700;letter-spacing:0.08em;font-size:10px;"> HIST\xD3RICO (${M.length})</span>`),b(58),v(["#","Quest\xE3o","Tempo","Modelo"],[3,38,7,10],["#444","#666","#555","#555"]),g("  "+"\u2508".repeat(58),"#1a1a1a"),M.slice(-15).forEach((O,U)=>v([String(U+1),(O.questionTitle||"Quest\xE3o").slice(0,37),O.durationMs?(O.durationMs/1e3).toFixed(1)+"s":"--",(O.model||"--").slice(0,9)],[3,38,7,10],["#444","#aaa","#777","#666"])),f()},"#1a1a1a");break}case"reset":this.clearLogs(),f(),p("  "+h("check","#4a6a4a",13)+' <span style="color:#4a6a4a;font-weight:600;"> Resetado</span><span style="color:#444;">  \u2014 logs e m\xE9tricas zerados.</span>'),f();break;case"copy":{if(!t)break;let M=Array.from(t.children).filter(O=>O!==i&&O.id!=="eq-click-cursor"&&O.id!=="eq-term-sel-canvas").map(O=>y(O).trimEnd());navigator.clipboard.writeText(M.join(`
`)).then(()=>{p("  "+h("copy","#888",11)+' <span style="color:#666;"> Conte\xFAdo copiado para a \xE1rea de transfer\xEAncia.</span>'),this.showToast("Terminal copiado","success",2e3)});break}case"":break;default:f(),p(`  <span style="color:#555;">Comando desconhecido: </span><span style="color:#777;font-weight:600;">${D||"(vazio)"}</span>`),g("  Digite help para ver os comandos.","#2a2a2a"),f()}t&&(t.scrollTop=t.scrollHeight)},q=I=>{this.terminalMode=I;let B=I==="terminal";n&&(n.style.display=B?"flex":"none"),s&&(s.style.display=B?"none":"flex"),r&&(r.style.display=B?"none":"flex");let D=this.shadow.querySelector("#eq-term-mode-terminal"),M=this.shadow.querySelector("#eq-term-mode-output");D&&(D.style.background=B?"#181818":"transparent",D.style.borderColor=B?"#2a2a2a":"transparent",D.style.color=B?"var(--eq-text-bright)":"#555"),M&&(M.style.background=B?"transparent":"#181818",M.style.borderColor=B?"transparent":"#2a2a2a",M.style.color=B?"#555":"var(--eq-text-bright)"),B||this.renderTerminalEntries()};this._reconnectContextbarBtns=()=>{let I=this.shadow.querySelector("#eq-term-mode-terminal"),B=this.shadow.querySelector("#eq-term-mode-output");I?.addEventListener("click",()=>q("terminal")),B?.addEventListener("click",()=>q("output"));let D=this.shadow.querySelector("#eq-term-copy-btn"),M=this.shadow.querySelector("#eq-term-clear-btn");D?.addEventListener("click",()=>{let O=ee=>{let ne=ee.style.color;ee.style.color="#4ade80",setTimeout(()=>ee.style.color=ne,400)},U=this._getCustomSel?.();if(U&&U.trim().length>0){this._clearCustomSel?.(),navigator.clipboard.writeText(U).then(()=>{this.showToast("Sele\xE7\xE3o copiada","success",2e3),D&&O(D)});return}let K=window.getSelection()?.toString()?.trim()||"";if(this.terminalMode==="terminal"){if(K)navigator.clipboard.writeText(K).then(()=>{this.showToast("Sele\xE7\xE3o copiada","success",2e3),D&&O(D)});else if(t){let ee=Array.from(t.children).filter(ne=>ne!==i&&ne.id!=="eq-click-cursor"&&ne.id!=="eq-term-sel-canvas").map(ne=>y(ne).trimEnd());navigator.clipboard.writeText(ee.join(`
`)).then(()=>{this.showToast("Terminal copiado","success",2e3),D&&O(D)})}}else K?navigator.clipboard.writeText(K).then(()=>{this.showToast("Sele\xE7\xE3o copiada","success",2e3),D&&O(D)}):navigator.clipboard.writeText(this.getFormattedLogs()).then(()=>{this.showToast("Output copiado","success",2e3),D&&O(D)})}),M?.addEventListener("click",()=>{this.terminalMode==="terminal"?(t&&i&&[...t.children].forEach(O=>{O!==i&&O.dataset?.perm!=="1"&&O.remove()}),a&&(a.textContent="")):this.clearLogs()})},this._reconnectContextbarBtns();let S=()=>{e?.focus(),t?.classList.remove("eq-term-unfocused")},A=(()=>{try{let B=document.createElement("canvas").getContext("2d");return B?(B.font='11.5px "Cascadia Code","Fira Code","Courier New",monospace',B.measureText("X").width):6.9}catch{return 6.9}})(),P=()=>parseFloat(getComputedStyle(t).lineHeight)||19,z=14,N=10,k=this.shadow.querySelector("#eq-click-cursor");t&&(t.style.position="relative"),k&&(t?.appendChild(k),k.style.position="absolute",k.style.width=A+"px",k.style.height=P()+"px",k.style.animation="eq-term-blink 0.9s step-end infinite");let E=(I,B)=>{if(!k||!t)return;let D=P(),M=Math.max(0,Math.floor((I-z)/A)),O=Math.max(0,Math.floor((B-N)/D)),U=M*A+z,K=O*D+N;k.style.left=U+"px",k.style.top=K+"px",k.style.width=A+"px",k.style.height=D+"px",k.style.animation="eq-term-blink 0.9s step-end infinite",k.style.display="block"},L=this.shadow.querySelector("#eq-term-sel-canvas"),R=null;L&&(R=L.getContext("2d"));let Q=null,V=null,Y=!1,W=0,Z=0,G=()=>{if(!L||!t)return;let I=t.scrollWidth,B=Math.max(t.scrollHeight,t.clientHeight);(L.width!==I||L.height!==B)&&(L.width=I,L.height=B,L.style.width=I+"px",L.style.height=B+"px")},oe=()=>{if(!R||!L||(G(),R.clearRect(0,0,L.width,L.height),!Q||!V))return;let I=P(),B=L.width,D=Q.row,M=Q.col,O=V.row,U=V.col;if((D>O||D===O&&M>U)&&([D,M,O,U]=[O,U,D,M]),R.fillStyle="white",D===O)R.fillRect(z+M*A,N+D*I,(U-M+1)*A,I);else{R.fillRect(z+M*A,N+D*I,B-z-M*A,I);for(let K=D+1;K<O;K++)R.fillRect(z,N+K*I,B-z,I);R.fillRect(z,N+O*I,(U+1)*A,I)}},fe=(I,B)=>({row:Math.max(0,Math.floor((B-N)/P())),col:Math.max(0,Math.floor((I-z)/A))}),be=()=>{if(!Q||!V||!t)return"";let I=Q.row,B=Q.col,D=V.row,M=V.col;(I>D||I===D&&B>M)&&([I,B,D,M]=[D,M,I,B]);let O=Array.from(t.children).filter(K=>{let ee=K.id;return ee!=="eq-click-cursor"&&ee!=="eq-term-sel-canvas"&&ee!=="eq-term-current-line"}).map(K=>y(K).replace(/\n/g,"")),U=[];for(let K=I;K<=D;K++){let ee=K<O.length?O[K]:"";I===D?U.push(ee.padEnd(M+1," ").slice(B,M+1)):K===I?U.push(ee.slice(B)):K===D?U.push(ee.padEnd(M+1," ").slice(0,M+1)):U.push(ee)}return U.join(`
`).replace(/\n+$/,"")};if(this._getCustomSel=be,this._clearCustomSel=()=>{Q=null,V=null,R&&L&&R.clearRect(0,0,L.width,L.height)},L&&t)try{new ResizeObserver(()=>{G(),Q&&V&&oe()}).observe(t)}catch{}t?.addEventListener("mousedown",I=>{if(I.button!==0)return;W=I.clientX,Z=I.clientY,Y=!1,Q=null,V=null,R&&L&&R.clearRect(0,0,L.width,L.height),k&&(k.style.display="none");let B=t.getBoundingClientRect(),D=I.clientX-B.left+t.scrollLeft,M=I.clientY-B.top+t.scrollTop;E(D,M),setTimeout(()=>{Y||S()},80)}),t?.addEventListener("mousemove",I=>{if(I.buttons!==1)return;let B=Math.abs(I.clientX-W),D=Math.abs(I.clientY-Z);if(B>2||D>2){if(!Y){Y=!0,k&&(k.style.display="none");let O=t.getBoundingClientRect();Q=fe(W-O.left+t.scrollLeft,Z-O.top+t.scrollTop)}let M=t.getBoundingClientRect();V=fe(I.clientX-M.left+t.scrollLeft,I.clientY-M.top+t.scrollTop),oe()}}),t?.addEventListener("mouseup",()=>{Y&&(Y=!1,(!Q||!V)&&S())}),e?.addEventListener("keydown",()=>{k&&(k.style.display="none")},{passive:!0}),t?.addEventListener("focus",()=>t.classList.remove("eq-term-unfocused")),e?.addEventListener("blur",()=>t?.classList.add("eq-term-unfocused")),e?.addEventListener("focus",()=>t?.classList.remove("eq-term-unfocused")),e?.addEventListener("keydown",I=>{if(!a)return;let B=a.textContent||"";if(I.key==="Enter"){I.preventDefault();let D=B.trim();if(a.textContent="",this.terminalCmdHistoryIdx=-1,D&&(this.terminalCmdHistory.unshift(D),this.terminalCmdHistory.length>50&&this.terminalCmdHistory.pop()),i){let M=document.createElement("div");M.style.cssText="white-space:pre-wrap;overflow-wrap:break-word;",M.innerHTML=`<span style="color:#fff;font-weight:700;">EasyQuiz_Legacy:&nbsp;</span><span style="color:#888;">${D}</span>`,t?.insertBefore(M,i)}D&&w(D),t&&(t.scrollTop=t.scrollHeight)}else if(I.key==="Backspace")I.preventDefault(),a.textContent=B.slice(0,-1);else if(I.key==="ArrowUp")I.preventDefault(),this.terminalCmdHistoryIdx=Math.min(this.terminalCmdHistoryIdx+1,this.terminalCmdHistory.length-1),this.terminalCmdHistoryIdx>=0&&(a.textContent=this.terminalCmdHistory[this.terminalCmdHistoryIdx]);else if(I.key==="ArrowDown")I.preventDefault(),this.terminalCmdHistoryIdx=Math.max(this.terminalCmdHistoryIdx-1,-1),a.textContent=this.terminalCmdHistoryIdx>=0?this.terminalCmdHistory[this.terminalCmdHistoryIdx]:"";else if(I.key==="c"&&I.ctrlKey){let D=this._getCustomSel?.();if(D&&D.trim().length>0)this._clearCustomSel?.(),navigator.clipboard.writeText(D);else{let O=window.getSelection()?.toString()||"";O?navigator.clipboard.writeText(O):a?.textContent&&navigator.clipboard.writeText(a.textContent)}let M=this.shadow.querySelector("#eq-term-copy-btn");if(M){let O=M.style.color;M.style.color="#4ade80",setTimeout(()=>M.style.color=O,400)}}else I.key==="v"&&I.ctrlKey?(I.preventDefault(),navigator.clipboard.readText().then(D=>{a&&(a.textContent=(a.textContent||"")+D.replace(/\n/g," ")),t&&(t.scrollTop=t.scrollHeight)})):I.key==="l"&&I.ctrlKey?(I.preventDefault(),t&&i&&[...t.children].forEach(D=>{D!==i&&D.dataset?.perm!=="1"&&D.remove()}),a.textContent=""):I.key.length===1&&!I.ctrlKey&&!I.metaKey&&(I.preventDefault(),a.textContent=B+I.key,t&&(t.scrollTop=t.scrollHeight))}),e?.addEventListener("paste",I=>{I.preventDefault();let B=I.clipboardData?.getData("text")||"",D=/\n/g;a&&(a.textContent=(a.textContent||"")+B.replace(D," "))});let Pe=()=>{let I=this.shadow.querySelector("#eq-fchk-all")?.checked,B=this.shadow.querySelector("#eq-fchk-error")?.checked,D=this.shadow.querySelector("#eq-fchk-ai")?.checked,M=this.shadow.querySelector("#eq-fchk-dom")?.checked;I?this.activeLogFilter="all":B&&!D&&!M?this.activeLogFilter="error":D&&!B&&!M?this.activeLogFilter="ai":M&&!B&&!D?this.activeLogFilter="dom":this.activeLogFilter="all";let O=this.shadow.querySelector("#eq-output-filter-label"),U={all:"Todos",error:"Erros",ai:"IA",dom:"DOM"};if(O){let K={all:"Todos",error:"Erros",ai:"IA",dom:"DOM"},ee=this.shadow.querySelector("#eq-fchk-error")?.checked,ne=this.shadow.querySelector("#eq-fchk-ai")?.checked,Ke=this.shadow.querySelector("#eq-fchk-dom")?.checked,ze=this.shadow.querySelector("#eq-fchk-all")?.checked,Ge=[ee,ne,Ke].filter(Boolean).length;ze||Ge===0?O.textContent="Todos":Ge===1?O.textContent=K[this.activeLogFilter]||this.activeLogFilter:O.textContent="\u22EF ("+Ge+")"}this.renderTerminalEntries()};d?.addEventListener("click",I=>{if(I.stopPropagation(),!m)return;let B=m.style.display!=="none";m.style.display=B?"none":"block"}),m?.addEventListener("mousedown",I=>I.stopPropagation());let Ee=this.shadow.querySelector("#eq-fchk-all"),It=this.shadow.querySelector("#eq-fchk-error"),je=this.shadow.querySelector("#eq-fchk-ai"),ve=this.shadow.querySelector("#eq-fchk-dom"),Qe=[It,je,ve].filter(Boolean);Ee?.addEventListener("change",()=>{Ee.checked?Qe.forEach(I=>{I.checked=!1}):Ee.checked=!0,Pe()}),Qe.forEach(I=>{I.addEventListener("change",()=>{I.checked&&Ee&&(Ee.checked=!1),!Qe.some(D=>D.checked)&&Ee&&(Ee.checked=!0),Pe()})}),document.addEventListener("mousedown",I=>{m&&m.style.display!=="none"&&(m.style.display="none"),t&&!t.contains(I.target)&&this._clearCustomSel?.()});let Ht=this.shadow.querySelector("#eq-output-sort-btn"),lt=this.shadow.querySelector("#eq-sort-arrow");if(lt&&(lt.style.transform="rotate(270deg)"),Ht?.addEventListener("click",()=>{this.outputSortNewest=!this.outputSortNewest,lt&&(lt.style.transform=this.outputSortNewest?"rotate(270deg)":"rotate(90deg)"),Ht&&(Ht.style.color=this.outputSortNewest?"#aaa":"#60a5fa"),this.renderTerminalEntries()}),u?.addEventListener("input",()=>{this.outputSearchQuery=u.value,l&&(l.style.display=u.value?"inline":"none"),this.renderTerminalEntries()}),l?.addEventListener("click",()=>{u&&(u.value=""),this.outputSearchQuery="",l&&(l.style.display="none"),this.renderTerminalEntries()}),this.liveDebugTerminal){let I=null;this.liveDebugTerminal.addEventListener("scroll",()=>{I&&clearTimeout(I),I=setTimeout(()=>{if(!this.liveDebugTerminal)return;let B=this.liveDebugTerminal,D=B.scrollHeight-B.scrollTop-B.clientHeight,M=this.shadow.querySelector("#eq-dbg-scroll-toggle");D>40?(this.autoScrollLogs=!1,M&&(M.style.color="#333",M.style.borderColor="rgba(255,255,255,0.07)",M.title="Auto-scroll: desativado")):D<10&&(this.autoScrollLogs=!0,M&&(M.style.color="var(--eq-text-bright)",M.style.borderColor="rgba(255,255,255,0.18)",M.title="Auto-scroll: ativo"))},150)})}this.shadow.querySelector("#eq-dbg-scroll-toggle")?.addEventListener("click",I=>{this.autoScrollLogs=!this.autoScrollLogs;let B=I.currentTarget;B.style.color=this.autoScrollLogs?"var(--eq-text-bright)":"#333",B.style.borderColor=this.autoScrollLogs?"rgba(255,255,255,0.18)":"rgba(255,255,255,0.07)",B.title=this.autoScrollLogs?"Auto-scroll: ativo":"Auto-scroll: desativado"}),q("terminal"),setTimeout(()=>S(),80)}clearLogs(){if(this.logEntries=[],this.updateLogCounters(),this.liveDebugTerminal){this.liveDebugTerminal.replaceChildren();let e=document.createElement("div");e.style.cssText="color:#333;",e.textContent="> [SYS] Output limpo.",this.liveDebugTerminal.appendChild(e)}this.apConsole&&this.apConsole.replaceChildren(),this.executionConsole&&this.executionConsole.replaceChildren()}termBorder(e,t="#1e1e1e",a=3){return e.style.outline=`1px solid ${t}`,e.style.outlineOffset="-1px",e.style.borderRadius=a+"px",e}getFormattedLogs(){return(this.activeLogFilter==="all"?this.logEntries:this.logEntries.filter(t=>t.category===this.activeLogFilter)).map(t=>t.message).join(`
`)}setLastError(e){this.lastErrorMsg=e,this.dbgErrorCard&&this.dbgErrorText&&(this.dbgErrorText.textContent=e,this.dbgErrorCard.style.display="flex")}setErrorDiagnostic(e,t){let a=t?`[${t}] ${e}`:e;this.setLastError(a)}refreshDebugView(){let e=this.latestPlan,t=this.latestContext,a=this.latestPromptText||e?.promptSent||"";if(this.dbgModel&&(this.dbgModel.textContent=e?.usedModel||this.initialSettings.model||"--"),this.dbgLatency&&(this.dbgLatency.textContent=e?.durationMs?`${e.durationMs}ms`:"--"),this.dbgSplitTokens){let i=e?.promptTokens!==void 0?String(e.promptTokens):"--",n=e?.candidatesTokens!==void 0?String(e.candidatesTokens):"--";this.dbgSplitTokens.textContent=`${i} / ${n}`,this.dbgSplitTokens.title=`Prompt: ${i} tokens | Resposta: ${n} tokens`}if(this.dbgTotalTokens){let i=e?.tokensUsed??(e?.promptTokens&&e?.candidatesTokens?e.promptTokens+e.candidatesTokens:void 0);this.dbgTotalTokens.textContent=i!==void 0?`${i}`:"--"}if(this.dbgPromptLen){let i=a.length,n=Math.round(i/4);this.dbgPromptLen.textContent=`${i}c (~${n}tok)`}this.dbgRawRespView&&(e?e.rawResponse?this.dbgRawRespView.textContent=e.rawResponse:this.dbgRawRespView.textContent=JSON.stringify({pageType:e.pageType,mode:e.mode,confidence:e.confidence,rationale:e.rationale,actions:e.actions},null,2):this.dbgRawRespView.textContent="Aguardando retorno da API Gemini..."),this.lastErrorMsg&&this.dbgErrorCard&&this.dbgErrorText&&(this.dbgErrorText.textContent=this.lastErrorMsg,this.dbgErrorCard.style.display="flex")}logToConsole(e,t){let a=new Date,i=`${String(a.getHours()).padStart(2,"0")}:${String(a.getMinutes()).padStart(2,"0")}:${String(a.getSeconds()).padStart(2,"0")}.${String(Math.floor(a.getMilliseconds()/100))}`,n=e;e.startsWith(">")?n=`> [${i}] ${e.slice(1).trim()}`:n=`[${i}] ${e}`;let s="all";t==="text-red"||n.includes("[ERRO]")||n.includes("Falha")||n.includes("Error")?s="error":n.includes("[IA]")||n.includes("[RAG]")||n.includes("Tokens")||n.includes("Gemini")||n.includes("Modelo:")?s="ai":(n.includes("[DOM]")||n.includes("[EXEC]")||n.includes("[VERIF]")||n.includes("[NAV]"))&&(s="dom");let r={id:Date.now()+Math.random(),timestamp:i,message:n,colorClass:t,category:s};for(this.logEntries.push(r);this.logEntries.length>250;)this.logEntries.shift();if(this.updateLogCounters(),s==="error"&&this.setLastError(n),this.liveDebugTerminal&&(this.activeLogFilter==="all"||this.activeLogFilter===s)){let u=document.createElement("div");u.style.cssText="padding:1px 0;",u.textContent=n,t&&(u.className=t),this.liveDebugTerminal.appendChild(u)}if(this.liveTerminalOutput&&(s==="dom"||s==="all"||s==="error")){for(this.appendTerminalLine(n,t);this.liveDebugTerminal.children.length>300;)this.liveDebugTerminal.removeChild(this.liveDebugTerminal.firstChild);this.autoScrollLogs&&(this.liveDebugTerminal.scrollTop=this.liveDebugTerminal.scrollHeight)}if(this.apConsole){let u=document.createElement("div");for(u.textContent=n,t&&(u.className=t),this.apConsole.appendChild(u),this.apConsole.scrollTop=this.apConsole.scrollHeight;this.apConsole.children.length>150;)this.apConsole.removeChild(this.apConsole.firstChild)}if(this.executionConsole){let u=document.createElement("div");for(u.textContent=n,t&&(u.className=t),this.executionConsole.appendChild(u),this.executionConsole.scrollTop=this.executionConsole.scrollHeight;this.executionConsole.children.length>150;)this.executionConsole.removeChild(this.executionConsole.firstChild)}}setProgress(e,t){if(!this.progressContainer||!this.progressBar)return;if(e<=0){this.progressContainer.style.display="none",this.progressBar.style.width="0%";return}this.progressContainer.style.display="flex";let a=Math.min(100,Math.max(0,Math.round(e)));this.progressBar.style.width=`${a}%`,this.progressVal&&(this.progressVal.textContent=`${a}%`),t&&this.progressLabel&&(this.progressLabel.textContent=t),a>=100&&setTimeout(()=>{this.progressContainer&&this.progressBar&&this.progressBar.style.width==="100%"&&(this.progressContainer.style.display="none")},1500)}updateContext(e,t){this.latestContext=e,t&&(this.latestPlan=t,t.imageDescriptions&&(this.latestImageDescriptions=t.imageDescriptions)),this.activeTab==="brain"?(this.renderContextTree(),this.refreshBrainCanvas(),t&&this.refreshInspectorView()):this.activeTab==="debug"&&this.refreshDebugView()}updateImages(e){this.latestImages=e,this.activeTab==="brain"&&(this.renderContextTree(),this.refreshBrainCanvas()),this.activeTab==="brain"&&(this.brainSelectedFolder==="media-images"||(this.brainActiveTab||"").startsWith("img-"))&&this.refreshBrainCanvas()}renderContextTree(){if(!this.contextTreeContainer)return;let e=this.latestContext,t=ct(),a=this.latestPlan,i=!!(this.latestPromptText||a?.promptSent),n=!!e,s=!!a;this.contextTreeContainer.innerHTML="";let r=this.createTreeFolder(" P\xC1GINA & ESCOPO ATUAL",!0,[{label:"T\xEDtulo",value:document.title||"Sem t\xEDtulo"},{label:"URL",value:window.location.pathname||"/"},{label:"Escopo DOM",value:e?`${e.scope.tagName.toLowerCase()}${e.scope.className?"."+e.scope.className.split(" ").join("."):""}`:"Document"},{label:"Tamanho Texto",value:e?`${e.questionText.length} caracteres`:"N\xE3o analisado"},{label:"Trecho Enunciado",value:e?`"${e.questionText.slice(0,120)}..."`:"Nenhum"}]);this.contextTreeContainer.appendChild(r);let u=e?e.controls:[],l=u.map((v,y)=>{let x=v.role==="navigation"||v.type==="button",w=!x&&v.value?` [val: "${v.value}"]`:"";return{label:`[#${y+1}] ${v.type.toUpperCase()}`,value:`${v.label||v.id||v.name||"(Sem r\xF3tulo)"}${w}`.trim(),badge:x?"Navega\xE7\xE3o":v.role||v.type}}),d=this.createTreeFolder(`\uFE0F CONTROLES DETECTADOS (${u.length})`,u.length>0,l);this.contextTreeContainer.appendChild(d);let m=t.map((v,y)=>({label:`Mem\xF3ria #${y+1}`,value:v,badge:"RAG"})),c=this.createTreeFolder(` MEM\xD3RIA RAG ACUMULADA (${t.length})`,t.length>0,m);this.contextTreeContainer.appendChild(c);let h=Te(window.location.href);if(h.skills.length>0){let v=h.skills.map(x=>({label:x.name,value:`${x.description}${x.rule?` [Regra: ${x.rule}]`:""}`,badge:`${x.successCount}x OK`})),y=this.createTreeFolder(`\u{1F4DA} MINI-SKILLS DA P\xC1GINA (${h.skills.length})`,!0,v);this.contextTreeContainer.appendChild(y)}if(h.failedPatterns.length>0){let v=h.failedPatterns.map(x=>({label:`[ANTI-ERRO] ${x.actionType.toUpperCase()} em "${x.target.slice(0,35)}"`,value:`${x.reason} \u2192 Evitar: ${x.retryAvoidanceHint}`,badge:"Evitado"})),y=this.createTreeFolder(`\u{1F6E1}\uFE0F ERROS EVITADOS (ANTI-PATTERNS) (${h.failedPatterns.length})`,!0,v);this.contextTreeContainer.appendChild(y)}if(h.flowNotes.length>0){let v=h.flowNotes.map((x,w)=>({label:`Etapa #${w+1}`,value:x,badge:"Fluxo"})),y=this.createTreeFolder(`\u{1F5FA}\uFE0F FLUXO REGISTRADO (${h.flowNotes.length})`,!0,v);this.contextTreeContainer.appendChild(y)}if(a){let v=this.createTreeFolder(` \xDALTIMO PLANO IA (${a.actions.length} a\xE7\xF5es)`,!0,[{label:"Tipo P\xE1gina",value:a.pageType,badge:`${(a.confidence*100).toFixed(0)}%`},{label:"Modo",value:a.mode},{label:"Racioc\xEDnio",value:a.rationale||"N/A"},...a.actions.map((y,x)=>({label:`A\xE7\xE3o #${x+1} (${y.t})`,value:JSON.stringify(y)}))]);this.contextTreeContainer.appendChild(v)}{let v=document.createElement("div");v.style.cssText="border-bottom:1px solid rgba(255,255,255,0.04);";let y=document.createElement("div");y.style.cssText="display:flex;align-items:center;gap:6px;padding:5px 10px;cursor:pointer;font-size:10px;font-weight:600;color:#fbbf24;letter-spacing:0.04em;user-select:none;",y.innerHTML='<span style="display:inline-flex;width:12px;height:12px;color:#fbbf24;">'+C.inspector+"</span> IA ARTIFACTS";let x=document.createElement("div");x.style.cssText="padding-left:16px;overflow:hidden;";let w=(S,T,A,P)=>{let z=document.createElement("div");return z.style.cssText="display:flex;align-items:center;gap:6px;padding:4px 10px 4px 4px;cursor:pointer;border-radius:4px;transition:background 0.1s;"+(this.brainActiveTab===S?"background:rgba(251,191,36,0.1);":""),z.innerHTML='<span style="font-size:9px;color:'+(P?"#fbbf24":"#444")+';">'+C.code+'</span><span style="font-size:10px;color:'+(P?"var(--eq-text-bright)":"#444")+';flex:1;">'+T+'</span><span style="font-size:8px;color:#333;">'+A+"</span>",z.addEventListener("click",()=>{this.brainSelectedFolder=null,this.brainActiveTab=S;let N=this.getBrainFileText(S),k=this.shadow.querySelector("#eq-brain-content");if(k){k.innerHTML="";let E=document.createElement("pre");E.className="eq-brain-code",E.style.cssText='padding:12px;font-size:10.5px;line-height:1.55;white-space:pre-wrap;word-break:break-word;color:var(--eq-text-bright);font-family:"Cascadia Code","Fira Code","Courier New",monospace;',E.textContent=N,k.appendChild(E)}this.renderBrainExplorer(),this.renderBrainTabs()}),z};x.appendChild(w("ai-prompt","prompt.txt",i?"pronto":"aguardando",i)),x.appendChild(w("ai-context","context.json",n?"pronto":"aguardando",n)),x.appendChild(w("ai-response","response.txt",s?"pronto":"aguardando",!!a));let q=!1;y.addEventListener("click",()=>{q=!q,x.style.display=q?"block":"none"}),x.style.display="none",v.appendChild(y),v.appendChild(x),this.contextTreeContainer.appendChild(v)}let p=this.latestImages,g=this.latestImageDescriptions,f=p.map((v,y)=>{let x=g.find(A=>A.index===y),w=(v.captureStatus==="captured"||v.captureStatus==="text_only",""),q=v.captureStatus==="captured"?"Visual":v.captureStatus==="text_only"?"Texto":"Falhou",S=x?x.relevant?" Relevante":"\uFE0F Ignorada":"\u2014",T=x?x.description:v.textContext?v.textContext:"Aguardando an\xE1lise IA...";return{label:`${w} Img ${y+1} [${q}]`,value:`${T}`,badge:S,imgSrc:v.base64?`data:${v.mediaType||"image/jpeg"};base64,${v.base64}`:void 0}}),b=this.createTreeFolder(`\uFE0F IMAGENS DETECTADAS (${p.length})`,!0,f);this.contextTreeContainer.appendChild(b)}createTreeFolder(e,t,a){let i=document.createElement("div");i.className="eq-tree-node";let n=document.createElement("div");n.className="eq-tree-header",n.innerHTML=`<span class="eq-tree-arrow">${t?"\u25BC":"\u25B6"}</span> <span>${e}</span>`;let s=document.createElement("div");if(s.className="eq-tree-content",s.style.display=t?"flex":"none",a.length===0)s.innerHTML='<div class="text-muted" style="padding: 2px 0;">Nenhum item registrado.</div>';else for(let r of a){let u=document.createElement("div");u.className="eq-tree-leaf";let l="";r.imgSrc&&r.imgSrc.startsWith("data:image")&&(l=`<div style="margin-top: 8px; margin-bottom: 4px;"><img src="${r.imgSrc}" style="max-width: 100%; max-height: 120px; border-radius: 4px; border: 1px solid #3c4043; background: #1e1f22;" alt="Captura"></div>`),u.innerHTML=`
          <div style="display: flex; align-items: flex-start; gap: 8px; width: 100%;">
            <strong style="color:var(--eq-text-bright); min-width: 80px;">${r.label}:</strong>
            <div style="flex:1; display: flex; flex-direction: column;">
              <span style="word-break: break-word; color:var(--eq-text);">${r.value}</span>
              ${l}
            </div>
            ${r.badge?`<span class="eq-tree-badge" style="white-space: nowrap;">${r.badge}</span>`:""}
          </div>
        `,s.appendChild(u)}return n.addEventListener("click",()=>{let r=s.style.display==="none";s.style.display=r?"flex":"none";let u=n.querySelector(".eq-tree-arrow");u&&(u.textContent=r?"\u25BC":"\u25B6")}),i.appendChild(n),i.appendChild(s),i}toggle(e){e!==void 0?this.isCollapsed=!e:this.isCollapsed=!this.isCollapsed,this.isCollapsed?this.sidebarEl.classList.add("eq-collapsed"):(this.sidebarEl.classList.remove("eq-collapsed"),X.getAllKeys().length===0&&(this.switchTab("settings"),this.apiKeyInput.focus()))}updateAutopilotUi(e){let t=this.analyzeBtn;if(t){let a=t.closest(".eq-cta-wrapper"),i=e?"Parar Autopilot":"Resolver Autopilot",n=e?C.stop:C.sparkles;a&&(a.classList.toggle("is-running",e),a.classList.toggle("is-idle",!e)),t.classList.toggle("is-running",e),t.classList.toggle("is-idle",!e),t.classList.toggle("danger",e),t.innerHTML=`<span class="eq-btn-icon">${n}</span><span class="eq-btn-label">${i}</span>`,t.title=e?"Interromper o Resolver Autopilot":"Ligar o Resolver Autopilot"}this.apToggleBtn&&(this.apToggleBtn.innerHTML=`${e?C.stop:C.sparkles} ${e?"Parar Autopilot":"Resolver Autopilot"}`,this.apToggleBtn.classList.toggle("danger",e),this.apToggleBtn.title=e?"Interromper o Resolver Autopilot":"Ligar o Resolver Autopilot")}setOperationState(e,t){let a=this.shadow.querySelector("#eq-operation-state"),i=this.shadow.querySelector("#eq-status-card");a&&(a.innerHTML=`${C.info} <span>${e}</span>`,a.className=`eq-operation-state is-${t}`),i&&(i.classList.remove("is-busy","is-success","is-error","is-warning","is-info"),i.classList.add(`is-${t}`));let n=this.analyzeBtn;if(n){let s=n.closest(".eq-cta-wrapper");s&&(s.classList.remove("status-busy","status-success","status-error","status-warning","status-info"),s.classList.add(`status-${t}`)),n.classList.remove("status-busy","status-success","status-error","status-warning","status-info"),n.classList.add(`status-${t}`)}}setInterrupted(e="An\xE1lise interrompida pelo usu\xE1rio."){this.isBusy=!1,[this.modelSelect,this.modeSelect,this.engineSelect,this.dryRunCheckbox,this.autoApplyCheckbox,this.autoAdvanceCheckbox,this.useVisionCheckbox,this.toastStackingCheckbox].forEach(a=>a.disabled=!1);let t=this.analyzeBtn.closest(".eq-cta-wrapper");t&&t.classList.remove("is-running"),this.analyzeBtn.disabled=!1,this.analyzeBtn.classList.remove("danger"),this.analyzeBtn.innerHTML=`<span class="eq-btn-icon">${C.sparkles}</span><span class="eq-btn-label">Resolver Autopilot</span>`,this.analyzeBtn.title="Ligar o Resolver Autopilot",this.applyBtn&&(this.applyBtn.disabled=!this.latestPlan||!this.latestPlan.actions.length),this.stopStopwatch(),this.stopQuestionTimer(),this.dotPulseAp&&(this.dotPulseAp.className="eq-dot-pulse stopped"),this.dotPulseAdv&&(this.dotPulseAdv.className="eq-dot-pulse stopped"),this.launcherDot&&(this.launcherDot.className="eq-launcher-dot stopped"),this.metricsLiveStatus&&(this.metricsLiveStatus.textContent="Interrompido",this.metricsLiveStatus.className="eq-live-stopwatch-status is-warning"),this.autopilot.isActive()||this.updateAutopilotUi(!1),this.setStatus(e,"warning")}setBusy(e,t){this.isBusy=e,[this.modelSelect,this.modeSelect,this.engineSelect,this.dryRunCheckbox,this.autoApplyCheckbox,this.autoAdvanceCheckbox,this.useVisionCheckbox,this.toastStackingCheckbox].forEach(i=>i.disabled=e);let a=this.analyzeBtn?.closest(".eq-cta-wrapper");e?(a&&a.classList.add("is-running"),this.analyzeBtn&&(this.analyzeBtn.disabled=!1,this.analyzeBtn.classList.add("danger"),this.analyzeBtn.innerHTML=`<span class="eq-btn-icon">${C.stop}</span><span class="eq-btn-label">Parar Autopilot</span>`,this.analyzeBtn.title="Interromper o Resolver Autopilot"),this.applyBtn&&(this.applyBtn.disabled=!0),this.startStopwatch(),this.startQuestionTimer(),this.dotPulseAp&&(this.dotPulseAp.className="eq-dot-pulse busy"),this.dotPulseAdv&&(this.dotPulseAdv.className="eq-dot-pulse busy"),this.launcherDot&&(this.launcherDot.className="eq-launcher-dot busy"),this.setOperationState("Analisando...","busy"),this.metricsLiveStatus&&(this.metricsLiveStatus.textContent="Calculando...",this.metricsLiveStatus.className="eq-live-stopwatch-status is-busy"),t&&this.setStatus(t,"info")):(this.analyzeBtn&&(this.analyzeBtn.disabled=!1,this.analyzeBtn.classList.remove("danger"),this.analyzeBtn.innerHTML=`<span class="eq-btn-icon">${C.sparkles}</span><span class="eq-btn-label">Resolver Autopilot</span>`,this.analyzeBtn.title="Ligar o Resolver Autopilot"),this.applyBtn&&(this.applyBtn.disabled=!this.latestPlan||!this.latestPlan.actions.length),this.stopStopwatch(),this.stopQuestionTimer(),this.dotPulseAp&&(this.dotPulseAp.className="eq-dot-pulse"),this.dotPulseAdv&&(this.dotPulseAdv.className="eq-dot-pulse"),this.launcherDot&&(this.launcherDot.className="eq-launcher-dot"),this.setOperationState(this.autopilot.isActive()?"Monitorando":"Pronto","idle"),this.metricsLiveStatus&&this.metricsLiveStatus.textContent==="Calculando..."&&(this.metricsLiveStatus.textContent="Em espera",this.metricsLiveStatus.className="eq-live-stopwatch-status"))}_lastToastMsg="";_lastToastTime=0;_toastQueue=[];_toastVisible=[];_toastOverflowBtn=null;showToast(e,t="info",a=3500,i=!1){let n=Date.now(),s=t+":"+e;if(!i&&s===this._lastToastMsg&&n-this._lastToastTime<1500)return;this._lastToastMsg=s,this._lastToastTime=n;let r={success:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>',error:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>',warning:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>',info:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>'},u={success:"#22c55e",error:"#ef4444",warning:"#f59e0b",info:"#60a5fa"},l=u[t]||u.info,d=r[t]||r.info,m=this.initialSettings.toastStacking??!0,c={message:e,type:t,col:l,iconHtml:d,expiresAt:Date.now()+a};m&&this._toastQueue.push(c);let h=this.shadow.querySelector("#eq-toast-container");h||(h=document.createElement("div"),h.id="eq-toast-container",h.style.cssText="position:fixed;bottom:8px;left:12px;z-index:2147483647;display:flex;flex-direction:column-reverse;gap:5px;pointer-events:none;max-width:300px;",this.shadow.appendChild(h));let p=5,g=(x,w,q,S)=>{let T=document.createElement("div");T.style.cssText="display:flex;align-items:center;gap:8px;background:rgba(10,10,18,0.98);border:1px solid rgba(255,255,255,0.09);border-left:3px solid "+w+";padding:7px 12px 7px 10px;border-radius:7px;font-size:11px;color:rgba(235,240,248,0.92);font-family:inherit;box-shadow:0 4px 20px rgba(0,0,0,0.65),0 1px 4px rgba(0,0,0,0.4);pointer-events:all;max-width:296px;word-break:break-word;transform:translateX(-10px);opacity:0;transition:transform 0.22s cubic-bezier(0.34,1.5,0.64,1),opacity 0.16s ease;cursor:pointer;";let A=document.createElement("span");A.style.cssText="color:"+w+";display:inline-flex;flex-shrink:0;width:14px;height:14px;",A.innerHTML=q;let P=document.createElement("span");return P.textContent=x,P.style.flex="1",T.appendChild(A),T.appendChild(P),T};this._toastVisible=this._toastVisible.filter(x=>x.isConnected);let f=m?Math.max(0,this._toastQueue.filter(x=>x.expiresAt>Date.now()).length-p):0;if(m&&this._toastVisible.length>=p){this._updateToastOverflow(h,f);return}let b=g(e,l,d,a);h.appendChild(b),m&&this._toastVisible.push(b),requestAnimationFrame(()=>requestAnimationFrame(()=>{b.style.transform="translateX(0)",b.style.opacity="1"}));let v=()=>{b.style.transform="translateX(-10px)",b.style.opacity="0",setTimeout(()=>{b.remove(),m&&(this._toastVisible=this._toastVisible.filter(x=>x!==b),this._toastQueue=this._toastQueue.filter(x=>x.expiresAt>Date.now()),this._updateToastOverflow(h,Math.max(0,this._toastQueue.length-this._toastVisible.filter(x=>x.isConnected).length)))},200)},y=setTimeout(v,a);b.addEventListener("click",()=>{clearTimeout(y),v()},{once:!0}),m&&this._updateToastOverflow(h,f)}_updateToastOverflow(e,t){if(this._toastOverflowBtn&&(this._toastOverflowBtn.remove(),this._toastOverflowBtn=null),t<=0)return;let a=document.createElement("button");a.style.cssText="display:flex;align-items:center;gap:5px;background:rgba(14,14,20,0.92);border:1px solid rgba(255,255,255,0.1);border-radius:5px;font-size:10px;color:rgba(200,210,225,0.8);padding:4px 8px;cursor:pointer;pointer-events:all;font-family:inherit;",a.innerHTML=`<svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/></svg><span>+${t} notif.</span>`,a.addEventListener("click",()=>this._showToastHistory()),this._toastOverflowBtn=a,e.appendChild(a)}_showToastHistory(){let e=Date.now(),t=this._toastQueue.filter(n=>n.expiresAt>e);if(t.length===0)return;let a=this.shadow.querySelector("#eq-toast-container");if(!a)return;this._toastOverflowBtn&&(this._toastOverflowBtn.remove(),this._toastOverflowBtn=null);let i={success:"#22c55e",error:"#ef4444",warning:"#f59e0b",info:"#60a5fa"};for(let n of t){if(a.querySelectorAll(".eq-toast-hist").length>20)break;let s=document.createElement("div");s.className="eq-toast-hist",s.style.cssText=`display:flex;align-items:center;gap:7px;background:rgba(14,14,20,0.95);border:1px solid rgba(255,255,255,0.07);border-left:3px solid ${n.col};padding:5px 9px 5px 8px;border-radius:5px;font-size:10.5px;color:rgba(200,210,225,0.82);font-family:inherit;box-shadow:0 2px 10px rgba(0,0,0,0.4);pointer-events:all;max-width:288px;word-break:break-word;`;let r=document.createElement("span");r.style.cssText=`color:${n.col};display:inline-flex;flex-shrink:0;`,r.innerHTML=n.iconHtml;let u=document.createElement("span");u.textContent=n.message,u.style.flex="1";let l=document.createElement("span"),d=Math.ceil((n.expiresAt-e)/1e3);l.textContent=`${d}s`,l.style.cssText="color:rgba(150,160,180,0.5);font-size:9px;flex-shrink:0;",s.appendChild(r),s.appendChild(u),s.appendChild(l),s.addEventListener("click",()=>s.remove(),{once:!0}),a.appendChild(s),setTimeout(()=>s.remove(),Math.max(500,n.expiresAt-e))}}setStatus(e,t="info"){e&&e.length>4&&(t==="success"||t==="error")?this.showToast(e,t,3500):t==="warning"&&e.length>8?this.showToast(e,t,4e3):t==="info"&&e.length>10&&this.showToast(e,t,2400);let a=this.shadow.querySelector("#eq-status-summary");a&&(a.textContent=e),this.statusTextAp&&this.statusTextAp&&(this.statusTextAp.textContent=e),this.statusTextAdv&&this.statusTextAdv&&(this.statusTextAdv.textContent=e),t==="error"?(this.setOperationState("Bloqueado","error"),this.dotPulseAp&&(this.dotPulseAp.className="eq-dot-pulse error"),this.dotPulseAdv&&(this.dotPulseAdv.className="eq-dot-pulse error"),this.launcherDot&&(this.launcherDot.className="eq-launcher-dot error")):t==="warning"?(this.setOperationState("Interrompido","warning"),this.dotPulseAp&&(this.dotPulseAp.className="eq-dot-pulse stopped"),this.dotPulseAdv&&(this.dotPulseAdv.className="eq-dot-pulse stopped"),this.launcherDot&&(this.launcherDot.className="eq-launcher-dot stopped")):t==="success"?(this.setOperationState("Confirmado","success"),this.dotPulseAp&&(this.dotPulseAp.className="eq-dot-pulse"),this.dotPulseAdv&&(this.dotPulseAdv.className="eq-dot-pulse"),this.launcherDot&&(this.launcherDot.className="eq-launcher-dot")):this.isBusy?(this.setOperationState("Analisando...","busy"),this.dotPulseAp&&(this.dotPulseAp.className="eq-dot-pulse busy"),this.dotPulseAdv&&(this.dotPulseAdv.className="eq-dot-pulse busy"),this.launcherDot&&(this.launcherDot.className="eq-launcher-dot busy")):(this.setOperationState(this.autopilot.isActive()?"Monitorando":"Pronto","info"),this.dotPulseAp&&(this.dotPulseAp.className="eq-dot-pulse"),this.dotPulseAdv&&(this.dotPulseAdv.className="eq-dot-pulse"),this.launcherDot&&(this.launcherDot.className="eq-launcher-dot"));let i=e.includes("Alternando")||e.includes("indispon\xEDvel")||e.includes("fallback")||e.includes("alternativo"),n=t==="error"?"> [ERRO] ":t==="success"?"> [SUCESSO] ":t==="warning"?"> [PARADO] ":i?"> [FALLBACK] ":"> [SYS] ",s=t==="error"?"text-red":t==="success"?"text-green":t==="warning"||i?"text-yellow":"text-blue";this.logToConsole(`${n}${e}`,s)}setPlan(e,t){if(this.latestPlan=e,this.resultContainer.style.display="flex",e.durationMs&&this.stopStopwatch(e.durationMs),e.usedModel){let r=this.shadow.querySelector("#eq-active-model-badge");if(r){let u=e.usedModel.replace("gemini-","").replace("-latest","");r.textContent=`\u25CF ${u}`,r.style.display="inline-block"}}let a=this.shadow.querySelector("#eq-badges");if(a){a.replaceChildren();let r=document.createElement("span");r.className="eq-count-badge",r.textContent=String(e.actions.length),r.title=`${e.actions.length} a\xE7\xF5es \xB7 ${Math.round(e.confidence*100)}% confian\xE7a`,a.appendChild(r)}let i=this.shadow.querySelector("#eq-rationale-text");i.textContent=e.rationale;let n=this.shadow.querySelector("#eq-actions-list");n.innerHTML="";for(let r of e.actions){let u=document.createElement("div");u.className="eq-action-item";let l="";r.t==="chk"?l=`chk ${r.id} (${r.c})`:r.t==="val"?l=`val "${r.v}" -> ${r.id}`:r.t==="sel"?l=`sel "${Array.isArray(r.v)?r.v.join(","):r.v}" -> ${r.id}`:r.t==="clk"?l=`clk ${r.id}`:r.t==="adv"?l="adv":r.t==="js"?l=`js: ${String(r.v).slice(0,40)}...`:r.t==="drag"&&(l=`drag "${r.from}" -> "${r.to}"`);let d=document.createElement("span");d.className=`eq-action-badge t-${r.t}`,d.textContent=r.t.toUpperCase();let m=document.createElement("span");m.textContent=l,u.append(d,m),n.appendChild(u)}this.applyBtn&&(this.applyBtn.disabled=!t||!e.actions.length);let s=this.shadow.querySelector("#eq-execution-card");s&&(s.hidden=!0),e.imageDescriptions&&e.imageDescriptions.length>0&&(this.latestImageDescriptions=e.imageDescriptions),this.refreshInspectorView(),this.refreshDebugView()}setExecutionReport(e){let t=this.shadow.querySelector("#eq-execution-card"),a=this.shadow.querySelector("#eq-execution-summary"),i=this.shadow.querySelector("#eq-execution-list");if(!t||!a||!i)return;t.hidden=!1,a.textContent=e.navigationVerified?`${e.verified}/${e.applied} a\xE7\xF5es verificadas. Navega\xE7\xE3o confirmada.`:`${e.verified}/${e.applied} a\xE7\xF5es verificadas. ${e.navigationEvidence}`,a.className=`eq-execution-summary ${e.success?"is-success":"is-warning"}`,i.replaceChildren();let n=this.shadow.querySelector("#eq-execution-placeholder");n&&(n.textContent=e.navigationVerified?"Fluxo conclu\xEDdo: aplica\xE7\xE3o e navega\xE7\xE3o confirmadas.":`Fluxo interrompido: ${e.navigationEvidence}`,n.className=`eq-execution-placeholder ${e.success?"is-success":"is-warning"}`);for(let s of e.reports){let r=document.createElement("div");r.className=`eq-execution-row ${s.verified?"is-success":"is-failed"}`;let u=document.createElement("span");u.className="eq-execution-state",u.textContent=s.verified?"OK":"FALHOU";let l=document.createElement("div");l.className="eq-execution-details";let d=document.createElement("strong");d.textContent=s.target;let m=document.createElement("span");if(m.textContent=`${s.strategy} | ${s.evidence}`,l.append(d,m),r.append(u,l),s.error){let c=document.createElement("small");c.textContent=s.error,r.appendChild(c)}i.appendChild(r)}}setInspectorPrompt(e,t){this.latestPromptText=e,this.inspPrompt&&(this.inspPrompt.textContent=e),t&&this.inspModel&&(this.inspModel.textContent=t),this.inspLatency&&(this.inspLatency.textContent="Aguardando IA..."),this.activeTab==="debug"&&this.refreshDebugView()}refreshInspectorView(){let e=this.latestPlan;this.inspModel&&(this.inspModel.textContent=e?.usedModel||this.initialSettings.model),this.inspLatency&&(this.inspLatency.textContent=e?.durationMs?`${e.durationMs}ms`:"--"),this.inspTokens&&(this.inspTokens.textContent=e?.tokensUsed?`${e.tokensUsed}`:"--"),this.inspPrompt&&(this.inspPrompt.textContent=e?.promptSent||this.latestPromptText||""),this.inspRationale&&(this.inspRationale.textContent=e?.rationale||""),this.renderBrainExplorer(),this.brainActiveTab&&this.renderBrainFileContent(this.brainActiveTab)}brainOpenTabs=[];brainActiveTab=null;brainSelectedFolder=null;brainOpenFolders=new Set(["folder-ia","folder-ctx","folder-meta"]);brainCanvasHidden=!1;brainCanvasHeight=280;GLOBAL_ID="__global__";GLOBAL_LABEL="Contexto Global";getBrainFileColor(e){return{file:"#7eb8f7",code:"#f4c96a",list:"#a5d6a7",chip:"#80cbc4",sparkles:"#ce93d8",clock:"#ffcc80",info:"#81deea"}[e]||"#9e9e9e"}renderMarkdown(e){let t=d=>d.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"),a="",i=e.split(`
`),n=!1,s="",r=[],u=()=>{if(!n)return"";n=!1;let d=r.join(`
`);return r=[],`<div class="eq-md-codeblock"><div class="eq-md-codelang">${t(s)}</div><pre><code>${t(d)}</code></pre></div>`},l=d=>d.replace(/`([^`]+)`/g,(m,c)=>`<code class="eq-md-inline">${t(c)}</code>`).replace(/\*\*\*([^*]+)\*\*\*/g,(m,c)=>`<strong><em>${t(c)}</em></strong>`).replace(/\*\*([^*]+)\*\*/g,(m,c)=>`<strong>${t(c)}</strong>`).replace(/\*([^*]+)\*/g,(m,c)=>`<em>${t(c)}</em>`).replace(/~~([^~]+)~~/g,(m,c)=>`<del>${t(c)}</del>`);for(let d of i){if(/^```/.test(d)){n?a+=u():(n=!0,s=d.slice(3).trim()||"text",r=[]);continue}if(n){r.push(d);continue}let m=d.match(/^#s+(.+)/),c=d.match(/^##s+(.+)/),h=d.match(/^###s+(.+)/);if(h){a+=`<h3 class="eq-md-h3">${l(h[1])}</h3>`;continue}if(c){a+=`<h2 class="eq-md-h2">${l(c[1])}</h2>`;continue}if(m){a+=`<h1 class="eq-md-h1">${l(m[1])}</h1>`;continue}let p=d.match(/^>s*(.*)/);if(p){a+=`<blockquote class="eq-md-bq">${l(p[1])}</blockquote>`;continue}if(/^---+$/.test(d)){a+='<hr class="eq-md-hr">';continue}let g=d.match(/^[-*+]s+(.+)/);if(g){a+=`<div class="eq-md-li"><span class="eq-md-bullet">\xB7</span><span>${l(g[1])}</span></div>`;continue}if(d.trim()===""){a+='<div class="eq-md-gap"></div>';continue}a+=`<div class="eq-md-p">${l(t(d))}</div>`}return a+=u(),a}getBrainFolders(){let e=this.latestPlan,t=this.latestImages.map((i,n)=>({id:"img-"+n,label:"img-"+(n+1)+"."+(i.mediaType?.split("/")?.[1]||"jpg"),icon:"image"})),a=[{id:"folder-ia",label:"Resposta da IA",files:[{id:"rationale",label:"rationale.md",icon:"file"},{id:"actions",label:"actions.json",icon:"code"},{id:"summary",label:"resumo.txt",icon:"list"}]},{id:"folder-ctx",label:"Contexto & Prompt",files:[{id:"prompt",label:"prompt-enviado.txt",icon:"file"},{id:"rag",label:"rag-context.txt",icon:"chip"}]},{id:"folder-meta",label:"Metadados",files:[{id:"meta-model",label:"modelo.info",icon:"sparkles"},{id:"meta-latency",label:"latencia.info",icon:"clock"},{id:"meta-tokens",label:"tokens.info",icon:"info"}]}];return e?.executionResult&&a.push({id:"folder-exec",label:"Execu\xE7\xE3o",files:[{id:"exec-steps",label:"steps.log",icon:"list"},{id:"exec-result",label:"resultado.log",icon:"file"}]}),a.push({id:"folder-media",label:"M\xEDdia",files:[],subfolders:[{id:"media-images",label:"Imagens",icon:"image",files:t}]}),a}getActiveFolder(){if(!this.brainActiveTab)return null;for(let e of this.getBrainFolders()){if(e.files.some(t=>t.id===this.brainActiveTab))return e.id;for(let t of e.subfolders||[])if(t.files.some(a=>a.id===this.brainActiveTab))return t.id}return null}smartCopy(){let e=this.shadow.querySelector("#eq-brain-content");if(this.brainActiveTab&&this.brainActiveTab.startsWith("img-")){let a=parseInt(this.brainActiveTab.slice(4),10),i=this.latestImages[a];if(i?.base64){let n="data:"+(i.mediaType||"image/jpeg")+";base64,"+i.base64,s=this.latestImageDescriptions.find(u=>u.index===a),r=["[EasyQuiz] Imagem "+(a+1)+" de "+this.latestImages.length,"Status: "+(i.captureStatus||"desconhecido"),"Tipo: "+(i.mediaType||"--"),i.alt?"Alt: "+i.alt:"",i.source?"Fonte: "+i.source:"",s?.description?"Analise IA: "+s.description:"",i.textContext?"Contexto: "+i.textContext:"","Data URI: "+n.slice(0,80)+"..."].filter(Boolean).join(`
`);navigator.clipboard.writeText(r).then(()=>this.showToast("Imagem copiada (URI + metadados)","success",2500));return}}if(this.brainSelectedFolder==="media-images"){let a=["[EasyQuiz] Imagens capturadas: "+this.latestImages.length];this.latestImages.forEach((i,n)=>{let s=this.latestImageDescriptions.find(r=>r.index===n);a.push(n+1+". "+(i.captureStatus||"?")+(s?.description?" \u2014 "+s.description.slice(0,80):""))}),navigator.clipboard.writeText(a.join(`
`)).then(()=>this.showToast("Lista de imagens copiada","success",2500));return}if(this.brainActiveTab){let a=this.getBrainFileText(this.brainActiveTab);if(a){navigator.clipboard.writeText(a).then(()=>this.showToast("Conte\xFAdo copiado","success",2200));return}}if(this.brainSelectedFolder){let a=e?.innerText?.trim()||"";if(a){navigator.clipboard.writeText(a).then(()=>this.showToast("Estrutura copiada","success",2200));return}}let t=e?.innerText?.trim()||"";t?navigator.clipboard.writeText(t).then(()=>this.showToast("Conte\xFAdo copiado","success",2200)):this.showToast("Nada selecionado para copiar","warning",2e3)}initBrainControls(){let e=this.shadow.querySelector("#eq-brain-resize-handle"),t=this.shadow.querySelector(".eq-brain-canvas"),a=this.shadow.querySelector("#eq-brain-canvas-toggle"),i=this.shadow.querySelector("#eq-copy-prompt-btn");if(a&&(a.innerHTML=this.brainCanvasHidden?C.eyeOff:C.eye,a.title=this.brainCanvasHidden?"Mostrar visualizador":"Ocultar visualizador"),!this._brainControlsInited){if(this._brainControlsInited=!0,e&&t){let n=0,s=0;e.addEventListener("mousedown",r=>{r.preventDefault(),n=r.clientY,s=t.getBoundingClientRect().height;let u=d=>{let m=Math.max(100,Math.min(520,s+d.clientY-n));t.style.height=m+"px",this.brainCanvasHeight=m},l=()=>{window.removeEventListener("mousemove",u),window.removeEventListener("mouseup",l)};window.addEventListener("mousemove",u),window.addEventListener("mouseup",l)})}a&&t&&a.addEventListener("click",()=>{this.brainCanvasHidden=!this.brainCanvasHidden;let n=this.shadow.querySelector("#eq-brain-resize-handle");this.brainCanvasHidden?(t.classList.add("is-hidden"),a.innerHTML=C.eyeOff,a.title="Mostrar visualizador",n&&(n.style.display="none")):(t.classList.remove("is-hidden"),a.innerHTML=C.eye,a.title="Ocultar visualizador",n&&(n.style.display=""))}),i&&i.addEventListener("click",()=>this.smartCopy())}}copyCurrentContent(){this.smartCopy()}getBrainFileText(e){if(e===this.GLOBAL_ID)return this.buildGlobalContext();if(e==="ai-prompt")return this.latestPromptText||this.latestPlan?.promptSent||""||"// Nenhum prompt enviado ainda. Execute o Autopilot para gerar.";if(e==="ai-context"){let i=this.latestContext;if(!i)return"// Aguardando captura de contexto pelo EasyQuiz...";let n={scope:i.scope.tagName.toLowerCase()+(i.scope.id?"#"+i.scope.id:"")+(i.scope.className?"."+i.scope.className.split(" ").join("."):""),questionLength:i.questionText.length,questionSnippet:i.questionText.slice(0,200)+(i.questionText.length>200?"...":""),controlsCount:i.controls.length,controls:i.controls.map((s,r)=>({index:r+1,tag:s.tag,type:s.type,name:s.name||void 0,id:s.id||void 0,value:s.value||void 0,label:s.label||void 0,role:s.role}))};return JSON.stringify(n,null,2)}if(e==="ai-response"){let i=this.latestPlan;return i?i.rawResponse||JSON.stringify({pageType:i.pageType,mode:i.mode,confidence:i.confidence,rationale:i.rationale,actions:i.actions},null,2):"// Aguardando retorno da API..."}if(e.startsWith("img-")){let i=parseInt(e.slice(4),10),n=this.latestImages[i];if(!n)return"Imagem n\xE3o encontrada.";let s=this.latestImageDescriptions.find(r=>r.index===i);return[`Imagem ${i+1} de ${this.latestImages.length}`,`Status: ${n.captureStatus||"desconhecido"}`,`Relev\xE2ncia: ${s?.relevant??!0?"Relevante":"Ignorada"}`,`Tipo: ${n.mediaType||"--"}`,n.alt?`Alt: ${n.alt}`:"",n.source?`Fonte: ${n.source}`:"",n.associatedLabel?`R\xF3tulo: ${n.associatedLabel}`:"",s?.description?`
An\xE1lise IA: ${s.description}`:"",n.textContext?`
Contexto textual: ${n.textContext}`:""].filter(Boolean).join(`
`)}let t=this.latestPlan;return{rationale:t?.rationale||"Aguardando racioc\xEDnio da IA (ou extra\xE7\xE3o em andamento)...",actions:t?.actions?.length?JSON.stringify(t.actions,null,2):"// Nenhuma a\xE7\xE3o planejada no momento.",summary:t?`Modo: ${t.mode||"auto"}
Confian\xE7a: ${Math.round((t.confidence||0)*100)}%
A\xE7\xF5es: ${t.actions?.length||0}
Modelo: ${t.usedModel||"--"}`:"Aguardando primeira an\xE1lise completa...",prompt:t?.promptSent||this.latestPromptText||"Nenhum prompt em mem\xF3ria. A IA ainda n\xE3o foi acionada.",rag:t?.ragContext||"Nenhuma mem\xF3ria estendida usada ou capturada.","meta-model":`Modelo Ativo: ${t?.usedModel||this.initialSettings.model||"--"}`,"meta-latency":t?.durationMs?`Lat\xEAncia: ${t.durationMs}ms`:"Lat\xEAncia: --","meta-tokens":t?.tokensUsed?`Tokens: ${t.tokensUsed}`:"Tokens: --","exec-steps":t?.executionResult?.steps?.map(i=>JSON.stringify(i)).join(`
`)||"Passos de execu\xE7\xE3o ainda n\xE3o iniciados.","exec-result":t?.executionResult?JSON.stringify(t.executionResult,null,2):"Aguardando resultado de execu\xE7\xE3o..."}[e]??"Conte\xFAdo n\xE3o dispon\xEDvel para este arquivo."}buildGlobalContext(){let e=this.latestPlan,t=this.latestContext,a=this.latestImages,i=s=>String(s??"-- sem dados --"),n=["# Vis\xE3o Global \u2014 EasyQuiz","",`**URL:** ${window.location.href}`,`**T\xEDtulo:** ${document.title}`,`**M\xEDdias Capturadas:** ${a.length} imagem(ns)`,"","---","","## Status da Extra\xE7\xE3o Local","","### Texto do Enunciado Detectado",t?t.questionText:"Aguardando captura do DOM...","","### Controles (Alternativas/Bot\xF5es)",t&&t.controls.length>0?t.controls.map(s=>`- [${s.type}] ${s.label||s.id||s.name||s.value||"Sem r\xF3tulo"}`).join(`
`):"Nenhum controle capturado ainda.","","---","","## Resposta da IA","","### Racioc\xEDnio (Rationale)",i(e?.rationale||"Aguardando an\xE1lise da IA..."),"","### A\xE7\xF5es a Executar",e?.actions?.length?JSON.stringify(e.actions,null,2):"// Nenhuma a\xE7\xE3o planejada no momento.","","### Resumo",e?`- Modo: ${e.mode||"auto"}
- Confian\xE7a: ${Math.round((e.confidence||0)*100)}%
- Total de a\xE7\xF5es: ${e.actions?.length||0}
- Modelo: ${e.usedModel||"--"}`:"Aguardando primeira an\xE1lise...","","---","","## Inje\xE7\xE3o & Metadados","","### Prompt Enviado (Raw)",i(e?.promptSent||this.latestPromptText||"Nenhum prompt em mem\xF3ria."),"","### Contexto RAG Acumulado",i(e?.ragContext||"Nenhuma mem\xF3ria estendida usada."),"",`- **Modelo Configurado:** ${e?.usedModel||this.initialSettings.model||"--"}`,`- **Lat\xEAncia \xDAltimo Call:** ${e?.durationMs?e.durationMs+"ms":"--"}`,`- **Tokens Consumidos:** ${e?.tokensUsed??"--"}`,""];return e?.executionResult&&(n.push("---","","## Execu\xE7\xE3o Autom\xE1tica (Autopilot)",""),n.push("### Steps (Passo a Passo)"),n.push(e.executionResult?.steps?.map(s=>JSON.stringify(s)).join(`
`)||"Sem passos."),n.push("","### Resultado Final"),n.push(JSON.stringify(e.executionResult,null,2))),n.join(`
`)}renderBrainExplorer(){let e=this.shadow.querySelector("#eq-brain-explorer");if(!e)return;e.innerHTML="";let t=this.getActiveFolder(),a=document.createElement("div");a.className="eq-tree-file eq-tree-global"+(this.brainActiveTab===this.GLOBAL_ID?" is-selected":""),a.innerHTML=`<span class="eq-tree-ficon" style="color:#60a5fa">${C.folderTree}</span><span class="eq-tree-label">${this.GLOBAL_LABEL}</span>`,a.addEventListener("click",()=>{this.brainSelectedFolder=null,this.openBrainFile(this.GLOBAL_ID,this.GLOBAL_LABEL)}),e.appendChild(a);let i=document.createElement("div");i.className="eq-tree-sep",e.appendChild(i);for(let n of this.getBrainFolders()){let s=this.brainOpenFolders.has(n.id),r=this.brainSelectedFolder===n.id||t===n.id,u=document.createElement("div");u.className="eq-tree-folder"+(r?" is-folder-sel":"");let l=document.createElement("span");l.className="eq-tree-arrow",l.innerHTML=s?C.chevronDown:C.chevronRight,l.addEventListener("click",p=>{p.stopPropagation(),this.brainOpenFolders.has(n.id)?this.brainOpenFolders.delete(n.id):this.brainOpenFolders.add(n.id),this.renderBrainExplorer()}),u.appendChild(l);let d=document.createElement("span");d.className="eq-tree-ficon",d.style.color="#fbbf24",d.innerHTML=C.folder;let m=document.createElement("span");m.className="eq-tree-label",m.textContent=n.label,u.appendChild(d),u.appendChild(m),u.addEventListener("click",()=>{this.brainSelectedFolder=n.id,this.brainActiveTab=null,this.showFolderContent(n),this.renderBrainExplorer(),this.renderBrainTabs()}),e.appendChild(u);let c=document.createElement("div"),h=n.files.length+(n.subfolders?.reduce((p,g)=>p+g.files.length+1,0)??0);c.className="eq-tree-children"+(s?" is-open":""),c.style.setProperty("--child-count",String(h));for(let p of n.files){let g=this.getBrainFileColor(p.icon),f=document.createElement("div");f.className="eq-tree-file"+(this.brainActiveTab===p.id?" is-selected":""),f.innerHTML=`<span class="eq-tree-ficon" style="color:${g}">${C[p.icon]||C.file}</span><span class="eq-tree-label">${p.label}</span>`,f.addEventListener("click",b=>{b.stopPropagation(),this.brainSelectedFolder=null,this.openBrainFile(p.id,p.label)}),c.appendChild(f)}for(let p of n.subfolders||[]){let g=this.brainOpenFolders.has(p.id),f=this.brainSelectedFolder===p.id,b=document.createElement("div");b.className="eq-tree-folder eq-tree-subfolder"+(f?" is-folder-sel":""),b.style.paddingLeft="18px";let v=document.createElement("span");v.className="eq-tree-arrow",v.innerHTML=g?C.chevronDown:C.chevronRight,v.addEventListener("click",S=>{S.stopPropagation(),this.brainOpenFolders.has(p.id)?this.brainOpenFolders.delete(p.id):this.brainOpenFolders.add(p.id),this.renderBrainExplorer()}),b.appendChild(v);let y=document.createElement("span");y.className="eq-tree-ficon",y.style.color="#60a5fa",y.innerHTML=C[p.icon]||C.folder;let x=document.createElement("span");x.className="eq-tree-label",x.textContent=p.label;let w=document.createElement("span");w.style.cssText="font-size:9px;color:#666;margin-left:4px;flex-shrink:0;",w.textContent=String(p.files.length),b.appendChild(y),b.appendChild(x),b.appendChild(w),b.addEventListener("click",()=>{this.brainSelectedFolder=p.id,this.brainActiveTab=null,this.brainOpenFolders.add(p.id),this.showSubfolderContent(p),this.renderBrainExplorer(),this.renderBrainTabs()}),c.appendChild(b);let q=document.createElement("div");q.className="eq-tree-children"+(g?" is-open":""),q.style.setProperty("--child-count",String(p.files.length));for(let S of p.files){let T=this.getBrainFileColor(S.icon),A=document.createElement("div");A.className="eq-tree-file"+(this.brainActiveTab===S.id?" is-selected":""),A.style.paddingLeft="32px",A.innerHTML=`<span class="eq-tree-ficon" style="color:${T}">${C[S.icon]||C.file}</span><span class="eq-tree-label">${S.label}</span>`,A.addEventListener("click",P=>{P.stopPropagation(),this.brainSelectedFolder=null,this.openBrainFile(S.id,S.label)}),q.appendChild(A)}c.appendChild(q)}e.appendChild(c)}}showFolderContent(e){let t=this.shadow.querySelector("#eq-brain-content");if(!t)return;t.innerHTML="";let a=r=>String(r??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"),i=document.createElement("div");i.className="eq-folder-view";let n=document.createElement("div");n.className="eq-folder-view-header",n.innerHTML=`<span class="eq-tree-ficon" style="color:#fbbf24">${C.folder}</span><span>${a(e.label)}</span>`,i.appendChild(n);let s=document.createElement("div");s.className="eq-folder-view-files";for(let r of e.files){let u=this.getBrainFileColor(r.icon),l=document.createElement("div");l.className="eq-folder-view-row",l.innerHTML=`<span class="eq-tree-ficon" style="color:${u}">${C[r.icon]||C.file}</span><span>${a(r.label)}</span>`,l.addEventListener("click",()=>this.openBrainFile(r.id,r.label)),s.appendChild(l)}for(let r of e.subfolders||[]){let u=document.createElement("div");u.className="eq-folder-view-row",u.style.cssText="display:flex;align-items:center;gap:6px;padding:7px 10px;cursor:pointer;border-radius:5px;";let l=r.id==="media-images"?this.latestImages.length:r.files.length;u.innerHTML=`<span class="eq-tree-ficon" style="color:#60a5fa">${C[r.icon]||C.folder}</span><span style="flex:1">${a(r.label)}</span><span style="font-size:9px;color:#555;">${l} item${l!==1?"s":""}</span>`,u.addEventListener("mouseenter",()=>{u.style.background="rgba(255,255,255,0.04)"}),u.addEventListener("mouseleave",()=>{u.style.background=""}),u.addEventListener("click",()=>{this.brainSelectedFolder=r.id,this.brainActiveTab=null,this.brainOpenFolders.add(r.id),this.showSubfolderContent(r),this.renderBrainExplorer(),this.renderBrainTabs()}),s.appendChild(u)}i.appendChild(s),t.appendChild(i)}openBrainFile(e,t){if(this.brainOpenTabs.find(a=>a.id===e)||this.brainOpenTabs.push({id:e,label:t}),this.brainActiveTab=e,this.brainCanvasHidden){let a=this.shadow.querySelector(".eq-brain-canvas"),i=this.shadow.querySelector("#eq-brain-canvas-toggle");a?.classList.remove("is-hidden"),i&&(i.innerHTML=C.eye,i.title="Ocultar visualizador"),this.brainCanvasHidden=!1}this.renderBrainExplorer(),this.renderBrainTabs(),this.renderBrainFileContent(e)}showSubfolderContent(e){e.id==="media-images"?this.showMediaGrid():this.showFolderContent(e)}showMediaGrid(){let e=this.shadow.querySelector("#eq-brain-content");if(!e)return;e.innerHTML="";let t=this.latestImages,a=this.latestImageDescriptions,i=document.createElement("div");i.style.cssText="display:flex;flex-direction:column;height:100%;overflow:hidden;";let n=document.createElement("div");n.style.cssText="padding:8px 12px;font-size:10px;color:#666;border-bottom:1px solid rgba(255,255,255,0.06);display:flex;justify-content:space-between;flex-shrink:0;",n.innerHTML=`<span style="color:#60a5fa;font-weight:600;">Imagens</span><span>${t.length} captura${t.length!==1?"s":""}</span>`,i.appendChild(n);let s=document.createElement("div");if(s.style.cssText="flex:1;overflow-y:auto;padding:10px;",t.length===0)s.innerHTML='<div style="text-align:center;padding:32px 0;color:#555;font-size:11px;">Nenhuma imagem capturada.<br><span style="opacity:0.6;font-size:10px;">Ative "Vis\xE3o Computacional" nas configura\xE7\xF5es e execute uma an\xE1lise.</span></div>';else{let r=document.createElement("div");r.style.cssText="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;",t.forEach((u,l)=>{let m=a.find(g=>g.index===l)?.relevant??!0,c=u.base64?`data:${u.mediaType||"image/jpeg"};base64,${u.base64}`:"",h=document.createElement("div");if(h.style.cssText=`position:relative;aspect-ratio:1;border-radius:5px;overflow:hidden;cursor:pointer;background:#111;border:2px solid ${m?"rgba(96,165,250,0.3)":"rgba(255,255,255,0.06)"};transition:border-color 0.15s,transform 0.12s;`,c){let g=document.createElement("img");g.src=c,g.style.cssText="width:100%;height:100%;object-fit:cover;display:block;",h.appendChild(g)}else{let g=document.createElement("div");g.style.cssText="width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:#555;font-size:10px;",g.textContent="Texto",h.appendChild(g)}let p=document.createElement("div");p.style.cssText="position:absolute;bottom:3px;right:3px;background:rgba(0,0,0,0.75);border-radius:3px;padding:1px 4px;font-size:9px;color:#aaa;",p.textContent=String(l+1),h.appendChild(p),h.addEventListener("mouseenter",()=>{h.style.transform="scale(1.03)",h.style.borderColor="#60a5fa"}),h.addEventListener("mouseleave",()=>{h.style.transform="",h.style.borderColor=m?"rgba(96,165,250,0.3)":"rgba(255,255,255,0.06)"}),h.addEventListener("click",()=>{this.brainSelectedFolder=null,this.openBrainFile("img-"+l,"img-"+(l+1)+"."+(u.mediaType?.split("/")?.[1]||"jpg"))}),r.appendChild(h)}),s.appendChild(r)}i.appendChild(s),e.appendChild(i)}showImageFile(e){let t=this.shadow.querySelector("#eq-brain-content");if(!t)return;t.innerHTML="";let a=this.latestImages[e];if(!a){t.innerHTML='<div style="padding:16px;color:#666;font-size:11px;">Imagem n\xE3o encontrada.</div>';return}let i=this.latestImageDescriptions.find(h=>h.index===e),n=a.base64?`data:${a.mediaType||"image/jpeg"};base64,${a.base64}`:"",s=i?.relevant??!0,r=a.captureStatus==="captured"?"Visual":a.captureStatus==="text_only"?"Texto":"Falhou",u=a.captureStatus==="captured"?"#4ade80":a.captureStatus==="text_only"?"#fbbf24":"#ef4444",l=document.createElement("div");l.style.cssText="display:flex;flex-direction:column;height:100%;overflow:hidden;";let d=document.createElement("div");if(d.style.cssText="flex:0 0 auto;background:#0a0a0f;display:flex;align-items:center;justify-content:center;padding:10px;min-height:140px;max-height:55%;cursor:zoom-in;border-bottom:1px solid rgba(255,255,255,0.06);position:relative;overflow:hidden;",n){let h=document.createElement("img");h.src=n,h.alt=a.alt||`Imagem ${e+1}`,h.style.cssText="max-width:100%;max-height:100%;object-fit:contain;border-radius:4px;transform-origin:center center;transition:transform 0.12s ease;user-select:none;",d.appendChild(h);let p=1,g=.5,f=4;d.addEventListener("wheel",y=>{y.preventDefault(),y.stopPropagation();let x=y.deltaY>0?-.15:.15;p=Math.min(f,Math.max(g,p+x)),h.style.transform=p===1?"":`scale(${p.toFixed(2)})`,d.style.cursor=p>1?"grab":"zoom-in";let w=d.querySelector(".eq-zoom-hint");w&&(w.textContent=p!==1?`${Math.round(p*100)}% \xB7 scroll para zoom \xB7 clique para ampliar`:"scroll para zoom \xB7 clique para ampliar")},{passive:!1}),d.addEventListener("click",()=>this.openImageLightbox(e));let b=document.createElement("div");b.className="eq-zoom-hint",b.style.cssText="position:absolute;bottom:6px;right:8px;font-size:9px;color:rgba(255,255,255,0.3);pointer-events:none;",b.textContent="scroll para zoom \xB7 clique para ampliar",d.appendChild(b);let v=this.latestImages.length;if(v>1){let y=x=>{let w=document.createElement("button");return w.style.cssText=`position:absolute;${x==="prev"?"left:6px":"right:6px"};top:50%;transform:translateY(-50%);background:rgba(0,0,0,0.55);border:1px solid rgba(255,255,255,0.12);color:var(--eq-text);width:24px;height:24px;border-radius:50%;cursor:pointer;font-size:13px;z-index:5;display:flex;align-items:center;justify-content:center;transition:background 0.12s;`,w.innerHTML=x==="prev"?"\u2039":"\u203A",w.title=x==="prev"?"Imagem anterior":"Pr\xF3xima imagem",w.style.display=x==="prev"&&e===0||x==="next"&&e===v-1?"none":"flex",w.addEventListener("mouseenter",()=>{w.style.background="rgba(96,165,250,0.3)"}),w.addEventListener("mouseleave",()=>{w.style.background="rgba(0,0,0,0.55)"}),w.addEventListener("click",q=>{q.stopPropagation();let S=x==="prev"?e-1:e+1;if(S>=0&&S<v){this.brainActiveTab="img-"+S;let T=this.latestImages[S],A="img-"+(S+1)+"."+(T?.mediaType?.split("/")?.[1]||"jpg");this.brainOpenTabs.find(P=>P.id==="img-"+S)||this.brainOpenTabs.push({id:"img-"+S,label:A}),this.renderBrainExplorer(),this.renderBrainTabs(),this.showImageFile(S)}}),w};d.appendChild(y("prev")),d.appendChild(y("next"))}}else d.style.cssText+="color:#555;font-size:11px;",d.textContent="Sem dados visuais \u2014 captura em modo texto";l.appendChild(d);let m=document.createElement("div");m.style.cssText="flex:1;overflow-y:auto;padding:10px 12px;display:flex;flex-direction:column;gap:7px;";let c=(h,p,g="#aaa")=>{let f=document.createElement("div");return f.style.cssText="display:flex;gap:8px;font-size:10.5px;",f.innerHTML=`<span style="color:#555;min-width:72px;flex-shrink:0;">${h}</span><span style="color:${g};word-break:break-word;">${p}</span>`,f};if(m.appendChild(c("\xCDndice",`Imagem ${e+1} de ${this.latestImages.length}`)),m.appendChild(c("Status",r,u)),m.appendChild(c("Relev\xE2ncia",s?"Relevante":"Ignorada",s?"#60a5fa":"#666")),m.appendChild(c("Tipo",a.mediaType||"--")),a.alt&&m.appendChild(c("Alt text",a.alt)),a.source&&m.appendChild(c("Fonte",a.source)),a.associatedLabel&&m.appendChild(c("R\xF3tulo",a.associatedLabel)),i?.description){let h=document.createElement("div");h.style.cssText="background:rgba(96,165,250,0.06);border:1px solid rgba(96,165,250,0.15);border-radius:5px;padding:8px;",h.innerHTML=`<div style="font-size:9px;color:#60a5fa;font-weight:600;margin-bottom:4px;">AN\xC1LISE DA IA</div><div style="font-size:10.5px;color:var(--eq-text);line-height:1.55;">${i.description}</div>`,m.appendChild(h)}if(a.textContext){let h=document.createElement("div");h.style.cssText="background:rgba(251,191,36,0.05);border:1px solid rgba(251,191,36,0.12);border-radius:5px;padding:8px;",h.innerHTML=`<div style="font-size:9px;color:#fbbf24;font-weight:600;margin-bottom:4px;">CONTEXTO TEXTUAL</div><div style="font-size:10.5px;color:var(--eq-text);line-height:1.55;">${a.textContext}</div>`,m.appendChild(h)}l.appendChild(m),t.appendChild(l)}openImageLightbox(e){let t=this.latestImages[e];if(!t)return;let a=this.latestImageDescriptions.find(w=>w.index===e),i=t.base64?`data:${t.mediaType||"image/jpeg"};base64,${t.base64}`:"";this.shadow.querySelector("#eq-img-lightbox")?.remove();let n=document.createElement("div");n.id="eq-img-lightbox",n.style.cssText="position:fixed;inset:0;z-index:2147483647;background:rgba(0,0,0,0.92);display:flex;align-items:center;justify-content:center;padding:20px;box-sizing:border-box;";let s=document.createElement("div");s.style.cssText="display:flex;width:min(90vw,1100px);max-height:90vh;border-radius:10px;background:#0f0f17;border:1px solid rgba(255,255,255,0.1);box-shadow:0 24px 64px rgba(0,0,0,0.8);position:relative;overflow:hidden;";let r=document.createElement("div");r.style.cssText="position:absolute;top:0;left:0;right:0;z-index:20;display:flex;align-items:center;justify-content:space-between;padding:7px 12px;background:rgba(0,0,0,0.6);backdrop-filter:blur(4px);border-bottom:1px solid rgba(255,255,255,0.07);border-radius:10px 10px 0 0;";let u=document.createElement("span");u.style.cssText="font-size:11px;color:rgba(234,240,248,0.45);font-weight:600;letter-spacing:0.04em;user-select:none;",u.textContent="Imagem "+(e+1)+" de "+this.latestImages.length;let l=document.createElement("button");l.style.cssText="background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.14);color:rgba(234,240,248,0.65);width:26px;height:26px;border-radius:6px;cursor:pointer;font-size:16px;display:flex;align-items:center;justify-content:center;line-height:1;transition:background 0.15s,color 0.15s;flex-shrink:0;",l.textContent="\xD7",l.title="Fechar (ESC)",l.addEventListener("mouseenter",()=>{l.style.background="rgba(239,68,68,0.32)",l.style.color="#fff"}),l.addEventListener("mouseleave",()=>{l.style.background="rgba(255,255,255,0.08)",l.style.color="rgba(234,240,248,0.65)"}),r.appendChild(u),r.appendChild(l);let d=document.createElement("div");if(d.style.cssText="flex:0 0 65%;display:flex;align-items:center;justify-content:center;background:#050508;padding:16px;min-width:0;overflow:hidden;position:relative;",i){let w=document.createElement("img");w.src=i,w.style.cssText="max-width:100%;max-height:82vh;object-fit:contain;border-radius:4px;transform-origin:center center;transition:transform 0.1s ease;user-select:none;display:block;";let q=1,S=.3,T=6;d.addEventListener("wheel",P=>{P.preventDefault(),P.stopPropagation();let z=P.deltaY<0?.18:-.18;q=Math.min(T,Math.max(S,q+z)),w.style.transform=`scale(${q.toFixed(3)})`,w.style.cursor=q>1?"grab":"default",A.textContent=`${Math.round(q*100)}%`,A.style.opacity="1",clearTimeout(d._zt),d._zt=setTimeout(()=>{A.style.opacity="0"},1200)},{passive:!1}),w.addEventListener("dblclick",()=>{q=1,w.style.transform="",w.style.cursor="default",A.textContent="100%",A.style.opacity="1",setTimeout(()=>{A.style.opacity="0"},800)});let A=document.createElement("div");A.style.cssText="position:absolute;bottom:10px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,0.7);color:#aaa;font-size:10px;padding:2px 8px;border-radius:10px;pointer-events:none;opacity:0;transition:opacity 0.3s;",A.textContent="100%",d.appendChild(w),d.appendChild(A)}else d.innerHTML='<div style="color:#555;font-size:12px;text-align:center;width:100%;">Sem dados visuais</div>';d.style.paddingTop="44px",s.appendChild(d);let m=document.createElement("div");m.style.cssText="flex:0 0 35%;overflow-y:auto;padding:20px 16px 20px;border-left:1px solid rgba(255,255,255,0.06);display:flex;flex-direction:column;gap:8px;min-width:0;";let c=document.createElement("div");c.style.cssText="font-size:13px;font-weight:700;color:var(--eq-text-bright);margin-bottom:6px;",c.textContent=`Imagem ${e+1} de ${this.latestImages.length}`,m.appendChild(c);let h=t.captureStatus==="captured"?"#4ade80":t.captureStatus==="text_only"?"#fbbf24":"#ef4444",p=t.captureStatus==="captured"?"Visual":t.captureStatus==="text_only"?"Texto":"Falhou",g=(w,q,S="#aaa")=>{let T=document.createElement("div");return T.style.cssText="display:flex;gap:6px;font-size:10px;",T.innerHTML=`<span style="color:#555;min-width:64px;flex-shrink:0;">${w}</span><span style="color:${S};word-break:break-word;">${q}</span>`,T};m.appendChild(g("Status",p,h)),m.appendChild(g("Relev\xE2ncia",a?.relevant??!0?"Relevante":"Ignorada",a?.relevant??!0?"#60a5fa":"#666")),m.appendChild(g("Tipo",t.mediaType||"--")),t.alt&&m.appendChild(g("Alt",t.alt)),t.source&&m.appendChild(g("Fonte",t.source)),t.associatedLabel&&m.appendChild(g("R\xF3tulo",t.associatedLabel));let f=document.createElement("div");if(f.style.cssText="font-size:9px;color:#444;margin-top:4px;",f.textContent="Scroll na imagem para zoom \xB7 Duplo-clique para resetar",m.appendChild(f),a?.description){let w=document.createElement("div");w.style.cssText="background:rgba(96,165,250,0.07);border:1px solid rgba(96,165,250,0.18);border-radius:5px;padding:8px;margin-top:4px;",w.innerHTML=`<div style="font-size:9px;color:#60a5fa;font-weight:700;margin-bottom:5px;">AN\xC1LISE DA IA</div><div style="font-size:10px;color:var(--eq-text);line-height:1.6;">${a.description}</div>`,m.appendChild(w)}if(t.textContext){let w=document.createElement("div");w.style.cssText="background:rgba(251,191,36,0.05);border:1px solid rgba(251,191,36,0.12);border-radius:5px;padding:8px;",w.innerHTML=`<div style="font-size:9px;color:#fbbf24;font-weight:700;margin-bottom:5px;">CONTEXTO TEXTUAL</div><div style="font-size:10px;color:var(--eq-text);line-height:1.6;">${t.textContext}</div>`,m.appendChild(w)}s.appendChild(m),s.appendChild(r),n.appendChild(s),document.body.appendChild(n);let b=()=>{n.remove(),document.removeEventListener("click",v,!0),document.removeEventListener("keydown",x),window.removeEventListener("keydown",x)};l.addEventListener("click",w=>{w.stopPropagation(),b()}),s.addEventListener("click",w=>w.stopPropagation()),n.addEventListener("click",()=>b());let v=w=>{let q=this.shadow.host;q&&!q.contains(w.target)&&b()};setTimeout(()=>document.addEventListener("click",v,!0),0);let y=this.latestImages.length;if(y>1){let w=q=>{let S=document.createElement("button");return S.style.cssText=`position:absolute;${q==="prev"?"left:12px":"right:12px"};top:50%;transform:translateY(-50%);background:rgba(0,0,0,0.6);border:1px solid rgba(255,255,255,0.15);color:var(--eq-text-bright);width:36px;height:36px;border-radius:50%;cursor:pointer;font-size:22px;z-index:10;display:${q==="prev"&&e===0||q==="next"&&e===y-1?"none":"flex"};align-items:center;justify-content:center;`,S.innerHTML=q==="prev"?"\u2039":"\u203A",S.title=q==="prev"?"Anterior":"Pr\xF3xima",S.addEventListener("mouseenter",()=>{S.style.background="rgba(96,165,250,0.35)"}),S.addEventListener("mouseleave",()=>{S.style.background="rgba(0,0,0,0.6)"}),S.addEventListener("click",T=>{T.stopPropagation();let A=q==="prev"?e-1:e+1;A>=0&&A<y&&(n.remove(),this.openImageLightbox(A))}),S};n.appendChild(w("prev")),n.appendChild(w("next"))}let x=w=>{w.key==="Escape"&&b()};window.addEventListener("keydown",x),document.addEventListener("keydown",x)}closeBrainTab(e){let t=this.brainOpenTabs.findIndex(a=>a.id===e);t!==-1&&(this.brainOpenTabs.splice(t,1),this.brainActiveTab===e&&(this.brainActiveTab=this.brainOpenTabs[t-1]?.id||this.brainOpenTabs[0]?.id||null),this.renderBrainExplorer(),this.renderBrainTabs(),this.refreshBrainCanvas())}refreshBrainCanvas(){if(this.brainActiveTab)this.renderBrainFileContent(this.brainActiveTab);else if(this.brainSelectedFolder){if(this.brainSelectedFolder==="media-images"){this.showMediaGrid();return}for(let t of this.getBrainFolders()){let a=(t.subfolders||[]).find(i=>i.id===this.brainSelectedFolder);if(a){this.showSubfolderContent(a);return}}let e=this.getBrainFolders().find(t=>t.id===this.brainSelectedFolder);if(e)this.showFolderContent(e);else{let t=this.shadow.querySelector("#eq-brain-content");t&&(t.innerHTML='<div class="eq-brain-empty-canvas"><div style="margin-bottom:4px;opacity:0.5">Nada selecionado</div><div class="eq-brain-empty-sub">Selecione um arquivo no explorador abaixo para visualiz\xE1-lo</div></div>')}}else{let e=this.shadow.querySelector("#eq-brain-content");e&&(e.innerHTML='<div class="eq-brain-empty-canvas"><div style="margin-bottom:4px;opacity:0.5">Nada selecionado</div><div class="eq-brain-empty-sub">Selecione um arquivo no explorador abaixo para visualiz\xE1-lo</div></div>')}}renderBrainTabs(){let e=this.shadow.querySelector("#eq-brain-tabbar");if(e){e.innerHTML="";for(let t of this.brainOpenTabs){let a=document.createElement("div");a.className="eq-brain-tab"+(this.brainActiveTab===t.id?" is-active":""),a.innerHTML=`<span class="eq-brain-tab-icon">${t.id===this.GLOBAL_ID?C.folderTree:C.file}</span><span class="eq-brain-tab-label">${t.label}</span><button class="eq-brain-tab-close" data-tab-id="${t.id}" type="button">${C.close}</button>`,a.addEventListener("click",i=>{let n=i.target.closest(".eq-brain-tab-close");n?this.closeBrainTab(n.dataset.tabId):(this.brainActiveTab=t.id,this.brainSelectedFolder=null,this.renderBrainExplorer(),this.renderBrainTabs(),this.renderBrainFileContent(t.id))}),e.appendChild(a)}}}renderBrainFileContent(e){let t=this.shadow.querySelector("#eq-brain-content");if(!t)return;if(e.startsWith("img-")){this.showImageFile(parseInt(e.slice(4),10));return}let a=this.getBrainFileText(e),i=m=>String(m??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"),n=e===this.GLOBAL_ID,s=e==="rationale"||n,u=n||s?"markdown":e==="actions"||e==="exec-result"?"json":"text";t.innerHTML="";let l=document.createElement("div");l.className="eq-brain-file-view";let d=document.createElement("div");if(d.className="eq-brain-file-header",d.innerHTML=`<span class="eq-brain-file-lang">${i(u)}</span>`,l.appendChild(d),s){let m=document.createElement("div");m.className="eq-brain-markdown";try{m.innerHTML=this.renderMarkdown(a||"(sem conte\xFAdo)")}catch{m.textContent=a||"(sem conte\xFAdo)"}l.appendChild(m)}else{let m=document.createElement("pre");m.className="eq-brain-code";let c=document.createElement("code");c.textContent=a||"(sem conte\xFAdo)",m.appendChild(c),l.appendChild(m)}t.appendChild(l)}initTerminalWallpaper(){let e=this.shadow.querySelector("#eq-view-debug");if(!e)return;e.style.position="relative",this.shadow.querySelector("#eq-wallpaper-canvas")?.remove();let t=document.createElement("canvas");t.id="eq-wallpaper-canvas",t.style.cssText="position:absolute;inset:0;pointer-events:none;z-index:0;width:100%;height:100%;",e.insertBefore(t,e.firstChild),this._startWallpaperAnim(t)}_startWallpaperAnim(e){cancelAnimationFrame(this._wallpaperRAF);let t=e.getContext("2d");if(!t)return;let a=18,i=.082,n=[{a:0,r:.28,s:.006},{a:Math.PI*.667,r:.22,s:-.004},{a:Math.PI*1.333,r:.32,s:.003}];if(!this._wlpWhiteLogo){let u=new Image;u.onload=()=>{let l=document.createElement("canvas");l.width=u.naturalWidth||u.width,l.height=u.naturalHeight||u.height;let d=l.getContext("2d");d.drawImage(u,0,0),d.globalCompositeOperation="source-atop",d.fillStyle="#fff",d.fillRect(0,0,l.width,l.height),this._wlpWhiteLogo=l},u.src=C.canvasLogo}let s=0,r=()=>{let u=e.offsetWidth,l=e.offsetHeight;if(!u||!l){this._wallpaperRAF=requestAnimationFrame(r);return}e.width!==u&&(e.width=u),e.height!==l&&(e.height=l),t.clearRect(0,0,u,l),s+=.013;for(let p of n)p.a+=p.s;let d=Math.ceil(u/a)+1,m=Math.ceil(l/a)+1,c=d*.5,h=m*.5;for(let p=0;p<m;p++)for(let g=0;g<d;g++){let f=0;for(let v of n){let y=c+Math.cos(v.a)*d*v.r,x=h+Math.sin(v.a)*m*v.r,w=Math.sqrt((g-y)**2+(p-x)**2);f+=Math.sin(w*.85-s*3.5)*Math.exp(-w*.09)}let b=Math.max(0,f/n.length)*i;b<.003||(t.fillStyle=`rgba(255,255,255,${b.toFixed(3)})`,t.fillRect(g*a,p*a,a,a))}if(this._wlpWhiteLogo){let p=l*.33,g=p*(this._wlpWhiteLogo.width/this._wlpWhiteLogo.height);t.globalAlpha=.038,t.drawImage(this._wlpWhiteLogo,(u-g)/2,(l-p)/2,g,p),t.globalAlpha=1}this._wallpaperRAF=requestAnimationFrame(r)};r()}showFloatingAnswers(e){let t=e||this.latestPlan;t&&this.floatingAnswers.show(t)}hideFloatingAnswers(){this.floatingAnswers.hide()}closeCtxPopup(){this._ctxPopup?.remove(),this._ctxPopup=null,this._ctxCloseH&&(document.removeEventListener("click",this._ctxCloseH),this._ctxCloseH=null)}showCtxPopup(e,t){this.closeCtxPopup();let a=240,i=e.getBoundingClientRect(),n=Math.min(Math.max(4,i.right-a),window.innerWidth-a-4),s=i.bottom+4,r=document.createElement("div");Object.assign(r.style,{position:"fixed",top:s+"px",left:n+"px",width:a+"px",zIndex:"2147483647",display:"flex",flexDirection:"column",gap:"1px",padding:"4px",background:"rgba(10,12,20,0.25)",backdropFilter:"blur(28px) saturate(250%) brightness(0.92)",WebkitBackdropFilter:"blur(28px) saturate(250%) brightness(0.92)",border:"1px solid rgba(255,255,255,0.09)",borderRadius:"0px",boxShadow:"0 18px 56px rgba(0,0,0,0.48)",fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif'}),t.forEach(l=>{if(l.divider){let c=document.createElement("div");Object.assign(c.style,{height:"1px",background:"rgba(255,255,255,0.06)",margin:"3px 6px"}),r.appendChild(c);return}let d=document.createElement("button");if(d.type="button",Object.assign(d.style,{display:"flex",alignItems:"center",gap:"9px",width:"100%",height:"30px",padding:"0 10px",background:"transparent",border:"none",borderRadius:"1px",color:l.danger?"#f87171":"#a0a0a0",fontSize:"12px",fontWeight:"600",fontFamily:"inherit",textAlign:"left",cursor:"pointer"}),d.addEventListener("mouseenter",()=>{d.style.background=l.danger?"rgba(255,80,80,0.12)":"rgba(255,255,255,0.09)",d.style.color=l.danger?"#fca5a5":"#fff"}),d.addEventListener("mouseleave",()=>{d.style.background="transparent",d.style.color=l.danger?"#f87171":"#a0a0a0"}),l.ic){let c=document.createElement("span");Object.assign(c.style,{display:"inline-flex",width:"14px",height:"14px",flexShrink:"0",alignItems:"center",justifyContent:"center",opacity:"0.75"}),c.innerHTML=C[l.ic]||"";let h=c.querySelector("svg");h&&(h.style.width="13px",h.style.height="13px"),d.appendChild(c)}let m=document.createElement("span");if(m.style.flex="1",m.textContent=l.label,d.appendChild(m),l.badge){let c=document.createElement("span");c.textContent=l.badge,Object.assign(c.style,{fontSize:"9px",fontWeight:"700",padding:"2px 6px",background:"rgba(255,255,255,0.07)",color:"#555",borderRadius:"2px",letterSpacing:"0.06em",marginLeft:"auto"}),d.appendChild(c)}d.addEventListener("click",c=>{c.stopPropagation(),this.closeCtxPopup(),l.onClick()}),r.appendChild(d)}),document.body.appendChild(r),this._ctxPopup=r;let u=l=>{r.contains(l.target)||this.closeCtxPopup()};setTimeout(()=>{document.addEventListener("click",u),this._ctxCloseH=u},0)}renderKeysList(){if(!this.keysListEl)return;let e=X.getAllKeys();if(this.keysBadgeEl){let i=e.filter(r=>!r.isCooldown).length,n=e.reduce((r,u)=>r+(u.winCount||0),0),s=i>=3?"  TURBO":"";this.keysBadgeEl.textContent=`${e.length} chave${e.length>1?"s":""} (${i} pronta${i!==1?"s":""})${s}`,this.keysBadgeEl.className=`eq-key-badge ${i>=3?"racing":i>0?"ready":"cooldown"}`}this.keysListEl.replaceChildren();let t=this.shadow?.querySelector("#eq-keys-collapsible");t&&t.style.display!=="none"&&(t.style.maxHeight="none",t.style.overflow="visible"),[...e].sort((i,n)=>{let s=i.winCount||0,r=n.winCount||0;if(s!==r)return r-s;let u=i.lastLatencyMs||99999,l=n.lastLatencyMs||99999;if(u!==l)return u-l;let d=i.isCooldown?1:0,m=n.isCooldown?1:0;return d-m}).forEach((i,n)=>{let s=e.findIndex(v=>v.id===i.id),r=s>=0?s:n,u=document.createElement("div");u.className="eq-key-item";let l=document.createElement("div");l.className="eq-key-info";let d=document.createElement("span");d.className="eq-key-label",d.textContent=i.label||`Chave ${r+1}`;let m=document.createElement("span");m.className="eq-key-masked",m.textContent=pe.maskKey(i.key),m.title="Clique para copiar a chave",m.style.cursor="pointer",m.addEventListener("click",()=>{navigator.clipboard?.writeText(i.key),this.setStatus(`Chave ${r+1} copiada para a \xE1rea de transfer\xEAncia!`,"info")});let c=document.createElement("span");if(i.isCooldown){c.className="eq-key-badge cooldown";let v=Math.ceil(i.remainingCooldownMs/1e3);c.textContent=`\u23F1 Cooldown (${v}s)`}else i.lastError&&i.errorCount&&i.errorCount>3?(c.className="eq-key-badge invalid",c.textContent="Erro",c.title=i.lastError):i.lastLatencyMs?(c.className="eq-key-badge ready",c.textContent=`Pronta (${i.lastLatencyMs}ms)`):(c.className="eq-key-badge ready",c.textContent="Pronta");l.appendChild(d),l.appendChild(m),l.appendChild(c);let h=i.winCount||0;if(h>0){let v=document.createElement("span");v.className="eq-key-badge winner",v.textContent=` ${h} vit\xF3ria${h>1?"s":""}`,v.title=`Esta chave foi a mais r\xE1pida ${h} vez${h>1?"es":""} nas corridas paralelas`,l.appendChild(v)}let p=document.createElement("div");p.className="eq-key-actions";let g=document.createElement("button");g.className="eq-icon-btn",g.type="button",g.title="Testar esta chave",g.innerHTML=C.sparkles,g.addEventListener("click",async()=>{this.setStatus(`Testando chave ${i.label||r+1}...`,"info");let v=await ht(i.key);v.ok?(X.markSuccess(i.key,120),this.setStatus(` ${i.label||`Chave ${r+1}`}: Conex\xE3o com Google Gemini aprovada!`,"success")):(X.markInvalid(i.key,v.message),this.setStatus(`\uFE0F ${i.label||`Chave ${r+1}`}: ${v.message}`,"error")),this.renderKeysList()});let f=document.createElement("button");f.className="eq-icon-btn",f.type="button",f.title="Editar chave",f.innerHTML=C.edit,f.addEventListener("click",()=>{let v=window.prompt(`Editar ${i.label||`Chave ${r+1}`}:`,i.key);if(v!==null&&v.trim()){let y=X.updateKey(i.id,v.trim());if(y.ok){let x=X.exportRawKeys();this.callbacks.onSettingsChange({apiKey:x[0],apiKeys:x}),this.setStatus(`Chave ${r+1} atualizada com sucesso!`,"success"),this.renderKeysList()}else this.setStatus(y.message,"warning")}});let b=document.createElement("button");b.className="eq-icon-btn",b.type="button",b.title="Remover chave",b.innerHTML=C.trash,b.addEventListener("click",()=>{if(confirm(`Remover permanentemente a ${i.label||`Chave ${r+1}`}?`)){let v=X.removeKey(i.id);if(v.ok){let y=X.exportRawKeys();this.callbacks.onSettingsChange({apiKey:y[0]||"",apiKeys:y}),this.setStatus("Chave removida com sucesso.","info"),this.renderKeysList()}else this.setStatus(v.message,"warning")}}),p.appendChild(g),p.appendChild(f),p.appendChild(b),u.appendChild(l),u.appendChild(p),this.keysListEl.appendChild(u)})}updateModelSelect(e,t){let a=e.filter(s=>ce(s.id)),i=t&&ce(t)?t:ce(this.initialSettings.model)?this.initialSettings.model:"gemini-2.5-flash";this.modelSelect.innerHTML="";let n=!1;a.forEach(s=>{let r=s.id===i;r&&(n=!0),this.modelSelect.add(new Option(s.name,s.id,!1,r))}),!n&&i&&ce(i)&&this.modelSelect.add(new Option(`Gemini (${i})`,i,!1,!0)),this.modelSelect.value=i}updateSelectedModel(e){if(!ce(e))return;Array.from(this.modelSelect.options).some(a=>a.value===e)||this.modelSelect.add(new Option(`Gemini (${e})`,e,!1,!0)),this.modelSelect.value=e}mountHost(){let e=()=>{if(this.host.isConnected)return;let t=document.body||document.documentElement;if(t)try{t.appendChild(this.host)}catch{if(document.documentElement&&document.documentElement!==t)try{document.documentElement.appendChild(this.host)}catch{}}};e(),setInterval(e,500);try{new MutationObserver(()=>{this.host.isConnected||e()}).observe(document.documentElement,{childList:!0,subtree:!0})}catch{}}applyHostDarkMode(e){document.getElementById("eq-host-dark-mode-style")?.remove(),this.host.classList.toggle("eq-dark-mode-active",e)}startQuestionTimer(){this.currentQuestionStartTime=Date.now(),this.questionLiveTimerInterval&&clearInterval(this.questionLiveTimerInterval),this.metricsLiveStatus&&(this.metricsLiveStatus.textContent="Calculando...",this.metricsLiveStatus.classList.add("active"));let e=()=>{if(!this.metricsLiveTime)return;let t=Date.now()-this.currentQuestionStartTime,a=Math.floor(t/6e4),i=Math.floor(t%6e4/1e3),n=Math.floor(t%1e3/10);this.metricsLiveTime.textContent=`${String(a).padStart(2,"0")}:${String(i).padStart(2,"0")}.${String(n).padStart(2,"0")}`};e(),this.questionLiveTimerInterval=setInterval(e,50)}stopQuestionTimer(e){if(this.questionLiveTimerInterval&&(clearInterval(this.questionLiveTimerInterval),this.questionLiveTimerInterval=null),this.metricsLiveStatus&&(this.metricsLiveStatus.textContent="Parado",this.metricsLiveStatus.classList.remove("active")),this.metricsLiveTime&&this.currentQuestionStartTime>0){let t=e!==void 0?e:Math.max(0,Date.now()-this.currentQuestionStartTime),a=Math.floor(t/6e4),i=Math.floor(t%6e4/1e3),n=Math.floor(t%1e3/10);this.metricsLiveTime.textContent=`${String(a).padStart(2,"0")}:${String(i).padStart(2,"0")}.${String(n).padStart(2,"0")}`}}updateTimingMetrics(e){let t=e||We();if(!this.metricTotalTime)return;let a=Math.floor(t.totalElapsedMs/1e3),i=Math.floor(a/60),n=a%60;this.metricTotalTime.textContent=`${String(i).padStart(2,"0")}:${String(n).padStart(2,"0")}`;let s=(t.averageDurationMs/1e3).toFixed(1);this.metricAvgTime.textContent=`${s}s`,this.metricTotalCount.textContent=String(t.completedQuestionsCount),this.metricsTotalBadge&&(this.metricsTotalBadge.textContent=`${t.completedQuestionsCount} Quest\xE3o(\xF5es)`),this.metricsHistoryCount&&(this.metricsHistoryCount.textContent=`${t.records.length} registros`),this.renderMetricsHistory(t.records)}renderMetricsHistory(e){if(!this.metricsHistoryList)return;if(e.length===0){this.metricsHistoryList.innerHTML='<div style="text-align:center;padding:24px 0;color:#444;font-size:11px;">Nenhuma quest\xE3o respondida ainda.</div>';return}this.metricsHistoryList.innerHTML="";let t=[...e].reverse(),a=Math.max(...e.map(i=>i.durationMs),1);for(let i of t){let n=i.durationMs/1e3,s=Math.round(i.durationMs/a*100),r=i.status==="verified"||i.status==="answered",u=i.status==="manual",l=r?"#4ade80":u?"#fbbf24":"#666",d=r?"Injetado":u?"Gabarito":"Pendente",m=new Date(i.timestamp).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit",second:"2-digit"}),c=i.mode?i.mode.replace(/_/g," "):"auto",h=n<5?"#4ade80":n<15?"#fbbf24":"#ef4444",p=document.createElement("div");p.style.cssText="background:rgba(255,255,255,0.025);border:1px solid rgba(255,255,255,0.055);border-radius:7px;padding:9px 10px;margin-bottom:5px;cursor:default;transition:background 0.1s;",p.addEventListener("mouseenter",()=>{p.style.background="rgba(255,255,255,0.045)"}),p.addEventListener("mouseleave",()=>{p.style.background="rgba(255,255,255,0.025)"});let g=document.createElement("div");g.style.cssText="display:flex;align-items:flex-start;gap:8px;margin-bottom:6px;";let f=document.createElement("div");f.style.cssText="flex-shrink:0;width:22px;height:22px;border-radius:5px;background:rgba(0,152,255,0.15);border:1px solid rgba(0,152,255,0.25);display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:800;color:#0098ff;",f.textContent=String(i.questionIndex);let b=document.createElement("div");b.style.cssText="flex:1;font-size:10.5px;color:var(--eq-text);font-weight:600;line-height:1.4;word-break:break-word;",b.textContent=i.questionTitle||"Quest\xE3o "+i.questionIndex;let v=document.createElement("div");v.style.cssText="flex-shrink:0;font-size:13px;font-weight:800;color:"+h+";font-family:monospace;font-variant-numeric:tabular-nums;",v.textContent=n<60?n.toFixed(1)+"s":Math.floor(n/60)+"m"+String(Math.round(n%60)).padStart(2,"0")+"s",g.appendChild(f),g.appendChild(b),g.appendChild(v);let y=document.createElement("div");y.style.cssText="height:2px;background:rgba(255,255,255,0.05);border-radius:1px;margin-bottom:6px;overflow:hidden;";let x=document.createElement("div");x.style.cssText="height:100%;width:"+s+"%;background:"+h+";border-radius:1px;transition:width 0.4s ease;",y.appendChild(x);let w=document.createElement("div");w.style.cssText="display:flex;align-items:center;gap:6px;flex-wrap:wrap;";let q=(N,k,E)=>{let L=document.createElement("span");return L.style.cssText="font-size:8.5px;font-weight:700;letter-spacing:0.04em;padding:1px 6px;border-radius:8px;background:rgba("+E+",0.12);color:"+k+";",L.textContent=N,L};w.appendChild(q(d,l,r?"74,222,128":u?"251,191,36":"102,102,102")),w.appendChild(q(c,"#888","255,255,255")),i.actionsCount&&w.appendChild(q(i.actionsCount+" a\xE7\xE3o"+(i.actionsCount>1?"\xF5es":""),"#888","255,255,255"));let S=document.createElement("span");S.style.cssText="font-size:8.5px;color:#444;margin-left:auto;",S.textContent=m,w.appendChild(S);let T=document.createElement("span");T.style.cssText="flex-shrink:0;display:inline-flex;color:#444;transition:transform 0.2s ease;margin-left:4px;",T.innerHTML='<svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5z"/></svg>',g.appendChild(T);let A=document.createElement("div");A.style.cssText="overflow:hidden;max-height:0;transition:max-height 0.22s ease;",A.appendChild(y),A.appendChild(w);let P=!1,z=()=>{P=!P,P?(this.metricsHistoryList?.querySelectorAll(".eq-mhist-body").forEach(N=>{if(N!==A){N.style.maxHeight="0";let k=N.parentElement?.querySelector(".eq-mhist-chevron");k&&(k.style.transform="")}}),A.style.maxHeight=A.scrollHeight+40+"px",T.style.transform="rotate(180deg)"):(A.style.maxHeight="0",T.style.transform="")};A.className="eq-mhist-body",T.className="eq-mhist-chevron",g.style.cursor="pointer",g.addEventListener("click",z),p.appendChild(g),p.appendChild(A),this.metricsHistoryList.appendChild(p)}}copyMetricsReport(){let e=We(),t=[];t.push("# Relat\xF3rio de Desempenho e Tempo \u2014 EasyQuiz"),t.push(`- **Quest\xF5es Respondidas:** ${e.completedQuestionsCount}`),t.push(`- **Tempo Total:** ${(e.totalElapsedMs/1e3).toFixed(1)}s`),t.push(`- **Tempo M\xE9dio por Quest\xE3o:** ${(e.averageDurationMs/1e3).toFixed(2)}s`),t.push(""),t.push("### Hist\xF3rico:"),e.records.length===0?t.push("_Nenhum registro ainda._"):e.records.forEach((a,i)=>{t.push(`${i+1}. **${a.questionTitle||`Q${a.questionIndex}`}**: ${(a.durationMs/1e3).toFixed(2)}s (${a.status})`)}),navigator.clipboard.writeText(t.join(`
`)).then(()=>{this.showToast("Relat\xF3rio copiado!","success",2500)})}destroy(){this.stopStopwatch(),this.stopQuestionTimer(),this.autopilot.stop(),this.applyHostDarkMode(!1),this.callbacks.onDestroy(),this.host.remove()}};function Fa(){try{if(typeof document>"u"||!document.head||document.querySelector("link[data-easyquiz-preconnect]"))return;let o=document.createElement("link");o.rel="preconnect",o.href="https://generativelanguage.googleapis.com",o.crossOrigin="anonymous",o.setAttribute("data-easyquiz-preconnect","true"),document.head.appendChild(o);let e=document.createElement("link");e.rel="dns-prefetch",e.href="https://generativelanguage.googleapis.com",e.setAttribute("data-easyquiz-preconnect","true"),document.head.appendChild(e)}catch{}}async function Ua(){let o=window;if($e(),Fa(),setTimeout(()=>{try{To()}catch{}},500),o.__easyquiz){try{o.__easyquiz.destroy()}catch{}try{document.getElementById("easyquiz-shadow-root")?.remove()}catch{}}let e=zt(),t=null,a=null,i=0,n=new Mt(e,{onAnalyze:(l=1,d,m=!1)=>s(l,d,m),onApply:(l=1)=>void r(l),onDestroy:()=>{if(a){try{a.abort()}catch{}a=null}Me(),delete o.__easyquiz},onCancel:()=>{if(a){try{a.abort()}catch{}a=null}Me(),n.setProgress(0),n.setInterrupted("Opera\xE7\xE3o cancelada imediatamente pelo usu\xE1rio.")},onSettingsChange:l=>{e=so(l)}});o.__easyquiz={toggle:()=>n.toggle(),destroy:()=>n.destroy(),analyze:async()=>{await s()}},window.addEventListener("keydown",l=>{if(l.altKey&&(l.key==="q"||l.key==="Q"||l.key==="a"||l.key==="A")){if(l.preventDefault(),!n)return;n.toggle(!0),s()}});async function s(l=1,d,m=!1){if(!e.apiKey&&(!Array.isArray(e.apiKeys)||e.apiKeys.length===0)){n.setStatus("Configure sua chave de API Gemini acima para come\xE7ar.","error"),n.toggle(!0);return}if(a)try{a.abort()}catch{}a=new AbortController;let c=a,h=()=>{try{c.abort()}catch{}};if(d&&(d.aborted?c.abort():d.addEventListener("abort",h,{once:!0})),c.signal.aborted){n.setBusy(!1),n.setProgress(0);return}i=Date.now(),n.setBusy(!0,"Identificando o bloco da quest\xE3o ativa na p\xE1gina..."),n.setProgress(20,"Varrendo escopo do DOM e controles..."),Me(),n.hideFloatingAnswers();try{let p=Se(!1);p||(n.setStatus("Nenhum controle detectado. Tentando captura de tela inteira...","info"),p=ke()),st(p.scope),n.updateContext(p),n.logToConsole(`> [DOM] Escopo: <${p.scope.tagName.toLowerCase()}> com ${p.controls.length} controle(s) e ${p.questionText.length} caracteres.`,"text-blue");let g=Te(p.sourceUrl);g.skills.length>0&&n.logToConsole(`> [SKILLS] \u{1F4DA} ${g.skills.length} mini-skill(s) ativas carregadas para este dom\xEDnio.`,"text-blue"),g.failedPatterns.length>0&&n.logToConsole(`> [ANTI-ERRO] \u{1F6E1}\uFE0F ${g.failedPatterns.length} anti-pattern(s) memorizados \u2014 prevenindo repeti\xE7\xE3o de erros.`,"text-yellow"),n.setStatus(`Quest\xE3o localizada (${p.controls.length} controles). Preparando an\xE1lise...`,"info"),n.setProgress(40,`Consultando Gemini (${e.model})...`);let f=await ao(p.scope,e.useVision);if(console.log("================ [SANITY CHECK] ================"),console.log(`[DOM Scope]: ${p.scope.tagName.toLowerCase()}#${p.scope.id||"N/A"}`),console.log(`[Imagens Capturadas]: ${f.length}`),console.log(`[Texto Extra\xEDdo (In\xEDcio)]: ${p.questionText.slice(0,150).replace(/\n/g," ")}...`),console.log("================================================"),p.questionText.trim().length<10&&f.length===0){n.logToConsole("> [ERRO] Texto extra\xEDdo muito curto e sem imagens. Abortando API.","text-red"),n.setStatus("Falha de escopo: cont\xEAiner inv\xE1lido ou vazio.","error");return}if(f.length>0){let q=f.filter(S=>S.captureStatus==="captured"&&S.base64&&S.base64.length>100&&S.element);if(q.length>0){let S=q.map(T=>T.element).filter(Boolean);oo(S)}n.updateImages(f)}if(c.signal.aborted)return;let b=e.model;n.setStatus(f.length>0?`Consultando Gemini (${b}) com ${f.length} imagem(ns) anexada(s)...`:`Consultando Gemini (${b}) via DOM nativo (modo r\xE1pido)...`,"info");let v=Ze(p,f,e);n.setInspectorPrompt(v,e.model);let y=(q,S)=>{n.setStatus(q,S==="warning"?"info":S);let T=q.match(/Onda\s+\d+.*?\[([^\]]+)\]/);if(T){let A=T[1].split(",")[0].trim();n.setProgress(50,`Gemini ${A} respondendo...`)}},{plan:x,usedModel:w}=await mt(p,f,e,y,c.signal);if(c.signal.aborted)return;if(x.needsMoreContext){if(n.setProgress(55,"Ampliando escopo da quest\xE3o..."),n.setStatus("Enunciado ou contexto isolado detectado pela IA. Acionando Sele\xE7\xE3o Geral Expandida...","info"),n.logToConsole("> [DOM] Enunciado isolado. Ampliando escopo para sele\xE7\xE3o expandida...","text-blue"),p=Se(!0),p||(p=ke()),st(p.scope),n.updateContext(p),f=await ao(p.scope,e.useVision),f.length>0){let T=f.filter(A=>A.captureStatus==="captured"&&A.base64&&A.base64.length>100&&A.element);if(T.length>0){let A=T.map(P=>P.element).filter(Boolean);oo(A)}n.updateImages(f)}n.setStatus(`Reconsultando IA com escopo ampliado (${p.controls.length} controles)...`,"info");let q=Ze(p,f,e);n.setInspectorPrompt(q,e.model),x=(await mt(p,f,e,y,c.signal)).plan}if(c.signal.aborted)return;if(n.setProgress(70,"Resposta recebida da IA! Processando plano..."),n.logToConsole(`> [IA] Modelo: ${w||e.model} | Modo: ${x.mode} | Confian\xE7a: ${(x.confidence*100).toFixed(0)}%`,"text-green"),x.rationale&&n.logToConsole(`> [IA] Racioc\xEDnio: "${x.rationale}"`,"text-blue"),n.logToConsole(`> [IA] ${x.actions.length} a\xE7\xE3o(\xF5es) prescritas no plano.`,"text-blue"),x.memoryToStore&&(ro(x.memoryToStore),n.logToConsole(`> [RAG]  Nova mem\xF3ria te\xF3rica salva na sess\xE3o: "${x.memoryToStore}"`,"text-yellow")),x.learnedSkill&&(Nt({name:x.learnedSkill.name,description:x.learnedSkill.description,rule:x.learnedSkill.targetRule,source:"ai_synthesized"},p.sourceUrl),n.logToConsole(`> [SKILL] \u{1F4DA} Nova Mini-Skill sintetizada pela IA: "${x.learnedSkill.name}"`,"text-purple")),x.flowState?.stepDescription&&(go(x.flowState.stepDescription,p.sourceUrl),n.logToConsole(`> [FLOW] \u{1F5FA}\uFE0F Fluxo da p\xE1gina registrado: "${x.flowState.stepDescription}"`,"text-blue")),x.imageDescriptions&&x.imageDescriptions.length>0){n.logToConsole(`> [VISION] \uFE0F An\xE1lise de ${x.imageDescriptions.length} imagem(ns) pela IA:`,"text-blue");for(let q of x.imageDescriptions){let S=q.relevant?"":"\uFE0F";n.logToConsole(`>   ${S} Imagem ${q.index+1} [${q.relevant?"RELEVANTE":"IGNORADA"}]: ${q.description}`,q.relevant?"text-blue":"text-yellow")}}return t=x,n.updateContext(p,x),Bo(x.actions,x.confidence),n.setPlan(x,!e.dryRun),x.pageType==="conclusion"?(n.setProgress(100,"Atividade conclu\xEDda!"),n.setStatus("Atividade conclu\xEDda ou tela final detectada pela IA.","success")):x.pageType==="info"?(n.setProgress(100,"Contexto absorvido na mem\xF3ria!"),n.setStatus(" Conte\xFAdo de contexto absorvido na mem\xF3ria RAG. Avan\xE7ando...","success")):x.pageType==="start"?(n.setProgress(100,"In\xEDcio detectado!"),n.setStatus("In\xEDcio de atividade detectado. Iniciando...","info")):(n.setProgress(80,"Plano de resolu\xE7\xE3o pronto!"),n.setStatus(e.dryRun?"Simula\xE7\xE3o conclu\xEDda. As respostas foram real\xE7adas na p\xE1gina sem altera\xE7\xE3o.":"Resolu\xE7\xE3o pronta! Verifique o realce na tela e aplique quando desejar.","success")),e.dryRun&&x.pageType==="question"&&n.showFloatingAnswers(x),c.signal.aborted?void 0:((m||e.autoApply)&&!e.dryRun&&await r(l,c.signal,m),x)}catch(p){if(c.signal.aborted||p instanceof Error&&(p.name==="AbortError"||p.message.includes("cancelada"))){Me(),n.setProgress(0),n.setInterrupted("Opera\xE7\xE3o cancelada pelo usu\xE1rio.");return}Me(),n.setProgress(0);let g=p instanceof Error?p.message:"Falha desconhecida na an\xE1lise.";n.setStatus(g,"error"),n.setErrorDiagnostic(g,"An\xE1lise da IA");return}finally{d?.removeEventListener("abort",h),a===c&&(a=null),c.signal.aborted||n.setBusy(!1)}}async function r(l=1,d,m=!1){if(d?.aborted)return;if(!t){n.setStatus("Nenhum plano dispon\xEDvel para aplicar. Execute a an\xE1lise primeiro.","error");return}if(e.dryRun){n.setStatus("O modo de simula\xE7\xE3o est\xE1 ativo. Desmarque para poder aplicar.","error");return}let c=t.pageType==="info"||t.pageType==="start",h=t.actions.filter(f=>f.t!=="adv"),p=t.pageType==="question"||xt(t.rationale||"");if(p&&h.length===0){n.logToConsole("> [NAV]  Avan\xE7o bloqueado: quest\xE3o sem respostas prescritas.","text-yellow");return}let g=(m||e.autoAdvance||c)&&t.confidence>=e.confidenceThreshold&&!t.needsMoreContext&&(!p||h.length>0);n.setBusy(!0,"Aplicando respostas no formul\xE1rio..."),n.setProgress(85,`Aplicando ${t.actions.length} a\xE7\xE3o(\xF5es) no formul\xE1rio...`),n.logToConsole(`> [EXEC] Iniciando aplica\xE7\xE3o com 6 vias de persist\xEAncia para ${t.actions.length} a\xE7\xE3o(\xF5es)...`,"text-blue");try{let f=await nt(t,g,l,Ne(e));if(d?.aborted)return;if(n.setExecutionReport(f),f.reports&&f.reports.length>0)for(let w of f.reports)(w.verified||w.applied)&&Re(w.action,w.strategy||"execucao_padrao",window.location.href);if(f.failedActions&&f.failedActions.length>0){n.logToConsole(`> [REPLAN] \u26A0\uFE0F ${f.failedActions.length} a\xE7\xE3o(\xF5es) n\xE3o verificadas no DOM. Registrando no Anti-Patterns...`,"text-yellow");for(let w of f.failedActions){mo(w.action,w.evidence,window.location.href);let q=w.action,S=q.t==="drag"?`drag: "${q.from}" \u2192 "${q.to}"`:q.t==="clk"||q.t==="chk"?`${q.t}: "${q.id}"`:q.t==="val"?`val: "${q.id}" = "${q.v}"`:JSON.stringify(q).slice(0,80);n.logToConsole(`>    [ANTI-ERRO] [${q.t.toUpperCase()}] ${S} | Falha memorizada: ${w.evidence.slice(0,70)} (N\xC3O REPETIR)`,"text-yellow")}await u(f.failedActions,d)}let b=i>0?Date.now()-i:1200,v=f.verified>0,y=f.applied>0;if(f.success||v&&y){n.setProgress(100,"Sucesso! Resposta preenchida."),n.logToConsole(`> [DOM]  ${f.applied} a\xE7\xE3o(\xF5es) aplicada(s) \u2014 ${f.verified} verificada(s) no DOM.`,"text-green"),f.advanced?n.logToConsole("> [NAV]  Bot\xE3o de confirma\xE7\xE3o/avan\xE7o acionado com sucesso!","text-green"):g&&n.logToConsole(`> [NAV] ${f.navigationEvidence}`,"text-blue"),n.setStatus(f.advanced?`Sucesso: ${f.applied} resposta(s) preenchida(s) e avan\xE7ando.`:`Resposta aplicada na p\xE1gina (${f.applied} a\xE7\xE3o(\xF5es)).`,"success"),n.hideFloatingAnswers();let w=co({id:`q-${Date.now()}`,questionIndex:(We().records.length||0)+1,questionTitle:t.rationale?t.rationale.slice(0,45)+"...":`Quest\xE3o ${t.mode||"Auto"}`,durationMs:b,status:"answered",mode:t.mode,actionsCount:f.applied});n.updateTimingMetrics(w)}else y?(n.setProgress(75,"Resposta aplicada (verifica\xE7\xE3o incerta)."),n.logToConsole(`> [DOM] \uFE0F ${f.applied} a\xE7\xE3o(\xF5es) disparadas mas sem confirma\xE7\xE3o DOM clara. Pendentes: ${f.failed.join(", ")||"nenhuma"}`,"text-yellow"),n.setStatus(`Resposta preenchida (${f.applied} a\xE7\xE3o(\xF5es) aplicadas, verifica\xE7\xE3o incerta).`,"warning")):(n.setProgress(0,"Alvo de resposta n\xE3o localizado."),n.logToConsole(`> [DOM] Alerta: nenhum controle de resposta foi modificado no DOM. Pend\xEAncias: ${f.failed.join(", ")||"nenhuma a\xE7\xE3o"}.`,"text-yellow"),n.setStatus("Controle de resposta n\xE3o encontrado na p\xE1gina. Use o bot\xE3o Gabarito no painel se desejar.","warning"),e.dryRun&&n.showFloatingAnswers(t))}catch(f){n.setProgress(0);let b=f instanceof Error?f.message:"Falha ao aplicar plano.";n.setStatus(`Erro ao aplicar: ${b}`,"error"),n.logToConsole(`> [ERRO] ${b}`,"text-red")}finally{n.setBusy(!1)}}async function u(l,d){if(!t)return;let m=l.filter(h=>h.action.t==="drag");for(let h of m){if(d?.aborted)return;let p=h.action,g=String(p.from||""),f=String(p.to||""),b=Oo(g,f,g,f);n.logToConsole(`> [REPLAN]  Drag JS fallback: "${g}" \u2192 "${f}"`,"text-blue");let v={...t,actions:[{t:"js",v:b}],pageType:"question"},y=await nt(v,!1,1,Ne(e));n.logToConsole(y.applied>0?"> [REPLAN]  Drag fallback aplicado!":"> [REPLAN]  Drag fallback sem efeito.",y.applied>0?"text-green":"text-yellow")}let c=l.filter(h=>h.action.t!=="drag");if(c.length!==0&&!d?.aborted){n.logToConsole(`> [REPLAN]  ${c.length} a\xE7\xE3o(\xF5es) pendente(s) \u2014 iniciando pipeline de recupera\xE7\xE3o multi-estrat\xE9gia...`,"text-blue");for(let h of c){if(d?.aborted)return;let p=h.action,g=p.t==="clk"||p.t==="chk"?`${p.t}: "${p.id}"`:p.t==="val"?`val: "${p.id}" = "${p.v}"`:p.t==="sel"?`sel: "${p.id}" = "${Array.isArray(p.v)?p.v[0]:p.v}"`:JSON.stringify(p).slice(0,60);n.logToConsole(`> [REPLAN]  Recuperando: ${g}`,"text-blue");let f=String(p.id||p.name||p.selector||""),b=p.v!==void 0?String(p.v):"";n.logToConsole("> [REPLAN] Estrat\xE9gia 1: rota alternativa padr\xE3o...","text-blue");try{if(await Et(h.action),await new Promise(v=>setTimeout(v,250)),he(h.action)){Re(h.action,"Estrat\xE9gia 1: Rota Alternativa",window.location.href),n.logToConsole(`> [REPLAN]  Estrat\xE9gia 1 OK: ${g} (memorizado como Mini-Skill)`,"text-green");continue}}catch{}if(p.t==="clk"||p.t==="chk"){n.logToConsole("> [REPLAN] Estrat\xE9gia 2: script injection (bypass isTrusted)...","text-blue");try{let v=F(f,b)||F(f.replace(/[^\w\s]/g," ").trim(),b);if(v&&(_t(v),await new Promise(y=>setTimeout(y,300)),he(h.action))){Re(h.action,"Estrat\xE9gia 2: Script Injection Bypass",window.location.href),n.logToConsole(`> [REPLAN]  Estrat\xE9gia 2 OK: ${g} (memorizado como Mini-Skill)`,"text-green");continue}}catch{}}if(p.t==="clk"||p.t==="chk"){n.logToConsole("> [REPLAN] Estrat\xE9gia 3: simula\xE7\xE3o de teclado (Tab+Space)...","text-blue");try{let v=F(f,b)||F(f.replace(/[^\w\s]/g," ").trim(),b);if(v&&(v.focus?.(),await new Promise(y=>setTimeout(y,50)),v.dispatchEvent(new KeyboardEvent("keydown",{key:" ",code:"Space",keyCode:32,bubbles:!0,cancelable:!0})),v.dispatchEvent(new KeyboardEvent("keyup",{key:" ",code:"Space",keyCode:32,bubbles:!0,cancelable:!0})),await new Promise(y=>setTimeout(y,80)),v.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0,cancelable:!0})),v.dispatchEvent(new KeyboardEvent("keyup",{key:"Enter",code:"Enter",keyCode:13,bubbles:!0,cancelable:!0})),await new Promise(y=>setTimeout(y,200)),he(h.action))){Re(h.action,"Estrat\xE9gia 3: Keyboard Simulation Tab+Space",window.location.href),n.logToConsole(`> [REPLAN]  Estrat\xE9gia 3 OK: ${g} (memorizado como Mini-Skill)`,"text-green");continue}}catch{}}if(p.t==="clk"||p.t==="chk"||p.t==="val"){n.logToConsole("> [REPLAN] Estrat\xE9gia 4: internals Vue/React via script injection...","text-blue");try{let v=F(f,b)||F(f.replace(/[^\w\s]/g," ").trim(),b);if(v){let y=v.id,x=!!y;y||(y=`__eq_s4_${Math.random().toString(36).slice(2,8)}`,v.id=y);let w=String(p.v??""),q=p.t==="val",S=document.createElement("script");if(S.textContent=`(function(){
              var el=document.getElementById(${JSON.stringify(y)});
              if(!el)return;
              // Tenta Vue 3 update trigger
              try{if(el.__vueParentComponent){var ins=el.__vueParentComponent;var pr=ins.props||{};if(pr.modelValue!==undefined&&typeof ins.emit==='function'){ins.emit('update:modelValue',${q?JSON.stringify(w):"true"});}}}catch(e){}
              // Tenta React setState via fiber
              try{var fk=Object.keys(el).find(function(k){return k.startsWith('__reactFiber');});
              if(fk){var fb=el[fk];while(fb){var p=fb.memoizedProps||{};
              if(typeof p.onChange==='function')try{p.onChange({target:el,currentTarget:el,type:'change',bubbles:true,preventDefault:function(){},stopPropagation:function(){}});}catch(e){}
              if(typeof p.onInput==='function')try{p.onInput({target:el,currentTarget:el,type:'input',bubbles:true,preventDefault:function(){},stopPropagation:function(){}});}catch(e){}
              fb=fb.return;}}}catch(e){}
            })()`.replace(/\n\s+/g,""),document.head.appendChild(S),S.remove(),x||setTimeout(()=>{try{v.id===y&&v.removeAttribute("id")}catch{}},0),await new Promise(T=>setTimeout(T,300)),he(h.action)){Re(h.action,"Estrat\xE9gia 4: React/Vue Framework Internals",window.location.href),n.logToConsole(`> [REPLAN]  Estrat\xE9gia 4 OK: ${g} (memorizado como Mini-Skill)`,"text-green");continue}}}catch{}}if(d?.aborted)return;n.logToConsole("> [REPLAN] Estrat\xE9gia 5: re-consulta IA com diagn\xF3stico focado...","text-blue");try{let v="";try{let N=document.querySelector(`[data-easyquiz-id="${p.id}"]`)||document.getElementById(p.id||"")||Array.from(document.querySelectorAll('input, button, [role="radio"], [role="checkbox"], [role="option"]')).find(k=>(k.textContent||"").toLowerCase().includes(String(p.id||"").toLowerCase().slice(0,20)));N&&(v=N.outerHTML.slice(0,400))}catch{}let y=Se(!1)||ke(),x=`A\xE7\xE3o (${p.t}) alvo="${f}" valor="${p.v||p.c||""}" \u2014 Falha: "${h.evidence.slice(0,80)}"${v?`
HTML do alvo: ${v}`:""}`,w=h.strategiesAttempted?[h.strategiesAttempted].flat().concat(["alternative-path","injectScript","keyboard","vue-react-internals"]):["alternative-path","injectScript","keyboard","vue-react-internals"],q=`[REPLANEJAMENTO URGENTE \u2014 TENTATIVA FINAL]
A seguinte a\xE7\xE3o falhou ap\xF3s ${w.length} estrat\xE9gias autom\xE1ticas: ${w.join(", ")}.

${x}

Contexto atual da quest\xE3o:
${y?.questionText.slice(0,400)||"N/A"}

Controles dispon\xEDveis:
${JSON.stringify((y?.controls||[]).slice(0,6).map(N=>({id:N.id,type:N.type,label:N.label,options:N.options?.slice(0,3)})),null,2)}

TAREFA: Gere APENAS a\xE7\xF5es {t:"js"} com JavaScript criativo e robusto que consiga marcar/preencher/clicar o controle correto. 
Tente usar: document.querySelector, getComputedStyle, querySelectorAll com seletores diferentes, ou manipula\xE7\xE3o DOM direta.
Voc\xEA pode tentar m\xFAltiplas abordagens em um \xFAnico bloco JS. Seja criativo.
N\xC3O repita as estrat\xE9gias j\xE1 tentadas acima.`,S={...y,questionText:q},T=await mt(S,[],{...e},N=>n.logToConsole(`> [REPLAN-AI] ${N}`,"text-blue"),d);if(d?.aborted||!T?.plan){n.logToConsole("> [REPLAN]  Re-consulta n\xE3o retornou plano.","text-yellow");continue}let A=T.plan.actions.filter(N=>N.t==="js");if(A.length===0){n.logToConsole("> [REPLAN] \u2139\uFE0F IA n\xE3o gerou a\xE7\xF5es JS de fallback.","text-yellow");continue}n.logToConsole(`> [REPLAN]  IA gerou ${A.length} a\xE7\xE3o(\xF5es) JS custom. Executando...`,"text-blue");let P={...t,actions:A,pageType:"question"},z=await nt(P,!1,1,Ne(e));z.applied>0?(Re(h.action,"Estrat\xE9gia 5: JS Customizado da IA",window.location.href),n.logToConsole(`> [REPLAN]  Estrat\xE9gia 5 OK: ${z.applied} a\xE7\xE3o(\xF5es) JS executada(s) (memorizado como Mini-Skill)!`,"text-green")):n.logToConsole("> [REPLAN]  Todas as estrat\xE9gias esgotadas para esta a\xE7\xE3o.","text-yellow")}catch(v){n.logToConsole(`> [REPLAN] Erro na re-consulta: ${v instanceof Error?v.message:String(v)}`,"text-yellow")}}}}n.toggle(!0)}Ua().catch(o=>{console.error("[EasyQuiz] Erro fatal na inicializa\xE7\xE3o:",o),window.alert(`EasyQuiz: falha ao iniciar: ${o instanceof Error?o.message:String(o)}`)});})();
