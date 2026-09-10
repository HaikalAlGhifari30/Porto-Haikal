require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("Adding MSIB Infinite Learning certificate to database...");
  
  const existing = await prisma.certificate.findFirst({
    where: {
      OR: [
        { title: { contains: "MSIB" } },
        { issuer: { contains: "Infinite Learning" } },
      ]
    }
  });

  const certData = {
    title: "MSIB Batch 4: Independent Study Android Mobile Development",
    titleEn: "MSIB Batch 4: Independent Study Android Mobile Development",
    issuer: "Kampus Merdeka (MSIB) & Infinite Learning",
    issuerEn: "Kampus Merdeka (MSIB) & Infinite Learning",
    period: "2023",
    periodEn: "2023",
    description: "Sertifikat kelulusan resmi Studi Independen Bersertifikat (MSIB Kampus Merdeka) Batch 4 bidang Android Mobile Application Development di Infinite Learning (No: 257/IL-SIB/VII/2023). Menguasai Pemrograman Kotlin, UI/UX Prototyping, Android Studio, Cloud Computing & Cybersecurity.",
    descriptionEn: "Official Certified Independent Study Program Certificate (MSIB Kampus Merdeka) Batch 4 on Android Mobile Application Development at Infinite Learning (No: 257/IL-SIB/VII/2023). Mastered Kotlin Programming, UI/UX Prototyping, Android Studio, Cloud Computing & Cybersecurity.",
    badge: "MSIB Kampus Merdeka",
    badgeEn: "MSIB Kampus Merdeka",
    imageUrl: "/uploads/certificates/msib-infinite-learning-android-certificate.png",
    secondaryImageUrl: "/uploads/certificates/msib-infinite-learning-android-transcript-1.png",
    order: 4,
  };

  if (existing) {
    await prisma.certificate.update({
      where: { id: existing.id },
      data: certData,
    });
    console.log("Updated existing MSIB certificate in DB.");
  } else {
    await prisma.certificate.create({
      data: certData,
    });
    console.log("Created new MSIB certificate in DB.");
  }

  const allCerts = await prisma.certificate.findMany({ orderBy: { order: "asc" } });
  console.log("All Certificates in DB count:", allCerts.length);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
