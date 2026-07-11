"use client";

import { useState, useCallback } from "react";
import { useSafeLang } from "@/store/lang";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";

interface BusinessSector {
    id: string;
    name: string;
    nameEn: string | null;
    description: string;
    descriptionEn: string | null;
    icon: string | null;
    imageUrl: string | null;
    order: number;
    isActive: boolean;
}

// ─── Single Flip Card ────────────────────────────────────────────────────────

function FlipCard({ sector, index, lang }: { sector: BusinessSector; index: number; lang: string }) {
    const [flipped, setFlipped] = useState(false);

    const name = lang === "en" ? sector.nameEn || sector.name : sector.name;
    const description =
        lang === "en" ? sector.descriptionEn || sector.description : sector.description;

    const toggleFlip = useCallback(() => setFlipped((f) => !f), []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            /* Fixed height so front & back can overlay via position:absolute */
            className={`flip-card h-64 cursor-pointer select-none${flipped ? " flipped" : ""}`}
            onClick={toggleFlip}
            onMouseLeave={() => setFlipped(false)}
            aria-label={`Bidang usaha: ${name}. Klik untuk melihat detail.`}
        >
            <div className="flip-card-inner rounded-3xl">

                {/* ── SISI DEPAN ── */}
                <div className="flip-card-front rounded-3xl bg-white dark:bg-zinc-900/70 border border-slate-200 dark:border-zinc-800 shadow-sm flex flex-col items-center justify-center gap-5 p-8 text-center">
                    {/* Icon / Image */}
                    <div className="w-20 h-20 rounded-2xl overflow-hidden bg-primary/10 flex items-center justify-center border border-primary/10 shadow-inner shrink-0">
                        {sector.imageUrl ? (
                            <img
                                src={sector.imageUrl}
                                alt={name}
                                className="w-full h-full object-cover"
                            />
                        ) : sector.icon && (Icons as any)[sector.icon] ? (
                            (() => {
                                const SelectedIcon = (Icons as any)[sector.icon];
                                return <SelectedIcon className="w-10 h-10 text-primary" />;
                            })()
                        ) : (
                            <span className="text-4xl font-black text-primary select-none">
                                {name.charAt(0)}
                            </span>
                        )}
                    </div>

                    {/* Title */}
                    <h4 className="text-lg font-black text-slate-900 dark:text-white leading-tight">
                        {name}
                    </h4>


                </div>

                {/* ── SISI BELAKANG ── */}
                <div className="flip-card-back rounded-3xl bg-gradient-to-br from-amber-50 via-orange-100 to-amber-100 dark:from-orange-950/80 dark:via-amber-900/60 dark:to-orange-950/80 border border-orange-200/60 dark:border-orange-800/30 flex flex-col items-center justify-center gap-4 p-8 text-center shadow-md">
                    {/* Small icon badge */}
                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-orange-200/60 dark:bg-orange-800/40 flex items-center justify-center shrink-0 border border-orange-300/40">
                        {sector.imageUrl ? (
                            <img
                                src={sector.imageUrl}
                                alt={name}
                                className="w-full h-full object-cover"
                            />
                        ) : sector.icon && (Icons as any)[sector.icon] ? (
                            (() => {
                                const SelectedIcon = (Icons as any)[sector.icon];
                                return <SelectedIcon className="w-6 h-6 text-orange-600 dark:text-orange-300" />;
                            })()
                        ) : (
                            <span className="text-2xl font-black text-orange-600 dark:text-orange-300 select-none">
                                {name.charAt(0)}
                            </span>
                        )}
                    </div>

                    <h4 className="text-base font-black text-orange-900 dark:text-orange-100 leading-tight">
                        {name}
                    </h4>

                    <p className="text-sm text-orange-800/80 dark:text-orange-200/80 leading-relaxed font-medium line-clamp-4">
                        {description}
                    </p>
                </div>

            </div>
        </motion.div>
    );
}

// ─── Section ─────────────────────────────────────────────────────────────────

export function BusinessSectorSectionClient({ sectors }: { sectors: BusinessSector[] }) {
    const { lang, t } = useSafeLang();

    return (
        <section
            id="business-sectors"
            className="py-24 md:py-32 relative overflow-hidden bg-gradient-to-b from-white via-orange-50/40 to-slate-50 dark:from-[#09090b] dark:via-orange-950/10 dark:to-[#09090b]"
        >
            {/* Decorative top border */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-orange-300/30 dark:via-orange-500/10 to-transparent" />

            {/* Warm orange radial glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-orange-400/[0.06] dark:bg-orange-500/[0.04] blur-[140px] rounded-full pointer-events-none" />

            <div className="container-original relative z-10">
                {/* ── Section Header (center-aligned, konsisten dengan Struktur Organisasi) ── */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-black text-slate-800 dark:text-white">
                        {t("section.sectors")}
                    </h2>
                    <p className="mt-4 text-zinc-500 dark:text-zinc-400 text-sm md:text-lg leading-relaxed font-medium max-w-2xl mx-auto">
                        {t("section.sectors.desc")}
                    </p>
                </div>

                {/* ── Flip Cards Grid ── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sectors.map((sector, index) => (
                        <FlipCard key={sector.id} sector={sector} index={index} lang={lang} />
                    ))}
                </div>
            </div>
        </section>
    );
}
