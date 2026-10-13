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
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8 border-b-2 border-black dark:border-white">
                <div className="space-y-6">
                    <Link href="/cms/teams" className="inline-flex items-center text-xs font-black uppercase tracking-widest text-slate-600 dark:text-zinc-400 hover:text-[#FACC15] transition-colors group">
                        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Kembali ke Manajemen Divisi
                    </Link>
                    <div className="flex items-center gap-6">
                        <div className="w-24 h-24 rounded-none bg-white dark:bg-[#151B22] flex items-center justify-center text-black dark:text-white overflow-hidden border-2 border-black dark:border-white shadow-retro-sm">
                            {team.logoUrl ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={team.logoUrl} alt={team.name} className="w-full h-full object-contain p-2" />
                            ) : team.imageUrl ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={team.imageUrl} alt={team.name} className="w-full h-full object-cover" />
                            ) : (
                                <Users className="w-10 h-10" />
                            )}
                        </div>
                        <div>
                            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-slate-900 dark:text-white leading-none">{team.name}</h2>
                            <div className="flex items-center gap-4 mt-4">
                                <div className="flex items-center gap-2 px-3 py-1.5 rounded-none bg-[#FACC15] border-2 border-black text-black shadow-retro-xs">
                                    <Users className="w-4 h-4 stroke-[2.5]" />
                                    <span className="text-xs font-black uppercase tracking-widest">{team.members.length} Anggota</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Panduan Penggunaan */}
            <div className="bg-[#FAF6ED] dark:bg-[#151B22] border-2 border-black dark:border-white rounded-none p-6 shadow-retro-sm">
                <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-none bg-[#FACC15] border-2 border-black flex items-center justify-center shrink-0 mt-0.5 text-black shadow-retro-xs">
                        <Info className="w-5 h-5 stroke-[2.5]" />
                    </div>
                    <div className="space-y-3">
                        <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 dark:text-white">📋 Panduan Mengelola Divisi</h3>
                        <div className="text-xs font-medium text-slate-800 dark:text-zinc-200 space-y-2 leading-relaxed">
                            <p className="font-bold">Ikuti langkah-langkah berikut untuk mengisi data divisi ini:</p>
                            <ol className="list-decimal list-inside space-y-1.5 ml-1">
                                <li><strong>Buat Posisi/Jabatan terlebih dahulu</strong> — Klik tombol <span className="bg-[#FACC15] text-black px-1.5 py-0.5 border border-black font-black text-xs">+ Tambah Posisi Baru</span> di panel kiri. Contoh: &quot;Leader&quot;, &quot;Staff&quot;, &quot;Koordinator&quot;. Isi juga <strong>Rank Level</strong> (angka semakin kecil = jabatan semakin tinggi, misal: Leader = 1, Staff = 2).</li>
                                <li><strong>Tambah Anggota</strong> — Setelah posisi dibuat, klik tombol <span className="bg-[#FACC15] text-black px-1.5 py-0.5 border border-black font-black text-xs">+ Tambah Anggota</span> di panel kanan. Pilih posisi yang sudah Anda buat tadi dari dropdown, lalu isi nama dan data anggota.</li>
                                <li><strong>Atur & Kelola</strong> — Anda bisa mengedit atau menghapus posisi maupun anggota kapan saja dengan mengarahkan kursor ke item yang diinginkan.</li>
                            </ol>
                            <p className="text-xs text-slate-600 dark:text-zinc-400 mt-2 italic font-bold">💡 Tips: Posisi yang Anda buat di sini akan digunakan untuk mengelompokkan anggota di halaman publik divisi. Pastikan Rank Level diisi dengan benar agar urutan tampil sesuai hirarki.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Info & Stats Column */}
                <div className="lg:col-span-1 space-y-8">

                    {/* Positions Management */}
                    <div className="bg-[#FAF6ED] dark:bg-[#151B22] border-2 border-black dark:border-white rounded-none p-6 shadow-retro-sm space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-none bg-[#FACC15] border-2 border-black flex items-center justify-center text-black shadow-retro-xs">
                                <LayoutGrid className="w-4 h-4 stroke-[2.5]" />
                            </div>
                            <h3 className="font-black text-slate-900 dark:text-white uppercase tracking-widest text-xs">Struktur Posisi</h3>
                        </div>

                        <div className="space-y-3">
                            {team.positions.map((pos) => (
                                <div key={pos.id} className="flex items-center justify-between p-3.5 rounded-none bg-white dark:bg-[#0E1217] border-2 border-black dark:border-white group transition-all shadow-retro-xs hover:bg-[#FACC15]/10">
                                    <div>
                                        <p className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">{pos.name}</p>
                                        <p className="text-[10px] text-slate-500 dark:text-zinc-400 font-black uppercase tracking-widest mt-0.5">Level {pos.hierarchyLevel}</p>
                                    </div>
                                    <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all">
                                        <EditPositionModal position={pos} teamId={team.id} />
                                        <form action={deletePosition}>
                                            <input type="hidden" name="id" value={pos.id} />
                                            <Button type="submit" variant="ghost" size="icon" className="h-8 w-8 rounded-none border-2 border-black dark:border-white bg-white dark:bg-[#0E1217] text-slate-500 hover:text-white hover:bg-red-500 transition-all shadow-retro-xs">
                                                <X className="w-4 h-4 stroke-[2.5]" />
                                            </Button>
                                        </form>
                                    </div>
                                </div>
                            ))}

                            {team.positions.length === 0 && (
                                <div className="p-6 text-center border-2 border-dashed border-black dark:border-white rounded-none bg-white dark:bg-[#0E1217]">
                                    <p className="text-xs text-slate-600 dark:text-zinc-400 font-bold">Belum ada posisi. Buat posisi terlebih dahulu sebelum menambah anggota.</p>
                                </div>
                            )}
                        </div>
                        
                        <div className="pt-2">
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

