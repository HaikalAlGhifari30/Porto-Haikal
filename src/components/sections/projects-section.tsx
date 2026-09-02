"use client";

import { useState } from "react";
import { useSafeLang } from "@/store/lang";
import { ArrowUpRight, ExternalLink, FolderGit2, Sparkles } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import Link from "next/link";
import { motion } from "framer-motion";

interface ProjectItem {
  id?: string;
  title: string;
  titleEn?: string;
  slug: string;
  category?: string;
  categoryEn?: string;
  description?: string;
  descriptionEn?: string;
  imageUrl?: string;
  url?: string;
  githubUrl?: string;
  techStack?: string;
  problem?: string;
  problemEn?: string;
  solution?: string;
  solutionEn?: string;
}

interface ProjectsSectionProps {
  projects?: ProjectItem[];
}

function ProjectCardItem({ proj, idx, isEn, t }: { proj: ProjectItem; idx: number; isEn: boolean; t: (key: string) => string }) {
  const title = isEn && proj.titleEn ? proj.titleEn : proj.title;
  const cat = isEn && proj.categoryEn ? proj.categoryEn : proj.category || "Web Development";
  const desc = isEn && proj.descriptionEn ? proj.descriptionEn : proj.description;
  const techList = proj.techStack ? proj.techStack.split(",").map((t) => t.trim()) : [];
  const isEven = idx % 2 === 0;

  // Multi-image parsing (comma-separated or single)
  const imageList = proj.imageUrl
    ? proj.imageUrl.split(",").map((img) => img.trim()).filter(Boolean)
    : ["https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80"];

  const [activeImgIdx, setActiveImgIdx] = useState(0);

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setActiveImgIdx((prev) => (prev === 0 ? imageList.length - 1 : prev - 1));
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setActiveImgIdx((prev) => (prev === imageList.length - 1 ? 0 : prev + 1));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: idx * 0.1 }}
      className="relative w-full py-4 md:py-6 overflow-hidden"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center group relative z-10">
        
        {/* Image Showcase Frame Column (Compact 6-col) */}
        <div className={`lg:col-span-6 ${isEven ? "lg:order-1" : "lg:order-2"}`}>
          <Link href={`/projects/${proj.slug}`} className="block relative group/img rounded-2xl overflow-hidden bg-slate-900 border border-slate-200/90 dark:border-zinc-800/90 shadow-lg dark:shadow-xl aspect-[16/9.5] backdrop-blur-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageList[0]}
              alt={title}
              className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-700 opacity-95 group-hover/img:opacity-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
          </Link>
        </div>

        {/* Text Content Column (Compact 6-col) */}
        <div className={`lg:col-span-6 space-y-4 flex flex-col justify-center ${isEven ? "lg:order-2" : "lg:order-1"}`}>
          
          {/* Category Subtitle Tag */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-blue-600 dark:text-cyan-400 tracking-wider uppercase">
              {cat}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight group-hover:text-blue-600 dark:group-hover:text-cyan-300 transition-colors leading-snug">
            <Link href={`/projects/${proj.slug}`}>
              {title}
            </Link>
          </h3>

          {/* Glass Description Container Box (Compact Yofi Style) */}
          <div className="p-4 sm:p-5 rounded-xl bg-white/80 dark:bg-[#0c101d]/90 border border-slate-200/90 dark:border-zinc-800/90 backdrop-blur-xl shadow-sm dark:shadow-md text-zinc-600 dark:text-zinc-300 text-xs sm:text-sm leading-relaxed font-normal">
            <p>{desc}</p>
          </div>

          {/* Tech Stack Pills */}
          {techList.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-0.5">
              {techList.map((tech, tIdx) => (
                <span
                  key={tIdx}
                  className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-zinc-900/90 border border-slate-200 dark:border-zinc-800 text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 shadow-2xs"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          {/* Action Buttons Row */}
          <div className="flex items-center gap-2.5 pt-1">
            <Link
              href={`/projects/${proj.slug}`}
              className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-500 hover:from-blue-700 hover:to-cyan-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm shadow-blue-500/20 transition-all hover:scale-102"
            >
              <span>{t('projects.viewDetail')}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>

            {proj.githubUrl && (
              <a
                href={proj.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-slate-100 dark:bg-zinc-900/90 border border-slate-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-cyan-400 hover:border-cyan-500/50 flex items-center justify-center transition-all shadow-2xs hover:scale-105"
                title="GitHub Repository"
              >
                <FaGithub className="w-4 h-4" />
              </a>
            )}

            {proj.url && proj.url !== "#" && (
              <a
                href={proj.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-slate-100 dark:bg-zinc-900/90 border border-slate-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-cyan-400 hover:border-cyan-500/50 flex items-center justify-center transition-all shadow-2xs hover:scale-105"
                title="Live Demo"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

        </div>
      </div>
    </motion.div>
  );
}

export function ProjectsSection({ projects = [] }: ProjectsSectionProps) {
  const { lang, t } = useSafeLang();
  const isEn = lang === "en";
  const [activeTab, setActiveTab] = useState<string>("all");

  const categories = [
    { key: "all", label: isEn ? "All Projects" : "Semua Proyek" },
    { key: "web", label: isEn ? "Web Development" : "Web Development" },
  ];

  const filteredProjects = projects.filter((proj) => {
    if (activeTab === "all") return true;
    const cat = (proj.category || "").toLowerCase();
    if (activeTab === "web") return cat.includes("web") || cat.includes("development") || cat.includes("full-stack");
    return true;
  });

  return (
    <section id="projects" className="py-12 lg:py-16 relative overflow-hidden bg-transparent text-zinc-900 dark:text-white transition-colors duration-500">
      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-cyan-500/5 dark:bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="container-original relative z-10 mx-auto px-4 max-w-6xl">
        {/* Section Header */}
        <div className="max-w-2xl space-y-2 mb-10 text-center mx-auto">
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-blue-900 to-cyan-800 dark:from-white dark:via-cyan-200 dark:to-cyan-400 bg-clip-text text-transparent pb-1 pt-1 leading-tight">
            {t('section.projects')}
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-xs md:text-sm leading-relaxed font-medium">
            {t('section.projects.desc')}
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-16">
          {categories.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-cyan-500/25 scale-105"
                    : "bg-white/80 dark:bg-zinc-900/80 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white border border-slate-200 dark:border-zinc-800 backdrop-blur-md"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Alternating Featured Projects Showcase (Yofi Reference Style) */}
        <div className="space-y-10 md:space-y-14 isolate">
          {filteredProjects.map((proj, idx) => (
            <ProjectCardItem key={proj.id || idx} proj={proj} idx={idx} isEn={isEn} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
