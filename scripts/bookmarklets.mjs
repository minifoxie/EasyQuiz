const githubRepo = 'minifoxie/EasyQuiz'

function cdnBookmarklet({ bundle, label, cdnBase }) {
  const errorLabel = `EasyQuiz ${label} falha no download: `
  const activeLabel = `EasyQuiz ${label} erro: `
  const cleanup = label === 'Discreto'
    ? "if(window.__eqdiscrete&&typeof window.__eqdiscrete.destroy==='function'){window.__eqdiscrete.destroy()}"
    : "if(window.__easyquiz&&typeof window.__easyquiz.destroy==='function'){window.__easyquiz.destroy()}var h=document.getElementById('easyquiz-shadow-root');if(h)h.remove();"
  return `javascript:(function(){fetch('${cdnBase}/${bundle}?v='+Date.now(),{cache:'no-store'}).then(function(r){if(!r.ok)throw new Error('HTTP '+r.status);return r.text()}).then(function(c){if(!c||c.trim().charAt(0)==='<')throw new Error('Código indisponível');try{${cleanup}(0,eval)(c)}catch(e){alert('${activeLabel}'+e)}}).catch(function(e){alert('${errorLabel}'+e)})})();`
}

function multiCdnBookmarklet({ bundle, label, cdnBase, fastlyBase, rawBase }) {
  const cleanup = label === 'Discreto'
    ? "if(window.__eqdiscrete&&typeof window.__eqdiscrete.destroy==='function'){window.__eqdiscrete.destroy()}"
    : "if(window.__easyquiz&&typeof window.__easyquiz.destroy==='function'){window.__easyquiz.destroy()}var h=document.getElementById('easyquiz-shadow-root');if(h)h.remove();"
  // Estratégia: tenta 3 CDNs via fetch. Se TODOS falharem (CSP bloqueando fetch),
  // usa fallback via <script> tag que contorna connect-src mas permite script-src.
  // Falha silenciosamente se nada funcionar (mantém o poll de injeção ativo caso o problema seja DOM-related).
  return `javascript:(function(){function L(f){var v='?v='+Date.now();return fetch('${cdnBase}/'+f+v,{cache:'no-store'}).then(function(r){if(!r.ok)throw 1;return r.text()}).catch(function(){return fetch('${fastlyBase}/'+f+v,{cache:'no-store'}).then(function(r){if(!r.ok)throw 2;return r.text()})}).catch(function(){return fetch('${rawBase}/'+f+v,{cache:'no-store'}).then(function(r){if(!r.ok)throw 3;return r.text()})}).then(function(t){if(!t||t.trim().charAt(0)==='<')throw new Error('Código indisponível');return t})}L('${bundle}').then(function(c){try{${cleanup}(0,eval)(c)}catch(e){console.warn('EasyQuiz ${label} erro: '+e)}}).catch(function(){var s=document.createElement('script');s.src='${cdnBase}/${bundle}?v='+Date.now();s.onload=function(){s.remove()};s.onerror=function(){s.remove();var s2=document.createElement('script');s2.src='${rawBase}/${bundle}?v='+Date.now();s2.onload=function(){s2.remove()};s2.onerror=function(){s2.remove();/* Falha silenciosa agressiva */};document.head.appendChild(s2)};document.head.appendChild(s)})})();`
}

export function createBookmarklets(gitHash = 'latest') {
  const resolvedHash = gitHash && gitHash !== 'latest' ? gitHash : 'main'
  const cdnBase = `https://cdn.jsdelivr.net/gh/${githubRepo}@${resolvedHash}/dist`
  const fastlyBase = `https://fastly.jsdelivr.net/gh/${githubRepo}@${resolvedHash}/dist`
  const rawBase = `https://raw.githubusercontent.com/${githubRepo}/main/dist`
  const discreteFallback = multiCdnBookmarklet({ bundle: 'discrete.js', label: 'Discreto', cdnBase, fastlyBase, rawBase })
  const legacyFallback = multiCdnBookmarklet({ bundle: 'easyquiz.js', label: 'Legacy', cdnBase, fastlyBase, rawBase })
  return {
    version: gitHash,
    repo: githubRepo,
    discrete: discreteFallback,
    legacy: legacyFallback,
    discreteDirect: cdnBookmarklet({ bundle: 'discrete.js', label: 'Discreto', cdnBase }),
    legacyDirect: cdnBookmarklet({ bundle: 'easyquiz.js', label: 'Legacy', cdnBase }),
    discreteFallback,
    legacyFallback
  }
}
