"use client";

import { useEffect, useRef, useState } from "react";

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  size: number;
  baseAlpha: number;
  alpha: number;
  twinkleSpeed: number;
  color: string;
}

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDark, setIsDark] = useState(true);

  // Smooth mouse/touch tracking state
  const mouseRef = useRef({
    x: -1000,
    y: -1000,
    targetX: -1000,
    targetY: -1000,
    active: false,
  });

  useEffect(() => {
    // Check initial dark mode state & listen to theme mutations
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
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
      mouseRef.current.targetX = -1000;
      mouseRef.current.targetY = -1000;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current.targetX = e.touches[0].clientX;
        mouseRef.current.targetY = e.touches[0].clientY;
        mouseRef.current.active = true;
      }
    };

    const handleTouchEnd = () => {
      mouseRef.current.active = false;
      mouseRef.current.targetX = -1000;
      mouseRef.current.targetY = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchstart", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    window.addEventListener("touchcancel", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchstart", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("touchcancel", handleTouchEnd);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = window.innerWidth;
    let height = window.innerHeight;

    const setupCanvasSize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };

    setupCanvasSize();

    // Track previous width to avoid particle reset on mobile address bar show/hide
    let lastWidth = width;

    const handleResize = () => {
      if (!canvas) return;
      const newWidth = window.innerWidth;
      setupCanvasSize();
      // Only re-init particles if screen width changes (orientation or window resize), not on mobile height shifts
      if (Math.abs(newWidth - lastWidth) > 30) {
        lastWidth = newWidth;
        initParticles();
      }
    };

    window.addEventListener("resize", handleResize);

    // Dynamic color palettes
    const darkColors = ["#38bdf8", "#818cf8", "#c084fc", "#22d3ee", "#60a5fa", "#ffffff"];
    const lightColors = ["#0284c7", "#4f46e5", "#2563eb", "#0d9488", "#7c3aed", "#0369a1"];

    let particles: Particle[] = [];

    const initParticles = () => {
      particles = [];
      const isMobile = width < 768;
      // Adjust particle count for mobile vs desktop for smooth performance
      const count = Math.floor((width * height) / (isMobile ? 6500 : 7500));
      const activeColors = isDark ? darkColors : lightColors;

      for (let i = 0; i < count; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const baseAlpha = isDark ? Math.random() * 0.65 + 0.25 : Math.random() * 0.5 + 0.3;

        particles.push({
          x,
          y,
          originX: x,
          originY: y,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: isDark 
            ? (isMobile ? Math.random() * 1.8 + 1 : Math.random() * 2.2 + 0.8)
            : (isMobile ? Math.random() * 2.2 + 1.2 : Math.random() * 2.8 + 1),
          baseAlpha,
          alpha: baseAlpha,
          twinkleSpeed: (Math.random() * 0.02 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
          color: activeColors[Math.floor(Math.random() * activeColors.length)],
        });
      }
    };

    initParticles();

    // Main 60FPS Interactive Render Loop
    const render = () => {
      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation (LERP)
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.15;
      mouse.y += (mouse.targetY - mouse.y) * 0.15;

      const isMobile = width < 768;
      const interactionRadius = isMobile ? 140 : 200;
      const interactionRadiusSq = interactionRadius * interactionRadius;

      // Draw Cursor Ambient Light Spotlight Aura
      if (mouse.active && mouse.x > 0 && mouse.y > 0) {
        const auraRadius = isMobile ? 170 : 240;
        const spotlightGradient = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          auraRadius
        );
        if (isDark) {
          spotlightGradient.addColorStop(0, "rgba(34, 211, 238, 0.16)");
          spotlightGradient.addColorStop(0.5, "rgba(99, 102, 241, 0.06)");
          spotlightGradient.addColorStop(1, "rgba(3, 7, 18, 0)");
        } else {
          spotlightGradient.addColorStop(0, "rgba(2, 132, 199, 0.18)");
          spotlightGradient.addColorStop(0.5, "rgba(79, 70, 229, 0.07)");
          spotlightGradient.addColorStop(1, "rgba(248, 250, 252, 0)");
        }

        ctx.save();
        ctx.fillStyle = spotlightGradient;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, auraRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Update & Draw Interactive Vector Field Particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // 1. Natural drift
        p.originX += p.vx;
        p.originY += p.vy;

        if (p.originX < 0) p.originX = width;
        if (p.originX > width) p.originX = 0;
        if (p.originY < 0) p.originY = height;
        if (p.originY > height) p.originY = 0;

        // 2. Interactive Mouse/Touch Repulsion / Distortion (Motion.dev Vector Field style)
        let targetX = p.originX;
        let targetY = p.originY;
        let scaleFactor = 1;

        if (mouse.active) {
          const dx = mouse.x - p.originX;
          const dy = mouse.y - p.originY;
          const distSq = dx * dx + dy * dy;

          if (distSq < interactionRadiusSq && distSq > 0) {
            const dist = Math.sqrt(distSq);
            const force = (1 - dist / interactionRadius);
            
            // Push particle away from cursor proportional to distance
            const pushDistance = force * (isMobile ? 40 : 60);
            const angle = Math.atan2(dy, dx);
            
            targetX = p.originX - Math.cos(angle) * pushDistance;
            targetY = p.originY - Math.sin(angle) * pushDistance;
            
            // Brighten and scale particle near cursor
            scaleFactor = 1 + force * 1.5;
          }
        }

        // Smooth spring movement to target position
        p.x += (targetX - p.x) * 0.1;
        p.y += (targetY - p.y) * 0.1;

        // Twinkle effect
        p.alpha += p.twinkleSpeed;
        if (p.alpha > (isDark ? 0.95 : 0.85) || p.alpha < 0.2) {
          p.twinkleSpeed = -p.twinkleSpeed;
        }

        // 3. Render Particle
        ctx.save();
        ctx.globalAlpha = Math.max(0.15, Math.min(1, p.alpha));
        ctx.fillStyle = p.color;

        const currentSize = p.size * scaleFactor;
        ctx.shadowBlur = currentSize * (isDark ? 3.5 : 2);
        ctx.shadowColor = p.color;

        ctx.beginPath();
        ctx.arc(p.x, p.y, currentSize, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // 4. Draw Interactive Constellation Vector Lines between nearby particles near cursor
        if (mouse.active) {
          const distToMouseSq = (p.x - mouse.x) ** 2 + (p.y - mouse.y) ** 2;
          if (distToMouseSq < interactionRadiusSq) {
            for (let j = i + 1; j < particles.length; j++) {
              const p2 = particles[j];
              const p2DistToMouseSq = (p2.x - mouse.x) ** 2 + (p2.y - mouse.y) ** 2;
              
              if (p2DistToMouseSq < interactionRadiusSq) {
                const pdx = p.x - p2.x;
                const pdy = p.y - p2.y;
                const pDistSq = pdx * pdx + pdy * pdy;
                const maxLineDist = isMobile ? 70 : 90;
                const maxLineDistSq = maxLineDist * maxLineDist;

                if (pDistSq < maxLineDistSq) {
                  const lineAlpha = (1 - Math.sqrt(pDistSq) / maxLineDist) * 0.35;
                  ctx.save();
                  ctx.globalAlpha = lineAlpha;
                  ctx.strokeStyle = isDark ? "#38bdf8" : "#0284c7";
                  ctx.lineWidth = 0.8;
                  ctx.beginPath();
                  ctx.moveTo(p.x, p.y);
                  ctx.lineTo(p2.x, p2.y);
                  ctx.stroke();
                  ctx.restore();
                }
              }
            }
          }
        }

      }

      ctx.restore();
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDark]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Background Base Color Layer */}
      <div className="absolute inset-0 bg-slate-50 dark:bg-[#020617]" />

      {/* Floating Ambient Nebulas (Scaled & Blurred responsively) */}
      <div className="absolute top-[-10%] left-[-10%] w-[80vw] sm:w-[55vw] h-[80vw] sm:h-[55vw] bg-cyan-300/25 dark:bg-purple-900/15 rounded-full blur-[70px] sm:blur-[140px] animate-pulse pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[80vw] sm:w-[55vw] h-[80vw] sm:h-[55vw] bg-blue-300/25 dark:bg-cyan-900/15 rounded-full blur-[70px] sm:blur-[140px] animate-pulse pointer-events-none" />
      <div className="absolute top-[35%] right-[5%] w-[60vw] sm:w-[40vw] h-[60vw] sm:h-[40vw] bg-indigo-300/15 dark:bg-indigo-900/15 rounded-full blur-[80px] sm:blur-[160px] pointer-events-none" />

      {/* Interactive 60FPS High-DPI Canvas Layer */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-90" />

      {/* Premium Edge Vignette Gradient Overlay */}
      {/* Dark mode: Smooth radial fade to deep black (#000000) around screen edges */}
      {/* Light mode: Soft slate border vignette (rgba(148,163,184,0.7)) around screen edges */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_25%,rgba(241,245,249,0.2)_55%,rgba(203,213,225,0.5)_85%,rgba(148,163,184,0.75)_100%)] dark:bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(2,6,23,0.35)_55%,rgba(0,0,0,0.85)_85%,#000000_100%)] z-10" />
    </div>
  );
}

