import { initCardFilters } from "./components/card-filters.js";
import { initDisclosureMenus } from "./components/disclosure-menu.js";
import { initStickyNav } from "./components/sticky-nav.js";
import { initThemeToggle } from "./components/theme-toggle.js";

const boot = () => {
  document.documentElement.dataset.js = "on";

  initThemeToggle();
  initDisclosureMenus();
  initStickyNav();
  initCardFilters();
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot, { once: true });
} else {
  boot();
}
