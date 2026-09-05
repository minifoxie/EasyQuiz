/* EasyQuiz v1.0.0 — Resolução inteligente de quizzes sem servidor
 * GitHub: https://github.com/minifoxie/EasyQuiz
 * 100% Client-side. Direct Google Gemini REST API.
 */
"use strict";(()=>{var A={apiKey:"",model:"gemini-3.5-flash",uiMode:"easy",modeHint:"",engine:"smart",dryRun:!1,autoApply:!1,autoAdvance:!1,hostDarkMode:!0,useVision:!1,confidenceThreshold:.8};var ae="easyquiz_settings_v2";function oe(){try{let t=localStorage.getItem(ae);if(!t){let o=localStorage.getItem("easyquiz_settings_v1");if(o){let i=JSON.parse(o);return{...A,apiKey:i.apiKey||""}}return{...A}}let e=JSON.parse(t),a=typeof e.model=="string"&&e.model?e.model:A.model;return a==="gemini-2.5-flash"&&(a="gemini-3.5-flash"),{apiKey:typeof e.apiKey=="string"?e.apiKey.trim():A.apiKey,model:a,uiMode:e.uiMode==="easy"||e.uiMode==="advanced"?e.uiMode:A.uiMode,modeHint:e.modeHint??"",engine:e.engine??"smart",dryRun:!!e.dryRun,autoApply:!!e.autoApply,autoAdvance:!!e.autoAdvance,hostDarkMode:e.hostDarkMode!==void 0?!!e.hostDarkMode:!0,useVision:!!e.useVision,confidenceThreshold:typeof e.confidenceThreshold=="number"?e.confidenceThreshold:A.confidenceThreshold}}catch{return{...A}}}function ve(){try{localStorage.removeItem(ae),localStorage.removeItem("easyquiz_settings_v1");let t=[];for(let e=0;e<localStorage.length;e++){let a=localStorage.key(e);a&&(a.startsWith("eq_")||a.startsWith("easyquiz_"))&&t.push(a)}t.forEach(e=>localStorage.removeItem(e)),ie()}catch(t){console.warn("[EasyQuiz] Erro ao resetar dados:",t)}}function R(t){try{let e=localStorage.getItem("eq_domain_cache_"+t);if(!e)return{};let a=JSON.parse(e);if(a.advanceSelector&&/inject|injetar/i.test(a.advanceSelector)){a.advanceSelector=void 0;try{localStorage.removeItem("eq_domain_cache_"+t)}catch{}}return a}catch{return{}}}function ne(t,e){if(e.advanceSelector&&/inject|injetar/i.test(e.advanceSelector))return;let o={...R(t),...e};try{localStorage.setItem("eq_domain_cache_"+t,JSON.stringify(o))}catch(i){console.warn("[EasyQuiz] Erro cache de dominio:",i)}}function ye(t){let a={...oe(),...t};try{localStorage.setItem(ae,JSON.stringify(a))}catch(o){console.warn("[EasyQuiz] Falha ao persistir configura\xE7\xF5es no localStorage:",o)}return a}var j=[];function xe(t){let e=t.trim();e&&!j.includes(e)&&j.push(e)}function we(){return j}function ie(){j=[]}var Ee=`Voc\xEA \xE9 o EasyQuiz Engine v4.8 Supreme. Responda estritamente em JSON v\xE1lido.

Regras de Classifica\xE7\xE3o ("pageType"):
1. "info" (P\xC1GINA DE CONTEXTO / LEITURA / TEORIA):
   - Se a tela apresentar texto te\xF3rico, instru\xE7\xE3o de leitura, artigo, caso cl\xEDnico, hist\xF3ria, tutorial ou v\xEDdeo explicativo SEM alternativas para marcar ou campos de exerc\xEDcio:
   - REGRA OBRIGAT\xD3RIA 1: Defina "pageType": "info".
   - REGRA OBRIGAT\xD3RIA 2: NUNCA marque "needsMoreContext": true para textos te\xF3ricos.
   - REGRA OBRIGAT\xD3RIA 3: Resuma detalhadamente em "memoryToStore" todos os conceitos-chave, dados, regras, defini\xE7\xF5es e f\xF3rmulas apresentados no texto. Esse resumo ser\xE1 automaticamente injetado no prompt de todas as quest\xF5es seguintes!
   - REGRA OBRIGAT\xD3RIA 4: Em "actions", retorne [ { "t": "adv" } ] para acionar o bot\xE3o de continuar/avan\xE7ar/pr\xF3ximo e prosseguir automaticamente.
   - Defina "confidence": 1.0.

2. "question" (EXERC\xCDCIO / QUEST\xC3O ATIVA):
   - H\xE1 op\xE7\xF5es de resposta, m\xFAltipla escolha, campos de texto, associa\xE7\xE3o, categoriza\xE7\xE3o ou ordena\xE7\xE3o.
   - Em "actions", gere os comandos necess\xE1rios para preencher/marcar/arrastar todas as respostas corretas.
   - Ao final das a\xE7\xF5es, sempre inclua { "t": "adv" } para confirmar/submeter/avan\xE7ar.

3. "start" (TELA INICIAL):
   - Tela de introdu\xE7\xE3o antes do in\xEDcio do question\xE1rio. Retorne actions: [ { "t": "adv" } ].

4. "conclusion" (TELA FINAL):
   - Resumo de notas, parab\xE9ns ou final da atividade. Retorne actions: [].

Regras para Categoriza\xE7\xE3o e Arrastar-e-Soltar:
- Para cada item a categorizar, gere { "t": "drag", "from": "texto_identificador_do_item", "to": "nome_da_categoria" }.
- Em "from", use o texto limpo ou as primeiras 4-8 palavras do item (NUNCA inclua retic\xEAncias "..." ou "\u2026" no valor de "from").
- Em "to", use o nome exato da categoria ou coluna destino (ex: "Fato", "Opini\xE3o", "Verdadeiro", "Falso", etc.).
- O motor executar\xE1 automaticamente a estrat\xE9gia h\xEDbrida: bot\xF5es de categoria no card, clique-no-item + clique-no-destino, arrasto de ponteiro e drag-and-drop nativo seguro.
- Sempre finalize com { "t": "adv" } para acionar o bot\xE3o de conferir/avan\xE7ar.

Comandos declarativos ("actions"):
- { "t": "val", "id": "id_ou_rotulo", "v": "texto_a_injetar" }
- { "t": "chk", "id": "id_ou_rotulo", "c": true }
- { "t": "sel", "id": "id_ou_rotulo", "v": ["valor"] }
- { "t": "clk", "id": "id_ou_rotulo" }
- { "t": "drag", "from": "texto_item", "to": "texto_categoria" }
- { "t": "adv" } (aciona bot\xE3o de avan\xE7o/pr\xF3xima)`;function qe(t,e,a){let o=t.htmlSnippet.includes("draggable")||t.htmlSnippet.includes("perseus")||t.htmlSnippet.includes("category")||t.htmlSnippet.includes("dropzone")||t.controls.some(l=>l.type==="draggable"||l.type==="dropzone"),r=t.questionText.length<120||o||t.controls.length<3?`
[HTML FRAGMENT (Estrutura DOM/Widgets)]:
${t.htmlSnippet.slice(0,5e3)}`:`
[HTML FRAGMENT]: Omitido (Texto e controles s\xE3o suficientes).`,n=we(),s="";return n.length>0&&(s=`
[MEM\xD3RIA DE CONTEXTO ATIVA (RAG)]:
${n.map(l=>`- ${l}`).join(`
`)}
`),`--- NOVA AN\xC1LISE DE P\xC1GINA ---
[MODO REQUERIDO]: ${a.engine}
[DICA]: ${a.modeHint||"Auto"}
[SIMULA\xC7\xC3O]: ${a.dryRun?"ON":"OFF"}
[URL]: ${t.sourceUrl}
[P\xC1GINA]: ${t.pageTitle}
${s}
[TEXTO VIS\xCDVEL]:
${t.questionText}
${r}

[CONTROLES DETECTADOS]:
${JSON.stringify(t.controls.map(l=>({id:l.id,type:l.type,lbl:l.label,val:l.value,opt:l.options.length?l.options:void 0})),null,0)}

[IMAGENS ANEXADAS]: ${e.length}
Responda estritamente em JSON.`}var H=[{id:"gemini-3.5-flash",name:"Gemini 3.5 Flash (Padr\xE3o 2026 - Alta Velocidade)",description:"Frontier model com alta intelig\xEAncia multimodal otimizado para velocidade."},{id:"gemini-3.1-flash-lite",name:"Gemini 3.1 Flash Lite (Ultra Eficiente e Est\xE1vel)",description:"Equil\xEDbrio ideal entre intelig\xEAncia e economia extrema de cota."},{id:"gemini-2.5-flash",name:"Gemini 2.5 Flash (Compatibilidade)",description:"Modelo r\xE1pido para contas com acesso ativo."},{id:"gemini-2.5-pro",name:"Gemini 2.5 Pro (Racioc\xEDnio Avan\xE7ado)",description:"Alta capacidade de racioc\xEDnio l\xF3gico, problemas complexos e STEM."},{id:"gemini-3.1-pro",name:"Gemini 3.1 Pro (Racioc\xEDnio Profundo)",description:"Modelo avan\xE7ado para racioc\xEDnio em m\xFAltiplos passos e c\xF3digo."},{id:"gemini-1.5-flash",name:"Gemini 1.5 Flash (Legado Universal)",description:"Suporte universal de alta compatibilidade em contas com endpoints legados."}],Be={type:"OBJECT",properties:{pageType:{type:"STRING",enum:["question","info","start","conclusion"]},mode:{type:"STRING",enum:["texto_livre","escolha_unica","escolha_multipla","verdadeiro_falso","preenchimento","acao_sem_resposta","categorizacao","ordenacao","arrastar_soltar"]},confidence:{type:"NUMBER"},rationale:{type:"STRING"},needsMoreContext:{type:"BOOLEAN"},warnings:{type:"ARRAY",items:{type:"STRING"}},memoryToStore:{type:"STRING"},actions:{type:"ARRAY",items:{type:"OBJECT",properties:{t:{type:"STRING",enum:["val","chk","sel","clk","adv","js","drag"]},id:{type:"STRING"},v:{},c:{type:"BOOLEAN"},co:{type:"ARRAY",items:{type:"NUMBER"}},from:{type:"STRING"},to:{type:"STRING"}},required:["t"]}}},required:["pageType","mode","confidence","rationale","needsMoreContext","actions"]};function Ne(t){let e=t.trim().replace(/^google\//,"").replace(/^models\//,"");return e==="gemini-2.5-flash"?"gemini-3.5-flash":e||"gemini-3.5-flash"}function Te(t,e){let a="";try{let o=JSON.parse(t);a=o.error?.message||o.message||""}catch{a=t.slice(0,160)}return/API_KEY_INVALID|API key not valid|key.*invalid|unregistered/i.test(a)?"Chave de API do Gemini inv\xE1lida ou n\xE3o autorizada no Google AI Studio.":/RESOURCE_EXHAUSTED|Quota exceeded/i.test(a)||e===429?"Limite tempor\xE1rio de cota do Gemini (HTTP 429) atingido. Aguardando recupera\xE7\xE3o...":e===404?`HTTP 404: ${a||"Modelo ou endpoint n\xE3o encontrado no Google AI Studio"}`:e===503||/overloaded/i.test(a)?`Servidores Google sobrecarregados (HTTP 503): ${a||"Aguardando"}`:a?`Erro Gemini (HTTP ${e}): ${a}`:`Falha na requisi\xE7\xE3o ao Gemini (HTTP ${e}).`}function De(t){try{return JSON.parse(t)}catch(e){let a=t.trim(),o=[a+"}",a+"]}",a+'"}]}',a+'"]}',a+"}]}",a+"}]}}"];for(let i of o)try{let r=JSON.parse(i);if(r&&typeof r=="object")return r}catch{}throw new Error(`Falha ao decodificar JSON da IA (${e instanceof Error?e.message:"incompleto"})`)}}var F=null,se=new Set;async function Q(t){let e=t.trim().replace(/^["']|["']$/g,"");if(!e)return H;let a=[`https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(e)}`,`https://generativelanguage.googleapis.com/v1/models?key=${encodeURIComponent(e)}`];for(let o of a)try{let i=await fetch(o,{headers:{"Content-Type":"application/json","x-goog-api-key":e}});if(!i.ok){let n=await i.text(),s=Te(n,i.status);if(s.includes("inv\xE1lida")||s.includes("n\xE3o autorizada"))throw new Error(s);continue}let r=await i.json();if(Array.isArray(r.models)&&r.models.length>0){let n=r.models.filter(s=>{let l=s.supportedGenerationMethods||[],d=(s.name||"").includes("gemini"),c=l.includes("generateContent"),h=(s.name||"").includes("embedding")||(s.name||"").includes("tts")||(s.name||"").includes("imagen")||(s.name||"").includes("aqa")||(s.name||"").includes("computer-use");return d&&c&&!h}).map(s=>{let l=s.name.replace(/^models\//,""),d=s.displayName||l;return{id:l,name:d.includes(l)?d:`${d} (${l})`,description:s.description||""}});if(n.length>0)return n.sort((s,l)=>{let d=c=>c==="gemini-2.5-flash"?100:c==="gemini-3.5-flash"?95:c==="gemini-3.1-flash-lite"?90:c==="gemini-2.5-pro"?85:c==="gemini-3.1-pro"?80:c==="gemini-1.5-flash"?60:c.includes("flash")?50:10;return d(l.id)-d(s.id)}),F=n,n}}catch(i){if(i.message?.includes("Chave de API"))throw i}return H}async function Ce(t){let e=t.trim().replace(/^["']|["']$/g,"");if(!e)return{ok:!1,message:"Insira sua chave de API."};try{let o=await Q(e);if(o.length>0&&o!==H){let i=o[0];return{ok:!0,message:`Chave v\xE1lida! ${o.length} modelos Gemini dispon\xEDveis em sua conta. Recomendado: ${i.name}`,models:o}}}catch(o){return{ok:!1,message:o instanceof Error?o.message:String(o)}}let a=["gemini-2.5-flash","gemini-3.5-flash","gemini-1.5-flash"];for(let o of a)for(let i of["v1beta","v1"]){let r=`https://generativelanguage.googleapis.com/${i}/models/${o}:generateContent?key=${encodeURIComponent(e)}`;try{if((await fetch(r,{method:"POST",headers:{"Content-Type":"application/json","x-goog-api-key":e},body:JSON.stringify({contents:[{role:"user",parts:[{text:"PING"}]}],generationConfig:{maxOutputTokens:5}})})).ok)return{ok:!0,message:`Chave validada com sucesso no ${o} (${i})!`,models:H}}catch{}}return{ok:!1,message:"Chave de API inv\xE1lida, sem cota ou sem permiss\xE3o para modelos Gemini."}}async function re(t,e,a,o){let i=a.apiKey.trim().replace(/^["']|["']$/g,"");if(!i)throw new Error("Chave de API n\xE3o configurada.");let r=Ne(a.model);if(!F||F.length===0)try{o?.("Verificando modelos autorizados na sua chave de API...","info"),await Q(i)}catch(m){let u=m instanceof Error?m.message:String(m);if(u.includes("inv\xE1lida")||u.includes("n\xE3o autorizada"))throw new Error(u)}let n=Date.now(),s=qe(t,e,a),l=[{text:s}];for(let m of e)l.push({inline_data:{mime_type:m.mediaType,data:m.base64}});let d={system_instruction:{parts:[{text:Ee}]},contents:[{role:"user",parts:l}],generationConfig:{temperature:.05,maxOutputTokens:2500,response_mime_type:"application/json",response_schema:Be}},c=[r,...F?.map(m=>m.id)||[],"gemini-3.5-flash","gemini-3.1-flash-lite","gemini-2.5-flash","gemini-2.5-pro","gemini-3.1-pro","gemini-1.5-flash"],h=Array.from(new Set(c)).filter(m=>!se.has(m));h.length===0&&(se.clear(),h.push(...H.map(m=>m.id)));let p=new Error("Nenhum modelo tentado.");for(let m=0;m<h.length;m++){let u=h[m],x=h[m+1];o?.(`Aguardando resposta da API (${u})...`,"info");let v=["v1beta","v1"];for(let M of v){let T=`https://generativelanguage.googleapis.com/${M}/models/${u}:generateContent?key=${encodeURIComponent(i)}`,G=new AbortController,be=setTimeout(()=>G.abort(),35e3);try{let L=await fetch(T,{method:"POST",headers:{"Content-Type":"application/json","x-goog-api-key":i},body:JSON.stringify(d),signal:G.signal});if(clearTimeout(be),!L.ok){let $e=await L.text(),Oe=Te($e,L.status);if(L.status===404&&M==="v1beta")continue;throw new Error(Oe)}let ee=await L.json(),te=ee.candidates?.[0];if(!te||!te.content?.parts?.[0]?.text)throw new Error("A IA n\xE3o retornou uma resposta estruturada v\xE1lida.");let Re=te.content.parts[0].text,C=De(Re);if(Array.isArray(C.actions)||(C.actions=[]),Array.isArray(C.warnings)||(C.warnings=[]),typeof C.confidence!="number"&&(C.confidence=.8),C.usedModel=u,C.durationMs=Date.now()-n,C.promptSent=s,C.tokensUsed=ee.usageMetadata?.totalTokenCount,u!==r){o?.(`Resolvido com sucesso pelo fallback '${u}' (${M})!`,"info");try{a.model=u}catch{}}return{plan:C,rawUsage:ee.usageMetadata,usedModel:u}}catch(L){if(clearTimeout(be),p=L,p.message.includes("inv\xE1lida")||p.message.includes("n\xE3o autorizada"))throw p}}let f=p.message.includes("429")||p.message.includes("cota"),k=p.message.includes("503")||p.message.includes("sobrecarregado");if(p.message.includes("404")&&se.add(u),x){let M=f?3500:k?2500:900,T=`Modelo '${u}' indispon\xEDvel (${p.message}). Aguardando ${M/1e3}s antes de alternar para '${x}'...`;console.warn(`[EasyQuiz Fallback] ${T}`),o?.(T,"warning"),await new Promise(G=>setTimeout(G,M))}else console.warn(`[EasyQuiz Fallback] Modelo '${u}' falhou: ${p.message}. Todos os modelos esgotados.`)}throw p}var z=['input:not([type="hidden"])',"textarea","select","button","a",'[role="button"]','[role="link"]','[role="radio"]','[role="checkbox"]','[role="option"]','[contenteditable="true"]','[draggable="true"]',"[aria-grabbed]","[aria-dropeffect]","[data-widget-type]",".perseus-drag-item",".sortable-item",'[data-testid*="drag" i]','[data-testid*="card" i]','[data-testid*="option" i]','[data-testid*="category" i]','[data-role="dropzone"]',"[data-category]"].join(","),U=/(verificar|checar|check|conferir|validar|próxim[oa]|next|continuar|continue|avançar|prosseguir|enviar|submit|concluir|finalizar|terminar|começar|iniciar|start|vamos lá|próxima tarefa|next task|próxima pergunta|next question|marcar como concluíd[oa]|mostrar resumo|entendi|compreendi|ok|leitura concluída|seguir|ir para o exercício|fazer o teste|próximo artigo|ir para a aula)/i,_e=0;function E(t){let e=t;if(!e||typeof e.getBoundingClientRect!="function")return!1;let a=e.getBoundingClientRect(),o=window.getComputedStyle(e);return a.width>0&&a.height>0&&o.display!=="none"&&o.visibility!=="hidden"&&Number(o.opacity||"1")>0}function Ve(t){if(t==null)return"";if(typeof t=="string")return t;if(typeof t=="number"||typeof t=="boolean")return String(t);if(t instanceof Node)return t.textContent||"";try{if(typeof t?.toString=="function"){let e=t.toString();if(typeof e=="string")return e}}catch{}return""}function w(t,e=500){return Ve(t).replace(/\s+/g," ").trim().slice(0,e)}function Ge(t){let e=t.dataset.easyquizId;if(e)return e;let a=`eq-${Date.now().toString(36)}-${(_e+=1).toString(36)}`;return t.dataset.easyquizId=a,a}function je(t){return t?!!(t.closest('#easyquiz-shadow-root, .eq-sidebar, .eq-launcher, [data-easyquiz-ignore="true"], .btn-inject-eq, #btn-inject-script')||t.getAttribute?.("data-easyquiz-ignore")==="true"):!1}function $(t){if(!t||!(t instanceof Element)||je(t)||t.closest("header, nav, aside"))return!1;let e=t instanceof HTMLInputElement||t instanceof HTMLButtonElement?t.value:"",a=w(t.getAttribute?.("aria-label")||t.textContent||t.getAttribute?.("value")||e),o=t.type,i=a.replace(/[\d\(\)\[\]→\>\•\-\/\\]+/g," ").trim(),r=String(t.getAttribute?.("data-testid")||t.getAttribute?.("data-test-id")||t.getAttribute?.("id")||t.getAttribute?.("href")||"").toLowerCase();return U.test(i)||U.test(a)||o==="submit"||r.includes("next")||r.includes("check")||r.includes("continue")||r.includes("proximo")||r.includes("forward")||!1}function Fe(t){let e=t.getAttribute("aria-label");if(e)return w(e);let a=t.getAttribute("aria-labelledby");if(a){let n=a.split(/\s+/).map(s=>document.getElementById(s)?.textContent).filter(Boolean).join(" ");if(n.trim())return w(n)}if("labels"in t&&t.labels){let n=Array.from(t.labels??[]).map(s=>s.textContent).join(" ");if(n.trim())return w(n)}let o=t.closest('.docssharedWizToggleLabeledContainer, [role="listitem"], .answer, label, .quiz-option, .form-check');if(o&&o!==t){let n=w(o.textContent);if(n)return n}let i=t instanceof HTMLInputElement||t instanceof HTMLButtonElement?t.value:"",r=t.getAttribute("placeholder")||t.getAttribute("title")||t.textContent||i||"";return w(r)}function le(t,e){let a=t instanceof HTMLSelectElement?t:null,o=t;t.dataset.easyquizRole=e;let i=t.tagName.toLowerCase(),r=["input","textarea","select","button"].includes(i)?i:"other",n=t.getAttribute("role")||"",s=(t.getAttribute("data-testid")||t.getAttribute("data-test-id")||"").toLowerCase(),l=(t.className&&typeof t.className=="string"?t.className:"").toLowerCase(),d=t.getAttribute("draggable")==="true"||t.classList.contains("perseus-drag-item")||t.classList.contains("sortable-item")||!!t.getAttribute("aria-grabbed")||/drag|card|option|item/i.test(s)||/drag|card-item|sortable/i.test(l),c=t.getAttribute("data-role")==="dropzone"||t.classList.contains("category-container")||t.hasAttribute("data-category")||!!t.getAttribute("aria-dropeffect")||/drop|category|bucket/i.test(s)||/dropzone|category-box|bucket|target-zone/i.test(l),p=w((d?"draggable":c?"dropzone":"")||o.type||n||r,40),m="";if(o.type==="checkbox"||o.type==="radio"||n==="radio"||n==="checkbox")m=o.checked||t.getAttribute("aria-checked")==="true"?"checked":"unchecked";else{let f=t instanceof HTMLInputElement||t instanceof HTMLTextAreaElement||t instanceof HTMLSelectElement?t.value:"";m=w(f||t.getAttribute("data-category")||t.textContent||"",2e3)}let u=[];if(a)for(let f of Array.from(a.options).slice(0,80))u.push({value:w(f.value),label:w(f.textContent)});let x=!!(o.required||t.getAttribute("aria-required")==="true"),v=!!(o.disabled||t.getAttribute("aria-disabled")==="true");return{id:Ge(t),tag:r,type:p,label:Fe(t),name:w(o.name||t.getAttribute("name")||"",180),value:m,options:u,required:x,disabled:v,role:e}}var Se=['[data-test-id*="exercise" i]','[data-testid*="exercise" i]',".perseus-renderer",".framework-perseus",".Qr7Oae",".que",".question-holder",".quiz-question",".question_holder",".display_question",'[data-functional-selector*="question"]',".question-container","[data-question-id]",'[data-testid*="question" i]','[class*="question-container" i]','[class*="question" i]','[class*="pergunta" i]',"article","form","section","main"].join(",");function Me(t){if(!E(t))return-1/0;let e=t.getBoundingClientRect(),a=Array.from(t.querySelectorAll(z)).filter(E),o=w(t.innerText,4e3).length;if(o<10||!a.length&&o<60)return-1/0;let i=Math.max(1,window.innerWidth*window.innerHeight),r=Math.max(1,e.width*e.height),n=Math.min(1,r/i),s=e.top+e.height/2,l=Math.abs(s-window.innerHeight/2)/Math.max(1,window.innerHeight),d=o>40?35:0,c=e.top>=0&&e.bottom<=window.innerHeight?25:0;return a.length*15+Math.min(60,o/20)+d+c-n*20-l*10}function ce(t){let e=t;for(;e.parentElement&&e.parentElement!==document.body&&e.parentElement!==document.documentElement;){let a=e.parentElement,o=a.tagName.toLowerCase();if(["header","footer","nav","aside"].includes(o))break;if(a.matches?.('article, section, form, [data-test-id*="exercise" i], [data-testid*="exercise" i], .perseus-renderer, .framework-perseus, [class*="question-container" i], .que, main')){e=a;break}let i=w(e.innerText,1e4),r=w(a.innerText,1e4),n=e.querySelectorAll(z).length,s=a.querySelectorAll(z).length;if(i.length<150&&r.length>i.length&&s<=n+4){e=a;continue}break}return e}function Qe(t){let e=t,a=e.closest('main, [role="main"], article, form, [data-test-id*="exercise" i], [data-testid*="exercise" i], .framework-perseus, section');if(a&&a!==document.body&&E(a))return a;let o=0;for(;e.parentElement&&e.parentElement!==document.body&&o<3;)e=e.parentElement,o++;return e||document.body}function Ue(){let t=document.activeElement;if(t&&t!==document.body){let i=t.closest(Se);if(i&&Me(i)>0)return ce(i)}let a=Array.from(document.querySelectorAll(Se)).map(i=>({element:i,score:Me(i)})).filter(i=>Number.isFinite(i.score)).sort((i,r)=>r.score-i.score);if(a.length>0&&a[0].score>0)return ce(a[0].element);let o=document.querySelector('form, main, [role="main"]');return o&&E(o)?o:document.body}function ke(t){let e=t.cloneNode(!0);e.querySelectorAll("script, style, iframe, object, embed, svg, canvas, noscript, audio, video").forEach(o=>o.remove());let a=["type","name","value","role","aria-label","aria-labelledby","aria-checked","aria-required","required","disabled","data-easyquiz-id","draggable","class","id","data-widget-type","data-role","data-category","data-testid"];return e.querySelectorAll("*").forEach(o=>{for(let i of Array.from(o.attributes))a.includes(i.name)||o.removeAttribute(i.name)}),e.outerHTML.replace(/\s+/g," ").slice(0,2e4)}function Ye(t){return Array.from(t.querySelectorAll(z)).filter(e=>{if(!E(e)||$(e))return!1;if(e.tagName.toLowerCase()==="a"){let a=e.getAttribute("role");return!!(a==="button"||a==="radio"||a==="checkbox"||a==="option"||e.closest('[class*="choice" i], [class*="option" i], [class*="answer" i], [data-testid*="option" i]'))}return!0}).slice(0,100).map(e=>le(e,"answer"))}function de(t){let e=[t,t.parentElement,t.parentElement?.parentElement,document.body].filter(Boolean),a=new Set,o=[];for(let i of e)for(let r of Array.from(i.querySelectorAll(z)))if(!(a.has(r)||!E(r)||!$(r))&&(a.add(r),o.push(le(r,"navigation")),o.length>=10))return o;return o}function O(t=!1){let e=Ue();e=ce(e),t&&(e=Qe(e));let a=e.innerText&&e.innerText.trim().length>0?e.innerText:e.textContent||"",o=w(a,16e3),i=Ye(e),r=de(e);r.length===0&&(r=de(document.body));let n=[...i,...r].slice(0,120);return!o||n.length===0&&o.length<30?w(document.body.innerText||document.body.textContent||"",16e3).length>=30?I():null:{sourceUrl:window.location.href.slice(0,2e3),pageTitle:document.title.slice(0,500)||"P\xE1gina de Quest\xE3o",questionText:o,htmlSnippet:ke(e),controls:n,scope:e}}function I(){let t=document.body.innerText||document.body.textContent||document.documentElement.textContent||"",e=w(t,14e3),a=de(document.body),o=document.querySelector('main, article, [role="main"], [data-test-id*="content" i], [class*="content" i]')||document.body;return{sourceUrl:window.location.href.slice(0,2e3),pageTitle:document.title.slice(0,500)||"P\xE1gina de Leitura/Contexto",questionText:e,htmlSnippet:ke(o).slice(0,15e3),controls:a,scope:o}}function S(t){return t?!!(t.closest('#easyquiz-shadow-root, .eq-sidebar, .eq-launcher, [data-easyquiz-ignore="true"], .btn-inject-eq, #btn-inject-script')||t.getAttribute?.("data-easyquiz-ignore")==="true"):!1}function y(t){return t?t.replace(/^(\([0-9a-zA-Z]{1,2}\)|[0-9]{1,3}|[a-zA-Z])[\.\)\-\:\s]+\s+/,"").replace(/[\.\u2026]{2,}/g," ").replace(/['"“”«»]/g,"").replace(/\s+/g," ").trim():""}function b(t){if(!t)return null;let e=t.trim().replace(/^["'“”«»]+|["'“”«»]+$/g,"");if(!e)return null;let a=CSS.escape(e),o=document.querySelector(`[data-easyquiz-id="${a}"]`);if(o&&!S(o))return o;try{if(o=document.querySelector(e),o&&!S(o))return o}catch{}try{if(o=document.querySelector(`#${a}, [name="${a}"], [value="${a}"]`),o&&!S(o))return o}catch{}try{let n=e.replace(/"/g,""),s=`//*[normalize-space(.)="${n}"] | //*[@aria-label="${n}"] | //*[@data-category="${n}"] | //*[@data-testid="${n}"]`,l=document.evaluate(s,document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);if(l.singleNodeValue){let d=l.singleNodeValue;if(!S(d))return d.closest('[data-role="dropzone"], [class*="category" i], [class*="bucket" i], [class*="column" i], [class*="drop" i]')||d}}catch{}let i=y(e).toLowerCase(),r=Array.from(document.querySelectorAll('button, a, div, span, li, p, label, input, [draggable="true"], [data-testid], [class*="option" i], [class*="card" i], [class*="item" i], [class*="choice" i], [class*="category" i], [class*="bucket" i]'));for(let n of r){if(!E(n)||S(n))continue;let s=y(n.textContent).toLowerCase(),l=y(n.getAttribute("aria-label")||"").toLowerCase(),d=y(n.getAttribute("data-category")||"").toLowerCase(),c=n instanceof HTMLInputElement||n instanceof HTMLButtonElement?n.value:"",h=y(c).toLowerCase(),p=s.startsWith(i+")")||s.startsWith(i+".")||s.startsWith(i+" -")||s.startsWith(i+":");if(s===i||l===i||d&&d===i||h&&h===i||p){let m=n.closest('[data-role="dropzone"], [class*="category" i], [class*="bucket" i], [class*="column" i], [class*="drop" i]'),u=n.closest('button, a, [role="button"], [role="radio"], [role="checkbox"], [draggable="true"], [class*="card" i], [class*="option" i], [class*="item" i], label, li');return m||u||n}}if(i.length>=3)for(let n of r){if(!E(n)||S(n))continue;let s=y(n.textContent).toLowerCase(),l=y(n.getAttribute("aria-label")||"").toLowerCase();if(s.includes(i)||l.includes(i)||i.length>8&&s&&i.includes(s)){let c=n.closest('[data-role="dropzone"], [class*="category" i], [class*="bucket" i], [class*="column" i], [class*="drop" i]'),h=n.closest('button, a, [role="button"], [role="radio"], [role="checkbox"], [draggable="true"], [class*="card" i], [class*="option" i], [class*="item" i], label, li');return c||h||n}let d=i.split(" ").filter(c=>c.length>2);if(d.length>=3){let c=d.slice(0,Math.min(4,d.length)).join(" ");if(s.includes(c)||l.includes(c))return n.closest('button, a, [role="button"], [role="radio"], [role="checkbox"], [draggable="true"], [class*="card" i], [class*="option" i], [class*="item" i], label, li')||n}}return null}function B(t,e){for(let a of e)t.dispatchEvent(new Event(a,{bubbles:!0,composed:!0}))}function q(t,e){if(!t)return;try{t.scrollIntoView({block:"center",inline:"center",behavior:"instant"})}catch{}let a=0,o=0;if(e&&e.length===2)a=e[0],o=e[1];else{let s=t.getBoundingClientRect();a=Math.round(s.left+Math.max(1,s.width/2)),o=Math.round(s.top+Math.max(1,s.height/2))}try{t.focus?.()}catch{}let i={bubbles:!0,cancelable:!0,composed:!0,view:window,clientX:a,clientY:o,screenX:a,screenY:o};try{t.dispatchEvent(new PointerEvent("pointerdown",{...i,isPrimary:!0,pointerId:1,pointerType:"mouse",width:1,height:1,pressure:.5,button:0,buttons:1}))}catch{}t.dispatchEvent(new MouseEvent("mousedown",{...i,button:0,buttons:1}));try{t.dispatchEvent(new PointerEvent("pointerup",{...i,isPrimary:!0,pointerId:1,pointerType:"mouse",width:1,height:1,pressure:.5,button:0,buttons:0}))}catch{}t.dispatchEvent(new MouseEvent("mouseup",{...i,button:0,buttons:0})),t.dispatchEvent(new MouseEvent("click",{...i,button:0,buttons:0}));try{let s=new Touch({identifier:Date.now(),target:t,clientX:a,clientY:o,screenX:a,screenY:o,pageX:a+(window.scrollX||0),pageY:o+(window.scrollY||0)});t.dispatchEvent(new TouchEvent("touchstart",{bubbles:!0,cancelable:!0,composed:!0,touches:[s],targetTouches:[s]})),t.dispatchEvent(new TouchEvent("touchend",{bubbles:!0,cancelable:!0,composed:!0,touches:[],targetTouches:[]}))}catch{}try{t.click()}catch{}let r=t.closest('button, a, [role="button"], [role="radio"], [role="checkbox"], label');if(r&&r!==t)try{r.click()}catch{}let n=t.querySelector('input[type="radio"], input[type="checkbox"]');if(n&&n!==t)try{n.click()}catch{}}function Ae(t,e){if(t instanceof HTMLInputElement||t instanceof HTMLTextAreaElement){try{let i=t._valueTracker;i&&i.setValue("")}catch{}let a=t instanceof HTMLTextAreaElement?HTMLTextAreaElement.prototype:HTMLInputElement.prototype,o=Object.getOwnPropertyDescriptor(a,"value")?.set;o?o.call(t,e):t.value=e,B(t,["input","change","blur"]);return}if(t.isContentEditable){t.textContent=e,B(t,["input","change","blur"]);return}throw new Error(`N\xE3o \xE9 poss\xEDvel injetar texto em <${t.tagName.toLowerCase()}>`)}function pe(t,e){let a=t instanceof HTMLInputElement&&["checkbox","radio"].includes(t.type)?t:t.querySelector('input[type="checkbox"], input[type="radio"]');if(a&&["checkbox","radio"].includes(a.type)){a.checked=e;try{let r=a._valueTracker;r&&r.setValue(!e)}catch{}try{Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"checked")?.set?.call(a,e)}catch{}try{a.click()}catch{}a.checked=e;let i=a.closest('.option-card, label, [role="radio"], [role="checkbox"]');i&&(i.setAttribute("aria-checked",e?"true":"false"),i.classList.toggle("selected",e),i.classList.toggle("active",e)),B(a,["input","change"]);return}let o=t.getAttribute("role");if(o==="radio"||o==="checkbox"){t.setAttribute("aria-checked",e?"true":"false"),t.classList.toggle("selected",e),t.classList.toggle("active",e),B(t,["input","change"]),q(t);return}q(t)}function Ke(t,e){if(t instanceof HTMLSelectElement){for(let a of Array.from(t.options))a.selected=e.includes(a.value);B(t,["input","change"]);return}throw new Error("Elemento n\xE3o \xE9 select.")}function Xe(t,e){try{let a=new DataTransfer;try{a.setData("text/plain",t)}catch{}try{a.setData("text/html",e)}catch{}return a}catch{return null}}async function ue(t,e,a=1){try{t.scrollIntoView({block:"center",inline:"center",behavior:"instant"})}catch{}let o=t.getBoundingClientRect(),i=e.getBoundingClientRect(),r=Math.round(o.left+Math.max(1,o.width/2)),n=Math.round(o.top+Math.max(1,o.height/2)),s=Math.round(i.left+Math.max(1,i.width/2)),l=Math.round(i.top+Math.max(1,i.height/2)),d=y(e.textContent).toLowerCase();if(d){let x=Array.from(t.querySelectorAll('button, [role="button"], input[type="radio"], input[type="checkbox"], option, .btn, [class*="tag" i]')).find(v=>{let f=y(v.textContent).toLowerCase(),k=v instanceof HTMLInputElement||v instanceof HTMLOptionElement?y(v.value).toLowerCase():"";return f&&(d.includes(f)||f.includes(d))||k&&(d.includes(k)||k.includes(d))});x&&(q(x),await new Promise(v=>setTimeout(v,120)))}q(t,[r,n]),await new Promise(u=>setTimeout(u,140)),q(e,[s,l]);let c=e.querySelector('[data-role="dropzone"], [class*="bucket" i], [class*="slot" i], [class*="drop" i], [class*="target" i], [class*="items" i], ul, ol');c&&c!==e&&q(c),await new Promise(u=>setTimeout(u,100));let h={bubbles:!0,cancelable:!0,composed:!0,view:window,clientX:r,clientY:n,screenX:r,screenY:n,button:0,buttons:1};try{t.dispatchEvent(new PointerEvent("pointerdown",{...h,isPrimary:!0,pointerId:1,pointerType:"mouse",pressure:.5}))}catch{}t.dispatchEvent(new MouseEvent("mousedown",h));let p=4;for(let u=1;u<=p;u++){let x=Math.round(r+(s-r)*(u/p)),v=Math.round(n+(l-n)*(u/p)),f={...h,clientX:x,clientY:v,screenX:x,screenY:v};try{t.dispatchEvent(new PointerEvent("pointermove",{...f,isPrimary:!0,pointerId:1,pointerType:"mouse",pressure:.5}))}catch{}document.dispatchEvent(new MouseEvent("mousemove",f))}let m={bubbles:!0,cancelable:!0,composed:!0,view:window,clientX:s,clientY:l,screenX:s,screenY:l,button:0,buttons:0};try{e.dispatchEvent(new PointerEvent("pointerup",{...m,isPrimary:!0,pointerId:1,pointerType:"mouse",pressure:0}))}catch{}e.dispatchEvent(new MouseEvent("mouseup",m)),e.dispatchEvent(new MouseEvent("click",m));try{let u=Xe(w(t.textContent),t.outerHTML),x={...h},v={...m};u&&(x.dataTransfer=u,v.dataTransfer=u),t.dispatchEvent(new DragEvent("dragstart",x)),e.dispatchEvent(new DragEvent("dragenter",v)),e.dispatchEvent(new DragEvent("dragover",v)),e.dispatchEvent(new DragEvent("drop",v)),t.dispatchEvent(new DragEvent("dragend",x))}catch(u){console.warn("[EasyQuiz] DragEvent ignorado com seguran\xE7a:",u)}try{let u=new Touch({identifier:1,target:t,clientX:r,clientY:n}),x=new Touch({identifier:1,target:e,clientX:s,clientY:l});t.dispatchEvent(new TouchEvent("touchstart",{bubbles:!0,cancelable:!0,touches:[u]})),e.dispatchEvent(new TouchEvent("touchmove",{bubbles:!0,cancelable:!0,touches:[x]})),e.dispatchEvent(new TouchEvent("touchend",{bubbles:!0,cancelable:!0,touches:[]}))}catch{}if(a>=2&&!e.contains(t))try{t.focus?.(),t.dispatchEvent(new KeyboardEvent("keydown",{key:" ",code:"Space",bubbles:!0})),t.dispatchEvent(new KeyboardEvent("keyup",{key:" ",code:"Space",bubbles:!0})),await new Promise(u=>setTimeout(u,80)),e.focus?.(),e.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",bubbles:!0})),e.dispatchEvent(new KeyboardEvent("keyup",{key:"Enter",code:"Enter",bubbles:!0}))}catch{}}var Le={fill:(t,e)=>{let a=b(t);a?Ae(a,e):console.warn(`$eq.fill: Elemento '${t}' n\xE3o encontrado`)},click:t=>{let e=b(t);e?q(e):console.warn(`$eq.click: Elemento '${t}' n\xE3o encontrado`)},check:(t,e)=>{let a=b(t);a?pe(a,e):console.warn(`$eq.check: Elemento '${t}' n\xE3o encontrado`)},drag:(t,e)=>{let a=b(t),o=b(e);a&&o?ue(a,o):console.warn(`$eq.drag: Origem ou destino n\xE3o encontrado ('${t}' -> '${e}')`)},categorize:async(t,e)=>{let a=b(t),o=b(e);if(!a||!o){console.warn(`$eq.categorize: Item ou categoria n\xE3o encontrados ('${t}' -> '${e}')`);return}await ue(a,o)}};window.$eq=Le;async function Je(t,e=1){if(t.t==="js"){let i=String(t.v||"");try{new Function("$eq","document","window",i)(Le,document,window)}catch(r){console.warn("[EasyQuiz JS Execution]",r)}return}if(t.t==="drag"){let i=b(t.from),r=b(t.to);!i&&t.from&&(i=b(y(t.from))),!r&&t.to&&(r=b(y(t.to))),i&&r?await ue(i,r,e):console.warn(`[EasyQuiz] Drag: alvo n\xE3o encontrado ('${t.from}' -> '${t.to}')`);return}let a=t.id||"",o=b(a);if(!o&&a&&(o=b(y(a))),!o&&t.t!=="adv"){console.warn(`[EasyQuiz] Alvo '${a}' n\xE3o encontrado para a\xE7\xE3o '${t.t}'. Prosseguindo...`);return}switch(t.t){case"val":o&&Ae(o,String(t.v));break;case"chk":o&&pe(o,!!t.c);break;case"sel":if(o){let r=Array.isArray(t.v)?t.v:[String(t.v)];Ke(o,r)}break;case"clk":if(o){let r=o instanceof HTMLInputElement&&["checkbox","radio"].includes(o.type)?o:o.querySelector('input[type="radio"], input[type="checkbox"]');r?pe(r,!0):q(o,t.co)}break;case"adv":let i=Y(t.id);if(i){await he(i,1200);let r=t.id||i.textContent?.trim()||"";r&&ne(window.location.hostname,{advanceSelector:r}),q(i)}else console.warn("[EasyQuiz] Bot\xE3o de avan\xE7o n\xE3o localizado.");break}}function We(){let t=["button","a",'[role="button"]','input[type="submit"]','input[type="button"]','[data-testid*="check" i]','[data-test-id*="check" i]'].join(",");return Array.from(document.querySelectorAll(t)).find(a=>{if(!E(a)||S(a)||a.closest("header, nav, aside"))return!1;let o=a instanceof HTMLInputElement||a instanceof HTMLButtonElement?a.value:"",i=(a.textContent||o||a.getAttribute("aria-label")||"").trim();return/(verificar|checar|check|conferir|validar|enviar|responder)/i.test(i)})||null}function Y(t){if(t){let r=b(t);if(r&&E(r)&&!S(r))return r}try{let r=R(window.location.hostname);if(r.advanceSelector){let n=b(r.advanceSelector);if(n&&E(n)&&!S(n))return n}}catch{}let e=["button","a",'[role="button"]','[role="link"]','input[type="button"]','input[type="submit"]','[data-testid*="next" i]','[data-testid*="continue" i]','[data-testid*="check" i]','[data-test-id*="next" i]','[data-test-id*="continue" i]','[data-test-id*="check" i]','[class*="next" i]','[class*="continue" i]','[class*="proximo" i]','[class*="avancar" i]'].join(","),o=Array.from(document.querySelectorAll(e)).filter(r=>E(r)&&!S(r)&&!r.closest("header, nav, aside"));for(let r of o)if($(r))return r;for(let r of o){let n=r instanceof HTMLInputElement||r instanceof HTMLButtonElement?r.value:"",s=(r.textContent||n||r.getAttribute("aria-label")||"").trim();if(U.test(s))return r}let i=document.querySelector('[data-test-id*="next" i], [data-testid*="next" i], [aria-label*="next" i], [aria-label*="pr\xF3xim" i], [aria-label*="avan\xE7ar" i], [aria-label*="continuar" i]');return i&&E(i)&&!S(i)?i:null}async function he(t,e=1500){let a=Date.now();for(;Date.now()-a<e;){if(!(t.disabled===!0||t.getAttribute("aria-disabled")==="true"||t.classList.contains("disabled")||t.getAttribute("disabled")!==null))return;await new Promise(i=>setTimeout(i,100))}try{t.removeAttribute("disabled"),t.removeAttribute("aria-disabled"),t.classList.remove("disabled"),t.disabled=!1}catch{}}function Ze(t){try{if(t.t==="val"){let e=b(t.id)||b(y(t.id));if(!e)return!1;let a=(e.value??e.textContent??"").trim(),o=String(t.v??"").trim();if(!a&&!o)return!0;if(!a&&o)return!1;let i=a.replace(",",".").toLowerCase(),r=o.replace(",",".").toLowerCase();return i===r||i.includes(r)||a.toLowerCase()===o.toLowerCase()}if(t.t==="chk"){let e=b(t.id)||b(y(t.id));if(!e)return!1;let a=e instanceof HTMLInputElement&&["checkbox","radio"].includes(e.type)?e:e.querySelector('input[type="checkbox"], input[type="radio"]');return a?a.checked===!!t.c:e.getAttribute("aria-checked")==="true"===!!t.c}if(t.t==="sel"){let e=b(t.id)||b(y(t.id));if(!e||!(e instanceof HTMLSelectElement))return!1;let a=Array.isArray(t.v)?t.v:[String(t.v)];return Array.from(e.options).some(o=>o.selected&&a.includes(o.value))}if(t.t==="clk"){let e=b(t.id)||b(y(t.id));if(!e)return!1;let a=e instanceof HTMLInputElement&&["checkbox","radio"].includes(e.type)?e:e.querySelector('input[type="radio"], input[type="checkbox"]');if(a)return a.checked;let o=e.getAttribute("aria-checked")==="true"||e.getAttribute("aria-selected")==="true",i=/active|selected|checked|picked/i.test(e.className||"");return o||i||!0}if(t.t==="drag"){let e=b(t.from)||b(y(t.from)),a=b(t.to)||b(y(t.to));return!e||!a?!1:a.contains(e)?!0:/placed|dropped|assigned|matched|done|selected/i.test(e.className||"")||e.getAttribute("data-placed")==="true"}}catch{}return!1}async function He(t,e,a=1){let o=t.actions.filter(c=>c.t!=="adv"),i=t.actions.filter(c=>c.t==="adv"),r=0;for(let c of o){try{await Je(c,a),r++}catch(h){console.warn("[EasyQuiz] A\xE7\xE3o declarativa falhou com seguran\xE7a:",c,h)}c.t==="drag"&&await new Promise(h=>setTimeout(h,250))}await new Promise(c=>setTimeout(c,o.length>0?300:50));let n=0;for(let c of o)Ze(c)&&n++;let s=t.pageType==="question",l=!s||o.length===0?!0:r>0&&n>0&&n>=Math.ceil(o.length*.35),d=!1;if((e||a>=2)&&(l||!s)){if(await new Promise(p=>setTimeout(p,o.length>0?500:200)),t.pageType!=="info"){let p=We();p&&E(p)&&(await he(p,1200),q(p),await new Promise(m=>setTimeout(m,800)))}let c=i.length>0?i[0].id:void 0,h=Y(c);if(h){await he(h,1200);let p=c||h.textContent?.trim()||"";p&&ne(window.location.hostname,{advanceSelector:p}),q(h),d=!0}else console.warn("[EasyQuiz] Nenhum bot\xE3o de avan\xE7o encontrado na p\xE1gina.")}return{applied:r,verified:n,success:l,advanced:d}}var N=null,D=[];function _(){N&&(N.style.removeProperty("outline"),N.style.removeProperty("outline-offset"),N=null);for(let t of D)t.style.removeProperty("outline"),t.style.removeProperty("outline-offset"),t.style.removeProperty("background-color");D=[]}function me(t){_(),N=t,t.style.outline="2px solid #00e5ff",t.style.outlineOffset="4px"}function ze(t){for(let e of t){if(e.t==="adv"||e.t==="js")continue;if(e.t==="drag"){try{let r=document.querySelector(`[data-easyquiz-id="${CSS.escape(e.from)}"]`)||document.querySelector(e.from),n=document.querySelector(`[data-easyquiz-id="${CSS.escape(e.to)}"]`)||document.querySelector(e.to);r&&(r.style.outline="2px solid #00ff88",D.push(r)),n&&(n.style.outline="2px dashed #00e5ff",D.push(n))}catch{}continue}if(!e.id)continue;let a=CSS.escape(e.id),o=document.querySelector(`[data-easyquiz-id="${a}"]`);if(!o)continue;let i=o.closest('label, [role="listitem"], .answer, .form-check')||o;i.style.outline="2px solid #00ff88",i.style.outlineOffset="2px",i.style.backgroundColor="rgba(0, 255, 136, 0.08)",D.push(i)}}var V=4,et=1200,ge=12e5;function K(t){return new Promise((e,a)=>{let o=new FileReader;o.onerror=()=>a(new Error("Falha ao converter blob para base64.")),o.onload=()=>{let i=String(o.result||"");e(i.split(",")[1]||"")},o.readAsDataURL(t)})}async function X(t){let e=0,a=0;if(t instanceof HTMLImageElement?(e=t.naturalWidth||t.width,a=t.naturalHeight||t.height):(e=t.width,a=t.height),e<=0||a<=0)throw new Error("Dimens\xF5es inv\xE1lidas.");let o=Math.min(1,et/Math.max(e,a)),i=Math.max(1,Math.round(e*o)),r=Math.max(1,Math.round(a*o)),n=document.createElement("canvas");n.width=i,n.height=r;let s=n.getContext("2d",{alpha:!1});if(!s)throw new Error("Sem suporte a Canvas 2D.");return s.fillStyle="#ffffff",s.fillRect(0,0,i,r),s.drawImage(t,0,0,i,r),new Promise((l,d)=>{n.toBlob(c=>c?l(c):d(new Error("Falha compress\xE3o.")),"image/jpeg",.8)})}async function Ie(t){try{let e=t.cloneNode(!0),a=t.offsetWidth||500,o=t.offsetHeight||500,i=`
      <svg xmlns="http://www.w3.org/2000/svg" width="${a}" height="${o}">
        <foreignObject width="100%" height="100%">
          <div xmlns="http://www.w3.org/1999/xhtml" style="background:#fff;font-family:sans-serif;">
            ${e.innerHTML}
          </div>
        </foreignObject>
      </svg>
    `,r=new Blob([i],{type:"image/svg+xml;charset=utf-8"}),n=URL.createObjectURL(r),s=new Image;s.crossOrigin="anonymous",await new Promise((c,h)=>{s.onload=c,s.onerror=h,s.src=n});let l=await X(s),d=await K(l);if(URL.revokeObjectURL(n),d&&d.length<=ge)return{mediaType:"image/jpeg",base64:d,alt:"Captura Suprema via rasteriza\xE7\xE3o DOM",source:"rasterized"}}catch(e){console.warn("Falha na rasteriza\xE7\xE3o suprema:",e)}return null}async function tt(t){let e=t.currentSrc||t.src;if(!e)return null;let a=(t.alt||t.getAttribute("aria-label")||"Imagem da quest\xE3o").slice(0,500);if(t.complete&&t.naturalWidth>0)try{let o=await X(t),i=await K(o);if(i&&i.length<=ge)return{mediaType:"image/jpeg",base64:i,alt:a,source:e.slice(0,2e3)}}catch{}try{let o=await fetch(e,{mode:"cors"});if(o.ok){let i=await o.blob();if(i.type.startsWith("image/")){let r=await createImageBitmap(i),n=await X(r);r.close();let s=await K(n);if(s&&s.length<=ge)return{mediaType:"image/jpeg",base64:s,alt:a,source:e.slice(0,2e3)}}}}catch{return Ie(t.parentElement||t)}return null}async function fe(t,e=!0){if(!e)return[];let a=[],o=0,i=Array.from(t.querySelectorAll("img")).filter(E).slice(0,V);for(let r of i)try{let n=await tt(r);if(n&&o+n.base64.length<=25e5&&(a.push(n),o+=n.base64.length,a.length>=V))break}catch{}if(a.length<V){let r=Array.from(t.querySelectorAll("canvas")).filter(E).slice(0,V);for(let n of r)try{let s=await X(n),l=await K(s);if(l&&o+l.length<=25e5&&(a.push({mediaType:"image/jpeg",base64:l,alt:"Canvas inline",source:"canvas"}),o+=l.length,a.length>=V))break}catch{let s=await Ie(n.parentElement||n);s&&(a.push(s),o+=s.base64.length)}}return a}var J=class{active=!1;timer=null;callbacks;lastRunTime=0;lastActionTime=0;isProcessing=!1;constructor(e){this.callbacks=e}isActive(){return this.active}start(){this.active||(this.active=!0,this.lastActionTime=Date.now(),this.callbacks.onStatusChange("waiting","> [SYS] Autopilot ENGAGED. Monitorando..."),this.loop())}stop(){this.active=!1,this.timer&&clearTimeout(this.timer),this.callbacks.onStatusChange("idle","> [SYS] Autopilot DESATIVADO.")}errorCount=0;lastPageSig="";samePageCount=0;async loop(){if(!this.active)return;let e=Date.now();if(e-this.lastRunTime<2500||this.isProcessing){this.timer=window.setTimeout(()=>this.loop(),500);return}this.lastRunTime=e;try{this.isProcessing=!0;let a=O(!1);if(a||(a=I()),a){let o=`${a.pageTitle}_${a.questionText.slice(0,80)}_${a.controls.length}`;if(o===this.lastPageSig)this.samePageCount++;else{let n=this.samePageCount>1;this.lastPageSig=o,this.samePageCount=1,n&&(this.callbacks.onStatusChange("waiting","> [SYS] Avan\xE7o de p\xE1gina detectado! Retomando monitoramento autom\xE1tico...","text-green"),this.callbacks.onPageAdvance?.())}if(this.callbacks.isManualModeActive?.()){this.callbacks.onStatusChange("waiting","> [SYS] Gabarito manual ativo na tela. Aguardando voc\xEA posicionar as respostas e avan\xE7ar a p\xE1gina...","text-yellow"),this.lastRunTime=Date.now();return}if(this.samePageCount>1&&(this.callbacks.onStatusChange("waiting",`> [AUTOPILOT] Resolu\xE7\xE3o pendente (${this.samePageCount}\xAA verifica\xE7\xE3o). Conclua e avance para prosseguir...`,"text-yellow"),await new Promise(n=>setTimeout(n,4e3))),this.samePageCount>=4){let n=Y();if(n){this.callbacks.onStatusChange("advancing","> [SYS] For\xE7ando acionamento de bot\xE3o de avan\xE7o para desbloquear quest\xE3o...","text-yellow"),q(n),this.samePageCount=0,await new Promise(s=>setTimeout(s,2e3));return}}let i=a.controls.filter(n=>n.role==="answer"),r=R(window.location.hostname);if(i.length>0){this.callbacks.onStatusChange("analyzing","> [IA] Quest\xE3o/Exerc\xEDcio detectado. Consultando IA...","text-blue"),await new Promise(s=>setTimeout(s,600));let n=await this.callbacks.onRequestAnalysis(this.samePageCount);if(n){if(this.callbacks.onStatusChange("analyzing",`> [IA] (${n.usedModel||"gemini"}) Confian\xE7a: ${(n.confidence*100).toFixed(1)}% | Modo: ${n.mode}`,"text-blue"),this.callbacks.onStatusChange("analyzing",`> [IA] Racioc\xEDnio: ${n.rationale}`,"text-blue"),this.callbacks.onStatusChange("analyzing",`> [IA] A\xE7\xF5es geradas: ${n.actions.length}`,"text-blue"),this.errorCount=0,n.memoryToStore&&this.callbacks.onStatusChange("analyzing",`> [IA] \u{1F9E0} Mem\xF3ria RAG salva: "${n.memoryToStore}"`,"text-yellow"),n.pageType==="conclusion"){this.callbacks.onStatusChange("idle","> [SYS] Atividade conclu\xEDda! Desligando Autopilot.","text-green"),this.stop();return}}else{this.errorCount++;let s=this.errorCount===1?5e3:8e3;this.callbacks.onStatusChange("waiting",`> [AVISO] Falha na an\xE1lise (${this.errorCount}/3). Aguardando ${s/1e3}s para estabiliza\xE7\xE3o antes de tentar novamente...`,"text-yellow"),await new Promise(l=>setTimeout(l,s))}this.lastActionTime=Date.now()}else if(r.advanceSelector&&b(r.advanceSelector)&&a.questionText.length<50){let n=b(r.advanceSelector);n&&(this.callbacks.onStatusChange("advancing",`> [BRUTE] Avan\xE7ando via cache "${r.advanceSelector}"...`),await new Promise(s=>setTimeout(s,1e3)),q(n),this.lastActionTime=Date.now(),this.errorCount=0)}else{this.callbacks.onStatusChange("analyzing","> [IA] P\xE1gina informativa/contexto detectada. Lendo e consultando IA...","text-blue"),await new Promise(s=>setTimeout(s,600));let n=await this.callbacks.onRequestAnalysis(this.samePageCount);if(n){if(this.callbacks.onStatusChange("analyzing",`> [IA] (${n.usedModel||"gemini"}) Tipo: ${n.pageType} | Modo: ${n.mode}`,"text-blue"),this.callbacks.onStatusChange("analyzing",`> [IA] Racioc\xEDnio: ${n.rationale}`,"text-blue"),n.memoryToStore&&this.callbacks.onStatusChange("analyzing",`> [IA] \u{1F9E0} Conte\xFAdo absorvido na mem\xF3ria: "${n.memoryToStore}"`,"text-yellow"),n.pageType==="info")this.callbacks.onStatusChange("advancing","> [IA] \u{1F4D6} Leitura conclu\xEDda. Avan\xE7ando automaticamente...","text-green"),await new Promise(s=>setTimeout(s,1800));else if(n.pageType==="start")this.callbacks.onStatusChange("advancing","> [SYS] In\xEDcio de m\xF3dulo detectado. Iniciando...","text-blue"),await new Promise(s=>setTimeout(s,1800));else if(n.pageType==="conclusion"){this.callbacks.onStatusChange("idle","> [SYS] Atividade conclu\xEDda! Desligando Autopilot.","text-green"),this.stop();return}this.errorCount=0}else{this.errorCount++;let s=this.errorCount===1?5e3:8e3;this.callbacks.onStatusChange("waiting",`> [AVISO] Falha ao processar p\xE1gina (${this.errorCount}/3). Aguardando ${s/1e3}s para estabiliza\xE7\xE3o antes de tentar novamente...`,"text-yellow"),await new Promise(l=>setTimeout(l,s))}this.lastActionTime=Date.now()}if(this.errorCount>=3){this.callbacks.onStatusChange("error","> [ERRO] 3 falhas consecutivas. Abortando Autopilot para poupar sua cota e tokens.","text-red"),this.callbacks.onStatusChange("waiting","> [DICA] Verifique a mensagem vermelha de [ERRO DETALHADO] no console acima para saber o motivo exato.","text-yellow"),this.stop();return}}else this.callbacks.onStatusChange("waiting","> [SYS] Monitorando p\xE1gina... Aguardando carregamento dos elementos.")}catch(a){let o=a instanceof Error?a.message:String(a);console.warn("[EasyQuiz Autopilot]",a),this.callbacks.onStatusChange("error",`> [ERRO NO AUTOPILOT] ${o}`,"text-red")}finally{this.isProcessing=!1}this.active&&(this.timer=window.setTimeout(()=>this.loop(),1e3))}};var g={logo:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.8L19.2 8 12 11.2 4.8 8 12 4.8zM4 9.6l7 3.1v7.5l-7-3.5V9.6zm9 10.6v-7.5l7-3.1v7.1l-7 3.5z"/></svg>',rocket:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M13.13 2.81a.5.5 0 0 0-.46-.07c-.42.15-2.08.79-3.9 2.61-2.04 2.04-2.6 4.09-2.73 4.96l-.97.98a1 1 0 0 0-.29.71v2.12a1 1 0 0 0 .29.71l2.83 2.83a1 1 0 0 0 .71.29h2.12a1 1 0 0 0 .71-.29l.98-.97c.87-.13 2.92-.69 4.96-2.73 1.82-1.82 2.46-3.48 2.61-3.9a.5.5 0 0 0-.07-.46l-6.79-6.79zM4.5 16.5l-2.09 2.09a.5.5 0 0 0 .35.85h3.04l.35.35v3.04a.5.5 0 0 0 .85.35L9.09 21.1l-4.59-4.6z"/></svg>',play:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>',stop:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h12v12H6z"/></svg>',code:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>',terminal:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8h16v10zm-12-3l3-3-3-3 1.4-1.4L13.8 12l-4.4 4.4L8 15zm6 0h4v2h-4v-2z"/></svg>',inspector:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>',settings:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.49.49 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>',key:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M7 14c-2.76 0-5-2.24-5-5s2.24-5 5-5c2.42 0 4.44 1.72 4.9 4H22v4h-2v3h-3v-3h-2v3h-3v-3h-2.1c-.46 2.28-2.48 4-4.9 4zm0-7c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>',paste:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 2h-4.18C14.4 .84 13.3 0 12 0c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm7 18H5V4h2v3h10V4h2v16z"/></svg>',edit:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>',trash:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>',eraser:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M15.14 3c-.51 0-1.02.2-1.41.59L2.59 14.73c-.78.78-.78 2.05 0 2.83L6.44 21.4c.78.78 2.05.78 2.83 0l11.14-11.14c.78-.78.78-2.05 0-2.83l-3.86-3.84c-.39-.39-.9-.59-1.41-.59zm.71 2.71l3.15 3.15-3.15 3.15-3.15-3.15 3.15-3.15zm-4.57 4.57l3.15 3.15-4.57 4.57H6.71l-3-3 7.57-7.57z"/></svg>',save:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/></svg>',analyze:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L3 14h8l-2 8 12-12h-8l2-8z"/></svg>',apply:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>',close:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>',chevronRight:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>',chevronLeft:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>',eye:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>',eyeOff:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.44-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.17c0-1.66-1.34-3-3-3l-.17.02z"/></svg>',check:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>',clock:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>',copy:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>',refresh:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg>',chip:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4h12v16H6V4zm2 2v12h8V6H8zm-4 3h2v2H4V9zm0 4h2v2H4v-2zm16-4h2v2h-2V9zm0 4h2v2h-2v-2zM9 2h2v2H9V2zm4 0h2v2h-2V2zm-4 18h2v2H9v-2zm4 0h2v2h-2v-2z"/></svg>',moreVertical:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>',minimize:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M19 13H5v-2h14v2z"/></svg>',maximize:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/></svg>',dragHandle:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M10 9h4V6h-4v3zm0 5h4v-3h-4v3zm0 5h4v-3h-4v3zM4 9h4V6H4v3zm0 5h4v-3H4v3zm0 5h4v-3H4v3zm12-10V6h4v3h-4zm0 5h4v-3h-4v3zm0 5h4v-3h-4v3z"/></svg>',list:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/></svg>'};var W=class{element=null;shadow;isMinimized=!1;currentPlan=null;isDragging=!1;dragStartX=0;dragStartY=0;initialLeft=25;initialTop=25;onAdvanceCallback;constructor(e,a){this.shadow=e,this.onAdvanceCallback=a,this.initGlobalListeners()}initGlobalListeners(){window.addEventListener("popstate",()=>this.handlePageNavigated()),window.addEventListener("hashchange",()=>this.handlePageNavigated()),document.addEventListener("click",e=>{if(!this.isOpen())return;let a=e.target;if(!a||this.shadow.contains(a)||a.closest("#easyquiz-shadow-root"))return;let o=a.closest('button, [role="button"], a, input[type="submit"]');if(o){let i=(o.textContent||o.value||"").toLowerCase();/pr[oó]xim|avan[cç]|continu|verific|enviar|submit|confirm|checar|validar|next/i.test(i)&&setTimeout(()=>{this.isOpen()&&this.handlePageNavigated()},800)}},!0)}handlePageNavigated(){this.isOpen()&&(this.hide(),this.onAdvanceCallback?.())}isOpen(){return this.element!==null&&this.element.style.display!=="none"}show(e){this.currentPlan=e,this.element||this.createElement(),this.renderContent(),this.element&&(this.element.style.display="flex")}hide(){this.element&&(this.element.style.display="none")}minimize(){this.isMinimized=!0,this.element&&this.element.classList.add("minimized")}restore(){this.isMinimized=!1,this.element&&this.element.classList.remove("minimized")}createElement(){this.element=document.createElement("div"),this.element.className="eq-floating-hud",this.element.style.left=`${this.initialLeft}px`,this.element.style.top=`${this.initialTop}px`,this.element.innerHTML=`
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
    `,this.shadow.appendChild(this.element),this.element.querySelector("#eq-fah-pill").addEventListener("click",()=>this.restore()),this.element.querySelector("#eq-fah-min-btn").addEventListener("click",()=>this.minimize()),this.element.querySelector("#eq-fah-close-btn").addEventListener("click",()=>this.hide());let i=this.element.querySelector("#eq-fah-copy-md-btn");i.addEventListener("click",()=>this.copyMarkdownToClipboard(i));let r=this.element.querySelector("#eq-fah-copy-all-btn");r.addEventListener("click",()=>this.copyMarkdownToClipboard(r));let n=this.element.querySelector("#eq-fah-header");this.setupDraggable(n)}setupDraggable(e){let a=o=>{if(o.target.closest(".eq-fah-btn"))return;o.preventDefault(),this.isDragging=!0,this.dragStartX=o.clientX,this.dragStartY=o.clientY;let i=this.element.getBoundingClientRect();this.initialLeft=i.left,this.initialTop=i.top;let r=s=>{if(!this.isDragging||!this.element)return;let l=s.clientX-this.dragStartX,d=s.clientY-this.dragStartY,c=Math.max(10,window.innerWidth-this.element.offsetWidth-10),h=Math.max(10,window.innerHeight-this.element.offsetHeight-10),p=Math.min(Math.max(10,this.initialLeft+l),c),m=Math.min(Math.max(10,this.initialTop+d),h);this.element.style.left=`${p}px`,this.element.style.top=`${m}px`},n=()=>{this.isDragging=!1,window.removeEventListener("mousemove",r),window.removeEventListener("mouseup",n)};window.addEventListener("mousemove",r),window.addEventListener("mouseup",n)};e.addEventListener("mousedown",a)}renderContent(){if(!this.element||!this.currentPlan)return;let e=this.element.querySelector("#eq-fah-body"),a=this.element.querySelector("#eq-fah-pill-text"),o=this.element.querySelector("#eq-fah-pill-badge");e.innerHTML="";let i=this.currentPlan,r=i.actions.filter(c=>c.t==="drag"),n=i.actions.filter(c=>c.t==="val"),s=i.actions.filter(c=>c.t==="clk"||c.t==="chk"),l=r.length||n.length||s.length,d=document.createElement("div");if(d.className="eq-fah-meta",d.innerHTML=`
      <span>Modo: <strong style="color:#ffffff;">${i.mode.replace("_"," ")}</strong></span>
      <span class="eq-fah-meta-badge">${Math.round(i.confidence*100)}% Confian\xE7a</span>
    `,e.appendChild(d),r.length>0||i.mode==="categorizacao"||i.mode==="arrastar_soltar"){a.textContent=`Categoriza\xE7\xE3o (${r.length} itens)`,o.textContent=String(r.length);let c={};for(let h of r){let p=y(h.to)||"Geral";c[p]||(c[p]=[]),c[p].push(y(h.from))}for(let[h,p]of Object.entries(c)){let m=document.createElement("div"),u=/fato|true|verdadeiro|sim/i.test(h),x=/opini[aã]o|false|falso|n[aã]o/i.test(h);m.className=`eq-fah-group ${u?"group-fato":x?"group-opiniao":""}`;let v=document.createElement("div");v.className="eq-fah-group-title",v.innerHTML=`<span>\u{1F4C1}</span> <span>${h} (${p.length})</span>`,m.appendChild(v);let f=document.createElement("div");f.className="eq-fah-group-items";for(let k of p){let P=document.createElement("div");P.className="eq-fah-item";let M=document.createElement("span");M.className="eq-fah-item-text",M.textContent=k,P.appendChild(M);let T=document.createElement("button");T.className="eq-fah-copy-inline",T.textContent="Copiar",T.addEventListener("click",()=>{navigator.clipboard.writeText(k),T.textContent="\u2713 Copiado",setTimeout(()=>T.textContent="Copiar",1200)}),P.appendChild(T),f.appendChild(P)}m.appendChild(f),e.appendChild(m)}}else if(n.length>0){a.textContent=`Preenchimento (${n.length} campos)`,o.textContent=String(n.length);let c=document.createElement("div");c.className="eq-fah-group";let h=document.createElement("div");h.className="eq-fah-group-title",h.textContent="Respostas para Inserir:",c.appendChild(h);let p=document.createElement("div");p.className="eq-fah-group-items";for(let m of n){let u=document.createElement("div");u.className="eq-fah-item";let x=document.createElement("span");x.className="eq-fah-item-text";let v=y(m.id);x.innerHTML=`${v?`<strong>${v}:</strong> `:""}<code style="color:#00ffcc; background:rgba(0,255,204,0.1); padding:1px 4px; border-radius:3px;">${m.v}</code>`,u.appendChild(x);let f=document.createElement("button");f.className="eq-fah-copy-inline",f.textContent="Copiar",f.addEventListener("click",()=>{navigator.clipboard.writeText(String(m.v)),f.textContent="\u2713 Copiado",setTimeout(()=>f.textContent="Copiar",1200)}),u.appendChild(f),p.appendChild(u)}c.appendChild(p),e.appendChild(c)}else if(s.length>0){a.textContent=`Op\xE7\xF5es (${s.length} marcadas)`,o.textContent=String(s.length);let c=document.createElement("div");c.className="eq-fah-group";let h=document.createElement("div");h.className="eq-fah-group-title",h.textContent="Alternativa(s) Correta(s):",c.appendChild(h);let p=document.createElement("div");p.className="eq-fah-group-items";for(let m of s){let u=document.createElement("div");u.className="eq-fah-item";let x=document.createElement("span");x.className="eq-fah-item-text";let v=y(m.id);x.innerHTML=`<span style="color:#00ffcc; font-weight:bold; margin-right:4px;">\u2611</span> ${v}`,u.appendChild(x);let f=document.createElement("button");f.className="eq-fah-copy-inline",f.textContent="Copiar",f.addEventListener("click",()=>{navigator.clipboard.writeText(v),f.textContent="\u2713 Copiado",setTimeout(()=>f.textContent="Copiar",1200)}),u.appendChild(f),p.appendChild(u)}c.appendChild(p),e.appendChild(c)}else a.textContent="Gabarito",o.textContent="0",e.innerHTML+='<div style="padding:10px; color:#888;">Nenhuma resposta direta para exibir.</div>';if(i.rationale){let c=document.createElement("div");c.className="eq-fah-rationale",c.innerHTML=`<strong>\u{1F4A1} Racioc\xEDnio da IA:</strong> ${i.rationale}`,e.appendChild(c)}}generateMarkdown(){if(!this.currentPlan)return"";let e=this.currentPlan,a=[];a.push("# Gabarito da Quest\xE3o \u2014 EasyQuiz Pro"),a.push(`- **Modo:** ${e.mode}`),a.push(`- **Confian\xE7a:** ${(e.confidence*100).toFixed(0)}%`),a.push("");let o=e.actions.filter(n=>n.t==="drag"),i=e.actions.filter(n=>n.t==="val"),r=e.actions.filter(n=>n.t==="clk"||n.t==="chk");if(o.length>0){a.push("## \u{1F4C2} Categoriza\xE7\xE3o:");let n={};for(let s of o){let l=y(s.to)||"Geral";n[l]||(n[l]=[]),n[l].push(y(s.from))}for(let[s,l]of Object.entries(n)){a.push(`### Categoria: ${s}`);for(let d of l)a.push(`- ${d}`);a.push("")}}else if(i.length>0){a.push("## \u270F\uFE0F Respostas para Preenchimento:");for(let n of i){let s=y(n.id);a.push(`- **${s||"Campo"}:** \`${n.v}\``)}a.push("")}else if(r.length>0){a.push("## \u2705 Alternativas Corretas:");for(let n of r)a.push(`- [x] ${y(n.id)}`);a.push("")}return e.rationale&&(a.push("---"),a.push(`**\u{1F4A1} Racioc\xEDnio:** ${e.rationale}`)),a.join(`
`)}copyMarkdownToClipboard(e){let a=this.generateMarkdown();a&&navigator.clipboard.writeText(a).then(()=>{let o=e.innerHTML;e.id==="eq-fah-copy-md-btn"?e.innerHTML='<span style="font-size:10px; color:#00ffcc; font-weight:bold;">\u2713</span>':e.innerHTML="\u2713 Copiado!",setTimeout(()=>{e.innerHTML=o},1500)})}};var Pe=`
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
`;var at=[{value:"",label:"Detec\xE7\xE3o Autom\xE1tica"},{value:"escolha_unica",label:"M\xFAltipla Escolha (\xDAnica)"},{value:"escolha_multipla",label:"M\xFAltipla Escolha (V\xE1rias)"},{value:"categorizacao",label:"Categoriza\xE7\xE3o / Grupos"},{value:"arrastar_soltar",label:"Arrastar e Soltar (Drag & Drop)"},{value:"ordenacao",label:"Ordena\xE7\xE3o / Sequ\xEAncia"},{value:"verdadeiro_falso",label:"Verdadeiro / Falso"},{value:"texto_livre",label:"Texto Livre / Dissertativa"},{value:"preenchimento",label:"Preenchimento de Lacunas"}],ot=[{value:"smart",label:"Inteligente (Auto-H\xEDbrido)"},{value:"command",label:"Apenas Comando (Seguro)"},{value:"javascript",label:"Apenas JS Nativo (Avan\xE7ado)"}],Z=class{host;shadow;callbacks;autopilot;floatingAnswers;initialSettings;isCollapsed=!1;activeTab="autopilot";stopwatchInterval=null;stopwatchStartTime=0;latestPlan=null;launcherBtn;launcherDot;dockToggleBtn;sidebarEl;apToggleBtn;apConsole;dotPulseAp;statusTextAp;stopwatchAp;dotPulseAdv;statusTextAdv;stopwatchAdv;inspModel;inspLatency;inspTokens;inspPrompt;inspRationale;inspActions;copyPromptBtn;apiKeyInput;keyContextMenu;keyMoreBtn;modelSelect;modeSelect;engineSelect;dryRunCheckbox;autoApplyCheckbox;autoAdvanceCheckbox;hostDarkModeCheckbox;useVisionCheckbox;analyzeBtn;applyBtn;resultContainer;constructor(e,a){this.initialSettings=e,this.callbacks=a,this.autopilot=new J({onStatusChange:(i,r,n)=>{this.logToConsole(r,n),i==="analyzing"?this.setBusy(!0,"Autopilot: IA analisando..."):(i==="advancing"||i==="waiting")&&this.setBusy(!1)},onRequestAnalysis:async i=>{try{return await this.callbacks.onAnalyze(i)||null}catch{return null}},isManualModeActive:()=>this.floatingAnswers?.isOpen()??!1,onPageAdvance:()=>{this.floatingAnswers?.hide()}}),this.host=document.createElement("div"),this.host.id="easyquiz-shadow-root",this.host.style.position="fixed",this.host.style.top="0",this.host.style.left="0",this.host.style.width="100vw",this.host.style.height="100vh",this.host.style.zIndex="2147483647",this.host.style.pointerEvents="none",this.shadow=this.host.attachShadow({mode:"open"}),this.shadow.innerHTML=`
      <style>${Pe}</style>

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

          <div class="eq-views-wrapper">
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
    `,this.launcherBtn=this.shadow.querySelector(".eq-launcher"),this.launcherDot=this.shadow.querySelector("#eq-launcher-dot"),this.dockToggleBtn=this.shadow.querySelector("#eq-dock-toggle"),this.sidebarEl=this.shadow.querySelector(".eq-sidebar"),this.apToggleBtn=this.shadow.querySelector("#eq-ap-toggle-btn"),this.apConsole=this.shadow.querySelector("#eq-ap-console"),this.dotPulseAp=this.shadow.querySelector("#eq-dot-ap"),this.statusTextAp=this.shadow.querySelector("#eq-status-text-ap"),this.stopwatchAp=this.shadow.querySelector("#eq-stopwatch-ap span"),this.dotPulseAdv=this.shadow.querySelector("#eq-dot-adv"),this.statusTextAdv=this.shadow.querySelector("#eq-status-text-adv"),this.stopwatchAdv=this.shadow.querySelector("#eq-stopwatch-adv span"),this.inspModel=this.shadow.querySelector("#eq-insp-model"),this.inspLatency=this.shadow.querySelector("#eq-insp-latency"),this.inspTokens=this.shadow.querySelector("#eq-insp-tokens"),this.inspPrompt=this.shadow.querySelector("#eq-insp-prompt"),this.inspRationale=this.shadow.querySelector("#eq-insp-rationale"),this.inspActions=this.shadow.querySelector("#eq-insp-actions"),this.copyPromptBtn=this.shadow.querySelector("#eq-copy-prompt-btn"),this.apiKeyInput=this.shadow.querySelector("#eq-api-key"),this.keyContextMenu=this.shadow.querySelector("#eq-key-context-menu"),this.keyMoreBtn=this.shadow.querySelector("#eq-key-more-btn"),this.modelSelect=this.shadow.querySelector("#eq-model-select"),this.modeSelect=this.shadow.querySelector("#eq-mode-select"),this.engineSelect=this.shadow.querySelector("#eq-engine-select"),this.dryRunCheckbox=this.shadow.querySelector("#eq-dry-run"),this.autoApplyCheckbox=this.shadow.querySelector("#eq-auto-apply"),this.autoAdvanceCheckbox=this.shadow.querySelector("#eq-auto-advance"),this.hostDarkModeCheckbox=this.shadow.querySelector("#eq-host-dark"),this.useVisionCheckbox=this.shadow.querySelector("#eq-use-vision"),this.analyzeBtn=this.shadow.querySelector("#eq-analyze-btn"),this.applyBtn=this.shadow.querySelector("#eq-apply-btn"),this.resultContainer=this.shadow.querySelector("#eq-result"),this.floatingAnswers=new W(this.shadow,()=>{this.callbacks.onAnalyze(1)});let o=this.shadow.querySelector("#eq-open-hud-btn");o&&o.addEventListener("click",()=>{this.latestPlan&&this.floatingAnswers.show(this.latestPlan)}),H.forEach(i=>this.modelSelect.add(new Option(i.name,i.id,!1,i.id===e.model))),at.forEach(i=>this.modeSelect.add(new Option(i.label,i.value,!1,i.value===e.modeHint))),ot.forEach(i=>this.engineSelect.add(new Option(i.label,i.value,!1,i.value===e.engine))),this.apiKeyInput.value=e.apiKey,this.dryRunCheckbox.checked=e.dryRun,this.autoApplyCheckbox.checked=e.autoApply,this.autoAdvanceCheckbox.checked=e.autoAdvance,this.hostDarkModeCheckbox.checked=e.hostDarkMode,this.useVisionCheckbox.checked=e.useVision,this.setupEventListeners(),document.body.appendChild(this.host),this.applyHostDarkMode(e.hostDarkMode),e.apiKey&&Q(e.apiKey).then(i=>{i&&i.length>0&&this.updateModelSelect(i,e.model)}).catch(()=>{})}switchTab(e){this.activeTab=e;let a=["autopilot","advanced","inspector","settings"];for(let o of a){let i=this.shadow.querySelector(`#eq-tab-${o}`),r=this.shadow.querySelector(`#eq-view-${o}`);o===e?(i?.classList.add("active"),r&&(r.style.display="flex")):(i?.classList.remove("active"),r&&(r.style.display="none"))}e==="autopilot"&&this.callbacks.onSettingsChange({autoApply:!0,autoAdvance:!0})}setupEventListeners(){this.shadow.querySelector("#eq-tab-autopilot")?.addEventListener("click",()=>this.switchTab("autopilot")),this.shadow.querySelector("#eq-tab-advanced")?.addEventListener("click",()=>this.switchTab("advanced")),this.shadow.querySelector("#eq-tab-inspector")?.addEventListener("click",()=>this.switchTab("inspector")),this.shadow.querySelector("#eq-tab-settings")?.addEventListener("click",()=>this.switchTab("settings")),this.launcherBtn.addEventListener("click",()=>this.toggle()),this.dockToggleBtn.addEventListener("click",()=>this.toggle()),this.shadow.querySelector("#eq-min-btn")?.addEventListener("click",()=>this.toggle(!1)),this.shadow.querySelector("#eq-close-btn")?.addEventListener("click",()=>this.toggle(!1)),window.addEventListener("keydown",n=>{n.altKey&&(n.key==="q"||n.key==="Q")&&(n.preventDefault(),this.toggle())},!0);let e=n=>{let s=n.composedPath();(s.includes(this.sidebarEl)||s.includes(this.host))&&n.stopImmediatePropagation()};window.addEventListener("keydown",e,!0),window.addEventListener("keyup",e,!0),window.addEventListener("keypress",e,!0),this.apiKeyInput.addEventListener("input",()=>{let n=this.apiKeyInput.value.trim().replace(/^["']|["']$/g,"");this.callbacks.onSettingsChange({apiKey:n})}),this.shadow.querySelector("#eq-key-save").addEventListener("click",()=>{let n=this.apiKeyInput.value.trim().replace(/^["']|["']$/g,"");this.apiKeyInput.value=n,this.callbacks.onSettingsChange({apiKey:n}),this.setStatus("Chave Gemini salva com sucesso!","success"),this.keyContextMenu.hidden=!0}),this.keyMoreBtn.addEventListener("click",n=>{n.stopPropagation(),this.keyContextMenu.hidden=!this.keyContextMenu.hidden}),this.shadow.addEventListener("click",n=>{let s=n.target;!s.closest("#eq-key-context-menu")&&!s.closest("#eq-key-more-btn")&&(this.keyContextMenu.hidden=!0)}),this.shadow.querySelector("#eq-menu-prompt")?.addEventListener("click",()=>{this.keyContextMenu.hidden=!0;let n=this.apiKeyInput.value.trim(),s=window.prompt("Cole sua Chave API do Google Gemini (AI Studio):",n);if(s!==null){let l=s.trim().replace(/^["']|["']$/g,"");this.apiKeyInput.value=l,this.callbacks.onSettingsChange({apiKey:l}),this.setStatus("Chave Gemini inserida e salva com sucesso!","success")}}),this.shadow.querySelector("#eq-menu-paste")?.addEventListener("click",async()=>{this.keyContextMenu.hidden=!0;try{let n=await navigator.clipboard.readText();if(n){let s=n.trim().replace(/^["']|["']$/g,"");this.apiKeyInput.value=s,this.callbacks.onSettingsChange({apiKey:s}),this.setStatus("Chave colada e salva com sucesso!","success")}}catch{let n=this.apiKeyInput.value.trim(),s=window.prompt("Cole sua Chave API do Google Gemini (AI Studio):",n);if(s!==null){let l=s.trim().replace(/^["']|["']$/g,"");this.apiKeyInput.value=l,this.callbacks.onSettingsChange({apiKey:l}),this.setStatus("Chave Gemini inserida e salva com sucesso!","success")}}}),this.shadow.querySelector("#eq-menu-toggle-vis")?.addEventListener("click",()=>{this.keyContextMenu.hidden=!0;let n=this.apiKeyInput.type==="password";this.apiKeyInput.type=n?"text":"password";let s=this.shadow.querySelector("#eq-menu-vis-icon"),l=this.shadow.querySelector("#eq-menu-vis-text");s&&(s.innerHTML=n?g.eyeOff:g.eye),l&&(l.textContent=n?"Ocultar Chave":"Mostrar Chave")}),this.shadow.querySelector("#eq-menu-clear")?.addEventListener("click",()=>{this.keyContextMenu.hidden=!0,this.apiKeyInput.value="",this.callbacks.onSettingsChange({apiKey:""}),this.setStatus("Campo limpo. Cole a nova chave e clique em Salvar.","info"),this.apiKeyInput.focus()}),this.shadow.querySelector("#eq-menu-test")?.addEventListener("click",async()=>{this.keyContextMenu.hidden=!0;let n=this.apiKeyInput.value.trim().replace(/^["']|["']$/g,"");if(!n)return this.setStatus("Insira ou cole a chave de API.","error");this.setStatus("Testando chave e descobrindo modelos autorizados...","info");try{let s=await Ce(n);this.setStatus(s.message,s.ok?"success":"error"),s.ok&&s.models&&s.models.length>0&&this.updateModelSelect(s.models)}catch(s){this.setStatus("Erro ao validar chave: "+s.message,"error")}});let o=()=>{this.keyContextMenu.hidden=!0,window.confirm("Deseja realmente resetar todos os dados, chaves e mem\xF3ria de sess\xE3o do EasyQuiz?")&&(ve(),this.apiKeyInput.value="",this.callbacks.onSettingsChange({apiKey:""}),this.setStatus("Todos os dados do EasyQuiz foram limpos.","info"),this.logToConsole("> [SYS] Armazenamento local resetado.","text-yellow"))};this.shadow.querySelector("#eq-menu-reset")?.addEventListener("click",o),this.shadow.querySelector("#eq-reset-all-btn")?.addEventListener("click",o),this.apToggleBtn.addEventListener("click",()=>{if(this.autopilot.isActive())this.autopilot.stop(),this.apToggleBtn.innerHTML=`${g.play} INICIAR AUTOPILOT`,this.apToggleBtn.classList.remove("danger"),this.stopStopwatch(),this.setStatus("Autopilot pausado pelo usu\xE1rio.","info");else{if(!this.apiKeyInput.value.trim().replace(/^["']|["']$/g,"")){this.setStatus("Configure sua chave de API Gemini na aba Configura\xE7\xF5es antes de ligar o Autopilot.","error"),this.switchTab("settings"),this.apiKeyInput.focus();return}this.callbacks.onSettingsChange({autoApply:!0,autoAdvance:!0}),this.autoApplyCheckbox.checked=!0,this.autoAdvanceCheckbox.checked=!0,this.autopilot.start(),this.apToggleBtn.innerHTML=`${g.stop} PARAR AUTOPILOT`,this.apToggleBtn.classList.add("danger"),this.startStopwatch(),this.setStatus("Autopilot ativo. Monitorando exerc\xEDcios...","info")}}),this.shadow.querySelector("#eq-ap-clear-memory").addEventListener("click",()=>{ie(),this.logToConsole("> [SYS] Mem\xF3ria contextual limpa com sucesso.","text-green"),this.setStatus("Mem\xF3ria contextual da sess\xE3o limpa.","success")});let r=this.shadow.querySelector("#eq-copy-console-btn");r?.addEventListener("click",()=>{let n=this.apConsole?.innerText||"";navigator.clipboard.writeText(n).then(()=>{let s=r.innerHTML;r.innerHTML=g.check,setTimeout(()=>r.innerHTML=s,1800)})}),this.copyPromptBtn.addEventListener("click",()=>{let n=this.inspPrompt.textContent||"";navigator.clipboard.writeText(n).then(()=>{let s=this.copyPromptBtn.innerHTML;this.copyPromptBtn.innerHTML=`${g.check} Copiado!`,setTimeout(()=>this.copyPromptBtn.innerHTML=s,2e3)})}),this.modelSelect.addEventListener("change",()=>this.callbacks.onSettingsChange({model:this.modelSelect.value})),this.modeSelect.addEventListener("change",()=>this.callbacks.onSettingsChange({modeHint:this.modeSelect.value})),this.engineSelect.addEventListener("change",()=>this.callbacks.onSettingsChange({engine:this.engineSelect.value})),this.dryRunCheckbox.addEventListener("change",()=>this.callbacks.onSettingsChange({dryRun:this.dryRunCheckbox.checked})),this.autoApplyCheckbox.addEventListener("change",()=>this.callbacks.onSettingsChange({autoApply:this.autoApplyCheckbox.checked})),this.autoAdvanceCheckbox.addEventListener("change",()=>this.callbacks.onSettingsChange({autoAdvance:this.autoAdvanceCheckbox.checked})),this.useVisionCheckbox.addEventListener("change",()=>{let n=this.useVisionCheckbox.checked;this.callbacks.onSettingsChange({useVision:n}),this.setStatus(n?"Vis\xE3o Computacional ativada (capturas habilitadas).":"Modo DOM R\xE1pido ativado (capturas desabilitadas).","info")}),this.hostDarkModeCheckbox.addEventListener("change",()=>{let n=this.hostDarkModeCheckbox.checked;this.callbacks.onSettingsChange({hostDarkMode:n}),this.applyHostDarkMode(n)}),this.analyzeBtn.addEventListener("click",()=>this.callbacks.onAnalyze()),this.applyBtn.addEventListener("click",()=>this.callbacks.onApply())}startStopwatch(){this.stopStopwatch(),this.stopwatchStartTime=Date.now();let e=()=>{let a=((Date.now()-this.stopwatchStartTime)/1e3).toFixed(2)+"s";this.stopwatchAp.textContent=a,this.stopwatchAdv.textContent=a};e(),this.stopwatchInterval=setInterval(e,100)}stopStopwatch(e){if(this.stopwatchInterval&&(clearInterval(this.stopwatchInterval),this.stopwatchInterval=null),e!==void 0){let a=(e/1e3).toFixed(2)+"s";this.stopwatchAp.textContent=a,this.stopwatchAdv.textContent=a}}logToConsole(e,a){if(!this.apConsole)return;let o=document.createElement("div");o.textContent=e,a&&(o.className=a),this.apConsole.appendChild(o),this.apConsole.scrollTop=this.apConsole.scrollHeight}toggle(e){e!==void 0?this.isCollapsed=!e:this.isCollapsed=!this.isCollapsed,this.isCollapsed?this.sidebarEl.classList.add("eq-collapsed"):(this.sidebarEl.classList.remove("eq-collapsed"),this.apiKeyInput.value||(this.switchTab("settings"),this.apiKeyInput.focus()))}setBusy(e,a){this.analyzeBtn.disabled=e,[this.modelSelect,this.modeSelect,this.engineSelect,this.dryRunCheckbox,this.autoApplyCheckbox,this.autoAdvanceCheckbox,this.useVisionCheckbox].forEach(o=>o.disabled=e),e?(this.startStopwatch(),this.dotPulseAp.className="eq-dot-pulse busy",this.dotPulseAdv.className="eq-dot-pulse busy",this.launcherDot.className="eq-launcher-dot busy",a&&this.setStatus(a,"info")):(this.stopStopwatch(),this.dotPulseAp.className="eq-dot-pulse",this.dotPulseAdv.className="eq-dot-pulse",this.launcherDot.className="eq-launcher-dot")}setStatus(e,a="info"){this.statusTextAp.textContent=e,this.statusTextAdv.textContent=e,a==="error"?(this.dotPulseAp.className="eq-dot-pulse error",this.dotPulseAdv.className="eq-dot-pulse error",this.launcherDot.className="eq-launcher-dot error"):a==="success"&&(this.dotPulseAp.className="eq-dot-pulse",this.dotPulseAdv.className="eq-dot-pulse",this.launcherDot.className="eq-launcher-dot");let o=e.includes("Alternando")||e.includes("indispon\xEDvel")||e.includes("fallback")||e.includes("alternativo"),i=a==="error"?"> [ERRO] ":a==="success"?"> [SUCESSO] ":o?"> [FALLBACK] ":"> [SYS] ",r=a==="error"?"text-red":a==="success"?"text-green":o?"text-yellow":"text-blue";this.logToConsole(`${i}${e}`,r)}setPlan(e,a){this.latestPlan=e,this.resultContainer.style.display="flex",e.durationMs&&this.stopStopwatch(e.durationMs);let o=this.shadow.querySelector("#eq-badges");o.innerHTML=`
      <span class="eq-brand-badge">${e.mode.replace("_"," ")}</span>
      <span class="eq-brand-badge" style="color: #00ff55; border-color: rgba(0, 255, 85, 0.4);">${Math.round(e.confidence*100)}% Confian\xE7a</span>
      <span class="eq-brand-badge">${e.actions.length} Cmds</span>
      ${e.usedModel?`<span class="eq-brand-badge" style="border-color: rgba(91, 192, 235, 0.5); color: #5bc0eb;">${e.usedModel}</span>`:""}
    `;let i=this.shadow.querySelector("#eq-rationale-text");i.textContent=e.rationale;let r=this.shadow.querySelector("#eq-actions-list");r.innerHTML="";for(let n of e.actions){let s=document.createElement("div");s.className="eq-action-item";let l="";n.t==="chk"?l=`chk ${n.id} (${n.c})`:n.t==="val"?l=`val "${n.v}" -> ${n.id}`:n.t==="sel"?l=`sel "${Array.isArray(n.v)?n.v.join(","):n.v}" -> ${n.id}`:n.t==="clk"?l=`clk ${n.id}`:n.t==="adv"?l="adv":n.t==="js"?l=`js: ${String(n.v).slice(0,40)}...`:n.t==="drag"&&(l=`drag "${n.from}" -> "${n.to}"`),s.innerHTML=`<span class="eq-action-badge">${n.t.toUpperCase()}</span> <span>${l}</span>`,r.appendChild(s)}if(this.applyBtn.disabled=!a||!e.actions.length,this.inspModel.textContent=e.usedModel||this.initialSettings.model,this.inspLatency.textContent=e.durationMs?`${e.durationMs}ms`:"--",this.inspTokens.textContent=e.tokensUsed?`${e.tokensUsed}`:"--",this.inspPrompt.textContent=e.promptSent||"Prompt n\xE3o registrado para esta requisi\xE7\xE3o.",this.inspRationale.textContent=e.rationale,this.inspActions.innerHTML="",e.actions.length>0)for(let n of e.actions){let s=document.createElement("div");s.className="eq-action-item",s.textContent=JSON.stringify(n),this.inspActions.appendChild(s)}else this.inspActions.innerHTML='<div class="text-muted" style="padding: 4px;">Nenhuma a\xE7\xE3o prescrita pela IA.</div>'}showFloatingAnswers(e){let a=e||this.latestPlan;a&&this.floatingAnswers.show(a)}hideFloatingAnswers(){this.floatingAnswers.hide()}isFloatingAnswersOpen(){return this.floatingAnswers.isOpen()}updateModelSelect(e,a){let o=a||this.initialSettings.model||this.modelSelect.value;this.modelSelect.innerHTML="";let i=!1;e.forEach(r=>{let n=r.id===o;n&&(i=!0),this.modelSelect.add(new Option(r.name,r.id,!1,n))}),!i&&o&&this.modelSelect.add(new Option(`Gemini (${o})`,o,!1,!0)),this.modelSelect.value=o}updateSelectedModel(e){Array.from(this.modelSelect.options).some(o=>o.value===e)||this.modelSelect.add(new Option(`Gemini (${e})`,e,!1,!0)),this.modelSelect.value=e}applyHostDarkMode(e){let a="eq-host-dark-mode-style",o=document.getElementById(a);if(e){let i=window.getComputedStyle(document.body).backgroundColor;(i.includes("rgba(0, 0, 0, 0)")||i==="transparent")&&(i=window.getComputedStyle(document.documentElement).backgroundColor);let r=i.match(/\d+(\.\d+)?/g);if(r&&r.length>=3&&(r[3]!==void 0?parseFloat(r[3]):1)>.1){let s=parseInt(r[0]),l=parseInt(r[1]),d=parseInt(r[2]);if((s*299+l*587+d*114)/1e3<100)return}o||(o=document.createElement("style"),o.id=a,o.innerHTML=`
          html { filter: invert(1) hue-rotate(180deg) !important; background: #fff !important; }
          img, video, canvas, [style*="background-image"] { filter: invert(1) hue-rotate(180deg) !important; }
        `,document.head.appendChild(o)),this.host.classList.add("eq-dark-mode-active")}else this.host.classList.remove("eq-dark-mode-active"),o&&o.remove()}destroy(){this.stopStopwatch(),this.autopilot.stop(),this.applyHostDarkMode(!1),this.callbacks.onDestroy(),this.host.remove()}};async function nt(){let t=window;if(t.__easyquiz){t.__easyquiz.toggle();return}let e=oe(),a=null,o=new Z(e,{onAnalyze:(n=1)=>i(n),onApply:(n=1)=>void r(n),onDestroy:()=>{_(),delete t.__easyquiz},onSettingsChange:n=>{e=ye(n)}});t.__easyquiz={toggle:()=>o.toggle(),destroy:()=>o.destroy(),analyze:async()=>{await i()}},window.addEventListener("keydown",n=>{if(n.altKey&&(n.key==="q"||n.key==="Q")){if(n.preventDefault(),!o)return;o.toggle(!0),i()}});async function i(n=1){if(!e.apiKey){o.setStatus("Configure sua chave de API Gemini acima para come\xE7ar.","error"),o.toggle(!0);return}o.setBusy(!0,"Identificando o bloco da quest\xE3o ativa na p\xE1gina..."),_(),o.hideFloatingAnswers();try{let s=O(!1);s||(o.setStatus("Nenhum controle detectado. Tentando captura de tela inteira...","info"),s=I()),me(s.scope),o.setStatus(`Quest\xE3o localizada (${s.controls.length} controles). Preparando an\xE1lise...`,"info");let l=await fe(s.scope,e.useVision);o.setStatus(l.length>0?`Consultando Gemini (${e.model}) com ${l.length} imagem(ns) anexada(s)...`:`Consultando Gemini (${e.model}) via DOM nativo (modo r\xE1pido)...`,"info");let{plan:d,usedModel:c}=await re(s,l,e,(h,p)=>{o.setStatus(h,p==="warning"?"info":p)});return d.needsMoreContext&&(o.setStatus("Enunciado ou contexto isolado detectado pela IA. Acionando Sele\xE7\xE3o Geral Expandida...","info"),s=O(!0),s||(s=I()),me(s.scope),l=await fe(s.scope,e.useVision),o.setStatus(`Reconsultando IA com escopo ampliado (${s.controls.length} controles)...`,"info"),d=(await re(s,l,e,(p,m)=>{o.setStatus(p,m==="warning"?"info":m)})).plan),d.memoryToStore&&(xe(d.memoryToStore),console.log("[EasyQuiz] Mem\xF3ria de sess\xE3o armazenada:",d.memoryToStore)),a=d,ze(d.actions),o.setPlan(d,!e.dryRun),d.pageType==="conclusion"?o.setStatus("Atividade conclu\xEDda ou tela final detectada pela IA.","success"):d.pageType==="info"?o.setStatus("\u{1F4D8} Conte\xFAdo de contexto absorvido na mem\xF3ria RAG. Avan\xE7ando...","success"):d.pageType==="start"?o.setStatus("In\xEDcio de atividade detectado. Iniciando...","info"):o.setStatus(e.dryRun?"Simula\xE7\xE3o conclu\xEDda. As respostas foram real\xE7adas na p\xE1gina sem altera\xE7\xE3o.":"Resolu\xE7\xE3o pronta! Verifique o realce na tela e aplique quando desejar.","success"),e.dryRun&&d.pageType==="question"&&o.showFloatingAnswers(d),e.autoApply&&!e.dryRun&&await r(n),d}catch(s){_();let l=s instanceof Error?s.message:"Falha desconhecida na an\xE1lise.";o.setStatus(l,"error");return}finally{o.setBusy(!1)}}async function r(n=1){if(!a){o.setStatus("Nenhum plano dispon\xEDvel para aplicar. Execute a an\xE1lise primeiro.","error");return}if(e.dryRun){o.setStatus("O modo de simula\xE7\xE3o est\xE1 ativo. Desmarque para poder aplicar.","error");return}let s=a.pageType==="info"||a.pageType==="start",l=(e.autoAdvance||s||n>=2)&&a.confidence>=e.confidenceThreshold&&!a.needsMoreContext;o.setBusy(!0,"Aplicando respostas no formul\xE1rio...");try{let d=await He(a,l,n);d.success?(o.setStatus(`Sucesso: ${d.applied} resposta(s) preenchida(s)${d.advanced?" e pr\xF3xima quest\xE3o acionada":""}.`,"success"),o.hideFloatingAnswers()):(o.setStatus(`Aviso: O formul\xE1rio requer intera\xE7\xE3o manual direta (${d.verified}/${d.applied} validadas). Gabarito Flutuante exibido na tela.`,"info"),o.showFloatingAnswers(a))}catch(d){let c=d instanceof Error?d.message:"Falha ao aplicar plano.";o.setStatus(c,"error"),o.showFloatingAnswers(a)}finally{o.setBusy(!1)}}o.toggle(!0)}nt().catch(t=>{console.error("[EasyQuiz] Erro fatal na inicializa\xE7\xE3o:",t),window.alert(`EasyQuiz: falha ao iniciar: ${t instanceof Error?t.message:String(t)}`)});})();
