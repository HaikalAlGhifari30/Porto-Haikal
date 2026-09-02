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

  await prisma.contactMessage.create({
    data: {
      name,
      email,
      subject: subject || null,
      message,
    },
  });

  revalidatePath("/cms");
  return { success: true };
}
