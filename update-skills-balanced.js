const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const skillsData = [
  // Category 1: Frontend (Metodologi & Pengujian QA)
  { name: "QA Manual Testing", category: "Frontend", proficiency: 96, order: 1 },
  { name: "Test Case Design & Execution", category: "Frontend", proficiency: 95, order: 2 },
  { name: "Regression & Smoke Testing", category: "Frontend", proficiency: 94, order: 3 },
  { name: "EFM & Live Broadcast Review", category: "Frontend", proficiency: 92, order: 4 },

  // Category 2: Backend (Analisis Sistem & Pemodelan DFD/ERD)
  { name: "IT Business Analysis", category: "Backend", proficiency: 94, order: 5 },
  { name: "System Analysis", category: "Backend", proficiency: 92, order: 6 },
  { name: "ERD & DFD System Modeling", category: "Backend", proficiency: 90, order: 7 },
  { name: "Flowchart & BPMN Mapping", category: "Backend", proficiency: 94, order: 8 },

  // Category 3: Database (Perangkat Uji & Validasi API)
  { name: "Postman API Testing", category: "Database", proficiency: 88, order: 9 },
  { name: "Jira & Trello Bug Tracking", category: "Database", proficiency: 95, order: 10 },
  { name: "Figma & Draw.io Diagramming", category: "Database", proficiency: 90, order: 11 },
  { name: "MsWord & Google Sheets", category: "Database", proficiency: 95, order: 12 },

  // Category 4: Tools (Kepemimpinan & Soft Skills)
  { name: "Organizational Leadership", category: "Tools", proficiency: 96, order: 13 },
  { name: "Client Liaison & Communication", category: "Tools", proficiency: 95, order: 14 },
  { name: "Problem Solving & Critical Thinking", category: "Tools", proficiency: 95, order: 15 },
  { name: "Team Coordination & Collaboration", category: "Tools", proficiency: 94, order: 16 },
];

async function main() {
  console.log("Clearing existing skills...");
  await prisma.skill.deleteMany();

  console.log("Inserting balanced skills...");
  for (const s of skillsData) {
    await prisma.skill.create({ data: s });
  }

  console.log("Successfully updated database skills!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
