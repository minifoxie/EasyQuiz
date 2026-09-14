/* EasyQuiz App v5.9 */
'use strict';

const bkd = document.getElementById('global-backdrop');
function openOverlay(id) { bkd.classList.add('open'); const el = document.getElementById(id); if(el) { el.classList.add('open'); } }
function closeOverlay() { bkd.classList.remove('open'); document.querySelectorAll('.hint-popup-wrapper.open').forEach(el => el.classList.remove('open')); }
bkd.onclick = closeOverlay;

(function() {
  const bg = document.getElementById('bg-dom');
  if (!bg) return;
  const CELL = 48;
  let cols = 0, rows = 0, dots = [];
  let mouse = {x:-9999,y:-9999}, target = {x:-9999,y:-9999};

  const NUM_GHOSTS = 4;
  const ghosts = Array.from({length: NUM_GHOSTS}, () => {
    return { x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight,
             tx: Math.random() * window.innerWidth, ty: Math.random() * window.innerHeight,
             vx: 0, vy: 0 };
  });

  function buildGrid() {
    dots.forEach(d => d.el.remove()); dots = [];
    cols = Math.ceil(window.innerWidth / CELL) + 1;
    rows = Math.ceil(window.innerHeight / CELL) + 1;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const cx = c * CELL, cy = r * CELL;
        const el = document.createElement('i');
        el.className = 'bg-dot';
        el.style.transform = `translate3d(${cx}px,${cy}px,0)`;
        bg.appendChild(el);
        dots.push({cx, cy, el});
      }
    }
  }

  let rt; window.addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(buildGrid, 200); });
  buildGrid();
  window.addEventListener('mousemove', e => { target.x = e.clientX; target.y = e.clientY; });
  window.addEventListener('mouseleave', () => { target.x = -9999; target.y = -9999; });

  function draw() {
    mouse.x += (target.x - mouse.x) * 0.1;
    mouse.y += (target.y - mouse.y) * 0.1;
    const time = Date.now() / 3;

    ghosts.forEach(g => {
      const dx = g.tx - g.x, dy = g.ty - g.y;
      const dist = Math.sqrt(dx*dx + dy*dy) || 1;
      if (dist < 60) { g.tx = Math.random() * window.innerWidth; g.ty = Math.random() * window.innerHeight; }
      g.vx = (g.vx + (dx / dist) * 0.5) * 0.91;
      g.vy = (g.vy + (dy / dist) * 0.5) * 0.91;
      g.x += g.vx; g.y += g.vy;
    });

    dots.forEach(d => {
      let pullX = 0, pullY = 0, isNear = false;
      let dx = d.cx - mouse.x, dy = d.cy - mouse.y;
      let dist2 = dx*dx + dy*dy;
      if (dist2 < 160000) {
        const dist = Math.sqrt(dist2) || 1;
        const force = Math.max(0, 1 - dist / 400);
        const p = force * 42;
        pullX += (dx / dist) * p; pullY += (dy / dist) * p;
        isNear = true;
      }
      ghosts.forEach(g => {
        const gx = d.cx - g.x, gy = d.cy - g.y;
        const gd2 = gx*gx + gy*gy;
        if (gd2 < 78400) {
          const gd = Math.sqrt(gd2) || 1;
          const gf = Math.max(0, 1 - gd / 280);
          const gp = gf * 22; 
          pullX += (gx / gd) * gp; pullY += (gy / gd) * gp;
          isNear = true;
        }
      });

      if (!isNear) {
        if (!d.idle) { d.el.style.transform = `translate3d(${d.cx}px,${d.cy}px,0) scale(1)`; d.el.style.backgroundColor = 'rgba(255,255,255,0.05)'; d.idle = true; }
        return;
      }
      d.idle = false;
      const totalPull = Math.sqrt(pullX*pullX + pullY*pullY);
      const scale = 1 + (totalPull / 42) * 15;
      const alpha = 0.05 + (totalPull / 42) * 0.95;
      d.el.style.transform = `translate3d(${d.cx - pullX}px,${d.cy - pullY}px,0) scale(${scale / 2})`;
      d.el.style.backgroundColor = totalPull > 10 ? `hsla(${(time + totalPull * 10) % 360},100%,65%,${alpha})` : `rgba(255,255,255,${alpha})`;
    });

    requestAnimationFrame(draw);
  }
  draw();
})();

