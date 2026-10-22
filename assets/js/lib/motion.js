export const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const hasFinePointer = () => window.matchMedia("(hover: hover) and (pointer: fine)").matches;

// Run a DOM update inside a view transition when the browser supports it. A transition can be
// skipped (e.g. a second one starts first); that rejects its promises, which is expected here.
export const withViewTransition = (update) => {
  if (!document.startViewTransition || prefersReducedMotion()) {
    update();
    return;
  }
  const transition = document.startViewTransition(update);
  transition.ready.catch(() => {});
  transition.finished.catch(() => {});
};
