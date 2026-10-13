"use client";

import { Trash2, ShieldCheck, QrCode, MoreHorizontal, Power, Mail } from "lucide-react";
import { FaInstagram, FaFacebookF, FaLinkedinIn, FaGlobe } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { EditMemberModal } from "./edit-member-modal";
import { deleteMember, generateMemberQR, toggleMemberStatusAction } from "@/actions/member";
import { useTransition, useState } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

interface MemberCardRowProps {
    member: any;
    positions: any[];
}

export function MemberCardRow({ member, positions }: MemberCardRowProps) {
    const [isPending, startTransition] = useTransition();
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isQRPreviewOpen, setIsQRPreviewOpen] = useState(false);

    const handleDelete = () => {
        startTransition(async () => {
            try {
                await deleteMember(member.id);
                setIsDeleteOpen(false);
                toast.success("Anggota berhasil dihapus");
            } catch (error) {
                toast.error("Gagal menghapus anggota");
            }
        });
    };

    const handleGenerateQR = () => {
        startTransition(async () => {
            try {
                await generateMemberQR(member.id, member.slug);
                toast.success("QR Code berhasil diperbarui");
            } catch (error) {
                toast.error("Gagal membuat QR Code");
            }
        });
    };

    const handleToggleStatus = () => {
        startTransition(async () => {
            try {
                await toggleMemberStatusAction(member.id);
                toast.success(`Status ${member.name} berhasil diubah`);
            } catch (error) {
                toast.error("Gagal mengubah status anggota");
            }
        });
    };

    return (
        <div className="group bg-[#FAF6ED] dark:bg-[#151B22] border-2 border-black dark:border-white rounded-none p-4 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 transition-all shadow-retro-xs hover:shadow-retro-sm">
            {/* Avatar */}
            <div className="relative shrink-0">
                <div className="w-16 h-16 rounded-none overflow-hidden bg-white dark:bg-zinc-800 border-2 border-black dark:border-white shadow-retro-xs">
                    {member.photo ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-800 dark:text-zinc-200 font-black text-xl uppercase bg-[#FACC15]">
                            {member.name.charAt(0)}
                        </div>
                    )}
                </div>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row items-center gap-2">
                    <h3 className="text-lg font-black uppercase text-slate-900 dark:text-white truncate">{member.name}</h3>
                    {member.isActive ? (
                        <span className="w-2.5 h-2.5 rounded-none bg-emerald-500 border border-black hidden sm:block shadow-retro-xs" />
                    ) : (
                        <span className="w-2.5 h-2.5 rounded-none bg-slate-400 border border-black hidden sm:block" />
                    )}
                </div>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-1">
                    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-none bg-[#FACC15] border border-black shadow-retro-xs">
                        <ShieldCheck className="w-3 h-3 text-black" />
                        <span className="text-[10px] font-black text-black uppercase tracking-widest">{member.position.name}</span>
                    </div>
                    <span className="text-[10px] text-slate-600 dark:text-zinc-400 font-black uppercase tracking-widest">/{member.slug}</span>
                </div>
            </div>

            {/* Social Indicators */}
            <div className="hidden lg:flex items-center gap-3 px-6 border-x-2 border-black dark:border-white">
                {member.email && (
                    <a href={`mailto:${member.email}`} className="text-slate-400 hover:text-amber-500 transition-colors" title={`Email ${member.name}`}>
                        <Mail className="w-4 h-4" />
                    </a>
                )}
                {member.instagram && <FaInstagram className="w-4 h-4 text-slate-400 hover:text-amber-500 transition-colors cursor-help" title="Instagram" />}
                {member.facebook && <FaFacebookF className="w-4 h-4 text-slate-400 hover:text-amber-500 transition-colors cursor-help" title="Facebook" />}
                {member.linkedin && <FaLinkedinIn className="w-4 h-4 text-slate-400 hover:text-amber-500 transition-colors cursor-help" title="LinkedIn" />}
                {member.website && <FaGlobe className="w-4 h-4 text-slate-400 hover:text-amber-500 transition-colors cursor-help" title="Website/Portfolio" />}
                {!member.email && !member.instagram && !member.facebook && !member.linkedin && !member.website && (
                    <span className="text-[9px] text-slate-400 uppercase font-black tracking-tighter opacity-50">No Socials</span>
                )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
                <Dialog open={isQRPreviewOpen} onOpenChange={setIsQRPreviewOpen}>
                    <DialogTrigger render={<Button variant="ghost" size="icon" className="h-9 w-9 rounded-none bg-white dark:bg-[#0E1217] border-2 border-black dark:border-white text-black dark:text-white hover:bg-[#FACC15] shadow-retro-xs transition-all" />} >
                        <QrCode className="w-4 h-4" />
                    </DialogTrigger>
                    <DialogContent className="max-w-[320px] bg-[#FAF6ED] dark:bg-[#151B22] border-2 border-black dark:border-white rounded-none p-6 text-center shadow-retro-md">
                        <DialogTitle className="text-xl font-black uppercase mb-6 text-slate-900 dark:text-white">QR Code Profil</DialogTitle>
                        {member.qrCodeUrl ? (
                            <div className="p-4 bg-white rounded-none border-2 border-black shadow-retro-xs inline-block mb-6">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={member.qrCodeUrl} alt="QR Code" className="w-48 h-48" />
                            </div>
                        ) : (
                            <div className="py-12 px-6 border-2 border-dashed border-black dark:border-white rounded-none mb-6">
                                <p className="text-xs text-slate-600 dark:text-zinc-400 font-bold">QR Code belum dibuat.</p>
                            </div>
                        )}
                        {member.qrCodeUrl ? (
                            <Button 
                                onClick={async () => {
                                    try {
                                        const response = await fetch(member.qrCodeUrl!);
                                        const blob = await response.blob();
                                        const url = window.URL.createObjectURL(blob);
                                        const link = document.createElement('a');
                                        link.href = url;
                                        link.download = `${member.slug}-qr.png`;
                                        document.body.appendChild(link);
                                        link.click();
                                        document.body.removeChild(link);
                                        window.URL.revokeObjectURL(url);
                                    } catch (error) {
                                        window.open(member.qrCodeUrl!, '_blank');
                                    }
                                }}
                                className="w-full rounded-none bg-emerald-500 hover:bg-emerald-600 text-black border-2 border-black font-black uppercase h-11 shadow-retro-xs"
                            >
                                Download QR
                            </Button>
                        ) : (
                            <Button onClick={handleGenerateQR} disabled={isPending} className="w-full rounded-none bg-[#FACC15] hover:bg-yellow-300 text-black border-2 border-black font-black uppercase h-11 shadow-retro-xs">
                                {isPending ? "Generating..." : "Generate QR Now"}
                            </Button>
                        )}
                    </DialogContent>
                </Dialog>

                <Button 
                    variant="ghost" 
                    size="icon" 
                    disabled={isPending}
                    onClick={handleToggleStatus}
                    className={cn(
                        "h-9 w-9 rounded-none border-2 border-black dark:border-white bg-white dark:bg-[#0E1217] transition-all shadow-retro-xs",
                        member.isActive 
                            ? "text-emerald-500 hover:bg-emerald-500/10" 
                            : "text-slate-400 hover:bg-slate-100 dark:hover:bg-zinc-800"
                    )}
                    title={member.isActive ? "Deactivate Member" : "Activate Member"}
                >
                    <Power className={cn("w-4 h-4", !member.isActive && "opacity-40")} />
                </Button>

                <EditMemberModal member={member} positions={positions} />

                <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                    <DialogTrigger render={<Button variant="ghost" size="icon" className="w-9 h-9 rounded-none bg-red-500 border-2 border-black dark:border-white text-white hover:bg-red-600 transition-all shadow-retro-xs" />} >
                        <Trash2 className="w-4 h-4" />
                    </DialogTrigger>
                    <DialogContent className="max-w-[400px] bg-[#FAF6ED] dark:bg-[#151B22] border-2 border-black dark:border-white rounded-none p-8 text-center shadow-retro-md">
                        <div className="w-16 h-16 rounded-none bg-red-500 border-2 border-black flex items-center justify-center mx-auto mb-6 text-white shadow-retro-xs">
                            <Trash2 className="w-7 h-7" />
                        </div>
                        <DialogTitle className="text-xl font-black uppercase text-slate-900 dark:text-white mb-2">Hapus Anggota?</DialogTitle>
                        <p className="text-sm text-slate-600 dark:text-zinc-300 mb-6 font-bold">
                            Data untuk <span className="text-black dark:text-[#FACC15] font-black">{member.name}</span> akan dihapus selamanya.
                        </p>
                        <div className="flex gap-3">
                            <Button variant="ghost" onClick={() => setIsDeleteOpen(false)} className="flex-1 rounded-none border-2 border-black dark:border-white font-black uppercase h-11 hover:bg-slate-200 dark:hover:bg-zinc-800">Batal</Button>
                            <Button onClick={handleDelete} disabled={isPending} className="flex-1 rounded-none bg-red-600 hover:bg-red-700 text-white border-2 border-black font-black uppercase h-11 shadow-retro-xs">
                                {isPending ? "..." : "Hapus"}
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}
