import path from "node:path";
import { promises as fs } from "node:fs";
import { listPublicHtmlFiles, publicDir } from "./utils/site-data.mjs";

const getMatch = (html, pattern) => html.match(pattern)?.[1]?.trim() || "";

const countMatches = (html, pattern) => [...html.matchAll(pattern)].length;

const main = async () => {
  const htmlFiles = await listPublicHtmlFiles();
  const failures = [];

  for (const htmlFile of htmlFiles) {
    const html = await fs.readFile(htmlFile, "utf8");
    const relativePath = path.relative(publicDir, htmlFile);

    const title = getMatch(html, /<title>([^<]+)<\/title>/i);
    const description = getMatch(
      html,
      /<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i
    );
    const canonical = getMatch(
      html,
      /<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i
    );
    const ogTitle = getMatch(
      html,
      /<meta\s+property=["']og:title["']\s+content=["']([^"']+)["']/i
    );
    const ogDescription = getMatch(
      html,
      /<meta\s+property=["']og:description["']\s+content=["']([^"']+)["']/i
    );
    const ogUrl = getMatch(html, /<meta\s+property=["']og:url["']\s+content=["']([^"']+)["']/i);
    const twitterCard = getMatch(
      html,
      /<meta\s+name=["']twitter:card["']\s+content=["']([^"']+)["']/i
    );
    const h1Count = countMatches(html, /<h1\b/gi);
    const jsonLdCount = countMatches(
      html,
      /<script\s+type=["']application\/ld\+json["'][^>]*>/gi
    );
    const imagesWithoutAlt = countMatches(html, /<img\b(?![^>]*\balt=)[^>]*>/gi);

    const checks = [
      [title.length > 10, "missing/short title"],
      [description.length > 50, "missing/short meta description"],
      [/^https?:\/\//.test(canonical), "missing/invalid canonical"],
      [ogTitle.length > 10, "missing og:title"],
      [ogDescription.length > 20, "missing og:description"],
      [/^https?:\/\//.test(ogUrl), "missing og:url"],
      [twitterCard.length > 0, "missing twitter:card"],
      [h1Count === 1, `expected 1 h1, got ${h1Count}`],
      [jsonLdCount > 0, "missing JSON-LD"],
      [imagesWithoutAlt === 0, `${imagesWithoutAlt} image(s) without alt`]
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

  console.log(`SEO template audit passed on ${htmlFiles.length} HTML files.`);
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
