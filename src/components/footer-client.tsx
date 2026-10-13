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
    <footer className="w-full bg-[#FAF6ED] dark:bg-[#0E1217] text-black dark:text-white border-t-2 border-black dark:border-white py-3 pb-12 sm:pb-3 relative overflow-hidden shadow-retro-sm shrink-0 mt-auto z-20">
      <div className="container-original relative flex flex-col sm:flex-row items-center justify-between w-full px-3 md:px-8 mx-auto gap-3 text-xs">
        
        {/* Brand & Socials Wrapper for Mobile Layout */}
        <div className="w-full sm:w-auto flex items-center justify-between sm:justify-start gap-3">
          {/* Brand */}
          <button
            onClick={(e) => handleNavClick(0, e)}
            className="flex items-center gap-2 group text-left cursor-pointer shrink-0 btn-retro"
            title="Haikal Al Ghifari — HAG"
          >
            <div className="px-2 py-0.5 bg-[#FACC15] text-black border-2 border-black dark:border-white shadow-retro-xs font-pixel font-bold text-[10px] tracking-wider">
              HAG
            </div>
            <span className="font-pixel text-xs font-bold text-black dark:text-white uppercase">
              Haikal Al Ghifari
            </span>
          </button>

          {/* Social Icons (Visible on Mobile top row) */}
          <div className="flex sm:hidden items-center gap-1.5 shrink-0">
            <a
              href="https://github.com/HaikalAlGhifari30"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 bg-white dark:bg-[#151B22] border-2 border-black dark:border-white text-black dark:text-white shadow-retro-xs btn-retro hover:bg-yellow-100"
              aria-label="GitHub Profile"
              title="GitHub Profile"
            >
              <FaGithub className="w-3.5 h-3.5" />
            </a>
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 bg-white dark:bg-[#151B22] border-2 border-black dark:border-white text-black dark:text-white shadow-retro-xs btn-retro hover:bg-yellow-100"
              aria-label="LinkedIn Profile"
              title="LinkedIn Profile"
            >
              <FaLinkedin className="w-3.5 h-3.5" />
            </a>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 bg-white dark:bg-[#151B22] border-2 border-black dark:border-white text-black dark:text-white shadow-retro-xs btn-retro hover:bg-yellow-100"
              aria-label="Instagram Profile"
              title="Instagram Profile"
            >
              <FaInstagram className="w-3.5 h-3.5" />
            </a>
            <a
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(emailUrl)}&su=${encodeURIComponent("Portfolio Inquiry")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 bg-white dark:bg-[#151B22] border-2 border-black dark:border-white text-black dark:text-white shadow-retro-xs btn-retro hover:bg-yellow-100"
              aria-label="Email Direct"
              title="Send Email"
            >
              <Mail className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Center Copyright Notice */}
        <p className="font-pixel text-[10px] text-zinc-700 dark:text-zinc-300 text-center order-last sm:order-none uppercase">
          © {new Date().getFullYear()} HAIKAL AL GHIFARI. {t('footer.copyright', 'Hak Cipta Dilindungi Undang-Undang.')}
        </p>

        {/* Social Icons (Desktop sm+ view) */}
        <div className="hidden sm:flex items-center gap-2 shrink-0">
          <a
            href="https://github.com/HaikalAlGhifari30"
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 bg-white dark:bg-[#151B22] border-2 border-black dark:border-white text-black dark:text-white shadow-retro-xs btn-retro hover:bg-yellow-100"
            aria-label="GitHub Profile"
            title="GitHub Profile"
          >
            <FaGithub className="w-3.5 h-3.5" />
          </a>
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 bg-white dark:bg-[#151B22] border-2 border-black dark:border-white text-black dark:text-white shadow-retro-xs btn-retro hover:bg-yellow-100"
            aria-label="LinkedIn Profile"
            title="LinkedIn Profile"
          >
            <FaLinkedin className="w-3.5 h-3.5" />
          </a>
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 bg-white dark:bg-[#151B22] border-2 border-black dark:border-white text-black dark:text-white shadow-retro-xs btn-retro hover:bg-yellow-100"
            aria-label="Instagram Profile"
            title="Instagram Profile"
          >
            <FaInstagram className="w-3.5 h-3.5" />
          </a>
          <a
            href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(emailUrl)}&su=${encodeURIComponent("Portfolio Inquiry")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 bg-white dark:bg-[#151B22] border-2 border-black dark:border-white text-black dark:text-white shadow-retro-xs btn-retro hover:bg-yellow-100"
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
