"use client";

import { useSafeLang } from "@/store/lang";
import { ArrowRight, CheckCircle2, Mail, MessageSquare, ShieldCheck, Sparkles, User } from "lucide-react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa6";
import Link from "next/link";
import { motion } from "framer-motion";

interface HeroSectionProps {
  settings?: any;
  onNavigateScene?: (index: number) => void;
}

export function HeroSection({ settings, onNavigateScene }: HeroSectionProps) {
  const { lang, t } = useSafeLang();
  const isEn = lang === "en";

  const greeting = isEn ? "HELLO, I'M" : "HALO, SAYA";
  const name = "HAIKAL AL GHIFARI";
  const role = isEn
    ? "Informatics Engineer / Quality Assurance Specialist"
    : "Informatics Engineer / Quality Assurance Specialist";
  const summary = isEn
    ? (settings?.aboutTextEn || "Dedicated Quality Assurance Engineer currently actively working at COMO 1907. Highly experienced in web & mobile manual testing, end-to-end user flow verification, regression, and system modeling.")
    : (settings?.aboutText || "Quality Assurance Engineer berdedikasi yang saat ini aktif bekerja di COMO 1907. Berpengalaman dalam pengujian manual web & mobile, verifikasi alur pengguna end-to-end, regresi, serta pemodelan sistem.");

  const linkedinUrl = settings?.linkedin || "https://www.linkedin.com/in/haikalalghifari/";
  const instagramUrl = settings?.instagram || "https://www.instagram.com/alghfri_bhren/";
  const emailUrl = settings?.email || "alghifaribahren03@gmail.com";

  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-6 md:py-10 flex flex-col justify-center items-center text-zinc-900 dark:text-white my-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full">
        
        {/* Left Content Column */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 space-y-5 text-center lg:text-left order-2 lg:order-1"
        >
          {/* Status Pill Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-blue-500/10 dark:bg-cyan-500/10 border border-blue-500/25 dark:border-cyan-500/25 text-blue-600 dark:text-cyan-400 text-xs font-semibold tracking-wide shadow-2xs">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span>{isEn ? "Available for opportunities" : "Terbuka untuk peluang kerja"}</span>
          </div>

          {/* Main Headline */}
          <div className="space-y-1.5">
            <p className="text-slate-500 dark:text-zinc-400 text-xs sm:text-sm font-bold tracking-widest uppercase">
              {greeting}
            </p>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.08]">
              HAIKAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-500 dark:from-blue-500 dark:via-cyan-400 dark:to-indigo-300">AL GHIFARI</span>
            </h1>
            <p className="text-blue-600 dark:text-cyan-400 text-sm sm:text-lg font-bold tracking-wide pt-0.5">
              {role}
            </p>
          </div>

          {/* Short Bio Description */}
          <p className="text-slate-600 dark:text-zinc-300 text-xs sm:text-sm leading-relaxed max-w-xl font-normal mx-auto lg:mx-0">
            {summary}
          </p>

          {/* Action CTA Buttons */}
          <div className="pt-2 space-y-4">
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5">
              <button
                onClick={() => onNavigateScene && onNavigateScene(4)}
                className="px-6 py-3.5 rounded-full bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-500 hover:from-blue-500 hover:to-cyan-400 text-white font-extrabold text-xs tracking-wider uppercase shadow-lg shadow-blue-500/25 hover:shadow-cyan-500/40 hover:scale-105 transition-all flex items-center gap-2 group cursor-pointer"
              >
                <span>{isEn ? "VIEW MY WORK" : "LIHAT PORTOFOLIO"}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onNavigateScene && onNavigateScene(1)}
                className="px-6 py-3.5 rounded-full bg-white/80 dark:bg-slate-900/60 hover:bg-white dark:hover:bg-slate-900/90 border border-slate-300 dark:border-cyan-500/30 text-slate-800 dark:text-white font-extrabold text-xs tracking-wider uppercase hover:border-cyan-400 hover:scale-105 transition-all flex items-center gap-2 backdrop-blur-md cursor-pointer shadow-sm"
              >
                <User className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
                <span>{isEn ? "ABOUT ME" : "TENTANG SAYA"}</span>
              </button>
            </div>

            {/* Social Links Row */}
            <div className="flex items-center justify-center lg:justify-start gap-3 pt-2">
              <a
                href="https://github.com/HaikalAlGhifari30"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="w-9 h-9 rounded-xl bg-white/80 dark:bg-slate-900/60 border border-slate-300 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-cyan-400 hover:border-cyan-500/50 flex items-center justify-center transition-all group shadow-2xs"
                title="GitHub Profile"
              >
                <FaGithub className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="w-9 h-9 rounded-xl bg-white/80 dark:bg-slate-900/60 border border-slate-300 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-cyan-400 hover:border-cyan-500/50 flex items-center justify-center transition-all group shadow-2xs"
                title="LinkedIn Profile"
              >
                <FaLinkedin className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Profile"
                className="w-9 h-9 rounded-xl bg-white/80 dark:bg-slate-900/60 border border-slate-300 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-cyan-400 hover:border-cyan-500/50 flex items-center justify-center transition-all group shadow-2xs"
                title="Instagram Profile"
              >
                <FaInstagram className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href={`mailto:${emailUrl}`}
                aria-label="Send Email"
                className="w-9 h-9 rounded-xl bg-white/80 dark:bg-slate-900/60 border border-slate-300 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-cyan-400 hover:border-cyan-500/50 flex items-center justify-center transition-all group shadow-2xs"
                title="Send Email"
              >
                <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Right Portrait Frame Seamlessly Integrated into Galaxy Space Environment */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-5 flex justify-center relative order-1 lg:order-2"
        >
          <div className="relative group w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[340px]">
            {/* Outer Ambient Radial Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/40 via-blue-600/40 to-indigo-600/40 rounded-[2.2rem] blur-xl opacity-70 group-hover:opacity-100 transition duration-700 pointer-events-none" />
            
            {/* Transparent Glass Frame - Zero solid white container */}
            <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden border border-cyan-400/40 shadow-[0_0_40px_rgba(34,211,238,0.25)] bg-slate-950/80 group-hover:border-cyan-400 transition-all duration-500">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={settings?.heroBannerUrl || "/haikal-al-ghifari.jpg"}
                alt="Haikal Al Ghifari Profile"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
              />
              
              {/* Bottom Subtle Gradient Mask */}
              <div className="absolute inset-x-0 bottom-0 p-3.5 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent flex justify-center pt-10 pointer-events-none">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#070e20]/85 backdrop-blur-md border border-cyan-500/40 text-cyan-300 text-[11px] font-bold shadow-lg pointer-events-auto">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Quality Assurance at COMO 1907</span>
                </span>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
