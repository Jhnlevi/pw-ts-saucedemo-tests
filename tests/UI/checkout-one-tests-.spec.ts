import {
  CheckoutOneTestCase,
  negCheckoutOne,
  posCheckoutOne,
} from "@data/checkout-one-data";
import { test, expect } from "@fixtures/cart-fixture";
import { CheckoutOnePage } from "@pages/checkout/checkout-one-page";
import { Locator } from "@playwright/test";

// Test data
const testData: CheckoutOneTestCase[] = [...posCheckoutOne, ...negCheckoutOne];

test.describe(`Checkout Step One Tests`, () => {
  // Positive
  testData.forEach((item) => {
    if (item.type === "positive") {
      test(`[@UI][Checkout - One] ${item.description}, should succeed`, async ({
        cartReady,
      }) => {
        const checkout: CheckoutOnePage = cartReady;

        await checkout.enterText("CHECKOUT_ONE_FNAME", item.data.firstName);
        await checkout.enterText("CHECKOUT_ONE_LNAME", item.data.lastName);
        await checkout.enterText("CHECKOUT_ONE_ZIP", item.data.zipCode);
        await checkout.click("CHECKOUT_ONE_CONTINUE_BUTTON");

        const checkoutSummary: Locator = checkout.page.locator(
          "#checkout_summary_container"
        );

        // Expects URL to contain the word 'inventory'.
        await expect(checkout.page).toHaveURL(/checkout-step-two/);
        await expect(checkoutSummary).toBeVisible();
      });
    }
  });

  // Negative
  testData.forEach((item) => {
    if (item.type === "negative") {
      test(`[Checkout - One] ${item.description}, should fail`, async ({
        cartReady,
      }) => {
        const checkout: CheckoutOnePage = cartReady;

        await checkout.enterText("CHECKOUT_ONE_FNAME", item.data.firstName);
        await checkout.enterText("CHECKOUT_ONE_LNAME", item.data.lastName);
        await checkout.enterText("CHECKOUT_ONE_ZIP", item.data.zipCode);
        await checkout.click("CHECKOUT_ONE_CONTINUE_BUTTON");

        const errorContainer: Locator = await checkout.getLocator(
          "CHECKOUT_ONE_ERROR_CONTAINER"
        );

        await expect(errorContainer).toBeVisible();
      });
    }
  });

  test(`[Checkout - One] Cancel checkout step one process, should succeed.`, async ({
    cartReady,
  }) => {
    const checkout: CheckoutOnePage = cartReady;

    await checkout.click("CHECKOUT_ONE_CANCEL_BUTTON");

    const cartContainer: Locator = checkout.page.locator(
      "#cart_contents_container"
    );

    // Expects URL to contain the word 'inventory'.
    await expect(checkout.page).toHaveURL(/cart/);
    await expect(cartContainer).toBeVisible();
  });
});
