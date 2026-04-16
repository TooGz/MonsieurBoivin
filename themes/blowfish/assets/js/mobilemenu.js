var menuButton = document.getElementById("menu-button");
var menuCloseButton = document.getElementById("menu-close-button");
var menuWrapper = document.getElementById("menu-wrapper");
var searchButtonMobile = document.getElementById("search-button-mobile");
var appearanceSwitcherMobile = document.getElementById("appearance-switcher-mobile");
var suppressedButtons = [searchButtonMobile, appearanceSwitcherMobile].filter(Boolean);

var menuOpen = false;

var setSuppressedButtonsState = function (shouldHide) {
  suppressedButtons.forEach(function (button) {
    button.hidden = shouldHide;
    button.setAttribute("aria-hidden", shouldHide ? "true" : "false");
  });
};

var openMenu = function () {
  if (!menuOpen) {
    menuOpen = true;
    document.body.style.overflowY = "hidden";
    setSuppressedButtonsState(true);
    menuButton.style.visibility = "hidden";
    menuButton.setAttribute("aria-expanded", "true");
    menuWrapper.style.visibility = "visible";
    menuWrapper.style.opacity = "1";
    window.onbeforeunload = function () {
      closeMenu();
    };
  }
};

var closeMenu = function (e) {
  if (menuOpen) {
    menuOpen = false;
    document.body.style.overflowY = "auto";
    setSuppressedButtonsState(false);
    menuButton.style.visibility = "visible";
    menuButton.setAttribute("aria-expanded", "false");
    menuWrapper.style.visibility = "hidden";
    menuWrapper.style.opacity = "0";
    window.onbeforeunload = function () {};
    if (e && typeof e.stopPropagation === "function") {
      e.stopPropagation();
    }
  }
};

menuButton && menuButton.addEventListener("click", openMenu);
menuCloseButton && menuCloseButton.addEventListener("click", closeMenu);
