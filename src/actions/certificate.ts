"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function getCertificates() {
  try {
    if (!(prisma as any).certificate) return [];
    return await (prisma as any).certificate.findMany({
      orderBy: { order: "asc" },
    });
  } catch (err) {
    console.error("Error fetching certificates:", err);
    return [];
  }
}

export async function createCertificate(data: {
  title: string;
  titleEn?: string;
  issuer: string;
  issuerEn?: string;
  period: string;
  periodEn?: string;
  description?: string;
  descriptionEn?: string;
  badge?: string;
  badgeEn?: string;
  credentialUrl?: string;
}) {
  if (!(prisma as any).certificate) throw new Error("Certificate model not ready");
  const maxOrder = await (prisma as any).certificate.aggregate({
    _max: { order: true },
  });

  const nextOrder = (maxOrder._max?.order ?? -1) + 1;

  const item = await (prisma as any).certificate.create({
    data: {
      ...data,
      order: nextOrder,
    },
  });

  revalidatePath("/cms/certificates");
  revalidatePath("/");
  return item;
}

export async function updateCertificate(
  id: string,
  data: Partial<{
    title: string;
    titleEn: string;
    issuer: string;
    issuerEn: string;
    period: string;
    periodEn: string;
    description: string;
    descriptionEn: string;
    badge: string;
    badgeEn: string;
    credentialUrl: string;
  }>
) {
  if (!(prisma as any).certificate) throw new Error("Certificate model not ready");
  const item = await (prisma as any).certificate.update({
    where: { id },
    data,
  });

  revalidatePath("/cms/certificates");
  revalidatePath("/");
  return item;
}

export async function deleteCertificate(id: string) {
  if (!(prisma as any).certificate) throw new Error("Certificate model not ready");
  await (prisma as any).certificate.delete({
    where: { id },
  });

  revalidatePath("/cms/certificates");
  revalidatePath("/");
  return true;
}
