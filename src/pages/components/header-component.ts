import { Locator, Page } from "@playwright/test";
import { HEADER_SELECTORS } from "./header-selectors";

export class HeaderComponent {
  private _page: Page;
  private _locators: Record<keyof typeof HEADER_SELECTORS, Locator>;

  constructor(page: Page) {
    this._page = page;
    this._locators = {
      HEADER_MENU_BUTTON: this._page.getByRole("button", { name: "Open Menu" }),
      HEADER_CART_BUTTON: this._page.locator(
        '[data-test="shopping-cart-link"]',
      ),
      HEADER_CART_BADGE: this._page.locator(
        '[data-test="shopping-cart-badge"]',
      ),
    };
  }

  async click(field: keyof typeof HEADER_SELECTORS): Promise<void> {
    await this._locators[field].click();
  }

  async getText(field: keyof typeof HEADER_SELECTORS): Promise<string> {
    return await this._locators[field].innerText();
  }

  async isVisible(field: keyof typeof HEADER_SELECTORS): Promise<Locator> {
    return await this._locators[field];
  }
}
