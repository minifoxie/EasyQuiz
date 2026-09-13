/* EasyQuiz App v4.7 */
'use strict';

// ─── OVERLAY BACKDROP MANAGER ──────────────────────────────────────
const bkd = document.getElementById('global-backdrop');
function openOverlay(modalId) {
  bkd.classList.add('open');
  if (modalId) {
    const el = document.getElementById(modalId);
    if (el) el.classList.add('open');
  }
}
function closeOverlay() {
  bkd.classList.remove('open');
  document.querySelectorAll('.hint-popup.open, .code-modal-wrap.open, .commit-modal-wrap.open').forEach(el => el.classList.remove('open'));
}
bkd.onclick = closeOverlay;

// ─── Canvas Background ──────────────────────────────────────────────
(function initCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d', { alpha: false });
  ctx.fillStyle = '#050508';
  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
  const CELL = 48;
  let cols = 0, rows = 0;
  let mouse = { x: -9999, y: -9999 };
  let target = { x: -9999, y: -9999 };
  let clickPulse = 0;
  const particles = Array.from({ length: 40 }, () => ({ x:0, y:0, vx:0, vy:0, life:0, size:0, hue:0 }));

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    cols = Math.ceil(window.innerWidth / CELL) + 1;
    rows = Math.ceil(window.innerHeight / CELL) + 1;
  }
  window.addEventListener('resize', resize);
  resize();
  window.addEventListener('mousemove', e => { target.x = e.clientX; target.y = e.clientY; });
  window.addEventListener('mouseleave', () => { target.x = -9999; target.y = -9999; });
  window.addEventListener('mousedown', () => {
    clickPulse = 1.0;
    particles.forEach(p => {
      p.x = mouse.x; p.y = mouse.y;
      const ang = Math.random() * Math.PI * 2;
      const spd = Math.random() * 22 + 6;
      p.vx = Math.cos(ang) * spd; p.vy = Math.sin(ang) * spd;
      p.life = 1.0; p.size = Math.random() * 5 + 2; p.hue = Math.random() * 360;
    });
  });

  function draw() {
    mouse.x += (target.x - mouse.x) * 0.1;
    mouse.y += (target.y - mouse.y) * 0.1;
    clickPulse *= 0.87;
    ctx.fillStyle = 'rgba(5,5,8,0.42)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const cx = c * CELL, cy = r * CELL;
        const dx = cx - mouse.x, dy = cy - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const force = Math.max(0, 1 - dist / 380);
        const pull = force * 42 * (1 + clickPulse * 4.5);
        const rx = cx - (dx / dist) * pull;
        const ry = cy - (dy / dist) * pull;
        const dotR = 1 + force * 15 + clickPulse * force * 24;
        const alpha = 0.06 + force * 0.92;
        ctx.beginPath();
        ctx.arc(rx, ry, dotR, 0, Math.PI * 2);
        ctx.fillStyle = force > 0.3
          ? 'hsla(' + ((Date.now() / 3 + dist) % 360) + ',100%,65%,' + alpha + ')'
          : 'rgba(255,255,255,' + alpha + ')';
        ctx.fill();
      }
    }
    particles.forEach(p => {
      if (p.life <= 0) return;
      p.x += p.vx; p.y += p.vy; p.vy += 0.55;
      p.vx *= 0.97; p.life -= 0.02; p.size *= 0.96;
      ctx.beginPath();
      ctx.arc(p.x, p.y, Math.max(0.1, p.size), 0, Math.PI * 2);
      ctx.fillStyle = 'hsla(' + p.hue + ',100%,60%,' + p.life + ')';
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  draw();
})();

// ─── Reveal ─────────────────────────────────────────────────────────
function initReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('revealed'); obs.unobserve(e.target); } });
  }, { threshold: 0.04 });
  document.querySelectorAll('[data-reveal]').forEach(el => { el.classList.remove('revealed'); obs.observe(el); });
}

// ─── Tab Switching ───────────────────────────────────────────────────
function switchTab(id) {
  const pane = document.getElementById(id);
  if (!pane) return;
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.toggle('active', b.dataset.target === id));
  document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
  pane.classList.add('active');
  if (window.lucide) lucide.createIcons();
  initReveal();
  if (id === 'updates' && !window._commitsLoaded) loadChangelog(1);
}

// ─── Dropdown ───────────────────────────────────────────────────────
function initDropdown() {
  const btn = document.getElementById('installDropdownBtn');
  const menu = document.getElementById('installDropdownMenu');
  if (!btn || !menu) return;
  const dd = btn.closest('.dropdown');
  const toggle = open => {
    dd.classList.toggle('active', open);
    btn.setAttribute('aria-expanded', String(open));
    menu.classList.toggle('open', open);
  };
  btn.onclick = e => { e.stopPropagation(); toggle(!dd.classList.contains('active')); };
  document.addEventListener('click', e => { if (!dd.contains(e.target)) toggle(false); });
  menu.querySelectorAll('.dropdown-item[data-tab]').forEach(i => {
    i.onclick = () => { toggle(false); switchTab(i.dataset.tab); };
  });
}

