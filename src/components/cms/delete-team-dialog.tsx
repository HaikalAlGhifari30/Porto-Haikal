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
                        className="w-9 h-9 rounded-none bg-white dark:bg-[#0E1217] border-2 border-black dark:border-white flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-retro-xs"
                        onClick={(e) => e.stopPropagation()}
                    />
                }
            >
                <Trash2 className="w-4 h-4 stroke-[2.5]" />
            </DialogTrigger>
            <DialogContent 
                className="sm:max-w-sm bg-[#FAF6ED] dark:bg-[#151B22] border-2 border-black dark:border-white rounded-none p-8 flex flex-col items-center text-center shadow-retro-md"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="w-14 h-14 rounded-none bg-red-500 border-2 border-black flex items-center justify-center mb-6 text-white shadow-retro-xs">
                    <AlertTriangle className="w-8 h-8 stroke-[2.5]" />
                </div>
                <DialogHeader>
                    <DialogTitle className="text-xl font-black uppercase text-slate-900 dark:text-white mb-2">Hapus Divisi?</DialogTitle>
                </DialogHeader>
                <p className="text-xs text-slate-700 dark:text-zinc-300 font-bold mb-8 leading-relaxed px-2">
                    {confirmStep === 0 ? (
                        <>Apakah Anda yakin ingin menghapus divisi <span className="font-black text-slate-900 dark:text-white">"{team.name}"</span>? Seluruh data posisi dan anggota di dalamnya juga akan terhapus.</>
                    ) : (
                        <span className="text-red-600 dark:text-red-400 font-black uppercase text-xs animate-in fade-in slide-in-from-top-2 duration-300 block">
                            PERINGATAN: Seluruh data anggota, posisi, dan struktur di dalam divisi ini akan DIHAPUS PERMANEN!
                        </span>
                    )}
                </p>
                <div className="flex w-full gap-3">
                    <Button 
                        variant="outline" 
                        className="flex-1 h-11 rounded-none border-2 border-black dark:border-white font-black uppercase text-xs hover:bg-slate-200 dark:hover:bg-zinc-800"
                        onClick={() => setIsOpen(false)}
                        disabled={isDeleting}
                    >
                        Batal
                    </Button>
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
                                ? "Ya, Hapus" 
                                : "Yakin? Sekali Lagi"
                        }
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
