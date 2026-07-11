import { getTeamMembers } from "@/actions/team-member";
import { OrganizationCms } from "@/components/cms/organization-cms";
import { Lightbulb } from "lucide-react";

export const metadata = {
    title: "Manajemen SO | CMS",
};

export default async function OrganizationPage() {
    const teamMembers = await getTeamMembers();

    return (
        <div className="space-y-6">
            <div className="mb-10">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                    <div className="flex-1">
                        <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-white uppercase">Struktur Organisasi</h2>
                        <p className="text-sm text-slate-500 dark:text-zinc-400 mt-2 font-medium leading-relaxed max-w-2xl">
                            Susun Struktur Organisasi (SO) perusahaan. Urutan ke 1 hingga 3 akan otomatis ditampilkan sebagai posisi puncak (Eksekutif), sedangkan urutan selanjutnya akan dikelompokkan ke level Manajemen dan Operasional.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row lg:items-center gap-6 mt-6">
                    <div className="flex-1 flex items-center gap-4 p-5 rounded-[1.5rem] bg-blue-500/[0.03] dark:bg-blue-500/[0.02] border border-blue-500/10 animate-in fade-in slide-in-from-top-1 duration-500">
                        <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 shrink-0">
                            <Lightbulb className="w-5 h-5" />
                        </div>
                        <p className="text-[11px] md:text-xs text-slate-600 dark:text-zinc-400 leading-relaxed font-medium">
                            <span className="font-bold text-blue-600 dark:text-blue-400 mr-1 uppercase tracking-widest">Tips:</span>
                            Gunakan fitur <strong className="text-slate-900 dark:text-slate-200">Drag & Drop</strong> pada daftar di bawah untuk mengatur hirarki. Posisi paling atas adalah Komisaris/Direktur Utama.
                        </p>
                    </div>
                </div>
            </div>

            <div className="h-px bg-gradient-to-r from-slate-200 via-transparent to-transparent dark:from-zinc-800" />

            <OrganizationCms initialMembers={teamMembers} />
        </div>
    );
}
