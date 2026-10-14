"use client";

import { useSafeLang } from "@/store/lang";
import { ArrowRight, Mail, User } from "lucide-react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa6";
import { motion } from "framer-motion";

interface HeroSectionProps {
  settings?: any;
  onNavigateScene?: (index: number) => void;
}

export function HeroSection({ settings, onNavigateScene }: HeroSectionProps) {
  const { lang } = useSafeLang();
  const isEn = lang === "en";

  const greeting = isEn ? "HELLO, I'M" : "HALO, SAYA";
  const role = isEn
    ? "Quality Assurance Specialist"
    : "Quality Assurance Specialist";
  const summary = isEn
    ? (settings?.aboutTextEn || "Dedicated Quality Assurance Engineer currently actively working at COMO 1907. Highly experienced in web & mobile manual testing, end-to-end user flow verification, regression, and system modeling.")
    : (settings?.aboutText || "Quality Assurance Engineer berdedikasi yang saat ini aktif bekerja di COMO 1907. Berpengalaman dalam pengujian manual web & mobile, verifikasi alur pengguna end-to-end, regresi, serta pemodelan sistem.");

  const linkedinUrl = settings?.linkedin || "https://www.linkedin.com/in/haikalalghifari/";
  const instagramUrl = settings?.instagram || "https://www.instagram.com/alghfri_bhren/";
  const emailUrl = settings?.email || "alghifaribahren03@gmail.com";

  return (
    <section className="w-full max-w-6xl xl:max-w-7xl mx-auto px-3 sm:px-6 py-1 sm:py-3 flex flex-col justify-center items-center text-black dark:text-white">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-7 lg:gap-10 xl:gap-12 items-center w-full">
        
        {/* Left Content Column */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-7 space-y-3 sm:space-y-4 lg:space-y-5 text-center lg:text-left order-2 lg:order-1"
        >
          {/* Status Badge (8-Bit Arcade Tag) */}
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1 bg-[#FACC15] text-black border-2 border-black dark:border-white shadow-retro-sm font-pixel font-black text-[10px] sm:text-xs tracking-wide sm:tracking-wider">
            <span className="relative flex h-2 sm:h-2.5 w-2 sm:w-2.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 sm:h-2.5 w-2 sm:w-2.5 bg-emerald-500 border border-black/40" />
            </span>
            <span>{isEn ? "AVAILABLE FOR OPPORTUNITIES" : "TERBUKA UNTUK PELUANG KERJA"}</span>
          </div>

          {/* Main Headline (8-Bit Pixel Typography) */}
          <div className="space-y-1 sm:space-y-2">
            <p className="font-pixel text-[10px] sm:text-xs font-bold tracking-widest uppercase text-zinc-600 dark:text-zinc-400">
              {greeting}
            </p>
            <h1 className="text-2xl min-[400px]:text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-pixel font-black tracking-tight text-black dark:text-white leading-[1.1] break-words">
              HAIKAL{" "}
              <span className="text-[#FACC15] drop-shadow-[2px_2px_0_#000000] sm:drop-shadow-[3px_3px_0_#000000] dark:drop-shadow-[2px_2px_0_#ffffff] sm:dark:drop-shadow-[3px_3px_0_#ffffff]">
                AL GHIFARI
              </span>
            </h1>
            <div className="pt-0.5">
              <span className="inline-block px-2.5 sm:px-3 py-1 bg-black text-[#FACC15] dark:bg-white dark:text-black font-pixel font-bold text-[11px] sm:text-xs border-2 border-black dark:border-white shadow-retro-sm tracking-wide sm:tracking-wider">
                {role}
              </span>
            </div>
          </div>

          {/* Short Bio Description (Clean Legible Font) */}
          <p className="font-sans text-xs sm:text-sm lg:text-[15px] leading-relaxed text-zinc-800 dark:text-zinc-200 max-w-xl font-medium mx-auto lg:mx-0 px-1 sm:px-0">
            {summary}
          </p>

          {/* Action CTA Buttons (8-Bit Arcade Buttons) */}
          <div className="pt-0.5 sm:pt-1 space-y-2.5 sm:space-y-3">
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2.5 sm:gap-3.5">
              <button
                onClick={() => onNavigateScene && onNavigateScene(4)}
                className="w-full max-w-xs sm:w-auto sm:max-w-none px-4 sm:px-6 py-2.5 sm:py-3 bg-[#FACC15] hover:bg-[#EAB308] text-black font-pixel font-black text-xs sm:text-sm tracking-wider uppercase border-2 border-black dark:border-white shadow-retro btn-retro flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <span className="leading-none pt-0.5">{isEn ? "VIEW MY WORK" : "LIHAT PORTOFOLIO"}</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>

              <button
                onClick={() => onNavigateScene && onNavigateScene(1)}
                className="w-full max-w-xs sm:w-auto sm:max-w-none px-4 sm:px-6 py-2.5 sm:py-3 bg-white dark:bg-[#151B22] hover:bg-yellow-100 dark:hover:bg-zinc-800 text-black dark:text-white font-pixel font-black text-xs sm:text-sm tracking-wider uppercase border-2 border-black dark:border-white shadow-retro btn-retro flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <User className="w-4 h-4 text-black dark:text-[#FACC15]" />
                <span className="leading-none pt-0.5">{isEn ? "ABOUT ME" : "TENTANG SAYA"}</span>
              </button>
            </div>

            {/* Social Links Row (Square 8-Bit Pixel Buttons) */}
            <div className="flex items-center justify-center lg:justify-start gap-2 sm:gap-2.5 pt-0.5">
              <a
                href="https://github.com/HaikalAlGhifari30"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="w-9 h-9 sm:w-10 sm:h-10 bg-white dark:bg-[#151B22] border-2 border-black dark:border-white text-black dark:text-white hover:bg-[#FACC15] hover:text-black dark:hover:bg-[#FACC15] dark:hover:text-black shadow-retro-xs sm:shadow-retro-sm btn-retro flex items-center justify-center transition-all cursor-pointer"
                title="GitHub Profile"
              >
                <FaGithub className="w-4 h-4" />
              </a>
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="w-9 h-9 sm:w-10 sm:h-10 bg-white dark:bg-[#151B22] border-2 border-black dark:border-white text-black dark:text-white hover:bg-[#FACC15] hover:text-black dark:hover:bg-[#FACC15] dark:hover:text-black shadow-retro-xs sm:shadow-retro-sm btn-retro flex items-center justify-center transition-all cursor-pointer"
                title="LinkedIn Profile"
              >
                <FaLinkedin className="w-4 h-4" />
              </a>
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Profile"
                className="w-9 h-9 sm:w-10 sm:h-10 bg-white dark:bg-[#151B22] border-2 border-black dark:border-white text-black dark:text-white hover:bg-[#FACC15] hover:text-black dark:hover:bg-[#FACC15] dark:hover:text-black shadow-retro-xs sm:shadow-retro-sm btn-retro flex items-center justify-center transition-all cursor-pointer"
                title="Instagram Profile"
              >
                <FaInstagram className="w-4 h-4" />
              </a>
              <a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(emailUrl)}&su=${encodeURIComponent("Portfolio Inquiry")}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Send Email"
                className="w-9 h-9 sm:w-10 sm:h-10 bg-white dark:bg-[#151B22] border-2 border-black dark:border-white text-black dark:text-white hover:bg-[#FACC15] hover:text-black dark:hover:bg-[#FACC15] dark:hover:text-black shadow-retro-xs sm:shadow-retro-sm btn-retro flex items-center justify-center transition-all cursor-pointer"
                title="Send Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Right Portrait Frame with 8-Bit Badges & Hard Offset Shadow */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-5 flex justify-center relative order-1 lg:order-2 px-2 pt-1 sm:py-0"
        >
          <div className="relative w-full max-w-[160px] min-[400px]:max-w-[185px] sm:max-w-[230px] lg:max-w-[280px] xl:max-w-[310px]">
            {/* Top-Right Pin Badge */}
            <div className="absolute -top-2.5 -right-2 sm:-top-3.5 sm:-right-3.5 z-20 px-2 sm:px-3.5 py-0.5 sm:py-1.5 bg-[#FACC15] text-black font-pixel font-black text-[9px] sm:text-xs border-2 border-black dark:border-white shadow-retro-sm tracking-wider uppercase">
              20+ PROJECTS
            </div>

            {/* Bottom-Left Pin Badge */}
            <div className="absolute -bottom-2.5 -left-2 sm:-bottom-3.5 sm:-left-3.5 z-20 px-2.5 sm:px-3.5 py-0.5 sm:py-1.5 bg-white dark:bg-[#151B22] text-black dark:text-white font-pixel font-black text-[9px] sm:text-xs border-2 border-black dark:border-white shadow-retro-sm tracking-wider uppercase whitespace-nowrap">
              QA SPECIALIST
            </div>

            {/* Main 8-Bit Frame */}
            <div className="relative aspect-[4/5] overflow-hidden border-3 border-black dark:border-white shadow-retro-md sm:shadow-retro-lg bg-black">
              {/* Profile Photo */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={settings?.heroBannerUrl || "/haikal-al-ghifari.jpg"}
                alt="Haikal Al Ghifari Profile"
                className="w-full h-full object-cover object-[center_18%] hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
