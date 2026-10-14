"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeroPhotoCarouselProps {
  photos: string[];
  className?: string;
  autoPlayInterval?: number;
}

export function HeroPhotoCarousel({
  photos = ["/haikal-al-ghifari.jpg"],
  className,
  autoPlayInterval = 4000,
}: HeroPhotoCarouselProps) {
  const validPhotos = photos.length > 0 ? photos : ["/haikal-al-ghifari.jpg"];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [direction, setDirection] = useState<"next" | "prev">("next");

  // Reset index if photos array length changes
  useEffect(() => {
    if (currentIndex >= validPhotos.length) {
      setCurrentIndex(0);
    }
  }, [validPhotos.length, currentIndex]);

  // Auto-slide effect
  useEffect(() => {
    if (validPhotos.length <= 1 || isHovered) return;

    const timer = setInterval(() => {
      setDirection("next");
      setCurrentIndex((prev) => (prev + 1) % validPhotos.length);
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [validPhotos.length, isHovered, autoPlayInterval]);

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setDirection("prev");
    setCurrentIndex((prev) => (prev - 1 + validPhotos.length) % validPhotos.length);
  };

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setDirection("next");
    setCurrentIndex((prev) => (prev + 1) % validPhotos.length);
  };

  const handleSelect = (idx: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setDirection(idx > currentIndex ? "next" : "prev");
    setCurrentIndex(idx);
  };

  const currentPhoto = validPhotos[currentIndex] || validPhotos[0];

  return (
    <div
      className={cn("relative w-full select-none group/carousel", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ── Top-Right Pin Badge (Retro 8-Bit) ── */}
      <div className="absolute -top-3 -right-2 sm:-top-4 sm:-right-3 z-30 px-2 sm:px-3.5 py-0.5 sm:py-1.5 bg-[#FACC15] text-black font-pixel font-black text-[9px] sm:text-xs border-2 border-black dark:border-white shadow-retro-sm tracking-wider uppercase flex items-center gap-1">
        <Sparkles className="w-3 h-3 text-black fill-black" />
        <span>20+ PROJECTS</span>
      </div>

      {/* ── Bottom-Left Pin Badge (Retro 8-Bit) ── */}
      <div className="absolute -bottom-2.5 -left-2 sm:-bottom-3.5 sm:-left-3.5 z-30 px-2.5 sm:px-3.5 py-0.5 sm:py-1.5 bg-white dark:bg-[#151B22] text-black dark:text-white font-pixel font-black text-[9px] sm:text-xs border-2 border-black dark:border-white shadow-retro-sm tracking-wider uppercase whitespace-nowrap flex items-center gap-1.5">
        <span className="relative flex h-2 w-2 shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 border border-black/40" />
        </span>
        <span>QA SPECIALIST</span>
      </div>

      {/* ── 8-Bit Arcade Cartridge Outer Frame ── */}
      <div className="relative border-3 border-black dark:border-white shadow-retro-md sm:shadow-retro-lg bg-[#FAF6ED] dark:bg-[#0E1217] p-1.5 sm:p-2">
        
        {/* Retro 4-Corner Decorative L-Brackets */}
        <div className="absolute -top-[3px] -left-[3px] w-2.5 h-2.5 border-t-4 border-l-4 border-black dark:border-[#EDE4D0] pointer-events-none z-20" />
        <div className="absolute -top-[3px] -right-[3px] w-2.5 h-2.5 border-t-4 border-r-4 border-black dark:border-[#EDE4D0] pointer-events-none z-20" />
        <div className="absolute -bottom-[3px] -left-[3px] w-2.5 h-2.5 border-b-4 border-l-4 border-black dark:border-[#EDE4D0] pointer-events-none z-20" />
        <div className="absolute -bottom-[3px] -right-[3px] w-2.5 h-2.5 border-b-4 border-r-4 border-black dark:border-[#EDE4D0] pointer-events-none z-20" />

        {/* Console Header Bar */}
        <div className="flex items-center justify-between px-1.5 py-1 mb-1 border-b-2 border-black/80 dark:border-white/20 bg-black/5 dark:bg-white/5 text-[9px] font-pixel font-black tracking-wider text-black dark:text-[#EDE4D0]">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 uppercase">
              <span className="w-1.5 h-1.5 bg-[#FACC15] inline-block border border-black" />
              P1 // HERO
            </span>
            {validPhotos.length > 1 && (
              <span className="font-pixel text-[8px] sm:text-[9px] px-1.5 py-0.5 bg-black/10 dark:bg-white/10 text-black dark:text-[#EDE4D0] border border-black/30 dark:border-white/30 tracking-wider">
                0{currentIndex + 1}/0{validPhotos.length}
              </span>
            )}
          </div>
          {/* Keep right side clear to prevent collisions with the floating top-right badge */}
          <div className="w-16 sm:w-20" aria-hidden="true" />
        </div>

        {/* Main Inner Photo Screen with 8-Bit Inner Border */}
        <div className="relative aspect-[4/5] overflow-hidden border-2 border-black dark:border-white/60 bg-black">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={currentPhoto}
              initial={{ opacity: 0, x: direction === "next" ? 25 : -25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction === "next" ? -25 : 25 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={currentPhoto}
                alt="Haikal Al Ghifari Profile"
                className="w-full h-full object-cover object-[center_18%] hover:scale-105 transition-transform duration-500"
              />
            </motion.div>
          </AnimatePresence>

          {/* Interactive Prev/Next Controls (visible if multiple photos) */}
          {validPhotos.length > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous Photo"
                className="absolute left-1.5 top-1/2 -translate-y-1/2 z-20 w-6 h-6 sm:w-7 sm:h-7 bg-white dark:bg-[#151B22] border-2 border-black dark:border-white text-black dark:text-white flex items-center justify-center shadow-retro-xs btn-retro transition-opacity opacity-0 group-hover/carousel:opacity-100 hover:bg-[#FACC15] dark:hover:bg-[#FACC15] dark:hover:text-black cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5 stroke-[3]" />
              </button>

              <button
                type="button"
                onClick={handleNext}
                aria-label="Next Photo"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 z-20 w-6 h-6 sm:w-7 sm:h-7 bg-white dark:bg-[#151B22] border-2 border-black dark:border-white text-black dark:text-white flex items-center justify-center shadow-retro-xs btn-retro transition-opacity opacity-0 group-hover/carousel:opacity-100 hover:bg-[#FACC15] dark:hover:bg-[#FACC15] dark:hover:text-black cursor-pointer"
              >
                <ChevronRight className="w-3.5 h-3.5 stroke-[3]" />
              </button>

              {/* Bottom 8-Bit Cartridge Step Indicators */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-2 py-0.5 bg-black/75 backdrop-blur-[2px] border border-black dark:border-white/40">
                {validPhotos.map((_, idx) => {
                  const isActive = idx === currentIndex;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={(e) => handleSelect(idx, e)}
                      aria-label={`Go to photo ${idx + 1}`}
                      className={cn(
                        "transition-all cursor-pointer block",
                        isActive
                          ? "w-3 h-2 bg-[#FACC15] border border-black shadow-retro-xs scale-105"
                          : "w-2 h-2 bg-white/70 hover:bg-white border border-black/60"
                      )}
                    />
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
