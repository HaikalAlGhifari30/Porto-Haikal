"use client";

import { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateSettings, uploadProfilePhoto } from "@/actions/settings";
import { toast } from "sonner";
import {
  Loader2,
  Save,
  FileText,
  CheckCircle2,
  User,
  ImagePlus,
  FileUp,
  Star,
  ArrowUp,
  ArrowDown,
  Trash2,
  Plus,
  Eye,
  Sparkles,
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { parseProfilePhotos, serializeProfilePhotos } from "@/lib/profile-photos";
import { HeroPhotoCarousel } from "@/components/hero-photo-carousel";

export function ProfilePhotoSettingsForm({ settings }: { settings: any }) {
  const [photos, setPhotos] = useState<string[]>(() => parseProfilePhotos(settings?.heroBannerUrl));
  const [cvLink, setCvLink] = useState(settings?.heroCtaLink || "/cv-haikal-al-ghifari.pdf");

  const [newUrlInput, setNewUrlInput] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cvFileInputRef = useRef<HTMLInputElement>(null);

  // Upload single/multiple image files
  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    const addedUrls: string[] = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.size > 8 * 1024 * 1024) {
          toast.error(`File ${file.name} terlalu besar (maksimal 8MB)`);
          continue;
        }

        const formData = new FormData();
        formData.append("file", file);

        const res = await uploadProfilePhoto(formData);
        if (res.success && res.url) {
          addedUrls.push(res.url);
        } else {
          // Fallback to base64 if server upload encounters issue
          const base64 = await new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.readAsDataURL(file);
          });
          addedUrls.push(base64);
        }
      }

      if (addedUrls.length > 0) {
        setPhotos((prev) => [...prev, ...addedUrls]);
        toast.success(`${addedUrls.length} foto berhasil ditambahkan! Jangan lupa klik 'Simpan Perubahan'.`);
      }
    } catch (err: any) {
      console.error(err);
      toast.error("Gagal mengunggah foto: " + (err.message || "Unknown error"));
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // Add photo via manual URL
  const handleAddManualUrl = () => {
    if (!newUrlInput.trim()) {
      toast.error("Masukkan URL foto terlebih dahulu");
      return;
    }
    setPhotos((prev) => [...prev, newUrlInput.trim()]);
    setNewUrlInput("");
    toast.success("Foto berhasil ditambahkan ke daftar!");
  };

  // Set photo as primary (move to index 0 / paling depan)
  const handleSetPrimary = (index: number) => {
    if (index === 0) return;
    setPhotos((prev) => {
      const selected = prev[index];
      const rest = prev.filter((_, i) => i !== index);
      return [selected, ...rest];
    });
    toast.success("Foto berhasil dijadikan foto utama (paling depan)!");
  };

  // Move photo up / earlier
  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    setPhotos((prev) => {
      const copy = [...prev];
      const temp = copy[index - 1];
      copy[index - 1] = copy[index];
      copy[index] = temp;
      return copy;
    });
  };

  // Move photo down / later
  const handleMoveDown = (index: number) => {
    if (index >= photos.length - 1) return;
    setPhotos((prev) => {
      const copy = [...prev];
      const temp = copy[index + 1];
      copy[index + 1] = copy[index];
      copy[index] = temp;
      return copy;
    });
  };

  // Delete photo
  const handleDeletePhoto = (index: number) => {
    if (photos.length <= 1) {
      toast.error("Minimal harus ada 1 foto profil utama!");
      return;
    }
    setPhotos((prev) => prev.filter((_, i) => i !== index));
    toast.success("Foto dihapus dari daftar");
  };

  // Upload CV PDF
  const handleCvFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 15 * 1024 * 1024) {
        toast.error("Ukuran file CV terlalu besar (Maksimal 15MB)");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setCvLink(base64);
        toast.success("File CV PDF baru berhasil dimuat! Klik 'Simpan Perubahan' untuk menerapkan.");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleOpenConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (photos.length === 0) {
      toast.error("Minimal harus ada 1 foto profil!");
      return;
    }
    setIsConfirmOpen(true);
  };

  const handleConfirmSave = async () => {
    setIsSaving(true);
    try {
      const serialized = serializeProfilePhotos(photos);
      const formData = new FormData();
      formData.append("heroBannerUrl", serialized);
      formData.append("currentHeroBannerUrl", serialized);
      formData.append("heroCtaLink", cvLink);

      await updateSettings(formData);
      toast.success("Foto profil & dokumen CV berhasil disimpan!");
      setIsConfirmOpen(false);
    } catch (error: any) {
      console.error(error);
      toast.error("Gagal menyimpan perubahan: " + (error.message || "Unknown error"));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      {/* Hidden File Inputs */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageFileChange}
        accept="image/png, image/jpeg, image/webp, image/gif"
        multiple
        className="hidden"
      />
      <input
        type="file"
        ref={cvFileInputRef}
        onChange={handleCvFileChange}
        accept="application/pdf"
        className="hidden"
      />

      <form onSubmit={handleOpenConfirm} className="space-y-8">
        {/* ── SECTION 1: HERO PROFILE PHOTOS (CAROUSEL & REORDER) ── */}
        <div className="space-y-4 bg-white dark:bg-[#151B22] p-5 sm:p-6 border-2 border-black dark:border-white shadow-retro-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b-2 border-black dark:border-white gap-2">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-amber-500 dark:text-[#FACC15]" />
              <div>
                <h3 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-tight">
                  Foto Profil Hero Section (Auto-Slide Carousel)
                </h3>
                <p className="text-xs text-slate-500 dark:text-zinc-400 font-medium">
                  Tambahkan beberapa foto untuk auto-slide. Atur foto nomor 1 sebagai foto paling depan.
                </p>
              </div>
            </div>

            <Button
              type="button"
              disabled={isUploading}
              onClick={() => fileInputRef.current?.click()}
              className="h-10 bg-[#FACC15] hover:bg-yellow-300 text-black font-black border-2 border-black dark:border-white shadow-retro-xs btn-retro cursor-pointer rounded-none self-start sm:self-auto shrink-0"
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Mengunggah...
                </>
              ) : (
                <>
                  <ImagePlus className="w-4 h-4 mr-2" /> + Upload Foto Baru
                </>
              )}
            </Button>
          </div>

          {/* Quick Manual URL Add */}
          <div className="flex items-center gap-2 pt-1">
            <Input
              value={newUrlInput}
              onChange={(e) => setNewUrlInput(e.target.value)}
              placeholder="Atau masukkan URL / path foto: /haikal-al-ghifari.jpg"
              className="h-9 rounded-none bg-[#FAF6ED] dark:bg-[#0E1217] border-2 border-black dark:border-white text-xs text-slate-900 dark:text-white font-mono flex-1"
            />
            <Button
              type="button"
              onClick={handleAddManualUrl}
              className="h-9 px-4 bg-black dark:bg-[#FAF6ED] text-white dark:text-black font-bold text-xs rounded-none border-2 border-black dark:border-white btn-retro cursor-pointer shrink-0"
            >
              <Plus className="w-3.5 h-3.5 mr-1" /> Tambah URL
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2 items-start">
            {/* Left 8 Cols: List of Photos with Reordering Controls */}
            <div className="lg:col-span-8 space-y-3">
              <Label className="text-xs font-black text-slate-700 dark:text-zinc-300 uppercase tracking-wider block">
                Daftar Foto & Urutan Slide ({photos.length} Foto)
              </Label>

              <div className="space-y-2.5">
                {photos.map((url, idx) => {
                  const isPrimary = idx === 0;
                  return (
                    <div
                      key={idx}
                      className={cn(
                        "p-3 border-2 border-black dark:border-white flex flex-col sm:flex-row items-center justify-between gap-3 transition-all",
                        isPrimary
                          ? "bg-amber-500/10 dark:bg-amber-400/10 border-amber-500 dark:border-yellow-400 shadow-retro-xs"
                          : "bg-[#FAF6ED] dark:bg-[#0E1217]"
                      )}
                    >
                      {/* Photo Thumbnail + Index Info */}
                      <div className="flex items-center gap-3 w-full sm:w-auto">
                        <div className="relative w-14 h-16 sm:w-16 sm:h-20 shrink-0 border-2 border-black dark:border-white overflow-hidden bg-black">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={url}
                            alt={`Photo ${idx + 1}`}
                            className="w-full h-full object-cover object-top"
                          />
                        </div>

                        <div className="min-w-0 flex-1 space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            {isPrimary ? (
                              <span className="px-2 py-0.5 bg-[#FACC15] text-black font-pixel font-bold text-[10px] sm:text-xs border border-black flex items-center gap-1">
                                <Star className="w-3 h-3 fill-black text-black" />
                                FOTO UTAMA // PALING DEPAN
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 bg-black text-white dark:bg-white dark:text-black font-pixel font-bold text-[10px] sm:text-xs border border-black">
                                SLIDE #{idx + 1}
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] font-mono text-slate-500 dark:text-zinc-400 truncate max-w-[200px] sm:max-w-xs">
                            {url.startsWith("data:") ? "[Gambar Base64 Upload]" : url}
                          </p>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-1.5 w-full sm:w-auto justify-end pt-1 sm:pt-0 border-t sm:border-t-0 border-black/10 dark:border-white/10">
                        {!isPrimary && (
                          <Button
                            type="button"
                            onClick={() => handleSetPrimary(idx)}
                            size="sm"
                            className="h-8 px-2.5 bg-[#FACC15] hover:bg-yellow-300 text-black font-pixel font-black text-[10px] border border-black shadow-retro-xs btn-retro rounded-none"
                            title="Jadikan Foto Paling Depan"
                          >
                            <Star className="w-3 h-3 mr-1 fill-black" /> Jadikan Utama
                          </Button>
                        )}

                        <Button
                          type="button"
                          disabled={idx === 0}
                          onClick={() => handleMoveUp(idx)}
                          size="icon"
                          variant="outline"
                          className="h-8 w-8 rounded-none border-2 border-black dark:border-white disabled:opacity-20 cursor-pointer"
                          title="Geser Naik (Maju)"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </Button>

                        <Button
                          type="button"
                          disabled={idx === photos.length - 1}
                          onClick={() => handleMoveDown(idx)}
                          size="icon"
                          variant="outline"
                          className="h-8 w-8 rounded-none border-2 border-black dark:border-white disabled:opacity-20 cursor-pointer"
                          title="Geser Turun (Mundur)"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </Button>

                        <Button
                          type="button"
                          onClick={() => handleDeletePhoto(idx)}
                          size="icon"
                          variant="destructive"
                          className="h-8 w-8 rounded-none border-2 border-black bg-red-600 hover:bg-red-700 text-white cursor-pointer ml-1"
                          title="Hapus Foto"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right 4 Cols: Live Preview of 8-Bit Cartridge Carousel */}
            <div className="lg:col-span-4 space-y-3">
              <Label className="text-xs font-black text-slate-700 dark:text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-amber-500" />
                Live Preview (8-Bit Cartridge Frame)
              </Label>

              <div className="p-4 bg-[#FAF6ED] dark:bg-[#0E1217] border-2 border-black dark:border-white flex flex-col items-center justify-center">
                <div className="w-full max-w-[210px] py-2">
                  <HeroPhotoCarousel photos={photos} autoPlayInterval={3000} />
                </div>
                <p className="text-[10px] text-center font-pixel text-zinc-500 dark:text-zinc-400 mt-2">
                  Simulasi auto-slide bergulir tiap 3-4 detik. Sorot kursor untuk menjeda (*pause*).
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── SECTION 2: CV PDF DOCUMENT LINK & UPLOAD ── */}
        <div className="space-y-4 bg-white dark:bg-[#151B22] p-5 sm:p-6 border-2 border-black dark:border-white shadow-retro-sm">
          <div className="flex items-center gap-2 pb-3 border-b-2 border-black dark:border-white">
            <FileText className="w-5 h-5 text-amber-500 dark:text-[#FACC15]" />
            <div>
              <h3 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-tight">
                File Dokumen CV / Resume (PDF)
              </h3>
              <p className="text-xs text-slate-500 dark:text-zinc-400 font-medium">
                Tautan atau berkas PDF yang langsung diunduh saat tombol &apos;Download CV&apos; ditekan.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-none bg-[#FAF6ED] dark:bg-[#0E1217] border-2 border-black dark:border-white space-y-3">
            <div className="flex flex-col sm:flex-row gap-3 items-center">
              <Button
                type="button"
                onClick={() => cvFileInputRef.current?.click()}
                className="w-full sm:w-auto h-11 px-5 bg-white dark:bg-[#151B22] hover:bg-[#FAF6ED] dark:hover:bg-zinc-800 text-black dark:text-white font-black border-2 border-black dark:border-white shadow-retro-xs btn-retro cursor-pointer rounded-none shrink-0"
              >
                <FileUp className="w-4 h-4 mr-2 text-amber-500 dark:text-[#FACC15]" /> Upload PDF CV Baru
              </Button>

              <div className="w-full flex-1 space-y-1">
                <Input
                  id="heroCtaLink"
                  value={cvLink}
                  onChange={(e) => setCvLink(e.target.value)}
                  placeholder="/cv-haikal-al-ghifari.pdf"
                  className="h-11 rounded-none bg-white dark:bg-[#151B22] border-2 border-black dark:border-white text-xs text-slate-900 dark:text-white font-mono"
                />
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-2.5 bg-yellow-400/15 border border-black dark:border-[#FACC15]/40 text-black dark:text-zinc-200 text-xs font-semibold">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-amber-500 dark:text-[#FACC15]" />
              <span>Tombol &quot;Download CV&quot; di Navbar dan Hero akan mengunduh dokumen di atas.</span>
            </div>
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex justify-end pt-2">
          <Button
            type="submit"
            className="h-12 px-8 rounded-none bg-[#FACC15] hover:bg-yellow-300 text-black font-pixel font-black text-xs sm:text-sm tracking-wide uppercase border-2 border-black dark:border-white shadow-retro btn-retro active:scale-95 cursor-pointer"
          >
            <Save className="w-4 h-4 mr-2" /> Simpan Semua Pengaturan Foto & CV
          </Button>
        </div>
      </form>

      {/* Confirmation Dialog */}
      <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <DialogContent className="sm:max-w-[440px] bg-[#FAF6ED] dark:bg-[#151B22] border-3 border-black dark:border-white rounded-none p-6 shadow-retro-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-pixel font-black text-slate-900 dark:text-white uppercase">
              Konfirmasi Simpan Foto
            </DialogTitle>
          </DialogHeader>
          <div className="py-2 space-y-2 text-xs sm:text-sm text-slate-700 dark:text-zinc-300">
            <p>
              Anda akan menyimpan <strong>{photos.length} foto profil</strong> untuk auto-slide di Hero Section.
            </p>
            <p className="text-zinc-500 dark:text-zinc-400">
              Foto paling depan adalah: <strong>Slide 1</strong>.
            </p>
          </div>
          <DialogFooter className="flex gap-2.5 pt-4">
            <Button
              variant="outline"
              onClick={() => setIsConfirmOpen(false)}
              disabled={isSaving}
              className="rounded-none border-2 border-black dark:border-white text-black dark:text-white font-pixel text-xs btn-retro cursor-pointer"
            >
              Batal
            </Button>
            <Button
              onClick={handleConfirmSave}
              disabled={isSaving}
              className="rounded-none bg-[#FACC15] hover:bg-yellow-300 text-black font-pixel font-black text-xs border-2 border-black dark:border-white shadow-retro-xs btn-retro cursor-pointer"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 mr-2 animate-spin" /> Menyimpan...
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
