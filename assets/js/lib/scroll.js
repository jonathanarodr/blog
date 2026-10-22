// One passive scroll/resize listener for the whole page, throttled to animation frames.
const handlers = new Set();
let scheduled = false;

const run = () => {
  scheduled = false;
  handlers.forEach((handler) => handler());
};

const schedule = () => {
  if (scheduled) return;
  scheduled = true;
  requestAnimationFrame(run);
};

window.addEventListener("scroll", schedule, { passive: true });
window.addEventListener("resize", schedule);

// Calls `handler` now and on every scroll/resize frame; returns an unsubscribe function.
export const onScroll = (handler) => {
  handlers.add(handler);
  handler();
  return () => handlers.delete(handler);
};
