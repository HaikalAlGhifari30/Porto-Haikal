"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateSettings } from "@/actions/settings";
import { toast } from "sonner";
import { Loader2, Save, Upload, FileText, CheckCircle2, User, ImagePlus, FileUp } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

export function ProfilePhotoSettingsForm({ settings }: { settings: any }) {
  const [isSaving, setIsSaving] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [formDataToSave, setFormDataToSave] = useState<FormData | null>(null);

  const [heroBannerUrl, setHeroBannerUrl] = useState(settings?.heroBannerUrl || "/haikal-al-ghifari.jpg");
  const [cvLink, setCvLink] = useState(settings?.heroCtaLink || "/cv-haikal-al-ghifari.pdf");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cvFileInputRef = useRef<HTMLInputElement>(null);

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Ukuran file foto terlalu besar (Maksimal 5MB)");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setHeroBannerUrl(base64);
        toast.success("Foto profil baru berhasil dimuat! Klik 'Simpan Foto Profil & File CV' untuk menerapkan.");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCvFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error("Ukuran file CV terlalu besar (Maksimal 10MB)");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setCvLink(base64);
        toast.success("File CV PDF baru berhasil dimuat! Klik 'Simpan Foto Profil & File CV' untuk menerapkan.");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setFormDataToSave(formData);
    setIsConfirmOpen(true);
  };

  async function handleConfirmSave() {
    if (!formDataToSave) return;

    setIsSaving(true);
    try {
      await updateSettings(formDataToSave);
      toast.success("Foto profil & dokumen CV berhasil diperbarui!");
      setIsConfirmOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Gagal menyimpan foto profil");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <>
      {/* Hidden File Inputs */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageFileChange}
        accept="image/png, image/jpeg, image/webp, image/gif"
        className="hidden"
      />
      <input
        type="file"
        ref={cvFileInputRef}
        onChange={handleCvFileChange}
        accept="application/pdf"
        className="hidden"
      />

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Left Column: Profile Photo Upload & Preview */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-zinc-800">
              <User className="w-5 h-5 text-cyan-400" />
              <Label className="text-base font-black text-slate-900 dark:text-white">Foto Profil Utama (Hero Section)</Label>
            </div>

            <div className="flex flex-col items-center sm:flex-row gap-6 p-4 rounded-2xl bg-slate-50 dark:bg-[#0c142c] border border-slate-200 dark:border-cyan-500/30">
              <div className="relative w-32 h-40 rounded-2xl overflow-hidden border-2 border-cyan-500/50 shadow-xl shrink-0 group">
                <img
                  src={heroBannerUrl}
                  alt="Haikal Al Ghifari Profile"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="space-y-3 flex-1 min-w-0">
                <Button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full h-11 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  <ImagePlus className="w-4 h-4 mr-2" /> Upload Foto Baru dari Perangkat
                </Button>

                <div className="space-y-1">
                  <Label htmlFor="heroBannerUrl" className="text-[11px] font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">
                    URL / Base64 Foto Profil
                  </Label>
                  <Input
                    id="heroBannerUrl"
                    name="heroBannerUrl"
                    value={heroBannerUrl}
                    onChange={(e) => setHeroBannerUrl(e.target.value)}
                    placeholder="/haikal-al-ghifari.jpg"
                    className="h-9 rounded-xl bg-white dark:bg-zinc-950 border-slate-200 dark:border-zinc-800 text-xs text-slate-900 dark:text-white font-mono"
                  />
                </div>

                <p className="text-[11px] text-slate-500 dark:text-zinc-400 font-medium leading-relaxed">
                  Pilih foto dari komputer Anda. Foto ini akan tampil sebagai kartu potret utama di Hero Section.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: CV File Link & Upload */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-zinc-800">
              <FileText className="w-5 h-5 text-cyan-400" />
              <Label className="text-base font-black text-slate-900 dark:text-white">File Dokumen CV / Resume</Label>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#0c142c] border border-slate-200 dark:border-cyan-500/30 space-y-4">
              <Button
                type="button"
                onClick={() => cvFileInputRef.current?.click()}
                className="w-full h-11 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <FileUp className="w-4 h-4 mr-2" /> Upload File CV PDF Baru
              </Button>

              <div className="space-y-1">
                <Label htmlFor="heroCtaLink" className="text-[11px] font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">
                  Tautan File CV PDF (Unduh CV)
                </Label>
                <Input
                  id="heroCtaLink"
                  name="heroCtaLink"
                  value={cvLink}
                  onChange={(e) => setCvLink(e.target.value)}
                  placeholder="/cv-haikal-al-ghifari.pdf"
                  className="h-9 rounded-xl bg-white dark:bg-zinc-950 border-slate-200 dark:border-zinc-800 text-xs text-slate-900 dark:text-white font-mono"
                />
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Tombol &quot;Unduh CV&quot; di Navbar & Hero akan langsung mengunduh file ini.</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button
            type="submit"
            className="h-12 px-8 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold tracking-wide shadow-lg shadow-cyan-500/25 transition-all active:scale-95 cursor-pointer"
          >
            <Save className="w-5 h-5 mr-2" /> Simpan Foto Profil & File CV
          </Button>
        </div>
      </form>

      {/* Confirmation Dialog */}
      <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <DialogContent className="sm:max-w-[420px] bg-white dark:bg-[#070e20] border-slate-200 dark:border-cyan-500/30 rounded-3xl p-6 shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-slate-900 dark:text-white">Konfirmasi Perubahan</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-slate-600 dark:text-zinc-300 py-2">
            Apakah Anda yakin ingin menyimpan perubahan foto profil utama dan tautan dokumen CV?
          </p>
          <DialogFooter className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => setIsConfirmOpen(false)}
              disabled={isSaving}
              className="rounded-xl border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 font-semibold"
            >
              Batal
            </Button>
            <Button
              onClick={handleConfirmSave}
              disabled={isSaving}
              className="rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold shadow-md shadow-cyan-500/25"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Menyimpan...
                </>
              ) : (
                "Ya, Simpan Perubahan"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
