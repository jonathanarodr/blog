// Lightbox: [data-lightbox] links open their image in a modal <dialog>.
// Links sharing a non-empty group (a gallery) are browsable with the arrows and ←/→.
// Without JS the link simply opens the full image.
const labels = {
  pt: { close: "Fechar", prev: "Imagem anterior", next: "Próxima imagem" },
  en: { close: "Close", prev: "Previous image", next: "Next image" },
};

const button = (className, label, path) => {
  const el = document.createElement("button");
  el.type = "button";
  el.className = `lightbox__button ${className}`;
  el.setAttribute("aria-label", label);
  el.innerHTML = `<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="${path}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  return el;
};

const createDialog = () => {
  const t = labels[document.documentElement.lang.slice(0, 2)] ?? labels.en;
  const dialog = document.createElement("dialog");
  dialog.className = "lightbox";
  const figure = document.createElement("figure");
  figure.className = "lightbox__figure";
  figure.append(document.createElement("img"), document.createElement("figcaption"));
  dialog.append(
    figure,
    button("lightbox__close", t.close, "M6 6l12 12M18 6 6 18"),
    button("lightbox__prev", t.prev, "M15 6l-6 6 6 6"),
    button("lightbox__next", t.next, "m9 6 6 6-6 6"),
    Object.assign(document.createElement("span"), { className: "lightbox__counter" })
  );
  document.body.append(dialog);
  return dialog;
};

export const initLightbox = () => {
  const links = [...document.querySelectorAll("[data-lightbox]")];
  if (!links.length) return;

  const dialog = createDialog();
  const img = dialog.querySelector("img");
  const caption = dialog.querySelector("figcaption");
  const counter = dialog.querySelector(".lightbox__counter");
  let items = [];
  let index = 0;

  const show = (i) => {
    index = (i + items.length) % items.length;
    const link = items[index];
    const thumb = link.querySelector("img");
    img.src = link.href;
    img.alt = thumb?.alt ?? "";
    caption.textContent = link.dataset.caption ?? "";
    caption.hidden = !link.dataset.caption;
    counter.textContent = items.length > 1 ? `${index + 1} / ${items.length}` : "";
  };

  links.forEach((link) =>
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const group = link.dataset.lightbox;
      items = group ? links.filter((l) => l.dataset.lightbox === group) : [link];
      dialog.classList.toggle("is-single", items.length === 1);
      show(items.indexOf(link));
      dialog.showModal();
    })
  );

  dialog.querySelector(".lightbox__close").addEventListener("click", () => dialog.close());
  dialog.querySelector(".lightbox__prev").addEventListener("click", () => show(index - 1));
  dialog.querySelector(".lightbox__next").addEventListener("click", () => show(index + 1));
  // Clicking the backdrop (outside the image and controls) closes it.
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog || e.target.classList.contains("lightbox__figure")) dialog.close();
  });
  dialog.addEventListener("keydown", (e) => {
    if (items.length < 2) return;
    if (e.key === "ArrowLeft") show(index - 1);
    if (e.key === "ArrowRight") show(index + 1);
  });
  dialog.addEventListener("close", () => img.removeAttribute("src"));
};
