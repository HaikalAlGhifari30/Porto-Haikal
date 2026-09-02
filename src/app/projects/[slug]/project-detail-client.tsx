"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { FooterClient } from "@/components/footer-client";
import { useSafeLang } from "@/store/lang";
import { ArrowLeft, ExternalLink, Layers, ShieldAlert, Sparkles, CheckCircle2, Wrench, User, Globe, Activity, ShieldCheck, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectDetailClientProps {
  project: any;
}

export function ProjectDetailClient({ project }: ProjectDetailClientProps) {
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
      <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between">
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-8">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold">Project Not Found</h1>
            <Link href="/#projects" className="text-cyan-400 font-semibold underline">
              Return to Portfolio
            </Link>
          </div>
        </main>
        <FooterClient />
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

  const comoSystems = [
    {
      name: "Como Football Official Portal",
      desc: "Official club web platform for match fixtures, news, and fan engagement.",
      url: "https://comofootball.com/en/",
      qaFocus: "Cross-browser regression, i18n content sync, & matchday traffic stability",
      status: "Verified QA",
    },
    {
      name: "Sent Entertainment Media Hub",
      desc: "Digital broadcast and media rights distribution platform for Como 1907.",
      url: "https://www.sententertainment.com/",
      qaFocus: "Media playback performance, VOD streaming stability, & UI responsiveness",
      status: "Verified QA",
    },
    {
      name: "Como Ticketing & Pass System",
      desc: "E-commerce ticket sales, seat selection, and digital pass verification.",
      url: "https://tickets.comofootball.com/",
      qaFocus: "Payment gateway integration, seat selection validation, & ticket barcode audit",
      status: "Verified QA",
    },
    {
      name: "Curva Sud Fan Platform",
      desc: "Fan community hub, official merch, and supporter engagement portal.",
      url: "https://baroedak-como.vercel.app/#divisions",
      qaFocus: "Community form validation, merch cart checkout flow, & asset optimization",
      status: "Verified QA",
    },
    {
      name: "EdVentura Educational Portal",
      desc: "Youth training and sports education management system.",
      url: "https://edventura.it/",
      qaFocus: "Course enrolment user flows, document downloads, & form validation",
      status: "Verified QA",
    },
    {
      name: "Baroedak Como Identity Platform",
      desc: "Centralized identity hub unifying all 11 digital systems under Como 1907.",
      url: "https://baroedak-como.vercel.app/",
      qaFocus: "Single-sign-on (SSO) flow, system link integrity, & dark UI testing",
      status: "Verified QA & Built",
    },
    {
      name: "Como TV & VOD Streaming Platform",
      desc: "Exclusive video-on-demand match highlights and live stream service.",
      url: "https://baroedak-como.vercel.app/",
      qaFocus: "Video buffer quality, live stream latency monitoring, & player controls",
      status: "Verified QA",
    },
    {
      name: "Como Stadium Access Control",
      desc: "Turnstile gate scanning and matchday QR ticket validation system.",
      url: "https://baroedak-como.vercel.app/",
      qaFocus: "QR scan response time, offline gate validation, & access log audits",
      status: "Verified QA",
    },
    {
      name: "Como Press & Media Accreditation Hub",
      desc: "Journalist credential application and press pass management.",
      url: "https://baroedak-como.vercel.app/",
      qaFocus: "Form file attachment validation, approval workflow, & email dispatch",
      status: "Verified QA",
    },
    {
      name: "Como Youth Academy Scouting Database",
      desc: "Player performance tracking and youth recruitment analytics.",
      url: "https://baroedak-como.vercel.app/",
      qaFocus: "Data input integrity, statistical calculation audit, & role-based access",
      status: "Verified QA",
    },
    {
      name: "Como Retail E-Commerce Portal",
      desc: "Official club merchandise shop and global shipping checkout.",
      url: "https://baroedak-como.vercel.app/",
      qaFocus: "Stock availability sync, international address validation, & invoice audit",
      status: "Verified QA",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between">
      <Navbar />

      <main className="flex-1 pt-28 pb-20 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="container-original relative z-10 mx-auto px-4 max-w-5xl space-y-12">
          
          {/* Top Navigation Back Link */}
          <div>
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-cyan-400 transition-colors p-2 rounded-xl bg-zinc-900/60 border border-zinc-800"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t('projects.back')}</span>
            </Link>
          </div>

          {/* Title Banner Header */}
          <div className="space-y-4">
            <span className="px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider">
              {category}
            </span>

            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
              {title}
            </h1>

            <p className="text-zinc-300 text-sm md:text-base leading-relaxed font-normal">
              {description}
            </p>

            {/* Quick Spec Tags */}
            <div className="pt-4 flex flex-wrap items-center gap-4 border-t border-zinc-800/80 text-xs text-zinc-400">
              {role && (
                <div className="flex items-center gap-1.5">
                  <User className="w-4 h-4 text-cyan-400" />
                  <span>{t('projects.role')}: <strong className="text-white">{role}</strong></span>
                </div>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-cyan-400 hover:underline font-semibold"
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
                  className="flex items-center gap-1.5 text-cyan-400 hover:underline font-semibold"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>{t('projects.liveDemo')}</span>
                </a>
              )}
            </div>
          </div>

          {/* Image Showcase Frame (Multi-Image Interactive Carousel) */}
          <div className="relative group rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800/90 shadow-2xl aspect-[16/9] backdrop-blur-2xl">
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
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-zinc-950/85 hover:bg-cyan-500 text-white border border-white/20 flex items-center justify-center backdrop-blur-md transition-all shadow-xl hover:scale-110 z-20 cursor-pointer"
                  title="Previous Image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-zinc-950/85 hover:bg-cyan-500 text-white border border-white/20 flex items-center justify-center backdrop-blur-md transition-all shadow-xl hover:scale-110 z-20 cursor-pointer"
                  title="Next Image"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Pagination Indicator Dots */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-950/80 border border-white/10 backdrop-blur-md z-20">
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

          {/* If Baroedak Como, render the 11 Systems Showcase Grid */}
          {project.slug === "baroedak-como" && (
            <div className="space-y-6 pt-4">
              <div className="space-y-2 border-b border-zinc-800 pb-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4" />
                  <span>COMO 1907 — 11 Digital Systems Tested</span>
                </div>
                <h3 className="text-2xl font-bold text-white tracking-tight">11 Systems Quality Assurance Audit Breakdown</h3>
                <p className="text-xs md:text-sm text-zinc-400 leading-relaxed">
                  As part of the Quality Assurance team at Como 1907, Haikal conducted manual testing, user flow verification, regression testing, and quality audits across all 11 digital platforms below:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {comoSystems.map((sys, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800/80 hover:border-cyan-500/40 transition-all duration-300 space-y-3 flex flex-col justify-between group"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold text-cyan-400">System #{idx + 1}</span>
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                          <Check className="w-3 h-3" />
                          {sys.status}
                        </span>
                      </div>

                      <h4 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors">
                        {sys.name}
                      </h4>
                      <p className="text-xs text-zinc-400 leading-relaxed font-normal">
                        {sys.desc}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-zinc-800/60 space-y-2">
                      <div className="text-[11px] text-zinc-300">
                        <strong className="text-blue-400">QA Scope:</strong> {sys.qaFocus}
                      </div>

                      {sys.url && sys.url !== "#" && (
                        <a
                          href={sys.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:underline pt-1"
                        >
                          <Globe className="w-3.5 h-3.5" />
                          <span>Visit Live System</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Problem & Solution Grid */}
          {(problem || solution) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {problem && (
                <div className="p-6 md:p-8 rounded-3xl bg-zinc-900/80 border border-zinc-800/80 space-y-3">
                  <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                    <ShieldAlert className="w-4 h-4" />
                    <span>{t('projects.problem')}</span>
                  </div>
                  <p className="text-xs md:text-sm text-zinc-300 leading-relaxed font-normal">
                    {problem}
                  </p>
                </div>
              )}

              {solution && (
                <div className="p-6 md:p-8 rounded-3xl bg-zinc-900/80 border border-zinc-800/80 space-y-3">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                    <Sparkles className="w-4 h-4" />
                    <span>{t('projects.solution')}</span>
                  </div>
                  <p className="text-xs md:text-sm text-zinc-300 leading-relaxed font-normal">
                    {solution}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Key Features */}
          {featureList.length > 0 && (
            <div className="p-6 md:p-8 rounded-3xl bg-zinc-900/80 border border-zinc-800/80 space-y-4">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                <CheckCircle2 className="w-4 h-4" />
                <span>{t('projects.features')}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {featureList.map((feat: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-zinc-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tech Stack Bar */}
          {techList.length > 0 && (
            <div className="p-6 md:p-8 rounded-3xl bg-zinc-900/80 border border-zinc-800/80 space-y-4">
              <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
                <Wrench className="w-4 h-4" />
                <span>{t('projects.techStack')}</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {techList.map((tech: string, idx: number) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-semibold text-zinc-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Action Footer */}
          <div className="pt-6 flex flex-wrap items-center justify-between gap-4 border-t border-zinc-800/80">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
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
                  className="px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-bold text-zinc-300 hover:text-white flex items-center gap-2"
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
                  className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-xs font-bold text-white flex items-center gap-2 shadow-lg shadow-blue-500/20"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>{t('projects.liveDemo')}</span>
                </a>
              )}
            </div>
          </div>

        </div>
      </main>

      <FooterClient />
    </div>
  );
}
