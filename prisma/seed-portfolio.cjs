const { PrismaClient } = require("@prisma/client");
const { scrypt, randomBytes } = require("node:crypto");
const { promisify } = require("node:util");

const scryptAsync = promisify(scrypt);
const prisma = new PrismaClient();

async function hashPassword(password) {
  const saltBytes = randomBytes(16);
  const salt = saltBytes.toString("hex");
  const normalized = password.normalize("NFKC");
  const key = await scryptAsync(normalized, salt, 64, {
    N: 16384,
    r: 16,
    p: 1,
    maxmem: 128 * 16384 * 16 * 2,
  });
  return `${salt}:${key.toString("hex")}`;
}

async function main() {
  console.log("🌱 Seeding Portfolio Database with FULL BILINGUAL CV DATA...\n");

  // 1. Admin User
  const email = "admin@haikalalghifari.dev";
  const password = "admin123";
  const name = "Haikal Al Ghifari, S.Kom";

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (!existingUser) {
    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        role: "admin",
        emailVerified: new Date(),
      },
    });
    await prisma.account.create({
      data: {
        accountId: user.id,
        providerId: "credential",
        userId: user.id,
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    console.log("✅ Admin account created:", email);
  }

  // 2. Settings (Official CV Details)
  await prisma.settings.deleteMany();
  await prisma.settings.create({
    data: {
      heroTitle: "Hi, Saya Haikal Al Ghifari",
      heroTitleEn: "Hi, I'm Haikal Al Ghifari",
      heroSubtitle: "Quality Assurance Engineer & IT Business Analyst",
      heroSubtitleEn: "Quality Assurance Engineer & IT Business Analyst",
      heroCtaText: "Lihat Portofolio QA",
      heroCtaTextEn: "View QA Portfolio",
      heroCtaLink: "#projects",
      aboutText: "Lulusan S1 Teknik Informatika UNIKOM (IPK 3.46) spesialis Quality Assurance, Business & System Analysis. Berpengalaman dalam pengujian manual web/mobile, pemodelan sistem (DFD/ERD), dan kepemimpinan organisasi sebagai mantan Ketua HMIF UNIKOM. Analitis, teliti, dan adaptif.",
      aboutTextEn: "Informatics Engineering graduate from UNIKOM (GPA 3.46) specializing in Quality Assurance, Business & System Analysis. Experienced in manual testing for web/mobile, system modeling (DFD/ERD), and organizational leadership as former Chairman of HMIF UNIKOM. Highly analytical, detail-oriented, and adaptive.",
      email: "alghifaribahren03@gmail.com",
      phone: "+62 813 880 583 31",
      instagram: "https://instagram.com/HaikalAlGhifari30",
      linkedin: "https://www.linkedin.com/in/haikalalghifari",
    },
  });
  console.log("✅ Settings seeded.");

  // 3. Projects (Exact 4 Projects)
  await prisma.project.deleteMany();
  await prisma.project.createMany({
    data: [
      {
        title: "Baroedak COMO — Fan Identity Web Portal",
        titleEn: "Baroedak COMO — Fan Identity Web Portal",
        slug: "baroedak-como",
        category: "Web Development",
        categoryEn: "Web Development",
        description: "Pengembangan platform web portal komunitas suporter Como 1907 yang dibangun dengan antarmuka modern, informasi tim, jadwal pertandingan, dan integrasi identitas digital.",
        descriptionEn: "Web portal platform for Como 1907 supporters community built with a modern interface, team info, match schedule, and digital identity integration.",
        problem: "Kebutuhan platform terpusat bagi komunitas pendukung Como 1907 dengan antarmuka responsif dan performa tinggi.",
        problemEn: "Need for a centralized platform for the Como 1907 supporter community with responsive interface and high performance.",
        solution: "Merancang dan membangun antarmuka web modern berbasis Next.js & React dengan struktur UI/UX yang elegan dan responsif di seluruh perangkat.",
        solutionEn: "Designed and built modern web interface powered by Next.js & React with elegant UI/UX architecture responsive across all devices.",
        role: "Full-Stack Web Developer",
        roleEn: "Full-Stack Web Developer",
        techStack: "Next.js, React, TypeScript, Tailwind CSS, REST API, Node.js",
        features: "Supporter Community Portal, Fan Identity Hub, Responsive UI/UX, Dynamic Content Integration",
        imageUrl: "/projects/baroedak-como.png",
        githubUrl: "https://github.com/HaikalAlGhifari30/baroedak-como",
        url: "https://baroedak-como.vercel.app/",
        order: 1,
        isVisible: true,
      },
      {
        title: "Audit & Pengujian QA 11 Sistem Digital Como 1907",
        titleEn: "Como 1907 — 11 Digital Systems QA Audit",
        slug: "como-11-systems-qa-audit",
        category: "QA & System Audit",
        categoryEn: "QA & System Audit",
        description: "Pengujian fungsionalitas menyeluruh, smoke testing, regression testing, dan audit aliran pengguna (user flow) pada 11 platform digital Como 1907 (Official Portal, Ticketing, VOD Streaming, Sent Entertainment, Curva Sud, EdVentura, Academy, Store, Access Control, Press, & Identity Hub).",
        descriptionEn: "End-to-end functional testing, smoke & regression testing, and user flow auditing for 11 Como 1907 digital platforms (Official Portal, Ticketing, VOD Streaming, Sent Entertainment, Curva Sud, EdVentura, Academy, Store, Access Control, Press, & Identity Hub).",
        problem: "Menjamin ketersediaan tinggi, keandalan transaksi tiket, keandalan VOD streaming, dan validasi fungsional lintas 11 ekosistem digital.",
        problemEn: "Ensuring high availability, ticketing transaction reliability, VOD streaming stability, and functional verification across 11 digital ecosystems.",
        solution: "Penyusunan test case terstruktur, eksekusi manual testing menyeluruh, pelaporan bug mendalam, dan verifikasi UAT bersama tim produk.",
        solutionEn: "Crafted structured test cases, executed thorough manual testing, logged detailed bug reports, and verified UAT sessions with product teams.",
        role: "QA Manual Tester EFM",
        roleEn: "QA Manual Tester EFM",
        techStack: "Manual Testing, EFM Field Monitoring, VOD Testing, Smoke & Regression Testing, Bug Tracking, Postman API",
        features: "11 Digital Systems Verification, VOD Streaming Performance Audit, Ticket Transaction Validation, UAT Session Audit Logs",
        imageUrl: "/projects/baroedak-como.png",
        githubUrl: "https://github.com/HaikalAlGhifari30/baroedak-como",
        url: "https://baroedak-como.vercel.app/",
        order: 2,
        isVisible: true,
      },
      {
        title: "Compro RRK — Corporate Web Profile",
        titleEn: "Compro RRK — Corporate Web Profile",
        slug: "compro-rrk",
        category: "Web Development",
        categoryEn: "Web Development",
        description: "Pengembangan website profil perusahaan korporat multi-bahasa (ID/EN) yang modern, responsif, dan terintegrasi dengan CMS untuk pengelolaan konten perusahaan.",
        descriptionEn: "Development of a modern, responsive multi-language (ID/EN) corporate web profile integrated with CMS for company content management.",
        problem: "Kebutuhan profil korporat profesional dengan performa muat cepat, alih bahasa instan, dan struktur UX yang ramah pengguna.",
        problemEn: "Need for a professional corporate profile with fast load performance, instant language switching, and user-friendly UX architecture.",
        solution: "Membangun web profil berbasis Next.js 16 & React 19 dengan dukungan i18n, desain glassmorphism modern, dan optimasi SEO.",
        solutionEn: "Built web profile powered by Next.js 16 & React 19 with i18n support, modern glassmorphism design, and SEO optimization.",
        role: "Full-Stack Web Developer",
        roleEn: "Full-Stack Web Developer",
        techStack: "Next.js 16, React 19, TypeScript, Tailwind CSS, i18n, CMS Integration",
        features: "Multi-Language Localization (ID/EN), Responsive Glassmorphism UX, Interactive Company Showcase, Fast SSR",
        imageUrl: "/projects/compro-rrk-landing.png,/projects/compro-rrk-dashboard.png",
        githubUrl: "https://github.com/HaikalAlGhifari30/Compro-rrk",
        url: "https://compro-rrk-nine.vercel.app/",
        order: 3,
        isVisible: true,
      },
      {
        title: "FinTrack — Personal Finance Tracker Application",
        titleEn: "FinTrack — Personal Finance Tracker Application",
        slug: "fintrack",
        category: "Web Development",
        categoryEn: "Web Development",
        description: "Pengembangan aplikasi manajemen & pelacakan keuangan pribadi dengan fitur pencatatan transaksi real-time, grafik alokasi anggaran, dan analisis pengeluaran multi-rekening.",
        descriptionEn: "Development of a personal finance management & tracking application featuring real-time transaction recording, budget allocation charts, and multi-account expense analytics.",
        problem: "Membantu pengguna mengelola keuangan harian, memantau alokasi dana multi-rekening, dan visualisasi anggaran secara akurat.",
        problemEn: "Helping users manage daily finances, track multi-account fund allocations, and visualize budgets accurately.",
        solution: "Mengembangkan aplikasi web responsif dengan grafik statistik interaktif, manajemen kategori anggaran, dan kalkulasi saldo otomatis.",
        solutionEn: "Developed responsive web application with interactive charts, budget category management, and automated balance calculation.",
        role: "Full-Stack Web Developer",
        roleEn: "Full-Stack Web Developer",
        techStack: "React, Node.js, Express, PostgreSQL, Tailwind CSS, Recharts, REST API",
        features: "Real-time Expense Tracker, Multi-Account Balance Audit, Interactive Budget Charts, Category Analytics",
        imageUrl: "/projects/fintrack-login.png,/projects/fintrack-dashboard.png",
        githubUrl: "https://github.com/HaikalAlGhifari30/finance-tracker",
        url: "https://finance-tracker-jade-two.vercel.app",
        order: 4,
        isVisible: true,
      },
      {
        title: "Silesin Combiphar — Sistem Lelang Mesin site Padalarang",
        titleEn: "Silesin Combiphar — Plant Machinery Auction System",
        slug: "silesin-combiphar",
        category: "Web Development",
        categoryEn: "Web Development",
        description: "Pengembangan Silesin (Sistem Lelang Mesin site Padalarang) untuk PT Combiphar Padalarang, memfasilitasi proses penawaran harga mesin pabrik dan aset perusahaan secara transparan, terstruktur, dan aman.",
        descriptionEn: "Development of Silesin (Plant Machinery Auction System site Padalarang) for PT Combiphar Padalarang, facilitating transparent, structured, and secure vendor bidding workflows for company machinery and assets.",
        problem: "Digitalisasi alur penawaran mesin pabrik dan verifikasi dokumen vendor PT Combiphar Padalarang agar berjalan aman dan akurat.",
        problemEn: "Digitizing plant machinery bidding workflows and vendor document verification for PT Combiphar Padalarang securely and accurately.",
        solution: "Merancang portal lelang berbasis web dengan verifikasi akses vendor, pencatatan histori penawaran real-time, dan manajemen inventaris mesin.",
        solutionEn: "Designed web auction portal with vendor access verification, real-time bidding history logging, and machinery inventory management.",
        role: "Full-Stack Web Developer",
        roleEn: "Full-Stack Web Developer",
        techStack: "PHP, MySQL, JavaScript, Bootstrap, Web Security, Real-Time Bidding Workflow",
        features: "Real-Time Bidding System, Machinery Inventory Management, Vendor Portal Access, Vendor Verification Audit",
        imageUrl: "/projects/silesin-login.png,/projects/silesin-dashboard.png",
        githubUrl: "https://github.com/HaikalAlGhifari30/lelang-mesin",
        url: "https://github.com/HaikalAlGhifari30/lelang-mesin",
        order: 5,
        isVisible: true,
      },
    ],
  });

  // 4. Skills & Tools
  await prisma.skill.deleteMany();
  await prisma.skill.createMany({
    data: [
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
    ],
  });

  // 5. Work Experiences (Bilingual ID & EN)
  await prisma.experience.deleteMany();
  await prisma.experience.createMany({
    data: [
      {
        position: "QA Manual Tester EFM",
        positionEn: "QA Manual Tester EFM",
        company: "COMO 1907 - Global Media Visual",
        companyEn: "COMO 1907 - Global Media Visual",
        period: "Apr 2026 — Sekarang · Jakarta, Indonesia",
        periodEn: "Apr 2026 — Present · Jakarta, Indonesia",
        description: "• Melakukan pengujian regresi (regression testing), pengujian asap (smoke testing), dan UAT di berbagai platform digital, termasuk layanan web, seluler, streaming, dan media.\n• Melakukan manual testing, validasi formulir, serta verifikasi alur pengguna dari hulu ke hilir (end-to-end user flow) pada aplikasi web dan seluler.\n• Memantau fungsionalitas platform, responsivitas, kemudahan penggunaan (usability), dan pengalaman pengguna secara menyeluruh pada berbagai layanan digital.\n• Meninjau performa VOD (Video on Demand) dan siaran langsung untuk memastikan stabilitas, aksesibilitas, dan kualitas konten.\n• Mengidentifikasi, mendokumentasikan, melacak, dan melaporkan bug serta berkoordinasi dengan pengembang dan tim terkait untuk penyelesaian yang tepat waktu.\n• Mengumpulkan umpan balik pengguna akhir serta menyusun laporan pemantauan QA untuk mendukung peningkatan produk dan layanan.\n• Mendukung kegiatan validasi penyebaran (deployment), pemantauan pasca-rilis, dan kolaborasi QA lintas fungsi.",
        descriptionEn: "• Conduct regression, smoke, and UAT testing across multiple digital platforms, including web, mobile, streaming, and media services.\n• Perform manual testing, form validation, and end-to-end user flow verification for web and mobile applications.\n• Monitor platform functionality, responsiveness, usability, and overall user experience across various digital services.\n• Review VOD and live broadcast performance to ensure stability, accessibility, and content quality.\n• Identify, document, track, and report bugs while coordinating with developers and related teams for timely resolution.\n• Collect end-user feedback and prepare QA monitoring reports to support product and service improvements.\n• Support deployment validation, post-release monitoring, and cross-functional QA collaboration activities.",
        technologies: "Regression Testing, Smoke Testing, UAT, Manual Testing, VOD Review, Bug Tracking, Post-Release Monitoring",
        order: 1,
      },
      {
        position: "QA Manual Tester",
        positionEn: "QA Manual Tester",
        company: "PT Artristik Studio Bandung",
        companyEn: "PT Artristik Studio Bandung",
        period: "Feb 2025 — Feb 2026 · Bandung, Indonesia",
        periodEn: "Feb 2025 — Feb 2026 · Bandung, Indonesia",
        description: "• Melakukan pengujian manual untuk aplikasi seluler dan web untuk memastikan fungsionalitas, stabilitas, dan pengalaman pengguna.\n• Menganalisis fitur, mengidentifikasi bug/masalah, serta melakukan pengujian ulang dan pengujian regresi bersama klien dan pemangku kepentingan.\n• Mendokumentasikan bug dan berkoordinasi dengan pengembang untuk memastikan perbaikan yang tepat waktu.\n• Mengomunikasikan kemajuan proyek dan mengumpulkan persyaratan fitur tambahan dari klien.\n• Memberikan rekomendasi untuk peningkatan, perubahan logika, dan fitur baru berdasarkan hasil pengujian dan kebutuhan pengguna.\n• Bertindak sebagai penghubung (liaison) antara klien dan tim teknis untuk menjaga komunikasi yang efektif.\n• Mengendalikan dan melaksanakan sesi UAT dengan pihak DJK untuk sistem LIT NON-TR.",
        descriptionEn: "• Conducted manual testing for mobile and web applications to ensure functionality, stability, and user experience.\n• Analyzed features, identified bugs/issues, and performed regression and retesting with clients and stakeholders.\n• Documented bugs and coordinated with developers to ensure timely fixes.\n• Communicated project progress and gathered additional feature requirements from clients.\n• Provided recommendations for improvements, logic changes, and new features based on testing results and user needs.\n• Acted as a liaison between clients and the technical team to maintain effective communication.\n• Conducted UAT sessions with DJK for the LIT NON-TR system.",
        technologies: "Manual Testing, Client Liaison, Bug Documentation, UAT Sessions with DJK (LIT NON-TR), Feature Requirement Gathering",
        order: 2,
      },
      {
        position: "Volunteer",
        positionEn: "Volunteer",
        company: "By.U X Menjadi Manusia",
        companyEn: "By.U X Menjadi Manusia",
        period: "Mar 2025 — Mar 2025 · Jakarta, Indonesia",
        periodEn: "Mar 2025 — Mar 2025 · Jakarta, Indonesia",
        description: "• Menyambut dan membantu pengunjung di stan (booth).\n• Memberikan informasi tentang kegiatan dan program di booth by.U x Menjadi Manusia.\n• Mendukung dan mengoordinasikan kegiatan booth selama acara berlangsung.",
        descriptionEn: "• Welcomed and assisted visitors at the booth.\n• Provided information about activities and programs at the by.U x Menjadi Manusia booth.\n• Supported and coordinated booth activities during the event.",
        technologies: "Public Relations, Event Coordination, Visitor Assistance",
        order: 3,
      },
      {
        position: "Staff Intern",
        positionEn: "Staff Intern",
        company: "KPU Provinsi Jawa Barat",
        companyEn: "KPU Provinsi Jawa Barat",
        period: "Sep 2023 — Oct 2023 · Bandung, Indonesia",
        periodEn: "Sep 2023 — Oct 2023 · Bandung, Indonesia",
        description: "• Membantu Divisi SDM dalam rekapitulasi pendaftaran anggota PPPK KPU Jabar.\n• Membantu Divisi Keuangan dalam mengelola dan mencatat data keuangan KPU Jawa Barat.",
        descriptionEn: "• Assisted the HR Division in the registration recapitulation of PPPK KPU Jabar members.\n• Assisted the Finance Division in managing and recording financial data for KPU West Java.",
        technologies: "Data Recapitulation, HR Support, Finance Recording",
        order: 4,
      },
      {
        position: "Campus Ambassador",
        positionEn: "Campus Ambassador",
        company: "Danacita",
        companyEn: "Danacita",
        period: "Jun 2022 — Sep 2023 · Bandung, Indonesia",
        periodEn: "Jun 2022 — Sep 2023 · Bandung, Indonesia",
        description: "• Membantu mempromosikan program Danacita di lingkungan Universitas Komputer Indonesia (UNIKOM).\n• Mendukung Community PIC dalam merangkul organisasi mahasiswa di UNIKOM untuk berpartisipasi dalam program Danacita.\n• Membantu Danacita dalam mengorganisasi dan mendukung acara yang diselenggarakan di UNIKOM dan wilayah Bandung.\n• Mendukung keberhasilan inisiatif Danacita di berbagai kampus di wilayah Bandung.",
        descriptionEn: "• Assisted in promoting Danacita programs within the Universitas Komputer Indonesia (UNIKOM) environment.\n• Supported the Community PIC in engaging student organizations at UNIKOM to participate in Danacita programs.\n• Assisted Danacita in organizing and supporting events held at UNIKOM and across Bandung.\n• Supported the success of Danacita initiatives across various campuses in the Bandung area.",
        technologies: "Campus Promotion, Community Engagement, Event Management",
        order: 5,
      },
    ],
  });

  // 6. Education (Bilingual ID & EN)
  await prisma.education.deleteMany();
  await prisma.education.createMany({
    data: [
      {
        institution: "Universitas Komputer Indonesia (UNIKOM)",
        institutionEn: "Universitas Komputer Indonesia (UNIKOM)",
        degree: "S1 Teknik Informatika (S.Kom) — IPK 3.46",
        degreeEn: "Bachelor of Informatics Engineering (S.Kom) — GPA: 3.46",
        period: "Sep 2020 — Feb 2025 · Bandung, Indonesia",
        periodEn: "Sep 2020 — Feb 2025 · Bandung, Indonesia",
        description: "Bidang Minat Utama: Quality Assurance, IT Business Analyst, System Analyst, UI/UX.\nJudul Skripsi: \"Sistem Penentuan Jumlah Pembelian Produk pada Arbie Snack Menggunakan Metode Single Exponential Smoothing\"",
        descriptionEn: "Key Interests: Quality Assurance, IT Business Analyst, System Analyst, UI/UX.\nThesis: \"Product Purchase Quantity Determination System at Arbie Snack Using the Single Exponential Smoothing Method\"",
        order: 1,
      },
      {
        institution: "SMAN 3 Karawang Barat",
        institutionEn: "SMAN 3 Karawang Barat",
        degree: "SMA / Sederajat — Jurusan IPA",
        degreeEn: "Senior High School — Science Major (IPA)",
        period: "2017 — 2020 · Karawang, Indonesia",
        periodEn: "2017 — 2020 · Karawang, Indonesia",
        description: "Fokus studi pada ilmu pengetahuan alam (IPA), Matematika, dan Fisika.",
        descriptionEn: "Focused studies in Natural Sciences (IPA), Mathematics, and Physics.",
        order: 2,
      },
    ],
  });

  // 7. Organizational Experience (Bilingual ID & EN)
  await prisma.organization.deleteMany();
  await prisma.organization.createMany({
    data: [
      {
        role: "Ketua Umum",
        roleEn: "Chairperson",
        name: "Himpunan Mahasiswa Teknik Informatika (HMIF UNIKOM)",
        nameEn: "Himpunan Mahasiswa Teknik Informatika (HMIF UNIKOM)",
        period: "Nov 2022 — Nov 2023",
        periodEn: "Nov 2022 — Nov 2023",
        description: "• Merencanakan dan mengawasi struktur organisasi untuk seluruh anggota fungsional HMIF UNIKOM.\n• Mengawasi pelaksanaan dan evaluasi laporan kerja berkala untuk setiap divisi.\n• Merumuskan kebijakan umum serta pedoman internal dan eksternal organisasi.\n• Memegang tanggung jawab penuh atas kinerja divisi sesuai Garis Besar Haluan Organisasi (GBHO).",
        descriptionEn: "• Planned and supervised the organizational structure for HMIF UNIKOM functional members.\n• Oversaw the execution and evaluation of work reports for every division.\n• Formulated general and global policies regarding internal and external organizational interests.\n• Held ultimate responsibility for divisional performance according to the Organization's General Guidelines (GBHO).",
        order: 1,
      },
      {
        role: "Kepala Divisi PAO",
        roleEn: "Head of PAO Division",
        name: "Forum Komunikasi Mahasiswa Teknik dan Ilmu Komputer - UNIKOM",
        nameEn: "Forum Komunikasi Mahasiswa Teknik dan Ilmu Komputer - UNIKOM",
        period: "Nov 2021 — Dec 2022",
        periodEn: "Nov 2021 — Dec 2022",
        description: "• Memimpin dan mengoordinasikan kegiatan divisi untuk mengembangkan kualitas sumber daya manusia internal.\n• Menyusun dan mengevaluasi program kerja bulanan, termasuk pelatihan kaderisasi dan pengembangan kinerja anggota.\n• Memberikan bimbingan, pengawasan, serta pengarahan bagi anggota divisi dan seluruh pengurus FKMTIK.\n• Menyelesaikan permasalahan internal organisasi serta mengidentifikasi isu-isu strategis organisasi.",
        descriptionEn: "• Led and coordinated division activities to develop the quality of internal human resources.\n• Developed and evaluated monthly work programs, including regeneration training and performance development.\n• Provided guidance, supervision, and coaching for division members and the wider FKMTIK membership.\n• Resolved internal organizational issues and identified strategic issues affecting performance.",
        order: 2,
      },
    ],
  });

  console.log("\n🎉 Portfolio Database Seeding Completed with FULL BILINGUAL ID & EN DATA!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
