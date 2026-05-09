import { getTeams } from "@/actions/team";
import { AddTeamModal } from "@/components/cms/add-team-modal";
import { DivisionListCMS } from "@/components/cms/division-list-cms";
import { Lightbulb, PlusCircle, MousePointerClick, UserPlus, Layers } from "lucide-react";

export default async function TeamsPage() {
    const teams = await getTeams();

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
                <div className="flex-1">
                    <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-white uppercase font-serif">Manajemen Divisi</h2>
                    <p className="text-sm text-slate-500 dark:text-zinc-400 mt-2 font-medium leading-relaxed max-w-2xl">
                        Atur struktur organisasi, posisi jabatan, dan kelola seluruh anggota Baroedak COMO.
                    </p>
                    
                    <div className="mt-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        {/* Tutorial/Helper Section */}
                        <div className="flex-1 bg-blue-500/[0.03] dark:bg-blue-500/[0.02] border border-blue-500/10 rounded-2xl p-5 animate-in fade-in slide-in-from-top-4 duration-700">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                                    <Lightbulb className="w-4 h-4 text-blue-500" />
                                </div>
                                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Panduan Pengelolaan Divisi</h3>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                                <div className="flex items-start gap-3">
                                    <div className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-blue-500/10 flex items-center justify-center">
                                        <PlusCircle className="w-3 h-3 text-blue-500" />
                                    </div>
                                    <p className="text-[11px] text-slate-500 dark:text-zinc-400 font-medium leading-relaxed">
                                        Klik <span className="text-blue-500 font-bold">"Tambah Divisi Baru"</span> untuk membuat divisi baru.
                                    </p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-blue-500/10 flex items-center justify-center">
                                        <MousePointerClick className="w-3 h-3 text-blue-500" />
                                    </div>
                                    <p className="text-[11px] text-slate-500 dark:text-zinc-400 font-medium leading-relaxed">
                                        Klik <span className="text-blue-500 font-bold">card divisi</span> untuk membuka detail dan mengelola anggota.
                                    </p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-blue-500/10 flex items-center justify-center">
                                        <UserPlus className="w-3 h-3 text-blue-500" />
                                    </div>
                                    <p className="text-[11px] text-slate-500 dark:text-zinc-400 font-medium leading-relaxed">
                                        Tambahkan <span className="text-blue-500 font-bold">anggota langsung</span> dari halaman detail divisi.
                                    </p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-blue-500/10 flex items-center justify-center">
                                        <Layers className="w-3 h-3 text-blue-500" />
                                    </div>
                                    <p className="text-[11px] text-slate-500 dark:text-zinc-400 font-medium leading-relaxed">
                                        Setiap divisi dapat memiliki <span className="text-blue-500 font-bold">struktur & anggota</span> berbeda.
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="shrink-0 flex justify-end">
                            <AddTeamModal />
                        </div>
                    </div>
                </div>
            </div>

            <div className="h-px bg-gradient-to-r from-slate-200 via-transparent to-transparent dark:from-zinc-800 mb-8" />
            
            <DivisionListCMS teams={teams} />
        </div>
    );
}
