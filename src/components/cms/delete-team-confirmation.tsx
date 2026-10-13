"use client";

import { useState } from "react";
import { Trash2, AlertTriangle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { deleteTeam } from "@/actions/team";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface DeleteTeamConfirmationProps {
    teamId: string;
    teamName: string;
}

export function DeleteTeamConfirmation({ teamId, teamName }: DeleteTeamConfirmationProps) {
    const [open, setOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [confirmStep, setConfirmStep] = useState(0);
    const router = useRouter();

    async function handleDelete() {
        if (confirmStep === 0) {
            setConfirmStep(1);
            return;
        }

        setIsDeleting(true);
        try {
            await deleteTeam(teamId);
            setOpen(false);
            setConfirmStep(0);
            toast.success("Divisi berhasil dihapus");
            router.push("/cms/teams");
            router.refresh();
        } catch (error) {
            toast.error("Gagal menghapus divisi");
            setIsDeleting(false);
            setConfirmStep(0);
        }
    }

    return (
        <Dialog open={open} onOpenChange={(val) => {
            setOpen(val);
            if (!val) setConfirmStep(0);
        }}>
            <DialogTrigger 
                render={
                    <Button variant="ghost" className="h-11 px-6 rounded-none text-red-500 hover:bg-red-500 hover:text-white dark:hover:bg-red-500/20 font-black uppercase text-xs border-2 border-red-500 shadow-retro-xs transition-all" />
                }
            >
                <Trash2 className="w-4 h-4 mr-2 stroke-[2.5]" /> Delete Division
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-[#FAF6ED] dark:bg-[#151B22] border-2 border-black dark:border-white rounded-none p-8 shadow-retro-md">
                <DialogHeader className="mb-6">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-none bg-red-500 border-2 border-black flex items-center justify-center text-white shadow-retro-xs">
                            <AlertTriangle className="w-5 h-5 stroke-[2.5]" />
                        </div>
                        <DialogTitle className="text-xl font-black uppercase text-slate-900 dark:text-white">Hapus Divisi?</DialogTitle>
                    </div>
                    <p className="text-xs text-slate-700 dark:text-zinc-300 font-bold leading-relaxed">
                        Tindakan ini bersifat permanen. Seluruh data anggota dan posisi dalam divisi <span className="font-black text-red-600 underline">{teamName}</span> akan dihapus selamanya.
                    </p>
                </DialogHeader>
                <div className="space-y-6">
                    <div className="flex gap-3 pt-4 border-t-2 border-black dark:border-white">
                        <DialogClose render={<Button variant="ghost" className="flex-1 h-11 rounded-none border-2 border-black dark:border-white font-black uppercase text-xs hover:bg-slate-200 dark:hover:bg-zinc-800" />}>
                            Batal
                        </DialogClose>
                        <Button 
                            onClick={handleDelete}
                            disabled={isDeleting}
                            className={cn(
                                "flex-1 h-11 rounded-none font-black uppercase text-xs border-2 border-black text-white shadow-retro-xs transition-all",
                                confirmStep === 0 
                                    ? "bg-red-500 hover:bg-red-600" 
                                    : "bg-amber-500 hover:bg-amber-600 text-black animate-pulse"
                            )}
                        >
                            {isDeleting 
                                ? "Menghapus..." 
                                : confirmStep === 0 
                                    ? "Ya, Hapus Divisi" 
                                    : "Yakin? Klik Sekali Lagi"
                            }
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
