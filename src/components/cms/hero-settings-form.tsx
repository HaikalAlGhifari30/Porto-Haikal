"use client";

import { HeroCarouselManager } from "./hero-carousel-manager";
import { Image as ImageIcon } from "lucide-react";

interface HeroSlide {
    id: string;
    title: string | null;
    subtitle: string | null;
    buttonText: string | null;
    buttonLink: string | null;
    imageUrl: string;
    overlayDarkness: number;
    order: number;
    isActive: boolean;
}

export function HeroSettingsForm({ initialSlides }: { initialSlides: HeroSlide[] }) {
    return (
        <div className="space-y-12">
            <div className="flex items-center gap-4 p-5 rounded-none bg-[#FACC15]/10 border-2 border-black dark:border-white mb-8 shadow-retro-xs">
                <div className="w-12 h-12 rounded-none bg-[#FACC15] text-black flex items-center justify-center border-2 border-black dark:border-white shadow-retro-xs shrink-0">
                    <ImageIcon className="w-6 h-6" />
                </div>
                <div>
                    <h3 className="text-xl font-black uppercase text-slate-900 dark:text-white leading-tight">Banner Hero Beranda</h3>
                    <p className="text-xs text-slate-600 dark:text-zinc-300 font-bold">Kelola gambar carousel yang muncul di halaman utama.</p>
                </div>
            </div>

            <HeroCarouselManager initialSlides={initialSlides} />
        </div>
    );
}
