"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { FooterClient } from "@/components/footer-client";
import { useSafeLang } from "@/store/lang";
import { ArrowLeft, ExternalLink, ShieldAlert, Sparkles, CheckCircle2, Wrench, User, ChevronLeft, ChevronRight } from "lucide-react";
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
      <div className="min-h-screen bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-white flex flex-col justify-between transition-colors duration-300">
        <Navbar settings={settings} />
        <main className="flex-1 flex items-center justify-center p-8">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Project Not Found</h1>
            <Link href="/#projects" className="text-cyan-600 dark:text-cyan-400 font-semibold underline">
              Return to Portfolio
            </Link>
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

  const techList = project.techStack ? project.techStack.split(",").map((s: string) => s.trim()) : [];
  const featureList = project.features ? project.features.split(",").map((s: string) => s.trim()) : [];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-white flex flex-col justify-between transition-colors duration-300">
      <Navbar settings={settings} />

      <main className="flex-1 pt-28 pb-20 relative overflow-hidden">
        {/* Glow Background Elements */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-blue-600/10 dark:bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="container-original relative z-10 mx-auto px-4 max-w-5xl space-y-12">
          
          {/* Top Navigation Back Link */}
          <div>
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-zinc-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors p-2.5 rounded-xl bg-white dark:bg-[#070e20]/90 border border-slate-200 dark:border-cyan-500/30 shadow-xs"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t('projects.back')}</span>
            </Link>
          </div>

          {/* Title Banner Header */}
          <div className="space-y-4">
            <span className="px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-cyan-600 dark:text-cyan-400 text-xs font-bold uppercase tracking-wider">
              {category}
            </span>

            <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              {title}
            </h1>

            <p className="text-slate-600 dark:text-zinc-300 text-sm md:text-base leading-relaxed font-normal">
              {description}
            </p>

            {/* Quick Spec Tags */}
            <div className="pt-4 flex flex-wrap items-center gap-4 border-t border-slate-200 dark:border-zinc-800/80 text-xs text-slate-600 dark:text-zinc-400">
              {role && (
                <div className="flex items-center gap-1.5">
                  <User className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                  <span>{t('projects.role')}: <strong className="text-slate-900 dark:text-white">{role}</strong></span>
                </div>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-cyan-600 dark:text-cyan-400 hover:underline font-semibold"
                >
                  <FaGithub className="w-4 h-4" />
                  <span>{t('projects.github')}</span>
                </a>
              )}
              {project.url && project.url !== "#" && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-cyan-600 dark:text-cyan-400 hover:underline font-semibold"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>{t('projects.liveDemo')}</span>
                </a>
              )}
            </div>
          </div>

          {/* Image Showcase Frame (Multi-Image Interactive Carousel) */}
          <div className="relative group rounded-3xl overflow-hidden bg-slate-900 border border-slate-200 dark:border-cyan-500/30 shadow-2xl aspect-[16/9] backdrop-blur-2xl">
            <AnimatePresence mode="wait">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <motion.img
                key={activeImgIdx}
                src={imageList[activeImgIdx]}
                alt={`${title} Screenshot ${activeImgIdx + 1}`}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>

            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />

            {/* Carousel Arrows (If multiple images) */}
            {imageList.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-slate-900/85 hover:bg-cyan-500 text-white border border-white/20 flex items-center justify-center backdrop-blur-md transition-all shadow-xl hover:scale-110 z-20 cursor-pointer"
                  title="Previous Image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-slate-900/85 hover:bg-cyan-500 text-white border border-white/20 flex items-center justify-center backdrop-blur-md transition-all shadow-xl hover:scale-110 z-20 cursor-pointer"
                  title="Next Image"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Pagination Indicator Dots */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-white/10 backdrop-blur-md z-20">
                  {imageList.map((_: any, dotIdx: number) => (
                    <button
                      key={dotIdx}
                      onClick={() => setActiveImgIdx(dotIdx)}
                      className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                        dotIdx === activeImgIdx ? "w-8 bg-cyan-400" : "w-2.5 bg-white/40 hover:bg-white/70"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Problem & Solution Grid */}
          {(problem || solution) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {problem && (
                <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-[#070e20]/90 border border-slate-200 dark:border-cyan-500/20 shadow-sm space-y-3">
                  <div className="flex items-center gap-2 text-rose-500 dark:text-rose-400 font-bold text-sm">
                    <ShieldAlert className="w-4 h-4" />
                    <span>{t('projects.problem')}</span>
                  </div>
                  <p className="text-xs md:text-sm text-slate-600 dark:text-zinc-300 leading-relaxed font-normal">
                    {problem}
                  </p>
                </div>
              )}

              {solution && (
                <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-[#070e20]/90 border border-slate-200 dark:border-cyan-500/20 shadow-sm space-y-3">
                  <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
                    <Sparkles className="w-4 h-4" />
                    <span>{t('projects.solution')}</span>
                  </div>
                  <p className="text-xs md:text-sm text-slate-600 dark:text-zinc-300 leading-relaxed font-normal">
                    {solution}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Key Features */}
          {featureList.length > 0 && (
            <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-[#070e20]/90 border border-slate-200 dark:border-cyan-500/20 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-blue-600 dark:text-cyan-400 font-bold text-sm">
                <CheckCircle2 className="w-4 h-4" />
                <span>{t('projects.features')}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {featureList.map((feat: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 dark:text-zinc-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-cyan-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tech Stack Bar */}
          {techList.length > 0 && (
            <div className="p-6 md:p-8 rounded-3xl bg-white dark:bg-[#070e20]/90 border border-slate-200 dark:border-cyan-500/20 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-sm">
                <Wrench className="w-4 h-4" />
                <span>{t('projects.techStack')}</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {techList.map((tech: string, idx: number) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 text-xs font-semibold text-slate-800 dark:text-zinc-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Action Footer */}
          <div className="pt-6 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 dark:border-zinc-800/80">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white transition-colors"
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
                  className="px-4 py-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-xs font-bold text-slate-700 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white flex items-center gap-2 shadow-xs"
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
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-xs font-bold text-white flex items-center gap-2 shadow-lg shadow-blue-500/20"
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
