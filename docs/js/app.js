/* EasyQuiz App v5.2 */
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
  document.querySelectorAll('.hint-popup.open').forEach(el => el.classList.remove('open'));
}
bkd.onclick = closeOverlay;

// ─── DOM Background (Squares + Worms) ──────────────────────────────
(function initDOMBg() {
  const bg = document.getElementById('bg-dom');
  if (!bg) return;
  const CELL = 48;
  let cols = 0, rows = 0;
  let dots = [];
  let mouse = { x: -9999, y: -9999 };
  let target = { x: -9999, y: -9999 };
  let clickPulse = 0;
  let particles = Array.from({length: 40}, () => ({x:0, y:0, vx:0, vy:0, life:0, size:0, hue:0, el: document.createElement('div')}));
  let worms = Array.from({length: 12}, () => ({x:0, y:0, tx:0, ty:0, vx:0, vy:0, active:false, el: document.createElement('div')}));
  
  particles.forEach(p => {
    p.el.className = 'bg-particle';
    bg.appendChild(p.el);
  });
  worms.forEach(w => {
    w.el.className = 'bg-worm';
    w.el.style.display = 'none';
    bg.appendChild(w.el);
  });

  function buildGrid() {
    dots.forEach(d => d.el.remove());
    dots = [];
    cols = Math.ceil(window.innerWidth / CELL) + 1;
    rows = Math.ceil(window.innerHeight / CELL) + 1;
    for(let r=0; r<rows; r++) {
      for(let c=0; c<cols; c++) {
        const cx = c * CELL;
        const cy = r * CELL;
        const d = document.createElement('i');
        d.className = 'bg-dot';
        d.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
        bg.appendChild(d);
        dots.push({ cx, cy, el: d });
      }
    }
  }

  let resizeTimer;
  window.addEventListener('resize', () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(buildGrid, 200); });
  buildGrid();

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

  function spawnWorm(w) {
    w.active = true;
    w.x = Math.random() * window.innerWidth;
    w.y = Math.random() * window.innerHeight;
    w.tx = Math.random() * window.innerWidth;
    w.ty = Math.random() * window.innerHeight;
    const ang = Math.atan2(w.ty - w.y, w.tx - w.x);
    w.vx = Math.cos(ang) * 20; // fast worms
    w.vy = Math.sin(ang) * 20;
    w.el.style.display = 'block';
    w.el.style.transform = `translate3d(${w.x}px, ${w.y}px, 0) rotate(${ang}rad)`;
    w.el.style.width = (Math.random() * 120 + 60) + 'px';
    const hue = Math.random() * 360;
    w.el.style.background = `linear-gradient(90deg, transparent, hsla(${hue},100%,70%,0.9), transparent)`;
  }

  function draw() {
    mouse.x += (target.x - mouse.x) * 0.1;
    mouse.y += (target.y - mouse.y) * 0.1;
    clickPulse *= 0.87;

    const mx = mouse.x, my = mouse.y;
    const time = Date.now() / 3;

    dots.forEach(d => {
      const dx = d.cx - mx;
      const dy = d.cy - my;
      const dist2 = dx*dx + dy*dy;
      
      if (dist2 > 160000 && clickPulse < 0.05) {
        if (!d.idle) {
          d.el.style.transform = `translate3d(${d.cx}px, ${d.cy}px, 0) scale(1)`;
          d.el.style.backgroundColor = 'rgba(255,255,255,0.06)';
          d.idle = true;
        }
        return;
      }
      
      d.idle = false;
      const dist = Math.sqrt(dist2) || 1;
      const force = Math.max(0, 1 - dist / 380);
      const pull = force * 42 * (1 + clickPulse * 4.5);
      const rx = d.cx - (dx / dist) * pull;
      const ry = d.cy - (dy / dist) * pull;
      const dotR = 1 + force * 15 + clickPulse * force * 24;
      const alpha = 0.06 + force * 0.92;
      
      d.el.style.transform = `translate3d(${rx}px, ${ry}px, 0) scale(${dotR / 2})`;
      if (force > 0.3) {
        d.el.style.backgroundColor = `hsla(${(time + dist) % 360},100%,65%,${alpha})`;
      } else {
        d.el.style.backgroundColor = `rgba(255,255,255,${alpha})`;
      }
    });

    particles.forEach(p => {
      if (p.life <= 0) {
        if (!p.idle) { p.el.style.opacity = '0'; p.idle = true; }
        return;
      }
      p.idle = false;
      p.x += p.vx; p.y += p.vy; p.vy += 0.55;
      p.vx *= 0.97; p.life -= 0.02; p.size *= 0.96;
      p.el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0)`;
      p.el.style.width = Math.max(0.1, p.size * 2) + 'px';
      p.el.style.height = Math.max(0.1, p.size * 2) + 'px';
      p.el.style.backgroundColor = `hsl(${p.hue},100%,60%)`;
      p.el.style.opacity = p.life.toString();
    });

    worms.forEach(w => {
      if (!w.active) {
        if (Math.random() < 0.008) spawnWorm(w);
      } else {
        w.x += w.vx; w.y += w.vy;
        const dist2 = (w.tx - w.x)**2 + (w.ty - w.y)**2;
        if (dist2 < 400 || w.x < -200 || w.x > window.innerWidth+200 || w.y < -200 || w.y > window.innerHeight+200) {
          w.active = false; w.el.style.display = 'none';
        } else {
          const ang = Math.atan2(w.vy, w.vx);
          w.el.style.transform = `translate3d(${w.x}px, ${w.y}px, 0) rotate(${ang}rad)`;
        }
      }
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

// ─── Tab Switching & Topbar Sync ────────────────────────────────────
function switchTab(id) {
  const pane = document.getElementById(id);
  if (!pane) return;
  
  // Tab classes
  document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
  pane.classList.add('active');
  
  // Topbar highlight
  document.querySelectorAll('.nav-links .nav-btn[data-target]').forEach(b => {
    b.classList.toggle('active', b.dataset.target === id);
  });

  // Topbar Dropdown Sync
  const ddBtn = document.getElementById('navModeBtn');
  const ddText = document.getElementById('navModeText');
  const ddIcon = document.getElementById('navModeIcon');
  if (ddBtn && ddText && ddIcon) {
    if (id === 'discrete') {
      ddBtn.classList.add('active');
      ddText.textContent = 'Modo Discreto';
      ddIcon.setAttribute('data-lucide', 'eye-off');
    } else if (id === 'legacy') {
      ddBtn.classList.add('active');
      ddText.textContent = 'Modo Legacy';
      ddIcon.setAttribute('data-lucide', 'panel-top');
    } else {
      ddBtn.classList.remove('active');
      ddText.textContent = 'Setup Modos';
      ddIcon.setAttribute('data-lucide', 'layers');
    }
  }

  if (window.lucide) lucide.createIcons();
  initReveal();
  if (id === 'updates' && !window._commitsLoaded) loadChangelog(1);
}

// ─── Dropdowns ──────────────────────────────────────────────────────
function initDropdown(btnId, menuId) {
  const btn = document.getElementById(btnId);
  const menu = document.getElementById(menuId);
  if (!btn || !menu) return;
  const dd = btn.closest('.dropdown');
  const toggle = open => {
    // Close other dropdowns
    if(open) document.querySelectorAll('.dropdown.active').forEach(d => { if(d!==dd) { d.classList.remove('active'); const b=d.querySelector('button'); if(b) b.setAttribute('aria-expanded','false'); const m=d.querySelector('.dropdown-menu'); if(m) m.classList.remove('open'); } });
    
    dd.classList.toggle('active', open);
    if(btn.hasAttribute('aria-expanded')) btn.setAttribute('aria-expanded', String(open));
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
  
  initDropdown('codeMenuBtnDiscrete', 'codeMenuDiscrete');
  initDropdown('codeMenuBtnLegacy', 'codeMenuLegacy');
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
      
      let detailsBody = '';
      if (body) {
        detailsBody += '<div class="commit-full-desc">' + escapeHtml(body) + '</div>';
      } else {
        detailsBody += '<div class="commit-full-desc" style="color:var(--gray-3);font-style:italic">Sem descricao adicional.</div>';
      }
      
      el.innerHTML =
        '<div class="commit-main">' +
        '<div class="commit-version">' + escapeHtml(vStr) + '</div>' +
        '<div class="commit-content">' +
        '<div class="commit-title">' + escapeHtml(title) + '</div>' +
        (body ? '<div class="commit-body">' + escapeHtml(body.length > 200 ? body.slice(0,200)+'...' : body) + '</div>' : '') +
        '<div class="commit-meta">por <strong>' + escapeHtml(commit.commit.author.name) + '</strong> — ' + escapeHtml(dateStr) + '</div>' +
        '</div></div>' +
        '<div class="commit-details-inline">' + detailsBody +
        '<div class="commit-actions">' +
        '<a href="' + commit.html_url + '" target="_blank" class="btn btn-outline sm" onclick="event.stopPropagation()">Ver no GitHub <i data-lucide="external-link"></i></a>' +
        '<a href="https://github.com/minifoxie/EasyQuiz/commit/' + commit.sha + '" target="_blank" class="btn btn-secondary sm" onclick="event.stopPropagation()"><i data-lucide="git-commit-horizontal"></i> Diff</a>' +
        '</div></div>';
      
      el.onclick = () => {
        const isOpen = el.classList.contains('open');
        document.querySelectorAll('.commit-row').forEach(r => r.classList.remove('open'));
        if (!isOpen) {
          el.classList.add('open');
          setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 300);
        }
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
  
  initDropdown('installDropdownBtn', 'installDropdownMenu');
  initDropdown('navModeBtn', 'navModeMenu');
  
  initCodeButtons();
  initHints();
  initReveal();

  document.querySelectorAll('.nav-links > .nav-btn').forEach(b => {
    b.onclick = e => { e.preventDefault(); switchTab(b.dataset.target); };
  });

  document.getElementById('prev-page').onclick = () => loadChangelog(_currentPage - 1);
  document.getElementById('next-page').onclick = () => loadChangelog(_currentPage + 1);

  window.addEventListener('hashchange', () => {
    const h = window.location.hash.replace('#', '') || 'home';
    switchTab(h);
  });
  const initialHash = window.location.hash.replace('#', '') || 'home';
  switchTab(initialHash);

  fetchLatestCommit();
});
