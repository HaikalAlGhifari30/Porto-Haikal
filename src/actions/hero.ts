"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { uploadFile } from "@/lib/upload";
import cloudinary from "@/lib/cloudinary";

export async function getHeroSlides() {
    return await prisma.heroSlide.findMany({
        orderBy: { orderIndex: "asc" }
    });
}

export async function addHeroSlide(formData: FormData) {
    const file = formData.get("image") as File;
    if (!file || file.size === 0) throw new Error("Image is required");

    const imageUrl = await uploadFile(file, "hero");
    const count = await prisma.heroSlide.count();

    const slide = await prisma.heroSlide.create({
        data: {
            imageUrl,
            orderIndex: count,
            title: "Baroedak COMO",
            subtitle: "Identity Platform",
            buttonText: "View Projects",
            buttonLink: "#projects",
            overlayDarkness: 50
        }
    });

    revalidatePath("/");
    revalidatePath("/cms/settings");
    return slide;
}

export async function updateHeroSlide(id: string, data: any) {
    const slide = await prisma.heroSlide.update({
        where: { id },
        data: {
            title: data.title,
            subtitle: data.subtitle,
            buttonText: data.buttonText,
            buttonLink: data.buttonLink,
            overlayDarkness: data.overlayDarkness,
            isActive: data.isActive
        }
    });

    revalidatePath("/");
    revalidatePath("/cms/settings");
    return slide;
}

export async function deleteHeroSlide(id: string) {
    const slide = await prisma.heroSlide.findUnique({ where: { id } });
    if (!slide) return;

    // Delete from Cloudinary if it's a Cloudinary URL
    if (slide.imageUrl.includes("cloudinary.com")) {
        try {
            // Extract public_id from URL
            // Format: .../upload/v12345678/folder/public_id.jpg
            const parts = slide.imageUrl.split("/");
            const uploadIndex = parts.indexOf("upload");
            if (uploadIndex !== -1) {
                // public_id is everything after 'upload/v...' or 'upload/'
                // but we need to remove the version and extension
                const pathParts = parts.slice(uploadIndex + 1);
                // Skip version if present (v12345678)
                if (pathParts[0].startsWith("v")) {
                    pathParts.shift();
                }
                const publicIdWithExt = pathParts.join("/");
                const publicId = publicIdWithExt.split(".")[0];
                
                await cloudinary.uploader.destroy(publicId);
            }
        } catch (error) {
            console.error("Failed to delete from Cloudinary:", error);
        }
    }

    await prisma.heroSlide.delete({ where: { id } });

    // Reorder remaining slides
    const remaining = await prisma.heroSlide.findMany({
        orderBy: { orderIndex: "asc" }
    });

    for (let i = 0; i < remaining.length; i++) {
        await prisma.heroSlide.update({
            where: { id: remaining[i].id },
            data: { orderIndex: i }
        });
    }

    revalidatePath("/");
    revalidatePath("/cms/settings");
}

export async function reorderHeroSlides(ids: string[]) {
    for (let i = 0; i < ids.length; i++) {
        await prisma.heroSlide.update({
            where: { id: ids[i] },
            data: { orderIndex: i }
        });
    }

    revalidatePath("/");
    revalidatePath("/cms/settings");
}
