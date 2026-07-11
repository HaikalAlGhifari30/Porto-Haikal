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
                className="p-2 text-slate-400 hover:text-slate-900 dark:text-zinc-600 dark:hover:text-white transition-colors rounded-full hover:bg-slate-100 dark:hover:bg-zinc-800"
            >
                <MoreHorizontal className="w-5 h-5" />
            </button>

            {isMenuOpen && (
                <>
                    <div 
                        className="fixed inset-0 z-30" 
                        onClick={() => setIsMenuOpen(false)} 
                    />
                    <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-2xl z-40 overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="p-2 space-y-1">
                            <button 
                                onClick={() => {
                                    setIsEditOpen(true);
                                    setIsMenuOpen(false);
                                }}
                                className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-600 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-zinc-800/50 rounded-xl transition-colors"
                            >
                                <Edit className="w-4 h-4" />
                                Edit Proyek
                            </button>
                            <button 
                                onClick={() => {
                                    setIsDeleteOpen(true);
                                    setIsMenuOpen(false);
                                }}
                                className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-red-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors"
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
                <DialogContent className="sm:max-w-xl bg-white dark:bg-slate-900 border-slate-200 dark:border-blue-500/20 rounded-[2.5rem] p-8">
                    <DialogHeader className="mb-8">
                        <DialogTitle className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-3">
                            <div className="w-10 h-10 rounded-2xl bg-blue-500/10 flex items-center justify-center">
                                <Edit className="w-5 h-5 text-blue-500" />
                            </div>
                            Edit Proyek
                        </DialogTitle>
                    </DialogHeader>

                    <form onSubmit={handleUpdate} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Judul Proyek</Label>
                                    <Input 
                                        value={editTitle}
                                        onChange={(e) => setEditTitle(e.target.value)}
                                        className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-zinc-800 rounded-xl h-12 focus:ring-blue-500/20"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">URL Proyek</Label>
                                    <Input 
                                        value={editUrl}
                                        onChange={(e) => setEditUrl(e.target.value)}
                                        className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-zinc-800 rounded-xl h-12 focus:ring-blue-500/20"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Thumbnail Preview</Label>
                                <div 
                                    className="relative group aspect-video rounded-2xl border-2 border-dashed border-slate-200 dark:border-zinc-800 overflow-hidden bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500/50 transition-colors"
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
                                                className="absolute top-2 right-2 h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
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
                                            <UploadCloud className="w-10 h-10 text-slate-300 mb-2" />
                                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Klik untuk Upload</p>
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
                                className="flex-1 h-14 rounded-2xl border-slate-200 dark:border-zinc-800 font-bold hover:bg-slate-50 dark:hover:bg-zinc-800 transition-all"
                                onClick={() => setIsEditOpen(false)}
                            >
                                Batal
                            </Button>
                            <Button 
                                type="submit"
                                className="flex-1 h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-widest shadow-xl shadow-blue-500/20 hover:shadow-blue-500/40 hover:-translate-y-1 transition-all"
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
                <DialogContent className="sm:max-w-sm bg-white dark:bg-slate-900 border-slate-200 dark:border-zinc-800 rounded-[3rem] p-10 flex flex-col items-center text-center">
                    <div className="w-24 h-24 rounded-[2rem] bg-red-100 dark:bg-red-500/10 flex items-center justify-center mb-8 text-red-500 border-2 border-red-500/20 shadow-xl shadow-red-500/5">
                        <AlertTriangle className="w-12 h-12" />
                    </div>
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-black text-slate-900 dark:text-white mb-3">Hapus Proyek?</DialogTitle>
                    </DialogHeader>
                    <p className="text-sm text-slate-500 dark:text-zinc-400 mb-10 leading-relaxed font-medium">
                        Tindakan ini permanen. Proyek <span className="text-slate-900 dark:text-white font-bold">"{project.title}"</span> akan dihapus selamanya.
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
        </div>
    );
}
