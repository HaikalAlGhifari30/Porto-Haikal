const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("Updating BNSP certificate period in database...");
  
  const bnspCert = await prisma.certificate.findFirst({
    where: {
      OR: [
        { title: { contains: "Junior Web" } },
        { issuer: { contains: "BNSP" } },
      ]
    }
  });

  if (bnspCert) {
    await prisma.certificate.update({
      where: { id: bnspCert.id },
      data: {
        period: "20 Mar 2025 — 2028",
        periodEn: "20 Mar 2025 — 2028",
      },
    });
    console.log(`Updated BNSP certificate (${bnspCert.id}) period to '20 Mar 2025 — 2028'`);
  } else {
    console.log("BNSP certificate not found in DB.");
  }

  const allCerts = await prisma.certificate.findMany({ orderBy: { order: "asc" } });
  console.log("All Certificates in DB:", JSON.stringify(allCerts, null, 2));
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
