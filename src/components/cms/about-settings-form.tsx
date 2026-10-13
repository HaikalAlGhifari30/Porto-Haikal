"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { updateSettings } from "@/actions/settings";
import { toast } from "sonner";
import { Loader2, Save, Sparkles, UserCheck, Link2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

export function AboutSettingsForm({ settings }: { settings: any }) {
    const [isSaving, setIsSaving] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [formDataToSave, setFormDataToSave] = useState<FormData | null>(null);

    const defaultHeroTitle = "Halo, Saya Haikal Al Ghifari";
    const defaultHeroTitleEn = "Hi, I'm Haikal Al Ghifari";
    const defaultHeroSubtitle = "— Quality Assurance Engineer —";
    const defaultHeroSubtitleEn = "— Quality Assurance Engineer —";
    const defaultAboutText = "Lulusan S1 Teknik Informatika UNIKOM (IPK 3.46) yang berdedikasi tinggi sebagai Quality Assurance Engineer, dan saat ini sedang aktif bekerja di COMO 1907 (Global Media Visual). Berpengalaman dalam pengujian manual (manual testing) web & mobile, verifikasi alur pengguna end-to-end, regresi, serta pemodelan sistem. Memiliki pengalaman kepemimpinan sebagai mantan Ketua HMIF UNIKOM yang analitis, teliti, dan adaptif.";
    const defaultAboutTextEn = "Informatics Engineering graduate from UNIKOM (GPA 3.46) dedicated as a Quality Assurance Engineer, currently actively working at COMO 1907 (Global Media Visual). Highly experienced in web & mobile manual testing, end-to-end user flow verification, regression, and system modeling. Former Chairman of HMIF UNIKOM with strong leadership, analytical precision, and adaptability.";

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        setFormDataToSave(formData);
        setIsConfirmOpen(true);
    };

    async function handleConfirmSave() {
        if (!formDataToSave) return;
        
        setIsSaving(true);
        try {
            await updateSettings(formDataToSave);
            toast.success("Pengaturan Hero & Biodata berhasil disimpan!");
            setIsConfirmOpen(false);
        } catch (error) {
            console.error(error);
            toast.error("Gagal menyimpan pengaturan biodata");
        } finally {
            setIsSaving(false);
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-8">
                {/* 1. Hero Section Headers */}
                <div className="space-y-6">
                    <div className="flex items-center gap-2 pb-2 border-b-2 border-black dark:border-white">
                        <Sparkles className="w-5 h-5 text-amber-500 dark:text-[#FACC15]" />
                        <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight">Pengaturan Teks Hero Utama</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="heroTitle" className="text-xs font-black text-slate-700 dark:text-zinc-300 uppercase tracking-wider">Judul Utama Hero</Label>
                            <Input 
                                id="heroTitle" 
                                name="heroTitle" 
                                defaultValue={settings?.heroTitle || defaultHeroTitle} 
                                placeholder="Halo, Saya Haikal Al Ghifari"
                                className="h-11 rounded-none bg-white dark:bg-[#0E1217] border-2 border-black dark:border-white text-slate-900 dark:text-white font-medium"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="heroSubtitle" className="text-xs font-black text-slate-700 dark:text-zinc-300 uppercase tracking-wider">Subtitle Profesi</Label>
                            <Input 
                                id="heroSubtitle" 
                                name="heroSubtitle" 
                                defaultValue={settings?.heroSubtitle || defaultHeroSubtitle} 
                                placeholder="— Quality Assurance Engineer —"
                                className="h-11 rounded-none bg-white dark:bg-[#0E1217] border-2 border-black dark:border-white text-slate-900 dark:text-white font-medium"
                            />
                        </div>
                    </div>
                </div>

                {/* 2. Professional Bio (About Me) */}
                <div className="space-y-6 pt-4 border-t-2 border-black dark:border-white">
                    <div className="flex items-center gap-2 pb-2 border-b-2 border-black dark:border-white">
                        <UserCheck className="w-5 h-5 text-amber-500 dark:text-[#FACC15]" />
                        <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight">Deskripsi Biodata (About Me)</h3>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="aboutText" className="text-xs font-black text-slate-700 dark:text-zinc-300 uppercase tracking-wider">Deskripsi Biodata (About Me)</Label>
                        <p className="text-xs text-slate-500 dark:text-zinc-400 font-medium">Teks ringkasan tentang profil profesional QA Anda di Landing Page.</p>
                        <Textarea 
                            id="aboutText" 
                            name="aboutText" 
                            defaultValue={settings?.aboutText || defaultAboutText} 
                            placeholder="Lulusan S1 Teknik Informatika UNIKOM..."
                            className="min-h-[140px] rounded-none bg-white dark:bg-[#0E1217] border-2 border-black dark:border-white text-slate-900 dark:text-white font-medium leading-relaxed"
                        />
                    </div>
                </div>

                {/* 3. Contact & Social Media Links */}
                <div className="space-y-6 pt-4 border-t-2 border-black dark:border-white">
                    <div className="flex items-center gap-2 pb-2 border-b-2 border-black dark:border-white">
                        <Link2 className="w-5 h-5 text-amber-500 dark:text-[#FACC15]" />
                        <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight">Kontak & Tautan Sosial Media</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-xs font-black text-slate-700 dark:text-zinc-300 uppercase tracking-wider">Alamat Email Kontak</Label>
                            <Input 
                                id="email" 
                                name="email" 
                                defaultValue={settings?.email || "alghifaribahren03@gmail.com"} 
                                placeholder="alghifaribahren03@gmail.com"
                                className="h-11 rounded-none bg-white dark:bg-[#0E1217] border-2 border-black dark:border-white text-slate-900 dark:text-white font-medium"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phone" className="text-xs font-black text-slate-700 dark:text-zinc-300 uppercase tracking-wider">Nomor Telepon / WhatsApp</Label>
                            <Input 
                                id="phone" 
                                name="phone" 
                                defaultValue={settings?.phone || "+62 813 880 583 31"} 
                                placeholder="+62 813 880 583 31"
                                className="h-11 rounded-none bg-white dark:bg-[#0E1217] border-2 border-black dark:border-white text-slate-900 dark:text-white font-medium"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="linkedin" className="text-xs font-black text-slate-700 dark:text-zinc-300 uppercase tracking-wider">Tautan LinkedIn</Label>
                            <Input 
                                id="linkedin" 
                                name="linkedin" 
                                defaultValue={settings?.linkedin || "https://www.linkedin.com/in/haikalalghifari"} 
                                placeholder="https://www.linkedin.com/in/haikalalghifari"
                                className="h-11 rounded-none bg-white dark:bg-[#0E1217] border-2 border-black dark:border-white text-slate-900 dark:text-white font-medium"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="instagram" className="text-xs font-black text-slate-700 dark:text-zinc-300 uppercase tracking-wider">Tautan Instagram</Label>
                            <Input 
                                id="instagram" 
                                name="instagram" 
                                defaultValue={settings?.instagram || "https://instagram.com/HaikalAlGhifari30"} 
                                placeholder="https://instagram.com/HaikalAlGhifari30"
                                className="h-11 rounded-none bg-white dark:bg-[#0E1217] border-2 border-black dark:border-white text-slate-900 dark:text-white font-medium"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end pt-4">
                    <Button 
                        type="submit" 
                        className="h-12 px-8 rounded-none bg-[#FACC15] hover:bg-yellow-300 text-black font-black tracking-wide border-2 border-black dark:border-white shadow-retro-sm btn-retro transition-all active:scale-95 cursor-pointer"
                    >
                        <Save className="w-5 h-5 mr-2" /> Simpan Pengaturan Biodata
                    </Button>
                </div>
            </form>

            {/* Confirmation Dialog */}
            <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
                <DialogContent className="sm:max-w-[420px] bg-white dark:bg-[#151B22] border-2 border-black dark:border-white rounded-2xl p-6 shadow-retro-md">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-black text-slate-900 dark:text-white uppercase">Konfirmasi Simpan Pengaturan</DialogTitle>
                    </DialogHeader>
                    <p className="text-sm text-slate-600 dark:text-zinc-300 py-2">
                        Apakah Anda yakin ingin menyimpan perubahan teks Hero, Biodata, dan Kontak ini ke website utama?
                    </p>
                    <DialogFooter className="flex gap-3 pt-4">
                        <Button 
                            variant="outline" 
                            onClick={() => setIsConfirmOpen(false)} 
                            disabled={isSaving}
                            className="rounded-none border-2 border-black dark:border-white text-black dark:text-white font-bold btn-retro"
                        >
                            Batal
                        </Button>
                        <Button 
                            onClick={handleConfirmSave} 
                            disabled={isSaving}
                            className="rounded-none bg-[#FACC15] hover:bg-yellow-300 text-black font-black border-2 border-black dark:border-white shadow-retro-xs btn-retro"
                        >
                            {isSaving ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Menyimpan...
                                </>
                            ) : (
                                "Ya, Simpan Perubahan"
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
