import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const currentDir = path.dirname(fileURLToPath(import.meta.url));

export const repoRoot = path.resolve(currentDir, "../../..");
export const contentDir = path.join(repoRoot, "content");
export const docsDir = path.join(repoRoot, "docs");
export const reportsDir = path.join(repoRoot, "reports");
export const publicDir = path.join(repoRoot, "public");

const scalarKeys = ["title", "slug", "type", "layout", "description"];

export const normalizeSlash = (value) => value.replace(/\\/g, "/");

export const slugify = (value) =>
  normalizeSlash(String(value).trim().replace(/^["']|["']$/g, "")).replace(/^\/+|\/+$/g, "");

export const ensureDir = async (dirPath) => {
  await fs.mkdir(dirPath, { recursive: true });
};

export const walkFiles = async (dirPath, matcher = () => true) => {
  const results = [];
  const entries = await fs.readdir(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const absolutePath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      results.push(...(await walkFiles(absolutePath, matcher)));
      continue;
    }

    if (matcher(absolutePath)) {
      results.push(absolutePath);
    }
  }

  return results;
};

const parseScalar = (block, key) => {
  const pattern = new RegExp(`^${key}\\s*[:=]\\s*(.+)$`, "m");
  const match = block.match(pattern);
  if (!match) return "";
  return String(match[1]).trim().replace(/^["']|["']$/g, "");
};

export const parseFrontMatter = (source) => {
  const lines = source.split(/\r?\n/);
  const delimiter = lines[0]?.trim();

  if (!delimiter || !["---", "+++"].includes(delimiter)) {
    return {};
  }

  const endIndex = lines.slice(1).findIndex((line) => line.trim() === delimiter);
  if (endIndex === -1) {
    return {};
  }

  const block = lines.slice(1, endIndex + 1).join("\n");
  const data = {};

  for (const key of scalarKeys) {
    const value = parseScalar(block, key);
    if (value) data[key] = value;
  }

  const draftMatch = block.match(/^draft\s*[:=]\s*(true|false)$/m);
  if (draftMatch) {
    data.draft = draftMatch[1] === "true";
  }

  return data;
};

const deriveUrl = (relativeFilePath, frontMatter = {}) => {
  const parts = normalizeSlash(relativeFilePath).split("/");
  const fileName = parts.at(-1);
  const directoryParts = parts.slice(0, -1);

  if (fileName === "_index.md") {
    if (directoryParts.length === 0) return "/";
    const branchParts = [...directoryParts];
    if (frontMatter.slug) branchParts[branchParts.length - 1] = slugify(frontMatter.slug);
    return `/${branchParts.join("/")}/`;
  }

  if (fileName === "index.md") {
    const bundleParts = [...directoryParts];
    if (frontMatter.slug) bundleParts[bundleParts.length - 1] = slugify(frontMatter.slug);
    return `/${bundleParts.join("/")}/`;
  }

  const stem = path.basename(fileName, ".md");
  return `/${[...directoryParts, slugify(frontMatter.slug || stem)].join("/")}/`;
};

const classifyPageType = ({ section, fileName, urlPath, relativePath }) => {
  if (urlPath === "/") return "home";
  if (relativePath === "posts/_index.md") return "listing:articles";
  if (relativePath === "recettes/_index.md") return "listing:recipes";
  if (relativePath === "atelier/_index.md") return "listing:atelier";
  if (relativePath === "photos/_index.md") return "listing:photos";
  if (relativePath === "authors/_index.md") return "listing:authors";
  if (relativePath === "tags/_index.md") return "listing:tags";
  if (section === "recettes") return "detail:recipe";
  if (section === "posts") return "detail:article";
  if (section === "atelier" && urlPath.includes("/build/")) return "detail:build-log";
  if (section === "atelier") return "detail:project";
  if (section === "photos") return "detail:photo-album";
  if (section === "authors") return "detail:author-profile";
  return "detail:content";
};

const inferPageTitle = (frontMatter, relativePath) => {
  if (frontMatter.title) return frontMatter.title;
  return path.basename(path.dirname(relativePath));
};

const countMojibakeFiles = async () => {
  const candidateFiles = await walkFiles(repoRoot, (filePath) => {
    const normalized = normalizeSlash(path.relative(repoRoot, filePath));
    return /\.(md|toml|html|css)$/i.test(filePath) && !normalized.startsWith("themes/");
  });

  let count = 0;
  for (const filePath of candidateFiles) {
    const contents = await fs.readFile(filePath, "utf8");
    if (/[ÃÂ][^\s]{0,4}/.test(contents) || contents.includes("â€™")) {
      count += 1;
    }
  }

  return count;
};

const buildComponentInventory = () => [
  {
    id: "global-header",
    role: "Header + navigation legacy Blowfish",
    source: "themes/blowfish/layouts/partials/header/basic.html"
  },
  {
    id: "global-footer",
    role: "Footer global legacy Blowfish",
    source: "themes/blowfish/layouts/partials/footer.html"
  },
  {
    id: "home-shell-v2",
    role: "Homepage custom shell with hero, timeline, filters, CTA",
    source: "layouts/partials/home/custom.html"
  },
  {
    id: "mini-card",
    role: "Reusable cards for article / recipe / project highlights",
    source: "layouts/partials/home/mini-card.html"
  },
  {
    id: "recipe-single",
    role: "Dedicated recipe detail layout",
    source: "layouts/partials/recipes/single.html"
  },
  {
    id: "design-system-patterns",
    role: "Reference component patterns and tokens for migration",
    source: "design-system/components/*.html"
  }
];

const buildDebtList = async (pages) => {
  const mojibakeFiles = await countMojibakeFiles();

  return [
    {
      level: "high",
      area: "layout-shell",
      summary: "Home custom v2 et pages legacy Blowfish n'utilisent pas encore le meme shell visuel.",
      impact: "Header, footer, densite de contenu et cartes changent trop d'un type de page a l'autre."
    },
    {
      level: "high",
      area: "css-architecture",
      summary: "Le repo melange classes utilitaires Blowfish/Tailwind compilees et CSS custom maison.",
      impact: "Collision de conventions, duplication de tokens et maintenance plus lente."
    },
    {
      level: "medium",
      area: "component-consistency",
      summary: "Les cartes articles, listings sections et recette-single n'ont pas encore la meme grille, ni les memes rayons, ni la meme hierarchie de meta.",
      impact: "Le site ne lit pas comme un systeme unique."
    },
    {
      level: "medium",
      area: "js-behaviour",
      summary: "Le theme legacy, la home v2 et les futurs scripts d'audit introduisent trois zones de JS distinctes.",
      impact: "Il faut unifier les conventions `data-js`, theme toggle et menu mobile."
    },
    {
      level: mojibakeFiles > 0 ? "medium" : "low",
      area: "content-encoding",
      summary: `${mojibakeFiles} fichier(s) montrent des traces d'encodage bancal ou de texte mojibake.`,
      impact: "SEO, lisibilite et microcopy peuvent se degrader sur certaines pages."
    },
    {
      level: "low",
      area: "tooling",
      summary: "Le repo n'avait pas de package root ni de quality gate front avant cette passe.",
      impact: "Les regressions HTML/SEO/a11y/perf passaient facilement sous le radar."
    },
    {
      level: "low",
      area: "coverage",
      summary: `${pages.filter((page) => page.section === "photos").length} pages photo restent surtout documentaires et n'utilisent pas encore de pattern v2 dedie.`,
      impact: "Le design system doit prevoir un pattern galerie / album dans une deuxieme vague."
    }
  ];
};

const pickSampleRoutes = (pages) => {
  const wantedTypes = [
    "home",
    "listing:articles",
    "listing:recipes",
    "detail:article",
    "detail:recipe",
    "detail:project",
    "detail:photo-album"
  ];

  const samples = [];
  for (const type of wantedTypes) {
    const page = pages.find((entry) => entry.pageType === type && entry.draft !== true);
    if (page) {
      samples.push({
        label: page.title,
        route: page.url,
        pageType: page.pageType
      });
    }
  }

  return samples;
};

export const buildSiteInventory = async () => {
  const markdownFiles = await walkFiles(contentDir, (filePath) => filePath.endsWith(".md"));
  const pages = [];

  for (const absolutePath of markdownFiles) {
    const source = await fs.readFile(absolutePath, "utf8");
    const relativePath = path.relative(contentDir, absolutePath);
    const frontMatter = parseFrontMatter(source);
    const url = deriveUrl(relativePath, frontMatter);
    const fileName = path.basename(relativePath);
    const section = normalizeSlash(relativePath).split("/")[0] || "root";

    pages.push({
      source: normalizeSlash(relativePath),
      url,
      title: inferPageTitle(frontMatter, relativePath),
      pageType: classifyPageType({
        section,
        fileName,
        urlPath: url,
        relativePath: normalizeSlash(relativePath)
      }),
      section,
      layout: frontMatter.layout || "",
      contentType: frontMatter.type || "",
      draft: Boolean(frontMatter.draft)
    });
  }

  pages.sort((left, right) => left.url.localeCompare(right.url));

  const typeCounts = Object.entries(
    pages.reduce((accumulator, page) => {
      accumulator[page.pageType] = (accumulator[page.pageType] || 0) + 1;
      return accumulator;
    }, {})
  )
    .map(([pageType, count]) => ({ pageType, count }))
    .sort((left, right) => right.count - left.count);

  return {
    generatedAt: new Date().toISOString(),
    stack: {
      generator: "Hugo",
      theme: "Blowfish",
      routing: "Filesystem content bundles + Hugo taxonomies",
      css: [
        "themes/blowfish/assets/css/compiled/main.css",
        "assets/css/design-system/*.css",
        "assets/css/styles.css",
        "assets/css/custom.css"
      ],
      javascript: [
        "themes/blowfish/assets/js/*.js",
        "assets/js/main.js",
        "assets/js/components/*.js"
      ],
      ci: [".github/workflows/hugo.yaml", ".github/workflows/quality.yml"]
    },
    pages,
    pageTypes: typeCounts,
    components: buildComponentInventory(),
    sampleRoutes: pickSampleRoutes(pages),
    debts: await buildDebtList(pages)
  };
};

export const loadInventoryReport = async () => {
  const inventoryPath = path.join(reportsDir, "site-inventory.json");
  try {
    const source = await fs.readFile(inventoryPath, "utf8");
    return JSON.parse(source);
  } catch {
    return buildSiteInventory();
  }
};

export const getAuditSampleRoutes = async () => {
  const inventory = await loadInventoryReport();
  return inventory.sampleRoutes?.length
    ? inventory.sampleRoutes
    : [
        { label: "Home", route: "/", pageType: "home" },
        { label: "Articles", route: "/posts/", pageType: "listing:articles" },
        { label: "Recettes", route: "/recettes/", pageType: "listing:recipes" }
      ];
};

export const listPublicHtmlFiles = async () =>
  walkFiles(publicDir, (filePath) => filePath.endsWith(".html"));
