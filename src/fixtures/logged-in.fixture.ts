import { performLogin } from "@helpers/login-helper";
import { InventoryPage } from "@pages/inventory/inventory-page";
import { test as base } from "@playwright/test";

// loggedIn (Base fixture; You are here!)
export const test = base.extend<{ loggedIn: InventoryPage }>({
  loggedIn: async ({ page }, use) => {
    // Navigates to index page and performs login action
    await page.goto("/");
    await performLogin(page, "standard_user", "secret_sauce");
    await page.waitForURL("**/inventory.html");

    // Returns the inventory page object
    await use(new InventoryPage(page));
  },
});

// Exports expect of Playwright/test
export { expect } from "@playwright/test";
