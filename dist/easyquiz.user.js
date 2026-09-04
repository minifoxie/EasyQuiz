// ==UserScript==
// @name         EasyQuiz Pro
// @namespace    https://github.com/minifoxie/EasyQuiz
// @version      1.0.0
// @description  Resolução inteligente e preenchimento de questões e formulários com IA
// @author       minifoxie
// @match        *://*/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

/* EasyQuiz v1.0.0 — Resolução inteligente de quizzes sem servidor
 * GitHub: https://github.com/minifoxie/EasyQuiz
 * 100% Client-side. Direct Google Gemini REST API.
 */
"use strict";(()=>{var Ke=Object.defineProperty;var O=(t,e)=>()=>(t&&(e=t(t=0)),e);var me=(t,e)=>{for(var o in e)Ke(t,o,{get:e[o],enumerable:!0})};var v,ge=O(()=>{"use strict";v={apiKey:"",model:"gemini-2.5-flash",uiMode:"advanced",modeHint:"",engine:"smart",dryRun:!1,autoApply:!1,autoAdvance:!1,hostDarkMode:!0,confidenceThreshold:.8}});var ye={};me(ye,{addSessionMemory:()=>Ne,clearSessionMemories:()=>ae,getSessionMemories:()=>te,loadDomainCache:()=>N,loadSettings:()=>K,saveDomainCache:()=>ee,saveSettings:()=>C});function K(){try{let t=localStorage.getItem(fe);if(!t){let a=localStorage.getItem("easyquiz_settings_v1");if(a){let s=JSON.parse(a);return{...v,apiKey:s.apiKey||""}}return{...v}}let e=JSON.parse(t),o=typeof e.model=="string"&&e.model?e.model:v.model;return(o.includes("3.8")||o.includes("3.7")||o.includes("3.6")||o.includes("3.5")||o.includes("3.1"))&&(o=v.model),{apiKey:typeof e.apiKey=="string"?e.apiKey.trim():v.apiKey,model:o,uiMode:e.uiMode==="easy"||e.uiMode==="advanced"?e.uiMode:v.uiMode,modeHint:e.modeHint??"",engine:e.engine??"smart",dryRun:!!e.dryRun,autoApply:!!e.autoApply,autoAdvance:!!e.autoAdvance,hostDarkMode:e.hostDarkMode!==void 0?!!e.hostDarkMode:!0,confidenceThreshold:typeof e.confidenceThreshold=="number"?e.confidenceThreshold:v.confidenceThreshold}}catch{return{...v}}}function N(t){try{let e=localStorage.getItem("eq_domain_cache_"+t);return e?JSON.parse(e):{}}catch{return{}}}function ee(t,e){let a={...N(t),...e};try{localStorage.setItem("eq_domain_cache_"+t,JSON.stringify(a))}catch(s){console.warn("[EasyQuiz] Erro cache de dominio:",s)}}function C(t){let o={...K(),...t};try{localStorage.setItem(fe,JSON.stringify(o))}catch(a){console.warn("[EasyQuiz] Falha ao persistir configura\xE7\xF5es no localStorage:",a)}return o}function Ne(t){let e=t.trim();e&&!D.includes(e)&&D.push(e)}function te(){return D}function ae(){D=[]}var fe,D,w=O(()=>{"use strict";ge();fe="easyquiz_settings_v2";D=[]});function y(t){let e=t;if(!e||typeof e.getBoundingClientRect!="function")return!1;let o=e.getBoundingClientRect(),a=window.getComputedStyle(e);return o.width>0&&o.height>0&&a.display!=="none"&&a.visibility!=="hidden"&&Number(a.opacity||"1")>0}function h(t,e=500){return(t??"").replace(/\s+/g," ").trim().slice(0,e)}function Fe(t){let e=t.dataset.easyquizId;if(e)return e;let o=`eq-${Date.now().toString(36)}-${(je+=1).toString(36)}`;return t.dataset.easyquizId=o,o}function ie(t){let e=h(t.getAttribute("aria-label")||t.textContent||t.getAttribute("value")||t.value),o=t.type,a=e.replace(/[\d\(\)\[\]→\>\•\-\/\\]+/g," ").trim();return Q.test(a)||Q.test(e)||o==="submit"||t.getAttribute("data-testid")?.toLowerCase().includes("next")||t.getAttribute("data-testid")?.toLowerCase().includes("check")||!1}function Ve(t){let e=t.getAttribute("aria-label");if(e)return h(e);let o=t.getAttribute("aria-labelledby");if(o){let n=o.split(/\s+/).map(i=>document.getElementById(i)?.textContent).filter(Boolean).join(" ");if(n.trim())return h(n)}if("labels"in t&&t.labels){let n=Array.from(t.labels??[]).map(i=>i.textContent).join(" ");if(n.trim())return h(n)}let a=t.closest('.docssharedWizToggleLabeledContainer, [role="listitem"], .answer, label, .quiz-option, .form-check');if(a&&a!==t){let n=h(a.textContent);if(n)return n}let s=t.getAttribute("placeholder")||t.getAttribute("title")||t.textContent||t.value||"";return h(s)}function se(t,e){let o=t instanceof HTMLSelectElement?t:null,a=t;t.dataset.easyquizRole=e;let s=t.tagName.toLowerCase(),n=["input","textarea","select","button"].includes(s)?s:"other",i=t.getAttribute("role")||"",r=t.getAttribute("draggable")==="true"||t.classList.contains("perseus-drag-item"),c=t.getAttribute("data-role")==="dropzone"||t.classList.contains("category-container")||t.hasAttribute("data-category"),l=h((r?"draggable":c?"dropzone":"")||a.type||i||n,40),d="";a.type==="checkbox"||a.type==="radio"||i==="radio"||i==="checkbox"?d=a.checked||t.getAttribute("aria-checked")==="true"?"checked":"unchecked":d=h(a.value||t.getAttribute("data-category")||t.textContent||"",2e3);let p=[];if(o)for(let M of Array.from(o.options).slice(0,80))p.push({value:h(M.value),label:h(M.textContent)});let m=!!(a.required||t.getAttribute("aria-required")==="true"),P=!!(a.disabled||t.getAttribute("aria-disabled")==="true");return{id:Fe(t),tag:n,type:l,label:Ve(t),name:h(a.name||t.getAttribute("name")||"",180),value:d,options:p,required:m,disabled:P,role:e}}var A,Q,je,j=O(()=>{"use strict";A=['input:not([type="hidden"])',"textarea","select","button",'[role="button"]','[role="radio"]','[role="checkbox"]','[role="option"]','[contenteditable="true"]','[draggable="true"]',"[aria-grabbed]","[aria-dropeffect]","[data-widget-type]",".perseus-drag-item",".sortable-item",'[data-testid*="drag" i]','[data-testid*="card" i]','[data-testid*="option" i]','[data-testid*="category" i]','[data-role="dropzone"]',"[data-category]"].join(","),Q=/(verificar|checar|check|conferir|validar|próxim[oa]|next|continuar|avançar|prosseguir|enviar|submit|concluir|finalizar|terminar|começar|iniciar|start|vamos lá|próxima tarefa|next task|próxima pergunta|next question|marcar como concluíd[oa]|mostrar resumo|entendi)/i,je=0});var U={};me(U,{captureCurrentContext:()=>q,captureFullPageText:()=>Ue,expandToGeneralSelection:()=>Te,extractAnswerControls:()=>qe,extractNavigationControls:()=>V,findActiveScope:()=>Ae,findTrueQuestionContainer:()=>F,sanitizeHtml:()=>re});function Se(t){if(!y(t))return-1/0;let e=t.getBoundingClientRect(),o=Array.from(t.querySelectorAll(A)).filter(y),a=h(t.innerText,4e3).length;if(!o.length||a<10)return-1/0;let s=Math.max(1,window.innerWidth*window.innerHeight),n=Math.max(1,e.width*e.height),i=Math.min(1,n/s),r=e.top+e.height/2,c=Math.abs(r-window.innerHeight/2)/Math.max(1,window.innerHeight),u=a>40?35:0,l=e.top>=0&&e.bottom<=window.innerHeight?25:0;return o.length*15+Math.min(60,a/20)+u+l-i*20-c*10}function F(t){let e=t;for(;e.parentElement&&e.parentElement!==document.body&&e.parentElement!==document.documentElement;){let o=e.parentElement,a=o.tagName.toLowerCase();if(["header","footer","nav","aside"].includes(a))break;if(o.matches?.('article, section, form, [data-test-id*="exercise" i], [data-testid*="exercise" i], .perseus-renderer, .framework-perseus, [class*="question-container" i], .que, main')){e=o;break}let s=h(e.innerText,1e4),n=h(o.innerText,1e4),i=e.querySelectorAll(A).length,r=o.querySelectorAll(A).length;if(s.length<150&&n.length>s.length&&r<=i+4){e=o;continue}break}return e}function Te(t){let e=t,o=e.closest('main, [role="main"], article, form, [data-test-id*="exercise" i], [data-testid*="exercise" i], .framework-perseus, section');if(o&&o!==document.body&&y(o))return o;let a=0;for(;e.parentElement&&e.parentElement!==document.body&&a<3;)e=e.parentElement,a++;return e||document.body}function Ae(){let t=document.activeElement;if(t&&t!==document.body){let s=t.closest(we);if(s&&Se(s)>0)return F(s)}let o=Array.from(document.querySelectorAll(we)).map(s=>({element:s,score:Se(s)})).filter(s=>Number.isFinite(s.score)).sort((s,n)=>n.score-s.score);if(o.length>0&&o[0].score>0)return F(o[0].element);let a=document.querySelector('form, main, [role="main"]');return a&&y(a)?a:document.body}function re(t){let e=t.cloneNode(!0);e.querySelectorAll("script, style, iframe, object, embed, svg, canvas, noscript, audio, video").forEach(a=>a.remove());let o=["type","name","value","role","aria-label","aria-labelledby","aria-checked","aria-required","required","disabled","data-easyquiz-id","draggable","class","id","data-widget-type","data-role","data-category","data-testid"];return e.querySelectorAll("*").forEach(a=>{for(let s of Array.from(a.attributes))o.includes(s.name)||a.removeAttribute(s.name)}),e.outerHTML.replace(/\s+/g," ").slice(0,2e4)}function qe(t){return Array.from(t.querySelectorAll(A)).filter(e=>y(e)&&!ie(e)).slice(0,100).map(e=>se(e,"answer"))}function V(t){let e=[t,t.parentElement,t.parentElement?.parentElement,document.body].filter(Boolean),o=new Set,a=[];for(let s of e)for(let n of Array.from(s.querySelectorAll(A)))if(!(o.has(n)||!y(n)||!ie(n))&&(o.add(n),a.push(se(n,"navigation")),a.length>=10))return a;return a}function q(t=!1){let e=Ae();e=F(e),t&&(e=Te(e));let o=h(e.innerText,16e3),a=qe(e),s=V(e);s.length===0&&(s=V(document.body));let n=[...a,...s].slice(0,120);return!o||n.length===0&&o.length<30?null:{sourceUrl:window.location.href.slice(0,2e3),pageTitle:document.title.slice(0,500)||"P\xE1gina de Quest\xE3o",questionText:o,htmlSnippet:re(e),controls:n,scope:e}}function Ue(){let t=document.body.innerText||document.documentElement.innerText,e=h(t,8e3),o=V(document.body),a=document.querySelector('main, article, [role="main"]')||document.body;return{sourceUrl:window.location.href.slice(0,2e3),pageTitle:document.title.slice(0,500)||"P\xE1gina Inteira",questionText:e,htmlSnippet:re(a).slice(0,1e4),controls:o,scope:a}}var we,k=O(()=>{"use strict";j();we=['[data-test-id*="exercise" i]','[data-testid*="exercise" i]',".perseus-renderer",".framework-perseus",".Qr7Oae",".que",".question-holder",".quiz-question",".question_holder",".display_question",'[data-functional-selector*="question"]',".question-container","[data-question-id]",'[data-testid*="question" i]','[class*="question-container" i]','[class*="question" i]','[class*="pergunta" i]',"article","form","section","main"].join(",")});w();var ve=`Voc\xEA \xE9 o EasyQuiz Engine v4.5. Retorne JSON estrito.
Regras Absolutas:
1. "pageType": 
   - "question": Se h\xE1 pergunta/exerc\xEDcio (inclusive categoriza\xE7\xE3o, arrastar ou ordenar).
   - "info": Se for p\xE1gina explicativa, texto, artigo te\xF3rico ou v\xEDdeo. REGRA OBRIGAT\xD3RIA: Resuma conceitos-chave em "memoryToStore" e retorne a a\xE7\xE3o de avan\xE7ar { "t": "adv" }.
   - "start": In\xEDcio de question\xE1rio. Retorne { "t": "adv" } para come\xE7ar.
   - "conclusion": FIM/RESUMO/NOTA final atingida. Retorne actions: [].
2. "rationale" (OBRIGAT\xD3RIO): Raciocine passo a passo. Descreva o que v\xEA em imagens antes de responder.
3. RAG AUT\xD4NOMO: Suas anota\xE7\xF5es em "memoryToStore" persistem entre telas. Use a [MEM\xD3RIA DE CONTEXTO ATIVA] para acertar quest\xF5es sobre textos anteriores.
4. "actions": Array de comandos minificados:
   - { "t": "val", "id": "id_campo", "v": "resposta" }
   - { "t": "chk", "id": "id_check", "c": true }
   - { "t": "sel", "id": "id_select", "v": ["valor"] }
   - { "t": "clk", "id": "id_ou_texto" }
   - { "t": "adv" } (Verificar / Pr\xF3ximo / Continuar)
   - { "t": "drag", "from": "id_ou_texto_item", "to": "id_ou_texto_categoria" } (Categoriza\xE7\xE3o / Arrastar)
   - { "t": "js", "v": "codigo_javascript" } (Quando atalhos n\xE3o forem suficientes, crie c\xF3digo JS compacto e direto usando $eq.click, $eq.drag, $eq.categorize ou manipula\xE7\xE3o de DOM).
5. Se a quest\xE3o for de categorizar ou associar itens a caixas/categorias:
   - Use "drag" com "from" e "to", OU
   - Gere microscript JS: ex: { "t": "js", "v": "$eq.categorize('Texto Item', 'Texto Categoria');" }
   - Sempre inclua { "t": "adv" } ao final para confirmar.
6. "needsMoreContext": true se a sele\xE7\xE3o atual parecer restrita ou isolada (cortando o enunciado da pergunta, faltando contexto do texto-base ou op\xE7\xF5es). O EasyQuiz acionar\xE1 a SELE\xC7\xC3O GERAL EXPANDIDA, ampliando o escopo para o container completo da p\xE1gina para lhe dar vis\xE3o total.`;function be(t,e,o){let a=t.htmlSnippet.includes("draggable")||t.htmlSnippet.includes("perseus")||t.htmlSnippet.includes("category")||t.htmlSnippet.includes("dropzone")||t.controls.some(c=>c.type==="draggable"||c.type==="dropzone"),n=t.questionText.length<120||a||t.controls.length<3?`
[HTML FRAGMENT (Estrutura DOM/Widgets)]:
${t.htmlSnippet.slice(0,5e3)}`:`
[HTML FRAGMENT]: Omitido (Texto e controles s\xE3o suficientes).`,i=te(),r="";return i.length>0&&(r=`
[MEM\xD3RIA DE CONTEXTO ATIVA (RAG)]:
${i.map(c=>`- ${c}`).join(`
`)}
`),`--- NOVA AN\xC1LISE DE P\xC1GINA ---
[MODO REQUERIDO]: ${o.engine}
[DICA]: ${o.modeHint||"Auto"}
[SIMULA\xC7\xC3O]: ${o.dryRun?"ON":"OFF"}
[URL]: ${t.sourceUrl}
[P\xC1GINA]: ${t.pageTitle}
${r}
[TEXTO VIS\xCDVEL]:
${t.questionText}
${n}

[CONTROLES DETECTADOS]:
${JSON.stringify(t.controls.map(c=>({id:c.id,type:c.type,lbl:c.label,val:c.value,opt:c.options.length?c.options:void 0})),null,0)}

[IMAGENS ANEXADAS]: ${e.length}
Responda estritamente em JSON.`}var S=[{id:"gemini-2.5-flash",name:"Gemini 2.5 Flash (Padr\xE3o Oficial 2026)",description:"Mais r\xE1pido, econ\xF4mico e amplamente dispon\xEDvel em contas Google AI Studio."},{id:"gemini-3.5-flash",name:"Gemini 3.5 Flash (Gera\xE7\xE3o 3 - Alta Velocidade)",description:"Frontier model com alta intelig\xEAncia multimodal otimizado para velocidade."},{id:"gemini-3.1-flash-lite",name:"Gemini 3.1 Flash Lite (Ultra Eficiente)",description:"Equil\xEDbrio ideal entre intelig\xEAncia e economia extrema de cota."},{id:"gemini-2.5-pro",name:"Gemini 2.5 Pro (Racioc\xEDnio Avan\xE7ado)",description:"Alta capacidade de racioc\xEDnio l\xF3gico, problemas complexos e STEM."},{id:"gemini-3.1-pro",name:"Gemini 3.1 Pro (Racioc\xEDnio Profundo)",description:"Modelo avan\xE7ado para racioc\xEDnio em m\xFAltiplos passos e c\xF3digo."},{id:"gemini-1.5-flash",name:"Gemini 1.5 Flash (Compatibilidade Ampla)",description:"Suporte universal de alta compatibilidade em contas com endpoints legados."}],_e={type:"OBJECT",properties:{pageType:{type:"STRING",enum:["question","info","start","conclusion"]},mode:{type:"STRING",enum:["texto_livre","escolha_unica","escolha_multipla","verdadeiro_falso","preenchimento","acao_sem_resposta","categorizacao","ordenacao","arrastar_soltar"]},confidence:{type:"NUMBER"},rationale:{type:"STRING"},needsMoreContext:{type:"BOOLEAN"},warnings:{type:"ARRAY",items:{type:"STRING"}},memoryToStore:{type:"STRING"},actions:{type:"ARRAY",items:{type:"OBJECT",properties:{t:{type:"STRING",enum:["val","chk","sel","clk","adv","js","drag"]},id:{type:"STRING"},v:{},c:{type:"BOOLEAN"},co:{type:"ARRAY",items:{type:"NUMBER"}},from:{type:"STRING"},to:{type:"STRING"}},required:["t"]}}},required:["pageType","mode","confidence","rationale","needsMoreContext","actions"]};function Ge(t){return t.trim().replace(/^google\//,"").replace(/^models\//,"")||"gemini-2.5-flash"}function xe(t,e){let o="";try{let a=JSON.parse(t);o=a.error?.message||a.message||""}catch{o=t.slice(0,160)}return/API_KEY_INVALID|API key not valid|key.*invalid|unregistered/i.test(o)?"Chave de API do Gemini inv\xE1lida ou n\xE3o autorizada no Google AI Studio.":/RESOURCE_EXHAUSTED|Quota exceeded/i.test(o)||e===429?"Limite tempor\xE1rio de cota do Gemini (HTTP 429) atingido. Aguardando recupera\xE7\xE3o...":e===404?`HTTP 404: ${o||"Modelo ou endpoint n\xE3o encontrado no Google AI Studio"}`:e===503||/overloaded/i.test(o)?`Servidores Google sobrecarregados (HTTP 503): ${o||"Aguardando"}`:o?`Erro Gemini (HTTP ${e}): ${o}`:`Falha na requisi\xE7\xE3o ao Gemini (HTTP ${e}).`}function Qe(t){try{return JSON.parse(t)}catch(e){let o=t.trim(),a=[o+"}",o+"]}",o+'"}]}',o+'"]}',o+"}]}",o+"}]}}"];for(let s of a)try{let n=JSON.parse(s);if(n&&typeof n=="object")return n}catch{}throw new Error(`Falha ao decodificar JSON da IA (${e instanceof Error?e.message:"incompleto"})`)}}var _=null,oe=new Set;async function G(t){let e=t.trim().replace(/^["']|["']$/g,"");if(!e)return S;let o=[`https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(e)}`,`https://generativelanguage.googleapis.com/v1/models?key=${encodeURIComponent(e)}`];for(let a of o)try{let s=await fetch(a,{headers:{"Content-Type":"application/json","x-goog-api-key":e}});if(!s.ok){let i=await s.text(),r=xe(i,s.status);if(r.includes("inv\xE1lida")||r.includes("n\xE3o autorizada"))throw new Error(r);continue}let n=await s.json();if(Array.isArray(n.models)&&n.models.length>0){let i=n.models.filter(r=>{let c=r.supportedGenerationMethods||[],u=(r.name||"").includes("gemini"),l=c.includes("generateContent"),d=(r.name||"").includes("embedding")||(r.name||"").includes("tts")||(r.name||"").includes("imagen")||(r.name||"").includes("aqa")||(r.name||"").includes("computer-use");return u&&l&&!d}).map(r=>{let c=r.name.replace(/^models\//,""),u=r.displayName||c;return{id:c,name:u.includes(c)?u:`${u} (${c})`,description:r.description||""}});if(i.length>0)return i.sort((r,c)=>{let u=l=>l==="gemini-2.5-flash"?100:l==="gemini-3.5-flash"?95:l==="gemini-3.1-flash-lite"?90:l==="gemini-2.5-pro"?85:l==="gemini-3.1-pro"?80:l==="gemini-1.5-flash"?60:l.includes("flash")?50:10;return u(c.id)-u(r.id)}),_=i,i}}catch(s){if(s.message?.includes("Chave de API"))throw s}return S}async function Ee(t){let e=t.trim().replace(/^["']|["']$/g,"");if(!e)return{ok:!1,message:"Insira sua chave de API."};try{let a=await G(e);if(a.length>0&&a!==S){let s=a[0];return{ok:!0,message:`Chave v\xE1lida! ${a.length} modelos Gemini dispon\xEDveis em sua conta. Recomendado: ${s.name}`,models:a}}}catch(a){return{ok:!1,message:a instanceof Error?a.message:String(a)}}let o=["gemini-2.5-flash","gemini-3.5-flash","gemini-1.5-flash"];for(let a of o)for(let s of["v1beta","v1"]){let n=`https://generativelanguage.googleapis.com/${s}/models/${a}:generateContent?key=${encodeURIComponent(e)}`;try{if((await fetch(n,{method:"POST",headers:{"Content-Type":"application/json","x-goog-api-key":e},body:JSON.stringify({contents:[{role:"user",parts:[{text:"PING"}]}],generationConfig:{maxOutputTokens:5}})})).ok)return{ok:!0,message:`Chave validada com sucesso no ${a} (${s})!`,models:S}}catch{}}return{ok:!1,message:"Chave de API inv\xE1lida, sem cota ou sem permiss\xE3o para modelos Gemini."}}async function ne(t,e,o,a){let s=o.apiKey.trim().replace(/^["']|["']$/g,"");if(!s)throw new Error("Chave de API n\xE3o configurada.");let n=Ge(o.model);if(!_||_.length===0)try{a?.("Verificando modelos autorizados na sua chave de API...","info"),await G(s)}catch(p){let m=p instanceof Error?p.message:String(p);if(m.includes("inv\xE1lida")||m.includes("n\xE3o autorizada"))throw new Error(m)}let r=[{text:be(t,e,o)}];for(let p of e)r.push({inline_data:{mime_type:p.mediaType,data:p.base64}});let c={system_instruction:{parts:[{text:ve}]},contents:[{role:"user",parts:r}],generationConfig:{temperature:.05,maxOutputTokens:2500,response_mime_type:"application/json",response_schema:_e}},u=[n,..._?.map(p=>p.id)||[],"gemini-2.5-flash","gemini-3.5-flash","gemini-3.1-flash-lite","gemini-2.5-pro","gemini-3.1-pro","gemini-1.5-flash"],l=Array.from(new Set(u)).filter(p=>!oe.has(p));l.length===0&&(oe.clear(),l.push(...S.map(p=>p.id)));let d=new Error("Nenhum modelo tentado.");for(let p=0;p<l.length;p++){let m=l[p],P=l[p+1];a?.(`Aguardando resposta da API (${m})...`,"info");let M=["v1beta","v1"];for(let T of M){let R=`https://generativelanguage.googleapis.com/${T}/models/${m}:generateContent?key=${encodeURIComponent(s)}`,$=new AbortController,pe=setTimeout(()=>$.abort(),35e3);try{let E=await fetch(R,{method:"POST",headers:{"Content-Type":"application/json","x-goog-api-key":s},body:JSON.stringify(c),signal:$.signal});if(clearTimeout(pe),!E.ok){let Oe=await E.text(),De=xe(Oe,E.status);if(E.status===404&&T==="v1beta")continue;throw new Error(De)}let he=await E.json(),Z=he.candidates?.[0];if(!Z||!Z.content?.parts?.[0]?.text)throw new Error("A IA n\xE3o retornou uma resposta estruturada v\xE1lida.");let $e=Z.content.parts[0].text,x=Qe($e);return Array.isArray(x.actions)||(x.actions=[]),Array.isArray(x.warnings)||(x.warnings=[]),typeof x.confidence!="number"&&(x.confidence=.8),x.usedModel=m,m!==n&&a?.(`Resolvido com sucesso pelo fallback '${m}' (${T})!`,"info"),{plan:x,rawUsage:he.usageMetadata,usedModel:m}}catch(E){if(clearTimeout(pe),d=E,d.message.includes("inv\xE1lida")||d.message.includes("n\xE3o autorizada"))throw d}}let Pe=d.message.includes("429")||d.message.includes("cota"),Re=d.message.includes("503")||d.message.includes("sobrecarregado");if(d.message.includes("404")&&oe.add(m),P){let T=Pe?3500:Re?2500:900,R=`Modelo '${m}' indispon\xEDvel (${d.message}). Aguardando ${T/1e3}s antes de alternar para '${P}'...`;console.warn(`[EasyQuiz Fallback] ${R}`),a?.(R,"warning"),await new Promise($=>setTimeout($,T))}else console.warn(`[EasyQuiz Fallback] Modelo '${m}' falhou: ${d.message}. Todos os modelos esgotados.`)}throw d}w();k();w();j();function f(t){if(!t)return null;let e=t.trim(),o=CSS.escape(e),a=document.querySelector(`[data-easyquiz-id="${o}"]`);if(a)return a;try{if(a=document.querySelector(e),a)return a}catch{}if(a=document.querySelector(`#${o}, [name="${o}"]`),a)return a;try{let i=e.replace(/"/g,""),r=`//*[text()="${i}"] | //*[contains(text(),"${i}")] | //*[@aria-label="${i}"] | //*[@data-category="${i}"] | //*[@data-testid="${i}"]`,c=document.evaluate(r,document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);if(c.singleNodeValue)return c.singleNodeValue}catch{}let s=cleanText(e).toLowerCase().replace(/['"“”«»]/g,""),n=Array.from(document.querySelectorAll('button, a, div, span, li, p, label, input, [draggable="true"], [data-testid], [class*="option"], [class*="card"]'));for(let i of n){let r=cleanText(i.textContent).toLowerCase().replace(/['"“”«»]/g,""),c=cleanText(i.getAttribute("aria-label")).toLowerCase().replace(/['"“”«»]/g,""),u=cleanText(i.getAttribute("data-category")).toLowerCase().replace(/['"“”«»]/g,""),l=cleanText(i.getAttribute("data-testid")).toLowerCase();if(r===s||c===s||u===s||l===s)return i}if(s.length>6)for(let i of n){if(i.children.length>6)continue;let r=cleanText(i.textContent).toLowerCase().replace(/['"“”«»]/g,"");if(r.includes(s)||r.length>10&&s.includes(r))return i}return null}function L(t,e){for(let o of e)t.dispatchEvent(new Event(o,{bubbles:!0,composed:!0}))}function g(t,e){let o=0,a=0;if(e&&e.length===2)o=e[0],a=e[1];else{let n=t.getBoundingClientRect();o=n.left+n.width/2,a=n.top+n.height/2}let s={bubbles:!0,cancelable:!0,composed:!0,clientX:o,clientY:a};t.dispatchEvent(new PointerEvent("pointerdown",s)),t.dispatchEvent(new MouseEvent("mousedown",s)),t.dispatchEvent(new PointerEvent("pointerup",s)),t.dispatchEvent(new MouseEvent("mouseup",s)),t.click()}function Me(t,e){if(t instanceof HTMLInputElement||t instanceof HTMLTextAreaElement){let o=t instanceof HTMLTextAreaElement?HTMLTextAreaElement.prototype:HTMLInputElement.prototype,a=Object.getOwnPropertyDescriptor(o,"value")?.set;a?a.call(t,e):t.value=e,L(t,["input","change","blur"]);return}if(t.isContentEditable){t.textContent=e,L(t,["input","change","blur"]);return}throw new Error(`N\xE3o \xE9 poss\xEDvel injetar texto em <${t.tagName.toLowerCase()}>`)}function Ce(t,e){if(t instanceof HTMLInputElement&&["checkbox","radio"].includes(t.type)){t.checked!==e&&t.click(),t.checked!==e&&(Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"checked")?.set?.call(t,e),L(t,["input","change"]));return}let o=t.getAttribute("role");if(o==="radio"||o==="checkbox"){t.getAttribute("aria-checked")==="true"!==e&&(g(t),t.setAttribute("aria-checked",e?"true":"false"),L(t,["input","change"]));return}g(t)}function Ye(t,e){if(t instanceof HTMLSelectElement){for(let o of Array.from(t.options))o.selected=e.includes(o.value);L(t,["input","change"]);return}throw new Error("Elemento n\xE3o \xE9 select.")}function Je(){let t={};return{dropEffect:"move",effectAllowed:"all",files:[],items:[],types:["text/plain"],clearData:e=>{e?delete t[e]:Object.keys(t).forEach(o=>delete t[o])},getData:e=>t[e]||"",setData:(e,o)=>{t[e]=o},setDragImage:()=>{}}}function le(t,e){let o=Je(),a=t.getBoundingClientRect(),s=e.getBoundingClientRect(),n={clientX:a.left+a.width/2,clientY:a.top+a.height/2,bubbles:!0,cancelable:!0},i={clientX:s.left+s.width/2,clientY:s.top+s.height/2,bubbles:!0,cancelable:!0};t.dispatchEvent(new PointerEvent("pointerdown",n)),t.dispatchEvent(new MouseEvent("mousedown",n)),t.dispatchEvent(new DragEvent("dragstart",{...n,dataTransfer:o})),e.dispatchEvent(new DragEvent("dragenter",{...i,dataTransfer:o})),e.dispatchEvent(new DragEvent("dragover",{...i,dataTransfer:o})),e.dispatchEvent(new DragEvent("drop",{...i,dataTransfer:o})),t.dispatchEvent(new DragEvent("dragend",{...n,dataTransfer:o})),e.dispatchEvent(new PointerEvent("pointerup",i)),e.dispatchEvent(new MouseEvent("mouseup",i))}var Le={fill:(t,e)=>{let o=f(t);o?Me(o,e):console.warn(`$eq.fill: Elemento ${t} n\xE3o encontrado`)},click:t=>{let e=f(t);e?g(e):console.warn(`$eq.click: Elemento ${t} n\xE3o encontrado`)},check:(t,e)=>{let o=f(t);o?Ce(o,e):console.warn(`$eq.check: Elemento ${t} n\xE3o encontrado`)},drag:(t,e)=>{let o=f(t),a=f(e);o&&a?le(o,a):console.warn(`$eq.drag: Origem ou destino n\xE3o encontrado (${t} -> ${e})`)},categorize:(t,e)=>{let o=f(t),a=f(e);if(!o||!a){console.warn(`$eq.categorize: Item ou categoria n\xE3o encontrados (${t} -> ${e})`);return}le(o,a),g(o),setTimeout(()=>{g(a)},150)}};window.$eq=Le;async function ke(t){if(t.t==="js"){let a=String(t.v||"");try{new Function("$eq","document","window",a)(Le,document,window)}catch(s){console.warn("[EasyQuiz JS Execution]",s)}return}if(t.t==="drag"){let a=f(t.from),s=f(t.to);if(a&&s){le(a,s),g(a),await new Promise(i=>setTimeout(i,150)),g(s);let n=s.querySelector('[data-role="dropzone"], [class*="bucket" i], [class*="drop" i]');n&&n!==s&&g(n)}else console.warn(`[EasyQuiz] Drag: alvo n\xE3o encontrado (${t.from} -> ${t.to})`);return}let e=t.id||"",o=f(e);if(!o&&t.t!=="adv"){console.warn(`[EasyQuiz] Alvo '${e}' n\xE3o encontrado para a\xE7\xE3o '${t.t}'. Prosseguindo...`);return}switch(t.t){case"val":o&&Me(o,String(t.v));break;case"chk":o&&Ce(o,!!t.c);break;case"sel":if(o){let s=Array.isArray(t.v)?t.v:[String(t.v)];Ye(o,s)}break;case"clk":o&&g(o,t.co);break;case"adv":let a=o;if(!a){let s=Array.from(document.querySelectorAll('button, a, input[type="submit"]')).filter(n=>Q.test(n.textContent||n.value||""));s.length&&(a=s[0])}if(a){let s=t.id||a.textContent?.trim()||a.value?.trim()||"";s&&ee(window.location.hostname,{advanceSelector:s}),g(a)}else console.warn("[EasyQuiz] Bot\xE3o de avan\xE7o n\xE3o localizado.");break}}async function Ie(t,e){let o=t.actions.filter(n=>n.t!=="adv"),a=t.actions.filter(n=>n.t==="adv");for(let n of o)await ke(n),n.t==="drag"&&await new Promise(i=>setTimeout(i,350));let s=!1;if(e){let n=Array.from(document.querySelectorAll('button, [role="button"], input[type="submit"]')).find(i=>/(verificar|checar|check|conferir)/i.test(i.textContent||i.value||""));if(n&&isVisible(n)&&(g(n),await new Promise(i=>setTimeout(i,800))),a.length>0)await new Promise(i=>setTimeout(i,600)),ke(a[0]),s=!0;else if(n){await new Promise(r=>setTimeout(r,600));let i=Array.from(document.querySelectorAll('button, [role="button"], a, input[type="submit"]')).find(r=>/(próxim[oa]|next|continuar|avançar|mostrar resumo)/i.test(r.textContent||r.value||""));i&&isVisible(i)&&(g(i),s=!0)}}return{applied:o.length,advanced:s}}var I=null,H=[];function z(){I&&(I.style.removeProperty("outline"),I.style.removeProperty("outline-offset"),I=null);for(let t of H)t.style.removeProperty("outline"),t.style.removeProperty("outline-offset"),t.style.removeProperty("background-color");H=[]}function ce(t){z(),I=t,t.style.outline="2px solid #00e5ff",t.style.outlineOffset="4px"}function He(t){for(let e of t){if(e.t==="adv"||e.t==="js")continue;if(e.t==="drag"){try{let n=document.querySelector(`[data-easyquiz-id="${CSS.escape(e.from)}"]`)||document.querySelector(e.from),i=document.querySelector(`[data-easyquiz-id="${CSS.escape(e.to)}"]`)||document.querySelector(e.to);n&&(n.style.outline="2px solid #00ff88",H.push(n)),i&&(i.style.outline="2px dashed #00e5ff",H.push(i))}catch{}continue}if(!e.id)continue;let o=CSS.escape(e.id),a=document.querySelector(`[data-easyquiz-id="${o}"]`);if(!a)continue;let s=a.closest('label, [role="listitem"], .answer, .form-check')||a;s.style.outline="2px solid #00ff88",s.style.outlineOffset="2px",s.style.backgroundColor="rgba(0, 255, 136, 0.08)",H.push(s)}}j();var B=4,Xe=1200,de=12e5;function Y(t){return new Promise((e,o)=>{let a=new FileReader;a.onerror=()=>o(new Error("Falha ao converter blob para base64.")),a.onload=()=>{let s=String(a.result||"");e(s.split(",")[1]||"")},a.readAsDataURL(t)})}async function J(t){let e=0,o=0;if(t instanceof HTMLImageElement?(e=t.naturalWidth||t.width,o=t.naturalHeight||t.height):(e=t.width,o=t.height),e<=0||o<=0)throw new Error("Dimens\xF5es inv\xE1lidas.");let a=Math.min(1,Xe/Math.max(e,o)),s=Math.max(1,Math.round(e*a)),n=Math.max(1,Math.round(o*a)),i=document.createElement("canvas");i.width=s,i.height=n;let r=i.getContext("2d",{alpha:!1});if(!r)throw new Error("Sem suporte a Canvas 2D.");return r.fillStyle="#ffffff",r.fillRect(0,0,s,n),r.drawImage(t,0,0,s,n),new Promise((c,u)=>{i.toBlob(l=>l?c(l):u(new Error("Falha compress\xE3o.")),"image/jpeg",.8)})}async function ze(t){try{let e=t.cloneNode(!0),o=t.offsetWidth||500,a=t.offsetHeight||500,s=`
      <svg xmlns="http://www.w3.org/2000/svg" width="${o}" height="${a}">
        <foreignObject width="100%" height="100%">
          <div xmlns="http://www.w3.org/1999/xhtml" style="background:#fff;font-family:sans-serif;">
            ${e.innerHTML}
          </div>
        </foreignObject>
      </svg>
    `,n=new Blob([s],{type:"image/svg+xml;charset=utf-8"}),i=URL.createObjectURL(n),r=new Image;r.crossOrigin="anonymous",await new Promise((l,d)=>{r.onload=l,r.onerror=d,r.src=i});let c=await J(r),u=await Y(c);if(URL.revokeObjectURL(i),u&&u.length<=de)return{mediaType:"image/jpeg",base64:u,alt:"Captura Suprema via rasteriza\xE7\xE3o DOM",source:"rasterized"}}catch(e){console.warn("Falha na rasteriza\xE7\xE3o suprema:",e)}return null}async function We(t){let e=t.currentSrc||t.src;if(!e)return null;let o=(t.alt||t.getAttribute("aria-label")||"Imagem da quest\xE3o").slice(0,500);if(t.complete&&t.naturalWidth>0)try{let a=await J(t),s=await Y(a);if(s&&s.length<=de)return{mediaType:"image/jpeg",base64:s,alt:o,source:e.slice(0,2e3)}}catch{}try{let a=await fetch(e,{mode:"cors"});if(a.ok){let s=await a.blob();if(s.type.startsWith("image/")){let n=await createImageBitmap(s),i=await J(n);n.close();let r=await Y(i);if(r&&r.length<=de)return{mediaType:"image/jpeg",base64:r,alt:o,source:e.slice(0,2e3)}}}}catch{return ze(t.parentElement||t)}return null}async function ue(t){let e=[],o=0,a=Array.from(t.querySelectorAll("img")).filter(y).slice(0,B);for(let s of a)try{let n=await We(s);if(n&&o+n.base64.length<=25e5&&(e.push(n),o+=n.base64.length,e.length>=B))break}catch{}if(e.length<B){let s=Array.from(t.querySelectorAll("canvas")).filter(y).slice(0,B);for(let n of s)try{let i=await J(n),r=await Y(i);if(r&&o+r.length<=25e5&&(e.push({mediaType:"image/jpeg",base64:r,alt:"Canvas inline",source:"canvas"}),o+=r.length,e.length>=B))break}catch{let i=await ze(n.parentElement||n);i&&(e.push(i),o+=i.base64.length)}}return e}w();w();k();var X=class{active=!1;timer=null;callbacks;lastRunTime=0;lastActionTime=0;isProcessing=!1;constructor(e){this.callbacks=e}isActive(){return this.active}start(){this.active||(this.active=!0,this.lastActionTime=Date.now(),this.callbacks.onStatusChange("waiting","> [SYS] Autopilot ENGAGED. Monitorando..."),this.loop())}stop(){this.active=!1,this.timer&&clearTimeout(this.timer),this.callbacks.onStatusChange("idle","> [SYS] Autopilot DESATIVADO.")}errorCount=0;async loop(){if(!this.active)return;let e=Date.now();if(e-this.lastRunTime<2500||this.isProcessing){this.timer=window.setTimeout(()=>this.loop(),500);return}this.lastRunTime=e;try{this.isProcessing=!0;let o=q(!1);if(!o){let{captureFullPageText:a}=await Promise.resolve().then(()=>(k(),U));o=a()}if(o){let a=o.controls.filter(n=>n.role==="answer"),s=N(window.location.hostname);if(a.length>0){this.callbacks.onStatusChange("analyzing","> [IA] Quest\xE3o/Exerc\xEDcio detectado. Consultando IA...","text-blue"),await new Promise(i=>setTimeout(i,600));let n=await this.callbacks.onRequestAnalysis();if(n){if(this.callbacks.onStatusChange("analyzing",`> [IA] (${n.usedModel||"gemini"}) Confian\xE7a: ${(n.confidence*100).toFixed(1)}% | Modo: ${n.mode}`,"text-blue"),this.callbacks.onStatusChange("analyzing",`> [IA] Racioc\xEDnio: ${n.rationale}`,"text-blue"),this.callbacks.onStatusChange("analyzing",`> [IA] A\xE7\xF5es geradas: ${n.actions.length}`,"text-blue"),this.errorCount=0,n.memoryToStore&&this.callbacks.onStatusChange("analyzing",`> [IA] \u{1F9E0} Mem\xF3ria RAG salva: "${n.memoryToStore}"`,"text-yellow"),n.pageType==="conclusion"){this.callbacks.onStatusChange("idle","> [SYS] Atividade conclu\xEDda! Desligando Autopilot.","text-green"),this.stop();return}}else{this.errorCount++;let i=this.errorCount===1?5e3:8e3;this.callbacks.onStatusChange("waiting",`> [AVISO] Falha na an\xE1lise (${this.errorCount}/3). Aguardando ${i/1e3}s para estabiliza\xE7\xE3o antes de tentar novamente...`,"text-yellow"),await new Promise(r=>setTimeout(r,i))}this.lastActionTime=Date.now()}else if(s.advanceSelector&&f(s.advanceSelector)&&o.questionText.length<50){let n=f(s.advanceSelector);n&&(this.callbacks.onStatusChange("advancing",`> [BRUTE] Avan\xE7ando via cache "${s.advanceSelector}"...`),await new Promise(i=>setTimeout(i,1e3)),g(n),this.lastActionTime=Date.now(),this.errorCount=0)}else{this.callbacks.onStatusChange("analyzing","> [IA] P\xE1gina informativa/contexto detectada. Lendo e consultando IA...","text-blue"),await new Promise(i=>setTimeout(i,600));let n=await this.callbacks.onRequestAnalysis();if(n){if(this.callbacks.onStatusChange("analyzing",`> [IA] (${n.usedModel||"gemini"}) Tipo: ${n.pageType} | Modo: ${n.mode}`,"text-blue"),this.callbacks.onStatusChange("analyzing",`> [IA] Racioc\xEDnio: ${n.rationale}`,"text-blue"),n.memoryToStore&&this.callbacks.onStatusChange("analyzing",`> [IA] \u{1F9E0} Conte\xFAdo absorvido na mem\xF3ria: "${n.memoryToStore}"`,"text-yellow"),n.pageType==="info")this.callbacks.onStatusChange("advancing","> [IA] \u{1F4D6} Leitura conclu\xEDda. Avan\xE7ando automaticamente...","text-green");else if(n.pageType==="start")this.callbacks.onStatusChange("advancing","> [SYS] In\xEDcio de m\xF3dulo detectado. Iniciando...","text-blue");else if(n.pageType==="conclusion"){this.callbacks.onStatusChange("idle","> [SYS] Atividade conclu\xEDda! Desligando Autopilot.","text-green"),this.stop();return}this.errorCount=0}else{this.errorCount++;let i=this.errorCount===1?5e3:8e3;this.callbacks.onStatusChange("waiting",`> [AVISO] Falha ao processar p\xE1gina (${this.errorCount}/3). Aguardando ${i/1e3}s para estabiliza\xE7\xE3o antes de tentar novamente...`,"text-yellow"),await new Promise(r=>setTimeout(r,i))}this.lastActionTime=Date.now()}if(this.errorCount>=3){this.callbacks.onStatusChange("error","> [ERRO] 3 falhas consecutivas. Abortando Autopilot para poupar sua cota e tokens.","text-red"),this.callbacks.onStatusChange("waiting","> [DICA] Verifique a mensagem vermelha de [ERRO DETALHADO] no console acima para saber o motivo exato.","text-yellow"),this.stop();return}}}catch(o){console.warn("[EasyQuiz Autopilot]",o)}finally{this.isProcessing=!1}this.active&&(this.timer=window.setTimeout(()=>this.loop(),1e3))}};var b={logo:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.8L19.2 8 12 11.2 4.8 8 12 4.8zM4 9.6l7 3.1v7.5l-7-3.5V9.6zm9 10.6v-7.5l7-3.1v7.1l-7 3.5z"/></svg>',analyze:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L3 14h8l-2 8 12-12h-8l2-8z"/></svg>',apply:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>',key:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M7 14c-2.76 0-5-2.24-5-5s2.24-5 5-5c2.42 0 4.44 1.72 4.9 4H22v4h-2v3h-3v-3h-2v3h-3v-3h-2.1c-.46 2.28-2.48 4-4.9 4zm0-7c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>',settings:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M3 5h4v2H3V5zm0 6h10v2H3v-2zm0 6h6v2H3v-2zm14-12h4v2h-4V5zm-4 6h8v2h-8v-2zm-4 6h12v2H9v-2z"/></svg>',close:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>',minimize:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M5 11h14v2H5v-2z"/></svg>',target:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2v4m0 12v4M2 12h4m12 0h4m-8-6a6 6 0 100 12 6 6 0 000-12zm0 4a2 2 0 100 4 2 2 0 000-4z" stroke="currentColor" stroke-width="2" fill="none"/></svg>',eye:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>',eyeOff:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.44-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.17c0-1.66-1.34-3-3-3l-.17.02z"/></svg>',check:'<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>',warning:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>',terminal:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8h16v10zm-12-3l3-3-3-3 1.4-1.4L13.8 12l-4.4 4.4L8 15zm6 0h4v2h-4v-2z"/></svg>'};var Be=`
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;800;900&display=swap');

  :host {
    all: initial;
    color-scheme: dark;
    font-family: 'Nunito', sans-serif;
    font-size: 13px;
    line-height: 1.45;
  }

  * {
    box-sizing: border-box;
    border-radius: 0px !important;
    margin: 0;
    padding: 0;
  }

  :host(.eq-dark-mode-active) .eq-launcher,
  :host(.eq-dark-mode-active) .eq-panel {
    filter: invert(1) hue-rotate(180deg) !important;
  }


  .eq-launcher {
    pointer-events: auto;
    position: fixed;
    right: 20px;
    bottom: 20px;
    z-index: 2147483647;
    width: 52px;
    height: 52px;
    background: #000000;
    border: 2px solid #00ffcc;
    color: #00ffcc;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 3px;
    cursor: pointer;
    font-weight: 900;
    font-size: 11px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    box-shadow: 5px 5px 0px rgba(0,255,204,0.2);
    transition: transform 0.1s, box-shadow 0.1s;
    user-select: none;
  }

  .eq-launcher:hover {
    background: #00ffcc;
    color: #000000;
    box-shadow: 8px 8px 0px rgba(0,0,0,1);
  }

  .eq-launcher:active {
    transform: translate(2px, 2px);
    box-shadow: 2px 2px 0px rgba(0,0,0,1);
  }

  .eq-tabs {
    display: flex;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    background: #151515;
  }
  .eq-tab-btn {
    flex: 1;
    background: transparent;
    border: none;
    color: #888;
    padding: 10px;
    font-size: 13px;
    font-family: 'Nunito', sans-serif;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s;
  }
  .eq-tab-btn:hover {
    color: #fff;
    background: rgba(255, 255, 255, 0.05);
  }
  .eq-tab-btn.active {
    color: #00ffcc;
    border-bottom: 2px solid #00ffcc;
  }

  .eq-autopilot-container {
    padding: 20px 0;
    display: flex;
    flex-direction: column;
    gap: 15px;
    align-items: center;
  }
  #eq-ap-toggle-btn {
    font-size: 16px;
    padding: 15px;
    width: 100%;
  }
  #eq-ap-toggle-btn.active {
    background: #ff4757;
    box-shadow: 0 0 15px rgba(255, 71, 87, 0.4);
    animation: none;
  }
  .eq-pulse {
    animation: eq-pulse-anim 2s infinite;
  }
  @keyframes eq-pulse-anim {
    0% { box-shadow: 0 0 0 0 rgba(0, 255, 204, 0.4); }
    70% { box-shadow: 0 0 0 10px rgba(0, 255, 204, 0); }
    100% { box-shadow: 0 0 0 0 rgba(0, 255, 204, 0); }
  }

  .eq-ap-console {
    width: 100%;
    background: #000;
    border: 1px solid #333;
    border-radius: 6px;
    padding: 10px;
    font-family: 'Courier New', monospace;
    font-size: 11px;
    color: #00ffcc;
    height: 160px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 4px;
    text-align: left;
  }
  .text-blue { color: #5bc0eb; }
  .text-yellow { color: #fde74c; }
  .text-red { color: #ff4757; }
  .text-green { color: #00ff55; }

  .eq-panel {
    pointer-events: auto;
    position: fixed;
    right: 20px;
    bottom: 84px;
    z-index: 2147483647;
    width: 380px;
    max-width: calc(100vw - 32px);
    max-height: min(720px, calc(100vh - 100px));
    background: #0a0a0a;
    border: 2px solid #333333;
    color: #f0f0f0;
    box-shadow: 10px 10px 0px rgba(0,0,0,1);
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .eq-panel[hidden] {
    display: none !important;
  }

  .eq-header {
    background: #111111;
    border-bottom: 2px solid #333333;
    padding: 10px 14px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    user-select: none;
  }

  .eq-brand {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    font-weight: 900;
    letter-spacing: 0.08em;
    color: #00ffcc;
    text-transform: uppercase;
  }

  .eq-brand-badge {
    background: #00ffcc;
    color: #000000;
    font-size: 10px;
    padding: 2px 6px;
    font-weight: 900;
    letter-spacing: 0.05em;
  }

  .eq-header-tools {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .eq-icon-btn {
    width: 28px;
    height: 28px;
    background: transparent;
    border: 1px solid #333333;
    color: #888888;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.15s ease;
  }

  .eq-icon-btn:hover {
    border-color: #00ffcc;
    color: #00ffcc;
    background: #1a1a1a;
  }

  .eq-icon-btn.active {
    background: #00ffcc;
    color: #000000;
    border-color: #00ffcc;
  }

  .eq-content {
    padding: 14px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .eq-section-title {
    font-size: 11px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #777777;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 4px;
  }

  .eq-field-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .eq-input-wrap {
    display: flex;
    position: relative;
  }

  .eq-input {
    width: 100%;
    height: 38px;
    background: #141414;
    border: 1px solid #333333;
    color: #ffffff;
    padding: 0 10px;
    font-family: inherit;
    font-size: 13px;
    font-weight: 700;
    outline: none;
    user-select: text !important;
    -webkit-user-select: text !important;
  }

  .eq-input:focus {
    border-color: #00ffcc;
    background: #1a1a1a;
  }

  .eq-input-action-btn {
    height: 38px;
    padding: 0 10px;
    background: #1a1a1a;
    border: 1px solid #333333;
    border-left: none;
    color: #00ffcc;
    font-size: 11px;
    font-weight: 900;
    text-transform: uppercase;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 4px;
    white-space: nowrap;
    transition: background 0.15s;
  }

  .eq-input-action-btn:hover {
    background: #252525;
  }

  .eq-input-action-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .eq-mini-btn {
    background: transparent;
    border: none;
    color: #00ffcc;
    cursor: pointer;
    font-size: 11px;
    font-weight: 700;
    font-family: inherit;
    padding: 0 4px;
    display: flex;
    align-items: center;
    gap: 3px;
    transition: opacity 0.15s;
  }

  .eq-mini-btn:hover {
    opacity: 0.8;
    text-decoration: underline;
  }

  .eq-select {
    width: 100%;
    height: 38px;
    background: #141414;
    border: 1px solid #333333;
    color: #ffffff;
    padding: 0 8px;
    font-family: inherit;
    font-size: 13px;
    font-weight: 700;
    outline: none;
    cursor: pointer;
  }

  .eq-select:focus {
    border-color: #00ffcc;
  }

  .eq-row-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }

  .eq-checkbox-label {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    font-weight: 700;
    color: #aaaaaa;
    cursor: pointer;
    user-select: none;
  }

  .eq-checkbox-label input[type="checkbox"] {
    appearance: none;
    width: 16px;
    height: 16px;
    background: #141414;
    border: 2px solid #333333;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .eq-checkbox-label input[type="checkbox"]:checked {
    background: #00ffcc;
    border-color: #00ffcc;
  }

  .eq-btn-primary {
    height: 44px;
    background: #00ffcc;
    border: 2px solid #00ffcc;
    color: #000000;
    font-family: inherit;
    font-size: 13px;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    box-shadow: 4px 4px 0px rgba(0,0,0,0.5);
  }

  .eq-btn-primary:hover {
    background: #33ffdb;
    border-color: #33ffdb;
  }

  .eq-btn-primary:active {
    transform: translate(2px, 2px);
    box-shadow: 2px 2px 0px rgba(0,0,0,0.8);
  }

  .eq-btn-primary:disabled {
    background: #1a1a1a;
    border-color: #333333;
    color: #555555;
    cursor: not-allowed;
    box-shadow: none;
    transform: none;
  }

  .eq-btn-secondary {
    height: 40px;
    background: #111111;
    border: 2px solid #00ff55;
    color: #00ff55;
    font-family: inherit;
    font-size: 12px;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    box-shadow: 3px 3px 0px rgba(0,0,0,0.8);
  }

  .eq-btn-secondary:hover {
    background: #00ff55;
    color: #000000;
  }

  .eq-btn-secondary:active {
    transform: translate(2px, 2px);
    box-shadow: 1px 1px 0px rgba(0,0,0,1);
  }

  .eq-btn-secondary:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    border-color: #333333;
    color: #555555;
    background: #141414;
    box-shadow: none;
  }

  .eq-status-box {
    padding: 12px;
    background: #141414;
    border-left: 4px solid #00ffcc;
    font-size: 12px;
    font-weight: 700;
    color: #cccccc;
    line-height: 1.5;
    word-break: break-word;
  }

  .eq-status-box.error {
    border-left-color: #ff3333;
    color: #ff6666;
    background: #1a0a0a;
  }

  .eq-status-box.success {
    border-left-color: #00ff55;
    color: #aaffcc;
    background: #0a1a0a;
  }

  .eq-result-container {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .eq-result-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #111111;
    border: 2px solid #333333;
    padding: 10px;
  }

  .eq-badges {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
  }

  .eq-badge {
    background: #1a1a1a;
    border: 1px solid #333333;
    color: #aaaaaa;
    font-size: 10px;
    font-weight: 900;
    padding: 3px 8px;
    text-transform: uppercase;
  }

  .eq-badge.highlight {
    border-color: #00ffcc;
    color: #00ffcc;
  }

  .eq-badge.success {
    border-color: #00ff55;
    color: #00ff55;
  }

  .eq-rationale-box {
    background: #141414;
    border: 1px solid #333333;
    padding: 12px;
    font-size: 12px;
    font-weight: 700;
    color: #bbbbbb;
  }

  .eq-rationale-title {
    font-size: 11px;
    font-weight: 900;
    color: #00ffcc;
    text-transform: uppercase;
    margin-bottom: 6px;
  }

  .eq-actions-summary {
    background: #141414;
    border: 1px solid #333333;
    padding: 12px;
    font-size: 12px;
    font-weight: 700;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .eq-action-item {
    display: flex;
    align-items: flex-start;
    gap: 6px;
    color: #999999;
  }

  .eq-action-bullet {
    color: #00ff55;
    font-weight: 900;
  }

  .eq-link {
    color: #00ffcc;
    text-decoration: none;
    font-size: 11px;
    font-weight: 900;
  }

  .eq-link:hover {
    text-decoration: underline;
  }

  .eq-footer-note {
    font-size: 10px;
    font-weight: 900;
    color: #555555;
    text-align: center;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    padding-top: 8px;
  }

  @media (max-width: 480px) {
    .eq-panel {
      right: 16px;
      bottom: 76px;
      width: calc(100vw - 32px);
    }
  }
`;var Ze=[{value:"",label:"Detec\xE7\xE3o Autom\xE1tica"},{value:"escolha_unica",label:"M\xFAltipla Escolha (\xDAnica)"},{value:"escolha_multipla",label:"M\xFAltipla Escolha (V\xE1rias)"},{value:"categorizacao",label:"Categoriza\xE7\xE3o / Grupos"},{value:"arrastar_soltar",label:"Arrastar e Soltar (Drag & Drop)"},{value:"ordenacao",label:"Ordena\xE7\xE3o / Sequ\xEAncia"},{value:"verdadeiro_falso",label:"Verdadeiro / Falso"},{value:"texto_livre",label:"Texto Livre / Dissertativa"},{value:"preenchimento",label:"Preenchimento de Lacunas"}],et=[{value:"smart",label:"Inteligente (Auto-H\xEDbrido)"},{value:"command",label:"Apenas Comando (Seguro)"},{value:"javascript",label:"Apenas JS Nativo (Avan\xE7ado)"}],W=class{host;shadow;callbacks;autopilot;initialSettings;launcherBtn;panelEl;statusBox;resultContainer;apiKeyInput;apiKeyEasyInput;saveKeyAdvBtn;saveKeyEasyBtn;testKeyBtn;testKeyEasyBtn;toggleKeyAdvBtn;toggleKeyEasyBtn;modelSelect;modeSelect;engineSelect;dryRunCheckbox;autoApplyCheckbox;autoAdvanceCheckbox;hostDarkModeCheckbox;analyzeBtn;applyBtn;tabEasyBtn;tabAdvBtn;contentEasy;contentAdv;apToggleBtn;apConsole;constructor(e,o){this.initialSettings=e,this.callbacks=o,this.autopilot=new X({onStatusChange:(a,s,n)=>{if(this.apConsole){let i=document.createElement("div");i.textContent=s,n&&i.classList.add(n),this.apConsole.appendChild(i),this.apConsole.scrollTop=this.apConsole.scrollHeight}a==="analyzing"?this.setBusy(!0,"Autopilot: IA analisando..."):(a==="advancing"||a==="waiting")&&this.setBusy(!1)},onRequestAnalysis:async()=>{try{return await this.callbacks.onAnalyze()||null}catch{return null}}}),this.host=document.createElement("div"),this.host.id="easyquiz-shadow-root",this.host.style.position="fixed",this.host.style.top="0",this.host.style.left="0",this.host.style.width="100vw",this.host.style.height="100vh",this.host.style.zIndex="2147483647",this.host.style.pointerEvents="none",this.shadow=this.host.attachShadow({mode:"open"}),this.shadow.innerHTML=`
      <style>${Be}</style>
      <button class="eq-launcher" type="button" title="Abrir EasyQuiz (Alt+Q)">
        ${b.logo}
        <span>EQ</span>
      </button>

      <section class="eq-panel" hidden aria-label="EasyQuiz">
        <header class="eq-header">
          <div class="eq-brand">
            ${b.logo}
            <span>EasyQuiz</span>
            <span class="eq-brand-badge">2.0 SUPREME</span>
          </div>
          <div class="eq-header-tools">
            <button class="eq-icon-btn" id="eq-min-btn" type="button" title="Minimizar">${b.minimize}</button>
            <button class="eq-icon-btn" id="eq-close-btn" type="button" title="Fechar">${b.close}</button>
          </div>
        </header>
        
        <div class="eq-tabs">
          <button class="eq-tab-btn" id="eq-tab-easy">Modo F\xE1cil (Autopilot)</button>
          <button class="eq-tab-btn" id="eq-tab-advanced">Avan\xE7ado</button>
        </div>

        <!-- MODO F\xC1CIL -->
        <div class="eq-content" id="eq-content-easy" style="display: none;">
          <div class="eq-field-group" style="margin-bottom: 2px;">
            <div class="eq-section-title">
              <span>Chave Gemini (API Key)</span>
              <div style="display: flex; gap: 6px;">
                <button class="eq-mini-btn" id="eq-clear-key-easy" type="button" title="Limpar campo">\u{1F9F9} Limpar</button>
                <button class="eq-mini-btn" id="eq-prompt-key-easy" type="button" title="Colar via janela direta">\u270F\uFE0F Inserir</button>
                <button class="eq-mini-btn" id="eq-toggle-key-easy" type="button">\u{1F441}\uFE0F Mostrar</button>
                <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" class="eq-link">
                  Obter Gr\xE1tis
                </a>
              </div>
            </div>
            <div class="eq-input-wrap">
              <input id="eq-api-key-easy" class="eq-input" type="password" placeholder="Cole sua chave AIzaSy..." autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" />
              <button class="eq-input-action-btn" id="eq-save-key-easy" type="button" title="Salvar Chave">\u{1F4BE} Salvar</button>
              <button class="eq-input-action-btn" id="eq-test-key-easy" type="button" title="Testar Chave">${b.key} Testar</button>
            </div>
          </div>

          <div class="eq-autopilot-container" style="padding: 10px 0;">
            <div style="display: flex; gap: 8px; width: 100%;">
              <button class="eq-btn-primary eq-pulse" id="eq-ap-toggle-btn" type="button" style="flex: 1;">
                INICIAR AUTOPILOT
              </button>
              <button class="eq-btn-secondary" id="eq-ap-clear-memory" type="button" title="Limpar Mem\xF3ria de Sess\xE3o">
                \u{1F9E0} Limpar
              </button>
            </div>
            <div class="eq-ap-console" id="eq-ap-console">
              > [SYS] Pronto para ligar...
            </div>
          </div>
          <div class="eq-footer-note">H\xEDbrido 4.0 \u2022 RAG + Brute Force + AI</div>
        </div>

        <!-- MODO AVAN\xC7ADO -->
        <div class="eq-content" id="eq-content-advanced" style="display: none;">
          <div class="eq-field-group">
            <div class="eq-section-title">
              <span>Chave Gemini (API Key)</span>
              <div style="display: flex; gap: 6px;">
                <button class="eq-mini-btn" id="eq-clear-key-adv" type="button" title="Limpar campo">\u{1F9F9} Limpar</button>
                <button class="eq-mini-btn" id="eq-prompt-key-adv" type="button" title="Colar via janela direta">\u270F\uFE0F Inserir</button>
                <button class="eq-mini-btn" id="eq-toggle-key-adv" type="button">\u{1F441}\uFE0F Mostrar</button>
                <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" class="eq-link">
                  Obter Gr\xE1tis
                </a>
              </div>
            </div>
            <div class="eq-input-wrap">
              <input id="eq-api-key" class="eq-input" type="password" placeholder="Cole sua chave AIzaSy..." autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" />
              <button class="eq-input-action-btn" id="eq-save-key-adv" type="button" title="Salvar Chave">\u{1F4BE} Salvar</button>
              <button class="eq-input-action-btn" id="eq-test-key-btn" type="button" title="Testar Chave">${b.key} Testar</button>
            </div>
          </div>

          <div class="eq-row-2">
            <div class="eq-field-group">
              <div class="eq-section-title">Motor de Intelig\xEAncia</div>
              <select id="eq-model-select" class="eq-select"></select>
            </div>
            <div class="eq-field-group">
              <div class="eq-section-title">Motor de Execu\xE7\xE3o</div>
              <select id="eq-engine-select" class="eq-select"></select>
            </div>
          </div>

          <div class="eq-field-group">
            <div class="eq-section-title">Modo da Quest\xE3o (For\xE7ar)</div>
            <select id="eq-mode-select" class="eq-select"></select>
          </div>

          <div class="eq-row-2">
            <label class="eq-checkbox-label">
              <input id="eq-dry-run" type="checkbox" />
              <span>Apenas Simular</span>
            </label>
            <label class="eq-checkbox-label">
              <input id="eq-auto-apply" type="checkbox" />
              <span>Auto Aplicar</span>
            </label>
            <label class="eq-checkbox-label" style="grid-column: span 2;">
              <input id="eq-auto-advance" type="checkbox" />
              <span>Auto Avan\xE7ar para Pr\xF3xima Quest\xE3o</span>
            </label>
            <label class="eq-checkbox-label" style="grid-column: span 2;">
              <input id="eq-host-dark" type="checkbox" />
              <span style="color:#00ffcc;">Habilitar Smart Dark Mode no Site</span>
            </label>
          </div>

          <button class="eq-btn-primary" id="eq-analyze-btn" type="button">
            ${b.analyze} Analisar & Resolver Quest\xE3o
          </button>

          <div class="eq-status-box" id="eq-status">
            Sistema Operante. Aponte para a quest\xE3o ou inicie a an\xE1lise.
          </div>

          <div class="eq-result-container" id="eq-result" style="display: none;">
            <div class="eq-result-header">
              <div class="eq-badges" id="eq-badges"></div>
            </div>
            <div class="eq-rationale-box">
              <div class="eq-rationale-title">Justificativa</div>
              <div id="eq-rationale-text"></div>
            </div>
            <div class="eq-actions-summary">
              <div class="eq-rationale-title">A\xE7\xF5es do Motor H\xEDbrido</div>
              <div id="eq-actions-list"></div>
            </div>
            <button class="eq-btn-secondary" id="eq-apply-btn" type="button">
              ${b.apply} Injetar Respostas na P\xE1gina
            </button>
          </div>
          <div class="eq-footer-note">EQ Engine v2.0 \u2022 100% Client-Side</div>
        </div>
      </section>
    `,this.tabEasyBtn=this.shadow.querySelector("#eq-tab-easy"),this.tabAdvBtn=this.shadow.querySelector("#eq-tab-advanced"),this.contentEasy=this.shadow.querySelector("#eq-content-easy"),this.contentAdv=this.shadow.querySelector("#eq-content-advanced"),this.apToggleBtn=this.shadow.querySelector("#eq-ap-toggle-btn"),this.apConsole=this.shadow.querySelector("#eq-ap-console"),this.launcherBtn=this.shadow.querySelector(".eq-launcher"),this.panelEl=this.shadow.querySelector(".eq-panel"),this.statusBox=this.shadow.querySelector("#eq-status"),this.resultContainer=this.shadow.querySelector("#eq-result"),this.apiKeyInput=this.shadow.querySelector("#eq-api-key"),this.apiKeyEasyInput=this.shadow.querySelector("#eq-api-key-easy"),this.saveKeyAdvBtn=this.shadow.querySelector("#eq-save-key-adv"),this.saveKeyEasyBtn=this.shadow.querySelector("#eq-save-key-easy"),this.testKeyBtn=this.shadow.querySelector("#eq-test-key-btn"),this.testKeyEasyBtn=this.shadow.querySelector("#eq-test-key-easy"),this.toggleKeyAdvBtn=this.shadow.querySelector("#eq-toggle-key-adv"),this.toggleKeyEasyBtn=this.shadow.querySelector("#eq-toggle-key-easy"),this.modelSelect=this.shadow.querySelector("#eq-model-select"),this.modeSelect=this.shadow.querySelector("#eq-mode-select"),this.engineSelect=this.shadow.querySelector("#eq-engine-select"),this.dryRunCheckbox=this.shadow.querySelector("#eq-dry-run"),this.autoApplyCheckbox=this.shadow.querySelector("#eq-auto-apply"),this.autoAdvanceCheckbox=this.shadow.querySelector("#eq-auto-advance"),this.hostDarkModeCheckbox=this.shadow.querySelector("#eq-host-dark"),this.analyzeBtn=this.shadow.querySelector("#eq-analyze-btn"),this.applyBtn=this.shadow.querySelector("#eq-apply-btn"),S.forEach(a=>this.modelSelect.add(new Option(a.name,a.id,!1,a.id===e.model))),Ze.forEach(a=>this.modeSelect.add(new Option(a.label,a.value,!1,a.value===e.modeHint))),et.forEach(a=>this.engineSelect.add(new Option(a.label,a.value,!1,a.value===e.engine))),this.apiKeyInput.value=e.apiKey,this.apiKeyEasyInput.value=e.apiKey,this.dryRunCheckbox.checked=e.dryRun,this.autoApplyCheckbox.checked=e.autoApply,this.autoAdvanceCheckbox.checked=e.autoAdvance,this.hostDarkModeCheckbox.checked=e.hostDarkMode,this.setupEventListeners(),document.body.appendChild(this.host),this.applyHostDarkMode(e.hostDarkMode),this.switchMode(e.uiMode),e.apiKey&&G(e.apiKey).then(a=>{a&&a.length>0&&this.updateModelSelect(a,e.model)}).catch(()=>{}),this.makeDraggable(this.panelEl,this.shadow.querySelector(".eq-header")),this.makeDraggable(this.launcherBtn,this.launcherBtn)}switchMode(e){this.callbacks.onSettingsChange({uiMode:e}),e==="easy"?(this.tabEasyBtn.classList.add("active"),this.tabAdvBtn.classList.remove("active"),this.contentEasy.style.display="block",this.contentAdv.style.display="none",this.initialSettings.autoApply=!0,this.initialSettings.autoAdvance=!0,this.callbacks.onSettingsChange({autoApply:!0,autoAdvance:!0})):(this.autopilot.stop(),this.apToggleBtn.textContent="INICIAR AUTOPILOT",this.apToggleBtn.classList.remove("active"),this.tabEasyBtn.classList.remove("active"),this.tabAdvBtn.classList.add("active"),this.contentEasy.style.display="none",this.contentAdv.style.display="block")}setupEventListeners(){this.tabEasyBtn.addEventListener("click",()=>this.switchMode("easy")),this.tabAdvBtn.addEventListener("click",()=>this.switchMode("advanced")),this.apToggleBtn.addEventListener("click",()=>{if(this.autopilot.isActive())this.autopilot.stop(),this.apToggleBtn.textContent="INICIAR AUTOPILOT",this.apToggleBtn.classList.remove("active");else{if(!this.apiKeyEasyInput.value.trim().replace(/^["']|["']$/g,"")){this.setStatus("Insira sua chave de API Gemini no campo acima antes de ligar o Autopilot.","error"),this.apiKeyEasyInput.focus();return}this.autopilot.start(),this.apToggleBtn.textContent="PARAR AUTOPILOT",this.apToggleBtn.classList.add("active")}}),this.shadow.querySelector("#eq-ap-clear-memory").addEventListener("click",()=>{ae(),this.apConsole.innerHTML='<span style="color:#00ff55">> [SYS] Mem\xF3ria de sess\xE3o limpa com sucesso.</span>'}),this.launcherBtn.addEventListener("click",()=>this.toggle()),this.shadow.querySelector("#eq-min-btn")?.addEventListener("click",()=>this.toggle(!1)),this.shadow.querySelector("#eq-close-btn")?.addEventListener("click",()=>this.toggle(!1));let o=l=>{l.stopPropagation()},a=l=>{let d=l.composedPath();(d.includes(this.apiKeyInput)||d.includes(this.apiKeyEasyInput)||d.includes(this.panelEl))&&l.stopPropagation()};window.addEventListener("keydown",a,!0),window.addEventListener("keyup",a,!0),window.addEventListener("keypress",a,!0),this.apiKeyInput.addEventListener("keydown",o),this.apiKeyEasyInput.addEventListener("keydown",o),this.apiKeyInput.addEventListener("keyup",o),this.apiKeyEasyInput.addEventListener("keyup",o),this.apiKeyInput.addEventListener("keypress",o),this.apiKeyEasyInput.addEventListener("keypress",o);let s=l=>{l.stopPropagation()};this.apiKeyInput.addEventListener("paste",s),this.apiKeyEasyInput.addEventListener("paste",s),this.apiKeyInput.addEventListener("input",()=>{let l=this.apiKeyInput.value;this.apiKeyEasyInput.value!==l&&(this.apiKeyEasyInput.value=l),this.callbacks.onSettingsChange({apiKey:l.trim().replace(/^["']|["']$/g,"")})}),this.apiKeyEasyInput.addEventListener("input",()=>{let l=this.apiKeyEasyInput.value;this.apiKeyInput.value!==l&&(this.apiKeyInput.value=l),this.callbacks.onSettingsChange({apiKey:l.trim().replace(/^["']|["']$/g,"")})});let n=l=>{let d=l.value.trim().replace(/^["']|["']$/g,"");this.apiKeyInput.value=d,this.apiKeyEasyInput.value=d,this.callbacks.onSettingsChange({apiKey:d}),this.setStatus("Chave de API salva com sucesso!","success")};this.saveKeyAdvBtn.addEventListener("click",()=>n(this.apiKeyInput)),this.saveKeyEasyBtn.addEventListener("click",()=>n(this.apiKeyEasyInput));let i=()=>{this.apiKeyInput.value="",this.apiKeyEasyInput.value="",this.callbacks.onSettingsChange({apiKey:""}),this.setStatus("Campo de chave limpo. Cole a nova chave e clique em Salvar.","info"),this.apiKeyEasyInput.focus()};this.shadow.querySelector("#eq-clear-key-easy")?.addEventListener("click",i),this.shadow.querySelector("#eq-clear-key-adv")?.addEventListener("click",i);let r=()=>{let l=this.apiKeyInput.value.trim(),d=window.prompt("Cole sua Chave API do Google Gemini (AI Studio):",l);if(d!==null){let p=d.trim().replace(/^["']|["']$/g,"");this.apiKeyInput.value=p,this.apiKeyEasyInput.value=p,this.callbacks.onSettingsChange({apiKey:p}),this.setStatus("Chave de API inserida e salva com sucesso!","success")}};this.shadow.querySelector("#eq-prompt-key-easy")?.addEventListener("click",r),this.shadow.querySelector("#eq-prompt-key-adv")?.addEventListener("click",r);let c=(l,d)=>{let p=l.type==="password";l.type=p?"text":"password",d.textContent=p?"\u{1F512} Ocultar":"\u{1F441}\uFE0F Mostrar"};this.toggleKeyEasyBtn.addEventListener("click",()=>{c(this.apiKeyEasyInput,this.toggleKeyEasyBtn)}),this.toggleKeyAdvBtn.addEventListener("click",()=>{c(this.apiKeyInput,this.toggleKeyAdvBtn)});let u=async l=>{let d=l.trim().replace(/^["']|["']$/g,"");if(!d)return this.setStatus("Informe ou cole a chave de API.","error");this.apiKeyInput.value=d,this.apiKeyEasyInput.value=d,this.callbacks.onSettingsChange({apiKey:d}),this.setStatus("Validando chave no Google AI Studio e descobrindo modelos...","info"),this.testKeyBtn.disabled=!0,this.testKeyEasyBtn.disabled=!0;try{let p=await Ee(d);this.setStatus(p.message,p.ok?"success":"error"),p.ok&&p.models&&p.models.length>0&&this.updateModelSelect(p.models)}finally{this.testKeyBtn.disabled=!1,this.testKeyEasyBtn.disabled=!1}};this.testKeyBtn.addEventListener("click",()=>u(this.apiKeyInput.value)),this.testKeyEasyBtn.addEventListener("click",()=>u(this.apiKeyEasyInput.value)),this.modelSelect.addEventListener("change",()=>this.callbacks.onSettingsChange({model:this.modelSelect.value})),this.modeSelect.addEventListener("change",()=>this.callbacks.onSettingsChange({modeHint:this.modeSelect.value})),this.engineSelect.addEventListener("change",()=>this.callbacks.onSettingsChange({engine:this.engineSelect.value})),this.dryRunCheckbox.addEventListener("change",()=>this.callbacks.onSettingsChange({dryRun:this.dryRunCheckbox.checked})),this.autoApplyCheckbox.addEventListener("change",()=>this.callbacks.onSettingsChange({autoApply:this.autoApplyCheckbox.checked})),this.autoAdvanceCheckbox.addEventListener("change",()=>this.callbacks.onSettingsChange({autoAdvance:this.autoAdvanceCheckbox.checked})),this.hostDarkModeCheckbox.addEventListener("change",()=>{let l=this.hostDarkModeCheckbox.checked;this.callbacks.onSettingsChange({hostDarkMode:l}),this.applyHostDarkMode(l)}),this.analyzeBtn.addEventListener("click",()=>this.callbacks.onAnalyze()),this.applyBtn.addEventListener("click",()=>this.callbacks.onApply())}applyHostDarkMode(e){let o="eq-host-dark-mode-style",a=document.getElementById(o);if(e){let s=window.getComputedStyle(document.body).backgroundColor;(s.includes("rgba(0, 0, 0, 0)")||s==="transparent")&&(s=window.getComputedStyle(document.documentElement).backgroundColor);let n=s.match(/\d+(\.\d+)?/g);if(n&&n.length>=3&&(n[3]!==void 0?parseFloat(n[3]):1)>.1){let r=parseInt(n[0]),c=parseInt(n[1]),u=parseInt(n[2]),l=(r*299+c*587+u*114)/1e3;if(l<100){console.log("[EasyQuiz] Fundo escuro detectado (Brightness: "+l+"). Smart Dark Mode preventivamente suspenso.");return}}a||(a=document.createElement("style"),a.id=o,a.innerHTML=`
          html { filter: invert(1) hue-rotate(180deg) !important; background: #fff !important; }
          img, video, canvas, [style*="background-image"] { filter: invert(1) hue-rotate(180deg) !important; }
        `,document.head.appendChild(a)),this.host.classList.add("eq-dark-mode-active")}else this.host.classList.remove("eq-dark-mode-active"),a&&a.remove()}makeDraggable(e,o){let a=!1,s=0,n=0,i=0,r=0;o.style.cursor="grab",o.addEventListener("mousedown",c=>{if(c.target.closest("button"))return;a=!0,o.style.cursor="grabbing",s=c.clientX,n=c.clientY;let u=e.getBoundingClientRect();i=u.left,r=u.top,e.style.right="auto",e.style.bottom="auto",e.style.left=i+"px",e.style.top=r+"px",c.preventDefault()}),document.addEventListener("mousemove",c=>{if(!a)return;let u=c.clientX-s,l=c.clientY-n;e.style.left=i+u+"px",e.style.top=r+l+"px"}),document.addEventListener("mouseup",()=>{a&&(a=!1,o.style.cursor="grab")})}toggle(e){let o=e!==void 0?!e:!this.panelEl.hidden;this.panelEl.hidden=o,!o&&!this.apiKeyInput.value&&this.apiKeyInput.focus()}setBusy(e,o){this.analyzeBtn.disabled=e,[this.modelSelect,this.modeSelect,this.engineSelect,this.dryRunCheckbox,this.autoApplyCheckbox,this.autoAdvanceCheckbox].forEach(a=>a.disabled=e),o&&this.setStatus(o,"info")}setStatus(e,o="info"){if(this.statusBox.textContent=e,this.statusBox.className=`eq-status-box ${o}`,this.apConsole){let a=document.createElement("div"),s=e.includes("Alternando")||e.includes("indispon\xEDvel")||e.includes("fallback")||e.includes("alternativo"),n=o==="error"?"> [ERRO DETALHADO] ":o==="success"?"> [SUCESSO] ":s?"> [FALLBACK] ":"> [SYS] ";a.textContent=`${n}${e}`,o==="error"?a.className="text-red":o==="success"?a.className="text-green":s?a.className="text-yellow":a.className="text-blue",this.apConsole.appendChild(a),this.apConsole.scrollTop=this.apConsole.scrollHeight}}updateModelSelect(e,o){let a=o||this.modelSelect.value||this.initialSettings.model;this.modelSelect.innerHTML="";let s=!1;e.forEach(n=>{let i=n.id===a;i&&(s=!0),this.modelSelect.add(new Option(n.name,n.id,!1,i))}),!s&&e.length>0&&(this.modelSelect.selectedIndex=0,this.callbacks.onSettingsChange({model:this.modelSelect.value}))}updateSelectedModel(e){Array.from(this.modelSelect.options).some(a=>a.value===e)||this.modelSelect.add(new Option(`Gemini (${e})`,e,!1,!0)),this.modelSelect.value=e}setPlan(e,o){this.resultContainer.style.display="flex";let a=this.shadow.querySelector("#eq-badges");a.innerHTML=`
      <span class="eq-badge highlight">${e.mode.replace("_"," ")}</span>
      <span class="eq-badge ${e.confidence>=.8?"success":""}">${Math.round(e.confidence*100)}% Confian\xE7a</span>
      <span class="eq-badge">${e.actions.length} Cmds</span>
      ${e.usedModel?`<span class="eq-badge" style="border-color: #5bc0eb; color: #5bc0eb;">${e.usedModel}</span>`:""}
    `;let s=this.shadow.querySelector("#eq-rationale-text");s.textContent=e.rationale;let n=this.shadow.querySelector("#eq-actions-list");n.innerHTML="";for(let i of e.actions){let r=document.createElement("div");r.className="eq-action-item";let c="";i.t==="chk"?c=`[CHK] ${i.id}`:i.t==="val"?c=`[INJ] "${i.v}" em ${i.id}`:i.t==="sel"?c=`[SEL] ${Array.isArray(i.v)?i.v.join(","):i.v} em ${i.id}`:i.t==="clk"?c=`[CLK] ${i.id}`:i.t==="adv"?c="[AVAN\xC7AR]":i.t==="js"&&(c=`[JS] ${String(i.v)}`),r.innerHTML=`<span class="eq-action-bullet">\u25A0</span> <span>${c}</span>`,n.appendChild(r)}this.applyBtn.disabled=!o||!e.actions.length}destroy(){this.autopilot.stop(),this.applyHostDarkMode(!1),this.callbacks.onDestroy(),this.host.remove()}};async function tt(){let t=window;if(t.__easyquiz){t.__easyquiz.toggle();return}let e=K(),o=null,a=new W(e,{onAnalyze:()=>s(),onApply:()=>void n(),onDestroy:()=>{z(),delete t.__easyquiz},onSettingsChange:i=>{e=C(i)}});t.__easyquiz={toggle:()=>a.toggle(),destroy:()=>a.destroy(),analyze:()=>void s()},window.addEventListener("keydown",i=>{if(i.altKey&&(i.key==="q"||i.key==="Q")){if(i.preventDefault(),!a)return;a.toggle(!0),s()}});async function s(){if(!e.apiKey){a.setStatus("Configure sua chave de API Gemini acima para come\xE7ar.","error"),a.toggle(!0);return}a.setBusy(!0,"Identificando o bloco da quest\xE3o ativa na p\xE1gina..."),z();try{let i=q(!1);if(!i){a.setStatus("Nenhum controle detectado. Tentando captura de tela inteira...","info");let{captureFullPageText:l}=await Promise.resolve().then(()=>(k(),U));i=l()}ce(i.scope),a.setStatus(`Quest\xE3o localizada (${i.controls.length} controles). Otimizando imagens...`,"info");let r=await ue(i.scope);a.setStatus(`Consultando Gemini (${e.model}) com ${r.length} imagem(ns) anexada(s)...`,"info");let{plan:c,usedModel:u}=await ne(i,r,e,(l,d)=>{a.setStatus(l,d==="warning"?"info":d)});if(u&&u!==e.model&&(e.model=u,C({model:u}),a.updateSelectedModel(u)),c.needsMoreContext){if(a.setStatus("Enunciado ou contexto isolado detectado pela IA. Acionando Sele\xE7\xE3o Geral Expandida...","info"),i=q(!0),!i){let{captureFullPageText:d}=await Promise.resolve().then(()=>(k(),U));i=d()}ce(i.scope),r=await ue(i.scope),a.setStatus(`Reconsultando IA com escopo ampliado (${i.controls.length} controles)...`,"info");let l=await ne(i,r,e,(d,p)=>{a.setStatus(d,p==="warning"?"info":p)});c=l.plan,l.usedModel&&l.usedModel!==e.model&&(e.model=l.usedModel,C({model:l.usedModel}),a.updateSelectedModel(l.usedModel))}if(c.memoryToStore){let{addSessionMemory:l}=await Promise.resolve().then(()=>(w(),ye));l(c.memoryToStore),console.log("[EasyQuiz] Mem\xF3ria de sess\xE3o armazenada:",c.memoryToStore)}return o=c,He(c.actions),a.setPlan(c,!e.dryRun),c.pageType==="conclusion"?a.setStatus("Atividade conclu\xEDda ou tela final detectada pela IA.","success"):a.setStatus(e.dryRun?"Simula\xE7\xE3o conclu\xEDda. As respostas foram real\xE7adas na p\xE1gina sem altera\xE7\xE3o.":"Resolu\xE7\xE3o pronta! Verifique o realce na tela e aplique quando desejar.","success"),e.autoApply&&!e.dryRun&&await n(),c}catch(i){z();let r=i instanceof Error?i.message:"Falha desconhecida na an\xE1lise.";a.setStatus(r,"error");return}finally{a.setBusy(!1)}}async function n(){if(!o){a.setStatus("Nenhum plano dispon\xEDvel para aplicar. Execute a an\xE1lise primeiro.","error");return}if(e.dryRun){a.setStatus("O modo de simula\xE7\xE3o est\xE1 ativo. Desmarque para poder aplicar.","error");return}let i=e.autoAdvance&&o.confidence>=e.confidenceThreshold&&!o.needsMoreContext;a.setBusy(!0,"Aplicando respostas no formul\xE1rio...");try{let r=await Ie(o,i);a.setStatus(`Sucesso: ${r.applied} resposta(s) preenchida(s)${r.advanced?" e pr\xF3xima quest\xE3o acionada":""}.`,"success")}catch(r){let c=r instanceof Error?r.message:"Falha ao aplicar plano.";a.setStatus(c,"error")}finally{a.setBusy(!1)}}a.toggle(!0)}tt().catch(t=>{console.error("[EasyQuiz] Erro fatal na inicializa\xE7\xE3o:",t),window.alert(`EasyQuiz: falha ao iniciar: ${t instanceof Error?t.message:String(t)}`)});})();
