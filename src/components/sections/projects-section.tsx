"use client";

import { useState } from "react";
import { useSafeLang } from "@/store/lang";
import { ArrowUpRight, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
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
    <section className="w-full max-w-6xl xl:max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-6 flex flex-col justify-center items-center text-zinc-900 dark:text-white">
      {/* Header */}
      <div className="max-w-3xl space-y-1.5 sm:space-y-2.5 mb-3 sm:mb-6 text-center mx-auto px-1">
        <div className="inline-block px-3.5 py-1 sm:py-1.5 bg-[#FACC15] border-2 border-black dark:border-white shadow-retro-sm text-black font-pixel text-[10px] sm:text-xs uppercase font-bold tracking-wider mb-0.5 sm:mb-1">
          SELECT GAME // PORTFOLIO CARTRIDGES
        </div>
        <h2 className="text-2xl sm:text-5xl font-pixel font-black tracking-tight text-black dark:text-white uppercase">
          {t('section.projects')}
        </h2>
        <p className="font-sans text-xs sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed font-medium max-w-2xl mx-auto">
          {isEn
            ? "Interactive showcase of curated software & testing projects"
            : "Showcase interaktif proyek perangkat lunak & pengujian pilihan"}
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
            className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-6 lg:gap-10 items-center bg-white dark:bg-[#151B22] border-3 border-black dark:border-white p-3.5 sm:p-6 lg:p-8 pb-5 sm:pb-7 lg:pb-8 shadow-retro-lg relative overflow-hidden"
          >
            {/* Image Preview Frame (Left 6 Columns) */}
            <div className="lg:col-span-6">
              <Link href={`/projects/${currentProj.slug}`} className="block relative group border-2 border-black dark:border-white shadow-retro-sm overflow-hidden bg-black aspect-[16/10]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imageList[0]}
                  alt={title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-95"
                />
                <div className="absolute top-2.5 left-2.5 px-2.5 py-1 bg-[#FACC15] border border-black text-black font-pixel text-[10px] font-bold shadow-retro-xs">
                  SCREENSHOT
                </div>
              </Link>
            </div>

            {/* Right Details Column (Right 6 Columns) */}
            <div className="lg:col-span-6 space-y-3 sm:space-y-4 flex flex-col justify-center">
              
              {/* Counter Step & Category Tag */}
              <div className="flex items-center justify-between">
                <span className="px-2.5 sm:px-3 py-1 bg-[#FAF6ED] dark:bg-[#0E1217] border border-black dark:border-white font-sans text-xs text-black dark:text-white uppercase font-black tracking-wider">
                  {cat}
                </span>
                <span className="font-pixel text-xs font-bold text-black bg-[#FACC15] px-2.5 sm:px-3 py-1 border-2 border-black dark:border-white shadow-retro-xs">
                  0{activeIndex + 1} / 0{total}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-sans text-lg min-[400px]:text-xl sm:text-2xl font-black text-black dark:text-white tracking-tight leading-snug">
                <Link href={`/projects/${currentProj.slug}`} className="hover:text-amber-500 dark:hover:text-[#FACC15] transition-colors">
                  {title}
                </Link>
              </h3>

              {/* Description Box */}
              <div className="p-3 sm:p-4 lg:p-5 bg-[#FAF6ED] dark:bg-[#0E1217] border-2 border-black dark:border-white shadow-retro-xs text-zinc-800 dark:text-zinc-200 font-sans text-xs sm:text-sm lg:text-base leading-relaxed font-medium">
                <p>{desc}</p>
              </div>

              {/* Tech Stack Pills */}
              {techList.length > 0 && (
                <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1">
                  {techList.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 sm:px-2.5 py-0.5 sm:py-1 bg-white dark:bg-[#151B22] border border-black dark:border-white font-sans text-xs font-bold text-black dark:text-white shadow-retro-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              {/* Action Buttons Row */}
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-3">
                <Link
                  href={`/projects/${currentProj.slug}`}
                  className="px-4 sm:px-5 py-2.5 border-2 border-black dark:border-white bg-[#FACC15] hover:bg-[#FFE043] text-black font-sans text-xs sm:text-sm font-black uppercase tracking-wider flex items-center gap-2 shadow-retro-sm hover:shadow-retro hover:-translate-y-0.5 active:translate-y-0 active:shadow-retro-xs transition-all btn-retro"
                >
                  <span>{t('projects.viewDetail')}</span>
                  <ArrowUpRight className="w-4 h-4 font-bold" />
                </Link>

                {currentProj.githubUrl && (
                  <a
                    href={currentProj.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 border-2 border-black dark:border-white bg-white dark:bg-[#0E1217] text-black dark:text-white hover:bg-[#FACC15] hover:text-black dark:hover:bg-[#FACC15] dark:hover:text-black flex items-center justify-center shadow-retro-xs hover:shadow-retro-sm hover:-translate-y-0.5 active:translate-y-0 transition-all btn-retro"
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
                    className="w-9 h-9 border-2 border-black dark:border-white bg-white dark:bg-[#0E1217] text-black dark:text-white hover:bg-[#FACC15] hover:text-black dark:hover:bg-[#FACC15] dark:hover:text-black flex items-center justify-center shadow-retro-xs hover:shadow-retro-sm hover:-translate-y-0.5 active:translate-y-0 transition-all btn-retro"
                    title="Live Demo"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>

            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel Navigation Footer Controls (Centered on Mobile, Justified on Desktop) */}
        <div className="flex items-center justify-center sm:justify-between gap-4 sm:gap-2 mt-4 px-2">
          {/* Square Pixel Dots Indicator */}
          <div className="flex items-center gap-2">
            {items.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`w-3.5 h-3.5 border-2 border-black dark:border-white transition-all cursor-pointer ${
                  idx === activeIndex
                    ? "bg-[#FACC15] shadow-retro-xs scale-110"
                    : "bg-zinc-300 dark:bg-zinc-700 hover:bg-zinc-400"
                }`}
                title={`Go to project ${idx + 1}`}
              />
            ))}
          </div>

          {/* 8-Bit Arrow Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={prevProject}
              className="p-2 border-2 border-black dark:border-white bg-[#FACC15] text-black shadow-retro-sm btn-retro transition-all cursor-pointer"
              title="Previous Project"
            >
              <ChevronLeft className="w-4 h-4 font-bold" />
            </button>

            <button
              onClick={nextProject}
              className="p-2 border-2 border-black dark:border-white bg-[#FACC15] text-black shadow-retro-sm btn-retro transition-all cursor-pointer"
              title="Next Project"
            >
              <ChevronRight className="w-4 h-4 font-bold" />
            </button>
          </div>
        </div>

        {/* Next Scene CTA Button */}
        {onNavigateScene && (
          <div className="flex justify-center pt-8 sm:pt-10">
            <button
              onClick={() => onNavigateScene(5)}
              className="px-6 py-3 bg-[#FACC15] hover:bg-yellow-300 text-black font-pixel text-xs sm:text-sm font-black uppercase border-2 border-black dark:border-white shadow-retro btn-retro transition-all flex items-center gap-2.5 cursor-pointer"
            >
              <span>{isEn ? "NEXT: GET IN TOUCH" : "SELANJUTNYA: HUBUNGI SAYA"}</span>
              <ChevronRight className="w-4 h-4 stroke-[3]" />
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
