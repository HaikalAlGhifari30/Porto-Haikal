"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2, Building2, Target, Rocket } from "lucide-react";
import { useSafeLang } from "@/store/lang";
import { cn } from "@/lib/utils";

interface CoreValue {
    title: string;
    description: string;
}

interface AboutSectionClientProps {
    settings: any;
}

function FlipCardCoreValue({ cv, lang, index }: { cv: any; lang: string; index: number }) {
    const [flipped, setFlipped] = useState(false);
    const toggleFlip = useCallback(() => setFlipped((f) => !f), []);

    const title = lang === 'en' ? cv.titleEn || cv.title : cv.title;
    const description = lang === 'en' ? cv.descriptionEn || cv.description : cv.description;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className={`flip-card h-64 cursor-pointer select-none${flipped ? " flipped" : ""}`}
            onClick={toggleFlip}
            onMouseLeave={() => setFlipped(false)}
        >
            <div className="flip-card-inner rounded-3xl">
                {/* â”€â”€ SISI DEPAN â”€â”€ */}
                <div className="flip-card-front rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-sm flex flex-col items-center justify-center gap-4 p-8 text-center group hover:border-blue-500/50 transition-colors">
                    <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center text-2xl font-black group-hover:scale-110 transition-transform duration-300">
                        {title.charAt(0)}
                    </div>
                    <h4 className="text-xl font-black text-slate-800 dark:text-white leading-tight">
                        {title}
                    </h4>
                </div>

                {/* â”€â”€ SISI BELAKANG â”€â”€ */}
                <div className="flip-card-back rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 border border-blue-400 dark:border-blue-700 flex flex-col items-center justify-center gap-4 p-8 text-center shadow-lg text-white">
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-xl font-black shrink-0">
                        {title.charAt(0)}
                    </div>
                    <h4 className="text-lg font-black leading-tight">
                        {title}
                    </h4>
                    <p className="text-sm text-blue-50 leading-relaxed font-medium line-clamp-4">
                        {description}
                    </p>
                </div>
            </div>
        </motion.div>
    );
}

