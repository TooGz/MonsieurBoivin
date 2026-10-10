import path from "node:path";
import { promises as fs } from "node:fs";
import { listPublicHtmlFiles, publicDir } from "./utils/site-data.mjs";
import { findMeta, findTags, isRedirectPage, stripNonMarkup } from "./utils/html.mjs";

const getTitle = (html) => html.match(/<title>([^<]*)<\/title>/i)?.[1]?.trim() || "";

const main = async () => {
  const htmlFiles = await listPublicHtmlFiles();
  const failures = [];
  let checked = 0;

  for (const htmlFile of htmlFiles) {
    const html = await fs.readFile(htmlFile, "utf8");
    const relativePath = path.relative(publicDir, htmlFile);

    // Pages d'alias (redirections) : rien à vérifier
    if (isRedirectPage(html)) continue;
    checked += 1;

    const markup = stripNonMarkup(html);
    const meta = (key, value) => findMeta(html, key, value)?.content?.trim() || "";
    const canonical =
      findTags(html, "link").find(
        (attributes) => (attributes.rel || "").toLowerCase() === "canonical"
      )?.href || "";
    const h1Count = findTags(markup, "h1").length;
    const jsonLdCount = findTags(html, "script").filter(
      (attributes) => (attributes.type || "").toLowerCase() === "application/ld+json"
    ).length;
    const imagesWithoutAlt = findTags(markup, "img").filter(
      (attributes) => !Object.prototype.hasOwnProperty.call(attributes, "alt")
    ).length;

    const checks = [
      [getTitle(html).length > 10, "missing/short title"],
      [meta("name", "description").length > 50, "missing/short meta description"],
      [/^https?:\/\//.test(canonical), "missing/invalid canonical"],
      [meta("property", "og:title").length > 10, "missing og:title"],
      [meta("property", "og:description").length > 20, "missing og:description"],
      [/^https?:\/\//.test(meta("property", "og:url")), "missing og:url"],
      [meta("name", "twitter:card").length > 0, "missing twitter:card"],
      [h1Count === 1, `expected 1 h1, got ${h1Count}`],
      [jsonLdCount > 0, "missing JSON-LD"],
      [imagesWithoutAlt === 0, `${imagesWithoutAlt} image(s) without alt`],
    ];

    const brokenChecks = checks.filter(([ok]) => !ok).map(([, reason]) => reason);
    if (brokenChecks.length) {
      failures.push({ file: relativePath, reasons: brokenChecks });
    }
  }

  if (failures.length) {
    console.error("SEO template audit failed:");
    for (const failure of failures) {
      console.error(`- ${failure.file}`);
      for (const reason of failure.reasons) {
        console.error(`  - ${reason}`);
      }
    }
    process.exitCode = 1;
    return;
  }

  console.log(
    `SEO template audit passed on ${checked} HTML pages (${htmlFiles.length - checked} redirects skipped).`
  );
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
