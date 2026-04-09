// theme-init.js - Inline script to prevent FOUC (Flash of Unstyled Content)
// This runs synchronously before page render

(function() {
  function getTheme() {
    const stored = localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  
  const theme = getTheme();
  document.documentElement.classList.add(`theme-${theme}`);
})();
