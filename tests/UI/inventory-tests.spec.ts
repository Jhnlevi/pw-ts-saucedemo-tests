import { InventoryItem, inventoryItems } from "@data/inventory-item-data";
import { InventorySorter, inventorySorters } from "@data/inventory-sort-data";
import { test, expect } from "@fixtures/auth-fixture";
import { sortItems } from "@helpers/inventory-helper";
import { InventoryPage } from "@pages/inventory/inventory-page";
import { Page } from "@playwright/test";

const items: InventoryItem[] = [...inventoryItems];
const sorters: InventorySorter[] = [...inventorySorters];
const itemsToAdd: InventoryItem[] = items.slice(0, 3);
const itemsToRemove: InventoryItem[] = items.slice(0, 2);

test.describe("Inventory tests", () => {
  // Sort tests
  sorters.forEach(({ sortName, sortValue }) => {
    test(`[Inventory] sort using ${sortName}, should succeed`, async ({
      loggedIn,
    }) => {
      const page: Page = loggedIn;
      const _inventory: InventoryPage = new InventoryPage(page);
      let isSorted: boolean = false;

      await _inventory.selectItemByValue("INVENTORY_ITEM_SORTER", sortValue);

      // Get new order
      const newOrder: string[] = await (
        await _inventory.isVisible("INVENTORY_ITEM_NAME")
      ).allTextContents();
      const newPrices: string[] = await (
        await _inventory.isVisible("INVENTORY_ITEM_PRICE")
      ).allTextContents();

      // Helper function for switch logic
      isSorted = sortItems(sortValue, newOrder, newPrices);

      await expect(isSorted).toBeTruthy();
    });
  });

  // Adding three (3) items to cart test
  itemsToAdd.forEach(({ itemName }) => {
    test(`[@UI][Inventory] add item ${itemName}, should succeed`, async ({
      loggedIn,
    }) => {
      const page: Page = loggedIn;
      const _inventory: InventoryPage = new InventoryPage(page);

      let count: number = 0;

      await _inventory.clickAddItemToCart("INVENTORY_ITEM", itemName);
      count++;

      const badgeCounter: string =
        await _inventory.header.getText("HEADER_CART_BADGE");

      await expect(badgeCounter).toBe(count.toString());
    });
  });

  // Removing two (2) items from the cart test
  test(`[Inventory] removing two (2) items from the cart, should succeed`, async ({
    loggedIn,
  }) => {
    const page: Page = loggedIn;
    const _inventory: InventoryPage = new InventoryPage(page);
    let count: number = 0;

    // Add all items to the cart
    for (const item of items) {
      await _inventory.clickAddItemToCart("INVENTORY_ITEM", item.itemName);
      count++;
    }

    // Remove two (2) items
    for (const item of itemsToRemove) {
      await _inventory.clickRemoveItemFromCart("INVENTORY_ITEM", item.itemName);
      count--;
    }

    const badgeCounter: string =
      await _inventory.header.getText("HEADER_CART_BADGE");

    await expect(badgeCounter).toBe(count.toString());
  });
});
