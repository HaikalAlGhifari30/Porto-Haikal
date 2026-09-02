"use client";

import { useSafeLang } from "@/store/lang";
import { UserCheck, GraduationCap, ShieldCheck, Target } from "lucide-react";
import { motion } from "framer-motion";

interface AboutSectionClientProps {
  settings?: any;
}

export function AboutSectionClient({ settings }: AboutSectionClientProps) {
  const { lang, t } = useSafeLang();
  const isEn = lang === "en";

  const bioText = isEn
    ? (settings?.aboutTextEn || "Bachelor of Informatics Engineering graduate from Universitas Komputer Indonesia with a GPA of 3.46 and a core focus on Quality Assurance, IT Business Analysis, and System Analysis. Proficient in manual testing for web and mobile applications, business requirement gathering, and system modeling using DFD, ERD, and flowcharts. Experienced leader with strong communication, collaboration, and problem-solving skills.")
    : (settings?.aboutText || "Lulusan S1 Teknik Informatika dari Universitas Komputer Indonesia (UNIKOM) dengan IPK 3.46 dan fokus utama pada Quality Assurance, IT Business Analysis, dan System Analysis. Mahir dalam pengujian manual (manual testing) untuk platform web dan seluler, analisis kebutuhan bisnis, serta pemodelan sistem menggunakan DFD, ERD, dan flowchart. Memiliki pengalaman kepemimpinan sebagai Ketua Himpunan Mahasiswa (HMIF UNIKOM), serta keahlian komunikasi, kolaborasi, dan pemecahan masalah yang kuat.");

  const highlightCards = [
    {
      icon: <GraduationCap className="w-5 h-5 text-blue-600 dark:text-cyan-400" />,
      title: isEn ? "Education & Academic" : "Lulusan S1 Teknik Informatika",
      desc: isEn
        ? "Bachelor of Informatics Engineering (S.Kom) from UNIKOM with 3.46 GPA."
        : "Gelar S1 Teknik Informatika UNIKOM dengan IPK 3.46 dan fondasi ilmu komputer yang kuat.",
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />,
      title: isEn ? "Manual & Functional Testing" : "Manual & Functional Testing",
      desc: isEn
        ? "Structured test case design, boundary value analysis, regression, smoke, and UAT."
        : "Perancangan test case terstruktur, analisis nilai batas, verifikasi regresi, smoke, dan UAT.",
    },
    {
      icon: <Target className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
      title: isEn ? "Client & Team Collaboration" : "Kolaborasi Klien & Tim",
      desc: isEn
        ? "Liaison between technical teams and clients, conducting UAT sessions with DJK for LIT NON-TR."
        : "Penghubung tim teknis & klien, serta memimpin sesi UAT bersama DJK untuk sistem LIT NON-TR.",
    },
  ];

  return (
    <section id="about" className="py-12 lg:py-16 relative overflow-hidden bg-transparent text-zinc-900 dark:text-white transition-colors duration-500">
      {/* Glow Effects */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/5 dark:bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-500/5 dark:bg-blue-600/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="container-original relative z-10 mx-auto px-4 max-w-6xl">
        {/* Section Header */}
        <div className="max-w-2xl space-y-2 mb-10 text-center mx-auto">
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-blue-900 to-cyan-800 dark:from-white dark:via-cyan-200 dark:to-cyan-400 bg-clip-text text-transparent pb-1 pt-1 leading-tight">
            {t('section.about')}
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-xs md:text-sm leading-relaxed font-medium">
            {t('section.about.desc')}
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Main Bio Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -6, scale: 1.01 }}
            className="lg:col-span-6 p-8 md:p-10 rounded-[2.2rem] bg-white/80 dark:bg-zinc-950/80 border border-slate-200/80 dark:border-zinc-800/80 hover:border-cyan-400 dark:hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] transition-all duration-500 backdrop-blur-2xl shadow-sm dark:shadow-2xl flex flex-col justify-between space-y-6 relative overflow-hidden group"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 dark:bg-cyan-500/10 border border-blue-500/20 dark:border-cyan-500/30 flex items-center justify-center">
                <UserCheck className="w-6 h-6 text-blue-600 dark:text-cyan-400" />
              </div>
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">
                Haikal Al Ghifari, S.Kom
              </h3>
              <p className="text-xs text-blue-600 dark:text-cyan-400 font-bold uppercase tracking-wider">
                Universitas Komputer Indonesia (UNIKOM)
              </p>
              <p className="text-xs md:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal pt-2 border-t border-slate-200 dark:border-zinc-800/80">
                {bioText}
              </p>
            </div>
          </motion.div>

          {/* Highlight Cards Grid */}
          <div className="lg:col-span-6 grid grid-cols-1 gap-4">
            {highlightCards.map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -4, scale: 1.01 }}
                className="p-6 rounded-[2rem] bg-white/80 dark:bg-zinc-950/80 border border-slate-200/80 dark:border-zinc-800/80 hover:border-cyan-400 dark:hover:border-cyan-400 hover:shadow-[0_0_25px_rgba(34,211,238,0.25)] transition-all duration-500 backdrop-blur-2xl space-y-3 shadow-sm dark:shadow-xl group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 flex items-center justify-center shrink-0">
                    {card.icon}
                  </div>
                  <h4 className="text-base font-bold text-zinc-900 dark:text-white tracking-tight group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                    {card.title}
                  </h4>
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
                  {card.desc}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
