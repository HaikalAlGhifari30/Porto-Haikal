"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function getOrganizations() {
  return await prisma.organization.findMany({
    orderBy: { order: "asc" }
  });
}

export async function createOrganization(data: {
  role: string;
  roleEn?: string;
  name: string;
  nameEn?: string;
  period: string;
  periodEn?: string;
  description?: string;
  descriptionEn?: string;
}) {
  const maxOrder = await prisma.organization.aggregate({
    _max: { order: true }
  });

  const nextOrder = (maxOrder._max.order ?? -1) + 1;

  const item = await prisma.organization.create({
    data: {
      ...data,
      order: nextOrder,
    }
  });

  revalidatePath("/cms/organization");
  revalidatePath("/");
  return item;
}

export async function updateOrganization(id: string, data: Partial<{
  role: string;
  roleEn: string;
  name: string;
  nameEn: string;
  period: string;
  periodEn: string;
  description: string;
  descriptionEn: string;
}>) {
  const item = await prisma.organization.update({
    where: { id },
    data,
  });

  revalidatePath("/cms/organization");
  revalidatePath("/");
  return item;
}

export async function deleteOrganization(id: string) {
  await prisma.organization.delete({
    where: { id }
  });

  revalidatePath("/cms/organization");
  revalidatePath("/");
  return true;
}
