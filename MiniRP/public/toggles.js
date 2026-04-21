function applyStockColorToRow(row) {
  const stock = parseInt(row.dataset.stock, 10);
  const cell = row.querySelector(".stock-cell");
  cell.classList.remove("stock-ok", "stock-low", "stock-critical");

  if (isNaN(stock)) return;

  if (stock >= 20) cell.classList.add("stock-ok");
  else if (stock >= 5) cell.classList.add("stock-low");
  else cell.classList.add("stock-critical");
}

window.addEventListener("DOMContentLoaded", () => {

  /* Tabs */
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const tab = btn.dataset.tab;

      tabButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      tabContents.forEach(c => {
        c.classList.toggle("hidden", c.id !== `tab-${tab}`);
      });
    });
  });

  /* KPI compacto */
  const kpiToggle = document.getElementById("toggle-kpi-compacte");
  const kpiGrid = document.querySelector(".kpi-grid");

  if (kpiToggle && kpiGrid) {
    kpiToggle.addEventListener("change", () => {
      kpiGrid.dataset.mode = kpiToggle.checked ? "compacte" : "complet";
    });
  }

  /* Colores stock (dashboard y productes) */
  const toggles = [
    { checkbox: "#toggle-stock-colors-dashboard", table: ".stock-color-table" },
    { checkbox: "#toggle-stock-colors-productes", table: "#table-productes" }
  ];

  toggles.forEach(t => {
    const checkbox = document.querySelector(t.checkbox);
    const table = document.querySelector(t.table);

    if (checkbox && table) {
      checkbox.addEventListener("change", () => {
        const enabled = checkbox.checked;

        table.querySelectorAll("tbody tr").forEach(row => {
          const cell = row.querySelector(".stock-cell");
          cell.classList.remove("stock-ok", "stock-low", "stock-critical");

          if (enabled) applyStockColorToRow(row);
        });
      });
    }
  });
});
