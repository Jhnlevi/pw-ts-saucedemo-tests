import test, { expect, Locator } from "@playwright/test";
import { LoginPage } from "../../src/pages/login/login-page";
import { LoginTestCase, negLoginCases, posLoginCases } from "../../src/data/login-data";

// Combine all test data from login-data.ts
const testData: LoginTestCase[] = [...posLoginCases, ...negLoginCases];

test.describe("Login Tests", () => {
    
    // Valid test cases (positive)
    testData.forEach(({description, username, password, type}) => {
        if(type === "positive"){
            test(`Login_${description}_ShouldSucceed`, async ({page}) => {
                const _login: LoginPage = new LoginPage(page);
                
                await page.goto("/");
                await _login.enterText("LOGIN_USERNAME", username);
                await _login.enterText("LOGIN_PASSWORD", password);
                await _login.click("LOGIN_BUTTON");

                const inventoryList: Locator = page.locator(".inventory_list");

                // Expects URL to contain the word 'inventory'.
                await expect(page).toHaveURL(/inventory/);
                await expect(inventoryList).toBeVisible();
            });
        }
    });

    // Valid test cases (negative)
    testData.forEach(({description, username, password, type, error}) => {
        if(type === "negative"){
            test(`Login_${description}_ShouldFail`, async ({page}) => {
                const _login: LoginPage = new LoginPage(page);
                
                await page.goto("/");
                await _login.enterText("LOGIN_USERNAME", username);
                await _login.enterText("LOGIN_PASSWORD", password);
                await _login.click("LOGIN_BUTTON");

                const errElement = await _login.isVisible("LOGIN_ERROR_MESSAGE");
                const errMessage = error?.message ?? "No error";

                await expect(errElement).toBeVisible({ timeout: 5000 });
                await expect(errElement).toContainText(errMessage);
            });
        }
    });
    
});