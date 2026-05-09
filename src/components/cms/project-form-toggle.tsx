"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { createProject } from "@/actions/project";
import { toast } from "sonner";

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
        <div className="">
            <AnimatePresence mode="wait">
                {!isOpen ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="flex justify-end"
                    >
                        <Button
                            onClick={() => setIsOpen(true)}
                            className="h-14 px-8 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:-translate-y-0.5 active:translate-y-0 group"
                        >
                            <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                            Tambah Proyek Baru
                        </Button>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="overflow-hidden"
                    >
                        <Card className="bg-white dark:bg-zinc-950 border-slate-200 dark:border-zinc-800 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 dark:shadow-none overflow-hidden mb-12">
                            <div className="px-8 py-6 border-b border-slate-100 dark:border-zinc-800/50 flex items-center justify-between bg-slate-50/50 dark:bg-zinc-900/30">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                                        <Plus className="w-5 h-5 text-blue-500" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-none font-serif">Informasi Proyek Baru</h3>
                                        <p className="text-xs text-slate-500 dark:text-zinc-500 mt-1">Data visual akan otomatis ditarik dari URL.</p>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => setIsOpen(false)}
                                    className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-zinc-800 flex items-center justify-center text-slate-500 hover:text-red-500 transition-all"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            <CardContent className="p-8">
                                <form action={handleSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-6">
                                    <div className="md:col-span-5 space-y-2">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">URL Proyek (Wajib)</label>
                                        <Input 
                                            name="url" 
                                            placeholder="https://baroedak-como.com" 
                                            required 
                                            className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white h-14 rounded-2xl focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all" 
                                        />
                                    </div>
                                    <div className="md:col-span-4 space-y-2">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Judul Kustom (Opsional)</label>
                                        <Input 
                                            name="title" 
                                            placeholder="Nama Proyek Anda" 
                                            className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white h-14 rounded-2xl focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all" 
                                        />
                                    </div>
                                    <div className="md:col-span-3 flex flex-col gap-2">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Aksi</label>
                                        <div className="flex gap-2">
                                            <div className="flex-1 flex items-center gap-3 h-14 px-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl group hover:border-blue-500/30 transition-colors">
                                                <input 
                                                    type="checkbox" 
                                                    name="isFeatured" 
                                                    value="true" 
                                                    id="isFeatured"
                                                    className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" 
                                                />
                                                <label htmlFor="isFeatured" className="text-xs font-bold text-slate-600 dark:text-zinc-400 cursor-pointer">Featured</label>
                                            </div>
                                            <Button 
                                                type="submit" 
                                                disabled={isPending}
                                                className="h-14 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all shadow-lg shadow-blue-500/20"
                                            >
                                                {isPending ? "..." : "Simpan"}
                                            </Button>
                                        </div>
                                    </div>
                                </form>
                                <div className="mt-6 flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-zinc-500 bg-blue-500/5 p-4 rounded-xl border border-blue-500/10">
                                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                                    Data visual & metadata akan otomatis ditarik dari URL menggunakan OpenGraph.
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
