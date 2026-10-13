"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Edit2, Trash2, Phone, GripVertical, Check, X, Loader2, Info, AlertTriangle } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { createWhatsAppAdmin, updateWhatsAppAdmin, deleteWhatsAppAdmin } from "@/actions/whatsapp-admin";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface Admin {
    id: string;
    name: string;
    phone: string;
    message: string;
    isActive: boolean;
    order: number;
}

export function WhatsAppAdminCMS({ initialAdmins }: { initialAdmins: Admin[] }) {
    const [admins, setAdmins] = useState(initialAdmins);
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [editAdmin, setEditAdmin] = useState<Admin | null>(null);
    const [isPending, setIsPending] = useState(false);

    const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsPending(true);
        try {
            const formData = new FormData(e.currentTarget);
            await createWhatsAppAdmin(formData);
            toast.success("Admin berhasil ditambahkan");
            setIsAddOpen(false);
            window.location.reload();
        } catch (error) {
            toast.error("Gagal menambahkan admin");
        } finally {
            setIsPending(false);
        }
    };

    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!editAdmin) return;
        setIsPending(true);
        try {
            const formData = new FormData(e.currentTarget);
            await updateWhatsAppAdmin(editAdmin.id, formData);
            toast.success("Admin berhasil diubah");
            setEditAdmin(null);
            window.location.reload();
        } catch (error) {
            toast.error("Gagal mengubah admin");
        } finally {
            setIsPending(false);
        }
    };

    const [deleteId, setDeleteId] = useState<string | null>(null);

    const handleDelete = (id: string) => {
        setDeleteId(id);
    };

    const confirmDelete = async () => {
        if (!deleteId) return;
        const targetId = deleteId;
        setDeleteId(null);
        try {
            await deleteWhatsAppAdmin(targetId);
            toast.success("Admin berhasil dihapus");
            setAdmins(admins.filter(a => a.id !== targetId));
        } catch (error) {
            toast.error("Gagal menghapus admin");
        }
    };

    return (
        <div className="space-y-6">
            {/* Panduan Penggunaan WhatsApp Admin */}
            <div className="bg-[#FACC15]/10 border-2 border-black dark:border-white rounded-none p-6 mb-6 shadow-retro-xs">
                <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-none bg-[#FACC15] text-black border-2 border-black dark:border-white flex items-center justify-center shrink-0 mt-0.5 shadow-retro-xs">
                        <Info className="w-5 h-5" />
                    </div>
                    <div className="space-y-3">
                        <h3 className="text-sm font-black uppercase text-slate-900 dark:text-white">📋 Panduan Mengelola Admin WhatsApp</h3>
                        <div className="text-sm text-slate-800 dark:text-zinc-200 space-y-2 leading-relaxed font-bold">
                            <p>Fitur ini mengatur kontak admin yang akan muncul saat pengunjung mengklik ikon WhatsApp (hijau) di pojok kanan bawah halaman publik.</p>
                            <ol className="list-decimal list-inside space-y-1.5 ml-1">
                                <li>Klik tombol <span className="bg-[#FACC15] text-black border border-black px-1.5 py-0.5 rounded-none font-black text-xs">+ Tambah Admin</span> untuk memasukkan admin baru.</li>
                                <li>Isi nama divisi/admin (contoh: <em>Haikal QA Specialist</em>) dan nomor WhatsApp (gunakan kode negara 62, misal <strong>628...</strong>).</li>
                                <li>Pesan Default bersifat opsional (contoh: <em>Halo, saya tertarik untuk mendiskusikan peluang QA / Software Testing</em>). Pesan ini otomatis terisi di chat WA pengguna.</li>
                                <li><strong>Status Aktif:</strong> Hanya admin dengan status "Aktif" yang akan ditampilkan ke pengunjung website. Anda dapat menonaktifkan admin kapan saja melalui tombol Edit.</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end">
                <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
                    <DialogTrigger 
                        render={
                            <Button className="bg-[#FACC15] hover:bg-yellow-300 text-black border-2 border-black dark:border-white rounded-none font-black text-sm uppercase h-11 px-6 shadow-retro-xs transition-transform active:translate-x-0.5 active:translate-y-0.5">
                                <Plus className="w-4 h-4 mr-2 stroke-[3]" />
                                Tambah Admin
                            </Button>
                        }
                    />
                    <DialogContent className="bg-[#FAF6ED] dark:bg-[#151B22] rounded-none p-8 border-2 border-black dark:border-white shadow-retro-md">
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-black uppercase text-slate-900 dark:text-white">Tambah Admin WhatsApp</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleCreate} className="space-y-6 mt-4">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label className="text-xs font-black uppercase">Nama Admin / Label</Label>
                                    <Input name="name" required placeholder="Contoh: Haikal QA Support" className="h-11 rounded-none bg-white dark:bg-[#0E1217] border-2 border-black dark:border-white font-bold" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-xs font-black uppercase">Nomor WhatsApp</Label>
                                    <Input name="phone" required placeholder="Contoh: 6281234567890 (Gunakan 62)" className="h-11 rounded-none bg-white dark:bg-[#0E1217] border-2 border-black dark:border-white font-bold" />
                                    <p className="text-xs text-slate-500 font-bold">Awali dengan kode negara tanpa +, contoh: 628...</p>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-xs font-black uppercase">Pesan Default</Label>
                                    <Input name="message" placeholder="Halo, saya ingin bertanya tentang proyek QA..." className="h-11 rounded-none bg-white dark:bg-[#0E1217] border-2 border-black dark:border-white font-bold" />
                                </div>
                                <div className="flex items-center gap-3 pt-2">
                                    <input type="checkbox" name="isActive" id="isActive" value="true" defaultChecked className="w-4 h-4 rounded-none border-2 border-black accent-[#FACC15]" />
                                    <Label htmlFor="isActive" className="cursor-pointer font-black text-sm">Aktifkan Admin Ini</Label>
                                </div>
                            </div>
                            <Button type="submit" disabled={isPending} className="w-full h-11 rounded-none bg-[#FACC15] hover:bg-yellow-300 text-black border-2 border-black dark:border-white font-black uppercase shadow-retro-xs">
                                {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : "Simpan Admin"}
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="bg-[#FAF6ED] dark:bg-[#151B22] border-2 border-black dark:border-white rounded-none overflow-hidden shadow-retro-sm">
                {admins.length === 0 ? (
                    <div className="py-24 text-center">
                        <Phone className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                        <p className="text-slate-800 dark:text-zinc-200 font-black uppercase">Belum ada Admin WhatsApp.</p>
                        <p className="text-sm text-slate-500 dark:text-zinc-400 mt-1 font-bold">Tambahkan admin pertama Anda untuk menampilkannya di tombol chat publik.</p>
                    </div>
                ) : (
                    <div className="divide-y-2 divide-black dark:divide-white">
                        {admins.map((admin, index) => (
                            <div key={admin.id} className="p-6 flex flex-col md:flex-row md:items-center gap-4 md:gap-6 hover:bg-[#FACC15]/10 transition-colors">
                                <div className="flex items-center justify-center w-12 h-12 rounded-none bg-[#FACC15] text-black border-2 border-black dark:border-white shrink-0 shadow-retro-xs">
                                    <Phone className="w-5 h-5" />
                                </div>
                                <div className="flex-1 min-w-0 space-y-1">
                                    <div className="flex items-center gap-3">
                                        <h3 className="font-black text-lg text-slate-900 dark:text-white uppercase truncate">{admin.name}</h3>
                                        <span className={cn(
                                            "px-2.5 py-0.5 rounded-none text-[10px] font-black uppercase tracking-widest border-2 border-black dark:border-white shadow-retro-xs",
                                            admin.isActive ? "bg-emerald-400 text-black" : "bg-slate-300 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300"
                                        )}>
                                            {admin.isActive ? "Aktif" : "Nonaktif"}
                                        </span>
                                    </div>
                                    <p className="text-sm text-slate-600 dark:text-zinc-300 font-black font-mono">{admin.phone}</p>
                                    {admin.message && (
                                        <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1 truncate font-medium">"{admin.message}"</p>
                                    )}
                                </div>
                                <div className="flex items-center gap-2 shrink-0">
                                    <Button 
                                        variant="outline" 
                                        size="sm" 
                                        onClick={() => setEditAdmin(admin)}
                                        className="h-9 rounded-none border-2 border-black dark:border-white bg-white dark:bg-[#0E1217] hover:bg-[#FACC15] text-black dark:text-white shadow-retro-xs"
                                        title="Edit Admin"
                                    >
                                        <Edit2 className="w-4 h-4" />
                                    </Button>
                                    <Button 
                                        variant="outline" 
                                        size="sm" 
                                        onClick={() => handleDelete(admin.id)}
                                        className="h-9 rounded-none border-2 border-black dark:border-white bg-red-500 hover:bg-red-600 text-white shadow-retro-xs"
                                        title="Hapus Admin"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <Dialog open={!!editAdmin} onOpenChange={(open) => !open && setEditAdmin(null)}>
                <DialogContent className="bg-[#FAF6ED] dark:bg-[#151B22] rounded-none p-8 border-2 border-black dark:border-white shadow-retro-md">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-black uppercase text-slate-900 dark:text-white">Edit Admin WhatsApp</DialogTitle>
                    </DialogHeader>
                    {editAdmin && (
                        <form onSubmit={handleUpdate} className="space-y-6 mt-4">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label className="text-xs font-black uppercase">Nama Admin / Label</Label>
                                    <Input name="name" defaultValue={editAdmin.name} required className="h-11 rounded-none bg-white dark:bg-[#0E1217] border-2 border-black dark:border-white font-bold" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-xs font-black uppercase">Nomor WhatsApp</Label>
                                    <Input name="phone" defaultValue={editAdmin.phone} required className="h-11 rounded-none bg-white dark:bg-[#0E1217] border-2 border-black dark:border-white font-bold" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-xs font-black uppercase">Pesan Default</Label>
                                    <Input name="message" defaultValue={editAdmin.message} className="h-11 rounded-none bg-white dark:bg-[#0E1217] border-2 border-black dark:border-white font-bold" />
                                </div>
                                <div className="flex items-center gap-3 pt-2">
                                    <input type="checkbox" name="isActive" id="edit-isActive" value="true" defaultChecked={editAdmin.isActive} className="w-4 h-4 rounded-none border-2 border-black accent-[#FACC15]" />
                                    <Label htmlFor="edit-isActive" className="cursor-pointer font-black text-sm">Aktifkan Admin Ini</Label>
                                </div>
                            </div>
                            <Button type="submit" disabled={isPending} className="w-full h-11 rounded-none bg-[#FACC15] hover:bg-yellow-300 text-black border-2 border-black dark:border-white font-black uppercase shadow-retro-xs">
                                {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : "Simpan Perubahan"}
                            </Button>
                        </form>
                    )}
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Modal */}
            <Dialog open={deleteId !== null} onOpenChange={(open) => !open && setDeleteId(null)}>
                <DialogContent className="sm:max-w-sm bg-[#FAF6ED] dark:bg-[#151B22] border-2 border-black dark:border-white rounded-none p-8 flex flex-col items-center text-center shadow-retro-md">
                    <div className="w-16 h-16 rounded-none bg-red-500 flex items-center justify-center mb-6 text-white border-2 border-black dark:border-white shadow-retro-xs">
                        <AlertTriangle className="w-8 h-8" />
                    </div>
                    <DialogHeader>
                        <DialogTitle className="text-xl font-black uppercase text-slate-900 dark:text-white mb-2">Hapus Admin?</DialogTitle>
                    </DialogHeader>
                    <p className="text-sm text-slate-600 dark:text-zinc-300 mb-6 font-bold">
                        Apakah Anda yakin ingin menghapus admin WhatsApp ini? Tindakan ini permanen.
                    </p>
                    <div className="flex w-full gap-3">
                        <Button 
                            variant="outline" 
                            className="flex-1 h-11 rounded-none border-2 border-black dark:border-white font-black uppercase hover:bg-slate-200 dark:hover:bg-zinc-800"
                            onClick={() => setDeleteId(null)}
                        >
                            Batal
                        </Button>
                        <Button 
                            variant="destructive" 
                            className="flex-1 h-11 rounded-none bg-red-600 hover:bg-red-700 text-white font-black uppercase tracking-wider border-2 border-black dark:border-white shadow-retro-xs"
                            onClick={confirmDelete}
                        >
                            Hapus
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
