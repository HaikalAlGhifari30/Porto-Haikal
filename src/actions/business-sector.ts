"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { uploadFile } from "@/lib/upload";

export async function getBusinessSectors() {
    return await prisma.businessSector.findMany({
        orderBy: { order: "asc" }
    });
}

export async function createBusinessSector(formData: FormData) {
    const name = formData.get("name") as string;
    const nameEn = formData.get("nameEn") as string;
    const description = formData.get("description") as string;
    const descriptionEn = formData.get("descriptionEn") as string;
    const icon = formData.get("icon") as string;
    const imageFile = formData.get("image") as File;

    if (!name || !description) {
        throw new Error("Nama dan deskripsi wajib diisi!");
    }

    let imageUrl = null;
    if (imageFile && imageFile.size > 0) {
        imageUrl = await uploadFile(imageFile, "business-sectors");
    }

    const maxOrder = await prisma.businessSector.aggregate({
        _max: { order: true }
    });

    const nextOrder = (maxOrder._max.order ?? -1) + 1;

    const sector = await prisma.businessSector.create({
        data: {
            name,
            nameEn: nameEn || null,
            description,
            descriptionEn: descriptionEn || null,
            icon: icon || null,
            imageUrl,
            order: nextOrder
        }
    });

    revalidatePath("/cms/business-sectors");
    revalidatePath("/");
    return sector;
}

export async function updateBusinessSector(id: string, formData: FormData) {
    const name = formData.get("name") as string;
    const nameEn = formData.get("nameEn") as string;
    const description = formData.get("description") as string;
    const descriptionEn = formData.get("descriptionEn") as string;
    const icon = formData.get("icon") as string;
    const imageFile = formData.get("image") as File;
    const deleteImage = formData.get("deleteImage") === "true";

    if (!name || !description) {
        throw new Error("Nama dan deskripsi wajib diisi!");
    }

    const currentSector = await prisma.businessSector.findUnique({
        where: { id }
    });

    if (!currentSector) {
        throw new Error("Bidang usaha tidak ditemukan!");
    }

    let imageUrl = currentSector.imageUrl;
    if (deleteImage) {
        imageUrl = null;
    }

    if (imageFile && imageFile.size > 0) {
        imageUrl = await uploadFile(imageFile, "business-sectors");
    }

    const sector = await prisma.businessSector.update({
        where: { id },
        data: {
            name,
            nameEn: nameEn || null,
            description,
            descriptionEn: descriptionEn || null,
            icon: icon || null,
            imageUrl
        }
    });

    revalidatePath("/cms/business-sectors");
    revalidatePath("/");
    return sector;
}

export async function deleteBusinessSector(id: string) {
    const currentSector = await prisma.businessSector.findUnique({
        where: { id }
    });

    if (!currentSector) {
        throw new Error("Bidang usaha tidak ditemukan!");
    }

    await prisma.businessSector.delete({
        where: { id }
    });

    // Reorder remaining sectors
    const remaining = await prisma.businessSector.findMany({
        orderBy: { order: "asc" }
    });

    for (let i = 0; i < remaining.length; i++) {
        await prisma.businessSector.update({
            where: { id: remaining[i].id },
            data: { order: i }
        });
    }

    revalidatePath("/cms/business-sectors");
    revalidatePath("/");
}

export async function reorderBusinessSectors(ids: string[]) {
    for (let i = 0; i < ids.length; i++) {
        await prisma.businessSector.update({
            where: { id: ids[i] },
            data: { order: i }
        });
    }

    revalidatePath("/cms/business-sectors");
    revalidatePath("/");
}
