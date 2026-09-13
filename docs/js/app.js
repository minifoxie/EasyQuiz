/* =============================================
   EasyQuiz — App Script v2.2
   Interactive Grid, Sliding Nav, Staggered Anim,
   Accordion Code Blocks, Dropdown, Copy Toast
   ============================================= */

// ─────────────────────────────────────────────
//  INTERACTIVE GRID BACKGROUND
// ─────────────────────────────────────────────
(function initCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const CELL = 54;
  let cols = 0, rows = 0;
  let mouse = { x: -9999, y: -9999 };
  let animId = null;

  function resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.scale(dpr, dpr);
    cols = Math.ceil(window.innerWidth / CELL) + 1;
    rows = Math.ceil(window.innerHeight / CELL) + 1;
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  window.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = -9999;
    mouse.y = -9999;
  });

  function drawGrid() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const cx = c * CELL;
        const cy = r * CELL;
        const dx = cx - mouse.x;
        const dy = cy - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 160;
        const intensity = Math.max(0, 1 - dist / maxDist);

        // Dot
        const dotR = 1 + intensity * 2.5;
        const alpha = 0.08 + intensity * 0.55;
        ctx.beginPath();
        ctx.arc(cx, cy, dotR, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fill();

        // Subtle connecting lines
        if (intensity > 0.05) {
          ctx.strokeStyle = `rgba(14, 165, 233, ${intensity * 0.15})`;
          ctx.lineWidth = 0.5;
          if (c < cols - 1) {
            ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + CELL, cy); ctx.stroke();
          }
          if (r < rows - 1) {
            ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx, cy + CELL); ctx.stroke();
          }
        }
      }
    }

    animId = requestAnimationFrame(drawGrid);
  }

  drawGrid();
})();


// ─────────────────────────────────────────────
//  SLIDING NAV PILL
// ─────────────────────────────────────────────
let navPill = null;

function initNavPill() {
  const navLinks = document.querySelector('.nav-links');
  if (!navLinks) return;

  navPill = document.createElement('div');
  navPill.className = 'nav-pill';
  navLinks.prepend(navPill);

  // Position pill after DOM layout
  requestAnimationFrame(movePillToActive);
}

function movePillToActive() {
  if (!navPill) return;
  const activeBtn = document.querySelector('.nav-btn.active');
  if (!activeBtn) {
    navPill.style.opacity = '0';
    return;
  }
  navPill.style.opacity = '1';
  navPill.style.left = activeBtn.offsetLeft + 'px';
  navPill.style.top = activeBtn.offsetTop + 'px';
  navPill.style.width = activeBtn.offsetWidth + 'px';
  navPill.style.height = activeBtn.offsetHeight + 'px';
}


// ─────────────────────────────────────────────
//  TAB SWITCHING WITH STAGGERED ANIMATIONS
// ─────────────────────────────────────────────
function switchTab(targetId) {
  const targetPane = document.getElementById(targetId);
  if (!targetPane) return;

  // Update tabs UI
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.target === targetId);
  });

  movePillToActive();

  // Hide current active pane
  document.querySelectorAll('.tab-pane.active').forEach(pane => {
    if (pane.id !== targetId) {
      pane.classList.remove('active');
    }
  });

  // Activate target pane
  targetPane.classList.add('active');

  // Trigger staggered animations
  const children = targetPane.querySelectorAll('.stagger-child');
  children.forEach((el, index) => {
    el.classList.remove('stagger-done');
    el.style.animationDelay = `${index * 55}ms`;
    void el.offsetWidth; // force reflow
    el.classList.add('stagger-done');
  });

  if (window.lucide) {
    lucide.createIcons();
  }

  // Update URL hash smoothly
  history.replaceState(null, null, '#' + targetId);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}


