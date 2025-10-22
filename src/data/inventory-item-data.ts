export interface InventoryItem {
  id: string;
  itemName: string;
  itemDesc: string;
  itemPrice: string;
}

export const inventoryItems: InventoryItem[] = [
  {
    id: "product_0001",
    itemName: "Sauce Labs Backpack",
    itemDesc:
      "carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.",
    itemPrice: "29.99",
  },
  {
    id: "product_0002",
    itemName: "Sauce Labs Bike Light",
    itemDesc:
      "A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.",
    itemPrice: "9.99",
  },
  {
    id: "product_0003",
    itemName: "Sauce Labs Bolt T-Shirt",
    itemDesc:
      "Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.",
    itemPrice: "15.99",
  },
  {
    id: "product_0004",
    itemName: "Sauce Labs Fleece Jacket",
    itemDesc:
      "It's not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office.",
    itemPrice: "49.99",
  },
];
