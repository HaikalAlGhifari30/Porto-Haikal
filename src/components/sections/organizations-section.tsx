"use client";

import { useSafeLang } from "@/store/lang";
import { Users, Calendar, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

interface OrganizationItem {
  id?: string;
  role: string;
  roleEn?: string;
  name: string;
  nameEn?: string;
  period: string;
  periodEn?: string;
  description?: string;
  descriptionEn?: string;
}

interface OrganizationsSectionProps {
  organizations?: OrganizationItem[];
}

export function OrganizationsSection({ organizations = [] }: OrganizationsSectionProps) {
  const { lang, t } = useSafeLang();
  const isEn = lang === "en";

  const defaultOrgs: OrganizationItem[] = [
    {
      role: "Ketua Umum",
      roleEn: "Chairperson",
      name: "Himpunan Mahasiswa Teknik Informatika (HMIF UNIKOM)",
      nameEn: "Informatics Student Association (HMIF UNIKOM)",
      period: "Nov 2022 — Nov 2023",
      periodEn: "Nov 2022 — Nov 2023",
      description:
        "• Merencanakan dan mengawasi struktur organisasi untuk seluruh anggota fungsional HMIF UNIKOM.\n• Mengawasi pelaksanaan dan evaluasi laporan kerja berkala untuk setiap divisi.\n• Merumuskan kebijakan umum serta pedoman internal dan eksternal organisasi.\n• Memegang tanggung jawab penuh atas kinerja divisi sesuai Garis Besar Haluan Organisasi (GBHO).",
      descriptionEn:
        "• Planned and supervised the organizational structure for HMIF UNIKOM functional members.\n• Oversaw the execution and evaluation of work reports for every division.\n• Formulated general and global policies regarding internal and external organizational interests.\n• Held ultimate responsibility for divisional performance according to the Organization's General Guidelines (GBHO).",
    },
    {
      role: "Kepala Divisi PAO",
      roleEn: "Head of PAO Division",
      name: "Forum Komunikasi Mahasiswa Teknik dan Ilmu Komputer - UNIKOM",
      nameEn: "Communication Forum for Computer Science Students - UNIKOM",
      period: "Nov 2021 — Dec 2022",
      periodEn: "Nov 2021 — Dec 2022",
      description:
        "• Memimpin dan mengoordinasikan kegiatan divisi untuk mengembangkan kualitas sumber daya manusia internal.\n• Menyusun dan mengevaluasi program kerja bulanan, termasuk pelatihan kaderisasi dan pengembangan kinerja anggota.\n• Memberikan bimbingan, pengawasan, serta pengarahan bagi anggota divisi dan seluruh pengurus FKMTIK.\n• Menyelesaikan permasalahan internal organisasi serta mengidentifikasi isu-isu strategis organisasi.",
      descriptionEn:
        "• Led and coordinated division activities to develop the quality of internal human resources.\n• Developed and evaluated monthly work programs, including regeneration training and performance development.\n• Provided guidance, supervision, and coaching for division members and the wider FKMTIK membership.\n• Resolved internal organizational issues and identified strategic issues affecting performance.",
    },
  ];

  const items = organizations.length > 0 ? organizations : defaultOrgs;

  return (
    <section id="organization" className="py-24 relative overflow-hidden bg-transparent text-zinc-900 dark:text-white transition-colors duration-500">
      {/* Ambient Glow */}
      <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-cyan-500/5 dark:bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container-original relative z-10 mx-auto px-4 max-w-5xl">
        {/* Section Header */}
        <div className="max-w-2xl space-y-3 mb-16 text-center mx-auto">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-blue-900 to-cyan-800 dark:from-white dark:via-cyan-200 dark:to-cyan-400 bg-clip-text text-transparent pb-2 pt-1 leading-tight">
            {t('section.org')}
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-xs md:text-sm leading-relaxed font-medium">
            {t('section.org.desc')}
          </p>
        </div>

        {/* Grid Cards with Framer Motion Interactive Hover Light */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {items.map((org, idx) => {
            const r = isEn && org.roleEn ? org.roleEn : org.role;
            const n = isEn && org.nameEn ? org.nameEn : org.name;
            const p = isEn && org.periodEn ? org.periodEn : org.period;
            const rawDesc = isEn && org.descriptionEn ? org.descriptionEn : org.description;

            const bullets = rawDesc
              ? rawDesc
                  .split("\n")
                  .map((line) => line.replace(/^[•\-\*\s]+/, "").trim())
                  .filter((line) => line.length > 0)
              : [];

            return (
              <motion.div
                key={org.id || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                whileHover={{ y: -6, scale: 1.01 }}
                className="p-7 md:p-8 rounded-[2rem] bg-white/80 dark:bg-zinc-950/80 border border-slate-200/80 dark:border-zinc-800/80 hover:border-cyan-400 dark:hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] transition-all duration-500 backdrop-blur-2xl space-y-5 shadow-sm dark:shadow-2xl flex flex-col justify-between group relative overflow-hidden"
              >
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="px-3.5 py-1 rounded-full bg-blue-500/10 dark:bg-cyan-500/10 border border-blue-500/20 dark:border-cyan-500/30 text-blue-600 dark:text-cyan-400 text-[11px] font-bold uppercase tracking-wider">
                      {r}
                    </span>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400 font-semibold flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                      {p}
                    </span>
                  </div>

                  <h3 className="text-lg md:text-xl font-bold text-zinc-900 dark:text-white tracking-tight group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                    {n}
                  </h3>

                  {bullets.length > 0 ? (
                    <ul className="space-y-2.5 pt-2 border-t border-slate-200 dark:border-zinc-800/80">
                      {bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2.5 text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    rawDesc && (
                      <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal pt-2 border-t border-slate-200 dark:border-zinc-800/80">
                        {rawDesc}
                      </p>
                    )
                  )}
                </div>

              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
