"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Edit2, Trash2, Phone, GripVertical, Check, X, Loader2, Info } from "lucide-react";
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

    const handleDelete = async (id: string) => {
        if (!confirm("Yakin ingin menghapus admin ini?")) return;
        try {
            await deleteWhatsAppAdmin(id);
            toast.success("Admin berhasil dihapus");
            setAdmins(admins.filter(a => a.id !== id));
        } catch (error) {
            toast.error("Gagal menghapus admin");
        }
    };

    return (
        <div className="space-y-6">
            {/* Panduan Penggunaan WhatsApp Admin */}
            <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 rounded-xl p-6 mb-6">
                <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center shrink-0 mt-0.5">
                        <Info className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="space-y-3">
                        <h3 className="text-sm font-bold text-blue-900 dark:text-blue-300">📋 Panduan Mengelola Admin WhatsApp</h3>
                        <div className="text-sm text-blue-800 dark:text-blue-300/80 space-y-2 leading-relaxed">
                            <p className="font-semibold">Fitur ini mengatur kontak admin yang akan muncul saat pengunjung mengklik ikon WhatsApp (hijau) di pojok kanan bawah halaman publik.</p>
                            <ol className="list-decimal list-inside space-y-1.5 ml-1">
                                <li>Klik tombol <span className="bg-blue-200/60 dark:bg-blue-800/40 px-1.5 py-0.5 rounded font-bold text-xs">+ Tambah Admin</span> untuk memasukkan admin baru.</li>
                                <li>Isi nama divisi/admin (contoh: <em>CS Pendaftaran</em>) dan nomor WhatsApp (gunakan kode negara 62, misal <strong>628...</strong>).</li>
                                <li>Pesan Default bersifat opsional (contoh: <em>Halo, saya tertarik dengan layanan Anda</em>). Pesan ini otomatis terisi di chat WA pengguna.</li>
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
                            <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-11 px-6 shadow-sm" />
                        }
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Tambah Admin
                    </DialogTrigger>
                    <DialogContent className="bg-white dark:bg-zinc-950 rounded-[2rem] p-8 border-slate-200 dark:border-zinc-800 shadow-2xl">
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-bold">Tambah Admin WhatsApp</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleCreate} className="space-y-6 mt-4">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Nama Admin / Label</Label>
                                    <Input name="name" required placeholder="Contoh: Customer Service" className="h-12 rounded-xl" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Nomor WhatsApp</Label>
                                    <Input name="phone" required placeholder="Contoh: 6281234567890 (Gunakan 62)" className="h-12 rounded-xl" />
                                    <p className="text-xs text-slate-500">Awali dengan kode negara tanpa +, contoh: 628...</p>
                                </div>
                                <div className="space-y-2">
                                    <Label>Pesan Default</Label>
                                    <Input name="message" placeholder="Halo, saya ingin bertanya..." className="h-12 rounded-xl" />
                                </div>
                                <div className="flex items-center gap-3 pt-2">
                                    <input type="checkbox" name="isActive" id="isActive" value="true" defaultChecked className="w-4 h-4 rounded border-slate-300" />
                                    <Label htmlFor="isActive" className="cursor-pointer">Aktifkan Admin Ini</Label>
                                </div>
                            </div>
                            <Button type="submit" disabled={isPending} className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-base">
                                {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : "Simpan Admin"}
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-sm">
                {admins.length === 0 ? (
                    <div className="py-24 text-center">
                        <Phone className="w-12 h-12 text-slate-300 dark:text-zinc-700 mx-auto mb-4" />
                        <p className="text-slate-500 font-medium">Belum ada Admin WhatsApp.</p>
                        <p className="text-sm text-slate-400 mt-1">Tambahkan admin pertama Anda untuk menampilkannya di tombol chat publik.</p>
                    </div>
                ) : (
                    <div className="divide-y divide-slate-100 dark:divide-zinc-800">
                        {admins.map((admin, index) => (
                            <div key={admin.id} className="p-6 flex flex-col md:flex-row md:items-center gap-4 md:gap-6 hover:bg-slate-50 dark:hover:bg-zinc-900/50 transition-colors">
                                <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 shrink-0">
                                    <Phone className="w-5 h-5" />
                                </div>
                                <div className="flex-1 min-w-0 space-y-1">
                                    <div className="flex items-center gap-3">
                                        <h3 className="font-bold text-lg text-slate-900 dark:text-white truncate">{admin.name}</h3>
                                        <span className={cn(
                                            "px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest",
                                            admin.isActive ? "bg-emerald-500/10 text-emerald-600" : "bg-slate-200 dark:bg-zinc-800 text-slate-500"
                                        )}>
                                            {admin.isActive ? "Aktif" : "Nonaktif"}
                                        </span>
                                    </div>
                                    <p className="text-sm text-slate-500 font-medium font-mono">{admin.phone}</p>
                                    {admin.message && (
                                        <p className="text-xs text-slate-400 mt-1 truncate">"{admin.message}"</p>
                                    )}
                                </div>
                                <div className="flex items-center gap-2 shrink-0">
                                    <Button 
                                        variant="outline" 
                                        size="sm" 
                                        onClick={() => setEditAdmin(admin)}
                                        className="h-9 rounded-xl border-slate-200 dark:border-zinc-700"
                                    >
                                        <Edit2 className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                                    </Button>
                                    <Button 
                                        variant="outline" 
                                        size="sm" 
                                        onClick={() => handleDelete(admin.id)}
                                        className="h-9 rounded-xl border-slate-200 dark:border-zinc-700 hover:bg-red-50 hover:text-red-600 hover:border-red-200"
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
                <DialogContent className="bg-white dark:bg-zinc-950 rounded-[2rem] p-8 border-slate-200 dark:border-zinc-800 shadow-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold">Edit Admin WhatsApp</DialogTitle>
                    </DialogHeader>
                    {editAdmin && (
                        <form onSubmit={handleUpdate} className="space-y-6 mt-4">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Nama Admin / Label</Label>
                                    <Input name="name" defaultValue={editAdmin.name} required className="h-12 rounded-xl" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Nomor WhatsApp</Label>
                                    <Input name="phone" defaultValue={editAdmin.phone} required className="h-12 rounded-xl" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Pesan Default</Label>
                                    <Input name="message" defaultValue={editAdmin.message} className="h-12 rounded-xl" />
                                </div>
                                <div className="flex items-center gap-3 pt-2">
                                    <input type="checkbox" name="isActive" id="edit-isActive" value="true" defaultChecked={editAdmin.isActive} className="w-4 h-4 rounded border-slate-300" />
                                    <Label htmlFor="edit-isActive" className="cursor-pointer">Aktifkan Admin Ini</Label>
                                </div>
                            </div>
                            <Button type="submit" disabled={isPending} className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-base">
                                {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : "Simpan Perubahan"}
                            </Button>
                        </form>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
