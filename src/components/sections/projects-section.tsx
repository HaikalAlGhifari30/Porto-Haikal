"use client";

import { useState } from "react";
import { useSafeLang } from "@/store/lang";
import { ArrowUpRight, ExternalLink, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

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
}

interface ProjectsSectionProps {
  projects?: ProjectItem[];
  onNavigateScene?: (index: number) => void;
}

export function ProjectsSection({ projects = [], onNavigateScene }: ProjectsSectionProps) {
  const { lang, t } = useSafeLang();
  const isEn = lang === "en";
  const [activeIndex, setActiveIndex] = useState(0);

  const items = projects.length > 0 ? projects : [
    {
      title: "FinTrack - Personal Finance Management",
      slug: "fintrack",
      category: "Web Application",
      description: "A comprehensive financial dashboard built to track income, expenses, monthly budgets, and automated analytics.",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80",
      techStack: "Next.js, PostgreSQL, Prisma, TailwindCSS, Chart.js",
      url: "#",
      githubUrl: "#",
    },
  ];

  const total = items.length;
  const currentProj = items[activeIndex] || items[0];

  const title = isEn && currentProj.titleEn ? currentProj.titleEn : currentProj.title;
  const cat = isEn && currentProj.categoryEn ? currentProj.categoryEn : currentProj.category || "Featured Project";
  const desc = isEn && currentProj.descriptionEn ? currentProj.descriptionEn : currentProj.description;
  const techList = currentProj.techStack ? currentProj.techStack.split(",").map((t) => t.trim()) : [];
  const imageList = currentProj.imageUrl
    ? currentProj.imageUrl.split(",").map((img) => img.trim()).filter(Boolean)
    : ["https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80"];

  const prevProject = () => {
    setActiveIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const nextProject = () => {
    setActiveIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
  };

  return (
    <section className="w-full max-w-5xl mx-auto px-4 py-4 sm:py-6 flex flex-col justify-center items-center text-zinc-900 dark:text-white my-auto">
      {/* Header */}
      <div className="max-w-2xl space-y-2 mb-4 text-center mx-auto">
        <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-blue-700 to-cyan-600 dark:from-white dark:via-cyan-200 dark:to-cyan-400">
          {t('section.projects')}
        </h2>
        <p className="text-slate-600 dark:text-zinc-400 text-xs leading-relaxed font-medium">
          Interactive showcase of curated software & testing projects
        </p>
      </div>

      {/* Interactive Project Showcase Viewport Box */}
      <div className="w-full relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center rounded-[2.2rem] bg-white/35 dark:bg-slate-950/75 border border-white/70 dark:border-cyan-500/30 p-5 sm:p-7 backdrop-blur-2xl shadow-2xl shadow-blue-900/5 dark:shadow-cyan-950/40 relative overflow-hidden"
          >
            {/* Image Preview Frame (Left 6 Columns) */}
            <div className="lg:col-span-6">
              <Link href={`/projects/${currentProj.slug}`} className="block relative group rounded-2xl overflow-hidden bg-slate-900 border border-slate-200/80 dark:border-zinc-800 shadow-xl aspect-[16/10]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imageList[0]}
                  alt={title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
              </Link>
            </div>

            {/* Right Details Column (Right 6 Columns) */}
            <div className="lg:col-span-6 space-y-4 flex flex-col justify-center">
              
              {/* Counter Step & Category Tag */}
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black text-blue-700 dark:text-cyan-400 uppercase tracking-widest">
                  {cat}
                </span>
                <span className="text-xs font-mono font-extrabold text-slate-800 dark:text-zinc-300 bg-white/50 dark:bg-slate-900/60 px-3 py-1 rounded-full border border-white/70 dark:border-zinc-800 shadow-2xs backdrop-blur-xs">
                  0{activeIndex + 1} / 0{total}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white tracking-tight hover:text-blue-600 dark:hover:text-cyan-300 transition-colors leading-snug">
                <Link href={`/projects/${currentProj.slug}`}>
                  {title}
                </Link>
              </h3>

              {/* Glass Description Box */}
              <div className="p-4 rounded-xl bg-white/45 dark:bg-slate-900/65 border border-white/70 dark:border-zinc-800/90 text-slate-900 dark:text-zinc-200 text-xs sm:text-sm leading-relaxed font-medium backdrop-blur-md shadow-2xs">
                <p>{desc}</p>
              </div>

              {/* Tech Stack Pills */}
              {techList.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {techList.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-0.5 rounded-full bg-white/55 dark:bg-slate-900/70 border border-white/80 dark:border-zinc-800 text-[11px] font-extrabold text-blue-800 dark:text-cyan-300 shadow-2xs backdrop-blur-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              {/* Action Buttons Row */}
              <div className="flex items-center gap-3 pt-2">
                <Link
                  href={`/projects/${currentProj.slug}`}
                  className="px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-500 hover:from-blue-500 hover:to-cyan-400 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-md shadow-blue-500/20 transition-all hover:scale-105"
                >
                  <span>{t('projects.viewDetail')}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>

                {currentProj.githubUrl && (
                  <a
                    href={currentProj.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-white/60 dark:bg-slate-900/70 border border-white/80 dark:border-zinc-800 text-slate-800 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-cyan-400 hover:bg-white dark:hover:bg-slate-800 flex items-center justify-center transition-all shadow-2xs backdrop-blur-xs hover:scale-105"
                    title="GitHub Repository"
                  >
                    <FaGithub className="w-4 h-4" />
                  </a>
                )}

                {currentProj.url && currentProj.url !== "#" && (
                  <a
                    href={currentProj.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-white/60 dark:bg-slate-900/70 border border-white/80 dark:border-zinc-800 text-slate-800 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-cyan-400 hover:bg-white dark:hover:bg-slate-800 flex items-center justify-center transition-all shadow-2xs backdrop-blur-xs hover:scale-105"
                    title="Live Demo"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>

            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel Navigation Footer Controls (Dot Indicators on Left, Arrows on Right) */}
        <div className="flex items-center justify-between mt-4 px-2 pl-14 sm:pl-2">
          {/* Dots Indicator */}
          <div className="flex items-center gap-2">
            {items.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  idx === activeIndex
                    ? "w-8 bg-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.8)]"
                    : "w-2 bg-slate-300 dark:bg-zinc-700 hover:bg-slate-400 dark:hover:bg-zinc-500"
                }`}
                title={`Go to project ${idx + 1}`}
              />
            ))}
          </div>

          {/* Arrow Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={prevProject}
              className="p-2.5 rounded-full bg-white/90 dark:bg-slate-900/80 border border-slate-200 dark:border-zinc-800 text-slate-800 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-cyan-400 hover:border-cyan-500/50 transition-all cursor-pointer shadow-md"
              title="Previous Project"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={nextProject}
              className="p-2.5 rounded-full bg-white/90 dark:bg-slate-900/80 border border-slate-200 dark:border-zinc-800 text-slate-800 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-cyan-400 hover:border-cyan-500/50 transition-all cursor-pointer shadow-md"
              title="Next Project"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
