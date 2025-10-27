import { test as base } from "./logged-in.fixture";
import { InventoryPage } from "@pages/inventory/inventory-page";
import { addItems } from "@helpers/inventory-helper";
import { InventoryItem, inventoryItems } from "@data/inventory-item-data";
import { CartPage } from "@pages/cart/cart-page";

const items: InventoryItem[] = [...inventoryItems];

// loggedIn -> inventoryReady (You are here!)
export const test = base.extend<{ inventoryReady: CartPage }>({
  inventoryReady: async ({ loggedIn }, use) => {
    // Initializes the inventory page because the previous fixture (loggedIn) returns page.
    const inventory = new InventoryPage(loggedIn);

    // Add items to the cart
    await addItems(inventory, items);

    // Takes the user to the cart page
    await inventory.header.click("HEADER_CART_BUTTON");
    await loggedIn.waitForURL("**/cart.html");

    // Returns the cart page object
    const cartPage = new CartPage(loggedIn);
    await use(cartPage);
  },
});
