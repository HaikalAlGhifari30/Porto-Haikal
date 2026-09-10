"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowUp, X } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { cn } from "@/lib/utils";
import { useSafeLang } from "@/store/lang";
import Image from "next/image";

interface WhatsAppAdmin {
  id: string;
  name: string;
  phone: string;
  message: string;
  isActive: boolean;
}

export function FloatingButtons({ admins = [] }: { admins?: WhatsAppAdmin[] }) {
  const { lang } = useSafeLang();
  const isEn = lang === "en";
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  const phone = "6281388058331";
  const activeAdmin = admins && admins.length > 0 && admins[0]?.isActive ? admins[0] : null;
  const adminName = activeAdmin?.name ? activeAdmin.name.split(" ")[0] : "Haikal";
  const defaultMsg = isEn
    ? "Halo Haikal, I'm interested in your portfolio!"
    : "Halo Haikal, saya tertarik dengan portofolio Anda!";
  const targetMsg = activeAdmin?.message || defaultMsg;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close chat popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (chatRef.current && !chatRef.current.contains(event.target as Node)) {
        setIsChatOpen(false);
      }
    };

    if (isChatOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isChatOpen]);

  // Prevent background scrolling on mobile when WhatsApp chat popup is open
  useEffect(() => {
    if (isChatOpen && window.innerWidth < 640) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isChatOpen]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleStartChat = () => {
    let targetPhone = phone;
    if (activeAdmin) {
      targetPhone = activeAdmin.phone.replace(/\D/g, "");
      if (targetPhone.startsWith("0")) {
        targetPhone = "62" + targetPhone.slice(1);
      }
    }

    const text = encodeURIComponent(targetMsg);
    window.open(`https://wa.me/${targetPhone}?text=${text}`, "_blank");
    setIsChatOpen(false);
  };

  return (
    <>
      {/* Fullscreen Blurred Backdrop Overlay for WhatsApp Chat Popup (Mobile Only) */}
      {isChatOpen && (
        <div
          data-no-scene-scroll="true"
          onClick={() => setIsChatOpen(false)}
          onWheel={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-30 animate-in fade-in duration-300 pointer-events-auto sm:hidden"
        />
      )}

      {/* 1. Floating WhatsApp Trigger Button Container (Mobile: Left above Brokal AI | Desktop: Right stacked above Brokal AI) */}
      <div className="fixed bottom-[4.75rem] left-4 sm:left-auto sm:right-6 sm:bottom-[5.5rem] z-40 flex flex-col items-start sm:items-end pointer-events-auto" ref={chatRef}>

        {/* WhatsApp Chat Popup Box (Frosted Glassmorphism Theme) */}
        {isChatOpen && (
          <div className="w-[calc(100vw-2.5rem)] max-w-[280px] sm:w-72 bg-white/40 dark:bg-slate-950/85 text-slate-900 dark:text-white border border-white/70 dark:border-cyan-500/30 backdrop-blur-2xl rounded-[2.2rem] p-4 sm:p-5 shadow-2xl shadow-blue-900/10 dark:shadow-cyan-950/50 animate-in fade-in slide-in-from-bottom-5 duration-300 relative flex flex-col items-center justify-between mb-3 sm:mb-2">

            {/* Close Button */}
            <button
              onClick={() => setIsChatOpen(false)}
              className="absolute top-3.5 right-3.5 p-1.5 rounded-full bg-white/60 dark:bg-slate-900/80 border border-white/80 dark:border-zinc-800 text-slate-800 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors cursor-pointer z-20 backdrop-blur-xs shadow-2xs"
              aria-label="Close Chat Popup"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header Title */}
            <div className="text-center pt-1 w-full space-y-0.5">
              <span className="text-[11px] font-black text-blue-700 dark:text-cyan-400 uppercase tracking-widest block">
                {isEn ? "Chat with" : "Chat bersama"}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white tracking-tight text-center">
                {adminName}
              </h3>
            </div>

            {/* Center Portrait Container */}
            <div className="relative w-48 h-52 my-3 rounded-2xl overflow-hidden border border-white/80 dark:border-zinc-800 bg-white/50 dark:bg-slate-900/70 flex items-center justify-center shadow-2xs backdrop-blur-xs">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/chat-avatar-illustration.jpg"
                alt={adminName}
                className="w-full h-full object-cover object-top rounded-xl"
              />
            </div>

            {/* Bottom Gradient Pill Button ("Let's Chat!") */}
            <button
              onClick={handleStartChat}
              className="w-full py-2.5 px-6 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-500 hover:from-blue-500 hover:to-cyan-400 text-white font-extrabold text-xs uppercase tracking-wider rounded-full shadow-lg shadow-blue-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer mt-1"
            >
              <FaWhatsapp className="w-4 h-4 text-white" />
              <span>{isEn ? "Let's Chat!" : "Mulai Chat!"}</span>
            </button>

          </div>
        )}

        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className={cn(
            "w-11 h-11 sm:w-13 sm:h-13 text-white rounded-full shadow-lg transition-all duration-300 flex items-center justify-center relative group cursor-pointer",
            isChatOpen
              ? "bg-zinc-900 dark:bg-zinc-800 text-white shadow-zinc-900/40 border-2 border-zinc-900"
              : "bg-[#25D366] hover:bg-[#20bd5a] shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-110 active:scale-95"
          )}
          aria-label="Chat via WhatsApp"
          title={isEn ? "Chat via WhatsApp" : "Hubungi via WhatsApp"}
        >
          {!isChatOpen && (
            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30 pointer-events-none" />
          )}

          {isChatOpen ? (
            <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          ) : (
            <FaWhatsapp className="w-5 h-5 sm:w-6 sm:h-6 text-white relative z-10" />
          )}

          {/* Hover Tooltip Pill (Mobile: Points Right | Desktop: Points Left) */}
          {!isChatOpen && (
            <span className="absolute left-full ml-3 sm:left-auto sm:right-full sm:ml-0 sm:mr-3 px-3 py-1.5 bg-slate-900/95 dark:bg-[#070e20]/95 border border-slate-700 dark:border-cyan-500/30 text-white text-xs font-semibold rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-xl">
              {isEn ? "Chat WhatsApp" : "Hubungi WhatsApp"}
            </span>
          )}
        </button>

      </div>

      {/* 2. Floating Back-to-Top Button (Mobile: Right bottom | Desktop: Right stacked above WA) */}
      <div className="fixed bottom-4 right-4 sm:bottom-[9.75rem] sm:right-6 z-40 flex flex-col items-end pointer-events-auto">
        <button
          onClick={scrollToTop}
          className={cn(
            "w-11 h-11 sm:w-12 sm:h-12 bg-slate-900/90 dark:bg-[#070e20]/90 hover:bg-cyan-500 dark:hover:bg-cyan-500 text-white border border-slate-300 dark:border-cyan-500/30 hover:border-cyan-400 rounded-full shadow-xl hover:shadow-cyan-500/30 hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center cursor-pointer group",
            showTopBtn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
          )}
          aria-label="Back to Top"
          title={isEn ? "Back to Top" : "Kembali ke Atas"}
        >
          <ArrowUp className="w-5 h-5 text-zinc-300 group-hover:text-white transition-colors" />
        </button>
      </div>
    </>
  );
}


