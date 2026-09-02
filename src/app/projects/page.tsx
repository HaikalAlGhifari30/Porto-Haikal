import { getProjects } from "@/actions/project";
import { Navbar } from "@/components/navbar";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ProjectsPage() {
    const projects = await getProjects();
    const visibleProjects = projects.filter(p => p.isVisible);

    return (
        <>
            <Navbar />
            <main className="flex-1 py-32 px-6 relative overflow-hidden bg-zinc-950">
                {/* Background Glows */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] -z-10" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] -z-10" />

                <div className="container mx-auto max-w-7xl">
                    <div className="mb-24 text-center max-w-3xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-bold text-blue-400 uppercase tracking-[0.3em] mb-6">
                            Showcase Portfolio
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 bg-gradient-to-br from-white via-white to-white/40 bg-clip-text text-transparent leading-none">
                            Our <span className="text-blue-500 italic">Masterpieces</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-zinc-400 font-light leading-relaxed">
                            Membangun pengalaman digital yang menginspirasi dan memberdayakan melalui inovasi kreatif.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {visibleProjects.map(project => (
                            <a href={project.url || "#"} target="_blank" rel="noreferrer" key={project.id} className="group block relative">
                                <div className="h-full rounded-[2.5rem] border border-white/5 overflow-hidden bg-zinc-900/40 backdrop-blur-sm hover:border-blue-500/30 transition-all duration-500 shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2">
                                    <div className="aspect-[16/10] bg-zinc-950 relative overflow-hidden">
                                        {project.imageUrl ? (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img
                                                src={project.imageUrl.split(',')[0]}
                                                alt={project.title}
                                                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000"
                                            />
                                        ) : (
                                            <div className="flex items-center justify-center w-full h-full text-zinc-600 bg-gradient-to-tr from-zinc-900 to-zinc-800">
                                                <span className="text-[10px] font-bold uppercase tracking-widest">No Preview</span>
                                            </div>
                                        )}
                                        {/* Overlay Glow */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />

                                        {/* Removed Featured Badge */}
                                    </div>
                                    <div className="p-8">
                                        <div className="flex items-start justify-between gap-4 mb-3">
                                            <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors leading-tight">
                                                {project.title}
                                            </h3>
                                            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 group-hover:bg-blue-600 group-hover:border-blue-500 transition-all duration-300">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                            </div>
                                        </div>
                                        <p className="text-zinc-400 font-light leading-relaxed line-clamp-2 text-sm">
                                            {project.description || "Digital experience built with precision and passion."}
                                        </p>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </main>
        </>
    );
}
