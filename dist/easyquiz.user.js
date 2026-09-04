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
"use strict";(()=>{var He=Object.defineProperty;var B=(t,e)=>()=>(t&&(e=t(t=0)),e);var le=(t,e)=>{for(var a in e)He(t,a,{get:e[a],enumerable:!0})};var b,ce=B(()=>{"use strict";b={apiKey:"",model:"gemini-2.5-flash",uiMode:"advanced",modeHint:"",engine:"smart",dryRun:!1,autoApply:!1,autoAdvance:!1,hostDarkMode:!0,confidenceThreshold:.8}});var ue={};le(ue,{addSessionMemory:()=>Ie,clearSessionMemories:()=>W,getSessionMemories:()=>X,loadDomainCache:()=>$,loadSettings:()=>D,saveDomainCache:()=>J,saveSettings:()=>k});function D(){try{let t=localStorage.getItem(de);if(!t){let o=localStorage.getItem("easyquiz_settings_v1");if(o){let s=JSON.parse(o);return{...b,apiKey:s.apiKey||""}}return{...b}}let e=JSON.parse(t),a=typeof e.model=="string"&&e.model?e.model:b.model;return(a.includes("3.8")||a.includes("3.7")||a.includes("3.6")||a.includes("3.5")||a.includes("3.1"))&&(a=b.model),{apiKey:typeof e.apiKey=="string"?e.apiKey.trim():b.apiKey,model:a,uiMode:e.uiMode==="easy"||e.uiMode==="advanced"?e.uiMode:b.uiMode,modeHint:e.modeHint??"",engine:e.engine??"smart",dryRun:!!e.dryRun,autoApply:!!e.autoApply,autoAdvance:!!e.autoAdvance,hostDarkMode:e.hostDarkMode!==void 0?!!e.hostDarkMode:!0,confidenceThreshold:typeof e.confidenceThreshold=="number"?e.confidenceThreshold:b.confidenceThreshold}}catch{return{...b}}}function $(t){try{let e=localStorage.getItem("eq_domain_cache_"+t);return e?JSON.parse(e):{}}catch{return{}}}function J(t,e){let o={...$(t),...e};try{localStorage.setItem("eq_domain_cache_"+t,JSON.stringify(o))}catch(s){console.warn("[EasyQuiz] Erro cache de dominio:",s)}}function k(t){let a={...D(),...t};try{localStorage.setItem(de,JSON.stringify(a))}catch(o){console.warn("[EasyQuiz] Falha ao persistir configura\xE7\xF5es no localStorage:",o)}return a}function Ie(t){let e=t.trim();e&&!O.includes(e)&&O.push(e)}function X(){return O}function W(){O=[]}var de,O,w=B(()=>{"use strict";ce();de="easyquiz_settings_v2";O=[]});function y(t){let e=t;if(!e||typeof e.getBoundingClientRect!="function")return!1;let a=e.getBoundingClientRect(),o=window.getComputedStyle(e);return a.width>0&&a.height>0&&o.display!=="none"&&o.visibility!=="hidden"&&Number(o.opacity||"1")>0}function p(t,e=500){return(t??"").replace(/\s+/g," ").trim().slice(0,e)}function De(t){let e=t.dataset.easyquizId;if(e)return e;let a=`eq-${Date.now().toString(36)}-${(Oe+=1).toString(36)}`;return t.dataset.easyquizId=a,a}function te(t){let e=p(t.getAttribute("aria-label")||t.textContent||t.getAttribute("value")||t.value),a=t.type,o=e.replace(/[\d\(\)\[\]→\>\•\-\/\\]+/g," ").trim();return N.test(o)||N.test(e)||a==="submit"||t.getAttribute("data-testid")?.toLowerCase().includes("next")||t.getAttribute("data-testid")?.toLowerCase().includes("check")||!1}function $e(t){let e=t.getAttribute("aria-label");if(e)return p(e);let a=t.getAttribute("aria-labelledby");if(a){let n=a.split(/\s+/).map(i=>document.getElementById(i)?.textContent).filter(Boolean).join(" ");if(n.trim())return p(n)}if("labels"in t&&t.labels){let n=Array.from(t.labels??[]).map(i=>i.textContent).join(" ");if(n.trim())return p(n)}let o=t.closest('.docssharedWizToggleLabeledContainer, [role="listitem"], .answer, label, .quiz-option, .form-check');if(o&&o!==t){let n=p(o.textContent);if(n)return n}let s=t.getAttribute("placeholder")||t.getAttribute("title")||t.textContent||t.value||"";return p(s)}function oe(t,e){let a=t instanceof HTMLSelectElement?t:null,o=t;t.dataset.easyquizRole=e;let s=t.tagName.toLowerCase(),n=["input","textarea","select","button"].includes(s)?s:"other",i=t.getAttribute("role")||"",r=t.getAttribute("draggable")==="true"||t.classList.contains("perseus-drag-item"),l=t.getAttribute("data-role")==="dropzone"||t.classList.contains("category-container")||t.hasAttribute("data-category"),c=p((r?"draggable":l?"dropzone":"")||o.type||i||n,40),u="";o.type==="checkbox"||o.type==="radio"||i==="radio"||i==="checkbox"?u=o.checked||t.getAttribute("aria-checked")==="true"?"checked":"unchecked":u=p(o.value||t.getAttribute("data-category")||t.textContent||"",2e3);let h=[];if(a)for(let q of Array.from(a.options).slice(0,80))h.push({value:p(q.value),label:p(q.textContent)});let f=!!(o.required||t.getAttribute("aria-required")==="true"),P=!!(o.disabled||t.getAttribute("aria-disabled")==="true");return{id:De(t),tag:n,type:c,label:$e(t),name:p(o.name||t.getAttribute("name")||"",180),value:u,options:h,required:f,disabled:P,role:e}}var T,N,Oe,_=B(()=>{"use strict";T=['input:not([type="hidden"])',"textarea","select","button",'[role="button"]','[role="radio"]','[role="checkbox"]','[role="option"]','[contenteditable="true"]','[draggable="true"]',"[aria-grabbed]","[aria-dropeffect]","[data-widget-type]",".perseus-drag-item",".sortable-item",'[data-testid*="drag" i]','[data-testid*="card" i]','[data-testid*="option" i]','[data-testid*="category" i]','[data-role="dropzone"]',"[data-category]"].join(","),N=/(verificar|checar|check|conferir|validar|próxim[oa]|next|continuar|avançar|prosseguir|enviar|submit|concluir|finalizar|terminar|começar|iniciar|start|vamos lá|próxima tarefa|next task|próxima pergunta|next question|marcar como concluíd[oa]|mostrar resumo|entendi)/i,Oe=0});var j={};le(j,{captureCurrentContext:()=>A,captureFullPageText:()=>Ne,expandToGeneralSelection:()=>ye,extractAnswerControls:()=>ve,extractNavigationControls:()=>Q,findActiveScope:()=>be,findTrueQuestionContainer:()=>G,sanitizeHtml:()=>ae});function fe(t){if(!y(t))return-1/0;let e=t.getBoundingClientRect(),a=Array.from(t.querySelectorAll(T)).filter(y),o=p(t.innerText,4e3).length;if(!a.length||o<10)return-1/0;let s=Math.max(1,window.innerWidth*window.innerHeight),n=Math.max(1,e.width*e.height),i=Math.min(1,n/s),r=e.top+e.height/2,l=Math.abs(r-window.innerHeight/2)/Math.max(1,window.innerHeight),d=o>40?35:0,c=e.top>=0&&e.bottom<=window.innerHeight?25:0;return a.length*15+Math.min(60,o/20)+d+c-i*20-l*10}function G(t){let e=t;for(;e.parentElement&&e.parentElement!==document.body&&e.parentElement!==document.documentElement;){let a=e.parentElement,o=a.tagName.toLowerCase();if(["header","footer","nav","aside"].includes(o))break;if(a.matches?.('article, section, form, [data-test-id*="exercise" i], [data-testid*="exercise" i], .perseus-renderer, .framework-perseus, [class*="question-container" i], .que, main')){e=a;break}let s=p(e.innerText,1e4),n=p(a.innerText,1e4),i=e.querySelectorAll(T).length,r=a.querySelectorAll(T).length;if(s.length<150&&n.length>s.length&&r<=i+4){e=a;continue}break}return e}function ye(t){let e=t,a=e.closest('main, [role="main"], article, form, [data-test-id*="exercise" i], [data-testid*="exercise" i], .framework-perseus, section');if(a&&a!==document.body&&y(a))return a;let o=0;for(;e.parentElement&&e.parentElement!==document.body&&o<3;)e=e.parentElement,o++;return e||document.body}function be(){let t=document.activeElement;if(t&&t!==document.body){let s=t.closest(ge);if(s&&fe(s)>0)return G(s)}let a=Array.from(document.querySelectorAll(ge)).map(s=>({element:s,score:fe(s)})).filter(s=>Number.isFinite(s.score)).sort((s,n)=>n.score-s.score);if(a.length>0&&a[0].score>0)return G(a[0].element);let o=document.querySelector('form, main, [role="main"]');return o&&y(o)?o:document.body}function ae(t){let e=t.cloneNode(!0);e.querySelectorAll("script, style, iframe, object, embed, svg, canvas, noscript, audio, video").forEach(o=>o.remove());let a=["type","name","value","role","aria-label","aria-labelledby","aria-checked","aria-required","required","disabled","data-easyquiz-id","draggable","class","id","data-widget-type","data-role","data-category","data-testid"];return e.querySelectorAll("*").forEach(o=>{for(let s of Array.from(o.attributes))a.includes(s.name)||o.removeAttribute(s.name)}),e.outerHTML.replace(/\s+/g," ").slice(0,2e4)}function ve(t){return Array.from(t.querySelectorAll(T)).filter(e=>y(e)&&!te(e)).slice(0,100).map(e=>oe(e,"answer"))}function Q(t){let e=[t,t.parentElement,t.parentElement?.parentElement,document.body].filter(Boolean),a=new Set,o=[];for(let s of e)for(let n of Array.from(s.querySelectorAll(T)))if(!(a.has(n)||!y(n)||!te(n))&&(a.add(n),o.push(oe(n,"navigation")),o.length>=10))return o;return o}function A(t=!1){let e=be();e=G(e),t&&(e=ye(e));let a=p(e.innerText,16e3),o=ve(e),s=Q(e);s.length===0&&(s=Q(document.body));let n=[...o,...s].slice(0,120);return!a||n.length===0&&a.length<30?null:{sourceUrl:window.location.href.slice(0,2e3),pageTitle:document.title.slice(0,500)||"P\xE1gina de Quest\xE3o",questionText:a,htmlSnippet:ae(e),controls:n,scope:e}}function Ne(){let t=document.body.innerText||document.documentElement.innerText,e=p(t,8e3),a=Q(document.body),o=document.querySelector('main, article, [role="main"]')||document.body;return{sourceUrl:window.location.href.slice(0,2e3),pageTitle:document.title.slice(0,500)||"P\xE1gina Inteira",questionText:e,htmlSnippet:ae(o).slice(0,1e4),controls:a,scope:o}}var ge,M=B(()=>{"use strict";_();ge=['[data-test-id*="exercise" i]','[data-testid*="exercise" i]',".perseus-renderer",".framework-perseus",".Qr7Oae",".que",".question-holder",".quiz-question",".question_holder",".display_question",'[data-functional-selector*="question"]',".question-container","[data-question-id]",'[data-testid*="question" i]','[class*="question-container" i]','[class*="question" i]','[class*="pergunta" i]',"article","form","section","main"].join(",")});w();var pe=`Voc\xEA \xE9 o EasyQuiz Engine v4.5. Retorne JSON estrito.
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
6. "needsMoreContext": true se a sele\xE7\xE3o atual parecer restrita ou isolada (cortando o enunciado da pergunta, faltando contexto do texto-base ou op\xE7\xF5es). O EasyQuiz acionar\xE1 a SELE\xC7\xC3O GERAL EXPANDIDA, ampliando o escopo para o container completo da p\xE1gina para lhe dar vis\xE3o total.`;function he(t,e,a){let o=t.htmlSnippet.includes("draggable")||t.htmlSnippet.includes("perseus")||t.htmlSnippet.includes("category")||t.htmlSnippet.includes("dropzone")||t.controls.some(l=>l.type==="draggable"||l.type==="dropzone"),n=t.questionText.length<120||o||t.controls.length<3?`
[HTML FRAGMENT (Estrutura DOM/Widgets)]:
${t.htmlSnippet.slice(0,5e3)}`:`
[HTML FRAGMENT]: Omitido (Texto e controles s\xE3o suficientes).`,i=X(),r="";return i.length>0&&(r=`
[MEM\xD3RIA DE CONTEXTO ATIVA (RAG)]:
${i.map(l=>`- ${l}`).join(`
`)}
`),`--- NOVA AN\xC1LISE DE P\xC1GINA ---
[MODO REQUERIDO]: ${a.engine}
[DICA]: ${a.modeHint||"Auto"}
[SIMULA\xC7\xC3O]: ${a.dryRun?"ON":"OFF"}
[URL]: ${t.sourceUrl}
[P\xC1GINA]: ${t.pageTitle}
${r}
[TEXTO VIS\xCDVEL]:
${t.questionText}
${n}

[CONTROLES DETECTADOS]:
${JSON.stringify(t.controls.map(l=>({id:l.id,type:l.type,lbl:l.label,val:l.value,opt:l.options.length?l.options:void 0})),null,0)}

[IMAGENS ANEXADAS]: ${e.length}
Responda estritamente em JSON.`}var x=[{id:"gemini-2.5-flash",name:"Gemini 2.5 Flash (Oficial 2026 - Padr\xE3o)",description:"Mais r\xE1pido, econ\xF4mico e dispon\xEDvel universalmente em todas as contas do Google AI Studio."},{id:"gemini-2.5-pro",name:"Gemini 2.5 Pro (Racioc\xEDnio Avan\xE7ado)",description:"Alta capacidade de racioc\xEDnio l\xF3gico, resolu\xE7\xE3o de problemas complexos e c\xF3digo."},{id:"gemini-2.0-flash",name:"Gemini 2.0 Flash (Alta Velocidade)",description:"Gera\xE7\xE3o multimodal ultrarr\xE1pida de baixa lat\xEAncia."},{id:"gemini-2.0-flash-lite",name:"Gemini 2.0 Flash Lite (Ultra Leve)",description:"Consumo m\xEDnimo de cota com resposta instant\xE2nea."},{id:"gemini-1.5-flash",name:"Gemini 1.5 Flash (Compatibilidade Ampla)",description:"Suporte universal de alta compatibilidade em contas legadas."},{id:"gemini-1.5-pro",name:"Gemini 1.5 Pro (Legado)",description:"Modelo de racioc\xEDnio para contas legadas."}],ze={type:"OBJECT",properties:{pageType:{type:"STRING",enum:["question","info","start","conclusion"]},mode:{type:"STRING",enum:["texto_livre","escolha_unica","escolha_multipla","verdadeiro_falso","preenchimento","acao_sem_resposta","categorizacao","ordenacao","arrastar_soltar"]},confidence:{type:"NUMBER"},rationale:{type:"STRING"},needsMoreContext:{type:"BOOLEAN"},warnings:{type:"ARRAY",items:{type:"STRING"}},memoryToStore:{type:"STRING"},actions:{type:"ARRAY",items:{type:"OBJECT",properties:{t:{type:"STRING",enum:["val","chk","sel","clk","adv","js","drag"]},id:{type:"STRING"},v:{},c:{type:"BOOLEAN"},co:{type:"ARRAY",items:{type:"NUMBER"}},from:{type:"STRING"},to:{type:"STRING"}},required:["t"]}}},required:["pageType","mode","confidence","rationale","needsMoreContext","actions"]};function Re(t){return t.trim().replace(/^google\//,"").replace(/^models\//,"")||"gemini-2.5-flash"}function Pe(t,e){try{let a=JSON.parse(t),o=a.error?.message||a.message||"";if(/API_KEY_INVALID|API key not valid/i.test(o))return"Chave de API do Gemini inv\xE1lida ou expirada. Verifique no Google AI Studio.";if(/RESOURCE_EXHAUSTED|Quota exceeded/i.test(o))return"Limite de cota do Gemini (HTTP 429) atingido. Aguarde alguns segundos.";if(e===404||/not found/i.test(o))return"Modelo inexistente ou sem permiss\xE3o na sua conta (HTTP 404)";if(e===503||/overloaded/i.test(o))return"Servidores do Google Gemini sobrecarregados (HTTP 503)";if(o)return`Erro Gemini (HTTP ${e}): ${o}`}catch{}return`Falha na requisi\xE7\xE3o ao Gemini (HTTP ${e}).`}function Be(t){try{return JSON.parse(t)}catch(e){let a=t.trim(),o=[a+"}",a+"]}",a+'"}]}',a+'"]}',a+"}]}",a+"}]}}"];for(let s of o)try{let n=JSON.parse(s);if(n&&typeof n=="object")return n}catch{}throw new Error(`Falha ao decodificar JSON da IA (${e instanceof Error?e.message:"incompleto"})`)}}async function Z(t){let e=t.trim();if(!e)return x;try{let a=await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(e)}`);if(!a.ok)return x;let o=await a.json();if(!Array.isArray(o.models))return x;let s=o.models.filter(n=>{let i=n.supportedGenerationMethods||[],r=(n.name||"").includes("gemini"),l=i.includes("generateContent"),d=(n.name||"").includes("embedding")||(n.name||"").includes("tts")||(n.name||"").includes("imagen")||(n.name||"").includes("aqa")||(n.name||"").includes("computer-use");return r&&l&&!d}).map(n=>{let i=n.name.replace(/^models\//,""),r=n.displayName||i;return{id:i,name:r.includes(i)?r:`${r} (${i})`,description:n.description||""}});if(s.length>0)return s.sort((n,i)=>{let r=l=>l==="gemini-2.5-flash"?100:l==="gemini-2.5-pro"?90:l==="gemini-2.0-flash"?80:l==="gemini-2.0-flash-lite"?75:l==="gemini-1.5-flash"?70:l==="gemini-1.5-pro"?60:l.includes("flash")?50:10;return r(i.id)-r(n.id)}),s}catch(a){console.warn("[EasyQuiz] N\xE3o foi poss\xEDvel consultar modelos din\xE2micos:",a)}return x}async function me(t){let e=t.trim();if(!e)return{ok:!1,message:"Insira sua chave de API."};try{let o=await Z(e);if(o.length>0&&o!==x){let s=o[0];return{ok:!0,message:`Chave v\xE1lida! ${o.length} modelos Gemini dispon\xEDveis em sua conta. Recomendado: ${s.name}`,models:o}}}catch{}let a=["gemini-2.5-flash","gemini-2.0-flash","gemini-1.5-flash"];for(let o of a){let s=`https://generativelanguage.googleapis.com/v1beta/models/${o}:generateContent?key=${encodeURIComponent(e)}`;try{if((await fetch(s,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({contents:[{role:"user",parts:[{text:"PING"}]}],generationConfig:{maxOutputTokens:5}})})).ok)return{ok:!0,message:`Chave de API validada com sucesso no ${o}!`,models:x}}catch{}}return{ok:!1,message:"Chave de API inv\xE1lida, sem cota ou sem permiss\xE3o para modelos Gemini."}}async function ee(t,e,a,o){let s=a.apiKey.trim();if(!s)throw new Error("Chave de API n\xE3o configurada.");let n=Re(a.model),r=[{text:he(t,e,a)}];for(let h of e)r.push({inline_data:{mime_type:h.mediaType,data:h.base64}});let l={system_instruction:{parts:[{text:pe}]},contents:[{role:"user",parts:r}],generationConfig:{temperature:.05,maxOutputTokens:2500,response_mime_type:"application/json",response_schema:ze}},d=[n,"gemini-2.5-flash","gemini-2.0-flash","gemini-2.5-pro","gemini-2.0-flash-lite","gemini-1.5-flash","gemini-1.5-pro"],c=Array.from(new Set(d)),u=new Error("Nenhum modelo tentado.");for(let h=0;h<c.length;h++){let f=c[h],P=c[h+1],q=`https://generativelanguage.googleapis.com/v1beta/models/${f}:generateContent?key=${encodeURIComponent(s)}`;try{h>0&&o?.(`Tentando modelo alternativo: ${f}...`,"info");let S=await fetch(q,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(l)});if(!S.ok){let ke=await S.text(),Le=Pe(ke,S.status);throw new Error(Le)}let C=await S.json(),Y=C.candidates?.[0];if(!Y||!Y.content?.parts?.[0]?.text)throw new Error("A IA n\xE3o retornou uma resposta estruturada v\xE1lida.");let Ce=Y.content.parts[0].text,v=Be(Ce);return Array.isArray(v.actions)||(v.actions=[]),Array.isArray(v.warnings)||(v.warnings=[]),typeof v.confidence!="number"&&(v.confidence=.8),v.usedModel=f,f!==n&&o?.(`Modelo '${n}' falhou. Resolvido com sucesso pelo fallback '${f}'!`,"info"),{plan:v,rawUsage:C.usageMetadata,usedModel:f}}catch(S){if(u=S,u.message.includes("inv\xE1lida")||u.message.includes("expirada"))throw u;if(P){let C=`Modelo '${f}' indispon\xEDvel (${u.message}). Alternando automaticamente para '${P}'...`;console.warn(`[EasyQuiz Fallback] ${C}`),o?.(C,"warning")}else console.warn(`[EasyQuiz Fallback] Modelo '${f}' falhou: ${u.message}. Todos os modelos esgotados.`)}}throw u}w();M();w();_();function g(t){if(!t)return null;let e=t.trim(),a=CSS.escape(e),o=document.querySelector(`[data-easyquiz-id="${a}"]`);if(o)return o;try{if(o=document.querySelector(e),o)return o}catch{}if(o=document.querySelector(`#${a}, [name="${a}"]`),o)return o;try{let i=e.replace(/"/g,""),r=`//*[text()="${i}"] | //*[contains(text(),"${i}")] | //*[@aria-label="${i}"] | //*[@data-category="${i}"] | //*[@data-testid="${i}"]`,l=document.evaluate(r,document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);if(l.singleNodeValue)return l.singleNodeValue}catch{}let s=cleanText(e).toLowerCase().replace(/['"“”«»]/g,""),n=Array.from(document.querySelectorAll('button, a, div, span, li, p, label, input, [draggable="true"], [data-testid], [class*="option"], [class*="card"]'));for(let i of n){let r=cleanText(i.textContent).toLowerCase().replace(/['"“”«»]/g,""),l=cleanText(i.getAttribute("aria-label")).toLowerCase().replace(/['"“”«»]/g,""),d=cleanText(i.getAttribute("data-category")).toLowerCase().replace(/['"“”«»]/g,""),c=cleanText(i.getAttribute("data-testid")).toLowerCase();if(r===s||l===s||d===s||c===s)return i}if(s.length>6)for(let i of n){if(i.children.length>6)continue;let r=cleanText(i.textContent).toLowerCase().replace(/['"“”«»]/g,"");if(r.includes(s)||r.length>10&&s.includes(r))return i}return null}function L(t,e){for(let a of e)t.dispatchEvent(new Event(a,{bubbles:!0,composed:!0}))}function m(t,e){let a=0,o=0;if(e&&e.length===2)a=e[0],o=e[1];else{let n=t.getBoundingClientRect();a=n.left+n.width/2,o=n.top+n.height/2}let s={bubbles:!0,cancelable:!0,composed:!0,clientX:a,clientY:o};t.dispatchEvent(new PointerEvent("pointerdown",s)),t.dispatchEvent(new MouseEvent("mousedown",s)),t.dispatchEvent(new PointerEvent("pointerup",s)),t.dispatchEvent(new MouseEvent("mouseup",s)),t.click()}function Ee(t,e){if(t instanceof HTMLInputElement||t instanceof HTMLTextAreaElement){let a=t instanceof HTMLTextAreaElement?HTMLTextAreaElement.prototype:HTMLInputElement.prototype,o=Object.getOwnPropertyDescriptor(a,"value")?.set;o?o.call(t,e):t.value=e,L(t,["input","change","blur"]);return}if(t.isContentEditable){t.textContent=e,L(t,["input","change","blur"]);return}throw new Error(`N\xE3o \xE9 poss\xEDvel injetar texto em <${t.tagName.toLowerCase()}>`)}function we(t,e){if(t instanceof HTMLInputElement&&["checkbox","radio"].includes(t.type)){t.checked!==e&&t.click(),t.checked!==e&&(Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"checked")?.set?.call(t,e),L(t,["input","change"]));return}let a=t.getAttribute("role");if(a==="radio"||a==="checkbox"){t.getAttribute("aria-checked")==="true"!==e&&(m(t),t.setAttribute("aria-checked",e?"true":"false"),L(t,["input","change"]));return}m(t)}function _e(t,e){if(t instanceof HTMLSelectElement){for(let a of Array.from(t.options))a.selected=e.includes(a.value);L(t,["input","change"]);return}throw new Error("Elemento n\xE3o \xE9 select.")}function Ge(){let t={};return{dropEffect:"move",effectAllowed:"all",files:[],items:[],types:["text/plain"],clearData:e=>{e?delete t[e]:Object.keys(t).forEach(a=>delete t[a])},getData:e=>t[e]||"",setData:(e,a)=>{t[e]=a},setDragImage:()=>{}}}function ne(t,e){let a=Ge(),o=t.getBoundingClientRect(),s=e.getBoundingClientRect(),n={clientX:o.left+o.width/2,clientY:o.top+o.height/2,bubbles:!0,cancelable:!0},i={clientX:s.left+s.width/2,clientY:s.top+s.height/2,bubbles:!0,cancelable:!0};t.dispatchEvent(new PointerEvent("pointerdown",n)),t.dispatchEvent(new MouseEvent("mousedown",n)),t.dispatchEvent(new DragEvent("dragstart",{...n,dataTransfer:a})),e.dispatchEvent(new DragEvent("dragenter",{...i,dataTransfer:a})),e.dispatchEvent(new DragEvent("dragover",{...i,dataTransfer:a})),e.dispatchEvent(new DragEvent("drop",{...i,dataTransfer:a})),t.dispatchEvent(new DragEvent("dragend",{...n,dataTransfer:a})),e.dispatchEvent(new PointerEvent("pointerup",i)),e.dispatchEvent(new MouseEvent("mouseup",i))}var Se={fill:(t,e)=>{let a=g(t);a?Ee(a,e):console.warn(`$eq.fill: Elemento ${t} n\xE3o encontrado`)},click:t=>{let e=g(t);e?m(e):console.warn(`$eq.click: Elemento ${t} n\xE3o encontrado`)},check:(t,e)=>{let a=g(t);a?we(a,e):console.warn(`$eq.check: Elemento ${t} n\xE3o encontrado`)},drag:(t,e)=>{let a=g(t),o=g(e);a&&o?ne(a,o):console.warn(`$eq.drag: Origem ou destino n\xE3o encontrado (${t} -> ${e})`)},categorize:(t,e)=>{let a=g(t),o=g(e);if(!a||!o){console.warn(`$eq.categorize: Item ou categoria n\xE3o encontrados (${t} -> ${e})`);return}ne(a,o),m(a),setTimeout(()=>{m(o)},150)}};window.$eq=Se;async function xe(t){if(t.t==="js"){let o=String(t.v||"");try{new Function("$eq","document","window",o)(Se,document,window)}catch(s){console.warn("[EasyQuiz JS Execution]",s)}return}if(t.t==="drag"){let o=g(t.from),s=g(t.to);if(o&&s){ne(o,s),m(o),await new Promise(i=>setTimeout(i,150)),m(s);let n=s.querySelector('[data-role="dropzone"], [class*="bucket" i], [class*="drop" i]');n&&n!==s&&m(n)}else console.warn(`[EasyQuiz] Drag: alvo n\xE3o encontrado (${t.from} -> ${t.to})`);return}let e=t.id||"",a=g(e);if(!a&&t.t!=="adv"){console.warn(`[EasyQuiz] Alvo '${e}' n\xE3o encontrado para a\xE7\xE3o '${t.t}'. Prosseguindo...`);return}switch(t.t){case"val":a&&Ee(a,String(t.v));break;case"chk":a&&we(a,!!t.c);break;case"sel":if(a){let s=Array.isArray(t.v)?t.v:[String(t.v)];_e(a,s)}break;case"clk":a&&m(a,t.co);break;case"adv":let o=a;if(!o){let s=Array.from(document.querySelectorAll('button, a, input[type="submit"]')).filter(n=>N.test(n.textContent||n.value||""));s.length&&(o=s[0])}if(o){let s=t.id||o.textContent?.trim()||o.value?.trim()||"";s&&J(window.location.hostname,{advanceSelector:s}),m(o)}else console.warn("[EasyQuiz] Bot\xE3o de avan\xE7o n\xE3o localizado.");break}}async function Te(t,e){let a=t.actions.filter(n=>n.t!=="adv"),o=t.actions.filter(n=>n.t==="adv");for(let n of a)await xe(n),n.t==="drag"&&await new Promise(i=>setTimeout(i,350));let s=!1;if(e){let n=Array.from(document.querySelectorAll('button, [role="button"], input[type="submit"]')).find(i=>/(verificar|checar|check|conferir)/i.test(i.textContent||i.value||""));if(n&&isVisible(n)&&(m(n),await new Promise(i=>setTimeout(i,800))),o.length>0)await new Promise(i=>setTimeout(i,600)),xe(o[0]),s=!0;else if(n){await new Promise(r=>setTimeout(r,600));let i=Array.from(document.querySelectorAll('button, [role="button"], a, input[type="submit"]')).find(r=>/(próxim[oa]|next|continuar|avançar|mostrar resumo)/i.test(r.textContent||r.value||""));i&&isVisible(i)&&(m(i),s=!0)}}return{applied:a.length,advanced:s}}var H=null,I=[];function z(){H&&(H.style.removeProperty("outline"),H.style.removeProperty("outline-offset"),H=null);for(let t of I)t.style.removeProperty("outline"),t.style.removeProperty("outline-offset"),t.style.removeProperty("background-color");I=[]}function ie(t){z(),H=t,t.style.outline="2px solid #00e5ff",t.style.outlineOffset="4px"}function Ae(t){for(let e of t){if(e.t==="adv"||e.t==="js")continue;if(e.t==="drag"){try{let n=document.querySelector(`[data-easyquiz-id="${CSS.escape(e.from)}"]`)||document.querySelector(e.from),i=document.querySelector(`[data-easyquiz-id="${CSS.escape(e.to)}"]`)||document.querySelector(e.to);n&&(n.style.outline="2px solid #00ff88",I.push(n)),i&&(i.style.outline="2px dashed #00e5ff",I.push(i))}catch{}continue}if(!e.id)continue;let a=CSS.escape(e.id),o=document.querySelector(`[data-easyquiz-id="${a}"]`);if(!o)continue;let s=o.closest('label, [role="listitem"], .answer, .form-check')||o;s.style.outline="2px solid #00ff88",s.style.outlineOffset="2px",s.style.backgroundColor="rgba(0, 255, 136, 0.08)",I.push(s)}}_();var R=4,Qe=1200,se=12e5;function F(t){return new Promise((e,a)=>{let o=new FileReader;o.onerror=()=>a(new Error("Falha ao converter blob para base64.")),o.onload=()=>{let s=String(o.result||"");e(s.split(",")[1]||"")},o.readAsDataURL(t)})}async function V(t){let e=0,a=0;if(t instanceof HTMLImageElement?(e=t.naturalWidth||t.width,a=t.naturalHeight||t.height):(e=t.width,a=t.height),e<=0||a<=0)throw new Error("Dimens\xF5es inv\xE1lidas.");let o=Math.min(1,Qe/Math.max(e,a)),s=Math.max(1,Math.round(e*o)),n=Math.max(1,Math.round(a*o)),i=document.createElement("canvas");i.width=s,i.height=n;let r=i.getContext("2d",{alpha:!1});if(!r)throw new Error("Sem suporte a Canvas 2D.");return r.fillStyle="#ffffff",r.fillRect(0,0,s,n),r.drawImage(t,0,0,s,n),new Promise((l,d)=>{i.toBlob(c=>c?l(c):d(new Error("Falha compress\xE3o.")),"image/jpeg",.8)})}async function Me(t){try{let e=t.cloneNode(!0),a=t.offsetWidth||500,o=t.offsetHeight||500,s=`
      <svg xmlns="http://www.w3.org/2000/svg" width="${a}" height="${o}">
        <foreignObject width="100%" height="100%">
          <div xmlns="http://www.w3.org/1999/xhtml" style="background:#fff;font-family:sans-serif;">
            ${e.innerHTML}
          </div>
        </foreignObject>
      </svg>
    `,n=new Blob([s],{type:"image/svg+xml;charset=utf-8"}),i=URL.createObjectURL(n),r=new Image;r.crossOrigin="anonymous",await new Promise((c,u)=>{r.onload=c,r.onerror=u,r.src=i});let l=await V(r),d=await F(l);if(URL.revokeObjectURL(i),d&&d.length<=se)return{mediaType:"image/jpeg",base64:d,alt:"Captura Suprema via rasteriza\xE7\xE3o DOM",source:"rasterized"}}catch(e){console.warn("Falha na rasteriza\xE7\xE3o suprema:",e)}return null}async function je(t){let e=t.currentSrc||t.src;if(!e)return null;let a=(t.alt||t.getAttribute("aria-label")||"Imagem da quest\xE3o").slice(0,500);if(t.complete&&t.naturalWidth>0)try{let o=await V(t),s=await F(o);if(s&&s.length<=se)return{mediaType:"image/jpeg",base64:s,alt:a,source:e.slice(0,2e3)}}catch{}try{let o=await fetch(e,{mode:"cors"});if(o.ok){let s=await o.blob();if(s.type.startsWith("image/")){let n=await createImageBitmap(s),i=await V(n);n.close();let r=await F(i);if(r&&r.length<=se)return{mediaType:"image/jpeg",base64:r,alt:a,source:e.slice(0,2e3)}}}}catch{return Me(t.parentElement||t)}return null}async function re(t){let e=[],a=0,o=Array.from(t.querySelectorAll("img")).filter(y).slice(0,R);for(let s of o)try{let n=await je(s);if(n&&a+n.base64.length<=25e5&&(e.push(n),a+=n.base64.length,e.length>=R))break}catch{}if(e.length<R){let s=Array.from(t.querySelectorAll("canvas")).filter(y).slice(0,R);for(let n of s)try{let i=await V(n),r=await F(i);if(r&&a+r.length<=25e5&&(e.push({mediaType:"image/jpeg",base64:r,alt:"Canvas inline",source:"canvas"}),a+=r.length,e.length>=R))break}catch{let i=await Me(n.parentElement||n);i&&(e.push(i),a+=i.base64.length)}}return e}w();w();M();var K=class{active=!1;timer=null;callbacks;lastRunTime=0;lastActionTime=0;isProcessing=!1;constructor(e){this.callbacks=e}isActive(){return this.active}start(){this.active||(this.active=!0,this.lastActionTime=Date.now(),this.callbacks.onStatusChange("waiting","> [SYS] Autopilot ENGAGED. Monitorando..."),this.loop())}stop(){this.active=!1,this.timer&&clearTimeout(this.timer),this.callbacks.onStatusChange("idle","> [SYS] Autopilot DESATIVADO.")}errorCount=0;async loop(){if(!this.active)return;let e=Date.now();if(e-this.lastRunTime<2500||this.isProcessing){this.timer=window.setTimeout(()=>this.loop(),500);return}this.lastRunTime=e;try{this.isProcessing=!0;let a=A(!1);if(!a){let{captureFullPageText:o}=await Promise.resolve().then(()=>(M(),j));a=o()}if(a){let o=a.controls.filter(n=>n.role==="answer"),s=$(window.location.hostname);if(o.length>0){this.callbacks.onStatusChange("analyzing","> [IA] Quest\xE3o/Exerc\xEDcio detectado. Consultando IA...","text-blue"),await new Promise(i=>setTimeout(i,600));let n=await this.callbacks.onRequestAnalysis();if(n){if(this.callbacks.onStatusChange("analyzing",`> [IA] (${n.usedModel||"gemini"}) Confian\xE7a: ${(n.confidence*100).toFixed(1)}% | Modo: ${n.mode}`,"text-blue"),this.callbacks.onStatusChange("analyzing",`> [IA] Racioc\xEDnio: ${n.rationale}`,"text-blue"),this.callbacks.onStatusChange("analyzing",`> [IA] A\xE7\xF5es geradas: ${n.actions.length}`,"text-blue"),this.errorCount=0,n.memoryToStore&&this.callbacks.onStatusChange("analyzing",`> [IA] \u{1F9E0} Mem\xF3ria RAG salva: "${n.memoryToStore}"`,"text-yellow"),n.pageType==="conclusion"){this.callbacks.onStatusChange("idle","> [SYS] Atividade conclu\xEDda! Desligando Autopilot.","text-green"),this.stop();return}}else this.errorCount++,this.callbacks.onStatusChange("waiting",`> [AVISO] Falha na an\xE1lise (${this.errorCount}/3). Verifique a mensagem de erro acima.`,"text-yellow"),await new Promise(i=>setTimeout(i,2500));this.lastActionTime=Date.now()}else if(s.advanceSelector&&g(s.advanceSelector)&&a.questionText.length<50){let n=g(s.advanceSelector);n&&(this.callbacks.onStatusChange("advancing",`> [BRUTE] Avan\xE7ando via cache "${s.advanceSelector}"...`),await new Promise(i=>setTimeout(i,1e3)),m(n),this.lastActionTime=Date.now(),this.errorCount=0)}else{this.callbacks.onStatusChange("analyzing","> [IA] P\xE1gina informativa/contexto detectada. Lendo e consultando IA...","text-blue"),await new Promise(i=>setTimeout(i,600));let n=await this.callbacks.onRequestAnalysis();if(n){if(this.callbacks.onStatusChange("analyzing",`> [IA] (${n.usedModel||"gemini"}) Tipo: ${n.pageType} | Modo: ${n.mode}`,"text-blue"),this.callbacks.onStatusChange("analyzing",`> [IA] Racioc\xEDnio: ${n.rationale}`,"text-blue"),n.memoryToStore&&this.callbacks.onStatusChange("analyzing",`> [IA] \u{1F9E0} Conte\xFAdo absorvido na mem\xF3ria: "${n.memoryToStore}"`,"text-yellow"),n.pageType==="info")this.callbacks.onStatusChange("advancing","> [IA] \u{1F4D6} Leitura conclu\xEDda. Avan\xE7ando automaticamente...","text-green");else if(n.pageType==="start")this.callbacks.onStatusChange("advancing","> [SYS] In\xEDcio de m\xF3dulo detectado. Iniciando...","text-blue");else if(n.pageType==="conclusion"){this.callbacks.onStatusChange("idle","> [SYS] Atividade conclu\xEDda! Desligando Autopilot.","text-green"),this.stop();return}this.errorCount=0}else this.errorCount++,this.callbacks.onStatusChange("waiting",`> [AVISO] Falha ao processar p\xE1gina (${this.errorCount}/3). Verifique o erro detalhado acima.`,"text-yellow"),await new Promise(i=>setTimeout(i,2500));this.lastActionTime=Date.now()}if(this.errorCount>=3){this.callbacks.onStatusChange("error","> [ERRO] 3 falhas consecutivas. Abortando Autopilot para poupar sua cota e tokens.","text-red"),this.callbacks.onStatusChange("waiting","> [DICA] Verifique a mensagem vermelha de [ERRO DETALHADO] no console acima para saber o motivo exato.","text-yellow"),this.stop();return}}}catch(a){console.warn("[EasyQuiz Autopilot]",a)}finally{this.isProcessing=!1}this.active&&(this.timer=window.setTimeout(()=>this.loop(),1e3))}};var E={logo:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.8L19.2 8 12 11.2 4.8 8 12 4.8zM4 9.6l7 3.1v7.5l-7-3.5V9.6zm9 10.6v-7.5l7-3.1v7.1l-7 3.5z"/></svg>',analyze:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L3 14h8l-2 8 12-12h-8l2-8z"/></svg>',apply:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>',key:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M7 14c-2.76 0-5-2.24-5-5s2.24-5 5-5c2.42 0 4.44 1.72 4.9 4H22v4h-2v3h-3v-3h-2v3h-3v-3h-2.1c-.46 2.28-2.48 4-4.9 4zm0-7c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>',settings:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M3 5h4v2H3V5zm0 6h10v2H3v-2zm0 6h6v2H3v-2zm14-12h4v2h-4V5zm-4 6h8v2h-8v-2zm-4 6h12v2H9v-2z"/></svg>',close:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>',minimize:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M5 11h14v2H5v-2z"/></svg>',target:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2v4m0 12v4M2 12h4m12 0h4m-8-6a6 6 0 100 12 6 6 0 000-12zm0 4a2 2 0 100 4 2 2 0 000-4z" stroke="currentColor" stroke-width="2" fill="none"/></svg>',eye:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>',eyeOff:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.44-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.17c0-1.66-1.34-3-3-3l-.17.02z"/></svg>',check:'<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>',warning:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>',terminal:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8h16v10zm-12-3l3-3-3-3 1.4-1.4L13.8 12l-4.4 4.4L8 15zm6 0h4v2h-4v-2z"/></svg>'};var qe=`
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
  }

  .eq-input:focus {
    border-color: #00ffcc;
    background: #1a1a1a;
  }

  .eq-input-action-btn {
    height: 38px;
    padding: 0 12px;
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
    gap: 5px;
    white-space: nowrap;
  }

  .eq-input-action-btn:hover {
    background: #222222;
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
`;var Fe=[{value:"",label:"Detec\xE7\xE3o Autom\xE1tica"},{value:"escolha_unica",label:"M\xFAltipla Escolha (\xDAnica)"},{value:"escolha_multipla",label:"M\xFAltipla Escolha (V\xE1rias)"},{value:"categorizacao",label:"Categoriza\xE7\xE3o / Grupos"},{value:"arrastar_soltar",label:"Arrastar e Soltar (Drag & Drop)"},{value:"ordenacao",label:"Ordena\xE7\xE3o / Sequ\xEAncia"},{value:"verdadeiro_falso",label:"Verdadeiro / Falso"},{value:"texto_livre",label:"Texto Livre / Dissertativa"},{value:"preenchimento",label:"Preenchimento de Lacunas"}],Ve=[{value:"smart",label:"Inteligente (Auto-H\xEDbrido)"},{value:"command",label:"Apenas Comando (Seguro)"},{value:"javascript",label:"Apenas JS Nativo (Avan\xE7ado)"}],U=class{host;shadow;callbacks;autopilot;initialSettings;launcherBtn;panelEl;statusBox;resultContainer;apiKeyInput;testKeyBtn;modelSelect;modeSelect;engineSelect;dryRunCheckbox;autoApplyCheckbox;autoAdvanceCheckbox;hostDarkModeCheckbox;analyzeBtn;applyBtn;tabEasyBtn;tabAdvBtn;contentEasy;contentAdv;apToggleBtn;apConsole;constructor(e,a){this.initialSettings=e,this.callbacks=a,this.autopilot=new K({onStatusChange:(o,s,n)=>{if(this.apConsole){let i=document.createElement("div");i.textContent=s,n&&i.classList.add(n),this.apConsole.appendChild(i),this.apConsole.scrollTop=this.apConsole.scrollHeight}o==="analyzing"?this.setBusy(!0,"Autopilot: IA analisando..."):(o==="advancing"||o==="waiting")&&this.setBusy(!1)},onRequestAnalysis:async()=>{try{return await this.callbacks.onAnalyze()||null}catch{return null}}}),this.host=document.createElement("div"),this.host.id="easyquiz-shadow-root",this.host.style.position="fixed",this.host.style.top="0",this.host.style.left="0",this.host.style.width="100vw",this.host.style.height="100vh",this.host.style.zIndex="2147483647",this.host.style.pointerEvents="none",this.shadow=this.host.attachShadow({mode:"open"}),this.shadow.innerHTML=`
      <style>${qe}</style>
      <button class="eq-launcher" type="button" title="Abrir EasyQuiz (Alt+Q)">
        ${E.logo}
        <span>EQ</span>
      </button>

      <section class="eq-panel" hidden aria-label="EasyQuiz">
        <header class="eq-header">
          <div class="eq-brand">
            ${E.logo}
            <span>EasyQuiz</span>
            <span class="eq-brand-badge">2.0 SUPREME</span>
          </div>
          <div class="eq-header-tools">
            <button class="eq-icon-btn" id="eq-min-btn" type="button" title="Minimizar">${E.minimize}</button>
            <button class="eq-icon-btn" id="eq-close-btn" type="button" title="Fechar">${E.close}</button>
          </div>
        </header>
        
        <div class="eq-tabs">
          <button class="eq-tab-btn" id="eq-tab-easy">Modo F\xE1cil (Autopilot)</button>
          <button class="eq-tab-btn" id="eq-tab-advanced">Avan\xE7ado</button>
        </div>

        <!-- MODO F\xC1CIL -->
        <div class="eq-content" id="eq-content-easy" style="display: none;">
          <div class="eq-autopilot-container">
            <div style="display: flex; gap: 8px;">
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
              <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" class="eq-link">
                Obter Gr\xE1tis
              </a>
            </div>
            <div class="eq-input-wrap">
              <input id="eq-api-key" class="eq-input" type="password" placeholder="Cole sua chave AIzaSy..." autocomplete="off" spellcheck="false" />
              <button class="eq-input-action-btn" id="eq-test-key-btn" type="button">${E.key} Testar</button>
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
            ${E.analyze} Analisar & Resolver Quest\xE3o
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
              ${E.apply} Injetar Respostas na P\xE1gina
            </button>
          </div>
          <div class="eq-footer-note">EQ Engine v2.0 \u2022 100% Client-Side</div>
        </div>
      </section>
    `,this.tabEasyBtn=this.shadow.querySelector("#eq-tab-easy"),this.tabAdvBtn=this.shadow.querySelector("#eq-tab-advanced"),this.contentEasy=this.shadow.querySelector("#eq-content-easy"),this.contentAdv=this.shadow.querySelector("#eq-content-advanced"),this.apToggleBtn=this.shadow.querySelector("#eq-ap-toggle-btn"),this.apConsole=this.shadow.querySelector("#eq-ap-console"),this.launcherBtn=this.shadow.querySelector(".eq-launcher"),this.panelEl=this.shadow.querySelector(".eq-panel"),this.statusBox=this.shadow.querySelector("#eq-status"),this.resultContainer=this.shadow.querySelector("#eq-result"),this.apiKeyInput=this.shadow.querySelector("#eq-api-key"),this.testKeyBtn=this.shadow.querySelector("#eq-test-key-btn"),this.modelSelect=this.shadow.querySelector("#eq-model-select"),this.modeSelect=this.shadow.querySelector("#eq-mode-select"),this.engineSelect=this.shadow.querySelector("#eq-engine-select"),this.dryRunCheckbox=this.shadow.querySelector("#eq-dry-run"),this.autoApplyCheckbox=this.shadow.querySelector("#eq-auto-apply"),this.autoAdvanceCheckbox=this.shadow.querySelector("#eq-auto-advance"),this.hostDarkModeCheckbox=this.shadow.querySelector("#eq-host-dark"),this.analyzeBtn=this.shadow.querySelector("#eq-analyze-btn"),this.applyBtn=this.shadow.querySelector("#eq-apply-btn"),x.forEach(o=>this.modelSelect.add(new Option(o.name,o.id,!1,o.id===e.model))),Fe.forEach(o=>this.modeSelect.add(new Option(o.label,o.value,!1,o.value===e.modeHint))),Ve.forEach(o=>this.engineSelect.add(new Option(o.label,o.value,!1,o.value===e.engine))),this.apiKeyInput.value=e.apiKey,this.dryRunCheckbox.checked=e.dryRun,this.autoApplyCheckbox.checked=e.autoApply,this.autoAdvanceCheckbox.checked=e.autoAdvance,this.hostDarkModeCheckbox.checked=e.hostDarkMode,this.setupEventListeners(),document.body.appendChild(this.host),this.applyHostDarkMode(e.hostDarkMode),this.switchMode(e.uiMode),e.apiKey&&Z(e.apiKey).then(o=>{o&&o.length>0&&this.updateModelSelect(o,e.model)}).catch(()=>{}),this.makeDraggable(this.panelEl,this.shadow.querySelector(".eq-header")),this.makeDraggable(this.launcherBtn,this.launcherBtn)}switchMode(e){this.callbacks.onSettingsChange({uiMode:e}),e==="easy"?(this.tabEasyBtn.classList.add("active"),this.tabAdvBtn.classList.remove("active"),this.contentEasy.style.display="block",this.contentAdv.style.display="none",this.initialSettings.autoApply=!0,this.initialSettings.autoAdvance=!0,this.callbacks.onSettingsChange({autoApply:!0,autoAdvance:!0})):(this.autopilot.stop(),this.apToggleBtn.textContent="INICIAR AUTOPILOT",this.apToggleBtn.classList.remove("active"),this.tabEasyBtn.classList.remove("active"),this.tabAdvBtn.classList.add("active"),this.contentEasy.style.display="none",this.contentAdv.style.display="block")}setupEventListeners(){this.tabEasyBtn.addEventListener("click",()=>this.switchMode("easy")),this.tabAdvBtn.addEventListener("click",()=>this.switchMode("advanced")),this.apToggleBtn.addEventListener("click",()=>{if(this.autopilot.isActive())this.autopilot.stop(),this.apToggleBtn.textContent="INICIAR AUTOPILOT",this.apToggleBtn.classList.remove("active");else{if(!this.apiKeyInput.value.trim()){this.apConsole.innerHTML='<span style="color:#ff6b6b">> [ERRO] Chave API requerida no Modo Avan\xE7ado!</span>';return}this.autopilot.start(),this.apToggleBtn.textContent="PARAR AUTOPILOT",this.apToggleBtn.classList.add("active")}}),this.shadow.querySelector("#eq-ap-clear-memory").addEventListener("click",()=>{W(),this.apConsole.innerHTML='<span style="color:#00ff55">> [SYS] Mem\xF3ria de sess\xE3o limpa com sucesso.</span>'}),this.launcherBtn.addEventListener("click",()=>this.toggle()),this.shadow.querySelector("#eq-min-btn")?.addEventListener("click",()=>this.toggle(!1)),this.shadow.querySelector("#eq-close-btn")?.addEventListener("click",()=>this.toggle(!1)),this.apiKeyInput.addEventListener("input",()=>this.callbacks.onSettingsChange({apiKey:this.apiKeyInput.value.trim()})),this.modelSelect.addEventListener("change",()=>this.callbacks.onSettingsChange({model:this.modelSelect.value})),this.modeSelect.addEventListener("change",()=>this.callbacks.onSettingsChange({modeHint:this.modeSelect.value})),this.engineSelect.addEventListener("change",()=>this.callbacks.onSettingsChange({engine:this.engineSelect.value})),this.dryRunCheckbox.addEventListener("change",()=>this.callbacks.onSettingsChange({dryRun:this.dryRunCheckbox.checked})),this.autoApplyCheckbox.addEventListener("change",()=>this.callbacks.onSettingsChange({autoApply:this.autoApplyCheckbox.checked})),this.autoAdvanceCheckbox.addEventListener("change",()=>this.callbacks.onSettingsChange({autoAdvance:this.autoAdvanceCheckbox.checked})),this.hostDarkModeCheckbox.addEventListener("change",()=>{let a=this.hostDarkModeCheckbox.checked;this.callbacks.onSettingsChange({hostDarkMode:a}),this.applyHostDarkMode(a)}),this.testKeyBtn.addEventListener("click",async()=>{let a=this.apiKeyInput.value.trim();if(!a)return this.setStatus("Informe a chave de API.","error");this.setStatus("Validando chave e descobrindo modelos...","info"),this.testKeyBtn.disabled=!0;try{let o=await me(a);this.setStatus(o.message,o.ok?"success":"error"),o.ok&&o.models&&o.models.length>0&&this.updateModelSelect(o.models)}finally{this.testKeyBtn.disabled=!1}}),this.analyzeBtn.addEventListener("click",()=>this.callbacks.onAnalyze()),this.applyBtn.addEventListener("click",()=>this.callbacks.onApply())}applyHostDarkMode(e){let a="eq-host-dark-mode-style",o=document.getElementById(a);if(e){let s=window.getComputedStyle(document.body).backgroundColor;(s.includes("rgba(0, 0, 0, 0)")||s==="transparent")&&(s=window.getComputedStyle(document.documentElement).backgroundColor);let n=s.match(/\d+(\.\d+)?/g);if(n&&n.length>=3&&(n[3]!==void 0?parseFloat(n[3]):1)>.1){let r=parseInt(n[0]),l=parseInt(n[1]),d=parseInt(n[2]),c=(r*299+l*587+d*114)/1e3;if(c<100){console.log("[EasyQuiz] Fundo escuro detectado (Brightness: "+c+"). Smart Dark Mode preventivamente suspenso.");return}}o||(o=document.createElement("style"),o.id=a,o.innerHTML=`
          html { filter: invert(1) hue-rotate(180deg) !important; background: #fff !important; }
          img, video, canvas, [style*="background-image"] { filter: invert(1) hue-rotate(180deg) !important; }
        `,document.head.appendChild(o)),this.host.classList.add("eq-dark-mode-active")}else this.host.classList.remove("eq-dark-mode-active"),o&&o.remove()}makeDraggable(e,a){let o=!1,s=0,n=0,i=0,r=0;a.style.cursor="grab",a.addEventListener("mousedown",l=>{if(l.target.closest("button"))return;o=!0,a.style.cursor="grabbing",s=l.clientX,n=l.clientY;let d=e.getBoundingClientRect();i=d.left,r=d.top,e.style.right="auto",e.style.bottom="auto",e.style.left=i+"px",e.style.top=r+"px",l.preventDefault()}),document.addEventListener("mousemove",l=>{if(!o)return;let d=l.clientX-s,c=l.clientY-n;e.style.left=i+d+"px",e.style.top=r+c+"px"}),document.addEventListener("mouseup",()=>{o&&(o=!1,a.style.cursor="grab")})}toggle(e){let a=e!==void 0?!e:!this.panelEl.hidden;this.panelEl.hidden=a,!a&&!this.apiKeyInput.value&&this.apiKeyInput.focus()}setBusy(e,a){this.analyzeBtn.disabled=e,[this.modelSelect,this.modeSelect,this.engineSelect,this.dryRunCheckbox,this.autoApplyCheckbox,this.autoAdvanceCheckbox].forEach(o=>o.disabled=e),a&&this.setStatus(a,"info")}setStatus(e,a="info"){if(this.statusBox.textContent=e,this.statusBox.className=`eq-status-box ${a}`,this.apConsole){let o=document.createElement("div"),s=e.includes("Alternando")||e.includes("indispon\xEDvel")||e.includes("fallback")||e.includes("alternativo"),n=a==="error"?"> [ERRO DETALHADO] ":a==="success"?"> [SUCESSO] ":s?"> [FALLBACK] ":"> [SYS] ";o.textContent=`${n}${e}`,a==="error"?o.className="text-red":a==="success"?o.className="text-green":s?o.className="text-yellow":o.className="text-blue",this.apConsole.appendChild(o),this.apConsole.scrollTop=this.apConsole.scrollHeight}}updateModelSelect(e,a){let o=a||this.modelSelect.value||this.initialSettings.model;this.modelSelect.innerHTML="";let s=!1;e.forEach(n=>{let i=n.id===o;i&&(s=!0),this.modelSelect.add(new Option(n.name,n.id,!1,i))}),!s&&e.length>0&&(this.modelSelect.selectedIndex=0,this.callbacks.onSettingsChange({model:this.modelSelect.value}))}updateSelectedModel(e){Array.from(this.modelSelect.options).some(o=>o.value===e)||this.modelSelect.add(new Option(`Gemini (${e})`,e,!1,!0)),this.modelSelect.value=e}setPlan(e,a){this.resultContainer.style.display="flex";let o=this.shadow.querySelector("#eq-badges");o.innerHTML=`
      <span class="eq-badge highlight">${e.mode.replace("_"," ")}</span>
      <span class="eq-badge ${e.confidence>=.8?"success":""}">${Math.round(e.confidence*100)}% Confian\xE7a</span>
      <span class="eq-badge">${e.actions.length} Cmds</span>
      ${e.usedModel?`<span class="eq-badge" style="border-color: #5bc0eb; color: #5bc0eb;">${e.usedModel}</span>`:""}
    `;let s=this.shadow.querySelector("#eq-rationale-text");s.textContent=e.rationale;let n=this.shadow.querySelector("#eq-actions-list");n.innerHTML="";for(let i of e.actions){let r=document.createElement("div");r.className="eq-action-item";let l="";i.t==="chk"?l=`[CHK] ${i.id}`:i.t==="val"?l=`[INJ] "${i.v}" em ${i.id}`:i.t==="sel"?l=`[SEL] ${Array.isArray(i.v)?i.v.join(","):i.v} em ${i.id}`:i.t==="clk"?l=`[CLK] ${i.id}`:i.t==="adv"?l="[AVAN\xC7AR]":i.t==="js"&&(l=`[JS] ${String(i.v)}`),r.innerHTML=`<span class="eq-action-bullet">\u25A0</span> <span>${l}</span>`,n.appendChild(r)}this.applyBtn.disabled=!a||!e.actions.length}destroy(){this.autopilot.stop(),this.applyHostDarkMode(!1),this.callbacks.onDestroy(),this.host.remove()}};async function Ke(){let t=window;if(t.__easyquiz){t.__easyquiz.toggle();return}let e=D(),a=null,o=new U(e,{onAnalyze:()=>s(),onApply:()=>void n(),onDestroy:()=>{z(),delete t.__easyquiz},onSettingsChange:i=>{e=k(i)}});t.__easyquiz={toggle:()=>o.toggle(),destroy:()=>o.destroy(),analyze:()=>void s()},window.addEventListener("keydown",i=>{if(i.altKey&&(i.key==="q"||i.key==="Q")){if(i.preventDefault(),!o)return;o.toggle(!0),s()}});async function s(){if(!e.apiKey){o.setStatus("Configure sua chave de API Gemini acima para come\xE7ar.","error"),o.toggle(!0);return}o.setBusy(!0,"Identificando o bloco da quest\xE3o ativa na p\xE1gina..."),z();try{let i=A(!1);if(!i){o.setStatus("Nenhum controle detectado. Tentando captura de tela inteira...","info");let{captureFullPageText:c}=await Promise.resolve().then(()=>(M(),j));i=c()}ie(i.scope),o.setStatus(`Quest\xE3o localizada (${i.controls.length} controles). Otimizando imagens...`,"info");let r=await re(i.scope);o.setStatus(`Consultando Gemini (${e.model}) com ${r.length} imagem(ns) anexada(s)...`,"info");let{plan:l,usedModel:d}=await ee(i,r,e,(c,u)=>{o.setStatus(c,u==="warning"?"info":u)});if(d&&d!==e.model&&(e.model=d,k({model:d}),o.updateSelectedModel(d)),l.needsMoreContext){if(o.setStatus("Enunciado ou contexto isolado detectado pela IA. Acionando Sele\xE7\xE3o Geral Expandida...","info"),i=A(!0),!i){let{captureFullPageText:u}=await Promise.resolve().then(()=>(M(),j));i=u()}ie(i.scope),r=await re(i.scope),o.setStatus(`Reconsultando IA com escopo ampliado (${i.controls.length} controles)...`,"info");let c=await ee(i,r,e,(u,h)=>{o.setStatus(u,h==="warning"?"info":h)});l=c.plan,c.usedModel&&c.usedModel!==e.model&&(e.model=c.usedModel,k({model:c.usedModel}),o.updateSelectedModel(c.usedModel))}if(l.memoryToStore){let{addSessionMemory:c}=await Promise.resolve().then(()=>(w(),ue));c(l.memoryToStore),console.log("[EasyQuiz] Mem\xF3ria de sess\xE3o armazenada:",l.memoryToStore)}return a=l,Ae(l.actions),o.setPlan(l,!e.dryRun),l.pageType==="conclusion"?o.setStatus("Atividade conclu\xEDda ou tela final detectada pela IA.","success"):o.setStatus(e.dryRun?"Simula\xE7\xE3o conclu\xEDda. As respostas foram real\xE7adas na p\xE1gina sem altera\xE7\xE3o.":"Resolu\xE7\xE3o pronta! Verifique o realce na tela e aplique quando desejar.","success"),e.autoApply&&!e.dryRun&&await n(),l}catch(i){z();let r=i instanceof Error?i.message:"Falha desconhecida na an\xE1lise.";o.setStatus(r,"error");return}finally{o.setBusy(!1)}}async function n(){if(!a){o.setStatus("Nenhum plano dispon\xEDvel para aplicar. Execute a an\xE1lise primeiro.","error");return}if(e.dryRun){o.setStatus("O modo de simula\xE7\xE3o est\xE1 ativo. Desmarque para poder aplicar.","error");return}let i=e.autoAdvance&&a.confidence>=e.confidenceThreshold&&!a.needsMoreContext;o.setBusy(!0,"Aplicando respostas no formul\xE1rio...");try{let r=await Te(a,i);o.setStatus(`Sucesso: ${r.applied} resposta(s) preenchida(s)${r.advanced?" e pr\xF3xima quest\xE3o acionada":""}.`,"success")}catch(r){let l=r instanceof Error?r.message:"Falha ao aplicar plano.";o.setStatus(l,"error")}finally{o.setBusy(!1)}}o.toggle(!0)}Ke().catch(t=>{console.error("[EasyQuiz] Erro fatal na inicializa\xE7\xE3o:",t),window.alert(`EasyQuiz: falha ao iniciar: ${t instanceof Error?t.message:String(t)}`)});})();
