/* EasyQuiz App v3.1 */

// ─── Background Grid (Extreme hover glow) ─────────────────────────────────────
(function initGrid() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const CELL = 52;
  let cols = 0, rows = 0, mouse = { x: -9999, y: -9999 };

  function resize() {
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.scale(dpr, dpr);
    cols = Math.ceil(window.innerWidth / CELL) + 1;
    rows = Math.ceil(window.innerHeight / CELL) + 1;
  }
  window.addEventListener('resize', resize);
  resize();

  let targetMouse = { x: -9999, y: -9999 };
  let currMouse = { x: -9999, y: -9999 };

  window.addEventListener('mousemove', e => { targetMouse.x = e.clientX; targetMouse.y = e.clientY; });
  window.addEventListener('mouseleave', () => { targetMouse.x = -9999; targetMouse.y = -9999; });

  function lerp(a, b, t) { return a + (b - a) * t; }

  function draw() {
    // Smooth mouse interpolation for trailing effect
    currMouse.x = lerp(currMouse.x, targetMouse.x, 0.08);
    currMouse.y = lerp(currMouse.y, targetMouse.y, 0.08);

    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const cx = c * CELL;
        const cy = r * CELL;
        const dx = cx - currMouse.x;
        const dy = cy - currMouse.y;
        const dist = Math.sqrt(dx*dx + dy*dy);

        // Primary glow zone (tight + bright)
        const intensity = Math.max(0, 1 - dist / 160);
        // Secondary ripple zone
        const ripple = Math.max(0, 1 - dist / 400) * 0.2;

        const dotR = 0.7 + intensity * 3.5 + ripple;
        const alpha = 0.05 + intensity * 0.7 + ripple;
        ctx.beginPath();
        ctx.arc(cx, cy, dotR, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,' + alpha + ')';
        ctx.fill();
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
})();

// ─── Scroll Reveal ────────────────────────────────────────────────────────────
function initReveal() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('revealed'); obs.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('[data-reveal]').forEach(el => obs.observe(el));
}

// ─── Tab Switching ─────────────────────────────────────────────────────────────
function switchTab(id) {
  const pane = document.getElementById(id);
  if (!pane) return;
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.toggle('active', b.dataset.target === id));
  document.querySelectorAll('.tab-pane.active').forEach(p => { if (p.id !== id) p.classList.remove('active'); });
  pane.classList.add('active');
  if (window.lucide) lucide.createIcons();
  initReveal();
  history.replaceState(null, null, '#' + id);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ─── Dropdown ─────────────────────────────────────────────────────────────────
function initDropdown() {
  const btn = document.getElementById('installDropdownBtn');
  const menu = document.getElementById('installDropdownMenu');
  if (!btn || !menu) return;
  const dd = btn.closest('.dropdown');
  const open = () => { dd.classList.add('active'); btn.setAttribute('aria-expanded','true'); menu.classList.add('open'); };
  const close = () => { dd.classList.remove('active'); btn.setAttribute('aria-expanded','false'); menu.classList.remove('open'); };
  btn.addEventListener('click', e => { e.stopPropagation(); dd.classList.contains('active') ? close() : open(); });
  document.addEventListener('click', e => { if (!dd.contains(e.target)) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  dd.querySelectorAll('.dropdown-item[data-tab]').forEach(it => {
    it.addEventListener('click', () => { close(); switchTab(it.dataset.tab); });
  });
}

// ─── Accordions ───────────────────────────────────────────────────────────────
function initAccordions() {
  function setup(btnId, contentId) {
    const btn = document.getElementById(btnId);
    const content = document.getElementById(contentId);
    if (!btn || !content) return;
    btn.addEventListener('click', () => {
      const expanded = content.classList.toggle('expanded');
      const chevron = btn.querySelector('.acc-chevron');
      if (chevron) chevron.classList.toggle('rotated', expanded);
      btn.querySelector('span').textContent = expanded ? 'Recolher Código' : 'Ver Código';
    });
  }
  setup('toggle-discrete-code', 'content-discrete-code');
  setup('toggle-legacy-code', 'content-legacy-code');
}

// ─── Copy Buttons ──────────────────────────────────────────────────────────────
function initCopyButtons() {
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const el = document.getElementById(btn.dataset.code);
      if (!el) return;
      const text = el.innerText.trim();
      const orig = btn.innerHTML;
      navigator.clipboard.writeText(text).then(() => {
        showToast('Código copiado! Cole no URL do favorito.');
        btn.innerHTML = '<i data-lucide="check"></i> <span>Copiado!</span>';
        if (window.lucide) lucide.createIcons();
        setTimeout(() => { btn.innerHTML = orig; if (window.lucide) lucide.createIcons(); }, 2200);
      }).catch(() => {
        const ta = document.createElement('textarea');
        ta.value = text; ta.style.cssText = 'position:fixed;opacity:0';
        document.body.appendChild(ta); ta.select();
        try { document.execCommand('copy'); showToast('Código copiado!'); } catch(e) {}
        document.body.removeChild(ta);
      });
    });
  });
}

// ─── Toast (Animated) ─────────────────────────────────────────────────────────
let _tt = null;
function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.querySelector('.toast-msg').textContent = msg;
  t.classList.remove('show');
  void t.offsetWidth; // force reflow for re-animation
  t.classList.add('show');
  if (window.lucide) lucide.createIcons();
  clearTimeout(_tt);
  _tt = setTimeout(() => t.classList.remove('show'), 3000);
}

// ─── Init ──────────────────────────────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) lucide.createIcons();
  initDropdown();
  initAccordions();
  initCopyButtons();
  initReveal();

  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', e => { e.preventDefault(); switchTab(btn.dataset.target); });
  });

  const hash = window.location.hash.replace('#', '');
  if (hash && document.getElementById(hash)) switchTab(hash);
});