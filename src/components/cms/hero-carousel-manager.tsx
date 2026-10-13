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
                            className="rounded-none bg-[#FACC15] hover:bg-yellow-300 text-black border-2 border-black dark:border-white font-black uppercase text-xs h-11 px-6 shadow-retro-xs"
                        >
                            {isUploading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Plus className="w-4 h-4 mr-2 stroke-[3]" />}
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
                                className="aspect-[16/9] rounded-none border-2 border-dashed border-black dark:border-white bg-[#FAF6ED] dark:bg-[#151B22] flex flex-col items-center justify-center gap-2 hover:bg-[#FACC15]/10 transition-all group"
                            >
                                <div className="w-10 h-10 rounded-none bg-[#FACC15] border-2 border-black flex items-center justify-center shadow-retro-xs group-hover:scale-105 transition-transform">
                                    <Plus className="w-5 h-5 text-black stroke-[3]" />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-800 dark:text-zinc-200">Tambah Foto</span>
                            </button>
                        )}
                        
                        {isUploading && (
                            <div className="aspect-[16/9] rounded-none border-2 border-black dark:border-white bg-[#FACC15]/20 flex flex-col items-center justify-center gap-2 animate-pulse">
                                <Loader2 className="w-8 h-8 text-black dark:text-white animate-spin" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-900 dark:text-white">Mengunggah...</span>
                            </div>
                        )}
                    </div>
                </SortableContext>
            </DndContext>

            {/* Instructions & Recommendations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-none bg-[#FACC15]/10 border-2 border-black dark:border-white shadow-retro-xs">
                    <h4 className="flex items-center gap-2 text-amber-500 dark:text-[#FACC15] font-black text-xs uppercase tracking-widest mb-3">
                        <Settings2 className="w-4 h-4" /> Instruksi Pengurutan
                    </h4>
                    <p className="text-xs text-slate-800 dark:text-zinc-200 leading-relaxed font-bold">
                        Anda dapat <strong className="text-black dark:text-[#FACC15]">menarik dan melepas (drag & drop)</strong> gambar untuk mengubah urutannya. Gambar paling kiri dengan label <strong className="text-emerald-500 uppercase">"Tampil Pertama"</strong> akan menjadi banner utama.
                    </p>
                </div>
                <div className="p-6 rounded-none bg-[#FAF6ED] dark:bg-[#151B22] border-2 border-black dark:border-white shadow-retro-xs">
                    <h4 className="flex items-center gap-2 text-slate-900 dark:text-white font-black text-xs uppercase tracking-widest mb-3">
                        <ImageIcon className="w-4 h-4 text-[#FACC15]" /> Rekomendasi
                    </h4>
                    <ul className="space-y-2 text-xs text-slate-800 dark:text-zinc-300 font-bold">
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
                <DialogContent className="sm:max-w-sm bg-[#FAF6ED] dark:bg-[#151B22] border-2 border-black dark:border-white rounded-none p-8 flex flex-col items-center text-center shadow-retro-md">
                    <div className="w-16 h-16 rounded-none bg-red-500 flex items-center justify-center mb-6 text-white border-2 border-black dark:border-white shadow-retro-xs">
                        <AlertTriangle className="w-8 h-8" />
                    </div>
                    <DialogHeader>
                        <DialogTitle className="text-xl font-black uppercase text-slate-900 dark:text-white mb-2">Hapus Banner?</DialogTitle>
                    </DialogHeader>
                    <p className="text-sm text-slate-600 dark:text-zinc-300 mb-6 font-bold">
                        Apakah Anda yakin ingin menghapus banner ini? Tindakan ini permanen.
                    </p>
                    <div className="flex w-full gap-3">
                        <Button 
                            variant="outline" 
                            className="flex-1 h-11 rounded-none border-2 border-black dark:border-white font-black uppercase hover:bg-slate-200 dark:hover:bg-zinc-800"
                            onClick={() => setDeleteId(null)}
                        >
                            Batal
                        </Button>
                        <Button 
                            variant="destructive" 
                            className="flex-1 h-11 rounded-none bg-red-600 hover:bg-red-700 text-white font-black uppercase tracking-wider border-2 border-black dark:border-white shadow-retro-xs"
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
            className="group relative aspect-[16/9] rounded-none overflow-hidden border-2 border-black dark:border-white bg-[#0E1217] shadow-retro-xs hover:shadow-retro-sm transition-all"
        >
            <img 
                src={slide.imageUrl} 
                alt="Banner" 
                className="w-full h-full object-cover"
            />
            
            {/* Status Badges */}
            {isFirst && (
                <div className="absolute top-3 left-3 px-2 py-0.5 bg-[#FACC15] text-black text-[9px] font-black uppercase tracking-widest rounded-none border-2 border-black shadow-retro-xs">
                    • Utama
                </div>
            )}
            
            {!slide.isActive && (
                <div className="absolute bottom-3 right-3 px-2 py-0.5 bg-black text-white text-[9px] font-black uppercase tracking-widest rounded-none border-2 border-white shadow-retro-xs">
                    Nonaktif
                </div>
            )}

            {/* Actions Overlay */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300">
                {/* Settings - Top Left */}
                <div className="absolute top-3 left-3">
                    <SlideSettingsModal slide={slide} onSave={onUpdate} isSaving={isSaving}>
                        <Button size="icon" className="w-9 h-9 rounded-none bg-[#FACC15] hover:bg-yellow-300 border-2 border-black text-black shadow-retro-xs transition-transform active:translate-x-0.5 active:translate-y-0.5" title="Pengaturan Slide">
                            <Settings2 className="w-4 h-4" />
                        </Button>
                    </SlideSettingsModal>
                </div>

                {/* Delete - Top Right */}
                <div className="absolute top-3 right-3">
                    <Button 
                        size="icon" 
                        variant="destructive" 
                        className="w-9 h-9 rounded-none bg-red-500 hover:bg-red-600 border-2 border-black text-white shadow-retro-xs transition-transform active:translate-x-0.5 active:translate-y-0.5"
                        onClick={() => onDelete()}
                        title="Hapus Slide"
                    >
                        <Trash2 className="w-4 h-4" />
                    </Button>
                </div>

                {/* Drag Handle - Bottom Center */}
                <div 
                    {...attributes} 
                    {...listeners}
                    className="absolute bottom-3 left-1/2 -translate-x-1/2 w-16 h-8 rounded-none bg-black/80 hover:bg-black flex items-center justify-center cursor-grab active:cursor-grabbing text-white border-2 border-white shadow-retro-xs transition-all"
                >
                    <GripVertical className="w-5 h-5" />
                </div>
            </div>
        </div>
    );
}
