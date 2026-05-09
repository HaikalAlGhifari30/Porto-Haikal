"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut, User, Camera, X, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";

export function AdminProfile() {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isLogoutOpen, setIsLogoutOpen] = useState(false);
    
    const [adminName, setAdminName] = useState("Admin COMO");
    const [adminPhoto, setAdminPhoto] = useState<string | null>(null);
    const [previewPhoto, setPreviewPhoto] = useState<string | null>(null);
    const [tempName, setTempName] = useState("");

    const dropdownRef = useRef<HTMLDivElement>(null);

    // Load from local storage
    useEffect(() => {
        const storedName = localStorage.getItem("adminName");
        const storedPhoto = localStorage.getItem("adminPhoto");
        if (storedName) setAdminName(storedName);
        if (storedPhoto) setAdminPhoto(storedPhoto);

        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewPhoto(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSaveProfile = () => {
        setAdminName(tempName);
        if (previewPhoto) {
            setAdminPhoto(previewPhoto);
            localStorage.setItem("adminPhoto", previewPhoto);
        }
        localStorage.setItem("adminName", tempName);
        setIsEditOpen(false);
        toast.success("Profil Berhasil Disimpan");
    };

    const handleLogout = () => {
        localStorage.removeItem("isAdmin");
        toast.success("Logout Berhasil");
        router.push("/");
    };

    const openEditModal = () => {
        setTempName(adminName);
        setPreviewPhoto(adminPhoto);
        setIsEditOpen(true);
        setIsOpen(false);
    };

    const openLogoutModal = () => {
        setIsLogoutOpen(true);
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Profile Trigger */}
            <div 
                className="flex items-center gap-4 cursor-pointer group"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="text-right hidden sm:block">
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">{adminName}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-500 font-medium">Superadmin</p>
                </div>
                <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-blue-500/20 to-indigo-500/20 border border-blue-500/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold shadow-[0_0_15px_rgba(37,99,235,0.15)] group-hover:shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all overflow-hidden bg-white dark:bg-slate-900">
                    {adminPhoto ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={adminPhoto} alt="Admin" className="w-full h-full object-cover" />
                    ) : (
                        adminName.charAt(0).toUpperCase()
                    )}
                </div>
            </div>

            {/* Dropdown Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-3 w-56 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden z-50"
                    >
                        <div className="p-4 border-b border-slate-200 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-950/50">
                            <p className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-widest mb-1">AKUN SAYA</p>
                            <p className="text-sm font-black text-slate-900 dark:text-white truncate">{adminName}</p>
                        </div>
                        <div className="p-2 space-y-1">
                            <button 
                                onClick={openEditModal}
                                className="w-full flex items-center gap-3 px-3 py-3 text-sm font-bold text-slate-600 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-xl transition-all group"
                            >
                                <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-zinc-800 flex items-center justify-center group-hover:bg-blue-500/10 group-hover:text-blue-600 transition-colors">
                                    <User className="w-4 h-4" />
                                </div>
                                Edit Profil
                            </button>
                            <button 
                                onClick={openLogoutModal}
                                className="w-full flex items-center gap-3 px-3 py-3 text-sm font-bold text-red-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all group"
                            >
                                <div className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-500/10 flex items-center justify-center group-hover:bg-red-500 group-hover:text-white transition-colors">
                                    <LogOut className="w-4 h-4" />
                                </div>
                                Keluar
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Edit Profile Modal */}
            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                <DialogContent className="sm:max-w-md bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-[2rem] p-8 !backdrop-blur-xl">
                    <DialogHeader className="mb-8">
                        <DialogTitle className="text-xl font-bold text-slate-800 dark:text-white">Edit Profil</DialogTitle>
                    </DialogHeader>
                    
                    <div className="flex flex-col items-center mb-8">
                        <div className="relative group cursor-pointer">
                            <div className="w-24 h-24 rounded-full border-2 border-blue-500/50 overflow-hidden bg-slate-100 dark:bg-slate-800 shadow-inner">
                                {previewPhoto ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img src={previewPhoto} alt="Preview" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-blue-500/50">
                                        {tempName.charAt(0).toUpperCase()}
                                    </div>
                                )}
                            </div>
                            <label className="absolute bottom-0 right-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white cursor-pointer shadow-lg hover:scale-110 transition-transform">
                                <Camera className="w-4 h-4" />
                                <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
                            </label>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 font-medium uppercase tracking-wider">Ganti Foto</p>
                    </div>

                    <div className="space-y-4 mb-8">
                        <div className="space-y-2">
                            <Label htmlFor="adminName" className="text-slate-600 dark:text-slate-300 text-xs font-bold uppercase tracking-wider">Nama Lengkap</Label>
                            <div className="relative">
                                <Input 
                                    id="adminName" 
                                    value={tempName}
                                    onChange={(e) => setTempName(e.target.value)}
                                    className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-white h-12 rounded-xl pl-4 pr-10"
                                />
                                <User className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <Button variant="outline" className="flex-1 h-12 rounded-xl border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800" onClick={() => setIsEditOpen(false)}>Batal</Button>
                        <Button className="flex-1 h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white border-none" onClick={handleSaveProfile}>Simpan</Button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Logout Confirmation Modal */}
            <Dialog open={isLogoutOpen} onOpenChange={setIsLogoutOpen}>
                <DialogContent className="sm:max-w-sm bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-[2rem] p-8 flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-500/10 flex items-center justify-center mb-6 text-red-500">
                        <LogOut className="w-8 h-8 ml-1" />
                    </div>
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold text-slate-800 dark:text-white mb-2">Konfirmasi Keluar</DialogTitle>
                    </DialogHeader>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">
                        Apakah Anda yakin ingin keluar? Sesi Anda akan berakhir.
                    </p>
                    <div className="flex w-full gap-3">
                        <Button variant="outline" className="flex-1 h-12 rounded-xl border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800" onClick={() => setIsLogoutOpen(false)}>Batal</Button>
                        <Button variant="destructive" className="flex-1 h-12 rounded-xl bg-red-500 hover:bg-red-600 text-white border-none shadow-[0_0_15px_rgba(239,68,68,0.3)]" onClick={handleLogout}>Ya, Keluar</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
