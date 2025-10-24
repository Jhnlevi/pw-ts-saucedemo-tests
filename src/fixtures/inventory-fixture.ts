import { test as base } from "./auth-fixture";
import { InventoryPage } from "@pages/inventory/inventory-page";
import { addItems } from "@helpers/inventory-helper";
import { InventoryItem, inventoryItems } from "@data/inventory-item-data";
import { CartPage } from "@pages/cart/cart-page";

const items: InventoryItem[] = [...inventoryItems];

export const test = base.extend<{ inventoryFixture: CartPage }>({
  inventoryFixture: async ({ loggedIn }, use) => {
    const inventory = new InventoryPage(loggedIn);

    // Add items to the cart
    await addItems(inventory, items);

    // Takes the user to the cart page
    await inventory.header.click("HEADER_CART_BUTTON");
    await loggedIn.waitForURL("**/cart.html");

    const cartPage = new CartPage(loggedIn);

    await use(cartPage);
  },
});
