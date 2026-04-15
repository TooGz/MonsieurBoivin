import { promises as fs } from "node:fs";
import path from "node:path";
import {
  buildSiteInventory,
  docsDir,
  ensureDir,
  reportsDir
} from "../audit/utils/site-data.mjs";

const writeMarkdownReport = (inventory) => {
  const pageTypeRows = inventory.pageTypes
    .map((entry) => `| ${entry.pageType} | ${entry.count} |`)
    .join("\n");

  const componentRows = inventory.components
    .map((component) => `| ${component.id} | ${component.role} | \`${component.source}\` |`)
    .join("\n");

  const debtRows = inventory.debts
    .map((debt) => `- \`${debt.level}\` ${debt.area} : ${debt.summary} ${debt.impact}`)
    .join("\n");

  const sampleRows = inventory.sampleRoutes
    .map((route) => `- ${route.route} | ${route.pageType} | ${route.label}`)
    .join("\n");

  return `# Site Inventory

## Stack

- Generateur : ${inventory.stack.generator}
- Theme : ${inventory.stack.theme}
- Routage : ${inventory.stack.routing}
- CSS : ${inventory.stack.css.join(", ")}
- JS : ${inventory.stack.javascript.join(", ")}
- CI : ${inventory.stack.ci.join(", ")}

## Types de pages

| Type | Count |
| --- | ---: |
${pageTypeRows}

## Composants communs

| ID | Role | Source |
| --- | --- | --- |
${componentRows}

## URLs de controle rapide

${sampleRows}

## Dettes detectees

${debtRows}
`;
};

const main = async () => {
  const inventory = await buildSiteInventory();

  await ensureDir(docsDir);
  await ensureDir(reportsDir);

  await fs.writeFile(
    path.join(reportsDir, "site-inventory.json"),
    `${JSON.stringify(inventory, null, 2)}\n`,
    "utf8"
  );
  await fs.writeFile(path.join(docsDir, "site-inventory.md"), writeMarkdownReport(inventory), "utf8");

  console.log(`Inventory generated with ${inventory.pages.length} source pages and ${inventory.pageTypes.length} page types.`);
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
