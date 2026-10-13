"use client";

import { useState } from "react";
import { Plus, Search, Image as ImageIcon, SearchX } from "lucide-react";
import { Gallery } from "@prisma/client";
import { GalleryCard } from "./gallery-card";
import { GalleryFormModal } from "./gallery-form-modal";

interface GalleryCmsProps {
    items: Gallery[];
}

export function GalleryCms({ items: initialItems }: GalleryCmsProps) {
    const [items, setItems] = useState<Gallery[]>(initialItems);
    const [searchQuery, setSearchQuery] = useState("");
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const categories = Array.from(new Set(items.map(item => item.category)));

    const filteredItems = items.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory ? item.category === selectedCategory : true;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header Actions */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between bg-[#FAF6ED] dark:bg-[#151B22] p-4 rounded-none border-2 border-black dark:border-white shadow-retro-sm">
                <div className="flex w-full sm:w-auto items-center gap-3">
                    <div className="relative flex-1 sm:w-72">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input
                            type="text"
                            placeholder="Cari foto galeri..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full h-11 pl-10 pr-4 bg-white dark:bg-[#0E1217] border-2 border-black dark:border-white rounded-none text-sm font-bold focus:outline-none focus:border-[#FACC15] transition-all text-slate-900 dark:text-white"
                        />
                    </div>
                </div>

                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 h-11 px-6 bg-[#FACC15] hover:bg-yellow-300 text-black border-2 border-black dark:border-white rounded-none font-black text-sm uppercase shadow-retro-xs transition-transform active:translate-x-0.5 active:translate-y-0.5"
                >
                    <Plus className="w-4 h-4 stroke-[3]" />
                    <span>Tambah Foto</span>
                </button>
            </div>

            {/* Category Filter */}
            {categories.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={() => setSelectedCategory(null)}
                        className={`px-4 py-2 rounded-none border-2 border-black dark:border-white text-xs font-black uppercase transition-all ${!selectedCategory ? 'bg-[#FACC15] text-black shadow-retro-xs' : 'bg-[#FAF6ED] dark:bg-[#151B22] text-slate-800 dark:text-zinc-200 hover:bg-yellow-100 dark:hover:bg-zinc-800'}`}
                    >
                        Semua Kategori
                    </button>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-4 py-2 rounded-none border-2 border-black dark:border-white text-xs font-black uppercase transition-all ${selectedCategory === cat ? 'bg-[#FACC15] text-black shadow-retro-xs' : 'bg-[#FAF6ED] dark:bg-[#151B22] text-slate-800 dark:text-zinc-200 hover:bg-yellow-100 dark:hover:bg-zinc-800'}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            )}

            {/* Grid Content */}
            {filteredItems.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredItems.map(item => (
                        <GalleryCard
                            key={item.id}
                            item={item}
                        />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 px-4 bg-[#FAF6ED] dark:bg-[#151B22] border-2 border-dashed border-black dark:border-white rounded-none">
                    <div className="w-16 h-16 rounded-none bg-[#FACC15] border-2 border-black dark:border-white flex items-center justify-center mb-4 shadow-retro-xs">
                        {searchQuery ? (
                            <SearchX className="w-8 h-8 text-black" />
                        ) : (
                            <ImageIcon className="w-8 h-8 text-black" />
                        )}
                    </div>
                    <h3 className="text-lg font-black uppercase text-slate-900 dark:text-white mb-2">
                        {searchQuery ? "Foto Tidak Ditemukan" : "Belum Ada Foto Galeri"}
                    </h3>
                    <p className="text-slate-600 dark:text-zinc-300 text-center max-w-md text-sm font-medium">
                        {searchQuery
                            ? `Tidak ada foto yang cocok dengan pencarian "${searchQuery}".`
                            : "Mulai tambahkan foto screenshot proyek untuk menampilkan galeri pengujian QA dan hasil kerja terbaik Anda."}
                    </p>
                    {!searchQuery && (
                        <button
                            onClick={() => setIsAddModalOpen(true)}
                            className="mt-6 flex items-center gap-2 h-10 px-5 bg-[#FACC15] hover:bg-yellow-300 text-black border-2 border-black dark:border-white rounded-none font-black text-xs uppercase shadow-retro-xs transition-transform active:translate-x-0.5 active:translate-y-0.5"
                        >
                            <Plus className="w-4 h-4 stroke-[3]" />
                            Tambah Foto Pertama
                        </button>
                    )}
                </div>
            )}

            <GalleryFormModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
            />
        </div>
    );
}
