document.addEventListener("DOMContentLoaded", () => {

  // =========================
  // THEME
  // =========================
  const themeSelector = document.getElementById("themeSelector");

  if (themeSelector) {
    const savedTheme = localStorage.getItem("theme") || "theme-light";

    document.body.classList.remove(
      "theme-light",
      "theme-soft-night",
      "theme-contrast"
    );

    document.body.classList.add(savedTheme);
    themeSelector.value = savedTheme;

    themeSelector.addEventListener("change", () => {
      const selected = themeSelector.value;

      document.body.classList.remove(
        "theme-light",
        "theme-soft-night",
        "theme-contrast"
      );

      document.body.classList.add(selected);

      localStorage.setItem("theme", selected);
    });
  }

  // =========================
  // TABS
  // =========================
  const tabButtons = document.querySelectorAll(".tab-btn");

  if (tabButtons.length) {
    tabButtons.forEach(btn => {
      btn.addEventListener("click", () => {

        tabButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        document.querySelectorAll(".tab-content").forEach(tab => {
          tab.classList.add("hidden");
        });

        const target = document.getElementById(btn.dataset.tab);
        if (target) target.classList.remove("hidden");
      });
    });
  }

// =========================
// KPI COMPACT
// =========================
const compactBtn = document.getElementById("compactToggle");
const kpiGrid = document.getElementById("kpiGrid");

if (compactBtn && kpiGrid) {

  // Cargar estado guardado
  const savedMode = localStorage.getItem("taulerMode");

  if (savedMode === "compacte") {
    kpiGrid.dataset.mode = "compacte";
    compactBtn.textContent = "Tauler complet";
  }

  // Evento del botón
  compactBtn.addEventListener("click", () => {
    const isCompact = kpiGrid.dataset.mode === "compacte";

    kpiGrid.dataset.mode = isCompact ? "" : "compacte";
    compactBtn.textContent = isCompact ? "Tauler compacte" : "Tauler complet";

    localStorage.setItem("taulerMode", isCompact ? "complet" : "compacte");
  });
}

  // =========================
  // STOCK COLORS
  // =========================
  const stockToggle = document.getElementById("");

  function pintarStock() {

    document.querySelectorAll(".stock-value").forEach(el => {

      el.classList.remove("stock-ok", "stock-low", "stock-critical");

      if (!stockToggle || !stockToggle.checked) return;

      const stock = parseInt(el.textContent.trim()) || 0;

      if (stock >= 20) {
        el.classList.add("stock-ok");
      } 
      else if (stock >= 5) {
        el.classList.add("stock-low");
      } 
      else {
        el.classList.add("stock-critical");
      }
    });
  }

  if (stockToggle) {
    stockToggle.addEventListener("change", pintarStock);
    pintarStock();
  }

});