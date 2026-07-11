"use client";

import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Trash2, Edit, UploadCloud, Image as ImageIcon, X, AlertTriangle, GripVertical, ExternalLink } from "lucide-react";
import { deleteProject, updateProject } from "@/actions/project";
import { motion, AnimatePresence } from "framer-motion";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { Project } from "@prisma/client";

export function ProjectCard({ project }: { project: Project }) {
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const [editTitle, setEditTitle] = useState(project.title);
    const [editUrl, setEditUrl] = useState(project.url || "");
    const [editImage, setEditImage] = useState(project.imageUrl);
    const [previewImage, setPreviewImage] = useState<string | null>(project.imageUrl);
    
    const fileInputRef = useRef<HTMLInputElement>(null);

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: project.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 10 : 1,
        opacity: isDragging ? 0.6 : 1,
    };

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
        } catch (error) {
            console.error("Update failed", error);
        } finally {
            setIsUpdating(false);
        }
    };

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            await deleteProject(project.id);
            setIsDeleteOpen(false);
        } catch (error) {
            console.error("Delete failed", error);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <>
            <div ref={setNodeRef} style={style} className="group h-full">
                <Card className="h-full bg-white dark:bg-zinc-900 border-slate-200 dark:border-white/5 flex flex-col shadow-sm hover:shadow-lg transition-all duration-500 overflow-hidden relative rounded-2xl">
                    <div className="h-40 w-full bg-slate-100 dark:bg-zinc-950 relative overflow-hidden">
                        {project.imageUrl ? (
                            <img 
                                src={project.imageUrl} 
                                alt={project.title} 
                                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-110" 
                            />
                        ) : (
                            <div 
                                className="flex flex-col items-center justify-center w-full h-full text-slate-400 dark:text-zinc-700 bg-zinc-900"
                            >
                                <ImageIcon className="w-8 h-8 mb-1 opacity-50" />
                                <span className="text-[9px] font-bold uppercase tracking-widest">No Thumbnail</span>
                            </div>
                        )}
                        
                        {/* Dark Gradient Overlay for Readability */}
                        <div className="absolute inset-0 bg-gradient-to-b from-black/15 to-black/55 opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                        {/* Floating Action Bar */}
                        <div className="absolute top-2.5 right-2.5 bg-[#0F172A]/78 backdrop-blur-[14px] border border-white/10 rounded-full p-1 flex gap-1 z-20 shadow-xl opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                             <Button 
                                size="icon"
                                variant="ghost" 
                                className="h-7 w-7 rounded-full bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 hover:text-blue-300 transition-all"
                                onClick={() => setIsEditOpen(true)}
                            >
                                <Edit className="h-3.5 w-3.5" />
                            </Button>
                            <Button 
                                size="icon"
                                variant="ghost" 
                                className="h-7 w-7 rounded-full bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-all"
                                onClick={() => setIsDeleteOpen(true)}
                            >
                                <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                        </div>

                        {/* Drag Handle */}
                        <div 
                            {...attributes} 
                            {...listeners} 
                            className="absolute top-2.5 left-2.5 w-8 h-8 rounded-lg bg-black/40 backdrop-blur-md flex items-center justify-center text-white cursor-grab active:cursor-grabbing border border-white/10 hover:bg-blue-600 transition-all z-10"
                        >
                            <GripVertical className="h-4 w-4" />
                        </div>

                        {/* Removed Featured Badge */}
                    </div>
                    
                    <CardHeader className="p-4 flex-1">
                        <div className="flex flex-col gap-1">
                            <span className="text-[9px] font-bold text-blue-400 uppercase tracking-[0.2em] mb-0.5">Portfolio Proyek</span>
                            <div className="flex items-start justify-between gap-3">
                                <CardTitle className="text-slate-900 dark:text-white text-lg font-bold tracking-tight leading-snug group-hover:text-blue-400 transition-colors">
                                    {project.title}
                                </CardTitle>
                                <a href={project.url || "#"} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-blue-500 transition-colors shrink-0">
                                    <ExternalLink className="w-4 h-4" />
                                </a>
                            </div>
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-zinc-400 font-medium leading-relaxed mt-2 line-clamp-2">
                            {project.url ? project.url.replace(/^https?:\/\//, '') : 'No URL'}
                        </p>
                    </CardHeader>
                    
                    <CardContent className="px-4 py-3 border-t border-slate-100 dark:border-white/5 flex justify-between items-center">
                         <div className="flex items-center gap-1.5">
                            <div className={`w-1.5 h-1.5 rounded-full ${project.isVisible ? 'bg-blue-500' : 'bg-slate-300 dark:bg-zinc-700'}`} />
                            <span className="text-[9px] uppercase font-bold tracking-widest text-slate-500 dark:text-zinc-500">
                                {project.isVisible ? "Tampil" : "Tersembunyi"}
                            </span>
                        </div>
                        <div className="text-[9px] font-bold uppercase tracking-widest text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">
                            Manage
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Edit Modal */}
            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                <DialogContent className="sm:max-w-xl bg-white dark:bg-slate-900 border-slate-200 dark:border-blue-500/20 rounded-2xl p-6">
                    <DialogHeader className="mb-6">
                        <DialogTitle className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                            <div className="w-8 h-8 rounded-xl bg-blue-500/10 flex items-center justify-center">
                                <Edit className="w-4 h-4 text-blue-500" />
                            </div>
                            Edit Proyek
                        </DialogTitle>
                    </DialogHeader>

                    <form onSubmit={handleUpdate} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <div className="space-y-1.5">
                                    <Label className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400">Judul Proyek</Label>
                                    <Input 
                                        value={editTitle}
                                        onChange={(e) => setEditTitle(e.target.value)}
                                        className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-zinc-800 rounded-lg h-10 text-sm focus:ring-blue-500/20"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <Label className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400">URL Proyek</Label>
                                    <Input 
                                        value={editUrl}
                                        onChange={(e) => setEditUrl(e.target.value)}
                                        className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-zinc-800 rounded-lg h-10 text-sm focus:ring-blue-500/20"
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

                        {/* Edit isFeatured removed */}

                        <div className="flex gap-3 pt-2">
                            <Button 
                                type="button"
                                variant="outline" 
                                className="flex-1 h-11 rounded-xl border-slate-200 dark:border-zinc-800 font-bold hover:bg-slate-50 dark:hover:bg-zinc-800 transition-all text-sm"
                                onClick={() => setIsEditOpen(false)}
                            >
                                Batal
                            </Button>
                            <Button 
                                type="submit"
                                className="flex-1 h-11 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold uppercase tracking-widest shadow-lg shadow-blue-500/10 transition-all"
                                disabled={isUpdating}
                            >
                                {isUpdating ? "Saving..." : "Update Data"}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Modal */}
            <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                <DialogContent className="sm:max-w-sm bg-white dark:bg-slate-900 border-slate-200 dark:border-zinc-800 rounded-2xl p-6 flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-xl bg-red-100 dark:bg-red-500/10 flex items-center justify-center mb-6 text-red-500 border border-red-500/20">
                        <AlertTriangle className="w-8 h-8" />
                    </div>
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold text-slate-900 dark:text-white mb-2">Hapus Proyek?</DialogTitle>
                    </DialogHeader>
                    <p className="text-xs text-slate-500 dark:text-zinc-400 mb-6 leading-relaxed font-medium">
                        Tindakan ini permanen. Proyek <span className="text-slate-900 dark:text-white font-bold">"{project.title}"</span> akan dihapus.
                    </p>
                    <div className="flex w-full gap-3">
                        <Button 
                            variant="outline" 
                            className="flex-1 h-11 rounded-xl border-slate-200 dark:border-zinc-800 font-bold text-sm"
                            onClick={() => setIsDeleteOpen(false)}
                            disabled={isDeleting}
                        >
                            Batal
                        </Button>
                        <Button 
                            variant="destructive" 
                            className="flex-1 h-11 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold uppercase tracking-widest transition-all text-sm"
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
