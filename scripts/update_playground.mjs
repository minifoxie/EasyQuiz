import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const playgroundPath = path.join(__dirname, '..', 'docs', 'playground.html');
const indexPath      = path.join(__dirname, '..', 'docs', 'index.html');
const distDir        = path.join(__dirname, '..', 'dist');

let playgroundHtml   = fs.readFileSync(playgroundPath, 'utf8');
const indexHtml      = fs.readFileSync(indexPath,      'utf8');

// Read built bundles
const legacyCode     = fs.readFileSync(path.join(distDir, 'easyquiz.js'), 'utf8');
const discreteCode   = fs.readFileSync(path.join(distDir, 'discrete.js'), 'utf8');

// Extract version (specifically vMAJOR.MINOR.PATCH where MAJOR >= 2)
const verMatch = legacyCode.match(/v2\.\d+\.\d+/);
const version  = verMatch ? verMatch[0] : 'unknown';

// Encode bundles as base64 — eliminates all CDN / cache problems
const legacyB64   = Buffer.from(legacyCode,   'utf8').toString('base64');
const discreteB64 = Buffer.from(discreteCode, 'utf8').toString('base64');

// ── structural updates ────────────────────────────────────────────────────────
const topbarMatch = indexHtml.match(/<header class="navbar">([\s\S]*?)<\/header>/);
const topbarHtml  = topbarMatch ? topbarMatch[0] : '';

playgroundHtml = playgroundHtml
  .replace(/<header class="khan-topbar">[\s\S]*?<\/header>/, topbarHtml)
  .replace(/class="nav-btn active"/, 'class="nav-btn"')
  .replace(/<\/head>/, `  <link rel="stylesheet" href="css/style.css?v=5.9.9">\n  <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>\n</head>`)
  .replace(/<body>/, `<body>\n<div id="bg-dom"></div>\n<div class="global-backdrop" id="global-backdrop"></div>`)
  .replace(/<title>.*?<\/title>/, '<title>Playground - EasyQuiz</title>');

// ── inline injector panel ─────────────────────────────────────────────────────
const injectorPanel = `
<div class="mega-container glass" style="max-width: 900px; margin: 30px auto 10px; padding: 20px;">
  <div class="section-heading" style="margin-bottom: 15px;">
    <h2 style="font-size: 1.2rem; display: flex; align-items: center; gap: 8px;">
      <i data-lucide="flask-conical"></i> Modo de Injecao
      <span style="font-size:0.7rem;opacity:0.5;font-weight:400;margin-left:6px;">${version} embutido</span>
    </h2>
  </div>
  <p style="color: var(--text-muted); margin-bottom: 20px; font-size: 0.9rem;">
    Codigo embutido em tempo de build — sem fetch, sem CDN, sem cache.
  </p>
  <div class="features-grid" style="grid-template-columns: 1fr 1fr; gap: 15px;">
    <div class="feature-card glass" style="padding: 15px; cursor: pointer;" onclick="injectBundle('legacy')">
      <div class="feature-icon"><i data-lucide="panel-top"></i></div>
      <h3 style="font-size: 1rem; margin-top: 10px;">Injetar Legacy Mode</h3>
      <p style="font-size: 0.8rem;">Interface completa · ${version}</p>
    </div>
    <div class="feature-card glass" style="padding: 15px; cursor: pointer;" onclick="injectBundle('discrete')">
      <div class="feature-icon"><i data-lucide="eye-off"></i></div>
      <h3 style="font-size: 1rem; margin-top: 10px;">Injetar Discrete Mode</h3>
      <p style="font-size: 0.8rem;">Modo invisivel · ${version}</p>
    </div>
  </div>
</div>

<script id="eq-inline-bundles">
var __EQ_B64 = {
  legacy:   "${legacyB64}",
  discrete: "${discreteB64}"
};
function injectBundle(name) {
  if (window.__easyquiz)   { try { window.__easyquiz.destroy();  } catch(e){} }
  if (window.__eqdiscrete) { try { window.__eqdiscrete.destroy();} catch(e){} }
  var b64 = __EQ_B64[name];
  if (!b64) { showPgToast('Bundle nao encontrado: ' + name); return; }
  try {
    var code = decodeURIComponent(escape(atob(b64)));
    ;(0, eval)(code);
    showPgToast('Injetado ' + name + ' (${version})');
  } catch(e) {
    showPgToast('Erro: ' + (e && e.message || String(e)));
    console.error('[EQ]', e);
  }
}
function injectScript(n) { injectBundle(n === 'discrete.js' ? 'discrete' : 'legacy'); }
function showPgToast(msg) {
  var t = document.getElementById('toast');
  if (!t) {
    t = document.createElement('div'); t.id = 'toast';
    t.innerHTML = '<i data-lucide="check-circle-2"></i><span class="toast-msg"></span>';
    document.body.appendChild(t);
    if (window.lucide) window.lucide.createIcons();
  }
  t.querySelector('.toast-msg').textContent = msg;
  t.classList.add('show');
  clearTimeout(t._ti);
  t._ti = setTimeout(function(){ t.classList.remove('show'); }, 3500);
}
</script>
`;

// Remove existing injector panels to prevent duplication
playgroundHtml = playgroundHtml.replace(/<div class="mega-container glass"[\s\S]*?<\/script>/g, '');

// Insert before <main>
playgroundHtml = playgroundHtml.replace(/<main class="quiz-main".*?>/, (m) => injectorPanel + '\n' + m);

// Remove old buttons / scripts
playgroundHtml = playgroundHtml
  .replace(/<button[^>]*id="btn-inject-script"[^>]*>.*?<\/button>/s, '')
  .replace(/<script>\s*\/\/\s*INJETOR DO SCRIPT EASYQUIZ[\s\S]*?<\/script>/, '');

// Footer: toast + lucide init
playgroundHtml = playgroundHtml.replace(/<\/body>/,
  `<div id="toast"><i data-lucide="check-circle-2"></i><span class="toast-msg">Sucesso!</span></div>\n<script>lucide.createIcons();</script>\n</body>`);

fs.writeFileSync(playgroundPath, playgroundHtml, 'utf8');
const kb = (Buffer.byteLength(playgroundHtml, 'utf8') / 1024).toFixed(0);
console.log('Playground created and updated. (' + kb + ' KB inline, version ' + version + ')');
