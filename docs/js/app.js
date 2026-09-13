/* =============================================
   EasyQuiz — App Script v2.3
   Fast, Reliable, No Bounce, High Performance
   ============================================= */

// Canvas Grid
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
        const intensity = Math.max(0, 1 - dist / 150);

        const dotR = 1 + intensity * 2;
        const alpha = 0.08 + intensity * 0.5;
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


// Tab Switching
function switchTab(targetId) {
  const targetPane = document.getElementById(targetId);
  if (!targetPane) return;

  // Update tabs UI
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.target === targetId);
  });

  // Hide current active pane
  document.querySelectorAll('.tab-pane.active').forEach(pane => {
    if (pane.id !== targetId) {
      pane.classList.remove('active');
    }
  });

  // Show target
  targetPane.classList.add('active');

  if (window.lucide) {
    lucide.createIcons();
  }

  history.replaceState(null, null, '#' + targetId);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}


// Dropdown Context Menu
function initDropdown() {
  const btn = document.getElementById('installDropdownBtn');
  const menu = document.getElementById('installDropdownMenu');
  if (!btn || !menu) return;
  const dropdown = btn.closest('.dropdown');

  function openMenu() {
    dropdown.classList.add('active');
    btn.setAttribute('aria-expanded', 'true');
    menu.classList.add('open');
  }

  function closeMenu() {
    dropdown.classList.remove('active');
    btn.setAttribute('aria-expanded', 'false');
    menu.classList.remove('open');
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
    if (e.key === 'Escape') closeMenu();
  });

  dropdown.querySelectorAll('.dropdown-item[data-tab]').forEach(item => {
    item.addEventListener('click', () => {
      closeMenu();
      switchTab(item.dataset.tab);
    });
  });
}


// Reliable Accordion Code Toggle
function initAccordions() {
  function setupToggle(btnId, contentId) {
    const btn = document.getElementById(btnId);
    const content = document.getElementById(contentId);
    if (!btn || !content) return;

    btn.addEventListener('click', () => {
      const isExpanded = content.classList.toggle('expanded');
      const chevron = btn.querySelector('.acc-chevron');
      if (chevron) chevron.classList.toggle('rotated', isExpanded);
      btn.querySelector('span').textContent = isExpanded ? 'Recolher Código Fonte' : 'Ver Código Fonte';
    });
  }

  setupToggle('toggle-discrete-code', 'content-discrete-code');
  setupToggle('toggle-legacy-code', 'content-legacy-code');
}


// Copy Buttons
function initCopyButtons() {
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const codeId = btn.dataset.code;
      const el = document.getElementById(codeId);
      if (!el) return;

      const text = el.innerText.trim();
      copyText(text, () => {
        showToast('Código copiado! Cole no URL do favorito.');
        const origHTML = btn.innerHTML;
        btn.innerHTML = '<i data-lucide="check"></i> <span>Copiado!</span>';
        if (window.lucide) lucide.createIcons();

        setTimeout(() => {
          btn.innerHTML = origHTML;
          if (window.lucide) lucide.createIcons();
        }, 2200);
      });
    });
  });
}

function copyText(text, onSuccess) {
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
  } catch (e) {
    alert('Copie o código manualmente.');
  }
  document.body.removeChild(ta);
}

let toastTimer = null;
function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.querySelector('.toast-msg').textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}


// Initialize
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
  if (hash && document.getElementById(hash)) {
    switchTab(hash);
  }
});
