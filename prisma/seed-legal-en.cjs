const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const termsTextEn = `Terms and Conditions of PT Rizki Rijaya Karya

By accessing the PT Rizki Rijaya Karya website, you are deemed to have read and agreed to the following terms:

Use of Information: All materials, logos, and content on this website are the rightful property of PT Rizki Rijaya Karya. Use of content for commercial purposes without written permission is prohibited.

Limitation of Liability: We strive to provide accurate information about our services (General Trading, Training Services, Leveransir). However, we are not responsible for any losses arising from the use of information on this site without formal business consultation with our representatives.

Changes to Services: PT Rizki Rijaya Karya reserves the right to update content, prices, or service details at any time without prior notice.

Governing Law: These terms and conditions are governed entirely by the laws applicable in the territory of the Republic of Indonesia.`;

const privacyTextEn = `Privacy Policy of PT Rizki Rijaya Karya

PT Rizki Rijaya Karya ("RRK", "we") greatly values your privacy. This policy explains how we collect, use, and protect the personal information you provide through our website.

Data Collected: We only collect information that you voluntarily provide, such as your name, email address, and phone number when you contact us via the contact form or WhatsApp.

Use of Data: The information we collect is used solely to respond to service requests, provide information related to our business sectors (General Trading, Training Services, Leveransir), and improve the quality of our services.

Data Security: We implement security measures to maintain the confidentiality of your data and will not share, sell, or rent your personal information to third parties without permission, unless required by law.

Contact: If you have questions regarding data privacy, please contact us at rizkyrijayakarya@gmail.com.`;

async function main() {
  const settings = await prisma.settings.findFirst();
  if (settings) {
    await prisma.settings.update({
      where: { id: settings.id },
      data: { termsTextEn, privacyTextEn },
    });
    console.log('✅ English legal texts seeded successfully.');
  } else {
    console.log('⚠️ No settings record found.');
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
