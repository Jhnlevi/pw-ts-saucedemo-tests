import { Locator, Page } from "@playwright/test";
import { LOGIN_SELECTORS } from "./login-selectors";

export class LoginPage {
    private _page: Page;
    private _locators: Record<keyof typeof LOGIN_SELECTORS, Locator>;

    constructor(page: Page) {
        this._page = page;
        this._locators = {
            LOGIN_USERNAME: page.getByPlaceholder("Username"),
            LOGIN_PASSWORD: page.getByPlaceholder("Password"),
            LOGIN_BUTTON: page.getByRole("button", { name: "Login"}),
            LOGIN_ERROR_MESSAGE: page.locator(".error")
        };
    }

    async enterText(field: keyof typeof LOGIN_SELECTORS, text: string): Promise<void>{
        await this._locators[field].fill(text);
    }

    async click(field: keyof typeof LOGIN_SELECTORS): Promise<void> {
        await this._locators[field].click();
    }

    async getText(field: keyof typeof LOGIN_SELECTORS): Promise<string> {
        return await this._locators[field].innerText();
    }

    async isVisible(field: keyof typeof LOGIN_SELECTORS): Promise<Locator> {
        return await this._locators[field];
    }
}