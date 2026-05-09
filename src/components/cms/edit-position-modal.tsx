"use client";

import { useState } from "react";
import { Edit2, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { updatePositionAction } from "@/actions/team";
import { toast } from "sonner";

interface EditPositionModalProps {
    position: {
        id: string;
        name: string;
        hierarchyLevel: number;
    };
    teamId: string;
}

export function EditPositionModal({ position, teamId }: EditPositionModalProps) {
    const [isPending, setIsPending] = useState(false);
    const [open, setOpen] = useState(false);

    async function handleSubmit(formData: FormData) {
        if (isPending) return;
        setIsPending(true);
        try {
            await updatePositionAction(formData);
            setOpen(false);
            toast.success("Posisi berhasil diperbarui");
        } catch (error) {
            toast.error("Gagal memperbarui posisi");
        } finally {
            setIsPending(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger 
                render={
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-slate-300 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-all" />
                }
            >
                <Edit2 className="w-3.5 h-3.5" />
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-white dark:bg-zinc-950 border-slate-200 dark:border-zinc-800 rounded-[2.5rem] p-8 !backdrop-blur-xl">
                <DialogHeader className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                            <LayoutGrid className="w-5 h-5" />
                        </div>
                        <DialogTitle className="text-xl font-bold text-slate-900 dark:text-white">Edit Posisi</DialogTitle>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-zinc-400 font-medium">Ubah nama posisi atau tingkat hirarki. Data anggota akan mengikuti perubahan ini otomatis.</p>
                </DialogHeader>

                <form action={handleSubmit} className="space-y-6">
                    <input type="hidden" name="id" value={position.id} />
                    <input type="hidden" name="teamId" value={teamId} />
                    
                    <div className="space-y-2">
                        <Label htmlFor="edit-name" className="text-[10px] text-slate-400 dark:text-zinc-500 uppercase font-bold tracking-[0.2em] pl-1">Nama Posisi</Label>
                        <Input 
                            id="edit-name"
                            name="name" 
                            defaultValue={position.name}
                            placeholder="Contoh: Senior Developer..." 
                            required 
                            className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 h-12 rounded-xl text-sm font-medium" 
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="edit-hierarchy" className="text-[10px] text-slate-400 dark:text-zinc-500 uppercase font-bold tracking-[0.2em] pl-1">Level Hirarki (Rank)</Label>
                        <Input 
                            id="edit-hierarchy"
                            name="hierarchyLevel" 
                            type="number" 
                            min="1" 
                            defaultValue={position.hierarchyLevel}
                            placeholder="Contoh: 1 (Tertinggi)" 
                            required 
                            className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 h-12 rounded-xl text-sm font-medium" 
                        />
                    </div>

                    <div className="flex gap-3 pt-4">
                        <Button type="button" variant="ghost" className="flex-1 h-12 rounded-xl text-slate-500 font-bold" onClick={() => setOpen(false)}>Batal</Button>
                        <Button type="submit" disabled={isPending} className="flex-1 h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-500/20">
                            {isPending ? "Sedang Menyimpan..." : "Perbarui Posisi"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
