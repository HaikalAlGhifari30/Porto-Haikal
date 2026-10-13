"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import { Pencil, Upload, X, Image as ImageIcon, Loader2 } from "lucide-react";
import { updateTeamAction } from "@/actions/team";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { IconSelector } from "@/components/ui/icon-selector";

interface EditTeamModalProps {
    team: {
        id: string;
        name: string;
        nameEn?: string | null;
        slug: string;
        description: string | null;
        descriptionEn?: string | null;
        icon?: string | null;
        imageUrl: string | null;
        logoUrl: string | null;
        coverImage: string | null;
    };
}

export function EditTeamModal({ team }: EditTeamModalProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const [coverPreview, setCoverPreview] = useState<string | null>(team.coverImage || team.imageUrl);
    const [icon, setIcon] = useState<string | null>(team.icon || null);
    const coverInputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setCoverPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setCoverPreview(null);
        if (coverInputRef.current) coverInputRef.current.value = "";
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isPending) return;
        setIsPending(true);
        const formData = new FormData(e.currentTarget);
        
        if (!icon && !coverPreview) {
            toast.error("Silakan unggah Gambar Ilustrasi Divisi atau pilih Ikon");
            setIsPending(false);
            return;
        }

        if (icon) {
            formData.set("icon", icon);
        }
        
        try {
            await updateTeamAction(formData);
            setIsOpen(false);
            toast.success("Divisi berhasil diperbarui");
        } catch (error) {
            console.error("Failed to update team:", error);
            toast.error("Gagal memperbarui divisi");
        } finally {
            setIsPending(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger 
                render={
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        className="w-9 h-9 rounded-none bg-white dark:bg-[#0E1217] border-2 border-black dark:border-white flex items-center justify-center text-black dark:text-white hover:bg-[#FACC15] dark:hover:bg-[#FACC15] hover:text-black transition-all shadow-retro-xs"
                        onClick={(e) => e.stopPropagation()}
                    />
                }
            >
                <Pencil className="w-4 h-4" />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[650px] bg-[#FAF6ED] dark:bg-[#151B22] border-2 border-black dark:border-white rounded-none shadow-retro-md p-0 max-h-[90vh] overflow-y-auto overflow-x-hidden hide-scrollbar" onClick={(e) => e.stopPropagation()}>
                <form onSubmit={handleSubmit}>
                    <input type="hidden" name="id" value={team.id} />
                    <DialogHeader className="p-8 pb-0">
                        <DialogTitle className="text-2xl font-black uppercase text-slate-900 dark:text-white tracking-tight">Edit Divisi</DialogTitle>
                        <DialogDescription className="text-slate-600 dark:text-zinc-400 mt-2 font-bold text-xs">
                            Perbarui identitas visual dan detail divisi {team.name}.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="p-8 space-y-6">
                        {/* Image Uploads Grid */}
                        <div className="space-y-3">
                            <Label className="text-[10px] text-slate-800 dark:text-zinc-200 uppercase font-black tracking-widest pl-1">Division Cover Image</Label>
                            <div 
                                onClick={() => coverInputRef.current?.click()}
                                className={cn(
                                    "relative h-52 rounded-none border-2 border-dashed border-black dark:border-white transition-all cursor-pointer flex flex-col items-center justify-center overflow-hidden",
                                    coverPreview 
                                        ? "bg-white dark:bg-[#0E1217]" 
                                        : "bg-white dark:bg-[#0E1217] hover:bg-[#FACC15]/10"
                                )}
                            >
                                {coverPreview ? (
                                    <>
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={coverPreview} alt="Cover Preview" className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <Button type="button" variant="secondary" size="sm" className="rounded-none font-black text-xs uppercase bg-[#FACC15] text-black border-2 border-black">Ganti Cover</Button>
                                        </div>
                                        <button 
                                            type="button"
                                            onClick={(e) => { e.stopPropagation(); removeImage(); }}
                                            className="absolute top-3 right-3 w-8 h-8 rounded-none bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors border-2 border-black shadow-retro-xs"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </>
                                ) : (
                                    <div className="text-center space-y-1">
                                        <ImageIcon className="w-8 h-8 text-black dark:text-white mx-auto mb-2 opacity-50" />
                                        <p className="text-xs font-black uppercase text-slate-800 dark:text-zinc-200">Upload Cover</p>
                                    </div>
                                )}
                                <input type="file" name="coverImage" ref={coverInputRef} className="hidden" accept="image/*" onChange={handleImageChange} />
                            </div>
                        </div>

                        {/* Icon Selection Fallback */}
                        <div>
                            <Label className="block text-[10px] text-slate-800 dark:text-zinc-200 uppercase font-black tracking-widest pl-1 mb-2">
                                Pilih Ikon (Otomatis dipakai bila tidak ada gambar)
                            </Label>
                            <IconSelector value={icon} onChange={setIcon} />
                        </div>

                        <div className="grid grid-cols-1 gap-6">
                            <div className="space-y-2">
                                <Label className="text-[10px] text-slate-800 dark:text-zinc-200 uppercase font-black tracking-widest pl-1">Nama Divisi</Label>
                                <Input key={`name-${team.id}`} name="name" defaultValue={team.name || ""} required className="bg-white dark:bg-[#0E1217] border-2 border-black dark:border-white h-11 rounded-none font-bold text-sm" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-6">
                            <div className="space-y-2">
                                <Label className="text-[10px] text-slate-800 dark:text-zinc-200 uppercase font-black tracking-widest pl-1">Deskripsi Singkat</Label>
                                <Input key={`desc-${team.id}`} name="description" defaultValue={team.description || ""} placeholder="Ceritakan identitas visual dan misi divisi ini..." required className="bg-white dark:bg-[#0E1217] border-2 border-black dark:border-white h-11 rounded-none font-bold text-sm" />
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="p-8 pt-0 flex flex-col-reverse sm:flex-row gap-3">
                        <Button type="button" variant="ghost" onClick={() => setIsOpen(false)} className="h-11 rounded-none border-2 border-black dark:border-white font-black uppercase text-xs hover:bg-slate-200 dark:hover:bg-zinc-800">
                            Batal
                        </Button>
                        <Button type="submit" disabled={isPending} className="h-11 px-8 rounded-none bg-[#FACC15] hover:bg-yellow-300 text-black border-2 border-black dark:border-white font-black uppercase text-xs shadow-retro-xs flex-1">
                            {isPending ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                "Update Divisi"
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
