import { Locator, Page } from "@playwright/test";
import { CHECKOUT_TWO_SELECTORS } from "./checkout-two-selectors";
import { HeaderComponent } from "@pages/components/header-component";
import { MenuComponent } from "@pages/components/menu-component";

export class CheckoutTwoPage {
  private _page: Page;
  private _locators: Record<keyof typeof CHECKOUT_TWO_SELECTORS, Locator>;
  public menu: MenuComponent;
  public header: HeaderComponent;

  constructor(public readonly page: Page) {
    this._page = page;
    this._locators = {
      CHECKOUT_TWO_LIST: this._page.locator("div.cart_list"),
      CHECKOUT_TWO_SUMMARY_INFO: this._page.locator("div.summary_info"),
      CHECKOUT_TWO_CANCEL_BUTTON: this._page.getByRole("button", {
        name: "Go back Cancel",
      }),
      CHECKOUT_TWO_FINISH_BUTTON: this._page.getByRole("button", {
        name: "Finish",
      }),
    };
    this.menu = new MenuComponent(page);
    this.header = new HeaderComponent(page);
  }

  async click(field: keyof typeof CHECKOUT_TWO_SELECTORS): Promise<void> {
    await this._locators[field].click();
  }

  async getText(field: keyof typeof CHECKOUT_TWO_SELECTORS): Promise<string> {
    return await this._locators[field].innerText();
  }

  async getLocator(
    field: keyof typeof CHECKOUT_TWO_SELECTORS,
  ): Promise<Locator> {
    return await this._locators[field];
  }
}