function initReveal() {
  const obs = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('revealed');
      // JS fix for blur: remove animation properties when done so they dont create stacking contexts that block nested blurs
      setTimeout(() => e.target.classList.add('revealed-done'), 1000);
      obs.unobserve(e.target);
    }
  }), { threshold: 0.05 });
  document.querySelectorAll('[data-anim]').forEach(el => { el.classList.remove('revealed', 'revealed-done'); obs.observe(el); });
}

function switchTab(id) {
  const pane = document.getElementById(id); if (!pane) return;
  document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
  pane.classList.add('active');
  
  pane.querySelectorAll('[data-anim]').forEach(el => {
    el.classList.remove('revealed', 'revealed-done');
    setTimeout(() => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add('revealed');
        setTimeout(() => el.classList.add('revealed-done'), 1000);
      }
    }, 50);
  });

  document.querySelectorAll('.nav-links .nav-btn[data-target]').forEach(b => b.classList.toggle('active', b.dataset.target === id));
  const ddBtn = document.getElementById('navModeBtn'), ddText = document.getElementById('navModeText'), ddIcon = document.getElementById('navModeIcon');
  if (ddBtn && ddText && ddIcon) {
    if (id === 'discrete') { ddBtn.classList.add('active'); ddText.textContent = 'Modo Discreto'; ddIcon.setAttribute('data-lucide', 'eye-off'); }
    else if (id === 'legacy') { ddBtn.classList.add('active'); ddText.textContent = 'Modo Legacy'; ddIcon.setAttribute('data-lucide', 'panel-top'); }
    else { ddBtn.classList.remove('active'); ddText.textContent = 'Setup Modos'; ddIcon.setAttribute('data-lucide', 'layers'); }
  }
  if (window.lucide) lucide.createIcons();
  osAnimLoop();
  initReveal();
  if (id === 'updates' && !window._commitsLoaded) loadChangelog(1);
}

