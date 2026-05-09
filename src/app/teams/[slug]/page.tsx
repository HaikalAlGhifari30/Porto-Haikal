import { prisma } from "@/lib/db";
import { Navbar } from "@/components/navbar";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ChevronRight, Globe } from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedin, FaGlobe } from "react-icons/fa";

export default async function TeamDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const team = await prisma.team.findUnique({
        where: { slug: slug },
        include: {
            positions: {
                orderBy: { hierarchyLevel: "asc" },
                include: {
                    members: {
                        where: { isActive: true }
                    }
                }
            }
        }
    });

    if (!team) {
        notFound();
    }

    const totalMembers = team.positions.reduce((acc, pos) => acc + pos.members.length, 0);

    return (
        <div className="dark bg-zinc-950 min-h-screen text-zinc-50 flex flex-col selection:bg-blue-500/30 overflow-x-hidden">
            <Navbar />
            <main className="flex-1 relative">
                {/* Cinematic Hero Background - More Compact */}
                <div className="absolute top-0 inset-x-0 h-[45vh] lg:h-[50vh] -z-10 overflow-hidden">
                    {team.coverImage ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={team.coverImage}
                            alt={team.name}
                            className="w-full h-full object-cover opacity-30 md:opacity-40 scale-105 animate-ken-burns"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-900/20 via-zinc-950 to-zinc-950" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />
                    <div className="absolute inset-0 bg-zinc-950/20 backdrop-blur-[2px]" />
                </div>

                <div className="container-original pt-24 md:pt-32 pb-24">
                    <Link href="/#divisions" className="inline-flex items-center text-[10px] font-bold uppercase tracking-widest text-zinc-500 hover:text-white mb-10 transition-colors group">
                        <ArrowLeft className="w-3.5 h-3.5 mr-2 group-hover:-translate-x-1 transition-transform" /> BACK TO DIVISIONS
                    </Link>

                    {/* Compact Hero Layout: 2 Columns */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-20 items-center mb-20 md:mb-24">
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-[9px] text-blue-400 font-bold uppercase tracking-widest">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" /> DIVISION IDENTITY
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif font-bold text-white tracking-tighter leading-[0.9] italic">
                                {team.name}
                            </h1>
                            <p className="text-sm md:text-base text-zinc-400 leading-relaxed font-light max-w-xl border-l-2 border-blue-500/30 pl-6">
                                {team.description || "Discover the dedicated professionals driving our innovation and success."}
                            </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-8 md:gap-12 lg:justify-end">
                            <div className="bg-white/5 backdrop-blur-md border border-white/5 rounded-[2rem] p-6 md:p-8 min-w-[160px] hover:bg-white/10 transition-colors">
                                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-3">MEMBERS</p>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-4xl md:text-5xl font-bold text-white tracking-tighter">{totalMembers}</span>
                                    <span className="text-xs font-bold text-zinc-600 uppercase tracking-widest">Total</span>
                                </div>
                            </div>
                            <div className="bg-white/5 backdrop-blur-md border border-white/5 rounded-[2rem] p-6 md:p-8 min-w-[160px] hover:bg-white/10 transition-colors">
                                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-3">CATEGORY</p>
                                <p className="text-xl md:text-2xl font-bold text-blue-500 tracking-tighter uppercase italic">Professional</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-20 md:space-y-24">
                        {team.positions.map((position) => {
                            if (position.members.length === 0) return null;

                            return (
                                <section key={position.id} className="relative">
                                    <div className="flex items-center gap-6 mb-10">
                                        <div className="h-px w-12 bg-blue-600" />
                                        <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-400">
                                            {position.name}
                                        </h2>
                                        <div className="h-px flex-1 bg-white/5" />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                                        {position.members.map((member) => (
                                            <div
                                                key={member.id}
                                                className="group relative flex items-center gap-4 p-3 md:p-4 rounded-[2rem] bg-zinc-900/50 border border-white/5 hover:border-blue-500/30 hover:bg-zinc-900 transition-all duration-500 shadow-xl"
                                            >
                                                <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl md:rounded-[2rem] overflow-hidden bg-zinc-800 border border-white/5 shrink-0">
                                                    {member.photo ? (
                                                        <img src={member.photo} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-zinc-700">
                                                            {member.name.charAt(0)}
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="flex-1 min-w-0 pr-2">
                                                    <h3 className="text-lg font-serif font-bold text-white truncate mb-1 tracking-tight italic">
                                                        {member.name}
                                                    </h3>
                                                    <p className="text-[9px] font-bold text-blue-500/80 uppercase tracking-widest mb-3">{position.name}</p>

                                                    {/* Social Icons */}
                                                    <div className="flex items-center gap-3">
                                                        {member.instagram && (
                                                            <a href={member.instagram} target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-pink-500 transition-colors">
                                                                <FaInstagram className="w-3.5 h-3.5" />
                                                            </a>
                                                        )}
                                                        {member.facebook && (
                                                            <a href={member.facebook} target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-blue-600 transition-colors">
                                                                <FaFacebook className="w-3.5 h-3.5" />
                                                            </a>
                                                        )}
                                                        {member.linkedin && (
                                                            <a href={member.linkedin} target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-blue-400 transition-colors">
                                                                <FaLinkedin className="w-3.5 h-3.5" />
                                                            </a>
                                                        )}
                                                        {member.website && (
                                                            <a href={member.website} target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-emerald-500 transition-colors">
                                                                <FaGlobe className="w-3.5 h-3.5" />
                                                            </a>
                                                        )}
                                                    </div>
                                                </div>

                                                <Link
                                                    href={`/people/${member.slug}`}
                                                    className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/5 text-zinc-500 hover:text-white hover:bg-blue-600 transition-all opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0"
                                                >
                                                    <ChevronRight className="w-5 h-5" />
                                                </Link>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            );
                        })}
                    </div>

                    {team.positions.length === 0 && (
                        <div className="py-24 text-center rounded-[3rem] border-2 border-dashed border-white/5 bg-zinc-900/20">
                            <p className="text-zinc-500 font-medium tracking-widest uppercase text-[10px]">Belum ada anggota di divisi ini.</p>
                        </div>
                    )}
                </div>
            </main>
            <footer className="py-12 border-t border-white/5 bg-zinc-950 text-center">
                <p className="text-zinc-600 text-[10px] uppercase tracking-widest font-black">Baroedak COMO &copy; 2026</p>
            </footer>
        </div>
    );
}

