// Outils des pages recette : ajustement des portions, mode cuisine (écran allumé), impression.
(function () {
  var tools = document.querySelector("[data-recipe-tools]");
  if (!tools) return;

  /* ---------- Portions ---------- */
  var baseServings = parseInt(tools.dataset.servings, 10);
  var servingsControl = tools.querySelector("[data-servings-control]");
  var servingsCount = tools.querySelector("[data-servings-count]");
  var quantities = Array.prototype.slice.call(document.querySelectorAll("[data-qty]"));

  // « 250 », « 1,5 », « 1/2 », « 1 1/2 » → nombre ; null si la quantité n'est pas chiffrable (« 1 pincée »…)
  var parseQuantity = function (raw) {
    var text = String(raw).trim().replace(",", ".");
    var mixed = text.match(/^(\d+)\s+(\d+)\/(\d+)$/);
    if (mixed) return Number(mixed[1]) + Number(mixed[2]) / Number(mixed[3]);
    var fraction = text.match(/^(\d+)\/(\d+)$/);
    if (fraction) return Number(fraction[1]) / Number(fraction[2]);
    return /^\d+(\.\d+)?$/.test(text) ? Number(text) : null;
  };

  var formatQuantity = function (value) {
    var rounded = value >= 10 ? Math.round(value) : Math.round(value * 100) / 100;
    return rounded.toLocaleString("fr-FR", { maximumFractionDigits: 2 });
  };

  var scalable = quantities.filter(function (node) {
    return parseQuantity(node.dataset.qty) !== null;
  });

  // Valeur « Portions » de la fiche d'infos (au-dessus) : on la garde alignée sur le sélecteur
  var infoServings = null;
  Array.prototype.forEach.call(document.querySelectorAll(".recette-single dt"), function (dt) {
    if (
      /portion/i.test(dt.textContent) &&
      dt.nextElementSibling &&
      dt.nextElementSibling.tagName === "DD"
    ) {
      infoServings = dt.nextElementSibling;
    }
  });
  var infoServingsText = infoServings ? infoServings.textContent : "";

  if (servingsControl && baseServings > 0 && scalable.length) {
    var servings = baseServings;
    servingsControl.hidden = false;

    var render = function () {
      servingsCount.textContent = servings;
      if (infoServings) {
        infoServings.textContent = infoServingsText.replace(String(baseServings), String(servings));
      }
      var ratio = servings / baseServings;
      scalable.forEach(function (node) {
        var value = parseQuantity(node.dataset.qty) * ratio;
        node.textContent = ratio === 1 ? node.dataset.qty : formatQuantity(value);
      });
      tools.querySelector('[data-servings-step="-1"]').disabled = servings <= 1;
    };

    servingsControl.addEventListener("click", function (event) {
      var button = event.target.closest("[data-servings-step]");
      if (!button) return;
      servings = Math.max(1, Math.min(99, servings + Number(button.dataset.servingsStep)));
      render();
    });
    render();
  }

  /* ---------- Mode cuisine : empêche l'écran de se mettre en veille (Screen Wake Lock API) ---------- */
  var cookButton = tools.querySelector("[data-cook-mode]");
  var cookStatus = tools.querySelector("[data-cook-mode-status]");
  var wakeLock = null;
  var wantsWakeLock = false;

  var setCookState = function (active, message) {
    cookButton.setAttribute("aria-pressed", String(active));
    cookButton.classList.toggle("is-active", active);
    if (cookStatus) cookStatus.textContent = message || "";
  };

  var requestWakeLock = function () {
    return navigator.wakeLock.request("screen").then(function (lock) {
      wakeLock = lock;
      wakeLock.addEventListener("release", function () {
        wakeLock = null;
        if (!wantsWakeLock) setCookState(false);
      });
      setCookState(true, "Mode cuisine activé : l’écran reste allumé.");
    });
  };

  if (cookButton && "wakeLock" in navigator) {
    cookButton.hidden = false;
    cookButton.addEventListener("click", function () {
      if (wantsWakeLock) {
        wantsWakeLock = false;
        if (wakeLock) wakeLock.release();
        setCookState(false, "Mode cuisine désactivé.");
        return;
      }
      wantsWakeLock = true;
      requestWakeLock().catch(function () {
        wantsWakeLock = false;
        setCookState(false, "Impossible de garder l’écran allumé sur cet appareil.");
      });
    });

    // Le verrou saute quand l'onglet passe en arrière-plan : on le reprend au retour
    document.addEventListener("visibilitychange", function () {
      if (wantsWakeLock && !wakeLock && document.visibilityState === "visible") {
        requestWakeLock().catch(function () {});
      }
    });
  }

  /* ---------- Impression ---------- */
  var printButton = tools.querySelector("[data-print]");
  if (printButton && typeof window.print === "function") {
    printButton.hidden = false;
    printButton.addEventListener("click", function () {
      window.print();
    });
  }
})();
