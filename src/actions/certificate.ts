"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function getCertificates() {
  try {
    if (!(prisma as any).certificate) return [];
    return await (prisma as any).certificate.findMany({
      orderBy: { order: "asc" },
    });
  } catch (err) {
    console.error("Error fetching certificates:", err);
    return [];
  }
}

export async function createCertificate(data: {
  title: string;
  titleEn?: string;
  issuer: string;
  issuerEn?: string;
  period: string;
  periodEn?: string;
  description?: string;
  descriptionEn?: string;
  badge?: string;
  badgeEn?: string;
  credentialUrl?: string;
  imageUrl?: string;
  secondaryImageUrl?: string;
}) {
  if (!(prisma as any).certificate) throw new Error("Certificate model not ready");
  const maxOrder = await (prisma as any).certificate.aggregate({
    _max: { order: true },
  });

  const nextOrder = (maxOrder._max?.order ?? -1) + 1;

  const item = await (prisma as any).certificate.create({
    data: {
      ...data,
      order: nextOrder,
    },
  });

  revalidatePath("/cms/certificates");
  revalidatePath("/");
  return item;
}

export async function updateCertificate(
  id: string,
  data: Partial<{
    title: string;
    titleEn: string;
    issuer: string;
    issuerEn: string;
    period: string;
    periodEn: string;
    description: string;
    descriptionEn: string;
    badge: string;
    badgeEn: string;
    credentialUrl: string;
    imageUrl: string;
    secondaryImageUrl: string;
  }>
) {
  if (!(prisma as any).certificate) throw new Error("Certificate model not ready");
  const item = await (prisma as any).certificate.update({
    where: { id },
    data,
  });

  revalidatePath("/cms/certificates");
  revalidatePath("/");
  return item;
}

export async function deleteCertificate(id: string) {
  if (!(prisma as any).certificate) throw new Error("Certificate model not ready");
  await (prisma as any).certificate.delete({
    where: { id },
  });

  revalidatePath("/cms/certificates");
  revalidatePath("/");
  return true;
}

