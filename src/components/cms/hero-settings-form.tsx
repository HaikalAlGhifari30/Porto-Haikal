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
            <div className="flex items-center gap-4 p-6 rounded-[2rem] bg-blue-500/5 border border-blue-500/10 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-blue-600/10 flex items-center justify-center border border-blue-600/20">
                    <ImageIcon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">Banner Hero Beranda</h3>
                    <p className="text-sm text-slate-500 dark:text-zinc-400">Kelola gambar carousel yang muncul di halaman utama.</p>
                </div>
            </div>

            <HeroCarouselManager initialSlides={initialSlides} />
        </div>
    );
}
