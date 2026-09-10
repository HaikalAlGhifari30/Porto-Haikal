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
    <section className="w-full max-w-5xl mx-auto px-2 sm:px-4 py-2 sm:py-4 flex flex-col justify-center items-center text-zinc-900 dark:text-white">
      {/* Header */}
      <div className="w-full max-w-2xl space-y-1.5 mb-5 text-center mx-auto px-2 shrink-0">
        <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-blue-700 to-cyan-600 dark:from-white dark:via-cyan-200 dark:to-cyan-400">
          {t('section.about')}
        </h2>
        <p className="text-slate-600 dark:text-zinc-400 text-xs leading-relaxed font-medium w-full max-w-xl mx-auto px-2 break-words">
          {isEn
            ? "Personal background, academic foundation, certifications, and leadership journey"
            : "Latar belakang pribadi, fondasi akademik, sertifikasi, serta perjalanan organisasi"}
        </p>

        {/* Compact Sub-Navigation Tabs inside ABOUT Section (Responsive Grid on Mobile) */}
        <div className="w-full grid grid-cols-2 sm:flex sm:items-center sm:justify-center gap-2 max-w-xs sm:max-w-none mx-auto pt-1.5 px-1">
          <button
            onClick={() => setActiveTab("intro")}
            className={cn(
              "w-full sm:w-auto px-2.5 sm:px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-extrabold transition-all cursor-pointer flex items-center justify-center gap-1.5 shrink-0 whitespace-nowrap",
              activeTab === "intro"
                ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-cyan-500/25"
                : "bg-white/50 dark:bg-slate-900/60 text-slate-800 dark:text-zinc-300 hover:text-slate-950 dark:hover:text-white border border-white/70 dark:border-zinc-800 shadow-2xs backdrop-blur-xs"
            )}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>{isEn ? "INTRO" : "PROFIL"}</span>
          </button>

          <button
            onClick={() => setActiveTab("education")}
            className={cn(
              "w-full sm:w-auto px-2.5 sm:px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-extrabold transition-all cursor-pointer flex items-center justify-center gap-1.5 shrink-0 whitespace-nowrap",
              activeTab === "education"
                ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-cyan-500/25"
                : "bg-white/50 dark:bg-slate-900/60 text-slate-800 dark:text-zinc-300 hover:text-slate-950 dark:hover:text-white border border-white/70 dark:border-zinc-800 shadow-2xs backdrop-blur-xs"
            )}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>{isEn ? "EDUCATION" : "PENDIDIKAN"}</span>
          </button>

          <button
            onClick={() => setActiveTab("certificates")}
            className={cn(
              "w-full sm:w-auto px-2.5 sm:px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-extrabold transition-all cursor-pointer flex items-center justify-center gap-1.5 shrink-0 whitespace-nowrap",
              activeTab === "certificates"
                ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-cyan-500/25"
                : "bg-white/50 dark:bg-slate-900/60 text-slate-800 dark:text-zinc-300 hover:text-slate-950 dark:hover:text-white border border-white/70 dark:border-zinc-800 shadow-2xs backdrop-blur-xs"
            )}
          >
            <Award className="w-3.5 h-3.5" />
            <span>{isEn ? "CERTIFICATES" : "SERTIFIKASI"}</span>
          </button>

          <button
            onClick={() => setActiveTab("organization")}
            className={cn(
              "w-full sm:w-auto px-2.5 sm:px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-extrabold transition-all cursor-pointer flex items-center justify-center gap-1.5 shrink-0 whitespace-nowrap",
              activeTab === "organization"
                ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-cyan-500/25"
                : "bg-white/50 dark:bg-slate-900/60 text-slate-800 dark:text-zinc-300 hover:text-slate-950 dark:hover:text-white border border-white/70 dark:border-zinc-800 shadow-2xs backdrop-blur-xs"
            )}
          >
            <Users className="w-3.5 h-3.5" />
            <span>{isEn ? "ORGANIZATION" : "ORGANISASI"}</span>
          </button>
        </div>
      </div>

      {/* Tab Content Display Viewport Frame */}
      <div className="w-full min-h-[410px] sm:h-[410px] flex flex-col justify-start pt-3 sm:pt-4 overflow-y-auto sm:overflow-hidden scrollbar-none">
        <AnimatePresence mode="wait">
          
          {/* TAB 1: PERSONAL INTRO */}
          {activeTab === "intro" && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch w-full"
            >
              {/* Main Bio Card */}
              <div className="lg:col-span-6 p-6 rounded-[2rem] bg-white/40 dark:bg-slate-950/75 border border-white/70 dark:border-cyan-500/30 backdrop-blur-2xl space-y-4 shadow-2xl shadow-blue-900/5 dark:shadow-cyan-950/40 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                    <UserCheck className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-slate-950 dark:text-white tracking-tight">Haikal Al Ghifari, S.Kom</h3>
                    <p className="text-xs text-blue-700 dark:text-cyan-400 font-extrabold uppercase tracking-wider mt-0.5">UNIKOM Informatics Engineering</p>
                  </div>
                  <p className="text-xs text-slate-900 dark:text-zinc-300 leading-relaxed pt-2 border-t border-slate-200/80 dark:border-zinc-800 font-medium">
                    {bioText}
                  </p>
                </div>
              </div>

              {/* Highlights List */}
              <div className="lg:col-span-6 space-y-3">
                {highlightCards.map((card, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-white/45 dark:bg-slate-950/75 border border-white/70 dark:border-zinc-800 hover:border-cyan-500/40 backdrop-blur-xl space-y-1.5 transition-all shadow-md group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 rounded-lg bg-white/60 dark:bg-slate-900 border border-white/80 dark:border-zinc-800 shrink-0">
                        {card.icon}
                      </div>
                      <h4 className="text-sm font-bold text-slate-950 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-300 transition-colors">
                        {card.title}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-800 dark:text-zinc-400 leading-relaxed pl-9 font-medium">
                      {card.desc}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* TAB 2: EDUCATION */}
          {activeTab === "education" && (
            <div className="w-full max-w-4xl mx-auto flex flex-col justify-between space-y-3">
              <AnimatePresence mode="wait">
                <motion.div
                  key={eduPage}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4 w-full"
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
                          className="p-4 sm:p-5 rounded-2xl bg-white/40 dark:bg-slate-950/75 border border-white/70 dark:border-cyan-500/25 backdrop-blur-2xl space-y-2.5 shadow-lg flex flex-col justify-between group hover:border-cyan-400 transition-all"
                        >
                          <div className="space-y-2.5">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-xl bg-white p-1 flex items-center justify-center shrink-0 shadow-md border border-slate-200 overflow-hidden">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={logo} alt={inst} className="w-full h-full object-contain" />
                              </div>
                              <div>
                                <h3 className="text-xs sm:text-sm font-bold text-slate-950 dark:text-white tracking-tight group-hover:text-blue-600 dark:group-hover:text-cyan-300 transition-colors line-clamp-1">{inst}</h3>
                                <p className="text-[11px] font-extrabold text-blue-700 dark:text-cyan-400 line-clamp-1">{deg}</p>
                              </div>
                            </div>

                            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/60 dark:bg-slate-900 border border-white/80 dark:border-zinc-800 text-slate-900 dark:text-zinc-300 text-[10px] font-bold backdrop-blur-xs">
                              <Calendar className="w-2.5 h-2.5 text-cyan-600 dark:text-cyan-400" />
                              <span>{per}</span>
                            </div>

                            {desc && (
                              <p className="text-[11px] text-slate-900 dark:text-zinc-300 leading-relaxed pt-2 border-t border-slate-200/80 dark:border-zinc-800/80 font-medium line-clamp-3">
                                {desc}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                </motion.div>
              </AnimatePresence>

              {/* Carousel Controls for Education Cards */}
              {eduItems.length > 2 && (
                <div className="flex items-center justify-between pt-1 px-1">
                  {/* Dots Indicator */}
                  <div className="flex items-center gap-2">
                    {Array.from({ length: Math.ceil(eduItems.length / 2) }).map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setEduPage(idx)}
                        className={`h-2 rounded-full transition-all cursor-pointer ${
                          idx === eduPage
                            ? "w-8 bg-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.8)]"
                            : "w-2 bg-slate-300 dark:bg-zinc-700 hover:bg-slate-400 dark:hover:bg-zinc-500"
                        }`}
                        title={`Page ${idx + 1}`}
                      />
                    ))}
                  </div>

                  {/* Prev / Next Arrows */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setEduPage((prev) => (prev === 0 ? Math.ceil(eduItems.length / 2) - 1 : prev - 1))}
                      className="p-2 rounded-full bg-white/90 dark:bg-slate-900/80 border border-slate-200 dark:border-zinc-800 text-slate-800 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-cyan-400 hover:border-cyan-500/50 transition-all cursor-pointer shadow-md"
                      title={isEn ? "Previous" : "Sebelumnya"}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setEduPage((prev) => (prev === Math.ceil(eduItems.length / 2) - 1 ? 0 : prev + 1))}
                      className="p-2 rounded-full bg-white/90 dark:bg-slate-900/80 border border-slate-200 dark:border-zinc-800 text-slate-800 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-cyan-400 hover:border-cyan-500/50 transition-all cursor-pointer shadow-md"
                      title={isEn ? "Next" : "Selanjutnya"}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: CERTIFICATES */}
          {activeTab === "certificates" && (
            <div className="w-full max-w-4xl mx-auto flex flex-col justify-between space-y-3">
              <AnimatePresence mode="wait">
                <motion.div
                  key={certPage}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4 w-full"
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
                          className="p-3 sm:p-3.5 rounded-2xl bg-white/40 dark:bg-slate-950/75 border border-white/70 dark:border-cyan-500/25 backdrop-blur-2xl space-y-2 shadow-xl flex flex-col justify-between group hover:border-cyan-400 transition-all"
                        >
                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between gap-2">
                              <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0">
                                <Award className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                              </div>
                              <span className="px-2 py-0.5 rounded-full bg-white/60 dark:bg-slate-900 border border-white/80 dark:border-zinc-800 text-slate-900 dark:text-zinc-300 text-[10px] font-extrabold backdrop-blur-xs">
                                {per}
                              </span>
                            </div>

                            <div>
                              <h3 className="text-xs sm:text-sm font-bold text-slate-950 dark:text-white tracking-tight group-hover:text-blue-600 dark:group-hover:text-cyan-300 transition-colors line-clamp-1">
                                {tit}
                              </h3>
                              <p className="text-[11px] font-extrabold text-blue-700 dark:text-cyan-400 flex items-center gap-1 mt-0.5 truncate">
                                <ShieldCheck className="w-3 h-3 shrink-0" />
                                <span className="truncate">{iss}</span>
                              </p>
                            </div>

                            {imgUrl && (
                              <div
                                onClick={() => {
                                  setSelectedCert(certWithImgs);
                                  setActiveCertPage(1);
                                }}
                                className="relative h-24 sm:h-28 w-full rounded-xl overflow-hidden bg-slate-900/80 border border-slate-700/50 cursor-pointer group/img my-1 shadow-md hover:border-cyan-400/80 transition-all"
                              >
                                <img
                                  src={imgUrl}
                                  alt={tit}
                                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover/img:scale-105"
                                />

                                {/* Subtle top-right glass badge when not hovered */}
                                <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-slate-950/75 border border-slate-700/60 text-cyan-400 text-[10px] font-extrabold backdrop-blur-md flex items-center gap-1 shadow-md group-hover/img:opacity-0 transition-opacity">
                                  <Eye className="w-3 h-3" />
                                  <span>{isEn ? "Preview" : "Lihat"}</span>
                                </div>

                                {/* Dark blurred overlay on hover for 100% clear text contrast */}
                                <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs opacity-0 group-hover/img:opacity-100 transition-all duration-300 flex items-center justify-center">
                                  <span className="px-3 py-1.5 rounded-full bg-cyan-500 text-slate-950 text-[11px] font-black shadow-[0_0_15px_rgba(6,182,212,0.6)] flex items-center gap-1.5 transform scale-90 group-hover/img:scale-100 transition-transform">
                                    <Eye className="w-3.5 h-3.5" />
                                    <span>{isEn ? "View Certificate" : "Lihat Sertifikat"}</span>
                                  </span>
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
                                className="pt-1 border-t border-slate-200/80 dark:border-zinc-800/80 cursor-pointer group/desc"
                              >
                                <p className="text-[11px] text-slate-900 dark:text-zinc-300 leading-relaxed font-medium line-clamp-2 group-hover/desc:text-cyan-500 dark:group-hover/desc:text-cyan-300 transition-colors">
                                  {desc}
                                </p>
                                <span className="text-[10px] font-bold text-cyan-500 hover:underline mt-0.5 inline-block">
                                  {isEn ? "→ Click to read full description" : "→ Klik untuk baca deskripsi lengkap"}
                                </span>
                              </div>
                            )}
                          </div>

                          <div className="pt-1.5 flex items-center justify-between gap-2 border-t border-slate-200/50 dark:border-zinc-800/50">
                            {bdg ? (
                              <span className="text-[10px] font-black text-slate-600 dark:text-zinc-400 uppercase tracking-wider block">
                                {bdg}
                              </span>
                            ) : <span />}

                            {cert.credentialUrl && (
                              <a
                                href={cert.credentialUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="text-[11px] font-extrabold text-cyan-500 hover:text-cyan-400 underline underline-offset-2 flex items-center gap-1 shrink-0"
                              >
                                <BookOpen className="w-3 h-3" />
                                <span>Credential</span>
                              </a>
                            )}
                          </div>
                        </div>
                      );
                    })}
                </motion.div>
              </AnimatePresence>

              {/* Carousel Controls for Certificate Cards (Identical to Education) */}
              {certItems.length > 2 && (
                <div className="flex items-center justify-between pt-1 px-1">
                  {/* Dots Indicator */}
                  <div className="flex items-center gap-2">
                    {Array.from({ length: Math.ceil(certItems.length / 2) }).map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCertPage(idx)}
                        className={`h-2 rounded-full transition-all cursor-pointer ${
                          idx === certPage
                            ? "w-8 bg-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.8)]"
                            : "w-2 bg-slate-300 dark:bg-zinc-700 hover:bg-slate-400 dark:hover:bg-zinc-500"
                        }`}
                        title={`Page ${idx + 1}`}
                      />
                    ))}
                  </div>

                  {/* Prev / Next Arrows */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCertPage((prev) => (prev === 0 ? Math.ceil(certItems.length / 2) - 1 : prev - 1))}
                      className="p-2 rounded-full bg-white/90 dark:bg-slate-900/80 border border-slate-200 dark:border-zinc-800 text-slate-800 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-cyan-400 hover:border-cyan-500/50 transition-all cursor-pointer shadow-md"
                      title={isEn ? "Previous" : "Sebelumnya"}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setCertPage((prev) => (prev === Math.ceil(certItems.length / 2) - 1 ? 0 : prev + 1))}
                      className="p-2 rounded-full bg-white/90 dark:bg-slate-900/80 border border-slate-200 dark:border-zinc-800 text-slate-800 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-cyan-400 hover:border-cyan-500/50 transition-all cursor-pointer shadow-md"
                      title={isEn ? "Next" : "Selanjutnya"}
                    >
                      <ChevronRight className="w-4 h-4" />
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
              className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full"
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
                    className="p-6 rounded-[2rem] bg-white/40 dark:bg-slate-950/75 border border-white/70 dark:border-cyan-500/25 backdrop-blur-2xl space-y-4 shadow-2xl flex flex-col justify-between group hover:border-cyan-400 transition-all"
                  >
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="px-3 py-1 rounded-full bg-blue-600/10 dark:bg-cyan-500/10 border border-blue-600/20 dark:border-cyan-500/30 text-blue-700 dark:text-cyan-400 text-[11px] font-black uppercase tracking-wider">
                          {r}
                        </span>
                        <span className="text-[11px] text-slate-800 dark:text-zinc-400 font-extrabold flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />
                          {p}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-slate-950 dark:text-white tracking-tight group-hover:text-blue-600 dark:group-hover:text-cyan-300 transition-colors">
                        {n}
                      </h3>

                      {bullets.length > 0 && (
                        <ul className="space-y-1.5 pt-2 border-t border-slate-200/80 dark:border-zinc-800">
                          {bullets.map((b: string, bIdx: number) => (
                            <li key={bIdx} className="flex items-start gap-2 text-xs text-slate-900 dark:text-zinc-300 leading-relaxed font-medium">
                              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
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

        {/* CERTIFICATE LIGHTBOX MODAL */}
        <AnimatePresence>
          {selectedCert && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCert(null)}
              className="fixed inset-0 z-[99999] flex items-center justify-center p-2 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto overscroll-contain"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-4xl max-h-[92dvh] sm:max-h-[88vh] bg-slate-900 border border-cyan-500/30 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between my-auto"
              >
                {/* Modal Header */}
                <div className="p-3 sm:p-5 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between gap-3 shrink-0">
                  <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0">
                      <Award className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-xs sm:text-base font-bold text-white leading-tight truncate">
                        {isEn && selectedCert.titleEn ? selectedCert.titleEn : selectedCert.title}
                      </h3>
                      <p className="text-[11px] sm:text-xs text-cyan-400 font-semibold mt-0.5 truncate">
                        {isEn && selectedCert.issuerEn ? selectedCert.issuerEn : selectedCert.issuer}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedCert(null)}
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors shrink-0 border border-slate-700 cursor-pointer"
                  >
                    <X className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                  </button>
                </div>

                {/* Scrollable Body Content inside Modal */}
                <div className="flex-1 overflow-y-auto custom-scrollbar overscroll-contain">
                  {/* Full Description Box */}
                  {(selectedCert.description || selectedCert.descriptionEn) && (
                    <div className="px-3 sm:px-6 py-2.5 sm:py-3 bg-slate-950/80 border-b border-slate-800/80 text-xs text-slate-300 leading-relaxed font-medium">
                      <span className="font-bold text-cyan-400 block mb-1 uppercase tracking-wider text-[10px] flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span>{isEn ? "Full Description & Competency Details" : "Keterangan & Deskripsi Lengkap Sertifikasi"}</span>
                      </span>
                      <p className="text-slate-200 leading-relaxed text-[11px] sm:text-xs">
                        {isEn && selectedCert.descriptionEn ? selectedCert.descriptionEn : selectedCert.description}
                      </p>
                    </div>
                  )}

                  {/* Multi-page Switcher Tabs */}
                  {modalPagesList.length > 1 && (
                    <div className="px-3 sm:px-4 py-2 bg-slate-950/70 border-b border-slate-800 flex flex-wrap items-center gap-1.5 sm:gap-2">
                      {modalPagesList.map((pObj) => (
                        <button
                          key={pObj.page}
                          onClick={() => setActiveCertPage(pObj.page)}
                          className={cn(
                            "px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg text-xs font-black transition-all flex items-center gap-1.5 shrink-0 cursor-pointer",
                            activeCertPage === pObj.page
                              ? "bg-cyan-500 text-slate-950 shadow-md scale-105"
                              : "bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700"
                          )}
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>{pObj.label}</span>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Modal Image Display with Navigation Overlay */}
                  <div className="relative min-h-[200px] max-h-[42vh] sm:max-h-[55vh] overflow-auto bg-slate-950/95 flex items-center justify-center p-2 sm:p-5 group/modalimg">
                    {modalPagesList.length > 1 && (
                      <button
                        onClick={() => setActiveCertPage((prev) => (prev <= 1 ? modalPagesList.length : prev - 1))}
                        className="absolute left-2 sm:left-3 z-10 p-2 sm:p-2.5 rounded-full bg-slate-900/80 border border-slate-700 text-slate-200 hover:text-cyan-400 hover:border-cyan-400 transition-all shadow-xl cursor-pointer"
                        title={isEn ? "Previous Page" : "Halaman Sebelumnya"}
                      >
                        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                    )}

                    <img
                      src={currentModalImgUrl}
                      alt={`Certificate Page ${activeCertPage}`}
                      className="max-h-[38vh] sm:max-h-[50vh] w-auto max-w-full object-contain rounded-lg shadow-2xl border border-slate-800"
                    />

                    {modalPagesList.length > 1 && (
                      <button
                        onClick={() => setActiveCertPage((prev) => (prev >= modalPagesList.length ? 1 : prev + 1))}
                        className="absolute right-2 sm:right-3 z-10 p-2 sm:p-2.5 rounded-full bg-slate-900/80 border border-slate-700 text-slate-200 hover:text-cyan-400 hover:border-cyan-400 transition-all shadow-xl cursor-pointer"
                        title={isEn ? "Next Page" : "Halaman Selanjutnya"}
                      >
                        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                    )}

                    {modalPagesList.length > 1 && (
                      <div className="absolute bottom-3 px-2.5 py-0.5 rounded-full bg-slate-950/80 border border-slate-800 text-slate-300 text-[10px] font-bold backdrop-blur-md">
                        {isEn ? `Page ${activeCertPage} of ${modalPagesList.length}` : `Halaman ${activeCertPage} dari ${modalPagesList.length}`}
                      </div>
                    )}
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="p-3 sm:p-4 bg-slate-950/95 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2.5 text-xs shrink-0">
                  <div className="text-slate-400 font-medium flex items-center gap-2">
                    <span className="text-[11px] sm:text-xs">{isEn ? "Period / Date: " : "Periode / Tanggal: "}</span>
                    <span className="text-cyan-300 font-bold bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20 text-[11px] sm:text-xs">
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
                      className="px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-[11px] sm:text-xs font-extrabold transition-all flex items-center gap-1.5 shadow-md hover:scale-105"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>{isEn ? "Open / Download PDF" : "Buka / Unduh File PDF"}</span>
                    </a>

                    <a
                      href={currentModalImgUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-[11px] sm:text-xs font-bold transition-colors flex items-center gap-1.5 border border-slate-700"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>{isEn ? "Original Image" : "Gambar Asli"}</span>
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
