/* EasyQuiz App v4.2 */
'use strict';

// ─── Canvas Background (Extreme Gravity + Click Explosion) ─────────────────
(function initCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const CELL = 48;
  let cols = 0, rows = 0;
  let mouse = { x: -9999, y: -9999 };
  let target = { x: -9999, y: -9999 };
  let clickPulse = 0;

  const particles = Array.from({ length: 40 }, () => ({
    x: 0, y: 0, vx: 0, vy: 0, life: 0, size: 0, hue: 0
  }));

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
  window.addEventListener('mousedown', e => {
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
    mouse.x += (target.x - mouse.x) * 0.12;
    mouse.y += (target.y - mouse.y) * 0.12;
    clickPulse *= 0.88;

    ctx.fillStyle = 'rgba(3,3,3,0.35)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const cx = c * CELL, cy = r * CELL;
        const dx = cx - mouse.x, dy = cy - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const force = Math.max(0, 1 - dist / 380);
        const pull = force * 40 * (1 + clickPulse * 4);
        const rx = cx - (dx / dist) * pull;
        const ry = cy - (dy / dist) * pull;
        const dotR = 1 + force * 14 + clickPulse * force * 22;
        const alpha = 0.07 + force * 0.9;

        ctx.beginPath();
        ctx.arc(rx, ry, dotR, 0, Math.PI * 2);
        if (force > 0.35) {
          ctx.fillStyle = 'hsla(' + ((Date.now() / 3 + dist) % 360) + ',100%,65%,' + alpha + ')';
        } else {
          ctx.fillStyle = 'rgba(255,255,255,' + alpha + ')';
        }
        ctx.fill();
      }
    }

    particles.forEach(p => {
      if (p.life <= 0) return;
      p.x += p.vx; p.y += p.vy; p.vy += 0.6;
      p.vx *= 0.97; p.life -= 0.022; p.size *= 0.96;
      ctx.beginPath();
      ctx.arc(p.x, p.y, Math.max(0.1, p.size), 0, Math.PI * 2);
      ctx.fillStyle = 'hsla(' + p.hue + ',100%,60%,' + p.life + ')';
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }
  draw();
})();

// ─── Scroll Reveal ────────────────────────────────────────────────────────────
function initReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('revealed'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.04 });
  document.querySelectorAll('[data-reveal]').forEach(el => {
    el.classList.remove('revealed');
    obs.observe(el);
  });
}

// ─── Tab Switching ────────────────────────────────────────────────────────────
function switchTab(id) {
  const pane = document.getElementById(id);
  if (!pane) return;
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.toggle('active', b.dataset.target === id));
  document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
  pane.classList.add('active');
  if (window.lucide) lucide.createIcons();
  initReveal();
  history.replaceState(null, null, '#' + id);
  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (id === 'updates' && !window._commitsLoaded) {
    loadChangelog(1);
  }
}

// ─── Dropdown ─────────────────────────────────────────────────────────────────
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

// ─── Code Overlay (fixed, over everything) ────────────────────────────────────
function initCodeOverlay() {
  const overlay = document.getElementById('code-overlay');
  const backdrop = document.getElementById('code-overlay-backdrop');
  const closeBtn = document.getElementById('co-close-btn');
  const copyBtn = document.getElementById('co-copy-btn');
  const codeEl = document.getElementById('co-code-content');
  const titleEl = document.getElementById('co-title');

  function close() { overlay.style.display = 'none'; }

  backdrop.onclick = close;
  closeBtn.onclick = close;
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });

  copyBtn.onclick = () => {
    navigator.clipboard.writeText(codeEl.textContent.trim()).then(() => {
      showToast('Codigo copiado!');
      const og = copyBtn.innerHTML;
      copyBtn.innerHTML = '<i data-lucide="check"></i> Copiado!';
      if (window.lucide) lucide.createIcons();
      setTimeout(() => { copyBtn.innerHTML = og; if (window.lucide) lucide.createIcons(); }, 2000);
    });
  };

  document.querySelectorAll('.code-trigger-btn').forEach(btn => {
    btn.onclick = e => {
      e.stopPropagation();
      const codeId = btn.dataset.code;
      const sourceEl = document.getElementById(codeId);
      const code = sourceEl ? sourceEl.textContent.trim() : (
        codeId === 'code-discrete' ? window._bm_discrete : window._bm_legacy
      );
      const label = codeId === 'code-discrete' ? 'Codigo - EQ Discret' : 'Codigo - EQ Legacy';
      titleEl.textContent = label;
      codeEl.textContent = code;
      overlay.style.display = 'flex';
      if (window.lucide) lucide.createIcons();
    };
  });
}

// ─── Hint Popups ──────────────────────────────────────────────────────────────
function initHints() {
  document.querySelectorAll('.hint-btn').forEach(btn => {
    btn.onclick = e => {
      e.stopPropagation();
      const popup = document.getElementById(btn.dataset.hint);
      if (!popup) return;
      document.querySelectorAll('.hint-popup').forEach(p => { if (p !== popup) p.classList.remove('show'); });
      popup.style.display = 'block';
      requestAnimationFrame(() => popup.classList.add('show'));
    };
  });
  document.querySelectorAll('.hint-close').forEach(btn => {
    btn.onclick = () => {
      const popup = btn.closest('.hint-popup');
      popup.classList.remove('show');
      setTimeout(() => { popup.style.display = 'none'; }, 400);
    };
  });
  document.addEventListener('click', e => {
    if (!e.target.closest('.hint-popup') && !e.target.closest('.hint-btn')) {
      document.querySelectorAll('.hint-popup.show').forEach(p => {
        p.classList.remove('show');
        setTimeout(() => { p.style.display = 'none'; }, 400);
      });
    }
  });
}

