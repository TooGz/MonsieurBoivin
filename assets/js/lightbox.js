// Visionneuse des galeries photo (shortcode gallery) : <dialog> natif, sans dépendance.
// Clavier : ← → pour naviguer, Échap pour fermer (géré par <dialog>). Tactile : balayage horizontal.
(function () {
  var links = Array.prototype.slice.call(document.querySelectorAll(".gallery a[data-lightbox]"));
  if (!links.length) return;

  var dialog = document.createElement("dialog");
  dialog.className = "lightbox";
  dialog.setAttribute("aria-label", "Visionneuse photo");
  dialog.innerHTML =
    '<div class="lightbox__bar">' +
    '<span class="lightbox__counter" aria-live="polite"></span>' +
    '<button type="button" class="lightbox__button" data-action="close" aria-label="Fermer la visionneuse">✕</button>' +
    "</div>" +
    '<figure class="lightbox__figure"><img alt="" decoding="async"></figure>' +
    '<p class="lightbox__caption"></p>' +
    '<button type="button" class="lightbox__button lightbox__nav lightbox__nav--prev" data-action="prev" aria-label="Photo précédente">‹</button>' +
    '<button type="button" class="lightbox__button lightbox__nav lightbox__nav--next" data-action="next" aria-label="Photo suivante">›</button>';
  document.body.appendChild(dialog);

  var image = dialog.querySelector("img");
  var caption = dialog.querySelector(".lightbox__caption");
  var counter = dialog.querySelector(".lightbox__counter");
  var current = 0;
  var opener = null;

  var show = function (index) {
    current = (index + links.length) % links.length;
    var link = links[current];
    var thumb = link.querySelector("img");
    var alt = thumb ? thumb.getAttribute("alt") || "" : "";
    image.src = link.getAttribute("href");
    image.alt = alt;
    if (link.dataset.width && link.dataset.height) {
      image.width = Number(link.dataset.width);
      image.height = Number(link.dataset.height);
    }
    caption.textContent = alt;
    counter.textContent = current + 1 + " / " + links.length;

    // Précharge la suivante pour une navigation sans attente
    var next = links[(current + 1) % links.length];
    if (next) {
      var preload = new Image();
      preload.src = next.getAttribute("href");
    }
  };

  var open = function (index) {
    opener = links[index];
    show(index);
    if (!dialog.open) {
      dialog.showModal();
      document.documentElement.classList.add("has-open-dialog");
    }
  };

  links.forEach(function (link, index) {
    link.addEventListener("click", function (event) {
      // Ctrl/Cmd + clic : ouverture normale dans un onglet
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
      event.preventDefault();
      open(index);
    });
  });

  dialog.addEventListener("click", function (event) {
    var action = event.target.closest("[data-action]");
    if (action) {
      var name = action.getAttribute("data-action");
      if (name === "close") dialog.close();
      if (name === "prev") show(current - 1);
      if (name === "next") show(current + 1);
      return;
    }
    // Clic en dehors de la photo : fermeture
    if (event.target === dialog || event.target.classList.contains("lightbox__figure")) {
      dialog.close();
    }
  });

  dialog.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      show(current - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      show(current + 1);
    }
  });

  var touchStartX = null;
  dialog.addEventListener(
    "touchstart",
    function (event) {
      touchStartX = event.touches[0].clientX;
    },
    { passive: true }
  );
  dialog.addEventListener(
    "touchend",
    function (event) {
      if (touchStartX === null) return;
      var delta = event.changedTouches[0].clientX - touchStartX;
      if (Math.abs(delta) > 50) show(delta < 0 ? current + 1 : current - 1);
      touchStartX = null;
    },
    { passive: true }
  );

  dialog.addEventListener("close", function () {
    document.documentElement.classList.remove("has-open-dialog");
    image.removeAttribute("src");
    // On rend le focus à la vignette d'origine, positionnée sur la dernière photo vue
    var target = links[current] || opener;
    if (target) target.focus();
  });
})();
