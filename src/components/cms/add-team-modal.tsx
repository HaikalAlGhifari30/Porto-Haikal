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
import { Plus, Upload, X, Image as ImageIcon, Loader2 } from "lucide-react";
import { createTeam } from "@/actions/team";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export function AddTeamModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const [coverPreview, setCoverPreview] = useState<string | null>(null);
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
        
        try {
            await createTeam(formData);
            setIsOpen(false);
            setCoverPreview(null);
            (e.target as HTMLFormElement).reset();
            toast.success("Divisi berhasil ditambahkan");
        } catch (error) {
            console.error("Failed to create team:", error);
            toast.error("Gagal menambahkan divisi");
        } finally {
            setIsPending(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger 
                render={
                    <Button className="h-14 px-8 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:-translate-y-0.5 active:translate-y-0 group" />
                }
            >
                <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                Tambah Divisi Baru
            </DialogTrigger>
            <DialogContent className="sm:max-w-[650px] bg-white dark:bg-zinc-950 border-slate-200 dark:border-zinc-800 rounded-[2.5rem] shadow-2xl p-0 overflow-hidden">
                <form onSubmit={handleSubmit}>
                    <DialogHeader className="p-8 pb-0">
                        <DialogTitle className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Buat Divisi Baru</DialogTitle>
                        <DialogDescription className="text-slate-500 dark:text-zinc-400 mt-2">
                            Tentukan identitas visual dan detail divisi untuk tampilan premium.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="p-8 space-y-8">
                        {/* Image Uploads Grid */}
                        <div className="space-y-4">
                            <Label className="text-[10px] text-slate-400 dark:text-zinc-500 uppercase font-bold tracking-[0.2em] pl-1">Division Cover Image (Main Background)</Label>
                            <div 
                                onClick={() => coverInputRef.current?.click()}
                                className={cn(
                                    "relative h-56 rounded-3xl border-2 border-dashed transition-all cursor-pointer flex flex-col items-center justify-center overflow-hidden",
                                    coverPreview 
                                        ? "border-blue-500/50 bg-blue-500/5" 
                                        : "border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900/50 hover:border-blue-500/30 hover:bg-blue-500/5"
                                )}
                            >
                                {coverPreview ? (
                                    <>
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={coverPreview} alt="Cover Preview" className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <Button type="button" variant="secondary" size="sm" className="rounded-full font-bold">Ganti Cover</Button>
                                        </div>
                                        <button 
                                            type="button"
                                            onClick={(e) => { e.stopPropagation(); removeImage(); }}
                                            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </>
                                ) : (
                                    <div className="text-center space-y-1">
                                        <ImageIcon className="w-8 h-8 text-blue-500 mx-auto mb-2 opacity-50" />
                                        <p className="text-xs font-bold text-slate-600 dark:text-zinc-300">Upload Cover</p>
                                        <p className="text-[10px] text-slate-400 dark:text-zinc-500 uppercase tracking-widest">16:10 Ratio</p>
                                    </div>
                                )}
                                <input type="file" name="coverImage" ref={coverInputRef} className="hidden" accept="image/*" onChange={handleImageChange} />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-[10px] text-slate-400 dark:text-zinc-500 uppercase font-bold tracking-[0.2em] pl-1">Nama Divisi</Label>
                            <Input name="name" placeholder="Contoh: Creative Media" required className="bg-slate-50 dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 h-12 rounded-xl focus:ring-blue-500/20" />
                        </div>

                        <div className="space-y-2">
                            <Label className="text-[10px] text-slate-400 dark:text-zinc-500 uppercase font-bold tracking-[0.2em] pl-1">Deskripsi Singkat</Label>
                            <Input name="description" placeholder="Ceritakan identitas visual dan misi divisi ini..." className="bg-slate-50 dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 h-12 rounded-xl focus:ring-blue-500/20" />
                        </div>
                    </div>

                    <DialogFooter className="p-8 pt-0 flex flex-col-reverse sm:flex-row gap-3">
                        <Button type="button" variant="ghost" onClick={() => setIsOpen(false)} className="h-12 rounded-xl font-bold">
                            Batal
                        </Button>
                        <Button type="submit" disabled={isPending} className="h-12 px-8 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all shadow-lg shadow-blue-500/20 flex-1">
                            {isPending ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                "Simpan Divisi"
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
