import { defineConfig, devices } from "@playwright/test";
import path from "path";

const timeStamp = new Date().toISOString().replace(/T/, '_').replace(/:/g, '-').replace(/\..+/, ''); 

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [["html", { outputFolder: path.join("tests-results/reports", `Report_${timeStamp}`), title: "SauceDemo Test Report" }]],
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: "https://www.saucedemo.com/",
    // Capture screenshot after each test failure.
    screenshot: 'only-on-failure',
    // Record trace only when retrying a test for the first time.
    trace: 'on-first-retry',
  },
  outputDir: "tests-results/artifacts",
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },

    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },

    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],
});
