
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
            <div className={cn(
                "aspect-[16/9] relative overflow-hidden bg-slate-50 dark:bg-zinc-950",
                isCms ? "border-b-2 border-black dark:border-white" : "border-b border-slate-100 dark:border-zinc-800"
            )}>
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
                        "w-16 h-16 flex items-center justify-center transition-all duration-300",
                        isCms ? "rounded-none border-2 border-black dark:border-white bg-[#FACC15] text-black shadow-retro-xs" : "rounded-2xl shadow-lg",
                        !isCms && ((team.coverImage || team.imageUrl)
                            ? "bg-white/20 dark:bg-black/30 backdrop-blur-md border border-white/30 dark:border-white/10"
                            : "bg-white dark:bg-zinc-800/60 border border-slate-100 dark:border-zinc-800/80")
                    )}>
                        {(() => {
                            const SelectedIcon = (team.icon && (Icons as any)[team.icon]) ? (Icons as any)[team.icon] : Briefcase;
                            return <SelectedIcon className={cn(
                                "w-8 h-8 transition-colors duration-300",
                                isCms ? "text-black" : ((team.coverImage || team.imageUrl)
                                    ? "text-white"
                                    : "text-amber-500 dark:text-[#FACC15]")
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
            <div className={cn(
                "p-6 md:p-8 flex flex-col justify-between flex-grow relative overflow-hidden",
                isCms ? "bg-white dark:bg-[#0E1217]" : "bg-white dark:bg-zinc-900"
            )}>
                <div className="relative z-10 flex items-center justify-between mb-4">
                    <h3 className={cn(
                        "text-xl font-bold tracking-tight transition-colors",
                        isCms 
                            ? "font-black uppercase text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-[#FACC15]" 
                            : "text-slate-800 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400"
                    )}>
                        <TranslatedContent idText={team.name} enText={team.nameEn} />
                    </h3>
                    <div className={cn(
                        "w-10 h-10 flex items-center justify-center transition-all duration-300 shrink-0 ml-4",
                        isCms 
                            ? "rounded-none border-2 border-black dark:border-white bg-[#FAF6ED] dark:bg-[#151B22] text-black dark:text-white group-hover:bg-[#FACC15] group-hover:text-black shadow-retro-xs" 
                            : "rounded-full bg-slate-50 dark:bg-zinc-800 text-slate-400 dark:text-zinc-500 group-hover:bg-[#FACC15] group-hover:text-black"
                    )}>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                </div>

                <p className="relative z-10 text-sm text-slate-600 dark:text-zinc-400 font-medium leading-relaxed line-clamp-3 mb-2">
                    <TranslatedContent idText={team.description || "Divisi ini berdedikasi untuk memberikan hasil terbaik dan inovatif dalam setiap proyeknya."} enText={team.descriptionEn || "This division is dedicated to delivering the best and innovative results in every project."} />
                </p>

                <div className={cn(
                    "mt-6 pt-4 flex items-center justify-between relative z-10",
                    isCms ? "border-t-2 border-black dark:border-white" : "border-t border-slate-100 dark:border-zinc-800/80"
                )}>
                    <div className="flex items-center gap-2">
                        <div className={cn(
                            "w-7 h-7 flex items-center justify-center",
                            isCms ? "rounded-none bg-[#FACC15] border border-black text-black shadow-retro-xs" : "rounded-full bg-amber-500/10 text-amber-500"
                        )}>
                            <Users className="w-3.5 h-3.5 stroke-[2.5]" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-zinc-300">
                            {team.members?.length || 0} Members
                        </span>
                    </div>
                    {isCms && (
                        <div className="flex flex-col items-end">
                            <span className="text-[9px] font-black uppercase tracking-widest text-amber-600 dark:text-[#FACC15] group-hover:hidden transition-all">Manage</span>
                            <span className="text-[9px] font-black uppercase tracking-widest text-amber-600 dark:text-[#FACC15] hidden group-hover:block underline italic">Open Settings</span>
                        </div>
                    )}
                </div>
            </div>
        </>
    );

    const wrapperClasses = cn(
        "group relative block transition-all duration-300 overflow-hidden h-full flex flex-col cursor-pointer",
        isCms 
            ? "rounded-none border-2 border-black dark:border-white bg-[#FAF6ED] dark:bg-[#151B22] shadow-retro-sm hover:shadow-retro-md hover:-translate-y-1" 
            : "rounded-3xl border border-slate-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm hover:shadow-2xl hover:-translate-y-1.5",
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
