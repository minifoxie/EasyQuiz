/* EasyQuiz App v4.4 */
'use strict';

(function initCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const CELL = 48;
  let cols = 0, rows = 0;
  let mouse = { x: -9999, y: -9999 };
  let target = { x: -9999, y: -9999 };
  let clickPulse = 0;

  const particles = Array.from({ length: 40 }, () => ({ x: 0, y: 0, vx: 0, vy: 0, life: 0, size: 0, hue: 0 }));

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

    ctx.fillStyle = 'rgba(5,5,8,0.45)';
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

function switchTab(id) {
  const pane = document.getElementById(id);
  if (!pane) return;
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.toggle('active', b.dataset.target === id));
  document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
  pane.classList.add('active');
  if (window.lucide) lucide.createIcons();
  initReveal();
  
  if (id === 'updates' && !window._commitsLoaded) {
    loadChangelog(1);
  }
}

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
    i.onclick = () => { toggle(false); window.location.hash = i.dataset.tab; };
  });
}

function initModals() {
  // Code modal logic
  document.querySelectorAll('.code-modal-trigger').forEach(btn => {
    btn.onclick = () => {
      const codeId = btn.dataset.code;
      const dataDiv = document.getElementById(codeId + '-data');
      if(dataDiv) {
        document.getElementById('global-code-content').textContent = dataDiv.textContent;
        document.getElementById('global-code-modal').classList.add('open');
      }
    };
  });
  
  // Close code modal on outside click
  document.getElementById('global-code-modal').onclick = e => {
    if(e.target.id === 'global-code-modal') e.target.classList.remove('open');
  };

  // Hint popup logic
  document.querySelectorAll('.hint-btn').forEach(btn => {
    btn.onclick = e => {
      e.stopPropagation();
      const h = document.getElementById(btn.dataset.hint);
      if (h) {
        document.querySelectorAll('.hint-popup').forEach(p => p.classList.remove('open'));
        h.classList.add('open');
      }
    };
  });
  document.querySelectorAll('.hint-close').forEach(btn => {
    btn.onclick = () => btn.closest('.hint-popup').classList.remove('open');
  });
  document.addEventListener('click', e => {
    if (!e.target.closest('.hint-popup') && !e.target.closest('.hint-btn')) {
      document.querySelectorAll('.hint-popup').forEach(p => p.classList.remove('open'));
    }
  });
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
    const res = await fetch('https://api.github.com/repos/minifoxie/EasyQuiz/commits?per_page=20&page=' + page);
    if (!res.ok) throw new Error('API Error');
    const commits = await res.json();
    
    const totalCommitsRes = await fetch('https://api.github.com/repos/minifoxie/EasyQuiz/commits?per_page=1');
    const linkHeader = totalCommitsRes.headers.get('link');
    let totalCommits = 200; 
    if (linkHeader) {
      const match = linkHeader.match(/page=(d+)>; rel="last"/);
      if (match) totalCommits = parseInt(match[1]);
    }

    container.innerHTML = '';
    
    commits.forEach((commit, idx) => {
      const globalIdx = totalCommits - ((page - 1) * 20 + idx);
      const vStr = globalIdx > 0 ? `v${Math.floor(globalIdx/100)}.${Math.floor((globalIdx%100)/10)}.${globalIdx%10}` : 'v0.0.1';
      
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
        (body ? '<div class="commit-body">' + escapeHtml(body.length > 180 ? body.slice(0,180)+'...' : body) + '</div>' : '') +
        '<div class="commit-meta">por <strong>' + escapeHtml(commit.commit.author.name) + '</strong> em ' + escapeHtml(dateStr) + '</div>' +
        '</div>';
        
      el.onclick = () => {
        document.getElementById('cm-version').textContent = vStr;
        document.getElementById('cm-meta').innerHTML = 'por <strong>' + escapeHtml(commit.commit.author.name) + '</strong><br>' + escapeHtml(dateStr);
        document.getElementById('cm-title').textContent = title;
        document.getElementById('cm-desc').textContent = body || 'Sem descricao adicional.';
        
        let details = '<div class="detail-row"><span>SHA:</span> ' + commit.sha + '</div>';
        if(commit.commit.verification && commit.commit.verification.verified) {
          details += '<div class="detail-row"><span>Assinatura:</span> Verificada <i data-lucide="badge-check" style="color:#4ade80;width:14px;height:14px;vertical-align:middle"></i></div>';
        }
        document.getElementById('cm-details').innerHTML = details;
        document.getElementById('cm-github-link').href = commit.html_url;
        document.getElementById('cm-sha-link').href = 'https://github.com/minifoxie/EasyQuiz/commit/' + commit.sha;
        
        // Reset accordion
        document.getElementById('cm-details-acc').classList.remove('open');
        
        document.getElementById('commit-modal').classList.add('open');
        if (window.lucide) lucide.createIcons();
      };
      
      container.appendChild(el);
    });
    
    document.getElementById('pagination-row').style.display = 'flex';
    document.getElementById('page-info').textContent = 'Pagina ' + page;
    document.getElementById('prev-page').disabled = (page === 1);
    window._commitsLoaded = true;
    
  } catch (err) {
    container.innerHTML = '<div style="padding:40px;text-align:center;color:#ef4444">Erro ao carregar commits. Tente novamente mais tarde.</div>';
  }
}

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

window.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) lucide.createIcons();
  initDropdown();
  initModals();
  initReveal();

  document.querySelectorAll('.nav-btn').forEach(b => {
    b.onclick = e => { e.preventDefault(); window.location.hash = b.dataset.target; };
  });

  document.getElementById('cm-backdrop').onclick = () => { document.getElementById('commit-modal').classList.remove('open'); };
  document.getElementById('cm-close').onclick = () => { document.getElementById('commit-modal').classList.remove('open'); };

  document.getElementById('prev-page').onclick = () => loadChangelog(_currentPage - 1);
  document.getElementById('next-page').onclick = () => loadChangelog(_currentPage + 1);

  window.addEventListener('hashchange', () => {
    const h = window.location.hash.replace('#', '') || 'home';
    switchTab(h);
  });
  
  const initialHash = window.location.hash.replace('#', '') || 'home';
  switchTab(initialHash);
});
