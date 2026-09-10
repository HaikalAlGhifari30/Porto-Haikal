"use client";

import { submitContactMessage } from "@/actions/contact";
import { useSafeLang } from "@/store/lang";
import { Mail, MapPin, Send, CheckCircle2, AlertCircle, MessageSquare } from "lucide-react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa6";
import { useState } from "react";
import { motion } from "framer-motion";

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
    <section className="w-full max-w-5xl mx-auto px-4 py-4 sm:py-6 flex flex-col justify-center items-center text-slate-900 dark:text-white my-auto">
      {/* Outer Adaptive Glass Card */}
      <div className="w-full rounded-[2.5rem] bg-white/40 dark:bg-slate-950/75 border border-white/70 dark:border-cyan-500/30 backdrop-blur-2xl p-6 sm:p-8 shadow-2xl shadow-blue-900/5 dark:shadow-cyan-950/40 relative overflow-hidden text-slate-900 dark:text-white">
        {/* Subtle Glows */}
        <div className="absolute -top-32 -left-32 w-72 h-72 bg-blue-600/15 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-72 h-72 bg-cyan-500/15 rounded-full blur-[100px] pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative z-10">
          
          {/* Left Column - Closing Scene Title & Info */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-[11px] font-extrabold text-blue-700 dark:text-cyan-400 uppercase tracking-widest">
                {t('contact.scene', 'PENUTUP')}
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.08] text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-blue-700 to-cyan-600 dark:from-white dark:via-cyan-100 dark:to-cyan-300 uppercase">
                {t('contact.letsWorkTogether', 'MARI BEKERJA SAMA')}
              </h2>

              <p className="text-slate-800 dark:text-zinc-400 text-xs sm:text-sm leading-relaxed font-medium">
                {t('section.contact.desc', 'Punya proyek, pengujian QA, atau peluang kolaborasi dalam pikiran Anda?')}
              </p>

              {/* Direct Contact Cards */}
              <div className="space-y-3 pt-2">
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/50 dark:bg-slate-900/80 border border-white/80 dark:border-zinc-800 hover:border-blue-500/40 dark:hover:border-cyan-500/40 transition-all group shadow-2xs backdrop-blur-xs"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-blue-600/30 group-hover:scale-105 transition-transform">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-[10px] text-slate-600 dark:text-zinc-400 font-bold">Email</p>
                    <p className="text-xs sm:text-sm font-bold text-slate-950 dark:text-white truncate">{email}</p>
                  </div>
                </a>

                <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/50 dark:bg-slate-900/80 border border-white/80 dark:border-zinc-800 shadow-2xs backdrop-blur-xs">
                  <div className="w-10 h-10 rounded-xl bg-cyan-600 dark:bg-cyan-500 text-white flex items-center justify-center shrink-0 shadow-lg shadow-cyan-500/30">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-[10px] text-slate-600 dark:text-zinc-400 font-bold">{t('contact.location')}</p>
                    <p className="text-xs sm:text-sm font-bold text-slate-950 dark:text-white truncate">{location}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com/HaikalAlGhifari30"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="w-10 h-10 rounded-xl bg-white/60 dark:bg-slate-900 border border-white/80 dark:border-zinc-800 text-slate-800 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-cyan-400 hover:border-cyan-500/50 flex items-center justify-center transition-all group shadow-2xs backdrop-blur-xs"
              >
                <FaGithub className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>

              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="w-10 h-10 rounded-xl bg-white/60 dark:bg-slate-900 border border-white/80 dark:border-zinc-800 text-slate-800 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-cyan-400 hover:border-cyan-500/50 flex items-center justify-center transition-all group shadow-2xs backdrop-blur-xs"
              >
                <FaLinkedin className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>

              <a
                href={instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Profile"
                className="w-10 h-10 rounded-xl bg-white/60 dark:bg-slate-900 border border-white/80 dark:border-zinc-800 text-slate-800 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-cyan-400 hover:border-cyan-500/50 flex items-center justify-center transition-all group shadow-2xs backdrop-blur-xs"
              >
                <FaInstagram className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label htmlFor="name" className="block text-xs font-bold text-slate-800 dark:text-zinc-300 mb-1">
                  {t('contact.labelName')}
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder={t('contact.placeholderName')}
                  className="w-full h-11 px-4 rounded-xl bg-white/55 dark:bg-slate-900/90 border border-white/80 dark:border-zinc-800 focus:border-blue-600 dark:focus:border-cyan-500 text-xs font-semibold text-slate-950 dark:text-white placeholder:text-slate-500 dark:placeholder:text-zinc-500 transition-all outline-none backdrop-blur-xs"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-bold text-slate-800 dark:text-zinc-300 mb-1">
                  {t('contact.labelEmail')}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder={t('contact.placeholderEmail')}
                  className="w-full h-11 px-4 rounded-xl bg-white/55 dark:bg-slate-900/90 border border-white/80 dark:border-zinc-800 focus:border-blue-600 dark:focus:border-cyan-500 text-xs font-semibold text-slate-950 dark:text-white placeholder:text-slate-500 dark:placeholder:text-zinc-500 transition-all outline-none backdrop-blur-xs"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-bold text-slate-800 dark:text-zinc-300 mb-1">
                  {t('contact.labelMessage')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={3}
                  placeholder={t('contact.placeholderMessage')}
                  className="w-full p-3.5 rounded-xl bg-white/55 dark:bg-slate-900/90 border border-white/80 dark:border-zinc-800 focus:border-blue-600 dark:focus:border-cyan-500 text-xs font-semibold text-slate-950 dark:text-white placeholder:text-slate-500 dark:placeholder:text-zinc-500 transition-all outline-none resize-none backdrop-blur-xs"
                />
              </div>

              {status === "success" && (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{t('contact.success')}</span>
                </div>
              )}

              {status === "error" && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs font-semibold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isPending}
                className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-500/25 hover:shadow-cyan-500/40 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 active:scale-[0.99] cursor-pointer"
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