export function AboutSectionClient({ settings }: AboutSectionClientProps) {
    const { lang, t } = useSafeLang();

    // Fallbacks based on language selection
    const aboutText = lang === 'en'
        ? settings?.aboutTextEn || "PT Rizky Rijaya Karya is a company under the laws of the unitary state of the Republic of Indonesia officially established on September 5, 2023, engaged in Trading, Industry and Services."
        : settings?.aboutText || "PT Rizky Rijaya Karya adalah perusahaan dibawah hukum negara kesatuan republik Indonesia yang didirikan secara resmi pada 05 september 2023 yang bergerak di bidang Perdagangan, Industri dan Jasa.";
        
    const visionText = lang === 'en'
        ? settings?.visionTextEn || "Becoming a national scale company capable of serving public needs professionally based on Integrity, Customer Satisfaction, and Human Resources."
        : settings?.visionText || "Menjadi Perusahaan berskala Nasional yang mampu melayani Kebutuhan Publik secara professional yang bertumpu pada Nilai Integritas, Kepuasan pelanggan, dan Sumber Daya Manusia.";
        
    const missionText = lang === 'en'
        ? settings?.missionTextEn || "Providing Goods and Services with competitive prices according to established standards\nProviding Excellent Service and value-added solutions to all Consumers.\nCreating the best conditions as a place of pride to work and achieve."
        : settings?.missionText || "Menyediakan Barang dan Jasa dengan Harga kompetitif sesuai standar yang ditetapkan\nMemberikan Pelayanan Prima dan Solusi yang bernilai tambah kepada seluruh Konsumen.\nMenciptakan kondisi terbaik sebagai tempat kebanggaan untuk berkarya dan berprestasi.";

    // Parse JSON safely if it comes as string, or use directly if it's already an array
    let coreValues: CoreValue[] = [];
    if (settings?.coreValues) {
        if (typeof settings.coreValues === 'string') {
            try {
                coreValues = JSON.parse(settings.coreValues);
            } catch (e) { }
        } else if (Array.isArray(settings.coreValues)) {
            coreValues = settings.coreValues;
        }
    }

    // Fallback core values
    if (coreValues.length === 0) {
        coreValues = lang === 'en' ? [
            { title: "Integrity", description: "Acting honestly and trustworthily in every business agreement." },
            { title: "Competent", description: "Working expertly and professionally in their field." },
            { title: "Innovative", description: "Continuing to innovate to provide the best solutions for consumers." },
            { title: "Collaborative", description: "Building strong cooperation with all stakeholders." }
        ] : [
            { title: "Integritas", description: "Bertindak jujur dan dapat dipercaya dalam setiap kesepakatan bisnis." },
            { title: "Kompeten", description: "Bekerja dengan ahli dan profesional di bidangnya." },
            { title: "Inovatif", description: "Terus berinovasi untuk memberikan solusi terbaik bagi konsumen." },
            { title: "Kolaboratif", description: "Membangun kerja sama yang kuat dengan seluruh pemangku kepentingan." }
        ];
    }

    const missionItems = missionText.split('\n').filter((m: string) => m.trim() !== '');

    return (
        <section id="about" className="w-full py-20 bg-gradient-to-b from-slate-50 to-white dark:from-[#09090b] dark:to-[#09090b] relative">
            <div className="container-original px-4 mx-auto max-w-6xl">

                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-black text-slate-800 dark:text-white mb-4">
                        {t('section.about')}
                    </h2>
                    <p className="text-slate-600 dark:text-zinc-400 max-w-2xl mx-auto">
                        {t('section.about.desc')}
                    </p>
                </div>

                <Tabs defaultValue="about" className="w-full">
                    {/* Centered Tabs List with Shadow */}
                    <div className="w-full flex justify-center px-1">
                        <TabsList className="bg-white dark:bg-zinc-900 shadow-md rounded-full p-1 border border-gray-100 dark:border-zinc-800 flex justify-center h-auto w-full sm:w-max max-w-full">
                        <TabsTrigger
                            value="about"
                            className="hover:bg-orange-100 hover:text-orange-600 dark:hover:bg-orange-900/30 dark:hover:text-orange-400 data-active:!bg-orange-500 data-active:!text-white data-active:shadow-lg rounded-full px-3 sm:px-6 py-2 transition-all text-[11px] sm:text-sm font-semibold text-slate-600 dark:text-zinc-400 flex-1 sm:flex-none whitespace-nowrap"
                        >
                            <span className="hidden sm:inline">{t('about.tab.about')}</span>
                            <span className="sm:hidden">Tentang</span>
                        </TabsTrigger>
                        <TabsTrigger
                            value="vision"
                            className="hover:bg-orange-100 hover:text-orange-600 dark:hover:bg-orange-900/30 dark:hover:text-orange-400 data-active:!bg-orange-500 data-active:!text-white data-active:shadow-lg rounded-full px-3 sm:px-6 py-2 transition-all text-[11px] sm:text-sm font-semibold text-slate-600 dark:text-zinc-400 flex-1 sm:flex-none whitespace-nowrap"
                        >
                            <span className="hidden sm:inline">{t('about.tab.vision')}</span>
                            <span className="sm:hidden">Visi Misi</span>
                        </TabsTrigger>
                        <TabsTrigger
                            value="core-values"
                            className="hover:bg-orange-100 hover:text-orange-600 dark:hover:bg-orange-900/30 dark:hover:text-orange-400 data-active:!bg-orange-500 data-active:!text-white data-active:shadow-lg rounded-full px-3 sm:px-6 py-2 transition-all text-[11px] sm:text-sm font-semibold text-slate-600 dark:text-zinc-400 flex-1 sm:flex-none whitespace-nowrap"
                        >
                            <span className="hidden sm:inline">Core Values</span>
                            <span className="sm:hidden">Core Value</span>
                        </TabsTrigger>
                    </TabsList>
                    </div>

                    <div className="w-full mt-8">
                        {/* Tentang Perusahaan Content */}
                        <TabsContent value="about" className="focus-visible:outline-none">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="relative p-8 md:p-14 bg-white dark:bg-zinc-900 rounded-[2.5rem] shadow-xl border border-gray-100 dark:border-zinc-800 overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50 dark:bg-blue-900/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
                                
                                <div className="relative z-10 grid md:grid-cols-5 gap-10 items-center">
                                    <div className="md:col-span-2 flex justify-center group">
                                        <div className="w-40 h-40 md:w-48 md:h-48 rounded-[2rem] bg-white dark:bg-white/95 flex items-center justify-center shadow-xl border border-gray-100 dark:border-white/10 transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img 
                                                src="/logo.png" 
                                                alt="PT Rizky Rijaya Karya" 
                                                className="w-24 h-auto md:w-32 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 drop-shadow-lg" 
                                            />
                                        </div>
                                    </div>
                                    <div className="md:col-span-3 space-y-6">
                                        <h3 className="text-3xl md:text-4xl font-black text-slate-800 dark:text-white tracking-tight">
                                            {t('about.whoWeAre')}
                                        </h3>
                                        <div className="w-20 h-1.5 bg-blue-600 rounded-full" />
                                        <p className="text-lg md:text-xl text-slate-600 dark:text-zinc-400 leading-relaxed font-medium">
                                            {aboutText}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </TabsContent>

                        {/* Visi Misi Content */}
                        <TabsContent value="vision" className="focus-visible:outline-none">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                            >
                                {/* Vision Card */}
                                <div className="p-8 md:p-12 bg-gradient-to-br from-blue-50 to-white dark:from-blue-950/20 dark:to-zinc-900 rounded-[2.5rem] shadow-xl border border-blue-100 dark:border-zinc-800 relative overflow-hidden group hover:shadow-blue-500/10 transition-all duration-300">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
                                    <div className="relative z-10">
                                        <div className="w-14 h-14 rounded-2xl bg-blue-600 dark:bg-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/30 mb-8 transform -rotate-6 group-hover:rotate-0 transition-transform duration-300">
                                            <Rocket className="w-7 h-7 text-white" />
                                        </div>
                                        <h3 className="text-2xl md:text-3xl font-black text-slate-800 dark:text-white mb-6 tracking-tight">
                                            {t('about.vision')}
                                        </h3>
                                        <p className="text-lg text-slate-600 dark:text-zinc-300 leading-relaxed font-medium">
                                            {visionText}
                                        </p>
                                    </div>
                                </div>

                                {/* Mission Card */}
                                <div className="p-8 md:p-12 bg-gradient-to-br from-orange-50 to-white dark:from-orange-950/20 dark:to-zinc-900 rounded-[2.5rem] shadow-xl border border-orange-100 dark:border-zinc-800 relative overflow-hidden group hover:shadow-orange-500/10 transition-all duration-300">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 dark:bg-orange-500/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
                                    <div className="relative z-10">
                                        <div className="w-14 h-14 rounded-2xl bg-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/30 mb-8 transform rotate-6 group-hover:rotate-0 transition-transform duration-300">
                                            <Target className="w-7 h-7 text-white" />
                                        </div>
                                        <h3 className="text-2xl md:text-3xl font-black text-slate-800 dark:text-white mb-6 tracking-tight">
                                            {t('about.mission')}
                                        </h3>
                                        <ul className="space-y-5">
                                            {missionItems.map((item: string, idx: number) => (
                                                <li key={idx} className="flex items-start gap-4">
                                                    <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-orange-200 dark:bg-orange-900/50 flex items-center justify-center text-orange-600 dark:text-orange-400">
                                                        <CheckCircle2 className="w-4 h-4" />
                                                    </div>
                                                    <p className="text-base text-slate-600 dark:text-zinc-300 leading-relaxed font-medium">
                                                        {item}
                                                    </p>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </motion.div>
                        </TabsContent>

                        {/* Core Values Content */}
                        <TabsContent value="core-values" className="focus-visible:outline-none">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="p-8 md:p-12 bg-white/50 dark:bg-zinc-900/50 rounded-[2.5rem] border border-gray-100 dark:border-zinc-800/50 backdrop-blur-sm"
                            >
                                <div className="text-center mb-10">
                                    <h3 className="text-2xl md:text-3xl font-black text-slate-800 dark:text-white">
                                        {t('about.coreValues')}
                                    </h3>
                                    <div className="w-16 h-1.5 bg-blue-600 rounded-full mx-auto mt-4" />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {coreValues.map((cv, idx) => (
                                        <FlipCardCoreValue key={idx} cv={cv} lang={lang} index={idx} />
                                    ))}
                                </div>
                            </motion.div>
                        </TabsContent>
                    </div>
                </Tabs>
            </div>
            <style jsx global>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </section>
    );
}
