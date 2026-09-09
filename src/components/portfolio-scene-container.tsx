"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Navbar } from "@/components/navbar";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { HeroSection } from "@/components/sections/hero-section";
import { AboutSectionClient } from "@/components/sections/about-section-client";
import { SkillsSection } from "@/components/sections/skills-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { ContactSection } from "@/components/sections/contact-section";
import { FooterClient } from "@/components/footer-client";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface PortfolioSceneContainerProps {
  settings?: any;
  projects?: any[];
  skills?: any[];
  experiences?: any[];
  educations?: any[];
  certificates?: any[];
  organizations?: any[];
}

export const SCENES = [
  { id: "home", label: "HOME", labelId: "BERANDA" },
  { id: "about", label: "ABOUT", labelId: "TENTANG" },
  { id: "skills", label: "SKILLS", labelId: "KEAHLIAN" },
  { id: "experience", label: "EXPERIENCE", labelId: "PENGALAMAN" },
  { id: "projects", label: "PROJECTS", labelId: "PROYEK" },
  { id: "contact", label: "CONTACT", labelId: "KONTAK" },
];

export function PortfolioSceneContainer({
  settings,
  projects = [],
  skills = [],
  experiences = [],
  educations = [],
  certificates = [],
  organizations = [],
}: PortfolioSceneContainerProps) {
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [direction, setDirection] = useState<"up" | "down">("down");
  const isTransitioningRef = useRef(false);
  const sceneContentRef = useRef<HTMLDivElement | null>(null);
  const touchStartRef = useRef<number | null>(null);

  const goToScene = useCallback((index: number) => {
    if (index < 0 || index >= SCENES.length || isTransitioningRef.current) return;
    isTransitioningRef.current = true;
    setDirection(index > activeSceneIndex ? "down" : "up");
    setActiveSceneIndex(index);

    // Lock scene transition briefly to prevent accidental double flips
    setTimeout(() => {
      isTransitioningRef.current = false;
    }, 600);
  }, [activeSceneIndex]);

  // Sync hash changes on initial load
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash.replace("#", "").toLowerCase();
      if (hash) {
        const foundIdx = SCENES.findIndex((s) => s.id === hash);
        if (foundIdx !== -1) {
          setActiveSceneIndex(foundIdx);
        }
      }
    }
  }, []);

  // Update window location hash
  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentHash = SCENES[activeSceneIndex].id;
      window.history.replaceState(null, "", `#${currentHash}`);
    }
  }, [activeSceneIndex]);

  // Intelligent Mouse Wheel Scroll Handler
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isTransitioningRef.current) return;

      const el = sceneContentRef.current;
      if (el) {
        const isScrollable = el.scrollHeight > el.clientHeight + 15;
        const isAtTop = el.scrollTop <= 10;
        const isAtBottom = el.scrollHeight - el.clientHeight - el.scrollTop <= 15;

        // If user is scrolling DOWN and content can still scroll down -> let it scroll!
        if (e.deltaY > 0 && isScrollable && !isAtBottom) {
          return;
        }

        // If user is scrolling UP and content can still scroll up -> let it scroll!
        if (e.deltaY < 0 && isScrollable && !isAtTop) {
          return;
        }
      }

      // Threshold check for scene flipping
      if (Math.abs(e.deltaY) < 20) return;

      if (e.deltaY > 0) {
        if (activeSceneIndex < SCENES.length - 1) {
          goToScene(activeSceneIndex + 1);
        }
      } else {
        if (activeSceneIndex > 0) {
          goToScene(activeSceneIndex - 1);
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [activeSceneIndex, goToScene]);

  // Keyboard Arrow Handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isTransitioningRef.current) return;

      const el = sceneContentRef.current;
      if (el) {
        const isScrollable = el.scrollHeight > el.clientHeight + 15;
        const isAtTop = el.scrollTop <= 10;
        const isAtBottom = el.scrollHeight - el.clientHeight - el.scrollTop <= 15;

        if (["ArrowDown", "PageDown"].includes(e.key)) {
          if (isScrollable && !isAtBottom) {
            return; // Let keyboard natively scroll internal container
          }
          if (activeSceneIndex < SCENES.length - 1) {
            e.preventDefault();
            goToScene(activeSceneIndex + 1);
          }
        } else if (["ArrowUp", "PageUp"].includes(e.key)) {
          if (isScrollable && !isAtTop) {
            return; // Let keyboard natively scroll internal container
          }
          if (activeSceneIndex > 0) {
            e.preventDefault();
            goToScene(activeSceneIndex - 1);
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeSceneIndex, goToScene]);

  // Touch Swipe Handler (Mobile)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartRef.current === null || isTransitioningRef.current) return;
    const touchEnd = e.changedTouches[0].clientY;
    const diff = touchStartRef.current - touchEnd;

    const el = sceneContentRef.current;
    if (el) {
      const isScrollable = el.scrollHeight > el.clientHeight + 15;
      const isAtTop = el.scrollTop <= 10;
      const isAtBottom = el.scrollHeight - el.clientHeight - el.scrollTop <= 15;

      // Swiping UP (scrolling content DOWN)
      if (diff > 0 && isScrollable && !isAtBottom) {
        touchStartRef.current = null;
        return;
      }
      // Swiping DOWN (scrolling content UP)
      if (diff < 0 && isScrollable && !isAtTop) {
        touchStartRef.current = null;
        return;
      }
    }

    if (Math.abs(diff) > 40) {
      if (diff > 0 && activeSceneIndex < SCENES.length - 1) {
        goToScene(activeSceneIndex + 1);
      } else if (diff < 0 && activeSceneIndex > 0) {
        goToScene(activeSceneIndex - 1);
      }
    }
    touchStartRef.current = null;
  };

  return (
    <div
      className="bg-[#f8fafc] dark:bg-[#030712] text-zinc-900 dark:text-white h-screen w-screen relative overflow-hidden flex flex-col justify-between"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Persistent Starfield Galaxy Background */}
      <AnimatedBackground />

      {/* Top Fixed Frosted Glass Header */}
      <Navbar
        settings={settings}
        activeSceneIndex={activeSceneIndex}
        onNavigateScene={goToScene}
      />

      {/* Side Navigation Dots (Desktop Floating Pagination) */}
      <aside aria-label="Scene navigation" className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-4 bg-white/80 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-300/80 dark:border-cyan-500/20 py-4 px-2.5 rounded-full shadow-xl">
        <button
          onClick={() => activeSceneIndex > 0 && goToScene(activeSceneIndex - 1)}
          disabled={activeSceneIndex === 0}
          className="text-zinc-400 hover:text-cyan-400 disabled:opacity-30 disabled:hover:text-zinc-400 transition-colors p-1 cursor-pointer"
          title="Previous Scene"
        >
          <ChevronUp className="w-4 h-4" />
        </button>

        <div className="flex flex-col gap-2.5">
          {SCENES.map((scene, idx) => {
            const isActive = idx === activeSceneIndex;
            return (
              <button
                key={scene.id}
                onClick={() => goToScene(idx)}
                className="group relative flex items-center justify-center p-1.5 cursor-pointer"
                title={`${scene.label}`}
              >
                <span className="absolute right-8 px-2.5 py-1 rounded-md bg-slate-900 border border-cyan-500/30 text-[10px] font-bold text-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg pointer-events-none">
                  0{idx + 1} — {scene.label}
                </span>
                <span
                  className={cn(
                    "rounded-full transition-all duration-300",
                    isActive
                      ? "w-3 h-3 bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.9)] scale-110"
                      : "w-2 h-2 bg-slate-400/40 dark:bg-zinc-600 group-hover:bg-cyan-400/70"
                  )}
                />
              </button>
            );
          })}
        </div>

        <button
          onClick={() => activeSceneIndex < SCENES.length - 1 && goToScene(activeSceneIndex + 1)}
          disabled={activeSceneIndex === SCENES.length - 1}
          className="text-zinc-400 hover:text-cyan-400 disabled:opacity-30 disabled:hover:text-zinc-400 transition-colors p-1 cursor-pointer"
          title="Next Scene"
        >
          <ChevronDown className="w-4 h-4" />
        </button>
      </aside>

      {/* Main Viewport Scene Container */}
      <main className="flex-1 w-full relative z-10 pt-16 h-[calc(100vh-4rem)] overflow-hidden flex flex-col">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={activeSceneIndex}
            custom={direction}
            ref={sceneContentRef}
            initial={{
              opacity: 0,
              y: direction === "down" ? 30 : -30,
              scale: 0.99,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: direction === "down" ? -30 : 30,
              scale: 0.99,
            }}
            transition={{
              duration: 0.4,
              ease: "easeInOut",
            }}
            className="w-full h-full overflow-y-auto scrollbar-none hide-scrollbar flex flex-col items-center justify-start pb-20 sm:pb-6"
          >
            {activeSceneIndex !== 5 ? (
              <div className="w-full max-w-6xl my-auto py-6 sm:py-8 px-3 sm:px-6">
                {activeSceneIndex === 0 && (
                  <HeroSection settings={settings} onNavigateScene={goToScene} />
                )}

                {activeSceneIndex === 1 && (
                  <AboutSectionClient
                    settings={settings}
                    educations={educations}
                    certificates={certificates}
                    organizations={organizations}
                    onNavigateScene={goToScene}
                  />
                )}

                {activeSceneIndex === 2 && (
                  <SkillsSection skills={skills} />
                )}

                {activeSceneIndex === 3 && (
                  <ExperienceSection experiences={experiences} />
                )}

                {activeSceneIndex === 4 && (
                  <ProjectsSection projects={projects} onNavigateScene={goToScene} />
                )}
              </div>
            ) : (
              <div className="w-full flex-1 flex flex-col justify-between items-center min-h-[calc(100vh-4rem)]">
                <div className="w-full max-w-5xl my-auto py-6 px-3 sm:px-6">
                  <ContactSection settings={settings} />
                </div>
                <div className="w-full shrink-0">
                  <FooterClient settings={settings} onNavigateScene={goToScene} />
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
