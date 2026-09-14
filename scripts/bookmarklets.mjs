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
  return `javascript:(function(){function L(f){var v='?v='+Date.now();return fetch('${cdnBase}/'+f+v,{cache:'no-store'}).then(function(r){if(!r.ok)throw 1;return r.text()}).catch(function(){return fetch('${fastlyBase}/'+f+v,{cache:'no-store'}).then(function(r){if(!r.ok)throw 2;return r.text()})}).catch(function(){return fetch('${rawBase}/'+f+v,{cache:'no-store'}).then(function(r){if(!r.ok)throw 3;return r.text()})}).then(function(t){if(!t||t.trim().charAt(0)==='<')throw new Error('Código indisponível');return t})}L('${bundle}').then(function(c){try{${cleanup}(0,eval)(c)}catch(e){alert('EasyQuiz ${label} erro: '+e)}}).catch(function(e){alert('EasyQuiz ${label} falha no download: '+e)})})();`
}

export function createBookmarklets(gitHash = 'latest') {
  const cdnBase = `https://cdn.jsdelivr.net/gh/${githubRepo}@${gitHash}/dist`
  const fastlyBase = `https://fastly.jsdelivr.net/gh/${githubRepo}@${gitHash}/dist`
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
