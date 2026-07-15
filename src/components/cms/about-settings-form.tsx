"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { updateSettings } from "@/actions/settings";
import { toast } from "sonner";
import { Loader2, Save, Plus, Trash2, AlertTriangle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

export function AboutSettingsForm({ settings }: { settings: any }) {
    const [isSaving, setIsSaving] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [formDataToSave, setFormDataToSave] = useState<FormData | null>(null);
    const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
    // Fallbacks
    const defaultAboutText = "PT Rizky Rijaya Karya adalah perusahaan dibawah hukum negara kesatuan republik Indonesia yang didirikan secara resmi pada 05 september 2023 yang bergerak di bidang Perdagangan, Industri dan Jasa.";
    const defaultVisionText = "Menjadi Perusahaan berskala Nasional yang mampu melayani Kebutuhan Publik secara professional yang bertumpu pada Nilai Integritas, Kepuasan pelanggan, dan Sumber Daya Manusia.";
    const defaultMissionText = "Menyediakan Barang dan Jasa dengan Harga kompetitif sesuai standar yang ditetapkan\nMemberikan Pelayanan Prima dan Solusi yang bernilai tambah kepada seluruh Konsumen.\nMenciptakan kondisi terbaik sebagai tempat kebanggaan untuk berkarya dan berprestasi.";
    const defaultCoreValues = [
        { title: "Integritas", description: "Bertindak jujur dan dapat dipercaya dalam setiap kesepakatan bisnis." },
        { title: "Kompeten", description: "Bekerja dengan ahli dan profesional di bidangnya." },
        { title: "Inovatif", description: "Terus berinovasi untuk memberikan solusi terbaik bagi konsumen." },
        { title: "Kolaboratif", description: "Membangun kerja sama yang kuat dengan seluruh pemangku kepentingan." }
    ];

    let initialCoreValues = settings?.coreValues;
    if (!initialCoreValues || (Array.isArray(initialCoreValues) && initialCoreValues.length === 0)) {
        initialCoreValues = defaultCoreValues;
    } else if (typeof initialCoreValues === 'string') {
        try {
            initialCoreValues = JSON.parse(initialCoreValues);
        } catch (e) {
            initialCoreValues = defaultCoreValues;
        }
    }

    // Core values state
    const [coreValues, setCoreValues] = useState<{title: string, description: string}[]>(
        initialCoreValues as any
    );

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        // Append coreValues as a JSON string
        formData.set("coreValues", JSON.stringify(coreValues));
        setFormDataToSave(formData);
        setIsConfirmOpen(true);
    };

    async function handleConfirmSave() {
        if (!formDataToSave) return;
        
        setIsSaving(true);
        try {
            await updateSettings(formDataToSave);
            toast.success("Profil Perusahaan berhasil disimpan");
            setIsConfirmOpen(false);
        } catch (error) {
            console.error(error);
            toast.error("Gagal menyimpan profil perusahaan");
        } finally {
            setIsSaving(false);
        }
    }

    const addCoreValue = () => {
        setCoreValues([...coreValues, { title: "", description: "" }]);
    };

    const updateCoreValue = (index: number, field: "title" | "titleEn" | "description" | "descriptionEn", value: string) => {
        const updated = [...coreValues];
        (updated[index] as any)[field] = value;
        setCoreValues(updated);
    };

    const removeCoreValue = (index: number) => {
        setDeleteIndex(index);
    };

    const confirmDeleteCoreValue = () => {
        if (deleteIndex !== null) {
            setCoreValues(coreValues.filter((_, i) => i !== deleteIndex));
            setDeleteIndex(null);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="aboutText" className="text-base font-bold text-slate-800 dark:text-white">Tentang Perusahaan</Label>
                        <p className="text-xs text-slate-500 dark:text-zinc-400">Deskripsi utama mengenai perusahaan yang muncul di halaman pertama section Profil.</p>
                        <Textarea 
                            id="aboutText" 
                            name="aboutText" 
                            defaultValue={settings?.aboutText || defaultAboutText} 
                            placeholder="Contoh: PT Rizky Rijaya Karya adalah..."
                            className="min-h-[150px] resize-y"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="visionText" className="text-base font-bold text-slate-800 dark:text-white">Visi Kami</Label>
                            <p className="text-xs text-slate-500 dark:text-zinc-400">Tujuan jangka panjang perusahaan.</p>
                            <Textarea 
                                id="visionText" 
                                name="visionText" 
                                defaultValue={settings?.visionText || defaultVisionText} 
                                placeholder="Contoh: Menjadi perusahaan terkemuka di bidang..."
                                className="min-h-[150px] resize-y"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="missionText" className="text-base font-bold text-slate-800 dark:text-white">Misi Kami</Label>
                            <p className="text-xs text-slate-500 dark:text-zinc-400">Pisahkan setiap poin misi dengan Enter (baris baru).</p>
                            <Textarea 
                                id="missionText" 
                                name="missionText" 
                                defaultValue={settings?.missionText || defaultMissionText} 
                                placeholder="Memberikan pelayanan terbaik...&#10;Inovasi berkelanjutan..."
                                className="min-h-[150px] resize-y"
                            />
                        </div>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-zinc-800">
                        <div className="flex items-center justify-between">
                            <div>
                                <Label className="text-base font-bold text-slate-800 dark:text-white">Nilai-Nilai Perusahaan (Core Values)</Label>
                                <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">Tambahkan nilai utama perusahaan yang dijunjung tinggi.</p>
                            </div>
                            <Button type="button" onClick={addCoreValue} variant="outline" size="sm" className="h-9 gap-1">
                                <Plus className="w-4 h-4" /> Tambah Nilai
                            </Button>
                        </div>

                        <div className="space-y-3">
                            {coreValues.length === 0 ? (
                                <div className="text-center p-8 border border-dashed border-slate-300 dark:border-zinc-800 rounded-xl bg-slate-50 dark:bg-zinc-900/50">
                                    <p className="text-sm text-slate-500 dark:text-zinc-400">Belum ada core values yang ditambahkan.</p>
                                </div>
                            ) : (
                                coreValues.map((cv, index) => (
                                    <div key={index} className="flex flex-col md:flex-row gap-3 p-4 bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl relative group">
                                        <div className="flex-1 space-y-4">
                                            <div className="grid grid-cols-1 gap-4">
                                                <div className="space-y-1">
                                                    <Label className="text-xs text-slate-500">Judul Nilai (🇮🇩 ID)</Label>
                                                    <Input 
                                                        value={cv.title} 
                                                        onChange={(e) => updateCoreValue(index, "title", e.target.value)}
                                                        placeholder="Contoh: Integritas"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-1 gap-4">
                                                <div className="space-y-1">
                                                    <Label className="text-xs text-slate-500">Deskripsi Singkat (🇮🇩 ID)</Label>
                                                    <Textarea 
                                                        value={cv.description} 
                                                        onChange={(e) => updateCoreValue(index, "description", e.target.value)}
                                                        placeholder="Bertindak jujur dan dapat dipercaya..."
                                                        className="min-h-[60px] resize-none"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-start pt-6">
                                            <Button 
                                                type="button" 
                                                variant="ghost" 
                                                size="icon" 
                                                onClick={() => removeCoreValue(index)}
                                                className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                <Button type="submit" disabled={isSaving} className="w-full md:w-auto h-12 px-8 bg-blue-600 hover:bg-blue-700">
                    <Save className="w-4 h-4 mr-2" />
                    Simpan Profil Perusahaan
                </Button>
            </form>

            <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
                <DialogContent className="sm:max-w-sm bg-white/90 dark:bg-slate-900/90 border-slate-200/50 dark:border-slate-800/50 rounded-[2rem] p-8 flex flex-col items-center text-center !backdrop-blur-xl shadow-2xl">
                    <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-500/10 flex items-center justify-center mb-6 text-blue-600 dark:text-blue-500 shadow-sm">
                        <Save className="w-8 h-8" />
                    </div>
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold text-slate-800 dark:text-white mb-2">Simpan Profil?</DialogTitle>
                    </DialogHeader>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">
                        Apakah Anda yakin ingin menyimpan perubahan profil perusahaan ini?
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

            {/* Delete Core Value Confirmation Modal */}
            <Dialog open={deleteIndex !== null} onOpenChange={(open) => !open && setDeleteIndex(null)}>
                <DialogContent className="sm:max-w-sm bg-white dark:bg-slate-900 border-slate-200 dark:border-zinc-800 rounded-[3rem] p-10 flex flex-col items-center text-center">
                    <div className="w-24 h-24 rounded-[2rem] bg-red-100 dark:bg-red-500/10 flex items-center justify-center mb-8 text-red-500 border-2 border-red-500/20 shadow-xl shadow-red-500/5">
                        <AlertTriangle className="w-12 h-12" />
                    </div>
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-black text-slate-900 dark:text-white mb-3">Hapus Core Value?</DialogTitle>
                    </DialogHeader>
                    <p className="text-sm text-slate-500 dark:text-zinc-400 mb-10 leading-relaxed font-medium">
                        Apakah Anda yakin ingin menghapus nilai <strong className="text-slate-700 dark:text-white">&ldquo;{deleteIndex !== null ? coreValues[deleteIndex]?.title || 'ini' : ''}&rdquo;</strong>? Perubahan akan tersimpan saat Anda klik Simpan.
                    </p>
                    <div className="flex w-full gap-4">
                        <Button 
                            variant="outline" 
                            className="flex-1 h-14 rounded-2xl border-slate-200 dark:border-zinc-800 font-bold hover:bg-slate-50 dark:hover:bg-zinc-800 transition-all"
                            onClick={() => setDeleteIndex(null)}
                        >
                            Batal
                        </Button>
                        <Button 
                            variant="destructive" 
                            className="flex-1 h-14 rounded-2xl bg-red-500 hover:bg-red-600 text-white font-black uppercase tracking-widest shadow-xl shadow-red-500/20 hover:shadow-red-500/40 hover:-translate-y-1 transition-all"
                            onClick={confirmDeleteCoreValue}
                        >
                            Hapus
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
