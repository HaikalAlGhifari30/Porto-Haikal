"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
    const activeSlides = slides.filter(s => s.isActive);

    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        duration: 30,
        dragFree: false
    }, [Autoplay({ delay: 5000, stopOnInteraction: false })]);

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

    return (
        <section id="home" className="relative h-screen w-full overflow-hidden bg-background">
            <div className="h-full w-full" ref={emblaRef}>
                <div className="flex h-full w-full">
                    {activeSlides.map((slide) => (
                        <div key={slide.id} className="relative h-full w-full flex-[0_0_100%] min-w-0">
                            {/* Background Image */}
                            <div className="absolute inset-0 z-0">
                                <img
                                    src={slide.imageUrl}
                                    alt={slide.title || "Banner"}
                                    className="h-full w-full object-cover brightness-[0.7] contrast-[1.1] transition-all duration-700"
                                />
                                {/* Cinematic Vignette Overlay */}
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_60%,rgba(0,0,0,0.8)_100%)] z-0" />
                                
                                {/* Sharp Bottom Transition - Deep Navy Hex */}
                                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#040816] via-[#040816]/80 to-transparent z-10" />
                                
                                {/* Dynamic Darkness Layer */}
                                <div
                                    className="absolute inset-0 bg-black transition-opacity duration-700 z-0"
                                    style={{ opacity: slide.overlayDarkness / 100 }}
                                />
                            </div>

                            {/* Content */}
                            <div className="relative z-10 h-full w-full flex flex-col items-center justify-start pt-[25vh] md:pt-[30vh] px-4 md:px-6">
                                <div className="w-full max-w-7xl mx-auto space-y-8 md:space-y-12 animate-in fade-in slide-in-from-bottom-10 duration-1000 text-center">
                                    <div className="space-y-4 md:space-y-6 w-full">
                                        <h1 className="w-full text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-normal tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/70 leading-[0.8] font-serif italic text-center drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                                            {slide.title}
                                        </h1>
                                        <p className="w-full text-sm md:text-lg lg:text-xl text-zinc-300 max-w-3xl mx-auto leading-relaxed font-light opacity-80 text-center">
                                            {slide.subtitle}
                                        </p>
                                    </div>

                                </div>
                            </div>

                            {/* Fixed Bottom Button */}
                            {slide.buttonText && (
                                <div className="absolute bottom-28 left-1/2 -translate-x-1/2 z-20 animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-300">
                                    <a
                                        href={slide.buttonLink || "#"}
                                        className={cn(
                                            buttonVariants({ variant: "outline" }),
                                            "group relative rounded-full px-8 md:px-12 h-12 md:h-14 bg-white/5 backdrop-blur-md border-white/20 hover:border-primary/50 hover:bg-primary/10 text-white transition-all duration-500 overflow-hidden"
                                        )}
                                    >
                                        <span className="relative z-10 flex items-center gap-3 text-[10px] md:text-xs font-black uppercase tracking-[0.3em]">
                                            {slide.buttonText}
                                            <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4 transition-transform duration-500 group-hover:translate-x-1" />
                                        </span>
                                    </a>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation Arrows - Desktop Only */}
            <div className="hidden md:block">
                <button
                    onClick={scrollPrev}
                    className="absolute left-8 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all z-20 group"
                >
                    <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                </button>
                <button
                    onClick={scrollNext}
                    className="absolute right-8 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all z-20 group"
                >
                    <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>

            {/* Indicators */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-3 z-20">
                {scrollSnaps.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => scrollTo(index)}
                        className={cn(
                            "h-1.5 transition-all rounded-full",
                            selectedIndex === index
                                ? "w-10 bg-primary shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                                : "w-3 bg-white/20 hover:bg-white/40"
                        )}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>

            {/* Subtle Overlay Glow Removed for Clarity */}
        </section>
    );
}
