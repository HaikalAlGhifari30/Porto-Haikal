import { getProjects } from "@/actions/project";
import { getSettings } from "@/actions/settings";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { AIAssistantModal } from "@/components/ai-assistant-modal";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ProjectsPage() {
  const [projects, settings] = await Promise.all([
    getProjects(),
    getSettings()
  ]);
  const visibleProjects = projects.filter(p => p.isVisible);

  return (
    <div className="bg-[#FAF6ED] dark:bg-[#0E1217] text-slate-900 dark:text-slate-100 min-h-screen flex flex-col transition-colors duration-300">
      <Navbar settings={settings} />
      <AIAssistantModal settings={settings} />
      
      <main className="flex-1 py-24 sm:py-28 px-4 sm:px-6 relative overflow-hidden">
        <div className="container-original mx-auto max-w-7xl space-y-10">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-block px-3.5 py-1.5 bg-[#FACC15] border-2 border-black dark:border-white shadow-retro-sm text-black font-pixel text-xs uppercase font-bold tracking-wider">
              ALL CARTRIDGES // PORTFOLIO ARCHIVE
            </div>
            <h1 className="text-3xl sm:text-5xl font-pixel font-black tracking-tight text-black dark:text-white uppercase">
              Project Archive
            </h1>
            <p className="font-sans text-sm sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed font-medium max-w-2xl mx-auto">
              Koleksi lengkap proyek pengembangan web, pengujian manual & otomatis, serta verifikasi kualitas sistem.
            </p>
          </div>

          {/* Grid of Projects */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {visibleProjects.map((project, idx) => {
              const imgUrl = project.imageUrl ? project.imageUrl.split(',')[0].trim() : null;
              return (
                <Link
                  href={`/projects/${project.slug || project.id}`}
                  key={project.id}
                  className="group block bg-white dark:bg-[#151B22] border-3 border-black dark:border-white shadow-retro-sm hover:shadow-retro-lg transition-all duration-300 flex flex-col overflow-hidden"
                >
                  {/* Card Titlebar */}
                  <div className="bg-[#FACC15] text-black border-b-2 border-black dark:border-white px-3.5 py-1.5 font-pixel text-[11px] font-black flex items-center justify-between">
                    <span className="uppercase tracking-wider">
                      CART-0{idx + 1}
                    </span>
                    <span className="uppercase text-[10px] bg-white px-2 py-0.5 border border-black font-bold">
                      {project.category || "PROJECT"}
                    </span>
                  </div>

                  {/* Image Viewport */}
                  <div className="aspect-[16/10] bg-black relative overflow-hidden border-b-2 border-black dark:border-white">
                    {imgUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={imgUrl}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full text-zinc-500 bg-zinc-900 font-pixel text-xs">
                        NO PREVIEW
                      </div>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-pixel text-base sm:text-lg font-bold text-black dark:text-white group-hover:text-blue-600 dark:group-hover:text-yellow-400 transition-colors leading-snug uppercase">
                        {project.title}
                      </h3>
                      <p className="font-sans text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 font-medium leading-relaxed line-clamp-3">
                        {project.description || "Digital experience built and tested with precision."}
                      </p>
                    </div>

                    <div className="pt-2 border-t-2 border-black/10 dark:border-white/10 flex items-center justify-between text-xs font-pixel font-bold text-black dark:text-white">
                      <span>VIEW DOSSIER</span>
                      <ArrowUpRight className="w-4 h-4 text-black dark:text-[#FACC15] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Bottom Back Button */}
          <div className="pt-6 text-center">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-[#151B22] border-2 border-black dark:border-white text-black dark:text-white font-pixel text-xs font-bold shadow-retro-sm btn-retro uppercase hover:bg-[#FACC15] hover:text-black transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
