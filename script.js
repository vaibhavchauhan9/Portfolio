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
