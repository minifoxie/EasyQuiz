/* =============================================
   EasyQuiz — App Script v2.0
   Interactive BG, Sliding Nav, Staggered Anim
   Accordion Code Blocks, Dropdown, Toast
   ============================================= */

// ─────────────────────────────────────────────
//  INTERACTIVE GRID BACKGROUND
// ─────────────────────────────────────────────
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
const CELL = 60;
let cols, rows, mouse = { x: -9999, y: -9999 };

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  cols = Math.ceil(canvas.width / CELL) + 1;
  rows = Math.ceil(canvas.height / CELL) + 1;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

window.addEventListener('mousemove', e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

function drawGrid() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cx = c * CELL;
      const cy = r * CELL;
      const dx = cx - mouse.x;
      const dy = cy - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxDist = 180;
      const intensity = Math.max(0, 1 - dist / maxDist);

      // Grid dot
      const dotR = 1 + intensity * 3;
      const alpha = 0.12 + intensity * 0.6;
      ctx.beginPath();
      ctx.arc(cx, cy, dotR, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${alpha})`;
      ctx.fill();

      // Grid lines (subtle)
      ctx.strokeStyle = `rgba(255,255,255,${0.03 + intensity * 0.1})`;
      ctx.lineWidth = 0.5;
      if (c < cols - 1) {
        ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + CELL, cy); ctx.stroke();
      }
      if (r < rows - 1) {
        ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx, cy + CELL); ctx.stroke();
      }
    }
  }

  requestAnimationFrame(drawGrid);
}
drawGrid();


// ─────────────────────────────────────────────
//  SLIDING NAV PILL
// ─────────────────────────────────────────────
let pill = null;

function initNavPill() {
  pill = document.createElement('div');
  pill.className = 'nav-pill';
  document.querySelector('.nav-links').prepend(pill);
  movePillToActive();
}

function movePillToActive() {
  if (!pill) return;
  const active = document.querySelector('.nav-btn.active');
  if (!active) return;
  const rect = active.getBoundingClientRect();
  const navRect = document.querySelector('.nav-links').getBoundingClientRect();
  pill.style.width = rect.width + 'px';
  pill.style.height = rect.height + 'px';
  pill.style.left = (rect.left - navRect.left) + 'px';
}


// ─────────────────────────────────────────────
//  TAB SWITCHING WITH STAGGERED ANIMATION
// ─────────────────────────────────────────────
function switchTab(targetId) {
  // Fade out current
  document.querySelectorAll('.tab-pane.active').forEach(p => {
    p.classList.add('leaving');
    setTimeout(() => { p.classList.remove('active', 'leaving'); }, 280);
  });

  // Update nav
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.target === targetId) btn.classList.add('active');
  });

  movePillToActive();

  // Activate new pane with stagger
  setTimeout(() => {
    const pane = document.getElementById(targetId);
    if (!pane) return;
    pane.classList.add('active');

    // Stagger children
    const children = pane.querySelectorAll('.stagger-child');
    children.forEach((el, i) => {
      el.style.animationDelay = `${i * 60}ms`;
      el.classList.remove('stagger-done');
      void el.offsetWidth; // reflow
      el.classList.add('stagger-done');
    });

    lucide.createIcons();
    history.replaceState(null, null, '#' + targetId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, 100);
}


// ─────────────────────────────────────────────
//  DROPDOWN CONTEXT MENU  (Spring animation)
// ─────────────────────────────────────────────
function initDropdown() {
  const btn = document.getElementById('installDropdownBtn');
  const dropdown = btn ? btn.closest('.dropdown') : null;
  if (!btn || !dropdown) return;

  btn.addEventListener('click', e => {
    e.stopPropagation();
    e.preventDefault();
    const isOpen = dropdown.classList.toggle('active');
    const menu = dropdown.querySelector('.dropdown-menu');
    if (isOpen) {
      menu.style.display = 'block';
      requestAnimationFrame(() => menu.classList.add('open'));
    } else {
      menu.classList.remove('open');
      setTimeout(() => { menu.style.display = ''; }, 300);
    }
  });

  document.addEventListener('click', e => {
    if (!dropdown.contains(e.target)) {
      dropdown.classList.remove('active');
      const menu = dropdown.querySelector('.dropdown-menu');
      if (menu) {
        menu.classList.remove('open');
        setTimeout(() => { menu.style.display = ''; }, 300);
      }
    }
  });

  // Dropdown items → navigate tab
  dropdown.querySelectorAll('.dropdown-item[data-tab]').forEach(item => {
    item.addEventListener('click', () => {
      switchTab(item.dataset.tab);
      dropdown.classList.remove('active');
      const menu = dropdown.querySelector('.dropdown-menu');
      menu.classList.remove('open');
      setTimeout(() => { menu.style.display = ''; }, 300);
    });
  });
}


// ─────────────────────────────────────────────
//  ACCORDION CODE BLOCKS
// ─────────────────────────────────────────────
function initAccordions() {
  document.querySelectorAll('.accordion-toggle').forEach(toggle => {
    toggle.addEventListener('click', () => {
      const block = toggle.closest('.code-accordion');
      const content = block.querySelector('.accordion-content');
      const isOpen = block.classList.toggle('open');
      content.style.maxHeight = isOpen ? content.scrollHeight + 'px' : '0';
      toggle.querySelector('.acc-chevron').style.transform = isOpen ? 'rotate(180deg)' : 'rotate(0)';
    });
  });
}


// ─────────────────────────────────────────────
//  COPY BUTTONS
// ─────────────────────────────────────────────
function initCopyButtons() {
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const codeId = btn.dataset.code;
      const el = document.getElementById(codeId);
      if (!el) return;
      navigator.clipboard.writeText(el.innerText.trim()).then(() => {
        showToast('Código copiado! Cole como URL do favorito.');
        btn.classList.add('copied');
        const orig = btn.innerHTML;
        btn.innerHTML = '<i data-lucide="check"></i> Copiado!';
        lucide.createIcons();
        setTimeout(() => { btn.innerHTML = orig; btn.classList.remove('copied'); lucide.createIcons(); }, 2500);
      });
    });
  });
}


// ─────────────────────────────────────────────
//  TOAST
// ─────────────────────────────────────────────
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.querySelector('.toast-msg').textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3200);
}


// ─────────────────────────────────────────────
//  BETA TOOLTIP
// ─────────────────────────────────────────────
function initBetaTooltip() {
  const badge = document.getElementById('beta-badge');
  if (!badge) return;
  badge.addEventListener('mouseenter', () => badge.querySelector('.beta-tooltip').classList.add('visible'));
  badge.addEventListener('mouseleave', () => badge.querySelector('.beta-tooltip').classList.remove('visible'));
}


// ─────────────────────────────────────────────
//  INIT
// ─────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();
  initNavPill();
  initDropdown();
  initAccordions();
  initCopyButtons();
  initBetaTooltip();

  // Load tab from hash
  const hash = window.location.hash.replace('#', '');
  if (hash && document.getElementById(hash)) {
    switchTab(hash);
  } else {
    // Stagger home children on load
    const pane = document.getElementById('home');
    pane.querySelectorAll('.stagger-child').forEach((el, i) => {
      el.style.animationDelay = `${i * 80}ms`;
      el.classList.add('stagger-done');
    });
  }

  // Nav click
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      switchTab(btn.dataset.target);
    });
  });

  // Resize pill
  window.addEventListener('resize', movePillToActive);
});
