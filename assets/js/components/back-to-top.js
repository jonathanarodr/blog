// Back to top: appears once the page header scrolls out of view.
export const initBackToTop = () => {
  const button = document.querySelector("[data-back-to-top]");
  const header = document.querySelector(".post__header, .page__header");
  if (!button || !header) return;

  new IntersectionObserver(([entry]) => {
    button.classList.toggle("is-visible", !entry.isIntersecting && entry.boundingClientRect.top < 0);
  }).observe(header);

  button.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0 });
    history.replaceState(null, "", location.pathname + location.search);
  });
};
