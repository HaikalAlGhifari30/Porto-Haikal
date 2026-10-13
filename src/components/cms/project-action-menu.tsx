"use client";

import { useState, useRef } from "react";
import { MoreHorizontal, Edit, Trash2, UploadCloud, X, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateProject, deleteProject } from "@/actions/project";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Project } from "@prisma/client";

export function ProjectActionMenu({ project }: { project: Project }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const [editTitle, setEditTitle] = useState(project.title);
    const [editUrl, setEditUrl] = useState(project.url || "");
    const [editImage, setEditImage] = useState(project.imageUrl);
    const [previewImage, setPreviewImage] = useState<string | null>(project.imageUrl);
    
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64 = reader.result as string;
                setPreviewImage(base64);
                setEditImage(base64);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsUpdating(true);
        try {
            await updateProject(project.id, {
                title: editTitle,
                url: editUrl,
                imageUrl: editImage
            });
            setIsEditOpen(false);
            toast.success("Proyek berhasil diperbarui");
            window.location.reload();
        } catch (error) {
            console.error("Update failed", error);
            toast.error("Gagal memperbarui proyek");
        } finally {
            setIsUpdating(false);
        }
    };

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            await deleteProject(project.id);
            setIsDeleteOpen(false);
            toast.success("Proyek berhasil dihapus");
            window.location.reload();
        } catch (error) {
            console.error("Delete failed", error);
            toast.error("Gagal menghapus proyek");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="relative">
            <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-slate-700 dark:text-zinc-300 hover:text-black dark:hover:text-[#FACC15] transition-colors rounded-none hover:bg-yellow-400/20"
            >
                <MoreHorizontal className="w-5 h-5" />
            </button>

            {isMenuOpen && (
                <>
                    <div 
                        className="fixed inset-0 z-30" 
                        onClick={() => setIsMenuOpen(false)} 
                    />
                    <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white dark:bg-[#151B22] border-2 border-black dark:border-white shadow-retro-sm z-40 overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="p-2 space-y-1">
                            <button 
                                onClick={() => {
                                    setIsEditOpen(true);
                                    setIsMenuOpen(false);
                                }}
                                className="w-full flex items-center gap-3 px-3 py-2 text-sm font-bold text-slate-700 dark:text-zinc-300 hover:text-black dark:hover:text-[#FACC15] hover:bg-[#FAF6ED] dark:hover:bg-zinc-800 transition-colors"
                            >
                                <Edit className="w-4 h-4 text-amber-500 dark:text-[#FACC15]" />
                                Edit Proyek
                            </button>
                            <button 
                                onClick={() => {
                                    setIsDeleteOpen(true);
                                    setIsMenuOpen(false);
                                }}
                                className="w-full flex items-center gap-3 px-3 py-2 text-sm font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                            >
                                <Trash2 className="w-4 h-4" />
                                Hapus Proyek
                            </button>
                        </div>
                    </div>
                </>
            )}

            {/* Edit Modal */}
            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                <DialogContent className="sm:max-w-xl bg-white dark:bg-[#151B22] border-2 border-black dark:border-white rounded-2xl p-6 shadow-retro-md">
                    <DialogHeader className="mb-6">
                        <DialogTitle className="text-xl font-black text-slate-900 dark:text-white uppercase flex items-center gap-3">
                            <div className="w-8 h-8 rounded-none bg-[#FACC15] border border-black flex items-center justify-center text-black">
                                <Edit className="w-4 h-4" />
                            </div>
                            Edit Proyek
                        </DialogTitle>
                    </DialogHeader>

                    <form onSubmit={handleUpdate} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-700 dark:text-zinc-300">Judul Proyek</Label>
                                    <Input 
                                        value={editTitle}
                                        onChange={(e) => setEditTitle(e.target.value)}
                                        className="bg-[#FAF6ED] dark:bg-[#0E1217] border-2 border-black dark:border-white rounded-none h-11 text-sm font-medium"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-700 dark:text-zinc-300">URL Proyek</Label>
                                    <Input 
                                        value={editUrl}
                                        onChange={(e) => setEditUrl(e.target.value)}
                                        className="bg-[#FAF6ED] dark:bg-[#0E1217] border-2 border-black dark:border-white rounded-none h-11 text-sm font-medium"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-700 dark:text-zinc-300">Thumbnail Preview</Label>
                                <div 
                                    className="relative group aspect-video rounded-xl border-2 border-dashed border-black dark:border-white overflow-hidden bg-[#FAF6ED] dark:bg-[#0E1217] flex flex-col items-center justify-center cursor-pointer transition-colors"
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    {previewImage ? (
                                        <>
                                            <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                                                <UploadCloud className="w-8 h-8 text-white" />
                                                <span className="text-[10px] font-bold text-white uppercase">Ganti Gambar</span>
                                            </div>
                                            <Button 
                                                size="icon" 
                                                variant="destructive" 
                                                className="absolute top-2 right-2 h-7 w-7 rounded-none border border-black opacity-0 group-hover:opacity-100 transition-opacity shadow-retro-xs"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setPreviewImage(null);
                                                    setEditImage(null);
                                                }}
                                            >
                                                <X className="w-4 h-4" />
                                            </Button>
                                        </>
                                    ) : (
                                        <div className="flex flex-col items-center text-center p-4">
                                            <UploadCloud className="w-10 h-10 text-slate-400 mb-2" />
                                            <p className="text-[10px] font-black text-slate-600 dark:text-zinc-400 uppercase tracking-widest">Klik untuk Upload</p>
                                        </div>
                                    )}
                                    <input 
                                        type="file" 
                                        ref={fileInputRef}
                                        className="hidden" 
                                        accept="image/*" 
                                        onChange={handleImageUpload} 
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4 pt-4">
                            <Button 
                                type="button"
                                variant="outline" 
                                className="flex-1 h-12 rounded-none border-2 border-black dark:border-white font-bold text-black dark:text-white btn-retro"
                                onClick={() => setIsEditOpen(false)}
                            >
                                Batal
                            </Button>
                            <Button 
                                type="submit" 
                                className="flex-1 h-12 rounded-none bg-[#FACC15] hover:bg-yellow-300 text-black font-black uppercase tracking-widest border-2 border-black dark:border-white shadow-retro-xs btn-retro transition-all"
                                disabled={isUpdating}
                            >
                                {isUpdating ? "Saving..." : "Simpan Perubahan"}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Modal */}
            <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                <DialogContent className="sm:max-w-sm bg-white dark:bg-[#151B22] border-2 border-black dark:border-white rounded-2xl p-8 flex flex-col items-center text-center shadow-retro-md">
                    <div className="w-16 h-16 rounded-none bg-red-100 dark:bg-red-500/10 flex items-center justify-center mb-6 text-red-500 border-2 border-red-500">
                        <AlertTriangle className="w-8 h-8" />
                    </div>
                    <DialogHeader>
                        <DialogTitle className="text-xl font-black text-slate-900 dark:text-white mb-2 uppercase">Hapus Proyek?</DialogTitle>
                    </DialogHeader>
                    <p className="text-xs text-slate-600 dark:text-zinc-300 mb-6 leading-relaxed font-medium">
                        Tindakan ini permanen. Proyek <span className="text-slate-900 dark:text-white font-bold">"{project.title}"</span> akan dihapus selamanya.
                    </p>
                    <div className="flex w-full gap-4">
                        <Button 
                            variant="outline" 
                            className="flex-1 h-12 rounded-none border-2 border-black dark:border-white font-bold btn-retro"
                            onClick={() => setIsDeleteOpen(false)}
                            disabled={isDeleting}
                        >
                            Batal
                        </Button>
                        <Button 
                            variant="destructive" 
                            className="flex-1 h-12 rounded-none bg-red-500 hover:bg-red-600 text-white font-black uppercase tracking-widest border-2 border-black shadow-retro-xs btn-retro transition-all"
                            onClick={handleDelete}
                            disabled={isDeleting}
                        >
                            {isDeleting ? "..." : "Hapus"}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
