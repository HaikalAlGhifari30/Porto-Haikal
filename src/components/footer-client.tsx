"use client";

import Link from "next/link";
import { Mail } from "lucide-react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa6";
import { useSafeLang } from "@/store/lang";
import { HagLogo } from "@/components/hag-logo";

interface FooterClientProps {
  settings?: any;
  onNavigateScene?: (index: number) => void;
}

export function FooterClient({ settings, onNavigateScene }: FooterClientProps) {
  const { t } = useSafeLang();

  const linkedinUrl = settings?.linkedin || "https://www.linkedin.com/in/haikalalghifari/";
  const instagramUrl = settings?.instagram || "https://www.instagram.com/alghfri_bhren/";
  const emailUrl = settings?.email || "alghifaribahren03@gmail.com";

  // 6 Main Sections matching Header Navbar
  const navItems = [
    { sceneIdx: 0, label: t('nav.home') },
    { sceneIdx: 1, label: t('nav.about') },
    { sceneIdx: 2, label: t('nav.skills') },
    { sceneIdx: 3, label: t('nav.experience') },
    { sceneIdx: 4, label: t('nav.projects') },
    { sceneIdx: 5, label: t('nav.contact') },
  ];

  const handleNavClick = (idx: number, e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigateScene) {
      onNavigateScene(idx);
    }
  };

  return (
    <footer className="w-full bg-white/20 dark:bg-slate-950/50 backdrop-blur-2xl text-slate-900 dark:text-white border-t border-white/60 dark:border-cyan-500/20 py-3 pb-16 sm:pb-3 relative overflow-hidden shadow-2xl shrink-0 mt-auto z-20">
      <div className="w-full max-w-6xl px-4 sm:px-6 mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        
        {/* Brand & Socials Wrapper for Mobile Layout */}
        <div className="w-full sm:w-auto flex items-center justify-between sm:justify-start gap-3">
          {/* Brand */}
          <button
            onClick={(e) => handleNavClick(0, e)}
            className="flex items-center gap-2.5 group text-left cursor-pointer shrink-0"
            title="Haikal Al Ghifari — HAG"
          >
            <HagLogo size="sm" useImage={false} />
            <span className="text-xs sm:text-sm font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
              Haikal <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-500 dark:from-blue-500 dark:via-cyan-400 dark:to-indigo-300">Al Ghifari</span>
            </span>
          </button>

          {/* Social Icons (Visible on Mobile top row) */}
          <div className="flex sm:hidden items-center gap-1.5 shrink-0">
            <a
              href="https://github.com/HaikalAlGhifari30"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg bg-white/60 dark:bg-slate-900/80 border border-white/80 dark:border-zinc-800 text-slate-700 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-cyan-400 transition-all shadow-2xs backdrop-blur-xs"
              aria-label="GitHub Profile"
              title="GitHub Profile"
            >
              <FaGithub className="w-3.5 h-3.5" />
            </a>
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg bg-white/60 dark:bg-slate-900/80 border border-white/80 dark:border-zinc-800 text-slate-700 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-cyan-400 transition-all shadow-2xs backdrop-blur-xs"
              aria-label="LinkedIn Profile"
              title="LinkedIn Profile"
            >
              <FaLinkedin className="w-3.5 h-3.5" />
            </a>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg bg-white/60 dark:bg-slate-900/80 border border-white/80 dark:border-zinc-800 text-slate-700 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-cyan-400 transition-all shadow-2xs backdrop-blur-xs"
              aria-label="Instagram Profile"
              title="Instagram Profile"
            >
              <FaInstagram className="w-3.5 h-3.5" />
            </a>
            <a
              href={`mailto:${emailUrl}`}
              className="p-1.5 rounded-lg bg-white/60 dark:bg-slate-900/80 border border-white/80 dark:border-zinc-800 text-slate-700 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-cyan-400 transition-all shadow-2xs backdrop-blur-xs"
              aria-label="Email Direct"
              title="Send Email"
            >
              <Mail className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Center Copyright Notice */}
        <p className="text-[11px] text-slate-800 dark:text-zinc-400 font-bold text-center order-last sm:order-none">
          © {new Date().getFullYear()} Haikal Al Ghifari. All rights reserved.
        </p>

        {/* Social Icons (Desktop sm+ view) */}
        <div className="hidden sm:flex items-center gap-2 shrink-0">
          <a
            href="https://github.com/HaikalAlGhifari30"
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-lg bg-white/60 dark:bg-slate-900/80 border border-white/80 dark:border-zinc-800 text-slate-700 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-cyan-400 transition-all shadow-2xs backdrop-blur-xs"
            aria-label="GitHub Profile"
            title="GitHub Profile"
          >
            <FaGithub className="w-3.5 h-3.5" />
          </a>
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-lg bg-white/60 dark:bg-slate-900/80 border border-white/80 dark:border-zinc-800 text-slate-700 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-cyan-400 transition-all shadow-2xs backdrop-blur-xs"
            aria-label="LinkedIn Profile"
            title="LinkedIn Profile"
          >
            <FaLinkedin className="w-3.5 h-3.5" />
          </a>
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-lg bg-white/60 dark:bg-slate-900/80 border border-white/80 dark:border-zinc-800 text-slate-700 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-cyan-400 transition-all shadow-2xs backdrop-blur-xs"
            aria-label="Instagram Profile"
            title="Instagram Profile"
          >
            <FaInstagram className="w-3.5 h-3.5" />
          </a>
          <a
            href={`mailto:${emailUrl}`}
            className="p-1.5 rounded-lg bg-white/60 dark:bg-slate-900/80 border border-white/80 dark:border-zinc-800 text-slate-700 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-cyan-400 transition-all shadow-2xs backdrop-blur-xs"
            aria-label="Email Direct"
            title="Send Email"
          >
            <Mail className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </footer>
  );
}
