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
        <div className="space-y-6 md:space-y-8 animate-in fade-in duration-500">
            {/* Hero Header Section */}
            <div className="relative group p-6 md:p-8 rounded-2xl bg-[#0E1217] text-white overflow-hidden shadow-retro-md border-2 border-black dark:border-white">
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-yellow-400/10 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />
                
                <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FACC15] text-black border-2 border-black dark:border-white text-[10px] font-pixel font-bold uppercase tracking-wider mb-4 shadow-retro-xs">
                            <Zap className="w-3.5 h-3.5 text-black" /> QA PORTFOLIO CMS
                        </div>
                        <DashboardGreeting />
                        <p className="text-zinc-300 text-sm md:text-base font-medium max-w-lg leading-relaxed pt-1">
                            Kelola portofolio proyek, pesan masuk, galeri screenshot, dan pengaturan website Anda secara terpusat.
                        </p>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                        <Link href="/cms/messages" className="flex-1 sm:flex-none">
                            <Button className="w-full sm:w-auto h-11 px-6 rounded-none bg-[#FACC15] hover:bg-yellow-300 text-black font-bold border-2 border-black dark:border-white shadow-retro-xs btn-retro transition-all cursor-pointer">
                                <MessageSquare className="w-4 h-4 mr-2" /> Pesan Masuk {unreadMessages > 0 && `(${unreadMessages})`}
                            </Button>
                        </Link>
                        <Link href="/cms/settings" className="flex-1 sm:flex-none">
                            <Button variant="outline" className="w-full sm:w-auto h-11 px-6 rounded-none bg-white/10 border-2 border-black dark:border-white text-white font-bold backdrop-blur-md hover:bg-white/20 shadow-retro-xs btn-retro transition-all cursor-pointer">
                                <Settings className="w-4 h-4 mr-2 text-[#FACC15]" /> Pengaturan Website
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Statistics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 px-1">
                {[
                    { label: "Pesan Masuk", value: unreadMessages > 0 ? `${unreadMessages} Baru` : `${totalMessages} Pesan`, icon: MessageSquare, detail: "Formulir Kontak Public", href: "/cms/messages" },
                    { label: "Total Proyek", value: totalProjects, icon: FolderKanban, detail: "Active Live Showcase", href: "/cms/projects" },
                    { label: "Galeri Screenshot", value: totalGallery, icon: ImageIcon, detail: "Media Showcase", href: "/cms/gallery" },
                    { label: "Database Neon", value: "Online", icon: CheckCircle2, detail: "PostgreSQL Synced", href: "/cms/settings" },
                ].map((stat, i) => (
                    <Link key={i} href={stat.href} className="bg-white dark:bg-[#151B22] border-2 border-black dark:border-white rounded-2xl p-5 shadow-retro-xs hover:shadow-retro-sm hover:-translate-y-0.5 transition-all group overflow-hidden relative cursor-pointer block btn-retro">
                        <div className="flex flex-col gap-3 relative z-10">
                            <div className="w-10 h-10 bg-[#FACC15] border-2 border-black dark:border-white flex items-center justify-center text-black shadow-retro-xs group-hover:scale-105 transition-transform">
                                <stat.icon className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="text-zinc-600 dark:text-zinc-400 font-bold text-[10px] uppercase tracking-wider mb-1">{stat.label}</h3>
                                <div className="flex items-end justify-between gap-2">
                                    <span className="text-2xl sm:text-3xl font-black text-black dark:text-white tracking-tight leading-none">{stat.value}</span>
                                    <div className="flex items-center text-amber-600 dark:text-[#FACC15] text-[9px] font-bold uppercase tracking-wider pb-0.5">
                                        <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
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
                        <div className="h-5 w-1.5 bg-[#FACC15] border border-black dark:border-white" />
                        <h3 className="text-sm font-black text-black dark:text-white tracking-tight uppercase">Daftar Proyek Terbaru</h3>
                    </div>
                    <Link href="/cms/projects" className="group flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-amber-600 dark:text-[#FACC15] hover:underline transition-all">
                        Kelola Semua Proyek <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Link>
                </div>

                <div className="bg-white dark:bg-[#151B22] border-2 border-black dark:border-white rounded-2xl p-4 shadow-retro-sm overflow-hidden">
                    <div className="divide-y divide-black/10 dark:divide-white/10">
                        {recentProjects.map(project => (
                            <div key={project.id} className="p-3.5 sm:p-4 flex flex-col md:flex-row items-start md:items-center gap-4 group hover:bg-[#FAF6ED]/70 dark:hover:bg-zinc-800/40 transition-all rounded-xl">
                                <div className="w-24 h-16 rounded-lg bg-zinc-100 dark:bg-zinc-950 overflow-hidden border-2 border-black dark:border-white shrink-0 shadow-retro-xs">
                                    {project.imageUrl ? (
                                        <img src={project.imageUrl.split(',')[0].trim()} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-[7px] font-bold text-zinc-400 tracking-widest">NO IMAGE</div>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-0.5">
                                        <h4 className="text-base font-bold text-black dark:text-white truncate group-hover:text-amber-500 dark:group-hover:text-[#FACC15] transition-colors">{project.title}</h4>
                                        <span className={`px-2 py-0.5 text-[9px] font-black uppercase tracking-wider border ${project.isVisible ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/40' : 'bg-zinc-500/15 text-zinc-600 dark:text-zinc-400 border-zinc-500/40'}`}>
                                            {project.isVisible ? 'LIVE' : 'DRAFT'}
                                        </span>
                                    </div>
                                    <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium truncate mb-1">{project.url ? project.url.replace(/^https?:\/\//, '') : 'No URL'}</p>
                                    <p className="text-[10px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest italic">{new Date(project.createdAt).toLocaleDateString('id-ID', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    {project.url && (
                                        <a href={project.url} target="_blank" rel="noopener noreferrer" className="p-2 border-2 border-black dark:border-white bg-white dark:bg-[#0E1217] text-black dark:text-white hover:bg-[#FACC15] hover:text-black transition-colors shadow-retro-xs btn-retro">
                                            <ArrowUpRight className="w-4 h-4" />
                                        </a>
                                    )}
                                    <ProjectActionMenu project={project} />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="p-3 sm:p-4 mt-2">
                        <Link href="/cms/projects" className="flex items-center justify-center gap-2 w-full py-3 rounded-none bg-[#FACC15] hover:bg-yellow-300 text-black text-xs font-bold uppercase tracking-wider transition-all border-2 border-black dark:border-white shadow-retro-xs btn-retro">
                            <Plus className="w-4 h-4" /> Tambah Proyek Portofolio Baru
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
