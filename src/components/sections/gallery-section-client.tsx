"use client";

import { Gallery } from "@prisma/client";
import { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { TranslatedText } from "@/components/translated-text";

interface GallerySectionClientProps {
    items: Gallery[];
}

export function GallerySectionClient({ items }: GallerySectionClientProps) {
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    // Mobile Carousel
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: "center",
        dragFree: false
    });

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

    // Lightbox handlers
    const openLightbox = (index: number) => {
        setLightboxIndex(index);
    };

    const closeLightbox = () => {
        setLightboxIndex(null);
    };

    useEffect(() => {
        if (lightboxIndex !== null) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [lightboxIndex]);

    const nextLightboxImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (lightboxIndex !== null) {
            setLightboxIndex((lightboxIndex + 1) % items.length);
        }
    };

    const prevLightboxImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (lightboxIndex !== null) {
            setLightboxIndex((lightboxIndex - 1 + items.length) % items.length);
        }
    };

    return (
        <section 
            id="gallery" 
            className="py-24 md:py-32 relative overflow-hidden bg-gradient-to-b from-white via-blue-50/30 to-slate-50 dark:from-[#09090b] dark:via-blue-950/10 dark:to-[#09090b]"
        >
            {/* Subtle Top Border */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/20 dark:via-primary/5 to-transparent" />
            
            {/* Subtle Radial Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-blue-600/[0.05] dark:bg-blue-600/[0.03] blur-[130px] rounded-full pointer-events-none" />

            <div className="container-original relative z-10">
                
                <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 space-y-4">
                    <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
                        </span>
                        <span className="text-xs font-bold text-blue-700 dark:text-blue-400 uppercase tracking-widest">
                            <TranslatedText id="section.gallery" fallback="Galeri Proyek" />
                        </span>
                    </div>
                    
                    <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
                        <TranslatedText id="section.gallery.title1" fallback="Dokumentasi Karya " />
                        <span className="text-blue-600 dark:text-blue-500">
                            <TranslatedText id="section.gallery.title2" fallback="Terbaik" />
                        </span>
                        <TranslatedText id="section.gallery.title3" fallback=" Kami" />
                    </h2>
                    
                    <p className="text-lg text-slate-500 dark:text-zinc-400 font-medium">
                        <TranslatedText id="section.gallery.desc" fallback="Jelajahi momen-momen penting dan hasil eksekusi dari berbagai proyek unggulan yang telah kami selesaikan." />
                    </p>
                </div>

                {/* Mobile Carousel View (md and down) */}
                <div className="md:hidden relative">
                    <div className="overflow-hidden" ref={emblaRef}>
                        <div className="flex -ml-4">
                            {items.map((item, idx) => (
                                <div key={item.id} className="flex-[0_0_100%] min-w-0 pl-4 relative group">
                                    <div 
                                        onClick={() => openLightbox(idx)}
                                        className="relative aspect-[4/5] rounded-3xl overflow-hidden cursor-pointer shadow-lg"
                                    >
                                        <img 
                                            src={item.imageUrl} 
                                            alt={item.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
                                        
                                        <div className="absolute bottom-0 left-0 right-0 p-6">
                                            <span className="inline-block px-3 py-1 mb-3 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
                                                {item.category}
                                            </span>
                                            <h3 className="text-xl font-bold text-white line-clamp-2 leading-tight">
                                                {item.title}
                                            </h3>
                                        </div>

                                        <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <ZoomIn className="w-5 h-5 text-white" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-center gap-4 mt-8">
                        <button onClick={scrollPrev} className="w-12 h-12 rounded-full bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 flex items-center justify-center text-slate-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-200 dark:hover:border-blue-500/50 shadow-sm hover:shadow-md transition-all active:scale-95 group">
                            <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" />
                        </button>
                        <button onClick={scrollNext} className="w-12 h-12 rounded-full bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 flex items-center justify-center text-slate-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-200 dark:hover:border-blue-500/50 shadow-sm hover:shadow-md transition-all active:scale-95 group">
                            <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
                        </button>
                    </div>
                </div>

                {/* Desktop Masonry Grid (md and up) */}
                <div className="hidden md:block columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                    {items.map((item, idx) => (
                        <div 
                            key={item.id} 
                            onClick={() => openLightbox(idx)}
                            className="break-inside-avoid relative group rounded-[1.5rem] overflow-hidden cursor-pointer shadow-lg shadow-slate-200/50 dark:shadow-none bg-slate-100 dark:bg-zinc-800"
                        >
                            <img 
                                src={item.imageUrl} 
                                alt={item.title}
                                className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                style={{
                                    // Giving arbitrary varying heights for masonry effect if the images are all squares,
                                    // but actual aspect ratio is determined by the image itself in a true masonry.
                                }}
                            />
                            
                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 md:p-8">
                                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    <span className="inline-block px-3 py-1 mb-3 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
                                        {item.category}
                                    </span>
                                    <h3 className="text-xl md:text-2xl font-bold text-white line-clamp-3 leading-tight">
                                        {item.title}
                                    </h3>
                                </div>
                            </div>

                            {/* Zoom Icon */}
                            <div className="absolute top-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
                                <ZoomIn className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    ))}
                </div>
                
                {/* Empty State */}
                {items.length === 0 && (
                    <div className="w-full py-16 flex flex-col items-center justify-center text-center bg-slate-100/50 dark:bg-zinc-900/50 rounded-[2rem] border border-dashed border-slate-300 dark:border-zinc-800">
                        <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                            <ZoomIn className="w-8 h-8 text-blue-500" />
                        </div>
                        <h4 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
                            <TranslatedText id="gallery.empty" fallback="Belum ada foto" />
                        </h4>
                        <p className="text-slate-500 dark:text-zinc-400">
                            <TranslatedText id="gallery.emptyDesc" fallback="Dokumentasi proyek akan segera ditambahkan di sini." />
                        </p>
                    </div>
                )}

            </div>

            {/* Lightbox */}
            {lightboxIndex !== null && (
                <div 
                    className="fixed inset-0 z-[99999] bg-black/95 flex flex-col items-center justify-center animate-in fade-in duration-300"
                    onClick={closeLightbox}
                >
                    <button 
                        onClick={closeLightbox}
                        className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors z-50"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    <button 
                        onClick={prevLightboxImage}
                        className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full hidden md:flex items-center justify-center text-white transition-colors z-50"
                    >
                        <ChevronLeft className="w-8 h-8" />
                    </button>

                    <button 
                        onClick={nextLightboxImage}
                        className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full hidden md:flex items-center justify-center text-white transition-colors z-50"
                    >
                        <ChevronRight className="w-8 h-8" />
                    </button>

                    <div className="relative max-w-7xl max-h-[85vh] w-full px-4 flex items-center justify-center">
                        <img 
                            src={items[lightboxIndex].imageUrl} 
                            alt={items[lightboxIndex].title}
                            className="max-w-full max-h-[85vh] object-contain rounded-lg animate-in zoom-in-95 duration-300"
                        />
                        
                        <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8 text-center pointer-events-none">
                            <div className="inline-block bg-black/60 backdrop-blur-md px-6 py-3 rounded-2xl">
                                <p className="text-white/70 text-xs font-bold uppercase tracking-widest mb-1">{items[lightboxIndex].category}</p>
                                <p className="text-white text-lg font-medium">{items[lightboxIndex].title}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
