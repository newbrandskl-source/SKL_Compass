// ===== SKY-LINE COMPASS – Landing Page Scripts =====

// ---- Navbar scroll effect ----
const navbar = document.getElementById('navbar');
let lastScrollY = 0;

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  if (scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Show/hide floating CTA
  const floatingCta = document.getElementById('floating-cta');
  if (scrollY > 400) {
    floatingCta.classList.add('visible');
  } else {
    floatingCta.classList.remove('visible');
  }

  lastScrollY = scrollY;
}, { passive: true });

// ---- Mobile Hamburger ----
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('active');
});

// Close nav when link clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('active');
  });
});

// ---- Scroll Reveal ----
const revealElements = document.querySelectorAll(
  '.skill-item, .roadmap-card, .counselor-item, .commit-item, .step, .stat-item, .feature-chip, .pillar, .parent-feature, .bilingual-stats .stat-item, .enrollment-steps .step, .contact-item'
);

revealElements.forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = `${(i % 6) * 0.08}s`;
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ---- Section fade-in ----
const sectionElements = document.querySelectorAll(
  '.why-section .section-title, .why-section .section-desc, .why-section .section-label, .why-intro, .why-callout, .why-image, .bilingual-text, .bilingual-images, .counselor-list, .counselor-visual, .parent-text, .parent-visual, .enrollment-info, .form-card, .roadmap-section .section-title, .roadmap-section .section-label, .bilingual-section .section-label, .bilingual-section .section-title, .counselor-section .section-label, .counselor-section .section-title, .counselor-section .section-desc'
);

sectionElements.forEach(el => {
  el.classList.add('reveal');
});

// ---- Smooth scroll for nav links ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ---- Form Submission ----
const form = document.getElementById('compass-form');
const formSuccess = document.getElementById('form-success');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Validate required fields
  const requiredFields = form.querySelectorAll('[required]');
  let isValid = true;
  
  requiredFields.forEach(field => {
    field.style.borderColor = '';
    if (!field.value.trim()) {
      field.style.borderColor = '#ef4444';
      isValid = false;
    }
  });
  
  if (!isValid) {
    // Shake animation on submit button
    const btn = document.getElementById('submit-btn');
    btn.style.animation = 'none';
    btn.offsetHeight; // reflow
    btn.style.animation = 'shake 0.4s ease';
    return;
  }

  // Simulate form submission
  const submitBtn = document.getElementById('submit-btn');
  submitBtn.innerHTML = '<span>Đang gửi...</span>';
  submitBtn.disabled = true;

  setTimeout(() => {
    form.style.display = 'none';
    formSuccess.style.display = 'block';
    // Scroll to success
    formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 1200);
});

// ---- Add shake keyframe ----
const style = document.createElement('style');
style.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20% { transform: translateX(-8px); }
    40% { transform: translateX(8px); }
    60% { transform: translateX(-6px); }
    80% { transform: translateX(6px); }
  }
`;
document.head.appendChild(style);

// ---- Progress bar animation on scroll ----
const progressObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar = entry.target.querySelector('.progress-bar');
      if (bar) {
        const width = bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => { bar.style.width = width; }, 100);
      }
    }
  });
}, { threshold: 0.5 });

const dashboardMockup = document.querySelector('.dashboard-mockup');
if (dashboardMockup) progressObserver.observe(dashboardMockup);

// ---- Counter animation for stats ----
function animateCounter(el, target, duration = 1200) {
  const start = 0;
  const startTime = performance.now();

  const tick = (now) => {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(start + (target - start) * eased);
    el.textContent = current + (el.dataset.suffix || '');
    if (progress < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const statNumbers = entry.target.querySelectorAll('.stat-number');
      statNumbers.forEach(el => {
        const text = el.textContent;
        const num = parseInt(text.replace(/\D/g, ''));
        const suffix = text.replace(/[0-9]/g, '');
        el.dataset.suffix = suffix;
        animateCounter(el, num);
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const bilingualStats = document.querySelector('.bilingual-stats');
if (bilingualStats) statsObserver.observe(bilingualStats);

// ---- Parallax hero subtle effect ----
const heroImg = document.querySelector('.hero-img');
if (heroImg) {
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if (scrolled < window.innerHeight) {
      heroImg.style.transform = `scale(1.05) translateY(${scrolled * 0.15}px)`;
    }
  }, { passive: true });
}

// ---- Active nav highlight ----
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

const activeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(item => item.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => activeObserver.observe(s));

// ---- Typed text effect in hero ----
(function initTyped() {
  const target = document.querySelector('.hero-sub');
  if (!target) return;
  // Already rendered; subtle entrance is enough via CSS animation
})();

console.log('🧭 SKY-LINE COMPASS Landing Page – Loaded');
