/* global document */
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

// Le bouton de thème est #appearance-switcher (bureau) / #appearance-switcher-mobile ;
// le thème appliqué se lit sur la classe « dark » de <html>.
test("home exposes a working theme toggle", async ({ page }) => {
  await page.goto("/");
  const toggle = page
    .locator("#appearance-switcher:visible, #appearance-switcher-mobile:visible")
    .first();
  await expect(toggle).toBeVisible();
  const wasDark = await page.evaluate(() => document.documentElement.classList.contains("dark"));
  await toggle.click();
  await expect
    .poll(() => page.evaluate(() => document.documentElement.classList.contains("dark")))
    .toBe(!wasDark);
});

test("mobile menu is a modal dialog closed by Escape", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 });
  await page.goto("/");
  await page.locator("#menu-button").click();
  await expect(page.locator("#menu-wrapper")).toHaveAttribute("open", "");
  await page.keyboard.press("Escape");
  await expect(page.locator("#menu-wrapper")).not.toHaveAttribute("open", "");
  await expect(page.locator("#menu-button")).toBeFocused();
});
