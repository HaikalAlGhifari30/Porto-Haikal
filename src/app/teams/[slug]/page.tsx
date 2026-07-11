import { prisma } from "@/lib/db";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Users, Mail } from "lucide-react";
import { FaInstagram, FaFacebook, FaLinkedin, FaGlobe } from "react-icons/fa";
import { FloatingButtonsServer } from "@/components/floating-buttons-server";
import { TranslatedText } from "@/components/translated-text";
import { TranslatedContent } from "@/components/translated-content";

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
        <div className="bg-slate-50 dark:bg-[#09090b] text-zinc-900 dark:text-white min-h-screen w-full flex flex-col transition-colors duration-300">
            <Navbar />
            <main className="flex-1 pt-20 md:pt-24 pb-24">
                <div className="container-original max-w-5xl mx-auto px-4">
                    {/* Back Link */}
                    <Link
                        href="/#divisions"
                        className="inline-flex items-center text-sm font-medium text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white mb-8 transition-colors group"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                        <TranslatedText id="team.back" fallback="Kembali ke Divisi" />
                    </Link>

                    {/* Header Section */}
                    <div className="bg-white dark:bg-zinc-900/80 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden mb-10">
                        {/* Cover Image */}
                        {team.coverImage && (
                            <div className="h-48 md:h-64 overflow-hidden">
                                <img
                                    src={team.coverImage}
                                    alt={team.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}

                        <div className="p-8 md:p-10">
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                                <div className="space-y-3">
                                    <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                                        <TranslatedContent idText={team.name} enText={team.nameEn} />
                                    </h1>
                                    <p className="text-sm md:text-base text-slate-500 dark:text-zinc-400 leading-relaxed max-w-xl">
                                        {team.description || team.descriptionEn ? (
                                            <TranslatedContent idText={team.description || ""} enText={team.descriptionEn} />
                                        ) : (
                                            <TranslatedText id="team.noDesc" fallback="Divisi ini belum memiliki deskripsi." />
                                        )}
                                    </p>
                                </div>

                                {/* Stats */}
                                <div className="shrink-0">
                                    <div className="bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-slate-700 rounded-xl px-6 py-4 text-center">
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-zinc-500 mb-1">
                                            <TranslatedText id="team.members" fallback="Anggota" />
                                        </p>
                                        <p className="text-3xl font-black text-slate-900 dark:text-white">{totalMembers}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Positions & Members */}
                    <div className="space-y-10">
                        {team.positions.map((position) => {
                            if (position.members.length === 0) return null;

                            return (
                                <section key={position.id}>
                                    {/* Position Title */}
                                    <div className="flex items-center gap-4 mb-6">
                                        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-zinc-400">
                                            <TranslatedContent idText={position.name} enText={position.nameEn} />
                                        </h2>
                                        <div className="h-px flex-1 bg-slate-200 dark:bg-zinc-800" />
                                        <span className="text-xs font-medium text-slate-400 dark:text-zinc-500">
                                            {position.members.length} orang
                                        </span>
                                    </div>

                                    {/* Member Cards Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {position.members.map((member) => (
                                            <div
                                                key={member.id}
                                                className="group bg-white dark:bg-zinc-900/80 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors duration-300 flex items-center gap-4"
                                            >
                                                {/* Avatar */}
                                                <div className="w-14 h-14 rounded-full overflow-hidden bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-slate-700 shrink-0 flex items-center justify-center">
                                                    {member.photo ? (
                                                        <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <span className="text-xl font-bold text-slate-400 dark:text-zinc-500">
                                                            {member.name.charAt(0)}
                                                        </span>
                                                    )}
                                                </div>

                                                {/* Info */}
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 truncate">
                                                        {member.name}
                                                    </h3>
                                                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-zinc-500 mb-2">
                                                        <TranslatedContent idText={position.name} enText={position.nameEn} />
                                                    </p>

                                                    {/* Social Icons */}
                                                    <div className="flex items-center gap-2.5">
                                                        {member.email && (
                                                            <a href={`mailto:${member.email}`} className="text-slate-400 dark:text-zinc-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                                                <Mail className="w-3.5 h-3.5" />
                                                            </a>
                                                        )}
                                                        {member.instagram && (
                                                            <a href={member.instagram} target="_blank" rel="noreferrer" className="text-slate-400 dark:text-zinc-500 hover:text-pink-500 transition-colors">
                                                                <FaInstagram className="w-3.5 h-3.5" />
                                                            </a>
                                                        )}
                                                        {member.facebook && (
                                                            <a href={member.facebook} target="_blank" rel="noreferrer" className="text-slate-400 dark:text-zinc-500 hover:text-blue-600 transition-colors">
                                                                <FaFacebook className="w-3.5 h-3.5" />
                                                            </a>
                                                        )}
                                                        {member.linkedin && (
                                                            <a href={member.linkedin} target="_blank" rel="noreferrer" className="text-slate-400 dark:text-zinc-500 hover:text-blue-500 transition-colors">
                                                                <FaLinkedin className="w-3.5 h-3.5" />
                                                            </a>
                                                        )}
                                                        {member.website && (
                                                            <a href={member.website} target="_blank" rel="noreferrer" className="text-slate-400 dark:text-zinc-500 hover:text-emerald-500 transition-colors">
                                                                <FaGlobe className="w-3.5 h-3.5" />
                                                            </a>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            );
                        })}
                    </div>

                    {/* Empty State */}
                    {team.positions.length === 0 && (
                        <div className="py-20 text-center border-2 border-dashed border-slate-200 dark:border-zinc-800 rounded-xl bg-slate-50/50 dark:bg-zinc-900/20">
                            <Users className="w-10 h-10 text-slate-300 dark:text-zinc-700 mx-auto mb-3" />
                            <p className="text-sm font-medium text-slate-500 dark:text-zinc-400">
                                <TranslatedText id="team.empty" fallback="Belum ada anggota di divisi ini." />
                            </p>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
            <FloatingButtonsServer />
        </div>
    );
}
