"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search, Filter, UserCheck, ChevronLeft, ChevronRight } from "lucide-react";
import { AddMemberModal } from "./add-member-modal";
import { MemberCardRow } from "./member-card-row";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MemberManagementCMSProps {
    teamId: string;
    members: any[];
    positions: any[];
}

export function MemberManagementCMS({ teamId, members, positions }: MemberManagementCMSProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [positionFilter, setPositionFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const filteredMembers = members.filter(member => {
        const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesPosition = positionFilter === "all" || member.positionId === positionFilter;
        return matchesSearch && matchesPosition;
    });

    const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);
    const paginatedMembers = filteredMembers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Reset to page 1 when filter changes
    const handleSearchChange = (val: string) => {
        setSearchQuery(val);
        setCurrentPage(1);
    };

    const handleFilterChange = (val: string) => {
        setPositionFilter(val);
        setCurrentPage(1);
    };

    return (
        <div className="space-y-8">
            {/* Header & Search Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex-1 flex flex-col md:flex-row items-center gap-4 max-w-2xl">
                    <div className="relative flex-1 w-full">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input 
                            placeholder="Cari anggota berdasarkan nama..." 
                            className="h-11 pl-12 rounded-none bg-white dark:bg-[#0E1217] border-2 border-black dark:border-white font-bold text-sm"
                            value={searchQuery}
                            onChange={(e) => handleSearchChange(e.target.value)}
                        />
                    </div>
                    <div className="relative w-full md:w-64">
                        <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <select 
                            className="w-full h-11 pl-12 rounded-none bg-white dark:bg-[#0E1217] border-2 border-black dark:border-white text-sm text-slate-900 dark:text-white focus:outline-none appearance-none font-bold"
                            value={positionFilter}
                            onChange={(e) => handleFilterChange(e.target.value)}
                        >
                            <option value="all">Semua Jabatan</option>
                            {positions.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                        </select>
                    </div>
                </div>
                
                <AddMemberModal teamId={teamId} positions={positions} />
            </div>

            {/* Member List Area */}
            <div className="space-y-4">
                {paginatedMembers.map((member) => (
                    <MemberCardRow key={member.id} member={member} positions={positions} />
                ))}

                {filteredMembers.length > 0 && (
                    <div className="flex items-center justify-between pt-6 border-t-2 border-black dark:border-white">
                        <p className="text-[10px] font-black text-slate-600 dark:text-zinc-400 uppercase tracking-widest">
                            Menampilkan {((currentPage - 1) * itemsPerPage) + 1} sampai {Math.min(currentPage * itemsPerPage, filteredMembers.length)} dari {filteredMembers.length} anggota
                        </p>
                        <div className="flex items-center gap-2">
                            <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                disabled={currentPage === 1}
                                className="h-10 w-10 rounded-none border-2 border-black dark:border-white"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </Button>
                            <div className="flex items-center gap-1">
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                    <Button
                                        key={page}
                                        variant={currentPage === page ? "default" : "ghost"}
                                        size="sm"
                                        onClick={() => setCurrentPage(page)}
                                        className={cn(
                                            "h-10 w-10 rounded-none border-2 border-black dark:border-white font-black",
                                            currentPage === page ? "bg-[#FACC15] text-black shadow-retro-xs" : "text-slate-700 dark:text-slate-200"
                                        )}
                                    >
                                        {page}
                                    </Button>
                                ))}
                            </div>
                            <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                disabled={currentPage === totalPages}
                                className="h-10 w-10 rounded-none border-2 border-black dark:border-white"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                )}

                {filteredMembers.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-24 border-2 border-dashed border-black dark:border-white rounded-none bg-[#FAF6ED] dark:bg-[#151B22]">
                        <UserCheck className="w-12 h-12 text-slate-400 mb-4" />
                        <p className="text-slate-800 dark:text-zinc-200 font-black uppercase text-sm">
                            {searchQuery || positionFilter !== "all" 
                                ? "Tidak ada anggota yang cocok dengan filter." 
                                : "Belum ada anggota di divisi ini."}
                        </p>
                        {(searchQuery || positionFilter !== "all") && (
                            <button 
                                onClick={() => { setSearchQuery(""); setPositionFilter("all"); setCurrentPage(1); }}
                                className="mt-4 text-amber-500 dark:text-[#FACC15] font-black text-sm uppercase hover:underline"
                            >
                                Atur Ulang Filter
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
