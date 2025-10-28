import { test as base } from "./logged-in.fixture";
import { addItems } from "@helpers/inventory-helper";
import { InventoryItem, inventoryItems } from "@data/inventory-item-data";
import { CartPage } from "@pages/cart/cart-page";

const items: InventoryItem[] = [...inventoryItems];

// loggedIn -> inventoryReady (You are here!)
export const test = base.extend<{ inventoryReady: CartPage }>({
  inventoryReady: async ({ loggedIn }, use) => {
    // Add items to the cart and takes the user to the cart page
    await addItems(loggedIn, items);

    await loggedIn.header.click("HEADER_CART_BUTTON");
    await loggedIn.page.waitForURL("**/cart.html");

    // Returns the cart page object
    await use(new CartPage(loggedIn.page));
  },
});

// Exports expect from base fixture (logged-in fuxture)
export { expect } from "@fixtures/logged-in.fixture";
