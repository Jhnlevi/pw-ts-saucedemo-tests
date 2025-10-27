import { test as base } from "@fixtures/inventory-fixture";
import { CheckoutOnePage } from "@pages/checkout/checkout-one-page";

// loggedIn -> inventoryReady -> cartReady (You are here!)
export const test = base.extend<{ cartReady: CheckoutOnePage }>({
  cartReady: async ({ inventoryReady }, use) => {
    // Performs click action
    await inventoryReady.click("CART_CHECKOUT_BUTTON");
    await inventoryReady.page.waitForURL("**/checkout-step-one.html");

    // Returns the checkout step one page object
    const checkoutOne: CheckoutOnePage = new CheckoutOnePage(
      inventoryReady.page
    );
    await use(checkoutOne);
  },
});
