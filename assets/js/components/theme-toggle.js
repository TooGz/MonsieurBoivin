const STORAGE_KEY = "appearance";
const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

const getAppearance = () => (document.documentElement.classList.contains("dark") ? "dark" : "light");

const updateThemeMeta = () => {
  const meta = document.querySelector('meta[name="theme-color"]');
  if (!meta) return;

  const body = document.body;
  meta.setAttribute("content", window.getComputedStyle(body).backgroundColor);
};

const syncButtons = () => {
  const appearance = getAppearance();
  const isDark = appearance === "dark";

  document.documentElement.dataset.theme = appearance;

  document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
    button.setAttribute("aria-pressed", String(isDark));

    const label = button.querySelector("[data-theme-label]");
    if (label) {
      label.textContent = isDark ? "Mode clair" : "Mode sombre";
    }
  });

  updateThemeMeta();
};

const toggleAppearance = () => {
  document.documentElement.classList.toggle("dark");
  localStorage.setItem(STORAGE_KEY, getAppearance());
  syncButtons();
};

export const initThemeToggle = () => {
  const buttons = [...document.querySelectorAll("[data-theme-toggle]")];
  if (!buttons.length) return;

  syncButtons();

  buttons.forEach((button) => {
    button.addEventListener("click", toggleAppearance);
  });

  darkQuery.addEventListener("change", () => {
    if (localStorage.getItem(STORAGE_KEY)) return;
    syncButtons();
  });

  window.addEventListener("storage", (event) => {
    if (event.key !== STORAGE_KEY) return;
    syncButtons();
  });
};
