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
            <div className={`group relative bg-[#FAF6ED] dark:bg-[#151B22] rounded-none border-2 ${isVisible ? 'border-black dark:border-white shadow-retro-xs hover:shadow-retro-sm' : 'border-dashed border-slate-500 opacity-70'} overflow-hidden transition-all duration-300 flex flex-col`}>
                {/* Status Badge */}
                {!isVisible && (
                    <div className="absolute top-3 left-3 z-10 px-2.5 py-1 bg-black text-white text-[10px] font-black border-2 border-white uppercase tracking-wider flex items-center gap-1.5 shadow-retro-xs">
                        <EyeOff className="w-3 h-3" />
                        Tersembunyi
                    </div>
                )}
                
                {/* Category Badge */}
                {isVisible && (
                    <div className="absolute top-3 left-3 z-10 px-2.5 py-1 bg-[#FACC15] text-black text-[10px] font-black border-2 border-black dark:border-white tracking-wider shadow-retro-xs uppercase">
                        {item.category}
                    </div>
                )}

                {/* Action Buttons */}
                <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-2">
                    <button onClick={() => setIsEditing(true)} className="w-8 h-8 rounded-none bg-white dark:bg-[#0E1217] flex items-center justify-center text-black dark:text-white hover:bg-[#FACC15] dark:hover:bg-[#FACC15] hover:text-black border-2 border-black dark:border-white shadow-retro-xs transition-colors" title="Edit">
                        <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={handleToggleVisibility} disabled={isToggling} className="w-8 h-8 rounded-none bg-white dark:bg-[#0E1217] flex items-center justify-center text-black dark:text-white hover:bg-[#FACC15] dark:hover:bg-[#FACC15] hover:text-black border-2 border-black dark:border-white shadow-retro-xs transition-colors disabled:opacity-50" title="Toggle visibility">
                        {isToggling ? <Loader2 className="w-4 h-4 animate-spin" /> : (isVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />)}
                    </button>
                    <button onClick={() => setIsDeleteOpen(true)} disabled={isDeleting} className="w-8 h-8 rounded-none bg-red-500 flex items-center justify-center text-white hover:bg-red-600 border-2 border-black dark:border-white shadow-retro-xs transition-colors disabled:opacity-50" title="Hapus">
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>

                {/* Image */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-200 dark:bg-zinc-800 border-b-2 border-black dark:border-white">
                    <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col flex-1 bg-[#FAF6ED] dark:bg-[#151B22]">
                    <h4 className="font-black text-slate-900 dark:text-white line-clamp-2 leading-tight uppercase text-sm">
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
                <DialogContent className="sm:max-w-sm bg-[#FAF6ED] dark:bg-[#151B22] border-2 border-black dark:border-white rounded-none p-8 flex flex-col items-center text-center shadow-retro-md">
                    <div className="w-16 h-16 rounded-none bg-red-500 flex items-center justify-center mb-6 text-white border-2 border-black dark:border-white shadow-retro-xs">
                        <AlertTriangle className="w-8 h-8" />
                    </div>
                    <DialogHeader>
                        <DialogTitle className="text-xl font-black uppercase text-slate-900 dark:text-white mb-2">Hapus Foto?</DialogTitle>
                    </DialogHeader>
                    <p className="text-sm text-slate-600 dark:text-zinc-300 mb-6 leading-relaxed font-bold">
                        Tindakan ini permanen. Foto <span className="text-black dark:text-[#FACC15] font-black">"{item.title}"</span> akan dihapus selamanya.
                    </p>
                    <div className="flex w-full gap-3">
                        <Button 
                            variant="outline" 
                            className="flex-1 h-11 rounded-none border-2 border-black dark:border-white font-black hover:bg-slate-200 dark:hover:bg-zinc-800"
                            onClick={() => setIsDeleteOpen(false)}
                            disabled={isDeleting}
                        >
                            Batal
                        </Button>
                        <Button 
                            variant="destructive" 
                            className="flex-1 h-11 rounded-none bg-red-600 hover:bg-red-700 text-white font-black uppercase tracking-wider border-2 border-black dark:border-white shadow-retro-xs"
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
