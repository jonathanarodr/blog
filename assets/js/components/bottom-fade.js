import { onScroll } from "../lib/scroll.js";

// Bottom fade (body::after): hidden once the page reaches the end so the footer stays clear.
export const initBottomFade = () => {
  const root = document.documentElement;
  onScroll(() => {
    root.classList.toggle("is-at-bottom", window.innerHeight + window.scrollY >= root.scrollHeight - 8);
  });
};
