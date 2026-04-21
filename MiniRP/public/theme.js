const THEME_KEY = "minierp_theme";

function applyTheme(theme) {
  document.body.className = "";
  document.body.classList.add(`theme-${theme}`);
  localStorage.setItem(THEME_KEY, theme);
}

window.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem(THEME_KEY) || "light";
  applyTheme(saved);

  document.querySelectorAll("[data-theme]").forEach(btn => {
    btn.addEventListener("click", () => {
      applyTheme(btn.dataset.theme);
    });
  });
});
