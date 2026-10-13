"use client";

import { submitContactMessage } from "@/actions/contact";
import { useSafeLang } from "@/store/lang";
import { Mail, MapPin, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa6";
import { useState } from "react";

interface ContactSectionProps {
  settings?: any;
}

export function ContactSection({ settings }: ContactSectionProps) {
  const { t } = useSafeLang();
  const [isPending, setIsPending] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const email = settings?.email || "alghifaribahren03@gmail.com";
  const linkedin = settings?.linkedin || "https://www.linkedin.com/in/haikalalghifari";
  const instagram = settings?.instagram || "https://www.instagram.com/alghfri_bhren/";
  const location = settings?.address || t('contact.locationVal');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    setStatus("idle");
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    try {
      await submitContactMessage(formData);
      setStatus("success");
      (e.target as HTMLFormElement).reset();
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err.message || t("contact.error"));
    } finally {
      setIsPending(false);
    }
  };

  return (
    <section className="w-full max-w-6xl xl:max-w-7xl mx-auto px-2 sm:px-4 py-3 sm:py-6 flex flex-col justify-center items-center text-slate-900 dark:text-white my-auto">
      {/* Outer 8-Bit Box */}
      <div className="w-full bg-white dark:bg-[#151B22] border-3 border-black dark:border-white shadow-retro-lg p-4 sm:p-8 lg:p-10 relative text-slate-900 dark:text-white">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 lg:gap-10 items-stretch relative z-10">
          
          {/* Left Column - Closing Scene Title & Info */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4 sm:space-y-6">
            <div className="space-y-2.5 sm:space-y-3.5">
              <div className="inline-block px-3 py-1 bg-[#FACC15] border-2 border-black dark:border-white shadow-retro-xs text-black font-pixel text-[11px] sm:text-xs uppercase font-bold tracking-wider">
                STAGE CLEAR // MULTIPLAYER CO-OP
              </div>

              <h2 className="text-xl min-[400px]:text-2xl sm:text-4xl font-pixel font-bold tracking-tight text-black dark:text-white uppercase leading-snug">
                {t('contact.letsWorkTogether', 'MARI BEKERJA SAMA')}
              </h2>

              <p className="font-sans text-xs sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed font-medium">
                {t('section.contact.desc', 'Punya proyek, pengujian QA, atau peluang kolaborasi dalam pikiran Anda?')}
              </p>

              {/* Direct Contact Cards */}
              <div className="space-y-2.5 sm:space-y-3.5 pt-1 sm:pt-2">
                <a
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}&su=${encodeURIComponent("Portfolio Inquiry")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 sm:gap-4 p-2.5 sm:p-3.5 bg-[#FAF6ED] dark:bg-[#0E1217] border-2 border-black dark:border-white shadow-retro-xs hover:bg-[#FACC15] group transition-all"
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-black text-[#FACC15] border-2 border-black dark:border-white flex items-center justify-center shrink-0 shadow-retro-xs">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="font-pixel text-[9px] sm:text-[10px] text-zinc-600 dark:text-zinc-400 group-hover:text-black uppercase">Email</p>
                    <p className="font-sans text-xs sm:text-sm font-bold text-black dark:text-white group-hover:text-black truncate">{email}</p>
                  </div>
                </a>

                <div className="flex items-center gap-3 sm:gap-4 p-2.5 sm:p-3.5 bg-[#FAF6ED] dark:bg-[#0E1217] border-2 border-black dark:border-white shadow-retro-xs">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-[#FACC15] text-black border-2 border-black dark:border-white flex items-center justify-center shrink-0 shadow-retro-xs">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="font-pixel text-[9px] sm:text-[10px] text-zinc-600 dark:text-zinc-400 uppercase">{t('contact.location')}</p>
                    <p className="font-sans text-xs sm:text-sm font-bold text-black dark:text-white truncate">{location}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-2.5 sm:gap-3.5 pt-1">
              <a
                href="https://github.com/HaikalAlGhifari30"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="w-9 h-9 sm:w-10 sm:h-10 border-2 border-black dark:border-white bg-white dark:bg-[#0E1217] text-black dark:text-white shadow-retro-xs btn-retro flex items-center justify-center hover:bg-yellow-100"
              >
                <FaGithub className="w-4 h-4" />
              </a>

              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="w-9 h-9 sm:w-10 sm:h-10 border-2 border-black dark:border-white bg-white dark:bg-[#0E1217] text-black dark:text-white shadow-retro-xs btn-retro flex items-center justify-center hover:bg-yellow-100"
              >
                <FaLinkedin className="w-4 h-4" />
              </a>

              <a
                href={instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Profile"
                className="w-9 h-9 sm:w-10 sm:h-10 border-2 border-black dark:border-white bg-white dark:bg-[#0E1217] text-black dark:text-white shadow-retro-xs btn-retro flex items-center justify-center hover:bg-yellow-100"
              >
                <FaInstagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              <div>
                <label htmlFor="name" className="block font-pixel text-[11px] sm:text-xs uppercase font-bold text-black dark:text-white mb-1">
                  {t('contact.labelName')}
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder={t('contact.placeholderName')}
                  className="w-full h-10 sm:h-11 px-3 sm:px-3.5 border-2 border-black dark:border-white bg-[#FAF6ED] dark:bg-[#0E1217] text-black dark:text-white font-sans text-xs sm:text-sm font-semibold placeholder:text-zinc-500 shadow-retro-xs outline-none focus:bg-white dark:focus:bg-[#151B22]"
                />
              </div>

              <div>
                <label htmlFor="email" className="block font-pixel text-[11px] sm:text-xs uppercase font-bold text-black dark:text-white mb-1">
                  {t('contact.labelEmail')}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder={t('contact.placeholderEmail')}
                  className="w-full h-10 sm:h-11 px-3 sm:px-3.5 border-2 border-black dark:border-white bg-[#FAF6ED] dark:bg-[#0E1217] text-black dark:text-white font-sans text-xs sm:text-sm font-semibold placeholder:text-zinc-500 shadow-retro-xs outline-none focus:bg-white dark:focus:bg-[#151B22]"
                />
              </div>

              <div>
                <label htmlFor="message" className="block font-pixel text-[11px] sm:text-xs uppercase font-bold text-black dark:text-white mb-1">
                  {t('contact.labelMessage')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={3}
                  placeholder={t('contact.placeholderMessage')}
                  className="w-full p-2.5 sm:p-3.5 border-2 border-black dark:border-white bg-[#FAF6ED] dark:bg-[#0E1217] text-black dark:text-white font-sans text-xs sm:text-sm font-medium placeholder:text-zinc-500 shadow-retro-xs outline-none resize-none focus:bg-white dark:focus:bg-[#151B22]"
                />
              </div>

              {status === "success" && (
                <div className="p-3 border-2 border-green-600 bg-green-100 text-green-900 font-sans text-xs sm:text-sm font-bold flex items-center gap-2 shadow-retro-xs">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 text-green-600" />
                  <span>{t('contact.success')}</span>
                </div>
              )}

              {status === "error" && (
                <div className="p-3 border-2 border-red-600 bg-red-100 text-red-900 font-sans text-xs sm:text-sm font-bold flex items-center gap-2 shadow-retro-xs">
                  <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 text-red-600" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isPending}
                className="w-full py-3 sm:py-3.5 px-6 border-2 border-black dark:border-white bg-[#FACC15] hover:bg-yellow-300 text-black font-pixel text-xs sm:text-sm font-bold uppercase shadow-retro btn-retro transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>{isPending ? t('contact.sending') : t('contact.send')}</span>
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