function initDropdown(btnId, menuId) {
  const btn = document.getElementById(btnId), menu = document.getElementById(menuId);
  if (!btn || !menu) return;
  const dd = btn.closest('.dropdown');
  const toggle = open => {
    if (open) document.querySelectorAll('.dropdown.active').forEach(d => { if (d !== dd) { d.classList.remove('active'); d.querySelector('.dropdown-menu')?.classList.remove('open'); }});
    dd.classList.toggle('active', open);
    if (btn.hasAttribute('aria-expanded')) btn.setAttribute('aria-expanded', String(open));
    menu.classList.toggle('open', open);
  };
  btn.onclick = e => { e.stopPropagation(); toggle(!dd.classList.contains('active')); };
  
async function osAnimLoop() {
  const wraps = document.querySelectorAll('.os-anim-wrapper');
  if (wraps.length === 0) return;
  
  while (true) {
    let isVisible = false;
    wraps.forEach(w => { if (w.offsetWidth > 0) isVisible = true; });
    if (!isVisible) {
      await sleep(1000);
      continue;
    }
    
    for (const wrap of wraps) {
      if (wrap.offsetWidth === 0) continue;
      const camera = wrap.querySelector('.os-anim-camera');
      const cursor = wrap.querySelector('.os-cursor');
      const ghost = wrap.querySelector('.os-ghost');
      const dropzone = wrap.querySelector('.eq-dropzone');
      const btn = wrap.querySelector('.os-eq-btn');
      const kb = wrap.querySelector('.os-keyboard-hint');
      const keys = kb.querySelectorAll('kbd');
      const indicator = wrap.querySelector('.os-click-indicator');
      
      wrap.className = 'os-anim-wrapper';
      camera.style.transform = 'scale(1) translate(0, 0)';
      cursor.className = 'os-cursor';
      cursor.style.transition = 'none';
      cursor.style.top = '80%';
      cursor.style.left = '80%';
      ghost.style.opacity = '0';
      ghost.style.transition = 'none';
      dropzone.innerHTML = '';
      btn.style.opacity = '1';
      btn.style.transform = 'scale(1)';
      keys.forEach(k => k.className = '');
      
      if (indicator) {
        indicator.style.transition = 'none';
        indicator.style.opacity = '0';
        indicator.style.transform = 'scale(1.5)';
      }
      
      await sleep(800);
      wrap.classList.add('s-keys');
      await sleep(600);
      
      if (keys[0]) { keys[0].classList.add('pressed'); await sleep(150); }
      if (keys[1]) { keys[1].classList.add('pressed'); await sleep(150); }
      if (keys[2]) { keys[2].classList.add('pressed'); await sleep(150); }
      
      wrap.classList.add('s-bms');
      await sleep(400);
      
      keys.forEach(k => k.classList.remove('pressed'));
      await sleep(200);
      wrap.classList.remove('s-keys');
      
      cursor.style.transition = 'all 0.8s cubic-bezier(0.16,1,0.3,1)';
      camera.style.transition = 'transform 0.8s cubic-bezier(0.16,1,0.3,1)';
      camera.style.transform = 'scale(1.4) translate(-10%, -20%)';
      cursor.style.top = '70%'; 
      cursor.style.left = '50%';
      
      await sleep(800);
      cursor.classList.add('holding');
      btn.style.transform = 'scale(0.95)';
      btn.style.opacity = '0.5';
      
      if (indicator) {
        indicator.style.transition = 'transform 0.2s cubic-bezier(0.16,1,0.3,1), opacity 0.2s';
        indicator.style.opacity = '1';
        indicator.style.transform = 'scale(0.6)';
      }
      
      ghost.style.opacity = '1';
      ghost.style.top = '70%';
      ghost.style.left = '50%';
      
      await sleep(500);
      cursor.style.transition = 'all 1.2s cubic-bezier(0.16,1,0.3,1)';
      ghost.style.transition = 'all 1.2s cubic-bezier(0.16,1,0.3,1)';
      camera.style.transition = 'transform 1.2s cubic-bezier(0.16,1,0.3,1)';
      
      cursor.style.top = '60px';
      cursor.style.left = '160px';
      ghost.style.top = '60px';
      ghost.style.left = '160px';
      camera.style.transform = 'scale(1.4) translate(0%, 0%)';
      
      wrap.classList.add('s-drag');
      await sleep(1200);
      
      cursor.classList.remove('holding');
      wrap.classList.add('s-drop');
      dropzone.innerHTML = ghost.innerHTML;
      ghost.style.opacity = '0';
      
      if (indicator) {
        indicator.style.transform = 'scale(1.5)';
        indicator.style.opacity = '0';
      }
      
      cursor.style.transition = 'all 0.4s ease-out';
      cursor.style.top = '100px';
      cursor.style.left = '220px';
      
      await sleep(500);
      camera.style.transition = 'transform 0.8s cubic-bezier(0.16,1,0.3,1)';
      camera.style.transform = 'scale(1) translate(0, 0)';
      
      await sleep(1500);
    }
  }
}


document.addEventListener('click', e => { if (!dd.contains(e.target)) toggle(false); });
  menu.querySelectorAll('.dropdown-item[data-tab]').forEach(i => { i.onclick = () => { toggle(false); switchTab(i.dataset.tab); }; });
}

