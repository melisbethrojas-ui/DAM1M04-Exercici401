window.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-producte");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    let valid = true;

    const get = (name) => form.querySelector(`[name="${name}"]`);
    const group = (name) => form.querySelector(`.form-group[data-field="${name}"]`);
    const error = (name, msg) => {
      const g = group(name);
      g.classList.toggle("error", !!msg);
      g.querySelector(".form-error").textContent = msg || "";
      if (msg) valid = false;
    };

    const name = get("name").value.trim();
    const category = get("category").value.trim();
    const price = parseFloat(get("price").value);
    const stock = parseInt(get("stock").value);

    if (!name || name.length < 2) error("name", "Nom massa curt.");
    else error("name", "");

    if (!category) error("category", "Categoria obligatòria.");
    else error("category", "");

    if (isNaN(price) || price <= 0) error("price", "Preu > 0.");
    else error("price", "");

    if (isNaN(stock) || stock < 0 || !Number.isInteger(stock))
      error("stock", "Stock enter >= 0.");
    else error("stock", "");

    if (!valid) e.preventDefault();
  });
});
