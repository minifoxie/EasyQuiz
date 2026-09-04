/* EasyQuiz v1.0.0 — Resolução inteligente de quizzes sem servidor
 * GitHub: https://github.com/minifoxie/EasyQuiz
 * 100% Client-side. Direct Google Gemini REST API.
 */
"use strict";(()=>{var O=`Voc\xEA \xE9 o EasyQuiz Engine, um assistente avan\xE7ado de resolu\xE7\xE3o e preenchimento de quest\xF5es, formul\xE1rios e exames acad\xEAmicos e t\xE9cnicos.
Sua miss\xE3o \xE9 analisar o bloco da pergunta atual com o m\xE1ximo de rigor conceitual e precis\xE3o, gerando um plano declarativo para preenchimento.

REGRAS FUNDAMENTAIS:
1. Use estritamente os 'targetId' informados na lista de controles. Nunca invente IDs.
2. Identifique com precis\xE3o o enunciado, as alternativas e o formato da resposta.
3. Para escolha_unica: marque somente uma op\xE7\xE3o correta com 'set_checked: true' no targetId da alternativa correta.
4. Para escolha_multipla: marque todas as op\xE7\xF5es corretas com 'set_checked: true'.
5. Para texto_livre ou preenchimento: forne\xE7a a resposta exata e concisa no campo 'value'.
6. Para select_values: use o 'value' exato da op\xE7\xE3o v\xE1lida entre as op\xE7\xF5es dispon\xEDveis no controle.
7. Explique a resposta no campo 'rationale' de forma direta e t\xE9cnica, justificando por que aquela op\xE7\xE3o \xE9 a correta.
8. Atribua um \xEDndice de confian\xE7a realista de 0.0 a 1.0 em 'confidence'.
9. Imagens anexadas fazem parte do enunciado ou das op\xE7\xF5es da quest\xE3o e devem ser analisadas cuidadosamente.
10. Se a quest\xE3o tiver bot\xE3o de navega\xE7\xE3o ("Pr\xF3xima", "Avan\xE7ar", "Next") e voc\xEA estiver altamente confiante (>= 0.85), voc\xEA pode incluir um avan\xE7o caso solicitado, caso contr\xE1rio nunca avance.
11. Responda exclusivamente com o objeto JSON estruturado.`;function R(t,e,a){return`RESOLVA A SEGUINTE QUEST\xC3O:

[DICA DE MODO]: ${a.modeHint||"Detectar automaticamente (escolha \xFAnica, m\xFAltipla, texto ou preenchimento)"}
[SIMULA\xC7\xC3O]: ${a.dryRun?"Simula\xE7\xE3o ativa (n\xE3o execute navega\xE7\xE3o destrutiva)":"Execu\xE7\xE3o real"}
[P\xC1GINA]: ${t.pageTitle}
[URL]: ${t.sourceUrl}

[ENUNCIADO E TEXTO VIS\xCDVEL]:
${t.questionText}

[FRAGMENTO HTML]:
${t.htmlSnippet}

[CONTROLES DISPON\xCDVEIS - Use estes targetIds para as a\xE7\xF5es]:
${JSON.stringify(t.controls.map(o=>({id:o.id,tag:o.tag,type:o.type,label:o.label,name:o.name,value:o.value,options:o.options.length?o.options:void 0,role:o.role})),null,2)}

[IMAGENS ANEXADAS \xC0 QUEST\xC3O]: ${e.length}
Gere o plano em JSON estruturado com 'mode', 'confidence', 'summary', 'rationale', 'needsMoreContext', 'warnings' e 'actions'.`}var N=[{id:"gemini-2.5-flash",name:"Gemini 2.5 Flash",description:"Recomendado: ultrarr\xE1pido, multimodal e de alta precis\xE3o"},{id:"gemini-2.0-flash",name:"Gemini 2.0 Flash",description:"Modelo r\xE1pido de \xFAltima gera\xE7\xE3o para tarefas gerais"},{id:"gemini-1.5-flash",name:"Gemini 1.5 Flash",description:"Modelo leve de baixo consumo e boa resposta"},{id:"gemini-1.5-pro",name:"Gemini 1.5 Pro",description:"Racioc\xEDnio complexo e contextos gigantescos"},{id:"gemini-2.5-pro",name:"Gemini 2.5 Pro",description:"Modelo avan\xE7ado para quest\xF5es de alta complexidade"}],W={type:"OBJECT",properties:{mode:{type:"STRING",enum:["texto_livre","escolha_unica","escolha_multipla","verdadeiro_falso","preenchimento","acao_sem_resposta"]},confidence:{type:"NUMBER"},summary:{type:"STRING"},rationale:{type:"STRING"},needsMoreContext:{type:"BOOLEAN"},warnings:{type:"ARRAY",items:{type:"STRING"}},actions:{type:"ARRAY",items:{type:"OBJECT",properties:{type:{type:"STRING",enum:["set_value","set_checked","select_values","advance"]},targetId:{type:"STRING"},value:{type:"STRING"},checked:{type:"BOOLEAN"},values:{type:"ARRAY",items:{type:"STRING"}}},required:["type","targetId"]}}},required:["mode","confidence","summary","rationale","needsMoreContext","warnings","actions"]};function Y(t){return t.trim().replace(/^google\//,"").replace(/^models\//,"")||"gemini-2.5-flash"}function G(t,e){try{let a=JSON.parse(t),o=a.error?.message||a.message||"";if(/API_KEY_INVALID|API key not valid/i.test(o))return"Chave de API do Gemini inv\xE1lida ou n\xE3o autorizada. Verifique sua chave no Google AI Studio.";if(/RESOURCE_EXHAUSTED|Quota exceeded/i.test(o))return"Limite de cota do Gemini atingido temporariamente. Aguarde alguns segundos.";if(o)return`Erro Gemini (${e}): ${o}`}catch{}return`Falha na requisi\xE7\xE3o ao Gemini (HTTP ${e}). Verifique sua conex\xE3o e chave de API.`}async function $(t){let e=t.trim();if(!e)return{ok:!1,message:"Insira sua chave de API do Gemini."};let a=`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(e)}`;try{let o=await fetch(a,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({contents:[{role:"user",parts:[{text:"PING"}]}],generationConfig:{maxOutputTokens:5}})});if(!o.ok){let n=await o.text();return{ok:!1,message:G(n,o.status)}}return{ok:!0,message:"Chave de API validada com sucesso! Gemini pronto para uso."}}catch(o){return{ok:!1,message:o instanceof Error?`Erro de conex\xE3o: ${o.message}`:"Erro desconhecido ao validar chave."}}}async function A(t,e,a){let o=a.apiKey.trim();if(!o)throw new Error("Chave de API do Gemini n\xE3o configurada. Insira sua chave no painel EasyQuiz.");let i=`https://generativelanguage.googleapis.com/v1beta/models/${Y(a.model)}:generateContent?key=${encodeURIComponent(o)}`,r=[{text:R(t,e,a)}];for(let q of e)r.push({inline_data:{mime_type:q.mediaType,data:q.base64}});let d=await fetch(i,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({system_instruction:{parts:[{text:O}]},contents:[{role:"user",parts:r}],generationConfig:{temperature:.1,response_mime_type:"application/json",response_schema:W}})});if(!d.ok){let q=await d.text();throw new Error(G(q,d.status))}let u=await d.json(),f=u.candidates?.[0];if(!f||!f.content?.parts?.[0]?.text)throw new Error("O modelo Gemini n\xE3o retornou resposta estruturada.");let g=f.content.parts[0].text,m;try{m=JSON.parse(g)}catch{throw new Error("Falha ao decodificar o plano JSON do Gemini.")}return Array.isArray(m.actions)||(m.actions=[]),Array.isArray(m.warnings)||(m.warnings=[]),typeof m.confidence!="number"&&(m.confidence=.8),{plan:m,rawUsage:u.usageMetadata}}var D="easyquiz_settings_v1",y={apiKey:"",model:"gemini-2.5-flash",modeHint:"",dryRun:!1,autoApply:!1,autoAdvance:!1,confidenceThreshold:.75};function T(){try{let t=localStorage.getItem(D);if(!t)return{...y};let e=JSON.parse(t);return{apiKey:typeof e.apiKey=="string"?e.apiKey.trim():y.apiKey,model:typeof e.model=="string"&&e.model?e.model:y.model,modeHint:e.modeHint??"",dryRun:!!e.dryRun,autoApply:!!e.autoApply,autoAdvance:!!e.autoAdvance,confidenceThreshold:typeof e.confidenceThreshold=="number"?e.confidenceThreshold:y.confidenceThreshold}}catch{return{...y}}}function Q(t){let a={...T(),...t};try{localStorage.setItem(D,JSON.stringify(a))}catch(o){console.warn("[EasyQuiz] Falha ao persistir configura\xE7\xF5es no localStorage:",o)}return a}var w=['input:not([type="hidden"])',"textarea","select","button",'[role="button"]','[role="radio"]','[role="checkbox"]','[role="option"]','[contenteditable="true"]'].join(","),M=/^(próxim[oa]|next|continuar|avançar|prosseguir|enviar|submit|concluir|finalizar|próxima questão|next question|avançar questão)$/i,X=0;function h(t){let e=t;if(!e||typeof e.getBoundingClientRect!="function")return!1;let a=e.getBoundingClientRect(),o=window.getComputedStyle(e);return a.width>0&&a.height>0&&o.display!=="none"&&o.visibility!=="hidden"&&Number(o.opacity||"1")>0}function c(t,e=500){return(t??"").replace(/\s+/g," ").trim().slice(0,e)}function Z(t){let e=t.dataset.easyquizId;if(e)return e;let a=`eq-${Date.now().toString(36)}-${(X+=1).toString(36)}`;return t.dataset.easyquizId=a,a}function C(t){let e=c(t.textContent||t.getAttribute("aria-label")||t.getAttribute("value")||t.value),a=t.type;return M.test(e)||a==="submit"}function ee(t){let e=t.getAttribute("aria-label");if(e)return c(e);let a=t.getAttribute("aria-labelledby");if(a){let i=a.split(/\s+/).map(s=>document.getElementById(s)?.textContent).filter(Boolean).join(" ");if(i.trim())return c(i)}if("labels"in t&&t.labels){let i=Array.from(t.labels??[]).map(s=>s.textContent).join(" ");if(i.trim())return c(i)}let o=t.closest('.docssharedWizToggleLabeledContainer, [role="listitem"], .answer, label, .quiz-option, .form-check');if(o&&o!==t){let i=c(o.textContent);if(i)return i}let n=t.getAttribute("placeholder")||t.getAttribute("title")||t.textContent||t.value||"";return c(n)}function k(t,e){let a=t instanceof HTMLSelectElement?t:null,o=t;t.dataset.easyquizRole=e;let n=t.tagName.toLowerCase(),i=["input","textarea","select","button"].includes(n)?n:"other",s=t.getAttribute("role")||"",r=c(o.type||s||i,40),l="";o.type==="checkbox"||o.type==="radio"||s==="radio"||s==="checkbox"?l=o.checked||t.getAttribute("aria-checked")==="true"?"checked":"unchecked":l=c(o.value||t.textContent||"",2e3);let d=[];if(a)for(let g of Array.from(a.options).slice(0,80))d.push({value:c(g.value),label:c(g.textContent)});let u=!!(o.required||t.getAttribute("aria-required")==="true"),f=!!(o.disabled||t.getAttribute("aria-disabled")==="true");return{id:Z(t),tag:i,type:r,label:ee(t),name:c(o.name||t.getAttribute("name")||"",180),value:l,options:d,required:u,disabled:f,role:e}}var K=[".Qr7Oae",".geSAlb",'[role="listitem"]',".que",".form-group",".question-holder",".quiz-question",".question_holder",".display_question",'[data-functional-selector*="question"]',".question-container","[data-question-id]",'[data-testid*="question" i]','[class*="question" i]','[class*="pergunta" i]','[id*="question" i]','[id*="pergunta" i]',"fieldset","form","article","section",'[role="group"]','[role="region"]','[role="dialog"]',"main"].join(",");function j(t){if(!h(t))return-1/0;let e=t.getBoundingClientRect(),a=Array.from(t.querySelectorAll(w)).filter(h),o=c(t.innerText,4e3).length;if(!a.length||o<10)return-1/0;let n=Math.max(1,window.innerWidth*window.innerHeight),i=Math.max(1,e.width*e.height),s=Math.min(1,i/n),r=e.top+e.height/2,l=Math.abs(r-window.innerHeight/2)/Math.max(1,window.innerHeight),d=Math.min(60,a.length*15e3/i),u=e.top>=0&&e.bottom<=window.innerHeight?30:0;return a.length*20+Math.min(50,o/25)+d+u-s*60-l*15}function te(){let t=document.activeElement;if(t&&t!==document.body){let n=t.closest(K);if(n&&j(n)>0)return n}let a=Array.from(document.querySelectorAll(K)).map(n=>({element:n,score:j(n)})).filter(n=>Number.isFinite(n.score)).sort((n,i)=>i.score-n.score);if(a.length>0&&a[0].score>0)return a[0].element;let o=document.querySelector('form, main, [role="main"]');return o&&h(o)?o:document.body}function oe(t){let e=t.cloneNode(!0);return e.querySelectorAll("script, style, iframe, object, embed, svg, canvas, noscript, audio, video").forEach(a=>a.remove()),e.querySelectorAll("*").forEach(a=>{let o=["type","name","value","role","aria-label","aria-labelledby","aria-checked","aria-required","required","disabled","data-easyquiz-id"];for(let n of Array.from(a.attributes))o.includes(n.name)||a.removeAttribute(n.name)}),e.outerHTML.replace(/\s+/g," ").slice(0,2e4)}function ae(t){return Array.from(t.querySelectorAll(w)).filter(e=>h(e)&&!C(e)).slice(0,100).map(e=>k(e,"answer"))}function ne(t){let e=[t,t.parentElement,t.parentElement?.parentElement,document.body].filter(Boolean),a=new Set,o=[];for(let n of e)for(let i of Array.from(n.querySelectorAll(w)))if(!(a.has(i)||!h(i)||!C(i))&&(a.add(i),o.push(k(i,"navigation")),o.length>=10))return o;return o}function L(t=!1){let e=te();t&&e.parentElement&&e.parentElement!==document.body&&(e=e.parentElement);let a=c(e.innerText,16e3),o=ae(e),n=ne(e),i=[...o,...n].slice(0,120);if(!a||!i.length)throw new Error("Nenhum bloco de quest\xE3o com controles vis\xEDveis foi detectado. Clique ou foque na quest\xE3o e tente novamente.");return{sourceUrl:window.location.href.slice(0,2e3),pageTitle:document.title.slice(0,500)||"P\xE1gina de Quest\xE3o",questionText:a,htmlSnippet:oe(e),controls:i,scope:e}}function ie(t){let e=CSS.escape(t),a=document.querySelector(`[data-easyquiz-id="${e}"]`);if(!a||a.disabled||a.getAttribute("aria-disabled")==="true")throw new Error(`O controle '${t}' n\xE3o est\xE1 mais acess\xEDvel ou est\xE1 desabilitado na p\xE1gina.`);return a}function b(t,e){for(let a of e)t.dispatchEvent(new Event(a,{bubbles:!0,composed:!0}))}function se(t,e){if(t instanceof HTMLInputElement||t instanceof HTMLTextAreaElement){let a=t instanceof HTMLTextAreaElement?HTMLTextAreaElement.prototype:HTMLInputElement.prototype,o=Object.getOwnPropertyDescriptor(a,"value")?.set;o?o.call(t,e):t.value=e,b(t,["input","change","blur"]);return}if(t.isContentEditable){t.textContent=e,b(t,["input","change","blur"]);return}throw new Error("O controle selecionado n\xE3o aceita inser\xE7\xE3o de texto.")}function re(t,e){if(t instanceof HTMLInputElement&&["checkbox","radio"].includes(t.type)){t.checked!==e&&t.click(),t.checked!==e&&(Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"checked")?.set?.call(t,e),b(t,["input","change"]));return}let a=t.getAttribute("role");if(a==="radio"||a==="checkbox"){t.getAttribute("aria-checked")==="true"!==e&&(t.click(),t.setAttribute("aria-checked",e?"true":"false"),b(t,["input","change"]));return}let o=t.closest("label");if(o){o.click();return}t.click()}function le(t,e){if(!(t instanceof HTMLSelectElement))throw new Error("O controle n\xE3o \xE9 um elemento <select>.");let a=new Set(Array.from(t.options).map(o=>o.value));for(let o of e)a.has(o)||console.warn(`[EasyQuiz] Op\xE7\xE3o '${o}' n\xE3o encontrada no seletor.`);for(let o of Array.from(t.options))o.selected=e.includes(o.value);b(t,["input","change"])}function V(t){let e=ie(t.targetId);switch(t.type){case"set_value":se(e,t.value);break;case"set_checked":re(e,t.checked);break;case"select_values":le(e,t.values);break;case"advance":{let a=(e.textContent||e.value||"").trim();if(!(e.dataset.easyquizRole==="navigation"||M.test(a)))throw new Error("A\xE7\xE3o de avan\xE7o impedida: o bot\xE3o alvo n\xE3o \xE9 de navega\xE7\xE3o validada.");e.click();break}}}async function U(t,e){let a=t.actions.filter(i=>i.type!=="advance"),o=t.actions.filter(i=>i.type==="advance");for(let i of a)V(i);let n=!1;return e&&o.length>0&&(await new Promise(i=>setTimeout(i,400)),V(o[0]),n=!0),{applied:a.length,advanced:n}}var v=null,z=[];function x(){v&&(v.style.removeProperty("outline"),v.style.removeProperty("outline-offset"),v=null);for(let t of z)t.style.removeProperty("outline"),t.style.removeProperty("outline-offset"),t.style.removeProperty("background-color");z=[]}function I(t){x(),v=t,t.style.outline="2px solid #00e5ff",t.style.outlineOffset="4px"}function F(t){for(let e of t){if(e.type==="advance")continue;let a=CSS.escape(e.targetId),o=document.querySelector(`[data-easyquiz-id="${a}"]`);if(!o)continue;let n=o.closest('label, [role="listitem"], .answer, .form-check')||o;n.style.outline="2px solid #00ff88",n.style.outlineOffset="2px",n.style.backgroundColor="rgba(0, 255, 136, 0.08)",z.push(n)}}var E=4,ce=1200,H=12e5;function P(t){return new Promise((e,a)=>{let o=new FileReader;o.onerror=()=>a(new Error("Falha ao converter blob para base64.")),o.onload=()=>{let i=String(o.result||"").split(",")[1]||"";e(i)},o.readAsDataURL(t)})}async function B(t){let e=0,a=0;if(t instanceof HTMLImageElement?(e=t.naturalWidth||t.width,a=t.naturalHeight||t.height):(t instanceof HTMLCanvasElement,e=t.width,a=t.height),e<=0||a<=0)throw new Error("Dimens\xF5es de imagem inv\xE1lidas.");let o=Math.min(1,ce/Math.max(e,a)),n=Math.max(1,Math.round(e*o)),i=Math.max(1,Math.round(a*o)),s=document.createElement("canvas");s.width=n,s.height=i;let r=s.getContext("2d",{alpha:!1});if(!r)throw new Error("Contexto Canvas 2D indispon\xEDvel.");return r.fillStyle="#ffffff",r.fillRect(0,0,n,i),r.drawImage(t,0,0,n,i),new Promise((l,d)=>{s.toBlob(u=>{u?l(u):d(new Error("Falha ao gerar blob comprimido."))},"image/jpeg",.8)})}async function de(t){let e=t.currentSrc||t.src;if(!e)return null;let a=(t.alt||t.getAttribute("aria-label")||"Imagem da quest\xE3o").slice(0,500);if(t.complete&&t.naturalWidth>0)try{let o=await B(t),n=await P(o);if(n&&n.length<=H)return{mediaType:"image/jpeg",base64:n,alt:a,source:e.slice(0,2e3)}}catch{}try{let o=await fetch(e,{mode:"cors"});if(o.ok){let n=await o.blob();if(n.type.startsWith("image/")){let i=await createImageBitmap(n),s=await B(i);i.close();let r=await P(s);if(r&&r.length<=H)return{mediaType:"image/jpeg",base64:r,alt:a,source:e.slice(0,2e3)}}}}catch{}return null}async function pe(t){try{let e=await B(t),a=await P(e);if(a&&a.length<=H)return{mediaType:"image/jpeg",base64:a,alt:"Canvas da quest\xE3o",source:"canvas-inline"}}catch{}return null}async function _(t){let e=[],a=0,o=Array.from(t.querySelectorAll("img")).filter(h).slice(0,E);for(let n of o)try{let i=await de(n);if(i&&a+i.base64.length<=25e5&&(e.push(i),a+=i.base64.length,e.length>=E))break}catch{}if(e.length<E){let n=Array.from(t.querySelectorAll("canvas")).filter(h).slice(0,E);for(let i of n)try{let s=await pe(i);if(s&&a+s.base64.length<=25e5&&(e.push(s),a+=s.base64.length,e.length>=E))break}catch{}}return e}var p={logo:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.8L19.2 8 12 11.2 4.8 8 12 4.8zM4 9.6l7 3.1v7.5l-7-3.5V9.6zm9 10.6v-7.5l7-3.1v7.1l-7 3.5z"/></svg>',analyze:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L3 14h8l-2 8 12-12h-8l2-8z"/></svg>',apply:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>',key:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M7 14c-2.76 0-5-2.24-5-5s2.24-5 5-5c2.42 0 4.44 1.72 4.9 4H22v4h-2v3h-3v-3h-2v3h-3v-3h-2.1c-.46 2.28-2.48 4-4.9 4zm0-7c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>',settings:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M3 5h4v2H3V5zm0 6h10v2H3v-2zm0 6h6v2H3v-2zm14-12h4v2h-4V5zm-4 6h8v2h-8v-2zm-4 6h12v2H9v-2z"/></svg>',close:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>',minimize:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M5 11h14v2H5v-2z"/></svg>',target:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2v4m0 12v4M2 12h4m12 0h4m-8-6a6 6 0 100 12 6 6 0 000-12zm0 4a2 2 0 100 4 2 2 0 000-4z" stroke="currentColor" stroke-width="2" fill="none"/></svg>',eye:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>',eyeOff:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.44-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.17c0-1.66-1.34-3-3-3l-.17.02z"/></svg>',check:'<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>',warning:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>',terminal:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8h16v10zm-12-3l3-3-3-3 1.4-1.4L13.8 12l-4.4 4.4L8 15zm6 0h4v2h-4v-2z"/></svg>'};var J=`
  :host {
    all: initial;
    color-scheme: dark;
    font-family: 'JetBrains Mono', 'Segoe UI Mono', ui-monospace, monospace;
    font-size: 13px;
    line-height: 1.45;
  }

  * {
    box-sizing: border-box;
    border-radius: 0px !important;
    margin: 0;
    padding: 0;
  }

  .eq-launcher {
    position: fixed;
    right: 20px;
    bottom: 20px;
    z-index: 2147483647;
    width: 52px;
    height: 52px;
    background: #060a0d;
    border: 2px solid #00e5ff;
    color: #00e5ff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 3px;
    cursor: pointer;
    font-weight: 900;
    font-size: 10px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    box-shadow: 4px 4px 0px #000000;
    transition: transform 0.1s, box-shadow 0.1s;
    user-select: none;
  }

  .eq-launcher:hover {
    background: #00e5ff;
    color: #04080a;
    box-shadow: 6px 6px 0px #000000;
  }

  .eq-launcher:active {
    transform: translate(2px, 2px);
    box-shadow: 2px 2px 0px #000000;
  }

  .eq-panel {
    position: fixed;
    right: 20px;
    bottom: 84px;
    z-index: 2147483647;
    width: 380px;
    max-width: calc(100vw - 32px);
    max-height: min(720px, calc(100vh - 100px));
    background: #080d12;
    border: 2px solid #1a2d3d;
    color: #d8edf5;
    box-shadow: 8px 8px 0px #000000;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .eq-panel[hidden] {
    display: none !important;
  }

  .eq-header {
    background: #0f1821;
    border-bottom: 2px solid #1a2d3d;
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
    font-size: 13px;
    font-weight: 900;
    letter-spacing: 0.08em;
    color: #00e5ff;
    text-transform: uppercase;
  }

  .eq-brand-badge {
    background: #00e5ff;
    color: #04080a;
    font-size: 9px;
    padding: 2px 5px;
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
    border: 1px solid #1a2d3d;
    color: #7b94a3;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .eq-icon-btn:hover {
    border-color: #00e5ff;
    color: #00e5ff;
    background: #0b141c;
  }

  .eq-content {
    padding: 14px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .eq-section-title {
    font-size: 10px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #668291;
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
    height: 36px;
    background: #0b1218;
    border: 1px solid #1a2d3d;
    color: #d8edf5;
    padding: 0 10px;
    font-family: inherit;
    font-size: 12px;
    outline: none;
  }

  .eq-input:focus {
    border-color: #00e5ff;
    background: #0c151c;
  }

  .eq-input-action-btn {
    height: 36px;
    padding: 0 10px;
    background: #101c26;
    border: 1px solid #1a2d3d;
    border-left: none;
    color: #00e5ff;
    font-size: 11px;
    font-weight: 800;
    text-transform: uppercase;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;
    white-space: nowrap;
  }

  .eq-input-action-btn:hover {
    background: #142330;
  }

  .eq-select {
    width: 100%;
    height: 36px;
    background: #0b1218;
    border: 1px solid #1a2d3d;
    color: #d8edf5;
    padding: 0 8px;
    font-family: inherit;
    font-size: 12px;
    outline: none;
    cursor: pointer;
  }

  .eq-select:focus {
    border-color: #00e5ff;
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
    font-size: 11px;
    color: #9cb2be;
    cursor: pointer;
    user-select: none;
  }

  .eq-checkbox-label input[type="checkbox"] {
    appearance: none;
    width: 16px;
    height: 16px;
    background: #0b1218;
    border: 1px solid #1a2d3d;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .eq-checkbox-label input[type="checkbox"]:checked {
    background: #00e5ff;
    border-color: #00e5ff;
  }

  .eq-btn-primary {
    height: 42px;
    background: #00e5ff;
    border: 1px solid #00e5ff;
    color: #03080b;
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
    box-shadow: 4px 4px 0px #000000;
  }

  .eq-btn-primary:hover {
    background: #38edff;
  }

  .eq-btn-primary:active {
    transform: translate(2px, 2px);
    box-shadow: 2px 2px 0px #000000;
  }

  .eq-btn-primary:disabled {
    background: #14232e;
    border-color: #1a2d3d;
    color: #4a6270;
    cursor: not-allowed;
    box-shadow: none;
    transform: none;
  }

  .eq-btn-secondary {
    height: 38px;
    background: #0f1b24;
    border: 1px solid #00ff9d;
    color: #00ff9d;
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
    box-shadow: 3px 3px 0px #000000;
  }

  .eq-btn-secondary:hover {
    background: #00ff9d;
    color: #04080a;
  }

  .eq-btn-secondary:active {
    transform: translate(2px, 2px);
    box-shadow: 1px 1px 0px #000000;
  }

  .eq-btn-secondary:disabled {
    opacity: 0.35;
    cursor: not-allowed;
    border-color: #1a2d3d;
    color: #4a6270;
    background: #0b1218;
    box-shadow: none;
  }

  .eq-status-box {
    padding: 10px 12px;
    background: #0b131a;
    border-left: 3px solid #00e5ff;
    font-size: 11px;
    color: #9cb2be;
    line-height: 1.5;
    word-break: break-word;
  }

  .eq-status-box.error {
    border-left-color: #ff3355;
    color: #ff99aa;
    background: #1a0a0f;
  }

  .eq-status-box.success {
    border-left-color: #00ff9d;
    color: #a8ffd9;
    background: #071710;
  }

  .eq-result-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .eq-result-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #0e1720;
    border: 1px solid #1a2d3d;
    padding: 8px 10px;
  }

  .eq-badges {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
  }

  .eq-badge {
    background: #13202c;
    border: 1px solid #1f3547;
    color: #7d96a6;
    font-size: 10px;
    font-weight: 800;
    padding: 2px 6px;
    text-transform: uppercase;
  }

  .eq-badge.highlight {
    border-color: #00e5ff;
    color: #00e5ff;
  }

  .eq-badge.success {
    border-color: #00ff9d;
    color: #00ff9d;
  }

  .eq-rationale-box {
    background: #0b1218;
    border: 1px solid #1a2d3d;
    padding: 10px;
    font-size: 11px;
    color: #b0c9d6;
  }

  .eq-rationale-title {
    font-size: 10px;
    font-weight: 800;
    color: #00e5ff;
    text-transform: uppercase;
    margin-bottom: 4px;
  }

  .eq-actions-summary {
    background: #0b1218;
    border: 1px solid #1a2d3d;
    padding: 10px;
    font-size: 11px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .eq-action-item {
    display: flex;
    align-items: flex-start;
    gap: 6px;
    color: #8fa7b5;
  }

  .eq-action-bullet {
    color: #00ff9d;
    font-weight: 900;
  }

  .eq-link {
    color: #00e5ff;
    text-decoration: none;
    font-size: 10px;
    font-weight: 800;
  }

  .eq-link:hover {
    text-decoration: underline;
  }

  .eq-footer-note {
    font-size: 9px;
    color: #4a6372;
    text-align: center;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    padding-top: 4px;
  }

  @media (max-width: 480px) {
    .eq-panel {
      right: 16px;
      bottom: 76px;
      width: calc(100vw - 32px);
    }
  }
`;var ue=[{value:"",label:"Detec\xE7\xE3o Autom\xE1tica"},{value:"escolha_unica",label:"M\xFAltipla Escolha (\xDAnica)"},{value:"escolha_multipla",label:"M\xFAltipla Escolha (V\xE1rias)"},{value:"verdadeiro_falso",label:"Verdadeiro / Falso"},{value:"texto_livre",label:"Texto Livre / Dissertativa"},{value:"preenchimento",label:"Preenchimento de Lacunas"}],S=class{host;shadow;callbacks;launcherBtn;panelEl;statusBox;resultContainer;apiKeyInput;apiKeyToggleBtn;testKeyBtn;modelSelect;modeSelect;dryRunCheckbox;autoApplyCheckbox;autoAdvanceCheckbox;analyzeBtn;applyBtn;constructor(e,a){this.callbacks=a,this.host=document.createElement("div"),this.host.id="easyquiz-shadow-root",this.shadow=this.host.attachShadow({mode:"open"}),this.shadow.innerHTML=`
      <style>${J}</style>

      <button class="eq-launcher" type="button" title="Abrir EasyQuiz (Alt+Q)">
        ${p.logo}
        <span>EQ</span>
      </button>

      <section class="eq-panel" hidden aria-label="EasyQuiz">
        <header class="eq-header">
          <div class="eq-brand">
            ${p.logo}
            <span>EasyQuiz</span>
            <span class="eq-brand-badge">PRO</span>
          </div>
          <div class="eq-header-tools">
            <button class="eq-icon-btn" id="eq-min-btn" type="button" title="Minimizar">${p.minimize}</button>
            <button class="eq-icon-btn" id="eq-close-btn" type="button" title="Fechar">${p.close}</button>
          </div>
        </header>

        <div class="eq-content">
          <!-- Chave de API Gemini -->
          <div class="eq-field-group">
            <div class="eq-section-title">
              <span>Chave Gemini (Google AI)</span>
              <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" class="eq-link">
                Obter Gr\xE1tis
              </a>
            </div>
            <div class="eq-input-wrap">
              <input 
                id="eq-api-key" 
                class="eq-input" 
                type="password" 
                placeholder="Cole sua chave AIzaSy..." 
                autocomplete="off"
                spellcheck="false"
              />
              <button class="eq-icon-btn" id="eq-key-toggle-btn" type="button" title="Mostrar/Ocultar Chave" style="height:36px;width:34px;border-left:none;">
                ${p.eye}
              </button>
              <button class="eq-input-action-btn" id="eq-test-key-btn" type="button">
                ${p.key} Testar
              </button>
            </div>
          </div>

          <!-- Modelo e Modo -->
          <div class="eq-row-2">
            <div class="eq-field-group">
              <div class="eq-section-title">Modelo IA</div>
              <select id="eq-model-select" class="eq-select"></select>
            </div>
            <div class="eq-field-group">
              <div class="eq-section-title">Modo Quest\xE3o</div>
              <select id="eq-mode-select" class="eq-select"></select>
            </div>
          </div>

          <!-- Op\xE7\xF5es de Execu\xE7\xE3o -->
          <div class="eq-row-2">
            <label class="eq-checkbox-label">
              <input id="eq-dry-run" type="checkbox" />
              <span>Apenas simular</span>
            </label>
            <label class="eq-checkbox-label">
              <input id="eq-auto-apply" type="checkbox" />
              <span>Auto aplicar</span>
            </label>
          </div>
          <div>
            <label class="eq-checkbox-label">
              <input id="eq-auto-advance" type="checkbox" />
              <span>Avan\xE7ar para pr\xF3xima quest\xE3o ap\xF3s responder</span>
            </label>
          </div>

          <!-- Bot\xE3o Principal de An\xE1lise -->
          <button class="eq-btn-primary" id="eq-analyze-btn" type="button">
            ${p.analyze} Analisar Bloco da Quest\xE3o
          </button>

          <!-- Caixa de Status -->
          <div class="eq-status-box" id="eq-status">
            Pronto. Aponte para a quest\xE3o desejada ou clique em 'Analisar Bloco'.
          </div>

          <!-- \xC1rea de Resultados -->
          <div class="eq-result-container" id="eq-result" style="display: none;">
            <div class="eq-result-header">
              <div class="eq-badges" id="eq-badges"></div>
            </div>

            <div class="eq-rationale-box">
              <div class="eq-rationale-title">Justificativa da Resposta</div>
              <div id="eq-rationale-text"></div>
            </div>

            <div class="eq-actions-summary">
              <div class="eq-rationale-title">A\xE7\xF5es Declarativas</div>
              <div id="eq-actions-list"></div>
            </div>

            <button class="eq-btn-secondary" id="eq-apply-btn" type="button">
              ${p.apply} Aplicar Respostas na P\xE1gina
            </button>
          </div>

          <div class="eq-footer-note">
            EasyQuiz Engine \u2022 100% Client-Side \u2022 Zero Servidor
          </div>
        </div>
      </section>
    `,this.launcherBtn=this.shadow.querySelector(".eq-launcher"),this.panelEl=this.shadow.querySelector(".eq-panel"),this.statusBox=this.shadow.querySelector("#eq-status"),this.resultContainer=this.shadow.querySelector("#eq-result"),this.apiKeyInput=this.shadow.querySelector("#eq-api-key"),this.apiKeyToggleBtn=this.shadow.querySelector("#eq-key-toggle-btn"),this.testKeyBtn=this.shadow.querySelector("#eq-test-key-btn"),this.modelSelect=this.shadow.querySelector("#eq-model-select"),this.modeSelect=this.shadow.querySelector("#eq-mode-select"),this.dryRunCheckbox=this.shadow.querySelector("#eq-dry-run"),this.autoApplyCheckbox=this.shadow.querySelector("#eq-auto-apply"),this.autoAdvanceCheckbox=this.shadow.querySelector("#eq-auto-advance"),this.analyzeBtn=this.shadow.querySelector("#eq-analyze-btn"),this.applyBtn=this.shadow.querySelector("#eq-apply-btn");for(let o of N)this.modelSelect.add(new Option(o.name,o.id,!1,o.id===e.model));for(let o of ue)this.modeSelect.add(new Option(o.label,o.value,!1,o.value===e.modeHint));this.apiKeyInput.value=e.apiKey,this.dryRunCheckbox.checked=e.dryRun,this.autoApplyCheckbox.checked=e.autoApply,this.autoAdvanceCheckbox.checked=e.autoAdvance,this.setupEventListeners(),document.documentElement.appendChild(this.host)}setupEventListeners(){this.launcherBtn.addEventListener("click",()=>this.toggle()),this.shadow.querySelector("#eq-min-btn")?.addEventListener("click",()=>this.toggle(!1)),this.shadow.querySelector("#eq-close-btn")?.addEventListener("click",()=>this.toggle(!1)),this.apiKeyToggleBtn.addEventListener("click",()=>{let e=this.apiKeyInput.type==="password";this.apiKeyInput.type=e?"text":"password",this.apiKeyToggleBtn.innerHTML=e?p.eyeOff:p.eye}),this.apiKeyInput.addEventListener("input",()=>{this.callbacks.onSettingsChange({apiKey:this.apiKeyInput.value.trim()})}),this.testKeyBtn.addEventListener("click",async()=>{let e=this.apiKeyInput.value.trim();if(!e){this.setStatus("Por favor, informe a chave de API antes de testar.","error");return}this.setStatus("Testando conex\xE3o com o Google Gemini...","info"),this.testKeyBtn.disabled=!0;try{let a=await $(e);a.ok?this.setStatus(a.message,"success"):this.setStatus(a.message,"error")}catch(a){this.setStatus(a instanceof Error?a.message:"Falha ao testar chave.","error")}finally{this.testKeyBtn.disabled=!1}}),this.modelSelect.addEventListener("change",()=>{this.callbacks.onSettingsChange({model:this.modelSelect.value})}),this.modeSelect.addEventListener("change",()=>{this.callbacks.onSettingsChange({modeHint:this.modeSelect.value||""})}),this.dryRunCheckbox.addEventListener("change",()=>{this.callbacks.onSettingsChange({dryRun:this.dryRunCheckbox.checked})}),this.autoApplyCheckbox.addEventListener("change",()=>{this.callbacks.onSettingsChange({autoApply:this.autoApplyCheckbox.checked})}),this.autoAdvanceCheckbox.addEventListener("change",()=>{this.callbacks.onSettingsChange({autoAdvance:this.autoAdvanceCheckbox.checked})}),this.analyzeBtn.addEventListener("click",()=>this.callbacks.onAnalyze()),this.applyBtn.addEventListener("click",()=>this.callbacks.onApply())}toggle(e){let a=e!==void 0?!e:!this.panelEl.hidden;this.panelEl.hidden=a,a||this.apiKeyInput.value||this.apiKeyInput.focus()}setBusy(e,a){this.analyzeBtn.disabled=e,this.modelSelect.disabled=e,this.modeSelect.disabled=e,this.dryRunCheckbox.disabled=e,this.autoApplyCheckbox.disabled=e,this.autoAdvanceCheckbox.disabled=e,a&&this.setStatus(a,"info")}setStatus(e,a="info"){this.statusBox.textContent=e,this.statusBox.className=`eq-status-box ${a}`}setPlan(e,a){this.resultContainer.style.display="flex";let o=this.shadow.querySelector("#eq-badges");o.innerHTML=`
      <span class="eq-badge highlight">${e.mode.replace("_"," ")}</span>
      <span class="eq-badge ${e.confidence>=.8?"success":""}">
        ${Math.round(e.confidence*100)}% Confian\xE7a
      </span>
      <span class="eq-badge">${e.actions.length} A\xE7\xE3o(\xF5es)</span>
    `;let n=this.shadow.querySelector("#eq-rationale-text");n.textContent=e.rationale||e.summary;let i=this.shadow.querySelector("#eq-actions-list");i.innerHTML="";for(let s of e.actions){let r=document.createElement("div");r.className="eq-action-item";let l="";s.type==="set_checked"?l=`Marcar alternativa [${s.targetId}]`:s.type==="set_value"?l=`Inserir "${s.value}" em [${s.targetId}]`:s.type==="select_values"?l=`Selecionar "${s.values.join(", ")}"`:s.type==="advance"&&(l=`Avan\xE7ar para pr\xF3xima quest\xE3o [${s.targetId}]`),r.innerHTML=`<span class="eq-action-bullet">\u25A0</span> <span>${l}</span>`,i.appendChild(r)}this.applyBtn.disabled=!a||!e.actions.length}destroy(){this.callbacks.onDestroy(),this.host.remove()}};async function he(){let t=window;if(t.__easyquiz){t.__easyquiz.toggle();return}let e=T(),a=null,o=new S(e,{onAnalyze:()=>void n(),onApply:()=>void i(),onDestroy:()=>{x(),delete t.__easyquiz},onSettingsChange:s=>{e=Q(s)}});t.__easyquiz={toggle:()=>o.toggle(),destroy:()=>o.destroy(),analyze:()=>n()},window.addEventListener("keydown",s=>{if(s.altKey&&(s.key==="q"||s.key==="Q")){if(s.preventDefault(),!o)return;o.toggle(!0),n()}});async function n(){if(!e.apiKey){o.setStatus("Configure sua chave de API Gemini acima para come\xE7ar.","error"),o.toggle(!0);return}o.setBusy(!0,"Identificando o bloco da quest\xE3o ativa na p\xE1gina..."),x();try{let s=L(!1);I(s.scope),o.setStatus(`Quest\xE3o localizada (${s.controls.length} controles). Otimizando imagens...`,"info");let r=await _(s.scope);o.setStatus(`Consultando Gemini (${e.model}) com ${r.length} imagem(ns) anexada(s)...`,"info");let{plan:l}=await A(s,r,e);l.needsMoreContext&&(o.setStatus("Expandindo contexto ao redor da quest\xE3o para maior assertividade...","info"),s=L(!0),I(s.scope),r=await _(s.scope),l=(await A(s,r,e)).plan),a=l,F(l.actions),o.setPlan(l,!e.dryRun),o.setStatus(e.dryRun?"Simula\xE7\xE3o conclu\xEDda. As respostas foram real\xE7adas na p\xE1gina sem altera\xE7\xE3o.":"Resolu\xE7\xE3o pronta! Verifique o realce na tela e aplique quando desejar.","success"),e.autoApply&&!e.dryRun&&await i()}catch(s){x();let r=s instanceof Error?s.message:"Falha desconhecida na an\xE1lise.";o.setStatus(r,"error")}finally{o.setBusy(!1)}}async function i(){if(!a){o.setStatus("Nenhum plano dispon\xEDvel para aplicar. Execute a an\xE1lise primeiro.","error");return}if(e.dryRun){o.setStatus("O modo de simula\xE7\xE3o est\xE1 ativo. Desmarque para poder aplicar.","error");return}let s=e.autoAdvance&&a.confidence>=e.confidenceThreshold&&!a.needsMoreContext;o.setBusy(!0,"Aplicando respostas no formul\xE1rio...");try{let r=await U(a,s);o.setStatus(`Sucesso: ${r.applied} resposta(s) preenchida(s)${r.advanced?" e pr\xF3xima quest\xE3o acionada":""}.`,"success")}catch(r){let l=r instanceof Error?r.message:"Falha ao aplicar plano.";o.setStatus(l,"error")}finally{o.setBusy(!1)}}e.apiKey||o.toggle(!0)}he().catch(t=>{console.error("[EasyQuiz] Erro fatal na inicializa\xE7\xE3o:",t),window.alert(`EasyQuiz: falha ao iniciar: ${t instanceof Error?t.message:String(t)}`)});})();
