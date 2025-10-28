import { LoginPage } from "@pages/login/login-page";
import { Page } from "@playwright/test";

export const performLogin = async (
  page: Page,
  username: string,
  password: string
): Promise<void> => {
  const _login = new LoginPage(page);
  await _login.enterText("LOGIN_USERNAME", username);
  await _login.enterText("LOGIN_PASSWORD", password);
  await _login.click("LOGIN_BUTTON");
};
