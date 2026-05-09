"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, AlertTriangle, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { deleteTeam, createPosition, deletePosition } from "@/actions/team";

interface Position {
    id: string;
    name: string;
    hierarchyLevel: number;
}

interface Team {
    id: string;
    name: string;
    slug: string;
    positions: Position[];
}

export function TeamCard({ team }: { team: Team }) {
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            await deleteTeam(team.id);
            setIsDeleteOpen(false);
        } catch (error) {
            console.error("Failed to delete team", error);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <>
            <Card className="bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-lg shadow-slate-200/40 dark:shadow-none transition-all hover:shadow-xl">
                <CardHeader className="flex flex-row items-center justify-between p-8 border-b border-slate-100 dark:border-zinc-800/50 bg-slate-50/30 dark:bg-zinc-900/30">
                    <div>
                        <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white">{team.name}</CardTitle>
                        <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400 mt-1">/{team.slug}</p>
                    </div>
                    <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-9 px-4 rounded-lg hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/10 text-slate-400 transition-colors font-bold"
                        onClick={() => setIsDeleteOpen(true)}
                    >
                        Hapus Divisi
                    </Button>
                </CardHeader>
                <CardContent className="p-8">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="h-4 w-1 bg-emerald-500 rounded-full" />
                        <h4 className="text-xs font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-[0.2em]">Hierarki Posisi</h4>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                        {team.positions.map(pos => (
                            <div key={pos.id} className="flex items-center justify-between bg-slate-50 dark:bg-zinc-950 p-4 rounded-2xl border border-slate-100 dark:border-zinc-800 group hover:border-emerald-500/30 transition-all">
                                <div className="min-0">
                                    <p className="text-sm font-bold text-slate-800 dark:text-slate-200 truncate">{pos.name}</p>
                                    <p className="text-[10px] text-slate-400 dark:text-zinc-500 font-bold uppercase tracking-widest mt-1">Level {pos.hierarchyLevel}</p>
                                </div>
                                <form action={deletePosition}>
                                    <input type="hidden" name="id" value={pos.id} />
                                    <Button 
                                        type="submit" 
                                        variant="ghost" 
                                        size="icon" 
                                        className="h-8 w-8 rounded-full text-slate-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-all"
                                    >
                                        <X className="w-4 h-4" />
                                    </Button>
                                </form>
                            </div>
                        ))}
                        {team.positions.length === 0 && (
                            <div className="col-span-full py-4 text-center text-slate-400 dark:text-zinc-600 text-xs italic">
                                Belum ada posisi yang didefinisikan.
                            </div>
                        )}
                    </div>
                    
                    <div className="pt-6 border-t border-slate-100 dark:border-zinc-800/50">
                        <form action={createPosition} className="flex flex-col md:flex-row gap-4 items-end">
                            <input type="hidden" name="teamId" value={team.id} />
                            <div className="space-y-2 flex-1 w-full">
                                <Label className="text-[10px] text-slate-400 dark:text-zinc-500 uppercase font-bold tracking-widest pl-1">Nama Posisi Baru</Label>
                                <Input name="name" placeholder="Tech Lead" required className="bg-slate-50 dark:bg-zinc-950 border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-white h-11 rounded-xl" />
                            </div>
                            <div className="space-y-2 w-full md:w-24">
                                <Label className="text-[10px] text-slate-400 dark:text-zinc-500 uppercase font-bold tracking-widest pl-1">Level</Label>
                                <Input name="hierarchyLevel" type="number" min="1" placeholder="1" required className="bg-slate-50 dark:bg-zinc-950 border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-white h-11 rounded-xl" />
                            </div>
                            <Button type="submit" variant="secondary" className="h-11 px-6 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-bold hover:bg-slate-800 dark:hover:bg-white transition-all w-full md:w-auto">Tambah Posisi</Button>
                        </form>
                    </div>
                </CardContent>
            </Card>

            <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                <DialogContent className="sm:max-w-sm bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 rounded-[2.5rem] p-10 flex flex-col items-center text-center">
                    <div className="w-20 h-20 rounded-full bg-red-100 dark:bg-red-500/10 flex items-center justify-center mb-8 text-red-500 animate-pulse">
                        <AlertTriangle className="w-10 h-10" />
                    </div>
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Hapus Divisi?</DialogTitle>
                    </DialogHeader>
                    <p className="text-sm text-slate-500 dark:text-zinc-400 mb-10 leading-relaxed">
                        Apakah Anda yakin ingin menghapus divisi <span className="font-bold text-slate-900 dark:text-white">"{team.name}"</span>? Seluruh data posisi dan anggota di dalamnya juga akan terhapus.
                    </p>
                    <div className="flex w-full gap-3">
                        <Button 
                            variant="outline" 
                            className="flex-1 h-14 rounded-2xl border-slate-200 dark:border-zinc-800 font-bold hover:bg-slate-50 dark:hover:bg-zinc-800"
                            onClick={() => setIsDeleteOpen(false)}
                            disabled={isDeleting}
                        >
                            Batal
                        </Button>
                        <Button 
                            variant="destructive" 
                            className="flex-1 h-14 rounded-2xl bg-red-500 hover:bg-red-600 text-white font-bold shadow-[0_0_20px_rgba(239,68,68,0.3)]"
                            onClick={handleDelete}
                            disabled={isDeleting}
                        >
                            {isDeleting ? "Menghapus..." : "Ya, Hapus"}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
