"use client";

import { useState, useRef } from "react";
import { 
    DndContext, 
    closestCenter, 
    KeyboardSensor, 
    PointerSensor, 
    useSensor, 
    useSensors,
    DragEndEvent 
} from "@dnd-kit/core";
import { 
    arrayMove, 
    SortableContext, 
    sortableKeyboardCoordinates, 
    horizontalListSortingStrategy,
    useSortable
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Plus, Trash2, Settings2, GripVertical, ImageIcon, Loader2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { addHeroSlide, deleteHeroSlide, reorderHeroSlides, updateHeroSlide } from "@/actions/hero";
import { SlideSettingsModal } from "./slide-settings-modal";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface HeroSlide {
    id: string;
    title: string | null;
    subtitle: string | null;
    buttonText: string | null;
    buttonLink: string | null;
    imageUrl: string;
    overlayDarkness: number;
    order: number;
    isActive: boolean;
}

interface HeroCarouselManagerProps {
    initialSlides: HeroSlide[];
}

export function HeroCarouselManager({ initialSlides }: HeroCarouselManagerProps) {
    const [slides, setSlides] = useState<HeroSlide[]>(initialSlides);
    const [isSaving, setIsSaving] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [deleteId, setDeleteId] = useState<string | null>(null);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const oldIndex = slides.findIndex((i) => i.id === active.id);
            const newIndex = slides.findIndex((i) => i.id === over.id);
            const newItems = arrayMove(slides, oldIndex, newIndex);
            
            // Optimistic update
            const originalSlides = [...slides];
            setSlides(newItems);
            
            try {
                await reorderHeroSlides(newItems.map(i => i.id));
                toast.success("Urutan diperbarui");
            } catch (error) {
                setSlides(originalSlides);
                toast.error("Gagal menyimpan urutan");
            }
        }
    };

    const handleAddSlide = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || isUploading) return;

        if (file.size > 5 * 1024 * 1024) {
            toast.error("File terlalu besar (Maks 5MB)");
            return;
        }

        setIsUploading(true);
        const formData = new FormData();
        formData.append("image", file);

        try {
            const newSlide = await addHeroSlide(formData);
            setSlides([...slides, newSlide as HeroSlide]);
            toast.success("Banner berhasil ditambahkan");
        } catch (error) {
            toast.error("Gagal mengunggah banner");
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    const handleDelete = (id: string) => {
        setDeleteId(id);
    };

    const confirmDelete = async () => {
        if (!deleteId) return;
        const targetId = deleteId;
        setDeleteId(null);
        
        const oldSlides = [...slides];
        setSlides(slides.filter(s => s.id !== targetId));
        
        try {
            await deleteHeroSlide(targetId);
            toast.success("Banner dihapus");
        } catch (error) {
            setSlides(oldSlides);
            toast.error("Gagal menghapus banner");
        }
    };

    const handleUpdate = async (id: string, data: any) => {
        if (isSaving) return;
        setIsSaving(true);
        try {
            await updateHeroSlide(id, data);
            setSlides(slides.map(s => s.id === id ? { ...s, ...data } : s));
            toast.success("Pengaturan slide disimpan");
        } catch (error) {
            toast.error("Gagal menyimpan pengaturan");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Daftar Gambar Banner</h3>
                    <p className="text-sm text-slate-500 dark:text-zinc-400">Maksimal 5 banner disarankan untuk performa terbaik.</p>
                </div>
                <div className="flex items-center gap-4">
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleAddSlide} 
                        className="hidden" 
                        accept="image/*"
                    />
                    {slides.length < 5 && (
                        <Button 
                            onClick={() => fileInputRef.current?.click()}
                            disabled={isUploading}
                            className="rounded-2xl bg-blue-600 hover:bg-blue-700 font-bold"
                        >
                            {isUploading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Plus className="w-4 h-4 mr-2" />}
                            Tambah Foto
                        </Button>
                    )}
                </div>
            </div>

            <DndContext 
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext 
                    items={slides.map(s => s.id)}
                    strategy={horizontalListSortingStrategy}
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                        {slides.map((slide, index) => (
                            <SortableSlide 
                                key={slide.id} 
                                slide={slide} 
                                isFirst={index === 0}
                                onDelete={() => handleDelete(slide.id)}
                                onUpdate={(data) => handleUpdate(slide.id, data)}
                                isSaving={isSaving}
                            />
                        ))}
                        
                        {slides.length < 5 && !isUploading && (
                            <button 
                                onClick={() => fileInputRef.current?.click()}
                                className="aspect-[16/9] rounded-[2rem] border-2 border-dashed border-slate-200 dark:border-zinc-800 flex flex-col items-center justify-center gap-2 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all group"
                            >
                                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-zinc-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <Plus className="w-5 h-5 text-slate-400 dark:text-zinc-500" />
                                </div>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-zinc-500">Tambah Foto</span>
                            </button>
                        )}
                        
                        {isUploading && (
                            <div className="aspect-[16/9] rounded-[2rem] border-2 border-blue-500/30 bg-blue-500/5 flex flex-col items-center justify-center gap-2 animate-pulse">
                                <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                                <span className="text-[10px] font-bold uppercase tracking-widest text-blue-500">Mengunggah...</span>
                            </div>
                        )}
                    </div>
                </SortableContext>
            </DndContext>

            {/* Instructions & Recommendations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-[2rem] bg-blue-500/5 border border-blue-500/10">
                    <h4 className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-widest mb-3">
                        <Settings2 className="w-4 h-4" /> Instruksi Pengurutan
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
                        Anda dapat <strong className="text-blue-600 dark:text-blue-400">menarik dan melepas (drag & drop)</strong> gambar untuk mengubah urutannya. Gambar paling kiri dengan label <strong className="text-emerald-500 uppercase">"Tampil Pertama"</strong> akan menjadi banner utama.
                    </p>
                </div>
                <div className="p-6 rounded-[2rem] bg-amber-500/5 border border-amber-500/10">
                    <h4 className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-xs uppercase tracking-widest mb-3">
                        <ImageIcon className="w-4 h-4" /> Rekomendasi
                    </h4>
                    <ul className="space-y-2 text-sm text-slate-600 dark:text-zinc-400">
                        <li className="flex items-start gap-2">
                            <span className="text-amber-500">•</span>
                            Gunakan rasio aspek lebar (21:9 atau 16:9) untuk hasil maksimal.
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-amber-500">•</span>
                            Pastikan file di bawah 5MB agar loading cepat.
                        </li>
                    </ul>
                </div>
            </div>
            {/* Delete Confirmation Modal */}
            <Dialog open={deleteId !== null} onOpenChange={(open) => !open && setDeleteId(null)}>
                <DialogContent className="sm:max-w-sm bg-white dark:bg-slate-900 border-slate-200 dark:border-zinc-800 rounded-[3rem] p-10 flex flex-col items-center text-center">
                    <div className="w-24 h-24 rounded-[2rem] bg-red-100 dark:bg-red-500/10 flex items-center justify-center mb-8 text-red-500 border-2 border-red-500/20 shadow-xl shadow-red-500/5">
                        <AlertTriangle className="w-12 h-12" />
                    </div>
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-black text-slate-900 dark:text-white mb-3">Hapus Banner?</DialogTitle>
                    </DialogHeader>
                    <p className="text-sm text-slate-500 dark:text-zinc-400 mb-10 leading-relaxed font-medium">
                        Apakah Anda yakin ingin menghapus banner ini? Tindakan ini permanen.
                    </p>
                    <div className="flex w-full gap-4">
                        <Button 
                            variant="outline" 
                            className="flex-1 h-14 rounded-2xl border-slate-200 dark:border-zinc-800 font-bold hover:bg-slate-50 dark:hover:bg-zinc-800 transition-all"
                            onClick={() => setDeleteId(null)}
                        >
                            Batal
                        </Button>
                        <Button 
                            variant="destructive" 
                            className="flex-1 h-14 rounded-2xl bg-red-500 hover:bg-red-600 text-white font-black uppercase tracking-widest shadow-xl shadow-red-500/20 hover:shadow-red-500/40 hover:-translate-y-1 transition-all"
                            onClick={confirmDelete}
                        >
                            Hapus
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}

function SortableSlide({ slide, isFirst, onDelete, onUpdate, isSaving }: { 
    slide: HeroSlide, 
    isFirst: boolean,
    onDelete: () => void,
    onUpdate: (data: any) => void,
    isSaving: boolean
}) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id: slide.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 50 : 0,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <div 
            ref={setNodeRef} 
            style={style}
            className="group relative aspect-[16/9] rounded-[2rem] overflow-hidden border border-slate-200 dark:border-zinc-800 bg-zinc-900 shadow-xl"
        >
            <img 
                src={slide.imageUrl} 
                alt="Banner" 
                className="w-full h-full object-cover"
            />
            
            {/* Status Badges */}
            {isFirst && (
                <div className="absolute top-4 left-4 px-3 py-1 bg-emerald-500 text-white text-[8px] font-black uppercase tracking-widest rounded-full shadow-lg">
                    • Tampil Pertama
                </div>
            )}
            
            {!slide.isActive && (
                <div className="absolute bottom-4 right-4 px-3 py-1 bg-zinc-800 text-white text-[8px] font-black uppercase tracking-widest rounded-full border border-white/10 shadow-lg">
                    Nonaktif
                </div>
            )}

            {/* Actions Overlay */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-[2px]">
                {/* Settings - Top Left */}
                <div className="absolute top-3 left-3">
                    <SlideSettingsModal slide={slide} onSave={onUpdate} isSaving={isSaving}>
                        <Button size="icon" className="w-10 h-10 rounded-2xl bg-blue-600 hover:bg-blue-700 border-none text-white shadow-xl transition-all hover:scale-110 active:scale-95">
                            <Settings2 className="w-5 h-5" />
                        </Button>
                    </SlideSettingsModal>
                </div>

                {/* Delete - Top Right */}
                <div className="absolute top-3 right-3">
                    <Button 
                        size="icon" 
                        variant="destructive" 
                        className="w-10 h-10 rounded-2xl bg-red-500 hover:bg-red-600 border-none text-white shadow-xl transition-all hover:scale-110 active:scale-95"
                        onClick={() => onDelete()}
                    >
                        <Trash2 className="w-5 h-5" />
                    </Button>
                </div>

                {/* Drag Handle - Bottom Center */}
                <div 
                    {...attributes} 
                    {...listeners}
                    className="absolute bottom-3 left-1/2 -translate-x-1/2 w-20 h-10 rounded-2xl bg-white/10 hover:bg-white/20 flex items-center justify-center cursor-grab active:cursor-grabbing text-white border border-white/20 backdrop-blur-md transition-all group/handle"
                >
                    <GripVertical className="w-6 h-6 group-hover/handle:scale-110 transition-transform" />
                </div>
            </div>
        </div>
    );
}