// ─── Changelog (GitHub API) ────────────────────────────────────────────────────
let _totalCommits = 0;
let _currentPage = 1;

function formatVersion(n) {
  return String(n).split('').join('.');
}

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }) +
    ' ' + d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

function openCommitModal(commit, version) {
  const overlay = document.getElementById('commit-overlay');
  document.getElementById('cm-version').textContent = 'v' + version;
  document.getElementById('cm-meta').textContent = commit.commit.author.name + ' · ' + formatDate(commit.commit.author.date);
  const lines = commit.commit.message.split('\n');
  document.getElementById('cm-title').textContent = lines[0];
  document.getElementById('cm-desc').textContent = lines.slice(1).join('\n').trim();
  document.getElementById('cm-details').innerHTML =
    '<div class="cm-detail-row"><div class="cm-detail-label">SHA</div><div class="cm-detail-val">' + commit.sha + '</div></div>' +
    '<div class="cm-detail-row"><div class="cm-detail-label">Autor</div><div class="cm-detail-val">' + commit.commit.author.name + '</div></div>' +
    '<div class="cm-detail-row"><div class="cm-detail-label">Email</div><div class="cm-detail-val">' + (commit.commit.author.email || '—') + '</div></div>' +
    '<div class="cm-detail-row"><div class="cm-detail-label">Data</div><div class="cm-detail-val">' + formatDate(commit.commit.author.date) + '</div></div>';
  document.getElementById('cm-github-link').href = commit.html_url;
  document.getElementById('cm-sha-link').href = 'https://github.com/minifoxie/EasyQuiz/commit/' + commit.sha;
  overlay.style.display = 'flex';
  if (window.lucide) lucide.createIcons();
}

function renderCommits(commits, page) {
  const container = document.getElementById('commits-container');
  const offset = (page - 1) * 20;

  if (commits.length === 0) {
    container.innerHTML = '<div class="commits-loading">Nenhum commit encontrado.</div>';
    return;
  }

  container.innerHTML = '';
  commits.forEach((commit, i) => {
    const commitNum = _totalCommits - offset - i;
    const version = formatVersion(Math.max(1, commitNum));
    const date = formatDate(commit.commit.author.date);
    const title = commit.commit.message.split('\n')[0];
    const sha = commit.sha.substring(0, 7);

    const row = document.createElement('div');
    row.className = 'commit-row';
    row.innerHTML =
      '<div class="commit-version">v' + version + '</div>' +
      '<div class="commit-info">' +
        '<div class="commit-title">' + escapeHtml(title) + '</div>' +
        '<div class="commit-meta"><span>' + escapeHtml(commit.commit.author.name) + '</span><span>' + date + '</span></div>' +
      '</div>' +
      '<div class="commit-sha">' + sha + '</div>' +
      '<div class="commit-arrow"><i data-lucide="arrow-right"></i></div>';

    row.onclick = () => openCommitModal(commit, version);
    container.appendChild(row);
  });

  if (window.lucide) lucide.createIcons();
}

function escapeHtml(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

async function loadChangelog(page) {
  _currentPage = page;
  const container = document.getElementById('commits-container');
  container.innerHTML = '<div class="commits-loading"><i data-lucide="loader-2" class="spin-icon"></i> Carregando historico...</div>';
  if (window.lucide) lucide.createIcons();

  try {
    if (!_totalCommits) {
      const r1 = await fetch('https://api.github.com/repos/minifoxie/EasyQuiz/commits?per_page=1');
      const link = r1.headers.get('Link') || '';
      const m = link.match(/page=(\d+)>; rel="last"/);
      _totalCommits = m ? parseInt(m[1]) : 100;
    }

    const resp = await fetch('https://api.github.com/repos/minifoxie/EasyQuiz/commits?per_page=20&page=' + page);
    const commits = await resp.json();

    renderCommits(Array.isArray(commits) ? commits : [], page);
    window._commitsLoaded = true;

    const paginationRow = document.getElementById('pagination-row');
    paginationRow.style.display = 'flex';
    document.getElementById('page-info').textContent = 'Pagina ' + page;
    document.getElementById('prev-page').disabled = page <= 1;
    document.getElementById('next-page').disabled = Array.isArray(commits) && commits.length < 20;

  } catch (err) {
    container.innerHTML = '<div class="commits-loading">Erro ao carregar historico. Tente novamente.</div>';
  }
}

// ─── Toast ────────────────────────────────────────────────────────────────────
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

// ─── Init ─────────────────────────────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) lucide.createIcons();
  initDropdown();
  initCodeOverlay();
  initHints();
  initReveal();

  document.querySelectorAll('.nav-btn').forEach(b => {
    b.onclick = e => { e.preventDefault(); switchTab(b.dataset.target); };
  });

  document.getElementById('commit-backdrop').onclick = () => { document.getElementById('commit-overlay').style.display = 'none'; };
  document.getElementById('cm-close').onclick = () => { document.getElementById('commit-overlay').style.display = 'none'; };

  document.getElementById('prev-page').onclick = () => loadChangelog(_currentPage - 1);
  document.getElementById('next-page').onclick = () => loadChangelog(_currentPage + 1);

  const hash = window.location.hash.replace('#', '');
  if (hash && document.getElementById(hash)) switchTab(hash);
});
