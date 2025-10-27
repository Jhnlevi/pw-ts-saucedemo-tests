import { Locator, Page } from "@playwright/test";
import { CHECKOUT_ONE_SELECTORS } from "./checkout-one-selectors";
import { MenuComponent } from "@pages/components/menu-component";
import { HeaderComponent } from "@pages/components/header-component";

export class CheckoutOnePage {
  private _page: Page;
  private _locators: Record<keyof typeof CHECKOUT_ONE_SELECTORS, Locator>;
  public menu: MenuComponent;
  public header: HeaderComponent;

  constructor(public readonly page: Page) {
    this._page = page;
    this._locators = {
      CHECKOUT_ONE_FNAME: this._page.getByPlaceholder("First Name"),
      CHECKOUT_ONE_LNAME: this._page.getByPlaceholder("Last Name"),
      CHECKOUT_ONE_ZIP: this._page.getByPlaceholder("Zip/Postal Code"),
      CHECKOUT_ONE_CANCEL_BUTTON: this._page.getByRole("button", {
        name: "Go back Cancel",
      }),
      CHECKOUT_ONE_CONTINUE_BUTTON: this._page.getByRole("button", {
        name: "Continue",
      }),
      CHECKOUT_ONE_ERROR_CONTAINER: this._page.locator(
        "div.error-message-container",
      ),
      CHECKOUT_ONE_ERROR_MESSAGE: this._page.locator('[data-test="error"]'),
    };
    this.menu = new MenuComponent(page);
    this.header = new HeaderComponent(page);
  }

  async enterText(
    field: keyof typeof CHECKOUT_ONE_SELECTORS,
    text: string,
  ): Promise<void> {
    await this._locators[field].fill(text);
  }

  async click(field: keyof typeof CHECKOUT_ONE_SELECTORS): Promise<void> {
    await this._locators[field].click();
  }

  async getText(field: keyof typeof CHECKOUT_ONE_SELECTORS): Promise<string> {
    return await this._locators[field].innerText();
  }

  async getLocator(
    field: keyof typeof CHECKOUT_ONE_SELECTORS,
  ): Promise<Locator> {
    return await this._locators[field];
  }
}
