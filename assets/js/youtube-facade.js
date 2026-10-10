// Façade YouTube : remplace la vignette par le lecteur (youtube-nocookie.com) au clic.
// Ctrl/Cmd + clic ou clic du milieu : comportement normal du lien (ouverture sur YouTube).
(function () {
  document.addEventListener("click", function (event) {
    var link = event.target.closest(".yt-facade__link");
    if (!link || event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;

    var facade = link.closest(".yt-facade");
    var id = facade.dataset.ytId;
    if (!/^[A-Za-z0-9_-]{11}$/.test(id)) return;
    event.preventDefault();

    var params = new URLSearchParams({ autoplay: "1", rel: "0" });
    if (facade.dataset.ytStart) params.set("start", facade.dataset.ytStart);

    var iframe = document.createElement("iframe");
    iframe.src = "https://www.youtube-nocookie.com/embed/" + id + "?" + params.toString();
    iframe.title = facade.dataset.ytTitle || "Vidéo YouTube";
    iframe.allow =
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.allowFullscreen = true;
    iframe.referrerPolicy = "strict-origin-when-cross-origin";
    iframe.className = "yt-facade__iframe";

    facade.replaceChildren(iframe);
    facade.classList.add("is-playing");
    iframe.focus();
  });
})();
