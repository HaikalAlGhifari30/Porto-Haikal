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
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between bg-white dark:bg-[#18181b] p-4 rounded-2xl border border-slate-200 dark:border-zinc-800/50 shadow-sm">
                <div className="flex w-full sm:w-auto items-center gap-3">
                    <div className="relative flex-1 sm:w-72">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Cari foto galeri..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full h-11 pl-10 pr-4 bg-slate-50 dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900 dark:text-white"
                        />
                    </div>
                </div>

                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 h-11 px-5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-sm transition-all hover:shadow-lg hover:shadow-blue-500/20 active:scale-95"
                >
                    <Plus className="w-4 h-4" />
                    <span>Tambah Foto</span>
                </button>
            </div>

            {/* Category Filter */}
            {categories.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={() => setSelectedCategory(null)}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${!selectedCategory ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900' : 'bg-white dark:bg-zinc-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-zinc-700 hover:bg-slate-50 dark:hover:bg-zinc-700'}`}
                    >
                        Semua Kategori
                    </button>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${selectedCategory === cat ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900' : 'bg-white dark:bg-zinc-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-zinc-700 hover:bg-slate-50 dark:hover:bg-zinc-700'}`}
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
                <div className="flex flex-col items-center justify-center py-20 px-4 bg-white dark:bg-[#18181b] border border-dashed border-slate-200 dark:border-zinc-800 rounded-3xl">
                    <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-zinc-900 flex items-center justify-center mb-4">
                        {searchQuery ? (
                            <SearchX className="w-8 h-8 text-slate-400" />
                        ) : (
                            <ImageIcon className="w-8 h-8 text-slate-400" />
                        )}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                        {searchQuery ? "Foto Tidak Ditemukan" : "Belum Ada Foto Galeri"}
                    </h3>
                    <p className="text-slate-500 dark:text-zinc-400 text-center max-w-md text-sm">
                        {searchQuery
                            ? `Tidak ada foto yang cocok dengan pencarian "${searchQuery}".`
                            : "Mulai tambahkan foto proyek untuk menampilkan portofolio terbaik perusahaan Anda."}
                    </p>
                    {!searchQuery && (
                        <button
                            onClick={() => setIsAddModalOpen(true)}
                            className="mt-6 flex items-center gap-2 h-10 px-4 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-lg font-medium text-sm hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-colors"
                        >
                            <Plus className="w-4 h-4" />
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
