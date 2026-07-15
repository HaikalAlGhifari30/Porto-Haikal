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
                    <div className="flex-1 flex items-center gap-4 p-5 rounded-[1.5rem] bg-blue-500/[0.03] dark:bg-blue-500/[0.02] border border-blue-500/10 animate-in fade-in slide-in-from-top-1 duration-500">
                        <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 shrink-0">
                            <Lightbulb className="w-5 h-5" />
                        </div>
                        <p className="text-[11px] md:text-xs text-slate-600 dark:text-zinc-400 leading-relaxed font-medium">
                            <span className="font-bold text-blue-600 dark:text-blue-400 mr-1 uppercase tracking-widest">Panduan:</span>
                            Pastikan tautan media sosial (Instagram, LinkedIn) diisi dengan alamat lengkap yang diawali <code className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-[10px] mx-0.5">https://</code> agar pengunjung dapat diarahkan ke halaman yang benar.
                        </p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="footerAbout">Tentang Perusahaan di Footer</Label>
                        <Textarea 
                            id="footerAbout" 
                            name="footerAbout" 
                            defaultValue={settings?.footerAbout || ""} 
                            placeholder="Contoh: PT Rizky Rijaya Karya adalah..."
                            className="min-h-[100px]"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="address">Alamat Kantor</Label>
                            <Input 
                                id="address" 
                                name="address" 
                                defaultValue={settings?.address || ""} 
                                placeholder="Contoh: Adiwikarta No. 7, Bandung"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">Nomor Telepon / WhatsApp</Label>
                            <Input 
                                id="phone" 
                                name="phone" 
                                defaultValue={settings?.phone || ""} 
                                placeholder="Contoh: +6281229999909"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email Resmi</Label>
                            <Input 
                                id="email" 
                                name="email" 
                                defaultValue={settings?.email || ""} 
                                placeholder="Contoh: rizkyrijayakarya@gmail.com"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="instagram">Link Instagram (Opsional)</Label>
                            <Input 
                                id="instagram" 
                                name="instagram" 
                                defaultValue={settings?.instagram || ""} 
                                placeholder="Contoh: https://instagram.com/..."
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="linkedin">Link LinkedIn (Opsional)</Label>
                            <Input 
                                id="linkedin" 
                                name="linkedin" 
                                defaultValue={settings?.linkedin || ""} 
                                placeholder="Contoh: https://linkedin.com/in/..."
                            />
                        </div>
                    </div>

                    {/* Legal Pages */}
                    <div className="pt-2 border-t border-slate-100 dark:border-zinc-800 space-y-6">
                        <p className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-zinc-500 pb-1">Halaman Legalitas</p>

                        {/* Syarat & Ketentuan */}
                        <div className="space-y-2">
                            <Label htmlFor="termsText" className="text-sm font-bold text-slate-700 dark:text-zinc-300">Syarat &amp; Ketentuan</Label>
                            <Textarea
                                id="termsText"
                                name="termsText"
                                defaultValue={(settings as any)?.termsText || ""}
                                placeholder="Tulis isi Syarat & Ketentuan..."
                                className="min-h-[200px] text-sm"
                            />
                        </div>

                        {/* Kebijakan Privasi */}
                        <div className="space-y-2">
                            <Label htmlFor="privacyText" className="text-sm font-bold text-slate-700 dark:text-zinc-300">Kebijakan Privasi</Label>
                            <Textarea
                                id="privacyText"
                                name="privacyText"
                                defaultValue={(settings as any)?.privacyText || ""}
                                placeholder="Tulis isi Kebijakan Privasi..."
                                className="min-h-[200px] text-sm"
                            />
                        </div>
                    </div>
                </div>

                <Button type="submit" disabled={isSaving} className="w-full md:w-auto">
                    <Save className="w-4 h-4 mr-2" />
                    Simpan Pengaturan
                </Button>
            </form>

            <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
                <DialogContent className="sm:max-w-sm bg-white/90 dark:bg-slate-900/90 border-slate-200/50 dark:border-slate-800/50 rounded-[2rem] p-8 flex flex-col items-center text-center !backdrop-blur-xl shadow-2xl">
                    <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-500/10 flex items-center justify-center mb-6 text-blue-600 dark:text-blue-500 shadow-sm">
                        <Save className="w-8 h-8" />
                    </div>
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold text-slate-800 dark:text-white mb-2">Simpan Perubahan?</DialogTitle>
                    </DialogHeader>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">
                        Apakah Anda yakin ingin menyimpan perubahan pengaturan footer ini?
                    </p>
                    <div className="flex w-full gap-3">
                        <Button 
                            type="button" 
                            variant="outline" 
                            onClick={() => setIsConfirmOpen(false)}
                            disabled={isSaving}
                            className="flex-1 h-12 rounded-xl border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                        >
                            Batal
                        </Button>
                        <Button 
                            type="button" 
                            onClick={handleConfirmSave} 
                            disabled={isSaving}
                            className="flex-1 h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white border-none shadow-md shadow-blue-500/20"
                        >
                            {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : "Ya, Simpan"}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
