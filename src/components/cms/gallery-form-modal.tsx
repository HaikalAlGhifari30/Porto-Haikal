"use client";

import { useEffect, useState, useRef } from "react";
import { Gallery } from "@prisma/client";
import { addGalleryItem, updateGalleryItem } from "@/actions/gallery";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImagePlus, Loader2, X } from "lucide-react";
import { toast } from "sonner";

interface GalleryFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    item?: Gallery;
}

export function GalleryFormModal({ isOpen, onClose, item }: GalleryFormModalProps) {
    const isEdit = !!item;
    const [isLoading, setIsLoading] = useState(false);
    
    const [title, setTitle] = useState(item?.title || "");
    const [category, setCategory] = useState(item?.category || "");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(item?.imageUrl || null);
    
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen) {
            setTitle(item?.title || "");
            setCategory(item?.category || "");
            setImageFile(null);
            setImagePreview(item?.imageUrl || null);
        }
    }, [isOpen, item]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const url = URL.createObjectURL(file);
            setImagePreview(url);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!title.trim()) {
            return toast.error("Judul foto harus diisi");
        }
        if (!category.trim()) {
            return toast.error("Kategori harus diisi");
        }
        if (!isEdit && !imageFile) {
            return toast.error("Gambar harus diupload");
        }

        setIsLoading(true);

        try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("category", category);
            if (imageFile) {
                formData.append("image", imageFile);
            }

            if (isEdit) {
                await updateGalleryItem(item.id, formData);
                toast.success("Foto berhasil diperbarui");
            } else {
                await addGalleryItem(formData);
                toast.success("Foto berhasil ditambahkan");
            }

            onClose();
        } catch (error: any) {
            console.error(error);
            toast.error(error.message || "Terjadi kesalahan saat menyimpan foto");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden bg-white dark:bg-zinc-950 border-slate-200 dark:border-zinc-800">
                <DialogHeader className="p-6 pb-4 border-b border-slate-100 dark:border-zinc-800/50 bg-slate-50/50 dark:bg-zinc-900/20">
                    <DialogTitle className="text-xl font-bold text-slate-900 dark:text-white">
                        {isEdit ? "Edit Foto Galeri" : "Tambah Foto Baru"}
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Image Upload Area */}
                    <div className="space-y-3">
                        <Label className="text-slate-900 dark:text-slate-200 font-semibold">Gambar Foto <span className="text-red-500">*</span></Label>
                        <div 
                            onClick={() => fileInputRef.current?.click()}
                            className={`relative aspect-[4/3] w-full rounded-2xl border-2 border-dashed overflow-hidden cursor-pointer transition-all duration-300 flex flex-col items-center justify-center gap-3 ${
                                imagePreview 
                                ? 'border-transparent' 
                                : 'border-slate-300 dark:border-zinc-700 hover:border-blue-500 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/5'
                            }`}
                        >
                            {imagePreview ? (
                                <>
                                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <p className="text-white font-medium flex items-center gap-2 bg-black/50 px-4 py-2 rounded-full backdrop-blur-md">
                                            <ImagePlus className="w-4 h-4" /> Ganti Gambar
                                        </p>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-zinc-800 flex items-center justify-center text-slate-400 dark:text-zinc-500">
                                        <ImagePlus className="w-6 h-6" />
                                    </div>
                                    <div className="text-center">
                                        <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">Klik untuk upload</p>
                                        <p className="text-xs text-slate-500 dark:text-zinc-500 mt-1">PNG, JPG atau WEBP (Maks 5MB)</p>
                                    </div>
                                </>
                            )}
                            <input 
                                ref={fileInputRef}
                                type="file" 
                                accept="image/*" 
                                className="hidden" 
                                onChange={handleImageChange}
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="title" className="text-slate-900 dark:text-slate-200 font-semibold">Judul Foto <span className="text-red-500">*</span></Label>
                            <Input
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Contoh: Proyek Pembangunan Kantor Pusat"
                                className="h-11 bg-slate-50 dark:bg-zinc-900/50 border-slate-200 dark:border-zinc-800 focus-visible:ring-blue-500"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="category" className="text-slate-900 dark:text-slate-200 font-semibold">Kategori <span className="text-red-500">*</span></Label>
                            <Input
                                id="category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                placeholder="Contoh: Konstruksi"
                                className="h-11 bg-slate-50 dark:bg-zinc-900/50 border-slate-200 dark:border-zinc-800 focus-visible:ring-blue-500"
                            />
                        </div>
                    </div>

                    <div className="flex gap-3 pt-4 border-t border-slate-100 dark:border-zinc-800/50">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            disabled={isLoading}
                            className="flex-1 h-11 border-slate-200 dark:border-zinc-700 hover:bg-slate-100 dark:hover:bg-zinc-800"
                        >
                            Batal
                        </Button>
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="flex-1 h-11 bg-blue-600 hover:bg-blue-700 text-white"
                        >
                            {isLoading ? (
                                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Menyimpan...</>
                            ) : (
                                "Simpan Foto"
                            )}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
