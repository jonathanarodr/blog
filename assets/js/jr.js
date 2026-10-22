// Theme toggle, persisted under "color-theme".
const labelThemeToggle = (button) => {
  const label = document.documentElement.dataset.theme === "dark" ? button.dataset.labelLight : button.dataset.labelDark;
  button.setAttribute("aria-label", label);
  button.title = label;
};

document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
  labelThemeToggle(button);
  button.addEventListener("click", () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    const apply = () => {
      document.documentElement.dataset.theme = next;
      try {
        localStorage.setItem("color-theme", next);
      } catch (e) {}
      labelThemeToggle(button);
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
    button.textContent = button.dataset.copiedLabel;
    setTimeout(() => (button.textContent = label), 1600);
  })
);

// Table of contents: highlight the section being read.
const tocLinks = [...document.querySelectorAll(".toc--sidebar nav a[href^='#']")];
if (tocLinks.length) {
  const headings = tocLinks
    .map((link) => document.getElementById(decodeURIComponent(link.hash.slice(1))))
    .filter(Boolean);

  const setActive = () => {
    let current = headings[0];
    for (const heading of headings) {
      if (heading.getBoundingClientRect().top <= 120) current = heading;
    }
    tocLinks.forEach((link) =>
      link.classList.toggle("is-active", decodeURIComponent(link.hash.slice(1)) === current.id)
    );
  };

  document.addEventListener("scroll", setActive, { passive: true });
  setActive();
}

// Sticky cursor chip, like design.google: snaps onto header items, sized to
// the target and pulled toward the cursor.
const stickyTargets = document.querySelectorAll(".site-header__icon, .site-header__link");
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (stickyTargets.length && finePointer && !reducedMotion) {
  const chip = document.createElement("span");
  chip.className = "cursor-chip";
  chip.setAttribute("aria-hidden", "true");
  document.body.append(chip);
  document.documentElement.classList.add("has-cursor-chip");

  const moveChip = (x, y) => {
    chip.style.left = `${x}px`;
    chip.style.top = `${y}px`;
  };

  const release = (target, e) => {
    chip.classList.remove("is-active");
    chip.style.width = chip.style.height = "";
    if (e) moveChip(e.clientX, e.clientY);
    target?.style.removeProperty("transform");
  };

  let current = null;

  stickyTargets.forEach((target) => {
    target.addEventListener("pointerenter", (e) => {
      // Start from the cursor so the chip visibly snaps onto the target.
      if (!chip.classList.contains("is-active")) {
        chip.style.transition = "none";
        moveChip(e.clientX, e.clientY);
        chip.offsetWidth;
        chip.style.transition = "";
      }
      const rect = target.getBoundingClientRect();
      const padding = target.classList.contains("site-header__icon") ? 16 : 8;
      chip.style.width = `${rect.width + padding}px`;
      chip.style.height = `${rect.height}px`;
      chip.classList.add("is-active");
      current = target;
    });

    target.addEventListener("pointermove", (e) => {
      const rect = target.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      // Wide targets move less so text stays readable.
      const pull = Math.min(1, 40 / rect.width);
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      moveChip(cx + dx * 0.3 * pull, cy + dy * 0.3);
      target.style.transform = `translate(${dx * 0.2 * pull}px, ${dy * 0.2}px)`;
    });

    target.addEventListener("pointerleave", (e) => {
      release(target, e);
      current = null;
    });
  });

  document.addEventListener("scroll", () => {
    if (current) {
      release(current);
      current = null;
    }
  }, { passive: true });
}

// Language dropdown: toggle, close on outside click or Escape, arrow-key navigation.
document.querySelectorAll("[data-lang-menu]").forEach((menu) => {
  const toggle = menu.querySelector("[data-lang-toggle]");
  const items = [...menu.querySelectorAll("[role='menuitem']")];

  const setOpen = (open, { focus = false } = {}) => {
    menu.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    if (open && focus) (items.find((i) => i.classList.contains("is-current")) || items[0])?.focus();
  };

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

  document.addEventListener("click", (e) => {
    if (!menu.contains(e.target)) setOpen(false);
  });
});
