const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("Adding UNIKOM Language Center certificate to database...");
  
  const existing = await prisma.certificate.findFirst({
    where: {
      title: { contains: "English Proficiency" }
    }
  });

  const certData = {
    title: "English Proficiency Test (Score: 407)",
    titleEn: "English Proficiency Test (Score: 407)",
    issuer: "UNIKOM Language Center — Universitas Komputer Indonesia",
    issuerEn: "UNIKOM Language Center — Universitas Komputer Indonesia",
    period: "9 Nov 2024 — Nov 2026",
    periodEn: "9 Nov 2024 — Nov 2026",
    description: "Sertifikat tes kemahiran bahasa Inggris resmi dari UNIKOM Language Center (No. Reg. 11.24.03177). Skor Total: 407 (Listening: 44, Structure & Written: 36, Reading: 42).",
    descriptionEn: "Official English Proficiency Test Certificate from UNIKOM Language Center (No. Reg. 11.24.03177). Total Score: 407 (Listening: 44, Structure & Written: 36, Reading: 42).",
    badge: "English Proficiency Test",
    badgeEn: "English Proficiency Test",
    imageUrl: "/uploads/certificates/unikom-english-proficiency-test.png",
    order: 3,
  };

  if (existing) {
    await prisma.certificate.update({
      where: { id: existing.id },
      data: certData,
    });
    console.log("Updated existing UNIKOM certificate in DB.");
  } else {
    await prisma.certificate.create({
      data: certData,
    });
    console.log("Created new UNIKOM certificate in DB.");
  }

  const allCerts = await prisma.certificate.findMany({ orderBy: { order: "asc" } });
  console.log("All Certificates in DB count:", allCerts.length);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
