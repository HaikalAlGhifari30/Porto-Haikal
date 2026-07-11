const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const termsText = `Syarat dan Ketentuan Layanan PT Rizki Rijaya Karya

Dengan mengakses situs web PT Rizki Rijaya Karya, Anda dianggap telah membaca dan menyetujui syarat berikut:

Penggunaan Informasi: Seluruh materi, logo, dan konten yang terdapat dalam situs web ini adalah milik sah PT Rizki Rijaya Karya. Penggunaan konten untuk tujuan komersial tanpa izin tertulis dilarang.

Batasan Tanggung Jawab: Kami berupaya memberikan informasi akurat mengenai layanan kami (Perdagangan Umum, Jasa Kepelatihan, Leveransir). Namun, kami tidak bertanggung jawab atas kerugian apa pun yang timbul akibat penggunaan informasi di situs ini tanpa konsultasi bisnis formal dengan perwakilan kami.

Perubahan Layanan: PT Rizki Rijaya Karya berhak sewaktu-waktu memperbarui konten, harga, atau detail layanan tanpa pemberitahuan sebelumnya.

Hukum yang Berlaku: Syarat dan ketentuan ini diatur sepenuhnya oleh hukum yang berlaku di wilayah Negara Kesatuan Republik Indonesia.`;

const privacyText = `Kebijakan Privasi PT Rizki Rijaya Karya

PT Rizki Rijaya Karya ("RRK", "kami") sangat menghargai privasi Anda. Kebijakan ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi pribadi yang Anda berikan melalui situs web kami.

Data yang Dikumpulkan: Kami hanya mengumpulkan informasi yang Anda berikan secara sukarela, seperti nama, alamat email, dan nomor telepon saat Anda menghubungi kami melalui formulir kontak atau WhatsApp.

Penggunaan Data: Informasi yang kami kumpulkan digunakan semata-mata untuk merespons permintaan layanan, memberikan informasi terkait bidang usaha kami (Perdagangan Umum, Jasa Kepelatihan, Leveransir), dan meningkatkan kualitas layanan kami.

Keamanan Data: Kami menerapkan langkah-langkah keamanan untuk menjaga kerahasiaan data Anda dan tidak akan membagikan, menjual, atau menyewakan informasi pribadi Anda kepada pihak ketiga tanpa izin, kecuali diwajibkan oleh hukum.

Kontak: Jika Anda memiliki pertanyaan mengenai privasi data, silakan hubungi kami di rizkyrijayakarya@gmail.com.`;

async function main() {
  const settings = await prisma.settings.findFirst();
  if (settings) {
    await prisma.settings.update({
      where: { id: settings.id },
      data: { termsText, privacyText },
    });
    console.log('✅ Legal texts updated successfully.');
  } else {
    console.log('⚠️  No settings record found. Creating one...');
    await prisma.settings.create({
      data: {
        heroTitle: 'PT Rizki Rijaya Karya',
        heroSubtitle: 'Sinergi untuk Pertumbuhan Berkelanjutan',
        heroCtaText: 'Lihat Proyek',
        heroCtaLink: '#projects',
        termsText,
        privacyText,
      },
    });
    console.log('✅ Settings with legal texts created.');
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
