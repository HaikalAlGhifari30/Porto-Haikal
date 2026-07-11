"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function getWhatsAppAdmins() {
  try {
    const admins = await prisma.whatsAppAdmin.findMany({
      orderBy: { order: "asc" },
    });
    return admins;
  } catch (error) {
    console.error("Failed to fetch WhatsApp admins:", error);
    return [];
  }
}

export async function createWhatsAppAdmin(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const phone = formData.get("phone") as string;
    const message = formData.get("message") as string;
    const isActive = formData.get("isActive") === "true";
    const order = parseInt(formData.get("order") as string || "0");

    if (!name || !phone) {
      throw new Error("Name and phone are required");
    }

    await prisma.whatsAppAdmin.create({
      data: {
        name,
        phone,
        message,
        isActive,
        order,
      },
    });

    revalidatePath("/cms/whatsapp");
    revalidatePath("/");
    
    return { success: true };
  } catch (error) {
    console.error("Error creating WhatsApp admin:", error);
    throw new Error("Failed to create WhatsApp admin");
  }
}

export async function updateWhatsAppAdmin(id: string, formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const phone = formData.get("phone") as string;
    const message = formData.get("message") as string;
    const isActive = formData.get("isActive") === "true";
    const order = parseInt(formData.get("order") as string || "0");

    if (!name || !phone) {
      throw new Error("Name and phone are required");
    }

    await prisma.whatsAppAdmin.update({
      where: { id },
      data: {
        name,
        phone,
        message,
        isActive,
        order,
      },
    });

    revalidatePath("/cms/whatsapp");
    revalidatePath("/");
    
    return { success: true };
  } catch (error) {
    console.error("Error updating WhatsApp admin:", error);
    throw new Error("Failed to update WhatsApp admin");
  }
}

export async function deleteWhatsAppAdmin(id: string) {
  try {
    await prisma.whatsAppAdmin.delete({
      where: { id },
    });

    revalidatePath("/cms/whatsapp");
    revalidatePath("/");
    
    return { success: true };
  } catch (error) {
    console.error("Error deleting WhatsApp admin:", error);
    throw new Error("Failed to delete WhatsApp admin");
  }
}

export async function updateWhatsAppAdminOrder(items: { id: string; order: number }[]) {
  try {
    await prisma.$transaction(
      items.map((item) =>
        prisma.whatsAppAdmin.update({
          where: { id: item.id },
          data: { order: item.order },
        })
      )
    );

    revalidatePath("/cms/whatsapp");
    revalidatePath("/");
    
    return { success: true };
  } catch (error) {
    console.error("Error updating WhatsApp admin order:", error);
    throw new Error("Failed to update WhatsApp admin order");
  }
}
