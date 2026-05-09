"use client";

import { useTheme } from "@/components/theme-provider";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function ThemeSwitcher() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-900/60 p-1.5 rounded-full border border-slate-200 dark:border-slate-800/50 shadow-inner w-[84px] h-[40px]">
            </div>
        );
    }

    return (
        <button 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className={cn(
                "relative flex items-center w-[72px] h-9 p-1 rounded-full transition-all duration-500 cursor-pointer overflow-hidden",
                theme === 'dark' 
                    ? "bg-slate-900 border border-slate-800 shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]" 
                    : "bg-slate-100 border border-slate-200 shadow-[inset_0_2px_8px_rgba(0,0,0,0.05)]"
            )}
        >
            {/* Sliding Knob */}
            <div 
                className={cn(
                    "absolute w-7 h-7 rounded-full transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] flex items-center justify-center shadow-lg transform",
                    theme === 'dark' 
                        ? "translate-x-0 bg-slate-800 text-blue-400 border border-slate-700 shadow-blue-500/10" 
                        : "translate-x-9 bg-white text-orange-500 border border-slate-100 shadow-orange-500/10"
                )}
            >
                {theme === 'dark' ? <Moon className="w-3.5 h-3.5 fill-blue-400/20" /> : <Sun className="w-3.5 h-3.5 fill-orange-400/20" />}
            </div>

            {/* Background Icons (Subtle) */}
            <div className="flex justify-between w-full px-2.5 opacity-20 pointer-events-none">
                <Moon className={cn("w-3.5 h-3.5 transition-opacity", theme === 'dark' ? "opacity-0" : "opacity-100")} />
                <Sun className={cn("w-3.5 h-3.5 transition-opacity", theme === 'light' ? "opacity-0" : "opacity-100")} />
            </div>
        </button>
    );
}
