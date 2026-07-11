const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const s = await prisma.settings.findFirst();
  if (!s || !s.coreValues) return;
  
  let cv = typeof s.coreValues === 'string' ? JSON.parse(s.coreValues) : s.coreValues;
  
  // English translations for default values
  const translations = {
    "Integritas": {
      titleEn: "Integrity",
      descriptionEn: "Acting honestly and trustworthily in every business agreement."
    },
    "Kompeten": {
      titleEn: "Competent",
      descriptionEn: "Working expertly and professionally in their field."
    },
    "Inovatif": {
      titleEn: "Innovative",
      descriptionEn: "Continuing to innovate to provide the best solutions for consumers."
    },
    "Kolaboratif": {
      titleEn: "Collaborative",
      descriptionEn: "Building strong cooperation with all stakeholders."
    }
  };

  const updatedCv = cv.map(item => {
    if (translations[item.title]) {
      return { ...item, ...translations[item.title] };
    }
    return item;
  });

  await prisma.settings.update({
    where: { id: s.id },
    data: { coreValues: updatedCv }
  });
  console.log("Core values updated with English translations.");
}

main().finally(() => prisma.$disconnect());
