"use client";

import Link from "next/link";
import { MapPin, Phone, Mail, ArrowRight, X } from "lucide-react";
import { useSafeLang } from "@/store/lang";
import { useEffect, useState, useCallback } from "react";

// â”€â”€â”€ Legal Modal â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function LegalModal({
    isOpen,
    onClose,
    title,
    content,
    closeLabel,
}: {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    content: string;
    closeLabel: string;
}) {
    // Close on Escape key
    useEffect(() => {
        if (!isOpen) return;
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handler);
        return () => document.removeEventListener("keydown", handler);
    }, [isOpen, onClose]);

    // Prevent body scroll while open
    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [isOpen]);

    if (!isOpen) return null;

    // Format paragraphs: split by double newline or single newline
    const paragraphs = content.split(/\n+/).filter(Boolean);

    return (
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-label={title}
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal Card */}
            <div className="relative w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-zinc-800 flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="flex items-center justify-between px-8 py-6 border-b border-slate-100 dark:border-zinc-800 shrink-0">
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-500 mb-1">PT Rizky Rijaya Karya</p>
                        <h2 className="text-xl font-black text-slate-900 dark:text-white">{title}</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 rounded-full bg-slate-100 dark:bg-zinc-800 flex items-center justify-center text-slate-500 dark:text-zinc-400 hover:bg-slate-200 dark:hover:bg-zinc-700 hover:text-slate-800 dark:hover:text-white transition-all duration-200 shrink-0 ml-4"
                        aria-label={closeLabel}
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Scrollable Content */}
                <div className="overflow-y-auto px-8 py-6 flex-1">
                    <div className="space-y-4">
                        {paragraphs.map((para, i) => {
                            // First paragraph is likely the title/heading
                            const isHeading = i === 0 || /^[A-Z\u00C0-\u024F].*:/.test(para);
                            return isHeading && i === 0 ? (
                                <p key={i} className="text-base font-black text-slate-800 dark:text-white leading-relaxed">
                                    {para}
                                </p>
                            ) : (
                                <p key={i} className="text-sm text-slate-600 dark:text-zinc-400 leading-relaxed font-medium">
                                    {para}
                                </p>
                            );
                        })}
                    </div>
                </div>

                {/* Footer */}
                <div className="px-8 py-5 border-t border-slate-100 dark:border-zinc-800 shrink-0 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-6 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-bold hover:bg-orange-500 dark:hover:bg-orange-500 dark:hover:text-white transition-all duration-300"
                    >
                        {closeLabel}
                    </button>
                </div>
            </div>
        </div>
    );
}

