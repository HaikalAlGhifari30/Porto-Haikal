const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const s = await prisma.settings.findFirst();
  console.log(JSON.stringify(s.coreValues, null, 2));
}
main().finally(() => prisma.$disconnect());
