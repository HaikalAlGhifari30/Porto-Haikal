"use client";

import { useSafeLang } from "@/store/lang";
import { Code2, Database, Layers, Wrench, CheckCircle2, ShieldCheck, FileSpreadsheet, Cpu, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface SkillItem {
  name: string;
  category: "Frontend" | "Backend" | "Database" | "Tools";
  icon?: string;
  proficiency?: number;
}

interface SkillsSectionProps {
  skills?: SkillItem[];
}

export function SkillsSection({ skills = [] }: SkillsSectionProps) {
  const { lang, t } = useSafeLang();
  const isEn = lang === "en";

  const defaultSkills: SkillItem[] = [
    // Category 1: Frontend (Metodologi & Pengujian QA)
    { name: "QA Manual Testing", category: "Frontend", proficiency: 96 },
    { name: "Test Case Design & Execution", category: "Frontend", proficiency: 95 },
    { name: "Regression & Smoke Testing", category: "Frontend", proficiency: 94 },
    { name: "EFM & Live Broadcast Review", category: "Frontend", proficiency: 92 },

    // Category 2: Backend (Analisis Sistem & Pemodelan DFD/ERD)
    { name: "IT Business Analysis", category: "Backend", proficiency: 94 },
    { name: "System Analysis", category: "Backend", proficiency: 92 },
    { name: "ERD & DFD System Modeling", category: "Backend", proficiency: 90 },
    { name: "Flowchart & BPMN Mapping", category: "Backend", proficiency: 94 },

    // Category 3: Database (Perangkat Uji & Validasi API)
    { name: "Postman API Testing", category: "Database", proficiency: 88 },
    { name: "Jira & Trello Bug Tracking", category: "Database", proficiency: 95 },
    { name: "Figma & Draw.io Diagramming", category: "Database", proficiency: 90 },
    { name: "MsWord & Google Sheets", category: "Database", proficiency: 95 },

    // Category 4: Tools (Kepemimpinan & Soft Skills)
    { name: "Organizational Leadership", category: "Tools", proficiency: 96 },
    { name: "Client Liaison & Communication", category: "Tools", proficiency: 95 },
    { name: "Problem Solving & Critical Thinking", category: "Tools", proficiency: 95 },
    { name: "Team Coordination & Collaboration", category: "Tools", proficiency: 94 },
  ];

  const skillData = skills.length > 0 ? skills : defaultSkills;

  const categories = [
    {
      key: "Frontend",
      title: isEn ? "Quality Assurance & Testing" : "Metodologi & Pengujian QA",
      icon: <ShieldCheck className="w-5 h-5 text-blue-600 dark:text-cyan-400" />,
    },
    {
      key: "Backend",
      title: isEn ? "IT Business & System Analysis" : "Analisis Sistem & Pemodelan DFD/ERD",
      icon: <Cpu className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
    },
    {
      key: "Database",
      title: isEn ? "Testing Tools & API Validation" : "Perangkat Uji & Validasi API",
      icon: <Wrench className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
    },
    {
      key: "Tools",
      title: isEn ? "Leadership & Soft Skills" : "Kepemimpinan & Soft Skills",
      icon: <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
    },
  ];

  return (
    <section id="skills" className="py-12 lg:py-16 relative overflow-hidden bg-transparent text-zinc-900 dark:text-white transition-colors duration-500">
      {/* Background Gradients */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-blue-500/5 dark:bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="container-original relative z-10 mx-auto px-4 max-w-6xl">
        {/* Section Header */}
        <div className="max-w-2xl space-y-2 mb-10 text-center mx-auto">
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-blue-900 to-cyan-800 dark:from-white dark:via-cyan-200 dark:to-cyan-400 bg-clip-text text-transparent pb-1 pt-1 leading-tight">
            {t('section.skills')}
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-xs md:text-sm leading-relaxed font-medium">
            {t('section.skills.desc')}
          </p>
        </div>

        {/* Categorized Skills Grid with Framer Motion */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((cat, cIdx) => {
            let catSkills = skillData.filter((s) => s.category === cat.key);
            if (catSkills.length === 0) {
              catSkills = defaultSkills.filter((s) => s.category === cat.key);
            }
            return (
              <motion.div
                key={cat.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: cIdx * 0.15 }}
                whileHover={{ y: -6, scale: 1.01 }}
                className="p-7 md:p-8 rounded-[2rem] bg-white/80 dark:bg-zinc-950/80 border border-slate-200/80 dark:border-zinc-800/80 hover:border-cyan-400 dark:hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] backdrop-blur-2xl space-y-6 transition-all duration-500 shadow-sm dark:shadow-2xl group relative overflow-hidden"
              >
                <div className="flex items-center gap-3 border-b border-slate-200 dark:border-zinc-800/80 pb-4">
                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                    {cat.icon}
                  </div>
                  <h3 className="text-base md:text-lg font-bold text-zinc-900 dark:text-white tracking-tight">{cat.title}</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {catSkills.map((sk, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.02 }}
                      className="p-3 rounded-2xl bg-slate-50 dark:bg-zinc-900/90 border border-slate-200 dark:border-zinc-800/80 hover:border-cyan-400 transition-all flex items-center justify-between group/item shadow-2xs"
                    >
                      <div className="flex items-center gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 opacity-70 group-hover/item:opacity-100 transition-opacity shrink-0" />
                        <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 group-hover/item:text-blue-600 dark:group-hover/item:text-white transition-colors">
                          {sk.name}
                        </span>
                      </div>
                      {sk.proficiency && (
                        <span className="text-[10px] font-bold text-cyan-500 dark:text-cyan-400">
                          {sk.proficiency}%
                        </span>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
