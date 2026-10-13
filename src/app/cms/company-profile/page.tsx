import { getSettings } from "@/actions/settings";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AboutSettingsForm } from "@/components/cms/about-settings-form";
import { Lightbulb } from "lucide-react";

export const metadata = {
    title: "Hero & Bio (About Me) | CMS",
};

export default async function CompanyProfilePage() {
    const settings = await getSettings();

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
                <div>
                    <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-white">Hero & Biodata (About Me)</h2>
                    <p className="text-sm text-slate-500 dark:text-zinc-400 mt-1">Kelola judul Hero, subtitle profesi QA Engineer, serta deskripsi lengkap biodata Anda.</p>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-center gap-6 mb-8">
                <div className="flex-1 flex items-center gap-4 p-5 rounded-none bg-[#FACC15]/10 border-2 border-black dark:border-white shadow-retro-xs animate-in fade-in slide-in-from-top-1 duration-500">
                    <div className="p-2.5 rounded-none bg-[#FACC15] text-black border-2 border-black dark:border-white shrink-0">
                        <Lightbulb className="w-5 h-5" />
                    </div>
                    <p className="text-[11px] md:text-xs text-slate-800 dark:text-zinc-200 leading-relaxed font-bold">
                        <span className="font-black text-amber-500 dark:text-[#FACC15] mr-1 uppercase tracking-widest">Panduan:</span>
                        Perubahan teks judul Hero, subtitle, dan biodata di halaman ini akan langsung memperbarui tampilan pada Landing Page & Seksi Tentang Saya secara real-time.
                    </p>
                </div>
            </div>

            <Card className="bg-[#FAF6ED] dark:bg-[#151B22] border-2 border-black dark:border-white rounded-none overflow-hidden shadow-retro-sm">
                <CardHeader className="border-b-2 border-black dark:border-white bg-[#FACC15]/15 dark:bg-[#0E1217] px-6 py-4">
                    <CardTitle className="text-lg font-black uppercase text-slate-900 dark:text-white">Informasi Profil</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                    <AboutSettingsForm settings={settings} />
                </CardContent>
            </Card>
        </div>
    );
}
