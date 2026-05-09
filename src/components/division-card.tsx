"use client";

import { ArrowRight, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { EditTeamModal } from "./cms/edit-team-modal";
import { DeleteTeamDialog } from "./cms/delete-team-dialog";
import { useRouter } from "next/navigation";

interface Team {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    imageUrl: string | null;
    logoUrl: string | null;
    coverImage: string | null;
    members?: any[];
}

interface DivisionCardProps {
    team: Team;
    className?: string;
    isCms?: boolean;
}

export function DivisionCard({ team, className, isCms }: DivisionCardProps) {
    const router = useRouter();
    const href = isCms ? `/cms/teams/${team.id}` : `/teams/${team.slug}`;

    const handleCardClick = () => {
        router.push(href);
    };

    return (
        <div
            onClick={handleCardClick}
            className={cn(
                "group relative block border transition-all duration-500 rounded-2xl overflow-hidden h-full flex flex-col cursor-pointer",
                isCms
                    ? "bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 shadow-sm hover:shadow-lg hover:border-blue-500/50"
                    : "bg-zinc-900/50 backdrop-blur-xl border-white/10 hover:border-blue-500/50",
                className
            )}
        >
            {/* Cover Area */}
            <div className={cn(
                "aspect-[16/9] relative overflow-hidden",
                isCms ? "bg-slate-50 dark:bg-zinc-950" : "bg-zinc-900"
            )}>
                {(team.coverImage || team.imageUrl) ? (
                    <img
                        src={team.coverImage || team.imageUrl || ""}
                        alt={team.name}
                        className={cn(
                            "w-full h-full object-cover transition-all duration-700 group-hover:scale-105",
                            isCms ? "opacity-100" : "opacity-80 group-hover:opacity-100"
                        )}
                    />
                ) : (
                    <div className={cn(
                        "w-full h-full bg-gradient-to-br",
                        isCms ? "from-slate-100 to-slate-200 dark:from-zinc-800 dark:to-zinc-900" : "from-zinc-800 to-zinc-900"
                    )} />
                )}

                {isCms && (
                    <div className="absolute top-4 right-4 flex gap-1.5 z-20">
                        <EditTeamModal team={team} />
                        <DeleteTeamDialog team={team} />
                    </div>
                )}

                {/* Gradient Overlay */}
                <div className={cn(
                    "absolute inset-0 transition-opacity",
                    isCms
                        ? "bg-gradient-to-t from-white/20 dark:from-black/60 to-transparent"
                        : "bg-gradient-to-t from-zinc-950/80 to-transparent opacity-60 group-hover:opacity-40"
                )} />
            </div>

            {/* Content Area */}
            <div className={cn(
                isCms ? "p-5" : "p-8",
                "flex-1 flex flex-col",
                isCms ? "bg-white dark:bg-zinc-900" : "bg-zinc-900/40"
            )}>
                <div className={cn("flex items-center justify-between", isCms ? "mb-2.5" : "mb-4")}>
                    <h3 className={cn(
                        isCms ? "text-xl" : "text-2xl",
                        "font-bold tracking-tight transition-colors",
                        isCms ? "text-slate-900 dark:text-white group-hover:text-blue-600" : "text-white group-hover:text-blue-400 font-serif"
                    )}>
                        {team.name}
                    </h3>
                    <div className={cn(
                        isCms ? "w-8 h-8 rounded-xl" : "w-10 h-10 rounded-2xl",
                        "border flex items-center justify-center transition-all",
                        isCms
                            ? "bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 group-hover:bg-blue-600 group-hover:border-blue-600"
                            : "bg-white/5 border-white/10 group-hover:bg-blue-600 group-hover:border-blue-600"
                    )}>
                        <ArrowRight className={cn(
                            isCms ? "w-4 h-4" : "w-5 h-5",
                            "transition-all group-hover:translate-x-0.5",
                            isCms ? "text-slate-400 dark:text-white group-hover:text-white" : "text-white"
                        )} />
                    </div>
                </div>
                <p className={cn(
                    "text-sm line-clamp-2 font-medium leading-relaxed flex-1",
                    isCms ? "text-slate-500 dark:text-zinc-400" : "text-zinc-400"
                )}>
                    {team.description || (isCms ? "Manage division structure, positions, and team members here." : "Explore our division and team members.")}
                </p>

                {isCms && (
                    <div className="mt-5 pt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                            <Users className="w-3.5 h-3.5 text-blue-500" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-zinc-400">
                                {team.members?.length || 0} Members
                            </span>
                        </div>
                        <div className="flex flex-col items-end">
                            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400 group-hover:hidden transition-all">Manage</span>
                            <span className="text-[9px] font-bold uppercase tracking-[0.1em] text-blue-500 hidden group-hover:block animate-in fade-in slide-in-from-right-1 duration-300 italic">Open Settings</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}



