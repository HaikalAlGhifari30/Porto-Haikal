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
            <DialogContent className="w-[95vw] sm:max-w-[600px] bg-white dark:bg-zinc-950 border-slate-200 dark:border-zinc-800 p-0 rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                {/* Fixed Header */}
                <DialogHeader className="p-6 md:p-8 pb-4 border-b border-slate-100 dark:border-zinc-900 shrink-0">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-blue-600/10 flex items-center justify-center border border-blue-600/20 shrink-0">
                            <LayoutGrid className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
                        </div>
                        <div>
                            <DialogTitle className="text-lg md:text-xl font-bold tracking-tight">Pengaturan Slide</DialogTitle>
                            <p className="text-[11px] md:text-xs text-slate-500 dark:text-zinc-400">Konfigurasi visual dan konten hero banner.</p>
                        </div>
                    </div>
                </DialogHeader>

                {/* Scrollable Body */}
                <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 custom-scrollbar">
                    {/* Basic Info */}
                    <div className="space-y-4 md:space-y-6">
                        <div className="flex items-center gap-3">
                            <Type className="w-4 h-4 text-blue-500" />
                            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Konten Teks</h4>
                        </div>
                        <div className="grid grid-cols-1 gap-4 md:gap-6">
                            <div className="space-y-2">
                                <Label className="text-[9px] uppercase font-black tracking-widest text-slate-400 pl-1">Judul Utama</Label>
                                <Input 
                                    value={formData.title} 
                                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                                    placeholder="Judul banner"
                                    className="bg-slate-50 dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 h-11 rounded-xl text-sm focus:ring-2 focus:ring-blue-600/20"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[9px] uppercase font-black tracking-widest text-slate-400 pl-1">Sub-judul</Label>
                                <Input 
                                    value={formData.subtitle} 
                                    onChange={(e) => setFormData({...formData, subtitle: e.target.value})}
                                    placeholder="Deskripsi singkat"
                                    className="bg-slate-50 dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 h-11 rounded-xl text-sm focus:ring-2 focus:ring-blue-600/20"
                                />
                            </div>
                        </div>
                    </div>

                    {/* CTA Settings */}
                    <div className="space-y-4 md:space-y-6">
                        <div className="flex items-center gap-3">
                            <LinkIcon className="w-4 h-4 text-emerald-500" />
                            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Tombol Navigasi (CTA)</h4>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                            <div className="space-y-2">
                                <Label className="text-[9px] uppercase font-black tracking-widest text-slate-400 pl-1">Teks Tombol</Label>
                                <Input 
                                    value={formData.buttonText} 
                                    onChange={(e) => setFormData({...formData, buttonText: e.target.value})}
                                    placeholder="Teks tombol"
                                    className="bg-slate-50 dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 h-11 rounded-xl text-sm focus:ring-2 focus:ring-emerald-600/20"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[9px] uppercase font-black tracking-widest text-slate-400 pl-1">Tautan Link</Label>
                                <Input 
                                    value={formData.buttonLink} 
                                    onChange={(e) => setFormData({...formData, buttonLink: e.target.value})}
                                    placeholder="Contoh: #projects"
                                    className="bg-slate-50 dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 h-11 rounded-xl text-sm focus:ring-2 focus:ring-emerald-600/20"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Visual Settings */}
                    <div className="space-y-4 md:space-y-6 pb-2">
                        <div className="flex items-center gap-3">
                            <Palette className="w-4 h-4 text-amber-500" />
                            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Efek Visual</h4>
                        </div>
                        <div className="p-5 md:p-6 rounded-2xl bg-slate-50/50 dark:bg-zinc-900/50 border border-slate-100 dark:border-zinc-800 space-y-6">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <Label className="text-[9px] uppercase font-black tracking-widest text-slate-400">Overlay Darkness</Label>
                                    <span className="text-xs font-bold text-blue-600 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded-md">{formData.overlayDarkness}%</span>
                                </div>
                                <Slider 
                                    value={[formData.overlayDarkness]} 
                                    onValueChange={(val) => setFormData({...formData, overlayDarkness: val[0]})}
                                    max={100} 
                                    step={1}
                                />
                            </div>

                            <div className="h-px bg-slate-200/50 dark:bg-zinc-800/50" />

                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <Label className="text-sm font-bold">Status Slide</Label>
                                    <p className="text-[9px] text-slate-400 leading-none">Aktifkan untuk menampilkan slide.</p>
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
                <DialogFooter className="p-6 md:p-8 border-t border-slate-100 dark:border-zinc-900 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md shrink-0 sm:justify-end flex-row gap-3">
                    <Button 
                        variant="ghost" 
                        onClick={() => setIsOpen(false)} 
                        className="rounded-xl h-11 font-bold px-6 hover:bg-slate-100 dark:hover:bg-zinc-900"
                    >
                        Batal
                    </Button>
                    <Button 
                        onClick={handleSave} 
                        disabled={isSaving}
                        className="rounded-xl h-11 font-bold px-8 bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/20"
                    >
                        {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                        {isSaving ? "Menyimpan..." : "Simpan"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
