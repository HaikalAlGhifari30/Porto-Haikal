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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
            <div className="bg-[#FAF6ED] dark:bg-[#151B22] rounded-none shadow-retro-md w-full max-w-lg border-2 border-black dark:border-white max-h-[90vh] overflow-y-auto overflow-x-hidden hide-scrollbar">
                {/* Header */}
                <div className="flex items-center justify-between px-8 py-6 border-b-2 border-black dark:border-white">
                    <h2 className="text-xl font-black uppercase tracking-tight text-slate-900 dark:text-white">
                        {sector ? "Edit Bidang Usaha" : "Tambah Bidang Usaha"}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-1.5 rounded-none border-2 border-black dark:border-white bg-white dark:bg-[#0E1217] text-slate-600 dark:text-zinc-300 hover:bg-red-500 hover:text-white transition-all shadow-retro-xs"
                    >
                        <X className="w-4 h-4 stroke-[2.5]" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-8 space-y-5 max-h-[70vh] overflow-y-auto custom-scrollbar">
                    {/* Image Upload */}
                    <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-slate-800 dark:text-zinc-200 mb-2">
                            Ikon / Gambar Ilustrasi
                        </label>
                        <div
                            onClick={() => fileRef.current?.click()}
                            className="relative flex items-center justify-center w-full h-36 rounded-none border-2 border-dashed border-black dark:border-white hover:bg-[#FACC15]/10 cursor-pointer transition-all overflow-hidden bg-white dark:bg-[#0E1217]"
                        >
                            {preview ? (
                                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                                <div className="flex flex-col items-center gap-2 text-slate-600 dark:text-zinc-400">
                                    <Upload className="w-6 h-6 stroke-[2.5]" />
                                    <span className="text-xs font-black uppercase tracking-wider">Klik untuk unggah gambar</span>
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
                        <label className="block text-[10px] font-black uppercase tracking-widest text-slate-800 dark:text-zinc-200 mb-2">
                            Pilih Ikon (Otomatis dipakai bila tidak ada gambar)
                        </label>
                        <IconSelector value={icon} onChange={setIcon} />
                    </div>

                    {/* Name ID */}
                    <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-slate-800 dark:text-zinc-200 mb-2">
                            Nama Bidang Usaha <span className="text-red-500">*</span>
                        </label>
                        <input
                            name="name"
                            type="text"
                            required
                            defaultValue={sector?.name}
                            placeholder="cth: Perdagangan Umum"
                            className="w-full px-4 py-3 rounded-none border-2 border-black dark:border-white bg-white dark:bg-[#0E1217] text-sm font-bold text-slate-900 dark:text-white focus:outline-none"
                        />
                    </div>

                    {/* Description ID */}
                    <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-slate-800 dark:text-zinc-200 mb-2">
                            Deskripsi Singkat <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            name="description"
                            required
                            rows={3}
                            defaultValue={sector?.description}
                            placeholder="Deskripsi singkat bidang usaha..."
                            className="w-full px-4 py-3 rounded-none border-2 border-black dark:border-white bg-white dark:bg-[#0E1217] text-sm font-bold text-slate-900 dark:text-white focus:outline-none resize-none"
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full h-12 bg-[#FACC15] hover:bg-yellow-300 text-black font-black uppercase text-xs rounded-none border-2 border-black dark:border-white flex items-center justify-center gap-2 transition-all shadow-retro-xs disabled:opacity-60"
                    >
                        {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                        {sector ? "Simpan Perubahan" : "Tambah Bidang Usaha"}
                    </button>
                </form>
            </div>
        </div>
    );
}
