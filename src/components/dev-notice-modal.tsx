"use client";

import { useState, useEffect } from "react";
import { useSafeLang } from "@/store/lang";
import { Sparkles, ArrowRight, Wrench, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function DevNoticeModal() {
  const { lang } = useSafeLang();
  const isEn = lang === "en";
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if user has already dismissed the notice in this session
    const hasSeen = sessionStorage.getItem("hasSeenDevNotice");
    if (!hasSeen) {
      setIsOpen(true);
    }
  }, []);

  const handleDismiss = () => {
    sessionStorage.setItem("hasSeenDevNotice", "true");
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-2xl"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md rounded-3xl bg-white/95 dark:bg-[#070e20]/95 border border-slate-200 dark:border-cyan-500/30 p-6 sm:p-8 backdrop-blur-2xl shadow-[0_0_60px_rgba(34,211,238,0.25)] text-center space-y-6 overflow-hidden"
          >
            {/* Background Ambient Glow */}
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

            {/* Header Icon */}
            <div className="relative mx-auto w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500/20 via-blue-500/20 to-indigo-500/20 border border-cyan-500/30 flex items-center justify-center shadow-lg">
              <Wrench className="w-8 h-8 text-cyan-500 dark:text-cyan-400 animate-pulse" />
              <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-cyan-500" />
              </span>
            </div>

            {/* Title & Description */}
            <div className="space-y-2 relative z-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-500 dark:text-cyan-400 text-[11px] font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isEn ? "System Notice" : "Informasi Website"}</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white tracking-tight leading-snug">
                {isEn ? "Website Under Implementation" : "Website Masih Dalam Tahap Implementasi"}
              </h2>

              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-normal pt-1">
                {isEn
                  ? "Welcome to Haikal Al Ghifari's portfolio. This website is currently undergoing continuous feature optimization & active implementation."
                  : "Selamat datang di portofolio Haikal Al Ghifari. Website ini sedang dalam tahap pengembangan & penyempurnaan fitur secara berkala."}
              </p>
            </div>

            {/* Action Button: Lanjutkan */}
            <div className="pt-2 relative z-10">
              <button
                onClick={handleDismiss}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-sm tracking-wide shadow-lg shadow-blue-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>{isEn ? "Continue to Website" : "Lanjutkan ke Website"}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Footer Subtext */}
            <div className="pt-1 text-[11px] text-zinc-400 dark:text-zinc-500 font-medium flex items-center justify-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500" />
              <span>Haikal Al Ghifari — Portfolio 2026</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
