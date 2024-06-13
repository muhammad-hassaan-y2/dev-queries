import { db } from "@/lib/db";


export async function createInventoryItem(data: { productId: number; quantity: number }) {
  return db.inventory.create({
    data,
  });
}

export async function getInventoryItemById(inventoryId: number) {
  return db.inventory.findUnique({
    where: { id: inventoryId },
  });
}

export async function updateInventoryItem(inventoryId: number, data: Partial<{ productId: number; quantity: number }>) {
  return db.inventory.update({
    where: { id: inventoryId },
    data,
  });
}

export async function deleteInventoryItem(inventoryId: number) {
  return db.inventory.delete({
    where: { id: inventoryId },
  });
}

export async function listInventoryItems(skip = 0, take = 10) {
  return db.inventory.findMany({
    skip,
    take,
  });
}
