"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { SectorFormModal } from "./sector-form-modal";
import { BusinessSector } from "@prisma/client";

export function SectorFormToggle({ onAdd }: { onAdd: (sector: BusinessSector) => void }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-2 h-11 px-6 bg-[#FACC15] hover:bg-yellow-300 text-black font-black uppercase text-xs rounded-none border-2 border-black dark:border-white transition-all shadow-retro-xs"
            >
                <Plus className="w-4 h-4 stroke-[3]" />
                Tambah Bidang Usaha
            </button>

            {isOpen && (
                <SectorFormModal
                    onClose={() => setIsOpen(false)}
                    onSuccess={(sector) => {
                        onAdd(sector);
                        setIsOpen(false);
                    }}
                />
            )}
        </>
    );
}
