/* EasyQuiz App v4.0 */

(function initExtremeGrid() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let cols=0, rows=0;
  const CELL = 48;
  let mouse = { x: -9999, y: -9999 }, target = { x: -9999, y: -9999 };
  let clickPulse = 0;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    cols = Math.ceil(window.innerWidth/CELL)+1;
    rows = Math.ceil(window.innerHeight/CELL)+1;
  }
  window.addEventListener('resize', resize); resize();
  window.addEventListener('mousemove', e => { target.x=e.clientX; target.y=e.clientY; });
  window.addEventListener('mouseleave', () => { target.x=-9999; target.y=-9999; });
  window.addEventListener('mousedown', () => { clickPulse = 1.0; });

  function draw() {
    mouse.x += (target.x - mouse.x) * 0.15;
    mouse.y += (target.y - mouse.y) * 0.15;
    clickPulse *= 0.85;

    ctx.clearRect(0,0,canvas.width,canvas.height);
    for (let r=0; r<rows; r++) {
      for (let c=0; c<cols; c++) {
        let cx = c*CELL, cy = r*CELL;
        let dx = cx - mouse.x, dy = cy - mouse.y;
        let dist = Math.sqrt(dx*dx + dy*dy);
        
        // Extreme gravity effect
        let force = Math.max(0, 1 - dist/250);
        let pull = force * 24 * (1 + clickPulse * 2);
        
        let actX = cx - (dx/dist)*pull;
        let actY = cy - (dy/dist)*pull;

        let dotR = 1 + force * 8 + (clickPulse * force * 15);
        let alpha = 0.04 + force * 0.8;
        
        ctx.beginPath();
        ctx.arc(actX || cx, actY || cy, dotR, 0, Math.PI*2);
        // Rainbow glow on hover peak
        if (force > 0.8) {
          ctx.fillStyle = `hsla(${(Date.now()/5 + dist)%360}, 100%, 70%, ${alpha})`;
        } else {
          ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        }
        ctx.fill();
      }
    }
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

function initDropdown() {
  const btn = document.getElementById('installDropdownBtn'), menu = document.getElementById('installDropdownMenu');
  if(!btn||!menu) return;
  const dd = btn.closest('.dropdown');
  const toggle = (open) => { dd.classList.toggle('active', open); menu.classList.toggle('open', open); };
  btn.onclick = e => { e.stopPropagation(); toggle(!dd.classList.contains('active')); };
  document.onclick = e => { if(!dd.contains(e.target)) toggle(false); };
  menu.querySelectorAll('.dropdown-item').forEach(i => i.onclick = () => { toggle(false); switchTab(i.dataset.tab); });
}

function initAccordions() {
  document.querySelectorAll('.accordion-toggle-btn').forEach(btn => {
    btn.onclick = () => {
      const cId = btn.id.replace('toggle', 'content');
      const c = document.getElementById(cId);
      const open = c.classList.toggle('expanded');
      btn.querySelector('.acc-chevron').classList.toggle('rotated', open);
    };
  });
}

function initCopy() {
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.onclick = e => {
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
  initDropdown(); initAccordions(); initCopy(); initReveal();
  document.querySelectorAll('.nav-btn').forEach(b => b.onclick = e => { e.preventDefault(); switchTab(b.dataset.target); });
  const h = window.location.hash.replace('#','');
  if(h) switchTab(h);
};
