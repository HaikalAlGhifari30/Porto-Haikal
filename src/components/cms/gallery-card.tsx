"use client";

import { useState } from "react";
import { Gallery } from "@prisma/client";
import { Edit2, Eye, EyeOff, Trash2, Loader2, AlertTriangle } from "lucide-react";
import { deleteGalleryItem, updateGalleryItem } from "@/actions/gallery";
import { GalleryFormModal } from "./gallery-form-modal";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface GalleryCardProps {
    item: Gallery;
}

export function GalleryCard({ item }: GalleryCardProps) {
    const [isDeleting, setIsDeleting] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isToggling, setIsToggling] = useState(false);
    const [isVisible, setIsVisible] = useState(item.isVisible);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            await deleteGalleryItem(item.id);
            toast.success("Foto berhasil dihapus");
            setIsDeleteOpen(false);
        } catch (error) {
            toast.error("Gagal menghapus foto");
            setIsDeleting(false);
        }
    };

    const handleToggleVisibility = async () => {
        setIsToggling(true);
        const newVisibility = !isVisible;
        setIsVisible(newVisibility); // Optimistic UI update
        try {
            const formData = new FormData();
            formData.append("isVisible", newVisibility.toString());
            await updateGalleryItem(item.id, formData);
            toast.success(newVisibility ? "Foto ditampilkan" : "Foto disembunyikan");
        } catch (error) {
            setIsVisible(!newVisibility); // Revert on failure
            toast.error("Gagal mengubah status");
        } finally {
            setIsToggling(false);
        }
    };

    return (
        <>
            <div className={`group relative bg-white dark:bg-zinc-900 rounded-2xl border ${isVisible ? 'border-slate-200 dark:border-zinc-800' : 'border-dashed border-slate-300 dark:border-zinc-700 opacity-70'} overflow-hidden hover:shadow-xl hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all duration-300 flex flex-col`}>
                {/* Status Badge */}
                {!isVisible && (
                    <div className="absolute top-3 left-3 z-10 px-2.5 py-1 bg-slate-900/80 backdrop-blur-sm text-white text-[10px] font-bold rounded-lg uppercase tracking-wider flex items-center gap-1.5">
                        <EyeOff className="w-3 h-3" />
                        Tersembunyi
                    </div>
                )}
                
                {/* Category Badge */}
                {isVisible && (
                    <div className="absolute top-3 left-3 z-10 px-2.5 py-1 bg-white/90 dark:bg-black/80 backdrop-blur-sm text-slate-900 dark:text-white text-[10px] font-bold rounded-lg tracking-wider border border-white/20">
                        {item.category}
                    </div>
                )}

                {/* Action Buttons */}
                <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-2">
                    <button onClick={() => setIsEditing(true)} className="w-8 h-8 rounded-full bg-white/90 dark:bg-black/80 backdrop-blur-sm flex items-center justify-center text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-zinc-800 shadow-sm border border-slate-200 dark:border-zinc-700 transition-colors">
                        <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={handleToggleVisibility} disabled={isToggling} className="w-8 h-8 rounded-full bg-white/90 dark:bg-black/80 backdrop-blur-sm flex items-center justify-center text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-zinc-800 shadow-sm border border-slate-200 dark:border-zinc-700 transition-colors disabled:opacity-50">
                        {isToggling ? <Loader2 className="w-4 h-4 animate-spin" /> : (isVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />)}
                    </button>
                    <button onClick={() => setIsDeleteOpen(true)} disabled={isDeleting} className="w-8 h-8 rounded-full bg-white/90 dark:bg-black/80 backdrop-blur-sm flex items-center justify-center text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 shadow-sm border border-red-200 dark:border-red-900/50 transition-colors disabled:opacity-50">
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>

                {/* Image */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 dark:bg-zinc-800">
                    <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col flex-1">
                    <h4 className="font-bold text-slate-900 dark:text-white line-clamp-2 leading-tight">
                        {item.title}
                    </h4>
                </div>
            </div>

            <GalleryFormModal
                isOpen={isEditing}
                onClose={() => setIsEditing(false)}
                item={item}
            />

            {/* Delete Confirmation Modal */}
            <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                <DialogContent className="sm:max-w-sm bg-white dark:bg-slate-900 border-slate-200 dark:border-zinc-800 rounded-[3rem] p-10 flex flex-col items-center text-center">
                    <div className="w-24 h-24 rounded-[2rem] bg-red-100 dark:bg-red-500/10 flex items-center justify-center mb-8 text-red-500 border-2 border-red-500/20 shadow-xl shadow-red-500/5">
                        <AlertTriangle className="w-12 h-12" />
                    </div>
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-black text-slate-900 dark:text-white mb-3">Hapus Foto?</DialogTitle>
                    </DialogHeader>
                    <p className="text-sm text-slate-500 dark:text-zinc-400 mb-10 leading-relaxed font-medium">
                        Tindakan ini permanen. Foto <span className="text-slate-900 dark:text-white font-bold">"{item.title}"</span> akan dihapus selamanya.
                    </p>
                    <div className="flex w-full gap-4">
                        <Button 
                            variant="outline" 
                            className="flex-1 h-14 rounded-2xl border-slate-200 dark:border-zinc-800 font-bold hover:bg-slate-50 dark:hover:bg-zinc-800 transition-all"
                            onClick={() => setIsDeleteOpen(false)}
                            disabled={isDeleting}
                        >
                            Batal
                        </Button>
                        <Button 
                            variant="destructive" 
                            className="flex-1 h-14 rounded-2xl bg-red-500 hover:bg-red-600 text-white font-black uppercase tracking-widest shadow-xl shadow-red-500/20 hover:shadow-red-500/40 hover:-translate-y-1 transition-all"
                            onClick={handleDelete}
                            disabled={isDeleting}
                        >
                            {isDeleting ? "..." : "Hapus"}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
