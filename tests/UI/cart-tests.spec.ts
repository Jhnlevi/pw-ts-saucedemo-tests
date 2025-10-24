import { test } from "@fixtures/inventory-ready.fixture";
import { CartPage } from "@pages/cart/cart-page";
import { expect, Locator } from "@playwright/test";

test.describe("Cart tests", () => {
  test(`[Cart] Remove items from the cart, should succeed`, async ({
    inventoryReady,
  }) => {
    const cart: CartPage = inventoryReady;

    await cart.RemoveItemFromCart("CART_ITEM", "Sauce Labs Backpack");

    const item = (await cart.getLocator("CART_ITEM")).filter({
      hasText: "Sauce Labs Backpack",
    });

    await expect(item).toHaveCount(0);
  });

  test(`[@UI][Cart] Navigate to checkout, should succeed`, async ({
    inventoryReady,
    page,
  }) => {
    const cart: CartPage = inventoryReady;
    await cart.click("CART_CHECKOUT_BUTTON");

    const checkoutInfo: Locator = page.locator("div.checkout_info");

    await expect(page).toHaveURL(/checkout-step-one/);
    await expect(checkoutInfo).toBeVisible();
  });

  test(`[Cart] Navigate to back to inventory page, should succeed`, async ({
    inventoryReady,
    page,
  }) => {
    const cart: CartPage = inventoryReady;
    await cart.click("CART_CONTINUE_BUTTON");

    const inventoryList: Locator = page.locator("div.inventory_list");

    await expect(page).toHaveURL(/inventory/);
    await expect(inventoryList).toBeVisible();
  });
});
