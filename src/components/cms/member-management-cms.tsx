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
                            className="h-12 pl-12 rounded-2xl bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 focus:ring-blue-500/20"
                            value={searchQuery}
                            onChange={(e) => handleSearchChange(e.target.value)}
                        />
                    </div>
                    <div className="relative w-full md:w-64">
                        <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <select 
                            className="w-full h-12 pl-12 rounded-2xl bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 appearance-none font-medium"
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
                    <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-zinc-800/50">
                        <p className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-widest">
                            Menampilkan {((currentPage - 1) * itemsPerPage) + 1} sampai {Math.min(currentPage * itemsPerPage, filteredMembers.length)} dari {filteredMembers.length} anggota
                        </p>
                        <div className="flex items-center gap-2">
                            <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                disabled={currentPage === 1}
                                className="h-10 w-10 rounded-xl"
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
                                            "h-10 w-10 rounded-xl font-bold",
                                            currentPage === page ? "bg-blue-600 text-white" : "text-slate-500"
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
                                className="h-10 w-10 rounded-xl"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                )}

                {filteredMembers.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-24 border-2 border-dashed border-slate-200 dark:border-zinc-800 rounded-[3rem] bg-slate-50/50 dark:bg-zinc-900/10">
                        <UserCheck className="w-12 h-12 text-slate-200 dark:text-zinc-800 mb-4" />
                        <p className="text-slate-400 dark:text-zinc-500 font-medium">
                            {searchQuery || positionFilter !== "all" 
                                ? "Tidak ada anggota yang cocok dengan filter." 
                                : "Belum ada anggota di divisi ini."}
                        </p>
                        {(searchQuery || positionFilter !== "all") && (
                            <button 
                                onClick={() => { setSearchQuery(""); setPositionFilter("all"); setCurrentPage(1); }}
                                className="mt-4 text-blue-500 font-bold text-sm hover:underline"
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
