/* EasyQuiz v1.0.0 — Resolução inteligente de quizzes sem servidor
 * GitHub: https://github.com/minifoxie/EasyQuiz
 * 100% Client-side. Direct Google Gemini REST API.
 */
"use strict";(()=>{var Ve=Object.defineProperty;var D=(t,e)=>()=>(t&&(e=t(t=0)),e);var fe=(t,e)=>{for(var a in e)Ve(t,a,{get:e[a],enumerable:!0})};var w,ve=D(()=>{"use strict";w={apiKey:"",model:"gemini-2.5-flash",uiMode:"easy",modeHint:"",engine:"smart",dryRun:!1,autoApply:!1,autoAdvance:!1,hostDarkMode:!0,useVision:!1,confidenceThreshold:.8}});var be={};fe(be,{addSessionMemory:()=>Ge,clearSessionMemories:()=>V,getSessionMemories:()=>ie,loadDomainCache:()=>_,loadSettings:()=>N,resetAllData:()=>ae,saveDomainCache:()=>ne,saveSettings:()=>L});function N(){try{let t=localStorage.getItem(oe);if(!t){let o=localStorage.getItem("easyquiz_settings_v1");if(o){let i=JSON.parse(o);return{...w,apiKey:i.apiKey||""}}return{...w}}let e=JSON.parse(t),a=typeof e.model=="string"&&e.model?e.model:w.model;return(a.includes("3.8")||a.includes("3.7")||a.includes("3.6")||a.includes("3.5")||a.includes("3.1"))&&(a=w.model),{apiKey:typeof e.apiKey=="string"?e.apiKey.trim():w.apiKey,model:a,uiMode:e.uiMode==="easy"||e.uiMode==="advanced"?e.uiMode:w.uiMode,modeHint:e.modeHint??"",engine:e.engine??"smart",dryRun:!!e.dryRun,autoApply:!!e.autoApply,autoAdvance:!!e.autoAdvance,hostDarkMode:e.hostDarkMode!==void 0?!!e.hostDarkMode:!0,useVision:!!e.useVision,confidenceThreshold:typeof e.confidenceThreshold=="number"?e.confidenceThreshold:w.confidenceThreshold}}catch{return{...w}}}function ae(){try{localStorage.removeItem(oe),localStorage.removeItem("easyquiz_settings_v1");let t=[];for(let e=0;e<localStorage.length;e++){let a=localStorage.key(e);a&&(a.startsWith("eq_")||a.startsWith("easyquiz_"))&&t.push(a)}t.forEach(e=>localStorage.removeItem(e)),V()}catch(t){console.warn("[EasyQuiz] Erro ao resetar dados:",t)}}function _(t){try{let e=localStorage.getItem("eq_domain_cache_"+t);return e?JSON.parse(e):{}}catch{return{}}}function ne(t,e){let o={..._(t),...e};try{localStorage.setItem("eq_domain_cache_"+t,JSON.stringify(o))}catch(i){console.warn("[EasyQuiz] Erro cache de dominio:",i)}}function L(t){let a={...N(),...t};try{localStorage.setItem(oe,JSON.stringify(a))}catch(o){console.warn("[EasyQuiz] Falha ao persistir configura\xE7\xF5es no localStorage:",o)}return a}function Ge(t){let e=t.trim();e&&!O.includes(e)&&O.push(e)}function ie(){return O}function V(){O=[]}var oe,O,q=D(()=>{"use strict";ve();oe="easyquiz_settings_v2";O=[]});function x(t){let e=t;if(!e||typeof e.getBoundingClientRect!="function")return!1;let a=e.getBoundingClientRect(),o=window.getComputedStyle(e);return a.width>0&&a.height>0&&o.display!=="none"&&o.visibility!=="hidden"&&Number(o.opacity||"1")>0}function g(t,e=500){return(t??"").replace(/\s+/g," ").trim().slice(0,e)}function Ue(t){let e=t.dataset.easyquizId;if(e)return e;let a=`eq-${Date.now().toString(36)}-${(Fe+=1).toString(36)}`;return t.dataset.easyquizId=a,a}function le(t){let e=g(t.getAttribute("aria-label")||t.textContent||t.getAttribute("value")||t.value),a=t.type,o=e.replace(/[\d\(\)\[\]→\>\•\-\/\\]+/g," ").trim();return Q.test(o)||Q.test(e)||a==="submit"||t.getAttribute("data-testid")?.toLowerCase().includes("next")||t.getAttribute("data-testid")?.toLowerCase().includes("check")||!1}function Je(t){let e=t.getAttribute("aria-label");if(e)return g(e);let a=t.getAttribute("aria-labelledby");if(a){let s=a.split(/\s+/).map(n=>document.getElementById(n)?.textContent).filter(Boolean).join(" ");if(s.trim())return g(s)}if("labels"in t&&t.labels){let s=Array.from(t.labels??[]).map(n=>n.textContent).join(" ");if(s.trim())return g(s)}let o=t.closest('.docssharedWizToggleLabeledContainer, [role="listitem"], .answer, label, .quiz-option, .form-check');if(o&&o!==t){let s=g(o.textContent);if(s)return s}let i=t.getAttribute("placeholder")||t.getAttribute("title")||t.textContent||t.value||"";return g(i)}function ce(t,e){let a=t instanceof HTMLSelectElement?t:null,o=t;t.dataset.easyquizRole=e;let i=t.tagName.toLowerCase(),s=["input","textarea","select","button"].includes(i)?i:"other",n=t.getAttribute("role")||"",r=t.getAttribute("draggable")==="true"||t.classList.contains("perseus-drag-item"),c=t.getAttribute("data-role")==="dropzone"||t.classList.contains("category-container")||t.hasAttribute("data-category"),l=g((r?"draggable":c?"dropzone":"")||o.type||n||s,40),d="";o.type==="checkbox"||o.type==="radio"||n==="radio"||n==="checkbox"?d=o.checked||t.getAttribute("aria-checked")==="true"?"checked":"unchecked":d=g(o.value||t.getAttribute("data-category")||t.textContent||"",2e3);let h=[];if(a)for(let T of Array.from(a.options).slice(0,80))h.push({value:g(T.value),label:g(T.textContent)});let m=!!(o.required||t.getAttribute("aria-required")==="true"),f=!!(o.disabled||t.getAttribute("aria-disabled")==="true");return{id:Ue(t),tag:s,type:l,label:Je(t),name:g(o.name||t.getAttribute("name")||"",180),value:d,options:h,required:m,disabled:f,role:e}}var M,Q,Fe,j=D(()=>{"use strict";M=['input:not([type="hidden"])',"textarea","select","button",'[role="button"]','[role="radio"]','[role="checkbox"]','[role="option"]','[contenteditable="true"]','[draggable="true"]',"[aria-grabbed]","[aria-dropeffect]","[data-widget-type]",".perseus-drag-item",".sortable-item",'[data-testid*="drag" i]','[data-testid*="card" i]','[data-testid*="option" i]','[data-testid*="category" i]','[data-role="dropzone"]',"[data-category]"].join(","),Q=/(verificar|checar|check|conferir|validar|próxim[oa]|next|continuar|avançar|prosseguir|enviar|submit|concluir|finalizar|terminar|começar|iniciar|start|vamos lá|próxima tarefa|next task|próxima pergunta|next question|marcar como concluíd[oa]|mostrar resumo|entendi)/i,Fe=0});var J={};fe(J,{captureCurrentContext:()=>k,captureFullPageText:()=>Ye,expandToGeneralSelection:()=>Te,extractAnswerControls:()=>Me,extractNavigationControls:()=>U,findActiveScope:()=>Ae,findTrueQuestionContainer:()=>F,sanitizeHtml:()=>de});function Se(t){if(!x(t))return-1/0;let e=t.getBoundingClientRect(),a=Array.from(t.querySelectorAll(M)).filter(x),o=g(t.innerText,4e3).length;if(!a.length||o<10)return-1/0;let i=Math.max(1,window.innerWidth*window.innerHeight),s=Math.max(1,e.width*e.height),n=Math.min(1,s/i),r=e.top+e.height/2,c=Math.abs(r-window.innerHeight/2)/Math.max(1,window.innerHeight),p=o>40?35:0,l=e.top>=0&&e.bottom<=window.innerHeight?25:0;return a.length*15+Math.min(60,o/20)+p+l-n*20-c*10}function F(t){let e=t;for(;e.parentElement&&e.parentElement!==document.body&&e.parentElement!==document.documentElement;){let a=e.parentElement,o=a.tagName.toLowerCase();if(["header","footer","nav","aside"].includes(o))break;if(a.matches?.('article, section, form, [data-test-id*="exercise" i], [data-testid*="exercise" i], .perseus-renderer, .framework-perseus, [class*="question-container" i], .que, main')){e=a;break}let i=g(e.innerText,1e4),s=g(a.innerText,1e4),n=e.querySelectorAll(M).length,r=a.querySelectorAll(M).length;if(i.length<150&&s.length>i.length&&r<=n+4){e=a;continue}break}return e}function Te(t){let e=t,a=e.closest('main, [role="main"], article, form, [data-test-id*="exercise" i], [data-testid*="exercise" i], .framework-perseus, section');if(a&&a!==document.body&&x(a))return a;let o=0;for(;e.parentElement&&e.parentElement!==document.body&&o<3;)e=e.parentElement,o++;return e||document.body}function Ae(){let t=document.activeElement;if(t&&t!==document.body){let i=t.closest(qe);if(i&&Se(i)>0)return F(i)}let a=Array.from(document.querySelectorAll(qe)).map(i=>({element:i,score:Se(i)})).filter(i=>Number.isFinite(i.score)).sort((i,s)=>s.score-i.score);if(a.length>0&&a[0].score>0)return F(a[0].element);let o=document.querySelector('form, main, [role="main"]');return o&&x(o)?o:document.body}function de(t){let e=t.cloneNode(!0);e.querySelectorAll("script, style, iframe, object, embed, svg, canvas, noscript, audio, video").forEach(o=>o.remove());let a=["type","name","value","role","aria-label","aria-labelledby","aria-checked","aria-required","required","disabled","data-easyquiz-id","draggable","class","id","data-widget-type","data-role","data-category","data-testid"];return e.querySelectorAll("*").forEach(o=>{for(let i of Array.from(o.attributes))a.includes(i.name)||o.removeAttribute(i.name)}),e.outerHTML.replace(/\s+/g," ").slice(0,2e4)}function Me(t){return Array.from(t.querySelectorAll(M)).filter(e=>x(e)&&!le(e)).slice(0,100).map(e=>ce(e,"answer"))}function U(t){let e=[t,t.parentElement,t.parentElement?.parentElement,document.body].filter(Boolean),a=new Set,o=[];for(let i of e)for(let s of Array.from(i.querySelectorAll(M)))if(!(a.has(s)||!x(s)||!le(s))&&(a.add(s),o.push(ce(s,"navigation")),o.length>=10))return o;return o}function k(t=!1){let e=Ae();e=F(e),t&&(e=Te(e));let a=g(e.innerText,16e3),o=Me(e),i=U(e);i.length===0&&(i=U(document.body));let s=[...o,...i].slice(0,120);return!a||s.length===0&&a.length<30?null:{sourceUrl:window.location.href.slice(0,2e3),pageTitle:document.title.slice(0,500)||"P\xE1gina de Quest\xE3o",questionText:a,htmlSnippet:de(e),controls:s,scope:e}}function Ye(){let t=document.body.innerText||document.documentElement.innerText,e=g(t,8e3),a=U(document.body),o=document.querySelector('main, article, [role="main"]')||document.body;return{sourceUrl:window.location.href.slice(0,2e3),pageTitle:document.title.slice(0,500)||"P\xE1gina Inteira",questionText:e,htmlSnippet:de(o).slice(0,1e4),controls:a,scope:o}}var qe,C=D(()=>{"use strict";j();qe=['[data-test-id*="exercise" i]','[data-testid*="exercise" i]',".perseus-renderer",".framework-perseus",".Qr7Oae",".que",".question-holder",".quiz-question",".question_holder",".display_question",'[data-functional-selector*="question"]',".question-container","[data-question-id]",'[data-testid*="question" i]','[class*="question-container" i]','[class*="question" i]','[class*="pergunta" i]',"article","form","section","main"].join(",")});q();var ye=`Voc\xEA \xE9 o EasyQuiz Engine v4.5. Retorne JSON estrito.
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
6. "needsMoreContext": true se a sele\xE7\xE3o atual parecer restrita ou isolada (cortando o enunciado da pergunta, faltando contexto do texto-base ou op\xE7\xF5es). O EasyQuiz acionar\xE1 a SELE\xC7\xC3O GERAL EXPANDIDA, ampliando o escopo para o container completo da p\xE1gina para lhe dar vis\xE3o total.`;function xe(t,e,a){let o=t.htmlSnippet.includes("draggable")||t.htmlSnippet.includes("perseus")||t.htmlSnippet.includes("category")||t.htmlSnippet.includes("dropzone")||t.controls.some(c=>c.type==="draggable"||c.type==="dropzone"),s=t.questionText.length<120||o||t.controls.length<3?`
[HTML FRAGMENT (Estrutura DOM/Widgets)]:
${t.htmlSnippet.slice(0,5e3)}`:`
[HTML FRAGMENT]: Omitido (Texto e controles s\xE3o suficientes).`,n=ie(),r="";return n.length>0&&(r=`
[MEM\xD3RIA DE CONTEXTO ATIVA (RAG)]:
${n.map(c=>`- ${c}`).join(`
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
${s}

[CONTROLES DETECTADOS]:
${JSON.stringify(t.controls.map(c=>({id:c.id,type:c.type,lbl:c.label,val:c.value,opt:c.options.length?c.options:void 0})),null,0)}

[IMAGENS ANEXADAS]: ${e.length}
Responda estritamente em JSON.`}var S=[{id:"gemini-2.5-flash",name:"Gemini 2.5 Flash (Padr\xE3o Oficial 2026)",description:"Mais r\xE1pido, econ\xF4mico e amplamente dispon\xEDvel em contas Google AI Studio."},{id:"gemini-3.5-flash",name:"Gemini 3.5 Flash (Gera\xE7\xE3o 3 - Alta Velocidade)",description:"Frontier model com alta intelig\xEAncia multimodal otimizado para velocidade."},{id:"gemini-3.1-flash-lite",name:"Gemini 3.1 Flash Lite (Ultra Eficiente)",description:"Equil\xEDbrio ideal entre intelig\xEAncia e economia extrema de cota."},{id:"gemini-2.5-pro",name:"Gemini 2.5 Pro (Racioc\xEDnio Avan\xE7ado)",description:"Alta capacidade de racioc\xEDnio l\xF3gico, problemas complexos e STEM."},{id:"gemini-3.1-pro",name:"Gemini 3.1 Pro (Racioc\xEDnio Profundo)",description:"Modelo avan\xE7ado para racioc\xEDnio em m\xFAltiplos passos e c\xF3digo."},{id:"gemini-1.5-flash",name:"Gemini 1.5 Flash (Compatibilidade Ampla)",description:"Suporte universal de alta compatibilidade em contas com endpoints legados."}],Ke={type:"OBJECT",properties:{pageType:{type:"STRING",enum:["question","info","start","conclusion"]},mode:{type:"STRING",enum:["texto_livre","escolha_unica","escolha_multipla","verdadeiro_falso","preenchimento","acao_sem_resposta","categorizacao","ordenacao","arrastar_soltar"]},confidence:{type:"NUMBER"},rationale:{type:"STRING"},needsMoreContext:{type:"BOOLEAN"},warnings:{type:"ARRAY",items:{type:"STRING"}},memoryToStore:{type:"STRING"},actions:{type:"ARRAY",items:{type:"OBJECT",properties:{t:{type:"STRING",enum:["val","chk","sel","clk","adv","js","drag"]},id:{type:"STRING"},v:{},c:{type:"BOOLEAN"},co:{type:"ARRAY",items:{type:"NUMBER"}},from:{type:"STRING"},to:{type:"STRING"}},required:["t"]}}},required:["pageType","mode","confidence","rationale","needsMoreContext","actions"]};function Qe(t){return t.trim().replace(/^google\//,"").replace(/^models\//,"")||"gemini-2.5-flash"}function we(t,e){let a="";try{let o=JSON.parse(t);a=o.error?.message||o.message||""}catch{a=t.slice(0,160)}return/API_KEY_INVALID|API key not valid|key.*invalid|unregistered/i.test(a)?"Chave de API do Gemini inv\xE1lida ou n\xE3o autorizada no Google AI Studio.":/RESOURCE_EXHAUSTED|Quota exceeded/i.test(a)||e===429?"Limite tempor\xE1rio de cota do Gemini (HTTP 429) atingido. Aguardando recupera\xE7\xE3o...":e===404?`HTTP 404: ${a||"Modelo ou endpoint n\xE3o encontrado no Google AI Studio"}`:e===503||/overloaded/i.test(a)?`Servidores Google sobrecarregados (HTTP 503): ${a||"Aguardando"}`:a?`Erro Gemini (HTTP ${e}): ${a}`:`Falha na requisi\xE7\xE3o ao Gemini (HTTP ${e}).`}function je(t){try{return JSON.parse(t)}catch(e){let a=t.trim(),o=[a+"}",a+"]}",a+'"}]}',a+'"]}',a+"}]}",a+"}]}}"];for(let i of o)try{let s=JSON.parse(i);if(s&&typeof s=="object")return s}catch{}throw new Error(`Falha ao decodificar JSON da IA (${e instanceof Error?e.message:"incompleto"})`)}}var G=null,se=new Set;async function K(t){let e=t.trim().replace(/^["']|["']$/g,"");if(!e)return S;let a=[`https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(e)}`,`https://generativelanguage.googleapis.com/v1/models?key=${encodeURIComponent(e)}`];for(let o of a)try{let i=await fetch(o,{headers:{"Content-Type":"application/json","x-goog-api-key":e}});if(!i.ok){let n=await i.text(),r=we(n,i.status);if(r.includes("inv\xE1lida")||r.includes("n\xE3o autorizada"))throw new Error(r);continue}let s=await i.json();if(Array.isArray(s.models)&&s.models.length>0){let n=s.models.filter(r=>{let c=r.supportedGenerationMethods||[],p=(r.name||"").includes("gemini"),l=c.includes("generateContent"),d=(r.name||"").includes("embedding")||(r.name||"").includes("tts")||(r.name||"").includes("imagen")||(r.name||"").includes("aqa")||(r.name||"").includes("computer-use");return p&&l&&!d}).map(r=>{let c=r.name.replace(/^models\//,""),p=r.displayName||c;return{id:c,name:p.includes(c)?p:`${p} (${c})`,description:r.description||""}});if(n.length>0)return n.sort((r,c)=>{let p=l=>l==="gemini-2.5-flash"?100:l==="gemini-3.5-flash"?95:l==="gemini-3.1-flash-lite"?90:l==="gemini-2.5-pro"?85:l==="gemini-3.1-pro"?80:l==="gemini-1.5-flash"?60:l.includes("flash")?50:10;return p(c.id)-p(r.id)}),G=n,n}}catch(i){if(i.message?.includes("Chave de API"))throw i}return S}async function Ee(t){let e=t.trim().replace(/^["']|["']$/g,"");if(!e)return{ok:!1,message:"Insira sua chave de API."};try{let o=await K(e);if(o.length>0&&o!==S){let i=o[0];return{ok:!0,message:`Chave v\xE1lida! ${o.length} modelos Gemini dispon\xEDveis em sua conta. Recomendado: ${i.name}`,models:o}}}catch(o){return{ok:!1,message:o instanceof Error?o.message:String(o)}}let a=["gemini-2.5-flash","gemini-3.5-flash","gemini-1.5-flash"];for(let o of a)for(let i of["v1beta","v1"]){let s=`https://generativelanguage.googleapis.com/${i}/models/${o}:generateContent?key=${encodeURIComponent(e)}`;try{if((await fetch(s,{method:"POST",headers:{"Content-Type":"application/json","x-goog-api-key":e},body:JSON.stringify({contents:[{role:"user",parts:[{text:"PING"}]}],generationConfig:{maxOutputTokens:5}})})).ok)return{ok:!0,message:`Chave validada com sucesso no ${o} (${i})!`,models:S}}catch{}}return{ok:!1,message:"Chave de API inv\xE1lida, sem cota ou sem permiss\xE3o para modelos Gemini."}}async function re(t,e,a,o){let i=a.apiKey.trim().replace(/^["']|["']$/g,"");if(!i)throw new Error("Chave de API n\xE3o configurada.");let s=Qe(a.model);if(!G||G.length===0)try{o?.("Verificando modelos autorizados na sua chave de API...","info"),await K(i)}catch(m){let f=m instanceof Error?m.message:String(m);if(f.includes("inv\xE1lida")||f.includes("n\xE3o autorizada"))throw new Error(f)}let n=Date.now(),r=xe(t,e,a),c=[{text:r}];for(let m of e)c.push({inline_data:{mime_type:m.mediaType,data:m.base64}});let p={system_instruction:{parts:[{text:ye}]},contents:[{role:"user",parts:c}],generationConfig:{temperature:.05,maxOutputTokens:2500,response_mime_type:"application/json",response_schema:Ke}},l=[s,...G?.map(m=>m.id)||[],"gemini-2.5-flash","gemini-3.5-flash","gemini-3.1-flash-lite","gemini-2.5-pro","gemini-3.1-pro","gemini-1.5-flash"],d=Array.from(new Set(l)).filter(m=>!se.has(m));d.length===0&&(se.clear(),d.push(...S.map(m=>m.id)));let h=new Error("Nenhum modelo tentado.");for(let m=0;m<d.length;m++){let f=d[m],T=d[m+1];o?.(`Aguardando resposta da API (${f})...`,"info");let Re=["v1beta","v1"];for(let A of Re){let R=`https://generativelanguage.googleapis.com/${A}/models/${f}:generateContent?key=${encodeURIComponent(i)}`,B=new AbortController,ge=setTimeout(()=>B.abort(),35e3);try{let E=await fetch(R,{method:"POST",headers:{"Content-Type":"application/json","x-goog-api-key":i},body:JSON.stringify(p),signal:B.signal});if(clearTimeout(ge),!E.ok){let Ne=await E.text(),_e=we(Ne,E.status);if(E.status===404&&A==="v1beta")continue;throw new Error(_e)}let ee=await E.json(),te=ee.candidates?.[0];if(!te||!te.content?.parts?.[0]?.text)throw new Error("A IA n\xE3o retornou uma resposta estruturada v\xE1lida.");let Oe=te.content.parts[0].text,y=je(Oe);return Array.isArray(y.actions)||(y.actions=[]),Array.isArray(y.warnings)||(y.warnings=[]),typeof y.confidence!="number"&&(y.confidence=.8),y.usedModel=f,y.durationMs=Date.now()-n,y.promptSent=r,y.tokensUsed=ee.usageMetadata?.totalTokenCount,f!==s&&o?.(`Resolvido com sucesso pelo fallback '${f}' (${A})!`,"info"),{plan:y,rawUsage:ee.usageMetadata,usedModel:f}}catch(E){if(clearTimeout(ge),h=E,h.message.includes("inv\xE1lida")||h.message.includes("n\xE3o autorizada"))throw h}}let Be=h.message.includes("429")||h.message.includes("cota"),De=h.message.includes("503")||h.message.includes("sobrecarregado");if(h.message.includes("404")&&se.add(f),T){let A=Be?3500:De?2500:900,R=`Modelo '${f}' indispon\xEDvel (${h.message}). Aguardando ${A/1e3}s antes de alternar para '${T}'...`;console.warn(`[EasyQuiz Fallback] ${R}`),o?.(R,"warning"),await new Promise(B=>setTimeout(B,A))}else console.warn(`[EasyQuiz Fallback] Modelo '${f}' falhou: ${h.message}. Todos os modelos esgotados.`)}throw h}q();C();q();j();function b(t){if(!t)return null;let e=t.trim(),a=CSS.escape(e),o=document.querySelector(`[data-easyquiz-id="${a}"]`);if(o)return o;try{if(o=document.querySelector(e),o)return o}catch{}if(o=document.querySelector(`#${a}, [name="${a}"]`),o)return o;try{let n=e.replace(/"/g,""),r=`//*[text()="${n}"] | //*[contains(text(),"${n}")] | //*[@aria-label="${n}"] | //*[@data-category="${n}"] | //*[@data-testid="${n}"]`,c=document.evaluate(r,document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);if(c.singleNodeValue)return c.singleNodeValue}catch{}let i=cleanText(e).toLowerCase().replace(/['"“”«»]/g,""),s=Array.from(document.querySelectorAll('button, a, div, span, li, p, label, input, [draggable="true"], [data-testid], [class*="option"], [class*="card"]'));for(let n of s){let r=cleanText(n.textContent).toLowerCase().replace(/['"“”«»]/g,""),c=cleanText(n.getAttribute("aria-label")).toLowerCase().replace(/['"“”«»]/g,""),p=cleanText(n.getAttribute("data-category")).toLowerCase().replace(/['"“”«»]/g,""),l=cleanText(n.getAttribute("data-testid")).toLowerCase();if(r===i||c===i||p===i||l===i)return n}if(i.length>6)for(let n of s){if(n.children.length>6)continue;let r=cleanText(n.textContent).toLowerCase().replace(/['"“”«»]/g,"");if(r.includes(i)||r.length>10&&i.includes(r))return n}return null}function I(t,e){for(let a of e)t.dispatchEvent(new Event(a,{bubbles:!0,composed:!0}))}function v(t,e){let a=0,o=0;if(e&&e.length===2)a=e[0],o=e[1];else{let s=t.getBoundingClientRect();a=s.left+s.width/2,o=s.top+s.height/2}let i={bubbles:!0,cancelable:!0,composed:!0,clientX:a,clientY:o};t.dispatchEvent(new PointerEvent("pointerdown",i)),t.dispatchEvent(new MouseEvent("mousedown",i)),t.dispatchEvent(new PointerEvent("pointerup",i)),t.dispatchEvent(new MouseEvent("mouseup",i)),t.click()}function Ce(t,e){if(t instanceof HTMLInputElement||t instanceof HTMLTextAreaElement){let a=t instanceof HTMLTextAreaElement?HTMLTextAreaElement.prototype:HTMLInputElement.prototype,o=Object.getOwnPropertyDescriptor(a,"value")?.set;o?o.call(t,e):t.value=e,I(t,["input","change","blur"]);return}if(t.isContentEditable){t.textContent=e,I(t,["input","change","blur"]);return}throw new Error(`N\xE3o \xE9 poss\xEDvel injetar texto em <${t.tagName.toLowerCase()}>`)}function Le(t,e){if(t instanceof HTMLInputElement&&["checkbox","radio"].includes(t.type)){t.checked!==e&&t.click(),t.checked!==e&&(Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"checked")?.set?.call(t,e),I(t,["input","change"]));return}let a=t.getAttribute("role");if(a==="radio"||a==="checkbox"){t.getAttribute("aria-checked")==="true"!==e&&(v(t),t.setAttribute("aria-checked",e?"true":"false"),I(t,["input","change"]));return}v(t)}function We(t,e){if(t instanceof HTMLSelectElement){for(let a of Array.from(t.options))a.selected=e.includes(a.value);I(t,["input","change"]);return}throw new Error("Elemento n\xE3o \xE9 select.")}function Xe(){let t={};return{dropEffect:"move",effectAllowed:"all",files:[],items:[],types:["text/plain"],clearData:e=>{e?delete t[e]:Object.keys(t).forEach(a=>delete t[a])},getData:e=>t[e]||"",setData:(e,a)=>{t[e]=a},setDragImage:()=>{}}}function pe(t,e){let a=Xe(),o=t.getBoundingClientRect(),i=e.getBoundingClientRect(),s={clientX:o.left+o.width/2,clientY:o.top+o.height/2,bubbles:!0,cancelable:!0},n={clientX:i.left+i.width/2,clientY:i.top+i.height/2,bubbles:!0,cancelable:!0};t.dispatchEvent(new PointerEvent("pointerdown",s)),t.dispatchEvent(new MouseEvent("mousedown",s)),t.dispatchEvent(new DragEvent("dragstart",{...s,dataTransfer:a})),e.dispatchEvent(new DragEvent("dragenter",{...n,dataTransfer:a})),e.dispatchEvent(new DragEvent("dragover",{...n,dataTransfer:a})),e.dispatchEvent(new DragEvent("drop",{...n,dataTransfer:a})),t.dispatchEvent(new DragEvent("dragend",{...s,dataTransfer:a})),e.dispatchEvent(new PointerEvent("pointerup",n)),e.dispatchEvent(new MouseEvent("mouseup",n))}var Ie={fill:(t,e)=>{let a=b(t);a?Ce(a,e):console.warn(`$eq.fill: Elemento ${t} n\xE3o encontrado`)},click:t=>{let e=b(t);e?v(e):console.warn(`$eq.click: Elemento ${t} n\xE3o encontrado`)},check:(t,e)=>{let a=b(t);a?Le(a,e):console.warn(`$eq.check: Elemento ${t} n\xE3o encontrado`)},drag:(t,e)=>{let a=b(t),o=b(e);a&&o?pe(a,o):console.warn(`$eq.drag: Origem ou destino n\xE3o encontrado (${t} -> ${e})`)},categorize:(t,e)=>{let a=b(t),o=b(e);if(!a||!o){console.warn(`$eq.categorize: Item ou categoria n\xE3o encontrados (${t} -> ${e})`);return}pe(a,o),v(a),setTimeout(()=>{v(o)},150)}};window.$eq=Ie;async function ke(t){if(t.t==="js"){let o=String(t.v||"");try{new Function("$eq","document","window",o)(Ie,document,window)}catch(i){console.warn("[EasyQuiz JS Execution]",i)}return}if(t.t==="drag"){let o=b(t.from),i=b(t.to);if(o&&i){pe(o,i),v(o),await new Promise(n=>setTimeout(n,150)),v(i);let s=i.querySelector('[data-role="dropzone"], [class*="bucket" i], [class*="drop" i]');s&&s!==i&&v(s)}else console.warn(`[EasyQuiz] Drag: alvo n\xE3o encontrado (${t.from} -> ${t.to})`);return}let e=t.id||"",a=b(e);if(!a&&t.t!=="adv"){console.warn(`[EasyQuiz] Alvo '${e}' n\xE3o encontrado para a\xE7\xE3o '${t.t}'. Prosseguindo...`);return}switch(t.t){case"val":a&&Ce(a,String(t.v));break;case"chk":a&&Le(a,!!t.c);break;case"sel":if(a){let i=Array.isArray(t.v)?t.v:[String(t.v)];We(a,i)}break;case"clk":a&&v(a,t.co);break;case"adv":let o=a;if(!o){let i=Array.from(document.querySelectorAll('button, a, input[type="submit"]')).filter(s=>Q.test(s.textContent||s.value||""));i.length&&(o=i[0])}if(o){let i=t.id||o.textContent?.trim()||o.value?.trim()||"";i&&ne(window.location.hostname,{advanceSelector:i}),v(o)}else console.warn("[EasyQuiz] Bot\xE3o de avan\xE7o n\xE3o localizado.");break}}async function ze(t,e){let a=t.actions.filter(s=>s.t!=="adv"),o=t.actions.filter(s=>s.t==="adv");for(let s of a)await ke(s),s.t==="drag"&&await new Promise(n=>setTimeout(n,350));let i=!1;if(e){let s=Array.from(document.querySelectorAll('button, [role="button"], input[type="submit"]')).find(n=>/(verificar|checar|check|conferir)/i.test(n.textContent||n.value||""));if(s&&isVisible(s)&&(v(s),await new Promise(n=>setTimeout(n,800))),o.length>0)await new Promise(n=>setTimeout(n,600)),ke(o[0]),i=!0;else if(s){await new Promise(r=>setTimeout(r,600));let n=Array.from(document.querySelectorAll('button, [role="button"], a, input[type="submit"]')).find(r=>/(próxim[oa]|next|continuar|avançar|mostrar resumo)/i.test(r.textContent||r.value||""));n&&isVisible(n)&&(v(n),i=!0)}}return{applied:a.length,advanced:i}}var z=null,H=[];function P(){z&&(z.style.removeProperty("outline"),z.style.removeProperty("outline-offset"),z=null);for(let t of H)t.style.removeProperty("outline"),t.style.removeProperty("outline-offset"),t.style.removeProperty("background-color");H=[]}function ue(t){P(),z=t,t.style.outline="2px solid #00e5ff",t.style.outlineOffset="4px"}function He(t){for(let e of t){if(e.t==="adv"||e.t==="js")continue;if(e.t==="drag"){try{let s=document.querySelector(`[data-easyquiz-id="${CSS.escape(e.from)}"]`)||document.querySelector(e.from),n=document.querySelector(`[data-easyquiz-id="${CSS.escape(e.to)}"]`)||document.querySelector(e.to);s&&(s.style.outline="2px solid #00ff88",H.push(s)),n&&(n.style.outline="2px dashed #00e5ff",H.push(n))}catch{}continue}if(!e.id)continue;let a=CSS.escape(e.id),o=document.querySelector(`[data-easyquiz-id="${a}"]`);if(!o)continue;let i=o.closest('label, [role="listitem"], .answer, .form-check')||o;i.style.outline="2px solid #00ff88",i.style.outlineOffset="2px",i.style.backgroundColor="rgba(0, 255, 136, 0.08)",H.push(i)}}j();var $=4,Ze=1200,he=12e5;function Y(t){return new Promise((e,a)=>{let o=new FileReader;o.onerror=()=>a(new Error("Falha ao converter blob para base64.")),o.onload=()=>{let i=String(o.result||"");e(i.split(",")[1]||"")},o.readAsDataURL(t)})}async function W(t){let e=0,a=0;if(t instanceof HTMLImageElement?(e=t.naturalWidth||t.width,a=t.naturalHeight||t.height):(e=t.width,a=t.height),e<=0||a<=0)throw new Error("Dimens\xF5es inv\xE1lidas.");let o=Math.min(1,Ze/Math.max(e,a)),i=Math.max(1,Math.round(e*o)),s=Math.max(1,Math.round(a*o)),n=document.createElement("canvas");n.width=i,n.height=s;let r=n.getContext("2d",{alpha:!1});if(!r)throw new Error("Sem suporte a Canvas 2D.");return r.fillStyle="#ffffff",r.fillRect(0,0,i,s),r.drawImage(t,0,0,i,s),new Promise((c,p)=>{n.toBlob(l=>l?c(l):p(new Error("Falha compress\xE3o.")),"image/jpeg",.8)})}async function Pe(t){try{let e=t.cloneNode(!0),a=t.offsetWidth||500,o=t.offsetHeight||500,i=`
      <svg xmlns="http://www.w3.org/2000/svg" width="${a}" height="${o}">
        <foreignObject width="100%" height="100%">
          <div xmlns="http://www.w3.org/1999/xhtml" style="background:#fff;font-family:sans-serif;">
            ${e.innerHTML}
          </div>
        </foreignObject>
      </svg>
    `,s=new Blob([i],{type:"image/svg+xml;charset=utf-8"}),n=URL.createObjectURL(s),r=new Image;r.crossOrigin="anonymous",await new Promise((l,d)=>{r.onload=l,r.onerror=d,r.src=n});let c=await W(r),p=await Y(c);if(URL.revokeObjectURL(n),p&&p.length<=he)return{mediaType:"image/jpeg",base64:p,alt:"Captura Suprema via rasteriza\xE7\xE3o DOM",source:"rasterized"}}catch(e){console.warn("Falha na rasteriza\xE7\xE3o suprema:",e)}return null}async function et(t){let e=t.currentSrc||t.src;if(!e)return null;let a=(t.alt||t.getAttribute("aria-label")||"Imagem da quest\xE3o").slice(0,500);if(t.complete&&t.naturalWidth>0)try{let o=await W(t),i=await Y(o);if(i&&i.length<=he)return{mediaType:"image/jpeg",base64:i,alt:a,source:e.slice(0,2e3)}}catch{}try{let o=await fetch(e,{mode:"cors"});if(o.ok){let i=await o.blob();if(i.type.startsWith("image/")){let s=await createImageBitmap(i),n=await W(s);s.close();let r=await Y(n);if(r&&r.length<=he)return{mediaType:"image/jpeg",base64:r,alt:a,source:e.slice(0,2e3)}}}}catch{return Pe(t.parentElement||t)}return null}async function me(t,e=!0){if(!e)return[];let a=[],o=0,i=Array.from(t.querySelectorAll("img")).filter(x).slice(0,$);for(let s of i)try{let n=await et(s);if(n&&o+n.base64.length<=25e5&&(a.push(n),o+=n.base64.length,a.length>=$))break}catch{}if(a.length<$){let s=Array.from(t.querySelectorAll("canvas")).filter(x).slice(0,$);for(let n of s)try{let r=await W(n),c=await Y(r);if(c&&o+c.length<=25e5&&(a.push({mediaType:"image/jpeg",base64:c,alt:"Canvas inline",source:"canvas"}),o+=c.length,a.length>=$))break}catch{let r=await Pe(n.parentElement||n);r&&(a.push(r),o+=r.base64.length)}}return a}q();q();C();var X=class{active=!1;timer=null;callbacks;lastRunTime=0;lastActionTime=0;isProcessing=!1;constructor(e){this.callbacks=e}isActive(){return this.active}start(){this.active||(this.active=!0,this.lastActionTime=Date.now(),this.callbacks.onStatusChange("waiting","> [SYS] Autopilot ENGAGED. Monitorando..."),this.loop())}stop(){this.active=!1,this.timer&&clearTimeout(this.timer),this.callbacks.onStatusChange("idle","> [SYS] Autopilot DESATIVADO.")}errorCount=0;async loop(){if(!this.active)return;let e=Date.now();if(e-this.lastRunTime<2500||this.isProcessing){this.timer=window.setTimeout(()=>this.loop(),500);return}this.lastRunTime=e;try{this.isProcessing=!0;let a=k(!1);if(!a){let{captureFullPageText:o}=await Promise.resolve().then(()=>(C(),J));a=o()}if(a){let o=a.controls.filter(s=>s.role==="answer"),i=_(window.location.hostname);if(o.length>0){this.callbacks.onStatusChange("analyzing","> [IA] Quest\xE3o/Exerc\xEDcio detectado. Consultando IA...","text-blue"),await new Promise(n=>setTimeout(n,600));let s=await this.callbacks.onRequestAnalysis();if(s){if(this.callbacks.onStatusChange("analyzing",`> [IA] (${s.usedModel||"gemini"}) Confian\xE7a: ${(s.confidence*100).toFixed(1)}% | Modo: ${s.mode}`,"text-blue"),this.callbacks.onStatusChange("analyzing",`> [IA] Racioc\xEDnio: ${s.rationale}`,"text-blue"),this.callbacks.onStatusChange("analyzing",`> [IA] A\xE7\xF5es geradas: ${s.actions.length}`,"text-blue"),this.errorCount=0,s.memoryToStore&&this.callbacks.onStatusChange("analyzing",`> [IA] \u{1F9E0} Mem\xF3ria RAG salva: "${s.memoryToStore}"`,"text-yellow"),s.pageType==="conclusion"){this.callbacks.onStatusChange("idle","> [SYS] Atividade conclu\xEDda! Desligando Autopilot.","text-green"),this.stop();return}}else{this.errorCount++;let n=this.errorCount===1?5e3:8e3;this.callbacks.onStatusChange("waiting",`> [AVISO] Falha na an\xE1lise (${this.errorCount}/3). Aguardando ${n/1e3}s para estabiliza\xE7\xE3o antes de tentar novamente...`,"text-yellow"),await new Promise(r=>setTimeout(r,n))}this.lastActionTime=Date.now()}else if(i.advanceSelector&&b(i.advanceSelector)&&a.questionText.length<50){let s=b(i.advanceSelector);s&&(this.callbacks.onStatusChange("advancing",`> [BRUTE] Avan\xE7ando via cache "${i.advanceSelector}"...`),await new Promise(n=>setTimeout(n,1e3)),v(s),this.lastActionTime=Date.now(),this.errorCount=0)}else{this.callbacks.onStatusChange("analyzing","> [IA] P\xE1gina informativa/contexto detectada. Lendo e consultando IA...","text-blue"),await new Promise(n=>setTimeout(n,600));let s=await this.callbacks.onRequestAnalysis();if(s){if(this.callbacks.onStatusChange("analyzing",`> [IA] (${s.usedModel||"gemini"}) Tipo: ${s.pageType} | Modo: ${s.mode}`,"text-blue"),this.callbacks.onStatusChange("analyzing",`> [IA] Racioc\xEDnio: ${s.rationale}`,"text-blue"),s.memoryToStore&&this.callbacks.onStatusChange("analyzing",`> [IA] \u{1F9E0} Conte\xFAdo absorvido na mem\xF3ria: "${s.memoryToStore}"`,"text-yellow"),s.pageType==="info")this.callbacks.onStatusChange("advancing","> [IA] \u{1F4D6} Leitura conclu\xEDda. Avan\xE7ando automaticamente...","text-green");else if(s.pageType==="start")this.callbacks.onStatusChange("advancing","> [SYS] In\xEDcio de m\xF3dulo detectado. Iniciando...","text-blue");else if(s.pageType==="conclusion"){this.callbacks.onStatusChange("idle","> [SYS] Atividade conclu\xEDda! Desligando Autopilot.","text-green"),this.stop();return}this.errorCount=0}else{this.errorCount++;let n=this.errorCount===1?5e3:8e3;this.callbacks.onStatusChange("waiting",`> [AVISO] Falha ao processar p\xE1gina (${this.errorCount}/3). Aguardando ${n/1e3}s para estabiliza\xE7\xE3o antes de tentar novamente...`,"text-yellow"),await new Promise(r=>setTimeout(r,n))}this.lastActionTime=Date.now()}if(this.errorCount>=3){this.callbacks.onStatusChange("error","> [ERRO] 3 falhas consecutivas. Abortando Autopilot para poupar sua cota e tokens.","text-red"),this.callbacks.onStatusChange("waiting","> [DICA] Verifique a mensagem vermelha de [ERRO DETALHADO] no console acima para saber o motivo exato.","text-yellow"),this.stop();return}}}catch(a){console.warn("[EasyQuiz Autopilot]",a)}finally{this.isProcessing=!1}this.active&&(this.timer=window.setTimeout(()=>this.loop(),1e3))}};var u={logo:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.8L19.2 8 12 11.2 4.8 8 12 4.8zM4 9.6l7 3.1v7.5l-7-3.5V9.6zm9 10.6v-7.5l7-3.1v7.1l-7 3.5z"/></svg>',rocket:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M13.13 2.81a.5.5 0 0 0-.46-.07c-.42.15-2.08.79-3.9 2.61-2.04 2.04-2.6 4.09-2.73 4.96l-.97.98a1 1 0 0 0-.29.71v2.12a1 1 0 0 0 .29.71l2.83 2.83a1 1 0 0 0 .71.29h2.12a1 1 0 0 0 .71-.29l.98-.97c.87-.13 2.92-.69 4.96-2.73 1.82-1.82 2.46-3.48 2.61-3.9a.5.5 0 0 0-.07-.46l-6.79-6.79zM4.5 16.5l-2.09 2.09a.5.5 0 0 0 .35.85h3.04l.35.35v3.04a.5.5 0 0 0 .85.35L9.09 21.1l-4.59-4.6z"/></svg>',play:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>',stop:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h12v12H6z"/></svg>',code:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>',terminal:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8h16v10zm-12-3l3-3-3-3 1.4-1.4L13.8 12l-4.4 4.4L8 15zm6 0h4v2h-4v-2z"/></svg>',inspector:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>',settings:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.49.49 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>',key:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M7 14c-2.76 0-5-2.24-5-5s2.24-5 5-5c2.42 0 4.44 1.72 4.9 4H22v4h-2v3h-3v-3h-2v3h-3v-3h-2.1c-.46 2.28-2.48 4-4.9 4zm0-7c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>',paste:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 2h-4.18C14.4 .84 13.3 0 12 0c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm7 18H5V4h2v3h10V4h2v16z"/></svg>',edit:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>',trash:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>',eraser:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M15.14 3c-.51 0-1.02.2-1.41.59L2.59 14.73c-.78.78-.78 2.05 0 2.83L6.44 21.4c.78.78 2.05.78 2.83 0l11.14-11.14c.78-.78.78-2.05 0-2.83l-3.86-3.84c-.39-.39-.9-.59-1.41-.59zm.71 2.71l3.15 3.15-3.15 3.15-3.15-3.15 3.15-3.15zm-4.57 4.57l3.15 3.15-4.57 4.57H6.71l-3-3 7.57-7.57z"/></svg>',save:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/></svg>',analyze:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L3 14h8l-2 8 12-12h-8l2-8z"/></svg>',apply:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>',close:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>',chevronRight:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>',chevronLeft:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>',eye:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>',eyeOff:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.44-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.17c0-1.66-1.34-3-3-3l-.17.02z"/></svg>',check:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>',clock:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>',copy:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>',refresh:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg>',chip:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4h12v16H6V4zm2 2v12h8V6H8zm-4 3h2v2H4V9zm0 4h2v2H4v-2zm16-4h2v2h-2V9zm0 4h2v2h-2v-2zM9 2h2v2H9V2zm4 0h2v2h-2V2zm-4 18h2v2H9v-2zm4 0h2v2h-2v-2z"/></svg>'};var $e=`
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&family=Nunito:wght@400;600;700;800;900&display=swap');

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

  /* Retractable Edge Tab (Dock Toggle on left border of sidebar) */
  .eq-dock-toggle {
    pointer-events: auto;
    position: absolute;
    left: -38px;
    top: 50%;
    transform: translateY(-50%);
    width: 38px;
    height: 76px;
    background: #181818;
    border: 1px solid #333333;
    border-right: none;
    border-radius: 8px 0 0 8px;
    color: #00ffcc;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    cursor: pointer;
    box-shadow: -4px 0 16px rgba(0, 0, 0, 0.6);
    transition: background 0.15s, color 0.15s, width 0.15s;
    user-select: none;
    z-index: 10;
  }

  .eq-dock-toggle:hover {
    background: #252526;
    color: #ffffff;
    width: 42px;
    left: -42px;
  }

  .eq-dock-toggle-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.25s ease;
  }

  .eq-dock-toggle-label {
    font-size: 9px;
    font-weight: 900;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  /* Floating Launcher (Bottom Right) */
  .eq-launcher {
    pointer-events: auto;
    position: fixed;
    right: 20px;
    bottom: 20px;
    z-index: 2147483646;
    width: 50px;
    height: 50px;
    background: #181818;
    border: 2px solid #00ffcc;
    border-radius: 12px;
    color: #00ffcc;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2px;
    cursor: pointer;
    font-weight: 900;
    font-size: 10px;
    letter-spacing: 0.05em;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.7), 0 0 10px rgba(0, 255, 204, 0.2);
    transition: transform 0.15s, box-shadow 0.15s, background 0.15s;
    user-select: none;
  }

  .eq-launcher:hover {
    background: #00ffcc;
    color: #121212;
    transform: scale(1.05);
    box-shadow: 0 6px 24px rgba(0, 255, 204, 0.4);
  }

  .eq-launcher:active {
    transform: scale(0.95);
  }

  /* VS Code Fixed Right Sidebar */
  .eq-sidebar {
    pointer-events: auto;
    position: fixed;
    right: 0;
    top: 0;
    width: 420px;
    max-width: 95vw;
    height: 100vh;
    z-index: 2147483647;
    background: #181818;
    border-left: 1px solid #2d2d30;
    color: #cccccc;
    display: flex;
    flex-direction: column;
    box-shadow: -8px 0 32px rgba(0, 0, 0, 0.75);
    transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    transform: translateX(0);
    overflow: visible;
  }

  .eq-sidebar.eq-collapsed {
    transform: translateX(100%);
  }

  .eq-sidebar.eq-collapsed .eq-dock-toggle-icon {
    transform: rotate(180deg);
  }

  /* Sidebar Header */
  .eq-header {
    background: #1f1f1f;
    border-bottom: 1px solid #2d2d30;
    height: 48px;
    min-height: 48px;
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
    font-size: 13px;
    font-weight: 800;
    color: #ffffff;
    letter-spacing: 0.05em;
  }

  .eq-brand-badge {
    background: rgba(0, 255, 204, 0.15);
    border: 1px solid #00ffcc;
    color: #00ffcc;
    font-size: 10px;
    font-weight: 800;
    padding: 1px 6px;
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
    color: #858585;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background 0.15s, color 0.15s;
  }

  .eq-icon-btn:hover {
    background: #2a2d2e;
    color: #ffffff;
  }

  /* VS Code Activity Rail / Tabs */
  .eq-activity-bar {
    display: flex;
    background: #252526;
    border-bottom: 1px solid #2d2d30;
    height: 42px;
    min-height: 42px;
  }

  .eq-tab-btn {
    flex: 1;
    background: transparent;
    border: none;
    border-bottom: 2px solid transparent;
    color: #969696;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    font-family: inherit;
    font-size: 11px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.15s;
    user-select: none;
    padding: 0 6px;
    white-space: nowrap;
  }

  .eq-tab-btn:hover {
    color: #ffffff;
    background: #2a2d2e;
  }

  .eq-tab-btn.active {
    color: #ffffff;
    background: #1e1e1e;
    border-bottom: 2px solid #00ffcc;
  }

  .eq-tab-btn svg {
    flex-shrink: 0;
  }

  /* Main Scrollable View Area */
  .eq-view-container {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 14px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    background: #1e1e1e;
  }

  .eq-view-container::-webkit-scrollbar {
    width: 8px;
  }
  .eq-view-container::-webkit-scrollbar-track {
    background: #181818;
  }
  .eq-view-container::-webkit-scrollbar-thumb {
    background: #333333;
    border-radius: 4px;
  }
  .eq-view-container::-webkit-scrollbar-thumb:hover {
    background: #444444;
  }

  /* Section Styles */
  .eq-section-title {
    font-size: 11px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: #858585;
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

  /* Input and Actions Bar */
  .eq-input-box {
    display: flex;
    flex-direction: column;
    gap: 6px;
    background: #252526;
    border: 1px solid #333333;
    border-radius: 6px;
    padding: 8px;
  }

  .eq-input-wrap {
    display: flex;
    align-items: center;
    background: #1e1e1e;
    border: 1px solid #3c3c3c;
    border-radius: 4px;
    overflow: hidden;
    transition: border-color 0.15s;
  }

  .eq-input-wrap:focus-within {
    border-color: #00ffcc;
  }

  .eq-input {
    flex: 1;
    height: 34px;
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

  .eq-input-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
  }

  .eq-btn-tool {
    height: 28px;
    background: #2d2d30;
    border: 1px solid #3c3c3c;
    border-radius: 4px;
    color: #cccccc;
    font-size: 11px;
    font-weight: 700;
    font-family: inherit;
    padding: 0 8px;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    cursor: pointer;
    transition: all 0.15s;
    user-select: none;
  }

  .eq-btn-tool:hover {
    background: #3e3e42;
    color: #ffffff;
    border-color: #00ffcc;
  }

  .eq-btn-tool.primary {
    background: #007acc;
    border-color: #007acc;
    color: #ffffff;
  }

  .eq-btn-tool.primary:hover {
    background: #0098ff;
  }

  .eq-btn-tool.danger {
    background: #442222;
    border-color: #662222;
    color: #ff8888;
  }

  .eq-btn-tool.danger:hover {
    background: #662222;
    color: #ffffff;
  }

  /* Form Elements */
  .eq-select {
    width: 100%;
    height: 34px;
    background: #252526;
    border: 1px solid #3c3c3c;
    border-radius: 4px;
    color: #ffffff;
    padding: 0 8px;
    font-family: inherit;
    font-size: 12px;
    font-weight: 600;
    outline: none;
    cursor: pointer;
  }

  .eq-select:focus {
    border-color: #00ffcc;
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
  }

  .eq-checkbox-label input[type="checkbox"] {
    appearance: none;
    width: 16px;
    height: 16px;
    background: #252526;
    border: 1px solid #3c3c3c;
    border-radius: 3px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
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

  .eq-grid-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }

  /* Live AI Status Timeline Card */
  .eq-status-card {
    background: #252526;
    border: 1px solid #2d2d30;
    border-radius: 6px;
    padding: 10px 12px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .eq-status-card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .eq-ai-indicator {
    display: flex;
    align-items: center;
    gap: 6px;
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
  }

  .eq-dot-pulse.busy {
    background: #00ffcc;
    box-shadow: 0 0 8px #00ffcc;
    animation: eq-pulse 1s infinite alternate;
  }

  .eq-dot-pulse.error {
    background: #ff4757;
    box-shadow: 0 0 8px #ff4757;
    animation: none;
  }

  @keyframes eq-pulse {
    0% { transform: scale(0.8); opacity: 0.7; }
    100% { transform: scale(1.3); opacity: 1; }
  }

  .eq-stopwatch {
    font-family: 'JetBrains Mono', Consolas, monospace;
    font-size: 11px;
    font-weight: 700;
    color: #00ffcc;
    background: #181818;
    padding: 2px 6px;
    border-radius: 4px;
    border: 1px solid #333333;
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .eq-status-text {
    font-size: 12px;
    color: #bbbbbb;
    line-height: 1.4;
    word-break: break-word;
  }

  /* Primary Action Buttons */
  .eq-btn-primary {
    height: 42px;
    background: #00ffcc;
    border: 1px solid #00ffcc;
    border-radius: 6px;
    color: #000000;
    font-family: inherit;
    font-size: 13px;
    font-weight: 800;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    box-shadow: 0 4px 12px rgba(0, 255, 204, 0.2);
    transition: all 0.15s;
    user-select: none;
  }

  .eq-btn-primary:hover {
    background: #33ffdb;
    box-shadow: 0 6px 16px rgba(0, 255, 204, 0.35);
  }

  .eq-btn-primary:active {
    transform: translateY(1px);
  }

  .eq-btn-primary.danger {
    background: #ff4757;
    border-color: #ff4757;
    color: #ffffff;
    box-shadow: 0 4px 12px rgba(255, 71, 87, 0.3);
  }

  .eq-btn-primary:disabled {
    background: #2d2d30;
    border-color: #3c3c3c;
    color: #666666;
    cursor: not-allowed;
    box-shadow: none;
    transform: none;
  }

  .eq-btn-secondary {
    height: 38px;
    background: #252526;
    border: 1px solid #3c3c3c;
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
    transition: all 0.15s;
  }

  .eq-btn-secondary:hover {
    background: #2d2d30;
    border-color: #00ffcc;
    color: #ffffff;
  }

  .eq-btn-secondary:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    border-color: #333333;
    color: #666666;
  }

  /* VS Code Console Terminal */
  .eq-terminal {
    width: 100%;
    background: #141414;
    border: 1px solid #2d2d30;
    border-radius: 6px;
    padding: 10px;
    font-family: 'JetBrains Mono', Consolas, monospace;
    font-size: 11px;
    color: #cccccc;
    height: 190px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 4px;
    text-align: left;
  }

  .eq-terminal::-webkit-scrollbar {
    width: 6px;
  }
  .eq-terminal::-webkit-scrollbar-thumb {
    background: #2a2a2a;
    border-radius: 3px;
  }

  .text-blue { color: #5bc0eb; }
  .text-yellow { color: #fde74c; }
  .text-red { color: #ff5555; }
  .text-green { color: #00ff88; }
  .text-muted { color: #666666; }

  /* Prompt Inspector Views */
  .eq-inspector-meta {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 6px;
  }

  .eq-meta-box {
    background: #252526;
    border: 1px solid #2d2d30;
    border-radius: 4px;
    padding: 6px 8px;
    text-align: center;
  }

  .eq-meta-title {
    font-size: 9px;
    color: #888888;
    text-transform: uppercase;
    font-weight: 700;
  }

  .eq-meta-val {
    font-family: 'JetBrains Mono', Consolas, monospace;
    font-size: 12px;
    font-weight: 800;
    color: #00ffcc;
    margin-top: 2px;
  }

  .eq-code-block {
    background: #141414;
    border: 1px solid #2d2d30;
    border-radius: 6px;
    padding: 10px;
    font-family: 'JetBrains Mono', Consolas, monospace;
    font-size: 11px;
    color: #dddddd;
    max-height: 220px;
    overflow-y: auto;
    white-space: pre-wrap;
    word-break: break-word;
    user-select: text;
  }

  .eq-rationale-card {
    background: #252526;
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
    background: #141414;
    border: 1px solid #2d2d30;
    border-radius: 6px;
    padding: 8px;
    max-height: 160px;
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
    background: #252526;
    border: 1px solid #3c3c3c;
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

  @media (max-width: 480px) {
    .eq-sidebar {
      width: 100vw;
      max-width: 100vw;
    }
  }
`;var tt=[{value:"",label:"Detec\xE7\xE3o Autom\xE1tica"},{value:"escolha_unica",label:"M\xFAltipla Escolha (\xDAnica)"},{value:"escolha_multipla",label:"M\xFAltipla Escolha (V\xE1rias)"},{value:"categorizacao",label:"Categoriza\xE7\xE3o / Grupos"},{value:"arrastar_soltar",label:"Arrastar e Soltar (Drag & Drop)"},{value:"ordenacao",label:"Ordena\xE7\xE3o / Sequ\xEAncia"},{value:"verdadeiro_falso",label:"Verdadeiro / Falso"},{value:"texto_livre",label:"Texto Livre / Dissertativa"},{value:"preenchimento",label:"Preenchimento de Lacunas"}],ot=[{value:"smart",label:"Inteligente (Auto-H\xEDbrido)"},{value:"command",label:"Apenas Comando (Seguro)"},{value:"javascript",label:"Apenas JS Nativo (Avan\xE7ado)"}],Z=class{host;shadow;callbacks;autopilot;initialSettings;isCollapsed=!1;activeTab="autopilot";stopwatchInterval=null;stopwatchStartTime=0;latestPlan=null;launcherBtn;dockToggleBtn;sidebarEl;apToggleBtn;apConsole;dotPulseAp;statusTextAp;stopwatchAp;dotPulseAdv;statusTextAdv;stopwatchAdv;inspModel;inspLatency;inspTokens;inspPrompt;inspRationale;inspActions;copyPromptBtn;apiKeyInput;modelSelect;modeSelect;engineSelect;dryRunCheckbox;autoApplyCheckbox;autoAdvanceCheckbox;hostDarkModeCheckbox;useVisionCheckbox;analyzeBtn;applyBtn;resultContainer;constructor(e,a){this.initialSettings=e,this.callbacks=a,this.autopilot=new X({onStatusChange:(o,i,s)=>{this.logToConsole(i,s),o==="analyzing"?this.setBusy(!0,"Autopilot: IA analisando..."):(o==="advancing"||o==="waiting")&&this.setBusy(!1)},onRequestAnalysis:async()=>{try{return await this.callbacks.onAnalyze()||null}catch{return null}}}),this.host=document.createElement("div"),this.host.id="easyquiz-shadow-root",this.host.style.position="fixed",this.host.style.top="0",this.host.style.left="0",this.host.style.width="100vw",this.host.style.height="100vh",this.host.style.zIndex="2147483647",this.host.style.pointerEvents="none",this.shadow=this.host.attachShadow({mode:"open"}),this.shadow.innerHTML=`
      <style>${$e}</style>

      <!-- Bot\xE3o Flutuante Inferior -->
      <button class="eq-launcher" type="button" title="Abrir EasyQuiz (Alt+Q)">
        ${u.logo}
        <span>EQ</span>
      </button>

      <!-- Sidebar Fixa Lateral Direita Estilo VS Code -->
      <aside class="eq-sidebar" aria-label="EasyQuiz Sidebar">
        <!-- Aba Retr\xE1til na Borda Esquerda -->
        <button class="eq-dock-toggle" id="eq-dock-toggle" type="button" title="Recolher / Expandir Painel (Alt+Q)">
          <span class="eq-dock-toggle-icon">${u.chevronRight}</span>
          <span class="eq-dock-toggle-label">EQ</span>
        </button>

        <!-- Cabe\xE7alho VS Code -->
        <header class="eq-header">
          <div class="eq-brand">
            ${u.logo}
            <span>EasyQuiz</span>
            <span class="eq-brand-badge">2.0 SUPREME</span>
          </div>
          <div class="eq-header-tools">
            <button class="eq-icon-btn" id="eq-min-btn" type="button" title="Minimizar (Alt+Q)">${u.chevronRight}</button>
            <button class="eq-icon-btn" id="eq-close-btn" type="button" title="Fechar">${u.close}</button>
          </div>
        </header>

        <!-- Activity Bar Rail (Abas) -->
        <nav class="eq-activity-bar" role="tablist">
          <button class="eq-tab-btn active" id="eq-tab-autopilot" role="tab" title="Modo Autopilot Cont\xEDnuo">
            ${u.rocket}
            <span>Autopilot</span>
          </button>
          <button class="eq-tab-btn" id="eq-tab-advanced" role="tab" title="Modo Manual e Avan\xE7ado">
            ${u.code}
            <span>Avan\xE7ado</span>
          </button>
          <button class="eq-tab-btn" id="eq-tab-inspector" role="tab" title="Inspetor de Prompt & IA">
            ${u.inspector}
            <span>Inspetor IA</span>
          </button>
          <button class="eq-tab-btn" id="eq-tab-settings" role="tab" title="Configura\xE7\xF5es & Chaves">
            ${u.settings}
            <span>Configura\xE7\xF5es</span>
          </button>
        </nav>

        <!-- TAB 1: AUTOPILOT -->
        <div class="eq-view-container" id="eq-view-autopilot">
          <div style="display: flex; gap: 8px; width: 100%;">
            <button class="eq-btn-primary" id="eq-ap-toggle-btn" type="button" style="flex: 1;">
              ${u.play} INICIAR AUTOPILOT
            </button>
            <button class="eq-btn-secondary" id="eq-ap-clear-memory" type="button" title="Limpar Mem\xF3ria da Sess\xE3o Atual">
              ${u.eraser} Mem\xF3ria
            </button>
          </div>

          <!-- Status & Stopwatch Timeline Card -->
          <div class="eq-status-card">
            <div class="eq-status-card-header">
              <div class="eq-ai-indicator">
                <span class="eq-dot-pulse" id="eq-dot-ap"></span>
                <span>Status da IA</span>
              </div>
              <div class="eq-stopwatch" id="eq-stopwatch-ap">
                ${u.clock} <span>0.00s</span>
              </div>
            </div>
            <div class="eq-status-text" id="eq-status-text-ap">
              Pronto para iniciar. O Autopilot responder\xE1 e avan\xE7ar\xE1 as quest\xF5es de forma autom\xE1tica.
            </div>
          </div>

          <!-- Console Terminal -->
          <div class="eq-section-title">
            <span>Terminal de Opera\xE7\xF5es</span>
            <span style="font-size: 10px; color: #666;">Live Event Stream</span>
          </div>
          <div class="eq-terminal" id="eq-ap-console">
            <div class="text-blue">> [SYS] EasyQuiz 2.0 Supreme inicializado.</div>
            <div class="text-muted">> [SYS] Conex\xE3o com a API do Google Gemini pronta.</div>
          </div>

          <div class="eq-footer-note">H\xEDbrido 4.0 \u2022 RAG + AST + Vision (Opt-in)</div>
        </div>

        <!-- TAB 2: AVAN\xC7ADO -->
        <div class="eq-view-container" id="eq-view-advanced" style="display: none;">
          <button class="eq-btn-primary" id="eq-analyze-btn" type="button">
            ${u.analyze} Analisar & Resolver Quest\xE3o
          </button>

          <!-- Status & Stopwatch Adv -->
          <div class="eq-status-card">
            <div class="eq-status-card-header">
              <div class="eq-ai-indicator">
                <span class="eq-dot-pulse" id="eq-dot-adv"></span>
                <span>Processamento Manual</span>
              </div>
              <div class="eq-stopwatch" id="eq-stopwatch-adv">
                ${u.clock} <span>0.00s</span>
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
              ${u.apply} Injetar Resposta na P\xE1gina
            </button>
          </div>

          <div class="eq-footer-note">Modo Manual \u2022 Controle Total dos Elementos</div>
        </div>

        <!-- TAB 3: INSPETOR IA -->
        <div class="eq-view-container" id="eq-view-inspector" style="display: none;">
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
              <button class="eq-btn-tool" id="eq-copy-prompt-btn" type="button" title="Copiar Prompt Completo">
                ${u.copy} Copiar
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
        <div class="eq-view-container" id="eq-view-settings" style="display: none;">
          <!-- API Key Section -->
          <div class="eq-field-group">
            <div class="eq-section-title">
              <span>Chave Gemini (Google AI Studio)</span>
              <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" style="color: #00ffcc; text-decoration: none; font-size: 11px; font-weight: 700;">
                Obter Gr\xE1tis \u2197
              </a>
            </div>

            <div class="eq-input-box">
              <div class="eq-input-wrap">
                <input id="eq-api-key" class="eq-input" type="password" placeholder="Cole sua chave AIzaSy..." autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" />
              </div>
              <div class="eq-input-actions">
                <button class="eq-btn-tool" id="eq-key-toggle" type="button">${u.eye} Mostrar</button>
                <button class="eq-btn-tool primary" id="eq-key-save" type="button">${u.save} Salvar</button>
                <button class="eq-btn-tool" id="eq-key-prompt" type="button" title="Abre janela nativa que n\xE3o sofre bloqueio do site">${u.edit} Inserir via Janela</button>
                <button class="eq-btn-tool" id="eq-key-paste" type="button" title="Colar direto do clipboard">${u.paste} Colar</button>
                <button class="eq-btn-tool" id="eq-key-clear" type="button" title="Limpar campo">${u.eraser} Limpar</button>
                <button class="eq-btn-tool" id="eq-key-test" type="button" title="Testar chave no Google">${u.key} Testar Conex\xE3o</button>
              </div>
            </div>
          </div>

          <!-- Model Selection -->
          <div class="eq-field-group">
            <div class="eq-section-title">Modelo Padr\xE3o</div>
            <select id="eq-model-select" class="eq-select"></select>
          </div>

          <!-- System Preferences -->
          <div class="eq-field-group" style="gap: 8px; margin-top: 4px;">
            <label class="eq-checkbox-label">
              <input id="eq-use-vision" type="checkbox" />
              <span>Vis\xE3o Computacional (Imagens)</span>
            </label>
            <div style="font-size: 11px; color: #888888; margin-left: 24px; line-height: 1.3;">
              Desativado por padr\xE3o: A IA analisa o DOM estruturado diretamente, respondendo muito mais r\xE1pido e sem gastar cota com capturas de tela.
            </div>

            <label class="eq-checkbox-label" style="margin-top: 6px;">
              <input id="eq-host-dark" type="checkbox" />
              <span style="color: #00ffcc;">Habilitar Smart Dark Mode no Site</span>
            </label>
          </div>

          <!-- Danger Zone -->
          <div class="eq-field-group" style="margin-top: 14px; padding-top: 12px; border-top: 1px solid #2d2d30;">
            <div class="eq-section-title" style="color: #ff5555;">Zona de Redefini\xE7\xE3o</div>
            <button class="eq-btn-tool danger" id="eq-reset-all-btn" type="button" style="height: 34px; justify-content: center;">
              ${u.trash} Resetar Todos os Dados e Mem\xF3ria
            </button>
          </div>

          <div class="eq-footer-note">Configura\xE7\xF5es salvas localmente no navegador</div>
        </div>
      </aside>
    `,this.launcherBtn=this.shadow.querySelector(".eq-launcher"),this.dockToggleBtn=this.shadow.querySelector("#eq-dock-toggle"),this.sidebarEl=this.shadow.querySelector(".eq-sidebar"),this.apToggleBtn=this.shadow.querySelector("#eq-ap-toggle-btn"),this.apConsole=this.shadow.querySelector("#eq-ap-console"),this.dotPulseAp=this.shadow.querySelector("#eq-dot-ap"),this.statusTextAp=this.shadow.querySelector("#eq-status-text-ap"),this.stopwatchAp=this.shadow.querySelector("#eq-stopwatch-ap span"),this.dotPulseAdv=this.shadow.querySelector("#eq-dot-adv"),this.statusTextAdv=this.shadow.querySelector("#eq-status-text-adv"),this.stopwatchAdv=this.shadow.querySelector("#eq-stopwatch-adv span"),this.inspModel=this.shadow.querySelector("#eq-insp-model"),this.inspLatency=this.shadow.querySelector("#eq-insp-latency"),this.inspTokens=this.shadow.querySelector("#eq-insp-tokens"),this.inspPrompt=this.shadow.querySelector("#eq-insp-prompt"),this.inspRationale=this.shadow.querySelector("#eq-insp-rationale"),this.inspActions=this.shadow.querySelector("#eq-insp-actions"),this.copyPromptBtn=this.shadow.querySelector("#eq-copy-prompt-btn"),this.apiKeyInput=this.shadow.querySelector("#eq-api-key"),this.modelSelect=this.shadow.querySelector("#eq-model-select"),this.modeSelect=this.shadow.querySelector("#eq-mode-select"),this.engineSelect=this.shadow.querySelector("#eq-engine-select"),this.dryRunCheckbox=this.shadow.querySelector("#eq-dry-run"),this.autoApplyCheckbox=this.shadow.querySelector("#eq-auto-apply"),this.autoAdvanceCheckbox=this.shadow.querySelector("#eq-auto-advance"),this.hostDarkModeCheckbox=this.shadow.querySelector("#eq-host-dark"),this.useVisionCheckbox=this.shadow.querySelector("#eq-use-vision"),this.analyzeBtn=this.shadow.querySelector("#eq-analyze-btn"),this.applyBtn=this.shadow.querySelector("#eq-apply-btn"),this.resultContainer=this.shadow.querySelector("#eq-result"),S.forEach(o=>this.modelSelect.add(new Option(o.name,o.id,!1,o.id===e.model))),tt.forEach(o=>this.modeSelect.add(new Option(o.label,o.value,!1,o.value===e.modeHint))),ot.forEach(o=>this.engineSelect.add(new Option(o.label,o.value,!1,o.value===e.engine))),this.apiKeyInput.value=e.apiKey,this.dryRunCheckbox.checked=e.dryRun,this.autoApplyCheckbox.checked=e.autoApply,this.autoAdvanceCheckbox.checked=e.autoAdvance,this.hostDarkModeCheckbox.checked=e.hostDarkMode,this.useVisionCheckbox.checked=e.useVision,this.setupEventListeners(),document.body.appendChild(this.host),this.applyHostDarkMode(e.hostDarkMode),e.apiKey&&K(e.apiKey).then(o=>{o&&o.length>0&&this.updateModelSelect(o,e.model)}).catch(()=>{})}switchTab(e){this.activeTab=e;let a=["autopilot","advanced","inspector","settings"];for(let o of a){let i=this.shadow.querySelector(`#eq-tab-${o}`),s=this.shadow.querySelector(`#eq-view-${o}`);o===e?(i.classList.add("active"),s.style.display="flex"):(i.classList.remove("active"),s.style.display="none")}e==="autopilot"&&this.callbacks.onSettingsChange({autoApply:!0,autoAdvance:!0})}setupEventListeners(){this.shadow.querySelector("#eq-tab-autopilot")?.addEventListener("click",()=>this.switchTab("autopilot")),this.shadow.querySelector("#eq-tab-advanced")?.addEventListener("click",()=>this.switchTab("advanced")),this.shadow.querySelector("#eq-tab-inspector")?.addEventListener("click",()=>this.switchTab("inspector")),this.shadow.querySelector("#eq-tab-settings")?.addEventListener("click",()=>this.switchTab("settings")),this.launcherBtn.addEventListener("click",()=>this.toggle()),this.dockToggleBtn.addEventListener("click",()=>this.toggle()),this.shadow.querySelector("#eq-min-btn")?.addEventListener("click",()=>this.toggle(!1)),this.shadow.querySelector("#eq-close-btn")?.addEventListener("click",()=>this.toggle(!1)),window.addEventListener("keydown",l=>{l.altKey&&(l.key==="q"||l.key==="Q")&&(l.preventDefault(),this.toggle())},!0);let e=l=>{let d=l.composedPath();(d.includes(this.sidebarEl)||d.includes(this.host))&&l.stopImmediatePropagation()};window.addEventListener("keydown",e,!0),window.addEventListener("keyup",e,!0),window.addEventListener("keypress",e,!0),this.apiKeyInput.addEventListener("input",()=>{let l=this.apiKeyInput.value.trim().replace(/^["']|["']$/g,"");this.callbacks.onSettingsChange({apiKey:l})}),this.shadow.querySelector("#eq-key-save").addEventListener("click",()=>{let l=this.apiKeyInput.value.trim().replace(/^["']|["']$/g,"");this.apiKeyInput.value=l,this.callbacks.onSettingsChange({apiKey:l}),this.setStatus("Chave Gemini salva com sucesso!","success")});let o=this.shadow.querySelector("#eq-key-toggle");o.addEventListener("click",()=>{let l=this.apiKeyInput.type==="password";this.apiKeyInput.type=l?"text":"password",o.innerHTML=l?`${u.eyeOff} Ocultar`:`${u.eye} Mostrar`});let i=this.shadow.querySelector("#eq-key-prompt");i.addEventListener("click",()=>{let l=this.apiKeyInput.value.trim(),d=window.prompt("Cole sua Chave API do Google Gemini (AI Studio):",l);if(d!==null){let h=d.trim().replace(/^["']|["']$/g,"");this.apiKeyInput.value=h,this.callbacks.onSettingsChange({apiKey:h}),this.setStatus("Chave Gemini inserida e salva com sucesso!","success")}}),this.shadow.querySelector("#eq-key-paste").addEventListener("click",async()=>{try{let l=await navigator.clipboard.readText();if(l){let d=l.trim().replace(/^["']|["']$/g,"");this.apiKeyInput.value=d,this.callbacks.onSettingsChange({apiKey:d}),this.setStatus("Chave colada e salva com sucesso!","success")}}catch{i.click()}}),this.shadow.querySelector("#eq-key-clear").addEventListener("click",()=>{this.apiKeyInput.value="",this.callbacks.onSettingsChange({apiKey:""}),this.setStatus("Campo limpo. Cole a nova chave e clique em Salvar.","info"),this.apiKeyInput.focus()});let r=this.shadow.querySelector("#eq-key-test");r.addEventListener("click",async()=>{let l=this.apiKeyInput.value.trim().replace(/^["']|["']$/g,"");if(!l)return this.setStatus("Insira ou cole a chave de API.","error");this.setStatus("Testando chave e descobrindo modelos autorizados...","info"),r.disabled=!0;try{let d=await Ee(l);this.setStatus(d.message,d.ok?"success":"error"),d.ok&&d.models&&d.models.length>0&&this.updateModelSelect(d.models)}finally{r.disabled=!1}}),this.shadow.querySelector("#eq-reset-all-btn").addEventListener("click",()=>{window.confirm("Deseja realmente resetar todos os dados, chaves e mem\xF3ria de sess\xE3o do EasyQuiz?")&&(ae(),this.apiKeyInput.value="",this.callbacks.onSettingsChange({apiKey:""}),this.setStatus("Todos os dados do EasyQuiz foram limpos.","info"),this.logToConsole("> [SYS] Armazenamento local resetado.","text-yellow"))}),this.apToggleBtn.addEventListener("click",()=>{if(this.autopilot.isActive())this.autopilot.stop(),this.apToggleBtn.innerHTML=`${u.play} INICIAR AUTOPILOT`,this.apToggleBtn.classList.remove("danger"),this.stopStopwatch(),this.setStatus("Autopilot pausado pelo usu\xE1rio.","info");else{if(!this.apiKeyInput.value.trim().replace(/^["']|["']$/g,"")){this.setStatus("Configure sua chave de API Gemini na aba Configura\xE7\xF5es antes de ligar o Autopilot.","error"),this.switchTab("settings"),this.apiKeyInput.focus();return}this.autopilot.start(),this.apToggleBtn.innerHTML=`${u.stop} PARAR AUTOPILOT`,this.apToggleBtn.classList.add("danger"),this.startStopwatch(),this.setStatus("Autopilot ativo. Monitorando exerc\xEDcios...","info")}}),this.shadow.querySelector("#eq-ap-clear-memory").addEventListener("click",()=>{V(),this.logToConsole("> [SYS] Mem\xF3ria contextual limpa com sucesso.","text-green"),this.setStatus("Mem\xF3ria contextual da sess\xE3o limpa.","success")}),this.copyPromptBtn.addEventListener("click",()=>{let l=this.inspPrompt.textContent||"";navigator.clipboard.writeText(l).then(()=>{let d=this.copyPromptBtn.innerHTML;this.copyPromptBtn.innerHTML=`${u.check} Copiado!`,setTimeout(()=>this.copyPromptBtn.innerHTML=d,2e3)})}),this.modelSelect.addEventListener("change",()=>this.callbacks.onSettingsChange({model:this.modelSelect.value})),this.modeSelect.addEventListener("change",()=>this.callbacks.onSettingsChange({modeHint:this.modeSelect.value})),this.engineSelect.addEventListener("change",()=>this.callbacks.onSettingsChange({engine:this.engineSelect.value})),this.dryRunCheckbox.addEventListener("change",()=>this.callbacks.onSettingsChange({dryRun:this.dryRunCheckbox.checked})),this.autoApplyCheckbox.addEventListener("change",()=>this.callbacks.onSettingsChange({autoApply:this.autoApplyCheckbox.checked})),this.autoAdvanceCheckbox.addEventListener("change",()=>this.callbacks.onSettingsChange({autoAdvance:this.autoAdvanceCheckbox.checked})),this.useVisionCheckbox.addEventListener("change",()=>{let l=this.useVisionCheckbox.checked;this.callbacks.onSettingsChange({useVision:l}),this.setStatus(l?"Vis\xE3o Computacional ativada (capturas habilitadas).":"Modo DOM R\xE1pido ativado (capturas desabilitadas).","info")}),this.hostDarkModeCheckbox.addEventListener("change",()=>{let l=this.hostDarkModeCheckbox.checked;this.callbacks.onSettingsChange({hostDarkMode:l}),this.applyHostDarkMode(l)}),this.analyzeBtn.addEventListener("click",()=>this.callbacks.onAnalyze()),this.applyBtn.addEventListener("click",()=>this.callbacks.onApply())}startStopwatch(){this.stopStopwatch(),this.stopwatchStartTime=Date.now();let e=()=>{let a=((Date.now()-this.stopwatchStartTime)/1e3).toFixed(2)+"s";this.stopwatchAp.textContent=a,this.stopwatchAdv.textContent=a};e(),this.stopwatchInterval=setInterval(e,100)}stopStopwatch(e){if(this.stopwatchInterval&&(clearInterval(this.stopwatchInterval),this.stopwatchInterval=null),e!==void 0){let a=(e/1e3).toFixed(2)+"s";this.stopwatchAp.textContent=a,this.stopwatchAdv.textContent=a}}logToConsole(e,a){if(!this.apConsole)return;let o=document.createElement("div");o.textContent=e,a&&(o.className=a),this.apConsole.appendChild(o),this.apConsole.scrollTop=this.apConsole.scrollHeight}toggle(e){e!==void 0?this.isCollapsed=!e:this.isCollapsed=!this.isCollapsed,this.isCollapsed?this.sidebarEl.classList.add("eq-collapsed"):(this.sidebarEl.classList.remove("eq-collapsed"),this.apiKeyInput.value||(this.switchTab("settings"),this.apiKeyInput.focus()))}setBusy(e,a){this.analyzeBtn.disabled=e,[this.modelSelect,this.modeSelect,this.engineSelect,this.dryRunCheckbox,this.autoApplyCheckbox,this.autoAdvanceCheckbox,this.useVisionCheckbox].forEach(o=>o.disabled=e),e?(this.startStopwatch(),this.dotPulseAp.className="eq-dot-pulse busy",this.dotPulseAdv.className="eq-dot-pulse busy",a&&this.setStatus(a,"info")):(this.stopStopwatch(),this.dotPulseAp.className="eq-dot-pulse",this.dotPulseAdv.className="eq-dot-pulse")}setStatus(e,a="info"){this.statusTextAp.textContent=e,this.statusTextAdv.textContent=e,a==="error"?(this.dotPulseAp.className="eq-dot-pulse error",this.dotPulseAdv.className="eq-dot-pulse error"):a==="success"&&(this.dotPulseAp.className="eq-dot-pulse",this.dotPulseAdv.className="eq-dot-pulse");let o=e.includes("Alternando")||e.includes("indispon\xEDvel")||e.includes("fallback")||e.includes("alternativo"),i=a==="error"?"> [ERRO] ":a==="success"?"> [SUCESSO] ":o?"> [FALLBACK] ":"> [SYS] ",s=a==="error"?"text-red":a==="success"?"text-green":o?"text-yellow":"text-blue";this.logToConsole(`${i}${e}`,s)}setPlan(e,a){this.latestPlan=e,this.resultContainer.style.display="flex",e.durationMs&&this.stopStopwatch(e.durationMs);let o=this.shadow.querySelector("#eq-badges");o.innerHTML=`
      <span class="eq-brand-badge">${e.mode.replace("_"," ")}</span>
      <span class="eq-brand-badge" style="color: #00ff55; border-color: #00ff55;">${Math.round(e.confidence*100)}% Confian\xE7a</span>
      <span class="eq-brand-badge">${e.actions.length} Cmds</span>
      ${e.usedModel?`<span class="eq-brand-badge" style="border-color: #5bc0eb; color: #5bc0eb;">${e.usedModel}</span>`:""}
    `;let i=this.shadow.querySelector("#eq-rationale-text");i.textContent=e.rationale;let s=this.shadow.querySelector("#eq-actions-list");s.innerHTML="";for(let n of e.actions){let r=document.createElement("div");r.className="eq-action-item";let c="";n.t==="chk"?c=`chk ${n.id} (${n.c})`:n.t==="val"?c=`val "${n.v}" -> ${n.id}`:n.t==="sel"?c=`sel "${Array.isArray(n.v)?n.v.join(","):n.v}" -> ${n.id}`:n.t==="clk"?c=`clk ${n.id}`:n.t==="adv"?c="adv":n.t==="js"?c=`js: ${String(n.v).slice(0,40)}...`:n.t==="drag"&&(c=`drag "${n.from}" -> "${n.to}"`),r.innerHTML=`<span class="eq-action-badge">${n.t.toUpperCase()}</span> <span>${c}</span>`,s.appendChild(r)}if(this.applyBtn.disabled=!a||!e.actions.length,this.inspModel.textContent=e.usedModel||this.initialSettings.model,this.inspLatency.textContent=e.durationMs?`${e.durationMs}ms`:"--",this.inspTokens.textContent=e.tokensUsed?`${e.tokensUsed}`:"--",this.inspPrompt.textContent=e.promptSent||"Prompt n\xE3o registrado para esta requisi\xE7\xE3o.",this.inspRationale.textContent=e.rationale,this.inspActions.innerHTML="",e.actions.length>0)for(let n of e.actions){let r=document.createElement("div");r.className="eq-action-item",r.textContent=JSON.stringify(n),this.inspActions.appendChild(r)}else this.inspActions.innerHTML='<div class="text-muted" style="padding: 4px;">Nenhuma a\xE7\xE3o prescrita pela IA.</div>'}updateModelSelect(e,a){let o=a||this.modelSelect.value||this.initialSettings.model;this.modelSelect.innerHTML="";let i=!1;e.forEach(s=>{let n=s.id===o;n&&(i=!0),this.modelSelect.add(new Option(s.name,s.id,!1,n))}),!i&&e.length>0&&(this.modelSelect.selectedIndex=0,this.callbacks.onSettingsChange({model:this.modelSelect.value}))}updateSelectedModel(e){Array.from(this.modelSelect.options).some(o=>o.value===e)||this.modelSelect.add(new Option(`Gemini (${e})`,e,!1,!0)),this.modelSelect.value=e}applyHostDarkMode(e){let a="eq-host-dark-mode-style",o=document.getElementById(a);if(e){let i=window.getComputedStyle(document.body).backgroundColor;(i.includes("rgba(0, 0, 0, 0)")||i==="transparent")&&(i=window.getComputedStyle(document.documentElement).backgroundColor);let s=i.match(/\d+(\.\d+)?/g);if(s&&s.length>=3&&(s[3]!==void 0?parseFloat(s[3]):1)>.1){let r=parseInt(s[0]),c=parseInt(s[1]),p=parseInt(s[2]);if((r*299+c*587+p*114)/1e3<100)return}o||(o=document.createElement("style"),o.id=a,o.innerHTML=`
          html { filter: invert(1) hue-rotate(180deg) !important; background: #fff !important; }
          img, video, canvas, [style*="background-image"] { filter: invert(1) hue-rotate(180deg) !important; }
        `,document.head.appendChild(o)),this.host.classList.add("eq-dark-mode-active")}else this.host.classList.remove("eq-dark-mode-active"),o&&o.remove()}destroy(){this.stopStopwatch(),this.autopilot.stop(),this.applyHostDarkMode(!1),this.callbacks.onDestroy(),this.host.remove()}};async function at(){let t=window;if(t.__easyquiz){t.__easyquiz.toggle();return}let e=N(),a=null,o=new Z(e,{onAnalyze:()=>i(),onApply:()=>void s(),onDestroy:()=>{P(),delete t.__easyquiz},onSettingsChange:n=>{e=L(n)}});t.__easyquiz={toggle:()=>o.toggle(),destroy:()=>o.destroy(),analyze:()=>void i()},window.addEventListener("keydown",n=>{if(n.altKey&&(n.key==="q"||n.key==="Q")){if(n.preventDefault(),!o)return;o.toggle(!0),i()}});async function i(){if(!e.apiKey){o.setStatus("Configure sua chave de API Gemini acima para come\xE7ar.","error"),o.toggle(!0);return}o.setBusy(!0,"Identificando o bloco da quest\xE3o ativa na p\xE1gina..."),P();try{let n=k(!1);if(!n){o.setStatus("Nenhum controle detectado. Tentando captura de tela inteira...","info");let{captureFullPageText:l}=await Promise.resolve().then(()=>(C(),J));n=l()}ue(n.scope),o.setStatus(`Quest\xE3o localizada (${n.controls.length} controles). Preparando an\xE1lise...`,"info");let r=await me(n.scope,e.useVision);o.setStatus(r.length>0?`Consultando Gemini (${e.model}) com ${r.length} imagem(ns) anexada(s)...`:`Consultando Gemini (${e.model}) via DOM nativo (modo r\xE1pido)...`,"info");let{plan:c,usedModel:p}=await re(n,r,e,(l,d)=>{o.setStatus(l,d==="warning"?"info":d)});if(p&&p!==e.model&&(e.model=p,L({model:p}),o.updateSelectedModel(p)),c.needsMoreContext){if(o.setStatus("Enunciado ou contexto isolado detectado pela IA. Acionando Sele\xE7\xE3o Geral Expandida...","info"),n=k(!0),!n){let{captureFullPageText:d}=await Promise.resolve().then(()=>(C(),J));n=d()}ue(n.scope),r=await me(n.scope,e.useVision),o.setStatus(`Reconsultando IA com escopo ampliado (${n.controls.length} controles)...`,"info");let l=await re(n,r,e,(d,h)=>{o.setStatus(d,h==="warning"?"info":h)});c=l.plan,l.usedModel&&l.usedModel!==e.model&&(e.model=l.usedModel,L({model:l.usedModel}),o.updateSelectedModel(l.usedModel))}if(c.memoryToStore){let{addSessionMemory:l}=await Promise.resolve().then(()=>(q(),be));l(c.memoryToStore),console.log("[EasyQuiz] Mem\xF3ria de sess\xE3o armazenada:",c.memoryToStore)}return a=c,He(c.actions),o.setPlan(c,!e.dryRun),c.pageType==="conclusion"?o.setStatus("Atividade conclu\xEDda ou tela final detectada pela IA.","success"):o.setStatus(e.dryRun?"Simula\xE7\xE3o conclu\xEDda. As respostas foram real\xE7adas na p\xE1gina sem altera\xE7\xE3o.":"Resolu\xE7\xE3o pronta! Verifique o realce na tela e aplique quando desejar.","success"),e.autoApply&&!e.dryRun&&await s(),c}catch(n){P();let r=n instanceof Error?n.message:"Falha desconhecida na an\xE1lise.";o.setStatus(r,"error");return}finally{o.setBusy(!1)}}async function s(){if(!a){o.setStatus("Nenhum plano dispon\xEDvel para aplicar. Execute a an\xE1lise primeiro.","error");return}if(e.dryRun){o.setStatus("O modo de simula\xE7\xE3o est\xE1 ativo. Desmarque para poder aplicar.","error");return}let n=e.autoAdvance&&a.confidence>=e.confidenceThreshold&&!a.needsMoreContext;o.setBusy(!0,"Aplicando respostas no formul\xE1rio...");try{let r=await ze(a,n);o.setStatus(`Sucesso: ${r.applied} resposta(s) preenchida(s)${r.advanced?" e pr\xF3xima quest\xE3o acionada":""}.`,"success")}catch(r){let c=r instanceof Error?r.message:"Falha ao aplicar plano.";o.setStatus(c,"error")}finally{o.setBusy(!1)}}o.toggle(!0)}at().catch(t=>{console.error("[EasyQuiz] Erro fatal na inicializa\xE7\xE3o:",t),window.alert(`EasyQuiz: falha ao iniciar: ${t instanceof Error?t.message:String(t)}`)});})();
