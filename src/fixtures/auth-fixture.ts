import { performLogin } from "@helpers/login-helper";
import { LoginPage } from "@pages/login/login-page";
import { test as base, Page } from "@playwright/test";

interface Fixtures {
  loggedIn: Page;
}

export const test = base.extend<Fixtures>({
  loggedIn: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await performLogin(loginPage, "standard_user", "secret_sauce");
    await use(page);
  },
});
