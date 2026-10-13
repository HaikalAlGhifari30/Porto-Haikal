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
                        <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-white uppercase">Galeri Screenshot Proyek</h2>
                        <p className="text-sm text-slate-500 dark:text-zinc-400 mt-2 font-medium leading-relaxed max-w-2xl">
                            Kelola koleksi screenshot dokumentasi aplikasi & pengujian QA Haikal Al Ghifari. Foto yang ditampilkan di sini akan terlihat dalam bentuk Masonry Grid di landing page.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row lg:items-center gap-6 mt-6">
                    {/* Tutorial/Tips Card */}
                    <div className="flex-1 flex items-center gap-4 p-5 rounded-2xl bg-yellow-400/10 border-2 border-black dark:border-white shadow-retro-xs">
                        <div className="p-2.5 bg-[#FACC15] text-black border border-black shrink-0">
                            <ImageIcon className="w-5 h-5" />
                        </div>
                        <p className="text-[11px] md:text-xs text-slate-600 dark:text-zinc-300 leading-relaxed font-medium">
                            <span className="font-bold text-amber-600 dark:text-[#FACC15] mr-1 uppercase tracking-widest">Tips:</span>
                            Upload foto dengan kualitas yang baik namun pastikan ukurannya tidak terlalu besar (Maksimal 5MB) agar loading website tetap cepat.
                        </p>
                    </div>
                </div>
            </div>

            <GalleryCms items={items} />
        </div>
    );
}
