"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { uploadFile } from "@/lib/upload";


export async function getSettings() {
    let settings = await prisma.settings.findFirst();
    if (!settings) {
        settings = await prisma.settings.create({
            data: {
                heroTitle: "Baroedak COMO",
                heroSubtitle: "Interactive Digital Company & Division Identity Platform",
                heroCtaText: "View Projects",
                heroCtaLink: "#projects",
                heroBannerUrl: null,
                heroOverlayOpacity: 50,
            }
        });
    }
    return settings;
}

export async function updateSettings(formData: FormData) {
    const settings = await getSettings();
    
    const heroTitle = formData.get("heroTitle") as string;
    const heroSubtitle = formData.get("heroSubtitle") as string;
    const heroCtaText = formData.get("heroCtaText") as string;
    const heroCtaLink = formData.get("heroCtaLink") as string;
    const heroBannerFile = formData.get("banner") as File;
    const currentHeroBannerUrl = formData.get("currentHeroBannerUrl") as string;
    const removeBanner = formData.get("removeBanner") === "true";
    const heroOverlayOpacity = formData.get("heroOverlayOpacity") !== null 
        ? parseInt(formData.get("heroOverlayOpacity") as string) 
        : 50;

    let heroBannerUrl = currentHeroBannerUrl || null;

    if (heroBannerFile && heroBannerFile.size > 0) {
        heroBannerUrl = await uploadFile(heroBannerFile, "settings");
    } else if (removeBanner) {
        heroBannerUrl = null;
    }

    console.log("Updating settings:", {
        heroTitle,
        heroBannerUrl,
        heroOverlayOpacity
    });

    await prisma.settings.update({
        where: { id: settings.id },
        data: {
            heroTitle,
            heroSubtitle,
            heroCtaText,
            heroCtaLink,
            heroBannerUrl,
            heroOverlayOpacity
        }
    });
    
    revalidatePath("/cms/settings");
    revalidatePath("/");
}
