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

// Extract version
let version = 'v3.5.5';
try {
  const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'));
  if (pkg.version) version = pkg.version.startsWith('v') ? pkg.version : `v${pkg.version}`;
} catch {
  const verMatch = legacyCode.match(/EasyQuiz\s+(v\d+\.\d+\.\d+)/);
  if (verMatch) version = verMatch[1];
}

// Encode bundles as base64 — eliminates all CDN / cache problems
const legacyB64   = Buffer.from(legacyCode,   'utf8').toString('base64');
const discreteB64 = Buffer.from(discreteCode, 'utf8').toString('base64');

// ── structural updates ────────────────────────────────────────────────────────
const topbarMatch = indexHtml.match(/<header class="navbar">([\s\S]*?)<\/header>/);
const topbarHtml  = topbarMatch ? topbarMatch[0] : '';

playgroundHtml = playgroundHtml
  .replace(/<header class="khan-topbar">[\s\S]*?<\/header>/, topbarHtml)
  .replace(/class="nav-btn active"/, 'class="nav-btn"');

// Clean duplicate styles, scripts and cache-control in head
playgroundHtml = playgroundHtml.replace(/(?:\s*<link rel="stylesheet" href="css\/style\.css\?v=[^"]*">\s*<script src="https:\/\/unpkg\.com\/lucide[^"]*"><\/script>)+/g, '');
playgroundHtml = playgroundHtml.replace(/(?:\s*<meta http-equiv="(?:Cache-Control|Pragma|Expires)"[^>]*>)+/gi, '');
playgroundHtml = playgroundHtml.replace(/(?:\s*<script>\s*\(function\(\)\s*\{[\s\S]*?URLSearchParams[\s\S]*?<\/script>)+/gi, '');
playgroundHtml = playgroundHtml.replace(/<head>/i, `<head>
  <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate, max-age=0">
  <meta http-equiv="Pragma" content="no-cache">
  <meta http-equiv="Expires" content="0">
  <script>
    (function() {
      try {
        var v = "${version.replace(/^v/, '')}";
        var p = new URLSearchParams(window.location.search);
        if (p.get('v') !== v) {
          p.set('v', v);
          window.location.replace(window.location.pathname + '?' + p.toString());
        }
      } catch(e) {}
    })();
  </script>`);
playgroundHtml = playgroundHtml.replace(/<\/head>/, `  <link rel="stylesheet" href="css/style.css?v=5.9.9">\n  <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>\n</head>`);

// Clean duplicate backdrops
playgroundHtml = playgroundHtml.replace(/(?:\s*<div id="bg-dom"><\/div>\s*<div class="global-backdrop" id="global-backdrop"><\/div>)+/g, '');
playgroundHtml = playgroundHtml.replace(/<body>\s*/, `<body>\n<div id="bg-dom"></div>\n<div class="global-backdrop" id="global-backdrop"></div>\n`);
playgroundHtml = playgroundHtml.replace(/<title>.*?<\/title>/, '<title>Playground - EasyQuiz</title>');

// ── inline injector panel ─────────────────────────────────────────────────────
const injectorPanel = `
<div class="mega-container glass" style="max-width: 900px; margin: 30px auto 10px; padding: 20px;">
  <div class="section-heading" style="margin-bottom: 15px;">
    <h2 style="font-size: 1.2rem; display: flex; align-items: center; gap: 8px;">
      <i data-lucide="flask-conical"></i> Modo de Injecao
      <span style="font-size:0.75rem;padding:2px 8px;border-radius:4px;background:rgba(251,191,36,0.15);color:#fbbf24;font-weight:600;margin-left:6px;">${version} mais recente</span>
    </h2>
  </div>
  <p style="color: var(--text-muted); margin-bottom: 20px; font-size: 0.9rem;">
    Codigo embutido diretamente no HTML em tempo de build — sem fetch externo, sem CDN, sem cache desatualizado.
  </p>
  <div class="features-grid" style="grid-template-columns: 1fr 1fr; gap: 15px;">
    <div class="feature-card glass" style="padding: 15px; cursor: pointer; border: 1px solid rgba(251,191,36,0.25);" onclick="injectBundle('legacy')">
      <div class="feature-icon"><i data-lucide="panel-top"></i></div>
      <h3 style="font-size: 1rem; margin-top: 10px;">Injetar Legacy Mode</h3>
      <p style="font-size: 0.8rem; color: #fbbf24; font-weight: 600;">Interface completa · ${version}</p>
    </div>
    <div class="feature-card glass" style="padding: 15px; cursor: pointer; border: 1px solid rgba(168,85,247,0.25);" onclick="injectBundle('discrete')">
      <div class="feature-icon"><i data-lucide="eye-off"></i></div>
      <h3 style="font-size: 1rem; margin-top: 10px;">Injetar Discrete Mode</h3>
      <p style="font-size: 0.8rem; color: #c084fc; font-weight: 600;">Modo invisivel · ${version}</p>
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
  var oldHost = document.getElementById('easyquiz-shadow-root');
  if (oldHost) { try { oldHost.remove(); } catch(e){} }
  var oldDisc = document.getElementById('eq-discrete-root');
  if (oldDisc) { try { oldDisc.remove(); } catch(e){} }
  var b64 = __EQ_B64[name];
  if (!b64) { showPgToast('Bundle nao encontrado: ' + name); return; }
  try {
    var code = decodeURIComponent(escape(atob(b64)));
    ;(0, eval)(code);
    showPgToast('Injetado ' + name + ' (${version}) com sucesso!');
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

// Remove existing injector panels and inline bundles to prevent duplication
playgroundHtml = playgroundHtml.replace(/<div class="mega-container glass"[\s\S]*?<\/script>/g, '');
playgroundHtml = playgroundHtml.replace(/<script id="eq-inline-bundles">[\s\S]*?<\/script>/g, '');

// Clean duplicate toasts
playgroundHtml = playgroundHtml.replace(/(?:\s*<div id="toast">[\s\S]*?<\/script>\s*)+/g, '');

// Insert before <main>
playgroundHtml = playgroundHtml.replace(/<main class="quiz-main".*?>/, (m) => injectorPanel + '\n' + m);

// Remove old buttons / scripts
playgroundHtml = playgroundHtml
  .replace(/<button[^>]*id="btn-inject-script"[^>]*>.*?<\/button>/s, '')
  .replace(/<script>\s*\/\/\s*INJETOR DO SCRIPT EASYQUIZ[\s\S]*?<\/script>/, '');

// Footer: toast + lucide init
playgroundHtml = playgroundHtml.replace(/<\/body>/,
  `\n<div id="toast"><i data-lucide="check-circle-2"></i><span class="toast-msg">Sucesso!</span></div>\n<script>lucide.createIcons();</script>\n</body>`);

// Clean excessive blank lines
playgroundHtml = playgroundHtml.replace(/\n{3,}/g, '\n\n');

fs.writeFileSync(playgroundPath, playgroundHtml, 'utf8');
const kb = (Buffer.byteLength(playgroundHtml, 'utf8') / 1024).toFixed(0);
console.log('Playground created and updated. (' + kb + ' KB inline, version ' + version + ')');
