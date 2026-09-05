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
"use strict";(()=>{var P={apiKey:"",model:"gemini-3.5-flash",uiMode:"easy",modeHint:"",engine:"smart",dryRun:!1,autoApply:!0,autoAdvance:!1,hostDarkMode:!0,useVision:!1,confidenceThreshold:.8};var de="easyquiz_settings_v2";function ue(){try{let n=localStorage.getItem(de);if(!n){let o=localStorage.getItem("easyquiz_settings_v1");if(o){let i=JSON.parse(o);return{...P,apiKey:i.apiKey||""}}return{...P}}let e=JSON.parse(n),t=typeof e.model=="string"&&e.model?e.model:P.model;return t==="gemini-2.5-flash"&&(t="gemini-3.5-flash"),{apiKey:typeof e.apiKey=="string"?e.apiKey.trim():P.apiKey,model:t,uiMode:e.uiMode==="easy"||e.uiMode==="advanced"?e.uiMode:P.uiMode,modeHint:e.modeHint??"",engine:e.engine??"smart",dryRun:!!e.dryRun,autoApply:e.autoApply!==void 0?!!e.autoApply:!0,autoAdvance:!!e.autoAdvance,hostDarkMode:e.hostDarkMode!==void 0?!!e.hostDarkMode:!0,useVision:!!e.useVision,confidenceThreshold:typeof e.confidenceThreshold=="number"?e.confidenceThreshold:P.confidenceThreshold}}catch{return{...P}}}function Le(){try{localStorage.removeItem(de),localStorage.removeItem("easyquiz_settings_v1");let n=[];for(let e=0;e<localStorage.length;e++){let t=localStorage.key(e);t&&(t.startsWith("eq_")||t.startsWith("easyquiz_"))&&n.push(t)}n.forEach(e=>localStorage.removeItem(e)),he()}catch(n){console.warn("[EasyQuiz] Erro ao resetar dados:",n)}}function D(n){try{let e=localStorage.getItem("eq_domain_cache_"+n);if(!e)return{};let t=JSON.parse(e);if(t.advanceSelector&&/inject|injetar/i.test(t.advanceSelector)){t.advanceSelector=void 0;try{localStorage.removeItem("eq_domain_cache_"+n)}catch{}}return t}catch{return{}}}function pe(n,e){if(e.advanceSelector&&/inject|injetar/i.test(e.advanceSelector))return;let o={...D(n),...e};try{localStorage.setItem("eq_domain_cache_"+n,JSON.stringify(o))}catch(i){console.warn("[EasyQuiz] Erro cache de dominio:",i)}}function Ie(n){let t={...ue(),...n};try{localStorage.setItem(de,JSON.stringify(t))}catch(o){console.warn("[EasyQuiz] Falha ao persistir configura\xE7\xF5es no localStorage:",o)}return t}var K=[];function He(n){let e=n.trim();e&&!K.includes(e)&&K.push(e)}function X(){return K}function he(){K=[]}var ze=`Voc\xEA \xE9 o EasyQuiz Supreme Engine v5.0. Responda estritamente em JSON v\xE1lido conforme o schema exigido.

DIRETRIZES DE FLUXO, SEGURAN\xC7A E PRECIS\xC3O ANAL\xCDTICA:

1. CLASSIFICA\xC7\xC3O DA P\xC1GINA ("pageType"):
   - "info" (TELA TE\xD3RICA / ARTIGO / LEITURA / CONTEXTO / TUTORIAL / HIST\xD3RIA):
     * Ocorre quando a tela apresenta texto explicativo, aula, artigo, instru\xE7\xF5es ou v\xEDdeo SEM perguntas com op\xE7\xF5es para responder.
     * Bot\xF5es como "Continuar", "Avan\xE7ar", "Continuar para as quest\xF5es \u2192", "Pr\xF3xima tarefa" s\xE3o bot\xF5es de navega\xE7\xE3o, N\xC3O exerc\xEDcios!
     * REGRA 1: Defina "pageType": "info".
     * REGRA 2: "needsMoreContext": false.
     * REGRA 3: Resuma detalhadamente em "memoryToStore" todos os conceitos, regras, fatos, f\xF3rmulas e defini\xE7\xF5es do texto. Esse resumo ser\xE1 injetado automaticamente na mem\xF3ria RAG das quest\xF5es seguintes!
     * REGRA 4: Em "actions", retorne APENAS [ { "t": "adv" } ] para acionar o bot\xE3o de continuar. NUNCA use "val" em bot\xF5es de avan\xE7o!
     * "confidence": 1.0.

   - "question" (EXERC\xCDCIO / QUEST\xC3O ATIVA):
     * H\xE1 alternativas de marcar, caixas de sele\xE7\xE3o, campos de preenchimento, matrizes num\xE9ricas, associa\xE7\xE3o ou arrastar e soltar.
     * Gere os comandos necess\xE1rios para resolver completamente o exerc\xEDcio.
     * Ao final dos comandos, adicione { "t": "adv" } para conferir/avan\xE7ar.

   - "start" (TELA INICIAL / BOAS-VINDAS):
     * Tela de abertura de m\xF3dulo antes de iniciar o question\xE1rio. Retorne actions: [ { "t": "adv" } ].

   - "conclusion" (TELA FINAL / PARAB\xC9NS / NOTA):
     * Fim da atividade. Retorne actions: [].

2. REGRAS PARA CADA TIPO DE COMANDO ("actions"):
   - { "t": "clk", "id": "rotulo_ou_texto" }:
     * Clique em alternativas de escolha \xFAnica (r\xE1dios A, B, C, D) ou bot\xF5es interativos de op\xE7\xE3o.
   - { "t": "chk", "id": "id_ou_rotulo", "c": true }:
     * Caixas de sele\xE7\xE3o (checkboxes).
     * REGRA CR\xCDTICA DE M\xDALTIPLA SELE\xC7\xC3O: Se a quest\xE3o permitir mais de uma resposta ("selecione todas as corretas", "quais afirma\xE7\xF5es s\xE3o verdadeiras"), gere um comando individual { "t": "chk", "id": "...", "c": true } para CADA UMA das alternativas corretas! NUNCA marque apenas uma!
     * Para o campo "id", use PREFERENCIALMENTE o "id" exato listado em [CAMPOS DE RESPOSTA] (ex: "chk-comb-1", "chk-comb-3"), OU o texto vis\xEDvel da alternativa, OU o n\xFAmero ordinal ("1", "3", "Item 1", "Item 3").
   - { "t": "val", "id": "id_ou_rotulo", "v": "texto_ou_numero" }:
     * Preenchimento EXCLUSIVO de campos de texto edit\xE1veis (<input type="text">, <textarea>, c\xE9lulas de matriz matem\xE1tica 3x3).
     * PROIBI\xC7\xC3O ABSOLUTA: NUNCA gere a\xE7\xE3o "val" para bot\xF5es, links ou avan\xE7os! Bot\xF5es de "Continuar", "Avan\xE7ar", etc., NUNCA devem receber "val"!
   - { "t": "sel", "id": "id_ou_rotulo", "v": "texto_opcao" }:
     * Sele\xE7\xE3o em menus dropdown (<select>).
   - { "t": "drag", "from": "texto_do_item", "to": "nome_da_categoria" }:
     * Categoriza\xE7\xE3o ou ordena\xE7\xE3o arrastar-e-soltar. "from" = texto do item (sem retic\xEAncias); "to" = nome da coluna destino.
   - { "t": "adv" }:
     * Acionamento do bot\xE3o de avan\xE7o/conferir (sempre no final).

3. RACIOC\xCDNIO ("rationale"):
   * Seja anal\xEDtico, r\xE1pido e conciso (m\xE1ximo 1 a 2 frases diretas explicando o porqu\xEA da resposta).`;function V(n,e,t){let o=n.htmlSnippet.includes("draggable")||n.htmlSnippet.includes("perseus")||n.htmlSnippet.includes("category")||n.htmlSnippet.includes("dropzone")||n.controls.some(c=>c.type==="draggable"||c.type==="dropzone"),r=n.questionText.length<120||o||n.controls.length<3?`
[HTML FRAGMENT (Estrutura DOM/Widgets)]:
${n.htmlSnippet.slice(0,4500)}`:`
[HTML FRAGMENT]: Omitido (Texto e controles s\xE3o suficientes).`,a=X(),s="";a.length>0&&(s=`
[MEM\xD3RIA DE CONTEXTO ATIVA (RAG)]:
${a.map(c=>`- ${c}`).join(`
`)}
`);let d=n.controls.filter(c=>c.role!=="navigation"),l=n.controls.filter(c=>c.role==="navigation");return`--- AN\xC1LISE DE P\xC1GINA ---
[MODO CONFIGURADO]: ${t.engine} | Dica: ${t.modeHint||"Auto"}
[URL]: ${n.sourceUrl}
[P\xC1GINA]: ${n.pageTitle}
${s}
[TEXTO VIS\xCDVEL]:
${n.questionText}
${r}

[CAMPOS DE RESPOSTA / EXERC\xCDCIO DETECTADOS]:
${d.length>0?JSON.stringify(d.map((c,u)=>({item:u+1,id:c.id,tipo:c.type,name:c.name||void 0,texto:c.label,val:c.value||void 0,opt:c.options.length?c.options:void 0})),null,0):"(Nenhum campo de resposta - p\xE1gina te\xF3rica de leitura/artigo ou introdu\xE7\xE3o)"}

[BOT\xD5ES DE NAVEGA\xC7\xC3O / AVAN\xC7O DISPON\xCDVEIS]:
${l.length>0?l.map(c=>`- "${c.label||c.id}" [tipo: ${c.type}]`).join(`
`):"(Nenhum bot\xE3o de navega\xE7\xE3o expl\xEDcito no escopo local)"}

[IMAGENS ANEXADAS]: ${e.length}
Responda estritamente em JSON v\xE1lido conforme o schema.`}var $=[{id:"gemini-2.5-flash",name:"Gemini 2.5 Flash (Recomendado - Ultra R\xE1pido)",description:"Modelo de \xFAltima gera\xE7\xE3o com suporte nativo e lat\xEAncia inferior a 1 segundo."},{id:"gemini-2.0-flash",name:"Gemini 2.0 Flash (Padr\xE3o Est\xE1vel)",description:"Alta velocidade e excelente precis\xE3o para provas e formul\xE1rios."},{id:"gemini-1.5-flash",name:"Gemini 1.5 Flash (Universal Legado)",description:"Compatibilidade total em todas as contas e vers\xF5es de chave do Google AI Studio."},{id:"gemini-2.5-pro",name:"Gemini 2.5 Pro (Racioc\xEDnio Avan\xE7ado)",description:"Maior capacidade anal\xEDtica para quest\xF5es complexas, STEM e matem\xE1tica profunda."},{id:"gemini-1.5-pro",name:"Gemini 1.5 Pro (Legado Pro)",description:"Modelo de racioc\xEDnio profundo legado."}],Ye={type:"OBJECT",properties:{pageType:{type:"STRING",enum:["question","info","start","conclusion"]},mode:{type:"STRING",enum:["texto_livre","escolha_unica","escolha_multipla","verdadeiro_falso","preenchimento","acao_sem_resposta","categorizacao","ordenacao","arrastar_soltar"]},confidence:{type:"NUMBER"},rationale:{type:"STRING"},needsMoreContext:{type:"BOOLEAN"},warnings:{type:"ARRAY",items:{type:"STRING"}},memoryToStore:{type:"STRING"},actions:{type:"ARRAY",items:{type:"OBJECT",properties:{t:{type:"STRING",enum:["val","chk","sel","clk","adv","js","drag"]},id:{type:"STRING"},v:{},c:{type:"BOOLEAN"},co:{type:"ARRAY",items:{type:"NUMBER"}},from:{type:"STRING"},to:{type:"STRING"}},required:["t"]}}},required:["pageType","mode","confidence","rationale","needsMoreContext","actions"]};function Ke(n){return n.trim().replace(/^google\//,"").replace(/^models\//,"")||"gemini-2.5-flash"}function Pe(n,e){let t="";try{let o=JSON.parse(n);t=o.error?.message||o.message||""}catch{t=n.slice(0,160)}return/API_KEY_INVALID|API key not valid|key.*invalid|unregistered/i.test(t)?"Chave de API do Gemini inv\xE1lida ou n\xE3o autorizada no Google AI Studio.":/RESOURCE_EXHAUSTED|Quota exceeded/i.test(t)||e===429?"Limite tempor\xE1rio de cota do Gemini (HTTP 429) atingido. Aguardando recupera\xE7\xE3o...":e===404?`HTTP 404: ${t||"Modelo ou endpoint n\xE3o encontrado no Google AI Studio"}`:e===503||/overloaded/i.test(t)?`Servidores Google sobrecarregados (HTTP 503): ${t||"Aguardando"}`:t?`Erro Gemini (HTTP ${e}): ${t}`:`Falha na requisi\xE7\xE3o ao Gemini (HTTP ${e}).`}function Xe(n){try{return JSON.parse(n)}catch(e){let t=n.trim(),o=[t+"}",t+"]}",t+'"}]}',t+'"]}',t+"}]}",t+"}]}}"];for(let i of o)try{let r=JSON.parse(i);if(r&&typeof r=="object")return r}catch{}throw new Error(`Falha ao decodificar JSON da IA (${e instanceof Error?e.message:"incompleto"})`)}}var J=(()=>{try{let n=typeof localStorage<"u"?localStorage.getItem("easyquiz_cached_models"):null;return n?JSON.parse(n):null}catch{return null}})(),me=new Set;async function W(n){let e=n.trim().replace(/^["']|["']$/g,"");if(!e)return $;let t=[`https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(e)}`,`https://generativelanguage.googleapis.com/v1/models?key=${encodeURIComponent(e)}`];for(let o of t)try{let i=await fetch(o,{headers:{"Content-Type":"application/json","x-goog-api-key":e}});if(!i.ok){let a=await i.text(),s=Pe(a,i.status);if(s.includes("inv\xE1lida")||s.includes("n\xE3o autorizada"))throw new Error(s);continue}let r=await i.json();if(Array.isArray(r.models)&&r.models.length>0){let a=r.models.filter(s=>{let d=s.supportedGenerationMethods||[],l=(s.name||"").includes("gemini"),c=d.includes("generateContent"),u=(s.name||"").includes("embedding")||(s.name||"").includes("tts")||(s.name||"").includes("imagen")||(s.name||"").includes("aqa")||(s.name||"").includes("computer-use");return l&&c&&!u}).map(s=>{let d=s.name.replace(/^models\//,""),l=s.displayName||d;return{id:d,name:l.includes(d)?l:`${l} (${d})`,description:s.description||""}});if(a.length>0){a.sort((s,d)=>{let l=c=>c==="gemini-2.5-flash"?100:c==="gemini-3.5-flash"?95:c==="gemini-3.1-flash-lite"?90:c==="gemini-2.5-pro"?85:c==="gemini-3.1-pro"?80:c==="gemini-1.5-flash"?60:c.includes("flash")?50:10;return l(d.id)-l(s.id)}),J=a;try{typeof localStorage<"u"&&localStorage.setItem("easyquiz_cached_models",JSON.stringify(a))}catch{}return a}}}catch(i){if(i.message?.includes("Chave de API"))throw i}return $}async function $e(n){let e=n.trim().replace(/^["']|["']$/g,"");if(!e)return{ok:!1,message:"Insira sua chave de API."};try{let o=await W(e);if(o.length>0&&o!==$){let i=o[0];return{ok:!0,message:`Chave v\xE1lida! ${o.length} modelos Gemini dispon\xEDveis em sua conta. Recomendado: ${i.name}`,models:o}}}catch(o){return{ok:!1,message:o instanceof Error?o.message:String(o)}}let t=["gemini-2.5-flash","gemini-2.0-flash","gemini-1.5-flash"];for(let o of t)for(let i of["v1beta","v1"]){let r=`https://generativelanguage.googleapis.com/${i}/models/${o}:generateContent?key=${encodeURIComponent(e)}`;try{if((await fetch(r,{method:"POST",headers:{"Content-Type":"application/json","x-goog-api-key":e},body:JSON.stringify({contents:[{role:"user",parts:[{text:"PING"}]}],generationConfig:{maxOutputTokens:5}})})).ok)return{ok:!0,message:`Chave validada com sucesso no ${o} (${i})!`,models:$}}catch{}}return{ok:!1,message:"Chave de API inv\xE1lida, sem cota ou sem permiss\xE3o para modelos Gemini."}}async function fe(n,e,t,o){let i=t.apiKey.trim().replace(/^["']|["']$/g,"");if(!i)throw new Error("Chave de API n\xE3o configurada.");let r=Ke(t.model);if(!J||J.length===0)try{o?.("Verificando modelos autorizados na sua chave de API...","info"),await W(i)}catch(h){let m=h instanceof Error?h.message:String(h);if(m.includes("inv\xE1lida")||m.includes("n\xE3o autorizada"))throw new Error(m)}let a=Date.now(),s=V(n,e,t),d=[{text:s}];for(let h of e)d.push({inline_data:{mime_type:h.mediaType,data:h.base64}});let l={temperature:.05,maxOutputTokens:2500,response_mime_type:"application/json",response_schema:Ye},c=[r,...J?.map(h=>h.id)||[],"gemini-2.5-flash","gemini-2.0-flash","gemini-1.5-flash","gemini-2.5-pro","gemini-1.5-pro"],u=Array.from(new Set(c)).filter(h=>!me.has(h));u.length===0&&(me.clear(),u.push(...$.map(h=>h.id)));let p=new Error("Nenhum modelo tentado.");for(let h=0;h<u.length;h++){let m=u[h],v=u[h+1];m.includes("2.5")||m.includes("thinking")?l.thinkingConfig={thinkingBudget:0}:delete l.thinkingConfig;let y={system_instruction:{parts:[{text:ze}]},contents:[{role:"user",parts:d}],generationConfig:l};o?.(`Aguardando resposta da API (${m})...`,"info");let w=["v1beta","v1"];for(let M of w){let Q=`https://generativelanguage.googleapis.com/${M}/models/${m}:generateContent?key=${encodeURIComponent(i)}`,Y=new AbortController,Se=setTimeout(()=>Y.abort(),35e3);try{let z=await fetch(Q,{method:"POST",headers:{"Content-Type":"application/json","x-goog-api-key":i},body:JSON.stringify(y),signal:Y.signal});if(clearTimeout(Se),!z.ok){let ke=await z.text();if(z.status===400&&l.thinkingConfig&&/thinking/i.test(ke)){delete l.thinkingConfig,y.generationConfig=l;continue}let Qe=Pe(ke,z.status);if(z.status===404&&M==="v1beta")continue;throw new Error(Qe)}let le=await z.json(),ce=le.candidates?.[0];if(!ce||!ce.content?.parts?.[0]?.text)throw new Error("A IA n\xE3o retornou uma resposta estruturada v\xE1lida.");let Ue=ce.content.parts[0].text,k=Xe(Ue);if(Array.isArray(k.actions)||(k.actions=[]),Array.isArray(k.warnings)||(k.warnings=[]),typeof k.confidence!="number"&&(k.confidence=.8),k.usedModel=m,k.durationMs=Date.now()-a,k.promptSent=s,k.tokensUsed=le.usageMetadata?.totalTokenCount,m!==r){o?.(`Resolvido com sucesso pelo fallback '${m}' (${M})!`,"info");try{t.model=m}catch{}}return{plan:k,rawUsage:le.usageMetadata,usedModel:m}}catch(z){if(clearTimeout(Se),p=z,p.message.includes("inv\xE1lida")||p.message.includes("n\xE3o autorizada"))throw p}}let S=p.message.includes("429")||p.message.includes("cota"),C=p.message.includes("503")||p.message.includes("sobrecarregado");if(p.message.includes("404")&&me.add(m),v){let M=S?3500:C?2500:900,Q=`Modelo '${m}' indispon\xEDvel (${p.message}). Aguardando ${M/1e3}s antes de alternar para '${v}'...`;console.warn(`[EasyQuiz Fallback] ${Q}`),o?.(Q,"warning"),await new Promise(Y=>setTimeout(Y,M))}else console.warn(`[EasyQuiz Fallback] Modelo '${m}' falhou: ${p.message}. Todos os modelos esgotados.`)}throw p}var R=['input:not([type="hidden"])',"textarea","select","button","a",'[role="button"]','[role="link"]','[role="radio"]','[role="checkbox"]','[role="option"]','[contenteditable="true"]','[draggable="true"]',"[aria-grabbed]","[aria-dropeffect]","[data-widget-type]",".perseus-drag-item",".sortable-item",'[data-testid*="drag" i]','[data-testid*="card" i]','[data-testid*="option" i]','[data-testid*="category" i]','[data-role="dropzone"]',"[data-category]"].join(","),Z=/(verificar|checar|check|conferir|validar|próxim[oa]|next|continuar|continue|avançar|prosseguir|enviar|submit|concluir|finalizar|terminar|começar|iniciar|start|vamos lá|próxima tarefa|next task|próxima pergunta|next question|marcar como concluíd[oa]|mostrar resumo|entendi|compreendi|ok|leitura concluída|seguir|ir para o exercício|fazer o teste|próximo artigo|ir para a aula)/i,Je=0;function x(n){let e=n;if(!e||typeof e.isConnected=="boolean"&&!e.isConnected)return!1;if(typeof e.checkVisibility=="function")try{if(!e.checkVisibility({checkOpacity:!0,checkVisibilityCSS:!0}))return!1}catch{}try{let o=window.getComputedStyle?window.getComputedStyle(e):e.style;if(o&&(o.display==="none"||o.visibility==="hidden"||Number(o.opacity||"1")<=0))return!1}catch{}try{let o=e.closest('[hidden], [style*="display: none"], [style*="display:none"]');if(o&&!Re(o))return!1}catch{}try{if(typeof e.getBoundingClientRect=="function"){let o=e.getBoundingClientRect();if(o.width>0||o.height>0)return!0}}catch{}try{if(typeof e.getClientRects=="function"&&e.getClientRects().length>0)return!0}catch{}let t=e.tagName?.toLowerCase();if(["input","select","textarea","button"].includes(t)){let o=e.closest('label, .option-card, .quiz-option, [class*="option" i], [class*="choice" i], tr, div');if(o&&o!==e)return x(o)}return e.ownerDocument&&e.ownerDocument.defaultView&&/jsdom/i.test(e.ownerDocument.defaultView.navigator?.userAgent||"")?!e.closest('[style*="display: none"], [style*="display:none"], [hidden]'):(e.textContent||"").trim().length>0}function We(n){if(n==null)return"";if(typeof n=="string")return n;if(typeof n=="number"||typeof n=="boolean")return String(n);if(n instanceof Node)return n.textContent||"";try{if(typeof n?.toString=="function"){let e=n.toString();if(typeof e=="string")return e}}catch{}return""}function E(n,e=500){return We(n).replace(/\s+/g," ").trim().slice(0,e)}function Ze(n){let e=n.dataset.easyquizId;if(e)return e;let t=`eq-${Date.now().toString(36)}-${(Je+=1).toString(36)}`;return n.dataset.easyquizId=t,t}function Re(n){return n?!!(n.closest('#easyquiz-shadow-root, .eq-sidebar, .eq-launcher, [data-easyquiz-ignore="true"], .btn-inject-eq, #btn-inject-script')||n.getAttribute?.("data-easyquiz-ignore")==="true"):!1}function I(n){if(!n||!(n instanceof Element)||Re(n)||n.closest("header, nav, aside"))return!1;let e=n instanceof HTMLInputElement||n instanceof HTMLButtonElement?n.value:"",t=E(n.getAttribute?.("aria-label")||n.textContent||n.getAttribute?.("value")||e),o=n.type,i=t.replace(/[\d\(\)\[\]→\>\•\-\/\\]+/g," ").trim(),r=String(n.getAttribute?.("data-testid")||n.getAttribute?.("data-test-id")||n.getAttribute?.("id")||n.getAttribute?.("href")||"").toLowerCase();return Z.test(i)||Z.test(t)||o==="submit"||r.includes("next")||r.includes("check")||r.includes("continue")||r.includes("proximo")||r.includes("forward")||!1}function et(n){let e=n.closest("tr");if(e){let s=e.querySelector("th, td:first-child"),d=s&&s!==n.closest("td")?E(s.textContent,100):"",l=E(n.closest("label, td")?.textContent||"",50);if(d&&l)return`${d}: ${l}`}let t=n.getAttribute("aria-label");if(t)return E(t);let o=n.getAttribute("aria-labelledby");if(o){let s=o.split(/\s+/).map(d=>document.getElementById(d)?.textContent).filter(Boolean).join(" ");if(s.trim())return E(s)}if("labels"in n&&n.labels){let s=Array.from(n.labels??[]).map(d=>d.textContent).join(" ");if(s.trim())return E(s)}let i=n.closest('.docssharedWizToggleLabeledContainer, [role="listitem"], .answer, label, .quiz-option, .form-check, .option-card');if(i&&i!==n){let s=E(i.textContent);if(s)return s}let r=n instanceof HTMLInputElement||n instanceof HTMLButtonElement?n.value:"",a=n.getAttribute("placeholder")||n.getAttribute("title")||n.textContent||r||"";return E(a)}function ge(n,e){let t=n instanceof HTMLSelectElement?n:null,o=n;n.dataset.easyquizRole=e;let i=n.tagName.toLowerCase(),r=["input","textarea","select","button"].includes(i)?i:"other",a=n.getAttribute("role")||"",s=(n.getAttribute("data-testid")||n.getAttribute("data-test-id")||"").toLowerCase(),d=(n.className&&typeof n.className=="string"?n.className:"").toLowerCase(),l=n.getAttribute("draggable")==="true"||n.classList.contains("perseus-drag-item")||n.classList.contains("sortable-item")||!!n.getAttribute("aria-grabbed")||/drag|card|option|item/i.test(s)||/drag|card-item|sortable/i.test(d),c=n.getAttribute("data-role")==="dropzone"||n.classList.contains("category-container")||n.hasAttribute("data-category")||!!n.getAttribute("aria-dropeffect")||/drop|category|bucket/i.test(s)||/dropzone|category-box|bucket|target-zone/i.test(d),p=E((l?"draggable":c?"dropzone":"")||o.type||a||r,40),h="";if(o.type==="checkbox"||o.type==="radio"||a==="radio"||a==="checkbox")h=o.checked||n.getAttribute("aria-checked")==="true"?"checked":"unchecked";else if(r==="button"||i==="a"||e==="navigation"||I(n))h="";else{let C=n instanceof HTMLInputElement||n instanceof HTMLTextAreaElement||n instanceof HTMLSelectElement?n.value:"";h=E(C||n.getAttribute("data-category")||"",2e3)}let m=[];if(t)for(let C of Array.from(t.options).slice(0,80))m.push({value:E(C.value),label:E(C.textContent)});let v=!!(o.required||n.getAttribute("aria-required")==="true"),y=!!(o.disabled||n.getAttribute("aria-disabled")==="true"),w=Ze(n);return{id:n.id||w,tag:r,type:p,label:et(n),name:E(o.name||n.getAttribute("name")||"",180),value:h,options:m,required:v,disabled:y,role:e}}var Oe=['[data-test-id*="exercise" i]','[data-testid*="exercise" i]',".perseus-renderer",".framework-perseus",".Qr7Oae",".que",".question-holder",".quiz-question",".question_holder",".display_question",'[data-functional-selector*="question"]',".question-container","[data-question-id]",'[data-testid*="question" i]','[class*="question-container" i]','[class*="question" i]','[class*="pergunta" i]',"article","form","section","main"].join(",");function Ne(n){if(!x(n))return-1/0;let e=n.getBoundingClientRect(),t=Array.from(n.querySelectorAll(R)).filter(x),o=E(n.innerText,4e3).length;if(o<10||!t.length&&o<60)return-1/0;let i=Math.max(1,window.innerWidth*window.innerHeight),r=Math.max(1,e.width*e.height),a=Math.min(1,r/i),s=e.top+e.height/2,d=Math.abs(s-window.innerHeight/2)/Math.max(1,window.innerHeight),l=o>40?35:0,c=e.top>=0&&e.bottom<=window.innerHeight?25:0;return t.length*15+Math.min(60,o/20)+l+c-a*20-d*10}function be(n){let e=n;for(;e.parentElement&&e.parentElement!==document.body&&e.parentElement!==document.documentElement;){let t=e.parentElement,o=t.tagName.toLowerCase();if(["header","footer","nav","aside"].includes(o))break;if(t.matches?.('article, section, form, [data-test-id*="exercise" i], [data-testid*="exercise" i], .perseus-renderer, .framework-perseus, [class*="question-container" i], .que, main')){e=t;break}let i=E(e.innerText,1e4),r=E(t.innerText,1e4),a=e.querySelectorAll(R).length,s=t.querySelectorAll(R).length;if(i.length<150&&r.length>i.length&&s<=a+4){e=t;continue}break}return e}function tt(n){let e=n,t=e.closest('main, [role="main"], article, form, [data-test-id*="exercise" i], [data-testid*="exercise" i], .framework-perseus, section');if(t&&t!==document.body&&x(t))return t;let o=0;for(;e.parentElement&&e.parentElement!==document.body&&o<3;)e=e.parentElement,o++;return e||document.body}function ot(){let n=document.activeElement;if(n&&n!==document.body){let i=n.closest(Oe);if(i&&Ne(i)>0)return be(i)}let t=Array.from(document.querySelectorAll(Oe)).map(i=>({element:i,score:Ne(i)})).filter(i=>Number.isFinite(i.score)).sort((i,r)=>r.score-i.score);if(t.length>0&&t[0].score>0)return be(t[0].element);let o=document.querySelector('form, main, [role="main"]');return o&&x(o)?o:document.body}function Be(n){let e=n.cloneNode(!0);e.querySelectorAll("script, style, iframe, object, embed, svg, canvas, noscript, audio, video").forEach(o=>o.remove());let t=["type","name","value","role","aria-label","aria-labelledby","aria-checked","aria-required","required","disabled","data-easyquiz-id","draggable","class","id","data-widget-type","data-role","data-category","data-testid"];return e.querySelectorAll("*").forEach(o=>{for(let i of Array.from(o.attributes))t.includes(i.name)||o.removeAttribute(i.name)}),e.outerHTML.replace(/\s+/g," ").slice(0,2e4)}function nt(n){return Array.from(n.querySelectorAll(R)).filter(e=>{if(!x(e)||I(e))return!1;if(e.tagName.toLowerCase()==="a"){let t=e.getAttribute("role");return!!(t==="button"||t==="radio"||t==="checkbox"||t==="option"||e.closest('[class*="choice" i], [class*="option" i], [class*="answer" i], [data-testid*="option" i]'))}return!0}).slice(0,100).map(e=>ge(e,"answer"))}function ve(n){let e=[n,n.parentElement,n.parentElement?.parentElement,document.body].filter(Boolean),t=new Set,o=[];for(let i of e)for(let r of Array.from(i.querySelectorAll(R)))if(!(t.has(r)||!x(r)||!I(r))&&(t.add(r),o.push(ge(r,"navigation")),o.length>=10))return o;return o}function _(n=!1){let e=ot();e=be(e),n&&(e=tt(e));let t=e.innerText&&e.innerText.trim().length>0?e.innerText:e.textContent||"",o=E(t,16e3),i=nt(e),r=ve(e);r.length===0&&(r=ve(document.body));let a=[...i,...r].slice(0,120);return!o||a.length===0&&o.length<30?E(document.body.innerText||document.body.textContent||"",16e3).length>=30?O():null:{sourceUrl:window.location.href.slice(0,2e3),pageTitle:document.title.slice(0,500)||"P\xE1gina de Quest\xE3o",questionText:o,htmlSnippet:Be(e),controls:a,scope:e}}function O(){let n=document.body.innerText||document.body.textContent||document.documentElement.textContent||"",e=E(n,14e3),t=ve(document.body),o=document.querySelector('main, article, [role="main"], [data-test-id*="content" i], [class*="content" i]')||document.body;return{sourceUrl:window.location.href.slice(0,2e3),pageTitle:document.title.slice(0,500)||"P\xE1gina de Leitura/Contexto",questionText:e,htmlSnippet:Be(o).slice(0,15e3),controls:t,scope:o}}function T(n){return n?!!(n.closest('#easyquiz-shadow-root, .eq-sidebar, .eq-launcher, [data-easyquiz-ignore="true"], .btn-inject-eq, #btn-inject-script')||n.getAttribute?.("data-easyquiz-ignore")==="true"):!1}function f(n){return n?n.replace(/^(\([0-9a-zA-Z]{1,2}\)|[0-9]{1,3}|[a-zA-Z])[\.\)\-\:]\s+/,"").replace(/[\.\u2026]{2,}/g," ").replace(/['"“”«»]/g,"").replace(/\s+/g," ").trim():""}function A(n){if(!n||n instanceof HTMLInputElement||n instanceof HTMLSelectElement||n instanceof HTMLTextAreaElement||n.getAttribute("draggable")==="true"||n.classList.contains("dnd-card")||n.hasAttribute("data-category")||n.hasAttribute("data-dropzone"))return n;if(n.hasAttribute("for")){let o=n.getAttribute("for");if(o){let i=n.ownerDocument.getElementById(o);if(i)return i}}let e=n.closest('label, .option-card, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, tr, li, .dnd-card, [class*="option-card" i], [class*="choice-card" i]');if(e&&!["article","section","main","form","body"].includes(e.tagName.toLowerCase())){let o=e.getAttribute("for"),r=(o?e.ownerDocument.getElementById(o):null)||e.querySelector('input:not([type="hidden"]), select, textarea');return r||e}let t=n.closest('button, a, [role="button"], [draggable="true"]');if(t)return t;if(["body","html","main","section","article","form"].includes(n.tagName.toLowerCase())){let o=n.querySelector('button, [role="button"], a, input:not([type="hidden"]), select, textarea, [role="radio"], [role="checkbox"], .option-card, label');if(o)return A(o)}return n}function b(n){if(!n)return null;let e=n.trim().replace(/^["'“”«»]+|["'“”«»]+$/g,"");if(!e)return null;let t=CSS.escape(e),o=document.querySelector(`[data-easyquiz-id="${t}"]`);if(o&&!T(o)&&x(o))return A(o);try{let l=document.getElementById(e);if(l&&!T(l)&&x(l))return l.hasAttribute("data-category")||l.hasAttribute("data-dropzone")||l.classList.contains("dnd-zone")?l:A(l)}catch{}let i=e.match(/^(?:item|opção|opcao|afirmação|afirmacao|alternativa|linha|afirmativa|questão|questao)?\s*#?([0-9]+)$/i);if(i){let l=parseInt(i[1],10)-1;if(l>=0){let c=Array.from(document.querySelectorAll('input[type="checkbox"], input[type="radio"], [role="checkbox"], [role="radio"]')).filter(u=>x(u)&&!T(u));if(l<c.length)return A(c[l])}}let r=e.match(/^(?:item|opção|opcao|afirmação|afirmacao|alternativa|linha|afirmativa|questão|questao)?\s*#?([a-eA-E])$/i);if(r){let l=r[1].toUpperCase().charCodeAt(0)-65;if(l>=0){let c=Array.from(document.querySelectorAll('input[type="checkbox"], input[type="radio"], [role="checkbox"], [role="radio"]')).filter(u=>x(u)&&!T(u));if(l<c.length)return A(c[l])}}if(/^[a-zA-Z0-9_-]{1,10}$/.test(e)){let c=Array.from(document.querySelectorAll(`[data-category="${t}" i], [data-dropzone="${t}" i], [data-role="dropzone"][data-category="${t}" i]`)).find(m=>x(m)&&!T(m));if(c)return c;let p=Array.from(document.querySelectorAll(`input[value="${t}" i], [data-value="${t}" i], input[id="${t}" i]`)).find(m=>x(m)&&!T(m));if(p)return A(p);let h=Array.from(document.querySelectorAll('.option-badge, [class*="badge" i], [class*="letter" i], .option-card span, label span')).find(m=>{if(!x(m)||T(m))return!1;let v=f(m.textContent).toLowerCase();return v===e.toLowerCase()||v===e.toLowerCase()+")"});if(h)return A(h)}try{let c=Array.from(document.querySelectorAll(`[name="${t}"], [value="${t}"], [data-category="${t}" i], [data-dropzone="${t}" i], [data-testid="${t}" i], [data-test-id="${t}" i], [aria-label="${t}" i]`)).find(u=>x(u)&&!T(u));if(c)return c.hasAttribute("data-category")||c.hasAttribute("data-dropzone")||c.classList.contains("dnd-zone")?c:A(c)}catch{}if(/^[.#\[]|\s|[>+~:]/.test(e))try{let c=Array.from(document.querySelectorAll(e)).find(u=>x(u)&&!T(u));if(c)return A(c)}catch{}try{let l=e.replace(/"/g,""),c=`//button[normalize-space(.)="${l}"] | //a[normalize-space(.)="${l}"] | //*[not(*) and normalize-space(.)="${l}"] | //*[@aria-label="${l}"] | //*[@data-category="${l}"] | //*[@data-testid="${l}"]`,u=document.evaluate(c,document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);for(let p=0;p<u.snapshotLength;p++){let h=u.snapshotItem(p);if(h&&x(h)&&!T(h)){if(["body","html"].includes(h.tagName.toLowerCase())){let v=h.querySelector('button, [role="button"], a, input, [role="radio"], [role="checkbox"], label');if(v&&x(v))return A(v)}return h.closest('[data-role="dropzone"], [class*="category" i], [class*="bucket" i], [class*="column" i], [class*="drop" i]')||A(h)}}}catch{}let s=f(e).toLowerCase(),d=Array.from(document.querySelectorAll('button, a, div, span, li, p, label, input, [draggable="true"], [data-testid], [class*="option" i], [class*="card" i], [class*="item" i], [class*="choice" i], [class*="category" i], [class*="bucket" i]'));for(let l of d){if(!x(l)||T(l)||l.closest("header, nav, .stepper, .step-item, .progress-bar-container")||!!(l.matches('article, section, form, main, [class*="container" i], [class*="grid" i], .dnd-pool, .dnd-zones')||l.querySelector('label, [role="radio"], [role="checkbox"], .dnd-card, [draggable="true"], .option-card, tr'))&&!l.matches(".dnd-zone, [data-category], [data-dropzone]"))continue;let u=f(l.textContent).toLowerCase(),p=f(l.getAttribute("aria-label")||"").toLowerCase(),h=f(l.getAttribute("data-category")||"").toLowerCase(),m=l instanceof HTMLInputElement||l instanceof HTMLButtonElement?l.value:"",v=f(m).toLowerCase(),y=u.startsWith(s+")")||u.startsWith(s+".")||u.startsWith(s+" -")||u.startsWith(s+":");if(u===s||p===s||h&&h===s||v&&v===s||y)return l.closest('[data-role="dropzone"], [class*="category" i], [class*="bucket" i], [class*="column" i], [class*="drop" i]')||A(l)}if(s.length>=3)for(let l of d){if(!x(l)||T(l)||l.closest("header, nav, .stepper, .step-item, .progress-bar-container")||!!(l.matches('article, section, form, main, [class*="container" i], [class*="grid" i], .dnd-pool, .dnd-zones')||l.querySelector('label, [role="radio"], [role="checkbox"], .dnd-card, [draggable="true"], .option-card, tr'))&&!l.matches(".dnd-zone, [data-category], [data-dropzone]"))continue;let u=f(l.textContent).toLowerCase(),p=f(l.getAttribute("aria-label")||"").toLowerCase();if(u.includes(s)||p.includes(s)){if(Array.from(l.children).some(y=>{let w=f(y.textContent).toLowerCase();return w&&w.includes(s)}))continue;return l.closest('[data-role="dropzone"], [class*="category" i], [class*="bucket" i], [class*="column" i], [class*="drop" i]')||A(l)}let h=s.split(/\s+/).filter(Boolean);if(h.length>=3){let m=h.slice(0,Math.min(5,h.length)).join(" ");if(u.includes(m)||p.includes(m))return A(l)}}return null}function N(n,e){for(let t of e)n.dispatchEvent(new Event(t,{bubbles:!0,composed:!0}))}function q(n,e){if(!n)return;let t=n instanceof HTMLInputElement&&["checkbox","radio"].includes(n.type)?n:n.querySelector('input[type="checkbox"], input[type="radio"]')||(n.hasAttribute("for")?n.ownerDocument.getElementById(n.getAttribute("for")):null);if(t&&n!==t){if(t.type==="checkbox"){L(t,!t.checked);return}if(t.type==="radio"){L(t,!0);return}}try{n.scrollIntoView({block:"center",inline:"center",behavior:"instant"})}catch{}let o=0,i=0;if(e&&e.length===2)o=e[0],i=e[1];else{let s=n.getBoundingClientRect();o=Math.round(s.left+Math.max(1,s.width/2)),i=Math.round(s.top+Math.max(1,s.height/2))}try{n.focus?.()}catch{}let r={bubbles:!0,cancelable:!0,composed:!0,view:window,clientX:o,clientY:i,screenX:o,screenY:i};try{n.dispatchEvent(new PointerEvent("pointerdown",{...r,isPrimary:!0,pointerId:1,pointerType:"mouse",width:1,height:1,pressure:.5,button:0,buttons:1}))}catch{}try{let s=n.ownerDocument?.defaultView?.MouseEvent||window.MouseEvent;s&&n.dispatchEvent(new s("mousedown",{...r,button:0,buttons:1}))}catch{}try{let s=n.ownerDocument?.defaultView?.PointerEvent||window.PointerEvent;s&&n.dispatchEvent(new s("pointerup",{...r,isPrimary:!0,pointerId:1,pointerType:"mouse",width:1,height:1,pressure:.5,button:0,buttons:0}))}catch{}try{let s=n.ownerDocument?.defaultView?.MouseEvent||window.MouseEvent;s&&(n.dispatchEvent(new s("mouseup",{...r,button:0,buttons:0})),n.dispatchEvent(new s("click",{...r,button:0,buttons:0})))}catch{}try{let s=new Touch({identifier:Date.now(),target:n,clientX:o,clientY:i,screenX:o,screenY:i,pageX:o+(window.scrollX||0),pageY:i+(window.scrollY||0)});n.dispatchEvent(new TouchEvent("touchstart",{bubbles:!0,cancelable:!0,composed:!0,touches:[s],targetTouches:[s]})),n.dispatchEvent(new TouchEvent("touchend",{bubbles:!0,cancelable:!0,composed:!0,touches:[],targetTouches:[]}))}catch{}if(!(n instanceof HTMLInputElement&&n.type==="checkbox"))try{n.click()}catch{}if(!(n instanceof HTMLInputElement||n instanceof HTMLLabelElement)){let s=n.closest('button, a, [role="button"], [role="radio"], [role="checkbox"]');if(s&&s!==n)try{s.click()}catch{}}}function xe(n,e){let t=n;if(!(t instanceof HTMLInputElement)&&!(t instanceof HTMLTextAreaElement)&&!(t instanceof HTMLSelectElement)&&!t.isContentEditable){let i=n.querySelector('input:not([type="hidden"]), textarea, select, [contenteditable="true"]');i&&(t=i)}if(t instanceof HTMLButtonElement||t.tagName.toLowerCase()==="a"||t.getAttribute("role")==="button"||t.getAttribute("role")==="link"||t instanceof HTMLInputElement&&["button","submit"].includes(t.type)||I(t)){console.log("[EasyQuiz] Auto-corre\xE7\xE3o em setNativeValue: elemento \xE9 bot\xE3o/navega\xE7\xE3o. Clicando..."),q(t);return}if(t instanceof HTMLSelectElement){Ee(t,[e]);return}if(t instanceof HTMLInputElement&&["checkbox","radio"].includes(t.type)){let i=["true","1","checked","yes","sim"].includes(e.toLowerCase())||e===t.value;L(t,i);return}try{t.focus?.()}catch{}try{t.dispatchEvent(new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,composed:!0,data:e}))}catch{}if(t instanceof HTMLInputElement||t instanceof HTMLTextAreaElement){try{let a=t._valueTracker;a&&a.setValue("")}catch{}let i=t instanceof HTMLTextAreaElement?HTMLTextAreaElement.prototype:HTMLInputElement.prototype,r=Object.getOwnPropertyDescriptor(i,"value")?.set;r?r.call(t,e):t.value=e;try{let a=t._valueTracker;a&&a.setValue(e)}catch{}N(t,["input","change","blur"]);return}if(t.isContentEditable){try{document.execCommand?.("selectAll",!1,void 0),document.execCommand?.("insertText",!1,e)}catch{}if(t.textContent?.trim()!==e.trim()){t.textContent=e;try{t.innerText=e}catch{}}N(t,["input","change","blur"]);return}try{t.value=e,t.textContent=e,N(t,["input","change","blur"])}catch{}}function we(n,e=""){if(!n)return e;let t=f(n),o=b(n)||b(t);if(!o)return t||e;let i=o.closest('label, .option-card, [class*="choice" i], [class*="option" i], .quiz-option, tr');if(i){let d=f(i.textContent);if(d&&d.length>0&&d.length<150)return d}if(o.id){let d=document.querySelector(`label[for="${CSS.escape(o.id)}"]`);if(d){let l=f(d.textContent);if(l&&l.length>0&&l.length<150)return l}}let r=o.getAttribute("aria-label");if(r)return f(r);let a=o.getAttribute("placeholder");if(a)return f(a);let s=f(o.textContent);return s&&s.length>0&&s.length<120?s:t||e}function L(n,e){let t=n.closest('.option-card, label, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, [class*="option" i], [class*="choice" i], li')||n,o=n instanceof HTMLInputElement&&["checkbox","radio"].includes(n.type)?n:t.querySelector('input[type="checkbox"], input[type="radio"]');if(!o&&t.hasAttribute("for")){let l=t.getAttribute("for");l&&(o=t.ownerDocument.getElementById(l))}if(t&&(t.setAttribute("aria-checked",e?"true":"false"),t.setAttribute("aria-selected",e?"true":"false"),t.setAttribute("aria-pressed",e?"true":"false"),t.setAttribute("data-selected",e?"true":"false"),t.setAttribute("data-checked",e?"true":"false"),t.setAttribute("data-state",e?"checked":"unchecked"),t.classList.toggle("selected",e),t.classList.toggle("active",e),t.classList.toggle("checked",e)),o&&o.type==="checkbox"){o.checked=e;try{Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"checked")?.set?.call(o,e)}catch{}try{let l=o._valueTracker;l&&l.setValue(!e)}catch{}if(N(o,["input","change"]),t&&t!==o&&(t.classList.toggle("selected",e),t.classList.toggle("active",e),t.classList.toggle("checked",e)),o.checked!==e)try{let l=o.getBoundingClientRect(),c=Math.round(l.left+Math.max(1,l.width/2)),u=Math.round(l.top+Math.max(1,l.height/2)),p={bubbles:!0,cancelable:!0,composed:!0,view:window,clientX:c,clientY:u};o.dispatchEvent(new PointerEvent("pointerdown",{...p,isPrimary:!0,pointerId:1,pointerType:"mouse",button:0,buttons:1})),o.dispatchEvent(new MouseEvent("mousedown",{...p,button:0,buttons:1})),o.dispatchEvent(new PointerEvent("pointerup",{...p,isPrimary:!0,pointerId:1,pointerType:"mouse",button:0,buttons:0})),o.dispatchEvent(new MouseEvent("mouseup",{...p,button:0,buttons:0})),o.dispatchEvent(new MouseEvent("click",{...p,button:0,buttons:0})),o.click()}catch{}return}if(o&&o.type==="radio"){if(o.checked===!0&&e===!0)return;o.checked=e;try{let c=o._valueTracker;c&&c.setValue(!e)}catch{}try{Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"checked")?.set?.call(o,e)}catch{}o.checked=e,N(o,["input","change"]);let l=t!==o?t:o;try{l.focus?.()}catch{}l.dispatchEvent(new MouseEvent("click",{bubbles:!0,cancelable:!0,composed:!0,view:window}));try{l.onclick?.()}catch{}return}let i=t;try{i.focus?.()}catch{}let r=i.getBoundingClientRect(),a=Math.round(r.left+Math.max(1,r.width/2)),s=Math.round(r.top+Math.max(1,r.height/2)),d={bubbles:!0,cancelable:!0,composed:!0,view:window,clientX:a,clientY:s};try{i.dispatchEvent(new PointerEvent("pointerdown",{...d,isPrimary:!0,pointerId:1,pointerType:"mouse",button:0,buttons:1}))}catch{}i.dispatchEvent(new MouseEvent("mousedown",{...d,button:0,buttons:1}));try{i.dispatchEvent(new PointerEvent("pointerup",{...d,isPrimary:!0,pointerId:1,pointerType:"mouse",button:0,buttons:0}))}catch{}i.dispatchEvent(new MouseEvent("mouseup",{...d,button:0,buttons:0})),i.dispatchEvent(new MouseEvent("click",{...d,button:0,buttons:0}));try{i.onclick?.()}catch{}}function Ee(n,e){let t=n instanceof HTMLSelectElement?n:n.querySelector("select");if(t){let i=e.map(a=>f(a).toLowerCase()),r=!1;for(let a=0;a<t.options.length;a++){let s=t.options[a],d=s.value.toLowerCase(),l=f(s.textContent).toLowerCase();if(i.some(u=>u===d||u===l)){if(s.selected=!0,t.selectedIndex=a,r=!0,!t.multiple)break}else t.multiple||(s.selected=!1)}if(!r)for(let a=0;a<t.options.length;a++){let s=t.options[a],d=s.value.toLowerCase(),l=f(s.textContent).toLowerCase();if(i.some(u=>d.includes(u)||l.includes(u)||u.length>3&&(u.includes(d)||u.includes(l)))&&(s.selected=!0,t.selectedIndex=a,r=!0,!t.multiple))break}if(r){N(t,["input","change","blur"]);return}}let o=n.closest('[role="combobox"], [class*="select" i], [class*="dropdown" i]');if(o){q(o);for(let i of e){let r=b(i);if(r){q(r);return}}}}function at(n,e){try{let t=new DataTransfer;try{t.setData("text/plain",n)}catch{}try{t.setData("text/html",e)}catch{}return t}catch{return null}}async function te(n,e,t=1){try{n.scrollIntoView({block:"center",inline:"center",behavior:"instant"})}catch{}let o=n.getBoundingClientRect(),i=e.getBoundingClientRect(),r=Math.round(o.left+Math.max(1,o.width/2)),a=Math.round(o.top+Math.max(1,o.height/2)),s=Math.round(i.left+Math.max(1,i.width/2)),d=Math.round(i.top+Math.max(1,i.height/2)),l=f(e.textContent).toLowerCase();if(l){let v=Array.from(n.querySelectorAll('button, [role="button"], input[type="radio"], input[type="checkbox"], option, .btn, [class*="tag" i]')).find(y=>{let w=f(y.textContent).toLowerCase(),S=y instanceof HTMLInputElement||y instanceof HTMLOptionElement?f(y.value).toLowerCase():"";return w&&(l.includes(w)||w.includes(l))||S&&(l.includes(S)||S.includes(l))});v&&(q(v),await new Promise(y=>setTimeout(y,120)))}q(n,[r,a]),await new Promise(m=>setTimeout(m,140)),q(e,[s,d]);let c=e.querySelector('[data-role="dropzone"], [class*="bucket" i], [class*="slot" i], [class*="drop" i], [class*="target" i], [class*="items" i], ul, ol');c&&c!==e&&q(c),await new Promise(m=>setTimeout(m,100));let u={bubbles:!0,cancelable:!0,composed:!0,view:window,clientX:r,clientY:a,screenX:r,screenY:a,button:0,buttons:1};try{n.dispatchEvent(new PointerEvent("pointerdown",{...u,isPrimary:!0,pointerId:1,pointerType:"mouse",pressure:.5}))}catch{}n.dispatchEvent(new MouseEvent("mousedown",u));let p=4;for(let m=1;m<=p;m++){let v=Math.round(r+(s-r)*(m/p)),y=Math.round(a+(d-a)*(m/p)),w={...u,clientX:v,clientY:y,screenX:v,screenY:y};try{n.dispatchEvent(new PointerEvent("pointermove",{...w,isPrimary:!0,pointerId:1,pointerType:"mouse",pressure:.5}))}catch{}document.dispatchEvent(new MouseEvent("mousemove",w))}let h={bubbles:!0,cancelable:!0,composed:!0,view:window,clientX:s,clientY:d,screenX:s,screenY:d,button:0,buttons:0};try{e.dispatchEvent(new PointerEvent("pointerup",{...h,isPrimary:!0,pointerId:1,pointerType:"mouse",pressure:0}))}catch{}e.dispatchEvent(new MouseEvent("mouseup",h)),e.dispatchEvent(new MouseEvent("click",h));try{let m=at(E(n.textContent),n.outerHTML),v={...u},y={...h};m&&(v.dataTransfer=m,y.dataTransfer=m),n.dispatchEvent(new DragEvent("dragstart",v)),e.dispatchEvent(new DragEvent("dragenter",y)),e.dispatchEvent(new DragEvent("dragover",y)),e.dispatchEvent(new DragEvent("drop",y)),n.dispatchEvent(new DragEvent("dragend",v))}catch(m){console.warn("[EasyQuiz] DragEvent ignorado com seguran\xE7a:",m)}try{let m=new Touch({identifier:1,target:n,clientX:r,clientY:a}),v=new Touch({identifier:1,target:e,clientX:s,clientY:d});n.dispatchEvent(new TouchEvent("touchstart",{bubbles:!0,cancelable:!0,touches:[m]})),e.dispatchEvent(new TouchEvent("touchmove",{bubbles:!0,cancelable:!0,touches:[v]})),e.dispatchEvent(new TouchEvent("touchend",{bubbles:!0,cancelable:!0,touches:[]}))}catch{}if(t>=2&&!e.contains(n))try{n.focus?.(),n.dispatchEvent(new KeyboardEvent("keydown",{key:" ",code:"Space",bubbles:!0})),n.dispatchEvent(new KeyboardEvent("keyup",{key:" ",code:"Space",bubbles:!0})),await new Promise(m=>setTimeout(m,80)),e.focus?.(),e.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",bubbles:!0})),e.dispatchEvent(new KeyboardEvent("keyup",{key:"Enter",code:"Enter",bubbles:!0}))}catch{}}var _e={fill:(n,e)=>{let t=b(n);t?xe(t,e):console.warn(`$eq.fill: Elemento '${n}' n\xE3o encontrado`)},click:n=>{let e=b(n);e?!!(e.closest('.option-card, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, [class*="option" i], [class*="choice" i]')||e.querySelector('input[type="radio"], input[type="checkbox"]')||e instanceof HTMLInputElement&&["checkbox","radio"].includes(e.type))?L(e,!0):q(e):console.warn(`$eq.click: Elemento '${n}' n\xE3o encontrado`)},check:(n,e)=>{let t=b(n);t?L(t,e):console.warn(`$eq.check: Elemento '${n}' n\xE3o encontrado`)},find:n=>b(n),drag:(n,e)=>{let t=b(n),o=b(e);t&&o?te(t,o):console.warn(`$eq.drag: Origem ou destino n\xE3o encontrado ('${n}' -> '${e}')`)},categorize:async(n,e)=>{let t=b(n),o=b(e);if(!t||!o){console.warn(`$eq.categorize: Item ou categoria n\xE3o encontrados ('${n}' -> '${e}')`);return}await te(t,o)},execute:(n,e=!1,t=1)=>Ce(n,e,t)};window.$eq=_e;async function it(n,e=1){if(n.t==="js"){let r=String(n.v||"");try{new Function("$eq","document","window",r)(_e,document,window)}catch(a){console.warn("[EasyQuiz JS Execution]",a)}return}if(n.t==="drag"){let r=b(n.from),a=b(n.to);!r&&n.from&&(r=b(f(n.from))),!a&&n.to&&(a=b(f(n.to))),r&&a?await te(r,a,e):console.warn(`[EasyQuiz] Drag: alvo n\xE3o encontrado ('${n.from}' -> '${n.to}')`);return}let t=n.id||"",o=b(t);!o&&t&&(o=b(f(t)));let i=n.v!==void 0?String(n.v).trim():"";if(o&&i){if(o instanceof HTMLInputElement&&o.type==="radio"&&o.name){if(f(o.value).toLowerCase()!==f(i).toLowerCase()){let r=document.querySelector(`input[type="radio"][name="${CSS.escape(o.name)}"][value="${CSS.escape(i)}" i]`);if(r)o=r;else{let s=Array.from(document.querySelectorAll(`input[type="radio"][name="${CSS.escape(o.name)}"]`)).find(d=>{let l=d.closest("label, .vf-label, .option-card, tr, td, div");return l&&f(l.textContent).toLowerCase().includes(f(i).toLowerCase())});s&&(o=s)}}}else if(!(o instanceof HTMLInputElement)&&!(o instanceof HTMLSelectElement)&&!(o instanceof HTMLTextAreaElement)){let r=o.querySelector(`input[value="${CSS.escape(i)}" i], [data-value="${CSS.escape(i)}" i]`);if(r)o=r;else{let s=Array.from(o.querySelectorAll('input[type="radio"], input[type="checkbox"]')).find(d=>{let l=d.closest("label, .vf-label, .option-card, td, div");return l&&f(l.textContent).toLowerCase().includes(f(i).toLowerCase())});s&&(o=s)}}}if(!o&&n.t!=="adv"){console.warn(`[EasyQuiz] Alvo '${t}' n\xE3o encontrado para a\xE7\xE3o '${n.t}'. Prosseguindo...`);return}switch(n.t){case"val":o&&(o instanceof HTMLButtonElement||o.tagName.toLowerCase()==="a"||o.getAttribute("role")==="button"||o.getAttribute("role")==="link"||o instanceof HTMLInputElement&&["button","submit"].includes(o.type)||I(o)?(console.log(`[EasyQuiz] Auto-corre\xE7\xE3o: A\xE7\xE3o 'val' direcionada a bot\xE3o/link '${n.id}'. Clicando...`),q(o)):xe(o,String(n.v)));break;case"chk":o&&L(o,!!n.c);break;case"sel":if(o){let a=Array.isArray(n.v)?n.v:[String(n.v)];Ee(o,a)}break;case"clk":o&&(!!(o.closest('.option-card, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice')||o.querySelector('input[type="radio"], input[type="checkbox"]')||o instanceof HTMLInputElement&&["checkbox","radio"].includes(o.type))?L(o,!0):q(o,n.co));break;case"adv":let r=oe(n.id);if(r){await ye(r,1200);let a=n.id||r.textContent?.trim()||"";a&&pe(window.location.hostname,{advanceSelector:a}),q(r)}else console.warn("[EasyQuiz] Bot\xE3o de avan\xE7o n\xE3o localizado.");break}}function st(){let n=["button","a",'[role="button"]','input[type="submit"]','input[type="button"]','[data-testid*="check" i]','[data-test-id*="check" i]'].join(",");return Array.from(document.querySelectorAll(n)).find(t=>{if(!x(t)||T(t)||t.closest("header, nav, aside"))return!1;let o=t instanceof HTMLInputElement||t instanceof HTMLButtonElement?t.value:"",i=(t.textContent||o||t.getAttribute("aria-label")||"").trim();return/(verificar|checar|check|conferir|validar|enviar|responder)/i.test(i)})||null}function oe(n){if(n){let r=b(n);if(r&&x(r)&&!T(r))return r}try{let r=D(window.location.hostname);if(r.advanceSelector){let a=b(r.advanceSelector);if(a&&x(a)&&!T(a))return a}}catch{}let e=["button","a",'[role="button"]','[role="link"]','input[type="button"]','input[type="submit"]','[data-testid*="next" i]','[data-testid*="continue" i]','[data-testid*="check" i]','[data-test-id*="next" i]','[data-test-id*="continue" i]','[data-test-id*="check" i]','[class*="next" i]','[class*="continue" i]','[class*="proximo" i]','[class*="avancar" i]'].join(","),o=Array.from(document.querySelectorAll(e)).filter(r=>x(r)&&!T(r)&&!r.closest("header, nav, aside"));for(let r of o)if(I(r))return r;for(let r of o){let a=r instanceof HTMLInputElement||r instanceof HTMLButtonElement?r.value:"",s=(r.textContent||a||r.getAttribute("aria-label")||"").trim();if(Z.test(s))return r}let i=document.querySelector('[data-test-id*="next" i], [data-testid*="next" i], [aria-label*="next" i], [aria-label*="pr\xF3xim" i], [aria-label*="avan\xE7ar" i], [aria-label*="continuar" i]');return i&&x(i)&&!T(i)?i:null}async function ye(n,e=1500){let t=Date.now();for(;Date.now()-t<e;){if(!(n.disabled===!0||n.getAttribute("aria-disabled")==="true"||n.classList.contains("disabled")||n.getAttribute("disabled")!==null))return;await new Promise(i=>setTimeout(i,100))}try{n.removeAttribute("disabled"),n.removeAttribute("aria-disabled"),n.classList.remove("disabled"),n.disabled=!1}catch{}}async function De(n){if(n.t==="js"||n.t==="adv")return;if(n.t==="drag"){let o=b(n.from)||b(f(n.from)),i=b(n.to)||b(f(n.to));o&&i&&await te(o,i,2);return}let e=n.id||"",t=b(e)||b(f(e));if(n.t==="clk"||n.t==="chk"){if(!t&&e){let i=Array.from(document.querySelectorAll('input, label, button, [role="radio"], [role="checkbox"], .option-card, [class*="option" i], [class*="choice" i]')),r=f(e).toLowerCase();t=i.find(a=>{let s=f(a.textContent).toLowerCase(),d=f(a.value||"").toLowerCase();return s.includes(r)||d===r||s.startsWith(r+")")||s.startsWith("("+r+")")})||null}let o=n.v!==void 0?String(n.v).trim():"";if(t&&o){if(t instanceof HTMLInputElement&&t.type==="radio"&&t.name){if(f(t.value).toLowerCase()!==f(o).toLowerCase()){let i=document.querySelector(`input[type="radio"][name="${CSS.escape(t.name)}"][value="${CSS.escape(o)}" i]`);if(i)t=i;else{let a=Array.from(document.querySelectorAll(`input[type="radio"][name="${CSS.escape(t.name)}"]`)).find(s=>{let d=s.closest("label, .vf-label, .option-card, tr, td, div");return d&&f(d.textContent).toLowerCase().includes(f(o).toLowerCase())});a&&(t=a)}}}else if(!(t instanceof HTMLInputElement)&&!(t instanceof HTMLSelectElement)&&!(t instanceof HTMLTextAreaElement)){let i=t.querySelector(`input[value="${CSS.escape(o)}" i], [data-value="${CSS.escape(o)}" i]`);if(i)t=i;else{let a=Array.from(t.querySelectorAll('input[type="radio"], input[type="checkbox"]')).find(s=>{let d=s.closest("label, .vf-label, .option-card, td, div");return d&&f(d.textContent).toLowerCase().includes(f(o).toLowerCase())});a&&(t=a)}}}if(t){let i=t.closest('.option-card, label, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, li')||t,r=t instanceof HTMLInputElement&&["radio","checkbox"].includes(t.type)?t:i.querySelector('input[type="radio"], input[type="checkbox"]')||(i.getAttribute("for")?i.ownerDocument.getElementById(i.getAttribute("for")):null),a=n.t==="chk"?!!n.c:!0;if(L(r||i,a),r)try{r.checked=a;try{Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"checked")?.set?.call(r,a)}catch{}(r.type!=="checkbox"||r.checked!==a)&&r.dispatchEvent(new MouseEvent("click",{bubbles:!0,cancelable:!0,composed:!0,view:window})),r.dispatchEvent(new Event("change",{bubbles:!0,composed:!0})),r.dispatchEvent(new Event("input",{bubbles:!0,composed:!0}))}catch{}try{i.focus?.(),i.setAttribute("aria-checked",a?"true":"false"),i.classList.toggle("selected",a),i.classList.toggle("active",a),i.classList.toggle("checked",a),r||i.dispatchEvent(new MouseEvent("click",{bubbles:!0,cancelable:!0,composed:!0,view:window}))}catch{}if(!r||r.checked!==a)try{i.dispatchEvent(new KeyboardEvent("keydown",{key:" ",code:"Space",bubbles:!0})),i.dispatchEvent(new KeyboardEvent("keyup",{key:" ",code:"Space",bubbles:!0}))}catch{}try{i.onclick?.()}catch{}try{r?.onclick?.()}catch{}try{r?.onchange?.()}catch{}}return}if(n.t==="val"){if(!t&&e){let o=Array.from(document.querySelectorAll('input:not([type="hidden"]), textarea, [contenteditable="true"]')),i=f(e).toLowerCase();t=o.find(r=>{let a=(r.getAttribute("placeholder")||"").toLowerCase(),s=(r.name||"").toLowerCase(),d=(r.id||"").toLowerCase(),l=(r.getAttribute("aria-label")||"").toLowerCase();return a.includes(i)||s.includes(i)||d.includes(i)||l.includes(i)})||null}if(t){let i=(t instanceof HTMLInputElement||t instanceof HTMLTextAreaElement?t:t.querySelector('input:not([type="hidden"]), textarea, [contenteditable="true"]'))||t,r=String(n.v??"");try{i.focus?.(),document.execCommand?.("selectAll",!1,void 0),document.execCommand?.("insertText",!1,r)}catch{}xe(i,r)}return}if(n.t==="sel"){if(!t&&e){let o=Array.from(document.querySelectorAll("select")),i=f(e).toLowerCase();t=o.find(r=>{let a=(r.name||"").toLowerCase(),s=(r.id||"").toLowerCase(),d=(r.getAttribute("aria-label")||"").toLowerCase();return a.includes(i)||s.includes(i)||d.includes(i)})||null}if(t){let o=Array.isArray(n.v)?n.v:[String(n.v)];Ee(t,o)}return}}function ee(n){try{if(n.t==="val"){let e=b(n.id)||b(f(n.id));if(!e)return!1;if(e instanceof HTMLButtonElement||e.tagName.toLowerCase()==="a"||e.getAttribute("role")==="button"||e.getAttribute("role")==="link"||e instanceof HTMLInputElement&&["button","submit"].includes(e.type)||I(e))return!0;let o=String(n.v??"").trim(),i=e instanceof HTMLInputElement&&e.type==="radio"?e:e.querySelector('input[type="radio"]');if(i&&i.name){let l=document.querySelector(`input[type="radio"][name="${CSS.escape(i.name)}"]:checked`);if(!l)return!1;let c=f(l.value).toLowerCase(),u=f(o).toLowerCase(),p=f(l.closest("label, .vf-label, .option-card, tr, td, div")?.textContent||"").toLowerCase();return c===u||p===u||p.includes(u)}let r=e instanceof HTMLInputElement||e instanceof HTMLTextAreaElement?e:e.querySelector('input:not([type="hidden"]), textarea, [contenteditable="true"]'),a=(r?r.value??r.textContent??"":e.textContent??"").trim();if(!a&&!o)return!0;if(!a&&o)return!1;let s=a.replace(",",".").toLowerCase(),d=o.replace(",",".").toLowerCase();return s===d||s.includes(d)||a.toLowerCase()===o.toLowerCase()}if(n.t==="sel"){let e=b(n.id)||b(f(n.id));if(!e)return!1;let t=e instanceof HTMLSelectElement?e:e.querySelector("select");if(!t)return!1;let i=(Array.isArray(n.v)?n.v:[String(n.v)]).map(r=>f(r).toLowerCase());return Array.from(t.options).some(r=>{if(!r.selected)return!1;let a=r.value.toLowerCase(),s=f(r.textContent).toLowerCase();return i.some(d=>d===a||d===s||a.includes(d)||s.includes(d))})}if(n.t==="chk"||n.t==="clk"){let e=b(n.id)||b(f(n.id));if(!e)return!1;let t=e.closest('.option-card, label, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, li')||e,o=e instanceof HTMLInputElement&&["checkbox","radio"].includes(e.type)?e:t.querySelector('input[type="checkbox"], input[type="radio"]')||(t.getAttribute("for")?t.ownerDocument.getElementById(t.getAttribute("for")):null),i=n.t==="chk"?!!n.c:!0;if(o&&o.type==="radio"&&n.v){let l=f(String(n.v)).toLowerCase();if(o.name){let c=document.querySelector(`input[type="radio"][name="${CSS.escape(o.name)}"]:checked`);return c?f(c.value).toLowerCase()===l:!1}}if(o&&["checkbox","radio"].includes(o.type))return o.checked===i;let r=t.getAttribute("aria-checked")===String(i)||t.getAttribute("aria-selected")===String(i)||t.getAttribute("aria-pressed")===String(i),a=i?t.getAttribute("data-selected")==="true"||t.getAttribute("data-checked")==="true"||t.getAttribute("data-active")==="true"||t.getAttribute("data-state")==="checked"||t.getAttribute("data-state")==="on":t.getAttribute("data-selected")==="false"||t.getAttribute("data-checked")==="false"||t.getAttribute("data-state")==="unchecked",s=i?/active|selected|checked|picked|correct|is-selected|choice-selected|selected-option|is-checked|chosen|current|highlight|ring|border-primary/i.test(t.className||""):!/active|selected|checked|picked|correct|is-selected|choice-selected|selected-option|is-checked|chosen|current|highlight|ring|border-primary/i.test(t.className||"");return!!(r||a||s||(t instanceof HTMLButtonElement||t.getAttribute("role")==="button")&&n.t==="clk"||n.t==="clk"&&!o)}if(n.t==="drag"){let e=b(n.from)||b(f(n.from)),t=b(n.to)||b(f(n.to));return!e||!t?!1:t.contains(e)?!0:/placed|dropped|assigned|matched|done|selected/i.test(e.className||"")||e.getAttribute("data-placed")==="true"}}catch{}return!1}async function Ce(n,e,t=1){let o=n.actions.filter(u=>u.t!=="adv"),i=n.actions.filter(u=>u.t==="adv"),r=0;for(let u of o){try{await it(u,t),r++}catch(p){console.warn("[EasyQuiz] A\xE7\xE3o declarativa prim\xE1ria falhou com seguran\xE7a:",u,p)}u.t==="drag"&&await new Promise(p=>setTimeout(p,250))}await new Promise(u=>setTimeout(u,o.length>0?300:50));let a=0;for(let u of o){if(ee(u)){a++;continue}console.warn(`[EasyQuiz Auto-Cura] A\xE7\xE3o '${u.t}' no alvo '${u.id||u.from||""}' n\xE3o verificada no DOM. Disparando Passagem 2 de conting\xEAncia...`);try{await De(u)}catch(p){console.warn("[EasyQuiz Auto-Cura] Rota alternativa falhou:",p)}await new Promise(p=>setTimeout(p,180)),ee(u)&&(console.log("[EasyQuiz Auto-Cura] \u2713 A\xE7\xE3o recuperada com sucesso pela rota de conting\xEAncia!"),a++)}if(a<o.length&&o.length>0){console.warn(`[EasyQuiz Auto-Cura] ${o.length-a} de ${o.length} a\xE7\xE3o(\xF5es) ainda n\xE3o verificadas. Disparando Passagem 3 final...`),await new Promise(u=>setTimeout(u,200));for(let u of o)if(!ee(u))try{await De(u)}catch{}await new Promise(u=>setTimeout(u,200)),a=0;for(let u of o)ee(u)&&a++}let s=n.pageType==="question",d=o.length<=4?1:.85,l=!s||o.length===0?!0:r>0&&a>=Math.ceil(o.length*d),c=!1;if((e||t>=2)&&(l||!s)){if(await new Promise(h=>setTimeout(h,o.length>0?500:200)),n.pageType!=="info"){let h=st();h&&x(h)&&(await ye(h,1200),q(h),await new Promise(m=>setTimeout(m,800)))}let u=i.length>0?i[0].id:void 0,p=oe(u);if(p){await ye(p,1200);let h=u||p.textContent?.trim()||"";h&&pe(window.location.hostname,{advanceSelector:h}),q(p),c=!0}else console.warn("[EasyQuiz] Nenhum bot\xE3o de avan\xE7o encontrado na p\xE1gina.")}return{applied:r,verified:a,success:l,advanced:c}}var Ve=!1,H=null;function Te(){let n=typeof window<"u"&&window.document?window.document:typeof document<"u"?document:null;!n||Ve||(Ve=!0,n.addEventListener("click",e=>{let t=e.target;if(!t||T(t))return;if(H&&(t===H||t.contains(H))){e.preventDefault(),e.stopPropagation(),e.stopImmediatePropagation?.();return}if(t instanceof HTMLInputElement&&["checkbox","radio"].includes(t.type))return;let o=t.closest('label, .option-card, [role="radio"], [role="checkbox"], .quiz-option, .answer, .choice, [class*="option" i], [class*="choice" i]');if(!o||T(o))return;let i=o.querySelector('input[type="checkbox"], input[type="radio"]');if(!i&&o.hasAttribute("for")){let r=o.getAttribute("for");r&&(i=o.ownerDocument.getElementById(r))}i&&(i.type==="checkbox"?(e.preventDefault(),e.stopPropagation(),e.stopImmediatePropagation?.(),H=i,setTimeout(()=>{H===i&&(H=null)},70),L(i,!i.checked)):i.type==="radio"&&(e.preventDefault(),e.stopPropagation(),e.stopImmediatePropagation?.(),H=i,setTimeout(()=>{H===i&&(H=null)},70),L(i,!0)))},!0))}var G=null,B=[];function j(){G&&(G.style.removeProperty("outline"),G.style.removeProperty("outline-offset"),G=null);for(let n of B)n.style.removeProperty("outline"),n.style.removeProperty("outline-offset"),n.style.removeProperty("background-color"),n.style.removeProperty("box-shadow"),n.removeAttribute("data-easyquiz-highlight");B=[]}function qe(n){j(),G=n,n.style.outline="2px solid #00e5ff",n.style.outlineOffset="4px"}function Ge(n){for(let e of n){if(e.t==="adv"||e.t==="js")continue;if(e.t==="drag"){try{let r=b(e.from),a=b(e.to);r&&(r.style.outline="2px solid #00ff88",B.push(r)),a&&(a.style.outline="2px dashed #00e5ff",B.push(a))}catch{}continue}if(!e.id)continue;let t=b(e.id);if(!t)continue;let o=t.closest('label, .option-card, [role="radio"], [role="checkbox"], [role="listitem"], .answer, .quiz-option, .form-check, [class*="option" i], [class*="choice" i], tr, li')||t;o.style.outline="2px solid #00ff88",o.style.outlineOffset="2px",o.style.backgroundColor="rgba(0, 255, 136, 0.12)",o.setAttribute("data-easyquiz-highlight","true"),B.push(o);let i=t instanceof HTMLInputElement&&["checkbox","radio"].includes(t.type)?t:o.querySelector('input[type="checkbox"], input[type="radio"]');i&&i!==o&&(i.style.outline="2px solid #00ff88",i.style.outlineOffset="2px",i.style.boxShadow="0 0 10px rgba(0, 255, 136, 0.8)",i.setAttribute("data-easyquiz-highlight","true"),B.push(i))}}var F=4,rt=1200,Ae=12e5;function ne(n){return new Promise((e,t)=>{let o=new FileReader;o.onerror=()=>t(new Error("Falha ao converter blob para base64.")),o.onload=()=>{let i=String(o.result||"");e(i.split(",")[1]||"")},o.readAsDataURL(n)})}async function ae(n){let e=0,t=0;if(n instanceof HTMLImageElement?(e=n.naturalWidth||n.width,t=n.naturalHeight||n.height):(e=n.width,t=n.height),e<=0||t<=0)throw new Error("Dimens\xF5es inv\xE1lidas.");let o=Math.min(1,rt/Math.max(e,t)),i=Math.max(1,Math.round(e*o)),r=Math.max(1,Math.round(t*o)),a=document.createElement("canvas");a.width=i,a.height=r;let s=a.getContext("2d",{alpha:!1});if(!s)throw new Error("Sem suporte a Canvas 2D.");return s.fillStyle="#ffffff",s.fillRect(0,0,i,r),s.drawImage(n,0,0,i,r),new Promise((d,l)=>{a.toBlob(c=>c?d(c):l(new Error("Falha compress\xE3o.")),"image/jpeg",.8)})}async function je(n){try{let e=n.cloneNode(!0),t=n.offsetWidth||500,o=n.offsetHeight||500,i=`
      <svg xmlns="http://www.w3.org/2000/svg" width="${t}" height="${o}">
        <foreignObject width="100%" height="100%">
          <div xmlns="http://www.w3.org/1999/xhtml" style="background:#fff;font-family:sans-serif;">
            ${e.innerHTML}
          </div>
        </foreignObject>
      </svg>
    `,r=new Blob([i],{type:"image/svg+xml;charset=utf-8"}),a=URL.createObjectURL(r),s=new Image;s.crossOrigin="anonymous",await new Promise((c,u)=>{s.onload=c,s.onerror=u,s.src=a});let d=await ae(s),l=await ne(d);if(URL.revokeObjectURL(a),l&&l.length<=Ae)return{mediaType:"image/jpeg",base64:l,alt:"Captura Suprema via rasteriza\xE7\xE3o DOM",source:"rasterized"}}catch(e){console.warn("Falha na rasteriza\xE7\xE3o suprema:",e)}return null}async function lt(n){let e=n.currentSrc||n.src;if(!e)return null;let t=(n.alt||n.getAttribute("aria-label")||"Imagem da quest\xE3o").slice(0,500);if(n.complete&&n.naturalWidth>0)try{let o=await ae(n),i=await ne(o);if(i&&i.length<=Ae)return{mediaType:"image/jpeg",base64:i,alt:t,source:e.slice(0,2e3)}}catch{}try{let o=await fetch(e,{mode:"cors"});if(o.ok){let i=await o.blob();if(i.type.startsWith("image/")){let r=await createImageBitmap(i),a=await ae(r);r.close();let s=await ne(a);if(s&&s.length<=Ae)return{mediaType:"image/jpeg",base64:s,alt:t,source:e.slice(0,2e3)}}}}catch{return je(n.parentElement||n)}return null}async function Me(n,e=!0){if(!e)return[];let t=[],o=0,i=Array.from(n.querySelectorAll("img")).filter(x).slice(0,F);for(let r of i)try{let a=await lt(r);if(a&&o+a.base64.length<=25e5&&(t.push(a),o+=a.base64.length,t.length>=F))break}catch{}if(t.length<F){let r=Array.from(n.querySelectorAll("canvas")).filter(x).slice(0,F);for(let a of r)try{let s=await ae(a),d=await ne(s);if(d&&o+d.length<=25e5&&(t.push({mediaType:"image/jpeg",base64:d,alt:"Canvas inline",source:"canvas"}),o+=d.length,t.length>=F))break}catch{let s=await je(a.parentElement||a);s&&(t.push(s),o+=s.base64.length)}}return t}var ie=class{active=!1;timer=null;callbacks;lastRunTime=0;lastActionTime=0;isProcessing=!1;constructor(e){this.callbacks=e}isActive(){return this.active}start(){this.active||(this.active=!0,this.lastActionTime=Date.now(),this.callbacks.onStatusChange("waiting","> [SYS] Autopilot ENGAGED. Monitorando..."),this.loop())}stop(){this.active=!1,this.timer&&clearTimeout(this.timer),this.callbacks.onStatusChange("idle","> [SYS] Autopilot DESATIVADO.")}errorCount=0;lastPageSig="";samePageCount=0;async loop(){if(!this.active)return;let e=Date.now();if(e-this.lastRunTime<2500||this.isProcessing){this.timer=window.setTimeout(()=>this.loop(),500);return}this.lastRunTime=e;try{this.isProcessing=!0;let t=_(!1);if(t||(t=O()),t){let o=`${t.pageTitle}_${t.questionText.slice(0,80)}_${t.controls.length}`;if(o===this.lastPageSig)this.samePageCount++;else{let a=this.samePageCount>1;this.lastPageSig=o,this.samePageCount=1,a&&(this.callbacks.onStatusChange("waiting","> [SYS] Avan\xE7o de p\xE1gina detectado! Retomando monitoramento autom\xE1tico...","text-green"),this.callbacks.onPageAdvance?.())}if(this.callbacks.isManualModeActive?.()){this.callbacks.onStatusChange("waiting","> [SYS] Gabarito manual ativo na tela. Aguardando voc\xEA posicionar as respostas e avan\xE7ar a p\xE1gina...","text-yellow"),this.lastRunTime=Date.now();return}if(this.samePageCount>1&&(this.callbacks.onStatusChange("waiting",`> [AUTOPILOT] Resolu\xE7\xE3o pendente (${this.samePageCount}\xAA verifica\xE7\xE3o). Conclua e avance para prosseguir...`,"text-yellow"),await new Promise(a=>setTimeout(a,4e3))),this.samePageCount>=4){let a=oe();if(a){this.callbacks.onStatusChange("advancing","> [SYS] For\xE7ando acionamento de bot\xE3o de avan\xE7o para desbloquear quest\xE3o...","text-yellow"),q(a),this.samePageCount=0,await new Promise(s=>setTimeout(s,2e3));return}}let i=t.controls.filter(a=>a.role==="answer"),r=D(window.location.hostname);if(i.length>0){this.callbacks.onStatusChange("analyzing","> [IA] Quest\xE3o/Exerc\xEDcio detectado. Consultando IA...","text-blue"),await new Promise(s=>setTimeout(s,600));let a=await this.callbacks.onRequestAnalysis(this.samePageCount);if(a){if(this.callbacks.onStatusChange("analyzing",`> [IA] (${a.usedModel||"gemini"}) Confian\xE7a: ${(a.confidence*100).toFixed(1)}% | Modo: ${a.mode}`,"text-blue"),this.callbacks.onStatusChange("analyzing",`> [IA] Racioc\xEDnio: ${a.rationale}`,"text-blue"),this.callbacks.onStatusChange("analyzing",`> [IA] A\xE7\xF5es geradas: ${a.actions.length}`,"text-blue"),this.errorCount=0,a.memoryToStore&&this.callbacks.onStatusChange("analyzing",`> [IA] \u{1F9E0} Mem\xF3ria RAG salva: "${a.memoryToStore}"`,"text-yellow"),a.pageType==="conclusion"){this.callbacks.onStatusChange("idle","> [SYS] Atividade conclu\xEDda! Desligando Autopilot.","text-green"),this.stop();return}}else{this.errorCount++;let s=this.errorCount===1?5e3:8e3;this.callbacks.onStatusChange("waiting",`> [AVISO] Falha na an\xE1lise (${this.errorCount}/3). Aguardando ${s/1e3}s para estabiliza\xE7\xE3o antes de tentar novamente...`,"text-yellow"),await new Promise(d=>setTimeout(d,s))}this.lastActionTime=Date.now()}else if(r.advanceSelector&&b(r.advanceSelector)&&t.questionText.length<50){let a=b(r.advanceSelector);a&&(this.callbacks.onStatusChange("advancing",`> [BRUTE] Avan\xE7ando via cache "${r.advanceSelector}"...`),await new Promise(s=>setTimeout(s,1e3)),q(a),this.lastActionTime=Date.now(),this.errorCount=0)}else{this.callbacks.onStatusChange("analyzing","> [IA] P\xE1gina informativa/contexto detectada. Lendo e consultando IA...","text-blue"),await new Promise(s=>setTimeout(s,600));let a=await this.callbacks.onRequestAnalysis(this.samePageCount);if(a){if(this.callbacks.onStatusChange("analyzing",`> [IA] (${a.usedModel||"gemini"}) Tipo: ${a.pageType} | Modo: ${a.mode}`,"text-blue"),this.callbacks.onStatusChange("analyzing",`> [IA] Racioc\xEDnio: ${a.rationale}`,"text-blue"),a.memoryToStore&&this.callbacks.onStatusChange("analyzing",`> [IA] \u{1F9E0} Conte\xFAdo absorvido na mem\xF3ria: "${a.memoryToStore}"`,"text-yellow"),a.pageType==="info")this.callbacks.onStatusChange("advancing","> [IA] \u{1F4D6} Leitura conclu\xEDda. Avan\xE7ando automaticamente...","text-green"),await new Promise(s=>setTimeout(s,1800));else if(a.pageType==="start")this.callbacks.onStatusChange("advancing","> [SYS] In\xEDcio de m\xF3dulo detectado. Iniciando...","text-blue"),await new Promise(s=>setTimeout(s,1800));else if(a.pageType==="conclusion"){this.callbacks.onStatusChange("idle","> [SYS] Atividade conclu\xEDda! Desligando Autopilot.","text-green"),this.stop();return}this.errorCount=0}else{this.errorCount++;let s=this.errorCount===1?5e3:8e3;this.callbacks.onStatusChange("waiting",`> [AVISO] Falha ao processar p\xE1gina (${this.errorCount}/3). Aguardando ${s/1e3}s para estabiliza\xE7\xE3o antes de tentar novamente...`,"text-yellow"),await new Promise(d=>setTimeout(d,s))}this.lastActionTime=Date.now()}if(this.errorCount>=3){this.callbacks.onStatusChange("error","> [ERRO] 3 falhas consecutivas. Abortando Autopilot para poupar sua cota e tokens.","text-red"),this.callbacks.onStatusChange("waiting","> [DICA] Verifique a mensagem vermelha de [ERRO DETALHADO] no console acima para saber o motivo exato.","text-yellow"),this.stop();return}}else this.callbacks.onStatusChange("waiting","> [SYS] Monitorando p\xE1gina... Aguardando carregamento dos elementos.")}catch(t){let o=t instanceof Error?t.message:String(t);console.warn("[EasyQuiz Autopilot]",t),this.callbacks.onStatusChange("error",`> [ERRO NO AUTOPILOT] ${o}`,"text-red")}finally{this.isProcessing=!1}this.active&&(this.timer=window.setTimeout(()=>this.loop(),1e3))}};var g={logo:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.8L19.2 8 12 11.2 4.8 8 12 4.8zM4 9.6l7 3.1v7.5l-7-3.5V9.6zm9 10.6v-7.5l7-3.1v7.1l-7 3.5z"/></svg>',rocket:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M13.13 2.81a.5.5 0 0 0-.46-.07c-.42.15-2.08.79-3.9 2.61-2.04 2.04-2.6 4.09-2.73 4.96l-.97.98a1 1 0 0 0-.29.71v2.12a1 1 0 0 0 .29.71l2.83 2.83a1 1 0 0 0 .71.29h2.12a1 1 0 0 0 .71-.29l.98-.97c.87-.13 2.92-.69 4.96-2.73 1.82-1.82 2.46-3.48 2.61-3.9a.5.5 0 0 0-.07-.46l-6.79-6.79zM4.5 16.5l-2.09 2.09a.5.5 0 0 0 .35.85h3.04l.35.35v3.04a.5.5 0 0 0 .85.35L9.09 21.1l-4.59-4.6z"/></svg>',play:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>',stop:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h12v12H6z"/></svg>',code:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>',terminal:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8h16v10zm-12-3l3-3-3-3 1.4-1.4L13.8 12l-4.4 4.4L8 15zm6 0h4v2h-4v-2z"/></svg>',inspector:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>',settings:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.49.49 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>',key:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M7 14c-2.76 0-5-2.24-5-5s2.24-5 5-5c2.42 0 4.44 1.72 4.9 4H22v4h-2v3h-3v-3h-2v3h-3v-3h-2.1c-.46 2.28-2.48 4-4.9 4zm0-7c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>',paste:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 2h-4.18C14.4 .84 13.3 0 12 0c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm7 18H5V4h2v3h10V4h2v16z"/></svg>',edit:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>',trash:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>',eraser:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M15.14 3c-.51 0-1.02.2-1.41.59L2.59 14.73c-.78.78-.78 2.05 0 2.83L6.44 21.4c.78.78 2.05.78 2.83 0l11.14-11.14c.78-.78.78-2.05 0-2.83l-3.86-3.84c-.39-.39-.9-.59-1.41-.59zm.71 2.71l3.15 3.15-3.15 3.15-3.15-3.15 3.15-3.15zm-4.57 4.57l3.15 3.15-4.57 4.57H6.71l-3-3 7.57-7.57z"/></svg>',save:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/></svg>',analyze:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L3 14h8l-2 8 12-12h-8l2-8z"/></svg>',apply:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>',close:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>',chevronRight:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>',chevronLeft:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>',eye:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>',eyeOff:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.44-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.17c0-1.66-1.34-3-3-3l-.17.02z"/></svg>',check:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>',clock:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>',copy:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>',refresh:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg>',chip:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4h12v16H6V4zm2 2v12h8V6H8zm-4 3h2v2H4V9zm0 4h2v2H4v-2zm16-4h2v2h-2V9zm0 4h2v2h-2v-2zM9 2h2v2H9V2zm4 0h2v2h-2V2zm-4 18h2v2H9v-2zm4 0h2v2h-2v-2z"/></svg>',moreVertical:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>',minimize:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M19 13H5v-2h14v2z"/></svg>',maximize:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/></svg>',dragHandle:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M10 9h4V6h-4v3zm0 5h4v-3h-4v3zm0 5h4v-3h-4v3zM4 9h4V6H4v3zm0 5h4v-3H4v3zm0 5h4v-3H4v3zm12-10V6h4v3h-4zm0 5h4v-3h-4v3zm0 5h4v-3h-4v3z"/></svg>',list:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/></svg>',folderTree:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6 10H6v-2h8v2zm4-4H6v-2h12v2z"/></svg>',folder:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/></svg>',file:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>'};var se=class{element=null;shadow;isMinimized=!1;currentPlan=null;isDragging=!1;dragStartX=0;dragStartY=0;initialLeft=25;initialTop=25;onAdvanceCallback;constructor(e,t){this.shadow=e,this.onAdvanceCallback=t,this.initGlobalListeners()}initGlobalListeners(){window.addEventListener("popstate",()=>this.handlePageNavigated()),window.addEventListener("hashchange",()=>this.handlePageNavigated()),document.addEventListener("click",e=>{if(!this.isOpen())return;let t=e.target;if(!t||this.shadow.contains(t)||t.closest("#easyquiz-shadow-root"))return;let o=t.closest('button, [role="button"], a, input[type="submit"]');if(o){let i=(o.textContent||o.value||"").toLowerCase();/pr[oó]xim|avan[cç]|continu|verific|enviar|submit|confirm|checar|validar|next/i.test(i)&&setTimeout(()=>{this.isOpen()&&this.handlePageNavigated()},800)}},!0)}handlePageNavigated(){this.isOpen()&&(this.hide(),this.onAdvanceCallback?.())}isOpen(){return this.element!==null&&this.element.style.display!=="none"}show(e){this.currentPlan=e,this.element||this.createElement(),this.renderContent(),this.element&&(this.element.style.display="flex")}hide(){this.element&&(this.element.style.display="none")}minimize(){this.isMinimized=!0,this.element&&this.element.classList.add("minimized")}restore(){this.isMinimized=!1,this.element&&this.element.classList.remove("minimized")}createElement(){this.element=document.createElement("div"),this.element.className="eq-floating-hud",this.element.style.left=`${this.initialLeft}px`,this.element.style.top=`${this.initialTop}px`,this.element.innerHTML=`
      <!-- P\xEDlula compacta quando minimizado -->
      <div class="eq-fah-pill" id="eq-fah-pill" title="Clique para expandir gabarito interativo">
        <span class="eq-fah-pill-icon">${g.list}</span>
        <span id="eq-fah-pill-text">Gabarito Manual</span>
        <span class="eq-fah-pill-badge" id="eq-fah-pill-badge">0</span>
      </div>

      <!-- Cabe\xE7alho com barra de arraste -->
      <div class="eq-fah-header" id="eq-fah-header">
        <div class="eq-fah-title">
          <span style="display:flex; align-items:center;">${g.dragHandle}</span>
          <span>Gabarito Manual Interativo</span>
        </div>
        <div class="eq-fah-actions">
          <button class="eq-fah-btn" id="eq-fah-copy-md-btn" title="Copiar tudo formatado em Markdown">${g.copy}</button>
          <button class="eq-fah-btn" id="eq-fah-min-btn" title="Minimizar para p\xEDlula flutuante">${g.minimize}</button>
          <button class="eq-fah-btn" id="eq-fah-close-btn" title="Fechar gabarito">${g.close}</button>
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
    `,this.shadow.appendChild(this.element),this.element.querySelector("#eq-fah-pill").addEventListener("click",()=>this.restore()),this.element.querySelector("#eq-fah-min-btn").addEventListener("click",()=>this.minimize()),this.element.querySelector("#eq-fah-close-btn").addEventListener("click",()=>this.hide());let i=this.element.querySelector("#eq-fah-copy-md-btn");i.addEventListener("click",()=>this.copyMarkdownToClipboard(i));let r=this.element.querySelector("#eq-fah-copy-all-btn");r.addEventListener("click",()=>this.copyMarkdownToClipboard(r));let a=this.element.querySelector("#eq-fah-header");this.setupDraggable(a)}setupDraggable(e){let t=o=>{if(o.target.closest(".eq-fah-btn"))return;o.preventDefault(),this.isDragging=!0,this.dragStartX=o.clientX,this.dragStartY=o.clientY;let i=this.element.getBoundingClientRect();this.initialLeft=i.left,this.initialTop=i.top;let r=s=>{if(!this.isDragging||!this.element)return;let d=s.clientX-this.dragStartX,l=s.clientY-this.dragStartY,c=Math.max(10,window.innerWidth-this.element.offsetWidth-10),u=Math.max(10,window.innerHeight-this.element.offsetHeight-10),p=Math.min(Math.max(10,this.initialLeft+d),c),h=Math.min(Math.max(10,this.initialTop+l),u);this.element.style.left=`${p}px`,this.element.style.top=`${h}px`},a=()=>{this.isDragging=!1,window.removeEventListener("mousemove",r),window.removeEventListener("mouseup",a)};window.addEventListener("mousemove",r),window.addEventListener("mouseup",a)};e.addEventListener("mousedown",t)}renderContent(){if(!this.element||!this.currentPlan)return;let e=this.element.querySelector("#eq-fah-body"),t=this.element.querySelector("#eq-fah-pill-text"),o=this.element.querySelector("#eq-fah-pill-badge");e.innerHTML="";let i=this.currentPlan,r=i.actions.filter(c=>c.t==="drag"),a=i.actions.filter(c=>{if(c.t!=="val")return!1;let u=f(c.id||"").toLowerCase();return!/continu|avan[cç]|pr[oó]xim|submet|enviar|check|verific/i.test(u)}),s=i.actions.filter(c=>c.t==="clk"||c.t==="chk"),d=r.length||a.length||s.length,l=document.createElement("div");if(l.className="eq-fah-meta",l.innerHTML=`
      <span>Modo: <strong style="color:#ffffff;">${i.mode.replace("_"," ")}</strong></span>
      <span class="eq-fah-meta-badge">${Math.round(i.confidence*100)}% Confian\xE7a</span>
    `,e.appendChild(l),r.length>0||i.mode==="categorizacao"||i.mode==="arrastar_soltar"){t.textContent=`Categoriza\xE7\xE3o (${r.length} itens)`,o.textContent=String(r.length);let c={};for(let u of r){let p=f(u.to)||"Geral";c[p]||(c[p]=[]),c[p].push(f(u.from))}for(let[u,p]of Object.entries(c)){let h=document.createElement("div"),m=/fato|true|verdadeiro|sim/i.test(u),v=/opini[aã]o|false|falso|n[aã]o/i.test(u);h.className=`eq-fah-group ${m?"group-fato":v?"group-opiniao":""}`;let y=document.createElement("div");y.className="eq-fah-group-title",y.innerHTML=`<span>\u{1F4C1}</span> <span>${u} (${p.length})</span>`,h.appendChild(y);let w=document.createElement("div");w.className="eq-fah-group-items";for(let S of p){let C=document.createElement("div");C.className="eq-fah-item";let U=document.createElement("span");U.className="eq-fah-item-text",U.textContent=S,C.appendChild(U);let M=document.createElement("button");M.className="eq-fah-copy-inline",M.textContent="Copiar",M.addEventListener("click",()=>{navigator.clipboard.writeText(S),M.textContent="\u2713 Copiado",setTimeout(()=>M.textContent="Copiar",1200)}),C.appendChild(M),w.appendChild(C)}h.appendChild(w),e.appendChild(h)}}else if(a.length>0){t.textContent=`Preenchimento (${a.length} campos)`,o.textContent=String(a.length);let c=document.createElement("div");c.className="eq-fah-group";let u=document.createElement("div");u.className="eq-fah-group-title",u.textContent="Respostas para Inserir:",c.appendChild(u);let p=document.createElement("div");p.className="eq-fah-group-items";for(let h of a){let m=document.createElement("div");m.className="eq-fah-item";let v=document.createElement("span");v.className="eq-fah-item-text";let y=we(h.id),S=/^[#\.\$]|input|mat-|cell|field|q[0-9]/i.test(y)?"":y;v.innerHTML=`${S?`<strong>${S}:</strong> `:""}<code style="color:#00ffcc; background:rgba(0,255,204,0.1); padding:2px 6px; border-radius:4px; font-weight:600;">${h.v}</code>`,m.appendChild(v);let C=document.createElement("button");C.className="eq-fah-copy-inline",C.textContent="Copiar",C.addEventListener("click",()=>{navigator.clipboard.writeText(String(h.v)),C.textContent="\u2713 Copiado",setTimeout(()=>C.textContent="Copiar",1200)}),m.appendChild(C),p.appendChild(m)}c.appendChild(p),e.appendChild(c)}else if(s.length>0){t.textContent=`Op\xE7\xF5es (${s.length} marcadas)`,o.textContent=String(s.length);let c=document.createElement("div");c.className="eq-fah-group";let u=document.createElement("div");u.className="eq-fah-group-title",u.textContent="Alternativa(s) Correta(s):",c.appendChild(u);let p=document.createElement("div");p.className="eq-fah-group-items";for(let h of s){let m=document.createElement("div");m.className="eq-fah-item";let v=document.createElement("span");v.className="eq-fah-item-text";let y=we(h.id);/^[#\.\$]|opt|choice|radio|chk|q[0-9]/i.test(y)&&h.v&&(y=String(h.v)),v.innerHTML=`<span style="color:#00ffcc; font-weight:bold; margin-right:6px;">\u2611</span> <span>${y}</span>`,m.appendChild(v);let w=document.createElement("button");w.className="eq-fah-copy-inline",w.textContent="Copiar",w.addEventListener("click",()=>{navigator.clipboard.writeText(y),w.textContent="\u2713 Copiado",setTimeout(()=>w.textContent="Copiar",1200)}),m.appendChild(w),p.appendChild(m)}c.appendChild(p),e.appendChild(c)}else t.textContent="Gabarito",o.textContent="0",e.innerHTML+='<div style="padding:10px; color:#888;">Nenhuma resposta direta para exibir.</div>';if(i.rationale){let c=document.createElement("div");c.className="eq-fah-rationale",c.innerHTML=`<strong>\u{1F4A1} Racioc\xEDnio da IA:</strong> ${i.rationale}`,e.appendChild(c)}}generateMarkdown(){if(!this.currentPlan)return"";let e=this.currentPlan,t=[];t.push("# Gabarito da Quest\xE3o \u2014 EasyQuiz Pro"),t.push(`- **Modo:** ${e.mode}`),t.push(`- **Confian\xE7a:** ${(e.confidence*100).toFixed(0)}%`),t.push("");let o=e.actions.filter(a=>a.t==="drag"),i=e.actions.filter(a=>a.t==="val"),r=e.actions.filter(a=>a.t==="clk"||a.t==="chk");if(o.length>0){t.push("## \u{1F4C2} Categoriza\xE7\xE3o:");let a={};for(let s of o){let d=f(s.to)||"Geral";a[d]||(a[d]=[]),a[d].push(f(s.from))}for(let[s,d]of Object.entries(a)){t.push(`### Categoria: ${s}`);for(let l of d)t.push(`- ${l}`);t.push("")}}else if(i.length>0){t.push("## \u270F\uFE0F Respostas para Preenchimento:");for(let a of i){let s=f(a.id);t.push(`- **${s||"Campo"}:** \`${a.v}\``)}t.push("")}else if(r.length>0){t.push("## \u2705 Alternativas Corretas:");for(let a of r)t.push(`- [x] ${f(a.id)}`);t.push("")}return e.rationale&&(t.push("---"),t.push(`**\u{1F4A1} Racioc\xEDnio:** ${e.rationale}`)),t.join(`
`)}copyMarkdownToClipboard(e){let t=this.generateMarkdown();t&&navigator.clipboard.writeText(t).then(()=>{let o=e.innerHTML;e.id==="eq-fah-copy-md-btn"?e.innerHTML='<span style="font-size:10px; color:#00ffcc; font-weight:bold;">\u2713</span>':e.innerHTML="\u2713 Copiado!",setTimeout(()=>{e.innerHTML=o},1500)})}};var Fe=`
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Nunito:wght@400;600;700;800;900&display=swap');

  :host {
    all: initial;
    color-scheme: dark;
    font-family: 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-size: 13px;
    line-height: 1.4;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  :host(.eq-dark-mode-active) .eq-sidebar,
  :host(.eq-dark-mode-active) .eq-launcher {
    filter: invert(1) hue-rotate(180deg) !important;
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
    background: #141414;
    border: 1px solid #2d2d30;
    border-right: none;
    border-radius: 10px 0 0 10px;
    color: #00ffcc;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    cursor: pointer;
    box-shadow: -6px 0 20px rgba(0, 0, 0, 0.7);
    transition: background 0.18s, color 0.18s, width 0.18s, left 0.18s;
    user-select: none;
    z-index: 10;
  }

  .eq-dock-toggle:hover {
    background: #1f1f1f;
    color: #ffffff;
    width: 44px;
    left: -44px;
  }

  .eq-dock-toggle-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .eq-dock-toggle-label {
    font-size: 9px;
    font-weight: 900;
    letter-spacing: 0.08em;
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
    padding: 0 14px;
    background: rgba(18, 18, 18, 0.88);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(0, 255, 204, 0.35);
    border-radius: 24px;
    color: #ffffff;
    display: flex;
    align-items: center;
    gap: 9px;
    cursor: pointer;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.65), 0 0 16px rgba(0, 255, 204, 0.15);
    transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    user-select: none;
    font-family: inherit;
    font-weight: 800;
    font-size: 12px;
    letter-spacing: 0.04em;
  }

  .eq-launcher:hover {
    border-color: #00ffcc;
    box-shadow: 0 10px 36px rgba(0, 0, 0, 0.8), 0 0 24px rgba(0, 255, 204, 0.35);
    transform: translateY(-2px) scale(1.02);
    background: rgba(24, 24, 24, 0.95);
  }

  .eq-launcher:active {
    transform: translateY(1px) scale(0.98);
  }

  .eq-launcher-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #00ffcc;
  }

  .eq-launcher-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #00ff55;
    box-shadow: 0 0 8px #00ff55;
    transition: background 0.2s, box-shadow 0.2s;
  }

  .eq-launcher-dot.busy {
    background: #00ffcc;
    box-shadow: 0 0 10px #00ffcc;
    animation: eq-pulse 1s infinite alternate;
  }

  .eq-launcher-dot.error {
    background: #ff4757;
    box-shadow: 0 0 10px #ff4757;
    animation: none;
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
    background: #181818;
    border-left: 1px solid #2d2d30;
    color: #cccccc;
    display: flex;
    flex-direction: row; /* Coluna vertical \xE0 esquerda + corpo principal */
    box-shadow: -10px 0 40px rgba(0, 0, 0, 0.85);
    transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1);
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
    background: #141414;
    border-right: 1px solid #252528;
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
    width: 38px;
    height: 38px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    border-radius: 6px;
    color: #757575;
    cursor: pointer;
    transition: all 0.18s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .eq-activity-btn:hover {
    color: #dddddd;
    background: rgba(255, 255, 255, 0.05);
  }

  .eq-activity-btn.active {
    color: #ffffff;
    background: rgba(0, 255, 204, 0.08);
  }

  .eq-activity-indicator {
    position: absolute;
    left: -5px;
    top: 6px;
    bottom: 6px;
    width: 3px;
    background: #00ffcc;
    border-radius: 0 3px 3px 0;
    opacity: 0;
    transform: scaleY(0.4);
    transition: opacity 0.18s, transform 0.18s;
  }

  .eq-activity-btn.active .eq-activity-indicator {
    opacity: 1;
    transform: scaleY(1);
  }

  .eq-activity-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 22px;
    height: 22px;
  }

  /* ===== CORPO DA SIDEBAR (PAINEL DIREITO) ===== */
  .eq-sidebar-body {
    flex: 1;
    display: flex;
    flex-direction: column;
    background: #1c1c1c;
    overflow: hidden;
    min-width: 0;
  }

  /* Cabe\xE7alho */
  .eq-header {
    background: #1f1f1f;
    border-bottom: 1px solid #2d2d30;
    height: 48px;
    min-height: 48px;
    padding: 0 16px;
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
    color: #00ffcc;
    display: flex;
    align-items: center;
  }

  .eq-brand-name {
    font-size: 13px;
    font-weight: 900;
    color: #ffffff;
    letter-spacing: 0.06em;
  }

  .eq-brand-badge {
    background: rgba(0, 255, 204, 0.12);
    border: 1px solid rgba(0, 255, 204, 0.6);
    color: #00ffcc;
    font-size: 10px;
    font-weight: 800;
    padding: 1px 6px;
    border-radius: 4px;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .eq-header-tools {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .eq-icon-btn {
    width: 30px;
    height: 30px;
    background: transparent;
    border: 1px solid transparent;
    border-radius: 4px;
    color: #858585;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background 0.15s, color 0.15s, border-color 0.15s;
  }

  .eq-icon-btn:hover {
    background: #2a2d2e;
    color: #ffffff;
    border-color: #3c3c3c;
  }

  /* \xC1rea Scroll\xE1vel das Visualiza\xE7\xF5es */
  .eq-views-wrapper {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 14px;
    background: #1c1c1c;
  }

  .eq-views-wrapper::-webkit-scrollbar {
    width: 6px;
  }
  .eq-views-wrapper::-webkit-scrollbar-track {
    background: #141414;
  }
  .eq-views-wrapper::-webkit-scrollbar-thumb {
    background: #2d2d30;
    border-radius: 3px;
  }
  .eq-views-wrapper::-webkit-scrollbar-thumb:hover {
    background: #444444;
  }

  .eq-view-pane {
    display: flex;
    flex-direction: column;
    gap: 14px;
    animation: eq-view-fade 0.22s cubic-bezier(0.16, 1, 0.3, 1);
  }

  @keyframes eq-view-fade {
    0% { opacity: 0; transform: translateY(6px); }
    100% { opacity: 1; transform: translateY(0); }
  }

  /* ===== SE\xC7\xD5ES E COMPONENTES ===== */
  .eq-section-title {
    font-size: 11px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: #858585;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .eq-field-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  /* ===== WRAPPER DO INPUT DA CHAVE COM MENU DE 3 PONTINHOS (\u22EE) ===== */
  .eq-key-input-container {
    position: relative;
    width: 100%;
  }

  .eq-input-wrap {
    display: flex;
    align-items: center;
    background: #141414;
    border: 1px solid #333333;
    border-radius: 6px;
    overflow: visible;
    transition: border-color 0.18s, box-shadow 0.18s;
  }

  .eq-input-wrap:focus-within {
    border-color: #00ffcc;
    box-shadow: 0 0 0 2px rgba(0, 255, 204, 0.15);
  }

  .eq-input-prefix-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 10px;
    color: #666666;
  }

  .eq-input {
    flex: 1;
    height: 36px;
    background: transparent;
    border: none;
    color: #ffffff;
    padding: 0 10px;
    font-family: 'JetBrains Mono', Consolas, monospace;
    font-size: 12px;
    outline: none;
    user-select: text !important;
    -webkit-user-select: text !important;
  }

  .eq-input-wrap .eq-icon-btn {
    border-radius: 0;
    height: 34px;
    width: 34px;
    margin: 1px 1px 1px 0;
  }

  /* ===== CONTEXT MENU SUSPENSO DIN\xC2MICO (POPUP 3 PONTINHOS) ===== */
  .eq-context-menu {
    position: absolute;
    right: 0;
    top: calc(100% + 6px);
    width: 260px;
    background: #222224;
    border: 1px solid #3c3c3c;
    border-radius: 8px;
    padding: 6px;
    box-shadow: 0 14px 36px rgba(0, 0, 0, 0.75), 0 0 1px rgba(255, 255, 255, 0.2);
    z-index: 100;
    display: flex;
    flex-direction: column;
    gap: 3px;
    animation: eq-menu-pop 0.18s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .eq-context-menu[hidden] {
    display: none !important;
  }

  @keyframes eq-menu-pop {
    0% { opacity: 0; transform: scale(0.92) translateY(-6px); }
    100% { opacity: 1; transform: scale(1) translateY(0); }
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
    border-radius: 5px;
    color: #cccccc;
    font-family: inherit;
    font-size: 12px;
    font-weight: 600;
    text-align: left;
    cursor: pointer;
    transition: background 0.12s, color 0.12s;
  }

  .eq-context-item:hover {
    background: #007acc;
    color: #ffffff;
  }

  .eq-context-item.danger {
    color: #ff6b6b;
  }

  .eq-context-item.danger:hover {
    background: #662222;
    color: #ffffff;
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

  .eq-item-badge {
    font-size: 9px;
    background: rgba(0, 255, 204, 0.2);
    color: #00ffcc;
    padding: 1px 5px;
    border-radius: 3px;
    font-weight: 800;
    text-transform: uppercase;
  }

  .eq-context-divider {
    height: 1px;
    background: #333336;
    margin: 4px 0;
  }

  /* Selects & Inputs */
  .eq-select {
    width: 100%;
    height: 36px;
    background: #141414;
    border: 1px solid #333333;
    border-radius: 6px;
    color: #ffffff;
    padding: 0 10px;
    font-family: inherit;
    font-size: 12px;
    font-weight: 600;
    outline: none;
    cursor: pointer;
    transition: border-color 0.18s;
  }

  .eq-select:focus {
    border-color: #00ffcc;
  }

  .eq-grid-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }

  .eq-checkbox-label {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    font-weight: 600;
    color: #cccccc;
    cursor: pointer;
    user-select: none;
    transition: color 0.15s;
  }

  .eq-checkbox-label:hover {
    color: #ffffff;
  }

  .eq-checkbox-label input[type="checkbox"] {
    appearance: none;
    width: 16px;
    height: 16px;
    background: #141414;
    border: 1px solid #3c3c3c;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    transition: all 0.15s;
  }

  .eq-checkbox-label input[type="checkbox"]:checked {
    background: #00ffcc;
    border-color: #00ffcc;
  }

  .eq-checkbox-label input[type="checkbox"]:checked::after {
    content: '';
    width: 4px;
    height: 8px;
    border: solid #000000;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
    margin-bottom: 2px;
  }

  /* ===== CARD DE STATUS E CRON\xD4METRO DE RACIOC\xCDNIO AO VIVO ===== */
  .eq-status-card {
    background: #161616;
    border: 1px solid #282828;
    border-radius: 8px;
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
  }

  .eq-status-card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .eq-ai-indicator {
    display: flex;
    align-items: center;
    gap: 7px;
    font-size: 11px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .eq-dot-pulse {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #00ff55;
    box-shadow: 0 0 6px #00ff55;
    transition: background 0.2s, box-shadow 0.2s;
  }

  .eq-dot-pulse.busy {
    background: #00ffcc;
    box-shadow: 0 0 10px #00ffcc;
    animation: eq-pulse 1s infinite alternate;
  }

  .eq-dot-pulse.error {
    background: #ff4757;
    box-shadow: 0 0 10px #ff4757;
    animation: none;
  }

  @keyframes eq-pulse {
    0% { transform: scale(0.8); opacity: 0.7; }
    100% { transform: scale(1.35); opacity: 1; }
  }

  .eq-stopwatch {
    font-family: 'JetBrains Mono', Consolas, monospace;
    font-size: 11px;
    font-weight: 700;
    color: #00ffcc;
    background: #0f0f0f;
    padding: 3px 8px;
    border-radius: 5px;
    border: 1px solid #282828;
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .eq-status-text {
    font-size: 12px;
    color: #bbbbbb;
    line-height: 1.45;
    word-break: break-word;
  }

  /* ===== BOT\xD5ES DE A\xC7\xC3O COM MICRO-ANIMA\xC7\xD5ES ===== */
  .eq-btn-primary {
    height: 42px;
    background: #00ffcc;
    border: 1px solid #00ffcc;
    border-radius: 6px;
    color: #000000;
    font-family: inherit;
    font-size: 13px;
    font-weight: 900;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    box-shadow: 0 4px 14px rgba(0, 255, 204, 0.25);
    transition: all 0.18s cubic-bezier(0.16, 1, 0.3, 1);
    user-select: none;
  }

  .eq-btn-primary:hover {
    background: #33ffdb;
    box-shadow: 0 6px 20px rgba(0, 255, 204, 0.4);
    transform: translateY(-1px);
  }

  .eq-btn-primary:active {
    transform: translateY(1px);
  }

  .eq-btn-primary.danger {
    background: #ff4757;
    border-color: #ff4757;
    color: #ffffff;
    box-shadow: 0 4px 14px rgba(255, 71, 87, 0.3);
  }

  .eq-btn-primary.danger:hover {
    background: #ff6b81;
    box-shadow: 0 6px 20px rgba(255, 71, 87, 0.45);
  }

  .eq-btn-primary:disabled {
    background: #252528;
    border-color: #333333;
    color: #666666;
    cursor: not-allowed;
    box-shadow: none;
    transform: none;
  }

  .eq-btn-secondary {
    height: 38px;
    background: #181818;
    border: 1px solid #333333;
    border-radius: 6px;
    color: #00ffcc;
    font-family: inherit;
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: all 0.18s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .eq-btn-secondary:hover {
    background: #222224;
    border-color: #00ffcc;
    color: #ffffff;
  }

  .eq-btn-secondary:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    border-color: #282828;
    color: #555555;
  }

  /* ===== TERMINAL CONSOLE ESTILO VS CODE ===== */
  .eq-terminal {
    width: 100%;
    background: #0f0f10;
    border: 1px solid #282828;
    border-radius: 6px;
    padding: 10px;
    font-family: 'JetBrains Mono', Consolas, monospace;
    font-size: 11px;
    color: #cccccc;
    height: 180px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 4px;
    text-align: left;
    user-select: text !important;
    -webkit-user-select: text !important;
    cursor: text;
  }

  .eq-terminal::-webkit-scrollbar {
    width: 6px;
  }
  .eq-terminal::-webkit-scrollbar-thumb {
    background: #222225;
    border-radius: 3px;
  }

  .text-blue { color: #5bc0eb; }
  .text-yellow { color: #fde74c; }
  .text-red { color: #ff5555; }
  .text-green { color: #00ff88; }
  .text-muted { color: #666666; }

  /* ===== INSPETOR DE PROMPT & IA ===== */
  .eq-inspector-meta {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
  }

  .eq-meta-box {
    background: #141414;
    border: 1px solid #282828;
    border-radius: 6px;
    padding: 8px;
    text-align: center;
  }

  .eq-meta-title {
    font-size: 9px;
    color: #888888;
    text-transform: uppercase;
    font-weight: 800;
  }

  .eq-meta-val {
    font-family: 'JetBrains Mono', Consolas, monospace;
    font-size: 12px;
    font-weight: 800;
    color: #00ffcc;
    margin-top: 3px;
  }

  .eq-code-block {
    background: #0f0f10;
    border: 1px solid #282828;
    border-radius: 6px;
    padding: 10px;
    font-family: 'JetBrains Mono', Consolas, monospace;
    font-size: 11px;
    color: #dddddd;
    max-height: 200px;
    overflow-y: auto;
    white-space: pre-wrap;
    word-break: break-word;
    user-select: text;
  }

  .eq-rationale-card {
    background: #141414;
    border-left: 3px solid #00ffcc;
    border-radius: 0 6px 6px 0;
    padding: 10px;
    font-size: 12px;
    color: #dddddd;
    line-height: 1.45;
  }

  .eq-action-list {
    display: flex;
    flex-direction: column;
    gap: 4px;
    background: #0f0f10;
    border: 1px solid #282828;
    border-radius: 6px;
    padding: 8px;
    max-height: 150px;
    overflow-y: auto;
  }

  .eq-action-item {
    font-family: 'JetBrains Mono', Consolas, monospace;
    font-size: 11px;
    color: #cccccc;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .eq-action-badge {
    background: #1f1f22;
    border: 1px solid #333336;
    color: #00ffcc;
    font-size: 9px;
    font-weight: 800;
    padding: 1px 4px;
    border-radius: 3px;
  }

  .eq-footer-note {
    font-size: 10px;
    font-weight: 700;
    color: #555555;
    text-align: center;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    padding-top: 6px;
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
    background: rgba(18, 18, 22, 0.95);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(0, 255, 204, 0.35);
    border-radius: 14px;
    box-shadow: 0 16px 48px rgba(0, 0, 0, 0.75), 0 0 24px rgba(0, 255, 204, 0.15);
    color: #e2e2e2;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    font-family: inherit;
    font-size: 12px;
    transition: width 0.2s, height 0.2s, border-radius 0.2s, box-shadow 0.2s;
  }

  .eq-floating-hud.minimized {
    width: auto;
    border-radius: 24px;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.85), 0 0 16px rgba(0, 255, 204, 0.25);
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
    padding: 7px 14px;
    cursor: pointer;
    font-weight: 800;
    font-size: 11.5px;
    color: #ffffff;
    user-select: none;
    background: transparent;
  }

  .eq-floating-hud.minimized .eq-fah-pill {
    display: flex;
  }

  .eq-fah-pill-icon {
    color: #00ffcc;
    display: flex;
    align-items: center;
  }

  .eq-fah-pill-badge {
    background: rgba(0, 255, 204, 0.2);
    border: 1px solid rgba(0, 255, 204, 0.4);
    color: #00ffcc;
    font-size: 10px;
    padding: 1px 6px;
    border-radius: 10px;
  }

  .eq-fah-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 9px 12px;
    background: rgba(26, 26, 30, 0.92);
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    cursor: grab;
    user-select: none;
  }

  .eq-fah-header:active {
    cursor: grabbing;
  }

  .eq-fah-title {
    display: flex;
    align-items: center;
    gap: 7px;
    font-weight: 800;
    font-size: 12px;
    color: #00ffcc;
    letter-spacing: 0.03em;
  }

  .eq-fah-actions {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .eq-fah-btn {
    background: transparent;
    border: 1px solid transparent;
    color: #888888;
    border-radius: 4px;
    padding: 3px 6px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.15s;
  }

  .eq-fah-btn:hover {
    background: rgba(255, 255, 255, 0.1);
    color: #ffffff;
    border-color: rgba(255, 255, 255, 0.2);
  }

  .eq-fah-body {
    padding: 12px;
    max-height: 420px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .eq-fah-body::-webkit-scrollbar {
    width: 5px;
  }

  .eq-fah-body::-webkit-scrollbar-thumb {
    background: #333333;
    border-radius: 4px;
  }

  .eq-fah-meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 10.5px;
    padding-bottom: 6px;
    border-bottom: 1px dashed rgba(255, 255, 255, 0.1);
    color: #888888;
  }

  .eq-fah-meta-badge {
    background: rgba(0, 255, 204, 0.12);
    border: 1px solid rgba(0, 255, 204, 0.3);
    color: #00ffcc;
    font-weight: 800;
    padding: 1px 6px;
    border-radius: 4px;
    text-transform: uppercase;
  }

  .eq-fah-group {
    background: rgba(26, 26, 32, 0.7);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 8px;
    padding: 8px 10px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .eq-fah-group-title {
    font-weight: 800;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    display: flex;
    align-items: center;
    gap: 6px;
    color: #00ffcc;
  }

  .eq-fah-group-items {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .eq-fah-item {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 8px;
    font-size: 11.5px;
    line-height: 1.4;
    color: #dddddd;
    background: rgba(0, 0, 0, 0.25);
    border: 1px solid rgba(255, 255, 255, 0.04);
    border-radius: 6px;
    padding: 6px 8px;
  }

  .eq-fah-item-text {
    flex: 1;
    word-break: break-word;
  }

  .eq-fah-copy-inline {
    background: rgba(0, 255, 204, 0.1);
    border: 1px solid rgba(0, 255, 204, 0.25);
    color: #00ffcc;
    border-radius: 4px;
    font-size: 9.5px;
    font-weight: 800;
    padding: 2px 6px;
    cursor: pointer;
    flex-shrink: 0;
    transition: all 0.15s;
    user-select: none;
  }

  .eq-fah-copy-inline:hover {
    background: #00ffcc;
    color: #000000;
  }

  .eq-fah-rationale {
    background: rgba(0, 255, 204, 0.04);
    border: 1px dashed rgba(0, 255, 204, 0.2);
    border-radius: 6px;
    padding: 8px 10px;
    font-size: 11px;
    color: #a0a0a0;
    line-height: 1.45;
  }

  .eq-fah-rationale strong {
    color: #00ffcc;
  }

  .eq-fah-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding: 8px 12px;
    background: rgba(22, 22, 26, 0.95);
    border-top: 1px solid rgba(255, 255, 255, 0.07);
    font-size: 10px;
    color: #777777;
  }

  .eq-fah-footer-hint {
    display: flex;
    align-items: center;
    gap: 5px;
    line-height: 1.25;
  }

  .eq-fah-copy-all {
    background: #00ffcc;
    color: #000000;
    border: none;
    border-radius: 4px;
    font-size: 10px;
    font-weight: 800;
    padding: 4px 9px;
    cursor: pointer;
    transition: background 0.15s;
    white-space: nowrap;
    user-select: none;
  }

  .eq-fah-copy-all:hover {
    background: #33ffdd;
  }

  /* ===== BARRA DE CARREGAMENTO DIN\xC2MICA ===== */
  .eq-progress-container {
    padding: 6px 14px;
    background: #111113;
    border-bottom: 1px solid #222226;
    display: flex;
    flex-direction: column;
    gap: 4px;
    transition: all 0.2s ease;
  }
  .eq-progress-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 11px;
    font-family: 'JetBrains Mono', monospace;
    color: #00ffcc;
  }
  .eq-progress-track {
    width: 100%;
    height: 4px;
    background: #1e1e22;
    border-radius: 2px;
    overflow: hidden;
  }
  .eq-progress-bar {
    height: 100%;
    background: linear-gradient(90deg, #00b4d8, #00ffcc);
    box-shadow: 0 0 10px rgba(0, 255, 204, 0.7);
    border-radius: 2px;
    transition: width 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  }

  /* ===== EXPLORADOR DE CONTEXTO & RAG (ESTILO VS CODE) ===== */
  .eq-tree-container {
    display: flex;
    flex-direction: column;
    gap: 6px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 11.5px;
    color: #cccccc;
  }
  .eq-tree-node {
    display: flex;
    flex-direction: column;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid #25252a;
    border-radius: 6px;
    overflow: hidden;
  }
  .eq-tree-header {
    display: flex;
    align-items: center;
    gap: 7px;
    padding: 7px 10px;
    background: rgba(255, 255, 255, 0.04);
    cursor: pointer;
    user-select: none;
    font-weight: 700;
    color: #e0e0e0;
    transition: background 0.15s, color 0.15s;
  }
  .eq-tree-header:hover {
    background: rgba(0, 255, 204, 0.08);
    color: #00ffcc;
  }
  .eq-tree-arrow {
    font-size: 9px;
    color: #888888;
    transition: transform 0.2s;
  }
  .eq-tree-content {
    padding: 8px 10px;
    display: flex;
    flex-direction: column;
    gap: 6px;
    font-size: 11px;
    color: #aaaaaa;
    border-top: 1px solid #1e1e24;
    background: #0d0d10;
  }
  .eq-tree-leaf {
    display: flex;
    align-items: flex-start;
    gap: 6px;
    padding: 3px 0;
    border-bottom: 1px dashed rgba(255, 255, 255, 0.04);
  }
  .eq-tree-leaf:last-child {
    border-bottom: none;
  }
  .eq-tree-badge {
    font-size: 9.5px;
    padding: 1px 5px;
    border-radius: 3px;
    background: rgba(0, 255, 204, 0.12);
    color: #00ffcc;
    font-weight: 700;
    border: 1px solid rgba(0, 255, 204, 0.25);
    white-space: nowrap;
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
`;var ct=[{value:"",label:"Detec\xE7\xE3o Autom\xE1tica"},{value:"escolha_unica",label:"M\xFAltipla Escolha (\xDAnica)"},{value:"escolha_multipla",label:"M\xFAltipla Escolha (V\xE1rias)"},{value:"categorizacao",label:"Categoriza\xE7\xE3o / Grupos"},{value:"arrastar_soltar",label:"Arrastar e Soltar (Drag & Drop)"},{value:"ordenacao",label:"Ordena\xE7\xE3o / Sequ\xEAncia"},{value:"verdadeiro_falso",label:"Verdadeiro / Falso"},{value:"texto_livre",label:"Texto Livre / Dissertativa"},{value:"preenchimento",label:"Preenchimento de Lacunas"}],dt=[{value:"smart",label:"Inteligente (Auto-H\xEDbrido)"},{value:"command",label:"Apenas Comando (Seguro)"},{value:"javascript",label:"Apenas JS Nativo (Avan\xE7ado)"}],re=class{host;shadow;callbacks;autopilot;floatingAnswers;initialSettings;isCollapsed=!1;activeTab="autopilot";stopwatchInterval=null;stopwatchStartTime=0;latestPlan=null;latestContext=null;latestPromptText="";progressContainer;progressBar;progressLabel;progressVal;contextTreeContainer;launcherBtn;launcherDot;dockToggleBtn;sidebarEl;apToggleBtn;apConsole;dotPulseAp;statusTextAp;stopwatchAp;dotPulseAdv;statusTextAdv;stopwatchAdv;inspModel;inspLatency;inspTokens;inspPrompt;inspRationale;inspActions;copyPromptBtn;apiKeyInput;keyContextMenu;keyMoreBtn;modelSelect;modeSelect;engineSelect;dryRunCheckbox;autoApplyCheckbox;autoAdvanceCheckbox;hostDarkModeCheckbox;useVisionCheckbox;analyzeBtn;applyBtn;resultContainer;constructor(e,t){this.initialSettings=e,this.callbacks=t,this.autopilot=new ie({onStatusChange:(i,r,a)=>{this.logToConsole(r,a),i==="analyzing"?this.setBusy(!0,"Autopilot: IA analisando..."):(i==="advancing"||i==="waiting")&&this.setBusy(!1)},onRequestAnalysis:async i=>{try{return await this.callbacks.onAnalyze(i)||null}catch{return null}},isManualModeActive:()=>this.floatingAnswers?.isOpen()??!1,onPageAdvance:()=>{this.floatingAnswers?.hide()}}),this.host=document.createElement("div"),this.host.id="easyquiz-shadow-root",this.host.style.position="fixed",this.host.style.top="0",this.host.style.left="0",this.host.style.width="100vw",this.host.style.height="100vh",this.host.style.zIndex="2147483647",this.host.style.pointerEvents="none",this.shadow=this.host.attachShadow({mode:"open"}),this.shadow.innerHTML=`
      <style>${Fe}</style>

      <!-- Bot\xE3o Flutuante Inferior Renovado (C\xE1psula com Status ao Vivo) -->
      <button class="eq-launcher" type="button" title="Abrir / Recolher EasyQuiz (Alt+Q)">
        <span class="eq-launcher-icon">${g.logo}</span>
        <span>EasyQuiz</span>
        <span class="eq-launcher-dot" id="eq-launcher-dot"></span>
      </button>

      <!-- Sidebar Fixa Lateral Direita Estilo VS Code -->
      <aside class="eq-sidebar" aria-label="EasyQuiz Sidebar">
        <!-- Aba Retr\xE1til na Borda Esquerda -->
        <button class="eq-dock-toggle" id="eq-dock-toggle" type="button" title="Recolher / Expandir Painel (Alt+Q)">
          <span class="eq-dock-toggle-icon">${g.chevronRight}</span>
          <span class="eq-dock-toggle-label">EQ</span>
        </button>

        <!-- Activity Bar Vertical na Esquerda (Estilo VS Code - Apenas \xCDcones) -->
        <nav class="eq-activity-bar" role="tablist" aria-label="Atalhos">
          <div class="eq-activity-top">
            <button class="eq-activity-btn active" id="eq-tab-autopilot" role="tab" title="Autopilot (Automa\xE7\xE3o Cont\xEDnua)">
              <span class="eq-activity-indicator"></span>
              <span class="eq-activity-icon">${g.rocket}</span>
            </button>

            <button class="eq-activity-btn" id="eq-tab-context" role="tab" title="Contexto (Hierarquia e RAG em Tempo Real)">
              <span class="eq-activity-indicator"></span>
              <span class="eq-activity-icon">${g.folderTree}</span>
            </button>

            <button class="eq-activity-btn" id="eq-tab-advanced" role="tab" title="Avan\xE7ado (Modo Manual)">
              <span class="eq-activity-indicator"></span>
              <span class="eq-activity-icon">${g.code}</span>
            </button>

            <button class="eq-activity-btn" id="eq-tab-inspector" role="tab" title="Inspetor de Prompt e IA">
              <span class="eq-activity-indicator"></span>
              <span class="eq-activity-icon">${g.inspector}</span>
            </button>
          </div>

          <div class="eq-activity-bottom">
            <button class="eq-activity-btn" id="eq-tab-settings" role="tab" title="Configura\xE7\xF5es & Chaves">
              <span class="eq-activity-indicator"></span>
              <span class="eq-activity-icon">${g.settings}</span>
            </button>
          </div>
        </nav>

        <!-- Corpo Principal da Sidebar -->
        <main class="eq-sidebar-body">
          <!-- Cabe\xE7alho VS Code -->
          <header class="eq-header">
            <div class="eq-brand">
              <span class="eq-brand-icon">${g.logo}</span>
              <span class="eq-brand-name">EasyQuiz</span>
              <span class="eq-brand-badge">2.0 SUPREME</span>
            </div>
            <div class="eq-header-tools">
              <button class="eq-icon-btn" id="eq-min-btn" type="button" title="Minimizar (Alt+Q)">${g.chevronRight}</button>
              <button class="eq-icon-btn" id="eq-close-btn" type="button" title="Fechar">${g.close}</button>
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
            <!-- TAB: CONTEXTO (EXPLORADOR VS CODE) -->
            <div class="eq-view-pane" id="eq-view-context" style="display: none; flex-direction: column; gap: 8px;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div class="eq-section-title" style="margin: 0;">
                  <span>Explorador de Contexto & RAG</span>
                </div>
                <button class="eq-icon-btn" id="eq-refresh-context-btn" type="button" title="Atualizar Varredura em Tempo Real" style="width: 28px; height: 28px;">
                  ${g.refresh}
                </button>
              </div>

              <div class="eq-tree-container" id="eq-tree-container">
                <div class="text-muted" style="padding: 8px 0;">Aguardando primeira leitura de tela ou an\xE1lise do exerc\xEDcio...</div>
              </div>

              <div class="eq-footer-note">Hierarquia do DOM e Mem\xF3ria RAG \u2022 0 Tokens Gastos</div>
            </div>

            <!-- TAB 1: AUTOPILOT -->
            <div class="eq-view-pane" id="eq-view-autopilot">
              <div style="display: flex; gap: 8px; width: 100%; align-items: center;">
                <button class="eq-btn-primary" id="eq-ap-toggle-btn" type="button" style="flex: 1;">
                  ${g.play} INICIAR AUTOPILOT
                </button>
                <button class="eq-icon-btn" id="eq-ap-clear-memory" type="button" title="Limpar Mem\xF3ria Contextual (RAG)" style="width: 42px; height: 42px; background: #141414; border: 1px solid #282828; border-radius: 6px; color: #aaaaaa;">
                  ${g.eraser}
                </button>
              </div>

              <!-- Status & Stopwatch Card -->
              <div class="eq-status-card">
                <div class="eq-status-card-header">
                  <div class="eq-ai-indicator">
                    <span class="eq-dot-pulse" id="eq-dot-ap"></span>
                    <span>Status da IA</span>
                  </div>
                  <div class="eq-stopwatch" id="eq-stopwatch-ap">
                    ${g.clock} <span>0.00s</span>
                  </div>
                </div>
                <div class="eq-status-text" id="eq-status-text-ap">
                  Pronto para iniciar. O Autopilot responder\xE1 e avan\xE7ar\xE1 as quest\xF5es de forma autom\xE1tica.
                </div>
              </div>

              <!-- Console Terminal -->
              <div class="eq-section-title">
                <span>Terminal de Opera\xE7\xF5es</span>
                <div style="display: flex; align-items: center; gap: 6px;">
                  <button class="eq-icon-btn" id="eq-copy-console-btn" type="button" title="Copiar Todos os Logs do Terminal">
                    ${g.copy}
                  </button>
                  <span style="font-size: 10px; color: #666;">Live Event Stream</span>
                </div>
              </div>
              <div class="eq-terminal" id="eq-ap-console">
                <div class="text-blue">> [SYS] EasyQuiz 2.0 Supreme inicializado.</div>
                <div class="text-muted">> [SYS] Conex\xE3o com a API do Google Gemini pronta.</div>
              </div>

              <div class="eq-footer-note">H\xEDbrido 4.0 \u2022 RAG + AST + Vision (Opt-in)</div>
            </div>

            <!-- TAB 2: AVAN\xC7ADO -->
            <div class="eq-view-pane" id="eq-view-advanced" style="display: none;">
              <button class="eq-btn-primary" id="eq-analyze-btn" type="button">
                ${g.analyze} Analisar & Resolver Quest\xE3o
              </button>

              <!-- Status & Stopwatch Adv -->
              <div class="eq-status-card">
                <div class="eq-status-card-header">
                  <div class="eq-ai-indicator">
                    <span class="eq-dot-pulse" id="eq-dot-adv"></span>
                    <span>Processamento Manual</span>
                  </div>
                  <div class="eq-stopwatch" id="eq-stopwatch-adv">
                    ${g.clock} <span>0.00s</span>
                  </div>
                </div>
                <div class="eq-status-text" id="eq-status-text-adv">
                  Clique em Analisar para inspecionar a quest\xE3o atual na tela.
                </div>
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

              <div class="eq-grid-2">
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

              <!-- Painel de Resultados Manuais -->
              <div id="eq-result" style="display: none; flex-direction: column; gap: 10px;">
                <div class="eq-section-title">Plano Gerado</div>
                <div style="display: flex; gap: 6px; flex-wrap: wrap;" id="eq-badges"></div>

                <div class="eq-rationale-card" id="eq-rationale-text"></div>

                <div class="eq-action-list" id="eq-actions-list"></div>

                <button class="eq-btn-secondary" id="eq-apply-btn" type="button">
                  ${g.apply} Injetar Resposta na P\xE1gina
                </button>
                <button class="eq-btn-secondary" id="eq-open-hud-btn" type="button" style="background: rgba(0, 255, 204, 0.08); border-color: rgba(0, 255, 204, 0.3); color: #00ffcc;">
                  ${g.list} Ver Gabarito Flutuante (Arrast\xE1vel)
                </button>
              </div>

              <div class="eq-footer-note">Modo Manual \u2022 Controle Total dos Elementos</div>
            </div>

            <!-- TAB 3: INSPETOR IA -->
            <div class="eq-view-pane" id="eq-view-inspector" style="display: none;">
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
                  <span>Prompt Enviado para a IA</span>
                  <button class="eq-btn-secondary" id="eq-copy-prompt-btn" type="button" style="height: 26px; padding: 0 8px; font-size: 11px;">
                    ${g.copy} Copiar
                  </button>
                </div>
                <div class="eq-code-block" id="eq-insp-prompt">Nenhuma consulta realizada ainda. Execute uma an\xE1lise no Autopilot ou Avan\xE7ado para inspecionar os dados enviados.</div>
              </div>

              <div class="eq-field-group">
                <div class="eq-section-title">Racioc\xEDnio Detalhado</div>
                <div class="eq-rationale-card" id="eq-insp-rationale">Aguardando resposta da IA...</div>
              </div>

              <div class="eq-field-group">
                <div class="eq-section-title">Comandos Gerados</div>
                <div class="eq-action-list" id="eq-insp-actions">
                  <div class="text-muted" style="padding: 6px;">Nenhuma a\xE7\xE3o no momento.</div>
                </div>
              </div>

              <div class="eq-footer-note">Inspetor em Tempo Real \u2022 100% Transparente</div>
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
                    <span class="eq-input-prefix-icon">${g.key}</span>
                    <input id="eq-api-key" class="eq-input" type="password" placeholder="Cole sua chave AIzaSy..." autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" />
                    <button class="eq-icon-btn" id="eq-key-save" type="button" title="Salvar Chave">${g.save}</button>
                    <button class="eq-icon-btn" id="eq-key-more-btn" type="button" title="Mais Op\xE7\xF5es da Chave">${g.moreVertical}</button>
                  </div>

                  <!-- Context Menu Suspenso Din\xE2mico -->
                  <div class="eq-context-menu" id="eq-key-context-menu" hidden>
                    <button class="eq-context-item" id="eq-menu-prompt" type="button">
                      <span class="eq-item-icon">${g.edit}</span>
                      <span class="eq-item-text">Inserir via Janela Nativa</span>
                      <span class="eq-item-badge">Bypass</span>
                    </button>
                    <button class="eq-context-item" id="eq-menu-paste" type="button">
                      <span class="eq-item-icon">${g.paste}</span>
                      <span class="eq-item-text">Colar da \xC1rea de Transfer\xEAncia</span>
                    </button>
                    <button class="eq-context-item" id="eq-menu-toggle-vis" type="button">
                      <span class="eq-item-icon" id="eq-menu-vis-icon">${g.eye}</span>
                      <span class="eq-item-text" id="eq-menu-vis-text">Mostrar Chave</span>
                    </button>
                    <button class="eq-context-item" id="eq-menu-clear" type="button">
                      <span class="eq-item-icon">${g.eraser}</span>
                      <span class="eq-item-text">Limpar Campo</span>
                    </button>
                    <div class="eq-context-divider"></div>
                    <button class="eq-context-item" id="eq-menu-test" type="button">
                      <span class="eq-item-icon">${g.key}</span>
                      <span class="eq-item-text">Testar Conex\xE3o no Google</span>
                    </button>
                    <button class="eq-context-item danger" id="eq-menu-reset" type="button">
                      <span class="eq-item-icon">${g.trash}</span>
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

              <!-- Prefer\xEAncias do Sistema -->
              <div class="eq-field-group" style="gap: 8px; margin-top: 4px;">
                <label class="eq-checkbox-label">
                  <input id="eq-use-vision" type="checkbox" />
                  <span>Vis\xE3o Computacional (Imagens)</span>
                </label>
                <div style="font-size: 11px; color: #888888; margin-left: 24px; line-height: 1.3;">
                  Desativado por padr\xE3o: O EasyQuiz analisa o DOM estruturado diretamente, respondendo ultrarr\xE1pido sem gastar cota com capturas de tela.
                </div>

                <label class="eq-checkbox-label" style="margin-top: 6px;">
                  <input id="eq-host-dark" type="checkbox" />
                  <span style="color: #00ffcc;">Habilitar Smart Dark Mode no Site</span>
                </label>
              </div>

              <!-- Zona de Redefini\xE7\xE3o -->
              <div class="eq-field-group" style="margin-top: 14px; padding-top: 12px; border-top: 1px solid #282828;">
                <div class="eq-section-title" style="color: #ff5555;">Zona de Redefini\xE7\xE3o</div>
                <button class="eq-btn-secondary" id="eq-reset-all-btn" type="button" style="border-color: #662222; color: #ff8888;">
                  ${g.trash} Resetar Todos os Dados e Mem\xF3ria
                </button>
              </div>

              <div class="eq-footer-note">Configura\xE7\xF5es salvas localmente no navegador</div>
            </div>
          </div>
        </main>
      </aside>
    `,this.launcherBtn=this.shadow.querySelector(".eq-launcher"),this.launcherDot=this.shadow.querySelector("#eq-launcher-dot"),this.dockToggleBtn=this.shadow.querySelector("#eq-dock-toggle"),this.sidebarEl=this.shadow.querySelector(".eq-sidebar"),this.apToggleBtn=this.shadow.querySelector("#eq-ap-toggle-btn"),this.apConsole=this.shadow.querySelector("#eq-ap-console"),this.progressContainer=this.shadow.querySelector("#eq-progress-container"),this.progressBar=this.shadow.querySelector("#eq-progress-bar"),this.progressLabel=this.shadow.querySelector("#eq-progress-label"),this.progressVal=this.shadow.querySelector("#eq-progress-val"),this.contextTreeContainer=this.shadow.querySelector("#eq-tree-container"),this.dotPulseAp=this.shadow.querySelector("#eq-dot-ap"),this.statusTextAp=this.shadow.querySelector("#eq-status-text-ap"),this.stopwatchAp=this.shadow.querySelector("#eq-stopwatch-ap span"),this.dotPulseAdv=this.shadow.querySelector("#eq-dot-adv"),this.statusTextAdv=this.shadow.querySelector("#eq-status-text-adv"),this.stopwatchAdv=this.shadow.querySelector("#eq-stopwatch-adv span"),this.inspModel=this.shadow.querySelector("#eq-insp-model"),this.inspLatency=this.shadow.querySelector("#eq-insp-latency"),this.inspTokens=this.shadow.querySelector("#eq-insp-tokens"),this.inspPrompt=this.shadow.querySelector("#eq-insp-prompt"),this.inspRationale=this.shadow.querySelector("#eq-insp-rationale"),this.inspActions=this.shadow.querySelector("#eq-insp-actions"),this.copyPromptBtn=this.shadow.querySelector("#eq-copy-prompt-btn"),this.apiKeyInput=this.shadow.querySelector("#eq-api-key"),this.keyContextMenu=this.shadow.querySelector("#eq-key-context-menu"),this.keyMoreBtn=this.shadow.querySelector("#eq-key-more-btn"),this.modelSelect=this.shadow.querySelector("#eq-model-select"),this.modeSelect=this.shadow.querySelector("#eq-mode-select"),this.engineSelect=this.shadow.querySelector("#eq-engine-select"),this.dryRunCheckbox=this.shadow.querySelector("#eq-dry-run"),this.autoApplyCheckbox=this.shadow.querySelector("#eq-auto-apply"),this.autoAdvanceCheckbox=this.shadow.querySelector("#eq-auto-advance"),this.hostDarkModeCheckbox=this.shadow.querySelector("#eq-host-dark"),this.useVisionCheckbox=this.shadow.querySelector("#eq-use-vision"),this.analyzeBtn=this.shadow.querySelector("#eq-analyze-btn"),this.applyBtn=this.shadow.querySelector("#eq-apply-btn"),this.resultContainer=this.shadow.querySelector("#eq-result"),this.floatingAnswers=new se(this.shadow,()=>{this.callbacks.onAnalyze(1)});let o=this.shadow.querySelector("#eq-open-hud-btn");o&&o.addEventListener("click",()=>{this.latestPlan&&this.floatingAnswers.show(this.latestPlan)}),$.forEach(i=>this.modelSelect.add(new Option(i.name,i.id,!1,i.id===e.model))),ct.forEach(i=>this.modeSelect.add(new Option(i.label,i.value,!1,i.value===e.modeHint))),dt.forEach(i=>this.engineSelect.add(new Option(i.label,i.value,!1,i.value===e.engine))),this.apiKeyInput.value=e.apiKey,this.dryRunCheckbox.checked=e.dryRun,this.autoApplyCheckbox.checked=e.autoApply,this.autoAdvanceCheckbox.checked=e.autoAdvance,this.hostDarkModeCheckbox.checked=e.hostDarkMode,this.useVisionCheckbox.checked=e.useVision,this.setupEventListeners(),document.body.appendChild(this.host),this.applyHostDarkMode(e.hostDarkMode),e.apiKey&&W(e.apiKey).then(i=>{i&&i.length>0&&this.updateModelSelect(i,e.model)}).catch(()=>{})}switchTab(e){this.activeTab=e;let t=["autopilot","context","advanced","inspector","settings"];for(let o of t){let i=this.shadow.querySelector(`#eq-tab-${o}`),r=this.shadow.querySelector(`#eq-view-${o}`);o===e?(i?.classList.add("active"),r&&(r.style.display="flex")):(i?.classList.remove("active"),r&&(r.style.display="none"))}e==="autopilot"?this.callbacks.onSettingsChange({autoApply:!0,autoAdvance:!0}):e==="context"?this.renderContextTree():e==="inspector"&&this.refreshInspectorView()}setupEventListeners(){this.shadow.querySelector("#eq-tab-autopilot")?.addEventListener("click",()=>this.switchTab("autopilot")),this.shadow.querySelector("#eq-tab-context")?.addEventListener("click",()=>this.switchTab("context")),this.shadow.querySelector("#eq-tab-advanced")?.addEventListener("click",()=>this.switchTab("advanced")),this.shadow.querySelector("#eq-tab-inspector")?.addEventListener("click",()=>this.switchTab("inspector")),this.shadow.querySelector("#eq-tab-settings")?.addEventListener("click",()=>this.switchTab("settings")),this.shadow.querySelector("#eq-refresh-context-btn")?.addEventListener("click",()=>{this.renderContextTree()}),this.launcherBtn.addEventListener("click",()=>this.toggle()),this.dockToggleBtn.addEventListener("click",()=>this.toggle()),this.shadow.querySelector("#eq-min-btn")?.addEventListener("click",()=>this.toggle(!1)),this.shadow.querySelector("#eq-close-btn")?.addEventListener("click",()=>this.toggle(!1)),window.addEventListener("keydown",a=>{a.altKey&&(a.key==="q"||a.key==="Q")&&(a.preventDefault(),this.toggle())},!0);let e=a=>{let s=a.composedPath();(s.includes(this.sidebarEl)||s.includes(this.host))&&a.stopImmediatePropagation()};window.addEventListener("keydown",e,!0),window.addEventListener("keyup",e,!0),window.addEventListener("keypress",e,!0),this.apiKeyInput.addEventListener("input",()=>{let a=this.apiKeyInput.value.trim().replace(/^["']|["']$/g,"");this.callbacks.onSettingsChange({apiKey:a})}),this.shadow.querySelector("#eq-key-save").addEventListener("click",()=>{let a=this.apiKeyInput.value.trim().replace(/^["']|["']$/g,"");this.apiKeyInput.value=a,this.callbacks.onSettingsChange({apiKey:a}),this.setStatus("Chave Gemini salva com sucesso!","success"),this.keyContextMenu.hidden=!0}),this.keyMoreBtn.addEventListener("click",a=>{a.stopPropagation(),this.keyContextMenu.hidden=!this.keyContextMenu.hidden}),this.shadow.addEventListener("click",a=>{let s=a.target;!s.closest("#eq-key-context-menu")&&!s.closest("#eq-key-more-btn")&&(this.keyContextMenu.hidden=!0)}),this.shadow.querySelector("#eq-menu-prompt")?.addEventListener("click",()=>{this.keyContextMenu.hidden=!0;let a=this.apiKeyInput.value.trim(),s=window.prompt("Cole sua Chave API do Google Gemini (AI Studio):",a);if(s!==null){let d=s.trim().replace(/^["']|["']$/g,"");this.apiKeyInput.value=d,this.callbacks.onSettingsChange({apiKey:d}),this.setStatus("Chave Gemini inserida e salva com sucesso!","success")}}),this.shadow.querySelector("#eq-menu-paste")?.addEventListener("click",async()=>{this.keyContextMenu.hidden=!0;try{let a=await navigator.clipboard.readText();if(a){let s=a.trim().replace(/^["']|["']$/g,"");this.apiKeyInput.value=s,this.callbacks.onSettingsChange({apiKey:s}),this.setStatus("Chave colada e salva com sucesso!","success")}}catch{let a=this.apiKeyInput.value.trim(),s=window.prompt("Cole sua Chave API do Google Gemini (AI Studio):",a);if(s!==null){let d=s.trim().replace(/^["']|["']$/g,"");this.apiKeyInput.value=d,this.callbacks.onSettingsChange({apiKey:d}),this.setStatus("Chave Gemini inserida e salva com sucesso!","success")}}}),this.shadow.querySelector("#eq-menu-toggle-vis")?.addEventListener("click",()=>{this.keyContextMenu.hidden=!0;let a=this.apiKeyInput.type==="password";this.apiKeyInput.type=a?"text":"password";let s=this.shadow.querySelector("#eq-menu-vis-icon"),d=this.shadow.querySelector("#eq-menu-vis-text");s&&(s.innerHTML=a?g.eyeOff:g.eye),d&&(d.textContent=a?"Ocultar Chave":"Mostrar Chave")}),this.shadow.querySelector("#eq-menu-clear")?.addEventListener("click",()=>{this.keyContextMenu.hidden=!0,this.apiKeyInput.value="",this.callbacks.onSettingsChange({apiKey:""}),this.setStatus("Campo limpo. Cole a nova chave e clique em Salvar.","info"),this.apiKeyInput.focus()}),this.shadow.querySelector("#eq-menu-test")?.addEventListener("click",async()=>{this.keyContextMenu.hidden=!0;let a=this.apiKeyInput.value.trim().replace(/^["']|["']$/g,"");if(!a)return this.setStatus("Insira ou cole a chave de API.","error");this.setStatus("Testando chave e descobrindo modelos autorizados...","info");try{let s=await $e(a);this.setStatus(s.message,s.ok?"success":"error"),s.ok&&s.models&&s.models.length>0&&this.updateModelSelect(s.models)}catch(s){this.setStatus("Erro ao validar chave: "+s.message,"error")}});let o=()=>{this.keyContextMenu.hidden=!0,window.confirm("Deseja realmente resetar todos os dados, chaves e mem\xF3ria de sess\xE3o do EasyQuiz?")&&(Le(),this.apiKeyInput.value="",this.callbacks.onSettingsChange({apiKey:""}),this.setStatus("Todos os dados do EasyQuiz foram limpos.","info"),this.logToConsole("> [SYS] Armazenamento local resetado.","text-yellow"))};this.shadow.querySelector("#eq-menu-reset")?.addEventListener("click",o),this.shadow.querySelector("#eq-reset-all-btn")?.addEventListener("click",o),this.apToggleBtn.addEventListener("click",()=>{if(this.autopilot.isActive())this.autopilot.stop(),this.apToggleBtn.innerHTML=`${g.play} INICIAR AUTOPILOT`,this.apToggleBtn.classList.remove("danger"),this.stopStopwatch(),this.setStatus("Autopilot pausado pelo usu\xE1rio.","info");else{if(!this.apiKeyInput.value.trim().replace(/^["']|["']$/g,"")){this.setStatus("Configure sua chave de API Gemini na aba Configura\xE7\xF5es antes de ligar o Autopilot.","error"),this.switchTab("settings"),this.apiKeyInput.focus();return}this.callbacks.onSettingsChange({autoApply:!0,autoAdvance:!0}),this.autoApplyCheckbox.checked=!0,this.autoAdvanceCheckbox.checked=!0,this.autopilot.start(),this.apToggleBtn.innerHTML=`${g.stop} PARAR AUTOPILOT`,this.apToggleBtn.classList.add("danger"),this.startStopwatch(),this.setStatus("Autopilot ativo. Monitorando exerc\xEDcios...","info")}}),this.shadow.querySelector("#eq-ap-clear-memory").addEventListener("click",()=>{he(),this.logToConsole("> [SYS] Mem\xF3ria contextual limpa com sucesso.","text-green"),this.setStatus("Mem\xF3ria contextual da sess\xE3o limpa.","success")});let r=this.shadow.querySelector("#eq-copy-console-btn");r?.addEventListener("click",()=>{let a=this.apConsole?.innerText||"";navigator.clipboard.writeText(a).then(()=>{let s=r.innerHTML;r.innerHTML=g.check,setTimeout(()=>r.innerHTML=s,1800)})}),this.copyPromptBtn.addEventListener("click",()=>{let a=this.inspPrompt.textContent||"";navigator.clipboard.writeText(a).then(()=>{let s=this.copyPromptBtn.innerHTML;this.copyPromptBtn.innerHTML=`${g.check} Copiado!`,setTimeout(()=>this.copyPromptBtn.innerHTML=s,2e3)})}),this.modelSelect.addEventListener("change",()=>this.callbacks.onSettingsChange({model:this.modelSelect.value})),this.modeSelect.addEventListener("change",()=>this.callbacks.onSettingsChange({modeHint:this.modeSelect.value})),this.engineSelect.addEventListener("change",()=>this.callbacks.onSettingsChange({engine:this.engineSelect.value})),this.dryRunCheckbox.addEventListener("change",()=>this.callbacks.onSettingsChange({dryRun:this.dryRunCheckbox.checked})),this.autoApplyCheckbox.addEventListener("change",()=>this.callbacks.onSettingsChange({autoApply:this.autoApplyCheckbox.checked})),this.autoAdvanceCheckbox.addEventListener("change",()=>this.callbacks.onSettingsChange({autoAdvance:this.autoAdvanceCheckbox.checked})),this.useVisionCheckbox.addEventListener("change",()=>{let a=this.useVisionCheckbox.checked;this.callbacks.onSettingsChange({useVision:a}),this.setStatus(a?"Vis\xE3o Computacional ativada (capturas habilitadas).":"Modo DOM R\xE1pido ativado (capturas desabilitadas).","info")}),this.hostDarkModeCheckbox.addEventListener("change",()=>{let a=this.hostDarkModeCheckbox.checked;this.callbacks.onSettingsChange({hostDarkMode:a}),this.applyHostDarkMode(a)}),this.analyzeBtn.addEventListener("click",async()=>{await this.callbacks.onAnalyze()&&!this.dryRunCheckbox.checked&&!this.autoApplyCheckbox.checked&&this.callbacks.onApply()}),this.applyBtn.addEventListener("click",()=>this.callbacks.onApply())}startStopwatch(){this.stopStopwatch(),this.stopwatchStartTime=Date.now();let e=()=>{let t=((Date.now()-this.stopwatchStartTime)/1e3).toFixed(2)+"s";this.stopwatchAp.textContent=t,this.stopwatchAdv.textContent=t};e(),this.stopwatchInterval=setInterval(e,100)}stopStopwatch(e){if(this.stopwatchInterval&&(clearInterval(this.stopwatchInterval),this.stopwatchInterval=null),e!==void 0){let t=(e/1e3).toFixed(2)+"s";this.stopwatchAp.textContent=t,this.stopwatchAdv.textContent=t}}logToConsole(e,t){if(!this.apConsole)return;let o=document.createElement("div"),i=new Date,r=`${String(i.getHours()).padStart(2,"0")}:${String(i.getMinutes()).padStart(2,"0")}:${String(i.getSeconds()).padStart(2,"0")}.${String(Math.floor(i.getMilliseconds()/100))}`,a=e;for(e.startsWith(">")?a=`> [${r}] ${e.slice(1).trim()}`:a=`[${r}] ${e}`,o.textContent=a,t&&(o.className=t),this.apConsole.appendChild(o),this.apConsole.scrollTop=this.apConsole.scrollHeight;this.apConsole.children.length>150;)this.apConsole.removeChild(this.apConsole.firstChild)}setProgress(e,t){if(!this.progressContainer||!this.progressBar)return;if(e<=0){this.progressContainer.style.display="none",this.progressBar.style.width="0%";return}this.progressContainer.style.display="flex";let o=Math.min(100,Math.max(0,Math.round(e)));this.progressBar.style.width=`${o}%`,this.progressVal&&(this.progressVal.textContent=`${o}%`),t&&this.progressLabel&&(this.progressLabel.textContent=t),o>=100&&setTimeout(()=>{this.progressContainer&&this.progressBar&&this.progressBar.style.width==="100%"&&(this.progressContainer.style.display="none")},1500)}updateContext(e,t){this.latestContext=e,t&&(this.latestPlan=t),this.activeTab==="context"?this.renderContextTree():this.activeTab==="inspector"&&t&&this.refreshInspectorView()}renderContextTree(){if(!this.contextTreeContainer)return;let e=this.latestContext,t=X(),o=this.latestPlan;this.contextTreeContainer.innerHTML="";let i=this.createTreeFolder("\u{1F4C4} P\xC1GINA & ESCOPO ATUAL",!0,[{label:"T\xEDtulo",value:document.title||"Sem t\xEDtulo"},{label:"URL",value:window.location.pathname||"/"},{label:"Escopo DOM",value:e?`${e.scope.tagName.toLowerCase()}${e.scope.className?"."+e.scope.className.split(" ").join("."):""}`:"Document"},{label:"Tamanho Texto",value:e?`${e.questionText.length} caracteres`:"N\xE3o analisado"},{label:"Trecho Enunciado",value:e?`"${e.questionText.slice(0,120)}..."`:"Nenhum"}]);this.contextTreeContainer.appendChild(i);let r=e?e.controls:[],a=r.map((c,u)=>{let p=c.role==="navigation"||c.type==="button",h=!p&&c.value?` [val: "${c.value}"]`:"";return{label:`[#${u+1}] ${c.type.toUpperCase()}`,value:`${c.label||c.id||c.name||"(Sem r\xF3tulo)"}${h}`.trim(),badge:p?"Navega\xE7\xE3o":c.role||c.type}}),s=this.createTreeFolder(`\u{1F39B}\uFE0F CONTROLES DETECTADOS (${r.length})`,r.length>0,a);this.contextTreeContainer.appendChild(s);let d=t.map((c,u)=>({label:`Mem\xF3ria #${u+1}`,value:c,badge:"RAG"})),l=this.createTreeFolder(`\u{1F9E0} MEM\xD3RIA RAG ACUMULADA (${t.length})`,t.length>0,d);if(this.contextTreeContainer.appendChild(l),o){let c=this.createTreeFolder(`\u{1F916} \xDALTIMO PLANO IA (${o.actions.length} a\xE7\xF5es)`,!0,[{label:"Tipo P\xE1gina",value:o.pageType,badge:`${(o.confidence*100).toFixed(0)}%`},{label:"Modo",value:o.mode},{label:"Racioc\xEDnio",value:o.rationale||"N/A"},...o.actions.map((u,p)=>({label:`A\xE7\xE3o #${p+1} (${u.t})`,value:JSON.stringify(u)}))]);this.contextTreeContainer.appendChild(c)}}createTreeFolder(e,t,o){let i=document.createElement("div");i.className="eq-tree-node";let r=document.createElement("div");r.className="eq-tree-header",r.innerHTML=`<span class="eq-tree-arrow">${t?"\u25BC":"\u25B6"}</span> <span>${e}</span>`;let a=document.createElement("div");if(a.className="eq-tree-content",a.style.display=t?"flex":"none",o.length===0)a.innerHTML='<div class="text-muted" style="padding: 2px 0;">Nenhum item registrado.</div>';else for(let s of o){let d=document.createElement("div");d.className="eq-tree-leaf",d.innerHTML=`
          <strong style="color:#ffffff; min-width: 80px;">${s.label}:</strong>
          <span style="flex:1; word-break: break-word; color:#aaaaaa;">${s.value}</span>
          ${s.badge?`<span class="eq-tree-badge">${s.badge}</span>`:""}
        `,a.appendChild(d)}return r.addEventListener("click",()=>{let s=a.style.display==="none";a.style.display=s?"flex":"none";let d=r.querySelector(".eq-tree-arrow");d&&(d.textContent=s?"\u25BC":"\u25B6")}),i.appendChild(r),i.appendChild(a),i}toggle(e){e!==void 0?this.isCollapsed=!e:this.isCollapsed=!this.isCollapsed,this.isCollapsed?this.sidebarEl.classList.add("eq-collapsed"):(this.sidebarEl.classList.remove("eq-collapsed"),this.apiKeyInput.value||(this.switchTab("settings"),this.apiKeyInput.focus()))}setBusy(e,t){this.analyzeBtn.disabled=e,[this.modelSelect,this.modeSelect,this.engineSelect,this.dryRunCheckbox,this.autoApplyCheckbox,this.autoAdvanceCheckbox,this.useVisionCheckbox].forEach(o=>o.disabled=e),e?(this.startStopwatch(),this.dotPulseAp.className="eq-dot-pulse busy",this.dotPulseAdv.className="eq-dot-pulse busy",this.launcherDot.className="eq-launcher-dot busy",t&&this.setStatus(t,"info")):(this.stopStopwatch(),this.dotPulseAp.className="eq-dot-pulse",this.dotPulseAdv.className="eq-dot-pulse",this.launcherDot.className="eq-launcher-dot")}setStatus(e,t="info"){this.statusTextAp.textContent=e,this.statusTextAdv.textContent=e,t==="error"?(this.dotPulseAp.className="eq-dot-pulse error",this.dotPulseAdv.className="eq-dot-pulse error",this.launcherDot.className="eq-launcher-dot error"):t==="success"&&(this.dotPulseAp.className="eq-dot-pulse",this.dotPulseAdv.className="eq-dot-pulse",this.launcherDot.className="eq-launcher-dot");let o=e.includes("Alternando")||e.includes("indispon\xEDvel")||e.includes("fallback")||e.includes("alternativo"),i=t==="error"?"> [ERRO] ":t==="success"?"> [SUCESSO] ":o?"> [FALLBACK] ":"> [SYS] ",r=t==="error"?"text-red":t==="success"?"text-green":o?"text-yellow":"text-blue";this.logToConsole(`${i}${e}`,r)}setPlan(e,t){this.latestPlan=e,this.resultContainer.style.display="flex",e.durationMs&&this.stopStopwatch(e.durationMs);let o=this.shadow.querySelector("#eq-badges");o.innerHTML=`
      <span class="eq-brand-badge">${e.mode.replace("_"," ")}</span>
      <span class="eq-brand-badge" style="color: #00ff55; border-color: rgba(0, 255, 85, 0.4);">${Math.round(e.confidence*100)}% Confian\xE7a</span>
      <span class="eq-brand-badge">${e.actions.length} Cmds</span>
      ${e.usedModel?`<span class="eq-brand-badge" style="border-color: rgba(91, 192, 235, 0.5); color: #5bc0eb;">${e.usedModel}</span>`:""}
    `;let i=this.shadow.querySelector("#eq-rationale-text");i.textContent=e.rationale;let r=this.shadow.querySelector("#eq-actions-list");r.innerHTML="";for(let a of e.actions){let s=document.createElement("div");s.className="eq-action-item";let d="";a.t==="chk"?d=`chk ${a.id} (${a.c})`:a.t==="val"?d=`val "${a.v}" -> ${a.id}`:a.t==="sel"?d=`sel "${Array.isArray(a.v)?a.v.join(","):a.v}" -> ${a.id}`:a.t==="clk"?d=`clk ${a.id}`:a.t==="adv"?d="adv":a.t==="js"?d=`js: ${String(a.v).slice(0,40)}...`:a.t==="drag"&&(d=`drag "${a.from}" -> "${a.to}"`),s.innerHTML=`<span class="eq-action-badge">${a.t.toUpperCase()}</span> <span>${d}</span>`,r.appendChild(s)}this.applyBtn.disabled=!t||!e.actions.length,this.refreshInspectorView()}setInspectorPrompt(e,t){this.latestPromptText=e,this.inspPrompt&&(this.inspPrompt.textContent=e),t&&this.inspModel&&(this.inspModel.textContent=t),this.inspLatency&&(this.inspLatency.textContent="Aguardando IA...")}refreshInspectorView(){let e=this.latestPlan;if(e)if(this.inspModel.textContent=e.usedModel||this.initialSettings.model,this.inspLatency.textContent=e.durationMs?`${e.durationMs}ms`:"--",this.inspTokens.textContent=e.tokensUsed?`${e.tokensUsed}`:"--",this.inspPrompt.textContent=e.promptSent||this.latestPromptText||"Prompt n\xE3o registrado para esta requisi\xE7\xE3o.",this.inspRationale.textContent=e.rationale,this.inspActions.innerHTML="",e.actions.length>0)for(let t of e.actions){let o=document.createElement("div");o.className="eq-action-item",o.textContent=JSON.stringify(t),this.inspActions.appendChild(o)}else this.inspActions.innerHTML='<div class="text-muted" style="padding: 4px;">Nenhuma a\xE7\xE3o prescrita pela IA.</div>';else this.latestPromptText&&(this.inspPrompt.textContent=this.latestPromptText)}showFloatingAnswers(e){let t=e||this.latestPlan;t&&this.floatingAnswers.show(t)}hideFloatingAnswers(){this.floatingAnswers.hide()}isFloatingAnswersOpen(){return this.floatingAnswers.isOpen()}updateModelSelect(e,t){let o=t||this.initialSettings.model||this.modelSelect.value;this.modelSelect.innerHTML="";let i=!1;e.forEach(r=>{let a=r.id===o;a&&(i=!0),this.modelSelect.add(new Option(r.name,r.id,!1,a))}),!i&&o&&this.modelSelect.add(new Option(`Gemini (${o})`,o,!1,!0)),this.modelSelect.value=o}updateSelectedModel(e){Array.from(this.modelSelect.options).some(o=>o.value===e)||this.modelSelect.add(new Option(`Gemini (${e})`,e,!1,!0)),this.modelSelect.value=e}applyHostDarkMode(e){let t="eq-host-dark-mode-style",o=document.getElementById(t);if(e){let i=window.getComputedStyle(document.body).backgroundColor;(i.includes("rgba(0, 0, 0, 0)")||i==="transparent")&&(i=window.getComputedStyle(document.documentElement).backgroundColor);let r=i.match(/\d+(\.\d+)?/g);if(r&&r.length>=3&&(r[3]!==void 0?parseFloat(r[3]):1)>.1){let s=parseInt(r[0]),d=parseInt(r[1]),l=parseInt(r[2]);if((s*299+d*587+l*114)/1e3<100)return}o||(o=document.createElement("style"),o.id=t,o.innerHTML=`
          html { filter: invert(1) hue-rotate(180deg) !important; background: #fff !important; }
          img, video, canvas, [style*="background-image"] { filter: invert(1) hue-rotate(180deg) !important; }
        `,document.head.appendChild(o)),this.host.classList.add("eq-dark-mode-active")}else this.host.classList.remove("eq-dark-mode-active"),o&&o.remove()}destroy(){this.stopStopwatch(),this.autopilot.stop(),this.applyHostDarkMode(!1),this.callbacks.onDestroy(),this.host.remove()}};async function ut(){let n=window;if(Te(),n.__easyquiz){n.__easyquiz.toggle();return}let e=ue(),t=null,o=new re(e,{onAnalyze:(a=1)=>i(a),onApply:(a=1)=>void r(a),onDestroy:()=>{j(),delete n.__easyquiz},onSettingsChange:a=>{e=Ie(a)}});n.__easyquiz={toggle:()=>o.toggle(),destroy:()=>o.destroy(),analyze:async()=>{await i()}},window.addEventListener("keydown",a=>{if(a.altKey&&(a.key==="q"||a.key==="Q")){if(a.preventDefault(),!o)return;o.toggle(!0),i()}});async function i(a=1){if(!e.apiKey){o.setStatus("Configure sua chave de API Gemini acima para come\xE7ar.","error"),o.toggle(!0);return}o.setBusy(!0,"Identificando o bloco da quest\xE3o ativa na p\xE1gina..."),o.setProgress(20,"Varrendo escopo do DOM e controles..."),j(),o.hideFloatingAnswers();try{let s=_(!1);s||(o.setStatus("Nenhum controle detectado. Tentando captura de tela inteira...","info"),s=O()),qe(s.scope),o.updateContext(s),o.logToConsole(`> [DOM] Escopo: <${s.scope.tagName.toLowerCase()}> com ${s.controls.length} controle(s) e ${s.questionText.length} caracteres.`,"text-blue"),o.setStatus(`Quest\xE3o localizada (${s.controls.length} controles). Preparando an\xE1lise...`,"info"),o.setProgress(40,`Consultando Gemini (${e.model})...`);let d=await Me(s.scope,e.useVision);o.setStatus(d.length>0?`Consultando Gemini (${e.model}) com ${d.length} imagem(ns) anexada(s)...`:`Consultando Gemini (${e.model}) via DOM nativo (modo r\xE1pido)...`,"info");let l=V(s,d,e);o.setInspectorPrompt(l,e.model);let{plan:c,usedModel:u}=await fe(s,d,e,(p,h)=>{o.setStatus(p,h==="warning"?"info":h)});if(c.needsMoreContext){o.setProgress(55,"Ampliando escopo da quest\xE3o..."),o.setStatus("Enunciado ou contexto isolado detectado pela IA. Acionando Sele\xE7\xE3o Geral Expandida...","info"),s=_(!0),s||(s=O()),qe(s.scope),o.updateContext(s),d=await Me(s.scope,e.useVision),o.setStatus(`Reconsultando IA com escopo ampliado (${s.controls.length} controles)...`,"info");let p=V(s,d,e);o.setInspectorPrompt(p,e.model),c=(await fe(s,d,e,(m,v)=>{o.setStatus(m,v==="warning"?"info":v)})).plan}return o.setProgress(70,"Resposta recebida da IA! Processando plano..."),o.logToConsole(`> [IA] Modelo: ${u||e.model} | Modo: ${c.mode} | Confian\xE7a: ${(c.confidence*100).toFixed(0)}%`,"text-green"),c.rationale&&o.logToConsole(`> [IA] Racioc\xEDnio: "${c.rationale}"`,"text-blue"),o.logToConsole(`> [IA] ${c.actions.length} a\xE7\xE3o(\xF5es) prescritas no plano.`,"text-blue"),c.memoryToStore&&(He(c.memoryToStore),o.logToConsole(`> [RAG] \u{1F9E0} Nova mem\xF3ria te\xF3rica salva na sess\xE3o: "${c.memoryToStore}"`,"text-yellow")),t=c,o.updateContext(s,c),Ge(c.actions),o.setPlan(c,!e.dryRun),c.pageType==="conclusion"?(o.setProgress(100,"Atividade conclu\xEDda!"),o.setStatus("Atividade conclu\xEDda ou tela final detectada pela IA.","success")):c.pageType==="info"?(o.setProgress(100,"Contexto absorvido na mem\xF3ria!"),o.setStatus("\u{1F4D8} Conte\xFAdo de contexto absorvido na mem\xF3ria RAG. Avan\xE7ando...","success")):c.pageType==="start"?(o.setProgress(100,"In\xEDcio detectado!"),o.setStatus("In\xEDcio de atividade detectado. Iniciando...","info")):(o.setProgress(80,"Plano de resolu\xE7\xE3o pronto!"),o.setStatus(e.dryRun?"Simula\xE7\xE3o conclu\xEDda. As respostas foram real\xE7adas na p\xE1gina sem altera\xE7\xE3o.":"Resolu\xE7\xE3o pronta! Verifique o realce na tela e aplique quando desejar.","success")),e.dryRun&&c.pageType==="question"&&o.showFloatingAnswers(c),e.autoApply&&!e.dryRun&&await r(a),c}catch(s){j(),o.setProgress(0);let d=s instanceof Error?s.message:"Falha desconhecida na an\xE1lise.";o.setStatus(d,"error");return}finally{o.setBusy(!1)}}async function r(a=1){if(!t){o.setStatus("Nenhum plano dispon\xEDvel para aplicar. Execute a an\xE1lise primeiro.","error");return}if(e.dryRun){o.setStatus("O modo de simula\xE7\xE3o est\xE1 ativo. Desmarque para poder aplicar.","error");return}let s=t.pageType==="info"||t.pageType==="start",d=(e.autoAdvance||s||a>=2)&&t.confidence>=e.confidenceThreshold&&!t.needsMoreContext;o.setBusy(!0,"Aplicando respostas no formul\xE1rio..."),o.setProgress(85,`Aplicando ${t.actions.length} a\xE7\xE3o(\xF5es) no formul\xE1rio...`),o.logToConsole(`> [EXEC] Iniciando aplica\xE7\xE3o com 6 vias de persist\xEAncia para ${t.actions.length} a\xE7\xE3o(\xF5es)...`,"text-blue");try{let l=await Ce(t,d,a);l.success||l.advanced?(o.setProgress(100,"Sucesso! Respostas preenchidas e validadas!"),o.logToConsole(`> [VERIF] \u2713 Sucesso no DOM: ${l.verified}/${l.applied} a\xE7\xF5es validadas com sucesso!`,"text-green"),l.advanced&&o.logToConsole("> [NAV] \u2713 Bot\xE3o de confirma\xE7\xE3o/avan\xE7o acionado com sucesso!","text-green"),o.setStatus(`Sucesso: ${l.applied} resposta(s) preenchida(s)${l.advanced?" e pr\xF3xima quest\xE3o acionada":""}.`,"success"),o.hideFloatingAnswers()):l.verified>0?(o.setProgress(90,"Respostas preenchidas!"),o.logToConsole(`> [VERIF] \u2713 Alternativa(s) marcada(s) no DOM (${l.verified}/${l.applied} validadas). Pronto para prosseguir!`,"text-green"),o.setStatus(`Respostas preenchidas (${l.verified}/${l.applied} validadas no DOM).`,"success"),o.hideFloatingAnswers()):t.pageType==="question"&&(l.verified===0||a>=3)?(o.setProgress(0),o.logToConsole(`> [VERIF] \u26A0\uFE0F Nenhuma a\xE7\xE3o p\xF4de ser validada no DOM (${l.verified}/${l.applied}). Abrindo Gabarito Flutuante para aux\xEDlio manual.`,"text-yellow"),o.setStatus("Aviso: O formul\xE1rio requer intera\xE7\xE3o manual direta. Gabarito Flutuante exibido na tela.","info"),o.showFloatingAnswers(t)):o.hideFloatingAnswers()}catch(l){o.setProgress(0);let c=l instanceof Error?l.message:"Falha ao aplicar plano.";o.setStatus(c,"error"),t.pageType==="question"&&a>=3?o.showFloatingAnswers(t):o.hideFloatingAnswers()}finally{o.setBusy(!1)}}o.toggle(!0)}Te();ut().catch(n=>{console.error("[EasyQuiz] Erro fatal na inicializa\xE7\xE3o:",n),window.alert(`EasyQuiz: falha ao iniciar: ${n instanceof Error?n.message:String(n)}`)});})();
