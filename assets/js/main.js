// Theme toggle: light/dark mode
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
  themeToggle.innerHTML = '🌙';
  themeToggle.onclick = () => {
    const current = document.body.getAttribute('data-theme');
    if (current === 'dark') {
      document.body.setAttribute('data-theme', 'light');
      themeToggle.innerHTML = '🌙';
      localStorage.setItem('theme', 'light');
    } else {
      document.body.setAttribute('data-theme', 'dark');
      themeToggle.innerHTML = '☀️';
      localStorage.setItem('theme', 'dark');
    }
  };
  // Load saved theme
  const saved = localStorage.getItem('theme');
  if (saved) document.body.setAttribute('data-theme', saved);
}

// Register service worker for PWA offline support
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js');
  });
}
