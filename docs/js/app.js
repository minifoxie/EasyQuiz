// Sistema de Abas (Tabs)
function switchTab(targetId) {
  // Update Nav Links
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.target === targetId) {
      btn.classList.add('active');
    }
  });

  // Update Sections
  document.querySelectorAll('.tab-pane').forEach(pane => {
    pane.classList.remove('active');
    // Remove anim to re-trigger it
    pane.style.animation = 'none';
    pane.offsetHeight; /* trigger reflow */
    pane.style.animation = null;
  });

  const targetPane = document.getElementById(targetId);
  if (targetPane) {
    targetPane.classList.add('active');
  }

  // Update URL Hash without scrolling
  history.replaceState(null, null, '#' + targetId);
  window.scrollTo({ top: 0, behavior: 'smooth' });
  lucide.createIcons();
}

// Initial Tab Load
window.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();
  const hash = window.location.hash.replace('#', '');
  if (hash && document.getElementById(hash)) {
    switchTab(hash);
  }

  // Nav click listeners
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      switchTab(btn.dataset.target);
    });
  });

  // Copy buttons
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const type = btn.dataset.type;
      const code = document.getElementById('code-' + type).innerText;
      
      navigator.clipboard.writeText(code).then(() => {
        showToast('Código copiado com sucesso! 🚀');
        
        const originalText = btn.innerText;
        btn.innerText = 'Copiado!';
        setTimeout(() => {
          btn.innerText = originalText;
        }, 2000);
      });
    });
  });
});

// Toast System
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.innerText = message;
  toast.classList.add('show');
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// ==========================================
// Efeito de Partículas (Background Canvas)
// ==========================================
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
  constructor() {
    this.reset();
  }
  
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.5;
    this.speedY = (Math.random() - 0.5) * 0.5;
    this.opacity = Math.random() * 0.5 + 0.1;
  }
  
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    
    // Wrap around edges
    if (this.x > canvas.width) this.x = 0;
    else if (this.x < 0) this.x = canvas.width;
    
    if (this.y > canvas.height) this.y = 0;
    else if (this.y < 0) this.y = canvas.height;
  }
  
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
    ctx.fill();
  }
}

function initParticles() {
  const numParticles = Math.min(Math.floor(window.innerWidth / 15), 100);
  particles = [];
  for (let i = 0; i < numParticles; i++) {
    particles.push(new Particle());
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  
  // Connect lines if close
  for (let i = 0; i < particles.length; i++) {
    for (let j = i; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 100) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 - distance/1000})`;
        ctx.lineWidth = 0.5;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
  
  requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();


// Dropdown Logic
document.addEventListener('DOMContentLoaded', () => {
  const dropdownBtn = document.getElementById('installDropdownBtn');
  const dropdown = document.querySelector('.dropdown');
  
  if (dropdownBtn && dropdown) {
    dropdownBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      dropdown.classList.toggle('active');
      console.log('Dropdown toggled');
    });

    document.addEventListener('click', (e) => {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove('active');
      }
    });
  }
});
