"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function submitContactMessage(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const subject = formData.get("subject") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !message) {
    throw new Error("Formulir harus diisi dengan lengkap / Required fields missing.");
  }

  const newMessage = await prisma.contactMessage.create({
    data: {
      name,
      email,
      subject: subject || null,
      message,
    },
  });

  revalidatePath("/cms/messages");
  revalidatePath("/cms");
  return { success: true, data: newMessage };
}

export async function getContactMessages() {
  return await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" }
  });
}

export async function markMessageAsRead(id: string) {
  await prisma.contactMessage.update({
    where: { id },
    data: { isRead: true }
  });

  revalidatePath("/cms/messages");
  revalidatePath("/cms");
  return true;
}

export async function deleteContactMessage(id: string) {
  await prisma.contactMessage.delete({
    where: { id }
  });

  revalidatePath("/cms/messages");
  revalidatePath("/cms");
  return true;
}
