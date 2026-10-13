"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { updateSettings } from "@/actions/settings";
import { toast } from "sonner";
import { Loader2, Save, Lightbulb } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

export function FooterSettingsForm({ settings }: { settings: any }) {
    const [isSaving, setIsSaving] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [formDataToSave, setFormDataToSave] = useState<FormData | null>(null);

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
            toast.success("Pengaturan footer berhasil disimpan");
            setIsConfirmOpen(false);
        } catch (error) {
            console.error(error);
            toast.error("Gagal menyimpan pengaturan footer");
        } finally {
            setIsSaving(false);
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex flex-col lg:flex-row lg:items-center gap-6 mb-6">
                    <div className="flex-1 flex items-center gap-4 p-5 rounded-none bg-[#FACC15]/10 border-2 border-black dark:border-white shadow-retro-xs animate-in fade-in slide-in-from-top-1 duration-500">
                        <div className="p-2.5 rounded-none bg-[#FACC15] text-black border-2 border-black dark:border-white shrink-0">
                            <Lightbulb className="w-5 h-5" />
                        </div>
                        <p className="text-[11px] md:text-xs text-slate-800 dark:text-zinc-200 leading-relaxed font-bold">
                            <span className="font-black text-amber-500 dark:text-[#FACC15] mr-1 uppercase tracking-widest">Panduan:</span>
                            Pastikan tautan media sosial (Instagram, LinkedIn) diisi dengan alamat lengkap yang diawali <code className="bg-black/10 dark:bg-white/10 px-1.5 py-0.5 border border-black dark:border-white text-[10px] mx-0.5">https://</code> agar pengunjung dapat diarahkan ke halaman yang benar.
                        </p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="footerAbout" className="text-xs font-black uppercase text-slate-900 dark:text-slate-100">Tentang Profil di Footer</Label>
                        <Textarea 
                            id="footerAbout" 
                            name="footerAbout" 
                            defaultValue={settings?.footerAbout || ""} 
                            placeholder="Contoh: Haikal Al Ghifari adalah Quality Assurance Specialist..."
                            className="min-h-[100px] bg-white dark:bg-[#0E1217] border-2 border-black dark:border-white rounded-none font-medium focus-visible:ring-0 focus-visible:border-[#FACC15]"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="address" className="text-xs font-black uppercase text-slate-900 dark:text-slate-100">Lokasi / Alamat</Label>
                            <Input 
                                id="address" 
                                name="address" 
                                defaultValue={settings?.address || ""} 
                                placeholder="Contoh: Bandung, Indonesia"
                                className="bg-white dark:bg-[#0E1217] border-2 border-black dark:border-white rounded-none font-medium focus-visible:ring-0 focus-visible:border-[#FACC15]"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone" className="text-xs font-black uppercase text-slate-900 dark:text-slate-100">Nomor Telepon / WhatsApp</Label>
                            <Input 
                                id="phone" 
                                name="phone" 
                                defaultValue={settings?.phone || ""} 
                                placeholder="Contoh: +6281229999909"
                                className="bg-white dark:bg-[#0E1217] border-2 border-black dark:border-white rounded-none font-medium focus-visible:ring-0 focus-visible:border-[#FACC15]"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-xs font-black uppercase text-slate-900 dark:text-slate-100">Email Resmi</Label>
                            <Input 
                                id="email" 
                                name="email" 
                                defaultValue={settings?.email || ""} 
                                placeholder="Contoh: alghifaribahren03@gmail.com"
                                className="bg-white dark:bg-[#0E1217] border-2 border-black dark:border-white rounded-none font-medium focus-visible:ring-0 focus-visible:border-[#FACC15]"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="instagram" className="text-xs font-black uppercase text-slate-900 dark:text-slate-100">Link Instagram (Opsional)</Label>
                            <Input 
                                id="instagram" 
                                name="instagram" 
                                defaultValue={settings?.instagram || ""} 
                                placeholder="Contoh: https://instagram.com/..."
                                className="bg-white dark:bg-[#0E1217] border-2 border-black dark:border-white rounded-none font-medium focus-visible:ring-0 focus-visible:border-[#FACC15]"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="linkedin" className="text-xs font-black uppercase text-slate-900 dark:text-slate-100">Link LinkedIn (Opsional)</Label>
                            <Input 
                                id="linkedin" 
                                name="linkedin" 
                                defaultValue={settings?.linkedin || ""} 
                                placeholder="Contoh: https://linkedin.com/in/..."
                                className="bg-white dark:bg-[#0E1217] border-2 border-black dark:border-white rounded-none font-medium focus-visible:ring-0 focus-visible:border-[#FACC15]"
                            />
                        </div>
                    </div>

                    {/* Legal Pages */}
                    <div className="pt-2 border-t-2 border-black dark:border-white space-y-6">
                        <p className="text-xs font-black uppercase tracking-widest text-amber-500 dark:text-[#FACC15] pb-1">Halaman Legalitas</p>

                        {/* Syarat & Ketentuan */}
                        <div className="space-y-2">
                            <Label htmlFor="termsText" className="text-xs font-black uppercase text-slate-900 dark:text-slate-100">Syarat &amp; Ketentuan</Label>
                            <Textarea
                                id="termsText"
                                name="termsText"
                                defaultValue={(settings as any)?.termsText || ""}
                                placeholder="Tulis isi Syarat & Ketentuan..."
                                className="min-h-[200px] bg-white dark:bg-[#0E1217] border-2 border-black dark:border-white rounded-none font-medium text-sm focus-visible:ring-0 focus-visible:border-[#FACC15]"
                            />
                        </div>

                        {/* Kebijakan Privasi */}
                        <div className="space-y-2">
                            <Label htmlFor="privacyText" className="text-xs font-black uppercase text-slate-900 dark:text-slate-100">Kebijakan Privasi</Label>
                            <Textarea
                                id="privacyText"
                                name="privacyText"
                                defaultValue={(settings as any)?.privacyText || ""}
                                placeholder="Tulis isi Kebijakan Privasi..."
                                className="min-h-[200px] bg-white dark:bg-[#0E1217] border-2 border-black dark:border-white rounded-none font-medium text-sm focus-visible:ring-0 focus-visible:border-[#FACC15]"
                            />
                        </div>
                    </div>
                </div>

                <Button type="submit" disabled={isSaving} className="w-full md:w-auto h-11 px-6 bg-[#FACC15] hover:bg-yellow-300 text-black border-2 border-black dark:border-white rounded-none font-black uppercase shadow-retro-xs">
                    <Save className="w-4 h-4 mr-2" />
                    Simpan Pengaturan
                </Button>
            </form>

            <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
                <DialogContent className="sm:max-w-sm bg-[#FAF6ED] dark:bg-[#151B22] border-2 border-black dark:border-white rounded-none p-8 flex flex-col items-center text-center shadow-retro-md">
                    <div className="w-16 h-16 rounded-none bg-[#FACC15] border-2 border-black dark:border-white flex items-center justify-center mb-6 text-black shadow-retro-xs">
                        <Save className="w-8 h-8" />
                    </div>
                    <DialogHeader>
                        <DialogTitle className="text-xl font-black uppercase text-slate-900 dark:text-white mb-2">Simpan Perubahan?</DialogTitle>
                    </DialogHeader>
                    <p className="text-sm text-slate-600 dark:text-zinc-300 mb-6 font-bold">
                        Apakah Anda yakin ingin menyimpan perubahan pengaturan footer ini?
                    </p>
                    <div className="flex w-full gap-3">
                        <Button 
                            type="button" 
                            variant="outline" 
                            onClick={() => setIsConfirmOpen(false)}
                            disabled={isSaving}
                            className="flex-1 h-11 rounded-none border-2 border-black dark:border-white font-black uppercase hover:bg-slate-200 dark:hover:bg-zinc-800"
                        >
                            Batal
                        </Button>
                        <Button 
                            type="button" 
                            onClick={handleConfirmSave} 
                            disabled={isSaving}
                            className="flex-1 h-11 rounded-none bg-[#FACC15] hover:bg-yellow-300 text-black border-2 border-black dark:border-white font-black uppercase shadow-retro-xs"
                        >
                            {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : "Ya, Simpan"}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
