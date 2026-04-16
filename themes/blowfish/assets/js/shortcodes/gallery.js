function _getDefaultPackeryOptions() {
  return {
    percentPosition: true,
    gutter: 5,
    resize: true,
  };
}

function _getPackeryOptions(nodeGallery) {
  const defaults = _getDefaultPackeryOptions();
  const {
    packeryGutter,
    packeryPercentPosition,
    packeryResize,
  } = nodeGallery.dataset;

  return {
    percentPosition:
      packeryPercentPosition !== undefined
        ? packeryPercentPosition === "true"
        : defaults.percentPosition,
    gutter:
      packeryGutter !== undefined ? parseInt(packeryGutter, 10) : defaults.gutter,
    resize:
      packeryResize !== undefined ? packeryResize === "true" : defaults.resize,
  };
}

function initGalleries() {
  const nodeGalleries = document.querySelectorAll(".gallery");

  if (!nodeGalleries.length || typeof Packery === "undefined") {
    return;
  }

  nodeGalleries.forEach((nodeGallery) => {
    new Packery(nodeGallery, _getPackeryOptions(nodeGallery));
  });
}

if (document.readyState === "complete") {
  initGalleries();
} else {
  window.addEventListener("load", initGalleries, { once: true });
}
