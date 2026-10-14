"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Navbar } from "@/components/navbar";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { AIAssistantModal } from "@/components/ai-assistant-modal";
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
import { useSafeLang } from "@/store/lang";
import { AnimatedScrollIndicator } from "@/components/ui/animated-scroll-indicator";

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
  const { lang } = useSafeLang();
  const isEn = lang === "en";
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [direction, setDirection] = useState<"up" | "down">("down");
  const isTransitioningRef = useRef(false);
  const sceneContentRef = useRef<HTMLDivElement | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  const touchStartXRef = useRef<number | null>(null);
  const wasAtBottomRef = useRef(false);
  const wasAtTopRef = useRef(false);

  const goToScene = useCallback((index: number) => {
    if (index < 0 || index >= SCENES.length || isTransitioningRef.current) return;
    isTransitioningRef.current = true;
    setDirection(index > activeSceneIndex ? "down" : "up");
    setActiveSceneIndex(index);

    if (sceneContentRef.current) {
      sceneContentRef.current.scrollTop = 0;
    }

    // Lock scene transition briefly to prevent accidental double flips
    setTimeout(() => {
      isTransitioningRef.current = false;
    }, 600);
  }, [activeSceneIndex]);

  // Initial load check & PWA / Home Screen reset
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isPWA =
        window.matchMedia("(display-mode: standalone)").matches ||
        (navigator as any).standalone === true ||
        window.location.search.includes("mode=pwa");

      const isFreshSession = !sessionStorage.getItem("app_loaded");
      sessionStorage.setItem("app_loaded", "true");

      const hash = window.location.hash.replace("#", "").toLowerCase();

      // If launched from Home Screen PWA shortcut or fresh session with #contact, force start at Home scene!
      if (isPWA || (isFreshSession && (hash === "contact" || hash === ""))) {
        if (hash) {
          window.history.replaceState(null, "", window.location.pathname);
        }
        setActiveSceneIndex(0);
        return;
      }

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
      if (activeSceneIndex === 0) {
        // Clean URL for home scene so Add-to-Home-Screen saves clean root URL
        window.history.replaceState(null, "", window.location.pathname);
      } else {
        window.history.replaceState(null, "", `#${currentHash}`);
      }
    }
  }, [activeSceneIndex]);

  // Intelligent Mouse Wheel Scroll Handler
  useEffect(() => {
    let accumulatedDeltaY = 0;
    let resetTimer: NodeJS.Timeout | null = null;

    const handleWheel = (e: WheelEvent) => {
      if (isTransitioningRef.current) return;

      const targetEl = e.target as HTMLElement | null;
      if (targetEl && targetEl.closest("[data-no-scene-scroll], .ai-assistant-modal-container")) {
        return;
      }

      const el = sceneContentRef.current;
      if (el) {
        const isScrollable = el.scrollHeight > el.clientHeight + 15;
        const isAtTop = el.scrollTop <= 5;
        const isAtBottom = el.scrollHeight - el.clientHeight - el.scrollTop <= 10;

        // If user is scrolling DOWN and content can still scroll down -> let it scroll!
        if (e.deltaY > 0 && isScrollable && !isAtBottom) {
          accumulatedDeltaY = 0;
          return;
        }

        // If user is scrolling UP and content can still scroll up -> let it scroll!
        if (e.deltaY < 0 && isScrollable && !isAtTop) {
          accumulatedDeltaY = 0;
          return;
        }

        // When at boundary on scrollable sections, accumulate delta for a clean deliberate flip
        if (isScrollable) {
          accumulatedDeltaY += e.deltaY;
          if (resetTimer) clearTimeout(resetTimer);
          resetTimer = setTimeout(() => {
            accumulatedDeltaY = 0;
          }, 250);

          if (Math.abs(accumulatedDeltaY) < 35) {
            return;
          }
        }
      }

      // Threshold check for scene flipping (prevents accidental flip on slight wheel nudge)
      if (Math.abs(e.deltaY) < 50) return;

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
    return () => {
      window.removeEventListener("wheel", handleWheel);
      if (resetTimer) clearTimeout(resetTimer);
    };
  }, [activeSceneIndex, goToScene]);

  // Keyboard Arrow Handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isTransitioningRef.current) return;

      const targetEl = e.target as HTMLElement | null;
      if (targetEl && targetEl.closest("[data-no-scene-scroll], .ai-assistant-modal-container, input, textarea")) {
        return;
      }

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
    const targetEl = e.target as HTMLElement | null;
    if (targetEl && targetEl.closest("[data-no-scene-scroll], .ai-assistant-modal-container, input, textarea, select")) {
      touchStartYRef.current = null;
      touchStartXRef.current = null;
      return;
    }
    touchStartYRef.current = e.touches[0].clientY;
    touchStartXRef.current = e.touches[0].clientX;

    const el = sceneContentRef.current;
    if (el) {
      wasAtBottomRef.current = el.scrollHeight - el.clientHeight - el.scrollTop <= 15;
      wasAtTopRef.current = el.scrollTop <= 10;
    } else {
      wasAtBottomRef.current = true;
      wasAtTopRef.current = true;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartYRef.current === null || isTransitioningRef.current) return;
    const targetEl = e.target as HTMLElement | null;
    if (targetEl && targetEl.closest("[data-no-scene-scroll], .ai-assistant-modal-container")) {
      touchStartYRef.current = null;
      touchStartXRef.current = null;
      return;
    }

    const touchEndY = e.changedTouches[0].clientY;
    const touchEndX = e.changedTouches[0].clientX;
    const diffY = touchStartYRef.current - touchEndY;
    const diffX = (touchStartXRef.current ?? touchEndX) - touchEndX;
    touchStartYRef.current = null;
    touchStartXRef.current = null;

    // Ignore mostly horizontal swipes
    if (Math.abs(diffX) > Math.abs(diffY)) return;

    const el = sceneContentRef.current;
    if (el) {
      const isScrollable = el.scrollHeight > el.clientHeight + 15;

      if (isScrollable) {
        const isCurrentlyAtTop = el.scrollTop <= 10;
        const isCurrentlyAtBottom = el.scrollHeight - el.clientHeight - el.scrollTop <= 15;

        // Swiping DOWN (pulling from top down) -> Go to PREVIOUS scene
        if (diffY < -50 && wasAtTopRef.current && isCurrentlyAtTop) {
          if (activeSceneIndex > 0) {
            goToScene(activeSceneIndex - 1);
          }
          return;
        }

        // Swiping UP (pulling from bottom up) -> Go to NEXT scene
        if (diffY > 50 && wasAtBottomRef.current && isCurrentlyAtBottom) {
          if (activeSceneIndex < SCENES.length - 1) {
            goToScene(activeSceneIndex + 1);
          }
          return;
        }

        // Inside scrollable area: let native touch scrolling do its work
        return;
      }
    }

    // Single-screen (non-scrollable) scenes require a clean intentional swipe (> 65px)
    if (Math.abs(diffY) > 65) {
      if (diffY > 0 && activeSceneIndex < SCENES.length - 1) {
        goToScene(activeSceneIndex + 1);
      } else if (diffY < 0 && activeSceneIndex > 0) {
        goToScene(activeSceneIndex - 1);
      }
    }
  };

  return (
    <div
      className="bg-[#FAF6ED] dark:bg-[#0E1217] text-black dark:text-white h-screen h-[100dvh] w-full min-h-[100dvh] relative overflow-hidden flex flex-col"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Persistent Starfield Galaxy Background */}
      <AnimatedBackground />

      {/* Interactive AI Assistant Floating Orb */}
      <AIAssistantModal settings={settings} />

      {/* Top Fixed Frosted Glass Header */}
      <Navbar
        settings={settings}
        activeSceneIndex={activeSceneIndex}
        onNavigateScene={goToScene}
      />

      {/* Side Navigation Dots (Desktop Floating 8-Bit Pagination) */}
      <aside aria-label="Scene navigation" className="hidden xl:flex fixed right-3 2xl:right-6 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-3.5 bg-[#FAF6ED] dark:bg-[#0E1217] border-2 border-black dark:border-white shadow-retro py-3.5 px-2">
        <button
          onClick={() => activeSceneIndex > 0 && goToScene(activeSceneIndex - 1)}
          disabled={activeSceneIndex === 0}
          className="text-black dark:text-white hover:text-yellow-500 disabled:opacity-20 transition-colors p-1 cursor-pointer"
          title="Previous Scene"
        >
          <ChevronUp className="w-4 h-4 stroke-[3]" />
        </button>

        <div className="flex flex-col gap-2">
          {SCENES.map((scene, idx) => {
            const isActive = idx === activeSceneIndex;
            return (
              <button
                key={scene.id}
                onClick={() => goToScene(idx)}
                className="group relative flex items-center justify-center p-1 cursor-pointer"
                title={isEn ? scene.label : scene.labelId}
              >
                <span className="absolute right-8 px-2 py-0.5 bg-[#FAF6ED] dark:bg-[#0E1217] border-2 border-black dark:border-white shadow-retro-sm text-[10px] font-pixel font-bold text-black dark:text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  0{idx + 1} — {isEn ? scene.label : scene.labelId}
                </span>
                <span
                  className={cn(
                    "border-2 border-black dark:border-white transition-all block",
                    isActive
                      ? "w-3 h-3 bg-[#FACC15] scale-110 shadow-retro-sm"
                      : "w-2.5 h-2.5 bg-white dark:bg-[#151B22] group-hover:bg-[#FACC15]"
                  )}
                />
              </button>
            );
          })}
        </div>

        <button
          onClick={() => activeSceneIndex < SCENES.length - 1 && goToScene(activeSceneIndex + 1)}
          disabled={activeSceneIndex === SCENES.length - 1}
          className="text-black dark:text-white hover:text-yellow-500 disabled:opacity-20 transition-colors p-1 cursor-pointer"
          title="Next Scene"
        >
          <ChevronDown className="w-4 h-4 stroke-[3]" />
        </button>
      </aside>

      {/* Main Viewport Scene Container */}
      <main className="w-full flex-1 min-h-0 relative z-10 pt-14 sm:pt-16 overflow-hidden flex flex-col">
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
            className={cn(
              "w-full h-full flex-1 min-h-0 overflow-y-auto overscroll-contain flex flex-col items-center hide-scrollbar",
              activeSceneIndex === 5
                ? "justify-between"
                : activeSceneIndex === 0
                ? "justify-center"
                : "justify-start"
            )}
          >
            {activeSceneIndex !== 5 ? (
              <div
                className={cn(
                  "w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 xl:pr-14 2xl:pr-8 min-h-full flex flex-col",
                  activeSceneIndex === 0
                    ? "my-auto justify-center py-2 sm:py-4 md:py-6"
                    : "justify-start pt-4 sm:pt-6 pb-36 sm:pb-24"
                )}
              >
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
                  <SkillsSection skills={skills} onNavigateScene={goToScene} />
                )}

                {activeSceneIndex === 3 && (
                  <ExperienceSection experiences={experiences} onNavigateScene={goToScene} />
                )}

                {activeSceneIndex === 4 && (
                  <ProjectsSection projects={projects} onNavigateScene={goToScene} />
                )}
              </div>
            ) : (
              <div className="w-full flex-1 flex flex-col justify-between items-center min-h-full">
                <div className="w-full max-w-5xl my-auto py-4 px-3 sm:px-6 xl:pr-14 2xl:pr-8 flex flex-col justify-start">
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

      {/* Floating Living Scroll Indicator (Hero Scene - Text Only) */}
      <AnimatePresence>
        {activeSceneIndex === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.3 }}
            className="hidden sm:flex absolute bottom-2.5 sm:bottom-4 md:bottom-5 left-1/2 -translate-x-1/2 z-30 pointer-events-auto"
          >
            <AnimatedScrollIndicator
              onClick={() => goToScene(1)}
              label="SCROLL"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
