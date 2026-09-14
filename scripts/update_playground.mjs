import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const playgroundPath = path.join(__dirname, '..', 'docs', 'playground.html');
const indexPath = path.join(__dirname, '..', 'docs', 'index.html');

let playgroundHtml = fs.readFileSync(playgroundPath, 'utf8');
const indexHtml = fs.readFileSync(indexPath, 'utf8');

// Extract topbar from indexHtml
const topbarMatch = indexHtml.match(/<header class="navbar">([\s\S]*?)<\/header>/);
const topbarHtml = topbarMatch ? topbarMatch[0] : '';

// Replace khan-topbar with the new topbar in playground
playgroundHtml = playgroundHtml.replace(/<header class="khan-topbar">[\s\S]*?<\/header>/, topbarHtml);

// Replace active nav-btn
playgroundHtml = playgroundHtml.replace(/class="nav-btn active"/, 'class="nav-btn"');

// Replace CSS and add lucide script
playgroundHtml = playgroundHtml.replace(
  /<\/head>/,
  `  <link rel="stylesheet" href="css/style.css?v=5.9.9">\n  <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>\n</head>`
);

// Add bg-dom and global-backdrop after body
playgroundHtml = playgroundHtml.replace(
  /<body>/,
  `<body>\n<div id="bg-dom"></div>\n<div class="global-backdrop" id="global-backdrop"></div>`
);

// Replace title
playgroundHtml = playgroundHtml.replace(
  /<title>.*?<\/title>/,
  `<title>Playground - EasyQuiz</title>`
);

// Add Mode Injector Panel just before the main content
const injectorPanel = `
<div class="mega-container glass" style="max-width: 900px; margin: 30px auto 10px; padding: 20px;">
  <div class="section-heading" style="margin-bottom: 15px;">
    <h2 style="font-size: 1.2rem; display: flex; align-items: center; gap: 8px;"><i data-lucide="flask-conical"></i> Modo de Injeção</h2>
  </div>
  <p style="color: var(--text-muted); margin-bottom: 20px; font-size: 0.9rem;">
    Escolha qual versão do EasyQuiz você deseja injetar nesta página de testes.
  </p>
  <div class="features-grid" style="grid-template-columns: 1fr 1fr; gap: 15px;">
    <div class="feature-card glass" style="padding: 15px; cursor: pointer;" onclick="injectScript('easyquiz.js')">
      <div class="feature-icon"><i data-lucide="panel-top"></i></div>
      <h3 style="font-size: 1rem; margin-top: 10px;">Injetar Legacy Mode</h3>
      <p style="font-size: 0.8rem;">Modo de interface completa</p>
    </div>
    <div class="feature-card glass" style="padding: 15px; cursor: pointer;" onclick="injectScript('discrete.js')">
      <div class="feature-icon"><i data-lucide="eye-off"></i></div>
      <h3 style="font-size: 1rem; margin-top: 10px;">Injetar Discrete Mode</h3>
      <p style="font-size: 0.8rem;">Modo invisível / atalhos</p>
    </div>
  </div>
</div>

<script>
  async function injectScript(baseName) {
    if (window.__easyquiz)  { try { window.__easyquiz.destroy();  } catch(e){} }
    if (window.__eqdiscrete){ try { window.__eqdiscrete.destroy(); } catch(e){} }

    const urls = [
      './' + baseName,
      'https://raw.githubusercontent.com/minifoxie/EasyQuiz/main/docs/' + baseName,
      'https://cdn.jsdelivr.net/gh/minifoxie/EasyQuiz@main/docs/' + baseName,
      'https://raw.githubusercontent.com/minifoxie/EasyQuiz/main/dist/' + baseName,
    ];

    showToast('Carregando ' + baseName + '...');

    for (const base of urls) {
      try {
        const resp = await fetch(base + '?t=' + Date.now(), { cache: 'no-store' });
        if (!resp.ok) continue;
        const code = await resp.text();
        if (!code || code.trim().startsWith('<')) continue;
        ;(0, eval)(code);
        showToast('✓ ' + baseName + ' injetado!');
        return;
      } catch(e) { /* try next */ }
    }
    showToast('❌ Falha: ' + baseName);
  }

  function showToast(msg) {
    let t = document.getElementById('toast');
    if (!t) {
      t = document.createElement('div'); t.id = 'toast';
      t.innerHTML = '<i data-lucide="check-circle-2"></i><span class="toast-msg"></span>';
      document.body.appendChild(t);
      if (window.lucide) window.lucide.createIcons();
    }
    t.querySelector('.toast-msg').textContent = msg;
    t.classList.add('show');
    clearTimeout(t._ti);
    t._ti = setTimeout(() => t.classList.remove('show'), 3500);
  }
</script>
`;

// Remove existing injector panels to prevent duplication
playgroundHtml = playgroundHtml.replace(/<div class="mega-container glass"[\s\S]*?<\/script>/g, '');

playgroundHtml = playgroundHtml.replace(/<main class="quiz-main".*?>/, (match) => injectorPanel + '\n' + match);

// Remove the old inject button from topbar if it exists
playgroundHtml = playgroundHtml.replace(/<button[^>]*id="btn-inject-script"[^>]*>.*?<\/button>/s, '');
// Remove old inject script logic at the bottom
playgroundHtml = playgroundHtml.replace(/<script>\s*\/\/\s*INJETOR DO SCRIPT EASYQUIZ[\s\S]*?<\/script>/, '');

// Add toast and update lucide icons
playgroundHtml = playgroundHtml.replace(/<\/body>/, `<div id="toast"><i data-lucide="check-circle-2"></i><span class="toast-msg">Sucesso!</span></div>\n<script>lucide.createIcons();</script>\n</body>`);

fs.writeFileSync(playgroundPath, playgroundHtml, 'utf8');
console.log('Playground created and updated.');
