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
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-none border-2 border-black dark:border-white bg-white dark:bg-[#0E1217] text-black dark:text-white hover:bg-[#FACC15] hover:text-black opacity-0 group-hover:opacity-100 transition-all shadow-retro-xs">
                        <Edit2 className="w-3.5 h-3.5" />
                    </Button>
                }
            />
            <DialogContent className="sm:max-w-md bg-[#FAF6ED] dark:bg-[#151B22] border-2 border-black dark:border-white rounded-none p-8 shadow-retro-md">
                <DialogHeader className="mb-6">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-none bg-[#FACC15] border-2 border-black flex items-center justify-center text-black shadow-retro-xs">
                            <LayoutGrid className="w-5 h-5" />
                        </div>
                        <DialogTitle className="text-xl font-black uppercase text-slate-900 dark:text-white">Edit Posisi</DialogTitle>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-zinc-400 font-bold">Ubah nama posisi atau tingkat hirarki. Data anggota akan mengikuti perubahan ini otomatis.</p>
                </DialogHeader>

                <form action={handleSubmit} className="space-y-6">
                    <input type="hidden" name="id" value={position.id} />
                    <input type="hidden" name="teamId" value={teamId} />
                    
                    <div className="space-y-2">
                        <Label htmlFor="edit-name" className="text-[10px] text-slate-800 dark:text-zinc-200 uppercase font-black tracking-widest pl-1">Nama Posisi</Label>
                        <Input 
                            id="edit-name"
                            name="name" 
                            defaultValue={position.name}
                            placeholder="Contoh: Senior QA Engineer..." 
                            required 
                            className="bg-white dark:bg-[#0E1217] border-2 border-black dark:border-white h-11 rounded-none text-sm font-bold" 
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="edit-hierarchy" className="text-[10px] text-slate-800 dark:text-zinc-200 uppercase font-black tracking-widest pl-1">Level Hirarki (Rank)</Label>
                        <Input 
                            id="edit-hierarchy"
                            name="hierarchyLevel" 
                            type="number" 
                            min="1" 
                            defaultValue={position.hierarchyLevel}
                            placeholder="Contoh: 1 (Tertinggi)" 
                            required 
                            className="bg-white dark:bg-[#0E1217] border-2 border-black dark:border-white h-11 rounded-none text-sm font-bold" 
                        />
                    </div>

                    <div className="flex gap-3 pt-4 border-t-2 border-black dark:border-white">
                        <Button type="button" variant="ghost" className="flex-1 h-11 rounded-none border-2 border-black dark:border-white font-black uppercase text-xs hover:bg-slate-200 dark:hover:bg-zinc-800" onClick={() => setOpen(false)}>Batal</Button>
                        <Button type="submit" disabled={isPending} className="flex-1 h-11 rounded-none bg-[#FACC15] hover:bg-yellow-300 text-black border-2 border-black dark:border-white font-black uppercase text-xs shadow-retro-xs">
                            {isPending ? "Sedang Menyimpan..." : "Perbarui Posisi"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
