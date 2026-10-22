import { withViewTransition } from "../lib/motion.js";

// Blog hub: tag pills (kept in the ?tag= query) and search, with "/" to focus the search.
export const initHubFilter = () => {
  const hub = document.querySelector("[data-hub]");
  if (!hub) return;

  const posts = [...hub.querySelectorAll("[data-post]")];
  const pills = [...hub.querySelectorAll("[data-tag]")];
  const input = hub.querySelector("[data-search-input]");
  const empty = hub.querySelector("[data-empty]");
  let activeTag = new URLSearchParams(location.search).get("tag") || "";

  const render = () => {
    const query = (input?.value || "").trim().toLowerCase();
    let visible = 0;
    posts.forEach((post) => {
      const tags = post.dataset.tags.split(" ");
      const match = (!activeTag || tags.includes(activeTag)) && (!query || post.dataset.search.includes(query));
      post.hidden = !match;
      if (match) visible++;
    });
    hub.querySelectorAll("[data-group]").forEach((group) => {
      group.hidden = !group.querySelector("[data-post]:not([hidden])");
    });
    pills.forEach((pill) => pill.classList.toggle("is-active", pill.dataset.tag === activeTag));
    if (empty) empty.hidden = visible > 0;
  };

  pills.forEach((pill) =>
    pill.addEventListener("click", () =>
      withViewTransition(() => {
        activeTag = pill.dataset.tag;
        const url = new URL(location.href);
        if (activeTag) url.searchParams.set("tag", activeTag);
        else url.searchParams.delete("tag");
        history.replaceState(null, "", url);
        render();
      })
    )
  );

  input?.addEventListener("input", render);
  document.addEventListener("keydown", (e) => {
    if (e.key === "/" && document.activeElement !== input) {
      e.preventDefault();
      input?.focus();
    }
  });

  render();
};
