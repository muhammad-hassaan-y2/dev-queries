import { db } from "@/lib/db";


export async function createOrder(data: { userId: number; items: { productId: number; quantity: number }[]; shippingDetails: { address: string; city: string; zipCode: string } }) {
  return db.order.create({
    data: {
      userId: data.userId,
      items: {
        create: data.items.map(item => ({ productId: item.productId, quantity: item.quantity })),
      },
      shippingDetails: {
        create: data.shippingDetails,
      },
    },
  });
}

export async function getOrderById(orderId: number) {
  return db.order.findUnique({
    where: { id: orderId },
    include: {
      items: true,
      shippingDetails: true,
    },
  });
}

export async function updateOrderStatus(orderId: number, status: string) {
  return db.order.update({
    where: { id: orderId },
    data: { status },
  });
}

export async function cancelOrder(orderId: number) {
  return db.order.update({
    where: { id: orderId },
    data: { status: 'canceled' },
  });
}

export async function listOrders(skip = 0, take = 10) {
  return db.order.findMany({
    skip,
    take,
  });
}
