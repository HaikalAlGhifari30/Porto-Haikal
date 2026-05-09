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
                    <Button variant="ghost" className="h-12 px-6 rounded-2xl text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/10 font-bold border border-transparent hover:border-red-200 dark:hover:border-red-500/20 transition-all" />
                }
            >
                <Trash2 className="w-4 h-4 mr-2" /> Delete Division
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-white dark:bg-zinc-950 border-slate-200 dark:border-zinc-800 rounded-[2.5rem] p-8 !backdrop-blur-xl">
                <DialogHeader className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-500">
                            <AlertTriangle className="w-5 h-5" />
                        </div>
                        <DialogTitle className="text-xl font-bold text-slate-900 dark:text-white">Hapus Divisi?</DialogTitle>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-zinc-400 font-medium leading-relaxed">
                        Tindakan ini bersifat permanen. Seluruh data anggota dan posisi dalam divisi <span className="font-bold text-red-500">{teamName}</span> akan dihapus selamanya.
                    </p>
                </DialogHeader>
                <div className="space-y-6">
                    <div className="flex gap-3 pt-4">
                        <DialogClose render={<Button variant="ghost" className="flex-1 h-12 rounded-xl text-slate-500 font-bold" />}>
                            Batal
                        </DialogClose>
                        <Button 
                            onClick={handleDelete}
                            disabled={isDeleting}
                            className={cn(
                                "flex-1 h-12 rounded-xl font-bold shadow-lg transition-all",
                                confirmStep === 0 
                                    ? "bg-red-600 hover:bg-red-700 text-white shadow-red-500/20" 
                                    : "bg-amber-500 hover:bg-amber-600 text-white shadow-amber-500/20 animate-pulse"
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
