"use client";

import { cn } from "@/lib/utils";

interface HagLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  useImage?: boolean;
}

export function HagLogo({ className, size = "md", useImage = false }: HagLogoProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  };

  if (useImage) {
    return (
      <div className={cn("relative rounded-2xl overflow-hidden shadow-lg p-[1.5px] bg-gradient-to-tr from-cyan-400 via-blue-500 to-indigo-600 shrink-0 group-hover:scale-105 transition-transform duration-300 shadow-blue-500/25", sizeClasses[size], className)}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hag-logo.png"
          alt="HAG Logo"
          className="w-full h-full object-cover rounded-[14px]"
        />
      </div>
    );
  }

  return (
    <div className={cn("relative rounded-2xl p-[1.5px] bg-gradient-to-tr from-cyan-400 via-blue-500 to-indigo-600 shadow-lg shadow-blue-500/25 shrink-0 group-hover:scale-105 transition-transform duration-300", sizeClasses[size], className)}>
      <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center p-1.5 backdrop-blur-md">
        <svg
          viewBox="0 0 100 130"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-cyan-400 stroke-current"
        >
          {/* H Top */}
          <path
            d="M24 15V60M76 15V60M24 38H76"
            strokeWidth="9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* A Middle bar */}
          <path
            d="M24 55H76"
            strokeWidth="7"
            strokeLinecap="round"
          />
          {/* G Bottom square */}
          <path
            d="M76 60V115H24V75H76V95H52"
            strokeWidth="9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
