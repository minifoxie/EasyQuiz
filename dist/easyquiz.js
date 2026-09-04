/* EasyQuiz v1.0.0 — Resolução inteligente de quizzes sem servidor
 * GitHub: https://github.com/minifoxie/EasyQuiz
 * 100% Client-side. Direct Google Gemini REST API.
 */
"use strict";(()=>{var Ae=Object.defineProperty;var M=(t,e)=>()=>(t&&(e=t(t=0)),e);var Z=(t,e)=>{for(var n in e)Ae(t,n,{get:e[n],enumerable:!0})};var f,ee=M(()=>{"use strict";f={apiKey:"",model:"gemini-3.8-flash",uiMode:"advanced",modeHint:"",engine:"smart",dryRun:!1,autoApply:!1,autoAdvance:!1,hostDarkMode:!0,confidenceThreshold:.8}});var oe={};Z(oe,{addSessionMemory:()=>qe,clearSessionMemories:()=>Q,getSessionMemories:()=>$,loadDomainCache:()=>L,loadSettings:()=>C,saveDomainCache:()=>N,saveSettings:()=>_});function C(){try{let t=localStorage.getItem(te);if(!t){let n=localStorage.getItem("easyquiz_settings_v1");if(n){let o=JSON.parse(n);return{...f,apiKey:o.apiKey||""}}return{...f}}let e=JSON.parse(t);return{apiKey:typeof e.apiKey=="string"?e.apiKey.trim():f.apiKey,model:typeof e.model=="string"&&e.model?e.model:f.model,uiMode:e.uiMode==="easy"||e.uiMode==="advanced"?e.uiMode:f.uiMode,modeHint:e.modeHint??"",engine:e.engine??"smart",dryRun:!!e.dryRun,autoApply:!!e.autoApply,autoAdvance:!!e.autoAdvance,hostDarkMode:e.hostDarkMode!==void 0?!!e.hostDarkMode:!0,confidenceThreshold:typeof e.confidenceThreshold=="number"?e.confidenceThreshold:f.confidenceThreshold}}catch{return{...f}}}function L(t){try{let e=localStorage.getItem("eq_domain_cache_"+t);return e?JSON.parse(e):{}}catch{return{}}}function N(t,e){let o={...L(t),...e};try{localStorage.setItem("eq_domain_cache_"+t,JSON.stringify(o))}catch(i){console.warn("[EasyQuiz] Erro cache de dominio:",i)}}function _(t){let n={...C(),...t};try{localStorage.setItem(te,JSON.stringify(n))}catch(o){console.warn("[EasyQuiz] Falha ao persistir configura\xE7\xF5es no localStorage:",o)}return n}function qe(t){let e=t.trim();e&&!k.includes(e)&&k.push(e)}function $(){return k}function Q(){k=[]}var te,k,b=M(()=>{"use strict";ee();te="easyquiz_settings_v2";k=[]});function g(t){let e=t;if(!e||typeof e.getBoundingClientRect!="function")return!1;let n=e.getBoundingClientRect(),o=window.getComputedStyle(e);return n.width>0&&n.height>0&&o.display!=="none"&&o.visibility!=="hidden"&&Number(o.opacity||"1")>0}function u(t,e=500){return(t??"").replace(/\s+/g," ").trim().slice(0,e)}function ke(t){let e=t.dataset.easyquizId;if(e)return e;let n=`eq-${Date.now().toString(36)}-${(Me+=1).toString(36)}`;return t.dataset.easyquizId=n,n}function V(t){let e=u(t.textContent||t.getAttribute("aria-label")||t.getAttribute("value")||t.value),n=t.type;return j.test(e)||n==="submit"}function Ce(t){let e=t.getAttribute("aria-label");if(e)return u(e);let n=t.getAttribute("aria-labelledby");if(n){let a=n.split(/\s+/).map(s=>document.getElementById(s)?.textContent).filter(Boolean).join(" ");if(a.trim())return u(a)}if("labels"in t&&t.labels){let a=Array.from(t.labels??[]).map(s=>s.textContent).join(" ");if(a.trim())return u(a)}let o=t.closest('.docssharedWizToggleLabeledContainer, [role="listitem"], .answer, label, .quiz-option, .form-check');if(o&&o!==t){let a=u(o.textContent);if(a)return a}let i=t.getAttribute("placeholder")||t.getAttribute("title")||t.textContent||t.value||"";return u(i)}function K(t,e){let n=t instanceof HTMLSelectElement?t:null,o=t;t.dataset.easyquizRole=e;let i=t.tagName.toLowerCase(),a=["input","textarea","select","button"].includes(i)?i:"other",s=t.getAttribute("role")||"",r=u(o.type||s||a,40),l="";o.type==="checkbox"||o.type==="radio"||s==="radio"||s==="checkbox"?l=o.checked||t.getAttribute("aria-checked")==="true"?"checked":"unchecked":l=u(o.value||t.textContent||"",2e3);let c=[];if(n)for(let p of Array.from(n.options).slice(0,80))c.push({value:u(p.value),label:u(p.textContent)});let d=!!(o.required||t.getAttribute("aria-required")==="true"),w=!!(o.disabled||t.getAttribute("aria-disabled")==="true");return{id:ke(t),tag:a,type:r,label:Ce(t),name:u(o.name||t.getAttribute("name")||"",180),value:l,options:c,required:d,disabled:w,role:e}}var I,j,Me,H=M(()=>{"use strict";I=['input:not([type="hidden"])',"textarea","select","button",'[role="button"]','[role="radio"]','[role="checkbox"]','[role="option"]','[contenteditable="true"]'].join(","),j=/^(próxim[oa]|next|continuar|avançar|prosseguir|enviar|submit|concluir|finalizar|próxima questão|next question|avançar questão)$/i,Me=0});var z={};Z(z,{captureCurrentContext:()=>x,captureFullPageText:()=>Le,extractAnswerControls:()=>ue,extractNavigationControls:()=>pe,findActiveScope:()=>ce,sanitizeHtml:()=>de});function le(t){if(!g(t))return-1/0;let e=t.getBoundingClientRect(),n=Array.from(t.querySelectorAll(I)).filter(g),o=u(t.innerText,4e3).length;if(!n.length||o<10)return-1/0;let i=Math.max(1,window.innerWidth*window.innerHeight),a=Math.max(1,e.width*e.height),s=Math.min(1,a/i),r=e.top+e.height/2,l=Math.abs(r-window.innerHeight/2)/Math.max(1,window.innerHeight),c=Math.min(60,n.length*15e3/a),d=e.top>=0&&e.bottom<=window.innerHeight?30:0;return n.length*20+Math.min(50,o/25)+c+d-s*60-l*15}function ce(){let t=document.activeElement;if(t&&t!==document.body){let i=t.closest(re);if(i&&le(i)>0)return i}let n=Array.from(document.querySelectorAll(re)).map(i=>({element:i,score:le(i)})).filter(i=>Number.isFinite(i.score)).sort((i,a)=>a.score-i.score);if(n.length>0&&n[0].score>0)return n[0].element;let o=document.querySelector('form, main, [role="main"]');return o&&g(o)?o:document.body}function de(t){let e=t.cloneNode(!0);return e.querySelectorAll("script, style, iframe, object, embed, svg, canvas, noscript, audio, video").forEach(n=>n.remove()),e.querySelectorAll("*").forEach(n=>{let o=["type","name","value","role","aria-label","aria-labelledby","aria-checked","aria-required","required","disabled","data-easyquiz-id"];for(let i of Array.from(n.attributes))o.includes(i.name)||n.removeAttribute(i.name)}),e.outerHTML.replace(/\s+/g," ").slice(0,2e4)}function ue(t){return Array.from(t.querySelectorAll(I)).filter(e=>g(e)&&!V(e)).slice(0,100).map(e=>K(e,"answer"))}function pe(t){let e=[t,t.parentElement,t.parentElement?.parentElement,document.body].filter(Boolean),n=new Set,o=[];for(let i of e)for(let a of Array.from(i.querySelectorAll(I)))if(!(n.has(a)||!g(a)||!V(a))&&(n.add(a),o.push(K(a,"navigation")),o.length>=10))return o;return o}function x(t=!1){let e=ce();t&&e.parentElement&&e.parentElement!==document.body&&(e=e.parentElement);let n=u(e.innerText,16e3),o=ue(e),i=pe(e),a=[...o,...i].slice(0,120);return!n||!a.length?null:{sourceUrl:window.location.href.slice(0,2e3),pageTitle:document.title.slice(0,500)||"P\xE1gina de Quest\xE3o",questionText:n,htmlSnippet:de(e),controls:a,scope:e}}function Le(){let t=document.body.innerText||document.documentElement.innerText,e=u(t,8e3);return{sourceUrl:window.location.href.slice(0,2e3),pageTitle:document.title.slice(0,500)||"P\xE1gina Inteira",questionText:e,htmlSnippet:"<!-- HTML omitido no fallback -->",controls:[],scope:document.body}}var re,E=M(()=>{"use strict";H();re=[".Qr7Oae",".geSAlb",'[role="listitem"]',".que",".form-group",".question-holder",".quiz-question",".question_holder",".display_question",'[data-functional-selector*="question"]',".question-container","[data-question-id]",'[data-testid*="question" i]','[class*="question" i]','[class*="pergunta" i]','[id*="question" i]','[id*="pergunta" i]',"fieldset","form","article","section",'[role="group"]','[role="region"]','[role="dialog"]',"main"].join(",")});b();var ne=`Voc\xEA \xE9 o EasyQuiz Engine v3.0. Retorne JSON estrito.
Regras Absolutas:
1. "pageType": "question" (se h\xE1 pergunta), "info" (avisos/textos), "start" (in\xEDcio), "conclusion" (FIM/NOTA: retorne actions vazias).
2. "rationale" (OBRIGAT\xD3RIO): Pense passo a passo. SE HOUVER IMAGENS, descreva matematicamente/textualmente o que voc\xEA v\xEA nelas ANTES de responder.
3. RAG AUT\xD4NOMO: Se a quest\xE3o exige um texto de p\xE1gina(s) anterior(es), clique em "Voltar/Anterior" (t:"clk"). Quando estiver lendo o texto, extraia a resposta para "memoryToStore" e clique em "Pr\xF3ximo/Avan\xE7ar". Suas anota\xE7\xF5es aparecer\xE3o nas pr\xF3ximas quest\xF5es.
4. "needsMoreContext": true APENAS se faltarem dados na pr\xF3pria tela atual E n\xE3o for poss\xEDvel usar o RAG Aut\xF4nomo.
5. "actions": Array de comandos minificados:
   - { "t": "val", "id": "id_campo", "v": "resposta" }
   - { "t": "chk", "id": "id_check", "c": true }
   - { "t": "sel", "id": "id_select", "v": ["valor"] }
   - { "t": "clk", "id": "id_ou_texto" }
   - { "t": "adv" } (Bot\xE3o pr\xF3ximo)
   - { "t": "js", "v": "$eq.click('botao')" }`;function ae(t,e,n){let i=t.questionText.length<80?`
[HTML FRAGMENT]:
${t.htmlSnippet}`:`
[HTML FRAGMENT]: Omitido (Texto puro suficiente. Foque no texto e nos controles).`,a=$(),s="";return a.length>0&&(s=`
[MEM\xD3RIA DE CONTEXTO ATIVA (RAG)]:
${a.map(r=>`- ${r}`).join(`
`)}
`),`--- NOVA QUEST\xC3O ---
[MODO REQUERIDO]: ${n.engine}
[DICA]: ${n.modeHint||"Auto"}
[SIMULA\xC7\xC3O]: ${n.dryRun?"ON":"OFF"}
[URL]: ${t.sourceUrl}
[P\xC1GINA]: ${t.pageTitle}
${s}
[TEXTO VIS\xCDVEL]:
${t.questionText}
${i}

[CONTROLES]:
${JSON.stringify(t.controls.map(r=>({id:r.id,type:r.type,lbl:r.label,val:r.value,opt:r.options.length?r.options:void 0})),null,0)}

[IMAGENS ANEXADAS]: ${e.length}
Responda em JSON.`}var G=[{id:"gemini-3.8-flash",name:"Gemini 3.8 Flash (Recomendado)",description:"Ultrapoderoso, hiper-r\xE1pido modelo 2026 para agents."},{id:"gemini-3.7-flash",name:"Gemini 3.7 Flash",description:"Alta velocidade para tarefas simples e fallback."},{id:"gemini-3.6-flash",name:"Gemini 3.6 Flash",description:"Velocidade e estabilidade."},{id:"gemini-3.1-pro",name:"Gemini 3.1 Pro",description:"Racioc\xEDnio longo de elite."}],Se={type:"OBJECT",properties:{pageType:{type:"STRING",enum:["question","info","start","conclusion"]},mode:{type:"STRING",enum:["texto_livre","escolha_unica","escolha_multipla","verdadeiro_falso","preenchimento","acao_sem_resposta"]},confidence:{type:"NUMBER"},rationale:{type:"STRING"},needsMoreContext:{type:"BOOLEAN"},warnings:{type:"ARRAY",items:{type:"STRING"}},memoryToStore:{type:"STRING"},actions:{type:"ARRAY",items:{type:"OBJECT",properties:{t:{type:"STRING",enum:["val","chk","sel","clk","adv","js"]},id:{type:"STRING"},v:{},c:{type:"BOOLEAN"},co:{type:"ARRAY",items:{type:"NUMBER"}}},required:["t"]}}},required:["pageType","mode","confidence","rationale","needsMoreContext","actions"]};function Te(t){return t.trim().replace(/^google\//,"").replace(/^models\//,"")||"gemini-3.8-flash"}function ie(t,e){try{let n=JSON.parse(t),o=n.error?.message||n.message||"";if(/API_KEY_INVALID|API key not valid/i.test(o))return"Chave de API do Gemini inv\xE1lida ou n\xE3o autorizada. Verifique no Google AI Studio.";if(/RESOURCE_EXHAUSTED|Quota exceeded/i.test(o))return"Limite de cota do Gemini atingido temporariamente. Aguarde alguns segundos.";if(o)return`Erro Gemini (${e}): ${o}`}catch{}return`Falha na requisi\xE7\xE3o ao Gemini (HTTP ${e}). Verifique sua conex\xE3o e chave.`}async function se(t){let e=t.trim();if(!e)return{ok:!1,message:"Insira sua chave de API."};let n=`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${encodeURIComponent(e)}`;try{let o=await fetch(n,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({contents:[{role:"user",parts:[{text:"PING"}]}],generationConfig:{maxOutputTokens:5}})});if(!o.ok){let i=await o.text();return{ok:!1,message:ie(i,o.status)}}return{ok:!0,message:"Chave de API validada com sucesso no Gemini 3.8 Flash!"}}catch(o){return{ok:!1,message:o instanceof Error?`Erro de conex\xE3o: ${o.message}`:"Erro desconhecido ao testar chave."}}}async function F(t,e,n){let o=n.apiKey.trim();if(!o)throw new Error("Chave de API n\xE3o configurada.");let i=Te(n.model),s=[{text:ae(t,e,n)}];for(let d of e)s.push({inline_data:{mime_type:d.mediaType,data:d.base64}});let r={system_instruction:{parts:[{text:ne}]},contents:[{role:"user",parts:s}],generationConfig:{temperature:.05,maxOutputTokens:400,response_mime_type:"application/json",response_schema:Se}},l=n.uiMode==="easy"?G.map(d=>d.id):[i];n.uiMode==="easy"&&!l.includes(i)&&l.unshift(i);let c=new Error("Nenhum modelo tentado.");for(let d of new Set(l)){let w=`https://generativelanguage.googleapis.com/v1beta/models/${d}:generateContent?key=${encodeURIComponent(o)}`;try{let p=await fetch(w,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)});if(!p.ok){let Ee=await p.text(),we=ie(Ee,p.status);throw new Error(we)}let X=await p.json(),D=X.candidates?.[0];if(!D||!D.content?.parts?.[0]?.text)throw new Error("A IA n\xE3o retornou uma resposta estruturada v\xE1lida.");let h;try{h=JSON.parse(D.content.parts[0].text)}catch{throw new Error("Falha ao decodificar o plano JSON da IA.")}return Array.isArray(h.actions)||(h.actions=[]),Array.isArray(h.warnings)||(h.warnings=[]),typeof h.confidence!="number"&&(h.confidence=.8),h.usedModel=d,{plan:h,rawUsage:X.usageMetadata,usedModel:d}}catch(p){if(c=p,n.uiMode!=="easy"||c.message.includes("inv\xE1lida"))throw c;console.warn(`[EasyQuiz] Fallback: Falha no modelo ${d}. Tentando pr\xF3ximo...`,p)}}throw c}b();E();b();H();function m(t){let e=CSS.escape(t),n=document.querySelector(`[data-easyquiz-id="${e}"]`);if(n||(n=document.querySelector(`#${e}, [name="${e}"]`),n))return n;let o=`//*[text()="${t}"] | //*[contains(text(),"${t}")]`,i=document.evaluate(o,document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);return i.singleNodeValue?i.singleNodeValue:null}function A(t,e){for(let n of e)t.dispatchEvent(new Event(n,{bubbles:!0,composed:!0}))}function v(t,e){let n=0,o=0;if(e&&e.length===2)n=e[0],o=e[1];else{let a=t.getBoundingClientRect();n=a.left+a.width/2,o=a.top+a.height/2}let i={bubbles:!0,cancelable:!0,composed:!0,clientX:n,clientY:o};t.dispatchEvent(new PointerEvent("pointerdown",i)),t.dispatchEvent(new MouseEvent("mousedown",i)),t.dispatchEvent(new PointerEvent("pointerup",i)),t.dispatchEvent(new MouseEvent("mouseup",i)),t.click()}function ge(t,e){if(t instanceof HTMLInputElement||t instanceof HTMLTextAreaElement){let n=t instanceof HTMLTextAreaElement?HTMLTextAreaElement.prototype:HTMLInputElement.prototype,o=Object.getOwnPropertyDescriptor(n,"value")?.set;o?o.call(t,e):t.value=e,A(t,["input","change","blur"]);return}if(t.isContentEditable){t.textContent=e,A(t,["input","change","blur"]);return}throw new Error(`N\xE3o \xE9 poss\xEDvel injetar texto em <${t.tagName.toLowerCase()}>`)}function me(t,e){if(t instanceof HTMLInputElement&&["checkbox","radio"].includes(t.type)){t.checked!==e&&t.click(),t.checked!==e&&(Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"checked")?.set?.call(t,e),A(t,["input","change"]));return}let n=t.getAttribute("role");if(n==="radio"||n==="checkbox"){t.getAttribute("aria-checked")==="true"!==e&&(v(t),t.setAttribute("aria-checked",e?"true":"false"),A(t,["input","change"]));return}v(t)}function Ie(t,e){if(t instanceof HTMLSelectElement){for(let n of Array.from(t.options))n.selected=e.includes(n.value);A(t,["input","change"]);return}throw new Error("Elemento n\xE3o \xE9 select.")}var fe={fill:(t,e)=>{let n=m(t);n?ge(n,e):console.warn(`$eq.fill: Elemento ${t} n\xE3o encontrado`)},click:t=>{let e=m(t);e?v(e):console.warn(`$eq.click: Elemento ${t} n\xE3o encontrado`)},check:(t,e)=>{let n=m(t);n?me(n,e):console.warn(`$eq.check: Elemento ${t} n\xE3o encontrado`)},drag:(t,e)=>{let n=m(t),o=m(e);n&&o&&(n.dispatchEvent(new DragEvent("dragstart",{bubbles:!0})),o.dispatchEvent(new DragEvent("drop",{bubbles:!0})),n.dispatchEvent(new DragEvent("dragend",{bubbles:!0})))}};window.$eq=fe;function he(t){if(t.t==="js"){let o=String(t.v||"");try{new Function("$eq",o)(fe)}catch(i){throw console.error("[EasyQuiz JS Error]",i),new Error("Falha na execu\xE7\xE3o JS gerada pela IA.")}return}let e=t.id||"",n=m(e);if(!n&&t.t!=="adv")throw new Error(`Alvo '${e}' n\xE3o encontrado para a\xE7\xE3o '${t.t}'`);switch(t.t){case"val":n&&ge(n,String(t.v));break;case"chk":n&&me(n,!!t.c);break;case"sel":if(n){let i=Array.isArray(t.v)?t.v:[String(t.v)];Ie(n,i)}break;case"clk":n&&v(n,t.co);break;case"adv":let o=n;if(!o){let i=Array.from(document.querySelectorAll('button, a, input[type="submit"]')).filter(a=>j.test(a.textContent||a.value||""));i.length&&(o=i[0])}if(o){let i=t.id||o.textContent?.trim()||o.value?.trim()||"";i&&N(window.location.hostname,{advanceSelector:i}),v(o)}else throw new Error("Bot\xE3o de avan\xE7o n\xE3o encontrado.");break}}async function ye(t,e){let n=t.actions.filter(a=>a.t!=="adv"),o=t.actions.filter(a=>a.t==="adv");for(let a of n)he(a);let i=!1;return e&&o.length>0&&(await new Promise(a=>setTimeout(a,600)),he(o[0]),i=!0),{applied:n.length,advanced:i}}var q=null,U=[];function S(){q&&(q.style.removeProperty("outline"),q.style.removeProperty("outline-offset"),q=null);for(let t of U)t.style.removeProperty("outline"),t.style.removeProperty("outline-offset"),t.style.removeProperty("background-color");U=[]}function Y(t){S(),q=t,t.style.outline="2px solid #00e5ff",t.style.outlineOffset="4px"}function be(t){for(let e of t){if(e.t==="adv"||e.t==="js"||!e.id)continue;let n=CSS.escape(e.id),o=document.querySelector(`[data-easyquiz-id="${n}"]`);if(!o)continue;let i=o.closest('label, [role="listitem"], .answer, .form-check')||o;i.style.outline="2px solid #00ff88",i.style.outlineOffset="2px",i.style.backgroundColor="rgba(0, 255, 136, 0.08)",U.push(i)}}H();var T=4,He=1200,J=12e5;function B(t){return new Promise((e,n)=>{let o=new FileReader;o.onerror=()=>n(new Error("Falha ao converter blob para base64.")),o.onload=()=>{let i=String(o.result||"");e(i.split(",")[1]||"")},o.readAsDataURL(t)})}async function R(t){let e=0,n=0;if(t instanceof HTMLImageElement?(e=t.naturalWidth||t.width,n=t.naturalHeight||t.height):(e=t.width,n=t.height),e<=0||n<=0)throw new Error("Dimens\xF5es inv\xE1lidas.");let o=Math.min(1,He/Math.max(e,n)),i=Math.max(1,Math.round(e*o)),a=Math.max(1,Math.round(n*o)),s=document.createElement("canvas");s.width=i,s.height=a;let r=s.getContext("2d",{alpha:!1});if(!r)throw new Error("Sem suporte a Canvas 2D.");return r.fillStyle="#ffffff",r.fillRect(0,0,i,a),r.drawImage(t,0,0,i,a),new Promise((l,c)=>{s.toBlob(d=>d?l(d):c(new Error("Falha compress\xE3o.")),"image/jpeg",.8)})}async function ve(t){try{let e=t.cloneNode(!0),n=t.offsetWidth||500,o=t.offsetHeight||500,i=`
      <svg xmlns="http://www.w3.org/2000/svg" width="${n}" height="${o}">
        <foreignObject width="100%" height="100%">
          <div xmlns="http://www.w3.org/1999/xhtml" style="background:#fff;font-family:sans-serif;">
            ${e.innerHTML}
          </div>
        </foreignObject>
      </svg>
    `,a=new Blob([i],{type:"image/svg+xml;charset=utf-8"}),s=URL.createObjectURL(a),r=new Image;r.crossOrigin="anonymous",await new Promise((d,w)=>{r.onload=d,r.onerror=w,r.src=s});let l=await R(r),c=await B(l);if(URL.revokeObjectURL(s),c&&c.length<=J)return{mediaType:"image/jpeg",base64:c,alt:"Captura Suprema via rasteriza\xE7\xE3o DOM",source:"rasterized"}}catch(e){console.warn("Falha na rasteriza\xE7\xE3o suprema:",e)}return null}async function ze(t){let e=t.currentSrc||t.src;if(!e)return null;let n=(t.alt||t.getAttribute("aria-label")||"Imagem da quest\xE3o").slice(0,500);if(t.complete&&t.naturalWidth>0)try{let o=await R(t),i=await B(o);if(i&&i.length<=J)return{mediaType:"image/jpeg",base64:i,alt:n,source:e.slice(0,2e3)}}catch{}try{let o=await fetch(e,{mode:"cors"});if(o.ok){let i=await o.blob();if(i.type.startsWith("image/")){let a=await createImageBitmap(i),s=await R(a);a.close();let r=await B(s);if(r&&r.length<=J)return{mediaType:"image/jpeg",base64:r,alt:n,source:e.slice(0,2e3)}}}}catch{return ve(t.parentElement||t)}return null}async function W(t){let e=[],n=0,o=Array.from(t.querySelectorAll("img")).filter(g).slice(0,T);for(let i of o)try{let a=await ze(i);if(a&&n+a.base64.length<=25e5&&(e.push(a),n+=a.base64.length,e.length>=T))break}catch{}if(e.length<T){let i=Array.from(t.querySelectorAll("canvas")).filter(g).slice(0,T);for(let a of i)try{let s=await R(a),r=await B(s);if(r&&n+r.length<=25e5&&(e.push({mediaType:"image/jpeg",base64:r,alt:"Canvas inline",source:"canvas"}),n+=r.length,e.length>=T))break}catch{let s=await ve(a.parentElement||a);s&&(e.push(s),n+=s.base64.length)}}return e}b();b();E();var P=class{active=!1;timer=null;callbacks;lastRunTime=0;lastActionTime=0;isProcessing=!1;constructor(e){this.callbacks=e}isActive(){return this.active}start(){this.active||(this.active=!0,this.lastActionTime=Date.now(),this.callbacks.onStatusChange("waiting","> [SYS] Autopilot ENGAGED. Monitorando..."),this.loop())}stop(){this.active=!1,this.timer&&clearTimeout(this.timer),this.callbacks.onStatusChange("idle","> [SYS] Autopilot DESATIVADO.")}errorCount=0;async loop(){if(!this.active)return;let e=Date.now();if(e-this.lastRunTime<2500||this.isProcessing){this.timer=window.setTimeout(()=>this.loop(),500);return}this.lastRunTime=e;try{this.isProcessing=!0;let n=x(!1);if(!n){let{captureFullPageText:o}=await Promise.resolve().then(()=>(E(),z));n=o()}if(n){let o=n.controls.filter(a=>a.tag!=="button"&&a.type!=="submit"),i=L(window.location.hostname);if(o.length>0){this.callbacks.onStatusChange("analyzing","> [IA] Quest\xE3o detectada. Consultando IA...","text-blue"),await new Promise(s=>setTimeout(s,800));let a=await this.callbacks.onRequestAnalysis();if(a){if(this.callbacks.onStatusChange("analyzing",`> [IA] (${a.usedModel||"gemini"}) Confian\xE7a: ${(a.confidence*100).toFixed(1)}% | Modo: ${a.mode}`,"text-blue"),this.callbacks.onStatusChange("analyzing",`> [IA] Racioc\xEDnio: ${a.rationale}`,"text-blue"),this.callbacks.onStatusChange("analyzing",`> [IA] A\xE7\xF5es geradas: ${a.actions.length}`,"text-blue"),this.errorCount=0,a.memoryToStore&&this.callbacks.onStatusChange("analyzing",`> [IA] \u{1F9E0} Mem\xF3ria RAG salva: "${a.memoryToStore}"`,"text-yellow"),a.pageType==="conclusion"){this.callbacks.onStatusChange("idle","> [SYS] Atividade conclu\xEDda! Desligando Autopilot.","text-green"),this.stop();return}}else this.errorCount++;this.lastActionTime=Date.now()}else if(i.advanceSelector&&m(i.advanceSelector)){let a=m(i.advanceSelector);a&&(this.callbacks.onStatusChange("advancing",`> [BRUTE] Avan\xE7ando via cache "${i.advanceSelector}"...`),await new Promise(s=>setTimeout(s,1200)),v(a),this.lastActionTime=Date.now(),this.errorCount=0)}else{this.callbacks.onStatusChange("analyzing","> [IA] Rota desconhecida/fallback. Consultando IA...","text-blue"),await new Promise(s=>setTimeout(s,800));let a=await this.callbacks.onRequestAnalysis();if(a){if(this.callbacks.onStatusChange("analyzing",`> [IA] (${a.usedModel||"gemini"}) Confian\xE7a: ${(a.confidence*100).toFixed(1)}% | Modo: ${a.mode}`,"text-blue"),this.callbacks.onStatusChange("analyzing",`> [IA] Racioc\xEDnio: ${a.rationale}`,"text-blue"),a.memoryToStore&&this.callbacks.onStatusChange("analyzing",`> [IA] \u{1F9E0} Mem\xF3ria RAG salva: "${a.memoryToStore}"`,"text-yellow"),a.pageType==="conclusion"){this.callbacks.onStatusChange("idle","> [SYS] Atividade conclu\xEDda! Desligando Autopilot.","text-green"),this.stop();return}this.errorCount=0}else this.errorCount++;this.lastActionTime=Date.now()}if(this.errorCount>=3){this.callbacks.onStatusChange("error","> [ERRO] 3 falhas consecutivas. Abortando Autopilot para poupar tokens.","text-red"),this.stop();return}}}catch(n){console.warn("[EasyQuiz Autopilot]",n)}finally{this.isProcessing=!1}this.active&&(this.timer=window.setTimeout(()=>this.loop(),1e3))}};var y={logo:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.8L19.2 8 12 11.2 4.8 8 12 4.8zM4 9.6l7 3.1v7.5l-7-3.5V9.6zm9 10.6v-7.5l7-3.1v7.1l-7 3.5z"/></svg>',analyze:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L3 14h8l-2 8 12-12h-8l2-8z"/></svg>',apply:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>',key:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M7 14c-2.76 0-5-2.24-5-5s2.24-5 5-5c2.42 0 4.44 1.72 4.9 4H22v4h-2v3h-3v-3h-2v3h-3v-3h-2.1c-.46 2.28-2.48 4-4.9 4zm0-7c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>',settings:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M3 5h4v2H3V5zm0 6h10v2H3v-2zm0 6h6v2H3v-2zm14-12h4v2h-4V5zm-4 6h8v2h-8v-2zm-4 6h12v2H9v-2z"/></svg>',close:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>',minimize:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M5 11h14v2H5v-2z"/></svg>',target:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2v4m0 12v4M2 12h4m12 0h4m-8-6a6 6 0 100 12 6 6 0 000-12zm0 4a2 2 0 100 4 2 2 0 000-4z" stroke="currentColor" stroke-width="2" fill="none"/></svg>',eye:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>',eyeOff:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.44-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.17c0-1.66-1.34-3-3-3l-.17.02z"/></svg>',check:'<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>',warning:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>',terminal:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8h16v10zm-12-3l3-3-3-3 1.4-1.4L13.8 12l-4.4 4.4L8 15zm6 0h4v2h-4v-2z"/></svg>'};var xe=`
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
`;var Be=[{value:"",label:"Detec\xE7\xE3o Autom\xE1tica"},{value:"escolha_unica",label:"M\xFAltipla Escolha (\xDAnica)"},{value:"escolha_multipla",label:"M\xFAltipla Escolha (V\xE1rias)"},{value:"verdadeiro_falso",label:"Verdadeiro / Falso"},{value:"texto_livre",label:"Texto Livre / Dissertativa"},{value:"preenchimento",label:"Preenchimento de Lacunas"}],Re=[{value:"smart",label:"Inteligente (Auto-H\xEDbrido)"},{value:"command",label:"Apenas Comando (Seguro)"},{value:"javascript",label:"Apenas JS Nativo (Avan\xE7ado)"}],O=class{host;shadow;callbacks;autopilot;initialSettings;launcherBtn;panelEl;statusBox;resultContainer;apiKeyInput;testKeyBtn;modelSelect;modeSelect;engineSelect;dryRunCheckbox;autoApplyCheckbox;autoAdvanceCheckbox;hostDarkModeCheckbox;analyzeBtn;applyBtn;tabEasyBtn;tabAdvBtn;contentEasy;contentAdv;apToggleBtn;apConsole;constructor(e,n){this.initialSettings=e,this.callbacks=n,this.autopilot=new P({onStatusChange:(o,i,a)=>{if(this.apConsole){let s=document.createElement("div");s.textContent=i,a&&s.classList.add(a),this.apConsole.appendChild(s),this.apConsole.scrollTop=this.apConsole.scrollHeight}o==="analyzing"?this.setBusy(!0,"Autopilot: IA analisando..."):(o==="advancing"||o==="waiting")&&this.setBusy(!1)},onRequestAnalysis:async()=>{try{return await this.callbacks.onAnalyze()||null}catch{return null}}}),this.host=document.createElement("div"),this.host.id="easyquiz-shadow-root",this.host.style.position="fixed",this.host.style.top="0",this.host.style.left="0",this.host.style.width="100vw",this.host.style.height="100vh",this.host.style.zIndex="2147483647",this.host.style.pointerEvents="none",this.shadow=this.host.attachShadow({mode:"open"}),this.shadow.innerHTML=`
      <style>${xe}</style>
      <button class="eq-launcher" type="button" title="Abrir EasyQuiz (Alt+Q)">
        ${y.logo}
        <span>EQ</span>
      </button>

      <section class="eq-panel" hidden aria-label="EasyQuiz">
        <header class="eq-header">
          <div class="eq-brand">
            ${y.logo}
            <span>EasyQuiz</span>
            <span class="eq-brand-badge">2.0 SUPREME</span>
          </div>
          <div class="eq-header-tools">
            <button class="eq-icon-btn" id="eq-min-btn" type="button" title="Minimizar">${y.minimize}</button>
            <button class="eq-icon-btn" id="eq-close-btn" type="button" title="Fechar">${y.close}</button>
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
              <button class="eq-input-action-btn" id="eq-test-key-btn" type="button">${y.key} Testar</button>
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
            ${y.analyze} Analisar & Resolver Quest\xE3o
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
              ${y.apply} Injetar Respostas na P\xE1gina
            </button>
          </div>
          <div class="eq-footer-note">EQ Engine v2.0 \u2022 100% Client-Side</div>
        </div>
      </section>
    `,this.tabEasyBtn=this.shadow.querySelector("#eq-tab-easy"),this.tabAdvBtn=this.shadow.querySelector("#eq-tab-advanced"),this.contentEasy=this.shadow.querySelector("#eq-content-easy"),this.contentAdv=this.shadow.querySelector("#eq-content-advanced"),this.apToggleBtn=this.shadow.querySelector("#eq-ap-toggle-btn"),this.apConsole=this.shadow.querySelector("#eq-ap-console"),this.launcherBtn=this.shadow.querySelector(".eq-launcher"),this.panelEl=this.shadow.querySelector(".eq-panel"),this.statusBox=this.shadow.querySelector("#eq-status"),this.resultContainer=this.shadow.querySelector("#eq-result"),this.apiKeyInput=this.shadow.querySelector("#eq-api-key"),this.testKeyBtn=this.shadow.querySelector("#eq-test-key-btn"),this.modelSelect=this.shadow.querySelector("#eq-model-select"),this.modeSelect=this.shadow.querySelector("#eq-mode-select"),this.engineSelect=this.shadow.querySelector("#eq-engine-select"),this.dryRunCheckbox=this.shadow.querySelector("#eq-dry-run"),this.autoApplyCheckbox=this.shadow.querySelector("#eq-auto-apply"),this.autoAdvanceCheckbox=this.shadow.querySelector("#eq-auto-advance"),this.hostDarkModeCheckbox=this.shadow.querySelector("#eq-host-dark"),this.analyzeBtn=this.shadow.querySelector("#eq-analyze-btn"),this.applyBtn=this.shadow.querySelector("#eq-apply-btn"),G.forEach(o=>this.modelSelect.add(new Option(o.name,o.id,!1,o.id===e.model))),Be.forEach(o=>this.modeSelect.add(new Option(o.label,o.value,!1,o.value===e.modeHint))),Re.forEach(o=>this.engineSelect.add(new Option(o.label,o.value,!1,o.value===e.engine))),this.apiKeyInput.value=e.apiKey,this.dryRunCheckbox.checked=e.dryRun,this.autoApplyCheckbox.checked=e.autoApply,this.autoAdvanceCheckbox.checked=e.autoAdvance,this.hostDarkModeCheckbox.checked=e.hostDarkMode,this.setupEventListeners(),document.body.appendChild(this.host),this.applyHostDarkMode(e.hostDarkMode),this.switchMode(e.uiMode),this.makeDraggable(this.panelEl,this.shadow.querySelector(".eq-header")),this.makeDraggable(this.launcherBtn,this.launcherBtn)}switchMode(e){this.callbacks.onSettingsChange({uiMode:e}),e==="easy"?(this.tabEasyBtn.classList.add("active"),this.tabAdvBtn.classList.remove("active"),this.contentEasy.style.display="block",this.contentAdv.style.display="none",this.initialSettings.autoApply=!0,this.initialSettings.autoAdvance=!0,this.callbacks.onSettingsChange({autoApply:!0,autoAdvance:!0})):(this.autopilot.stop(),this.apToggleBtn.textContent="INICIAR AUTOPILOT",this.apToggleBtn.classList.remove("active"),this.tabEasyBtn.classList.remove("active"),this.tabAdvBtn.classList.add("active"),this.contentEasy.style.display="none",this.contentAdv.style.display="block")}setupEventListeners(){this.tabEasyBtn.addEventListener("click",()=>this.switchMode("easy")),this.tabAdvBtn.addEventListener("click",()=>this.switchMode("advanced")),this.apToggleBtn.addEventListener("click",()=>{if(this.autopilot.isActive())this.autopilot.stop(),this.apToggleBtn.textContent="INICIAR AUTOPILOT",this.apToggleBtn.classList.remove("active");else{if(!this.apiKeyInput.value.trim()){this.apConsole.innerHTML='<span style="color:#ff6b6b">> [ERRO] Chave API requerida no Modo Avan\xE7ado!</span>';return}this.autopilot.start(),this.apToggleBtn.textContent="PARAR AUTOPILOT",this.apToggleBtn.classList.add("active")}}),this.shadow.querySelector("#eq-ap-clear-memory").addEventListener("click",()=>{Q(),this.apConsole.innerHTML='<span style="color:#00ff55">> [SYS] Mem\xF3ria de sess\xE3o limpa com sucesso.</span>'}),this.launcherBtn.addEventListener("click",()=>this.toggle()),this.shadow.querySelector("#eq-min-btn")?.addEventListener("click",()=>this.toggle(!1)),this.shadow.querySelector("#eq-close-btn")?.addEventListener("click",()=>this.toggle(!1)),this.apiKeyInput.addEventListener("input",()=>this.callbacks.onSettingsChange({apiKey:this.apiKeyInput.value.trim()})),this.modelSelect.addEventListener("change",()=>this.callbacks.onSettingsChange({model:this.modelSelect.value})),this.modeSelect.addEventListener("change",()=>this.callbacks.onSettingsChange({modeHint:this.modeSelect.value})),this.engineSelect.addEventListener("change",()=>this.callbacks.onSettingsChange({engine:this.engineSelect.value})),this.dryRunCheckbox.addEventListener("change",()=>this.callbacks.onSettingsChange({dryRun:this.dryRunCheckbox.checked})),this.autoApplyCheckbox.addEventListener("change",()=>this.callbacks.onSettingsChange({autoApply:this.autoApplyCheckbox.checked})),this.autoAdvanceCheckbox.addEventListener("change",()=>this.callbacks.onSettingsChange({autoAdvance:this.autoAdvanceCheckbox.checked})),this.hostDarkModeCheckbox.addEventListener("change",()=>{let n=this.hostDarkModeCheckbox.checked;this.callbacks.onSettingsChange({hostDarkMode:n}),this.applyHostDarkMode(n)}),this.testKeyBtn.addEventListener("click",async()=>{let n=this.apiKeyInput.value.trim();if(!n)return this.setStatus("Informe a chave de API.","error");this.setStatus("Testando 3.8 Flash...","info"),this.testKeyBtn.disabled=!0;try{let o=await se(n);this.setStatus(o.message,o.ok?"success":"error")}finally{this.testKeyBtn.disabled=!1}}),this.analyzeBtn.addEventListener("click",()=>this.callbacks.onAnalyze()),this.applyBtn.addEventListener("click",()=>this.callbacks.onApply())}applyHostDarkMode(e){let n="eq-host-dark-mode-style",o=document.getElementById(n);if(e){let i=window.getComputedStyle(document.body).backgroundColor;(i.includes("rgba(0, 0, 0, 0)")||i==="transparent")&&(i=window.getComputedStyle(document.documentElement).backgroundColor);let a=i.match(/\d+(\.\d+)?/g);if(a&&a.length>=3&&(a[3]!==void 0?parseFloat(a[3]):1)>.1){let r=parseInt(a[0]),l=parseInt(a[1]),c=parseInt(a[2]),d=(r*299+l*587+c*114)/1e3;if(d<100){console.log("[EasyQuiz] Fundo escuro detectado (Brightness: "+d+"). Smart Dark Mode preventivamente suspenso.");return}}o||(o=document.createElement("style"),o.id=n,o.innerHTML=`
          html { filter: invert(1) hue-rotate(180deg) !important; background: #fff !important; }
          img, video, canvas, [style*="background-image"] { filter: invert(1) hue-rotate(180deg) !important; }
        `,document.head.appendChild(o)),this.host.classList.add("eq-dark-mode-active")}else this.host.classList.remove("eq-dark-mode-active"),o&&o.remove()}makeDraggable(e,n){let o=!1,i=0,a=0,s=0,r=0;n.style.cursor="grab",n.addEventListener("mousedown",l=>{if(l.target.closest("button"))return;o=!0,n.style.cursor="grabbing",i=l.clientX,a=l.clientY;let c=e.getBoundingClientRect();s=c.left,r=c.top,e.style.right="auto",e.style.bottom="auto",e.style.left=s+"px",e.style.top=r+"px",l.preventDefault()}),document.addEventListener("mousemove",l=>{if(!o)return;let c=l.clientX-i,d=l.clientY-a;e.style.left=s+c+"px",e.style.top=r+d+"px"}),document.addEventListener("mouseup",()=>{o&&(o=!1,n.style.cursor="grab")})}toggle(e){let n=e!==void 0?!e:!this.panelEl.hidden;this.panelEl.hidden=n,!n&&!this.apiKeyInput.value&&this.apiKeyInput.focus()}setBusy(e,n){this.analyzeBtn.disabled=e,[this.modelSelect,this.modeSelect,this.engineSelect,this.dryRunCheckbox,this.autoApplyCheckbox,this.autoAdvanceCheckbox].forEach(o=>o.disabled=e),n&&this.setStatus(n,"info")}setStatus(e,n="info"){this.statusBox.textContent=e,this.statusBox.className=`eq-status-box ${n}`}setPlan(e,n){this.resultContainer.style.display="flex";let o=this.shadow.querySelector("#eq-badges");o.innerHTML=`
      <span class="eq-badge highlight">${e.mode.replace("_"," ")}</span>
      <span class="eq-badge ${e.confidence>=.8?"success":""}">${Math.round(e.confidence*100)}% Confian\xE7a</span>
      <span class="eq-badge">${e.actions.length} Cmds</span>
      ${e.usedModel?`<span class="eq-badge" style="border-color: #5bc0eb; color: #5bc0eb;">${e.usedModel}</span>`:""}
    `;let i=this.shadow.querySelector("#eq-rationale-text");i.textContent=e.rationale;let a=this.shadow.querySelector("#eq-actions-list");a.innerHTML="";for(let s of e.actions){let r=document.createElement("div");r.className="eq-action-item";let l="";s.t==="chk"?l=`[CHK] ${s.id}`:s.t==="val"?l=`[INJ] "${s.v}" em ${s.id}`:s.t==="sel"?l=`[SEL] ${Array.isArray(s.v)?s.v.join(","):s.v} em ${s.id}`:s.t==="clk"?l=`[CLK] ${s.id}`:s.t==="adv"?l="[AVAN\xC7AR]":s.t==="js"&&(l=`[JS] ${String(s.v)}`),r.innerHTML=`<span class="eq-action-bullet">\u25A0</span> <span>${l}</span>`,a.appendChild(r)}this.applyBtn.disabled=!n||!e.actions.length}destroy(){this.autopilot.stop(),this.applyHostDarkMode(!1),this.callbacks.onDestroy(),this.host.remove()}};async function Pe(){let t=window;if(t.__easyquiz){t.__easyquiz.toggle();return}let e=C(),n=null,o=new O(e,{onAnalyze:()=>i(),onApply:()=>void a(),onDestroy:()=>{S(),delete t.__easyquiz},onSettingsChange:s=>{e=_(s)}});t.__easyquiz={toggle:()=>o.toggle(),destroy:()=>o.destroy(),analyze:()=>void i()},window.addEventListener("keydown",s=>{if(s.altKey&&(s.key==="q"||s.key==="Q")){if(s.preventDefault(),!o)return;o.toggle(!0),i()}});async function i(){if(!e.apiKey){o.setStatus("Configure sua chave de API Gemini acima para come\xE7ar.","error"),o.toggle(!0);return}o.setBusy(!0,"Identificando o bloco da quest\xE3o ativa na p\xE1gina..."),S();try{let s=x(!1);if(!s){o.setStatus("Nenhum controle detectado. Tentando captura de tela inteira...","info");let{captureFullPageText:c}=await Promise.resolve().then(()=>(E(),z));s=c()}Y(s.scope),o.setStatus(`Quest\xE3o localizada (${s.controls.length} controles). Otimizando imagens...`,"info");let r=await W(s.scope);o.setStatus(`Consultando Gemini (${e.model}) com ${r.length} imagem(ns) anexada(s)...`,"info");let{plan:l}=await F(s,r,e);if(l.needsMoreContext){if(o.setStatus("Expandindo contexto ao redor da quest\xE3o para maior assertividade...","info"),s=x(!0),!s){let{captureFullPageText:d}=await Promise.resolve().then(()=>(E(),z));s=d()}Y(s.scope),r=await W(s.scope),l=(await F(s,r,e)).plan}if(l.memoryToStore){let{addSessionMemory:c}=await Promise.resolve().then(()=>(b(),oe));c(l.memoryToStore),console.log("[EasyQuiz] Mem\xF3ria de sess\xE3o armazenada:",l.memoryToStore)}return n=l,be(l.actions),o.setPlan(l,!e.dryRun),l.pageType==="conclusion"?o.setStatus("Atividade conclu\xEDda ou tela final detectada pela IA.","success"):o.setStatus(e.dryRun?"Simula\xE7\xE3o conclu\xEDda. As respostas foram real\xE7adas na p\xE1gina sem altera\xE7\xE3o.":"Resolu\xE7\xE3o pronta! Verifique o realce na tela e aplique quando desejar.","success"),e.autoApply&&!e.dryRun&&await a(),l}catch(s){S();let r=s instanceof Error?s.message:"Falha desconhecida na an\xE1lise.";o.setStatus(r,"error");return}finally{o.setBusy(!1)}}async function a(){if(!n){o.setStatus("Nenhum plano dispon\xEDvel para aplicar. Execute a an\xE1lise primeiro.","error");return}if(e.dryRun){o.setStatus("O modo de simula\xE7\xE3o est\xE1 ativo. Desmarque para poder aplicar.","error");return}let s=e.autoAdvance&&n.confidence>=e.confidenceThreshold&&!n.needsMoreContext;o.setBusy(!0,"Aplicando respostas no formul\xE1rio...");try{let r=await ye(n,s);o.setStatus(`Sucesso: ${r.applied} resposta(s) preenchida(s)${r.advanced?" e pr\xF3xima quest\xE3o acionada":""}.`,"success")}catch(r){let l=r instanceof Error?r.message:"Falha ao aplicar plano.";o.setStatus(l,"error")}finally{o.setBusy(!1)}}o.toggle(!0)}Pe().catch(t=>{console.error("[EasyQuiz] Erro fatal na inicializa\xE7\xE3o:",t),window.alert(`EasyQuiz: falha ao iniciar: ${t instanceof Error?t.message:String(t)}`)});})();
