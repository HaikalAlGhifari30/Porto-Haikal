"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { uploadFile } from "@/lib/upload";


export async function getSettings() {
    let settings = await prisma.settings.findFirst();
    if (!settings) {
        settings = await prisma.settings.create({
            data: {
                heroTitle: "PT Rizky Rijaya Karya",
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

async function translateIdToEn(text: string): Promise<string> {
    if (!text || text.trim() === "") return "";
    try {
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=id&tl=en&dt=t&q=${encodeURIComponent(text)}`;
        const res = await fetch(url, {
            headers: {
                "User-Agent": "Mozilla/5.0"
            }
        });
        if (!res.ok) return text;
        const data = await res.json();
        if (data && data[0]) {
            return data[0].map((sentence: any) => sentence[0]).join("");
        }
        return text;
    } catch (e) {
        console.error("Translation failed:", e);
        return text;
    }
}

export async function updateSettings(formData: FormData) {
    const settings = await getSettings();
    
    const heroTitle = formData.get("heroTitle") as string ?? settings.heroTitle;
    const heroSubtitle = formData.get("heroSubtitle") as string ?? settings.heroSubtitle;
    const heroCtaText = formData.get("heroCtaText") as string ?? settings.heroCtaText;
    const heroCtaLink = formData.get("heroCtaLink") as string ?? settings.heroCtaLink;
    const heroBannerFile = formData.get("banner") as File;
    const currentHeroBannerUrl = formData.get("currentHeroBannerUrl") as string;
    const removeBanner = formData.get("removeBanner") === "true";
    const heroOverlayOpacityStr = formData.get("heroOverlayOpacity");
    const heroOverlayOpacity = heroOverlayOpacityStr !== null 
        ? parseInt(heroOverlayOpacityStr as string) 
        : settings.heroOverlayOpacity;

    const footerAboutRaw = formData.get("footerAbout") as string | null;
    const footerAbout = footerAboutRaw !== null ? footerAboutRaw : settings.footerAbout;
    const footerAboutEn = footerAboutRaw !== null ? await translateIdToEn(footerAbout as string) : (settings as any).footerAboutEn;

    const address = formData.get("address") as string ?? settings.address;
    const phone = formData.get("phone") as string ?? settings.phone;
    const email = formData.get("email") as string ?? settings.email;
    const instagram = formData.get("instagram") as string ?? settings.instagram;
    const linkedin = formData.get("linkedin") as string ?? settings.linkedin;

    const termsTextRaw = formData.get("termsText") as string | null;
    const termsText = termsTextRaw !== null ? termsTextRaw : (settings as any).termsText;
    const termsTextEn = termsTextRaw !== null ? await translateIdToEn(termsText) : (settings as any).termsTextEn;

    const privacyTextRaw = formData.get("privacyText") as string | null;
    const privacyText = privacyTextRaw !== null ? privacyTextRaw : (settings as any).privacyText;
    const privacyTextEn = privacyTextRaw !== null ? await translateIdToEn(privacyText) : (settings as any).privacyTextEn;

    const aboutText = formData.get("aboutText") as string ?? settings.aboutText;
    const visionText = formData.get("visionText") as string ?? settings.visionText;
    const missionText = formData.get("missionText") as string ?? settings.missionText;
    
    // Parse coreValues if it's sent as a stringified JSON
    const coreValuesRaw = formData.get("coreValues");
    let coreValues = settings.coreValues;
    if (coreValuesRaw !== null) {
        try {
            coreValues = JSON.parse(coreValuesRaw as string);
        } catch (e) {
            console.error("Failed to parse coreValues:", e);
        }
    }

    let heroBannerUrl = currentHeroBannerUrl || null;

    if (heroBannerFile && heroBannerFile.size > 0) {
        heroBannerUrl = await uploadFile(heroBannerFile, "settings");
    } else if (removeBanner) {
        heroBannerUrl = null;
    }

    console.log("Updating settings:", {
        heroTitle,
        heroBannerUrl,
        heroOverlayOpacity,
        footerAbout,
        address,
        phone,
        email
    });

    await prisma.settings.update({
        where: { id: settings.id },
        data: {
            heroTitle,
            heroSubtitle,
            heroCtaText,
            heroCtaLink,
            heroBannerUrl,
            heroOverlayOpacity,
            footerAbout,
            footerAboutEn,
            address,
            phone,
            email,
            instagram,
            linkedin,
            // @ts-ignore
            aboutText,
            // @ts-ignore
            visionText,
            // @ts-ignore
            missionText,
            // @ts-ignore
            coreValues,
            // @ts-ignore
            termsText,
            // @ts-ignore
            privacyText,
            // @ts-ignore
            termsTextEn,
            // @ts-ignore
            privacyTextEn
        }
    });
    
    revalidatePath("/cms/settings");
    revalidatePath("/");
}
