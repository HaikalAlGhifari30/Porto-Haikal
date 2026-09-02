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
    ? (settings?.aboutTextEn || "Bachelor of Informatics Engineering graduate from Universitas Komputer Indonesia with a GPA of 3.46 and a strong interest in Quality Assurance, particularly Manual Testing. Passionate about ensuring software quality, functionality, and user experience through detailed testing and effective problem-solving.")
    : (settings?.aboutText || "Lulusan S1 Teknik Informatika dari Universitas Komputer Indonesia dengan IPK 3.46 dan minat kuat pada bidang Quality Assurance, khususnya Manual Testing. Memiliki passion tinggi dalam menjaga kualitas perangkat lunak, fungsionalitas, dan pengalaman pengguna melalui pengujian yang mendalam serta pemecahan masalah yang efektif.");

  const linkedinUrl = settings?.linkedin || "https://www.linkedin.com/in/haikalalghifari/";
  const instagramUrl = settings?.instagram || "https://www.instagram.com/alghfri_bhren/";
  const emailUrl = settings?.email || "alghifaribahren03@gmail.com";

  return (
    <section id="home" className="relative min-h-[90vh] flex items-center justify-center pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-transparent text-zinc-900 dark:text-white transition-colors duration-500">
      {/* Deep Background Decorative Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#3b82f615_1px,transparent_1px)] dark:bg-[radial-gradient(#38bdf815_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      
      {/* Dynamic Ambient Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-blue-600/10 dark:bg-cyan-500/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-indigo-600/10 dark:bg-blue-600/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="container-original relative z-10 mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Content Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Available Status Pill Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 text-xs font-semibold tracking-wide backdrop-blur-md">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
              </span>
              <span>Available for opportunities</span>
            </div>

            {/* Main Headline & Greeting */}
            <div className="space-y-2">
              <p className="text-zinc-500 dark:text-zinc-400 text-sm font-semibold tracking-wider uppercase">
                {greeting}
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-zinc-900 dark:text-white leading-[1.1]">
                Haikal <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-500 dark:from-cyan-400 dark:via-blue-400 dark:to-indigo-300">Al Ghifari</span>
              </h1>
              <p className="text-cyan-600 dark:text-cyan-400 text-base sm:text-xl font-bold tracking-wide pt-1">
                — Quality Assurance Engineer & System Analyst —
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

          {/* Right Visual / Personal Rectangular Portrait Photo Card with Floating Tech Pills */}
          <div className="lg:col-span-5 flex justify-center relative">
            <div className="relative group w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[400px]">
              
              {/* Outer Card Ambient Neon Glow */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 rounded-[2.5rem] blur-2xl opacity-30 dark:opacity-50 group-hover:opacity-80 transition duration-700 pointer-events-none" />
              
              {/* Main Professional Glass Card */}
              <div className="relative rounded-[2.2rem] bg-white/90 dark:bg-[#070e20]/95 border border-slate-200/90 dark:border-cyan-500/35 p-4 backdrop-blur-2xl shadow-2xl space-y-4 transition-all duration-500 hover:border-cyan-400/60">
                
                {/* Rectangular Portrait Photo Viewport */}
                <div className="relative aspect-[4/5] rounded-[1.8rem] overflow-hidden bg-slate-900 border border-slate-200/80 dark:border-zinc-800/80 shadow-inner">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/haikal-al-ghifari.jpg"
                    alt="Haikal Al Ghifari Profile"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  />
                  
                  {/* Subtle Bottom Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Small Verified Badge at Bottom Right of Photo */}
                  <div className="absolute bottom-3 right-3 px-3 py-1 rounded-xl bg-zinc-950/90 backdrop-blur-md border border-white/15 text-cyan-400 flex items-center gap-1.5 shadow-lg">
                    <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span className="text-[10px] font-extrabold tracking-wider uppercase">Verified QA</span>
                  </div>
                </div>

                {/* Bottom Badge Pill: Quality Assurance at COMO 1907 */}
                <div className="flex justify-center pb-1">
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-[#0c142c] border border-slate-200 dark:border-cyan-500/30 text-blue-600 dark:text-cyan-300 text-xs font-bold shadow-sm">
                    <CheckCircle2 className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
                    <span>Quality Assurance at COMO 1907</span>
                  </span>
                </div>

              </div>

              {/* Floating Skill Badges Around Photo Card (Yofi Style) */}
              <div className="hidden sm:block absolute -left-6 top-8 px-3 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold backdrop-blur-md shadow-lg pointer-events-none animate-bounce duration-[3000ms]">
                Manual Testing
              </div>
              <div className="hidden sm:block absolute -right-6 top-16 px-3 py-1.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-xs font-bold backdrop-blur-md shadow-lg pointer-events-none">
                Postman & API
              </div>
              <div className="hidden sm:block absolute -left-8 top-1/2 px-3 py-1.5 rounded-xl bg-blue-500/20 border border-blue-500/40 text-blue-300 text-xs font-bold backdrop-blur-md shadow-lg pointer-events-none">
                IT Business Analyst
              </div>
              <div className="hidden sm:block absolute -right-8 bottom-24 px-3 py-1.5 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-300 text-xs font-bold backdrop-blur-md shadow-lg pointer-events-none">
                DFD & ERD
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
