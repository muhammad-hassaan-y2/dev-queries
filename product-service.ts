import { db } from "@/lib/db";

export async function createProduct(data: { name: string; price: number; description: string; sku: string; available: boolean; brandId: number; categoryId: number }) {
  return db.product.create({
    data,
  });
}

export async function getProductById(productId: number) {
  return db.product.findUnique({
    where: { id: productId },
  });
}

export async function updateProduct(productId: number, data: Partial<{ name: string; price: number; description: string; sku: string; available: boolean; brandId: number; categoryId: number }>) {
  return db.product.update({
    where: { id: productId },
    data,
  });
}

export async function deleteProduct(productId: number) {
  return db.product.delete({
    where: { id: productId },
  });
}

export async function listProducts(skip = 0, take = 10) {
  return db.product.findMany({
    skip,
    take,
  });
}
