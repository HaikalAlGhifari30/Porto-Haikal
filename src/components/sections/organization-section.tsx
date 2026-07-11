import { getTeamMembers } from "@/actions/team-member";
import { cn } from "@/lib/utils";
import { UserCircle2 } from "lucide-react";

export async function OrganizationSection() {
    const members = await getTeamMembers();

    if (!members || members.length === 0) {
        return null; // Don't show if empty
    }

    // Split based on simple order rules
    const executives = members.slice(0, 3);
    const management = members.slice(3, 6);
    const operational = members.slice(6);

    const MemberCard = ({ member, isExecutive = false }: { member: any, isExecutive?: boolean }) => (
        <div className={cn(
            "group bg-white dark:bg-zinc-900 shadow-xl border border-slate-100 dark:border-zinc-800 rounded-3xl p-6 md:p-8 flex flex-col items-center justify-center text-center transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1 relative overflow-hidden",
            isExecutive ? "w-full max-w-[18rem] z-10" : "w-full h-full z-10"
        )}>
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
            
            {/* Top color bar */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Avatar Placeholder */}
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-zinc-800 dark:to-zinc-900 flex items-center justify-center shadow-inner border border-slate-200/60 dark:border-zinc-700/50 mb-5 group-hover:scale-110 transition-transform duration-500 shrink-0">
                <UserCircle2 className="w-8 h-8 text-blue-500/60 dark:text-blue-400/60" />
            </div>

            <h4 className="text-lg md:text-xl font-black text-slate-800 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight relative z-10">
                {member.name}
            </h4>
            
            <div className="px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30 relative z-10 mt-auto">
                <p className="text-[10px] md:text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
                    {member.position}
                </p>
            </div>
        </div>
    );

    return (
        <section id="organization" className="py-24 relative overflow-hidden bg-gradient-to-b from-slate-50 via-emerald-50/20 to-white dark:from-slate-950 dark:via-emerald-950/10 dark:to-slate-950">
            {/* Top border */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-emerald-400/20 dark:via-emerald-500/10 to-transparent" />
            {/* Radial glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-emerald-400/[0.04] dark:bg-emerald-500/[0.03] blur-[130px] rounded-full pointer-events-none" />
            <div className="container-original relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-black text-slate-800 dark:text-white">
                        Struktur Organisasi
                    </h2>
                </div>

                <div className="max-w-5xl mx-auto flex flex-col items-center gap-12">
                    
                    {/* Executive Level - Flex Column */}
                    {executives.length > 0 && (
                        <div className="flex flex-col items-center gap-8 w-full relative">
                            {/* Connecting Line behind executives */}
                            {executives.length > 1 && (
                                <div className="absolute top-0 bottom-0 left-1/2 w-px bg-slate-300 dark:bg-slate-700 -translate-x-1/2 z-0" />
                            )}
                            
                            {executives.map((member) => (
                                <MemberCard key={member.id} member={member} isExecutive={true} />
                            ))}
                        </div>
                    )}

                    {/* Horizontal Connector Line from Executive to Management */}
                    {(executives.length > 0 && (management.length > 0 || operational.length > 0)) && (
                        <div className="w-px h-12 bg-slate-300 dark:bg-slate-700 -my-12 z-0" />
                    )}

                    {/* Management Level - Grid 3 Cols */}
                    {management.length > 0 && (
                        <div className="w-full relative">
                            {/* Top Horizontal branch line if there are multiple items */}
                            {management.length > 1 && (
                                <div className="absolute -top-6 left-[16.666%] right-[16.666%] h-px bg-slate-300 dark:bg-slate-700 z-0 hidden md:block" />
                            )}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                                {management.map((member) => (
                                    <div key={member.id} className="relative flex justify-center">
                                        <div className="absolute -top-6 left-1/2 w-px h-6 bg-slate-300 dark:bg-slate-700 z-0 hidden md:block" />
                                        <MemberCard member={member} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Vertical connector to operational */}
                    {(management.length > 0 && operational.length > 0) && (
                        <div className="w-px h-12 bg-slate-300 dark:bg-slate-700 -my-12 z-0" />
                    )}

                    {/* Operational Level - Grid 2 Cols (or automatically wrapping) */}
                    {operational.length > 0 && (
                        <div className="w-full max-w-3xl relative">
                            {/* Top Horizontal branch line */}
                            {operational.length > 1 && (
                                <div className="absolute -top-6 left-[25%] right-[25%] h-px bg-slate-300 dark:bg-slate-700 z-0 hidden md:block" />
                            )}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                                {operational.map((member) => (
                                    <div key={member.id} className="relative flex justify-center">
                                        <div className="absolute -top-6 left-1/2 w-px h-6 bg-slate-300 dark:bg-slate-700 z-0 hidden md:block" />
                                        <MemberCard member={member} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
