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
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-zinc-900/50 p-4 rounded-[2rem] border border-slate-100 dark:border-zinc-800/50 backdrop-blur-sm">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input 
                        placeholder="Cari divisi..." 
                        className="h-11 pl-12 rounded-xl bg-slate-50 dark:bg-zinc-950 border-slate-200 dark:border-zinc-800"
                        value={searchQuery}
                        onChange={(e) => handleSearchChange(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-6 px-4">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-widest">Total Divisi</span>
                        <span className="text-lg font-bold text-slate-900 dark:text-white">{teams.length}</span>
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
                <div className="flex flex-col items-center justify-center py-24 border-2 border-dashed border-slate-200 dark:border-zinc-800 rounded-[3rem] bg-slate-50/50 dark:bg-zinc-900/10 text-center">
                    <Search className="w-12 h-12 text-slate-200 dark:text-zinc-800 mb-4" />
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Divisi tidak ditemukan</h3>
                    <p className="text-sm text-slate-400 dark:text-zinc-500 max-w-xs">Coba cari dengan kata kunci lain atau reset filter pencarian Anda.</p>
                </div>
            )}
        </div>
    );
}
