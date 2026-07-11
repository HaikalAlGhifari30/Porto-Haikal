"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { uploadFile } from "@/lib/upload";
import { promises as fs } from "fs";
import path from "path";

export async function getHeroSlides() {
    return await prisma.heroSlide.findMany({
        orderBy: { order: "asc" }
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
            order: count,
            title: "PT Rizky Rijaya Karya",
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
            titleEn: data.titleEn,
            subtitle: data.subtitle,
            subtitleEn: data.subtitleEn,
            buttonText: data.buttonText,
            buttonTextEn: data.buttonTextEn,
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

    // Delete from local file system if it's a local upload
    if (slide.imageUrl.startsWith("/uploads/")) {
        try {
            const filePath = path.join(process.cwd(), "public", slide.imageUrl);
            await fs.unlink(filePath);
        } catch (error) {
            console.error("Failed to delete local file:", error);
        }
    }

    await prisma.heroSlide.delete({ where: { id } });

    // Reorder remaining slides
    const remaining = await prisma.heroSlide.findMany({
        orderBy: { order: "asc" }
    });

    for (let i = 0; i < remaining.length; i++) {
        await prisma.heroSlide.update({
            where: { id: remaining[i].id },
            data: { order: i }
        });
    }

    revalidatePath("/");
    revalidatePath("/cms/settings");
}

export async function reorderHeroSlides(ids: string[]) {
    for (let i = 0; i < ids.length; i++) {
        await prisma.heroSlide.update({
            where: { id: ids[i] },
            data: { order: i }
        });
    }

    revalidatePath("/");
    revalidatePath("/cms/settings");
}
