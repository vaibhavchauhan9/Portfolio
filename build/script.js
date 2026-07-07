/**
 * Global Portfolio Core Interaction Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeEngine();
  initPointerTracker();
  initMobileNavbar();
});

/**
 * Persisted Light / Dark Theme Toggling Subsystem
 */
function initThemeEngine() {
  const themeToggle = document.getElementById('themeToggle');
  const themeToggleMobile = document.getElementById('themeToggleMobile');
  
  // Read existing application context or compute default setting
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  
  // Sync initial icon states on page load
  if (themeToggle) {
    updateThemeIcon(savedTheme, themeToggle.querySelector('i'));
  }
  if (themeToggleMobile) {
    updateThemeIcon(savedTheme, themeToggleMobile.querySelector('i'));
  }

  // Unified execution block for switching themes
  function handleThemeChange() {
    const activeTheme = document.documentElement.getAttribute('data-theme');
    const targetTheme = activeTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', targetTheme);
    localStorage.setItem('portfolio-theme', targetTheme);
    
    // Update both icons systematically if they exist on the DOM
    if (themeToggle) updateThemeIcon(targetTheme, themeToggle.querySelector('i'));
    if (themeToggleMobile) updateThemeIcon(targetTheme, themeToggleMobile.querySelector('i'));
  }

  // Bind event handlers securely
  if (themeToggle) {
    themeToggle.addEventListener('click', handleThemeChange);
  }
  if (themeToggleMobile) {
    themeToggleMobile.addEventListener('click', handleThemeChange);
  }
}

function updateThemeIcon(theme, iconElement) {
  if (!iconElement) return;
  if (theme === 'light') {
    iconElement.className = 'fa-solid fa-moon';
  } else {
    iconElement.className = 'fa-solid fa-sun';
  }
}

/**
 * Pointer Tracking Spotlight Logic
 */
function initPointerTracker() {
  window.addEventListener('mousemove', (e) => {
    const xPercentage = (e.clientX / window.innerWidth) * 100;
    const yPercentage = (e.clientY / window.innerHeight) * 100;
    
    document.documentElement.style.setProperty('--mouse-x', `${xPercentage}%`);
    document.documentElement.style.setProperty('--mouse-y', `${yPercentage}%`);
  });
}

/**
 * Mobile View Responsive Nav Toggle Handler
 */
function initMobileNavbar() {
  const menuBtn = document.getElementById('menuBtn');
  const navLinks = document.getElementById('navLinks');
  
  if (!menuBtn || !navLinks) return;
  
  menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    const icon = menuBtn.querySelector('i');
    if (icon) {
      if (navLinks.classList.contains('active')) {
        icon.className = 'fa-solid fa-xmark';
      } else {
        icon.className = 'fa-solid fa-bars';
      }
    }
  });

  // Automatically dismiss layout overlay on menu item navigation
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      const icon = menuBtn.querySelector('i');
      if (icon) icon.className = 'fa-solid fa-bars';
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initTypingEffect();
  initScrollReveal();
  initSkillBars();
  initProjectFilter();
  initBackToTop();
  initContactForm();
  initProfilePhotoSwap();
});

/**
 * Typing animation for the hero headline (index.html only)
 */
function initTypingEffect() {
  const el = document.getElementById('typingTarget');
  if (!el) return;

  const roles = [
    'Full Stack Developer',
    'MERN Stack Engineer',
    'Java Full Stack Developer',
    'UI/UX Focused Builder'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function tick() {
    const currentRole = roles[roleIndex];

    if (!deleting) {
      charIndex++;
      el.textContent = currentRole.slice(0, charIndex);
      if (charIndex === currentRole.length) {
        deleting = true;
        setTimeout(tick, 1600);
        return;
      }
    } else {
      charIndex--;
      el.textContent = currentRole.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }
    setTimeout(tick, deleting ? 40 : 80);
  }

  tick();
}

/**
 * Reveal-on-scroll for elements marked with .reveal
 */
function initScrollReveal() {
  const targets = document.querySelectorAll('.reveal');
  if (!targets.length) return;

  if (!('IntersectionObserver' in window)) {
    targets.forEach(t => t.classList.add('in-view'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  targets.forEach(t => observer.observe(t));
}

/**
 * Animate skill progress bars into view once (about.html)
 */
function initSkillBars() {
  const bars = document.querySelectorAll('.skill-bar-fill');
  if (!bars.length) return;

  if (!('IntersectionObserver' in window)) {
    bars.forEach(b => { b.style.width = b.dataset.percent + '%'; });
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.width = entry.target.dataset.percent + '%';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  bars.forEach(b => observer.observe(b));
}

/**
 * Filter project cards by technology tag (projects.html)
 */
function initProjectFilter() {
  const buttons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card[data-tech]');
  if (!buttons.length || !cards.length) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      cards.forEach(card => {
        const techList = card.dataset.tech.split(',');
        const show = filter === 'all' || techList.includes(filter);
        card.classList.toggle('hidden-project', !show);
      });
    });
  });
}

/**
 * Show/hide a back-to-top button once the user scrolls down
 */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/**
 * Lightweight client-side validation + status messaging for the contact form.
 * Note: this is a static site with no backend, so submission opens the
 * visitor's email client pre-filled with their message via a mailto link.
 */
function initContactForm() {
  const form = document.getElementById('portfolioContactForm');
  if (!form) return;

  const status = document.getElementById('formStatus');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('#name').value.trim();
    const email = form.querySelector('#email').value.trim();
    const message = form.querySelector('#message').value.trim();

    if (!name || !email || !message) {
      if (status) {
        status.textContent = 'Please fill in every field before sending.';
        status.className = 'form-status error';
      }
      return;
    }

    const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:vaibhavkumarvk143674@gmail.com?subject=${subject}&body=${body}`;

    if (status) {
      status.textContent = 'Opening your email client to send this message…';
      status.className = 'form-status success';
    }
  });
}

/**
 * Click-to-swap profile photo (index.html hero avatar).
 * Clicking the photo toggles it with a second photo, back and forth (loop),
 * with a quick fade cross-transition.
 */
function initProfilePhotoSwap() {
  const img = document.getElementById('profileImg');
  if (!img) return;

  const primarySrc = img.getAttribute('src');
  const altSrc = img.dataset.altSrc;
  if (!altSrc) return;

  img.style.transition = 'opacity 0.25s ease';

  img.addEventListener('click', () => {
    const showingAlt = img.dataset.showingAlt === 'true';
    const nextSrc = showingAlt ? primarySrc : altSrc;

    img.style.opacity = '0';
    setTimeout(() => {
      img.src = nextSrc;
      img.dataset.showingAlt = showingAlt ? 'false' : 'true';
      img.style.opacity = '1';
    }, 250);
  });
}
