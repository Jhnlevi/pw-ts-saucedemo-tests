import test, { expect, Locator } from "@playwright/test";
import { LoginPage } from "@pages/login/login-page";
import { LoginTestCase, negLoginCases, posLoginCases } from "@data/login-data";
import { performLogin } from "@helpers/login-helper";

// Combine all test data from login-data.ts
const testData: LoginTestCase[] = [...posLoginCases, ...negLoginCases];

test.describe("Login Tests", () => {
  // Valid test cases (positive)
  testData.forEach(({ description, username, password, type }) => {
    if (type === "positive") {
      test(`[Login] ${description} should succeed`, async ({ page }) => {
        const _login: LoginPage = new LoginPage(page);

        await page.goto("/");
        await performLogin(_login, username, password);

        const inventoryList: Locator = page.locator(".inventory_list");

        // Expects URL to contain the word 'inventory'.
        await expect(page).toHaveURL(/inventory/);
        await expect(inventoryList).toBeVisible();
      });
    }
  });

  // For CI: Verify login as standard user
  testData.forEach(({ description, username, password, type }) => {
    if (username === "standard_user" && type === "positive") {
      test(`[@UI][Login] ${description} should succeed`, async ({ page }) => {
        const _login: LoginPage = new LoginPage(page);

        await page.goto("/");
        await performLogin(_login, username, password);

        const inventoryList: Locator = page.locator(".inventory_list");

        // Expects URL to contain the word 'inventory'.
        await expect(page).toHaveURL(/inventory/);
        await expect(inventoryList).toBeVisible();
      });
    }
  });

  // Valid test cases (negative)
  testData.forEach(({ description, username, password, type, error }) => {
    if (type === "negative") {
      test(`[Login] ${description} should fail`, async ({ page }) => {
        const _login: LoginPage = new LoginPage(page);

        await page.goto("/");
        await performLogin(_login, username, password);

        const errElement = await _login.isVisible("LOGIN_ERROR_MESSAGE");
        const errMessage = error?.message ?? "No error";

        await expect(errElement).toBeVisible({ timeout: 5000 });
        await expect(errElement).toContainText(errMessage);
      });
    }
  });
});
