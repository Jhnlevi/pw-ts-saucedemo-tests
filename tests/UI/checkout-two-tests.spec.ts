import { test, expect } from "@fixtures/checkout-one-fixture";
import { CheckoutTwoPage } from "@pages/checkout/checkout-two-page";
import { Locator } from "@playwright/test";

test.describe(`Checkout Step Two Tests`, () => {
  test(`[@UI][Checkout - Two] Complete checkout process, should succeed`, async ({
    checkoutOneReady,
  }) => {
    const checkoutTwo: CheckoutTwoPage = checkoutOneReady;
    const cartList: Locator = await checkoutTwo.getLocator("CHECKOUT_TWO_LIST");
    const summaryInfo: Locator = await checkoutTwo.getLocator(
      "CHECKOUT_TWO_SUMMARY_INFO"
    );
    const headerBadge: Locator =
      await checkoutTwo.header.isVisible("HEADER_CART_BADGE");

    await expect(cartList).toBeVisible();
    await expect(summaryInfo).toBeVisible();

    await checkoutTwo.click("CHECKOUT_TWO_FINISH_BUTTON");

    const checkoutCompleteContainer: Locator = checkoutTwo.page.locator(
      "#checkout_complete_container"
    );

    await expect(checkoutTwo.page).toHaveURL(/checkout-complete/);
    await expect(headerBadge).toBeHidden();
    await expect(checkoutCompleteContainer).toBeVisible();
  });

  test(`[Checkout - Two] Cancel checkout, should succeed`, async ({
    checkoutOneReady,
  }) => {
    const checkoutTwo: CheckoutTwoPage = checkoutOneReady;
    const cartList: Locator = await checkoutTwo.getLocator("CHECKOUT_TWO_LIST");
    const summaryInfo: Locator = await checkoutTwo.getLocator(
      "CHECKOUT_TWO_SUMMARY_INFO"
    );

    await expect(cartList).toBeVisible();
    await expect(summaryInfo).toBeVisible();

    await checkoutTwo.click("CHECKOUT_TWO_CANCEL_BUTTON");

    const inventoryList: Locator =
      checkoutTwo.page.locator("div.inventory_list");

    await expect(checkoutTwo.page).toHaveURL(/inventory/);
    await expect(inventoryList).toBeVisible();
  });
});
