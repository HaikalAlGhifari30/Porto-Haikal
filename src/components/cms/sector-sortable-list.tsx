"use client";

import { useState, useTransition } from "react";
import * as Icons from "lucide-react";
import { Pencil, Trash2, GripVertical, Eye, EyeOff, AlertTriangle } from "lucide-react";
import { deleteBusinessSector, reorderBusinessSectors } from "@/actions/business-sector";
import { toast } from "sonner";
import { SectorFormModal } from "./sector-form-modal";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
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
            className="flex items-center gap-4 p-4 bg-[#FAF6ED] dark:bg-[#151B22] rounded-none border-2 border-black dark:border-white shadow-retro-xs hover:shadow-retro-sm transition-all duration-300"
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
                    className="w-12 h-12 rounded-none object-cover border-2 border-black dark:border-white shrink-0"
                />
            ) : DynamicIcon ? (
                <div className="w-12 h-12 rounded-none bg-[#FACC15] text-black border-2 border-black flex items-center justify-center shrink-0 shadow-retro-xs">
                    <DynamicIcon className="w-6 h-6 stroke-[2.5]" />
                </div>
            ) : (
                <div className="w-12 h-12 rounded-none bg-[#FACC15] text-black border-2 border-black flex items-center justify-center shrink-0 shadow-retro-xs">
                    <span className="text-xl font-black">{sector.name.charAt(0)}</span>
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
                    className="w-9 h-9 rounded-none bg-white dark:bg-[#0E1217] border-2 border-black dark:border-white flex items-center justify-center text-black dark:text-white hover:bg-[#FACC15] dark:hover:bg-[#FACC15] hover:text-black transition-all shrink-0 shadow-retro-xs"
                    title="Edit"
                >
                    <Pencil className="w-4 h-4" />
                </button>
                <button
                    onClick={() => onDelete(sector.id)}
                    className="w-9 h-9 rounded-none bg-red-500 border-2 border-black dark:border-white flex items-center justify-center text-white hover:bg-red-600 transition-all shrink-0 shadow-retro-xs"
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
    const [deleteId, setDeleteId] = useState<string | null>(null);

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
        setDeleteId(id);
    }

    const confirmDelete = () => {
        if (!deleteId) return;
        const targetId = deleteId;
        setDeleteId(null);
        startTransition(async () => {
            try {
                await deleteBusinessSector(targetId);
                setSectors(prev => prev.filter(s => s.id !== targetId));
                toast.success("Bidang usaha berhasil dihapus");
            } catch {
                toast.error("Gagal menghapus");
            }
        });
    };

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

            {/* Delete Confirmation Modal */}
            <Dialog open={deleteId !== null} onOpenChange={(open) => !open && setDeleteId(null)}>
                <DialogContent className="sm:max-w-sm bg-white dark:bg-slate-900 border-slate-200 dark:border-zinc-800 rounded-[3rem] p-10 flex flex-col items-center text-center">
                    <div className="w-24 h-24 rounded-[2rem] bg-red-100 dark:bg-red-500/10 flex items-center justify-center mb-8 text-red-500 border-2 border-red-500/20 shadow-xl shadow-red-500/5">
                        <AlertTriangle className="w-12 h-12" />
                    </div>
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-black text-slate-900 dark:text-white mb-3">Hapus Bidang Usaha?</DialogTitle>
                    </DialogHeader>
                    <p className="text-sm text-slate-500 dark:text-zinc-400 mb-10 leading-relaxed font-medium">
                        Tindakan ini permanen. Bidang usaha yang dipilih akan dihapus selamanya dari sistem.
                    </p>
                    <div className="flex w-full gap-3">
                        <Button 
                            variant="outline" 
                            className="flex-1 h-11 rounded-none border-2 border-black dark:border-white font-black uppercase text-xs hover:bg-slate-200 dark:hover:bg-zinc-800 transition-all"
                            onClick={() => setDeleteId(null)}
                            disabled={isPending}
                        >
                            Batal
                        </Button>
                        <Button 
                            variant="destructive" 
                            className="flex-1 h-11 rounded-none bg-red-500 hover:bg-red-600 text-white font-black uppercase text-xs border-2 border-black shadow-retro-xs transition-all"
                            onClick={confirmDelete}
                            disabled={isPending}
                        >
                            {isPending ? "..." : "Hapus"}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
