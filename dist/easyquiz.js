/* EasyQuiz v1.0.0 — Resolução inteligente de quizzes sem servidor
 * GitHub: https://github.com/minifoxie/EasyQuiz
 * 100% Client-side. Direct Google Gemini REST API.
 */
"use strict";(()=>{var N=`Voc\xEA \xE9 o EasyQuiz Engine. 
Resolva a quest\xE3o analisando o texto, HTML e controles.

Voc\xEA DEVE responder com JSON restrito contendo o plano.
O formato "actions" foi MINIFICADO para poupar tokens. Voc\xEA pode emitir as seguintes a\xE7\xF5es:

Se MODO DE EXECU\xC7\xC3O = Comando ou Inteligente:
- { "t": "val", "id": "id_do_campo", "v": "texto_da_resposta" } (Preencher)
- { "t": "chk", "id": "id_do_checkbox", "c": true } (Marcar op\xE7\xE3o)
- { "t": "sel", "id": "id_do_select", "v": ["valor"] } (Selecionar)
- { "t": "clk", "id": "id_ou_rotulo", "co": [x, y] } (Clique. Use o texto/nome do bot\xE3o se o id for din\xE2mico/invis\xEDvel. Opcional: coordenadas absolutas se souber).
- { "t": "adv" } (Avan\xE7ar, apenas se 'autoAdvance' ativo e confian\xE7a >= 0.85).

Se MODO DE EXECU\xC7\xC3O = JS ou Inteligente (se achar Comando fraco):
Use a a\xE7\xE3o: { "t": "js", "v": "$eq.fill('nome_do_aluno', 'Lucas'); $eq.click('Avan\xE7ar');" }
Voc\xEA tem acesso a uma API GLOBAL DE ATALHOS NA P\xC1GINA '$eq':
- $eq.fill(id_ou_label, valor)
- $eq.click(id_ou_label_ou_coord)
- $eq.check(id_ou_label, booleano)
- $eq.drag(idOrigem, idDestino)
NUNCA escreva loops grandes, document.querySelectors complexos ou coisas enormes. APENAS invoque m\xE9todos do '$eq' encadeados.

REGRAS GERAIS:
- "confidence": 0.0 a 1.0.
- "rationale": justificativa t\xE9cnica da escolha.
- "needsMoreContext": se os dados atuais forem lixo/insuficientes, retorne true e pararemos para reenviar a tela inteira com varredura absoluta.`;function R(e,t,n){return`--- NOVA QUEST\xC3O ---
[MODO EXECU\xC7\xC3O REQUERIDO]: ${n.engine} (command | javascript | smart)
[DICA MODO DE QUEST\xC3O]: ${n.modeHint||"Auto"}
[SIMULA\xC7\xC3O]: ${n.dryRun?"ON (N\xE3o destrutivo)":"OFF"}
[URL]: ${e.sourceUrl}
[P\xC1GINA]: ${e.pageTitle}

[TEXTO VIS\xCDVEL]:
${e.questionText}

[HTML FRAGMENT]:
${e.htmlSnippet}

[CONTROLES IDENTIFICADOS]:
${JSON.stringify(e.controls.map(o=>({id:o.id,type:o.type,lbl:o.label,val:o.value,opt:o.options.length?o.options:void 0})),null,0)}

[IMAGENS ANEXADAS]: ${t.length}
Gere o plano em JSON estrito.`}var $=[{id:"gemini-3.8-flash",name:"Gemini 3.8 Flash (Recomendado)",description:"Ultrapoderoso, hiper-r\xE1pido modelo 2026 para agents."},{id:"gemini-3.7-flash",name:"Gemini 3.7 Flash",description:"Alta velocidade para tarefas simples."},{id:"gemini-3.1-pro",name:"Gemini 3.1 Pro",description:"Racioc\xEDnio longo de elite."},{id:"gemini-2.5-flash",name:"Gemini 2.5 Flash",description:"Modelo r\xE1pido de gera\xE7\xE3o anterior."}],te={type:"OBJECT",properties:{mode:{type:"STRING",enum:["texto_livre","escolha_unica","escolha_multipla","verdadeiro_falso","preenchimento","acao_sem_resposta"]},confidence:{type:"NUMBER"},summary:{type:"STRING"},rationale:{type:"STRING"},needsMoreContext:{type:"BOOLEAN"},warnings:{type:"ARRAY",items:{type:"STRING"}},actions:{type:"ARRAY",items:{type:"OBJECT",properties:{t:{type:"STRING",enum:["val","chk","sel","clk","adv","js"]},id:{type:"STRING"},v:{},c:{type:"BOOLEAN"},co:{type:"ARRAY",items:{type:"NUMBER"}}},required:["t"]}}},required:["mode","confidence","summary","rationale","needsMoreContext","actions"]};function oe(e){return e.trim().replace(/^google\//,"").replace(/^models\//,"")||"gemini-3.8-flash"}function D(e,t){try{let n=JSON.parse(e),o=n.error?.message||n.message||"";if(/API_KEY_INVALID|API key not valid/i.test(o))return"Chave de API do Gemini inv\xE1lida ou n\xE3o autorizada. Verifique no Google AI Studio.";if(/RESOURCE_EXHAUSTED|Quota exceeded/i.test(o))return"Limite de cota do Gemini atingido temporariamente. Aguarde alguns segundos.";if(o)return`Erro Gemini (${t}): ${o}`}catch{}return`Falha na requisi\xE7\xE3o ao Gemini (HTTP ${t}). Verifique sua conex\xE3o e chave.`}async function Q(e){let t=e.trim();if(!t)return{ok:!1,message:"Insira sua chave de API."};let n=`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${encodeURIComponent(t)}`;try{let o=await fetch(n,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({contents:[{role:"user",parts:[{text:"PING"}]}],generationConfig:{maxOutputTokens:5}})});if(!o.ok){let a=await o.text();return{ok:!1,message:D(a,o.status)}}return{ok:!0,message:"Chave de API validada com sucesso no Gemini 3.8 Flash!"}}catch(o){return{ok:!1,message:o instanceof Error?`Erro de conex\xE3o: ${o.message}`:"Erro desconhecido ao testar chave."}}}async function T(e,t,n){let o=n.apiKey.trim();if(!o)throw new Error("Chave de API n\xE3o configurada.");let i=`https://generativelanguage.googleapis.com/v1beta/models/${oe(n.model)}:generateContent?key=${encodeURIComponent(o)}`,s=[{text:R(e,t,n)}];for(let q of t)s.push({inline_data:{mime_type:q.mediaType,data:q.base64}});let c=await fetch(i,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({system_instruction:{parts:[{text:N}]},contents:[{role:"user",parts:s}],generationConfig:{temperature:.05,response_mime_type:"application/json",response_schema:te}})});if(!c.ok){let q=await c.text();throw new Error(D(q,c.status))}let u=await c.json(),m=u.candidates?.[0];if(!m||!m.content?.parts?.[0]?.text)throw new Error("A IA n\xE3o retornou uma resposta estruturada v\xE1lida.");let p;try{p=JSON.parse(m.content.parts[0].text)}catch{throw new Error("Falha ao decodificar o plano JSON da IA.")}return Array.isArray(p.actions)||(p.actions=[]),Array.isArray(p.warnings)||(p.warnings=[]),typeof p.confidence!="number"&&(p.confidence=.8),{plan:p,rawUsage:u.usageMetadata}}var j="easyquiz_settings_v1",b={apiKey:"",model:"gemini-2.5-flash",modeHint:"",dryRun:!1,autoApply:!1,autoAdvance:!1,confidenceThreshold:.75};function C(){try{let e=localStorage.getItem(j);if(!e)return{...b};let t=JSON.parse(e);return{apiKey:typeof t.apiKey=="string"?t.apiKey.trim():b.apiKey,model:typeof t.model=="string"&&t.model?t.model:b.model,modeHint:t.modeHint??"",dryRun:!!t.dryRun,autoApply:!!t.autoApply,autoAdvance:!!t.autoAdvance,confidenceThreshold:typeof t.confidenceThreshold=="number"?t.confidenceThreshold:b.confidenceThreshold}}catch{return{...b}}}function G(e){let n={...C(),...e};try{localStorage.setItem(j,JSON.stringify(n))}catch(o){console.warn("[EasyQuiz] Falha ao persistir configura\xE7\xF5es no localStorage:",o)}return n}var S=['input:not([type="hidden"])',"textarea","select","button",'[role="button"]','[role="radio"]','[role="checkbox"]','[role="option"]','[contenteditable="true"]'].join(","),L=/^(próxim[oa]|next|continuar|avançar|prosseguir|enviar|submit|concluir|finalizar|próxima questão|next question|avançar questão)$/i,ne=0;function h(e){let t=e;if(!t||typeof t.getBoundingClientRect!="function")return!1;let n=t.getBoundingClientRect(),o=window.getComputedStyle(t);return n.width>0&&n.height>0&&o.display!=="none"&&o.visibility!=="hidden"&&Number(o.opacity||"1")>0}function d(e,t=500){return(e??"").replace(/\s+/g," ").trim().slice(0,t)}function ae(e){let t=e.dataset.easyquizId;if(t)return t;let n=`eq-${Date.now().toString(36)}-${(ne+=1).toString(36)}`;return e.dataset.easyquizId=n,n}function H(e){let t=d(e.textContent||e.getAttribute("aria-label")||e.getAttribute("value")||e.value),n=e.type;return L.test(t)||n==="submit"}function ie(e){let t=e.getAttribute("aria-label");if(t)return d(t);let n=e.getAttribute("aria-labelledby");if(n){let i=n.split(/\s+/).map(r=>document.getElementById(r)?.textContent).filter(Boolean).join(" ");if(i.trim())return d(i)}if("labels"in e&&e.labels){let i=Array.from(e.labels??[]).map(r=>r.textContent).join(" ");if(i.trim())return d(i)}let o=e.closest('.docssharedWizToggleLabeledContainer, [role="listitem"], .answer, label, .quiz-option, .form-check');if(o&&o!==e){let i=d(o.textContent);if(i)return i}let a=e.getAttribute("placeholder")||e.getAttribute("title")||e.textContent||e.value||"";return d(a)}function I(e,t){let n=e instanceof HTMLSelectElement?e:null,o=e;e.dataset.easyquizRole=t;let a=e.tagName.toLowerCase(),i=["input","textarea","select","button"].includes(a)?a:"other",r=e.getAttribute("role")||"",s=d(o.type||r||i,40),l="";o.type==="checkbox"||o.type==="radio"||r==="radio"||r==="checkbox"?l=o.checked||e.getAttribute("aria-checked")==="true"?"checked":"unchecked":l=d(o.value||e.textContent||"",2e3);let c=[];if(n)for(let p of Array.from(n.options).slice(0,80))c.push({value:d(p.value),label:d(p.textContent)});let u=!!(o.required||e.getAttribute("aria-required")==="true"),m=!!(o.disabled||e.getAttribute("aria-disabled")==="true");return{id:ae(e),tag:i,type:s,label:ie(e),name:d(o.name||e.getAttribute("name")||"",180),value:l,options:c,required:u,disabled:m,role:t}}var V=[".Qr7Oae",".geSAlb",'[role="listitem"]',".que",".form-group",".question-holder",".quiz-question",".question_holder",".display_question",'[data-functional-selector*="question"]',".question-container","[data-question-id]",'[data-testid*="question" i]','[class*="question" i]','[class*="pergunta" i]','[id*="question" i]','[id*="pergunta" i]',"fieldset","form","article","section",'[role="group"]','[role="region"]','[role="dialog"]',"main"].join(",");function K(e){if(!h(e))return-1/0;let t=e.getBoundingClientRect(),n=Array.from(e.querySelectorAll(S)).filter(h),o=d(e.innerText,4e3).length;if(!n.length||o<10)return-1/0;let a=Math.max(1,window.innerWidth*window.innerHeight),i=Math.max(1,t.width*t.height),r=Math.min(1,i/a),s=t.top+t.height/2,l=Math.abs(s-window.innerHeight/2)/Math.max(1,window.innerHeight),c=Math.min(60,n.length*15e3/i),u=t.top>=0&&t.bottom<=window.innerHeight?30:0;return n.length*20+Math.min(50,o/25)+c+u-r*60-l*15}function re(){let e=document.activeElement;if(e&&e!==document.body){let a=e.closest(V);if(a&&K(a)>0)return a}let n=Array.from(document.querySelectorAll(V)).map(a=>({element:a,score:K(a)})).filter(a=>Number.isFinite(a.score)).sort((a,i)=>i.score-a.score);if(n.length>0&&n[0].score>0)return n[0].element;let o=document.querySelector('form, main, [role="main"]');return o&&h(o)?o:document.body}function se(e){let t=e.cloneNode(!0);return t.querySelectorAll("script, style, iframe, object, embed, svg, canvas, noscript, audio, video").forEach(n=>n.remove()),t.querySelectorAll("*").forEach(n=>{let o=["type","name","value","role","aria-label","aria-labelledby","aria-checked","aria-required","required","disabled","data-easyquiz-id"];for(let a of Array.from(n.attributes))o.includes(a.name)||n.removeAttribute(a.name)}),t.outerHTML.replace(/\s+/g," ").slice(0,2e4)}function le(e){return Array.from(e.querySelectorAll(S)).filter(t=>h(t)&&!H(t)).slice(0,100).map(t=>I(t,"answer"))}function ce(e){let t=[e,e.parentElement,e.parentElement?.parentElement,document.body].filter(Boolean),n=new Set,o=[];for(let a of t)for(let i of Array.from(a.querySelectorAll(S)))if(!(n.has(i)||!h(i)||!H(i))&&(n.add(i),o.push(I(i,"navigation")),o.length>=10))return o;return o}function z(e=!1){let t=re();e&&t.parentElement&&t.parentElement!==document.body&&(t=t.parentElement);let n=d(t.innerText,16e3),o=le(t),a=ce(t),i=[...o,...a].slice(0,120);if(!n||!i.length)throw new Error("Nenhum bloco de quest\xE3o com controles vis\xEDveis foi detectado. Clique ou foque na quest\xE3o e tente novamente.");return{sourceUrl:window.location.href.slice(0,2e3),pageTitle:document.title.slice(0,500)||"P\xE1gina de Quest\xE3o",questionText:n,htmlSnippet:se(t),controls:i,scope:t}}function g(e){let t=CSS.escape(e),n=document.querySelector(`[data-easyquiz-id="${t}"]`);if(n||(n=document.querySelector(`#${t}, [name="${t}"]`),n))return n;let o=`//*[text()="${e}"] | //*[contains(text(),"${e}")]`,a=document.evaluate(o,document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);return a.singleNodeValue?a.singleNodeValue:null}function v(e,t){for(let n of t)e.dispatchEvent(new Event(n,{bubbles:!0,composed:!0}))}function y(e,t){let n=0,o=0;if(t&&t.length===2)n=t[0],o=t[1];else{let i=e.getBoundingClientRect();n=i.left+i.width/2,o=i.top+i.height/2}let a={bubbles:!0,cancelable:!0,composed:!0,clientX:n,clientY:o};e.dispatchEvent(new PointerEvent("pointerdown",a)),e.dispatchEvent(new MouseEvent("mousedown",a)),e.dispatchEvent(new PointerEvent("pointerup",a)),e.dispatchEvent(new MouseEvent("mouseup",a)),e.click()}function F(e,t){if(e instanceof HTMLInputElement||e instanceof HTMLTextAreaElement){let n=e instanceof HTMLTextAreaElement?HTMLTextAreaElement.prototype:HTMLInputElement.prototype,o=Object.getOwnPropertyDescriptor(n,"value")?.set;o?o.call(e,t):e.value=t,v(e,["input","change","blur"]);return}if(e.isContentEditable){e.textContent=t,v(e,["input","change","blur"]);return}throw new Error(`N\xE3o \xE9 poss\xEDvel injetar texto em <${e.tagName.toLowerCase()}>`)}function J(e,t){if(e instanceof HTMLInputElement&&["checkbox","radio"].includes(e.type)){e.checked!==t&&e.click(),e.checked!==t&&(Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"checked")?.set?.call(e,t),v(e,["input","change"]));return}let n=e.getAttribute("role");if(n==="radio"||n==="checkbox"){e.getAttribute("aria-checked")==="true"!==t&&(y(e),e.setAttribute("aria-checked",t?"true":"false"),v(e,["input","change"]));return}y(e)}function de(e,t){if(e instanceof HTMLSelectElement){for(let n of Array.from(e.options))n.selected=t.includes(n.value);v(e,["input","change"]);return}throw new Error("Elemento n\xE3o \xE9 select.")}var W={fill:(e,t)=>{let n=g(e);n?F(n,t):console.warn(`$eq.fill: Elemento ${e} n\xE3o encontrado`)},click:e=>{let t=g(e);t?y(t):console.warn(`$eq.click: Elemento ${e} n\xE3o encontrado`)},check:(e,t)=>{let n=g(e);n?J(n,t):console.warn(`$eq.check: Elemento ${e} n\xE3o encontrado`)},drag:(e,t)=>{let n=g(e),o=g(t);n&&o&&(n.dispatchEvent(new DragEvent("dragstart",{bubbles:!0})),o.dispatchEvent(new DragEvent("drop",{bubbles:!0})),n.dispatchEvent(new DragEvent("dragend",{bubbles:!0})))}};window.$eq=W;function U(e){if(e.t==="js"){let o=String(e.v||"");try{new Function("$eq",o)(W)}catch(a){throw console.error("[EasyQuiz JS Error]",a),new Error("Falha na execu\xE7\xE3o JS gerada pela IA.")}return}let t=e.id||"",n=g(t);if(!n&&e.t!=="adv")throw new Error(`Alvo '${t}' n\xE3o encontrado para a\xE7\xE3o '${e.t}'`);switch(e.t){case"val":n&&F(n,String(e.v));break;case"chk":n&&J(n,!!e.c);break;case"sel":if(n){let o=Array.isArray(e.v)?e.v:[String(e.v)];de(n,o)}break;case"clk":n&&y(n,e.co);break;case"adv":if(n)y(n);else{let o=Array.from(document.querySelectorAll('button, a, input[type="submit"]')).filter(a=>L.test(a.textContent||a.value||""));if(o.length)y(o[0]);else throw new Error("Bot\xE3o de avan\xE7o n\xE3o encontrado.")}break}}async function Y(e,t){let n=e.actions.filter(i=>i.t!=="adv"),o=e.actions.filter(i=>i.t==="adv");for(let i of n)U(i);let a=!1;return t&&o.length>0&&(await new Promise(i=>setTimeout(i,600)),U(o[0]),a=!0),{applied:n.length,advanced:a}}var x=null,_=[];function E(){x&&(x.style.removeProperty("outline"),x.style.removeProperty("outline-offset"),x=null);for(let e of _)e.style.removeProperty("outline"),e.style.removeProperty("outline-offset"),e.style.removeProperty("background-color");_=[]}function O(e){E(),x=e,e.style.outline="2px solid #00e5ff",e.style.outlineOffset="4px"}function X(e){for(let t of e){if(t.type==="advance")continue;let n=CSS.escape(t.targetId),o=document.querySelector(`[data-easyquiz-id="${n}"]`);if(!o)continue;let a=o.closest('label, [role="listitem"], .answer, .form-check')||o;a.style.outline="2px solid #00ff88",a.style.outlineOffset="2px",a.style.backgroundColor="rgba(0, 255, 136, 0.08)",_.push(a)}}var w=4,pe=1200,P=12e5;function A(e){return new Promise((t,n)=>{let o=new FileReader;o.onerror=()=>n(new Error("Falha ao converter blob para base64.")),o.onload=()=>{let a=String(o.result||"");t(a.split(",")[1]||"")},o.readAsDataURL(e)})}async function k(e){let t=0,n=0;if(e instanceof HTMLImageElement?(t=e.naturalWidth||e.width,n=e.naturalHeight||e.height):(t=e.width,n=e.height),t<=0||n<=0)throw new Error("Dimens\xF5es inv\xE1lidas.");let o=Math.min(1,pe/Math.max(t,n)),a=Math.max(1,Math.round(t*o)),i=Math.max(1,Math.round(n*o)),r=document.createElement("canvas");r.width=a,r.height=i;let s=r.getContext("2d",{alpha:!1});if(!s)throw new Error("Sem suporte a Canvas 2D.");return s.fillStyle="#ffffff",s.fillRect(0,0,a,i),s.drawImage(e,0,0,a,i),new Promise((l,c)=>{r.toBlob(u=>u?l(u):c(new Error("Falha compress\xE3o.")),"image/jpeg",.8)})}async function Z(e){try{let t=e.cloneNode(!0),n=e.offsetWidth||500,o=e.offsetHeight||500,a=`
      <svg xmlns="http://www.w3.org/2000/svg" width="${n}" height="${o}">
        <foreignObject width="100%" height="100%">
          <div xmlns="http://www.w3.org/1999/xhtml" style="background:#fff;font-family:sans-serif;">
            ${t.innerHTML}
          </div>
        </foreignObject>
      </svg>
    `,i=new Blob([a],{type:"image/svg+xml;charset=utf-8"}),r=URL.createObjectURL(i),s=new Image;s.crossOrigin="anonymous",await new Promise((u,m)=>{s.onload=u,s.onerror=m,s.src=r});let l=await k(s),c=await A(l);if(URL.revokeObjectURL(r),c&&c.length<=P)return{mediaType:"image/jpeg",base64:c,alt:"Captura Suprema via rasteriza\xE7\xE3o DOM",source:"rasterized"}}catch(t){console.warn("Falha na rasteriza\xE7\xE3o suprema:",t)}return null}async function ue(e){let t=e.currentSrc||e.src;if(!t)return null;let n=(e.alt||e.getAttribute("aria-label")||"Imagem da quest\xE3o").slice(0,500);if(e.complete&&e.naturalWidth>0)try{let o=await k(e),a=await A(o);if(a&&a.length<=P)return{mediaType:"image/jpeg",base64:a,alt:n,source:t.slice(0,2e3)}}catch{}try{let o=await fetch(t,{mode:"cors"});if(o.ok){let a=await o.blob();if(a.type.startsWith("image/")){let i=await createImageBitmap(a),r=await k(i);i.close();let s=await A(r);if(s&&s.length<=P)return{mediaType:"image/jpeg",base64:s,alt:n,source:t.slice(0,2e3)}}}}catch{return Z(e.parentElement||e)}return null}async function B(e){let t=[],n=0,o=Array.from(e.querySelectorAll("img")).filter(h).slice(0,w);for(let a of o)try{let i=await ue(a);if(i&&n+i.base64.length<=25e5&&(t.push(i),n+=i.base64.length,t.length>=w))break}catch{}if(t.length<w){let a=Array.from(e.querySelectorAll("canvas")).filter(h).slice(0,w);for(let i of a)try{let r=await k(i),s=await A(r);if(s&&n+s.length<=25e5&&(t.push({mediaType:"image/jpeg",base64:s,alt:"Canvas inline",source:"canvas"}),n+=s.length,t.length>=w))break}catch{let r=await Z(i.parentElement||i);r&&(t.push(r),n+=r.base64.length)}}return t}var f={logo:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.8L19.2 8 12 11.2 4.8 8 12 4.8zM4 9.6l7 3.1v7.5l-7-3.5V9.6zm9 10.6v-7.5l7-3.1v7.1l-7 3.5z"/></svg>',analyze:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L3 14h8l-2 8 12-12h-8l2-8z"/></svg>',apply:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>',key:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M7 14c-2.76 0-5-2.24-5-5s2.24-5 5-5c2.42 0 4.44 1.72 4.9 4H22v4h-2v3h-3v-3h-2v3h-3v-3h-2.1c-.46 2.28-2.48 4-4.9 4zm0-7c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>',settings:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M3 5h4v2H3V5zm0 6h10v2H3v-2zm0 6h6v2H3v-2zm14-12h4v2h-4V5zm-4 6h8v2h-8v-2zm-4 6h12v2H9v-2z"/></svg>',close:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>',minimize:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M5 11h14v2H5v-2z"/></svg>',target:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2v4m0 12v4M2 12h4m12 0h4m-8-6a6 6 0 100 12 6 6 0 000-12zm0 4a2 2 0 100 4 2 2 0 000-4z" stroke="currentColor" stroke-width="2" fill="none"/></svg>',eye:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>',eyeOff:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.44-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.17c0-1.66-1.34-3-3-3l-.17.02z"/></svg>',check:'<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>',warning:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>',terminal:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8h16v10zm-12-3l3-3-3-3 1.4-1.4L13.8 12l-4.4 4.4L8 15zm6 0h4v2h-4v-2z"/></svg>'};var ee=`
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

  .eq-launcher {
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

  .eq-panel {
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
`;var he=[{value:"",label:"Detec\xE7\xE3o Autom\xE1tica"},{value:"escolha_unica",label:"M\xFAltipla Escolha (\xDAnica)"},{value:"escolha_multipla",label:"M\xFAltipla Escolha (V\xE1rias)"},{value:"verdadeiro_falso",label:"Verdadeiro / Falso"},{value:"texto_livre",label:"Texto Livre / Dissertativa"},{value:"preenchimento",label:"Preenchimento de Lacunas"}],fe=[{value:"smart",label:"Inteligente (Auto-H\xEDbrido)"},{value:"command",label:"Apenas Comando (Seguro)"},{value:"javascript",label:"Apenas JS Nativo (Avan\xE7ado)"}],M=class{host;shadow;callbacks;launcherBtn;panelEl;statusBox;resultContainer;apiKeyInput;testKeyBtn;modelSelect;modeSelect;engineSelect;dryRunCheckbox;autoApplyCheckbox;autoAdvanceCheckbox;hostDarkModeCheckbox;analyzeBtn;applyBtn;constructor(t,n){this.callbacks=n,this.host=document.createElement("div"),this.host.id="easyquiz-shadow-root",this.shadow=this.host.attachShadow({mode:"open"}),this.shadow.innerHTML=`
      <style>${ee}</style>
      <button class="eq-launcher" type="button" title="Abrir EasyQuiz (Alt+Q)">
        ${f.logo}
        <span>EQ</span>
      </button>

      <section class="eq-panel" hidden aria-label="EasyQuiz">
        <header class="eq-header">
          <div class="eq-brand">
            ${f.logo}
            <span>EasyQuiz</span>
            <span class="eq-brand-badge">2.0 SUPREME</span>
          </div>
          <div class="eq-header-tools">
            <button class="eq-icon-btn" id="eq-min-btn" type="button" title="Minimizar">${f.minimize}</button>
            <button class="eq-icon-btn" id="eq-close-btn" type="button" title="Fechar">${f.close}</button>
          </div>
        </header>

        <div class="eq-content">
          <div class="eq-field-group">
            <div class="eq-section-title">
              <span>Chave Gemini (API Key)</span>
              <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" class="eq-link">
                Obter Gr\xE1tis
              </a>
            </div>
            <div class="eq-input-wrap">
              <input id="eq-api-key" class="eq-input" type="password" placeholder="Cole sua chave AIzaSy..." autocomplete="off" spellcheck="false" />
              <button class="eq-input-action-btn" id="eq-test-key-btn" type="button">${f.key} Testar</button>
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
            ${f.analyze} Analisar & Resolver Quest\xE3o
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
              ${f.apply} Injetar Respostas na P\xE1gina
            </button>
          </div>
          <div class="eq-footer-note">EQ Engine v2.0 \u2022 100% Client-Side</div>
        </div>
      </section>
    `,this.launcherBtn=this.shadow.querySelector(".eq-launcher"),this.panelEl=this.shadow.querySelector(".eq-panel"),this.statusBox=this.shadow.querySelector("#eq-status"),this.resultContainer=this.shadow.querySelector("#eq-result"),this.apiKeyInput=this.shadow.querySelector("#eq-api-key"),this.testKeyBtn=this.shadow.querySelector("#eq-test-key-btn"),this.modelSelect=this.shadow.querySelector("#eq-model-select"),this.modeSelect=this.shadow.querySelector("#eq-mode-select"),this.engineSelect=this.shadow.querySelector("#eq-engine-select"),this.dryRunCheckbox=this.shadow.querySelector("#eq-dry-run"),this.autoApplyCheckbox=this.shadow.querySelector("#eq-auto-apply"),this.autoAdvanceCheckbox=this.shadow.querySelector("#eq-auto-advance"),this.hostDarkModeCheckbox=this.shadow.querySelector("#eq-host-dark"),this.analyzeBtn=this.shadow.querySelector("#eq-analyze-btn"),this.applyBtn=this.shadow.querySelector("#eq-apply-btn"),$.forEach(o=>this.modelSelect.add(new Option(o.name,o.id,!1,o.id===t.model))),he.forEach(o=>this.modeSelect.add(new Option(o.label,o.value,!1,o.value===t.modeHint))),fe.forEach(o=>this.engineSelect.add(new Option(o.label,o.value,!1,o.value===t.engine))),this.apiKeyInput.value=t.apiKey,this.dryRunCheckbox.checked=t.dryRun,this.autoApplyCheckbox.checked=t.autoApply,this.autoAdvanceCheckbox.checked=t.autoAdvance,this.hostDarkModeCheckbox.checked=t.hostDarkMode,this.setupEventListeners(),document.documentElement.appendChild(this.host),this.applyHostDarkMode(t.hostDarkMode)}setupEventListeners(){this.launcherBtn.addEventListener("click",()=>this.toggle()),this.shadow.querySelector("#eq-min-btn")?.addEventListener("click",()=>this.toggle(!1)),this.shadow.querySelector("#eq-close-btn")?.addEventListener("click",()=>this.toggle(!1)),this.apiKeyInput.addEventListener("input",()=>this.callbacks.onSettingsChange({apiKey:this.apiKeyInput.value.trim()})),this.modelSelect.addEventListener("change",()=>this.callbacks.onSettingsChange({model:this.modelSelect.value})),this.modeSelect.addEventListener("change",()=>this.callbacks.onSettingsChange({modeHint:this.modeSelect.value})),this.engineSelect.addEventListener("change",()=>this.callbacks.onSettingsChange({engine:this.engineSelect.value})),this.dryRunCheckbox.addEventListener("change",()=>this.callbacks.onSettingsChange({dryRun:this.dryRunCheckbox.checked})),this.autoApplyCheckbox.addEventListener("change",()=>this.callbacks.onSettingsChange({autoApply:this.autoApplyCheckbox.checked})),this.autoAdvanceCheckbox.addEventListener("change",()=>this.callbacks.onSettingsChange({autoAdvance:this.autoAdvanceCheckbox.checked})),this.hostDarkModeCheckbox.addEventListener("change",()=>{let t=this.hostDarkModeCheckbox.checked;this.callbacks.onSettingsChange({hostDarkMode:t}),this.applyHostDarkMode(t)}),this.testKeyBtn.addEventListener("click",async()=>{let t=this.apiKeyInput.value.trim();if(!t)return this.setStatus("Informe a chave de API.","error");this.setStatus("Testando 3.8 Flash...","info"),this.testKeyBtn.disabled=!0;try{let n=await Q(t);this.setStatus(n.message,n.ok?"success":"error")}finally{this.testKeyBtn.disabled=!1}}),this.analyzeBtn.addEventListener("click",()=>this.callbacks.onAnalyze()),this.applyBtn.addEventListener("click",()=>this.callbacks.onApply())}applyHostDarkMode(t){let n="eq-host-dark-mode-style",o=document.getElementById(n);t?o||(o=document.createElement("style"),o.id=n,o.innerHTML=`
          html { filter: invert(1) hue-rotate(180deg) !important; background: #fff !important; }
          img, video, canvas, [style*="background-image"] { filter: invert(1) hue-rotate(180deg) !important; }
        `,document.head.appendChild(o)):o&&o.remove()}toggle(t){let n=t!==void 0?!t:!this.panelEl.hidden;this.panelEl.hidden=n,!n&&!this.apiKeyInput.value&&this.apiKeyInput.focus()}setBusy(t,n){this.analyzeBtn.disabled=t,[this.modelSelect,this.modeSelect,this.engineSelect,this.dryRunCheckbox,this.autoApplyCheckbox,this.autoAdvanceCheckbox].forEach(o=>o.disabled=t),n&&this.setStatus(n,"info")}setStatus(t,n="info"){this.statusBox.textContent=t,this.statusBox.className=`eq-status-box ${n}`}setPlan(t,n){this.resultContainer.style.display="flex";let o=this.shadow.querySelector("#eq-badges");o.innerHTML=`
      <span class="eq-badge highlight">${t.mode.replace("_"," ")}</span>
      <span class="eq-badge ${t.confidence>=.8?"success":""}">${Math.round(t.confidence*100)}% Confian\xE7a</span>
      <span class="eq-badge">${t.actions.length} Cmds</span>
    `;let a=this.shadow.querySelector("#eq-rationale-text");a.textContent=t.rationale||t.summary;let i=this.shadow.querySelector("#eq-actions-list");i.innerHTML="";for(let r of t.actions){let s=document.createElement("div");s.className="eq-action-item";let l="";r.t==="chk"?l=`[CHK] ${r.id}`:r.t==="val"?l=`[INJ] "${r.v}" em ${r.id}`:r.t==="sel"?l=`[SEL] ${Array.isArray(r.v)?r.v.join(","):r.v} em ${r.id}`:r.t==="clk"?l=`[CLK] ${r.id}`:r.t==="adv"?l="[AVAN\xC7AR]":r.t==="js"&&(l=`[JS] ${String(r.v)}`),s.innerHTML=`<span class="eq-action-bullet">\u25A0</span> <span>${l}</span>`,i.appendChild(s)}this.applyBtn.disabled=!n||!t.actions.length}destroy(){this.applyHostDarkMode(!1),this.callbacks.onDestroy(),this.host.remove()}};async function me(){let e=window;if(e.__easyquiz){e.__easyquiz.toggle();return}let t=C(),n=null,o=new M(t,{onAnalyze:()=>void a(),onApply:()=>void i(),onDestroy:()=>{E(),delete e.__easyquiz},onSettingsChange:r=>{t=G(r)}});e.__easyquiz={toggle:()=>o.toggle(),destroy:()=>o.destroy(),analyze:()=>a()},window.addEventListener("keydown",r=>{if(r.altKey&&(r.key==="q"||r.key==="Q")){if(r.preventDefault(),!o)return;o.toggle(!0),a()}});async function a(){if(!t.apiKey){o.setStatus("Configure sua chave de API Gemini acima para come\xE7ar.","error"),o.toggle(!0);return}o.setBusy(!0,"Identificando o bloco da quest\xE3o ativa na p\xE1gina..."),E();try{let r=z(!1);O(r.scope),o.setStatus(`Quest\xE3o localizada (${r.controls.length} controles). Otimizando imagens...`,"info");let s=await B(r.scope);o.setStatus(`Consultando Gemini (${t.model}) com ${s.length} imagem(ns) anexada(s)...`,"info");let{plan:l}=await T(r,s,t);l.needsMoreContext&&(o.setStatus("Expandindo contexto ao redor da quest\xE3o para maior assertividade...","info"),r=z(!0),O(r.scope),s=await B(r.scope),l=(await T(r,s,t)).plan),n=l,X(l.actions),o.setPlan(l,!t.dryRun),o.setStatus(t.dryRun?"Simula\xE7\xE3o conclu\xEDda. As respostas foram real\xE7adas na p\xE1gina sem altera\xE7\xE3o.":"Resolu\xE7\xE3o pronta! Verifique o realce na tela e aplique quando desejar.","success"),t.autoApply&&!t.dryRun&&await i()}catch(r){E();let s=r instanceof Error?r.message:"Falha desconhecida na an\xE1lise.";o.setStatus(s,"error")}finally{o.setBusy(!1)}}async function i(){if(!n){o.setStatus("Nenhum plano dispon\xEDvel para aplicar. Execute a an\xE1lise primeiro.","error");return}if(t.dryRun){o.setStatus("O modo de simula\xE7\xE3o est\xE1 ativo. Desmarque para poder aplicar.","error");return}let r=t.autoAdvance&&n.confidence>=t.confidenceThreshold&&!n.needsMoreContext;o.setBusy(!0,"Aplicando respostas no formul\xE1rio...");try{let s=await Y(n,r);o.setStatus(`Sucesso: ${s.applied} resposta(s) preenchida(s)${s.advanced?" e pr\xF3xima quest\xE3o acionada":""}.`,"success")}catch(s){let l=s instanceof Error?s.message:"Falha ao aplicar plano.";o.setStatus(l,"error")}finally{o.setBusy(!1)}}t.apiKey||o.toggle(!0)}me().catch(e=>{console.error("[EasyQuiz] Erro fatal na inicializa\xE7\xE3o:",e),window.alert(`EasyQuiz: falha ao iniciar: ${e instanceof Error?e.message:String(e)}`)});})();
