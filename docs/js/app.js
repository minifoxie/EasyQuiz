/* EasyQuiz App v3.0 */

// ─── Background Grid Canvas ───────────────────────────────────────────────────
(function initGrid() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const CELL = 54;
  let cols = 0, rows = 0;
  let mouse = { x: -9999, y: -9999 };

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

  window.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  window.addEventListener('mouseleave', () => {
    mouse.x = -9999;
    mouse.y = -9999;
  });

  function draw() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const cx = c * CELL;
        const cy = r * CELL;
        const dx = cx - mouse.x;
        const dy = cy - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const intensity = Math.max(0, 1 - dist / 180);
        const dotR = 0.8 + intensity * 2.5;
        const alpha = 0.06 + intensity * 0.55;
        ctx.beginPath();
        ctx.arc(cx, cy, dotR, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, ' + alpha + ')';
        ctx.fill();
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
})();

// ─── Tab Switching ────────────────────────────────────────────────────────────
function switchTab(targetId) {
  const targetPane = document.getElementById(targetId);
  if (!targetPane) return;

  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.target === targetId);
  });

  document.querySelectorAll('.tab-pane.active').forEach(pane => {
    if (pane.id !== targetId) pane.classList.remove('active');
  });

  targetPane.classList.add('active');
  if (window.lucide) lucide.createIcons();
  history.replaceState(null, null, '#' + targetId);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ─── Dropdown ─────────────────────────────────────────────────────────────────
function initDropdown() {
  const btn = document.getElementById('installDropdownBtn');
  const menu = document.getElementById('installDropdownMenu');
  if (!btn || !menu) return;
  const dropdown = btn.closest('.dropdown');

  const open = () => {
    dropdown.classList.add('active');
    btn.setAttribute('aria-expanded', 'true');
    menu.classList.add('open');
  };
  const close = () => {
    dropdown.classList.remove('active');
    btn.setAttribute('aria-expanded', 'false');
    menu.classList.remove('open');
  };

  btn.addEventListener('click', e => {
    e.stopPropagation();
    dropdown.classList.contains('active') ? close() : open();
  });
  document.addEventListener('click', e => {
    if (!dropdown.contains(e.target)) close();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') close();
  });
  dropdown.querySelectorAll('.dropdown-item[data-tab]').forEach(item => {
    item.addEventListener('click', () => { close(); switchTab(item.dataset.tab); });
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
      btn.querySelector('span').textContent = expanded ? 'Recolher Código Fonte' : 'Ver Código Fonte';
    });
  }
  setup('toggle-discrete-code', 'content-discrete-code');
  setup('toggle-legacy-code', 'content-legacy-code');
}

// ─── Copy Buttons ─────────────────────────────────────────────────────────────
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
        setTimeout(() => {
          btn.innerHTML = orig;
          if (window.lucide) lucide.createIcons();
        }, 2200);
      }).catch(() => {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.cssText = 'position:fixed;opacity:0';
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); showToast('Código copiado!'); } catch(e) {}
        document.body.removeChild(ta);
      });
    });
  });
}

// ─── Toast ────────────────────────────────────────────────────────────────────
let _toastTimer = null;
function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.querySelector('.toast-msg').textContent = msg;
  t.classList.add('show');
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => t.classList.remove('show'), 2800);
}

// ─── Init ─────────────────────────────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) lucide.createIcons();
  initDropdown();
  initAccordions();
  initCopyButtons();

  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      switchTab(btn.dataset.target);
    });
  });

  const hash = window.location.hash.replace('#', '');
  if (hash && document.getElementById(hash)) switchTab(hash);
});