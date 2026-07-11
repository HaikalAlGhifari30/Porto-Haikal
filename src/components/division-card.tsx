
"use client";

import { ArrowRight, Users, Briefcase } from "lucide-react";
import * as Icons from "lucide-react";
import { cn } from "@/lib/utils";
import { EditTeamModal } from "./cms/edit-team-modal";
import { DeleteTeamDialog } from "./cms/delete-team-dialog";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { TranslatedContent } from "./translated-content";

interface Team {
    id: string;
    name: string;
    nameEn?: string | null;
    slug: string;
    description: string | null;
    descriptionEn?: string | null;
    imageUrl: string | null;
    logoUrl: string | null;
    coverImage: string | null;
    icon?: string | null;
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

    const CardContent = (
        <>
            {/* Cover Area */}
            <div className="aspect-[16/9] relative overflow-hidden bg-slate-50 dark:bg-zinc-950 border-b border-slate-100 dark:border-zinc-800">
                {(team.coverImage || team.imageUrl) ? (
                    <div className="absolute inset-0 group-hover:scale-105 transition-transform duration-700 ease-in-out">
                        <img
                            src={team.coverImage || team.imageUrl || ""}
                            alt={team.name}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/20 dark:bg-black/40" />
                    </div>
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-zinc-900 dark:to-zinc-950 group-hover:scale-105 transition-transform duration-700 ease-in-out" />
                )}

                {/* Icon Container */}
                <div className="absolute inset-0 flex items-center justify-center z-10 group-hover:scale-105 transition-transform duration-700 ease-in-out">
                    <div className={cn(
                        "w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300",
                        (team.coverImage || team.imageUrl)
                            ? "bg-white/20 dark:bg-black/30 backdrop-blur-md border border-white/30 dark:border-white/10"
                            : "bg-white dark:bg-zinc-800/60 border border-slate-100 dark:border-zinc-800/80"
                    )}>
                        {(() => {
                            const SelectedIcon = (team.icon && (Icons as any)[team.icon]) ? (Icons as any)[team.icon] : Briefcase;
                            return <SelectedIcon className={cn(
                                "w-8 h-8 transition-colors duration-300",
                                (team.coverImage || team.imageUrl)
                                    ? "text-white"
                                    : "text-blue-500/70 dark:text-blue-400/70"
                            )} />;
                        })()}
                    </div>
                </div>
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {isCms && (
                    <div className="absolute top-4 right-4 flex gap-1.5 z-20" onClick={(e) => e.stopPropagation()}>
                        <EditTeamModal team={team} />
                        <DeleteTeamDialog team={team} />
                    </div>
                )}
            </div>

            {/* Content Area */}
            <div className="p-6 md:p-8 bg-white dark:bg-zinc-900 flex flex-col justify-between flex-grow relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-500/10 dark:group-hover:bg-blue-500/20 transition-colors duration-500" />

                <div className="relative z-10 flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
                        <TranslatedContent idText={team.name} enText={team.nameEn} />
                    </h3>
                    <div className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shrink-0 ml-4",
                        "bg-slate-50 dark:bg-zinc-800 text-slate-400 dark:text-zinc-500",
                        "group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-blue-500/30"
                    )}>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                </div>

                <p className="relative z-10 text-sm text-slate-500 dark:text-zinc-400 font-medium leading-relaxed line-clamp-3 mb-2">
                    <TranslatedContent idText={team.description || "Divisi ini berdedikasi untuk memberikan hasil terbaik dan inovatif dalam setiap proyeknya."} enText={team.descriptionEn || "This division is dedicated to delivering the best and innovative results in every project."} />
                </p>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-zinc-800/80 flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center">
                            <Users className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-zinc-400">
                            {team.members?.length || 0} Members
                        </span>
                    </div>
                    {isCms && (
                        <div className="flex flex-col items-end">
                            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400 group-hover:hidden transition-all">Manage</span>
                            <span className="text-[9px] font-bold uppercase tracking-[0.1em] text-blue-500 hidden group-hover:block animate-in fade-in slide-in-from-right-1 duration-300 italic">Open Settings</span>
                        </div>
                    )}
                </div>
            </div>
        </>
    );

    const wrapperClasses = cn(
        "group relative block border transition-all duration-500 rounded-3xl overflow-hidden h-full flex flex-col cursor-pointer",
        "bg-white dark:bg-zinc-900 border-slate-100 dark:border-zinc-800 shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1.5",
        className
    );

    if (isCms) {
        return (
            <div onClick={handleCardClick} className={wrapperClasses}>
                {CardContent}
            </div>
        );
    }

    return (
        <Link href={href} className={wrapperClasses}>
            {CardContent}
        </Link>
    );
}
