import { getGalleryItems } from "@/actions/gallery";
import { GalleryCms } from "@/components/cms/gallery-cms";
import { Image as ImageIcon } from "lucide-react";

export default async function GalleryPage() {
    const items = await getGalleryItems();

    return (
        <div className="space-y-6">
            <div className="mb-10">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                    <div className="flex-1">
                        <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-white uppercase">Galeri Proyek</h2>
                        <p className="text-sm text-slate-500 dark:text-zinc-400 mt-2 font-medium leading-relaxed max-w-2xl">
                            Kelola koleksi foto dokumentasi dan proyek PT Rizky Rijaya Karya. Foto yang ditampilkan di sini akan terlihat dalam bentuk Masonry Grid di halaman utama.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row lg:items-center gap-6 mt-6">
                    {/* Tutorial/Tips Card */}
                    <div className="flex-1 flex items-center gap-4 p-5 rounded-[1.5rem] bg-indigo-500/[0.03] dark:bg-indigo-500/[0.02] border border-indigo-500/10 animate-in fade-in slide-in-from-top-1 duration-500">
                        <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 shrink-0">
                            <ImageIcon className="w-5 h-5" />
                        </div>
                        <p className="text-[11px] md:text-xs text-slate-600 dark:text-zinc-400 leading-relaxed font-medium">
                            <span className="font-bold text-indigo-600 dark:text-indigo-400 mr-1 uppercase tracking-widest">Tips:</span>
                            Upload foto dengan kualitas yang baik namun pastikan ukurannya tidak terlalu besar (Maksimal 5MB) agar loading website tetap cepat.
                        </p>
                    </div>
                </div>
            </div>

            <GalleryCms items={items} />
        </div>
    );
}
