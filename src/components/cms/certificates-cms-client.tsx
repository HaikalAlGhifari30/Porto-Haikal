"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createCertificate, updateCertificate, deleteCertificate, parseAndUploadCertificateFile } from "@/actions/certificate";
import { toast } from "sonner";
import { Plus, Trash2, Edit2, Award, Calendar, Save, Loader2, ExternalLink, ShieldCheck, FileUp, Sparkles, Upload, FileText } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

interface CertificatesCmsClientProps {
  initialItems: any[];
}

export function CertificatesCmsClient({ initialItems }: CertificatesCmsClientProps) {
  const [items, setItems] = useState(initialItems);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isParsingPdf, setIsParsingPdf] = useState(false);

  // Form State
  const [title, setTitle] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [issuer, setIssuer] = useState("");
  const [issuerEn, setIssuerEn] = useState("");
  const [period, setPeriod] = useState("");
  const [periodEn, setPeriodEn] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");
  const [badge, setBadge] = useState("");
  const [badgeEn, setBadgeEn] = useState("");
  const [credentialUrl, setCredentialUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [secondaryImageUrl, setSecondaryImageUrl] = useState("");

  const resetForm = () => {
    setTitle("");
    setTitleEn("");
    setIssuer("");
    setIssuerEn("");
    setPeriod("");
    setPeriodEn("");
    setDescription("");
    setDescriptionEn("");
    setBadge("");
    setBadgeEn("");
    setCredentialUrl("");
    setImageUrl("");
    setSecondaryImageUrl("");
  };

  const handleOpenAdd = () => {
    resetForm();
    setEditingItem(null);
    setIsAddOpen(true);
  };

  const handleOpenEdit = (item: any) => {
    setEditingItem(item);
    setTitle(item.title || "");
    setTitleEn(item.titleEn || "");
    setIssuer(item.issuer || "");
    setIssuerEn(item.issuerEn || "");
    setPeriod(item.period || "");
    setPeriodEn(item.periodEn || "");
    setDescription(item.description || "");
    setDescriptionEn(item.descriptionEn || "");
    setBadge(item.badge || "");
    setBadgeEn(item.badgeEn || "");
    setCredentialUrl(item.credentialUrl || "");
    setImageUrl(item.imageUrl || "");
    setSecondaryImageUrl(item.secondaryImageUrl || "");
    setIsAddOpen(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, fieldName: 'pdf' | 'img1' | 'img2') => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsParsingPdf(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await parseAndUploadCertificateFile(formData);
      if (res.success && res.data) {
        if (fieldName === 'pdf') {
          if (res.data.title) setTitle(res.data.title);
          if (res.data.issuer) setIssuer(res.data.issuer);
          if (res.data.period) setPeriod(res.data.period);
          if (res.data.badge) setBadge(res.data.badge);
          if (res.data.description) setDescription(res.data.description);
          if (res.data.credentialUrl) setCredentialUrl(res.data.credentialUrl);
          if (res.data.imageUrl) setImageUrl(res.data.imageUrl);

          toast.success("✨ Sertifikat berhasil diunggah! Semua keterangan terisi otomatis.");
        } else if (fieldName === 'img1') {
          setImageUrl(res.url);
          toast.success("Gambar Hal 1 berhasil diunggah!");
        } else if (fieldName === 'img2') {
          setSecondaryImageUrl(res.url);
          toast.success("Gambar Hal 2 berhasil diunggah!");
        }
      } else {
        toast.error(res.error || "Gagal mengunggah file");
      }
    } catch (err) {
      console.error(err);
      toast.error("Terjadi kesalahan saat memproses file");
    } finally {
      setIsParsingPdf(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      if (editingItem) {
        const updated = await updateCertificate(editingItem.id, {
          title,
          titleEn,
          issuer,
          issuerEn,
          period,
          periodEn,
          description,
          descriptionEn,
          badge,
          badgeEn,
          credentialUrl,
          imageUrl,
          secondaryImageUrl,
        });
        setItems(items.map((i) => (i.id === editingItem.id ? updated : i)));
        toast.success("Data sertifikasi berhasil diperbarui!");
      } else {
        const newItem = await createCertificate({
          title,
          titleEn,
          issuer,
          issuerEn,
          period,
          periodEn,
          description,
          descriptionEn,
          badge,
          badgeEn,
          credentialUrl,
          imageUrl,
          secondaryImageUrl,
        });
        setItems([...items, newItem]);
        toast.success("Data sertifikasi baru berhasil ditambahkan!");
      }
      setIsAddOpen(false);
      resetForm();
    } catch (err) {
      console.error(err);
      toast.error("Gagal menyimpan data sertifikasi");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    setIsSaving(true);
    try {
      await deleteCertificate(id);
      setItems(items.filter((i) => i.id !== id));
      toast.success("Data sertifikasi berhasil dihapus!");
      setDeletingId(null);
    } catch (err) {
      console.error(err);
      toast.error("Gagal menghapus data sertifikasi");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center pb-4 border-b border-slate-200 dark:border-zinc-800">
        <div>
          <h3 className="text-xl font-black text-slate-900 dark:text-white">Daftar Sertifikasi & Lisensi ({items.length})</h3>
          <p className="text-xs text-slate-500 dark:text-zinc-400">Kelola sertifikasi profesi, pelatihan, dan lisensi kompetensi Anda.</p>
        </div>
        <Button onClick={handleOpenAdd} className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold rounded-xl shadow-md">
          <Plus className="w-4 h-4 mr-2" /> Tambah Sertifikasi
        </Button>
      </div>

      <div className="space-y-4">
        {items.length === 0 ? (
          <div className="p-12 text-center border-2 border-dashed border-slate-200 dark:border-zinc-800 rounded-3xl">
            <Award className="w-12 h-12 mx-auto text-slate-400 mb-3 opacity-50" />
            <p className="text-sm font-bold text-slate-600 dark:text-zinc-400">Belum ada data sertifikasi.</p>
          </div>
        ) : (
          items.map((item) => (
            <div key={item.id} className="p-6 rounded-2xl bg-white dark:bg-[#070e20] border border-slate-200 dark:border-cyan-500/20 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-cyan-500/50 transition-all">
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="text-lg font-extrabold text-slate-900 dark:text-white">{item.title}</h4>
                  {item.badge && (
                    <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[10px] font-black uppercase">
                      {item.badge}
                    </span>
                  )}
                </div>
                <p className="text-xs font-bold text-cyan-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> {item.issuer}
                </p>
                <p className="text-xs text-slate-500 dark:text-zinc-400 flex items-center gap-1.5 font-medium">
                  <Calendar className="w-3.5 h-3.5 text-cyan-400" /> {item.period}
                </p>
                {item.description && (
                  <p className="text-xs text-slate-600 dark:text-zinc-300 pt-2 leading-relaxed whitespace-pre-line">
                    {item.description}
                  </p>
                )}
                {item.credentialUrl && (
                  <a
                    href={item.credentialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-500 hover:text-cyan-400 pt-1"
                  >
                    <ExternalLink className="w-3 h-3" /> Lihat Kredensial / Bukti Sertifikat
                  </a>
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
        <DialogContent className="sm:max-w-[650px] max-h-[90vh] overflow-y-auto bg-white dark:bg-[#070e20] border-slate-200 dark:border-cyan-500/30 rounded-3xl p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-cyan-400" />
              {editingItem ? "Edit Data Sertifikasi" : "Tambah Data Sertifikasi"}
            </DialogTitle>
          </DialogHeader>

          {/* Auto Extract PDF Upload Area */}
          <div className="relative overflow-hidden rounded-2xl border-2 border-dashed border-cyan-500/40 bg-cyan-500/5 dark:bg-cyan-500/10 p-5 text-center transition-all hover:bg-cyan-500/15">
            <input
              type="file"
              accept=".pdf,.png,.jpg,.jpeg"
              onChange={(e) => handleFileUpload(e, 'pdf')}
              disabled={isParsingPdf}
              className="absolute inset-0 z-10 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
            />
            {isParsingPdf ? (
              <div className="flex flex-col items-center justify-center py-3 space-y-2">
                <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
                <p className="text-xs font-bold text-cyan-400">Mengekstrak data PDF & mengunggah file...</p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center space-y-1.5 pointer-events-none">
                <div className="w-10 h-10 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center mb-1">
                  <Sparkles className="w-5 h-5 animate-pulse" />
                </div>
                <h5 className="text-xs font-black uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                  <FileUp className="w-4 h-4" /> Auto Generate dari PDF / File Sertifikat
                </h5>
                <p className="text-[11px] text-slate-600 dark:text-zinc-300 font-medium">
                  Klik atau Drop PDF di sini. Keterangan, judul, penerbit & unit kompetensi akan terisi otomatis!
                </p>
              </div>
            )}
          </div>

          <form onSubmit={handleSave} className="space-y-4 py-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase">Nama Sertifikasi</Label>
                <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Junior Web Programmer" required className="rounded-xl bg-slate-50 dark:bg-zinc-950" />
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase">Penerbit / Organisasi</Label>
                <Input value={issuer} onChange={(e) => setIssuer(e.target.value)} placeholder="Badan Nasional Sertifikasi Profesi (BNSP)" required className="rounded-xl bg-slate-50 dark:bg-zinc-950" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase">Periode / Tahun</Label>
                <Input value={period} onChange={(e) => setPeriod(e.target.value)} placeholder="2024" required className="rounded-xl bg-slate-50 dark:bg-zinc-950" />
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase">Label Badge</Label>
                <Input value={badge} onChange={(e) => setBadge(e.target.value)} placeholder="Sertifikasi Kompetensi Nasional" className="rounded-xl bg-slate-50 dark:bg-zinc-950" />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase">URL Bukti / Credential (Opsional)</Label>
              <Input value={credentialUrl} onChange={(e) => setCredentialUrl(e.target.value)} placeholder="https://..." className="rounded-xl bg-slate-50 dark:bg-zinc-950" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase">Gambar Sertifikat / PDF (Hal 1)</Label>
                <div className="flex gap-2">
                  <Input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="/uploads/certificates/cert.png" className="rounded-xl bg-slate-50 dark:bg-zinc-950" />
                  <label className="relative inline-flex items-center justify-center px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl cursor-pointer text-xs font-bold shrink-0">
                    <Upload className="w-3.5 h-3.5" />
                    <input type="file" accept="image/*,.pdf" onChange={(e) => handleFileUpload(e, 'img1')} className="hidden" />
                  </label>
                </div>
                {imageUrl && (
                  <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-slate-200 dark:border-zinc-800 bg-slate-900 flex items-center justify-center">
                    {imageUrl.endsWith(".pdf") ? (
                      <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs p-4">
                        <FileText className="w-6 h-6" /> Document PDF Linked
                      </div>
                    ) : (
                      <img src={imageUrl} alt="Preview 1" className="w-full h-full object-cover" />
                    )}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase">Gambar Halaman 2 (Opsional)</Label>
                <div className="flex gap-2">
                  <Input value={secondaryImageUrl} onChange={(e) => setSecondaryImageUrl(e.target.value)} placeholder="/uploads/certificates/units.png" className="rounded-xl bg-slate-50 dark:bg-zinc-950" />
                  <label className="relative inline-flex items-center justify-center px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl cursor-pointer text-xs font-bold shrink-0">
                    <Upload className="w-3.5 h-3.5" />
                    <input type="file" accept="image/*,.pdf" onChange={(e) => handleFileUpload(e, 'img2')} className="hidden" />
                  </label>
                </div>
                {secondaryImageUrl && (
                  <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-slate-200 dark:border-zinc-800 bg-slate-900 flex items-center justify-center">
                    {secondaryImageUrl.endsWith(".pdf") ? (
                      <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs p-4">
                        <FileText className="w-6 h-6" /> Document PDF Linked
                      </div>
                    ) : (
                      <img src={secondaryImageUrl} alt="Preview 2" className="w-full h-full object-cover" />
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase">Deskripsi Sertifikasi</Label>
              <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Sertifikasi resmi kompetensi..." className="min-h-[120px] rounded-xl bg-slate-50 dark:bg-zinc-950" />
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
            <DialogTitle className="text-xl font-bold text-red-600">Hapus Data Sertifikasi</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-slate-600 dark:text-zinc-300 py-2">Apakah Anda yakin ingin menghapus data sertifikasi ini?</p>
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
