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
    <section className="w-full max-w-5xl mx-auto px-4 py-4 sm:py-6 flex flex-col justify-center items-center text-zinc-900 dark:text-white my-auto">
      {/* Header */}
      <div className="max-w-2xl space-y-2 mb-6 text-center mx-auto">
        <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-blue-700 to-cyan-600 dark:from-white dark:via-cyan-200 dark:to-cyan-400">
          {t('section.skills')}
        </h2>
        <p className="text-slate-600 dark:text-zinc-400 text-xs leading-relaxed font-medium">
          {isEn
            ? "Technical competencies, quality assurance methodologies, and professional tooling"
            : "Kompetensi teknis, metodologi pengujian mutu, dan perangkat pengujian profesional"}
        </p>
      </div>

      {/* Categorized Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
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
              className="p-5 sm:p-6 rounded-[2rem] bg-white/40 dark:bg-slate-950/75 border border-white/70 dark:border-cyan-500/25 backdrop-blur-2xl space-y-4 shadow-2xl shadow-blue-900/5 dark:shadow-cyan-950/40 hover:border-cyan-400 transition-all duration-300 group"
            >
              <div className="flex items-center gap-3 border-b border-slate-200/80 dark:border-zinc-800 pb-3">
                <div className="w-9 h-9 rounded-xl bg-white/60 dark:bg-slate-900 border border-white/80 dark:border-zinc-800 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform backdrop-blur-xs">
                  {cat.icon}
                </div>
                <h3 className="text-xs font-black text-blue-700 dark:text-cyan-300 tracking-wider uppercase">{cat.title}</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {catSkills.map((sk, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-white/50 dark:bg-slate-900/70 border border-white/80 dark:border-zinc-800/80 hover:border-cyan-400/60 transition-all flex items-center gap-2.5 group/item shadow-2xs backdrop-blur-xs"
                  >
                    <CheckCircle2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0 opacity-80 group-hover/item:opacity-100" />
                    <span className="text-xs font-bold text-slate-900 dark:text-zinc-200 group-hover/item:text-blue-700 dark:group-hover/item:text-white transition-colors">
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
