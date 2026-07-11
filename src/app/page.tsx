import { getSettings } from "@/actions/settings";
import { getProjects } from "@/actions/project";
import { getTeams } from "@/actions/team";
import { getHeroSlides } from "@/actions/hero";
import { Navbar } from "@/components/navbar";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { DivisionCard } from "@/components/division-card";
import { Footer } from "@/components/footer";
import { HeroCarousel } from "@/components/hero-carousel";
import { AboutSection } from "@/components/sections/about-section";
import { OrganizationSection } from "@/components/sections/organization-section";
import { GallerySection } from "@/components/sections/gallery-section";
import { FloatingButtonsServer } from "@/components/floating-buttons-server";
import { TranslatedText } from "@/components/translated-text";
import { TranslatedContent } from "@/components/translated-content";
import { BusinessSectorSection } from "@/components/sections/business-sector-section";

export default async function Home() {
    const [settings, projects, teams, slides] = await Promise.all([
        getSettings(),
        getProjects(),
        getTeams(),
        getHeroSlides()
    ]);

    const visibleProjects = projects.filter(p => p.isVisible);

    return (
        <div className="bg-slate-50 dark:bg-[#09090b] text-zinc-900 dark:text-white min-h-screen w-full flex flex-col transition-colors duration-300">
            <Navbar />
            <main className="flex-1">
                <HeroCarousel slides={slides as any} />

                <AboutSection />

                {/* Organization Structure Section */}
                <OrganizationSection />
                {/* Projects Section */}
                <section
                    id="projects"
                    className="py-24 md:py-32 relative overflow-hidden bg-gradient-to-b from-slate-50 via-blue-50/30 to-white dark:from-[#09090b] dark:via-blue-950/10 dark:to-[#09090b]"
                >
                    {/* Subtle Top Border */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/20 dark:via-primary/5 to-transparent" />

                    {/* Subtle Radial Glow */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-blue-600/[0.06] dark:bg-blue-600/[0.04] blur-[120px] rounded-full pointer-events-none" />

                    <div className="container-original relative z-10">
                        <div className="max-w-2xl space-y-6 mb-16">
                            <div className="space-y-2">
                                <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/80 dark:text-primary/70"><TranslatedText id="section.projects.subtitle" fallback="Portofolio" /></h2>
                                <h3 className="text-3xl md:text-5xl font-black text-slate-800 dark:text-white mb-4"><TranslatedText id="section.projects" fallback="Proyek Kami" /></h3>
                            </div>
                            <p className="text-zinc-500 dark:text-zinc-400 text-sm md:text-lg leading-relaxed font-medium">
                                <TranslatedText id="section.projects.desc" fallback="Koleksi proyek terbaik kami dalam kolaborasi dan transformasi identitas digital." />
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {visibleProjects.map((project) => (
                                <a
                                    key={project.id}
                                    href={project.url || "#"}
                                    target="_blank"
                                    className="group block relative aspect-[4/3] rounded-[2rem] overflow-hidden bg-slate-100 dark:bg-card/40 border border-slate-200 dark:border-white/5 hover:border-primary/30 transition-all duration-700 shadow-lg dark:shadow-2xl"
                                >
                                    <img
                                        src={project.imageUrl || "/placeholder.jpg"}
                                        alt={project.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-100"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 dark:from-zinc-950 via-slate-900/20 dark:via-zinc-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                                    <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-8">
                                        <h4 className="text-xl md:text-2xl font-bold mb-1 tracking-tight text-white group-hover:translate-x-2 transition-transform duration-500">
                                            <TranslatedContent idText={project.title} enText={(project as any).titleEn} />
                                        </h4>
                                        <p className="text-[10px] md:text-xs text-primary font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                                            <TranslatedText id="hero.viewProjects" fallback="Lihat Proyek" />
                                        </p>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Business Sectors Section */}
                <BusinessSectorSection />

                {/* Division Section */}
                <section
                    id="divisions"
                    className="py-24 md:py-32 relative overflow-hidden bg-gradient-to-b from-white via-violet-50/30 to-slate-50 dark:from-[#09090b] dark:via-violet-950/10 dark:to-[#09090b]"
                >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/20 dark:via-primary/5 to-transparent" />
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-violet-500/[0.05] dark:bg-violet-500/[0.03] blur-[130px] rounded-full pointer-events-none" />

                    <div className="container-original relative z-10">
                        <div className="max-w-2xl space-y-6 mb-16">
                            <div className="space-y-2">
                                <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/80 dark:text-primary/70"><TranslatedText id="section.teams.subtitle" fallback="Tim Kami" /></h2>
                                <h3 className="text-3xl md:text-5xl font-black text-slate-800 dark:text-white mb-4"><TranslatedText id="section.teams" fallback="Divisi Kami" /></h3>
                            </div>
                            <p className="text-zinc-500 dark:text-zinc-400 text-sm md:text-lg leading-relaxed font-medium">
                                <TranslatedText id="section.teams.desc" fallback="Kenali tim-tim spesialis yang menggerakkan keunggulan di setiap aspek ekosistem PT Rizky Rijaya Karya." />
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {teams.map((team) => (
                                <DivisionCard
                                    key={team.id}
                                    team={team}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                <GallerySection />
            </main>

            <Footer />
            <FloatingButtonsServer />
        </div>
    );
}

// trigger rebuild