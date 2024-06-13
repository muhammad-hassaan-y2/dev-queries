import { db } from "@/lib/db";


export async function processPayment(data: { orderId: number; amount: number; paymentMethod: string }) {
  return db.payment.create({
    data,
  });
}

export async function getPaymentDetailsById(paymentId: number) {
  return db.payment.findUnique({
    where: { id: paymentId },
  });
}

export async function refundPayment(paymentId: number) {
  return db.payment.update({
    where: { id: paymentId },
    data: { status: 'refunded' },
  });
}

export async function listPayments(skip = 0, take = 10) {
  return db.payment.findMany({
    skip,
    take,
  });
}

export async function updatePaymentStatus(paymentId: number, status: string) {
  return db.payment.update({
    where: { id: paymentId },
    data: { status },
  });
}
