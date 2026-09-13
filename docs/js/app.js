/* EasyQuiz App v4.1 */

(function initExtremeGrid() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let cols=0, rows=0;
  const CELL = 48;
  let mouse = { x: -9999, y: -9999 }, target = { x: -9999, y: -9999 };
  let clickPulse = 0;
  
  // Chaotic particles
  let particles = [];
  for(let i=0; i<30; i++) {
    particles.push({ x: -9999, y: -9999, vx: 0, vy: 0, life: 0, size: 0, hue: 0 });
  }

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    cols = Math.ceil(window.innerWidth/CELL)+1;
    rows = Math.ceil(window.innerHeight/CELL)+1;
  }
  window.addEventListener('resize', resize); resize();
  window.addEventListener('mousemove', e => { target.x=e.clientX; target.y=e.clientY; });
  window.addEventListener('mouseleave', () => { target.x=-9999; target.y=-9999; });
  window.addEventListener('mousedown', () => { 
    clickPulse = 1.0; 
    // Spawn chaos particles on click
    particles.forEach(p => {
      p.x = mouse.x; p.y = mouse.y;
      let ang = Math.random() * Math.PI * 2;
      let spd = Math.random() * 20 + 5;
      p.vx = Math.cos(ang) * spd; p.vy = Math.sin(ang) * spd;
      p.life = 1.0; p.size = Math.random() * 4 + 2; p.hue = Math.random() * 360;
    });
  });

  function draw() {
    mouse.x += (target.x - mouse.x) * 0.15;
    mouse.y += (target.y - mouse.y) * 0.15;
    clickPulse *= 0.85;

    // Dark clear with trailing effect
    ctx.fillStyle = 'rgba(3, 3, 3, 0.4)';
    ctx.fillRect(0,0,canvas.width,canvas.height);

    for (let r=0; r<rows; r++) {
      for (let c=0; c<cols; c++) {
        let cx = c*CELL, cy = r*CELL;
        let dx = cx - mouse.x, dy = cy - mouse.y;
        let dist = Math.sqrt(dx*dx + dy*dy);
        
        // EXTREME gravity effect
        let force = Math.max(0, 1 - dist/350); // Wider area
        let pull = force * 35 * (1 + clickPulse * 3); // Stronger pull
        
        let actX = cx - (dx/dist)*pull;
        let actY = cy - (dy/dist)*pull;

        let dotR = 1 + force * 12 + (clickPulse * force * 20); // Bigger dots
        let alpha = 0.08 + force * 0.9;
        
        ctx.beginPath();
        ctx.arc(actX || cx, actY || cy, dotR, 0, Math.PI*2);
        
        // Crazy rainbow glowing on hover peak
        if (force > 0.4) {
          ctx.fillStyle = `hsla(${(Date.now()/3 + dist)%360}, 100%, 65%, ${alpha})`;
        } else {
          ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        }
        ctx.fill();
      }
    }
    
    // Draw chaos particles
    particles.forEach(p => {
      if(p.life > 0) {
        p.x += p.vx; p.y += p.vy;
        p.vy += 0.5; // gravity
        p.life -= 0.02;
        p.size *= 0.95;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI*2);
        ctx.fillStyle = `hsla(${p.hue}, 100%, 60%, ${p.life})`;
        ctx.fill();
      }
    });

    requestAnimationFrame(draw);
  }
  draw();
})();

function initReveal() {
  const obs = new IntersectionObserver(ents => {
    ents.forEach(e => { if (e.isIntersecting) { e.target.classList.add('revealed'); obs.unobserve(e.target); } });
  }, { threshold: 0.05 });
  document.querySelectorAll('[data-reveal]').forEach(el => { el.classList.remove('revealed'); obs.observe(el); });
}

function switchTab(id) {
  const pane = document.getElementById(id);
  if(!pane) return;
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.toggle('active', b.dataset.target === id));
  document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
  pane.classList.add('active');
  initReveal();
  history.replaceState(null,null,'#'+id);
  window.scrollTo({top:0, behavior:'smooth'});
}

function initDropdowns() {
  // Main Nav Dropdown
  const btn = document.getElementById('installDropdownBtn'), menu = document.getElementById('installDropdownMenu');
  if(btn && menu) {
    const dd = btn.closest('.dropdown');
    const toggle = (open) => { dd.classList.toggle('active', open); menu.classList.toggle('open', open); };
    btn.onclick = e => { e.stopPropagation(); toggle(!dd.classList.contains('active')); };
    document.addEventListener('click', e => { if(!dd.contains(e.target)) toggle(false); });
    menu.querySelectorAll('.dropdown-item').forEach(i => i.onclick = () => { toggle(false); switchTab(i.dataset.tab); });
  }

  // Floating Code Dropdowns
  document.querySelectorAll('.float-code-btn').forEach(fbtn => {
    fbtn.onclick = e => {
      e.stopPropagation();
      const wrap = fbtn.closest('.floating-code-wrapper');
      const box = document.getElementById(fbtn.dataset.target);
      const isOpen = box.classList.contains('open');
      document.querySelectorAll('.floating-code-box').forEach(b => b.classList.remove('open'));
      document.querySelectorAll('.float-code-btn').forEach(b => b.classList.remove('active'));
      if(!isOpen) {
        box.classList.add('open');
        fbtn.classList.add('active');
      }
    };
  });
  document.addEventListener('click', e => {
    if(!e.target.closest('.floating-code-wrapper')) {
      document.querySelectorAll('.floating-code-box').forEach(b => b.classList.remove('open'));
      document.querySelectorAll('.float-code-btn').forEach(b => b.classList.remove('active'));
    }
  });
}

function initCopy() {
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.onclick = e => {
      e.stopPropagation();
      const code = document.getElementById(btn.dataset.code).innerText.trim();
      navigator.clipboard.writeText(code).then(() => {
        showToast('Código Copiado!');
        const og = btn.innerHTML;
        btn.innerHTML = '<i data-lucide="check"></i><span>Copiado</span>';
        if(window.lucide) lucide.createIcons();
        setTimeout(()=> { btn.innerHTML=og; if(window.lucide) lucide.createIcons(); }, 2000);
      });
    };
  });
}

function initDragBookmarks() {
  document.querySelectorAll('.drag-bm-btn').forEach(btn => {
    btn.ondragstart = (e) => {
      const name = btn.dataset.name || 'EasyQuiz';
      const uri = btn.href;
      // Many modern browsers prioritize the HTML element's drag text/url, 
      // but setting custom data Transfer can help in some browsers.
      e.dataTransfer.setData('text/plain', name);
      e.dataTransfer.setData('text/uri-list', uri);
    };
  });
}

let _t = null;
function showToast(m) {
  const t = document.getElementById('toast');
  t.querySelector('.toast-msg').textContent = m;
  t.classList.remove('show');
  void t.offsetWidth;
  t.classList.add('show');
  clearTimeout(_t);
  _t = setTimeout(()=> t.classList.remove('show'), 2500);
}

window.onload = () => {
  if(window.lucide) lucide.createIcons();
  initDropdowns(); initCopy(); initReveal(); initDragBookmarks();
  document.querySelectorAll('.nav-btn').forEach(b => b.onclick = e => { e.preventDefault(); switchTab(b.dataset.target); });
  const h = window.location.hash.replace('#','');
  if(h) switchTab(h);
};
