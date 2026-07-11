"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function getTeamMembers() {
  try {
    const members = await prisma.teamMember.findMany({
      orderBy: {
        order: 'asc',
      },
    });
    return members;
  } catch (error) {
    console.error("Failed to fetch team members:", error);
    return [];
  }
}

export async function createTeamMember(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const position = formData.get("position") as string;
    const order = parseInt(formData.get("order") as string || "0");

    if (!name || !position) {
      throw new Error("Name and position are required");
    }

    await prisma.teamMember.create({
      data: {
        name,
        position,
        order,
      },
    });

    revalidatePath("/cms/organization");
    revalidatePath("/");
    
    return { success: true };
  } catch (error) {
    console.error("Error creating team member:", error);
    throw new Error("Failed to create team member");
  }
}

export async function updateTeamMember(id: string, formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const position = formData.get("position") as string;
    
    if (!name || !position) {
      throw new Error("Name and position are required");
    }

    await prisma.teamMember.update({
      where: { id },
      data: {
        name,
        position,
      },
    });

    revalidatePath("/cms/organization");
    revalidatePath("/");
    
    return { success: true };
  } catch (error) {
    console.error("Error updating team member:", error);
    throw new Error("Failed to update team member");
  }
}

export async function deleteTeamMember(id: string) {
  try {
    await prisma.teamMember.delete({
      where: { id },
    });

    revalidatePath("/cms/organization");
    revalidatePath("/");
    
    return { success: true };
  } catch (error) {
    console.error("Error deleting team member:", error);
    throw new Error("Failed to delete team member");
  }
}

export async function updateTeamMemberOrder(items: { id: string; order: number }[]) {
  try {
    // We use a transaction to update all orders efficiently
    await prisma.$transaction(
      items.map((item) =>
        prisma.teamMember.update({
          where: { id: item.id },
          data: { order: item.order },
        })
      )
    );

    revalidatePath("/cms/organization");
    revalidatePath("/");
    
    return { success: true };
  } catch (error) {
    console.error("Error updating order:", error);
    throw new Error("Failed to update order");
  }
}
