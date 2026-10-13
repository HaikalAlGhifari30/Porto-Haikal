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
        if (isPending) return;
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
                        className="h-12 px-6 rounded-none bg-[#FACC15] hover:bg-yellow-300 text-black font-black border-2 border-black dark:border-white shadow-retro-xs btn-retro transition-all group"
                    >
                        <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                        Tambah Proyek Baru
                    </Button>
                }
            />
            <DialogContent className="sm:max-w-[700px] rounded-2xl p-0 overflow-hidden border-2 border-black dark:border-white shadow-retro-md bg-white dark:bg-[#151B22]">
                <div className="px-8 py-6 border-b-2 border-black dark:border-white flex items-center justify-between bg-[#FAF6ED] dark:bg-[#0E1217]">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-none bg-[#FACC15] border-2 border-black flex items-center justify-center text-black shadow-retro-xs">
                            <Plus className="w-5 h-5" />
                        </div>
                        <div>
                            <DialogTitle className="text-lg font-black text-slate-900 dark:text-white uppercase leading-none">Informasi Proyek Baru</DialogTitle>
                            <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">Data visual akan otomatis ditarik dari URL.</p>
                        </div>
                    </div>
                </div>
                <div className="p-8">
                    <form action={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-700 dark:text-zinc-300 uppercase tracking-widest pl-1">URL Proyek (Wajib)</label>
                                <Input 
                                    name="url" 
                                    placeholder="https://haikalalghifari.dev" 
                                    required 
                                    className="bg-[#FAF6ED] dark:bg-[#0E1217] border-2 border-black dark:border-white text-slate-900 dark:text-white h-12 rounded-none font-medium" 
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-700 dark:text-zinc-300 uppercase tracking-widest pl-1">Judul Kustom (Opsional)</label>
                                <Input 
                                    name="title" 
                                    placeholder="Nama Proyek Anda" 
                                    className="bg-[#FAF6ED] dark:bg-[#0E1217] border-2 border-black dark:border-white text-slate-900 dark:text-white h-12 rounded-none font-medium" 
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between gap-4 p-4 bg-[#FAF6ED] dark:bg-[#0E1217] border-2 border-black dark:border-white rounded-xl">
                            <div className="flex items-center gap-3">
                                <input 
                                    type="checkbox" 
                                    name="isFeatured" 
                                    value="true" 
                                    id="isFeatured"
                                    className="w-5 h-5 border-2 border-black accent-[#FACC15] cursor-pointer" 
                                />
                                <label htmlFor="isFeatured" className="text-xs font-black text-slate-700 dark:text-zinc-300 cursor-pointer uppercase">Featured Project</label>
                            </div>
                            <Button 
                                type="submit" 
                                disabled={isPending}
                                className="h-11 px-8 rounded-none bg-[#FACC15] hover:bg-yellow-300 text-black font-black border-2 border-black dark:border-white shadow-retro-xs btn-retro"
                            >
                                {isPending ? "Sedang Menyimpan..." : "Simpan Proyek"}
                            </Button>
                        </div>

                        <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-black dark:text-zinc-300 bg-yellow-400/10 p-4 border-2 border-black dark:border-white rounded-xl">
                            <div className="w-2.5 h-2.5 bg-[#FACC15] border border-black animate-pulse" />
                            Data visual & metadata akan otomatis ditarik dari URL menggunakan OpenGraph.
                        </div>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
}
