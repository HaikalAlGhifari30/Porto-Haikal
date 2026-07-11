import { getTeamById, createPosition, deletePosition, deleteTeam } from "@/actions/team";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, ArrowLeft, Trash2, X, Plus, Info, LayoutGrid } from "lucide-react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { MemberManagementCMS } from "@/components/cms/member-management-cms";
import { AddPositionModal } from "@/components/cms/add-position-modal";
import { EditPositionModal } from "@/components/cms/edit-position-modal";

export default async function TeamDetailPageCMS({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const team = await getTeamById(id);

    if (!team) {
        notFound();
    }

    return (
        <div className="space-y-10 pb-20">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8 border-b border-slate-100 dark:border-zinc-800/50">
                <div className="space-y-6">
                    <Link href="/cms/teams" className="inline-flex items-center text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-blue-500 transition-colors group">
                        <ArrowLeft className="w-3.5 h-3.5 mr-2 group-hover:-translate-x-1 transition-transform" /> Kembali ke Manajemen Divisi
                    </Link>
                    <div className="flex items-center gap-8">
                        <div className="w-32 h-32 rounded-3xl bg-transparent flex items-center justify-center text-blue-500 overflow-hidden border border-slate-100 dark:border-zinc-800 shadow-sm">
                            {team.logoUrl ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={team.logoUrl} alt={team.name} className="w-full h-full object-contain p-0" />
                            ) : team.imageUrl ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={team.imageUrl} alt={team.name} className="w-full h-full object-cover" />
                            ) : (
                                <Users className="w-12 h-12" />
                            )}
                        </div>
                        <div>
                            <h2 className="text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-none">{team.name}</h2>
                            <div className="flex items-center gap-4 mt-4">
                                <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-blue-600/10 border border-blue-600/20 shadow-sm">
                                    <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                    <span className="text-xs font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest">{team.members.length} Anggota</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Panduan Penggunaan */}
            <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 rounded-xl p-6">
                <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center shrink-0 mt-0.5">
                        <Info className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="space-y-3">
                        <h3 className="text-sm font-bold text-blue-900 dark:text-blue-300">📋 Panduan Mengelola Divisi</h3>
                        <div className="text-sm text-blue-800 dark:text-blue-300/80 space-y-2 leading-relaxed">
                            <p className="font-semibold">Ikuti langkah-langkah berikut untuk mengisi data divisi ini:</p>
                            <ol className="list-decimal list-inside space-y-1.5 ml-1">
                                <li><strong>Buat Posisi/Jabatan terlebih dahulu</strong> — Klik tombol <span className="bg-blue-200/60 dark:bg-blue-800/40 px-1.5 py-0.5 rounded font-bold text-xs">+ Tambah Posisi Baru</span> di panel kiri. Contoh: &quot;Leader&quot;, &quot;Staff&quot;, &quot;Koordinator&quot;. Isi juga <strong>Rank Level</strong> (angka semakin kecil = jabatan semakin tinggi, misal: Leader = 1, Staff = 2).</li>
                                <li><strong>Tambah Anggota</strong> — Setelah posisi dibuat, klik tombol <span className="bg-blue-200/60 dark:bg-blue-800/40 px-1.5 py-0.5 rounded font-bold text-xs">+ Tambah Anggota</span> di panel kanan. Pilih posisi yang sudah Anda buat tadi dari dropdown, lalu isi nama dan data anggota.</li>
                                <li><strong>Atur & Kelola</strong> — Anda bisa mengedit atau menghapus posisi maupun anggota kapan saja dengan mengarahkan kursor ke item yang diinginkan.</li>
                            </ol>
                            <p className="text-xs text-blue-700/70 dark:text-blue-400/60 mt-2 italic">💡 Tips: Posisi yang Anda buat di sini akan digunakan untuk mengelompokkan anggota di halaman publik divisi. Pastikan Rank Level diisi dengan benar agar urutan tampil sesuai hirarki.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
                {/* Info & Stats Column */}
                <div className="lg:col-span-1 space-y-8">

                    {/* Positions Management */}
                    <div className="bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50 dark:shadow-none space-y-8">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                                <LayoutGrid className="w-5 h-5" />
                            </div>
                            <h3 className="font-bold text-slate-900 dark:text-white uppercase tracking-widest text-xs">Struktur Posisi</h3>
                        </div>

                        <div className="space-y-3">
                            {team.positions.map((pos) => (
                                <div key={pos.id} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-zinc-900/50 border border-slate-100 dark:border-zinc-800 group transition-all hover:border-blue-500/20">
                                    <div>
                                        <p className="text-sm font-bold text-slate-900 dark:text-white">{pos.name}</p>
                                        <p className="text-[9px] text-slate-400 dark:text-zinc-500 font-bold uppercase tracking-widest mt-0.5">Level {pos.hierarchyLevel}</p>
                                    </div>
                                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
                                        <EditPositionModal position={pos} teamId={team.id} />
                                        <form action={deletePosition}>
                                            <input type="hidden" name="id" value={pos.id} />
                                            <Button type="submit" variant="ghost" size="icon" className="h-8 w-8 rounded-full text-slate-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all">
                                                <X className="w-4 h-4" />
                                            </Button>
                                        </form>
                                    </div>
                                </div>
                            ))}

                            {team.positions.length === 0 && (
                                <div className="p-6 text-center border-2 border-dashed border-slate-200 dark:border-zinc-800 rounded-2xl">
                                    <p className="text-xs text-slate-400 dark:text-zinc-500 font-medium">Belum ada posisi. Buat posisi terlebih dahulu sebelum menambah anggota.</p>
                                </div>
                            )}
                        </div>
                        
                        <div className="pt-4">
                            <AddPositionModal teamId={team.id} />
                        </div>
                    </div>
                </div>

                {/* Right Column: Member Management List */}
                <div className="lg:col-span-3">
                    <MemberManagementCMS 
                        teamId={team.id} 
                        members={team.members} 
                        positions={team.positions} 
                    />
                </div>
            </div>
        </div>
    );
}

