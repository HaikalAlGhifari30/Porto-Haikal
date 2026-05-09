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
                        <ArrowLeft className="w-3.5 h-3.5 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Division Management
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
                                    <span className="text-xs font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest">{team.members.length} Members</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
                {/* Info & Stats Column */}
                <div className="lg:col-span-1 space-y-8">
                    {/* Detailed Info */}


                    {/* Positions Management */}
                    <div className="bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50 dark:shadow-none space-y-8">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                                <LayoutGrid className="w-5 h-5" />
                            </div>
                            <h3 className="font-bold text-slate-900 dark:text-white uppercase tracking-widest text-xs">Position Structure</h3>
                        </div>

                        <div className="space-y-3">
                            {team.positions.map((pos) => (
                                <div key={pos.id} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-zinc-900/50 border border-slate-100 dark:border-zinc-800 group transition-all hover:border-blue-500/20">
                                    <div>
                                        <p className="text-sm font-bold text-slate-900 dark:text-white">{pos.name}</p>
                                        <p className="text-[9px] text-slate-400 dark:text-zinc-500 font-bold uppercase tracking-widest mt-0.5">Rank Level {pos.hierarchyLevel}</p>
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
