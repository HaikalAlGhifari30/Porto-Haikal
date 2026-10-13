"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowUp, X } from "lucide-react";
import { PixelWhatsAppIcon } from "@/components/ui/pixel-whatsapp-icon";
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
      {/* Fullscreen Backdrop Overlay for WhatsApp Chat Popup (Mobile Only) */}
      {isChatOpen && (
        <div
          data-no-scene-scroll="true"
          onClick={() => setIsChatOpen(false)}
          onWheel={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
          className="fixed inset-0 bg-black/70 backdrop-blur-xs z-30 animate-in fade-in duration-200 pointer-events-auto sm:hidden"
        />
      )}

      {/* 1. Floating WhatsApp Trigger Button Container */}
      <div className="fixed bottom-[4.25rem] right-3.5 sm:right-6 sm:bottom-[5.5rem] z-40 flex flex-col items-end pointer-events-auto" ref={chatRef}>

        {/* WhatsApp Chat Popup Box (8-Bit Retro Dialog Box Theme) */}
        {isChatOpen && (
          <div className="w-[calc(100vw-2.5rem)] max-w-[290px] sm:w-76 bg-[#FAF6ED] dark:bg-[#151B22] text-black dark:text-white border-3 border-black dark:border-white shadow-retro-lg p-4 animate-in fade-in zoom-in-95 duration-200 relative flex flex-col items-center justify-between mb-2">

            {/* Top Bar with Close Button */}
            <div className="w-full flex items-center justify-between pb-2 mb-2 border-b-2 border-black dark:border-white">
              <span className="font-pixel text-[9px] font-bold text-black dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 bg-[#25D366] inline-block border border-black" />
                COMM LINK // WA
              </span>
              <button
                onClick={() => setIsChatOpen(false)}
                className="p-1 border-2 border-black dark:border-white bg-white dark:bg-[#0E1217] hover:bg-red-200 text-black dark:text-white shadow-retro-xs btn-retro transition-colors cursor-pointer"
                aria-label="Close Chat Popup"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Header Title */}
            <div className="text-center w-full space-y-1 mb-2">
              <span className="font-pixel text-[8px] text-zinc-600 dark:text-zinc-400 uppercase tracking-widest block">
                {isEn ? "CO-OP DIRECT CONTACT" : "HUBUNGI LANGSUNG"}
              </span>
              <h3 className="font-pixel text-sm sm:text-base font-black text-black dark:text-white tracking-tight text-center uppercase">
                {adminName}
              </h3>
            </div>

            {/* Center Portrait Container */}
            <div className="relative w-44 h-48 my-2 border-2 border-black dark:border-white bg-[#FAF6ED] dark:bg-[#0E1217] overflow-hidden shadow-retro-xs flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/chat-avatar-illustration.jpg"
                alt={adminName}
                className="w-full h-full object-cover object-top"
              />
            </div>

            {/* Bottom Button ("Mulai Chat!") */}
            <button
              onClick={handleStartChat}
              className="w-full py-2.5 px-4 bg-[#25D366] hover:bg-[#20bd5a] text-white font-pixel text-xs font-black uppercase border-2 border-black dark:border-white shadow-retro-sm btn-retro transition-all flex items-center justify-center gap-2 cursor-pointer mt-1"
            >
              <PixelWhatsAppIcon className="w-4 h-4 text-white" />
              <span>{isEn ? "LET'S CHAT!" : "MULAI CHAT!"}</span>
            </button>

          </div>
        )}

        {/* Floating WhatsApp Trigger Button */}
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className={cn(
            "w-10 h-10 sm:w-12 sm:h-12 border-2 sm:border-3 border-black dark:border-white shadow-retro btn-retro flex items-center justify-center relative group cursor-pointer transition-transform",
            isChatOpen
              ? "bg-black text-white"
              : "bg-[#25D366] text-white hover:bg-[#20bd5a]"
          )}
          aria-label="Chat via WhatsApp"
          title={isEn ? "Chat via WhatsApp" : "Hubungi via WhatsApp"}
        >
          {isChatOpen ? (
            <X className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
          ) : (
            <PixelWhatsAppIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          )}

          {/* Hover Tooltip Label */}
          {!isChatOpen && (
            <span className="absolute right-full mr-2.5 sm:mr-3 px-2 py-1 bg-white dark:bg-[#0E1217] border-2 border-black dark:border-white text-black dark:text-white font-pixel text-[9px] uppercase font-bold shadow-retro-xs opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none whitespace-nowrap">
              WHATSAPP
            </span>
          )}
        </button>

      </div>

      {/* 2. Floating Back-to-Top Button (8-Bit Retro) */}
      <div className="fixed bottom-[7.5rem] right-3.5 sm:right-6 sm:bottom-[9.75rem] z-40 flex flex-col items-end pointer-events-auto">
        <button
          onClick={scrollToTop}
          className={cn(
            "w-8 h-8 sm:w-10 sm:h-10 border-2 border-black dark:border-white bg-[#FACC15] hover:bg-yellow-300 text-black shadow-retro-xs btn-retro transition-all flex items-center justify-center cursor-pointer",
            showTopBtn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
          )}
          aria-label="Back to Top"
          title={isEn ? "Back to Top" : "Kembali ke Atas"}
        >
          <ArrowUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[3]" />
        </button>
      </div>
    </>
  );
}


