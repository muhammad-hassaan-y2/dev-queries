import { db } from "@/lib/db";

export async function registerUser(data: { username: string; email: string; password: string }) {
  return db.user.create({
    data,
  });
}

export async function loginUser(email: string, password: string) {
  return db.user.findFirst({
    where: { email, password },
  });
}

export async function getUserProfile(userId: number) {
  return db.user.findUnique({
    where: { id: userId },
  });
}

export async function updateUserProfile(userId: number, data: Partial<{ username: string; email: string; password: string }>) {
  return db.user.update({
    where: { id: userId },
    data,
  });
}

export async function deleteUserAccount(userId: number) {
  return db.user.delete({
    where: { id: userId },
  });
}