// â”€â”€â”€ Footer â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export function FooterClient({ settings }: { settings: any }) {
    const { lang, t, mounted } = useSafeLang();
    const [legalModal, setLegalModal] = useState<"terms" | "privacy" | null>(null);

    const translate = (key: string, fallback: string) => {
        return t(key) || fallback;
    };

    const currentLang = lang;

    const scrollToTop = useCallback(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    const closeLegal = useCallback(() => setLegalModal(null), []);

    const defaultTerms = `Syarat dan Ketentuan Layanan PT Rizky Rijaya Karya\n\nDengan mengakses situs web PT Rizky Rijaya Karya, Anda dianggap telah membaca dan menyetujui syarat berikut.\n\nPenggunaan Informasi: Seluruh materi, logo, dan konten dalam situs web ini adalah milik sah PT Rizky Rijaya Karya. Penggunaan konten untuk tujuan komersial tanpa izin tertulis dilarang.\n\nBatasan Tanggung Jawab: Kami tidak bertanggung jawab atas kerugian yang timbul akibat penggunaan informasi tanpa konsultasi formal dengan perwakilan kami.\n\nHukum yang Berlaku: Syarat ini diatur oleh hukum Negara Kesatuan Republik Indonesia.`;

    const defaultTermsEn = `Terms and Conditions of PT Rizky Rijaya Karya\n\nBy accessing the PT Rizky Rijaya Karya website, you are deemed to have read and agreed to the following terms.\n\nUse of Information: All materials, logos, and content on this website are the rightful property of PT Rizky Rijaya Karya. Use of content for commercial purposes without written permission is prohibited.\n\nLimitation of Liability: We are not responsible for any losses arising from the use of information without formal consultation with our representatives.\n\nGoverning Law: These terms are governed by the laws of the Republic of Indonesia.`;

    const defaultPrivacy = `Kebijakan Privasi PT Rizky Rijaya Karya\n\nKami sangat menghargai privasi Anda. Kebijakan ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi Anda.\n\nData yang Dikumpulkan: Kami hanya mengumpulkan informasi yang Anda berikan secara sukarela seperti nama, email, dan nomor telepon.\n\nKontak: Pertanyaan mengenai privasi dapat dikirim ke rizkyrijayakarya@gmail.com.`;

    const defaultPrivacyEn = `Privacy Policy of PT Rizky Rijaya Karya\n\nWe greatly value your privacy. This policy explains how we collect, use, and protect your personal information.\n\nData Collected: We only collect information you voluntarily provide, such as your name, email address, and phone number.\n\nContact: Questions regarding privacy can be sent to rizkyrijayakarya@gmail.com.`;

    return (
        <>
            {/* Legal Modals */}
            <LegalModal
                isOpen={legalModal === "terms"}
                onClose={closeLegal}
                title={translate("legal.terms.title", "Syarat & Ketentuan")}
                content={
                    mounted && lang === "en"
                        ? settings?.termsTextEn || defaultTermsEn
                        : settings?.termsText || defaultTerms
                }
                closeLabel={translate("legal.close", "Tutup")}
            />
            <LegalModal
                isOpen={legalModal === "privacy"}
                onClose={closeLegal}
                title={translate("legal.privacy.title", "Kebijakan Privasi")}
                content={
                    mounted && lang === "en"
                        ? settings?.privacyTextEn || defaultPrivacyEn
                        : settings?.privacyText || defaultPrivacy
                }
                closeLabel={translate("legal.close", "Tutup")}
            />

            <footer className="bg-white dark:bg-[#040816] border-t border-slate-200 dark:border-white/5 relative overflow-hidden">
                {/* Subtle Top Gradient */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />

                <div className="container-original px-4 lg:px-8 mx-auto relative z-10">

                    {/* Main Footer Content */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pt-20 pb-16">

                        {/* Column 1: Brand & About */}
                        <div className="lg:col-span-4 space-y-8">
                            {/* Logo â€” klik untuk scroll ke atas */}
                            <button
                                onClick={scrollToTop}
                                className="flex items-center gap-3 group text-left"
                                aria-label="Kembali ke atas"
                            >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src="/logo.png"
                                    alt="PT Rizky Rijaya Karya"
                                    className="h-10 md:h-12 w-auto transition-transform group-hover:scale-105 bg-slate-50 dark:bg-white/5 p-1.5 rounded-xl border border-slate-200 dark:border-white/10 shadow-sm"
                                />
                                <div className="flex flex-col justify-center gap-0.5 transition-transform group-hover:translate-x-1 duration-500">
                                    <span className="text-sm font-black uppercase tracking-[0.25em] text-slate-900 dark:text-white leading-none">Rizky Rijaya</span>
                                    <span className="text-sm font-black uppercase tracking-[0.25em] text-orange-500 leading-none mt-1">Karya</span>
                                </div>
                            </button>

                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm font-medium">
                                {currentLang === "en"
                                    ? settings?.footerAboutEn || "Becoming a national scale company capable of serving public needs professionally based on Integrity, Customer Satisfaction, and Human Resources."
                                    : settings?.footerAbout || "Menjadi Perusahaan berskala Nasional yang mampu melayani Kebutuhan Publik secara professional yang bertumpu pada Nilai Integritas, Kepuasan pelanggan, dan SDM."}
                            </p>

                            {/* Social Links */}
                            <div className="flex flex-wrap gap-3 pt-2">
                                {settings?.instagram && (
                                    <a href={settings.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-orange-500 hover:text-white transition-all duration-300 group shadow-sm border border-slate-200 dark:border-white/5">
                                        <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                                        </svg>
                                    </a>
                                )}
                                {settings?.linkedin && (
                                    <a href={settings.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-10 h-10 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-orange-500 hover:text-white transition-all duration-300 group shadow-sm border border-slate-200 dark:border-white/5">
                                        <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                                        </svg>
                                    </a>
                                )}
                            </div>
                        </div>

                        {/* Column 2: Perusahaan */}
                        <div className="lg:col-span-2 lg:col-start-6">
                            <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest mb-6">{translate("footer.company", "Perusahaan")}</h4>
                            <ul className="space-y-3.5">
                                {[
                                    { name: translate("nav.home", "Beranda"), href: "/" },
                                    { name: translate("nav.about", "Tentang Kami"), href: "/#about" },
                                    { name: translate("nav.organization", "Organisasi"), href: "/#organization" },
                                    { name: translate("nav.divisions", "Divisi"), href: "/#divisions" },
                                    { name: translate("nav.projects", "Proyek"), href: "/#projects" },
                                ].map((item) => (
                                    <li key={item.name}>
                                        <Link href={item.href} className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-orange-500 transition-colors flex items-center group">
                                            <ArrowRight className="w-3 h-3 mr-2 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-orange-500" />
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Column 3: Layanan */}
                        <div className="lg:col-span-2">
                            <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest mb-6">{translate("footer.services", "Layanan")}</h4>
                            <ul className="space-y-3.5">
                                {(currentLang === "en"
                                    ? ["General Trading", "Training Services", "Leveransir", "Construction", "Business Consultant"]
                                    : ["Perdagangan Umum", "Jasa Kepelatihan", "Leveransir", "Konstruksi", "Konsultan Bisnis"]
                                ).map((item) => (
                                    <li key={item}>
                                        <span className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-orange-500 transition-colors flex items-center cursor-pointer group">
                                            <span className="w-1.5 h-1.5 rounded-full bg-orange-500/0 group-hover:bg-orange-500 mr-2 transition-colors duration-300" />
                                            {item}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Column 4: Kontak */}
                        <div className="lg:col-span-3">
                            <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest mb-6">{translate("footer.contact", "Hubungi Kami")}</h4>
                            <ul className="space-y-4">
                                {settings?.address && (
                                    <li className="flex items-start gap-4 group">
                                        <div className="w-10 h-10 rounded-lg bg-orange-50 dark:bg-orange-500/10 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-orange-500 transition-colors duration-300">
                                            <MapPin className="w-4 h-4 text-orange-600 dark:text-orange-400 group-hover:text-white transition-colors" />
                                        </div>
                                        <span className="text-sm font-medium text-slate-600 dark:text-slate-400 leading-relaxed pt-1">{settings.address}</span>
                                    </li>
                                )}
                                {settings?.phone && (
                                    <li className="flex items-start gap-4 group">
                                        <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-blue-500 transition-colors duration-300">
                                            <Phone className="w-4 h-4 text-blue-600 dark:text-blue-400 group-hover:text-white transition-colors" />
                                        </div>
                                        <a href={`tel:${settings.phone.replace(/[^0-9+]/g, "")}`} className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors pt-2.5">
                                            {settings.phone}
                                        </a>
                                    </li>
                                )}
                                {settings?.email && (
                                    <li className="flex items-start gap-4 group">
                                        <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-emerald-500 transition-colors duration-300">
                                            <Mail className="w-4 h-4 text-emerald-600 dark:text-emerald-400 group-hover:text-white transition-colors" />
                                        </div>
                                        <a href={`mailto:${settings.email}`} className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors break-all pt-2.5">
                                            {settings.email}
                                        </a>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>

                    {/* Bottom Footer */}
                    <div className="border-t border-slate-200 dark:border-white/10 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                            Â© {new Date().getFullYear()} <span className="text-slate-800 dark:text-white">PT Rizky Rijaya Karya</span>. {translate("footer.copyright", "Hak Cipta Dilindungi Undang-Undang.")}
                        </p>

                        <div className="flex items-center gap-6">
                            <button
                                onClick={() => setLegalModal("terms")}
                                className="text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
                            >
                                {translate("footer.terms", "Syarat & Ketentuan")}
                            </button>
                            <button
                                onClick={() => setLegalModal("privacy")}
                                className="text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
                            >
                                {translate("footer.privacy", "Kebijakan Privasi")}
                            </button>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}
