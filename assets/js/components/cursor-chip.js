import { hasFinePointer, prefersReducedMotion } from "../lib/motion.js";
import { onScroll } from "../lib/scroll.js";

// Sticky cursor chip, like design.google. Two modes:
// - "magnetic" (header items, "see all" links): chip slightly wider than the target,
//   both pulled toward the cursor.
// - "fit" (post tags): chip morphs from a dot at the cursor into the exact shape of the
//   target and locks onto it, filling it with inverted colors.
const MAGNETIC = ".site-header__icon, .site-header__link, .section-heading__link";
const FIT = ".post__tags .pill";

export const initCursorChip = () => {
  const magneticTargets = document.querySelectorAll(MAGNETIC);
  const fitTargets = document.querySelectorAll(FIT);
  if (!(magneticTargets.length || fitTargets.length) || !hasFinePointer() || prefersReducedMotion()) return;

  const chip = document.createElement("span");
  chip.className = "cursor-chip";
  chip.setAttribute("aria-hidden", "true");
  document.body.append(chip);
  document.documentElement.classList.add("has-cursor-chip");

  const moveChip = (x, y) => {
    chip.style.left = `${x}px`;
    chip.style.top = `${y}px`;
  };

  // Place the chip without animating, so the next change visibly morphs from there.
  const jumpChip = (x, y, size) => {
    chip.style.transition = "none";
    moveChip(x, y);
    if (size) chip.style.width = chip.style.height = `${size}px`;
    chip.offsetWidth;
    chip.style.transition = "";
  };

  let current = null;

  const release = (e) => {
    chip.classList.remove("is-active");
    chip.style.width = chip.style.height = chip.style.borderRadius = "";
    if (e) moveChip(e.clientX, e.clientY);
    current?.style.removeProperty("transform");
    current = null;
  };

  const track = (target, onEnter, onMove) => {
    target.addEventListener("pointerenter", (e) => {
      onEnter(e, target.getBoundingClientRect());
      chip.classList.add("is-active");
      current = target;
    });
    if (onMove) target.addEventListener("pointermove", (e) => onMove(e, target.getBoundingClientRect()));
    target.addEventListener("pointerleave", release);
  };

  magneticTargets.forEach((target) => {
    const padding = target.classList.contains("site-header__icon") ? 16 : 8;
    track(
      target,
      (e, rect) => {
        if (!chip.classList.contains("is-active")) jumpChip(e.clientX, e.clientY);
        chip.style.width = `${rect.width + padding}px`;
        chip.style.height = `${rect.height}px`;
      },
      (e, rect) => {
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        // Wide targets move less so text stays readable.
        const pull = Math.min(1, 40 / rect.width);
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        moveChip(cx + dx * 0.3 * pull, cy + dy * 0.3);
        target.style.transform = `translate(${dx * 0.2 * pull}px, ${dy * 0.2}px)`;
      }
    );
  });

  fitTargets.forEach((target) => {
    track(target, (e, rect) => {
      if (!chip.classList.contains("is-active")) jumpChip(e.clientX, e.clientY, 24);
      chip.style.borderRadius = getComputedStyle(target).borderRadius;
      chip.style.width = `${rect.width}px`;
      chip.style.height = `${rect.height}px`;
      moveChip(rect.left + rect.width / 2, rect.top + rect.height / 2);
    });
  });

  // Scrolling moves targets away from the chip: let it go.
  onScroll(() => current && release());
};
