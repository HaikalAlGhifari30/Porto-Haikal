"use client";

import { cn } from "@/lib/utils";

interface HagLogoProps {
  className?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  useImage?: boolean;
}

export function HagLogo({ className, size = "md", useImage = false }: HagLogoProps) {
  const sizeClasses = {
    xs: "w-6 h-6",
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  };

  if (useImage) {
    return (
      <div
        className={cn(
          "relative bg-[#FACC15] border-2 border-black dark:border-white shadow-retro-xs shrink-0 p-0.5 overflow-hidden flex items-center justify-center",
          sizeClasses[size],
          className
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/favicon.png"
          alt="HAG Logo"
          className="w-full h-full object-contain"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative bg-[#FACC15] text-black border-2 border-black dark:border-white shadow-retro-xs shrink-0 flex items-center justify-center p-1 select-none",
        sizeClasses[size],
        className
      )}
    >
      <svg
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        shapeRendering="crispEdges"
        className="w-full h-full text-black fill-current"
      >
        {/* H Left Column */}
        <rect x="20" y="22" width="16" height="66" fill="currentColor" />
        {/* H Crossbar to G Path */}
        <path
          d="M 20 48 H 64 V 88 H 96 V 60 H 72"
          fill="none"
          stroke="currentColor"
          strokeWidth="16"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
        {/* Accent Pixel Top Right */}
        <rect x="80" y="22" width="16" height="16" fill="currentColor" />
      </svg>
    </div>
  );
}
