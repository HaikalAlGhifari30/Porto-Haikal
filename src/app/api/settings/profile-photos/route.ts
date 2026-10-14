import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSettings } from "@/actions/settings";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { heroBannerUrl, heroCtaLink } = body;

    const settings = await getSettings();

    const updated = await prisma.settings.update({
      where: { id: settings.id },
      data: {
        heroBannerUrl: heroBannerUrl !== undefined ? heroBannerUrl : settings.heroBannerUrl,
        heroCtaLink: heroCtaLink !== undefined ? heroCtaLink : settings.heroCtaLink,
      },
    });

    try {
      revalidatePath("/cms/settings");
      revalidatePath("/");
    } catch (e) {
      console.warn("revalidatePath warning:", e);
    }

    return NextResponse.json({
      success: true,
      message: "Pengaturan foto profil dan CV berhasil disimpan",
      settings: {
        heroBannerUrl: updated.heroBannerUrl,
        heroCtaLink: updated.heroCtaLink,
      },
    });
  } catch (err: any) {
    console.error("API Profile Photos Save error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Gagal menyimpan foto profil" },
      { status: 500 }
    );
  }
}
