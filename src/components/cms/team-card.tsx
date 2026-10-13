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
            <Card className="bg-[#FAF6ED] dark:bg-[#151B22] border-2 border-black dark:border-white rounded-none overflow-hidden shadow-retro-sm transition-all hover:shadow-retro-md">
                <CardHeader className="flex flex-row items-center justify-between p-6 border-b-2 border-black dark:border-white bg-white dark:bg-[#0E1217]">
                    <div>
                        <CardTitle className="text-xl font-black uppercase text-slate-900 dark:text-white">{team.name}</CardTitle>
                        <p className="text-xs font-bold text-amber-600 dark:text-[#FACC15] mt-1">/{team.slug}</p>
                    </div>
                    <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-9 px-4 rounded-none hover:bg-red-500 hover:text-white text-red-500 border border-red-500 transition-colors font-black uppercase text-xs shadow-retro-xs"
                        onClick={() => setIsDeleteOpen(true)}
                    >
                        Hapus Divisi
                    </Button>
                </CardHeader>
                <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="h-4 w-1 bg-[#FACC15] border border-black" />
                        <h4 className="text-xs font-black text-slate-700 dark:text-zinc-300 uppercase tracking-widest">Hierarki Posisi</h4>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                        {team.positions.map(pos => (
                            <div key={pos.id} className="flex items-center justify-between bg-white dark:bg-[#0E1217] p-4 rounded-none border-2 border-black dark:border-white group shadow-retro-xs">
                                <div className="min-0">
                                    <p className="text-sm font-black text-slate-900 dark:text-white uppercase truncate">{pos.name}</p>
                                    <p className="text-[10px] text-slate-500 dark:text-zinc-400 font-bold uppercase tracking-widest mt-1">Level {pos.hierarchyLevel}</p>
                                </div>
                                <form action={deletePosition}>
                                    <input type="hidden" name="id" value={pos.id} />
                                    <Button 
                                        type="submit" 
                                        variant="ghost" 
                                        size="icon" 
                                        className="h-8 w-8 rounded-none border border-black text-slate-500 hover:text-white hover:bg-red-500 opacity-0 group-hover:opacity-100 transition-all"
                                    >
                                        <X className="w-4 h-4" />
                                    </Button>
                                </form>
                            </div>
                        ))}
                        {team.positions.length === 0 && (
                            <div className="col-span-full py-4 text-center text-slate-500 dark:text-zinc-400 text-xs italic font-bold">
                                Belum ada posisi yang didefinisikan.
                            </div>
                        )}
                    </div>
                    
                    <div className="pt-6 border-t-2 border-black dark:border-white">
                        <form action={createPosition} className="flex flex-col md:flex-row gap-4 items-end">
                            <input type="hidden" name="teamId" value={team.id} />
                            <div className="space-y-2 flex-1 w-full">
                                <Label className="text-[10px] text-slate-800 dark:text-zinc-200 uppercase font-black tracking-widest pl-1">Nama Posisi Baru</Label>
                                <Input name="name" placeholder="Tech Lead" required className="bg-white dark:bg-[#0E1217] border-2 border-black dark:border-white text-slate-900 dark:text-white h-11 rounded-none font-bold text-sm" />
                            </div>
                            <div className="space-y-2 w-full md:w-24">
                                <Label className="text-[10px] text-slate-800 dark:text-zinc-200 uppercase font-black tracking-widest pl-1">Level</Label>
                                <Input name="hierarchyLevel" type="number" min="1" placeholder="1" required className="bg-white dark:bg-[#0E1217] border-2 border-black dark:border-white text-slate-900 dark:text-white h-11 rounded-none font-bold text-sm" />
                            </div>
                            <Button type="submit" variant="secondary" className="h-11 px-6 rounded-none bg-[#FACC15] hover:bg-yellow-300 text-black font-black uppercase text-xs border-2 border-black shadow-retro-xs transition-all w-full md:w-auto">Tambah Posisi</Button>
                        </form>
                    </div>
                </CardContent>
            </Card>

            <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                <DialogContent className="sm:max-w-sm bg-[#FAF6ED] dark:bg-[#151B22] border-2 border-black dark:border-white rounded-none p-8 flex flex-col items-center text-center shadow-retro-md">
                    <div className="w-14 h-14 rounded-none bg-red-500 border-2 border-black flex items-center justify-center mb-6 text-white shadow-retro-xs">
                        <AlertTriangle className="w-8 h-8 stroke-[2.5]" />
                    </div>
                    <DialogHeader>
                        <DialogTitle className="text-xl font-black uppercase text-slate-900 dark:text-white mb-2">Hapus Divisi?</DialogTitle>
                    </DialogHeader>
                    <p className="text-xs text-slate-700 dark:text-zinc-300 font-bold mb-8 leading-relaxed">
                        Apakah Anda yakin ingin menghapus divisi <span className="font-black text-slate-900 dark:text-white">"{team.name}"</span>? Seluruh data posisi dan anggota di dalamnya juga akan terhapus.
                    </p>
                    <div className="flex w-full gap-3">
                        <Button 
                            variant="outline" 
                            className="flex-1 h-11 rounded-none border-2 border-black dark:border-white font-black uppercase text-xs hover:bg-slate-200 dark:hover:bg-zinc-800"
                            onClick={() => setIsDeleteOpen(false)}
                            disabled={isDeleting}
                        >
                            Batal
                        </Button>
                        <Button 
                            variant="destructive" 
                            className="flex-1 h-11 rounded-none bg-red-500 hover:bg-red-600 text-white font-black uppercase text-xs border-2 border-black shadow-retro-xs"
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
