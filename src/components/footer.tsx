import { prisma } from "@/lib/db";
import { FooterClient } from "./footer-client";

export async function Footer() {
    const settings = await prisma.settings.findFirst();

    return <FooterClient settings={settings} />;
}
