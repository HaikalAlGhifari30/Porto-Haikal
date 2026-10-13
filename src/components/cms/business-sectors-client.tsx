"use client";

import { useState } from "react";
import { SectorFormToggle } from "@/components/cms/sector-form-toggle";
import { SectorSortableList } from "@/components/cms/sector-sortable-list";
import { Lightbulb } from "lucide-react";
import { BusinessSector } from "@prisma/client";

export function BusinessSectorsClient({ initialSectors }: { initialSectors: BusinessSector[] }) {
    const [sectors, setSectors] = useState(initialSectors);

    function handleAdd(sector: BusinessSector) {
        setSectors(prev => [...prev, sector]);
    }

    return (
        <div className="space-y-6">
            <div className="mb-10">
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                    <div className="flex-1">
                        <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-white uppercase">
                            Manajemen Bidang Usaha
                        </h2>
                        <p className="text-sm text-slate-500 dark:text-zinc-400 mt-2 font-medium leading-relaxed max-w-2xl">
                            Kelola daftar bidang usaha PT Rizky Rijaya Karya yang ditampilkan di landing page.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row lg:items-center gap-6 mt-6">
                    {/* Info tip */}
                    <div className="flex-1 flex items-center gap-4 p-5 rounded-none bg-[#FACC15]/10 border-2 border-black dark:border-white shadow-retro-xs animate-in fade-in slide-in-from-top-1 duration-500">
                        <div className="p-2.5 rounded-none bg-[#FACC15] text-black border-2 border-black dark:border-white shrink-0">
                            <Lightbulb className="w-5 h-5" />
                        </div>
                        <p className="text-[11px] md:text-xs text-slate-800 dark:text-zinc-200 leading-relaxed font-bold">
                            <span className="font-black text-amber-500 dark:text-[#FACC15] mr-1 uppercase tracking-widest">Tips:</span>
                            Gunakan fitur <strong className="text-black dark:text-[#FACC15]">Drag &amp; Drop</strong> pada daftar di bawah untuk mengatur urutan tampil.
                        </p>
                    </div>

                    <div className="shrink-0 flex justify-end">
                        <SectorFormToggle onAdd={handleAdd} />
                    </div>
                </div>
            </div>

            <div className="h-px bg-gradient-to-r from-slate-200 via-transparent to-transparent dark:from-zinc-800" />

            <SectorSortableList initialSectors={sectors} />
        </div>
    );
}
