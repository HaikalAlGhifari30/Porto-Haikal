"use client";

import { useState, useTransition } from "react";
import * as Icons from "lucide-react";
import { Pencil, Trash2, GripVertical, Eye, EyeOff } from "lucide-react";
import { deleteBusinessSector, reorderBusinessSectors } from "@/actions/business-sector";
import { toast } from "sonner";
import { SectorFormModal } from "./sector-form-modal";
import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { BusinessSector } from "@prisma/client";

function SectorRow({ sector, onEdit, onDelete }: {
    sector: BusinessSector;
    onEdit: (s: BusinessSector) => void;
    onDelete: (id: string) => void;
}) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: sector.id });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    const DynamicIcon = sector.icon ? (Icons as any)[sector.icon] : null;

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="flex items-center gap-4 p-4 bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm hover:border-primary/30 transition-all duration-300"
        >
            <button
                {...attributes}
                {...listeners}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-grab active:cursor-grabbing p-1"
            >
                <GripVertical className="w-5 h-5" />
            </button>

            {sector.imageUrl ? (
                <img
                    src={sector.imageUrl}
                    alt={sector.name}
                    className="w-12 h-12 rounded-xl object-cover border border-slate-100 dark:border-zinc-800 shrink-0"
                />
            ) : DynamicIcon ? (
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <DynamicIcon className="w-6 h-6" />
                </div>
            ) : (
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-xl font-bold text-primary">{sector.name.charAt(0)}</span>
                </div>
            )}

            <div className="flex-1 min-w-0">
                <p className="font-bold text-slate-900 dark:text-white truncate">{sector.name}</p>
                {sector.nameEn && (
                    <p className="text-xs text-slate-400 truncate">{sector.nameEn}</p>
                )}
                <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5 line-clamp-1">{sector.description}</p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
                <button
                    onClick={() => onEdit(sector)}
                    className="w-9 h-9 rounded-full bg-blue-500/10 backdrop-blur-md border border-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-500 hover:bg-blue-600 hover:text-white transition-all shrink-0"
                    title="Edit"
                >
                    <Pencil className="w-4 h-4" />
                </button>
                <button
                    onClick={() => onDelete(sector.id)}
                    className="w-9 h-9 rounded-full bg-red-500/10 backdrop-blur-md border border-red-500/20 flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all shrink-0"
                    title="Hapus"
                >
                    <Trash2 className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}

export function SectorSortableList({ initialSectors }: { initialSectors: BusinessSector[] }) {
    const [sectors, setSectors] = useState(initialSectors);
    const [editSector, setEditSector] = useState<BusinessSector | null>(null);
    const [isPending, startTransition] = useTransition();

    const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        const oldIndex = sectors.findIndex(s => s.id === active.id);
        const newIndex = sectors.findIndex(s => s.id === over.id);
        const reordered = arrayMove(sectors, oldIndex, newIndex);
        setSectors(reordered);

        startTransition(async () => {
            try {
                await reorderBusinessSectors(reordered.map(s => s.id));
                toast.success("Urutan berhasil disimpan");
            } catch {
                toast.error("Gagal menyimpan urutan");
            }
        });
    }

    function handleDelete(id: string) {
        if (!confirm("Hapus bidang usaha ini?")) return;
        startTransition(async () => {
            try {
                await deleteBusinessSector(id);
                setSectors(prev => prev.filter(s => s.id !== id));
                toast.success("Bidang usaha berhasil dihapus");
            } catch {
                toast.error("Gagal menghapus");
            }
        });
    }

    return (
        <>
            {editSector && (
                <SectorFormModal
                    sector={editSector}
                    onClose={() => setEditSector(null)}
                    onSuccess={(updated) => {
                        setSectors(prev => prev.map(s => s.id === updated.id ? updated : s));
                        setEditSector(null);
                    }}
                />
            )}

            {sectors.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-slate-400 dark:text-zinc-600">
                    <p className="text-lg font-semibold">Belum ada bidang usaha</p>
                    <p className="text-sm mt-1">Klik tombol &quot;Tambah Bidang Usaha&quot; untuk menambahkan.</p>
                </div>
            ) : (
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext items={sectors.map(s => s.id)} strategy={verticalListSortingStrategy}>
                        <div className="space-y-3">
                            {sectors.map(sector => (
                                <SectorRow
                                    key={sector.id}
                                    sector={sector}
                                    onEdit={setEditSector}
                                    onDelete={handleDelete}
                                />
                            ))}
                        </div>
                    </SortableContext>
                </DndContext>
            )}
        </>
    );
}
