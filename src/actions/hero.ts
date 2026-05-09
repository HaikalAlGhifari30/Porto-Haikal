"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { uploadFile } from "@/lib/upload";
import fs from "fs";
import path from "path";

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

    // Delete file if exists
    if (slide.imageUrl.startsWith("/uploads/")) {
        const filePath = path.join(process.cwd(), "public", slide.imageUrl);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
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
