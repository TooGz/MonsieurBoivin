import { promises as fs } from "node:fs";
import path from "node:path";
import lighthouse from "lighthouse";
import { launch } from "chrome-launcher";
import {
  ensureDir,
  getAuditSampleRoutes,
  publicDir,
  repoRoot
} from "./utils/site-data.mjs";
import { startStaticServer } from "./utils/static-server.mjs";

const reportDir = path.join(repoRoot, "reports", "lighthouse");
const thresholds = {
  performance: 0.75,
  accessibility: 0.9,
  "best-practices": 0.85,
  seo: 0.9
};

const slugFromRoute = (route) =>
  route.replace(/^\/+|\/+$/g, "").replace(/[^\w/-]+/g, "-").replace(/\//g, "__") || "home";

const main = async () => {
  const routes = await getAuditSampleRoutes();
  const server = await startStaticServer({ rootDir: publicDir, port: 4173 });
  const chrome = await launch({
    chromeFlags: ["--headless=new", "--no-sandbox", "--disable-dev-shm-usage"]
  });

  await ensureDir(reportDir);
  const failures = [];

  try {
    for (const route of routes) {
      const absoluteUrl = new URL(route.route, `${server.url}/`).toString();
      const result = await lighthouse(absoluteUrl, {
        port: chrome.port,
        output: ["html", "json"],
        logLevel: "error",
        onlyCategories: Object.keys(thresholds)
      });

      const reportName = slugFromRoute(route.route);
      const [htmlReport, jsonReport] = result.report;
      await fs.writeFile(path.join(reportDir, `${reportName}.html`), htmlReport, "utf8");
      await fs.writeFile(path.join(reportDir, `${reportName}.json`), jsonReport, "utf8");

      for (const [category, minScore] of Object.entries(thresholds)) {
        const score = result.lhr.categories[category].score ?? 0;
        if (score < minScore) {
          failures.push(`${route.route} -> ${category} ${score.toFixed(2)} < ${minScore}`);
        }
      }
    }
  } finally {
    await chrome.kill();
    await server.close();
  }

  if (failures.length) {
    console.error("Lighthouse thresholds missed:");
    failures.forEach((failure) => console.error(`- ${failure}`));
    process.exitCode = 1;
    return;
  }

  console.log(`Lighthouse passed on ${routes.length} route(s). Reports written to ${reportDir}.`);
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
