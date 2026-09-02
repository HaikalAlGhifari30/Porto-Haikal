"use client";

import { submitContactMessage } from "@/actions/contact";
import { useSafeLang } from "@/store/lang";
import { Mail, MapPin, Send, CheckCircle2, AlertCircle, MessageSquare } from "lucide-react";
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
    <section id="contact" className="py-20 lg:py-28 relative overflow-hidden bg-transparent text-white transition-colors duration-500">
      {/* Radial Background Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-blue-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="container-original relative z-10 mx-auto px-4 max-w-5xl">
        {/* Section Header */}
        <div className="max-w-2xl space-y-3 mb-12 text-center mx-auto">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-blue-900 to-cyan-800 dark:from-white dark:via-cyan-200 dark:to-cyan-400 bg-clip-text text-transparent pb-1 pt-1 leading-snug">
            {t('contact.getInTouch')}
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-xs md:text-sm leading-relaxed max-w-xl mx-auto font-medium">
            {t('section.contact.desc')}
          </p>
        </div>

        {/* Outer Adaptive Glass Card */}
        <div className="rounded-[2.5rem] bg-white/90 dark:bg-[#070e20]/90 border border-slate-200/90 dark:border-cyan-500/20 backdrop-blur-2xl p-6 sm:p-10 shadow-xl dark:shadow-2xl shadow-cyan-950/20 relative overflow-hidden text-zinc-900 dark:text-white transition-colors duration-500">
          {/* Subtle Ambient Glows Inside Card */}
          <div className="absolute -top-32 -left-32 w-72 h-72 bg-blue-600/10 dark:bg-blue-600/15 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 w-72 h-72 bg-cyan-500/10 dark:bg-cyan-500/15 rounded-full blur-[100px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch relative z-10">
            
            {/* Left Column - Contact Details */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white tracking-tight mb-3">
                  {t('contact.letsWorkTogether')}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-8">
                  {t('contact.workDesc')}
                </p>

                {/* Direct Contact Info Cards */}
                <div className="space-y-4">
                  {/* Email Box */}
                  <a
                    href={`mailto:${email}`}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-[#0f1938]/80 border border-slate-200 dark:border-blue-500/15 hover:border-cyan-500/40 hover:bg-slate-100 dark:hover:bg-[#13214a] transition-all group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-blue-600/30 group-hover:scale-105 transition-transform">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Email</p>
                      <p className="text-xs sm:text-sm font-semibold text-zinc-900 dark:text-white truncate">{email}</p>
                    </div>
                  </a>

                  {/* Location Box */}
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-[#0f1938]/80 border border-slate-200 dark:border-blue-500/15 hover:border-cyan-500/40 transition-all group">
                    <div className="w-12 h-12 rounded-xl bg-cyan-500 text-white flex items-center justify-center shrink-0 shadow-lg shadow-cyan-500/30 group-hover:scale-105 transition-transform">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">{t('contact.location')}</p>
                      <p className="text-xs sm:text-sm font-semibold text-zinc-900 dark:text-white truncate">{location}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-3 pt-4">
                <a
                  href="https://github.com/HaikalAlGhifari30"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-[#0f1938]/80 border border-slate-200 dark:border-blue-500/20 text-zinc-700 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-white hover:border-cyan-500/50 hover:bg-cyan-50 dark:hover:bg-cyan-600/20 flex items-center justify-center transition-all group"
                >
                  <FaGithub className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>

                <a
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-[#0f1938]/80 border border-slate-200 dark:border-blue-500/20 text-zinc-700 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-white hover:border-cyan-500/50 hover:bg-cyan-50 dark:hover:bg-cyan-600/20 flex items-center justify-center transition-all group"
                >
                  <FaLinkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>

                <a
                  href={instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram Profile"
                  className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-[#0f1938]/80 border border-slate-200 dark:border-blue-500/20 text-zinc-700 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-white hover:border-cyan-500/50 hover:bg-cyan-50 dark:hover:bg-cyan-600/20 flex items-center justify-center transition-all group"
                >
                  <FaInstagram className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className="lg:col-span-7">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name Input */}
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                    {t('contact.labelName')}
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder={t('contact.placeholderName')}
                    className="w-full h-12 px-4 rounded-xl bg-slate-50 dark:bg-[#0f1938]/90 border border-slate-300 dark:border-blue-500/20 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/40 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500 transition-all outline-none"
                  />
                </div>

                {/* Email Input */}
                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                    {t('contact.labelEmail')}
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder={t('contact.placeholderEmail')}
                    className="w-full h-12 px-4 rounded-xl bg-slate-50 dark:bg-[#0f1938]/90 border border-slate-300 dark:border-blue-500/20 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/40 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500 transition-all outline-none"
                  />
                </div>

                {/* Message Textarea */}
                <div>
                  <label htmlFor="message" className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                    {t('contact.labelMessage')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    placeholder={t('contact.placeholderMessage')}
                    className="w-full p-4 rounded-xl bg-slate-50 dark:bg-[#0f1938]/90 border border-slate-300 dark:border-blue-500/20 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/40 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500 transition-all outline-none resize-none"
                  />
                </div>

                {/* Status Messages */}
                {status === "success" && (
                  <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>{t('contact.success')}</span>
                  </div>
                )}

                {status === "error" && (
                  <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold text-sm shadow-lg shadow-blue-500/30 hover:shadow-cyan-500/50 transition-all duration-300 flex items-center justify-center gap-2.5 disabled:opacity-50 active:scale-[0.99] cursor-pointer mt-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{isPending ? t('contact.sending') : t('contact.send')}</span>
                </button>
              </form>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

