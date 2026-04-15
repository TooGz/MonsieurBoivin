import { test, expect } from "@playwright/test";
import { getAuditSampleRoutes } from "../scripts/audit/utils/site-data.mjs";

const routes = await getAuditSampleRoutes();

for (const route of routes) {
  test(`${route.route} exposes the main landmarks`, async ({ page }) => {
    await page.goto(route.route);

    await expect(page.locator("main")).toBeVisible();
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("title")).not.toHaveCount(0);
  });
}

test("home exposes manual theme toggle", async ({ page }) => {
  await page.goto("/");
  const themeToggle = page.locator("[data-theme-toggle]").first();
  await expect(themeToggle).toBeVisible();
  await themeToggle.click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", /dark|light/);
});
