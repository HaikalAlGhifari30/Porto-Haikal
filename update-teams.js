const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const translations = {
  "Finance & Accounting": {
    nameEn: "Finance & Accounting",
    descriptionEn: "The division responsible for financial management, bookkeeping, taxation, and accurate and transparent company financial reports."
  },
  "Personalia & Administrasi": {
    nameEn: "Personnel & Administration",
    descriptionEn: "The division that handles human resource management, personnel administration, recruitment, and employee competency development."
  },
  "Sales & Marketing": {
    nameEn: "Sales & Marketing",
    descriptionEn: "The division that focuses on sales strategy, market development, and building business relationships with clients and company partners."
  },
  "Quality Control": {
    nameEn: "Quality Control",
    descriptionEn: "The division that ensures the quality standards of company services and products are maintained through inspection, audit, and continuous improvement processes."
  },
  "Security & General Affairs": {
    nameEn: "Security & General Affairs",
    descriptionEn: "The division responsible for workplace security, company asset management, and daily general affairs operations."
  }
};

async function main() {
  const teams = await prisma.team.findMany();
  for (const team of teams) {
    const t = translations[team.name];
    if (t) {
      await prisma.team.update({
        where: { id: team.id },
        data: {
          nameEn: t.nameEn,
          descriptionEn: t.descriptionEn
        }
      });
      console.log(`Updated ${team.name}`);
    }
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
