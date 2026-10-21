// Theme toggle, persisted under "color-theme".
document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
  button.addEventListener("click", () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    const apply = () => {
      document.documentElement.dataset.theme = next;
      try {
        localStorage.setItem("color-theme", next);
      } catch (e) {}
    };
    if (document.startViewTransition) document.startViewTransition(apply);
    else apply();
  });
});

// Blog hub: tag pills and search filter.
const hub = document.querySelector("[data-hub]");
if (hub) {
  const posts = [...hub.querySelectorAll("[data-post]")];
  const pills = [...hub.querySelectorAll("[data-tag]")];
  const input = hub.querySelector("[data-search-input]");
  const empty = hub.querySelector("[data-empty]");
  const params = new URLSearchParams(location.search);
  let activeTag = params.get("tag") || "";

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

  const update = (fn) => {
    if (document.startViewTransition) document.startViewTransition(() => { fn(); render(); });
    else { fn(); render(); }
  };

  pills.forEach((pill) =>
    pill.addEventListener("click", () =>
      update(() => {
        activeTag = pill.dataset.tag;
        const url = new URL(location.href);
        if (activeTag) url.searchParams.set("tag", activeTag);
        else url.searchParams.delete("tag");
        history.replaceState(null, "", url);
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
}

// Copy buttons.
const flash = (button) => {
  button.classList.add("is-copied");
  setTimeout(() => button.classList.remove("is-copied"), 1600);
};

document.querySelectorAll("[data-copy-link]").forEach((button) =>
  button.addEventListener("click", async () => {
    await navigator.clipboard.writeText(button.dataset.copyLink);
    flash(button);
  })
);

document.querySelectorAll("[data-copy-code]").forEach((button) =>
  button.addEventListener("click", async () => {
    const code = button.parentElement.querySelector("pre code");
    await navigator.clipboard.writeText(code ? code.innerText : "");
    const label = button.textContent;
    button.textContent = "Copiado!";
    setTimeout(() => (button.textContent = label), 1600);
  })
);
