"use client";

import { useState } from "react";
import { useSafeLang } from "@/store/lang";
import { UserCheck, GraduationCap, ShieldCheck, Target, Users, Calendar, CheckCircle2, Award, BookOpen } from "lucide-react";
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
      degree: "S1 Teknik Informatika (S.Kom)",
      period: "Sep 2020 — Feb 2025 · Bandung",
      description: "Fokus Utama: Quality Assurance, IT Business Analyst, System Analyst, UI/UX.\nSkripsi: \"Sistem Penentuan Jumlah Pembelian Produk pada Arbie Snack Menggunakan Metode Single Exponential Smoothing\"",
      logo: "/logo_unikom.png",
    },
    {
      institution: "SMAN 3 Karawang Barat",
      degree: "SMA / Sederajat — Jurusan IPA",
      period: "2017 — 2020 · Karawang",
      description: "Fokus studi pada ilmu pengetahuan alam (IPA), Matematika, dan Fisika.",
      logo: "/education/sman3karawang.png",
    },
    {
      institution: "SMPN 3 Karawang Barat",
      degree: "SMP / Sederajat",
      period: "2014 — 2017 · Karawang",
      description: "Pendidikan Sekolah Menengah Pertama dengan pembentukan dasar akademis, logika, dan ilmu pengetahuan umum.",
      logo: "/education/smpn3karawang.jpg",
    },
    {
      institution: "SDN Karangpawitan I Karawang",
      degree: "SD / Sederajat",
      period: "2008 — 2014 · Karawang",
      description: "Pendidikan Sekolah Dasar dengan pembentukan dasar literasi, matematika, dan karakter umum.",
      logo: "/education/sdnkarangpawitan1.jpg",
    },
  ];

  const defaultCertificates = [
    {
      title: "Junior Web Developer",
      issuer: "Badan Nasional Sertifikasi Profesi (BNSP)",
      period: "2024",
      description: isEn
        ? "Official competency certification in national web programming standards, covering algorithms, structured programming, and code analysis."
        : "Sertifikasi kompetensi resmi dalam standar pemrograman web nasional, mencakup algoritma, pemrograman terstruktur, dan analisis kode.",
      badge: isEn ? "National Competency" : "Sertifikasi Kompetensi Nasional",
    },
    {
      title: "Cisco CCNAv7: Introduction to Networks",
      issuer: "Cisco Networking Academy",
      period: "Feb 2023",
      description: isEn
        ? "Understanding of network architecture, data communication protocols, IPv4/IPv6 subnetting, ethernet switching, and security fundamentals."
        : "Pemahaman arsitektur jaringan, protokol komunikasi data, IPv4/IPv6 sub-netting, ethernet switching, dan security fundamentals.",
      badge: "Networking Fundamental",
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

  return (
    <section className="w-full max-w-5xl mx-auto px-4 py-3 sm:py-6 flex flex-col justify-center items-center text-zinc-900 dark:text-white my-auto">
      {/* Header */}
      <div className="w-full max-w-2xl space-y-1.5 mb-5 text-center mx-auto px-2 shrink-0">
        <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-blue-700 to-cyan-600 dark:from-white dark:via-cyan-200 dark:to-cyan-400">
          {t('section.about')}
        </h2>
        <p className="text-slate-600 dark:text-zinc-400 text-xs leading-relaxed font-medium w-full max-w-xl mx-auto px-2 break-words">
          Personal background, academic foundation, certifications, and leadership journey
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
            <span>INTRO</span>
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
            <span>EDUCATION</span>
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
            <span>CERTIFICATES</span>
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
            <span>ORGANIZATION</span>
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
            <motion.div
              key="education"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className={cn(
                "grid gap-3 sm:gap-3.5 w-full max-w-4xl mx-auto",
                eduItems.length >= 4
                  ? "grid-cols-1 md:grid-cols-2"
                  : eduItems.length === 3
                  ? "grid-cols-1 md:grid-cols-3"
                  : "grid-cols-1 md:grid-cols-2 max-w-3xl mx-auto"
              )}
            >
              {eduItems.map((edu: any, idx: number) => {
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
                    className="p-3.5 sm:p-4 rounded-2xl bg-white/40 dark:bg-slate-950/75 border border-white/70 dark:border-cyan-500/25 backdrop-blur-2xl space-y-2 shadow-lg flex flex-col justify-between group hover:border-cyan-400 transition-all"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-xl bg-white p-1 flex items-center justify-center shrink-0 shadow-md border border-slate-200 overflow-hidden">
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
                        <p className="text-[11px] text-slate-900 dark:text-zinc-300 leading-relaxed pt-1.5 border-t border-slate-200/80 dark:border-zinc-800/80 font-medium line-clamp-2">
                          {desc}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </motion.div>
          )}

          {/* TAB 3: CERTIFICATES */}
          {activeTab === "certificates" && (
            <motion.div
              key="certificates"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className={cn(
                "grid gap-6 w-full",
                certItems.length <= 2 ? "grid-cols-1 md:grid-cols-2 max-w-3xl mx-auto" : "grid-cols-1 md:grid-cols-3"
              )}
            >
              {certItems.map((cert: any, idx: number) => {
                const tit = isEn && cert.titleEn ? cert.titleEn : cert.title;
                const iss = isEn && cert.issuerEn ? cert.issuerEn : cert.issuer;
                const per = isEn && cert.periodEn ? cert.periodEn : cert.period;
                const desc = isEn && cert.descriptionEn ? cert.descriptionEn : cert.description;
                const bdg = isEn && cert.badgeEn ? cert.badgeEn : cert.badge;

                return (
                  <div
                    key={cert.id || idx}
                    className="p-6 rounded-[2rem] bg-white/40 dark:bg-slate-950/75 border border-white/70 dark:border-cyan-500/25 backdrop-blur-2xl space-y-4 shadow-2xl flex flex-col justify-between group hover:border-cyan-400 transition-all"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0">
                          <Award className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                        </div>
                        <span className="px-3 py-1 rounded-full bg-white/60 dark:bg-slate-900 border border-white/80 dark:border-zinc-800 text-slate-900 dark:text-zinc-300 text-[11px] font-extrabold backdrop-blur-xs">
                          {per}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-base font-bold text-slate-950 dark:text-white tracking-tight group-hover:text-blue-600 dark:group-hover:text-cyan-300 transition-colors">
                          {tit}
                        </h3>
                        <p className="text-xs font-extrabold text-blue-700 dark:text-cyan-400 flex items-center gap-1.5 mt-1">
                          <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                          <span>{iss}</span>
                        </p>
                      </div>

                      {desc && (
                        <p className="text-xs text-slate-900 dark:text-zinc-300 leading-relaxed pt-2 border-t border-slate-200/80 dark:border-zinc-800/80 font-medium">
                          {desc}
                        </p>
                      )}
                    </div>

                    <div className="pt-2 flex items-center justify-between gap-2">
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
      </div>
    </section>
  );
}
