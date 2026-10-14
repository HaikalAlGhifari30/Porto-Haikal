import { NextRequest, NextResponse } from "next/server";
import { uploadFile } from "@/lib/upload";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "profile";

    if (!file || file.size === 0) {
      return NextResponse.json({ success: false, error: "Berkas tidak ditemukan" }, { status: 400 });
    }

    const url = await uploadFile(file, folder);
    return NextResponse.json({ success: true, url });
  } catch (err: any) {
    console.error("API Upload error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Gagal mengunggah berkas" },
      { status: 500 }
    );
  }
}
