"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Trash2, AlertTriangle } from "lucide-react";
import { deleteTeam } from "@/actions/team";
import { toast } from "sonner";

interface DeleteTeamDialogProps {
    team: {
        id: string;
        name: string;
    };
}

export function DeleteTeamDialog({ team }: DeleteTeamDialogProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [confirmStep, setConfirmStep] = useState(0);

    const handleDelete = async () => {
        if (confirmStep === 0) {
            setConfirmStep(1);
            return;
        }

        setIsDeleting(true);
        try {
            await deleteTeam(team.id);
            setIsOpen(false);
            setConfirmStep(0);
            toast.success("Divisi berhasil dihapus");
        } catch (error) {
            console.error("Failed to delete team", error);
            toast.error("Gagal menghapus divisi");
            setConfirmStep(0);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={(val) => {
            setIsOpen(val);
            if (!val) setConfirmStep(0);
        }}>
            <DialogTrigger 
                render={
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        className="w-9 h-9 rounded-full bg-red-500/10 backdrop-blur-md border border-red-500/20 flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all"
                        onClick={(e) => e.stopPropagation()}
                    />
                }
            >
                <Trash2 className="w-4 h-4" />
            </DialogTrigger>
            <DialogContent 
                className="sm:max-w-sm bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 rounded-[2.5rem] p-10 flex flex-col items-center text-center shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="w-20 h-20 rounded-full bg-red-100 dark:bg-red-500/10 flex items-center justify-center mb-8 text-red-500 animate-pulse">
                    <AlertTriangle className="w-10 h-10" />
                </div>
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Hapus Divisi?</DialogTitle>
                </DialogHeader>
                <p className="text-sm text-slate-500 dark:text-zinc-400 mb-10 leading-relaxed px-4">
                    {confirmStep === 0 ? (
                        <>Apakah Anda yakin ingin menghapus divisi <span className="font-bold text-slate-900 dark:text-white">"{team.name}"</span>? Seluruh data posisi dan anggota di dalamnya juga akan terhapus.</>
                    ) : (
                        <span className="text-red-500 font-bold animate-in fade-in slide-in-from-top-2 duration-300 block">
                            PERINGATAN: Seluruh data anggota, posisi, dan struktur di dalam divisi ini akan DIHAPUS PERMANEN. Tindakan ini tidak dapat dibatalkan.
                        </span>
                    )}
                </p>
                <div className="flex w-full gap-3">
                    <Button 
                        variant="outline" 
                        className="flex-1 h-14 rounded-2xl border-slate-200 dark:border-zinc-800 font-bold hover:bg-slate-50 dark:hover:bg-zinc-800"
                        onClick={() => setIsOpen(false)}
                        disabled={isDeleting}
                    >
                        Batal
                    </Button>
                    <Button 
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className={cn(
                            "flex-1 h-14 rounded-2xl font-bold shadow-lg transition-all",
                            confirmStep === 0 
                                ? "bg-red-500 hover:bg-red-600 text-white shadow-red-500/30" 
                                : "bg-amber-500 hover:bg-amber-600 text-white shadow-amber-500/30 animate-pulse"
                        )}
                    >
                        {isDeleting 
                            ? "Menghapus..." 
                            : confirmStep === 0 
                                ? "Ya, Hapus" 
                                : "Yakin? Sekali Lagi"
                        }
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
