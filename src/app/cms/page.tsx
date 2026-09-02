import { prisma } from "@/lib/db";
import { FolderKanban, ArrowUpRight, Plus, Zap, Image as ImageIcon, Settings, CheckCircle2, MessageSquare } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProjectActionMenu } from "@/components/cms/project-action-menu";
import { DashboardGreeting } from "@/components/cms/dashboard-greeting";

export default async function CMSDashboard() {
    const totalProjects = await prisma.project.count();
    const totalGallery = await prisma.gallery.count();
    const totalMessages = await prisma.contactMessage.count();
    const unreadMessages = await prisma.contactMessage.count({ where: { isRead: false } });

    const recentProjects = await prisma.project.findMany({
        take: 6,
        orderBy: { createdAt: "desc" }
    });

    return (
        <div className="space-y-6 md:space-y-8 animate-in fade-in duration-700">
            {/* Hero Header Section */}
            <div className="relative group p-6 md:p-10 rounded-[2rem] bg-gradient-to-br from-slate-900 via-[#070e20] to-blue-950 text-white overflow-hidden shadow-2xl border border-cyan-500/20">
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-cyan-400/10 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
                
                <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-[10px] font-extrabold uppercase tracking-[0.2em] mb-4">
                            <Zap className="w-3.5 h-3.5 text-cyan-400" /> QA Portfolio CMS
                        </div>
                        <DashboardGreeting />
                        <p className="text-zinc-300 text-sm md:text-base font-medium max-w-lg leading-relaxed pt-1">
                            Kelola portofolio proyek, pesan masuk, galeri screenshot, dan pengaturan website Anda secara terpusat.
                        </p>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
                        <Link href="/cms/messages" className="flex-1 sm:flex-none">
                            <Button className="w-full sm:w-auto h-12 px-8 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold border-none shadow-xl shadow-cyan-500/25 transition-all active:scale-95 cursor-pointer">
                                <MessageSquare className="w-5 h-5 mr-2" /> Pesan Masuk {unreadMessages > 0 && `(${unreadMessages})`}
                            </Button>
                        </Link>
                        <Link href="/cms/settings" className="flex-1 sm:flex-none">
                            <Button variant="outline" className="w-full sm:w-auto h-12 px-8 rounded-2xl bg-white/10 border-cyan-500/30 text-white font-bold backdrop-blur-md hover:bg-white/20 transition-all active:scale-95 cursor-pointer">
                                <Settings className="w-4 h-4 mr-2 text-cyan-400" /> Pengaturan Website
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Statistics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-1">
                {[
                    { label: "Pesan Masuk", value: unreadMessages > 0 ? `${unreadMessages} Baru` : `${totalMessages} Pesan`, icon: MessageSquare, color: "blue", detail: "Formulir Kontak Public", href: "/cms/messages" },
                    { label: "Total Proyek", value: totalProjects, icon: FolderKanban, color: "cyan", detail: "Active Live Showcase", href: "/cms/projects" },
                    { label: "Galeri Screenshot", value: totalGallery, icon: ImageIcon, color: "emerald", detail: "Media Showcase", href: "/cms/gallery" },
                    { label: "Database Neon", value: "Online", icon: CheckCircle2, color: "indigo", detail: "PostgreSQL Synced", href: "/cms/settings" },
                ].map((stat, i) => (
                    <Link key={i} href={stat.href} className="bg-white dark:bg-[#070e20]/90 border border-slate-200 dark:border-cyan-500/20 rounded-2xl p-6 hover:shadow-xl hover:border-cyan-400/50 transition-all group overflow-hidden relative cursor-pointer block">
                        <div className="flex flex-col gap-4 relative z-10">
                            <div className="w-11 h-11 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform duration-500">
                                <stat.icon className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="text-slate-400 dark:text-zinc-400 font-extrabold text-[10px] uppercase tracking-[0.2em] mb-1">{stat.label}</h3>
                                <div className="flex items-end gap-2">
                                    <span className="text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-none">{stat.value}</span>
                                    <div className="flex items-center text-cyan-400 text-[9px] font-bold uppercase tracking-widest pb-0.5">
                                        <ArrowUpRight className="w-3 h-3 mr-1" />
                                        <span>{stat.detail}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Proyek Terbaru Overview */}
            <div className="space-y-4 px-1">
                <div className="flex items-center justify-between px-1">
                    <div className="flex items-center gap-2">
                        <div className="h-5 w-1 bg-cyan-400 rounded-full" />
                        <h3 className="text-sm font-black text-slate-900 dark:text-white tracking-tight uppercase">Daftar Proyek Terbaru</h3>
                    </div>
                    <Link href="/cms/projects" className="group flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-cyan-400 hover:opacity-80 transition-all">
                        Kelola Semua Proyek <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Link>
                </div>

                <div className="bg-white dark:bg-[#070e20]/90 border border-slate-200 dark:border-cyan-500/20 rounded-3xl p-4 shadow-sm overflow-hidden">
                    <div className="divide-y divide-slate-100 dark:divide-zinc-800/60">
                        {recentProjects.map(project => (
                            <div key={project.id} className="p-4 flex flex-col md:flex-row items-start md:items-center gap-4 group hover:bg-slate-50 dark:hover:bg-zinc-800/40 transition-all rounded-2xl border border-transparent hover:border-cyan-500/20">
                                <div className="w-24 h-16 rounded-xl bg-slate-100 dark:bg-zinc-950 overflow-hidden border border-slate-200 dark:border-zinc-800 shrink-0 shadow-inner">
                                    {project.imageUrl ? (
                                        <img src={project.imageUrl.split(',')[0].trim()} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-[7px] font-bold text-slate-300 tracking-widest">NO IMAGE</div>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-0.5">
                                        <h4 className="text-base font-bold text-slate-900 dark:text-white truncate group-hover:text-cyan-400 transition-colors">{project.title}</h4>
                                        <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest ${project.isVisible ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' : 'bg-slate-500/15 text-slate-400 border border-slate-500/30'}`}>
                                            {project.isVisible ? 'LIVE' : 'DRAFT'}
                                        </span>
                                    </div>
                                    <p className="text-xs text-slate-400 dark:text-zinc-400 font-medium truncate mb-1">{project.url ? project.url.replace(/^https?:\/\//, '') : 'No URL'}</p>
                                    <p className="text-[10px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest italic">{new Date(project.createdAt).toLocaleDateString('id-ID', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    {project.url && (
                                        <a href={project.url} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-slate-100 dark:bg-zinc-950 text-zinc-400 hover:text-cyan-400 transition-colors border border-slate-200 dark:border-zinc-800">
                                            <ArrowUpRight className="w-4 h-4" />
                                        </a>
                                    )}
                                    <ProjectActionMenu project={project} />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="p-4 mt-2">
                        <Link href="/cms/projects" className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl bg-cyan-500/10 hover:bg-cyan-500/20 text-xs font-black uppercase tracking-[0.2em] text-cyan-400 transition-all border border-cyan-500/30">
                            <Plus className="w-4 h-4" /> Tambah Proyek Portofolio Baru
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
