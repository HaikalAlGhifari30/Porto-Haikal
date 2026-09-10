const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("Updating certificate images in database...");
  const certs = await prisma.certificate.findMany();
  
  for (const cert of certs) {
    if (cert.title.includes("Junior Web Developer") || cert.issuer.includes("BNSP")) {
      await prisma.certificate.update({
        where: { id: cert.id },
        data: {
          imageUrl: "/uploads/certificates/bnsp-junior-web-developer-certificate.png",
          secondaryImageUrl: "/uploads/certificates/bnsp-junior-web-developer-units.png",
        },
      });
      console.log(`Updated BNSP certificate (${cert.id}) with image URLs`);
    } else if (cert.title.includes("Cisco") || cert.issuer.includes("Cisco")) {
      await prisma.certificate.update({
        where: { id: cert.id },
        data: {
          imageUrl: "/uploads/certificates/cisco-ccnav7-certificate.png",
        },
      });
      console.log(`Updated Cisco certificate (${cert.id}) with image URL`);
    }
  }

  const updatedCerts = await prisma.certificate.findMany();
  console.log("Updated Certificates:", JSON.stringify(updatedCerts, null, 2));
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
