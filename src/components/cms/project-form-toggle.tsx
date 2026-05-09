"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Sparkles } from "lucide-react";
import { createProject } from "@/actions/project";
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

export function ProjectFormToggle() {
    const [isOpen, setIsOpen] = useState(false);
    const [isPending, setIsPending] = useState(false);

    const handleSubmit = async (formData: FormData) => {
        setIsPending(true);
        try {
            await createProject(formData);
            toast.success("Proyek berhasil ditambahkan!");
            setIsOpen(false);
        } catch (error) {
            toast.error("Gagal menambahkan proyek.");
        } finally {
            setIsPending(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger 
                render={
                    <Button
                        className="h-14 px-8 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:-translate-y-0.5 active:translate-y-0 group"
                    >
                        <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                        Tambah Proyek Baru
                    </Button>
                }
            />
            <DialogContent className="sm:max-w-[700px] rounded-[2.5rem] p-0 overflow-hidden border-none shadow-2xl dark:bg-zinc-950">
                <div className="px-8 py-6 border-b border-slate-100 dark:border-zinc-800/50 flex items-center justify-between bg-slate-50/50 dark:bg-zinc-900/30">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                            <Plus className="w-5 h-5 text-blue-500" />
                        </div>
                        <div>
                            <DialogTitle className="text-lg font-bold text-slate-900 dark:text-white leading-none font-serif">Informasi Proyek Baru</DialogTitle>
                            <p className="text-xs text-slate-500 dark:text-zinc-500 mt-1">Data visual akan otomatis ditarik dari URL.</p>
                        </div>
                    </div>
                </div>
                <div className="p-8">
                    <form action={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">URL Proyek (Wajib)</label>
                                <Input 
                                    name="url" 
                                    placeholder="https://baroedak-como.com" 
                                    required 
                                    className="bg-slate-50 dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-white h-14 rounded-2xl focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all" 
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Judul Kustom (Opsional)</label>
                                <Input 
                                    name="title" 
                                    placeholder="Nama Proyek Anda" 
                                    className="bg-slate-50 dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-white h-14 rounded-2xl focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all" 
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between gap-4 p-4 bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl">
                            <div className="flex items-center gap-3">
                                <input 
                                    type="checkbox" 
                                    name="isFeatured" 
                                    value="true" 
                                    id="isFeatured"
                                    className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" 
                                />
                                <label htmlFor="isFeatured" className="text-xs font-bold text-slate-600 dark:text-zinc-400 cursor-pointer">Featured Project</label>
                            </div>
                            <Button 
                                type="submit" 
                                disabled={isPending}
                                className="h-12 px-8 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all shadow-lg shadow-blue-500/20"
                            >
                                {isPending ? "Sedang Menyimpan..." : "Simpan Proyek"}
                            </Button>
                        </div>

                        <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-zinc-500 bg-blue-500/5 p-4 rounded-xl border border-blue-500/10">
                            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                            Data visual & metadata akan otomatis ditarik dari URL menggunakan OpenGraph.
                        </div>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
}
