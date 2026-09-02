"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function getExperiences() {
  return await prisma.experience.findMany({
    orderBy: { order: "asc" }
  });
}

export async function createExperience(data: {
  position: string;
  positionEn?: string;
  company: string;
  companyEn?: string;
  period: string;
  periodEn?: string;
  description?: string;
  descriptionEn?: string;
  technologies?: string;
}) {
  const maxOrder = await prisma.experience.aggregate({
    _max: { order: true }
  });

  const nextOrder = (maxOrder._max.order ?? -1) + 1;

  const item = await prisma.experience.create({
    data: {
      ...data,
      order: nextOrder,
    }
  });

  revalidatePath("/cms/experience");
  revalidatePath("/");
  return item;
}

export async function updateExperience(id: string, data: Partial<{
  position: string;
  positionEn: string;
  company: string;
  companyEn: string;
  period: string;
  periodEn: string;
  description: string;
  descriptionEn: string;
  technologies: string;
}>) {
  const item = await prisma.experience.update({
    where: { id },
    data,
  });

  revalidatePath("/cms/experience");
  revalidatePath("/");
  return item;
}

export async function deleteExperience(id: string) {
  await prisma.experience.delete({
    where: { id }
  });

  revalidatePath("/cms/experience");
  revalidatePath("/");
  return true;
}
