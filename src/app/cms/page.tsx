import { prisma } from "@/lib/db";
import { FolderKanban, Users, ArrowUpRight, Plus, Briefcase, Zap } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProjectActionMenu } from "@/components/cms/project-action-menu";
import { DashboardGreeting } from "@/components/cms/dashboard-greeting";

export default async function CMSDashboard() {
    const totalProjects = await prisma.project.count();
    const totalTeams = await prisma.team.count();
    const totalMembers = await prisma.member.count();

    const recentProjects = await prisma.project.findMany({
        take: 3,
        orderBy: { createdAt: "desc" }
    });

    const recentMembers = await prisma.member.findMany({
        take: 4,
        orderBy: { createdAt: "desc" },
        include: { position: true }
    });

    return (
        <div className="space-y-6 md:space-y-8 animate-in fade-in duration-700">
            {/* Hero Header Section */}
            <div className="relative group p-6 md:p-10 rounded-[2rem] bg-gradient-to-br from-slate-900 to-blue-900 text-white overflow-hidden shadow-2xl shadow-blue-900/20 border border-white/5">
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-blue-400/10 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-indigo-400/10 rounded-full blur-[100px] pointer-events-none" />
                
                <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-blue-200 text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
                            <Zap className="w-3 h-3" /> Ringkasan Dashboard
                        </div>
                        <DashboardGreeting />
                        <p className="text-blue-100/60 text-sm md:text-base font-medium max-w-md leading-relaxed break-words">
                            Kelola proyek, divisi tim, dan konten digital Anda dengan presisi dan kemudahan.
                        </p>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
                        <Link href="/cms/projects" className="flex-1 sm:flex-none">
                            <Button className="w-full sm:w-auto h-12 px-8 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold border-none shadow-xl shadow-blue-600/20 transition-all hover:-translate-y-1 active:translate-y-0">
                                <Plus className="w-5 h-5 mr-2" /> Proyek Baru
                            </Button>
                        </Link>
                        <Link href="/cms/teams" className="flex-1 sm:flex-none">
                            <Button variant="outline" className="w-full sm:w-auto h-12 px-8 rounded-2xl bg-white/10 border-white/20 text-white font-bold backdrop-blur-md hover:bg-white/20 transition-all hover:-translate-y-1 active:translate-y-0">
                                Kelola Tim
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Statistics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-1">
                {[
                    { label: "Total Proyek", value: totalProjects, icon: FolderKanban, color: "blue", detail: "Real-time", href: "/cms/projects" },
                    { label: "Divisi Aktif", value: totalTeams, icon: Briefcase, color: "emerald", detail: `${totalMembers} Members`, href: "/cms/teams" },
                    { label: "Anggota Divisi", value: totalMembers, icon: Users, color: "indigo", detail: "Registered", href: "/cms/teams" },
                ].map((stat, i) => (
                    <Link key={i} href={stat.href} className="bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-2xl p-6 hover:shadow-lg transition-all group overflow-hidden relative cursor-pointer block">
                        <div className={`absolute top-0 right-0 w-24 h-24 bg-${stat.color}-500/5 rounded-full blur-3xl -mr-12 -mt-12 group-hover:bg-${stat.color}-500/10 transition-colors`} />
                        <div className="flex flex-col gap-4 relative z-10">
                            <div className={`w-11 h-11 rounded-xl bg-${stat.color}-500/10 flex items-center justify-center text-${stat.color}-600 dark:text-${stat.color}-400 group-hover:scale-110 transition-transform duration-500`}>
                                <stat.icon className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="text-slate-400 dark:text-zinc-500 font-bold text-[9px] uppercase tracking-[0.2em] mb-1">{stat.label}</h3>
                                <div className="flex items-end gap-2">
                                    <span className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight leading-none">{stat.value}</span>
                                    <div className={`flex items-center text-${stat.color}-600 dark:text-${stat.color}-400 text-[9px] font-bold uppercase tracking-widest pb-0.5`}>
                                        <ArrowUpRight className="w-2.5 h-2.5 mr-1" />
                                        <span>{stat.detail}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Two Column Layout for Lists */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-1">
                {/* Recent Projects - Spans 2 columns */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="flex items-center justify-between px-1">
                        <div className="flex items-center gap-2">
                            <div className="h-5 w-1 bg-blue-600 rounded-full" />
                            <h3 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight uppercase">Proyek Terbaru</h3>
                        </div>
                        <Link href="/cms/projects" className="group flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 hover:opacity-80 transition-all">
                            Lihat Galeri <ArrowUpRight className="w-2.5 h-2.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </Link>
                    </div>

                    <div className="bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-2xl p-3 shadow-sm overflow-hidden">
                        <div className="divide-y divide-slate-50 dark:divide-zinc-800/50">
                            {recentProjects.map(project => (
                                <div key={project.id} className="p-4 flex flex-col md:flex-row items-start md:items-center gap-4 group hover:bg-slate-50 dark:hover:bg-zinc-800/50 transition-all rounded-xl border border-transparent hover:border-slate-100 dark:hover:border-zinc-700/50">
                                    <div className="w-24 h-16 rounded-xl bg-slate-100 dark:bg-zinc-950 overflow-hidden border border-slate-200 dark:border-zinc-800 shrink-0 shadow-inner">
                                        {project.imageUrl ? (
                                            <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-[7px] font-bold text-slate-300 tracking-widest">NO IMAGE</div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-0.5">
                                            <h4 className="text-base font-bold text-slate-900 dark:text-white truncate group-hover:text-blue-600 transition-colors">{project.title}</h4>
                                            <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest ${project.isVisible ? 'bg-emerald-500/10 text-emerald-600' : 'bg-slate-500/10 text-slate-500'}`}>
                                                {project.isVisible ? 'LIVE' : 'DRAFT'}
                                            </span>
                                        </div>
                                        <p className="text-xs text-slate-400 dark:text-zinc-500 font-medium truncate mb-1">{project.url.replace(/^https?:\/\//, '')}</p>
                                        <p className="text-[10px] font-bold text-slate-300 dark:text-zinc-700 uppercase tracking-widest italic">{new Date(project.createdAt).toLocaleDateString('id-ID', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                                    </div>
                                    <div className="flex items-center gap-4 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all">
                                        <Link href="/cms/projects" className="p-2.5 rounded-xl bg-slate-100 dark:bg-zinc-950 text-slate-400 hover:text-blue-600 transition-colors border border-slate-200 dark:border-zinc-800">
                                            <ArrowUpRight className="w-4 h-4" />
                                        </Link>
                                        <ProjectActionMenu project={project} />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="p-4 mt-2">
                            <Link href="/cms/projects" className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-blue-600/5 hover:bg-blue-600/10 text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 transition-all border border-blue-600/10">
                                <Plus className="w-4 h-4" /> Tambah Proyek Baru
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Newest Members - 1 column */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between px-1">
                        <div className="flex items-center gap-2">
                            <div className="h-5 w-1 bg-indigo-600 rounded-full" />
                            <h3 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight uppercase">Anggota Baru</h3>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-2xl p-3 shadow-sm overflow-hidden h-fit">
                        <div className="divide-y divide-slate-50 dark:divide-zinc-800/50">
                            {recentMembers.map(member => (
                                <div key={member.id} className="p-3 flex items-center gap-3 group hover:bg-slate-50 dark:hover:bg-zinc-800/50 rounded-xl transition-all border border-transparent hover:border-slate-100 dark:hover:border-zinc-700/50">
                                    <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-zinc-950 overflow-hidden border border-slate-200 dark:border-zinc-800 shrink-0 shadow-inner">
                                        {member.photo ? (
                                            <img src={member.photo} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-sm font-bold text-slate-300 dark:text-zinc-800">{member.name.charAt(0)}</div>
                                        )}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="font-bold text-slate-900 dark:text-white truncate group-hover:text-blue-600 transition-colors leading-tight text-sm">{member.name}</p>
                                        <p className="text-[8px] font-bold uppercase tracking-widest text-indigo-500 dark:text-indigo-400/70 truncate mt-0.5">{member.position.name}</p>
                                    </div>
                                    <Link href={`/cms/teams/${member.teamId}`} className="p-2 text-slate-300 hover:text-blue-600 transition-colors">
                                        <ArrowUpRight className="w-3.5 h-3.5" />
                                    </Link>
                                </div>
                            ))}
                        </div>
                        <div className="mt-2 p-2">
                            <Link href="/cms/teams" className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-slate-50 dark:bg-zinc-950 text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500 hover:text-white hover:bg-indigo-600 transition-all border border-slate-100 dark:border-zinc-800">
                                Lihat Semua Tim <ArrowUpRight className="w-3 h-3" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
