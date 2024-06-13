import { db } from "@/lib/db";


export async function sendEmailNotification(data: { userId: number; subject: string; message: string }) {
  return db.notification.create({
    data: {
      userId: data.userId,
      type: 'email',
      subject: data.subject,
      message: data.message,
    },
  });
}

export async function sendSMSNotification(data: { userId: number; message: string }) {
  return db.notification.create({
    data: {
      userId: data.userId,
      type: 'sms',
      message: data.message,
    },
  });
}

export async function listNotifications(skip = 0, take = 10) {
  return db.notification.findMany({
    skip,
    take,
  });
}

export async function getNotificationById(notificationId: number) {
  return db.notification.findUnique({
    where: { id: notificationId },
  });
}

export async function updateNotificationStatus(notificationId: number, status: string) {
  return db.notification.update({
    where: { id: notificationId },
    data: { status },
  });
}
