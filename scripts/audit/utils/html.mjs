// Petits outils d'analyse du HTML généré par Hugo.
// Le HTML est minifié (--minify) : les attributs peuvent être sans guillemets (<link rel=canonical href=https://…>),
// il faut donc accepter "…", '…' et les valeurs nues.

const entityMap = {
  "&amp;": "&",
  "&quot;": '"',
  "&#39;": "'",
  "&#34;": '"',
  "&lt;": "<",
  "&gt;": ">",
};

export const decodeEntities = (value) =>
  value.replace(/&(?:amp|quot|lt|gt|#39|#34);/g, (entity) => entityMap[entity] ?? entity);

// Retire scripts, styles et modèles : leur contenu (JSON-LD, JS…) ne contient pas de vrais liens
export const stripNonMarkup = (html) =>
  html.replace(/<(script|style|template)\b[^>]*>[\s\S]*?<\/\1>/gi, "");

const attributePattern = /([^\s"'=<>`/]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;

export const parseAttributes = (source) => {
  const attributes = {};
  for (const match of source.matchAll(attributePattern)) {
    const name = match[1].toLowerCase();
    const value = match[2] ?? match[3] ?? match[4] ?? "";
    attributes[name] = decodeEntities(value);
  }
  return attributes;
};

// Toutes les balises <tagName …> d'un document, sous forme d'objets d'attributs
export const findTags = (html, tagName) => {
  const pattern = new RegExp(`<${tagName}\\b([^>]*)>`, "gi");
  return [...html.matchAll(pattern)].map((match) => parseAttributes(match[1]));
};

export const findMeta = (html, key, value) =>
  findTags(html, "meta").find((attributes) => (attributes[key] || "").toLowerCase() === value);

// Page d'alias Hugo (redirection par <meta http-equiv="refresh">)
export const isRedirectPage = (html) => Boolean(findMeta(html, "http-equiv", "refresh"));

export const collectIds = (html) => {
  const ids = new Set();
  for (const match of html.matchAll(/\sid=(?:"([^"]*)"|'([^']*)'|([^\s>]+))/gi)) {
    ids.add(decodeEntities(match[1] ?? match[2] ?? match[3] ?? ""));
  }
  return ids;
};

// Cibles d'URL locales d'un document : href, src, poster et chaque candidat de srcset
export const collectLinkTargets = (html) => {
  const markup = stripNonMarkup(html);
  const targets = [];
  for (const tag of ["a", "link", "img", "source", "video", "audio", "iframe", "use"]) {
    for (const attributes of findTags(markup, tag)) {
      for (const name of ["href", "src", "poster"]) {
        if (attributes[name]) targets.push(attributes[name].trim());
      }
      if (attributes.srcset) {
        for (const candidate of attributes.srcset.split(",")) {
          const url = candidate.trim().split(/\s+/)[0];
          if (url) targets.push(url);
        }
      }
    }
  }
  return targets;
};
