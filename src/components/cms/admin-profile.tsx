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
    
    const [adminName, setAdminName] = useState("Haikal Al Ghifari");
    const [adminPhoto, setAdminPhoto] = useState<string | null>(null);
    const [previewPhoto, setPreviewPhoto] = useState<string | null>(null);
    const [tempName, setTempName] = useState("");

    const dropdownRef = useRef<HTMLDivElement>(null);

    // Load from local storage
    useEffect(() => {
        const storedName = localStorage.getItem("adminName");
        const storedPhoto = localStorage.getItem("adminPhoto");
        if (!storedName || storedName.includes("Rizk") || storedName.includes("Karya") || storedName.includes("Como") || storedName.includes("PT") || storedName.includes("Admin PT")) {
            localStorage.setItem("adminName", "Haikal Al Ghifari");
            setAdminName("Haikal Al Ghifari");
        } else {
            setAdminName(storedName);
        }
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
                className="flex items-center gap-3 cursor-pointer group"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="text-right hidden sm:block">
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-amber-500 dark:group-hover:text-[#FACC15] transition-colors">{adminName}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">QA Lead Admin</p>
                </div>
                <div className="w-8 h-8 bg-[#FACC15] text-black border-2 border-black dark:border-white shadow-retro-xs flex items-center justify-center font-pixel font-bold transition-all overflow-hidden relative">
                    {adminPhoto ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={adminPhoto} alt="Admin" className="w-full h-full object-cover relative z-10" />
                    ) : (
                        <span className="relative z-10 text-xs font-black">{adminName.charAt(0).toUpperCase()}</span>
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
                        className="absolute right-0 mt-3 w-56 rounded-none bg-white dark:bg-[#151B22] border-2 border-black dark:border-white shadow-retro overflow-hidden z-50"
                    >
                        <div className="p-4 border-b-2 border-black dark:border-white bg-[#FAF6ED] dark:bg-[#0E1217]">
                            <p className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-widest mb-1">AKUN SAYA</p>
                            <p className="text-sm font-black text-slate-900 dark:text-white truncate">{adminName}</p>
                        </div>
                        <div className="p-2 space-y-1">
                            <button 
                                onClick={openEditModal}
                                className="w-full flex items-center gap-3 px-3 py-2.5 text-xs font-bold text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white hover:bg-[#FACC15] dark:hover:bg-[#FACC15] dark:hover:text-black rounded-none border border-transparent hover:border-black transition-all group"
                            >
                                <div className="w-7 h-7 bg-white dark:bg-zinc-800 border border-black flex items-center justify-center group-hover:bg-white text-black transition-colors">
                                    <User className="w-3.5 h-3.5" />
                                </div>
                                Edit Profil
                            </button>
                            <button 
                                onClick={openLogoutModal}
                                className="w-full flex items-center gap-3 px-3 py-2.5 text-xs font-bold text-red-600 hover:bg-red-500 hover:text-white rounded-none border border-transparent hover:border-black transition-all group"
                            >
                                <div className="w-7 h-7 bg-red-100 dark:bg-red-950/50 border border-black flex items-center justify-center text-red-600 group-hover:bg-white transition-colors">
                                    <LogOut className="w-3.5 h-3.5" />
                                </div>
                                Keluar
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Edit Profile Modal */}
            {/* Edit Profile Modal */}
            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                <DialogContent className="sm:max-w-md bg-[#FAF6ED] dark:bg-[#151B22] border-2 border-black dark:border-white rounded-none p-8 shadow-retro-md">
                    <DialogHeader className="mb-6">
                        <DialogTitle className="text-xl font-black uppercase text-slate-900 dark:text-white">Edit Profil</DialogTitle>
                    </DialogHeader>
                    
                    <div className="flex flex-col items-center mb-6">
                        <div className="relative group cursor-pointer">
                            <div className="w-24 h-24 rounded-none border-2 border-black dark:border-white overflow-hidden bg-white dark:bg-[#0E1217] shadow-retro-xs">
                                {previewPhoto ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img src={previewPhoto} alt="Preview" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-3xl font-black bg-[#FACC15] text-black">
                                        {tempName.charAt(0).toUpperCase()}
                                    </div>
                                )}
                            </div>
                            <label className="absolute bottom-0 right-0 w-8 h-8 bg-[#FACC15] text-black border-2 border-black rounded-none flex items-center justify-center cursor-pointer shadow-retro-xs hover:scale-105 transition-transform">
                                <Camera className="w-4 h-4" />
                                <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
                            </label>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-zinc-400 mt-3 font-black uppercase tracking-wider">Ganti Foto</p>
                    </div>

                    <div className="space-y-4 mb-6">
                        <div className="space-y-2">
                            <Label htmlFor="adminName" className="text-slate-800 dark:text-slate-200 text-xs font-black uppercase tracking-wider">Nama Lengkap</Label>
                            <div className="relative">
                                <Input 
                                    id="adminName" 
                                    value={tempName}
                                    onChange={(e) => setTempName(e.target.value)}
                                    className="bg-white dark:bg-[#0E1217] border-2 border-black dark:border-white text-slate-900 dark:text-white h-11 rounded-none pl-4 pr-10 font-bold"
                                />
                                <User className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <Button variant="outline" className="flex-1 h-11 rounded-none border-2 border-black dark:border-white font-black uppercase hover:bg-slate-200 dark:hover:bg-zinc-800" onClick={() => setIsEditOpen(false)}>Batal</Button>
                        <Button className="flex-1 h-11 rounded-none bg-[#FACC15] hover:bg-yellow-300 text-black border-2 border-black dark:border-white font-black uppercase shadow-retro-xs" onClick={handleSaveProfile}>Simpan</Button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Logout Confirmation Modal */}
            <Dialog open={isLogoutOpen} onOpenChange={setIsLogoutOpen}>
                <DialogContent className="sm:max-w-sm bg-[#FAF6ED] dark:bg-[#151B22] border-2 border-black dark:border-white rounded-none p-8 flex flex-col items-center text-center shadow-retro-md">
                    <div className="w-16 h-16 rounded-none bg-red-500 border-2 border-black flex items-center justify-center mb-6 text-white shadow-retro-xs">
                        <LogOut className="w-8 h-8 ml-1" />
                    </div>
                    <DialogHeader>
                        <DialogTitle className="text-xl font-black uppercase text-slate-900 dark:text-white mb-2">Konfirmasi Keluar</DialogTitle>
                    </DialogHeader>
                    <p className="text-sm text-slate-600 dark:text-zinc-300 mb-6 font-bold">
                        Apakah Anda yakin ingin keluar? Sesi Anda akan berakhir.
                    </p>
                    <div className="flex w-full gap-3">
                        <Button variant="outline" className="flex-1 h-11 rounded-none border-2 border-black dark:border-white font-black uppercase hover:bg-slate-200 dark:hover:bg-zinc-800" onClick={() => setIsLogoutOpen(false)}>Batal</Button>
                        <Button variant="destructive" className="flex-1 h-11 rounded-none bg-red-600 hover:bg-red-700 text-white border-2 border-black font-black uppercase shadow-retro-xs" onClick={handleLogout}>Ya, Keluar</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
