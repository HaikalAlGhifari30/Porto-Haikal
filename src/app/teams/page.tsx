import { getTeams } from "@/actions/team";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FloatingButtonsServer } from "@/components/floating-buttons-server";

export default async function TeamsPage() {
    const teams = await getTeams();

    return (
        <div className="bg-slate-50 dark:bg-[#09090b] text-zinc-900 dark:text-white min-h-screen w-full flex flex-col transition-colors duration-300">
            <Navbar />
            <main className="flex-1 pt-20 md:pt-24 pb-24">
                <div className="container-original max-w-5xl mx-auto px-4">
                    {/* Header */}
                    <div className="mb-12 text-center max-w-2xl mx-auto space-y-3">
                        <h1 className="text-3xl md:text-5xl font-black text-slate-800 dark:text-white tracking-tight">
                            Divisi Kami
                        </h1>
                        <p className="text-sm md:text-base text-slate-500 dark:text-zinc-400 leading-relaxed">
                            Kenali tim-tim spesialis yang menggerakkan keunggulan di setiap aspek ekosistem PT Rizky Rijaya Karya.
                        </p>
                    </div>

                    {/* Division Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {teams.map(team => (
                            <Link
                                key={team.id}
                                href={`/teams/${team.slug}`}
                                className="group bg-white dark:bg-zinc-900/80 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors duration-300 overflow-hidden flex flex-col"
                            >
                                {/* Cover Image */}
                                {(team.coverImage || team.imageUrl) ? (
                                    <div className="aspect-[16/9] overflow-hidden border-b border-slate-200 dark:border-slate-800">
                                        <img
                                            src={team.coverImage || team.imageUrl || ""}
                                            alt={team.name}
                                            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                                        />
                                    </div>
                                ) : (
                                    <div className="aspect-[16/9] bg-slate-100 dark:bg-zinc-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-center">
                                        <span className="text-slate-400 dark:text-zinc-600 text-sm font-medium">No Image</span>
                                    </div>
                                )}

                                {/* Content */}
                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="flex items-center justify-between mb-3">
                                        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                            {team.name}
                                        </h2>
                                        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-100 dark:bg-zinc-800 text-slate-400 dark:text-zinc-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                                        </div>
                                    </div>
                                    <p className="text-sm text-slate-500 dark:text-zinc-400 leading-relaxed line-clamp-3 flex-1">
                                        {team.description || "Divisi ini belum memiliki deskripsi."}
                                    </p>

                                    {/* Members Count */}
                                    <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-zinc-500">
                                            {team.members?.length || 0} Anggota
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </main>

            <Footer />
            <FloatingButtonsServer />
        </div>
    );
}
