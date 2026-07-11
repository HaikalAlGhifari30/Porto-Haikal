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
                className="flex items-center gap-2 px-5 py-3 bg-primary hover:bg-primary/90 text-white font-bold text-sm rounded-2xl transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5"
            >
                <Plus className="w-4 h-4" />
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
