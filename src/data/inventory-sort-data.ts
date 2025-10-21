export interface InventorySorter {
  id: string;
  sortName: string;
  sortValue: string;
}

export const inventorySorters: InventorySorter[] = [
  {
    id: "sort_0001",
    sortName: "Name (A to Z)",
    sortValue: "az",
  },
  {
    id: "sort_0002",
    sortName: "Name (Z to A)",
    sortValue: "za",
  },
  {
    id: "sort_0003",
    sortName: "Price (low to high)",
    sortValue: "lohi",
  },
  {
    id: "sort_0004",
    sortName: "Price (high to low)",
    sortValue: "hilo",
  },
];
