"use client";

import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Trash2, Edit, UploadCloud, Image as ImageIcon, X, GripVertical } from "lucide-react";
import { deleteBusinessSector, updateBusinessSector } from "@/actions/business-sector";
import { toast } from "sonner";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { IconSelector } from "@/components/ui/icon-selector";
import * as Icons from "lucide-react";

interface BusinessSector {
    id: string;
    name: string;
    nameEn: string | null;
    description: string;
    descriptionEn: string | null;
    icon: string | null;
    imageUrl: string | null;
    order: number;
}

export function SectorCard({ sector }: { sector: BusinessSector }) {
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [previewImage, setPreviewImage] = useState<string | null>(sector.imageUrl);
    const [deleteImage, setDeleteImage] = useState(false);
    const [icon, setIcon] = useState<string | null>(sector.icon || null);
    
    const fileInputRef = useRef<HTMLInputElement>(null);

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: sector.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 10 : 1,
        opacity: isDragging ? 0.6 : 1,
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setDeleteImage(false);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemovePreview = () => {
        setPreviewImage(null);
        setDeleteImage(true);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isUpdating) return;
        setIsUpdating(true);
        try {
            const formData = new FormData(e.currentTarget);
            if (deleteImage) {
                formData.set("deleteImage", "true");
            }
            if (icon) {
                formData.set("icon", icon);
            }
            await updateBusinessSector(sector.id, formData);
            toast.success("Bidang usaha berhasil diperbarui!");
            setIsEditOpen(false);
        } catch (error: any) {
            toast.error(error.message || "Gagal memperbarui bidang usaha.");
        } finally {
            setIsUpdating(false);
        }
    };

    const handleDelete = async () => {
        if (isDeleting) return;
        setIsDeleting(true);
        try {
            await deleteBusinessSector(sector.id);
            toast.success("Bidang usaha berhasil dihapus!");
            setIsDeleteOpen(false);
        } catch (error: any) {
            toast.error(error.message || "Gagal menghapus bidang usaha.");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <>
            <div ref={setNodeRef} style={style} className="group">
                <Card className="bg-white dark:bg-zinc-900 border-slate-200 dark:border-white/5 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden rounded-2xl">
                    <CardContent className="p-5 flex items-start gap-4">
                        {/* Drag Handle */}
                        <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-400 dark:text-zinc-500 shrink-0">
                            <GripVertical className="w-5 h-5" />
                        </div>

                        {/* Icon / Image Preview */}
                        <div className="w-14 h-14 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-950 flex items-center justify-center shrink-0 overflow-hidden relative">
                            {sector.imageUrl ? (
                                <img src={sector.imageUrl} alt={sector.name} className="w-full h-full object-cover" />
                            ) : sector.icon && (Icons as any)[sector.icon] ? (
                                (() => {
                                    const SelectedIcon = (Icons as any)[sector.icon];
                                    return <SelectedIcon className="w-6 h-6 text-blue-500" />;
                                })()
                            ) : (
                                <ImageIcon className="w-6 h-6 text-slate-400" />
                            )}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-slate-900 dark:text-white truncate text-base leading-tight">
                                {sector.name}
                            </h4>
                            {sector.nameEn && (
                                <p className="text-[10px] text-slate-400 font-semibold italic mt-0.5">EN: {sector.nameEn}</p>
                            )}
                            <p className="text-xs text-slate-500 dark:text-zinc-400 line-clamp-2 mt-1.5 font-medium leading-relaxed">
                                {sector.description}
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-1.5 shrink-0">
                            <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => setIsEditOpen(true)}
                                className="w-9 h-9 rounded-full bg-blue-500/10 backdrop-blur-md border border-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-500 hover:bg-blue-600 hover:text-white transition-all"
                            >
                                <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => setIsDeleteOpen(true)}
                                className="w-9 h-9 rounded-full bg-red-500/10 backdrop-blur-md border border-red-500/20 flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all"
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Edit Modal */}
            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                <DialogContent className="sm:max-w-[600px] rounded-[2rem] p-0 max-h-[90vh] overflow-y-auto overflow-x-hidden hide-scrollbar border-none shadow-2xl dark:bg-zinc-950">
                    <div className="px-8 py-6 border-b border-slate-100 dark:border-zinc-800/50 flex items-center gap-3 bg-slate-50/50 dark:bg-zinc-900/30">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                            <Edit className="w-5 h-5 text-blue-500" />
                        </div>
                        <div>
                            <DialogTitle className="text-lg font-bold text-slate-900 dark:text-white leading-none">Edit Bidang Usaha</DialogTitle>
                            <p className="text-xs text-slate-500 dark:text-zinc-500 mt-1">Ubah rincian informasi dan ikon bidang usaha.</p>
                        </div>
                    </div>
                    
                    <form onSubmit={handleUpdate} className="p-8 space-y-6">
                        <div className="grid grid-cols-1 gap-5">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-widest pl-1">Nama Bidang Usaha</label>
                                <Input name="name" defaultValue={sector.name} required className="bg-slate-50 dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 h-12 rounded-xl text-sm" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-5">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-widest pl-1">Deskripsi Singkat</label>
                                <Textarea name="description" defaultValue={sector.description} required rows={3} className="bg-slate-50 dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 rounded-xl text-sm" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-widest pl-1">Pilih Ikon (Fallback)</label>
                            <IconSelector value={icon} onChange={setIcon} />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-widest pl-1">Unggah Ikon atau Gambar Ilustrasi</label>
                            
                            <div className="flex gap-4 items-center">
                                <div className="w-20 h-20 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-950 flex items-center justify-center shrink-0 overflow-hidden relative group">
                                    {previewImage ? (
                                        <>
                                            <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                                            <button
                                                type="button"
                                                onClick={handleRemovePreview}
                                                className="absolute inset-0 bg-black/50 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <X className="w-5 h-5" />
                                            </button>
                                        </>
                                    ) : (
                                        <ImageIcon className="w-8 h-8 text-slate-400" />
                                    )}
                                </div>
                                <div className="flex-grow">
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        name="image"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                        id={`edit-file-${sector.id}`}
                                    />
                                    <label
                                        htmlFor={`edit-file-${sector.id}`}
                                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-slate-50 dark:hover:bg-zinc-800 text-xs font-bold text-slate-600 dark:text-zinc-400 cursor-pointer transition-all border-dashed"
                                    >
                                        <UploadCloud className="w-4 h-4 text-slate-400" />
                                        Pilih Gambar Baru
                                    </label>
                                    <p className="text-[10px] text-slate-400 mt-1.5 font-medium">Format PNG, JPG atau SVG. Maksimal 2MB.</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-zinc-800/50">
                            <Button type="button" variant="ghost" onClick={() => setIsEditOpen(false)} className="rounded-xl h-11 px-5 font-bold text-xs">Batal</Button>
                            <Button type="submit" disabled={isUpdating} className="rounded-xl h-11 px-6 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs">
                                {isUpdating ? "Sedang Menyimpan..." : "Simpan Perubahan"}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Delete Modal */}
            <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                <DialogContent className="sm:max-w-[400px] rounded-[2rem] p-6 text-center dark:bg-zinc-950">
                    <div className="mx-auto w-12 h-12 rounded-full bg-red-100 dark:bg-red-950/30 flex items-center justify-center text-red-600 dark:text-red-400 mb-4">
                        <Trash2 className="w-5 h-5" />
                    </div>
                    <DialogTitle className="text-lg font-bold text-slate-900 dark:text-white mb-2">Hapus Bidang Usaha?</DialogTitle>
                    <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed font-medium mb-6">
                        Apakah Anda yakin ingin menghapus bidang usaha <strong className="text-slate-800 dark:text-white">"{sector.name}"</strong>? Tindakan ini tidak dapat dibatalkan.
                    </p>
                    <div className="flex gap-3 justify-center">
                        <Button variant="ghost" onClick={() => setIsDeleteOpen(false)} className="rounded-xl h-11 px-5 font-bold text-xs">Batal</Button>
                        <Button onClick={handleDelete} disabled={isDeleting} className="rounded-xl h-11 px-6 bg-red-600 hover:bg-red-700 text-white font-bold text-xs">
                            {isDeleting ? "Menghapus..." : "Ya, Hapus"}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
