import { InventoryItem, inventoryItems } from "@data/inventory-item-data";
import { InventorySorter, inventorySorters } from "@data/inventory-sort-data";
import { test, expect } from "@fixtures/auth-fixture";
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

      switch (sortValue) {
        case "az": {
          isSorted =
            JSON.stringify(newOrder) ===
            JSON.stringify([...newOrder].sort((a, b) => a.localeCompare(b)));
          break;
        }
        case "za": {
          isSorted =
            JSON.stringify(newOrder) ===
            JSON.stringify([...newOrder].sort((a, b) => b.localeCompare(a)));
          break;
        }
        case "lohi": {
          const pricesLoHi = newPrices.map((p) =>
            parseFloat(p.replace("$", ""))
          );
          isSorted =
            JSON.stringify(pricesLoHi) ===
            JSON.stringify([...pricesLoHi].sort((a, b) => a - b));
          break;
        }
        case "hilo": {
          const pricesHiLo = newPrices.map((p) =>
            parseFloat(p.replace("$", ""))
          );
          isSorted =
            JSON.stringify(pricesHiLo) ===
            JSON.stringify([...pricesHiLo].sort((a, b) => b - a));
          break;
        }
        default:
          break;
      }

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
