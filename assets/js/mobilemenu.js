// Surcharge de themes/blowfish/assets/js/mobilemenu.js
// Le menu mobile est un <dialog> : showModal() gère le focus, la touche Échap et rend la page inerte.
(function () {
  var menuButton = document.getElementById("menu-button");
  var menuCloseButton = document.getElementById("menu-close-button");
  var menuDialog = document.getElementById("menu-wrapper");

  if (!menuButton || !menuDialog || typeof menuDialog.showModal !== "function") {
    return;
  }

  var openMenu = function () {
    if (menuDialog.open) return;
    menuDialog.showModal();
    menuButton.setAttribute("aria-expanded", "true");
    document.documentElement.classList.add("has-open-dialog");
  };

  var closeMenu = function () {
    if (menuDialog.open) {
      menuDialog.close();
    }
  };

  menuButton.addEventListener("click", openMenu);
  menuCloseButton && menuCloseButton.addEventListener("click", closeMenu);

  // Fermeture par Échap ou close() : on remet l'état du bouton et le focus dessus
  menuDialog.addEventListener("close", function () {
    menuButton.setAttribute("aria-expanded", "false");
    document.documentElement.classList.remove("has-open-dialog");
    menuButton.focus();
  });

  // Clic sur le fond assombri (hors du panneau) : on ferme
  menuDialog.addEventListener("click", function (event) {
    if (event.target === menuDialog) {
      closeMenu();
    }
  });

  // Un lien d'ancre sur la même page doit refermer le menu avant de défiler
  menuDialog.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });

  // Passage en largeur bureau avec le menu ouvert : on le referme
  var desktopQuery = window.matchMedia("(min-width: 960px)");
  desktopQuery.addEventListener("change", function (event) {
    if (event.matches) closeMenu();
  });
})();
