"use client";

import { useSafeLang } from "@/store/lang";
import { Briefcase, ChevronDown, ChevronRight, ChevronUp, Clock, Sparkles } from "lucide-react";
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

  const isAllExpanded = Object.keys(expandedCards).length === items.length && items.length > 0;

  const toggleExpandAll = () => {
    if (isAllExpanded) {
      setExpandedCards({});
    } else {
      const allState: Record<number, boolean> = {};
      items.forEach((_, idx) => {
        allState[idx] = true;
      });
      setExpandedCards(allState);
    }
  };

  const getJobBadge = (company: string) => {
    if (company.includes("Artristik")) return { label: isEn ? "Full-time" : "Penuh Waktu", color: "bg-emerald-500/15 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/30" };
    if (company.includes("COMO")) return { label: isEn ? "Contract" : "Kontrak", color: "bg-cyan-500/15 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 border-cyan-500/30" };
    if (company.includes("Volunteer")) return { label: "Volunteer", color: "bg-purple-500/15 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 border-purple-500/30" };
    if (company.includes("KPU")) return { label: isEn ? "Internship" : "Magang", color: "bg-amber-500/15 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30" };
    return { label: "Ambassador", color: "bg-blue-500/15 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 border-blue-500/30" };
  };

  return (
    <section id="experience" className="py-2 sm:py-6 lg:py-8 relative overflow-hidden bg-transparent text-zinc-900 dark:text-white">
      <div className="container-original relative z-10 mx-auto px-2 sm:px-4 max-w-6xl xl:max-w-7xl">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-1.5 sm:space-y-2.5 mb-3.5 sm:mb-8 text-center mx-auto px-1">
          <div className="inline-block px-2.5 sm:px-3.5 py-1 sm:py-1.5 bg-[#FACC15] border-2 border-black dark:border-white shadow-retro-sm text-black font-pixel text-[10px] sm:text-xs uppercase font-bold tracking-wider mb-0.5 sm:mb-1">
            QUEST LOG // CAREER TIMELINE
          </div>
          <h2 className="text-2xl sm:text-5xl font-pixel font-black tracking-tight text-black dark:text-white uppercase leading-tight">
            {t('section.experience')}
          </h2>
          <p className="font-sans text-xs sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed font-medium max-w-2xl mx-auto">
            {t('section.experience.desc')}
          </p>
        </div>

        {/* 8-Bit Expand / Collapse Toggle Button */}
        <div className="flex items-center justify-center mb-4 sm:mb-8">
          <button
            onClick={toggleExpandAll}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-1.5 sm:py-2.5 border-2 border-black dark:border-white bg-[#FACC15] text-black font-sans text-xs sm:text-sm font-black tracking-wider shadow-retro-sm btn-retro transition-all cursor-pointer uppercase"
          >
            <span>
              {isAllExpanded
                ? (isEn ? "[−] COLLAPSE ALL QUESTS" : "[−] TUTUP SEMUA QUEST")
                : (isEn ? "[+] EXPAND ALL QUESTS" : "[+] BUKA SEMUA QUEST")}
            </span>
            {isAllExpanded ? (
              <ChevronUp className="w-4 h-4 font-bold" />
            ) : (
              <ChevronDown className="w-4 h-4 font-bold" />
            )}
          </button>
        </div>

        {/* Timeline Layout (Central Retro Pixel Line) */}
        <div className="relative space-y-4 sm:space-y-8 md:space-y-10">
          
          {/* Central Line */}
          <div className="absolute left-3.5 sm:left-6 md:left-1/2 top-4 bottom-4 w-1 bg-black dark:bg-white -translate-x-1/2 opacity-70 border-dashed" />

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
            const jobBadge = getJobBadge(comp);

            return (
              <motion.div
                key={exp.id || idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6"
              >
                {/* Central Timeline 8-Bit Pixel Milestone Marker */}
                <div className="absolute left-3.5 sm:left-6 md:left-1/2 top-4 sm:top-6 -translate-x-1/2 z-20 w-5 h-5 sm:w-6 sm:h-6 bg-[#FACC15] border-2 border-black dark:border-white shadow-retro-xs flex items-center justify-center font-pixel text-[8px] sm:text-[9px] font-bold text-black">
                  {idx + 1}
                </div>

                {/* Card Position (Alternating Left & Right on Desktop) */}
                <div
                  className={`w-full md:w-[calc(50%-2rem)] lg:w-[calc(50%-2.5rem)] pl-7 sm:pl-14 md:pl-0 ${
                    isEven ? "md:mr-auto md:text-left" : "md:ml-auto md:text-left"
                  }`}
                >
                  {/* Card Container (8-Bit Retro Box) */}
                  <div className="group relative bg-white dark:bg-[#151B22] border-2 sm:border-3 border-black dark:border-white shadow-retro-sm sm:shadow-retro-md transition-all duration-300 p-3 sm:p-5 lg:p-7 space-y-2.5 sm:space-y-4">
                    
                    {/* Header Bar: Job Type Badge & Toggle Chevron Button */}
                    <div className="flex items-center justify-between gap-3">
                      <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 border-2 border-black dark:border-white bg-[#FAF6ED] dark:bg-[#0E1217] text-black dark:text-white font-sans text-[11px] sm:text-xs uppercase font-black tracking-wider shadow-retro-xs">
                        {jobBadge.label}
                      </span>

                      <button
                        onClick={() => toggleCard(idx)}
                        type="button"
                        aria-label="Toggle details"
                        title={isExpanded ? "Tutup Rincian" : "Buka Rincian"}
                        className="p-1.5 sm:p-2 border-2 border-black dark:border-white bg-white dark:bg-[#0E1217] text-black dark:text-white shadow-retro-xs btn-retro transition-all flex items-center justify-center cursor-pointer"
                      >
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 font-bold" />
                        ) : (
                          <ChevronDown className="w-4 h-4 font-bold" />
                        )}
                      </button>
                    </div>

                    {/* Position & Company Title with Logo */}
                    <div className="space-y-1 sm:space-y-1.5">
                      <h3 className="font-sans text-sm sm:text-lg font-black text-black dark:text-white tracking-tight leading-snug">
                        {pos}
                      </h3>

                      <div className="flex items-center gap-2 sm:gap-2.5">
                        {logo ? (
                          <div className="w-7 h-7 sm:w-8 sm:h-8 bg-white p-0.5 flex items-center justify-center shrink-0 border-2 border-black dark:border-white shadow-retro-xs overflow-hidden">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={logo} alt={comp} className="w-full h-full object-contain" />
                          </div>
                        ) : (
                          <Briefcase className="w-4 h-4 text-blue-600 dark:text-yellow-400 shrink-0" />
                        )}
                        <p className="font-sans text-xs sm:text-sm font-bold text-blue-600 dark:text-yellow-400">{comp}</p>
                      </div>
                    </div>

                    {/* Meta Line: Period & Location */}
                    <div className="flex items-center gap-2 font-sans text-xs text-zinc-700 dark:text-zinc-300 font-semibold">
                      <Clock className="w-4 h-4 text-black dark:text-yellow-400 shrink-0" />
                      <span>{per}</span>
                    </div>

                    {/* Concise Summary Description */}
                    {bullets.length > 0 && !isExpanded && (
                      <p className="font-sans text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed font-medium pt-3 border-t-2 border-black/10 dark:border-white/10">
                        {bullets[0]}
                      </p>
                    )}

                    {/* Expanded Detail Dropdown */}
                    {isExpanded && (
                      <div className="pt-3.5 border-t-2 border-black/10 dark:border-white/10 space-y-3.5">
                        <p className="font-sans text-xs text-blue-600 dark:text-yellow-400 uppercase font-black tracking-wider flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-blue-600 dark:text-yellow-400" />
                          <span>{isEn ? "QUEST OBJECTIVES & RESPONSIBILITIES:" : "TARGET & TANGGUNG JAWAB QUEST:"}</span>
                        </p>

                        <ul className="space-y-2.5">
                          {bullets.map((bullet, bIdx) => (
                            <li key={bIdx} className="flex items-start gap-2.5 font-sans text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed font-medium">
                              <ChevronRight className="w-4 h-4 text-blue-600 dark:text-yellow-400 shrink-0 mt-0.5" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Skill Tags at Bottom */}
                    {techList.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-2.5 sm:pt-3 border-t-2 border-black/10 dark:border-white/10">
                        {techList.map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2 py-0.5 sm:px-2.5 sm:py-1 text-[10px] sm:text-xs font-sans font-bold bg-[#FAF6ED] dark:bg-[#0E1217] border border-black dark:border-white text-black dark:text-white shadow-retro-xs"
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
