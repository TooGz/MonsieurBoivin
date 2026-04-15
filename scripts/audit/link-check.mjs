import path from "node:path";
import { promises as fs } from "node:fs";
import { listPublicHtmlFiles, publicDir } from "./utils/site-data.mjs";

const idsCache = new Map();

const linkPattern = /\b(?:href|src)=["']([^"'#][^"']*|#[^"']+)["']/gi;
const idPattern = /\sid=["']([^"']+)["']/gi;

const collectIds = async (filePath) => {
  if (idsCache.has(filePath)) return idsCache.get(filePath);

  const html = await fs.readFile(filePath, "utf8");
  const ids = new Set([...html.matchAll(idPattern)].map((match) => match[1]));
  idsCache.set(filePath, ids);
  return ids;
};

const resolveRelativeTarget = async (rawTarget, currentFile) => {
  if (!rawTarget || /^(mailto:|tel:|data:|javascript:|https?:|\/\/)/i.test(rawTarget)) return null;

  const [pathPart, hashPart] = rawTarget.split("#");

  if (rawTarget.startsWith("#")) {
    return {
      filePath: currentFile,
      hash: rawTarget.slice(1)
    };
  }

  if (pathPart.startsWith("/")) {
    const absolute = path.join(publicDir, pathPart.replace(/^\/+/, ""));
    return {
      filePath: absolute,
      hash: hashPart || ""
    };
  }

  const currentDir = path.dirname(currentFile);
  return {
    filePath: path.resolve(currentDir, pathPart),
    hash: hashPart || ""
  };
};

const resolveFileCandidate = async (candidate) => {
  const variations = [candidate];

  if (!path.extname(candidate)) {
    variations.push(path.join(candidate, "index.html"));
    variations.push(`${candidate}.html`);
  }

  for (const variation of variations) {
    try {
      const stat = await fs.stat(variation);
      if (stat.isDirectory()) continue;
      return variation;
    } catch {
      continue;
    }
  }

  return "";
};

const main = async () => {
  const htmlFiles = await listPublicHtmlFiles();
  const issues = [];

  for (const htmlFile of htmlFiles) {
    const html = await fs.readFile(htmlFile, "utf8");

    for (const match of html.matchAll(linkPattern)) {
      const rawTarget = match[1].trim();
      const resolved = await resolveRelativeTarget(rawTarget, htmlFile);
      if (!resolved) continue;

      const targetFile = await resolveFileCandidate(resolved.filePath);
      if (!targetFile) {
        issues.push({
          file: path.relative(publicDir, htmlFile),
          target: rawTarget,
          reason: "missing target"
        });
        continue;
      }

      if (resolved.hash) {
        const ids = await collectIds(targetFile);
        if (!ids.has(resolved.hash)) {
          issues.push({
            file: path.relative(publicDir, htmlFile),
            target: rawTarget,
            reason: "missing anchor"
          });
        }
      }
    }
  }

  if (issues.length) {
    console.error("Broken links or anchors detected:");
    for (const issue of issues) {
      console.error(`- ${issue.file} -> ${issue.target} (${issue.reason})`);
    }
    process.exitCode = 1;
    return;
  }

  console.log(`Checked ${htmlFiles.length} HTML files: no broken links or anchors found.`);
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
