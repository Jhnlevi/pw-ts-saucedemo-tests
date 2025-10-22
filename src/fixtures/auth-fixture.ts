import { performLogin } from "@helpers/login-helper";
import { LoginPage } from "@pages/login/login-page";
import { test as base, expect, Page } from "@playwright/test";

export const test = base.extend<{ loggedIn: Page }>({
  loggedIn: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await page.goto("/");
    await performLogin(loginPage, "standard_user", "secret_sauce");
    await page.waitForURL("**/inventory.html");
    await use(page);
  },
});

export { expect };
