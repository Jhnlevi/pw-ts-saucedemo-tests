import { Locator, Page } from "@playwright/test";
import { CART_SELECTORS } from "./cart-selectors";
import { MenuComponent } from "@pages/components/menu-component";
import { HeaderComponent } from "@pages/components/header-component";

export class CartPage {
  private _page: Page;
  private _locators: Record<keyof typeof CART_SELECTORS, Locator>;
  public menu: MenuComponent;
  public header: HeaderComponent;

  constructor(page: Page) {
    this._page = page;
    this._locators = {
      CART_ITEM: this._page.locator("div.cart_item"),
      CART_ITEM_QUANTITY: this._page.locator("div.cart_quantity"),
      CART_ITEM_REMOVE_BUTTON: this._page.getByRole("button", {
        name: "Remove",
      }),
      CART_CHECKOUT_BUTTON: this._page.getByRole("button", {
        name: "Checkout",
      }),
      CART_CONTINUE_BUTTON: this._page.getByRole("button", {
        name: "Go back Continue Shopping",
      }),
    };
    this.menu = new MenuComponent(page);
    this.header = new HeaderComponent(page);
  }

  async clickItemByName(
    field: keyof typeof CART_SELECTORS,
    itemName: string
  ): Promise<void> {
    const item: Locator = this._locators[field].filter({ hasText: itemName });
    await item.getByRole("link", { name: itemName }).click();
  }

  async RemoveItemFromCart(
    field: keyof typeof CART_SELECTORS,
    itemName: string
  ): Promise<void> {
    const item: Locator = this._locators[field].filter({ hasText: itemName });
    await item.getByRole("button", { name: "Remove" }).click();
  }

  async click(field: keyof typeof CART_SELECTORS): Promise<void> {
    await this._locators[field].click();
  }

  async getText(field: keyof typeof CART_SELECTORS): Promise<string> {
    return await this._locators[field].innerText();
  }

  async getLocator(field: keyof typeof CART_SELECTORS): Promise<Locator> {
    return await this._locators[field];
  }
}