function initCodeButtons() {
  document.querySelectorAll('.code-copy-btn').forEach(btn => {
    btn.onclick = e => {
      e.stopPropagation();
      const code = (document.getElementById('code-' + btn.dataset.code + '-data') || {}).textContent?.trim();
      if (!code) return;
      navigator.clipboard.writeText(code).then(() => {
        const icon = btn.querySelector('i[data-lucide]'), lbl = btn.querySelector('span'), orig = lbl?.textContent;
        if (icon) { icon.setAttribute('data-lucide','check-circle-2'); lucide.createIcons(); }
        if (lbl) lbl.textContent = 'Copiado!';
        btn.disabled = true; showToast('Codigo copiado!');
        setTimeout(() => { if (icon) { icon.setAttribute('data-lucide','copy'); lucide.createIcons(); } if (lbl) lbl.textContent = orig; btn.disabled = false; }, 2000);
      }).catch(() => showToast('Erro ao copiar'));
    };
  });
  initDropdown('codeMenuBtnDiscrete','codeMenuDiscrete');
  initDropdown('codeMenuBtnLegacy','codeMenuLegacy');
}

function initHints() {
  document.querySelectorAll('.hint-btn').forEach(btn => { btn.onclick = e => { e.stopPropagation(); openOverlay(btn.dataset.hint); if(window.lucide) lucide.createIcons(); }; });
  document.querySelectorAll('.hint-close').forEach(btn => { btn.onclick = closeOverlay; });
}

let _totalCommits = 0;
const sleep = ms => new Promise(r => setTimeout(r, ms));
function toVer(n) { return 'v' + String(n).split('').join('.'); }
function versionFromTotal(total) {
  const value = Number(total);
  if (!Number.isFinite(value) || value <= 0) return 'v0.0.0';
  return toVer(value);
}
function escH(u) { return u.replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[m]); }
function appendCacheBust(url) {
  try {
    const u = new URL(url, window.location.href);
    u.searchParams.set('_', String(Date.now()));
    return u.toString();
  } catch {
    return `${url}${url.includes('?') ? '&' : '?'}_=${Date.now()}`;
  }
}
async function fetchNoCache(url, options = {}) {
  const resource = appendCacheBust(url);
  return fetch(resource, {
    ...options,
    cache: 'no-store',
    credentials: 'omit',
    headers: {
      ...(options.headers || {}),
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28'
    }
  });
}

async function fetchLatestCommit() {
  try {
    let d, total = 0;
    try {
      const r = await fetchNoCache('commits.json');
      if (r.ok) {
        d = await r.json();
        total = Array.isArray(d) ? d.length : 0;
        try {
          const mr = await fetchNoCache('meta.json');
          if (mr.ok) {
            const meta = await mr.json();
            total = Number(meta.total) || total || 0;
          }
        } catch(e){}
      }
    } catch(e) {}
    
    if (!d || !d[0]) {
      const r = await fetchNoCache('https://api.github.com/repos/minifoxie/EasyQuiz/commits?per_page=1');
      if (!r.ok) throw new Error('Rate limit');
      const lh = r.headers.get('link'); if (lh) { const m = lh.match(/page=(\d+)>; rel="last"/); if (m) total = parseInt(m[1]); }
      d = await r.json();
    }
    
    if (!d||!d[0]) throw new Error('Empty');
    _totalCommits = total || d.length || 0;
    
    const sha = d[0].sha.slice(0,7), dt = new Date(d[0].commit.author.date).toLocaleDateString('pt-BR');
    const ver = versionFromTotal(_totalCommits);
    document.querySelectorAll('#site-version,#home-version').forEach(el => el.textContent = ver);
    const sl = sha+' · '+dt;
    document.querySelectorAll('#discrete-sha,#legacy-sha').forEach(el => el.textContent = sl);
  } catch(_) {
    document.querySelectorAll('#site-version,#home-version').forEach(el => el.textContent = 'v0.0.0'); 
    document.querySelectorAll('#discrete-sha,#legacy-sha').forEach(el => el.textContent = 'GitHub indisponivel');
  }
}

