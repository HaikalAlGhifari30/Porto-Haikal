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
        <div className="group bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-3xl p-4 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 transition-all hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-none hover:border-blue-500/20">
            {/* Avatar */}
            <div className="relative shrink-0">
                <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-800">
                    {member.photo ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400 font-bold text-xl uppercase">
                            {member.name.charAt(0)}
                        </div>
                    )}
                </div>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row items-center gap-2">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white truncate">{member.name}</h3>
                    {member.isActive ? (
                        <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] hidden sm:block" />
                    ) : (
                        <span className="w-2 h-2 rounded-full bg-slate-300 hidden sm:block" />
                    )}
                </div>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-1">
                    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/10">
                        <ShieldCheck className="w-3 h-3 text-blue-500" />
                        <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">{member.position.name}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">/{member.slug}</span>
                </div>
            </div>

            {/* Social Indicators */}
            <div className="hidden lg:flex items-center gap-3 px-6 border-x border-slate-100 dark:border-zinc-800/50">
                {member.email && (
                    <a href={`mailto:${member.email}`} className="text-slate-300 hover:text-blue-500 transition-colors" title={`Email ${member.name}`}>
                        <Mail className="w-4 h-4" />
                    </a>
                )}
                {member.instagram && <FaInstagram className="w-4 h-4 text-slate-300 hover:text-blue-500 transition-colors cursor-help" title="Instagram" />}
                {member.facebook && <FaFacebookF className="w-4 h-4 text-slate-300 hover:text-blue-500 transition-colors cursor-help" title="Facebook" />}
                {member.linkedin && <FaLinkedinIn className="w-4 h-4 text-slate-300 hover:text-blue-500 transition-colors cursor-help" title="LinkedIn" />}
                {member.website && <FaGlobe className="w-4 h-4 text-slate-300 hover:text-blue-500 transition-colors cursor-help" title="Website/Portfolio" />}
                {!member.email && !member.instagram && !member.facebook && !member.linkedin && !member.website && (
                    <span className="text-[9px] text-slate-300 uppercase font-bold tracking-tighter opacity-50">No Socials</span>
                )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
                <Dialog open={isQRPreviewOpen} onOpenChange={setIsQRPreviewOpen}>
                    <DialogTrigger render={<Button variant="ghost" size="icon" className="h-9 w-9 rounded-full text-slate-400 hover:text-emerald-500 transition-all" />} >
                        <QrCode className="w-4 h-4" />
                    </DialogTrigger>
                    <DialogContent className="max-w-[320px] bg-white dark:bg-zinc-950 border-slate-200 dark:border-zinc-800 rounded-[2.5rem] p-8 text-center">
                        <DialogTitle className="text-xl font-bold mb-6 text-slate-900 dark:text-white">QR Code Profil</DialogTitle>
                        {member.qrCodeUrl ? (
                            <div className="p-4 bg-white rounded-3xl border border-slate-100 shadow-xl inline-block mb-6">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={member.qrCodeUrl} alt="QR Code" className="w-48 h-48" />
                            </div>
                        ) : (
                            <div className="py-12 px-6 border-2 border-dashed border-slate-100 dark:border-zinc-800 rounded-3xl mb-6">
                                <p className="text-sm text-slate-400">QR Code has not been generated.</p>
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
                                className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-11"
                            >
                                Download QR
                            </Button>
                        ) : (
                            <Button onClick={handleGenerateQR} disabled={isPending} className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold h-11">
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
                        "h-9 w-9 rounded-full transition-all",
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
                    <DialogTrigger render={<Button variant="ghost" size="icon" className="w-9 h-9 rounded-full bg-red-500/10 backdrop-blur-md border border-red-500/20 flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all shrink-0" />} >
                        <Trash2 className="w-4 h-4" />
                    </DialogTrigger>
                    <DialogContent className="max-w-[400px] bg-white dark:bg-zinc-950 border-slate-200 dark:border-zinc-800 rounded-[2.5rem] p-10 text-center">
                        <div className="w-16 h-16 rounded-full bg-red-50 dark:bg-red-500/10 flex items-center justify-center mx-auto mb-6">
                            <Trash2 className="w-7 h-7 text-red-500" />
                        </div>
                        <DialogTitle className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Delete Member?</DialogTitle>
                        <p className="text-sm text-slate-500 dark:text-zinc-400 mb-8 leading-relaxed">
                            Data for <span className="font-bold text-slate-900 dark:text-white">{member.name}</span> will be permanently deleted from PT Rizky Rijaya Karya system.
                        </p>
                        <div className="flex gap-3">
                            <Button variant="ghost" onClick={() => setIsDeleteOpen(false)} className="flex-1 rounded-xl font-bold h-12">Cancel</Button>
                            <Button onClick={handleDelete} disabled={isPending} className="flex-1 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold h-12 shadow-lg shadow-red-500/20">
                                {isPending ? "Deleting..." : "Yes, Delete"}
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}
