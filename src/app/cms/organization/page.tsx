import { getTeamMembers } from "@/actions/team-member";
import { OrganizationCms } from "@/components/cms/organization-cms";
import { Lightbulb } from "lucide-react";

export const metadata = {
    title: "Karir & Organisasi | CMS",
};

export default async function OrganizationPage() {
    const teamMembers = await getTeamMembers();

    return (
        <div className="space-y-6">
            <div className="mb-10">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                    <div className="flex-1">
                        <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-white uppercase">Pengalaman Karir & Organisasi</h2>
                        <p className="text-sm text-slate-500 dark:text-zinc-400 mt-2 font-medium leading-relaxed max-w-2xl">
                            Kelola riwayat karir profesional QA (termasuk posisi di COMO 1907) serta kepemimpinan organisasi (mantan Ketua HMIF UNIKOM).
                        </p>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row lg:items-center gap-6 mt-6">
                    <div className="flex-1 flex items-center gap-4 p-5 rounded-[1.5rem] bg-cyan-500/[0.04] border border-cyan-500/20 animate-in fade-in slide-in-from-top-1 duration-500">
                        <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 shrink-0">
                            <Lightbulb className="w-5 h-5" />
                        </div>
                        <p className="text-[11px] md:text-xs text-slate-600 dark:text-zinc-300 leading-relaxed font-medium">
                            <span className="font-bold text-cyan-400 mr-1 uppercase tracking-widest">Tips:</span>
                            Perubahan posisi karir dan pengalaman organisasi di halaman ini akan langsung diperbarui pada seksi <strong className="text-slate-900 dark:text-slate-200">Rekam Jejak Karir (Experience)</strong> di Landing Page.
                        </p>
                    </div>
                </div>
            </div>

            <div className="h-px bg-gradient-to-r from-slate-200 via-transparent to-transparent dark:from-zinc-800" />

            <OrganizationCms initialMembers={teamMembers} />
        </div>
    );
}
