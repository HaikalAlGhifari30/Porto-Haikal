"use client";

import { useSafeLang } from "@/store/lang";
import { ShieldCheck, Cpu, Wrench, Sparkles, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

interface SkillItem {
  name: string;
  category: "Frontend" | "Backend" | "Database" | "Tools";
  icon?: string;
}

interface SkillsSectionProps {
  skills?: SkillItem[];
}

export function SkillsSection({ skills = [] }: SkillsSectionProps) {
  const { lang, t } = useSafeLang();
  const isEn = lang === "en";

  const defaultSkills: SkillItem[] = [
    // QA Skills & Testing
    { name: "QA Manual Testing", category: "Frontend" },
    { name: "Test Case Design & Execution", category: "Frontend" },
    { name: "Regression & Smoke Testing", category: "Frontend" },
    { name: "EFM & Live Broadcast Review", category: "Frontend" },

    // Systems & Analysis
    { name: "IT Business Analysis", category: "Backend" },
    { name: "System Analysis", category: "Backend" },
    { name: "ERD & DFD System Modeling", category: "Backend" },
    { name: "Flowchart & BPMN Mapping", category: "Backend" },

    // Testing Tools & Validation
    { name: "Postman API Testing", category: "Database" },
    { name: "Jira & Trello Bug Tracking", category: "Database" },
    { name: "Figma & Draw.io Diagramming", category: "Database" },
    { name: "MsWord & Google Sheets", category: "Database" },

    // Leadership & Soft Skills
    { name: "Organizational Leadership", category: "Tools" },
    { name: "Client Liaison & Communication", category: "Tools" },
    { name: "Problem Solving & Critical Thinking", category: "Tools" },
    { name: "Team Coordination & Collaboration", category: "Tools" },
  ];

  const skillData = skills.length > 0 ? skills : defaultSkills;

  const categories = [
    {
      key: "Frontend",
      title: isEn ? "QA SKILLS & TESTING" : "METODOLOGI & PENGUJIAN QA",
      icon: <ShieldCheck className="w-5 h-5 text-cyan-400" />,
    },
    {
      key: "Backend",
      title: isEn ? "SYSTEM ANALYSIS & MODELING" : "ANALISIS SISTEM & DFD/ERD",
      icon: <Cpu className="w-5 h-5 text-blue-400" />,
    },
    {
      key: "Database",
      title: isEn ? "TESTING TOOLS & API VALIDATION" : "PERANGKAT UJI & VALIDASI API",
      icon: <Wrench className="w-5 h-5 text-indigo-400" />,
    },
    {
      key: "Tools",
      title: isEn ? "LEADERSHIP & SOFT SKILLS" : "KEPEMIMPINAN & SOFT SKILLS",
      icon: <Sparkles className="w-5 h-5 text-emerald-400" />,
    },
  ];

  return (
    <section className="w-full max-w-6xl xl:max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-6 flex flex-col justify-center items-center text-zinc-900 dark:text-white">
      {/* Header */}
      <div className="max-w-3xl space-y-2.5 mb-6 sm:mb-8 text-center mx-auto px-1">
        <div className="inline-block px-3.5 py-1.5 bg-[#FACC15] border-2 border-black dark:border-white shadow-retro-sm text-black font-pixel text-xs uppercase font-bold tracking-wider mb-1">
          SKILL TREE // ATTRIBUTES
        </div>
        <h2 className="text-3xl sm:text-5xl font-pixel font-black tracking-tight text-black dark:text-white uppercase">
          {t('section.skills')}
        </h2>
        <p className="font-sans text-sm sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed font-medium max-w-2xl mx-auto">
          {isEn
            ? "Technical competencies, quality assurance methodologies, and professional tooling"
            : "Kompetensi teknis, metodologi pengujian mutu, dan perangkat pengujian profesional"}
        </p>
      </div>

      {/* Categorized Skills Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5 sm:gap-5 lg:gap-7 w-full">
        {categories.map((cat, cIdx) => {
          let catSkills = skillData.filter((s) => s.category === cat.key);
          if (catSkills.length === 0) {
            catSkills = defaultSkills.filter((s) => s.category === cat.key);
          }

          return (
            <motion.div
              key={cat.key}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: cIdx * 0.1 }}
              className="p-3.5 sm:p-5 lg:p-6 bg-white dark:bg-[#151B22] border-3 border-black dark:border-white shadow-retro-md space-y-3 sm:space-y-4 group flex flex-col justify-between"
            >
              <div className="flex items-center gap-2.5 sm:gap-3 border-b-2 border-black/10 dark:border-white/10 pb-2.5 sm:pb-3.5">
                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-[#FACC15] border-2 border-black dark:border-white text-black flex items-center justify-center shrink-0 shadow-retro-xs">
                  {cat.icon}
                </div>
                <h3 className="font-sans text-xs sm:text-base lg:text-lg font-black text-black dark:text-white tracking-wide uppercase truncate">{cat.title}</h3>
              </div>

              <div className="grid grid-cols-1 min-[480px]:grid-cols-2 sm:grid-cols-2 gap-2 sm:gap-2.5">
                {catSkills.map((sk, i) => (
                  <div
                    key={i}
                    className="p-2 sm:p-3 bg-[#FAF6ED] dark:bg-[#0E1217] border-2 border-black dark:border-white shadow-retro-xs hover:bg-[#FACC15] hover:text-black hover:scale-[1.01] active:scale-95 transition-all flex items-center gap-2 sm:gap-2.5 group/item cursor-default btn-retro"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600 dark:text-yellow-400 group-hover/item:text-black shrink-0" />
                    <span className="font-sans text-xs sm:text-sm font-bold text-black dark:text-zinc-100 group-hover/item:text-black leading-snug">
                      {sk.name}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
