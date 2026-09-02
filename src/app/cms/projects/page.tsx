import { getProjects } from "@/actions/project";
import { ProjectFormToggle } from "@/components/cms/project-form-toggle";
import { ProjectSortableList } from "@/components/cms/project-sortable-list";
import { Lightbulb } from "lucide-react";

export default async function ProjectsPage() {
    const projects = await getProjects();

    return (
        <div className="space-y-6">
            <div className="mb-10">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                    <div className="flex-1">
                        <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-white uppercase">Portofolio Proyek</h2>
                        <p className="text-sm text-slate-500 dark:text-zinc-400 mt-2 font-medium leading-relaxed max-w-2xl">
                            Susun portofolio karya terbaik Haikal Al Ghifari (Baroedak COMO, Compro RRK, FinTrack, Silesin Combiphar) dan atur tampilan di landing page.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row lg:items-center gap-6 mt-6">
                    {/* Project Ordering Tutorial */}
                    <div className="flex-1 flex items-center gap-4 p-5 rounded-[1.5rem] bg-blue-500/[0.03] dark:bg-blue-500/[0.02] border border-blue-500/10 animate-in fade-in slide-in-from-top-1 duration-500">
                        <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 shrink-0">
                            <Lightbulb className="w-5 h-5" />
                        </div>
                        <p className="text-[11px] md:text-xs text-slate-600 dark:text-zinc-400 leading-relaxed font-medium">
                            <span className="font-bold text-blue-600 dark:text-blue-400 mr-1 uppercase tracking-widest">Tips:</span>
                            Gunakan fitur <strong className="text-slate-900 dark:text-slate-200">Drag & Drop</strong> pada daftar di bawah untuk mengatur urutan. Proyek yang berada di posisi pertama akan otomatis tampil sebagai sorotan utama di landing page.
                        </p>
                    </div>

                    <div className="shrink-0 flex justify-end">
                        <ProjectFormToggle />
                    </div>
                </div>
            </div>

            <div className="h-px bg-gradient-to-r from-slate-200 via-transparent to-transparent dark:from-zinc-800" />

            <ProjectSortableList initialProjects={projects} />
        </div>
    );
}
