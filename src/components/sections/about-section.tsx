import { prisma } from "@/lib/db";
import { AboutSectionClient } from "./about-section-client";

export async function AboutSection() {
    const settings = await prisma.settings.findFirst();

    return <AboutSectionClient settings={settings} />;
}
