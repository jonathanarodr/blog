import { onScroll } from "../lib/scroll.js";

// Sidebar table of contents: highlight the section being read.
export const initTocSpy = () => {
  const links = [...document.querySelectorAll(".toc--sidebar nav a[href^='#']")];
  const idOf = (link) => decodeURIComponent(link.hash.slice(1));
  const headings = links.map((link) => document.getElementById(idOf(link))).filter(Boolean);
  if (!headings.length) return;

  onScroll(() => {
    let current = headings[0];
    for (const heading of headings) {
      if (heading.getBoundingClientRect().top <= 120) current = heading;
    }
    links.forEach((link) => link.classList.toggle("is-active", idOf(link) === current.id));
  });
};
