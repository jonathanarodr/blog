// Site behavior, one module per component.
import { initBackToTop } from "./components/back-to-top.js";
import { initBottomFade } from "./components/bottom-fade.js";
import { initCopyButtons } from "./components/copy-buttons.js";
import { initCursorChip } from "./components/cursor-chip.js";
import { initDropdowns } from "./components/dropdown.js";
import { initHubFilter } from "./components/hub-filter.js";
import { initLightbox } from "./components/lightbox.js";
import { initThemeToggle } from "./components/theme-toggle.js";
import { initTocSpy } from "./components/toc-spy.js";

initThemeToggle();
initHubFilter();
initDropdowns();
initCopyButtons();
initTocSpy();
initCursorChip();
initBackToTop();
initBottomFade();
initLightbox();
