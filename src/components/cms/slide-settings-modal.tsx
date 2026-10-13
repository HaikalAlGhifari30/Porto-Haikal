"use client";

import { useState } from "react";
import { 
    Dialog, 
    DialogContent, 
    DialogHeader, 
    DialogTitle, 
    DialogTrigger,
    DialogFooter 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Info, LayoutGrid, Type, Link as LinkIcon, Palette, Save, Loader2 } from "lucide-react";

interface Slide {
    id: string;
    title: string | null;
    titleEn?: string | null;
    subtitle: string | null;
    subtitleEn?: string | null;
    buttonText: string | null;
    buttonTextEn?: string | null;
    buttonLink: string | null;
    overlayDarkness: number;
    isActive: boolean;
}

interface SlideSettingsModalProps {
    slide: Slide;
    onSave: (data: any) => void;
    children: React.ReactElement;
    isSaving?: boolean;
}

export function SlideSettingsModal({ slide, onSave, children, isSaving = false }: SlideSettingsModalProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: slide.title || "",
        titleEn: slide.titleEn || "",
        subtitle: slide.subtitle || "",
        subtitleEn: slide.subtitleEn || "",
        buttonText: slide.buttonText || "",
        buttonTextEn: slide.buttonTextEn || "",
        buttonLink: slide.buttonLink || "",
        overlayDarkness: slide.overlayDarkness,
        isActive: slide.isActive
    });

    const handleSave = () => {
        if (isSaving) return;
        onSave(formData);
        setIsOpen(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger render={children} />
            <DialogContent className="w-[95vw] sm:max-w-[600px] bg-[#FAF6ED] dark:bg-[#151B22] border-2 border-black dark:border-white p-0 rounded-none shadow-retro-md overflow-hidden flex flex-col max-h-[90vh]">
                {/* Fixed Header */}
                <DialogHeader className="p-6 pb-4 border-b-2 border-black dark:border-white bg-[#FACC15]/20 shrink-0">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-none bg-[#FACC15] text-black flex items-center justify-center border-2 border-black dark:border-white shadow-retro-xs shrink-0">
                            <LayoutGrid className="w-6 h-6" />
                        </div>
                        <div>
                            <DialogTitle className="text-xl font-black uppercase tracking-tight text-slate-900 dark:text-white">Pengaturan Slide</DialogTitle>
                            <p className="text-xs text-slate-600 dark:text-zinc-300 font-bold">Konfigurasi visual dan konten hero banner.</p>
                        </div>
                    </div>
                </DialogHeader>

                {/* Scrollable Body */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                    {/* Basic Info */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Type className="w-4 h-4 text-amber-500" />
                            <h4 className="text-xs font-black uppercase tracking-widest text-slate-800 dark:text-zinc-200">Konten Teks</h4>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            <div className="space-y-2">
                                <Label className="text-xs uppercase font-black tracking-widest text-slate-700 dark:text-zinc-300">Judul Utama</Label>
                                <Input 
                                    value={formData.title} 
                                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                                    placeholder="Judul banner"
                                    className="bg-white dark:bg-[#0E1217] border-2 border-black dark:border-white h-11 rounded-none text-sm font-bold"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs uppercase font-black tracking-widest text-slate-700 dark:text-zinc-300">Sub-judul</Label>
                                <Input 
                                    value={formData.subtitle} 
                                    onChange={(e) => setFormData({...formData, subtitle: e.target.value})}
                                    placeholder="Deskripsi singkat"
                                    className="bg-white dark:bg-[#0E1217] border-2 border-black dark:border-white h-11 rounded-none text-sm font-bold"
                                />
                            </div>
                        </div>
                    </div>

                    {/* CTA Settings */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <LinkIcon className="w-4 h-4 text-emerald-500" />
                            <h4 className="text-xs font-black uppercase tracking-widest text-slate-800 dark:text-zinc-200">Tombol Navigasi (CTA)</h4>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className="text-xs uppercase font-black tracking-widest text-slate-700 dark:text-zinc-300">Teks Tombol</Label>
                                <Input 
                                    value={formData.buttonText} 
                                    onChange={(e) => setFormData({...formData, buttonText: e.target.value})}
                                    placeholder="Teks tombol"
                                    className="bg-white dark:bg-[#0E1217] border-2 border-black dark:border-white h-11 rounded-none text-sm font-bold"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs uppercase font-black tracking-widest text-slate-700 dark:text-zinc-300">Tautan Link</Label>
                                <Input 
                                    value={formData.buttonLink} 
                                    onChange={(e) => setFormData({...formData, buttonLink: e.target.value})}
                                    placeholder="Contoh: #projects"
                                    className="bg-white dark:bg-[#0E1217] border-2 border-black dark:border-white h-11 rounded-none text-sm font-bold"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Visual Settings */}
                    <div className="space-y-4 pb-2">
                        <div className="flex items-center gap-2">
                            <Palette className="w-4 h-4 text-amber-500" />
                            <h4 className="text-xs font-black uppercase tracking-widest text-slate-800 dark:text-zinc-200">Efek Visual</h4>
                        </div>
                        <div className="p-5 rounded-none bg-white dark:bg-[#0E1217] border-2 border-black dark:border-white space-y-6 shadow-retro-xs">
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <Label className="text-xs uppercase font-black tracking-widest text-slate-700 dark:text-zinc-300">Overlay Darkness</Label>
                                    <span className="text-xs font-black text-black bg-[#FACC15] border-2 border-black px-2 py-0.5 rounded-none shadow-retro-xs">{formData.overlayDarkness}%</span>
                                </div>
                                <Slider 
                                    value={[formData.overlayDarkness]} 
                                    onValueChange={(val) => setFormData({...formData, overlayDarkness: val[0]})}
                                    max={100} 
                                    step={1}
                                />
                            </div>

                            <div className="h-0.5 bg-black dark:bg-white" />

                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <Label className="text-xs font-black uppercase">Status Slide</Label>
                                    <p className="text-[10px] text-slate-500 font-bold">Aktifkan untuk menampilkan slide.</p>
                                </div>
                                <Switch 
                                    checked={formData.isActive}
                                    onCheckedChange={(val) => setFormData({...formData, isActive: val})}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Fixed Footer */}
                <DialogFooter className="p-5 border-t-2 border-black dark:border-white bg-[#FAF6ED] dark:bg-[#151B22] shrink-0 sm:justify-end flex-row gap-3">
                    <Button 
                        variant="ghost" 
                        onClick={() => setIsOpen(false)} 
                        className="rounded-none border-2 border-black dark:border-white h-11 font-black uppercase px-6 hover:bg-slate-200 dark:hover:bg-zinc-800"
                    >
                        Batal
                    </Button>
                    <Button 
                        onClick={handleSave} 
                        disabled={isSaving}
                        className="rounded-none h-11 font-black uppercase px-8 bg-[#FACC15] hover:bg-yellow-300 text-black border-2 border-black dark:border-white shadow-retro-xs"
                    >
                        {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                        {isSaving ? "Menyimpan..." : "Simpan"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
