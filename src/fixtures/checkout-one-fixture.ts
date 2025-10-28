import { test as base } from "@fixtures/cart-fixture";
import { CheckoutTwoPage } from "@pages/checkout/checkout-two-page";

// loggedIn -> inventoryReady -> cartReady -> checkoutOneReady (You are here!)
export const test = base.extend<{ checkoutOneReady: CheckoutTwoPage }>({
  checkoutOneReady: async ({ cartReady }, use) => {
    // Performs the checkout step one process
    await cartReady.enterText("CHECKOUT_ONE_FNAME", "My First Name");
    await cartReady.enterText("CHECKOUT_ONE_LNAME", "My Last Name");
    await cartReady.enterText("CHECKOUT_ONE_ZIP", "111Zip");
    await cartReady.click("CHECKOUT_ONE_CONTINUE_BUTTON");

    // Returns the checkout step two page object
    await use(new CheckoutTwoPage(cartReady.page));
  },
});

// Exports expect from base fixture (logged-in fuxture)
export { expect } from "@fixtures/logged-in.fixture";
