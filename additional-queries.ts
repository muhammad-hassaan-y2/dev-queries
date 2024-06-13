import { db } from "@/lib/db";


export async function searchProducts(query: string, skip = 0, take = 10) {
  return db.product.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
      ],
    },
    skip,
    take,
  });
}

export async function getProductRecommendations(userId: number, skip = 0, take = 10) {
  // Implementing a simple recommendation system based on user's order history.
  const orders = await db.order.findMany({
    where: { userId },
    include: { items: true },
  });

  const productIds = orders.flatMap(order => order.items.map(item => item.productId));
  
  return db.product.findMany({
    where: { id: { in: productIds } },
    skip,
    take,
  });
}

export async function trackOrderShipment(orderId: number) {
  return db.order.findUnique({
    where: { id: orderId },
    include: { shippingDetails: true },
  });
}

export async function getCustomerSupport(userId: number) {
  // Assuming a customer support system that logs user queries.
  return db.support.findMany({
    where: { userId },
  });
}
