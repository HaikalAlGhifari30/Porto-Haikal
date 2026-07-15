const { PrismaClient } = require('@prisma/client');

async function testWithUrl(url) {
  console.log(`Testing Prisma connection with URL: ${url}`);
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: url
      }
    }
  });
  try {
    const start = Date.now();
    const result = await prisma.whatsAppAdmin.findMany();
    console.log(`Success! Retrieved ${result.length} admins in ${Date.now() - start}ms`);
  } catch (e) {
    console.error(`Failed: ${e.message}`);
  } finally {
    await prisma.$disconnect();
  }
}

async function run() {
  const currentUrl = "postgresql://neondb_owner:npg_Cq2McBlLH1pU@ep-aged-art-aou076y6-pooler.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";
  const directUrl = "postgresql://neondb_owner:npg_Cq2McBlLH1pU@ep-aged-art-aou076y6.ap-southeast-1.aws.neon.tech/neondb?sslmode=require";
  
  await testWithUrl(currentUrl);
  console.log("\n-------------------\n");
  await testWithUrl(directUrl);
}

run();
