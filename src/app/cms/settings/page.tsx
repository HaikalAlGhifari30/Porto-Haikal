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
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                <div>
                    <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-white uppercase">Pengaturan Website & Visual</h2>
                    <p className="text-sm text-slate-500 dark:text-zinc-400 mt-1 font-medium">Kelola foto profil utama Hero, dokumen CV PDF, widget WhatsApp melayang, dan footer.</p>
                </div>
            </div>

            {/* 1. Foto Profil Utama & File CV */}
            <Card className="bg-white dark:bg-[#151B22] border-2 border-black dark:border-white rounded-2xl overflow-hidden shadow-retro-sm">
                <CardHeader className="border-b-2 border-black/10 dark:border-white/10 bg-[#FAF6ED] dark:bg-[#0E1217] px-6 py-4">
                    <CardTitle className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <User className="w-5 h-5 text-amber-500 dark:text-[#FACC15]" />
                        Foto Profil Utama & File Dokumen CV
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                    <ProfilePhotoSettingsForm settings={settings} />
                </CardContent>
            </Card>

            {/* 2. Admin WhatsApp Widget */}
            <Card className="bg-white dark:bg-[#151B22] border-2 border-black dark:border-white rounded-2xl overflow-hidden shadow-retro-sm">
                <CardHeader className="border-b-2 border-black/10 dark:border-white/10 bg-[#FAF6ED] dark:bg-[#0E1217] px-6 py-4">
                    <CardTitle className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <MessageCircle className="w-5 h-5 text-amber-500 dark:text-[#FACC15]" />
                        Admin WhatsApp (Floating Button Widget)
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                    <WhatsAppAdminCMS initialAdmins={whatsappAdmins} />
                </CardContent>
            </Card>

            {/* 3. Pengaturan Footer & Media Sosial */}
            <Card className="bg-white dark:bg-[#151B22] border-2 border-black dark:border-white rounded-2xl overflow-hidden shadow-retro-sm">
                <CardHeader className="border-b-2 border-black/10 dark:border-white/10 bg-[#FAF6ED] dark:bg-[#0E1217] px-6 py-4">
                    <CardTitle className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <Share2 className="w-5 h-5 text-amber-500 dark:text-[#FACC15]" />
                        Pengaturan Footer & Media Sosial
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                    <FooterSettingsForm settings={settings} />
                </CardContent>
            </Card>
        </div>
    );
}
