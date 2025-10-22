import { Locator, Page } from "@playwright/test";
import { MENU_SELECTORS } from "./menu-selectors";

export class MenuComponent {
  private _page: Page;
  private _locators: Record<keyof typeof MENU_SELECTORS, Locator>;
  constructor(page: Page) {
    this._page = page;
    this._locators = {
      MENU_CONTAINER: this._page.locator("div.bm-menu"),
      MENU_BUTTON_CLOSE: this._page.getByRole("button", { name: "Close Menu" }),
      MENU_LINK_ALL_ITEMS: this._page.getByRole("link", { name: "All Items" }),
      MENU_LINK_ABOUT: this._page.getByRole("link", { name: "About" }),
      MENU_LINK_LOGOUT: this._page.getByRole("link", { name: "Logout" }),
      MENU_LINK_RESET_STATE: this._page.getByRole("link", {
        name: "Reset App State",
      }),
    };
  }
  async click(field: keyof typeof MENU_SELECTORS): Promise<void> {
    await this._locators[field].click();
  }

  async getText(field: keyof typeof MENU_SELECTORS): Promise<string> {
    return await this._locators[field].innerText();
  }

  async isVisible(field: keyof typeof MENU_SELECTORS): Promise<Locator> {
    return await this._locators[field];
  }
}
