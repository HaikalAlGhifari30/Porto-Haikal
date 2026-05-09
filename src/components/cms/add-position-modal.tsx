"use client";

import { useState } from "react";
import { Plus, LayoutGrid, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { createPosition } from "@/actions/team";
import { toast } from "sonner";

interface AddPositionModalProps {
    teamId: string;
}

export function AddPositionModal({ teamId }: AddPositionModalProps) {
    const [open, setOpen] = useState(false);

    async function handleSubmit(formData: FormData) {
        try {
            await createPosition(formData);
            setOpen(false);
            toast.success("Posisi berhasil ditambahkan");
        } catch (error) {
            toast.error("Gagal menambahkan posisi");
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger 
                render={
                    <Button className="w-full h-12 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-500/20 group transition-all" />
                }
            >
                <Plus className="w-4 h-4 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                Tambah Posisi Baru
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-white dark:bg-zinc-950 border-slate-200 dark:border-zinc-800 rounded-[2.5rem] p-8 !backdrop-blur-xl">
                <DialogHeader className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                            <LayoutGrid className="w-5 h-5" />
                        </div>
                        <DialogTitle className="text-xl font-bold text-slate-900 dark:text-white">Tambah Posisi Baru</DialogTitle>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-zinc-400 font-medium">Tentukan nama posisi dan level hirarki dalam divisi ini.</p>
                </DialogHeader>

                <form action={handleSubmit} className="space-y-6">
                    <input type="hidden" name="teamId" value={teamId} />
                    
                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-[10px] text-slate-400 dark:text-zinc-500 uppercase font-bold tracking-[0.2em] pl-1">Nama Posisi</Label>
                        <Input 
                            id="name"
                            name="name" 
                            placeholder="Contoh: Senior Developer, Head of Media..." 
                            required 
                            className="bg-slate-50 dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 h-12 rounded-xl text-sm font-medium" 
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="hierarchyLevel" className="text-[10px] text-slate-400 dark:text-zinc-500 uppercase font-bold tracking-[0.2em] pl-1">Level Hirarki (Rank)</Label>
                        <Input 
                            id="hierarchyLevel"
                            name="hierarchyLevel" 
                            type="number" 
                            min="1" 
                            placeholder="Contoh: 1 (Tertinggi)" 
                            required 
                            className="bg-slate-50 dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 h-12 rounded-xl text-sm font-medium" 
                        />
                        <p className="text-[10px] text-slate-400 italic">Level 1 biasanya digunakan untuk posisi pimpinan divisi.</p>
                    </div>

                    <div className="flex gap-3 pt-4">
                        <Button type="button" variant="ghost" className="flex-1 h-12 rounded-xl text-slate-500 font-bold" onClick={() => setOpen(false)}>Batal</Button>
                        <Button type="submit" className="flex-1 h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-500/20">Simpan Posisi</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
