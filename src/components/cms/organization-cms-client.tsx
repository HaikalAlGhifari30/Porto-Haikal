"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createOrganization, updateOrganization, deleteOrganization } from "@/actions/organization";
import { toast } from "sonner";
import { Plus, Trash2, Edit2, Users, Calendar, Save, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

interface OrganizationCmsClientProps {
  initialItems: any[];
}

export function OrganizationCmsClient({ initialItems }: OrganizationCmsClientProps) {
  const [items, setItems] = useState(initialItems);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Form State
  const [role, setRole] = useState("");
  const [roleEn, setRoleEn] = useState("");
  const [name, setName] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [period, setPeriod] = useState("");
  const [periodEn, setPeriodEn] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");

  const resetForm = () => {
    setRole("");
    setRoleEn("");
    setName("");
    setNameEn("");
    setPeriod("");
    setPeriodEn("");
    setDescription("");
    setDescriptionEn("");
  };

  const handleOpenAdd = () => {
    resetForm();
    setEditingItem(null);
    setIsAddOpen(true);
  };

  const handleOpenEdit = (item: any) => {
    setEditingItem(item);
    setRole(item.role || "");
    setRoleEn(item.roleEn || "");
    setName(item.name || "");
    setNameEn(item.nameEn || "");
    setPeriod(item.period || "");
    setPeriodEn(item.periodEn || "");
    setDescription(item.description || "");
    setDescriptionEn(item.descriptionEn || "");
    setIsAddOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      if (editingItem) {
        const updated = await updateOrganization(editingItem.id, {
          role,
          roleEn,
          name,
          nameEn,
          period,
          periodEn,
          description,
          descriptionEn,
        });
        setItems(items.map((i) => (i.id === editingItem.id ? updated : i)));
        toast.success("Pengalaman organisasi berhasil diperbarui!");
      } else {
        const newItem = await createOrganization({
          role,
          roleEn,
          name,
          nameEn,
          period,
          periodEn,
          description,
          descriptionEn,
        });
        setItems([...items, newItem]);
        toast.success("Pengalaman organisasi baru berhasil ditambahkan!");
      }
      setIsAddOpen(false);
      resetForm();
    } catch (err) {
      console.error(err);
      toast.error("Gagal menyimpan pengalaman organisasi");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    setIsSaving(true);
    try {
      await deleteOrganization(id);
      setItems(items.filter((i) => i.id !== id));
      toast.success("Pengalaman organisasi berhasil dihapus!");
      setDeletingId(null);
    } catch (err) {
      console.error(err);
      toast.error("Gagal menghapus pengalaman organisasi");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center pb-4 border-b border-slate-200 dark:border-zinc-800">
        <div>
          <h3 className="text-xl font-black text-slate-900 dark:text-white">Daftar Pengalaman Organisasi ({items.length})</h3>
          <p className="text-xs text-slate-500 dark:text-zinc-400">Kelola riwayat kepemimpinan & pengalaman organisasi kemahasiswaan Anda.</p>
        </div>
        <Button onClick={handleOpenAdd} className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold rounded-xl shadow-md">
          <Plus className="w-4 h-4 mr-2" /> Tambah Organisasi
        </Button>
      </div>

      <div className="space-y-4">
        {items.length === 0 ? (
          <div className="p-12 text-center border-2 border-dashed border-slate-200 dark:border-zinc-800 rounded-3xl">
            <Users className="w-12 h-12 mx-auto text-slate-400 mb-3 opacity-50" />
            <p className="text-sm font-bold text-slate-600 dark:text-zinc-400">Belum ada data pengalaman organisasi.</p>
          </div>
        ) : (
          items.map((item) => (
            <div key={item.id} className="p-6 rounded-2xl bg-white dark:bg-[#070e20] border border-slate-200 dark:border-cyan-500/20 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-cyan-500/50 transition-all">
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-lg font-extrabold text-slate-900 dark:text-white">{item.name}</h4>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 font-bold border border-cyan-500/20">{item.role}</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-zinc-400 flex items-center gap-1.5 font-medium">
                  <Calendar className="w-3.5 h-3.5 text-cyan-400" /> {item.period}
                </p>
                {item.description && (
                  <p className="text-xs text-slate-600 dark:text-zinc-300 pt-2 whitespace-pre-line leading-relaxed">
                    {item.description}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Button variant="outline" size="sm" onClick={() => handleOpenEdit(item)} className="rounded-xl border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-300">
                  <Edit2 className="w-3.5 h-3.5 mr-1" /> Edit
                </Button>
                <Button variant="destructive" size="sm" onClick={() => setDeletingId(item.id)} className="rounded-xl">
                  <Trash2 className="w-3.5 h-3.5 mr-1" /> Hapus
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add / Edit Dialog */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-white dark:bg-[#070e20] border-slate-200 dark:border-cyan-500/30 rounded-3xl p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-slate-900 dark:text-white">
              {editingItem ? "Edit Pengalaman Organisasi" : "Tambah Pengalaman Organisasi"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSave} className="space-y-4 py-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase">Peran / Jabatan (🇮🇩 ID)</Label>
                <Input value={role} onChange={(e) => setRole(e.target.value)} placeholder="Ketua Umum" required className="rounded-xl bg-slate-50 dark:bg-zinc-950" />
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase">Role / Position (🇬🇧 EN)</Label>
                <Input value={roleEn} onChange={(e) => setRoleEn(e.target.value)} placeholder="Chairperson" className="rounded-xl bg-slate-50 dark:bg-zinc-950" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase">Nama Organisasi (🇮🇩 ID)</Label>
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Himpunan Mahasiswa Teknik Informatika (HMIF UNIKOM)" required className="rounded-xl bg-slate-50 dark:bg-zinc-950" />
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase">Organization Name (🇬🇧 EN)</Label>
                <Input value={nameEn} onChange={(e) => setNameEn(e.target.value)} placeholder="Informatics Student Association (HMIF UNIKOM)" className="rounded-xl bg-slate-50 dark:bg-zinc-950" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase">Periode Kepengurusan (🇮🇩 ID)</Label>
                <Input value={period} onChange={(e) => setPeriod(e.target.value)} placeholder="Nov 2022 — Nov 2023" required className="rounded-xl bg-slate-50 dark:bg-zinc-950" />
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase">Tenure Period (🇬🇧 EN)</Label>
                <Input value={periodEn} onChange={(e) => setPeriodEn(e.target.value)} placeholder="Nov 2022 — Nov 2023" className="rounded-xl bg-slate-50 dark:bg-zinc-950" />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase">Tanggung Jawab & Pencapaian (🇮🇩 Bahasa Indonesia)</Label>
              <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="• Merencanakan dan mengawasi..." className="min-h-[100px] rounded-xl bg-slate-50 dark:bg-zinc-950" />
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase">Responsibilities & Achievements (🇬🇧 English)</Label>
              <Textarea value={descriptionEn} onChange={(e) => setDescriptionEn(e.target.value)} placeholder="• Planned and supervised..." className="min-h-[100px] rounded-xl bg-slate-50 dark:bg-zinc-950" />
            </div>

            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={() => setIsAddOpen(false)} disabled={isSaving} className="rounded-xl">Batal</Button>
              <Button type="submit" disabled={isSaving} className="rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold">
                {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />} Simpan
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={!!deletingId} onOpenChange={() => setDeletingId(null)}>
        <DialogContent className="sm:max-w-[400px] bg-white dark:bg-[#070e20] border-slate-200 dark:border-cyan-500/30 rounded-3xl p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-red-600">Hapus Pengalaman Organisasi</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-slate-600 dark:text-zinc-300 py-2">Apakah Anda yakin ingin menghapus data pengalaman organisasi ini?</p>
          <DialogFooter className="flex gap-2">
            <Button variant="outline" onClick={() => setDeletingId(null)} disabled={isSaving} className="rounded-xl">Batal</Button>
            <Button variant="destructive" onClick={() => deletingId && handleDelete(deletingId)} disabled={isSaving} className="rounded-xl font-bold">
              {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : "Hapus Data"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
