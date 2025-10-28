import { HeaderComponent } from "@pages/components/header-component";
import { MenuComponent } from "@pages/components/menu-component";
import { Page, Locator } from "@playwright/test";
import { CHECKOUT_THREE_SELECTORS } from "./checkout-three-selectors";

export class CheckoutThreePage {
  private _page: Page;
  private _locators: Record<keyof typeof CHECKOUT_THREE_SELECTORS, Locator>;
  public menu: MenuComponent;
  public header: HeaderComponent;

  constructor(public readonly page: Page) {
    this._page = page;
    this._locators = {
      CHECKOUT_THREE_COMPLETE_CONTAINER: this._page.locator(
        "#checkout_complete_container",
      ),
    };
    this.menu = new MenuComponent(page);
    this.header = new HeaderComponent(page);
  }

  async click(field: keyof typeof CHECKOUT_THREE_SELECTORS): Promise<void> {
    await this._locators[field].click();
  }

  async getText(field: keyof typeof CHECKOUT_THREE_SELECTORS): Promise<string> {
    return await this._locators[field].innerText();
  }

  async getLocator(
    field: keyof typeof CHECKOUT_THREE_SELECTORS,
  ): Promise<Locator> {
    return await this._locators[field];
  }
}
