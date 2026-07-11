const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const teamMembers = [
  // Eksekutif (Top 3)
  { order: 1, name: "Nama Komisaris", position: "Komisaris" },
  { order: 2, name: "Nama Direktur Utama", position: "Direktur Utama" },
  { order: 3, name: "Nama Direktur", position: "Direktur" },
  
  // Manajemen (Next 3)
  { order: 4, name: "Nama Manager Accounting", position: "Manager Accounting" },
  { order: 5, name: "Nama Manager Personalia", position: "Manager Personalia & Administrasion" },
  { order: 6, name: "Nama Manager Sales", position: "Manager Sales" },
  
  // Operasional 
  { order: 7, name: "Staf Finance", position: "Finance & Accounting" },
  { order: 8, name: "Staf HR & GA", position: "Human Resources & General Affairs" },
  { order: 9, name: "Staf SQO", position: "SQO (Sales Quality Officer)" },
  { order: 10, name: "SPV Sales", position: "SPV Sales" },
  { order: 11, name: "Staf Security", position: "Executive Security" },
  { order: 12, name: "Staf Sales", position: "Sales" }
];

async function main() {
  console.log("Seeding Team Members...");
  
  // Clear existing
  await prisma.teamMember.deleteMany({});
  
  // Insert
  for (const member of teamMembers) {
    await prisma.teamMember.create({
      data: member
    });
  }
  
  console.log("Seeding complete!");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
