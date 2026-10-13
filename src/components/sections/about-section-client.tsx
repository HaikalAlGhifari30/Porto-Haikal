"use client";

import { useState, useEffect } from "react";
import { useSafeLang } from "@/store/lang";
import { UserCheck, GraduationCap, ShieldCheck, Target, Users, Calendar, CheckCircle2, Award, BookOpen, ChevronLeft, ChevronRight, Eye, X, ExternalLink, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface AboutSectionClientProps {
  settings?: any;
  educations?: any[];
  certificates?: any[];
  organizations?: any[];
  onNavigateScene?: (index: number) => void;
}

export function AboutSectionClient({
  settings,
  educations = [],
  certificates = [],
  organizations = [],
  onNavigateScene,
}: AboutSectionClientProps) {
  const { lang, t } = useSafeLang();
  const isEn = lang === "en";
  const [activeTab, setActiveTab] = useState<"intro" | "education" | "certificates" | "organization">("intro");
  const [eduPage, setEduPage] = useState(0);
  const [certPage, setCertPage] = useState(0);
  const [selectedCert, setSelectedCert] = useState<any | null>(null);
  const [activeCertPage, setActiveCertPage] = useState<number>(1);

  // Prevent landing page background scrolling when modal is open
  useEffect(() => {
    if (selectedCert) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedCert]);

  const bioText = isEn
    ? (settings?.aboutTextEn || "Informatics Engineering graduate from UNIKOM dedicated as a Quality Assurance Engineer, currently actively working at COMO 1907 (Global Media Visual). Highly experienced in web & mobile manual testing, end-to-end user flow verification, regression, and system modeling. Former Chairman of HMIF UNIKOM with strong leadership, analytical precision, and adaptability.")
    : (settings?.aboutText || "Lulusan S1 Teknik Informatika UNIKOM yang berdedikasi tinggi sebagai Quality Assurance Engineer, dan saat ini sedang aktif bekerja di COMO 1907 (Global Media Visual). Berpengalaman dalam pengujian manual web & mobile, verifikasi alur pengguna end-to-end, regresi, serta pemodelan sistem. Memiliki pengalaman kepemimpinan sebagai mantan Ketua HMIF UNIKOM yang analitis, teliti, dan adaptif.");

  const highlightCards = [
    {
      icon: <GraduationCap className="w-5 h-5 text-cyan-400" />,
      title: isEn ? "Education & Academic" : "Lulusan S1 Teknik Informatika",
      desc: isEn
        ? "Bachelor of Informatics Engineering (S.Kom) from UNIKOM."
        : "Gelar S1 Teknik Informatika UNIKOM dengan fondasi ilmu komputer yang kuat.",
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-cyan-400" />,
      title: isEn ? "Manual & Functional Testing" : "Manual & Functional Testing",
      desc: isEn
        ? "Structured test case design, boundary value analysis, regression, smoke, and UAT."
        : "Perancangan test case terstruktur, analisis nilai batas, verifikasi regresi, smoke, dan UAT.",
    },
    {
      icon: <Target className="w-5 h-5 text-emerald-400" />,
      title: isEn ? "Client & Team Collaboration" : "Kolaborasi Klien & Tim",
      desc: isEn
        ? "Liaison between technical teams and clients, conducting UAT sessions with DJK for LIT NON-TR."
        : "Penghubung tim teknis & klien, serta memimpin sesi UAT bersama DJK untuk sistem LIT NON-TR.",
    },
  ];

  const defaultEducations = [
    {
      institution: "Universitas Komputer Indonesia (UNIKOM)",
      institutionEn: "Indonesia Computer University (UNIKOM)",
      degree: "S1 Teknik Informatika (S.Kom)",
      degreeEn: "Bachelor of Informatics Engineering (S.Kom)",
      period: "Sep 2020 — Feb 2025 · Bandung",
      periodEn: "Sep 2020 — Feb 2025 · Bandung, Indonesia",
      description: "Fokus Utama: Quality Assurance, IT Business Analyst, System Analyst, UI/UX.\nSkripsi: \"Sistem Penentuan Jumlah Pembelian Produk pada Arbie Snack Menggunakan Metode Single Exponential Smoothing\"",
      descriptionEn: "Key Interests: Quality Assurance, IT Business Analyst, System Analyst, UI/UX.\nThesis: \"Product Purchase Quantity Determination System at Arbie Snack Using the Single Exponential Smoothing Method\"",
      logo: "/logo_unikom.png",
    },
    {
      institution: "SMAN 3 Karawang Barat",
      institutionEn: "SMAN 3 Karawang Barat",
      degree: "SMA / Sederajat — Jurusan IPA",
      degreeEn: "Senior High School — Science Major (IPA)",
      period: "2017 — 2020 · Karawang",
      periodEn: "2017 — 2020 · Karawang, Indonesia",
      description: "Fokus studi pada ilmu pengetahuan alam (IPA), Matematika, dan Fisika.",
      descriptionEn: "Focused studies in Natural Sciences (IPA), Mathematics, and Physics.",
      logo: "/education/sman3karawang.png",
    },
    {
      institution: "SMPN 3 Karawang Barat",
      institutionEn: "SMPN 3 Karawang Barat",
      degree: "SMP / Sederajat",
      degreeEn: "Junior High School",
      period: "2014 — 2017 · Karawang",
      periodEn: "2014 — 2017 · Karawang, Indonesia",
      description: "Pendidikan Sekolah Menengah Pertama dengan pembentukan dasar akademis, logika, dan ilmu pengetahuan umum.",
      descriptionEn: "Junior High School education focusing on academic foundation, logic, and general science.",
      logo: "/education/smpn3karawang.jpg",
    },
    {
      institution: "SDN Karangpawitan I Karawang",
      institutionEn: "SDN Karangpawitan I Karawang",
      degree: "SD / Sederajat",
      degreeEn: "Elementary School",
      period: "2008 — 2014 · Karawang",
      periodEn: "2008 — 2014 · Karawang, Indonesia",
      description: "Pendidikan Sekolah Dasar dengan pembentukan dasar literasi, matematika, dan karakter umum.",
      descriptionEn: "Elementary School education forming fundamental literacy, mathematics, and character.",
      logo: "/education/sdnkarangpawitan1.jpg",
    },
  ];

  const defaultCertificates = [
    {
      title: isEn ? "Junior Web Developer (BNSP Certified)" : "Pengembang Web Pratama (Junior Web Developer)",
      titleEn: "Junior Web Developer (BNSP Certified)",
      issuer: isEn ? "Indonesian Professional Certification Authority (BNSP) — LSP Teknologi Digital" : "Badan Nasional Sertifikasi Profesi (BNSP) — LSP Teknologi Digital",
      issuerEn: "Indonesian Professional Certification Authority (BNSP) — LSP Teknologi Digital",
      period: "20 Mar 2025 — 2028",
      periodEn: "20 Mar 2025 — 2028",
      description: isEn
        ? "Official National Competency Certificate from BNSP & LSP Teknologi Digital (Reg. No. TIK 1565 20938 2025). Certified competent in 6 unit competencies: User Interface Implementation, Text/Graphics/Multimedia Programming, Neat Code Architecture, Best Practices & Guidelines, Structured Programming, and Library Usage."
        : "Sertifikat Kompetensi Resmi BNSP & LSP Teknologi Digital (No. Reg. TIK 1565 20938 2025). Teruji kompeten pada 6 unit kompetensi: Implementasi User Interface, Pemrograman Text/Grafik/Multimedia, Struktur Kode Rapih, Best Practices & Guidelines, Pemrograman Terstruktur, serta Penggunaan Library.",
      descriptionEn: "Official National Competency Certificate from BNSP & LSP Teknologi Digital (Reg. No. TIK 1565 20938 2025). Certified competent in 6 unit competencies: User Interface Implementation, Text/Graphics/Multimedia Programming, Neat Code Architecture, Best Practices & Guidelines, Structured Programming, and Library Usage.",
      badge: isEn ? "BNSP National Competency" : "Sertifikasi Kompetensi BNSP",
      badgeEn: "BNSP National Competency",
      imageUrl: "/uploads/certificates/bnsp-junior-web-developer-certificate.png",
      secondaryImageUrl: "/uploads/certificates/bnsp-junior-web-developer-units.png",
    },
    {
      title: isEn ? "English Proficiency Test (Score: 407)" : "Tes Kemahiran Bahasa Inggris (Skor: 407)",
      titleEn: "English Proficiency Test (Score: 407)",
      issuer: "UNIKOM Language Center — Universitas Komputer Indonesia",
      issuerEn: "UNIKOM Language Center — Universitas Komputer Indonesia",
      period: "9 Nov 2024 — Nov 2026",
      periodEn: "9 Nov 2024 — Nov 2026",
      description: isEn
        ? "Official English Proficiency Test Certificate from UNIKOM Language Center (No: 11.24.03177). Total Score: 407 (Listening: 44, Structure & Written Expression: 36, Reading Comprehension: 42)."
        : "Sertifikat tes kemahiran bahasa Inggris resmi dari UNIKOM Language Center (No. Reg. 11.24.03177). Skor Total: 407 (Listening: 44, Structure & Written Expression: 36, Reading Comprehension: 42).",
      descriptionEn: "Official English Proficiency Test Certificate from UNIKOM Language Center (No: 11.24.03177). Total Score: 407 (Listening: 44, Structure & Written Expression: 36, Reading Comprehension: 42).",
      badge: isEn ? "English Proficiency Test" : "Tes Kemahiran Bahasa Inggris",
      badgeEn: "English Proficiency Test",
      imageUrl: "/uploads/certificates/unikom-english-proficiency-test.png",
    },
    {
      title: "CCNAv7: Introduction to Networks",
      titleEn: "CCNAv7: Introduction to Networks",
      issuer: "Cisco Networking Academy",
      issuerEn: "Cisco Networking Academy",
      period: "15 Feb 2023",
      periodEn: "15 Feb 2023",
      description: isEn
        ? "Official Completion Certificate from Cisco Networking Academy program signed by Director Lynn Bloomer. Mastered computer network architecture, data communication protocols, IPv4/IPv6 subnetting, ethernet switching, and network security fundamentals."
        : "Sertifikat Kelulusan Resmi Cisco Networking Academy disahkan oleh Director Lynn Bloomer. Menguasai arsitektur jaringan komputer, protokol komunikasi data, subnetting IPv4/IPv6, ethernet switching, serta fondasi keamanan jaringan.",
      descriptionEn: "Official Completion Certificate from Cisco Networking Academy program signed by Director Lynn Bloomer. Mastered computer network architecture, data communication protocols, IPv4/IPv6 subnetting, ethernet switching, and network security fundamentals.",
      badge: isEn ? "Cisco Certified" : "Sertifikasi Resmi Cisco",
      badgeEn: "Cisco Certified",
      imageUrl: "/uploads/certificates/cisco-ccnav7-certificate.png",
    },
    {
      title: isEn ? "MSIB Batch 4: Independent Study Android Mobile Development" : "MSIB Batch 4: Studi Independen Android Mobile Development",
      titleEn: "MSIB Batch 4: Independent Study Android Mobile Development",
      issuer: "Kampus Merdeka (MSIB) & Infinite Learning",
      issuerEn: "Kampus Merdeka (MSIB) & Infinite Learning",
      period: "16 Feb — 30 Jun 2023",
      periodEn: "16 Feb — 30 Jun 2023",
      description: isEn
        ? "Official Certified Independent Study Program Certificate (MSIB Kampus Merdeka) Batch 4 on Android Mobile Application Development at Infinite Learning (No: 257/IL-SIB/VII/2023). Mastered Kotlin Programming, UI/UX Prototyping, Android Studio, Cloud Computing & Cybersecurity."
        : "Sertifikat kelulusan resmi Studi Independen Bersertifikat (MSIB Kampus Merdeka) Batch 4 bidang Android Mobile Application Development di Infinite Learning (No: 257/IL-SIB/VII/2023). Menguasai Pemrograman Kotlin, UI/UX Prototyping, Android Studio, Cloud Computing & Cybersecurity.",
      descriptionEn: "Official Certified Independent Study Program Certificate (MSIB Kampus Merdeka) Batch 4 on Android Mobile Application Development at Infinite Learning (No: 257/IL-SIB/VII/2023). Mastered Kotlin Programming, UI/UX Prototyping, Android Studio, Cloud Computing & Cybersecurity.",
      badge: "MSIB Kampus Merdeka",
      badgeEn: "MSIB Kampus Merdeka",
      imageUrl: "/uploads/certificates/msib-infinite-learning-android-certificate.png",
      secondaryImageUrl: "/uploads/certificates/msib-infinite-learning-android-transcript-1.png",
    },
  ];

  const defaultOrgs = [
    {
      role: isEn ? "Chairperson" : "Ketua Umum",
      name: "Himpunan Mahasiswa Teknik Informatika (HMIF UNIKOM)",
      period: "Nov 2022 — Nov 2023",
      bullets: isEn
        ? [
            "Supervised organizational structure and functional members of HMIF UNIKOM.",
            "Formulated general guidelines and internal/external policies.",
            "Held ultimate leadership responsibility for divisional performance.",
          ]
        : [
            "Merencanakan dan mengawasi struktur fungsional HMIF UNIKOM.",
            "Merumuskan kebijakan umum serta pedoman internal & eksternal organisasi.",
            "Memegang tanggung jawab kepemimpinan penuh atas kinerja divisi (GBHO).",
          ],
    },
    {
      role: isEn ? "Head of PAO Division" : "Kepala Divisi PAO",
      name: "Forum Komunikasi Mahasiswa Teknik dan Ilmu Komputer - UNIKOM",
      period: "Nov 2021 — Dec 2022",
      bullets: isEn
        ? [
            "Led division activities to develop internal human resource capabilities.",
            "Formulated and evaluated monthly work programs and regeneration training.",
            "Resolved internal organizational issues and strategic challenges.",
          ]
        : [
            "Memimpin kegiatan divisi untuk meningkatkan kualitas sumber daya manusia.",
            "Menyusun dan mengevaluasi program kerja bulanan serta pelatihan kaderisasi.",
            "Menyelesaikan isu-isu strategis dan permasalahan internal organisasi.",
          ],
    },
  ];

  const eduItems = educations.length > 0 ? educations : defaultEducations;
  const certItems = certificates.length > 0 ? certificates : defaultCertificates;
  const orgItems = organizations.length > 0 ? organizations : defaultOrgs;
  const getModalPagesList = (cert: any) => {
    if (!cert) return [];
    const isMSIB = cert.title?.includes("MSIB") || cert.issuer?.includes("Infinite Learning");
    if (isMSIB) {
      return [
        { page: 1, label: isEn ? "Page 1: Certificate" : "Hal 1: Sertifikat Utama", url: "/uploads/certificates/msib-infinite-learning-android-certificate.png" },
        { page: 2, label: isEn ? "Page 2: Soft Skills" : "Hal 2: Soft Skill", url: "/uploads/certificates/msib-infinite-learning-android-transcript-1.png" },
        { page: 3, label: isEn ? "Page 3: Hard Skills 1" : "Hal 3: Hard Skill 1", url: "/uploads/certificates/msib-infinite-learning-android-transcript-2.png" },
        { page: 4, label: isEn ? "Page 4: Hard Skills 2" : "Hal 4: Hard Skill 2", url: "/uploads/certificates/msib-infinite-learning-android-transcript-3.png" },
        { page: 5, label: isEn ? "Page 5: Hard Skills 3" : "Hal 5: Hard Skill 3", url: "/uploads/certificates/msib-infinite-learning-android-transcript-4.png" },
      ];
    }
    return [
      ...(cert.imageUrl ? [{ page: 1, label: isEn ? "Page 1: Certificate" : "Hal 1: Sertifikat Utama", url: cert.imageUrl }] : []),
      ...(cert.secondaryImageUrl ? [{
        page: 2,
        label: cert.title?.includes("BNSP") || cert.issuer?.includes("BNSP")
          ? (isEn ? "Page 2: Competency Units" : "Hal 2: Unit Kompetensi")
          : (isEn ? "Page 2: Attachment" : "Hal 2: Lampiran"),
        url: cert.secondaryImageUrl
      }] : [])
    ];
  };

  const modalPagesList = getModalPagesList(selectedCert);
  const currentModalObj = modalPagesList.find((p) => p.page === activeCertPage) || modalPagesList[0] || { url: selectedCert?.imageUrl, page: 1 };
  const currentModalImgUrl = currentModalObj.url;

  return (
    <section className="w-full max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6 flex flex-col justify-center items-center text-zinc-900 dark:text-white">
      {/* Header */}
      <div className="w-full max-w-3xl space-y-2.5 mb-6 text-center mx-auto px-2 shrink-0">
        <div className="inline-block px-3.5 py-1.5 bg-[#FACC15] border-2 border-black dark:border-white shadow-retro-sm text-black font-pixel text-xs uppercase font-bold tracking-wider">
          PLAYER PROFILE // STATS
        </div>
        <h2 className="text-3xl sm:text-5xl font-pixel font-black tracking-tight text-black dark:text-white uppercase">
          {t('section.about')}
        </h2>
        <p className="font-sans text-sm sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed font-medium max-w-2xl mx-auto px-2 break-words">
          {isEn
            ? "Personal background, academic foundation, certifications, and leadership journey"
            : "Latar belakang pribadi, fondasi akademik, sertifikasi, serta perjalanan organisasi"}
        </p>

        {/* 8-Bit Sub-Navigation Tabs */}
        <div className="w-full grid grid-cols-2 sm:flex sm:items-center sm:justify-center gap-1.5 sm:gap-2.5 max-w-md sm:max-w-none mx-auto pt-2 sm:pt-3 px-1">
          <button
            onClick={() => setActiveTab("intro")}
            className={cn(
              "w-full sm:w-auto px-2 sm:px-4 lg:px-6 py-2 sm:py-2.5 lg:py-3 text-[10px] min-[400px]:text-[11px] sm:text-xs lg:text-sm font-sans font-black uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5 sm:gap-2 shrink-0 whitespace-nowrap border-2 border-black dark:border-white btn-retro",
              activeTab === "intro"
                ? "bg-[#FACC15] text-black shadow-retro-sm"
                : "bg-white dark:bg-[#151B22] text-black dark:text-white shadow-retro-xs hover:bg-yellow-50 dark:hover:bg-zinc-800"
            )}
          >
            <UserCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <span>{isEn ? "INTRO" : "PROFIL"}</span>
          </button>

          <button
            onClick={() => setActiveTab("education")}
            className={cn(
              "w-full sm:w-auto px-2 sm:px-4 lg:px-6 py-2 sm:py-2.5 lg:py-3 text-[10px] min-[400px]:text-[11px] sm:text-xs lg:text-sm font-sans font-black uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5 sm:gap-2 shrink-0 whitespace-nowrap border-2 border-black dark:border-white btn-retro",
              activeTab === "education"
                ? "bg-[#FACC15] text-black shadow-retro-sm"
                : "bg-white dark:bg-[#151B22] text-black dark:text-white shadow-retro-xs hover:bg-yellow-50 dark:hover:bg-zinc-800"
            )}
          >
            <GraduationCap className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <span>{isEn ? "EDUCATION" : "PENDIDIKAN"}</span>
          </button>

          <button
            onClick={() => setActiveTab("certificates")}
            className={cn(
              "w-full sm:w-auto px-2 sm:px-4 lg:px-6 py-2 sm:py-2.5 lg:py-3 text-[10px] min-[400px]:text-[11px] sm:text-xs lg:text-sm font-sans font-black uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5 sm:gap-2 shrink-0 whitespace-nowrap border-2 border-black dark:border-white btn-retro",
              activeTab === "certificates"
                ? "bg-[#FACC15] text-black shadow-retro-sm"
                : "bg-white dark:bg-[#151B22] text-black dark:text-white shadow-retro-xs hover:bg-yellow-50 dark:hover:bg-zinc-800"
            )}
          >
            <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <span>{isEn ? "CERTIFICATES" : "SERTIFIKASI"}</span>
          </button>

          <button
            onClick={() => setActiveTab("organization")}
            className={cn(
              "w-full sm:w-auto px-2 sm:px-4 lg:px-6 py-2 sm:py-2.5 lg:py-3 text-[10px] min-[400px]:text-[11px] sm:text-xs lg:text-sm font-sans font-black uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5 sm:gap-2 shrink-0 whitespace-nowrap border-2 border-black dark:border-white btn-retro",
              activeTab === "organization"
                ? "bg-[#FACC15] text-black shadow-retro-sm"
                : "bg-white dark:bg-[#151B22] text-black dark:text-white shadow-retro-xs hover:bg-yellow-50 dark:hover:bg-zinc-800"
            )}
          >
            <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <span>{isEn ? "ORGANIZATION" : "ORGANISASI"}</span>
          </button>
        </div>
      </div>

      {/* Tab Content Display Viewport Frame */}
      <div className="w-full min-h-0 flex flex-col justify-start pt-2 sm:pt-4 overflow-visible">
        <AnimatePresence mode="wait">
          
          {/* TAB 1: PERSONAL INTRO */}
          {activeTab === "intro" && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-stretch w-full"
            >
              {/* Main Bio Card */}
              <div className="lg:col-span-6 p-4 sm:p-6 lg:p-8 bg-white dark:bg-[#151B22] border-3 border-black dark:border-white shadow-retro-md space-y-4 sm:space-y-5 flex flex-col justify-between">
                <div className="space-y-3.5">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 bg-[#FACC15] border-2 border-black dark:border-white text-black shadow-retro-xs flex items-center justify-center">
                    <UserCheck className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-2xl font-sans font-black text-black dark:text-white tracking-tight">Haikal Al Ghifari, S.Kom</h3>
                    <p className="font-sans text-xs sm:text-sm text-blue-600 dark:text-yellow-400 font-bold uppercase tracking-wider mt-0.5">UNIKOM Informatics Engineering</p>
                  </div>
                  <p className="font-sans text-xs sm:text-base text-zinc-800 dark:text-zinc-100 leading-relaxed pt-3 sm:pt-4 border-t-2 border-black/10 dark:border-white/10 font-medium">
                    {bioText}
                  </p>
                </div>
              </div>

              {/* Highlights List */}
              <div className="lg:col-span-6 space-y-3 sm:space-y-4">
                {highlightCards.map((card, idx) => (
                  <div
                    key={idx}
                    className="p-4 sm:p-5 lg:p-6 bg-white dark:bg-[#151B22] border-3 border-black dark:border-white shadow-retro-sm hover:shadow-retro space-y-1.5 sm:space-y-2 btn-retro transition-all"
                  >
                    <div className="flex items-center gap-2.5 sm:gap-3">
                      <div className="p-1.5 sm:p-2 bg-[#FACC15] border-2 border-black dark:border-white text-black shrink-0 shadow-retro-xs">
                        {card.icon}
                      </div>
                      <h4 className="font-sans text-xs sm:text-base font-black text-black dark:text-white tracking-wide">
                        {card.title}
                      </h4>
                    </div>
                    <p className="font-sans text-xs sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed font-medium pl-8 sm:pl-11">
                      {card.desc}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* TAB 2: EDUCATION */}
          {activeTab === "education" && (
            <div className="w-full max-w-6xl mx-auto flex flex-col justify-between space-y-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={eduPage}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 w-full"
                >
                  {eduItems
                    .slice(eduPage * 2, eduPage * 2 + 2)
                    .map((edu: any, idx: number) => {
                      const inst = isEn && edu.institutionEn ? edu.institutionEn : edu.institution;
                      const deg = isEn && edu.degreeEn ? edu.degreeEn : edu.degree;
                      const per = isEn && edu.periodEn ? edu.periodEn : edu.period;
                      const desc = isEn && edu.descriptionEn ? edu.descriptionEn : edu.description;
                      let logo = edu.logo || "/logo_unikom.png";
                      if (inst.includes("SDN") || inst.includes("Karangpawitan")) logo = "/education/sdnkarangpawitan1.jpg";
                      else if (inst.includes("SMPN 3") || inst.includes("SMP")) logo = "/education/smpn3karawang.jpg";
                      else if (inst.includes("SMAN 3")) logo = "/education/sman3karawang.png";

                      return (
                        <div
                          key={idx}
                          className="p-6 sm:p-7 bg-white dark:bg-[#151B22] border-3 border-black dark:border-white shadow-retro-md space-y-3.5 flex flex-col justify-between"
                        >
                          <div className="space-y-3">
                            <div className="flex items-center gap-3.5">
                              <div className="w-14 h-14 bg-white p-1.5 flex items-center justify-center shrink-0 border-2 border-black dark:border-white shadow-retro-xs overflow-hidden">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={logo} alt={inst} className="w-full h-full object-contain" />
                              </div>
                              <div>
                                <h3 className="font-sans text-sm sm:text-base font-black text-black dark:text-white line-clamp-1">{inst}</h3>
                                <p className="font-sans text-xs sm:text-sm font-bold text-blue-600 dark:text-yellow-400 line-clamp-1 mt-0.5">{deg}</p>
                              </div>
                            </div>

                            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FAF6ED] dark:bg-[#0E1217] border border-black dark:border-white text-black dark:text-white font-sans text-xs font-semibold">
                              <Calendar className="w-3.5 h-3.5 text-black dark:text-yellow-400" />
                              <span>{per}</span>
                            </div>

                            {desc && (
                              <p className="font-sans text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed font-medium pt-3 border-t-2 border-black/10 dark:border-white/10 line-clamp-3">
                                {desc}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                </motion.div>
              </AnimatePresence>

              {/* 8-Bit Carousel Controls for Education Cards (Centered on Mobile, Justified on Desktop) */}
              {eduItems.length > 2 && (
                <div className="flex items-center justify-center sm:justify-between gap-4 sm:gap-2 pt-3 px-2">
                  {/* Square Dots Indicator */}
                  <div className="flex items-center gap-2">
                    {Array.from({ length: Math.ceil(eduItems.length / 2) }).map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setEduPage(idx)}
                        className={`w-4 h-4 border-2 border-black dark:border-white transition-all cursor-pointer ${
                          idx === eduPage
                            ? "bg-[#FACC15] shadow-retro-xs scale-110"
                            : "bg-zinc-300 dark:bg-zinc-700 hover:bg-zinc-400"
                        }`}
                        title={`Page ${idx + 1}`}
                      />
                    ))}
                  </div>

                  {/* Prev / Next Arrows */}
                  <div className="flex items-center gap-2.5">
                    <button
                      onClick={() => setEduPage((prev) => (prev === 0 ? Math.ceil(eduItems.length / 2) - 1 : prev - 1))}
                      className="p-2.5 border-2 border-black dark:border-white bg-[#FACC15] text-black shadow-retro-sm btn-retro transition-all cursor-pointer"
                      title={isEn ? "Previous" : "Sebelumnya"}
                    >
                      <ChevronLeft className="w-4 h-4 font-bold" />
                    </button>
                    <button
                      onClick={() => setEduPage((prev) => (prev === Math.ceil(eduItems.length / 2) - 1 ? 0 : prev + 1))}
                      className="p-2.5 border-2 border-black dark:border-white bg-[#FACC15] text-black shadow-retro-sm btn-retro transition-all cursor-pointer"
                      title={isEn ? "Next" : "Selanjutnya"}
                    >
                      <ChevronRight className="w-4 h-4 font-bold" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: CERTIFICATES */}
          {activeTab === "certificates" && (
            <div className="w-full max-w-6xl mx-auto flex flex-col justify-between space-y-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={certPage}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 w-full"
                >
                  {certItems
                    .slice(certPage * 2, certPage * 2 + 2)
                    .map((cert: any, idx: number) => {
                      const tit = isEn && cert.titleEn ? cert.titleEn : cert.title;
                      const iss = isEn && cert.issuerEn ? cert.issuerEn : cert.issuer;
                      const per = isEn && cert.periodEn ? cert.periodEn : cert.period;
                      const desc = isEn && cert.descriptionEn ? cert.descriptionEn : cert.description;
                      const bdg = isEn && cert.badgeEn ? cert.badgeEn : cert.badge;

                      const imgUrl = cert.imageUrl || (
                        (cert.title?.includes("MSIB") || cert.issuer?.includes("Infinite Learning"))
                          ? "/uploads/certificates/msib-infinite-learning-android-certificate.png"
                          : (cert.title?.includes("Junior Web") || cert.issuer?.includes("BNSP"))
                          ? "/uploads/certificates/bnsp-junior-web-developer-certificate.png"
                          : (cert.title?.includes("Cisco") || cert.issuer?.includes("Cisco"))
                          ? "/uploads/certificates/cisco-ccnav7-certificate.png"
                          : (cert.title?.includes("English") || cert.title?.includes("Proficiency") || cert.issuer?.includes("Language Center"))
                          ? "/uploads/certificates/unikom-english-proficiency-test.png"
                          : null
                      );

                      const secImgUrl = cert.secondaryImageUrl || (
                        (cert.title?.includes("MSIB") || cert.issuer?.includes("Infinite Learning"))
                          ? "/uploads/certificates/msib-infinite-learning-android-transcript-1.png"
                          : (cert.title?.includes("Junior Web") || cert.issuer?.includes("BNSP"))
                          ? "/uploads/certificates/bnsp-junior-web-developer-units.png"
                          : null
                      );

                      const certWithImgs = { ...cert, imageUrl: imgUrl, secondaryImageUrl: secImgUrl };

                      return (
                        <div
                          key={cert.id || idx}
                          className="p-6 sm:p-7 bg-white dark:bg-[#151B22] border-3 border-black dark:border-white shadow-retro-md space-y-3.5 flex flex-col justify-between"
                        >
                          <div className="space-y-2.5">
                            <div className="flex items-center justify-between gap-2">
                              <div className="w-8 h-8 bg-[#FACC15] border-2 border-black dark:border-white text-black flex items-center justify-center shrink-0 shadow-retro-xs">
                                <Award className="w-4 h-4 text-black" />
                              </div>
                              <span className="px-3 py-1 bg-[#FAF6ED] dark:bg-[#0E1217] border border-black dark:border-white text-black dark:text-white font-sans text-xs font-bold">
                                {per}
                              </span>
                            </div>

                            <div>
                              <h3 className="font-sans text-base sm:text-lg font-black text-black dark:text-white line-clamp-1 leading-snug">
                                {tit}
                              </h3>
                              <p className="font-sans text-xs sm:text-sm font-bold text-blue-600 dark:text-yellow-400 flex items-center gap-1.5 mt-0.5 truncate">
                                <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                                <span className="truncate">{iss}</span>
                              </p>
                            </div>

                            {imgUrl && (
                              <div
                                onClick={() => {
                                  setSelectedCert(certWithImgs);
                                  setActiveCertPage(1);
                                }}
                                className="relative h-36 sm:h-44 w-full border-2 border-black dark:border-white cursor-pointer group/img my-2 overflow-hidden bg-zinc-100 dark:bg-zinc-900 shadow-retro-xs"
                              >
                                {/* Certificate Thumbnail */}
                                <img
                                  src={imgUrl}
                                  alt={tit}
                                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover/img:scale-105"
                                />

                                {/* Static Corner Preview Badge (fades out on hover) */}
                                <div className="absolute top-2 right-2 px-2.5 py-1 bg-black/80 text-white border border-black font-sans text-[10px] sm:text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-retro-xs transition-opacity duration-300 group-hover/img:opacity-0 pointer-events-none">
                                  <Eye className="w-3.5 h-3.5 text-[#FACC15]" />
                                  <span>{isEn ? "PREVIEW" : "PRATINJAU"}</span>
                                </div>

                                {/* Hover Dark Backdrop Overlay & Centered "View Certificate" Button */}
                                <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-all duration-300 z-10 p-3">
                                  <div className="px-4 py-2 bg-[#FACC15] text-black border-2 border-black shadow-retro-sm font-sans text-xs sm:text-sm font-black flex items-center gap-2 uppercase tracking-wider btn-retro transform translate-y-1 group-hover/img:translate-y-0 transition-transform duration-300">
                                    <Eye className="w-4 h-4 stroke-[2.5]" />
                                    <span>{isEn ? "VIEW CERTIFICATE" : "LIHAT SERTIFIKAT"}</span>
                                  </div>
                                </div>
                              </div>
                            )}

                            {desc && (
                              <div
                                onClick={() => {
                                  setSelectedCert(certWithImgs);
                                  setActiveCertPage(1);
                                }}
                                title={desc}
                                className="pt-2 border-t-2 border-black/10 dark:border-white/10 cursor-pointer group/desc"
                              >
                                <p className="font-sans text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed font-medium line-clamp-2">
                                  {desc}
                                </p>
                                <span className="font-sans text-xs font-black text-blue-600 dark:text-yellow-400 hover:underline mt-1.5 inline-block uppercase tracking-wider">
                                  {isEn ? "► DETAILS" : "► DETAIL LENGKAP"}
                                </span>
                              </div>
                            )}
                          </div>

                          <div className="pt-3 flex items-center justify-between gap-2 border-t-2 border-black/10 dark:border-white/10">
                            {bdg ? (
                              <span className="font-sans text-xs font-black bg-[#FACC15] text-black px-2.5 py-1 border border-black uppercase tracking-wider block truncate max-w-[220px]">
                                {bdg}
                              </span>
                            ) : <span />}

                            {cert.credentialUrl && (
                              <a
                                href={cert.credentialUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="font-sans text-xs font-black text-blue-600 dark:text-yellow-400 underline underline-offset-2 flex items-center gap-1 shrink-0 uppercase tracking-wider"
                              >
                                <BookOpen className="w-3.5 h-3.5" />
                                <span>CREDENTIAL</span>
                              </a>
                            )}
                          </div>
                        </div>
                      );
                    })}
                </motion.div>
              </AnimatePresence>

              {/* 8-Bit Carousel Controls for Certificate Cards (Centered on Mobile, Justified on Desktop) */}
              {certItems.length > 2 && (
                <div className="flex items-center justify-center sm:justify-between gap-4 sm:gap-2 pt-3 px-2">
                  {/* Square Dots Indicator */}
                  <div className="flex items-center gap-2">
                    {Array.from({ length: Math.ceil(certItems.length / 2) }).map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCertPage(idx)}
                        className={`w-4 h-4 border-2 border-black dark:border-white transition-all cursor-pointer ${
                          idx === certPage
                            ? "bg-[#FACC15] shadow-retro-xs scale-110"
                            : "bg-zinc-300 dark:bg-zinc-700 hover:bg-zinc-400"
                        }`}
                        title={`Page ${idx + 1}`}
                      />
                    ))}
                  </div>

                  {/* Prev / Next Arrows */}
                  <div className="flex items-center gap-2.5">
                    <button
                      onClick={() => setCertPage((prev) => (prev === 0 ? Math.ceil(certItems.length / 2) - 1 : prev - 1))}
                      className="p-2.5 border-2 border-black dark:border-white bg-[#FACC15] text-black shadow-retro-sm btn-retro transition-all cursor-pointer"
                      title={isEn ? "Previous" : "Sebelumnya"}
                    >
                      <ChevronLeft className="w-4 h-4 font-bold" />
                    </button>
                    <button
                      onClick={() => setCertPage((prev) => (prev === Math.ceil(certItems.length / 2) - 1 ? 0 : prev + 1))}
                      className="p-2.5 border-2 border-black dark:border-white bg-[#FACC15] text-black shadow-retro-sm btn-retro transition-all cursor-pointer"
                      title={isEn ? "Next" : "Selanjutnya"}
                    >
                      <ChevronRight className="w-4 h-4 font-bold" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: ORGANIZATION */}
          {activeTab === "organization" && (
            <motion.div
              key="organization"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl mx-auto pb-12 sm:pb-0"
            >
              {orgItems.map((org: any, idx: number) => {
                const r = isEn && org.roleEn ? org.roleEn : org.role;
                const n = isEn && org.nameEn ? org.nameEn : org.name;
                const p = isEn && org.periodEn ? org.periodEn : org.period;
                const rawDesc = isEn && org.descriptionEn ? org.descriptionEn : org.description;
                const bullets = org.bullets || (rawDesc ? rawDesc.split("\n").map((l: string) => l.replace(/^[•\-\*\s]+/, "").trim()).filter(Boolean) : []);

                return (
                  <div
                    key={idx}
                    className="p-6 sm:p-7 bg-white dark:bg-[#151B22] border-3 border-black dark:border-white shadow-retro-md space-y-4 flex flex-col justify-between"
                  >
                    <div className="space-y-3.5">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="px-3 py-1.5 bg-[#FACC15] border-2 border-black dark:border-white text-black font-sans text-xs sm:text-sm uppercase font-black tracking-wider shadow-retro-xs">
                          {r}
                        </span>
                        <span className="font-sans text-xs text-zinc-700 dark:text-zinc-300 font-semibold flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-black dark:text-yellow-400" />
                          {p}
                        </span>
                      </div>

                      <h3 className="font-sans text-base sm:text-lg font-black text-black dark:text-white leading-snug">
                        {n}
                      </h3>

                      {bullets.length > 0 && (
                        <ul className="space-y-2 pt-3 border-t-2 border-black/10 dark:border-white/10">
                          {bullets.map((b: string, bIdx: number) => (
                            <li key={bIdx} className="flex items-start gap-2.5 font-sans text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed font-medium">
                              <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-yellow-400 shrink-0 mt-0.5" />
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                );
              })}
            </motion.div>
          )}

        </AnimatePresence>

        {/* Next Scene CTA Button */}
        {onNavigateScene && (
          <div className="flex justify-center pt-8 sm:pt-10">
            <button
              onClick={() => onNavigateScene(2)}
              className="px-6 py-3 bg-[#FACC15] hover:bg-yellow-300 text-black font-pixel text-xs sm:text-sm font-black uppercase border-2 border-black dark:border-white shadow-retro btn-retro transition-all flex items-center gap-2.5 cursor-pointer"
            >
              <span>{isEn ? "NEXT: SKILL TREE" : "SELANJUTNYA: POHON KEAHLIAN"}</span>
              <ChevronRight className="w-4 h-4 stroke-[3]" />
            </button>
          </div>
        )}

        {/* 8-BIT CERTIFICATE LIGHTBOX MODAL */}
        <AnimatePresence>
          {selectedCert && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              data-no-scene-scroll="true"
              onClick={() => setSelectedCert(null)}
              className="fixed inset-0 z-[99999] flex items-center justify-center p-2 sm:p-6 bg-black/80 backdrop-blur-xs overflow-y-auto overscroll-contain"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                data-no-scene-scroll="true"
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-4xl max-h-[92dvh] sm:max-h-[88vh] bg-[#FAF6ED] dark:bg-[#0E1217] border-4 border-black dark:border-white shadow-retro-lg flex flex-col justify-between my-auto overflow-hidden text-black dark:text-white"
              >
                {/* 8-Bit Modal Header */}
                <div className="p-3 sm:p-4 bg-[#FACC15] border-b-2 border-black dark:border-white flex items-center justify-between gap-3 shrink-0 text-black">
                  <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 bg-white border-2 border-black flex items-center justify-center shrink-0 shadow-retro-xs">
                      <Award className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-sans text-sm sm:text-base font-black text-black leading-tight truncate">
                        {isEn && selectedCert.titleEn ? selectedCert.titleEn : selectedCert.title}
                      </h3>
                      <p className="font-sans text-xs text-black/80 font-bold mt-0.5 truncate">
                        {isEn && selectedCert.issuerEn ? selectedCert.issuerEn : selectedCert.issuer}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedCert(null)}
                    className="w-8 h-8 bg-white border-2 border-black text-black font-pixel font-bold shadow-retro-xs btn-retro flex items-center justify-center transition-colors shrink-0 cursor-pointer"
                  >
                    <X className="w-4 h-4 font-bold" />
                  </button>
                </div>

                {/* Scrollable Body Content inside Modal */}
                <div className="flex-1 overflow-y-auto custom-scrollbar overscroll-contain">
                  {/* Full Description Box */}
                  {(selectedCert.description || selectedCert.descriptionEn) && (
                    <div className="px-3 sm:px-5 py-2.5 sm:py-3 bg-white dark:bg-[#151B22] border-b-2 border-black dark:border-white text-xs leading-relaxed font-sans">
                      <span className="font-sans text-xs text-blue-600 dark:text-yellow-400 block mb-1 uppercase font-black tracking-wider flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-blue-600 dark:text-yellow-400 shrink-0" />
                        <span>{isEn ? "COMPETENCY DETAILS" : "RINCIAN KOMPETENSI"}</span>
                      </span>
                      <p className="text-zinc-800 dark:text-zinc-200 text-xs sm:text-sm font-medium leading-relaxed">
                        {isEn && selectedCert.descriptionEn ? selectedCert.descriptionEn : selectedCert.description}
                      </p>
                    </div>
                  )}

                  {/* Multi-page Switcher Tabs */}
                  {modalPagesList.length > 1 && (
                    <div className="px-3 sm:px-4 py-2 bg-[#FAF6ED] dark:bg-[#0E1217] border-b-2 border-black dark:border-white flex flex-wrap items-center gap-1.5 sm:gap-2">
                      {modalPagesList.map((pObj) => (
                        <button
                          key={pObj.page}
                          onClick={() => setActiveCertPage(pObj.page)}
                          className={cn(
                            "px-3 py-1.5 text-xs font-sans font-black uppercase tracking-wider transition-all flex items-center gap-1.5 shrink-0 cursor-pointer border-2 border-black dark:border-white btn-retro",
                            activeCertPage === pObj.page
                              ? "bg-[#FACC15] text-black shadow-retro-xs"
                              : "bg-white dark:bg-[#151B22] text-black dark:text-white"
                          )}
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>{pObj.label}</span>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Modal Image Display */}
                  <div className="relative min-h-[200px] max-h-[42vh] sm:max-h-[55vh] overflow-auto bg-zinc-100 dark:bg-black/40 flex items-center justify-center p-3 sm:p-5 group/modalimg">
                    {modalPagesList.length > 1 && (
                      <button
                        onClick={() => setActiveCertPage((prev) => (prev <= 1 ? modalPagesList.length : prev - 1))}
                        className="absolute left-3 z-10 p-2 bg-[#FACC15] border-2 border-black text-black shadow-retro-sm btn-retro cursor-pointer"
                        title={isEn ? "Previous Page" : "Halaman Sebelumnya"}
                      >
                        <ChevronLeft className="w-4 h-4 font-bold" />
                      </button>
                    )}

                    <img
                      src={currentModalImgUrl}
                      alt={`Certificate Page ${activeCertPage}`}
                      className="max-h-[38vh] sm:max-h-[50vh] w-auto max-w-full object-contain border-2 border-black dark:border-white shadow-retro-sm bg-white"
                    />

                    {modalPagesList.length > 1 && (
                      <button
                        onClick={() => setActiveCertPage((prev) => (prev >= modalPagesList.length ? 1 : prev + 1))}
                        className="absolute right-3 z-10 p-2 bg-[#FACC15] border-2 border-black text-black shadow-retro-sm btn-retro cursor-pointer"
                        title={isEn ? "Next Page" : "Halaman Selanjutnya"}
                      >
                        <ChevronRight className="w-4 h-4 font-bold" />
                      </button>
                    )}

                    {modalPagesList.length > 1 && (
                      <div className="absolute bottom-3 px-3 py-1 bg-[#FACC15] border-2 border-black text-black font-sans text-xs font-black tracking-wider shadow-retro-xs">
                        {isEn ? `PAGE ${activeCertPage} / ${modalPagesList.length}` : `HALAMAN ${activeCertPage} / ${modalPagesList.length}`}
                      </div>
                    )}
                  </div>
                </div>

                {/* 8-Bit Modal Footer */}
                <div className="p-3 sm:p-4 bg-white dark:bg-[#151B22] border-t-2 border-black dark:border-white flex flex-wrap items-center justify-between gap-2.5 text-xs shrink-0">
                  <div className="font-mono text-xs flex items-center gap-2">
                    <span className="text-zinc-600 dark:text-zinc-400 font-bold">{isEn ? "DATE: " : "TANGGAL: "}</span>
                    <span className="font-bold bg-[#FAF6ED] dark:bg-[#0E1217] px-2 py-0.5 border border-black dark:border-white text-[11px]">
                      {selectedCert.period}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    {/* PDF Download Button */}
                    <a
                      href={
                        selectedCert.title?.includes("MSIB") || selectedCert.issuer?.includes("Infinite Learning")
                          ? "/uploads/certificates/msib-infinite-learning-android-certificate.pdf"
                          : selectedCert.title?.includes("English") || selectedCert.title?.includes("Proficiency") || selectedCert.issuer?.includes("Language Center")
                          ? "/uploads/certificates/unikom-english-proficiency-test.pdf"
                          : selectedCert.title?.includes("BNSP") || selectedCert.title?.includes("Junior Web")
                          ? "/uploads/certificates/bnsp-junior-web-developer-certificate.pdf"
                          : "/uploads/certificates/cisco-ccnav7-certificate.pdf"
                      }
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 border-2 border-black dark:border-white bg-[#FACC15] text-black font-sans text-xs font-black tracking-wider uppercase shadow-retro-xs btn-retro flex items-center gap-1.5"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>{isEn ? "DOWNLOAD PDF" : "UNDUH PDF"}</span>
                    </a>

                    <a
                      href={currentModalImgUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 border-2 border-black dark:border-white bg-white dark:bg-[#0E1217] text-black dark:text-white font-sans text-xs font-black tracking-wider uppercase shadow-retro-xs btn-retro flex items-center gap-1.5"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>{isEn ? "VIEW IMAGE" : "LIHAT GAMBAR"}</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
