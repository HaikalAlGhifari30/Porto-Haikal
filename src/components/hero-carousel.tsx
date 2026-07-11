"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSafeLang } from "@/store/lang";

interface HeroSlide {
    id: string;
    title: string | null;
    subtitle: string | null;
    buttonText: string | null;
    buttonLink: string | null;
    imageUrl: string;
    overlayDarkness: number;
    isActive: boolean;
}

interface HeroCarouselProps {
    slides: HeroSlide[];
}

export function HeroCarousel({ slides }: HeroCarouselProps) {
    const { lang: activeLang, t, mounted } = useSafeLang();
    const activeSlides = slides.filter(s => s.isActive);

    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        duration: 30,
        dragFree: false
    }, [Autoplay({ delay: 6000, stopOnInteraction: false })]);

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
    const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        setScrollSnaps(emblaApi.scrollSnapList());
        emblaApi.on("select", onSelect);
        onSelect();
    }, [emblaApi, onSelect]);

    if (activeSlides.length === 0) return null;

    const currentSlide = activeSlides[selectedIndex] || activeSlides[0];

    return (
        <section id="home" className="relative min-h-[90vh] w-full bg-slate-50 dark:bg-[#09090b] flex items-center pt-20 overflow-hidden">
            {/* Soft decorative background shapes */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-orange-500/5 dark:bg-orange-500/10 blur-[120px]" />
                <div className="absolute top-[20%] -right-[10%] w-[40%] h-[60%] rounded-full bg-blue-600/5 dark:bg-blue-600/10 blur-[120px]" />
            </div>

            <div className="container-original relative z-10 mx-auto px-4 md:px-6 lg:px-8 py-10 md:py-20 lg:py-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-8 items-center">
                    
                    {/* Left Column: Text & CTA */}
                    <div className="flex flex-col items-start justify-center order-2 lg:order-1 space-y-6 lg:space-y-8 max-w-2xl pt-8 lg:pt-0">
                        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white dark:bg-zinc-800 border border-slate-200 dark:border-white/10 shadow-sm shadow-slate-200/50 dark:shadow-none transition-transform hover:-translate-y-0.5 duration-300">
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500"></span>
                            </span>
                            <span className="text-[11px] md:text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-widest">{t('hero.badge')}</span>
                        </div>
                        
                        {/* Dynamic Text wrapper to animate on slide change */}
                        <div key={selectedIndex} className="space-y-4 lg:space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-[4.5rem] font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1] lg:leading-[1.05]">
                                {activeLang === 'en' ? (currentSlide as any).titleEn || currentSlide.title || "Professional & Trusted Business Solutions" : currentSlide.title || "Solusi Bisnis Profesional & Terpercaya"}
                            </h1>
                            
                            <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 leading-relaxed font-medium max-w-[560px]">
                                {activeLang === 'en' ? (currentSlide as any).subtitleEn || currentSlide.subtitle || "We provide the best services in Trading, Training, and Contracting to support your company's growth." : currentSlide.subtitle || "Kami menghadirkan layanan terbaik di bidang Perdagangan, Kepelatihan, dan Leveransir untuk mendukung pertumbuhan perusahaan Anda."}
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 w-full sm:w-auto">
                            <a
                                href={currentSlide.buttonLink || "/#projects"}
                                className="w-full sm:w-auto px-8 h-14 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl flex items-center justify-center gap-2.5 font-bold transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-500/25"
                            >
                                {t('hero.viewProjects')}
                                <ArrowRight className="w-5 h-5" />
                            </a>
                            <a
                                href="https://wa.me/628123456789"
                                onClick={(e) => {
                                    const btn = document.querySelector('button[aria-label="WhatsApp Us"]') as HTMLButtonElement;
                                    if (btn) {
                                        e.preventDefault();
                                        btn.click();
                                    }
                                }}
                                className="w-full sm:w-auto px-8 h-14 bg-white dark:bg-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-700 border border-slate-200 dark:border-zinc-700 text-slate-800 dark:text-white rounded-2xl flex items-center justify-center gap-2 font-bold transition-all duration-300 hover:-translate-y-1 shadow-sm"
                            >
                                {t('hero.contactUs')}
                            </a>
                        </div>
                    </div>

                    {/* Right Column: Carousel inside a Card/Frame */}
                    <div className="order-1 lg:order-2 w-full relative px-2 sm:px-4 lg:px-0 mt-2 lg:mt-0">
                        {/* Decorative background blocks to make it look framed like the user requested */}
                        <div className="absolute top-2 right-0 bottom-2 left-4 lg:top-4 lg:-right-4 lg:bottom-4 lg:left-8 bg-slate-200/60 dark:bg-zinc-800 rounded-[2rem] lg:rounded-[3rem] transform -rotate-2 z-0" />
                        <div className="absolute top-1 right-2 bottom-4 left-2 lg:top-2 lg:-right-2 lg:bottom-6 lg:left-6 bg-slate-100 dark:bg-zinc-800/80 rounded-[2rem] lg:rounded-[3rem] transform rotate-1 z-0" />
                        
                        <div className="relative z-10 rounded-[1.5rem] md:rounded-[2rem] lg:rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-200/50 dark:shadow-none bg-slate-900 aspect-[4/3] sm:aspect-[16/9] lg:aspect-[4/3] xl:aspect-[4/3]">
                            
                            <div className="h-full w-full" ref={emblaRef}>
                                <div className="flex h-full w-full">
                                    {activeSlides.map((slide) => (
                                        <div key={slide.id} className="relative h-full w-full flex-[0_0_100%] min-w-0">
                                            <img
                                                src={slide.imageUrl}
                                                alt={slide.title || "Banner Image"}
                                                className="h-full w-full object-cover"
                                            />
                                            {/* Light gradient overlay for luxury feel */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-80" />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Carousel Controls Container */}
                            <div className="absolute bottom-6 left-6 right-6 lg:bottom-8 lg:left-8 lg:right-8 flex items-center justify-between z-20">
                                {/* Indicators */}
                                <div className="flex gap-2.5 bg-white/20 dark:bg-black/40 backdrop-blur-md px-4 py-2.5 rounded-full border border-white/30 dark:border-white/10">
                                    {scrollSnaps.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => scrollTo(index)}
                                            className={cn(
                                                "h-2 transition-all duration-500 rounded-full",
                                                index === selectedIndex 
                                                    ? "w-6 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]" 
                                                    : "w-2 bg-white/50 hover:bg-white/80"
                                            )}
                                            aria-label={`Go to slide ${index + 1}`}
                                        />
                                    ))}
                                </div>
                                
                                {/* Navigation Arrows */}
                                <div className="flex gap-2">
                                    <button
                                        onClick={scrollPrev}
                                        className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-black/50 hover:scale-105 transition-all group"
                                        aria-label="Previous slide"
                                    >
                                        <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
                                    </button>
                                    <button
                                        onClick={scrollNext}
                                        className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-black/50 hover:scale-105 transition-all group"
                                        aria-label="Next slide"
                                    >
                                        <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
