/* EasyQuiz v1.0.0 — Resolução inteligente de quizzes sem servidor
 * GitHub: https://github.com/minifoxie/EasyQuiz
 * 100% Client-side. Direct Google Gemini REST API.
 */
"use strict";(()=>{var I={apiKey:"",model:"gemini-3.5-flash",uiMode:"easy",modeHint:"",engine:"smart",dryRun:!1,autoApply:!0,autoAdvance:!1,hostDarkMode:!0,useVision:!1,confidenceThreshold:.8};var ce="easyquiz_settings_v2";function de(){try{let a=localStorage.getItem(ce);if(!a){let o=localStorage.getItem("easyquiz_settings_v1");if(o){let i=JSON.parse(o);return{...I,apiKey:i.apiKey||""}}return{...I}}let e=JSON.parse(a),t=typeof e.model=="string"&&e.model?e.model:I.model;return t==="gemini-2.5-flash"&&(t="gemini-3.5-flash"),{apiKey:typeof e.apiKey=="string"?e.apiKey.trim():I.apiKey,model:t,uiMode:e.uiMode==="easy"||e.uiMode==="advanced"?e.uiMode:I.uiMode,modeHint:e.modeHint??"",engine:e.engine??"smart",dryRun:!!e.dryRun,autoApply:e.autoApply!==void 0?!!e.autoApply:!0,autoAdvance:!!e.autoAdvance,hostDarkMode:e.hostDarkMode!==void 0?!!e.hostDarkMode:!0,useVision:!!e.useVision,confidenceThreshold:typeof e.confidenceThreshold=="number"?e.confidenceThreshold:I.confidenceThreshold}}catch{return{...I}}}function Se(){try{localStorage.removeItem(ce),localStorage.removeItem("easyquiz_settings_v1");let a=[];for(let e=0;e<localStorage.length;e++){let t=localStorage.key(e);t&&(t.startsWith("eq_")||t.startsWith("easyquiz_"))&&a.push(t)}a.forEach(e=>localStorage.removeItem(e)),pe()}catch(a){console.warn("[EasyQuiz] Erro ao resetar dados:",a)}}function N(a){try{let e=localStorage.getItem("eq_domain_cache_"+a);if(!e)return{};let t=JSON.parse(e);if(t.advanceSelector&&/inject|injetar/i.test(t.advanceSelector)){t.advanceSelector=void 0;try{localStorage.removeItem("eq_domain_cache_"+a)}catch{}}return t}catch{return{}}}function ue(a,e){if(e.advanceSelector&&/inject|injetar/i.test(e.advanceSelector))return;let o={...N(a),...e};try{localStorage.setItem("eq_domain_cache_"+a,JSON.stringify(o))}catch(i){console.warn("[EasyQuiz] Erro cache de dominio:",i)}}function ke(a){let t={...de(),...a};try{localStorage.setItem(ce,JSON.stringify(t))}catch(o){console.warn("[EasyQuiz] Falha ao persistir configura\xE7\xF5es no localStorage:",o)}return t}var Y=[];function Le(a){let e=a.trim();e&&!Y.includes(e)&&Y.push(e)}function K(){return Y}function pe(){Y=[]}var He=`Voc\xEA \xE9 o EasyQuiz Supreme Engine v5.0. Responda estritamente em JSON v\xE1lido conforme o schema exigido.

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
   * Seja anal\xEDtico, r\xE1pido e conciso (m\xE1ximo 1 a 2 frases diretas explicando o porqu\xEA da resposta).`;function B(a,e,t){let o=a.htmlSnippet.includes("draggable")||a.htmlSnippet.includes("perseus")||a.htmlSnippet.includes("category")||a.htmlSnippet.includes("dropzone")||a.controls.some(c=>c.type==="draggable"||c.type==="dropzone"),s=a.questionText.length<120||o||a.controls.length<3?`
[HTML FRAGMENT (Estrutura DOM/Widgets)]:
${a.htmlSnippet.slice(0,4500)}`:`
[HTML FRAGMENT]: Omitido (Texto e controles s\xE3o suficientes).`,n=K(),r="";n.length>0&&(r=`
[MEM\xD3RIA DE CONTEXTO ATIVA (RAG)]:
${n.map(c=>`- ${c}`).join(`
`)}
`);let d=a.controls.filter(c=>c.role!=="navigation"),l=a.controls.filter(c=>c.role==="navigation");return`--- AN\xC1LISE DE P\xC1GINA ---
[MODO CONFIGURADO]: ${t.engine} | Dica: ${t.modeHint||"Auto"}
[URL]: ${a.sourceUrl}
[P\xC1GINA]: ${a.pageTitle}
${r}
[TEXTO VIS\xCDVEL]:
${a.questionText}
${s}

[CAMPOS DE RESPOSTA / EXERC\xCDCIO DETECTADOS]:
${d.length>0?JSON.stringify(d.map(c=>({id:c.id,type:c.type,name:c.name||void 0,lbl:c.label,val:c.value||void 0,opt:c.options.length?c.options:void 0})),null,0):"(Nenhum campo de resposta - p\xE1gina te\xF3rica de leitura/artigo ou introdu\xE7\xE3o)"}

[BOT\xD5ES DE NAVEGA\xC7\xC3O / AVAN\xC7O DISPON\xCDVEIS]:
${l.length>0?l.map(c=>`- "${c.label||c.id}" [tipo: ${c.type}]`).join(`
`):"(Nenhum bot\xE3o de navega\xE7\xE3o expl\xEDcito no escopo local)"}

[IMAGENS ANEXADAS]: ${e.length}
Responda estritamente em JSON v\xE1lido conforme o schema.`}var z=[{id:"gemini-2.5-flash",name:"Gemini 2.5 Flash (Recomendado - Ultra R\xE1pido)",description:"Modelo de \xFAltima gera\xE7\xE3o com suporte nativo e lat\xEAncia inferior a 1 segundo."},{id:"gemini-2.0-flash",name:"Gemini 2.0 Flash (Padr\xE3o Est\xE1vel)",description:"Alta velocidade e excelente precis\xE3o para provas e formul\xE1rios."},{id:"gemini-1.5-flash",name:"Gemini 1.5 Flash (Universal Legado)",description:"Compatibilidade total em todas as contas e vers\xF5es de chave do Google AI Studio."},{id:"gemini-2.5-pro",name:"Gemini 2.5 Pro (Racioc\xEDnio Avan\xE7ado)",description:"Maior capacidade anal\xEDtica para quest\xF5es complexas, STEM e matem\xE1tica profunda."},{id:"gemini-1.5-pro",name:"Gemini 1.5 Pro (Legado Pro)",description:"Modelo de racioc\xEDnio profundo legado."}],Fe={type:"OBJECT",properties:{pageType:{type:"STRING",enum:["question","info","start","conclusion"]},mode:{type:"STRING",enum:["texto_livre","escolha_unica","escolha_multipla","verdadeiro_falso","preenchimento","acao_sem_resposta","categorizacao","ordenacao","arrastar_soltar"]},confidence:{type:"NUMBER"},rationale:{type:"STRING"},needsMoreContext:{type:"BOOLEAN"},warnings:{type:"ARRAY",items:{type:"STRING"}},memoryToStore:{type:"STRING"},actions:{type:"ARRAY",items:{type:"OBJECT",properties:{t:{type:"STRING",enum:["val","chk","sel","clk","adv","js","drag"]},id:{type:"STRING"},v:{},c:{type:"BOOLEAN"},co:{type:"ARRAY",items:{type:"NUMBER"}},from:{type:"STRING"},to:{type:"STRING"}},required:["t"]}}},required:["pageType","mode","confidence","rationale","needsMoreContext","actions"]};function Ue(a){return a.trim().replace(/^google\//,"").replace(/^models\//,"")||"gemini-2.5-flash"}function Ie(a,e){let t="";try{let o=JSON.parse(a);t=o.error?.message||o.message||""}catch{t=a.slice(0,160)}return/API_KEY_INVALID|API key not valid|key.*invalid|unregistered/i.test(t)?"Chave de API do Gemini inv\xE1lida ou n\xE3o autorizada no Google AI Studio.":/RESOURCE_EXHAUSTED|Quota exceeded/i.test(t)||e===429?"Limite tempor\xE1rio de cota do Gemini (HTTP 429) atingido. Aguardando recupera\xE7\xE3o...":e===404?`HTTP 404: ${t||"Modelo ou endpoint n\xE3o encontrado no Google AI Studio"}`:e===503||/overloaded/i.test(t)?`Servidores Google sobrecarregados (HTTP 503): ${t||"Aguardando"}`:t?`Erro Gemini (HTTP ${e}): ${t}`:`Falha na requisi\xE7\xE3o ao Gemini (HTTP ${e}).`}function Qe(a){try{return JSON.parse(a)}catch(e){let t=a.trim(),o=[t+"}",t+"]}",t+'"}]}',t+'"]}',t+"}]}",t+"}]}}"];for(let i of o)try{let s=JSON.parse(i);if(s&&typeof s=="object")return s}catch{}throw new Error(`Falha ao decodificar JSON da IA (${e instanceof Error?e.message:"incompleto"})`)}}var X=(()=>{try{let a=typeof localStorage<"u"?localStorage.getItem("easyquiz_cached_models"):null;return a?JSON.parse(a):null}catch{return null}})(),he=new Set;async function J(a){let e=a.trim().replace(/^["']|["']$/g,"");if(!e)return z;let t=[`https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(e)}`,`https://generativelanguage.googleapis.com/v1/models?key=${encodeURIComponent(e)}`];for(let o of t)try{let i=await fetch(o,{headers:{"Content-Type":"application/json","x-goog-api-key":e}});if(!i.ok){let n=await i.text(),r=Ie(n,i.status);if(r.includes("inv\xE1lida")||r.includes("n\xE3o autorizada"))throw new Error(r);continue}let s=await i.json();if(Array.isArray(s.models)&&s.models.length>0){let n=s.models.filter(r=>{let d=r.supportedGenerationMethods||[],l=(r.name||"").includes("gemini"),c=d.includes("generateContent"),u=(r.name||"").includes("embedding")||(r.name||"").includes("tts")||(r.name||"").includes("imagen")||(r.name||"").includes("aqa")||(r.name||"").includes("computer-use");return l&&c&&!u}).map(r=>{let d=r.name.replace(/^models\//,""),l=r.displayName||d;return{id:d,name:l.includes(d)?l:`${l} (${d})`,description:r.description||""}});if(n.length>0){n.sort((r,d)=>{let l=c=>c==="gemini-2.5-flash"?100:c==="gemini-3.5-flash"?95:c==="gemini-3.1-flash-lite"?90:c==="gemini-2.5-pro"?85:c==="gemini-3.1-pro"?80:c==="gemini-1.5-flash"?60:c.includes("flash")?50:10;return l(d.id)-l(r.id)}),X=n;try{typeof localStorage<"u"&&localStorage.setItem("easyquiz_cached_models",JSON.stringify(n))}catch{}return n}}}catch(i){if(i.message?.includes("Chave de API"))throw i}return z}async function ze(a){let e=a.trim().replace(/^["']|["']$/g,"");if(!e)return{ok:!1,message:"Insira sua chave de API."};try{let o=await J(e);if(o.length>0&&o!==z){let i=o[0];return{ok:!0,message:`Chave v\xE1lida! ${o.length} modelos Gemini dispon\xEDveis em sua conta. Recomendado: ${i.name}`,models:o}}}catch(o){return{ok:!1,message:o instanceof Error?o.message:String(o)}}let t=["gemini-2.5-flash","gemini-2.0-flash","gemini-1.5-flash"];for(let o of t)for(let i of["v1beta","v1"]){let s=`https://generativelanguage.googleapis.com/${i}/models/${o}:generateContent?key=${encodeURIComponent(e)}`;try{if((await fetch(s,{method:"POST",headers:{"Content-Type":"application/json","x-goog-api-key":e},body:JSON.stringify({contents:[{role:"user",parts:[{text:"PING"}]}],generationConfig:{maxOutputTokens:5}})})).ok)return{ok:!0,message:`Chave validada com sucesso no ${o} (${i})!`,models:z}}catch{}}return{ok:!1,message:"Chave de API inv\xE1lida, sem cota ou sem permiss\xE3o para modelos Gemini."}}async function me(a,e,t,o){let i=t.apiKey.trim().replace(/^["']|["']$/g,"");if(!i)throw new Error("Chave de API n\xE3o configurada.");let s=Ue(t.model);if(!X||X.length===0)try{o?.("Verificando modelos autorizados na sua chave de API...","info"),await J(i)}catch(p){let h=p instanceof Error?p.message:String(p);if(h.includes("inv\xE1lida")||h.includes("n\xE3o autorizada"))throw new Error(h)}let n=Date.now(),r=B(a,e,t),d=[{text:r}];for(let p of e)d.push({inline_data:{mime_type:p.mediaType,data:p.base64}});let l={temperature:.05,maxOutputTokens:2500,response_mime_type:"application/json",response_schema:Fe},c=[s,...X?.map(p=>p.id)||[],"gemini-2.5-flash","gemini-2.0-flash","gemini-1.5-flash","gemini-2.5-pro","gemini-1.5-pro"],u=Array.from(new Set(c)).filter(p=>!he.has(p));u.length===0&&(he.clear(),u.push(...z.map(p=>p.id)));let m=new Error("Nenhum modelo tentado.");for(let p=0;p<u.length;p++){let h=u[p],b=u[p+1];h.includes("2.5")||h.includes("thinking")?l.thinkingConfig={thinkingBudget:0}:delete l.thinkingConfig;let y={system_instruction:{parts:[{text:He}]},contents:[{role:"user",parts:d}],generationConfig:l};o?.(`Aguardando resposta da API (${h})...`,"info");let w=["v1beta","v1"];for(let M of w){let U=`https://generativelanguage.googleapis.com/${M}/models/${h}:generateContent?key=${encodeURIComponent(i)}`,Q=new AbortController,Ae=setTimeout(()=>Q.abort(),35e3);try{let H=await fetch(U,{method:"POST",headers:{"Content-Type":"application/json","x-goog-api-key":i},body:JSON.stringify(y),signal:Q.signal});if(clearTimeout(Ae),!H.ok){let Me=await H.text();if(H.status===400&&l.thinkingConfig&&/thinking/i.test(Me)){delete l.thinkingConfig,y.generationConfig=l;continue}let je=Ie(Me,H.status);if(H.status===404&&M==="v1beta")continue;throw new Error(je)}let re=await H.json(),le=re.candidates?.[0];if(!le||!le.content?.parts?.[0]?.text)throw new Error("A IA n\xE3o retornou uma resposta estruturada v\xE1lida.");let Ge=le.content.parts[0].text,k=Qe(Ge);if(Array.isArray(k.actions)||(k.actions=[]),Array.isArray(k.warnings)||(k.warnings=[]),typeof k.confidence!="number"&&(k.confidence=.8),k.usedModel=h,k.durationMs=Date.now()-n,k.promptSent=r,k.tokensUsed=re.usageMetadata?.totalTokenCount,h!==s){o?.(`Resolvido com sucesso pelo fallback '${h}' (${M})!`,"info");try{t.model=h}catch{}}return{plan:k,rawUsage:re.usageMetadata,usedModel:h}}catch(H){if(clearTimeout(Ae),m=H,m.message.includes("inv\xE1lida")||m.message.includes("n\xE3o autorizada"))throw m}}let S=m.message.includes("429")||m.message.includes("cota"),C=m.message.includes("503")||m.message.includes("sobrecarregado");if(m.message.includes("404")&&he.add(h),b){let M=S?3500:C?2500:900,U=`Modelo '${h}' indispon\xEDvel (${m.message}). Aguardando ${M/1e3}s antes de alternar para '${b}'...`;console.warn(`[EasyQuiz Fallback] ${U}`),o?.(U,"warning"),await new Promise(Q=>setTimeout(Q,M))}else console.warn(`[EasyQuiz Fallback] Modelo '${h}' falhou: ${m.message}. Todos os modelos esgotados.`)}throw m}var P=['input:not([type="hidden"])',"textarea","select","button","a",'[role="button"]','[role="link"]','[role="radio"]','[role="checkbox"]','[role="option"]','[contenteditable="true"]','[draggable="true"]',"[aria-grabbed]","[aria-dropeffect]","[data-widget-type]",".perseus-drag-item",".sortable-item",'[data-testid*="drag" i]','[data-testid*="card" i]','[data-testid*="option" i]','[data-testid*="category" i]','[data-role="dropzone"]',"[data-category]"].join(","),W=/(verificar|checar|check|conferir|validar|próxim[oa]|next|continuar|continue|avançar|prosseguir|enviar|submit|concluir|finalizar|terminar|começar|iniciar|start|vamos lá|próxima tarefa|next task|próxima pergunta|next question|marcar como concluíd[oa]|mostrar resumo|entendi|compreendi|ok|leitura concluída|seguir|ir para o exercício|fazer o teste|próximo artigo|ir para a aula)/i,Ye=0;function x(a){let e=a;if(!e||typeof e.isConnected=="boolean"&&!e.isConnected)return!1;if(typeof e.checkVisibility=="function")try{if(!e.checkVisibility({checkOpacity:!0,checkVisibilityCSS:!0}))return!1}catch{}try{let o=window.getComputedStyle?window.getComputedStyle(e):e.style;if(o&&(o.display==="none"||o.visibility==="hidden"||Number(o.opacity||"1")<=0))return!1}catch{}try{let o=e.closest('[hidden], [style*="display: none"], [style*="display:none"]');if(o&&!Pe(o))return!1}catch{}try{if(typeof e.getBoundingClientRect=="function"){let o=e.getBoundingClientRect();if(o.width>0||o.height>0)return!0}}catch{}try{if(typeof e.getClientRects=="function"&&e.getClientRects().length>0)return!0}catch{}let t=e.tagName?.toLowerCase();if(["input","select","textarea","button"].includes(t)){let o=e.closest('label, .option-card, .quiz-option, [class*="option" i], [class*="choice" i], tr, div');if(o&&o!==e)return x(o)}return e.ownerDocument&&e.ownerDocument.defaultView&&/jsdom/i.test(e.ownerDocument.defaultView.navigator?.userAgent||"")?!e.closest('[style*="display: none"], [style*="display:none"], [hidden]'):(e.textContent||"").trim().length>0}function Ke(a){if(a==null)return"";if(typeof a=="string")return a;if(typeof a=="number"||typeof a=="boolean")return String(a);if(a instanceof Node)return a.textContent||"";try{if(typeof a?.toString=="function"){let e=a.toString();if(typeof e=="string")return e}}catch{}return""}function E(a,e=500){return Ke(a).replace(/\s+/g," ").trim().slice(0,e)}function Xe(a){let e=a.dataset.easyquizId;if(e)return e;let t=`eq-${Date.now().toString(36)}-${(Ye+=1).toString(36)}`;return a.dataset.easyquizId=t,t}function Pe(a){return a?!!(a.closest('#easyquiz-shadow-root, .eq-sidebar, .eq-launcher, [data-easyquiz-ignore="true"], .btn-inject-eq, #btn-inject-script')||a.getAttribute?.("data-easyquiz-ignore")==="true"):!1}function L(a){if(!a||!(a instanceof Element)||Pe(a)||a.closest("header, nav, aside"))return!1;let e=a instanceof HTMLInputElement||a instanceof HTMLButtonElement?a.value:"",t=E(a.getAttribute?.("aria-label")||a.textContent||a.getAttribute?.("value")||e),o=a.type,i=t.replace(/[\d\(\)\[\]→\>\•\-\/\\]+/g," ").trim(),s=String(a.getAttribute?.("data-testid")||a.getAttribute?.("data-test-id")||a.getAttribute?.("id")||a.getAttribute?.("href")||"").toLowerCase();return W.test(i)||W.test(t)||o==="submit"||s.includes("next")||s.includes("check")||s.includes("continue")||s.includes("proximo")||s.includes("forward")||!1}function Je(a){let e=a.closest("tr");if(e){let r=e.querySelector("th, td:first-child"),d=r&&r!==a.closest("td")?E(r.textContent,100):"",l=E(a.closest("label, td")?.textContent||"",50);if(d&&l)return`${d}: ${l}`}let t=a.getAttribute("aria-label");if(t)return E(t);let o=a.getAttribute("aria-labelledby");if(o){let r=o.split(/\s+/).map(d=>document.getElementById(d)?.textContent).filter(Boolean).join(" ");if(r.trim())return E(r)}if("labels"in a&&a.labels){let r=Array.from(a.labels??[]).map(d=>d.textContent).join(" ");if(r.trim())return E(r)}let i=a.closest('.docssharedWizToggleLabeledContainer, [role="listitem"], .answer, label, .quiz-option, .form-check, .option-card');if(i&&i!==a){let r=E(i.textContent);if(r)return r}let s=a instanceof HTMLInputElement||a instanceof HTMLButtonElement?a.value:"",n=a.getAttribute("placeholder")||a.getAttribute("title")||a.textContent||s||"";return E(n)}function fe(a,e){let t=a instanceof HTMLSelectElement?a:null,o=a;a.dataset.easyquizRole=e;let i=a.tagName.toLowerCase(),s=["input","textarea","select","button"].includes(i)?i:"other",n=a.getAttribute("role")||"",r=(a.getAttribute("data-testid")||a.getAttribute("data-test-id")||"").toLowerCase(),d=(a.className&&typeof a.className=="string"?a.className:"").toLowerCase(),l=a.getAttribute("draggable")==="true"||a.classList.contains("perseus-drag-item")||a.classList.contains("sortable-item")||!!a.getAttribute("aria-grabbed")||/drag|card|option|item/i.test(r)||/drag|card-item|sortable/i.test(d),c=a.getAttribute("data-role")==="dropzone"||a.classList.contains("category-container")||a.hasAttribute("data-category")||!!a.getAttribute("aria-dropeffect")||/drop|category|bucket/i.test(r)||/dropzone|category-box|bucket|target-zone/i.test(d),m=E((l?"draggable":c?"dropzone":"")||o.type||n||s,40),p="";if(o.type==="checkbox"||o.type==="radio"||n==="radio"||n==="checkbox")p=o.checked||a.getAttribute("aria-checked")==="true"?"checked":"unchecked";else if(s==="button"||i==="a"||e==="navigation"||L(a))p="";else{let C=a instanceof HTMLInputElement||a instanceof HTMLTextAreaElement||a instanceof HTMLSelectElement?a.value:"";p=E(C||a.getAttribute("data-category")||"",2e3)}let h=[];if(t)for(let C of Array.from(t.options).slice(0,80))h.push({value:E(C.value),label:E(C.textContent)});let b=!!(o.required||a.getAttribute("aria-required")==="true"),y=!!(o.disabled||a.getAttribute("aria-disabled")==="true"),w=Xe(a);return{id:a.id||w,tag:s,type:m,label:Je(a),name:E(o.name||a.getAttribute("name")||"",180),value:p,options:h,required:b,disabled:y,role:e}}var $e=['[data-test-id*="exercise" i]','[data-testid*="exercise" i]',".perseus-renderer",".framework-perseus",".Qr7Oae",".que",".question-holder",".quiz-question",".question_holder",".display_question",'[data-functional-selector*="question"]',".question-container","[data-question-id]",'[data-testid*="question" i]','[class*="question-container" i]','[class*="question" i]','[class*="pergunta" i]',"article","form","section","main"].join(",");function Re(a){if(!x(a))return-1/0;let e=a.getBoundingClientRect(),t=Array.from(a.querySelectorAll(P)).filter(x),o=E(a.innerText,4e3).length;if(o<10||!t.length&&o<60)return-1/0;let i=Math.max(1,window.innerWidth*window.innerHeight),s=Math.max(1,e.width*e.height),n=Math.min(1,s/i),r=e.top+e.height/2,d=Math.abs(r-window.innerHeight/2)/Math.max(1,window.innerHeight),l=o>40?35:0,c=e.top>=0&&e.bottom<=window.innerHeight?25:0;return t.length*15+Math.min(60,o/20)+l+c-n*20-d*10}function ge(a){let e=a;for(;e.parentElement&&e.parentElement!==document.body&&e.parentElement!==document.documentElement;){let t=e.parentElement,o=t.tagName.toLowerCase();if(["header","footer","nav","aside"].includes(o))break;if(t.matches?.('article, section, form, [data-test-id*="exercise" i], [data-testid*="exercise" i], .perseus-renderer, .framework-perseus, [class*="question-container" i], .que, main')){e=t;break}let i=E(e.innerText,1e4),s=E(t.innerText,1e4),n=e.querySelectorAll(P).length,r=t.querySelectorAll(P).length;if(i.length<150&&s.length>i.length&&r<=n+4){e=t;continue}break}return e}function We(a){let e=a,t=e.closest('main, [role="main"], article, form, [data-test-id*="exercise" i], [data-testid*="exercise" i], .framework-perseus, section');if(t&&t!==document.body&&x(t))return t;let o=0;for(;e.parentElement&&e.parentElement!==document.body&&o<3;)e=e.parentElement,o++;return e||document.body}function Ze(){let a=document.activeElement;if(a&&a!==document.body){let i=a.closest($e);if(i&&Re(i)>0)return ge(i)}let t=Array.from(document.querySelectorAll($e)).map(i=>({element:i,score:Re(i)})).filter(i=>Number.isFinite(i.score)).sort((i,s)=>s.score-i.score);if(t.length>0&&t[0].score>0)return ge(t[0].element);let o=document.querySelector('form, main, [role="main"]');return o&&x(o)?o:document.body}function Oe(a){let e=a.cloneNode(!0);e.querySelectorAll("script, style, iframe, object, embed, svg, canvas, noscript, audio, video").forEach(o=>o.remove());let t=["type","name","value","role","aria-label","aria-labelledby","aria-checked","aria-required","required","disabled","data-easyquiz-id","draggable","class","id","data-widget-type","data-role","data-category","data-testid"];return e.querySelectorAll("*").forEach(o=>{for(let i of Array.from(o.attributes))t.includes(i.name)||o.removeAttribute(i.name)}),e.outerHTML.replace(/\s+/g," ").slice(0,2e4)}function et(a){return Array.from(a.querySelectorAll(P)).filter(e=>{if(!x(e)||L(e))return!1;if(e.tagName.toLowerCase()==="a"){let t=e.getAttribute("role");return!!(t==="button"||t==="radio"||t==="checkbox"||t==="option"||e.closest('[class*="choice" i], [class*="option" i], [class*="answer" i], [data-testid*="option" i]'))}return!0}).slice(0,100).map(e=>fe(e,"answer"))}function be(a){let e=[a,a.parentElement,a.parentElement?.parentElement,document.body].filter(Boolean),t=new Set,o=[];for(let i of e)for(let s of Array.from(i.querySelectorAll(P)))if(!(t.has(s)||!x(s)||!L(s))&&(t.add(s),o.push(fe(s,"navigation")),o.length>=10))return o;return o}function D(a=!1){let e=Ze();e=ge(e),a&&(e=We(e));let t=e.innerText&&e.innerText.trim().length>0?e.innerText:e.textContent||"",o=E(t,16e3),i=et(e),s=be(e);s.length===0&&(s=be(document.body));let n=[...i,...s].slice(0,120);return!o||n.length===0&&o.length<30?E(document.body.innerText||document.body.textContent||"",16e3).length>=30?$():null:{sourceUrl:window.location.href.slice(0,2e3),pageTitle:document.title.slice(0,500)||"P\xE1gina de Quest\xE3o",questionText:o,htmlSnippet:Oe(e),controls:n,scope:e}}function $(){let a=document.body.innerText||document.body.textContent||document.documentElement.textContent||"",e=E(a,14e3),t=be(document.body),o=document.querySelector('main, article, [role="main"], [data-test-id*="content" i], [class*="content" i]')||document.body;return{sourceUrl:window.location.href.slice(0,2e3),pageTitle:document.title.slice(0,500)||"P\xE1gina de Leitura/Contexto",questionText:e,htmlSnippet:Oe(o).slice(0,15e3),controls:t,scope:o}}function T(a){return a?!!(a.closest('#easyquiz-shadow-root, .eq-sidebar, .eq-launcher, [data-easyquiz-ignore="true"], .btn-inject-eq, #btn-inject-script')||a.getAttribute?.("data-easyquiz-ignore")==="true"):!1}function f(a){return a?a.replace(/^(\([0-9a-zA-Z]{1,2}\)|[0-9]{1,3}|[a-zA-Z])[\.\)\-\:]\s+/,"").replace(/[\.\u2026]{2,}/g," ").replace(/['"“”«»]/g,"").replace(/\s+/g," ").trim():""}function A(a){if(!a||a instanceof HTMLInputElement||a instanceof HTMLSelectElement||a instanceof HTMLTextAreaElement||a.getAttribute("draggable")==="true"||a.classList.contains("dnd-card")||a.hasAttribute("data-category")||a.hasAttribute("data-dropzone"))return a;if(a.hasAttribute("for")){let o=a.getAttribute("for");if(o){let i=a.ownerDocument.getElementById(o);if(i)return i}}let e=a.closest('label, .option-card, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, tr, li, .dnd-card, [class*="option-card" i], [class*="choice-card" i]');if(e&&!["article","section","main","form","body"].includes(e.tagName.toLowerCase())){let o=e.getAttribute("for"),s=(o?e.ownerDocument.getElementById(o):null)||e.querySelector('input:not([type="hidden"]), select, textarea');return s||e}let t=a.closest('button, a, [role="button"], [draggable="true"]');if(t)return t;if(["body","html","main","section","article","form"].includes(a.tagName.toLowerCase())){let o=a.querySelector('button, [role="button"], a, input:not([type="hidden"]), select, textarea, [role="radio"], [role="checkbox"], .option-card, label');if(o)return A(o)}return a}function v(a){if(!a)return null;let e=a.trim().replace(/^["'“”«»]+|["'“”«»]+$/g,"");if(!e)return null;let t=CSS.escape(e),o=document.querySelector(`[data-easyquiz-id="${t}"]`);if(o&&!T(o)&&x(o))return A(o);try{let l=document.getElementById(e);if(l&&!T(l)&&x(l))return l.hasAttribute("data-category")||l.hasAttribute("data-dropzone")||l.classList.contains("dnd-zone")?l:A(l)}catch{}let i=e.match(/^(?:item|opção|opcao|afirmação|afirmacao|alternativa|linha|afirmativa|questão|questao)?\s*#?([0-9]+)$/i);if(i){let l=parseInt(i[1],10)-1;if(l>=0){let c=Array.from(document.querySelectorAll('input[type="checkbox"], input[type="radio"], [role="checkbox"], [role="radio"]')).filter(u=>x(u)&&!T(u));if(l<c.length)return A(c[l])}}let s=e.match(/^(?:item|opção|opcao|afirmação|afirmacao|alternativa|linha|afirmativa|questão|questao)?\s*#?([a-eA-E])$/i);if(s){let l=s[1].toUpperCase().charCodeAt(0)-65;if(l>=0){let c=Array.from(document.querySelectorAll('input[type="checkbox"], input[type="radio"], [role="checkbox"], [role="radio"]')).filter(u=>x(u)&&!T(u));if(l<c.length)return A(c[l])}}if(/^[a-zA-Z0-9_-]{1,10}$/.test(e)){let c=Array.from(document.querySelectorAll(`[data-category="${t}" i], [data-dropzone="${t}" i], [data-role="dropzone"][data-category="${t}" i]`)).find(h=>x(h)&&!T(h));if(c)return c;let m=Array.from(document.querySelectorAll(`input[value="${t}" i], [data-value="${t}" i], input[id="${t}" i]`)).find(h=>x(h)&&!T(h));if(m)return A(m);let p=Array.from(document.querySelectorAll('.option-badge, [class*="badge" i], [class*="letter" i], .option-card span, label span')).find(h=>{if(!x(h)||T(h))return!1;let b=f(h.textContent).toLowerCase();return b===e.toLowerCase()||b===e.toLowerCase()+")"});if(p)return A(p)}try{let c=Array.from(document.querySelectorAll(`[name="${t}"], [value="${t}"], [data-category="${t}" i], [data-dropzone="${t}" i], [data-testid="${t}" i], [data-test-id="${t}" i], [aria-label="${t}" i]`)).find(u=>x(u)&&!T(u));if(c)return c.hasAttribute("data-category")||c.hasAttribute("data-dropzone")||c.classList.contains("dnd-zone")?c:A(c)}catch{}if(/^[.#\[]|\s|[>+~:]/.test(e))try{let c=Array.from(document.querySelectorAll(e)).find(u=>x(u)&&!T(u));if(c)return A(c)}catch{}try{let l=e.replace(/"/g,""),c=`//button[normalize-space(.)="${l}"] | //a[normalize-space(.)="${l}"] | //*[not(*) and normalize-space(.)="${l}"] | //*[@aria-label="${l}"] | //*[@data-category="${l}"] | //*[@data-testid="${l}"]`,u=document.evaluate(c,document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);for(let m=0;m<u.snapshotLength;m++){let p=u.snapshotItem(m);if(p&&x(p)&&!T(p)){if(["body","html"].includes(p.tagName.toLowerCase())){let b=p.querySelector('button, [role="button"], a, input, [role="radio"], [role="checkbox"], label');if(b&&x(b))return A(b)}return p.closest('[data-role="dropzone"], [class*="category" i], [class*="bucket" i], [class*="column" i], [class*="drop" i]')||A(p)}}}catch{}let r=f(e).toLowerCase(),d=Array.from(document.querySelectorAll('button, a, div, span, li, p, label, input, [draggable="true"], [data-testid], [class*="option" i], [class*="card" i], [class*="item" i], [class*="choice" i], [class*="category" i], [class*="bucket" i]'));for(let l of d){if(!x(l)||T(l)||l.closest("header, nav, .stepper, .step-item, .progress-bar-container")||!!(l.matches('article, section, form, main, [class*="container" i], [class*="grid" i], .dnd-pool, .dnd-zones')||l.querySelector('label, [role="radio"], [role="checkbox"], .dnd-card, [draggable="true"], .option-card, tr'))&&!l.matches(".dnd-zone, [data-category], [data-dropzone]"))continue;let u=f(l.textContent).toLowerCase(),m=f(l.getAttribute("aria-label")||"").toLowerCase(),p=f(l.getAttribute("data-category")||"").toLowerCase(),h=l instanceof HTMLInputElement||l instanceof HTMLButtonElement?l.value:"",b=f(h).toLowerCase(),y=u.startsWith(r+")")||u.startsWith(r+".")||u.startsWith(r+" -")||u.startsWith(r+":");if(u===r||m===r||p&&p===r||b&&b===r||y)return l.closest('[data-role="dropzone"], [class*="category" i], [class*="bucket" i], [class*="column" i], [class*="drop" i]')||A(l)}if(r.length>=3)for(let l of d){if(!x(l)||T(l)||l.closest("header, nav, .stepper, .step-item, .progress-bar-container")||!!(l.matches('article, section, form, main, [class*="container" i], [class*="grid" i], .dnd-pool, .dnd-zones')||l.querySelector('label, [role="radio"], [role="checkbox"], .dnd-card, [draggable="true"], .option-card, tr'))&&!l.matches(".dnd-zone, [data-category], [data-dropzone]"))continue;let u=f(l.textContent).toLowerCase(),m=f(l.getAttribute("aria-label")||"").toLowerCase();if(u.includes(r)||m.includes(r)){if(Array.from(l.children).some(y=>{let w=f(y.textContent).toLowerCase();return w&&w.includes(r)}))continue;return l.closest('[data-role="dropzone"], [class*="category" i], [class*="bucket" i], [class*="column" i], [class*="drop" i]')||A(l)}let p=r.split(" ").filter(h=>h.length>2);if(p.length>=3){let h=p.slice(0,Math.min(4,p.length)).join(" ");if(u.includes(h)||m.includes(h))return A(l)}}return null}function R(a,e){for(let t of e)a.dispatchEvent(new Event(t,{bubbles:!0,composed:!0}))}function q(a,e){if(!a)return;try{a.scrollIntoView({block:"center",inline:"center",behavior:"instant"})}catch{}let t=0,o=0;if(e&&e.length===2)t=e[0],o=e[1];else{let n=a.getBoundingClientRect();t=Math.round(n.left+Math.max(1,n.width/2)),o=Math.round(n.top+Math.max(1,n.height/2))}try{a.focus?.()}catch{}let i={bubbles:!0,cancelable:!0,composed:!0,view:window,clientX:t,clientY:o,screenX:t,screenY:o};try{a.dispatchEvent(new PointerEvent("pointerdown",{...i,isPrimary:!0,pointerId:1,pointerType:"mouse",width:1,height:1,pressure:.5,button:0,buttons:1}))}catch{}try{let n=a.ownerDocument?.defaultView?.MouseEvent||window.MouseEvent;n&&a.dispatchEvent(new n("mousedown",{...i,button:0,buttons:1}))}catch{}try{let n=a.ownerDocument?.defaultView?.PointerEvent||window.PointerEvent;n&&a.dispatchEvent(new n("pointerup",{...i,isPrimary:!0,pointerId:1,pointerType:"mouse",width:1,height:1,pressure:.5,button:0,buttons:0}))}catch{}try{let n=a.ownerDocument?.defaultView?.MouseEvent||window.MouseEvent;n&&(a.dispatchEvent(new n("mouseup",{...i,button:0,buttons:0})),a.dispatchEvent(new n("click",{...i,button:0,buttons:0})))}catch{}try{let n=new Touch({identifier:Date.now(),target:a,clientX:t,clientY:o,screenX:t,screenY:o,pageX:t+(window.scrollX||0),pageY:o+(window.scrollY||0)});a.dispatchEvent(new TouchEvent("touchstart",{bubbles:!0,cancelable:!0,composed:!0,touches:[n],targetTouches:[n]})),a.dispatchEvent(new TouchEvent("touchend",{bubbles:!0,cancelable:!0,composed:!0,touches:[],targetTouches:[]}))}catch{}if(!(a instanceof HTMLInputElement&&a.type==="checkbox"))try{a.click()}catch{}if(!(a instanceof HTMLInputElement||a instanceof HTMLLabelElement)){let n=a.closest('button, a, [role="button"], [role="radio"], [role="checkbox"]');if(n&&n!==a)try{n.click()}catch{}}}function ye(a,e){let t=a;if(!(t instanceof HTMLInputElement)&&!(t instanceof HTMLTextAreaElement)&&!(t instanceof HTMLSelectElement)&&!t.isContentEditable){let i=a.querySelector('input:not([type="hidden"]), textarea, select, [contenteditable="true"]');i&&(t=i)}if(t instanceof HTMLButtonElement||t.tagName.toLowerCase()==="a"||t.getAttribute("role")==="button"||t.getAttribute("role")==="link"||t instanceof HTMLInputElement&&["button","submit"].includes(t.type)||L(t)){console.log("[EasyQuiz] Auto-corre\xE7\xE3o em setNativeValue: elemento \xE9 bot\xE3o/navega\xE7\xE3o. Clicando..."),q(t);return}if(t instanceof HTMLSelectElement){we(t,[e]);return}if(t instanceof HTMLInputElement&&["checkbox","radio"].includes(t.type)){let i=["true","1","checked","yes","sim"].includes(e.toLowerCase())||e===t.value;O(t,i);return}try{t.focus?.()}catch{}try{t.dispatchEvent(new InputEvent("beforeinput",{bubbles:!0,cancelable:!0,composed:!0,data:e}))}catch{}if(t instanceof HTMLInputElement||t instanceof HTMLTextAreaElement){try{let n=t._valueTracker;n&&n.setValue("")}catch{}let i=t instanceof HTMLTextAreaElement?HTMLTextAreaElement.prototype:HTMLInputElement.prototype,s=Object.getOwnPropertyDescriptor(i,"value")?.set;s?s.call(t,e):t.value=e;try{let n=t._valueTracker;n&&n.setValue(e)}catch{}R(t,["input","change","blur"]);return}if(t.isContentEditable){try{document.execCommand?.("selectAll",!1,void 0),document.execCommand?.("insertText",!1,e)}catch{}if(t.textContent?.trim()!==e.trim()){t.textContent=e;try{t.innerText=e}catch{}}R(t,["input","change","blur"]);return}try{t.value=e,t.textContent=e,R(t,["input","change","blur"])}catch{}}function xe(a,e=""){if(!a)return e;let t=f(a),o=v(a)||v(t);if(!o)return t||e;let i=o.closest('label, .option-card, [class*="choice" i], [class*="option" i], .quiz-option, tr');if(i){let d=f(i.textContent);if(d&&d.length>0&&d.length<150)return d}if(o.id){let d=document.querySelector(`label[for="${CSS.escape(o.id)}"]`);if(d){let l=f(d.textContent);if(l&&l.length>0&&l.length<150)return l}}let s=o.getAttribute("aria-label");if(s)return f(s);let n=o.getAttribute("placeholder");if(n)return f(n);let r=f(o.textContent);return r&&r.length>0&&r.length<120?r:t||e}function O(a,e){let t=a.closest('.option-card, label, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, [class*="option" i], [class*="choice" i], li')||a,o=a instanceof HTMLInputElement&&["checkbox","radio"].includes(a.type)?a:t.querySelector('input[type="checkbox"], input[type="radio"]');if(!o&&t.hasAttribute("for")){let l=t.getAttribute("for");l&&(o=t.ownerDocument.getElementById(l))}if(t&&(t.setAttribute("aria-checked",e?"true":"false"),t.setAttribute("aria-selected",e?"true":"false"),t.setAttribute("aria-pressed",e?"true":"false"),t.setAttribute("data-selected",e?"true":"false"),t.setAttribute("data-checked",e?"true":"false"),t.setAttribute("data-state",e?"checked":"unchecked"),t.classList.toggle("selected",e),t.classList.toggle("active",e),t.classList.toggle("checked",e)),o&&o.type==="checkbox"){if(o.checked===e)return;let l=o.isConnected?o:t;try{l.focus?.()}catch{}let c=l.getBoundingClientRect(),u=Math.round(c.left+Math.max(1,c.width/2)),m=Math.round(c.top+Math.max(1,c.height/2)),p={bubbles:!0,cancelable:!0,composed:!0,view:window,clientX:u,clientY:m};try{l.dispatchEvent(new PointerEvent("pointerdown",{...p,isPrimary:!0,pointerId:1,pointerType:"mouse",button:0,buttons:1}))}catch{}l.dispatchEvent(new MouseEvent("mousedown",{...p,button:0,buttons:1}));try{l.dispatchEvent(new PointerEvent("pointerup",{...p,isPrimary:!0,pointerId:1,pointerType:"mouse",button:0,buttons:0}))}catch{}if(l.dispatchEvent(new MouseEvent("mouseup",{...p,button:0,buttons:0})),l.dispatchEvent(new MouseEvent("click",{...p,button:0,buttons:0})),o.checked!==e){o.checked=e;try{let h=o._valueTracker;h&&h.setValue(!e)}catch{}try{Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"checked")?.set?.call(o,e)}catch{}o.checked=e,R(o,["input","change"])}return}if(o&&o.type==="radio"){if(o.checked===!0&&e===!0)return;o.checked=e;try{let c=o._valueTracker;c&&c.setValue(!e)}catch{}try{Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"checked")?.set?.call(o,e)}catch{}o.checked=e,R(o,["input","change"]);let l=t!==o?t:o;try{l.focus?.()}catch{}l.dispatchEvent(new MouseEvent("click",{bubbles:!0,cancelable:!0,composed:!0,view:window}));try{l.onclick?.()}catch{}return}let i=t;try{i.focus?.()}catch{}let s=i.getBoundingClientRect(),n=Math.round(s.left+Math.max(1,s.width/2)),r=Math.round(s.top+Math.max(1,s.height/2)),d={bubbles:!0,cancelable:!0,composed:!0,view:window,clientX:n,clientY:r};try{i.dispatchEvent(new PointerEvent("pointerdown",{...d,isPrimary:!0,pointerId:1,pointerType:"mouse",button:0,buttons:1}))}catch{}i.dispatchEvent(new MouseEvent("mousedown",{...d,button:0,buttons:1}));try{i.dispatchEvent(new PointerEvent("pointerup",{...d,isPrimary:!0,pointerId:1,pointerType:"mouse",button:0,buttons:0}))}catch{}i.dispatchEvent(new MouseEvent("mouseup",{...d,button:0,buttons:0})),i.dispatchEvent(new MouseEvent("click",{...d,button:0,buttons:0}));try{i.onclick?.()}catch{}}function we(a,e){let t=a instanceof HTMLSelectElement?a:a.querySelector("select");if(t){let i=e.map(n=>f(n).toLowerCase()),s=!1;for(let n=0;n<t.options.length;n++){let r=t.options[n],d=r.value.toLowerCase(),l=f(r.textContent).toLowerCase();if(i.some(u=>u===d||u===l)){if(r.selected=!0,t.selectedIndex=n,s=!0,!t.multiple)break}else t.multiple||(r.selected=!1)}if(!s)for(let n=0;n<t.options.length;n++){let r=t.options[n],d=r.value.toLowerCase(),l=f(r.textContent).toLowerCase();if(i.some(u=>d.includes(u)||l.includes(u)||u.length>3&&(u.includes(d)||u.includes(l)))&&(r.selected=!0,t.selectedIndex=n,s=!0,!t.multiple))break}if(s){R(t,["input","change","blur"]);return}}let o=a.closest('[role="combobox"], [class*="select" i], [class*="dropdown" i]');if(o){q(o);for(let i of e){let s=v(i);if(s){q(s);return}}}}function tt(a,e){try{let t=new DataTransfer;try{t.setData("text/plain",a)}catch{}try{t.setData("text/html",e)}catch{}return t}catch{return null}}async function ee(a,e,t=1){try{a.scrollIntoView({block:"center",inline:"center",behavior:"instant"})}catch{}let o=a.getBoundingClientRect(),i=e.getBoundingClientRect(),s=Math.round(o.left+Math.max(1,o.width/2)),n=Math.round(o.top+Math.max(1,o.height/2)),r=Math.round(i.left+Math.max(1,i.width/2)),d=Math.round(i.top+Math.max(1,i.height/2)),l=f(e.textContent).toLowerCase();if(l){let b=Array.from(a.querySelectorAll('button, [role="button"], input[type="radio"], input[type="checkbox"], option, .btn, [class*="tag" i]')).find(y=>{let w=f(y.textContent).toLowerCase(),S=y instanceof HTMLInputElement||y instanceof HTMLOptionElement?f(y.value).toLowerCase():"";return w&&(l.includes(w)||w.includes(l))||S&&(l.includes(S)||S.includes(l))});b&&(q(b),await new Promise(y=>setTimeout(y,120)))}q(a,[s,n]),await new Promise(h=>setTimeout(h,140)),q(e,[r,d]);let c=e.querySelector('[data-role="dropzone"], [class*="bucket" i], [class*="slot" i], [class*="drop" i], [class*="target" i], [class*="items" i], ul, ol');c&&c!==e&&q(c),await new Promise(h=>setTimeout(h,100));let u={bubbles:!0,cancelable:!0,composed:!0,view:window,clientX:s,clientY:n,screenX:s,screenY:n,button:0,buttons:1};try{a.dispatchEvent(new PointerEvent("pointerdown",{...u,isPrimary:!0,pointerId:1,pointerType:"mouse",pressure:.5}))}catch{}a.dispatchEvent(new MouseEvent("mousedown",u));let m=4;for(let h=1;h<=m;h++){let b=Math.round(s+(r-s)*(h/m)),y=Math.round(n+(d-n)*(h/m)),w={...u,clientX:b,clientY:y,screenX:b,screenY:y};try{a.dispatchEvent(new PointerEvent("pointermove",{...w,isPrimary:!0,pointerId:1,pointerType:"mouse",pressure:.5}))}catch{}document.dispatchEvent(new MouseEvent("mousemove",w))}let p={bubbles:!0,cancelable:!0,composed:!0,view:window,clientX:r,clientY:d,screenX:r,screenY:d,button:0,buttons:0};try{e.dispatchEvent(new PointerEvent("pointerup",{...p,isPrimary:!0,pointerId:1,pointerType:"mouse",pressure:0}))}catch{}e.dispatchEvent(new MouseEvent("mouseup",p)),e.dispatchEvent(new MouseEvent("click",p));try{let h=tt(E(a.textContent),a.outerHTML),b={...u},y={...p};h&&(b.dataTransfer=h,y.dataTransfer=h),a.dispatchEvent(new DragEvent("dragstart",b)),e.dispatchEvent(new DragEvent("dragenter",y)),e.dispatchEvent(new DragEvent("dragover",y)),e.dispatchEvent(new DragEvent("drop",y)),a.dispatchEvent(new DragEvent("dragend",b))}catch(h){console.warn("[EasyQuiz] DragEvent ignorado com seguran\xE7a:",h)}try{let h=new Touch({identifier:1,target:a,clientX:s,clientY:n}),b=new Touch({identifier:1,target:e,clientX:r,clientY:d});a.dispatchEvent(new TouchEvent("touchstart",{bubbles:!0,cancelable:!0,touches:[h]})),e.dispatchEvent(new TouchEvent("touchmove",{bubbles:!0,cancelable:!0,touches:[b]})),e.dispatchEvent(new TouchEvent("touchend",{bubbles:!0,cancelable:!0,touches:[]}))}catch{}if(t>=2&&!e.contains(a))try{a.focus?.(),a.dispatchEvent(new KeyboardEvent("keydown",{key:" ",code:"Space",bubbles:!0})),a.dispatchEvent(new KeyboardEvent("keyup",{key:" ",code:"Space",bubbles:!0})),await new Promise(h=>setTimeout(h,80)),e.focus?.(),e.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",bubbles:!0})),e.dispatchEvent(new KeyboardEvent("keyup",{key:"Enter",code:"Enter",bubbles:!0}))}catch{}}var Be={fill:(a,e)=>{let t=v(a);t?ye(t,e):console.warn(`$eq.fill: Elemento '${a}' n\xE3o encontrado`)},click:a=>{let e=v(a);e?!!(e.closest('.option-card, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, [class*="option" i], [class*="choice" i]')||e.querySelector('input[type="radio"], input[type="checkbox"]')||e instanceof HTMLInputElement&&["checkbox","radio"].includes(e.type))?O(e,!0):q(e):console.warn(`$eq.click: Elemento '${a}' n\xE3o encontrado`)},check:(a,e)=>{let t=v(a);t?O(t,e):console.warn(`$eq.check: Elemento '${a}' n\xE3o encontrado`)},find:a=>v(a),drag:(a,e)=>{let t=v(a),o=v(e);t&&o?ee(t,o):console.warn(`$eq.drag: Origem ou destino n\xE3o encontrado ('${a}' -> '${e}')`)},categorize:async(a,e)=>{let t=v(a),o=v(e);if(!t||!o){console.warn(`$eq.categorize: Item ou categoria n\xE3o encontrados ('${a}' -> '${e}')`);return}await ee(t,o)},execute:(a,e=!1,t=1)=>Ee(a,e,t)};window.$eq=Be;async function ot(a,e=1){if(a.t==="js"){let s=String(a.v||"");try{new Function("$eq","document","window",s)(Be,document,window)}catch(n){console.warn("[EasyQuiz JS Execution]",n)}return}if(a.t==="drag"){let s=v(a.from),n=v(a.to);!s&&a.from&&(s=v(f(a.from))),!n&&a.to&&(n=v(f(a.to))),s&&n?await ee(s,n,e):console.warn(`[EasyQuiz] Drag: alvo n\xE3o encontrado ('${a.from}' -> '${a.to}')`);return}let t=a.id||"",o=v(t);!o&&t&&(o=v(f(t)));let i=a.v!==void 0?String(a.v).trim():"";if(o&&i){if(o instanceof HTMLInputElement&&o.type==="radio"&&o.name){if(f(o.value).toLowerCase()!==f(i).toLowerCase()){let s=document.querySelector(`input[type="radio"][name="${CSS.escape(o.name)}"][value="${CSS.escape(i)}" i]`);if(s)o=s;else{let r=Array.from(document.querySelectorAll(`input[type="radio"][name="${CSS.escape(o.name)}"]`)).find(d=>{let l=d.closest("label, .vf-label, .option-card, tr, td, div");return l&&f(l.textContent).toLowerCase().includes(f(i).toLowerCase())});r&&(o=r)}}}else if(!(o instanceof HTMLInputElement)&&!(o instanceof HTMLSelectElement)&&!(o instanceof HTMLTextAreaElement)){let s=o.querySelector(`input[value="${CSS.escape(i)}" i], [data-value="${CSS.escape(i)}" i]`);if(s)o=s;else{let r=Array.from(o.querySelectorAll('input[type="radio"], input[type="checkbox"]')).find(d=>{let l=d.closest("label, .vf-label, .option-card, td, div");return l&&f(l.textContent).toLowerCase().includes(f(i).toLowerCase())});r&&(o=r)}}}if(!o&&a.t!=="adv"){console.warn(`[EasyQuiz] Alvo '${t}' n\xE3o encontrado para a\xE7\xE3o '${a.t}'. Prosseguindo...`);return}switch(a.t){case"val":o&&(o instanceof HTMLButtonElement||o.tagName.toLowerCase()==="a"||o.getAttribute("role")==="button"||o.getAttribute("role")==="link"||o instanceof HTMLInputElement&&["button","submit"].includes(o.type)||L(o)?(console.log(`[EasyQuiz] Auto-corre\xE7\xE3o: A\xE7\xE3o 'val' direcionada a bot\xE3o/link '${a.id}'. Clicando...`),q(o)):ye(o,String(a.v)));break;case"chk":o&&O(o,!!a.c);break;case"sel":if(o){let n=Array.isArray(a.v)?a.v:[String(a.v)];we(o,n)}break;case"clk":o&&(!!(o.closest('.option-card, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice')||o.querySelector('input[type="radio"], input[type="checkbox"]')||o instanceof HTMLInputElement&&["checkbox","radio"].includes(o.type))?O(o,!0):q(o,a.co));break;case"adv":let s=te(a.id);if(s){await ve(s,1200);let n=a.id||s.textContent?.trim()||"";n&&ue(window.location.hostname,{advanceSelector:n}),q(s)}else console.warn("[EasyQuiz] Bot\xE3o de avan\xE7o n\xE3o localizado.");break}}function at(){let a=["button","a",'[role="button"]','input[type="submit"]','input[type="button"]','[data-testid*="check" i]','[data-test-id*="check" i]'].join(",");return Array.from(document.querySelectorAll(a)).find(t=>{if(!x(t)||T(t)||t.closest("header, nav, aside"))return!1;let o=t instanceof HTMLInputElement||t instanceof HTMLButtonElement?t.value:"",i=(t.textContent||o||t.getAttribute("aria-label")||"").trim();return/(verificar|checar|check|conferir|validar|enviar|responder)/i.test(i)})||null}function te(a){if(a){let s=v(a);if(s&&x(s)&&!T(s))return s}try{let s=N(window.location.hostname);if(s.advanceSelector){let n=v(s.advanceSelector);if(n&&x(n)&&!T(n))return n}}catch{}let e=["button","a",'[role="button"]','[role="link"]','input[type="button"]','input[type="submit"]','[data-testid*="next" i]','[data-testid*="continue" i]','[data-testid*="check" i]','[data-test-id*="next" i]','[data-test-id*="continue" i]','[data-test-id*="check" i]','[class*="next" i]','[class*="continue" i]','[class*="proximo" i]','[class*="avancar" i]'].join(","),o=Array.from(document.querySelectorAll(e)).filter(s=>x(s)&&!T(s)&&!s.closest("header, nav, aside"));for(let s of o)if(L(s))return s;for(let s of o){let n=s instanceof HTMLInputElement||s instanceof HTMLButtonElement?s.value:"",r=(s.textContent||n||s.getAttribute("aria-label")||"").trim();if(W.test(r))return s}let i=document.querySelector('[data-test-id*="next" i], [data-testid*="next" i], [aria-label*="next" i], [aria-label*="pr\xF3xim" i], [aria-label*="avan\xE7ar" i], [aria-label*="continuar" i]');return i&&x(i)&&!T(i)?i:null}async function ve(a,e=1500){let t=Date.now();for(;Date.now()-t<e;){if(!(a.disabled===!0||a.getAttribute("aria-disabled")==="true"||a.classList.contains("disabled")||a.getAttribute("disabled")!==null))return;await new Promise(i=>setTimeout(i,100))}try{a.removeAttribute("disabled"),a.removeAttribute("aria-disabled"),a.classList.remove("disabled"),a.disabled=!1}catch{}}async function Ne(a){if(a.t==="js"||a.t==="adv")return;if(a.t==="drag"){let o=v(a.from)||v(f(a.from)),i=v(a.to)||v(f(a.to));o&&i&&await ee(o,i,2);return}let e=a.id||"",t=v(e)||v(f(e));if(a.t==="clk"||a.t==="chk"){if(!t&&e){let i=Array.from(document.querySelectorAll('input, label, button, [role="radio"], [role="checkbox"], .option-card, [class*="option" i], [class*="choice" i]')),s=f(e).toLowerCase();t=i.find(n=>{let r=f(n.textContent).toLowerCase(),d=f(n.value||"").toLowerCase();return r.includes(s)||d===s||r.startsWith(s+")")||r.startsWith("("+s+")")})||null}let o=a.v!==void 0?String(a.v).trim():"";if(t&&o){if(t instanceof HTMLInputElement&&t.type==="radio"&&t.name){if(f(t.value).toLowerCase()!==f(o).toLowerCase()){let i=document.querySelector(`input[type="radio"][name="${CSS.escape(t.name)}"][value="${CSS.escape(o)}" i]`);if(i)t=i;else{let n=Array.from(document.querySelectorAll(`input[type="radio"][name="${CSS.escape(t.name)}"]`)).find(r=>{let d=r.closest("label, .vf-label, .option-card, tr, td, div");return d&&f(d.textContent).toLowerCase().includes(f(o).toLowerCase())});n&&(t=n)}}}else if(!(t instanceof HTMLInputElement)&&!(t instanceof HTMLSelectElement)&&!(t instanceof HTMLTextAreaElement)){let i=t.querySelector(`input[value="${CSS.escape(o)}" i], [data-value="${CSS.escape(o)}" i]`);if(i)t=i;else{let n=Array.from(t.querySelectorAll('input[type="radio"], input[type="checkbox"]')).find(r=>{let d=r.closest("label, .vf-label, .option-card, td, div");return d&&f(d.textContent).toLowerCase().includes(f(o).toLowerCase())});n&&(t=n)}}}if(t){let i=t.closest('.option-card, label, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, li')||t,s=t instanceof HTMLInputElement&&["radio","checkbox"].includes(t.type)?t:i.querySelector('input[type="radio"], input[type="checkbox"]')||(i.getAttribute("for")?i.ownerDocument.getElementById(i.getAttribute("for")):null),n=a.t==="chk"?!!a.c:!0;if(O(s||i,n),s)try{s.checked=n;try{Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"checked")?.set?.call(s,n)}catch{}(s.type!=="checkbox"||s.checked!==n)&&s.dispatchEvent(new MouseEvent("click",{bubbles:!0,cancelable:!0,composed:!0,view:window})),s.dispatchEvent(new Event("change",{bubbles:!0,composed:!0})),s.dispatchEvent(new Event("input",{bubbles:!0,composed:!0}))}catch{}try{i.focus?.(),i.setAttribute("aria-checked",n?"true":"false"),i.classList.toggle("selected",n),i.classList.toggle("active",n),i.classList.toggle("checked",n),(!s||s.checked!==n)&&i.dispatchEvent(new MouseEvent("click",{bubbles:!0,cancelable:!0,composed:!0,view:window}))}catch{}try{i.dispatchEvent(new KeyboardEvent("keydown",{key:" ",code:"Space",bubbles:!0})),i.dispatchEvent(new KeyboardEvent("keyup",{key:" ",code:"Space",bubbles:!0}))}catch{}try{i.onclick?.()}catch{}try{s?.onclick?.()}catch{}try{s?.onchange?.()}catch{}}return}if(a.t==="val"){if(!t&&e){let o=Array.from(document.querySelectorAll('input:not([type="hidden"]), textarea, [contenteditable="true"]')),i=f(e).toLowerCase();t=o.find(s=>{let n=(s.getAttribute("placeholder")||"").toLowerCase(),r=(s.name||"").toLowerCase(),d=(s.id||"").toLowerCase(),l=(s.getAttribute("aria-label")||"").toLowerCase();return n.includes(i)||r.includes(i)||d.includes(i)||l.includes(i)})||null}if(t){let i=(t instanceof HTMLInputElement||t instanceof HTMLTextAreaElement?t:t.querySelector('input:not([type="hidden"]), textarea, [contenteditable="true"]'))||t,s=String(a.v??"");try{i.focus?.(),document.execCommand?.("selectAll",!1,void 0),document.execCommand?.("insertText",!1,s)}catch{}ye(i,s)}return}if(a.t==="sel"){if(!t&&e){let o=Array.from(document.querySelectorAll("select")),i=f(e).toLowerCase();t=o.find(s=>{let n=(s.name||"").toLowerCase(),r=(s.id||"").toLowerCase(),d=(s.getAttribute("aria-label")||"").toLowerCase();return n.includes(i)||r.includes(i)||d.includes(i)})||null}if(t){let o=Array.isArray(a.v)?a.v:[String(a.v)];we(t,o)}return}}function Z(a){try{if(a.t==="val"){let e=v(a.id)||v(f(a.id));if(!e)return!1;if(e instanceof HTMLButtonElement||e.tagName.toLowerCase()==="a"||e.getAttribute("role")==="button"||e.getAttribute("role")==="link"||e instanceof HTMLInputElement&&["button","submit"].includes(e.type)||L(e))return!0;let o=String(a.v??"").trim(),i=e instanceof HTMLInputElement&&e.type==="radio"?e:e.querySelector('input[type="radio"]');if(i&&i.name){let l=document.querySelector(`input[type="radio"][name="${CSS.escape(i.name)}"]:checked`);if(!l)return!1;let c=f(l.value).toLowerCase(),u=f(o).toLowerCase(),m=f(l.closest("label, .vf-label, .option-card, tr, td, div")?.textContent||"").toLowerCase();return c===u||m===u||m.includes(u)}let s=e instanceof HTMLInputElement||e instanceof HTMLTextAreaElement?e:e.querySelector('input:not([type="hidden"]), textarea, [contenteditable="true"]'),n=(s?s.value??s.textContent??"":e.textContent??"").trim();if(!n&&!o)return!0;if(!n&&o)return!1;let r=n.replace(",",".").toLowerCase(),d=o.replace(",",".").toLowerCase();return r===d||r.includes(d)||n.toLowerCase()===o.toLowerCase()}if(a.t==="sel"){let e=v(a.id)||v(f(a.id));if(!e)return!1;let t=e instanceof HTMLSelectElement?e:e.querySelector("select");if(!t)return!1;let i=(Array.isArray(a.v)?a.v:[String(a.v)]).map(s=>f(s).toLowerCase());return Array.from(t.options).some(s=>{if(!s.selected)return!1;let n=s.value.toLowerCase(),r=f(s.textContent).toLowerCase();return i.some(d=>d===n||d===r||n.includes(d)||r.includes(d))})}if(a.t==="chk"||a.t==="clk"){let e=v(a.id)||v(f(a.id));if(!e)return!1;let t=e.closest('.option-card, label, [role="radio"], [role="checkbox"], [role="option"], .quiz-option, .answer, .choice, li')||e,o=e instanceof HTMLInputElement&&["checkbox","radio"].includes(e.type)?e:t.querySelector('input[type="checkbox"], input[type="radio"]')||(t.getAttribute("for")?t.ownerDocument.getElementById(t.getAttribute("for")):null),i=a.t==="chk"?!!a.c:!0;if(o&&o.type==="radio"&&a.v){let l=f(String(a.v)).toLowerCase();if(o.name){let c=document.querySelector(`input[type="radio"][name="${CSS.escape(o.name)}"]:checked`);return c?f(c.value).toLowerCase()===l:!1}}if(o&&["checkbox","radio"].includes(o.type))return o.checked===i;let s=t.getAttribute("aria-checked")===String(i)||t.getAttribute("aria-selected")===String(i)||t.getAttribute("aria-pressed")===String(i),n=i?t.getAttribute("data-selected")==="true"||t.getAttribute("data-checked")==="true"||t.getAttribute("data-active")==="true"||t.getAttribute("data-state")==="checked"||t.getAttribute("data-state")==="on":t.getAttribute("data-selected")==="false"||t.getAttribute("data-checked")==="false"||t.getAttribute("data-state")==="unchecked",r=i?/active|selected|checked|picked|correct|is-selected|choice-selected|selected-option|is-checked|chosen|current|highlight|ring|border-primary/i.test(t.className||""):!/active|selected|checked|picked|correct|is-selected|choice-selected|selected-option|is-checked|chosen|current|highlight|ring|border-primary/i.test(t.className||"");return!!(s||n||r||(t instanceof HTMLButtonElement||t.getAttribute("role")==="button")&&a.t==="clk"||a.t==="clk"&&!o)}if(a.t==="drag"){let e=v(a.from)||v(f(a.from)),t=v(a.to)||v(f(a.to));return!e||!t?!1:t.contains(e)?!0:/placed|dropped|assigned|matched|done|selected/i.test(e.className||"")||e.getAttribute("data-placed")==="true"}}catch{}return!1}async function Ee(a,e,t=1){let o=a.actions.filter(u=>u.t!=="adv"),i=a.actions.filter(u=>u.t==="adv"),s=0;for(let u of o){try{await ot(u,t),s++}catch(m){console.warn("[EasyQuiz] A\xE7\xE3o declarativa prim\xE1ria falhou com seguran\xE7a:",u,m)}u.t==="drag"&&await new Promise(m=>setTimeout(m,250))}await new Promise(u=>setTimeout(u,o.length>0?300:50));let n=0;for(let u of o){if(Z(u)){n++;continue}console.warn(`[EasyQuiz Auto-Cura] A\xE7\xE3o '${u.t}' no alvo '${u.id||u.from||""}' n\xE3o verificada no DOM. Disparando Passagem 2 de conting\xEAncia...`);try{await Ne(u)}catch(m){console.warn("[EasyQuiz Auto-Cura] Rota alternativa falhou:",m)}await new Promise(m=>setTimeout(m,180)),Z(u)&&(console.log("[EasyQuiz Auto-Cura] \u2713 A\xE7\xE3o recuperada com sucesso pela rota de conting\xEAncia!"),n++)}if(n<o.length&&o.length>0){console.warn(`[EasyQuiz Auto-Cura] ${o.length-n} de ${o.length} a\xE7\xE3o(\xF5es) ainda n\xE3o verificadas. Disparando Passagem 3 final...`),await new Promise(u=>setTimeout(u,200));for(let u of o)if(!Z(u))try{await Ne(u)}catch{}await new Promise(u=>setTimeout(u,200)),n=0;for(let u of o)Z(u)&&n++}let r=a.pageType==="question",d=o.length<=4?1:.85,l=!r||o.length===0?!0:s>0&&n>=Math.ceil(o.length*d),c=!1;if((e||t>=2)&&(l||!r)){if(await new Promise(p=>setTimeout(p,o.length>0?500:200)),a.pageType!=="info"){let p=at();p&&x(p)&&(await ve(p,1200),q(p),await new Promise(h=>setTimeout(h,800)))}let u=i.length>0?i[0].id:void 0,m=te(u);if(m){await ve(m,1200);let p=u||m.textContent?.trim()||"";p&&ue(window.location.hostname,{advanceSelector:p}),q(m),c=!0}else console.warn("[EasyQuiz] Nenhum bot\xE3o de avan\xE7o encontrado na p\xE1gina.")}return{applied:s,verified:n,success:l,advanced:c}}var V=null,_=[];function G(){V&&(V.style.removeProperty("outline"),V.style.removeProperty("outline-offset"),V=null);for(let a of _)a.style.removeProperty("outline"),a.style.removeProperty("outline-offset"),a.style.removeProperty("background-color");_=[]}function Ce(a){G(),V=a,a.style.outline="2px solid #00e5ff",a.style.outlineOffset="4px"}function De(a){for(let e of a){if(e.t==="adv"||e.t==="js")continue;if(e.t==="drag"){try{let s=document.querySelector(`[data-easyquiz-id="${CSS.escape(e.from)}"]`)||document.querySelector(e.from),n=document.querySelector(`[data-easyquiz-id="${CSS.escape(e.to)}"]`)||document.querySelector(e.to);s&&(s.style.outline="2px solid #00ff88",_.push(s)),n&&(n.style.outline="2px dashed #00e5ff",_.push(n))}catch{}continue}if(!e.id)continue;let t=CSS.escape(e.id),o=document.querySelector(`[data-easyquiz-id="${t}"]`);if(!o)continue;let i=o.closest('label, [role="listitem"], .answer, .form-check')||o;i.style.outline="2px solid #00ff88",i.style.outlineOffset="2px",i.style.backgroundColor="rgba(0, 255, 136, 0.08)",_.push(i)}}var j=4,nt=1200,Te=12e5;function oe(a){return new Promise((e,t)=>{let o=new FileReader;o.onerror=()=>t(new Error("Falha ao converter blob para base64.")),o.onload=()=>{let i=String(o.result||"");e(i.split(",")[1]||"")},o.readAsDataURL(a)})}async function ae(a){let e=0,t=0;if(a instanceof HTMLImageElement?(e=a.naturalWidth||a.width,t=a.naturalHeight||a.height):(e=a.width,t=a.height),e<=0||t<=0)throw new Error("Dimens\xF5es inv\xE1lidas.");let o=Math.min(1,nt/Math.max(e,t)),i=Math.max(1,Math.round(e*o)),s=Math.max(1,Math.round(t*o)),n=document.createElement("canvas");n.width=i,n.height=s;let r=n.getContext("2d",{alpha:!1});if(!r)throw new Error("Sem suporte a Canvas 2D.");return r.fillStyle="#ffffff",r.fillRect(0,0,i,s),r.drawImage(a,0,0,i,s),new Promise((d,l)=>{n.toBlob(c=>c?d(c):l(new Error("Falha compress\xE3o.")),"image/jpeg",.8)})}async function Ve(a){try{let e=a.cloneNode(!0),t=a.offsetWidth||500,o=a.offsetHeight||500,i=`
      <svg xmlns="http://www.w3.org/2000/svg" width="${t}" height="${o}">
        <foreignObject width="100%" height="100%">
          <div xmlns="http://www.w3.org/1999/xhtml" style="background:#fff;font-family:sans-serif;">
            ${e.innerHTML}
          </div>
        </foreignObject>
      </svg>
    `,s=new Blob([i],{type:"image/svg+xml;charset=utf-8"}),n=URL.createObjectURL(s),r=new Image;r.crossOrigin="anonymous",await new Promise((c,u)=>{r.onload=c,r.onerror=u,r.src=n});let d=await ae(r),l=await oe(d);if(URL.revokeObjectURL(n),l&&l.length<=Te)return{mediaType:"image/jpeg",base64:l,alt:"Captura Suprema via rasteriza\xE7\xE3o DOM",source:"rasterized"}}catch(e){console.warn("Falha na rasteriza\xE7\xE3o suprema:",e)}return null}async function it(a){let e=a.currentSrc||a.src;if(!e)return null;let t=(a.alt||a.getAttribute("aria-label")||"Imagem da quest\xE3o").slice(0,500);if(a.complete&&a.naturalWidth>0)try{let o=await ae(a),i=await oe(o);if(i&&i.length<=Te)return{mediaType:"image/jpeg",base64:i,alt:t,source:e.slice(0,2e3)}}catch{}try{let o=await fetch(e,{mode:"cors"});if(o.ok){let i=await o.blob();if(i.type.startsWith("image/")){let s=await createImageBitmap(i),n=await ae(s);s.close();let r=await oe(n);if(r&&r.length<=Te)return{mediaType:"image/jpeg",base64:r,alt:t,source:e.slice(0,2e3)}}}}catch{return Ve(a.parentElement||a)}return null}async function qe(a,e=!0){if(!e)return[];let t=[],o=0,i=Array.from(a.querySelectorAll("img")).filter(x).slice(0,j);for(let s of i)try{let n=await it(s);if(n&&o+n.base64.length<=25e5&&(t.push(n),o+=n.base64.length,t.length>=j))break}catch{}if(t.length<j){let s=Array.from(a.querySelectorAll("canvas")).filter(x).slice(0,j);for(let n of s)try{let r=await ae(n),d=await oe(r);if(d&&o+d.length<=25e5&&(t.push({mediaType:"image/jpeg",base64:d,alt:"Canvas inline",source:"canvas"}),o+=d.length,t.length>=j))break}catch{let r=await Ve(n.parentElement||n);r&&(t.push(r),o+=r.base64.length)}}return t}var ne=class{active=!1;timer=null;callbacks;lastRunTime=0;lastActionTime=0;isProcessing=!1;constructor(e){this.callbacks=e}isActive(){return this.active}start(){this.active||(this.active=!0,this.lastActionTime=Date.now(),this.callbacks.onStatusChange("waiting","> [SYS] Autopilot ENGAGED. Monitorando..."),this.loop())}stop(){this.active=!1,this.timer&&clearTimeout(this.timer),this.callbacks.onStatusChange("idle","> [SYS] Autopilot DESATIVADO.")}errorCount=0;lastPageSig="";samePageCount=0;async loop(){if(!this.active)return;let e=Date.now();if(e-this.lastRunTime<2500||this.isProcessing){this.timer=window.setTimeout(()=>this.loop(),500);return}this.lastRunTime=e;try{this.isProcessing=!0;let t=D(!1);if(t||(t=$()),t){let o=`${t.pageTitle}_${t.questionText.slice(0,80)}_${t.controls.length}`;if(o===this.lastPageSig)this.samePageCount++;else{let n=this.samePageCount>1;this.lastPageSig=o,this.samePageCount=1,n&&(this.callbacks.onStatusChange("waiting","> [SYS] Avan\xE7o de p\xE1gina detectado! Retomando monitoramento autom\xE1tico...","text-green"),this.callbacks.onPageAdvance?.())}if(this.callbacks.isManualModeActive?.()){this.callbacks.onStatusChange("waiting","> [SYS] Gabarito manual ativo na tela. Aguardando voc\xEA posicionar as respostas e avan\xE7ar a p\xE1gina...","text-yellow"),this.lastRunTime=Date.now();return}if(this.samePageCount>1&&(this.callbacks.onStatusChange("waiting",`> [AUTOPILOT] Resolu\xE7\xE3o pendente (${this.samePageCount}\xAA verifica\xE7\xE3o). Conclua e avance para prosseguir...`,"text-yellow"),await new Promise(n=>setTimeout(n,4e3))),this.samePageCount>=4){let n=te();if(n){this.callbacks.onStatusChange("advancing","> [SYS] For\xE7ando acionamento de bot\xE3o de avan\xE7o para desbloquear quest\xE3o...","text-yellow"),q(n),this.samePageCount=0,await new Promise(r=>setTimeout(r,2e3));return}}let i=t.controls.filter(n=>n.role==="answer"),s=N(window.location.hostname);if(i.length>0){this.callbacks.onStatusChange("analyzing","> [IA] Quest\xE3o/Exerc\xEDcio detectado. Consultando IA...","text-blue"),await new Promise(r=>setTimeout(r,600));let n=await this.callbacks.onRequestAnalysis(this.samePageCount);if(n){if(this.callbacks.onStatusChange("analyzing",`> [IA] (${n.usedModel||"gemini"}) Confian\xE7a: ${(n.confidence*100).toFixed(1)}% | Modo: ${n.mode}`,"text-blue"),this.callbacks.onStatusChange("analyzing",`> [IA] Racioc\xEDnio: ${n.rationale}`,"text-blue"),this.callbacks.onStatusChange("analyzing",`> [IA] A\xE7\xF5es geradas: ${n.actions.length}`,"text-blue"),this.errorCount=0,n.memoryToStore&&this.callbacks.onStatusChange("analyzing",`> [IA] \u{1F9E0} Mem\xF3ria RAG salva: "${n.memoryToStore}"`,"text-yellow"),n.pageType==="conclusion"){this.callbacks.onStatusChange("idle","> [SYS] Atividade conclu\xEDda! Desligando Autopilot.","text-green"),this.stop();return}}else{this.errorCount++;let r=this.errorCount===1?5e3:8e3;this.callbacks.onStatusChange("waiting",`> [AVISO] Falha na an\xE1lise (${this.errorCount}/3). Aguardando ${r/1e3}s para estabiliza\xE7\xE3o antes de tentar novamente...`,"text-yellow"),await new Promise(d=>setTimeout(d,r))}this.lastActionTime=Date.now()}else if(s.advanceSelector&&v(s.advanceSelector)&&t.questionText.length<50){let n=v(s.advanceSelector);n&&(this.callbacks.onStatusChange("advancing",`> [BRUTE] Avan\xE7ando via cache "${s.advanceSelector}"...`),await new Promise(r=>setTimeout(r,1e3)),q(n),this.lastActionTime=Date.now(),this.errorCount=0)}else{this.callbacks.onStatusChange("analyzing","> [IA] P\xE1gina informativa/contexto detectada. Lendo e consultando IA...","text-blue"),await new Promise(r=>setTimeout(r,600));let n=await this.callbacks.onRequestAnalysis(this.samePageCount);if(n){if(this.callbacks.onStatusChange("analyzing",`> [IA] (${n.usedModel||"gemini"}) Tipo: ${n.pageType} | Modo: ${n.mode}`,"text-blue"),this.callbacks.onStatusChange("analyzing",`> [IA] Racioc\xEDnio: ${n.rationale}`,"text-blue"),n.memoryToStore&&this.callbacks.onStatusChange("analyzing",`> [IA] \u{1F9E0} Conte\xFAdo absorvido na mem\xF3ria: "${n.memoryToStore}"`,"text-yellow"),n.pageType==="info")this.callbacks.onStatusChange("advancing","> [IA] \u{1F4D6} Leitura conclu\xEDda. Avan\xE7ando automaticamente...","text-green"),await new Promise(r=>setTimeout(r,1800));else if(n.pageType==="start")this.callbacks.onStatusChange("advancing","> [SYS] In\xEDcio de m\xF3dulo detectado. Iniciando...","text-blue"),await new Promise(r=>setTimeout(r,1800));else if(n.pageType==="conclusion"){this.callbacks.onStatusChange("idle","> [SYS] Atividade conclu\xEDda! Desligando Autopilot.","text-green"),this.stop();return}this.errorCount=0}else{this.errorCount++;let r=this.errorCount===1?5e3:8e3;this.callbacks.onStatusChange("waiting",`> [AVISO] Falha ao processar p\xE1gina (${this.errorCount}/3). Aguardando ${r/1e3}s para estabiliza\xE7\xE3o antes de tentar novamente...`,"text-yellow"),await new Promise(d=>setTimeout(d,r))}this.lastActionTime=Date.now()}if(this.errorCount>=3){this.callbacks.onStatusChange("error","> [ERRO] 3 falhas consecutivas. Abortando Autopilot para poupar sua cota e tokens.","text-red"),this.callbacks.onStatusChange("waiting","> [DICA] Verifique a mensagem vermelha de [ERRO DETALHADO] no console acima para saber o motivo exato.","text-yellow"),this.stop();return}}else this.callbacks.onStatusChange("waiting","> [SYS] Monitorando p\xE1gina... Aguardando carregamento dos elementos.")}catch(t){let o=t instanceof Error?t.message:String(t);console.warn("[EasyQuiz Autopilot]",t),this.callbacks.onStatusChange("error",`> [ERRO NO AUTOPILOT] ${o}`,"text-red")}finally{this.isProcessing=!1}this.active&&(this.timer=window.setTimeout(()=>this.loop(),1e3))}};var g={logo:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.8L19.2 8 12 11.2 4.8 8 12 4.8zM4 9.6l7 3.1v7.5l-7-3.5V9.6zm9 10.6v-7.5l7-3.1v7.1l-7 3.5z"/></svg>',rocket:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M13.13 2.81a.5.5 0 0 0-.46-.07c-.42.15-2.08.79-3.9 2.61-2.04 2.04-2.6 4.09-2.73 4.96l-.97.98a1 1 0 0 0-.29.71v2.12a1 1 0 0 0 .29.71l2.83 2.83a1 1 0 0 0 .71.29h2.12a1 1 0 0 0 .71-.29l.98-.97c.87-.13 2.92-.69 4.96-2.73 1.82-1.82 2.46-3.48 2.61-3.9a.5.5 0 0 0-.07-.46l-6.79-6.79zM4.5 16.5l-2.09 2.09a.5.5 0 0 0 .35.85h3.04l.35.35v3.04a.5.5 0 0 0 .85.35L9.09 21.1l-4.59-4.6z"/></svg>',play:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>',stop:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h12v12H6z"/></svg>',code:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>',terminal:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8h16v10zm-12-3l3-3-3-3 1.4-1.4L13.8 12l-4.4 4.4L8 15zm6 0h4v2h-4v-2z"/></svg>',inspector:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>',settings:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.49.49 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>',key:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M7 14c-2.76 0-5-2.24-5-5s2.24-5 5-5c2.42 0 4.44 1.72 4.9 4H22v4h-2v3h-3v-3h-2v3h-3v-3h-2.1c-.46 2.28-2.48 4-4.9 4zm0-7c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>',paste:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 2h-4.18C14.4 .84 13.3 0 12 0c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm7 18H5V4h2v3h10V4h2v16z"/></svg>',edit:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>',trash:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>',eraser:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M15.14 3c-.51 0-1.02.2-1.41.59L2.59 14.73c-.78.78-.78 2.05 0 2.83L6.44 21.4c.78.78 2.05.78 2.83 0l11.14-11.14c.78-.78.78-2.05 0-2.83l-3.86-3.84c-.39-.39-.9-.59-1.41-.59zm.71 2.71l3.15 3.15-3.15 3.15-3.15-3.15 3.15-3.15zm-4.57 4.57l3.15 3.15-4.57 4.57H6.71l-3-3 7.57-7.57z"/></svg>',save:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/></svg>',analyze:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L3 14h8l-2 8 12-12h-8l2-8z"/></svg>',apply:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>',close:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>',chevronRight:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>',chevronLeft:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>',eye:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>',eyeOff:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.44-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.17c0-1.66-1.34-3-3-3l-.17.02z"/></svg>',check:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>',clock:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>',copy:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>',refresh:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg>',chip:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4h12v16H6V4zm2 2v12h8V6H8zm-4 3h2v2H4V9zm0 4h2v2H4v-2zm16-4h2v2h-2V9zm0 4h2v2h-2v-2zM9 2h2v2H9V2zm4 0h2v2h-2V2zm-4 18h2v2H9v-2zm4 0h2v2h-2v-2z"/></svg>',moreVertical:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>',minimize:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M19 13H5v-2h14v2z"/></svg>',maximize:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/></svg>',dragHandle:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M10 9h4V6h-4v3zm0 5h4v-3h-4v3zm0 5h4v-3h-4v3zM4 9h4V6H4v3zm0 5h4v-3H4v3zm0 5h4v-3H4v3zm12-10V6h4v3h-4zm0 5h4v-3h-4v3zm0 5h4v-3h-4v3z"/></svg>',list:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/></svg>',folderTree:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6 10H6v-2h8v2zm4-4H6v-2h12v2z"/></svg>',folder:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/></svg>',file:'<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>'};var ie=class{element=null;shadow;isMinimized=!1;currentPlan=null;isDragging=!1;dragStartX=0;dragStartY=0;initialLeft=25;initialTop=25;onAdvanceCallback;constructor(e,t){this.shadow=e,this.onAdvanceCallback=t,this.initGlobalListeners()}initGlobalListeners(){window.addEventListener("popstate",()=>this.handlePageNavigated()),window.addEventListener("hashchange",()=>this.handlePageNavigated()),document.addEventListener("click",e=>{if(!this.isOpen())return;let t=e.target;if(!t||this.shadow.contains(t)||t.closest("#easyquiz-shadow-root"))return;let o=t.closest('button, [role="button"], a, input[type="submit"]');if(o){let i=(o.textContent||o.value||"").toLowerCase();/pr[oó]xim|avan[cç]|continu|verific|enviar|submit|confirm|checar|validar|next/i.test(i)&&setTimeout(()=>{this.isOpen()&&this.handlePageNavigated()},800)}},!0)}handlePageNavigated(){this.isOpen()&&(this.hide(),this.onAdvanceCallback?.())}isOpen(){return this.element!==null&&this.element.style.display!=="none"}show(e){this.currentPlan=e,this.element||this.createElement(),this.renderContent(),this.element&&(this.element.style.display="flex")}hide(){this.element&&(this.element.style.display="none")}minimize(){this.isMinimized=!0,this.element&&this.element.classList.add("minimized")}restore(){this.isMinimized=!1,this.element&&this.element.classList.remove("minimized")}createElement(){this.element=document.createElement("div"),this.element.className="eq-floating-hud",this.element.style.left=`${this.initialLeft}px`,this.element.style.top=`${this.initialTop}px`,this.element.innerHTML=`
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
    `,this.shadow.appendChild(this.element),this.element.querySelector("#eq-fah-pill").addEventListener("click",()=>this.restore()),this.element.querySelector("#eq-fah-min-btn").addEventListener("click",()=>this.minimize()),this.element.querySelector("#eq-fah-close-btn").addEventListener("click",()=>this.hide());let i=this.element.querySelector("#eq-fah-copy-md-btn");i.addEventListener("click",()=>this.copyMarkdownToClipboard(i));let s=this.element.querySelector("#eq-fah-copy-all-btn");s.addEventListener("click",()=>this.copyMarkdownToClipboard(s));let n=this.element.querySelector("#eq-fah-header");this.setupDraggable(n)}setupDraggable(e){let t=o=>{if(o.target.closest(".eq-fah-btn"))return;o.preventDefault(),this.isDragging=!0,this.dragStartX=o.clientX,this.dragStartY=o.clientY;let i=this.element.getBoundingClientRect();this.initialLeft=i.left,this.initialTop=i.top;let s=r=>{if(!this.isDragging||!this.element)return;let d=r.clientX-this.dragStartX,l=r.clientY-this.dragStartY,c=Math.max(10,window.innerWidth-this.element.offsetWidth-10),u=Math.max(10,window.innerHeight-this.element.offsetHeight-10),m=Math.min(Math.max(10,this.initialLeft+d),c),p=Math.min(Math.max(10,this.initialTop+l),u);this.element.style.left=`${m}px`,this.element.style.top=`${p}px`},n=()=>{this.isDragging=!1,window.removeEventListener("mousemove",s),window.removeEventListener("mouseup",n)};window.addEventListener("mousemove",s),window.addEventListener("mouseup",n)};e.addEventListener("mousedown",t)}renderContent(){if(!this.element||!this.currentPlan)return;let e=this.element.querySelector("#eq-fah-body"),t=this.element.querySelector("#eq-fah-pill-text"),o=this.element.querySelector("#eq-fah-pill-badge");e.innerHTML="";let i=this.currentPlan,s=i.actions.filter(c=>c.t==="drag"),n=i.actions.filter(c=>{if(c.t!=="val")return!1;let u=f(c.id||"").toLowerCase();return!/continu|avan[cç]|pr[oó]xim|submet|enviar|check|verific/i.test(u)}),r=i.actions.filter(c=>c.t==="clk"||c.t==="chk"),d=s.length||n.length||r.length,l=document.createElement("div");if(l.className="eq-fah-meta",l.innerHTML=`
      <span>Modo: <strong style="color:#ffffff;">${i.mode.replace("_"," ")}</strong></span>
      <span class="eq-fah-meta-badge">${Math.round(i.confidence*100)}% Confian\xE7a</span>
    `,e.appendChild(l),s.length>0||i.mode==="categorizacao"||i.mode==="arrastar_soltar"){t.textContent=`Categoriza\xE7\xE3o (${s.length} itens)`,o.textContent=String(s.length);let c={};for(let u of s){let m=f(u.to)||"Geral";c[m]||(c[m]=[]),c[m].push(f(u.from))}for(let[u,m]of Object.entries(c)){let p=document.createElement("div"),h=/fato|true|verdadeiro|sim/i.test(u),b=/opini[aã]o|false|falso|n[aã]o/i.test(u);p.className=`eq-fah-group ${h?"group-fato":b?"group-opiniao":""}`;let y=document.createElement("div");y.className="eq-fah-group-title",y.innerHTML=`<span>\u{1F4C1}</span> <span>${u} (${m.length})</span>`,p.appendChild(y);let w=document.createElement("div");w.className="eq-fah-group-items";for(let S of m){let C=document.createElement("div");C.className="eq-fah-item";let F=document.createElement("span");F.className="eq-fah-item-text",F.textContent=S,C.appendChild(F);let M=document.createElement("button");M.className="eq-fah-copy-inline",M.textContent="Copiar",M.addEventListener("click",()=>{navigator.clipboard.writeText(S),M.textContent="\u2713 Copiado",setTimeout(()=>M.textContent="Copiar",1200)}),C.appendChild(M),w.appendChild(C)}p.appendChild(w),e.appendChild(p)}}else if(n.length>0){t.textContent=`Preenchimento (${n.length} campos)`,o.textContent=String(n.length);let c=document.createElement("div");c.className="eq-fah-group";let u=document.createElement("div");u.className="eq-fah-group-title",u.textContent="Respostas para Inserir:",c.appendChild(u);let m=document.createElement("div");m.className="eq-fah-group-items";for(let p of n){let h=document.createElement("div");h.className="eq-fah-item";let b=document.createElement("span");b.className="eq-fah-item-text";let y=xe(p.id),S=/^[#\.\$]|input|mat-|cell|field|q[0-9]/i.test(y)?"":y;b.innerHTML=`${S?`<strong>${S}:</strong> `:""}<code style="color:#00ffcc; background:rgba(0,255,204,0.1); padding:2px 6px; border-radius:4px; font-weight:600;">${p.v}</code>`,h.appendChild(b);let C=document.createElement("button");C.className="eq-fah-copy-inline",C.textContent="Copiar",C.addEventListener("click",()=>{navigator.clipboard.writeText(String(p.v)),C.textContent="\u2713 Copiado",setTimeout(()=>C.textContent="Copiar",1200)}),h.appendChild(C),m.appendChild(h)}c.appendChild(m),e.appendChild(c)}else if(r.length>0){t.textContent=`Op\xE7\xF5es (${r.length} marcadas)`,o.textContent=String(r.length);let c=document.createElement("div");c.className="eq-fah-group";let u=document.createElement("div");u.className="eq-fah-group-title",u.textContent="Alternativa(s) Correta(s):",c.appendChild(u);let m=document.createElement("div");m.className="eq-fah-group-items";for(let p of r){let h=document.createElement("div");h.className="eq-fah-item";let b=document.createElement("span");b.className="eq-fah-item-text";let y=xe(p.id);/^[#\.\$]|opt|choice|radio|chk|q[0-9]/i.test(y)&&p.v&&(y=String(p.v)),b.innerHTML=`<span style="color:#00ffcc; font-weight:bold; margin-right:6px;">\u2611</span> <span>${y}</span>`,h.appendChild(b);let w=document.createElement("button");w.className="eq-fah-copy-inline",w.textContent="Copiar",w.addEventListener("click",()=>{navigator.clipboard.writeText(y),w.textContent="\u2713 Copiado",setTimeout(()=>w.textContent="Copiar",1200)}),h.appendChild(w),m.appendChild(h)}c.appendChild(m),e.appendChild(c)}else t.textContent="Gabarito",o.textContent="0",e.innerHTML+='<div style="padding:10px; color:#888;">Nenhuma resposta direta para exibir.</div>';if(i.rationale){let c=document.createElement("div");c.className="eq-fah-rationale",c.innerHTML=`<strong>\u{1F4A1} Racioc\xEDnio da IA:</strong> ${i.rationale}`,e.appendChild(c)}}generateMarkdown(){if(!this.currentPlan)return"";let e=this.currentPlan,t=[];t.push("# Gabarito da Quest\xE3o \u2014 EasyQuiz Pro"),t.push(`- **Modo:** ${e.mode}`),t.push(`- **Confian\xE7a:** ${(e.confidence*100).toFixed(0)}%`),t.push("");let o=e.actions.filter(n=>n.t==="drag"),i=e.actions.filter(n=>n.t==="val"),s=e.actions.filter(n=>n.t==="clk"||n.t==="chk");if(o.length>0){t.push("## \u{1F4C2} Categoriza\xE7\xE3o:");let n={};for(let r of o){let d=f(r.to)||"Geral";n[d]||(n[d]=[]),n[d].push(f(r.from))}for(let[r,d]of Object.entries(n)){t.push(`### Categoria: ${r}`);for(let l of d)t.push(`- ${l}`);t.push("")}}else if(i.length>0){t.push("## \u270F\uFE0F Respostas para Preenchimento:");for(let n of i){let r=f(n.id);t.push(`- **${r||"Campo"}:** \`${n.v}\``)}t.push("")}else if(s.length>0){t.push("## \u2705 Alternativas Corretas:");for(let n of s)t.push(`- [x] ${f(n.id)}`);t.push("")}return e.rationale&&(t.push("---"),t.push(`**\u{1F4A1} Racioc\xEDnio:** ${e.rationale}`)),t.join(`
`)}copyMarkdownToClipboard(e){let t=this.generateMarkdown();t&&navigator.clipboard.writeText(t).then(()=>{let o=e.innerHTML;e.id==="eq-fah-copy-md-btn"?e.innerHTML='<span style="font-size:10px; color:#00ffcc; font-weight:bold;">\u2713</span>':e.innerHTML="\u2713 Copiado!",setTimeout(()=>{e.innerHTML=o},1500)})}};var _e=`
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
`;var st=[{value:"",label:"Detec\xE7\xE3o Autom\xE1tica"},{value:"escolha_unica",label:"M\xFAltipla Escolha (\xDAnica)"},{value:"escolha_multipla",label:"M\xFAltipla Escolha (V\xE1rias)"},{value:"categorizacao",label:"Categoriza\xE7\xE3o / Grupos"},{value:"arrastar_soltar",label:"Arrastar e Soltar (Drag & Drop)"},{value:"ordenacao",label:"Ordena\xE7\xE3o / Sequ\xEAncia"},{value:"verdadeiro_falso",label:"Verdadeiro / Falso"},{value:"texto_livre",label:"Texto Livre / Dissertativa"},{value:"preenchimento",label:"Preenchimento de Lacunas"}],rt=[{value:"smart",label:"Inteligente (Auto-H\xEDbrido)"},{value:"command",label:"Apenas Comando (Seguro)"},{value:"javascript",label:"Apenas JS Nativo (Avan\xE7ado)"}],se=class{host;shadow;callbacks;autopilot;floatingAnswers;initialSettings;isCollapsed=!1;activeTab="autopilot";stopwatchInterval=null;stopwatchStartTime=0;latestPlan=null;latestContext=null;latestPromptText="";progressContainer;progressBar;progressLabel;progressVal;contextTreeContainer;launcherBtn;launcherDot;dockToggleBtn;sidebarEl;apToggleBtn;apConsole;dotPulseAp;statusTextAp;stopwatchAp;dotPulseAdv;statusTextAdv;stopwatchAdv;inspModel;inspLatency;inspTokens;inspPrompt;inspRationale;inspActions;copyPromptBtn;apiKeyInput;keyContextMenu;keyMoreBtn;modelSelect;modeSelect;engineSelect;dryRunCheckbox;autoApplyCheckbox;autoAdvanceCheckbox;hostDarkModeCheckbox;useVisionCheckbox;analyzeBtn;applyBtn;resultContainer;constructor(e,t){this.initialSettings=e,this.callbacks=t,this.autopilot=new ne({onStatusChange:(i,s,n)=>{this.logToConsole(s,n),i==="analyzing"?this.setBusy(!0,"Autopilot: IA analisando..."):(i==="advancing"||i==="waiting")&&this.setBusy(!1)},onRequestAnalysis:async i=>{try{return await this.callbacks.onAnalyze(i)||null}catch{return null}},isManualModeActive:()=>this.floatingAnswers?.isOpen()??!1,onPageAdvance:()=>{this.floatingAnswers?.hide()}}),this.host=document.createElement("div"),this.host.id="easyquiz-shadow-root",this.host.style.position="fixed",this.host.style.top="0",this.host.style.left="0",this.host.style.width="100vw",this.host.style.height="100vh",this.host.style.zIndex="2147483647",this.host.style.pointerEvents="none",this.shadow=this.host.attachShadow({mode:"open"}),this.shadow.innerHTML=`
      <style>${_e}</style>

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
    `,this.launcherBtn=this.shadow.querySelector(".eq-launcher"),this.launcherDot=this.shadow.querySelector("#eq-launcher-dot"),this.dockToggleBtn=this.shadow.querySelector("#eq-dock-toggle"),this.sidebarEl=this.shadow.querySelector(".eq-sidebar"),this.apToggleBtn=this.shadow.querySelector("#eq-ap-toggle-btn"),this.apConsole=this.shadow.querySelector("#eq-ap-console"),this.progressContainer=this.shadow.querySelector("#eq-progress-container"),this.progressBar=this.shadow.querySelector("#eq-progress-bar"),this.progressLabel=this.shadow.querySelector("#eq-progress-label"),this.progressVal=this.shadow.querySelector("#eq-progress-val"),this.contextTreeContainer=this.shadow.querySelector("#eq-tree-container"),this.dotPulseAp=this.shadow.querySelector("#eq-dot-ap"),this.statusTextAp=this.shadow.querySelector("#eq-status-text-ap"),this.stopwatchAp=this.shadow.querySelector("#eq-stopwatch-ap span"),this.dotPulseAdv=this.shadow.querySelector("#eq-dot-adv"),this.statusTextAdv=this.shadow.querySelector("#eq-status-text-adv"),this.stopwatchAdv=this.shadow.querySelector("#eq-stopwatch-adv span"),this.inspModel=this.shadow.querySelector("#eq-insp-model"),this.inspLatency=this.shadow.querySelector("#eq-insp-latency"),this.inspTokens=this.shadow.querySelector("#eq-insp-tokens"),this.inspPrompt=this.shadow.querySelector("#eq-insp-prompt"),this.inspRationale=this.shadow.querySelector("#eq-insp-rationale"),this.inspActions=this.shadow.querySelector("#eq-insp-actions"),this.copyPromptBtn=this.shadow.querySelector("#eq-copy-prompt-btn"),this.apiKeyInput=this.shadow.querySelector("#eq-api-key"),this.keyContextMenu=this.shadow.querySelector("#eq-key-context-menu"),this.keyMoreBtn=this.shadow.querySelector("#eq-key-more-btn"),this.modelSelect=this.shadow.querySelector("#eq-model-select"),this.modeSelect=this.shadow.querySelector("#eq-mode-select"),this.engineSelect=this.shadow.querySelector("#eq-engine-select"),this.dryRunCheckbox=this.shadow.querySelector("#eq-dry-run"),this.autoApplyCheckbox=this.shadow.querySelector("#eq-auto-apply"),this.autoAdvanceCheckbox=this.shadow.querySelector("#eq-auto-advance"),this.hostDarkModeCheckbox=this.shadow.querySelector("#eq-host-dark"),this.useVisionCheckbox=this.shadow.querySelector("#eq-use-vision"),this.analyzeBtn=this.shadow.querySelector("#eq-analyze-btn"),this.applyBtn=this.shadow.querySelector("#eq-apply-btn"),this.resultContainer=this.shadow.querySelector("#eq-result"),this.floatingAnswers=new ie(this.shadow,()=>{this.callbacks.onAnalyze(1)});let o=this.shadow.querySelector("#eq-open-hud-btn");o&&o.addEventListener("click",()=>{this.latestPlan&&this.floatingAnswers.show(this.latestPlan)}),z.forEach(i=>this.modelSelect.add(new Option(i.name,i.id,!1,i.id===e.model))),st.forEach(i=>this.modeSelect.add(new Option(i.label,i.value,!1,i.value===e.modeHint))),rt.forEach(i=>this.engineSelect.add(new Option(i.label,i.value,!1,i.value===e.engine))),this.apiKeyInput.value=e.apiKey,this.dryRunCheckbox.checked=e.dryRun,this.autoApplyCheckbox.checked=e.autoApply,this.autoAdvanceCheckbox.checked=e.autoAdvance,this.hostDarkModeCheckbox.checked=e.hostDarkMode,this.useVisionCheckbox.checked=e.useVision,this.setupEventListeners(),document.body.appendChild(this.host),this.applyHostDarkMode(e.hostDarkMode),e.apiKey&&J(e.apiKey).then(i=>{i&&i.length>0&&this.updateModelSelect(i,e.model)}).catch(()=>{})}switchTab(e){this.activeTab=e;let t=["autopilot","context","advanced","inspector","settings"];for(let o of t){let i=this.shadow.querySelector(`#eq-tab-${o}`),s=this.shadow.querySelector(`#eq-view-${o}`);o===e?(i?.classList.add("active"),s&&(s.style.display="flex")):(i?.classList.remove("active"),s&&(s.style.display="none"))}e==="autopilot"?this.callbacks.onSettingsChange({autoApply:!0,autoAdvance:!0}):e==="context"?this.renderContextTree():e==="inspector"&&this.refreshInspectorView()}setupEventListeners(){this.shadow.querySelector("#eq-tab-autopilot")?.addEventListener("click",()=>this.switchTab("autopilot")),this.shadow.querySelector("#eq-tab-context")?.addEventListener("click",()=>this.switchTab("context")),this.shadow.querySelector("#eq-tab-advanced")?.addEventListener("click",()=>this.switchTab("advanced")),this.shadow.querySelector("#eq-tab-inspector")?.addEventListener("click",()=>this.switchTab("inspector")),this.shadow.querySelector("#eq-tab-settings")?.addEventListener("click",()=>this.switchTab("settings")),this.shadow.querySelector("#eq-refresh-context-btn")?.addEventListener("click",()=>{this.renderContextTree()}),this.launcherBtn.addEventListener("click",()=>this.toggle()),this.dockToggleBtn.addEventListener("click",()=>this.toggle()),this.shadow.querySelector("#eq-min-btn")?.addEventListener("click",()=>this.toggle(!1)),this.shadow.querySelector("#eq-close-btn")?.addEventListener("click",()=>this.toggle(!1)),window.addEventListener("keydown",n=>{n.altKey&&(n.key==="q"||n.key==="Q")&&(n.preventDefault(),this.toggle())},!0);let e=n=>{let r=n.composedPath();(r.includes(this.sidebarEl)||r.includes(this.host))&&n.stopImmediatePropagation()};window.addEventListener("keydown",e,!0),window.addEventListener("keyup",e,!0),window.addEventListener("keypress",e,!0),this.apiKeyInput.addEventListener("input",()=>{let n=this.apiKeyInput.value.trim().replace(/^["']|["']$/g,"");this.callbacks.onSettingsChange({apiKey:n})}),this.shadow.querySelector("#eq-key-save").addEventListener("click",()=>{let n=this.apiKeyInput.value.trim().replace(/^["']|["']$/g,"");this.apiKeyInput.value=n,this.callbacks.onSettingsChange({apiKey:n}),this.setStatus("Chave Gemini salva com sucesso!","success"),this.keyContextMenu.hidden=!0}),this.keyMoreBtn.addEventListener("click",n=>{n.stopPropagation(),this.keyContextMenu.hidden=!this.keyContextMenu.hidden}),this.shadow.addEventListener("click",n=>{let r=n.target;!r.closest("#eq-key-context-menu")&&!r.closest("#eq-key-more-btn")&&(this.keyContextMenu.hidden=!0)}),this.shadow.querySelector("#eq-menu-prompt")?.addEventListener("click",()=>{this.keyContextMenu.hidden=!0;let n=this.apiKeyInput.value.trim(),r=window.prompt("Cole sua Chave API do Google Gemini (AI Studio):",n);if(r!==null){let d=r.trim().replace(/^["']|["']$/g,"");this.apiKeyInput.value=d,this.callbacks.onSettingsChange({apiKey:d}),this.setStatus("Chave Gemini inserida e salva com sucesso!","success")}}),this.shadow.querySelector("#eq-menu-paste")?.addEventListener("click",async()=>{this.keyContextMenu.hidden=!0;try{let n=await navigator.clipboard.readText();if(n){let r=n.trim().replace(/^["']|["']$/g,"");this.apiKeyInput.value=r,this.callbacks.onSettingsChange({apiKey:r}),this.setStatus("Chave colada e salva com sucesso!","success")}}catch{let n=this.apiKeyInput.value.trim(),r=window.prompt("Cole sua Chave API do Google Gemini (AI Studio):",n);if(r!==null){let d=r.trim().replace(/^["']|["']$/g,"");this.apiKeyInput.value=d,this.callbacks.onSettingsChange({apiKey:d}),this.setStatus("Chave Gemini inserida e salva com sucesso!","success")}}}),this.shadow.querySelector("#eq-menu-toggle-vis")?.addEventListener("click",()=>{this.keyContextMenu.hidden=!0;let n=this.apiKeyInput.type==="password";this.apiKeyInput.type=n?"text":"password";let r=this.shadow.querySelector("#eq-menu-vis-icon"),d=this.shadow.querySelector("#eq-menu-vis-text");r&&(r.innerHTML=n?g.eyeOff:g.eye),d&&(d.textContent=n?"Ocultar Chave":"Mostrar Chave")}),this.shadow.querySelector("#eq-menu-clear")?.addEventListener("click",()=>{this.keyContextMenu.hidden=!0,this.apiKeyInput.value="",this.callbacks.onSettingsChange({apiKey:""}),this.setStatus("Campo limpo. Cole a nova chave e clique em Salvar.","info"),this.apiKeyInput.focus()}),this.shadow.querySelector("#eq-menu-test")?.addEventListener("click",async()=>{this.keyContextMenu.hidden=!0;let n=this.apiKeyInput.value.trim().replace(/^["']|["']$/g,"");if(!n)return this.setStatus("Insira ou cole a chave de API.","error");this.setStatus("Testando chave e descobrindo modelos autorizados...","info");try{let r=await ze(n);this.setStatus(r.message,r.ok?"success":"error"),r.ok&&r.models&&r.models.length>0&&this.updateModelSelect(r.models)}catch(r){this.setStatus("Erro ao validar chave: "+r.message,"error")}});let o=()=>{this.keyContextMenu.hidden=!0,window.confirm("Deseja realmente resetar todos os dados, chaves e mem\xF3ria de sess\xE3o do EasyQuiz?")&&(Se(),this.apiKeyInput.value="",this.callbacks.onSettingsChange({apiKey:""}),this.setStatus("Todos os dados do EasyQuiz foram limpos.","info"),this.logToConsole("> [SYS] Armazenamento local resetado.","text-yellow"))};this.shadow.querySelector("#eq-menu-reset")?.addEventListener("click",o),this.shadow.querySelector("#eq-reset-all-btn")?.addEventListener("click",o),this.apToggleBtn.addEventListener("click",()=>{if(this.autopilot.isActive())this.autopilot.stop(),this.apToggleBtn.innerHTML=`${g.play} INICIAR AUTOPILOT`,this.apToggleBtn.classList.remove("danger"),this.stopStopwatch(),this.setStatus("Autopilot pausado pelo usu\xE1rio.","info");else{if(!this.apiKeyInput.value.trim().replace(/^["']|["']$/g,"")){this.setStatus("Configure sua chave de API Gemini na aba Configura\xE7\xF5es antes de ligar o Autopilot.","error"),this.switchTab("settings"),this.apiKeyInput.focus();return}this.callbacks.onSettingsChange({autoApply:!0,autoAdvance:!0}),this.autoApplyCheckbox.checked=!0,this.autoAdvanceCheckbox.checked=!0,this.autopilot.start(),this.apToggleBtn.innerHTML=`${g.stop} PARAR AUTOPILOT`,this.apToggleBtn.classList.add("danger"),this.startStopwatch(),this.setStatus("Autopilot ativo. Monitorando exerc\xEDcios...","info")}}),this.shadow.querySelector("#eq-ap-clear-memory").addEventListener("click",()=>{pe(),this.logToConsole("> [SYS] Mem\xF3ria contextual limpa com sucesso.","text-green"),this.setStatus("Mem\xF3ria contextual da sess\xE3o limpa.","success")});let s=this.shadow.querySelector("#eq-copy-console-btn");s?.addEventListener("click",()=>{let n=this.apConsole?.innerText||"";navigator.clipboard.writeText(n).then(()=>{let r=s.innerHTML;s.innerHTML=g.check,setTimeout(()=>s.innerHTML=r,1800)})}),this.copyPromptBtn.addEventListener("click",()=>{let n=this.inspPrompt.textContent||"";navigator.clipboard.writeText(n).then(()=>{let r=this.copyPromptBtn.innerHTML;this.copyPromptBtn.innerHTML=`${g.check} Copiado!`,setTimeout(()=>this.copyPromptBtn.innerHTML=r,2e3)})}),this.modelSelect.addEventListener("change",()=>this.callbacks.onSettingsChange({model:this.modelSelect.value})),this.modeSelect.addEventListener("change",()=>this.callbacks.onSettingsChange({modeHint:this.modeSelect.value})),this.engineSelect.addEventListener("change",()=>this.callbacks.onSettingsChange({engine:this.engineSelect.value})),this.dryRunCheckbox.addEventListener("change",()=>this.callbacks.onSettingsChange({dryRun:this.dryRunCheckbox.checked})),this.autoApplyCheckbox.addEventListener("change",()=>this.callbacks.onSettingsChange({autoApply:this.autoApplyCheckbox.checked})),this.autoAdvanceCheckbox.addEventListener("change",()=>this.callbacks.onSettingsChange({autoAdvance:this.autoAdvanceCheckbox.checked})),this.useVisionCheckbox.addEventListener("change",()=>{let n=this.useVisionCheckbox.checked;this.callbacks.onSettingsChange({useVision:n}),this.setStatus(n?"Vis\xE3o Computacional ativada (capturas habilitadas).":"Modo DOM R\xE1pido ativado (capturas desabilitadas).","info")}),this.hostDarkModeCheckbox.addEventListener("change",()=>{let n=this.hostDarkModeCheckbox.checked;this.callbacks.onSettingsChange({hostDarkMode:n}),this.applyHostDarkMode(n)}),this.analyzeBtn.addEventListener("click",async()=>{await this.callbacks.onAnalyze()&&!this.dryRunCheckbox.checked&&!this.autoApplyCheckbox.checked&&this.callbacks.onApply()}),this.applyBtn.addEventListener("click",()=>this.callbacks.onApply())}startStopwatch(){this.stopStopwatch(),this.stopwatchStartTime=Date.now();let e=()=>{let t=((Date.now()-this.stopwatchStartTime)/1e3).toFixed(2)+"s";this.stopwatchAp.textContent=t,this.stopwatchAdv.textContent=t};e(),this.stopwatchInterval=setInterval(e,100)}stopStopwatch(e){if(this.stopwatchInterval&&(clearInterval(this.stopwatchInterval),this.stopwatchInterval=null),e!==void 0){let t=(e/1e3).toFixed(2)+"s";this.stopwatchAp.textContent=t,this.stopwatchAdv.textContent=t}}logToConsole(e,t){if(!this.apConsole)return;let o=document.createElement("div"),i=new Date,s=`${String(i.getHours()).padStart(2,"0")}:${String(i.getMinutes()).padStart(2,"0")}:${String(i.getSeconds()).padStart(2,"0")}.${String(Math.floor(i.getMilliseconds()/100))}`,n=e;for(e.startsWith(">")?n=`> [${s}] ${e.slice(1).trim()}`:n=`[${s}] ${e}`,o.textContent=n,t&&(o.className=t),this.apConsole.appendChild(o),this.apConsole.scrollTop=this.apConsole.scrollHeight;this.apConsole.children.length>150;)this.apConsole.removeChild(this.apConsole.firstChild)}setProgress(e,t){if(!this.progressContainer||!this.progressBar)return;if(e<=0){this.progressContainer.style.display="none",this.progressBar.style.width="0%";return}this.progressContainer.style.display="flex";let o=Math.min(100,Math.max(0,Math.round(e)));this.progressBar.style.width=`${o}%`,this.progressVal&&(this.progressVal.textContent=`${o}%`),t&&this.progressLabel&&(this.progressLabel.textContent=t),o>=100&&setTimeout(()=>{this.progressContainer&&this.progressBar&&this.progressBar.style.width==="100%"&&(this.progressContainer.style.display="none")},1500)}updateContext(e,t){this.latestContext=e,t&&(this.latestPlan=t),this.activeTab==="context"?this.renderContextTree():this.activeTab==="inspector"&&t&&this.refreshInspectorView()}renderContextTree(){if(!this.contextTreeContainer)return;let e=this.latestContext,t=K(),o=this.latestPlan;this.contextTreeContainer.innerHTML="";let i=this.createTreeFolder("\u{1F4C4} P\xC1GINA & ESCOPO ATUAL",!0,[{label:"T\xEDtulo",value:document.title||"Sem t\xEDtulo"},{label:"URL",value:window.location.pathname||"/"},{label:"Escopo DOM",value:e?`${e.scope.tagName.toLowerCase()}${e.scope.className?"."+e.scope.className.split(" ").join("."):""}`:"Document"},{label:"Tamanho Texto",value:e?`${e.questionText.length} caracteres`:"N\xE3o analisado"},{label:"Trecho Enunciado",value:e?`"${e.questionText.slice(0,120)}..."`:"Nenhum"}]);this.contextTreeContainer.appendChild(i);let s=e?e.controls:[],n=s.map((c,u)=>{let m=c.role==="navigation"||c.type==="button",p=!m&&c.value?` [val: "${c.value}"]`:"";return{label:`[#${u+1}] ${c.type.toUpperCase()}`,value:`${c.label||c.id||c.name||"(Sem r\xF3tulo)"}${p}`.trim(),badge:m?"Navega\xE7\xE3o":c.role||c.type}}),r=this.createTreeFolder(`\u{1F39B}\uFE0F CONTROLES DETECTADOS (${s.length})`,s.length>0,n);this.contextTreeContainer.appendChild(r);let d=t.map((c,u)=>({label:`Mem\xF3ria #${u+1}`,value:c,badge:"RAG"})),l=this.createTreeFolder(`\u{1F9E0} MEM\xD3RIA RAG ACUMULADA (${t.length})`,t.length>0,d);if(this.contextTreeContainer.appendChild(l),o){let c=this.createTreeFolder(`\u{1F916} \xDALTIMO PLANO IA (${o.actions.length} a\xE7\xF5es)`,!0,[{label:"Tipo P\xE1gina",value:o.pageType,badge:`${(o.confidence*100).toFixed(0)}%`},{label:"Modo",value:o.mode},{label:"Racioc\xEDnio",value:o.rationale||"N/A"},...o.actions.map((u,m)=>({label:`A\xE7\xE3o #${m+1} (${u.t})`,value:JSON.stringify(u)}))]);this.contextTreeContainer.appendChild(c)}}createTreeFolder(e,t,o){let i=document.createElement("div");i.className="eq-tree-node";let s=document.createElement("div");s.className="eq-tree-header",s.innerHTML=`<span class="eq-tree-arrow">${t?"\u25BC":"\u25B6"}</span> <span>${e}</span>`;let n=document.createElement("div");if(n.className="eq-tree-content",n.style.display=t?"flex":"none",o.length===0)n.innerHTML='<div class="text-muted" style="padding: 2px 0;">Nenhum item registrado.</div>';else for(let r of o){let d=document.createElement("div");d.className="eq-tree-leaf",d.innerHTML=`
          <strong style="color:#ffffff; min-width: 80px;">${r.label}:</strong>
          <span style="flex:1; word-break: break-word; color:#aaaaaa;">${r.value}</span>
          ${r.badge?`<span class="eq-tree-badge">${r.badge}</span>`:""}
        `,n.appendChild(d)}return s.addEventListener("click",()=>{let r=n.style.display==="none";n.style.display=r?"flex":"none";let d=s.querySelector(".eq-tree-arrow");d&&(d.textContent=r?"\u25BC":"\u25B6")}),i.appendChild(s),i.appendChild(n),i}toggle(e){e!==void 0?this.isCollapsed=!e:this.isCollapsed=!this.isCollapsed,this.isCollapsed?this.sidebarEl.classList.add("eq-collapsed"):(this.sidebarEl.classList.remove("eq-collapsed"),this.apiKeyInput.value||(this.switchTab("settings"),this.apiKeyInput.focus()))}setBusy(e,t){this.analyzeBtn.disabled=e,[this.modelSelect,this.modeSelect,this.engineSelect,this.dryRunCheckbox,this.autoApplyCheckbox,this.autoAdvanceCheckbox,this.useVisionCheckbox].forEach(o=>o.disabled=e),e?(this.startStopwatch(),this.dotPulseAp.className="eq-dot-pulse busy",this.dotPulseAdv.className="eq-dot-pulse busy",this.launcherDot.className="eq-launcher-dot busy",t&&this.setStatus(t,"info")):(this.stopStopwatch(),this.dotPulseAp.className="eq-dot-pulse",this.dotPulseAdv.className="eq-dot-pulse",this.launcherDot.className="eq-launcher-dot")}setStatus(e,t="info"){this.statusTextAp.textContent=e,this.statusTextAdv.textContent=e,t==="error"?(this.dotPulseAp.className="eq-dot-pulse error",this.dotPulseAdv.className="eq-dot-pulse error",this.launcherDot.className="eq-launcher-dot error"):t==="success"&&(this.dotPulseAp.className="eq-dot-pulse",this.dotPulseAdv.className="eq-dot-pulse",this.launcherDot.className="eq-launcher-dot");let o=e.includes("Alternando")||e.includes("indispon\xEDvel")||e.includes("fallback")||e.includes("alternativo"),i=t==="error"?"> [ERRO] ":t==="success"?"> [SUCESSO] ":o?"> [FALLBACK] ":"> [SYS] ",s=t==="error"?"text-red":t==="success"?"text-green":o?"text-yellow":"text-blue";this.logToConsole(`${i}${e}`,s)}setPlan(e,t){this.latestPlan=e,this.resultContainer.style.display="flex",e.durationMs&&this.stopStopwatch(e.durationMs);let o=this.shadow.querySelector("#eq-badges");o.innerHTML=`
      <span class="eq-brand-badge">${e.mode.replace("_"," ")}</span>
      <span class="eq-brand-badge" style="color: #00ff55; border-color: rgba(0, 255, 85, 0.4);">${Math.round(e.confidence*100)}% Confian\xE7a</span>
      <span class="eq-brand-badge">${e.actions.length} Cmds</span>
      ${e.usedModel?`<span class="eq-brand-badge" style="border-color: rgba(91, 192, 235, 0.5); color: #5bc0eb;">${e.usedModel}</span>`:""}
    `;let i=this.shadow.querySelector("#eq-rationale-text");i.textContent=e.rationale;let s=this.shadow.querySelector("#eq-actions-list");s.innerHTML="";for(let n of e.actions){let r=document.createElement("div");r.className="eq-action-item";let d="";n.t==="chk"?d=`chk ${n.id} (${n.c})`:n.t==="val"?d=`val "${n.v}" -> ${n.id}`:n.t==="sel"?d=`sel "${Array.isArray(n.v)?n.v.join(","):n.v}" -> ${n.id}`:n.t==="clk"?d=`clk ${n.id}`:n.t==="adv"?d="adv":n.t==="js"?d=`js: ${String(n.v).slice(0,40)}...`:n.t==="drag"&&(d=`drag "${n.from}" -> "${n.to}"`),r.innerHTML=`<span class="eq-action-badge">${n.t.toUpperCase()}</span> <span>${d}</span>`,s.appendChild(r)}this.applyBtn.disabled=!t||!e.actions.length,this.refreshInspectorView()}setInspectorPrompt(e,t){this.latestPromptText=e,this.inspPrompt&&(this.inspPrompt.textContent=e),t&&this.inspModel&&(this.inspModel.textContent=t),this.inspLatency&&(this.inspLatency.textContent="Aguardando IA...")}refreshInspectorView(){let e=this.latestPlan;if(e)if(this.inspModel.textContent=e.usedModel||this.initialSettings.model,this.inspLatency.textContent=e.durationMs?`${e.durationMs}ms`:"--",this.inspTokens.textContent=e.tokensUsed?`${e.tokensUsed}`:"--",this.inspPrompt.textContent=e.promptSent||this.latestPromptText||"Prompt n\xE3o registrado para esta requisi\xE7\xE3o.",this.inspRationale.textContent=e.rationale,this.inspActions.innerHTML="",e.actions.length>0)for(let t of e.actions){let o=document.createElement("div");o.className="eq-action-item",o.textContent=JSON.stringify(t),this.inspActions.appendChild(o)}else this.inspActions.innerHTML='<div class="text-muted" style="padding: 4px;">Nenhuma a\xE7\xE3o prescrita pela IA.</div>';else this.latestPromptText&&(this.inspPrompt.textContent=this.latestPromptText)}showFloatingAnswers(e){let t=e||this.latestPlan;t&&this.floatingAnswers.show(t)}hideFloatingAnswers(){this.floatingAnswers.hide()}isFloatingAnswersOpen(){return this.floatingAnswers.isOpen()}updateModelSelect(e,t){let o=t||this.initialSettings.model||this.modelSelect.value;this.modelSelect.innerHTML="";let i=!1;e.forEach(s=>{let n=s.id===o;n&&(i=!0),this.modelSelect.add(new Option(s.name,s.id,!1,n))}),!i&&o&&this.modelSelect.add(new Option(`Gemini (${o})`,o,!1,!0)),this.modelSelect.value=o}updateSelectedModel(e){Array.from(this.modelSelect.options).some(o=>o.value===e)||this.modelSelect.add(new Option(`Gemini (${e})`,e,!1,!0)),this.modelSelect.value=e}applyHostDarkMode(e){let t="eq-host-dark-mode-style",o=document.getElementById(t);if(e){let i=window.getComputedStyle(document.body).backgroundColor;(i.includes("rgba(0, 0, 0, 0)")||i==="transparent")&&(i=window.getComputedStyle(document.documentElement).backgroundColor);let s=i.match(/\d+(\.\d+)?/g);if(s&&s.length>=3&&(s[3]!==void 0?parseFloat(s[3]):1)>.1){let r=parseInt(s[0]),d=parseInt(s[1]),l=parseInt(s[2]);if((r*299+d*587+l*114)/1e3<100)return}o||(o=document.createElement("style"),o.id=t,o.innerHTML=`
          html { filter: invert(1) hue-rotate(180deg) !important; background: #fff !important; }
          img, video, canvas, [style*="background-image"] { filter: invert(1) hue-rotate(180deg) !important; }
        `,document.head.appendChild(o)),this.host.classList.add("eq-dark-mode-active")}else this.host.classList.remove("eq-dark-mode-active"),o&&o.remove()}destroy(){this.stopStopwatch(),this.autopilot.stop(),this.applyHostDarkMode(!1),this.callbacks.onDestroy(),this.host.remove()}};async function lt(){let a=window;if(a.__easyquiz){a.__easyquiz.toggle();return}let e=de(),t=null,o=new se(e,{onAnalyze:(n=1)=>i(n),onApply:(n=1)=>void s(n),onDestroy:()=>{G(),delete a.__easyquiz},onSettingsChange:n=>{e=ke(n)}});a.__easyquiz={toggle:()=>o.toggle(),destroy:()=>o.destroy(),analyze:async()=>{await i()}},window.addEventListener("keydown",n=>{if(n.altKey&&(n.key==="q"||n.key==="Q")){if(n.preventDefault(),!o)return;o.toggle(!0),i()}});async function i(n=1){if(!e.apiKey){o.setStatus("Configure sua chave de API Gemini acima para come\xE7ar.","error"),o.toggle(!0);return}o.setBusy(!0,"Identificando o bloco da quest\xE3o ativa na p\xE1gina..."),o.setProgress(20,"Varrendo escopo do DOM e controles..."),G(),o.hideFloatingAnswers();try{let r=D(!1);r||(o.setStatus("Nenhum controle detectado. Tentando captura de tela inteira...","info"),r=$()),Ce(r.scope),o.updateContext(r),o.logToConsole(`> [DOM] Escopo: <${r.scope.tagName.toLowerCase()}> com ${r.controls.length} controle(s) e ${r.questionText.length} caracteres.`,"text-blue"),o.setStatus(`Quest\xE3o localizada (${r.controls.length} controles). Preparando an\xE1lise...`,"info"),o.setProgress(40,`Consultando Gemini (${e.model})...`);let d=await qe(r.scope,e.useVision);o.setStatus(d.length>0?`Consultando Gemini (${e.model}) com ${d.length} imagem(ns) anexada(s)...`:`Consultando Gemini (${e.model}) via DOM nativo (modo r\xE1pido)...`,"info");let l=B(r,d,e);o.setInspectorPrompt(l,e.model);let{plan:c,usedModel:u}=await me(r,d,e,(m,p)=>{o.setStatus(m,p==="warning"?"info":p)});if(c.needsMoreContext){o.setProgress(55,"Ampliando escopo da quest\xE3o..."),o.setStatus("Enunciado ou contexto isolado detectado pela IA. Acionando Sele\xE7\xE3o Geral Expandida...","info"),r=D(!0),r||(r=$()),Ce(r.scope),o.updateContext(r),d=await qe(r.scope,e.useVision),o.setStatus(`Reconsultando IA com escopo ampliado (${r.controls.length} controles)...`,"info");let m=B(r,d,e);o.setInspectorPrompt(m,e.model),c=(await me(r,d,e,(h,b)=>{o.setStatus(h,b==="warning"?"info":b)})).plan}return o.setProgress(70,"Resposta recebida da IA! Processando plano..."),o.logToConsole(`> [IA] Modelo: ${u||e.model} | Modo: ${c.mode} | Confian\xE7a: ${(c.confidence*100).toFixed(0)}%`,"text-green"),c.rationale&&o.logToConsole(`> [IA] Racioc\xEDnio: "${c.rationale}"`,"text-blue"),o.logToConsole(`> [IA] ${c.actions.length} a\xE7\xE3o(\xF5es) prescritas no plano.`,"text-blue"),c.memoryToStore&&(Le(c.memoryToStore),o.logToConsole(`> [RAG] \u{1F9E0} Nova mem\xF3ria te\xF3rica salva na sess\xE3o: "${c.memoryToStore}"`,"text-yellow")),t=c,o.updateContext(r,c),De(c.actions),o.setPlan(c,!e.dryRun),c.pageType==="conclusion"?(o.setProgress(100,"Atividade conclu\xEDda!"),o.setStatus("Atividade conclu\xEDda ou tela final detectada pela IA.","success")):c.pageType==="info"?(o.setProgress(100,"Contexto absorvido na mem\xF3ria!"),o.setStatus("\u{1F4D8} Conte\xFAdo de contexto absorvido na mem\xF3ria RAG. Avan\xE7ando...","success")):c.pageType==="start"?(o.setProgress(100,"In\xEDcio detectado!"),o.setStatus("In\xEDcio de atividade detectado. Iniciando...","info")):(o.setProgress(80,"Plano de resolu\xE7\xE3o pronto!"),o.setStatus(e.dryRun?"Simula\xE7\xE3o conclu\xEDda. As respostas foram real\xE7adas na p\xE1gina sem altera\xE7\xE3o.":"Resolu\xE7\xE3o pronta! Verifique o realce na tela e aplique quando desejar.","success")),e.dryRun&&c.pageType==="question"&&o.showFloatingAnswers(c),e.autoApply&&!e.dryRun&&await s(n),c}catch(r){G(),o.setProgress(0);let d=r instanceof Error?r.message:"Falha desconhecida na an\xE1lise.";o.setStatus(d,"error");return}finally{o.setBusy(!1)}}async function s(n=1){if(!t){o.setStatus("Nenhum plano dispon\xEDvel para aplicar. Execute a an\xE1lise primeiro.","error");return}if(e.dryRun){o.setStatus("O modo de simula\xE7\xE3o est\xE1 ativo. Desmarque para poder aplicar.","error");return}let r=t.pageType==="info"||t.pageType==="start",d=(e.autoAdvance||r||n>=2)&&t.confidence>=e.confidenceThreshold&&!t.needsMoreContext;o.setBusy(!0,"Aplicando respostas no formul\xE1rio..."),o.setProgress(85,`Aplicando ${t.actions.length} a\xE7\xE3o(\xF5es) no formul\xE1rio...`),o.logToConsole(`> [EXEC] Iniciando aplica\xE7\xE3o com 6 vias de persist\xEAncia para ${t.actions.length} a\xE7\xE3o(\xF5es)...`,"text-blue");try{let l=await Ee(t,d,n);l.success||l.advanced?(o.setProgress(100,"Sucesso! Respostas preenchidas e validadas!"),o.logToConsole(`> [VERIF] \u2713 Sucesso no DOM: ${l.verified}/${l.applied} a\xE7\xF5es validadas com sucesso!`,"text-green"),l.advanced&&o.logToConsole("> [NAV] \u2713 Bot\xE3o de confirma\xE7\xE3o/avan\xE7o acionado com sucesso!","text-green"),o.setStatus(`Sucesso: ${l.applied} resposta(s) preenchida(s)${l.advanced?" e pr\xF3xima quest\xE3o acionada":""}.`,"success"),o.hideFloatingAnswers()):l.verified>0?(o.setProgress(90,"Respostas preenchidas!"),o.logToConsole(`> [VERIF] \u2713 Alternativa(s) marcada(s) no DOM (${l.verified}/${l.applied} validadas). Pronto para prosseguir!`,"text-green"),o.setStatus(`Respostas preenchidas (${l.verified}/${l.applied} validadas no DOM).`,"success"),o.hideFloatingAnswers()):t.pageType==="question"&&(l.verified===0||n>=3)?(o.setProgress(0),o.logToConsole(`> [VERIF] \u26A0\uFE0F Nenhuma a\xE7\xE3o p\xF4de ser validada no DOM (${l.verified}/${l.applied}). Abrindo Gabarito Flutuante para aux\xEDlio manual.`,"text-yellow"),o.setStatus("Aviso: O formul\xE1rio requer intera\xE7\xE3o manual direta. Gabarito Flutuante exibido na tela.","info"),o.showFloatingAnswers(t)):o.hideFloatingAnswers()}catch(l){o.setProgress(0);let c=l instanceof Error?l.message:"Falha ao aplicar plano.";o.setStatus(c,"error"),t.pageType==="question"&&n>=3?o.showFloatingAnswers(t):o.hideFloatingAnswers()}finally{o.setBusy(!1)}}o.toggle(!0)}lt().catch(a=>{console.error("[EasyQuiz] Erro fatal na inicializa\xE7\xE3o:",a),window.alert(`EasyQuiz: falha ao iniciar: ${a instanceof Error?a.message:String(a)}`)});})();
