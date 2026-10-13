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
                    <Button className="h-11 px-6 rounded-none bg-[#FACC15] hover:bg-yellow-300 text-black border-2 border-black dark:border-white font-black uppercase text-xs shadow-retro-xs group">
                        <Plus className="w-4 h-4 mr-2 stroke-[3] group-hover:rotate-90 transition-transform duration-300" />
                        Tambah Anggota
                    </Button>
                }
            />
            <DialogContent className="sm:max-w-[750px] w-[96vw] bg-[#FAF6ED] dark:bg-[#151B22] border-2 border-black dark:border-white rounded-none shadow-retro-md p-0 max-h-[90vh] overflow-y-auto overflow-x-hidden hide-scrollbar">
                <form onSubmit={handleSubmit}>
                    <input type="hidden" name="teamId" value={teamId} />
                    
                    <DialogHeader className="p-8 pb-0">
                        <DialogTitle className="text-2xl font-black uppercase text-slate-900 dark:text-white tracking-tight leading-none">Tambah Anggota Baru</DialogTitle>
                        <DialogDescription className="text-slate-600 dark:text-zinc-400 mt-2 font-bold text-xs">
                            Lengkapi profil anggota tim dengan data yang akurat.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Photo Upload Column */}
                            <div className="md:col-span-1 space-y-3">
                                <Label className="text-[10px] text-slate-800 dark:text-zinc-200 uppercase font-black tracking-widest pl-1">Foto Profile</Label>
                                <div 
                                    onClick={() => photoInputRef.current?.click()}
                                    className={cn(
                                        "relative aspect-[3/4] rounded-none border-2 border-dashed border-black dark:border-white transition-all cursor-pointer flex flex-col items-center justify-center overflow-hidden group",
                                        photoPreview 
                                            ? "bg-white dark:bg-[#0E1217]" 
                                            : "bg-white dark:bg-[#0E1217] hover:bg-[#FACC15]/10"
                                    )}
                                >
                                    {photoPreview ? (
                                        <>
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={photoPreview} alt="Photo Preview" className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                                                <Button type="button" variant="secondary" size="sm" className="rounded-none font-black text-xs uppercase bg-[#FACC15] text-black border-2 border-black">Ganti Foto</Button>
                                            </div>
                                            <button 
                                                type="button"
                                                onClick={(e) => { e.stopPropagation(); removePhoto(); }}
                                                className="absolute top-3 right-3 w-8 h-8 rounded-none bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors border-2 border-black shadow-retro-xs z-20"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </>
                                    ) : (
                                        <div className="text-center space-y-2 p-4">
                                            <div className="w-10 h-10 rounded-none bg-[#FACC15] border-2 border-black flex items-center justify-center mx-auto mb-2 text-black shadow-retro-xs">
                                                <Upload className="w-5 h-5" />
                                            </div>
                                            <p className="text-[11px] font-black uppercase text-slate-800 dark:text-zinc-200 tracking-widest leading-tight">Klik untuk Upload</p>
                                            <p className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">JPG, PNG, WEBP (4:5)</p>
                                        </div>
                                    )}
                                    <input type="file" name="photo" ref={photoInputRef} className="hidden" accept="image/*" onChange={handlePhotoChange} />
                                </div>
                            </div>

                            {/* Details Column */}
                            <div className="md:col-span-2 space-y-4">
                                <div className="space-y-2">
                                    <Label className="text-[10px] text-slate-800 dark:text-zinc-200 uppercase font-black tracking-widest pl-1">Nama Lengkap</Label>
                                    <Input name="name" placeholder="Contoh: Haikal Al Ghifari" required className="bg-white dark:bg-[#0E1217] border-2 border-black dark:border-white h-11 rounded-none font-bold text-sm" />
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-[10px] text-slate-800 dark:text-zinc-200 uppercase font-black tracking-widest pl-1">Pilih Posisi</Label>
                                    <select name="positionId" required className="flex h-11 w-full items-center justify-between rounded-none border-2 border-black dark:border-white bg-white dark:bg-[#0E1217] px-4 py-2 text-sm text-slate-900 dark:text-white focus:outline-none font-bold">
                                        <option value="">Pilih Posisi...</option>
                                        {positions.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-[10px] text-slate-800 dark:text-zinc-200 uppercase font-black tracking-widest pl-1">Bio Singkat</Label>
                                    <Textarea name="bio" placeholder="Tulis bio singkat anggota di sini..." className="bg-white dark:bg-[#0E1217] border-2 border-black dark:border-white rounded-none font-bold text-sm resize-none h-24" />
                                </div>
                            </div>
                        </div>

                        {/* Social Media Section */}
                        <div className="space-y-4 pt-4 border-t-2 border-black dark:border-white">
                            <Label className="text-[10px] text-slate-800 dark:text-zinc-200 uppercase font-black tracking-widest pl-1">Social Media & Links (Optional)</Label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="relative">
                                    <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                                    <Input name="email" type="email" placeholder="Email Address (Gmail, etc.)" className="bg-white dark:bg-[#0E1217] border-2 border-black dark:border-white h-11 rounded-none font-bold text-sm pl-10" />
                                </div>
                                <div className="relative">
                                    <FaInstagram className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                                    <Input name="instagram" placeholder="Instagram URL" className="bg-white dark:bg-[#0E1217] border-2 border-black dark:border-white h-11 rounded-none font-bold text-sm pl-10" />
                                </div>
                                <div className="relative">
                                    <FaFacebookF className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                                    <Input name="facebook" placeholder="Facebook URL" className="bg-white dark:bg-[#0E1217] border-2 border-black dark:border-white h-11 rounded-none font-bold text-sm pl-10" />
                                </div>
                                <div className="relative">
                                    <FaLinkedinIn className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                                    <Input name="linkedin" placeholder="LinkedIn URL" className="bg-white dark:bg-[#0E1217] border-2 border-black dark:border-white h-11 rounded-none font-bold text-sm pl-10" />
                                </div>
                                <div className="relative">
                                    <FaGlobe className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                                    <Input name="website" placeholder="Portfolio / Website URL" className="bg-white dark:bg-[#0E1217] border-2 border-black dark:border-white h-11 rounded-none font-bold text-sm pl-10" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="p-8 pt-0 flex gap-3">
                        <Button type="button" variant="ghost" onClick={() => setIsOpen(false)} className="h-11 rounded-none border-2 border-black dark:border-white font-black uppercase text-xs hover:bg-slate-200 dark:hover:bg-zinc-800 flex-1">
                            Batal
                        </Button>
                        <Button type="submit" disabled={isPending} className="h-11 px-8 rounded-none bg-[#FACC15] hover:bg-yellow-300 text-black border-2 border-black dark:border-white font-black uppercase text-xs shadow-retro-xs flex-1">
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
