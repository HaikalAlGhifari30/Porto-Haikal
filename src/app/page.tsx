import { getSettings } from "@/actions/settings";
import { getProjects } from "@/actions/project";
import { getTeams } from "@/actions/team";
import { getHeroSlides } from "@/actions/hero";
import { Navbar } from "@/components/navbar";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { DivisionCard } from "@/components/division-card";
import { HeroCarousel } from "@/components/hero-carousel";

export default async function Home() {
    const [settings, projects, teams, slides] = await Promise.all([
        getSettings(),
        getProjects(),
        getTeams(),
        getHeroSlides()
    ]);

    const visibleProjects = projects.filter(p => p.isVisible);

    return (
        <div className="bg-[#020617] text-white min-h-screen w-full flex flex-col">
            <Navbar />
            <main className="flex-1">
                <HeroCarousel slides={slides as any} />

                {/* Projects Section - Verasic Dark Elegant Background */}
                <section 
                    id="projects" 
                    className="py-24 md:py-32 relative overflow-hidden"
                    style={{ background: 'linear-gradient(180deg, #020617 0%, #030712 50%, #020617 100%)' }}
                >
                    {/* Subtle Top Border Glow */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/5 to-transparent" />
                    
                    {/* Ultra-subtle Radial Glow - Verasic Style */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-blue-600/[0.04] blur-[120px] rounded-full pointer-events-none" />

                    <div className="container-original relative z-10">
                        <div className="max-w-2xl space-y-6 mb-16">
                            <div className="space-y-2">
                                <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/70">Curated Work</h2>
                                <h3 className="text-4xl md:text-6xl font-serif italic tracking-tight">Our Projects</h3>
                            </div>
                            <p className="text-zinc-400 text-sm md:text-lg leading-relaxed font-medium">
                                A selection of our most impactful collaborations and digital identity transformations.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {visibleProjects.map((project) => (
                                <a
                                    key={project.id}
                                    href={project.url}
                                    target="_blank"
                                    className="group block relative aspect-[4/3] rounded-[2rem] overflow-hidden bg-card/40 border border-white/5 hover:border-primary/30 transition-all duration-700 shadow-2xl"
                                >
                                    <img
                                        src={project.imageUrl || "/placeholder.jpg"}
                                        alt={project.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                                    <div className="absolute bottom-8 left-8 right-8">
                                        <h4 className="text-2xl font-bold mb-1 tracking-tight group-hover:translate-x-2 transition-transform duration-500">
                                            {project.title}
                                        </h4>
                                        <p className="text-xs text-primary font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                                            View Project
                                        </p>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Division Section - Verasic Dark Elegant Background */}
                <section 
                    id="divisions" 
                    className="py-24 md:py-32 relative overflow-hidden"
                    style={{ background: 'linear-gradient(180deg, #020617 0%, #030712 50%, #020617 100%)' }}
                >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/5 to-transparent" />
                    
                    <div className="container-original relative z-10">
                        <div className="max-w-2xl space-y-6 mb-16">
                            <div className="space-y-2">
                                <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/70">The Collective</h2>
                                <h3 className="text-4xl md:text-6xl font-serif italic tracking-tight">Our Divisions</h3>
                            </div>
                            <p className="text-zinc-400 text-sm md:text-lg leading-relaxed font-medium">
                                Meet the specialized teams driving excellence across every aspect of the Baroedak COMO ecosystem.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {teams.map((team) => (
                                <DivisionCard
                                    key={team.id}
                                    team={team}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <footer className="py-12 bg-[#020617] border-t border-white/[0.03] text-center">
                <div className="container-original">
                    <p className="text-zinc-600 text-[10px] font-medium uppercase tracking-[0.2em]">
                        © {new Date().getFullYear()} COMO Official. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}