// ─── Code Buttons ───────────────────────────────────────────────────
function initCodeButtons() {
  document.querySelectorAll('.code-copy-btn').forEach(btn => {
    btn.onclick = e => {
      e.stopPropagation();
      const codeEl = document.getElementById('code-' + btn.dataset.code + '-data');
      const code = codeEl ? codeEl.textContent.trim() : '';
      if (!code) return;
      navigator.clipboard.writeText(code).then(() => {
        const icon = btn.querySelector('i[data-lucide]');
        const label = btn.querySelector('span');
        const origLabel = label ? label.textContent : '';
        if (icon) { icon.setAttribute('data-lucide', 'check-circle-2'); lucide.createIcons(); }
        if (label) label.textContent = 'Copiado!';
        btn.disabled = true;
        showToast('Codigo copiado!');
        setTimeout(() => {
          if (icon) { icon.setAttribute('data-lucide', 'copy'); lucide.createIcons(); }
          if (label) label.textContent = origLabel;
          btn.disabled = false;
        }, 2000);
      }).catch(() => showToast('Erro ao copiar'));
    };
  });

  document.querySelectorAll('.code-show-btn').forEach(btn => {
    btn.onclick = e => {
      e.stopPropagation();
      const codeKey = btn.dataset.code;
      const codeEl = document.getElementById('code-' + codeKey + '-data');
      const code = codeEl ? codeEl.textContent.trim() : '';
      if (!code) return;
      const title = codeKey === 'discrete' ? 'EQ Discret — Codigo de Injecao' : 'EQ Legacy — Codigo de Injecao';
      document.getElementById('code-modal-title').textContent = title;
      document.getElementById('global-code-content').textContent = code;
      openOverlay('global-code-modal');
      if (window.lucide) lucide.createIcons();
    };
  });

  document.getElementById('code-modal-close-btn').onclick = closeOverlay;

  document.getElementById('modal-copy-btn').onclick = () => {
    const code = document.getElementById('global-code-content').textContent;
    navigator.clipboard.writeText(code).then(() => showToast('Codigo copiado!'));
  };
}

// ─── Hints ──────────────────────────────────────────────────────────
function initHints() {
  document.querySelectorAll('.hint-btn').forEach(btn => {
    btn.onclick = e => {
      e.stopPropagation();
      openOverlay(btn.dataset.hint);
      if (window.lucide) lucide.createIcons();
    };
  });
  document.querySelectorAll('.hint-close').forEach(btn => {
    btn.onclick = closeOverlay;
  });
}

// ─── GitHub API ──────────────────────────────────────────────────────
let _totalCommits = 0;

function toVersionString(num) {
  return 'v' + Math.floor(num/100) + '.' + Math.floor((num%100)/10) + '.' + (num%10);
}

async function fetchLatestCommit() {
  try {
    const headRes = await fetch('https://api.github.com/repos/minifoxie/EasyQuiz/commits?per_page=1');
    if (!headRes.ok) return;
    const linkHeader = headRes.headers.get('link');
    if (linkHeader) {
      const m = linkHeader.match(/page=(\d+)>; rel="last"/);
      if (m) _totalCommits = parseInt(m[1]);
    }
    const data = await headRes.json();
    if (!data || !data[0]) return;

    const sha = data[0].sha.slice(0, 7);
    const dateStr = new Date(data[0].commit.author.date).toLocaleDateString('pt-BR');

    // Update real version formatting
    const finalVer = _totalCommits > 0 ? toVersionString(_totalCommits) : 'v1.0.0';
    document.querySelectorAll('#site-version, #home-version').forEach(el => {
      el.textContent = finalVer;
    });

    const shaLabel = sha + ' · ' + dateStr;
    const discreteSha = document.getElementById('discrete-sha');
    const legacySha = document.getElementById('legacy-sha');
    if (discreteSha) discreteSha.textContent = shaLabel;
    if (legacySha) legacySha.textContent = shaLabel;
  } catch(_) {}
}

