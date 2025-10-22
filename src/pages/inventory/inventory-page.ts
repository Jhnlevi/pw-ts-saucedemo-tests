import { Locator, Page } from "@playwright/test";
import { INVENTORY_SELECTORS } from "./inventory-selectors";
import { MenuComponent } from "@pages/components/menu-component";
import { HeaderComponent } from "@pages/components/header-component";

export class InventoryPage {
  private _page: Page;
  private _locators: Record<keyof typeof INVENTORY_SELECTORS, Locator>;
  public menu: MenuComponent;
  public header: HeaderComponent;

  constructor(page: Page) {
    this._page = page;
    this._locators = {
      INVENTORY_LIST: this._page.locator("div.inventory_list"),
      INVENTORY_ITEM: this._page.locator("div.inventory_item"),
      INVENTORY_ITEM_NAME: this._page.locator("div.inventory_item_name "),
      INVENTORY_ITEM_DESC: this._page.locator("div.inventory_item_desc"),
      INVENTORY_ITEM_PRICE: this._page.locator("div.inventory_item_price"),
      INVENTORY_ITEM_SORTER: this._page.locator(
        "select.product_sort_container"
      ),
      INVENTORY_ADD_TO_CART: this._page.getByRole("button", {
        name: "Add to cart",
      }),
      INVENTORY_REMOVE_TO_CART: this._page.getByRole("button", {
        name: "Remove",
      }),
    };
    this.menu = new MenuComponent(page);
    this.header = new HeaderComponent(page);
  }

  async clickItemByName(
    field: keyof typeof INVENTORY_SELECTORS,
    itemName: string
  ): Promise<void> {
    const item: Locator = await this._locators[field].filter({
      hasText: itemName,
    });
    await item.getByRole("link", { name: itemName }).click();
  }

  async clickAddItemToCart(
    field: keyof typeof INVENTORY_SELECTORS,
    itemName: string
  ): Promise<void> {
    const item: Locator = await this._locators[field].filter({
      hasText: itemName,
    });
    await item.getByRole("button", { name: "Add to cart" }).click();
  }

  async clickRemoveItemFromCart(
    field: keyof typeof INVENTORY_SELECTORS,
    itemName: string
  ): Promise<void> {
    const item: Locator = await this._locators[field].filter({
      hasText: itemName,
    });
    await item.getByRole("button", { name: "Remove" }).click();
  }

  async selectItemByValue(
    field: keyof typeof INVENTORY_SELECTORS,
    value: string
  ): Promise<Array<string>> {
    return await this._locators[field].selectOption({ value: value });
  }

  async getText(
    field: keyof typeof INVENTORY_SELECTORS,
    itemName: string
  ): Promise<string> {
    return await this._locators[field]
      .filter({ hasText: itemName })
      .innerText();
  }

  async isVisible(field: keyof typeof INVENTORY_SELECTORS): Promise<Locator> {
    return await this._locators[field];
  }
}
