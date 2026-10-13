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
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-[#151B22] p-4 rounded-2xl border-2 border-black dark:border-white shadow-retro-xs">
            <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input 
                    placeholder="Cari proyek..." 
                    className="h-10 pl-12 rounded-none bg-[#FAF6ED] dark:bg-[#0E1217] border-2 border-black dark:border-white font-medium" 
                    value={query}
                    onChange={(e) => handleSearch(e.target.value)}
                />
            </div>
            <div className="flex items-center gap-6 px-4">
                <div className="flex flex-col">
                    <span className="text-[10px] font-black text-slate-700 dark:text-zinc-300 uppercase tracking-widest">Total Proyek</span>
                    <span className="text-xl font-black text-slate-900 dark:text-white">{totalProjects}</span>
                </div>
            </div>
        </div>
    );
}
