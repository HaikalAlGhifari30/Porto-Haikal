"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { FooterClient } from "@/components/footer-client";
import { useSafeLang } from "@/store/lang";
import { ArrowLeft, ExternalLink, ShieldAlert, Sparkles, CheckCircle2, Wrench, User, ChevronLeft, ChevronRight, Monitor } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectDetailClientProps {
  project: any;
  settings?: any;
}

export function ProjectDetailClient({ project, settings }: ProjectDetailClientProps) {
  const { lang, t } = useSafeLang();
  const isEn = lang === "en";

  const imageList = project?.imageUrl
    ? project.imageUrl.split(",").map((s: string) => s.trim()).filter(Boolean)
    : ["https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80"];

  const [activeImgIdx, setActiveImgIdx] = useState(0);

  const prevImage = () => {
    setActiveImgIdx((prev) => (prev === 0 ? imageList.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setActiveImgIdx((prev) => (prev === imageList.length - 1 ? 0 : prev + 1));
  };

  if (!project) {
    return (
      <div className="min-h-screen bg-[#FAF6ED] dark:bg-[#0E1217] text-slate-900 dark:text-slate-100 flex flex-col justify-between transition-colors duration-300">
        <Navbar settings={settings} />
        <main className="flex-1 flex items-center justify-center p-8 pt-32">
          <div className="text-center space-y-4 p-8 bg-white dark:bg-[#151B22] border-3 border-black dark:border-white shadow-retro-lg max-w-md mx-auto">
            <div className="inline-block p-3 bg-red-100 dark:bg-red-950/60 border-2 border-black dark:border-white text-red-600 font-pixel text-xs">
              [ 404 NOT FOUND ]
            </div>
            <h1 className="text-xl sm:text-2xl font-pixel font-black text-black dark:text-white uppercase">
              Project Not Found
            </h1>
            <p className="font-sans text-sm text-zinc-700 dark:text-zinc-300">
              {isEn ? "The requested project cartridge could not be located." : "Cartridge proyek yang Anda cari tidak ditemukan."}
            </p>
            <div className="pt-2">
              <Link
                href="/#projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FACC15] border-2 border-black dark:border-white text-black font-pixel text-xs font-bold shadow-retro-xs btn-retro uppercase"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Return to Portfolio</span>
              </Link>
            </div>
          </div>
        </main>
        <FooterClient settings={settings} />
      </div>
    );
  }

  const title = isEn && project.titleEn ? project.titleEn : project.title;
  const category = isEn && project.categoryEn ? project.categoryEn : project.category || "Full-Stack Web";
  const description = isEn && project.descriptionEn ? project.descriptionEn : project.description;
  const problem = isEn && project.problemEn ? project.problemEn : project.problem;
  const solution = isEn && project.solutionEn ? project.solutionEn : project.solution;
  const role = isEn && project.roleEn ? project.roleEn : project.role;

  const techList = project.techStack ? project.techStack.split(",").map((s: string) => s.trim()).filter(Boolean) : [];
  const featureList = project.features ? project.features.split(",").map((s: string) => s.trim()).filter(Boolean) : [];

  return (
    <div className="min-h-screen bg-[#FAF6ED] dark:bg-[#0E1217] text-slate-900 dark:text-slate-100 flex flex-col justify-between transition-colors duration-300">
      <Navbar settings={settings} />

      <main className="flex-1 pt-24 sm:pt-28 pb-20 relative overflow-hidden">
        <div className="container-original relative z-10 mx-auto px-4 max-w-5xl space-y-8 sm:space-y-10">
          
          {/* Top Breadcrumb & Back Link */}
          <div className="flex items-center justify-between">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2.5 px-4 py-2 bg-white dark:bg-[#151B22] border-2 border-black dark:border-white shadow-retro-xs btn-retro font-pixel text-xs font-bold text-black dark:text-white uppercase hover:bg-[#FACC15] hover:text-black transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t('projects.back')}</span>
            </Link>

            <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 bg-white dark:bg-[#151B22] border-2 border-black dark:border-white shadow-retro-xs font-pixel text-[11px] font-bold text-zinc-600 dark:text-zinc-400">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 border border-black/40" />
              </span>
              <span>CARTRIDGE ARCHIVE</span>
            </div>
          </div>

          {/* Project Title Header Box */}
          <div className="bg-white dark:bg-[#151B22] border-3 border-black dark:border-white shadow-retro-lg p-6 sm:p-8 relative">
            
            {/* Retro Accent Bar / Category Row */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-4 border-b-2 border-black/10 dark:border-white/10">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3.5 py-1 bg-[#FACC15] border-2 border-black dark:border-white font-pixel text-[11px] sm:text-xs font-black text-black uppercase shadow-retro-xs">
                  {category}
                </span>
                <span className="px-3 py-1 bg-[#FAF6ED] dark:bg-[#0E1217] border-2 border-black dark:border-white font-pixel text-[11px] sm:text-xs font-bold text-black dark:text-white shadow-retro-xs">
                  PROJECT DOSSIER
                </span>
              </div>
              
              {role && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white dark:bg-[#0E1217] border-2 border-black dark:border-white font-pixel text-[11px] sm:text-xs font-bold text-black dark:text-white shadow-retro-xs">
                  <User className="w-3.5 h-3.5 text-yellow-500" />
                  <span>{t('projects.role')}: <strong className="text-black dark:text-[#FACC15]">{role}</strong></span>
                </div>
              )}
            </div>

            {/* Title */}
            <h1 className="font-pixel text-2xl sm:text-3xl md:text-5xl font-black text-black dark:text-white tracking-tight leading-tight uppercase mb-5">
              {title}
            </h1>

            {/* Description Box */}
            <div className="p-4 sm:p-5 bg-[#FAF6ED] dark:bg-[#0E1217] border-2 border-black dark:border-white shadow-retro-xs text-zinc-800 dark:text-zinc-200 font-sans text-sm sm:text-base leading-relaxed font-medium mb-6">
              <p>{description}</p>
            </div>

            {/* Action Links (Source Code / Live Demo) */}
            <div className="flex flex-wrap items-center gap-3">
              {project.url && project.url !== "#" && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-[#FACC15] hover:bg-yellow-300 border-2 border-black dark:border-white text-black font-pixel text-xs sm:text-sm font-bold flex items-center gap-2 shadow-retro-sm btn-retro uppercase"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>{t('projects.liveDemo')}</span>
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-white dark:bg-[#0E1217] hover:bg-yellow-100 dark:hover:bg-zinc-800 border-2 border-black dark:border-white text-black dark:text-white font-pixel text-xs sm:text-sm font-bold flex items-center gap-2 shadow-retro-sm btn-retro uppercase"
                >
                  <FaGithub className="w-4 h-4" />
                  <span>{t('projects.github')}</span>
                </a>
              )}
            </div>
          </div>

          {/* Image Showcase Frame (Retro Computer / Arcade Terminal Viewport) */}
          <div className="border-3 border-black dark:border-white shadow-retro-lg bg-white dark:bg-[#151B22] overflow-hidden">
            {/* Window Top Title Bar */}
            <div className="bg-[#FACC15] text-black border-b-2 border-black dark:border-white px-4 py-2 font-pixel text-xs font-black flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Monitor className="w-3.5 h-3.5" />
                <span className="uppercase tracking-wider">SCREENSHOT VIEWER // ARCHIVE DISK</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-2 py-0.5 bg-white border border-black text-[10px] font-bold">
                  0{activeImgIdx + 1} / 0{imageList.length}
                </span>
                <div className="hidden sm:flex items-center gap-1">
                  <div className="w-3.5 h-3.5 border border-black bg-white flex items-center justify-center text-[9px] font-bold">_</div>
                  <div className="w-3.5 h-3.5 border border-black bg-white flex items-center justify-center text-[9px] font-bold">□</div>
                  <div className="w-3.5 h-3.5 border border-black bg-white flex items-center justify-center text-[9px] font-bold">✕</div>
                </div>
              </div>
            </div>

            {/* Viewport Frame */}
            <div className="relative aspect-[16/9] bg-black overflow-hidden group">
              <AnimatePresence mode="wait">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <motion.img
                  key={activeImgIdx}
                  src={imageList[activeImgIdx]}
                  alt={`${title} Screenshot ${activeImgIdx + 1}`}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>

              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

              {/* Navigation Arrows (if multiple) */}
              {imageList.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-10 sm:w-11 h-10 sm:h-11 bg-[#FACC15] hover:bg-yellow-300 text-black border-2 border-black flex items-center justify-center shadow-retro-xs btn-retro cursor-pointer z-20"
                    title="Previous Image"
                  >
                    <ChevronLeft className="w-6 h-6 font-black" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-10 sm:w-11 h-10 sm:h-11 bg-[#FACC15] hover:bg-yellow-300 text-black border-2 border-black flex items-center justify-center shadow-retro-xs btn-retro cursor-pointer z-20"
                    title="Next Image"
                  >
                    <ChevronRight className="w-6 h-6 font-black" />
                  </button>

                  {/* Square Step Indicators */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 p-1.5 bg-black/85 border-2 border-black backdrop-blur-sm z-20">
                    {imageList.map((_: any, dotIdx: number) => (
                      <button
                        key={dotIdx}
                        onClick={() => setActiveImgIdx(dotIdx)}
                        className={`h-3 transition-all cursor-pointer border border-black ${
                          dotIdx === activeImgIdx ? "w-8 bg-[#FACC15]" : "w-3 bg-white/60 hover:bg-white"
                        }`}
                        title={`Screenshot ${dotIdx + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Problem & Solution Grid */}
          {(problem || solution) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {problem && (
                <div className="p-6 sm:p-7 bg-white dark:bg-[#151B22] border-3 border-black dark:border-white shadow-retro space-y-3">
                  <div className="flex items-center justify-between pb-3 border-b-2 border-black/10 dark:border-white/10">
                    <div className="flex items-center gap-2 text-red-600 dark:text-red-400 font-pixel font-black text-xs sm:text-sm uppercase tracking-wider">
                      <ShieldAlert className="w-4 h-4 shrink-0" />
                      <span>{t('projects.problem')}</span>
                    </div>
                    <span className="px-2 py-0.5 bg-red-100 dark:bg-red-950/60 border border-red-500 text-red-600 dark:text-red-400 font-pixel text-[10px] font-bold uppercase">
                      CHALLENGE
                    </span>
                  </div>
                  <p className="font-sans text-sm sm:text-base text-zinc-800 dark:text-zinc-200 leading-relaxed font-medium">
                    {problem}
                  </p>
                </div>
              )}

              {solution && (
                <div className="p-6 sm:p-7 bg-white dark:bg-[#151B22] border-3 border-black dark:border-white shadow-retro space-y-3">
                  <div className="flex items-center justify-between pb-3 border-b-2 border-black/10 dark:border-white/10">
                    <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-pixel font-black text-xs sm:text-sm uppercase tracking-wider">
                      <Sparkles className="w-4 h-4 shrink-0" />
                      <span>{t('projects.solution')}</span>
                    </div>
                    <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-500 text-emerald-600 dark:text-emerald-400 font-pixel text-[10px] font-bold uppercase">
                      VERIFIED
                    </span>
                  </div>
                  <p className="font-sans text-sm sm:text-base text-zinc-800 dark:text-zinc-200 leading-relaxed font-medium">
                    {solution}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Key Features */}
          {featureList.length > 0 && (
            <div className="p-6 sm:p-7 bg-white dark:bg-[#151B22] border-3 border-black dark:border-white shadow-retro space-y-4">
              <div className="flex items-center justify-between pb-3 border-b-2 border-black/10 dark:border-white/10">
                <div className="flex items-center gap-2 text-black dark:text-white font-pixel font-black text-xs sm:text-sm uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4 text-[#FACC15] shrink-0" />
                  <span>{t('projects.features')}</span>
                </div>
                <span className="font-pixel text-[10px] font-bold text-zinc-500 uppercase">
                  {featureList.length} MODULES
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {featureList.map((feat: string, idx: number) => (
                  <div
                    key={idx}
                    className="p-3 bg-[#FAF6ED] dark:bg-[#0E1217] border-2 border-black dark:border-white shadow-retro-xs flex items-center gap-3 font-sans text-xs sm:text-sm font-semibold text-zinc-800 dark:text-zinc-200"
                  >
                    <div className="w-2.5 h-2.5 bg-[#FACC15] border-2 border-black dark:border-white shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tech Stack Bar */}
          {techList.length > 0 && (
            <div className="p-6 sm:p-7 bg-white dark:bg-[#151B22] border-3 border-black dark:border-white shadow-retro space-y-4">
              <div className="flex items-center justify-between pb-3 border-b-2 border-black/10 dark:border-white/10">
                <div className="flex items-center gap-2 text-black dark:text-white font-pixel font-black text-xs sm:text-sm uppercase tracking-wider">
                  <Wrench className="w-4 h-4 text-blue-500 shrink-0" />
                  <span>{t('projects.techStack')}</span>
                </div>
                <span className="font-pixel text-[10px] font-bold text-zinc-500 uppercase">
                  {techList.length} TECHNOLOGIES
                </span>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {techList.map((tech: string, idx: number) => (
                  <span
                    key={idx}
                    className="px-3.5 py-1.5 bg-[#FAF6ED] dark:bg-[#0E1217] border-2 border-black dark:border-white font-sans text-xs sm:text-sm font-bold text-black dark:text-white shadow-retro-xs hover:bg-[#FACC15] hover:text-black transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Action Footer Bar */}
          <div className="pt-6 flex flex-wrap items-center justify-between gap-4 border-t-3 border-black dark:border-white">
            <Link
              href="/#projects"
              className="px-5 py-3 border-2 border-black dark:border-white bg-white dark:bg-[#151B22] text-black dark:text-white font-pixel text-xs sm:text-sm font-bold shadow-retro-sm btn-retro uppercase flex items-center gap-2 hover:bg-yellow-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t('projects.back')}</span>
            </Link>

            <div className="flex items-center gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 sm:px-5 py-2.5 sm:py-3 border-2 border-black dark:border-white bg-white dark:bg-[#151B22] text-black dark:text-white hover:bg-yellow-100 dark:hover:bg-zinc-800 font-pixel text-xs sm:text-sm font-bold flex items-center gap-2 shadow-retro-sm btn-retro uppercase transition-colors"
                >
                  <FaGithub className="w-4 h-4" />
                  <span>Repository</span>
                </a>
              )}
              {project.url && project.url !== "#" && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 sm:px-5 py-2.5 sm:py-3 border-2 border-black dark:border-white bg-[#FACC15] hover:bg-yellow-300 text-black font-pixel text-xs sm:text-sm font-bold flex items-center gap-2 shadow-retro-sm btn-retro uppercase transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>{t('projects.liveDemo')}</span>
                </a>
              )}
            </div>
          </div>

        </div>
      </main>

      <FooterClient settings={settings} />
    </div>
  );
}
