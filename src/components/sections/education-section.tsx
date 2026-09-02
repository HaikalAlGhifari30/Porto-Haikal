"use client";

import { useSafeLang } from "@/store/lang";
import { GraduationCap, Calendar, Award, BookOpen, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

interface EducationItem {
  id?: string;
  institution: string;
  institutionEn?: string;
  degree: string;
  degreeEn?: string;
  period: string;
  periodEn?: string;
  description?: string;
  descriptionEn?: string;
}

interface EducationSectionProps {
  educations?: EducationItem[];
}

export function EducationSection({ educations = [] }: EducationSectionProps) {
  const { lang, t } = useSafeLang();
  const isEn = lang === "en";

  const defaultEducations: EducationItem[] = [
    {
      institution: "Universitas Komputer Indonesia (UNIKOM)",
      institutionEn: "Universitas Komputer Indonesia (UNIKOM)",
      degree: "S1 Teknik Informatika (S.Kom) — IPK 3.46",
      degreeEn: "Bachelor of Informatics Engineering (S.Kom) — GPA: 3.46",
      period: "Sep 2020 — Feb 2025 · Bandung, Indonesia",
      periodEn: "Sep 2020 — Feb 2025 · Bandung, Indonesia",
      description:
        "Bidang Minat Utama: Quality Assurance, IT Business Analyst, System Analyst, UI/UX.\nJudul Skripsi: \"Sistem Penentuan Jumlah Pembelian Produk pada Arbie Snack Menggunakan Metode Single Exponential Smoothing\"",
      descriptionEn:
        "Key Interests: Quality Assurance, IT Business Analyst, System Analyst, UI/UX.\nThesis: \"Product Purchase Quantity Determination System at Arbie Snack Using the Single Exponential Smoothing Method\"",
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
    },
  ];

  const items = educations.length > 0 ? educations : defaultEducations;

  return (
    <section id="education" className="py-24 relative overflow-hidden bg-transparent text-zinc-900 dark:text-white transition-colors duration-500">
      {/* Background Orbs */}
      <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-blue-500/5 dark:bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-original relative z-10 mx-auto px-4 max-w-4xl">
        {/* Section Header */}
        <div className="max-w-2xl space-y-3 mb-16 text-center mx-auto">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-blue-900 to-cyan-800 dark:from-white dark:via-cyan-200 dark:to-cyan-400 bg-clip-text text-transparent pb-2 pt-1 leading-tight">
            {t('section.education')}
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-xs md:text-sm leading-relaxed font-medium">
            {t('section.education.desc')}
          </p>
        </div>

        {/* Education Cards */}
        <div className="space-y-6">
          {items.map((edu, idx) => {
            const inst = isEn && edu.institutionEn ? edu.institutionEn : edu.institution;
            const deg = isEn && edu.degreeEn ? edu.degreeEn : edu.degree;
            const per = isEn && edu.periodEn ? edu.periodEn : edu.period;
            const desc = isEn && edu.descriptionEn ? edu.descriptionEn : edu.description;

            let logo = "/logo_unikom.png";
            if (inst.includes("SMAN 3") || inst.includes("Karawang")) {
              logo = "/education/sman3karawang.png";
            }

            const lines = desc ? desc.split("\n").filter((l) => l.trim().length > 0) : [];

            return (
              <motion.div
                key={edu.id || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                whileHover={{ y: -6, scale: 1.01 }}
                className="p-8 rounded-[2rem] bg-white/80 dark:bg-zinc-950/80 border border-slate-200/80 dark:border-zinc-800/80 hover:border-cyan-400 dark:hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] transition-all duration-500 backdrop-blur-2xl space-y-5 shadow-sm dark:shadow-2xl group relative overflow-hidden"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-white p-2 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform overflow-hidden shadow-md border border-slate-200">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={logo} alt={inst} className="w-full h-full object-contain" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold text-zinc-900 dark:text-white tracking-tight group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">{inst}</h3>
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-xs md:text-sm font-bold text-blue-600 dark:text-cyan-400">{deg}</p>
                        {deg.includes("3.46") && (
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">IPK 3.46</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 text-xs font-semibold shadow-2xs">
                    <Calendar className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
                    <span>{per}</span>
                  </div>
                </div>

                {lines.length > 0 && (
                  <div className="pt-4 border-t border-slate-200 dark:border-zinc-800/80 space-y-2 text-xs md:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                    {lines.map((line, lIdx) => (
                      <div key={lIdx} className="flex items-start gap-2.5 font-normal">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{line}</span>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
