"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface ProjectStatsCMSProps {
    totalProjects: number;
    onSearch: (query: string) => void;
}

export function ProjectStatsCMS({ totalProjects, onSearch }: ProjectStatsCMSProps) {
    const [query, setQuery] = useState("");

    const handleSearch = (val: string) => {
        setQuery(val);
        onSearch(val);
    };

    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-zinc-900/50 p-4 rounded-[2rem] border border-slate-100 dark:border-zinc-800/50 backdrop-blur-sm shadow-sm">
            <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input 
                    placeholder="Cari proyek..." 
                    className="h-11 pl-12 rounded-xl bg-slate-50 dark:bg-zinc-950 border-slate-200 dark:border-zinc-800 focus:ring-blue-500/20"
                    value={query}
                    onChange={(e) => handleSearch(e.target.value)}
                />
            </div>
            <div className="flex items-center gap-6 px-4">
                <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-widest">Total Proyek</span>
                    <span className="text-lg font-bold text-slate-900 dark:text-white">{totalProjects}</span>
                </div>
            </div>
        </div>
    );
}
