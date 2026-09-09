"use client";

import { useSafeLang } from "@/store/lang";
import { ArrowRight, CheckCircle2, Download, Mail, MessageSquare, ShieldCheck, Sparkles } from "lucide-react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa6";
import Link from "next/link";

interface HeroSectionProps {
  settings?: any;
}

export function HeroSection({ settings }: HeroSectionProps) {
  const { lang, t } = useSafeLang();
  const isEn = lang === "en";

  const greeting = isEn ? "Hi, I'm" : "Halo, Saya";
  const name = "Haikal Al Ghifari, S.Kom";
  const role = isEn
    ? "Quality Assurance Engineer & Manual Testing Specialist"
    : "Quality Assurance Engineer & Manual Testing Specialist";
  const summary = isEn
    ? (settings?.aboutTextEn || "Informatics Engineering graduate from UNIKOM (GPA 3.46) dedicated as a Quality Assurance Engineer, currently actively working at COMO 1907 (Global Media Visual). Highly experienced in web & mobile manual testing, end-to-end user flow verification, regression, and system modeling. Former Chairman of HMIF UNIKOM with strong leadership, analytical precision, and adaptability.")
    : (settings?.aboutText || "Lulusan S1 Teknik Informatika UNIKOM (IPK 3.46) yang berdedikasi tinggi sebagai Quality Assurance Engineer, dan saat ini sedang aktif bekerja di COMO 1907 (Global Media Visual). Berpengalaman dalam pengujian manual (manual testing) web & mobile, verifikasi alur pengguna end-to-end, regresi, serta pemodelan sistem. Memiliki pengalaman kepemimpinan sebagai mantan Ketua HMIF UNIKOM yang analitis, teliti, dan adaptif.");

  const linkedinUrl = settings?.linkedin || "https://www.linkedin.com/in/haikalalghifari/";
  const instagramUrl = settings?.instagram || "https://www.instagram.com/alghfri_bhren/";
  const emailUrl = settings?.email || "alghifaribahren03@gmail.com";

  return (
    <section id="home" className="relative min-h-[90vh] flex items-center justify-center pt-36 sm:pt-36 lg:pt-40 pb-16 lg:pb-24 overflow-hidden bg-transparent text-zinc-900 dark:text-white">
      {/* Deep Background Decorative Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#3b82f615_1px,transparent_1px)] dark:bg-[radial-gradient(#38bdf815_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      
      {/* Dynamic Ambient Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] sm:w-[650px] h-[90vw] sm:h-[650px] bg-blue-600/10 dark:bg-cyan-500/15 rounded-full blur-[70px] sm:blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[70vw] sm:w-[450px] h-[70vw] sm:h-[450px] bg-indigo-600/10 dark:bg-blue-600/15 rounded-full blur-[60px] sm:blur-[120px] pointer-events-none" />

      <div className="container-original relative z-10 mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-10 items-center">
          
          {/* Left Content Column (Headline, Greeting, Bio, CTAs & Socials) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left order-2 lg:order-1">
            
            {/* Available Status Pill Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 text-xs font-semibold tracking-wide">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
              </span>
              <span>Available for opportunities</span>
            </div>

            {/* Main Headline & Greeting */}
            <div className="space-y-2">
              <p className="text-zinc-500 dark:text-zinc-400 text-sm font-semibold tracking-wider uppercase">
                {isEn ? (settings?.heroTitleEn || "Hi, I'm") : (settings?.heroTitle || "Halo, Saya")}
              </p>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-zinc-900 dark:text-white leading-[1.1]">
                Haikal <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-500 dark:from-cyan-400 dark:via-blue-400 dark:to-indigo-300">Al Ghifari</span>
              </h1>
              <p className="text-cyan-600 dark:text-cyan-400 text-base sm:text-xl font-bold tracking-wide pt-1">
                {isEn ? (settings?.heroSubtitleEn || "— Quality Assurance Engineer —") : (settings?.heroSubtitle || "— Quality Assurance Engineer —")}
              </p>
            </div>

            {/* Bio Description */}
            <p className="text-zinc-600 dark:text-zinc-300 text-sm sm:text-base leading-relaxed max-w-xl font-normal mx-auto lg:mx-0">
              {summary}
            </p>

            {/* Action Buttons & Socials Row */}
            <div className="pt-3 space-y-5">
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <Link
                  href="#projects"
                  className="px-7 py-3.5 rounded-full bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-sm tracking-wide shadow-lg shadow-blue-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5 transition-all flex items-center gap-2 group"
                >
                  <span>{t('hero.viewProjects')}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="#contact"
                  className="px-7 py-3.5 rounded-full bg-slate-100 dark:bg-zinc-900/80 hover:bg-slate-200 dark:hover:bg-zinc-800 border border-slate-300 dark:border-zinc-800 text-zinc-900 dark:text-white font-bold text-sm tracking-wide hover:border-cyan-400/60 hover:-translate-y-0.5 transition-all flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
                  <span>{t('hero.contactMe')}</span>
                </Link>
              </div>

              {/* Social Links Row */}
              <div className="flex items-center justify-center lg:justify-start gap-3 pt-1">
                <a
                  href="https://github.com/HaikalAlGhifari30"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-zinc-900/80 border border-slate-300 dark:border-zinc-800 text-zinc-700 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-cyan-400 hover:border-cyan-500/50 flex items-center justify-center transition-all group shadow-sm"
                  title="GitHub Profile"
                >
                  <FaGithub className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </a>
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-zinc-900/80 border border-slate-300 dark:border-zinc-800 text-zinc-700 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-cyan-400 hover:border-cyan-500/50 flex items-center justify-center transition-all group shadow-sm"
                  title="LinkedIn Profile"
                >
                  <FaLinkedin className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </a>
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram Profile"
                  className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-zinc-900/80 border border-slate-300 dark:border-zinc-800 text-zinc-700 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-cyan-400 hover:border-cyan-500/50 flex items-center justify-center transition-all group shadow-sm"
                  title="Instagram Profile"
                >
                  <FaInstagram className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </a>
                <a
                  href={`mailto:${emailUrl}`}
                  aria-label="Send Email"
                  className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-zinc-900/80 border border-slate-300 dark:border-zinc-800 text-zinc-700 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-cyan-400 hover:border-cyan-500/50 flex items-center justify-center transition-all group shadow-sm"
                  title="Send Email"
                >
                  <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </a>
              </div>
            </div>

          </div>

          {/* Right Visual / Single Clean Portrait Photo Frame (Matching ChatGPT Reference Design) */}
          <div className="lg:col-span-5 flex justify-center relative order-1 lg:order-2">
            <div className="relative group w-full max-w-[320px] sm:max-w-[360px] lg:max-w-[380px]">
              
              {/* Subtle Outer Neon Glow Spread */}
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/30 via-blue-600/30 to-indigo-600/30 rounded-[2.5rem] blur-xl opacity-60 dark:opacity-80 group-hover:opacity-100 transition duration-700 pointer-events-none" />
              
              {/* Single Clean Photo Viewport Frame (Zero outer padding container!) */}
              <div className="relative aspect-[4/5] rounded-[2.2rem] overflow-hidden border border-slate-300/80 dark:border-cyan-400/50 shadow-[0_0_40px_rgba(34,211,238,0.2)] bg-slate-900 group-hover:border-cyan-400 transition-all duration-500">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={settings?.heroBannerUrl || "/haikal-al-ghifari.jpg"}
                  alt="Haikal Al Ghifari Profile"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Overlay Bottom Gradient & Integrated Badge Pill */}
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent flex justify-center pt-12 pointer-events-none">
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100/90 dark:bg-[#070e20]/80 backdrop-blur-md border border-slate-200/80 dark:border-cyan-500/40 text-blue-600 dark:text-cyan-300 text-xs font-bold shadow-lg pointer-events-auto">
                    <CheckCircle2 className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
                    <span>Quality Assurance at COMO 1907</span>
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Bottom Smooth Transition Mask to Next Section */}
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent pointer-events-none" />
    </section>
  );
}
