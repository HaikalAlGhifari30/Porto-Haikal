"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { uploadFile } from "@/lib/upload";

export async function getGalleryItems() {
    return await prisma.gallery.findMany({
        orderBy: { order: "asc" }
    });
}

export async function addGalleryItem(formData: FormData) {
    const title = formData.get("title") as string;
    const category = formData.get("category") as string;
    const imageFile = formData.get("image") as File;

    if (!title || !category || !imageFile || imageFile.size === 0) {
        throw new Error("Judul, kategori, dan gambar wajib diisi");
    }

    const imageUrl = await uploadFile(imageFile, "gallery");

    const count = await prisma.gallery.count();

    const item = await prisma.gallery.create({
        data: {
            title,
            category,
            imageUrl,
            order: count,
            isVisible: true
        }
    });

    revalidatePath("/");
    revalidatePath("/cms/gallery");
    return item;
}

export async function updateGalleryItem(id: string, formData: FormData) {
    const title = formData.get("title") as string;
    const category = formData.get("category") as string;
    const imageFile = formData.get("image") as File;
    const isVisibleStr = formData.get("isVisible");

    const currentItem = await prisma.gallery.findUnique({ where: { id } });
    if (!currentItem) throw new Error("Item tidak ditemukan");

    let imageUrl = currentItem.imageUrl;
    if (imageFile && imageFile.size > 0) {
        imageUrl = await uploadFile(imageFile, "gallery");
    }

    const dataToUpdate: any = {};
    if (title) dataToUpdate.title = title;
    if (category) dataToUpdate.category = category;
    if (imageUrl) dataToUpdate.imageUrl = imageUrl;
    if (isVisibleStr !== null) dataToUpdate.isVisible = isVisibleStr === "true";

    const item = await prisma.gallery.update({
        where: { id },
        data: dataToUpdate
    });

    revalidatePath("/");
    revalidatePath("/cms/gallery");
    return item;
}

export async function deleteGalleryItem(id: string) {
    await prisma.gallery.delete({ where: { id } });

    // Reorder remaining items
    const remaining = await prisma.gallery.findMany({
        orderBy: { order: "asc" }
    });

    for (let i = 0; i < remaining.length; i++) {
        await prisma.gallery.update({
            where: { id: remaining[i].id },
            data: { order: i }
        });
    }

    revalidatePath("/");
    revalidatePath("/cms/gallery");
}

export async function reorderGalleryItems(ids: string[]) {
    for (let i = 0; i < ids.length; i++) {
        await prisma.gallery.update({
            where: { id: ids[i] },
            data: { order: i }
        });
    }

    revalidatePath("/");
    revalidatePath("/cms/gallery");
}
