import { LoginPage } from "@pages/login/login-page";

export const performLogin = async (
  _login: LoginPage,
  username: string,
  password: string
): Promise<void> => {
  await _login.enterText("LOGIN_USERNAME", username);
  await _login.enterText("LOGIN_PASSWORD", password);
  await _login.click("LOGIN_BUTTON");
};
