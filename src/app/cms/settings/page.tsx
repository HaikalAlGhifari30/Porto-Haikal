import { getSettings } from "@/actions/settings";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProfilePhotoSettingsForm } from "@/components/cms/profile-photo-settings-form";
import { FooterSettingsForm } from "@/components/cms/footer-settings-form";
import { getWhatsAppAdmins } from "@/actions/whatsapp-admin";
import { WhatsAppAdminCMS } from "@/components/cms/whatsapp-admin-cms";
import { User, MessageCircle, Share2, FileText, Download } from "lucide-react";

export default async function SettingsPage() {
    const [settings, whatsappAdmins] = await Promise.all([
        getSettings(),
        getWhatsAppAdmins()
    ]);

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
                <div>
                    <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-white uppercase">Pengaturan Website & Visual</h2>
                    <p className="text-sm text-slate-500 dark:text-zinc-400 mt-1 font-medium">Kelola foto profil utama Hero, dokumen CV PDF, widget WhatsApp melayang, dan footer.</p>
                </div>
            </div>

            {/* 1. Foto Profil Utama & File CV */}
            <Card className="bg-white dark:bg-[#070e20]/90 border-slate-200 dark:border-cyan-500/20 rounded-3xl overflow-hidden shadow-sm">
                <CardHeader className="border-b border-slate-100 dark:border-zinc-800/60 bg-slate-50/50 dark:bg-zinc-900/50 px-6 py-4">
                    <CardTitle className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <User className="w-5 h-5 text-cyan-400" />
                        Foto Profil Utama & File Dokumen CV
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                    <ProfilePhotoSettingsForm settings={settings} />
                </CardContent>
            </Card>

            {/* 2. Admin WhatsApp Widget */}
            <Card className="bg-white dark:bg-[#070e20]/90 border-slate-200 dark:border-cyan-500/20 rounded-3xl overflow-hidden shadow-sm">
                <CardHeader className="border-b border-slate-100 dark:border-zinc-800/60 bg-slate-50/50 dark:bg-zinc-900/50 px-6 py-4">
                    <CardTitle className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <MessageCircle className="w-5 h-5 text-cyan-400" />
                        Admin WhatsApp (Floating Button Widget)
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                    <WhatsAppAdminCMS initialAdmins={whatsappAdmins} />
                </CardContent>
            </Card>

            {/* 3. Pengaturan Footer & Media Sosial */}
            <Card className="bg-white dark:bg-[#070e20]/90 border-slate-200 dark:border-cyan-500/20 rounded-3xl overflow-hidden shadow-sm">
                <CardHeader className="border-b border-slate-100 dark:border-zinc-800/60 bg-slate-50/50 dark:bg-zinc-900/50 px-6 py-4">
                    <CardTitle className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <Share2 className="w-5 h-5 text-cyan-400" />
                        Pengaturan Footer & Media Sosial
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                    <FooterSettingsForm settings={settings} />
                </CardContent>
            </Card>

            <Card className="bg-white dark:bg-zinc-900 border-primary/20 dark:border-primary/20 rounded-2xl overflow-hidden shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                    <FileText className="w-48 h-48 text-primary" />
                </div>
                <CardHeader className="border-b border-primary/10 bg-primary/5 px-6 py-4">
                    <CardTitle className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <FileText className="w-5 h-5 text-primary" />
                        Laporan Kerja Praktek
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-6 relative z-10">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">Unduh Naskah Laporan (PDF / Word)</h3>
                            <p className="text-sm text-slate-500 dark:text-zinc-400 max-w-xl leading-relaxed">
                                Laporan Kerja Praktek (KP) ini telah diproses sedemikian rupa agar siap cetak dan siap kumpul. Semua diagram (Struktur Organisasi, Use Case, Activity, Sequence) telah di-*render* secara otomatis sebagai gambar di dalamnya.
                            </p>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                            <a 
                                href="/Laporan_Kerja_Praktek.pdf" 
                                download="Laporan_Kerja_Praktek_PT_RRK.pdf"
                                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold transition-all shadow-md shadow-red-500/20 hover:shadow-lg hover:shadow-red-500/30 hover:-translate-y-0.5 active:translate-y-0"
                            >
                                <Download className="w-4 h-4" />
                                Download PDF
                            </a>
                            <a 
                                href="/Laporan_Kerja_Praktek.docx" 
                                download="Laporan_Kerja_Praktek_PT_RRK.docx"
                                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all shadow-md shadow-blue-600/20 hover:shadow-lg hover:shadow-blue-600/30 hover:-translate-y-0.5 active:translate-y-0"
                            >
                                <FileText className="w-4 h-4" />
                                Download Word (.docx)
                            </a>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
