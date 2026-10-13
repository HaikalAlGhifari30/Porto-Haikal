"use client";

import { useState } from "react";
import { DivisionCard } from "@/components/division-card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface DivisionListCMSProps {
    teams: any[];
}

export function DivisionListCMS({ teams }: DivisionListCMSProps) {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredTeams = teams.filter(team => 
        team.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSearchChange = (val: string) => {
        setSearchQuery(val);
    };

    return (
        <div className="space-y-8">
            {/* Search & Stats Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#FAF6ED] dark:bg-[#151B22] p-4 rounded-none border-2 border-black dark:border-white shadow-retro-sm">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <Input 
                        placeholder="Cari divisi..." 
                        className="h-11 pl-12 rounded-none bg-white dark:bg-[#0E1217] border-2 border-black dark:border-white font-bold"
                        value={searchQuery}
                        onChange={(e) => handleSearchChange(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-6 px-4">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black text-slate-700 dark:text-zinc-300 uppercase tracking-widest">Total Divisi</span>
                        <span className="text-xl font-black text-slate-900 dark:text-white">{teams.length}</span>
                    </div>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {filteredTeams.map((team) => (
                    <DivisionCard key={team.id} team={team} isCms />
                ))}
            </div>

            {/* Empty State */}
            {filteredTeams.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-black dark:border-white rounded-none bg-white dark:bg-[#0E1217] text-center p-8">
                    <Search className="w-10 h-10 text-slate-400 dark:text-zinc-600 mb-3" />
                    <h3 className="text-base font-black uppercase text-slate-900 dark:text-white mb-1">Divisi tidak ditemukan</h3>
                    <p className="text-xs text-slate-600 dark:text-zinc-400 font-bold max-w-xs">Coba cari dengan kata kunci lain atau reset filter pencarian Anda.</p>
                </div>
            )}
        </div>
    );
}
