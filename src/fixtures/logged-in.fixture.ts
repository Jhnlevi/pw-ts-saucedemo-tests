import { performLogin } from "@helpers/login-helper";
import { LoginPage } from "@pages/login/login-page";
import { test as base, expect, Page } from "@playwright/test";

// loggedIn (Base fixture; You are here!)
export const test = base.extend<{ loggedIn: Page }>({
  loggedIn: async ({ page }, use) => {
    // Initializes the loginPage
    const loginPage = new LoginPage(page);

    // Navigates to index page and performs login action
    await page.goto("/");
    await performLogin(loginPage, "standard_user", "secret_sauce");
    await page.waitForURL("**/inventory.html");

    // Returns playwright page
    await use(page);
  },
});

// Exports expect of Playwright/test
export { expect };