// ─────────────────────────────────────────────
//  DROPDOWN MENU
// ─────────────────────────────────────────────
function initDropdown() {
  const btn = document.getElementById('installDropdownBtn');
  const menu = document.getElementById('installDropdownMenu');
  if (!btn || !menu) return;
  const dropdown = btn.closest('.dropdown');

  function openMenu() {
    dropdown.classList.add('active');
    btn.setAttribute('aria-expanded', 'true');
    menu.style.display = 'block';
    requestAnimationFrame(() => menu.classList.add('open'));
  }

  function closeMenu() {
    dropdown.classList.remove('active');
    btn.setAttribute('aria-expanded', 'false');
    menu.classList.remove('open');
    setTimeout(() => {
      if (!dropdown.classList.contains('active')) {
        menu.style.display = 'none';
      }
    }, 220);
  }

  btn.addEventListener('click', e => {
    e.stopPropagation();
    dropdown.classList.contains('active') ? closeMenu() : openMenu();
  });

  document.addEventListener('click', e => {
    if (!dropdown.contains(e.target)) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && dropdown.classList.contains('active')) {
      closeMenu();
    }
  });

  // Items click
  dropdown.querySelectorAll('.dropdown-item[data-tab]').forEach(item => {
    item.addEventListener('click', () => {
      const tab = item.dataset.tab;
      closeMenu();
      switchTab(tab);
    });
  });
}


// ─────────────────────────────────────────────
//  ACCORDION CODE BLOCKS
// ─────────────────────────────────────────────
function initAccordions() {
  document.querySelectorAll('.accordion-toggle').forEach(toggle => {
    const block = toggle.closest('.code-accordion');
    const content = block.querySelector('.accordion-content');

    function toggleAccordion() {
      const isOpen = block.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      if (isOpen) {
        content.style.maxHeight = content.scrollHeight + 40 + 'px';
      } else {
        content.style.maxHeight = '0';
      }
    }

    toggle.addEventListener('click', e => {
      // Ignore clicks on copy button
      if (e.target.closest('.copy-btn')) return;
      toggleAccordion();
    });

    toggle.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleAccordion();
      }
    });
  });
}


// ─────────────────────────────────────────────
//  COPY BUTTONS & TOAST
// ─────────────────────────────────────────────
function initCopyButtons() {
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const codeId = btn.dataset.code;
      const el = document.getElementById(codeId);
      if (!el) return;

      const text = el.innerText.trim();
      copyToClipboard(text, () => {
        showToast('Código copiado! Cole como URL do favorito.');
        btn.classList.add('copied');
        const originalHTML = btn.innerHTML;
        btn.innerHTML = '<i data-lucide="check"></i> <span>Copiado!</span>';
        if (window.lucide) lucide.createIcons();

        setTimeout(() => {
          btn.innerHTML = originalHTML;
          btn.classList.remove('copied');
          if (window.lucide) lucide.createIcons();
        }, 2400);
      });
    });
  });
}

function copyToClipboard(text, onSuccess) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(onSuccess).catch(() => fallbackCopy(text, onSuccess));
  } else {
    fallbackCopy(text, onSuccess);
  }
}

function fallbackCopy(text, onSuccess) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.position = 'fixed';
  ta.style.opacity = '0';
  document.body.appendChild(ta);
  ta.select();
  try {
    document.execCommand('copy');
    if (onSuccess) onSuccess();
  } catch (err) {
    alert('Por favor copie o código manualmente.');
  }
  document.body.removeChild(ta);
}

let toastTimer = null;
function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  const msgEl = toast.querySelector('.toast-msg');
  if (msgEl) msgEl.textContent = message;

  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}


// ─────────────────────────────────────────────
//  INITIALIZATION ON DOM READY
// ─────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) {
    lucide.createIcons();
  }

  initNavPill();
  initDropdown();
  initAccordions();
  initCopyButtons();

  // Handle Tab navigation buttons
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      switchTab(btn.dataset.target);
    });
  });

  // Resize listener for sliding nav pill
  window.addEventListener('resize', () => {
    requestAnimationFrame(movePillToActive);
  });

  // Handle initial URL hash or default to home
  const initialHash = window.location.hash.replace('#', '');
  if (initialHash && document.getElementById(initialHash)) {
    switchTab(initialHash);
  } else {
    // Animate home pane children
    const homePane = document.getElementById('home');
    if (homePane) {
      homePane.querySelectorAll('.stagger-child').forEach((el, i) => {
        el.style.animationDelay = `${i * 55}ms`;
        el.classList.add('stagger-done');
      });
    }
  }
});
