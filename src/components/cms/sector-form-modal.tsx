"use client";

import { useState, useTransition, useRef } from "react";
import { X, Upload, Loader2, Info } from "lucide-react";
import { createBusinessSector, updateBusinessSector } from "@/actions/business-sector";
import { toast } from "sonner";
import { IconSelector } from "@/components/ui/icon-selector";
import { BusinessSector } from "@prisma/client";

interface SectorFormModalProps {
    sector?: BusinessSector | null;
    onClose: () => void;
    onSuccess: (sector: BusinessSector) => void;
}

export function SectorFormModal({ sector, onClose, onSuccess }: SectorFormModalProps) {
    const [isPending, startTransition] = useTransition();
    const [preview, setPreview] = useState<string | null>(sector?.imageUrl || null);
    const [icon, setIcon] = useState<string | null>(sector?.icon || null);
    const fileRef = useRef<HTMLInputElement>(null);

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setPreview(url);
        }
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        if (icon) {
            formData.set("icon", icon);
        }

        startTransition(async () => {
            try {
                let result: BusinessSector;
                if (sector) {
                    result = await updateBusinessSector(sector.id, formData) as BusinessSector;
                    toast.success("Bidang usaha berhasil diperbarui!");
                } else {
                    result = await createBusinessSector(formData) as BusinessSector;
                    toast.success("Bidang usaha berhasil ditambahkan!");
                }
                onSuccess(result);
            } catch (err: any) {
                toast.error(err.message || "Terjadi kesalahan");
            }
        });
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xl animate-in fade-in duration-200">
            <div className="bg-white dark:bg-zinc-950 rounded-3xl shadow-2xl w-full max-w-lg border border-slate-200 dark:border-zinc-800 max-h-[90vh] overflow-y-auto overflow-x-hidden hide-scrollbar">
                {/* Header */}
                <div className="flex items-center justify-between px-8 py-6 border-b border-slate-100 dark:border-zinc-800">
                    <h2 className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
                        {sector ? "Edit Bidang Usaha" : "Tambah Bidang Usaha"}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-all"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-8 space-y-5 max-h-[70vh] overflow-y-auto">
                    {/* Image Upload */}
                    <div>
                        <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2">
                            Ikon / Gambar Ilustrasi
                        </label>
                        <div
                            onClick={() => fileRef.current?.click()}
                            className="relative flex items-center justify-center w-full h-36 rounded-2xl border-2 border-dashed border-slate-200 dark:border-zinc-700 hover:border-primary/50 cursor-pointer transition-all overflow-hidden bg-slate-50 dark:bg-zinc-900"
                        >
                            {preview ? (
                                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                                <div className="flex flex-col items-center gap-2 text-slate-400">
                                    <Upload className="w-6 h-6" />
                                    <span className="text-xs font-medium">Klik untuk unggah gambar</span>
                                </div>
                            )}
                        </div>
                        <input
                            ref={fileRef}
                            name="image"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    </div>

                    {/* Icon Selection Fallback */}
                    <div>
                        <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2">
                            Pilih Ikon (Otomatis dipakai bila tidak ada gambar)
                        </label>
                        <IconSelector value={icon} onChange={setIcon} />
                    </div>

                    {/* Name ID */}
                    <div>
                        <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2">
                            Nama Bidang Usaha <span className="text-red-500">*</span>
                        </label>
                        <input
                            name="name"
                            type="text"
                            required
                            defaultValue={sector?.name}
                            placeholder="cth: Perdagangan Umum"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-900 text-sm font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                        />
                    </div>

                    {/* Description ID */}
                    <div>
                        <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2">
                            Deskripsi Singkat <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            name="description"
                            required
                            rows={3}
                            defaultValue={sector?.description}
                            placeholder="Deskripsi singkat bidang usaha..."
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-900 text-sm font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none"
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full h-13 bg-primary hover:bg-primary/90 text-white font-bold rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 disabled:opacity-60 disabled:translate-y-0"
                    >
                        {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                        {sector ? "Simpan Perubahan" : "Tambah Bidang Usaha"}
                    </button>
                </form>
            </div>
        </div>
    );
}