let _currentPage = 1;
function escapeHtml(u) { return u.replace(/[&<>"']/g, m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[m]); }

async function loadChangelog(page) {
  _currentPage = page;
  const container = document.getElementById('commits-container');
  if (!container) return;
  container.innerHTML = '<div class="commits-loading"><i data-lucide="loader-2" class="spin-icon"></i> Carregando historico...</div>';
  if (window.lucide) lucide.createIcons();
  try {
    const [res, totalRes] = await Promise.all([
      fetch('https://api.github.com/repos/minifoxie/EasyQuiz/commits?per_page=20&page=' + page),
      fetch('https://api.github.com/repos/minifoxie/EasyQuiz/commits?per_page=1')
    ]);
    if (!res.ok) throw new Error('API Error');
    const commits = await res.json();
    const linkHeader = totalRes.headers.get('link');
    let totalCommits = _totalCommits || 200;
    if (linkHeader) { const m = linkHeader.match(/page=(\d+)>; rel="last"/); if (m) totalCommits = parseInt(m[1]); }
    _totalCommits = totalCommits;

    container.innerHTML = '';
    commits.forEach((commit, idx) => {
      const globalIdx = totalCommits - ((page - 1) * 20 + idx);
      const vStr = toVersionString(globalIdx);
      const msgLines = commit.commit.message.split('\n');
      const title = msgLines[0];
      const body = msgLines.slice(1).join('\n').trim();
      const dateStr = new Date(commit.commit.author.date).toLocaleString('pt-BR');
      const el = document.createElement('div');
      el.className = 'commit-row glass';
      el.innerHTML =
        '<div class="commit-version">' + escapeHtml(vStr) + '</div>' +
        '<div class="commit-content">' +
        '<div class="commit-title">' + escapeHtml(title) + '</div>' +
        (body ? '<div class="commit-body">' + escapeHtml(body.length > 200 ? body.slice(0,200)+'...' : body) + '</div>' : '') +
        '<div class="commit-meta">por <strong>' + escapeHtml(commit.commit.author.name) + '</strong> — ' + escapeHtml(dateStr) + '</div>' +
        '</div>';
      el.onclick = () => {
        document.getElementById('cm-version').textContent = vStr;
        document.getElementById('cm-meta').innerHTML = 'por <strong>' + escapeHtml(commit.commit.author.name) + '</strong><br>' + escapeHtml(dateStr);
        document.getElementById('cm-title').textContent = title;
        document.getElementById('cm-desc').textContent = body || 'Sem descricao adicional.';
        let details = '<div class="detail-row"><span>SHA:</span> ' + commit.sha + '</div>';
        if (commit.commit.verification && commit.commit.verification.verified) {
          details += '<div class="detail-row"><span>Assinatura:</span> Verificada &#10003;</div>';
        }
        document.getElementById('cm-details').innerHTML = details;
        document.getElementById('cm-github-link').href = commit.html_url;
        document.getElementById('cm-sha-link').href = 'https://github.com/minifoxie/EasyQuiz/commit/' + commit.sha;
        document.getElementById('cm-details-acc').classList.remove('open');
        openOverlay('commit-modal');
        if (window.lucide) lucide.createIcons();
      };
      container.appendChild(el);
    });
    document.getElementById('pagination-row').style.display = 'flex';
    document.getElementById('page-info').textContent = 'Pagina ' + page + ' de ' + Math.ceil(totalCommits/20);
    document.getElementById('prev-page').disabled = (page === 1);
    document.getElementById('next-page').disabled = (page >= Math.ceil(totalCommits/20));
    window._commitsLoaded = true;
    if (window.lucide) lucide.createIcons();
  } catch (err) {
    container.innerHTML = '<div style="padding:40px;text-align:center;color:#ef4444;font-weight:800">Erro ao carregar commits.</div>';
  }
}

// ─── Toast ──────────────────────────────────────────────────────────
let _tt = null;
function showToast(msg) {
  const t = document.getElementById('toast');
  t.querySelector('.toast-msg').textContent = msg;
  t.classList.remove('show');
  void t.offsetWidth;
  t.classList.add('show');
  clearTimeout(_tt);
  _tt = setTimeout(() => t.classList.remove('show'), 2600);
}

// ─── Init ────────────────────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) lucide.createIcons();
  initDropdown();
  initCodeButtons();
  initHints();
  initReveal();

  document.querySelectorAll('.nav-btn').forEach(b => {
    b.onclick = e => { e.preventDefault(); switchTab(b.dataset.target); };
  });

  document.getElementById('cm-close').onclick = closeOverlay;
  document.getElementById('prev-page').onclick = () => loadChangelog(_currentPage - 1);
  document.getElementById('next-page').onclick = () => loadChangelog(_currentPage + 1);

  window.addEventListener('hashchange', () => {
    const h = window.location.hash.replace('#', '') || 'home';
    switchTab(h);
  });
  const initialHash = window.location.hash.replace('#', '') || 'home';
  switchTab(initialHash);

  // Fetch real version
  fetchLatestCommit();
});
