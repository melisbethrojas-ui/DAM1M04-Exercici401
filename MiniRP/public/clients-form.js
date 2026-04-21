window.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-client");
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
    const email = get("email").value.trim();
    const phone = get("phone").value.trim();

    if (!name) error("name", "Nom obligatori.");
    else error("name", "");

    if (!email.includes("@")) error("email", "Email no vàlid.");
    else error("email", "");

    if (phone.length < 6) error("phone", "Telèfon massa curt.");
    else error("phone", "");

    if (!valid) e.preventDefault();
  });
});
