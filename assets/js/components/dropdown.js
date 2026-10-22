// Dropdown menus (language, page share): toggle, one open at a time, close on outside click,
// Escape or [data-dropdown-close], arrow-key navigation between menu items.
const menus = new Map();

export const closeDropdown = (menu) => menus.get(menu)?.(false);

export const initDropdowns = () => {
  document.querySelectorAll("[data-dropdown]").forEach((menu) => {
    const toggle = menu.querySelector("[data-dropdown-toggle]");
    const items = [...menu.querySelectorAll("[role='menuitem']")];

    const setOpen = (open, { focus = false } = {}) => {
      if (open) menus.forEach((close, other) => other !== menu && close(false));
      menu.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      if (open && focus) (items.find((item) => item.classList.contains("is-current")) || items[0])?.focus();
    };
    menus.set(menu, setOpen);

    toggle.addEventListener("click", () => setOpen(!menu.classList.contains("is-open")));
    toggle.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setOpen(true, { focus: true });
      }
    });

    menu.addEventListener("keydown", (e) => {
      const index = items.indexOf(document.activeElement);
      if (e.key === "Escape") {
        setOpen(false);
        toggle.focus();
      } else if (index !== -1 && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
        e.preventDefault();
        const step = e.key === "ArrowDown" ? 1 : -1;
        items[(index + step + items.length) % items.length].focus();
      }
    });

    menu.querySelectorAll("[data-dropdown-close]").forEach((el) => el.addEventListener("click", () => setOpen(false)));
  });

  document.addEventListener("click", (e) => {
    menus.forEach((close, menu) => {
      if (!menu.contains(e.target)) close(false);
    });
  });
};
