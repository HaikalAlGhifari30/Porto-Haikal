import { getSettings } from "@/actions/settings";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AboutSettingsForm } from "@/components/cms/about-settings-form";
import { Lightbulb } from "lucide-react";

export const metadata = {
    title: "Profil Perusahaan | CMS",
};

export default async function CompanyProfilePage() {
    const settings = await getSettings();

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Profil Perusahaan</h2>
                    <p className="text-sm text-slate-500 dark:text-zinc-400 mt-1">Kelola informasi Tentang Kami, Visi Misi, dan Nilai-nilai perusahaan.</p>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-center gap-6 mb-8">
                <div className="flex-1 flex items-center gap-4 p-5 rounded-[1.5rem] bg-blue-500/[0.03] dark:bg-blue-500/[0.02] border border-blue-500/10 animate-in fade-in slide-in-from-top-1 duration-500">
                    <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 shrink-0">
                        <Lightbulb className="w-5 h-5" />
                    </div>
                    <p className="text-[11px] md:text-xs text-slate-600 dark:text-zinc-400 leading-relaxed font-medium">
                        <span className="font-bold text-blue-600 dark:text-blue-400 mr-1 uppercase tracking-widest">Panduan:</span>
                        Gunakan tombol <strong className="text-slate-900 dark:text-slate-200">Tambah Nilai</strong> untuk memasukkan lebih dari satu Core Values. Pada form Misi, pisahkan setiap poin misi dengan baris baru (Enter). Perubahan di sini akan langsung memperbarui konten di bagian Profil Perusahaan pada Landing Page.
                    </p>
                </div>
            </div>

            <Card className="bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm">
                <CardHeader className="border-b border-slate-100 dark:border-zinc-800/50 bg-slate-50/50 dark:bg-zinc-900/50 px-6 py-4">
                    <CardTitle className="text-lg font-bold text-slate-900 dark:text-white">Informasi Profil</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                    <AboutSettingsForm settings={settings} />
                </CardContent>
            </Card>
        </div>
    );
}
