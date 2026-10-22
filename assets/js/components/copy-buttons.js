import { copyWithFeedback } from "../lib/clipboard.js";
import { closeDropdown } from "./dropdown.js";

// Every copy action on the site:
//   data-copy="text"        copies the text (page link, Markdown link)
//   data-copy-from="url"    fetches and copies the response (page Markdown)
//   data-copy-code          copies the code of the enclosing .code-block
// Triggers inside a dropdown close it once the feedback is over.
const textFor = async (trigger) => {
  if ("copy" in trigger.dataset) return trigger.dataset.copy;
  if ("copyFrom" in trigger.dataset) return (await fetch(trigger.dataset.copyFrom)).text();
  return trigger.closest(".code-block")?.querySelector("pre code")?.innerText ?? "";
};

export const initCopyButtons = () => {
  document.querySelectorAll("[data-copy], [data-copy-from], [data-copy-code]").forEach((trigger) =>
    trigger.addEventListener("click", async () => {
      await copyWithFeedback(trigger, await textFor(trigger));
      const menu = trigger.closest("[data-dropdown]");
      if (menu) closeDropdown(menu);
    })
  );
};
