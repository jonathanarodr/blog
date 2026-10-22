const COPIED_MS = 1400;

// Copy text and give feedback on the trigger: `.is-copied` while copied (for icon swaps) and,
// when it has data-copied-label, that label replaces the text of its [data-copy-label] child (or itself).
export const copyWithFeedback = async (trigger, text) => {
  await navigator.clipboard.writeText(text);
  const label = trigger.querySelector("[data-copy-label]") || (trigger.dataset.copiedLabel ? trigger : null);
  const original = label?.textContent;
  if (label) label.textContent = trigger.dataset.copiedLabel;
  trigger.classList.add("is-copied");
  return new Promise((resolve) =>
    setTimeout(() => {
      if (label) label.textContent = original;
      trigger.classList.remove("is-copied");
      resolve();
    }, COPIED_MS)
  );
};
