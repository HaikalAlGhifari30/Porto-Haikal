"use client";

import { useSafeLang } from "@/store/lang";
import { Award, Briefcase, Calendar, CheckCircle2, ChevronDown, ChevronRight, ChevronUp, MapPin, Sparkles, Clock } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

interface ExperienceItem {
  id?: string;
  position: string;
  positionEn?: string;
  company: string;
  companyEn?: string;
  logoUrl?: string;
  period: string;
  periodEn?: string;
  description?: string;
  descriptionEn?: string;
  technologies?: string;
}

interface ExperienceSectionProps {
  experiences?: ExperienceItem[];
}

export function ExperienceSection({ experiences = [] }: ExperienceSectionProps) {
  const { lang, t } = useSafeLang();
  const isEn = lang === "en";

  const defaultExperiences: ExperienceItem[] = [
    {
      position: "QA Manual Tester EFM",
      positionEn: "QA Manual Tester EFM",
      company: "COMO 1907 - Global Media Visual",
      companyEn: "COMO 1907 - Global Media Visual",
      logoUrl: "/companies/como-1907.png",
      period: "Apr 2026 — Sekarang · Jakarta, Indonesia",
      periodEn: "Apr 2026 — Present · Jakarta, Indonesia",
      description:
        "Melakukan manual testing, validasi formulir, serta verifikasi alur pengguna end-to-end pada 11 platform digital Como 1907. Memantau performa VOD, siaran langsung, pengujian asap (smoke testing), regresi, dan UAT.",
      descriptionEn:
        "Executed manual testing, form validation, and end-to-end user flow verification across 11 Como 1907 digital platforms. Monitored VOD streaming performance, live broadcasts, smoke, regression, and UAT testing.",
      technologies: "Regression Testing, Smoke Testing, UAT, Manual Testing, VOD Review, Bug Tracking, Post-Release Monitoring",
    },
    {
      position: "QA Manual Tester",
      positionEn: "QA Manual Tester",
      company: "PT Artristik Studio Bandung",
      companyEn: "PT Artristik Studio Bandung",
      logoUrl: "/companies/artristik-studio.jpg",
      period: "Feb 2025 — Feb 2026 · Bandung, Indonesia",
      periodEn: "Feb 2025 — Feb 2026 · Bandung, Indonesia",
      description:
        "Melaksanakan pengujian manual aplikasi seluler dan web, dokumentasi bug, serta perancangan skenario uji. Mengendalikan dan memimpin sesi UAT langsung bersama pihak DJK untuk sistem LIT NON-TR.",
      descriptionEn:
        "Conducted manual testing for web and mobile apps, bug documentation, and test scenario design. Facilitated direct UAT sessions with DJK for the LIT NON-TR system.",
      technologies: "Manual Testing, Client Liaison, Bug Documentation, UAT Sessions with DJK (LIT NON-TR), Requirement Gathering",
    },
    {
      position: "Volunteer",
      positionEn: "Volunteer",
      company: "By.U X Menjadi Manusia",
      companyEn: "By.U X Menjadi Manusia",
      period: "Mar 2025 · Jakarta, Indonesia",
      periodEn: "Mar 2025 · Jakarta, Indonesia",
      description:
        "Menyambut dan membantu pengunjung di booth by.U x Menjadi Manusia, memberikan informasi program, serta mendokumentasikan koordinasi kegiatan selama acara berlangsung.",
      descriptionEn:
        "Welcomed and assisted visitors at the by.U x Menjadi Manusia booth, provided program details, and coordinated event activities.",
      technologies: "Public Relations, Event Coordination, Visitor Assistance",
    },
    {
      position: "Staff Intern",
      positionEn: "Staff Intern",
      company: "KPU Provinsi Jawa Barat",
      companyEn: "KPU Provinsi Jawa Barat",
      period: "Sep 2023 — Oct 2023 · Bandung, Indonesia",
      periodEn: "Sep 2023 — Oct 2023 · Bandung, Indonesia",
      description:
        "Membantu Divisi SDM dalam rekapitulasi pendaftaran anggota PPPK KPU Jabar serta mengelola dan mencatat data transaksi keuangan KPU Jawa Barat.",
      descriptionEn:
        "Assisted the HR Division in PPPK registration recapitulation and managed financial data logging for KPU West Java.",
      technologies: "Data Recapitulation, HR Support, Finance Recording",
    },
    {
      position: "Campus Ambassador",
      positionEn: "Campus Ambassador",
      company: "Danacita",
      companyEn: "Danacita",
      period: "Jun 2022 — Sep 2023 · Bandung, Indonesia",
      periodEn: "Jun 2022 — Sep 2023 · Bandung, Indonesia",
      description:
        "Membantu mempromosikan program edukasi Danacita di lingkungan Universitas Komputer Indonesia (UNIKOM) dan mengoordinasikan kegiatan komunitas mahasiswa se-Bandung.",
      descriptionEn:
        "Promoted Danacita educational programs within UNIKOM and coordinated student community events across Bandung.",
      technologies: "Campus Promotion, Community Engagement, Event Management",
    },
  ];

  const items = experiences.length > 0 ? experiences : defaultExperiences;

  // Track expanded state for each card (Default ALL closed)
  const [expandedCards, setExpandedCards] = useState<Record<number, boolean>>({});

  const toggleCard = (index: number) => {
    setExpandedCards((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const expandAll = () => {
    const allState: Record<number, boolean> = {};
    items.forEach((_, idx) => {
      allState[idx] = true;
    });
    setExpandedCards(allState);
  };

  const collapseAll = () => {
    setExpandedCards({});
  };

  const getJobBadge = (company: string, index: number) => {
    if (company.includes("Artristik")) return { label: isEn ? "Full-time" : "Penuh Waktu", color: "bg-emerald-500/15 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/30" };
    if (company.includes("COMO")) return { label: isEn ? "Contract" : "Kontrak", color: "bg-cyan-500/15 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 border-cyan-500/30" };
    if (company.includes("Volunteer")) return { label: "Volunteer", color: "bg-purple-500/15 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 border-purple-500/30" };
    if (company.includes("KPU")) return { label: isEn ? "Internship" : "Magang", color: "bg-amber-500/15 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30" };
    return { label: "Ambassador", color: "bg-blue-500/15 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 border-blue-500/30" };
  };

  return (
    <section id="experience" className="py-24 relative overflow-hidden bg-transparent text-zinc-900 dark:text-white transition-colors duration-500">
      <div className="container-original relative z-10 mx-auto px-4 max-w-6xl">
        
        {/* Section Header */}
        <div className="max-w-2xl space-y-3 mb-10 text-center mx-auto">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-blue-900 to-cyan-800 dark:from-white dark:via-cyan-200 dark:to-cyan-400 bg-clip-text text-transparent pb-2 pt-1 leading-tight">
            {t('section.experience')}
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-xs md:text-sm leading-relaxed font-medium">
            {t('section.experience.desc')}
          </p>
        </div>

        {/* Global Expand / Collapse Control Pills */}
        <div className="flex items-center justify-center gap-3 mb-16">
          <button
            onClick={expandAll}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/90 dark:bg-zinc-900/90 border border-slate-200 dark:border-zinc-800 hover:border-cyan-500/50 text-zinc-800 dark:text-zinc-200 text-xs font-bold transition-all shadow-sm dark:shadow-md backdrop-blur-md"
          >
            <span>{isEn ? "Expand All Cards" : "Buka Semua Card"}</span>
            <ChevronDown className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
          </button>

          <button
            onClick={collapseAll}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/90 dark:bg-zinc-900/90 border border-slate-200 dark:border-zinc-800 hover:border-cyan-500/50 text-zinc-800 dark:text-zinc-200 text-xs font-bold transition-all shadow-sm dark:shadow-md backdrop-blur-md"
          >
            <span>{isEn ? "Collapse All" : "Tutup Semua"}</span>
            <ChevronUp className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
          </button>
        </div>

        {/* Timeline Layout (Central Line with Alternating Clean Cards) */}
        <div className="relative space-y-10 md:space-y-12">
          
          {/* Central Line */}
          <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-blue-600 via-cyan-400 to-indigo-600 dark:from-cyan-400 dark:via-purple-500 dark:to-indigo-500 -translate-x-1/2 opacity-40" />

          {items.map((exp, idx) => {
            const isExpanded = !!expandedCards[idx];
            const pos = isEn && exp.positionEn ? exp.positionEn : exp.position;
            const comp = isEn && exp.companyEn ? exp.companyEn : exp.company;
            const per = isEn && exp.periodEn ? exp.periodEn : exp.period;
            const rawDesc = isEn && exp.descriptionEn ? exp.descriptionEn : exp.description;
            
            let logo = exp.logoUrl;
            if (!logo) {
              if (comp.includes("COMO")) logo = "/companies/como-1907.png";
              else if (comp.includes("Artristik")) logo = "/companies/artristik-studio.jpg";
            }

            const bullets = rawDesc
              ? rawDesc
                  .split("\n")
                  .map((line) => line.replace(/^[•\-\*\s]+/, "").trim())
                  .filter((line) => line.length > 0)
              : [];

            const techList = exp.technologies ? exp.technologies.split(",").map((t) => t.trim()) : [];
            const isEven = idx % 2 === 0;
            const jobBadge = getJobBadge(comp, idx);

            return (
              <motion.div
                key={exp.id || idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative flex flex-col md:flex-row items-center justify-between gap-6"
              >
                {/* Central Timeline Glowing Node */}
                <div className="absolute left-6 md:left-1/2 top-6 -translate-x-1/2 z-20 w-4 h-4 rounded-full bg-blue-600 dark:bg-cyan-400 border-2 border-white dark:border-slate-950 shadow-[0_0_15px_rgba(34,211,238,0.9)]" />

                {/* Card Position (Alternating Left & Right on Desktop) */}
                <div
                  className={`w-full md:w-[calc(50%-2.5rem)] pl-14 md:pl-0 ${
                    isEven ? "md:mr-auto md:text-left" : "md:ml-auto md:text-left"
                  }`}
                >
                  {/* Card Container (Slim, Sleek & Compact) */}
                  <div className="group relative rounded-2xl bg-white/80 dark:bg-[#070e20]/80 border border-slate-200/90 dark:border-cyan-500/20 hover:border-blue-500/50 dark:hover:border-cyan-400/50 transition-all duration-300 shadow-md dark:shadow-xl overflow-hidden backdrop-blur-2xl p-5 sm:p-6 space-y-3.5">
                    
                    {/* Header Bar: Job Type Badge & Icon-only Toggle Chevron Button */}
                    <div className="flex items-center justify-between gap-3">
                      <span className={`px-2.5 py-0.5 rounded-full border text-[10px] font-bold tracking-wider ${jobBadge.color}`}>
                        {jobBadge.label}
                      </span>

                      <button
                        onClick={() => toggleCard(idx)}
                        type="button"
                        aria-label="Toggle details"
                        title={isExpanded ? "Tutup Rincian" : "Buka Rincian"}
                        className="p-1.5 rounded-xl bg-slate-100 dark:bg-zinc-900/90 border border-slate-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-cyan-400 hover:border-cyan-500/50 transition-all flex items-center justify-center shadow-2xs group/btn cursor-pointer"
                      >
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-blue-600 dark:text-cyan-400 transition-transform group-hover/btn:-translate-y-0.5" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-zinc-500 dark:text-zinc-400 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-transform group-hover/btn:translate-y-0.5" />
                        )}
                      </button>
                    </div>

                    {/* Position & Company Title with Logo */}
                    <div className="space-y-1.5">
                      <h3 className="text-lg md:text-xl font-bold text-zinc-900 dark:text-white tracking-tight group-hover:text-blue-600 dark:group-hover:text-cyan-300 transition-colors">
                        {pos}
                      </h3>

                      <div className="flex items-center gap-2.5">
                        {logo ? (
                          <div className="w-7 h-7 rounded-lg bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-0.5 flex items-center justify-center shrink-0 shadow-2xs overflow-hidden">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={logo} alt={comp} className="w-full h-full object-contain rounded-md" />
                          </div>
                        ) : (
                          <Briefcase className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400 shrink-0" />
                        )}
                        <p className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">{comp}</p>
                      </div>
                    </div>

                    {/* Meta Line: Period & Location */}
                    <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                      <Clock className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400 shrink-0" />
                      <span>{per}</span>
                    </div>

                    {/* Concise Summary Description */}
                    {bullets.length > 0 && !isExpanded && (
                      <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal pt-2.5 border-t border-slate-200/80 dark:border-zinc-800/80">
                        {bullets[0]}
                      </p>
                    )}

                    {/* Expanded Detail Dropdown */}
                    {isExpanded && (
                      <div className="pt-3 border-t border-slate-200/80 dark:border-zinc-800/80 space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                        <p className="text-[10px] font-extrabold uppercase tracking-widest text-blue-600 dark:text-cyan-400 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>{isEn ? "AUDIT SCOPE & RESPONSIBILITIES:" : "CAKUPAN PENGUJIAN & TANGGUNG JAWAB AUDIT:"}</span>
                        </p>

                        <ul className="space-y-2">
                          {bullets.map((bullet, bIdx) => (
                            <li key={bIdx} className="flex items-start gap-2 text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal">
                              <ChevronRight className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Skill Tags at Bottom */}
                    {techList.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-2.5 border-t border-slate-200/60 dark:border-zinc-800/60">
                        {techList.map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2.5 py-0.5 rounded-lg bg-slate-100 dark:bg-zinc-900/90 border border-slate-200 dark:border-zinc-800 text-[10px] text-zinc-700 dark:text-zinc-300 font-semibold shadow-2xs"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                  </div>
                </div>

              </motion.div>
            );
          })}

        </div>
      </div>
    </section>
  );
}
