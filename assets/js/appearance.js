// Surcharge de themes/blowfish/assets/js/appearance.js
// - Ordre de priorité : choix explicite du visiteur > préférence du système (si auto) > thème par défaut du site.
//   La version du thème ajoutait la classe "dark" sans jamais la retirer : un appareil réglé en clair restait en sombre.
// - La couleur de la barre du navigateur (meta theme-color) suit le thème au lieu de lire un fond transparent.
const root = document.documentElement;
const sitePreference = root.getAttribute("data-default-appearance");
const autoAppearance = root.getAttribute("data-auto-appearance") === "true";
const colorSchemeQuery = window.matchMedia
  ? window.matchMedia("(prefers-color-scheme: dark)")
  : null;
const themeColors = { light: "#f3efe6", dark: "#172033" };

const readStoredPreference = () => {
  try {
    return localStorage.getItem("appearance");
  } catch {
    return null;
  }
};

const storePreference = (value) => {
  try {
    if (value === null) {
      localStorage.removeItem("appearance");
    } else {
      localStorage.setItem("appearance", value);
    }
  } catch {
    // Stockage indisponible (navigation privée, cookies bloqués) : le choix vaut pour la page en cours.
  }
};

const resolveAppearance = () => {
  const stored = readStoredPreference();
  if (stored === "dark" || stored === "light") {
    return stored;
  }
  if (autoAppearance && colorSchemeQuery) {
    return colorSchemeQuery.matches ? "dark" : "light";
  }
  return sitePreference === "dark" ? "dark" : "light";
};

var getTargetAppearance = () => (root.classList.contains("dark") ? "dark" : "light");

var updateMeta = () => {
  // Le <head> déclare une valeur par schéma système ; une fois le thème connu, les deux prennent sa couleur
  document.querySelectorAll('meta[name="theme-color"]').forEach((meta) => {
    meta.setAttribute("content", themeColors[getTargetAppearance()]);
  });
};

const applyAppearance = (appearance) => {
  root.classList.toggle("dark", appearance === "dark");
  root.style.colorScheme = appearance;
  updateMeta();
};

applyAppearance(resolveAppearance());

if (autoAppearance && colorSchemeQuery) {
  colorSchemeQuery.addEventListener("change", () => {
    if (readStoredPreference() === null) {
      applyAppearance(resolveAppearance());
    }
  });
}

const toggleAppearance = () => {
  const target = getTargetAppearance() === "dark" ? "light" : "dark";
  storePreference(target);
  applyAppearance(target);
};

const resetAppearance = (event) => {
  // Clic droit : on oublie le choix et on revient à la préférence du système
  event.preventDefault();
  storePreference(null);
  applyAppearance(resolveAppearance());
};

window.addEventListener("DOMContentLoaded", () => {
  updateMeta();

  ["appearance-switcher", "appearance-switcher-mobile"].forEach((id) => {
    const switcher = document.getElementById(id);
    if (switcher) {
      switcher.addEventListener("click", toggleAppearance);
      switcher.addEventListener("contextmenu", resetAppearance);
    }
  });
});

// (Le changement de logo clair/sombre du thème n'est pas utilisé : pas de « SecondaryLogo » configuré)

window.addEventListener("DOMContentLoaded", () => {
  const scroller = document.getElementById("top-scroller");
  const footer = document.getElementById("site-footer");
  if (
    scroller &&
    footer &&
    scroller.getBoundingClientRect().top > footer.getBoundingClientRect().top
  ) {
    scroller.hidden = true;
  }
});
