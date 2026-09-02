"use client";

import { useEffect, useRef, useState } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  baseAlpha: number;
  alpha: number;
  twinkleSpeed: number;
  vx: number;
  vy: number;
  color: string;
}

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Check initial dark mode state & listen to theme changes
    const checkDark = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    checkDark();

    const observer = new MutationObserver(() => {
      checkDark();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initStars();
    };

    window.addEventListener("resize", handleResize);

    // Color palettes for dark vs light mode
    const darkColors = ["#38bdf8", "#818cf8", "#c084fc", "#ec4899", "#60a5fa", "#ffffff"];
    const lightColors = ["#0284c7", "#4f46e5", "#2563eb", "#0d9488", "#7c3aed", "#0369a1"];

    let stars: Star[] = [];

    const initStars = () => {
      stars = [];
      const starCount = Math.floor((width * height) / 8500);
      const activeColors = isDark ? darkColors : lightColors;

      for (let i = 0; i < starCount; i++) {
        const baseAlpha = isDark ? Math.random() * 0.7 + 0.2 : Math.random() * 0.5 + 0.25;
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: isDark ? Math.random() * 2 + 0.6 : Math.random() * 2.5 + 0.8,
          baseAlpha,
          alpha: baseAlpha,
          twinkleSpeed: (Math.random() * 0.02 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.15,
          color: activeColors[Math.floor(Math.random() * activeColors.length)],
        });
      }
    };

    initStars();

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      stars.forEach((star) => {
        star.x += star.vx;
        star.y += star.vy;

        if (star.x < 0) star.x = width;
        if (star.x > width) star.x = 0;
        if (star.y < 0) star.y = height;
        if (star.y > height) star.y = 0;

        star.alpha += star.twinkleSpeed;
        if (star.alpha > (isDark ? 0.95 : 0.8) || star.alpha < 0.15) {
          star.twinkleSpeed = -star.twinkleSpeed;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0.15, Math.min(1, star.alpha));
        ctx.fillStyle = star.color;
        ctx.shadowBlur = star.size * (isDark ? 3 : 2);
        ctx.shadowColor = star.color;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDark]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden transition-colors duration-500">
      {/* Background Layer (Dark: Cosmic #030712 | Light: Pearl Slate #f8fafc) */}
      <div className="absolute inset-0 bg-[#f8fafc] dark:bg-[#030712] transition-colors duration-500" />

      {/* Floating Gradient Nebulas (Adapts to Light & Dark) */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-cyan-200/40 dark:bg-purple-900/15 rounded-full blur-[140px] animate-pulse transition-colors duration-500" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-blue-200/40 dark:bg-cyan-900/15 rounded-full blur-[140px] animate-pulse transition-colors duration-500" />
      <div className="absolute top-[40%] right-[20%] w-[35vw] h-[35vw] bg-indigo-200/30 dark:bg-indigo-900/15 rounded-full blur-[160px] transition-colors duration-500" />

      {/* Canvas Layer for Starfield Particles */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-90 transition-opacity duration-500" />
    </div>
  );
}
