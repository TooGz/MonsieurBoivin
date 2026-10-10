import path from "node:path";
import { promises as fs } from "node:fs";
import { listPublicHtmlFiles, publicDir } from "./utils/site-data.mjs";
import { collectIds, collectLinkTargets } from "./utils/html.mjs";

const idsCache = new Map();

const getIds = async (filePath) => {
  if (!idsCache.has(filePath)) {
    idsCache.set(filePath, collectIds(await fs.readFile(filePath, "utf8")));
  }
  return idsCache.get(filePath);
};

const resolveRelativeTarget = (rawTarget, currentFile) => {
  if (!rawTarget || /^(mailto:|tel:|data:|javascript:|blob:|https?:|\/\/)/i.test(rawTarget))
    return null;

  const [pathAndQuery, hashPart = ""] = rawTarget.split("#");
  const pathPart = decodeURIComponent(pathAndQuery.split("?")[0]);

  if (!pathPart) {
    return { filePath: currentFile, hash: hashPart };
  }

  if (pathPart.startsWith("/")) {
    return { filePath: path.join(publicDir, pathPart.replace(/^\/+/, "")), hash: hashPart };
  }

  return { filePath: path.resolve(path.dirname(currentFile), pathPart), hash: hashPart };
};

// Un dossier peut contenir un point (/series/grenouille-3.0/) : on teste toujours aussi index.html
const resolveFileCandidate = async (candidate) => {
  const variations = [candidate, path.join(candidate, "index.html"), `${candidate}.html`];

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

    for (const rawTarget of collectLinkTargets(html)) {
      const resolved = resolveRelativeTarget(rawTarget, htmlFile);
      if (!resolved) continue;

      const targetFile = await resolveFileCandidate(resolved.filePath);
      if (!targetFile) {
        issues.push({
          file: path.relative(publicDir, htmlFile),
          target: rawTarget,
          reason: "missing target",
        });
        continue;
      }

      if (resolved.hash && targetFile.endsWith(".html")) {
        const ids = await getIds(targetFile);
        if (!ids.has(decodeURIComponent(resolved.hash))) {
          issues.push({
            file: path.relative(publicDir, htmlFile),
            target: rawTarget,
            reason: "missing anchor",
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
