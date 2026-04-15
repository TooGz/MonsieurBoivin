import AxeBuilder from "@axe-core/playwright";
import { test, expect } from "@playwright/test";
import { getAuditSampleRoutes } from "../scripts/audit/utils/site-data.mjs";

const routes = await getAuditSampleRoutes();

for (const route of routes) {
  test(`axe has no serious issue on ${route.route}`, async ({ page }) => {
    await page.goto(route.route);

    const results = await new AxeBuilder({ page }).analyze();
    const blockingViolations = results.violations.filter((violation) =>
      ["serious", "critical"].includes(violation.impact || "")
    );

    expect(blockingViolations, JSON.stringify(blockingViolations, null, 2)).toEqual([]);
  });
}
