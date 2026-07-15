"use client";

import { useTheme } from "@/components/theme-provider";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function ThemeSwitcher() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [systemPrefersDark, setSystemPrefersDark] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (typeof window !== "undefined") {
            const media = window.matchMedia("(prefers-color-scheme: dark)");
            setSystemPrefersDark(media.matches);
            const listener = (e: MediaQueryListEvent) => setSystemPrefersDark(e.matches);
            media.addEventListener("change", listener);
            return () => media.removeEventListener("change", listener);
        }
    }, []);

    if (!mounted) {
        return (
            <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-900/60 p-1.5 rounded-full border border-slate-200 dark:border-slate-800/50 shadow-inner w-[84px] h-[40px]">
            </div>
        );
    }

    const isDark = theme === "system" ? systemPrefersDark : theme === "dark";

    return (
        <button 
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className={cn(
                "relative flex items-center w-[60px] h-7 p-0.5 rounded-full transition-all duration-500 cursor-pointer overflow-hidden",
                isDark 
                    ? "bg-slate-950 border border-slate-800 shadow-inner" 
                    : "bg-slate-200/50 border border-slate-300/50 shadow-inner"
            )}
        >
            {/* Sliding Knob */}
            <div 
                className={cn(
                    "absolute w-6 h-6 rounded-full transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] flex items-center justify-center shadow-md transform",
                    isDark 
                        ? "translate-x-0 bg-slate-800 text-blue-400 border border-slate-700" 
                        : "translate-x-8 bg-white text-orange-500 border border-slate-100"
                )}
            >
                {isDark ? <Moon className="w-3 h-3 fill-blue-400/10" /> : <Sun className="w-3 h-3 fill-orange-400/10" />}
            </div>

            {/* Background Icons (Subtle) */}
            <div className="flex justify-between w-full px-2 opacity-30 pointer-events-none">
                <Moon className={cn("w-3 h-3 transition-opacity", isDark ? "opacity-0" : "opacity-100")} />
                <Sun className={cn("w-3 h-3 transition-opacity", !isDark ? "opacity-0" : "opacity-100")} />
            </div>
        </button>
    );
}
