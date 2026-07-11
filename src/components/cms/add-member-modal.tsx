"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import { Plus, Upload, X, Image as ImageIcon, Loader2, Mail } from "lucide-react";
import { FaInstagram, FaFacebookF, FaLinkedinIn, FaGlobe } from "react-icons/fa";
import { createMember } from "@/actions/member";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface AddMemberModalProps {
    teamId: string;
    positions: { id: string; name: string }[];
}

export function AddMemberModal({ teamId, positions }: AddMemberModalProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);
    const photoInputRef = useRef<HTMLInputElement>(null);

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const removePhoto = () => {
        setPhotoPreview(null);
        if (photoInputRef.current) photoInputRef.current.value = "";
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isPending) return;
        setIsPending(true);
        const formData = new FormData(e.currentTarget);
        
        try {
            await createMember(formData);
            setIsOpen(false);
            setPhotoPreview(null);
            (e.target as HTMLFormElement).reset();
            toast.success("Anggota berhasil ditambahkan");
        } catch (error) {
            console.error("Failed to add member:", error);
            toast.error("Gagal menambahkan anggota");
        } finally {
            setIsPending(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger 
                render={
                    <Button className="h-12 px-6 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:-translate-y-0.5 active:translate-y-0 group" />
                }
            >
                <Plus className="w-4 h-4 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                Tambah Anggota
            </DialogTrigger>
            <DialogContent className="sm:max-w-[750px] w-[96vw] bg-white dark:bg-zinc-950 border-slate-200 dark:border-zinc-800 rounded-[2.5rem] shadow-2xl p-0 max-h-[90vh] overflow-y-auto overflow-x-hidden hide-scrollbar">
                <form onSubmit={handleSubmit}>
                    <input type="hidden" name="teamId" value={teamId} />
                    
                    <DialogHeader className="p-8 pb-0">
                        <DialogTitle className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight leading-none">Tambah Anggota Baru</DialogTitle>
                        <DialogDescription className="text-slate-500 dark:text-zinc-400 mt-3 text-sm">
                            Lengkapi profil anggota tim PT Rizky Rijaya Karya dengan data premium.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Photo Upload Column */}
                            <div className="md:col-span-1 space-y-4">
                                <Label className="text-[10px] text-slate-400 dark:text-zinc-500 uppercase font-bold tracking-[0.2em] pl-1">Foto Profile</Label>
                                <div 
                                    onClick={() => photoInputRef.current?.click()}
                                    className={cn(
                                        "relative aspect-[3/4] rounded-3xl border-2 border-dashed transition-all cursor-pointer flex flex-col items-center justify-center overflow-hidden group",
                                        photoPreview 
                                            ? "border-blue-500/50 bg-blue-500/5" 
                                            : "border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900/50 hover:border-blue-500/30 hover:bg-blue-500/5"
                                    )}
                                >
                                    {photoPreview ? (
                                        <>
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={photoPreview} alt="Photo Preview" className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                                                <Button type="button" variant="secondary" size="sm" className="rounded-full font-bold">Ganti Foto</Button>
                                            </div>
                                            <button 
                                                type="button"
                                                onClick={(e) => { e.stopPropagation(); removePhoto(); }}
                                                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg z-20"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </>
                                    ) : (
                                        <div className="text-center space-y-2 p-4">
                                            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center mx-auto mb-2">
                                                <Upload className="w-6 h-6 text-blue-500" />
                                            </div>
                                            <p className="text-[11px] font-bold text-slate-600 dark:text-zinc-300 uppercase tracking-widest leading-tight">Klik untuk Upload</p>
                                            <p className="text-[9px] text-slate-400 dark:text-zinc-500 uppercase tracking-tighter">JPG, PNG, WEBP (4:5)</p>
                                        </div>
                                    )}
                                    <input type="file" name="photo" ref={photoInputRef} className="hidden" accept="image/*" onChange={handlePhotoChange} />
                                </div>
                            </div>

                            {/* Details Column */}
                            <div className="md:col-span-2 space-y-6">
                                <div className="space-y-2">
                                    <Label className="text-[10px] text-slate-400 dark:text-zinc-500 uppercase font-bold tracking-[0.2em] pl-1">Nama Lengkap</Label>
                                    <Input name="name" placeholder="Contoh: Haikal Al Ghifari" required className="bg-slate-50 dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 h-11 rounded-xl" />
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-[10px] text-slate-400 dark:text-zinc-500 uppercase font-bold tracking-[0.2em] pl-1">Pilih Posisi</Label>
                                    <select name="positionId" required className="flex h-11 w-full items-center justify-between rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900 px-4 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20">
                                        <option value="">Pilih Posisi...</option>
                                        {positions.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-[10px] text-slate-400 dark:text-zinc-500 uppercase font-bold tracking-[0.2em] pl-1">Bio Singkat</Label>
                                    <Textarea name="bio" placeholder="Tulis bio singkat anggota di sini..." className="bg-slate-50 dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 rounded-xl focus:ring-blue-500/20 resize-none h-24" />
                                </div>
                            </div>
                        </div>

                        {/* Social Media Section */}
                        <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-zinc-800/50">
                            <Label className="text-[10px] text-slate-400 dark:text-zinc-500 uppercase font-bold tracking-[0.2em] pl-1">Social Media & Links (Optional)</Label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="relative">
                                    <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                                    <Input name="email" type="email" placeholder="Email Address (Gmail, etc.)" className="bg-slate-50 dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 h-11 rounded-xl pl-10" />
                                </div>
                                <div className="relative">
                                    <FaInstagram className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                                    <Input name="instagram" placeholder="Instagram URL" className="bg-slate-50 dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 h-11 rounded-xl pl-10" />
                                </div>
                                <div className="relative">
                                    <FaFacebookF className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                                    <Input name="facebook" placeholder="Facebook URL" className="bg-slate-50 dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 h-11 rounded-xl pl-10" />
                                </div>
                                <div className="relative">
                                    <FaLinkedinIn className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                                    <Input name="linkedin" placeholder="LinkedIn URL" className="bg-slate-50 dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 h-11 rounded-xl pl-10" />
                                </div>
                                <div className="relative">
                                    <FaGlobe className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                                    <Input name="website" placeholder="Portfolio / Website URL" className="bg-slate-50 dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 h-11 rounded-xl pl-10" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="p-8 pt-0 flex gap-3">
                        <Button type="button" variant="ghost" onClick={() => setIsOpen(false)} className="h-12 rounded-xl font-bold flex-1">
                            Batal
                        </Button>
                        <Button type="submit" disabled={isPending} className="h-12 px-8 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all shadow-lg shadow-blue-500/20 flex-1">
                            {isPending ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                "Simpan Anggota"
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