export async function parseAndUploadCertificateFile(formData: FormData) {
  try {
    const file = formData.get("file") as File;
    if (!file || file.size === 0) {
      return { success: false, error: "Tidak ada file yang dipilih" };
    }

    const { uploadFile } = await import("@/lib/upload");
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const pdfParse = require("pdf-parse");

    const fileUrl = await uploadFile(file, "certificates");

    let extractedData = {
      title: "",
      issuer: "",
      period: new Date().getFullYear().toString(),
      badge: "Sertifikasi Resmi",
      description: "",
      credentialUrl: "",
      imageUrl: fileUrl,
      secondaryImageUrl: "",
    };

    const isPdf = file.name.toLowerCase().endsWith(".pdf") || file.type === "application/pdf";

    if (isPdf) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const pdf = await pdfParse(buffer);
      const text: string = pdf.text || "";
      const lines: string[] = text.split("\n").map((l: string) => l.trim()).filter(Boolean);

      // --- Issuer Extraction ---
      if (/BNSP|Badan Nasional Sertifikasi Profesi|LSP/i.test(text)) {
        extractedData.issuer = "Badan Nasional Sertifikasi Profesi (BNSP)";
        extractedData.badge = "Sertifikasi Kompetensi Nasional";
      } else if (/Cisco|Networking Academy/i.test(text)) {
        extractedData.issuer = "Cisco Networking Academy";
        extractedData.badge = "International Certification";
      } else if (/EF SET|EF Standard English/i.test(text)) {
        extractedData.issuer = "EF Standard English Test (EF SET)";
        extractedData.badge = "International Standard";
      } else if (/Kampus Merdeka|Kementerian Pendidikan|MSIB/i.test(text)) {
        extractedData.issuer = "Kemendikbudristek - Kampus Merdeka";
        extractedData.badge = "Program MSIB Nasional";
      } else if (/UNIKOM|Universitas Komputer Indonesia/i.test(text)) {
        extractedData.issuer = "Universitas Komputer Indonesia (UNIKOM)";
        extractedData.badge = "Sertifikat Akademik / Pelatihan";
      } else if (/Dicoding/i.test(text)) {
        extractedData.issuer = "Dicoding Indonesia";
        extractedData.badge = "Sertifikasi Industri";
      } else {
        const foundIssuerLine = lines.find((l: string) => /diberikan oleh|issued by|organisasi|institution|university|academy|lembaga/i.test(l));
        if (foundIssuerLine) {
          extractedData.issuer = foundIssuerLine;
        } else {
          extractedData.issuer = "Lembaga Sertifikasi / Organisasi";
        }
      }

      // --- Title Extraction ---
      if (/Junior Web Programmer/i.test(text)) {
        extractedData.title = "Junior Web Programmer";
      } else if (/CCNA|Introduction to Networks/i.test(text)) {
        extractedData.title = "CCNA: Introduction to Networks";
      } else if (/EF SET|English Certificate/i.test(text)) {
        const scoreMatch = text.match(/(C2 Proficient|C1 Advanced|B2 Upper Intermediate|B1 Intermediate|[0-9]{2,3}\/100)/i);
        extractedData.title = scoreMatch ? `EF SET English Certificate (${scoreMatch[0]})` : "EF SET English Certificate";
      } else if (/Studi Independen|Magang Bersertifikat|MSIB/i.test(text)) {
        const titleMatch = text.match(/(?:Studi Independen|Magang Bersertifikat|Program MSIB)[^\n]*/i);
        extractedData.title = titleMatch ? titleMatch[0] : "Sertifikat MSIB Kampus Merdeka";
      } else {
        // Look for candidate title lines
        const certHeaderIdx = lines.findIndex((l: string) => /SERTIFIKAT|CERTIFICATE|KOMPETENSI|SKEMA/i.test(l));
        if (certHeaderIdx !== -1 && lines[certHeaderIdx + 1]) {
          extractedData.title = lines[certHeaderIdx + 1];
        } else {
          extractedData.title = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
        }
      }

      // --- Period Extraction ---
      const years = text.match(/20[1-3][0-9]/g);
      if (years && years.length > 0) {
        const uniqueYears = Array.from(new Set(years)).sort();
        if (/MSIB|Kampus Merdeka|Sertifikat|Profesi|BNSP/i.test(text)) {
          // Certificates without expiration show the issuance year
          extractedData.period = uniqueYears[uniqueYears.length - 1];
        } else if (uniqueYears.length > 1) {
          extractedData.period = `${uniqueYears[0]} - ${uniqueYears[uniqueYears.length - 1]}`;
        } else {
          extractedData.period = uniqueYears[0];
        }
      }

      // --- Units / Description Extraction ---
      // Check for unit competency codes (e.g., J.620100.005.01 or numbered lists)
      const unitMatches = text.match(/(?:[A-Z]\.\d+\.\d+\.\d+|Unit\s*\d+|[0-9]{2,3}\.[0-9]+)\s+[^\n]+/gi);
      if (unitMatches && unitMatches.length > 0) {
        const units: string[] = Array.from(new Set(unitMatches)).slice(0, 12) as string[];
        extractedData.description = "Daftar Unit / Topik Kompetensi:\n" + units.map((u: string, i: number) => `${i + 1}. ${u.trim()}`).join("\n");
      } else {
        // Fallback: extract main informative sentences
        const cleanLines = lines.filter((l: string) => l.length > 25 && !/http|www|page|halaman|nomor|no\./i.test(l));
        if (cleanLines.length > 0) {
          extractedData.description = cleanLines.slice(0, 3).join("\n");
        }
      }

      // --- Credential URL ---
      const urlMatch = text.match(/https?:\/\/[^\s"'\(\)]+/i);
      if (urlMatch) {
        extractedData.credentialUrl = urlMatch[0];
      }
    } else {
      // Image upload
      extractedData.title = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
      extractedData.issuer = "Lembaga Sertifikasi / Organisasi";
    }

    return {

      success: true,
      url: fileUrl,
      data: extractedData,
    };
  } catch (error: any) {
    console.error("Error processing certificate upload:", error);
    return { success: false, error: error.message || "Gagal memproses file sertifikat" };
  }
}

