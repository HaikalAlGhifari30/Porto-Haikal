"use client";

import { useState, useEffect } from "react";
import { useSafeLang } from "@/store/lang";
import { ArrowRight, Wrench, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function DevNoticeModal() {
  const { lang } = useSafeLang();
  const isEn = lang === "en";
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      const hasSeen = sessionStorage.getItem("hasSeenDevNotice");
      if (!hasSeen) {
        setIsOpen(true);
      }
    } catch {
      setIsOpen(true);
    }
  }, []);

  const handleDismiss = () => {
    try {
      sessionStorage.setItem("hasSeenDevNotice", "true");
    } catch {
      // Ignore storage error in restricted webviews
    }
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          data-no-scene-scroll="true"
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-xs"
        >
          <motion.div
            initial={{ scale: 0.94, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 15 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            data-no-scene-scroll="true"
            className="relative w-full max-w-md bg-[#FAF6ED] dark:bg-[#151B22] border-3 sm:border-4 border-black dark:border-white shadow-retro-lg text-black dark:text-white overflow-hidden my-auto"
          >
            {/* 8-Bit Retro Title Bar */}
            <div className="p-3 bg-[#FACC15] border-b-2 border-black dark:border-white flex items-center justify-between text-black select-none">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-black inline-block shrink-0" />
                <span className="font-pixel text-[11px] sm:text-xs font-black uppercase tracking-wider">
                  SYSTEM NOTICE // DEV LOG
                </span>
              </div>
              <span className="px-2 py-0.5 bg-white border border-black font-pixel text-[10px] font-bold shadow-retro-xs">
                BUILD v1.0
              </span>
            </div>

            {/* Modal Content Body */}
            <div className="p-5 sm:p-7 space-y-4 sm:space-y-5 text-center flex flex-col items-center">
              
              {/* Header Icon Box */}
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 bg-[#FACC15] border-3 border-black dark:border-white shadow-retro-sm flex items-center justify-center shrink-0">
                <Wrench className="w-7 h-7 sm:w-8 sm:h-8 text-black" />
                <span className="absolute -top-1.5 -right-1.5 flex h-3.5 w-3.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border border-black/40" />
                </span>
              </div>

              {/* Title & Description */}
              <div className="space-y-2">
                <div className="inline-block px-3 py-1 bg-white dark:bg-[#0E1217] border-2 border-black dark:border-white shadow-retro-xs text-black dark:text-white font-pixel text-[10px] sm:text-[11px] uppercase font-bold tracking-wider">
                  ● {isEn ? "UNDER ACTIVE DEVELOPMENT" : "DALAM TAHAP PENGEMBANGAN"}
                </div>

                <h2 className="text-lg sm:text-2xl font-pixel font-black tracking-tight text-black dark:text-white uppercase leading-snug">
                  {isEn ? "WEBSITE UNDER IMPLEMENTATION" : "WEBSITE DALAM IMPLEMENTASI"}
                </h2>

                <p className="font-sans text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed font-medium max-w-sm mx-auto">
                  {isEn
                    ? "Welcome to Haikal Al Ghifari's portfolio. This website is continuously updated with new features, test cases, and quality improvements."
                    : "Selamat datang di portofolio Haikal Al Ghifari. Website ini sedang dalam tahap pengembangan & penyempurnaan fitur secara berkelanjutan."}
                </p>
              </div>

              {/* Status Checklist Box */}
              <div className="w-full p-3 bg-white dark:bg-[#0E1217] border-2 border-black dark:border-white shadow-retro-xs text-left space-y-1.5 font-mono text-[11px]">
                <div className="flex items-center gap-2 text-zinc-800 dark:text-zinc-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-yellow-400 shrink-0" />
                  <span className="font-semibold">{isEn ? "Full portfolio scenes active" : "Semua scene portofolio aktif"}</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-800 dark:text-zinc-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-yellow-400 shrink-0" />
                  <span className="font-semibold">{isEn ? "Brokal AI & Live chat online" : "Brokal AI & Live chat online"}</span>
                </div>
              </div>

              {/* Action Button: Lanjutkan */}
              <div className="w-full pt-1">
                <button
                  onClick={handleDismiss}
                  className="w-full py-3 sm:py-3.5 px-6 bg-[#FACC15] hover:bg-yellow-300 text-black font-pixel text-xs sm:text-sm font-black uppercase tracking-wider border-2 border-black dark:border-white shadow-retro btn-retro flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <span>{isEn ? "PRESS START // CONTINUE" : "MULAI JELAJAHI // LANJUTKAN"}</span>
                  <ArrowRight className="w-4 h-4 stroke-[3]" />
                </button>
              </div>

              {/* Footer Note */}
              <p className="font-pixel text-[10px] text-zinc-600 dark:text-zinc-400 uppercase tracking-wider pt-0.5">
                HAIKAL AL GHIFARI // PORTFOLIO 2026
              </p>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
