import { getSettings } from "@/actions/settings";
import { getHeroSlides } from "@/actions/hero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HeroSettingsForm } from "@/components/cms/hero-settings-form";

export default async function SettingsPage() {
    const [settings, slides] = await Promise.all([
        getSettings(),
        getHeroSlides()
    ]);

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Pengaturan Visual</h2>
                    <p className="text-sm text-slate-500 dark:text-zinc-400 mt-1">Kelola banner carousel dan identitas utama halaman utama.</p>
                </div>
            </div>

            <Card className="bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm">
                <CardHeader className="border-b border-slate-100 dark:border-zinc-800/50 bg-slate-50/50 dark:bg-zinc-900/50 px-6 py-4">
                    <CardTitle className="text-lg font-bold text-slate-900 dark:text-white">Banner Hero & Slideshow</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                    <HeroSettingsForm initialSlides={slides as any} />
                </CardContent>
            </Card>
        </div>
    );
}
