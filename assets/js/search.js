/* global Fuse */
// Surcharge de themes/blowfish/assets/js/search.js
// - Le focus va dans le champ à l'ouverture, reste dans la fenêtre (Tab / Maj+Tab) et revient au bouton à la fermeture.
// - Recherche insensible aux accents (« electronique » trouve « électronique ») et tolérante aux fautes de frappe.
// - Nombre de résultats annoncé aux lecteurs d'écran ; résultats construits sans innerHTML.
(function () {
  var wrapper = document.getElementById("search-wrapper");
  if (!wrapper) return;

  var openButtons = [
    document.getElementById("search-button"),
    document.getElementById("search-button-mobile"),
  ].filter(Boolean);
  var closeButton = document.getElementById("close-search-button");
  var modal = document.getElementById("search-modal");
  var input = document.getElementById("search-query");
  var output = document.getElementById("search-results");
  var status = document.getElementById("search-status");

  var fuse = null;
  var indexing = false;
  var visible = false;
  var opener = null;
  var pendingQuery = "";
  var debounce = null;

  var fuseOptions = {
    shouldSort: true,
    ignoreLocation: true,
    ignoreDiacritics: true,
    threshold: 0.3,
    minMatchCharLength: 2,
    keys: [
      { name: "title", weight: 0.8 },
      { name: "section", weight: 0.2 },
      { name: "summary", weight: 0.6 },
      { name: "content", weight: 0.4 },
    ],
  };

  var plainText = function (html) {
    // DOMParser ne charge ni n'exécute rien (contrairement à un div.innerHTML)
    return new DOMParser().parseFromString(html || "", "text/html").body.textContent || "";
  };

  var buildIndex = function () {
    if (fuse || indexing) return;
    indexing = true;
    var baseURL = (wrapper.getAttribute("data-url") || "/").replace(/\/?$/, "/");
    fetch(baseURL + "index.json")
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        fuse = new Fuse(data, fuseOptions);
        indexing = false;
        if (pendingQuery) executeQuery(pendingQuery);
      })
      .catch(function () {
        indexing = false;
        status.textContent = "La recherche est indisponible pour le moment.";
      });
  };

  var focusables = function () {
    return Array.prototype.slice.call(modal.querySelectorAll("input, button, a[href]"));
  };

  var displaySearch = function (event) {
    if (visible) return;
    opener = (event && event.currentTarget) || document.activeElement;
    buildIndex();
    visible = true;
    document.body.style.overflow = "hidden";
    // Visibilité immédiate, sans transition : une règle globale (réduction des animations, en !important)
    // laissait le champ « hidden » un instant, et un champ invisible refuse le focus
    wrapper.classList.remove("invisible");
    wrapper.style.setProperty("transition", "none", "important");
    wrapper.style.setProperty("visibility", "visible", "important");
    document.documentElement.classList.add("has-open-dialog");
    // Focus immédiat, puis nouvelles tentatives : juste après un chargement (transition de page en cours),
    // le premier focus peut être ignoré par le navigateur
    var focusInput = function () {
      if (visible && !modal.contains(document.activeElement)) input.focus();
    };
    input.focus();
    requestAnimationFrame(focusInput);
    setTimeout(focusInput, 100);
  };

  var hideSearch = function () {
    if (!visible) return;
    visible = false;
    document.body.style.overflow = "";
    wrapper.style.removeProperty("visibility");
    wrapper.style.removeProperty("transition");
    wrapper.classList.add("invisible");
    document.documentElement.classList.remove("has-open-dialog");
    input.value = "";
    output.replaceChildren();
    status.textContent = "";
    if (opener && typeof opener.focus === "function") opener.focus();
  };

  var renderResult = function (item) {
    var li = document.createElement("li");
    li.className = "mb-2";
    var link = document.createElement("a");
    link.className =
      "flex items-center px-3 py-2 rounded-md bg-neutral-100 dark:bg-neutral-700 focus:bg-primary-100 hover:bg-primary-100 dark:hover:bg-primary-900 dark:focus:bg-primary-900";
    if (item.externalUrl) {
      link.href = item.externalUrl;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    } else {
      link.href = item.permalink;
    }

    var body = document.createElement("div");
    body.className = "grow";
    var title = document.createElement("div");
    title.className = "-mb-1 text-lg font-bold";
    title.textContent = plainText(item.title);
    var meta = document.createElement("div");
    meta.className = "text-sm text-neutral-600 dark:text-neutral-300";
    meta.textContent = plainText(item.section) + (item.date ? " · " + item.date : "");
    var summary = document.createElement("div");
    summary.className = "text-sm italic";
    summary.textContent = plainText(item.summary).slice(0, 220);

    body.append(title, meta, summary);
    var arrow = document.createElement("div");
    arrow.className = "ml-2 text-neutral-600 dark:text-neutral-300";
    arrow.setAttribute("aria-hidden", "true");
    arrow.textContent = "→";
    link.append(body, arrow);
    li.append(link);
    return li;
  };

  var executeQuery = function (term) {
    term = term.trim();
    pendingQuery = term;
    if (!fuse) {
      if (term) status.textContent = "Chargement de l’index…";
      return;
    }
    if (term.length < 2) {
      output.replaceChildren();
      status.textContent = "";
      return;
    }
    var results = fuse.search(term, { limit: 20 });
    output.replaceChildren.apply(
      output,
      results.map(function (result) {
        return renderResult(result.item);
      })
    );
    status.textContent =
      results.length === 0
        ? "Aucun résultat pour « " + term + " »."
        : results.length + (results.length > 1 ? " résultats" : " résultat");
  };

  openButtons.forEach(function (button) {
    button.addEventListener("click", displaySearch);
  });
  closeButton.addEventListener("click", hideSearch);
  wrapper.addEventListener("click", function (event) {
    if (!modal.contains(event.target)) hideSearch();
  });

  input.addEventListener("input", function () {
    clearTimeout(debounce);
    var value = input.value;
    debounce = setTimeout(function () {
      executeQuery(value);
    }, 120);
  });

  document.addEventListener("keydown", function (event) {
    var active = document.activeElement;

    // « / » ouvre la recherche (hors champ de saisie)
    if (event.key === "/" && !visible) {
      var tag = active && active.tagName;
      if (tag !== "INPUT" && tag !== "TEXTAREA" && !(active && active.isContentEditable)) {
        event.preventDefault();
        displaySearch();
      }
      return;
    }
    if (!visible) return;

    if (event.key === "Escape") {
      event.preventDefault();
      hideSearch();
      return;
    }

    // Fenêtre ouverte mais focus resté dehors : on le ramène dans le champ (Tab ou frappe directe)
    if (!modal.contains(active)) {
      if (event.key === "Tab") event.preventDefault();
      input.focus();
      return;
    }

    // Piège du focus dans la fenêtre
    if (event.key === "Tab") {
      var items = focusables();
      var firstItem = items[0];
      var lastItem = items[items.length - 1];
      if (event.shiftKey && active === firstItem) {
        event.preventDefault();
        lastItem.focus();
      } else if (!event.shiftKey && active === lastItem) {
        event.preventDefault();
        firstItem.focus();
      }
      return;
    }

    // Flèches haut/bas pour parcourir les résultats, Entrée depuis le champ pour aller au premier
    var links = Array.prototype.slice.call(output.querySelectorAll("a"));
    if (!links.length) return;
    var index = links.indexOf(active);
    if (event.key === "ArrowDown" || (event.key === "Enter" && active === input)) {
      event.preventDefault();
      links[Math.min(index + 1, links.length - 1)].focus();
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      if (index <= 0) input.focus();
      else links[index - 1].focus();
    }
  });
})();
