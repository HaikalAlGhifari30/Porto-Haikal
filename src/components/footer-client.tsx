"use client";

import Link from "next/link";
import { Mail, ArrowUp } from "lucide-react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa6";
import { useSafeLang } from "@/store/lang";
import { HagLogo } from "@/components/hag-logo";

interface FooterClientProps {
  settings?: any;
}

export function FooterClient({ settings }: FooterClientProps) {
  const { t } = useSafeLang();

  const linkedinUrl = settings?.linkedin || "https://www.linkedin.com/in/haikalalghifari/";
  const instagramUrl = settings?.instagram || "https://www.instagram.com/alghfri_bhren/";
  const emailUrl = settings?.email || "alghifaribahren03@gmail.com";

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-white/65 dark:bg-[#070e20]/80 backdrop-blur-2xl text-zinc-900 dark:text-white border-t border-slate-200/70 dark:border-cyan-500/20 py-8 sm:py-10 relative overflow-hidden shadow-2xl shadow-slate-900/5 dark:shadow-cyan-950/30 transition-all duration-500">
      <div className="container-original mx-auto px-4 max-w-6xl relative z-10 space-y-6">
        {/* Main Row: Brand - Nav Links - Social Icons */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-200/80 dark:border-blue-500/10">
          
          {/* Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <HagLogo size="sm" />
            <span className="text-base font-bold tracking-tight text-zinc-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
              Haikal <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700 dark:from-cyan-400 dark:via-blue-400 dark:to-indigo-400">Al Ghifari</span>
            </span>
          </Link>

          {/* Inline Navigation Links */}
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-zinc-600 dark:text-zinc-400">
            <Link href="/#home" className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">{t('nav.home')}</Link>
            <Link href="/#about" className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">{t('nav.about')}</Link>
            <Link href="/#skills" className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">{t('nav.skills')}</Link>
            <Link href="/#experience" className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">{t('nav.experience')}</Link>
            <Link href="/#projects" className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">{t('nav.projects')}</Link>
            <Link href="/#education" className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">{t('nav.education')}</Link>
            <Link href="/#contact" className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">{t('nav.contact')}</Link>
          </nav>

          {/* Social Icons */}
          <div className="flex items-center gap-2.5">
            <a
              href="https://github.com/HaikalAlGhifari30"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-white/80 dark:bg-[#0f1938]/80 backdrop-blur-md border border-slate-200/80 dark:border-blue-500/20 text-zinc-700 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-white hover:border-cyan-500/50 hover:bg-cyan-50 dark:hover:bg-cyan-600/20 transition-all shadow-2xs"
              aria-label="GitHub Profile"
            >
              <FaGithub className="w-4 h-4" />
            </a>
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-white/80 dark:bg-[#0f1938]/80 backdrop-blur-md border border-slate-200/80 dark:border-blue-500/20 text-zinc-700 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-white hover:border-cyan-500/50 hover:bg-cyan-50 dark:hover:bg-cyan-600/20 transition-all shadow-2xs"
              aria-label="LinkedIn Profile"
            >
              <FaLinkedin className="w-4 h-4" />
            </a>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-white/80 dark:bg-[#0f1938]/80 backdrop-blur-md border border-slate-200/80 dark:border-blue-500/20 text-zinc-700 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-white hover:border-cyan-500/50 hover:bg-cyan-50 dark:hover:bg-cyan-600/20 transition-all shadow-2xs"
              aria-label="Instagram Profile"
            >
              <FaInstagram className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${emailUrl}`}
              className="p-2 rounded-lg bg-white/80 dark:bg-[#0f1938]/80 backdrop-blur-md border border-slate-200/80 dark:border-blue-500/20 text-zinc-700 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-white hover:border-cyan-500/50 hover:bg-cyan-50 dark:hover:bg-cyan-600/20 transition-all shadow-2xs"
              aria-label="Email Direct"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Bottom Sub-row: Copyright & Back to Top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 font-medium">
          <p>© {new Date().getFullYear()} Haikal Al Ghifari, S.Kom. Hak Cipta Dilindungi Undang-Undang.</p>
          
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 dark:bg-zinc-900/80 border border-slate-200/80 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-cyan-400 transition-all group cursor-pointer shadow-2xs"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
