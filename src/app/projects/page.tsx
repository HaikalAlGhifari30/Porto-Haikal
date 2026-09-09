import { getProjects } from "@/actions/project";
import { getSettings } from "@/actions/settings";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ProjectsPage() {
    const [projects, settings] = await Promise.all([
        getProjects(),
        getSettings()
    ]);
    const visibleProjects = projects.filter(p => p.isVisible);

    return (
        <div className="bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-white min-h-screen flex flex-col transition-colors duration-300">
            <Navbar settings={settings} />
            
            <main className="flex-1 py-28 md:py-32 px-4 sm:px-6 relative overflow-hidden">
                {/* Background Glows */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px] -z-10 pointer-events-none" />

                <div className="container-original mx-auto max-w-7xl">
                    <div className="mb-16 md:mb-24 text-center max-w-3xl mx-auto space-y-4">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-widest">
                            Showcase Portfolio
                        </div>
                        <h1 className="text-4xl md:text-7xl font-black tracking-tight text-slate-900 dark:text-white leading-none">
                            Portofolio <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-500 dark:from-cyan-400 dark:to-blue-400">Proyek QA</span>
                        </h1>
                        <p className="text-sm md:text-xl text-slate-600 dark:text-zinc-300 font-normal leading-relaxed">
                            Membangun & menguji pengalaman digital berkualitas tinggi dengan pendekatan Quality Assurance terukur.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {visibleProjects.map(project => (
                            <a href={`/projects/${project.slug || project.id}`} key={project.id} className="group block relative">
                                <div className="h-full rounded-3xl border border-slate-200 dark:border-cyan-500/20 overflow-hidden bg-white dark:bg-[#070e20]/90 backdrop-blur-xl hover:border-cyan-400 transition-all duration-500 shadow-lg hover:shadow-cyan-500/10 hover:-translate-y-1.5 flex flex-col">
                                    <div className="aspect-[16/10] bg-slate-900 relative overflow-hidden">
                                        {project.imageUrl ? (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img
                                                src={project.imageUrl.split(',')[0]}
                                                alt={project.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                                            />
                                        ) : (
                                            <div className="flex items-center justify-center w-full h-full text-zinc-500 bg-slate-900">
                                                <span className="text-xs font-bold uppercase tracking-widest">No Preview</span>
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                                        <div>
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 block mb-1">
                                                {project.category || "QA Testing"}
                                            </span>
                                            <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-300 transition-colors leading-tight">
                                                {project.title}
                                            </h3>
                                            <p className="text-slate-600 dark:text-zinc-400 font-normal leading-relaxed line-clamp-2 text-xs mt-2">
                                                {project.description || "Digital experience built and tested with precision."}
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-cyan-400 group-hover:translate-x-1 transition-transform">
                                            <span>Lihat Detail QA</span>
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