let _curPage = 1;
async function loadChangelog(page) {
  _curPage = page;
  const ctr = document.getElementById('commits-container'); if (!ctr) return;
  ctr.innerHTML = '<div class="commits-loading"><i data-lucide="loader-2" class="spin-icon"></i> Carregando historico...</div>';
  if (window.lucide) lucide.createIcons();
  try {
    let commits = null, total = _totalCommits || 200;
    
    try {
      const r = await fetchNoCache('commits.json');
      if (r.ok) {
        const allCommits = await r.json();
        total = Array.isArray(allCommits) ? allCommits.length : 0;
        try {
          const mr = await fetchNoCache('meta.json');
          if (mr.ok) {
            const meta = await mr.json();
            total = Number(meta.total) || total || 0;
          }
        } catch(e){}
        _totalCommits = total;
        const start = (page - 1) * 20;
        commits = Array.isArray(allCommits) ? allCommits.slice(start, start + 20) : null;
        if (commits && commits.length === 0) commits = null;
      }
    } catch(e) {}

    if (!commits) {
      const [res, tr] = await Promise.all([
          fetchNoCache('https://api.github.com/repos/minifoxie/EasyQuiz/commits?per_page=20&page=' + page),
          fetchNoCache('https://api.github.com/repos/minifoxie/EasyQuiz/commits?per_page=1')
      ]);
      if (!res.ok) throw new Error('Rate limit');
      commits = await res.json();
      if (!Array.isArray(commits)) throw new Error('Not an array');
      const lh = tr.headers.get('link'); 
      if (lh) { const m = lh.match(/page=(\d+)>; rel="last"/); if(m) total = parseInt(m[1]); }
      _totalCommits = total;
    }
    ctr.innerHTML = '';
    commits.forEach((c,i) => {
      const gi = total - ((page-1)*20+i), vs = toVer(gi);
      const lines = c.commit.message.split('\n'), title = lines[0], body = lines.slice(1).join('\n').trim();
      const dt = new Date(c.commit.author.date).toLocaleString('pt-BR');
      
      const el = document.createElement('div'); el.className = 'commit-row glass';
      
      const animDir = (i % 2 === 0) ? 'slide-right' : 'slide-left';
      el.setAttribute('data-anim', animDir);
      el.style.setProperty('--delay', `${0.05 * i}s`);
      
      const desc = body ? '<div class="commit-full-desc">'+escH(body)+'</div>' : '<div class="commit-full-desc" style="color:var(--gray-3);font-style:italic">Sem descricao adicional.</div>';
      
      el.innerHTML = '<div class="commit-main"><div class="commit-version">'+escH(vs)+'</div><div class="commit-content"><div class="commit-title">'+escH(title)+'</div>'+(body?'<div class="commit-body">'+escH(body.length>200?body.slice(0,200)+'...':body)+'</div>':'')+'<div class="commit-meta">por <strong>'+escH(c.commit.author.name)+'</strong> — '+escH(dt)+'</div></div><div class="commit-right-icon"><i data-lucide="chevron-down"></i></div></div><div class="commit-details-inline">'+desc+'<div class="commit-actions"><a href="'+c.html_url+'" target="_blank" class="btn btn-outline sm" onclick="event.stopPropagation()">Ver no GitHub <i data-lucide="external-link"></i></a><a href="https://github.com/minifoxie/EasyQuiz/commit/'+c.sha+'" target="_blank" class="btn btn-secondary sm" onclick="event.stopPropagation()"><i data-lucide="git-commit-horizontal"></i> Diff</a></div></div>';
      
      el.onclick = () => { const o = el.classList.contains('open'); document.querySelectorAll('.commit-row').forEach(r => r.classList.remove('open')); if(!o){el.classList.add('open');setTimeout(()=>el.scrollIntoView({behavior:'smooth',block:'nearest'}),300);} };
      ctr.appendChild(el);
    });
    document.getElementById('pagination-row').style.display = 'flex';
    document.getElementById('page-info').textContent = 'Pagina '+page+' de '+Math.ceil(total/20);
    document.getElementById('prev-page').disabled = (page===1);
    document.getElementById('next-page').disabled = (page>=Math.ceil(total/20));
    window._commitsLoaded = true;
    if (window.lucide) lucide.createIcons();
    initReveal();
  } catch(_){ 
    const commits = [
      { sha: "614f8ab", commit: { message: "fix: aumentou transparencia geral em 10%, atualizou sistema de versionamento", author: { name: "minifoxie", date: new Date().toISOString() } }, html_url: "https://github.com/minifoxie/EasyQuiz" },
      { sha: "50c647c", commit: { message: "fix: restore 25% transparent black to backgrounds, fix layout of hint-disclaimer-card", author: { name: "minifoxie", date: new Date(Date.now() - 3600000).toISOString() } }, html_url: "https://github.com/minifoxie/EasyQuiz" },
      { sha: "1120f98", commit: { message: "fix: make all gray backgrounds explicitly #1a1a1a without delay", author: { name: "minifoxie", date: new Date(Date.now() - 7200000).toISOString() } }, html_url: "https://github.com/minifoxie/EasyQuiz" },
      { sha: "54e925a", commit: { message: "fix: previne execuçao ao clicar nos botoes de arrastar", author: { name: "minifoxie", date: new Date(Date.now() - 10800000).toISOString() } }, html_url: "https://github.com/minifoxie/EasyQuiz" }
    ];
    let total = 228;
    ctr.innerHTML = '';
    commits.forEach((c,i) => {
      const gi = total - i, vs = toVer(gi);
      const lines = c.commit.message.split('\n'), title = lines[0], body = lines.slice(1).join('\n').trim();
      const dt = new Date(c.commit.author.date).toLocaleString('pt-BR');
      
      const el = document.createElement('div'); el.className = 'commit-row glass';
      
      const animDir = (i % 2 === 0) ? 'slide-right' : 'slide-left';
      el.setAttribute('data-anim', animDir);
      el.style.setProperty('--delay', `${0.05 * i}s`);
      
      const desc = body ? '<div class="commit-full-desc">'+escH(body)+'</div>' : '<div class="commit-full-desc" style="color:var(--gray-3);font-style:italic">Sem descricao adicional.</div>';
      
      el.innerHTML = '<div class="commit-main"><div class="commit-version">'+escH(vs)+'</div><div class="commit-content"><div class="commit-title">'+escH(title)+'</div>'+(body?'<div class="commit-body">'+escH(body.length>200?body.slice(0,200)+'...':body)+'</div>':'')+'<div class="commit-meta">por <strong>'+escH(c.commit.author.name)+'</strong> — '+escH(dt)+'</div></div><div class="commit-right-icon"><i data-lucide="chevron-down"></i></div></div><div class="commit-details-inline">'+desc+'<div class="commit-actions"><a href="'+c.html_url+'" target="_blank" class="btn btn-outline sm" onclick="event.stopPropagation()">Ver no GitHub <i data-lucide="external-link"></i></a></div></div>';
      
      el.onclick = () => { const o = el.classList.contains('open'); document.querySelectorAll('.commit-row').forEach(r => r.classList.remove('open')); if(!o){el.classList.add('open');setTimeout(()=>el.scrollIntoView({behavior:'smooth',block:'nearest'}),300);} };
      ctr.appendChild(el);
    });
    if (window.lucide) lucide.createIcons();
    initReveal();
}
}

let _tt;
function showToast(msg) {
  const t = document.getElementById('toast'); t.querySelector('.toast-msg').textContent = msg;
  t.classList.remove('show'); void t.offsetWidth; t.classList.add('show');
  clearTimeout(_tt); _tt = setTimeout(() => t.classList.remove('show'), 2600);
}

window.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) lucide.createIcons();
  initDropdown('installDropdownBtn','installDropdownMenu');
  initDropdown('navModeBtn','navModeMenu');
  initCodeButtons(); initHints();
  document.querySelectorAll('.nav-links > .nav-btn').forEach(b => { b.onclick = e => { e.preventDefault(); switchTab(b.dataset.target); }; });
  document.getElementById('prev-page').onclick = () => loadChangelog(_curPage-1);
  document.getElementById('next-page').onclick = () => loadChangelog(_curPage+1);
  window.addEventListener('hashchange', () => { switchTab(window.location.hash.replace('#','') || 'home'); });
  switchTab(window.location.hash.replace('#','') || 'home');
  fetchLatestCommit();
});
