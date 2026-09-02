"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function getEducations() {
  return await prisma.education.findMany({
    orderBy: { order: "asc" }
  });
}

export async function createEducation(data: {
  institution: string;
  institutionEn?: string;
  degree: string;
  degreeEn?: string;
  period: string;
  periodEn?: string;
  description?: string;
  descriptionEn?: string;
}) {
  const maxOrder = await prisma.education.aggregate({
    _max: { order: true }
  });

  const nextOrder = (maxOrder._max.order ?? -1) + 1;

  const item = await prisma.education.create({
    data: {
      ...data,
      order: nextOrder,
    }
  });

  revalidatePath("/cms/education");
  revalidatePath("/");
  return item;
}

export async function updateEducation(id: string, data: Partial<{
  institution: string;
  institutionEn: string;
  degree: string;
  degreeEn: string;
  period: string;
  periodEn: string;
  description: string;
  descriptionEn: string;
}>) {
  const item = await prisma.education.update({
    where: { id },
    data,
  });

  revalidatePath("/cms/education");
  revalidatePath("/");
  return item;
}

export async function deleteEducation(id: string) {
  await prisma.education.delete({
    where: { id }
  });

  revalidatePath("/cms/education");
  revalidatePath("/");
  return true;
}
