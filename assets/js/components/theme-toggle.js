import { withViewTransition } from "../lib/motion.js";

// Light/dark toggle, persisted under "color-theme"; the label names the theme it switches to.
export const initThemeToggle = () => {
  const root = document.documentElement;

  document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
    const updateLabel = () => {
      const label = root.dataset.theme === "dark" ? button.dataset.labelLight : button.dataset.labelDark;
      button.setAttribute("aria-label", label);
      button.title = label;
    };

    updateLabel();
    button.addEventListener("click", () => {
      const next = root.dataset.theme === "dark" ? "light" : "dark";
      withViewTransition(() => {
        root.dataset.theme = next;
        try {
          localStorage.setItem("color-theme", next);
        } catch (e) {}
        updateLabel();
      });
    });
  });
};
