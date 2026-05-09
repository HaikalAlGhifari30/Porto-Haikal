import { getTeams } from "@/actions/team";
import { Navbar } from "@/components/navbar";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default async function TeamsPage() {
    const teams = await getTeams();

    return (
        <>
            <Navbar />
            <main className="flex-1 py-20 px-6">
                <div className="container mx-auto">
                    <div className="mb-16 text-center max-w-2xl mx-auto">
                        <h1 className="text-5xl font-bold tracking-tighter mb-4">Our Teams</h1>
                        <p className="text-xl text-zinc-400">The brilliant minds behind our success.</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {teams.map(team => (
                            <Link key={team.id} href={`/teams/${team.slug}`} className="group block">
                                <div className="p-8 rounded-3xl border border-white/10 bg-zinc-900/40 hover:bg-zinc-800/60 hover:border-white/20 transition-all duration-300">
                                    <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">{team.name}</h2>
                                    <p className="text-zinc-400 mb-8">{team.description}</p>

                                    <div className="flex items-center justify-between pt-6 border-t border-white/5">
                                        <div className="flex -space-x-3">
                                            {team.members.slice(0, 5).map(member => (
                                                <div key={member.id} className="w-10 h-10 rounded-full border-2 border-zinc-900 bg-zinc-800 overflow-hidden">
                                                    {member.photo ? (
                                                        // eslint-disable-next-line @next/next/no-img-element
                                                        <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-xs text-zinc-500 font-bold bg-zinc-800">
                                                            {member.name.charAt(0)}
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                            {team.members.length > 5 && (
                                                <div className="w-10 h-10 rounded-full border-2 border-zinc-900 bg-zinc-800 flex items-center justify-center text-xs text-zinc-400 font-medium">
                                                    +{team.members.length - 5}
                                                </div>
                                            )}
                                        </div>
                                        <div className="w-10 h-10 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-colors">
                                            <ArrowRight className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </main>
        </>
    );
}
