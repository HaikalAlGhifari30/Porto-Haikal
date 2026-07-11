const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("📊 Membaca data dari Struktur Organisasi...");
  
  // Ambil semua anggota dari tabel TeamMember
  const members = await prisma.teamMember.findMany({
    orderBy: { order: 'asc' }
  });
  
  console.log(`Ditemukan ${members.length} jabatan di SO.`);
  
  // Ekstrak divisi unik dari posisi jabatan (level manajemen dan operasional)
  // Kita ambil yang memiliki kata kunci divisi/departemen
  const divisionMap = [
    { 
      name: "Finance & Accounting", 
      slug: "finance-accounting",
      description: "Divisi yang bertanggung jawab atas pengelolaan keuangan, pembukuan, perpajakan, serta laporan keuangan perusahaan secara akurat dan transparan."
    },
    { 
      name: "Personalia & Administrasi", 
      slug: "personalia-administrasi",
      description: "Divisi yang menangani pengelolaan sumber daya manusia, administrasi kepegawaian, rekrutmen, serta pengembangan kompetensi karyawan."
    },
    { 
      name: "Sales & Marketing", 
      slug: "sales-marketing",
      description: "Divisi yang berfokus pada strategi penjualan, pengembangan pasar, serta membangun relasi bisnis dengan klien dan mitra perusahaan."
    },
    { 
      name: "Quality Control", 
      slug: "quality-control",
      description: "Divisi yang memastikan standar mutu layanan dan produk perusahaan terjaga melalui proses inspeksi, audit, dan peningkatan berkelanjutan."
    },
    { 
      name: "Security & General Affairs", 
      slug: "security-general-affairs",
      description: "Divisi yang bertanggung jawab atas keamanan lingkungan kerja, pengelolaan aset perusahaan, serta operasional urusan umum sehari-hari."
    },
  ];
  
  // Hapus data divisi lama (jika ada)
  const existingTeams = await prisma.team.findMany();
  if (existingTeams.length > 0) {
    console.log(`⚠️  Ditemukan ${existingTeams.length} divisi lama. Menghapus...`);
    // Delete members and positions first (cascade)
    await prisma.member.deleteMany({});
    await prisma.position.deleteMany({});
    await prisma.team.deleteMany({});
    console.log("✅ Data divisi lama berhasil dibersihkan.");
  }
  
  // Masukkan divisi baru
  console.log("\n🏗️  Memasukkan divisi dari Struktur Organisasi...\n");
  
  for (const div of divisionMap) {
    const created = await prisma.team.create({
      data: {
        name: div.name,
        slug: div.slug,
        description: div.description,
      }
    });
    console.log(`  ✅ ${created.name} (${created.slug})`);
  }
  
  console.log(`\n🎉 Selesai! ${divisionMap.length} divisi berhasil dimasukkan ke database.`);
  console.log("   Silakan refresh Landing Page Anda untuk melihat hasilnya.");
}

main()
  .catch(e => {
    console.error("❌ Error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
