"use client";

import { useState, useEffect } from "react";
import { ArrowUp, MessageCircle } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { cn } from "@/lib/utils";
import { useSafeLang } from "@/store/lang";

interface WhatsAppAdmin {
  id: string;
  name: string;
  phone: string;
  message: string;
  isActive: boolean;
}

export function FloatingButtons({ admins = [] }: { admins?: WhatsAppAdmin[] }) {
  const { lang, t } = useSafeLang();
  const isEn = lang === "en";
  const [showTopBtn, setShowTopBtn] = useState(false);

  const phone = "6281388058331";
  const defaultMsg = isEn
    ? "Halo Haikal, I'm interested in your portfolio!"
    : "Halo Haikal, saya tertarik dengan portofolio Anda!";

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

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleWhatsAppClick = () => {
    let targetPhone = phone;
    let targetMsg = defaultMsg;

    if (admins && admins.length > 0 && admins[0]?.isActive) {
      targetPhone = admins[0].phone.replace(/\D/g, "");
      if (targetPhone.startsWith("0")) {
        targetPhone = "62" + targetPhone.slice(1);
      }
      if (admins[0].message) {
        targetMsg = admins[0].message;
      }
    }

    const text = encodeURIComponent(targetMsg);
    window.open(`https://wa.me/${targetPhone}?text=${text}`, "_blank");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 pointer-events-auto">
      {/* 1. Floating WhatsApp Button (Compro RRK Style) */}
      <button
        onClick={handleWhatsAppClick}
        className="w-12 h-12 sm:w-13 sm:h-13 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center relative group cursor-pointer"
        aria-label="Chat via WhatsApp"
        title={isEn ? "Chat via WhatsApp" : "Hubungi via WhatsApp"}
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30 pointer-events-none" />
        <FaWhatsapp className="w-6 h-6 text-white relative z-10" />
        
        {/* Hover Tooltip Pill */}
        <span className="absolute right-full mr-3 px-3 py-1.5 bg-slate-900/95 dark:bg-[#070e20]/95 border border-slate-700 dark:border-cyan-500/30 text-white text-xs font-semibold rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-xl">
          {isEn ? "Chat WhatsApp" : "Hubungi WhatsApp"}
        </span>
      </button>

      {/* 2. Floating Back-to-Top Button (Compro RRK Style) */}
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
  );
}
